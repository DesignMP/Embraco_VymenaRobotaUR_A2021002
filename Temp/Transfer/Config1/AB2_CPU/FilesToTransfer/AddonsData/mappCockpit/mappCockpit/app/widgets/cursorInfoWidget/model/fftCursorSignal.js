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
define(["require", "exports", "../../../common/math/sum", "../../../common/math/mean", "../../../common/math/standardDeviation", "../../../common/math/variance", "../../../common/math/min", "../../../common/math/max", "../../../common/math/rms", "./cursorSignal", "./fftCursorSignalDescriptor"], function (require, exports, sum_1, mean_1, standardDeviation_1, variance_1, min_1, max_1, rms_1, cursorSignal_1, fftCursorSignalDescriptor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FFTCursorSignal = /** @class */ (function (_super) {
        __extends(FFTCursorSignal, _super);
        /**
         * Creates an instance of FFtCursorSignal
         * @param {BaseSeries} serie
         * @memberof FFtCursorSignal
         */
        function FFTCursorSignal(serie, expandState, cursorInfo) {
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
            // create specific cursor signal desriptor
            _this._cursorSignalDescriptor = new fftCursorSignalDescriptor_1.FFTCursorSignalDescriptor(cursorInfo);
            return _this;
        }
        /**
         * Updates the cursor value informations for the given cursors
         *
         * @param {IPoint} cursorData1
         * @param {IPoint} cursorData2
         * @param {number} time1
         * @param {number} time2
         * @memberof FFtCursorSignal
         */
        FFTCursorSignal.prototype.updateValues = function (cursorData1, cursorData2, time1, time2) {
            var _this = this;
            this.updateSimpleValues(cursorData1, cursorData2, time1, time2);
            this.updateCalculatedValues(cursorData1, cursorData2);
            this.cursorInfos.forEach(function (cursorInfo) {
                _this.setCursorInfo(cursorInfo);
            });
        };
        FFTCursorSignal.prototype.updateSimpleValues = function (cursor1Data, cursor2Data, time1, time2) {
            if (cursor1Data != undefined && cursor1Data.y != undefined && time1 != undefined) {
                // Set cursor 1 infos
                this._availableValues.y1 = cursor1Data.y.toPrecision(17);
                this._availableValues.f1 = cursor1Data.x.toPrecision(6);
            }
            else {
                this._availableValues.y1 = undefined;
                this._availableValues.f1 = undefined;
            }
            if (cursor2Data != undefined && cursor2Data.y != undefined && time2 != undefined) {
                // Set cursor 1 infos
                this._availableValues.y2 = cursor2Data.y.toPrecision(17);
                this._availableValues.f2 = cursor2Data.x.toPrecision(6);
            }
            else {
                this._availableValues.y2 = undefined;
                this._availableValues.f2 = undefined;
            }
        };
        FFTCursorSignal.prototype.updateCalculatedValues = function (cursor1Data, cursor2Data) {
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
                this._availableValues.fDiff = (cursor2Data.x - cursor1Data.x).toPrecision(6);
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
                this._availableValues.fDiff = undefined;
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
         * @memberof FFtCursorSignal
         */
        FFTCursorSignal.prototype.setCursorInfo = function (cursorInfo) {
            var value = this._availableValues[cursorInfo.id];
            if (value == undefined) {
                value = InfoValues.undefinedText;
            }
            cursorInfo.value = value;
        };
        FFTCursorSignal.prototype.getSignalInfosFromCursorWindow = function (cursorMinXValue, cursorMaxXValue, defaultYValue) {
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
         * @memberof FFtCursorSignal
         */
        FFTCursorSignal.prototype.getAllCursorInfo = function () {
            return this._cursorSignalDescriptor.getAllCursorInfo();
        };
        return FFTCursorSignal;
    }(cursorSignal_1.CursorSignal));
    exports.FFTCursorSignal = FFTCursorSignal;
    var InfoValues = /** @class */ (function () {
        function InfoValues() {
            this.y1 = InfoValues.undefinedText;
            this.y2 = InfoValues.undefinedText;
            this.f1 = InfoValues.undefinedText;
            this.f2 = InfoValues.undefinedText;
            this.yDiff = InfoValues.undefinedText;
            this.fDiff = InfoValues.undefinedText;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmZ0Q3Vyc29yU2lnbmFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2N1cnNvckluZm9XaWRnZXQvbW9kZWwvZmZ0Q3Vyc29yU2lnbmFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlQTtRQUFxQyxtQ0FBWTtRQVk3Qzs7OztXQUlHO1FBQ0gseUJBQVksS0FBaUIsRUFBRSxXQUFvQixFQUFFLFVBQW1DO1lBQXhGLFlBQ0ksa0JBQU0sS0FBSyxFQUFFLFdBQVcsQ0FBQyxTQUk1QjtZQXBCRCwrREFBK0Q7WUFDdkQsc0JBQWdCLEdBQWUsSUFBSSxVQUFVLEVBQUUsQ0FBQztZQUNoRCxVQUFJLEdBQUcsSUFBSSxTQUFHLEVBQUUsQ0FBQztZQUNqQixVQUFJLEdBQUcsSUFBSSxvQkFBYyxFQUFFLENBQUM7WUFDNUIsV0FBSyxHQUFHLElBQUksV0FBSSxFQUFFLENBQUM7WUFDbkIsVUFBSSxHQUFHLElBQUkscUNBQWlCLEVBQUUsQ0FBQztZQUMvQixVQUFJLEdBQUcsSUFBSSxtQkFBUSxFQUFFLENBQUM7WUFDdEIsVUFBSSxHQUFHLElBQUksU0FBRyxFQUFFLENBQUM7WUFDakIsVUFBSSxHQUFHLElBQUksU0FBRyxFQUFFLENBQUM7WUFVckIsMENBQTBDO1lBQzFDLEtBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLHFEQUF5QixDQUFDLFVBQVUsQ0FBQyxDQUFDOztRQUM3RSxDQUFDO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDSSxzQ0FBWSxHQUFuQixVQUFvQixXQUFtQixFQUFFLFdBQW1CLEVBQUUsS0FBYSxFQUFFLEtBQWE7WUFBMUYsaUJBTUM7WUFMRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDaEUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMs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VSxDQUFDLGFBQWEsQ0FBQztZQUNuQyxJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUM7WUFDdEMsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsYUFBYSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQztZQUN0QyxJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUM7WUFDckMsSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsYUFBYSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQztZQUNyQyxJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUM7WUFDekMsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUMsYUFBYSxDQUFDO1lBQ3pDLElBQUksQ0FBQyxHQUFHLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQztRQUN4QyxDQUFDO1FBaEJzQix3QkFBYSxHQUFXLEVBQUUsQ0FBQztRQWlCdEQsaUJBQUM7S0FBQSxBQWpDRCxJQWlDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElQb2ludCB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY29tbW9uL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU3VtIH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL21hdGgvc3VtJztcclxuaW1wb3J0IHsgTWVhbiB9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi9tYXRoL21lYW4nO1xyXG5pbXBvcnQgeyBTdGFuZGFyZERldmlhdGlvbiB9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi9tYXRoL3N0YW5kYXJkRGV2aWF0aW9uJztcclxuaW1wb3J0IHsgVmFyaWFuY2UgfSBmcm9tICcuLi8uLi8uLi9jb21tb24vbWF0aC92YXJpYW5jZSc7XHJcbmltcG9ydCB7IE1pbiB9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi9tYXRoL21pbic7XHJcbmltcG9ydCB7IE1heCB9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi9tYXRoL21heCc7XHJcbmltcG9ydCB7IFJvb3RNZWFuU3F1YXJlIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9tYXRoL3Jtc1wiO1xyXG5pbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvYmFzZVNlcmllc1wiO1xyXG5pbXBvcnQgeyBDdXJzb3JTaWduYWwgfSBmcm9tIFwiLi9jdXJzb3JTaWduYWxcIjtcclxuaW1wb3J0IHsgQ3Vyc29yRGlzcGxheUluZm9DbGFzcyB9IGZyb20gXCIuL2R5bmFtaWNDdXJzb3JTaWduYWxUZW1wbGF0ZVwiO1xyXG5pbXBvcnQgeyBGRlRDdXJzb3JTaWduYWxEZXNjcmlwdG9yIH0gZnJvbSBcIi4vZmZ0Q3Vyc29yU2lnbmFsRGVzY3JpcHRvclwiO1xyXG5pbXBvcnQgeyBDdXJzb3JJbmZvIH0gZnJvbSBcIi4vY3Vyc29ySW5mb1wiO1xyXG5pbXBvcnQgeyBDdXJzb3JJbmZvVmlzaWJpbGl0eSB9IGZyb20gXCIuL2N1cnNvckluZm9WaXNpYmlsaXR5XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRkZUQ3Vyc29yU2lnbmFsIGV4dGVuZHMgQ3Vyc29yU2lnbmFse1xyXG5cclxuICAgIC8vIHJlcHJlc2VudHMgYWxsIGF2YWlsYWJsZSB2YWx1ZXMgZm9yIHRoZSBhY3R1YWwgZ2l2ZW4gY3Vyc29yc1xyXG4gICAgcHJpdmF0ZSBfYXZhaWxhYmxlVmFsdWVzOiBJbmZvVmFsdWVzID0gbmV3IEluZm9WYWx1ZXMoKTtcclxuICAgIHByaXZhdGUgX3N1bSA9IG5ldyBTdW0oKTtcclxuICAgIHByaXZhdGUgX3JtcyA9IG5ldyBSb290TWVhblNxdWFyZSgpO1xyXG4gICAgcHJpdmF0ZSBfbWVhbiA9IG5ldyBNZWFuKCk7XHJcbiAgICBwcml2YXRlIF9zdGQgPSBuZXcgU3RhbmRhcmREZXZpYXRpb24oKTtcclxuICAgIHByaXZhdGUgX3ZhciA9IG5ldyBWYXJpYW5jZSgpO1xyXG4gICAgcHJpdmF0ZSBfbWluID0gbmV3IE1pbigpO1xyXG4gICAgcHJpdmF0ZSBfbWF4ID0gbmV3IE1heCgpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBGRnRDdXJzb3JTaWduYWxcclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVcclxuICAgICAqIEBtZW1iZXJvZiBGRnRDdXJzb3JTaWduYWxcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Ioc2VyaWU6IEJhc2VTZXJpZXMsIGV4cGFuZFN0YXRlOiBib29sZWFuLCBjdXJzb3JJbmZvPzogQ3Vyc29ySW5mb1Zpc2liaWxpdHlbXSl7XHJcbiAgICAgICAgc3VwZXIoc2VyaWUsIGV4cGFuZFN0YXRlKTtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIHNwZWNpZmljIGN1cnNvciBzaWduYWwgZGVzcmlwdG9yXHJcbiAgICAgICAgdGhpcy5fY3Vyc29yU2lnbmFsRGVzY3JpcHRvciA9IG5ldyBGRlRDdXJzb3JTaWduYWxEZXNjcmlwdG9yKGN1cnNvckluZm8pOyAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGN1cnNvciB2YWx1ZSBpbmZvcm1hdGlvbnMgZm9yIHRoZSBnaXZlbiBjdXJzb3JzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJUG9pbnR9IGN1cnNvckRhdGExXHJcbiAgICAgKiBAcGFyYW0ge0lQb2ludH0gY3Vyc29yRGF0YTJcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lMVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWUyXHJcbiAgICAgKiBAbWVtYmVyb2YgRkZ0Q3Vyc29yU2lnbmFsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB1cGRhdGVWYWx1ZXMoY3Vyc29yRGF0YTE6IElQb2ludCwgY3Vyc29yRGF0YTI6IElQb2ludCwgdGltZTE6IG51bWJlciwgdGltZTI6IG51bWJlcil7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTaW1wbGVWYWx1ZXMoY3Vyc29yRGF0YTEsIGN1cnNvckRhdGEyLCB0aW1lMSwgdGltZTIpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlQ2FsY3VsYXRlZFZhbHVlcyhjdXJzb3JEYXRhMSwgY3Vyc29yRGF0YTIpO1xyXG4gICAgICAgIHRoaXMuY3Vyc29ySW5mb3MuZm9yRWFjaChjdXJzb3JJbmZvID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXRDdXJzb3JJbmZvKGN1cnNvckluZm8pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVTaW1wbGVWYWx1ZXMoY3Vyc29yMURhdGE6IElQb2ludCwgY3Vyc29yMkRhdGE6IElQb2ludCwgdGltZTE6IG51bWJlciwgdGltZTI6IG51bWJlcil7XHJcbiAgICAgICAgaWYoY3Vyc29yMURhdGEgIT0gdW5kZWZpbmVkICYmIGN1cnNvcjFEYXRhLnkgIT0gdW5kZWZpbmVkICYmIHRpbWUxICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIFNldCBjdXJzb3IgMSBpbmZvc1xyXG4gICAgICAgICAgICB0aGlzLl9hdmFpbGFibGVWYWx1ZXMueTEgPSBjdXJzb3IxRGF0YS55LnRvUHJlY2lzaW9uKDE3KTtcclxuICAgICAgICAgICAgdGhpcy5fYXZhaWxhYmxlVmFsdWVzLmYxID0gY3Vyc29yMURhdGEueC50b1ByZWNpc2lvbig2KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fYXZhaWxhYmxlVmFsdWVzLnkxID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB0aGlzLl9hdmFpbGFibGVWYWx1ZXMuZjEgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGN1cnNvcjJEYXRhICE9IHVuZGVmaW5lZCAmJiBjdXJzb3IyRGF0YS55ICE9IHVuZGVmaW5lZCAmJiB0aW1lMiAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAvLyBTZXQgY3Vyc29yIDEgaW5mb3NcclxuICAgICAgICAgICAgdGhpcy5fYXZhaWxhYmxlVmFsdWVzLnkyID0gY3Vyc29yMkRhdGEueS50b1ByZWNpc2lvbigxNyk7XHJcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVZhbHVlcy5mMiA9IGN1cnNvcjJEYXRhLngudG9QcmVjaXNpb24oNik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVZhbHVlcy55MiA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgdGhpcy5fYXZhaWxhYmxlVmFsdWVzLmYyID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZUNhbGN1bGF0ZWRWYWx1ZXMoY3Vyc29yMURhdGE6IElQb2ludCwgY3Vyc29yMkRhdGE6IElQb2ludCl7XHJcbiAgICAgICAgaWYoY3Vyc29yMURhdGEgIT0gdW5kZWZpbmVkICYmIGN1cnNvcjFEYXRhLnkgIT0gdW5kZWZpbmVkICYmIGN1cnNvcjJEYXRhICE9IHVuZGVmaW5lZCAmJiBjdXJzb3IyRGF0YS55ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGxldCBjdXJzb3JNaW5YVmFsdWUgPSBjdXJzb3IxRGF0YS54O1xyXG4gICAgICAgICAgICBsZXQgY3Vyc29yTWF4WFZhbHVlID0gY3Vyc29yMkRhdGEueDtcclxuICAgICAgICAgICAgaWYoY3Vyc29yTWluWFZhbHVlID4gY3Vyc29yTWF4WFZhbHVlKXtcclxuICAgICAgICAgICAgICAgIC8vIENoYW5nZSBtaW4gYW5kIG1heCB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgbGV0IHRlbXBYVmFsdWUgPSBjdXJzb3JNYXhYVmFsdWU7XHJcbiAgICAgICAgICAgICAgICBjdXJzb3JNYXhYVmFsdWUgPSBjdXJzb3JNaW5YVmFsdWU7XHJcbiAgICAgICAgICAgICAgICBjdXJzb3JNaW5YVmFsdWUgPSB0ZW1wWFZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgc2lnbmFsSW5mb3MgPSB0aGlzLmdldFNpZ25hbEluZm9zRnJvbUN1cnNvcldpbmRvdyhjdXJzb3JNaW5YVmFsdWUsIGN1cnNvck1heFhWYWx1ZSwgY3Vyc29yMURhdGEueSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9hdmFpbGFibGVWYWx1ZXMueURpZmYgPSAoY3Vyc29yMkRhdGEueS1jdXJzb3IxRGF0YS55KS50b1ByZWNpc2lvbigxNyk7XHJcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVZhbHVlcy5mRGlmZiA9IChjdXJzb3IyRGF0YS54LWN1cnNvcjFEYXRhLngpLnRvUHJlY2lzaW9uKDYpO1xyXG4gICAgICAgICAgICB0aGlzLl9hdmFpbGFibGVWYWx1ZXMueU1lYW4gPSBzaWduYWxJbmZvcy55TWVhbi50b1ByZWNpc2lvbigxNyk7XHJcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVZhbHVlcy55U3REID0gc2lnbmFsSW5mb3MueVN0RC50b1ByZWNpc2lvbigxNyk7XHJcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVZhbHVlcy55VmFyID0gc2lnbmFsSW5mb3MueVZhci50b1ByZWNpc2lvbigxNyk7XHJcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVZhbHVlcy55Um1zID0gc2lnbmFsSW5mb3MueVJtcy50b1ByZWNpc2lvbigxNyk7XHJcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVZhbHVlcy55TWluaW11bSA9IHNpZ25hbEluZm9zLnlNaW5pbXVtLnRvUHJlY2lzaW9uKDE3KTtcclxuICAgICAgICAgICAgdGhpcy5fYXZhaWxhYmxlVmFsdWVzLnlNYXhpbXVtID0gc2lnbmFsSW5mb3MueU1heGltdW0udG9QcmVjaXNpb24oMTcpO1xyXG4gICAgICAgICAgICB0aGlzLl9hdmFpbGFibGVWYWx1ZXMueVBwID0gKHNpZ25hbEluZm9zLnlNYXhpbXVtIC0gc2lnbmFsSW5mb3MueU1pbmltdW0pLnRvUHJlY2lzaW9uKDE3KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fYXZhaWxhYmxlVmFsdWVzLnlEaWZmID0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVZhbHVlcy5mRGlmZiA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgdGhpcy5fYXZhaWxhYmxlVmFsdWVzLnlNZWFuID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB0aGlzLl9hdmFpbGFibGVWYWx1ZXMueVN0RCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgdGhpcy5fYXZhaWxhYmxlVmFsdWVzLnlWYXIgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVZhbHVlcy55Um1zID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB0aGlzLl9hdmFpbGFibGVWYWx1ZXMueU1pbmltdW0gPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVZhbHVlcy55TWF4aW11bSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgdGhpcy5fYXZhaWxhYmxlVmFsdWVzLnlQcCA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgY3Vyc29yIGluZm9ybWF0aW9uc1xyXG4gICAgICogXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBjdXJzb3JJbmZvXHJcbiAgICAgKiBAbWVtYmVyb2YgRkZ0Q3Vyc29yU2lnbmFsXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0Q3Vyc29ySW5mbyhjdXJzb3JJbmZvOiBDdXJzb3JJbmZvKXtcclxuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLl9hdmFpbGFibGVWYWx1ZXNbY3Vyc29ySW5mby5pZF07XHJcbiAgICAgICAgaWYodmFsdWUgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdmFsdWUgPSBJbmZvVmFsdWVzLnVuZGVmaW5lZFRleHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGN1cnNvckluZm8udmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxuICBcclxuICAgIHByaXZhdGUgZ2V0U2lnbmFsSW5mb3NGcm9tQ3Vyc29yV2luZG93KGN1cnNvck1pblhWYWx1ZTogbnVtYmVyLCBjdXJzb3JNYXhYVmFsdWU6IG51bWJlciwgZGVmYXVsdFlWYWx1ZSk6IGFueXtcclxuICAgICAgICBsZXQgeVNlbGVjdGVkVmFsdWVzOiBBcnJheTxudW1iZXI+ID0gW107XHJcbiAgICAgICAgZm9yKGxldCBjb3VudGVyID0gMDsgY291bnRlciA8IHRoaXMuX3NlcmllLnJhd1BvaW50cy5sZW5ndGg7IGNvdW50ZXIrKyl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX3NlcmllLnJhd1BvaW50c1tjb3VudGVyXS54ID49IGN1cnNvck1pblhWYWx1ZSAmJiB0aGlzLl9zZXJpZS5yYXdQb2ludHNbY291bnRlcl0ueCA8PSBjdXJzb3JNYXhYVmFsdWUpe1xyXG4gICAgICAgICAgICAgICAgeVNlbGVjdGVkVmFsdWVzLnB1c2godGhpcy5fc2VyaWUucmF3UG9pbnRzW2NvdW50ZXJdLnkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3N1bS5kYXRhID0geVNlbGVjdGVkVmFsdWVzO1xyXG4gICAgICAgIHRoaXMuX3Jtcy5kYXRhID0geVNlbGVjdGVkVmFsdWVzO1xyXG4gICAgICAgIHRoaXMuX21lYW4uZGF0YSA9IHlTZWxlY3RlZFZhbHVlcztcclxuICAgICAgICB0aGlzLl9zdGQuZGF0YSA9IHlTZWxlY3RlZFZhbHVlcztcclxuICAgICAgICB0aGlzLl9tYXguZGF0YSA9IHlTZWxlY3RlZFZhbHVlcztcclxuICAgICAgICB0aGlzLl9taW4uZGF0YSA9IHlTZWxlY3RlZFZhbHVlcztcclxuXHJcbiAgICAgICAgbGV0IG1lYW4gPSB0aGlzLl9tZWFuLmNhbGN1bGF0ZSgpO1xyXG4gICAgICAgIHRoaXMuX3N0ZC5tZWFuID0gbWVhbjtcclxuICAgICAgICBsZXQgeVN0ZCA9IHRoaXMuX3N0ZC5jYWxjdWxhdGUoKTtcclxuICAgICAgICB0aGlzLl92YXIuZGF0YSA9IHlTdGQ7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHlTdW06IHRoaXMuX3N1bS5jYWxjdWxhdGUoKSwgXHJcbiAgICAgICAgICAgIHlSbXM6IHRoaXMuX3Jtcy5jYWxjdWxhdGUoKSxcclxuICAgICAgICAgICAgeU1pbmltdW06IHRoaXMuX21pbi5jYWxjdWxhdGUoKSwgXHJcbiAgICAgICAgICAgIHlNYXhpbXVtOiB0aGlzLl9tYXguY2FsY3VsYXRlKCksXHJcbiAgICAgICAgICAgIHlNZWFuOiBtZWFuLFxyXG4gICAgICAgICAgICB5U3REOiB5U3RkLCBcclxuICAgICAgICAgICAgeVZhcjogdGhpcy5fdmFyLmNhbGN1bGF0ZSgpfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHByb3ZpZGVzIGFsbCBhdmFpbGFibGUgY3Vyc29yIGluZm9zXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0FycmF5PEN1cnNvckRpc3BsYXlJbmZvQ2xhc3M+fVxyXG4gICAgICogQG1lbWJlcm9mIEZGdEN1cnNvclNpZ25hbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0QWxsQ3Vyc29ySW5mbyAoKTogQXJyYXk8Q3Vyc29yRGlzcGxheUluZm9DbGFzcz4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJzb3JTaWduYWxEZXNjcmlwdG9yLmdldEFsbEN1cnNvckluZm8oKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgSW5mb1ZhbHVlc3tcclxuICAgIC8vIFRoaXMgcHJvcGVydGllcyBtdXN0IGhhdmUgdGhlIHNhbWUgbmFtZSBhcyB0aGUgaWRzIGRlZmluZWQgaW4gdGhlIEN1cnNvclNpZ25hbCBjbGFzcyAoZS5nLiBjdXJzb3JJbmZvSWRfeTEgPSBcInkxXCI7KVxyXG4gICAgcHVibGljIHkxOiBzdHJpbmd8dW5kZWZpbmVkO1xyXG4gICAgcHVibGljIHkyOiBzdHJpbmd8dW5kZWZpbmVkO1xyXG4gICAgcHVibGljIGYxOiBzdHJpbmd8dW5kZWZpbmVkO1xyXG4gICAgcHVibGljIGYyOiBzdHJpbmd8dW5kZWZpbmVkO1xyXG4gICAgcHVibGljIHlEaWZmOiBzdHJpbmd8dW5kZWZpbmVkO1xyXG4gICAgcHVibGljIGZEaWZmOiBzdHJpbmd8dW5kZWZpbmVkO1xyXG4gICAgcHVibGljIHlNZWFuOiBzdHJpbmd8dW5kZWZpbmVkO1xyXG4gICAgcHVibGljIHlTdEQ6IHN0cmluZ3x1bmRlZmluZWQ7XHJcbiAgICBwdWJsaWMgeVZhcjogc3RyaW5nfHVuZGVmaW5lZDtcclxuICAgIHB1YmxpYyB5Um1zOiBzdHJpbmd8dW5kZWZpbmVkO1xyXG4gICAgcHVibGljIHlNaW5pbXVtOiBzdHJpbmd8dW5kZWZpbmVkO1xyXG4gICAgcHVibGljIHlNYXhpbXVtOiBzdHJpbmd8dW5kZWZpbmVkO1xyXG4gICAgcHVibGljIHlQcDogc3RyaW5nfHVuZGVmaW5lZDtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IHVuZGVmaW5lZFRleHQ6IHN0cmluZyA9IFwiXCI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLnkxID0gSW5mb1ZhbHVlcy51bmRlZmluZWRUZXh0O1xyXG4gICAgICAgIHRoaXMueTIgPSBJbmZvVmFsdWVzLnVuZGVmaW5lZFRleHQ7XHJcbiAgICAgICAgdGhpcy5mMSA9IEluZm9WYWx1ZXMudW5kZWZpbmVkVGV4dDtcclxuICAgICAgICB0aGlzLmYyID0gSW5mb1ZhbHVlcy51bmRlZmluZWRUZXh0O1xyXG4gICAgICAgIHRoaXMueURpZmYgPSBJbmZvVmFsdWVzLnVuZGVmaW5lZFRleHQ7XHJcbiAgICAgICAgdGhpcy5mRGlmZiA9IEluZm9WYWx1ZXMudW5kZWZpbmVkVGV4dDtcclxuICAgICAgICB0aGlzLnlNZWFuID0gSW5mb1ZhbHVlcy51bmRlZmluZWRUZXh0O1xyXG4gICAgICAgIHRoaXMueVN0RCA9IEluZm9WYWx1ZXMudW5kZWZpbmVkVGV4dDtcclxuICAgICAgICB0aGlzLnlWYXIgPSBJbmZvVmFsdWVzLnVuZGVmaW5lZFRleHQ7XHJcbiAgICAgICAgdGhpcy55Um1zID0gSW5mb1ZhbHVlcy51bmRlZmluZWRUZXh0O1xyXG4gICAgICAgIHRoaXMueU1pbmltdW0gPSBJbmZvVmFsdWVzLnVuZGVmaW5lZFRleHQ7XHJcbiAgICAgICAgdGhpcy55TWF4aW11bSA9IEluZm9WYWx1ZXMudW5kZWZpbmVkVGV4dDtcclxuICAgICAgICB0aGlzLnlQcCA9IEluZm9WYWx1ZXMudW5kZWZpbmVkVGV4dDtcclxuICAgIH1cclxufSJdfQ==