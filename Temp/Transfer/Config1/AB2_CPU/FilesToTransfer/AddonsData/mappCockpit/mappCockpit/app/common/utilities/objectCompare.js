define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Contains utility for object comparison.
     *
     * @class ObjectCompare
     */
    var ObjectCompare = /** @class */ (function () {
        function ObjectCompare() {
        }
        /**
         * TypeGuard for type Primitive which representates (number | string | boolean | null | undefined).
         * Matches on everything which is not Object or derived from Object.
         *
         * @private
         * @static
         * @param {*} x
         * @returns {x is Primitive}
         * @memberof ObjectCompare
         */
        ObjectCompare.isPrimitive = function (x) {
            return !(x instanceof Object);
        };
        /**
         * TypeGuard for type Date
         *
         * @private
         * @static
         * @param {*} x
         * @returns {x is Date}
         * @memberof ObjectCompare
         */
        ObjectCompare.isDate = function (x) {
            return (x instanceof Date);
        };
        /**
         * TypeGuard for type Array.
         * Matches on all Arrays regardless of types contained as Array<any>.
         *
         * @private
         * @static
         * @param {*} x
         * @returns {x is Array<any>}
         * @memberof ObjectCompare
         */
        ObjectCompare.isArray = function (x) {
            return Array.isArray(x);
        };
        /**
         * TypeGuard for type Object.
         * Also matches for all extensions of Object (every class).
         *
         * @private
         * @static
         * @param {*} x
         * @returns {x is Object}
         * @memberof ObjectCompare
         */
        ObjectCompare.isObject = function (x) {
            return (x instanceof Object);
        };
        /**
         * TypeGuard for type number
         *
         * @private
         * @static
         * @param {*} x
         * @returns {x is number}
         * @memberof ObjectCompare
         */
        ObjectCompare.isNumber = function (x) {
            return (typeof x === "number");
        };
        /**
         * Generic deep comparison.
         * Use to compare interface data.
         *
         * Performs a deep comparison to validate if the structure and values of the argument "expected" are contained in the argument "actual".
         * argument "expected" needs to be a pure data object at all layers (but can contain nested objects and arrays).
         * Dates are compared via timestamp.
         *
         * @static
         * @param {*} actual
         * @param {*} expected
         * @returns {boolean}
         * @memberof ObjectCompare
         */
        ObjectCompare.isContained = function (actual, expected) {
            var result = ObjectCompare.contains(actual, expected);
            return result.success;
        };
        /**
         * Generic deep comparison.
         * Use to compare interface data.
         *
         * Performs a deep comparison to validate if the structure and values of the argument "expected" are contained in the argument "actual".
         * argument "expected" needs to be a pure data object at all layers (but can contain nested objects and arrays).
         * Dates are compared via timestamp.
         *
         * @static
         * @param {*} actual
         * @param {*} expected
         * @returns {ComparisonResult}
         * @memberof ObjectCompare
         */
        ObjectCompare.contains = function (actual, expected) {
            var result = new ComparisonResult(false, "actual < " + actual + " > and expected < " + expected + " > are not the same type.");
            if (ObjectCompare.isPrimitive(actual) && ObjectCompare.isPrimitive(expected)) { //Primitive
                result = ObjectCompare.comparePrimitives(actual, expected);
            }
            else if (ObjectCompare.isDate(actual) && ObjectCompare.isDate(expected)) { //Date
                result = ObjectCompare.compareDate(actual, expected);
            }
            else if (ObjectCompare.isArray(actual) && ObjectCompare.isArray(expected)) { //Array
                result = ObjectCompare.containsArray(actual, expected);
            }
            else if (ObjectCompare.isObject(actual) && ObjectCompare.isObject(expected)) { // Object
                result = ObjectCompare.containsObject(actual, expected);
            }
            return result;
        };
        /**
         * Compares two primitives typesafe.
         *
         * @private
         * @static
         * @param {Primitive} actual
         * @param {Primitive} expected
         * @returns {ComparisonResult}
         * @memberof ObjectCompare
         */
        ObjectCompare.comparePrimitives = function (actual, expected) {
            var isEqual = false;
            if (ObjectCompare.isNumber(actual) && ObjectCompare.isNumber(expected)) { //check numbers seperatly to cover NaN values
                isEqual = ((actual === expected) || (Number.isNaN(actual) && Number.isNaN(expected)));
            }
            else { //other primitives, undefined and null
                isEqual = (actual === expected);
            }
            return new ComparisonResult(isEqual, "actual value <" + actual + "> does not match expected value <" + expected + ">");
        };
        /**
         * Compares two Dates based on timestamp.
         *
         * @private
         * @static
         * @param {Date} actual
         * @param {Date} expected
         * @returns {ComparisonResult}
         * @memberof ObjectCompare
         */
        ObjectCompare.compareDate = function (actual, expected) {
            //extract timestamps
            var actualTimeStamp = actual.getTime();
            var expectedTimeStamp = expected.getTime();
            return new ComparisonResult((actualTimeStamp === expectedTimeStamp), "actual timestamp <" + actualTimeStamp + "> does not match expected timestamp <" + expectedTimeStamp + ">");
        };
        /**
         * Generic deep comparison of Arrays.
         *
         * Performs a deep comparison to validate if the structure and values of the argument "expected" are contained in the argument "actual".
         * argument "expected" needs to be a pure data object at all layers (but can contain nested objects and arrays).
         * Dates are compared via timestamp.
         *
         * @private
         * @static
         * @param {Array<any>} actual
         * @param {Array<any>} expected
         * @returns {ComparisonResult}
         * @memberof ObjectCompare
         */
        ObjectCompare.containsArray = function (actual, expected) {
            var result = new ComparisonResult(true, "empty");
            //loop through all entries
            for (var i = 0; (i < expected.length) && result.success; i += 1) {
                result = ObjectCompare.contains(actual[i], expected[i]);
            }
            return result;
        };
        /**
         * Generic deep comparison of Objects.
         *
         * Performs a deep comparison to validate if the structure and values of the argument "expected" are contained in the argument "actual".
         * argument "expected" needs to be a pure data object at all layers (but can contain nested objects and arrays).
         * Dates are compared via timestamp.
         *
         * @private
         * @static
         * @template T
         * @param {T} actual
         * @param {T} expected
         * @returns {ComparisonResult}
         * @memberof ObjectCompare
         */
        ObjectCompare.containsObject = function (actual, expected) {
            var result = new ComparisonResult(true, "empty");
            //loop through all member
            for (var key in expected) {
                result = ObjectCompare.contains(actual[key], expected[key]);
                if (!result.success) {
                    break;
                }
            }
            return result;
        };
        /**
         * Generic deep copy.
         * Use to copy interface data.
         *
         * Performs a deep copy of the given structure in argument source. Copies the values of the argument "source" to the the argument "target".
         * Argument "source" needs to be a pure data object at all layers (but can contain nested objects and arrays).
         * Dates are copied via timestamp.
         *
         * @static
         * @template T
         * @param {T} target
         * @param {T} source
         * @returns {T}
         * @memberof ObjectCompare
         */
        ObjectCompare.deepCopy = function (target, source) {
            if (ObjectCompare.isDate(target) && ObjectCompare.isDate(source)) { //Date
                target.setTime(source.getTime());
            }
            else if (ObjectCompare.isArray(target) && ObjectCompare.isArray(source)) { //Array
                ObjectCompare.deepCopyArray(target, source);
            }
            else { // Object
                ObjectCompare.deepCopyObject(target, source);
            }
            return target;
        };
        /**
         * Generic deep copy of an Array.
         *
         * Performs a deep copy of the given structure in argument source. Copies the values of the argument "source" to the argument "target".
         * Argument "source" needs to be a pure data object at all layers (but can contain nested objects and arrays).
         * Dates are copied via timestamp.
         *
         * @private
         * @static
         * @param {Array<any>} target
         * @param {Array<any>} source
         * @memberof ObjectCompare
         */
        ObjectCompare.deepCopyArray = function (target, source) {
            //loop through all entries
            for (var i = 0; i < source.length; i += 1) {
                if (ObjectCompare.isPrimitive(target[i]) && ObjectCompare.isPrimitive(source[i])) { //Primitive entry
                    target[i] = source[i];
                }
                else { // complex entry
                    ObjectCompare.deepCopy(target[i], source[i]);
                }
            }
        };
        /**
         * Generic deep copy of an Object.
         *
         * Performs a deep copy of the given structure in argument source. Copies the values of the argument "source" to the the argument "target".
         * Argument "source" needs to be a pure data object at all layers (but can contain nested objects and arrays).
         * Dates are copied via timestamp.
         *
         * @private
         * @static
         * @param {Object} target
         * @param {Object} source
         * @memberof ObjectCompare
         */
        ObjectCompare.deepCopyObject = function (target, source) {
            //loop through member
            for (var key in source) {
                if (ObjectCompare.isPrimitive(target[key]) && ObjectCompare.isPrimitive(target[key])) { //Primitive member
                    target[key] = source[key];
                }
                else { // complex member
                    ObjectCompare.deepCopy(target[key], source[key]);
                }
            }
        };
        /**
         * Generic deep comparison.
         * Use to compare interface data.
         *
         * Performs a deep comparison to validate if the structure and values of the argument "expected" are equal in the argument "actual".
         * arguments "expected" and "actual" need to be pure data objects at all layers (but can contain nested objects and arrays).
         * Dates are compared via timestamp.
         *
         * @static
         * @param {*} actual
         * @param {*} expected
         * @returns {boolean}
         * @memberof ObjectCompare
         */
        ObjectCompare.isEqual = function (actual, expected) {
            var result = ObjectCompare.equals(actual, expected);
            return result.success;
        };
        /**
         * Generic deep comparison.
         * Use to compare interface data.
         *
         * Performs a deep comparison to validate if the structure and values of the argument "expected" are equal in the argument "actual".
         * arguments "expected" and "actual" need to be pure data objects at all layers (but can contain nested objects and arrays).
         * Dates are compared via timestamp.
         *
         * @static
         * @param {*} actual
         * @param {*} expected
         * @returns {ComparisonResult}
         * @memberof ObjectCompare
         */
        ObjectCompare.equals = function (actual, expected) {
            var result = new ComparisonResult(false, "actual < " + actual + " > and expected < " + expected + " > are not the same type.");
            if (ObjectCompare.isPrimitive(actual) && ObjectCompare.isPrimitive(expected)) { //Primitive
                result = ObjectCompare.comparePrimitives(actual, expected);
            }
            else if (ObjectCompare.isDate(actual) && ObjectCompare.isDate(expected)) { //Date
                result = ObjectCompare.compareDate(actual, expected);
            }
            else if (ObjectCompare.isArray(actual) && ObjectCompare.isArray(expected)) { //Array
                result = ObjectCompare.equalsArray(actual, expected);
            }
            else if (ObjectCompare.isObject(actual) && ObjectCompare.isObject(expected)) { // Object
                result = ObjectCompare.equalsObject(actual, expected);
            }
            return result;
        };
        /**
         * Generic deep comparison of Arrays.
         *
         * Performs a deep comparison to validate if the structure and values of the argument "expected" are equal in the argument "actual".
         * arguments "expected" and "actual" need to be pure data objects at all layers (but can contain nested objects and arrays).
         * Dates are compared via timestamp.
         *
         * @static
         * @param {Array<any>} actual
         * @param {Array<any>} expected
         * @returns {ComparisonResult}
         * @memberof ObjectCompare
         */
        ObjectCompare.equalsArray = function (actual, expected) {
            var result = new ComparisonResult(false, "actual array < " + actual + " > and expected array < " + expected + " > do not have the same length");
            if (actual.length === expected.length) {
                result = new ComparisonResult(true, "empty arrays");
                //loop through all entries
                for (var i = 0; (i < expected.length) && result.success; i += 1) {
                    result = ObjectCompare.contains(actual[i], expected[i]);
                }
            }
            return result;
        };
        /**
         * Generic deep comparison of Objects.
         *
         * Performs a deep comparison to validate if the structure and values of the argument "expected" are equal in the argument "actual".
         * arguments "expected" and "actual" need to be pure data objects at all layers (but can contain nested objects and arrays).
         * Dates are compared via timestamp.
         *
         * @static
         * @template T
         * @param {T} actual
         * @param {T} expected
         * @returns {ComparisonResult}
         * @memberof ObjectCompare
         */
        ObjectCompare.equalsObject = function (actual, expected) {
            var result = new ComparisonResult(false, "actual object < " + actual + " > and expected object < " + expected + " > do not have the same keys");
            if (Object.keys(actual) === Object.keys(expected)) {
                result = new ComparisonResult(true, "empty objects");
                //loop through all member
                for (var key in expected) {
                    result = ObjectCompare.contains(actual[key], expected[key]);
                    if (!result.success) {
                        break;
                    }
                }
            }
            return result;
        };
        return ObjectCompare;
    }());
    exports.ObjectCompare = ObjectCompare;
    /**
     * Describes the result of an comparison
     *
     * @class ComparisonResult
     */
    var ComparisonResult = /** @class */ (function () {
        function ComparisonResult(isSuccess, failureMessage) {
            if (failureMessage === void 0) { failureMessage = "Message decribing reason of failure was not defined"; }
            this._isSuccess = isSuccess;
            this._failureMessage = failureMessage;
        }
        Object.defineProperty(ComparisonResult.prototype, "failureMessage", {
            /**
             * Returns the reason of failure of the described comparison
             *
             * @returns {string}
             * @memberof ComparisonResult
             */
            get: function () {
                return this._failureMessage;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ComparisonResult.prototype, "success", {
            /**
             * Return a boolean representating the success of the described comparison
             *
             * @returns {boolean}
             * @memberof ComparisonResult
             */
            get: function () {
                return this._isSuccess;
            },
            enumerable: true,
            configurable: true
        });
        return ComparisonResult;
    }());
    exports.ComparisonResult = ComparisonResult;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0Q29tcGFyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL3V0aWxpdGllcy9vYmplY3RDb21wYXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUVBOzs7O09BSUc7SUFDSDtRQUFBO1FBeWJBLENBQUM7UUF0YkM7Ozs7Ozs7OztXQVNHO1FBQ1kseUJBQVcsR0FBMUIsVUFBMkIsQ0FBTTtZQUUvQixPQUFPLENBQUMsQ0FBQyxDQUFDLFlBQVksTUFBTSxDQUFDLENBQUM7UUFDaEMsQ0FBQztRQUdEOzs7Ozs7OztXQVFHO1FBQ1ksb0JBQU0sR0FBckIsVUFBc0IsQ0FBTTtZQUUxQixPQUFPLENBQUMsQ0FBQyxZQUFZLElBQUksQ0FBQyxDQUFDO1FBQzdCLENBQUM7UUFFRDs7Ozs7Ozs7O1dBU0c7UUFDWSxxQkFBTyxHQUF0QixVQUF1QixDQUFNO1lBRTNCLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQixDQUFDO1FBRUQ7Ozs7Ozs7OztXQVNHO1FBQ1ksc0JBQVEsR0FBdkIsVUFBd0IsQ0FBTTtZQUU1QixPQUFPLENBQUMsQ0FBQyxZQUFZLE1BQU0sQ0FBQyxDQUFDO1FBQy9CLENBQUM7UUFFRDs7Ozs7Ozs7V0FRRztRQUNZLHNCQUFRLEdBQXZCLFVBQXdCLENBQU07WUFFNUIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDO1FBQ2pDLENBQUM7UUFLRDs7Ozs7Ozs7Ozs7OztXQWFHO1FBQ1cseUJBQVcsR0FBekIsVUFBMEIsTUFBVyxFQUFFLFFBQWE7WUFFbEQsSUFBSSxNQUFNLEdBQW9CLGFBQWEsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3ZFLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUN4QixDQUFDO1FBRUQ7Ozs7Ozs7Ozs7Ozs7V0FhRztRQUNXLHNCQUFRLEdBQXRCLFVB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QThCLENBQUMsQ0FBQztZQUU5SixJQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFFaEQsTUFBTSxHQUFHLElBQUksZ0JBQWdCLENBQUMsSUFBSSxFQUFFLGVBQWUsQ0FBQyxDQUFDO2dCQUNyRCx5QkFBeUI7Z0JBQ3pCLEtBQUssSUFBSSxHQUFHLElBQUksUUFBUSxFQUFFO29CQUN4QixNQUFNLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQzVELElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO3dCQUNuQixNQUFNO3FCQUNQO2lCQUNGO2FBQ0Y7WUFFRCxPQUFPLE1BQU0sQ0FBQztRQUNoQixDQUFDO1FBQ0gsb0JBQUM7SUFBRCxDQUFDLEFBemJELElBeWJDO0lBMkNRLHNDQUFhO0lBekN0Qjs7OztPQUlHO0lBQ0g7UUFLRSwwQkFBWSxTQUFrQixFQUFFLGNBQTZFO1lBQTdFLCtCQUFBLEVBQUEsc0VBQTZFO1lBRTNHLElBQUksQ0FBQyxVQUFVLEdBQUUsU0FBUyxDQUFDO1lBQzNCLElBQUksQ0FBQyxlQUFlLEdBQUUsY0FBYyxDQUFDO1FBQ3ZDLENBQUM7UUFTRCxzQkFBVyw0Q0FBYztZQU56Qjs7Ozs7ZUFLRztpQkFDSDtnQkFFRSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7WUFDOUIsQ0FBQzs7O1dBQUE7UUFTRCxzQkFBVyxxQ0FBTztZQU5sQjs7Ozs7ZUFLRztpQkFDSDtnQkFFRSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDekIsQ0FBQzs7O1dBQUE7UUFDSCx1QkFBQztJQUFELENBQUMsQUFsQ0QsSUFrQ0M7SUFFdUIsNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsidHlwZSBQcmltaXRpdmUgPSBudW1iZXIgfCBzdHJpbmcgfCBib29sZWFuIHwgbnVsbCB8IHVuZGVmaW5lZDtcclxuXHJcbi8qKlxyXG4gKiBDb250YWlucyB1dGlsaXR5IGZvciBvYmplY3QgY29tcGFyaXNvbi5cclxuICpcclxuICogQGNsYXNzIE9iamVjdENvbXBhcmVcclxuICovXHJcbmNsYXNzIE9iamVjdENvbXBhcmUge1xyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogVHlwZUd1YXJkIGZvciB0eXBlIFByaW1pdGl2ZSB3aGljaCByZXByZXNlbnRhdGVzIChudW1iZXIgfCBzdHJpbmcgfCBib29sZWFuIHwgbnVsbCB8IHVuZGVmaW5lZCkuXHJcbiAgICogTWF0Y2hlcyBvbiBldmVyeXRoaW5nIHdoaWNoIGlzIG5vdCBPYmplY3Qgb3IgZGVyaXZlZCBmcm9tIE9iamVjdC5cclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogQHN0YXRpY1xyXG4gICAqIEBwYXJhbSB7Kn0geFxyXG4gICAqIEByZXR1cm5zIHt4IGlzIFByaW1pdGl2ZX1cclxuICAgKiBAbWVtYmVyb2YgT2JqZWN0Q29tcGFyZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgc3RhdGljIGlzUHJpbWl0aXZlKHg6IGFueSk6IHggaXMgUHJpbWl0aXZlIHtcclxuXHJcbiAgICByZXR1cm4gISh4IGluc3RhbmNlb2YgT2JqZWN0KTtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBUeXBlR3VhcmQgZm9yIHR5cGUgRGF0ZVxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBAc3RhdGljXHJcbiAgICogQHBhcmFtIHsqfSB4XHJcbiAgICogQHJldHVybnMge3ggaXMgRGF0ZX1cclxuICAgKiBAbWVtYmVyb2YgT2JqZWN0Q29tcGFyZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgc3RhdGljIGlzRGF0ZSh4OiBhbnkpOiB4IGlzIERhdGUge1xyXG5cclxuICAgIHJldHVybiAoeCBpbnN0YW5jZW9mIERhdGUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVHlwZUd1YXJkIGZvciB0eXBlIEFycmF5LlxyXG4gICAqIE1hdGNoZXMgb24gYWxsIEFycmF5cyByZWdhcmRsZXNzIG9mIHR5cGVzIGNvbnRhaW5lZCBhcyBBcnJheTxhbnk+LlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogQHN0YXRpY1xyXG4gICAqIEBwYXJhbSB7Kn0geFxyXG4gICAqIEByZXR1cm5zIHt4IGlzIEFycmF5PGFueT59XHJcbiAgICogQG1lbWJlcm9mIE9iamVjdENvbXBhcmVcclxuICAgKi9cclxuICBwcml2YXRlIHN0YXRpYyBpc0FycmF5KHg6IGFueSk6IHggaXMgQXJyYXk8YW55PiB7XHJcblxyXG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoeCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUeXBlR3VhcmQgZm9yIHR5cGUgT2JqZWN0LlxyXG4gICAqIEFsc28gbWF0Y2hlcyBmb3IgYWxsIGV4dGVuc2lvbnMgb2YgT2JqZWN0IChldmVyeSBjbGFzcykuXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIEBzdGF0aWNcclxuICAgKiBAcGFyYW0geyp9IHhcclxuICAgKiBAcmV0dXJucyB7eCBpcyBPYmplY3R9XHJcbiAgICogQG1lbWJlcm9mIE9iamVjdENvbXBhcmVcclxuICAgKi9cclxuICBwcml2YXRlIHN0YXRpYyBpc09iamVjdCh4OiBhbnkpOiB4IGlzIE9iamVjdCB7XHJcblxyXG4gICAgcmV0dXJuICh4IGluc3RhbmNlb2YgT2JqZWN0KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFR5cGVHdWFyZCBmb3IgdHlwZSBudW1iZXJcclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogQHN0YXRpY1xyXG4gICAqIEBwYXJhbSB7Kn0geFxyXG4gICAqIEByZXR1cm5zIHt4IGlzIG51bWJlcn1cclxuICAgKiBAbWVtYmVyb2YgT2JqZWN0Q29tcGFyZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgc3RhdGljIGlzTnVtYmVyKHg6IGFueSk6IHggaXMgbnVtYmVyIHtcclxuXHJcbiAgICByZXR1cm4gKHR5cGVvZiB4ID09PSBcIm51bWJlclwiKTtcclxuICB9XHJcblxyXG5cclxuICAgIFxyXG5cclxuICAvKipcclxuICAgKiBHZW5lcmljIGRlZXAgY29tcGFyaXNvbi5cclxuICAgKiBVc2UgdG8gY29tcGFyZSBpbnRlcmZhY2UgZGF0YS5cclxuICAgKiBcclxuICAgKiBQZXJmb3JtcyBhIGRlZXAgY29tcGFyaXNvbiB0byB2YWxpZGF0ZSBpZiB0aGUgc3RydWN0dXJlIGFuZCB2YWx1ZXMgb2YgdGhlIGFyZ3VtZW50IFwiZXhwZWN0ZWRcIiBhcmUgY29udGFpbmVkIGluIHRoZSBhcmd1bWVudCBcImFjdHVhbFwiLlxyXG4gICAqIGFyZ3VtZW50IFwiZXhwZWN0ZWRcIiBuZWVkcyB0byBiZSBhIHB1cmUgZGF0YSBvYmplY3QgYXQgYWxsIGxheWVycyAoYnV0IGNhbiBjb250YWluIG5lc3RlZCBvYmplY3RzIGFuZCBhcnJheXMpLlxyXG4gICAqIERhdGVzIGFyZSBjb21wYXJlZCB2aWEgdGltZXN0YW1wLlxyXG4gICAqXHJcbiAgICogQHN0YXRpY1xyXG4gICAqIEBwYXJhbSB7Kn0gYWN0dWFsXHJcbiAgICogQHBhcmFtIHsqfSBleHBlY3RlZFxyXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAqIEBtZW1iZXJvZiBPYmplY3RDb21wYXJlXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRpYyBpc0NvbnRhaW5lZChhY3R1YWw6IGFueSwgZXhwZWN0ZWQ6IGFueSk6IGJvb2xlYW4ge1xyXG5cclxuICAgIGxldCByZXN1bHQ6IENvbXBhcmlzb25SZXN1bHQ9IE9iamVjdENvbXBhcmUuY29udGFpbnMoYWN0dWFsLCBleHBlY3RlZCk7XHJcbiAgICByZXR1cm4gcmVzdWx0LnN1Y2Nlc3M7XHJcbiAgfVxyXG4gICBcclxuICAvKipcclxuICAgKiBHZW5lcmljIGRlZXAgY29tcGFyaXNvbi5cclxuICAgKiBVc2UgdG8gY29tcGFyZSBpbnRlcmZhY2UgZGF0YS5cclxuICAgKiBcclxuICAgKiBQZXJmb3JtcyBhIGRlZXAgY29tcGFyaXNvbiB0byB2YWxpZGF0ZSBpZiB0aGUgc3RydWN0dXJlIGFuZCB2YWx1ZXMgb2YgdGhlIGFyZ3VtZW50IFwiZXhwZWN0ZWRcIiBhcmUgY29udGFpbmVkIGluIHRoZSBhcmd1bWVudCBcImFjdHVhbFwiLlxyXG4gICAqIGFyZ3VtZW50IFwiZXhwZWN0ZWRcIiBuZWVkcyB0byBiZSBhIHB1cmUgZGF0YSBvYmplY3QgYXQgYWxsIGxheWVycyAoYnV0IGNhbiBjb250YWluIG5lc3RlZCBvYmplY3RzIGFuZCBhcnJheXMpLlxyXG4gICAqIERhdGVzIGFyZSBjb21wYXJlZCB2aWEgdGltZXN0YW1wLlxyXG4gICAqXHJcbiAgICogQHN0YXRpY1xyXG4gICAqIEBwYXJhbSB7Kn0gYWN0dWFsXHJcbiAgICogQHBhcmFtIHsqfSBleHBlY3RlZFxyXG4gICAqIEByZXR1cm5zIHtDb21wYXJpc29uUmVzdWx0fVxyXG4gICAqIEBtZW1iZXJvZiBPYmplY3RDb21wYXJlXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRpYyBjb250YWlucyhhY3R1YWw6IGFueSwgZXhwZWN0ZWQ6IGFueSk6IENvbXBhcmlzb25SZXN1bHQge1xyXG5cclxuICAgIGxldCByZXN1bHQgPSBuZXcgQ29tcGFyaXNvblJlc3VsdChmYWxzZSwgXCJhY3R1YWwgPCBcIisgYWN0dWFsICsgXCIgPiBhbmQgZXhwZWN0ZWQgPCBcIiArIGV4cGVjdGVkICsgXCIgPiBhcmUgbm90IHRoZSBzYW1lIHR5cGUuXCIpO1xyXG5cclxuICAgIGlmKE9iamVjdENvbXBhcmUuaXNQcmltaXRpdmUoYWN0dWFsKSAmJiBPYmplY3RDb21wYXJlLmlzUHJpbWl0aXZlKGV4cGVjdGVkKSkgeyAvL1ByaW1pdGl2ZVxyXG5cclxuICAgICAgcmVzdWx0ID0gT2JqZWN0Q29tcGFyZS5jb21wYXJlUHJpbWl0aXZlcyhhY3R1YWwsIGV4cGVjdGVkKTtcclxuICAgIH0gZWxzZSBpZiAoT2JqZWN0Q29tcGFyZS5pc0RhdGUoYWN0dWFsKSAmJiBPYmplY3RDb21wYXJlLmlzRGF0ZShleHBlY3RlZCkpIHsgLy9EYXRlXHJcblxyXG4gICAgICByZXN1bHQgPSBPYmplY3RDb21wYXJlLmNvbXBhcmVEYXRlKGFjdHVhbCwgZXhwZWN0ZWQpO1xyXG4gICAgfSBlbHNlIGlmIChPYmplY3RDb21wYXJlLmlzQXJyYXkoYWN0dWFsKSAmJiBPYmplY3RDb21wYXJlLmlzQXJyYXkoZXhwZWN0ZWQpKSB7IC8vQXJyYXlcclxuXHJcbiAgICAgIHJlc3VsdCA9IE9iamVjdENvbXBhcmUuY29udGFpbnNBcnJheShhY3R1YWwsIGV4cGVjdGVkKTtcclxuICAgIH0gZWxzZSBpZihPYmplY3RDb21wYXJlLmlzT2JqZWN0KGFjdHVhbCkgJiYgT2JqZWN0Q29tcGFyZS5pc09iamVjdChleHBlY3RlZCkpeyAvLyBPYmplY3RcclxuXHJcbiAgICAgIHJlc3VsdCA9IE9iamVjdENvbXBhcmUuY29udGFpbnNPYmplY3QoYWN0dWFsLCBleHBlY3RlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbXBhcmVzIHR3byBwcmltaXRpdmVzIHR5cGVzYWZlLlxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBAc3RhdGljXHJcbiAgICogQHBhcmFtIHtQcmltaXRpdmV9IGFjdHVhbFxyXG4gICAqIEBwYXJhbSB7UHJpbWl0aXZlfSBleHBlY3RlZFxyXG4gICAqIEByZXR1cm5zIHtDb21wYXJpc29uUmVzdWx0fVxyXG4gICAqIEBtZW1iZXJvZiBPYmplY3RDb21wYXJlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzdGF0aWMgY29tcGFyZVByaW1pdGl2ZXMoYWN0dWFsOiBQcmltaXRpdmUsIGV4cGVjdGVkOiBQcmltaXRpdmUpOiBDb21wYXJpc29uUmVzdWx0IHtcclxuXHJcbiAgICBsZXQgaXNFcXVhbDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIGlmIChPYmplY3RDb21wYXJlLmlzTnVtYmVyKGFjdHVhbCkgJiYgT2JqZWN0Q29tcGFyZS5pc051bWJlcihleHBlY3RlZCkpIHsgLy9jaGVjayBudW1iZXJzIHNlcGVyYXRseSB0byBjb3ZlciBOYU4gdmFsdWVzXHJcblxyXG4gICAgICBpc0VxdWFsID0gKChhY3R1YWwgPT09IGV4cGVjdGVkKSB8fCAoTnVtYmVyLmlzTmFOKGFjdHVhbCkgJiYgTnVtYmVyLmlzTmFOKGV4cGVjdGVkKSkpO1xyXG4gICAgfSBlbHNlIHsgLy9vdGhlciBwcmltaXRpdmVzLCB1bmRlZmluZWQgYW5kIG51bGxcclxuXHJcbiAgICAgIGlzRXF1YWwgPSAoYWN0dWFsID09PSBleHBlY3RlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBDb21wYXJpc29uUmVzdWx0KGlzRXF1YWwsIFwiYWN0dWFsIHZhbHVlIDxcIiArIGFjdHVhbCArIFwiPiBkb2VzIG5vdCBtYXRjaCBleHBlY3RlZCB2YWx1ZSA8XCIgKyBleHBlY3RlZCArIFwiPlwiKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbXBhcmVzIHR3byBEYXRlcyBiYXNlZCBvbiB0aW1lc3RhbXAuXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIEBzdGF0aWNcclxuICAgKiBAcGFyYW0ge0RhdGV9IGFjdHVhbFxyXG4gICAqIEBwYXJhbSB7RGF0ZX0gZXhwZWN0ZWRcclxuICAgKiBAcmV0dXJucyB7Q29tcGFyaXNvblJlc3VsdH1cclxuICAgKiBAbWVtYmVyb2YgT2JqZWN0Q29tcGFyZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgc3RhdGljIGNvbXBhcmVEYXRlKGFjdHVhbDogRGF0ZSwgZXhwZWN0ZWQ6IERhdGUpOiBDb21wYXJpc29uUmVzdWx0IHtcclxuXHJcbiAgICAvL2V4dHJhY3QgdGltZXN0YW1wc1xyXG4gICAgbGV0IGFjdHVhbFRpbWVTdGFtcD0gYWN0dWFsLmdldFRpbWUoKTtcclxuICAgIGxldCBleHBlY3RlZFRpbWVTdGFtcD0gZXhwZWN0ZWQuZ2V0VGltZSgpO1xyXG4gICAgXHJcbiAgICByZXR1cm4gbmV3IENvbXBhcmlzb25SZXN1bHQoKGFjdHVhbFRpbWVTdGFtcCA9PT0gZXhwZWN0ZWRUaW1lU3RhbXApLCBcImFjdHVhbCB0aW1lc3RhbXAgPFwiICsgYWN0dWFsVGltZVN0YW1wICsgXCI+IGRvZXMgbm90IG1hdGNoIGV4cGVjdGVkIHRpbWVzdGFtcCA8XCIgKyBleHBlY3RlZFRpbWVTdGFtcCArIFwiPlwiKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdlbmVyaWMgZGVlcCBjb21wYXJpc29uIG9mIEFycmF5cy5cclxuICAgKlxyXG4gICAqIFBlcmZvcm1zIGEgZGVlcCBjb21wYXJpc29uIHRvIHZhbGlkYXRlIGlmIHRoZSBzdHJ1Y3R1cmUgYW5kIHZhbHVlcyBvZiB0aGUgYXJndW1lbnQgXCJleHBlY3RlZFwiIGFyZSBjb250YWluZWQgaW4gdGhlIGFyZ3VtZW50IFwiYWN0dWFsXCIuXHJcbiAgICogYXJndW1lbnQgXCJleHBlY3RlZFwiIG5lZWRzIHRvIGJlIGEgcHVyZSBkYXRhIG9iamVjdCBhdCBhbGwgbGF5ZXJzIChidXQgY2FuIGNvbnRhaW4gbmVzdGVkIG9iamVjdHMgYW5kIGFycmF5cykuXHJcbiAgICogRGF0ZXMgYXJlIGNvbXBhcmVkIHZpYSB0aW1lc3RhbXAuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBAc3RhdGljXHJcbiAgICogQHBhcmFtIHtBcnJheTxhbnk+fSBhY3R1YWxcclxuICAgKiBAcGFyYW0ge0FycmF5PGFueT59IGV4cGVjdGVkXHJcbiAgICogQHJldHVybnMge0NvbXBhcmlzb25SZXN1bHR9XHJcbiAgICogQG1lbWJlcm9mIE9iamVjdENvbXBhcmVcclxuICAgKi9cclxuICBwcml2YXRlIHN0YXRpYyBjb250YWluc0FycmF5KGFjdHVhbDogQXJyYXk8YW55PiwgZXhwZWN0ZWQ6IEFycmF5PGFueT4pOiBDb21wYXJpc29uUmVzdWx0IHtcclxuXHJcbiAgICBsZXQgcmVzdWx0OiBDb21wYXJpc29uUmVzdWx0ID0gbmV3IENvbXBhcmlzb25SZXN1bHQodHJ1ZSwgXCJlbXB0eVwiKTtcclxuXHJcbiAgICAvL2xvb3AgdGhyb3VnaCBhbGwgZW50cmllc1xyXG4gICAgZm9yKGxldCBpOiBudW1iZXI9IDA7IChpIDwgZXhwZWN0ZWQubGVuZ3RoKSAmJiByZXN1bHQuc3VjY2VzczsgaSs9MSkge1xyXG5cclxuICAgICAgcmVzdWx0ID0gT2JqZWN0Q29tcGFyZS5jb250YWlucyhhY3R1YWxbaV0sIGV4cGVjdGVkW2ldKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2VuZXJpYyBkZWVwIGNvbXBhcmlzb24gb2YgT2JqZWN0cy5cclxuICAgKlxyXG4gICAqIFBlcmZvcm1zIGEgZGVlcCBjb21wYXJpc29uIHRvIHZhbGlkYXRlIGlmIHRoZSBzdHJ1Y3R1cmUgYW5kIHZhbHVlcyBvZiB0aGUgYXJndW1lbnQgXCJleHBlY3RlZFwiIGFyZSBjb250YWluZWQgaW4gdGhlIGFyZ3VtZW50IFwiYWN0dWFsXCIuXHJcbiAgICogYXJndW1lbnQgXCJleHBlY3RlZFwiIG5lZWRzIHRvIGJlIGEgcHVyZSBkYXRhIG9iamVjdCBhdCBhbGwgbGF5ZXJzIChidXQgY2FuIGNvbnRhaW4gbmVzdGVkIG9iamVjdHMgYW5kIGFycmF5cykuXHJcbiAgICogRGF0ZXMgYXJlIGNvbXBhcmVkIHZpYSB0aW1lc3RhbXAuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBAc3RhdGljXHJcbiAgICogQHRlbXBsYXRlIFRcclxuICAgKiBAcGFyYW0ge1R9IGFjdHVhbFxyXG4gICAqIEBwYXJhbSB7VH0gZXhwZWN0ZWRcclxuICAgKiBAcmV0dXJucyB7Q29tcGFyaXNvblJlc3VsdH1cclxuICAgKiBAbWVtYmVyb2YgT2JqZWN0Q29tcGFyZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgc3RhdGljIGNvbnRhaW5zT2JqZWN0PFQgZXh0ZW5kcyBPYmplY3Q+KGFjdHVhbDogVCwgZXhwZWN0ZWQ6IFQpOiBDb21wYXJpc29uUmVzdWx0IHtcclxuXHJcbiAgICBsZXQgcmVzdWx0OiBDb21wYXJpc29uUmVzdWx0ID0gbmV3IENvbXBhcmlzb25SZXN1bHQodHJ1ZSwgXCJlbXB0eVwiKTsgXHJcblxyXG4gICAgLy9sb29wIHRocm91Z2ggYWxsIG1lbWJlclxyXG4gICAgZm9yIChsZXQga2V5IGluIGV4cGVjdGVkKSB7XHJcbiAgICAgIHJlc3VsdCA9IE9iamVjdENvbXBhcmUuY29udGFpbnMoYWN0dWFsW2tleV0sIGV4cGVjdGVkW2tleV0pO1xyXG4gICAgICBpZiAoIXJlc3VsdC5zdWNjZXNzKSB7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2VuZXJpYyBkZWVwIGNvcHkuXHJcbiAgICogVXNlIHRvIGNvcHkgaW50ZXJmYWNlIGRhdGEuXHJcbiAgICogXHJcbiAgICogUGVyZm9ybXMgYSBkZWVwIGNvcHkgb2YgdGhlIGdpdmVuIHN0cnVjdHVyZSBpbiBhcmd1bWVudCBzb3VyY2UuIENvcGllcyB0aGUgdmFsdWVzIG9mIHRoZSBhcmd1bWVudCBcInNvdXJjZVwiIHRvIHRoZSB0aGUgYXJndW1lbnQgXCJ0YXJnZXRcIi5cclxuICAgKiBBcmd1bWVudCBcInNvdXJjZVwiIG5lZWRzIHRvIGJlIGEgcHVyZSBkYXRhIG9iamVjdCBhdCBhbGwgbGF5ZXJzIChidXQgY2FuIGNvbnRhaW4gbmVzdGVkIG9iamVjdHMgYW5kIGFycmF5cykuXHJcbiAgICogRGF0ZXMgYXJlIGNvcGllZCB2aWEgdGltZXN0YW1wLlxyXG4gICAqXHJcbiAgICogQHN0YXRpY1xyXG4gICAqIEB0ZW1wbGF0ZSBUXHJcbiAgICogQHBhcmFtIHtUfSB0YXJnZXRcclxuICAgKiBAcGFyYW0ge1R9IHNvdXJjZVxyXG4gICAqIEByZXR1cm5zIHtUfVxyXG4gICAqIEBtZW1iZXJvZiBPYmplY3RDb21wYXJlXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRpYyBkZWVwQ29weTxUIGV4dGVuZHMgT2JqZWN0Pih0YXJnZXQ6IFQsIHNvdXJjZTogVCk6IFQge1xyXG5cclxuICAgIGlmIChPYmplY3RDb21wYXJlLmlzRGF0ZSh0YXJnZXQpICYmIE9iamVjdENvbXBhcmUuaXNEYXRlKHNvdXJjZSkpIHsgLy9EYXRlXHJcblxyXG4gICAgICB0YXJnZXQuc2V0VGltZShzb3VyY2UuZ2V0VGltZSgpKTtcclxuICAgIH0gZWxzZSBpZiAoT2JqZWN0Q29tcGFyZS5pc0FycmF5KHRhcmdldCkgJiYgT2JqZWN0Q29tcGFyZS5pc0FycmF5KHNvdXJjZSkpIHsgLy9BcnJheVxyXG5cclxuICAgICAgT2JqZWN0Q29tcGFyZS5kZWVwQ29weUFycmF5KHRhcmdldCwgc291cmNlKTtcclxuICAgIH0gZWxzZSB7IC8vIE9iamVjdFxyXG5cclxuICAgICAgT2JqZWN0Q29tcGFyZS5kZWVwQ29weU9iamVjdCh0YXJnZXQsIHNvdXJjZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGFyZ2V0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2VuZXJpYyBkZWVwIGNvcHkgb2YgYW4gQXJyYXkuXHJcbiAgICogXHJcbiAgICogUGVyZm9ybXMgYSBkZWVwIGNvcHkgb2YgdGhlIGdpdmVuIHN0cnVjdHVyZSBpbiBhcmd1bWVudCBzb3VyY2UuIENvcGllcyB0aGUgdmFsdWVzIG9mIHRoZSBhcmd1bWVudCBcInNvdXJjZVwiIHRvIHRoZSBhcmd1bWVudCBcInRhcmdldFwiLlxyXG4gICAqIEFyZ3VtZW50IFwic291cmNlXCIgbmVlZHMgdG8gYmUgYSBwdXJlIGRhdGEgb2JqZWN0IGF0IGFsbCBsYXllcnMgKGJ1dCBjYW4gY29udGFpbiBuZXN0ZWQgb2JqZWN0cyBhbmQgYXJyYXlzKS5cclxuICAgKiBEYXRlcyBhcmUgY29waWVkIHZpYSB0aW1lc3RhbXAuXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIEBzdGF0aWNcclxuICAgKiBAcGFyYW0ge0FycmF5PGFueT59IHRhcmdldFxyXG4gICAqIEBwYXJhbSB7QXJyYXk8YW55Pn0gc291cmNlXHJcbiAgICogQG1lbWJlcm9mIE9iamVjdENvbXBhcmVcclxuICAgKi9cclxuICBwcml2YXRlIHN0YXRpYyBkZWVwQ29weUFycmF5KHRhcmdldDogQXJyYXk8YW55Piwgc291cmNlOiBBcnJheTxhbnk+KSB7XHJcbiAgICBcclxuICAgIC8vbG9vcCB0aHJvdWdoIGFsbCBlbnRyaWVzXHJcbiAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgc291cmNlLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICBcclxuICAgICAgaWYgKE9iamVjdENvbXBhcmUuaXNQcmltaXRpdmUodGFyZ2V0W2ldKSAmJiBPYmplY3RDb21wYXJlLmlzUHJpbWl0aXZlKHNvdXJjZVtpXSkpIHsgLy9QcmltaXRpdmUgZW50cnlcclxuICAgICAgICBcclxuICAgICAgICB0YXJnZXRbaV0gPSBzb3VyY2VbaV07XHJcbiAgICAgIH0gZWxzZSB7IC8vIGNvbXBsZXggZW50cnlcclxuXHJcbiAgICAgICAgT2JqZWN0Q29tcGFyZS5kZWVwQ29weSh0YXJnZXRbaV0sIHNvdXJjZVtpXSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBHZW5lcmljIGRlZXAgY29weSBvZiBhbiBPYmplY3QuXHJcbiAgICogXHJcbiAgICogUGVyZm9ybXMgYSBkZWVwIGNvcHkgb2YgdGhlIGdpdmVuIHN0cnVjdHVyZSBpbiBhcmd1bWVudCBzb3VyY2UuIENvcGllcyB0aGUgdmFsdWVzIG9mIHRoZSBhcmd1bWVudCBcInNvdXJjZVwiIHRvIHRoZSB0aGUgYXJndW1lbnQgXCJ0YXJnZXRcIi5cclxuICAgKiBBcmd1bWVudCBcInNvdXJjZVwiIG5lZWRzIHRvIGJlIGEgcHVyZSBkYXRhIG9iamVjdCBhdCBhbGwgbGF5ZXJzIChidXQgY2FuIGNvbnRhaW4gbmVzdGVkIG9iamVjdHMgYW5kIGFycmF5cykuXHJcbiAgICogRGF0ZXMgYXJlIGNvcGllZCB2aWEgdGltZXN0YW1wLlxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBAc3RhdGljXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IHRhcmdldFxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2VcclxuICAgKiBAbWVtYmVyb2YgT2JqZWN0Q29tcGFyZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgc3RhdGljIGRlZXBDb3B5T2JqZWN0KHRhcmdldDogT2JqZWN0LCBzb3VyY2U6IE9iamVjdCkge1xyXG5cclxuICAgIC8vbG9vcCB0aHJvdWdoIG1lbWJlclxyXG4gICAgZm9yIChsZXQga2V5IGluIHNvdXJjZSkge1xyXG4gICAgXHJcbiAgICAgIGlmIChPYmplY3RDb21wYXJlLmlzUHJpbWl0aXZlKHRhcmdldFtrZXldKSAmJiBPYmplY3RDb21wYXJlLmlzUHJpbWl0aXZlKHRhcmdldFtrZXldKSkgeyAvL1ByaW1pdGl2ZSBtZW1iZXJcclxuXHJcbiAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcclxuICAgICAgfSBlbHNlIHsgLy8gY29tcGxleCBtZW1iZXJcclxuXHJcbiAgICAgICAgT2JqZWN0Q29tcGFyZS5kZWVwQ29weSh0YXJnZXRba2V5XSwgc291cmNlW2tleV0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogR2VuZXJpYyBkZWVwIGNvbXBhcmlzb24uXHJcbiAgICogVXNlIHRvIGNvbXBhcmUgaW50ZXJmYWNlIGRhdGEuXHJcbiAgICogXHJcbiAgICogUGVyZm9ybXMgYSBkZWVwIGNvbXBhcmlzb24gdG8gdmFsaWRhdGUgaWYgdGhlIHN0cnVjdHVyZSBhbmQgdmFsdWVzIG9mIHRoZSBhcmd1bWVudCBcImV4cGVjdGVkXCIgYXJlIGVxdWFsIGluIHRoZSBhcmd1bWVudCBcImFjdHVhbFwiLlxyXG4gICAqIGFyZ3VtZW50cyBcImV4cGVjdGVkXCIgYW5kIFwiYWN0dWFsXCIgbmVlZCB0byBiZSBwdXJlIGRhdGEgb2JqZWN0cyBhdCBhbGwgbGF5ZXJzIChidXQgY2FuIGNvbnRhaW4gbmVzdGVkIG9iamVjdHMgYW5kIGFycmF5cykuXHJcbiAgICogRGF0ZXMgYXJlIGNvbXBhcmVkIHZpYSB0aW1lc3RhbXAuXHJcbiAgICpcclxuICAgKiBAc3RhdGljXHJcbiAgICogQHBhcmFtIHsqfSBhY3R1YWxcclxuICAgKiBAcGFyYW0geyp9IGV4cGVjdGVkXHJcbiAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICogQG1lbWJlcm9mIE9iamVjdENvbXBhcmVcclxuICAgKi9cclxuICBwdWJsaWMgc3RhdGljIGlzRXF1YWwoYWN0dWFsOiBhbnksIGV4cGVjdGVkOiBhbnkpIDogYm9vbGVhbiB7XHJcblxyXG4gICAgbGV0IHJlc3VsdDogQ29tcGFyaXNvblJlc3VsdCA9IE9iamVjdENvbXBhcmUuZXF1YWxzKGFjdHVhbCwgZXhwZWN0ZWQpO1xyXG4gICAgcmV0dXJuIHJlc3VsdC5zdWNjZXNzO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIEdlbmVyaWMgZGVlcCBjb21wYXJpc29uLlxyXG4gICAqIFVzZSB0byBjb21wYXJlIGludGVyZmFjZSBkYXRhLlxyXG4gICAqIFxyXG4gICAqIFBlcmZvcm1zIGEgZGVlcCBjb21wYXJpc29uIHRvIHZhbGlkYXRlIGlmIHRoZSBzdHJ1Y3R1cmUgYW5kIHZhbHVlcyBvZiB0aGUgYXJndW1lbnQgXCJleHBlY3RlZFwiIGFyZSBlcXVhbCBpbiB0aGUgYXJndW1lbnQgXCJhY3R1YWxcIi5cclxuICAgKiBhcmd1bWVudHMgXCJleHBlY3RlZFwiIGFuZCBcImFjdHVhbFwiIG5lZWQgdG8gYmUgcHVyZSBkYXRhIG9iamVjdHMgYXQgYWxsIGxheWVycyAoYnV0IGNhbiBjb250YWluIG5lc3RlZCBvYmplY3RzIGFuZCBhcnJheXMpLlxyXG4gICAqIERhdGVzIGFyZSBjb21wYXJlZCB2aWEgdGltZXN0YW1wLlxyXG4gICAqXHJcbiAgICogQHN0YXRpY1xyXG4gICAqIEBwYXJhbSB7Kn0gYWN0dWFsXHJcbiAgICogQHBhcmFtIHsqfSBleHBlY3RlZFxyXG4gICAqIEByZXR1cm5zIHtDb21wYXJpc29uUmVzdWx0fVxyXG4gICAqIEBtZW1iZXJvZiBPYmplY3RDb21wYXJlXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRpYyBlcXVhbHMoYWN0dWFsOiBhbnksIGV4cGVjdGVkOiBhbnkpOiBDb21wYXJpc29uUmVzdWx0IHtcclxuXHJcbiAgICBsZXQgcmVzdWx0ID0gbmV3IENvbXBhcmlzb25SZXN1bHQoZmFsc2UsIFwiYWN0dWFsIDwgXCIrIGFjdHVhbCArIFwiID4gYW5kIGV4cGVjdGVkIDwgXCIgKyBleHBlY3RlZCArIFwiID4gYXJlIG5vdCB0aGUgc2FtZSB0eXBlLlwiKTtcclxuXHJcbiAgICBpZihPYmplY3RDb21wYXJlLmlzUHJpbWl0aXZlKGFjdHVhbCkgJiYgT2JqZWN0Q29tcGFyZS5pc1ByaW1pdGl2ZShleHBlY3RlZCkpIHsgLy9QcmltaXRpdmVcclxuXHJcbiAgICAgIHJlc3VsdCA9IE9iamVjdENvbXBhcmUuY29tcGFyZVByaW1pdGl2ZXMoYWN0dWFsLCBleHBlY3RlZCk7XHJcbiAgICB9IGVsc2UgaWYgKE9iamVjdENvbXBhcmUuaXNEYXRlKGFjdHVhbCkgJiYgT2JqZWN0Q29tcGFyZS5pc0RhdGUoZXhwZWN0ZWQpKSB7IC8vRGF0ZVxyXG5cclxuICAgICAgcmVzdWx0ID0gT2JqZWN0Q29tcGFyZS5jb21wYXJlRGF0ZShhY3R1YWwsIGV4cGVjdGVkKTtcclxuICAgIH0gZWxzZSBpZiAoT2JqZWN0Q29tcGFyZS5pc0FycmF5KGFjdHVhbCkgJiYgT2JqZWN0Q29tcGFyZS5pc0FycmF5KGV4cGVjdGVkKSkgeyAvL0FycmF5XHJcblxyXG4gICAgICByZXN1bHQgPSBPYmplY3RDb21wYXJlLmVxdWFsc0FycmF5KGFjdHVhbCwgZXhwZWN0ZWQpO1xyXG4gICAgfSBlbHNlIGlmKE9iamVjdENvbXBhcmUuaXNPYmplY3QoYWN0dWFsKSAmJiBPYmplY3RDb21wYXJlLmlzT2JqZWN0KGV4cGVjdGVkKSl7IC8vIE9iamVjdFxyXG5cclxuICAgICAgcmVzdWx0ID0gT2JqZWN0Q29tcGFyZS5lcXVhbHNPYmplY3QoYWN0dWFsLCBleHBlY3RlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdlbmVyaWMgZGVlcCBjb21wYXJpc29uIG9mIEFycmF5cy5cclxuICAgKlxyXG4gICAqIFBlcmZvcm1zIGEgZGVlcCBjb21wYXJpc29uIHRvIHZhbGlkYXRlIGlmIHRoZSBzdHJ1Y3R1cmUgYW5kIHZhbHVlcyBvZiB0aGUgYXJndW1lbnQgXCJleHBlY3RlZFwiIGFyZSBlcXVhbCBpbiB0aGUgYXJndW1lbnQgXCJhY3R1YWxcIi5cclxuICAgKiBhcmd1bWVudHMgXCJleHBlY3RlZFwiIGFuZCBcImFjdHVhbFwiIG5lZWQgdG8gYmUgcHVyZSBkYXRhIG9iamVjdHMgYXQgYWxsIGxheWVycyAoYnV0IGNhbiBjb250YWluIG5lc3RlZCBvYmplY3RzIGFuZCBhcnJheXMpLlxyXG4gICAqIERhdGVzIGFyZSBjb21wYXJlZCB2aWEgdGltZXN0YW1wLlxyXG4gICAqXHJcbiAgICogQHN0YXRpY1xyXG4gICAqIEBwYXJhbSB7QXJyYXk8YW55Pn0gYWN0dWFsXHJcbiAgICogQHBhcmFtIHtBcnJheTxhbnk+fSBleHBlY3RlZFxyXG4gICAqIEByZXR1cm5zIHtDb21wYXJpc29uUmVzdWx0fVxyXG4gICAqIEBtZW1iZXJvZiBPYmplY3RDb21wYXJlXHJcbiAgICovXHJcbiAgc3RhdGljIGVxdWFsc0FycmF5KGFjdHVhbDogQXJyYXk8YW55PiwgZXhwZWN0ZWQ6IEFycmF5PGFueT4pOiBDb21wYXJpc29uUmVzdWx0IHtcclxuICAgIFxyXG4gICAgbGV0IHJlc3VsdDogQ29tcGFyaXNvblJlc3VsdCA9IG5ldyBDb21wYXJpc29uUmVzdWx0KGZhbHNlLCBcImFjdHVhbCBhcnJheSA8IFwiICthY3R1YWwrIFwiID4gYW5kIGV4cGVjdGVkIGFycmF5IDwgXCIgK2V4cGVjdGVkKyBcIiA+IGRvIG5vdCBoYXZlIHRoZSBzYW1lIGxlbmd0aFwiKTtcclxuXHJcbiAgICBpZihhY3R1YWwubGVuZ3RoID09PSBleHBlY3RlZC5sZW5ndGgpIHtcclxuICAgICAgcmVzdWx0ID0gbmV3IENvbXBhcmlzb25SZXN1bHQodHJ1ZSwgXCJlbXB0eSBhcnJheXNcIik7XHJcbiAgICAgIC8vbG9vcCB0aHJvdWdoIGFsbCBlbnRyaWVzXHJcbiAgICAgIGZvcihsZXQgaTogbnVtYmVyPSAwOyAoaSA8IGV4cGVjdGVkLmxlbmd0aCkgJiYgcmVzdWx0LnN1Y2Nlc3M7IGkrPTEpIHtcclxuXHJcbiAgICAgICAgcmVzdWx0ID0gT2JqZWN0Q29tcGFyZS5jb250YWlucyhhY3R1YWxbaV0sIGV4cGVjdGVkW2ldKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZW5lcmljIGRlZXAgY29tcGFyaXNvbiBvZiBPYmplY3RzLlxyXG4gICAqXHJcbiAgICogUGVyZm9ybXMgYSBkZWVwIGNvbXBhcmlzb24gdG8gdmFsaWRhdGUgaWYgdGhlIHN0cnVjdHVyZSBhbmQgdmFsdWVzIG9mIHRoZSBhcmd1bWVudCBcImV4cGVjdGVkXCIgYXJlIGVxdWFsIGluIHRoZSBhcmd1bWVudCBcImFjdHVhbFwiLlxyXG4gICAqIGFyZ3VtZW50cyBcImV4cGVjdGVkXCIgYW5kIFwiYWN0dWFsXCIgbmVlZCB0byBiZSBwdXJlIGRhdGEgb2JqZWN0cyBhdCBhbGwgbGF5ZXJzIChidXQgY2FuIGNvbnRhaW4gbmVzdGVkIG9iamVjdHMgYW5kIGFycmF5cykuXHJcbiAgICogRGF0ZXMgYXJlIGNvbXBhcmVkIHZpYSB0aW1lc3RhbXAuXHJcbiAgICpcclxuICAgKiBAc3RhdGljXHJcbiAgICogQHRlbXBsYXRlIFRcclxuICAgKiBAcGFyYW0ge1R9IGFjdHVhbFxyXG4gICAqIEBwYXJhbSB7VH0gZXhwZWN0ZWRcclxuICAgKiBAcmV0dXJucyB7Q29tcGFyaXNvblJlc3VsdH1cclxuICAgKiBAbWVtYmVyb2YgT2JqZWN0Q29tcGFyZVxyXG4gICAqL1xyXG4gIHN0YXRpYyBlcXVhbHNPYmplY3Q8VCBleHRlbmRzIE9iamVjdD4oYWN0dWFsOiBULCBleHBlY3RlZDogVCk6IENvbXBhcmlzb25SZXN1bHQge1xyXG4gICAgXHJcbiAgICBsZXQgcmVzdWx0OiBDb21wYXJpc29uUmVzdWx0ID0gbmV3IENvbXBhcmlzb25SZXN1bHQoZmFsc2UsIFwiYWN0dWFsIG9iamVjdCA8IFwiICthY3R1YWwrIFwiID4gYW5kIGV4cGVjdGVkIG9iamVjdCA8IFwiICtleHBlY3RlZCsgXCIgPiBkbyBub3QgaGF2ZSB0aGUgc2FtZSBrZXlzXCIpOyBcclxuXHJcbiAgICBpZihPYmplY3Qua2V5cyhhY3R1YWwpID09PSBPYmplY3Qua2V5cyhleHBlY3RlZCkpIHtcclxuXHJcbiAgICAgIHJlc3VsdCA9IG5ldyBDb21wYXJpc29uUmVzdWx0KHRydWUsIFwiZW1wdHkgb2JqZWN0c1wiKTtcclxuICAgICAgLy9sb29wIHRocm91Z2ggYWxsIG1lbWJlclxyXG4gICAgICBmb3IgKGxldCBrZXkgaW4gZXhwZWN0ZWQpIHtcclxuICAgICAgICByZXN1bHQgPSBPYmplY3RDb21wYXJlLmNvbnRhaW5zKGFjdHVhbFtrZXldLCBleHBlY3RlZFtrZXldKTtcclxuICAgICAgICBpZiAoIXJlc3VsdC5zdWNjZXNzKSB7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIERlc2NyaWJlcyB0aGUgcmVzdWx0IG9mIGFuIGNvbXBhcmlzb25cclxuICpcclxuICogQGNsYXNzIENvbXBhcmlzb25SZXN1bHRcclxuICovXHJcbmNsYXNzIENvbXBhcmlzb25SZXN1bHQge1xyXG5cclxuICBwcml2YXRlIF9pc1N1Y2Nlc3M6IGJvb2xlYW47XHJcbiAgcHJpdmF0ZSBfZmFpbHVyZU1lc3NhZ2U6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IoaXNTdWNjZXNzOiBib29sZWFuLCBmYWlsdXJlTWVzc2FnZTogc3RyaW5nPSBcIk1lc3NhZ2UgZGVjcmliaW5nIHJlYXNvbiBvZiBmYWlsdXJlIHdhcyBub3QgZGVmaW5lZFwiKSB7XHJcblxyXG4gICAgdGhpcy5faXNTdWNjZXNzPSBpc1N1Y2Nlc3M7XHJcbiAgICB0aGlzLl9mYWlsdXJlTWVzc2FnZT0gZmFpbHVyZU1lc3NhZ2U7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqIFxyXG4gICAqIFJldHVybnMgdGhlIHJlYXNvbiBvZiBmYWlsdXJlIG9mIHRoZSBkZXNjcmliZWQgY29tcGFyaXNvblxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICogQG1lbWJlcm9mIENvbXBhcmlzb25SZXN1bHRcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0IGZhaWx1cmVNZXNzYWdlKCk6IHN0cmluZyB7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuX2ZhaWx1cmVNZXNzYWdlO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybiBhIGJvb2xlYW4gcmVwcmVzZW50YXRpbmcgdGhlIHN1Y2Nlc3Mgb2YgdGhlIGRlc2NyaWJlZCBjb21wYXJpc29uXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgKiBAbWVtYmVyb2YgQ29tcGFyaXNvblJlc3VsdFxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXQgc3VjY2VzcygpOiBib29sZWFuIHtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5faXNTdWNjZXNzO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IHsgT2JqZWN0Q29tcGFyZSwgQ29tcGFyaXNvblJlc3VsdCB9Il19