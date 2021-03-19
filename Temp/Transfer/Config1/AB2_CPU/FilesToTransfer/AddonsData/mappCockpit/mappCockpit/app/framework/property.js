define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Implements a typed data link.
     *
     *
     *
     * @class Property
     * @template T
     */
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
            // holds observers
            this._observers = [];
            // holds accessors, meaning objects updating the property values
            this._accessors = [];
            this._valueReadRequestDelegate = valueReadRequest;
            this._valueWriteRequestDelegate = valueWriteRequest;
            this._value = initialValue;
            this._readRequestState = PropertyRequestState.Ready;
            this._writeRequestState = PropertyRequestState.Ready;
            this._valueGetter = valueGetter;
        }
        /**
         * Attaches an accessor instance.
         *
         * @param {object} accessorInstance
         * @memberof Property
         */
        Property.prototype.attachAccessor = function (accessorInstance) {
            this.addAccessor(accessorInstance);
        };
        /**
         * Adds an accessor
         *
         * @private
         * @param {object} caller
         * @memberof Property
         */
        Property.prototype.addAccessor = function (caller) {
            this.accessors.push(new PropertyClient(caller));
        };
        /**
         * Detaches the bound object as accessor
         *
         * @param {object} boundObject
         * @memberof Property
         */
        Property.prototype.detachAccessor = function (boundObject) {
            // remove the client object from the accessors list
            this.removeAccessor(boundObject);
        };
        /**
         * Removes an accessor instance
         *
         * @private
         * @param {object} boundObject
         * @memberof Property
         */
        Property.prototype.removeAccessor = function (boundObject) {
            this._accessors = this._accessors.filter(function (accessor) { return accessor.client != boundObject; });
        };
        /**
         * Attaches the caller as observer
         *
         * @param {object} caller
         * @memberof Property
         */
        Property.prototype.attachObserver = function (caller, propertyValueChangedDelegate) {
            // add the caller as observer
            this.addObserver(caller, propertyValueChangedDelegate);
            // attach the change notification callback
            this.observePropertyValue(propertyValueChangedDelegate);
        };
        /**
         * Adds an observer instance
         *
         * @private
         * @param {object} caller
         * @param {T_PROPERTYCHANGED_HANDLER} propertyValueChangedDelegate
         * @memberof Property
         */
        Property.prototype.addObserver = function (caller, propertyValueChangedDelegate) {
            this.observers.push(new PropertyClient(caller, propertyValueChangedDelegate));
        };
        /**
         * Obseres the property value and calls the specified changed delegate after changes.
         *
         * @private
         * @param {T_PROPERTYCHANGED_HANDLER} propertyValueChangedDelegate
         * @memberof Property
         */
        Property.prototype.observePropertyValue = function (propertyValueChangedDelegate) {
            this.changed(propertyValueChangedDelegate);
        };
        /**
         * Detaches the bound object as accessor
         *
         * @param {object} boundObject
         * @memberof Property
         */
        Property.prototype.detachObserver = function (boundObject) {
            // get the observer client object
            var observerClient = this._observers.find(function (observer) { return observer.client === boundObject; });
            if (observerClient) {
                if (observerClient.valueChangedHandler) {
                    // remove the observers delegate from the changed notifications
                    this.removeValueChangedDelegate(observerClient.valueChangedHandler);
                    // remove the client object from the accessors list
                    this.removeObserver(observerClient);
                }
            }
        };
        /**
         * Removes an observer
         *
         * @private
         * @param {PropertyClient} observerClient
         * @memberof Property
         */
        Property.prototype.removeObserver = function (observerClient) {
            this._observers = this._observers.filter(function (observer) { return observer.client != observerClient.client; });
        };
        /**
         * Removes the specified value changed delagate
         *addval
         * @private
         * @param {PropertyClient} observerClient
         * @memberof Property
         */
        Property.prototype.removeValueChangedDelegate = function (valueChangedDelegate) {
            this._valueChangedCallbacks = this._valueChangedCallbacks.filter(function (vaueChangedHandler) { return vaueChangedHandler != valueChangedDelegate; });
        };
        /**
         * Returns true if the property is already observed by the specified instance
         *
         * @param {object} observer
         * @returns {boolean}
         * @memberof Property
         */
        Property.prototype.isObservedBy = function (observerInstance) {
            return this.observers.find(function (observer) { return observer.client === observerInstance; }) !== undefined;
        };
        /**
         * Returns true if the property is already registered to be accessed by the specified instance
         *
         * @param {object} accessor
         * @returns {boolean}
         * @memberof Property
         */
        Property.prototype.isAccessedBy = function (accessorInstance) {
            return this.accessors.find(function (accessor) { return accessor.client === accessorInstance; }) !== undefined;
        };
        Object.defineProperty(Property.prototype, "isAttached", {
            /**
             * Gets true if the property is attached, meaning accessed or observed.
             *
             * @readonly
             * @type {boolean}
             * @memberof Property
             */
            get: function () {
                return this.observers.length > 0 || this.accessors.length > 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Property.prototype, "observers", {
            /**
             * Gets the properties observers
             *
             * @readonly
             * @type {Array<PropertyClient>}
             * @memberof Property
             */
            get: function () {
                return this._observers;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Property.prototype, "accessors", {
            /**
             * Gets the properties accessors
             *
             * @readonly
             * @type { Array<PropertyClient> }
             * @memberof Property
             */
            get: function () {
                return this._accessors;
            },
            enumerable: true,
            configurable: true
        });
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
                this.addValueChangedDelegate(onValueChangedCallBack);
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
         * Adds the specified value changed delegate.
         *
         * @private
         * @param {T_PROPERTYCHANGED_HANDLER} onValueChangedDelegate
         * @memberof Property
         */
        Property.prototype.addValueChangedDelegate = function (onValueChangedDelegate) {
            this._valueChangedCallbacks.push(onValueChangedDelegate);
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
    var PropertyClient = /** @class */ (function () {
        function PropertyClient(client, changedHandler) {
            if (changedHandler === void 0) { changedHandler = null; }
            this._client = client;
            this._changedHandler = changedHandler;
        }
        Object.defineProperty(PropertyClient.prototype, "client", {
            get: function () {
                return this._client;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PropertyClient.prototype, "valueChangedHandler", {
            get: function () {
                return this._changedHandler;
            },
            enumerable: true,
            configurable: true
        });
        return PropertyClient;
    }());
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcGVydHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBwL2ZyYW1ld29yay9wcm9wZXJ0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFHQTs7Ozs7OztPQU9HO0lBRUg7UUF1Q0k7OztXQUdHO1FBQ0gsa0JBQXNCLFlBQWUsRUFBRSxnQkFBbUQsRUFBRSxpQkFBb0QsRUFBRSxXQUFxRDtZQUFyRCw0QkFBQSxFQUFBLHVCQUFxRDtZQXRDdk0sOENBQThDO1lBQ3RDLDJCQUFzQixHQUFxQyxFQUFFLENBQUM7WUFZdEUseUZBQXlGO1lBQ2pGLDJCQUFzQixHQUErQixFQUFFLENBQUM7WUFDaEUseUNBQXlDO1lBQ2pDLG9DQUErQixHQUFpQyxFQUFFLENBQUM7WUFDM0UsMEZBQTBGO1lBQ2xGLDJCQUFzQixHQUF1QyxTQUFTLENBQUM7WUFDL0Usc0ZBQXNGO1lBQzlFLG9DQUErQixHQUEyQyxTQUFTLENBQUM7WUFDNUYseUNBQXlDO1lBQ2pDLG9DQUErQixHQUEyQyxTQUFTLENBQUM7WUFDNUYsNkNBQTZDO1lBQ3JDLHNCQUFpQixHQUF5QixvQkFBb0IsQ0FBQyxLQUFLLENBQUM7WUFDN0UsNkNBQTZDO1lBQ3JDLHVCQUFrQixHQUF5QixvQkFBb0IsQ0FBQyxLQUFLLENBQUM7WUFHOUUsa0JBQWtCO1lBQ1YsZUFBVSxHQUEyQixFQUFFLENBQUM7WUFDaEQsZ0VBQWdFO1lBQ3hELGVBQVUsR0FBMkIsRUFBRSxDQUFDO1lBTzVDLElBQUksQ0FBQyx5QkFBeUIsR0FBRyxnQkFBZ0IsQ0FBQztZQUNsRCxJQUFJLENBQUMsMEJBQTBCLEdBQUcsaUJBQWlCLENBQUM7WUFDcEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxZQUFZLENBQUM7WUFDM0IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLG9CQUFvQixDQUFDLEtBQUssQ0FBQztZQUNwRCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsb0JBQW9CLENBQUMsS0FBSyxDQUFDO1lB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QyxlQUFlLEVBQUUsQ0FBQztRQUMzQixDQUFDO1FBcmZELG1EQUFtRDtRQUNwQyxxQ0FBNEIsR0FBd0MsY0FBUSxPQUFPLENBQUMsS0FBSyxDQUFDLHNGQUFzRixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcE0sbURBQW1EO1FBQ3BDLHNDQUE2QixHQUF3QyxjQUFRLE9BQU8sQ0FBQyxLQUFLLENBQUMsdUZBQXVGLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0TSxxQ0FBcUM7UUFDdEIsNkJBQW9CLEdBQTBCLFVBQUMsS0FBSyxJQUFRLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBa2YvRixlQUFDO0tBQUEsQUFsZ0JELElBa2dCQztJQWxnQlksNEJBQVE7SUFraEJyQixJQUFLLG9CQUdKO0lBSEQsV0FBSyxvQkFBb0I7UUFDckIsaUVBQUssQ0FBQTtRQUNMLHFFQUFPLENBQUE7SUFDWCxDQUFDLEVBSEksb0JBQW9CLEtBQXBCLG9CQUFvQixRQUd4QjtJQUtEO1FBS0ksd0JBQVksTUFBTSxFQUFDLGNBQW9EO1lBQXBELCtCQUFBLEVBQUEscUJBQW9EO1lBRW5FLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxlQUFlLEdBQUcsY0FBYyxDQUFDO1FBRTFDLENBQUM7UUFHRCxzQkFBVyxrQ0FBTTtpQkFBakI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFBO1lBQ3ZCLENBQUM7OztXQUFBO1FBSUQsc0JBQVcsK0NBQW1CO2lCQUE5QjtnQkFDSSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUE7WUFDL0IsQ0FBQzs7O1dBQUE7UUFJTCxxQkFBQztJQUFELENBQUMsQUF6QkQsSUF5QkMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxudHlwZSBUX1BST1BFUlRZQ0hBTkdFRF9IQU5ETEVSID0gIChuZXdWYWx1ZTogYW55LCBvbGRWYWx1ZTogYW55KSA9PiB2b2lkO1xyXG5cclxuLyoqXHJcbiAqIEltcGxlbWVudHMgYSB0eXBlZCBkYXRhIGxpbmsuIFxyXG4gKiBcclxuICogXHJcbiAqXHJcbiAqIEBjbGFzcyBQcm9wZXJ0eVxyXG4gKiBAdGVtcGxhdGUgVFxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBQcm9wZXJ0eTxUPiB7XHJcblxyXG4gICAgLy8gSG9sZHMgdGhlIHZhbHVlXHJcbiAgICBwcml2YXRlIF92YWx1ZSE6IFQ7XHJcblxyXG4gICAgLy8gSG9sZHMgdGhlIGNoYW5nZSBub3RpZmljYXRpb24gY2FsbGJhY2tzICAgIFxyXG4gICAgcHJpdmF0ZSBfdmFsdWVDaGFuZ2VkQ2FsbGJhY2tzOiBBcnJheTxUX1BST1BFUlRZQ0hBTkdFRF9IQU5ETEVSPiA9IFtdO1xyXG4gICAgLy8gaG9sZHMgYSBjYWxsYmFjayBoYW5kbGVyIGZvciBhIGZvcmNlZCByZWFkIG9mIHRoZSB2YWx1ZVxyXG4gICAgcHJpdmF0ZSBfdmFsdWVSZWFkUmVxdWVzdERlbGVnYXRlOiAocHJvcGVydHk6IFByb3BlcnR5PFQ+KSA9PiB2b2lkO1xyXG4gICAgLy8gaG9sZHMgYSBjYWxsYmFjayBoYW5kbGVyIGZvciBhIGZvcmNlZCB3cml0ZSByZXF1ZXN0XHJcbiAgICBwcml2YXRlIF92YWx1ZVdyaXRlUmVxdWVzdERlbGVnYXRlOiAoKHByb3BlcnR5OiBQcm9wZXJ0eTxUPikgPT4gdm9pZCk7XHJcbiAgICAvLyBzcGVjaWZpZXMgYSBkZWZhdWx0IGhhbmRsZXIgZm9yIHRoZSByZWFkIHJlcXVlc3RcclxuICAgIHByaXZhdGUgc3RhdGljIERFRkFVTFRfUkVBRF9SRVFVRVNUX0hBTkRMRVI6ICgocHJvcGVydHk6IFByb3BlcnR5PGFueT4pID0+IHZvaWQpID0gKCkgPT4geyBjb25zb2xlLmVycm9yKFwiUHJvcGVydHk6IFJlYWQgcmVxdWVzdCBjYW4gbm90IGJlIGV4ZWN1dGVkIGJlY2F1c2UgdGhlIHJlcXVlc3QgaGFuZGxlciBpcyB1bmRlZmluZWQhXCIpOyB9O1xyXG4gICAgLy8gc3BlY2lmaWVzIGEgZGVmYXVsdCBoYW5kbGVyIGZvciB0aGUgcmVhZCByZXF1ZXN0XHJcbiAgICBwcml2YXRlIHN0YXRpYyBERUZBVUxUX1dSSVRFX1JFUVVFU1RfSEFORExFUjogKChwcm9wZXJ0eTogUHJvcGVydHk8YW55PikgPT4gdm9pZCkgPSAoKSA9PiB7IGNvbnNvbGUuZXJyb3IoXCJQcm9wZXJ0eTogV3JpdGUgcmVxdWVzdCBjYW4gbm90IGJlIGV4ZWN1dGVkIGJlY2F1c2UgdGhlIHJlcXVlc3QgaGFuZGxlciBpcyB1bmRlZmluZWQhXCIpOyB9O1xyXG4gICAgLy8gc3BlY2VmaWVzIHRoZSBkZWZhdWx0IHZhbHVlIGdldHRlclxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgREVGQVVMVF9WQUxVRV9HRVRURVI6ICgodmFsdWU6IGFueSkgPT4gYW55KSA9ICh2YWx1ZSkgPT4geyAgcmV0dXJuIHZhbHVlOyB9O1xyXG4gICBcclxuICAgIC8vIHNwZWNpZmllcyBhIHJlYWQgcmVzcG9uc2UgZGVsZWdhdGUgY2FsbGVkIGFmdGVyIGEgcmVhZCBoYXMgc3VjY2Vzc2Z1bGx5IGJlZW4gZXhlY3V0ZWQuXHJcbiAgICBwcml2YXRlIF9yZWFkUmVzcG9uc2VEZWxlZ2F0ZXM6IElQcm9wZXJ0eVJlYWRSZXNwb25zZTxUPltdID0gW107XHJcbiAgICAvLyBzcGVjaWZpZXMgdGhlIHJlYWQgcmVqZWN0aW9uIGRlbGVnYXRlc1xyXG4gICAgcHJpdmF0ZSBfcmVhZFJlamVjdGlvblJlc3BvbnNlRGVsZWdhdGVzOiBJUHJvcGVydHlSZWplY3Rpb25SZXNwb25zZVtdID0gW107XHJcbiAgICAvLyBzcGVjaWZpZXMgYSB3cml0ZSByZXNwb25zZSBkZWxlZ2F0ZSBjYWxsZWQgYWZ0ZXIgYSByZWFkIGhhcyBzdWNjZXNzZnVsbHkgYmVlbiBleGVjdXRlZC5cclxuICAgIHByaXZhdGUgX3dyaXRlUmVzcG9uc2VEZWxlZ2F0ZTogSVByb3BlcnR5V3JpdGVSZXNwb25zZSB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuICAgIC8vIHNwZWNpZmllcyBhIHJlYWQgcmVzcG9uc2UgZGVsZWdhdGUgY2FsbGVkIGFmdGVyIGEgd3JpdGUgcmVxdWVzdCBoYXMgIGJlZW4gcmVqZWN0ZWQuXHJcbiAgICBwcml2YXRlIF93cml0ZVJlc3BvbnNlUmVqZWN0aW9uRGVsZWdhdGU6IElQcm9wZXJ0eVJlamVjdGlvblJlc3BvbnNlIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG4gICAgLy8gc3BlY2lmaWVzIHRoZSB3cml0ZSByZWplY3Rpb24gZGVsZWdhdGVcclxuICAgIHByaXZhdGUgX3dyaXRlUmVqZWN0aW9uUmVzcG9uc2VEZWxlZ2F0ZTogSVByb3BlcnR5UmVqZWN0aW9uUmVzcG9uc2UgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICAvLyBzcGVjaWZpZXMgdGhlIGRhdGEgbGluayByZWFkIHJlcXVlc3Qgc3RhdGVcclxuICAgIHByaXZhdGUgX3JlYWRSZXF1ZXN0U3RhdGU6IFByb3BlcnR5UmVxdWVzdFN0YXRlID0gUHJvcGVydHlSZXF1ZXN0U3RhdGUuUmVhZHk7XHJcbiAgICAvLyBzcGVjaWZpZXMgdGhlIGRhdGEgbGluayByZWFkIHJlcXVlc3Qgc3RhdGVcclxuICAgIHByaXZhdGUgX3dyaXRlUmVxdWVzdFN0YXRlOiBQcm9wZXJ0eVJlcXVlc3RTdGF0ZSA9IFByb3BlcnR5UmVxdWVzdFN0YXRlLlJlYWR5O1xyXG4gICAgLy8gaG9sZHMgdGhlIHZhbHVlIGdldHRlciBkZWxlZ2F0ZVxyXG4gICAgcHJpdmF0ZSBfdmFsdWVHZXR0ZXI6ICgodmFsdWU6IFQpID0+IFQpIHwgdW5kZWZpbmVkO1xyXG4gICAgLy8gaG9sZHMgb2JzZXJ2ZXJzXHJcbiAgICBwcml2YXRlIF9vYnNlcnZlcnM6IEFycmF5PFByb3BlcnR5Q2xpZW50ID4gPSBbXTtcclxuICAgIC8vIGhvbGRzIGFjY2Vzc29ycywgbWVhbmluZyBvYmplY3RzIHVwZGF0aW5nIHRoZSBwcm9wZXJ0eSB2YWx1ZXNcclxuICAgIHByaXZhdGUgX2FjY2Vzc29yczogQXJyYXk8UHJvcGVydHlDbGllbnQgPiA9IFtdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICpDcmVhdGVzIGFuIGluc3RhbmNlIG9mIERhdGFMaW5rLlxyXG4gICAgICogICAgQG1lbWJlcm9mIFByb3BlcnR5XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBjb25zdHJ1Y3Rvcihpbml0aWFsVmFsdWU6IFQsIHZhbHVlUmVhZFJlcXVlc3Q6ICgoZGF0YUxpbms6IFByb3BlcnR5PFQ+KSA9PiB2b2lkKSwgdmFsdWVXcml0ZVJlcXVlc3Q6ICgoZGF0YUxpbms6IFByb3BlcnR5PFQ+KSA9PiB2b2lkKSwgdmFsdWVHZXR0ZXI6ICgodmFsdWU6VCkgPT4gVCkgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLl92YWx1ZVJlYWRSZXF1ZXN0RGVsZWdhdGUgPSB2YWx1ZVJlYWRSZXF1ZXN0O1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlV3JpdGVSZXF1ZXN0RGVsZWdhdGUgPSB2YWx1ZVdyaXRlUmVxdWVzdDtcclxuICAgICAgICB0aGlzLl92YWx1ZSA9IGluaXRpYWxWYWx1ZTtcclxuICAgICAgICB0aGlzLl9yZWFkUmVxdWVzdFN0YXRlID0gUHJvcGVydHlSZXF1ZXN0U3RhdGUuUmVhZHk7XHJcbiAgICAgICAgdGhpcy5fd3JpdGVSZXF1ZXN0U3RhdGUgPSBQcm9wZXJ0eVJlcXVlc3RTdGF0ZS5SZWFkeTtcclxuICAgICAgICB0aGlzLl92YWx1ZUdldHRlciA9IHZhbHVlR2V0dGVyO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEF0dGFjaGVzIGFuIGFjY2Vzc29yIGluc3RhbmNlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBhY2Nlc3Nvckluc3RhbmNlXHJcbiAgICAgKiBAbWVtYmVyb2YgUHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGF0dGFjaEFjY2Vzc29yKGFjY2Vzc29ySW5zdGFuY2U6IG9iamVjdCkge1xyXG4gICAgICAgIHRoaXMuYWRkQWNjZXNzb3IoYWNjZXNzb3JJbnN0YW5jZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGFuIGFjY2Vzc29yXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBjYWxsZXJcclxuICAgICAqIEBtZW1iZXJvZiBQcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZEFjY2Vzc29yKGNhbGxlcjogb2JqZWN0KSB7XHJcbiAgICAgICAgdGhpcy5hY2Nlc3NvcnMucHVzaChuZXcgUHJvcGVydHlDbGllbnQoY2FsbGVyKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXRhY2hlcyB0aGUgYm91bmQgb2JqZWN0IGFzIGFjY2Vzc29yXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGJvdW5kT2JqZWN0XHJcbiAgICAgKiBAbWVtYmVyb2YgUHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRldGFjaEFjY2Vzc29yKGJvdW5kT2JqZWN0OiBvYmplY3QpIHtcclxuICAgICAgICAvLyByZW1vdmUgdGhlIGNsaWVudCBvYmplY3QgZnJvbSB0aGUgYWNjZXNzb3JzIGxpc3RcclxuICAgICAgICB0aGlzLnJlbW92ZUFjY2Vzc29yKGJvdW5kT2JqZWN0KTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyBhbiBhY2Nlc3NvciBpbnN0YW5jZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gYm91bmRPYmplY3RcclxuICAgICAqIEBtZW1iZXJvZiBQcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlbW92ZUFjY2Vzc29yKGJvdW5kT2JqZWN0OiBvYmplY3QpIHtcclxuICAgICAgICB0aGlzLl9hY2Nlc3NvcnMgPSB0aGlzLl9hY2Nlc3NvcnMuZmlsdGVyKChhY2Nlc3NvcikgPT4geyByZXR1cm4gYWNjZXNzb3IuY2xpZW50ICE9IGJvdW5kT2JqZWN0OyB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEF0dGFjaGVzIHRoZSBjYWxsZXIgYXMgb2JzZXJ2ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gY2FsbGVyXHJcbiAgICAgKiBAbWVtYmVyb2YgUHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGF0dGFjaE9ic2VydmVyKGNhbGxlcjogb2JqZWN0LCAgcHJvcGVydHlWYWx1ZUNoYW5nZWREZWxlZ2F0ZTpUX1BST1BFUlRZQ0hBTkdFRF9IQU5ETEVSKSB7XHJcblxyXG4gICAgICAgIC8vIGFkZCB0aGUgY2FsbGVyIGFzIG9ic2VydmVyXHJcbiAgICAgICAgdGhpcy5hZGRPYnNlcnZlcihjYWxsZXIsIHByb3BlcnR5VmFsdWVDaGFuZ2VkRGVsZWdhdGUpO1xyXG5cclxuICAgICAgICAvLyBhdHRhY2ggdGhlIGNoYW5nZSBub3RpZmljYXRpb24gY2FsbGJhY2tcclxuICAgICAgICB0aGlzLm9ic2VydmVQcm9wZXJ0eVZhbHVlKHByb3BlcnR5VmFsdWVDaGFuZ2VkRGVsZWdhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhbiBvYnNlcnZlciBpbnN0YW5jZSBcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGNhbGxlclxyXG4gICAgICogQHBhcmFtIHtUX1BST1BFUlRZQ0hBTkdFRF9IQU5ETEVSfSBwcm9wZXJ0eVZhbHVlQ2hhbmdlZERlbGVnYXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgUHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRPYnNlcnZlcihjYWxsZXI6IG9iamVjdCwgcHJvcGVydHlWYWx1ZUNoYW5nZWREZWxlZ2F0ZTogVF9QUk9QRVJUWUNIQU5HRURfSEFORExFUikge1xyXG4gICAgICAgIHRoaXMub2JzZXJ2ZXJzLnB1c2gobmV3IFByb3BlcnR5Q2xpZW50KGNhbGxlciwgcHJvcGVydHlWYWx1ZUNoYW5nZWREZWxlZ2F0ZSkpO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT2JzZXJlcyB0aGUgcHJvcGVydHkgdmFsdWUgYW5kIGNhbGxzIHRoZSBzcGVjaWZpZWQgY2hhbmdlZCBkZWxlZ2F0ZSBhZnRlciBjaGFuZ2VzLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge1RfUFJPUEVSVFlDSEFOR0VEX0hBTkRMRVJ9IHByb3BlcnR5VmFsdWVDaGFuZ2VkRGVsZWdhdGVcclxuICAgICAqIEBtZW1iZXJvZiBQcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9ic2VydmVQcm9wZXJ0eVZhbHVlKHByb3BlcnR5VmFsdWVDaGFuZ2VkRGVsZWdhdGU6IFRfUFJPUEVSVFlDSEFOR0VEX0hBTkRMRVIpIHtcclxuICAgICAgICB0aGlzLmNoYW5nZWQocHJvcGVydHlWYWx1ZUNoYW5nZWREZWxlZ2F0ZSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGV0YWNoZXMgdGhlIGJvdW5kIG9iamVjdCBhcyBhY2Nlc3NvclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBib3VuZE9iamVjdFxyXG4gICAgICogQG1lbWJlcm9mIFByb3BlcnR5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkZXRhY2hPYnNlcnZlcihib3VuZE9iamVjdDogb2JqZWN0KSB7XHJcblxyXG4gICAgICAgIC8vIGdldCB0aGUgb2JzZXJ2ZXIgY2xpZW50IG9iamVjdFxyXG4gICAgICAgIGNvbnN0IG9ic2VydmVyQ2xpZW50ID0gdGhpcy5fb2JzZXJ2ZXJzLmZpbmQoKG9ic2VydmVyKSA9PiB7IHJldHVybiBvYnNlcnZlci5jbGllbnQgPT09IGJvdW5kT2JqZWN0IH0pO1xyXG4gICAgICAgIGlmIChvYnNlcnZlckNsaWVudCkge1xyXG4gICAgICAgICAgICBpZiAob2JzZXJ2ZXJDbGllbnQudmFsdWVDaGFuZ2VkSGFuZGxlcikge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSB0aGUgb2JzZXJ2ZXJzIGRlbGVnYXRlIGZyb20gdGhlIGNoYW5nZWQgbm90aWZpY2F0aW9uc1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVWYWx1ZUNoYW5nZWREZWxlZ2F0ZShvYnNlcnZlckNsaWVudC52YWx1ZUNoYW5nZWRIYW5kbGVyKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgdGhlIGNsaWVudCBvYmplY3QgZnJvbSB0aGUgYWNjZXNzb3JzIGxpc3RcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlT2JzZXJ2ZXIob2JzZXJ2ZXJDbGllbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgYW4gb2JzZXJ2ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtQcm9wZXJ0eUNsaWVudH0gb2JzZXJ2ZXJDbGllbnRcclxuICAgICAqIEBtZW1iZXJvZiBQcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlbW92ZU9ic2VydmVyKG9ic2VydmVyQ2xpZW50OiBQcm9wZXJ0eUNsaWVudCkge1xyXG4gICAgICAgIHRoaXMuX29ic2VydmVycyA9IHRoaXMuX29ic2VydmVycy5maWx0ZXIoKG9ic2VydmVyKSA9PiB7IHJldHVybiBvYnNlcnZlci5jbGllbnQgIT0gb2JzZXJ2ZXJDbGllbnQuY2xpZW50OyB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgdGhlIHNwZWNpZmllZCB2YWx1ZSBjaGFuZ2VkIGRlbGFnYXRlXHJcbiAgICAgKmFkZHZhbFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7UHJvcGVydHlDbGllbnR9IG9ic2VydmVyQ2xpZW50XHJcbiAgICAgKiBAbWVtYmVyb2YgUHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZW1vdmVWYWx1ZUNoYW5nZWREZWxlZ2F0ZSh2YWx1ZUNoYW5nZWREZWxlZ2F0ZTogVF9QUk9QRVJUWUNIQU5HRURfSEFORExFUikge1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlQ2hhbmdlZENhbGxiYWNrcyA9IHRoaXMuX3ZhbHVlQ2hhbmdlZENhbGxiYWNrcy5maWx0ZXIoKHZhdWVDaGFuZ2VkSGFuZGxlcikgPT4geyByZXR1cm4gdmF1ZUNoYW5nZWRIYW5kbGVyICE9IHZhbHVlQ2hhbmdlZERlbGVnYXRlOyB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgcHJvcGVydHkgaXMgYWxyZWFkeSBvYnNlcnZlZCBieSB0aGUgc3BlY2lmaWVkIGluc3RhbmNlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9ic2VydmVyXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBQcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaXNPYnNlcnZlZEJ5KG9ic2VydmVySW5zdGFuY2U6IG9iamVjdCk6Ym9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub2JzZXJ2ZXJzLmZpbmQoKG9ic2VydmVyKT0+eyByZXR1cm4gb2JzZXJ2ZXIuY2xpZW50ID09PSBvYnNlcnZlckluc3RhbmNlfSkgIT09IHVuZGVmaW5lZCA7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBwcm9wZXJ0eSBpcyBhbHJlYWR5IHJlZ2lzdGVyZWQgdG8gYmUgYWNjZXNzZWQgYnkgdGhlIHNwZWNpZmllZCBpbnN0YW5jZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBhY2Nlc3NvclxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgUHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGlzQWNjZXNzZWRCeShhY2Nlc3Nvckluc3RhbmNlOiBvYmplY3QpOmJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFjY2Vzc29ycy5maW5kKChhY2Nlc3Nvcik9PnsgcmV0dXJuIGFjY2Vzc29yLmNsaWVudCA9PT0gYWNjZXNzb3JJbnN0YW5jZX0pICE9PSB1bmRlZmluZWQgO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdHJ1ZSBpZiB0aGUgcHJvcGVydHkgaXMgYXR0YWNoZWQsIG1lYW5pbmcgYWNjZXNzZWQgb3Igb2JzZXJ2ZWQuXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBQcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGlzQXR0YWNoZWQoKSA6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm9ic2VydmVycy5sZW5ndGggPiAwIHx8IHRoaXMuYWNjZXNzb3JzLmxlbmd0aCA+IDA7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBwcm9wZXJ0aWVzIG9ic2VydmVyc1xyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge0FycmF5PFByb3BlcnR5Q2xpZW50Pn1cclxuICAgICAqIEBtZW1iZXJvZiBQcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldCBvYnNlcnZlcnMoKSA6IEFycmF5PFByb3BlcnR5Q2xpZW50PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX29ic2VydmVycztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHByb3BlcnRpZXMgYWNjZXNzb3JzXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7IEFycmF5PFByb3BlcnR5Q2xpZW50PiB9XHJcbiAgICAgKiBAbWVtYmVyb2YgUHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXQgYWNjZXNzb3JzKCkgOiAgQXJyYXk8UHJvcGVydHlDbGllbnQ+ICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FjY2Vzc29ycztcclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG5ldyBEYXRhTGluayBvYmplY3Qgd2l0aCB0aGUgc3BlY2lmaWVkIHR5cGVcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAdGVtcGxhdGUgVFxyXG4gICAgICogQHBhcmFtIHtUfSBpbml0aWFsVmFsdWVcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgUHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGNyZWF0ZTxUPihpbml0aWFsVmFsdWU6IFQsIHZhbHVlUmVhZFJlcXVlc3Q6ICgoZGF0YUxpbms6IFByb3BlcnR5PFQ+KSA9PiB2b2lkKSB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZCwgdmFsdWVXcml0ZVJlcXVlc3Q6ICgoZGF0YUxpbms6IFByb3BlcnR5PFQ+KSA9PiB2b2lkKSB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZCwgdmFsdWVHZXR0ZXI6ICgodmFsdWU6VCkgPT4gVCkgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQpIHtcclxuXHJcblxyXG4gICAgICAgIHZhbHVlUmVhZFJlcXVlc3QgPSB2YWx1ZVJlYWRSZXF1ZXN0ID8gdmFsdWVSZWFkUmVxdWVzdCA6IFByb3BlcnR5LkRFRkFVTFRfUkVBRF9SRVFVRVNUX0hBTkRMRVI7XHJcbiAgICAgICAgdmFsdWVXcml0ZVJlcXVlc3QgPSB2YWx1ZVdyaXRlUmVxdWVzdCA/IHZhbHVlV3JpdGVSZXF1ZXN0IDogUHJvcGVydHkuREVGQVVMVF9XUklURV9SRVFVRVNUX0hBTkRMRVI7XHJcbiAgICAgICAgdmFsdWVHZXR0ZXIgPSB2YWx1ZUdldHRlciA/IHZhbHVlR2V0dGVyIDogUHJvcGVydHkuREVGQVVMVF9WQUxVRV9HRVRURVI7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvcGVydHkoaW5pdGlhbFZhbHVlLCB2YWx1ZVJlYWRSZXF1ZXN0LCB2YWx1ZVdyaXRlUmVxdWVzdCx2YWx1ZUdldHRlcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBEYXRhTGluayBPYmplY3RzIHZhbHVlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBQcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IHZhbHVlKG5ld1ZhbHVlOiBUKSB7XHJcbiAgICAgICAgbGV0IG9sZFZhbHVlID0gdGhpcy5fdmFsdWU7XHJcbiAgICAgICAgdGhpcy5fdmFsdWUgPSBuZXdWYWx1ZTtcclxuICAgICAgICB0aGlzLm9uVmFsdWVDaGFuZ2VkKHRoaXMuX3ZhbHVlLCBvbGRWYWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBwcm9wZXJ0eSBvYmplY3QgdmFsdWUuXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge1R9XHJcbiAgICAgKiBAbWVtYmVyb2YgUHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCB2YWx1ZSgpOiBUIHtcclxuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLl92YWx1ZTtcclxuICAgICAgICAvLyBnZXQgdGhlIHZhbHVlIHZpYSB0aGUgdmFsdWUgZ2V0dGVyIGRlbGVnYXRlLCBpZiBkZWZpbmVkLiBPdGhlcndpc2UgdXNlIHRoZSBvcmlnaW5hbCB2YWx1ZS5cclxuICAgICAgICBpZiAodGhpcy5fdmFsdWVHZXR0ZXIpIHtcclxuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLl92YWx1ZUdldHRlcih2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCB3aGVuZXZlciB0aGUgdmFsdWUgaGFzIGJlZW4gc2V0LiBOb3RpZmllcyBsaXN0ZW5lcnMgZnJvbSBhIHZhbHVlIGNoYW5nZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7VH0gX3ZhbHVlXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBQcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uVmFsdWVDaGFuZ2VkKG5ld1ZhbHVlOiBULCBvbGRWYWx1ZTogVCk6IGFueSB7XHJcbiAgICAgICAgdGhpcy5fdmFsdWVDaGFuZ2VkQ2FsbGJhY2tzLmZvckVhY2goKGNhbGxiYWNrKSA9PiB7IGNhbGxiYWNrKG5ld1ZhbHVlLCBvbGRWYWx1ZSkgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgd2hlbmV2ZXIgdGhlIGRhdGEgbGlua3MgdmFsdWUgaGFzIGNoYW5nZWQgb3IgaW5pdGFsbHkgYXR0YWNoZWQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsobmV3VmFsdWU6VCwgb2xkVmFsdWU6VCkgPT4gdm9pZH0gb25WYWx1ZUNoYW5nZWRDYWxsQmFja1xyXG4gICAgICogQG1lbWJlcm9mIFByb3BlcnR5XHJcbiAgICAgKi9cclxuICAgIGNoYW5nZWQob25WYWx1ZUNoYW5nZWRDYWxsQmFjazogKG5ld1ZhbHVlOiBULCBvbGRWYWx1ZTogVCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5fdmFsdWVDaGFuZ2VkQ2FsbGJhY2tzLmluY2x1ZGVzKG9uVmFsdWVDaGFuZ2VkQ2FsbEJhY2spKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBhZGQgdGhlIG5ldyBoYW5kbGVyXHJcbiAgICAgICAgICAgIHRoaXMuYWRkVmFsdWVDaGFuZ2VkRGVsZWdhdGUob25WYWx1ZUNoYW5nZWRDYWxsQmFjayk7XHJcbiAgICAgICAgICAgIC8vIGlmIHRoZXJlIGlzIGFscmVhZHkgYSB2YWx1ZSBkZWZpbmVkLCB3ZSBub3RpZnkgdGhlIG5ldyBsaXN0ZW5lci5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX3ZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2gob25WYWx1ZUNoYW5nZWRDYWxsQmFjayk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJQcm9wZXJ0eSBjaGFuZ2UgYWxyZWFkeSBvYnNlcnZlZCBieSB0aGUgc2FtZSBoYW5kbGVyXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgdGhlIHNwZWNpZmllZCB2YWx1ZSBjaGFuZ2VkIGRlbGVnYXRlLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge1RfUFJPUEVSVFlDSEFOR0VEX0hBTkRMRVJ9IG9uVmFsdWVDaGFuZ2VkRGVsZWdhdGVcclxuICAgICAqIEBtZW1iZXJvZiBQcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZFZhbHVlQ2hhbmdlZERlbGVnYXRlKG9uVmFsdWVDaGFuZ2VkRGVsZWdhdGU6IFRfUFJPUEVSVFlDSEFOR0VEX0hBTkRMRVIpIHtcclxuICAgICAgICB0aGlzLl92YWx1ZUNoYW5nZWRDYWxsYmFja3MucHVzaChvblZhbHVlQ2hhbmdlZERlbGVnYXRlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGZvcmNlcyBhIGNoYW5nZWQgY2FsbGJhY2sgd2l0aCB0aGUgY3VycmVudCBwcm9wZXJ0eSB2YWx1ZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7KG5ld1ZhbHVlOiBULCBvbGRWYWx1ZTogVCkgPT4gdm9pZH0gb25WYWx1ZUNoYW5nZWRDYWxsQmFja1xyXG4gICAgICogQG1lbWJlcm9mIFByb3BlcnR5XHJcbiAgICAgKi9cclxuICAgIHJlZnJlc2gob25WYWx1ZUNoYW5nZWRDYWxsQmFjazogKChuZXdWYWx1ZTogVCwgb2xkVmFsdWU6IFQpID0+IHZvaWQpfHVuZGVmaW5lZCA9IHVuZGVmaW5lZCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChvblZhbHVlQ2hhbmdlZENhbGxCYWNrKSB7XHJcbiAgICAgICAgICAgIG9uVmFsdWVDaGFuZ2VkQ2FsbEJhY2sodGhpcy5fdmFsdWUsIHRoaXMuX3ZhbHVlKTsgICAgICAgICAgICBcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5vblZhbHVlQ2hhbmdlZCh0aGlzLl92YWx1ZSwgdGhpcy5fdmFsdWUpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRm9yY2VzIGEgcmVmcmVzaCBvIHRoZSBkYXRhIGxpbmtzIHZhbHVlXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFByb3BlcnR5XHJcbiAgICAgKi9cclxuICAgIHJlYWQocmVhZFJlc3BvbnNlRGVsZWdhdGU6IElQcm9wZXJ0eVJlYWRSZXNwb25zZTxUPiB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZCwgcmVqZWN0aW9uUmVzcG9uc2VEZWxlZ2F0ZTogSVByb3BlcnR5UmVqZWN0aW9uUmVzcG9uc2UgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQpIHtcclxuXHJcbiAgICAgICAgLy8gYWRkIGEgcmVzcG9uc2UgZGVsZWdhdGUgZm9yIGV2ZXJ5IHJlYWQgY2FsbGVyLiBUaGlzIG1ha2VzIHN1cmUsIHRoYXQgbW9yZSBjYWxsZXJzIHBvc3NpYmx5IGZyb20gZGlmZmVyZW50IGNvbXBvbmVudHMsIHJlY2VpdmUgdGhlIHJlc3VsdHMgYXMgd2VsbCAhXHJcblxyXG4gICAgICAgIC8vIGFkZCByZWFkIHJlcXVlc3QgZGVsZWdhdGUgXHJcbiAgICAgICAgaWYgKHJlYWRSZXNwb25zZURlbGVnYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlYWRSZXNwb25zZURlbGVnYXRlcy5wdXNoKHJlYWRSZXNwb25zZURlbGVnYXRlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGFkZCByZWFkIHJlamVjdGlvbiBkZWxlZ2F0ZVxyXG4gICAgICAgIGlmIChyZWplY3Rpb25SZXNwb25zZURlbGVnYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlYWRSZWplY3Rpb25SZXNwb25zZURlbGVnYXRlcy5wdXNoKHJlamVjdGlvblJlc3BvbnNlRGVsZWdhdGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gaW52b2tlIHRoZSByZWFkIHJlcXVlc3QgaWYgbm90IGFscmVhZHkgcnVubmluZ1xyXG4gICAgICAgIGlmICh0aGlzLl9yZWFkUmVxdWVzdFN0YXRlID09PSBQcm9wZXJ0eVJlcXVlc3RTdGF0ZS5SZWFkeSkge1xyXG4gICAgICAgICAgICB0aGlzLmJlZ2luUmVhZFJlcXVlc3QoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RhcnRzIHRoZSByZXF1ZXN0IGZvciByZWFkaW5nIGEgZGF0YSBsaW5rcyB2YWx1ZS4gVGhlIG1ldGhvZCBkZWxnYXRlcyB0aGUgcmVxdWVzdCB0byB0aGUgY2FsbGJhY2sgaWYgZGVmaW5lZC5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFByb3BlcnR5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYmVnaW5SZWFkUmVxdWVzdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9yZWFkUmVxdWVzdFN0YXRlID0gUHJvcGVydHlSZXF1ZXN0U3RhdGUuUGVuZGluZztcclxuICAgICAgICBpZiAodGhpcy5fdmFsdWVSZWFkUmVxdWVzdERlbGVnYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlUmVhZFJlcXVlc3REZWxlZ2F0ZSh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIGFmdGVyIGEgcmVhZCByZXF1ZXN0IGhhcyBiZWVuIGV4ZWN1dGVkIHN1Y2Nlc3NmdWxseVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7VH0gY29tcG9uZW50UGFyYW1ldGVyc1xyXG4gICAgICogQG1lbWJlcm9mIFByb3BlcnR5XHJcbiAgICAgKi9cclxuICAgIHJlYWRSZXF1ZXN0RXhlY3V0ZWQocmVhZFJlc3VsdDogVCk6IHZvaWQge1xyXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgZGF0YSBsaW5rcyB2YWx1ZVxyXG4gICAgICAgIHRoaXMudmFsdWUgPSByZWFkUmVzdWx0O1xyXG5cclxuICAgICAgICAvLyByZWNhbGwgcmVzcG9uc2UgaGFuZGxlciBhbmQgcGFzcyB0aGUgdXBkYXRlZCB2YWx1ZVxyXG4gICAgICAgIHRoaXMuX3JlYWRSZXNwb25zZURlbGVnYXRlcy5mb3JFYWNoKChyZWFkUmVzcG9uc2VEZWxlZ2F0ZSkgPT4ge1xyXG4gICAgICAgICAgICByZWFkUmVzcG9uc2VEZWxlZ2F0ZSh0aGlzLnZhbHVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gYWZ0ZXIgcHJvY2Vzc2luZyB0aGUgcmVzcG9uc2UgY2FsbHMsIHRoZSBjdXJyZW50IHJlc3BvbnNlIGxpc3QgaXMgb2Jzb2xldGUhXHJcbiAgICAgICAgdGhpcy5lbmRSZWFkUmVxdWVzdCgpO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgYWZ0ZXIgYSByZWFkIHJlcXVlc3QgaGFzIGJlZW4gcmVqZXRjZWRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IGVycm9yXHJcbiAgICAgKiBAbWVtYmVyb2YgUHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcmVhZFJlcXVlc3RSZWplY3RlZChlcnJvcjogYW55KTogdm9pZCB7XHJcblxyXG4gICAgICAgIC8vIHJlY2FsbCByZXNwb25zZSBoYW5kbGVyIGFuZCBwYXNzIHRoZSB1cGRhdGVkIHZhbHVlXHJcbiAgICAgICAgdGhpcy5fcmVhZFJlamVjdGlvblJlc3BvbnNlRGVsZWdhdGVzLmZvckVhY2goKHJlYWRSZWplY3Rpb25SZXNwb25zZURlbGVnYXRlKSA9PiB7XHJcbiAgICAgICAgICAgIHJlYWRSZWplY3Rpb25SZXNwb25zZURlbGVnYXRlKGVycm9yKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5lbmRSZWFkUmVxdWVzdCgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRlcm1pbmF0ZXMgYSByZWFkIHJlcXVlc3RcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFByb3BlcnR5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZW5kUmVhZFJlcXVlc3QoKSB7XHJcbiAgICAgICAgdGhpcy5fcmVhZFJlc3BvbnNlRGVsZWdhdGVzID0gW107XHJcbiAgICAgICAgdGhpcy5fcmVhZFJlcXVlc3RTdGF0ZSA9IFByb3BlcnR5UmVxdWVzdFN0YXRlLlJlYWR5O1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZvcmNlcyBhIHdyaXRlIG9mIHRoZSBkYXRhIGxpbmsgdmFsdWUgdG8gdGhlIHZhbHVlIHByb3ZpZGVyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBuZXdWYWx1ZVxyXG4gICAgICogQHBhcmFtIHsoKCh3cml0ZVJlc3VsdDpUKT0+dm9pZCl8dW5kZWZpbmVkKX0gW3dyaXRlUmVzcG9uc2VEZWxlZ2F0ZT11bmRlZmluZWRdXHJcbiAgICAgKiBAbWVtYmVyb2YgUHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgd3JpdGUod3JpdGVSZXNwb25zZURlbGVnYXRlOiBJUHJvcGVydHlXcml0ZVJlc3BvbnNlIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkLCB3cml0ZVJlamVjdGlvbkRlbGVnYXRlOiBJUHJvcGVydHlSZWplY3Rpb25SZXNwb25zZSB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuX3dyaXRlUmVzcG9uc2VEZWxlZ2F0ZSA9IHdyaXRlUmVzcG9uc2VEZWxlZ2F0ZTtcclxuICAgICAgICBpZiAodGhpcy5fd3JpdGVSZXF1ZXN0U3RhdGUgPT09IFByb3BlcnR5UmVxdWVzdFN0YXRlLlJlYWR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmVnaW5Xcml0ZVJlcXVlc3QoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGVybWluYXRlcyB0aGUgd3JpdGUgcmVxdWVzdFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgUHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBlbmRXcml0ZVJlcXVlc3QoKSB7XHJcbiAgICAgICAgdGhpcy5fd3JpdGVSZXNwb25zZURlbGVnYXRlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuX3dyaXRlUmVxdWVzdFN0YXRlID0gUHJvcGVydHlSZXF1ZXN0U3RhdGUuUmVhZHk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdGFydHMgdGhlIHJlcXVlc3QgZm9yIHdyaXRpbmcgYSBkYXRhIGxpbmtzIHZhbHVlLiBUaGUgbWV0aG9kIGRlbGdhdGVzIHRoZSByZXF1ZXN0IHRvIHRoZSBjYWxsYmFjayBpZiBkZWZpbmVkLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gbmV3VmFsdWVcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIFByb3BlcnR5XHJcbiAgICAgKi9cclxuICAgIGJlZ2luV3JpdGVSZXF1ZXN0KCk6IGFueSB7XHJcbiAgICAgICAgdGhpcy5fd3JpdGVSZXF1ZXN0U3RhdGUgPSBQcm9wZXJ0eVJlcXVlc3RTdGF0ZS5QZW5kaW5nO1xyXG4gICAgICAgIGlmICh0aGlzLl92YWx1ZVdyaXRlUmVxdWVzdERlbGVnYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlV3JpdGVSZXF1ZXN0RGVsZWdhdGUodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgYWZ0ZXIgYSB3cml0ZSByZXF1ZXN0IGhhcyBiZWVuIGV4ZWN1dGVkIHN1Y2Nlc3NmdWxseVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7VH0gd3JpdGVSZXN1bHRcclxuICAgICAqIEBtZW1iZXJvZiBQcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgICB3cml0ZVJlcXVlc3RFeGVjdXRlZCh3cml0ZVJlc3VsdDogYW55KTogdm9pZCB7XHJcblxyXG4gICAgICAgIC8vIHJlY2FsbCByZXNwb25zZSBoYW5kbGVyIGFuZCBwYXNzIHRoZSB1cGRhdGVkIHZhbHVlXHJcbiAgICAgICAgaWYgKHRoaXMuX3dyaXRlUmVzcG9uc2VEZWxlZ2F0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl93cml0ZVJlc3BvbnNlRGVsZWdhdGUod3JpdGVSZXN1bHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gYWZ0ZXIgcHJvY2Vzc2luZyB0aGUgcmVzcG9uc2UgY2FsbHMsIHRoZSBjdXJyZW50IHJlc3BvbnNlIGxpc3QgaXMgb2Jzb2xldGUhXHJcbiAgICAgICAgdGhpcy5lbmRXcml0ZVJlcXVlc3QoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgYWZ0ZXIgYSB3cml0ZSByZXF1ZXN0IGhhcyBiZWVuIHJlamVjdGVkXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBlcnJvclxyXG4gICAgICogQG1lbWJlcm9mIFByb3BlcnR5XHJcbiAgICAgKi9cclxuICAgIHdyaXRlUmVxdWVzdFJlamVjdGVkKGVycm9yOiBhbnkpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgLy8gcmVjYWxsIHJlc3BvbnNlIGhhbmRsZXIgYW5kIHBhc3MgdGhlIHVwZGF0ZWQgdmFsdWVcclxuICAgICAgICBpZiAodGhpcy5fd3JpdGVSZXNwb25zZVJlamVjdGlvbkRlbGVnYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3dyaXRlUmVzcG9uc2VSZWplY3Rpb25EZWxlZ2F0ZShlcnJvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmVuZFdyaXRlUmVxdWVzdCgpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuaW50ZXJmYWNlIElQcm9wZXJ0eVJlYWRSZXNwb25zZTxUPiB7XHJcbiAgICAocmVzdWx0RGF0YTogVCk6IHZvaWQ7XHJcbn1cclxuXHJcblxyXG5pbnRlcmZhY2UgSVByb3BlcnR5V3JpdGVSZXNwb25zZSB7XHJcbiAgICAocmVzdWx0RGF0YTogYW55KTogdm9pZDtcclxufVxyXG5cclxuXHJcbmludGVyZmFjZSBJUHJvcGVydHlSZWplY3Rpb25SZXNwb25zZSB7XHJcbiAgICAoZXJyb3I6IGFueSk6IHZvaWQ7XHJcbn1cclxuXHJcbmVudW0gUHJvcGVydHlSZXF1ZXN0U3RhdGUge1xyXG4gICAgUmVhZHksXHJcbiAgICBQZW5kaW5nLFxyXG59XHJcblxyXG5cclxuXHJcblxyXG5jbGFzcyBQcm9wZXJ0eUNsaWVudHtcclxuXHJcbiAgICBwcml2YXRlIF9jbGllbnQ6b2JqZWN0O1xyXG4gICAgcHJpdmF0ZSBfY2hhbmdlZEhhbmRsZXI6VF9QUk9QRVJUWUNIQU5HRURfSEFORExFUnxudWxsO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNsaWVudCxjaGFuZ2VkSGFuZGxlcjpUX1BST1BFUlRZQ0hBTkdFRF9IQU5ETEVSfG51bGwgPSBudWxsKXtcclxuXHJcbiAgICAgICAgdGhpcy5fY2xpZW50ID0gY2xpZW50O1xyXG4gICAgICAgIHRoaXMuX2NoYW5nZWRIYW5kbGVyID0gY2hhbmdlZEhhbmRsZXI7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgcHVibGljIGdldCBjbGllbnQoKSA6IG9iamVjdCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NsaWVudFxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBcclxuICAgIHB1YmxpYyBnZXQgdmFsdWVDaGFuZ2VkSGFuZGxlcigpIDogVF9QUk9QRVJUWUNIQU5HRURfSEFORExFUnxudWxsIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY2hhbmdlZEhhbmRsZXJcclxuICAgIH1cclxuICAgIFxyXG4gICAgXHJcblxyXG59XHJcblxyXG5cclxuXHJcblxyXG4iXX0=