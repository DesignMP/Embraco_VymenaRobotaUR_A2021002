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
define(["require", "exports", "../../point", "../calculationDataPoints", "../calculationDataDisplayInfo", "./calculatorBase", "../calculationDataNumberOrPoints", "./calculatorHelper"], function (require, exports, point_1, calculationDataPoints_1, calculationDataDisplayInfo_1, calculatorBase_1, calculationDataNumberOrPoints_1, calculatorHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MinCalculator = /** @class */ (function (_super) {
        __extends(MinCalculator, _super);
        function MinCalculator() {
            var _this = _super.call(this, "min", "Min (a,b)", "Minimum value between two signals or one signal and one constant") || this;
            _this.inputName1 = "Input signal/constant a";
            _this.inputName2 = "Input signal/constant b";
            _this.outputName = "Output signal";
            _this.outputValue = "min";
            return _this;
        }
        MinCalculator.prototype.getDefaultInputData = function () {
            var defaultInputData = _super.prototype.getDefaultInputData.call(this);
            defaultInputData.push(new calculationDataNumberOrPoints_1.CalculationDataNumberOrPoints(this.inputName1, 0, "Signal or constant a", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            defaultInputData.push(new calculationDataNumberOrPoints_1.CalculationDataNumberOrPoints(this.inputName2, 0, "Signal or constant b", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            return defaultInputData;
        };
        MinCalculator.prototype.getDefaultOutputData = function () {
            var defaultOutputData = _super.prototype.getDefaultOutputData.call(this);
            defaultOutputData.push(new calculationDataPoints_1.CalculationDataPoints(this.outputName, this.outputValue, new Array()));
            return defaultOutputData;
        };
        MinCalculator.prototype.prepareCalculationData = function () {
            _super.prototype.prepareCalculationData.call(this);
            var calculationInputDataContainer = this.getCalculationInputDataContainer();
            var inputSignalA = calculationInputDataContainer[0];
            var inputSignalB = calculationInputDataContainer[1];
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(inputSignalA.data) && calculatorHelper_1.CalculatorHelper.isValidSignal(inputSignalA.data)
                && calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(inputSignalB.data) && calculatorHelper_1.CalculatorHelper.isValidSignal(inputSignalB.data)) {
                var preparedPointArrays = calculatorHelper_1.CalculatorHelper.filterMatchingPointsByXvalue({
                    pointArray1: inputSignalA.data,
                    pointArray2: inputSignalB.data
                });
                calculationInputDataContainer[0].data = preparedPointArrays.pointArray1;
                calculationInputDataContainer[1].data = preparedPointArrays.pointArray2;
                if (!calculatorHelper_1.CalculatorHelper.isValidSignal(inputSignalA.data) || !calculatorHelper_1.CalculatorHelper.isValidSignal(inputSignalB.data)) {
                    this.addErrorByType(calculatorBase_1.ErrorMessageType.NotEnoughCommonTimestamps, [inputSignalA.name, inputSignalB.name]);
                }
            }
        };
        MinCalculator.prototype.verifyCalculationInputData = function () {
            _super.prototype.verifyCalculationInputData.call(this);
            var calculationInputDataContainer = this.getCalculationInputDataContainer();
            var inputSignalA = calculationInputDataContainer[0];
            var inputSignalB = calculationInputDataContainer[1];
            if (inputSignalA == undefined || calculatorHelper_1.CalculatorHelper.calculationInputDataIsString(inputSignalA.data)) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.MissingOrInvalidInput, [this.inputName1]);
            }
            if (inputSignalB == undefined || calculatorHelper_1.CalculatorHelper.calculationInputDataIsString(inputSignalB.data)) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.MissingOrInvalidInput, [this.inputName2]);
            }
            if (this.hasErrors()) {
                return;
            }
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(inputSignalA.data) && calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(inputSignalB.data)) {
                this.addError("Calculation Error: It is not supported to operate with just two numbers!");
            }
        };
        MinCalculator.prototype.executeAlgorithm = function () {
            _super.prototype.executeAlgorithm.call(this);
            var calculationInputDataContainer = this.getCalculationInputDataContainer();
            var result = new Array();
            var inputSignalA = calculationInputDataContainer[0];
            var inputSignalB = calculationInputDataContainer[1];
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(inputSignalA.data) && calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(inputSignalB.data)) {
                result = this.minTwoSignals(inputSignalA.data, inputSignalB.data);
            }
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(inputSignalA.data) && calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(inputSignalB.data)) {
                result = this.minConstToSignal(inputSignalA.data, inputSignalB.data);
            }
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(inputSignalA.data) && calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(inputSignalB.data)) {
                result = this.minConstToSignal(inputSignalB.data, inputSignalA.data);
            }
            this.addCalculationOutputData({
                data: result,
                value: this.outputValue,
                name: this.outputName
            });
        };
        /**
         * Calculates output signal when input is Signal + Signal
         *
         * @private
         * @param {Array<IPoint>} inputSignal1
         * @param {Array<IPoint>} inputSignal2
         * @returns {Array<IPoint>}
         * @memberof MinCalculator
         */
        MinCalculator.prototype.minTwoSignals = function (inputSignal1, inputSignal2) {
            var points = new Array();
            if (inputSignal1.length == inputSignal2.length) { // Add only signals with same sample count
                for (var i = 0; i < inputSignal1.length; i++) {
                    var newX = inputSignal1[i].x;
                    var newY = inputSignal1[i].y;
                    if (newY > inputSignal2[i].y) {
                        newY = inputSignal2[i].y;
                    }
                    // check if signal two has same x value
                    if (inputSignal2[i].x == newX) {
                        points.push(new point_1.Point(newX, newY));
                    }
                    else {
                        // Add of two different signals(different x values) currently not possible
                        this.addError("Calculation Error: The input signals don't have equal x (time) values!");
                        return new Array();
                    }
                }
            }
            else {
                this.addError("Calculation Error: The input signals don't have the same number of points!");
            }
            return points;
        };
        /**
         * Calculates output signal when input is Signal + Constant
         *
         * @private
         * @param {Array<IPoint>} inputSignal
         * @param {number} inputNumber
         * @returns {Array<IPoint>}
         * @memberof MinCalculator
         */
        MinCalculator.prototype.minConstToSignal = function (inputSignal, inputNumber) {
            var points = new Array();
            for (var i = 0; i < inputSignal.length; i++) {
                var x = inputSignal[i].x;
                var y = inputSignal[i].y;
                if (y > inputNumber) {
                    y = inputNumber;
                }
                points.push(new point_1.Point(x, y));
            }
            return points;
        };
        return MinCalculator;
    }(calculatorBase_1.CalculatorBase));
    exports.MinCalculator = MinCalculator;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluQ2FsY3VsYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRvcnMvbWluQ2FsY3VsYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBU0E7UUFBbUMsaUNBQWM7UUFPN0M7WUFBQSxZQUNJLGtCQUFNLEtBQUssRUFBRSxXQUFXLEVBQUUsa0VBQWtFLENBQUMsU0FDaEc7WUFQTyxnQkFBVSxHQUFVLHlCQUF5QixDQUFDO1lBQzlDLGdCQUFVLEdBQVUseUJBQXlCLENBQUM7WUFDOUMsZ0JBQVUsR0FBVyxlQUFlLENBQUM7WUFDckMsaUJBQVcsR0FBRyxLQUFLLENBQUM7O1FBSTVCLENBQUM7UUFFTSwyQ0FBbUIsR0FBMUI7WUFDSSxJQUFJLGdCQUFnQixHQUFHLGlCQUFNLG1CQUFtQixXQUFFLENBQUM7WUFFbkQsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksNkRBQTZCLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsc0JBQXNCLEVBQUUsSUFBSSx1REFBMEIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xKLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLDZEQUE2QixDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLHNCQUFzQixFQUFFLElBQUksdURBQTBCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVsSixPQUFPLGdCQUFnQixDQUFDO1FBQzVCLENBQUM7UUFFTSw0Q0FBb0IsR0FBM0I7WUFDSSxJQUFJLGlCQUFpQixHQUFHLGlCQUFNLG9CQUFvQixXQUFFLENBQUM7WUFFckQsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksNkNBQXFCLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFB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TSxHQUFHLElBQUksS0FBSyxFQUFVLENBQUM7WUFDakMsS0FBSSxJQUFJLENBQUMsR0FBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQ3RDLElBQUksQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxHQUFHLFdBQVcsRUFBRTtvQkFDakIsQ0FBQyxHQUFHLFdBQVcsQ0FBQztpQkFDbkI7Z0JBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLGFBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNoQztZQUNELE9BQU8sTUFBTSxDQUFDO1FBQ2xCLENBQUM7UUFDTCxvQkFBQztJQUFELENBQUMsQUFoS0QsQ0FBbUMsK0JBQWMsR0FnS2hEO0lBaEtZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVBvaW50IH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi4vLi4vcG9pbnRcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhUG9pbnRzIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YVBvaW50c1wiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mbyB9IGZyb20gXCIuLi9jYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mb1wiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdG9yQmFzZSwgRXJyb3JNZXNzYWdlVHlwZSB9IGZyb20gXCIuL2NhbGN1bGF0b3JCYXNlXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0b3JIZWxwZXIgfSBmcm9tIFwiLi9jYWxjdWxhdG9ySGVscGVyXCI7XHJcbmltcG9ydCB7IFRDYWxjdWxhdGlvbkRhdGEgfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTWluQ2FsY3VsYXRvciBleHRlbmRzIENhbGN1bGF0b3JCYXNlIHtcclxuXHJcbiAgICBwcml2YXRlIGlucHV0TmFtZTE6c3RyaW5nID0gXCJJbnB1dCBzaWduYWwvY29uc3RhbnQgYVwiO1xyXG4gICAgcHJpdmF0ZSBpbnB1dE5hbWUyOnN0cmluZyA9IFwiSW5wdXQgc2lnbmFsL2NvbnN0YW50IGJcIjtcclxuICAgIHByaXZhdGUgb3V0cHV0TmFtZTogc3RyaW5nID0gXCJPdXRwdXQgc2lnbmFsXCI7XHJcbiAgICBwcml2YXRlIG91dHB1dFZhbHVlID0gXCJtaW5cIjtcclxuICAgIFxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFwibWluXCIsIFwiTWluIChhLGIpXCIsIFwiTWluaW11bSB2YWx1ZSBiZXR3ZWVuIHR3byBzaWduYWxzIG9yIG9uZSBzaWduYWwgYW5kIG9uZSBjb25zdGFudFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0RGVmYXVsdElucHV0RGF0YSgpOiBBcnJheTxUQ2FsY3VsYXRpb25EYXRhPiB7XHJcbiAgICAgICAgbGV0IGRlZmF1bHRJbnB1dERhdGEgPSBzdXBlci5nZXREZWZhdWx0SW5wdXREYXRhKCk7XHJcblxyXG4gICAgICAgIGRlZmF1bHRJbnB1dERhdGEucHVzaChuZXcgQ2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHModGhpcy5pbnB1dE5hbWUxLCAwLCBcIlNpZ25hbCBvciBjb25zdGFudCBhXCIsIG5ldyBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mbyhmYWxzZSwgdHJ1ZSkpKTtcclxuICAgICAgICBkZWZhdWx0SW5wdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzKHRoaXMuaW5wdXROYW1lMiwgMCwgXCJTaWduYWwgb3IgY29uc3RhbnQgYlwiLCBuZXcgQ2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm8oZmFsc2UsIHRydWUpKSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZhdWx0SW5wdXREYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXREZWZhdWx0T3V0cHV0RGF0YSgpOiBBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+IHtcclxuICAgICAgICBsZXQgZGVmYXVsdE91dHB1dERhdGEgPSBzdXBlci5nZXREZWZhdWx0T3V0cHV0RGF0YSgpO1xyXG5cclxuICAgICAgICBkZWZhdWx0T3V0cHV0RGF0YS5wdXNoKG5ldyBDYWxjdWxhdGlvbkRhdGFQb2ludHModGhpcy5vdXRwdXROYW1lLCB0aGlzLm91dHB1dFZhbHVlLCBuZXcgQXJyYXk8SVBvaW50PigpKSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZhdWx0T3V0cHV0RGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgcHJlcGFyZUNhbGN1bGF0aW9uRGF0YSgpIHtcclxuICAgICAgICBzdXBlci5wcmVwYXJlQ2FsY3VsYXRpb25EYXRhKCk7XHJcblxyXG4gICAgICAgIGxldCBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lciA9IHRoaXMuZ2V0Q2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXIoKTtcclxuXHJcbiAgICAgICAgbGV0IGlucHV0U2lnbmFsQSA9IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyWzBdO1xyXG4gICAgICAgIGxldCBpbnB1dFNpZ25hbEIgPSBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lclsxXTtcclxuXHJcbiAgICAgICAgaWYoQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU2lnbmFsKGlucHV0U2lnbmFsQS5kYXRhKSAmJiBDYWxjdWxhdG9ySGVscGVyLmlzVmFsaWRTaWduYWwoaW5wdXRTaWduYWxBLmRhdGEpXHJcbiAgICAgICAgICAgICYmIENhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc1NpZ25hbChpbnB1dFNpZ25hbEIuZGF0YSkgJiYgQ2FsY3VsYXRvckhlbHBlci5pc1ZhbGlkU2lnbmFsKGlucHV0U2lnbmFsQi5kYXRhKSkge1xyXG5cclxuICAgICAgICAgICAgbGV0IHByZXBhcmVkUG9pbnRBcnJheXMgPSBDYWxjdWxhdG9ySGVscGVyLmZpbHRlck1hdGNoaW5nUG9pbnRzQnlYdmFsdWUoeyBcclxuICAgICAgICAgICAgICAgIHBvaW50QXJyYXkxOiBpbnB1dFNpZ25hbEEuZGF0YSwgXHJcbiAgICAgICAgICAgICAgICBwb2ludEFycmF5MjogaW5wdXRTaWduYWxCLmRhdGFcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lclswXS5kYXRhID0gcHJlcGFyZWRQb2ludEFycmF5cy5wb2ludEFycmF5MTtcclxuICAgICAgICAgICAgY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXJbMV0uZGF0YSA9IHByZXBhcmVkUG9pbnRBcnJheXMucG9pbnRBcnJheTI7XHJcblxyXG4gICAgICAgICAgICBpZighQ2FsY3VsYXRvckhlbHBlci5pc1ZhbGlkU2lnbmFsKGlucHV0U2lnbmFsQS5kYXRhKSB8fCAhQ2FsY3VsYXRvckhlbHBlci5pc1ZhbGlkU2lnbmFsKGlucHV0U2lnbmFsQi5kYXRhKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRFcnJvckJ5VHlwZShFcnJvck1lc3NhZ2VUeXBlLk5vdEVub3VnaENvbW1vblRpbWVzdGFtcHMsIFtpbnB1dFNpZ25hbEEubmFtZSwgaW5wdXRTaWduYWxCLm5hbWVdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgdmVyaWZ5Q2FsY3VsYXRpb25JbnB1dERhdGEoKSB7XHJcbiAgICAgICAgc3VwZXIudmVyaWZ5Q2FsY3VsYXRpb25JbnB1dERhdGEoKTtcclxuXHJcbiAgICAgICAgbGV0IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyID0gdGhpcy5nZXRDYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lcigpO1xyXG5cclxuICAgICAgICBsZXQgaW5wdXRTaWduYWxBID0gY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXJbMF07XHJcbiAgICAgICAgbGV0IGlucHV0U2lnbmFsQiA9IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyWzFdO1xyXG5cclxuICAgICAgICBpZihpbnB1dFNpZ25hbEEgPT0gdW5kZWZpbmVkIHx8IENhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc1N0cmluZyhpbnB1dFNpZ25hbEEuZGF0YSkpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvckJ5VHlwZShFcnJvck1lc3NhZ2VUeXBlLk1pc3NpbmdPckludmFsaWRJbnB1dCwgW3RoaXMuaW5wdXROYW1lMV0pO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgaWYoaW5wdXRTaWduYWxCID09IHVuZGVmaW5lZCB8fCBDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNTdHJpbmcoaW5wdXRTaWduYWxCLmRhdGEpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JCeVR5cGUoRXJyb3JNZXNzYWdlVHlwZS5NaXNzaW5nT3JJbnZhbGlkSW5wdXQsIFt0aGlzLmlucHV0TmFtZTJdKTtcclxuICAgICAgICB9IFxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuaGFzRXJyb3JzKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZihDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNOdW1iZXIoaW5wdXRTaWduYWxBLmRhdGEpICYmIENhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc051bWJlcihpbnB1dFNpZ25hbEIuZGF0YSkpIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3IoXCJDYWxjdWxhdGlvbiBFcnJvcjogSXQgaXMgbm90IHN1cHBvcnRlZCB0byBvcGVyYXRlIHdpdGgganVzdCB0d28gbnVtYmVycyFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBleGVjdXRlQWxnb3JpdGhtKCkge1xyXG4gICAgICAgIHN1cGVyLmV4ZWN1dGVBbGdvcml0aG0oKTtcclxuXHJcbiAgICAgICAgbGV0IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyID0gdGhpcy5nZXRDYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lcigpO1xyXG4gICAgICAgIGxldCByZXN1bHQ6IEFycmF5PElQb2ludD4gPSBuZXcgQXJyYXk8SVBvaW50PigpO1xyXG5cclxuICAgICAgICBsZXQgaW5wdXRTaWduYWxBID0gY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXJbMF07XHJcbiAgICAgICAgbGV0IGlucHV0U2lnbmFsQiA9IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyWzFdO1xyXG5cclxuICAgICAgICBpZihDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNTaWduYWwoaW5wdXRTaWduYWxBLmRhdGEpICYmIENhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc1NpZ25hbChpbnB1dFNpZ25hbEIuZGF0YSkpe1xyXG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLm1pblR3b1NpZ25hbHMoaW5wdXRTaWduYWxBLmRhdGEsIGlucHV0U2lnbmFsQi5kYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU2lnbmFsKGlucHV0U2lnbmFsQS5kYXRhKSAmJiBDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNOdW1iZXIoaW5wdXRTaWduYWxCLmRhdGEpKXtcclxuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5taW5Db25zdFRvU2lnbmFsKGlucHV0U2lnbmFsQS5kYXRhLCBpbnB1dFNpZ25hbEIuZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKENhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc051bWJlcihpbnB1dFNpZ25hbEEuZGF0YSkgJiYgQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU2lnbmFsKGlucHV0U2lnbmFsQi5kYXRhKSl7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMubWluQ29uc3RUb1NpZ25hbChpbnB1dFNpZ25hbEIuZGF0YSwgaW5wdXRTaWduYWxBLmRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5hZGRDYWxjdWxhdGlvbk91dHB1dERhdGEoe1xyXG4gICAgICAgICAgICBkYXRhOiByZXN1bHQsXHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLm91dHB1dFZhbHVlLFxyXG4gICAgICAgICAgICBuYW1lOiB0aGlzLm91dHB1dE5hbWVcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0ZXMgb3V0cHV0IHNpZ25hbCB3aGVuIGlucHV0IGlzIFNpZ25hbCArIFNpZ25hbFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElQb2ludD59IGlucHV0U2lnbmFsMVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxJUG9pbnQ+fSBpbnB1dFNpZ25hbDJcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxJUG9pbnQ+fVxyXG4gICAgICogQG1lbWJlcm9mIE1pbkNhbGN1bGF0b3JcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBtaW5Ud29TaWduYWxzKGlucHV0U2lnbmFsMTogQXJyYXk8SVBvaW50PiwgaW5wdXRTaWduYWwyOiBBcnJheTxJUG9pbnQ+KTogQXJyYXk8SVBvaW50PntcclxuICAgICAgICBsZXQgcG9pbnRzID0gbmV3IEFycmF5PElQb2ludD4oKTtcclxuICAgICAgICBpZihpbnB1dFNpZ25hbDEubGVuZ3RoID09IGlucHV0U2lnbmFsMi5sZW5ndGgpeyAvLyBBZGQgb25seSBzaWduYWxzIHdpdGggc2FtZSBzYW1wbGUgY291bnRcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGlucHV0U2lnbmFsMS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3WCA9IGlucHV0U2lnbmFsMVtpXS54O1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld1kgPSBpbnB1dFNpZ25hbDFbaV0ueTtcclxuICAgICAgICAgICAgICAgIGlmIChuZXdZID4gaW5wdXRTaWduYWwyW2ldLnkpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXdZID0gaW5wdXRTaWduYWwyW2ldLnk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiBzaWduYWwgdHdvIGhhcyBzYW1lIHggdmFsdWVcclxuICAgICAgICAgICAgICAgIGlmKGlucHV0U2lnbmFsMltpXS54ID09IG5ld1gpe1xyXG4gICAgICAgICAgICAgICAgICAgIHBvaW50cy5wdXNoKG5ldyBQb2ludChuZXdYLCBuZXdZKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEFkZCBvZiB0d28gZGlmZmVyZW50IHNpZ25hbHMoZGlmZmVyZW50IHggdmFsdWVzKSBjdXJyZW50bHkgbm90IHBvc3NpYmxlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRFcnJvcihcIkNhbGN1bGF0aW9uIEVycm9yOiBUaGUgaW5wdXQgc2lnbmFscyBkb24ndCBoYXZlIGVxdWFsIHggKHRpbWUpIHZhbHVlcyFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBBcnJheTxJUG9pbnQ+KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvcihcIkNhbGN1bGF0aW9uIEVycm9yOiBUaGUgaW5wdXQgc2lnbmFscyBkb24ndCBoYXZlIHRoZSBzYW1lIG51bWJlciBvZiBwb2ludHMhXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcG9pbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsY3VsYXRlcyBvdXRwdXQgc2lnbmFsIHdoZW4gaW5wdXQgaXMgU2lnbmFsICsgQ29uc3RhbnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxJUG9pbnQ+fSBpbnB1dFNpZ25hbFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGlucHV0TnVtYmVyXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8SVBvaW50Pn1cclxuICAgICAqIEBtZW1iZXJvZiBNaW5DYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbWluQ29uc3RUb1NpZ25hbChpbnB1dFNpZ25hbDogQXJyYXk8SVBvaW50PiwgaW5wdXROdW1iZXI6IG51bWJlcik6IEFycmF5PElQb2ludD57XHJcbiAgICAgICAgbGV0IHBvaW50cyA9IG5ldyBBcnJheTxJUG9pbnQ+KCk7XHJcbiAgICAgICAgZm9yKGxldCBpID0wOyBpIDwgaW5wdXRTaWduYWwubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgeCA9IGlucHV0U2lnbmFsW2ldLng7XHJcbiAgICAgICAgICAgIGxldCB5ID0gaW5wdXRTaWduYWxbaV0ueTtcclxuICAgICAgICAgICAgaWYgKHkgPiBpbnB1dE51bWJlcikge1xyXG4gICAgICAgICAgICAgICAgeSA9IGlucHV0TnVtYmVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHBvaW50cy5wdXNoKG5ldyBQb2ludCh4LCB5KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwb2ludHM7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuXHJcbiJdfQ==