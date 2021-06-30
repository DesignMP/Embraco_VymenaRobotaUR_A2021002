define(["require", "exports", "../../models/chartManagerDataModel/chartManagerChart", "../../models/chartManagerDataModel/seriesType"], function (require, exports, chartManagerChart_1, seriesType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SerieChartTypeHelper = /** @class */ (function () {
        function SerieChartTypeHelper() {
        }
        SerieChartTypeHelper.getSerieChartType = function (type) {
            if (type == seriesType_1.SeriesType.timeSeries) {
                return chartManagerChart_1.ChartType.YTChart;
            }
            else if (type == seriesType_1.SeriesType.xySeries) {
                return chartManagerChart_1.ChartType.XYChart;
            }
            else {
                return chartManagerChart_1.ChartType.FFTChart;
            }
        };
        SerieChartTypeHelper.setDropPossibleAreas = function (chart, series, serieChartType, sameGroup) {
            if (!chart.hasSeries(series) && chart.canSeriesBeDropped(series, serieChartType, sameGroup)) {
                chart.childs.forEach(function (yAxis) {
                    yAxis.dropPossible = true;
                });
                //Not possible to drop serie in chart name if is XY chart
                if (chart.canAddYAxis() && chart.chartType != chartManagerChart_1.ChartType.XYChart) {
                    chart.dropPossible = true;
                }
            }
        };
        /**
         * Return series that will be added
         *
         * @param {Array<BaseSeries>} seriesInChart
         * @param {Array<BaseSeries>} droppedSeries
         * @returns {Array<BaseSeries>}
         * @memberof ChartManagerWidget
         */
        SerieChartTypeHelper.getDroppableSeries = function (seriesInChart, droppedSeries) {
            for (var i = 0; i < seriesInChart.length; i++) {
                for (var j = 0; j < droppedSeries.length; j++) {
                    if (seriesInChart[i] == droppedSeries[j]) {
                        droppedSeries.splice(j, 1);
                        break;
                    }
                    //Check calculated input data for FFT charts if YT signals are dragged
                    if (seriesInChart[i].type == seriesType_1.SeriesType.fftSeries && droppedSeries[j].type == seriesType_1.SeriesType.timeSeries) {
                        var inputSerieId = undefined;
                        var calculationDataInfo = seriesInChart[i].calculationDataInfo;
                        if (calculationDataInfo != undefined) {
                            inputSerieId = calculationDataInfo.inputSeriesIds[0];
                        }
                        if (inputSerieId == droppedSeries[j].id) {
                            droppedSeries.splice(j, 1);
                            break;
                        }
                    }
                }
            }
            return droppedSeries;
        };
        return SerieChartTypeHelper;
    }());
    exports.SerieChartTypeHelper = SerieChartTypeHelper;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VyaWVDaGFydFR5cGVIZWxwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY29tbW9uL1NlcmllQ2hhcnRUeXBlSGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUtBO1FBQUE7UUF5REEsQ0FBQztRQXZEaUIsc0NBQWlCLEdBQS9CLFVBQWdDLElBQWdCO1lBQzVDLElBQUksSUFBSSxJQUFJLHVCQUFVLENBQUMsVUFBVSxFQUFFO2dCQUMvQixPQUFPLDZCQUFTLENBQUMsT0FBTyxDQUFDO2FBQzVCO2lCQUFNLElBQUksSUFBSSxJQUFJLHVCQUFVLENBQUMsUUFBUSxFQUFFO2dCQUNwQyxPQUFPLDZCQUFTLENBQUMsT0FBTyxDQUFDO2FBQzVCO2lCQUFNO2dCQUNILE9BQU8sNkJBQVMsQ0FBQyxRQUFRLENBQUM7YUFDN0I7UUFDTCxDQUFDO1FBRWEseUNBQW9CLEdBQWxDLFVBQW1DLEtBQXlCLEVBQUUsTUFBeUIsRUFBRSxjQUF5QixFQUFFLFNBQWtCO1lBRWxJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsY0FBYyxFQUFFLFNBQVMsQ0FBQyxFQUFFO2dCQUN6RixLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUs7b0JBQ3RCLEtBQUssQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO2dCQUM5QixDQUFDLENBQUMsQ0FBQTtnQkFDRix5REFBeUQ7Z0JBQ3pELElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRSxJQUFJLEtBQUssQ0FBQyxTQUFTLElBQUksNkJBQVMsQ0FBQyxPQUFPLEVBQUU7b0JBQzdELEtBQUssQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO2lCQUM3QjthQUNKO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDVyx1Q0FBa0IsR0FBaEMsVUFBaUMsYUFBZ0MsRUFBRSxhQUFnQztZQUMvRixLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDMUMsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQzFDLElBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBQzt3QkFDcEMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7d0JBQzNCLE1BQU07cUJBQ1Q7b0JBRUQsc0VBQXNFO29CQUN0RSxJQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksdUJBQVUsQ0FBQyxTQUFTLElBQUksYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSx1QkFBVSxDQUFDLFVBQVUsRUFBRTt3QkFDaEcsSUFBSSxZQUFZLEdBQXFCLFNBQVMsQ0FBQzt3QkFDL0MsSUFBSSxtQkFBbUIsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUM7d0JBQy9ELElBQUcsbUJBQW1CLElBQUksU0FBUyxFQUFDOzRCQUNoQyxZQUFZLEdBQUcsbUJBQW1CLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO3lCQUN4RDt3QkFDRCxJQUFHLFlBQVksSUFBSSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFDOzRCQUNuQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzs0QkFDM0IsTUFBTTt5QkFDVDtxQkFDSjtpQkFDSjthQUNKO1lBQ0QsT0FBTyxhQUFhLENBQUM7UUFDekIsQ0FBQztRQUNMLDJCQUFDO0lBQUQsQ0FBQyxBQXpERCxJQXlEQztJQXpEWSxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvYmFzZVNlcmllc1wiO1xyXG5pbXBvcnQgeyBDaGFydFR5cGUgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9jaGFydE1hbmFnZXJDaGFydFwiO1xyXG5pbXBvcnQgeyBJQ2hhcnRNYW5hZ2VyQ2hhcnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9pbnRlcmZhY2VzL2NoYXJ0TWFuYWdlckNoYXJ0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNlcmllc1R5cGUgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9zZXJpZXNUeXBlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU2VyaWVDaGFydFR5cGVIZWxwZXIge1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0U2VyaWVDaGFydFR5cGUodHlwZTogU2VyaWVzVHlwZSk6IENoYXJ0VHlwZSB7XHJcbiAgICAgICAgaWYgKHR5cGUgPT0gU2VyaWVzVHlwZS50aW1lU2VyaWVzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBDaGFydFR5cGUuWVRDaGFydDtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT0gU2VyaWVzVHlwZS54eVNlcmllcykge1xyXG4gICAgICAgICAgICByZXR1cm4gQ2hhcnRUeXBlLlhZQ2hhcnQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIENoYXJ0VHlwZS5GRlRDaGFydDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBzZXREcm9wUG9zc2libGVBcmVhcyhjaGFydDogSUNoYXJ0TWFuYWdlckNoYXJ0LCBzZXJpZXM6IEFycmF5PEJhc2VTZXJpZXM+LCBzZXJpZUNoYXJ0VHlwZTogQ2hhcnRUeXBlLCBzYW1lR3JvdXA6IGJvb2xlYW4pIHtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoIWNoYXJ0Lmhhc1NlcmllcyhzZXJpZXMpICYmIGNoYXJ0LmNhblNlcmllc0JlRHJvcHBlZChzZXJpZXMsIHNlcmllQ2hhcnRUeXBlLCBzYW1lR3JvdXApKSB7XHJcbiAgICAgICAgICAgIGNoYXJ0LmNoaWxkcy5mb3JFYWNoKHlBeGlzID0+IHtcclxuICAgICAgICAgICAgICAgIHlBeGlzLmRyb3BQb3NzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8vTm90IHBvc3NpYmxlIHRvIGRyb3Agc2VyaWUgaW4gY2hhcnQgbmFtZSBpZiBpcyBYWSBjaGFydFxyXG4gICAgICAgICAgICBpZiAoY2hhcnQuY2FuQWRkWUF4aXMoKSAmJiBjaGFydC5jaGFydFR5cGUgIT0gQ2hhcnRUeXBlLlhZQ2hhcnQpIHtcclxuICAgICAgICAgICAgICAgIGNoYXJ0LmRyb3BQb3NzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gc2VyaWVzIHRoYXQgd2lsbCBiZSBhZGRlZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8QmFzZVNlcmllcz59IHNlcmllc0luQ2hhcnRcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8QmFzZVNlcmllcz59IGRyb3BwZWRTZXJpZXNcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxCYXNlU2VyaWVzPn1cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXREcm9wcGFibGVTZXJpZXMoc2VyaWVzSW5DaGFydDogQXJyYXk8QmFzZVNlcmllcz4sIGRyb3BwZWRTZXJpZXM6IEFycmF5PEJhc2VTZXJpZXM+KTogQXJyYXk8QmFzZVNlcmllcz57XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHNlcmllc0luQ2hhcnQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IGRyb3BwZWRTZXJpZXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmKHNlcmllc0luQ2hhcnRbaV0gPT0gZHJvcHBlZFNlcmllc1tqXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcHBlZFNlcmllcy5zcGxpY2UoaiwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vQ2hlY2sgY2FsY3VsYXRlZCBpbnB1dCBkYXRhIGZvciBGRlQgY2hhcnRzIGlmIFlUIHNpZ25hbHMgYXJlIGRyYWdnZWRcclxuICAgICAgICAgICAgICAgIGlmKHNlcmllc0luQ2hhcnRbaV0udHlwZSA9PSBTZXJpZXNUeXBlLmZmdFNlcmllcyAmJiBkcm9wcGVkU2VyaWVzW2pdLnR5cGUgPT0gU2VyaWVzVHlwZS50aW1lU2VyaWVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlucHV0U2VyaWVJZDogc3RyaW5nfHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY2FsY3VsYXRpb25EYXRhSW5mbyA9IHNlcmllc0luQ2hhcnRbaV0uY2FsY3VsYXRpb25EYXRhSW5mbztcclxuICAgICAgICAgICAgICAgICAgICBpZihjYWxjdWxhdGlvbkRhdGFJbmZvICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0U2VyaWVJZCA9IGNhbGN1bGF0aW9uRGF0YUluZm8uaW5wdXRTZXJpZXNJZHNbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGlucHV0U2VyaWVJZCA9PSBkcm9wcGVkU2VyaWVzW2pdLmlkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcHBlZFNlcmllcy5zcGxpY2UoaiwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZHJvcHBlZFNlcmllcztcclxuICAgIH1cclxufVxyXG4iXX0=