define(["require", "exports", "../../chartWidget/ChartBase", "../../../models/chartManagerDataModel/chartManagerChart", "../../common/SerieChartTypeHelper"], function (require, exports, ChartBase_1, chartManagerChart_1, SerieChartTypeHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ChartDropHelperChangedHint;
    (function (ChartDropHelperChangedHint) {
        ChartDropHelperChangedHint[ChartDropHelperChangedHint["createChart"] = 0] = "createChart";
        ChartDropHelperChangedHint[ChartDropHelperChangedHint["addSerie"] = 1] = "addSerie";
        ChartDropHelperChangedHint[ChartDropHelperChangedHint["createXYSerie"] = 2] = "createXYSerie";
        ChartDropHelperChangedHint[ChartDropHelperChangedHint["createFFTSerie"] = 3] = "createFFTSerie";
    })(ChartDropHelperChangedHint = exports.ChartDropHelperChangedHint || (exports.ChartDropHelperChangedHint = {}));
    var ChartDropHelper = /** @class */ (function () {
        function ChartDropHelper(chartManagerDataModel, chartView) {
            this.chartManagerDataModel = chartManagerDataModel;
            this.chartViewWidget = chartView;
        }
        /**
         * Returns true if a chart can be added
         *
         * @returns {boolean}
         * @memberof ChartDropHelper
         */
        ChartDropHelper.prototype.canAddChart = function () {
            if (this.chartManagerDataModel != undefined) {
                if (this.chartManagerDataModel.canAddChart() == true) {
                    return true;
                }
            }
            return false;
        };
        /**
         * add the dropped serie to the correct place
         *
         * @param {*} currentTarget
         * @param {ITraceChart | undefined} targetChart
         * @param {Array<BaseSeries>} series
         * @returns
         * @memberof ChartDropHelper
         */
        ChartDropHelper.prototype.addSeries = function (currentTarget, targetChart, series, layoutManager) {
            var serieChartType = SerieChartTypeHelper_1.SerieChartTypeHelper.getSerieChartType(series[0].type);
            var areaXY = document.getElementById(layoutManager.chartSplitter.parentContentId + "_lastPane_XY");
            var areaYT = document.getElementById(layoutManager.chartSplitter.parentContentId + "_lastPane_YT");
            if (targetChart && serieChartType == targetChart.type) {
                this.addSeriesToExistingChart(targetChart, series);
            }
            else if (targetChart && serieChartType != targetChart.type) {
                this.addYTSeriesToDifferentChart(targetChart, series);
            }
            else if (currentTarget == areaXY || currentTarget.parentElement == areaXY) {
                this.createNewChart(chartManagerChart_1.ChartType.XYChart, series);
            }
            else if (currentTarget == areaYT || currentTarget.parentElement == areaYT) {
                this.createNewChart(chartManagerChart_1.ChartType.YTChart, series);
            }
            else {
                this.createNewChart(chartManagerChart_1.ChartType.FFTChart, series);
            }
        };
        /**
         * add the dropped serie to an existing chart
         *
         * @private
         * @param {ITraceChart} targetChart
         * @memberof ChartDropHelper
         */
        ChartDropHelper.prototype.addSeriesToExistingChart = function (targetChart, series) {
            // get chart/axis information
            var data = {
                targetChart: targetChart,
                chart: this.chartManagerDataModel.getChart(targetChart.widgetName),
                series: series
            };
            //raise event to traceViewWidget
            this.chartViewWidget.eventDropHelper.raise(this.chartManagerDataModel, { hint: ChartDropHelperChangedHint.addSerie, data: data });
        };
        ChartDropHelper.prototype.addYTSeriesToDifferentChart = function (targetChart, series) {
            // get chart/axis information
            var data = {
                targetChart: targetChart,
                chart: this.chartManagerDataModel.getChart(targetChart.widgetName),
                series: series
            };
            //raise event to traceViewWidget
            if (targetChart.type == chartManagerChart_1.ChartType.XYChart) {
                this.chartViewWidget.eventDropHelper.raise(this.chartManagerDataModel, { hint: ChartDropHelperChangedHint.createXYSerie, data: data });
            }
            else if (targetChart.type == chartManagerChart_1.ChartType.FFTChart) {
                this.chartViewWidget.eventDropHelper.raise(this.chartManagerDataModel, { hint: ChartDropHelperChangedHint.createFFTSerie, data: data });
            }
        };
        /**
         * create a new chart where serie will be dropped
         *
         * @private
         * @param {ChartType} newChartType
         * @param {Array<BaseSeries>} series
         * @memberof ChartDropHelper
         */
        ChartDropHelper.prototype.createNewChart = function (newChartType, series) {
            var data = {
                type: newChartType,
                series: series
            };
            //raise event to traceViewWidget
            this.chartViewWidget.eventDropHelper.raise(this.chartManagerDataModel, { hint: ChartDropHelperChangedHint.createChart, data: data });
        };
        /**
         * Return a DropLocationType for the current drop position or DropLocationType.invalid if drop not possible
         *
         * @param {ChartBase} chart
         * @param {Array<BaseSeries>} series
         * @returns {DropLocationType}
         * @memberof ChartDropHelper
         */
        ChartDropHelper.prototype.getDropLocationType = function (currentTarget, chart, series) {
            if (this.chartManagerDataModel != undefined) {
                var chartManagerChart = this.chartManagerDataModel.getChart(chart.widgetName);
                if (chartManagerChart != undefined) {
                    if (chartManagerChart.dropPossible || chartManagerChart.childs[0].dropPossible) {
                        return chart.getDropLocationType(currentTarget);
                    }
                }
            }
            return ChartBase_1.DropLocationType.invalid;
        };
        return ChartDropHelper;
    }());
    exports.ChartDropHelper = ChartDropHelper;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnREcm9wSGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0Vmlld1dpZGdldC9oZWxwZXJzL2NoYXJ0RHJvcEhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFTQSxJQUFZLDBCQUtYO0lBTEQsV0FBWSwwQkFBMEI7UUFDbEMseUZBQVcsQ0FBQTtRQUNYLG1GQUFRLENBQUE7UUFDUiw2RkFBYSxDQUFBO1FBQ2IsK0ZBQWMsQ0FBQTtJQUNsQixDQUFDLEVBTFcsMEJBQTBCLEdBQTFCLGtDQUEwQixLQUExQixrQ0FBMEIsUUFLckM7SUFFRDtRQUtJLHlCQUFZLHFCQUE2QyxFQUFFLFNBQTBCO1lBQ2pGLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxxQkFBcUIsQ0FBQztZQUNuRCxJQUFJLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQztRQUNyQyxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSSxxQ0FBVyxHQUFsQjtZQUNJLElBQUksSUFBSSxDQUFDLHFCQUFxQixJQUFJLFNBQVMsRUFBRTtnQkFDekMsSUFBSSxJQUFJLENBQUMscUJBQXFCLENBQUMsV0FBVyxFQUFFLElBQUksSUFBSSxFQUFFO29CQUNsRCxPQUFPLElBQUksQ0FBQztpQkFDZjthQUNKO1lBQ0QsT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ0ksbUNBQVMsR0FBaEIsVUFBaUIsYUFBYSxFQUFFLFdBQW9DLEVBQUUsTUFBeUIsRUFBRSxhQUFpRDtZQUM5SSxJQUFJLGNBQWMsR0FBRywyQ0FBb0IsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUUsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxhQUFjLENBQUMsYUFBYSxDQUFDLGVBQWUsR0FBRyxjQUFjLENBQUMsQ0FBQztZQUNwRyxJ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QUMsS0FBSyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxFQUFDLElBQUksRUFBRSwwQkFBMEIsQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDeEksQ0FBQztRQUdEOzs7Ozs7O1dBT0c7UUFDSSw2Q0FBbUIsR0FBMUIsVUFBMkIsYUFBa0IsRUFBRSxLQUFnQixFQUFFLE1BQXlCO1lBQ3RGLElBQUksSUFBSSxDQUFDLHFCQUFxQixJQUFJLFNBQVMsRUFBRTtnQkFDekMsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLENBQUMscUJBQXNCLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDL0UsSUFBSSxpQkFBaUIsSUFBSSxTQUFTLEVBQUU7b0JBQ2hDLElBQUksaUJBQWlCLENBQUMsWUFBWSxJQUFJLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLEVBQUU7d0JBQzVFLE9BQU8sS0FBSyxDQUFDLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxDQUFDO3FCQUNuRDtpQkFDSjthQUNKO1lBQ0QsT0FBTyw0QkFBZ0IsQ0FBQyxPQUFPLENBQUM7UUFDcEMsQ0FBQztRQUNMLHNCQUFDO0lBQUQsQ0FBQyxBQS9IRCxJQStIQztJQUVRLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZVNlcmllcyB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2Jhc2VTZXJpZXNcIjtcclxuaW1wb3J0IHsgSUNoYXJ0TWFuYWdlckRhdGFNb2RlbCB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvZGF0YU1vZGVsc1wiO1xyXG5pbXBvcnQgeyBDaGFydEJhc2UsIERyb3BMb2NhdGlvblR5cGUgfSBmcm9tIFwiLi4vLi4vY2hhcnRXaWRnZXQvQ2hhcnRCYXNlXCI7XHJcbmltcG9ydCB7IENoYXJ0VHlwZSB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2NoYXJ0TWFuYWdlckNoYXJ0XCI7XHJcbmltcG9ydCB7IENoYXJ0Vmlld0xheW91dE1hbmFnZXIgfSBmcm9tIFwiLi4vY2hhcnRWaWV3TGF5b3V0TWFuYWdlclwiO1xyXG5pbXBvcnQgeyBJVHJhY2VDaGFydCB9IGZyb20gXCIuLi8uLi9jaGFydFdpZGdldC9pbnRlcmZhY2VzL3RyYWNlQ2hhcnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ2hhcnRWaWV3V2lkZ2V0IH0gZnJvbSBcIi4uL2NoYXJ0Vmlld1dpZGdldFwiO1xyXG5pbXBvcnQgeyBTZXJpZUNoYXJ0VHlwZUhlbHBlciB9IGZyb20gXCIuLi8uLi9jb21tb24vU2VyaWVDaGFydFR5cGVIZWxwZXJcIjtcclxuXHJcbmV4cG9ydCBlbnVtIENoYXJ0RHJvcEhlbHBlckNoYW5nZWRIaW50e1xyXG4gICAgY3JlYXRlQ2hhcnQsXHJcbiAgICBhZGRTZXJpZSxcclxuICAgIGNyZWF0ZVhZU2VyaWUsXHJcbiAgICBjcmVhdGVGRlRTZXJpZVxyXG59XHJcblxyXG5jbGFzcyBDaGFydERyb3BIZWxwZXIge1xyXG5cclxuICAgIHByaXZhdGUgY2hhcnRNYW5hZ2VyRGF0YU1vZGVsOiBJQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsO1xyXG4gICAgcHJpdmF0ZSBjaGFydFZpZXdXaWRnZXQ6IENoYXJ0Vmlld1dpZGdldDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihjaGFydE1hbmFnZXJEYXRhTW9kZWw6IElDaGFydE1hbmFnZXJEYXRhTW9kZWwsIGNoYXJ0VmlldzogQ2hhcnRWaWV3V2lkZ2V0KSB7XHJcbiAgICAgICAgdGhpcy5jaGFydE1hbmFnZXJEYXRhTW9kZWwgPSBjaGFydE1hbmFnZXJEYXRhTW9kZWw7XHJcbiAgICAgICAgdGhpcy5jaGFydFZpZXdXaWRnZXQgPSBjaGFydFZpZXc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgYSBjaGFydCBjYW4gYmUgYWRkZWRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydERyb3BIZWxwZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNhbkFkZENoYXJ0KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0aGlzLmNoYXJ0TWFuYWdlckRhdGFNb2RlbCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2hhcnRNYW5hZ2VyRGF0YU1vZGVsLmNhbkFkZENoYXJ0KCkgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYWRkIHRoZSBkcm9wcGVkIHNlcmllIHRvIHRoZSBjb3JyZWN0IHBsYWNlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBjdXJyZW50VGFyZ2V0XHJcbiAgICAgKiBAcGFyYW0ge0lUcmFjZUNoYXJ0IHwgdW5kZWZpbmVkfSB0YXJnZXRDaGFydFxyXG4gICAgICogQHBhcmFtIHtBcnJheTxCYXNlU2VyaWVzPn0gc2VyaWVzXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0RHJvcEhlbHBlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkU2VyaWVzKGN1cnJlbnRUYXJnZXQsIHRhcmdldENoYXJ0OiBJVHJhY2VDaGFydCB8IHVuZGVmaW5lZCwgc2VyaWVzOiBBcnJheTxCYXNlU2VyaWVzPiwgbGF5b3V0TWFuYWdlcjogQ2hhcnRWaWV3TGF5b3V0TWFuYWdlciB8IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGxldCBzZXJpZUNoYXJ0VHlwZSA9IFNlcmllQ2hhcnRUeXBlSGVscGVyLmdldFNlcmllQ2hhcnRUeXBlKHNlcmllc1swXS50eXBlKTtcclxuICAgICAgICBsZXQgYXJlYVhZID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobGF5b3V0TWFuYWdlciEuY2hhcnRTcGxpdHRlci5wYXJlbnRDb250ZW50SWQgKyBcIl9sYXN0UGFuZV9YWVwiKTtcclxuICAgICAgICBsZXQgYXJlYVlUID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobGF5b3V0TWFuYWdlciEuY2hhcnRTcGxpdHRlci5wYXJlbnRDb250ZW50SWQgKyBcIl9sYXN0UGFuZV9ZVFwiKTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGFyZ2V0Q2hhcnQgJiYgc2VyaWVDaGFydFR5cGUgPT0gdGFyZ2V0Q2hhcnQudHlwZSkge1xyXG4gICAgICAgICAgICB0aGlzLmFkZFNlcmllc1RvRXhpc3RpbmdDaGFydCh0YXJnZXRDaGFydCwgc2VyaWVzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGFyZ2V0Q2hhcnQgJiYgc2VyaWVDaGFydFR5cGUgIT0gdGFyZ2V0Q2hhcnQudHlwZSl7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkWVRTZXJpZXNUb0RpZmZlcmVudENoYXJ0KHRhcmdldENoYXJ0LCBzZXJpZXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjdXJyZW50VGFyZ2V0ID09IGFyZWFYWSB8fCBjdXJyZW50VGFyZ2V0LnBhcmVudEVsZW1lbnQgPT0gYXJlYVhZKSB7IFxyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU5ld0NoYXJ0KENoYXJ0VHlwZS5YWUNoYXJ0LCBzZXJpZXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjdXJyZW50VGFyZ2V0ID09IGFyZWFZVCB8fCBjdXJyZW50VGFyZ2V0LnBhcmVudEVsZW1lbnQgPT0gYXJlYVlUKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTmV3Q2hhcnQoQ2hhcnRUeXBlLllUQ2hhcnQsIHNlcmllcyk7XHJcbiAgICAgICAgfSBcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVOZXdDaGFydChDaGFydFR5cGUuRkZUQ2hhcnQsIHNlcmllcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYWRkIHRoZSBkcm9wcGVkIHNlcmllIHRvIGFuIGV4aXN0aW5nIGNoYXJ0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SVRyYWNlQ2hhcnR9IHRhcmdldENoYXJ0XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnREcm9wSGVscGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkU2VyaWVzVG9FeGlzdGluZ0NoYXJ0KHRhcmdldENoYXJ0OiBJVHJhY2VDaGFydCwgc2VyaWVzOiBBcnJheTxCYXNlU2VyaWVzPikge1xyXG4gICAgICAgIC8vIGdldCBjaGFydC9heGlzIGluZm9ybWF0aW9uXHJcbiAgICAgICAgbGV0IGRhdGEgPSB7XHJcbiAgICAgICAgICAgIHRhcmdldENoYXJ0OiB0YXJnZXRDaGFydCxcclxuICAgICAgICAgICAgY2hhcnQ6IHRoaXMuY2hhcnRNYW5hZ2VyRGF0YU1vZGVsIS5nZXRDaGFydCh0YXJnZXRDaGFydC53aWRnZXROYW1lKSxcclxuICAgICAgICAgICAgc2VyaWVzOiBzZXJpZXNcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9yYWlzZSBldmVudCB0byB0cmFjZVZpZXdXaWRnZXRcclxuICAgICAgICB0aGlzLmNoYXJ0Vmlld1dpZGdldC5ldmVudERyb3BIZWxwZXIucmFpc2UodGhpcy5jaGFydE1hbmFnZXJEYXRhTW9kZWwsIHtoaW50OiBDaGFydERyb3BIZWxwZXJDaGFuZ2VkSGludC5hZGRTZXJpZSwgZGF0YTogZGF0YSB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFkZFlUU2VyaWVzVG9EaWZmZXJlbnRDaGFydCh0YXJnZXRDaGFydDogSVRyYWNlQ2hhcnQsIHNlcmllczogQXJyYXk8QmFzZVNlcmllcz4pIHtcclxuICAgICAgICAvLyBnZXQgY2hhcnQvYXhpcyBpbmZvcm1hdGlvblxyXG4gICAgICAgIGxldCBkYXRhID0ge1xyXG4gICAgICAgICAgICB0YXJnZXRDaGFydDogdGFyZ2V0Q2hhcnQsXHJcbiAgICAgICAgICAgIGNoYXJ0OiB0aGlzLmNoYXJ0TWFuYWdlckRhdGFNb2RlbCEuZ2V0Q2hhcnQodGFyZ2V0Q2hhcnQud2lkZ2V0TmFtZSksXHJcbiAgICAgICAgICAgIHNlcmllczogc2VyaWVzXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vcmFpc2UgZXZlbnQgdG8gdHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgICAgaWYgKHRhcmdldENoYXJ0LnR5cGUgPT0gQ2hhcnRUeXBlLlhZQ2hhcnQpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGFydFZpZXdXaWRnZXQuZXZlbnREcm9wSGVscGVyLnJhaXNlKHRoaXMuY2hhcnRNYW5hZ2VyRGF0YU1vZGVsLCB7aGludDogQ2hhcnREcm9wSGVscGVyQ2hhbmdlZEhpbnQuY3JlYXRlWFlTZXJpZSwgZGF0YTogZGF0YSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGFyZ2V0Q2hhcnQudHlwZSA9PSBDaGFydFR5cGUuRkZUQ2hhcnQpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGFydFZpZXdXaWRnZXQuZXZlbnREcm9wSGVscGVyLnJhaXNlKHRoaXMuY2hhcnRNYW5hZ2VyRGF0YU1vZGVsLCB7aGludDogQ2hhcnREcm9wSGVscGVyQ2hhbmdlZEhpbnQuY3JlYXRlRkZUU2VyaWUsIGRhdGE6IGRhdGEgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY3JlYXRlIGEgbmV3IGNoYXJ0IHdoZXJlIHNlcmllIHdpbGwgYmUgZHJvcHBlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0NoYXJ0VHlwZX0gbmV3Q2hhcnRUeXBlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PEJhc2VTZXJpZXM+fSBzZXJpZXNcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydERyb3BIZWxwZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVOZXdDaGFydChuZXdDaGFydFR5cGU6IENoYXJ0VHlwZSwgc2VyaWVzOiBBcnJheTxCYXNlU2VyaWVzPikge1xyXG4gICAgICAgIGxldCBkYXRhID0ge1xyXG4gICAgICAgICAgICB0eXBlOiBuZXdDaGFydFR5cGUsXHJcbiAgICAgICAgICAgIHNlcmllczogc2VyaWVzXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vcmFpc2UgZXZlbnQgdG8gdHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgICAgdGhpcy5jaGFydFZpZXdXaWRnZXQuZXZlbnREcm9wSGVscGVyLnJhaXNlKHRoaXMuY2hhcnRNYW5hZ2VyRGF0YU1vZGVsLCB7aGludDogQ2hhcnREcm9wSGVscGVyQ2hhbmdlZEhpbnQuY3JlYXRlQ2hhcnQsIGRhdGE6IGRhdGEgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIGEgRHJvcExvY2F0aW9uVHlwZSBmb3IgdGhlIGN1cnJlbnQgZHJvcCBwb3NpdGlvbiBvciBEcm9wTG9jYXRpb25UeXBlLmludmFsaWQgaWYgZHJvcCBub3QgcG9zc2libGVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0NoYXJ0QmFzZX0gY2hhcnRcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8QmFzZVNlcmllcz59IHNlcmllc1xyXG4gICAgICogQHJldHVybnMge0Ryb3BMb2NhdGlvblR5cGV9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnREcm9wSGVscGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXREcm9wTG9jYXRpb25UeXBlKGN1cnJlbnRUYXJnZXQ6IGFueSwgY2hhcnQ6IENoYXJ0QmFzZSwgc2VyaWVzOiBBcnJheTxCYXNlU2VyaWVzPik6IERyb3BMb2NhdGlvblR5cGUge1xyXG4gICAgICAgIGlmICh0aGlzLmNoYXJ0TWFuYWdlckRhdGFNb2RlbCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgbGV0IGNoYXJ0TWFuYWdlckNoYXJ0ID0gdGhpcy5jaGFydE1hbmFnZXJEYXRhTW9kZWwhLmdldENoYXJ0KGNoYXJ0LndpZGdldE5hbWUpO1xyXG4gICAgICAgICAgICBpZiAoY2hhcnRNYW5hZ2VyQ2hhcnQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hhcnRNYW5hZ2VyQ2hhcnQuZHJvcFBvc3NpYmxlIHx8IGNoYXJ0TWFuYWdlckNoYXJ0LmNoaWxkc1swXS5kcm9wUG9zc2libGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2hhcnQuZ2V0RHJvcExvY2F0aW9uVHlwZShjdXJyZW50VGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gRHJvcExvY2F0aW9uVHlwZS5pbnZhbGlkO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBDaGFydERyb3BIZWxwZXIgfTsiXX0=