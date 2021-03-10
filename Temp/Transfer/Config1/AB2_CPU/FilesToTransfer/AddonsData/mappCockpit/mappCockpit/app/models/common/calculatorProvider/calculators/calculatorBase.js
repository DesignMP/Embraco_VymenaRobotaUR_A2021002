define(["require", "exports", "../../../../common/math/mathX"], function (require, exports, mathX_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ErroMessageType;
    (function (ErroMessageType) {
        ErroMessageType[ErroMessageType["MissingOrInvalidInput"] = 0] = "MissingOrInvalidInput";
        ErroMessageType[ErroMessageType["InvalidOutput"] = 1] = "InvalidOutput";
    })(ErroMessageType = exports.ErroMessageType || (exports.ErroMessageType = {}));
    var CalculatorBase = /** @class */ (function () {
        /**
         * Creates an instance of CalculatorBase
         * @memberof CalculatorBase
         */
        function CalculatorBase() {
            this.errorList = new Array();
        }
        /**
         * Clears all the errors of this calculator
         *
         * @protected
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.clearErrors = function () {
            this.errorList = new Array();
        };
        /**
         * Adds a new error to the error list
         *
         * @protected
         * @param {string} errorMessage
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.addError = function (errorMessage) {
            this.errorList.push(errorMessage);
        };
        /**
         * Adds a new error with the given type to the error list
         *
         * @protected
         * @param {ErroMessageType} errorMessageType
         * @param {Array<string>} errorMessageData
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.addErrorByType = function (errorMessageType, errorMessageData) {
            var errorMessage = "";
            switch (errorMessageType) {
                case ErroMessageType.MissingOrInvalidInput:
                    if (errorMessageData.length > 0) {
                        errorMessage = "Calculation Error: Data for '" + errorMessageData[0] + "' is missing or invalid!";
                    }
                    else {
                        console.error("errorMessageData is missing!");
                    }
                    break;
                case ErroMessageType.InvalidOutput:
                    if (errorMessageData.length > 0) {
                        errorMessage = "Calculation Error: Output data for '" + errorMessageData[0] + "' invalid!";
                    }
                    else {
                        console.error("errorMessageData is missing!");
                    }
                    break;
            }
            this.errorList.push(errorMessage);
        };
        CalculatorBase.prototype.setOutputType = function (input, defaultType) {
            var types = new Array();
            for (var i = 0; i < input.length; i++) {
                if (input[i].type != undefined) {
                    types.push(input[i].type);
                }
            }
            var isTypeCorrect = true;
            for (var j = 1; j < types.length; j++) {
                if (types[0] != types[j]) {
                    isTypeCorrect = false;
                    this.addError('Calculation Error: Input signals do not belong to the same type');
                }
            }
            if (isTypeCorrect && types.length > 0) {
                return types[0];
            }
            else {
                return defaultType;
            }
        };
        CalculatorBase.prototype.isInputDataValid = function (inputNumber1, inputNumber2, inputSignalData1, inputSignalData2, input1Name, input2Name) {
            //used for additon, subtraction, multiplication, max & min
            if (inputSignalData1 == undefined) {
                // check for simple value
                if (isNaN(inputNumber1)) {
                    this.addErrorByType(ErroMessageType.MissingOrInvalidInput, [input1Name]);
                }
            }
            else if (inputSignalData1.length < 2) {
                this.addErrorByType(ErroMessageType.MissingOrInvalidInput, [input1Name]);
            }
            if (inputSignalData2 == undefined) {
                // check for simple value
                if (isNaN(inputNumber2)) {
                    this.addErrorByType(ErroMessageType.MissingOrInvalidInput, [input2Name]);
                }
            }
            else if (inputSignalData2.length < 2) {
                this.addErrorByType(ErroMessageType.MissingOrInvalidInput, [input2Name]);
            }
            if (!isNaN(inputNumber1) && !isNaN(inputNumber2)) {
                // Sub of two numbers is not supported
                this.addError("Calculation Error: It is not supported to operate with just two numbers!");
            }
            if (this.getErrors().length > 0) {
                return false;
            }
            return true;
        };
        /**
         * Returns the list with all the occurred errors of this calculator
         *
         * @returns {Array<string>}
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.getErrors = function () {
            return this.errorList;
        };
        /**
         * Get sampling rate of signal data
         *  Returns the median of all sample times rounded to the next 50us (50us is todays fastest sample time)
         *
         * @protected
         * @param {Array<IPoint>} signalData
         * @returns {number}
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.estimateSampleTime = function (signalData) {
            var sampleTime = this.getMedianOfSampleTime(signalData);
            sampleTime = this.roundSampleTime(sampleTime);
            return sampleTime;
        };
        CalculatorBase.prototype.getMedianOfSampleTime = function (signalData) {
            var sampleTimes = new Array();
            for (var i = 0; i < signalData.length - 1; i++) {
                var sampleTime_1 = signalData[i + 1].x - signalData[i].x;
                sampleTimes.push(sampleTime_1);
            }
            var sampleTime = mathX_1.MathX.median(sampleTimes);
            return sampleTime;
        };
        /**
         * Round to 50us(used for valid sampling rate)
         *
         * @private
         * @param {*} sampleTime
         * @returns
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.roundSampleTime = function (sampleTime) {
            sampleTime = sampleTime * 20000;
            sampleTime = Math.round(sampleTime);
            sampleTime = sampleTime / 20000;
            return sampleTime;
        };
        /**
         * Performs optional preperation of the input data according to calculator.
         *
         * @param {(Array<CalculationDataNumber|CalculationDataPoints|CalculationDataNumberOrPoints>)} inputData
         * @returns {(Array<CalculationDataNumber|CalculationDataPoints|CalculationDataNumberOrPoints>)}
         * @memberof CalculatorBase
         */
        CalculatorBase.prototype.prepareInputData = function (inputData) {
            return inputData;
        };
        return CalculatorBase;
    }());
    exports.CalculatorBase = CalculatorBase;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsY3VsYXRvckJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9jb21tb24vY2FsY3VsYXRvclByb3ZpZGVyL2NhbGN1bGF0b3JzL2NhbGN1bGF0b3JCYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQVFBLElBQVksZUFHWDtJQUhELFdBQVksZUFBZTtRQUN2Qix1RkFBcUIsQ0FBQTtRQUNyQix1RUFBYSxDQUFBO0lBQ2pCLENBQUMsRUFIVyxlQUFlLEdBQWYsdUJBQWUsS0FBZix1QkFBZSxRQUcxQjtJQUVEO1FBR0k7OztXQUdHO1FBQ0g7WUFOUSxjQUFTLEdBQUcsSUFBSSxLQUFLLEVBQVUsQ0FBQztRQVF4QyxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDTyxvQ0FBVyxHQUFyQjtZQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxLQUFLLEVBQVUsQ0FBQztRQUN6QyxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ08saUNBQVEsR0FBbEIsVUFBbUIsWUFBb0I7WUFDbkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUE7UUFDckMsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDTyx1Q0FBYyxHQUF4QixVQUF5QixnQkFBaUMsRUFBRSxnQkFBK0I7WUFDdkYsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFBO1lBQ3JCLFFBQVEsZ0JBQWdCLEVBQUU7Z0JBQ3RCLEtBQUssZUFBZSxDQUFDLHFCQUFxQjtvQkFDdEMsSUFBSSxnQkFBZ0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO3dCQUM3QixZQUFZLEdBQUcsK0JBQStCLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEdBQUcsMEJBQTBCLENBQUM7cUJBQ3JHO3lCQUNJO3dCQUNELE9BQU8sQ0FBQyxLQUFLLENBQUMsOEJBQThCLENBQUMsQ0FBQztxQkFDakQ7b0JBQ0QsTUFBTTtnQkFFVixLQUFLLGVBQWUsQ0FBQyxhQUFhO29CQUM5QixJQUFJLGdCQUFnQixDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7d0JBQzdCLFlBQVksR0FBRyxzQ0FBc0MsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUM7cUJBQzlGO3lCQUNJO3dCQUNELE9BQU8sQ0FBQyxLQUFLLENBQUMsOEJBQThCLENBQUMsQ0FBQztxQkFDakQ7b0JBQ0QsTUFBTTthQUNiO1lBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDdEMsQ0FBQztRQUVTLHNDQUFhLEdBQXZCLFVBQXdCLEtBQThCLEVBQUUsV0FBdUI7WUFDM0UsSUFBSSxLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQWMsQ0FBQztZQUNwQyxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztnQkFDakMsSUFBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLFNBQVMsRUFBQztvQkFDMUIsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSyxDQUFDLENBQUM7aUJBQzlCO2FBQ0o7WUFDRCxJQUFJLGFBQWEsR0FBWSxJQUFJLENBQUM7WUFDbEMsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQ2pDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBQztvQkFDckIsYUFBYSxHQUFHLEtBQUssQ0FBQztvQkFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpRUFBaUUsQ0FBQyxDQUFDO2lCQUNwRjthQUNKO1lBRUQsSUFBSSxhQUFhLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ25DLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ25CO2lCQUNJO2dCQUNELE9BQU8sV0FBVyxDQUFDO2FBQ3RCO1FBRUwsQ0FBQztRQUVTLHlDQUFnQixHQUExQixVQUEyQixZQUFvQixFQUFFLFlBQW9CLEVBQUUsZ0JBQTJDLEVBQzlHLGdCQUEyQyxFQUFFLFVBQWtCLEVBQUUsVUFBa0I7WUFDbkYsMERBQTBEO1lBRTFELElBQUksZ0JBQWdCLElBQUksU0FBUyxFQUFFO2dCQUMvQix5QkFBeUI7Z0JBQ3pCLElBQUksS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFO29CQUNyQixJQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7aUJBQzVFO2FBQ0o7aUJBQ0ksSUFBSSxnQkFBZ0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUNsQyxJQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7YUFDNUU7WUFFRCxJQUFJLGdCQUFnQixJQUFJLFNBQVMsRUFBRTtnQkFDL0IseUJBQXlCO2dCQUN6QixJQUFJLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRTtvQkFDckIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2lCQUM1RTthQUNKO2lCQUNJLElBQUksZ0JBQWdCLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDbEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2FBQzVFO1lBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRTtnQkFDOUMsc0NBQXNDO2dCQUN0QyxJQUFJLENBQUMsUUFBUSxDQUFDLDBFQUEwRSxDQUFDLENBQUM7YUFDN0Y7WUFFRCxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUM3QixPQUFPLEtBQUssQ0FBQzthQUNoQjtZQUVELE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNILGtDQUFTLEdBQVQ7WUFDSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDMUIsQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ08sMkNBQWtCLEdBQTVCLFVBQTZCLFVBQXlCO1lBQ2xELElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN4RCxVQUFVLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM5QyxPQUFPLFVBQVUsQ0FBQztRQUN0QixDQUFDO1FBR08sOENBQXFCLEdBQTdCLFVBQThCLFVBQXlCO1lBRW5ELElBQUksV0FBVyxHQUFrQixJQUFJLEtBQUssRUFBVSxDQUFDO1lBQ3JELEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxVQUFVLENBQUMsTUFBTSxHQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBQztnQkFDcEMsSUFBSSxZQUFVLEdBQUcsVUFBVSxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckQsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFVLENBQUMsQ0FBQzthQUNoQztZQUVELElBQUksVUFBVSxHQUFHLGFBQUssQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7WUFFM0MsT0FBTyxVQUFVLENBQUM7UUFDdEIsQ0FBQztRQUdEOzs7Ozs7O1dBT0c7UUFDSyx3Q0FBZSxHQUF2QixVQUF3QixVQUFtQjtZQUN2QyxVQUFVLEdBQUcsVUFBVSxHQUFDLEtBQUssQ0FBQztZQUM5QixVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNwQyxVQUFVLEdBQUcsVUFBVSxHQUFDLEtBQUssQ0FBQztZQUM5QixPQUFPLFVBQVUsQ0FBQztRQUN0QixDQUFDO1FBR0Q7Ozs7OztXQU1HO1FBQ0kseUNBQWdCLEdBQXZCLFVBQXdCLFNBQTJGO1lBRS9HLE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFFTCxxQkFBQztJQUFELENBQUMsQUEvTEQsSUErTEM7SUEvTFksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJUG9pbnQgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9wb2ludEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBNYXRoWCB9IGZyb20gXCIuLi8uLi8uLi8uLi9jb21tb24vbWF0aC9tYXRoWFwiO1xyXG5pbXBvcnQgeyBJQ2FsY3VsYXRpb25EYXRhIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvY2FsY3VsYXRpb25EYXRhSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNlcmllc1R5cGUgfSBmcm9tIFwiLi4vLi4vLi4vY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL3Nlcmllc1R5cGVcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhTnVtYmVyIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YU51bWJlclwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFQb2ludHMgfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhUG9pbnRzXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzXCI7XHJcblxyXG5leHBvcnQgZW51bSBFcnJvTWVzc2FnZVR5cGUge1xyXG4gICAgTWlzc2luZ09ySW52YWxpZElucHV0LFxyXG4gICAgSW52YWxpZE91dHB1dFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ2FsY3VsYXRvckJhc2Uge1xyXG4gICAgcHJpdmF0ZSBlcnJvckxpc3QgPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBDYWxjdWxhdG9yQmFzZVxyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0b3JCYXNlXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENsZWFycyBhbGwgdGhlIGVycm9ycyBvZiB0aGlzIGNhbGN1bGF0b3JcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRvckJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGNsZWFyRXJyb3JzKCkge1xyXG4gICAgICAgIHRoaXMuZXJyb3JMaXN0ID0gbmV3IEFycmF5PHN0cmluZz4oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBuZXcgZXJyb3IgdG8gdGhlIGVycm9yIGxpc3RcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXJyb3JNZXNzYWdlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRvckJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGFkZEVycm9yKGVycm9yTWVzc2FnZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5lcnJvckxpc3QucHVzaChlcnJvck1lc3NhZ2UpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgbmV3IGVycm9yIHdpdGggdGhlIGdpdmVuIHR5cGUgdG8gdGhlIGVycm9yIGxpc3RcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcGFyYW0ge0Vycm9NZXNzYWdlVHlwZX0gZXJyb3JNZXNzYWdlVHlwZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSBlcnJvck1lc3NhZ2VEYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRvckJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGFkZEVycm9yQnlUeXBlKGVycm9yTWVzc2FnZVR5cGU6IEVycm9NZXNzYWdlVHlwZSwgZXJyb3JNZXNzYWdlRGF0YTogQXJyYXk8c3RyaW5nPikge1xyXG4gICAgICAgIGxldCBlcnJvck1lc3NhZ2UgPSBcIlwiXHJcbiAgICAgICAgc3dpdGNoIChlcnJvck1lc3NhZ2VUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgRXJyb01lc3NhZ2VUeXBlLk1pc3NpbmdPckludmFsaWRJbnB1dDpcclxuICAgICAgICAgICAgICAgIGlmIChlcnJvck1lc3NhZ2VEYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UgPSBcIkNhbGN1bGF0aW9uIEVycm9yOiBEYXRhIGZvciAnXCIgKyBlcnJvck1lc3NhZ2VEYXRhWzBdICsgXCInIGlzIG1pc3Npbmcgb3IgaW52YWxpZCFcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvck1lc3NhZ2VEYXRhIGlzIG1pc3NpbmchXCIpO1xyXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICBjYXNlIEVycm9NZXNzYWdlVHlwZS5JbnZhbGlkT3V0cHV0OlxyXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yTWVzc2FnZURhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZSA9IFwiQ2FsY3VsYXRpb24gRXJyb3I6IE91dHB1dCBkYXRhIGZvciAnXCIgKyBlcnJvck1lc3NhZ2VEYXRhWzBdICsgXCInIGludmFsaWQhXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3JNZXNzYWdlRGF0YSBpcyBtaXNzaW5nIVwiKTtcclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmVycm9yTGlzdC5wdXNoKGVycm9yTWVzc2FnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHNldE91dHB1dFR5cGUoaW5wdXQ6IEFycmF5PElDYWxjdWxhdGlvbkRhdGE+LCBkZWZhdWx0VHlwZTogU2VyaWVzVHlwZSk6IFNlcmllc1R5cGV7XHJcbiAgICAgICAgbGV0IHR5cGVzID0gbmV3IEFycmF5PFNlcmllc1R5cGU+KCk7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGlucHV0Lmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYoaW5wdXRbaV0udHlwZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgdHlwZXMucHVzaChpbnB1dFtpXS50eXBlISk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGlzVHlwZUNvcnJlY3Q6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgICAgIGZvcihsZXQgaiA9IDE7IGogPCB0eXBlcy5sZW5ndGg7IGorKyl7XHJcbiAgICAgICAgICAgIGlmICh0eXBlc1swXSAhPSB0eXBlc1tqXSl7XHJcbiAgICAgICAgICAgICAgICBpc1R5cGVDb3JyZWN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEVycm9yKCdDYWxjdWxhdGlvbiBFcnJvcjogSW5wdXQgc2lnbmFscyBkbyBub3QgYmVsb25nIHRvIHRoZSBzYW1lIHR5cGUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZiAoaXNUeXBlQ29ycmVjdCAmJiB0eXBlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0eXBlc1swXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWZhdWx0VHlwZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpc0lucHV0RGF0YVZhbGlkKGlucHV0TnVtYmVyMTogbnVtYmVyLCBpbnB1dE51bWJlcjI6IG51bWJlciwgaW5wdXRTaWduYWxEYXRhMTogQXJyYXk8SVBvaW50PiB8IHVuZGVmaW5lZCxcclxuICAgICAgICBpbnB1dFNpZ25hbERhdGEyOiBBcnJheTxJUG9pbnQ+IHwgdW5kZWZpbmVkLCBpbnB1dDFOYW1lOiBzdHJpbmcsIGlucHV0Mk5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIC8vdXNlZCBmb3IgYWRkaXRvbiwgc3VidHJhY3Rpb24sIG11bHRpcGxpY2F0aW9uLCBtYXggJiBtaW5cclxuXHJcbiAgICAgICAgaWYgKGlucHV0U2lnbmFsRGF0YTEgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIC8vIGNoZWNrIGZvciBzaW1wbGUgdmFsdWVcclxuICAgICAgICAgICAgaWYgKGlzTmFOKGlucHV0TnVtYmVyMSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JCeVR5cGUoRXJyb01lc3NhZ2VUeXBlLk1pc3NpbmdPckludmFsaWRJbnB1dCwgW2lucHV0MU5hbWVdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gXHJcbiAgICAgICAgZWxzZSBpZiAoaW5wdXRTaWduYWxEYXRhMS5sZW5ndGggPCAyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JCeVR5cGUoRXJyb01lc3NhZ2VUeXBlLk1pc3NpbmdPckludmFsaWRJbnB1dCwgW2lucHV0MU5hbWVdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpbnB1dFNpZ25hbERhdGEyID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAvLyBjaGVjayBmb3Igc2ltcGxlIHZhbHVlXHJcbiAgICAgICAgICAgIGlmIChpc05hTihpbnB1dE51bWJlcjIpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEVycm9yQnlUeXBlKEVycm9NZXNzYWdlVHlwZS5NaXNzaW5nT3JJbnZhbGlkSW5wdXQsIFtpbnB1dDJOYW1lXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoaW5wdXRTaWduYWxEYXRhMi5sZW5ndGggPCAyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JCeVR5cGUoRXJyb01lc3NhZ2VUeXBlLk1pc3NpbmdPckludmFsaWRJbnB1dCwgW2lucHV0Mk5hbWVdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFpc05hTihpbnB1dE51bWJlcjEpICYmICFpc05hTihpbnB1dE51bWJlcjIpKSB7XHJcbiAgICAgICAgICAgIC8vIFN1YiBvZiB0d28gbnVtYmVycyBpcyBub3Qgc3VwcG9ydGVkXHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3IoXCJDYWxjdWxhdGlvbiBFcnJvcjogSXQgaXMgbm90IHN1cHBvcnRlZCB0byBvcGVyYXRlIHdpdGgganVzdCB0d28gbnVtYmVycyFcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5nZXRFcnJvcnMoKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgbGlzdCB3aXRoIGFsbCB0aGUgb2NjdXJyZWQgZXJyb3JzIG9mIHRoaXMgY2FsY3VsYXRvclxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxzdHJpbmc+fVxyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0b3JCYXNlXHJcbiAgICAgKi9cclxuICAgIGdldEVycm9ycygpOiBBcnJheTxzdHJpbmc+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lcnJvckxpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgc2FtcGxpbmcgcmF0ZSBvZiBzaWduYWwgZGF0YVxyXG4gICAgICogIFJldHVybnMgdGhlIG1lZGlhbiBvZiBhbGwgc2FtcGxlIHRpbWVzIHJvdW5kZWQgdG8gdGhlIG5leHQgNTB1cyAoNTB1cyBpcyB0b2RheXMgZmFzdGVzdCBzYW1wbGUgdGltZSlcclxuICAgICAqIFxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHBhcmFtIHtBcnJheTxJUG9pbnQ+fSBzaWduYWxEYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0b3JCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBlc3RpbWF0ZVNhbXBsZVRpbWUoc2lnbmFsRGF0YTogQXJyYXk8SVBvaW50Pik6IG51bWJlcnsgICAgICAgIFxyXG4gICAgICAgIGxldCBzYW1wbGVUaW1lID0gdGhpcy5nZXRNZWRpYW5PZlNhbXBsZVRpbWUoc2lnbmFsRGF0YSk7XHJcbiAgICAgICAgc2FtcGxlVGltZSA9IHRoaXMucm91bmRTYW1wbGVUaW1lKHNhbXBsZVRpbWUpO1xyXG4gICAgICAgIHJldHVybiBzYW1wbGVUaW1lO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIGdldE1lZGlhbk9mU2FtcGxlVGltZShzaWduYWxEYXRhOiBBcnJheTxJUG9pbnQ+KTpudW1iZXJ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHNhbXBsZVRpbWVzIDogQXJyYXk8bnVtYmVyPj0gbmV3IEFycmF5PG51bWJlcj4oKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTxzaWduYWxEYXRhLmxlbmd0aC0xOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgc2FtcGxlVGltZSA9IHNpZ25hbERhdGFbaSsxXS54IC0gc2lnbmFsRGF0YVtpXS54O1xyXG4gICAgICAgICAgICBzYW1wbGVUaW1lcy5wdXNoKHNhbXBsZVRpbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNhbXBsZVRpbWUgPSBNYXRoWC5tZWRpYW4oc2FtcGxlVGltZXMpOyAgICAgXHJcblxyXG4gICAgICAgIHJldHVybiBzYW1wbGVUaW1lO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJvdW5kIHRvIDUwdXModXNlZCBmb3IgdmFsaWQgc2FtcGxpbmcgcmF0ZSlcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBzYW1wbGVUaW1lXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0b3JCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcm91bmRTYW1wbGVUaW1lKHNhbXBsZVRpbWUgOiBudW1iZXIpe1xyXG4gICAgICAgIHNhbXBsZVRpbWUgPSBzYW1wbGVUaW1lKjIwMDAwO1xyXG4gICAgICAgIHNhbXBsZVRpbWUgPSBNYXRoLnJvdW5kKHNhbXBsZVRpbWUpO1xyXG4gICAgICAgIHNhbXBsZVRpbWUgPSBzYW1wbGVUaW1lLzIwMDAwO1xyXG4gICAgICAgIHJldHVybiBzYW1wbGVUaW1lO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFBlcmZvcm1zIG9wdGlvbmFsIHByZXBlcmF0aW9uIG9mIHRoZSBpbnB1dCBkYXRhIGFjY29yZGluZyB0byBjYWxjdWxhdG9yLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7KEFycmF5PENhbGN1bGF0aW9uRGF0YU51bWJlcnxDYWxjdWxhdGlvbkRhdGFQb2ludHN8Q2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHM+KX0gaW5wdXREYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7KEFycmF5PENhbGN1bGF0aW9uRGF0YU51bWJlcnxDYWxjdWxhdGlvbkRhdGFQb2ludHN8Q2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHM+KX1cclxuICAgICAqIEBtZW1iZXJvZiBDYWxjdWxhdG9yQmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcHJlcGFyZUlucHV0RGF0YShpbnB1dERhdGE6IEFycmF5PENhbGN1bGF0aW9uRGF0YU51bWJlcnxDYWxjdWxhdGlvbkRhdGFQb2ludHN8Q2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHM+KTogQXJyYXk8Q2FsY3VsYXRpb25EYXRhTnVtYmVyfENhbGN1bGF0aW9uRGF0YVBvaW50c3xDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cz4ge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBpbnB1dERhdGE7XHJcbiAgICB9XHJcbiAgICBcclxufSJdfQ==