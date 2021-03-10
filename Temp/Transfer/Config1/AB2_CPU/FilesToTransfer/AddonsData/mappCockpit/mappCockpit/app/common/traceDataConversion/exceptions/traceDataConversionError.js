var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "../enums/traceDataConversionErrorTypes"], function (require, exports, traceDataConversionErrorTypes_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * This class represents an error ocurred in traceDataConversion.
     *
     * @class TraceDataConversionError
     * @extends {Error}
     */
    var TraceDataConversionError = /** @class */ (function (_super) {
        __extends(TraceDataConversionError, _super);
        /**
         * Creates an instance of TraceDataConversionError.
         * The id will be added to the base name.
         *
         * @param {number} id
         * @param {string} text
         * @memberof TraceDataConversionError
         */
        function TraceDataConversionError(id, text) {
            var _this = _super.call(this, text) || this;
            _this.name = TraceDataConversionError.errorName + id;
            return _this;
        }
        /**
         * Typeguard to check if an Error is a TraceDataConversionError.
         *
         * @static
         * @param {Error} err
         * @returns {err is TraceDataConversionError}
         * @memberof TraceDataConversionError
         */
        TraceDataConversionError.isTraceDataConversionError = function (err) {
            var isFound = false;
            if (err instanceof Error && err.name.search(TraceDataConversionError.errorName) >= 0) {
                isFound = true;
            }
            return isFound;
        };
        /**
         * Builds a TraceData Conversion Error based on the TraceDataConversionErrorType
         * Appends additionalInfo to the base error text
         *
         * @static
         * @param {TraceDataConversionErrorTypes} errorType
         * @param {string} [additionalInfo]
         * @returns {TraceDataConversionError}
         * @memberof TraceDataConversionError
         */
        TraceDataConversionError.build = function (errorType, additionalInfo) {
            var text = this.getErrorText(errorType);
            text += additionalInfo ? (": " + additionalInfo) : ".";
            return new TraceDataConversionError(errorType, text);
        };
        /**
         * Provides the base error text for an TraceDataConversionErrorType or ID.
         *
         * @static
         * @param {TraceDataConversionErrorTypes} errorType
         * @returns {string}
         * @memberof TraceDataConversionError
         */
        TraceDataConversionError.getErrorText = function (errorType) {
            var text;
            switch (errorType) {
                case traceDataConversionErrorTypes_1.TraceDataConversionErrorTypes.WRONG_FORMAT:
                    text = "This format is not supported";
                    break;
                case traceDataConversionErrorTypes_1.TraceDataConversionErrorTypes.NO_DATA:
                    text = "There is no data to be converted";
                    break;
                case traceDataConversionErrorTypes_1.TraceDataConversionErrorTypes.FORMAT_VIOLATION:
                    text = "The format is invalid";
                    break;
                case traceDataConversionErrorTypes_1.TraceDataConversionErrorTypes.NO_COLSEP:
                    text = "The column seperator can not be determined";
                    break;
                case traceDataConversionErrorTypes_1.TraceDataConversionErrorTypes.NO_COMSEP:
                    text = "The comma seperator can not be determined";
                    break;
                case traceDataConversionErrorTypes_1.TraceDataConversionErrorTypes.UNKNOWN_COLSEP:
                    text = "The column seperator is unknown";
                    break;
                case traceDataConversionErrorTypes_1.TraceDataConversionErrorTypes.UNKNOWN_COMSEP:
                    text = "The comma seperator is unknown";
                    break;
                case traceDataConversionErrorTypes_1.TraceDataConversionErrorTypes.MISSING_ATTRIBUTE:
                    text = "An attribute does not exist";
                    break;
                case traceDataConversionErrorTypes_1.TraceDataConversionErrorTypes.UNKNOWN_FORMAT:
                    text = "The format can not be determined";
                    break;
                case traceDataConversionErrorTypes_1.TraceDataConversionErrorTypes.WRONG_FILETYPE:
                    text = "This filetype is not supported";
                    break;
                case traceDataConversionErrorTypes_1.TraceDataConversionErrorTypes.INTERNAL:
                    text = "Internal error";
                    break;
                case traceDataConversionErrorTypes_1.TraceDataConversionErrorTypes.INVALID_RECORDING:
                    text = "The recording contains signals with invalid numbers";
                    break;
                default:
                    text = "Unknown reason";
                    break;
            }
            return text;
        };
        /**
         * Holds the base name of the TraceDataConversion Error.
         *
         * @private
         * @static
         * @type {string}
         * @memberof TraceDataConversionError
         */
        TraceDataConversionError.errorName = "TraceDataConversionError ID ";
        return TraceDataConversionError;
    }(Error));
    exports.TraceDataConversionError = TraceDataConversionError;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VEYXRhQ29udmVyc2lvbkVycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vdHJhY2VEYXRhQ29udmVyc2lvbi9leGNlcHRpb25zL3RyYWNlRGF0YUNvbnZlcnNpb25FcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBR0E7Ozs7O09BS0c7SUFDSDtRQUF1Qyw0Q0FBSztRQWdCeEM7Ozs7Ozs7V0FPRztRQUNILGtDQUFvQixFQUFVLEVBQUUsSUFBWTtZQUE1QyxZQUVJLGtCQUFNLElBQUksQ0FBQyxTQUVkO1lBREcsS0FBSSxDQUFDLElBQUksR0FBRyx3QkFBd0IsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDOztRQUN4RCxDQUFDO1FBS0Q7Ozs7Ozs7V0FPRztRQUNXLG1EQUEwQixHQUF4QyxVQUF5QyxHQUFRO1lBRTdDLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQztZQUVwQixJQUFJLEdBQUcsWUFBWSxLQUFLLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsd0JBQXdCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUVsRixPQUFPLEdBQUcsSUFBSSxDQUFDO2FBQ2xCO1lBQ0QsT0FBTyxPQUFPLENBQUM7UUFDbkIsQ0FBQztRQUdEOzs7Ozs7Ozs7V0FTRztRQUNXLDhCQUFLLEdBQW5CLFVBQW9CLFNBQXdDLEVBQUUsY0FBdUI7WUFFakYsSUFBSSxJQUFJLEdBQVcsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUVoRCxJQUFJLElBQUksY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBRXZELE9BQU8sSUFBSSx3QkFBd0IsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDekQsQ0FBQztRQUlEOzs7Ozs7O1dBT0c7UUFDVyxxQ0FBWSxHQUExQixVQUEyQixTQUF3QztZQUUvRCxJQUFJLElBQVksQ0FBQztZQUVqQixRQUFRLFNBQVMsRUFBRTtnQkFFZixLQUFLLDZEQUE2QixDQUFDLFlBQVk7b0JBQzNDLElBQUksR0FBRyw4QkFBOEIsQ0FBQztvQkFDdEMsTUFBTTtnQkFDVixLQUFLLDZEQUE2QixDQUFDLE9BQU87b0JBQ3RDLElBQUksR0FBRyxrQ0FBa0MsQ0FBQztvQkFDMUMsTUFBSztnQkFDVCxLQUFLLDZEQUE2QixDQUFDLGdCQUFnQjtvQkFDL0MsSUFBSSxHQUFHLHVCQUF1QixDQUFBO29CQUM5QixNQUFLO2dCQUNULEtBQUssNkRBQTZCLENBQUMsU0FBUztvQkFDeEMsSUFBSSxHQUFHLDRDQUE0QyxDQUFDO29CQUNwRCxNQUFNO2dCQUNWLEtBQUssNkRBQTZCLENBQUMsU0FBUztvQkFDeEMsSUFBSSxHQUFHLDJDQUEyQyxDQUFDO29CQUNuRCxNQUFNO2dCQUNWLEtBQUssNkRBQTZCLENBQUMsY0FBYztvQkFDN0MsSUFBSSxHQUFHLGlDQUFpQyxDQUFDO29CQUN6QyxNQUFNO2dCQUNWLEtBQUssNkRBQTZCLENBQUMsY0FBYztvQkFDN0MsSUFBSSxHQUFHLGdDQUFnQyxDQUFDO29CQUN4QyxNQUFNO2dCQUNWLEtBQUssNkRBQTZCLENBQUMsaUJBQWlCO29CQUNoRCxJQUFJLEdBQUcsNkJBQTZCLENBQUM7b0JBQ3JDLE1BQU07Z0JBQ1YsS0FBSyw2REFBNkIsQ0FBQyxjQUFjO29CQUM3QyxJQUFJLEdBQUcsa0NBQWtDLENBQUM7b0JBQzFDLE1BQU07Z0JBQ1YsS0FBSyw2REFBNkIsQ0FBQyxjQUFjO29CQUM3QyxJQUFJLEdBQUcsZ0NBQWdDLENBQUM7b0JBQ3hDLE1BQU07Z0JBQ1YsS0FBSyw2REFBNkIsQ0FBQyxRQUFRO29CQUN2QyxJQUFJLEdBQUcsZ0JBQWdCLENBQUM7b0JBQ3hCLE1BQU07Z0JBQ1YsS0FBSyw2REFBNkIsQ0FBQyxpQkFBaUI7b0JBQ2hELElBQUksR0FBRyxxREFBcUQsQ0FBQztvQkFDN0QsTUFBTTtnQkFDVjtvQkFDSSxJQUFJLEdBQUcsZ0JBQWdCLENBQUM7b0JBQ3hCLE1BQU07YUFDYjtZQUVELE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUE5SEQ7Ozs7Ozs7V0FPRztRQUNxQixrQ0FBUyxHQUFXLDhCQUE4QixDQUFDO1FBd0gvRSwrQkFBQztLQUFBLEFBcElELENBQXVDLEtBQUssR0FvSTNDO0lBQVUsNERBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yVHlwZXMgfSBmcm9tIFwiLi4vZW51bXMvdHJhY2VEYXRhQ29udmVyc2lvbkVycm9yVHlwZXNcIjtcclxuXHJcblxyXG4vKipcclxuICogVGhpcyBjbGFzcyByZXByZXNlbnRzIGFuIGVycm9yIG9jdXJyZWQgaW4gdHJhY2VEYXRhQ29udmVyc2lvbi5cclxuICpcclxuICogQGNsYXNzIFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvclxyXG4gKiBAZXh0ZW5kcyB7RXJyb3J9XHJcbiAqL1xyXG5jbGFzcyBUcmFjZURhdGFDb252ZXJzaW9uRXJyb3IgZXh0ZW5kcyBFcnJvcntcclxuXHJcblxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEhvbGRzIHRoZSBiYXNlIG5hbWUgb2YgdGhlIFRyYWNlRGF0YUNvbnZlcnNpb24gRXJyb3IuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IGVycm9yTmFtZTogc3RyaW5nID0gXCJUcmFjZURhdGFDb252ZXJzaW9uRXJyb3IgSUQgXCI7XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yLlxyXG4gICAgICogVGhlIGlkIHdpbGwgYmUgYWRkZWQgdG8gdGhlIGJhc2UgbmFtZS5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGlkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKGlkOiBudW1iZXIsIHRleHQ6IHN0cmluZykge1xyXG5cclxuICAgICAgICBzdXBlcih0ZXh0KTtcclxuICAgICAgICB0aGlzLm5hbWUgPSBUcmFjZURhdGFDb252ZXJzaW9uRXJyb3IuZXJyb3JOYW1lICsgaWQ7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogVHlwZWd1YXJkIHRvIGNoZWNrIGlmIGFuIEVycm9yIGlzIGEgVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yLlxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7RXJyb3J9IGVyclxyXG4gICAgICogQHJldHVybnMge2VyciBpcyBUcmFjZURhdGFDb252ZXJzaW9uRXJyb3J9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgaXNUcmFjZURhdGFDb252ZXJzaW9uRXJyb3IoZXJyOiBhbnkpIDogZXJyIGlzIFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvcntcclxuXHJcbiAgICAgICAgbGV0IGlzRm91bmQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIEVycm9yICYmIGVyci5uYW1lLnNlYXJjaChUcmFjZURhdGFDb252ZXJzaW9uRXJyb3IuZXJyb3JOYW1lKSA+PSAwKSB7XHJcblxyXG4gICAgICAgICAgICBpc0ZvdW5kID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGlzRm91bmQ7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQnVpbGRzIGEgVHJhY2VEYXRhIENvbnZlcnNpb24gRXJyb3IgYmFzZWQgb24gdGhlIFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvclR5cGVcclxuICAgICAqIEFwcGVuZHMgYWRkaXRpb25hbEluZm8gdG8gdGhlIGJhc2UgZXJyb3IgdGV4dFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7VHJhY2VEYXRhQ29udmVyc2lvbkVycm9yVHlwZXN9IGVycm9yVHlwZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFthZGRpdGlvbmFsSW5mb11cclxuICAgICAqIEByZXR1cm5zIHtUcmFjZURhdGFDb252ZXJzaW9uRXJyb3J9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgYnVpbGQoZXJyb3JUeXBlOiBUcmFjZURhdGFDb252ZXJzaW9uRXJyb3JUeXBlcywgYWRkaXRpb25hbEluZm8/OiBzdHJpbmcpOiBUcmFjZURhdGFDb252ZXJzaW9uRXJyb3Ige1xyXG5cclxuICAgICAgICBsZXQgdGV4dDogc3RyaW5nID0gdGhpcy5nZXRFcnJvclRleHQoZXJyb3JUeXBlKTtcclxuXHJcbiAgICAgICAgdGV4dCArPSBhZGRpdGlvbmFsSW5mbyA/IChcIjogXCIgKyBhZGRpdGlvbmFsSW5mbykgOiBcIi5cIjtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBUcmFjZURhdGFDb252ZXJzaW9uRXJyb3IoZXJyb3JUeXBlLCB0ZXh0KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFByb3ZpZGVzIHRoZSBiYXNlIGVycm9yIHRleHQgZm9yIGFuIFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvclR5cGUgb3IgSUQuXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtUcmFjZURhdGFDb252ZXJzaW9uRXJyb3JUeXBlc30gZXJyb3JUeXBlXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEVycm9yVGV4dChlcnJvclR5cGU6IFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvclR5cGVzKTogc3RyaW5nIHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgdGV4dDogc3RyaW5nO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKGVycm9yVHlwZSkge1xyXG5cclxuICAgICAgICAgICAgY2FzZSBUcmFjZURhdGFDb252ZXJzaW9uRXJyb3JUeXBlcy5XUk9OR19GT1JNQVQ6XHJcbiAgICAgICAgICAgICAgICB0ZXh0ID0gXCJUaGlzIGZvcm1hdCBpcyBub3Qgc3VwcG9ydGVkXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBUcmFjZURhdGFDb252ZXJzaW9uRXJyb3JUeXBlcy5OT19EQVRBOlxyXG4gICAgICAgICAgICAgICAgdGV4dCA9IFwiVGhlcmUgaXMgbm8gZGF0YSB0byBiZSBjb252ZXJ0ZWRcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIGNhc2UgVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yVHlwZXMuRk9STUFUX1ZJT0xBVElPTjpcclxuICAgICAgICAgICAgICAgIHRleHQgPSBcIlRoZSBmb3JtYXQgaXMgaW52YWxpZFwiXHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICBjYXNlIFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvclR5cGVzLk5PX0NPTFNFUDpcclxuICAgICAgICAgICAgICAgIHRleHQgPSBcIlRoZSBjb2x1bW4gc2VwZXJhdG9yIGNhbiBub3QgYmUgZGV0ZXJtaW5lZFwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yVHlwZXMuTk9fQ09NU0VQOlxyXG4gICAgICAgICAgICAgICAgdGV4dCA9IFwiVGhlIGNvbW1hIHNlcGVyYXRvciBjYW4gbm90IGJlIGRldGVybWluZWRcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvclR5cGVzLlVOS05PV05fQ09MU0VQOlxyXG4gICAgICAgICAgICAgICAgdGV4dCA9IFwiVGhlIGNvbHVtbiBzZXBlcmF0b3IgaXMgdW5rbm93blwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yVHlwZXMuVU5LTk9XTl9DT01TRVA6XHJcbiAgICAgICAgICAgICAgICB0ZXh0ID0gXCJUaGUgY29tbWEgc2VwZXJhdG9yIGlzIHVua25vd25cIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvclR5cGVzLk1JU1NJTkdfQVRUUklCVVRFOlxyXG4gICAgICAgICAgICAgICAgdGV4dCA9IFwiQW4gYXR0cmlidXRlIGRvZXMgbm90IGV4aXN0XCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBUcmFjZURhdGFDb252ZXJzaW9uRXJyb3JUeXBlcy5VTktOT1dOX0ZPUk1BVDpcclxuICAgICAgICAgICAgICAgIHRleHQgPSBcIlRoZSBmb3JtYXQgY2FuIG5vdCBiZSBkZXRlcm1pbmVkXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBUcmFjZURhdGFDb252ZXJzaW9uRXJyb3JUeXBlcy5XUk9OR19GSUxFVFlQRTpcclxuICAgICAgICAgICAgICAgIHRleHQgPSBcIlRoaXMgZmlsZXR5cGUgaXMgbm90IHN1cHBvcnRlZFwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yVHlwZXMuSU5URVJOQUw6XHJcbiAgICAgICAgICAgICAgICB0ZXh0ID0gXCJJbnRlcm5hbCBlcnJvclwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yVHlwZXMuSU5WQUxJRF9SRUNPUkRJTkc6XHJcbiAgICAgICAgICAgICAgICB0ZXh0ID0gXCJUaGUgcmVjb3JkaW5nIGNvbnRhaW5zIHNpZ25hbHMgd2l0aCBpbnZhbGlkIG51bWJlcnNcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrOyAgICBcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHRleHQgPSBcIlVua25vd24gcmVhc29uXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0ZXh0O1xyXG4gICAgfSAgXHJcbiAgICBcclxufSBleHBvcnQgeyBUcmFjZURhdGFDb252ZXJzaW9uRXJyb3IgfSJdfQ==