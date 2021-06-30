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
        /**
         * Get used cursor states
         *
         * @protected
         * @returns {Array<ICursorState>}
         * @memberof YTChart
         */
        YTChart.prototype.getUsedCursorStates = function () {
            return this.cursorsStates.getTimeStates();
        };
        return YTChart;
    }(BasicChart_1.BasicChart));
    exports.YTChart = YTChart;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWVRDaGFydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jaGFydFdpZGdldC9ZVENoYXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFPQTtRQUFzQiwyQkFBVTtRQU81QixpQkFBWSxVQUFpQixFQUFFLElBQVksRUFBRSxJQUFlLEVBQUUsS0FBWTtZQUExRSxZQUNJLGtCQUFNLFVBQVUsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLFNBTWpDO1lBWkQsc0JBQWdCLEdBQUcsaUJBQWlCLENBQUM7WUFDckMsc0JBQWdCLEdBQUcsU0FBUyxDQUFDO1lBRTdCLG1CQUFhLEdBQTZCLFNBQVMsQ0FBQztZQUtoRCxLQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUN2QixLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUVqQixLQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDOztRQUNyQyxDQUFDO1FBRVMsMENBQXdCLEdBQWxDO1lBQ0ksSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLFNBQVMsRUFBQztnQkFDaEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLElBQUksNkJBQWEsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUMxRixJQUFJLENBQUMsYUFBYSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQztnQkFDaEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7YUFDOUM7UUFDTCxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ksOEJBQVksR0FBbkIsVUFBb0IsY0FBYztZQUM5QixJQUFJLElBQUksR0FBcUIsU0FBUyxDQUFBO1lBQ3RDLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUMxQyxJQUFJLEtBQUssR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBQzdCLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztvQkFDeEMsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVMsSUFBSSxLQUFLLENBQUMsSUFBSSxJQUFJLDZCQUFTLENBQUMsT0FBTyxFQUFDO3dCQUNqRSxJQUFJLElBQUksSUFBSSxTQUFTLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxFQUFDOzRCQUNqRCxJQUFJLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7eUJBQy9CO3FCQUNKO2lCQUNKO2FBQ0o7WUFDRCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ksOEJBQVksR0FBbkIsVUFBb0IsY0FBYztZQUM5QixJQUFJLElBQUksR0FBcUIsU0FBUyxDQUFBO1lBQ3RDLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUMxQyxJQUFJLEtBQUssR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBQzdCLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztvQkFDeEMsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVMsSUFBSSxLQUFLLENBQUMsSUFBSSxJQUFJLDZCQUFTLENBQUMsT0FBTyxFQUFDO3dCQUNqRSxJQUFJLElBQUksSUFBSSxTQUFTLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxFQUFDOzRCQUNqRCxJQUFJLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7eUJBQy9CO3FCQUNKO2lCQUNKO2FBQ0o7WUFDRCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ08scUNBQW1CLEdBQTdCO1lBQ0ksT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQzlDLENBQUM7UUFDTCxjQUFDO0lBQUQsQ0FBQyxBQTlFRCxDQUFzQix1QkFBVSxHQThFL0I7SUFFUSwwQkFBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYXJ0VHlwZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2NoYXJ0TWFuYWdlckNoYXJ0XCI7XHJcbmltcG9ydCB7IFNjYWxlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvc2NhbGVcIjtcclxuaW1wb3J0IHsgQmFzaWNDaGFydCB9IGZyb20gXCIuL0Jhc2ljQ2hhcnRcIjtcclxuaW1wb3J0IHsgQ3Vyc29ySGFuZGxlciB9IGZyb20gXCIuL2N1cnNvci9DdXJzb3JIYW5kbGVyXCI7XHJcbmltcG9ydCB7IElWaWV3IH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL3ZpZXdJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSUN1cnNvclN0YXRlIH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL2N1cnNvclN0YXRlSW50ZXJmYWNlXCI7XHJcblxyXG5jbGFzcyBZVENoYXJ0IGV4dGVuZHMgQmFzaWNDaGFydHtcclxuXHJcbiAgICBwcmltYXJ5WEF4aXNOYW1lID0gXCJQcmltYXJ5VGltZUF4aXNcIjtcclxuICAgIHByaW1hcnlZQXhpc05hbWUgPSBcIlNjYWxlXzFcIjtcclxuXHJcbiAgICBjdXJzb3JIYW5kbGVyIDogQ3Vyc29ySGFuZGxlcnx1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IocGFyZW50VmlldzogSVZpZXcsIG5hbWU6IHN0cmluZywgdHlwZTogQ2hhcnRUeXBlLCBzY2FsZTogU2NhbGUpIHtcclxuICAgICAgICBzdXBlcihwYXJlbnRWaWV3LCBuYW1lLCBzY2FsZSk7XHJcblxyXG4gICAgICAgIHRoaXMud2lkZ2V0TmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRXaWRnZXRUb1ZpZXcocGFyZW50Vmlldyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRpYWxpemVDdXJzb3JIYW5kbGVycygpe1xyXG4gICAgICAgIGlmICh0aGlzLmN1cnNvckhhbmRsZXIgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5jdXJzb3JIYW5kbGVyID0gKG5ldyBDdXJzb3JIYW5kbGVyKHRoaXMucGFyZW50Q29udGVudElkLCB0aGlzLmNoYXJ0LmdldENoYXJ0QXJlYSgpKSk7XHJcbiAgICAgICAgICAgIHRoaXMuY3Vyc29ySGFuZGxlci5lbmFibGVDcm9zc2hhaXJDdXJzb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnNvckhhbmRsZXIuZW5hYmxlTGluZUN1cnNvciA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IG1pbiB4IHZhbHVlIGZyb20gYWxsIHNlcmllcyBpbiB0aGUgY2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IHRyYWNlQ2hhcnRMaXN0XHJcbiAgICAgKiBAcmV0dXJucyB7KG51bWJlcnx1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIFlUQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFRvdGFsTWluWCh0cmFjZUNoYXJ0TGlzdCkgOiBudW1iZXJ8dW5kZWZpbmVke1xyXG4gICAgICAgIGxldCBtaW5YOiBudW1iZXJ8dW5kZWZpbmVkID0gdW5kZWZpbmVkXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRyYWNlQ2hhcnRMaXN0Lmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGNoYXJ0ID0gdHJhY2VDaGFydExpc3RbaV1cclxuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IGNoYXJ0LnNlcmllcy5sZW5ndGg7IGorKyl7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hhcnQuc2VyaWVzW2pdICE9PSB1bmRlZmluZWQgJiYgY2hhcnQudHlwZSA9PSBDaGFydFR5cGUuWVRDaGFydCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1pblggPT0gdW5kZWZpbmVkIHx8IGNoYXJ0LnNlcmllc1tqXS5taW5YIDwgbWluWCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pblggPSBjaGFydC5zZXJpZXNbal0ubWluWDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1pblg7ICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgbWF4IHggdmFsdWUgZnJvbSBhbGwgc2VyaWVzIGluIHRoZSBjaGFydFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gdHJhY2VDaGFydExpc3RcclxuICAgICAqIEByZXR1cm5zIHsobnVtYmVyfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgWVRDaGFydFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0VG90YWxNYXhYKHRyYWNlQ2hhcnRMaXN0KTogbnVtYmVyfHVuZGVmaW5lZHtcclxuICAgICAgICBsZXQgbWF4WDogbnVtYmVyfHVuZGVmaW5lZCA9IHVuZGVmaW5lZFxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0cmFjZUNoYXJ0TGlzdC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBjaGFydCA9IHRyYWNlQ2hhcnRMaXN0W2ldXHJcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBjaGFydC5zZXJpZXMubGVuZ3RoOyBqKyspe1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoYXJ0LnNlcmllc1tqXSAhPT0gdW5kZWZpbmVkICYmIGNoYXJ0LnR5cGUgPT0gQ2hhcnRUeXBlLllUQ2hhcnQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXhYID09IHVuZGVmaW5lZCB8fCBjaGFydC5zZXJpZXNbal0ubWF4WCA+IG1heFgpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhYID0gY2hhcnQuc2VyaWVzW2pdLm1heFg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtYXhYOyAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB1c2VkIGN1cnNvciBzdGF0ZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8SUN1cnNvclN0YXRlPn1cclxuICAgICAqIEBtZW1iZXJvZiBZVENoYXJ0XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXRVc2VkQ3Vyc29yU3RhdGVzKCk6IEFycmF5PElDdXJzb3JTdGF0ZT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1cnNvcnNTdGF0ZXMuZ2V0VGltZVN0YXRlcygpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBZVENoYXJ0IH07XHJcblxyXG4iXX0=