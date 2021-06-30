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
define(["require", "exports", "../../point", "../calculationDataPoints", "../calculationDataDisplayInfo", "./calculatorBase", "./calculatorHelper", "../../../chartManagerDataModel/seriesType"], function (require, exports, point_1, calculationDataPoints_1, calculationDataDisplayInfo_1, calculatorBase_1, calculatorHelper_1, seriesType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var XYCalculator = /** @class */ (function (_super) {
        __extends(XYCalculator, _super);
        function XYCalculator() {
            var _this = _super.call(this, XYCalculator.id, "XY", "Creates an XY signal") || this;
            _this.inputName1 = "X signal";
            _this.inputName2 = "Y signal";
            _this.outputId = "OutputSignal";
            _this.outputName = "Output signal";
            _this.outputValue = "xySignal";
            return _this;
        }
        XYCalculator.prototype.getDefaultInputData = function () {
            var defaultInputData = _super.prototype.getDefaultInputData.call(this);
            defaultInputData.push(new calculationDataPoints_1.CalculationDataPoints(XYCalculator.inputIdXSignal, this.inputName1, "", new Array(), "X signal", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            defaultInputData.push(new calculationDataPoints_1.CalculationDataPoints(XYCalculator.inputIdYSignal, this.inputName2, "", new Array(), "Y signal", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            return defaultInputData;
        };
        XYCalculator.prototype.getDefaultOutputData = function () {
            var defaultOutputData = _super.prototype.getDefaultOutputData.call(this);
            var output = new calculationDataPoints_1.CalculationDataPoints(this.outputId, this.outputName, this.outputValue, new Array());
            output.type = seriesType_1.SeriesType.xySeries;
            defaultOutputData.push(output);
            return defaultOutputData;
        };
        XYCalculator.prototype.prepareCalculationData = function () {
            _super.prototype.prepareCalculationData.call(this);
            var calculationInputDataContainer = this.getCalculationInputDataContainer();
            var xSignal = calculationInputDataContainer[0];
            var ySignal = calculationInputDataContainer[1];
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(xSignal.data) && calculatorHelper_1.CalculatorHelper.isValidSignal(xSignal.data)
                && calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(ySignal.data) && calculatorHelper_1.CalculatorHelper.isValidSignal(ySignal.data)) {
                var preparedPointArrays = calculatorHelper_1.CalculatorHelper.filterMatchingPointsByXvalue({
                    pointArray1: xSignal.data,
                    pointArray2: ySignal.data
                });
                xSignal.data = preparedPointArrays.pointArray1;
                ySignal.data = preparedPointArrays.pointArray2;
                if (!calculatorHelper_1.CalculatorHelper.isValidSignal(xSignal.data) || !calculatorHelper_1.CalculatorHelper.isValidSignal(ySignal.data)) {
                    this.addErrorByType(calculatorBase_1.ErrorMessageType.NotEnoughCommonTimestamps, [xSignal.name, ySignal.name]);
                }
            }
        };
        XYCalculator.prototype.verifyCalculationInputData = function () {
            _super.prototype.verifyCalculationInputData.call(this);
            var calculcationInputDataContainer = this.getCalculationInputDataContainer();
            var xSignal = calculcationInputDataContainer[0];
            var ySignal = calculcationInputDataContainer[1];
            if (xSignal == undefined || !calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(xSignal.data)) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.MissingOrInvalidInput, [this.inputName1]);
            }
            if (ySignal == undefined || !calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(ySignal.data)) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.MissingOrInvalidInput, [this.inputName2]);
            }
        };
        XYCalculator.prototype.executeAlgorithm = function () {
            _super.prototype.executeAlgorithm.call(this);
            var calculationInputDataContainer = this.getCalculationInputDataContainer();
            var result = new Array();
            var xSignal = calculationInputDataContainer[0];
            var ySignal = calculationInputDataContainer[1];
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(xSignal.data) && calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(ySignal.data)) {
                result = this.addTwoSignals(xSignal.data, ySignal.data);
            }
            this.addCalculationOutputData({
                data: result,
                value: this.outputValue,
                name: this.outputName,
                id: this.outputId
            });
        };
        /**
         * Calculates output value
         *
         * @private
         * @param {Array<IPoint>} inputSignal1
         * @param {Array<IPoint>} inputSignal2
         * @returns {Array<IPoint>}
         * @memberof XYCalculator
         */
        XYCalculator.prototype.addTwoSignals = function (inputSignal1, inputSignal2) {
            var points = new Array();
            if (inputSignal1.length == inputSignal2.length) { // Add only signals with same sample count
                for (var i = 0; i < inputSignal1.length; i++) {
                    var newX = inputSignal1[i].y;
                    var newY = inputSignal2[i].y;
                    // check if signal two has same x value
                    if (inputSignal1[i].x == inputSignal2[i].x) {
                        points.push(new point_1.Point(newX, newY));
                    }
                    else {
                        // Add of two different signals(different x values) currently not possible
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
        XYCalculator.id = "xy";
        XYCalculator.inputIdXSignal = "XSignal";
        XYCalculator.inputIdYSignal = "YSignal";
        return XYCalculator;
    }(calculatorBase_1.CalculatorBase));
    exports.XYCalculator = XYCalculator;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieHlDYWxjdWxhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdG9ycy94eUNhbGN1bGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVNBO1FBQWtDLGdDQUFjO1FBWTVDO1lBQUEsWUFDSSxrQkFBTSxZQUFZLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxzQkFBc0IsQ0FBQyxTQUN2RDtZQVRPLGdCQUFVLEdBQVcsVUFBVSxDQUFDO1lBQ2hDLGdCQUFVLEdBQVcsVUFBVSxDQUFDO1lBRWhDLGNBQVEsR0FBVyxjQUFjLENBQUM7WUFDbEMsZ0JBQVUsR0FBVyxlQUFlLENBQUM7WUFDckMsaUJBQVcsR0FBVyxVQUFVLENBQUM7O1FBSXpDLENBQUM7UUFFTSwwQ0FBbUIsR0FBMUI7WUFDSSxJQUFJLGdCQUFnQixHQUFHLGlCQUFNLG1CQUFtQixXQUFFLENBQUM7WUFFbkQsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksNkNBQXFCLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUUsRUFBRSxJQUFJLEtBQUssRUFBVSxFQUFDLFVBQVUsRUFBRSxJQUFJLHVEQUEwQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEwsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksNkNBQXFCLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUUsRUFBRSxJQUFJLEtBQUssRUFBVSxFQUFDLFVBQVUsRUFBRSxJQUFJLHVEQUEwQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFaEwsT0FBTyxnQkFBZ0IsQ0FBQztRQUM1QixDQUFDO1FBRU0sMkNBQW9CLEdBQTNCO1lB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Q0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQzt3QkFDdEMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLGFBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztxQkFDdEM7eUJBQ0c7d0JBQ0EsMEVBQTBFO3dCQUMxRSxJQUFJLENBQUMsUUFBUSxDQUFDLHdFQUF3RSxDQUFDLENBQUM7d0JBQ3hGLE9BQU8sSUFBSSxLQUFLLEVBQVUsQ0FBQztxQkFDOUI7aUJBQ0o7YUFDSjtpQkFDRztnQkFDQSxJQUFJLENBQUMsUUFBUSxDQUFDLDRFQUE0RSxDQUFDLENBQUM7YUFDL0Y7WUFDRCxPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDO1FBN0hhLGVBQUUsR0FBVyxJQUFJLENBQUM7UUFDbEIsMkJBQWMsR0FBVyxTQUFTLENBQUM7UUFDbkMsMkJBQWMsR0FBVyxTQUFTLENBQUM7UUE0SHJELG1CQUFDO0tBQUEsQUFoSUQsQ0FBa0MsK0JBQWMsR0FnSS9DO0lBaElZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVBvaW50IH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi4vLi4vcG9pbnRcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhUG9pbnRzIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YVBvaW50c1wiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mbyB9IGZyb20gXCIuLi9jYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mb1wiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdG9yQmFzZSwgRXJyb3JNZXNzYWdlVHlwZSB9IGZyb20gXCIuL2NhbGN1bGF0b3JCYXNlXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0b3JIZWxwZXIgfSBmcm9tIFwiLi9jYWxjdWxhdG9ySGVscGVyXCI7XHJcbmltcG9ydCB7IFRDYWxjdWxhdGlvbkRhdGEgfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhXCI7XHJcbmltcG9ydCB7IFNlcmllc1R5cGUgfSBmcm9tIFwiLi4vLi4vLi4vY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL3Nlcmllc1R5cGVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBYWUNhbGN1bGF0b3IgZXh0ZW5kcyBDYWxjdWxhdG9yQmFzZSB7XHJcbiAgICBcclxuICAgIHB1YmxpYyBzdGF0aWMgaWQ6IHN0cmluZyA9IFwieHlcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgaW5wdXRJZFhTaWduYWw6IHN0cmluZyA9IFwiWFNpZ25hbFwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBpbnB1dElkWVNpZ25hbDogc3RyaW5nID0gXCJZU2lnbmFsXCI7XHJcbiAgICBwcml2YXRlIGlucHV0TmFtZTE6IHN0cmluZyA9IFwiWCBzaWduYWxcIjtcclxuICAgIHByaXZhdGUgaW5wdXROYW1lMjogc3RyaW5nID0gXCJZIHNpZ25hbFwiO1xyXG5cclxuICAgIHByaXZhdGUgb3V0cHV0SWQ6IHN0cmluZyA9IFwiT3V0cHV0U2lnbmFsXCI7XHJcbiAgICBwcml2YXRlIG91dHB1dE5hbWU6IHN0cmluZyA9IFwiT3V0cHV0IHNpZ25hbFwiO1xyXG4gICAgcHJpdmF0ZSBvdXRwdXRWYWx1ZTogc3RyaW5nID0gXCJ4eVNpZ25hbFwiO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihYWUNhbGN1bGF0b3IuaWQsIFwiWFlcIiwgXCJDcmVhdGVzIGFuIFhZIHNpZ25hbFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0RGVmYXVsdElucHV0RGF0YSgpOiBBcnJheTxUQ2FsY3VsYXRpb25EYXRhPiB7XHJcbiAgICAgICAgbGV0IGRlZmF1bHRJbnB1dERhdGEgPSBzdXBlci5nZXREZWZhdWx0SW5wdXREYXRhKCk7XHJcblxyXG4gICAgICAgIGRlZmF1bHRJbnB1dERhdGEucHVzaChuZXcgQ2FsY3VsYXRpb25EYXRhUG9pbnRzKFhZQ2FsY3VsYXRvci5pbnB1dElkWFNpZ25hbCwgdGhpcy5pbnB1dE5hbWUxLCBcIlwiLCBuZXcgQXJyYXk8SVBvaW50PigpLFwiWCBzaWduYWxcIiwgbmV3IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvKGZhbHNlLCB0cnVlKSkpO1xyXG4gICAgICAgIGRlZmF1bHRJbnB1dERhdGEucHVzaChuZXcgQ2FsY3VsYXRpb25EYXRhUG9pbnRzKFhZQ2FsY3VsYXRvci5pbnB1dElkWVNpZ25hbCwgdGhpcy5pbnB1dE5hbWUyLCBcIlwiLCBuZXcgQXJyYXk8SVBvaW50PigpLFwiWSBzaWduYWxcIiwgbmV3IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvKGZhbHNlLCB0cnVlKSkpO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmYXVsdElucHV0RGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0RGVmYXVsdE91dHB1dERhdGEoKTogQXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPiB7XHJcbiAgICAgICAgbGV0IGRlZmF1bHRPdXRwdXREYXRhID0gc3VwZXIuZ2V0RGVmYXVsdE91dHB1dERhdGEoKTtcclxuIFxyXG4gICAgICAgIGxldCBvdXRwdXQgPSBuZXcgQ2FsY3VsYXRpb25EYXRhUG9pbnRzKHRoaXMub3V0cHV0SWQsIHRoaXMub3V0cHV0TmFtZSwgdGhpcy5vdXRwdXRWYWx1ZSwgbmV3IEFycmF5PElQb2ludD4oKSk7XHJcbiAgICAgICAgb3V0cHV0LnR5cGUgPSBTZXJpZXNUeXBlLnh5U2VyaWVzO1xyXG4gICAgICAgIGRlZmF1bHRPdXRwdXREYXRhLnB1c2gob3V0cHV0KTsgXHJcblxyXG4gICAgICAgIHJldHVybiBkZWZhdWx0T3V0cHV0RGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgcHJlcGFyZUNhbGN1bGF0aW9uRGF0YSgpIHtcclxuICAgICAgICBzdXBlci5wcmVwYXJlQ2FsY3VsYXRpb25EYXRhKCk7XHJcblxyXG4gICAgICAgIGxldCBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lciA9IHRoaXMuZ2V0Q2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXIoKTtcclxuXHJcbiAgICAgICAgbGV0IHhTaWduYWwgPSBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lclswXTtcclxuICAgICAgICBsZXQgeVNpZ25hbCA9IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyWzFdO1xyXG5cclxuICAgICAgICBpZihDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNTaWduYWwoeFNpZ25hbC5kYXRhKSAmJiBDYWxjdWxhdG9ySGVscGVyLmlzVmFsaWRTaWduYWwoeFNpZ25hbC5kYXRhKVxyXG4gICAgICAgICAgICAmJiBDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNTaWduYWwoeVNpZ25hbC5kYXRhKSAmJiBDYWxjdWxhdG9ySGVscGVyLmlzVmFsaWRTaWduYWwoeVNpZ25hbC5kYXRhKSkge1xyXG5cclxuICAgICAgICAgICAgbGV0IHByZXBhcmVkUG9pbnRBcnJheXMgPSBDYWxjdWxhdG9ySGVscGVyLmZpbHRlck1hdGNoaW5nUG9pbnRzQnlYdmFsdWUoeyBcclxuICAgICAgICAgICAgICAgIHBvaW50QXJyYXkxOiB4U2lnbmFsLmRhdGEsIFxyXG4gICAgICAgICAgICAgICAgcG9pbnRBcnJheTI6IHlTaWduYWwuZGF0YVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHhTaWduYWwuZGF0YSA9IHByZXBhcmVkUG9pbnRBcnJheXMucG9pbnRBcnJheTE7XHJcbiAgICAgICAgICAgIHlTaWduYWwuZGF0YSA9IHByZXBhcmVkUG9pbnRBcnJheXMucG9pbnRBcnJheTI7XHJcblxyXG4gICAgICAgICAgICBpZighQ2FsY3VsYXRvckhlbHBlci5pc1ZhbGlkU2lnbmFsKHhTaWduYWwuZGF0YSkgfHwgIUNhbGN1bGF0b3JIZWxwZXIuaXNWYWxpZFNpZ25hbCh5U2lnbmFsLmRhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEVycm9yQnlUeXBlKEVycm9yTWVzc2FnZVR5cGUuTm90RW5vdWdoQ29tbW9uVGltZXN0YW1wcywgW3hTaWduYWwubmFtZSwgeVNpZ25hbC5uYW1lXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHZlcmlmeUNhbGN1bGF0aW9uSW5wdXREYXRhKCkge1xyXG4gICAgICAgIHN1cGVyLnZlcmlmeUNhbGN1bGF0aW9uSW5wdXREYXRhKCk7XHJcblxyXG4gICAgICAgIGxldCBjYWxjdWxjYXRpb25JbnB1dERhdGFDb250YWluZXIgPSB0aGlzLmdldENhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyKCk7XHJcblxyXG4gICAgICAgIGxldCB4U2lnbmFsID0gY2FsY3VsY2F0aW9uSW5wdXREYXRhQ29udGFpbmVyWzBdO1xyXG4gICAgICAgIGxldCB5U2lnbmFsID0gY2FsY3VsY2F0aW9uSW5wdXREYXRhQ29udGFpbmVyWzFdO1xyXG5cclxuICAgICAgICBpZih4U2lnbmFsID09IHVuZGVmaW5lZCB8fCAhQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU2lnbmFsKHhTaWduYWwuZGF0YSkpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvckJ5VHlwZShFcnJvck1lc3NhZ2VUeXBlLk1pc3NpbmdPckludmFsaWRJbnB1dCwgW3RoaXMuaW5wdXROYW1lMV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih5U2lnbmFsID09IHVuZGVmaW5lZCB8fCAhQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU2lnbmFsKHlTaWduYWwuZGF0YSkpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvckJ5VHlwZShFcnJvck1lc3NhZ2VUeXBlLk1pc3NpbmdPckludmFsaWRJbnB1dCwgW3RoaXMuaW5wdXROYW1lMl0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZXhlY3V0ZUFsZ29yaXRobSgpIHtcclxuICAgICAgICBzdXBlci5leGVjdXRlQWxnb3JpdGhtKCk7XHJcblxyXG4gICAgICAgIGxldCBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lciA9IHRoaXMuZ2V0Q2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXIoKTtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IEFycmF5PElQb2ludD4oKTtcclxuXHJcbiAgICAgICAgbGV0IHhTaWduYWwgPSBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lclswXTtcclxuICAgICAgICBsZXQgeVNpZ25hbCA9IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyWzFdO1xyXG5cclxuICAgICAgICBpZihDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNTaWduYWwoeFNpZ25hbC5kYXRhKSAmJiBDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNTaWduYWwoeVNpZ25hbC5kYXRhKSkge1xyXG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLmFkZFR3b1NpZ25hbHMoeFNpZ25hbC5kYXRhLCB5U2lnbmFsLmRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmFkZENhbGN1bGF0aW9uT3V0cHV0RGF0YSh7XHJcbiAgICAgICAgICAgIGRhdGE6IHJlc3VsdCxcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMub3V0cHV0VmFsdWUsXHJcbiAgICAgICAgICAgIG5hbWU6IHRoaXMub3V0cHV0TmFtZSxcclxuICAgICAgICAgICAgaWQ6IHRoaXMub3V0cHV0SWRcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0ZXMgb3V0cHV0IHZhbHVlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SVBvaW50Pn0gaW5wdXRTaWduYWwxXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElQb2ludD59IGlucHV0U2lnbmFsMlxyXG4gICAgICogQHJldHVybnMge0FycmF5PElQb2ludD59XHJcbiAgICAgKiBAbWVtYmVyb2YgWFlDYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkVHdvU2lnbmFscyhpbnB1dFNpZ25hbDE6IEFycmF5PElQb2ludD4sIGlucHV0U2lnbmFsMjogQXJyYXk8SVBvaW50Pik6IEFycmF5PElQb2ludD57XHJcbiAgICAgICAgbGV0IHBvaW50cyA9IG5ldyBBcnJheTxJUG9pbnQ+KCk7XHJcbiAgICAgICAgaWYoaW5wdXRTaWduYWwxLmxlbmd0aCA9PSBpbnB1dFNpZ25hbDIubGVuZ3RoKXsgLy8gQWRkIG9ubHkgc2lnbmFscyB3aXRoIHNhbWUgc2FtcGxlIGNvdW50XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBpbnB1dFNpZ25hbDEubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld1ggPSBpbnB1dFNpZ25hbDFbaV0ueTtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdZID0gaW5wdXRTaWduYWwyW2ldLnk7XHJcbiAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiBzaWduYWwgdHdvIGhhcyBzYW1lIHggdmFsdWVcclxuICAgICAgICAgICAgICAgIGlmKGlucHV0U2lnbmFsMVtpXS54ID09IGlucHV0U2lnbmFsMltpXS54KXtcclxuICAgICAgICAgICAgICAgICAgICBwb2ludHMucHVzaChuZXcgUG9pbnQobmV3WCwgbmV3WSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAvLyBBZGQgb2YgdHdvIGRpZmZlcmVudCBzaWduYWxzKGRpZmZlcmVudCB4IHZhbHVlcykgY3VycmVudGx5IG5vdCBwb3NzaWJsZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkRXJyb3IoXCJDYWxjdWxhdGlvbiBFcnJvcjogVGhlIGlucHV0IHNpZ25hbHMgZG9uJ3QgaGF2ZSBlcXVhbCB4ICh0aW1lKSB2YWx1ZXMhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQXJyYXk8SVBvaW50PigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3IoXCJDYWxjdWxhdGlvbiBFcnJvcjogVGhlIGlucHV0IHNpZ25hbHMgZG9uJ3QgaGF2ZSB0aGUgc2FtZSBudW1iZXIgb2YgcG9pbnRzIVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBvaW50cztcclxuICAgIH1cclxufSJdfQ==