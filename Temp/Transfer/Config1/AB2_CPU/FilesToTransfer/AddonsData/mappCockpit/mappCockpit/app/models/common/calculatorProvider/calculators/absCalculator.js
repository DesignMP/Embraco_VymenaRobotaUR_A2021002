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
    var AbsCalculator = /** @class */ (function (_super) {
        __extends(AbsCalculator, _super);
        function AbsCalculator() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.id = "absolute value";
            _this.displayName = "Absolute value |a|";
            _this.description = "Absolute value of a signal";
            _this.inputSignalName = "Input signal a";
            return _this;
        }
        /**
         * Returns the default input data for this calculator
         *
         * @returns {Array<CalculationDataPoints>}
         * @memberof AbsCalculator
         */
        AbsCalculator.prototype.getDefaultInputData = function () {
            var inputData = new Array();
            // add input params with default displaynames
            inputData.push(new calculationDataPoints_1.CalculationDataPoints(this.inputSignalName, "", new Array(), "The signal whose absolute value is calculated", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            return inputData;
        };
        /**
         * Returns the default output data for this calculator
         *
         * @returns {Array<CalculationDataPoints>}
         * @memberof AbsCalculator
         */
        AbsCalculator.prototype.getDefaultOutputData = function () {
            var outputData = new Array();
            // add output params with default displaynames
            outputData.push(new calculationDataPoints_1.CalculationDataPoints("Output signal", "absolute", new Array()));
            return outputData;
        };
        /**
         * Calculates the absolute value for the given input data
         *
         * @param {Array<ICalculationData>} inputData
         * @returns {Array<CalculationDataPoints>}
         * @memberof AbsCalculator
         */
        AbsCalculator.prototype.calculate = function (inputData) {
            this.clearErrors();
            var rawPoints = new Array();
            var outputData = new Array();
            outputData.push(new calculationDataPoints_1.CalculationDataPoints("Output signal", "absolute", new Array()));
            outputData[0].setData(rawPoints); // Set empty raw points list by default
            var inputSignalData = inputData[0].getData();
            // Check for valid input data
            if (inputSignalData == undefined || inputSignalData.length < 2) {
                this.addErrorByType(calculatorBase_1.ErroMessageType.MissingOrInvalidInput, [this.inputSignalName]);
                return outputData;
            }
            rawPoints = this.absSignal(inputSignalData);
            outputData[0].setData(rawPoints);
            return outputData;
        };
        /**
         * Calculates output signal
         *
         * @private
         * @param {Array<IPoint>} inputSignal
         * @returns {Array<IPoint>}
         * @memberof AbsCalculator
         */
        AbsCalculator.prototype.absSignal = function (inputSignal) {
            var points = new Array();
            for (var i = 0; i < inputSignal.length; i++) {
                var x = inputSignal[i].x;
                var y = Math.abs(inputSignal[i].y);
                points.push(new point_1.Point(x, y));
            }
            return points;
        };
        return AbsCalculator;
    }(calculatorBase_1.CalculatorBase));
    exports.AbsCalculator = AbsCalculator;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzQ2FsY3VsYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRvcnMvYWJzQ2FsY3VsYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBUUE7UUFBbUMsaUNBQWM7UUFBakQ7WUFBQSxxRUFnRkM7WUE5RUcsUUFBRSxHQUFXLGdCQUFnQixDQUFDO1lBQzlCLGlCQUFXLEdBQVcsb0JBQW9CLENBQUM7WUFDM0MsaUJBQVcsR0FBVyw0QkFBNEIsQ0FBQztZQUUzQyxxQkFBZSxHQUFHLGdCQUFnQixDQUFDOztRQTBFL0MsQ0FBQztRQXhFRzs7Ozs7V0FLRztRQUNJLDJDQUFtQixHQUExQjtZQUNJLElBQUksU0FBUyxHQUFHLElBQUksS0FBSyxFQUF5QixDQUFDO1lBQ25ELDZDQUE2QztZQUM3QyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksNkNBQXFCLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxFQUFFLEVBQUUsSUFBSSxLQUFLLEVBQVUsRUFBRSwrQ0FBK0MsRUFBRSxJQUFJLHVEQUEwQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkwsT0FBTyxTQUFTLENBQUM7UUFDckIsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0ksNENBQW9CLEdBQTNCO1lBQ0ksSUFBSSxVQUFVLEdBQUcsSUFBSSxLQUFLLEVBQXlCLENBQUM7WUFDcEQsOENBQThDO1lBQzlDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSw2Q0FBcUIsQ0FBQyxlQUFlLEVBQUUsVUFBVSxFQUFFLElBQUksS0FBSyxFQUFVLENBQUMsQ0FBQyxDQUFDO1lBQzdGLE9BQU8sVUFBVSxDQUFDO1FBQ3RCLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSCxpQ0FBUyxHQUFULFVBQVUsU0FBa0M7WUFDeEMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBRW5CLElBQUksU0FBUyxHQUFHLElBQUksS0FBSyxFQUFVLENBQUM7WUFDcEMsSUFBSSxVQUFVLEdBQUcsSUFBSSxLQUFLLEVBQXlCLENBQUM7WUFDcEQsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLDZDQUFxQixDQUFDLGVBQWUsRUFBRSxVQUFVLEVBQUUsSUFBSSxLQUFLLEVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDN0YsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLHVDQUF1QztZQUV6RSxJQUFJLGVBQWUsR0FBSSxTQUFTLENBQUMsQ0FBQyxDQUEyQixDQUFDLE9BQU8sRUFBRSxDQUFDO1lBRXhFLDZCQUE2QjtZQUM3QixJQUFHLGVBQWUsSUFBSSxTQUFTLElBQUksZUFBZSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUM7Z0JBQzFELElBQUksQ0FBQyxjQUFjLENBQUMsZ0NBQWUsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO2dCQUNuRixPQUFPLFVBQVUsQ0FBQzthQUNyQjtZQUVELFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBRTVDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDakMsT0FBTyxVQUFVLENBQUM7UUFDdEIsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSyxpQ0FBUyxHQUFqQixVQUFrQixXQUEwQjtZQUN4QyxJQUFJLE1BQU0sR0FBRyxJQUFJLEtBQUssRUFBVSxDQUFDO1lBQ2pDLEtBQUksSUFBSSxDQUFDLEdBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUN0QyxJQUFJLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLGFBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNoQztZQUNELE9BQU8sTUFBTSxDQUFDO1FBQ2xCLENBQUM7UUFDTCxvQkFBQztJQUFELENBQUMsQUFoRkQsQ0FBbUMsK0JBQWMsR0FnRmhEO0lBaEZZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUNhbGN1bGF0b3IgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9jYWxjdWxhdG9ySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElDYWxjdWxhdGlvbkRhdGEgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9jYWxjdWxhdGlvbkRhdGFJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi4vLi4vcG9pbnRcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhUG9pbnRzIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YVBvaW50c1wiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mbyB9IGZyb20gXCIuLi9jYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mb1wiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdG9yQmFzZSwgRXJyb01lc3NhZ2VUeXBlIH0gZnJvbSBcIi4vY2FsY3VsYXRvckJhc2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBBYnNDYWxjdWxhdG9yIGV4dGVuZHMgQ2FsY3VsYXRvckJhc2UgaW1wbGVtZW50cyBJQ2FsY3VsYXRvcntcclxuICAgIFxyXG4gICAgaWQ6IHN0cmluZyA9IFwiYWJzb2x1dGUgdmFsdWVcIjtcclxuICAgIGRpc3BsYXlOYW1lOiBzdHJpbmcgPSBcIkFic29sdXRlIHZhbHVlIHxhfFwiO1xyXG4gICAgZGVzY3JpcHRpb246IHN0cmluZyA9IFwiQWJzb2x1dGUgdmFsdWUgb2YgYSBzaWduYWxcIjtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBpbnB1dFNpZ25hbE5hbWUgPSBcIklucHV0IHNpZ25hbCBhXCI7IFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBpbnB1dCBkYXRhIGZvciB0aGlzIGNhbGN1bGF0b3JcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPn1cclxuICAgICAqIEBtZW1iZXJvZiBBYnNDYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXREZWZhdWx0SW5wdXREYXRhKCk6IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz57XHJcbiAgICAgICAgbGV0IGlucHV0RGF0YSA9IG5ldyBBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+KCk7XHJcbiAgICAgICAgLy8gYWRkIGlucHV0IHBhcmFtcyB3aXRoIGRlZmF1bHQgZGlzcGxheW5hbWVzXHJcbiAgICAgICAgaW5wdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YVBvaW50cyh0aGlzLmlucHV0U2lnbmFsTmFtZSwgXCJcIiwgbmV3IEFycmF5PElQb2ludD4oKSwgXCJUaGUgc2lnbmFsIHdob3NlIGFic29sdXRlIHZhbHVlIGlzIGNhbGN1bGF0ZWRcIiwgbmV3IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvKGZhbHNlLCB0cnVlKSkpO1xyXG4gICAgICAgIHJldHVybiBpbnB1dERhdGE7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBvdXRwdXQgZGF0YSBmb3IgdGhpcyBjYWxjdWxhdG9yXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0FycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz59XHJcbiAgICAgKiBAbWVtYmVyb2YgQWJzQ2FsY3VsYXRvclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0RGVmYXVsdE91dHB1dERhdGEoKTogQXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPntcclxuICAgICAgICBsZXQgb3V0cHV0RGF0YSA9IG5ldyBBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+KCk7XHJcbiAgICAgICAgLy8gYWRkIG91dHB1dCBwYXJhbXMgd2l0aCBkZWZhdWx0IGRpc3BsYXluYW1lc1xyXG4gICAgICAgIG91dHB1dERhdGEucHVzaChuZXcgQ2FsY3VsYXRpb25EYXRhUG9pbnRzKFwiT3V0cHV0IHNpZ25hbFwiLCBcImFic29sdXRlXCIsIG5ldyBBcnJheTxJUG9pbnQ+KCkpKTsgXHJcbiAgICAgICAgcmV0dXJuIG91dHB1dERhdGE7XHJcbiAgICB9XHJcbiAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxjdWxhdGVzIHRoZSBhYnNvbHV0ZSB2YWx1ZSBmb3IgdGhlIGdpdmVuIGlucHV0IGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElDYWxjdWxhdGlvbkRhdGE+fSBpbnB1dERhdGFcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+fVxyXG4gICAgICogQG1lbWJlcm9mIEFic0NhbGN1bGF0b3JcclxuICAgICAqL1xyXG4gICAgY2FsY3VsYXRlKGlucHV0RGF0YTogQXJyYXk8SUNhbGN1bGF0aW9uRGF0YT4pOiBBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+IHtcclxuICAgICAgICB0aGlzLmNsZWFyRXJyb3JzKCk7XHJcblxyXG4gICAgICAgIGxldCByYXdQb2ludHMgPSBuZXcgQXJyYXk8SVBvaW50PigpO1xyXG4gICAgICAgIGxldCBvdXRwdXREYXRhID0gbmV3IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz4oKTtcclxuICAgICAgICBvdXRwdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YVBvaW50cyhcIk91dHB1dCBzaWduYWxcIiwgXCJhYnNvbHV0ZVwiLCBuZXcgQXJyYXk8SVBvaW50PigpKSk7IFxyXG4gICAgICAgIG91dHB1dERhdGFbMF0uc2V0RGF0YShyYXdQb2ludHMpOyAvLyBTZXQgZW1wdHkgcmF3IHBvaW50cyBsaXN0IGJ5IGRlZmF1bHRcclxuXHJcbiAgICAgICAgbGV0IGlucHV0U2lnbmFsRGF0YSA9IChpbnB1dERhdGFbMF0gYXMgQ2FsY3VsYXRpb25EYXRhUG9pbnRzKS5nZXREYXRhKCk7XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGZvciB2YWxpZCBpbnB1dCBkYXRhXHJcbiAgICAgICAgaWYoaW5wdXRTaWduYWxEYXRhID09IHVuZGVmaW5lZCB8fCBpbnB1dFNpZ25hbERhdGEubGVuZ3RoIDwgMil7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JCeVR5cGUoRXJyb01lc3NhZ2VUeXBlLk1pc3NpbmdPckludmFsaWRJbnB1dCwgW3RoaXMuaW5wdXRTaWduYWxOYW1lXSk7XHJcbiAgICAgICAgICAgIHJldHVybiBvdXRwdXREYXRhO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmF3UG9pbnRzID0gdGhpcy5hYnNTaWduYWwoaW5wdXRTaWduYWxEYXRhKTtcclxuICAgICAgICBcclxuICAgICAgICBvdXRwdXREYXRhWzBdLnNldERhdGEocmF3UG9pbnRzKTtcclxuICAgICAgICByZXR1cm4gb3V0cHV0RGF0YTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0ZXMgb3V0cHV0IHNpZ25hbFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElQb2ludD59IGlucHV0U2lnbmFsXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8SVBvaW50Pn1cclxuICAgICAqIEBtZW1iZXJvZiBBYnNDYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWJzU2lnbmFsKGlucHV0U2lnbmFsOiBBcnJheTxJUG9pbnQ+KTogQXJyYXk8SVBvaW50PntcclxuICAgICAgICBsZXQgcG9pbnRzID0gbmV3IEFycmF5PElQb2ludD4oKTtcclxuICAgICAgICBmb3IobGV0IGkgPTA7IGkgPCBpbnB1dFNpZ25hbC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCB4ID0gaW5wdXRTaWduYWxbaV0ueDtcclxuICAgICAgICAgICAgbGV0IHkgPSBNYXRoLmFicyhpbnB1dFNpZ25hbFtpXS55KTtcclxuICAgICAgICAgICAgcG9pbnRzLnB1c2gobmV3IFBvaW50KHgsIHkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBvaW50cztcclxuICAgIH1cclxufSJdfQ==