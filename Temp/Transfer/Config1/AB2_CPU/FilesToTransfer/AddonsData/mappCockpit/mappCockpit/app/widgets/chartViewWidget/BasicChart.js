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
define(["require", "exports", "./ChartBase", "../../common/seriesHelper", "./chartExtensions/chartExtensions"], function (require, exports, ChartBase_1, seriesHelper_1, chartExtensions_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BasicChart = /** @class */ (function (_super) {
        __extends(BasicChart, _super);
        function BasicChart(chartManager, name, scale) {
            return _super.call(this, chartManager, name, scale) || this;
        }
        /**
         * Eradicate!
         *
         * @memberof BasicChart
         */
        BasicChart.prototype.dispose = function () {
            this.removeWidgetFromView(this.chartManager);
            _super.prototype.dispose.call(this);
        };
        /**
         *
         *
         * @protected
         * @param {ChartViewChartManager} chartManager
         * @memberof BasicChart
         */
        BasicChart.prototype.addWidgetToView = function (chartManager) {
            if (chartManager.chartViewWidget.view) {
                chartManager.chartViewWidget.view.addWidget(this);
            }
        };
        /**
         *
         *
         * @private
         * @param {ChartViewChartManager} chartManager
         * @memberof BasicChart
         */
        BasicChart.prototype.removeWidgetFromView = function (chartManager) {
            if (chartManager.chartViewWidget.view) {
                chartManager.chartViewWidget.view.removeWidget(this);
            }
        };
        /**
         *
         *
         * @param {string} containerId
         * @memberof BasicChart
         */
        BasicChart.prototype.initialize = function (containerId) {
            _super.prototype.initialize.call(this, containerId);
            this.initializeCursorHandlers();
            this.setAvailableSeriesAsDataSource();
            this.attachChartExtensions(this.chartInstance);
            this.observeStates();
            var chartArea = this.chart.getChartArea();
            this.xAxisWidth = chartArea.width;
        };
        /**
         * Reinitializes the chart
         *
         * @memberof BasicChart
         */
        BasicChart.prototype.reinitialize = function () {
            $(this.cssParentContentId).empty();
            _super.prototype.initialize.call(this, this.parentContentId);
            this.setAvailableSeriesAsDataSource();
            this.attachChartExtensions(this.chartInstance);
            var chartArea = this.chart.getChartArea();
            this.xAxisWidth = chartArea.width;
            this.cursorHandler = undefined;
            this.initializeCursorHandlers();
        };
        /**
         * Attaches a extension instance
         *
         * @private
         * @param {*} chartInstance
         * @returns {*}
         * @memberof BasicChart
         */
        BasicChart.prototype.attachChartExtensions = function (chartInstance) {
            // inject an extension provider
            var basicChartExtensions = new chartExtensions_1.ChartExtensions(this);
            // use an yt/fft optimization algorithm
            basicChartExtensions.chartDataOptimizer.trimSeriesForChartBounds = basicChartExtensions.chartDataOptimizer.trimSeriesForChartBoundsYt;
            // set the chart extensions
            chartInstance.chartExtensions = basicChartExtensions;
        };
        /**
         * Send data of the series to the chart instance
         *
         * @memberof BasicChart
         */
        BasicChart.prototype.setAvailableSeriesAsDataSource = function () {
            var traceDataSeries = new Array();
            for (var i = 0; i < this.scales.length; i++) {
                for (var j = 0; j < this.scales[i].childs.length; j++) {
                    if (this.scales[i].childs[j].rawPointsValid) {
                        var effectiveSerie = this.chartInstance.chartExtensions ? this.chartInstance.chartExtensions.chartDataOptimizer.attachSeries(this.scales[i].childs[j]) : this.scales[i].childs[j];
                        traceDataSeries.push(this.createTraceDataSeries(effectiveSerie, this.scales[i].id));
                    }
                }
            }
            var dataSeries = { series: traceDataSeries };
            $(this.cssParentContentId).ejChart(dataSeries);
        };
        /**
         * Adds a new y axis into the chart
         *
         * @param {Scale} yAxis
         * @param {boolean} opposedPosition
         * @param {string} color
         * @memberof BasicChart
         */
        BasicChart.prototype.addYScale = function (scale, position) {
            this.chart.addYAxis(scale.id, scale.minYValue, scale.maxYValue, position);
            //TODO: get axis width
            this.xAxisWidth = this.chart.getChartArea().width - 71;
            if (this.scales.indexOf(scale) == -1) {
                this.scales.push(scale);
            }
        };
        /**
         *
         *
         * @param {Scale} yScale
         * @memberof BasicChart
         */
        BasicChart.prototype.removeYScaleFromChart = function (yScale) {
            this.chart.removeYAxis(yScale.id);
            this.chart.redraw();
            this.xAxisWidth = this.chart.getChartArea().width;
            var scaleIndex = this.scales.indexOf(yScale);
            if (scaleIndex > -1) {
                this.scales.splice(scaleIndex, 1);
            }
        };
        /**
         *
         *
         * @param {*} referenceAxis
         * @param {number} min
         * @param {number} max
         * @memberof BasicChart
         */
        BasicChart.prototype.onSynchronizeScaleRange = function (scale, min, max) {
            var yScales = this.getYScales();
            for (var _i = 0, yScales_1 = yScales; _i < yScales_1.length; _i++) {
                var yScale = yScales_1[_i];
                yScale.minXValue = min;
                yScale.maxXValue = max;
            }
            var axis = this.chart.getAxis(this.primaryXAxisName);
            if (axis != undefined) {
                axis.setAxisRange({ min: min, max: max });
            }
        };
        BasicChart.prototype.getTimestampInSeries = function (point, series) {
            // get the points of the available series
            // get the timestamps series from the signal series
            var timestampSeries;
            timestampSeries = series.map(function (singleSeries) { return singleSeries.serie.timestamps; });
            var nearestPoint = seriesHelper_1.SeriesHelper.findNearestValueFromCollection(point.x, timestampSeries);
            return nearestPoint;
        };
        /**
         * Gets a chart point for the specified timestamp
         *
         * @private
         * @param {number} timestamp
         * @returns {Point}
         * @memberof BasicChart
         */
        BasicChart.prototype.getCursorPoint = function (timestamp, seriesIndex) {
            var cursorPoint = this.series[seriesIndex].serie.previousPointFromTimestamp(timestamp);
            return cursorPoint;
        };
        /**
         *
         *
         * @protected
         * @param {number} index
         * @memberof XYChart
         */
        // protected removeCursorsFromChart (index: number) {
        //     if (index > -1 && this.cursorHandler instanceof FFTCursorHandler) {
        //         this.cursorHandler.serieCursors[index].deleteCursors();
        //         this.cursorHandler.serieCursors.splice(index, 1);
        //     }
        // }
        /**
         *
         *
         * @protected
         * @param {{ x: number, y: number}} currPos
         * @param {{ x: number, y: number}} clickPos
         * @returns {number}
         * @memberof BasicChart
         */
        BasicChart.prototype.absDistanceToCursor = function (currPos, clickPos) {
            return Math.sqrt(Math.pow(clickPos.x - currPos.x, 2));
        };
        ;
        /**
         * Update range in x axis
         *
         * @param {(number | undefined)} xAxisSegmentMinValue
         * @param {(number | undefined)} xAxisSegmentMaxValue
         * @memberof BasicChart
         */
        /*public updateChartRangeX(xAxisSegmentMinValue: number | undefined, xAxisSegmentMaxValue: number | undefined) {
            super.setRangeX(xAxisSegmentMinValue!, xAxisSegmentMaxValue!);
        }*/
        /**
         * Add drop locations in the chart
         *
         * @param {Array<BaseSeries>} serie
         * @returns
         * @memberof BasicChart
         */
        BasicChart.prototype.addSerieDropLocations = function (serie, chartManagerChart) {
            if (chartManagerChart.childs[0].dropPossible) {
                this.addSerieYAxisDropLocations(serie[0]);
            }
            if (chartManagerChart.dropPossible) {
                this.addSerieChartAreaDropLocations(serie[0]);
            }
        };
        /**
         * Add drop locations to the y axis
         *
         * @private
         * @param {*} data
         * @memberof BasicChart
         */
        BasicChart.prototype.addSerieYAxisDropLocations = function (data) {
            if (data.name)
                this.calculateChartDimensions();
            for (var _i = 0, _a = this.axisBounds; _i < _a.length; _i++) {
                var axisBound = _a[_i];
                var offsetWidth = 4;
                var offsetLeft = 2;
                if (axisBound.axis.orientation == "vertical") {
                    $(this.cssParentContentId).append('<div id="' + this.parentContentId + '_axisDropZone' + axisBound.axis.name + '" style="position:absolute; width: ' + (axisBound.width - offsetWidth) + 'px; height: ' + (axisBound.height) + 'px; left:' + (axisBound.x + offsetLeft) + 'px; top:' + (axisBound.y) + 'px" class="dropLocationArea"></div>');
                }
            }
        };
        /**
         * Add drop locations in the chart area
         *
         * @private
         * @param {BaseSeries} serie
         * @memberof BasicChart
         */
        BasicChart.prototype.addSerieChartAreaDropLocations = function (serie) {
            var maximumYAxis = 2;
            if (serie.name)
                if (this.scales.length < maximumYAxis) {
                    var chartArea = this.chart.getChartArea();
                    $(this.cssParentContentId).append('<div id="' + this.parentContentId + '_axisDropZone' + "_chartArea" + '" style="z-index: 5; position:absolute; width: ' + (chartArea.width) + 'px; height: ' + (chartArea.height) + 'px; left:' + (chartArea.x) + 'px; top:' + (chartArea.y) + 'px" class="dropLocationArea"></div>');
                }
        };
        /**
        * Returns the current drop location type (e.g. assign to scale, add new scale, invalid for drop)
        *
        * @param {*} currentTarget
        * @returns {DropLocationType}
        * @memberof BasicChart
        */
        BasicChart.prototype.getDropLocationType = function (currentTarget) {
            if (currentTarget.id.includes("_axisDropZoneScale")) {
                return ChartBase_1.DropLocationType.assignToScale;
            }
            if (currentTarget.id.includes("_axisDropZone_chartArea") && this.scales.length < 2) {
                return ChartBase_1.DropLocationType.addNewScale;
            }
            return ChartBase_1.DropLocationType.invalid;
        };
        /**
         * Highlight droppable areas if a valid signal is dragged over
         *
         * @param {*} currentTarget
         * @memberof BasicChart
         */
        BasicChart.prototype.updateDroppableAreas = function (currentTarget) {
            if (currentTarget.id.includes("_axisDropZone_chartArea") || currentTarget.id.includes("_refCursor_")) {
                var chartArea = document.getElementById(this.parentContentId + '_axisDropZone_chartArea');
                if (chartArea != undefined) {
                    chartArea.classList.add('draggedOver');
                }
                for (var i = 0; i < this.scales.length; i++) {
                    var axisArea = document.getElementById(this.parentContentId + '_axisDropZone' + this.scales[i].id);
                    if (axisArea != undefined) {
                        axisArea.classList.remove('draggedOver');
                    }
                }
            }
            else if (currentTarget.id.includes("_axisDropZoneScale")) {
                for (var i = 0; i < this.scales.length; i++) {
                    if (currentTarget.id.includes(this.scales[i].id)) {
                        var axisArea = document.getElementById(this.parentContentId + '_axisDropZone' + this.scales[i].id);
                        if (axisArea != undefined) {
                            axisArea.classList.add('draggedOver');
                        }
                    }
                    else {
                        var axisArea = document.getElementById(this.parentContentId + '_axisDropZone' + this.scales[i].id);
                        if (axisArea != undefined) {
                            axisArea.classList.remove('draggedOver');
                        }
                    }
                }
                var chartArea = document.getElementById(this.parentContentId + '_axisDropZone_chartArea');
                if (chartArea != undefined) {
                    chartArea.classList.remove('draggedOver');
                }
            }
        };
        ;
        /**
         * Reset highlighted areas
         *
         * @memberof BasicChart
         */
        BasicChart.prototype.resetHighlighting = function () {
            var chartArea = document.getElementById(this.parentContentId + '_axisDropZone_chartArea');
            if (chartArea != undefined) {
                chartArea.classList.remove('draggedOver');
            }
            for (var i = 0; i < this.scales.length; i++) {
                var axisArea = document.getElementById(this.parentContentId + '_axisDropZone' + this.scales[i].id);
                if (axisArea != undefined) {
                    axisArea.classList.remove('draggedOver');
                }
            }
        };
        BasicChart.prototype.initializeCursorHandlers = function () { };
        return BasicChart;
    }(ChartBase_1.ChartBase));
    exports.BasicChart = BasicChart;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzaWNDaGFydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jaGFydFZpZXdXaWRnZXQvQmFzaWNDaGFydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBYUE7UUFBa0MsOEJBQVM7UUFJdkMsb0JBQVksWUFBbUMsRUFBRSxJQUFZLEVBQUUsS0FBWTttQkFDdkUsa0JBQU0sWUFBWSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUM7UUFDcEMsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSSw0QkFBTyxHQUFkO1lBQ0ksSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUM3QyxpQkFBTSxPQUFPLFdBQUUsQ0FBQztRQUNwQixDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ08sb0NBQWUsR0FBekIsVUFBMEIsWUFBbUM7WUFDekQsSUFBSSxZQUFZLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRTtnQkFDbkMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3JEO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLHlDQUFvQixHQUE1QixVQUE2QixZQUFtQztZQUM1RCxJQUFJLFlBQVksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFO2dCQUNuQyxZQUFZLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDeEQ7UUFDTCxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSSwrQkFBVSxHQUFqQixVQUFrQixXQUFtQjtZQUNqQyxpQkFBTSxVQUFVLFlBQUMsV0FBVyxDQUFDLENBQUM7WUFFOUIsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7WUFDaEMsSUFBSSxDQUFDLDhCQUE4QixFQUFFLENBQUM7WUFDdEMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUks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Q0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDOUM7WUFDRCxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQ3ZDLElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRSxlQUFlLEdBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDakcsSUFBRyxRQUFRLElBQUksU0FBUyxFQUFFO29CQUN0QixRQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztpQkFDN0M7YUFDSjtRQUNMLENBQUM7UUFHUyw2Q0FBd0IsR0FBbEMsY0FBdUMsQ0FBQztRQUU1QyxpQkFBQztJQUFELENBQUMsQUFyWEQsQ0FBa0MscUJBQVMsR0FxWDFDO0lBRVEsZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFydEJhc2UsIERyb3BMb2NhdGlvblR5cGUgfSBmcm9tIFwiLi9DaGFydEJhc2VcIjtcclxuaW1wb3J0IHsgQ2hhcnRWaWV3Q2hhcnRNYW5hZ2VyIH0gZnJvbSBcIi4vY2hhcnRWaWV3Q2hhcnRNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNlcmllc0hlbHBlciB9IGZyb20gXCIuLi8uLi9jb21tb24vc2VyaWVzSGVscGVyXCI7XHJcbmltcG9ydCB7IEJhc2VTZXJpZXMgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9iYXNlU2VyaWVzXCI7XHJcbmltcG9ydCB7IFNjYWxlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvc2NhbGVcIjtcclxuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb21tb24vaW50ZXJmYWNlcy9wb2ludEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJQ2hhcnRNYW5hZ2VyQ2hhcnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9pbnRlcmZhY2VzL2NoYXJ0TWFuYWdlckNoYXJ0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEF4aXNQb3NpdGlvbiB9IGZyb20gXCIuLi8uLi9jb3JlL2ludGVyZmFjZXMvY29tcG9uZW50cy91aS9jaGFydC9jaGFydEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDaGFydEV4dGVuc2lvbnMgfSBmcm9tIFwiLi9jaGFydEV4dGVuc2lvbnMvY2hhcnRFeHRlbnNpb25zXCI7XHJcbmltcG9ydCB7IEN1cnNvckhhbmRsZXIgfSBmcm9tIFwiLi9jdXJzb3IvQ3Vyc29ySGFuZGxlclwiO1xyXG5pbXBvcnQgeyBDaGFydFZpZXdTZXJpZSB9IGZyb20gXCIuL2NoYXJ0Vmlld1NlcmllXCI7XHJcbmltcG9ydCB7IEN1cnNvclN0YXRlcyB9IGZyb20gXCIuLi9jb21tb24vc3RhdGVzL2N1cnNvclN0YXRlc1wiO1xyXG5cclxuYWJzdHJhY3QgY2xhc3MgQmFzaWNDaGFydCBleHRlbmRzIENoYXJ0QmFzZXtcclxuICAgIFxyXG4gICAgYWJzdHJhY3QgY3Vyc29ySGFuZGxlcjogQ3Vyc29ySGFuZGxlcnx1bmRlZmluZWQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY2hhcnRNYW5hZ2VyOiBDaGFydFZpZXdDaGFydE1hbmFnZXIsIG5hbWU6IHN0cmluZywgc2NhbGU6IFNjYWxlKSB7XHJcbiAgICAgICAgc3VwZXIoY2hhcnRNYW5hZ2VyLCBuYW1lLCBzY2FsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFcmFkaWNhdGUhXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJhc2ljQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRpc3Bvc2UoKXtcclxuICAgICAgICB0aGlzLnJlbW92ZVdpZGdldEZyb21WaWV3KHRoaXMuY2hhcnRNYW5hZ2VyKTtcclxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBwYXJhbSB7Q2hhcnRWaWV3Q2hhcnRNYW5hZ2VyfSBjaGFydE1hbmFnZXJcclxuICAgICAqIEBtZW1iZXJvZiBCYXNpY0NoYXJ0XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBhZGRXaWRnZXRUb1ZpZXcoY2hhcnRNYW5hZ2VyOiBDaGFydFZpZXdDaGFydE1hbmFnZXIpIHtcclxuICAgICAgICBpZiAoY2hhcnRNYW5hZ2VyLmNoYXJ0Vmlld1dpZGdldC52aWV3KSB7XHJcbiAgICAgICAgICAgIGNoYXJ0TWFuYWdlci5jaGFydFZpZXdXaWRnZXQudmlldy5hZGRXaWRnZXQodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtDaGFydFZpZXdDaGFydE1hbmFnZXJ9IGNoYXJ0TWFuYWdlclxyXG4gICAgICogQG1lbWJlcm9mIEJhc2ljQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZW1vdmVXaWRnZXRGcm9tVmlldyhjaGFydE1hbmFnZXI6IENoYXJ0Vmlld0NoYXJ0TWFuYWdlcikge1xyXG4gICAgICAgIGlmIChjaGFydE1hbmFnZXIuY2hhcnRWaWV3V2lkZ2V0LnZpZXcpIHtcclxuICAgICAgICAgICAgY2hhcnRNYW5hZ2VyLmNoYXJ0Vmlld1dpZGdldC52aWV3LnJlbW92ZVdpZGdldCh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb250YWluZXJJZFxyXG4gICAgICogQG1lbWJlcm9mIEJhc2ljQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGluaXRpYWxpemUoY29udGFpbmVySWQ6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemUoY29udGFpbmVySWQpO1xyXG5cclxuICAgICAgICB0aGlzLmluaXRpYWxpemVDdXJzb3JIYW5kbGVycygpO1xyXG4gICAgICAgIHRoaXMuc2V0QXZhaWxhYmxlU2VyaWVzQXNEYXRhU291cmNlKCk7XHJcbiAgICAgICAgdGhpcy5hdHRhY2hDaGFydEV4dGVuc2lvbnModGhpcy5jaGFydEluc3RhbmNlKTtcclxuICAgICAgICB0aGlzLm9ic2VydmVTdGF0ZXMoKTtcclxuXHJcbiAgICAgICAgbGV0IGNoYXJ0QXJlYSA9IHRoaXMuY2hhcnQuZ2V0Q2hhcnRBcmVhKCk7XHJcbiAgICAgICAgdGhpcy54QXhpc1dpZHRoID0gIGNoYXJ0QXJlYS53aWR0aDsgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWluaXRpYWxpemVzIHRoZSBjaGFydFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCYXNpY0NoYXJ0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWluaXRpYWxpemUoKSB7XHJcbiAgICAgICAgJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCkuZW1wdHkoKTtcclxuICAgICAgICBzdXBlci5pbml0aWFsaXplKHRoaXMucGFyZW50Q29udGVudElkKTsgXHJcbiAgICAgICAgdGhpcy5zZXRBdmFpbGFibGVTZXJpZXNBc0RhdGFTb3VyY2UoKTtcclxuICAgICAgICB0aGlzLmF0dGFjaENoYXJ0RXh0ZW5zaW9ucyh0aGlzLmNoYXJ0SW5zdGFuY2UpO1xyXG5cclxuICAgICAgICBsZXQgY2hhcnRBcmVhID0gdGhpcy5jaGFydC5nZXRDaGFydEFyZWEoKTtcclxuICAgICAgICB0aGlzLnhBeGlzV2lkdGggPSAgY2hhcnRBcmVhLndpZHRoO1xyXG5cclxuICAgICAgICB0aGlzLmN1cnNvckhhbmRsZXIgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5pbml0aWFsaXplQ3Vyc29ySGFuZGxlcnMoKTsgXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXR0YWNoZXMgYSBleHRlbnNpb24gaW5zdGFuY2VcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBjaGFydEluc3RhbmNlXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBCYXNpY0NoYXJ0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXR0YWNoQ2hhcnRFeHRlbnNpb25zKGNoYXJ0SW5zdGFuY2U6IGFueSk6IGFueSB7XHJcblxyXG4gICAgICAgIC8vIGluamVjdCBhbiBleHRlbnNpb24gcHJvdmlkZXJcclxuICAgICAgICBsZXQgYmFzaWNDaGFydEV4dGVuc2lvbnMgPSBuZXcgQ2hhcnRFeHRlbnNpb25zKHRoaXMpO1xyXG4gICAgICAgIC8vIHVzZSBhbiB5dC9mZnQgb3B0aW1pemF0aW9uIGFsZ29yaXRobVxyXG4gICAgICAgIGJhc2ljQ2hhcnRFeHRlbnNpb25zLmNoYXJ0RGF0YU9wdGltaXplci50cmltU2VyaWVzRm9yQ2hhcnRCb3VuZHMgPSBiYXNpY0NoYXJ0RXh0ZW5zaW9ucy5jaGFydERhdGFPcHRpbWl6ZXIudHJpbVNlcmllc0ZvckNoYXJ0Qm91bmRzWXQ7XHJcbiAgICAgICAgLy8gc2V0IHRoZSBjaGFydCBleHRlbnNpb25zXHJcbiAgICAgICAgY2hhcnRJbnN0YW5jZS5jaGFydEV4dGVuc2lvbnMgPSBiYXNpY0NoYXJ0RXh0ZW5zaW9ucztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlbmQgZGF0YSBvZiB0aGUgc2VyaWVzIHRvIHRoZSBjaGFydCBpbnN0YW5jZVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCYXNpY0NoYXJ0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRBdmFpbGFibGVTZXJpZXNBc0RhdGFTb3VyY2UoKSB7XHJcbiAgICAgICAgbGV0IHRyYWNlRGF0YVNlcmllcyA9IG5ldyBBcnJheSgpO1xyXG4gICAgIFxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnNjYWxlcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCB0aGlzLnNjYWxlc1tpXS5jaGlsZHMubGVuZ3RoOyBqKyspe1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5zY2FsZXNbaV0uY2hpbGRzW2pdLnJhd1BvaW50c1ZhbGlkKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZWZmZWN0aXZlU2VyaWUgPSB0aGlzLmNoYXJ0SW5zdGFuY2UuY2hhcnRFeHRlbnNpb25zID8gdGhpcy5jaGFydEluc3RhbmNlLmNoYXJ0RXh0ZW5zaW9ucy5jaGFydERhdGFPcHRpbWl6ZXIuYXR0YWNoU2VyaWVzKHRoaXMuc2NhbGVzW2ldLmNoaWxkc1tqXSkgOiB0aGlzLnNjYWxlc1tpXS5jaGlsZHNbal07XHJcbiAgICAgICAgICAgICAgICAgICAgdHJhY2VEYXRhU2VyaWVzLnB1c2godGhpcy5jcmVhdGVUcmFjZURhdGFTZXJpZXMoZWZmZWN0aXZlU2VyaWUsIHRoaXMuc2NhbGVzW2ldLmlkKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBkYXRhU2VyaWVzID0ge3NlcmllczogdHJhY2VEYXRhU2VyaWVzIH07XHJcbiAgICAgICAgJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCkuZWpDaGFydChkYXRhU2VyaWVzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBuZXcgeSBheGlzIGludG8gdGhlIGNoYXJ0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTY2FsZX0geUF4aXNcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3Bwb3NlZFBvc2l0aW9uXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29sb3JcclxuICAgICAqIEBtZW1iZXJvZiBCYXNpY0NoYXJ0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGRZU2NhbGUoc2NhbGU6IFNjYWxlLCBwb3NpdGlvbiA6IEF4aXNQb3NpdGlvbil7XHJcbiAgICBcdHRoaXMuY2hhcnQuYWRkWUF4aXMoc2NhbGUuaWQsIHNjYWxlLm1pbllWYWx1ZSwgc2NhbGUubWF4WVZhbHVlLCBwb3NpdGlvbik7XHJcbiAgICAgICAgLy9UT0RPOiBnZXQgYXhpcyB3aWR0aFxyXG4gICAgXHR0aGlzLnhBeGlzV2lkdGggPSB0aGlzLmNoYXJ0LmdldENoYXJ0QXJlYSgpLndpZHRoIC0gNzE7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuc2NhbGVzLmluZGV4T2Yoc2NhbGUpID09IC0xKXtcclxuICAgICAgICAgICAgdGhpcy5zY2FsZXMucHVzaChzY2FsZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTY2FsZX0geVNjYWxlXHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzaWNDaGFydFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVtb3ZlWVNjYWxlRnJvbUNoYXJ0KHlTY2FsZTogU2NhbGUpe1xyXG4gICAgICAgIHRoaXMuY2hhcnQucmVtb3ZlWUF4aXMoeVNjYWxlLmlkKTtcclxuICAgICAgICB0aGlzLmNoYXJ0LnJlZHJhdygpO1xyXG5cclxuICAgICAgICB0aGlzLnhBeGlzV2lkdGggPSB0aGlzLmNoYXJ0LmdldENoYXJ0QXJlYSgpLndpZHRoO1xyXG4gICAgICAgIGxldCBzY2FsZUluZGV4ID0gdGhpcy5zY2FsZXMuaW5kZXhPZih5U2NhbGUpO1xyXG4gICAgICAgIGlmIChzY2FsZUluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5zY2FsZXMuc3BsaWNlKHNjYWxlSW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSByZWZlcmVuY2VBeGlzXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbWluXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbWF4XHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzaWNDaGFydFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb25TeW5jaHJvbml6ZVNjYWxlUmFuZ2Uoc2NhbGUgOiBTY2FsZSwgbWluOm51bWJlciwgbWF4Om51bWJlcikge1xyXG4gICAgICAgIGxldCB5U2NhbGVzID0gdGhpcy5nZXRZU2NhbGVzKCk7XHJcbiAgICAgICAgZm9yKGxldCB5U2NhbGUgb2YgeVNjYWxlcyl7XHJcbiAgICAgICAgICAgIHlTY2FsZS5taW5YVmFsdWUgPSBtaW47XHJcbiAgICAgICAgICAgIHlTY2FsZS5tYXhYVmFsdWUgPSBtYXg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICBsZXQgYXhpcyA9IHRoaXMuY2hhcnQuZ2V0QXhpcyh0aGlzLnByaW1hcnlYQXhpc05hbWUpO1xyXG4gICAgICAgICBpZihheGlzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGF4aXMuc2V0QXhpc1JhbmdlKHttaW4sIG1heH0pO1xyXG4gICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByb3RlY3RlZCBnZXRUaW1lc3RhbXBJblNlcmllcyhwb2ludDogSVBvaW50LCBzZXJpZXMgOiBDaGFydFZpZXdTZXJpZVtdKSA6IG51bWJlcntcclxuXHJcbiAgICAgICAgLy8gZ2V0IHRoZSBwb2ludHMgb2YgdGhlIGF2YWlsYWJsZSBzZXJpZXNcclxuICAgICAgICAvLyBnZXQgdGhlIHRpbWVzdGFtcHMgc2VyaWVzIGZyb20gdGhlIHNpZ25hbCBzZXJpZXNcclxuICAgICAgICBsZXQgdGltZXN0YW1wU2VyaWVzO1xyXG4gICAgICAgIHRpbWVzdGFtcFNlcmllcz0gc2VyaWVzLm1hcCgoc2luZ2xlU2VyaWVzKT0+eyByZXR1cm4gc2luZ2xlU2VyaWVzLnNlcmllLnRpbWVzdGFtcHN9KTsgICAgICAgIFxyXG4gICAgICAgIGxldCBuZWFyZXN0UG9pbnQgPSBTZXJpZXNIZWxwZXIuZmluZE5lYXJlc3RWYWx1ZUZyb21Db2xsZWN0aW9uKHBvaW50LngsIHRpbWVzdGFtcFNlcmllcyk7XHJcblxyXG4gICAgICAgIHJldHVybiBuZWFyZXN0UG9pbnQ7XHJcbiAgICB9XHJcblxyXG4gXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgYSBjaGFydCBwb2ludCBmb3IgdGhlIHNwZWNpZmllZCB0aW1lc3RhbXBcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWVzdGFtcFxyXG4gICAgICogQHJldHVybnMge1BvaW50fVxyXG4gICAgICogQG1lbWJlcm9mIEJhc2ljQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldEN1cnNvclBvaW50KHRpbWVzdGFtcDogbnVtYmVyLHNlcmllc0luZGV4Om51bWJlcik6IElQb2ludCB7XHJcbiAgICAgICAgbGV0IGN1cnNvclBvaW50ID0gdGhpcy5zZXJpZXNbc2VyaWVzSW5kZXhdLnNlcmllLnByZXZpb3VzUG9pbnRGcm9tVGltZXN0YW1wKHRpbWVzdGFtcCk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnNvclBvaW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXhcclxuICAgICAqIEBtZW1iZXJvZiBYWUNoYXJ0XHJcbiAgICAgKi9cclxuICAgIC8vIHByb3RlY3RlZCByZW1vdmVDdXJzb3JzRnJvbUNoYXJ0IChpbmRleDogbnVtYmVyKSB7XHJcbiAgICAvLyAgICAgaWYgKGluZGV4ID4gLTEgJiYgdGhpcy5jdXJzb3JIYW5kbGVyIGluc3RhbmNlb2YgRkZUQ3Vyc29ySGFuZGxlcikge1xyXG4gICAgLy8gICAgICAgICB0aGlzLmN1cnNvckhhbmRsZXIuc2VyaWVDdXJzb3JzW2luZGV4XS5kZWxldGVDdXJzb3JzKCk7XHJcbiAgICAvLyAgICAgICAgIHRoaXMuY3Vyc29ySGFuZGxlci5zZXJpZUN1cnNvcnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBwYXJhbSB7eyB4OiBudW1iZXIsIHk6IG51bWJlcn19IGN1cnJQb3NcclxuICAgICAqIEBwYXJhbSB7eyB4OiBudW1iZXIsIHk6IG51bWJlcn19IGNsaWNrUG9zXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIEJhc2ljQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGFic0Rpc3RhbmNlVG9DdXJzb3IgKGN1cnJQb3M6IHsgeDogbnVtYmVyLCB5OiBudW1iZXJ9LCBcclxuICAgICAgICBjbGlja1BvczogeyB4OiBudW1iZXIsIHk6IG51bWJlcn0pOiBudW1iZXJ7XHJcblxyXG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoTWF0aC5wb3coY2xpY2tQb3MueCAtIGN1cnJQb3MueCwgMikpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZSByYW5nZSBpbiB4IGF4aXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyhudW1iZXIgfCB1bmRlZmluZWQpfSB4QXhpc1NlZ21lbnRNaW5WYWx1ZVxyXG4gICAgICogQHBhcmFtIHsobnVtYmVyIHwgdW5kZWZpbmVkKX0geEF4aXNTZWdtZW50TWF4VmFsdWVcclxuICAgICAqIEBtZW1iZXJvZiBCYXNpY0NoYXJ0XHJcbiAgICAgKi9cclxuICAgIC8qcHVibGljIHVwZGF0ZUNoYXJ0UmFuZ2VYKHhBeGlzU2VnbWVudE1pblZhbHVlOiBudW1iZXIgfCB1bmRlZmluZWQsIHhBeGlzU2VnbWVudE1heFZhbHVlOiBudW1iZXIgfCB1bmRlZmluZWQpIHtcclxuICAgICAgICBzdXBlci5zZXRSYW5nZVgoeEF4aXNTZWdtZW50TWluVmFsdWUhLCB4QXhpc1NlZ21lbnRNYXhWYWx1ZSEpO1xyXG4gICAgfSovXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgZHJvcCBsb2NhdGlvbnMgaW4gdGhlIGNoYXJ0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxCYXNlU2VyaWVzPn0gc2VyaWVcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzaWNDaGFydFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkU2VyaWVEcm9wTG9jYXRpb25zKHNlcmllOiBBcnJheTxCYXNlU2VyaWVzPiwgY2hhcnRNYW5hZ2VyQ2hhcnQ6IElDaGFydE1hbmFnZXJDaGFydCl7XHJcbiAgICAgICAgaWYgKGNoYXJ0TWFuYWdlckNoYXJ0LmNoaWxkc1swXS5kcm9wUG9zc2libGUpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRTZXJpZVlBeGlzRHJvcExvY2F0aW9ucyhzZXJpZVswXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjaGFydE1hbmFnZXJDaGFydC5kcm9wUG9zc2libGUpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRTZXJpZUNoYXJ0QXJlYURyb3BMb2NhdGlvbnMoc2VyaWVbMF0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBkcm9wIGxvY2F0aW9ucyB0byB0aGUgeSBheGlzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gZGF0YVxyXG4gICAgICogQG1lbWJlcm9mIEJhc2ljQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRTZXJpZVlBeGlzRHJvcExvY2F0aW9ucyhkYXRhOiBCYXNlU2VyaWVzKXtcclxuICAgICAgICBpZihkYXRhLm5hbWUpXHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVDaGFydERpbWVuc2lvbnMoKTtcclxuICAgICAgICBmb3IobGV0IGF4aXNCb3VuZCBvZiB0aGlzLmF4aXNCb3VuZHMpe1xyXG4gICAgICAgICAgICBsZXQgb2Zmc2V0V2lkdGggPSA0O1xyXG4gICAgICAgICAgICBsZXQgb2Zmc2V0TGVmdCA9IDI7XHJcbiAgICAgICAgICAgIGlmKGF4aXNCb3VuZC5heGlzLm9yaWVudGF0aW9uID09IFwidmVydGljYWxcIil7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKS5hcHBlbmQoJzxkaXYgaWQ9XCInK3RoaXMucGFyZW50Q29udGVudElkKydfYXhpc0Ryb3Bab25lJysgYXhpc0JvdW5kLmF4aXMubmFtZSsnXCIgc3R5bGU9XCJwb3NpdGlvbjphYnNvbHV0ZTsgd2lkdGg6ICcrIChheGlzQm91bmQud2lkdGgtb2Zmc2V0V2lkdGgpICsgJ3B4OyBoZWlnaHQ6ICcrIChheGlzQm91bmQuaGVpZ2h0KSArJ3B4OyBsZWZ0OicrKGF4aXNCb3VuZC54ICsgb2Zmc2V0TGVmdCkrJ3B4OyB0b3A6JysoYXhpc0JvdW5kLnkpKydweFwiIGNsYXNzPVwiZHJvcExvY2F0aW9uQXJlYVwiPjwvZGl2PicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIGRyb3AgbG9jYXRpb25zIGluIHRoZSBjaGFydCBhcmVhXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVcclxuICAgICAqIEBtZW1iZXJvZiBCYXNpY0NoYXJ0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkU2VyaWVDaGFydEFyZWFEcm9wTG9jYXRpb25zKHNlcmllOiBCYXNlU2VyaWVzKXtcclxuICAgICAgICBjb25zdCBtYXhpbXVtWUF4aXMgPSAyO1xyXG4gICAgICAgIGlmKHNlcmllLm5hbWUpXHJcbiAgICAgIFx0aWYodGhpcy5zY2FsZXMubGVuZ3RoIDwgbWF4aW11bVlBeGlzKXtcclxuICAgICAgICAgICAgbGV0IGNoYXJ0QXJlYSA9IHRoaXMuY2hhcnQuZ2V0Q2hhcnRBcmVhKCk7XHJcbiAgICAgICAgICAgICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpLmFwcGVuZCgnPGRpdiBpZD1cIicrdGhpcy5wYXJlbnRDb250ZW50SWQrJ19heGlzRHJvcFpvbmUnK1wiX2NoYXJ0QXJlYVwiKydcIiBzdHlsZT1cInotaW5kZXg6IDU7IHBvc2l0aW9uOmFic29sdXRlOyB3aWR0aDogJysgKGNoYXJ0QXJlYS53aWR0aCkgKyAncHg7IGhlaWdodDogJysgKGNoYXJ0QXJlYS5oZWlnaHQpICsncHg7IGxlZnQ6JysoY2hhcnRBcmVhLngpKydweDsgdG9wOicrKGNoYXJ0QXJlYS55KSsncHhcIiBjbGFzcz1cImRyb3BMb2NhdGlvbkFyZWFcIj48L2Rpdj4nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgY3VycmVudCBkcm9wIGxvY2F0aW9uIHR5cGUgKGUuZy4gYXNzaWduIHRvIHNjYWxlLCBhZGQgbmV3IHNjYWxlLCBpbnZhbGlkIGZvciBkcm9wKVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gY3VycmVudFRhcmdldFxyXG4gICAgICogQHJldHVybnMge0Ryb3BMb2NhdGlvblR5cGV9XHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzaWNDaGFydFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0RHJvcExvY2F0aW9uVHlwZShjdXJyZW50VGFyZ2V0OiBhbnkpOiBEcm9wTG9jYXRpb25UeXBle1xyXG4gICAgICAgIGlmKGN1cnJlbnRUYXJnZXQuaWQuaW5jbHVkZXMoXCJfYXhpc0Ryb3Bab25lU2NhbGVcIikpe1xyXG4gICAgICAgICAgICByZXR1cm4gRHJvcExvY2F0aW9uVHlwZS5hc3NpZ25Ub1NjYWxlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihjdXJyZW50VGFyZ2V0LmlkLmluY2x1ZGVzKFwiX2F4aXNEcm9wWm9uZV9jaGFydEFyZWFcIikgJiYgdGhpcy5zY2FsZXMubGVuZ3RoIDwgMil7XHJcbiAgICAgICAgICAgIHJldHVybiBEcm9wTG9jYXRpb25UeXBlLmFkZE5ld1NjYWxlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gRHJvcExvY2F0aW9uVHlwZS5pbnZhbGlkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGlnaGxpZ2h0IGRyb3BwYWJsZSBhcmVhcyBpZiBhIHZhbGlkIHNpZ25hbCBpcyBkcmFnZ2VkIG92ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IGN1cnJlbnRUYXJnZXRcclxuICAgICAqIEBtZW1iZXJvZiBCYXNpY0NoYXJ0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB1cGRhdGVEcm9wcGFibGVBcmVhcyhjdXJyZW50VGFyZ2V0KSB7XHJcbiAgICAgICAgaWYoY3VycmVudFRhcmdldC5pZC5pbmNsdWRlcyhcIl9heGlzRHJvcFpvbmVfY2hhcnRBcmVhXCIpIHx8IGN1cnJlbnRUYXJnZXQuaWQuaW5jbHVkZXMoXCJfcmVmQ3Vyc29yX1wiKSl7XHJcbiAgICAgICAgICAgIGxldCBjaGFydEFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnBhcmVudENvbnRlbnRJZCArJ19heGlzRHJvcFpvbmVfY2hhcnRBcmVhJyk7XHJcbiAgICAgICAgICAgIGlmKGNoYXJ0QXJlYSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGNoYXJ0QXJlYSEuY2xhc3NMaXN0LmFkZCgnZHJhZ2dlZE92ZXInKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5zY2FsZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IGF4aXNBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5wYXJlbnRDb250ZW50SWQgKydfYXhpc0Ryb3Bab25lJysgdGhpcy5zY2FsZXNbaV0uaWQpO1xyXG4gICAgICAgICAgICAgICAgaWYoYXhpc0FyZWEgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXhpc0FyZWEhLmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWdnZWRPdmVyJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY3VycmVudFRhcmdldC5pZC5pbmNsdWRlcyhcIl9heGlzRHJvcFpvbmVTY2FsZVwiKSl7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zY2FsZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgaWYoY3VycmVudFRhcmdldC5pZC5pbmNsdWRlcyh0aGlzLnNjYWxlc1tpXS5pZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYXhpc0FyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnBhcmVudENvbnRlbnRJZCsnX2F4aXNEcm9wWm9uZScrIHRoaXMuc2NhbGVzW2ldLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihheGlzQXJlYSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXhpc0FyZWEhLmNsYXNzTGlzdC5hZGQoJ2RyYWdnZWRPdmVyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGF4aXNBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5wYXJlbnRDb250ZW50SWQrJ19heGlzRHJvcFpvbmUnKyB0aGlzLnNjYWxlc1tpXS5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYXhpc0FyZWEgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF4aXNBcmVhIS5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnZ2VkT3ZlcicpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGNoYXJ0QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMucGFyZW50Q29udGVudElkICsnX2F4aXNEcm9wWm9uZV9jaGFydEFyZWEnKTtcclxuICAgICAgICAgICAgaWYoY2hhcnRBcmVhICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgY2hhcnRBcmVhIS5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnZ2VkT3ZlcicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlc2V0IGhpZ2hsaWdodGVkIGFyZWFzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJhc2ljQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlc2V0SGlnaGxpZ2h0aW5nKCl7XHJcbiAgICAgICAgbGV0IGNoYXJ0QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMucGFyZW50Q29udGVudElkICsnX2F4aXNEcm9wWm9uZV9jaGFydEFyZWEnKTtcclxuICAgICAgICBpZihjaGFydEFyZWEgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGNoYXJ0QXJlYSEuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZ2dlZE92ZXInKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMuc2NhbGVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGF4aXNBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5wYXJlbnRDb250ZW50SWQgKydfYXhpc0Ryb3Bab25lJysgdGhpcy5zY2FsZXNbaV0uaWQpO1xyXG4gICAgICAgICAgICBpZihheGlzQXJlYSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGF4aXNBcmVhIS5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnZ2VkT3ZlcicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCByZW1vdmVTZXJpZUZyb21DaGFydChzZXJpZTogQmFzZVNlcmllc3xDaGFydFZpZXdTZXJpZSk7XHJcbiAgICBwcm90ZWN0ZWQgaW5pdGlhbGl6ZUN1cnNvckhhbmRsZXJzKCkgeyB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgeyBCYXNpY0NoYXJ0IH07XHJcblxyXG4iXX0=