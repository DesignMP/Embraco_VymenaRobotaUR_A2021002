/**
 * Implements a typed data link.
 *
 *
 *
 * @class Property
 * @template T
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Property = /** @class */ (function () {
        /**
         *Creates an instance of DataLink.
         *    @memberof Property
         */
        function Property(initialValue, valueReadRequest, valueWriteRequest, valueGetter) {
            if (valueGetter === void 0) { valueGetter = undefined; }
            // Holds the change notification callbacks    
            this._valueChangedCallbacks = [];
            // specifies a read response delegate called after a read has successfully been executed.
            this._readResponseDelegates = [];
            // specifies the read rejection delegates
            this._readRejectionResponseDelegates = [];
            // specifies a write response delegate called after a read has successfully been executed.
            this._writeResponseDelegate = undefined;
            // specifies a read response delegate called after a write request has  been rejected.
            this._writeResponseRejectionDelegate = undefined;
            // specifies the write rejection delegate
            this._writeRejectionResponseDelegate = undefined;
            // specifies the data link read request state
            this._readRequestState = PropertyRequestState.Ready;
            // specifies the data link read request state
            this._writeRequestState = PropertyRequestState.Ready;
            this._valueReadRequestDelegate = valueReadRequest;
            this._valueWriteRequestDelegate = valueWriteRequest;
            this._value = initialValue;
            this._readRequestState = PropertyRequestState.Ready;
            this._writeRequestState = PropertyRequestState.Ready;
            this._valueGetter = valueGetter;
        }
        /**
         * Creates a new DataLink object with the specified type
         *
         * @static
         * @template T
         * @param {T} initialValue
         * @returns
         * @memberof Property
         */
        Property.create = function (initialValue, valueReadRequest, valueWriteRequest, valueGetter) {
            if (valueReadRequest === void 0) { valueReadRequest = undefined; }
            if (valueWriteRequest === void 0) { valueWriteRequest = undefined; }
            if (valueGetter === void 0) { valueGetter = undefined; }
            valueReadRequest = valueReadRequest ? valueReadRequest : Property.DEFAULT_READ_REQUEST_HANDLER;
            valueWriteRequest = valueWriteRequest ? valueWriteRequest : Property.DEFAULT_WRITE_REQUEST_HANDLER;
            valueGetter = valueGetter ? valueGetter : Property.DEFAULT_VALUE_GETTER;
            return new Property(initialValue, valueReadRequest, valueWriteRequest, valueGetter);
        };
        Object.defineProperty(Property.prototype, "value", {
            /**
             * Gets the property object value.
             *
             * @type {T}
             * @memberof Property
             */
            get: function () {
                var value = this._value;
                // get the value via the value getter delegate, if defined. Otherwise use the original value.
                if (this._valueGetter) {
                    value = this._valueGetter(value);
                }
                return value;
            },
            /**
             * Sets the DataLink Objects value.
             *
             * @memberof Property
             */
            set: function (newValue) {
                var oldValue = this._value;
                this._value = newValue;
                this.onValueChanged(this._value, oldValue);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Called whenever the value has been set. Notifies listeners from a value change
         *
         * @param {T} _value
         * @returns {*}
         * @memberof Property
         */
        Property.prototype.onValueChanged = function (newValue, oldValue) {
            this._valueChangedCallbacks.forEach(function (callback) { callback(newValue, oldValue); });
        };
        /**
         * Called whenever the data links value has changed or initally attached.
         *
         * @param {(newValue:T, oldValue:T) => void} onValueChangedCallBack
         * @memberof Property
         */
        Property.prototype.changed = function (onValueChangedCallBack) {
            if (!this._valueChangedCallbacks.includes(onValueChangedCallBack)) {
                // add the new handler
                this._valueChangedCallbacks.push(onValueChangedCallBack);
                // if there is already a value defined, we notify the new listener.
                if (this._value) {
                    this.refresh(onValueChangedCallBack);
                }
            }
            else {
                console.error("Property change already observed by the same handler");
            }
        };
        /**
         * forces a changed callback with the current property value
         *
         * @param {(newValue: T, oldValue: T) => void} onValueChangedCallBack
         * @memberof Property
         */
        Property.prototype.refresh = function (onValueChangedCallBack) {
            if (onValueChangedCallBack === void 0) { onValueChangedCallBack = undefined; }
            if (onValueChangedCallBack) {
                onValueChangedCallBack(this._value, this._value);
            }
            else {
                this.onValueChanged(this._value, this._value);
            }
        };
        /**
         * Forces a refresh o the data links value
         *
         * @memberof Property
         */
        Property.prototype.read = function (readResponseDelegate, rejectionResponseDelegate) {
            // add a response delegate for every read caller. This makes sure, that more callers possibly from different components, receive the results as well !
            if (readResponseDelegate === void 0) { readResponseDelegate = undefined; }
            if (rejectionResponseDelegate === void 0) { rejectionResponseDelegate = undefined; }
            // add read request delegate 
            if (readResponseDelegate) {
                this._readResponseDelegates.push(readResponseDelegate);
            }
            // add read rejection delegate
            if (rejectionResponseDelegate) {
                this._readRejectionResponseDelegates.push(rejectionResponseDelegate);
            }
            // invoke the read request if not already running
            if (this._readRequestState === PropertyRequestState.Ready) {
                this.beginReadRequest();
            }
        };
        /**
         * Starts the request for reading a data links value. The method delgates the request to the callback if defined.
         *
         * @private
         * @memberof Property
         */
        Property.prototype.beginReadRequest = function () {
            this._readRequestState = PropertyRequestState.Pending;
            if (this._valueReadRequestDelegate) {
                this._valueReadRequestDelegate(this);
            }
        };
        /**
         * Called after a read request has been executed successfully
         *
         * @param {T} componentParameters
         * @memberof Property
         */
        Property.prototype.readRequestExecuted = function (readResult) {
            var _this = this;
            // update the data links value
            this.value = readResult;
            // recall response handler and pass the updated value
            this._readResponseDelegates.forEach(function (readResponseDelegate) {
                readResponseDelegate(_this.value);
            });
            // after processing the response calls, the current response list is obsolete!
            this.endReadRequest();
        };
        /**
         * Called after a read request has been rejetced
         *
         * @param {*} error
         * @memberof Property
         */
        Property.prototype.readRequestRejected = function (error) {
            // recall response handler and pass the updated value
            this._readRejectionResponseDelegates.forEach(function (readRejectionResponseDelegate) {
                readRejectionResponseDelegate(error);
            });
            this.endReadRequest();
        };
        /**
         * Terminates a read request
         *
         * @private
         * @memberof Property
         */
        Property.prototype.endReadRequest = function () {
            this._readResponseDelegates = [];
            this._readRequestState = PropertyRequestState.Ready;
        };
        /**
         * Forces a write of the data link value to the value provider
         *
         * @param {*} newValue
         * @param {(((writeResult:T)=>void)|undefined)} [writeResponseDelegate=undefined]
         * @memberof Property
         */
        Property.prototype.write = function (writeResponseDelegate, writeRejectionDelegate) {
            if (writeResponseDelegate === void 0) { writeResponseDelegate = undefined; }
            if (writeRejectionDelegate === void 0) { writeRejectionDelegate = undefined; }
            this._writeResponseDelegate = writeResponseDelegate;
            if (this._writeRequestState === PropertyRequestState.Ready) {
                this.beginWriteRequest();
            }
        };
        /**
         * Terminates the write request
         *
         * @private
         * @memberof Property
         */
        Property.prototype.endWriteRequest = function () {
            this._writeResponseDelegate = undefined;
            this._writeRequestState = PropertyRequestState.Ready;
        };
        /**
         * Starts the request for writing a data links value. The method delgates the request to the callback if defined.
         *
         * @param {*} newValue
         * @returns {*}
         * @memberof Property
         */
        Property.prototype.beginWriteRequest = function () {
            this._writeRequestState = PropertyRequestState.Pending;
            if (this._valueWriteRequestDelegate) {
                this._valueWriteRequestDelegate(this);
            }
        };
        /**
         * Called after a write request has been executed successfully
         *
         * @param {T} writeResult
         * @memberof Property
         */
        Property.prototype.writeRequestExecuted = function (writeResult) {
            // recall response handler and pass the updated value
            if (this._writeResponseDelegate) {
                this._writeResponseDelegate(writeResult);
            }
            // after processing the response calls, the current response list is obsolete!
            this.endWriteRequest();
        };
        /**
         * Called after a write request has been rejected
         *
         * @param {*} error
         * @memberof Property
         */
        Property.prototype.writeRequestRejected = function (error) {
            // recall response handler and pass the updated value
            if (this._writeResponseRejectionDelegate) {
                this._writeResponseRejectionDelegate(error);
            }
            this.endWriteRequest();
        };
        // specifies a default handler for the read request
        Property.DEFAULT_READ_REQUEST_HANDLER = function () { console.error("Property: Read request can not be executed because the request handler is undefined!"); };
        // specifies a default handler for the read request
        Property.DEFAULT_WRITE_REQUEST_HANDLER = function () { console.error("Property: Write request can not be executed because the request handler is undefined!"); };
        // specefies the default value getter
        Property.DEFAULT_VALUE_GETTER = function (value) { return value; };
        return Property;
    }());
    exports.Property = Property;
    var PropertyRequestState;
    (function (PropertyRequestState) {
        PropertyRequestState[PropertyRequestState["Ready"] = 0] = "Ready";
        PropertyRequestState[PropertyRequestState["Pending"] = 1] = "Pending";
    })(PropertyRequestState || (PropertyRequestState = {}));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcGVydHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBwL2ZyYW1ld29yay9wcm9wZXJ0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztHQU9HOzs7O0lBRUg7UUFvQ0k7OztXQUdHO1FBQ0gsa0JBQXNCLFlBQWUsRUFBRSxnQkFBbUQsRUFBRSxpQkFBb0QsRUFBRSxXQUFxRDtZQUFyRCw0QkFBQSxFQUFBLHVCQUFxRDtZQW5Ddk0sOENBQThDO1lBQ3RDLDJCQUFzQixHQUFnRCxFQUFFLENBQUM7WUFZakYseUZBQXlGO1lBQ2pGLDJCQUFzQixHQUErQixFQUFFLENBQUM7WUFDaEUseUNBQXlDO1lBQ2pDLG9DQUErQixHQUFpQyxFQUFFLENBQUM7WUFDM0UsMEZBQTBGO1lBQ2xGLDJCQUFzQixHQUF1QyxTQUFTLENBQUM7WUFDL0Usc0ZBQXNGO1lBQzlFLG9DQUErQixHQUEyQyxTQUFTLENBQUM7WUFDNUYseUNBQXlDO1lBQ2pDLG9DQUErQixHQUEyQyxTQUFTLENBQUM7WUFDNUYsNkNBQTZDO1lBQ3JDLHNCQUFpQixHQUF5QixvQkFBb0IsQ0FBQyxLQUFLLENBQUM7WUFDN0UsNkNBQTZDO1lBQ3JDLHVCQUFrQixHQUF5QixvQkFBb0IsQ0FBQyxLQUFLLENBQUM7WUFVMUUsSUFBSSxDQUFDLHlCQUF5QixHQUFHLGdCQUFnQixDQUFDO1lBQ2xELElBQUksQ0FBQywwQkFBMEIsR0FBRyxpQkFBaUIsQ0FBQztZQUNwRCxJQUFJLENBQUMsTUFBTSxHQUFHLFlBQVksQ0FBQztZQUMzQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsb0JBQW9CLENBQUMsS0FBSyxDQUFDO1lBQ3BELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxvQkFBb0IsQ0FBQyxLQUFLLENBQUM7WUFDckQsSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUM7UUFFcEMsQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ0ksZUFBTSxHQUFiLFVB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Q0FBb0IsR0FBcEIsVUFBcUIsS0FBVTtZQUUzQixxREFBcUQ7WUFDckQsSUFBSSxJQUFJLENBQUMsK0JBQStCLEVBQUU7Z0JBQ3RDLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUMvQztZQUVELElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUMzQixDQUFDO1FBelNELG1EQUFtRDtRQUNwQyxxQ0FBNEIsR0FBd0MsY0FBUSxPQUFPLENBQUMsS0FBSyxDQUFDLHNGQUFzRixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcE0sbURBQW1EO1FBQ3BDLHNDQUE2QixHQUF3QyxjQUFRLE9BQU8sQ0FBQyxLQUFLLENBQUMsdUZBQXVGLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0TSxxQ0FBcUM7UUFDdEIsNkJBQW9CLEdBQTBCLFVBQUMsS0FBSyxJQUFRLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBc1MvRixlQUFDO0tBQUEsQUF0VEQsSUFzVEM7SUEwQlEsNEJBQVE7SUFWakIsSUFBSyxvQkFHSjtJQUhELFdBQUssb0JBQW9CO1FBQ3JCLGlFQUFLLENBQUE7UUFDTCxxRUFBTyxDQUFBO0lBQ1gsQ0FBQyxFQUhJLG9CQUFvQixLQUFwQixvQkFBb0IsUUFHeEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogSW1wbGVtZW50cyBhIHR5cGVkIGRhdGEgbGluay4gXHJcbiAqIFxyXG4gKiBcclxuICpcclxuICogQGNsYXNzIFByb3BlcnR5XHJcbiAqIEB0ZW1wbGF0ZSBUXHJcbiAqL1xyXG5cclxuY2xhc3MgUHJvcGVydHk8VD4ge1xyXG5cclxuICAgIC8vIEhvbGRzIHRoZSB2YWx1ZVxyXG4gICAgcHJpdmF0ZSBfdmFsdWUhOiBUO1xyXG5cclxuICAgIC8vIEhvbGRzIHRoZSBjaGFuZ2Ugbm90aWZpY2F0aW9uIGNhbGxiYWNrcyAgICBcclxuICAgIHByaXZhdGUgX3ZhbHVlQ2hhbmdlZENhbGxiYWNrczogQXJyYXk8KChuZXdWYWx1ZTogVCwgb2xkVmFsdWU6IFQpID0+IHZvaWQpPiA9IFtdO1xyXG4gICAgLy8gaG9sZHMgYSBjYWxsYmFjayBoYW5kbGVyIGZvciBhIGZvcmNlZCByZWFkIG9mIHRoZSB2YWx1ZVxyXG4gICAgcHJpdmF0ZSBfdmFsdWVSZWFkUmVxdWVzdERlbGVnYXRlOiAocHJvcGVydHk6IFByb3BlcnR5PFQ+KSA9PiB2b2lkO1xyXG4gICAgLy8gaG9sZHMgYSBjYWxsYmFjayBoYW5kbGVyIGZvciBhIGZvcmNlZCB3cml0ZSByZXF1ZXN0XHJcbiAgICBwcml2YXRlIF92YWx1ZVdyaXRlUmVxdWVzdERlbGVnYXRlOiAoKHByb3BlcnR5OiBQcm9wZXJ0eTxUPikgPT4gdm9pZCk7XHJcbiAgICAvLyBzcGVjaWZpZXMgYSBkZWZhdWx0IGhhbmRsZXIgZm9yIHRoZSByZWFkIHJlcXVlc3RcclxuICAgIHByaXZhdGUgc3RhdGljIERFRkFVTFRfUkVBRF9SRVFVRVNUX0hBTkRMRVI6ICgocHJvcGVydHk6IFByb3BlcnR5PGFueT4pID0+IHZvaWQpID0gKCkgPT4geyBjb25zb2xlLmVycm9yKFwiUHJvcGVydHk6IFJlYWQgcmVxdWVzdCBjYW4gbm90IGJlIGV4ZWN1dGVkIGJlY2F1c2UgdGhlIHJlcXVlc3QgaGFuZGxlciBpcyB1bmRlZmluZWQhXCIpOyB9O1xyXG4gICAgLy8gc3BlY2lmaWVzIGEgZGVmYXVsdCBoYW5kbGVyIGZvciB0aGUgcmVhZCByZXF1ZXN0XHJcbiAgICBwcml2YXRlIHN0YXRpYyBERUZBVUxUX1dSSVRFX1JFUVVFU1RfSEFORExFUjogKChwcm9wZXJ0eTogUHJvcGVydHk8YW55PikgPT4gdm9pZCkgPSAoKSA9PiB7IGNvbnNvbGUuZXJyb3IoXCJQcm9wZXJ0eTogV3JpdGUgcmVxdWVzdCBjYW4gbm90IGJlIGV4ZWN1dGVkIGJlY2F1c2UgdGhlIHJlcXVlc3QgaGFuZGxlciBpcyB1bmRlZmluZWQhXCIpOyB9O1xyXG4gICAgLy8gc3BlY2VmaWVzIHRoZSBkZWZhdWx0IHZhbHVlIGdldHRlclxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgREVGQVVMVF9WQUxVRV9HRVRURVI6ICgodmFsdWU6IGFueSkgPT4gYW55KSA9ICh2YWx1ZSkgPT4geyAgcmV0dXJuIHZhbHVlOyB9O1xyXG4gICBcclxuICAgIC8vIHNwZWNpZmllcyBhIHJlYWQgcmVzcG9uc2UgZGVsZWdhdGUgY2FsbGVkIGFmdGVyIGEgcmVhZCBoYXMgc3VjY2Vzc2Z1bGx5IGJlZW4gZXhlY3V0ZWQuXHJcbiAgICBwcml2YXRlIF9yZWFkUmVzcG9uc2VEZWxlZ2F0ZXM6IElQcm9wZXJ0eVJlYWRSZXNwb25zZTxUPltdID0gW107XHJcbiAgICAvLyBzcGVjaWZpZXMgdGhlIHJlYWQgcmVqZWN0aW9uIGRlbGVnYXRlc1xyXG4gICAgcHJpdmF0ZSBfcmVhZFJlamVjdGlvblJlc3BvbnNlRGVsZWdhdGVzOiBJUHJvcGVydHlSZWplY3Rpb25SZXNwb25zZVtdID0gW107XHJcbiAgICAvLyBzcGVjaWZpZXMgYSB3cml0ZSByZXNwb25zZSBkZWxlZ2F0ZSBjYWxsZWQgYWZ0ZXIgYSByZWFkIGhhcyBzdWNjZXNzZnVsbHkgYmVlbiBleGVjdXRlZC5cclxuICAgIHByaXZhdGUgX3dyaXRlUmVzcG9uc2VEZWxlZ2F0ZTogSVByb3BlcnR5V3JpdGVSZXNwb25zZSB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuICAgIC8vIHNwZWNpZmllcyBhIHJlYWQgcmVzcG9uc2UgZGVsZWdhdGUgY2FsbGVkIGFmdGVyIGEgd3JpdGUgcmVxdWVzdCBoYXMgIGJlZW4gcmVqZWN0ZWQuXHJcbiAgICBwcml2YXRlIF93cml0ZVJlc3BvbnNlUmVqZWN0aW9uRGVsZWdhdGU6IElQcm9wZXJ0eVJlamVjdGlvblJlc3BvbnNlIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG4gICAgLy8gc3BlY2lmaWVzIHRoZSB3cml0ZSByZWplY3Rpb24gZGVsZWdhdGVcclxuICAgIHByaXZhdGUgX3dyaXRlUmVqZWN0aW9uUmVzcG9uc2VEZWxlZ2F0ZTogSVByb3BlcnR5UmVqZWN0aW9uUmVzcG9uc2UgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICAvLyBzcGVjaWZpZXMgdGhlIGRhdGEgbGluayByZWFkIHJlcXVlc3Qgc3RhdGVcclxuICAgIHByaXZhdGUgX3JlYWRSZXF1ZXN0U3RhdGU6IFByb3BlcnR5UmVxdWVzdFN0YXRlID0gUHJvcGVydHlSZXF1ZXN0U3RhdGUuUmVhZHk7XHJcbiAgICAvLyBzcGVjaWZpZXMgdGhlIGRhdGEgbGluayByZWFkIHJlcXVlc3Qgc3RhdGVcclxuICAgIHByaXZhdGUgX3dyaXRlUmVxdWVzdFN0YXRlOiBQcm9wZXJ0eVJlcXVlc3RTdGF0ZSA9IFByb3BlcnR5UmVxdWVzdFN0YXRlLlJlYWR5O1xyXG4gICAgLy8gaG9sZHMgdGhlIHZhbHVlIGdldHRlciBkZWxlZ2F0ZVxyXG4gICAgcHJpdmF0ZSBfdmFsdWVHZXR0ZXI6ICgodmFsdWU6IFQpID0+IFQpIHwgdW5kZWZpbmVkO1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBEYXRhTGluay5cclxuICAgICAqICAgIEBtZW1iZXJvZiBQcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3IoaW5pdGlhbFZhbHVlOiBULCB2YWx1ZVJlYWRSZXF1ZXN0OiAoKGRhdGFMaW5rOiBQcm9wZXJ0eTxUPikgPT4gdm9pZCksIHZhbHVlV3JpdGVSZXF1ZXN0OiAoKGRhdGFMaW5rOiBQcm9wZXJ0eTxUPikgPT4gdm9pZCksIHZhbHVlR2V0dGVyOiAoKHZhbHVlOlQpID0+IFQpIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5fdmFsdWVSZWFkUmVxdWVzdERlbGVnYXRlID0gdmFsdWVSZWFkUmVxdWVzdDtcclxuICAgICAgICB0aGlzLl92YWx1ZVdyaXRlUmVxdWVzdERlbGVnYXRlID0gdmFsdWVXcml0ZVJlcXVlc3Q7XHJcbiAgICAgICAgdGhpcy5fdmFsdWUgPSBpbml0aWFsVmFsdWU7XHJcbiAgICAgICAgdGhpcy5fcmVhZFJlcXVlc3RTdGF0ZSA9IFByb3BlcnR5UmVxdWVzdFN0YXRlLlJlYWR5O1xyXG4gICAgICAgIHRoaXMuX3dyaXRlUmVxdWVzdFN0YXRlID0gUHJvcGVydHlSZXF1ZXN0U3RhdGUuUmVhZHk7XHJcbiAgICAgICAgdGhpcy5fdmFsdWVHZXR0ZXIgPSB2YWx1ZUdldHRlcjtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbmV3IERhdGFMaW5rIG9iamVjdCB3aXRoIHRoZSBzcGVjaWZpZWQgdHlwZVxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEB0ZW1wbGF0ZSBUXHJcbiAgICAgKiBAcGFyYW0ge1R9IGluaXRpYWxWYWx1ZVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBQcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY3JlYXRlPFQ+KGluaXRpYWxWYWx1ZTogVCwgdmFsdWVSZWFkUmVxdWVzdDogKChkYXRhTGluazogUHJvcGVydHk8VD4pID0+IHZvaWQpIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkLCB2YWx1ZVdyaXRlUmVxdWVzdDogKChkYXRhTGluazogUHJvcGVydHk8VD4pID0+IHZvaWQpIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkLCB2YWx1ZUdldHRlcjogKCh2YWx1ZTpUKSA9PiBUKSB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZCkge1xyXG5cclxuXHJcbiAgICAgICAgdmFsdWVSZWFkUmVxdWVzdCA9IHZhbHVlUmVhZFJlcXVlc3QgPyB2YWx1ZVJlYWRSZXF1ZXN0IDogUHJvcGVydHkuREVGQVVMVF9SRUFEX1JFUVVFU1RfSEFORExFUjtcclxuICAgICAgICB2YWx1ZVdyaXRlUmVxdWVzdCA9IHZhbHVlV3JpdGVSZXF1ZXN0ID8gdmFsdWVXcml0ZVJlcXVlc3QgOiBQcm9wZXJ0eS5ERUZBVUxUX1dSSVRFX1JFUVVFU1RfSEFORExFUjtcclxuICAgICAgICB2YWx1ZUdldHRlciA9IHZhbHVlR2V0dGVyID8gdmFsdWVHZXR0ZXIgOiBQcm9wZXJ0eS5ERUZBVUxUX1ZBTFVFX0dFVFRFUjtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wZXJ0eShpbml0aWFsVmFsdWUsIHZhbHVlUmVhZFJlcXVlc3QsIHZhbHVlV3JpdGVSZXF1ZXN0LHZhbHVlR2V0dGVyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIERhdGFMaW5rIE9iamVjdHMgdmFsdWUuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFByb3BlcnR5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgdmFsdWUobmV3VmFsdWU6IFQpIHtcclxuICAgICAgICBsZXQgb2xkVmFsdWUgPSB0aGlzLl92YWx1ZTtcclxuICAgICAgICB0aGlzLl92YWx1ZSA9IG5ld1ZhbHVlO1xyXG4gICAgICAgIHRoaXMub25WYWx1ZUNoYW5nZWQodGhpcy5fdmFsdWUsIG9sZFZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHByb3BlcnR5IG9iamVjdCB2YWx1ZS5cclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7VH1cclxuICAgICAqIEBtZW1iZXJvZiBQcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHZhbHVlKCk6IFQge1xyXG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuX3ZhbHVlO1xyXG4gICAgICAgIC8vIGdldCB0aGUgdmFsdWUgdmlhIHRoZSB2YWx1ZSBnZXR0ZXIgZGVsZWdhdGUsIGlmIGRlZmluZWQuIE90aGVyd2lzZSB1c2UgdGhlIG9yaWdpbmFsIHZhbHVlLlxyXG4gICAgICAgIGlmICh0aGlzLl92YWx1ZUdldHRlcikge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IHRoaXMuX3ZhbHVlR2V0dGVyKHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIHdoZW5ldmVyIHRoZSB2YWx1ZSBoYXMgYmVlbiBzZXQuIE5vdGlmaWVzIGxpc3RlbmVycyBmcm9tIGEgdmFsdWUgY2hhbmdlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtUfSBfdmFsdWVcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIFByb3BlcnR5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25WYWx1ZUNoYW5nZWQobmV3VmFsdWU6IFQsIG9sZFZhbHVlOiBUKTogYW55IHtcclxuICAgICAgICB0aGlzLl92YWx1ZUNoYW5nZWRDYWxsYmFja3MuZm9yRWFjaCgoY2FsbGJhY2spID0+IHsgY2FsbGJhY2sobmV3VmFsdWUsIG9sZFZhbHVlKSB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCB3aGVuZXZlciB0aGUgZGF0YSBsaW5rcyB2YWx1ZSBoYXMgY2hhbmdlZCBvciBpbml0YWxseSBhdHRhY2hlZC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyhuZXdWYWx1ZTpULCBvbGRWYWx1ZTpUKSA9PiB2b2lkfSBvblZhbHVlQ2hhbmdlZENhbGxCYWNrXHJcbiAgICAgKiBAbWVtYmVyb2YgUHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgY2hhbmdlZChvblZhbHVlQ2hhbmdlZENhbGxCYWNrOiAobmV3VmFsdWU6IFQsIG9sZFZhbHVlOiBUKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl92YWx1ZUNoYW5nZWRDYWxsYmFja3MuaW5jbHVkZXMob25WYWx1ZUNoYW5nZWRDYWxsQmFjaykpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIGFkZCB0aGUgbmV3IGhhbmRsZXJcclxuICAgICAgICAgICAgdGhpcy5fdmFsdWVDaGFuZ2VkQ2FsbGJhY2tzLnB1c2gob25WYWx1ZUNoYW5nZWRDYWxsQmFjayk7XHJcbiAgICAgICAgICAgIC8vIGlmIHRoZXJlIGlzIGFscmVhZHkgYSB2YWx1ZSBkZWZpbmVkLCB3ZSBub3RpZnkgdGhlIG5ldyBsaXN0ZW5lci5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX3ZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2gob25WYWx1ZUNoYW5nZWRDYWxsQmFjayk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJQcm9wZXJ0eSBjaGFuZ2UgYWxyZWFkeSBvYnNlcnZlZCBieSB0aGUgc2FtZSBoYW5kbGVyXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGZvcmNlcyBhIGNoYW5nZWQgY2FsbGJhY2sgd2l0aCB0aGUgY3VycmVudCBwcm9wZXJ0eSB2YWx1ZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7KG5ld1ZhbHVlOiBULCBvbGRWYWx1ZTogVCkgPT4gdm9pZH0gb25WYWx1ZUNoYW5nZWRDYWxsQmFja1xyXG4gICAgICogQG1lbWJlcm9mIFByb3BlcnR5XHJcbiAgICAgKi9cclxuICAgIHJlZnJlc2gob25WYWx1ZUNoYW5nZWRDYWxsQmFjazogKChuZXdWYWx1ZTogVCwgb2xkVmFsdWU6IFQpID0+IHZvaWQpfHVuZGVmaW5lZCA9IHVuZGVmaW5lZCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChvblZhbHVlQ2hhbmdlZENhbGxCYWNrKSB7XHJcbiAgICAgICAgICAgIG9uVmFsdWVDaGFuZ2VkQ2FsbEJhY2sodGhpcy5fdmFsdWUsIHRoaXMuX3ZhbHVlKTsgICAgICAgICAgICBcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5vblZhbHVlQ2hhbmdlZCh0aGlzLl92YWx1ZSwgdGhpcy5fdmFsdWUpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRm9yY2VzIGEgcmVmcmVzaCBvIHRoZSBkYXRhIGxpbmtzIHZhbHVlXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFByb3BlcnR5XHJcbiAgICAgKi9cclxuICAgIHJlYWQocmVhZFJlc3BvbnNlRGVsZWdhdGU6IElQcm9wZXJ0eVJlYWRSZXNwb25zZTxUPiB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZCwgcmVqZWN0aW9uUmVzcG9uc2VEZWxlZ2F0ZTogSVByb3BlcnR5UmVqZWN0aW9uUmVzcG9uc2UgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQpIHtcclxuXHJcbiAgICAgICAgLy8gYWRkIGEgcmVzcG9uc2UgZGVsZWdhdGUgZm9yIGV2ZXJ5IHJlYWQgY2FsbGVyLiBUaGlzIG1ha2VzIHN1cmUsIHRoYXQgbW9yZSBjYWxsZXJzIHBvc3NpYmx5IGZyb20gZGlmZmVyZW50IGNvbXBvbmVudHMsIHJlY2VpdmUgdGhlIHJlc3VsdHMgYXMgd2VsbCAhXHJcblxyXG4gICAgICAgIC8vIGFkZCByZWFkIHJlcXVlc3QgZGVsZWdhdGUgXHJcbiAgICAgICAgaWYgKHJlYWRSZXNwb25zZURlbGVnYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlYWRSZXNwb25zZURlbGVnYXRlcy5wdXNoKHJlYWRSZXNwb25zZURlbGVnYXRlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGFkZCByZWFkIHJlamVjdGlvbiBkZWxlZ2F0ZVxyXG4gICAgICAgIGlmIChyZWplY3Rpb25SZXNwb25zZURlbGVnYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlYWRSZWplY3Rpb25SZXNwb25zZURlbGVnYXRlcy5wdXNoKHJlamVjdGlvblJlc3BvbnNlRGVsZWdhdGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gaW52b2tlIHRoZSByZWFkIHJlcXVlc3QgaWYgbm90IGFscmVhZHkgcnVubmluZ1xyXG4gICAgICAgIGlmICh0aGlzLl9yZWFkUmVxdWVzdFN0YXRlID09PSBQcm9wZXJ0eVJlcXVlc3RTdGF0ZS5SZWFkeSkge1xyXG4gICAgICAgICAgICB0aGlzLmJlZ2luUmVhZFJlcXVlc3QoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RhcnRzIHRoZSByZXF1ZXN0IGZvciByZWFkaW5nIGEgZGF0YSBsaW5rcyB2YWx1ZS4gVGhlIG1ldGhvZCBkZWxnYXRlcyB0aGUgcmVxdWVzdCB0byB0aGUgY2FsbGJhY2sgaWYgZGVmaW5lZC5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFByb3BlcnR5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYmVnaW5SZWFkUmVxdWVzdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9yZWFkUmVxdWVzdFN0YXRlID0gUHJvcGVydHlSZXF1ZXN0U3RhdGUuUGVuZGluZztcclxuICAgICAgICBpZiAodGhpcy5fdmFsdWVSZWFkUmVxdWVzdERlbGVnYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlUmVhZFJlcXVlc3REZWxlZ2F0ZSh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIGFmdGVyIGEgcmVhZCByZXF1ZXN0IGhhcyBiZWVuIGV4ZWN1dGVkIHN1Y2Nlc3NmdWxseVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7VH0gY29tcG9uZW50UGFyYW1ldGVyc1xyXG4gICAgICogQG1lbWJlcm9mIFByb3BlcnR5XHJcbiAgICAgKi9cclxuICAgIHJlYWRSZXF1ZXN0RXhlY3V0ZWQocmVhZFJlc3VsdDogVCk6IHZvaWQge1xyXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgZGF0YSBsaW5rcyB2YWx1ZVxyXG4gICAgICAgIHRoaXMudmFsdWUgPSByZWFkUmVzdWx0O1xyXG5cclxuICAgICAgICAvLyByZWNhbGwgcmVzcG9uc2UgaGFuZGxlciBhbmQgcGFzcyB0aGUgdXBkYXRlZCB2YWx1ZVxyXG4gICAgICAgIHRoaXMuX3JlYWRSZXNwb25zZURlbGVnYXRlcy5mb3JFYWNoKChyZWFkUmVzcG9uc2VEZWxlZ2F0ZSkgPT4ge1xyXG4gICAgICAgICAgICByZWFkUmVzcG9uc2VEZWxlZ2F0ZSh0aGlzLnZhbHVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gYWZ0ZXIgcHJvY2Vzc2luZyB0aGUgcmVzcG9uc2UgY2FsbHMsIHRoZSBjdXJyZW50IHJlc3BvbnNlIGxpc3QgaXMgb2Jzb2xldGUhXHJcbiAgICAgICAgdGhpcy5lbmRSZWFkUmVxdWVzdCgpO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgYWZ0ZXIgYSByZWFkIHJlcXVlc3QgaGFzIGJlZW4gcmVqZXRjZWRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IGVycm9yXHJcbiAgICAgKiBAbWVtYmVyb2YgUHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcmVhZFJlcXVlc3RSZWplY3RlZChlcnJvcjogYW55KTogdm9pZCB7XHJcblxyXG4gICAgICAgIC8vIHJlY2FsbCByZXNwb25zZSBoYW5kbGVyIGFuZCBwYXNzIHRoZSB1cGRhdGVkIHZhbHVlXHJcbiAgICAgICAgdGhpcy5fcmVhZFJlamVjdGlvblJlc3BvbnNlRGVsZWdhdGVzLmZvckVhY2goKHJlYWRSZWplY3Rpb25SZXNwb25zZURlbGVnYXRlKSA9PiB7XHJcbiAgICAgICAgICAgIHJlYWRSZWplY3Rpb25SZXNwb25zZURlbGVnYXRlKGVycm9yKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5lbmRSZWFkUmVxdWVzdCgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRlcm1pbmF0ZXMgYSByZWFkIHJlcXVlc3RcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFByb3BlcnR5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZW5kUmVhZFJlcXVlc3QoKSB7XHJcbiAgICAgICAgdGhpcy5fcmVhZFJlc3BvbnNlRGVsZWdhdGVzID0gW107XHJcbiAgICAgICAgdGhpcy5fcmVhZFJlcXVlc3RTdGF0ZSA9IFByb3BlcnR5UmVxdWVzdFN0YXRlLlJlYWR5O1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZvcmNlcyBhIHdyaXRlIG9mIHRoZSBkYXRhIGxpbmsgdmFsdWUgdG8gdGhlIHZhbHVlIHByb3ZpZGVyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBuZXdWYWx1ZVxyXG4gICAgICogQHBhcmFtIHsoKCh3cml0ZVJlc3VsdDpUKT0+dm9pZCl8dW5kZWZpbmVkKX0gW3dyaXRlUmVzcG9uc2VEZWxlZ2F0ZT11bmRlZmluZWRdXHJcbiAgICAgKiBAbWVtYmVyb2YgUHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgd3JpdGUod3JpdGVSZXNwb25zZURlbGVnYXRlOiBJUHJvcGVydHlXcml0ZVJlc3BvbnNlIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkLCB3cml0ZVJlamVjdGlvbkRlbGVnYXRlOiBJUHJvcGVydHlSZWplY3Rpb25SZXNwb25zZSB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuX3dyaXRlUmVzcG9uc2VEZWxlZ2F0ZSA9IHdyaXRlUmVzcG9uc2VEZWxlZ2F0ZTtcclxuICAgICAgICBpZiAodGhpcy5fd3JpdGVSZXF1ZXN0U3RhdGUgPT09IFByb3BlcnR5UmVxdWVzdFN0YXRlLlJlYWR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmVnaW5Xcml0ZVJlcXVlc3QoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGVybWluYXRlcyB0aGUgd3JpdGUgcmVxdWVzdFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgUHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBlbmRXcml0ZVJlcXVlc3QoKSB7XHJcbiAgICAgICAgdGhpcy5fd3JpdGVSZXNwb25zZURlbGVnYXRlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuX3dyaXRlUmVxdWVzdFN0YXRlID0gUHJvcGVydHlSZXF1ZXN0U3RhdGUuUmVhZHk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdGFydHMgdGhlIHJlcXVlc3QgZm9yIHdyaXRpbmcgYSBkYXRhIGxpbmtzIHZhbHVlLiBUaGUgbWV0aG9kIGRlbGdhdGVzIHRoZSByZXF1ZXN0IHRvIHRoZSBjYWxsYmFjayBpZiBkZWZpbmVkLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gbmV3VmFsdWVcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIFByb3BlcnR5XHJcbiAgICAgKi9cclxuICAgIGJlZ2luV3JpdGVSZXF1ZXN0KCk6IGFueSB7XHJcbiAgICAgICAgdGhpcy5fd3JpdGVSZXF1ZXN0U3RhdGUgPSBQcm9wZXJ0eVJlcXVlc3RTdGF0ZS5QZW5kaW5nO1xyXG4gICAgICAgIGlmICh0aGlzLl92YWx1ZVdyaXRlUmVxdWVzdERlbGVnYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlV3JpdGVSZXF1ZXN0RGVsZWdhdGUodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgYWZ0ZXIgYSB3cml0ZSByZXF1ZXN0IGhhcyBiZWVuIGV4ZWN1dGVkIHN1Y2Nlc3NmdWxseVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7VH0gd3JpdGVSZXN1bHRcclxuICAgICAqIEBtZW1iZXJvZiBQcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgICB3cml0ZVJlcXVlc3RFeGVjdXRlZCh3cml0ZVJlc3VsdDogYW55KTogdm9pZCB7XHJcblxyXG4gICAgICAgIC8vIHJlY2FsbCByZXNwb25zZSBoYW5kbGVyIGFuZCBwYXNzIHRoZSB1cGRhdGVkIHZhbHVlXHJcbiAgICAgICAgaWYgKHRoaXMuX3dyaXRlUmVzcG9uc2VEZWxlZ2F0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl93cml0ZVJlc3BvbnNlRGVsZWdhdGUod3JpdGVSZXN1bHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gYWZ0ZXIgcHJvY2Vzc2luZyB0aGUgcmVzcG9uc2UgY2FsbHMsIHRoZSBjdXJyZW50IHJlc3BvbnNlIGxpc3QgaXMgb2Jzb2xldGUhXHJcbiAgICAgICAgdGhpcy5lbmRXcml0ZVJlcXVlc3QoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgYWZ0ZXIgYSB3cml0ZSByZXF1ZXN0IGhhcyBiZWVuIHJlamVjdGVkXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBlcnJvclxyXG4gICAgICogQG1lbWJlcm9mIFByb3BlcnR5XHJcbiAgICAgKi9cclxuICAgIHdyaXRlUmVxdWVzdFJlamVjdGVkKGVycm9yOiBhbnkpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgLy8gcmVjYWxsIHJlc3BvbnNlIGhhbmRsZXIgYW5kIHBhc3MgdGhlIHVwZGF0ZWQgdmFsdWVcclxuICAgICAgICBpZiAodGhpcy5fd3JpdGVSZXNwb25zZVJlamVjdGlvbkRlbGVnYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3dyaXRlUmVzcG9uc2VSZWplY3Rpb25EZWxlZ2F0ZShlcnJvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmVuZFdyaXRlUmVxdWVzdCgpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuaW50ZXJmYWNlIElQcm9wZXJ0eVJlYWRSZXNwb25zZTxUPiB7XHJcbiAgICAocmVzdWx0RGF0YTogVCk6IHZvaWQ7XHJcbn1cclxuXHJcblxyXG5pbnRlcmZhY2UgSVByb3BlcnR5V3JpdGVSZXNwb25zZSB7XHJcbiAgICAocmVzdWx0RGF0YTogYW55KTogdm9pZDtcclxufVxyXG5cclxuXHJcbmludGVyZmFjZSBJUHJvcGVydHlSZWplY3Rpb25SZXNwb25zZSB7XHJcbiAgICAoZXJyb3I6IGFueSk6IHZvaWQ7XHJcbn1cclxuXHJcbmVudW0gUHJvcGVydHlSZXF1ZXN0U3RhdGUge1xyXG4gICAgUmVhZHksXHJcbiAgICBQZW5kaW5nLFxyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbmV4cG9ydCB7IFByb3BlcnR5IH07Il19