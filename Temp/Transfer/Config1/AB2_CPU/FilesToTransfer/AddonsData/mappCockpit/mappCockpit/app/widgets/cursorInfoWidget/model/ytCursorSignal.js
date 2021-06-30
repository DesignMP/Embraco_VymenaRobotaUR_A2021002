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
define(["require", "exports", "./ytCursorSignalDescriptor", "../../../common/math/sum", "../../../common/math/mean", "../../../common/math/standardDeviation", "../../../common/math/variance", "../../../common/math/min", "../../../common/math/max", "../../../common/math/rms", "./cursorSignal"], function (require, exports, ytCursorSignalDescriptor_1, sum_1, mean_1, standardDeviation_1, variance_1, min_1, max_1, rms_1, cursorSignal_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var YTCursorSignal = /** @class */ (function (_super) {
        __extends(YTCursorSignal, _super);
        /**
         * Creates an instance of YTCursorSignal
         * @param {BaseSeries} serie
         * @memberof YTCursorSignal
         */
        function YTCursorSignal(serie, expandState, cursorInfo) {
            var _this = _super.call(this, serie, expandState) || this;
            // represents all available values for the actual given cursors
            _this._availableValues = new InfoValues();
            _this._sum = new sum_1.Sum();
            _this._rms = new rms_1.RootMeanSquare();
            _this._mean = new mean_1.Mean();
            _this._std = new standardDeviation_1.StandardDeviation();
            _this._var = new variance_1.Variance();
            _this._min = new min_1.Min();
            _this._max = new max_1.Max();
            // create specific cursor signal descriptor
            _this._cursorSignalDescriptor = new ytCursorSignalDescriptor_1.YTCursorSignalDescriptor(cursorInfo);
            return _this;
        }
        /**
         * Updates the cursor value informations for the given cursors
         *
         * @param {IPoint} cursorData1
         * @param {IPoint} cursorData2
         * @param {number} time1
         * @param {number} time2
         * @memberof YTCursorSignal
         */
        YTCursorSignal.prototype.updateValues = function (cursorData1, cursorData2, time1, time2) {
            var _this = this;
            this.updateSimpleValues(cursorData1, cursorData2, time1, time2);
            this.updateCalculatedValues(cursorData1, cursorData2);
            this.cursorInfos.forEach(function (cursorInfo) {
                _this.setCursorInfo(cursorInfo);
            });
        };
        YTCursorSignal.prototype.updateSimpleValues = function (cursor1Data, cursor2Data, time1, time2) {
            if (cursor1Data != undefined && cursor1Data.y != undefined && time1 != undefined) {
                // Set cursor 1 infos
                this._availableValues.y1 = cursor1Data.y.toPrecision(17);
                this._availableValues.t1 = cursor1Data.x.toPrecision(6);
            }
            else {
                this._availableValues.y1 = undefined;
                this._availableValues.t1 = undefined;
            }
            if (cursor2Data != undefined && cursor2Data.y != undefined && time2 != undefined) {
                // Set cursor 1 infos
                this._availableValues.y2 = cursor2Data.y.toPrecision(17);
                this._availableValues.t2 = cursor2Data.x.toPrecision(6);
            }
            else {
                this._availableValues.y2 = undefined;
                this._availableValues.t2 = undefined;
            }
        };
        YTCursorSignal.prototype.updateCalculatedValues = function (cursor1Data, cursor2Data) {
            if (cursor1Data != undefined && cursor1Data.y != undefined && cursor2Data != undefined && cursor2Data.y != undefined) {
                var cursorMinXValue = cursor1Data.x;
                var cursorMaxXValue = cursor2Data.x;
                if (cursorMinXValue > cursorMaxXValue) {
                    // Change min and max value
                    var tempXValue = cursorMaxXValue;
                    cursorMaxXValue = cursorMinXValue;
                    cursorMinXValue = tempXValue;
                }
                var signalInfos = this.getSignalInfosFromCursorWindow(cursorMinXValue, cursorMaxXValue, cursor1Data.y);
                this._availableValues.yDiff = (cursor2Data.y - cursor1Data.y).toPrecision(17);
                this._availableValues.tDiff = (cursor2Data.x - cursor1Data.x).toPrecision(6);
                this._availableValues.yMean = signalInfos.yMean.toPrecision(17);
                this._availableValues.yStD = signalInfos.yStD.toPrecision(17);
                this._availableValues.yVar = signalInfos.yVar.toPrecision(17);
                this._availableValues.yRms = signalInfos.yRms.toPrecision(17);
                this._availableValues.yMinimum = signalInfos.yMinimum.toPrecision(17);
                this._availableValues.yMaximum = signalInfos.yMaximum.toPrecision(17);
                this._availableValues.yPp = (signalInfos.yMaximum - signalInfos.yMinimum).toPrecision(17);
            }
            else {
                this._availableValues.yDiff = undefined;
                this._availableValues.tDiff = undefined;
                this._availableValues.yMean = undefined;
                this._availableValues.yStD = undefined;
                this._availableValues.yVar = undefined;
                this._availableValues.yRms = undefined;
                this._availableValues.yMinimum = undefined;
                this._availableValues.yMaximum = undefined;
                this._availableValues.yPp = undefined;
            }
        };
        /**
         * Set cursor informations
         *
         * @private
         * @param {*} cursorInfo
         * @memberof YTCursorSignal
         */
        YTCursorSignal.prototype.setCursorInfo = function (cursorInfo) {
            var value = this._availableValues[cursorInfo.id];
            if (value == undefined) {
                value = InfoValues.undefinedText;
            }
            cursorInfo.value = value;
        };
        YTCursorSignal.prototype.getSignalInfosFromCursorWindow = function (cursorMinXValue, cursorMaxXValue, defaultYValue) {
            var ySelectedValues = [];
            for (var counter = 0; counter < this._serie.rawPoints.length; counter++) {
                if (this._serie.rawPoints[counter].x >= cursorMinXValue && this._serie.rawPoints[counter].x <= cursorMaxXValue) {
                    ySelectedValues.push(this._serie.rawPoints[counter].y);
                }
            }
            this._sum.data = ySelectedValues;
            this._rms.data = ySelectedValues;
            this._mean.data = ySelectedValues;
            this._std.data = ySelectedValues;
            this._max.data = ySelectedValues;
            this._min.data = ySelectedValues;
            var mean = this._mean.calculate();
            this._std.mean = mean;
            var yStd = this._std.calculate();
            this._var.data = yStd;
            return {
                ySum: this._sum.calculate(),
                yRms: this._rms.calculate(),
                yMinimum: this._min.calculate(),
                yMaximum: this._max.calculate(),
                yMean: mean,
                yStD: yStd,
                yVar: this._var.calculate()
            };
        };
        /**
         * provides all available cursor infos
         *
         * @returns {Array<CursorDisplayInfoClass>}
         * @memberof YTCursorSignal
         */
        YTCursorSignal.prototype.getAllCursorInfo = function () {
            return this._cursorSignalDescriptor.getAllCursorInfo();
        };
        return YTCursorSignal;
    }(cursorSignal_1.CursorSignal));
    exports.YTCursorSignal = YTCursorSignal;
    var InfoValues = /** @class */ (function () {
        function InfoValues() {
            this.y1 = InfoValues.undefinedText;
            this.y2 = InfoValues.undefinedText;
            this.t1 = InfoValues.undefinedText;
            this.t2 = InfoValues.undefinedText;
            this.yDiff = InfoValues.undefinedText;
            this.tDiff = InfoValues.undefinedText;
            this.yMean = InfoValues.undefinedText;
            this.yStD = InfoValues.undefinedText;
            this.yVar = InfoValues.undefinedText;
            this.yRms = InfoValues.undefinedText;
            this.yMinimum = InfoValues.undefinedText;
            this.yMaximum = InfoValues.undefinedText;
            this.yPp = InfoValues.undefinedText;
        }
        InfoValues.undefinedText = "";
        return InfoValues;
    }());
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXRDdXJzb3JTaWduYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY3Vyc29ySW5mb1dpZGdldC9tb2RlbC95dEN1cnNvclNpZ25hbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBZUE7UUFBb0Msa0NBQVk7UUFZNUM7Ozs7V0FJRztRQUNILHdCQUFZLEtBQWlCLEVBQUUsV0FBb0IsRUFBRSxVQUFtQztZQUF4RixZQUNJLGtCQUFNLEtBQUssRUFBRSxXQUFXLENBQUMsU0FJNUI7WUFwQkQsK0RBQStEO1lBQ3ZELHNCQUFnQixHQUFlLElBQUksVUFBVSxFQUFFLENBQUM7WUFDaEQsVUFBSSxHQUFHLElBQUksU0FBRyxFQUFFLENBQUM7WUFDakIsVUFBSSxHQUFHLElBQUksb0JBQWMsRUFBRSxDQUFDO1lBQzVCLFdBQUssR0FBRyxJQUFJLFdBQUksRUFBRSxDQUFDO1lBQ25CLFVBQUksR0FBRyxJQUFJLHFDQUFpQixFQUFFLENBQUM7WUFDL0IsVUFBSSxHQUFHLElBQUksbUJBQVEsRUFBRSxDQUFDO1lBQ3RCLFVBQUksR0FBRyxJQUFJLFNBQUcsRUFBRSxDQUFDO1lBQ2pCLFVBQUksR0FBRyxJQUFJLFNBQUcsRUFBRSxDQUFDO1lBVXJCLDJDQUEyQztZQUMzQyxLQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxtREFBd0IsQ0FBQyxVQUFVLENBQUMsQ0FBQzs7UUFDNUUsQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ0kscUNBQVksR0FBbkIsVUFBb0IsV0FBbUIsRUFBRSxXQUFtQixFQUFFLEtBQWEsRUFBRSxLQUFhO1lBQTFGLGlCQU1DO1lBTEcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2hFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENB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Q0FBQyxhQUFhLENBQUM7WUFDbkMsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsYUFBYSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQztZQUN0QyxJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUM7WUFDdEMsSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsYUFBYSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQztZQUNyQyxJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUM7WUFDckMsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUMsYUFBYSxDQUFDO1lBQ3pDLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQztZQUN6QyxJQUFJLENBQUMsR0FBRyxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUM7UUFDeEMsQ0FBQztRQWhCc0Isd0JBQWEsR0FBVyxFQUFFLENBQUM7UUFpQnRELGlCQUFDO0tBQUEsQUFqQ0QsSUFpQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJUG9pbnQgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2NvbW1vbi9pbnRlcmZhY2VzL3BvaW50SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFlUQ3Vyc29yU2lnbmFsRGVzY3JpcHRvciB9IGZyb20gXCIuL3l0Q3Vyc29yU2lnbmFsRGVzY3JpcHRvclwiO1xyXG5pbXBvcnQgeyBTdW0gfSBmcm9tICcuLi8uLi8uLi9jb21tb24vbWF0aC9zdW0nO1xyXG5pbXBvcnQgeyBNZWFuIH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL21hdGgvbWVhbic7XHJcbmltcG9ydCB7IFN0YW5kYXJkRGV2aWF0aW9uIH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL21hdGgvc3RhbmRhcmREZXZpYXRpb24nO1xyXG5pbXBvcnQgeyBWYXJpYW5jZSB9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi9tYXRoL3ZhcmlhbmNlJztcclxuaW1wb3J0IHsgTWluIH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL21hdGgvbWluJztcclxuaW1wb3J0IHsgTWF4IH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL21hdGgvbWF4JztcclxuaW1wb3J0IHsgUm9vdE1lYW5TcXVhcmUgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL21hdGgvcm1zXCI7XHJcbmltcG9ydCB7IEJhc2VTZXJpZXMgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9iYXNlU2VyaWVzXCI7XHJcbmltcG9ydCB7IEN1cnNvclNpZ25hbCB9IGZyb20gXCIuL2N1cnNvclNpZ25hbFwiO1xyXG5pbXBvcnQgeyBDdXJzb3JEaXNwbGF5SW5mb0NsYXNzIH0gZnJvbSBcIi4vZHluYW1pY0N1cnNvclNpZ25hbFRlbXBsYXRlXCI7XHJcbmltcG9ydCB7IEN1cnNvckluZm8gfSBmcm9tIFwiLi9jdXJzb3JJbmZvXCI7XHJcbmltcG9ydCB7IEN1cnNvckluZm9WaXNpYmlsaXR5IH0gZnJvbSBcIi4vY3Vyc29ySW5mb1Zpc2liaWxpdHlcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBZVEN1cnNvclNpZ25hbCBleHRlbmRzIEN1cnNvclNpZ25hbHtcclxuXHJcbiAgICAvLyByZXByZXNlbnRzIGFsbCBhdmFpbGFibGUgdmFsdWVzIGZvciB0aGUgYWN0dWFsIGdpdmVuIGN1cnNvcnNcclxuICAgIHByaXZhdGUgX2F2YWlsYWJsZVZhbHVlczogSW5mb1ZhbHVlcyA9IG5ldyBJbmZvVmFsdWVzKCk7XHJcbiAgICBwcml2YXRlIF9zdW0gPSBuZXcgU3VtKCk7XHJcbiAgICBwcml2YXRlIF9ybXMgPSBuZXcgUm9vdE1lYW5TcXVhcmUoKTtcclxuICAgIHByaXZhdGUgX21lYW4gPSBuZXcgTWVhbigpO1xyXG4gICAgcHJpdmF0ZSBfc3RkID0gbmV3IFN0YW5kYXJkRGV2aWF0aW9uKCk7XHJcbiAgICBwcml2YXRlIF92YXIgPSBuZXcgVmFyaWFuY2UoKTtcclxuICAgIHByaXZhdGUgX21pbiA9IG5ldyBNaW4oKTtcclxuICAgIHByaXZhdGUgX21heCA9IG5ldyBNYXgoKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgWVRDdXJzb3JTaWduYWxcclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVcclxuICAgICAqIEBtZW1iZXJvZiBZVEN1cnNvclNpZ25hbFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihzZXJpZTogQmFzZVNlcmllcywgZXhwYW5kU3RhdGU6IGJvb2xlYW4sIGN1cnNvckluZm8/OiBDdXJzb3JJbmZvVmlzaWJpbGl0eVtdKXtcclxuICAgICAgICBzdXBlcihzZXJpZSwgZXhwYW5kU3RhdGUpO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgc3BlY2lmaWMgY3Vyc29yIHNpZ25hbCBkZXNjcmlwdG9yXHJcbiAgICAgICAgdGhpcy5fY3Vyc29yU2lnbmFsRGVzY3JpcHRvciA9IG5ldyBZVEN1cnNvclNpZ25hbERlc2NyaXB0b3IoY3Vyc29ySW5mbyk7IFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgY3Vyc29yIHZhbHVlIGluZm9ybWF0aW9ucyBmb3IgdGhlIGdpdmVuIGN1cnNvcnNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lQb2ludH0gY3Vyc29yRGF0YTFcclxuICAgICAqIEBwYXJhbSB7SVBvaW50fSBjdXJzb3JEYXRhMlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWUxXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdGltZTJcclxuICAgICAqIEBtZW1iZXJvZiBZVEN1cnNvclNpZ25hbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXBkYXRlVmFsdWVzKGN1cnNvckRhdGExOiBJUG9pbnQsIGN1cnNvckRhdGEyOiBJUG9pbnQsIHRpbWUxOiBudW1iZXIsIHRpbWUyOiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2ltcGxlVmFsdWVzKGN1cnNvckRhdGExLCBjdXJzb3JEYXRhMiwgdGltZTEsIHRpbWUyKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUNhbGN1bGF0ZWRWYWx1ZXMoY3Vyc29yRGF0YTEsIGN1cnNvckRhdGEyKTtcclxuICAgICAgICB0aGlzLmN1cnNvckluZm9zLmZvckVhY2goY3Vyc29ySW5mbyA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Q3Vyc29ySW5mbyhjdXJzb3JJbmZvKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlU2ltcGxlVmFsdWVzKGN1cnNvcjFEYXRhOiBJUG9pbnQsIGN1cnNvcjJEYXRhOiBJUG9pbnQsIHRpbWUxOiBudW1iZXIsIHRpbWUyOiBudW1iZXIpe1xyXG4gICAgICAgIGlmKGN1cnNvcjFEYXRhICE9IHVuZGVmaW5lZCAmJiBjdXJzb3IxRGF0YS55ICE9IHVuZGVmaW5lZCAmJiB0aW1lMSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAvLyBTZXQgY3Vyc29yIDEgaW5mb3NcclxuICAgICAgICAgICAgdGhpcy5fYXZhaWxhYmxlVmFsdWVzLnkxID0gY3Vyc29yMURhdGEueS50b1ByZWNpc2lvbigxNyk7XHJcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVZhbHVlcy50MSA9IGN1cnNvcjFEYXRhLngudG9QcmVjaXNpb24oNik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVZhbHVlcy55MSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgdGhpcy5fYXZhaWxhYmxlVmFsdWVzLnQxID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihjdXJzb3IyRGF0YSAhPSB1bmRlZmluZWQgJiYgY3Vyc29yMkRhdGEueSAhPSB1bmRlZmluZWQgJiYgdGltZTIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gU2V0IGN1cnNvciAxIGluZm9zXHJcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVZhbHVlcy55MiA9IGN1cnNvcjJEYXRhLnkudG9QcmVjaXNpb24oMTcpO1xyXG4gICAgICAgICAgICB0aGlzLl9hdmFpbGFibGVWYWx1ZXMudDIgPSBjdXJzb3IyRGF0YS54LnRvUHJlY2lzaW9uKDYpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLl9hdmFpbGFibGVWYWx1ZXMueTIgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVZhbHVlcy50MiA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVDYWxjdWxhdGVkVmFsdWVzKGN1cnNvcjFEYXRhOiBJUG9pbnQsIGN1cnNvcjJEYXRhOiBJUG9pbnQpe1xyXG4gICAgICAgIGlmKGN1cnNvcjFEYXRhICE9IHVuZGVmaW5lZCAmJiBjdXJzb3IxRGF0YS55ICE9IHVuZGVmaW5lZCAmJiBjdXJzb3IyRGF0YSAhPSB1bmRlZmluZWQgJiYgY3Vyc29yMkRhdGEueSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBsZXQgY3Vyc29yTWluWFZhbHVlID0gY3Vyc29yMURhdGEueDtcclxuICAgICAgICAgICAgbGV0IGN1cnNvck1heFhWYWx1ZSA9IGN1cnNvcjJEYXRhLng7XHJcbiAgICAgICAgICAgIGlmKGN1cnNvck1pblhWYWx1ZSA+IGN1cnNvck1heFhWYWx1ZSl7XHJcbiAgICAgICAgICAgICAgICAvLyBDaGFuZ2UgbWluIGFuZCBtYXggdmFsdWVcclxuICAgICAgICAgICAgICAgIGxldCB0ZW1wWFZhbHVlID0gY3Vyc29yTWF4WFZhbHVlO1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yTWF4WFZhbHVlID0gY3Vyc29yTWluWFZhbHVlO1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yTWluWFZhbHVlID0gdGVtcFhWYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IHNpZ25hbEluZm9zID0gdGhpcy5nZXRTaWduYWxJbmZvc0Zyb21DdXJzb3JXaW5kb3coY3Vyc29yTWluWFZhbHVlLCBjdXJzb3JNYXhYVmFsdWUsIGN1cnNvcjFEYXRhLnkpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fYXZhaWxhYmxlVmFsdWVzLnlEaWZmID0gKGN1cnNvcjJEYXRhLnktY3Vyc29yMURhdGEueSkudG9QcmVjaXNpb24oMTcpO1xyXG4gICAgICAgICAgICB0aGlzLl9hdmFpbGFibGVWYWx1ZXMudERpZmYgPSAoY3Vyc29yMkRhdGEueC1jdXJzb3IxRGF0YS54KS50b1ByZWNpc2lvbig2KTtcclxuICAgICAgICAgICAgdGhpcy5fYXZhaWxhYmxlVmFsdWVzLnlNZWFuID0gc2lnbmFsSW5mb3MueU1lYW4udG9QcmVjaXNpb24oMTcpO1xyXG4gICAgICAgICAgICB0aGlzLl9hdmFpbGFibGVWYWx1ZXMueVN0RCA9IHNpZ25hbEluZm9zLnlTdEQudG9QcmVjaXNpb24oMTcpO1xyXG4gICAgICAgICAgICB0aGlzLl9hdmFpbGFibGVWYWx1ZXMueVZhciA9IHNpZ25hbEluZm9zLnlWYXIudG9QcmVjaXNpb24oMTcpO1xyXG4gICAgICAgICAgICB0aGlzLl9hdmFpbGFibGVWYWx1ZXMueVJtcyA9IHNpZ25hbEluZm9zLnlSbXMudG9QcmVjaXNpb24oMTcpO1xyXG4gICAgICAgICAgICB0aGlzLl9hdmFpbGFibGVWYWx1ZXMueU1pbmltdW0gPSBzaWduYWxJbmZvcy55TWluaW11bS50b1ByZWNpc2lvbigxNyk7XHJcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVZhbHVlcy55TWF4aW11bSA9IHNpZ25hbEluZm9zLnlNYXhpbXVtLnRvUHJlY2lzaW9uKDE3KTtcclxuICAgICAgICAgICAgdGhpcy5fYXZhaWxhYmxlVmFsdWVzLnlQcCA9IChzaWduYWxJbmZvcy55TWF4aW11bSAtIHNpZ25hbEluZm9zLnlNaW5pbXVtKS50b1ByZWNpc2lvbigxNyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVZhbHVlcy55RGlmZiA9IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICB0aGlzLl9hdmFpbGFibGVWYWx1ZXMudERpZmYgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVZhbHVlcy55TWVhbiA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgdGhpcy5fYXZhaWxhYmxlVmFsdWVzLnlTdEQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVZhbHVlcy55VmFyID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB0aGlzLl9hdmFpbGFibGVWYWx1ZXMueVJtcyA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgdGhpcy5fYXZhaWxhYmxlVmFsdWVzLnlNaW5pbXVtID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB0aGlzLl9hdmFpbGFibGVWYWx1ZXMueU1heGltdW0gPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVZhbHVlcy55UHAgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IGN1cnNvciBpbmZvcm1hdGlvbnNcclxuICAgICAqIFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gY3Vyc29ySW5mb1xyXG4gICAgICogQG1lbWJlcm9mIFlUQ3Vyc29yU2lnbmFsXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0Q3Vyc29ySW5mbyhjdXJzb3JJbmZvOiBDdXJzb3JJbmZvKXtcclxuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLl9hdmFpbGFibGVWYWx1ZXNbY3Vyc29ySW5mby5pZF07XHJcbiAgICAgICAgaWYodmFsdWUgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdmFsdWUgPSBJbmZvVmFsdWVzLnVuZGVmaW5lZFRleHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGN1cnNvckluZm8udmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxuICBcclxuICAgIHByaXZhdGUgZ2V0U2lnbmFsSW5mb3NGcm9tQ3Vyc29yV2luZG93KGN1cnNvck1pblhWYWx1ZTogbnVtYmVyLCBjdXJzb3JNYXhYVmFsdWU6IG51bWJlciwgZGVmYXVsdFlWYWx1ZSk6IGFueXtcclxuICAgICAgICBsZXQgeVNlbGVjdGVkVmFsdWVzOiBBcnJheTxudW1iZXI+ID0gW107XHJcbiAgICAgICAgZm9yKGxldCBjb3VudGVyID0gMDsgY291bnRlciA8IHRoaXMuX3NlcmllLnJhd1BvaW50cy5sZW5ndGg7IGNvdW50ZXIrKyl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX3NlcmllLnJhd1BvaW50c1tjb3VudGVyXS54ID49IGN1cnNvck1pblhWYWx1ZSAmJiB0aGlzLl9zZXJpZS5yYXdQb2ludHNbY291bnRlcl0ueCA8PSBjdXJzb3JNYXhYVmFsdWUpe1xyXG4gICAgICAgICAgICAgICAgeVNlbGVjdGVkVmFsdWVzLnB1c2godGhpcy5fc2VyaWUucmF3UG9pbnRzW2NvdW50ZXJdLnkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3N1bS5kYXRhID0geVNlbGVjdGVkVmFsdWVzO1xyXG4gICAgICAgIHRoaXMuX3Jtcy5kYXRhID0geVNlbGVjdGVkVmFsdWVzO1xyXG4gICAgICAgIHRoaXMuX21lYW4uZGF0YSA9IHlTZWxlY3RlZFZhbHVlcztcclxuICAgICAgICB0aGlzLl9zdGQuZGF0YSA9IHlTZWxlY3RlZFZhbHVlcztcclxuICAgICAgICB0aGlzLl9tYXguZGF0YSA9IHlTZWxlY3RlZFZhbHVlcztcclxuICAgICAgICB0aGlzLl9taW4uZGF0YSA9IHlTZWxlY3RlZFZhbHVlcztcclxuXHJcbiAgICAgICAgbGV0IG1lYW4gPSB0aGlzLl9tZWFuLmNhbGN1bGF0ZSgpO1xyXG4gICAgICAgIHRoaXMuX3N0ZC5tZWFuID0gbWVhbjtcclxuICAgICAgICBsZXQgeVN0ZCA9IHRoaXMuX3N0ZC5jYWxjdWxhdGUoKTtcclxuICAgICAgICB0aGlzLl92YXIuZGF0YSA9IHlTdGQ7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHlTdW06IHRoaXMuX3N1bS5jYWxjdWxhdGUoKSwgXHJcbiAgICAgICAgICAgIHlSbXM6IHRoaXMuX3Jtcy5jYWxjdWxhdGUoKSxcclxuICAgICAgICAgICAgeU1pbmltdW06IHRoaXMuX21pbi5jYWxjdWxhdGUoKSwgXHJcbiAgICAgICAgICAgIHlNYXhpbXVtOiB0aGlzLl9tYXguY2FsY3VsYXRlKCksXHJcbiAgICAgICAgICAgIHlNZWFuOiBtZWFuLFxyXG4gICAgICAgICAgICB5U3REOiB5U3RkLCBcclxuICAgICAgICAgICAgeVZhcjogdGhpcy5fdmFyLmNhbGN1bGF0ZSgpfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHByb3ZpZGVzIGFsbCBhdmFpbGFibGUgY3Vyc29yIGluZm9zXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0FycmF5PEN1cnNvckRpc3BsYXlJbmZvQ2xhc3M+fVxyXG4gICAgICogQG1lbWJlcm9mIFlUQ3Vyc29yU2lnbmFsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRBbGxDdXJzb3JJbmZvICgpOiBBcnJheTxDdXJzb3JEaXNwbGF5SW5mb0NsYXNzPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnNvclNpZ25hbERlc2NyaXB0b3IuZ2V0QWxsQ3Vyc29ySW5mbygpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBJbmZvVmFsdWVze1xyXG4gICAgLy8gVGhpcyBwcm9wZXJ0aWVzIG11c3QgaGF2ZSB0aGUgc2FtZSBuYW1lIGFzIHRoZSBpZHMgZGVmaW5lZCBpbiB0aGUgQ3Vyc29yU2lnbmFsIGNsYXNzIChlLmcuIGN1cnNvckluZm9JZF95MSA9IFwieTFcIjspXHJcbiAgICBwdWJsaWMgeTE6IHN0cmluZ3x1bmRlZmluZWQ7XHJcbiAgICBwdWJsaWMgeTI6IHN0cmluZ3x1bmRlZmluZWQ7XHJcbiAgICBwdWJsaWMgdDE6IHN0cmluZ3x1bmRlZmluZWQ7XHJcbiAgICBwdWJsaWMgdDI6IHN0cmluZ3x1bmRlZmluZWQ7XHJcbiAgICBwdWJsaWMgeURpZmY6IHN0cmluZ3x1bmRlZmluZWQ7XHJcbiAgICBwdWJsaWMgdERpZmY6IHN0cmluZ3x1bmRlZmluZWQ7XHJcbiAgICBwdWJsaWMgeU1lYW46IHN0cmluZ3x1bmRlZmluZWQ7XHJcbiAgICBwdWJsaWMgeVN0RDogc3RyaW5nfHVuZGVmaW5lZDtcclxuICAgIHB1YmxpYyB5VmFyOiBzdHJpbmd8dW5kZWZpbmVkO1xyXG4gICAgcHVibGljIHlSbXM6IHN0cmluZ3x1bmRlZmluZWQ7XHJcbiAgICBwdWJsaWMgeU1pbmltdW06IHN0cmluZ3x1bmRlZmluZWQ7XHJcbiAgICBwdWJsaWMgeU1heGltdW06IHN0cmluZ3x1bmRlZmluZWQ7XHJcbiAgICBwdWJsaWMgeVBwOiBzdHJpbmd8dW5kZWZpbmVkO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgdW5kZWZpbmVkVGV4dDogc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMueTEgPSBJbmZvVmFsdWVzLnVuZGVmaW5lZFRleHQ7XHJcbiAgICAgICAgdGhpcy55MiA9IEluZm9WYWx1ZXMudW5kZWZpbmVkVGV4dDtcclxuICAgICAgICB0aGlzLnQxID0gSW5mb1ZhbHVlcy51bmRlZmluZWRUZXh0O1xyXG4gICAgICAgIHRoaXMudDIgPSBJbmZvVmFsdWVzLnVuZGVmaW5lZFRleHQ7XHJcbiAgICAgICAgdGhpcy55RGlmZiA9IEluZm9WYWx1ZXMudW5kZWZpbmVkVGV4dDtcclxuICAgICAgICB0aGlzLnREaWZmID0gSW5mb1ZhbHVlcy51bmRlZmluZWRUZXh0O1xyXG4gICAgICAgIHRoaXMueU1lYW4gPSBJbmZvVmFsdWVzLnVuZGVmaW5lZFRleHQ7XHJcbiAgICAgICAgdGhpcy55U3REID0gSW5mb1ZhbHVlcy51bmRlZmluZWRUZXh0O1xyXG4gICAgICAgIHRoaXMueVZhciA9IEluZm9WYWx1ZXMudW5kZWZpbmVkVGV4dDtcclxuICAgICAgICB0aGlzLnlSbXMgPSBJbmZvVmFsdWVzLnVuZGVmaW5lZFRleHQ7XHJcbiAgICAgICAgdGhpcy55TWluaW11bSA9IEluZm9WYWx1ZXMudW5kZWZpbmVkVGV4dDtcclxuICAgICAgICB0aGlzLnlNYXhpbXVtID0gSW5mb1ZhbHVlcy51bmRlZmluZWRUZXh0O1xyXG4gICAgICAgIHRoaXMueVBwID0gSW5mb1ZhbHVlcy51bmRlZmluZWRUZXh0O1xyXG4gICAgfVxyXG59Il19