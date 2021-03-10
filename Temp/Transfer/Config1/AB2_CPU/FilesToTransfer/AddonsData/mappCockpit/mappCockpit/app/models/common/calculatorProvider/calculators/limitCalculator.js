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
define(["require", "exports", "../../point", "../calculationDataNumber", "../calculationDataPoints", "../calculationDataDisplayInfo", "./calculatorBase"], function (require, exports, point_1, calculationDataNumber_1, calculationDataPoints_1, calculationDataDisplayInfo_1, calculatorBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LimitCalculator = /** @class */ (function (_super) {
        __extends(LimitCalculator, _super);
        function LimitCalculator() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.id = "max min";
            _this.displayName = "Limit";
            _this.description = "Limits the signal to maximum and minimum constant values";
            _this.minimumName = "Lower limit";
            _this.maximumName = "Upper limit";
            _this.inputSignalName = "Input signal";
            return _this;
        }
        /**
         * Returns the default input data for this calculator
         *
         * @returns {(Array<CalculationDataNumber|CalculationDataPoints>)}
         * @memberof LimitCalculator
         */
        LimitCalculator.prototype.getDefaultInputData = function () {
            var inputData = new Array();
            // add input params with default displaynames
            var minValueInfo = new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, false);
            var maxValueInfo = new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, false);
            inputData.push(new calculationDataNumber_1.CalculationDataNumber(this.maximumName, 1, "The upper limit value", maxValueInfo));
            inputData.push(new calculationDataNumber_1.CalculationDataNumber(this.minimumName, 0, "The lower limit value", minValueInfo));
            inputData.push(new calculationDataPoints_1.CalculationDataPoints(this.inputSignalName, "", new Array(), "The signal to be limited", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            return inputData;
        };
        /**
         * Returns the default output data for this calculator
         *
         * @returns {Array<CalculationDataPoints>}
         * @memberof LimitCalculator
         */
        LimitCalculator.prototype.getDefaultOutputData = function () {
            var outputData = new Array();
            // add output params with default displaynames
            outputData.push(new calculationDataPoints_1.CalculationDataPoints("Output signal", "limit", new Array()));
            return outputData;
        };
        /**
         * Calculates output data for the given max and min values
         *
         * @param {Array<ICalculationData>} inputData
         * @returns {Array<CalculationDataPoints>}
         * @memberof LimitCalculator
         */
        LimitCalculator.prototype.calculate = function (inputData) {
            this.clearErrors();
            var rawPoints = new Array();
            // Create empty default output 
            var outputData = new Array();
            outputData.push(new calculationDataPoints_1.CalculationDataPoints("Output signal", "limit", new Array()));
            // Get input data
            var maxValue = inputData[0].getData();
            var minValue = inputData[1].getData();
            var signalData = inputData[2].getData();
            // Check for valid input data
            this.checkForInvalidInputData(signalData, minValue, maxValue);
            // Return if errors occurred
            if (this.getErrors().length > 0) {
                return outputData;
            }
            // calculate new data
            rawPoints = this.maxMinSignal(minValue, maxValue, signalData);
            // Set new outputdata
            outputData[0].setData(rawPoints);
            return outputData;
        };
        /**
         * Checks for invalid input data, and adds the error information to the errors of this calculation
         *
         * @private
         * @param {Array<IPoint>} signalData
         * @param {number} minValue
         * @param {number} maxValue
         * @memberof LimitCalculator
         */
        LimitCalculator.prototype.checkForInvalidInputData = function (signalData, minValue, maxValue) {
            if (isNaN(minValue)) {
                this.addErrorByType(calculatorBase_1.ErroMessageType.MissingOrInvalidInput, [this.minimumName]);
            }
            if (isNaN(maxValue)) {
                this.addErrorByType(calculatorBase_1.ErroMessageType.MissingOrInvalidInput, [this.maximumName]);
            }
            if (minValue > maxValue) {
                this.addError('Calculation Error: Lower limit must not be bigger than upper limit.');
            }
            if (signalData == undefined || signalData.length < 2) { // A minimum of two points is needed
                this.addErrorByType(calculatorBase_1.ErroMessageType.MissingOrInvalidInput, [this.inputSignalName]);
            }
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
        LimitCalculator.prototype.maxMinSignal = function (minValue, maxValue, inputSignal) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGltaXRDYWxjdWxhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdG9ycy9saW1pdENhbGN1bGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVNBO1FBQXFDLG1DQUFjO1FBQW5EO1lBQUEscUVBaUlDO1lBL0hHLFFBQUUsR0FBVyxTQUFTLENBQUM7WUFDdkIsaUJBQVcsR0FBVyxPQUFPLENBQUM7WUFDOUIsaUJBQVcsR0FBVywwREFBMEQsQ0FBQztZQUV6RSxpQkFBVyxHQUFVLGFBQWEsQ0FBQztZQUNuQyxpQkFBVyxHQUFVLGFBQWEsQ0FBQztZQUNuQyxxQkFBZSxHQUFVLGNBQWMsQ0FBQzs7UUF5SHBELENBQUM7UUF0SEc7Ozs7O1dBS0c7UUFDSSw2Q0FBbUIsR0FBMUI7WUFDSSxJQUFJLFNBQVMsR0FBdUQsSUFBSSxLQUFLLEVBQStDLENBQUM7WUFDN0gsNkNBQTZDO1lBRTdDLElBQUksWUFBWSxHQUFHLElBQUksdURBQTBCLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2hFLElBQUksWUFBWSxHQUFHLElBQUksdURBQTBCLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2hFLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSw2Q0FBcUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSx1QkFBdUIsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ3RHLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSw2Q0FBcUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSx1QkFBdUIsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ3RHLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSw2Q0FBcUIsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFF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Qy9FLElBQUksTUFBTSxHQUFHLElBQUksS0FBSyxFQUFVLENBQUM7WUFDakMsS0FBSSxJQUFJLENBQUMsR0FBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQ3RDLElBQUksQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLEVBQUM7b0JBQzVCLENBQUMsR0FBRyxRQUFRLENBQUM7aUJBQ2hCO3FCQUNJLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLEVBQUM7b0JBQ2pDLENBQUMsR0FBRyxRQUFRLENBQUM7aUJBQ2hCO2dCQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxhQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDaEM7WUFDRCxPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDO1FBRUwsc0JBQUM7SUFBRCxDQUFDLEFBaklELENBQXFDLCtCQUFjLEdBaUlsRDtJQWpJWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDYWxjdWxhdG9yIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvY2FsY3VsYXRvckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJQ2FsY3VsYXRpb25EYXRhIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvY2FsY3VsYXRpb25EYXRhSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElQb2ludCB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL3BvaW50SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4uLy4uL3BvaW50XCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YU51bWJlciB9IGZyb20gXCIuLi9jYWxjdWxhdGlvbkRhdGFOdW1iZXJcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhUG9pbnRzIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YVBvaW50c1wiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mbyB9IGZyb20gXCIuLi9jYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mb1wiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdG9yQmFzZSwgRXJyb01lc3NhZ2VUeXBlIH0gZnJvbSBcIi4vY2FsY3VsYXRvckJhc2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBMaW1pdENhbGN1bGF0b3IgZXh0ZW5kcyBDYWxjdWxhdG9yQmFzZSBpbXBsZW1lbnRzIElDYWxjdWxhdG9ye1xyXG4gICAgXHJcbiAgICBpZDogc3RyaW5nID0gXCJtYXggbWluXCI7XHJcbiAgICBkaXNwbGF5TmFtZTogc3RyaW5nID0gXCJMaW1pdFwiO1xyXG4gICAgZGVzY3JpcHRpb246IHN0cmluZyA9IFwiTGltaXRzIHRoZSBzaWduYWwgdG8gbWF4aW11bSBhbmQgbWluaW11bSBjb25zdGFudCB2YWx1ZXNcIjtcclxuXHJcbiAgICBwcml2YXRlIG1pbmltdW1OYW1lOnN0cmluZyA9IFwiTG93ZXIgbGltaXRcIjtcclxuICAgIHByaXZhdGUgbWF4aW11bU5hbWU6c3RyaW5nID0gXCJVcHBlciBsaW1pdFwiO1xyXG4gICAgcHJpdmF0ZSBpbnB1dFNpZ25hbE5hbWU6c3RyaW5nID0gXCJJbnB1dCBzaWduYWxcIjtcclxuXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBpbnB1dCBkYXRhIGZvciB0aGlzIGNhbGN1bGF0b3JcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7KEFycmF5PENhbGN1bGF0aW9uRGF0YU51bWJlcnxDYWxjdWxhdGlvbkRhdGFQb2ludHM+KX1cclxuICAgICAqIEBtZW1iZXJvZiBMaW1pdENhbGN1bGF0b3JcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldERlZmF1bHRJbnB1dERhdGEoKTogQXJyYXk8Q2FsY3VsYXRpb25EYXRhTnVtYmVyfENhbGN1bGF0aW9uRGF0YVBvaW50cz57XHJcbiAgICAgICAgbGV0IGlucHV0RGF0YTogQXJyYXk8Q2FsY3VsYXRpb25EYXRhTnVtYmVyfENhbGN1bGF0aW9uRGF0YVBvaW50cz4gPSBuZXcgQXJyYXk8Q2FsY3VsYXRpb25EYXRhTnVtYmVyfENhbGN1bGF0aW9uRGF0YVBvaW50cz4oKTtcclxuICAgICAgICAvLyBhZGQgaW5wdXQgcGFyYW1zIHdpdGggZGVmYXVsdCBkaXNwbGF5bmFtZXNcclxuICAgICAgICBcclxuICAgICAgICBsZXQgbWluVmFsdWVJbmZvID0gbmV3IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvKGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgbGV0IG1heFZhbHVlSW5mbyA9IG5ldyBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mbyhmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgIGlucHV0RGF0YS5wdXNoKG5ldyBDYWxjdWxhdGlvbkRhdGFOdW1iZXIodGhpcy5tYXhpbXVtTmFtZSwgMSwgXCJUaGUgdXBwZXIgbGltaXQgdmFsdWVcIiwgbWF4VmFsdWVJbmZvKSk7XHJcbiAgICAgICAgaW5wdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YU51bWJlcih0aGlzLm1pbmltdW1OYW1lLCAwLCBcIlRoZSBsb3dlciBsaW1pdCB2YWx1ZVwiLCBtaW5WYWx1ZUluZm8pKTtcclxuICAgICAgICBpbnB1dERhdGEucHVzaChuZXcgQ2FsY3VsYXRpb25EYXRhUG9pbnRzKHRoaXMuaW5wdXRTaWduYWxOYW1lLCBcIlwiLCBuZXcgQXJyYXk8SVBvaW50PigpLCBcIlRoZSBzaWduYWwgdG8gYmUgbGltaXRlZFwiLCBuZXcgQ2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm8oZmFsc2UsIHRydWUpKSk7XHJcbiAgICAgICAgcmV0dXJuIGlucHV0RGF0YTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IG91dHB1dCBkYXRhIGZvciB0aGlzIGNhbGN1bGF0b3JcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPn1cclxuICAgICAqIEBtZW1iZXJvZiBMaW1pdENhbGN1bGF0b3JcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldERlZmF1bHRPdXRwdXREYXRhKCk6IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz57XHJcbiAgICAgICAgbGV0IG91dHB1dERhdGEgPSBuZXcgQXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPigpO1xyXG4gICAgICAgIC8vIGFkZCBvdXRwdXQgcGFyYW1zIHdpdGggZGVmYXVsdCBkaXNwbGF5bmFtZXNcclxuICAgICAgICBvdXRwdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YVBvaW50cyhcIk91dHB1dCBzaWduYWxcIiwgXCJsaW1pdFwiLCBuZXcgQXJyYXk8SVBvaW50PigpKSk7IFxyXG4gICAgICAgIHJldHVybiBvdXRwdXREYXRhO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0ZXMgb3V0cHV0IGRhdGEgZm9yIHRoZSBnaXZlbiBtYXggYW5kIG1pbiB2YWx1ZXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElDYWxjdWxhdGlvbkRhdGE+fSBpbnB1dERhdGFcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+fVxyXG4gICAgICogQG1lbWJlcm9mIExpbWl0Q2FsY3VsYXRvclxyXG4gICAgICovXHJcbiAgICBjYWxjdWxhdGUoaW5wdXREYXRhOiBBcnJheTxJQ2FsY3VsYXRpb25EYXRhPik6IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz4ge1xyXG4gICAgICAgIHRoaXMuY2xlYXJFcnJvcnMoKTtcclxuXHJcbiAgICAgICAgbGV0IHJhd1BvaW50cyA9IG5ldyBBcnJheTxJUG9pbnQ+KCk7XHJcbiAgICAgICAgLy8gQ3JlYXRlIGVtcHR5IGRlZmF1bHQgb3V0cHV0IFxyXG4gICAgICAgIGxldCBvdXRwdXREYXRhID0gbmV3IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz4oKTtcclxuICAgICAgICBvdXRwdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YVBvaW50cyhcIk91dHB1dCBzaWduYWxcIiwgXCJsaW1pdFwiLCBuZXcgQXJyYXk8SVBvaW50PigpKSk7IFxyXG5cclxuICAgICAgICAvLyBHZXQgaW5wdXQgZGF0YVxyXG4gICAgICAgIGxldCBtYXhWYWx1ZSA9IChpbnB1dERhdGFbMF0gYXMgQ2FsY3VsYXRpb25EYXRhTnVtYmVyKS5nZXREYXRhKCk7XHJcbiAgICAgICAgbGV0IG1pblZhbHVlID0gKGlucHV0RGF0YVsxXSBhcyBDYWxjdWxhdGlvbkRhdGFOdW1iZXIpLmdldERhdGEoKTtcclxuICAgICAgICBsZXQgc2lnbmFsRGF0YSA9IChpbnB1dERhdGFbMl0gYXMgQ2FsY3VsYXRpb25EYXRhUG9pbnRzKS5nZXREYXRhKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gQ2hlY2sgZm9yIHZhbGlkIGlucHV0IGRhdGFcclxuICAgICAgICB0aGlzLmNoZWNrRm9ySW52YWxpZElucHV0RGF0YShzaWduYWxEYXRhLCBtaW5WYWx1ZSwgbWF4VmFsdWUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFJldHVybiBpZiBlcnJvcnMgb2NjdXJyZWRcclxuICAgICAgICBpZih0aGlzLmdldEVycm9ycygpLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICByZXR1cm4gb3V0cHV0RGF0YTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gY2FsY3VsYXRlIG5ldyBkYXRhXHJcbiAgICAgICAgcmF3UG9pbnRzID0gdGhpcy5tYXhNaW5TaWduYWwobWluVmFsdWUsIG1heFZhbHVlLCBzaWduYWxEYXRhKTtcclxuXHJcbiAgICAgICAgLy8gU2V0IG5ldyBvdXRwdXRkYXRhXHJcbiAgICAgICAgb3V0cHV0RGF0YVswXS5zZXREYXRhKHJhd1BvaW50cyk7XHJcbiAgICAgICAgcmV0dXJuIG91dHB1dERhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgZm9yIGludmFsaWQgaW5wdXQgZGF0YSwgYW5kIGFkZHMgdGhlIGVycm9yIGluZm9ybWF0aW9uIHRvIHRoZSBlcnJvcnMgb2YgdGhpcyBjYWxjdWxhdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElQb2ludD59IHNpZ25hbERhdGFcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtaW5WYWx1ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1heFZhbHVlXHJcbiAgICAgKiBAbWVtYmVyb2YgTGltaXRDYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2hlY2tGb3JJbnZhbGlkSW5wdXREYXRhKHNpZ25hbERhdGE6IEFycmF5PElQb2ludD4sIG1pblZhbHVlOiBudW1iZXIsIG1heFZhbHVlOiBudW1iZXIpe1xyXG4gICAgICAgIGlmKGlzTmFOKG1pblZhbHVlKSl7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JCeVR5cGUoRXJyb01lc3NhZ2VUeXBlLk1pc3NpbmdPckludmFsaWRJbnB1dCwgW3RoaXMubWluaW11bU5hbWVdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaXNOYU4obWF4VmFsdWUpKXtcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvckJ5VHlwZShFcnJvTWVzc2FnZVR5cGUuTWlzc2luZ09ySW52YWxpZElucHV0LCBbdGhpcy5tYXhpbXVtTmFtZV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihtaW5WYWx1ZSA+IG1heFZhbHVlKXtcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvcignQ2FsY3VsYXRpb24gRXJyb3I6IExvd2VyIGxpbWl0IG11c3Qgbm90IGJlIGJpZ2dlciB0aGFuIHVwcGVyIGxpbWl0LicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzaWduYWxEYXRhID09IHVuZGVmaW5lZCB8fCBzaWduYWxEYXRhLmxlbmd0aCA8IDIpeyAvLyBBIG1pbmltdW0gb2YgdHdvIHBvaW50cyBpcyBuZWVkZWRcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvckJ5VHlwZShFcnJvTWVzc2FnZVR5cGUuTWlzc2luZ09ySW52YWxpZElucHV0LCBbdGhpcy5pbnB1dFNpZ25hbE5hbWVdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxjdWxhdGVzIG91dHB1dCBkYXRhXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtaW5WYWx1ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1heFZhbHVlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElQb2ludD59IGlucHV0U2lnbmFsXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8SVBvaW50Pn1cclxuICAgICAqIEBtZW1iZXJvZiBMaW1pdENhbGN1bGF0b3JcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBtYXhNaW5TaWduYWwobWluVmFsdWU6IG51bWJlciwgbWF4VmFsdWU6IG51bWJlciwgaW5wdXRTaWduYWw6IEFycmF5PElQb2ludD4pOiBBcnJheTxJUG9pbnQ+e1xyXG4gICAgICAgIGxldCBwb2ludHMgPSBuZXcgQXJyYXk8SVBvaW50PigpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9MDsgaSA8IGlucHV0U2lnbmFsLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IHggPSBpbnB1dFNpZ25hbFtpXS54O1xyXG4gICAgICAgICAgICBsZXQgeSA9IGlucHV0U2lnbmFsW2ldLnk7XHJcbiAgICAgICAgICAgIGlmIChpbnB1dFNpZ25hbFtpXS55ID4gbWF4VmFsdWUpe1xyXG4gICAgICAgICAgICAgICAgeSA9IG1heFZhbHVlO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICBlbHNlIGlmIChpbnB1dFNpZ25hbFtpXS55IDwgbWluVmFsdWUpe1xyXG4gICAgICAgICAgICAgICAgeSA9IG1pblZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHBvaW50cy5wdXNoKG5ldyBQb2ludCh4LCB5KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwb2ludHM7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cclxuXHJcbiJdfQ==