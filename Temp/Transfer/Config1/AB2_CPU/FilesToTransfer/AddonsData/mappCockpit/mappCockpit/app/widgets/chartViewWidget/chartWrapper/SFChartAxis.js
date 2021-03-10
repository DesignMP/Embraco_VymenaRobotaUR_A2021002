define(["require", "exports", "../../../core/interfaces/components/ui/chart/chartInterface", "../../../core/types/AxisBounds"], function (require, exports, chartInterface_1, AxisBounds_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SFChartAxis = /** @class */ (function () {
        function SFChartAxis(axis, eventAxisRangeChanged, sfChart) {
            this._chartAxis = axis;
            this.eventAxisRangeChanged = eventAxisRangeChanged;
            this.sfChart = sfChart;
        }
        SFChartAxis.prototype.setAxisRange = function (newRange, forceRedraw, syncAxis) {
            if (forceRedraw === void 0) { forceRedraw = false; }
            if (syncAxis === void 0) { syncAxis = false; }
            var axis = this._chartAxis;
            this.setChartAxisRange(newRange.min, newRange.max);
            var eventAxisRangeChangedArgs = new chartInterface_1.EventAxisRangeChangedArgs([axis.name], forceRedraw, syncAxis);
            this.eventAxisRangeChanged.raise(this, eventAxisRangeChangedArgs);
        };
        SFChartAxis.prototype.setChartAxisRange = function (minValue, maxValue) {
            /*The following lines fix the bug in syncfusion source code, where the axis range is not set,
            when the chart is zoomed in before setting the range by manualy setting all given ranges */
            this._chartAxis._range.min = minValue;
            this._chartAxis._range.max = maxValue;
            this._chartAxis.range.min = minValue;
            this._chartAxis.range.max = maxValue;
            this._chartAxis._initialRange.min = minValue;
            this._chartAxis._initialRange.max = maxValue;
            this._chartAxis.visibleRange.max = maxValue;
            this._chartAxis.visibleRange.min = minValue;
        };
        SFChartAxis.prototype.getAxisRange = function () {
            var axis = this._chartAxis;
            return { min: axis.visibleRange.min, max: axis.visibleRange.max, delta: axis.visibleRange.delta };
        };
        SFChartAxis.prototype.getAxisRangeInPixel = function () {
            var axis = this._chartAxis;
            var pixelRange;
            if (axis.orientation == "horizontal") {
                pixelRange = { max: axis.width, min: 0 };
            }
            else {
                pixelRange = { max: axis.length, min: 0 };
            }
            return pixelRange;
        };
        SFChartAxis.prototype.getAxisOrientation = function () {
            if (this._chartAxis.orientation == "horizontal") {
                return chartInterface_1.AxisOrientation.horizontal;
            }
            else {
                return chartInterface_1.AxisOrientation.vertical;
            }
        };
        SFChartAxis.prototype.getAxisID = function () {
            return this._chartAxis.name;
        };
        SFChartAxis.prototype.getAxisBounds = function () {
            var axisBounds;
            var chartArea = this.sfChart.getChartArea();
            var currentAxis = this._chartAxis;
            if (currentAxis.orientation == "horizontal") {
                var x = currentAxis.x;
                var y = currentAxis.y;
                var width = currentAxis.width;
                var height = this.sfChart._SFChart.svgHeight - y;
                axisBounds = new AxisBounds_1.AxisBounds(currentAxis, x, y, width, height);
            }
            else {
                if (currentAxis.x <= chartArea.x) {
                    var width = currentAxis.AxisMaxWidth;
                    var height = currentAxis.height;
                    var x = currentAxis.x - width;
                    var y = currentAxis.y;
                    axisBounds = new AxisBounds_1.AxisBounds(currentAxis, x, y, width, height);
                }
                else {
                    var width = currentAxis.AxisMaxWidth;
                    var height = currentAxis.height;
                    var x = currentAxis.x;
                    var y = currentAxis.y;
                    axisBounds = new AxisBounds_1.AxisBounds(currentAxis, x, y, width, height);
                }
            }
            return axisBounds;
        };
        return SFChartAxis;
    }());
    exports.SFChartAxis = SFChartAxis;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZDaGFydEF4aXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY2hhcnRWaWV3V2lkZ2V0L2NoYXJ0V3JhcHBlci9TRkNoYXJ0QXhpcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFJQTtRQUlJLHFCQUFZLElBQUksRUFBRSxxQkFBcUIsRUFBRSxPQUF1QjtZQUM1RCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUN2QixJQUFJLENBQUMscUJBQXFCLEdBQUcscUJBQXFCLENBQUM7WUFDbkQsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDM0IsQ0FBQztRQUNELGtDQUFZLEdBQVosVUFBYSxRQUFxQixFQUFFLFdBQTRCLEVBQUUsUUFBZ0I7WUFBOUMsNEJBQUEsRUFBQSxtQkFBNEI7WUFBRSx5QkFBQSxFQUFBLGdCQUFnQjtZQUM5RSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQzNCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuRCxJQUFJLHlCQUF5QixHQUFHLElBQUksMENBQXlCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ2xHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLHlCQUF5QixDQUFDLENBQUM7UUFDdEUsQ0FBQztRQUNPLHVDQUFpQixHQUF6QixVQUEwQixRQUFnQixFQUFFLFFBQWdCO1lBRXhEO3VHQUMyRjtZQUUzRixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUM7WUFFdEMsSUFBSSxDQUFD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LFVBQVUsR0FBRyxJQUFJLHVCQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2lCQUNqRTtxQkFDSTtvQkFDRCxJQUFJLEtBQUssR0FBRyxXQUFXLENBQUMsWUFBWSxDQUFDO29CQUNyQyxJQUFJLE1BQU0sR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDO29CQUNoQyxJQUFJLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDO29CQUN0QixJQUFJLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDO29CQUN0QixVQUFVLEdBQUcsSUFBSSx1QkFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztpQkFDakU7YUFDSjtZQUNELE9BQU8sVUFBVSxDQUFDO1FBQ3RCLENBQUM7UUFDTCxrQkFBQztJQUFELENBQUMsQUF4RkQsSUF3RkM7SUF4Rlksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTaW1wbGVSYW5nZSwgRXZlbnRBeGlzUmFuZ2VDaGFuZ2VkQXJncywgQXhpc09yaWVudGF0aW9uIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvaW50ZXJmYWNlcy9jb21wb25lbnRzL3VpL2NoYXJ0L2NoYXJ0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNGQ2hhcnRXcmFwcGVyIH0gZnJvbSBcIi4vU0ZDaGFydFdyYXBwZXJcIjtcclxuaW1wb3J0IHsgQXhpc0JvdW5kcyB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3R5cGVzL0F4aXNCb3VuZHNcIjtcclxuaW1wb3J0IHsgSUNoYXJ0QXhpcyB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2ludGVyZmFjZXMvY29tcG9uZW50cy91aS9jaGFydC9DaGFydEF4aXNJbnRlcmZhY2VcIjtcclxuZXhwb3J0IGNsYXNzIFNGQ2hhcnRBeGlzIGltcGxlbWVudHMgSUNoYXJ0QXhpcyB7XHJcbiAgICBwcml2YXRlIF9jaGFydEF4aXM7XHJcbiAgICBwcml2YXRlIGV2ZW50QXhpc1JhbmdlQ2hhbmdlZDtcclxuICAgIHByaXZhdGUgc2ZDaGFydDogU0ZDaGFydFdyYXBwZXI7XHJcbiAgICBjb25zdHJ1Y3RvcihheGlzLCBldmVudEF4aXNSYW5nZUNoYW5nZWQsIHNmQ2hhcnQ6IFNGQ2hhcnRXcmFwcGVyKSB7XHJcbiAgICAgICAgdGhpcy5fY2hhcnRBeGlzID0gYXhpcztcclxuICAgICAgICB0aGlzLmV2ZW50QXhpc1JhbmdlQ2hhbmdlZCA9IGV2ZW50QXhpc1JhbmdlQ2hhbmdlZDtcclxuICAgICAgICB0aGlzLnNmQ2hhcnQgPSBzZkNoYXJ0O1xyXG4gICAgfVxyXG4gICAgc2V0QXhpc1JhbmdlKG5ld1JhbmdlOiBTaW1wbGVSYW5nZSwgZm9yY2VSZWRyYXc6IGJvb2xlYW4gPSBmYWxzZSwgc3luY0F4aXMgPSBmYWxzZSkge1xyXG4gICAgICAgIGxldCBheGlzID0gdGhpcy5fY2hhcnRBeGlzO1xyXG4gICAgICAgIHRoaXMuc2V0Q2hhcnRBeGlzUmFuZ2UobmV3UmFuZ2UubWluLCBuZXdSYW5nZS5tYXgpO1xyXG4gICAgICAgIGxldCBldmVudEF4aXNSYW5nZUNoYW5nZWRBcmdzID0gbmV3IEV2ZW50QXhpc1JhbmdlQ2hhbmdlZEFyZ3MoW2F4aXMubmFtZV0sIGZvcmNlUmVkcmF3LCBzeW5jQXhpcyk7XHJcbiAgICAgICAgdGhpcy5ldmVudEF4aXNSYW5nZUNoYW5nZWQucmFpc2UodGhpcywgZXZlbnRBeGlzUmFuZ2VDaGFuZ2VkQXJncyk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHNldENoYXJ0QXhpc1JhbmdlKG1pblZhbHVlOiBudW1iZXIsIG1heFZhbHVlOiBudW1iZXIpIHtcclxuXHJcbiAgICAgICAgLypUaGUgZm9sbG93aW5nIGxpbmVzIGZpeCB0aGUgYnVnIGluIHN5bmNmdXNpb24gc291cmNlIGNvZGUsIHdoZXJlIHRoZSBheGlzIHJhbmdlIGlzIG5vdCBzZXQsXHJcbiAgICAgICAgd2hlbiB0aGUgY2hhcnQgaXMgem9vbWVkIGluIGJlZm9yZSBzZXR0aW5nIHRoZSByYW5nZSBieSBtYW51YWx5IHNldHRpbmcgYWxsIGdpdmVuIHJhbmdlcyAqL1xyXG5cclxuICAgICAgICB0aGlzLl9jaGFydEF4aXMuX3JhbmdlLm1pbiA9IG1pblZhbHVlO1xyXG4gICAgICAgIHRoaXMuX2NoYXJ0QXhpcy5fcmFuZ2UubWF4ID0gbWF4VmFsdWU7XHJcblxyXG4gICAgICAgIHRoaXMuX2NoYXJ0QXhpcy5yYW5nZS5taW4gPSBtaW5WYWx1ZTtcclxuICAgICAgICB0aGlzLl9jaGFydEF4aXMucmFuZ2UubWF4ID0gbWF4VmFsdWU7XHJcblxyXG4gICAgICAgIHRoaXMuX2NoYXJ0QXhpcy5faW5pdGlhbFJhbmdlLm1pbiA9IG1pblZhbHVlO1xyXG4gICAgICAgIHRoaXMuX2NoYXJ0QXhpcy5faW5pdGlhbFJhbmdlLm1heCA9IG1heFZhbHVlO1xyXG5cclxuICAgICAgICB0aGlzLl9jaGFydEF4aXMudmlzaWJsZVJhbmdlLm1heCA9IG1heFZhbHVlO1xyXG4gICAgICAgIHRoaXMuX2NoYXJ0QXhpcy52aXNpYmxlUmFuZ2UubWluID0gbWluVmFsdWU7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBnZXRBeGlzUmFuZ2UoKTogU2ltcGxlUmFuZ2Uge1xyXG4gICAgICAgIGxldCBheGlzID0gdGhpcy5fY2hhcnRBeGlzO1xyXG4gICAgICAgIHJldHVybiB7IG1pbjogYXhpcy52aXNpYmxlUmFuZ2UubWluLCBtYXg6IGF4aXMudmlzaWJsZVJhbmdlLm1heCwgZGVsdGE6IGF4aXMudmlzaWJsZVJhbmdlLmRlbHRhIH07XHJcbiAgICB9XHJcbiAgICBnZXRBeGlzUmFuZ2VJblBpeGVsKCk6IFNpbXBsZVJhbmdlIHtcclxuICAgICAgICBsZXQgYXhpcyA9IHRoaXMuX2NoYXJ0QXhpcztcclxuICAgICAgICBsZXQgcGl4ZWxSYW5nZTogU2ltcGxlUmFuZ2U7XHJcbiAgICAgICAgaWYgKGF4aXMub3JpZW50YXRpb24gPT0gXCJob3Jpem9udGFsXCIpIHtcclxuICAgICAgICAgICAgcGl4ZWxSYW5nZSA9IHsgbWF4OiBheGlzLndpZHRoLCBtaW46IDB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcGl4ZWxSYW5nZSA9IHsgbWF4OiBheGlzLmxlbmd0aCwgbWluOiAwfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBpeGVsUmFuZ2U7XHJcbiAgICB9XHJcbiAgICBnZXRBeGlzT3JpZW50YXRpb24oKTogQXhpc09yaWVudGF0aW9uIHtcclxuICAgICAgICBpZiAodGhpcy5fY2hhcnRBeGlzLm9yaWVudGF0aW9uID09IFwiaG9yaXpvbnRhbFwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBBeGlzT3JpZW50YXRpb24uaG9yaXpvbnRhbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBBeGlzT3JpZW50YXRpb24udmVydGljYWw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0QXhpc0lEKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NoYXJ0QXhpcy5uYW1lO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldEF4aXNCb3VuZHMoKTogQXhpc0JvdW5kcyB7XHJcbiAgICAgICAgbGV0IGF4aXNCb3VuZHM6IEF4aXNCb3VuZHM7XHJcbiAgICAgICAgbGV0IGNoYXJ0QXJlYSA9IHRoaXMuc2ZDaGFydC5nZXRDaGFydEFyZWEoKTtcclxuICAgICAgICBsZXQgY3VycmVudEF4aXMgPSB0aGlzLl9jaGFydEF4aXM7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRBeGlzLm9yaWVudGF0aW9uID09IFwiaG9yaXpvbnRhbFwiKSB7XHJcbiAgICAgICAgICAgIGxldCB4ID0gY3VycmVudEF4aXMueDtcclxuICAgICAgICAgICAgbGV0IHkgPSBjdXJyZW50QXhpcy55O1xyXG4gICAgICAgICAgICBsZXQgd2lkdGggPSBjdXJyZW50QXhpcy53aWR0aDtcclxuICAgICAgICAgICAgbGV0IGhlaWdodCA9IHRoaXMuc2ZDaGFydC5fU0ZDaGFydC5zdmdIZWlnaHQgLSB5O1xyXG4gICAgICAgICAgICBheGlzQm91bmRzID0gbmV3IEF4aXNCb3VuZHMoY3VycmVudEF4aXMsIHgsIHksIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRBeGlzLnggPD0gY2hhcnRBcmVhLngpIHtcclxuICAgICAgICAgICAgICAgIGxldCB3aWR0aCA9IGN1cnJlbnRBeGlzLkF4aXNNYXhXaWR0aDtcclxuICAgICAgICAgICAgICAgIGxldCBoZWlnaHQgPSBjdXJyZW50QXhpcy5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgeCA9IGN1cnJlbnRBeGlzLnggLSB3aWR0aDtcclxuICAgICAgICAgICAgICAgIGxldCB5ID0gY3VycmVudEF4aXMueTtcclxuICAgICAgICAgICAgICAgIGF4aXNCb3VuZHMgPSBuZXcgQXhpc0JvdW5kcyhjdXJyZW50QXhpcywgeCwgeSwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgd2lkdGggPSBjdXJyZW50QXhpcy5BeGlzTWF4V2lkdGg7XHJcbiAgICAgICAgICAgICAgICBsZXQgaGVpZ2h0ID0gY3VycmVudEF4aXMuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgbGV0IHggPSBjdXJyZW50QXhpcy54O1xyXG4gICAgICAgICAgICAgICAgbGV0IHkgPSBjdXJyZW50QXhpcy55O1xyXG4gICAgICAgICAgICAgICAgYXhpc0JvdW5kcyA9IG5ldyBBeGlzQm91bmRzKGN1cnJlbnRBeGlzLCB4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXhpc0JvdW5kcztcclxuICAgIH1cclxufVxyXG4iXX0=