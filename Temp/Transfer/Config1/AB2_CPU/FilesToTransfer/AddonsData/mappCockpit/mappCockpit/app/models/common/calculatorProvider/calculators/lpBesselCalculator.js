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
define(["require", "exports", "../../point", "./filters/bessel", "../calculationDataNumber", "../calculationDataPoints", "../calculationDataDisplayInfo", "./calculatorBase"], function (require, exports, point_1, bessel_1, calculationDataNumber_1, calculationDataPoints_1, calculationDataDisplayInfo_1, calculatorBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LpBesselCalculator = /** @class */ (function (_super) {
        __extends(LpBesselCalculator, _super);
        function LpBesselCalculator() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.id = "lp bessel";
            _this.displayName = "LP Bessel";
            _this.description = "Filters a signal with a parameterizable Bessel low-pass filter";
            _this.orderName = "Order";
            _this.cutoffFrequencyName = "Cutoff frequency";
            _this.inputSignalName = "Input signal";
            _this._filterOrderMin = 1;
            _this._filterOrderMax = 5;
            return _this;
        }
        /**
         * Returns the default input data for this calculator
         *
         * @returns {(Array<CalculationDataNumber|CalculationDataPoints>)}
         * @memberof LpBesselCalculator
         */
        LpBesselCalculator.prototype.getDefaultInputData = function () {
            var inputData = new Array();
            // add input params with default displaynames
            // Numeric, 1-5
            inputData.push(new calculationDataNumber_1.CalculationDataNumber(this.orderName, 1, "The order of the filter", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(true, false, this.getFilterOrderValues())));
            var cutOffFrequencyDisplayInfo = new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, false);
            cutOffFrequencyDisplayInfo.minValue = 0;
            inputData.push(new calculationDataNumber_1.CalculationDataNumber(this.cutoffFrequencyName, 3.2, "The cut-off frequency (frequency with an attenuation of -3dB) of the filter", cutOffFrequencyDisplayInfo));
            inputData.push(new calculationDataPoints_1.CalculationDataPoints(this.inputSignalName, "", new Array(), "The signal to be filtered", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            return inputData;
        };
        /**
         * Returns the default output data for this calculator
         *
         * @returns {Array<CalculationDataPoints>}
         * @memberof LpBesselCalculator
         */
        LpBesselCalculator.prototype.getDefaultOutputData = function () {
            var outputData = new Array();
            // add output params with default displaynames
            outputData.push(new calculationDataPoints_1.CalculationDataPoints("Output signal", "filtered signal", new Array()));
            return outputData;
        };
        /**
         * Calculates the bessel filter output data for the given input data
         *
         * @param {Array<ICalculationData>} inputData
         * @returns {Array<CalculationDataPoints>}
         * @memberof LpBesselCalculator
         */
        LpBesselCalculator.prototype.calculate = function (inputData) {
            this.clearErrors();
            // Create empty default output 
            var outputData = new Array();
            outputData.push(new calculationDataPoints_1.CalculationDataPoints("Output signal", "filtered signal", new Array()));
            // Get input data
            var filterOrder = inputData[0].getData();
            var inputCutOffFrequence = inputData[1].getData();
            var signalData = inputData[2].getData();
            // Check for valid input data
            this.checkForInvalidInputData(signalData, filterOrder, inputCutOffFrequence);
            // Return if errors occurred
            if (this.getErrors().length > 0) {
                return outputData;
            }
            // Calculate new data
            var output = this.calculateBessel(signalData, filterOrder, inputCutOffFrequence);
            // Set new outputdata
            outputData[0].setData(output);
            return outputData;
        };
        /**
         * Checks for invalid input data, and adds the error information to the errors of this calculation
         *
         * @private
         * @param {Array<IPoint>} signalData
         * @param {number} filterOrder
         * @param {number} inputCutOffFrequence
         * @memberof LpBesselCalculator
         */
        LpBesselCalculator.prototype.checkForInvalidInputData = function (signalData, filterOrder, inputCutOffFrequence) {
            if (isNaN(inputCutOffFrequence)) {
                this.addErrorByType(calculatorBase_1.ErroMessageType.MissingOrInvalidInput, [this.cutoffFrequencyName]);
            }
            if (signalData == undefined || signalData.length < 2) { // A minimum of two points is needed
                this.addErrorByType(calculatorBase_1.ErroMessageType.MissingOrInvalidInput, [this.inputSignalName]);
            }
            if (isNaN(filterOrder) || filterOrder > this._filterOrderMax || filterOrder < this._filterOrderMin) {
                this.addError("Calculation Error: '" + this.orderName + "' is not defined or out of range (valid range 1-5)!");
            }
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
            var ts = this.estimateSampleTime(signalData);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHBCZXNzZWxDYWxjdWxhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdG9ycy9scEJlc3NlbENhbGN1bGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVdBO1FBQXdDLHNDQUFjO1FBQXREO1lBQUEscUVBa0pDO1lBaEpHLFFBQUUsR0FBVyxXQUFXLENBQUM7WUFDekIsaUJBQVcsR0FBVyxXQUFXLENBQUM7WUFDbEMsaUJBQVcsR0FBVyxnRUFBZ0UsQ0FBQztZQUUvRSxlQUFTLEdBQVUsT0FBTyxDQUFDO1lBQzNCLHlCQUFtQixHQUFVLGtCQUFrQixDQUFDO1lBQ2hELHFCQUFlLEdBQVUsY0FBYyxDQUFDO1lBRXhDLHFCQUFlLEdBQUcsQ0FBQyxDQUFDO1lBQ3BCLHFCQUFlLEdBQUcsQ0FBQyxDQUFDOztRQXVJaEMsQ0FBQztRQXBJRzs7Ozs7V0FLRztRQUNJLGdEQUFtQixHQUExQjtZQUNJLElBQUksU0FBUyxHQUF1RCxJQUFJLEtBQUssRUFBK0MsQ0FBQztZQUM3SCw2Q0FBNkM7WUFFN0MsZUFBZTtZQUNmLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSw2Q0FBcUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSx5QkFBeUIsRUFBRSxJQUFJLHVEQUEwQixDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEssSUFBSSwwQkFBMEIsR0FBRyxJQUFJLHVEQUEwQixDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM5RSwwQkFBMEIsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1lBQ3hDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSw2Q0FBcUIsQ0FBQyxJQUFJLENBQUMsbUJBQW1C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LElBQUksQ0FBQyxFQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBbUIsQ0FBQyxDQUFDO2FBQy9GO1lBQ0QsT0FBTyxpQkFBaUIsQ0FBQztRQUM3QixDQUFDO1FBQ0wseUJBQUM7SUFBRCxDQUFDLEFBbEpELENBQXdDLCtCQUFjLEdBa0pyRDtJQWxKWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ2FsY3VsYXRvciB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2NhbGN1bGF0b3JJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSUNhbGN1bGF0aW9uRGF0YSB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2NhbGN1bGF0aW9uRGF0YUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9wb2ludEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuLi8uLi9wb2ludFwiO1xyXG5pbXBvcnQgeyBCZXNzZWwgfSBmcm9tIFwiLi9maWx0ZXJzL2Jlc3NlbFwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFOdW1iZXIgfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhTnVtYmVyXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YVBvaW50cyB9IGZyb20gXCIuLi9jYWxjdWxhdGlvbkRhdGFQb2ludHNcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm8gfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm9cIjtcclxuaW1wb3J0IHsgSVZhbHVlTGlzdEl0ZW0gfSBmcm9tIFwiLi4vLi4vLi4vLi4vY29tbW9uL2ludGVyZmFjZXMvdmFsdWVMaXN0SXRlbUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdG9yQmFzZSwgRXJyb01lc3NhZ2VUeXBlIH0gZnJvbSBcIi4vY2FsY3VsYXRvckJhc2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBMcEJlc3NlbENhbGN1bGF0b3IgZXh0ZW5kcyBDYWxjdWxhdG9yQmFzZSBpbXBsZW1lbnRzIElDYWxjdWxhdG9ye1xyXG4gICAgXHJcbiAgICBpZDogc3RyaW5nID0gXCJscCBiZXNzZWxcIjtcclxuICAgIGRpc3BsYXlOYW1lOiBzdHJpbmcgPSBcIkxQIEJlc3NlbFwiO1xyXG4gICAgZGVzY3JpcHRpb246IHN0cmluZyA9IFwiRmlsdGVycyBhIHNpZ25hbCB3aXRoIGEgcGFyYW1ldGVyaXphYmxlIEJlc3NlbCBsb3ctcGFzcyBmaWx0ZXJcIjtcclxuXHJcbiAgICBwcml2YXRlIG9yZGVyTmFtZTpzdHJpbmcgPSBcIk9yZGVyXCI7XHJcbiAgICBwcml2YXRlIGN1dG9mZkZyZXF1ZW5jeU5hbWU6c3RyaW5nID0gXCJDdXRvZmYgZnJlcXVlbmN5XCI7XHJcbiAgICBwcml2YXRlIGlucHV0U2lnbmFsTmFtZTpzdHJpbmcgPSBcIklucHV0IHNpZ25hbFwiO1xyXG5cclxuICAgIHByaXZhdGUgX2ZpbHRlck9yZGVyTWluID0gMTsgXHJcbiAgICBwcml2YXRlIF9maWx0ZXJPcmRlck1heCA9IDU7XHJcblxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgaW5wdXQgZGF0YSBmb3IgdGhpcyBjYWxjdWxhdG9yXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyhBcnJheTxDYWxjdWxhdGlvbkRhdGFOdW1iZXJ8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPil9XHJcbiAgICAgKiBAbWVtYmVyb2YgTHBCZXNzZWxDYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXREZWZhdWx0SW5wdXREYXRhKCk6IEFycmF5PENhbGN1bGF0aW9uRGF0YU51bWJlcnxDYWxjdWxhdGlvbkRhdGFQb2ludHM+e1xyXG4gICAgICAgIGxldCBpbnB1dERhdGE6IEFycmF5PENhbGN1bGF0aW9uRGF0YU51bWJlcnxDYWxjdWxhdGlvbkRhdGFQb2ludHM+ID0gbmV3IEFycmF5PENhbGN1bGF0aW9uRGF0YU51bWJlcnxDYWxjdWxhdGlvbkRhdGFQb2ludHM+KCk7XHJcbiAgICAgICAgLy8gYWRkIGlucHV0IHBhcmFtcyB3aXRoIGRlZmF1bHQgZGlzcGxheW5hbWVzXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gTnVtZXJpYywgMS01XHJcbiAgICAgICAgaW5wdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YU51bWJlcih0aGlzLm9yZGVyTmFtZSwgMSwgXCJUaGUgb3JkZXIgb2YgdGhlIGZpbHRlclwiLCBuZXcgQ2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm8odHJ1ZSwgZmFsc2UsIHRoaXMuZ2V0RmlsdGVyT3JkZXJWYWx1ZXMoKSkpKTtcclxuICAgICAgICBsZXQgY3V0T2ZmRnJlcXVlbmN5RGlzcGxheUluZm8gPSBuZXcgQ2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm8oZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICBjdXRPZmZGcmVxdWVuY3lEaXNwbGF5SW5mby5taW5WYWx1ZSA9IDA7XHJcbiAgICAgICAgaW5wdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YU51bWJlcih0aGlzLmN1dG9mZkZyZXF1ZW5jeU5hbWUsIDMuMiwgXCJUaGUgY3V0LW9mZiBmcmVxdWVuY3kgKGZyZXF1ZW5jeSB3aXRoIGFuIGF0dGVudWF0aW9uIG9mIC0zZEIpIG9mIHRoZSBmaWx0ZXJcIiwgY3V0T2ZmRnJlcXVlbmN5RGlzcGxheUluZm8pKTtcclxuICAgICAgICBpbnB1dERhdGEucHVzaChuZXcgQ2FsY3VsYXRpb25EYXRhUG9pbnRzKHRoaXMuaW5wdXRTaWduYWxOYW1lLCBcIlwiLCBuZXcgQXJyYXk8SVBvaW50PigpLCBcIlRoZSBzaWduYWwgdG8gYmUgZmlsdGVyZWRcIiwgbmV3IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvKGZhbHNlLCB0cnVlKSkpO1xyXG4gICAgICAgIHJldHVybiBpbnB1dERhdGE7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBvdXRwdXQgZGF0YSBmb3IgdGhpcyBjYWxjdWxhdG9yXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0FycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz59XHJcbiAgICAgKiBAbWVtYmVyb2YgTHBCZXNzZWxDYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXREZWZhdWx0T3V0cHV0RGF0YSgpOiBBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+e1xyXG4gICAgICAgIGxldCBvdXRwdXREYXRhID0gbmV3IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz4oKTtcclxuICAgICAgICAvLyBhZGQgb3V0cHV0IHBhcmFtcyB3aXRoIGRlZmF1bHQgZGlzcGxheW5hbWVzXHJcbiAgICAgICAgb3V0cHV0RGF0YS5wdXNoKG5ldyBDYWxjdWxhdGlvbkRhdGFQb2ludHMoXCJPdXRwdXQgc2lnbmFsXCIsIFwiZmlsdGVyZWQgc2lnbmFsXCIsIG5ldyBBcnJheTxJUG9pbnQ+KCkpKTsgXHJcbiAgICAgICAgcmV0dXJuIG91dHB1dERhdGE7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsY3VsYXRlcyB0aGUgYmVzc2VsIGZpbHRlciBvdXRwdXQgZGF0YSBmb3IgdGhlIGdpdmVuIGlucHV0IGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElDYWxjdWxhdGlvbkRhdGE+fSBpbnB1dERhdGFcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+fVxyXG4gICAgICogQG1lbWJlcm9mIExwQmVzc2VsQ2FsY3VsYXRvclxyXG4gICAgICovXHJcbiAgICBjYWxjdWxhdGUoaW5wdXREYXRhOiBBcnJheTxJQ2FsY3VsYXRpb25EYXRhPik6IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz4ge1xyXG4gICAgICAgIHRoaXMuY2xlYXJFcnJvcnMoKTtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIGVtcHR5IGRlZmF1bHQgb3V0cHV0IFxyXG4gICAgICAgIGxldCBvdXRwdXREYXRhID0gbmV3IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz4oKTtcclxuICAgICAgICBvdXRwdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YVBvaW50cyhcIk91dHB1dCBzaWduYWxcIiwgXCJmaWx0ZXJlZCBzaWduYWxcIiwgbmV3IEFycmF5PElQb2ludD4oKSkpOyBcclxuXHJcbiAgICAgICAgLy8gR2V0IGlucHV0IGRhdGFcclxuICAgICAgICBsZXQgZmlsdGVyT3JkZXIgPSAoaW5wdXREYXRhWzBdIGFzIENhbGN1bGF0aW9uRGF0YU51bWJlcikuZ2V0RGF0YSgpIDtcclxuICAgICAgICBsZXQgaW5wdXRDdXRPZmZGcmVxdWVuY2UgPSAoaW5wdXREYXRhWzFdIGFzIENhbGN1bGF0aW9uRGF0YU51bWJlcikuZ2V0RGF0YSgpO1xyXG4gICAgICAgIGxldCBzaWduYWxEYXRhID0gKGlucHV0RGF0YVsyXSBhcyBDYWxjdWxhdGlvbkRhdGFQb2ludHMpLmdldERhdGEoKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBDaGVjayBmb3IgdmFsaWQgaW5wdXQgZGF0YVxyXG4gICAgICAgIHRoaXMuY2hlY2tGb3JJbnZhbGlkSW5wdXREYXRhKHNpZ25hbERhdGEsIGZpbHRlck9yZGVyLCBpbnB1dEN1dE9mZkZyZXF1ZW5jZSk7XHJcblxyXG4gICAgICAgIC8vIFJldHVybiBpZiBlcnJvcnMgb2NjdXJyZWRcclxuICAgICAgICBpZih0aGlzLmdldEVycm9ycygpLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICByZXR1cm4gb3V0cHV0RGF0YTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gQ2FsY3VsYXRlIG5ldyBkYXRhXHJcbiAgICAgICAgbGV0IG91dHB1dCA9IHRoaXMuY2FsY3VsYXRlQmVzc2VsKHNpZ25hbERhdGEsIGZpbHRlck9yZGVyLCBpbnB1dEN1dE9mZkZyZXF1ZW5jZSk7XHJcblxyXG4gICAgICAgIC8vIFNldCBuZXcgb3V0cHV0ZGF0YVxyXG4gICAgICAgIG91dHB1dERhdGFbMF0uc2V0RGF0YShvdXRwdXQpO1xyXG4gICAgICAgIHJldHVybiBvdXRwdXREYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGZvciBpbnZhbGlkIGlucHV0IGRhdGEsIGFuZCBhZGRzIHRoZSBlcnJvciBpbmZvcm1hdGlvbiB0byB0aGUgZXJyb3JzIG9mIHRoaXMgY2FsY3VsYXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxJUG9pbnQ+fSBzaWduYWxEYXRhXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZmlsdGVyT3JkZXJcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbnB1dEN1dE9mZkZyZXF1ZW5jZVxyXG4gICAgICogQG1lbWJlcm9mIExwQmVzc2VsQ2FsY3VsYXRvclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNoZWNrRm9ySW52YWxpZElucHV0RGF0YShzaWduYWxEYXRhOiBBcnJheTxJUG9pbnQ+LCBmaWx0ZXJPcmRlcjogbnVtYmVyLCBpbnB1dEN1dE9mZkZyZXF1ZW5jZTogbnVtYmVyKXtcclxuICAgICAgICBpZihpc05hTihpbnB1dEN1dE9mZkZyZXF1ZW5jZSkpe1xyXG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yQnlUeXBlKEVycm9NZXNzYWdlVHlwZS5NaXNzaW5nT3JJbnZhbGlkSW5wdXQsIFt0aGlzLmN1dG9mZkZyZXF1ZW5jeU5hbWVdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoc2lnbmFsRGF0YSA9PSB1bmRlZmluZWQgfHwgc2lnbmFsRGF0YS5sZW5ndGggPCAyKXsgLy8gQSBtaW5pbXVtIG9mIHR3byBwb2ludHMgaXMgbmVlZGVkXHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JCeVR5cGUoRXJyb01lc3NhZ2VUeXBlLk1pc3NpbmdPckludmFsaWRJbnB1dCwgW3RoaXMuaW5wdXRTaWduYWxOYW1lXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihpc05hTihmaWx0ZXJPcmRlcikgfHwgZmlsdGVyT3JkZXIgPiB0aGlzLl9maWx0ZXJPcmRlck1heCB8fCBmaWx0ZXJPcmRlciA8IHRoaXMuX2ZpbHRlck9yZGVyTWluICl7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3IoXCJDYWxjdWxhdGlvbiBFcnJvcjogJ1wiICsgdGhpcy5vcmRlck5hbWUgKyBcIicgaXMgbm90IGRlZmluZWQgb3Igb3V0IG9mIHJhbmdlICh2YWxpZCByYW5nZSAxLTUpIVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxjdWxhdGUgYmVzc2VsIHdpdGggdGhlIGdpdmVuIGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxJUG9pbnQ+fSBzaWduYWxEYXRhXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZmlsdGVyT3JkZXJcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbnB1dEN1dE9mZkZyZXF1ZW5jZVxyXG4gICAgICogQHJldHVybnMge0FycmF5PElQb2ludD59XHJcbiAgICAgKiBAbWVtYmVyb2YgTHBCZXNzZWxDYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2FsY3VsYXRlQmVzc2VsKHNpZ25hbERhdGE6IEFycmF5PElQb2ludD4sIGZpbHRlck9yZGVyOiBudW1iZXIsIGlucHV0Q3V0T2ZmRnJlcXVlbmNlOiBudW1iZXIpOiBBcnJheTxJUG9pbnQ+e1xyXG4gICAgICAgIGxldCB0cyA9IHRoaXMuZXN0aW1hdGVTYW1wbGVUaW1lKHNpZ25hbERhdGEpO1xyXG4gICAgICAgIGxldCBpbnB1dFNpZ25hbDogbnVtYmVyW10gPSBuZXcgQXJyYXk8bnVtYmVyPigpO1xyXG5cclxuICAgICAgICBmb3IobGV0IGk9MDsgaSA8IHNpZ25hbERhdGEubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpbnB1dFNpZ25hbC5wdXNoKHNpZ25hbERhdGFbaV0ueSk7XHJcbiAgICAgICAgfSBcclxuICAgICAgICBcclxuICAgICAgICBsZXQgZmlsdGVyOiBCZXNzZWwgPSBuZXcgQmVzc2VsKGZpbHRlck9yZGVyLCBpbnB1dEN1dE9mZkZyZXF1ZW5jZSwgdHMpOyBcclxuICAgICAgICBsZXQgb3V0cHV0U2lnbmFsOiBudW1iZXJbXSA9IGZpbHRlci5maWx0ZXIoaW5wdXRTaWduYWwpO1xyXG5cclxuICAgICAgICBsZXQgb3V0cHV0ID0gbmV3IEFycmF5PElQb2ludD4oKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaSA8IG91dHB1dFNpZ25hbC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIG91dHB1dC5wdXNoKG5ldyBQb2ludChzaWduYWxEYXRhW2ldLngsIG91dHB1dFNpZ25hbFtpXSkpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvdXRwdXQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgc3VwcG9ydGVkIGZpbHRlciBvcmRlcnMgZm9yIHRoZSBiZXNzZWwgZmlsdGVyXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxJVmFsdWVMaXN0SXRlbT59XHJcbiAgICAgKiBAbWVtYmVyb2YgTHBCZXNzZWxDYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0RmlsdGVyT3JkZXJWYWx1ZXMoKTogQXJyYXk8SVZhbHVlTGlzdEl0ZW0+e1xyXG4gICAgICAgIGxldCBmaWx0ZXJPcmRlclZhbHVlcyA9IG5ldyBBcnJheTxJVmFsdWVMaXN0SXRlbT4oKTtcclxuICAgICAgICBmb3IobGV0IGkgPSB0aGlzLl9maWx0ZXJPcmRlck1pbjsgIGkgPD0gdGhpcy5fZmlsdGVyT3JkZXJNYXg7IGkrKyl7XHJcbiAgICAgICAgICAgIGZpbHRlck9yZGVyVmFsdWVzLnB1c2goe3ZhbHVlOiBpLnRvU3RyaW5nKCksIGRpc3BsYXlWYWx1ZTogaS50b1N0cmluZygpfSBhcyBJVmFsdWVMaXN0SXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmaWx0ZXJPcmRlclZhbHVlcztcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG4iXX0=