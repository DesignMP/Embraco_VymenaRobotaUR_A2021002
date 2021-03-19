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
define(["require", "exports", "../../models/chartManagerDataModel/chartManagerChart", "./BasicChart", "./cursor/CursorHandler"], function (require, exports, chartManagerChart_1, BasicChart_1, CursorHandler_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var YTChart = /** @class */ (function (_super) {
        __extends(YTChart, _super);
        function YTChart(parentView, name, type, scale) {
            var _this = _super.call(this, parentView, name, scale) || this;
            _this.primaryXAxisName = "PrimaryTimeAxis";
            _this.primaryYAxisName = "Scale_1";
            _this.cursorHandler = undefined;
            _this.widgetName = name;
            _this.type = type;
            _this.addWidgetToView(parentView);
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
            var states = this.cursorsStates.getTimeStates();
            for (var i = 0; i < states.length; i++) {
                var timestamp = states[i].position;
                if (timestamp != undefined) {
                    this.drawCursor(timestamp, i, states[i].hovered, states[i].selected);
                }
            }
        };
        return YTChart;
    }(BasicChart_1.BasicChart));
    exports.YTChart = YTChart;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWVRDaGFydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jaGFydFdpZGdldC9ZVENoYXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFRQTtRQUFzQiwyQkFBVTtRQU81QixpQkFBWSxVQUFpQixFQUFFLElBQVksRUFBRSxJQUFlLEVBQUUsS0FBWTtZQUExRSxZQUNJLGtCQUFNLFVBQVUsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLFNBTWpDO1lBWkQsc0JBQWdCLEdBQUcsaUJBQWlCLENBQUM7WUFDckMsc0JBQWdCLEdBQUcsU0FBUyxDQUFDO1lBRTdCLG1CQUFhLEdBQTZCLFNBQVMsQ0FBQztZQUtoRCxLQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUN2QixLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUVqQixLQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDOztRQUNyQyxDQUFDO1FBRVMsMENBQXdCLEdBQWxDO1lBQ0ksSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLFNBQVMsRUFBQztnQkFDaEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLElBQUksNkJBQWEsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUMxRixJQUFJLENBQUMsYUFBYSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQztnQkFDaEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7YUFDOUM7UUFDTCxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ksOEJBQVksR0FBbkIsVUFBb0IsY0FBYztZQUM5QixJQUFJLElBQUksR0FBcUIsU0FBUyxDQUFBO1lBQ3RDLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUMxQyxJQUFJLEtBQUssR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBQzdCLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztvQkFDeEMsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVMsSUFBSSxLQUFLLENBQUMsSUFBSSxJQUFJLDZCQUFTLENBQUMsT0FBTyxFQUFDO3dCQUNqRSxJQUFJLElBQUksSUFBSSxTQUFTLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxFQUFDOzRCQUNqRCxJQUFJLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7eUJBQy9CO3FCQUNKO2lCQUNKO2FBQ0o7WUFDRCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ksOEJBQVksR0FBbkIsVUFBb0IsY0FBYztZQUM5QixJQUFJLElBQUksR0FBcUIsU0FBUyxDQUFBO1lBQ3RDLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUMxQyxJQUFJLEtBQUssR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBQzdCLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztvQkFDeEMsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVMsSUFBSSxLQUFLLENBQUMsSUFBSSxJQUFJLDZCQUFTLENBQUMsT0FBTyxFQUFDO3dCQUNqRSxJQUFJLElBQUksSUFBSSxTQUFTLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxFQUFDOzRCQUNqRCxJQUFJLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7eUJBQy9CO3FCQUNKO2lCQUNKO2FBQ0o7WUFDRCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO1FBRU0sc0NBQW9CLEdBQTNCLFVBQTRCLEtBQWdDO1lBQ3hELElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdkMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQ1osSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ2hDO1lBRUQsSUFBSSxDQUFDLDhCQUE4QixFQUFFLENBQUM7WUFFdEMsZ0JBQWdCO1lBQ2hCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxFQUFFLENBQUM7WUFFaEQsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQ2xDLElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7Z0JBQ25DLElBQUcsU0FBUyxJQUFJLFNBQVMsRUFBQztvQkFDdEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUN4RTthQUNKO1FBQ0wsQ0FBQztRQUdMLGNBQUM7SUFBRCxDQUFDLEFBeEZELENBQXNCLHVCQUFVLEdBd0YvQjtJQUVRLDBCQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhcnRUeXBlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvY2hhcnRNYW5hZ2VyQ2hhcnRcIjtcclxuaW1wb3J0IHsgU2NhbGUgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9zY2FsZVwiO1xyXG5pbXBvcnQgeyBCYXNpY0NoYXJ0IH0gZnJvbSBcIi4vQmFzaWNDaGFydFwiO1xyXG5pbXBvcnQgeyBDdXJzb3JIYW5kbGVyIH0gZnJvbSBcIi4vY3Vyc29yL0N1cnNvckhhbmRsZXJcIjtcclxuaW1wb3J0IHsgQmFzZVNlcmllcyB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2Jhc2VTZXJpZXNcIjtcclxuaW1wb3J0IHsgQ2hhcnRWaWV3U2VyaWUgfSBmcm9tIFwiLi9jaGFydFZpZXdTZXJpZVwiO1xyXG5pbXBvcnQgeyBJVmlldyB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy92aWV3SW50ZXJmYWNlXCI7XHJcblxyXG5jbGFzcyBZVENoYXJ0IGV4dGVuZHMgQmFzaWNDaGFydHtcclxuXHJcbiAgICBwcmltYXJ5WEF4aXNOYW1lID0gXCJQcmltYXJ5VGltZUF4aXNcIjtcclxuICAgIHByaW1hcnlZQXhpc05hbWUgPSBcIlNjYWxlXzFcIjtcclxuXHJcbiAgICBjdXJzb3JIYW5kbGVyIDogQ3Vyc29ySGFuZGxlcnx1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IocGFyZW50VmlldzogSVZpZXcsIG5hbWU6IHN0cmluZywgdHlwZTogQ2hhcnRUeXBlLCBzY2FsZTogU2NhbGUpIHtcclxuICAgICAgICBzdXBlcihwYXJlbnRWaWV3LCBuYW1lLCBzY2FsZSk7XHJcblxyXG4gICAgICAgIHRoaXMud2lkZ2V0TmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRXaWRnZXRUb1ZpZXcocGFyZW50Vmlldyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRpYWxpemVDdXJzb3JIYW5kbGVycygpe1xyXG4gICAgICAgIGlmICh0aGlzLmN1cnNvckhhbmRsZXIgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5jdXJzb3JIYW5kbGVyID0gKG5ldyBDdXJzb3JIYW5kbGVyKHRoaXMucGFyZW50Q29udGVudElkLCB0aGlzLmNoYXJ0LmdldENoYXJ0QXJlYSgpKSk7XHJcbiAgICAgICAgICAgIHRoaXMuY3Vyc29ySGFuZGxlci5lbmFibGVDcm9zc2hhaXJDdXJzb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnNvckhhbmRsZXIuZW5hYmxlTGluZUN1cnNvciA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IG1pbiB4IHZhbHVlIGZyb20gYWxsIHNlcmllcyBpbiB0aGUgY2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IHRyYWNlQ2hhcnRMaXN0XHJcbiAgICAgKiBAcmV0dXJucyB7KG51bWJlcnx1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIFlUQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFRvdGFsTWluWCh0cmFjZUNoYXJ0TGlzdCkgOiBudW1iZXJ8dW5kZWZpbmVke1xyXG4gICAgICAgIGxldCBtaW5YOiBudW1iZXJ8dW5kZWZpbmVkID0gdW5kZWZpbmVkXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRyYWNlQ2hhcnRMaXN0Lmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGNoYXJ0ID0gdHJhY2VDaGFydExpc3RbaV1cclxuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IGNoYXJ0LnNlcmllcy5sZW5ndGg7IGorKyl7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hhcnQuc2VyaWVzW2pdICE9PSB1bmRlZmluZWQgJiYgY2hhcnQudHlwZSA9PSBDaGFydFR5cGUuWVRDaGFydCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1pblggPT0gdW5kZWZpbmVkIHx8IGNoYXJ0LnNlcmllc1tqXS5taW5YIDwgbWluWCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pblggPSBjaGFydC5zZXJpZXNbal0ubWluWDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1pblg7ICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgbWF4IHggdmFsdWUgZnJvbSBhbGwgc2VyaWVzIGluIHRoZSBjaGFydFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gdHJhY2VDaGFydExpc3RcclxuICAgICAqIEByZXR1cm5zIHsobnVtYmVyfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgWVRDaGFydFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0VG90YWxNYXhYKHRyYWNlQ2hhcnRMaXN0KTogbnVtYmVyfHVuZGVmaW5lZHtcclxuICAgICAgICBsZXQgbWF4WDogbnVtYmVyfHVuZGVmaW5lZCA9IHVuZGVmaW5lZFxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0cmFjZUNoYXJ0TGlzdC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBjaGFydCA9IHRyYWNlQ2hhcnRMaXN0W2ldXHJcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBjaGFydC5zZXJpZXMubGVuZ3RoOyBqKyspe1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoYXJ0LnNlcmllc1tqXSAhPT0gdW5kZWZpbmVkICYmIGNoYXJ0LnR5cGUgPT0gQ2hhcnRUeXBlLllUQ2hhcnQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXhYID09IHVuZGVmaW5lZCB8fCBjaGFydC5zZXJpZXNbal0ubWF4WCA+IG1heFgpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhYID0gY2hhcnQuc2VyaWVzW2pdLm1heFg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtYXhYOyAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlU2VyaWVGcm9tQ2hhcnQoc2VyaWU6IEJhc2VTZXJpZXN8Q2hhcnRWaWV3U2VyaWUpe1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5zZXJpZUluQ2hhcnQoc2VyaWUpO1xyXG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VyaWVzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNldEF2YWlsYWJsZVNlcmllc0FzRGF0YVNvdXJjZSgpO1xyXG5cclxuICAgICAgICAvL3JlZHJhdyBjdXJzb3JzXHJcbiAgICAgICAgbGV0IHN0YXRlcyA9IHRoaXMuY3Vyc29yc1N0YXRlcy5nZXRUaW1lU3RhdGVzKCk7XHJcblxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzdGF0ZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgdGltZXN0YW1wID0gc3RhdGVzW2ldLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICBpZih0aW1lc3RhbXAgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd0N1cnNvcih0aW1lc3RhbXAsIGksIHN0YXRlc1tpXS5ob3ZlcmVkLCBzdGF0ZXNbaV0uc2VsZWN0ZWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICBcclxuIFxyXG59XHJcblxyXG5leHBvcnQgeyBZVENoYXJ0IH07XHJcblxyXG4iXX0=