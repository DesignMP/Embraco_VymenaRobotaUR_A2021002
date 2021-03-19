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
define(["require", "exports", "../../point", "../calculationDataNumber", "../calculationDataPoints", "../calculationDataDisplayInfo", "./calculatorBase", "./calculatorHelper"], function (require, exports, point_1, calculationDataNumber_1, calculationDataPoints_1, calculationDataDisplayInfo_1, calculatorBase_1, calculatorHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ExpCalculator = /** @class */ (function (_super) {
        __extends(ExpCalculator, _super);
        function ExpCalculator() {
            var _this = _super.call(this, "exponentiation", "Exponential a" + "\u207F", "Exponents a signal by a constant value") || this;
            _this.inputName1 = "Input signal a";
            _this.inputName2 = "Constant value n";
            _this.outputName = "Output signal";
            _this.outputValue = "exp";
            return _this;
        }
        ExpCalculator.prototype.getDefaultInputData = function () {
            var defaultInputData = _super.prototype.getDefaultInputData.call(this);
            var exponentDisplayInfo = new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, false);
            exponentDisplayInfo.minValue = 0;
            defaultInputData.push(new calculationDataPoints_1.CalculationDataPoints(this.inputName1, "", new Array(), "The baseSignal", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            defaultInputData.push(new calculationDataNumber_1.CalculationDataNumber(this.inputName2, 1, "The exponent", exponentDisplayInfo));
            return defaultInputData;
        };
        ExpCalculator.prototype.getDefaultOutputData = function () {
            var defaultOutputData = _super.prototype.getDefaultOutputData.call(this);
            defaultOutputData.push(new calculationDataPoints_1.CalculationDataPoints(this.outputName, this.outputValue, new Array()));
            return defaultOutputData;
        };
        ExpCalculator.prototype.verifyCalculationInputData = function () {
            _super.prototype.verifyCalculationInputData.call(this);
            var calculationInputDataContainer = this.getCalculationInputDataContainer();
            var baseSignal = calculationInputDataContainer[0];
            var exponent = calculationInputDataContainer[1];
            if (baseSignal == undefined || !calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(baseSignal.data)) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.MissingOrInvalidInput, [this.inputName1]);
            }
            if (exponent == undefined || !calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(exponent.data)) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.MissingOrInvalidInput, [this.inputName2]);
            }
        };
        ExpCalculator.prototype.executeAlgorithm = function () {
            _super.prototype.executeAlgorithm.call(this);
            var calculationInputDataContainer = this.getCalculationInputDataContainer();
            var result = new Array();
            var baseSignal = calculationInputDataContainer[0];
            var exponent = calculationInputDataContainer[1];
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(baseSignal.data) && calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(exponent.data)) {
                result = this.exponentSignalWithConstValue(baseSignal.data, exponent.data);
            }
            this.addCalculationOutputData({
                data: result,
                value: this.outputValue,
                name: this.outputName
            });
        };
        /**
         * Calculates output signal
         *
         * @private
         * @param {Array<IPoint>} inputSignal
         * @param {number} inputNumber
         * @returns {Array<IPoint>}
         * @memberof ExpCalculator
         */
        ExpCalculator.prototype.exponentSignalWithConstValue = function (inputSignal, inputNumber) {
            var points = new Array();
            for (var i = 0; i < inputSignal.length; i++) {
                if (inputNumber < 1 && inputNumber > 0 && inputSignal[i].y < 0) {
                    this.addError("Calculation Error: If exponent is 0<n<1, then each value of the input signal has to be >=0.");
                    return new Array();
                }
                var x = inputSignal[i].x;
                var y = Math.pow(inputSignal[i].y, inputNumber);
                points.push(new point_1.Point(x, y));
            }
            return points;
        };
        return ExpCalculator;
    }(calculatorBase_1.CalculatorBase));
    exports.ExpCalculator = ExpCalculator;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwQ2FsY3VsYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRvcnMvZXhwQ2FsY3VsYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBU0E7UUFBbUMsaUNBQWM7UUFNN0M7WUFBQSxZQUNJLGtCQUFNLGdCQUFnQixFQUFFLGVBQWUsR0FBRyxRQUFRLEVBQUUsd0NBQXdDLENBQUMsU0FDaEc7WUFOTyxnQkFBVSxHQUFHLGdCQUFnQixDQUFDO1lBQzlCLGdCQUFVLEdBQUcsa0JBQWtCLENBQUM7WUFDaEMsZ0JBQVUsR0FBRyxlQUFlLENBQUM7WUFDN0IsaUJBQVcsR0FBRyxLQUFLLENBQUM7O1FBRzVCLENBQUM7UUFFTSwyQ0FBbUIsR0FBMUI7WUFDSSxJQUFJLGdCQUFnQixHQUFHLGlCQUFNLG1CQUFtQixXQUFFLENBQUM7WUFFbkQsSUFBSSxtQkFBbUIsR0FBRyxJQUFJLHVEQUEwQixDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN2RSxtQkFBbUIsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1lBRWpDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLDZDQUFxQixDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRSxFQUFFLElBQUksS0FBSyxFQUFVLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSx1REFBMEIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFKLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLDZDQUFxQixDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLGNBQWMsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7WUFFMUcsT0FBTyxnQkFBZ0IsQ0FBQztRQUM1QixDQUFDO1FBRU0sNENBQW9CLEdBQTNCO1lBQ0ks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QyxFQUFFLFdBQVcsQ0FBQyxDQUFDO2dCQUNoRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksYUFBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2hDO1lBQ0QsT0FBTyxNQUFNLENBQUM7UUFDbEIsQ0FBQztRQUNMLG9CQUFDO0lBQUQsQ0FBQyxBQXhGRCxDQUFtQywrQkFBYyxHQXdGaEQ7SUF4Rlksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJUG9pbnQgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9wb2ludEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuLi8uLi9wb2ludFwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFOdW1iZXIgfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhTnVtYmVyXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YVBvaW50cyB9IGZyb20gXCIuLi9jYWxjdWxhdGlvbkRhdGFQb2ludHNcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm8gfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm9cIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRvckJhc2UsIEVycm9yTWVzc2FnZVR5cGUgfSBmcm9tIFwiLi9jYWxjdWxhdG9yQmFzZVwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdG9ySGVscGVyIH0gZnJvbSBcIi4vY2FsY3VsYXRvckhlbHBlclwiO1xyXG5pbXBvcnQgeyBUQ2FsY3VsYXRpb25EYXRhIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEV4cENhbGN1bGF0b3IgZXh0ZW5kcyBDYWxjdWxhdG9yQmFzZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBpbnB1dE5hbWUxID0gXCJJbnB1dCBzaWduYWwgYVwiO1xyXG4gICAgcHJpdmF0ZSBpbnB1dE5hbWUyID0gXCJDb25zdGFudCB2YWx1ZSBuXCI7XHJcbiAgICBwcml2YXRlIG91dHB1dE5hbWUgPSBcIk91dHB1dCBzaWduYWxcIjtcclxuICAgIHByaXZhdGUgb3V0cHV0VmFsdWUgPSBcImV4cFwiO1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFwiZXhwb25lbnRpYXRpb25cIiwgXCJFeHBvbmVudGlhbCBhXCIgKyBcIlxcdTIwN0ZcIiwgXCJFeHBvbmVudHMgYSBzaWduYWwgYnkgYSBjb25zdGFudCB2YWx1ZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0RGVmYXVsdElucHV0RGF0YSgpOiBBcnJheTxUQ2FsY3VsYXRpb25EYXRhPiB7XHJcbiAgICAgICAgbGV0IGRlZmF1bHRJbnB1dERhdGEgPSBzdXBlci5nZXREZWZhdWx0SW5wdXREYXRhKCk7XHJcblxyXG4gICAgICAgIGxldCBleHBvbmVudERpc3BsYXlJbmZvID0gbmV3IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvKGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgZXhwb25lbnREaXNwbGF5SW5mby5taW5WYWx1ZSA9IDA7XHJcblxyXG4gICAgICAgIGRlZmF1bHRJbnB1dERhdGEucHVzaChuZXcgQ2FsY3VsYXRpb25EYXRhUG9pbnRzKHRoaXMuaW5wdXROYW1lMSwgXCJcIiwgbmV3IEFycmF5PElQb2ludD4oKSwgXCJUaGUgYmFzZVNpZ25hbFwiLCBuZXcgQ2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm8oZmFsc2UsIHRydWUpKSk7XHJcbiAgICAgICAgZGVmYXVsdElucHV0RGF0YS5wdXNoKG5ldyBDYWxjdWxhdGlvbkRhdGFOdW1iZXIodGhpcy5pbnB1dE5hbWUyLCAxLCBcIlRoZSBleHBvbmVudFwiLCBleHBvbmVudERpc3BsYXlJbmZvKSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZhdWx0SW5wdXREYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXREZWZhdWx0T3V0cHV0RGF0YSgpOiBBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+IHtcclxuICAgICAgICBsZXQgZGVmYXVsdE91dHB1dERhdGEgPSBzdXBlci5nZXREZWZhdWx0T3V0cHV0RGF0YSgpO1xyXG5cclxuICAgICAgICBkZWZhdWx0T3V0cHV0RGF0YS5wdXNoKG5ldyBDYWxjdWxhdGlvbkRhdGFQb2ludHModGhpcy5vdXRwdXROYW1lLCB0aGlzLm91dHB1dFZhbHVlLCBuZXcgQXJyYXk8SVBvaW50PigpKSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZhdWx0T3V0cHV0RGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgdmVyaWZ5Q2FsY3VsYXRpb25JbnB1dERhdGEoKSB7XHJcbiAgICAgICAgc3VwZXIudmVyaWZ5Q2FsY3VsYXRpb25JbnB1dERhdGEoKTtcclxuXHJcbiAgICAgICAgbGV0IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyID0gdGhpcy5nZXRDYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lcigpO1xyXG5cclxuICAgICAgICBsZXQgYmFzZVNpZ25hbCA9IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyWzBdO1xyXG4gICAgICAgIGxldCBleHBvbmVudCA9IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyWzFdO1xyXG5cclxuICAgICAgICBpZihiYXNlU2lnbmFsID09IHVuZGVmaW5lZCB8fCAhQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU2lnbmFsKGJhc2VTaWduYWwuZGF0YSkpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvckJ5VHlwZShFcnJvck1lc3NhZ2VUeXBlLk1pc3NpbmdPckludmFsaWRJbnB1dCwgW3RoaXMuaW5wdXROYW1lMV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihleHBvbmVudCA9PSB1bmRlZmluZWQgfHwgIUNhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc051bWJlcihleHBvbmVudC5kYXRhKSkge1xyXG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yQnlUeXBlKEVycm9yTWVzc2FnZVR5cGUuTWlzc2luZ09ySW52YWxpZElucHV0LCBbdGhpcy5pbnB1dE5hbWUyXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBleGVjdXRlQWxnb3JpdGhtKCkge1xyXG4gICAgICAgIHN1cGVyLmV4ZWN1dGVBbGdvcml0aG0oKTtcclxuXHJcbiAgICAgICAgbGV0IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyID0gdGhpcy5nZXRDYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lcigpO1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBuZXcgQXJyYXk8SVBvaW50PigpO1xyXG5cclxuICAgICAgICBsZXQgYmFzZVNpZ25hbCA9IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyWzBdO1xyXG4gICAgICAgIGxldCBleHBvbmVudCA9IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyWzFdO1xyXG5cclxuICAgICAgICBpZihDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNTaWduYWwoYmFzZVNpZ25hbC5kYXRhKSAmJiBDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNOdW1iZXIoZXhwb25lbnQuZGF0YSkpIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5leHBvbmVudFNpZ25hbFdpdGhDb25zdFZhbHVlKGJhc2VTaWduYWwuZGF0YSwgZXhwb25lbnQuZGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmFkZENhbGN1bGF0aW9uT3V0cHV0RGF0YSh7XHJcbiAgICAgICAgICAgIGRhdGE6IHJlc3VsdCxcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMub3V0cHV0VmFsdWUsXHJcbiAgICAgICAgICAgIG5hbWU6IHRoaXMub3V0cHV0TmFtZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsY3VsYXRlcyBvdXRwdXQgc2lnbmFsXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SVBvaW50Pn0gaW5wdXRTaWduYWxcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbnB1dE51bWJlclxyXG4gICAgICogQHJldHVybnMge0FycmF5PElQb2ludD59XHJcbiAgICAgKiBAbWVtYmVyb2YgRXhwQ2FsY3VsYXRvclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGV4cG9uZW50U2lnbmFsV2l0aENvbnN0VmFsdWUoaW5wdXRTaWduYWw6IEFycmF5PElQb2ludD4sIGlucHV0TnVtYmVyOiBudW1iZXIpOiBBcnJheTxJUG9pbnQ+e1xyXG4gICAgICAgIGxldCBwb2ludHMgPSBuZXcgQXJyYXk8SVBvaW50PigpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9MDsgaSA8IGlucHV0U2lnbmFsLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYgKGlucHV0TnVtYmVyIDwgMSAmJiBpbnB1dE51bWJlciA+IDAgJiYgaW5wdXRTaWduYWxbaV0ueSA8IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkRXJyb3IoXCJDYWxjdWxhdGlvbiBFcnJvcjogSWYgZXhwb25lbnQgaXMgMDxuPDEsIHRoZW4gZWFjaCB2YWx1ZSBvZiB0aGUgaW5wdXQgc2lnbmFsIGhhcyB0byBiZSA+PTAuXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBBcnJheTxJUG9pbnQ+KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHggPSBpbnB1dFNpZ25hbFtpXS54O1xyXG4gICAgICAgICAgICBsZXQgeSA9IE1hdGgucG93KGlucHV0U2lnbmFsW2ldLnksIGlucHV0TnVtYmVyKTtcclxuICAgICAgICAgICAgcG9pbnRzLnB1c2gobmV3IFBvaW50KHgsIHkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBvaW50cztcclxuICAgIH1cclxufVxyXG5cclxuXHJcbiJdfQ==