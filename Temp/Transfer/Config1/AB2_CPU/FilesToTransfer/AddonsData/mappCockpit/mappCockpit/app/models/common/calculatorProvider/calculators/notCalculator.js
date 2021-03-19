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
define(["require", "exports", "./calculatorBase", "../calculationDataPoints", "../../point", "../calculationDataDisplayInfo", "./calculatorHelper"], function (require, exports, calculatorBase_1, calculationDataPoints_1, point_1, calculationDataDisplayInfo_1, calculatorHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NotCalculator = /** @class */ (function (_super) {
        __extends(NotCalculator, _super);
        function NotCalculator() {
            var _this = _super.call(this, "bitwise not", "Bitwise NOT", "Calculates Bitwise NOT of a signal") || this;
            _this.inputName = "Input signal";
            _this.outputName = "Output signal";
            _this.outputValue = "not";
            return _this;
        }
        NotCalculator.prototype.getDefaultInputData = function () {
            var defaultInputData = _super.prototype.getDefaultInputData.call(this);
            defaultInputData.push(new calculationDataPoints_1.CalculationDataPoints(this.inputName, "", new Array(), "Each Y value of the signal is used for bitwise NOT", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            return defaultInputData;
        };
        NotCalculator.prototype.getDefaultOutputData = function () {
            var defaultOutputData = _super.prototype.getDefaultOutputData.call(this);
            defaultOutputData.push(new calculationDataPoints_1.CalculationDataPoints(this.outputName, this.outputValue, new Array()));
            return defaultOutputData;
        };
        NotCalculator.prototype.verifyCalculationInputData = function () {
            _super.prototype.verifyCalculationInputData.call(this);
            //retrieve calculation input data
            var calculationInputDataContainer = this.getCalculationInputDataContainer();
            var inputData = calculationInputDataContainer[0];
            if (inputData == undefined || !calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(inputData.data)) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.MissingOrInvalidInput, [this.inputName]);
            }
            //Checking if the input signal contains floating point numbers
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(inputData.data) && calculatorHelper_1.CalculatorHelper.iPointArrayHasFloatInYValues(inputData.data)) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.ContainsFloatingNumbers, [this.inputName]);
            }
        };
        NotCalculator.prototype.executeAlgorithm = function () {
            _super.prototype.executeAlgorithm.call(this);
            //retrieve calculation input data and initialize result
            var calculationInputDataContainer = this.getCalculationInputDataContainer();
            var result = new Array();
            var inputData = calculationInputDataContainer[0];
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(inputData.data)) {
                result = this.bitwiseNotCalculate(inputData.data);
            }
            //add the result of the calculation to the calculationOutpuContainer
            this.addCalculationOutputData({
                data: result,
                value: this.outputValue,
                name: this.outputName
            });
        };
        /**
         * Calculate bitwise not of each Y-IPoint-Array value
         *
         * @private
         * @param {Array<IPoint>} inputSignal
         * @returns {Array<IPoint>}
         * @memberof AndCalculator
         */
        NotCalculator.prototype.bitwiseNotCalculate = function (inputSignal) {
            var points = new Array();
            for (var i = 0; i < inputSignal.length; i++) {
                points.push(new point_1.Point(inputSignal[i].x, ~inputSignal[i].y));
            }
            return points;
        };
        return NotCalculator;
    }(calculatorBase_1.CalculatorBase));
    exports.NotCalculator = NotCalculator;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90Q2FsY3VsYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRvcnMvbm90Q2FsY3VsYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBU0E7UUFBbUMsaUNBQWM7UUFNN0M7WUFBQSxZQUNJLGtCQUFNLGFBQWEsRUFBRSxhQUFhLEVBQUUsb0NBQW9DLENBQUMsU0FDNUU7WUFOTyxlQUFTLEdBQVcsY0FBYyxDQUFDO1lBQ25DLGdCQUFVLEdBQVcsZUFBZSxDQUFDO1lBQ3JDLGlCQUFXLEdBQVcsS0FBSyxDQUFDOztRQUlwQyxDQUFDO1FBRU0sMkNBQW1CLEdBQTFCO1lBQ0ksSUFBSSxnQkFBZ0IsR0FBRyxpQkFBTSxtQkFBbUIsV0FBRSxDQUFDO1lBRW5ELGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLDZDQUFxQixDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUMsRUFBRSxFQUFFLElBQUksS0FBSyxFQUFVLEVBQUUsb0RBQW9ELEVBQUUsSUFBSSx1REFBMEIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVMLE9BQU8sZ0JBQWdCLENBQUM7UUFDNUIsQ0FBQztRQUVNLDRDQUFvQixHQUEzQjtZQUNJLElBQUksaUJBQWlCLEdBQUcsaUJBQU0sb0JBQW9CLFdBQUUsQ0FBQztZQUVyRCxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSw2Q0FBcUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxLQUFLLEVBQVUsQ0FBQyxDQUFDLENBQUM7WUFFMUcsT0FBTyxpQkFBaUIsQ0FBQztRQUM3QixDQUFDO1FBRVMsa0RBQTBCLEdBQXBDO1lBQ0ksaUJBQU0sMEJBQTBCLFdBQUUsQ0FBQztZQUVuQyxpQ0FBaUM7WUFDakMsSUFBSSw2QkFBNkIsR0FBRyxJQUFJLENBQUMsZ0NBQWdDLEVBQUUsQ0FBQztZQUU1RSxJQUFJLFNBQVMsR0FBRyw2QkFBNkIsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVqRCxJQUFHLFNBQVMsSUFBSSxTQUFTLElBQUksQ0FBQyxtQ0FBZ0IsQ0FBQyw0QkFBNEIsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3pGLElBQUksQ0FBQyxjQUFjLENBQUMsaUNBQWdCLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzthQUNqRjtZQUNELDhEQUE4RDtZQUM5RCxJQUFHLG1DQUFnQixDQUFDLDRCQUE0QixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxtQ0FBZ0IsQ0FBQyw0QkFBNEIsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUM7Z0JBQzlILElBQUksQ0FBQyxjQUFjLENBQUMsaUNBQWdCLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzthQUNuRjtRQUNMLENBQUM7UUFFUyx3Q0FBZ0IsR0FBMUI7WUFDSSxpQkFBTSxnQkFBZ0IsV0FBRSxDQUFDO1lBRXpCLHVEQUF1RDtZQUN2RCxJQUFJLDZCQUE2QixHQUFHLElBQUksQ0FBQyxnQ0FBZ0MsRUFBRSxDQUFDO1lBQzVFLElBQUksTUFBTSxHQUFHLElBQUksS0FBSyxFQUFVLENBQUM7WUFFakMsSUFBSSxTQUFTLEdBQUcsNkJBQTZCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFakQsSUFBRyxtQ0FBZ0IsQ0FBQyw0QkFBNEIsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUM7Z0JBQzdELE1BQU0sR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3JEO1lBRUQsb0VBQW9FO1lBQ3BFLElBQUksQ0FBQyx3QkFBd0IsQ0FBQztnQkFDMUIsSUFBSSxFQUFFLE1BQU07Z0JBQ1osS0FBSyxFQUFFLElBQUksQ0FBQyxXQUFXO2dCQUN2QixJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVU7YUFDeEIsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUdEOzs7Ozs7O1dBT0c7UUFDSywyQ0FBbUIsR0FBM0IsVUFBNEIsV0FBMEI7WUFDbEQsSUFBSSxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQVUsQ0FBQztZQUNqQyxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDeEMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLGFBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDL0Q7WUFDRCxPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDO1FBQ0wsb0JBQUM7SUFBRCxDQUFDLEFBL0VELENBQW1DLCtCQUFjLEdBK0VoRDtJQS9FWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENhbGN1bGF0b3JCYXNlICwgRXJyb3JNZXNzYWdlVHlwZX0gZnJvbSBcIi4vY2FsY3VsYXRvckJhc2VcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhUG9pbnRzIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YVBvaW50c1wiO1xyXG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9wb2ludEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuLi8uLi9wb2ludFwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mbyB9IGZyb20gXCIuLi9jYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mb1wiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdG9ySGVscGVyIH0gZnJvbSBcIi4vY2FsY3VsYXRvckhlbHBlclwiO1xyXG5pbXBvcnQgeyBUQ2FsY3VsYXRpb25EYXRhIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YVwiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBOb3RDYWxjdWxhdG9yIGV4dGVuZHMgQ2FsY3VsYXRvckJhc2Uge1xyXG5cclxuICAgIHByaXZhdGUgaW5wdXROYW1lOiBzdHJpbmcgPSBcIklucHV0IHNpZ25hbFwiO1xyXG4gICAgcHJpdmF0ZSBvdXRwdXROYW1lOiBzdHJpbmcgPSBcIk91dHB1dCBzaWduYWxcIjtcclxuICAgIHByaXZhdGUgb3V0cHV0VmFsdWU6IHN0cmluZyA9IFwibm90XCI7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFwiYml0d2lzZSBub3RcIiwgXCJCaXR3aXNlIE5PVFwiLCBcIkNhbGN1bGF0ZXMgQml0d2lzZSBOT1Qgb2YgYSBzaWduYWxcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldERlZmF1bHRJbnB1dERhdGEoKTogQXJyYXk8VENhbGN1bGF0aW9uRGF0YT4ge1xyXG4gICAgICAgIGxldCBkZWZhdWx0SW5wdXREYXRhID0gc3VwZXIuZ2V0RGVmYXVsdElucHV0RGF0YSgpO1xyXG5cclxuICAgICAgICBkZWZhdWx0SW5wdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YVBvaW50cyh0aGlzLmlucHV0TmFtZSxcIlwiLCBuZXcgQXJyYXk8SVBvaW50PigpLCBcIkVhY2ggWSB2YWx1ZSBvZiB0aGUgc2lnbmFsIGlzIHVzZWQgZm9yIGJpdHdpc2UgTk9UXCIsIG5ldyBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mbyhmYWxzZSwgdHJ1ZSkpKTtcclxuICAgICAgICByZXR1cm4gZGVmYXVsdElucHV0RGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0RGVmYXVsdE91dHB1dERhdGEoKTogQXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPiB7XHJcbiAgICAgICAgbGV0IGRlZmF1bHRPdXRwdXREYXRhID0gc3VwZXIuZ2V0RGVmYXVsdE91dHB1dERhdGEoKTtcclxuXHJcbiAgICAgICAgZGVmYXVsdE91dHB1dERhdGEucHVzaChuZXcgQ2FsY3VsYXRpb25EYXRhUG9pbnRzKHRoaXMub3V0cHV0TmFtZSwgdGhpcy5vdXRwdXRWYWx1ZSwgbmV3IEFycmF5PElQb2ludD4oKSkpOyBcclxuICAgICAgIFxyXG4gICAgICAgIHJldHVybiBkZWZhdWx0T3V0cHV0RGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgdmVyaWZ5Q2FsY3VsYXRpb25JbnB1dERhdGEoKSB7XHJcbiAgICAgICAgc3VwZXIudmVyaWZ5Q2FsY3VsYXRpb25JbnB1dERhdGEoKTtcclxuXHJcbiAgICAgICAgLy9yZXRyaWV2ZSBjYWxjdWxhdGlvbiBpbnB1dCBkYXRhXHJcbiAgICAgICAgbGV0IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyID0gdGhpcy5nZXRDYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lcigpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBpbnB1dERhdGEgPSBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lclswXTtcclxuXHJcbiAgICAgICAgaWYoaW5wdXREYXRhID09IHVuZGVmaW5lZCB8fCAhQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU2lnbmFsKGlucHV0RGF0YS5kYXRhKSkge1xyXG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yQnlUeXBlKEVycm9yTWVzc2FnZVR5cGUuTWlzc2luZ09ySW52YWxpZElucHV0LCBbdGhpcy5pbnB1dE5hbWVdKTtcclxuICAgICAgICB9IFxyXG4gICAgICAgIC8vQ2hlY2tpbmcgaWYgdGhlIGlucHV0IHNpZ25hbCBjb250YWlucyBmbG9hdGluZyBwb2ludCBudW1iZXJzXHJcbiAgICAgICAgaWYoQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU2lnbmFsKGlucHV0RGF0YS5kYXRhKSAmJiBDYWxjdWxhdG9ySGVscGVyLmlQb2ludEFycmF5SGFzRmxvYXRJbllWYWx1ZXMoaW5wdXREYXRhLmRhdGEpKXtcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvckJ5VHlwZShFcnJvck1lc3NhZ2VUeXBlLkNvbnRhaW5zRmxvYXRpbmdOdW1iZXJzLCBbdGhpcy5pbnB1dE5hbWVdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGV4ZWN1dGVBbGdvcml0aG0oKSB7XHJcbiAgICAgICAgc3VwZXIuZXhlY3V0ZUFsZ29yaXRobSgpO1xyXG5cclxuICAgICAgICAvL3JldHJpZXZlIGNhbGN1bGF0aW9uIGlucHV0IGRhdGEgYW5kIGluaXRpYWxpemUgcmVzdWx0XHJcbiAgICAgICAgbGV0IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyID0gdGhpcy5nZXRDYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lcigpO1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBuZXcgQXJyYXk8SVBvaW50PigpO1xyXG5cclxuICAgICAgICBsZXQgaW5wdXREYXRhID0gY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXJbMF07XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU2lnbmFsKGlucHV0RGF0YS5kYXRhKSl7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuYml0d2lzZU5vdENhbGN1bGF0ZShpbnB1dERhdGEuZGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2FkZCB0aGUgcmVzdWx0IG9mIHRoZSBjYWxjdWxhdGlvbiB0byB0aGUgY2FsY3VsYXRpb25PdXRwdUNvbnRhaW5lclxyXG4gICAgICAgIHRoaXMuYWRkQ2FsY3VsYXRpb25PdXRwdXREYXRhKHtcclxuICAgICAgICAgICAgZGF0YTogcmVzdWx0LFxyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5vdXRwdXRWYWx1ZSxcclxuICAgICAgICAgICAgbmFtZTogdGhpcy5vdXRwdXROYW1lXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsY3VsYXRlIGJpdHdpc2Ugbm90IG9mIGVhY2ggWS1JUG9pbnQtQXJyYXkgdmFsdWVcclxuICAgICAqIFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SVBvaW50Pn0gaW5wdXRTaWduYWwgXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8SVBvaW50Pn0gXHJcbiAgICAgKiBAbWVtYmVyb2YgQW5kQ2FsY3VsYXRvclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGJpdHdpc2VOb3RDYWxjdWxhdGUoaW5wdXRTaWduYWw6IEFycmF5PElQb2ludD4pIDogQXJyYXk8SVBvaW50PiB7XHJcbiAgICAgICAgbGV0IHBvaW50cyA9IG5ldyBBcnJheTxJUG9pbnQ+KCk7ICAgICAgXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGlucHV0U2lnbmFsLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHBvaW50cy5wdXNoKG5ldyBQb2ludChpbnB1dFNpZ25hbFtpXS54LCB+aW5wdXRTaWduYWxbaV0ueSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcG9pbnRzO1xyXG4gICAgfVxyXG59Il19