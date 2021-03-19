define(["require", "exports", "../calculationDataPoints", "../../../chartManagerDataModel/seriesType", "./calculatorHelper"], function (require, exports, calculationDataPoints_1, seriesType_1, calculatorHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ErrorMessageType;
    (function (ErrorMessageType) {
        ErrorMessageType[ErrorMessageType["MissingOrInvalidInput"] = 0] = "MissingOrInvalidInput";
        ErrorMessageType[ErrorMessageType["InvalidOutput"] = 1] = "InvalidOutput";
        ErrorMessageType[ErrorMessageType["InvalidInputType"] = 2] = "InvalidInputType";
        ErrorMessageType[ErrorMessageType["NotEnoughCommonTimestamps"] = 3] = "NotEnoughCommonTimestamps";
        ErrorMessageType[ErrorMessageType["ContainsNaNOrInfinity"] = 4] = "ContainsNaNOrInfinity";
        ErrorMessageType[ErrorMessageType["ContainsZeroInYValues"] = 5] = "ContainsZeroInYValues";
        ErrorMessageType[ErrorMessageType["ContainsFloatingNumbers"] = 6] = "ContainsFloatingNumbers";
        ErrorMessageType[ErrorMessageType["NumberNotAllowedToBeZero"] = 7] = "NumberNotAllowedToBeZero";
        ErrorMessageType[ErrorMessageType["NumberIsNoInt"] = 8] = "NumberIsNoInt";
        ErrorMessageType[ErrorMessageType["NotStrictlyMonotonicallyIncreasingInTime"] = 9] = "NotStrictlyMonotonicallyIncreasingInTime";
    })(ErrorMessageType || (ErrorMessageType = {}));
    exports.ErrorMessageType = ErrorMessageType;
    exports.ErroMessageType = ErrorMessageType;
    /**
     * Base class for all calculators
     *
     * @class CalculatorBase
     * @implements {ICalculator}
     */
    var CalculatorBase = /** @class */ (function () {
        /**
         * Creates an instance of CalculatorBase.
         *
         * @param {string} id
         * @param {string} displayName
         * @param {string} description
         * @memberof CalculatorBase
         */
        function CalculatorBase(id, displayName, description) {
            this.errorList = new Array();
            this.calculationInputDataContainer = new Array();
            this.calculationOutputDataContainer = new Array();
            this._id = id;
            this._displayName = displayName;
            this._description = description;
        }
        Object.defineProperty(CalculatorBase.prototype, "id", {
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CalculatorBase.prototype, "displayName", {
            get: function () {
                return this._displayName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CalculatorBase.prototype, "description", {
            get: function () {
                return this._description;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Empties the error list.
         *
         * @protected
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.clearErrors = function () {
            this.errorList = new Array();
        };
        /**
         * Adds an error to the errorlist.
         *
         * @protected
         * @param {string} errorMessage
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.addError = function (errorMessage) {
            this.errorList.push(errorMessage);
        };
        /**
         * Returns the error list.
         *
         * @returns {Array<string>}
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.getErrors = function () {
            return this.errorList;
        };
        /**
         * Returns if the error list has entries.
         *
         * @protected
         * @returns {boolean}
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.hasErrors = function () {
            return this.errorList.length > 0;
        };
        /**
         * Empties the calculation input data container.
         *
         * @protected
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.clearCalculationInputDataContainer = function () {
            this.calculationInputDataContainer = new Array();
        };
        /**
         * Adds calculation input data (data to be calculated) to the calculation input data container.
         *
         * @protected
         * @param {CalculationInputData} calculationData
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.addCalculationInputData = function (calculationData) {
            this.calculationInputDataContainer.push(calculationData);
        };
        /**
         * Returns the calculation input data container (data to be calculated).
         *
         * @returns {Array<CalculationInputData>}
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.getCalculationInputDataContainer = function () {
            return this.calculationInputDataContainer;
        };
        /**
         * Empties the calculation output data container.
         *
         * @protected
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.clearCalculationOutputDataContainer = function () {
            this.calculationOutputDataContainer = new Array();
        };
        /**
         * Adds calculation output data (data resulting from calculation) to ther calculation output data container.
         *
         * @protected
         * @param {CalculationOutputData} calculationOutputData
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.addCalculationOutputData = function (calculationOutputData) {
            this.calculationOutputDataContainer.push(calculationOutputData);
        };
        /**
         * Returns the container holding the calculation output data (data resulting from calculation).
         *
         * @returns {Array<CalculationOutputData>}
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.getCalculationOutputDataContainer = function () {
            return this.calculationOutputDataContainer;
        };
        /**
         * Adds an error to the errorlist of the calculator.
         * Generates the error message based on error type.
         *
         * @protected
         * @param {ErrorMessageType} errorMessageType
         * @param {Array<string>} errorMessageData
         * @returns
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.addErrorByType = function (errorMessageType, errorMessageData) {
            if (!(errorMessageData.length > 0)) { // log to console if no errorMessageData is provided
                console.error("errorMessageData is missing!");
                return;
            }
            var errorMessage = "";
            var joinedErrorMessageData = errorMessageData.join(", ");
            switch (errorMessageType) { // generate error message according to errror type
                case ErrorMessageType.MissingOrInvalidInput:
                    errorMessage = "Calculation Error: Data for '" + joinedErrorMessageData + "' is missing or invalid!";
                    break;
                case ErrorMessageType.InvalidOutput:
                    errorMessage = "Calculation Error: Output data for '" + joinedErrorMessageData + "' is invalid!";
                    break;
                case ErrorMessageType.InvalidInputType:
                    errorMessage = "Calculation Error: Input signal type for '" + joinedErrorMessageData + "' is not supported! Please use input signal of type YT.";
                    break;
                case ErrorMessageType.NotEnoughCommonTimestamps:
                    errorMessage = "Calculation Error: The inputs '" + joinedErrorMessageData + "' do not share enough common timestamps!";
                    break;
                case ErrorMessageType.ContainsNaNOrInfinity:
                    errorMessage = "Calculation Error: Data for '" + joinedErrorMessageData + "' does contain NaN or Infinity!";
                    break;
                case ErrorMessageType.ContainsZeroInYValues:
                    errorMessage = "Calculation Error: Data for '" + joinedErrorMessageData + "' does contain 0 in the y values!";
                    break;
                case ErrorMessageType.ContainsFloatingNumbers:
                    errorMessage = "Calculation Error: Data for '" + joinedErrorMessageData + "' does contain floating point numbers in the y values!";
                    break;
                case ErrorMessageType.NumberNotAllowedToBeZero:
                    errorMessage = "Calculation Error: Data for '" + joinedErrorMessageData + "' is not allowed to be 0!";
                    break;
                case ErrorMessageType.NumberIsNoInt:
                    errorMessage = "Calculation Error: Data for '" + joinedErrorMessageData + "' is not allowed to be a floating point number!";
                    break;
                case ErrorMessageType.NotStrictlyMonotonicallyIncreasingInTime:
                    errorMessage = "Calculation Error: Data for '" + joinedErrorMessageData + "' is not strictly monotonically increasing in time!";
                    break;
                default:
                    errorMessage = "Calculation Error: Calculation of '" + joinedErrorMessageData + "' failed! Unknown reason!";
                    break;
            }
            this.errorList.push(errorMessage);
        };
        /**
         * Hook to provide the default input data
         *
         * @returns {(Array<TCalculationData>)}
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.getDefaultInputData = function () {
            var defaultInputData = new Array();
            return defaultInputData;
        };
        /**
         * Hook to provide the default output data
         *
         * @returns {Array<CalculationDataPoints>}
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.getDefaultOutputData = function () {
            var defaultOutputData = new Array();
            return defaultOutputData;
        };
        /**
         * Runs the steps necessary to perform the calculation of the calculator.
         *
         * @param {(Array<TCalculationData>)} inputData
         * @returns {Array<CalculationDataPoints>}
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.calculate = function (inputData) {
            this.clearErrors();
            this.clearCalculationInputDataContainer();
            this.clearCalculationOutputDataContainer();
            this.extractCalculationData(inputData);
            if (this.hasErrors()) {
                return this.getDefaultOutputData();
            }
            this.prepareCalculationData();
            if (this.hasErrors()) {
                return this.getDefaultOutputData();
            }
            this.verifyCalculationInputData();
            if (this.hasErrors()) {
                return this.getDefaultOutputData();
            }
            this.executeAlgorithm();
            if (this.hasErrors()) {
                return this.getDefaultOutputData();
            }
            this.verifyCalculationOutputData();
            if (this.hasErrors()) {
                return this.getDefaultOutputData();
            }
            var outputData = this.generateOutputData();
            return outputData;
        };
        /**
         * Extracts the calculation input data from the calculator input.
         * Checks if input is not of type XY or FFT.
         *
         * @private
         * @param {(Array<TCalculationData>)} inputData
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.extractCalculationData = function (inputData) {
            var _this = this;
            var invalidSerieTypesNames = new Array();
            inputData.forEach(function (input) {
                var calculationData = {
                    data: input.getData(),
                    name: input.getDisplayName()
                };
                if (input.type == seriesType_1.SeriesType.fftSeries || input.type == seriesType_1.SeriesType.xySeries) {
                    invalidSerieTypesNames.push(input.getDisplayName());
                }
                _this.addCalculationInputData(calculationData);
            });
            if (invalidSerieTypesNames.length > 0) {
                this.addErrorByType(ErrorMessageType.InvalidInputType, invalidSerieTypesNames);
            }
        };
        /**
         * Hook for preparing the calculation input data.
         *
         * @protected
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.prepareCalculationData = function () { };
        /**
         * Hook for verifying calculation input data.
         * Performs basic verification as default.
         *
         * @protected
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.verifyCalculationInputData = function () {
            var _this = this;
            this.getCalculationInputDataContainer().forEach(function (calculationInputData) {
                if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(calculationInputData.data)) { //calculationInputData is a signal
                    if (!calculatorHelper_1.CalculatorHelper.isSignalLongerThanMinimum(calculationInputData.data)) {
                        _this.addErrorByType(ErrorMessageType.MissingOrInvalidInput, [calculationInputData.name]);
                    }
                    else if (calculatorHelper_1.CalculatorHelper.containsNaNOrInfinityInYvalue(calculationInputData.data)) {
                        _this.addErrorByType(ErrorMessageType.ContainsNaNOrInfinity, [calculationInputData.name]);
                    }
                }
                if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(calculationInputData.data)) { //calculationInputData is a number
                    if (Number.isNaN(calculationInputData.data)) { //NaN means no data provided 
                        _this.addErrorByType(ErrorMessageType.MissingOrInvalidInput, [calculationInputData.name]);
                    }
                    else if (!calculatorHelper_1.CalculatorHelper.isValidNumber(calculationInputData.data)) {
                        _this.addErrorByType(ErrorMessageType.ContainsNaNOrInfinity, [calculationInputData.name]);
                    }
                }
                if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsString(calculationInputData.data)) {
                    if (calculationInputData.data === "") {
                        _this.addErrorByType(ErrorMessageType.MissingOrInvalidInput, [calculationInputData.name]);
                    }
                }
            });
        };
        /**
         * Hook for executing the algorithm/calculation.
         *
         * @protected
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.executeAlgorithm = function () { };
        /**
         * Hook for verifying the calculation result.
         * Performs basic verfication as default.
         *
         * @protected
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.verifyCalculationOutputData = function () {
            var _this = this;
            this.getCalculationOutputDataContainer().forEach(function (calculationOutputData) {
                if (!calculatorHelper_1.CalculatorHelper.isSignalLongerThanMinimum(calculationOutputData.data)) {
                    _this.addErrorByType(ErrorMessageType.InvalidOutput, [calculationOutputData.name]);
                }
                else if (calculatorHelper_1.CalculatorHelper.containsNaNOrInfinityInYvalue(calculationOutputData.data)) {
                    _this.addErrorByType(ErrorMessageType.ContainsNaNOrInfinity, [calculationOutputData.name]);
                }
            });
        };
        /**
         * Generates output data of the calculator based on the data in the calculationOutputDataContainer.
         *
         * @private
         * @returns {Array<CalculationDataPoints>}
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.generateOutputData = function () {
            var outputData = new Array();
            var calculationOutputDataContainer = this.getCalculationOutputDataContainer();
            calculationOutputDataContainer.forEach(function (calculationOutputData) {
                outputData.push(new calculationDataPoints_1.CalculationDataPoints(calculationOutputData.name, calculationOutputData.value, calculationOutputData.data));
            });
            if (calculationOutputDataContainer.length == 0) {
                outputData = this.getDefaultOutputData();
            }
            return outputData;
        };
        /**
         * Returns the calculation data used by the algorithm of the calculator after all preparations done.
         *
         * @returns {(Array<TCalculationData>)}
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.getActualInputData = function () {
            var inputData = this.getDefaultInputData();
            var calculationData = this.getCalculationInputDataContainer();
            for (var i = 0; i < inputData.length && i < calculationData.length; i++) {
                inputData[i].setData(calculationData[i].data);
            }
            return inputData;
        };
        return CalculatorBase;
    }());
    exports.CalculatorBase = CalculatorBase;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsY3VsYXRvckJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9jb21tb24vY2FsY3VsYXRvclByb3ZpZGVyL2NhbGN1bGF0b3JzL2NhbGN1bGF0b3JCYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQU9BLElBQUssZ0JBV0o7SUFYRCxXQUFLLGdCQUFnQjtRQUNqQix5RkFBcUIsQ0FBQTtRQUNyQix5RUFBYSxDQUFBO1FBQ2IsK0VBQWdCLENBQUE7UUFDaEIsaUdBQXlCLENBQUE7UUFDekIseUZBQXFCLENBQUE7UUFDckIseUZBQXFCLENBQUE7UUFDckIsNkZBQXVCLENBQUE7UUFDdkIsK0ZBQXdCLENBQUE7UUFDeEIseUVBQWEsQ0FBQTtRQUNiLCtIQUF3QyxDQUFBO0lBQzVDLENBQUMsRUFYSSxnQkFBZ0IsS0FBaEIsZ0JBQWdCLFFBV3BCO0lBcWN1Qiw0Q0FBZ0I7SUFBc0IsMkNBQWU7SUF6YjdFOzs7OztPQUtHO0lBQ0g7UUF5Qkk7Ozs7Ozs7V0FPRztRQUNILHdCQUFzQixFQUFVLEVBQUUsV0FBbUIsRUFBRSxXQUFtQjtZQTFCbEUsY0FBUyxHQUFrQixJQUFJLEtBQUssRUFBVSxDQUFDO1lBRS9DLGtDQUE2QixHQUFnQyxJQUFJLEtBQUssRUFBd0IsQ0FBQztZQUUvRixtQ0FBOEIsR0FBaUMsSUFBSSxLQUFLLEVBQXlCLENBQUM7WUF1QnRHLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1lBQ2QsSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUM7WUFDaEMsSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUM7UUFDcEMsQ0FBQztRQXhCRCxzQkFBVyw4QkFBRTtpQkFBYjtnQkFDSSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7WUFDcEIsQ0FBQzs7O1dBQUE7UUFFRCxzQkFBVyx1Q0FBVztpQkFBdEI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsWUFB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UyxDQUFDLE1BQU0sSUFBSSxDQUFDLEdBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDL0QsU0FBUyxDQUFDLENBQUMsQ0FBcUIsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3RFO1lBRUQsT0FBTyxTQUFTLENBQUM7UUFDckIsQ0FBQztRQUVMLHFCQUFDO0lBQUQsQ0FBQyxBQWpiRCxJQWliQztJQUVPLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhUG9pbnRzIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YVBvaW50c1wiO1xyXG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9wb2ludEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJQ2FsY3VsYXRvciB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2NhbGN1bGF0b3JJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU2VyaWVzVHlwZSB9IGZyb20gXCIuLi8uLi8uLi9jaGFydE1hbmFnZXJEYXRhTW9kZWwvc2VyaWVzVHlwZVwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdG9ySGVscGVyIH0gZnJvbSBcIi4vY2FsY3VsYXRvckhlbHBlclwiO1xyXG5pbXBvcnQgeyBUQ2FsY3VsYXRpb25EYXRhLCBDYWxjdWxhdGlvbkRhdGEgfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhXCI7XHJcblxyXG5lbnVtIEVycm9yTWVzc2FnZVR5cGUge1xyXG4gICAgTWlzc2luZ09ySW52YWxpZElucHV0LFxyXG4gICAgSW52YWxpZE91dHB1dCxcclxuICAgIEludmFsaWRJbnB1dFR5cGUsXHJcbiAgICBOb3RFbm91Z2hDb21tb25UaW1lc3RhbXBzLFxyXG4gICAgQ29udGFpbnNOYU5PckluZmluaXR5LFxyXG4gICAgQ29udGFpbnNaZXJvSW5ZVmFsdWVzLFxyXG4gICAgQ29udGFpbnNGbG9hdGluZ051bWJlcnMsXHJcbiAgICBOdW1iZXJOb3RBbGxvd2VkVG9CZVplcm8sXHJcbiAgICBOdW1iZXJJc05vSW50LFxyXG4gICAgTm90U3RyaWN0bHlNb25vdG9uaWNhbGx5SW5jcmVhc2luZ0luVGltZVxyXG59XHJcblxyXG50eXBlIENhbGN1bGF0aW9uSW5wdXREYXRhID0ge1xyXG4gICAgZGF0YTogbnVtYmVyIHwgc3RyaW5nIHwgQXJyYXk8SVBvaW50PixcclxuICAgIG5hbWU6IHN0cmluZ1xyXG59XHJcbnR5cGUgQ2FsY3VsYXRpb25PdXRwdXREYXRhID0ge1xyXG4gICAgZGF0YTogQXJyYXk8SVBvaW50PixcclxuICAgIHZhbHVlOiBzdHJpbmcsXHJcbiAgICBuYW1lOiBzdHJpbmdcclxufVxyXG5cclxuLyoqXHJcbiAqIEJhc2UgY2xhc3MgZm9yIGFsbCBjYWxjdWxhdG9yc1xyXG4gKlxyXG4gKiBAY2xhc3MgQ2FsY3VsYXRvckJhc2VcclxuICogQGltcGxlbWVudHMge0lDYWxjdWxhdG9yfVxyXG4gKi9cclxuY2xhc3MgQ2FsY3VsYXRvckJhc2UgaW1wbGVtZW50cyBJQ2FsY3VsYXRvcntcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfaWQ6IHN0cmluZztcclxuICAgIHByaXZhdGUgX2Rpc3BsYXlOYW1lOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF9kZXNjcmlwdGlvbjogc3RyaW5nO1xyXG5cclxuXHJcbiAgICBwcml2YXRlIGVycm9yTGlzdDogQXJyYXk8c3RyaW5nPiA9IG5ldyBBcnJheTxzdHJpbmc+KCk7XHJcblxyXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lcjogQXJyYXk8Q2FsY3VsYXRpb25JbnB1dERhdGE+ID0gbmV3IEFycmF5PENhbGN1bGF0aW9uSW5wdXREYXRhPigpO1xyXG5cclxuICAgIHByaXZhdGUgY2FsY3VsYXRpb25PdXRwdXREYXRhQ29udGFpbmVyOiBBcnJheTxDYWxjdWxhdGlvbk91dHB1dERhdGE+ID0gbmV3IEFycmF5PENhbGN1bGF0aW9uT3V0cHV0RGF0YT4oKTtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IGlkKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgZGlzcGxheU5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGlzcGxheU5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBkZXNjcmlwdGlvbigpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kZXNjcmlwdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQ2FsY3VsYXRvckJhc2UuXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRpc3BsYXlOYW1lXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGVzY3JpcHRpb25cclxuICAgICAqIEBtZW1iZXJvZiBDYWxjdWxhdG9yQmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3IoaWQ6IHN0cmluZywgZGlzcGxheU5hbWU6IHN0cmluZywgZGVzY3JpcHRpb246IHN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5faWQgPSBpZDtcclxuICAgICAgICB0aGlzLl9kaXNwbGF5TmFtZSA9IGRpc3BsYXlOYW1lO1xyXG4gICAgICAgIHRoaXMuX2Rlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XHJcbiAgICB9XHJcblxyXG4gXHJcbiAgICAvKipcclxuICAgICAqIEVtcHRpZXMgdGhlIGVycm9yIGxpc3QuXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0b3JCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBjbGVhckVycm9ycygpIHtcclxuICAgICAgICB0aGlzLmVycm9yTGlzdCA9IG5ldyBBcnJheTxzdHJpbmc+KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGFuIGVycm9yIHRvIHRoZSBlcnJvcmxpc3QuXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGVycm9yTWVzc2FnZVxyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0b3JCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBhZGRFcnJvcihlcnJvck1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuZXJyb3JMaXN0LnB1c2goZXJyb3JNZXNzYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGVycm9yIGxpc3QuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0FycmF5PHN0cmluZz59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRvckJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEVycm9ycygpOiBBcnJheTxzdHJpbmc+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lcnJvckxpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGlmIHRoZSBlcnJvciBsaXN0IGhhcyBlbnRyaWVzLlxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0b3JCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBoYXNFcnJvcnMoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZXJyb3JMaXN0Lmxlbmd0aCA+IDA7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRW1wdGllcyB0aGUgY2FsY3VsYXRpb24gaW5wdXQgZGF0YSBjb250YWluZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0b3JCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBjbGVhckNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyKCkge1xyXG4gICAgICAgIHRoaXMuY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXIgPSBuZXcgQXJyYXk8Q2FsY3VsYXRpb25JbnB1dERhdGE+KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGNhbGN1bGF0aW9uIGlucHV0IGRhdGEgKGRhdGEgdG8gYmUgY2FsY3VsYXRlZCkgdG8gdGhlIGNhbGN1bGF0aW9uIGlucHV0IGRhdGEgY29udGFpbmVyLlxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBwYXJhbSB7Q2FsY3VsYXRpb25JbnB1dERhdGF9IGNhbGN1bGF0aW9uRGF0YVxyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0b3JCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBhZGRDYWxjdWxhdGlvbklucHV0RGF0YShjYWxjdWxhdGlvbkRhdGE6IENhbGN1bGF0aW9uSW5wdXREYXRhKSB7XHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lci5wdXNoKGNhbGN1bGF0aW9uRGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBjYWxjdWxhdGlvbiBpbnB1dCBkYXRhIGNvbnRhaW5lciAoZGF0YSB0byBiZSBjYWxjdWxhdGVkKS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8Q2FsY3VsYXRpb25JbnB1dERhdGE+fVxyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0b3JCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXRDYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lcigpOiBBcnJheTxDYWxjdWxhdGlvbklucHV0RGF0YT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEVtcHRpZXMgdGhlIGNhbGN1bGF0aW9uIG91dHB1dCBkYXRhIGNvbnRhaW5lci5cclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRvckJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGNsZWFyQ2FsY3VsYXRpb25PdXRwdXREYXRhQ29udGFpbmVyKCkge1xyXG4gICAgICAgIHRoaXMuY2FsY3VsYXRpb25PdXRwdXREYXRhQ29udGFpbmVyID0gbmV3IEFycmF5PENhbGN1bGF0aW9uT3V0cHV0RGF0YT4oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgY2FsY3VsYXRpb24gb3V0cHV0IGRhdGEgKGRhdGEgcmVzdWx0aW5nIGZyb20gY2FsY3VsYXRpb24pIHRvIHRoZXIgY2FsY3VsYXRpb24gb3V0cHV0IGRhdGEgY29udGFpbmVyLlxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBwYXJhbSB7Q2FsY3VsYXRpb25PdXRwdXREYXRhfSBjYWxjdWxhdGlvbk91dHB1dERhdGFcclxuICAgICAqIEBtZW1iZXJvZiBDYWxjdWxhdG9yQmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgYWRkQ2FsY3VsYXRpb25PdXRwdXREYXRhKGNhbGN1bGF0aW9uT3V0cHV0RGF0YTogQ2FsY3VsYXRpb25PdXRwdXREYXRhKSB7XHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdGlvbk91dHB1dERhdGFDb250YWluZXIucHVzaChjYWxjdWxhdGlvbk91dHB1dERhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgY29udGFpbmVyIGhvbGRpbmcgdGhlIGNhbGN1bGF0aW9uIG91dHB1dCBkYXRhIChkYXRhIHJlc3VsdGluZyBmcm9tIGNhbGN1bGF0aW9uKS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8Q2FsY3VsYXRpb25PdXRwdXREYXRhPn1cclxuICAgICAqIEBtZW1iZXJvZiBDYWxjdWxhdG9yQmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0Q2FsY3VsYXRpb25PdXRwdXREYXRhQ29udGFpbmVyKCk6IEFycmF5PENhbGN1bGF0aW9uT3V0cHV0RGF0YT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNhbGN1bGF0aW9uT3V0cHV0RGF0YUNvbnRhaW5lcjtcclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhbiBlcnJvciB0byB0aGUgZXJyb3JsaXN0IG9mIHRoZSBjYWxjdWxhdG9yLlxyXG4gICAgICogR2VuZXJhdGVzIHRoZSBlcnJvciBtZXNzYWdlIGJhc2VkIG9uIGVycm9yIHR5cGUuXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHBhcmFtIHtFcnJvck1lc3NhZ2VUeXBlfSBlcnJvck1lc3NhZ2VUeXBlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PHN0cmluZz59IGVycm9yTWVzc2FnZURhdGFcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRvckJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGFkZEVycm9yQnlUeXBlKGVycm9yTWVzc2FnZVR5cGU6IEVycm9yTWVzc2FnZVR5cGUsIGVycm9yTWVzc2FnZURhdGE6IEFycmF5PHN0cmluZz4pe1xyXG5cclxuICAgICAgICBpZighKGVycm9yTWVzc2FnZURhdGEubGVuZ3RoID4gMCkpIHsgLy8gbG9nIHRvIGNvbnNvbGUgaWYgbm8gZXJyb3JNZXNzYWdlRGF0YSBpcyBwcm92aWRlZFxyXG5cclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yTWVzc2FnZURhdGEgaXMgbWlzc2luZyFcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBlcnJvck1lc3NhZ2UgPSBcIlwiO1xyXG4gICAgICAgIGxldCBqb2luZWRFcnJvck1lc3NhZ2VEYXRhID0gZXJyb3JNZXNzYWdlRGF0YS5qb2luKFwiLCBcIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgc3dpdGNoIChlcnJvck1lc3NhZ2VUeXBlKSB7IC8vIGdlbmVyYXRlIGVycm9yIG1lc3NhZ2UgYWNjb3JkaW5nIHRvIGVycnJvciB0eXBlXHJcblxyXG4gICAgICAgICAgICBjYXNlIEVycm9yTWVzc2FnZVR5cGUuTWlzc2luZ09ySW52YWxpZElucHV0OlxyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gXCJDYWxjdWxhdGlvbiBFcnJvcjogRGF0YSBmb3IgJ1wiICsgam9pbmVkRXJyb3JNZXNzYWdlRGF0YSArIFwiJyBpcyBtaXNzaW5nIG9yIGludmFsaWQhXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBFcnJvck1lc3NhZ2VUeXBlLkludmFsaWRPdXRwdXQ6XHJcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UgPSBcIkNhbGN1bGF0aW9uIEVycm9yOiBPdXRwdXQgZGF0YSBmb3IgJ1wiICsgam9pbmVkRXJyb3JNZXNzYWdlRGF0YSArIFwiJyBpcyBpbnZhbGlkIVwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgRXJyb3JNZXNzYWdlVHlwZS5JbnZhbGlkSW5wdXRUeXBlOlxyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gXCJDYWxjdWxhdGlvbiBFcnJvcjogSW5wdXQgc2lnbmFsIHR5cGUgZm9yICdcIiArIGpvaW5lZEVycm9yTWVzc2FnZURhdGEgKyBcIicgaXMgbm90IHN1cHBvcnRlZCEgUGxlYXNlIHVzZSBpbnB1dCBzaWduYWwgb2YgdHlwZSBZVC5cIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEVycm9yTWVzc2FnZVR5cGUuTm90RW5vdWdoQ29tbW9uVGltZXN0YW1wczpcclxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZSA9IFwiQ2FsY3VsYXRpb24gRXJyb3I6IFRoZSBpbnB1dHMgJ1wiICsgam9pbmVkRXJyb3JNZXNzYWdlRGF0YSArIFwiJyBkbyBub3Qgc2hhcmUgZW5vdWdoIGNvbW1vbiB0aW1lc3RhbXBzIVwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgRXJyb3JNZXNzYWdlVHlwZS5Db250YWluc05hTk9ySW5maW5pdHk6XHJcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UgPSBcIkNhbGN1bGF0aW9uIEVycm9yOiBEYXRhIGZvciAnXCIgKyBqb2luZWRFcnJvck1lc3NhZ2VEYXRhICsgXCInIGRvZXMgY29udGFpbiBOYU4gb3IgSW5maW5pdHkhXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBFcnJvck1lc3NhZ2VUeXBlLkNvbnRhaW5zWmVyb0luWVZhbHVlczpcclxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZSA9IFwiQ2FsY3VsYXRpb24gRXJyb3I6IERhdGEgZm9yICdcIiArIGpvaW5lZEVycm9yTWVzc2FnZURhdGEgKyBcIicgZG9lcyBjb250YWluIDAgaW4gdGhlIHkgdmFsdWVzIVwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgRXJyb3JNZXNzYWdlVHlwZS5Db250YWluc0Zsb2F0aW5nTnVtYmVyczpcclxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZSA9IFwiQ2FsY3VsYXRpb24gRXJyb3I6IERhdGEgZm9yICdcIiArIGpvaW5lZEVycm9yTWVzc2FnZURhdGEgKyBcIicgZG9lcyBjb250YWluIGZsb2F0aW5nIHBvaW50IG51bWJlcnMgaW4gdGhlIHkgdmFsdWVzIVwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgRXJyb3JNZXNzYWdlVHlwZS5OdW1iZXJOb3RBbGxvd2VkVG9CZVplcm86XHJcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UgPSBcIkNhbGN1bGF0aW9uIEVycm9yOiBEYXRhIGZvciAnXCIgKyBqb2luZWRFcnJvck1lc3NhZ2VEYXRhICsgXCInIGlzIG5vdCBhbGxvd2VkIHRvIGJlIDAhXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBFcnJvck1lc3NhZ2VUeXBlLk51bWJlcklzTm9JbnQ6XHJcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UgPSBcIkNhbGN1bGF0aW9uIEVycm9yOiBEYXRhIGZvciAnXCIgKyBqb2luZWRFcnJvck1lc3NhZ2VEYXRhICsgXCInIGlzIG5vdCBhbGxvd2VkIHRvIGJlIGEgZmxvYXRpbmcgcG9pbnQgbnVtYmVyIVwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgRXJyb3JNZXNzYWdlVHlwZS5Ob3RTdHJpY3RseU1vbm90b25pY2FsbHlJbmNyZWFzaW5nSW5UaW1lOlxyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gXCJDYWxjdWxhdGlvbiBFcnJvcjogRGF0YSBmb3IgJ1wiICsgam9pbmVkRXJyb3JNZXNzYWdlRGF0YSArIFwiJyBpcyBub3Qgc3RyaWN0bHkgbW9ub3RvbmljYWxseSBpbmNyZWFzaW5nIGluIHRpbWUhXCJcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gXCJDYWxjdWxhdGlvbiBFcnJvcjogQ2FsY3VsYXRpb24gb2YgJ1wiKyBqb2luZWRFcnJvck1lc3NhZ2VEYXRhICtcIicgZmFpbGVkISBVbmtub3duIHJlYXNvbiFcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5lcnJvckxpc3QucHVzaChlcnJvck1lc3NhZ2UpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhvb2sgdG8gcHJvdmlkZSB0aGUgZGVmYXVsdCBpbnB1dCBkYXRhXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyhBcnJheTxUQ2FsY3VsYXRpb25EYXRhPil9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRvckJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldERlZmF1bHRJbnB1dERhdGEoKTogQXJyYXk8VENhbGN1bGF0aW9uRGF0YT4ge1xyXG5cclxuICAgICAgICBsZXQgZGVmYXVsdElucHV0RGF0YSA9IG5ldyBBcnJheTxUQ2FsY3VsYXRpb25EYXRhPigpO1xyXG4gICAgICAgIHJldHVybiBkZWZhdWx0SW5wdXREYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSG9vayB0byBwcm92aWRlIHRoZSBkZWZhdWx0IG91dHB1dCBkYXRhXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0FycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRvckJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldERlZmF1bHRPdXRwdXREYXRhKCk6IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz57XHJcblxyXG4gICAgICAgIGxldCBkZWZhdWx0T3V0cHV0RGF0YSA9IG5ldyBBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+KCk7XHJcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRPdXRwdXREYXRhO1xyXG4gICAgfVxyXG4gICAgICAgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSdW5zIHRoZSBzdGVwcyBuZWNlc3NhcnkgdG8gcGVyZm9ybSB0aGUgY2FsY3VsYXRpb24gb2YgdGhlIGNhbGN1bGF0b3IuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsoQXJyYXk8VENhbGN1bGF0aW9uRGF0YT4pfSBpbnB1dERhdGFcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+fVxyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0b3JCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjYWxjdWxhdGUoaW5wdXREYXRhOiBBcnJheTxUQ2FsY3VsYXRpb25EYXRhPik6IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz4ge1xyXG5cclxuICAgICAgICB0aGlzLmNsZWFyRXJyb3JzKCk7XHJcbiAgICAgICAgdGhpcy5jbGVhckNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyKCk7XHJcbiAgICAgICAgdGhpcy5jbGVhckNhbGN1bGF0aW9uT3V0cHV0RGF0YUNvbnRhaW5lcigpO1xyXG5cclxuICAgICAgICB0aGlzLmV4dHJhY3RDYWxjdWxhdGlvbkRhdGEoaW5wdXREYXRhKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5oYXNFcnJvcnMoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXREZWZhdWx0T3V0cHV0RGF0YSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5wcmVwYXJlQ2FsY3VsYXRpb25EYXRhKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5oYXNFcnJvcnMoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXREZWZhdWx0T3V0cHV0RGF0YSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy52ZXJpZnlDYWxjdWxhdGlvbklucHV0RGF0YSgpO1xyXG5cclxuICAgICAgICBpZih0aGlzLmhhc0Vycm9ycygpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldERlZmF1bHRPdXRwdXREYXRhKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmV4ZWN1dGVBbGdvcml0aG0oKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5oYXNFcnJvcnMoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXREZWZhdWx0T3V0cHV0RGF0YSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy52ZXJpZnlDYWxjdWxhdGlvbk91dHB1dERhdGEoKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5oYXNFcnJvcnMoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXREZWZhdWx0T3V0cHV0RGF0YSgpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGxldCBvdXRwdXREYXRhOiBBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+ID0gdGhpcy5nZW5lcmF0ZU91dHB1dERhdGEoKTtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gb3V0cHV0RGF0YTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFeHRyYWN0cyB0aGUgY2FsY3VsYXRpb24gaW5wdXQgZGF0YSBmcm9tIHRoZSBjYWxjdWxhdG9yIGlucHV0LlxyXG4gICAgICogQ2hlY2tzIGlmIGlucHV0IGlzIG5vdCBvZiB0eXBlIFhZIG9yIEZGVC5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsoQXJyYXk8VENhbGN1bGF0aW9uRGF0YT4pfSBpbnB1dERhdGFcclxuICAgICAqIEBtZW1iZXJvZiBDYWxjdWxhdG9yQmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGV4dHJhY3RDYWxjdWxhdGlvbkRhdGEoaW5wdXREYXRhOiBBcnJheTxUQ2FsY3VsYXRpb25EYXRhPikge1xyXG5cclxuICAgICAgICBsZXQgaW52YWxpZFNlcmllVHlwZXNOYW1lczogQXJyYXk8c3RyaW5nPiA9IG5ldyBBcnJheTxzdHJpbmc+KCk7XHJcblxyXG4gICAgICAgIGlucHV0RGF0YS5mb3JFYWNoKChpbnB1dCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY2FsY3VsYXRpb25EYXRhID0ge1xyXG4gICAgICAgICAgICAgICBkYXRhOiBpbnB1dC5nZXREYXRhKCksXHJcbiAgICAgICAgICAgICAgIG5hbWU6IGlucHV0LmdldERpc3BsYXlOYW1lKClcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGlmKGlucHV0LnR5cGUgPT0gU2VyaWVzVHlwZS5mZnRTZXJpZXMgfHwgaW5wdXQudHlwZSA9PSBTZXJpZXNUeXBlLnh5U2VyaWVzKSB7XHJcbiAgICAgICAgICAgICAgICBpbnZhbGlkU2VyaWVUeXBlc05hbWVzLnB1c2goaW5wdXQuZ2V0RGlzcGxheU5hbWUoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2FsY3VsYXRpb25JbnB1dERhdGEoY2FsY3VsYXRpb25EYXRhKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYoaW52YWxpZFNlcmllVHlwZXNOYW1lcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JCeVR5cGUoRXJyb3JNZXNzYWdlVHlwZS5JbnZhbGlkSW5wdXRUeXBlLCBpbnZhbGlkU2VyaWVUeXBlc05hbWVzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSG9vayBmb3IgcHJlcGFyaW5nIHRoZSBjYWxjdWxhdGlvbiBpbnB1dCBkYXRhLlxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBtZW1iZXJvZiBDYWxjdWxhdG9yQmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgIHByZXBhcmVDYWxjdWxhdGlvbkRhdGEoKSB7fVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhvb2sgZm9yIHZlcmlmeWluZyBjYWxjdWxhdGlvbiBpbnB1dCBkYXRhLlxyXG4gICAgICogUGVyZm9ybXMgYmFzaWMgdmVyaWZpY2F0aW9uIGFzIGRlZmF1bHQuXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0b3JCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCB2ZXJpZnlDYWxjdWxhdGlvbklucHV0RGF0YSgpe1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5nZXRDYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lcigpLmZvckVhY2goKGNhbGN1bGF0aW9uSW5wdXREYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNTaWduYWwoY2FsY3VsYXRpb25JbnB1dERhdGEuZGF0YSkpIHsgLy9jYWxjdWxhdGlvbklucHV0RGF0YSBpcyBhIHNpZ25hbFxyXG4gICAgICAgICAgICAgICAgaWYoIUNhbGN1bGF0b3JIZWxwZXIuaXNTaWduYWxMb25nZXJUaGFuTWluaW11bShjYWxjdWxhdGlvbklucHV0RGF0YS5kYXRhKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEVycm9yQnlUeXBlKEVycm9yTWVzc2FnZVR5cGUuTWlzc2luZ09ySW52YWxpZElucHV0LCBbY2FsY3VsYXRpb25JbnB1dERhdGEubmFtZV0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKENhbGN1bGF0b3JIZWxwZXIuY29udGFpbnNOYU5PckluZmluaXR5SW5ZdmFsdWUoY2FsY3VsYXRpb25JbnB1dERhdGEuZGF0YSkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRFcnJvckJ5VHlwZShFcnJvck1lc3NhZ2VUeXBlLkNvbnRhaW5zTmFOT3JJbmZpbml0eSwgW2NhbGN1bGF0aW9uSW5wdXREYXRhLm5hbWVdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNOdW1iZXIoY2FsY3VsYXRpb25JbnB1dERhdGEuZGF0YSkpeyAvL2NhbGN1bGF0aW9uSW5wdXREYXRhIGlzIGEgbnVtYmVyXHJcbiAgICAgICAgICAgICAgICBpZihOdW1iZXIuaXNOYU4oY2FsY3VsYXRpb25JbnB1dERhdGEuZGF0YSkpeyAvL05hTiBtZWFucyBubyBkYXRhIHByb3ZpZGVkIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JCeVR5cGUoRXJyb3JNZXNzYWdlVHlwZS5NaXNzaW5nT3JJbnZhbGlkSW5wdXQsIFtjYWxjdWxhdGlvbklucHV0RGF0YS5uYW1lXSk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZighQ2FsY3VsYXRvckhlbHBlci5pc1ZhbGlkTnVtYmVyKGNhbGN1bGF0aW9uSW5wdXREYXRhLmRhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRFcnJvckJ5VHlwZShFcnJvck1lc3NhZ2VUeXBlLkNvbnRhaW5zTmFOT3JJbmZpbml0eSwgW2NhbGN1bGF0aW9uSW5wdXREYXRhLm5hbWVdKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKENhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc1N0cmluZyhjYWxjdWxhdGlvbklucHV0RGF0YS5kYXRhKSl7XHJcbiAgICAgICAgICAgICAgICBpZihjYWxjdWxhdGlvbklucHV0RGF0YS5kYXRhID09PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRFcnJvckJ5VHlwZShFcnJvck1lc3NhZ2VUeXBlLk1pc3NpbmdPckludmFsaWRJbnB1dCwgW2NhbGN1bGF0aW9uSW5wdXREYXRhLm5hbWVdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhvb2sgZm9yIGV4ZWN1dGluZyB0aGUgYWxnb3JpdGhtL2NhbGN1bGF0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBtZW1iZXJvZiBDYWxjdWxhdG9yQmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgIGV4ZWN1dGVBbGdvcml0aG0oKSB7fVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhvb2sgZm9yIHZlcmlmeWluZyB0aGUgY2FsY3VsYXRpb24gcmVzdWx0LlxyXG4gICAgICogUGVyZm9ybXMgYmFzaWMgdmVyZmljYXRpb24gYXMgZGVmYXVsdC5cclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRvckJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHZlcmlmeUNhbGN1bGF0aW9uT3V0cHV0RGF0YSgpe1xyXG5cclxuICAgICAgICB0aGlzLmdldENhbGN1bGF0aW9uT3V0cHV0RGF0YUNvbnRhaW5lcigpLmZvckVhY2goKGNhbGN1bGF0aW9uT3V0cHV0RGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYoIUNhbGN1bGF0b3JIZWxwZXIuaXNTaWduYWxMb25nZXJUaGFuTWluaW11bShjYWxjdWxhdGlvbk91dHB1dERhdGEuZGF0YSkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEVycm9yQnlUeXBlKEVycm9yTWVzc2FnZVR5cGUuSW52YWxpZE91dHB1dCwgW2NhbGN1bGF0aW9uT3V0cHV0RGF0YS5uYW1lXSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZihDYWxjdWxhdG9ySGVscGVyLmNvbnRhaW5zTmFOT3JJbmZpbml0eUluWXZhbHVlKGNhbGN1bGF0aW9uT3V0cHV0RGF0YS5kYXRhKSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JCeVR5cGUoRXJyb3JNZXNzYWdlVHlwZS5Db250YWluc05hTk9ySW5maW5pdHksIFtjYWxjdWxhdGlvbk91dHB1dERhdGEubmFtZV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZW5lcmF0ZXMgb3V0cHV0IGRhdGEgb2YgdGhlIGNhbGN1bGF0b3IgYmFzZWQgb24gdGhlIGRhdGEgaW4gdGhlIGNhbGN1bGF0aW9uT3V0cHV0RGF0YUNvbnRhaW5lci5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge0FycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRvckJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZW5lcmF0ZU91dHB1dERhdGEoKTogQXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPiB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IG91dHB1dERhdGEgPSBuZXcgQXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPigpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBjYWxjdWxhdGlvbk91dHB1dERhdGFDb250YWluZXIgPSB0aGlzLmdldENhbGN1bGF0aW9uT3V0cHV0RGF0YUNvbnRhaW5lcigpXHJcbiAgICAgICAgXHJcbiAgICAgICAgY2FsY3VsYXRpb25PdXRwdXREYXRhQ29udGFpbmVyLmZvckVhY2goKGNhbGN1bGF0aW9uT3V0cHV0RGF0YSk9PntcclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBvdXRwdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YVBvaW50cyhjYWxjdWxhdGlvbk91dHB1dERhdGEubmFtZSwgY2FsY3VsYXRpb25PdXRwdXREYXRhLnZhbHVlLCBjYWxjdWxhdGlvbk91dHB1dERhdGEuZGF0YSkpOyBcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYoY2FsY3VsYXRpb25PdXRwdXREYXRhQ29udGFpbmVyLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIG91dHB1dERhdGEgPSB0aGlzLmdldERlZmF1bHRPdXRwdXREYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBvdXRwdXREYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgY2FsY3VsYXRpb24gZGF0YSB1c2VkIGJ5IHRoZSBhbGdvcml0aG0gb2YgdGhlIGNhbGN1bGF0b3IgYWZ0ZXIgYWxsIHByZXBhcmF0aW9ucyBkb25lLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsoQXJyYXk8VENhbGN1bGF0aW9uRGF0YT4pfVxyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0b3JCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRBY3R1YWxJbnB1dERhdGEoKTogQXJyYXk8VENhbGN1bGF0aW9uRGF0YT4ge1xyXG4gICAgICAgIGxldCBpbnB1dERhdGEgPSB0aGlzLmdldERlZmF1bHRJbnB1dERhdGEoKTtcclxuICAgICAgICBsZXQgY2FsY3VsYXRpb25EYXRhID0gdGhpcy5nZXRDYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lcigpO1xyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpPGlucHV0RGF0YS5sZW5ndGggJiYgaTxjYWxjdWxhdGlvbkRhdGEubGVuZ3RoOyBpKyspIHsgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgKGlucHV0RGF0YVtpXSBhcyBDYWxjdWxhdGlvbkRhdGEpLnNldERhdGEoY2FsY3VsYXRpb25EYXRhW2ldLmRhdGEpOyAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGlucHV0RGF0YTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCB7Q2FsY3VsYXRvckJhc2UsIEVycm9yTWVzc2FnZVR5cGUsIEVycm9yTWVzc2FnZVR5cGUgYXMgRXJyb01lc3NhZ2VUeXBlfTsiXX0=