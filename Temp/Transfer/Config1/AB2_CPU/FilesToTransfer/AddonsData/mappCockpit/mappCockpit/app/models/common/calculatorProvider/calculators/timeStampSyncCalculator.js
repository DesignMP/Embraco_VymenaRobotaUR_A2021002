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
define(["require", "exports", "../../point", "../calculationDataPoints", "../calculationDataDisplayInfo", "./calculatorBase", "./calculatorHelper"], function (require, exports, point_1, calculationDataPoints_1, calculationDataDisplayInfo_1, calculatorBase_1, calculatorHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TimeStampSyncCalculator = /** @class */ (function (_super) {
        __extends(TimeStampSyncCalculator, _super);
        function TimeStampSyncCalculator() {
            var _this = _super.call(this, "timeStampSync", "Time stamp synchronization", "Synchronizes the time stamps of a signal to the time stamps of a reference signal.") || this;
            _this.inputName1 = "Input signal a to synchronize time stamps";
            _this.inputName2 = "Input signal b with reference time stamps";
            _this.outputName = "Output signal";
            _this.outputValue = "result";
            return _this;
        }
        TimeStampSyncCalculator.prototype.getDefaultInputData = function () {
            var defaultInputData = _super.prototype.getDefaultInputData.call(this);
            defaultInputData.push(new calculationDataPoints_1.CalculationDataPoints(this.inputName1, "", new Array(), "The signal whose time stamps are to be synchronized.", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            defaultInputData.push(new calculationDataPoints_1.CalculationDataPoints(this.inputName2, "", new Array(), "The signal with the reference time stamps.", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            return defaultInputData;
        };
        TimeStampSyncCalculator.prototype.getDefaultOutputData = function () {
            var defaultOutputData = _super.prototype.getDefaultOutputData.call(this);
            defaultOutputData.push(new calculationDataPoints_1.CalculationDataPoints(this.outputName, this.outputValue, new Array()));
            return defaultOutputData;
        };
        TimeStampSyncCalculator.prototype.verifyCalculationInputData = function () {
            _super.prototype.verifyCalculationInputData.call(this);
            var calculationInputDataContainer = this.getCalculationInputDataContainer();
            var signalToSynchronize = calculationInputDataContainer[0];
            var referenceSignal = calculationInputDataContainer[1];
            if (signalToSynchronize == undefined || !calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(signalToSynchronize.data)) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.MissingOrInvalidInput, [this.inputName1]);
            }
            if (referenceSignal == undefined || !calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(referenceSignal.data)) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.MissingOrInvalidInput, [this.inputName2]);
            }
        };
        TimeStampSyncCalculator.prototype.executeAlgorithm = function () {
            _super.prototype.executeAlgorithm.call(this);
            var calculationInputDataContainer = this.getCalculationInputDataContainer();
            var result = new Array();
            var signalToSynchronize = calculationInputDataContainer[0];
            var referenceSignal = calculationInputDataContainer[1];
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(signalToSynchronize.data) && calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(referenceSignal.data)) {
                result = this.synchronizeTimeStamp(signalToSynchronize.data, referenceSignal.data);
            }
            this.addCalculationOutputData({
                data: result,
                value: this.outputValue,
                name: this.outputName
            });
        };
        /**
         * Calculates output signal depending on type of inputs
         *
         * @private
         * @param {*} inputNumber1
         * @param {*} inputNumber2
         * @param {(Array<IPoint>|undefined)} inputSignalData1
         * @param {(Array<IPoint>|undefined)} inputSignalData2
         * @returns {Array<IPoint>}
         * @memberof AddCalculator
         */
        TimeStampSyncCalculator.prototype.synchronizeTimeStamp = function (inputSignalToSync, inputSignalRefTimeStamp) {
            var points = new Array();
            var lastIndex = 0;
            for (var i = 0; i < inputSignalRefTimeStamp.length; i++) {
                for (var j = lastIndex; j < inputSignalToSync.length; j++) {
                    if (inputSignalToSync[j].x > inputSignalRefTimeStamp[i].x) {
                        if (j > 0) { //zero order hold -> To take over a value at the first sampling point, 
                            //the signal "inputSignalToSync" must have a sampling before the very first sampling of the signal "inputSignalRefTimeStamp".
                            var x = inputSignalRefTimeStamp[i].x;
                            var y = inputSignalToSync[j - 1].y;
                            points.push(new point_1.Point(x, y));
                            lastIndex = j;
                        }
                        break;
                    }
                }
                //check if last point is relevant (time interval between last point and next time stamp < period time of signal to be synchronized)   
                if (inputSignalRefTimeStamp[i].x >= inputSignalToSync[inputSignalToSync.length - 1].x) {
                    if ((inputSignalRefTimeStamp[i].x - inputSignalToSync[inputSignalToSync.length - 1].x) < (inputSignalToSync[inputSignalToSync.length - 1].x - inputSignalToSync[inputSignalToSync.length - 2].x)) {
                        var x = inputSignalRefTimeStamp[i].x;
                        var y = inputSignalToSync[inputSignalToSync.length - 1].y;
                        points.push(new point_1.Point(x, y));
                    }
                }
            }
            return points;
        };
        return TimeStampSyncCalculator;
    }(calculatorBase_1.CalculatorBase));
    exports.TimeStampSyncCalculator = TimeStampSyncCalculator;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZVN0YW1wU3luY0NhbGN1bGF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9jb21tb24vY2FsY3VsYXRvclByb3ZpZGVyL2NhbGN1bGF0b3JzL3RpbWVTdGFtcFN5bmNDYWxjdWxhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFRQTtRQUE2QywyQ0FBYztRQU92RDtZQUFBLFlBQ0ksa0JBQU0sZUFBZSxFQUFFLDRCQUE0QixFQUFFLG9GQUFvRixDQUFDLFNBQzdJO1lBUE8sZ0JBQVUsR0FBVywyQ0FBMkMsQ0FBQztZQUNqRSxnQkFBVSxHQUFXLDJDQUEyQyxDQUFDO1lBQ2pFLGdCQUFVLEdBQVcsZUFBZSxDQUFDO1lBQ3JDLGlCQUFXLEdBQVcsUUFBUSxDQUFDOztRQUl2QyxDQUFDO1FBRU0scURBQW1CLEdBQTFCO1lBQ0ksSUFBSSxnQkFBZ0IsR0FBRyxpQkFBTSxtQkFBbUIsV0FBRSxDQUFDO1lBRW5ELGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLDZDQUFxQixDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRSxFQUFFLElBQUksS0FBSyxFQUFVLEVBQUUsc0RBQXNELEVBQUUsSUFBSSx1REFBMEIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hNLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLDZDQUFxQixDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRSxFQUFFLElBQUksS0FBSyxFQUFVLEVBQUUsNENBQTRDLEVBQUUsSUFBSSx1REFBMEIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXRMLE9BQU8sZ0JBQWdCLENBQUM7UUFDNUIsQ0FBQztRQUVNLHNEQUFvQixHQUEzQjtZQUNJLElBQUksaUJBQWlCLEdBQUcsaUJBQU0sb0JBQW9CLFdBQUUsQ0FBQztZ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IHsgSVBvaW50IH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi4vLi4vcG9pbnRcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhUG9pbnRzIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YVBvaW50c1wiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mbyB9IGZyb20gXCIuLi9jYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mb1wiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdG9yQmFzZSwgRXJyb3JNZXNzYWdlVHlwZSB9IGZyb20gXCIuL2NhbGN1bGF0b3JCYXNlXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0b3JIZWxwZXIgfSBmcm9tIFwiLi9jYWxjdWxhdG9ySGVscGVyXCI7XHJcbmltcG9ydCB7IFRDYWxjdWxhdGlvbkRhdGEgfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVGltZVN0YW1wU3luY0NhbGN1bGF0b3IgZXh0ZW5kcyBDYWxjdWxhdG9yQmFzZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBpbnB1dE5hbWUxOiBzdHJpbmcgPSBcIklucHV0IHNpZ25hbCBhIHRvIHN5bmNocm9uaXplIHRpbWUgc3RhbXBzXCI7XHJcbiAgICBwcml2YXRlIGlucHV0TmFtZTI6IHN0cmluZyA9IFwiSW5wdXQgc2lnbmFsIGIgd2l0aCByZWZlcmVuY2UgdGltZSBzdGFtcHNcIjtcclxuICAgIHByaXZhdGUgb3V0cHV0TmFtZTogc3RyaW5nID0gXCJPdXRwdXQgc2lnbmFsXCI7XHJcbiAgICBwcml2YXRlIG91dHB1dFZhbHVlOiBzdHJpbmcgPSBcInJlc3VsdFwiO1xyXG4gICAgXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoXCJ0aW1lU3RhbXBTeW5jXCIsIFwiVGltZSBzdGFtcCBzeW5jaHJvbml6YXRpb25cIiwgXCJTeW5jaHJvbml6ZXMgdGhlIHRpbWUgc3RhbXBzIG9mIGEgc2lnbmFsIHRvIHRoZSB0aW1lIHN0YW1wcyBvZiBhIHJlZmVyZW5jZSBzaWduYWwuXCIpXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldERlZmF1bHRJbnB1dERhdGEoKTogQXJyYXk8VENhbGN1bGF0aW9uRGF0YT4ge1xyXG4gICAgICAgIGxldCBkZWZhdWx0SW5wdXREYXRhID0gc3VwZXIuZ2V0RGVmYXVsdElucHV0RGF0YSgpO1xyXG5cclxuICAgICAgICBkZWZhdWx0SW5wdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YVBvaW50cyh0aGlzLmlucHV0TmFtZTEsIFwiXCIsIG5ldyBBcnJheTxJUG9pbnQ+KCksIFwiVGhlIHNpZ25hbCB3aG9zZSB0aW1lIHN0YW1wcyBhcmUgdG8gYmUgc3luY2hyb25pemVkLlwiLCBuZXcgQ2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm8oZmFsc2UsIHRydWUpKSk7XHJcbiAgICAgICAgZGVmYXVsdElucHV0RGF0YS5wdXNoKG5ldyBDYWxjdWxhdGlvbkRhdGFQb2ludHModGhpcy5pbnB1dE5hbWUyLCBcIlwiLCBuZXcgQXJyYXk8SVBvaW50PigpLCBcIlRoZSBzaWduYWwgd2l0aCB0aGUgcmVmZXJlbmNlIHRpbWUgc3RhbXBzLlwiLCBuZXcgQ2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm8oZmFsc2UsIHRydWUpKSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZhdWx0SW5wdXREYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXREZWZhdWx0T3V0cHV0RGF0YSgpOiBBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+IHtcclxuICAgICAgICBsZXQgZGVmYXVsdE91dHB1dERhdGEgPSBzdXBlci5nZXREZWZhdWx0T3V0cHV0RGF0YSgpO1xyXG5cclxuICAgICAgICBkZWZhdWx0T3V0cHV0RGF0YS5wdXNoKG5ldyBDYWxjdWxhdGlvbkRhdGFQb2ludHModGhpcy5vdXRwdXROYW1lLCB0aGlzLm91dHB1dFZhbHVlLCBuZXcgQXJyYXk8SVBvaW50PigpKSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZhdWx0T3V0cHV0RGF0YTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJvdGVjdGVkIHZlcmlmeUNhbGN1bGF0aW9uSW5wdXREYXRhKCkge1xyXG4gICAgICAgIHN1cGVyLnZlcmlmeUNhbGN1bGF0aW9uSW5wdXREYXRhKCk7XHJcblxyXG4gICAgICAgIGxldCBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lciA9IHRoaXMuZ2V0Q2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXIoKTtcclxuXHJcbiAgICAgICAgbGV0IHNpZ25hbFRvU3luY2hyb25pemUgPSBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lclswXTtcclxuICAgICAgICBsZXQgcmVmZXJlbmNlU2lnbmFsID0gY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXJbMV07XHJcblxyXG4gICAgICAgIGlmKCBzaWduYWxUb1N5bmNocm9uaXplID09IHVuZGVmaW5lZCB8fCAhQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU2lnbmFsKHNpZ25hbFRvU3luY2hyb25pemUuZGF0YSkpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvckJ5VHlwZShFcnJvck1lc3NhZ2VUeXBlLk1pc3NpbmdPckludmFsaWRJbnB1dCwgW3RoaXMuaW5wdXROYW1lMV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiggcmVmZXJlbmNlU2lnbmFsID09IHVuZGVmaW5lZCB8fCAhQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU2lnbmFsKHJlZmVyZW5jZVNpZ25hbC5kYXRhKSkge1xyXG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yQnlUeXBlKEVycm9yTWVzc2FnZVR5cGUuTWlzc2luZ09ySW52YWxpZElucHV0LCBbdGhpcy5pbnB1dE5hbWUyXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBleGVjdXRlQWxnb3JpdGhtKCkge1xyXG4gICAgICAgIHN1cGVyLmV4ZWN1dGVBbGdvcml0aG0oKTtcclxuXHJcbiAgICAgICAgbGV0IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyID0gdGhpcy5nZXRDYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lcigpO1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBuZXcgQXJyYXk8SVBvaW50PigpO1xyXG5cclxuICAgICAgICBsZXQgc2lnbmFsVG9TeW5jaHJvbml6ZSA9IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyWzBdO1xyXG4gICAgICAgIGxldCByZWZlcmVuY2VTaWduYWwgPSBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lclsxXTtcclxuXHJcbiAgICAgICAgaWYoQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU2lnbmFsKHNpZ25hbFRvU3luY2hyb25pemUuZGF0YSkgJiYgQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU2lnbmFsKHJlZmVyZW5jZVNpZ25hbC5kYXRhKSkge1xyXG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLnN5bmNocm9uaXplVGltZVN0YW1wKHNpZ25hbFRvU3luY2hyb25pemUuZGF0YSwgcmVmZXJlbmNlU2lnbmFsLmRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5hZGRDYWxjdWxhdGlvbk91dHB1dERhdGEoe1xyXG4gICAgICAgICAgICBkYXRhOiByZXN1bHQsXHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLm91dHB1dFZhbHVlLFxyXG4gICAgICAgICAgICBuYW1lOiB0aGlzLm91dHB1dE5hbWVcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0ZXMgb3V0cHV0IHNpZ25hbCBkZXBlbmRpbmcgb24gdHlwZSBvZiBpbnB1dHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBpbnB1dE51bWJlcjFcclxuICAgICAqIEBwYXJhbSB7Kn0gaW5wdXROdW1iZXIyXHJcbiAgICAgKiBAcGFyYW0geyhBcnJheTxJUG9pbnQ+fHVuZGVmaW5lZCl9IGlucHV0U2lnbmFsRGF0YTFcclxuICAgICAqIEBwYXJhbSB7KEFycmF5PElQb2ludD58dW5kZWZpbmVkKX0gaW5wdXRTaWduYWxEYXRhMlxyXG4gICAgICogQHJldHVybnMge0FycmF5PElQb2ludD59XHJcbiAgICAgKiBAbWVtYmVyb2YgQWRkQ2FsY3VsYXRvclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN5bmNocm9uaXplVGltZVN0YW1wKGlucHV0U2lnbmFsVG9TeW5jOiBBcnJheTxJUG9pbnQ+LCBpbnB1dFNpZ25hbFJlZlRpbWVTdGFtcDogQXJyYXk8SVBvaW50PikgOiBBcnJheTxJUG9pbnQ+e1xyXG4gICAgICAgIGxldCBwb2ludHMgPSBuZXcgQXJyYXk8SVBvaW50PigpO1xyXG4gICAgICAgIGxldCBsYXN0SW5kZXg6bnVtYmVyID0gMDtcclxuICAgICAgICBmb3IobGV0IGkgPTA7IGkgPCBpbnB1dFNpZ25hbFJlZlRpbWVTdGFtcC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSBsYXN0SW5kZXg7IGogPCBpbnB1dFNpZ25hbFRvU3luYy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlucHV0U2lnbmFsVG9TeW5jW2pdLnggPiBpbnB1dFNpZ25hbFJlZlRpbWVTdGFtcFtpXS54KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGogPiAwKSB7IC8vemVybyBvcmRlciBob2xkIC0+IFRvIHRha2Ugb3ZlciBhIHZhbHVlIGF0IHRoZSBmaXJzdCBzYW1wbGluZyBwb2ludCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhlIHNpZ25hbCBcImlucHV0U2lnbmFsVG9TeW5jXCIgbXVzdCBoYXZlIGEgc2FtcGxpbmcgYmVmb3JlIHRoZSB2ZXJ5IGZpcnN0IHNhbXBsaW5nIG9mIHRoZSBzaWduYWwgXCJpbnB1dFNpZ25hbFJlZlRpbWVTdGFtcFwiLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgeDpudW1iZXIgPSBpbnB1dFNpZ25hbFJlZlRpbWVTdGFtcFtpXS54O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgeTpudW1iZXIgPSBpbnB1dFNpZ25hbFRvU3luY1tqLTFdLnk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50cy5wdXNoKG5ldyBQb2ludCh4LCB5KSk7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0SW5kZXggPSBqOyAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9jaGVjayBpZiBsYXN0IHBvaW50IGlzIHJlbGV2YW50ICh0aW1lIGludGVydmFsIGJldHdlZW4gbGFzdCBwb2ludCBhbmQgbmV4dCB0aW1lIHN0YW1wIDwgcGVyaW9kIHRpbWUgb2Ygc2lnbmFsIHRvIGJlIHN5bmNocm9uaXplZCkgICBcclxuICAgICAgICAgICAgaWYgKGlucHV0U2lnbmFsUmVmVGltZVN0YW1wW2ldLnggPj0gaW5wdXRTaWduYWxUb1N5bmNbaW5wdXRTaWduYWxUb1N5bmMubGVuZ3RoLTFdLngpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICgoaW5wdXRTaWduYWxSZWZUaW1lU3RhbXBbaV0ueCAtIGlucHV0U2lnbmFsVG9TeW5jW2lucHV0U2lnbmFsVG9TeW5jLmxlbmd0aC0xXS54KSA8IChpbnB1dFNpZ25hbFRvU3luY1tpbnB1dFNpZ25hbFRvU3luYy5sZW5ndGgtMV0ueCAtIGlucHV0U2lnbmFsVG9TeW5jW2lucHV0U2lnbmFsVG9TeW5jLmxlbmd0aC0yXS54KSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgeDpudW1iZXIgPSBpbnB1dFNpZ25hbFJlZlRpbWVTdGFtcFtpXS54O1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB5Om51bWJlciA9IGlucHV0U2lnbmFsVG9TeW5jW2lucHV0U2lnbmFsVG9TeW5jLmxlbmd0aC0xXS55O1xyXG4gICAgICAgICAgICAgICAgICAgIHBvaW50cy5wdXNoKG5ldyBQb2ludCh4LCB5KSk7IFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwb2ludHM7XHJcblxyXG4gICAgfVxyXG59Il19