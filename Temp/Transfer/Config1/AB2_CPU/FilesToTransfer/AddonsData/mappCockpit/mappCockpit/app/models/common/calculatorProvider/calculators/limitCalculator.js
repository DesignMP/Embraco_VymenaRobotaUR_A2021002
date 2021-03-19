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
    var LimitCalculator = /** @class */ (function (_super) {
        __extends(LimitCalculator, _super);
        function LimitCalculator() {
            var _this = _super.call(this, "max min", "Limit", "Limits the signal to maximum and minimum constant values") || this;
            _this.inputName1 = "Upper limit";
            _this.inputName2 = "Lower limit";
            _this.inputName3 = "Input signal";
            _this.outputName = "Output signal";
            _this.outputValue = "limit";
            return _this;
        }
        LimitCalculator.prototype.getDefaultInputData = function () {
            var defaultInputData = _super.prototype.getDefaultInputData.call(this);
            var maxValueInfo = new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, false);
            var minValueInfo = new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, false);
            defaultInputData.push(new calculationDataNumber_1.CalculationDataNumber(this.inputName1, 1, "The upper limit value", maxValueInfo));
            defaultInputData.push(new calculationDataNumber_1.CalculationDataNumber(this.inputName2, 0, "The lower limit value", minValueInfo));
            defaultInputData.push(new calculationDataPoints_1.CalculationDataPoints(this.inputName3, "", new Array(), "The signal to be limited", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            return defaultInputData;
        };
        LimitCalculator.prototype.getDefaultOutputData = function () {
            var defaultOutputData = _super.prototype.getDefaultOutputData.call(this);
            defaultOutputData.push(new calculationDataPoints_1.CalculationDataPoints(this.outputName, this.outputValue, new Array()));
            return defaultOutputData;
        };
        LimitCalculator.prototype.verifyCalculationInputData = function () {
            _super.prototype.verifyCalculationInputData.call(this);
            var calculationInputDataContainer = this.getCalculationInputDataContainer();
            var upperLimit = calculationInputDataContainer[0];
            var lowerLimit = calculationInputDataContainer[1];
            var inputSignal = calculationInputDataContainer[2];
            if (upperLimit == undefined || !calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(upperLimit.data)) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.MissingOrInvalidInput, [this.inputName1]);
            }
            if (lowerLimit == undefined || !calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(lowerLimit.data)) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.MissingOrInvalidInput, [this.inputName2]);
            }
            if (inputSignal == undefined || !calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(inputSignal.data)) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.MissingOrInvalidInput, [this.inputName3]);
            }
            if (this.hasErrors()) {
                return;
            }
            if (upperLimit.data < lowerLimit.data) {
                this.addError('Calculation Error: Lower limit must not be bigger than upper limit.');
            }
        };
        LimitCalculator.prototype.executeAlgorithm = function () {
            _super.prototype.executeAlgorithm.call(this);
            var calculationInputDataContainer = this.getCalculationInputDataContainer();
            var result = new Array();
            var upperLimit = calculationInputDataContainer[0];
            var lowerLimit = calculationInputDataContainer[1];
            var inputSignal = calculationInputDataContainer[2];
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(upperLimit.data) && calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(lowerLimit.data) && calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(inputSignal.data)) {
                result = this.maxMinSignal(upperLimit.data, lowerLimit.data, inputSignal.data);
            }
            this.addCalculationOutputData({
                data: result,
                value: this.outputValue,
                name: this.outputName
            });
        };
        /**
         * Calculates output data
         *
         * @private
         * @param {number} minValue
         * @param {number} maxValue
         * @param {Array<IPoint>} inputSignal
         * @returns {Array<IPoint>}
         * @memberof LimitCalculator
         */
        LimitCalculator.prototype.maxMinSignal = function (maxValue, minValue, inputSignal) {
            var points = new Array();
            for (var i = 0; i < inputSignal.length; i++) {
                var x = inputSignal[i].x;
                var y = inputSignal[i].y;
                if (inputSignal[i].y > maxValue) {
                    y = maxValue;
                }
                else if (inputSignal[i].y < minValue) {
                    y = minValue;
                }
                points.push(new point_1.Point(x, y));
            }
            return points;
        };
        return LimitCalculator;
    }(calculatorBase_1.CalculatorBase));
    exports.LimitCalculator = LimitCalculator;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGltaXRDYWxjdWxhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdG9ycy9saW1pdENhbGN1bGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVNBO1FBQXFDLG1DQUFjO1FBUS9DO1lBQUEsWUFDSSxrQkFBTSxTQUFTLEVBQUUsT0FBTyxFQUFFLDBEQUEwRCxDQUFDLFNBQ3hGO1lBUk8sZ0JBQVUsR0FBVyxhQUFhLENBQUM7WUFDbkMsZ0JBQVUsR0FBVyxhQUFhLENBQUM7WUFDbkMsZ0JBQVUsR0FBVyxjQUFjLENBQUM7WUFDcEMsZ0JBQVUsR0FBVyxlQUFlLENBQUM7WUFDckMsaUJBQVcsR0FBVyxPQUFPLENBQUM7O1FBSXRDLENBQUM7UUFFTSw2Q0FBbUIsR0FBMUI7WUFDSSxJQUFJLGdCQUFnQixHQUFHLGlCQUFNLG1CQUFtQixXQUFFLENBQUM7WUFFbkQsSUFBSSxZQUFZLEdBQUcsSUFBSSx1REFBMEIsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDaEUsSUFBSSxZQUFZLEdBQUcsSUFBSSx1REFBMEIsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFFaEUsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksNkNBQXFCLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsdUJBQXVCLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUM1RyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSw2Q0FBcUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSx1QkFBdUIsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQzVHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLDZDQUFxQixDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRSxF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LENBQUM7YUFDbEY7WUFFRCxJQUFJLENBQUMsd0JBQXdCLENBQUM7Z0JBQzFCLElBQUksRUFBRSxNQUFNO2dCQUNaLEtBQUssRUFBRSxJQUFJLENBQUMsV0FBVztnQkFDdkIsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVO2FBQ3hCLENBQUMsQ0FBQztRQUNQLENBQUM7UUFFRDs7Ozs7Ozs7O1dBU0c7UUFDSyxzQ0FBWSxHQUFwQixVQUFxQixRQUFnQixFQUFFLFFBQWdCLEVBQUUsV0FBMEI7WUFDL0UsSUFBSSxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQVUsQ0FBQztZQUNqQyxLQUFJLElBQUksQ0FBQyxHQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztnQkFDdEMsSUFBSSxDQUFDLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekIsSUFBSSxDQUFDLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekIsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsRUFBQztvQkFDNUIsQ0FBQyxHQUFHLFFBQVEsQ0FBQztpQkFDaEI7cUJBQ0ksSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsRUFBQztvQkFDakMsQ0FBQyxHQUFHLFFBQVEsQ0FBQztpQkFDaEI7Z0JBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLGFBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNoQztZQUNELE9BQU8sTUFBTSxDQUFDO1FBQ2xCLENBQUM7UUFFTCxzQkFBQztJQUFELENBQUMsQUExR0QsQ0FBcUMsK0JBQWMsR0EwR2xEO0lBMUdZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVBvaW50IH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi4vLi4vcG9pbnRcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhTnVtYmVyIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YU51bWJlclwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFQb2ludHMgfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhUG9pbnRzXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0b3JCYXNlLCBFcnJvck1lc3NhZ2VUeXBlIH0gZnJvbSBcIi4vY2FsY3VsYXRvckJhc2VcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRvckhlbHBlciB9IGZyb20gXCIuL2NhbGN1bGF0b3JIZWxwZXJcIjtcclxuaW1wb3J0IHsgVENhbGN1bGF0aW9uRGF0YSB9IGZyb20gXCIuLi9jYWxjdWxhdGlvbkRhdGFcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBMaW1pdENhbGN1bGF0b3IgZXh0ZW5kcyBDYWxjdWxhdG9yQmFzZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBpbnB1dE5hbWUxOiBzdHJpbmcgPSBcIlVwcGVyIGxpbWl0XCI7XHJcbiAgICBwcml2YXRlIGlucHV0TmFtZTI6IHN0cmluZyA9IFwiTG93ZXIgbGltaXRcIjtcclxuICAgIHByaXZhdGUgaW5wdXROYW1lMzogc3RyaW5nID0gXCJJbnB1dCBzaWduYWxcIjtcclxuICAgIHByaXZhdGUgb3V0cHV0TmFtZTogc3RyaW5nID0gXCJPdXRwdXQgc2lnbmFsXCI7XHJcbiAgICBwcml2YXRlIG91dHB1dFZhbHVlOiBzdHJpbmcgPSBcImxpbWl0XCI7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFwibWF4IG1pblwiLCBcIkxpbWl0XCIsIFwiTGltaXRzIHRoZSBzaWduYWwgdG8gbWF4aW11bSBhbmQgbWluaW11bSBjb25zdGFudCB2YWx1ZXNcIik7IFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXREZWZhdWx0SW5wdXREYXRhKCk6IEFycmF5PFRDYWxjdWxhdGlvbkRhdGE+e1xyXG4gICAgICAgIGxldCBkZWZhdWx0SW5wdXREYXRhID0gc3VwZXIuZ2V0RGVmYXVsdElucHV0RGF0YSgpO1xyXG5cclxuICAgICAgICBsZXQgbWF4VmFsdWVJbmZvID0gbmV3IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvKGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgbGV0IG1pblZhbHVlSW5mbyA9IG5ldyBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mbyhmYWxzZSwgZmFsc2UpO1xyXG5cclxuICAgICAgICBkZWZhdWx0SW5wdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YU51bWJlcih0aGlzLmlucHV0TmFtZTEsIDEsIFwiVGhlIHVwcGVyIGxpbWl0IHZhbHVlXCIsIG1heFZhbHVlSW5mbykpO1xyXG4gICAgICAgIGRlZmF1bHRJbnB1dERhdGEucHVzaChuZXcgQ2FsY3VsYXRpb25EYXRhTnVtYmVyKHRoaXMuaW5wdXROYW1lMiwgMCwgXCJUaGUgbG93ZXIgbGltaXQgdmFsdWVcIiwgbWluVmFsdWVJbmZvKSk7XHJcbiAgICAgICAgZGVmYXVsdElucHV0RGF0YS5wdXNoKG5ldyBDYWxjdWxhdGlvbkRhdGFQb2ludHModGhpcy5pbnB1dE5hbWUzLCBcIlwiLCBuZXcgQXJyYXk8SVBvaW50PigpLCBcIlRoZSBzaWduYWwgdG8gYmUgbGltaXRlZFwiLCBuZXcgQ2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm8oZmFsc2UsIHRydWUpKSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZhdWx0SW5wdXREYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXREZWZhdWx0T3V0cHV0RGF0YSgpOiBBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+IHtcclxuICAgICAgICBsZXQgZGVmYXVsdE91dHB1dERhdGEgPSBzdXBlci5nZXREZWZhdWx0T3V0cHV0RGF0YSgpO1xyXG5cclxuICAgICAgICBkZWZhdWx0T3V0cHV0RGF0YS5wdXNoKG5ldyBDYWxjdWxhdGlvbkRhdGFQb2ludHModGhpcy5vdXRwdXROYW1lLCB0aGlzLm91dHB1dFZhbHVlLCBuZXcgQXJyYXk8SVBvaW50PigpKSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZhdWx0T3V0cHV0RGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgdmVyaWZ5Q2FsY3VsYXRpb25JbnB1dERhdGEoKSB7XHJcbiAgICAgICAgc3VwZXIudmVyaWZ5Q2FsY3VsYXRpb25JbnB1dERhdGEoKTtcclxuXHJcbiAgICAgICAgbGV0IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyID0gdGhpcy5nZXRDYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lcigpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCB1cHBlckxpbWl0ID0gY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXJbMF07XHJcbiAgICAgICAgbGV0IGxvd2VyTGltaXQgPSBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lclsxXTtcclxuICAgICAgICBsZXQgaW5wdXRTaWduYWwgPSBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lclsyXTtcclxuICAgICAgICBcclxuICAgICAgICBpZih1cHBlckxpbWl0ID09IHVuZGVmaW5lZCB8fCAhQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzTnVtYmVyKHVwcGVyTGltaXQuZGF0YSkpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvckJ5VHlwZShFcnJvck1lc3NhZ2VUeXBlLk1pc3NpbmdPckludmFsaWRJbnB1dCwgW3RoaXMuaW5wdXROYW1lMV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihsb3dlckxpbWl0ID09IHVuZGVmaW5lZCB8fCAhQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzTnVtYmVyKGxvd2VyTGltaXQuZGF0YSkpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvckJ5VHlwZShFcnJvck1lc3NhZ2VUeXBlLk1pc3NpbmdPckludmFsaWRJbnB1dCwgW3RoaXMuaW5wdXROYW1lMl0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihpbnB1dFNpZ25hbCA9PSB1bmRlZmluZWQgfHwgIUNhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc1NpZ25hbChpbnB1dFNpZ25hbC5kYXRhKSkge1xyXG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yQnlUeXBlKEVycm9yTWVzc2FnZVR5cGUuTWlzc2luZ09ySW52YWxpZElucHV0LCBbdGhpcy5pbnB1dE5hbWUzXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuaGFzRXJyb3JzKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih1cHBlckxpbWl0LmRhdGEgPCBsb3dlckxpbWl0LmRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvcignQ2FsY3VsYXRpb24gRXJyb3I6IExvd2VyIGxpbWl0IG11c3Qgbm90IGJlIGJpZ2dlciB0aGFuIHVwcGVyIGxpbWl0LicpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZXhlY3V0ZUFsZ29yaXRobSgpIHtcclxuICAgICAgICBzdXBlci5leGVjdXRlQWxnb3JpdGhtKCk7XHJcblxyXG4gICAgICAgIGxldCBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lciA9IHRoaXMuZ2V0Q2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXIoKTtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IEFycmF5PElQb2ludD4oKTtcclxuXHJcbiAgICAgICAgbGV0IHVwcGVyTGltaXQgPSBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lclswXTtcclxuICAgICAgICBsZXQgbG93ZXJMaW1pdCA9IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyWzFdO1xyXG4gICAgICAgIGxldCBpbnB1dFNpZ25hbCA9IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyWzJdO1xyXG5cclxuICAgICAgICBpZihDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNOdW1iZXIodXBwZXJMaW1pdC5kYXRhKSAmJiBDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNOdW1iZXIobG93ZXJMaW1pdC5kYXRhKSAmJiBDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNTaWduYWwoaW5wdXRTaWduYWwuZGF0YSkpIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5tYXhNaW5TaWduYWwodXBwZXJMaW1pdC5kYXRhLCBsb3dlckxpbWl0LmRhdGEsIGlucHV0U2lnbmFsLmRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5hZGRDYWxjdWxhdGlvbk91dHB1dERhdGEoe1xyXG4gICAgICAgICAgICBkYXRhOiByZXN1bHQsXHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLm91dHB1dFZhbHVlLFxyXG4gICAgICAgICAgICBuYW1lOiB0aGlzLm91dHB1dE5hbWVcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0ZXMgb3V0cHV0IGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1pblZhbHVlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbWF4VmFsdWVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SVBvaW50Pn0gaW5wdXRTaWduYWxcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxJUG9pbnQ+fVxyXG4gICAgICogQG1lbWJlcm9mIExpbWl0Q2FsY3VsYXRvclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG1heE1pblNpZ25hbChtYXhWYWx1ZTogbnVtYmVyLCBtaW5WYWx1ZTogbnVtYmVyLCBpbnB1dFNpZ25hbDogQXJyYXk8SVBvaW50Pik6IEFycmF5PElQb2ludD57XHJcbiAgICAgICAgbGV0IHBvaW50cyA9IG5ldyBBcnJheTxJUG9pbnQ+KCk7XHJcbiAgICAgICAgZm9yKGxldCBpID0wOyBpIDwgaW5wdXRTaWduYWwubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgeCA9IGlucHV0U2lnbmFsW2ldLng7XHJcbiAgICAgICAgICAgIGxldCB5ID0gaW5wdXRTaWduYWxbaV0ueTtcclxuICAgICAgICAgICAgaWYgKGlucHV0U2lnbmFsW2ldLnkgPiBtYXhWYWx1ZSl7XHJcbiAgICAgICAgICAgICAgICB5ID0gbWF4VmFsdWU7XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGlucHV0U2lnbmFsW2ldLnkgPCBtaW5WYWx1ZSl7XHJcbiAgICAgICAgICAgICAgICB5ID0gbWluVmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcG9pbnRzLnB1c2gobmV3IFBvaW50KHgsIHkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBvaW50cztcclxuICAgIH1cclxuXHJcbn1cclxuXHJcblxyXG5cclxuIl19