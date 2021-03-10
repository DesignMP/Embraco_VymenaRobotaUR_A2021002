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
    var CosCalculator = /** @class */ (function (_super) {
        __extends(CosCalculator, _super);
        function CosCalculator() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.id = "cos";
            _this.displayName = "Cos(a)";
            _this.description = "Calculates the cosine value of a signal";
            _this.inputSignalName = "Input signal a";
            return _this;
        }
        /**
         * Returns the default input data for this calculator
         *
         * @returns {Array<CalculationDataPoints>}
         * @memberof CosCalculator
         */
        CosCalculator.prototype.getDefaultInputData = function () {
            var inputData = new Array();
            // add input params with default displaynames
            inputData.push(new calculationDataPoints_1.CalculationDataPoints(this.inputSignalName, "", new Array(), "The signal whose cosine value is calculated", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            return inputData;
        };
        /**
         * Returns the default output data for this calculator
         *
         * @returns {Array<CalculationDataPoints>}
         * @memberof CosCalculator
         */
        CosCalculator.prototype.getDefaultOutputData = function () {
            var outputData = new Array();
            // add output params with default displaynames
            outputData.push(new calculationDataPoints_1.CalculationDataPoints("Output signal", "cos", new Array()));
            return outputData;
        };
        /**
         * Calculates the sine value for the given input data
         *
         * @param {Array<ICalculationData>} inputData
         * @returns {Array<CalculationDataPoints>}
         * @memberof CosCalculator
         */
        CosCalculator.prototype.calculate = function (inputData) {
            this.clearErrors();
            var rawPoints = new Array();
            var outputData = new Array();
            outputData.push(new calculationDataPoints_1.CalculationDataPoints("Output signal", "cos", new Array()));
            outputData[0].setData(rawPoints); // Set empty raw points list by default
            var inputSignalData = inputData[0].getData();
            // Check for valid input data
            if (inputSignalData == undefined || inputSignalData.length < 2) {
                this.addErrorByType(calculatorBase_1.ErroMessageType.MissingOrInvalidInput, [this.inputSignalName]);
                return outputData;
            }
            rawPoints = this.cosSignal(inputSignalData);
            outputData[0].setData(rawPoints);
            return outputData;
        };
        /**
         * Calculates output signal
         *
         * @private
         * @param {Array<IPoint>} inputSignal
         * @returns {Array<IPoint>}
         * @memberof CosCalculator
         */
        CosCalculator.prototype.cosSignal = function (inputSignal) {
            var points = new Array();
            for (var i = 0; i < inputSignal.length; i++) {
                var x = inputSignal[i].x;
                var y = Math.cos(inputSignal[i].y);
                points.push(new point_1.Point(x, y));
            }
            return points;
        };
        return CosCalculator;
    }(calculatorBase_1.CalculatorBase));
    exports.CosCalculator = CosCalculator;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29zQ2FsY3VsYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRvcnMvY29zQ2FsY3VsYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBUUE7UUFBbUMsaUNBQWM7UUFBakQ7WUFBQSxxRUFnRkM7WUE5RUcsUUFBRSxHQUFXLEtBQUssQ0FBQztZQUNuQixpQkFBVyxHQUFXLFFBQVEsQ0FBQztZQUMvQixpQkFBVyxHQUFXLHlDQUF5QyxDQUFDO1lBRXhELHFCQUFlLEdBQUcsZ0JBQWdCLENBQUM7O1FBMEUvQyxDQUFDO1FBeEVHOzs7OztXQUtHO1FBQ0ksMkNBQW1CLEdBQTFCO1lBQ0ksSUFBSSxTQUFTLEdBQUcsSUFBSSxLQUFLLEVBQXlCLENBQUM7WUFDbkQsNkNBQTZDO1lBQzdDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSw2Q0FBcUIsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLEVBQUUsRUFBRSxJQUFJLEtBQUssRUFBVSxFQUFFLDZDQUE2QyxFQUFFLElBQUksdURBQTBCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyTCxPQUFPLFNBQVMsQ0FBQztRQUNyQixDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSSw0Q0FBb0IsR0FBM0I7WUFDSSxJQUFJLFVBQVUsR0FBRyxJQUFJLEtBQUssRUFBeUIsQ0FBQztZQUNwRCw4Q0FBOEM7WUFDOUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLDZDQUFxQixDQUFDLGVBQWUsRUFBRSxLQUFLLEVBQUUsSUFBSSxLQUFLLEVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDeEYsT0FBTyxVQUFVLENBQUM7UUFDdEIsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNILGlDQUFTLEdBQVQsVUFBVSxTQUFrQztZQUN4QyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFFbkIsSUFBSSxTQUFTLEdBQUcsSUFBSSxLQUFLLEVBQVUsQ0FBQztZQUNwQyxJQUFJLFVBQVUsR0FBRyxJQUFJLEtBQUssRUFBeUIsQ0FBQztZQUNwRCxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksNkNBQXFCLENBQUMsZUFBZSxFQUFFLEtBQUssRUFBRSxJQUFJLEtBQUssRUFBVSxDQUFDLENBQUMsQ0FBQztZQUN4RixVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsdUNBQXVDO1lBRXpFLElBQUksZUFBZSxHQUFJLFNBQVMsQ0FBQyxDQUFDLENBQTJCLENBQUMsT0FBTyxFQUFFLENBQUM7WUFFeEUsNkJBQTZCO1lBQzdCLElBQUcsZUFBZSxJQUFJLFNBQVMsSUFBSSxlQUFlLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQztnQkFDMUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxnQ0FBZSxDQUFDLHFCQUFxQixFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7Z0JBQ25GLE9BQU8sVUFBVSxDQUFDO2FBQ3JCO1lBRUQsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLENBQUM7WUFFNUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNqQyxPQUFPLFVBQVUsQ0FBQztRQUN0QixDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNLLGlDQUFTLEdBQWpCLFVBQWtCLFdBQTBCO1lBQ3hDLElBQUksTUFBTSxHQUFHLElBQUksS0FBSyxFQUFVLENBQUM7WUFDakMsS0FBSSxJQUFJLENBQUMsR0FBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQ3RDLElBQUksQ0FBQyxHQUFVLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksYUFBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2hDO1lBQ0QsT0FBTyxNQUFNLENBQUM7UUFDbEIsQ0FBQztRQUNMLG9CQUFDO0lBQUQsQ0FBQyxBQWhGRCxDQUFtQywrQkFBYyxHQWdGaEQ7SUFoRlksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ2FsY3VsYXRvciB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2NhbGN1bGF0b3JJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSUNhbGN1bGF0aW9uRGF0YSB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2NhbGN1bGF0aW9uRGF0YUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9wb2ludEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuLi8uLi9wb2ludFwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFQb2ludHMgfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhUG9pbnRzXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0b3JCYXNlLCBFcnJvTWVzc2FnZVR5cGUgfSBmcm9tIFwiLi9jYWxjdWxhdG9yQmFzZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvc0NhbGN1bGF0b3IgZXh0ZW5kcyBDYWxjdWxhdG9yQmFzZSBpbXBsZW1lbnRzIElDYWxjdWxhdG9ye1xyXG4gICAgXHJcbiAgICBpZDogc3RyaW5nID0gXCJjb3NcIjtcclxuICAgIGRpc3BsYXlOYW1lOiBzdHJpbmcgPSBcIkNvcyhhKVwiO1xyXG4gICAgZGVzY3JpcHRpb246IHN0cmluZyA9IFwiQ2FsY3VsYXRlcyB0aGUgY29zaW5lIHZhbHVlIG9mIGEgc2lnbmFsXCI7XHJcbiAgICBcclxuICAgIHByaXZhdGUgaW5wdXRTaWduYWxOYW1lID0gXCJJbnB1dCBzaWduYWwgYVwiOyBcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgaW5wdXQgZGF0YSBmb3IgdGhpcyBjYWxjdWxhdG9yXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0FycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29zQ2FsY3VsYXRvclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0RGVmYXVsdElucHV0RGF0YSgpOiBBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+e1xyXG4gICAgICAgIGxldCBpbnB1dERhdGEgPSBuZXcgQXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPigpO1xyXG4gICAgICAgIC8vIGFkZCBpbnB1dCBwYXJhbXMgd2l0aCBkZWZhdWx0IGRpc3BsYXluYW1lc1xyXG4gICAgICAgIGlucHV0RGF0YS5wdXNoKG5ldyBDYWxjdWxhdGlvbkRhdGFQb2ludHModGhpcy5pbnB1dFNpZ25hbE5hbWUsIFwiXCIsIG5ldyBBcnJheTxJUG9pbnQ+KCksIFwiVGhlIHNpZ25hbCB3aG9zZSBjb3NpbmUgdmFsdWUgaXMgY2FsY3VsYXRlZFwiLCBuZXcgQ2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm8oZmFsc2UsIHRydWUpKSk7XHJcbiAgICAgICAgcmV0dXJuIGlucHV0RGF0YTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IG91dHB1dCBkYXRhIGZvciB0aGlzIGNhbGN1bGF0b3JcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPn1cclxuICAgICAqIEBtZW1iZXJvZiBDb3NDYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXREZWZhdWx0T3V0cHV0RGF0YSgpOiBBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+e1xyXG4gICAgICAgIGxldCBvdXRwdXREYXRhID0gbmV3IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz4oKTtcclxuICAgICAgICAvLyBhZGQgb3V0cHV0IHBhcmFtcyB3aXRoIGRlZmF1bHQgZGlzcGxheW5hbWVzXHJcbiAgICAgICAgb3V0cHV0RGF0YS5wdXNoKG5ldyBDYWxjdWxhdGlvbkRhdGFQb2ludHMoXCJPdXRwdXQgc2lnbmFsXCIsIFwiY29zXCIsIG5ldyBBcnJheTxJUG9pbnQ+KCkpKTsgXHJcbiAgICAgICAgcmV0dXJuIG91dHB1dERhdGE7XHJcbiAgICB9XHJcbiAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxjdWxhdGVzIHRoZSBzaW5lIHZhbHVlIGZvciB0aGUgZ2l2ZW4gaW5wdXQgZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SUNhbGN1bGF0aW9uRGF0YT59IGlucHV0RGF0YVxyXG4gICAgICogQHJldHVybnMge0FycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29zQ2FsY3VsYXRvclxyXG4gICAgICovXHJcbiAgICBjYWxjdWxhdGUoaW5wdXREYXRhOiBBcnJheTxJQ2FsY3VsYXRpb25EYXRhPik6IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz4ge1xyXG4gICAgICAgIHRoaXMuY2xlYXJFcnJvcnMoKTtcclxuXHJcbiAgICAgICAgbGV0IHJhd1BvaW50cyA9IG5ldyBBcnJheTxJUG9pbnQ+KCk7XHJcbiAgICAgICAgbGV0IG91dHB1dERhdGEgPSBuZXcgQXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPigpO1xyXG4gICAgICAgIG91dHB1dERhdGEucHVzaChuZXcgQ2FsY3VsYXRpb25EYXRhUG9pbnRzKFwiT3V0cHV0IHNpZ25hbFwiLCBcImNvc1wiLCBuZXcgQXJyYXk8SVBvaW50PigpKSk7IFxyXG4gICAgICAgIG91dHB1dERhdGFbMF0uc2V0RGF0YShyYXdQb2ludHMpOyAvLyBTZXQgZW1wdHkgcmF3IHBvaW50cyBsaXN0IGJ5IGRlZmF1bHRcclxuXHJcbiAgICAgICAgbGV0IGlucHV0U2lnbmFsRGF0YSA9IChpbnB1dERhdGFbMF0gYXMgQ2FsY3VsYXRpb25EYXRhUG9pbnRzKS5nZXREYXRhKCk7XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGZvciB2YWxpZCBpbnB1dCBkYXRhXHJcbiAgICAgICAgaWYoaW5wdXRTaWduYWxEYXRhID09IHVuZGVmaW5lZCB8fCBpbnB1dFNpZ25hbERhdGEubGVuZ3RoIDwgMil7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JCeVR5cGUoRXJyb01lc3NhZ2VUeXBlLk1pc3NpbmdPckludmFsaWRJbnB1dCwgW3RoaXMuaW5wdXRTaWduYWxOYW1lXSk7XHJcbiAgICAgICAgICAgIHJldHVybiBvdXRwdXREYXRhO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmF3UG9pbnRzID0gdGhpcy5jb3NTaWduYWwoaW5wdXRTaWduYWxEYXRhKTtcclxuICAgICAgICBcclxuICAgICAgICBvdXRwdXREYXRhWzBdLnNldERhdGEocmF3UG9pbnRzKTtcclxuICAgICAgICByZXR1cm4gb3V0cHV0RGF0YTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0ZXMgb3V0cHV0IHNpZ25hbFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElQb2ludD59IGlucHV0U2lnbmFsXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8SVBvaW50Pn1cclxuICAgICAqIEBtZW1iZXJvZiBDb3NDYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29zU2lnbmFsKGlucHV0U2lnbmFsOiBBcnJheTxJUG9pbnQ+KTogQXJyYXk8SVBvaW50PntcclxuICAgICAgICBsZXQgcG9pbnRzID0gbmV3IEFycmF5PElQb2ludD4oKTtcclxuICAgICAgICBmb3IobGV0IGkgPTA7IGkgPCBpbnB1dFNpZ25hbC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCB4Om51bWJlciA9IGlucHV0U2lnbmFsW2ldLng7XHJcbiAgICAgICAgICAgIGxldCB5ID0gTWF0aC5jb3MoaW5wdXRTaWduYWxbaV0ueSk7XHJcbiAgICAgICAgICAgIHBvaW50cy5wdXNoKG5ldyBQb2ludCh4LCB5KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwb2ludHM7XHJcbiAgICB9XHJcbn0iXX0=