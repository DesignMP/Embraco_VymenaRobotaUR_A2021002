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
define(["require", "exports", "./calculatorBase", "../calculationDataPoints", "../calculationDataNumberOrPoints", "../../point", "../calculationDataDisplayInfo", "./calculatorHelper"], function (require, exports, calculatorBase_1, calculationDataPoints_1, calculationDataNumberOrPoints_1, point_1, calculationDataDisplayInfo_1, calculatorHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AndCalculator = /** @class */ (function (_super) {
        __extends(AndCalculator, _super);
        function AndCalculator() {
            var _this = _super.call(this, "bitwise and", "Bitwise AND", "Calculates Bitwise AND between signal and number") || this;
            _this.inputName1 = "Input signal or constant a";
            _this.inputName2 = "Input signal or constant b";
            _this.outputName = "Output signal";
            _this.outputValue = "and";
            return _this;
        }
        AndCalculator.prototype.getDefaultInputData = function () {
            var defaultInputData = _super.prototype.getDefaultInputData.call(this);
            defaultInputData.push(new calculationDataNumberOrPoints_1.CalculationDataNumberOrPoints(this.inputName1, 0, "Input is a signal: Each Y value of the signal is used for bitwise AND; Input is a constant: Constant used for bitwise AND", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            defaultInputData.push(new calculationDataNumberOrPoints_1.CalculationDataNumberOrPoints(this.inputName2, 0, "Input is a signal: Each Y value of the signal is used for bitwise AND; Input is a constant: Constant used for bitwise AND", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            return defaultInputData;
        };
        AndCalculator.prototype.getDefaultOutputData = function () {
            var defaultOutputData = _super.prototype.getDefaultOutputData.call(this);
            defaultOutputData.push(new calculationDataPoints_1.CalculationDataPoints(this.outputName, this.outputValue, new Array()));
            return defaultOutputData;
        };
        AndCalculator.prototype.prepareCalculationData = function () {
            _super.prototype.prepareCalculationData.call(this);
            var calculationInputDataContainer = this.getCalculationInputDataContainer();
            var inputData1 = calculationInputDataContainer[0];
            var inputData2 = calculationInputDataContainer[1];
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(inputData1.data) && calculatorHelper_1.CalculatorHelper.isValidSignal(inputData1.data)
                && calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(inputData2.data) && calculatorHelper_1.CalculatorHelper.isValidSignal(inputData2.data)) {
                var preparedPointArrays = calculatorHelper_1.CalculatorHelper.filterMatchingPointsByXvalue({
                    pointArray1: inputData1.data,
                    pointArray2: inputData2.data
                });
                calculationInputDataContainer[0].data = preparedPointArrays.pointArray1;
                calculationInputDataContainer[1].data = preparedPointArrays.pointArray2;
                if (!calculatorHelper_1.CalculatorHelper.isValidSignal(inputData1.data) || !calculatorHelper_1.CalculatorHelper.isValidSignal(inputData2.data)) {
                    this.addErrorByType(calculatorBase_1.ErrorMessageType.NotEnoughCommonTimestamps, [inputData1.name, inputData2.name]);
                }
            }
        };
        AndCalculator.prototype.verifyCalculationInputData = function () {
            _super.prototype.verifyCalculationInputData.call(this);
            //retrieve calculation input data
            var calculationInputDataContainer = this.getCalculationInputDataContainer();
            var inputData1 = calculationInputDataContainer[0];
            var inputData2 = calculationInputDataContainer[1];
            if (inputData1 == undefined || calculatorHelper_1.CalculatorHelper.calculationInputDataIsString(inputData1.data)) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.MissingOrInvalidInput, [this.inputName1]);
            }
            if (inputData2 == undefined || calculatorHelper_1.CalculatorHelper.calculationInputDataIsString(inputData2.data)) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.MissingOrInvalidInput, [this.inputName2]);
            }
            if (this.hasErrors()) {
                return;
            }
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(inputData1.data) && calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(inputData2.data)) {
                this.addError("Calculation Error: It is not supported to operate with just two numbers!");
            }
            //Checking if the input signal contains floating point numbers
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(inputData1.data) && calculatorHelper_1.CalculatorHelper.iPointArrayHasFloatInYValues(inputData1.data)) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.ContainsFloatingNumbers, [this.inputName1]);
            }
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(inputData2.data) && calculatorHelper_1.CalculatorHelper.iPointArrayHasFloatInYValues(inputData2.data)) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.ContainsFloatingNumbers, [this.inputName2]);
            }
            //Checking if the input number is a floating point numbers
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(inputData1.data) && !Number.isSafeInteger(inputData1.data)) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.NumberIsNoInt, [this.inputName1]);
            }
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(inputData2.data) && !Number.isSafeInteger(inputData2.data)) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.NumberIsNoInt, [this.inputName2]);
            }
        };
        AndCalculator.prototype.executeAlgorithm = function () {
            _super.prototype.executeAlgorithm.call(this);
            //retrieve calculation input data and initialize result
            var calculationInputData = this.getCalculationInputDataContainer();
            var result = new Array();
            var inputData1 = calculationInputData[0];
            var inputData2 = calculationInputData[1];
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(inputData1.data) && calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(inputData2.data)) {
                result = this.calcAndSignalWithConstant(inputData1.data, inputData2.data);
            }
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(inputData1.data) && calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(inputData2.data)) {
                result = this.calcAndSignalWithConstant(inputData2.data, inputData1.data);
            }
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(inputData1.data) && calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(inputData2.data)) {
                result = this.calcAndSignalWithSignal(inputData1.data, inputData2.data);
            }
            //add the result of the calculation to the calculationOutpuContainer
            this.addCalculationOutputData({
                data: result,
                value: this.outputValue,
                name: this.outputName
            });
        };
        /**
         * Calculate bitwise and with each Y-IPoint-Array value with the given number
         *
         * @private
         * @param {Array<IPoint>} inputSignal
         * @param {number} inputNumber
         * @returns {Array<IPoint>}
         * @memberof AndCalculator
         */
        AndCalculator.prototype.calcAndSignalWithConstant = function (inputSignal, inputNumber) {
            var bitwiseAnd = new Array();
            for (var i = 0; i < inputSignal.length; i++) {
                bitwiseAnd.push(new point_1.Point(inputSignal[i].x, inputSignal[i].y & inputNumber));
            }
            return bitwiseAnd;
        };
        /**
         * Calculate bitwise and with two Y-IPoint-Array values
         *
         * @private
         * @param {Array<IPoint>} inputSignal1
         * @param {Array<IPoint>} inputSignal2
         * @returns {Array<IPoint>}
         * @memberof AndCalculator
         */
        AndCalculator.prototype.calcAndSignalWithSignal = function (inputSignal1, inputSignal2) {
            var bitwiseAnd = new Array();
            if (inputSignal1.length == inputSignal2.length) { // Add only signals with same sample count     
                for (var i = 0; i < inputSignal1.length; i++) {
                    bitwiseAnd.push(new point_1.Point(inputSignal1[i].x, inputSignal1[i].y & inputSignal2[i].y));
                }
            }
            else {
                this.addError("Calculation Error: The input signals don't have the same number of points!");
            }
            return bitwiseAnd;
        };
        return AndCalculator;
    }(calculatorBase_1.CalculatorBase));
    exports.AndCalculator = AndCalculator;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5kQ2FsY3VsYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRvcnMvYW5kQ2FsY3VsYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBVUE7UUFBbUMsaUNBQWM7UUFPN0M7WUFBQSxZQUNJLGtCQUFNLGFBQWEsRUFBRSxhQUFhLEVBQUUsa0RBQWtELENBQUMsU0FDMUY7WUFQTyxnQkFBVSxHQUFHLDRCQUE0QixDQUFDO1lBQzFDLGdCQUFVLEdBQUcsNEJBQTRCLENBQUM7WUFDMUMsZ0JBQVUsR0FBRyxlQUFlLENBQUM7WUFDN0IsaUJBQVcsR0FBRyxLQUFLLENBQUM7O1FBSTVCLENBQUM7UUFFTSwyQ0FBbUIsR0FBMUI7WUFDSSxJQUFJLGdCQUFnQixHQUFHLGlCQUFNLG1CQUFtQixXQUFFLENBQUM7WUFFbkQsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksNkRBQTZCLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsMkhBQTJILEVBQUUsSUFBSSx1REFBMEIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZQLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLDZEQUE2QixDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLDJIQUEySCxFQUFFLElBQUksdURBQTBCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUV2UCxPQUFPLGdCQUFnQixDQUFDO1FBQzVCLENBQUM7UUFFTSw0Q0FBb0IsR0FBM0I7WUFDSSxJQUFJLGlCQUFpQixHQUFHLGlCQUFNLG9CQUFvQixXQUFFLENBQUM7WUFFckQsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksNkNBQXFCLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFB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b3J0IHsgQ2FsY3VsYXRvckJhc2UgLCBFcnJvck1lc3NhZ2VUeXBlfSBmcm9tIFwiLi9jYWxjdWxhdG9yQmFzZVwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFQb2ludHMgfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhUG9pbnRzXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzXCI7XHJcbmltcG9ydCB7IElQb2ludCB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL3BvaW50SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4uLy4uL3BvaW50XCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0b3JIZWxwZXIgfSBmcm9tIFwiLi9jYWxjdWxhdG9ySGVscGVyXCI7XHJcbmltcG9ydCB7IFRDYWxjdWxhdGlvbkRhdGEgfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIEFuZENhbGN1bGF0b3IgZXh0ZW5kcyBDYWxjdWxhdG9yQmFzZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBpbnB1dE5hbWUxID0gXCJJbnB1dCBzaWduYWwgb3IgY29uc3RhbnQgYVwiO1xyXG4gICAgcHJpdmF0ZSBpbnB1dE5hbWUyID0gXCJJbnB1dCBzaWduYWwgb3IgY29uc3RhbnQgYlwiO1xyXG4gICAgcHJpdmF0ZSBvdXRwdXROYW1lID0gXCJPdXRwdXQgc2lnbmFsXCI7XHJcbiAgICBwcml2YXRlIG91dHB1dFZhbHVlID0gXCJhbmRcIjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihcImJpdHdpc2UgYW5kXCIsIFwiQml0d2lzZSBBTkRcIiwgXCJDYWxjdWxhdGVzIEJpdHdpc2UgQU5EIGJldHdlZW4gc2lnbmFsIGFuZCBudW1iZXJcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldERlZmF1bHRJbnB1dERhdGEoKTogQXJyYXk8VENhbGN1bGF0aW9uRGF0YT4ge1xyXG4gICAgICAgIGxldCBkZWZhdWx0SW5wdXREYXRhID0gc3VwZXIuZ2V0RGVmYXVsdElucHV0RGF0YSgpO1xyXG5cclxuICAgICAgICBkZWZhdWx0SW5wdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzKHRoaXMuaW5wdXROYW1lMSwgMCwgXCJJbnB1dCBpcyBhIHNpZ25hbDogRWFjaCBZIHZhbHVlIG9mIHRoZSBzaWduYWwgaXMgdXNlZCBmb3IgYml0d2lzZSBBTkQ7IElucHV0IGlzIGEgY29uc3RhbnQ6IENvbnN0YW50IHVzZWQgZm9yIGJpdHdpc2UgQU5EXCIsIG5ldyBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mbyhmYWxzZSwgdHJ1ZSkpKTtcclxuICAgICAgICBkZWZhdWx0SW5wdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzKHRoaXMuaW5wdXROYW1lMiwgMCwgXCJJbnB1dCBpcyBhIHNpZ25hbDogRWFjaCBZIHZhbHVlIG9mIHRoZSBzaWduYWwgaXMgdXNlZCBmb3IgYml0d2lzZSBBTkQ7IElucHV0IGlzIGEgY29uc3RhbnQ6IENvbnN0YW50IHVzZWQgZm9yIGJpdHdpc2UgQU5EXCIsIG5ldyBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mbyhmYWxzZSwgdHJ1ZSkpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRJbnB1dERhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldERlZmF1bHRPdXRwdXREYXRhKCk6IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz4ge1xyXG4gICAgICAgIGxldCBkZWZhdWx0T3V0cHV0RGF0YSA9IHN1cGVyLmdldERlZmF1bHRPdXRwdXREYXRhKCk7XHJcblxyXG4gICAgICAgIGRlZmF1bHRPdXRwdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YVBvaW50cyh0aGlzLm91dHB1dE5hbWUsIHRoaXMub3V0cHV0VmFsdWUsIG5ldyBBcnJheTxJUG9pbnQ+KCkpKTsgXHJcbiAgICAgICBcclxuICAgICAgICByZXR1cm4gZGVmYXVsdE91dHB1dERhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHByZXBhcmVDYWxjdWxhdGlvbkRhdGEoKSB7XHJcbiAgICAgICAgc3VwZXIucHJlcGFyZUNhbGN1bGF0aW9uRGF0YSgpO1xyXG5cclxuICAgICAgICBsZXQgY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXIgPSB0aGlzLmdldENhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyKCk7XHJcblxyXG4gICAgICAgIGxldCBpbnB1dERhdGExID0gY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXJbMF07XHJcbiAgICAgICAgbGV0IGlucHV0RGF0YTIgPSBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lclsxXTtcclxuXHJcbiAgICAgICAgaWYoQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU2lnbmFsKGlucHV0RGF0YTEuZGF0YSkgJiYgQ2FsY3VsYXRvckhlbHBlci5pc1ZhbGlkU2lnbmFsKGlucHV0RGF0YTEuZGF0YSlcclxuICAgICAgICAgICAgJiYgQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU2lnbmFsKGlucHV0RGF0YTIuZGF0YSkgJiYgQ2FsY3VsYXRvckhlbHBlci5pc1ZhbGlkU2lnbmFsKGlucHV0RGF0YTIuZGF0YSkpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBwcmVwYXJlZFBvaW50QXJyYXlzID0gQ2FsY3VsYXRvckhlbHBlci5maWx0ZXJNYXRjaGluZ1BvaW50c0J5WHZhbHVlKHsgXHJcbiAgICAgICAgICAgICAgICBwb2ludEFycmF5MTogaW5wdXREYXRhMS5kYXRhLCBcclxuICAgICAgICAgICAgICAgIHBvaW50QXJyYXkyOiBpbnB1dERhdGEyLmRhdGFcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lclswXS5kYXRhID0gcHJlcGFyZWRQb2ludEFycmF5cy5wb2ludEFycmF5MTtcclxuICAgICAgICAgICAgY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXJbMV0uZGF0YSA9IHByZXBhcmVkUG9pbnRBcnJheXMucG9pbnRBcnJheTI7XHJcblxyXG4gICAgICAgICAgICBpZighQ2FsY3VsYXRvckhlbHBlci5pc1ZhbGlkU2lnbmFsKGlucHV0RGF0YTEuZGF0YSkgfHwgIUNhbGN1bGF0b3JIZWxwZXIuaXNWYWxpZFNpZ25hbChpbnB1dERhdGEyLmRhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEVycm9yQnlUeXBlKEVycm9yTWVzc2FnZVR5cGUuTm90RW5vdWdoQ29tbW9uVGltZXN0YW1wcywgW2lucHV0RGF0YTEubmFtZSwgaW5wdXREYXRhMi5uYW1lXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHZlcmlmeUNhbGN1bGF0aW9uSW5wdXREYXRhKCkge1xyXG4gICAgICAgIHN1cGVyLnZlcmlmeUNhbGN1bGF0aW9uSW5wdXREYXRhKCk7XHJcblxyXG4gICAgICAgIC8vcmV0cmlldmUgY2FsY3VsYXRpb24gaW5wdXQgZGF0YVxyXG4gICAgICAgIGxldCBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lciA9IHRoaXMuZ2V0Q2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXIoKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgaW5wdXREYXRhMSA9IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyWzBdO1xyXG4gICAgICAgIGxldCBpbnB1dERhdGEyID0gY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXJbMV07XHJcblxyXG4gICAgICAgIGlmKGlucHV0RGF0YTEgPT0gdW5kZWZpbmVkIHx8IENhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc1N0cmluZyhpbnB1dERhdGExLmRhdGEpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JCeVR5cGUoRXJyb3JNZXNzYWdlVHlwZS5NaXNzaW5nT3JJbnZhbGlkSW5wdXQsIFt0aGlzLmlucHV0TmFtZTFdKTtcclxuICAgICAgICB9IFxyXG4gICAgICAgIGlmKGlucHV0RGF0YTIgPT0gdW5kZWZpbmVkIHx8IENhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc1N0cmluZyhpbnB1dERhdGEyLmRhdGEpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JCeVR5cGUoRXJyb3JNZXNzYWdlVHlwZS5NaXNzaW5nT3JJbnZhbGlkSW5wdXQsIFt0aGlzLmlucHV0TmFtZTJdKTtcclxuICAgICAgICB9IFxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuaGFzRXJyb3JzKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzTnVtYmVyKGlucHV0RGF0YTEuZGF0YSkgJiYgQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzTnVtYmVyKGlucHV0RGF0YTIuZGF0YSkpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3IoXCJDYWxjdWxhdGlvbiBFcnJvcjogSXQgaXMgbm90IHN1cHBvcnRlZCB0byBvcGVyYXRlIHdpdGgganVzdCB0d28gbnVtYmVycyFcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL0NoZWNraW5nIGlmIHRoZSBpbnB1dCBzaWduYWwgY29udGFpbnMgZmxvYXRpbmcgcG9pbnQgbnVtYmVyc1xyXG4gICAgICAgIGlmKENhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc1NpZ25hbChpbnB1dERhdGExLmRhdGEpICYmIENhbGN1bGF0b3JIZWxwZXIuaVBvaW50QXJyYXlIYXNGbG9hdEluWVZhbHVlcyhpbnB1dERhdGExLmRhdGEpKXtcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvckJ5VHlwZShFcnJvck1lc3NhZ2VUeXBlLkNvbnRhaW5zRmxvYXRpbmdOdW1iZXJzLCBbdGhpcy5pbnB1dE5hbWUxXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKENhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc1NpZ25hbChpbnB1dERhdGEyLmRhdGEpICYmIENhbGN1bGF0b3JIZWxwZXIuaVBvaW50QXJyYXlIYXNGbG9hdEluWVZhbHVlcyhpbnB1dERhdGEyLmRhdGEpKXtcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvckJ5VHlwZShFcnJvck1lc3NhZ2VUeXBlLkNvbnRhaW5zRmxvYXRpbmdOdW1iZXJzLCBbdGhpcy5pbnB1dE5hbWUyXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vQ2hlY2tpbmcgaWYgdGhlIGlucHV0IG51bWJlciBpcyBhIGZsb2F0aW5nIHBvaW50IG51bWJlcnNcclxuICAgICAgICBpZihDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNOdW1iZXIoaW5wdXREYXRhMS5kYXRhKSAmJiAhTnVtYmVyLmlzU2FmZUludGVnZXIoaW5wdXREYXRhMS5kYXRhKSl7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JCeVR5cGUoRXJyb3JNZXNzYWdlVHlwZS5OdW1iZXJJc05vSW50LCBbdGhpcy5pbnB1dE5hbWUxXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKENhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc051bWJlcihpbnB1dERhdGEyLmRhdGEpICYmICFOdW1iZXIuaXNTYWZlSW50ZWdlcihpbnB1dERhdGEyLmRhdGEpKXtcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvckJ5VHlwZShFcnJvck1lc3NhZ2VUeXBlLk51bWJlcklzTm9JbnQsIFt0aGlzLmlucHV0TmFtZTJdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGV4ZWN1dGVBbGdvcml0aG0oKSB7XHJcbiAgICAgICAgc3VwZXIuZXhlY3V0ZUFsZ29yaXRobSgpXHJcblxyXG4gICAgICAgIC8vcmV0cmlldmUgY2FsY3VsYXRpb24gaW5wdXQgZGF0YSBhbmQgaW5pdGlhbGl6ZSByZXN1bHRcclxuICAgICAgICBsZXQgY2FsY3VsYXRpb25JbnB1dERhdGEgPSB0aGlzLmdldENhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyKCk7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBBcnJheTxJUG9pbnQ+KCk7XHJcblxyXG4gICAgICAgIGxldCBpbnB1dERhdGExID0gY2FsY3VsYXRpb25JbnB1dERhdGFbMF07XHJcbiAgICAgICAgbGV0IGlucHV0RGF0YTIgPSBjYWxjdWxhdGlvbklucHV0RGF0YVsxXTtcclxuXHJcbiAgICAgICAgaWYoQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU2lnbmFsKGlucHV0RGF0YTEuZGF0YSkgJiYgQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzTnVtYmVyKGlucHV0RGF0YTIuZGF0YSkpe1xyXG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLmNhbGNBbmRTaWduYWxXaXRoQ29uc3RhbnQoaW5wdXREYXRhMS5kYXRhLCBpbnB1dERhdGEyLmRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNOdW1iZXIoaW5wdXREYXRhMS5kYXRhKSAmJiBDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNTaWduYWwoaW5wdXREYXRhMi5kYXRhKSl7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuY2FsY0FuZFNpZ25hbFdpdGhDb25zdGFudChpbnB1dERhdGEyLmRhdGEsIGlucHV0RGF0YTEuZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKENhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc1NpZ25hbChpbnB1dERhdGExLmRhdGEpICYmIENhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc1NpZ25hbChpbnB1dERhdGEyLmRhdGEpKXtcclxuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5jYWxjQW5kU2lnbmFsV2l0aFNpZ25hbChpbnB1dERhdGExLmRhdGEsIGlucHV0RGF0YTIuZGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2FkZCB0aGUgcmVzdWx0IG9mIHRoZSBjYWxjdWxhdGlvbiB0byB0aGUgY2FsY3VsYXRpb25PdXRwdUNvbnRhaW5lclxyXG4gICAgICAgIHRoaXMuYWRkQ2FsY3VsYXRpb25PdXRwdXREYXRhKHtcclxuICAgICAgICAgICAgZGF0YTogcmVzdWx0LFxyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5vdXRwdXRWYWx1ZSxcclxuICAgICAgICAgICAgbmFtZTogdGhpcy5vdXRwdXROYW1lXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsY3VsYXRlIGJpdHdpc2UgYW5kIHdpdGggZWFjaCBZLUlQb2ludC1BcnJheSB2YWx1ZSB3aXRoIHRoZSBnaXZlbiBudW1iZXJcclxuICAgICAqIFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SVBvaW50Pn0gaW5wdXRTaWduYWwgXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5wdXROdW1iZXJcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxJUG9pbnQ+fSBcclxuICAgICAqIEBtZW1iZXJvZiBBbmRDYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2FsY0FuZFNpZ25hbFdpdGhDb25zdGFudChpbnB1dFNpZ25hbDogQXJyYXk8SVBvaW50PiwgaW5wdXROdW1iZXI6IG51bWJlcikgOiBBcnJheTxJUG9pbnQ+IHtcclxuICAgICAgICBsZXQgYml0d2lzZUFuZCA9IG5ldyBBcnJheTxJUG9pbnQ+KCk7ICAgICAgXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGlucHV0U2lnbmFsLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGJpdHdpc2VBbmQucHVzaChuZXcgUG9pbnQoaW5wdXRTaWduYWxbaV0ueCwgaW5wdXRTaWduYWxbaV0ueSAmIGlucHV0TnVtYmVyKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBiaXR3aXNlQW5kO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsY3VsYXRlIGJpdHdpc2UgYW5kIHdpdGggdHdvIFktSVBvaW50LUFycmF5IHZhbHVlc1xyXG4gICAgICogXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxJUG9pbnQ+fSBpbnB1dFNpZ25hbDEgXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElQb2ludD59IGlucHV0U2lnbmFsMlxyXG4gICAgICogQHJldHVybnMge0FycmF5PElQb2ludD59IFxyXG4gICAgICogQG1lbWJlcm9mIEFuZENhbGN1bGF0b3JcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjYWxjQW5kU2lnbmFsV2l0aFNpZ25hbChpbnB1dFNpZ25hbDE6IEFycmF5PElQb2ludD4sIGlucHV0U2lnbmFsMjogQXJyYXk8SVBvaW50PikgOiBBcnJheTxJUG9pbnQ+IHtcclxuICAgICAgICBsZXQgYml0d2lzZUFuZCA9IG5ldyBBcnJheTxJUG9pbnQ+KCk7IFxyXG4gICAgICAgIGlmKGlucHV0U2lnbmFsMS5sZW5ndGggPT0gaW5wdXRTaWduYWwyLmxlbmd0aCl7IC8vIEFkZCBvbmx5IHNpZ25hbHMgd2l0aCBzYW1lIHNhbXBsZSBjb3VudCAgICAgXHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBpbnB1dFNpZ25hbDEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGJpdHdpc2VBbmQucHVzaChuZXcgUG9pbnQoaW5wdXRTaWduYWwxW2ldLngsIGlucHV0U2lnbmFsMVtpXS55ICYgaW5wdXRTaWduYWwyW2ldLnkpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yKFwiQ2FsY3VsYXRpb24gRXJyb3I6IFRoZSBpbnB1dCBzaWduYWxzIGRvbid0IGhhdmUgdGhlIHNhbWUgbnVtYmVyIG9mIHBvaW50cyFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBiaXR3aXNlQW5kO1xyXG4gICAgfVxyXG59Il19