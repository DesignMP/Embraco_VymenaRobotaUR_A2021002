define(["require", "exports", "../../models/chartManagerDataModel/chartManagerChart", "./imageProvider", "../../models/chartManagerDataModel/seriesType"], function (require, exports, chartManagerChart_1, imageProvider_1, seriesType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SerieChartTypeHelper = /** @class */ (function () {
        function SerieChartTypeHelper() {
        }
        SerieChartTypeHelper.prototype.getSerieChartType = function (type) {
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
        SerieChartTypeHelper.prototype.setDropPossibleAreas = function (chart, series, serieChartType, sameGroup) {
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
        SerieChartTypeHelper.prototype.updateDragDropRepresentation = function (dragDropRepresentation, overlayIconPath, newText) {
            if (dragDropRepresentation != undefined) {
                // Add overlay icon if available
                if (overlayIconPath != "") {
                    var addNewScaleImage = imageProvider_1.ImageProvider.getInstance().getImage(overlayIconPath);
                    if (addNewScaleImage != "") {
                        dragDropRepresentation.iconList.push(addNewScaleImage);
                    }
                }
                // add text or replace existing text
                if (dragDropRepresentation.textList.length == 0) {
                    dragDropRepresentation.textList.push(newText);
                }
                else {
                    dragDropRepresentation.textList[0] = newText;
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
        SerieChartTypeHelper.prototype.getDroppableSeries = function (seriesInChart, droppedSeries) {
            for (var i = 0; i < seriesInChart.length; i++) {
                for (var j = 0; j < droppedSeries.length; j++) {
                    if (seriesInChart[i] == droppedSeries[j]) {
                        droppedSeries.splice(j, 1);
                        break;
                    }
                    //Check calculated input data for FFT charts if YT signals are dragged
                    if (seriesInChart[i].type == seriesType_1.SeriesType.fftSeries && droppedSeries[j].type == seriesType_1.SeriesType.timeSeries) {
                        if (seriesInChart[i].calculationDataInfo.inputSeries[0] == droppedSeries[j]) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VyaWVDaGFydFR5cGVIZWxwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY29tbW9uL1NlcmllQ2hhcnRUeXBlSGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQU9BO1FBQUE7UUF1RUEsQ0FBQztRQXJFVSxnREFBaUIsR0FBeEIsVUFBeUIsSUFBZ0I7WUFDckMsSUFBSSxJQUFJLElBQUksdUJBQVUsQ0FBQyxVQUFVLEVBQUU7Z0JBQy9CLE9BQU8sNkJBQVMsQ0FBQyxPQUFPLENBQUM7YUFDNUI7aUJBQU0sSUFBSSxJQUFJLElBQUksdUJBQVUsQ0FBQyxRQUFRLEVBQUU7Z0JBQ3BDLE9BQU8sNkJBQVMsQ0FBQyxPQUFPLENBQUM7YUFDNUI7aUJBQU07Z0JBQ0gsT0FBTyw2QkFBUyxDQUFDLFFBQVEsQ0FBQzthQUM3QjtRQUNMLENBQUM7UUFFTSxtREFBb0IsR0FBM0IsVUFBNEIsS0FBeUIsRUFBRSxNQUF5QixFQUFFLGNBQXlCLEVBQUUsU0FBa0I7WUFFM0gsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSxjQUFjLEVBQUUsU0FBUyxDQUFDLEVBQUU7Z0JBQ3pGLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSztvQkFDdEIsS0FBSyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7Z0JBQzlCLENBQUMsQ0FBQyxDQUFBO2dCQUNGLHlEQUF5RDtnQkFDekQsSUFBSSxLQUFLLENBQUMsV0FBVyxFQUFFLElBQUksS0FBSyxDQUFDLFNBQVMsSUFBSSw2QkFBUyxDQUFDLE9BQU8sRUFBRTtvQkFDN0QsS0FBSyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7aUJBQzdCO2FBQ0o7UUFDTCxDQUFDO1FBRU0sMkRBQTRCLEdBQW5DLFVBQW9DLHNCQUF3RCxFQUFFLGVBQXVCLEVBQUUsT0FBZTtZQUNsSSxJQUFHLHNCQUFzQixJQUFJLFNBQVMsRUFBQztnQkFDbkMsZ0NBQWdDO2dCQUNoQyxJQUFHLGVBQWUsSUFBSSxFQUFFLEVBQUM7b0JBQ3JCLElBQUksZ0JBQWdCLEdBQUcsNkJBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUM7b0JBQzdFLElBQUcsZ0JBQWdCLElBQUksRUFBRSxFQUFDO3dCQUN0QixzQkFBc0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7cUJBQzFEO2lCQUNKO2dCQUNELG9DQUFvQztnQkFDcEMsSUFBRyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBQztvQkFDM0Msc0JBQXNCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDakQ7cUJBQ0c7b0JBQ0Esc0JBQXNCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQztpQkFDaEQ7YUFDSjtRQUNMLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0ksaURBQWtCLEdBQXpCLFVBQTBCLGFBQWdDLEVBQUUsYUFBZ0M7WUFDeEYsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzFDLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUMxQyxJQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUM7d0JBQ3BDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUMzQixNQUFNO3FCQUNUO29CQUVELHNFQUFzRTtvQkFDdEUsSUFBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLHVCQUFVLENBQUMsU0FBUyxJQUFJLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksdUJBQVUsQ0FBQyxVQUFVLEVBQUU7d0JBQ2hHLElBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUM7NEJBQ3ZFLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDOzRCQUMzQixNQUFNO3lCQUNUO3FCQUNKO2lCQUNKO2FBQ0o7WUFDRCxPQUFPLGFBQWEsQ0FBQztRQUN6QixDQUFDO1FBQ0wsMkJBQUM7SUFBRCxDQUFDLEFBdkVELElBdUVDO0lBRVEsb0RBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZVNlcmllcyB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2Jhc2VTZXJpZXNcIjtcclxuaW1wb3J0IHsgQ2hhcnRUeXBlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvY2hhcnRNYW5hZ2VyQ2hhcnRcIjtcclxuaW1wb3J0IHsgSUNoYXJ0TWFuYWdlckNoYXJ0IH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvaW50ZXJmYWNlcy9jaGFydE1hbmFnZXJDaGFydEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBEcmFnRHJvcFJlcHJlc2VudGF0aW9uIH0gZnJvbSBcIi4vZHJhZ0Ryb3BSZXByZXNlbnRhdGlvblwiO1xyXG5pbXBvcnQgeyBJbWFnZVByb3ZpZGVyIH0gZnJvbSBcIi4vaW1hZ2VQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBTZXJpZXNUeXBlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvc2VyaWVzVHlwZVwiO1xyXG5cclxuY2xhc3MgU2VyaWVDaGFydFR5cGVIZWxwZXIge1xyXG5cclxuICAgIHB1YmxpYyBnZXRTZXJpZUNoYXJ0VHlwZSh0eXBlOiBTZXJpZXNUeXBlKTogQ2hhcnRUeXBlIHtcclxuICAgICAgICBpZiAodHlwZSA9PSBTZXJpZXNUeXBlLnRpbWVTZXJpZXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIENoYXJ0VHlwZS5ZVENoYXJ0O1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PSBTZXJpZXNUeXBlLnh5U2VyaWVzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBDaGFydFR5cGUuWFlDaGFydDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gQ2hhcnRUeXBlLkZGVENoYXJ0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0RHJvcFBvc3NpYmxlQXJlYXMoY2hhcnQ6IElDaGFydE1hbmFnZXJDaGFydCwgc2VyaWVzOiBBcnJheTxCYXNlU2VyaWVzPiwgc2VyaWVDaGFydFR5cGU6IENoYXJ0VHlwZSwgc2FtZUdyb3VwOiBib29sZWFuKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKCFjaGFydC5oYXNTZXJpZXMoc2VyaWVzKSAmJiBjaGFydC5jYW5TZXJpZXNCZURyb3BwZWQoc2VyaWVzLCBzZXJpZUNoYXJ0VHlwZSwgc2FtZUdyb3VwKSkge1xyXG4gICAgICAgICAgICBjaGFydC5jaGlsZHMuZm9yRWFjaCh5QXhpcyA9PiB7XHJcbiAgICAgICAgICAgICAgICB5QXhpcy5kcm9wUG9zc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAvL05vdCBwb3NzaWJsZSB0byBkcm9wIHNlcmllIGluIGNoYXJ0IG5hbWUgaWYgaXMgWFkgY2hhcnRcclxuICAgICAgICAgICAgaWYgKGNoYXJ0LmNhbkFkZFlBeGlzKCkgJiYgY2hhcnQuY2hhcnRUeXBlICE9IENoYXJ0VHlwZS5YWUNoYXJ0KSB7XHJcbiAgICAgICAgICAgICAgICBjaGFydC5kcm9wUG9zc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVEcmFnRHJvcFJlcHJlc2VudGF0aW9uKGRyYWdEcm9wUmVwcmVzZW50YXRpb246IERyYWdEcm9wUmVwcmVzZW50YXRpb258dW5kZWZpbmVkLCBvdmVybGF5SWNvblBhdGg6IHN0cmluZywgbmV3VGV4dDogc3RyaW5nKXtcclxuICAgICAgICBpZihkcmFnRHJvcFJlcHJlc2VudGF0aW9uICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIEFkZCBvdmVybGF5IGljb24gaWYgYXZhaWxhYmxlXHJcbiAgICAgICAgICAgIGlmKG92ZXJsYXlJY29uUGF0aCAhPSBcIlwiKXtcclxuICAgICAgICAgICAgICAgIGxldCBhZGROZXdTY2FsZUltYWdlID0gSW1hZ2VQcm92aWRlci5nZXRJbnN0YW5jZSgpLmdldEltYWdlKG92ZXJsYXlJY29uUGF0aCk7XHJcbiAgICAgICAgICAgICAgICBpZihhZGROZXdTY2FsZUltYWdlICE9IFwiXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIGRyYWdEcm9wUmVwcmVzZW50YXRpb24uaWNvbkxpc3QucHVzaChhZGROZXdTY2FsZUltYWdlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBhZGQgdGV4dCBvciByZXBsYWNlIGV4aXN0aW5nIHRleHRcclxuICAgICAgICAgICAgaWYoZHJhZ0Ryb3BSZXByZXNlbnRhdGlvbi50ZXh0TGlzdC5sZW5ndGggPT0gMCl7XHJcbiAgICAgICAgICAgICAgICBkcmFnRHJvcFJlcHJlc2VudGF0aW9uLnRleHRMaXN0LnB1c2gobmV3VGV4dCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGRyYWdEcm9wUmVwcmVzZW50YXRpb24udGV4dExpc3RbMF0gPSBuZXdUZXh0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIHNlcmllcyB0aGF0IHdpbGwgYmUgYWRkZWRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PEJhc2VTZXJpZXM+fSBzZXJpZXNJbkNoYXJ0XHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PEJhc2VTZXJpZXM+fSBkcm9wcGVkU2VyaWVzXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8QmFzZVNlcmllcz59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXREcm9wcGFibGVTZXJpZXMoc2VyaWVzSW5DaGFydDogQXJyYXk8QmFzZVNlcmllcz4sIGRyb3BwZWRTZXJpZXM6IEFycmF5PEJhc2VTZXJpZXM+KTogQXJyYXk8QmFzZVNlcmllcz57XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHNlcmllc0luQ2hhcnQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IGRyb3BwZWRTZXJpZXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmKHNlcmllc0luQ2hhcnRbaV0gPT0gZHJvcHBlZFNlcmllc1tqXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcHBlZFNlcmllcy5zcGxpY2UoaiwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vQ2hlY2sgY2FsY3VsYXRlZCBpbnB1dCBkYXRhIGZvciBGRlQgY2hhcnRzIGlmIFlUIHNpZ25hbHMgYXJlIGRyYWdnZWRcclxuICAgICAgICAgICAgICAgIGlmKHNlcmllc0luQ2hhcnRbaV0udHlwZSA9PSBTZXJpZXNUeXBlLmZmdFNlcmllcyAmJiBkcm9wcGVkU2VyaWVzW2pdLnR5cGUgPT0gU2VyaWVzVHlwZS50aW1lU2VyaWVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VyaWVzSW5DaGFydFtpXS5jYWxjdWxhdGlvbkRhdGFJbmZvLmlucHV0U2VyaWVzWzBdID09IGRyb3BwZWRTZXJpZXNbal0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wcGVkU2VyaWVzLnNwbGljZShqLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkcm9wcGVkU2VyaWVzO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBTZXJpZUNoYXJ0VHlwZUhlbHBlciB9OyJdfQ==