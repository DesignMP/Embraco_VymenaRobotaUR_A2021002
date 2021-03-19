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
define(["require", "exports", "./ChartBase", "./helpers/chartRangeHelper", "./chartExtensions/chartExtensions", "./cursor/CursorHandler", "../../common/math/mathX"], function (require, exports, ChartBase_1, chartRangeHelper_1, chartExtensions_1, CursorHandler_1, mathX_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var XYChart = /** @class */ (function (_super) {
        __extends(XYChart, _super);
        function XYChart(parentView, name, type, scale) {
            var _this = _super.call(this, parentView, name, scale) || this;
            _this.series = [];
            _this.primaryXAxisName = "PrimaryDataXAxis";
            _this.primaryYAxisName = "Scale_1";
            _this.cursorHandler = undefined;
            _this.widgetName = name;
            _this.parentView = parentView;
            _this.type = type;
            _this.addWidgetToView(parentView);
            return _this;
        }
        /**
         * Eradicate!
         *
         * @memberof XYChart
         */
        XYChart.prototype.dispose = function () {
            this.removeWidgetFromView(this.parentView);
            _super.prototype.dispose.call(this);
        };
        /**
         * Add widget to view
         *
         * @private
         * @param {ChartViewChartManager} chartManager
         * @memberof XYChart
         */
        XYChart.prototype.addWidgetToView = function (parentView) {
            if (parentView) {
                parentView.addWidget(this);
            }
        };
        /**
         * Remove widget from view
         *
         * @private
         * @param {ChartViewChartManager} chartManager
         * @memberof XYChart
         */
        XYChart.prototype.removeWidgetFromView = function (parentView) {
            if (parentView) {
                parentView.removeWidget(this);
            }
        };
        /**
         *
         *
         * @param {string} containerId
         * @memberof XYChart
         */
        XYChart.prototype.initialize = function (containerId) {
            _super.prototype.initialize.call(this, containerId);
            this.setAvailableSeriesAsDataSource();
            this.initializeCursorHandlers();
            this.attachChartExtensions(this.chartInstance);
        };
        /**
         * Reinitializes the chart
         *
         * @memberof XYChart
         */
        XYChart.prototype.reinitialize = function () {
            $(this.cssParentContentId).empty();
            _super.prototype.initialize.call(this, this.parentContentId);
            this.setAvailableSeriesAsDataSource();
            this.cursorHandler = undefined;
            this.initializeCursorHandlers();
            this.attachChartExtensions(this.chartInstance);
        };
        /**
         * Attaches a extension instance
         *
         * @private
         * @param {*} chartInstance
         * @returns {*}
         * @memberof XYChart
         */
        XYChart.prototype.attachChartExtensions = function (chartInstance) {
            // inject an extension provider
            var ytChartExtensions = new chartExtensions_1.ChartExtensions(this);
            // use an XY optimization algorithm
            ytChartExtensions.chartDataOptimizer.trimSeriesForChartBounds = ytChartExtensions.chartDataOptimizer.trimSeriesForChartBoundsXY;
            // set the chart extensions
            chartInstance.chartExtensions = ytChartExtensions;
        };
        XYChart.prototype.initializeCursorHandlers = function () {
            if (this.cursorHandler == undefined) {
                this.cursorHandler = (new CursorHandler_1.CursorHandler(this.parentContentId, this.chart.getChartArea()));
                this.cursorHandler.enableCrosshairCursor = true;
            }
        };
        /**
         * Send data of the series to the chart instance
         *
         * @memberof XYChart
         */
        XYChart.prototype.setAvailableSeriesAsDataSource = function () {
            var traceDataSeries = new Array();
            for (var i = 0; i < this.series.length; i++) {
                var effectiveSerie = this.chartInstance.chartExtensions ? this.chartInstance.chartExtensions.chartDataOptimizer.attachSeries(this.series[i]) : this.series[i];
                traceDataSeries.push(this.createTraceDataSeries(effectiveSerie, this.primaryYAxisName));
            }
            var dataSeries = { series: traceDataSeries };
            $(this.cssParentContentId).ejChart(dataSeries);
            this.repositionCursors();
        };
        /**
         * Calculate zoom on mousewheel action
         *
         * @protected
         * @param {*} args
         * @memberof XYChart
         */
        XYChart.prototype.onChartMouseWheel = function (sender, args) {
            _super.prototype.onChartMouseWheel.call(this, sender, args);
        };
        /**
         *
         *
         * @protected
         * @param {Point} cursorPoint
         * @returns {number}
         * @memberof XYChart
         */
        XYChart.prototype.getTimestampInSeries = function (cursorPoint, availableSeries) {
            // find the nearest series point
            console.log(availableSeries[0].serie.name);
            var nearestSeriesPointInfo = this.findNearestSeriesPointInSeries(cursorPoint, availableSeries);
            // get the nearest series and point index
            var nearestSeriesIndex = nearestSeriesPointInfo.seriesIndex;
            console.log("NSI: " + nearestSeriesIndex);
            var nearestPointIndex = nearestSeriesPointInfo.pointIndex;
            // get the nearest series points 
            var calculationDataInfo = availableSeries[nearestSeriesIndex].calculationDataInfo;
            if (calculationDataInfo != undefined) {
                var nearestSeriesPoints = calculationDataInfo.inputData[0].getData();
                // get the nearest timestamp of the nearest series
                var nearestTimestamp = nearestSeriesPoints[nearestPointIndex].x;
                return nearestTimestamp;
            }
            console.error("NearestTimestamp not found! No calculationDataInfo!");
            return 0;
        };
        /**
         * Gets a timestamp nearest to thespecified point
         *
         * @protected
         * @param {Point} cursorPoint
         * @returns
         * @memberof XYChart
         */
        XYChart.prototype.getTimestampFromSerie = function (cursorPoint) {
            var xAxis = this.chart.getAxis(this.primaryXAxisName);
            var yAxis = this.chart.getAxis(this.scales[0].id);
            if (xAxis != undefined && yAxis != undefined) {
                // get the current active series points;
                var effectiveSeriesPoints = this.series[this.draggedSeriesIndex].serie.rawPoints;
                // find the nearest point within this series
                var nearestPointInfo = this.findNearestXYPoint(effectiveSeriesPoints, cursorPoint, xAxis, yAxis);
                // grab one input data series to get access to the timestamps.
                var calculationDataInfo = this.series[this.draggedSeriesIndex].calculationDataInfo;
                if (calculationDataInfo != undefined) {
                    var inputSeriesPoints = calculationDataInfo.inputData[0].getData();
                    // get the nearest timestamp from this series. The input datas x vlues represent the timestamps.
                    var nearestTimestamp = inputSeriesPoints[nearestPointInfo.pointIndex].x;
                    return nearestTimestamp;
                }
            }
            return 0;
        };
        /**
         * Finds the nearest point in all avalibale series.
         *
         * @private
         * @param {Point} cursorPoint
         * @returns {NearestPointInfo}
         * @memberof XYChart
         */
        XYChart.prototype.findNearestSeriesPointInSeries = function (cursorPoint, series) {
            // get the charts x-Axis
            var xAxis = this.chart.getAxis(this.primaryXAxisName);
            // get the charts y-Axis
            var yAxis = this.chart.getAxis(this.scales[0].id);
            // create an array for collecting the nearest point infos
            var nearestXYSeriesPointInfos = this.findNearestPointsInSeries(series, cursorPoint, xAxis, yAxis);
            // retrieve the collected nearest point distances
            var nearestSeriesPointInfo = this.getNearestPointOfAllSeries(nearestXYSeriesPointInfos);
            return nearestSeriesPointInfo;
        };
        /**
         * Finds a nearest point within a series
         *
         * @private
         * @param {IPoint[]} xyRawPoints
         * @param {Point} chartPoint
         * @param {*} xAxis
         * @param {*} yAxis
         * @returns {NearestPointInfo}
         * @memberof XYChart
         */
        XYChart.prototype.findNearestXYPoint = function (xyRawPoints, chartPoint, xAxis, yAxis) {
            // get the x-axis range
            var xAxisRange = xAxis.getAxisRange();
            // get the chart x axis pixel range
            var xAxisPixelRange = xAxis.getAxisRangeInPixel();
            // calculate the x - pixel/unit ratio
            var xPixelsPerUnit = (xAxisPixelRange.max - xAxisPixelRange.min) / (xAxisRange.max - xAxisRange.min);
            // get the y-axis range
            var yAxisRange = yAxis.getAxisRange();
            // get the chart y axis pixel range
            var yAxisPixelRange = yAxis.getAxisRangeInPixel();
            // calculate the y - pixel/unit ratio
            var yPixelsPerUnit = (yAxisPixelRange.max - yAxisPixelRange.min) / (yAxisRange.max - yAxisRange.min);
            // create a initial nearest point info.
            var nearestPointInfo = this.getMinSquaredDistancePointInfo(xyRawPoints, chartPoint, xPixelsPerUnit, yPixelsPerUnit);
            return nearestPointInfo;
        };
        /**
         * Gets the minimal squared distance of the specified point within the points
         *
         * @private
         * @param {IPoint[]} xyRawPoints
         * @param {Point} chartPoint
         * @param {number} xPixelsPerUnit
         * @param {number} yPixelsPerUnit
         * @returns
         * @memberof XYChart
         */
        XYChart.prototype.getMinSquaredDistancePointInfo = function (xyRawPoints, chartPoint, xPixelsPerUnit, yPixelsPerUnit) {
            var nearestPointInfo = { seriesIndex: 0, pointIndex: 0, distanceSquared: Number.MAX_VALUE };
            // find the smallest distance to the series point
            for (var i = 0; i < xyRawPoints.length; i++) {
                // calculate the x distance 
                var dx = (xyRawPoints[i].x - chartPoint.x) * xPixelsPerUnit;
                // calculate the y distance
                var dy = (xyRawPoints[i].y - chartPoint.y) * yPixelsPerUnit;
                // calculate the 2D distance to the point
                var pointToSeriesDistanceSquared = dx * dx + dy * dy;
                // update the nearest point info if the distance is smaller then the already existing one. 
                if (pointToSeriesDistanceSquared < nearestPointInfo.distanceSquared) {
                    nearestPointInfo.distanceSquared = pointToSeriesDistanceSquared;
                    nearestPointInfo.pointIndex = i;
                }
            }
            return nearestPointInfo;
        };
        /**
         * Retrievs the point which is the nearest in all series
         *
         * @private
         * @param {NearestPointInfo[]} nearestXYSeriesPointInfos
         * @returns
         * @memberof XYChart
         */
        XYChart.prototype.getNearestPointOfAllSeries = function (nearestXYSeriesPointInfos) {
            // retrieve the collected nearest point distances
            var pointToSeriesDistances = nearestXYSeriesPointInfos.map(function (nearestXYSeriesPointInfo) { return nearestXYSeriesPointInfo.distanceSquared; });
            // get the smallest one...        
            var smallestPointToSeriesDistance = mathX_1.MathX.min(pointToSeriesDistances);
            // get the index of the smallest one...
            // the nearest distance index directly matches the series index because the order within the arrays is the same.
            var nearestSeriesIndex = nearestXYSeriesPointInfos.findIndex(function (nearestXYSeriesPointInfo) { return nearestXYSeriesPointInfo.distanceSquared === smallestPointToSeriesDistance; });
            // update the nearest point infos series index
            var nearestSeriesPointInfo = nearestXYSeriesPointInfos[nearestSeriesIndex];
            nearestSeriesPointInfo.seriesIndex = nearestSeriesIndex;
            return nearestSeriesPointInfo;
        };
        /**
         * Finds the nearest points in the specified series
         *
         * @private
         * @param {Point} cursorPoint
         * @param { IChartAxis | undefined} xAxis
         * @param { IChartAxis | undefined} yAxis
         * @returns
         * @memberof XYChart
         */
        XYChart.prototype.findNearestPointsInSeries = function (series, cursorPoint, xAxis, yAxis) {
            var _this = this;
            var nearestXYSeriesPointInfos = [];
            if (xAxis && yAxis) {
                // collect the nearest point infos of all series
                series.forEach(function (series) { nearestXYSeriesPointInfos.push(_this.findNearestXYPoint(series.serie.rawPoints, cursorPoint, xAxis, yAxis)); });
            }
            return nearestXYSeriesPointInfos;
        };
        /**
         * Gets a chart point for the specified timestamp
         *
         * @private
         * @param {number} timestamp
         * @returns {Point}
         * @memberof ChartBase
         */
        XYChart.prototype.getCursorPoint = function (leadCursorTimeStamp, timestamp, seriesIndex) {
            var seriesTimestampIndex = this.series[seriesIndex].serie.getTimestampIndex(timestamp);
            var seriesPoint = this.series[seriesIndex].serie.rawPoints[seriesTimestampIndex];
            return { timestamp: this.series[seriesIndex].calculationDataInfo.inputData[0].getData()[seriesTimestampIndex].x, x: seriesPoint.x, y: seriesPoint.y };
        };
        /**
         * Get max x value from all series in the chart
         *
         * @returns {(number|undefined)}
         * @memberof XYChart
         */
        XYChart.prototype.getTotalMaxX = function (traceChartList) {
            var maxX = undefined;
            for (var i = 0; i < this.series.length; i++) {
                if (this.series[i] !== undefined) {
                    if (maxX == undefined || this.series[i].maxX > maxX) {
                        maxX = this.series[i].maxX;
                    }
                }
            }
            return maxX;
        };
        /**
         * Get min x value from all series in the chart
         *
         * @returns {(number|undefined)}
         * @memberof XYChart
         */
        XYChart.prototype.getTotalMinX = function (traceChartList) {
            var minX = undefined;
            for (var i = 0; i < this.series.length; i++) {
                if (this.series[i] !== undefined) {
                    if (minX == undefined || this.series[i].minX < minX) {
                        minX = this.series[i].minX;
                    }
                }
            }
            return minX;
        };
        /**
         * Add drop locations in the chart
         *
         * @param {Array<BaseSeries>} serie
         * @returns
         * @memberof XYChart
         */
        XYChart.prototype.addSerieDropLocations = function (serie, chartManagerChart) {
            if (!chartManagerChart.childs[0].dropPossible) {
                return;
            }
            this.addSerieChartDropLocations(serie[0]);
        };
        /**
         * Add drop locations in the chart area
         *
         * @private
         * @param {BaseSeries} serie
         * @memberof YTChart
         */
        XYChart.prototype.addSerieChartDropLocations = function (serie) {
            if (serie.name) {
                var offsetWidth = 18.4;
                var parentContainer = $("#" + this.parentContentId);
                $(this.cssParentContentId).append('<div id="' + this.parentContentId + '_axisDropZone' + "_chartArea" + '" style="position:absolute; width: ' + (parentContainer.width() - offsetWidth) + 'px; height: ' + (parentContainer.height()) + 'px; top: 0px"; class="dropLocationArea"></div>');
            }
        };
        /**
         *
         *
         * @param {*} pageX
         * @param {*} pageY
         * @memberof XYChart
         */
        XYChart.prototype.doPanning = function (pageX, pageY) {
            _super.prototype.doPanning.call(this, pageX, pageY);
            this.redrawChart();
        };
        /**
         * Returns the current drop location type (e.g. assign to scale, add new scale, invalid for drop)
         *
         * @returns {DropLocationType}
         * @memberof XYChart
         */
        XYChart.prototype.getDropLocationType = function (currentTarget) {
            return ChartBase_1.DropLocationType.assignToScale;
        };
        /**
         * Highlight droppable areas if a valid signal is dragged over
         *
         * @param {*} currentTarget
         * @memberof BasicChart
         */
        XYChart.prototype.updateDroppableAreas = function (currentTarget) {
            if (currentTarget.id.includes("_axisDropZone_chartArea")) {
                var chartArea = document.getElementById(this.parentContentId + '_axisDropZone_chartArea');
                if (chartArea != undefined) {
                    chartArea.classList.add('draggedOver');
                }
            }
            else {
                this.resetHighlighting();
            }
        };
        ;
        /**
         * Reset highlighted areas
         *
         * @memberof BasicChart
         */
        XYChart.prototype.resetHighlighting = function () {
            var chartArea = document.getElementById(this.parentContentId + '_axisDropZone_chartArea');
            if (chartArea != undefined) {
                chartArea.classList.remove('draggedOver');
            }
        };
        XYChart.prototype.setScaleRange = function (scale, minXValue, maxXValue, minYValue, maxYValue, orientation, setAxisRange) {
            if (setAxisRange === void 0) { setAxisRange = true; }
            _super.prototype.setScaleRange.call(this, scale, minXValue, maxXValue, minYValue, maxYValue, orientation, setAxisRange);
            if (orientation == 'horizontal' && setAxisRange == true) {
                var axis = this.chart.getAxis(this.primaryXAxisName);
                if (axis != undefined) {
                    axis.setAxisRange({ min: scale.minXValue, max: scale.maxXValue });
                }
            }
        };
        XYChart.prototype.addSeriesToChart = function (series, scale) {
            var resetXRange = false;
            if (this.series.length == 0) {
                resetXRange = true;
            }
            _super.prototype.addSeriesToChart.call(this, series, scale);
            if (resetXRange) {
                new chartRangeHelper_1.ChartRangeHelper().resetChartRangesX([this]);
            }
        };
        XYChart.prototype.removeSerieFromChart = function (serie) {
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
        return XYChart;
    }(ChartBase_1.ChartBase));
    exports.XYChart = XYChart;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWFlDaGFydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jaGFydFdpZGdldC9YWUNoYXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFpQkE7UUFBc0IsMkJBQVM7UUFTM0IsaUJBQVksVUFBaUIsRUFBRSxJQUFZLEVBQUUsSUFBZSxFQUFFLEtBQVk7WUFBMUUsWUFFSSxrQkFBTSxVQUFVLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxTQU1qQztZQWZELFlBQU0sR0FBMkIsRUFBRSxDQUFDO1lBRXBDLHNCQUFnQixHQUFHLGtCQUFrQixDQUFBO1lBQ3JDLHNCQUFnQixHQUFHLFNBQVMsQ0FBQTtZQUU1QixtQkFBYSxHQUE0QixTQUFTLENBQUM7WUFLL0MsS0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFDdkIsS0FBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7WUFDN0IsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFFakIsS0FBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQzs7UUFDckMsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSSx5QkFBTyxHQUFkO1lBQ0ksSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMzQyxpQkFBTSxPQUFPLFdBQUUsQ0FBQztRQUNwQixDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ssaUNBQWUsR0FBdkIsVUFBd0IsVUFBa0I7WUFDdEMsSUFBSSxVQUFVLEVBQUU7Z0JBQ1osVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUM5QjtRQUNMLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSyxzQ0FBb0IsR0FBNUIsVUFBNkIsVUFBaUI7WUFDMUMsSUFBSSxVQUFVLEVBQUU7Z0JBQ1osVUFBVSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNq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QUFFLENBQUMsQ0FBQyxDQUFDO2FBQ2hDO1lBRUQsSUFBSSxDQUFDLDhCQUE4QixFQUFFLENBQUM7WUFFdEMsZ0JBQWdCO1lBQ2hCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxFQUFFLENBQUM7WUFFaEQsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQ2xDLElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7Z0JBQ25DLElBQUcsU0FBUyxJQUFJLFNBQVMsRUFBQztvQkFDdEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUN4RTthQUNKO1FBQ0wsQ0FBQztRQUVMLGNBQUM7SUFBRCxDQUFDLEFBdGdCRCxDQUFzQixxQkFBUyxHQXNnQjlCO0lBRVEsMEJBQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFydEJhc2UsIERyb3BMb2NhdGlvblR5cGUsIFRpbWVQb2ludCB9IGZyb20gXCIuL0NoYXJ0QmFzZVwiO1xyXG5pbXBvcnQgeyBDaGFydFJhbmdlSGVscGVyIH0gZnJvbSBcIi4vaGVscGVycy9jaGFydFJhbmdlSGVscGVyXCI7XHJcbmltcG9ydCB7IENoYXJ0RXh0ZW5zaW9ucyB9IGZyb20gXCIuL2NoYXJ0RXh0ZW5zaW9ucy9jaGFydEV4dGVuc2lvbnNcIjtcclxuaW1wb3J0IHsgQ2hhcnRUeXBlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvY2hhcnRNYW5hZ2VyQ2hhcnRcIjtcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbW1vbi9wb2ludFwiO1xyXG5pbXBvcnQgeyBDaGFydFZpZXdTZXJpZSB9IGZyb20gXCIuL2NoYXJ0Vmlld1NlcmllXCI7XHJcbmltcG9ydCB7IEJhc2VTZXJpZXMgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9iYXNlU2VyaWVzXCI7XHJcbmltcG9ydCB7IFNjYWxlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvc2NhbGVcIjtcclxuaW1wb3J0IHsgQ3Vyc29ySGFuZGxlciB9IGZyb20gXCIuL2N1cnNvci9DdXJzb3JIYW5kbGVyXCI7XHJcbmltcG9ydCB7IElQb2ludCB9IGZyb20gXCIuLi8uLi9jb3JlL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgTWF0aFggfSBmcm9tIFwiLi4vLi4vY29tbW9uL21hdGgvbWF0aFhcIjtcclxuaW1wb3J0IHsgSUNoYXJ0QXhpcyB9IGZyb20gXCIuLi8uLi9jb3JlL2ludGVyZmFjZXMvY29tcG9uZW50cy91aS9jaGFydC9DaGFydEF4aXNJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVZpZXcgfSBmcm9tIFwiLi4vY29tbW9uL2ludGVyZmFjZXMvdmlld0ludGVyZmFjZVwiO1xyXG5cclxuLy8gc3BlY2lmaWVzIGEgdHlwZSBmb3IgaG9sZGluZyBuZWFyZXN0IHBvaW50IGluZm9ybWF0aW9uXHJcbnR5cGUgTmVhcmVzdFBvaW50SW5mbyA9IHsgc2VyaWVzSW5kZXg6bnVtYmVyLCBwb2ludEluZGV4Om51bWJlciwgZGlzdGFuY2VTcXVhcmVkOm51bWJlcn07XHJcblxyXG5jbGFzcyBYWUNoYXJ0IGV4dGVuZHMgQ2hhcnRCYXNle1xyXG5cclxuICAgIHNlcmllcyA6IEFycmF5PENoYXJ0Vmlld1NlcmllPiA9IFtdO1xyXG5cclxuICAgIHByaW1hcnlYQXhpc05hbWUgPSBcIlByaW1hcnlEYXRhWEF4aXNcIlxyXG4gICAgcHJpbWFyeVlBeGlzTmFtZSA9IFwiU2NhbGVfMVwiXHJcblxyXG4gICAgY3Vyc29ySGFuZGxlcjogQ3Vyc29ySGFuZGxlcnx1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IocGFyZW50VmlldzogSVZpZXcsIG5hbWU6IHN0cmluZywgdHlwZTogQ2hhcnRUeXBlLCBzY2FsZTogU2NhbGUpIHtcclxuXHJcbiAgICAgICAgc3VwZXIocGFyZW50VmlldywgbmFtZSwgc2NhbGUpO1xyXG4gICAgICAgIHRoaXMud2lkZ2V0TmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5wYXJlbnRWaWV3ID0gcGFyZW50VmlldztcclxuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG5cclxuICAgICAgICB0aGlzLmFkZFdpZGdldFRvVmlldyhwYXJlbnRWaWV3KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEVyYWRpY2F0ZSFcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgWFlDaGFydFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpe1xyXG4gICAgICAgIHRoaXMucmVtb3ZlV2lkZ2V0RnJvbVZpZXcodGhpcy5wYXJlbnRWaWV3KTtcclxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgd2lkZ2V0IHRvIHZpZXdcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtDaGFydFZpZXdDaGFydE1hbmFnZXJ9IGNoYXJ0TWFuYWdlclxyXG4gICAgICogQG1lbWJlcm9mIFhZQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRXaWRnZXRUb1ZpZXcocGFyZW50VmlldyA6IElWaWV3KSB7XHJcbiAgICAgICAgaWYgKHBhcmVudFZpZXcpIHtcclxuICAgICAgICAgICAgcGFyZW50Vmlldy5hZGRXaWRnZXQodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlIHdpZGdldCBmcm9tIHZpZXdcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtDaGFydFZpZXdDaGFydE1hbmFnZXJ9IGNoYXJ0TWFuYWdlclxyXG4gICAgICogQG1lbWJlcm9mIFhZQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZW1vdmVXaWRnZXRGcm9tVmlldyhwYXJlbnRWaWV3OiBJVmlldykge1xyXG4gICAgICAgIGlmIChwYXJlbnRWaWV3KSB7XHJcbiAgICAgICAgICAgIHBhcmVudFZpZXcucmVtb3ZlV2lkZ2V0KHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbnRhaW5lcklkXHJcbiAgICAgKiBAbWVtYmVyb2YgWFlDaGFydFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaW5pdGlhbGl6ZShjb250YWluZXJJZDogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZShjb250YWluZXJJZCk7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0QXZhaWxhYmxlU2VyaWVzQXNEYXRhU291cmNlKCk7XHJcbiAgICAgICAgdGhpcy5pbml0aWFsaXplQ3Vyc29ySGFuZGxlcnMoKTtcclxuXHJcbiAgICAgICAgdGhpcy5hdHRhY2hDaGFydEV4dGVuc2lvbnModGhpcy5jaGFydEluc3RhbmNlKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWluaXRpYWxpemVzIHRoZSBjaGFydFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBYWUNoYXJ0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWluaXRpYWxpemUoKSB7XHJcbiAgICAgICAgJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCkuZW1wdHkoKTtcclxuICAgICAgICBzdXBlci5pbml0aWFsaXplKHRoaXMucGFyZW50Q29udGVudElkKTtcclxuICAgICAgICB0aGlzLnNldEF2YWlsYWJsZVNlcmllc0FzRGF0YVNvdXJjZSgpO1xyXG5cclxuICAgICAgICB0aGlzLmN1cnNvckhhbmRsZXIgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5pbml0aWFsaXplQ3Vyc29ySGFuZGxlcnMoKTtcclxuICAgICAgICB0aGlzLmF0dGFjaENoYXJ0RXh0ZW5zaW9ucyh0aGlzLmNoYXJ0SW5zdGFuY2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXR0YWNoZXMgYSBleHRlbnNpb24gaW5zdGFuY2VcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBjaGFydEluc3RhbmNlXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBYWUNoYXJ0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXR0YWNoQ2hhcnRFeHRlbnNpb25zKGNoYXJ0SW5zdGFuY2U6IGFueSk6IGFueSB7XHJcbiAgICAgICAgICBcclxuICAgICAgICAvLyBpbmplY3QgYW4gZXh0ZW5zaW9uIHByb3ZpZGVyXHJcbiAgICAgICAgICBsZXQgeXRDaGFydEV4dGVuc2lvbnMgPSBuZXcgQ2hhcnRFeHRlbnNpb25zKHRoaXMpO1xyXG4gICAgICAgICAgLy8gdXNlIGFuIFhZIG9wdGltaXphdGlvbiBhbGdvcml0aG1cclxuICAgICAgICAgIHl0Q2hhcnRFeHRlbnNpb25zLmNoYXJ0RGF0YU9wdGltaXplci50cmltU2VyaWVzRm9yQ2hhcnRCb3VuZHMgPSB5dENoYXJ0RXh0ZW5zaW9ucy5jaGFydERhdGFPcHRpbWl6ZXIudHJpbVNlcmllc0ZvckNoYXJ0Qm91bmRzWFk7XHJcbiAgICAgICAgICAvLyBzZXQgdGhlIGNoYXJ0IGV4dGVuc2lvbnNcclxuICAgICAgICAgIGNoYXJ0SW5zdGFuY2UuY2hhcnRFeHRlbnNpb25zID0geXRDaGFydEV4dGVuc2lvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0aWFsaXplQ3Vyc29ySGFuZGxlcnMoKXtcclxuICAgICAgICBpZiAodGhpcy5jdXJzb3JIYW5kbGVyID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuY3Vyc29ySGFuZGxlciA9IChuZXcgQ3Vyc29ySGFuZGxlcih0aGlzLnBhcmVudENvbnRlbnRJZCwgdGhpcy5jaGFydC5nZXRDaGFydEFyZWEoKSkpO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnNvckhhbmRsZXIuZW5hYmxlQ3Jvc3NoYWlyQ3Vyc29yID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogU2VuZCBkYXRhIG9mIHRoZSBzZXJpZXMgdG8gdGhlIGNoYXJ0IGluc3RhbmNlXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFhZQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldEF2YWlsYWJsZVNlcmllc0FzRGF0YVNvdXJjZSgpIHtcclxuICAgICAgICBsZXQgdHJhY2VEYXRhU2VyaWVzID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNlcmllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgZWZmZWN0aXZlU2VyaWUgPSB0aGlzLmNoYXJ0SW5zdGFuY2UuY2hhcnRFeHRlbnNpb25zID8gdGhpcy5jaGFydEluc3RhbmNlLmNoYXJ0RXh0ZW5zaW9ucy5jaGFydERhdGFPcHRpbWl6ZXIuYXR0YWNoU2VyaWVzKHRoaXMuc2VyaWVzW2ldKSA6IHRoaXMuc2VyaWVzW2ldOyAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRyYWNlRGF0YVNlcmllcy5wdXNoKHRoaXMuY3JlYXRlVHJhY2VEYXRhU2VyaWVzKGVmZmVjdGl2ZVNlcmllLCB0aGlzLnByaW1hcnlZQXhpc05hbWUpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGRhdGFTZXJpZXMgPSB7IHNlcmllczogdHJhY2VEYXRhU2VyaWVzIH07XHJcbiAgICAgICAgJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCkuZWpDaGFydChkYXRhU2VyaWVzKTtcclxuXHJcbiAgICAgICAgdGhpcy5yZXBvc2l0aW9uQ3Vyc29ycygpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0ZSB6b29tIG9uIG1vdXNld2hlZWwgYWN0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgWFlDaGFydFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgb25DaGFydE1vdXNlV2hlZWwoc2VuZGVyLCBhcmdzKXtcclxuICAgICAgICBzdXBlci5vbkNoYXJ0TW91c2VXaGVlbChzZW5kZXIsIGFyZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcGFyYW0ge1BvaW50fSBjdXJzb3JQb2ludFxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBYWUNoYXJ0XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXRUaW1lc3RhbXBJblNlcmllcyhjdXJzb3JQb2ludDogUG9pbnQsIGF2YWlsYWJsZVNlcmllczogQ2hhcnRWaWV3U2VyaWVbXSkgOiBudW1iZXIge1xyXG5cclxuICAgICAgICAvLyBmaW5kIHRoZSBuZWFyZXN0IHNlcmllcyBwb2ludFxyXG4gICAgICAgIGNvbnNvbGUubG9nKGF2YWlsYWJsZVNlcmllc1swXS5zZXJpZS5uYW1lKTtcclxuICAgICAgICBjb25zdCBuZWFyZXN0U2VyaWVzUG9pbnRJbmZvOk5lYXJlc3RQb2ludEluZm8gPSB0aGlzLmZpbmROZWFyZXN0U2VyaWVzUG9pbnRJblNlcmllcyhjdXJzb3JQb2ludCwgYXZhaWxhYmxlU2VyaWVzKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBnZXQgdGhlIG5lYXJlc3Qgc2VyaWVzIGFuZCBwb2ludCBpbmRleFxyXG4gICAgICAgIGNvbnN0IG5lYXJlc3RTZXJpZXNJbmRleCA9IG5lYXJlc3RTZXJpZXNQb2ludEluZm8uc2VyaWVzSW5kZXg7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJOU0k6IFwiICsgbmVhcmVzdFNlcmllc0luZGV4KTtcclxuICAgICAgICBjb25zdCBuZWFyZXN0UG9pbnRJbmRleCA9IG5lYXJlc3RTZXJpZXNQb2ludEluZm8ucG9pbnRJbmRleDtcclxuICAgICAgICBcclxuICAgICAgICAvLyBnZXQgdGhlIG5lYXJlc3Qgc2VyaWVzIHBvaW50cyBcclxuICAgICAgICBsZXQgY2FsY3VsYXRpb25EYXRhSW5mbyA9IGF2YWlsYWJsZVNlcmllc1tuZWFyZXN0U2VyaWVzSW5kZXhdLmNhbGN1bGF0aW9uRGF0YUluZm87XHJcbiAgICAgICAgaWYoIGNhbGN1bGF0aW9uRGF0YUluZm8gIT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IG5lYXJlc3RTZXJpZXNQb2ludHMgPSBjYWxjdWxhdGlvbkRhdGFJbmZvLmlucHV0RGF0YVswXS5nZXREYXRhKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBnZXQgdGhlIG5lYXJlc3QgdGltZXN0YW1wIG9mIHRoZSBuZWFyZXN0IHNlcmllc1xyXG4gICAgICAgICAgICBsZXQgbmVhcmVzdFRpbWVzdGFtcCA9IG5lYXJlc3RTZXJpZXNQb2ludHNbbmVhcmVzdFBvaW50SW5kZXhdLng7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbmVhcmVzdFRpbWVzdGFtcDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIk5lYXJlc3RUaW1lc3RhbXAgbm90IGZvdW5kISBObyBjYWxjdWxhdGlvbkRhdGFJbmZvIVwiKTtcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIGEgdGltZXN0YW1wIG5lYXJlc3QgdG8gdGhlc3BlY2lmaWVkIHBvaW50XHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHBhcmFtIHtQb2ludH0gY3Vyc29yUG9pbnRcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgWFlDaGFydFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0VGltZXN0YW1wRnJvbVNlcmllIChjdXJzb3JQb2ludDogUG9pbnQpOm51bWJlciB7XHJcbiAgICAgICAgbGV0IHhBeGlzID0gdGhpcy5jaGFydC5nZXRBeGlzKHRoaXMucHJpbWFyeVhBeGlzTmFtZSk7XHJcbiAgICAgICAgbGV0IHlBeGlzID0gdGhpcy5jaGFydC5nZXRBeGlzKHRoaXMuc2NhbGVzWzBdLmlkKTtcclxuXHJcbiAgICAgICAgaWYoeEF4aXMgIT0gdW5kZWZpbmVkICYmIHlBeGlzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gZ2V0IHRoZSBjdXJyZW50IGFjdGl2ZSBzZXJpZXMgcG9pbnRzO1xyXG4gICAgICAgICAgICBjb25zdCBlZmZlY3RpdmVTZXJpZXNQb2ludHMgPSB0aGlzLnNlcmllc1t0aGlzLmRyYWdnZWRTZXJpZXNJbmRleF0uc2VyaWUucmF3UG9pbnRzO1xyXG5cclxuICAgICAgICAgICAgLy8gZmluZCB0aGUgbmVhcmVzdCBwb2ludCB3aXRoaW4gdGhpcyBzZXJpZXNcclxuICAgICAgICAgICAgbGV0IG5lYXJlc3RQb2ludEluZm8gPSB0aGlzLmZpbmROZWFyZXN0WFlQb2ludChlZmZlY3RpdmVTZXJpZXNQb2ludHMsIGN1cnNvclBvaW50LHhBeGlzLHlBeGlzKTtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBncmFiIG9uZSBpbnB1dCBkYXRhIHNlcmllcyB0byBnZXQgYWNjZXNzIHRvIHRoZSB0aW1lc3RhbXBzLlxyXG4gICAgICAgICAgICBsZXQgY2FsY3VsYXRpb25EYXRhSW5mbyA9IHRoaXMuc2VyaWVzW3RoaXMuZHJhZ2dlZFNlcmllc0luZGV4XS5jYWxjdWxhdGlvbkRhdGFJbmZvO1xyXG4gICAgICAgICAgICBpZihjYWxjdWxhdGlvbkRhdGFJbmZvICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5wdXRTZXJpZXNQb2ludHMgPSBjYWxjdWxhdGlvbkRhdGFJbmZvLmlucHV0RGF0YVswXS5nZXREYXRhKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSBuZWFyZXN0IHRpbWVzdGFtcCBmcm9tIHRoaXMgc2VyaWVzLiBUaGUgaW5wdXQgZGF0YXMgeCB2bHVlcyByZXByZXNlbnQgdGhlIHRpbWVzdGFtcHMuXHJcbiAgICAgICAgICAgICAgICBsZXQgbmVhcmVzdFRpbWVzdGFtcCA9IGlucHV0U2VyaWVzUG9pbnRzW25lYXJlc3RQb2ludEluZm8ucG9pbnRJbmRleF0ueDtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmVhcmVzdFRpbWVzdGFtcDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZpbmRzIHRoZSBuZWFyZXN0IHBvaW50IGluIGFsbCBhdmFsaWJhbGUgc2VyaWVzLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge1BvaW50fSBjdXJzb3JQb2ludFxyXG4gICAgICogQHJldHVybnMge05lYXJlc3RQb2ludEluZm99XHJcbiAgICAgKiBAbWVtYmVyb2YgWFlDaGFydFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGZpbmROZWFyZXN0U2VyaWVzUG9pbnRJblNlcmllcyhjdXJzb3JQb2ludDogUG9pbnQsIHNlcmllcyA6IENoYXJ0Vmlld1NlcmllW10pOiBOZWFyZXN0UG9pbnRJbmZvIHtcclxuICAgICAgICBcclxuICAgICAgICAvLyBnZXQgdGhlIGNoYXJ0cyB4LUF4aXNcclxuICAgICAgICBsZXQgeEF4aXMgPSB0aGlzLmNoYXJ0LmdldEF4aXModGhpcy5wcmltYXJ5WEF4aXNOYW1lKTtcclxuICAgICAgICAvLyBnZXQgdGhlIGNoYXJ0cyB5LUF4aXNcclxuICAgICAgICBsZXQgeUF4aXMgPSB0aGlzLmNoYXJ0LmdldEF4aXModGhpcy5zY2FsZXNbMF0uaWQpO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgYW4gYXJyYXkgZm9yIGNvbGxlY3RpbmcgdGhlIG5lYXJlc3QgcG9pbnQgaW5mb3NcclxuICAgICAgICBsZXQgbmVhcmVzdFhZU2VyaWVzUG9pbnRJbmZvczogTmVhcmVzdFBvaW50SW5mb1tdID0gdGhpcy5maW5kTmVhcmVzdFBvaW50c0luU2VyaWVzKHNlcmllcyxjdXJzb3JQb2ludCwgeEF4aXMsIHlBeGlzKTtcclxuXHJcbiAgICAgICAgLy8gcmV0cmlldmUgdGhlIGNvbGxlY3RlZCBuZWFyZXN0IHBvaW50IGRpc3RhbmNlc1xyXG4gICAgICAgIGNvbnN0IG5lYXJlc3RTZXJpZXNQb2ludEluZm8gPSB0aGlzLmdldE5lYXJlc3RQb2ludE9mQWxsU2VyaWVzKG5lYXJlc3RYWVNlcmllc1BvaW50SW5mb3MpO1xyXG5cclxuICAgICAgICByZXR1cm4gbmVhcmVzdFNlcmllc1BvaW50SW5mbztcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGaW5kcyBhIG5lYXJlc3QgcG9pbnQgd2l0aGluIGEgc2VyaWVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SVBvaW50W119IHh5UmF3UG9pbnRzXHJcbiAgICAgKiBAcGFyYW0ge1BvaW50fSBjaGFydFBvaW50XHJcbiAgICAgKiBAcGFyYW0geyp9IHhBeGlzXHJcbiAgICAgKiBAcGFyYW0geyp9IHlBeGlzXHJcbiAgICAgKiBAcmV0dXJucyB7TmVhcmVzdFBvaW50SW5mb31cclxuICAgICAqIEBtZW1iZXJvZiBYWUNoYXJ0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZmluZE5lYXJlc3RYWVBvaW50KHh5UmF3UG9pbnRzOklQb2ludFtdLCBjaGFydFBvaW50OlBvaW50ICx4QXhpczpJQ2hhcnRBeGlzLHlBeGlzOklDaGFydEF4aXMpOiBOZWFyZXN0UG9pbnRJbmZvIHtcclxuXHJcbiAgICAgICAgLy8gZ2V0IHRoZSB4LWF4aXMgcmFuZ2VcclxuICAgICAgICBjb25zdCB4QXhpc1JhbmdlID0geEF4aXMuZ2V0QXhpc1JhbmdlKCk7XHJcbiAgICAgICAgLy8gZ2V0IHRoZSBjaGFydCB4IGF4aXMgcGl4ZWwgcmFuZ2VcclxuICAgICAgICBjb25zdCB4QXhpc1BpeGVsUmFuZ2UgPSB4QXhpcy5nZXRBeGlzUmFuZ2VJblBpeGVsKCk7XHJcbiAgICAgICAgLy8gY2FsY3VsYXRlIHRoZSB4IC0gcGl4ZWwvdW5pdCByYXRpb1xyXG4gICAgICAgIGNvbnN0IHhQaXhlbHNQZXJVbml0ID0gKHhBeGlzUGl4ZWxSYW5nZS5tYXgteEF4aXNQaXhlbFJhbmdlLm1pbikvKHhBeGlzUmFuZ2UubWF4IC0geEF4aXNSYW5nZS5taW4pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGdldCB0aGUgeS1heGlzIHJhbmdlXHJcbiAgICAgICAgY29uc3QgeUF4aXNSYW5nZSA9IHlBeGlzLmdldEF4aXNSYW5nZSgpO1xyXG4gICAgICAgIC8vIGdldCB0aGUgY2hhcnQgeSBheGlzIHBpeGVsIHJhbmdlXHJcbiAgICAgICAgY29uc3QgeUF4aXNQaXhlbFJhbmdlID0geUF4aXMuZ2V0QXhpc1JhbmdlSW5QaXhlbCgpO1xyXG4gICAgICAgIC8vIGNhbGN1bGF0ZSB0aGUgeSAtIHBpeGVsL3VuaXQgcmF0aW9cclxuICAgICAgICBjb25zdCB5UGl4ZWxzUGVyVW5pdCA9ICAgKHlBeGlzUGl4ZWxSYW5nZS5tYXgteUF4aXNQaXhlbFJhbmdlLm1pbikgLyAoeUF4aXNSYW5nZS5tYXggLSB5QXhpc1JhbmdlLm1pbik7XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSBhIGluaXRpYWwgbmVhcmVzdCBwb2ludCBpbmZvLlxyXG4gICAgICAgIGNvbnN0IG5lYXJlc3RQb2ludEluZm86IE5lYXJlc3RQb2ludEluZm8gPSB0aGlzLmdldE1pblNxdWFyZWREaXN0YW5jZVBvaW50SW5mbyh4eVJhd1BvaW50cywgY2hhcnRQb2ludCwgeFBpeGVsc1BlclVuaXQsIHlQaXhlbHNQZXJVbml0KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5lYXJlc3RQb2ludEluZm87XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgbWluaW1hbCBzcXVhcmVkIGRpc3RhbmNlIG9mIHRoZSBzcGVjaWZpZWQgcG9pbnQgd2l0aGluIHRoZSBwb2ludHMgXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SVBvaW50W119IHh5UmF3UG9pbnRzXHJcbiAgICAgKiBAcGFyYW0ge1BvaW50fSBjaGFydFBvaW50XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geFBpeGVsc1BlclVuaXRcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5UGl4ZWxzUGVyVW5pdFxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBYWUNoYXJ0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0TWluU3F1YXJlZERpc3RhbmNlUG9pbnRJbmZvKHh5UmF3UG9pbnRzOiBJUG9pbnRbXSwgY2hhcnRQb2ludDogUG9pbnQsIHhQaXhlbHNQZXJVbml0OiBudW1iZXIsIHlQaXhlbHNQZXJVbml0OiBudW1iZXIpIHtcclxuICAgICAgIFxyXG4gICAgICAgIGNvbnN0IG5lYXJlc3RQb2ludEluZm86IE5lYXJlc3RQb2ludEluZm8gPSB7IHNlcmllc0luZGV4OiAwLCBwb2ludEluZGV4OiAwLCBkaXN0YW5jZVNxdWFyZWQ6IE51bWJlci5NQVhfVkFMVUUgfTtcclxuICAgICAgICAvLyBmaW5kIHRoZSBzbWFsbGVzdCBkaXN0YW5jZSB0byB0aGUgc2VyaWVzIHBvaW50XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB4eVJhd1BvaW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAvLyBjYWxjdWxhdGUgdGhlIHggZGlzdGFuY2UgXHJcbiAgICAgICAgICAgIGxldCBkeCA9ICh4eVJhd1BvaW50c1tpXS54IC0gY2hhcnRQb2ludC54KSAqIHhQaXhlbHNQZXJVbml0O1xyXG4gICAgICAgICAgICAvLyBjYWxjdWxhdGUgdGhlIHkgZGlzdGFuY2VcclxuICAgICAgICAgICAgbGV0IGR5ID0gKHh5UmF3UG9pbnRzW2ldLnkgLSBjaGFydFBvaW50LnkpICogeVBpeGVsc1BlclVuaXQ7XHJcbiAgICAgICAgICAgIC8vIGNhbGN1bGF0ZSB0aGUgMkQgZGlzdGFuY2UgdG8gdGhlIHBvaW50XHJcbiAgICAgICAgICAgIGxldCBwb2ludFRvU2VyaWVzRGlzdGFuY2VTcXVhcmVkID0gZHggKiBkeCArIGR5ICogZHk7XHJcbiAgICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgbmVhcmVzdCBwb2ludCBpbmZvIGlmIHRoZSBkaXN0YW5jZSBpcyBzbWFsbGVyIHRoZW4gdGhlIGFscmVhZHkgZXhpc3Rpbmcgb25lLiBcclxuICAgICAgICAgICAgaWYgKHBvaW50VG9TZXJpZXNEaXN0YW5jZVNxdWFyZWQgPCBuZWFyZXN0UG9pbnRJbmZvLmRpc3RhbmNlU3F1YXJlZCkge1xyXG4gICAgICAgICAgICAgICAgbmVhcmVzdFBvaW50SW5mby5kaXN0YW5jZVNxdWFyZWQgPSBwb2ludFRvU2VyaWVzRGlzdGFuY2VTcXVhcmVkO1xyXG4gICAgICAgICAgICAgICAgbmVhcmVzdFBvaW50SW5mby5wb2ludEluZGV4ID0gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmVhcmVzdFBvaW50SW5mbztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHJpZXZzIHRoZSBwb2ludCB3aGljaCBpcyB0aGUgbmVhcmVzdCBpbiBhbGwgc2VyaWVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TmVhcmVzdFBvaW50SW5mb1tdfSBuZWFyZXN0WFlTZXJpZXNQb2ludEluZm9zXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFhZQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXROZWFyZXN0UG9pbnRPZkFsbFNlcmllcyhuZWFyZXN0WFlTZXJpZXNQb2ludEluZm9zOiBOZWFyZXN0UG9pbnRJbmZvW10pIHtcclxuICAgICAgICBcclxuICAgICAgICAvLyByZXRyaWV2ZSB0aGUgY29sbGVjdGVkIG5lYXJlc3QgcG9pbnQgZGlzdGFuY2VzXHJcbiAgICAgICAgY29uc3QgcG9pbnRUb1Nlcmllc0Rpc3RhbmNlcyA9IG5lYXJlc3RYWVNlcmllc1BvaW50SW5mb3MubWFwKChuZWFyZXN0WFlTZXJpZXNQb2ludEluZm8pID0+IHsgcmV0dXJuIG5lYXJlc3RYWVNlcmllc1BvaW50SW5mby5kaXN0YW5jZVNxdWFyZWQ7IH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGdldCB0aGUgc21hbGxlc3Qgb25lLi4uICAgICAgICBcclxuICAgICAgICBjb25zdCBzbWFsbGVzdFBvaW50VG9TZXJpZXNEaXN0YW5jZSA9IE1hdGhYLm1pbihwb2ludFRvU2VyaWVzRGlzdGFuY2VzKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBnZXQgdGhlIGluZGV4IG9mIHRoZSBzbWFsbGVzdCBvbmUuLi5cclxuICAgICAgICAvLyB0aGUgbmVhcmVzdCBkaXN0YW5jZSBpbmRleCBkaXJlY3RseSBtYXRjaGVzIHRoZSBzZXJpZXMgaW5kZXggYmVjYXVzZSB0aGUgb3JkZXIgd2l0aGluIHRoZSBhcnJheXMgaXMgdGhlIHNhbWUuXHJcbiAgICAgICAgY29uc3QgbmVhcmVzdFNlcmllc0luZGV4ID0gbmVhcmVzdFhZU2VyaWVzUG9pbnRJbmZvcy5maW5kSW5kZXgoKG5lYXJlc3RYWVNlcmllc1BvaW50SW5mbykgPT4geyByZXR1cm4gbmVhcmVzdFhZU2VyaWVzUG9pbnRJbmZvLmRpc3RhbmNlU3F1YXJlZCA9PT0gc21hbGxlc3RQb2ludFRvU2VyaWVzRGlzdGFuY2U7IH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgbmVhcmVzdCBwb2ludCBpbmZvcyBzZXJpZXMgaW5kZXhcclxuICAgICAgICBjb25zdCBuZWFyZXN0U2VyaWVzUG9pbnRJbmZvID0gbmVhcmVzdFhZU2VyaWVzUG9pbnRJbmZvc1tuZWFyZXN0U2VyaWVzSW5kZXhdO1xyXG4gICAgICAgIG5lYXJlc3RTZXJpZXNQb2ludEluZm8uc2VyaWVzSW5kZXggPSBuZWFyZXN0U2VyaWVzSW5kZXg7XHJcbiAgICAgICAgcmV0dXJuIG5lYXJlc3RTZXJpZXNQb2ludEluZm87XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGaW5kcyB0aGUgbmVhcmVzdCBwb2ludHMgaW4gdGhlIHNwZWNpZmllZCBzZXJpZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtQb2ludH0gY3Vyc29yUG9pbnRcclxuICAgICAqIEBwYXJhbSB7IElDaGFydEF4aXMgfCB1bmRlZmluZWR9IHhBeGlzXHJcbiAgICAgKiBAcGFyYW0geyBJQ2hhcnRBeGlzIHwgdW5kZWZpbmVkfSB5QXhpc1xyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBYWUNoYXJ0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZmluZE5lYXJlc3RQb2ludHNJblNlcmllcyhzZXJpZXM6IENoYXJ0Vmlld1NlcmllW10sIGN1cnNvclBvaW50OiBQb2ludCwgeEF4aXM6IElDaGFydEF4aXMgfCB1bmRlZmluZWQsIHlBeGlzOiBJQ2hhcnRBeGlzIHwgdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgbGV0IG5lYXJlc3RYWVNlcmllc1BvaW50SW5mb3M6IE5lYXJlc3RQb2ludEluZm9bXSA9IFtdO1xyXG4gICAgICAgIGlmICh4QXhpcyAmJiB5QXhpcykge1xyXG4gICAgICAgICAgICAvLyBjb2xsZWN0IHRoZSBuZWFyZXN0IHBvaW50IGluZm9zIG9mIGFsbCBzZXJpZXNcclxuICAgICAgICAgICAgc2VyaWVzLmZvckVhY2goKHNlcmllcykgPT4geyBuZWFyZXN0WFlTZXJpZXNQb2ludEluZm9zLnB1c2godGhpcy5maW5kTmVhcmVzdFhZUG9pbnQoc2VyaWVzLnNlcmllLnJhd1BvaW50cywgY3Vyc29yUG9pbnQsIHhBeGlzLCB5QXhpcykpOyB9KTsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5lYXJlc3RYWVNlcmllc1BvaW50SW5mb3M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIGEgY2hhcnQgcG9pbnQgZm9yIHRoZSBzcGVjaWZpZWQgdGltZXN0YW1wXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lc3RhbXBcclxuICAgICAqIEByZXR1cm5zIHtQb2ludH1cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldEN1cnNvclBvaW50KGxlYWRDdXJzb3JUaW1lU3RhbXA6IG51bWJlcix0aW1lc3RhbXA6IG51bWJlcixzZXJpZXNJbmRleDpudW1iZXIpOiBUaW1lUG9pbnR7XHJcbiAgICAgICAgbGV0IHNlcmllc1RpbWVzdGFtcEluZGV4ID0gdGhpcy5zZXJpZXNbc2VyaWVzSW5kZXhdLnNlcmllLmdldFRpbWVzdGFtcEluZGV4KHRpbWVzdGFtcCk7XHJcbiAgICAgICAgbGV0IHNlcmllc1BvaW50ID0gdGhpcy5zZXJpZXNbc2VyaWVzSW5kZXhdLnNlcmllLnJhd1BvaW50c1tzZXJpZXNUaW1lc3RhbXBJbmRleF07XHJcbiAgICAgICAgcmV0dXJuIHt0aW1lc3RhbXA6IHRoaXMuc2VyaWVzW3Nlcmllc0luZGV4XS5jYWxjdWxhdGlvbkRhdGFJbmZvIS5pbnB1dERhdGFbMF0uZ2V0RGF0YSgpW3Nlcmllc1RpbWVzdGFtcEluZGV4XS54LHg6IHNlcmllc1BvaW50LngseTogc2VyaWVzUG9pbnQueX1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgbWF4IHggdmFsdWUgZnJvbSBhbGwgc2VyaWVzIGluIHRoZSBjaGFydFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsobnVtYmVyfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgWFlDaGFydFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0VG90YWxNYXhYKHRyYWNlQ2hhcnRMaXN0KTogbnVtYmVyfHVuZGVmaW5lZHtcclxuICAgICAgICBsZXQgbWF4WDogbnVtYmVyfHVuZGVmaW5lZCA9IHVuZGVmaW5lZFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zZXJpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VyaWVzW2ldICE9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgaWYgKG1heFggPT0gdW5kZWZpbmVkIHx8IHRoaXMuc2VyaWVzW2ldLm1heFghID4gbWF4WCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF4WCA9IHRoaXMuc2VyaWVzW2ldLm1heFg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1heFhcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBtaW4geCB2YWx1ZSBmcm9tIGFsbCBzZXJpZXMgaW4gdGhlIGNoYXJ0XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyhudW1iZXJ8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBYWUNoYXJ0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRUb3RhbE1pblgodHJhY2VDaGFydExpc3QpOiBudW1iZXJ8dW5kZWZpbmVke1xyXG4gICAgICAgIGxldCBtaW5YOiBudW1iZXJ8dW5kZWZpbmVkID0gdW5kZWZpbmVkXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNlcmllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXJpZXNbaV0gIT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBpZiAobWluWCA9PSB1bmRlZmluZWQgfHwgdGhpcy5zZXJpZXNbaV0ubWluWCEgPCBtaW5YKXtcclxuICAgICAgICAgICAgICAgICAgICBtaW5YID0gdGhpcy5zZXJpZXNbaV0ubWluWDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG1pblhcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBkcm9wIGxvY2F0aW9ucyBpbiB0aGUgY2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PEJhc2VTZXJpZXM+fSBzZXJpZVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBYWUNoYXJ0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGRTZXJpZURyb3BMb2NhdGlvbnMoc2VyaWU6IEFycmF5PEJhc2VTZXJpZXM+LCBjaGFydE1hbmFnZXJDaGFydCl7XHJcbiAgICAgICAgaWYgKCFjaGFydE1hbmFnZXJDaGFydC5jaGlsZHNbMF0uZHJvcFBvc3NpYmxlKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmFkZFNlcmllQ2hhcnREcm9wTG9jYXRpb25zKHNlcmllWzBdKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgZHJvcCBsb2NhdGlvbnMgaW4gdGhlIGNoYXJ0IGFyZWFcclxuICAgICAqIFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVcclxuICAgICAqIEBtZW1iZXJvZiBZVENoYXJ0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkU2VyaWVDaGFydERyb3BMb2NhdGlvbnMoc2VyaWU6IEJhc2VTZXJpZXMpe1xyXG4gICAgICAgIGlmKHNlcmllLm5hbWUpe1xyXG4gICAgICAgICAgICBsZXQgb2Zmc2V0V2lkdGggPSAxOC40O1xyXG4gICAgICAgICAgICBsZXQgcGFyZW50Q29udGFpbmVyID0gJChcIiNcIit0aGlzLnBhcmVudENvbnRlbnRJZCk7XHJcbiAgICAgICAgICAgICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpLmFwcGVuZCgnPGRpdiBpZD1cIicrdGhpcy5wYXJlbnRDb250ZW50SWQrJ19heGlzRHJvcFpvbmUnK1wiX2NoYXJ0QXJlYVwiKydcIiBzdHlsZT1cInBvc2l0aW9uOmFic29sdXRlOyB3aWR0aDogJysgKHBhcmVudENvbnRhaW5lci53aWR0aCgpIS0gb2Zmc2V0V2lkdGgpICsgJ3B4OyBoZWlnaHQ6ICcrIChwYXJlbnRDb250YWluZXIuaGVpZ2h0KCkhKSArJ3B4OyB0b3A6IDBweFwiOyBjbGFzcz1cImRyb3BMb2NhdGlvbkFyZWFcIj48L2Rpdj4nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gcGFnZVhcclxuICAgICAqIEBwYXJhbSB7Kn0gcGFnZVlcclxuICAgICAqIEBtZW1iZXJvZiBYWUNoYXJ0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkb1Bhbm5pbmcocGFnZVgsIHBhZ2VZKXtcclxuICAgICAgICBzdXBlci5kb1Bhbm5pbmcocGFnZVgsIHBhZ2VZKTtcclxuICAgICAgICB0aGlzLnJlZHJhd0NoYXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBjdXJyZW50IGRyb3AgbG9jYXRpb24gdHlwZSAoZS5nLiBhc3NpZ24gdG8gc2NhbGUsIGFkZCBuZXcgc2NhbGUsIGludmFsaWQgZm9yIGRyb3ApXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0Ryb3BMb2NhdGlvblR5cGV9XHJcbiAgICAgKiBAbWVtYmVyb2YgWFlDaGFydFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0RHJvcExvY2F0aW9uVHlwZShjdXJyZW50VGFyZ2V0KTogRHJvcExvY2F0aW9uVHlwZXtcclxuICAgICAgICByZXR1cm4gRHJvcExvY2F0aW9uVHlwZS5hc3NpZ25Ub1NjYWxlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGlnaGxpZ2h0IGRyb3BwYWJsZSBhcmVhcyBpZiBhIHZhbGlkIHNpZ25hbCBpcyBkcmFnZ2VkIG92ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IGN1cnJlbnRUYXJnZXRcclxuICAgICAqIEBtZW1iZXJvZiBCYXNpY0NoYXJ0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB1cGRhdGVEcm9wcGFibGVBcmVhcyhjdXJyZW50VGFyZ2V0KSB7XHJcbiAgICAgICAgaWYoY3VycmVudFRhcmdldC5pZC5pbmNsdWRlcyhcIl9heGlzRHJvcFpvbmVfY2hhcnRBcmVhXCIpKXtcclxuICAgICAgICAgICAgbGV0IGNoYXJ0QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMucGFyZW50Q29udGVudElkICsnX2F4aXNEcm9wWm9uZV9jaGFydEFyZWEnKTtcclxuICAgICAgICAgICAgaWYoY2hhcnRBcmVhICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgY2hhcnRBcmVhIS5jbGFzc0xpc3QuYWRkKCdkcmFnZ2VkT3ZlcicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJlc2V0SGlnaGxpZ2h0aW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlc2V0IGhpZ2hsaWdodGVkIGFyZWFzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJhc2ljQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlc2V0SGlnaGxpZ2h0aW5nKCl7XHJcbiAgICAgICAgbGV0IGNoYXJ0QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMucGFyZW50Q29udGVudElkICsnX2F4aXNEcm9wWm9uZV9jaGFydEFyZWEnKTtcclxuICAgICAgICBpZihjaGFydEFyZWEgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGNoYXJ0QXJlYSEuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZ2dlZE92ZXInKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBzZXRTY2FsZVJhbmdlKHNjYWxlOiBTY2FsZSwgbWluWFZhbHVlOiBudW1iZXIsIG1heFhWYWx1ZTogbnVtYmVyLCBtaW5ZVmFsdWU6IG51bWJlciwgbWF4WVZhbHVlOiBudW1iZXIsIG9yaWVudGF0aW9uPzogc3RyaW5nLCBzZXRBeGlzUmFuZ2UgPSB0cnVlKXtcclxuICAgICAgICBzdXBlci5zZXRTY2FsZVJhbmdlKHNjYWxlLG1pblhWYWx1ZSwgbWF4WFZhbHVlLCBtaW5ZVmFsdWUsIG1heFlWYWx1ZSwgb3JpZW50YXRpb24sIHNldEF4aXNSYW5nZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKG9yaWVudGF0aW9uID09ICdob3Jpem9udGFsJyAmJiBzZXRBeGlzUmFuZ2UgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIGxldCBheGlzID0gdGhpcy5jaGFydC5nZXRBeGlzKHRoaXMucHJpbWFyeVhBeGlzTmFtZSk7XHJcbiAgICAgICAgICAgIGlmKCBheGlzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBheGlzLnNldEF4aXNSYW5nZSh7bWluOiBzY2FsZS5taW5YVmFsdWUsIG1heDogc2NhbGUubWF4WFZhbHVlfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZFNlcmllc1RvQ2hhcnQoc2VyaWVzOiBBcnJheTxCYXNlU2VyaWVzPiwgc2NhbGU6IFNjYWxlKXtcclxuICAgICAgICBsZXQgcmVzZXRYUmFuZ2UgPSBmYWxzZTtcclxuICAgICAgICBpZih0aGlzLnNlcmllcy5sZW5ndGggPT0gMCl7XHJcbiAgICAgICAgICAgIHJlc2V0WFJhbmdlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3VwZXIuYWRkU2VyaWVzVG9DaGFydChzZXJpZXMsIHNjYWxlKTtcclxuICAgICAgICBpZihyZXNldFhSYW5nZSl7XHJcbiAgICAgICAgICAgIG5ldyBDaGFydFJhbmdlSGVscGVyKCkucmVzZXRDaGFydFJhbmdlc1goW3RoaXNdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZVNlcmllRnJvbUNoYXJ0KHNlcmllOiBCYXNlU2VyaWVzfENoYXJ0Vmlld1NlcmllKXtcclxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuc2VyaWVJbkNoYXJ0KHNlcmllKTtcclxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLnNlcmllcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZXRBdmFpbGFibGVTZXJpZXNBc0RhdGFTb3VyY2UoKTtcclxuXHJcbiAgICAgICAgLy9yZWRyYXcgY3Vyc29yc1xyXG4gICAgICAgIGxldCBzdGF0ZXMgPSB0aGlzLmN1cnNvcnNTdGF0ZXMuZ2V0VGltZVN0YXRlcygpO1xyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc3RhdGVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IHRpbWVzdGFtcCA9IHN0YXRlc1tpXS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgaWYodGltZXN0YW1wICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdDdXJzb3IodGltZXN0YW1wLCBpLCBzdGF0ZXNbaV0uaG92ZXJlZCwgc3RhdGVzW2ldLnNlbGVjdGVkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCB7IFhZQ2hhcnQgfTtcclxuXHJcbiJdfQ==