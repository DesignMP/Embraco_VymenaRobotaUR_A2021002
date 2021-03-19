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
    var MaxCalculator = /** @class */ (function (_super) {
        __extends(MaxCalculator, _super);
        function MaxCalculator() {
            var _this = _super.call(this, "max", "Max (a,b)", "Maximum value between two signals or one signal and one constant") || this;
            _this.inputName1 = "Input signal/constant a";
            _this.inputName2 = "Input signal/constant b";
            _this.outputName = "Output signal";
            _this.outputValue = "max";
            return _this;
        }
        MaxCalculator.prototype.getDefaultInputData = function () {
            var defaultInputData = _super.prototype.getDefaultInputData.call(this);
            defaultInputData.push(new calculationDataNumberOrPoints_1.CalculationDataNumberOrPoints(this.inputName1, 0, "Signal or constant a", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            defaultInputData.push(new calculationDataNumberOrPoints_1.CalculationDataNumberOrPoints(this.inputName2, 0, "Signal or constant b", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            return defaultInputData;
        };
        MaxCalculator.prototype.getDefaultOutputData = function () {
            var defaultOutputData = _super.prototype.getDefaultOutputData.call(this);
            defaultOutputData.push(new calculationDataPoints_1.CalculationDataPoints(this.outputName, this.outputValue, new Array()));
            return defaultOutputData;
        };
        MaxCalculator.prototype.prepareCalculationData = function () {
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
                inputSignalA.data = preparedPointArrays.pointArray1;
                inputSignalB.data = preparedPointArrays.pointArray2;
                if (!calculatorHelper_1.CalculatorHelper.isValidSignal(inputSignalA.data) || !calculatorHelper_1.CalculatorHelper.isValidSignal(inputSignalB.data)) {
                    this.addErrorByType(calculatorBase_1.ErrorMessageType.NotEnoughCommonTimestamps, [inputSignalA.name, inputSignalB.name]);
                }
            }
        };
        MaxCalculator.prototype.verifyCalculationInputData = function () {
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
        MaxCalculator.prototype.executeAlgorithm = function () {
            _super.prototype.executeAlgorithm.call(this);
            var calculationInputDataContainer = this.getCalculationInputDataContainer();
            var result = new Array();
            var inputSignalA = calculationInputDataContainer[0];
            var inputSignalB = calculationInputDataContainer[1];
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(inputSignalA.data) && calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(inputSignalB.data)) {
                result = this.maxTwoSignals(inputSignalA.data, inputSignalB.data);
            }
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(inputSignalA.data) && calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(inputSignalB.data)) {
                result = this.maxConstToSignal(inputSignalA.data, inputSignalB.data);
            }
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(inputSignalA.data) && calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(inputSignalB.data)) {
                result = this.maxConstToSignal(inputSignalB.data, inputSignalA.data);
            }
            this.addCalculationOutputData({
                data: result,
                value: this.outputValue,
                name: this.outputName
            });
        };
        /**
         * Calculates output signal when input is Signal and Signal
         *
         * @private
         * @param {Array<IPoint>} inputSignal1
         * @param {Array<IPoint>} inputSignal2
         * @returns {Array<IPoint>}
         * @memberof MaxCalculator
         */
        MaxCalculator.prototype.maxTwoSignals = function (inputSignal1, inputSignal2) {
            var points = new Array();
            if (inputSignal1.length == inputSignal2.length) { // Add only signals with same sample count
                for (var i = 0; i < inputSignal1.length; i++) {
                    var newX = inputSignal1[i].x;
                    var newY = inputSignal1[i].y;
                    if (newY < inputSignal2[i].y) {
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
         * Calculates output signal when input is Signal and Constant
         *
         * @private
         * @param {Array<IPoint>} inputSignal
         * @param {number} inputNumber
         * @returns {Array<IPoint>}
         * @memberof MaxCalculator
         */
        MaxCalculator.prototype.maxConstToSignal = function (inputSignal, inputNumber) {
            var points = new Array();
            for (var i = 0; i < inputSignal.length; i++) {
                var x = inputSignal[i].x;
                var y = inputSignal[i].y;
                if (y < inputNumber) {
                    y = inputNumber;
                }
                points.push(new point_1.Point(x, y));
            }
            return points;
        };
        return MaxCalculator;
    }(calculatorBase_1.CalculatorBase));
    exports.MaxCalculator = MaxCalculator;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF4Q2FsY3VsYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRvcnMvbWF4Q2FsY3VsYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBU0E7UUFBbUMsaUNBQWM7UUFPN0M7WUFBQSxZQUNJLGtCQUFNLEtBQUssRUFBRSxXQUFXLEVBQUUsa0VBQWtFLENBQUMsU0FDaEc7WUFQTyxnQkFBVSxHQUFVLHlCQUF5QixDQUFDO1lBQzlDLGdCQUFVLEdBQVUseUJBQXlCLENBQUM7WUFDOUMsZ0JBQVUsR0FBVyxlQUFlLENBQUM7WUFDckMsaUJBQVcsR0FBVyxLQUFLLENBQUM7O1FBSXBDLENBQUM7UUFFTSwyQ0FBbUIsR0FBMUI7WUFDSSxJQUFJLGdCQUFnQixHQUFHLGlCQUFNLG1CQUFtQixXQUFFLENBQUM7WUFFbkQsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksNkRBQTZCLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsc0JBQXNCLEVBQUUsSUFBSSx1REFBMEIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xKLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLDZEQUE2QixDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLHNCQUFzQixFQUFFLElBQUksdURBQTBCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVsSixPQUFPLGdCQUFnQixDQUFDO1FBQzVCLENBQUM7UUFFTSw0Q0FBb0IsR0FBM0I7WUFDSSxJQUFJLGlCQUFpQixHQUFHLGlCQUFNLG9CQUFvQixXQUFFLENBQUM7WUFFckQsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksNkNBQXFCLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFB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QUFJLElBQUksQ0FBQyxHQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztnQkFDdEMsSUFBSSxDQUFDLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekIsSUFBSSxDQUFDLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekIsSUFBSSxDQUFDLEdBQUcsV0FBVyxFQUFFO29CQUNqQixDQUFDLEdBQUcsV0FBVyxDQUFDO2lCQUNuQjtnQkFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksYUFBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2hDO1lBQ0QsT0FBTyxNQUFNLENBQUM7UUFDbEIsQ0FBQztRQUNMLG9CQUFDO0lBQUQsQ0FBQyxBQWhLRCxDQUFtQywrQkFBYyxHQWdLaEQ7SUFoS1ksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJUG9pbnQgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9wb2ludEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuLi8uLi9wb2ludFwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFQb2ludHMgfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhUG9pbnRzXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0b3JCYXNlLCBFcnJvck1lc3NhZ2VUeXBlIH0gZnJvbSBcIi4vY2FsY3VsYXRvckJhc2VcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHMgfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHNcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRvckhlbHBlciB9IGZyb20gXCIuL2NhbGN1bGF0b3JIZWxwZXJcIjtcclxuaW1wb3J0IHsgVENhbGN1bGF0aW9uRGF0YSB9IGZyb20gXCIuLi9jYWxjdWxhdGlvbkRhdGFcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBNYXhDYWxjdWxhdG9yIGV4dGVuZHMgQ2FsY3VsYXRvckJhc2Uge1xyXG5cclxuICAgIHByaXZhdGUgaW5wdXROYW1lMTpzdHJpbmcgPSBcIklucHV0IHNpZ25hbC9jb25zdGFudCBhXCI7XHJcbiAgICBwcml2YXRlIGlucHV0TmFtZTI6c3RyaW5nID0gXCJJbnB1dCBzaWduYWwvY29uc3RhbnQgYlwiO1xyXG4gICAgcHJpdmF0ZSBvdXRwdXROYW1lOiBzdHJpbmcgPSBcIk91dHB1dCBzaWduYWxcIjtcclxuICAgIHByaXZhdGUgb3V0cHV0VmFsdWU6IHN0cmluZyA9IFwibWF4XCI7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFwibWF4XCIsIFwiTWF4IChhLGIpXCIsIFwiTWF4aW11bSB2YWx1ZSBiZXR3ZWVuIHR3byBzaWduYWxzIG9yIG9uZSBzaWduYWwgYW5kIG9uZSBjb25zdGFudFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0RGVmYXVsdElucHV0RGF0YSgpOiBBcnJheTxUQ2FsY3VsYXRpb25EYXRhPntcclxuICAgICAgICBsZXQgZGVmYXVsdElucHV0RGF0YSA9IHN1cGVyLmdldERlZmF1bHRJbnB1dERhdGEoKTtcclxuXHJcbiAgICAgICAgZGVmYXVsdElucHV0RGF0YS5wdXNoKG5ldyBDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cyh0aGlzLmlucHV0TmFtZTEsIDAsIFwiU2lnbmFsIG9yIGNvbnN0YW50IGFcIiwgbmV3IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvKGZhbHNlLCB0cnVlKSkpO1xyXG4gICAgICAgIGRlZmF1bHRJbnB1dERhdGEucHVzaChuZXcgQ2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHModGhpcy5pbnB1dE5hbWUyLCAwLCBcIlNpZ25hbCBvciBjb25zdGFudCBiXCIsIG5ldyBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mbyhmYWxzZSwgdHJ1ZSkpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRJbnB1dERhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldERlZmF1bHRPdXRwdXREYXRhKCk6IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz4ge1xyXG4gICAgICAgIGxldCBkZWZhdWx0T3V0cHV0RGF0YSA9IHN1cGVyLmdldERlZmF1bHRPdXRwdXREYXRhKCk7XHJcblxyXG4gICAgICAgIGRlZmF1bHRPdXRwdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YVBvaW50cyh0aGlzLm91dHB1dE5hbWUsIHRoaXMub3V0cHV0VmFsdWUsIG5ldyBBcnJheTxJUG9pbnQ+KCkpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRPdXRwdXREYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBwcmVwYXJlQ2FsY3VsYXRpb25EYXRhKCkge1xyXG4gICAgICAgIHN1cGVyLnByZXBhcmVDYWxjdWxhdGlvbkRhdGEoKTtcclxuXHJcbiAgICAgICAgbGV0IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyID0gdGhpcy5nZXRDYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lcigpO1xyXG5cclxuICAgICAgICBsZXQgaW5wdXRTaWduYWxBID0gY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXJbMF07XHJcbiAgICAgICAgbGV0IGlucHV0U2lnbmFsQiA9IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyWzFdO1xyXG5cclxuICAgICAgICBpZihDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNTaWduYWwoaW5wdXRTaWduYWxBLmRhdGEpICYmIENhbGN1bGF0b3JIZWxwZXIuaXNWYWxpZFNpZ25hbChpbnB1dFNpZ25hbEEuZGF0YSlcclxuICAgICAgICAgICAgJiYgQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU2lnbmFsKGlucHV0U2lnbmFsQi5kYXRhKSAmJiBDYWxjdWxhdG9ySGVscGVyLmlzVmFsaWRTaWduYWwoaW5wdXRTaWduYWxCLmRhdGEpKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgcHJlcGFyZWRQb2ludEFycmF5cyA9IENhbGN1bGF0b3JIZWxwZXIuZmlsdGVyTWF0Y2hpbmdQb2ludHNCeVh2YWx1ZSh7IFxyXG4gICAgICAgICAgICAgICAgcG9pbnRBcnJheTE6IGlucHV0U2lnbmFsQS5kYXRhLCBcclxuICAgICAgICAgICAgICAgIHBvaW50QXJyYXkyOiBpbnB1dFNpZ25hbEIuZGF0YVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlucHV0U2lnbmFsQS5kYXRhID0gcHJlcGFyZWRQb2ludEFycmF5cy5wb2ludEFycmF5MTtcclxuICAgICAgICAgICAgaW5wdXRTaWduYWxCLmRhdGEgPSBwcmVwYXJlZFBvaW50QXJyYXlzLnBvaW50QXJyYXkyO1xyXG5cclxuICAgICAgICAgICAgaWYoIUNhbGN1bGF0b3JIZWxwZXIuaXNWYWxpZFNpZ25hbChpbnB1dFNpZ25hbEEuZGF0YSkgfHwgIUNhbGN1bGF0b3JIZWxwZXIuaXNWYWxpZFNpZ25hbChpbnB1dFNpZ25hbEIuZGF0YSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JCeVR5cGUoRXJyb3JNZXNzYWdlVHlwZS5Ob3RFbm91Z2hDb21tb25UaW1lc3RhbXBzLCBbaW5wdXRTaWduYWxBLm5hbWUsIGlucHV0U2lnbmFsQi5uYW1lXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHZlcmlmeUNhbGN1bGF0aW9uSW5wdXREYXRhKCkge1xyXG4gICAgICAgIHN1cGVyLnZlcmlmeUNhbGN1bGF0aW9uSW5wdXREYXRhKCk7XHJcblxyXG4gICAgICAgIGxldCBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lciA9IHRoaXMuZ2V0Q2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXIoKTtcclxuXHJcbiAgICAgICAgbGV0IGlucHV0U2lnbmFsQSA9IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyWzBdO1xyXG4gICAgICAgIGxldCBpbnB1dFNpZ25hbEIgPSBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lclsxXTtcclxuXHJcbiAgICAgICAgaWYoaW5wdXRTaWduYWxBID09IHVuZGVmaW5lZCB8fCBDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNTdHJpbmcoaW5wdXRTaWduYWxBLmRhdGEpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JCeVR5cGUoRXJyb3JNZXNzYWdlVHlwZS5NaXNzaW5nT3JJbnZhbGlkSW5wdXQsIFt0aGlzLmlucHV0TmFtZTFdKTtcclxuICAgICAgICB9IFxyXG4gICAgICAgIGlmKGlucHV0U2lnbmFsQiA9PSB1bmRlZmluZWQgfHwgQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU3RyaW5nKGlucHV0U2lnbmFsQi5kYXRhKSkge1xyXG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yQnlUeXBlKEVycm9yTWVzc2FnZVR5cGUuTWlzc2luZ09ySW52YWxpZElucHV0LCBbdGhpcy5pbnB1dE5hbWUyXSk7XHJcbiAgICAgICAgfSBcclxuXHJcbiAgICAgICAgaWYodGhpcy5oYXNFcnJvcnMoKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKENhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc051bWJlcihpbnB1dFNpZ25hbEEuZGF0YSkgJiYgQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzTnVtYmVyKGlucHV0U2lnbmFsQi5kYXRhKSkge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvcihcIkNhbGN1bGF0aW9uIEVycm9yOiBJdCBpcyBub3Qgc3VwcG9ydGVkIHRvIG9wZXJhdGUgd2l0aCBqdXN0IHR3byBudW1iZXJzIVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGV4ZWN1dGVBbGdvcml0aG0oKSB7XHJcbiAgICAgICAgc3VwZXIuZXhlY3V0ZUFsZ29yaXRobSgpO1xyXG5cclxuICAgICAgICBsZXQgY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXIgPSB0aGlzLmdldENhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyKCk7XHJcbiAgICAgICAgbGV0IHJlc3VsdDogQXJyYXk8SVBvaW50PiA9IG5ldyBBcnJheTxJUG9pbnQ+KCk7XHJcblxyXG4gICAgICAgIGxldCBpbnB1dFNpZ25hbEEgPSBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lclswXTtcclxuICAgICAgICBsZXQgaW5wdXRTaWduYWxCID0gY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXJbMV07XHJcblxyXG4gICAgICAgIGlmKENhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc1NpZ25hbChpbnB1dFNpZ25hbEEuZGF0YSkgJiYgQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU2lnbmFsKGlucHV0U2lnbmFsQi5kYXRhKSl7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMubWF4VHdvU2lnbmFscyhpbnB1dFNpZ25hbEEuZGF0YSwgaW5wdXRTaWduYWxCLmRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNTaWduYWwoaW5wdXRTaWduYWxBLmRhdGEpICYmIENhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc051bWJlcihpbnB1dFNpZ25hbEIuZGF0YSkpe1xyXG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLm1heENvbnN0VG9TaWduYWwoaW5wdXRTaWduYWxBLmRhdGEsIGlucHV0U2lnbmFsQi5kYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzTnVtYmVyKGlucHV0U2lnbmFsQS5kYXRhKSAmJiBDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNTaWduYWwoaW5wdXRTaWduYWxCLmRhdGEpKXtcclxuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5tYXhDb25zdFRvU2lnbmFsKGlucHV0U2lnbmFsQi5kYXRhLCBpbnB1dFNpZ25hbEEuZGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmFkZENhbGN1bGF0aW9uT3V0cHV0RGF0YSh7XHJcbiAgICAgICAgICAgIGRhdGE6IHJlc3VsdCxcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMub3V0cHV0VmFsdWUsXHJcbiAgICAgICAgICAgIG5hbWU6IHRoaXMub3V0cHV0TmFtZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsY3VsYXRlcyBvdXRwdXQgc2lnbmFsIHdoZW4gaW5wdXQgaXMgU2lnbmFsIGFuZCBTaWduYWxcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxJUG9pbnQ+fSBpbnB1dFNpZ25hbDFcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SVBvaW50Pn0gaW5wdXRTaWduYWwyXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8SVBvaW50Pn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXhDYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbWF4VHdvU2lnbmFscyhpbnB1dFNpZ25hbDE6IEFycmF5PElQb2ludD4sIGlucHV0U2lnbmFsMjogQXJyYXk8SVBvaW50Pik6IEFycmF5PElQb2ludD57XHJcbiAgICAgICAgbGV0IHBvaW50cyA9IG5ldyBBcnJheTxJUG9pbnQ+KCk7XHJcbiAgICAgICAgaWYoaW5wdXRTaWduYWwxLmxlbmd0aCA9PSBpbnB1dFNpZ25hbDIubGVuZ3RoKXsgLy8gQWRkIG9ubHkgc2lnbmFscyB3aXRoIHNhbWUgc2FtcGxlIGNvdW50XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBpbnB1dFNpZ25hbDEubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld1ggPSBpbnB1dFNpZ25hbDFbaV0ueDtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdZID0gaW5wdXRTaWduYWwxW2ldLnk7XHJcbiAgICAgICAgICAgICAgICBpZiAobmV3WSA8IGlucHV0U2lnbmFsMltpXS55KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3WSA9IGlucHV0U2lnbmFsMltpXS55O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgc2lnbmFsIHR3byBoYXMgc2FtZSB4IHZhbHVlXHJcbiAgICAgICAgICAgICAgICBpZihpbnB1dFNpZ25hbDJbaV0ueCA9PSBuZXdYKXtcclxuICAgICAgICAgICAgICAgICAgICBwb2ludHMucHVzaChuZXcgUG9pbnQobmV3WCwgbmV3WSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAvLyBBZGQgb2YgdHdvIGRpZmZlcmVudCBzaWduYWxzKGRpZmZlcmVudCB4IHZhbHVlcykgY3VycmVudGx5IG5vdCBwb3NzaWJsZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkRXJyb3IoXCJDYWxjdWxhdGlvbiBFcnJvcjogVGhlIGlucHV0IHNpZ25hbHMgZG9uJ3QgaGF2ZSBlcXVhbCB4ICh0aW1lKSB2YWx1ZXMhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQXJyYXk8SVBvaW50PigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3IoXCJDYWxjdWxhdGlvbiBFcnJvcjogVGhlIGlucHV0IHNpZ25hbHMgZG9uJ3QgaGF2ZSB0aGUgc2FtZSBudW1iZXIgb2YgcG9pbnRzIVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBvaW50cztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0ZXMgb3V0cHV0IHNpZ25hbCB3aGVuIGlucHV0IGlzIFNpZ25hbCBhbmQgQ29uc3RhbnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxJUG9pbnQ+fSBpbnB1dFNpZ25hbFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGlucHV0TnVtYmVyXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8SVBvaW50Pn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXhDYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbWF4Q29uc3RUb1NpZ25hbChpbnB1dFNpZ25hbDogQXJyYXk8SVBvaW50PiwgaW5wdXROdW1iZXI6IG51bWJlcik6IEFycmF5PElQb2ludD57XHJcbiAgICAgICAgbGV0IHBvaW50cyA9IG5ldyBBcnJheTxJUG9pbnQ+KCk7XHJcbiAgICAgICAgZm9yKGxldCBpID0wOyBpIDwgaW5wdXRTaWduYWwubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgeCA9IGlucHV0U2lnbmFsW2ldLng7XHJcbiAgICAgICAgICAgIGxldCB5ID0gaW5wdXRTaWduYWxbaV0ueTtcclxuICAgICAgICAgICAgaWYgKHkgPCBpbnB1dE51bWJlcikge1xyXG4gICAgICAgICAgICAgICAgeSA9IGlucHV0TnVtYmVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHBvaW50cy5wdXNoKG5ldyBQb2ludCh4LCB5KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwb2ludHM7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuIl19