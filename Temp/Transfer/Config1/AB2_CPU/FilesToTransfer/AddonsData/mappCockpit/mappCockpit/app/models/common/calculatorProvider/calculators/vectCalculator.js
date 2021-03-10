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
define(["require", "exports", "../../point", "../calculationDataPoints", "../calculationDataDisplayInfo", "./calculatorBase", "./calculatorHelper"], function (require, exports, point_1, calculationDataPoints_1, calculationDataDisplayInfo_1, calculatorBase_1, calculatorHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var VectCalculator = /** @class */ (function (_super) {
        __extends(VectCalculator, _super);
        function VectCalculator() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.id = "vector ";
            _this.displayName = "Vector length √(a\u00B2 + b\u00B2)";
            _this.description = "2D vector length";
            _this.input1Name = "Input signal a";
            _this.input2Name = "Input signal b";
            return _this;
        }
        /**
         * Returns the default input data for this calculator
         *
         * @returns {(Array<CalculationDataNumber|CalculationDataPoints>)}
         * @memberof VectCalculator
         */
        VectCalculator.prototype.getDefaultInputData = function () {
            var inputData = new Array();
            // add input params with default displaynames
            inputData.push(new calculationDataPoints_1.CalculationDataPoints(this.input1Name, "", new Array(), "Signal a", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            inputData.push(new calculationDataPoints_1.CalculationDataPoints(this.input2Name, "", new Array(), "Signal b", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            return inputData;
        };
        /**
         * Returns the default output data for this calculator
         *
         * @returns {Array<CalculationDataPoints>}
         * @memberof VectCalculator
         */
        VectCalculator.prototype.getDefaultOutputData = function () {
            var outputData = new Array();
            // add output params with default displaynames
            outputData.push(new calculationDataPoints_1.CalculationDataPoints("Output signal", "vector", new Array()));
            return outputData;
        };
        /**
         * Calculates output value for the given input data
         *
         * @param {Array<ICalculationData>} inputData
         * @returns {Array<CalculationDataPoints>}
         * @memberof VectCalculator
         */
        VectCalculator.prototype.calculate = function (inputData) {
            this.clearErrors();
            var rawPoints = new Array();
            var outputData = new Array();
            outputData.push(new calculationDataPoints_1.CalculationDataPoints("Output signal", "vector", new Array()));
            outputData[0].setData(rawPoints); // Set empty raw points list by default
            var inputSignalData1 = inputData[0].getData();
            var inputSignalData2 = inputData[1].getData();
            // Checks for valid input params
            if (inputSignalData1 == undefined || inputSignalData1.length < 2) { // A minimum of two points is needed
                this.addErrorByType(calculatorBase_1.ErroMessageType.MissingOrInvalidInput, [this.input1Name]);
            }
            if (inputSignalData2 == undefined || inputSignalData2.length < 2) { // A minimum of two points is needed
                this.addErrorByType(calculatorBase_1.ErroMessageType.MissingOrInvalidInput, [this.input2Name]);
            }
            // Return if errors occurred
            if (this.getErrors().length > 0) {
                return outputData;
            }
            rawPoints = this.vectorSignal(inputSignalData1, inputSignalData2);
            outputData[0].setData(rawPoints);
            return outputData;
        };
        /**
         * Calculates output signal
         *
         * @private
         * @param {Array<IPoint>} inputSignal1
         * @param {Array<IPoint>} inputSignal2
         * @returns {Array<IPoint>}
         * @memberof VectCalculator
         */
        VectCalculator.prototype.vectorSignal = function (inputSignal1, inputSignal2) {
            var points = new Array();
            if (inputSignal1.length == inputSignal2.length) { // Add only signals with same sample count
                for (var i = 0; i < inputSignal1.length; i++) {
                    var newX = inputSignal1[i].x;
                    var newY = Math.sqrt(Math.pow(inputSignal1[i].y, 2) + Math.pow(inputSignal2[i].y, 2));
                    if (inputSignal2[i].x == newX) {
                        points.push(new point_1.Point(newX, newY));
                    }
                    else {
                        // Vector calculation of two different signals(different x values) currently not possible
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
         * Performs optional preperation of input data.
         * Filters input signals for matching signal parts (samples with matching timestamps).
         *
         * @param {(Array<CalculationDataNumber|CalculationDataPoints|CalculationDataNumberOrPoints>)} inputData
         * @returns {(Array<CalculationDataNumber|CalculationDataPoints|CalculationDataNumberOrPoints>)}
         * @memberof VectCalculator
         */
        VectCalculator.prototype.prepareInputData = function (inputData) {
            inputData = _super.prototype.prepareInputData.call(this, inputData);
            inputData = calculatorHelper_1.CalculatorHelper.tryFilterMatchingSignalParts(inputData);
            return inputData;
        };
        return VectCalculator;
    }(calculatorBase_1.CalculatorBase));
    exports.VectCalculator = VectCalculator;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVjdENhbGN1bGF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9jb21tb24vY2FsY3VsYXRvclByb3ZpZGVyL2NhbGN1bGF0b3JzL3ZlY3RDYWxjdWxhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFXQTtRQUFvQyxrQ0FBYztRQUFsRDtZQUFBLHFFQXdIQztZQXRIRyxRQUFFLEdBQVcsU0FBUyxDQUFDO1lBQ3ZCLGlCQUFXLEdBQVcsb0NBQW9DLENBQUM7WUFDM0QsaUJBQVcsR0FBVyxrQkFBa0IsQ0FBQztZQUVqQyxnQkFBVSxHQUFHLGdCQUFnQixDQUFDO1lBQzlCLGdCQUFVLEdBQUcsZ0JBQWdCLENBQUM7O1FBaUgxQyxDQUFDO1FBL0dHOzs7OztXQUtHO1FBQ0ksNENBQW1CLEdBQTFCO1lBQ0ksSUFBSSxTQUFTLEdBQUcsSUFBSSxLQUFLLEVBQStDLENBQUM7WUFDekUsNkNBQTZDO1lBQzdDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSw2Q0FBcUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUUsRUFBRSxJQUFJLEtBQUssRUFBVSxFQUFFLFVBQVUsRUFBRSxJQUFJLHVEQUEwQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0ksU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLDZDQUFxQixDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRSxFQUFFLElBQUksS0FBSyxFQUFVLEVBQUUsVUFBVSxFQUFFLElBQUksdURBQTBCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3SSxPQUFPLFNBQVMsQ0FBQztRQUNyQixDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSSw2Q0FBb0IsR0FBM0I7WUFDSSxJQUFJLFVBQVUsR0FBRyxJQUFJLEtBQUssRUFBeUIsQ0FBQztZQUNwRCw4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O3dCQUNBLHlGQUF5Rjt3QkFDekYsSUFBSSxDQUFDLFFBQVEsQ0FBQyx3RUFBd0UsQ0FBQyxDQUFDO3dCQUN4RixPQUFPLElBQUksS0FBSyxFQUFVLENBQUM7cUJBQzlCO2lCQUNKO2FBQ0o7aUJBQ0c7Z0JBQ0EsSUFBSSxDQUFDLFFBQVEsQ0FBQyw0RUFBNEUsQ0FBQyxDQUFDO2FBQy9GO1lBQ0QsT0FBTyxNQUFNLENBQUM7UUFDbEIsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSSx5Q0FBZ0IsR0FBdkIsVUFBd0IsU0FBMkY7WUFFL0csU0FBUyxHQUFHLGlCQUFNLGdCQUFnQixZQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzlDLFNBQVMsR0FBRyxtQ0FBZ0IsQ0FBQyw0QkFBNEIsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUVyRSxPQUFPLFNBQVMsQ0FBQztRQUNyQixDQUFDO1FBQ0wscUJBQUM7SUFBRCxDQUFDLEFBeEhELENBQW9DLCtCQUFjLEdBd0hqRDtJQXhIWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDYWxjdWxhdG9yIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvY2FsY3VsYXRvckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJQ2FsY3VsYXRpb25EYXRhIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvY2FsY3VsYXRpb25EYXRhSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElQb2ludCB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL3BvaW50SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4uLy4uL3BvaW50XCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YU51bWJlciB9IGZyb20gXCIuLi9jYWxjdWxhdGlvbkRhdGFOdW1iZXJcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhUG9pbnRzIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YVBvaW50c1wiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mbyB9IGZyb20gXCIuLi9jYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mb1wiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdG9yQmFzZSwgRXJyb01lc3NhZ2VUeXBlIH0gZnJvbSBcIi4vY2FsY3VsYXRvckJhc2VcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHMgfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHNcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRvckhlbHBlciB9IGZyb20gXCIuL2NhbGN1bGF0b3JIZWxwZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBWZWN0Q2FsY3VsYXRvciBleHRlbmRzIENhbGN1bGF0b3JCYXNlIGltcGxlbWVudHMgSUNhbGN1bGF0b3J7XHJcbiAgICBcclxuICAgIGlkOiBzdHJpbmcgPSBcInZlY3RvciBcIjtcclxuICAgIGRpc3BsYXlOYW1lOiBzdHJpbmcgPSBcIlZlY3RvciBsZW5ndGgg4oiaKGFcXHUwMEIyICsgYlxcdTAwQjIpXCI7XHJcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nID0gXCIyRCB2ZWN0b3IgbGVuZ3RoXCI7XHJcblxyXG4gICAgcHJpdmF0ZSBpbnB1dDFOYW1lID0gXCJJbnB1dCBzaWduYWwgYVwiO1xyXG4gICAgcHJpdmF0ZSBpbnB1dDJOYW1lID0gXCJJbnB1dCBzaWduYWwgYlwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBpbnB1dCBkYXRhIGZvciB0aGlzIGNhbGN1bGF0b3JcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7KEFycmF5PENhbGN1bGF0aW9uRGF0YU51bWJlcnxDYWxjdWxhdGlvbkRhdGFQb2ludHM+KX1cclxuICAgICAqIEBtZW1iZXJvZiBWZWN0Q2FsY3VsYXRvclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0RGVmYXVsdElucHV0RGF0YSgpOiBBcnJheTxDYWxjdWxhdGlvbkRhdGFOdW1iZXJ8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPntcclxuICAgICAgICBsZXQgaW5wdXREYXRhID0gbmV3IEFycmF5PENhbGN1bGF0aW9uRGF0YU51bWJlcnxDYWxjdWxhdGlvbkRhdGFQb2ludHM+KCk7XHJcbiAgICAgICAgLy8gYWRkIGlucHV0IHBhcmFtcyB3aXRoIGRlZmF1bHQgZGlzcGxheW5hbWVzXHJcbiAgICAgICAgaW5wdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YVBvaW50cyh0aGlzLmlucHV0MU5hbWUsIFwiXCIsIG5ldyBBcnJheTxJUG9pbnQ+KCksIFwiU2lnbmFsIGFcIiwgbmV3IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvKGZhbHNlLCB0cnVlKSkpO1xyXG4gICAgICAgIGlucHV0RGF0YS5wdXNoKG5ldyBDYWxjdWxhdGlvbkRhdGFQb2ludHModGhpcy5pbnB1dDJOYW1lLCBcIlwiLCBuZXcgQXJyYXk8SVBvaW50PigpLCBcIlNpZ25hbCBiXCIsIG5ldyBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mbyhmYWxzZSwgdHJ1ZSkpKTtcclxuICAgICAgICByZXR1cm4gaW5wdXREYXRhO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgb3V0cHV0IGRhdGEgZm9yIHRoaXMgY2FsY3VsYXRvclxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+fVxyXG4gICAgICogQG1lbWJlcm9mIFZlY3RDYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXREZWZhdWx0T3V0cHV0RGF0YSgpOiBBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+e1xyXG4gICAgICAgIGxldCBvdXRwdXREYXRhID0gbmV3IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz4oKTtcclxuICAgICAgICAvLyBhZGQgb3V0cHV0IHBhcmFtcyB3aXRoIGRlZmF1bHQgZGlzcGxheW5hbWVzXHJcbiAgICAgICAgb3V0cHV0RGF0YS5wdXNoKG5ldyBDYWxjdWxhdGlvbkRhdGFQb2ludHMoXCJPdXRwdXQgc2lnbmFsXCIsIFwidmVjdG9yXCIsIG5ldyBBcnJheTxJUG9pbnQ+KCkpKTsgXHJcbiAgICAgICAgcmV0dXJuIG91dHB1dERhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxjdWxhdGVzIG91dHB1dCB2YWx1ZSBmb3IgdGhlIGdpdmVuIGlucHV0IGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElDYWxjdWxhdGlvbkRhdGE+fSBpbnB1dERhdGFcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+fVxyXG4gICAgICogQG1lbWJlcm9mIFZlY3RDYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIGNhbGN1bGF0ZShpbnB1dERhdGE6IEFycmF5PElDYWxjdWxhdGlvbkRhdGE+KTogQXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPiB7XHJcbiAgICAgICAgdGhpcy5jbGVhckVycm9ycygpO1xyXG5cclxuICAgICAgICBsZXQgcmF3UG9pbnRzID0gbmV3IEFycmF5PElQb2ludD4oKTtcclxuICAgICAgICBsZXQgb3V0cHV0RGF0YSA9IG5ldyBBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+KCk7XHJcbiAgICAgICAgb3V0cHV0RGF0YS5wdXNoKG5ldyBDYWxjdWxhdGlvbkRhdGFQb2ludHMoXCJPdXRwdXQgc2lnbmFsXCIsIFwidmVjdG9yXCIsIG5ldyBBcnJheTxJUG9pbnQ+KCkpKTsgXHJcbiAgICAgICAgb3V0cHV0RGF0YVswXS5zZXREYXRhKHJhd1BvaW50cyk7IC8vIFNldCBlbXB0eSByYXcgcG9pbnRzIGxpc3QgYnkgZGVmYXVsdFxyXG5cclxuICAgICAgICBsZXQgaW5wdXRTaWduYWxEYXRhMSA9IChpbnB1dERhdGFbMF0gYXMgQ2FsY3VsYXRpb25EYXRhUG9pbnRzKS5nZXREYXRhKCk7XHJcbiAgICAgICAgbGV0IGlucHV0U2lnbmFsRGF0YTIgPSAoaW5wdXREYXRhWzFdIGFzIENhbGN1bGF0aW9uRGF0YVBvaW50cykuZ2V0RGF0YSgpO1xyXG5cclxuICAgICAgICAvLyBDaGVja3MgZm9yIHZhbGlkIGlucHV0IHBhcmFtc1xyXG4gICAgICAgIGlmKGlucHV0U2lnbmFsRGF0YTEgPT0gdW5kZWZpbmVkIHx8IGlucHV0U2lnbmFsRGF0YTEubGVuZ3RoIDwgMil7IC8vIEEgbWluaW11bSBvZiB0d28gcG9pbnRzIGlzIG5lZWRlZFxyXG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yQnlUeXBlKEVycm9NZXNzYWdlVHlwZS5NaXNzaW5nT3JJbnZhbGlkSW5wdXQsIFt0aGlzLmlucHV0MU5hbWVdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGlucHV0U2lnbmFsRGF0YTIgPT0gdW5kZWZpbmVkIHx8IGlucHV0U2lnbmFsRGF0YTIubGVuZ3RoIDwgMil7IC8vIEEgbWluaW11bSBvZiB0d28gcG9pbnRzIGlzIG5lZWRlZFxyXG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yQnlUeXBlKEVycm9NZXNzYWdlVHlwZS5NaXNzaW5nT3JJbnZhbGlkSW5wdXQsIFt0aGlzLmlucHV0Mk5hbWVdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJldHVybiBpZiBlcnJvcnMgb2NjdXJyZWRcclxuICAgICAgICBpZih0aGlzLmdldEVycm9ycygpLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICByZXR1cm4gb3V0cHV0RGF0YTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJhd1BvaW50cyA9IHRoaXMudmVjdG9yU2lnbmFsKGlucHV0U2lnbmFsRGF0YTEsIGlucHV0U2lnbmFsRGF0YTIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIG91dHB1dERhdGFbMF0uc2V0RGF0YShyYXdQb2ludHMpO1xyXG4gICAgICAgIHJldHVybiBvdXRwdXREYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsY3VsYXRlcyBvdXRwdXQgc2lnbmFsXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SVBvaW50Pn0gaW5wdXRTaWduYWwxXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElQb2ludD59IGlucHV0U2lnbmFsMlxyXG4gICAgICogQHJldHVybnMge0FycmF5PElQb2ludD59XHJcbiAgICAgKiBAbWVtYmVyb2YgVmVjdENhbGN1bGF0b3JcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB2ZWN0b3JTaWduYWwoaW5wdXRTaWduYWwxOiBBcnJheTxJUG9pbnQ+LCBpbnB1dFNpZ25hbDI6IEFycmF5PElQb2ludD4pOiBBcnJheTxJUG9pbnQ+e1xyXG4gICAgICAgIGxldCBwb2ludHMgPSBuZXcgQXJyYXk8SVBvaW50PigpO1xyXG4gICAgICAgIGlmKGlucHV0U2lnbmFsMS5sZW5ndGggPT0gaW5wdXRTaWduYWwyLmxlbmd0aCl7IC8vIEFkZCBvbmx5IHNpZ25hbHMgd2l0aCBzYW1lIHNhbXBsZSBjb3VudFxyXG4gICAgICAgICAgICBmb3IobGV0IGkgPTA7IGkgPCBpbnB1dFNpZ25hbDEubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld1ggPSBpbnB1dFNpZ25hbDFbaV0ueDtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdZID0gTWF0aC5zcXJ0KE1hdGgucG93KGlucHV0U2lnbmFsMVtpXS55LCAyKSArIE1hdGgucG93KGlucHV0U2lnbmFsMltpXS55LCAyKSk7XHJcbiAgICAgICAgICAgICAgICBpZihpbnB1dFNpZ25hbDJbaV0ueCA9PSBuZXdYKXtcclxuICAgICAgICAgICAgICAgICAgICBwb2ludHMucHVzaChuZXcgUG9pbnQobmV3WCwgbmV3WSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAvLyBWZWN0b3IgY2FsY3VsYXRpb24gb2YgdHdvIGRpZmZlcmVudCBzaWduYWxzKGRpZmZlcmVudCB4IHZhbHVlcykgY3VycmVudGx5IG5vdCBwb3NzaWJsZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkRXJyb3IoXCJDYWxjdWxhdGlvbiBFcnJvcjogVGhlIGlucHV0IHNpZ25hbHMgZG9uJ3QgaGF2ZSBlcXVhbCB4ICh0aW1lKSB2YWx1ZXMhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQXJyYXk8SVBvaW50PigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3IoXCJDYWxjdWxhdGlvbiBFcnJvcjogVGhlIGlucHV0IHNpZ25hbHMgZG9uJ3QgaGF2ZSB0aGUgc2FtZSBudW1iZXIgb2YgcG9pbnRzIVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBvaW50cztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFBlcmZvcm1zIG9wdGlvbmFsIHByZXBlcmF0aW9uIG9mIGlucHV0IGRhdGEuXHJcbiAgICAgKiBGaWx0ZXJzIGlucHV0IHNpZ25hbHMgZm9yIG1hdGNoaW5nIHNpZ25hbCBwYXJ0cyAoc2FtcGxlcyB3aXRoIG1hdGNoaW5nIHRpbWVzdGFtcHMpLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7KEFycmF5PENhbGN1bGF0aW9uRGF0YU51bWJlcnxDYWxjdWxhdGlvbkRhdGFQb2ludHN8Q2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHM+KX0gaW5wdXREYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7KEFycmF5PENhbGN1bGF0aW9uRGF0YU51bWJlcnxDYWxjdWxhdGlvbkRhdGFQb2ludHN8Q2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHM+KX1cclxuICAgICAqIEBtZW1iZXJvZiBWZWN0Q2FsY3VsYXRvclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcHJlcGFyZUlucHV0RGF0YShpbnB1dERhdGE6IEFycmF5PENhbGN1bGF0aW9uRGF0YU51bWJlcnxDYWxjdWxhdGlvbkRhdGFQb2ludHN8Q2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHM+KTogQXJyYXk8Q2FsY3VsYXRpb25EYXRhTnVtYmVyfENhbGN1bGF0aW9uRGF0YVBvaW50c3xDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cz4ge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlucHV0RGF0YSA9IHN1cGVyLnByZXBhcmVJbnB1dERhdGEoaW5wdXREYXRhKTtcclxuICAgICAgICBpbnB1dERhdGEgPSBDYWxjdWxhdG9ySGVscGVyLnRyeUZpbHRlck1hdGNoaW5nU2lnbmFsUGFydHMoaW5wdXREYXRhKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGlucHV0RGF0YTtcclxuICAgIH1cclxufSJdfQ==