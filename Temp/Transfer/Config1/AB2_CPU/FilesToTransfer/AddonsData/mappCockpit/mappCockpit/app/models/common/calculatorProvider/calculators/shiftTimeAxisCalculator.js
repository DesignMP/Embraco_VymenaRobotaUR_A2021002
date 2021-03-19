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
define(["require", "exports", "./calculatorBase", "../calculationDataNumber", "../calculationDataPoints", "../calculationDataDisplayInfo", "./calculatorHelper", "../../point"], function (require, exports, calculatorBase_1, calculationDataNumber_1, calculationDataPoints_1, calculationDataDisplayInfo_1, calculatorHelper_1, point_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ShiftTimeAxisCalculator = /** @class */ (function (_super) {
        __extends(ShiftTimeAxisCalculator, _super);
        function ShiftTimeAxisCalculator() {
            var _this = _super.call(this, "shift time axis", "Shift time axis", "Shifts a signal on the time axis by the defined delay time") || this;
            _this.inputName1 = "Input signal a";
            _this.inputName2 = "Delay time b [s]";
            _this.outputName = "Output signal";
            _this.outputValue = "shift time axis";
            return _this;
        }
        ShiftTimeAxisCalculator.prototype.getDefaultInputData = function () {
            var defaultInputData = _super.prototype.getDefaultInputData.call(this);
            defaultInputData.push(new calculationDataPoints_1.CalculationDataPoints(this.inputName1, "", new Array(), "The signal to be shifted", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            defaultInputData.push(new calculationDataNumber_1.CalculationDataNumber(this.inputName2, 0, "Delay time in seconds", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, false)));
            return defaultInputData;
        };
        ShiftTimeAxisCalculator.prototype.getDefaultOutputData = function () {
            var defaultOutputData = _super.prototype.getDefaultOutputData.call(this);
            defaultOutputData.push(new calculationDataPoints_1.CalculationDataPoints(this.outputName, this.outputValue, new Array()));
            return defaultOutputData;
        };
        ShiftTimeAxisCalculator.prototype.verifyCalculationInputData = function () {
            _super.prototype.verifyCalculationInputData.call(this);
            var calculationInputDataContainer = this.getCalculationInputDataContainer();
            var inputSignal = calculationInputDataContainer[0];
            var inputNumber = calculationInputDataContainer[1];
            if (inputSignal == undefined || !calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(inputSignal.data)) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.MissingOrInvalidInput, [this.inputName1]);
            }
            if (inputNumber == undefined || !calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(inputNumber.data)) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.MissingOrInvalidInput, [this.inputName2]);
            }
        };
        ShiftTimeAxisCalculator.prototype.executeAlgorithm = function () {
            _super.prototype.executeAlgorithm.call(this);
            //retrieve calculation input data and initialize result
            var calculationInputData = this.getCalculationInputDataContainer();
            var result = new Array();
            var inputSignal = calculationInputData[0];
            var inputNumber = calculationInputData[1];
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(inputSignal.data) && calculatorHelper_1.CalculatorHelper.calculationInputDataIsNumber(inputNumber.data)) {
                result = this.calcTimeAxisShift(inputSignal.data, inputNumber.data);
            }
            this.addCalculationOutputData({
                data: result,
                value: this.outputValue,
                name: this.outputName
            });
        };
        /**
         * Calculate bitwise or with each Y-IPoint-Array value with the given number
         *
         * @private
         * @param {Array<IPoint>} inputSignal
         * @param {number} inputNumber
         * @returns {Array<IPoint>}
         * @memberof OrCalculator
         */
        ShiftTimeAxisCalculator.prototype.calcTimeAxisShift = function (inputSignal, inputNumber) {
            var timeAxisShift = new Array();
            for (var i = 0; i < inputSignal.length; i++) {
                timeAxisShift.push(new point_1.Point(inputSignal[i].x + inputNumber, inputSignal[i].y));
            }
            return timeAxisShift;
        };
        return ShiftTimeAxisCalculator;
    }(calculatorBase_1.CalculatorBase));
    exports.ShiftTimeAxisCalculator = ShiftTimeAxisCalculator;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hpZnRUaW1lQXhpc0NhbGN1bGF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9jb21tb24vY2FsY3VsYXRvclByb3ZpZGVyL2NhbGN1bGF0b3JzL3NoaWZ0VGltZUF4aXNDYWxjdWxhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFVQTtRQUE2QywyQ0FBYztRQU92RDtZQUFBLFlBQ0ksa0JBQU0saUJBQWlCLEVBQUUsaUJBQWlCLEVBQUUsNERBQTRELENBQUMsU0FDNUc7WUFQTyxnQkFBVSxHQUFHLGdCQUFnQixDQUFDO1lBQzlCLGdCQUFVLEdBQUcsa0JBQWtCLENBQUM7WUFDaEMsZ0JBQVUsR0FBRyxlQUFlLENBQUM7WUFDN0IsaUJBQVcsR0FBRyxpQkFBaUIsQ0FBQzs7UUFJeEMsQ0FBQztRQUVNLHFEQUFtQixHQUExQjtZQUNJLElBQUksZ0JBQWdCLEdBQUcsaUJBQU0sbUJBQW1CLFdBQUUsQ0FBQztZQUVuRCxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSw2Q0FBcUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUUsRUFBRSxJQUFJLEtBQUssRUFBVSxFQUFFLDBCQUEwQixFQUFFLElBQUksdURBQTBCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwSyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSw2Q0FBcUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSx1QkFBdUIsRUFBRSxJQUFJLHVEQUEwQixDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFNUksT0FBTyxnQkFBZ0IsQ0FBQztRQUM1QixDQUFDO1FBRU0sc0RBQW9CLEdBQTNCO1lBQ0ksSUFBSSxpQkFBaUIsR0FBRyxpQkFBTSxvQkFBb0IsV0FBRSxDQUFDO1lBRXJELGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLDZDQUFxQixDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLEtBQUssRUFBVSxDQUFDLENBQUMsQ0FBQztZQUUxRyxPQUFPLGlCQUFpQixDQUFDO1FBQzdCLENBQUM7UUFHUyw0REFBMEIsR0FBcEM7WUFDSSxpQkFBTSwwQkFBMEIsV0FBRSxDQUFDO1lBRW5DLElBQUksNkJBQTZCLEdBQUcsSUFBSSxDQUFDLGdDQUFnQyxFQUFFLENBQUM7WUFFNUUsSUFBSSxXQUFXLEdBQUcsNkJBQTZCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkQsSUFBSSxXQUFXLEdBQUcsNkJBQTZCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFbkQsSUFBRyxXQUFXLElBQUksU0FBUyxJQUFJLENBQUMsbUNBQWdCLENBQUMsNEJBQTRCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFDO2dCQUM1RixJQUFJLENBQUMsY0FBYyxDQUFDLGlDQUFnQixDQUFDLHFCQUFxQixFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7YUFDbEY7WUFDRCxJQUFHLFdBQVcsSUFBSSxTQUFTLElBQUksQ0FBQyxtQ0FBZ0IsQ0FBQyw0QkFBNEIsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUM7Z0JBQzVGLElBQUksQ0FBQyxjQUFjLENBQUMsaUNBQWdCLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQzthQUNsRjtRQUNMLENBQUM7UUFFUyxrREFBZ0IsR0FBMUI7WUFDSSxpQkFBTSxnQkFBZ0IsV0FBRSxDQUFBO1lBRXhCLHVEQUF1RDtZQUN2RCxJQUFJLG9CQUFvQixHQUFHLElBQUksQ0FBQyxnQ0FBZ0MsRUFBRSxDQUFDO1lBQ25FLElBQUksTUFBTSxHQUFHLElBQUksS0FBSyxFQUFVLENBQUM7WUFFakMsSUFBSSxXQUFXLEdBQUcsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUMsSUFBSSxXQUFXLEdBQUcsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFMUMsSUFBRyxtQ0FBZ0IsQ0FBQyw0QkFBNEIsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksbUNBQWdCLENBQUMsNEJBQTRCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFDO2dCQUNsSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3ZFO1lBRUQsSUFBSSxDQUFDLHdCQUF3QixDQUFDO2dCQUMxQixJQUFJLEVBQUUsTUFBTTtnQkFDWixLQUFLLEVBQUUsSUFBSSxDQUFDLFdBQVc7Z0JBQ3ZCLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVTthQUN4QixDQUFDLENBQUM7UUFDUCxDQUFDO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDSyxtREFBaUIsR0FBekIsVUFBMEIsV0FBMEIsRUFBRSxXQUFtQjtZQUNyRSxJQUFJLGFBQWEsR0FBRyxJQUFJLEtBQUssRUFBVSxDQUFDO1lBQ3hDLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN4QyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksYUFBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ25GO1lBQ0QsT0FBTyxhQUFhLENBQUM7UUFDekIsQ0FBQztRQUNMLDhCQUFDO0lBQUQsQ0FBQyxBQWxGRCxDQUE2QywrQkFBYyxHQWtGMUQ7SUFsRlksMERBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2FsY3VsYXRvckJhc2UsIEVycm9yTWVzc2FnZVR5cGUgfSBmcm9tIFwiLi9jYWxjdWxhdG9yQmFzZVwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFOdW1iZXIgfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhTnVtYmVyXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YVBvaW50cyB9IGZyb20gXCIuLi9jYWxjdWxhdGlvbkRhdGFQb2ludHNcIjtcclxuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm8gfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm9cIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRvckhlbHBlciB9IGZyb20gXCIuL2NhbGN1bGF0b3JIZWxwZXJcIjtcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi4vLi4vcG9pbnRcIjtcclxuaW1wb3J0IHsgVENhbGN1bGF0aW9uRGF0YSB9IGZyb20gXCIuLi9jYWxjdWxhdGlvbkRhdGFcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgU2hpZnRUaW1lQXhpc0NhbGN1bGF0b3IgZXh0ZW5kcyBDYWxjdWxhdG9yQmFzZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBpbnB1dE5hbWUxID0gXCJJbnB1dCBzaWduYWwgYVwiO1xyXG4gICAgcHJpdmF0ZSBpbnB1dE5hbWUyID0gXCJEZWxheSB0aW1lIGIgW3NdXCI7XHJcbiAgICBwcml2YXRlIG91dHB1dE5hbWUgPSBcIk91dHB1dCBzaWduYWxcIjtcclxuICAgIHByaXZhdGUgb3V0cHV0VmFsdWUgPSBcInNoaWZ0IHRpbWUgYXhpc1wiO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFwic2hpZnQgdGltZSBheGlzXCIsIFwiU2hpZnQgdGltZSBheGlzXCIsIFwiU2hpZnRzIGEgc2lnbmFsIG9uIHRoZSB0aW1lIGF4aXMgYnkgdGhlIGRlZmluZWQgZGVsYXkgdGltZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0RGVmYXVsdElucHV0RGF0YSgpOiBBcnJheTxUQ2FsY3VsYXRpb25EYXRhPiB7XHJcbiAgICAgICAgbGV0IGRlZmF1bHRJbnB1dERhdGEgPSBzdXBlci5nZXREZWZhdWx0SW5wdXREYXRhKCk7XHJcblxyXG4gICAgICAgIGRlZmF1bHRJbnB1dERhdGEucHVzaChuZXcgQ2FsY3VsYXRpb25EYXRhUG9pbnRzKHRoaXMuaW5wdXROYW1lMSwgXCJcIiwgbmV3IEFycmF5PElQb2ludD4oKSwgXCJUaGUgc2lnbmFsIHRvIGJlIHNoaWZ0ZWRcIiwgbmV3IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvKGZhbHNlLCB0cnVlKSkpO1xyXG4gICAgICAgIGRlZmF1bHRJbnB1dERhdGEucHVzaChuZXcgQ2FsY3VsYXRpb25EYXRhTnVtYmVyKHRoaXMuaW5wdXROYW1lMiwgMCwgXCJEZWxheSB0aW1lIGluIHNlY29uZHNcIiwgbmV3IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvKGZhbHNlLCBmYWxzZSkpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRJbnB1dERhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldERlZmF1bHRPdXRwdXREYXRhKCk6IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz4ge1xyXG4gICAgICAgIGxldCBkZWZhdWx0T3V0cHV0RGF0YSA9IHN1cGVyLmdldERlZmF1bHRPdXRwdXREYXRhKCk7XHJcblxyXG4gICAgICAgIGRlZmF1bHRPdXRwdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YVBvaW50cyh0aGlzLm91dHB1dE5hbWUsIHRoaXMub3V0cHV0VmFsdWUsIG5ldyBBcnJheTxJUG9pbnQ+KCkpKTsgXHJcblxyXG4gICAgICAgIHJldHVybiBkZWZhdWx0T3V0cHV0RGF0YTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJvdGVjdGVkIHZlcmlmeUNhbGN1bGF0aW9uSW5wdXREYXRhKCkge1xyXG4gICAgICAgIHN1cGVyLnZlcmlmeUNhbGN1bGF0aW9uSW5wdXREYXRhKCk7XHJcblxyXG4gICAgICAgIGxldCBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lciA9IHRoaXMuZ2V0Q2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXIoKTtcclxuXHJcbiAgICAgICAgbGV0IGlucHV0U2lnbmFsID0gY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXJbMF07XHJcbiAgICAgICAgbGV0IGlucHV0TnVtYmVyID0gY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXJbMV07XHJcblxyXG4gICAgICAgIGlmKGlucHV0U2lnbmFsID09IHVuZGVmaW5lZCB8fCAhQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU2lnbmFsKGlucHV0U2lnbmFsLmRhdGEpKXtcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvckJ5VHlwZShFcnJvck1lc3NhZ2VUeXBlLk1pc3NpbmdPckludmFsaWRJbnB1dCwgW3RoaXMuaW5wdXROYW1lMV0pO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgaWYoaW5wdXROdW1iZXIgPT0gdW5kZWZpbmVkIHx8ICFDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNOdW1iZXIoaW5wdXROdW1iZXIuZGF0YSkpe1xyXG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yQnlUeXBlKEVycm9yTWVzc2FnZVR5cGUuTWlzc2luZ09ySW52YWxpZElucHV0LCBbdGhpcy5pbnB1dE5hbWUyXSk7XHJcbiAgICAgICAgfSBcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZXhlY3V0ZUFsZ29yaXRobSgpIHtcclxuICAgICAgICBzdXBlci5leGVjdXRlQWxnb3JpdGhtKClcclxuXHJcbiAgICAgICAgLy9yZXRyaWV2ZSBjYWxjdWxhdGlvbiBpbnB1dCBkYXRhIGFuZCBpbml0aWFsaXplIHJlc3VsdFxyXG4gICAgICAgIGxldCBjYWxjdWxhdGlvbklucHV0RGF0YSA9IHRoaXMuZ2V0Q2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXIoKTtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IEFycmF5PElQb2ludD4oKTtcclxuXHJcbiAgICAgICAgbGV0IGlucHV0U2lnbmFsID0gY2FsY3VsYXRpb25JbnB1dERhdGFbMF07XHJcbiAgICAgICAgbGV0IGlucHV0TnVtYmVyID0gY2FsY3VsYXRpb25JbnB1dERhdGFbMV07XHJcblxyXG4gICAgICAgIGlmKENhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc1NpZ25hbChpbnB1dFNpZ25hbC5kYXRhKSAmJiBDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNOdW1iZXIoaW5wdXROdW1iZXIuZGF0YSkpe1xyXG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLmNhbGNUaW1lQXhpc1NoaWZ0KGlucHV0U2lnbmFsLmRhdGEsIGlucHV0TnVtYmVyLmRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5hZGRDYWxjdWxhdGlvbk91dHB1dERhdGEoe1xyXG4gICAgICAgICAgICBkYXRhOiByZXN1bHQsXHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLm91dHB1dFZhbHVlLFxyXG4gICAgICAgICAgICBuYW1lOiB0aGlzLm91dHB1dE5hbWVcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0ZSBiaXR3aXNlIG9yIHdpdGggZWFjaCBZLUlQb2ludC1BcnJheSB2YWx1ZSB3aXRoIHRoZSBnaXZlbiBudW1iZXJcclxuICAgICAqIFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SVBvaW50Pn0gaW5wdXRTaWduYWwgXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5wdXROdW1iZXJcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxJUG9pbnQ+fSBcclxuICAgICAqIEBtZW1iZXJvZiBPckNhbGN1bGF0b3JcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjYWxjVGltZUF4aXNTaGlmdChpbnB1dFNpZ25hbDogQXJyYXk8SVBvaW50PiwgaW5wdXROdW1iZXI6IG51bWJlcikgOiBBcnJheTxJUG9pbnQ+IHtcclxuICAgICAgICBsZXQgdGltZUF4aXNTaGlmdCA9IG5ldyBBcnJheTxJUG9pbnQ+KCk7ICAgICAgXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGlucHV0U2lnbmFsLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRpbWVBeGlzU2hpZnQucHVzaChuZXcgUG9pbnQoaW5wdXRTaWduYWxbaV0ueCArIGlucHV0TnVtYmVyLCBpbnB1dFNpZ25hbFtpXS55KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aW1lQXhpc1NoaWZ0O1xyXG4gICAgfVxyXG59Il19