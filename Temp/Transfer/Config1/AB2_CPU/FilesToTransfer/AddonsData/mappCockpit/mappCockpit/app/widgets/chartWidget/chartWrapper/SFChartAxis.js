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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZDaGFydEF4aXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY2hhcnRXaWRnZXQvY2hhcnRXcmFwcGVyL1NGQ2hhcnRBeGlzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUlBO1FBSUkscUJBQVksSUFBSSxFQUFFLHFCQUFxQixFQUFFLE9BQXVCO1lBQzVELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxxQkFBcUIsQ0FBQztZQUNuRCxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUMzQixDQUFDO1FBQ0Qsa0NBQVksR0FBWixVQUFhLFFBQXFCLEVBQUUsV0FBNEIsRUFBRSxRQUFnQjtZQUE5Qyw0QkFBQSxFQUFBLG1CQUE0QjtZQUFFLHlCQUFBLEVBQUEsZ0JBQWdCO1lBQzlFLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDM0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25ELElBQUkseUJBQXlCLEdBQUcsSUFBSSwwQ0FBeUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDbEcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUseUJBQXlCLENBQUMsQ0FBQztRQUN0RSxDQUFDO1FBQ08sdUNBQWlCLEdBQXpCLFVBQTBCLFFBQWdCLEVBQUUsUUFBZ0I7WUFFeEQ7dUdBQzJGO1lBRTNGLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUM7WUFDdEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQztZQUV0QyxJQUFJLENBQUMsVUFB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VSxHQUFHLElBQUksdUJBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7aUJBQ2pFO3FCQUNJO29CQUNELElBQUksS0FBSyxHQUFHLFdBQVcsQ0FBQyxZQUFZLENBQUM7b0JBQ3JDLElBQUksTUFBTSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUM7b0JBQ2hDLElBQUksQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUM7b0JBQ3RCLElBQUksQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUM7b0JBQ3RCLFVBQVUsR0FBRyxJQUFJLHVCQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2lCQUNqRTthQUNKO1lBQ0QsT0FBTyxVQUFVLENBQUM7UUFDdEIsQ0FBQztRQUNMLGtCQUFDO0lBQUQsQ0FBQyxBQXhGRCxJQXdGQztJQXhGWSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNpbXBsZVJhbmdlLCBFdmVudEF4aXNSYW5nZUNoYW5nZWRBcmdzLCBBeGlzT3JpZW50YXRpb24gfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9pbnRlcmZhY2VzL2NvbXBvbmVudHMvdWkvY2hhcnQvY2hhcnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU0ZDaGFydFdyYXBwZXIgfSBmcm9tIFwiLi9TRkNoYXJ0V3JhcHBlclwiO1xyXG5pbXBvcnQgeyBBeGlzQm91bmRzIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvdHlwZXMvQXhpc0JvdW5kc1wiO1xyXG5pbXBvcnQgeyBJQ2hhcnRBeGlzIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvaW50ZXJmYWNlcy9jb21wb25lbnRzL3VpL2NoYXJ0L0NoYXJ0QXhpc0ludGVyZmFjZVwiO1xyXG5leHBvcnQgY2xhc3MgU0ZDaGFydEF4aXMgaW1wbGVtZW50cyBJQ2hhcnRBeGlzIHtcclxuICAgIHByaXZhdGUgX2NoYXJ0QXhpcztcclxuICAgIHByaXZhdGUgZXZlbnRBeGlzUmFuZ2VDaGFuZ2VkO1xyXG4gICAgcHJpdmF0ZSBzZkNoYXJ0OiBTRkNoYXJ0V3JhcHBlcjtcclxuICAgIGNvbnN0cnVjdG9yKGF4aXMsIGV2ZW50QXhpc1JhbmdlQ2hhbmdlZCwgc2ZDaGFydDogU0ZDaGFydFdyYXBwZXIpIHtcclxuICAgICAgICB0aGlzLl9jaGFydEF4aXMgPSBheGlzO1xyXG4gICAgICAgIHRoaXMuZXZlbnRBeGlzUmFuZ2VDaGFuZ2VkID0gZXZlbnRBeGlzUmFuZ2VDaGFuZ2VkO1xyXG4gICAgICAgIHRoaXMuc2ZDaGFydCA9IHNmQ2hhcnQ7XHJcbiAgICB9XHJcbiAgICBzZXRBeGlzUmFuZ2UobmV3UmFuZ2U6IFNpbXBsZVJhbmdlLCBmb3JjZVJlZHJhdzogYm9vbGVhbiA9IGZhbHNlLCBzeW5jQXhpcyA9IGZhbHNlKSB7XHJcbiAgICAgICAgbGV0IGF4aXMgPSB0aGlzLl9jaGFydEF4aXM7XHJcbiAgICAgICAgdGhpcy5zZXRDaGFydEF4aXNSYW5nZShuZXdSYW5nZS5taW4sIG5ld1JhbmdlLm1heCk7XHJcbiAgICAgICAgbGV0IGV2ZW50QXhpc1JhbmdlQ2hhbmdlZEFyZ3MgPSBuZXcgRXZlbnRBeGlzUmFuZ2VDaGFuZ2VkQXJncyhbYXhpcy5uYW1lXSwgZm9yY2VSZWRyYXcsIHN5bmNBeGlzKTtcclxuICAgICAgICB0aGlzLmV2ZW50QXhpc1JhbmdlQ2hhbmdlZC5yYWlzZSh0aGlzLCBldmVudEF4aXNSYW5nZUNoYW5nZWRBcmdzKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgc2V0Q2hhcnRBeGlzUmFuZ2UobWluVmFsdWU6IG51bWJlciwgbWF4VmFsdWU6IG51bWJlcikge1xyXG5cclxuICAgICAgICAvKlRoZSBmb2xsb3dpbmcgbGluZXMgZml4IHRoZSBidWcgaW4gc3luY2Z1c2lvbiBzb3VyY2UgY29kZSwgd2hlcmUgdGhlIGF4aXMgcmFuZ2UgaXMgbm90IHNldCxcclxuICAgICAgICB3aGVuIHRoZSBjaGFydCBpcyB6b29tZWQgaW4gYmVmb3JlIHNldHRpbmcgdGhlIHJhbmdlIGJ5IG1hbnVhbHkgc2V0dGluZyBhbGwgZ2l2ZW4gcmFuZ2VzICovXHJcblxyXG4gICAgICAgIHRoaXMuX2NoYXJ0QXhpcy5fcmFuZ2UubWluID0gbWluVmFsdWU7XHJcbiAgICAgICAgdGhpcy5fY2hhcnRBeGlzLl9yYW5nZS5tYXggPSBtYXhWYWx1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5fY2hhcnRBeGlzLnJhbmdlLm1pbiA9IG1pblZhbHVlO1xyXG4gICAgICAgIHRoaXMuX2NoYXJ0QXhpcy5yYW5nZS5tYXggPSBtYXhWYWx1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5fY2hhcnRBeGlzLl9pbml0aWFsUmFuZ2UubWluID0gbWluVmFsdWU7XHJcbiAgICAgICAgdGhpcy5fY2hhcnRBeGlzLl9pbml0aWFsUmFuZ2UubWF4ID0gbWF4VmFsdWU7XHJcblxyXG4gICAgICAgIHRoaXMuX2NoYXJ0QXhpcy52aXNpYmxlUmFuZ2UubWF4ID0gbWF4VmFsdWU7XHJcbiAgICAgICAgdGhpcy5fY2hhcnRBeGlzLnZpc2libGVSYW5nZS5taW4gPSBtaW5WYWx1ZTtcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIGdldEF4aXNSYW5nZSgpOiBTaW1wbGVSYW5nZSB7XHJcbiAgICAgICAgbGV0IGF4aXMgPSB0aGlzLl9jaGFydEF4aXM7XHJcbiAgICAgICAgcmV0dXJuIHsgbWluOiBheGlzLnZpc2libGVSYW5nZS5taW4sIG1heDogYXhpcy52aXNpYmxlUmFuZ2UubWF4LCBkZWx0YTogYXhpcy52aXNpYmxlUmFuZ2UuZGVsdGEgfTtcclxuICAgIH1cclxuICAgIGdldEF4aXNSYW5nZUluUGl4ZWwoKTogU2ltcGxlUmFuZ2Uge1xyXG4gICAgICAgIGxldCBheGlzID0gdGhpcy5fY2hhcnRBeGlzO1xyXG4gICAgICAgIGxldCBwaXhlbFJhbmdlOiBTaW1wbGVSYW5nZTtcclxuICAgICAgICBpZiAoYXhpcy5vcmllbnRhdGlvbiA9PSBcImhvcml6b250YWxcIikge1xyXG4gICAgICAgICAgICBwaXhlbFJhbmdlID0geyBtYXg6IGF4aXMud2lkdGgsIG1pbjogMH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBwaXhlbFJhbmdlID0geyBtYXg6IGF4aXMubGVuZ3RoLCBtaW46IDB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcGl4ZWxSYW5nZTtcclxuICAgIH1cclxuICAgIGdldEF4aXNPcmllbnRhdGlvbigpOiBBeGlzT3JpZW50YXRpb24ge1xyXG4gICAgICAgIGlmICh0aGlzLl9jaGFydEF4aXMub3JpZW50YXRpb24gPT0gXCJob3Jpem9udGFsXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIEF4aXNPcmllbnRhdGlvbi5ob3Jpem9udGFsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIEF4aXNPcmllbnRhdGlvbi52ZXJ0aWNhbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXRBeGlzSUQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY2hhcnRBeGlzLm5hbWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0QXhpc0JvdW5kcygpOiBBeGlzQm91bmRzIHtcclxuICAgICAgICBsZXQgYXhpc0JvdW5kczogQXhpc0JvdW5kcztcclxuICAgICAgICBsZXQgY2hhcnRBcmVhID0gdGhpcy5zZkNoYXJ0LmdldENoYXJ0QXJlYSgpO1xyXG4gICAgICAgIGxldCBjdXJyZW50QXhpcyA9IHRoaXMuX2NoYXJ0QXhpcztcclxuICAgICAgICBpZiAoY3VycmVudEF4aXMub3JpZW50YXRpb24gPT0gXCJob3Jpem9udGFsXCIpIHtcclxuICAgICAgICAgICAgbGV0IHggPSBjdXJyZW50QXhpcy54O1xyXG4gICAgICAgICAgICBsZXQgeSA9IGN1cnJlbnRBeGlzLnk7XHJcbiAgICAgICAgICAgIGxldCB3aWR0aCA9IGN1cnJlbnRBeGlzLndpZHRoO1xyXG4gICAgICAgICAgICBsZXQgaGVpZ2h0ID0gdGhpcy5zZkNoYXJ0Ll9TRkNoYXJ0LnN2Z0hlaWdodCAtIHk7XHJcbiAgICAgICAgICAgIGF4aXNCb3VuZHMgPSBuZXcgQXhpc0JvdW5kcyhjdXJyZW50QXhpcywgeCwgeSwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudEF4aXMueCA8PSBjaGFydEFyZWEueCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHdpZHRoID0gY3VycmVudEF4aXMuQXhpc01heFdpZHRoO1xyXG4gICAgICAgICAgICAgICAgbGV0IGhlaWdodCA9IGN1cnJlbnRBeGlzLmhlaWdodDtcclxuICAgICAgICAgICAgICAgIGxldCB4ID0gY3VycmVudEF4aXMueCAtIHdpZHRoO1xyXG4gICAgICAgICAgICAgICAgbGV0IHkgPSBjdXJyZW50QXhpcy55O1xyXG4gICAgICAgICAgICAgICAgYXhpc0JvdW5kcyA9IG5ldyBBeGlzQm91bmRzKGN1cnJlbnRBeGlzLCB4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCB3aWR0aCA9IGN1cnJlbnRBeGlzLkF4aXNNYXhXaWR0aDtcclxuICAgICAgICAgICAgICAgIGxldCBoZWlnaHQgPSBjdXJyZW50QXhpcy5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgeCA9IGN1cnJlbnRBeGlzLng7XHJcbiAgICAgICAgICAgICAgICBsZXQgeSA9IGN1cnJlbnRBeGlzLnk7XHJcbiAgICAgICAgICAgICAgICBheGlzQm91bmRzID0gbmV3IEF4aXNCb3VuZHMoY3VycmVudEF4aXMsIHgsIHksIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBheGlzQm91bmRzO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==