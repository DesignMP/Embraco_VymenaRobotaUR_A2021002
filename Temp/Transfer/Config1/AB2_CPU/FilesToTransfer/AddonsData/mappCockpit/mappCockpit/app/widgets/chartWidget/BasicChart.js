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
         * Eradicate!
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
        BasicChart.prototype.getCursorPoint = function (leadCursorTimeStamp, timestamp, seriesIndex) {
            var cursorPoint = this.series[seriesIndex].serie.previousPointFromTimestamp(leadCursorTimeStamp);
            return { timestamp: cursorPoint.x, x: cursorPoint.x, y: cursorPoint.y };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzaWNDaGFydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jaGFydFdpZGdldC9CYXNpY0NoYXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFXQTtRQUFrQyw4QkFBUztRQUl2QyxvQkFBWSxVQUFpQixFQUFFLElBQVksRUFBRSxLQUFZO21CQUNyRCxrQkFBTSxVQUFVLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQztRQUNsQyxDQUFDO1FBRUQ7Ozs7V0FJRztRQUNJLDRCQUFPLEdBQWQ7WUFDSSxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzNDLGlCQUFNLE9BQU8sV0FBRSxDQUFDO1FBQ3BCLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDTyxvQ0FBZSxHQUF6QixVQUEwQixVQUFrQjtZQUN4QyxJQUFJLFVBQVUsRUFBRTtnQkFDWixVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzlCO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLHlDQUFvQixHQUE1QixVQUE2QixVQUFpQjtZQUMxQyxJQUFJLFVBQVUsRUFBRTtnQkFDWixVQUFVLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2pDO1FBQ0wsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0ksK0JBQVUsR0FBakIsVUFBa0IsV0FBbUI7WUFDakMsaUJBQU0sVUFBVSxZQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRTlCLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1lBQ2hDLElBQUksQ0FBQyw4QkFBOEIsRUFBRSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFFL0MsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUMxQyxJQUFJ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QyxhQUFhLENBQUMsQ0FBQzthQUM5QztZQUNELEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztnQkFDdkMsSUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFFLGVBQWUsR0FBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNqRyxJQUFHLFFBQVEsSUFBSSxTQUFTLEVBQUU7b0JBQ3RCLFFBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2lCQUM3QzthQUNKO1FBQ0wsQ0FBQztRQUdTLDZDQUF3QixHQUFsQyxjQUF1QyxDQUFDO1FBRTVDLGlCQUFDO0lBQUQsQ0FBQyxBQXBYRCxDQUFrQyxxQkFBUyxHQW9YMUM7SUFFUSxnQ0FBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYXJ0QmFzZSwgRHJvcExvY2F0aW9uVHlwZSwgVGltZVBvaW50IH0gZnJvbSBcIi4vQ2hhcnRCYXNlXCI7XHJcbmltcG9ydCB7IFNlcmllc0hlbHBlciB9IGZyb20gXCIuLi8uLi9jb21tb24vc2VyaWVzSGVscGVyXCI7XHJcbmltcG9ydCB7IEJhc2VTZXJpZXMgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9iYXNlU2VyaWVzXCI7XHJcbmltcG9ydCB7IFNjYWxlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvc2NhbGVcIjtcclxuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb21tb24vaW50ZXJmYWNlcy9wb2ludEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJQ2hhcnRNYW5hZ2VyQ2hhcnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9pbnRlcmZhY2VzL2NoYXJ0TWFuYWdlckNoYXJ0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEF4aXNQb3NpdGlvbiB9IGZyb20gXCIuLi8uLi9jb3JlL2ludGVyZmFjZXMvY29tcG9uZW50cy91aS9jaGFydC9jaGFydEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDaGFydEV4dGVuc2lvbnMgfSBmcm9tIFwiLi9jaGFydEV4dGVuc2lvbnMvY2hhcnRFeHRlbnNpb25zXCI7XHJcbmltcG9ydCB7IEN1cnNvckhhbmRsZXIgfSBmcm9tIFwiLi9jdXJzb3IvQ3Vyc29ySGFuZGxlclwiO1xyXG5pbXBvcnQgeyBDaGFydFZpZXdTZXJpZSB9IGZyb20gXCIuL2NoYXJ0Vmlld1NlcmllXCI7XHJcbmltcG9ydCB7IElWaWV3IH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL3ZpZXdJbnRlcmZhY2VcIjtcclxuYWJzdHJhY3QgY2xhc3MgQmFzaWNDaGFydCBleHRlbmRzIENoYXJ0QmFzZXtcclxuICAgIFxyXG4gICAgYWJzdHJhY3QgY3Vyc29ySGFuZGxlcjogQ3Vyc29ySGFuZGxlcnx1bmRlZmluZWQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IocGFyZW50VmlldzogSVZpZXcsIG5hbWU6IHN0cmluZywgc2NhbGU6IFNjYWxlKSB7XHJcbiAgICAgICAgc3VwZXIocGFyZW50VmlldywgbmFtZSwgc2NhbGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRXJhZGljYXRlIVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCYXNpY0NoYXJ0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkaXNwb3NlKCl7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVXaWRnZXRGcm9tVmlldyh0aGlzLnBhcmVudFZpZXcpO1xyXG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHBhcmFtIHtDaGFydFZpZXdDaGFydE1hbmFnZXJ9IGNoYXJ0TWFuYWdlclxyXG4gICAgICogQG1lbWJlcm9mIEJhc2ljQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGFkZFdpZGdldFRvVmlldyhwYXJlbnRWaWV3IDogSVZpZXcpIHtcclxuICAgICAgICBpZiAocGFyZW50Vmlldykge1xyXG4gICAgICAgICAgICBwYXJlbnRWaWV3LmFkZFdpZGdldCh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0NoYXJ0Vmlld0NoYXJ0TWFuYWdlcn0gY2hhcnRNYW5hZ2VyXHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzaWNDaGFydFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlbW92ZVdpZGdldEZyb21WaWV3KHBhcmVudFZpZXc6IElWaWV3KSB7XHJcbiAgICAgICAgaWYgKHBhcmVudFZpZXcpIHtcclxuICAgICAgICAgICAgcGFyZW50Vmlldy5yZW1vdmVXaWRnZXQodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29udGFpbmVySWRcclxuICAgICAqIEBtZW1iZXJvZiBCYXNpY0NoYXJ0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpbml0aWFsaXplKGNvbnRhaW5lcklkOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlci5pbml0aWFsaXplKGNvbnRhaW5lcklkKTtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0aWFsaXplQ3Vyc29ySGFuZGxlcnMoKTtcclxuICAgICAgICB0aGlzLnNldEF2YWlsYWJsZVNlcmllc0FzRGF0YVNvdXJjZSgpO1xyXG4gICAgICAgIHRoaXMuYXR0YWNoQ2hhcnRFeHRlbnNpb25zKHRoaXMuY2hhcnRJbnN0YW5jZSk7XHJcblxyXG4gICAgICAgIGxldCBjaGFydEFyZWEgPSB0aGlzLmNoYXJ0LmdldENoYXJ0QXJlYSgpO1xyXG4gICAgICAgIHRoaXMueEF4aXNXaWR0aCA9ICBjaGFydEFyZWEud2lkdGg7ICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVpbml0aWFsaXplcyB0aGUgY2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzaWNDaGFydFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVpbml0aWFsaXplKCkge1xyXG4gICAgICAgICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpLmVtcHR5KCk7XHJcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZSh0aGlzLnBhcmVudENvbnRlbnRJZCk7IFxyXG4gICAgICAgIHRoaXMuc2V0QXZhaWxhYmxlU2VyaWVzQXNEYXRhU291cmNlKCk7XHJcbiAgICAgICAgdGhpcy5hdHRhY2hDaGFydEV4dGVuc2lvbnModGhpcy5jaGFydEluc3RhbmNlKTtcclxuXHJcbiAgICAgICAgbGV0IGNoYXJ0QXJlYSA9IHRoaXMuY2hhcnQuZ2V0Q2hhcnRBcmVhKCk7XHJcbiAgICAgICAgdGhpcy54QXhpc1dpZHRoID0gIGNoYXJ0QXJlYS53aWR0aDtcclxuXHJcbiAgICAgICAgdGhpcy5jdXJzb3JIYW5kbGVyID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZUN1cnNvckhhbmRsZXJzKCk7IFxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEF0dGFjaGVzIGEgZXh0ZW5zaW9uIGluc3RhbmNlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gY2hhcnRJbnN0YW5jZVxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzaWNDaGFydFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGF0dGFjaENoYXJ0RXh0ZW5zaW9ucyhjaGFydEluc3RhbmNlOiBhbnkpOiBhbnkge1xyXG5cclxuICAgICAgICAvLyBpbmplY3QgYW4gZXh0ZW5zaW9uIHByb3ZpZGVyXHJcbiAgICAgICAgbGV0IGJhc2ljQ2hhcnRFeHRlbnNpb25zID0gbmV3IENoYXJ0RXh0ZW5zaW9ucyh0aGlzKTtcclxuICAgICAgICAvLyB1c2UgYW4geXQvZmZ0IG9wdGltaXphdGlvbiBhbGdvcml0aG1cclxuICAgICAgICBiYXNpY0NoYXJ0RXh0ZW5zaW9ucy5jaGFydERhdGFPcHRpbWl6ZXIudHJpbVNlcmllc0ZvckNoYXJ0Qm91bmRzID0gYmFzaWNDaGFydEV4dGVuc2lvbnMuY2hhcnREYXRhT3B0aW1pemVyLnRyaW1TZXJpZXNGb3JDaGFydEJvdW5kc1l0O1xyXG4gICAgICAgIC8vIHNldCB0aGUgY2hhcnQgZXh0ZW5zaW9uc1xyXG4gICAgICAgIGNoYXJ0SW5zdGFuY2UuY2hhcnRFeHRlbnNpb25zID0gYmFzaWNDaGFydEV4dGVuc2lvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZW5kIGRhdGEgb2YgdGhlIHNlcmllcyB0byB0aGUgY2hhcnQgaW5zdGFuY2VcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzaWNDaGFydFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0QXZhaWxhYmxlU2VyaWVzQXNEYXRhU291cmNlKCkge1xyXG4gICAgICAgIGxldCB0cmFjZURhdGFTZXJpZXMgPSBuZXcgQXJyYXkoKTtcclxuICAgICBcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5zY2FsZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgdGhpcy5zY2FsZXNbaV0uY2hpbGRzLmxlbmd0aDsgaisrKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuc2NhbGVzW2ldLmNoaWxkc1tqXS5yYXdQb2ludHNWYWxpZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVmZmVjdGl2ZVNlcmllID0gdGhpcy5jaGFydEluc3RhbmNlLmNoYXJ0RXh0ZW5zaW9ucyA/IHRoaXMuY2hhcnRJbnN0YW5jZS5jaGFydEV4dGVuc2lvbnMuY2hhcnREYXRhT3B0aW1pemVyLmF0dGFjaFNlcmllcyh0aGlzLnNjYWxlc1tpXS5jaGlsZHNbal0pIDogdGhpcy5zY2FsZXNbaV0uY2hpbGRzW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRyYWNlRGF0YVNlcmllcy5wdXNoKHRoaXMuY3JlYXRlVHJhY2VEYXRhU2VyaWVzKGVmZmVjdGl2ZVNlcmllLCB0aGlzLnNjYWxlc1tpXS5pZCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZGF0YVNlcmllcyA9IHtzZXJpZXM6IHRyYWNlRGF0YVNlcmllcyB9O1xyXG4gICAgICAgICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpLmVqQ2hhcnQoZGF0YVNlcmllcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgbmV3IHkgYXhpcyBpbnRvIHRoZSBjaGFydFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U2NhbGV9IHlBeGlzXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wcG9zZWRQb3NpdGlvblxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbG9yXHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzaWNDaGFydFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkWVNjYWxlKHNjYWxlOiBTY2FsZSwgcG9zaXRpb24gOiBBeGlzUG9zaXRpb24pe1xyXG4gICAgXHR0aGlzLmNoYXJ0LmFkZFlBeGlzKHNjYWxlLmlkLCBzY2FsZS5taW5ZVmFsdWUsIHNjYWxlLm1heFlWYWx1ZSwgcG9zaXRpb24pO1xyXG4gICAgICAgIC8vVE9ETzogZ2V0IGF4aXMgd2lkdGhcclxuICAgIFx0dGhpcy54QXhpc1dpZHRoID0gdGhpcy5jaGFydC5nZXRDaGFydEFyZWEoKS53aWR0aCAtIDcxO1xyXG5cclxuICAgICAgICBpZih0aGlzLnNjYWxlcy5pbmRleE9mKHNjYWxlKSA9PSAtMSl7XHJcbiAgICAgICAgICAgIHRoaXMuc2NhbGVzLnB1c2goc2NhbGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U2NhbGV9IHlTY2FsZVxyXG4gICAgICogQG1lbWJlcm9mIEJhc2ljQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlbW92ZVlTY2FsZUZyb21DaGFydCh5U2NhbGU6IFNjYWxlKXtcclxuICAgICAgICB0aGlzLmNoYXJ0LnJlbW92ZVlBeGlzKHlTY2FsZS5pZCk7XHJcbiAgICAgICAgdGhpcy5jaGFydC5yZWRyYXcoKTtcclxuXHJcbiAgICAgICAgdGhpcy54QXhpc1dpZHRoID0gdGhpcy5jaGFydC5nZXRDaGFydEFyZWEoKS53aWR0aDtcclxuICAgICAgICBsZXQgc2NhbGVJbmRleCA9IHRoaXMuc2NhbGVzLmluZGV4T2YoeVNjYWxlKTtcclxuICAgICAgICBpZiAoc2NhbGVJbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NhbGVzLnNwbGljZShzY2FsZUluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gcmVmZXJlbmNlQXhpc1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1pblxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1heFxyXG4gICAgICogQG1lbWJlcm9mIEJhc2ljQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIG9uU3luY2hyb25pemVTY2FsZVJhbmdlKHNjYWxlIDogU2NhbGUsIG1pbjpudW1iZXIsIG1heDpudW1iZXIpIHtcclxuICAgICAgICBsZXQgeVNjYWxlcyA9IHRoaXMuZ2V0WVNjYWxlcygpO1xyXG4gICAgICAgIGZvcihsZXQgeVNjYWxlIG9mIHlTY2FsZXMpe1xyXG4gICAgICAgICAgICB5U2NhbGUubWluWFZhbHVlID0gbWluO1xyXG4gICAgICAgICAgICB5U2NhbGUubWF4WFZhbHVlID0gbWF4O1xyXG4gICAgICAgIH1cclxuICAgICAgICAgbGV0IGF4aXMgPSB0aGlzLmNoYXJ0LmdldEF4aXModGhpcy5wcmltYXJ5WEF4aXNOYW1lKTtcclxuICAgICAgICAgaWYoYXhpcyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBheGlzLnNldEF4aXNSYW5nZSh7bWluLCBtYXh9KTtcclxuICAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcm90ZWN0ZWQgZ2V0VGltZXN0YW1wSW5TZXJpZXMocG9pbnQ6IElQb2ludCwgYXZhaWxhYmxlU2VyaWVzIDogQ2hhcnRWaWV3U2VyaWVbXSkgOiBudW1iZXJ7XHJcblxyXG4gICAgICAgIC8vIGdldCB0aGUgcG9pbnRzIG9mIHRoZSBhdmFpbGFibGUgc2VyaWVzXHJcbiAgICAgICAgLy8gZ2V0IHRoZSB0aW1lc3RhbXBzIHNlcmllcyBmcm9tIHRoZSBzaWduYWwgc2VyaWVzXHJcbiAgICAgICAgbGV0IHRpbWVzdGFtcFNlcmllcztcclxuICAgICAgICB0aW1lc3RhbXBTZXJpZXM9IGF2YWlsYWJsZVNlcmllcy5tYXAoKHNpbmdsZVNlcmllcyk9PnsgcmV0dXJuIHNpbmdsZVNlcmllcy5zZXJpZS50aW1lc3RhbXBzfSk7ICAgICAgICBcclxuICAgICAgICBsZXQgbmVhcmVzdFBvaW50ID0gU2VyaWVzSGVscGVyLmZpbmROZWFyZXN0VmFsdWVGcm9tQ29sbGVjdGlvbihwb2ludC54LCB0aW1lc3RhbXBTZXJpZXMpO1xyXG5cclxuICAgICAgICByZXR1cm4gbmVhcmVzdFBvaW50O1xyXG4gICAgfVxyXG5cclxuIFxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIGEgY2hhcnQgcG9pbnQgZm9yIHRoZSBzcGVjaWZpZWQgdGltZXN0YW1wXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBsZWFkQ3Vyc29yVGltZVN0YW1wXHJcbiAgICAgKiBAcmV0dXJucyB7UG9pbnR9XHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzaWNDaGFydFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0Q3Vyc29yUG9pbnQobGVhZEN1cnNvclRpbWVTdGFtcDogbnVtYmVyLCB0aW1lc3RhbXA6IG51bWJlciwgc2VyaWVzSW5kZXg6bnVtYmVyKTogVGltZVBvaW50IHtcclxuICAgICAgICBsZXQgY3Vyc29yUG9pbnQgPSB0aGlzLnNlcmllc1tzZXJpZXNJbmRleF0uc2VyaWUucHJldmlvdXNQb2ludEZyb21UaW1lc3RhbXAobGVhZEN1cnNvclRpbWVTdGFtcCk7XHJcbiAgICAgICAgcmV0dXJuIHt0aW1lc3RhbXA6IGN1cnNvclBvaW50LngsIHg6IGN1cnNvclBvaW50LngsIHk6Y3Vyc29yUG9pbnQueSB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXhcclxuICAgICAqIEBtZW1iZXJvZiBYWUNoYXJ0XHJcbiAgICAgKi9cclxuICAgIC8vIHByb3RlY3RlZCByZW1vdmVDdXJzb3JzRnJvbUNoYXJ0IChpbmRleDogbnVtYmVyKSB7XHJcbiAgICAvLyAgICAgaWYgKGluZGV4ID4gLTEgJiYgdGhpcy5jdXJzb3JIYW5kbGVyIGluc3RhbmNlb2YgRkZUQ3Vyc29ySGFuZGxlcikge1xyXG4gICAgLy8gICAgICAgICB0aGlzLmN1cnNvckhhbmRsZXIuc2VyaWVDdXJzb3JzW2luZGV4XS5kZWxldGVDdXJzb3JzKCk7XHJcbiAgICAvLyAgICAgICAgIHRoaXMuY3Vyc29ySGFuZGxlci5zZXJpZUN1cnNvcnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBwYXJhbSB7eyB4OiBudW1iZXIsIHk6IG51bWJlcn19IGN1cnJQb3NcclxuICAgICAqIEBwYXJhbSB7eyB4OiBudW1iZXIsIHk6IG51bWJlcn19IGNsaWNrUG9zXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIEJhc2ljQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGFic0Rpc3RhbmNlVG9DdXJzb3IgKGN1cnJQb3M6IHsgeDogbnVtYmVyLCB5OiBudW1iZXJ9LCBcclxuICAgICAgICBjbGlja1BvczogeyB4OiBudW1iZXIsIHk6IG51bWJlcn0pOiBudW1iZXJ7XHJcblxyXG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoTWF0aC5wb3coY2xpY2tQb3MueCAtIGN1cnJQb3MueCwgMikpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZSByYW5nZSBpbiB4IGF4aXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyhudW1iZXIgfCB1bmRlZmluZWQpfSB4QXhpc1NlZ21lbnRNaW5WYWx1ZVxyXG4gICAgICogQHBhcmFtIHsobnVtYmVyIHwgdW5kZWZpbmVkKX0geEF4aXNTZWdtZW50TWF4VmFsdWVcclxuICAgICAqIEBtZW1iZXJvZiBCYXNpY0NoYXJ0XHJcbiAgICAgKi9cclxuICAgIC8qcHVibGljIHVwZGF0ZUNoYXJ0UmFuZ2VYKHhBeGlzU2VnbWVudE1pblZhbHVlOiBudW1iZXIgfCB1bmRlZmluZWQsIHhBeGlzU2VnbWVudE1heFZhbHVlOiBudW1iZXIgfCB1bmRlZmluZWQpIHtcclxuICAgICAgICBzdXBlci5zZXRSYW5nZVgoeEF4aXNTZWdtZW50TWluVmFsdWUhLCB4QXhpc1NlZ21lbnRNYXhWYWx1ZSEpO1xyXG4gICAgfSovXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgZHJvcCBsb2NhdGlvbnMgaW4gdGhlIGNoYXJ0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxCYXNlU2VyaWVzPn0gc2VyaWVcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzaWNDaGFydFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkU2VyaWVEcm9wTG9jYXRpb25zKHNlcmllOiBBcnJheTxCYXNlU2VyaWVzPiwgY2hhcnRNYW5hZ2VyQ2hhcnQ6IElDaGFydE1hbmFnZXJDaGFydCl7XHJcbiAgICAgICAgaWYgKGNoYXJ0TWFuYWdlckNoYXJ0LmNoaWxkc1swXS5kcm9wUG9zc2libGUpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRTZXJpZVlBeGlzRHJvcExvY2F0aW9ucyhzZXJpZVswXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjaGFydE1hbmFnZXJDaGFydC5kcm9wUG9zc2libGUpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRTZXJpZUNoYXJ0QXJlYURyb3BMb2NhdGlvbnMoc2VyaWVbMF0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBkcm9wIGxvY2F0aW9ucyB0byB0aGUgeSBheGlzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gZGF0YVxyXG4gICAgICogQG1lbWJlcm9mIEJhc2ljQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRTZXJpZVlBeGlzRHJvcExvY2F0aW9ucyhkYXRhOiBCYXNlU2VyaWVzKXtcclxuICAgICAgICBpZihkYXRhLm5hbWUpXHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVDaGFydERpbWVuc2lvbnMoKTtcclxuICAgICAgICBmb3IobGV0IGF4aXNCb3VuZCBvZiB0aGlzLmF4aXNCb3VuZHMpe1xyXG4gICAgICAgICAgICBsZXQgb2Zmc2V0V2lkdGggPSA0O1xyXG4gICAgICAgICAgICBsZXQgb2Zmc2V0TGVmdCA9IDI7XHJcbiAgICAgICAgICAgIGlmKGF4aXNCb3VuZC5heGlzLm9yaWVudGF0aW9uID09IFwidmVydGljYWxcIil7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKS5hcHBlbmQoJzxkaXYgaWQ9XCInK3RoaXMucGFyZW50Q29udGVudElkKydfYXhpc0Ryb3Bab25lJysgYXhpc0JvdW5kLmF4aXMubmFtZSsnXCIgc3R5bGU9XCJwb3NpdGlvbjphYnNvbHV0ZTsgd2lkdGg6ICcrIChheGlzQm91bmQud2lkdGgtb2Zmc2V0V2lkdGgpICsgJ3B4OyBoZWlnaHQ6ICcrIChheGlzQm91bmQuaGVpZ2h0KSArJ3B4OyBsZWZ0OicrKGF4aXNCb3VuZC54ICsgb2Zmc2V0TGVmdCkrJ3B4OyB0b3A6JysoYXhpc0JvdW5kLnkpKydweFwiIGNsYXNzPVwiZHJvcExvY2F0aW9uQXJlYVwiPjwvZGl2PicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIGRyb3AgbG9jYXRpb25zIGluIHRoZSBjaGFydCBhcmVhXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVcclxuICAgICAqIEBtZW1iZXJvZiBCYXNpY0NoYXJ0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkU2VyaWVDaGFydEFyZWFEcm9wTG9jYXRpb25zKHNlcmllOiBCYXNlU2VyaWVzKXtcclxuICAgICAgICBjb25zdCBtYXhpbXVtWUF4aXMgPSAyO1xyXG4gICAgICAgIGlmKHNlcmllLm5hbWUpXHJcbiAgICAgIFx0aWYodGhpcy5zY2FsZXMubGVuZ3RoIDwgbWF4aW11bVlBeGlzKXtcclxuICAgICAgICAgICAgbGV0IGNoYXJ0QXJlYSA9IHRoaXMuY2hhcnQuZ2V0Q2hhcnRBcmVhKCk7XHJcbiAgICAgICAgICAgICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpLmFwcGVuZCgnPGRpdiBpZD1cIicrdGhpcy5wYXJlbnRDb250ZW50SWQrJ19heGlzRHJvcFpvbmUnK1wiX2NoYXJ0QXJlYVwiKydcIiBzdHlsZT1cInotaW5kZXg6IDU7IHBvc2l0aW9uOmFic29sdXRlOyB3aWR0aDogJysgKGNoYXJ0QXJlYS53aWR0aCkgKyAncHg7IGhlaWdodDogJysgKGNoYXJ0QXJlYS5oZWlnaHQpICsncHg7IGxlZnQ6JysoY2hhcnRBcmVhLngpKydweDsgdG9wOicrKGNoYXJ0QXJlYS55KSsncHhcIiBjbGFzcz1cImRyb3BMb2NhdGlvbkFyZWFcIj48L2Rpdj4nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgY3VycmVudCBkcm9wIGxvY2F0aW9uIHR5cGUgKGUuZy4gYXNzaWduIHRvIHNjYWxlLCBhZGQgbmV3IHNjYWxlLCBpbnZhbGlkIGZvciBkcm9wKVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gY3VycmVudFRhcmdldFxyXG4gICAgICogQHJldHVybnMge0Ryb3BMb2NhdGlvblR5cGV9XHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzaWNDaGFydFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0RHJvcExvY2F0aW9uVHlwZShjdXJyZW50VGFyZ2V0OiBhbnkpOiBEcm9wTG9jYXRpb25UeXBle1xyXG4gICAgICAgIGlmKGN1cnJlbnRUYXJnZXQuaWQuaW5jbHVkZXMoXCJfYXhpc0Ryb3Bab25lU2NhbGVcIikpe1xyXG4gICAgICAgICAgICByZXR1cm4gRHJvcExvY2F0aW9uVHlwZS5hc3NpZ25Ub1NjYWxlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihjdXJyZW50VGFyZ2V0LmlkLmluY2x1ZGVzKFwiX2F4aXNEcm9wWm9uZV9jaGFydEFyZWFcIikgJiYgdGhpcy5zY2FsZXMubGVuZ3RoIDwgMil7XHJcbiAgICAgICAgICAgIHJldHVybiBEcm9wTG9jYXRpb25UeXBlLmFkZE5ld1NjYWxlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gRHJvcExvY2F0aW9uVHlwZS5pbnZhbGlkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGlnaGxpZ2h0IGRyb3BwYWJsZSBhcmVhcyBpZiBhIHZhbGlkIHNpZ25hbCBpcyBkcmFnZ2VkIG92ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IGN1cnJlbnRUYXJnZXRcclxuICAgICAqIEBtZW1iZXJvZiBCYXNpY0NoYXJ0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB1cGRhdGVEcm9wcGFibGVBcmVhcyhjdXJyZW50VGFyZ2V0KSB7XHJcbiAgICAgICAgaWYoY3VycmVudFRhcmdldC5pZC5pbmNsdWRlcyhcIl9heGlzRHJvcFpvbmVfY2hhcnRBcmVhXCIpIHx8IGN1cnJlbnRUYXJnZXQuaWQuaW5jbHVkZXMoXCJfcmVmQ3Vyc29yX1wiKSl7XHJcbiAgICAgICAgICAgIGxldCBjaGFydEFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnBhcmVudENvbnRlbnRJZCArJ19heGlzRHJvcFpvbmVfY2hhcnRBcmVhJyk7XHJcbiAgICAgICAgICAgIGlmKGNoYXJ0QXJlYSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGNoYXJ0QXJlYSEuY2xhc3NMaXN0LmFkZCgnZHJhZ2dlZE92ZXInKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5zY2FsZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IGF4aXNBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5wYXJlbnRDb250ZW50SWQgKydfYXhpc0Ryb3Bab25lJysgdGhpcy5zY2FsZXNbaV0uaWQpO1xyXG4gICAgICAgICAgICAgICAgaWYoYXhpc0FyZWEgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXhpc0FyZWEhLmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWdnZWRPdmVyJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY3VycmVudFRhcmdldC5pZC5pbmNsdWRlcyhcIl9heGlzRHJvcFpvbmVTY2FsZVwiKSl7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zY2FsZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgaWYoY3VycmVudFRhcmdldC5pZC5pbmNsdWRlcyh0aGlzLnNjYWxlc1tpXS5pZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYXhpc0FyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnBhcmVudENvbnRlbnRJZCsnX2F4aXNEcm9wWm9uZScrIHRoaXMuc2NhbGVzW2ldLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihheGlzQXJlYSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXhpc0FyZWEhLmNsYXNzTGlzdC5hZGQoJ2RyYWdnZWRPdmVyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGF4aXNBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5wYXJlbnRDb250ZW50SWQrJ19heGlzRHJvcFpvbmUnKyB0aGlzLnNjYWxlc1tpXS5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYXhpc0FyZWEgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF4aXNBcmVhIS5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnZ2VkT3ZlcicpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGNoYXJ0QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMucGFyZW50Q29udGVudElkICsnX2F4aXNEcm9wWm9uZV9jaGFydEFyZWEnKTtcclxuICAgICAgICAgICAgaWYoY2hhcnRBcmVhICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgY2hhcnRBcmVhIS5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnZ2VkT3ZlcicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlc2V0IGhpZ2hsaWdodGVkIGFyZWFzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJhc2ljQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlc2V0SGlnaGxpZ2h0aW5nKCl7XHJcbiAgICAgICAgbGV0IGNoYXJ0QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMucGFyZW50Q29udGVudElkICsnX2F4aXNEcm9wWm9uZV9jaGFydEFyZWEnKTtcclxuICAgICAgICBpZihjaGFydEFyZWEgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGNoYXJ0QXJlYSEuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZ2dlZE92ZXInKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMuc2NhbGVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGF4aXNBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5wYXJlbnRDb250ZW50SWQgKydfYXhpc0Ryb3Bab25lJysgdGhpcy5zY2FsZXNbaV0uaWQpO1xyXG4gICAgICAgICAgICBpZihheGlzQXJlYSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGF4aXNBcmVhIS5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnZ2VkT3ZlcicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCByZW1vdmVTZXJpZUZyb21DaGFydChzZXJpZTogQmFzZVNlcmllc3xDaGFydFZpZXdTZXJpZSk7XHJcbiAgICBwcm90ZWN0ZWQgaW5pdGlhbGl6ZUN1cnNvckhhbmRsZXJzKCkgeyB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgeyBCYXNpY0NoYXJ0IH07XHJcblxyXG4iXX0=