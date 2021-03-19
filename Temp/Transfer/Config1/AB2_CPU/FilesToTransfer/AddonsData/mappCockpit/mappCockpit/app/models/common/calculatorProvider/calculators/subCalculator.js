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
define(["require", "exports", "../../point", "../calculationDataPoints", "../calculationDataNumberOrPoints", "../calculationDataDisplayInfo", "./calculatorBase", "./calculatorHelper"], function (require, exports, point_1, calculationDataPoints_1, calculationDataNumberOrPoints_1, calculationDataDisplayInfo_1, calculatorBase_1, calculatorHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SubCalculator = /** @class */ (function (_super) {
        __extends(SubCalculator, _super);
        function SubCalculator() {
            var _this = _super.call(this, "sub", "Subtraction a-b", "Subtraction of one signals from another, a constant value from a signal or a signal from a constant value") || this;
            _this.inputName1 = "Minuend a";
            _this.inputName2 = "Subtrahend b";
            _this.outputName = "Output signal";
            _this.outputValue = "difference";
            return _this;
        }
        SubCalculator.prototype.getDefaultInputData = function () {
            var defaultInputData = _super.prototype.getDefaultInputData.call(this);
            defaultInputData.push(new calculationDataNumberOrPoints_1.CalculationDataNumberOrPoints(this.inputName1, 0, "The minuend", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            defaultInputData.push(new calculationDataNumberOrPoints_1.CalculationDataNumberOrPoints(this.inputName2, 0, "The subtrahend", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            return defaultInputData;
        };
        SubCalculator.prototype.getDefaultOutputData = function () {
            var defaultOutputData = _super.prototype.getDefaultOutputData.call(this);
            defaultOutputData.push(new calculationDataPoints_1.CalculationDataPoints(this.outputName, this.outputValue, new Array()));
            return defaultOutputData;
        };
        SubCalculator.prototype.prepareCalculationData = function () {
            _super.prototype.prepareCalculationData.call(this);
            var calculationInputDataContainer = this.getCalculationInputDataContainer();
            var minuend = calculationInputDataContainer[0];
            var subtrahend = calculationInputDataContainer[1];
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(minuend.data) && calculatorHelper_1.CalculatorHelper.isValidSignal(minuend.data)
                && calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(subtrahend.data) && calculatorHelper_1.CalculatorHelper.isValidSignal(subtrahend.data)) {
                var preparedPointArrays = calculatorHelper_1.CalculatorHelper.filterMatchingPointsByXvalue({
                    pointArray1: minuend.data,
                    pointArray2: subtrahend.data
                });
                minuend.data = preparedPointArrays.pointArray1;
                subtrahend.data = preparedPointArrays.pointArray2;
                if (!calculatorHelper_1.CalculatorHelper.isValidSignal(minuend.data) || !calculatorHelper_1.CalculatorHelper.isValidSignal(subtrahend.data)) {
                    this.addErrorByType(calculatorBase_1.ErrorMessageType.NotEnoughCommonTimestamps, [minuend.name, subtrahend.name]);
                }
            }
        };
        SubCalculator.prototype.verifyCalculationInputData = function () {
            _super.prototype.verifyCalculationInputData.call(this);
            var calculationInputDataContainer = this.getCalculationInputDataContainer();
            var minuend = calculationInputDataContainer[0];
            var subtrahend = calculationInputDataContainer[1];
            if (minuend == undefined || calculatorHelper_1.CalculatorHelper.calculationInputDataIsString(minuend.data)) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.MissingOrInvalidInput, [this.inputName1]);
            }
            if (subtrahend == undefined || calculatorHelper_1.CalculatorHelper.calculationInputDataIsString(subtrahend.data)) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.MissingOrInvalidInput, [this.inputName2]);
            }
            if (this.hasErrors()) {
                return;
            }
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(minuend.data) && calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(subtrahend.data)) {
                this.addError("Calculation Error: It is not supported to operate with just two numbers!");
            }
        };
        SubCalculator.prototype.executeAlgorithm = function () {
            _super.prototype.executeAlgorithm.call(this);
            var calculationInputDataContainer = this.getCalculationInputDataContainer();
            var result = new Array();
            var minuend = calculationInputDataContainer[0];
            var subtrahend = calculationInputDataContainer[1];
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(minuend.data) && calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(subtrahend.data)) {
                result = this.subTwoSignals(minuend.data, subtrahend.data);
            }
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(minuend.data) && calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(subtrahend.data)) {
                result = this.subConstFromSignal(minuend.data, subtrahend.data);
            }
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(minuend.data) && calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(subtrahend.data)) {
                result = this.subSignalFromConst(minuend.data, subtrahend.data);
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
         * @memberof SubCalculator
         */
        SubCalculator.prototype.subTwoSignals = function (inputSignal1, inputSignal2) {
            var points = new Array();
            if (inputSignal1.length == inputSignal2.length) { // Sub only signals with same sample count
                for (var i = 0; i < inputSignal1.length; i++) {
                    var newX = inputSignal1[i].x;
                    var newY = inputSignal1[i].y;
                    newY -= inputSignal2[i].y;
                    // check if signal two has same x value
                    if (inputSignal2[i].x == newX) {
                        points.push(new point_1.Point(newX, newY));
                    }
                    else {
                        // Sub of two different signals(different x values) currently not possible
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
         * @memberof SubCalculator
         */
        SubCalculator.prototype.subConstFromSignal = function (inputSignal, inputNumber) {
            var points = new Array();
            for (var i = 0; i < inputSignal.length; i++) {
                var x = inputSignal[i].x;
                var y = inputSignal[i].y - inputNumber;
                points.push(new point_1.Point(x, y));
            }
            return points;
        };
        /**
         * Calculates output signal when input is Constant and Signal
         *
         * @private
         * @param {number} inputNumber
         * @param {Array<IPoint>} inputSignal
         * @returns {Array<IPoint>}
         * @memberof SubCalculator
         */
        SubCalculator.prototype.subSignalFromConst = function (inputNumber, inputSignal) {
            var points = new Array();
            for (var i = 0; i < inputSignal.length; i++) {
                var x = inputSignal[i].x;
                var y = inputNumber - inputSignal[i].y;
                points.push(new point_1.Point(x, y));
            }
            return points;
        };
        return SubCalculator;
    }(calculatorBase_1.CalculatorBase));
    exports.SubCalculator = SubCalculator;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ViQ2FsY3VsYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRvcnMvc3ViQ2FsY3VsYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBU0E7UUFBbUMsaUNBQWM7UUFPN0M7WUFBQSxZQUNJLGtCQUFNLEtBQUssRUFBRSxpQkFBaUIsRUFBRSwyR0FBMkcsQ0FBQyxTQUMvSTtZQVBPLGdCQUFVLEdBQVcsV0FBVyxDQUFDO1lBQ2pDLGdCQUFVLEdBQVcsY0FBYyxDQUFDO1lBQ3BDLGdCQUFVLEdBQVcsZUFBZSxDQUFDO1lBQ3JDLGlCQUFXLEdBQVcsWUFBWSxDQUFDOztRQUkzQyxDQUFDO1FBRU0sMkNBQW1CLEdBQTFCO1lBQ0ksSUFBSSxnQkFBZ0IsR0FBRyxpQkFBTSxtQkFBbUIsV0FBRSxDQUFDO1lBRW5ELGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLDZEQUE2QixDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLGFBQWEsRUFBRSxJQUFJLHVEQUEwQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekksZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksNkRBQTZCLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSx1REFBMEIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTVJLE9BQU8sZ0JBQWdCLENBQUM7UUFDNUIsQ0FBQztRQUVNLDRDQUFvQixHQUEzQjtZQUNJLElBQUksaUJBQWlCLEdBQUcsaUJBQU0sb0JBQW9CLFdBQUUsQ0FBQztZQUVyRCxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSw2Q0FBcUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElB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RSxFQUFDO2dCQUN0QyxJQUFJLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixJQUFJLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQztnQkFDdkMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLGFBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNoQztZQUNELE9BQU8sTUFBTSxDQUFDO1FBQ2xCLENBQUM7UUFFRDs7Ozs7Ozs7V0FRRztRQUNLLDBDQUFrQixHQUExQixVQUEyQixXQUFtQixFQUFFLFdBQTBCO1lBQ3RFLElBQUksTUFBTSxHQUFHLElBQUksS0FBSyxFQUFVLENBQUM7WUFDakMsS0FBSSxJQUFJLENBQUMsR0FBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQ3RDLElBQUksQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxHQUFHLFdBQVcsR0FBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0QyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksYUFBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2hDO1lBQ0QsT0FBTyxNQUFNLENBQUM7UUFDbEIsQ0FBQztRQUNMLG9CQUFDO0lBQUQsQ0FBQyxBQTdLRCxDQUFtQywrQkFBYyxHQTZLaEQ7SUE3S1ksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJUG9pbnQgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9wb2ludEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuLi8uLi9wb2ludFwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFQb2ludHMgfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhUG9pbnRzXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0b3JCYXNlLCBFcnJvck1lc3NhZ2VUeXBlIH0gZnJvbSBcIi4vY2FsY3VsYXRvckJhc2VcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRvckhlbHBlciB9IGZyb20gXCIuL2NhbGN1bGF0b3JIZWxwZXJcIjtcclxuaW1wb3J0IHsgVENhbGN1bGF0aW9uRGF0YSB9IGZyb20gXCIuLi9jYWxjdWxhdGlvbkRhdGFcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTdWJDYWxjdWxhdG9yIGV4dGVuZHMgQ2FsY3VsYXRvckJhc2Uge1xyXG4gICAgXHJcbiAgICBwcml2YXRlIGlucHV0TmFtZTE6IHN0cmluZyA9IFwiTWludWVuZCBhXCI7XHJcbiAgICBwcml2YXRlIGlucHV0TmFtZTI6IHN0cmluZyA9IFwiU3VidHJhaGVuZCBiXCI7XHJcbiAgICBwcml2YXRlIG91dHB1dE5hbWU6IHN0cmluZyA9IFwiT3V0cHV0IHNpZ25hbFwiO1xyXG4gICAgcHJpdmF0ZSBvdXRwdXRWYWx1ZTogc3RyaW5nID0gXCJkaWZmZXJlbmNlXCI7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFwic3ViXCIsIFwiU3VidHJhY3Rpb24gYS1iXCIsIFwiU3VidHJhY3Rpb24gb2Ygb25lIHNpZ25hbHMgZnJvbSBhbm90aGVyLCBhIGNvbnN0YW50IHZhbHVlIGZyb20gYSBzaWduYWwgb3IgYSBzaWduYWwgZnJvbSBhIGNvbnN0YW50IHZhbHVlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXREZWZhdWx0SW5wdXREYXRhKCk6IEFycmF5PFRDYWxjdWxhdGlvbkRhdGE+IHtcclxuICAgICAgICBsZXQgZGVmYXVsdElucHV0RGF0YSA9IHN1cGVyLmdldERlZmF1bHRJbnB1dERhdGEoKTtcclxuXHJcbiAgICAgICAgZGVmYXVsdElucHV0RGF0YS5wdXNoKG5ldyBDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cyh0aGlzLmlucHV0TmFtZTEsIDAsIFwiVGhlIG1pbnVlbmRcIiwgbmV3IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvKGZhbHNlLCB0cnVlKSkpO1xyXG4gICAgICAgIGRlZmF1bHRJbnB1dERhdGEucHVzaChuZXcgQ2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHModGhpcy5pbnB1dE5hbWUyLCAwLCBcIlRoZSBzdWJ0cmFoZW5kXCIsIG5ldyBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mbyhmYWxzZSwgdHJ1ZSkpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRJbnB1dERhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldERlZmF1bHRPdXRwdXREYXRhKCk6IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz4ge1xyXG4gICAgICAgIGxldCBkZWZhdWx0T3V0cHV0RGF0YSA9IHN1cGVyLmdldERlZmF1bHRPdXRwdXREYXRhKCk7XHJcblxyXG4gICAgICAgIGRlZmF1bHRPdXRwdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YVBvaW50cyh0aGlzLm91dHB1dE5hbWUsIHRoaXMub3V0cHV0VmFsdWUsIG5ldyBBcnJheTxJUG9pbnQ+KCkpKTsgXHJcblxyXG4gICAgICAgIHJldHVybiBkZWZhdWx0T3V0cHV0RGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgcHJlcGFyZUNhbGN1bGF0aW9uRGF0YSgpIHtcclxuICAgICAgICBzdXBlci5wcmVwYXJlQ2FsY3VsYXRpb25EYXRhKCk7XHJcblxyXG4gICAgICAgIGxldCBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lciA9IHRoaXMuZ2V0Q2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXIoKTtcclxuXHJcbiAgICAgICAgbGV0IG1pbnVlbmQgPSBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lclswXTtcclxuICAgICAgICBsZXQgc3VidHJhaGVuZCA9IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyWzFdO1xyXG5cclxuICAgICAgICBpZihDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNTaWduYWwobWludWVuZC5kYXRhKSAmJiBDYWxjdWxhdG9ySGVscGVyLmlzVmFsaWRTaWduYWwobWludWVuZC5kYXRhKVxyXG4gICAgICAgICAgICAmJiBDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNTaWduYWwoc3VidHJhaGVuZC5kYXRhKSAmJiBDYWxjdWxhdG9ySGVscGVyLmlzVmFsaWRTaWduYWwoc3VidHJhaGVuZC5kYXRhKSkge1xyXG5cclxuICAgICAgICAgICAgbGV0IHByZXBhcmVkUG9pbnRBcnJheXMgPSBDYWxjdWxhdG9ySGVscGVyLmZpbHRlck1hdGNoaW5nUG9pbnRzQnlYdmFsdWUoeyBcclxuICAgICAgICAgICAgICAgIHBvaW50QXJyYXkxOiBtaW51ZW5kLmRhdGEsIFxyXG4gICAgICAgICAgICAgICAgcG9pbnRBcnJheTI6IHN1YnRyYWhlbmQuZGF0YVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG1pbnVlbmQuZGF0YSA9IHByZXBhcmVkUG9pbnRBcnJheXMucG9pbnRBcnJheTE7XHJcbiAgICAgICAgICAgIHN1YnRyYWhlbmQuZGF0YSA9IHByZXBhcmVkUG9pbnRBcnJheXMucG9pbnRBcnJheTI7XHJcblxyXG4gICAgICAgICAgICBpZighQ2FsY3VsYXRvckhlbHBlci5pc1ZhbGlkU2lnbmFsKG1pbnVlbmQuZGF0YSkgfHwgIUNhbGN1bGF0b3JIZWxwZXIuaXNWYWxpZFNpZ25hbChzdWJ0cmFoZW5kLmRhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEVycm9yQnlUeXBlKEVycm9yTWVzc2FnZVR5cGUuTm90RW5vdWdoQ29tbW9uVGltZXN0YW1wcywgW21pbnVlbmQubmFtZSwgc3VidHJhaGVuZC5uYW1lXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHZlcmlmeUNhbGN1bGF0aW9uSW5wdXREYXRhKCkge1xyXG4gICAgICAgIHN1cGVyLnZlcmlmeUNhbGN1bGF0aW9uSW5wdXREYXRhKCk7XHJcblxyXG4gICAgICAgIGxldCBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lciA9IHRoaXMuZ2V0Q2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXIoKTtcclxuXHJcbiAgICAgICAgbGV0IG1pbnVlbmQgPSBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lclswXTtcclxuICAgICAgICBsZXQgc3VidHJhaGVuZCA9IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyWzFdO1xyXG5cclxuICAgICAgICBpZihtaW51ZW5kID09IHVuZGVmaW5lZCB8fCBDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNTdHJpbmcobWludWVuZC5kYXRhKSkge1xyXG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yQnlUeXBlKEVycm9yTWVzc2FnZVR5cGUuTWlzc2luZ09ySW52YWxpZElucHV0LCBbdGhpcy5pbnB1dE5hbWUxXSk7XHJcbiAgICAgICAgfSBcclxuICAgICAgICBpZihzdWJ0cmFoZW5kID09IHVuZGVmaW5lZCB8fCBDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNTdHJpbmcoc3VidHJhaGVuZC5kYXRhKSkge1xyXG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yQnlUeXBlKEVycm9yTWVzc2FnZVR5cGUuTWlzc2luZ09ySW52YWxpZElucHV0LCBbdGhpcy5pbnB1dE5hbWUyXSk7XHJcbiAgICAgICAgfSBcclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLmhhc0Vycm9ycygpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzTnVtYmVyKG1pbnVlbmQuZGF0YSkgJiYgQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzTnVtYmVyKHN1YnRyYWhlbmQuZGF0YSkpIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3IoXCJDYWxjdWxhdGlvbiBFcnJvcjogSXQgaXMgbm90IHN1cHBvcnRlZCB0byBvcGVyYXRlIHdpdGgganVzdCB0d28gbnVtYmVycyFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBleGVjdXRlQWxnb3JpdGhtKCkge1xyXG4gICAgICAgIHN1cGVyLmV4ZWN1dGVBbGdvcml0aG0oKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXIgPSB0aGlzLmdldENhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyKCk7XHJcbiAgICAgICAgbGV0IHJlc3VsdDogQXJyYXk8SVBvaW50PiA9IG5ldyBBcnJheTxJUG9pbnQ+KCk7XHJcblxyXG4gICAgICAgIGxldCBtaW51ZW5kID0gY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXJbMF07XHJcbiAgICAgICAgbGV0IHN1YnRyYWhlbmQgPSBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lclsxXTtcclxuXHJcbiAgICAgICAgaWYoQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU2lnbmFsKG1pbnVlbmQuZGF0YSkgJiYgQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU2lnbmFsKHN1YnRyYWhlbmQuZGF0YSkpe1xyXG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLnN1YlR3b1NpZ25hbHMobWludWVuZC5kYXRhLCBzdWJ0cmFoZW5kLmRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNTaWduYWwobWludWVuZC5kYXRhKSAmJiBDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNOdW1iZXIoc3VidHJhaGVuZC5kYXRhKSl7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuc3ViQ29uc3RGcm9tU2lnbmFsKG1pbnVlbmQuZGF0YSwgc3VidHJhaGVuZC5kYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzTnVtYmVyKG1pbnVlbmQuZGF0YSkgJiYgQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU2lnbmFsKHN1YnRyYWhlbmQuZGF0YSkpe1xyXG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLnN1YlNpZ25hbEZyb21Db25zdChtaW51ZW5kLmRhdGEsIHN1YnRyYWhlbmQuZGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmFkZENhbGN1bGF0aW9uT3V0cHV0RGF0YSh7XHJcbiAgICAgICAgICAgIGRhdGE6IHJlc3VsdCxcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMub3V0cHV0VmFsdWUsXHJcbiAgICAgICAgICAgIG5hbWU6IHRoaXMub3V0cHV0TmFtZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxjdWxhdGVzIG91dHB1dCBzaWduYWwgd2hlbiBpbnB1dCBpcyBTaWduYWwgYW5kIFNpZ25hbFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElQb2ludD59IGlucHV0U2lnbmFsMVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxJUG9pbnQ+fSBpbnB1dFNpZ25hbDJcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxJUG9pbnQ+fVxyXG4gICAgICogQG1lbWJlcm9mIFN1YkNhbGN1bGF0b3JcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdWJUd29TaWduYWxzKGlucHV0U2lnbmFsMTogQXJyYXk8SVBvaW50PiwgaW5wdXRTaWduYWwyOiBBcnJheTxJUG9pbnQ+KTogQXJyYXk8SVBvaW50PntcclxuICAgICAgICBsZXQgcG9pbnRzID0gbmV3IEFycmF5PElQb2ludD4oKTtcclxuICAgICAgICBpZihpbnB1dFNpZ25hbDEubGVuZ3RoID09IGlucHV0U2lnbmFsMi5sZW5ndGgpeyAvLyBTdWIgb25seSBzaWduYWxzIHdpdGggc2FtZSBzYW1wbGUgY291bnRcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGlucHV0U2lnbmFsMS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3WCA9IGlucHV0U2lnbmFsMVtpXS54O1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld1kgPSBpbnB1dFNpZ25hbDFbaV0ueTtcclxuICAgICAgICAgICAgICAgIG5ld1kgLT0gaW5wdXRTaWduYWwyW2ldLnk7XHJcbiAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiBzaWduYWwgdHdvIGhhcyBzYW1lIHggdmFsdWVcclxuICAgICAgICAgICAgICAgIGlmKGlucHV0U2lnbmFsMltpXS54ID09IG5ld1gpe1xyXG4gICAgICAgICAgICAgICAgICAgIHBvaW50cy5wdXNoKG5ldyBQb2ludChuZXdYLCBuZXdZKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFN1YiBvZiB0d28gZGlmZmVyZW50IHNpZ25hbHMoZGlmZmVyZW50IHggdmFsdWVzKSBjdXJyZW50bHkgbm90IHBvc3NpYmxlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRFcnJvcihcIkNhbGN1bGF0aW9uIEVycm9yOiBUaGUgaW5wdXQgc2lnbmFscyBkb24ndCBoYXZlIGVxdWFsIHggKHRpbWUpIHZhbHVlcyFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBBcnJheTxJUG9pbnQ+KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvcihcIkNhbGN1bGF0aW9uIEVycm9yOiBUaGUgaW5wdXQgc2lnbmFscyBkb24ndCBoYXZlIHRoZSBzYW1lIG51bWJlciBvZiBwb2ludHMhXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcG9pbnRzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0ZXMgb3V0cHV0IHNpZ25hbCB3aGVuIGlucHV0IGlzIFNpZ25hbCBhbmQgQ29uc3RhbnQgXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SVBvaW50Pn0gaW5wdXRTaWduYWxcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbnB1dE51bWJlclxyXG4gICAgICogQHJldHVybnMge0FycmF5PElQb2ludD59XHJcbiAgICAgKiBAbWVtYmVyb2YgU3ViQ2FsY3VsYXRvclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN1YkNvbnN0RnJvbVNpZ25hbChpbnB1dFNpZ25hbDogQXJyYXk8SVBvaW50PiwgaW5wdXROdW1iZXI6IG51bWJlcik6IEFycmF5PElQb2ludD57XHJcbiAgICAgICAgbGV0IHBvaW50cyA9IG5ldyBBcnJheTxJUG9pbnQ+KCk7XHJcbiAgICAgICAgZm9yKGxldCBpID0wOyBpIDwgaW5wdXRTaWduYWwubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgeCA9IGlucHV0U2lnbmFsW2ldLng7XHJcbiAgICAgICAgICAgIGxldCB5ID0gaW5wdXRTaWduYWxbaV0ueSAtIGlucHV0TnVtYmVyO1xyXG4gICAgICAgICAgICBwb2ludHMucHVzaChuZXcgUG9pbnQoeCwgeSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcG9pbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsY3VsYXRlcyBvdXRwdXQgc2lnbmFsIHdoZW4gaW5wdXQgaXMgQ29uc3RhbnQgYW5kIFNpZ25hbFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5wdXROdW1iZXJcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SVBvaW50Pn0gaW5wdXRTaWduYWxcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxJUG9pbnQ+fVxyXG4gICAgICogQG1lbWJlcm9mIFN1YkNhbGN1bGF0b3JcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdWJTaWduYWxGcm9tQ29uc3QoaW5wdXROdW1iZXI6IG51bWJlciwgaW5wdXRTaWduYWw6IEFycmF5PElQb2ludD4pOiBBcnJheTxJUG9pbnQ+e1xyXG4gICAgICAgIGxldCBwb2ludHMgPSBuZXcgQXJyYXk8SVBvaW50PigpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9MDsgaSA8IGlucHV0U2lnbmFsLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IHggPSBpbnB1dFNpZ25hbFtpXS54O1xyXG4gICAgICAgICAgICBsZXQgeSA9IGlucHV0TnVtYmVyLSBpbnB1dFNpZ25hbFtpXS55O1xyXG4gICAgICAgICAgICBwb2ludHMucHVzaChuZXcgUG9pbnQoeCwgeSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcG9pbnRzO1xyXG4gICAgfVxyXG59Il19