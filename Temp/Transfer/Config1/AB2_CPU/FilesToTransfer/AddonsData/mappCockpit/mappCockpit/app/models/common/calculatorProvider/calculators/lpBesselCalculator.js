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
define(["require", "exports", "../../point", "./filters/bessel", "../calculationDataNumber", "../calculationDataPoints", "../calculationDataDisplayInfo", "./calculatorBase", "./calculatorHelper"], function (require, exports, point_1, bessel_1, calculationDataNumber_1, calculationDataPoints_1, calculationDataDisplayInfo_1, calculatorBase_1, calculatorHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LpBesselCalculator = /** @class */ (function (_super) {
        __extends(LpBesselCalculator, _super);
        function LpBesselCalculator() {
            var _this = _super.call(this, "lp bessel", "LP Bessel", "Filters a signal with a parameterizable Bessel low-pass filter") || this;
            _this.inputName1 = "Order";
            _this.inputName2 = "Cutoff frequency";
            _this.inputName3 = "Input signal";
            _this.outputName = "Output signal";
            _this.outputValue = "filtered signal";
            _this._filterOrderMin = bessel_1.Bessel.filterOrderMin;
            _this._filterOrderMax = bessel_1.Bessel.filterOrderMax;
            return _this;
        }
        LpBesselCalculator.prototype.getDefaultInputData = function () {
            var defaultInputData = _super.prototype.getDefaultInputData.call(this);
            var cutOffFrequencyDisplayInfo = new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, false);
            cutOffFrequencyDisplayInfo.minValue = 0;
            // Numeric, 1-5
            defaultInputData.push(new calculationDataNumber_1.CalculationDataNumber(this.inputName1, 1, "The order of the filter", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(true, false, this.getFilterOrderValues())));
            defaultInputData.push(new calculationDataNumber_1.CalculationDataNumber(this.inputName2, 3.2, "The cut-off frequency (frequency with an attenuation of -3dB) of the filter", cutOffFrequencyDisplayInfo));
            defaultInputData.push(new calculationDataPoints_1.CalculationDataPoints(this.inputName3, "", new Array(), "The signal to be filtered", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            return defaultInputData;
        };
        LpBesselCalculator.prototype.getDefaultOutputData = function () {
            var defaultOutputData = _super.prototype.getDefaultOutputData.call(this);
            defaultOutputData.push(new calculationDataPoints_1.CalculationDataPoints(this.outputName, this.outputValue, new Array()));
            return defaultOutputData;
        };
        LpBesselCalculator.prototype.verifyCalculationInputData = function () {
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
            if (filterOrder.data < this._filterOrderMin || filterOrder.data > this._filterOrderMax) {
                this.addError("Calculation Error: '" + this.inputName1 + "' is out of range (valid range " + this._filterOrderMin + "-" + this._filterOrderMax + ")!");
            }
        };
        LpBesselCalculator.prototype.executeAlgorithm = function () {
            _super.prototype.executeAlgorithm.call(this);
            var calculationInputDataContainer = this.getCalculationInputDataContainer();
            var result = new Array();
            var filterOrder = calculationInputDataContainer[0];
            var cutoffFrequency = calculationInputDataContainer[1];
            var inputSignal = calculationInputDataContainer[2];
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(filterOrder.data) && calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(cutoffFrequency.data) && calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(inputSignal.data)) {
                result = this.calculateBessel(inputSignal.data, filterOrder.data, cutoffFrequency.data);
            }
            this.addCalculationOutputData({
                data: result,
                value: this.outputValue,
                name: this.outputName
            });
        };
        /**
         * Calculate bessel with the given data
         *
         * @private
         * @param {Array<IPoint>} signalData
         * @param {number} filterOrder
         * @param {number} inputCutOffFrequence
         * @returns {Array<IPoint>}
         * @memberof LpBesselCalculator
         */
        LpBesselCalculator.prototype.calculateBessel = function (signalData, filterOrder, inputCutOffFrequence) {
            var ts = calculatorHelper_1.CalculatorHelper.estimateSampleTime(signalData);
            var inputSignal = new Array();
            for (var i = 0; i < signalData.length; i++) {
                inputSignal.push(signalData[i].y);
            }
            var filter = new bessel_1.Bessel(filterOrder, inputCutOffFrequence, ts);
            var outputSignal = filter.filter(inputSignal);
            var output = new Array();
            for (var i = 0; i < outputSignal.length; i++) {
                output.push(new point_1.Point(signalData[i].x, outputSignal[i]));
            }
            return output;
        };
        /**
         * Returns the supported filter orders for the bessel filter
         *
         * @private
         * @returns {Array<IValueListItem>}
         * @memberof LpBesselCalculator
         */
        LpBesselCalculator.prototype.getFilterOrderValues = function () {
            var filterOrderValues = new Array();
            for (var i = this._filterOrderMin; i <= this._filterOrderMax; i++) {
                filterOrderValues.push({ value: i.toString(), displayValue: i.toString() });
            }
            return filterOrderValues;
        };
        return LpBesselCalculator;
    }(calculatorBase_1.CalculatorBase));
    exports.LpBesselCalculator = LpBesselCalculator;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHBCZXNzZWxDYWxjdWxhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdG9ycy9scEJlc3NlbENhbGN1bGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVdBO1FBQXdDLHNDQUFjO1FBV2xEO1lBQUEsWUFDSSxrQkFBTSxXQUFXLEVBQUUsV0FBVyxFQUFFLGdFQUFnRSxDQUFDLFNBSXBHO1lBZE8sZ0JBQVUsR0FBVyxPQUFPLENBQUM7WUFDN0IsZ0JBQVUsR0FBVyxrQkFBa0IsQ0FBQztZQUN4QyxnQkFBVSxHQUFXLGNBQWMsQ0FBQztZQUNwQyxnQkFBVSxHQUFXLGVBQWUsQ0FBQztZQUNyQyxpQkFBVyxHQUFXLGlCQUFpQixDQUFDO1lBUTVDLEtBQUksQ0FBQyxlQUFlLEdBQUcsZUFBTSxDQUFDLGNBQWMsQ0FBQztZQUM3QyxLQUFJLENBQUMsZUFBZSxHQUFHLGVBQU0sQ0FBQyxjQUFjLENBQUM7O1FBQ2pELENBQUM7UUFFTSxnREFBbUIsR0FBMUI7WUFDSSxJQUFJLGdCQUFnQixHQUFHLGlCQUFNLG1CQUFtQixXQUFFLENBQUM7WUFFbkQsSUFBSSwwQkFBMEIsR0FBRyxJQUFJLHVEQUEwQixDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM5RSwwQkFBMEIsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1lBRXhDLGVBQWU7WUFDZixnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSw2Q0FBcUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSx5QkFBeUIsRUFBRSxJQUFJLHVEQUEwQixDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUssZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElB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LEdBQUcsSUFBSSxLQUFLLEVBQVUsQ0FBQztZQUNqQyxLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztnQkFDdEMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLGFBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7YUFDM0Q7WUFDRCxPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ssaURBQW9CLEdBQTVCO1lBQ0ksSUFBSSxpQkFBaUIsR0FBRyxJQUFJLEtBQUssRUFBa0IsQ0FBQztZQUNwRCxLQUFJLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQzlELGlCQUFpQixDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBbUIsQ0FBQyxDQUFDO2FBQy9GO1lBQ0QsT0FBTyxpQkFBaUIsQ0FBQztRQUM3QixDQUFDO1FBQ0wseUJBQUM7SUFBRCxDQUFDLEFBbklELENBQXdDLCtCQUFjLEdBbUlyRDtJQW5JWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJUG9pbnQgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9wb2ludEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuLi8uLi9wb2ludFwiO1xyXG5pbXBvcnQgeyBCZXNzZWwgfSBmcm9tIFwiLi9maWx0ZXJzL2Jlc3NlbFwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFOdW1iZXIgfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhTnVtYmVyXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YVBvaW50cyB9IGZyb20gXCIuLi9jYWxjdWxhdGlvbkRhdGFQb2ludHNcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm8gfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm9cIjtcclxuaW1wb3J0IHsgSVZhbHVlTGlzdEl0ZW0gfSBmcm9tIFwiLi4vLi4vLi4vLi4vY29tbW9uL2ludGVyZmFjZXMvdmFsdWVMaXN0SXRlbUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdG9yQmFzZSwgRXJyb3JNZXNzYWdlVHlwZSB9IGZyb20gXCIuL2NhbGN1bGF0b3JCYXNlXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0b3JIZWxwZXIgfSBmcm9tIFwiLi9jYWxjdWxhdG9ySGVscGVyXCI7XHJcbmltcG9ydCB7IFRDYWxjdWxhdGlvbkRhdGEgfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTHBCZXNzZWxDYWxjdWxhdG9yIGV4dGVuZHMgQ2FsY3VsYXRvckJhc2Uge1xyXG5cclxuICAgIHByaXZhdGUgaW5wdXROYW1lMTogc3RyaW5nID0gXCJPcmRlclwiO1xyXG4gICAgcHJpdmF0ZSBpbnB1dE5hbWUyOiBzdHJpbmcgPSBcIkN1dG9mZiBmcmVxdWVuY3lcIjtcclxuICAgIHByaXZhdGUgaW5wdXROYW1lMzogc3RyaW5nID0gXCJJbnB1dCBzaWduYWxcIjtcclxuICAgIHByaXZhdGUgb3V0cHV0TmFtZTogc3RyaW5nID0gXCJPdXRwdXQgc2lnbmFsXCI7XHJcbiAgICBwcml2YXRlIG91dHB1dFZhbHVlOiBzdHJpbmcgPSBcImZpbHRlcmVkIHNpZ25hbFwiO1xyXG5cclxuICAgIHByaXZhdGUgX2ZpbHRlck9yZGVyTWluOiBudW1iZXI7IFxyXG4gICAgcHJpdmF0ZSBfZmlsdGVyT3JkZXJNYXg6IG51bWJlcjtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoXCJscCBiZXNzZWxcIiwgXCJMUCBCZXNzZWxcIiwgXCJGaWx0ZXJzIGEgc2lnbmFsIHdpdGggYSBwYXJhbWV0ZXJpemFibGUgQmVzc2VsIGxvdy1wYXNzIGZpbHRlclwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5fZmlsdGVyT3JkZXJNaW4gPSBCZXNzZWwuZmlsdGVyT3JkZXJNaW47XHJcbiAgICAgICAgdGhpcy5fZmlsdGVyT3JkZXJNYXggPSBCZXNzZWwuZmlsdGVyT3JkZXJNYXg7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldERlZmF1bHRJbnB1dERhdGEoKTogQXJyYXk8VENhbGN1bGF0aW9uRGF0YT57XHJcbiAgICAgICAgbGV0IGRlZmF1bHRJbnB1dERhdGEgPSBzdXBlci5nZXREZWZhdWx0SW5wdXREYXRhKCk7XHJcblxyXG4gICAgICAgIGxldCBjdXRPZmZGcmVxdWVuY3lEaXNwbGF5SW5mbyA9IG5ldyBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mbyhmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgIGN1dE9mZkZyZXF1ZW5jeURpc3BsYXlJbmZvLm1pblZhbHVlID0gMDtcclxuXHJcbiAgICAgICAgLy8gTnVtZXJpYywgMS01XHJcbiAgICAgICAgZGVmYXVsdElucHV0RGF0YS5wdXNoKG5ldyBDYWxjdWxhdGlvbkRhdGFOdW1iZXIodGhpcy5pbnB1dE5hbWUxLCAxLCBcIlRoZSBvcmRlciBvZiB0aGUgZmlsdGVyXCIsIG5ldyBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mbyh0cnVlLCBmYWxzZSwgdGhpcy5nZXRGaWx0ZXJPcmRlclZhbHVlcygpKSkpO1xyXG4gICAgICAgIGRlZmF1bHRJbnB1dERhdGEucHVzaChuZXcgQ2FsY3VsYXRpb25EYXRhTnVtYmVyKHRoaXMuaW5wdXROYW1lMiwgMy4yLCBcIlRoZSBjdXQtb2ZmIGZyZXF1ZW5jeSAoZnJlcXVlbmN5IHdpdGggYW4gYXR0ZW51YXRpb24gb2YgLTNkQikgb2YgdGhlIGZpbHRlclwiLCBjdXRPZmZGcmVxdWVuY3lEaXNwbGF5SW5mbykpO1xyXG4gICAgICAgIGRlZmF1bHRJbnB1dERhdGEucHVzaChuZXcgQ2FsY3VsYXRpb25EYXRhUG9pbnRzKHRoaXMuaW5wdXROYW1lMywgXCJcIiwgbmV3IEFycmF5PElQb2ludD4oKSwgXCJUaGUgc2lnbmFsIHRvIGJlIGZpbHRlcmVkXCIsIG5ldyBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mbyhmYWxzZSwgdHJ1ZSkpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRJbnB1dERhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldERlZmF1bHRPdXRwdXREYXRhKCk6IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz4ge1xyXG4gICAgICAgIGxldCBkZWZhdWx0T3V0cHV0RGF0YSA9IHN1cGVyLmdldERlZmF1bHRPdXRwdXREYXRhKCk7XHJcblxyXG4gICAgICAgIGRlZmF1bHRPdXRwdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YVBvaW50cyh0aGlzLm91dHB1dE5hbWUsIHRoaXMub3V0cHV0VmFsdWUsIG5ldyBBcnJheTxJUG9pbnQ+KCkpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRPdXRwdXREYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCB2ZXJpZnlDYWxjdWxhdGlvbklucHV0RGF0YSgpIHtcclxuICAgICAgICBzdXBlci52ZXJpZnlDYWxjdWxhdGlvbklucHV0RGF0YSgpO1xyXG5cclxuICAgICAgICBsZXQgY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXIgPSB0aGlzLmdldENhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyKCk7XHJcblxyXG4gICAgICAgIGxldCBmaWx0ZXJPcmRlciA9IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyWzBdO1xyXG4gICAgICAgIGxldCBjdXRvZmZGcmVxdWVuY3kgPSBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lclsxXTtcclxuICAgICAgICBsZXQgaW5wdXRTaWduYWwgPSBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lclsyXTtcclxuXHJcbiAgICAgICAgaWYoZmlsdGVyT3JkZXIgPT0gdW5kZWZpbmVkIHx8ICFDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNOdW1iZXIoZmlsdGVyT3JkZXIuZGF0YSkpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvckJ5VHlwZShFcnJvck1lc3NhZ2VUeXBlLk1pc3NpbmdPckludmFsaWRJbnB1dCwgW3RoaXMuaW5wdXROYW1lMV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihjdXRvZmZGcmVxdWVuY3kgPT0gdW5kZWZpbmVkIHx8ICFDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNOdW1iZXIoY3V0b2ZmRnJlcXVlbmN5LmRhdGEpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JCeVR5cGUoRXJyb3JNZXNzYWdlVHlwZS5NaXNzaW5nT3JJbnZhbGlkSW5wdXQsIFt0aGlzLmlucHV0TmFtZTJdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaW5wdXRTaWduYWwgPT0gdW5kZWZpbmVkIHx8ICFDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNTaWduYWwoaW5wdXRTaWduYWwuZGF0YSkpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvckJ5VHlwZShFcnJvck1lc3NhZ2VUeXBlLk1pc3NpbmdPckludmFsaWRJbnB1dCwgW3RoaXMuaW5wdXROYW1lM10pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5oYXNFcnJvcnMoKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihmaWx0ZXJPcmRlci5kYXRhIDwgdGhpcy5fZmlsdGVyT3JkZXJNaW4gfHwgZmlsdGVyT3JkZXIuZGF0YSA+IHRoaXMuX2ZpbHRlck9yZGVyTWF4KSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3IoXCJDYWxjdWxhdGlvbiBFcnJvcjogJ1wiICsgdGhpcy5pbnB1dE5hbWUxICsgXCInIGlzIG91dCBvZiByYW5nZSAodmFsaWQgcmFuZ2UgXCIgKyB0aGlzLl9maWx0ZXJPcmRlck1pbiArIFwiLVwiICsgdGhpcy5fZmlsdGVyT3JkZXJNYXggKyBcIikhXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZXhlY3V0ZUFsZ29yaXRobSgpIHtcclxuICAgICAgICBzdXBlci5leGVjdXRlQWxnb3JpdGhtKCk7XHJcblxyXG4gICAgICAgIGxldCBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lciA9IHRoaXMuZ2V0Q2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXIoKTtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IEFycmF5PElQb2ludD4oKTtcclxuXHJcbiAgICAgICAgbGV0IGZpbHRlck9yZGVyID0gY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXJbMF07XHJcbiAgICAgICAgbGV0IGN1dG9mZkZyZXF1ZW5jeSA9IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyWzFdO1xyXG4gICAgICAgIGxldCBpbnB1dFNpZ25hbCA9IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyWzJdO1xyXG5cclxuICAgICAgICBpZihDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNOdW1iZXIoZmlsdGVyT3JkZXIuZGF0YSkgJiYgQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzTnVtYmVyKGN1dG9mZkZyZXF1ZW5jeS5kYXRhKSAmJiBDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNTaWduYWwoaW5wdXRTaWduYWwuZGF0YSkpIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5jYWxjdWxhdGVCZXNzZWwoaW5wdXRTaWduYWwuZGF0YSwgZmlsdGVyT3JkZXIuZGF0YSwgY3V0b2ZmRnJlcXVlbmN5LmRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5hZGRDYWxjdWxhdGlvbk91dHB1dERhdGEoe1xyXG4gICAgICAgICAgICBkYXRhOiByZXN1bHQsXHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLm91dHB1dFZhbHVlLFxyXG4gICAgICAgICAgICBuYW1lOiB0aGlzLm91dHB1dE5hbWVcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0ZSBiZXNzZWwgd2l0aCB0aGUgZ2l2ZW4gZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElQb2ludD59IHNpZ25hbERhdGFcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBmaWx0ZXJPcmRlclxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGlucHV0Q3V0T2ZmRnJlcXVlbmNlXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8SVBvaW50Pn1cclxuICAgICAqIEBtZW1iZXJvZiBMcEJlc3NlbENhbGN1bGF0b3JcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVCZXNzZWwoc2lnbmFsRGF0YTogQXJyYXk8SVBvaW50PiwgZmlsdGVyT3JkZXI6IG51bWJlciwgaW5wdXRDdXRPZmZGcmVxdWVuY2U6IG51bWJlcik6IEFycmF5PElQb2ludD57XHJcbiAgICAgICAgbGV0IHRzID0gQ2FsY3VsYXRvckhlbHBlci5lc3RpbWF0ZVNhbXBsZVRpbWUoc2lnbmFsRGF0YSk7XHJcbiAgICAgICAgbGV0IGlucHV0U2lnbmFsOiBudW1iZXJbXSA9IG5ldyBBcnJheTxudW1iZXI+KCk7XHJcblxyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpIDwgc2lnbmFsRGF0YS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlucHV0U2lnbmFsLnB1c2goc2lnbmFsRGF0YVtpXS55KTtcclxuICAgICAgICB9IFxyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBmaWx0ZXI6IEJlc3NlbCA9IG5ldyBCZXNzZWwoZmlsdGVyT3JkZXIsIGlucHV0Q3V0T2ZmRnJlcXVlbmNlLCB0cyk7IFxyXG4gICAgICAgIGxldCBvdXRwdXRTaWduYWw6IG51bWJlcltdID0gZmlsdGVyLmZpbHRlcihpbnB1dFNpZ25hbCk7XHJcblxyXG4gICAgICAgIGxldCBvdXRwdXQgPSBuZXcgQXJyYXk8SVBvaW50PigpO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpIDwgb3V0cHV0U2lnbmFsLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgb3V0cHV0LnB1c2gobmV3IFBvaW50KHNpZ25hbERhdGFbaV0ueCwgb3V0cHV0U2lnbmFsW2ldKSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG91dHB1dDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBzdXBwb3J0ZWQgZmlsdGVyIG9yZGVycyBmb3IgdGhlIGJlc3NlbCBmaWx0ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge0FycmF5PElWYWx1ZUxpc3RJdGVtPn1cclxuICAgICAqIEBtZW1iZXJvZiBMcEJlc3NlbENhbGN1bGF0b3JcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRGaWx0ZXJPcmRlclZhbHVlcygpOiBBcnJheTxJVmFsdWVMaXN0SXRlbT57XHJcbiAgICAgICAgbGV0IGZpbHRlck9yZGVyVmFsdWVzID0gbmV3IEFycmF5PElWYWx1ZUxpc3RJdGVtPigpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IHRoaXMuX2ZpbHRlck9yZGVyTWluOyAgaSA8PSB0aGlzLl9maWx0ZXJPcmRlck1heDsgaSsrKXtcclxuICAgICAgICAgICAgZmlsdGVyT3JkZXJWYWx1ZXMucHVzaCh7dmFsdWU6IGkudG9TdHJpbmcoKSwgZGlzcGxheVZhbHVlOiBpLnRvU3RyaW5nKCl9IGFzIElWYWx1ZUxpc3RJdGVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZpbHRlck9yZGVyVmFsdWVzO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcbiJdfQ==