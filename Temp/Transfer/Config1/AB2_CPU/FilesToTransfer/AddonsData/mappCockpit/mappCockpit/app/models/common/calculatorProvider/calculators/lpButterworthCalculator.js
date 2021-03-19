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
define(["require", "exports", "../../point", "./filters/butterworth", "../calculationDataNumber", "../calculationDataPoints", "../calculationDataDisplayInfo", "./calculatorBase", "./calculatorHelper"], function (require, exports, point_1, butterworth_1, calculationDataNumber_1, calculationDataPoints_1, calculationDataDisplayInfo_1, calculatorBase_1, calculatorHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LpButterworthCalculator = /** @class */ (function (_super) {
        __extends(LpButterworthCalculator, _super);
        function LpButterworthCalculator() {
            var _this = _super.call(this, "lp butterworth", "LP Butterworth", "Filters a signal with a parameterizable Butterworth low-pass filter") || this;
            _this.inputName1 = "Order";
            _this.inputName2 = "Cutoff frequency";
            _this.inputName3 = "Input signal";
            _this.outputName = "Output signal";
            _this.outputValue = "filtered signal";
            _this._filterOrderMin = butterworth_1.Butterworth.filterOrderMin;
            _this._filterOrderMax = butterworth_1.Butterworth.filterOrderMax;
            return _this;
        }
        LpButterworthCalculator.prototype.getDefaultInputData = function () {
            var defaultInputData = _super.prototype.getDefaultInputData.call(this);
            // Numeric, 1-5
            defaultInputData.push(new calculationDataNumber_1.CalculationDataNumber(this.inputName1, 1, "The order of the filter", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(true, false, this.getFilterOrderValues())));
            defaultInputData.push(new calculationDataNumber_1.CalculationDataNumber(this.inputName2, 3.2, "The cut-off frequency (frequency with an attenuation of -3dB) of the filter", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, false)));
            defaultInputData.push(new calculationDataPoints_1.CalculationDataPoints(this.inputName3, "", new Array(), "The signal to be filtered", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            return defaultInputData;
        };
        LpButterworthCalculator.prototype.getDefaultOutputData = function () {
            var defaultOutputData = _super.prototype.getDefaultOutputData.call(this);
            defaultOutputData.push(new calculationDataPoints_1.CalculationDataPoints(this.outputName, this.outputValue, new Array()));
            return defaultOutputData;
        };
        LpButterworthCalculator.prototype.verifyCalculationInputData = function () {
            _super.prototype.verifyCalculationInputData.call(this);
            var calculationInputDataContainer = this.getCalculationInputDataContainer();
            var filterOrder = calculationInputDataContainer[0];
            var cutoffFrequency = calculationInputDataContainer[1];
            var inputSignal = calculationInputDataContainer[2];
            if (filterOrder == undefined || !calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(filterOrder.data)) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.MissingOrInvalidInput, [this.inputName1]);
            }
            if (cutoffFrequency == undefined || !calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(cutoffFrequency.data)) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.MissingOrInvalidInput, [this.inputName2]);
            }
            if (inputSignal == undefined || !calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(inputSignal.data)) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.MissingOrInvalidInput, [this.inputName3]);
            }
            if (this.hasErrors()) {
                return;
            }
            if (calculationInputDataContainer[0].data < this._filterOrderMin || calculationInputDataContainer[0].data > this._filterOrderMax) {
                this.addError("Calculation Error: '" + this.inputName1 + "' is out of range (valid range " + this._filterOrderMin + "-" + this._filterOrderMax + ")!");
            }
        };
        LpButterworthCalculator.prototype.executeAlgorithm = function () {
            _super.prototype.executeAlgorithm.call(this);
            var calculationInputDataContainer = this.getCalculationInputDataContainer();
            var result = new Array();
            var filterOrder = calculationInputDataContainer[0];
            var cutoffFrequency = calculationInputDataContainer[1];
            var inputSignal = calculationInputDataContainer[2];
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(filterOrder.data) && calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(cutoffFrequency.data) && calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(inputSignal.data)) {
                result = this.calculateButterworth(inputSignal.data, filterOrder.data, cutoffFrequency.data);
            }
            this.addCalculationOutputData({
                data: result,
                value: this.outputValue,
                name: this.outputName
            });
        };
        /**
         * Calculate butterworth with the given data
         *
         * @private
         * @param {Array<IPoint>} signalData
         * @param {number} filterOrder
         * @param {number} inputCutOffFrequence
         * @returns {Array<IPoint>}
         * @memberof LpButterworthCalculator
         */
        LpButterworthCalculator.prototype.calculateButterworth = function (signalData, filterOrder, inputCutOffFrequence) {
            var ts = calculatorHelper_1.CalculatorHelper.estimateSampleTime(signalData);
            var inputSignal = new Array();
            for (var i = 0; i < signalData.length; i++) {
                inputSignal.push(signalData[i].y);
            }
            var filter = new butterworth_1.Butterworth(filterOrder, inputCutOffFrequence, ts);
            var outputSignal = filter.filter(inputSignal);
            var output = new Array();
            for (var i = 0; i < outputSignal.length; i++) {
                output.push(new point_1.Point(signalData[i].x, outputSignal[i]));
            }
            return output;
        };
        /**
         * Returns the supported filter orders for the butterworth filter
         *
         * @private
         * @returns {Array<IValueListItem>}
         * @memberof LpButterworthCalculator
         */
        LpButterworthCalculator.prototype.getFilterOrderValues = function () {
            var filterOrderValues = new Array();
            for (var i = this._filterOrderMin; i <= this._filterOrderMax; i++) {
                filterOrderValues.push({ value: i.toString(), displayValue: i.toString() });
            }
            return filterOrderValues;
        };
        return LpButterworthCalculator;
    }(calculatorBase_1.CalculatorBase));
    exports.LpButterworthCalculator = LpButterworthCalculator;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHBCdXR0ZXJ3b3J0aENhbGN1bGF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9jb21tb24vY2FsY3VsYXRvclByb3ZpZGVyL2NhbGN1bGF0b3JzL2xwQnV0dGVyd29ydGhDYWxjdWxhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFXQTtRQUE2QywyQ0FBYztRQVd2RDtZQUFBLFlBQ0ksa0JBQU0sZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUscUVBQXFFLENBQUMsU0FJbkg7WUFkTyxnQkFBVSxHQUFXLE9BQU8sQ0FBQztZQUM3QixnQkFBVSxHQUFXLGtCQUFrQixDQUFDO1lBQ3hDLGdCQUFVLEdBQVcsY0FBYyxDQUFDO1lBQ3BDLGdCQUFVLEdBQVcsZUFBZSxDQUFDO1lBQ3JDLGlCQUFXLEdBQVcsaUJBQWlCLENBQUM7WUFRNUMsS0FBSSxDQUFDLGVBQWUsR0FBRyx5QkFBVyxDQUFDLGNBQWMsQ0FBQztZQUNsRCxLQUFJLENBQUMsZUFBZSxHQUFHLHlCQUFXLENBQUMsY0FBYyxDQUFDOztRQUN0RCxDQUFDO1FBRU0scURBQW1CLEdBQTFCO1lBQ0ksSUFBSSxnQkFBZ0IsR0FBRyxpQkFBTSxtQkFBbUIsV0FBRSxDQUFDO1lBRW5ELGVBQWU7WUFDZixnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSw2Q0FBcUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSx5QkFBeUIsRUFBRSxJQUFJLHVEQUEwQixDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUssZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksNkNBQXFCLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxHQUFHLEVBQUUsNkVBQTZFLEVBQUUsSUFBSSx1REFBMEIsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BNLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLDZDQUFxQixDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRSxFQUFFLElBQUksS0FBSyxFQUFVLEVBQUUsMkJBQTJCLEVBQUUsSUFBSSx1REFBMEIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXJLLE9BQU8sZ0JBQWdCLENBQUM7UUFDNUIsQ0FBQztRQUVNLHNEQUFvQixHQUEzQjtZQUNJLElBQUksaUJBQWlCLEdBQUcsaUJBQU0sb0JBQW9CLFdBQUUsQ0FBQztZQUVyRCxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSw2Q0FBcUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxLQUFLLEVBQVUsQ0FBQyxDQUFDLENBQUM7WUFFMUcsT0FBTyxpQkFBaUIsQ0FBQztRQUM3QixDQUFDO1FBRVMsNERBQTBCLEdBQXBDO1lBQ0ksaUJBQU0sMEJBQTBCLFdBQUUsQ0FBQztZQUVuQyxJQUFJLDZCQUE2QixHQUFHLElBQUksQ0FBQyxnQ0FBZ0MsRUFBRSxDQUFDO1lBRTVFLElBQUksV0FBVyxHQUFHLDZCQUE2QixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25ELElBQUksZUFBZSxHQUFHLDZCQUE2QixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZELElBQUksV0FBVyxHQUFHLDZCQUE2QixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRW5ELElBQUcsV0FBVyxJQUFJLFNBQVMsSUFBSSxDQUFDLG1DQUFnQixDQUFDLDRCQUE0QixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDN0YsSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQ0FBZ0IsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2FBQ2xGO1lBQ0QsSUFBRyxlQUFlLElBQUksU0FBUyxJQUFJLENBQUMsbUNBQWdCLENBQUMsNEJBQTRCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNyRyxJQUFJLENBQUMsY0FBYyxDQUFDLGlDQUFnQixDQUFDLHFCQUFxQixFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7YUFDbEY7WUFDRCxJQUFHLFdBQVcsSUFBSSxTQUFTLElBQUksQ0FBQyxtQ0FBZ0IsQ0FBQyw0QkFBNEIsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQzdGLElBQUksQ0FBQyxjQUFjLENBQUMsaUNBQWdCLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQzthQUNsRjtZQUVELElBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFO2dCQUNqQixPQUFPO2FBQ1Y7WUFFRCxJQUFHLDZCQUE2QixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsZUFBZSxJQUFJLDZCQUE2QixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFO2dCQUM3SCxJQUFJLENBQUMsUUFBUSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsaUNBQWlDLEdBQUcsSUFBSSxDQUFDLGVBQWUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsQ0FBQzthQUMxSjtRQUNMLENBQUM7UUFFUyxrREFBZ0IsR0FBMUI7WUFDSSxpQkFBTSxnQkFBZ0IsV0FBRSxDQUFDO1lBRXpCLElBQUksNkJBQTZCLEdBQUcsSUFBSSxDQUFDLGdDQUFnQyxFQUFFLENBQUM7WUFDNUUsSUFBSSxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQVUsQ0FBQztZQUVqQyxJQUFJLFdBQVcsR0FBRyw2QkFBNkIsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuRCxJQUFJLGVBQWUsR0FBRyw2QkFBNkIsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2RCxJQUFJLFdBQVcsR0FBRyw2QkFBNkIsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVuRCxJQUFHLG1DQUFnQixDQUFDLDRCQUE0QixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxtQ0FBZ0IsQ0FBQyw0QkFBNEIsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksbUNBQWdCLENBQUMsNEJBQTRCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUMxTSxNQUFNLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLElBQUksRUFBRSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDaEc7WUFFRCxJQUFJLENBQUMsd0JBQXdCLENBQUM7Z0JBQzFCLElBQUksRUFBRSxNQUFNO2dCQUNaLEtBQUssRUFBRSxJQUFJLENBQUMsV0FBVztnQkFDdkIsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVO2FBQ3hCLENBQUMsQ0FBQztRQUNQLENBQUM7UUFFRDs7Ozs7Ozs7O1dBU0c7UUFDSyxzREFBb0IsR0FBNUIsVUFBNkIsVUFBeUIsRUFBRSxXQUFtQixFQUFFLG9CQUE0QjtZQUNyRyxJQUFJLEVBQUUsR0FBRyxtQ0FBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN6RCxJQUFJLFdBQVcsR0FBYSxJQUFJLEtBQUssRUFBVSxDQUFDO1lBRWhELEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUNwQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNyQztZQUVELElBQUksTUFBTSxHQUFnQixJQUFJLHlCQUFXLENBQUMsV0FBVyxFQUFFLG9CQUFvQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2pGLElBQUksWUFBWSxHQUFhLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7WUFFeEQsSUFBSSxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQVUsQ0FBQztZQUNqQyxLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztnQkFDdEMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLGFBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7YUFDM0Q7WUFDRCxPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ssc0RBQW9CLEdBQTVCO1lBQ0ksSUFBSSxpQkFBaUIsR0FBRyxJQUFJLEtBQUssRUFBa0IsQ0FBQztZQUNwRCxLQUFJLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQzlELGlCQUFpQixDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBbUIsQ0FBQyxDQUFDO2FBQy9GO1lBQ0QsT0FBTyxpQkFBaUIsQ0FBQztRQUM3QixDQUFDO1FBQ0wsOEJBQUM7SUFBRCxDQUFDLEFBaElELENBQTZDLCtCQUFjLEdBZ0kxRDtJQWhJWSwwREFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJUG9pbnQgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9wb2ludEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuLi8uLi9wb2ludFwiO1xyXG5pbXBvcnQgeyBCdXR0ZXJ3b3J0aCB9IGZyb20gXCIuL2ZpbHRlcnMvYnV0dGVyd29ydGhcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhTnVtYmVyIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YU51bWJlclwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFQb2ludHMgfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhUG9pbnRzXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvXCI7XHJcbmltcG9ydCB7IElWYWx1ZUxpc3RJdGVtIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvbW1vbi9pbnRlcmZhY2VzL3ZhbHVlTGlzdEl0ZW1JbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRvckJhc2UsIEVycm9yTWVzc2FnZVR5cGUgfSBmcm9tIFwiLi9jYWxjdWxhdG9yQmFzZVwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdG9ySGVscGVyIH0gZnJvbSBcIi4vY2FsY3VsYXRvckhlbHBlclwiO1xyXG5pbXBvcnQgeyBUQ2FsY3VsYXRpb25EYXRhIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIExwQnV0dGVyd29ydGhDYWxjdWxhdG9yIGV4dGVuZHMgQ2FsY3VsYXRvckJhc2Uge1xyXG5cclxuICAgIHByaXZhdGUgaW5wdXROYW1lMTogc3RyaW5nID0gXCJPcmRlclwiO1xyXG4gICAgcHJpdmF0ZSBpbnB1dE5hbWUyOiBzdHJpbmcgPSBcIkN1dG9mZiBmcmVxdWVuY3lcIjtcclxuICAgIHByaXZhdGUgaW5wdXROYW1lMzogc3RyaW5nID0gXCJJbnB1dCBzaWduYWxcIjtcclxuICAgIHByaXZhdGUgb3V0cHV0TmFtZTogc3RyaW5nID0gXCJPdXRwdXQgc2lnbmFsXCI7XHJcbiAgICBwcml2YXRlIG91dHB1dFZhbHVlOiBzdHJpbmcgPSBcImZpbHRlcmVkIHNpZ25hbFwiO1xyXG5cclxuICAgIHByaXZhdGUgX2ZpbHRlck9yZGVyTWluOiBudW1iZXI7IFxyXG4gICAgcHJpdmF0ZSBfZmlsdGVyT3JkZXJNYXg6IG51bWJlcjtcclxuICAgIFxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFwibHAgYnV0dGVyd29ydGhcIiwgXCJMUCBCdXR0ZXJ3b3J0aFwiLCBcIkZpbHRlcnMgYSBzaWduYWwgd2l0aCBhIHBhcmFtZXRlcml6YWJsZSBCdXR0ZXJ3b3J0aCBsb3ctcGFzcyBmaWx0ZXJcIik7XHJcblxyXG4gICAgICAgIHRoaXMuX2ZpbHRlck9yZGVyTWluID0gQnV0dGVyd29ydGguZmlsdGVyT3JkZXJNaW47XHJcbiAgICAgICAgdGhpcy5fZmlsdGVyT3JkZXJNYXggPSBCdXR0ZXJ3b3J0aC5maWx0ZXJPcmRlck1heDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0RGVmYXVsdElucHV0RGF0YSgpOiBBcnJheTxUQ2FsY3VsYXRpb25EYXRhPntcclxuICAgICAgICBsZXQgZGVmYXVsdElucHV0RGF0YSA9IHN1cGVyLmdldERlZmF1bHRJbnB1dERhdGEoKTtcclxuXHJcbiAgICAgICAgLy8gTnVtZXJpYywgMS01XHJcbiAgICAgICAgZGVmYXVsdElucHV0RGF0YS5wdXNoKG5ldyBDYWxjdWxhdGlvbkRhdGFOdW1iZXIodGhpcy5pbnB1dE5hbWUxLCAxLCBcIlRoZSBvcmRlciBvZiB0aGUgZmlsdGVyXCIsIG5ldyBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mbyh0cnVlLCBmYWxzZSwgdGhpcy5nZXRGaWx0ZXJPcmRlclZhbHVlcygpKSkpO1xyXG4gICAgICAgIGRlZmF1bHRJbnB1dERhdGEucHVzaChuZXcgQ2FsY3VsYXRpb25EYXRhTnVtYmVyKHRoaXMuaW5wdXROYW1lMiwgMy4yLCBcIlRoZSBjdXQtb2ZmIGZyZXF1ZW5jeSAoZnJlcXVlbmN5IHdpdGggYW4gYXR0ZW51YXRpb24gb2YgLTNkQikgb2YgdGhlIGZpbHRlclwiLCBuZXcgQ2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm8oZmFsc2UsIGZhbHNlKSkpO1xyXG4gICAgICAgIGRlZmF1bHRJbnB1dERhdGEucHVzaChuZXcgQ2FsY3VsYXRpb25EYXRhUG9pbnRzKHRoaXMuaW5wdXROYW1lMywgXCJcIiwgbmV3IEFycmF5PElQb2ludD4oKSwgXCJUaGUgc2lnbmFsIHRvIGJlIGZpbHRlcmVkXCIsIG5ldyBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mbyhmYWxzZSwgdHJ1ZSkpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRJbnB1dERhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldERlZmF1bHRPdXRwdXREYXRhKCk6IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz4ge1xyXG4gICAgICAgIGxldCBkZWZhdWx0T3V0cHV0RGF0YSA9IHN1cGVyLmdldERlZmF1bHRPdXRwdXREYXRhKCk7XHJcblxyXG4gICAgICAgIGRlZmF1bHRPdXRwdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YVBvaW50cyh0aGlzLm91dHB1dE5hbWUsIHRoaXMub3V0cHV0VmFsdWUsIG5ldyBBcnJheTxJUG9pbnQ+KCkpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRPdXRwdXREYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCB2ZXJpZnlDYWxjdWxhdGlvbklucHV0RGF0YSgpIHtcclxuICAgICAgICBzdXBlci52ZXJpZnlDYWxjdWxhdGlvbklucHV0RGF0YSgpO1xyXG5cclxuICAgICAgICBsZXQgY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXIgPSB0aGlzLmdldENhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyKCk7XHJcblxyXG4gICAgICAgIGxldCBmaWx0ZXJPcmRlciA9IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyWzBdO1xyXG4gICAgICAgIGxldCBjdXRvZmZGcmVxdWVuY3kgPSBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lclsxXTtcclxuICAgICAgICBsZXQgaW5wdXRTaWduYWwgPSBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lclsyXTtcclxuXHJcbiAgICAgICAgaWYoZmlsdGVyT3JkZXIgPT0gdW5kZWZpbmVkIHx8ICFDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNOdW1iZXIoZmlsdGVyT3JkZXIuZGF0YSkpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvckJ5VHlwZShFcnJvck1lc3NhZ2VUeXBlLk1pc3NpbmdPckludmFsaWRJbnB1dCwgW3RoaXMuaW5wdXROYW1lMV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihjdXRvZmZGcmVxdWVuY3kgPT0gdW5kZWZpbmVkIHx8ICFDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNOdW1iZXIoY3V0b2ZmRnJlcXVlbmN5LmRhdGEpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JCeVR5cGUoRXJyb3JNZXNzYWdlVHlwZS5NaXNzaW5nT3JJbnZhbGlkSW5wdXQsIFt0aGlzLmlucHV0TmFtZTJdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaW5wdXRTaWduYWwgPT0gdW5kZWZpbmVkIHx8ICFDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNTaWduYWwoaW5wdXRTaWduYWwuZGF0YSkpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvckJ5VHlwZShFcnJvck1lc3NhZ2VUeXBlLk1pc3NpbmdPckludmFsaWRJbnB1dCwgW3RoaXMuaW5wdXROYW1lM10pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5oYXNFcnJvcnMoKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lclswXS5kYXRhIDwgdGhpcy5fZmlsdGVyT3JkZXJNaW4gfHwgY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXJbMF0uZGF0YSA+IHRoaXMuX2ZpbHRlck9yZGVyTWF4KSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3IoXCJDYWxjdWxhdGlvbiBFcnJvcjogJ1wiICsgdGhpcy5pbnB1dE5hbWUxICsgXCInIGlzIG91dCBvZiByYW5nZSAodmFsaWQgcmFuZ2UgXCIgKyB0aGlzLl9maWx0ZXJPcmRlck1pbiArIFwiLVwiICsgdGhpcy5fZmlsdGVyT3JkZXJNYXggKyBcIikhXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZXhlY3V0ZUFsZ29yaXRobSgpIHtcclxuICAgICAgICBzdXBlci5leGVjdXRlQWxnb3JpdGhtKCk7XHJcblxyXG4gICAgICAgIGxldCBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lciA9IHRoaXMuZ2V0Q2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXIoKTtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IEFycmF5PElQb2ludD4oKTtcclxuXHJcbiAgICAgICAgbGV0IGZpbHRlck9yZGVyID0gY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXJbMF07XHJcbiAgICAgICAgbGV0IGN1dG9mZkZyZXF1ZW5jeSA9IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyWzFdO1xyXG4gICAgICAgIGxldCBpbnB1dFNpZ25hbCA9IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyWzJdO1xyXG5cclxuICAgICAgICBpZihDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNOdW1iZXIoZmlsdGVyT3JkZXIuZGF0YSkgJiYgQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzTnVtYmVyKGN1dG9mZkZyZXF1ZW5jeS5kYXRhKSAmJiBDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNTaWduYWwoaW5wdXRTaWduYWwuZGF0YSkpIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5jYWxjdWxhdGVCdXR0ZXJ3b3J0aChpbnB1dFNpZ25hbC5kYXRhLCBmaWx0ZXJPcmRlci5kYXRhLCBjdXRvZmZGcmVxdWVuY3kuZGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmFkZENhbGN1bGF0aW9uT3V0cHV0RGF0YSh7XHJcbiAgICAgICAgICAgIGRhdGE6IHJlc3VsdCxcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMub3V0cHV0VmFsdWUsXHJcbiAgICAgICAgICAgIG5hbWU6IHRoaXMub3V0cHV0TmFtZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsY3VsYXRlIGJ1dHRlcndvcnRoIHdpdGggdGhlIGdpdmVuIGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxJUG9pbnQ+fSBzaWduYWxEYXRhXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZmlsdGVyT3JkZXJcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbnB1dEN1dE9mZkZyZXF1ZW5jZVxyXG4gICAgICogQHJldHVybnMge0FycmF5PElQb2ludD59XHJcbiAgICAgKiBAbWVtYmVyb2YgTHBCdXR0ZXJ3b3J0aENhbGN1bGF0b3JcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVCdXR0ZXJ3b3J0aChzaWduYWxEYXRhOiBBcnJheTxJUG9pbnQ+LCBmaWx0ZXJPcmRlcjogbnVtYmVyLCBpbnB1dEN1dE9mZkZyZXF1ZW5jZTogbnVtYmVyKTogQXJyYXk8SVBvaW50PntcclxuICAgICAgICBsZXQgdHMgPSBDYWxjdWxhdG9ySGVscGVyLmVzdGltYXRlU2FtcGxlVGltZShzaWduYWxEYXRhKTtcclxuICAgICAgICBsZXQgaW5wdXRTaWduYWw6IG51bWJlcltdID0gbmV3IEFycmF5PG51bWJlcj4oKTtcclxuXHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGkgPCBzaWduYWxEYXRhLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaW5wdXRTaWduYWwucHVzaChzaWduYWxEYXRhW2ldLnkpO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGZpbHRlcjogQnV0dGVyd29ydGggPSBuZXcgQnV0dGVyd29ydGgoZmlsdGVyT3JkZXIsIGlucHV0Q3V0T2ZmRnJlcXVlbmNlLCB0cyk7IFxyXG4gICAgICAgIGxldCBvdXRwdXRTaWduYWw6IG51bWJlcltdID0gZmlsdGVyLmZpbHRlcihpbnB1dFNpZ25hbCk7XHJcblxyXG4gICAgICAgIGxldCBvdXRwdXQgPSBuZXcgQXJyYXk8SVBvaW50PigpO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpIDwgb3V0cHV0U2lnbmFsLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgb3V0cHV0LnB1c2gobmV3IFBvaW50KHNpZ25hbERhdGFbaV0ueCwgb3V0cHV0U2lnbmFsW2ldKSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG91dHB1dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHN1cHBvcnRlZCBmaWx0ZXIgb3JkZXJzIGZvciB0aGUgYnV0dGVyd29ydGggZmlsdGVyXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxJVmFsdWVMaXN0SXRlbT59XHJcbiAgICAgKiBAbWVtYmVyb2YgTHBCdXR0ZXJ3b3J0aENhbGN1bGF0b3JcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRGaWx0ZXJPcmRlclZhbHVlcygpOiBBcnJheTxJVmFsdWVMaXN0SXRlbT57XHJcbiAgICAgICAgbGV0IGZpbHRlck9yZGVyVmFsdWVzID0gbmV3IEFycmF5PElWYWx1ZUxpc3RJdGVtPigpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IHRoaXMuX2ZpbHRlck9yZGVyTWluOyAgaSA8PSB0aGlzLl9maWx0ZXJPcmRlck1heDsgaSsrKXtcclxuICAgICAgICAgICAgZmlsdGVyT3JkZXJWYWx1ZXMucHVzaCh7dmFsdWU6IGkudG9TdHJpbmcoKSwgZGlzcGxheVZhbHVlOiBpLnRvU3RyaW5nKCl9IGFzIElWYWx1ZUxpc3RJdGVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZpbHRlck9yZGVyVmFsdWVzO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcbiJdfQ==