define(["require", "exports", "../../../models/chartManagerDataModel/chartManagerChart"], function (require, exports, chartManagerChart_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //smalles resolution that SF can display on an axis
    exports.SF_axisResolution = 1e-12;
    var ChartRangeHelper = /** @class */ (function () {
        function ChartRangeHelper() {
        }
        ChartRangeHelper.prototype.resetChartRangesX = function (traceChartList, chartType) {
            if (traceChartList[0] != undefined) {
                if (chartType == chartManagerChart_1.ChartType.FFTChart) {
                    traceChartList = this.getFFTCharts(traceChartList);
                }
                else if (chartType == chartManagerChart_1.ChartType.YTChart) {
                    traceChartList = this.getYTCharts(traceChartList);
                }
                else {
                    traceChartList = traceChartList;
                }
                for (var i = 0; i < traceChartList.length; i++) {
                    var charts = new Array();
                    ;
                    if (traceChartList[i].type == chartManagerChart_1.ChartType.FFTChart) {
                        charts = this.getFFTCharts(traceChartList);
                    }
                    else if (traceChartList[i].type == chartManagerChart_1.ChartType.YTChart) {
                        charts = this.getYTCharts(traceChartList);
                    }
                    else {
                        charts.push(traceChartList[i]);
                    }
                    var minX = this.getTotalMinX(charts);
                    var maxX = this.getTotalMaxX(charts);
                    if (minX != undefined && maxX != undefined) {
                        traceChartList[i].updateChartRangeX(minX, maxX);
                    }
                }
            }
        };
        ChartRangeHelper.prototype.resetChartRangesY = function (traceChartList) {
            for (var i = 0; i < traceChartList.length; i++) {
                var yAxes = traceChartList[i].getYScales();
                for (var j = 0; j < yAxes.length; j++) {
                    var axisMinValue = traceChartList[i].getSeriesMinYForScale(yAxes[j]);
                    var axisMaxValue = traceChartList[i].getSeriesMaxYForScale(yAxes[j]);
                    if (axisMinValue != undefined && axisMaxValue != undefined) {
                        traceChartList[i].updateRangeY(yAxes[j], axisMinValue, axisMaxValue);
                    }
                }
            }
        };
        ChartRangeHelper.prototype.getAxisOffset = function (axisRange, axisPixelRange) {
            var clcOffset = 0;
            clcOffset = (axisRange / axisPixelRange) * 10;
            var minOffset = exports.SF_axisResolution; // compansate for smallest resolution of syncfution axis
            return Math.max(clcOffset, minOffset);
        };
        ChartRangeHelper.prototype.getAxisOffsetForStraightLines = function (lineValue) {
            var clcOffset = Math.abs(lineValue) * 0.1;
            var minOffset = exports.SF_axisResolution; // compansate for smallest resolution of syncfution axis
            return Math.max(clcOffset, minOffset);
        };
        /**
        * Get min x value from all series in the chart
        *
        * @param {*} traceChartList
        * @returns {(number|undefined)}
        * @memberof YTChart
        */
        ChartRangeHelper.prototype.getTotalMinX = function (traceChartList) {
            var minX = undefined;
            for (var i = 0; i < traceChartList.length; i++) {
                var chart = traceChartList[i];
                for (var j = 0; j < chart.series.length; j++) {
                    if (minX == undefined || chart.series[j].minX < minX) {
                        minX = chart.series[j].minX;
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
        ChartRangeHelper.prototype.getTotalMaxX = function (traceChartList) {
            var maxX = undefined;
            for (var i = 0; i < traceChartList.length; i++) {
                var chart = traceChartList[i];
                for (var j = 0; j < chart.series.length; j++) {
                    //if (chart.series[j] !== undefined && chart.type == ChartType.YTChart){
                    if (maxX == undefined || chart.series[j].maxX > maxX) {
                        maxX = chart.series[j].maxX;
                    }
                    //}
                }
            }
            return maxX;
        };
        ChartRangeHelper.prototype.getYTCharts = function (traceChartList) {
            var ytCharts = [];
            for (var _i = 0, traceChartList_1 = traceChartList; _i < traceChartList_1.length; _i++) {
                var chart = traceChartList_1[_i];
                if (chart.type == chartManagerChart_1.ChartType.YTChart) {
                    ytCharts.push(chart);
                }
            }
            return ytCharts;
        };
        ChartRangeHelper.prototype.getFFTCharts = function (traceChartList) {
            var fftCharts = [];
            for (var _i = 0, traceChartList_2 = traceChartList; _i < traceChartList_2.length; _i++) {
                var chart = traceChartList_2[_i];
                if (chart.type == chartManagerChart_1.ChartType.FFTChart) {
                    fftCharts.push(chart);
                }
            }
            return fftCharts;
        };
        return ChartRangeHelper;
    }());
    exports.ChartRangeHelper = ChartRangeHelper;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRSYW5nZUhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jaGFydFdpZGdldC9oZWxwZXJzL2NoYXJ0UmFuZ2VIZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBR0EsbURBQW1EO0lBQ3RDLFFBQUEsaUJBQWlCLEdBQVksS0FBSyxDQUFDO0lBQ2hEO1FBQUE7UUEySUEsQ0FBQztRQXpJRyw0Q0FBaUIsR0FBakIsVUFBa0IsY0FBNkIsRUFBRSxTQUFzQjtZQUNuRSxJQUFJLGNBQWMsQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLEVBQUU7Z0JBRWhDLElBQUksU0FBUyxJQUFJLDZCQUFTLENBQUMsUUFBUSxFQUFFO29CQUNqQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQTtpQkFDckQ7cUJBQ0ksSUFBSSxTQUFTLElBQUksNkJBQVMsQ0FBQyxPQUFPLEVBQUU7b0JBQ3JDLGNBQWMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFBO2lCQUNwRDtxQkFDSTtvQkFDRCxjQUFjLEdBQUcsY0FBYyxDQUFDO2lCQUNuQztnQkFHRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDNUMsSUFBSSxNQUFNLEdBQW1CLElBQUksS0FBSyxFQUFFLENBQUM7b0JBQUEsQ0FBQztvQkFFMUMsSUFBSSxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLDZCQUFTLENBQUMsUUFBUSxFQUFFO3dCQUM5QyxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQTtxQkFDN0M7eUJBQ0ksSUFBSSxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLDZCQUFTLENBQUMsT0FBTyxFQUFFO3dCQUNsRCxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQTtxQkFDNUM7eUJBQ0k7d0JBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDbEM7b0JBRUQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDckMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFFckMsSUFBSSxJQUFJLElBQUksU0FBUyxJQUFJLElBQUksSUFBSSxTQUFTLEVBQUU7d0JBQ3hDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7cUJBQ25EO2lCQUNKO2FBQ0o7UUFDTCxDQUFDO1FBR0QsNENBQWlCLEdBQWpCLFVBQWtCLGNBQThCO1lBQzVDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUM1QyxJQUFJLEtBQUssR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQzNDLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO29CQUNqQyxJQUFJLFlBQVksR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3JFLElBQUksWUFBWSxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFckUsSUFBRyxZQUFZLElBQUksU0FBUyxJQUFJLFlBQVksSUFBSSxTQUFTLEVBQUM7d0JBQ3RELGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQztxQkFDeEU7aUJBQ0o7YUFDSjtRQUVMLENBQUM7UUFFRCx3Q0FBYSxHQUFiLFVBQWMsU0FBaUIsRUFBRSxjQUFzQjtZQUNuRCxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7WUFDbEIsU0FBUyxHQUFHLENBQUMsU0FBUyxHQUFHLGNBQWMsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtZQUM3QyxJQUFJLFNBQVMsR0FBRyx5QkFBaUIsQ0FBQyxDQUFDLHdEQUF3RDtZQUUzRixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzFDLENBQUM7UUFHRCx3REFBNkIsR0FBN0IsVUFBOEIsU0FBaUI7WUFDM0MsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBQyxHQUFHLENBQUM7WUFDeEMsSUFBSSxTQUFTLEdBQUcseUJBQWlCLENBQUMsQ0FBQyx3REFBd0Q7WUFDM0YsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUMxQyxDQUFDO1FBSUE7Ozs7OztVQU1FO1FBQ0ksdUNBQVksR0FBbkIsVUFBb0IsY0FBYztZQUM5QixJQUFJLElBQUksR0FBcUIsU0FBUyxDQUFBO1lBQ3RDLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUMxQyxJQUFJLEtBQUssR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBQzdCLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztvQkFDcEMsSUFBSSxJQUFJLElBQUksU0FBUyxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksRUFBQzt3QkFDakQsSUFBSSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO3FCQUMvQjtpQkFDUjthQUNKO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNJLHVDQUFZLEdBQW5CLFVBQW9CLGNBQWM7WUFDOUIsSUFBSSxJQUFJLEdBQXFCLFNBQVMsQ0FBQTtZQUN0QyxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztnQkFDMUMsSUFBSSxLQUFLLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUM3QixLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7b0JBQ3hDLHdFQUF3RTtvQkFDcEUsSUFBSSxJQUFJLElBQUksU0FBUyxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksRUFBQzt3QkFDakQsSUFBSSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO3FCQUMvQjtvQkFDTCxHQUFHO2lCQUNOO2FBQ0o7WUFDRCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO1FBRU0sc0NBQVcsR0FBbEIsVUFBbUIsY0FBOEI7WUFDN0MsSUFBSSxRQUFRLEdBQWtCLEVBQUUsQ0FBQztZQUNqQyxLQUFrQixVQUFjLEVBQWQsaUNBQWMsRUFBZCw0QkFBYyxFQUFkLElBQWMsRUFBRTtnQkFBN0IsSUFBSSxLQUFLLHVCQUFBO2dCQUNWLElBQUksS0FBSyxDQUFDLElBQUksSUFBSSw2QkFBUyxDQUFDLE9BQU8sRUFBRTtvQkFDakMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDeEI7YUFDSjtZQUVELE9BQU8sUUFBUSxDQUFDO1FBQ3BCLENBQUM7UUFFTSx1Q0FBWSxHQUFuQixVQUFvQixjQUE4QjtZQUM5QyxJQUFJLFNBQVMsR0FBa0IsRUFBRSxDQUFDO1lBQ2xDLEtBQWtCLFVBQWMsRUFBZCxpQ0FBYyxFQUFkLDRCQUFjLEVBQWQsSUFBYyxFQUFFO2dCQUE3QixJQUFJLEtBQUssdUJBQUE7Z0JBQ1YsSUFBSSxLQUFLLENBQUMsSUFBSSxJQUFJLDZCQUFTLENBQUMsUUFBUSxFQUFFO29CQUNsQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUN6QjthQUNKO1lBRUQsT0FBTyxTQUFTLENBQUM7UUFDckIsQ0FBQztRQUtMLHVCQUFDO0lBQUQsQ0FBQyxBQTNJRCxJQTJJQztJQUVPLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElUcmFjZUNoYXJ0IH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvdHJhY2VDaGFydEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDaGFydFR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9jaGFydE1hbmFnZXJDaGFydFwiO1xyXG5cclxuLy9zbWFsbGVzIHJlc29sdXRpb24gdGhhdCBTRiBjYW4gZGlzcGxheSBvbiBhbiBheGlzXHJcbmV4cG9ydCBjb25zdCBTRl9heGlzUmVzb2x1dGlvbiA6IG51bWJlciA9IDFlLTEyO1xyXG5jbGFzcyBDaGFydFJhbmdlSGVscGVye1xyXG5cclxuICAgIHJlc2V0Q2hhcnRSYW5nZXNYKHRyYWNlQ2hhcnRMaXN0OiBJVHJhY2VDaGFydFtdLCBjaGFydFR5cGU/IDogQ2hhcnRUeXBlKXtcclxuICAgICAgICBpZiAodHJhY2VDaGFydExpc3RbMF0gIT0gdW5kZWZpbmVkKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoY2hhcnRUeXBlID09IENoYXJ0VHlwZS5GRlRDaGFydCkge1xyXG4gICAgICAgICAgICAgICAgdHJhY2VDaGFydExpc3QgPSB0aGlzLmdldEZGVENoYXJ0cyh0cmFjZUNoYXJ0TGlzdClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChjaGFydFR5cGUgPT0gQ2hhcnRUeXBlLllUQ2hhcnQpIHtcclxuICAgICAgICAgICAgICAgIHRyYWNlQ2hhcnRMaXN0ID0gdGhpcy5nZXRZVENoYXJ0cyh0cmFjZUNoYXJ0TGlzdClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRyYWNlQ2hhcnRMaXN0ID0gdHJhY2VDaGFydExpc3Q7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRyYWNlQ2hhcnRMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2hhcnRzIDogSVRyYWNlQ2hhcnRbXSA9IG5ldyBBcnJheSgpOztcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodHJhY2VDaGFydExpc3RbaV0udHlwZSA9PSBDaGFydFR5cGUuRkZUQ2hhcnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjaGFydHMgPSB0aGlzLmdldEZGVENoYXJ0cyh0cmFjZUNoYXJ0TGlzdClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRyYWNlQ2hhcnRMaXN0W2ldLnR5cGUgPT0gQ2hhcnRUeXBlLllUQ2hhcnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjaGFydHMgPSB0aGlzLmdldFlUQ2hhcnRzKHRyYWNlQ2hhcnRMaXN0KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hhcnRzLnB1c2godHJhY2VDaGFydExpc3RbaV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBtaW5YID0gdGhpcy5nZXRUb3RhbE1pblgoY2hhcnRzKTtcclxuICAgICAgICAgICAgICAgIGxldCBtYXhYID0gdGhpcy5nZXRUb3RhbE1heFgoY2hhcnRzKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobWluWCAhPSB1bmRlZmluZWQgJiYgbWF4WCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0cmFjZUNoYXJ0TGlzdFtpXS51cGRhdGVDaGFydFJhbmdlWChtaW5YLCBtYXhYKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcmVzZXRDaGFydFJhbmdlc1kodHJhY2VDaGFydExpc3QgOiBJVHJhY2VDaGFydFtdKXtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRyYWNlQ2hhcnRMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCB5QXhlcyA9IHRyYWNlQ2hhcnRMaXN0W2ldLmdldFlTY2FsZXMoKTtcclxuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IHlBeGVzLmxlbmd0aDsgaisrKXtcclxuICAgICAgICAgICAgICAgIGxldCBheGlzTWluVmFsdWUgPSB0cmFjZUNoYXJ0TGlzdFtpXS5nZXRTZXJpZXNNaW5ZRm9yU2NhbGUoeUF4ZXNbal0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGF4aXNNYXhWYWx1ZSA9IHRyYWNlQ2hhcnRMaXN0W2ldLmdldFNlcmllc01heFlGb3JTY2FsZSh5QXhlc1tqXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoYXhpc01pblZhbHVlICE9IHVuZGVmaW5lZCAmJiBheGlzTWF4VmFsdWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICB0cmFjZUNoYXJ0TGlzdFtpXS51cGRhdGVSYW5nZVkoeUF4ZXNbal0sIGF4aXNNaW5WYWx1ZSwgYXhpc01heFZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QXhpc09mZnNldChheGlzUmFuZ2U6IG51bWJlciwgYXhpc1BpeGVsUmFuZ2U6IG51bWJlcikgOiBudW1iZXJ7XHJcbiAgICAgICAgbGV0IGNsY09mZnNldCA9IDA7XHJcbiAgICAgICAgY2xjT2Zmc2V0ID0gKGF4aXNSYW5nZSAvIGF4aXNQaXhlbFJhbmdlKSAqIDEwXHJcbiAgICAgICAgbGV0IG1pbk9mZnNldCA9IFNGX2F4aXNSZXNvbHV0aW9uOyAvLyBjb21wYW5zYXRlIGZvciBzbWFsbGVzdCByZXNvbHV0aW9uIG9mIHN5bmNmdXRpb24gYXhpc1xyXG5cclxuICAgICAgICByZXR1cm4gTWF0aC5tYXgoY2xjT2Zmc2V0LCBtaW5PZmZzZXQpO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgZ2V0QXhpc09mZnNldEZvclN0cmFpZ2h0TGluZXMobGluZVZhbHVlOiBudW1iZXIpOiBudW1iZXJ7XHJcbiAgICAgICAgbGV0IGNsY09mZnNldCA9IE1hdGguYWJzKGxpbmVWYWx1ZSkqMC4xO1xyXG4gICAgICAgIGxldCBtaW5PZmZzZXQgPSBTRl9heGlzUmVzb2x1dGlvbjsgLy8gY29tcGFuc2F0ZSBmb3Igc21hbGxlc3QgcmVzb2x1dGlvbiBvZiBzeW5jZnV0aW9uIGF4aXNcclxuICAgICAgICByZXR1cm4gTWF0aC5tYXgoY2xjT2Zmc2V0LCBtaW5PZmZzZXQpO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgIC8qKlxyXG4gICAgICogR2V0IG1pbiB4IHZhbHVlIGZyb20gYWxsIHNlcmllcyBpbiB0aGUgY2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IHRyYWNlQ2hhcnRMaXN0XHJcbiAgICAgKiBAcmV0dXJucyB7KG51bWJlcnx1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIFlUQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFRvdGFsTWluWCh0cmFjZUNoYXJ0TGlzdCkgOiBudW1iZXJ8dW5kZWZpbmVke1xyXG4gICAgICAgIGxldCBtaW5YOiBudW1iZXJ8dW5kZWZpbmVkID0gdW5kZWZpbmVkXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRyYWNlQ2hhcnRMaXN0Lmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGNoYXJ0ID0gdHJhY2VDaGFydExpc3RbaV1cclxuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IGNoYXJ0LnNlcmllcy5sZW5ndGg7IGorKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1pblggPT0gdW5kZWZpbmVkIHx8IGNoYXJ0LnNlcmllc1tqXS5taW5YIDwgbWluWCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pblggPSBjaGFydC5zZXJpZXNbal0ubWluWDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1pblg7ICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgbWF4IHggdmFsdWUgZnJvbSBhbGwgc2VyaWVzIGluIHRoZSBjaGFydFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gdHJhY2VDaGFydExpc3RcclxuICAgICAqIEByZXR1cm5zIHsobnVtYmVyfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgWVRDaGFydFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0VG90YWxNYXhYKHRyYWNlQ2hhcnRMaXN0KTogbnVtYmVyfHVuZGVmaW5lZHtcclxuICAgICAgICBsZXQgbWF4WDogbnVtYmVyfHVuZGVmaW5lZCA9IHVuZGVmaW5lZFxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0cmFjZUNoYXJ0TGlzdC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBjaGFydCA9IHRyYWNlQ2hhcnRMaXN0W2ldXHJcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBjaGFydC5zZXJpZXMubGVuZ3RoOyBqKyspe1xyXG4gICAgICAgICAgICAgICAgLy9pZiAoY2hhcnQuc2VyaWVzW2pdICE9PSB1bmRlZmluZWQgJiYgY2hhcnQudHlwZSA9PSBDaGFydFR5cGUuWVRDaGFydCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1heFggPT0gdW5kZWZpbmVkIHx8IGNoYXJ0LnNlcmllc1tqXS5tYXhYID4gbWF4WCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heFggPSBjaGFydC5zZXJpZXNbal0ubWF4WDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWF4WDsgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFlUQ2hhcnRzKHRyYWNlQ2hhcnRMaXN0IDogSVRyYWNlQ2hhcnRbXSk6IElUcmFjZUNoYXJ0W10ge1xyXG4gICAgICAgIGxldCB5dENoYXJ0czogSVRyYWNlQ2hhcnRbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGNoYXJ0IG9mIHRyYWNlQ2hhcnRMaXN0KSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFydC50eXBlID09IENoYXJ0VHlwZS5ZVENoYXJ0KSB7XHJcbiAgICAgICAgICAgICAgICB5dENoYXJ0cy5wdXNoKGNoYXJ0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHl0Q2hhcnRzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRGRlRDaGFydHModHJhY2VDaGFydExpc3QgOiBJVHJhY2VDaGFydFtdKTogSVRyYWNlQ2hhcnRbXSB7XHJcbiAgICAgICAgbGV0IGZmdENoYXJ0czogSVRyYWNlQ2hhcnRbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGNoYXJ0IG9mIHRyYWNlQ2hhcnRMaXN0KSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFydC50eXBlID09IENoYXJ0VHlwZS5GRlRDaGFydCkge1xyXG4gICAgICAgICAgICAgICAgZmZ0Q2hhcnRzLnB1c2goY2hhcnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmZ0Q2hhcnRzO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxuXHJcbn1cclxuXHJcbmV4cG9ydCB7Q2hhcnRSYW5nZUhlbHBlcn07Il19