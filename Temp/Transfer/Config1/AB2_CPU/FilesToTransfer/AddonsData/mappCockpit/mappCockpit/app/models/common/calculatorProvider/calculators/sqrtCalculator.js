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
define(["require", "exports", "../../point", "../calculationDataPoints", "../calculationDataDisplayInfo", "./calculatorBase"], function (require, exports, point_1, calculationDataPoints_1, calculationDataDisplayInfo_1, calculatorBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SqrtCalculator = /** @class */ (function (_super) {
        __extends(SqrtCalculator, _super);
        function SqrtCalculator() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.id = "square root ";
            _this.displayName = "Square root √a";
            _this.description = "Square root of a signal";
            _this.inputName = "Input signal a";
            return _this;
        }
        /**
         * Returns the default input data for this calculator
         *
         * @returns {(Array<CalculationDataNumber|CalculationDataPoints>)}
         * @memberof SqrtCalculator
         */
        SqrtCalculator.prototype.getDefaultInputData = function () {
            var inputData = new Array();
            // add input params with default displaynames
            inputData.push(new calculationDataPoints_1.CalculationDataPoints(this.inputName, "", new Array(), "The signal whose square root is calculated", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            return inputData;
        };
        /**
         * Returns the default output data for this calculator
         *
         * @returns {Array<CalculationDataPoints>}
         * @memberof SqrtCalculator
         */
        SqrtCalculator.prototype.getDefaultOutputData = function () {
            var outputData = new Array();
            // add output params with default displaynames
            outputData.push(new calculationDataPoints_1.CalculationDataPoints("Output signal", "sqrt", new Array()));
            return outputData;
        };
        /**
         * Calculates the square root for the given input data
         *
         * @param {Array<ICalculationData>} inputData
         * @returns {Array<CalculationDataPoints>}
         * @memberof SqrtCalculator
         */
        SqrtCalculator.prototype.calculate = function (inputData) {
            this.clearErrors();
            var rawPoints = new Array();
            var outputData = new Array();
            outputData.push(new calculationDataPoints_1.CalculationDataPoints("Output signal", "sqrt", new Array()));
            outputData[0].setData(rawPoints); // Set empty raw points list by default
            var inputSignalData = inputData[0].getData();
            // Checks for valid input params
            if (inputSignalData == undefined || inputSignalData.length < 2) { // A minimum of two points is needed
                this.addErrorByType(calculatorBase_1.ErroMessageType.MissingOrInvalidInput, [this.inputName]);
            }
            // Return if errors occurred
            if (this.getErrors().length > 0) {
                return outputData;
            }
            rawPoints = this.sqrtSignal(inputSignalData);
            outputData[0].setData(rawPoints);
            return outputData;
        };
        /**
         * Calculates output signal
         *
         * @private
         * @param {Array<IPoint>} inputSignal
         * @returns {Array<IPoint>}
         * @memberof SqrtCalculator
         */
        SqrtCalculator.prototype.sqrtSignal = function (inputSignal) {
            var points = new Array();
            for (var i = 0; i < inputSignal.length; i++) {
                if (inputSignal[i].y >= 0) {
                    var x = inputSignal[i].x;
                    var y = Math.sqrt(inputSignal[i].y);
                    points.push(new point_1.Point(x, y));
                }
                else {
                    // Not possible to calculate the square root of a negative number. Technically yes, but we are just engineers.
                    this.addError("Calculation Error: Not possible to calculate the square root of a negative number.");
                    return new Array();
                }
            }
            return points;
        };
        return SqrtCalculator;
    }(calculatorBase_1.CalculatorBase));
    exports.SqrtCalculator = SqrtCalculator;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3FydENhbGN1bGF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9jb21tb24vY2FsY3VsYXRvclByb3ZpZGVyL2NhbGN1bGF0b3JzL3NxcnRDYWxjdWxhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFTQTtRQUFvQyxrQ0FBYztRQUFsRDtZQUFBLHFFQTRGQztZQTFGRyxRQUFFLEdBQVcsY0FBYyxDQUFDO1lBQzVCLGlCQUFXLEdBQVcsZ0JBQWdCLENBQUM7WUFDdkMsaUJBQVcsR0FBVyx5QkFBeUIsQ0FBQztZQUV4QyxlQUFTLEdBQUcsZ0JBQWdCLENBQUM7O1FBc0Z6QyxDQUFDO1FBcEZHOzs7OztXQUtHO1FBQ0ksNENBQW1CLEdBQTFCO1lBQ0ksSUFBSSxTQUFTLEdBQUcsSUFBSSxLQUFLLEVBQStDLENBQUM7WUFDekUsNkNBQTZDO1lBQzdDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSw2Q0FBcUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUUsRUFBRSxJQUFJLEtBQUssRUFBVSxFQUFFLDRDQUE0QyxFQUFFLElBQUksdURBQTBCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5SyxPQUFPLFNBQVMsQ0FBQztRQUNyQixDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSSw2Q0FBb0IsR0FBM0I7WUFDSSxJQUFJLFVBQVUsR0FBRyxJQUFJLEtBQUssRUFBeUIsQ0FBQztZQUNwRCw4Q0FBOEM7WUFDOUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLDZDQUFxQixDQUFDLGVBQWUsRUFBRSxNQUFNLEVBQUUsSUFBSSxLQUFLLEVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDekYsT0FBTyxVQUFVLENBQUM7UUFDdEIsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNILGtDQUFTLEdBQVQsVUFBVSxTQUFrQztZQUN4QyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFFbkIsSUFBSSxTQUFTLEdBQUcsSUFBSSxLQUFLLEVBQVUsQ0FBQztZQUNwQyxJQUFJLFVBQVUsR0FBRyxJQUFJLEtBQUssRUFBeUIsQ0FBQztZQUNwRCxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksNkNBQXFCLENBQUMsZUFBZSxFQUFFLE1BQU0sRUFBRSxJQUFJLEtBQUssRUFBVSxDQUFDLENBQUMsQ0FBQztZQUN6RixVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsdUNBQXVDO1lBRXpFLElBQUksZUFBZSxHQUFJLFNBQVMsQ0FBQyxDQUFDLENBQTJCLENBQUMsT0FBTyxFQUFFLENBQUM7WUFFeEUsZ0NBQWdDO1lBQ2hDLElBQUcsZUFBZSxJQUFJLFNBQVMsSUFBSSxlQUFlLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQyxFQUFFLG9DQUFvQztnQkFDaEcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxnQ0FBZSxDQUFDLHFCQUFxQixFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7YUFDaEY7WUFFRCw0QkFBNEI7WUFDNUIsSUFBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQztnQkFDM0IsT0FBTyxVQUFVLENBQUM7YUFDckI7WUFFRCxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUU3QyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2pDLE9BQU8sVUFBVSxDQUFDO1FBQ3RCLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0ssbUNBQVUsR0FBbEIsVUFBbUIsV0FBMEI7WUFDekMsSUFBSSxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQVUsQ0FBQztZQUNqQyxLQUFJLElBQUksQ0FBQyxHQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztnQkFDdEMsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDdkIsSUFBSSxDQUFDLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDekIsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxhQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ2hDO3FCQUNHO29CQUNBLDhHQUE4RztvQkFDOUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxvRkFBb0YsQ0FBQyxDQUFDO29CQUNwRyxPQUFPLElBQUksS0FBSyxFQUFVLENBQUM7aUJBQzlCO2FBRUo7WUFDRCxPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDO1FBQ0wscUJBQUM7SUFBRCxDQUFDLEFBNUZELENBQW9DLCtCQUFjLEdBNEZqRDtJQTVGWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDYWxjdWxhdG9yIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvY2FsY3VsYXRvckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJQ2FsY3VsYXRpb25EYXRhIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvY2FsY3VsYXRpb25EYXRhSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElQb2ludCB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL3BvaW50SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4uLy4uL3BvaW50XCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YU51bWJlciB9IGZyb20gXCIuLi9jYWxjdWxhdGlvbkRhdGFOdW1iZXJcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhUG9pbnRzIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YVBvaW50c1wiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mbyB9IGZyb20gXCIuLi9jYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mb1wiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdG9yQmFzZSwgRXJyb01lc3NhZ2VUeXBlIH0gZnJvbSBcIi4vY2FsY3VsYXRvckJhc2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTcXJ0Q2FsY3VsYXRvciBleHRlbmRzIENhbGN1bGF0b3JCYXNlIGltcGxlbWVudHMgSUNhbGN1bGF0b3J7XHJcbiAgICBcclxuICAgIGlkOiBzdHJpbmcgPSBcInNxdWFyZSByb290IFwiO1xyXG4gICAgZGlzcGxheU5hbWU6IHN0cmluZyA9IFwiU3F1YXJlIHJvb3Qg4oiaYVwiO1xyXG4gICAgZGVzY3JpcHRpb246IHN0cmluZyA9IFwiU3F1YXJlIHJvb3Qgb2YgYSBzaWduYWxcIjtcclxuXHJcbiAgICBwcml2YXRlIGlucHV0TmFtZSA9IFwiSW5wdXQgc2lnbmFsIGFcIjtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IGlucHV0IGRhdGEgZm9yIHRoaXMgY2FsY3VsYXRvclxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsoQXJyYXk8Q2FsY3VsYXRpb25EYXRhTnVtYmVyfENhbGN1bGF0aW9uRGF0YVBvaW50cz4pfVxyXG4gICAgICogQG1lbWJlcm9mIFNxcnRDYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXREZWZhdWx0SW5wdXREYXRhKCk6IEFycmF5PENhbGN1bGF0aW9uRGF0YU51bWJlcnxDYWxjdWxhdGlvbkRhdGFQb2ludHM+e1xyXG4gICAgICAgIGxldCBpbnB1dERhdGEgPSBuZXcgQXJyYXk8Q2FsY3VsYXRpb25EYXRhTnVtYmVyfENhbGN1bGF0aW9uRGF0YVBvaW50cz4oKTtcclxuICAgICAgICAvLyBhZGQgaW5wdXQgcGFyYW1zIHdpdGggZGVmYXVsdCBkaXNwbGF5bmFtZXNcclxuICAgICAgICBpbnB1dERhdGEucHVzaChuZXcgQ2FsY3VsYXRpb25EYXRhUG9pbnRzKHRoaXMuaW5wdXROYW1lLCBcIlwiLCBuZXcgQXJyYXk8SVBvaW50PigpLCBcIlRoZSBzaWduYWwgd2hvc2Ugc3F1YXJlIHJvb3QgaXMgY2FsY3VsYXRlZFwiLCBuZXcgQ2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm8oZmFsc2UsIHRydWUpKSk7XHJcbiAgICAgICAgcmV0dXJuIGlucHV0RGF0YTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IG91dHB1dCBkYXRhIGZvciB0aGlzIGNhbGN1bGF0b3JcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPn1cclxuICAgICAqIEBtZW1iZXJvZiBTcXJ0Q2FsY3VsYXRvclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0RGVmYXVsdE91dHB1dERhdGEoKTogQXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPntcclxuICAgICAgICBsZXQgb3V0cHV0RGF0YSA9IG5ldyBBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+KCk7XHJcbiAgICAgICAgLy8gYWRkIG91dHB1dCBwYXJhbXMgd2l0aCBkZWZhdWx0IGRpc3BsYXluYW1lc1xyXG4gICAgICAgIG91dHB1dERhdGEucHVzaChuZXcgQ2FsY3VsYXRpb25EYXRhUG9pbnRzKFwiT3V0cHV0IHNpZ25hbFwiLCBcInNxcnRcIiwgbmV3IEFycmF5PElQb2ludD4oKSkpOyBcclxuICAgICAgICByZXR1cm4gb3V0cHV0RGF0YTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0ZXMgdGhlIHNxdWFyZSByb290IGZvciB0aGUgZ2l2ZW4gaW5wdXQgZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SUNhbGN1bGF0aW9uRGF0YT59IGlucHV0RGF0YVxyXG4gICAgICogQHJldHVybnMge0FycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz59XHJcbiAgICAgKiBAbWVtYmVyb2YgU3FydENhbGN1bGF0b3JcclxuICAgICAqL1xyXG4gICAgY2FsY3VsYXRlKGlucHV0RGF0YTogQXJyYXk8SUNhbGN1bGF0aW9uRGF0YT4pOiBBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+IHtcclxuICAgICAgICB0aGlzLmNsZWFyRXJyb3JzKCk7XHJcblxyXG4gICAgICAgIGxldCByYXdQb2ludHMgPSBuZXcgQXJyYXk8SVBvaW50PigpO1xyXG4gICAgICAgIGxldCBvdXRwdXREYXRhID0gbmV3IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz4oKTtcclxuICAgICAgICBvdXRwdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YVBvaW50cyhcIk91dHB1dCBzaWduYWxcIiwgXCJzcXJ0XCIsIG5ldyBBcnJheTxJUG9pbnQ+KCkpKTsgXHJcbiAgICAgICAgb3V0cHV0RGF0YVswXS5zZXREYXRhKHJhd1BvaW50cyk7IC8vIFNldCBlbXB0eSByYXcgcG9pbnRzIGxpc3QgYnkgZGVmYXVsdFxyXG5cclxuICAgICAgICBsZXQgaW5wdXRTaWduYWxEYXRhID0gKGlucHV0RGF0YVswXSBhcyBDYWxjdWxhdGlvbkRhdGFQb2ludHMpLmdldERhdGEoKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBDaGVja3MgZm9yIHZhbGlkIGlucHV0IHBhcmFtc1xyXG4gICAgICAgIGlmKGlucHV0U2lnbmFsRGF0YSA9PSB1bmRlZmluZWQgfHwgaW5wdXRTaWduYWxEYXRhLmxlbmd0aCA8IDIpeyAvLyBBIG1pbmltdW0gb2YgdHdvIHBvaW50cyBpcyBuZWVkZWRcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvckJ5VHlwZShFcnJvTWVzc2FnZVR5cGUuTWlzc2luZ09ySW52YWxpZElucHV0LCBbdGhpcy5pbnB1dE5hbWVdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJldHVybiBpZiBlcnJvcnMgb2NjdXJyZWRcclxuICAgICAgICBpZih0aGlzLmdldEVycm9ycygpLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICByZXR1cm4gb3V0cHV0RGF0YTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJhd1BvaW50cyA9IHRoaXMuc3FydFNpZ25hbChpbnB1dFNpZ25hbERhdGEpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIG91dHB1dERhdGFbMF0uc2V0RGF0YShyYXdQb2ludHMpO1xyXG4gICAgICAgIHJldHVybiBvdXRwdXREYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsY3VsYXRlcyBvdXRwdXQgc2lnbmFsXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SVBvaW50Pn0gaW5wdXRTaWduYWxcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxJUG9pbnQ+fVxyXG4gICAgICogQG1lbWJlcm9mIFNxcnRDYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3FydFNpZ25hbChpbnB1dFNpZ25hbDogQXJyYXk8SVBvaW50Pik6IEFycmF5PElQb2ludD57XHJcbiAgICAgICAgbGV0IHBvaW50cyA9IG5ldyBBcnJheTxJUG9pbnQ+KCk7XHJcbiAgICAgICAgZm9yKGxldCBpID0wOyBpIDwgaW5wdXRTaWduYWwubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZiAoaW5wdXRTaWduYWxbaV0ueSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgeCA9IGlucHV0U2lnbmFsW2ldLng7XHJcbiAgICAgICAgICAgICAgICBsZXQgeSA9IE1hdGguc3FydChpbnB1dFNpZ25hbFtpXS55KTtcclxuICAgICAgICAgICAgICAgIHBvaW50cy5wdXNoKG5ldyBQb2ludCh4LCB5KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIC8vIE5vdCBwb3NzaWJsZSB0byBjYWxjdWxhdGUgdGhlIHNxdWFyZSByb290IG9mIGEgbmVnYXRpdmUgbnVtYmVyLiBUZWNobmljYWxseSB5ZXMsIGJ1dCB3ZSBhcmUganVzdCBlbmdpbmVlcnMuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEVycm9yKFwiQ2FsY3VsYXRpb24gRXJyb3I6IE5vdCBwb3NzaWJsZSB0byBjYWxjdWxhdGUgdGhlIHNxdWFyZSByb290IG9mIGEgbmVnYXRpdmUgbnVtYmVyLlwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQXJyYXk8SVBvaW50PigpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcG9pbnRzO1xyXG4gICAgfVxyXG59Il19