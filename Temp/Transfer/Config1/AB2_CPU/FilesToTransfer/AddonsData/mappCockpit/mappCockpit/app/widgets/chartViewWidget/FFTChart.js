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
        function FFTChart(chartManager, name, type, scale) {
            var _this = _super.call(this, chartManager, name, scale) || this;
            _this.primaryXAxisName = "PrimaryFrequencyAxis";
            _this.primaryYAxisName = "Scale_1";
            _this.widgetName = name;
            _this.chartManager = chartManager;
            _this.type = type;
            _this.addWidgetToView(chartManager);
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
            var cursorsStates = this.states.read(cursorStates_1.CursorStates, this.cursorStatesId);
            cursorsStates.setLastCursorTypeSelected(cursorStates_1.CursorType.frequencyDomain);
            var hoveredCursorIndex = cursorsStates.getHoveredCursorIndex();
            if (hoveredCursorIndex > -1) { // Set selected cursor when hovered cursor was found
                cursorsStates.setSelected(hoveredCursorIndex, true);
            }
            else {
                cursorsStates.setSelected(cursorsStates.getSelectedCursorIndex(), true);
            }
            this.updateSelectedCursor(cursorsStates, x, y);
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
            var cursorState = this.states.read(cursorStates_1.CursorStates, this.cursorStatesId);
            var states = cursorState.getFrequencyStates();
            for (var i = 0; i < states.length; i++) {
                var timestamp = states[i].position;
                this.drawCursor(timestamp, i, states[i].hovered, states[i].selected);
            }
        };
        return FFTChart;
    }(BasicChart_1.BasicChart));
    exports.FFTChart = FFTChart;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRkZUQ2hhcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY2hhcnRWaWV3V2lkZ2V0L0ZGVENoYXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFTQTtRQUF1Qiw0QkFBVTtRQU83QixrQkFBWSxZQUFtQyxFQUFFLElBQVksRUFBRSxJQUFlLEVBQUUsS0FBWTtZQUE1RixZQUNJLGtCQUFNLFlBQVksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLFNBT25DO1lBYkQsc0JBQWdCLEdBQUcsc0JBQXNCLENBQUM7WUFDMUMsc0JBQWdCLEdBQUcsU0FBUyxDQUFDO1lBT3pCLEtBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLEtBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1lBQ2pDLEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBRWpCLEtBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLENBQUM7O1FBQ3ZDLENBQUM7UUFFUywyQ0FBd0IsR0FBbEM7WUFDSSxJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksU0FBUyxFQUFDO2dCQUNoQyxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsSUFBSSw2QkFBYSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzFGLElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO2dCQUMzQyxJQUFJLENBQUMsYUFBYSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQzthQUVuRDtRQUNMLENBQUM7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ08sNEJBQVMsR0FBbkIsVUFBb0IsQ0FBUyxFQUFFLENBQVM7WUFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFDO2dCQUNwQixPQUFPO2FB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QUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ2hDO1lBRUQsSUFBSSxDQUFDLDhCQUE4QixFQUFFLENBQUM7WUFFdEMsZ0JBQWdCO1lBQ2hCLElBQUksV0FBVyxHQUFpQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQywyQkFBWSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUNwRixJQUFJLE1BQU0sR0FBRyxXQUFXLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztZQUU5QyxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztnQkFDbEMsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztnQkFDbkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFVLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3pFO1FBQ0wsQ0FBQztRQUNMLGVBQUM7SUFBRCxDQUFDLEFBcEhELENBQXVCLHVCQUFVLEdBb0hoQztJQUVRLDRCQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhcnRWaWV3Q2hhcnRNYW5hZ2VyIH0gZnJvbSBcIi4vY2hhcnRWaWV3Q2hhcnRNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IENoYXJ0VHlwZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2NoYXJ0TWFuYWdlckNoYXJ0XCI7XHJcbmltcG9ydCB7IEJhc2VTZXJpZXMgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9iYXNlU2VyaWVzXCI7XHJcbmltcG9ydCB7IFNjYWxlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvc2NhbGVcIjtcclxuaW1wb3J0IHsgQ3Vyc29yU3RhdGVzLCBDdXJzb3JUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi9zdGF0ZXMvY3Vyc29yU3RhdGVzXCI7XHJcbmltcG9ydCB7IEJhc2ljQ2hhcnQgfSBmcm9tIFwiLi9CYXNpY0NoYXJ0XCI7XHJcbmltcG9ydCB7IEN1cnNvckhhbmRsZXIgfSBmcm9tIFwiLi9jdXJzb3IvQ3Vyc29ySGFuZGxlclwiO1xyXG5pbXBvcnQgeyBDaGFydFZpZXdTZXJpZSB9IGZyb20gXCIuL2NoYXJ0Vmlld1NlcmllXCI7XHJcblxyXG5jbGFzcyBGRlRDaGFydCBleHRlbmRzIEJhc2ljQ2hhcnR7XHJcblxyXG4gICAgcHJpbWFyeVhBeGlzTmFtZSA9IFwiUHJpbWFyeUZyZXF1ZW5jeUF4aXNcIjtcclxuICAgIHByaW1hcnlZQXhpc05hbWUgPSBcIlNjYWxlXzFcIjtcclxuXHJcbiAgICBjdXJzb3JIYW5kbGVyITogQ3Vyc29ySGFuZGxlclxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNoYXJ0TWFuYWdlcjogQ2hhcnRWaWV3Q2hhcnRNYW5hZ2VyLCBuYW1lOiBzdHJpbmcsIHR5cGU6IENoYXJ0VHlwZSwgc2NhbGU6IFNjYWxlKSB7XHJcbiAgICAgICAgc3VwZXIoY2hhcnRNYW5hZ2VyLCBuYW1lLCBzY2FsZSk7XHJcblxyXG4gICAgICAgIHRoaXMud2lkZ2V0TmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5jaGFydE1hbmFnZXIgPSBjaGFydE1hbmFnZXI7XHJcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRXaWRnZXRUb1ZpZXcoY2hhcnRNYW5hZ2VyKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdGlhbGl6ZUN1cnNvckhhbmRsZXJzKCl7XHJcbiAgICAgICAgaWYgKHRoaXMuY3Vyc29ySGFuZGxlciA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmN1cnNvckhhbmRsZXIgPSAobmV3IEN1cnNvckhhbmRsZXIodGhpcy5wYXJlbnRDb250ZW50SWQsIHRoaXMuY2hhcnQuZ2V0Q2hhcnRBcmVhKCkpKTtcclxuICAgICAgICAgICAgdGhpcy5jdXJzb3JIYW5kbGVyLmVuYWJsZUxpbmVDdXJzb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnNvckhhbmRsZXIuZW5hYmxlQ3Jvc3NoYWlyQ3Vyc29yID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW50ZXJuYWwgbWV0aG9kIGZvciBhY3R1YWxseSBtb3ZpbmcgdGhlIGN1cnNvcnMuIFBhc3MgdGhlIHggYW5kIHlcclxuICAgICAqIHBvc2l0aW9uIG9uIHRoZSBwcm9wZXJ0eSBhbmQgdGhpcyBtZXRob2Qgd2lsbCBmaWd1cmUgb3V0IHdoZXJlIHRvXHJcbiAgICAgKiBwbGFjZSB0aGUgY3Vyc29ycyBhbmQgdXBkYXRlIHRoZSBzdGF0ZXMgYWNjb3JkaW5nbHlcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHlcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBzZXRDdXJzb3IoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcclxuICAgICAgICBpZiAoIXRoaXMuc2VyaWVzLmxlbmd0aCl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGN1cnNvcnNTdGF0ZXM6IEN1cnNvclN0YXRlcyA9IHRoaXMuc3RhdGVzLnJlYWQoQ3Vyc29yU3RhdGVzLCB0aGlzLmN1cnNvclN0YXRlc0lkKTtcclxuICAgICAgICBjdXJzb3JzU3RhdGVzLnNldExhc3RDdXJzb3JUeXBlU2VsZWN0ZWQoQ3Vyc29yVHlwZS5mcmVxdWVuY3lEb21haW4pO1xyXG5cclxuICAgICAgICBsZXQgaG92ZXJlZEN1cnNvckluZGV4ID0gY3Vyc29yc1N0YXRlcy5nZXRIb3ZlcmVkQ3Vyc29ySW5kZXgoKTtcclxuICAgICAgICBpZiAoaG92ZXJlZEN1cnNvckluZGV4ID4gLTEpIHsgLy8gU2V0IHNlbGVjdGVkIGN1cnNvciB3aGVuIGhvdmVyZWQgY3Vyc29yIHdhcyBmb3VuZFxyXG4gICAgICAgICAgICBjdXJzb3JzU3RhdGVzLnNldFNlbGVjdGVkKGhvdmVyZWRDdXJzb3JJbmRleCwgdHJ1ZSk7XHJcbiAgICAgICAgfSBcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY3Vyc29yc1N0YXRlcy5zZXRTZWxlY3RlZChjdXJzb3JzU3RhdGVzLmdldFNlbGVjdGVkQ3Vyc29ySW5kZXgoKSwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZVNlbGVjdGVkQ3Vyc29yKGN1cnNvcnNTdGF0ZXMsIHgsIHkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IG1pbiB4IHZhbHVlIGZyb20gYWxsIHNlcmllcyBpbiB0aGUgY2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IHRyYWNlQ2hhcnRMaXN0XHJcbiAgICAgKiBAcmV0dXJucyB7KG51bWJlcnx1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIEZGVENoYXJ0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRUb3RhbE1pblgodHJhY2VDaGFydExpc3QpIDogbnVtYmVyfHVuZGVmaW5lZHtcclxuICAgICAgICBsZXQgbWluWDogbnVtYmVyfHVuZGVmaW5lZCA9IHVuZGVmaW5lZFxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0cmFjZUNoYXJ0TGlzdC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBjaGFydCA9IHRyYWNlQ2hhcnRMaXN0W2ldXHJcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBjaGFydC5zZXJpZXMubGVuZ3RoOyBqKyspe1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoYXJ0LnNlcmllc1tqXSAhPT0gdW5kZWZpbmVkICYmIGNoYXJ0LnR5cGUgPT0gQ2hhcnRUeXBlLkZGVENoYXJ0KXtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobWluWCA9PSB1bmRlZmluZWQgfHwgY2hhcnQuc2VyaWVzW2pdLm1pblggPCBtaW5YKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWluWCA9IGNoYXJ0LnNlcmllc1tqXS5taW5YO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWluWDsgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBtYXggeCB2YWx1ZSBmcm9tIGFsbCBzZXJpZXMgaW4gdGhlIGNoYXJ0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSB0cmFjZUNoYXJ0TGlzdFxyXG4gICAgICogQHJldHVybnMgeyhudW1iZXJ8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBGRlRDaGFydFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0VG90YWxNYXhYKHRyYWNlQ2hhcnRMaXN0KTogbnVtYmVyfHVuZGVmaW5lZHtcclxuICAgICAgICBsZXQgbWF4WDogbnVtYmVyfHVuZGVmaW5lZCA9IHVuZGVmaW5lZFxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0cmFjZUNoYXJ0TGlzdC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBjaGFydCA9IHRyYWNlQ2hhcnRMaXN0W2ldXHJcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBjaGFydC5zZXJpZXMubGVuZ3RoOyBqKyspe1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoYXJ0LnNlcmllc1tqXSAhPT0gdW5kZWZpbmVkICYmIGNoYXJ0LnR5cGUgPT0gQ2hhcnRUeXBlLkZGVENoYXJ0KXtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobWF4WCA9PSB1bmRlZmluZWQgfHwgY2hhcnQuc2VyaWVzW2pdLm1heFggPiBtYXhYKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4WCA9IGNoYXJ0LnNlcmllc1tqXS5tYXhYO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWF4WDsgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZVNlcmllRnJvbUNoYXJ0KHNlcmllOiBCYXNlU2VyaWVzfENoYXJ0Vmlld1NlcmllKXtcclxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuc2VyaWVJbkNoYXJ0KHNlcmllKTtcclxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLnNlcmllcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZXRBdmFpbGFibGVTZXJpZXNBc0RhdGFTb3VyY2UoKTtcclxuXHJcbiAgICAgICAgLy9yZWRyYXcgY3Vyc29yc1xyXG4gICAgICAgIGxldCBjdXJzb3JTdGF0ZTogQ3Vyc29yU3RhdGVzID0gdGhpcy5zdGF0ZXMucmVhZChDdXJzb3JTdGF0ZXMsIHRoaXMuY3Vyc29yU3RhdGVzSWQpO1xyXG4gICAgICAgIGxldCBzdGF0ZXMgPSBjdXJzb3JTdGF0ZS5nZXRGcmVxdWVuY3lTdGF0ZXMoKTtcclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHN0YXRlcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCB0aW1lc3RhbXAgPSBzdGF0ZXNbaV0ucG9zaXRpb247XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd0N1cnNvcih0aW1lc3RhbXAhLCBpLCBzdGF0ZXNbaV0uaG92ZXJlZCwgc3RhdGVzW2ldLnNlbGVjdGVkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IEZGVENoYXJ0IH07XHJcblxyXG5cclxuIl19