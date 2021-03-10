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
define(["require", "exports", "./baseSeries", "../../common/math/lineReductionAlgorithm/rdp", "../../common/math/mathX", "../../widgets/chartViewWidget/chartExtensions/chartDataOptimizer", "./seriesType", "../../widgets/common/states/cursorStates"], function (require, exports, baseSeries_1, rdp_1, mathX_1, chartDataOptimizer_1, seriesType_1, cursorStates_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var XYSeries = /** @class */ (function (_super) {
        __extends(XYSeries, _super);
        function XYSeries(signal, name, color) {
            var _this = _super.call(this, signal, name, color, cursorStates_1.CursorType.timeDomain) || this;
            _this.type = seriesType_1.SeriesType.xySeries;
            _this.rawPoints = _this.signal.rawPoints;
            _this.updateTimestamps();
            _this.getRange();
            _this.simplifySignal(_this.rawPoints);
            return _this;
        }
        /**
         * Caclulates an initial line simplification
         *
         * @param {IPoint[]} seriesPoints
         * @memberof XYSeries
         */
        XYSeries.prototype.simplifySignal = function (seriesPoints) {
            var lineOptimization = new rdp_1.RDP();
            var xValues = seriesPoints.map(function (point) { return point.x; });
            var yValues = seriesPoints.map(function (point) { return point.y; });
            var xMin = mathX_1.MathX.min(xValues);
            var xMax = mathX_1.MathX.max(xValues);
            var yMin = mathX_1.MathX.min(yValues);
            var yMax = mathX_1.MathX.max(yValues);
            // calculate series ranges
            var xRange = xMax - xMin;
            var yRange = yMax - yMin;
            // calculate unit per pixel ratios
            var xRatio = xRange / 10000;
            var yRatio = yRange / 10000;
            // the units/pixel ratio must not be 0 
            xRatio = xRatio > 0 ? xRatio : Number.MIN_VALUE;
            yRatio = yRatio > 0 ? yRatio : Number.MIN_VALUE;
            // set required simplification precision
            var precision = 1;
            // create chart points from the raw points
            var rawPoints = seriesPoints.map(function (point, i) { return new chartDataOptimizer_1.ChartPoint(i, true, point.x, point.y); });
            // calculate the reduced point set
            var reducedSeriesPoints = lineOptimization.simplify(rawPoints, precision, xRatio, yRatio, true);
            // update simplified series view points and reduction ratios
            this.data = reducedSeriesPoints;
            this.data.pixelRatioX = xRatio;
            this.data.pixelRatioY = yRatio;
        };
        /**
         * Get max X value from a serie
         *
         * @protected
         * @returns {(number | undefined)}
         * @memberof XYSeries
         */
        XYSeries.prototype.getMaxX = function () {
            var maxX;
            if (this.rawPoints.length > 0) {
                for (var i = 0; i < this.rawPoints.length; i++) {
                    if (maxX == undefined || this.rawPoints[i].x > maxX) {
                        maxX = this.rawPoints[i].x;
                    }
                }
            }
            return maxX;
        };
        /**
         * Get min X value from a serie
         *
         * @protected
         * @returns {(number | undefined)}
         * @memberof XYSeries
         */
        XYSeries.prototype.getMinX = function () {
            var minX;
            if (this.rawPoints.length > 0) {
                for (var i = 0; i < this.rawPoints.length; i++) {
                    if (minX == undefined || this.rawPoints[i].x < minX) {
                        minX = this.rawPoints[i].x;
                    }
                }
            }
            return minX;
        };
        /**
         * Clones this serie
         *
         * @returns {BaseSeries}
         * @memberof XYSeries
         */
        XYSeries.prototype.clone = function () {
            return new XYSeries(this.signal.clone(), this.name, this.color);
        };
        /**
         * Updates the timestamps baseon the available series
         *
         * @private
         * @memberof BaseSeries
         */
        XYSeries.prototype.updateTimestamps = function () {
            if (this.calculationDataInfo.inputData.length > 0) {
                // we use the x values from the input 0 as the timestamps source
                this._timestamps = this.calculationDataInfo.inputData[0].getData().map(function (inputDataPoint) { return inputDataPoint.x; });
            }
        };
        /**
         * Called whenever the seris data has changed
         *
         * @private
         * @param {IPoint[]} data
         * @memberof BaseSeries
         */
        XYSeries.prototype.onSerieDataChanged = function (seriesData) {
            if (seriesData && seriesData.length > 0) {
                this.simplifySignal(seriesData);
            }
        };
        return XYSeries;
    }(baseSeries_1.BaseSeries));
    exports.XYSeries = XYSeries;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWFlTZXJpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvWFlTZXJpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVNBO1FBQThCLDRCQUFVO1FBR3BDLGtCQUFZLE1BQWUsRUFBRSxJQUFZLEVBQUUsS0FBYTtZQUF4RCxZQUNJLGtCQUFNLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLHlCQUFVLENBQUMsVUFBVSxDQUFDLFNBS3BEO1lBUkQsVUFBSSxHQUFHLHVCQUFVLENBQUMsUUFBUSxDQUFDO1lBSXZCLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7WUFDdkMsS0FBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDeEIsS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2hCLEtBQUksQ0FBQyxjQUFjLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDOztRQUN4QyxDQUFDO1FBS0Q7Ozs7O1dBS0c7UUFDSSxpQ0FBYyxHQUFyQixVQUFzQixZQUFxQjtZQUV2QyxJQUFNLGdCQUFnQixHQUFHLElBQUksU0FBRyxFQUFFLENBQUM7WUFFbkMsSUFBTSxPQUFPLEdBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQyxVQUFDLEtBQUssSUFBSyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQztZQUM5RCxJQUFJLE9BQU8sR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLFVBQUMsS0FBSyxJQUFLLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDO1lBRTVELElBQU0sSUFBSSxHQUFHLGFBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDaEMsSUFBTSxJQUFJLEdBQUcsYUFBSyxDQUFDLEdBQUcsQ0FBQyxP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d0JBQUssR0FBWjtZQUNJLE9BQU8sSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwRSxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDTyxtQ0FBZ0IsR0FBMUI7WUFDSSxJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDL0MsZ0VBQWdFO2dCQUNoRSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxDQUFDLFVBQUMsY0FBYyxJQUFLLE9BQU8sY0FBYyxDQUFDLENBQUMsQ0FBQSxDQUFBLENBQUMsQ0FBQyxDQUFDO2FBQ3hIO1FBQ0wsQ0FBQztRQUdEOzs7Ozs7V0FNRztRQUNPLHFDQUFrQixHQUE1QixVQUE4QixVQUFvQjtZQUM5QyxJQUFHLFVBQVUsSUFBSSxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQztnQkFDbkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUNuQztRQUNMLENBQUM7UUFJTCxlQUFDO0lBQUQsQ0FBQyxBQXRJRCxDQUE4Qix1QkFBVSxHQXNJdkM7SUF0SVksNEJBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJU2lnbmFsIH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL3NpZ25hbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4vYmFzZVNlcmllc1wiO1xyXG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tIFwiLi4vY29tbW9uL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgUkRQIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9tYXRoL2xpbmVSZWR1Y3Rpb25BbGdvcml0aG0vcmRwXCI7XHJcbmltcG9ydCB7IE1hdGhYIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9tYXRoL21hdGhYXCI7XHJcbmltcG9ydCB7IENoYXJ0UG9pbnQgfSBmcm9tIFwiLi4vLi4vd2lkZ2V0cy9jaGFydFZpZXdXaWRnZXQvY2hhcnRFeHRlbnNpb25zL2NoYXJ0RGF0YU9wdGltaXplclwiO1xyXG5pbXBvcnQgeyBTZXJpZXNUeXBlIH0gZnJvbSBcIi4vc2VyaWVzVHlwZVwiO1xyXG5pbXBvcnQgeyBDdXJzb3JUeXBlIH0gZnJvbSBcIi4uLy4uL3dpZGdldHMvY29tbW9uL3N0YXRlcy9jdXJzb3JTdGF0ZXNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBYWVNlcmllcyBleHRlbmRzIEJhc2VTZXJpZXN7XHJcbiAgICB0eXBlID0gU2VyaWVzVHlwZS54eVNlcmllcztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzaWduYWw6IElTaWduYWwsIG5hbWU6IHN0cmluZywgY29sb3I6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKHNpZ25hbCwgbmFtZSwgY29sb3IsIEN1cnNvclR5cGUudGltZURvbWFpbik7XHJcbiAgICAgICAgdGhpcy5yYXdQb2ludHMgPSB0aGlzLnNpZ25hbC5yYXdQb2ludHM7XHJcbiAgICAgICAgdGhpcy51cGRhdGVUaW1lc3RhbXBzKCk7XHJcbiAgICAgICAgdGhpcy5nZXRSYW5nZSgpO1xyXG4gICAgICAgIHRoaXMuc2ltcGxpZnlTaWduYWwodGhpcy5yYXdQb2ludHMpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWNsdWxhdGVzIGFuIGluaXRpYWwgbGluZSBzaW1wbGlmaWNhdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SVBvaW50W119IHNlcmllc1BvaW50c1xyXG4gICAgICogQG1lbWJlcm9mIFhZU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzaW1wbGlmeVNpZ25hbChzZXJpZXNQb2ludHM6SVBvaW50W10pIHtcclxuXHJcbiAgICAgICAgY29uc3QgbGluZU9wdGltaXphdGlvbiA9IG5ldyBSRFAoKTtcclxuXHJcbiAgICAgICAgY29uc3QgeFZhbHVlcyA9IHNlcmllc1BvaW50cy5tYXAoKHBvaW50KT0+eyByZXR1cm4gcG9pbnQueDt9KTtcclxuICAgICAgICBsZXQgeVZhbHVlcyA9IHNlcmllc1BvaW50cy5tYXAoKHBvaW50KT0+eyByZXR1cm4gcG9pbnQueTt9KTtcclxuXHJcbiAgICAgICAgY29uc3QgeE1pbiA9IE1hdGhYLm1pbih4VmFsdWVzKTtcclxuICAgICAgICBjb25zdCB4TWF4ID0gTWF0aFgubWF4KHhWYWx1ZXMpO1xyXG4gICAgICAgIGNvbnN0IHlNaW4gPSBNYXRoWC5taW4oeVZhbHVlcyk7XHJcbiAgICAgICAgY29uc3QgeU1heCA9IE1hdGhYLm1heCh5VmFsdWVzKTtcclxuXHJcbiAgICAgICAgLy8gY2FsY3VsYXRlIHNlcmllcyByYW5nZXNcclxuICAgICAgICBjb25zdCB4UmFuZ2UgPSB4TWF4LXhNaW47XHJcbiAgICAgICAgY29uc3QgeVJhbmdlID0geU1heC15TWluO1xyXG4gICAgICAgIC8vIGNhbGN1bGF0ZSB1bml0IHBlciBwaXhlbCByYXRpb3NcclxuICAgICAgICBsZXQgeFJhdGlvID0geFJhbmdlLzEwMDAwIDsgICBcclxuICAgICAgICBsZXQgeVJhdGlvID0geVJhbmdlLzEwMDAwIDsgIFxyXG5cclxuICAgICAgICAvLyB0aGUgdW5pdHMvcGl4ZWwgcmF0aW8gbXVzdCBub3QgYmUgMCBcclxuICAgICAgICB4UmF0aW8gPSB4UmF0aW8gPiAwID8geFJhdGlvOiBOdW1iZXIuTUlOX1ZBTFVFIDsgICBcclxuICAgICAgICB5UmF0aW8gPSB5UmF0aW8gPiAwID8geVJhdGlvOiBOdW1iZXIuTUlOX1ZBTFVFIDsgIFxyXG4gICAgICAgIC8vIHNldCByZXF1aXJlZCBzaW1wbGlmaWNhdGlvbiBwcmVjaXNpb25cclxuICAgICAgICBjb25zdCBwcmVjaXNpb24gPSAxO1xyXG4gXHJcbiAgICAgICAgLy8gY3JlYXRlIGNoYXJ0IHBvaW50cyBmcm9tIHRoZSByYXcgcG9pbnRzXHJcbiAgICAgICAgbGV0IHJhd1BvaW50cyA9ICBzZXJpZXNQb2ludHMubWFwKChwb2ludCxpKT0+eyByZXR1cm4gbmV3IENoYXJ0UG9pbnQoaSx0cnVlLCBwb2ludC54LCBwb2ludC55KTsgfSk7XHJcbiAgICAgICAgLy8gY2FsY3VsYXRlIHRoZSByZWR1Y2VkIHBvaW50IHNldFxyXG4gICAgICAgIGxldCByZWR1Y2VkU2VyaWVzUG9pbnRzID0gbGluZU9wdGltaXphdGlvbi5zaW1wbGlmeShyYXdQb2ludHMscHJlY2lzaW9uLCB4UmF0aW8seVJhdGlvLCB0cnVlKTtcclxuXHJcbiAgICAgICAgLy8gdXBkYXRlIHNpbXBsaWZpZWQgc2VyaWVzIHZpZXcgcG9pbnRzIGFuZCByZWR1Y3Rpb24gcmF0aW9zXHJcbiAgICAgICAgdGhpcy5kYXRhID0gIHJlZHVjZWRTZXJpZXNQb2ludHM7XHJcbiAgICAgICAgKDxhbnk+dGhpcy5kYXRhKS5waXhlbFJhdGlvWCA9IHhSYXRpbztcclxuICAgICAgICAoPGFueT50aGlzLmRhdGEpLnBpeGVsUmF0aW9ZID0geVJhdGlvO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBtYXggWCB2YWx1ZSBmcm9tIGEgc2VyaWVcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcmV0dXJucyB7KG51bWJlciB8IHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgWFlTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldE1heFgoKTogbnVtYmVyIHwgdW5kZWZpbmVke1xyXG4gICAgICAgIGxldCBtYXhYO1xyXG4gICAgICAgIGlmICh0aGlzLnJhd1BvaW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnJhd1BvaW50cy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBpZihtYXhYID09IHVuZGVmaW5lZCB8fCB0aGlzLnJhd1BvaW50c1tpXS54ID4gbWF4WCApe1xyXG4gICAgICAgICAgICAgICAgICAgIG1heFggPSB0aGlzLnJhd1BvaW50c1tpXS54XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1heFg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgbWluIFggdmFsdWUgZnJvbSBhIHNlcmllXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHJldHVybnMgeyhudW1iZXIgfCB1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIFhZU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXRNaW5YKCk6IG51bWJlciB8IHVuZGVmaW5lZHtcclxuICAgICAgICBsZXQgbWluWDtcclxuICAgICAgICBpZiAodGhpcy5yYXdQb2ludHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5yYXdQb2ludHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgaWYobWluWCA9PSB1bmRlZmluZWQgfHwgdGhpcy5yYXdQb2ludHNbaV0ueCA8IG1pblggKXtcclxuICAgICAgICAgICAgICAgICAgICBtaW5YID0gdGhpcy5yYXdQb2ludHNbaV0ueFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtaW5YO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBcclxuICAgICAqIENsb25lcyB0aGlzIHNlcmllXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0Jhc2VTZXJpZXN9XHJcbiAgICAgKiBAbWVtYmVyb2YgWFlTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNsb25lKCk6IEJhc2VTZXJpZXN7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBYWVNlcmllcyh0aGlzLnNpZ25hbC5jbG9uZSgpLCB0aGlzLm5hbWUsIHRoaXMuY29sb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgdGltZXN0YW1wcyBiYXNlb24gdGhlIGF2YWlsYWJsZSBzZXJpZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIEJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHVwZGF0ZVRpbWVzdGFtcHMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2FsY3VsYXRpb25EYXRhSW5mby5pbnB1dERhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAvLyB3ZSB1c2UgdGhlIHggdmFsdWVzIGZyb20gdGhlIGlucHV0IDAgYXMgdGhlIHRpbWVzdGFtcHMgc291cmNlXHJcbiAgICAgICAgICAgIHRoaXMuX3RpbWVzdGFtcHMgPSB0aGlzLmNhbGN1bGF0aW9uRGF0YUluZm8uaW5wdXREYXRhWzBdLmdldERhdGEoKS5tYXAoKGlucHV0RGF0YVBvaW50KT0+eyByZXR1cm4gaW5wdXREYXRhUG9pbnQueH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgd2hlbmV2ZXIgdGhlIHNlcmlzIGRhdGEgaGFzIGNoYW5nZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtJUG9pbnRbXX0gZGF0YVxyXG4gICAgICogQG1lbWJlcm9mIEJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIG9uU2VyaWVEYXRhQ2hhbmdlZCggc2VyaWVzRGF0YTogSVBvaW50W10pIHtcclxuICAgICAgICBpZihzZXJpZXNEYXRhICYmIHNlcmllc0RhdGEubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2ltcGxpZnlTaWduYWwoc2VyaWVzRGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG59Il19