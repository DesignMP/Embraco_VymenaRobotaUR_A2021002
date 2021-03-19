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
define(["require", "exports", "../../point", "../calculationDataPoints", "../calculationDataDisplayInfo", "./calculatorBase", "./calculatorHelper", "./differential/diffVector"], function (require, exports, point_1, calculationDataPoints_1, calculationDataDisplayInfo_1, calculatorBase_1, calculatorHelper_1, diffVector_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DiffCalculator = /** @class */ (function (_super) {
        __extends(DiffCalculator, _super);
        function DiffCalculator() {
            var _this = _super.call(this, "differentiate", "Differentiate dy/dt", "Differentiate a signal using the forward difference quotient") || this;
            _this.inputName = "Input signal";
            _this.outputName = "Output signal";
            _this.outputValue = "gradient";
            return _this;
        }
        DiffCalculator.prototype.getDefaultInputData = function () {
            var defaultInputData = _super.prototype.getDefaultInputData.call(this);
            defaultInputData.push(new calculationDataPoints_1.CalculationDataPoints(this.inputName, "", new Array(), "The signal whose difference quotient is calculated", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            return defaultInputData;
        };
        DiffCalculator.prototype.getDefaultOutputData = function () {
            var defaultOutputData = _super.prototype.getDefaultOutputData.call(this);
            defaultOutputData.push(new calculationDataPoints_1.CalculationDataPoints(this.outputName, this.outputValue, new Array()));
            return defaultOutputData;
        };
        DiffCalculator.prototype.verifyCalculationInputData = function () {
            _super.prototype.verifyCalculationInputData.call(this);
            var calculationInputDataContainer = this.getCalculationInputDataContainer();
            var inputSignal = calculationInputDataContainer[0];
            if (inputSignal == undefined || !calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(inputSignal.data)) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.MissingOrInvalidInput, [this.inputName]);
            }
        };
        DiffCalculator.prototype.executeAlgorithm = function () {
            _super.prototype.executeAlgorithm.call(this);
            var calculationInputDataContainer = this.getCalculationInputDataContainer();
            var result = new Array();
            var inputSignal = calculationInputDataContainer[0];
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(inputSignal.data)) {
                result = this.diffSignal(inputSignal.data);
            }
            this.addCalculationOutputData({
                data: result,
                value: this.outputValue,
                name: this.outputName
            });
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
            var inputSignalX = new Array();
            var inputSignalY = new Array();
            for (var i = 0; i < inputSignal.length; i++) {
                inputSignalX.push(inputSignal[i].x);
                inputSignalY.push(inputSignal[i].y);
            }
            var diffResult = diffVector_1.DiffVector.diffCalculate(inputSignalX, inputSignalY);
            if (diffResult.length == inputSignalX.length) {
                for (var i = 0; i < diffResult.length; i++) {
                    points.push(new point_1.Point(inputSignalX[i], diffResult[i]));
                }
            }
            return points;
        };
        return DiffCalculator;
    }(calculatorBase_1.CalculatorBase));
    exports.DiffCalculator = DiffCalculator;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlmZkNhbGN1bGF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9jb21tb24vY2FsY3VsYXRvclByb3ZpZGVyL2NhbGN1bGF0b3JzL2RpZmZDYWxjdWxhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFTQTtRQUFvQyxrQ0FBYztRQU05QztZQUFBLFlBQ0ksa0JBQU0sZUFBZSxFQUFFLHFCQUFxQixFQUFFLDhEQUE4RCxDQUFDLFNBQ2hIO1lBTk8sZUFBUyxHQUFHLGNBQWMsQ0FBQztZQUMzQixnQkFBVSxHQUFHLGVBQWUsQ0FBQztZQUM3QixpQkFBVyxHQUFHLFVBQVUsQ0FBQzs7UUFJakMsQ0FBQztRQUVNLDRDQUFtQixHQUExQjtZQUNJLElBQUksZ0JBQWdCLEdBQUcsaUJBQU0sbUJBQW1CLFdBQUUsQ0FBQztZQUVuRCxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSw2Q0FBcUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUUsRUFBRSxJQUFJLEtBQUssRUFBVSxFQUFFLG9EQUFvRCxFQUFFLElBQUksdURBQTBCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUU3TCxPQUFPLGdCQUFnQixDQUFDO1FBQzVCLENBQUM7UUFFTSw2Q0FBb0IsR0FBM0I7WUFDSSxJQUFJLGlCQUFpQixHQUFHLGlCQUFNLG9CQUFvQixXQUFFLENBQUM7WUFFckQsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksNkNBQXFCLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksS0FBSyxFQUFVLENBQUMsQ0FBQyxDQUFDO1lBRTFHLE9BQU8saUJBQWlCLENBQUM7UUFDN0IsQ0FBQztRQUVTLG1EQUEwQixHQUFwQztZQUNJLGlCQUFNLDBCQUEwQixXQUFFLENBQUM7WUFFbkMsSUFBSSw2QkFBNkIsR0FBRyxJQUFJLENBQUMsZ0NBQWdDLEVBQUUsQ0FBQztZQUU1RSxJQUFJLFdBQVcsR0FBRyw2QkFBNkIsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVuRCxJQUFHLFdBQVcsSUFBSSxTQUFTLElBQUksQ0FBQyxtQ0FBZ0IsQ0FBQyw0QkFBNEIsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQzdGLElBQUksQ0FBQyxjQUFjLENBQUMsaUNBQWdCLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzthQUNqRjtRQUNMLENBQUM7UUFFUyx5Q0FBZ0IsR0FBMUI7WUFDSSxpQkFBTSxnQkFBZ0IsV0FBRSxDQUFDO1lBRXpCLElBQUksNkJBQTZCLEdBQUcsSUFBSSxDQUFDLGdDQUFnQyxFQUFFLENBQUM7WUFDNUUsSUFBSSxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQVUsQ0FBQztZQUVqQyxJQUFJLFdBQVcsR0FBRyw2QkFBNkIsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVuRCxJQUFHLG1DQUFnQixDQUFDLDRCQUE0QixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDaEUsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzlDO1lBRUQsSUFBSSxDQUFDLHdCQUF3QixDQUFDO2dCQUMxQixJQUFJLEVBQUUsTUFBTTtnQkFDWixLQUFLLEVBQUUsSUFBSSxDQUFDLFdBQVc7Z0JBQ3ZCLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVTthQUN4QixDQUFDLENBQUM7UUFDUCxDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNLLG1DQUFVLEdBQWxCLFVBQW1CLFdBQTBCO1lBRXpDLElBQUksTUFBTSxHQUFHLElBQUksS0FBSyxFQUFVLENBQUM7WUFFakMsSUFBSSxZQUFZLEdBQWEsSUFBSSxLQUFLLEVBQVUsQ0FBQztZQUNqRCxJQUFJLFlBQVksR0FBYSxJQUFJLEtBQUssRUFBVSxDQUFDO1lBRWpELEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUNyQyxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEMsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDdkM7WUFFRCxJQUFJLFVBQVUsR0FBa0IsdUJBQVUsQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO1lBRXJGLElBQUcsVUFBVSxDQUFDLE1BQU0sSUFBSSxZQUFZLENBQUMsTUFBTSxFQUFDO2dCQUN4QyxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztvQkFDdEMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLGFBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDMUQ7YUFDSjtZQUVELE9BQU8sTUFBTSxDQUFDO1FBQ2xCLENBQUM7UUFDTCxxQkFBQztJQUFELENBQUMsQUF2RkQsQ0FBb0MsK0JBQWMsR0F1RmpEO0lBdkZZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVBvaW50IH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi4vLi4vcG9pbnRcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhUG9pbnRzIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YVBvaW50c1wiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mbyB9IGZyb20gXCIuLi9jYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mb1wiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdG9yQmFzZSwgRXJyb3JNZXNzYWdlVHlwZSB9IGZyb20gXCIuL2NhbGN1bGF0b3JCYXNlXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0b3JIZWxwZXIgfSBmcm9tIFwiLi9jYWxjdWxhdG9ySGVscGVyXCI7XHJcbmltcG9ydCB7IFRDYWxjdWxhdGlvbkRhdGEgfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhXCI7XHJcbmltcG9ydCB7IERpZmZWZWN0b3IgfSBmcm9tIFwiLi9kaWZmZXJlbnRpYWwvZGlmZlZlY3RvclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIERpZmZDYWxjdWxhdG9yIGV4dGVuZHMgQ2FsY3VsYXRvckJhc2Uge1xyXG4gICAgXHJcbiAgICBwcml2YXRlIGlucHV0TmFtZSA9IFwiSW5wdXQgc2lnbmFsXCI7IFxyXG4gICAgcHJpdmF0ZSBvdXRwdXROYW1lID0gXCJPdXRwdXQgc2lnbmFsXCI7XHJcbiAgICBwcml2YXRlIG91dHB1dFZhbHVlID0gXCJncmFkaWVudFwiO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihcImRpZmZlcmVudGlhdGVcIiwgXCJEaWZmZXJlbnRpYXRlIGR5L2R0XCIsIFwiRGlmZmVyZW50aWF0ZSBhIHNpZ25hbCB1c2luZyB0aGUgZm9yd2FyZCBkaWZmZXJlbmNlIHF1b3RpZW50XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXREZWZhdWx0SW5wdXREYXRhKCk6IEFycmF5PFRDYWxjdWxhdGlvbkRhdGE+IHtcclxuICAgICAgICBsZXQgZGVmYXVsdElucHV0RGF0YSA9IHN1cGVyLmdldERlZmF1bHRJbnB1dERhdGEoKTtcclxuXHJcbiAgICAgICAgZGVmYXVsdElucHV0RGF0YS5wdXNoKG5ldyBDYWxjdWxhdGlvbkRhdGFQb2ludHModGhpcy5pbnB1dE5hbWUsIFwiXCIsIG5ldyBBcnJheTxJUG9pbnQ+KCksIFwiVGhlIHNpZ25hbCB3aG9zZSBkaWZmZXJlbmNlIHF1b3RpZW50IGlzIGNhbGN1bGF0ZWRcIiwgbmV3IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvKGZhbHNlLCB0cnVlKSkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBkZWZhdWx0SW5wdXREYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXREZWZhdWx0T3V0cHV0RGF0YSgpOiBBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+IHtcclxuICAgICAgICBsZXQgZGVmYXVsdE91dHB1dERhdGEgPSBzdXBlci5nZXREZWZhdWx0T3V0cHV0RGF0YSgpO1xyXG5cclxuICAgICAgICBkZWZhdWx0T3V0cHV0RGF0YS5wdXNoKG5ldyBDYWxjdWxhdGlvbkRhdGFQb2ludHModGhpcy5vdXRwdXROYW1lLCB0aGlzLm91dHB1dFZhbHVlLCBuZXcgQXJyYXk8SVBvaW50PigpKSk7IFxyXG5cclxuICAgICAgICByZXR1cm4gZGVmYXVsdE91dHB1dERhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHZlcmlmeUNhbGN1bGF0aW9uSW5wdXREYXRhKCkge1xyXG4gICAgICAgIHN1cGVyLnZlcmlmeUNhbGN1bGF0aW9uSW5wdXREYXRhKCk7XHJcblxyXG4gICAgICAgIGxldCBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lciA9IHRoaXMuZ2V0Q2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXIoKTtcclxuXHJcbiAgICAgICAgbGV0IGlucHV0U2lnbmFsID0gY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXJbMF07XHJcblxyXG4gICAgICAgIGlmKGlucHV0U2lnbmFsID09IHVuZGVmaW5lZCB8fCAhQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU2lnbmFsKGlucHV0U2lnbmFsLmRhdGEpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JCeVR5cGUoRXJyb3JNZXNzYWdlVHlwZS5NaXNzaW5nT3JJbnZhbGlkSW5wdXQsIFt0aGlzLmlucHV0TmFtZV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZXhlY3V0ZUFsZ29yaXRobSgpIHtcclxuICAgICAgICBzdXBlci5leGVjdXRlQWxnb3JpdGhtKCk7XHJcblxyXG4gICAgICAgIGxldCBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lciA9IHRoaXMuZ2V0Q2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXIoKTtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IEFycmF5PElQb2ludD4oKTtcclxuXHJcbiAgICAgICAgbGV0IGlucHV0U2lnbmFsID0gY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXJbMF07XHJcblxyXG4gICAgICAgIGlmKENhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc1NpZ25hbChpbnB1dFNpZ25hbC5kYXRhKSkge1xyXG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLmRpZmZTaWduYWwoaW5wdXRTaWduYWwuZGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmFkZENhbGN1bGF0aW9uT3V0cHV0RGF0YSh7XHJcbiAgICAgICAgICAgIGRhdGE6IHJlc3VsdCxcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMub3V0cHV0VmFsdWUsXHJcbiAgICAgICAgICAgIG5hbWU6IHRoaXMub3V0cHV0TmFtZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsY3VsYXRlcyBvdXRwdXQgc2lnbmFsXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SVBvaW50Pn0gaW5wdXRTaWduYWxcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxJUG9pbnQ+fVxyXG4gICAgICogQG1lbWJlcm9mIERpZmZDYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZGlmZlNpZ25hbChpbnB1dFNpZ25hbDogQXJyYXk8SVBvaW50Pik6IEFycmF5PElQb2ludD4ge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBwb2ludHMgPSBuZXcgQXJyYXk8SVBvaW50PigpO1xyXG5cclxuICAgICAgICBsZXQgaW5wdXRTaWduYWxYOiBudW1iZXJbXSA9IG5ldyBBcnJheTxudW1iZXI+KCk7XHJcbiAgICAgICAgbGV0IGlucHV0U2lnbmFsWTogbnVtYmVyW10gPSBuZXcgQXJyYXk8bnVtYmVyPigpO1xyXG5cclxuICAgICAgICBmb3IobGV0IGk9MDsgaSA8IGlucHV0U2lnbmFsLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaW5wdXRTaWduYWxYLnB1c2goaW5wdXRTaWduYWxbaV0ueCk7XHJcbiAgICAgICAgICAgIGlucHV0U2lnbmFsWS5wdXNoKGlucHV0U2lnbmFsW2ldLnkpO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGRpZmZSZXN1bHQ6IEFycmF5PG51bWJlcj4gPSBEaWZmVmVjdG9yLmRpZmZDYWxjdWxhdGUoaW5wdXRTaWduYWxYLCBpbnB1dFNpZ25hbFkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKGRpZmZSZXN1bHQubGVuZ3RoID09IGlucHV0U2lnbmFsWC5sZW5ndGgpe1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZGlmZlJlc3VsdC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBwb2ludHMucHVzaChuZXcgUG9pbnQoaW5wdXRTaWduYWxYW2ldLCBkaWZmUmVzdWx0W2ldKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICBcclxuICAgICAgICByZXR1cm4gcG9pbnRzO1xyXG4gICAgfVxyXG59Il19