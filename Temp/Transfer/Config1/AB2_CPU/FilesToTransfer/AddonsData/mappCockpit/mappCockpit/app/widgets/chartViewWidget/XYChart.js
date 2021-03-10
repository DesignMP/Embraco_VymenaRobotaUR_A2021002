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
define(["require", "exports", "./ChartBase", "./helpers/chartRangeHelper", "./chartExtensions/chartExtensions", "../../models/common/point", "../common/states/cursorStates", "./cursor/CursorHandler", "../../common/math/mathX"], function (require, exports, ChartBase_1, chartRangeHelper_1, chartExtensions_1, point_1, cursorStates_1, CursorHandler_1, mathX_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var XYChart = /** @class */ (function (_super) {
        __extends(XYChart, _super);
        function XYChart(chartManager, name, type, scale) {
            var _this = _super.call(this, chartManager, name, scale) || this;
            _this.series = [];
            _this.primaryXAxisName = "PrimaryDataXAxis";
            _this.primaryYAxisName = "Scale_1";
            _this.cursorHandler = undefined;
            _this.widgetName = name;
            _this.chartManager = chartManager;
            _this.type = type;
            _this.addWidgetToView(chartManager);
            return _this;
        }
        /**
         * Eradicate!
         *
         * @memberof XYChart
         */
        XYChart.prototype.dispose = function () {
            this.removeWidgetFromView(this.chartManager);
            _super.prototype.dispose.call(this);
        };
        /**
         * Add widget to view
         *
         * @private
         * @param {ChartViewChartManager} chartManager
         * @memberof XYChart
         */
        XYChart.prototype.addWidgetToView = function (chartManager) {
            if (chartManager.chartViewWidget.view) {
                chartManager.chartViewWidget.view.addWidget(this);
            }
        };
        /**
         * Remove widget from view
         *
         * @private
         * @param {ChartViewChartManager} chartManager
         * @memberof XYChart
         */
        XYChart.prototype.removeWidgetFromView = function (chartManager) {
            if (chartManager.chartViewWidget.view) {
                chartManager.chartViewWidget.view.removeWidget(this);
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
            this.observeStates();
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
        XYChart.prototype.getTimestampInSeries = function (cursorPoint, series) {
            // find the nearest series point
            console.log(series.length);
            var nearestSeriesPointInfo = this.findNearestSeriesPointInSeries(cursorPoint, series);
            // get the nearest series and point index
            var nearestSeriesIndex = nearestSeriesPointInfo.seriesIndex;
            var nearestPointIndex = nearestSeriesPointInfo.pointIndex;
            // get the nearest series points 
            var nearestSeriesPoints = this.series[nearestSeriesIndex].calculationDataInfo.inputData[0].getData();
            // get the nearest timestamp of the nearest series
            var nearestTimestamp = nearestSeriesPoints[nearestPointIndex].x;
            return nearestTimestamp;
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
                var inputSeriesPoints = this.series[this.draggedSeriesIndex].calculationDataInfo.inputData[0].getData();
                // get the nearest timestamp from this series. The input datas x vlues represent the timestamps.
                var nearestTimestamp = inputSeriesPoints[nearestPointInfo.pointIndex].x;
                return nearestTimestamp;
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
            var nearestSeriesPointInfo = this.retrieveNearestPointOfAllSeries(nearestXYSeriesPointInfos);
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
        XYChart.prototype.retrieveNearestPointOfAllSeries = function (nearestXYSeriesPointInfos) {
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
        XYChart.prototype.getCursorPoint = function (timestamp, seriesIndex) {
            var seriesPoint = this.series[seriesIndex].serie.pointFromTimestamp(timestamp);
            var cursorPoint = new point_1.Point(seriesPoint.x, seriesPoint.y);
            return cursorPoint;
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
            var cursorState = this.states.read(cursorStates_1.CursorStates, this.cursorStatesId);
            var states = cursorState.getTimeStates();
            for (var i = 0; i < states.length; i++) {
                var timestamp = states[i].position;
                this.drawCursor(timestamp, i, states[i].hovered, states[i].selected);
            }
        };
        return XYChart;
    }(ChartBase_1.ChartBase));
    exports.XYChart = XYChart;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWFlDaGFydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jaGFydFZpZXdXaWRnZXQvWFlDaGFydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBa0JBO1FBQXNCLDJCQUFTO1FBUzNCLGlCQUFZLFlBQW1DLEVBQUUsSUFBWSxFQUFFLElBQWUsRUFBRSxLQUFZO1lBQTVGLFlBRUksa0JBQU0sWUFBWSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsU0FNbkM7WUFmRCxZQUFNLEdBQTJCLEVBQUUsQ0FBQztZQUVwQyxzQkFBZ0IsR0FBRyxrQkFBa0IsQ0FBQTtZQUNyQyxzQkFBZ0IsR0FBRyxTQUFTLENBQUE7WUFFNUIsbUJBQWEsR0FBNEIsU0FBUyxDQUFDO1lBSy9DLEtBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLEtBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1lBQ2pDLEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBRWpCLEtBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLENBQUM7O1FBQ3ZDLENBQUM7UUFFRDs7OztXQUlHO1FBQ0kseUJBQU8sR0FBZDtZQUNJLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDN0MsaUJBQU0sT0FBTyxXQUFFLENBQUM7UUFDcEIsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLGlDQUFlLEdBQXZCLFVBQXdCLFlBQW1DO1lBQ3ZELElBQUksWUFBWSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUU7Z0JBQ25DLFlBQVksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNyRDtRQUNMLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSyxzQ0FBb0IsR0FBNUIsVUFBNkIsWUFBbUM7WUFDNUQsSUFBSSxZQUFZLENBQUMs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RSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDekU7UUFDTCxDQUFDO1FBRUwsY0FBQztJQUFELENBQUMsQUE1ZkQsQ0FBc0IscUJBQVMsR0E0ZjlCO0lBRVEsMEJBQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFydEJhc2UsIERyb3BMb2NhdGlvblR5cGUgfSBmcm9tIFwiLi9DaGFydEJhc2VcIjtcclxuaW1wb3J0IHsgQ2hhcnRWaWV3Q2hhcnRNYW5hZ2VyIH0gZnJvbSBcIi4vY2hhcnRWaWV3Q2hhcnRNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IENoYXJ0UmFuZ2VIZWxwZXIgfSBmcm9tIFwiLi9oZWxwZXJzL2NoYXJ0UmFuZ2VIZWxwZXJcIjtcclxuaW1wb3J0IHsgQ2hhcnRFeHRlbnNpb25zIH0gZnJvbSBcIi4vY2hhcnRFeHRlbnNpb25zL2NoYXJ0RXh0ZW5zaW9uc1wiO1xyXG5pbXBvcnQgeyBDaGFydFR5cGUgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9jaGFydE1hbmFnZXJDaGFydFwiO1xyXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL3BvaW50XCI7XHJcbmltcG9ydCB7IENoYXJ0Vmlld1NlcmllIH0gZnJvbSBcIi4vY2hhcnRWaWV3U2VyaWVcIjtcclxuaW1wb3J0IHsgQmFzZVNlcmllcyB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2Jhc2VTZXJpZXNcIjtcclxuaW1wb3J0IHsgU2NhbGUgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9zY2FsZVwiO1xyXG5pbXBvcnQgeyBDdXJzb3JTdGF0ZXN9IGZyb20gXCIuLi9jb21tb24vc3RhdGVzL2N1cnNvclN0YXRlc1wiO1xyXG5pbXBvcnQgeyBDdXJzb3JIYW5kbGVyIH0gZnJvbSBcIi4vY3Vyc29yL0N1cnNvckhhbmRsZXJcIjtcclxuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSBcIi4uLy4uL2NvcmUvaW50ZXJmYWNlcy9wb2ludEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBNYXRoWCB9IGZyb20gXCIuLi8uLi9jb21tb24vbWF0aC9tYXRoWFwiO1xyXG5pbXBvcnQgeyBJQ2hhcnRBeGlzIH0gZnJvbSBcIi4uLy4uL2NvcmUvaW50ZXJmYWNlcy9jb21wb25lbnRzL3VpL2NoYXJ0L0NoYXJ0QXhpc0ludGVyZmFjZVwiO1xyXG5cclxuLy8gc3BlY2lmaWVzIGEgdHlwZSBmb3IgaG9sZGluZyBuZWFyZXN0IHBvaW50IGluZm9ybWF0aW9uXHJcbnR5cGUgTmVhcmVzdFBvaW50SW5mbyA9IHsgc2VyaWVzSW5kZXg6bnVtYmVyLCBwb2ludEluZGV4Om51bWJlciwgZGlzdGFuY2VTcXVhcmVkOm51bWJlcn07XHJcblxyXG5jbGFzcyBYWUNoYXJ0IGV4dGVuZHMgQ2hhcnRCYXNle1xyXG5cclxuICAgIHNlcmllcyA6IEFycmF5PENoYXJ0Vmlld1NlcmllPiA9IFtdO1xyXG5cclxuICAgIHByaW1hcnlYQXhpc05hbWUgPSBcIlByaW1hcnlEYXRhWEF4aXNcIlxyXG4gICAgcHJpbWFyeVlBeGlzTmFtZSA9IFwiU2NhbGVfMVwiXHJcblxyXG4gICAgY3Vyc29ySGFuZGxlcjogQ3Vyc29ySGFuZGxlcnx1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY2hhcnRNYW5hZ2VyOiBDaGFydFZpZXdDaGFydE1hbmFnZXIsIG5hbWU6IHN0cmluZywgdHlwZTogQ2hhcnRUeXBlLCBzY2FsZTogU2NhbGUpIHtcclxuXHJcbiAgICAgICAgc3VwZXIoY2hhcnRNYW5hZ2VyLCBuYW1lLCBzY2FsZSk7XHJcbiAgICAgICAgdGhpcy53aWRnZXROYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLmNoYXJ0TWFuYWdlciA9IGNoYXJ0TWFuYWdlcjtcclxuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG5cclxuICAgICAgICB0aGlzLmFkZFdpZGdldFRvVmlldyhjaGFydE1hbmFnZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRXJhZGljYXRlIVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBYWUNoYXJ0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkaXNwb3NlKCl7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVXaWRnZXRGcm9tVmlldyh0aGlzLmNoYXJ0TWFuYWdlcik7XHJcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIHdpZGdldCB0byB2aWV3XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Q2hhcnRWaWV3Q2hhcnRNYW5hZ2VyfSBjaGFydE1hbmFnZXJcclxuICAgICAqIEBtZW1iZXJvZiBYWUNoYXJ0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkV2lkZ2V0VG9WaWV3KGNoYXJ0TWFuYWdlcjogQ2hhcnRWaWV3Q2hhcnRNYW5hZ2VyKSB7XHJcbiAgICAgICAgaWYgKGNoYXJ0TWFuYWdlci5jaGFydFZpZXdXaWRnZXQudmlldykge1xyXG4gICAgICAgICAgICBjaGFydE1hbmFnZXIuY2hhcnRWaWV3V2lkZ2V0LnZpZXcuYWRkV2lkZ2V0KHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZSB3aWRnZXQgZnJvbSB2aWV3XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Q2hhcnRWaWV3Q2hhcnRNYW5hZ2VyfSBjaGFydE1hbmFnZXJcclxuICAgICAqIEBtZW1iZXJvZiBYWUNoYXJ0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVtb3ZlV2lkZ2V0RnJvbVZpZXcoY2hhcnRNYW5hZ2VyOiBDaGFydFZpZXdDaGFydE1hbmFnZXIpIHtcclxuICAgICAgICBpZiAoY2hhcnRNYW5hZ2VyLmNoYXJ0Vmlld1dpZGdldC52aWV3KSB7XHJcbiAgICAgICAgICAgIGNoYXJ0TWFuYWdlci5jaGFydFZpZXdXaWRnZXQudmlldy5yZW1vdmVXaWRnZXQodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29udGFpbmVySWRcclxuICAgICAqIEBtZW1iZXJvZiBYWUNoYXJ0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpbml0aWFsaXplKGNvbnRhaW5lcklkOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlci5pbml0aWFsaXplKGNvbnRhaW5lcklkKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRBdmFpbGFibGVTZXJpZXNBc0RhdGFTb3VyY2UoKTtcclxuICAgICAgICB0aGlzLmluaXRpYWxpemVDdXJzb3JIYW5kbGVycygpO1xyXG5cclxuICAgICAgICB0aGlzLmF0dGFjaENoYXJ0RXh0ZW5zaW9ucyh0aGlzLmNoYXJ0SW5zdGFuY2UpO1xyXG4gICAgICAgIHRoaXMub2JzZXJ2ZVN0YXRlcygpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlaW5pdGlhbGl6ZXMgdGhlIGNoYXJ0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFhZQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlaW5pdGlhbGl6ZSgpIHtcclxuICAgICAgICAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKS5lbXB0eSgpO1xyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemUodGhpcy5wYXJlbnRDb250ZW50SWQpO1xyXG4gICAgICAgIHRoaXMuc2V0QXZhaWxhYmxlU2VyaWVzQXNEYXRhU291cmNlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuY3Vyc29ySGFuZGxlciA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLmluaXRpYWxpemVDdXJzb3JIYW5kbGVycygpO1xyXG4gICAgICAgIHRoaXMuYXR0YWNoQ2hhcnRFeHRlbnNpb25zKHRoaXMuY2hhcnRJbnN0YW5jZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBdHRhY2hlcyBhIGV4dGVuc2lvbiBpbnN0YW5jZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGNoYXJ0SW5zdGFuY2VcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIFhZQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhdHRhY2hDaGFydEV4dGVuc2lvbnMoY2hhcnRJbnN0YW5jZTogYW55KTogYW55IHtcclxuICAgICAgICAgIFxyXG4gICAgICAgIC8vIGluamVjdCBhbiBleHRlbnNpb24gcHJvdmlkZXJcclxuICAgICAgICAgIGxldCB5dENoYXJ0RXh0ZW5zaW9ucyA9IG5ldyBDaGFydEV4dGVuc2lvbnModGhpcyk7XHJcbiAgICAgICAgICAvLyB1c2UgYW4gWFkgb3B0aW1pemF0aW9uIGFsZ29yaXRobVxyXG4gICAgICAgICAgeXRDaGFydEV4dGVuc2lvbnMuY2hhcnREYXRhT3B0aW1pemVyLnRyaW1TZXJpZXNGb3JDaGFydEJvdW5kcyA9IHl0Q2hhcnRFeHRlbnNpb25zLmNoYXJ0RGF0YU9wdGltaXplci50cmltU2VyaWVzRm9yQ2hhcnRCb3VuZHNYWTtcclxuICAgICAgICAgIC8vIHNldCB0aGUgY2hhcnQgZXh0ZW5zaW9uc1xyXG4gICAgICAgICAgY2hhcnRJbnN0YW5jZS5jaGFydEV4dGVuc2lvbnMgPSB5dENoYXJ0RXh0ZW5zaW9ucztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRpYWxpemVDdXJzb3JIYW5kbGVycygpe1xyXG4gICAgICAgIGlmICh0aGlzLmN1cnNvckhhbmRsZXIgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5jdXJzb3JIYW5kbGVyID0gKG5ldyBDdXJzb3JIYW5kbGVyKHRoaXMucGFyZW50Q29udGVudElkLCB0aGlzLmNoYXJ0LmdldENoYXJ0QXJlYSgpKSk7XHJcbiAgICAgICAgICAgIHRoaXMuY3Vyc29ySGFuZGxlci5lbmFibGVDcm9zc2hhaXJDdXJzb3IgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBTZW5kIGRhdGEgb2YgdGhlIHNlcmllcyB0byB0aGUgY2hhcnQgaW5zdGFuY2VcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgWFlDaGFydFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0QXZhaWxhYmxlU2VyaWVzQXNEYXRhU291cmNlKCkge1xyXG4gICAgICAgIGxldCB0cmFjZURhdGFTZXJpZXMgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2VyaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBlZmZlY3RpdmVTZXJpZSA9IHRoaXMuY2hhcnRJbnN0YW5jZS5jaGFydEV4dGVuc2lvbnMgPyB0aGlzLmNoYXJ0SW5zdGFuY2UuY2hhcnRFeHRlbnNpb25zLmNoYXJ0RGF0YU9wdGltaXplci5hdHRhY2hTZXJpZXModGhpcy5zZXJpZXNbaV0pIDogdGhpcy5zZXJpZXNbaV07ICAgICAgICAgICBcclxuICAgICAgICAgICAgdHJhY2VEYXRhU2VyaWVzLnB1c2godGhpcy5jcmVhdGVUcmFjZURhdGFTZXJpZXMoZWZmZWN0aXZlU2VyaWUsIHRoaXMucHJpbWFyeVlBeGlzTmFtZSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZGF0YVNlcmllcyA9IHsgc2VyaWVzOiB0cmFjZURhdGFTZXJpZXMgfTtcclxuICAgICAgICAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKS5lakNoYXJ0KGRhdGFTZXJpZXMpO1xyXG5cclxuICAgICAgICB0aGlzLnJlcG9zaXRpb25DdXJzb3JzKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQ2FsY3VsYXRlIHpvb20gb24gbW91c2V3aGVlbCBhY3Rpb25cclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBYWUNoYXJ0XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBvbkNoYXJ0TW91c2VXaGVlbChzZW5kZXIsIGFyZ3Mpe1xyXG4gICAgICAgIHN1cGVyLm9uQ2hhcnRNb3VzZVdoZWVsKHNlbmRlciwgYXJncyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBwYXJhbSB7UG9pbnR9IGN1cnNvclBvaW50XHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIFhZQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldFRpbWVzdGFtcEluU2VyaWVzKGN1cnNvclBvaW50OiBQb2ludCwgc2VyaWVzOiBDaGFydFZpZXdTZXJpZVtdKSA6IG51bWJlciB7XHJcblxyXG4gICAgICAgIC8vIGZpbmQgdGhlIG5lYXJlc3Qgc2VyaWVzIHBvaW50XHJcbiAgICAgICAgY29uc29sZS5sb2coc2VyaWVzLmxlbmd0aCk7XHJcbiAgICAgICAgY29uc3QgbmVhcmVzdFNlcmllc1BvaW50SW5mbzpOZWFyZXN0UG9pbnRJbmZvID0gdGhpcy5maW5kTmVhcmVzdFNlcmllc1BvaW50SW5TZXJpZXMoY3Vyc29yUG9pbnQsIHNlcmllcyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZ2V0IHRoZSBuZWFyZXN0IHNlcmllcyBhbmQgcG9pbnQgaW5kZXhcclxuICAgICAgICBjb25zdCBuZWFyZXN0U2VyaWVzSW5kZXggPSBuZWFyZXN0U2VyaWVzUG9pbnRJbmZvLnNlcmllc0luZGV4O1xyXG4gICAgICAgIGNvbnN0IG5lYXJlc3RQb2ludEluZGV4ID0gbmVhcmVzdFNlcmllc1BvaW50SW5mby5wb2ludEluZGV4O1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGdldCB0aGUgbmVhcmVzdCBzZXJpZXMgcG9pbnRzIFxyXG4gICAgICAgIGxldCBuZWFyZXN0U2VyaWVzUG9pbnRzID0gdGhpcy5zZXJpZXNbbmVhcmVzdFNlcmllc0luZGV4XS5jYWxjdWxhdGlvbkRhdGFJbmZvLmlucHV0RGF0YVswXS5nZXREYXRhKCk7XHJcblxyXG4gICAgICAgIC8vIGdldCB0aGUgbmVhcmVzdCB0aW1lc3RhbXAgb2YgdGhlIG5lYXJlc3Qgc2VyaWVzXHJcbiAgICAgICAgbGV0IG5lYXJlc3RUaW1lc3RhbXAgPSBuZWFyZXN0U2VyaWVzUG9pbnRzW25lYXJlc3RQb2ludEluZGV4XS54O1xyXG5cclxuICAgICAgICByZXR1cm4gbmVhcmVzdFRpbWVzdGFtcDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIGEgdGltZXN0YW1wIG5lYXJlc3QgdG8gdGhlc3BlY2lmaWVkIHBvaW50XHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHBhcmFtIHtQb2ludH0gY3Vyc29yUG9pbnRcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgWFlDaGFydFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0VGltZXN0YW1wRnJvbVNlcmllIChjdXJzb3JQb2ludDogUG9pbnQpOm51bWJlciB7XHJcbiAgICAgICAgbGV0IHhBeGlzID0gdGhpcy5jaGFydC5nZXRBeGlzKHRoaXMucHJpbWFyeVhBeGlzTmFtZSk7XHJcbiAgICAgICAgbGV0IHlBeGlzID0gdGhpcy5jaGFydC5nZXRBeGlzKHRoaXMuc2NhbGVzWzBdLmlkKTtcclxuXHJcbiAgICAgICAgaWYoeEF4aXMgIT0gdW5kZWZpbmVkICYmIHlBeGlzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gZ2V0IHRoZSBjdXJyZW50IGFjdGl2ZSBzZXJpZXMgcG9pbnRzO1xyXG4gICAgICAgICAgICBjb25zdCBlZmZlY3RpdmVTZXJpZXNQb2ludHMgPSB0aGlzLnNlcmllc1t0aGlzLmRyYWdnZWRTZXJpZXNJbmRleF0uc2VyaWUucmF3UG9pbnRzO1xyXG5cclxuICAgICAgICAgICAgLy8gZmluZCB0aGUgbmVhcmVzdCBwb2ludCB3aXRoaW4gdGhpcyBzZXJpZXNcclxuICAgICAgICAgICAgbGV0IG5lYXJlc3RQb2ludEluZm8gPSB0aGlzLmZpbmROZWFyZXN0WFlQb2ludChlZmZlY3RpdmVTZXJpZXNQb2ludHMsIGN1cnNvclBvaW50LHhBeGlzLHlBeGlzKTtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBncmFiIG9uZSBpbnB1dCBkYXRhIHNlcmllcyB0byBnZXQgYWNjZXNzIHRvIHRoZSB0aW1lc3RhbXBzLlxyXG4gICAgICAgICAgICBsZXQgaW5wdXRTZXJpZXNQb2ludHMgPSB0aGlzLnNlcmllc1t0aGlzLmRyYWdnZWRTZXJpZXNJbmRleF0uY2FsY3VsYXRpb25EYXRhSW5mby5pbnB1dERhdGFbMF0uZ2V0RGF0YSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gZ2V0IHRoZSBuZWFyZXN0IHRpbWVzdGFtcCBmcm9tIHRoaXMgc2VyaWVzLiBUaGUgaW5wdXQgZGF0YXMgeCB2bHVlcyByZXByZXNlbnQgdGhlIHRpbWVzdGFtcHMuXHJcbiAgICAgICAgICAgIGxldCBuZWFyZXN0VGltZXN0YW1wID0gaW5wdXRTZXJpZXNQb2ludHNbbmVhcmVzdFBvaW50SW5mby5wb2ludEluZGV4XS54O1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5lYXJlc3RUaW1lc3RhbXA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmluZHMgdGhlIG5lYXJlc3QgcG9pbnQgaW4gYWxsIGF2YWxpYmFsZSBzZXJpZXMuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7UG9pbnR9IGN1cnNvclBvaW50XHJcbiAgICAgKiBAcmV0dXJucyB7TmVhcmVzdFBvaW50SW5mb31cclxuICAgICAqIEBtZW1iZXJvZiBYWUNoYXJ0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZmluZE5lYXJlc3RTZXJpZXNQb2ludEluU2VyaWVzKGN1cnNvclBvaW50OiBQb2ludCwgc2VyaWVzIDogQ2hhcnRWaWV3U2VyaWVbXSk6IE5lYXJlc3RQb2ludEluZm8ge1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGdldCB0aGUgY2hhcnRzIHgtQXhpc1xyXG4gICAgICAgIGxldCB4QXhpcyA9IHRoaXMuY2hhcnQuZ2V0QXhpcyh0aGlzLnByaW1hcnlYQXhpc05hbWUpO1xyXG4gICAgICAgIC8vIGdldCB0aGUgY2hhcnRzIHktQXhpc1xyXG4gICAgICAgIGxldCB5QXhpcyA9IHRoaXMuY2hhcnQuZ2V0QXhpcyh0aGlzLnNjYWxlc1swXS5pZCk7XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSBhbiBhcnJheSBmb3IgY29sbGVjdGluZyB0aGUgbmVhcmVzdCBwb2ludCBpbmZvc1xyXG4gICAgICAgIGxldCBuZWFyZXN0WFlTZXJpZXNQb2ludEluZm9zOiBOZWFyZXN0UG9pbnRJbmZvW10gPSB0aGlzLmZpbmROZWFyZXN0UG9pbnRzSW5TZXJpZXMoc2VyaWVzLGN1cnNvclBvaW50LCB4QXhpcywgeUF4aXMpO1xyXG5cclxuICAgICAgICAvLyByZXRyaWV2ZSB0aGUgY29sbGVjdGVkIG5lYXJlc3QgcG9pbnQgZGlzdGFuY2VzXHJcbiAgICAgICAgY29uc3QgbmVhcmVzdFNlcmllc1BvaW50SW5mbyA9IHRoaXMucmV0cmlldmVOZWFyZXN0UG9pbnRPZkFsbFNlcmllcyhuZWFyZXN0WFlTZXJpZXNQb2ludEluZm9zKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5lYXJlc3RTZXJpZXNQb2ludEluZm87XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmluZHMgYSBuZWFyZXN0IHBvaW50IHdpdGhpbiBhIHNlcmllc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0lQb2ludFtdfSB4eVJhd1BvaW50c1xyXG4gICAgICogQHBhcmFtIHtQb2ludH0gY2hhcnRQb2ludFxyXG4gICAgICogQHBhcmFtIHsqfSB4QXhpc1xyXG4gICAgICogQHBhcmFtIHsqfSB5QXhpc1xyXG4gICAgICogQHJldHVybnMge05lYXJlc3RQb2ludEluZm99XHJcbiAgICAgKiBAbWVtYmVyb2YgWFlDaGFydFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGZpbmROZWFyZXN0WFlQb2ludCh4eVJhd1BvaW50czpJUG9pbnRbXSwgY2hhcnRQb2ludDpQb2ludCAseEF4aXM6SUNoYXJ0QXhpcyx5QXhpczpJQ2hhcnRBeGlzKTogTmVhcmVzdFBvaW50SW5mbyB7XHJcblxyXG4gICAgICAgIC8vIGdldCB0aGUgeC1heGlzIHJhbmdlXHJcbiAgICAgICAgY29uc3QgeEF4aXNSYW5nZSA9IHhBeGlzLmdldEF4aXNSYW5nZSgpO1xyXG4gICAgICAgIC8vIGdldCB0aGUgY2hhcnQgeCBheGlzIHBpeGVsIHJhbmdlXHJcbiAgICAgICAgY29uc3QgeEF4aXNQaXhlbFJhbmdlID0geEF4aXMuZ2V0QXhpc1JhbmdlSW5QaXhlbCgpO1xyXG4gICAgICAgIC8vIGNhbGN1bGF0ZSB0aGUgeCAtIHBpeGVsL3VuaXQgcmF0aW9cclxuICAgICAgICBjb25zdCB4UGl4ZWxzUGVyVW5pdCA9ICh4QXhpc1BpeGVsUmFuZ2UubWF4LXhBeGlzUGl4ZWxSYW5nZS5taW4pLyh4QXhpc1JhbmdlLm1heCAtIHhBeGlzUmFuZ2UubWluKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBnZXQgdGhlIHktYXhpcyByYW5nZVxyXG4gICAgICAgIGNvbnN0IHlBeGlzUmFuZ2UgPSB5QXhpcy5nZXRBeGlzUmFuZ2UoKTtcclxuICAgICAgICAvLyBnZXQgdGhlIGNoYXJ0IHkgYXhpcyBwaXhlbCByYW5nZVxyXG4gICAgICAgIGNvbnN0IHlBeGlzUGl4ZWxSYW5nZSA9IHlBeGlzLmdldEF4aXNSYW5nZUluUGl4ZWwoKTtcclxuICAgICAgICAvLyBjYWxjdWxhdGUgdGhlIHkgLSBwaXhlbC91bml0IHJhdGlvXHJcbiAgICAgICAgY29uc3QgeVBpeGVsc1BlclVuaXQgPSAgICh5QXhpc1BpeGVsUmFuZ2UubWF4LXlBeGlzUGl4ZWxSYW5nZS5taW4pIC8gKHlBeGlzUmFuZ2UubWF4IC0geUF4aXNSYW5nZS5taW4pO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgYSBpbml0aWFsIG5lYXJlc3QgcG9pbnQgaW5mby5cclxuICAgICAgICBjb25zdCBuZWFyZXN0UG9pbnRJbmZvOiBOZWFyZXN0UG9pbnRJbmZvID0gdGhpcy5nZXRNaW5TcXVhcmVkRGlzdGFuY2VQb2ludEluZm8oeHlSYXdQb2ludHMsIGNoYXJ0UG9pbnQsIHhQaXhlbHNQZXJVbml0LCB5UGl4ZWxzUGVyVW5pdCk7XHJcblxyXG4gICAgICAgIHJldHVybiBuZWFyZXN0UG9pbnRJbmZvO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIG1pbmltYWwgc3F1YXJlZCBkaXN0YW5jZSBvZiB0aGUgc3BlY2lmaWVkIHBvaW50IHdpdGhpbiB0aGUgcG9pbnRzIFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0lQb2ludFtdfSB4eVJhd1BvaW50c1xyXG4gICAgICogQHBhcmFtIHtQb2ludH0gY2hhcnRQb2ludFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHhQaXhlbHNQZXJVbml0XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geVBpeGVsc1BlclVuaXRcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgWFlDaGFydFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldE1pblNxdWFyZWREaXN0YW5jZVBvaW50SW5mbyh4eVJhd1BvaW50czogSVBvaW50W10sIGNoYXJ0UG9pbnQ6IFBvaW50LCB4UGl4ZWxzUGVyVW5pdDogbnVtYmVyLCB5UGl4ZWxzUGVyVW5pdDogbnVtYmVyKSB7XHJcbiAgICAgICBcclxuICAgICAgICBjb25zdCBuZWFyZXN0UG9pbnRJbmZvOiBOZWFyZXN0UG9pbnRJbmZvID0geyBzZXJpZXNJbmRleDogMCwgcG9pbnRJbmRleDogMCwgZGlzdGFuY2VTcXVhcmVkOiBOdW1iZXIuTUFYX1ZBTFVFIH07XHJcbiAgICAgICAgLy8gZmluZCB0aGUgc21hbGxlc3QgZGlzdGFuY2UgdG8gdGhlIHNlcmllcyBwb2ludFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgeHlSYXdQb2ludHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgLy8gY2FsY3VsYXRlIHRoZSB4IGRpc3RhbmNlIFxyXG4gICAgICAgICAgICBsZXQgZHggPSAoeHlSYXdQb2ludHNbaV0ueCAtIGNoYXJ0UG9pbnQueCkgKiB4UGl4ZWxzUGVyVW5pdDtcclxuICAgICAgICAgICAgLy8gY2FsY3VsYXRlIHRoZSB5IGRpc3RhbmNlXHJcbiAgICAgICAgICAgIGxldCBkeSA9ICh4eVJhd1BvaW50c1tpXS55IC0gY2hhcnRQb2ludC55KSAqIHlQaXhlbHNQZXJVbml0O1xyXG4gICAgICAgICAgICAvLyBjYWxjdWxhdGUgdGhlIDJEIGRpc3RhbmNlIHRvIHRoZSBwb2ludFxyXG4gICAgICAgICAgICBsZXQgcG9pbnRUb1Nlcmllc0Rpc3RhbmNlU3F1YXJlZCA9IGR4ICogZHggKyBkeSAqIGR5O1xyXG4gICAgICAgICAgICAvLyB1cGRhdGUgdGhlIG5lYXJlc3QgcG9pbnQgaW5mbyBpZiB0aGUgZGlzdGFuY2UgaXMgc21hbGxlciB0aGVuIHRoZSBhbHJlYWR5IGV4aXN0aW5nIG9uZS4gXHJcbiAgICAgICAgICAgIGlmIChwb2ludFRvU2VyaWVzRGlzdGFuY2VTcXVhcmVkIDwgbmVhcmVzdFBvaW50SW5mby5kaXN0YW5jZVNxdWFyZWQpIHtcclxuICAgICAgICAgICAgICAgIG5lYXJlc3RQb2ludEluZm8uZGlzdGFuY2VTcXVhcmVkID0gcG9pbnRUb1Nlcmllc0Rpc3RhbmNlU3F1YXJlZDtcclxuICAgICAgICAgICAgICAgIG5lYXJlc3RQb2ludEluZm8ucG9pbnRJbmRleCA9IGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5lYXJlc3RQb2ludEluZm87XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRyaWV2cyB0aGUgcG9pbnQgd2hpY2ggaXMgdGhlIG5lYXJlc3QgaW4gYWxsIHNlcmllc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge05lYXJlc3RQb2ludEluZm9bXX0gbmVhcmVzdFhZU2VyaWVzUG9pbnRJbmZvc1xyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBYWUNoYXJ0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmV0cmlldmVOZWFyZXN0UG9pbnRPZkFsbFNlcmllcyhuZWFyZXN0WFlTZXJpZXNQb2ludEluZm9zOiBOZWFyZXN0UG9pbnRJbmZvW10pIHtcclxuICAgICAgICBcclxuICAgICAgICAvLyByZXRyaWV2ZSB0aGUgY29sbGVjdGVkIG5lYXJlc3QgcG9pbnQgZGlzdGFuY2VzXHJcbiAgICAgICAgY29uc3QgcG9pbnRUb1Nlcmllc0Rpc3RhbmNlcyA9IG5lYXJlc3RYWVNlcmllc1BvaW50SW5mb3MubWFwKChuZWFyZXN0WFlTZXJpZXNQb2ludEluZm8pID0+IHsgcmV0dXJuIG5lYXJlc3RYWVNlcmllc1BvaW50SW5mby5kaXN0YW5jZVNxdWFyZWQ7IH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGdldCB0aGUgc21hbGxlc3Qgb25lLi4uICAgICAgICBcclxuICAgICAgICBjb25zdCBzbWFsbGVzdFBvaW50VG9TZXJpZXNEaXN0YW5jZSA9IE1hdGhYLm1pbihwb2ludFRvU2VyaWVzRGlzdGFuY2VzKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBnZXQgdGhlIGluZGV4IG9mIHRoZSBzbWFsbGVzdCBvbmUuLi5cclxuICAgICAgICAvLyB0aGUgbmVhcmVzdCBkaXN0YW5jZSBpbmRleCBkaXJlY3RseSBtYXRjaGVzIHRoZSBzZXJpZXMgaW5kZXggYmVjYXVzZSB0aGUgb3JkZXIgd2l0aGluIHRoZSBhcnJheXMgaXMgdGhlIHNhbWUuXHJcbiAgICAgICAgY29uc3QgbmVhcmVzdFNlcmllc0luZGV4ID0gbmVhcmVzdFhZU2VyaWVzUG9pbnRJbmZvcy5maW5kSW5kZXgoKG5lYXJlc3RYWVNlcmllc1BvaW50SW5mbykgPT4geyByZXR1cm4gbmVhcmVzdFhZU2VyaWVzUG9pbnRJbmZvLmRpc3RhbmNlU3F1YXJlZCA9PT0gc21hbGxlc3RQb2ludFRvU2VyaWVzRGlzdGFuY2U7IH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgbmVhcmVzdCBwb2ludCBpbmZvcyBzZXJpZXMgaW5kZXhcclxuICAgICAgICBjb25zdCBuZWFyZXN0U2VyaWVzUG9pbnRJbmZvID0gbmVhcmVzdFhZU2VyaWVzUG9pbnRJbmZvc1tuZWFyZXN0U2VyaWVzSW5kZXhdO1xyXG4gICAgICAgIG5lYXJlc3RTZXJpZXNQb2ludEluZm8uc2VyaWVzSW5kZXggPSBuZWFyZXN0U2VyaWVzSW5kZXg7XHJcbiAgICAgICAgcmV0dXJuIG5lYXJlc3RTZXJpZXNQb2ludEluZm87XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGaW5kcyB0aGUgbmVhcmVzdCBwb2ludHMgaW4gdGhlIHNwZWNpZmllZCBzZXJpZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtQb2ludH0gY3Vyc29yUG9pbnRcclxuICAgICAqIEBwYXJhbSB7IElDaGFydEF4aXMgfCB1bmRlZmluZWR9IHhBeGlzXHJcbiAgICAgKiBAcGFyYW0geyBJQ2hhcnRBeGlzIHwgdW5kZWZpbmVkfSB5QXhpc1xyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBYWUNoYXJ0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZmluZE5lYXJlc3RQb2ludHNJblNlcmllcyhzZXJpZXM6IENoYXJ0Vmlld1NlcmllW10sIGN1cnNvclBvaW50OiBQb2ludCwgeEF4aXM6IElDaGFydEF4aXMgfCB1bmRlZmluZWQsIHlBeGlzOiBJQ2hhcnRBeGlzIHwgdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgbGV0IG5lYXJlc3RYWVNlcmllc1BvaW50SW5mb3M6IE5lYXJlc3RQb2ludEluZm9bXSA9IFtdO1xyXG4gICAgICAgIGlmICh4QXhpcyAmJiB5QXhpcykge1xyXG4gICAgICAgICAgICAvLyBjb2xsZWN0IHRoZSBuZWFyZXN0IHBvaW50IGluZm9zIG9mIGFsbCBzZXJpZXNcclxuICAgICAgICAgICAgc2VyaWVzLmZvckVhY2goKHNlcmllcykgPT4geyBuZWFyZXN0WFlTZXJpZXNQb2ludEluZm9zLnB1c2godGhpcy5maW5kTmVhcmVzdFhZUG9pbnQoc2VyaWVzLnNlcmllLnJhd1BvaW50cywgY3Vyc29yUG9pbnQsIHhBeGlzLCB5QXhpcykpOyB9KTsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5lYXJlc3RYWVNlcmllc1BvaW50SW5mb3M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIGEgY2hhcnQgcG9pbnQgZm9yIHRoZSBzcGVjaWZpZWQgdGltZXN0YW1wXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lc3RhbXBcclxuICAgICAqIEByZXR1cm5zIHtQb2ludH1cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldEN1cnNvclBvaW50KHRpbWVzdGFtcDogbnVtYmVyLHNlcmllc0luZGV4Om51bWJlcik6IFBvaW50IHtcclxuICAgICAgICBsZXQgc2VyaWVzUG9pbnQgPSB0aGlzLnNlcmllc1tzZXJpZXNJbmRleF0uc2VyaWUucG9pbnRGcm9tVGltZXN0YW1wKHRpbWVzdGFtcCk7XHJcbiAgICAgICAgbGV0IGN1cnNvclBvaW50ID0gbmV3IFBvaW50KHNlcmllc1BvaW50Lngsc2VyaWVzUG9pbnQueSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnNvclBvaW50O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEdldCBtYXggeCB2YWx1ZSBmcm9tIGFsbCBzZXJpZXMgaW4gdGhlIGNoYXJ0XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyhudW1iZXJ8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBYWUNoYXJ0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRUb3RhbE1heFgodHJhY2VDaGFydExpc3QpOiBudW1iZXJ8dW5kZWZpbmVke1xyXG4gICAgICAgIGxldCBtYXhYOiBudW1iZXJ8dW5kZWZpbmVkID0gdW5kZWZpbmVkXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNlcmllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXJpZXNbaV0gIT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBpZiAobWF4WCA9PSB1bmRlZmluZWQgfHwgdGhpcy5zZXJpZXNbaV0ubWF4WCEgPiBtYXhYKXtcclxuICAgICAgICAgICAgICAgICAgICBtYXhYID0gdGhpcy5zZXJpZXNbaV0ubWF4WDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWF4WFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IG1pbiB4IHZhbHVlIGZyb20gYWxsIHNlcmllcyBpbiB0aGUgY2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7KG51bWJlcnx1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIFhZQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFRvdGFsTWluWCh0cmFjZUNoYXJ0TGlzdCk6IG51bWJlcnx1bmRlZmluZWR7XHJcbiAgICAgICAgbGV0IG1pblg6IG51bWJlcnx1bmRlZmluZWQgPSB1bmRlZmluZWRcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2VyaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlcmllc1tpXSAhPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGlmIChtaW5YID09IHVuZGVmaW5lZCB8fCB0aGlzLnNlcmllc1tpXS5taW5YISA8IG1pblgpe1xyXG4gICAgICAgICAgICAgICAgICAgIG1pblggPSB0aGlzLnNlcmllc1tpXS5taW5YO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbWluWFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIGRyb3AgbG9jYXRpb25zIGluIHRoZSBjaGFydFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8QmFzZVNlcmllcz59IHNlcmllXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFhZQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZFNlcmllRHJvcExvY2F0aW9ucyhzZXJpZTogQXJyYXk8QmFzZVNlcmllcz4sIGNoYXJ0TWFuYWdlckNoYXJ0KXtcclxuICAgICAgICBpZiAoIWNoYXJ0TWFuYWdlckNoYXJ0LmNoaWxkc1swXS5kcm9wUG9zc2libGUpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuYWRkU2VyaWVDaGFydERyb3BMb2NhdGlvbnMoc2VyaWVbMF0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBkcm9wIGxvY2F0aW9ucyBpbiB0aGUgY2hhcnQgYXJlYVxyXG4gICAgICogXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtCYXNlU2VyaWVzfSBzZXJpZVxyXG4gICAgICogQG1lbWJlcm9mIFlUQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRTZXJpZUNoYXJ0RHJvcExvY2F0aW9ucyhzZXJpZTogQmFzZVNlcmllcyl7XHJcbiAgICAgICAgaWYoc2VyaWUubmFtZSl7XHJcbiAgICAgICAgICAgIGxldCBvZmZzZXRXaWR0aCA9IDE4LjQ7XHJcbiAgICAgICAgICAgIGxldCBwYXJlbnRDb250YWluZXIgPSAkKFwiI1wiK3RoaXMucGFyZW50Q29udGVudElkKTtcclxuICAgICAgICAgICAgJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCkuYXBwZW5kKCc8ZGl2IGlkPVwiJyt0aGlzLnBhcmVudENvbnRlbnRJZCsnX2F4aXNEcm9wWm9uZScrXCJfY2hhcnRBcmVhXCIrJ1wiIHN0eWxlPVwicG9zaXRpb246YWJzb2x1dGU7IHdpZHRoOiAnKyAocGFyZW50Q29udGFpbmVyLndpZHRoKCkhLSBvZmZzZXRXaWR0aCkgKyAncHg7IGhlaWdodDogJysgKHBhcmVudENvbnRhaW5lci5oZWlnaHQoKSEpICsncHg7IHRvcDogMHB4XCI7IGNsYXNzPVwiZHJvcExvY2F0aW9uQXJlYVwiPjwvZGl2PicpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBwYWdlWFxyXG4gICAgICogQHBhcmFtIHsqfSBwYWdlWVxyXG4gICAgICogQG1lbWJlcm9mIFhZQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRvUGFubmluZyhwYWdlWCwgcGFnZVkpe1xyXG4gICAgICAgIHN1cGVyLmRvUGFubmluZyhwYWdlWCwgcGFnZVkpO1xyXG4gICAgICAgIHRoaXMucmVkcmF3Q2hhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGN1cnJlbnQgZHJvcCBsb2NhdGlvbiB0eXBlIChlLmcuIGFzc2lnbiB0byBzY2FsZSwgYWRkIG5ldyBzY2FsZSwgaW52YWxpZCBmb3IgZHJvcClcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7RHJvcExvY2F0aW9uVHlwZX1cclxuICAgICAqIEBtZW1iZXJvZiBYWUNoYXJ0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXREcm9wTG9jYXRpb25UeXBlKGN1cnJlbnRUYXJnZXQpOiBEcm9wTG9jYXRpb25UeXBle1xyXG4gICAgICAgIHJldHVybiBEcm9wTG9jYXRpb25UeXBlLmFzc2lnblRvU2NhbGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIaWdobGlnaHQgZHJvcHBhYmxlIGFyZWFzIGlmIGEgdmFsaWQgc2lnbmFsIGlzIGRyYWdnZWQgb3ZlclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gY3VycmVudFRhcmdldFxyXG4gICAgICogQG1lbWJlcm9mIEJhc2ljQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHVwZGF0ZURyb3BwYWJsZUFyZWFzKGN1cnJlbnRUYXJnZXQpIHtcclxuICAgICAgICBpZihjdXJyZW50VGFyZ2V0LmlkLmluY2x1ZGVzKFwiX2F4aXNEcm9wWm9uZV9jaGFydEFyZWFcIikpe1xyXG4gICAgICAgICAgICBsZXQgY2hhcnRBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5wYXJlbnRDb250ZW50SWQgKydfYXhpc0Ryb3Bab25lX2NoYXJ0QXJlYScpO1xyXG4gICAgICAgICAgICBpZihjaGFydEFyZWEgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBjaGFydEFyZWEhLmNsYXNzTGlzdC5hZGQoJ2RyYWdnZWRPdmVyJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzZXRIaWdobGlnaHRpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVzZXQgaGlnaGxpZ2h0ZWQgYXJlYXNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzaWNDaGFydFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVzZXRIaWdobGlnaHRpbmcoKXtcclxuICAgICAgICBsZXQgY2hhcnRBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5wYXJlbnRDb250ZW50SWQgKydfYXhpc0Ryb3Bab25lX2NoYXJ0QXJlYScpO1xyXG4gICAgICAgIGlmKGNoYXJ0QXJlYSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgY2hhcnRBcmVhIS5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnZ2VkT3ZlcicpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIHNldFNjYWxlUmFuZ2Uoc2NhbGU6IFNjYWxlLCBtaW5YVmFsdWU6IG51bWJlciwgbWF4WFZhbHVlOiBudW1iZXIsIG1pbllWYWx1ZTogbnVtYmVyLCBtYXhZVmFsdWU6IG51bWJlciwgb3JpZW50YXRpb24/OiBzdHJpbmcsIHNldEF4aXNSYW5nZSA9IHRydWUpe1xyXG4gICAgICAgIHN1cGVyLnNldFNjYWxlUmFuZ2Uoc2NhbGUsbWluWFZhbHVlLCBtYXhYVmFsdWUsIG1pbllWYWx1ZSwgbWF4WVZhbHVlLCBvcmllbnRhdGlvbiwgc2V0QXhpc1JhbmdlKTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAob3JpZW50YXRpb24gPT0gJ2hvcml6b250YWwnICYmIHNldEF4aXNSYW5nZSA9PSB0cnVlKXtcclxuICAgICAgICAgICAgbGV0IGF4aXMgPSB0aGlzLmNoYXJ0LmdldEF4aXModGhpcy5wcmltYXJ5WEF4aXNOYW1lKTtcclxuICAgICAgICAgICAgaWYoIGF4aXMgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGF4aXMuc2V0QXhpc1JhbmdlKHttaW46IHNjYWxlLm1pblhWYWx1ZSwgbWF4OiBzY2FsZS5tYXhYVmFsdWV9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkU2VyaWVzVG9DaGFydChzZXJpZXM6IEFycmF5PEJhc2VTZXJpZXM+LCBzY2FsZTogU2NhbGUpe1xyXG4gICAgICAgIGxldCByZXNldFhSYW5nZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmKHRoaXMuc2VyaWVzLmxlbmd0aCA9PSAwKXtcclxuICAgICAgICAgICAgcmVzZXRYUmFuZ2UgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlci5hZGRTZXJpZXNUb0NoYXJ0KHNlcmllcywgc2NhbGUpO1xyXG4gICAgICAgIGlmKHJlc2V0WFJhbmdlKXtcclxuICAgICAgICAgICAgbmV3IENoYXJ0UmFuZ2VIZWxwZXIoKS5yZXNldENoYXJ0UmFuZ2VzWChbdGhpc10pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlU2VyaWVGcm9tQ2hhcnQoc2VyaWU6IEJhc2VTZXJpZXN8Q2hhcnRWaWV3U2VyaWUpe1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5zZXJpZUluQ2hhcnQoc2VyaWUpO1xyXG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VyaWVzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNldEF2YWlsYWJsZVNlcmllc0FzRGF0YVNvdXJjZSgpO1xyXG5cclxuICAgICAgICAvL3JlZHJhdyBjdXJzb3JzXHJcbiAgICAgICAgbGV0IGN1cnNvclN0YXRlOiBDdXJzb3JTdGF0ZXMgPSB0aGlzLnN0YXRlcy5yZWFkKEN1cnNvclN0YXRlcywgdGhpcy5jdXJzb3JTdGF0ZXNJZCk7XHJcbiAgICAgICAgbGV0IHN0YXRlcyA9IGN1cnNvclN0YXRlLmdldFRpbWVTdGF0ZXMoKTtcclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHN0YXRlcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCB0aW1lc3RhbXAgPSBzdGF0ZXNbaV0ucG9zaXRpb247XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd0N1cnNvcih0aW1lc3RhbXAhLCBpLCBzdGF0ZXNbaV0uaG92ZXJlZCwgc3RhdGVzW2ldLnNlbGVjdGVkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgeyBYWUNoYXJ0IH07XHJcblxyXG4iXX0=