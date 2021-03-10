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
    var SinCalculator = /** @class */ (function (_super) {
        __extends(SinCalculator, _super);
        function SinCalculator() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.id = "sin";
            _this.displayName = "Sin(a)";
            _this.description = "Calculates the sine value of a signal";
            _this.inputSignalName = "Input signal a";
            return _this;
        }
        /**
         * Returns the default input data for this calculator
         *
         * @returns {Array<CalculationDataPoints>}
         * @memberof SinCalculator
         */
        SinCalculator.prototype.getDefaultInputData = function () {
            var inputData = new Array();
            // add input params with default displaynames
            inputData.push(new calculationDataPoints_1.CalculationDataPoints(this.inputSignalName, "", new Array(), "The signal whose sine value is calculated", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            return inputData;
        };
        /**
         * Returns the default output data for this calculator
         *
         * @returns {Array<CalculationDataPoints>}
         * @memberof SinCalculator
         */
        SinCalculator.prototype.getDefaultOutputData = function () {
            var outputData = new Array();
            // add output params with default displaynames
            outputData.push(new calculationDataPoints_1.CalculationDataPoints("Output signal", "sin", new Array()));
            return outputData;
        };
        /**
         * Calculates the sine value for the given input data
         *
         * @param {Array<ICalculationData>} inputData
         * @returns {Array<CalculationDataPoints>}
         * @memberof SinCalculator
         */
        SinCalculator.prototype.calculate = function (inputData) {
            this.clearErrors();
            var rawPoints = new Array();
            var outputData = new Array();
            outputData.push(new calculationDataPoints_1.CalculationDataPoints("Output signal", "sin", new Array()));
            outputData[0].setData(rawPoints); // Set empty raw points list by default
            var inputSignalData = inputData[0].getData();
            // Check for valid input data
            if (inputSignalData == undefined || inputSignalData.length < 2) {
                this.addErrorByType(calculatorBase_1.ErroMessageType.MissingOrInvalidInput, [this.inputSignalName]);
                return outputData;
            }
            rawPoints = this.sinSignal(inputSignalData);
            outputData[0].setData(rawPoints);
            return outputData;
        };
        /**
         * Calculates output signal
         *
         * @private
         * @param {Array<IPoint>} inputSignal
         * @returns {Array<IPoint>}
         * @memberof SinCalculator
         */
        SinCalculator.prototype.sinSignal = function (inputSignal) {
            var points = new Array();
            for (var i = 0; i < inputSignal.length; i++) {
                var x = inputSignal[i].x;
                var y = Math.sin(inputSignal[i].y);
                points.push(new point_1.Point(x, y));
            }
            return points;
        };
        return SinCalculator;
    }(calculatorBase_1.CalculatorBase));
    exports.SinCalculator = SinCalculator;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2luQ2FsY3VsYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRvcnMvc2luQ2FsY3VsYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBUUE7UUFBbUMsaUNBQWM7UUFBakQ7WUFBQSxxRUFnRkM7WUE5RUcsUUFBRSxHQUFXLEtBQUssQ0FBQztZQUNuQixpQkFBVyxHQUFXLFFBQVEsQ0FBQztZQUMvQixpQkFBVyxHQUFXLHVDQUF1QyxDQUFDO1lBRXRELHFCQUFlLEdBQUcsZ0JBQWdCLENBQUM7O1FBMEUvQyxDQUFDO1FBeEVHOzs7OztXQUtHO1FBQ0ksMkNBQW1CLEdBQTFCO1lBQ0ksSUFBSSxTQUFTLEdBQUcsSUFBSSxLQUFLLEVBQXlCLENBQUM7WUFDbkQsNkNBQTZDO1lBQzdDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSw2Q0FBcUIsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLEVBQUUsRUFBRSxJQUFJLEtBQUssRUFBVSxFQUFFLDJDQUEyQyxFQUFFLElBQUksdURBQTBCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuTCxPQUFPLFNBQVMsQ0FBQztRQUNyQixDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSSw0Q0FBb0IsR0FBM0I7WUFDSSxJQUFJLFVBQVUsR0FBRyxJQUFJLEtBQUssRUFBeUIsQ0FBQztZQUNwRCw4Q0FBOEM7WUFDOUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLDZDQUFxQixDQUFDLGVBQWUsRUFBRSxLQUFLLEVBQUUsSUFBSSxLQUFLLEVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDeEYsT0FBTyxVQUFVLENBQUM7UUFDdEIsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNILGlDQUFTLEdBQVQsVUFBVSxTQUFrQztZQUN4QyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFFbkIsSUFBSSxTQUFTLEdBQUcsSUFBSSxLQUFLLEVBQVUsQ0FBQztZQUNwQyxJQUFJLFVBQVUsR0FBRyxJQUFJLEtBQUssRUFBeUIsQ0FBQztZQUNwRCxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksNkNBQXFCLENBQUMsZUFBZSxFQUFFLEtBQUssRUFBRSxJQUFJLEtBQUssRUFBVSxDQUFDLENBQUMsQ0FBQztZQUN4RixVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsdUNBQXVDO1lBRXpFLElBQUksZUFBZSxHQUFJLFNBQVMsQ0FBQyxDQUFDLENBQTJCLENBQUMsT0FBTyxFQUFFLENBQUM7WUFFeEUsNkJBQTZCO1lBQzdCLElBQUcsZUFBZSxJQUFJLFNBQVMsSUFBSSxlQUFlLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQztnQkFDMUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxnQ0FBZSxDQUFDLHFCQUFxQixFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7Z0JBQ25GLE9BQU8sVUFBVSxDQUFDO2FBQ3JCO1lBRUQsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLENBQUM7WUFFNUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNqQyxPQUFPLFVBQVUsQ0FBQztRQUN0QixDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNLLGlDQUFTLEdBQWpCLFVBQWtCLFdBQTBCO1lBQ3hDLElBQUksTUFBTSxHQUFHLElBQUksS0FBSyxFQUFVLENBQUM7WUFDakMsS0FBSSxJQUFJLENBQUMsR0FBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQ3RDLElBQUksQ0FBQyxHQUFVLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksYUFBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2hDO1lBQ0QsT0FBTyxNQUFNLENBQUM7UUFDbEIsQ0FBQztRQUNMLG9CQUFDO0lBQUQsQ0FBQyxBQWhGRCxDQUFtQywrQkFBYyxHQWdGaEQ7SUFoRlksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ2FsY3VsYXRvciB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2NhbGN1bGF0b3JJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSUNhbGN1bGF0aW9uRGF0YSB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2NhbGN1bGF0aW9uRGF0YUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9wb2ludEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuLi8uLi9wb2ludFwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFQb2ludHMgfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhUG9pbnRzXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0b3JCYXNlLCBFcnJvTWVzc2FnZVR5cGUgfSBmcm9tIFwiLi9jYWxjdWxhdG9yQmFzZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNpbkNhbGN1bGF0b3IgZXh0ZW5kcyBDYWxjdWxhdG9yQmFzZSBpbXBsZW1lbnRzIElDYWxjdWxhdG9ye1xyXG4gICAgXHJcbiAgICBpZDogc3RyaW5nID0gXCJzaW5cIjtcclxuICAgIGRpc3BsYXlOYW1lOiBzdHJpbmcgPSBcIlNpbihhKVwiO1xyXG4gICAgZGVzY3JpcHRpb246IHN0cmluZyA9IFwiQ2FsY3VsYXRlcyB0aGUgc2luZSB2YWx1ZSBvZiBhIHNpZ25hbFwiO1xyXG4gICAgXHJcbiAgICBwcml2YXRlIGlucHV0U2lnbmFsTmFtZSA9IFwiSW5wdXQgc2lnbmFsIGFcIjsgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IGlucHV0IGRhdGEgZm9yIHRoaXMgY2FsY3VsYXRvclxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+fVxyXG4gICAgICogQG1lbWJlcm9mIFNpbkNhbGN1bGF0b3JcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldERlZmF1bHRJbnB1dERhdGEoKTogQXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPntcclxuICAgICAgICBsZXQgaW5wdXREYXRhID0gbmV3IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz4oKTtcclxuICAgICAgICAvLyBhZGQgaW5wdXQgcGFyYW1zIHdpdGggZGVmYXVsdCBkaXNwbGF5bmFtZXNcclxuICAgICAgICBpbnB1dERhdGEucHVzaChuZXcgQ2FsY3VsYXRpb25EYXRhUG9pbnRzKHRoaXMuaW5wdXRTaWduYWxOYW1lLCBcIlwiLCBuZXcgQXJyYXk8SVBvaW50PigpLCBcIlRoZSBzaWduYWwgd2hvc2Ugc2luZSB2YWx1ZSBpcyBjYWxjdWxhdGVkXCIsIG5ldyBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mbyhmYWxzZSwgdHJ1ZSkpKTtcclxuICAgICAgICByZXR1cm4gaW5wdXREYXRhO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgb3V0cHV0IGRhdGEgZm9yIHRoaXMgY2FsY3VsYXRvclxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+fVxyXG4gICAgICogQG1lbWJlcm9mIFNpbkNhbGN1bGF0b3JcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldERlZmF1bHRPdXRwdXREYXRhKCk6IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz57XHJcbiAgICAgICAgbGV0IG91dHB1dERhdGEgPSBuZXcgQXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPigpO1xyXG4gICAgICAgIC8vIGFkZCBvdXRwdXQgcGFyYW1zIHdpdGggZGVmYXVsdCBkaXNwbGF5bmFtZXNcclxuICAgICAgICBvdXRwdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YVBvaW50cyhcIk91dHB1dCBzaWduYWxcIiwgXCJzaW5cIiwgbmV3IEFycmF5PElQb2ludD4oKSkpOyBcclxuICAgICAgICByZXR1cm4gb3V0cHV0RGF0YTtcclxuICAgIH1cclxuICAgXHJcbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0ZXMgdGhlIHNpbmUgdmFsdWUgZm9yIHRoZSBnaXZlbiBpbnB1dCBkYXRhXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxJQ2FsY3VsYXRpb25EYXRhPn0gaW5wdXREYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPn1cclxuICAgICAqIEBtZW1iZXJvZiBTaW5DYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIGNhbGN1bGF0ZShpbnB1dERhdGE6IEFycmF5PElDYWxjdWxhdGlvbkRhdGE+KTogQXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPiB7XHJcbiAgICAgICAgdGhpcy5jbGVhckVycm9ycygpO1xyXG5cclxuICAgICAgICBsZXQgcmF3UG9pbnRzID0gbmV3IEFycmF5PElQb2ludD4oKTtcclxuICAgICAgICBsZXQgb3V0cHV0RGF0YSA9IG5ldyBBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+KCk7XHJcbiAgICAgICAgb3V0cHV0RGF0YS5wdXNoKG5ldyBDYWxjdWxhdGlvbkRhdGFQb2ludHMoXCJPdXRwdXQgc2lnbmFsXCIsIFwic2luXCIsIG5ldyBBcnJheTxJUG9pbnQ+KCkpKTsgXHJcbiAgICAgICAgb3V0cHV0RGF0YVswXS5zZXREYXRhKHJhd1BvaW50cyk7IC8vIFNldCBlbXB0eSByYXcgcG9pbnRzIGxpc3QgYnkgZGVmYXVsdFxyXG5cclxuICAgICAgICBsZXQgaW5wdXRTaWduYWxEYXRhID0gKGlucHV0RGF0YVswXSBhcyBDYWxjdWxhdGlvbkRhdGFQb2ludHMpLmdldERhdGEoKTtcclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgZm9yIHZhbGlkIGlucHV0IGRhdGFcclxuICAgICAgICBpZihpbnB1dFNpZ25hbERhdGEgPT0gdW5kZWZpbmVkIHx8IGlucHV0U2lnbmFsRGF0YS5sZW5ndGggPCAyKXtcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvckJ5VHlwZShFcnJvTWVzc2FnZVR5cGUuTWlzc2luZ09ySW52YWxpZElucHV0LCBbdGhpcy5pbnB1dFNpZ25hbE5hbWVdKTtcclxuICAgICAgICAgICAgcmV0dXJuIG91dHB1dERhdGE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByYXdQb2ludHMgPSB0aGlzLnNpblNpZ25hbChpbnB1dFNpZ25hbERhdGEpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIG91dHB1dERhdGFbMF0uc2V0RGF0YShyYXdQb2ludHMpO1xyXG4gICAgICAgIHJldHVybiBvdXRwdXREYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsY3VsYXRlcyBvdXRwdXQgc2lnbmFsXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SVBvaW50Pn0gaW5wdXRTaWduYWxcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxJUG9pbnQ+fVxyXG4gICAgICogQG1lbWJlcm9mIFNpbkNhbGN1bGF0b3JcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzaW5TaWduYWwoaW5wdXRTaWduYWw6IEFycmF5PElQb2ludD4pOiBBcnJheTxJUG9pbnQ+e1xyXG4gICAgICAgIGxldCBwb2ludHMgPSBuZXcgQXJyYXk8SVBvaW50PigpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9MDsgaSA8IGlucHV0U2lnbmFsLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IHg6bnVtYmVyID0gaW5wdXRTaWduYWxbaV0ueDtcclxuICAgICAgICAgICAgbGV0IHkgPSBNYXRoLnNpbihpbnB1dFNpZ25hbFtpXS55KTtcclxuICAgICAgICAgICAgcG9pbnRzLnB1c2gobmV3IFBvaW50KHgsIHkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBvaW50cztcclxuICAgIH1cclxufSJdfQ==