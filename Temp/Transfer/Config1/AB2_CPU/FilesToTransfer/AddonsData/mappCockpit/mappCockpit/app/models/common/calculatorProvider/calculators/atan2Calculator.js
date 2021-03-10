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
    var Atan2Calculator = /** @class */ (function (_super) {
        __extends(Atan2Calculator, _super);
        function Atan2Calculator() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.id = "atan2";
            _this.displayName = "Atan2(a)";
            _this.description = "Calculates the arctangent value of all four quadrants of a signal";
            _this.inputSignalName = "Input signal a";
            return _this;
        }
        /**
         * Returns the default input data for this calculator
         *
         * @returns {Array<CalculationDataPoints>}
         * @memberof Atan2Calculator
         */
        Atan2Calculator.prototype.getDefaultInputData = function () {
            var inputData = new Array();
            // add input params with default displaynames
            inputData.push(new calculationDataPoints_1.CalculationDataPoints(this.inputSignalName, "", new Array(), "The signal whose arctangent value is calculated", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            return inputData;
        };
        /**
         * Returns the default output data for this calculator
         *
         * @returns {Array<CalculationDataPoints>}
         * @memberof AbsCalculator
         */
        Atan2Calculator.prototype.getDefaultOutputData = function () {
            var outputData = new Array();
            // add output params with default displaynames
            outputData.push(new calculationDataPoints_1.CalculationDataPoints("Output signal", "atan2", new Array()));
            return outputData;
        };
        /**
         * Calculates the arc tangent 2 value for the given input data
         *
         * @param {Array<ICalculationData>} inputData
         * @returns {Array<CalculationDataPoints>}
         * @memberof Atan2Calculator
         */
        Atan2Calculator.prototype.calculate = function (inputData) {
            this.clearErrors();
            var rawPoints = new Array();
            var outputData = new Array();
            outputData.push(new calculationDataPoints_1.CalculationDataPoints("Output signal", "atan2", new Array()));
            outputData[0].setData(rawPoints); // Set empty raw points list by default
            var inputSignalData = inputData[0].getData();
            // Check for valid input data
            if (inputSignalData == undefined || inputSignalData.length < 2) {
                this.addErrorByType(calculatorBase_1.ErroMessageType.MissingOrInvalidInput, [this.inputSignalName]);
                return outputData;
            }
            rawPoints = this.atan2Signal(inputSignalData);
            outputData[0].setData(rawPoints);
            return outputData;
        };
        /**
         * Calculates output signal
         *
         * @private
         * @param {Array<IPoint>} inputSignal
         * @returns {Array<IPoint>}
         * @memberof Atan2Calculator
         */
        Atan2Calculator.prototype.atan2Signal = function (inputSignal) {
            var points = new Array();
            for (var i = 0; i < inputSignal.length; i++) {
                var x = inputSignal[i].x;
                var y = Math.atan2(inputSignal[i].y, inputSignal[i].x);
                points.push(new point_1.Point(x, y));
            }
            return points;
        };
        return Atan2Calculator;
    }(calculatorBase_1.CalculatorBase));
    exports.Atan2Calculator = Atan2Calculator;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXRhbjJDYWxjdWxhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdG9ycy9hdGFuMkNhbGN1bGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVFBO1FBQXFDLG1DQUFjO1FBQW5EO1lBQUEscUVBZ0ZDO1lBOUVHLFFBQUUsR0FBVyxPQUFPLENBQUM7WUFDckIsaUJBQVcsR0FBVyxVQUFVLENBQUM7WUFDakMsaUJBQVcsR0FBVyxtRUFBbUUsQ0FBQztZQUVsRixxQkFBZSxHQUFHLGdCQUFnQixDQUFDOztRQTBFL0MsQ0FBQztRQXhFRzs7Ozs7V0FLRztRQUNJLDZDQUFtQixHQUExQjtZQUNJLElBQUksU0FBUyxHQUFHLElBQUksS0FBSyxFQUF5QixDQUFDO1lBQ25ELDZDQUE2QztZQUM3QyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksNkNBQXFCLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxFQUFFLEVBQUUsSUFBSSxLQUFLLEVBQVUsRUFBRSxpREFBaUQsRUFBRSxJQUFJLHVEQUEwQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekwsT0FBTyxTQUFTLENBQUM7UUFDckIsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0ksOENBQW9CLEdBQTNCO1lBQ0ksSUFBSSxVQUFVLEdBQUcsSUFBSSxLQUFLLEVBQXlCLENBQUM7WUFDcEQsOENBQThDO1lBQzlDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSw2Q0FBcUIsQ0FBQyxlQUFlLEVBQUUsT0FBTyxFQUFFLElBQUksS0FBSyxFQUFVLENBQUMsQ0FBQyxDQUFDO1lBQzFGLE9BQU8sVUFBVSxDQUFDO1FBQ3RCLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSCxtQ0FBUyxHQUFULFVBQVUsU0FBa0M7WUFDeEMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBRW5CLElBQUksU0FBUyxHQUFHLElBQUksS0FBSyxFQUFVLENBQUM7WUFDcEMsSUFBSSxVQUFVLEdBQUcsSUFBSSxLQUFLLEVBQXlCLENBQUM7WUFDcEQsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLDZDQUFxQixDQUFDLGVBQWUsRUFBRSxPQUFPLEVBQUUsSUFBSSxLQUFLLEVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDMUYsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLHVDQUF1QztZQUV6RSxJQUFJLGVBQWUsR0FBSSxTQUFTLENBQUMsQ0FBQyxDQUEyQixDQUFDLE9BQU8sRUFBRSxDQUFDO1lBRXhFLDZCQUE2QjtZQUM3QixJQUFHLGVBQWUsSUFBSSxTQUFTLElBQUksZUFBZSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUM7Z0JBQzFELElBQUksQ0FBQyxjQUFjLENBQUMsZ0NBQWUsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO2dCQUNuRixPQUFPLFVBQVUsQ0FBQzthQUNyQjtZQUVELFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBRTlDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDakMsT0FBTyxVQUFVLENBQUM7UUFDdEIsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSyxxQ0FBVyxHQUFuQixVQUFvQixXQUEwQjtZQUMxQyxJQUFJLE1BQU0sR0FBRyxJQUFJLEtBQUssRUFBVSxDQUFDO1lBQ2pDLEtBQUksSUFBSSxDQUFDLEdBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUN0QyxJQUFJLENBQUMsR0FBVSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2RCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksYUFBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2hDO1lBQ0QsT0FBTyxNQUFNLENBQUM7UUFDbEIsQ0FBQztRQUNMLHNCQUFDO0lBQUQsQ0FBQyxBQWhGRCxDQUFxQywrQkFBYyxHQWdGbEQ7SUFoRlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ2FsY3VsYXRvciB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2NhbGN1bGF0b3JJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSUNhbGN1bGF0aW9uRGF0YSB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2NhbGN1bGF0aW9uRGF0YUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9wb2ludEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuLi8uLi9wb2ludFwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFQb2ludHMgfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhUG9pbnRzXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0b3JCYXNlLCBFcnJvTWVzc2FnZVR5cGUgfSBmcm9tIFwiLi9jYWxjdWxhdG9yQmFzZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEF0YW4yQ2FsY3VsYXRvciBleHRlbmRzIENhbGN1bGF0b3JCYXNlIGltcGxlbWVudHMgSUNhbGN1bGF0b3J7XHJcbiAgICBcclxuICAgIGlkOiBzdHJpbmcgPSBcImF0YW4yXCI7XHJcbiAgICBkaXNwbGF5TmFtZTogc3RyaW5nID0gXCJBdGFuMihhKVwiO1xyXG4gICAgZGVzY3JpcHRpb246IHN0cmluZyA9IFwiQ2FsY3VsYXRlcyB0aGUgYXJjdGFuZ2VudCB2YWx1ZSBvZiBhbGwgZm91ciBxdWFkcmFudHMgb2YgYSBzaWduYWxcIjtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBpbnB1dFNpZ25hbE5hbWUgPSBcIklucHV0IHNpZ25hbCBhXCI7IFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBpbnB1dCBkYXRhIGZvciB0aGlzIGNhbGN1bGF0b3JcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPn1cclxuICAgICAqIEBtZW1iZXJvZiBBdGFuMkNhbGN1bGF0b3JcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldERlZmF1bHRJbnB1dERhdGEoKTogQXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPntcclxuICAgICAgICBsZXQgaW5wdXREYXRhID0gbmV3IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz4oKTtcclxuICAgICAgICAvLyBhZGQgaW5wdXQgcGFyYW1zIHdpdGggZGVmYXVsdCBkaXNwbGF5bmFtZXNcclxuICAgICAgICBpbnB1dERhdGEucHVzaChuZXcgQ2FsY3VsYXRpb25EYXRhUG9pbnRzKHRoaXMuaW5wdXRTaWduYWxOYW1lLCBcIlwiLCBuZXcgQXJyYXk8SVBvaW50PigpLCBcIlRoZSBzaWduYWwgd2hvc2UgYXJjdGFuZ2VudCB2YWx1ZSBpcyBjYWxjdWxhdGVkXCIsIG5ldyBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mbyhmYWxzZSwgdHJ1ZSkpKTtcclxuICAgICAgICByZXR1cm4gaW5wdXREYXRhO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgb3V0cHV0IGRhdGEgZm9yIHRoaXMgY2FsY3VsYXRvclxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+fVxyXG4gICAgICogQG1lbWJlcm9mIEFic0NhbGN1bGF0b3JcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldERlZmF1bHRPdXRwdXREYXRhKCk6IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz57XHJcbiAgICAgICAgbGV0IG91dHB1dERhdGEgPSBuZXcgQXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPigpO1xyXG4gICAgICAgIC8vIGFkZCBvdXRwdXQgcGFyYW1zIHdpdGggZGVmYXVsdCBkaXNwbGF5bmFtZXNcclxuICAgICAgICBvdXRwdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YVBvaW50cyhcIk91dHB1dCBzaWduYWxcIiwgXCJhdGFuMlwiLCBuZXcgQXJyYXk8SVBvaW50PigpKSk7IFxyXG4gICAgICAgIHJldHVybiBvdXRwdXREYXRhO1xyXG4gICAgfVxyXG4gICBcclxuICAgIC8qKlxyXG4gICAgICogQ2FsY3VsYXRlcyB0aGUgYXJjIHRhbmdlbnQgMiB2YWx1ZSBmb3IgdGhlIGdpdmVuIGlucHV0IGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElDYWxjdWxhdGlvbkRhdGE+fSBpbnB1dERhdGFcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+fVxyXG4gICAgICogQG1lbWJlcm9mIEF0YW4yQ2FsY3VsYXRvclxyXG4gICAgICovXHJcbiAgICBjYWxjdWxhdGUoaW5wdXREYXRhOiBBcnJheTxJQ2FsY3VsYXRpb25EYXRhPik6IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz4ge1xyXG4gICAgICAgIHRoaXMuY2xlYXJFcnJvcnMoKTtcclxuXHJcbiAgICAgICAgbGV0IHJhd1BvaW50cyA9IG5ldyBBcnJheTxJUG9pbnQ+KCk7XHJcbiAgICAgICAgbGV0IG91dHB1dERhdGEgPSBuZXcgQXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPigpO1xyXG4gICAgICAgIG91dHB1dERhdGEucHVzaChuZXcgQ2FsY3VsYXRpb25EYXRhUG9pbnRzKFwiT3V0cHV0IHNpZ25hbFwiLCBcImF0YW4yXCIsIG5ldyBBcnJheTxJUG9pbnQ+KCkpKTsgXHJcbiAgICAgICAgb3V0cHV0RGF0YVswXS5zZXREYXRhKHJhd1BvaW50cyk7IC8vIFNldCBlbXB0eSByYXcgcG9pbnRzIGxpc3QgYnkgZGVmYXVsdFxyXG5cclxuICAgICAgICBsZXQgaW5wdXRTaWduYWxEYXRhID0gKGlucHV0RGF0YVswXSBhcyBDYWxjdWxhdGlvbkRhdGFQb2ludHMpLmdldERhdGEoKTtcclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgZm9yIHZhbGlkIGlucHV0IGRhdGFcclxuICAgICAgICBpZihpbnB1dFNpZ25hbERhdGEgPT0gdW5kZWZpbmVkIHx8IGlucHV0U2lnbmFsRGF0YS5sZW5ndGggPCAyKXtcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvckJ5VHlwZShFcnJvTWVzc2FnZVR5cGUuTWlzc2luZ09ySW52YWxpZElucHV0LCBbdGhpcy5pbnB1dFNpZ25hbE5hbWVdKTtcclxuICAgICAgICAgICAgcmV0dXJuIG91dHB1dERhdGE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByYXdQb2ludHMgPSB0aGlzLmF0YW4yU2lnbmFsKGlucHV0U2lnbmFsRGF0YSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgb3V0cHV0RGF0YVswXS5zZXREYXRhKHJhd1BvaW50cyk7XHJcbiAgICAgICAgcmV0dXJuIG91dHB1dERhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxjdWxhdGVzIG91dHB1dCBzaWduYWxcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxJUG9pbnQ+fSBpbnB1dFNpZ25hbFxyXG4gICAgICogQHJldHVybnMge0FycmF5PElQb2ludD59XHJcbiAgICAgKiBAbWVtYmVyb2YgQXRhbjJDYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXRhbjJTaWduYWwoaW5wdXRTaWduYWw6IEFycmF5PElQb2ludD4pOiBBcnJheTxJUG9pbnQ+e1xyXG4gICAgICAgIGxldCBwb2ludHMgPSBuZXcgQXJyYXk8SVBvaW50PigpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9MDsgaSA8IGlucHV0U2lnbmFsLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IHg6bnVtYmVyID0gaW5wdXRTaWduYWxbaV0ueDtcclxuICAgICAgICAgICAgbGV0IHkgPSBNYXRoLmF0YW4yKGlucHV0U2lnbmFsW2ldLnksIGlucHV0U2lnbmFsW2ldLngpO1xyXG4gICAgICAgICAgICBwb2ludHMucHVzaChuZXcgUG9pbnQoeCwgeSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcG9pbnRzO1xyXG4gICAgfVxyXG59Il19