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
define(["require", "exports", "../../models/chartManagerDataModel/chartManagerChart", "../common/states/cursorStates", "./BasicChart", "./cursor/CursorHandler"], function (require, exports, chartManagerChart_1, cursorStates_1, BasicChart_1, CursorHandler_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FFTChart = /** @class */ (function (_super) {
        __extends(FFTChart, _super);
        function FFTChart(parentView, name, type, scale) {
            var _this = _super.call(this, parentView, name, scale) || this;
            _this.primaryXAxisName = "PrimaryFrequencyAxis";
            _this.primaryYAxisName = "Scale_1";
            _this.widgetName = name;
            _this.type = type;
            _this.addWidgetToView(parentView);
            return _this;
        }
        FFTChart.prototype.initializeCursorHandlers = function () {
            if (this.cursorHandler == undefined) {
                this.cursorHandler = (new CursorHandler_1.CursorHandler(this.parentContentId, this.chart.getChartArea()));
                this.cursorHandler.enableLineCursor = true;
                this.cursorHandler.enableCrosshairCursor = true;
            }
        };
        /**
         * Internal method for actually moving the cursors. Pass the x and y
         * position on the property and this method will figure out where to
         * place the cursors and update the states accordingly
         *
         * @protected
         * @param {number} x
         * @param {number} y
         * @returns
         * @memberof ChartBase
         */
        FFTChart.prototype.setCursor = function (x, y) {
            if (!this.series.length) {
                return;
            }
            this.cursorsStates.setLastCursorTypeSelected(cursorStates_1.CursorType.frequencyDomain);
            var hoveredCursorIndex = this.cursorsStates.getHoveredCursorIndex();
            if (hoveredCursorIndex > -1) { // Set selected cursor when hovered cursor was found
                this.cursorsStates.setSelected(hoveredCursorIndex, true);
            }
            else {
                this.cursorsStates.setSelected(this.cursorsStates.getSelectedCursorIndex(), true);
            }
            this.updateSelectedCursor(this.cursorsStates, x, y);
        };
        /**
         * Get min x value from all series in the chart
         *
         * @param {*} traceChartList
         * @returns {(number|undefined)}
         * @memberof FFTChart
         */
        FFTChart.prototype.getTotalMinX = function (traceChartList) {
            var minX = undefined;
            for (var i = 0; i < traceChartList.length; i++) {
                var chart = traceChartList[i];
                for (var j = 0; j < chart.series.length; j++) {
                    if (chart.series[j] !== undefined && chart.type == chartManagerChart_1.ChartType.FFTChart) {
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
         * @memberof FFTChart
         */
        FFTChart.prototype.getTotalMaxX = function (traceChartList) {
            var maxX = undefined;
            for (var i = 0; i < traceChartList.length; i++) {
                var chart = traceChartList[i];
                for (var j = 0; j < chart.series.length; j++) {
                    if (chart.series[j] !== undefined && chart.type == chartManagerChart_1.ChartType.FFTChart) {
                        if (maxX == undefined || chart.series[j].maxX > maxX) {
                            maxX = chart.series[j].maxX;
                        }
                    }
                }
            }
            return maxX;
        };
        FFTChart.prototype.removeSerieFromChart = function (serie) {
            var index = this.serieInChart(serie);
            if (index > -1) {
                this.series.splice(index, 1);
            }
            this.setAvailableSeriesAsDataSource();
            //redraw cursors
            var states = this.cursorsStates.getFrequencyStates();
            for (var i = 0; i < states.length; i++) {
                var timestamp = states[i].position;
                if (timestamp != undefined) {
                    this.drawCursor(timestamp, i, states[i].hovered, states[i].selected);
                }
            }
        };
        return FFTChart;
    }(BasicChart_1.BasicChart));
    exports.FFTChart = FFTChart;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRkZUQ2hhcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY2hhcnRXaWRnZXQvRkZUQ2hhcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVNBO1FBQXVCLDRCQUFVO1FBTzdCLGtCQUFZLFVBQWtCLEVBQUUsSUFBWSxFQUFFLElBQWUsRUFBRSxLQUFZO1lBQTNFLFlBQ0ksa0JBQU0sVUFBVSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsU0FNakM7WUFaRCxzQkFBZ0IsR0FBRyxzQkFBc0IsQ0FBQztZQUMxQyxzQkFBZ0IsR0FBRyxTQUFTLENBQUM7WUFPekIsS0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFDdkIsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFFakIsS0FBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQzs7UUFDckMsQ0FBQztRQUVTLDJDQUF3QixHQUFsQztZQUNJLElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxTQUFTLEVBQUM7Z0JBQ2hDLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxJQUFJLDZCQUFhLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDMUYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7Z0JBQzNDLElBQUksQ0FBQyxhQUFhLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDO2FBRW5EO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDTyw0QkFBUyxHQUFuQixVQUFvQixDQUFTLEVBQUUsQ0FBUztZQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUM7Z0JBQ3BCLE9BQU87YUFDVjtZQUNELElBQUksQ0FBQyxhQUFhLENBQUMseUJBQXlCLENBQUMs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QUFDO1lBRXRDLGdCQUFnQjtZQUNoQixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFrQixFQUFFLENBQUM7WUFFckQsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQ2xDLElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7Z0JBQ25DLElBQUcsU0FBUyxJQUFJLFNBQVMsRUFBQztvQkFDdEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUN4RTthQUNKO1FBQ0wsQ0FBQztRQUNMLGVBQUM7SUFBRCxDQUFDLEFBbkhELENBQXVCLHVCQUFVLEdBbUhoQztJQUVRLDRCQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhcnRUeXBlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvY2hhcnRNYW5hZ2VyQ2hhcnRcIjtcclxuaW1wb3J0IHsgQmFzZVNlcmllcyB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2Jhc2VTZXJpZXNcIjtcclxuaW1wb3J0IHsgU2NhbGUgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9zY2FsZVwiO1xyXG5pbXBvcnQgeyBDdXJzb3JUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi9zdGF0ZXMvY3Vyc29yU3RhdGVzXCI7XHJcbmltcG9ydCB7IEJhc2ljQ2hhcnQgfSBmcm9tIFwiLi9CYXNpY0NoYXJ0XCI7XHJcbmltcG9ydCB7IEN1cnNvckhhbmRsZXIgfSBmcm9tIFwiLi9jdXJzb3IvQ3Vyc29ySGFuZGxlclwiO1xyXG5pbXBvcnQgeyBDaGFydFZpZXdTZXJpZSB9IGZyb20gXCIuL2NoYXJ0Vmlld1NlcmllXCI7XHJcbmltcG9ydCB7IElWaWV3IH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL3ZpZXdJbnRlcmZhY2VcIjtcclxuXHJcbmNsYXNzIEZGVENoYXJ0IGV4dGVuZHMgQmFzaWNDaGFydHtcclxuXHJcbiAgICBwcmltYXJ5WEF4aXNOYW1lID0gXCJQcmltYXJ5RnJlcXVlbmN5QXhpc1wiO1xyXG4gICAgcHJpbWFyeVlBeGlzTmFtZSA9IFwiU2NhbGVfMVwiO1xyXG5cclxuICAgIGN1cnNvckhhbmRsZXIhOiBDdXJzb3JIYW5kbGVyXHJcblxyXG4gICAgY29uc3RydWN0b3IocGFyZW50VmlldyA6IElWaWV3LCBuYW1lOiBzdHJpbmcsIHR5cGU6IENoYXJ0VHlwZSwgc2NhbGU6IFNjYWxlKSB7XHJcbiAgICAgICAgc3VwZXIocGFyZW50VmlldywgbmFtZSwgc2NhbGUpO1xyXG5cclxuICAgICAgICB0aGlzLndpZGdldE5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkV2lkZ2V0VG9WaWV3KHBhcmVudFZpZXcpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0aWFsaXplQ3Vyc29ySGFuZGxlcnMoKXtcclxuICAgICAgICBpZiAodGhpcy5jdXJzb3JIYW5kbGVyID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuY3Vyc29ySGFuZGxlciA9IChuZXcgQ3Vyc29ySGFuZGxlcih0aGlzLnBhcmVudENvbnRlbnRJZCwgdGhpcy5jaGFydC5nZXRDaGFydEFyZWEoKSkpO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnNvckhhbmRsZXIuZW5hYmxlTGluZUN1cnNvciA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuY3Vyc29ySGFuZGxlci5lbmFibGVDcm9zc2hhaXJDdXJzb3IgPSB0cnVlO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbnRlcm5hbCBtZXRob2QgZm9yIGFjdHVhbGx5IG1vdmluZyB0aGUgY3Vyc29ycy4gUGFzcyB0aGUgeCBhbmQgeVxyXG4gICAgICogcG9zaXRpb24gb24gdGhlIHByb3BlcnR5IGFuZCB0aGlzIG1ldGhvZCB3aWxsIGZpZ3VyZSBvdXQgd2hlcmUgdG9cclxuICAgICAqIHBsYWNlIHRoZSBjdXJzb3JzIGFuZCB1cGRhdGUgdGhlIHN0YXRlcyBhY2NvcmRpbmdseVxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB4XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHNldEN1cnNvcih4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gICAgICAgIGlmICghdGhpcy5zZXJpZXMubGVuZ3RoKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmN1cnNvcnNTdGF0ZXMuc2V0TGFzdEN1cnNvclR5cGVTZWxlY3RlZChDdXJzb3JUeXBlLmZyZXF1ZW5jeURvbWFpbik7XHJcblxyXG4gICAgICAgIGxldCBob3ZlcmVkQ3Vyc29ySW5kZXggPSB0aGlzLmN1cnNvcnNTdGF0ZXMuZ2V0SG92ZXJlZEN1cnNvckluZGV4KCk7XHJcbiAgICAgICAgaWYgKGhvdmVyZWRDdXJzb3JJbmRleCA+IC0xKSB7IC8vIFNldCBzZWxlY3RlZCBjdXJzb3Igd2hlbiBob3ZlcmVkIGN1cnNvciB3YXMgZm91bmRcclxuICAgICAgICAgICAgdGhpcy5jdXJzb3JzU3RhdGVzLnNldFNlbGVjdGVkKGhvdmVyZWRDdXJzb3JJbmRleCwgdHJ1ZSk7XHJcbiAgICAgICAgfSBcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJzb3JzU3RhdGVzLnNldFNlbGVjdGVkKHRoaXMuY3Vyc29yc1N0YXRlcy5nZXRTZWxlY3RlZEN1cnNvckluZGV4KCksIHRydWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVTZWxlY3RlZEN1cnNvcih0aGlzLmN1cnNvcnNTdGF0ZXMsIHgsIHkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IG1pbiB4IHZhbHVlIGZyb20gYWxsIHNlcmllcyBpbiB0aGUgY2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IHRyYWNlQ2hhcnRMaXN0XHJcbiAgICAgKiBAcmV0dXJucyB7KG51bWJlcnx1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIEZGVENoYXJ0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRUb3RhbE1pblgodHJhY2VDaGFydExpc3QpIDogbnVtYmVyfHVuZGVmaW5lZHtcclxuICAgICAgICBsZXQgbWluWDogbnVtYmVyfHVuZGVmaW5lZCA9IHVuZGVmaW5lZFxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0cmFjZUNoYXJ0TGlzdC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBjaGFydCA9IHRyYWNlQ2hhcnRMaXN0W2ldXHJcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBjaGFydC5zZXJpZXMubGVuZ3RoOyBqKyspe1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoYXJ0LnNlcmllc1tqXSAhPT0gdW5kZWZpbmVkICYmIGNoYXJ0LnR5cGUgPT0gQ2hhcnRUeXBlLkZGVENoYXJ0KXtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobWluWCA9PSB1bmRlZmluZWQgfHwgY2hhcnQuc2VyaWVzW2pdLm1pblggPCBtaW5YKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWluWCA9IGNoYXJ0LnNlcmllc1tqXS5taW5YO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWluWDsgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBtYXggeCB2YWx1ZSBmcm9tIGFsbCBzZXJpZXMgaW4gdGhlIGNoYXJ0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSB0cmFjZUNoYXJ0TGlzdFxyXG4gICAgICogQHJldHVybnMgeyhudW1iZXJ8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBGRlRDaGFydFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0VG90YWxNYXhYKHRyYWNlQ2hhcnRMaXN0KTogbnVtYmVyfHVuZGVmaW5lZHtcclxuICAgICAgICBsZXQgbWF4WDogbnVtYmVyfHVuZGVmaW5lZCA9IHVuZGVmaW5lZFxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0cmFjZUNoYXJ0TGlzdC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBjaGFydCA9IHRyYWNlQ2hhcnRMaXN0W2ldXHJcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBjaGFydC5zZXJpZXMubGVuZ3RoOyBqKyspe1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoYXJ0LnNlcmllc1tqXSAhPT0gdW5kZWZpbmVkICYmIGNoYXJ0LnR5cGUgPT0gQ2hhcnRUeXBlLkZGVENoYXJ0KXtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobWF4WCA9PSB1bmRlZmluZWQgfHwgY2hhcnQuc2VyaWVzW2pdLm1heFggPiBtYXhYKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4WCA9IGNoYXJ0LnNlcmllc1tqXS5tYXhYO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWF4WDsgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZVNlcmllRnJvbUNoYXJ0KHNlcmllOiBCYXNlU2VyaWVzfENoYXJ0Vmlld1NlcmllKXtcclxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuc2VyaWVJbkNoYXJ0KHNlcmllKTtcclxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLnNlcmllcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZXRBdmFpbGFibGVTZXJpZXNBc0RhdGFTb3VyY2UoKTtcclxuXHJcbiAgICAgICAgLy9yZWRyYXcgY3Vyc29yc1xyXG4gICAgICAgIGxldCBzdGF0ZXMgPSB0aGlzLmN1cnNvcnNTdGF0ZXMuZ2V0RnJlcXVlbmN5U3RhdGVzKCk7XHJcblxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzdGF0ZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgdGltZXN0YW1wID0gc3RhdGVzW2ldLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICBpZih0aW1lc3RhbXAgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd0N1cnNvcih0aW1lc3RhbXAsIGksIHN0YXRlc1tpXS5ob3ZlcmVkLCBzdGF0ZXNbaV0uc2VsZWN0ZWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBGRlRDaGFydCB9O1xyXG5cclxuXHJcbiJdfQ==