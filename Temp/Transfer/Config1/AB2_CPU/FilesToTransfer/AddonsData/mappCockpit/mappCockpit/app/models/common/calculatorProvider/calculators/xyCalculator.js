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
            var _this = _super.call(this, "xy", "XY", "Creates an XY signal") || this;
            _this.inputName1 = "X signal";
            _this.inputName2 = "Y signal";
            _this.outputName = "Output signal";
            _this.outputValue = "xySignal";
            return _this;
        }
        XYCalculator.prototype.getDefaultInputData = function () {
            var defaultInputData = _super.prototype.getDefaultInputData.call(this);
            defaultInputData.push(new calculationDataPoints_1.CalculationDataPoints(this.inputName1, "", new Array(), "X signal", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            defaultInputData.push(new calculationDataPoints_1.CalculationDataPoints(this.inputName2, "", new Array(), "Y signal", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            return defaultInputData;
        };
        XYCalculator.prototype.getDefaultOutputData = function () {
            var defaultOutputData = _super.prototype.getDefaultOutputData.call(this);
            var output = new calculationDataPoints_1.CalculationDataPoints(this.outputName, this.outputValue, new Array());
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
                name: this.outputName
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
        return XYCalculator;
    }(calculatorBase_1.CalculatorBase));
    exports.XYCalculator = XYCalculator;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieHlDYWxjdWxhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdG9ycy94eUNhbGN1bGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVNBO1FBQWtDLGdDQUFjO1FBTzVDO1lBQUEsWUFDSSxrQkFBTSxJQUFJLEVBQUUsSUFBSSxFQUFFLHNCQUFzQixDQUFDLFNBQzVDO1lBUE8sZ0JBQVUsR0FBVyxVQUFVLENBQUM7WUFDaEMsZ0JBQVUsR0FBVyxVQUFVLENBQUM7WUFDaEMsZ0JBQVUsR0FBVyxlQUFlLENBQUM7WUFDckMsaUJBQVcsR0FBVyxVQUFVLENBQUM7O1FBSXpDLENBQUM7UUFFTSwwQ0FBbUIsR0FBMUI7WUFDSSxJQUFJLGdCQUFnQixHQUFHLGlCQUFNLG1CQUFtQixXQUFFLENBQUM7WUFFbkQsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksNkNBQXFCLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFFLEVBQUUsSUFBSSxLQUFLLEVBQVUsRUFBQyxVQUFVLEVBQUUsSUFBSSx1REFBMEIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25KLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLDZDQUFxQixDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRSxFQUFFLElBQUksS0FBSyxFQUFVLEVBQUMsVUFBVSxFQUFFLElBQUksdURBQTBCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVuSixPQUFPLGdCQUFnQixDQUFDO1FBQzVCLENBQUM7UUFFTSwyQ0FBb0IsR0FBM0I7WUFDSSxJQUFJLGlCQUFpQixHQUFHLGlCQUFNLG9CQUFvQixXQUFFLENBQUM7WUFFckQsSUFBSSxNQUFNLEdBQUcsSUFBSSw2Q0FBcUIs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QUFDLENBQUM7cUJBQ3RDO3lCQUNHO3dCQUNBLDBFQUEwRTt3QkFDMUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyx3RUFBd0UsQ0FBQyxDQUFDO3dCQUN4RixPQUFPLElBQUksS0FBSyxFQUFVLENBQUM7cUJBQzlCO2lCQUNKO2FBQ0o7aUJBQ0c7Z0JBQ0EsSUFBSSxDQUFDLFFBQVEsQ0FBQyw0RUFBNEUsQ0FBQyxDQUFDO2FBQy9GO1lBQ0QsT0FBTyxNQUFNLENBQUM7UUFDbEIsQ0FBQztRQUNMLG1CQUFDO0lBQUQsQ0FBQyxBQTFIRCxDQUFrQywrQkFBYyxHQTBIL0M7SUExSFksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJUG9pbnQgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9wb2ludEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuLi8uLi9wb2ludFwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFQb2ludHMgfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhUG9pbnRzXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0b3JCYXNlLCBFcnJvck1lc3NhZ2VUeXBlIH0gZnJvbSBcIi4vY2FsY3VsYXRvckJhc2VcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRvckhlbHBlciB9IGZyb20gXCIuL2NhbGN1bGF0b3JIZWxwZXJcIjtcclxuaW1wb3J0IHsgVENhbGN1bGF0aW9uRGF0YSB9IGZyb20gXCIuLi9jYWxjdWxhdGlvbkRhdGFcIjtcclxuaW1wb3J0IHsgU2VyaWVzVHlwZSB9IGZyb20gXCIuLi8uLi8uLi9jaGFydE1hbmFnZXJEYXRhTW9kZWwvc2VyaWVzVHlwZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFhZQ2FsY3VsYXRvciBleHRlbmRzIENhbGN1bGF0b3JCYXNlIHtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBpbnB1dE5hbWUxOiBzdHJpbmcgPSBcIlggc2lnbmFsXCI7XHJcbiAgICBwcml2YXRlIGlucHV0TmFtZTI6IHN0cmluZyA9IFwiWSBzaWduYWxcIjtcclxuICAgIHByaXZhdGUgb3V0cHV0TmFtZTogc3RyaW5nID0gXCJPdXRwdXQgc2lnbmFsXCI7XHJcbiAgICBwcml2YXRlIG91dHB1dFZhbHVlOiBzdHJpbmcgPSBcInh5U2lnbmFsXCI7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFwieHlcIiwgXCJYWVwiLCBcIkNyZWF0ZXMgYW4gWFkgc2lnbmFsXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXREZWZhdWx0SW5wdXREYXRhKCk6IEFycmF5PFRDYWxjdWxhdGlvbkRhdGE+IHtcclxuICAgICAgICBsZXQgZGVmYXVsdElucHV0RGF0YSA9IHN1cGVyLmdldERlZmF1bHRJbnB1dERhdGEoKTtcclxuXHJcbiAgICAgICAgZGVmYXVsdElucHV0RGF0YS5wdXNoKG5ldyBDYWxjdWxhdGlvbkRhdGFQb2ludHModGhpcy5pbnB1dE5hbWUxLCBcIlwiLCBuZXcgQXJyYXk8SVBvaW50PigpLFwiWCBzaWduYWxcIiwgbmV3IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvKGZhbHNlLCB0cnVlKSkpO1xyXG4gICAgICAgIGRlZmF1bHRJbnB1dERhdGEucHVzaChuZXcgQ2FsY3VsYXRpb25EYXRhUG9pbnRzKHRoaXMuaW5wdXROYW1lMiwgXCJcIiwgbmV3IEFycmF5PElQb2ludD4oKSxcIlkgc2lnbmFsXCIsIG5ldyBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mbyhmYWxzZSwgdHJ1ZSkpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRJbnB1dERhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldERlZmF1bHRPdXRwdXREYXRhKCk6IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz4ge1xyXG4gICAgICAgIGxldCBkZWZhdWx0T3V0cHV0RGF0YSA9IHN1cGVyLmdldERlZmF1bHRPdXRwdXREYXRhKCk7XHJcbiBcclxuICAgICAgICBsZXQgb3V0cHV0ID0gbmV3IENhbGN1bGF0aW9uRGF0YVBvaW50cyh0aGlzLm91dHB1dE5hbWUsIHRoaXMub3V0cHV0VmFsdWUsIG5ldyBBcnJheTxJUG9pbnQ+KCkpO1xyXG4gICAgICAgIG91dHB1dC50eXBlID0gU2VyaWVzVHlwZS54eVNlcmllcztcclxuICAgICAgICBkZWZhdWx0T3V0cHV0RGF0YS5wdXNoKG91dHB1dCk7IFxyXG5cclxuICAgICAgICByZXR1cm4gZGVmYXVsdE91dHB1dERhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHByZXBhcmVDYWxjdWxhdGlvbkRhdGEoKSB7XHJcbiAgICAgICAgc3VwZXIucHJlcGFyZUNhbGN1bGF0aW9uRGF0YSgpO1xyXG5cclxuICAgICAgICBsZXQgY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXIgPSB0aGlzLmdldENhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyKCk7XHJcblxyXG4gICAgICAgIGxldCB4U2lnbmFsID0gY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXJbMF07XHJcbiAgICAgICAgbGV0IHlTaWduYWwgPSBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lclsxXTtcclxuXHJcbiAgICAgICAgaWYoQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU2lnbmFsKHhTaWduYWwuZGF0YSkgJiYgQ2FsY3VsYXRvckhlbHBlci5pc1ZhbGlkU2lnbmFsKHhTaWduYWwuZGF0YSlcclxuICAgICAgICAgICAgJiYgQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU2lnbmFsKHlTaWduYWwuZGF0YSkgJiYgQ2FsY3VsYXRvckhlbHBlci5pc1ZhbGlkU2lnbmFsKHlTaWduYWwuZGF0YSkpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBwcmVwYXJlZFBvaW50QXJyYXlzID0gQ2FsY3VsYXRvckhlbHBlci5maWx0ZXJNYXRjaGluZ1BvaW50c0J5WHZhbHVlKHsgXHJcbiAgICAgICAgICAgICAgICBwb2ludEFycmF5MTogeFNpZ25hbC5kYXRhLCBcclxuICAgICAgICAgICAgICAgIHBvaW50QXJyYXkyOiB5U2lnbmFsLmRhdGFcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB4U2lnbmFsLmRhdGEgPSBwcmVwYXJlZFBvaW50QXJyYXlzLnBvaW50QXJyYXkxO1xyXG4gICAgICAgICAgICB5U2lnbmFsLmRhdGEgPSBwcmVwYXJlZFBvaW50QXJyYXlzLnBvaW50QXJyYXkyO1xyXG5cclxuICAgICAgICAgICAgaWYoIUNhbGN1bGF0b3JIZWxwZXIuaXNWYWxpZFNpZ25hbCh4U2lnbmFsLmRhdGEpIHx8ICFDYWxjdWxhdG9ySGVscGVyLmlzVmFsaWRTaWduYWwoeVNpZ25hbC5kYXRhKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRFcnJvckJ5VHlwZShFcnJvck1lc3NhZ2VUeXBlLk5vdEVub3VnaENvbW1vblRpbWVzdGFtcHMsIFt4U2lnbmFsLm5hbWUsIHlTaWduYWwubmFtZV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCB2ZXJpZnlDYWxjdWxhdGlvbklucHV0RGF0YSgpIHtcclxuICAgICAgICBzdXBlci52ZXJpZnlDYWxjdWxhdGlvbklucHV0RGF0YSgpO1xyXG5cclxuICAgICAgICBsZXQgY2FsY3VsY2F0aW9uSW5wdXREYXRhQ29udGFpbmVyID0gdGhpcy5nZXRDYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lcigpO1xyXG5cclxuICAgICAgICBsZXQgeFNpZ25hbCA9IGNhbGN1bGNhdGlvbklucHV0RGF0YUNvbnRhaW5lclswXTtcclxuICAgICAgICBsZXQgeVNpZ25hbCA9IGNhbGN1bGNhdGlvbklucHV0RGF0YUNvbnRhaW5lclsxXTtcclxuXHJcbiAgICAgICAgaWYoeFNpZ25hbCA9PSB1bmRlZmluZWQgfHwgIUNhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc1NpZ25hbCh4U2lnbmFsLmRhdGEpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JCeVR5cGUoRXJyb3JNZXNzYWdlVHlwZS5NaXNzaW5nT3JJbnZhbGlkSW5wdXQsIFt0aGlzLmlucHV0TmFtZTFdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoeVNpZ25hbCA9PSB1bmRlZmluZWQgfHwgIUNhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc1NpZ25hbCh5U2lnbmFsLmRhdGEpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JCeVR5cGUoRXJyb3JNZXNzYWdlVHlwZS5NaXNzaW5nT3JJbnZhbGlkSW5wdXQsIFt0aGlzLmlucHV0TmFtZTJdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGV4ZWN1dGVBbGdvcml0aG0oKSB7XHJcbiAgICAgICAgc3VwZXIuZXhlY3V0ZUFsZ29yaXRobSgpO1xyXG5cclxuICAgICAgICBsZXQgY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXIgPSB0aGlzLmdldENhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyKCk7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBBcnJheTxJUG9pbnQ+KCk7XHJcblxyXG4gICAgICAgIGxldCB4U2lnbmFsID0gY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXJbMF07XHJcbiAgICAgICAgbGV0IHlTaWduYWwgPSBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lclsxXTtcclxuXHJcbiAgICAgICAgaWYoQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU2lnbmFsKHhTaWduYWwuZGF0YSkgJiYgQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU2lnbmFsKHlTaWduYWwuZGF0YSkpIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5hZGRUd29TaWduYWxzKHhTaWduYWwuZGF0YSwgeVNpZ25hbC5kYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5hZGRDYWxjdWxhdGlvbk91dHB1dERhdGEoe1xyXG4gICAgICAgICAgICBkYXRhOiByZXN1bHQsXHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLm91dHB1dFZhbHVlLFxyXG4gICAgICAgICAgICBuYW1lOiB0aGlzLm91dHB1dE5hbWVcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0ZXMgb3V0cHV0IHZhbHVlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SVBvaW50Pn0gaW5wdXRTaWduYWwxXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElQb2ludD59IGlucHV0U2lnbmFsMlxyXG4gICAgICogQHJldHVybnMge0FycmF5PElQb2ludD59XHJcbiAgICAgKiBAbWVtYmVyb2YgWFlDYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkVHdvU2lnbmFscyhpbnB1dFNpZ25hbDE6IEFycmF5PElQb2ludD4sIGlucHV0U2lnbmFsMjogQXJyYXk8SVBvaW50Pik6IEFycmF5PElQb2ludD57XHJcbiAgICAgICAgbGV0IHBvaW50cyA9IG5ldyBBcnJheTxJUG9pbnQ+KCk7XHJcbiAgICAgICAgaWYoaW5wdXRTaWduYWwxLmxlbmd0aCA9PSBpbnB1dFNpZ25hbDIubGVuZ3RoKXsgLy8gQWRkIG9ubHkgc2lnbmFscyB3aXRoIHNhbWUgc2FtcGxlIGNvdW50XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBpbnB1dFNpZ25hbDEubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld1ggPSBpbnB1dFNpZ25hbDFbaV0ueTtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdZID0gaW5wdXRTaWduYWwyW2ldLnk7XHJcbiAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiBzaWduYWwgdHdvIGhhcyBzYW1lIHggdmFsdWVcclxuICAgICAgICAgICAgICAgIGlmKGlucHV0U2lnbmFsMVtpXS54ID09IGlucHV0U2lnbmFsMltpXS54KXtcclxuICAgICAgICAgICAgICAgICAgICBwb2ludHMucHVzaChuZXcgUG9pbnQobmV3WCwgbmV3WSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAvLyBBZGQgb2YgdHdvIGRpZmZlcmVudCBzaWduYWxzKGRpZmZlcmVudCB4IHZhbHVlcykgY3VycmVudGx5IG5vdCBwb3NzaWJsZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkRXJyb3IoXCJDYWxjdWxhdGlvbiBFcnJvcjogVGhlIGlucHV0IHNpZ25hbHMgZG9uJ3QgaGF2ZSBlcXVhbCB4ICh0aW1lKSB2YWx1ZXMhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQXJyYXk8SVBvaW50PigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3IoXCJDYWxjdWxhdGlvbiBFcnJvcjogVGhlIGlucHV0IHNpZ25hbHMgZG9uJ3QgaGF2ZSB0aGUgc2FtZSBudW1iZXIgb2YgcG9pbnRzIVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBvaW50cztcclxuICAgIH1cclxufSJdfQ==