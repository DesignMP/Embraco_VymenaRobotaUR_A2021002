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
    var TimeStampSyncCalculator = /** @class */ (function (_super) {
        __extends(TimeStampSyncCalculator, _super);
        function TimeStampSyncCalculator() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.id = "timeStampSync";
            _this.displayName = "Time stamp synchronization";
            _this.description = "Synchronizes the time stamps of a signal to the time stamps of a reference signal.";
            _this.signalToSynchronizeName = "Input signal a to synchronize time stamps";
            _this.signalRefTimeStampName = "Input signal b with reference time stamps";
            _this.outputSignalName = "Output signal";
            return _this;
        }
        /**
        * Returns the default input data for this calculator
        *
        * @returns {Array<CalculationDataPoints>}
        * @memberof TimeStampSyncCalculator
        */
        TimeStampSyncCalculator.prototype.getDefaultInputData = function () {
            var inputData = new Array();
            // add input params with default displaynames
            inputData.push(new calculationDataPoints_1.CalculationDataPoints(this.signalToSynchronizeName, "", new Array(), "The signal whose time stamps are to be synchronized.", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            inputData.push(new calculationDataPoints_1.CalculationDataPoints(this.signalRefTimeStampName, "", new Array(), "The signal with the reference time stamps.", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            return inputData;
        };
        /**
         * Returns the default output data for this calculator
         *
         * @returns {Array<CalculationDataPoints>}
         * @memberof TimeStampSyncCalculator
         */
        TimeStampSyncCalculator.prototype.getDefaultOutputData = function () {
            var outputData = new Array();
            // add output params with default displaynames
            outputData.push(new calculationDataPoints_1.CalculationDataPoints(this.outputSignalName, "result", new Array()));
            return outputData;
        };
        /**
        * Synchronizes the time stamp of signal b to the given time stamp of signal a
        *
        * @param {Array<ICalculationData>} inputData
        * @returns {Array<CalculationDataPoints>}
        * @memberof TimeStampSyncCalculator
        */
        TimeStampSyncCalculator.prototype.calculate = function (inputData) {
            this.clearErrors();
            var rawPoints = new Array();
            var outputData = new Array();
            outputData.push(new calculationDataPoints_1.CalculationDataPoints(this.outputSignalName, "result", new Array()));
            outputData[0].setData(rawPoints); // Set empty raw points list by default
            var inputSignalToSyncData = inputData[0].getData();
            var inputSignalRefTimeStampData = inputData[1].getData();
            // Check for valid input data
            if (inputSignalToSyncData == undefined || inputSignalToSyncData.length < 2) {
                this.addErrorByType(calculatorBase_1.ErroMessageType.MissingOrInvalidInput, [this.signalToSynchronizeName]);
                return outputData;
            }
            if (inputSignalRefTimeStampData == undefined || inputSignalRefTimeStampData.length < 2) {
                this.addErrorByType(calculatorBase_1.ErroMessageType.MissingOrInvalidInput, [this.signalRefTimeStampName]);
                return outputData;
            }
            // calculate new data
            rawPoints = this.synchronizeTimeStamp(inputSignalToSyncData, inputSignalRefTimeStampData);
            //check if output is valid
            if (rawPoints.length < 2) {
                this.addErrorByType(calculatorBase_1.ErroMessageType.InvalidOutput, [this.outputSignalName]);
                return outputData;
            }
            // Set new data to calculation ouput data
            outputData[0].setData(rawPoints);
            return outputData;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZVN0YW1wU3luY0NhbGN1bGF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9jb21tb24vY2FsY3VsYXRvclByb3ZpZGVyL2NhbGN1bGF0b3JzL3RpbWVTdGFtcFN5bmNDYWxjdWxhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFRQTtRQUE2QywyQ0FBYztRQUEzRDtZQUFBLHFFQXdIQztZQXRIRyxRQUFFLEdBQVcsZUFBZSxDQUFDO1lBQzdCLGlCQUFXLEdBQVcsNEJBQTRCLENBQUM7WUFDbkQsaUJBQVcsR0FBVyxvRkFBb0YsQ0FBQztZQUVuRyw2QkFBdUIsR0FBRywyQ0FBMkMsQ0FBQztZQUN0RSw0QkFBc0IsR0FBRywyQ0FBMkMsQ0FBQztZQUNyRSxzQkFBZ0IsR0FBRyxlQUFlLENBQUM7O1FBZ0gvQyxDQUFDO1FBOUdJOzs7OztVQUtFO1FBQ0kscURBQW1CLEdBQTFCO1lBQ0ksSUFBSSxTQUFTLEdBQUcsSUFBSSxLQUFLLEVBQXlCLENBQUM7WUFDbkQsNkNBQTZDO1lBQzdDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSw2Q0FBcUIsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsRUFBRSxFQUFFLElBQUksS0FBSyxFQUFVLEVBQUUsc0RBQXNELEVBQUUsSUFBSSx1REFBMEIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RNLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSw2Q0FBcUIsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsRUFBRSxFQUFFLElBQUksS0FBSyxFQUFVLEVBQUUsNENBQTRDLEVBQUUsSUFBSSx1REFBMEIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNMLE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNJLHNEQUFv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QUFDO1FBQ0wsOEJBQUM7SUFBRCxDQUFDLEFBeEhELENBQTZDLCtCQUFjLEdBd0gxRDtJQXhIWSwwREFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ2FsY3VsYXRvciB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2NhbGN1bGF0b3JJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSUNhbGN1bGF0aW9uRGF0YSB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2NhbGN1bGF0aW9uRGF0YUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9wb2ludEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuLi8uLi9wb2ludFwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFQb2ludHMgfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhUG9pbnRzXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0b3JCYXNlLCBFcnJvTWVzc2FnZVR5cGUgfSBmcm9tIFwiLi9jYWxjdWxhdG9yQmFzZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRpbWVTdGFtcFN5bmNDYWxjdWxhdG9yIGV4dGVuZHMgQ2FsY3VsYXRvckJhc2UgaW1wbGVtZW50cyBJQ2FsY3VsYXRvcntcclxuICAgIFxyXG4gICAgaWQ6IHN0cmluZyA9IFwidGltZVN0YW1wU3luY1wiO1xyXG4gICAgZGlzcGxheU5hbWU6IHN0cmluZyA9IFwiVGltZSBzdGFtcCBzeW5jaHJvbml6YXRpb25cIjtcclxuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmcgPSBcIlN5bmNocm9uaXplcyB0aGUgdGltZSBzdGFtcHMgb2YgYSBzaWduYWwgdG8gdGhlIHRpbWUgc3RhbXBzIG9mIGEgcmVmZXJlbmNlIHNpZ25hbC5cIjtcclxuXHJcbiAgICBwcml2YXRlIHNpZ25hbFRvU3luY2hyb25pemVOYW1lID0gXCJJbnB1dCBzaWduYWwgYSB0byBzeW5jaHJvbml6ZSB0aW1lIHN0YW1wc1wiO1xyXG4gICAgcHJpdmF0ZSBzaWduYWxSZWZUaW1lU3RhbXBOYW1lID0gXCJJbnB1dCBzaWduYWwgYiB3aXRoIHJlZmVyZW5jZSB0aW1lIHN0YW1wc1wiO1xyXG4gICAgcHJpdmF0ZSBvdXRwdXRTaWduYWxOYW1lID0gXCJPdXRwdXQgc2lnbmFsXCI7XHJcbiAgICBcclxuICAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgaW5wdXQgZGF0YSBmb3IgdGhpcyBjYWxjdWxhdG9yXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0FycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz59XHJcbiAgICAgKiBAbWVtYmVyb2YgVGltZVN0YW1wU3luY0NhbGN1bGF0b3JcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldERlZmF1bHRJbnB1dERhdGEoKTogQXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPntcclxuICAgICAgICBsZXQgaW5wdXREYXRhID0gbmV3IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz4oKTtcclxuICAgICAgICAvLyBhZGQgaW5wdXQgcGFyYW1zIHdpdGggZGVmYXVsdCBkaXNwbGF5bmFtZXNcclxuICAgICAgICBpbnB1dERhdGEucHVzaChuZXcgQ2FsY3VsYXRpb25EYXRhUG9pbnRzKHRoaXMuc2lnbmFsVG9TeW5jaHJvbml6ZU5hbWUsIFwiXCIsIG5ldyBBcnJheTxJUG9pbnQ+KCksIFwiVGhlIHNpZ25hbCB3aG9zZSB0aW1lIHN0YW1wcyBhcmUgdG8gYmUgc3luY2hyb25pemVkLlwiLCBuZXcgQ2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm8oZmFsc2UsIHRydWUpKSk7XHJcbiAgICAgICAgaW5wdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YVBvaW50cyh0aGlzLnNpZ25hbFJlZlRpbWVTdGFtcE5hbWUsIFwiXCIsIG5ldyBBcnJheTxJUG9pbnQ+KCksIFwiVGhlIHNpZ25hbCB3aXRoIHRoZSByZWZlcmVuY2UgdGltZSBzdGFtcHMuXCIsIG5ldyBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mbyhmYWxzZSwgdHJ1ZSkpKTtcclxuICAgICAgICByZXR1cm4gaW5wdXREYXRhO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgb3V0cHV0IGRhdGEgZm9yIHRoaXMgY2FsY3VsYXRvclxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+fVxyXG4gICAgICogQG1lbWJlcm9mIFRpbWVTdGFtcFN5bmNDYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXREZWZhdWx0T3V0cHV0RGF0YSgpOiBBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+e1xyXG4gICAgICAgIGxldCBvdXRwdXREYXRhID0gbmV3IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz4oKTtcclxuICAgICAgICAvLyBhZGQgb3V0cHV0IHBhcmFtcyB3aXRoIGRlZmF1bHQgZGlzcGxheW5hbWVzXHJcbiAgICAgICAgb3V0cHV0RGF0YS5wdXNoKG5ldyBDYWxjdWxhdGlvbkRhdGFQb2ludHModGhpcy5vdXRwdXRTaWduYWxOYW1lLCBcInJlc3VsdFwiLCBuZXcgQXJyYXk8SVBvaW50PigpKSk7IFxyXG4gICAgICAgIHJldHVybiBvdXRwdXREYXRhO1xyXG4gICAgfVxyXG5cclxuICAgICAvKipcclxuICAgICAqIFN5bmNocm9uaXplcyB0aGUgdGltZSBzdGFtcCBvZiBzaWduYWwgYiB0byB0aGUgZ2l2ZW4gdGltZSBzdGFtcCBvZiBzaWduYWwgYVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SUNhbGN1bGF0aW9uRGF0YT59IGlucHV0RGF0YVxyXG4gICAgICogQHJldHVybnMge0FycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz59XHJcbiAgICAgKiBAbWVtYmVyb2YgVGltZVN0YW1wU3luY0NhbGN1bGF0b3JcclxuICAgICAqL1xyXG4gICAgY2FsY3VsYXRlKGlucHV0RGF0YTogQXJyYXk8SUNhbGN1bGF0aW9uRGF0YT4pOiBBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+IHtcclxuICAgICAgICB0aGlzLmNsZWFyRXJyb3JzKCk7XHJcblxyXG4gICAgICAgIGxldCByYXdQb2ludHMgPSBuZXcgQXJyYXk8SVBvaW50PigpO1xyXG4gICAgICAgIGxldCBvdXRwdXREYXRhID0gbmV3IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz4oKTtcclxuICAgICAgICBvdXRwdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YVBvaW50cyh0aGlzLm91dHB1dFNpZ25hbE5hbWUsIFwicmVzdWx0XCIsIG5ldyBBcnJheTxJUG9pbnQ+KCkpKTsgXHJcbiAgICAgICAgb3V0cHV0RGF0YVswXS5zZXREYXRhKHJhd1BvaW50cyk7IC8vIFNldCBlbXB0eSByYXcgcG9pbnRzIGxpc3QgYnkgZGVmYXVsdFxyXG5cclxuICAgICAgICBsZXQgaW5wdXRTaWduYWxUb1N5bmNEYXRhID0gKGlucHV0RGF0YVswXSBhcyBDYWxjdWxhdGlvbkRhdGFQb2ludHMpLmdldERhdGEoKTtcclxuICAgICAgICBsZXQgaW5wdXRTaWduYWxSZWZUaW1lU3RhbXBEYXRhID0gKGlucHV0RGF0YVsxXSBhcyBDYWxjdWxhdGlvbkRhdGFQb2ludHMpLmdldERhdGEoKTtcclxuXHJcbiAgICAgICAgIFxyXG4gICAgICAgIC8vIENoZWNrIGZvciB2YWxpZCBpbnB1dCBkYXRhXHJcbiAgICAgICAgaWYoaW5wdXRTaWduYWxUb1N5bmNEYXRhID09IHVuZGVmaW5lZCB8fCBpbnB1dFNpZ25hbFRvU3luY0RhdGEubGVuZ3RoIDwgMil7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JCeVR5cGUoRXJyb01lc3NhZ2VUeXBlLk1pc3NpbmdPckludmFsaWRJbnB1dCwgW3RoaXMuc2lnbmFsVG9TeW5jaHJvbml6ZU5hbWVdKTtcclxuICAgICAgICAgICAgcmV0dXJuIG91dHB1dERhdGE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGlucHV0U2lnbmFsUmVmVGltZVN0YW1wRGF0YSA9PSB1bmRlZmluZWQgfHwgaW5wdXRTaWduYWxSZWZUaW1lU3RhbXBEYXRhLmxlbmd0aCA8IDIpe1xyXG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yQnlUeXBlKEVycm9NZXNzYWdlVHlwZS5NaXNzaW5nT3JJbnZhbGlkSW5wdXQsIFt0aGlzLnNpZ25hbFJlZlRpbWVTdGFtcE5hbWVdKTtcclxuICAgICAgICAgICAgcmV0dXJuIG91dHB1dERhdGE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGNhbGN1bGF0ZSBuZXcgZGF0YVxyXG4gICAgICAgIHJhd1BvaW50cyA9IHRoaXMuc3luY2hyb25pemVUaW1lU3RhbXAoaW5wdXRTaWduYWxUb1N5bmNEYXRhLCBpbnB1dFNpZ25hbFJlZlRpbWVTdGFtcERhdGEpO1xyXG5cclxuICAgICAgICAvL2NoZWNrIGlmIG91dHB1dCBpcyB2YWxpZFxyXG4gICAgICAgIGlmKHJhd1BvaW50cy5sZW5ndGggPCAyKXtcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvckJ5VHlwZShFcnJvTWVzc2FnZVR5cGUuSW52YWxpZE91dHB1dCwgW3RoaXMub3V0cHV0U2lnbmFsTmFtZV0pO1xyXG4gICAgICAgICAgICByZXR1cm4gb3V0cHV0RGF0YTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gU2V0IG5ldyBkYXRhIHRvIGNhbGN1bGF0aW9uIG91cHV0IGRhdGFcclxuICAgICAgICBvdXRwdXREYXRhWzBdLnNldERhdGEocmF3UG9pbnRzKTtcclxuICAgICAgICByZXR1cm4gb3V0cHV0RGF0YTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0ZXMgb3V0cHV0IHNpZ25hbCBkZXBlbmRpbmcgb24gdHlwZSBvZiBpbnB1dHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBpbnB1dE51bWJlcjFcclxuICAgICAqIEBwYXJhbSB7Kn0gaW5wdXROdW1iZXIyXHJcbiAgICAgKiBAcGFyYW0geyhBcnJheTxJUG9pbnQ+fHVuZGVmaW5lZCl9IGlucHV0U2lnbmFsRGF0YTFcclxuICAgICAqIEBwYXJhbSB7KEFycmF5PElQb2ludD58dW5kZWZpbmVkKX0gaW5wdXRTaWduYWxEYXRhMlxyXG4gICAgICogQHJldHVybnMge0FycmF5PElQb2ludD59XHJcbiAgICAgKiBAbWVtYmVyb2YgQWRkQ2FsY3VsYXRvclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN5bmNocm9uaXplVGltZVN0YW1wKGlucHV0U2lnbmFsVG9TeW5jOiBBcnJheTxJUG9pbnQ+LCBpbnB1dFNpZ25hbFJlZlRpbWVTdGFtcDogQXJyYXk8SVBvaW50PikgOiBBcnJheTxJUG9pbnQ+e1xyXG4gICAgICAgIGxldCBwb2ludHMgPSBuZXcgQXJyYXk8SVBvaW50PigpO1xyXG4gICAgICAgIGxldCBsYXN0SW5kZXg6bnVtYmVyID0gMDtcclxuICAgICAgICBmb3IobGV0IGkgPTA7IGkgPCBpbnB1dFNpZ25hbFJlZlRpbWVTdGFtcC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSBsYXN0SW5kZXg7IGogPCBpbnB1dFNpZ25hbFRvU3luYy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlucHV0U2lnbmFsVG9TeW5jW2pdLnggPiBpbnB1dFNpZ25hbFJlZlRpbWVTdGFtcFtpXS54KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGogPiAwKSB7IC8vemVybyBvcmRlciBob2xkIC0+IFRvIHRha2Ugb3ZlciBhIHZhbHVlIGF0IHRoZSBmaXJzdCBzYW1wbGluZyBwb2ludCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhlIHNpZ25hbCBcImlucHV0U2lnbmFsVG9TeW5jXCIgbXVzdCBoYXZlIGEgc2FtcGxpbmcgYmVmb3JlIHRoZSB2ZXJ5IGZpcnN0IHNhbXBsaW5nIG9mIHRoZSBzaWduYWwgXCJpbnB1dFNpZ25hbFJlZlRpbWVTdGFtcFwiLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgeDpudW1iZXIgPSBpbnB1dFNpZ25hbFJlZlRpbWVTdGFtcFtpXS54O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgeTpudW1iZXIgPSBpbnB1dFNpZ25hbFRvU3luY1tqLTFdLnk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50cy5wdXNoKG5ldyBQb2ludCh4LCB5KSk7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0SW5kZXggPSBqOyAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9jaGVjayBpZiBsYXN0IHBvaW50IGlzIHJlbGV2YW50ICh0aW1lIGludGVydmFsIGJldHdlZW4gbGFzdCBwb2ludCBhbmQgbmV4dCB0aW1lIHN0YW1wIDwgcGVyaW9kIHRpbWUgb2Ygc2lnbmFsIHRvIGJlIHN5bmNocm9uaXplZCkgICBcclxuICAgICAgICAgICAgaWYgKGlucHV0U2lnbmFsUmVmVGltZVN0YW1wW2ldLnggPj0gaW5wdXRTaWduYWxUb1N5bmNbaW5wdXRTaWduYWxUb1N5bmMubGVuZ3RoLTFdLngpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICgoaW5wdXRTaWduYWxSZWZUaW1lU3RhbXBbaV0ueCAtIGlucHV0U2lnbmFsVG9TeW5jW2lucHV0U2lnbmFsVG9TeW5jLmxlbmd0aC0xXS54KSA8IChpbnB1dFNpZ25hbFRvU3luY1tpbnB1dFNpZ25hbFRvU3luYy5sZW5ndGgtMV0ueCAtIGlucHV0U2lnbmFsVG9TeW5jW2lucHV0U2lnbmFsVG9TeW5jLmxlbmd0aC0yXS54KSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgeDpudW1iZXIgPSBpbnB1dFNpZ25hbFJlZlRpbWVTdGFtcFtpXS54O1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB5Om51bWJlciA9IGlucHV0U2lnbmFsVG9TeW5jW2lucHV0U2lnbmFsVG9TeW5jLmxlbmd0aC0xXS55O1xyXG4gICAgICAgICAgICAgICAgICAgIHBvaW50cy5wdXNoKG5ldyBQb2ludCh4LCB5KSk7IFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwb2ludHM7XHJcblxyXG4gICAgfVxyXG59Il19