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
define(["require", "exports", "./baseSeries", "../../widgets/chartViewWidget/chartExtensions/chartDataOptimizer", "../../common/math/mathX", "./seriesType", "../../widgets/common/states/cursorStates"], function (require, exports, baseSeries_1, chartDataOptimizer_1, mathX_1, seriesType_1, cursorStates_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var YTSeries = /** @class */ (function (_super) {
        __extends(YTSeries, _super);
        function YTSeries(signal, name, color) {
            var _this = _super.call(this, signal, name, color, cursorStates_1.CursorType.timeDomain) || this;
            _this.type = seriesType_1.SeriesType.timeSeries;
            _this.rawPoints = _this.signal.rawPoints;
            _this.updateTimestamps();
            _this.getRange();
            _this.simplifySignal(_this.rawPoints);
            return _this;
        }
        /**
         * Simplifies series data points
         *
         * @memberof YTSeries
         */
        YTSeries.prototype.simplifySignal = function (seriesPoints) {
            // retrieve x and y values
            var xValues = seriesPoints.map(function (point) { return point.x; });
            var yValues = seriesPoints.map(function (point) { return point.y; });
            // get the min max values
            var xMin = mathX_1.MathX.min(xValues);
            var xMax = mathX_1.MathX.max(xValues);
            var yMin = mathX_1.MathX.min(yValues);
            var yMax = mathX_1.MathX.max(yValues);
            // create the simplified points. For yt they are just the min max edge points for initializing the chart area. 
            var reducedSeriesPoints = [];
            reducedSeriesPoints.push(new chartDataOptimizer_1.ChartPoint(0, true, xMin, yMin));
            reducedSeriesPoints.push(new chartDataOptimizer_1.ChartPoint(1, true, xMax, yMax));
            // update simplified series with min/max yt points
            this.data = reducedSeriesPoints;
        };
        /**
         * Get max X value from a serie
         *
         * @protected
         * @returns {(number | undefined)}
         * @memberof YTSeries
         */
        YTSeries.prototype.getMaxX = function () {
            if (this.rawPoints.length > 0) {
                return this.rawPoints[this.rawPoints.length - 1].x;
            }
            return undefined;
        };
        /**
         * Get min X value from a serie
         *
         * @protected
         * @returns {(number | undefined)}
         * @memberof YTSeries
         */
        YTSeries.prototype.getMinX = function () {
            if (this.rawPoints.length > 0) {
                return this.rawPoints[0].x;
            }
            return undefined;
        };
        Object.defineProperty(YTSeries.prototype, "timestamps", {
            /**
             * gets the timestamps available in the series
             *
             * @readonly
             * @type {Array<number>}
             * @memberof baseSeries
             */
            get: function () {
                return this._timestamps;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Updates the timestamps baseon the available series
         *
         * @private
         * @memberof BaseSeries
         */
        YTSeries.prototype.updateTimestamps = function () {
            if (this.rawPoints.length > 0) {
                this._timestamps = this.rawPoints.map(function (rawPoint) { return rawPoint.x; });
            }
        };
        /**
         * Clones this serie
         *
         * @returns {BaseSeries}
         * @memberof YTSeries
         */
        YTSeries.prototype.clone = function () {
            return new YTSeries(this.signal.clone(), this.name, this.color);
        };
        return YTSeries;
    }(baseSeries_1.BaseSeries));
    exports.YTSeries = YTSeries;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWVRTZXJpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvWVRTZXJpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVFBO1FBQThCLDRCQUFVO1FBS3BDLGtCQUFZLE1BQWUsRUFBRSxJQUFZLEVBQUUsS0FBYTtZQUF4RCxZQUNJLGtCQUFNLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLHlCQUFVLENBQUMsVUFBVSxDQUFDLFNBS3BEO1lBUlEsVUFBSSxHQUFHLHVCQUFVLENBQUMsVUFBVSxDQUFDO1lBSWxDLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7WUFDdkMsS0FBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDeEIsS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2hCLEtBQUksQ0FBQyxjQUFjLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDOztRQUN4QyxDQUFDO1FBR0Q7Ozs7V0FJRztRQUNJLGlDQUFjLEdBQXJCLFVBQXNCLFlBQXFCO1lBRXZDLDBCQUEwQjtZQUMxQixJQUFNLE9BQU8sR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLFVBQUMsS0FBSyxJQUFLLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDO1lBQzlELElBQUksT0FBTyxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUMsVUFBQyxLQUFLLElBQUssT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUM7WUFFNUQseUJBQXlCO1lBQ3pCLElBQU0sSUFBSSxHQUFHLGFBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDaEMsSUFBTSxJQUFJLEdBQUcsYUFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNoQyxJQUFNLElBQUksR0FBRyxhQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2hDLElBQU0sSUFBSSxHQUFHLGFBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFaEMsK0dBQStHO1lBQy9HLElBQUksbUJBQW1CLEdBQWdCLEVBQUUsQ0FBQztZQUMxQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSwrQkFBVSxDQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDM0QsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksK0JBQVUsQ0FBQyxDQUFDLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBRTNELGtEQUFrRDtZQUNsRCxJQUFJLENBQUMsSUFBSSxHQUFJLG1CQUFtQixDQUFDO1FBQ3JDLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDTywwQkFBTyxHQUFqQjtZQUNJLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUMzQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO2FBQ3JEO1lBQ0QsT0FBTyxTQUFTLENBQUM7UUFDckIsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNPLDBCQUFPLEdBQWpCO1lBQ0ksSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQzNCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDOUI7WUFDRCxPQUFPLFNBQVMsQ0FBQTtRQUNwQixDQUFDO1FBU0Qsc0JBQVcsZ0NBQVU7WUFQckI7Ozs7OztlQU1HO2lCQUNIO2dCQUNJLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUM1QixDQUFDOzs7V0FBQTtRQUVEOzs7OztXQUtHO1FBQ08sbUNBQWdCLEdBQTFCO1lBQ0ksSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBQyxRQUFRLElBQU8sT0FBTyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDL0U7UUFDTCxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSSx3QkFBSyxHQUFaO1lBQ0ksT0FBTyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BFLENBQUM7UUFDTCxlQUFDO0lBQUQsQ0FBQyxBQXBHRCxDQUE4Qix1QkFBVSxHQW9HdkM7SUFwR1ksNEJBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJU2lnbmFsIH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL3NpZ25hbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBCYXNlU2VyaWVzfSBmcm9tIFwiLi9iYXNlU2VyaWVzXCI7XHJcbmltcG9ydCB7IENoYXJ0UG9pbnQgfSBmcm9tIFwiLi4vLi4vd2lkZ2V0cy9jaGFydFZpZXdXaWRnZXQvY2hhcnRFeHRlbnNpb25zL2NoYXJ0RGF0YU9wdGltaXplclwiO1xyXG5pbXBvcnQgeyBNYXRoWCB9IGZyb20gXCIuLi8uLi9jb21tb24vbWF0aC9tYXRoWFwiO1xyXG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbW1vbi9pbnRlcmZhY2VzL3BvaW50SW50ZXJmYWNlXCJcclxuaW1wb3J0IHsgU2VyaWVzVHlwZSB9IGZyb20gXCIuL3Nlcmllc1R5cGVcIjtcclxuaW1wb3J0IHsgQ3Vyc29yVHlwZSB9IGZyb20gXCIuLi8uLi93aWRnZXRzL2NvbW1vbi9zdGF0ZXMvY3Vyc29yU3RhdGVzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgWVRTZXJpZXMgZXh0ZW5kcyBCYXNlU2VyaWVze1xyXG5cclxuICAgIFxyXG4gICAgcmVhZG9ubHkgdHlwZSA9IFNlcmllc1R5cGUudGltZVNlcmllcztcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3Ioc2lnbmFsOiBJU2lnbmFsLCBuYW1lOiBzdHJpbmcsIGNvbG9yOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihzaWduYWwsIG5hbWUsIGNvbG9yLCBDdXJzb3JUeXBlLnRpbWVEb21haW4pO1xyXG4gICAgICAgIHRoaXMucmF3UG9pbnRzID0gdGhpcy5zaWduYWwucmF3UG9pbnRzO1xyXG4gICAgICAgIHRoaXMudXBkYXRlVGltZXN0YW1wcygpO1xyXG4gICAgICAgIHRoaXMuZ2V0UmFuZ2UoKTtcclxuICAgICAgICB0aGlzLnNpbXBsaWZ5U2lnbmFsKHRoaXMucmF3UG9pbnRzKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTaW1wbGlmaWVzIHNlcmllcyBkYXRhIHBvaW50c1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBZVFNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2ltcGxpZnlTaWduYWwoc2VyaWVzUG9pbnRzOklQb2ludFtdKSB7XHJcblxyXG4gICAgICAgIC8vIHJldHJpZXZlIHggYW5kIHkgdmFsdWVzXHJcbiAgICAgICAgY29uc3QgeFZhbHVlcyA9IHNlcmllc1BvaW50cy5tYXAoKHBvaW50KT0+eyByZXR1cm4gcG9pbnQueDt9KTtcclxuICAgICAgICBsZXQgeVZhbHVlcyA9IHNlcmllc1BvaW50cy5tYXAoKHBvaW50KT0+eyByZXR1cm4gcG9pbnQueTt9KTtcclxuXHJcbiAgICAgICAgLy8gZ2V0IHRoZSBtaW4gbWF4IHZhbHVlc1xyXG4gICAgICAgIGNvbnN0IHhNaW4gPSBNYXRoWC5taW4oeFZhbHVlcyk7XHJcbiAgICAgICAgY29uc3QgeE1heCA9IE1hdGhYLm1heCh4VmFsdWVzKTtcclxuICAgICAgICBjb25zdCB5TWluID0gTWF0aFgubWluKHlWYWx1ZXMpO1xyXG4gICAgICAgIGNvbnN0IHlNYXggPSBNYXRoWC5tYXgoeVZhbHVlcyk7XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgc2ltcGxpZmllZCBwb2ludHMuIEZvciB5dCB0aGV5IGFyZSBqdXN0IHRoZSBtaW4gbWF4IGVkZ2UgcG9pbnRzIGZvciBpbml0aWFsaXppbmcgdGhlIGNoYXJ0IGFyZWEuIFxyXG4gICAgICAgIGxldCByZWR1Y2VkU2VyaWVzUG9pbnRzOkNoYXJ0UG9pbnRbXSA9IFtdO1xyXG4gICAgICAgIHJlZHVjZWRTZXJpZXNQb2ludHMucHVzaChuZXcgQ2hhcnRQb2ludCgwLHRydWUseE1pbix5TWluKSk7XHJcbiAgICAgICAgcmVkdWNlZFNlcmllc1BvaW50cy5wdXNoKG5ldyBDaGFydFBvaW50KDEsdHJ1ZSx4TWF4LHlNYXgpKTtcclxuXHJcbiAgICAgICAgLy8gdXBkYXRlIHNpbXBsaWZpZWQgc2VyaWVzIHdpdGggbWluL21heCB5dCBwb2ludHNcclxuICAgICAgICB0aGlzLmRhdGEgPSAgcmVkdWNlZFNlcmllc1BvaW50cztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBtYXggWCB2YWx1ZSBmcm9tIGEgc2VyaWVcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcmV0dXJucyB7KG51bWJlciB8IHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgWVRTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldE1heFgoKTogbnVtYmVyIHwgdW5kZWZpbmVke1xyXG4gICAgICAgIGlmICh0aGlzLnJhd1BvaW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJhd1BvaW50c1t0aGlzLnJhd1BvaW50cy5sZW5ndGggLSAxXS54XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgbWluIFggdmFsdWUgZnJvbSBhIHNlcmllXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHJldHVybnMgeyhudW1iZXIgfCB1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIFlUU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXRNaW5YKCk6IG51bWJlciB8IHVuZGVmaW5lZHtcclxuICAgICAgICBpZiAodGhpcy5yYXdQb2ludHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yYXdQb2ludHNbMF0ueDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIGdldHMgdGhlIHRpbWVzdGFtcHMgYXZhaWxhYmxlIGluIHRoZSBzZXJpZXNcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtBcnJheTxudW1iZXI+fVxyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCB0aW1lc3RhbXBzKCkgOiBBcnJheTxudW1iZXI+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdGltZXN0YW1wcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIHRpbWVzdGFtcHMgYmFzZW9uIHRoZSBhdmFpbGFibGUgc2VyaWVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBCYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCB1cGRhdGVUaW1lc3RhbXBzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnJhd1BvaW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RpbWVzdGFtcHMgPSB0aGlzLnJhd1BvaW50cy5tYXAoKHJhd1BvaW50KSA9PiB7IHJldHVybiByYXdQb2ludC54OyB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDbG9uZXMgdGhpcyBzZXJpZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtCYXNlU2VyaWVzfVxyXG4gICAgICogQG1lbWJlcm9mIFlUU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjbG9uZSgpOiBCYXNlU2VyaWVze1xyXG4gICAgICAgIHJldHVybiBuZXcgWVRTZXJpZXModGhpcy5zaWduYWwuY2xvbmUoKSwgdGhpcy5uYW1lLCB0aGlzLmNvbG9yKTtcclxuICAgIH1cclxufSJdfQ==