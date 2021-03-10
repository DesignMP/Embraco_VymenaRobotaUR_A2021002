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
define(["require", "exports", "../../models/chartManagerDataModel/chartManagerChart", "./BasicChart", "./cursor/CursorHandler", "../common/states/cursorStates"], function (require, exports, chartManagerChart_1, BasicChart_1, CursorHandler_1, cursorStates_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var YTChart = /** @class */ (function (_super) {
        __extends(YTChart, _super);
        function YTChart(chartManager, name, type, scale) {
            var _this = _super.call(this, chartManager, name, scale) || this;
            _this.primaryXAxisName = "PrimaryTimeAxis";
            _this.primaryYAxisName = "Scale_1";
            _this.cursorHandler = undefined;
            _this.widgetName = name;
            _this.chartManager = chartManager;
            _this.type = type;
            _this.addWidgetToView(chartManager);
            return _this;
        }
        YTChart.prototype.initializeCursorHandlers = function () {
            if (this.cursorHandler == undefined) {
                this.cursorHandler = (new CursorHandler_1.CursorHandler(this.parentContentId, this.chart.getChartArea()));
                this.cursorHandler.enableCrosshairCursor = true;
                this.cursorHandler.enableLineCursor = true;
            }
        };
        /**
         * Get min x value from all series in the chart
         *
         * @param {*} traceChartList
         * @returns {(number|undefined)}
         * @memberof YTChart
         */
        YTChart.prototype.getTotalMinX = function (traceChartList) {
            var minX = undefined;
            for (var i = 0; i < traceChartList.length; i++) {
                var chart = traceChartList[i];
                for (var j = 0; j < chart.series.length; j++) {
                    if (chart.series[j] !== undefined && chart.type == chartManagerChart_1.ChartType.YTChart) {
                        if (minX == undefined || chart.series[j].minX < minX) {
                            minX = chart.series[j].minX;
                        }
                    }
                }
            }
            return minX;
        };
        /**
         * Get max x value from all series in the chart
         *
         * @param {*} traceChartList
         * @returns {(number|undefined)}
         * @memberof YTChart
         */
        YTChart.prototype.getTotalMaxX = function (traceChartList) {
            var maxX = undefined;
            for (var i = 0; i < traceChartList.length; i++) {
                var chart = traceChartList[i];
                for (var j = 0; j < chart.series.length; j++) {
                    if (chart.series[j] !== undefined && chart.type == chartManagerChart_1.ChartType.YTChart) {
                        if (maxX == undefined || chart.series[j].maxX > maxX) {
                            maxX = chart.series[j].maxX;
                        }
                    }
                }
            }
            return maxX;
        };
        YTChart.prototype.removeSerieFromChart = function (serie) {
            var index = this.serieInChart(serie);
            if (index > -1) {
                this.series.splice(index, 1);
            }
            this.setAvailableSeriesAsDataSource();
            //redraw cursors
            var cursorState = this.states.read(cursorStates_1.CursorStates, this.cursorStatesId);
            var states = cursorState.getTimeStates();
            for (var i = 0; i < states.length; i++) {
                var timestamp = states[i].position;
                this.drawCursor(timestamp, i, states[i].hovered, states[i].selected);
            }
        };
        return YTChart;
    }(BasicChart_1.BasicChart));
    exports.YTChart = YTChart;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWVRDaGFydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jaGFydFZpZXdXaWRnZXQvWVRDaGFydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBU0E7UUFBc0IsMkJBQVU7UUFPNUIsaUJBQVksWUFBbUMsRUFBRSxJQUFZLEVBQUUsSUFBZSxFQUFFLEtBQVk7WUFBNUYsWUFDSSxrQkFBTSxZQUFZLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxTQU9uQztZQWJELHNCQUFnQixHQUFHLGlCQUFpQixDQUFDO1lBQ3JDLHNCQUFnQixHQUFHLFNBQVMsQ0FBQztZQUU3QixtQkFBYSxHQUE2QixTQUFTLENBQUM7WUFLaEQsS0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFDdkIsS0FBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7WUFDakMsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFFakIsS0FBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQzs7UUFDdkMsQ0FBQztRQUVTLDBDQUF3QixHQUFsQztZQUNJLElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxTQUFTLEVBQUM7Z0JBQ2hDLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxJQUFJLDZCQUFhLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDMUYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUM7Z0JBQ2hELElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO2FBQzlDO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNJLDhCQUFZLEdBQW5CLFVBQW9CLGNBQWM7WUFDOUIsSUFBSSxJQUFJLEdBQXFCLFNBQVMsQ0FBQTtZQUN0QyxLQUFJLElBQUks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QU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFydFZpZXdDaGFydE1hbmFnZXIgfSBmcm9tIFwiLi9jaGFydFZpZXdDaGFydE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgQ2hhcnRUeXBlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvY2hhcnRNYW5hZ2VyQ2hhcnRcIjtcclxuaW1wb3J0IHsgU2NhbGUgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9zY2FsZVwiO1xyXG5pbXBvcnQgeyBCYXNpY0NoYXJ0IH0gZnJvbSBcIi4vQmFzaWNDaGFydFwiO1xyXG5pbXBvcnQgeyBDdXJzb3JIYW5kbGVyIH0gZnJvbSBcIi4vY3Vyc29yL0N1cnNvckhhbmRsZXJcIjtcclxuaW1wb3J0IHsgQ3Vyc29yU3RhdGVzIH0gZnJvbSBcIi4uL2NvbW1vbi9zdGF0ZXMvY3Vyc29yU3RhdGVzXCI7XHJcbmltcG9ydCB7IEJhc2VTZXJpZXMgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9iYXNlU2VyaWVzXCI7XHJcbmltcG9ydCB7IENoYXJ0Vmlld1NlcmllIH0gZnJvbSBcIi4vY2hhcnRWaWV3U2VyaWVcIjtcclxuXHJcbmNsYXNzIFlUQ2hhcnQgZXh0ZW5kcyBCYXNpY0NoYXJ0e1xyXG5cclxuICAgIHByaW1hcnlYQXhpc05hbWUgPSBcIlByaW1hcnlUaW1lQXhpc1wiO1xyXG4gICAgcHJpbWFyeVlBeGlzTmFtZSA9IFwiU2NhbGVfMVwiO1xyXG5cclxuICAgIGN1cnNvckhhbmRsZXIgOiBDdXJzb3JIYW5kbGVyfHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihjaGFydE1hbmFnZXI6IENoYXJ0Vmlld0NoYXJ0TWFuYWdlciwgbmFtZTogc3RyaW5nLCB0eXBlOiBDaGFydFR5cGUsIHNjYWxlOiBTY2FsZSkge1xyXG4gICAgICAgIHN1cGVyKGNoYXJ0TWFuYWdlciwgbmFtZSwgc2NhbGUpO1xyXG5cclxuICAgICAgICB0aGlzLndpZGdldE5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuY2hhcnRNYW5hZ2VyID0gY2hhcnRNYW5hZ2VyO1xyXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkV2lkZ2V0VG9WaWV3KGNoYXJ0TWFuYWdlcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRpYWxpemVDdXJzb3JIYW5kbGVycygpe1xyXG4gICAgICAgIGlmICh0aGlzLmN1cnNvckhhbmRsZXIgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5jdXJzb3JIYW5kbGVyID0gKG5ldyBDdXJzb3JIYW5kbGVyKHRoaXMucGFyZW50Q29udGVudElkLCB0aGlzLmNoYXJ0LmdldENoYXJ0QXJlYSgpKSk7XHJcbiAgICAgICAgICAgIHRoaXMuY3Vyc29ySGFuZGxlci5lbmFibGVDcm9zc2hhaXJDdXJzb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnNvckhhbmRsZXIuZW5hYmxlTGluZUN1cnNvciA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IG1pbiB4IHZhbHVlIGZyb20gYWxsIHNlcmllcyBpbiB0aGUgY2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IHRyYWNlQ2hhcnRMaXN0XHJcbiAgICAgKiBAcmV0dXJucyB7KG51bWJlcnx1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIFlUQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFRvdGFsTWluWCh0cmFjZUNoYXJ0TGlzdCkgOiBudW1iZXJ8dW5kZWZpbmVke1xyXG4gICAgICAgIGxldCBtaW5YOiBudW1iZXJ8dW5kZWZpbmVkID0gdW5kZWZpbmVkXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRyYWNlQ2hhcnRMaXN0Lmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGNoYXJ0ID0gdHJhY2VDaGFydExpc3RbaV1cclxuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IGNoYXJ0LnNlcmllcy5sZW5ndGg7IGorKyl7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hhcnQuc2VyaWVzW2pdICE9PSB1bmRlZmluZWQgJiYgY2hhcnQudHlwZSA9PSBDaGFydFR5cGUuWVRDaGFydCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1pblggPT0gdW5kZWZpbmVkIHx8IGNoYXJ0LnNlcmllc1tqXS5taW5YIDwgbWluWCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pblggPSBjaGFydC5zZXJpZXNbal0ubWluWDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1pblg7ICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgbWF4IHggdmFsdWUgZnJvbSBhbGwgc2VyaWVzIGluIHRoZSBjaGFydFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gdHJhY2VDaGFydExpc3RcclxuICAgICAqIEByZXR1cm5zIHsobnVtYmVyfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgWVRDaGFydFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0VG90YWxNYXhYKHRyYWNlQ2hhcnRMaXN0KTogbnVtYmVyfHVuZGVmaW5lZHtcclxuICAgICAgICBsZXQgbWF4WDogbnVtYmVyfHVuZGVmaW5lZCA9IHVuZGVmaW5lZFxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0cmFjZUNoYXJ0TGlzdC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBjaGFydCA9IHRyYWNlQ2hhcnRMaXN0W2ldXHJcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBjaGFydC5zZXJpZXMubGVuZ3RoOyBqKyspe1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoYXJ0LnNlcmllc1tqXSAhPT0gdW5kZWZpbmVkICYmIGNoYXJ0LnR5cGUgPT0gQ2hhcnRUeXBlLllUQ2hhcnQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXhYID09IHVuZGVmaW5lZCB8fCBjaGFydC5zZXJpZXNbal0ubWF4WCA+IG1heFgpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhYID0gY2hhcnQuc2VyaWVzW2pdLm1heFg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtYXhYOyAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlU2VyaWVGcm9tQ2hhcnQoc2VyaWU6IEJhc2VTZXJpZXN8Q2hhcnRWaWV3U2VyaWUpe1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5zZXJpZUluQ2hhcnQoc2VyaWUpO1xyXG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VyaWVzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNldEF2YWlsYWJsZVNlcmllc0FzRGF0YVNvdXJjZSgpO1xyXG5cclxuICAgICAgICAvL3JlZHJhdyBjdXJzb3JzXHJcbiAgICAgICAgbGV0IGN1cnNvclN0YXRlOiBDdXJzb3JTdGF0ZXMgPSB0aGlzLnN0YXRlcy5yZWFkKEN1cnNvclN0YXRlcywgdGhpcy5jdXJzb3JTdGF0ZXNJZCk7XHJcbiAgICAgICAgbGV0IHN0YXRlcyA9IGN1cnNvclN0YXRlLmdldFRpbWVTdGF0ZXMoKTtcclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHN0YXRlcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCB0aW1lc3RhbXAgPSBzdGF0ZXNbaV0ucG9zaXRpb247XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd0N1cnNvcih0aW1lc3RhbXAhLCBpLCBzdGF0ZXNbaV0uaG92ZXJlZCwgc3RhdGVzW2ldLnNlbGVjdGVkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgIFxyXG4gXHJcbn1cclxuXHJcbmV4cG9ydCB7IFlUQ2hhcnQgfTtcclxuXHJcbiJdfQ==