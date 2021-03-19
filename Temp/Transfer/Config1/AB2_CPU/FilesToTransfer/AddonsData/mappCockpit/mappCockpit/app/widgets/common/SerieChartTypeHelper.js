define(["require", "exports", "../../models/chartManagerDataModel/chartManagerChart", "./imageProvider", "../../models/chartManagerDataModel/seriesType", "../../models/common/seriesProvider/seriesProvider"], function (require, exports, chartManagerChart_1, imageProvider_1, seriesType_1, seriesProvider_1) {
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
                        var inputSerieId = undefined;
                        var calculationDataInfo = seriesInChart[i].calculationDataInfo;
                        if (calculationDataInfo != undefined) {
                            inputSerieId = calculationDataInfo.inputSeriesIds[0];
                        }
                        if (seriesProvider_1.SeriesProvider.getInstance().get(inputSerieId) == droppedSeries[j]) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VyaWVDaGFydFR5cGVIZWxwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY29tbW9uL1NlcmllQ2hhcnRUeXBlSGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQVFBO1FBQUE7UUE0RUEsQ0FBQztRQTFFVSxnREFBaUIsR0FBeEIsVUFBeUIsSUFBZ0I7WUFDckMsSUFBSSxJQUFJLElBQUksdUJBQVUsQ0FBQyxVQUFVLEVBQUU7Z0JBQy9CLE9BQU8sNkJBQVMsQ0FBQyxPQUFPLENBQUM7YUFDNUI7aUJBQU0sSUFBSSxJQUFJLElBQUksdUJBQVUsQ0FBQyxRQUFRLEVBQUU7Z0JBQ3BDLE9BQU8sNkJBQVMsQ0FBQyxPQUFPLENBQUM7YUFDNUI7aUJBQU07Z0JBQ0gsT0FBTyw2QkFBUyxDQUFDLFFBQVEsQ0FBQzthQUM3QjtRQUNMLENBQUM7UUFFTSxtREFBb0IsR0FBM0IsVUFBNEIsS0FBeUIsRUFBRSxNQUF5QixFQUFFLGNBQXlCLEVBQUUsU0FBa0I7WUFFM0gsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSxjQUFjLEVBQUUsU0FBUyxDQUFDLEVBQUU7Z0JBQ3pGLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSztvQkFDdEIsS0FBSyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7Z0JBQzlCLENBQUMsQ0FBQyxDQUFBO2dCQUNGLHlEQUF5RDtnQkFDekQsSUFBSSxLQUFLLENBQUMsV0FBVyxFQUFFLElBQUksS0FBSyxDQUFDLFNBQVMsSUFBSSw2QkFBUyxDQUFDLE9BQU8sRUFBRTtvQkFDN0QsS0FBSyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7aUJBQzdCO2FBQ0o7UUFDTCxDQUFDO1FBRU0sMkRBQTRCLEdBQW5DLFVBQW9DLHNCQUF3RCxFQUFFLGVBQXVCLEVBQUUsT0FBZTtZQUNsSSxJQUFHLHNCQUFzQixJQUFJLFNBQVMsRUFBQztnQkFDbkMsZ0NBQWdDO2dCQUNoQyxJQUFHLGVBQWUsSUFBSSxFQUFFLEVBQUM7b0JBQ3JCLElBQUksZ0JBQWdCLEdBQUcsNkJBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUM7b0JBQzdFLElBQUcsZ0JBQWdCLElBQUksRUFBRSxFQUFDO3dCQUN0QixzQkFBc0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7cUJBQzFEO2lCQUNKO2dCQUNELG9DQUFvQztnQkFDcEMsSUFBRyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBQztvQkFDM0Msc0JBQXNCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDakQ7cUJBQ0c7b0JBQ0Esc0JBQXNCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQztpQkFDaEQ7YUFDSjtRQUNMLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0ksaURBQWtCLEdBQXpCLFVBQTBCLGFBQWdDLEVBQUUsYUFBZ0M7WUFDeEYsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzFDLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUMxQyxJQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUM7d0JBQ3BDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUMzQixNQUFNO3FCQUNUO29CQUVELHNFQUFzRTtvQkFDdEUsSUFBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLHVCQUFVLENBQUMsU0FBUyxJQUFJLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksdUJBQVUsQ0FBQyxVQUFVLEVBQUU7d0JBQ2hHLElBQUksWUFBWSxHQUFxQixTQUFTLENBQUM7d0JBQy9DLElBQUksbUJBQW1CLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDO3dCQUMvRCxJQUFHLG1CQUFtQixJQUFJLFNBQVMsRUFBQzs0QkFDaEMsWUFBWSxHQUFHLG1CQUFtQixDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDeEQ7d0JBQ0QsSUFBRywrQkFBYyxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUM7NEJBQ2xFLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDOzRCQUMzQixNQUFNO3lCQUNUO3FCQUNKO2lCQUNKO2FBQ0o7WUFDRCxPQUFPLGFBQWEsQ0FBQztRQUN6QixDQUFDO1FBQ0wsMkJBQUM7SUFBRCxDQUFDLEFBNUVELElBNEVDO0lBRVEsb0RBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZVNlcmllcyB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2Jhc2VTZXJpZXNcIjtcclxuaW1wb3J0IHsgQ2hhcnRUeXBlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvY2hhcnRNYW5hZ2VyQ2hhcnRcIjtcclxuaW1wb3J0IHsgSUNoYXJ0TWFuYWdlckNoYXJ0IH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvaW50ZXJmYWNlcy9jaGFydE1hbmFnZXJDaGFydEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBEcmFnRHJvcFJlcHJlc2VudGF0aW9uIH0gZnJvbSBcIi4vZHJhZ0Ryb3BSZXByZXNlbnRhdGlvblwiO1xyXG5pbXBvcnQgeyBJbWFnZVByb3ZpZGVyIH0gZnJvbSBcIi4vaW1hZ2VQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBTZXJpZXNUeXBlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvc2VyaWVzVHlwZVwiO1xyXG5pbXBvcnQgeyBTZXJpZXNQcm92aWRlciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL3Nlcmllc1Byb3ZpZGVyL3Nlcmllc1Byb3ZpZGVyXCI7XHJcblxyXG5jbGFzcyBTZXJpZUNoYXJ0VHlwZUhlbHBlciB7XHJcblxyXG4gICAgcHVibGljIGdldFNlcmllQ2hhcnRUeXBlKHR5cGU6IFNlcmllc1R5cGUpOiBDaGFydFR5cGUge1xyXG4gICAgICAgIGlmICh0eXBlID09IFNlcmllc1R5cGUudGltZVNlcmllcykge1xyXG4gICAgICAgICAgICByZXR1cm4gQ2hhcnRUeXBlLllUQ2hhcnQ7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09IFNlcmllc1R5cGUueHlTZXJpZXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIENoYXJ0VHlwZS5YWUNoYXJ0O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBDaGFydFR5cGUuRkZUQ2hhcnQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXREcm9wUG9zc2libGVBcmVhcyhjaGFydDogSUNoYXJ0TWFuYWdlckNoYXJ0LCBzZXJpZXM6IEFycmF5PEJhc2VTZXJpZXM+LCBzZXJpZUNoYXJ0VHlwZTogQ2hhcnRUeXBlLCBzYW1lR3JvdXA6IGJvb2xlYW4pIHtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoIWNoYXJ0Lmhhc1NlcmllcyhzZXJpZXMpICYmIGNoYXJ0LmNhblNlcmllc0JlRHJvcHBlZChzZXJpZXMsIHNlcmllQ2hhcnRUeXBlLCBzYW1lR3JvdXApKSB7XHJcbiAgICAgICAgICAgIGNoYXJ0LmNoaWxkcy5mb3JFYWNoKHlBeGlzID0+IHtcclxuICAgICAgICAgICAgICAgIHlBeGlzLmRyb3BQb3NzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8vTm90IHBvc3NpYmxlIHRvIGRyb3Agc2VyaWUgaW4gY2hhcnQgbmFtZSBpZiBpcyBYWSBjaGFydFxyXG4gICAgICAgICAgICBpZiAoY2hhcnQuY2FuQWRkWUF4aXMoKSAmJiBjaGFydC5jaGFydFR5cGUgIT0gQ2hhcnRUeXBlLlhZQ2hhcnQpIHtcclxuICAgICAgICAgICAgICAgIGNoYXJ0LmRyb3BQb3NzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZURyYWdEcm9wUmVwcmVzZW50YXRpb24oZHJhZ0Ryb3BSZXByZXNlbnRhdGlvbjogRHJhZ0Ryb3BSZXByZXNlbnRhdGlvbnx1bmRlZmluZWQsIG92ZXJsYXlJY29uUGF0aDogc3RyaW5nLCBuZXdUZXh0OiBzdHJpbmcpe1xyXG4gICAgICAgIGlmKGRyYWdEcm9wUmVwcmVzZW50YXRpb24gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gQWRkIG92ZXJsYXkgaWNvbiBpZiBhdmFpbGFibGVcclxuICAgICAgICAgICAgaWYob3ZlcmxheUljb25QYXRoICE9IFwiXCIpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGFkZE5ld1NjYWxlSW1hZ2UgPSBJbWFnZVByb3ZpZGVyLmdldEluc3RhbmNlKCkuZ2V0SW1hZ2Uob3ZlcmxheUljb25QYXRoKTtcclxuICAgICAgICAgICAgICAgIGlmKGFkZE5ld1NjYWxlSW1hZ2UgIT0gXCJcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgZHJhZ0Ryb3BSZXByZXNlbnRhdGlvbi5pY29uTGlzdC5wdXNoKGFkZE5ld1NjYWxlSW1hZ2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGFkZCB0ZXh0IG9yIHJlcGxhY2UgZXhpc3RpbmcgdGV4dFxyXG4gICAgICAgICAgICBpZihkcmFnRHJvcFJlcHJlc2VudGF0aW9uLnRleHRMaXN0Lmxlbmd0aCA9PSAwKXtcclxuICAgICAgICAgICAgICAgIGRyYWdEcm9wUmVwcmVzZW50YXRpb24udGV4dExpc3QucHVzaChuZXdUZXh0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgZHJhZ0Ryb3BSZXByZXNlbnRhdGlvbi50ZXh0TGlzdFswXSA9IG5ld1RleHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gc2VyaWVzIHRoYXQgd2lsbCBiZSBhZGRlZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8QmFzZVNlcmllcz59IHNlcmllc0luQ2hhcnRcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8QmFzZVNlcmllcz59IGRyb3BwZWRTZXJpZXNcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxCYXNlU2VyaWVzPn1cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldERyb3BwYWJsZVNlcmllcyhzZXJpZXNJbkNoYXJ0OiBBcnJheTxCYXNlU2VyaWVzPiwgZHJvcHBlZFNlcmllczogQXJyYXk8QmFzZVNlcmllcz4pOiBBcnJheTxCYXNlU2VyaWVzPntcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2VyaWVzSW5DaGFydC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgZHJvcHBlZFNlcmllcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYoc2VyaWVzSW5DaGFydFtpXSA9PSBkcm9wcGVkU2VyaWVzW2pdKXtcclxuICAgICAgICAgICAgICAgICAgICBkcm9wcGVkU2VyaWVzLnNwbGljZShqLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy9DaGVjayBjYWxjdWxhdGVkIGlucHV0IGRhdGEgZm9yIEZGVCBjaGFydHMgaWYgWVQgc2lnbmFscyBhcmUgZHJhZ2dlZFxyXG4gICAgICAgICAgICAgICAgaWYoc2VyaWVzSW5DaGFydFtpXS50eXBlID09IFNlcmllc1R5cGUuZmZ0U2VyaWVzICYmIGRyb3BwZWRTZXJpZXNbal0udHlwZSA9PSBTZXJpZXNUeXBlLnRpbWVTZXJpZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5wdXRTZXJpZUlkOiBzdHJpbmd8dW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjYWxjdWxhdGlvbkRhdGFJbmZvID0gc2VyaWVzSW5DaGFydFtpXS5jYWxjdWxhdGlvbkRhdGFJbmZvO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGNhbGN1bGF0aW9uRGF0YUluZm8gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRTZXJpZUlkID0gY2FsY3VsYXRpb25EYXRhSW5mby5pbnB1dFNlcmllc0lkc1swXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoU2VyaWVzUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXQoaW5wdXRTZXJpZUlkKSA9PSBkcm9wcGVkU2VyaWVzW2pdKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcHBlZFNlcmllcy5zcGxpY2UoaiwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZHJvcHBlZFNlcmllcztcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgU2VyaWVDaGFydFR5cGVIZWxwZXIgfTsiXX0=