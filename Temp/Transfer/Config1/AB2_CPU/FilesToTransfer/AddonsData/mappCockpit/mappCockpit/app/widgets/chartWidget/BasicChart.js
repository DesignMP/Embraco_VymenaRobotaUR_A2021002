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
        function BasicChart(parentView, name, scale) {
            return _super.call(this, parentView, name, scale) || this;
        }
        /**
         * dispose chart
         *
         * @memberof BasicChart
         */
        BasicChart.prototype.dispose = function () {
            this.removeWidgetFromView(this.parentView);
            _super.prototype.dispose.call(this);
        };
        /**
         *
         *
         * @protected
         * @param {ChartViewChartManager} chartManager
         * @memberof BasicChart
         */
        BasicChart.prototype.addWidgetToView = function (parentView) {
            if (parentView) {
                parentView.addWidget(this);
            }
        };
        /**
         *
         *
         * @private
         * @param {ChartViewChartManager} chartManager
         * @memberof BasicChart
         */
        BasicChart.prototype.removeWidgetFromView = function (parentView) {
            if (parentView) {
                parentView.removeWidget(this);
            }
        };
        BasicChart.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            this.initializeCursorHandlers();
            this.setAvailableSeriesAsDataSource();
            this.attachChartExtensions(this.chartInstance);
            this.xAxisWidth = this.chart.getXAxisWidth();
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
            this.xAxisWidth = this.chart.getXAxisWidth();
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
            var newAxisWidth = 71;
            this.chart.addYAxis(scale.id, scale.minYValue, scale.maxYValue, position);
            this.xAxisWidth = this.chart.getXAxisWidth() - newAxisWidth;
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
            this.xAxisWidth = this.chart.getXAxisWidth();
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
        BasicChart.prototype.getTimestampInSeries = function (point, availableSeries) {
            // get the points of the available series
            // get the timestamps series from the signal series
            var timestampSeries;
            timestampSeries = availableSeries.map(function (singleSeries) { return singleSeries.serie.timestamps; });
            var nearestPoint = seriesHelper_1.SeriesHelper.findNearestValueFromCollection(point.x, timestampSeries);
            return nearestPoint;
        };
        /**
         * Gets a chart point for the specified timestamp
         *
         * @private
         * @param {number} leadCursorTimeStamp
         * @returns {Point}
         * @memberof BasicChart
         */
        BasicChart.prototype.getCursorPoint = function (timestamp, series, seriesIndex) {
            var cursorPoint = series[seriesIndex].serie.previousPointFromTimestamp(timestamp);
            return { timestamp: cursorPoint.x, x: cursorPoint.x, y: cursorPoint.y };
        };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzaWNDaGFydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jaGFydFdpZGdldC9CYXNpY0NoYXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFhQTtRQUFrQyw4QkFBUztRQUl2QyxvQkFBWSxVQUFpQixFQUFFLElBQVksRUFBRSxLQUFZO21CQUNyRCxrQkFBTSxVQUFVLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQztRQUNsQyxDQUFDO1FBRUQ7Ozs7V0FJRztRQUNJLDRCQUFPLEdBQWQ7WUFDSSxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzNDLGlCQUFNLE9BQU8sV0FBRSxDQUFDO1FBQ3BCLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDTyxvQ0FBZSxHQUF6QixVQUEwQixVQUFrQjtZQUN4QyxJQUFJLFVBQVUsRUFBRTtnQkFDWixVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzlCO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLHlDQUFvQixHQUE1QixVQUE2QixVQUFpQjtZQUMxQyxJQUFJLFVBQVUsRUFBRTtnQkFDWixVQUFVLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2pDO1FBQ0wsQ0FBQztRQUVELGdDQUFXLEdBQVg7WUFDSSxpQkFBTSxXQUFXLFdBQUUsQ0FBQztZQUVwQixJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztZQUNoQyxJQUFJLENBQUMsOEJBQThCLEVBQUUsQ0FBQztZQUN0QyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBRS9DLElBQUksQ0FBQyxVQUFVLEdBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNsRCxDQUFDO1FBRUQ7Ozs7V0FJRztRQUNJLGlDQUFZLEdBQW5CO1lB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QUFRLElBQUksU0FBUyxFQUFFO29CQUN0QixRQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztpQkFDN0M7YUFDSjtRQUNMLENBQUM7UUFFUyw2Q0FBd0IsR0FBbEMsY0FBdUMsQ0FBQztRQUU1QyxpQkFBQztJQUFELENBQUMsQUFsVkQsQ0FBa0MscUJBQVMsR0FrVjFDO0lBRVEsZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFydEJhc2UsIERyb3BMb2NhdGlvblR5cGUsIFRpbWVQb2ludCB9IGZyb20gXCIuL0NoYXJ0QmFzZVwiO1xyXG5pbXBvcnQgeyBTZXJpZXNIZWxwZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3Nlcmllc0hlbHBlclwiO1xyXG5pbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvYmFzZVNlcmllc1wiO1xyXG5pbXBvcnQgeyBTY2FsZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL3NjYWxlXCI7XHJcbmltcG9ydCB7IElQb2ludCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSUNoYXJ0TWFuYWdlckNoYXJ0IH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvaW50ZXJmYWNlcy9jaGFydE1hbmFnZXJDaGFydEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBBeGlzUG9zaXRpb24gfSBmcm9tIFwiLi4vLi4vY29yZS9pbnRlcmZhY2VzL2NvbXBvbmVudHMvdWkvY2hhcnQvY2hhcnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ2hhcnRFeHRlbnNpb25zIH0gZnJvbSBcIi4vY2hhcnRFeHRlbnNpb25zL2NoYXJ0RXh0ZW5zaW9uc1wiO1xyXG5pbXBvcnQgeyBDdXJzb3JIYW5kbGVyIH0gZnJvbSBcIi4vY3Vyc29yL0N1cnNvckhhbmRsZXJcIjtcclxuaW1wb3J0IHsgQ2hhcnRWaWV3U2VyaWUgfSBmcm9tIFwiLi9jaGFydFZpZXdTZXJpZVwiO1xyXG5pbXBvcnQgeyBJVmlldyB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy92aWV3SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IENoYXJ0Vmlld0NoYXJ0TWFuYWdlciB9IGZyb20gXCIuLi9jaGFydFZpZXdXaWRnZXQvY2hhcnRWaWV3Q2hhcnRNYW5hZ2VyXCI7XHJcblxyXG5hYnN0cmFjdCBjbGFzcyBCYXNpY0NoYXJ0IGV4dGVuZHMgQ2hhcnRCYXNle1xyXG4gICAgXHJcbiAgICBhYnN0cmFjdCBjdXJzb3JIYW5kbGVyOiBDdXJzb3JIYW5kbGVyfHVuZGVmaW5lZDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRWaWV3OiBJVmlldywgbmFtZTogc3RyaW5nLCBzY2FsZTogU2NhbGUpIHtcclxuICAgICAgICBzdXBlcihwYXJlbnRWaWV3LCBuYW1lLCBzY2FsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBkaXNwb3NlIGNoYXJ0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJhc2ljQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRpc3Bvc2UoKXtcclxuICAgICAgICB0aGlzLnJlbW92ZVdpZGdldEZyb21WaWV3KHRoaXMucGFyZW50Vmlldyk7XHJcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcGFyYW0ge0NoYXJ0Vmlld0NoYXJ0TWFuYWdlcn0gY2hhcnRNYW5hZ2VyXHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzaWNDaGFydFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgYWRkV2lkZ2V0VG9WaWV3KHBhcmVudFZpZXcgOiBJVmlldykge1xyXG4gICAgICAgIGlmIChwYXJlbnRWaWV3KSB7XHJcbiAgICAgICAgICAgIHBhcmVudFZpZXcuYWRkV2lkZ2V0KHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Q2hhcnRWaWV3Q2hhcnRNYW5hZ2VyfSBjaGFydE1hbmFnZXJcclxuICAgICAqIEBtZW1iZXJvZiBCYXNpY0NoYXJ0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVtb3ZlV2lkZ2V0RnJvbVZpZXcocGFyZW50VmlldzogSVZpZXcpIHtcclxuICAgICAgICBpZiAocGFyZW50Vmlldykge1xyXG4gICAgICAgICAgICBwYXJlbnRWaWV3LnJlbW92ZVdpZGdldCh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZWQoKXtcclxuICAgICAgICBzdXBlci5pbml0aWFsaXplZCgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZUN1cnNvckhhbmRsZXJzKCk7XHJcbiAgICAgICAgdGhpcy5zZXRBdmFpbGFibGVTZXJpZXNBc0RhdGFTb3VyY2UoKTtcclxuICAgICAgICB0aGlzLmF0dGFjaENoYXJ0RXh0ZW5zaW9ucyh0aGlzLmNoYXJ0SW5zdGFuY2UpO1xyXG5cclxuICAgICAgICB0aGlzLnhBeGlzV2lkdGggPSAgdGhpcy5jaGFydC5nZXRYQXhpc1dpZHRoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWluaXRpYWxpemVzIHRoZSBjaGFydFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCYXNpY0NoYXJ0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWluaXRpYWxpemUoKSB7XHJcbiAgICAgICAgJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCkuZW1wdHkoKTtcclxuICAgICAgICBzdXBlci5pbml0aWFsaXplKHRoaXMucGFyZW50Q29udGVudElkKTsgXHJcbiAgICAgICAgdGhpcy5zZXRBdmFpbGFibGVTZXJpZXNBc0RhdGFTb3VyY2UoKTtcclxuICAgICAgICB0aGlzLmF0dGFjaENoYXJ0RXh0ZW5zaW9ucyh0aGlzLmNoYXJ0SW5zdGFuY2UpO1xyXG5cclxuICAgICAgICB0aGlzLnhBeGlzV2lkdGggPSAgdGhpcy5jaGFydC5nZXRYQXhpc1dpZHRoKCk7XHJcblxyXG4gICAgICAgIHRoaXMuY3Vyc29ySGFuZGxlciA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLmluaXRpYWxpemVDdXJzb3JIYW5kbGVycygpOyBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEF0dGFjaGVzIGEgZXh0ZW5zaW9uIGluc3RhbmNlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gY2hhcnRJbnN0YW5jZVxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzaWNDaGFydFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGF0dGFjaENoYXJ0RXh0ZW5zaW9ucyhjaGFydEluc3RhbmNlOiBhbnkpOiBhbnkge1xyXG5cclxuICAgICAgICAvLyBpbmplY3QgYW4gZXh0ZW5zaW9uIHByb3ZpZGVyXHJcbiAgICAgICAgbGV0IGJhc2ljQ2hhcnRFeHRlbnNpb25zID0gbmV3IENoYXJ0RXh0ZW5zaW9ucyh0aGlzKTtcclxuICAgICAgICAvLyB1c2UgYW4geXQvZmZ0IG9wdGltaXphdGlvbiBhbGdvcml0aG1cclxuICAgICAgICBiYXNpY0NoYXJ0RXh0ZW5zaW9ucy5jaGFydERhdGFPcHRpbWl6ZXIudHJpbVNlcmllc0ZvckNoYXJ0Qm91bmRzID0gYmFzaWNDaGFydEV4dGVuc2lvbnMuY2hhcnREYXRhT3B0aW1pemVyLnRyaW1TZXJpZXNGb3JDaGFydEJvdW5kc1l0O1xyXG4gICAgICAgIC8vIHNldCB0aGUgY2hhcnQgZXh0ZW5zaW9uc1xyXG4gICAgICAgIGNoYXJ0SW5zdGFuY2UuY2hhcnRFeHRlbnNpb25zID0gYmFzaWNDaGFydEV4dGVuc2lvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZW5kIGRhdGEgb2YgdGhlIHNlcmllcyB0byB0aGUgY2hhcnQgaW5zdGFuY2VcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzaWNDaGFydFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0QXZhaWxhYmxlU2VyaWVzQXNEYXRhU291cmNlKCkge1xyXG4gICAgICAgIGxldCB0cmFjZURhdGFTZXJpZXMgPSBuZXcgQXJyYXkoKTtcclxuICAgICBcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5zY2FsZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgdGhpcy5zY2FsZXNbaV0uY2hpbGRzLmxlbmd0aDsgaisrKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuc2NhbGVzW2ldLmNoaWxkc1tqXS5yYXdQb2ludHNWYWxpZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVmZmVjdGl2ZVNlcmllID0gdGhpcy5jaGFydEluc3RhbmNlLmNoYXJ0RXh0ZW5zaW9ucyA/IHRoaXMuY2hhcnRJbnN0YW5jZS5jaGFydEV4dGVuc2lvbnMuY2hhcnREYXRhT3B0aW1pemVyLmF0dGFjaFNlcmllcyh0aGlzLnNjYWxlc1tpXS5jaGlsZHNbal0pIDogdGhpcy5zY2FsZXNbaV0uY2hpbGRzW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRyYWNlRGF0YVNlcmllcy5wdXNoKHRoaXMuY3JlYXRlVHJhY2VEYXRhU2VyaWVzKGVmZmVjdGl2ZVNlcmllLCB0aGlzLnNjYWxlc1tpXS5pZCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZGF0YVNlcmllcyA9IHtzZXJpZXM6IHRyYWNlRGF0YVNlcmllcyB9O1xyXG4gICAgICAgICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpLmVqQ2hhcnQoZGF0YVNlcmllcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgbmV3IHkgYXhpcyBpbnRvIHRoZSBjaGFydFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U2NhbGV9IHlBeGlzXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wcG9zZWRQb3NpdGlvblxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbG9yXHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzaWNDaGFydFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkWVNjYWxlKHNjYWxlOiBTY2FsZSwgcG9zaXRpb24gOiBBeGlzUG9zaXRpb24pe1xyXG4gICAgICAgIGNvbnN0IG5ld0F4aXNXaWR0aCA9IDcxO1xyXG4gICAgXHR0aGlzLmNoYXJ0LmFkZFlBeGlzKHNjYWxlLmlkLCBzY2FsZS5taW5ZVmFsdWUsIHNjYWxlLm1heFlWYWx1ZSwgcG9zaXRpb24pO1xyXG5cclxuICAgIFx0dGhpcy54QXhpc1dpZHRoID0gdGhpcy5jaGFydC5nZXRYQXhpc1dpZHRoKCkgLSBuZXdBeGlzV2lkdGg7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuc2NhbGVzLmluZGV4T2Yoc2NhbGUpID09IC0xKXtcclxuICAgICAgICAgICAgdGhpcy5zY2FsZXMucHVzaChzY2FsZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTY2FsZX0geVNjYWxlXHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzaWNDaGFydFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVtb3ZlWVNjYWxlRnJvbUNoYXJ0KHlTY2FsZTogU2NhbGUpe1xyXG4gICAgICAgIHRoaXMuY2hhcnQucmVtb3ZlWUF4aXMoeVNjYWxlLmlkKTtcclxuICAgICAgICB0aGlzLmNoYXJ0LnJlZHJhdygpO1xyXG5cclxuICAgICAgICB0aGlzLnhBeGlzV2lkdGggPSB0aGlzLmNoYXJ0LmdldFhBeGlzV2lkdGgoKTtcclxuICAgICAgICBsZXQgc2NhbGVJbmRleCA9IHRoaXMuc2NhbGVzLmluZGV4T2YoeVNjYWxlKTtcclxuICAgICAgICBpZiAoc2NhbGVJbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NhbGVzLnNwbGljZShzY2FsZUluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gcmVmZXJlbmNlQXhpc1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1pblxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1heFxyXG4gICAgICogQG1lbWJlcm9mIEJhc2ljQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIG9uU3luY2hyb25pemVTY2FsZVJhbmdlKHNjYWxlIDogU2NhbGUsIG1pbjpudW1iZXIsIG1heDpudW1iZXIpIHtcclxuICAgICAgICBsZXQgeVNjYWxlcyA9IHRoaXMuZ2V0WVNjYWxlcygpO1xyXG4gICAgICAgIGZvcihsZXQgeVNjYWxlIG9mIHlTY2FsZXMpe1xyXG4gICAgICAgICAgICB5U2NhbGUubWluWFZhbHVlID0gbWluO1xyXG4gICAgICAgICAgICB5U2NhbGUubWF4WFZhbHVlID0gbWF4O1xyXG4gICAgICAgIH1cclxuICAgICAgICAgbGV0IGF4aXMgPSB0aGlzLmNoYXJ0LmdldEF4aXModGhpcy5wcmltYXJ5WEF4aXNOYW1lKTtcclxuICAgICAgICAgaWYoYXhpcyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBheGlzLnNldEF4aXNSYW5nZSh7bWluLCBtYXh9KTtcclxuICAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcm90ZWN0ZWQgZ2V0VGltZXN0YW1wSW5TZXJpZXMocG9pbnQ6IElQb2ludCwgYXZhaWxhYmxlU2VyaWVzIDogQ2hhcnRWaWV3U2VyaWVbXSkgOiBudW1iZXJ7XHJcblxyXG4gICAgICAgIC8vIGdldCB0aGUgcG9pbnRzIG9mIHRoZSBhdmFpbGFibGUgc2VyaWVzXHJcbiAgICAgICAgLy8gZ2V0IHRoZSB0aW1lc3RhbXBzIHNlcmllcyBmcm9tIHRoZSBzaWduYWwgc2VyaWVzXHJcbiAgICAgICAgbGV0IHRpbWVzdGFtcFNlcmllcztcclxuICAgICAgICB0aW1lc3RhbXBTZXJpZXM9IGF2YWlsYWJsZVNlcmllcy5tYXAoKHNpbmdsZVNlcmllcyk9PnsgcmV0dXJuIHNpbmdsZVNlcmllcy5zZXJpZS50aW1lc3RhbXBzfSk7ICAgICAgICBcclxuICAgICAgICBsZXQgbmVhcmVzdFBvaW50ID0gU2VyaWVzSGVscGVyLmZpbmROZWFyZXN0VmFsdWVGcm9tQ29sbGVjdGlvbihwb2ludC54LCB0aW1lc3RhbXBTZXJpZXMpO1xyXG5cclxuICAgICAgICByZXR1cm4gbmVhcmVzdFBvaW50O1xyXG4gICAgfVxyXG5cclxuIFxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIGEgY2hhcnQgcG9pbnQgZm9yIHRoZSBzcGVjaWZpZWQgdGltZXN0YW1wXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBsZWFkQ3Vyc29yVGltZVN0YW1wXHJcbiAgICAgKiBAcmV0dXJucyB7UG9pbnR9XHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzaWNDaGFydFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0Q3Vyc29yUG9pbnQodGltZXN0YW1wOiBudW1iZXIsc2VyaWVzOiBDaGFydFZpZXdTZXJpZVtdLCBzZXJpZXNJbmRleDpudW1iZXIpOiBUaW1lUG9pbnQge1xyXG4gICAgICAgIGxldCBjdXJzb3JQb2ludCA9IHNlcmllc1tzZXJpZXNJbmRleF0uc2VyaWUucHJldmlvdXNQb2ludEZyb21UaW1lc3RhbXAodGltZXN0YW1wKTtcclxuICAgICAgICByZXR1cm4ge3RpbWVzdGFtcDogY3Vyc29yUG9pbnQueCwgeDogY3Vyc29yUG9pbnQueCwgeTpjdXJzb3JQb2ludC55IH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBwYXJhbSB7eyB4OiBudW1iZXIsIHk6IG51bWJlcn19IGN1cnJQb3NcclxuICAgICAqIEBwYXJhbSB7eyB4OiBudW1iZXIsIHk6IG51bWJlcn19IGNsaWNrUG9zXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIEJhc2ljQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGFic0Rpc3RhbmNlVG9DdXJzb3IgKGN1cnJQb3M6IHsgeDogbnVtYmVyLCB5OiBudW1iZXJ9LCBcclxuICAgICAgICBjbGlja1BvczogeyB4OiBudW1iZXIsIHk6IG51bWJlcn0pOiBudW1iZXJ7XHJcblxyXG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoTWF0aC5wb3coY2xpY2tQb3MueCAtIGN1cnJQb3MueCwgMikpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBkcm9wIGxvY2F0aW9ucyBpbiB0aGUgY2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PEJhc2VTZXJpZXM+fSBzZXJpZVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBCYXNpY0NoYXJ0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGRTZXJpZURyb3BMb2NhdGlvbnMoc2VyaWU6IEFycmF5PEJhc2VTZXJpZXM+LCBjaGFydE1hbmFnZXJDaGFydDogSUNoYXJ0TWFuYWdlckNoYXJ0KXtcclxuICAgICAgICBpZiAoY2hhcnRNYW5hZ2VyQ2hhcnQuY2hpbGRzWzBdLmRyb3BQb3NzaWJsZSkge1xyXG4gICAgICAgICAgICB0aGlzLmFkZFNlcmllWUF4aXNEcm9wTG9jYXRpb25zKHNlcmllWzBdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNoYXJ0TWFuYWdlckNoYXJ0LmRyb3BQb3NzaWJsZSkge1xyXG4gICAgICAgICAgICB0aGlzLmFkZFNlcmllQ2hhcnRBcmVhRHJvcExvY2F0aW9ucyhzZXJpZVswXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIGRyb3AgbG9jYXRpb25zIHRvIHRoZSB5IGF4aXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBkYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzaWNDaGFydFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZFNlcmllWUF4aXNEcm9wTG9jYXRpb25zKGRhdGE6IEJhc2VTZXJpZXMpe1xyXG4gICAgICAgIGlmKGRhdGEubmFtZSlcclxuICAgICAgICB0aGlzLmNhbGN1bGF0ZUNoYXJ0RGltZW5zaW9ucygpO1xyXG4gICAgICAgIGZvcihsZXQgYXhpc0JvdW5kIG9mIHRoaXMuYXhpc0JvdW5kcyl7XHJcbiAgICAgICAgICAgIGxldCBvZmZzZXRXaWR0aCA9IDQ7XHJcbiAgICAgICAgICAgIGxldCBvZmZzZXRMZWZ0ID0gMjtcclxuICAgICAgICAgICAgaWYoYXhpc0JvdW5kLmF4aXMub3JpZW50YXRpb24gPT0gXCJ2ZXJ0aWNhbFwiKXtcclxuICAgICAgICAgICAgICAgICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpLmFwcGVuZCgnPGRpdiBpZD1cIicrdGhpcy5wYXJlbnRDb250ZW50SWQrJ19heGlzRHJvcFpvbmUnKyBheGlzQm91bmQuYXhpcy5uYW1lKydcIiBzdHlsZT1cInBvc2l0aW9uOmFic29sdXRlOyB3aWR0aDogJysgKGF4aXNCb3VuZC53aWR0aC1vZmZzZXRXaWR0aCkgKyAncHg7IGhlaWdodDogJysgKGF4aXNCb3VuZC5oZWlnaHQpICsncHg7IGxlZnQ6JysoYXhpc0JvdW5kLnggKyBvZmZzZXRMZWZ0KSsncHg7IHRvcDonKyhheGlzQm91bmQueSkrJ3B4XCIgY2xhc3M9XCJkcm9wTG9jYXRpb25BcmVhXCI+PC9kaXY+Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgZHJvcCBsb2NhdGlvbnMgaW4gdGhlIGNoYXJ0IGFyZWFcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtCYXNlU2VyaWVzfSBzZXJpZVxyXG4gICAgICogQG1lbWJlcm9mIEJhc2ljQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRTZXJpZUNoYXJ0QXJlYURyb3BMb2NhdGlvbnMoc2VyaWU6IEJhc2VTZXJpZXMpe1xyXG4gICAgICAgIGNvbnN0IG1heGltdW1ZQXhpcyA9IDI7XHJcbiAgICAgICAgaWYoc2VyaWUubmFtZSlcclxuICAgICAgXHRpZih0aGlzLnNjYWxlcy5sZW5ndGggPCBtYXhpbXVtWUF4aXMpe1xyXG4gICAgICAgICAgICBsZXQgY2hhcnRBcmVhID0gdGhpcy5jaGFydC5nZXRDaGFydEFyZWEoKTtcclxuICAgICAgICAgICAgJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCkuYXBwZW5kKCc8ZGl2IGlkPVwiJyt0aGlzLnBhcmVudENvbnRlbnRJZCsnX2F4aXNEcm9wWm9uZScrXCJfY2hhcnRBcmVhXCIrJ1wiIHN0eWxlPVwiei1pbmRleDogNTsgcG9zaXRpb246YWJzb2x1dGU7IHdpZHRoOiAnKyAoY2hhcnRBcmVhLndpZHRoKSArICdweDsgaGVpZ2h0OiAnKyAoY2hhcnRBcmVhLmhlaWdodCkgKydweDsgbGVmdDonKyhjaGFydEFyZWEueCkrJ3B4OyB0b3A6JysoY2hhcnRBcmVhLnkpKydweFwiIGNsYXNzPVwiZHJvcExvY2F0aW9uQXJlYVwiPjwvZGl2PicpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBjdXJyZW50IGRyb3AgbG9jYXRpb24gdHlwZSAoZS5nLiBhc3NpZ24gdG8gc2NhbGUsIGFkZCBuZXcgc2NhbGUsIGludmFsaWQgZm9yIGRyb3ApXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBjdXJyZW50VGFyZ2V0XHJcbiAgICAgKiBAcmV0dXJucyB7RHJvcExvY2F0aW9uVHlwZX1cclxuICAgICAqIEBtZW1iZXJvZiBCYXNpY0NoYXJ0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXREcm9wTG9jYXRpb25UeXBlKGN1cnJlbnRUYXJnZXQ6IGFueSk6IERyb3BMb2NhdGlvblR5cGV7XHJcbiAgICAgICAgaWYoY3VycmVudFRhcmdldC5pZC5pbmNsdWRlcyhcIl9heGlzRHJvcFpvbmVTY2FsZVwiKSl7XHJcbiAgICAgICAgICAgIHJldHVybiBEcm9wTG9jYXRpb25UeXBlLmFzc2lnblRvU2NhbGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGN1cnJlbnRUYXJnZXQuaWQuaW5jbHVkZXMoXCJfYXhpc0Ryb3Bab25lX2NoYXJ0QXJlYVwiKSAmJiB0aGlzLnNjYWxlcy5sZW5ndGggPCAyKXtcclxuICAgICAgICAgICAgcmV0dXJuIERyb3BMb2NhdGlvblR5cGUuYWRkTmV3U2NhbGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBEcm9wTG9jYXRpb25UeXBlLmludmFsaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIaWdobGlnaHQgZHJvcHBhYmxlIGFyZWFzIGlmIGEgdmFsaWQgc2lnbmFsIGlzIGRyYWdnZWQgb3ZlclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gY3VycmVudFRhcmdldFxyXG4gICAgICogQG1lbWJlcm9mIEJhc2ljQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHVwZGF0ZURyb3BwYWJsZUFyZWFzKGN1cnJlbnRUYXJnZXQpIHtcclxuICAgICAgICBpZihjdXJyZW50VGFyZ2V0LmlkLmluY2x1ZGVzKFwiX2F4aXNEcm9wWm9uZV9jaGFydEFyZWFcIikgfHwgY3VycmVudFRhcmdldC5pZC5pbmNsdWRlcyhcIl9yZWZDdXJzb3JfXCIpKXtcclxuICAgICAgICAgICAgbGV0IGNoYXJ0QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMucGFyZW50Q29udGVudElkICsnX2F4aXNEcm9wWm9uZV9jaGFydEFyZWEnKTtcclxuICAgICAgICAgICAgaWYoY2hhcnRBcmVhICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgY2hhcnRBcmVhIS5jbGFzc0xpc3QuYWRkKCdkcmFnZ2VkT3ZlcicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLnNjYWxlcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgYXhpc0FyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnBhcmVudENvbnRlbnRJZCArJ19heGlzRHJvcFpvbmUnKyB0aGlzLnNjYWxlc1tpXS5pZCk7XHJcbiAgICAgICAgICAgICAgICBpZihheGlzQXJlYSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBheGlzQXJlYSEuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZ2dlZE92ZXInKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjdXJyZW50VGFyZ2V0LmlkLmluY2x1ZGVzKFwiX2F4aXNEcm9wWm9uZVNjYWxlXCIpKXtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnNjYWxlcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBpZihjdXJyZW50VGFyZ2V0LmlkLmluY2x1ZGVzKHRoaXMuc2NhbGVzW2ldLmlkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBheGlzQXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMucGFyZW50Q29udGVudElkKydfYXhpc0Ryb3Bab25lJysgdGhpcy5zY2FsZXNbaV0uaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGF4aXNBcmVhICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBheGlzQXJlYSEuY2xhc3NMaXN0LmFkZCgnZHJhZ2dlZE92ZXInKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYXhpc0FyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnBhcmVudENvbnRlbnRJZCsnX2F4aXNEcm9wWm9uZScrIHRoaXMuc2NhbGVzW2ldLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihheGlzQXJlYSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXhpc0FyZWEhLmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWdnZWRPdmVyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgY2hhcnRBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5wYXJlbnRDb250ZW50SWQgKydfYXhpc0Ryb3Bab25lX2NoYXJ0QXJlYScpO1xyXG4gICAgICAgICAgICBpZihjaGFydEFyZWEgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBjaGFydEFyZWEhLmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWdnZWRPdmVyJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVzZXQgaGlnaGxpZ2h0ZWQgYXJlYXNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzaWNDaGFydFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVzZXRIaWdobGlnaHRpbmcoKXtcclxuICAgICAgICBsZXQgY2hhcnRBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5wYXJlbnRDb250ZW50SWQgKydfYXhpc0Ryb3Bab25lX2NoYXJ0QXJlYScpO1xyXG4gICAgICAgIGlmKGNoYXJ0QXJlYSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgY2hhcnRBcmVhIS5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnZ2VkT3ZlcicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5zY2FsZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgYXhpc0FyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnBhcmVudENvbnRlbnRJZCArJ19heGlzRHJvcFpvbmUnKyB0aGlzLnNjYWxlc1tpXS5pZCk7XHJcbiAgICAgICAgICAgIGlmKGF4aXNBcmVhICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgYXhpc0FyZWEhLmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWdnZWRPdmVyJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRpYWxpemVDdXJzb3JIYW5kbGVycygpIHsgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IHsgQmFzaWNDaGFydCB9O1xyXG5cclxuIl19