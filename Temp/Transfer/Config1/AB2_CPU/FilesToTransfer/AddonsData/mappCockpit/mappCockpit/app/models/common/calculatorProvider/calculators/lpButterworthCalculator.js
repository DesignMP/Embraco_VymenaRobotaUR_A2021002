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
define(["require", "exports", "../../point", "./filters/butterworth", "../calculationDataNumber", "../calculationDataPoints", "../calculationDataDisplayInfo", "./calculatorBase"], function (require, exports, point_1, butterworth_1, calculationDataNumber_1, calculationDataPoints_1, calculationDataDisplayInfo_1, calculatorBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LpButterworthCalculator = /** @class */ (function (_super) {
        __extends(LpButterworthCalculator, _super);
        function LpButterworthCalculator() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.id = "lp butterworth";
            _this.displayName = "LP Butterworth";
            _this.description = "Filters a signal with a parameterizable Butterworth low-pass filter";
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
         * @memberof LpButterworthCalculator
         */
        LpButterworthCalculator.prototype.getDefaultInputData = function () {
            var inputData = new Array();
            // add input params with default displaynames
            // Numeric, 1-5
            inputData.push(new calculationDataNumber_1.CalculationDataNumber(this.orderName, 1, "The order of the filter", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(true, false, this.getFilterOrderValues())));
            inputData.push(new calculationDataNumber_1.CalculationDataNumber(this.cutoffFrequencyName, 3.2, "The cut-off frequency (frequency with an attenuation of -3dB) of the filter", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, false)));
            inputData.push(new calculationDataPoints_1.CalculationDataPoints(this.inputSignalName, "", new Array(), "The signal to be filtered", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            return inputData;
        };
        /**
         * Returns the default output data for this calculator
         *
         * @returns {Array<CalculationDataPoints>}
         * @memberof LpButterworthCalculator
         */
        LpButterworthCalculator.prototype.getDefaultOutputData = function () {
            var outputData = new Array();
            // add output params with default displaynames
            outputData.push(new calculationDataPoints_1.CalculationDataPoints("Output signal", "filtered signal", new Array()));
            return outputData;
        };
        /**
         * Calculates the butterworth filter output data for the given input data
         *
         * @param {Array<ICalculationData>} inputData
         * @returns {Array<CalculationDataPoints>}
         * @memberof LpButterworthCalculator
         */
        LpButterworthCalculator.prototype.calculate = function (inputData) {
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
            var output = this.calculateButterworth(signalData, filterOrder, inputCutOffFrequence);
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
         * @memberof LpButterworthCalculator
         */
        LpButterworthCalculator.prototype.checkForInvalidInputData = function (signalData, filterOrder, inputCutOffFrequence) {
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
            var ts = this.estimateSampleTime(signalData);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHBCdXR0ZXJ3b3J0aENhbGN1bGF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9jb21tb24vY2FsY3VsYXRvclByb3ZpZGVyL2NhbGN1bGF0b3JzL2xwQnV0dGVyd29ydGhDYWxjdWxhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFXQTtRQUE2QywyQ0FBYztRQUEzRDtZQUFBLHFFQThJQztZQTVJRyxRQUFFLEdBQVcsZ0JBQWdCLENBQUM7WUFDOUIsaUJBQVcsR0FBVyxnQkFBZ0IsQ0FBQztZQUN2QyxpQkFBVyxHQUFXLHFFQUFxRSxDQUFDO1lBRXBGLGVBQVMsR0FBVSxPQUFPLENBQUM7WUFDM0IseUJBQW1CLEdBQVUsa0JBQWtCLENBQUM7WUFDaEQscUJBQWUsR0FBVSxjQUFjLENBQUM7WUFFeEMscUJBQWUsR0FBRyxDQUFDLENBQUM7WUFDcEIscUJBQWUsR0FBRyxDQUFDLENBQUM7O1FBbUloQyxDQUFDO1FBaklHOzs7OztXQUtHO1FBQ0kscURBQW1CLEdBQTFCO1lBQ0ksSUFBSSxTQUFTLEdBQXVELElBQUksS0FBSyxFQUErQyxDQUFDO1lBQzdILDZDQUE2QztZQUU3QyxlQUFlO1lBQ2YsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLDZDQUFxQixDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLHlCQUF5QixFQUFFLElBQUksdURBQTBCLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsSyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksNkNBQXFCLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLEdBQUcsRUFBRSw2RUFBNkUsRUFBRSxJQUFJLHVEQUEwQixDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdE0sU0FB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WSxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBbUIsQ0FBQyxDQUFDO2FBQy9GO1lBQ0QsT0FBTyxpQkFBaUIsQ0FBQztRQUM3QixDQUFDO1FBQ0wsOEJBQUM7SUFBRCxDQUFDLEFBOUlELENBQTZDLCtCQUFjLEdBOEkxRDtJQTlJWSwwREFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ2FsY3VsYXRvciB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2NhbGN1bGF0b3JJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSUNhbGN1bGF0aW9uRGF0YSB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2NhbGN1bGF0aW9uRGF0YUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9wb2ludEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuLi8uLi9wb2ludFwiO1xyXG5pbXBvcnQgeyBCdXR0ZXJ3b3J0aCB9IGZyb20gXCIuL2ZpbHRlcnMvYnV0dGVyd29ydGhcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhTnVtYmVyIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YU51bWJlclwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFQb2ludHMgfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhUG9pbnRzXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvXCI7XHJcbmltcG9ydCB7IElWYWx1ZUxpc3RJdGVtIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvbW1vbi9pbnRlcmZhY2VzL3ZhbHVlTGlzdEl0ZW1JbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRvckJhc2UsIEVycm9NZXNzYWdlVHlwZSB9IGZyb20gXCIuL2NhbGN1bGF0b3JCYXNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTHBCdXR0ZXJ3b3J0aENhbGN1bGF0b3IgZXh0ZW5kcyBDYWxjdWxhdG9yQmFzZSBpbXBsZW1lbnRzIElDYWxjdWxhdG9ye1xyXG4gICAgXHJcbiAgICBpZDogc3RyaW5nID0gXCJscCBidXR0ZXJ3b3J0aFwiO1xyXG4gICAgZGlzcGxheU5hbWU6IHN0cmluZyA9IFwiTFAgQnV0dGVyd29ydGhcIjtcclxuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmcgPSBcIkZpbHRlcnMgYSBzaWduYWwgd2l0aCBhIHBhcmFtZXRlcml6YWJsZSBCdXR0ZXJ3b3J0aCBsb3ctcGFzcyBmaWx0ZXJcIjtcclxuXHJcbiAgICBwcml2YXRlIG9yZGVyTmFtZTpzdHJpbmcgPSBcIk9yZGVyXCI7XHJcbiAgICBwcml2YXRlIGN1dG9mZkZyZXF1ZW5jeU5hbWU6c3RyaW5nID0gXCJDdXRvZmYgZnJlcXVlbmN5XCI7XHJcbiAgICBwcml2YXRlIGlucHV0U2lnbmFsTmFtZTpzdHJpbmcgPSBcIklucHV0IHNpZ25hbFwiO1xyXG5cclxuICAgIHByaXZhdGUgX2ZpbHRlck9yZGVyTWluID0gMTsgXHJcbiAgICBwcml2YXRlIF9maWx0ZXJPcmRlck1heCA9IDU7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBpbnB1dCBkYXRhIGZvciB0aGlzIGNhbGN1bGF0b3JcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7KEFycmF5PENhbGN1bGF0aW9uRGF0YU51bWJlcnxDYWxjdWxhdGlvbkRhdGFQb2ludHM+KX1cclxuICAgICAqIEBtZW1iZXJvZiBMcEJ1dHRlcndvcnRoQ2FsY3VsYXRvclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0RGVmYXVsdElucHV0RGF0YSgpOiBBcnJheTxDYWxjdWxhdGlvbkRhdGFOdW1iZXJ8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPntcclxuICAgICAgICBsZXQgaW5wdXREYXRhOiBBcnJheTxDYWxjdWxhdGlvbkRhdGFOdW1iZXJ8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPiA9IG5ldyBBcnJheTxDYWxjdWxhdGlvbkRhdGFOdW1iZXJ8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPigpO1xyXG4gICAgICAgIC8vIGFkZCBpbnB1dCBwYXJhbXMgd2l0aCBkZWZhdWx0IGRpc3BsYXluYW1lc1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIE51bWVyaWMsIDEtNVxyXG4gICAgICAgIGlucHV0RGF0YS5wdXNoKG5ldyBDYWxjdWxhdGlvbkRhdGFOdW1iZXIodGhpcy5vcmRlck5hbWUsIDEsIFwiVGhlIG9yZGVyIG9mIHRoZSBmaWx0ZXJcIiwgbmV3IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvKHRydWUsIGZhbHNlLCB0aGlzLmdldEZpbHRlck9yZGVyVmFsdWVzKCkpKSk7XHJcbiAgICAgICAgaW5wdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YU51bWJlcih0aGlzLmN1dG9mZkZyZXF1ZW5jeU5hbWUsIDMuMiwgXCJUaGUgY3V0LW9mZiBmcmVxdWVuY3kgKGZyZXF1ZW5jeSB3aXRoIGFuIGF0dGVudWF0aW9uIG9mIC0zZEIpIG9mIHRoZSBmaWx0ZXJcIiwgbmV3IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvKGZhbHNlLCBmYWxzZSkpKTtcclxuICAgICAgICBpbnB1dERhdGEucHVzaChuZXcgQ2FsY3VsYXRpb25EYXRhUG9pbnRzKHRoaXMuaW5wdXRTaWduYWxOYW1lLCBcIlwiLCBuZXcgQXJyYXk8SVBvaW50PigpLCBcIlRoZSBzaWduYWwgdG8gYmUgZmlsdGVyZWRcIiwgbmV3IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvKGZhbHNlLCB0cnVlKSkpO1xyXG4gICAgICAgIHJldHVybiBpbnB1dERhdGE7XHJcbiAgICB9XHJcbiBcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBvdXRwdXQgZGF0YSBmb3IgdGhpcyBjYWxjdWxhdG9yXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0FycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz59XHJcbiAgICAgKiBAbWVtYmVyb2YgTHBCdXR0ZXJ3b3J0aENhbGN1bGF0b3JcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldERlZmF1bHRPdXRwdXREYXRhKCk6IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz57XHJcbiAgICAgICAgbGV0IG91dHB1dERhdGEgPSBuZXcgQXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPigpO1xyXG4gICAgICAgIC8vIGFkZCBvdXRwdXQgcGFyYW1zIHdpdGggZGVmYXVsdCBkaXNwbGF5bmFtZXNcclxuICAgICAgICBvdXRwdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YVBvaW50cyhcIk91dHB1dCBzaWduYWxcIiwgXCJmaWx0ZXJlZCBzaWduYWxcIiwgbmV3IEFycmF5PElQb2ludD4oKSkpOyBcclxuICAgICAgICByZXR1cm4gb3V0cHV0RGF0YTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0ZXMgdGhlIGJ1dHRlcndvcnRoIGZpbHRlciBvdXRwdXQgZGF0YSBmb3IgdGhlIGdpdmVuIGlucHV0IGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElDYWxjdWxhdGlvbkRhdGE+fSBpbnB1dERhdGFcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+fVxyXG4gICAgICogQG1lbWJlcm9mIExwQnV0dGVyd29ydGhDYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIGNhbGN1bGF0ZShpbnB1dERhdGE6IEFycmF5PElDYWxjdWxhdGlvbkRhdGE+KTogQXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPiB7XHJcbiAgICAgICAgdGhpcy5jbGVhckVycm9ycygpO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgZW1wdHkgZGVmYXVsdCBvdXRwdXQgXHJcbiAgICAgICAgbGV0IG91dHB1dERhdGEgPSBuZXcgQXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPigpO1xyXG4gICAgICAgIG91dHB1dERhdGEucHVzaChuZXcgQ2FsY3VsYXRpb25EYXRhUG9pbnRzKFwiT3V0cHV0IHNpZ25hbFwiLCBcImZpbHRlcmVkIHNpZ25hbFwiLCBuZXcgQXJyYXk8SVBvaW50PigpKSk7IFxyXG5cclxuICAgICAgICAvLyBHZXQgaW5wdXQgZGF0YVxyXG4gICAgICAgIGxldCBmaWx0ZXJPcmRlciA9IChpbnB1dERhdGFbMF0gYXMgQ2FsY3VsYXRpb25EYXRhTnVtYmVyKS5nZXREYXRhKCk7XHJcbiAgICAgICAgbGV0IGlucHV0Q3V0T2ZmRnJlcXVlbmNlID0gKGlucHV0RGF0YVsxXSBhcyBDYWxjdWxhdGlvbkRhdGFOdW1iZXIpLmdldERhdGEoKTtcclxuICAgICAgICBsZXQgc2lnbmFsRGF0YSA9IChpbnB1dERhdGFbMl0gYXMgQ2FsY3VsYXRpb25EYXRhUG9pbnRzKS5nZXREYXRhKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gQ2hlY2sgZm9yIHZhbGlkIGlucHV0IGRhdGFcclxuICAgICAgICB0aGlzLmNoZWNrRm9ySW52YWxpZElucHV0RGF0YShzaWduYWxEYXRhLCBmaWx0ZXJPcmRlciwgaW5wdXRDdXRPZmZGcmVxdWVuY2UpO1xyXG5cclxuICAgICAgICAvLyBSZXR1cm4gaWYgZXJyb3JzIG9jY3VycmVkXHJcbiAgICAgICAgaWYodGhpcy5nZXRFcnJvcnMoKS5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgcmV0dXJuIG91dHB1dERhdGE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDYWxjdWxhdGUgbmV3IGRhdGFcclxuICAgICAgICBsZXQgb3V0cHV0ID0gdGhpcy5jYWxjdWxhdGVCdXR0ZXJ3b3J0aChzaWduYWxEYXRhLCBmaWx0ZXJPcmRlciwgaW5wdXRDdXRPZmZGcmVxdWVuY2UpO1xyXG5cclxuICAgICAgICAvLyBTZXQgbmV3IG91dHB1dGRhdGFcclxuICAgICAgICBvdXRwdXREYXRhWzBdLnNldERhdGEob3V0cHV0KTtcclxuICAgICAgICByZXR1cm4gb3V0cHV0RGF0YTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBmb3IgaW52YWxpZCBpbnB1dCBkYXRhLCBhbmQgYWRkcyB0aGUgZXJyb3IgaW5mb3JtYXRpb24gdG8gdGhlIGVycm9ycyBvZiB0aGlzIGNhbGN1bGF0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SVBvaW50Pn0gc2lnbmFsRGF0YVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGZpbHRlck9yZGVyXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5wdXRDdXRPZmZGcmVxdWVuY2VcclxuICAgICAqIEBtZW1iZXJvZiBMcEJ1dHRlcndvcnRoQ2FsY3VsYXRvclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNoZWNrRm9ySW52YWxpZElucHV0RGF0YShzaWduYWxEYXRhOiBBcnJheTxJUG9pbnQ+LCBmaWx0ZXJPcmRlcjogbnVtYmVyLCBpbnB1dEN1dE9mZkZyZXF1ZW5jZTogbnVtYmVyKXtcclxuICAgICAgICBpZihpc05hTihpbnB1dEN1dE9mZkZyZXF1ZW5jZSkpe1xyXG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yQnlUeXBlKEVycm9NZXNzYWdlVHlwZS5NaXNzaW5nT3JJbnZhbGlkSW5wdXQsIFt0aGlzLmN1dG9mZkZyZXF1ZW5jeU5hbWVdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoc2lnbmFsRGF0YSA9PSB1bmRlZmluZWQgfHwgc2lnbmFsRGF0YS5sZW5ndGggPCAyKXsgLy8gQSBtaW5pbXVtIG9mIHR3byBwb2ludHMgaXMgbmVlZGVkXHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JCeVR5cGUoRXJyb01lc3NhZ2VUeXBlLk1pc3NpbmdPckludmFsaWRJbnB1dCwgW3RoaXMuaW5wdXRTaWduYWxOYW1lXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihpc05hTihmaWx0ZXJPcmRlcikgfHwgZmlsdGVyT3JkZXIgPiB0aGlzLl9maWx0ZXJPcmRlck1heCB8fCBmaWx0ZXJPcmRlciA8IHRoaXMuX2ZpbHRlck9yZGVyTWluICl7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3IoXCJDYWxjdWxhdGlvbiBFcnJvcjogJ1wiICsgdGhpcy5vcmRlck5hbWUgKyBcIicgaXMgbm90IGRlZmluZWQgb3Igb3V0IG9mIHJhbmdlICh2YWxpZCByYW5nZSAxLTUpIVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxjdWxhdGUgYnV0dGVyd29ydGggd2l0aCB0aGUgZ2l2ZW4gZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElQb2ludD59IHNpZ25hbERhdGFcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBmaWx0ZXJPcmRlclxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGlucHV0Q3V0T2ZmRnJlcXVlbmNlXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8SVBvaW50Pn1cclxuICAgICAqIEBtZW1iZXJvZiBMcEJ1dHRlcndvcnRoQ2FsY3VsYXRvclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNhbGN1bGF0ZUJ1dHRlcndvcnRoKHNpZ25hbERhdGE6IEFycmF5PElQb2ludD4sIGZpbHRlck9yZGVyOiBudW1iZXIsIGlucHV0Q3V0T2ZmRnJlcXVlbmNlOiBudW1iZXIpOiBBcnJheTxJUG9pbnQ+e1xyXG4gICAgICAgIGxldCB0cyA9IHRoaXMuZXN0aW1hdGVTYW1wbGVUaW1lKHNpZ25hbERhdGEpO1xyXG4gICAgICAgIGxldCBpbnB1dFNpZ25hbDogbnVtYmVyW10gPSBuZXcgQXJyYXk8bnVtYmVyPigpO1xyXG5cclxuICAgICAgICBmb3IobGV0IGk9MDsgaSA8IHNpZ25hbERhdGEubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpbnB1dFNpZ25hbC5wdXNoKHNpZ25hbERhdGFbaV0ueSk7XHJcbiAgICAgICAgfSBcclxuICAgICAgICBcclxuICAgICAgICBsZXQgZmlsdGVyOiBCdXR0ZXJ3b3J0aCA9IG5ldyBCdXR0ZXJ3b3J0aChmaWx0ZXJPcmRlciwgaW5wdXRDdXRPZmZGcmVxdWVuY2UsIHRzKTsgXHJcbiAgICAgICAgbGV0IG91dHB1dFNpZ25hbDogbnVtYmVyW10gPSBmaWx0ZXIuZmlsdGVyKGlucHV0U2lnbmFsKTtcclxuXHJcbiAgICAgICAgbGV0IG91dHB1dCA9IG5ldyBBcnJheTxJUG9pbnQ+KCk7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGkgPCBvdXRwdXRTaWduYWwubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBvdXRwdXQucHVzaChuZXcgUG9pbnQoc2lnbmFsRGF0YVtpXS54LCBvdXRwdXRTaWduYWxbaV0pKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb3V0cHV0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgc3VwcG9ydGVkIGZpbHRlciBvcmRlcnMgZm9yIHRoZSBidXR0ZXJ3b3J0aCBmaWx0ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge0FycmF5PElWYWx1ZUxpc3RJdGVtPn1cclxuICAgICAqIEBtZW1iZXJvZiBMcEJ1dHRlcndvcnRoQ2FsY3VsYXRvclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldEZpbHRlck9yZGVyVmFsdWVzKCk6IEFycmF5PElWYWx1ZUxpc3RJdGVtPntcclxuICAgICAgICBsZXQgZmlsdGVyT3JkZXJWYWx1ZXMgPSBuZXcgQXJyYXk8SVZhbHVlTGlzdEl0ZW0+KCk7XHJcbiAgICAgICAgZm9yKGxldCBpID0gdGhpcy5fZmlsdGVyT3JkZXJNaW47ICBpIDw9IHRoaXMuX2ZpbHRlck9yZGVyTWF4OyBpKyspe1xyXG4gICAgICAgICAgICBmaWx0ZXJPcmRlclZhbHVlcy5wdXNoKHt2YWx1ZTogaS50b1N0cmluZygpLCBkaXNwbGF5VmFsdWU6IGkudG9TdHJpbmcoKX0gYXMgSVZhbHVlTGlzdEl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmlsdGVyT3JkZXJWYWx1ZXM7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuIl19