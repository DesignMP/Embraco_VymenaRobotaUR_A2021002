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
    var ExpCalculator = /** @class */ (function (_super) {
        __extends(ExpCalculator, _super);
        function ExpCalculator() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.id = "exponentiation";
            _this.displayName = "Exponential a" + "\u207F";
            _this.description = "Exponents a signal by a constant value";
            _this.baseName = "Input signal a";
            _this.exponentName = "Constant value n";
            return _this;
        }
        /**
         * Returns the default input data for this calculator
         *
         * @returns {(Array<CalculationDataNumber|CalculationDataPoints>)}
         * @memberof ExpCalculator
         */
        ExpCalculator.prototype.getDefaultInputData = function () {
            var inputData = new Array();
            // add input params with default displaynames
            var exponentDisplayInfo = new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, false);
            exponentDisplayInfo.minValue = 0;
            inputData.push(new calculationDataPoints_1.CalculationDataPoints(this.baseName, "", new Array(), "The base", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            inputData.push(new calculationDataNumber_1.CalculationDataNumber(this.exponentName, 1, "The exponent", exponentDisplayInfo));
            return inputData;
        };
        /**
         * Returns the default output data for this calculator
         *
         * @returns {Array<CalculationDataPoints>}
         * @memberof ExpCalculator
         */
        ExpCalculator.prototype.getDefaultOutputData = function () {
            var outputData = new Array();
            // add output params with default displaynames
            outputData.push(new calculationDataPoints_1.CalculationDataPoints("Output signal", "exp", new Array()));
            return outputData;
        };
        /**
         * Calculates the exponent value for the given input data
         *
         * @param {Array<ICalculationData>} inputData
         * @returns {Array<CalculationDataPoints>}
         * @memberof ExpCalculator
         */
        ExpCalculator.prototype.calculate = function (inputData) {
            this.clearErrors();
            var rawPoints = new Array();
            var outputData = new Array();
            outputData.push(new calculationDataPoints_1.CalculationDataPoints("Output signal", "exp", new Array()));
            outputData[0].setData(rawPoints); // Set empty raw points list by default
            var inputSignalData = inputData[0].getData();
            var inputNumber = inputData[1].getData();
            // Checks for valid input params
            if (inputSignalData == undefined || inputSignalData.length < 2) { // A minimum of two points is needed
                this.addErrorByType(calculatorBase_1.ErroMessageType.MissingOrInvalidInput, [this.baseName]);
            }
            if (inputNumber == undefined || isNaN(inputNumber)) {
                this.addErrorByType(calculatorBase_1.ErroMessageType.MissingOrInvalidInput, [this.exponentName]);
            }
            // Return if errors occurred
            if (this.getErrors().length > 0) {
                return outputData;
            }
            rawPoints = this.exponentSignalWithConstValue(inputSignalData, inputNumber);
            outputData[0].setData(rawPoints);
            return outputData;
        };
        /**
         * Calculates output signal
         *
         * @private
         * @param {Array<IPoint>} inputSignal
         * @param {number} inputNumber
         * @returns {Array<IPoint>}
         * @memberof ExpCalculator
         */
        ExpCalculator.prototype.exponentSignalWithConstValue = function (inputSignal, inputNumber) {
            var points = new Array();
            for (var i = 0; i < inputSignal.length; i++) {
                if (inputNumber < 1 && inputNumber > 0 && inputSignal[i].y < 0) {
                    this.addError("Calculation Error: If exponent is 0<n<1, then each value of the input signal has to be >=0.");
                    return new Array();
                }
                var x = inputSignal[i].x;
                var y = Math.pow(inputSignal[i].y, inputNumber);
                points.push(new point_1.Point(x, y));
            }
            return points;
        };
        return ExpCalculator;
    }(calculatorBase_1.CalculatorBase));
    exports.ExpCalculator = ExpCalculator;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwQ2FsY3VsYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRvcnMvZXhwQ2FsY3VsYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBU0E7UUFBbUMsaUNBQWM7UUFBakQ7WUFBQSxxRUFpR0M7WUEvRkcsUUFBRSxHQUFXLGdCQUFnQixDQUFDO1lBQzlCLGlCQUFXLEdBQVcsZUFBZSxHQUFHLFFBQVEsQ0FBQztZQUNqRCxpQkFBVyxHQUFXLHdDQUF3QyxDQUFDO1lBRXZELGNBQVEsR0FBRyxnQkFBZ0IsQ0FBQztZQUM1QixrQkFBWSxHQUFHLGtCQUFrQixDQUFDOztRQTBGOUMsQ0FBQztRQXhGRzs7Ozs7V0FLRztRQUNJLDJDQUFtQixHQUExQjtZQUNJLElBQUksU0FBUyxHQUFHLElBQUksS0FBSyxFQUErQyxDQUFDO1lBQ3pFLDZDQUE2QztZQUM3QyxJQUFJLG1CQUFtQixHQUFHLElBQUksdURBQTBCLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3ZFLG1CQUFtQixDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7WUFDakMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLDZDQUFxQixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLElBQUksS0FBSyxFQUFVLEVBQUUsVUFBVSxFQUFFLElBQUksdURBQTBCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzSSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksNkNBQXFCLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLEVBQUUsY0FBYyxFQUFFLG1CQUFtQixDQUFDLENBQUMsQ0FBQztZQUNyRyxPQUFPLFNBQVMsQ0FBQztRQUNyQixDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSSw0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TSxDQUFDO1FBQ2xCLENBQUM7UUFDTCxvQkFBQztJQUFELENBQUMsQUFqR0QsQ0FBbUMsK0JBQWMsR0FpR2hEO0lBakdZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUNhbGN1bGF0b3IgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9jYWxjdWxhdG9ySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElDYWxjdWxhdGlvbkRhdGEgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9jYWxjdWxhdGlvbkRhdGFJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi4vLi4vcG9pbnRcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhTnVtYmVyIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YU51bWJlclwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFQb2ludHMgfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhUG9pbnRzXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0b3JCYXNlLCBFcnJvTWVzc2FnZVR5cGUgfSBmcm9tIFwiLi9jYWxjdWxhdG9yQmFzZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEV4cENhbGN1bGF0b3IgZXh0ZW5kcyBDYWxjdWxhdG9yQmFzZSBpbXBsZW1lbnRzIElDYWxjdWxhdG9ye1xyXG4gICAgXHJcbiAgICBpZDogc3RyaW5nID0gXCJleHBvbmVudGlhdGlvblwiO1xyXG4gICAgZGlzcGxheU5hbWU6IHN0cmluZyA9IFwiRXhwb25lbnRpYWwgYVwiICsgXCJcXHUyMDdGXCI7XHJcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nID0gXCJFeHBvbmVudHMgYSBzaWduYWwgYnkgYSBjb25zdGFudCB2YWx1ZVwiO1xyXG5cclxuICAgIHByaXZhdGUgYmFzZU5hbWUgPSBcIklucHV0IHNpZ25hbCBhXCI7XHJcbiAgICBwcml2YXRlIGV4cG9uZW50TmFtZSA9IFwiQ29uc3RhbnQgdmFsdWUgblwiO1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgaW5wdXQgZGF0YSBmb3IgdGhpcyBjYWxjdWxhdG9yXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyhBcnJheTxDYWxjdWxhdGlvbkRhdGFOdW1iZXJ8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPil9XHJcbiAgICAgKiBAbWVtYmVyb2YgRXhwQ2FsY3VsYXRvclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0RGVmYXVsdElucHV0RGF0YSgpOiBBcnJheTxDYWxjdWxhdGlvbkRhdGFOdW1iZXJ8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPntcclxuICAgICAgICBsZXQgaW5wdXREYXRhID0gbmV3IEFycmF5PENhbGN1bGF0aW9uRGF0YU51bWJlcnxDYWxjdWxhdGlvbkRhdGFQb2ludHM+KCk7XHJcbiAgICAgICAgLy8gYWRkIGlucHV0IHBhcmFtcyB3aXRoIGRlZmF1bHQgZGlzcGxheW5hbWVzXHJcbiAgICAgICAgbGV0IGV4cG9uZW50RGlzcGxheUluZm8gPSBuZXcgQ2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm8oZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICBleHBvbmVudERpc3BsYXlJbmZvLm1pblZhbHVlID0gMDtcclxuICAgICAgICBpbnB1dERhdGEucHVzaChuZXcgQ2FsY3VsYXRpb25EYXRhUG9pbnRzKHRoaXMuYmFzZU5hbWUsIFwiXCIsIG5ldyBBcnJheTxJUG9pbnQ+KCksIFwiVGhlIGJhc2VcIiwgbmV3IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvKGZhbHNlLCB0cnVlKSkpO1xyXG4gICAgICAgIGlucHV0RGF0YS5wdXNoKG5ldyBDYWxjdWxhdGlvbkRhdGFOdW1iZXIodGhpcy5leHBvbmVudE5hbWUsIDEsIFwiVGhlIGV4cG9uZW50XCIsIGV4cG9uZW50RGlzcGxheUluZm8pKTtcclxuICAgICAgICByZXR1cm4gaW5wdXREYXRhO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgb3V0cHV0IGRhdGEgZm9yIHRoaXMgY2FsY3VsYXRvclxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+fVxyXG4gICAgICogQG1lbWJlcm9mIEV4cENhbGN1bGF0b3JcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldERlZmF1bHRPdXRwdXREYXRhKCk6IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz57XHJcbiAgICAgICAgbGV0IG91dHB1dERhdGEgPSBuZXcgQXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPigpO1xyXG4gICAgICAgIC8vIGFkZCBvdXRwdXQgcGFyYW1zIHdpdGggZGVmYXVsdCBkaXNwbGF5bmFtZXNcclxuICAgICAgICBvdXRwdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YVBvaW50cyhcIk91dHB1dCBzaWduYWxcIiwgXCJleHBcIiwgbmV3IEFycmF5PElQb2ludD4oKSkpOyBcclxuICAgICAgICByZXR1cm4gb3V0cHV0RGF0YTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0ZXMgdGhlIGV4cG9uZW50IHZhbHVlIGZvciB0aGUgZ2l2ZW4gaW5wdXQgZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SUNhbGN1bGF0aW9uRGF0YT59IGlucHV0RGF0YVxyXG4gICAgICogQHJldHVybnMge0FycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz59XHJcbiAgICAgKiBAbWVtYmVyb2YgRXhwQ2FsY3VsYXRvclxyXG4gICAgICovXHJcbiAgICBjYWxjdWxhdGUoaW5wdXREYXRhOiBBcnJheTxJQ2FsY3VsYXRpb25EYXRhPik6IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz4ge1xyXG4gICAgICAgIHRoaXMuY2xlYXJFcnJvcnMoKTtcclxuXHJcbiAgICAgICAgbGV0IHJhd1BvaW50cyA9IG5ldyBBcnJheTxJUG9pbnQ+KCk7XHJcbiAgICAgICAgbGV0IG91dHB1dERhdGEgPSBuZXcgQXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPigpO1xyXG4gICAgICAgIG91dHB1dERhdGEucHVzaChuZXcgQ2FsY3VsYXRpb25EYXRhUG9pbnRzKFwiT3V0cHV0IHNpZ25hbFwiLCBcImV4cFwiLCBuZXcgQXJyYXk8SVBvaW50PigpKSk7IFxyXG4gICAgICAgIG91dHB1dERhdGFbMF0uc2V0RGF0YShyYXdQb2ludHMpOyAvLyBTZXQgZW1wdHkgcmF3IHBvaW50cyBsaXN0IGJ5IGRlZmF1bHRcclxuXHJcbiAgICAgICAgbGV0IGlucHV0U2lnbmFsRGF0YSA9IChpbnB1dERhdGFbMF0gYXMgQ2FsY3VsYXRpb25EYXRhUG9pbnRzKS5nZXREYXRhKCk7XHJcbiAgICAgICAgbGV0IGlucHV0TnVtYmVyID0gKGlucHV0RGF0YVsxXSBhcyBDYWxjdWxhdGlvbkRhdGFOdW1iZXIpLmdldERhdGEoKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBDaGVja3MgZm9yIHZhbGlkIGlucHV0IHBhcmFtc1xyXG4gICAgICAgIGlmKGlucHV0U2lnbmFsRGF0YSA9PSB1bmRlZmluZWQgfHwgaW5wdXRTaWduYWxEYXRhLmxlbmd0aCA8IDIpeyAvLyBBIG1pbmltdW0gb2YgdHdvIHBvaW50cyBpcyBuZWVkZWRcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvckJ5VHlwZShFcnJvTWVzc2FnZVR5cGUuTWlzc2luZ09ySW52YWxpZElucHV0LCBbdGhpcy5iYXNlTmFtZV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihpbnB1dE51bWJlciA9PSB1bmRlZmluZWQgfHwgaXNOYU4oaW5wdXROdW1iZXIpKXtcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvckJ5VHlwZShFcnJvTWVzc2FnZVR5cGUuTWlzc2luZ09ySW52YWxpZElucHV0LCBbdGhpcy5leHBvbmVudE5hbWVdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJldHVybiBpZiBlcnJvcnMgb2NjdXJyZWRcclxuICAgICAgICBpZih0aGlzLmdldEVycm9ycygpLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICByZXR1cm4gb3V0cHV0RGF0YTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJhd1BvaW50cyA9IHRoaXMuZXhwb25lbnRTaWduYWxXaXRoQ29uc3RWYWx1ZShpbnB1dFNpZ25hbERhdGEsIGlucHV0TnVtYmVyKTtcclxuICAgICAgICBcclxuICAgICAgICBvdXRwdXREYXRhWzBdLnNldERhdGEocmF3UG9pbnRzKTtcclxuICAgICAgICByZXR1cm4gb3V0cHV0RGF0YTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0ZXMgb3V0cHV0IHNpZ25hbFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElQb2ludD59IGlucHV0U2lnbmFsXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5wdXROdW1iZXJcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxJUG9pbnQ+fVxyXG4gICAgICogQG1lbWJlcm9mIEV4cENhbGN1bGF0b3JcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBleHBvbmVudFNpZ25hbFdpdGhDb25zdFZhbHVlKGlucHV0U2lnbmFsOiBBcnJheTxJUG9pbnQ+LCBpbnB1dE51bWJlcjogbnVtYmVyKTogQXJyYXk8SVBvaW50PntcclxuICAgICAgICBsZXQgcG9pbnRzID0gbmV3IEFycmF5PElQb2ludD4oKTtcclxuICAgICAgICBmb3IobGV0IGkgPTA7IGkgPCBpbnB1dFNpZ25hbC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmIChpbnB1dE51bWJlciA8IDEgJiYgaW5wdXROdW1iZXIgPiAwICYmIGlucHV0U2lnbmFsW2ldLnkgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEVycm9yKFwiQ2FsY3VsYXRpb24gRXJyb3I6IElmIGV4cG9uZW50IGlzIDA8bjwxLCB0aGVuIGVhY2ggdmFsdWUgb2YgdGhlIGlucHV0IHNpZ25hbCBoYXMgdG8gYmUgPj0wLlwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQXJyYXk8SVBvaW50PigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCB4ID0gaW5wdXRTaWduYWxbaV0ueDtcclxuICAgICAgICAgICAgbGV0IHkgPSBNYXRoLnBvdyhpbnB1dFNpZ25hbFtpXS55LCBpbnB1dE51bWJlcik7XHJcbiAgICAgICAgICAgIHBvaW50cy5wdXNoKG5ldyBQb2ludCh4LCB5KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwb2ludHM7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4iXX0=