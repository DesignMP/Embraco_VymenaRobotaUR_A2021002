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
    var DiffCalculator = /** @class */ (function (_super) {
        __extends(DiffCalculator, _super);
        function DiffCalculator() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.id = "differentiate";
            _this.displayName = "Differentiate dy/dt";
            _this.description = "Differentiate a signal using the forward difference quotient";
            _this.inputSignalName = "Input signal";
            return _this;
        }
        /**
         * Returns the default input data for this calculator
         *
         * @returns {Array<CalculationDataPoints>}
         * @memberof DiffCalculator
         */
        DiffCalculator.prototype.getDefaultInputData = function () {
            var inputData = new Array();
            // add input params with default displaynames
            inputData.push(new calculationDataPoints_1.CalculationDataPoints(this.inputSignalName, "", new Array(), "The signal whose difference quotient is calculated", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            return inputData;
        };
        /**
         * Returns the default output data for this calculator
         *
         * @returns {Array<CalculationDataPoints>}
         * @memberof DiffCalculator
         */
        DiffCalculator.prototype.getDefaultOutputData = function () {
            var outputData = new Array();
            // add output params with default displaynames
            outputData.push(new calculationDataPoints_1.CalculationDataPoints("Output signal", "gradient", new Array()));
            return outputData;
        };
        /**
         * Calculates the gradient for the given input data
         *
         * @param {Array<ICalculationData>} inputData
         * @returns {Array<CalculationDataPoints>}
         * @memberof DiffCalculator
         */
        DiffCalculator.prototype.calculate = function (inputData) {
            this.clearErrors();
            var rawPoints = new Array();
            var outputData = new Array();
            outputData.push(new calculationDataPoints_1.CalculationDataPoints("Output signal", "gradient", new Array()));
            outputData[0].setData(rawPoints); // Set empty raw points list by default
            var inputSignalData = inputData[0].getData();
            // Check for valid input data
            if (inputSignalData == undefined || inputSignalData.length < 2) {
                this.addErrorByType(calculatorBase_1.ErroMessageType.MissingOrInvalidInput, [this.inputSignalName]);
                return outputData;
            }
            rawPoints = this.diffSignal(inputSignalData);
            outputData[0].setData(rawPoints);
            return outputData;
        };
        /**
         * Calculates output signal
         *
         * @private
         * @param {Array<IPoint>} inputSignal
         * @returns {Array<IPoint>}
         * @memberof DiffCalculator
         */
        DiffCalculator.prototype.diffSignal = function (inputSignal) {
            var points = new Array();
            var dXTemp;
            var dYTemp;
            if (inputSignal.length > 0) {
                var rept = inputSignal[0];
                dXTemp = rept.x;
                dYTemp = rept.y;
            }
            for (var i = 0; i < inputSignal.length - 1; i++) {
                var rept = inputSignal[i + 1];
                var dFact = rept.y - dYTemp;
                var dDiv = rept.x - dXTemp;
                var newYValue = dFact;
                if ((dDiv < -1E-10) || (dDiv > 1E-10)) { //Avoid division by zero}
                    newYValue = dFact / dDiv;
                }
                if (i == 0) {
                    // Add start datapoint to get same points as in input
                    points.push(new point_1.Point(dXTemp, newYValue));
                }
                points.push(new point_1.Point(rept.x, newYValue));
                dXTemp = rept.x;
                dYTemp = rept.y;
            }
            return points;
        };
        return DiffCalculator;
    }(calculatorBase_1.CalculatorBase));
    exports.DiffCalculator = DiffCalculator;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlmZkNhbGN1bGF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9jb21tb24vY2FsY3VsYXRvclByb3ZpZGVyL2NhbGN1bGF0b3JzL2RpZmZDYWxjdWxhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFRQTtRQUFvQyxrQ0FBYztRQUFsRDtZQUFBLHFFQXNHQztZQXBHRyxRQUFFLEdBQVcsZUFBZSxDQUFDO1lBQzdCLGlCQUFXLEdBQVcscUJBQXFCLENBQUM7WUFDNUMsaUJBQVcsR0FBVyw4REFBOEQsQ0FBQztZQUU3RSxxQkFBZSxHQUFHLGNBQWMsQ0FBQzs7UUFnRzdDLENBQUM7UUE5Rkc7Ozs7O1dBS0c7UUFDSSw0Q0FBbUIsR0FBMUI7WUFDSSxJQUFJLFNBQVMsR0FBRyxJQUFJLEtBQUssRUFBeUIsQ0FBQztZQUNuRCw2Q0FBNkM7WUFDN0MsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLDZDQUFxQixDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsRUFBRSxFQUFFLElBQUksS0FBSyxFQUFVLEVBQUUsb0RBQW9ELEVBQUUsSUFBSSx1REFBMEIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVMLE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNJLDZDQUFvQixHQUEzQjtZQUNJLElBQUksVUFBVSxHQUFHLElBQUksS0FBSyxFQUF5QixDQUFDO1lBQ3BELDhDQUE4QztZQUM5QyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksNkNBQXFCLENBQUMsZUFBZSxFQUFFLFVBQVUsRUFBRSxJQUFJLEtBQUssRUFBVSxDQUFDLENBQUMsQ0FBQztZQUM3RixPQUFPLFVBQVUsQ0FBQztRQUN0QixDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0gsa0NBQVMsR0FBVCxVQUFVLFNBQWtDO1lBQ3hDLElBQUks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Y3VsYXRvckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJQ2FsY3VsYXRpb25EYXRhIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvY2FsY3VsYXRpb25EYXRhSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElQb2ludCB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL3BvaW50SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4uLy4uL3BvaW50XCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YVBvaW50cyB9IGZyb20gXCIuLi9jYWxjdWxhdGlvbkRhdGFQb2ludHNcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm8gfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm9cIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRvckJhc2UsIEVycm9NZXNzYWdlVHlwZSB9IGZyb20gXCIuL2NhbGN1bGF0b3JCYXNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRGlmZkNhbGN1bGF0b3IgZXh0ZW5kcyBDYWxjdWxhdG9yQmFzZSBpbXBsZW1lbnRzIElDYWxjdWxhdG9ye1xyXG4gICAgXHJcbiAgICBpZDogc3RyaW5nID0gXCJkaWZmZXJlbnRpYXRlXCI7XHJcbiAgICBkaXNwbGF5TmFtZTogc3RyaW5nID0gXCJEaWZmZXJlbnRpYXRlIGR5L2R0XCI7XHJcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nID0gXCJEaWZmZXJlbnRpYXRlIGEgc2lnbmFsIHVzaW5nIHRoZSBmb3J3YXJkIGRpZmZlcmVuY2UgcXVvdGllbnRcIjtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBpbnB1dFNpZ25hbE5hbWUgPSBcIklucHV0IHNpZ25hbFwiOyBcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgaW5wdXQgZGF0YSBmb3IgdGhpcyBjYWxjdWxhdG9yXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0FycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz59XHJcbiAgICAgKiBAbWVtYmVyb2YgRGlmZkNhbGN1bGF0b3JcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldERlZmF1bHRJbnB1dERhdGEoKTogQXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPntcclxuICAgICAgICBsZXQgaW5wdXREYXRhID0gbmV3IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz4oKTtcclxuICAgICAgICAvLyBhZGQgaW5wdXQgcGFyYW1zIHdpdGggZGVmYXVsdCBkaXNwbGF5bmFtZXNcclxuICAgICAgICBpbnB1dERhdGEucHVzaChuZXcgQ2FsY3VsYXRpb25EYXRhUG9pbnRzKHRoaXMuaW5wdXRTaWduYWxOYW1lLCBcIlwiLCBuZXcgQXJyYXk8SVBvaW50PigpLCBcIlRoZSBzaWduYWwgd2hvc2UgZGlmZmVyZW5jZSBxdW90aWVudCBpcyBjYWxjdWxhdGVkXCIsIG5ldyBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mbyhmYWxzZSwgdHJ1ZSkpKTtcclxuICAgICAgICByZXR1cm4gaW5wdXREYXRhO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgb3V0cHV0IGRhdGEgZm9yIHRoaXMgY2FsY3VsYXRvclxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+fVxyXG4gICAgICogQG1lbWJlcm9mIERpZmZDYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXREZWZhdWx0T3V0cHV0RGF0YSgpOiBBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+e1xyXG4gICAgICAgIGxldCBvdXRwdXREYXRhID0gbmV3IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz4oKTtcclxuICAgICAgICAvLyBhZGQgb3V0cHV0IHBhcmFtcyB3aXRoIGRlZmF1bHQgZGlzcGxheW5hbWVzXHJcbiAgICAgICAgb3V0cHV0RGF0YS5wdXNoKG5ldyBDYWxjdWxhdGlvbkRhdGFQb2ludHMoXCJPdXRwdXQgc2lnbmFsXCIsIFwiZ3JhZGllbnRcIiwgbmV3IEFycmF5PElQb2ludD4oKSkpOyBcclxuICAgICAgICByZXR1cm4gb3V0cHV0RGF0YTtcclxuICAgIH1cclxuICAgXHJcbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0ZXMgdGhlIGdyYWRpZW50IGZvciB0aGUgZ2l2ZW4gaW5wdXQgZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SUNhbGN1bGF0aW9uRGF0YT59IGlucHV0RGF0YVxyXG4gICAgICogQHJldHVybnMge0FycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz59XHJcbiAgICAgKiBAbWVtYmVyb2YgRGlmZkNhbGN1bGF0b3JcclxuICAgICAqL1xyXG4gICAgY2FsY3VsYXRlKGlucHV0RGF0YTogQXJyYXk8SUNhbGN1bGF0aW9uRGF0YT4pOiBBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+IHtcclxuICAgICAgICB0aGlzLmNsZWFyRXJyb3JzKCk7XHJcblxyXG4gICAgICAgIGxldCByYXdQb2ludHMgPSBuZXcgQXJyYXk8SVBvaW50PigpO1xyXG4gICAgICAgIGxldCBvdXRwdXREYXRhID0gbmV3IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz4oKTtcclxuICAgICAgICBvdXRwdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YVBvaW50cyhcIk91dHB1dCBzaWduYWxcIiwgXCJncmFkaWVudFwiLCBuZXcgQXJyYXk8SVBvaW50PigpKSk7IFxyXG4gICAgICAgIG91dHB1dERhdGFbMF0uc2V0RGF0YShyYXdQb2ludHMpOyAvLyBTZXQgZW1wdHkgcmF3IHBvaW50cyBsaXN0IGJ5IGRlZmF1bHRcclxuXHJcbiAgICAgICAgbGV0IGlucHV0U2lnbmFsRGF0YSA9IChpbnB1dERhdGFbMF0gYXMgQ2FsY3VsYXRpb25EYXRhUG9pbnRzKS5nZXREYXRhKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gQ2hlY2sgZm9yIHZhbGlkIGlucHV0IGRhdGFcclxuICAgICAgICBpZihpbnB1dFNpZ25hbERhdGEgPT0gdW5kZWZpbmVkIHx8IGlucHV0U2lnbmFsRGF0YS5sZW5ndGggPCAyKXtcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvckJ5VHlwZShFcnJvTWVzc2FnZVR5cGUuTWlzc2luZ09ySW52YWxpZElucHV0LCBbdGhpcy5pbnB1dFNpZ25hbE5hbWVdKTtcclxuICAgICAgICAgICAgcmV0dXJuIG91dHB1dERhdGE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByYXdQb2ludHMgPSB0aGlzLmRpZmZTaWduYWwoaW5wdXRTaWduYWxEYXRhKTtcclxuICAgICAgICBcclxuICAgICAgICBvdXRwdXREYXRhWzBdLnNldERhdGEocmF3UG9pbnRzKTtcclxuICAgICAgICByZXR1cm4gb3V0cHV0RGF0YTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0ZXMgb3V0cHV0IHNpZ25hbFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElQb2ludD59IGlucHV0U2lnbmFsXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8SVBvaW50Pn1cclxuICAgICAqIEBtZW1iZXJvZiBEaWZmQ2FsY3VsYXRvclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRpZmZTaWduYWwoaW5wdXRTaWduYWw6IEFycmF5PElQb2ludD4pOiBBcnJheTxJUG9pbnQ+e1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBwb2ludHMgPSBuZXcgQXJyYXk8SVBvaW50PigpO1xyXG4gICAgICAgIGxldCBkWFRlbXA7XHJcbiAgICAgICAgbGV0IGRZVGVtcDtcclxuICAgICAgICBpZihpbnB1dFNpZ25hbC5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgbGV0IHJlcHQgPSBpbnB1dFNpZ25hbFswXTtcclxuICAgICAgICAgICAgZFhUZW1wID0gcmVwdC54O1xyXG4gICAgICAgICAgICBkWVRlbXAgPSByZXB0Lnk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBpbnB1dFNpZ25hbC5sZW5ndGgtMTsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IHJlcHQgPSBpbnB1dFNpZ25hbFtpKzFdO1xyXG5cclxuICAgICAgICAgICAgbGV0IGRGYWN0ID0gcmVwdC55IC0gZFlUZW1wO1xyXG4gICAgICAgICAgICBsZXQgZERpdiA9IHJlcHQueCAtIGRYVGVtcDtcdFxyXG4gICAgICAgICAgICBsZXQgbmV3WVZhbHVlID0gZEZhY3Q7XHJcbiAgICAgICAgICAgIGlmKChkRGl2IDwgLTFFLTEwKSB8fCAoZERpdiA+IDFFLTEwKSl7IC8vQXZvaWQgZGl2aXNpb24gYnkgemVyb31cclxuICAgICAgICAgICAgICAgIG5ld1lWYWx1ZSA9IGRGYWN0IC8gZERpdjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihpID09IDApe1xyXG4gICAgICAgICAgICAgICAgLy8gQWRkIHN0YXJ0IGRhdGFwb2ludCB0byBnZXQgc2FtZSBwb2ludHMgYXMgaW4gaW5wdXRcclxuICAgICAgICAgICAgICAgIHBvaW50cy5wdXNoKG5ldyBQb2ludChkWFRlbXAsIG5ld1lWYWx1ZSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHBvaW50cy5wdXNoKG5ldyBQb2ludChyZXB0LngsIG5ld1lWYWx1ZSkpO1xyXG5cclxuXHRcdFx0ZFhUZW1wID0gcmVwdC54O1xyXG4gICAgICAgICAgICBkWVRlbXAgPSByZXB0Lnk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwb2ludHM7XHJcbiAgICB9XHJcbn0iXX0=