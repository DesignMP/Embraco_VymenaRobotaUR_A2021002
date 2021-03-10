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
define(["require", "exports", "./chartManagerData", "../dataModelBase", "../dataModelInterface", "./eventSerieDataChangedArgs", "./eventScaleDataChangedArgs", "./chartManagerChart"], function (require, exports, chartManagerData_1, dataModelBase_1, dataModelInterface_1, eventSerieDataChangedArgs_1, eventScaleDataChangedArgs_1, chartManagerChart_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ChartManagerDataModelChangedHint;
    (function (ChartManagerDataModelChangedHint) {
        ChartManagerDataModelChangedHint[ChartManagerDataModelChangedHint["addSerie"] = 0] = "addSerie";
        ChartManagerDataModelChangedHint[ChartManagerDataModelChangedHint["moveSerie"] = 1] = "moveSerie";
        ChartManagerDataModelChangedHint[ChartManagerDataModelChangedHint["removeSerie"] = 2] = "removeSerie";
        ChartManagerDataModelChangedHint[ChartManagerDataModelChangedHint["addChart"] = 3] = "addChart";
        ChartManagerDataModelChangedHint[ChartManagerDataModelChangedHint["moveChart"] = 4] = "moveChart";
        ChartManagerDataModelChangedHint[ChartManagerDataModelChangedHint["removeChart"] = 5] = "removeChart";
        ChartManagerDataModelChangedHint[ChartManagerDataModelChangedHint["addYScale"] = 6] = "addYScale";
        ChartManagerDataModelChangedHint[ChartManagerDataModelChangedHint["removeYScale"] = 7] = "removeYScale";
        ChartManagerDataModelChangedHint[ChartManagerDataModelChangedHint["updateScaleRange"] = 8] = "updateScaleRange";
        ChartManagerDataModelChangedHint[ChartManagerDataModelChangedHint["disableChart"] = 9] = "disableChart";
        ChartManagerDataModelChangedHint[ChartManagerDataModelChangedHint["renameSignal"] = 10] = "renameSignal";
        ChartManagerDataModelChangedHint[ChartManagerDataModelChangedHint["startTriggerTimeChanged"] = 11] = "startTriggerTimeChanged";
        ChartManagerDataModelChangedHint[ChartManagerDataModelChangedHint["colorChanged"] = 12] = "colorChanged";
        ChartManagerDataModelChangedHint[ChartManagerDataModelChangedHint["dataPointsChanged"] = 13] = "dataPointsChanged";
    })(ChartManagerDataModelChangedHint = exports.ChartManagerDataModelChangedHint || (exports.ChartManagerDataModelChangedHint = {}));
    var ChartManagerDataModel = /** @class */ (function (_super) {
        __extends(ChartManagerDataModel, _super);
        function ChartManagerDataModel() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.series = new Array();
            _this._chartManagerData = new chartManagerData_1.ChartManagerData();
            _this._serieDataChangedHandler = function (sender, args) { return _this.onSerieDataChanged(sender, args); };
            _this._scaleDataChangedHandler = function (sender, args) { return _this.onScaleDataChanged(sender, args); };
            _this._maxChartCount = 4; // Currently limitation of charts to the max. of 4 
            return _this;
        }
        /**
         * Initializes the ChartManagerDataModel
         *
         * @memberof ChartManagerDataModel
         */
        ChartManagerDataModel.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._data = this._chartManagerData.childs;
            this._dataSource = this;
        };
        /**
         * Adds a chart to the datamodel
         *
         * @param {IChartManagerChart} chart
         * @param {number} index
         * @returns {boolean} false if chart adding not possible, else true
         * @memberof ChartManagerDataModel
         */
        ChartManagerDataModel.prototype.addChart = function (chart, index) {
            if (this._chartManagerData.childs.length >= this._maxChartCount) { // Limitation of charts
                return false;
            }
            this._chartManagerData.addChart(chart, index);
            var minX = 0;
            var maxX = 100;
            for (var _i = 0, _a = this.data; _i < _a.length; _i++) {
                var charts = _a[_i];
                if (charts.chartType == chart.chartType) {
                    if (charts.childs[0] != undefined) {
                        minX = charts.childs[0].minXValue;
                        maxX = charts.childs[0].maxXValue;
                    }
                }
            }
            chart.addDefaultYScale(this, minX, maxX);
            var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, ChartManagerDataModelChangedHint.addChart, { data: this.data, chart: chart, index: index, type: chart.chartType });
            this.onModelChanged(this, eventArgs);
            var childsclone = chart.childs.slice();
            for (var i = 0; i < childsclone.length; i++) {
                var yAxis = childsclone[i];
                var series = yAxis.childs.slice();
                for (var j = 0; j < series.length; j++) {
                    // fire add serie event for all series of this chart
                    var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, ChartManagerDataModelChangedHint.addSerie, { data: this.data, chart: chart, serie: series[j] });
                    this.onModelChanged(this, eventArgs);
                }
            }
            return true;
        };
        /**
         * Returns true if a chart can be added, else false if chart limit was reached
         *
         * @returns {boolean}
         * @memberof ChartManagerDataModel
         */
        ChartManagerDataModel.prototype.canAddChart = function () {
            if (this._chartManagerData.childs.length >= this._maxChartCount) { // Limitation of charts
                return false;
            }
            return true;
        };
        /**
         * Removes a chart from the datamodel
         *
         * @param {IChartManagerChart} chart
         * @memberof ChartManagerDataModel
         */
        ChartManagerDataModel.prototype.removeChart = function (chart) {
            var axisInCharts = chart.getChilds();
            for (var i = 0; i < axisInCharts.length; i++) {
                this.removeYAxis(chart, axisInCharts[i]);
            }
            this._chartManagerData.removeChart(chart);
            var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, ChartManagerDataModelChangedHint.removeChart, { data: this.data, chart: chart });
            this.onModelChanged(this, eventArgs);
        };
        /**
         * Moves a chart within the datamodel
         *
         * @param {IChartManagerChart} chart
         * @param {IChartManagerChart} targetChart
         * @param {string} insertType e.g "insertAbove" or "insertBelow"
         * @memberof ChartManagerDataModel
         */
        ChartManagerDataModel.prototype.moveChart = function (chart, targetChart, insertType) {
            this._chartManagerData.moveChart(chart, targetChart, insertType);
            var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, ChartManagerDataModelChangedHint.moveChart, { data: this.data, chart: chart, target: targetChart, insertType: insertType });
            this.onModelChanged(this, eventArgs);
        };
        /**
         * Adds a serie to a chart
         *
         * @param {IChartManagerChart} chart
         * @param {Array<BaseSeries>} series
         * @param {Scale} scale
         * @memberof ChartManagerDataModel
         */
        ChartManagerDataModel.prototype.addSeriesToChart = function (chart, series, scale) {
            if (chart.getYScale(scale.id) == undefined) {
                chart.addYScale(scale);
            }
            chart.addSeries(series, scale);
            for (var i = 0; i < series.length; i++) {
                series[i].eventDataChanged.attach(this._serieDataChangedHandler);
            }
            var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, ChartManagerDataModelChangedHint.addSerie, { data: this.data, chart: chart, series: series, axis: scale });
            this.onModelChanged(this, eventArgs);
        };
        /**
         * Removes a serie from a chart
         *
         * @param {IChartManagerChart} chart
         * @param {BaseSeries} serie
         * @memberof ChartManagerDataModel
         */
        ChartManagerDataModel.prototype.removeSerie = function (chart, serie) {
            if (chart != undefined) {
                chart.removeSerie(serie);
                var chartsWithThisSerie = this.getChartsWithSerie(serie);
                var serieUsed = false;
                if (chartsWithThisSerie.length > 0) {
                    serieUsed = true;
                }
                else { // Serie not used in an other chart => detach events
                    serie.eventDataChanged.detach(this._serieDataChangedHandler);
                }
                var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, ChartManagerDataModelChangedHint.removeSerie, { data: this.data, chart: chart, serie: serie, signalUsedInOtherCharts: serieUsed });
                this.onModelChanged(this, eventArgs);
            }
        };
        /**
         * Adds a yAxis to the given chart
         *
         * @param {IChartManagerChart} chart
         * @param {Scale} yScale
         * @memberof ChartManagerDataModel
         */
        ChartManagerDataModel.prototype.addYScale = function (chart, yScale) {
            if (chart != undefined) {
                chart.addYScale(yScale);
                yScale.eventDataChanged.attach(this._scaleDataChangedHandler);
                var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, ChartManagerDataModelChangedHint.addYScale, { data: this.data, chart: chart, yAxis: yScale });
                this.onModelChanged(this, eventArgs);
            }
        };
        /**
         * Removes a yAxis from the given chart
         *
         * @param {IChartManagerChart} chart
         * @param {Scale} yAxis
         * @memberof ChartManagerDataModel
         */
        ChartManagerDataModel.prototype.removeYAxis = function (chart, yAxis) {
            if (chart != undefined) {
                //First, remove series from Y Axis
                var seriesInAxis = yAxis.getChilds();
                for (var i = 0; i < seriesInAxis.length; i++) {
                    this.removeSerie(chart, seriesInAxis[i]);
                }
                if (chart.removeYAxis(yAxis) == true) {
                    var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, ChartManagerDataModelChangedHint.removeYScale, { data: this.data, chart: chart, yAxis: yAxis });
                    this.onModelChanged(this, eventArgs);
                }
            }
        };
        /**
         * Removes a serie from all charts
         *
         * @param {BaseSeries} series
         * @memberof ChartManagerDataModel
         */
        ChartManagerDataModel.prototype.removeSerieFromAllCharts = function (serie) {
            for (var i = 0; i < this._data.length; i++) {
                var chart = this._data[i];
                if (chart != undefined) {
                    for (var j = 0; j < chart.childs.length; j++) {
                        if (chart.removeSerie(serie)) {
                            var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, ChartManagerDataModelChangedHint.removeSerie, { data: this.data, chart: chart, serie: serie, signalUsedInOtherCharts: false });
                            this.onModelChanged(this, eventArgs);
                        }
                    }
                }
            }
        };
        /**
         * Moves a serie from one position to an other, within a chart or into an other chart (=> currently only changed event will raised, moving is done by syncfusion treegrid!!!)
         *
         * @param {IChartManagerChart} sourceChart
         * @param {Scale} sourceAxis
         * @param {BaseSeries} serie
         * @param {IChartManagerChart} targetChart
         * @param {Scale} targetAxis
         * @param {string} insertType
         * @memberof ChartManagerDataModel
         */
        ChartManagerDataModel.prototype.moveSerie = function (sourceChart, sourceAxis, serie, targetChart, targetAxis, insertType) {
            // currently only changed event will raised (moving is done by syncfusion treegrid!!!) 
            var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, ChartManagerDataModelChangedHint.moveSerie, { data: this.data, chart: sourceChart, targetChart: targetChart, serie: serie, targetAxis: targetAxis });
            this.onModelChanged(this, eventArgs);
        };
        /**
         * Set the chart disabled or enabled
         *
         * @param {IChartManagerChart} chart
         * @param {boolean} disabled
         * @memberof ChartManagerDataModel
         */
        ChartManagerDataModel.prototype.disableChart = function (chart, disabled) {
            chart.setDisabled(disabled);
            var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, ChartManagerDataModelChangedHint.disableChart, { data: this.data });
            this.onModelChanged(this, eventArgs);
        };
        /**
         * Returns the chart with the given name or undefined if not found
         *
         * @param {string} chartName
         * @returns {(IChartManagerChart|undefined)}
         * @memberof ChartManagerDataModel
         */
        ChartManagerDataModel.prototype.getChart = function (chartName) {
            for (var _i = 0, _a = this._data; _i < _a.length; _i++) {
                var chart = _a[_i];
                if (chart.name == chartName) {
                    return chart;
                }
            }
            ;
            return undefined;
        };
        /**
         * Returns a unique chart name (e.g "Chart 1", "chart 2", ...)
         *
         * @returns {string}
         * @memberof ChartManagerDataModel
         */
        ChartManagerDataModel.prototype.getUniqueChartName = function () {
            for (var i = 1; 1 < 1000; i++) {
                var newchartName = "Chart " + i;
                var chartNameAlreadyExists = false;
                for (var _i = 0, _a = this._data; _i < _a.length; _i++) {
                    var chart = _a[_i];
                    if (chart.name == newchartName) {
                        chartNameAlreadyExists = true;
                        break;
                    }
                }
                if (chartNameAlreadyExists == false)
                    return newchartName;
            }
            return "Chart 1000";
        };
        /**
         * Returns all charts which work with the given serie
         *
         * @param {Array<BaseSeries>} serie
         * @returns {Array<IChartManagerChart>}
         * @memberof ChartManagerDataModel
         */
        ChartManagerDataModel.prototype.getChartsUsingSerie = function (serie) {
            var charts = new Array();
            for (var i = 0; i < this._data.length; i++) {
                var chart = this._data[i];
                if (chart.hasSeries(serie)) {
                    charts.push(chart);
                }
            }
            return charts;
        };
        /**
         * Returns all charts which have the given serie
         *
         * @param {BaseSeries} serie
         * @returns {Array<IChartManagerChart>}
         * @memberof ChartManagerDataModel
         */
        ChartManagerDataModel.prototype.getChartsWithSerie = function (serie) {
            var charts = new Array();
            for (var i = 0; i < this._data.length; i++) {
                var chart = this._data[i];
                if (chart.hasExactSerie(serie)) {
                    charts.push(chart);
                }
            }
            return charts;
        };
        ChartManagerDataModel.prototype.onSerieDataChanged = function (sender, args) {
            if (args.action == eventSerieDataChangedArgs_1.SerieAction.rename) {
                var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, ChartManagerDataModelChangedHint.renameSignal, { data: this.data });
                this.onModelChanged(this, eventArgs);
            }
            else if (args.action == eventSerieDataChangedArgs_1.SerieAction.startTriggerTimeChanged) {
                var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, ChartManagerDataModelChangedHint.startTriggerTimeChanged, { data: this.data });
                this.onModelChanged(this, eventArgs);
            }
            else if (args.action == eventSerieDataChangedArgs_1.SerieAction.colorChanged) {
                var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, ChartManagerDataModelChangedHint.colorChanged, { data: this.data });
                this.onModelChanged(this, eventArgs);
            }
            else if (args.action == eventSerieDataChangedArgs_1.SerieAction.dataPointsChanged) { // Needed for showing correct valid/invalid icon in chartmanager if data changes
                var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, ChartManagerDataModelChangedHint.dataPointsChanged, { data: this.data });
                this.onModelChanged(this, eventArgs);
            }
        };
        ChartManagerDataModel.prototype.onScaleDataChanged = function (sender, args) {
            if (args.action == eventScaleDataChangedArgs_1.ScaleAction.rangeChanged && args.data.scale.parent.chartType != chartManagerChart_1.ChartType.XYChart) {
                var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, ChartManagerDataModelChangedHint.updateScaleRange, { data: this.data, scale: sender });
                this.onModelChanged(this, eventArgs);
            }
        };
        return ChartManagerDataModel;
    }(dataModelBase_1.DataModelBase));
    exports.ChartManagerDataModel = ChartManagerDataModel;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRNYW5hZ2VyRGF0YU1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBYUEsSUFBWSxnQ0FnQlg7SUFoQkQsV0FBWSxnQ0FBZ0M7UUFDeEMsK0ZBQVEsQ0FBQTtRQUNSLGlHQUFTLENBQUE7UUFDVCxxR0FBVyxDQUFBO1FBQ1gsK0ZBQVEsQ0FBQTtRQUNSLGlHQUFTLENBQUE7UUFDVCxxR0FBVyxDQUFBO1FBQ1gsaUdBQVMsQ0FBQTtRQUNULHVHQUFZLENBQUE7UUFDWiwrR0FBZ0IsQ0FBQTtRQUNoQix1R0FBWSxDQUFBO1FBQ1osd0dBQVksQ0FBQTtRQUNaLDhIQUF1QixDQUFBO1FBQ3ZCLHdHQUFZLENBQUE7UUFDWixrSEFBaUIsQ0FBQTtJQUVyQixDQUFDLEVBaEJXLGdDQUFnQyxHQUFoQyx3Q0FBZ0MsS0FBaEMsd0NBQWdDLFFBZ0IzQztJQUVEO1FBQTJDLHlDQUFhO1FBQXhEO1lBQUEscUVBb1ZDO1lBbFZDLFlBQU0sR0FBaUIsSUFBSSxLQUFLLEVBQWMsQ0FBQztZQUV2Qyx1QkFBaUIsR0FBcUIsSUFBSSxtQ0FBZ0IsRUFBRSxDQUFDO1lBRTdELDhCQUF3QixHQUFHLFVBQUMsTUFBTSxFQUFDLElBQUksSUFBRyxPQUFBLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLEVBQXBDLENBQW9DLENBQUM7WUFDaEYsOEJBQXdCLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFHLE9BQUEsS0FBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsRUFBcEMsQ0FBb0MsQ0FBQztZQUVyRSxvQkFBYyxHQUFHLENBQUMsQ0FBQyxDQUFDLG1EQUFtRDs7UUEyVTFGLENBQUM7UUF6VUM7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TUFBYSxFQUFFLElBQStCO1lBQ3ZFLElBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSx1Q0FBVyxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxJQUFJLDZCQUFTLENBQUMsT0FBTyxFQUFDO2dCQUNsRyxJQUFJLFNBQVMsR0FBRyxJQUFJLDBDQUFxQixDQUFDLElBQUksRUFBRSxvQ0FBZSxDQUFDLFlBQVksRUFBRSxnQ0FBZ0MsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDO2dCQUNuSyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQzthQUN0QztRQUNILENBQUM7UUFDSCw0QkFBQztJQUFELENBQUMsQUFwVkQsQ0FBMkMsNkJBQWEsR0FvVnZEO0lBcFZZLHNEQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYXJ0TWFuYWdlckRhdGEgfSBmcm9tIFwiLi9jaGFydE1hbmFnZXJEYXRhXCI7XHJcbmltcG9ydCB7IElDaGFydE1hbmFnZXJDaGFydCB9IGZyb20gXCIuL2ludGVyZmFjZXMvY2hhcnRNYW5hZ2VyQ2hhcnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgRGF0YU1vZGVsQmFzZSB9IGZyb20gXCIuLi9kYXRhTW9kZWxCYXNlXCI7XHJcbmltcG9ydCB7IElDaGFydE1hbmFnZXJEYXRhTW9kZWwgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MsIE1vZGVsQ2hhbmdlVHlwZSB9IGZyb20gXCIuLi9kYXRhTW9kZWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQmFzZVNlcmllcyB9IGZyb20gXCIuL2Jhc2VTZXJpZXNcIjtcclxuaW1wb3J0IHsgU2NhbGUgfSBmcm9tIFwiLi9zY2FsZVwiO1xyXG5pbXBvcnQgeyBFdmVudFNlcmllRGF0YUNoYW5nZWRBcmdzLCBTZXJpZUFjdGlvbiB9IGZyb20gXCIuL2V2ZW50U2VyaWVEYXRhQ2hhbmdlZEFyZ3NcIjtcclxuaW1wb3J0IHsgRXZlbnRTY2FsZURhdGFDaGFuZ2VkQXJncywgU2NhbGVBY3Rpb24gfSBmcm9tIFwiLi9ldmVudFNjYWxlRGF0YUNoYW5nZWRBcmdzXCI7XHJcbmltcG9ydCB7IENoYXJ0VHlwZSwgQ2hhcnRNYW5hZ2VyQ2hhcnQgfSBmcm9tIFwiLi9jaGFydE1hbmFnZXJDaGFydFwiO1xyXG5pbXBvcnQgeyBZVENoYXJ0IH0gZnJvbSBcIi4uLy4uL3dpZGdldHMvY2hhcnRWaWV3V2lkZ2V0L1lUQ2hhcnRcIjtcclxuXHJcblxyXG5leHBvcnQgZW51bSBDaGFydE1hbmFnZXJEYXRhTW9kZWxDaGFuZ2VkSGludHtcclxuICAgIGFkZFNlcmllLFxyXG4gICAgbW92ZVNlcmllLFxyXG4gICAgcmVtb3ZlU2VyaWUsXHJcbiAgICBhZGRDaGFydCxcclxuICAgIG1vdmVDaGFydCxcclxuICAgIHJlbW92ZUNoYXJ0LFxyXG4gICAgYWRkWVNjYWxlLFxyXG4gICAgcmVtb3ZlWVNjYWxlLFxyXG4gICAgdXBkYXRlU2NhbGVSYW5nZSxcclxuICAgIGRpc2FibGVDaGFydCwgLy9UT0RPOiBub3QgaW1wbGVtZW50ZWQgeWV0XHJcbiAgICByZW5hbWVTaWduYWwsXHJcbiAgICBzdGFydFRyaWdnZXJUaW1lQ2hhbmdlZCxcclxuICAgIGNvbG9yQ2hhbmdlZCxcclxuICAgIGRhdGFQb2ludHNDaGFuZ2VkLFxyXG5cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENoYXJ0TWFuYWdlckRhdGFNb2RlbCBleHRlbmRzIERhdGFNb2RlbEJhc2UgaW1wbGVtZW50cyBJQ2hhcnRNYW5hZ2VyRGF0YU1vZGVse1xyXG4gICAgIFxyXG4gIHNlcmllczogQmFzZVNlcmllc1tdID0gbmV3IEFycmF5PEJhc2VTZXJpZXM+KCk7XHJcblxyXG4gIHByaXZhdGUgX2NoYXJ0TWFuYWdlckRhdGE6IENoYXJ0TWFuYWdlckRhdGEgPSBuZXcgQ2hhcnRNYW5hZ2VyRGF0YSgpO1xyXG5cclxuICBwcml2YXRlIF9zZXJpZURhdGFDaGFuZ2VkSGFuZGxlciA9IChzZW5kZXIsYXJncyk9PnRoaXMub25TZXJpZURhdGFDaGFuZ2VkKHNlbmRlcixhcmdzKTtcclxuICBwdWJsaWMgX3NjYWxlRGF0YUNoYW5nZWRIYW5kbGVyID0gKHNlbmRlcixhcmdzKT0+dGhpcy5vblNjYWxlRGF0YUNoYW5nZWQoc2VuZGVyLGFyZ3MpO1xyXG5cclxuICBwcml2YXRlIHJlYWRvbmx5IF9tYXhDaGFydENvdW50ID0gNDsgLy8gQ3VycmVudGx5IGxpbWl0YXRpb24gb2YgY2hhcnRzIHRvIHRoZSBtYXguIG9mIDQgXHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXRpYWxpemVzIHRoZSBDaGFydE1hbmFnZXJEYXRhTW9kZWxcclxuICAgKlxyXG4gICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBpbml0aWFsaXplKCkge1xyXG4gICAgc3VwZXIuaW5pdGlhbGl6ZSgpO1xyXG4gICAgdGhpcy5fZGF0YSA9IHRoaXMuX2NoYXJ0TWFuYWdlckRhdGEuY2hpbGRzO1xyXG4gICAgdGhpcy5fZGF0YVNvdXJjZSA9IHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGRzIGEgY2hhcnQgdG8gdGhlIGRhdGFtb2RlbFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtJQ2hhcnRNYW5hZ2VyQ2hhcnR9IGNoYXJ0XHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XHJcbiAgICogQHJldHVybnMge2Jvb2xlYW59IGZhbHNlIGlmIGNoYXJ0IGFkZGluZyBub3QgcG9zc2libGUsIGVsc2UgdHJ1ZVxyXG4gICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBhZGRDaGFydChjaGFydCA6IElDaGFydE1hbmFnZXJDaGFydCwgaW5kZXg6IG51bWJlcik6IGJvb2xlYW57XHJcbiAgICBpZih0aGlzLl9jaGFydE1hbmFnZXJEYXRhLmNoaWxkcy5sZW5ndGggPj0gdGhpcy5fbWF4Q2hhcnRDb3VudCl7IC8vIExpbWl0YXRpb24gb2YgY2hhcnRzXHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHRoaXMuX2NoYXJ0TWFuYWdlckRhdGEuYWRkQ2hhcnQoY2hhcnQsIGluZGV4KTtcclxuXHJcbiAgICBsZXQgbWluWCA9IDA7XHJcbiAgICBsZXQgbWF4WCA9IDEwMDtcclxuXHJcbiAgICBmb3IobGV0IGNoYXJ0cyBvZiB0aGlzLmRhdGEhKXtcclxuICAgICAgaWYoKGNoYXJ0cyBhcyBDaGFydE1hbmFnZXJDaGFydCkuY2hhcnRUeXBlID09IGNoYXJ0LmNoYXJ0VHlwZSl7XHJcbiAgICAgICAgaWYoY2hhcnRzLmNoaWxkc1swXSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgbWluWCA9IGNoYXJ0cy5jaGlsZHNbMF0ubWluWFZhbHVlO1xyXG4gICAgICAgICAgbWF4WCA9IGNoYXJ0cy5jaGlsZHNbMF0ubWF4WFZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNoYXJ0LmFkZERlZmF1bHRZU2NhbGUodGhpcywgbWluWCwgbWF4WCk7XHJcbiAgICB2YXIgZXZlbnRBcmdzID0gbmV3IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyh0aGlzLCBNb2RlbENoYW5nZVR5cGUudXBkYXRlVGFyZ2V0LCBDaGFydE1hbmFnZXJEYXRhTW9kZWxDaGFuZ2VkSGludC5hZGRDaGFydCwge2RhdGE6IHRoaXMuZGF0YSwgY2hhcnQ6IGNoYXJ0LCBpbmRleDogaW5kZXgsIHR5cGU6IGNoYXJ0LmNoYXJ0VHlwZX0pO1xyXG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLCBldmVudEFyZ3MpOyAgXHJcblxyXG4gICAgbGV0IGNoaWxkc2Nsb25lID0gY2hhcnQuY2hpbGRzLnNsaWNlKCk7XHJcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgY2hpbGRzY2xvbmUubGVuZ3RoOyBpKyspe1xyXG4gICAgICBsZXQgeUF4aXMgPSBjaGlsZHNjbG9uZVtpXTtcclxuICAgICAgbGV0IHNlcmllcyA9IHlBeGlzLmNoaWxkcy5zbGljZSgpO1xyXG4gICAgICBmb3IobGV0IGogPSAwOyBqIDwgc2VyaWVzLmxlbmd0aDsgaisrKXtcclxuICAgICAgICAvLyBmaXJlIGFkZCBzZXJpZSBldmVudCBmb3IgYWxsIHNlcmllcyBvZiB0aGlzIGNoYXJ0XHJcbiAgICAgICAgdmFyIGV2ZW50QXJncyA9IG5ldyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3ModGhpcywgTW9kZWxDaGFuZ2VUeXBlLnVwZGF0ZVRhcmdldCwgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsQ2hhbmdlZEhpbnQuYWRkU2VyaWUsIHtkYXRhOiB0aGlzLmRhdGEsIGNoYXJ0OiBjaGFydCwgc2VyaWU6IHNlcmllc1tqXX0pO1xyXG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZWQodGhpcywgZXZlbnRBcmdzKTsgXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0cnVlIGlmIGEgY2hhcnQgY2FuIGJlIGFkZGVkLCBlbHNlIGZhbHNlIGlmIGNoYXJ0IGxpbWl0IHdhcyByZWFjaGVkXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgY2FuQWRkQ2hhcnQoKTpib29sZWFue1xyXG4gICAgaWYodGhpcy5fY2hhcnRNYW5hZ2VyRGF0YS5jaGlsZHMubGVuZ3RoID49IHRoaXMuX21heENoYXJ0Q291bnQpeyAvLyBMaW1pdGF0aW9uIG9mIGNoYXJ0c1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbiAgXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlcyBhIGNoYXJ0IGZyb20gdGhlIGRhdGFtb2RlbFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtJQ2hhcnRNYW5hZ2VyQ2hhcnR9IGNoYXJ0XHJcbiAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIHJlbW92ZUNoYXJ0KGNoYXJ0IDogSUNoYXJ0TWFuYWdlckNoYXJ0KXtcclxuICAgIGxldCBheGlzSW5DaGFydHMgPSBjaGFydC5nZXRDaGlsZHMoKTtcclxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBheGlzSW5DaGFydHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICB0aGlzLnJlbW92ZVlBeGlzKGNoYXJ0LCBheGlzSW5DaGFydHNbaV0pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fY2hhcnRNYW5hZ2VyRGF0YS5yZW1vdmVDaGFydChjaGFydCk7XHJcbiAgICB2YXIgZXZlbnRBcmdzID0gbmV3IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyh0aGlzLCBNb2RlbENoYW5nZVR5cGUudXBkYXRlVGFyZ2V0LCBDaGFydE1hbmFnZXJEYXRhTW9kZWxDaGFuZ2VkSGludC5yZW1vdmVDaGFydCwge2RhdGE6IHRoaXMuZGF0YSwgY2hhcnQ6IGNoYXJ0fSk7XHJcbiAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKHRoaXMsIGV2ZW50QXJncyk7ICBcclxuICB9XHJcbiAgXHJcbiAgLyoqXHJcbiAgICogTW92ZXMgYSBjaGFydCB3aXRoaW4gdGhlIGRhdGFtb2RlbFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtJQ2hhcnRNYW5hZ2VyQ2hhcnR9IGNoYXJ0XHJcbiAgICogQHBhcmFtIHtJQ2hhcnRNYW5hZ2VyQ2hhcnR9IHRhcmdldENoYXJ0XHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGluc2VydFR5cGUgZS5nIFwiaW5zZXJ0QWJvdmVcIiBvciBcImluc2VydEJlbG93XCJcclxuICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgbW92ZUNoYXJ0KGNoYXJ0IDogSUNoYXJ0TWFuYWdlckNoYXJ0LCB0YXJnZXRDaGFydCA6IElDaGFydE1hbmFnZXJDaGFydCwgaW5zZXJ0VHlwZTogc3RyaW5nKXtcclxuICAgIHRoaXMuX2NoYXJ0TWFuYWdlckRhdGEubW92ZUNoYXJ0KGNoYXJ0LCB0YXJnZXRDaGFydCwgaW5zZXJ0VHlwZSk7XHJcbiAgICB2YXIgZXZlbnRBcmdzID0gbmV3IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyh0aGlzLCBNb2RlbENoYW5nZVR5cGUudXBkYXRlVGFyZ2V0LCBDaGFydE1hbmFnZXJEYXRhTW9kZWxDaGFuZ2VkSGludC5tb3ZlQ2hhcnQsIHtkYXRhOiB0aGlzLmRhdGEsIGNoYXJ0OiBjaGFydCwgdGFyZ2V0OiB0YXJnZXRDaGFydCwgaW5zZXJ0VHlwZTogaW5zZXJ0VHlwZX0pO1xyXG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLCBldmVudEFyZ3MpOyAgXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGRzIGEgc2VyaWUgdG8gYSBjaGFydFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtJQ2hhcnRNYW5hZ2VyQ2hhcnR9IGNoYXJ0XHJcbiAgICogQHBhcmFtIHtBcnJheTxCYXNlU2VyaWVzPn0gc2VyaWVzXHJcbiAgICogQHBhcmFtIHtTY2FsZX0gc2NhbGVcclxuICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgYWRkU2VyaWVzVG9DaGFydChjaGFydDogSUNoYXJ0TWFuYWdlckNoYXJ0LCBzZXJpZXM6IEFycmF5PEJhc2VTZXJpZXM+LCBzY2FsZSA6IFNjYWxlKXtcclxuICAgIGlmKGNoYXJ0LmdldFlTY2FsZShzY2FsZS5pZCkgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgY2hhcnQuYWRkWVNjYWxlKHNjYWxlKTtcclxuICAgIH1cclxuICAgIGNoYXJ0LmFkZFNlcmllcyhzZXJpZXMsIHNjYWxlKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2VyaWVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgc2VyaWVzW2ldLmV2ZW50RGF0YUNoYW5nZWQuYXR0YWNoKHRoaXMuX3NlcmllRGF0YUNoYW5nZWRIYW5kbGVyKTtcclxuICAgIH1cclxuICAgIHZhciBldmVudEFyZ3MgPSBuZXcgRXZlbnRNb2RlbENoYW5nZWRBcmdzKHRoaXMsIE1vZGVsQ2hhbmdlVHlwZS51cGRhdGVUYXJnZXQsIENoYXJ0TWFuYWdlckRhdGFNb2RlbENoYW5nZWRIaW50LmFkZFNlcmllLCB7ZGF0YTogdGhpcy5kYXRhLCBjaGFydDogY2hhcnQsIHNlcmllczogc2VyaWVzLCBheGlzOiBzY2FsZX0pO1xyXG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLCBldmVudEFyZ3MpO1xyXG4gIH1cclxuICBcclxuICAvKipcclxuICAgKiBSZW1vdmVzIGEgc2VyaWUgZnJvbSBhIGNoYXJ0XHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0lDaGFydE1hbmFnZXJDaGFydH0gY2hhcnRcclxuICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNlcmllXHJcbiAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIHJlbW92ZVNlcmllKGNoYXJ0OiBJQ2hhcnRNYW5hZ2VyQ2hhcnQsIHNlcmllIDogQmFzZVNlcmllcyl7XHJcbiAgICBpZihjaGFydCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICBjaGFydC5yZW1vdmVTZXJpZShzZXJpZSk7XHJcbiAgICAgIGxldCBjaGFydHNXaXRoVGhpc1NlcmllID0gdGhpcy5nZXRDaGFydHNXaXRoU2VyaWUoc2VyaWUpO1xyXG4gICAgICBsZXQgc2VyaWVVc2VkID0gZmFsc2U7XHJcbiAgICAgIGlmKGNoYXJ0c1dpdGhUaGlzU2VyaWUubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgc2VyaWVVc2VkID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICBlbHNleyAvLyBTZXJpZSBub3QgdXNlZCBpbiBhbiBvdGhlciBjaGFydCA9PiBkZXRhY2ggZXZlbnRzXHJcbiAgICAgICAgc2VyaWUuZXZlbnREYXRhQ2hhbmdlZC5kZXRhY2godGhpcy5fc2VyaWVEYXRhQ2hhbmdlZEhhbmRsZXIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgZXZlbnRBcmdzID0gbmV3IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyh0aGlzLCBNb2RlbENoYW5nZVR5cGUudXBkYXRlVGFyZ2V0LCBDaGFydE1hbmFnZXJEYXRhTW9kZWxDaGFuZ2VkSGludC5yZW1vdmVTZXJpZSwge2RhdGE6IHRoaXMuZGF0YSwgY2hhcnQ6IGNoYXJ0LCBzZXJpZTogc2VyaWUsIHNpZ25hbFVzZWRJbk90aGVyQ2hhcnRzOiBzZXJpZVVzZWR9KTtcclxuICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLCBldmVudEFyZ3MpOyAgXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGRzIGEgeUF4aXMgdG8gdGhlIGdpdmVuIGNoYXJ0XHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0lDaGFydE1hbmFnZXJDaGFydH0gY2hhcnRcclxuICAgKiBAcGFyYW0ge1NjYWxlfSB5U2NhbGVcclxuICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgYWRkWVNjYWxlKGNoYXJ0OiBJQ2hhcnRNYW5hZ2VyQ2hhcnQsIHlTY2FsZTogU2NhbGUpIHtcclxuICAgIGlmKGNoYXJ0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgIGNoYXJ0LmFkZFlTY2FsZSh5U2NhbGUpO1xyXG5cclxuICAgICAgeVNjYWxlLmV2ZW50RGF0YUNoYW5nZWQuYXR0YWNoKHRoaXMuX3NjYWxlRGF0YUNoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgdmFyIGV2ZW50QXJncyA9IG5ldyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3ModGhpcywgTW9kZWxDaGFuZ2VUeXBlLnVwZGF0ZVRhcmdldCwgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsQ2hhbmdlZEhpbnQuYWRkWVNjYWxlLCB7ZGF0YTogdGhpcy5kYXRhLCBjaGFydDogY2hhcnQsIHlBeGlzOiB5U2NhbGV9KTtcclxuICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLCBldmVudEFyZ3MpOyAgXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmVzIGEgeUF4aXMgZnJvbSB0aGUgZ2l2ZW4gY2hhcnRcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7SUNoYXJ0TWFuYWdlckNoYXJ0fSBjaGFydFxyXG4gICAqIEBwYXJhbSB7U2NhbGV9IHlBeGlzXHJcbiAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIHJlbW92ZVlBeGlzKGNoYXJ0OiBJQ2hhcnRNYW5hZ2VyQ2hhcnQsIHlBeGlzOiBTY2FsZSkge1xyXG4gICAgaWYoY2hhcnQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgLy9GaXJzdCwgcmVtb3ZlIHNlcmllcyBmcm9tIFkgQXhpc1xyXG4gICAgICBsZXQgc2VyaWVzSW5BeGlzID0geUF4aXMuZ2V0Q2hpbGRzKCk7XHJcbiAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzZXJpZXNJbkF4aXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgIHRoaXMucmVtb3ZlU2VyaWUoY2hhcnQsIHNlcmllc0luQXhpc1tpXSk7XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICAgIGlmKGNoYXJ0LnJlbW92ZVlBeGlzKHlBeGlzKSA9PSB0cnVlKXtcclxuICAgICAgICB2YXIgZXZlbnRBcmdzID0gbmV3IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyh0aGlzLCBNb2RlbENoYW5nZVR5cGUudXBkYXRlVGFyZ2V0LCBDaGFydE1hbmFnZXJEYXRhTW9kZWxDaGFuZ2VkSGludC5yZW1vdmVZU2NhbGUsIHtkYXRhOiB0aGlzLmRhdGEsIGNoYXJ0OiBjaGFydCwgeUF4aXM6IHlBeGlzfSk7XHJcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLCBldmVudEFyZ3MpOyAgXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZXMgYSBzZXJpZSBmcm9tIGFsbCBjaGFydHNcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVzXHJcbiAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIHJlbW92ZVNlcmllRnJvbUFsbENoYXJ0cyhzZXJpZSA6IEJhc2VTZXJpZXNbXSl7XHJcbiAgICBmb3IobGV0IGk9MDsgaSA8IHRoaXMuX2RhdGEubGVuZ3RoOyBpKyspe1xyXG4gICAgICBsZXQgY2hhcnQgPSB0aGlzLl9kYXRhW2ldO1xyXG4gICAgICAgIGlmKGNoYXJ0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNoYXJ0LmNoaWxkcy5sZW5ndGg7IGorKyl7XHJcbiAgICAgICAgICAgIGlmKGNoYXJ0LnJlbW92ZVNlcmllKHNlcmllKSl7XHJcbiAgICAgICAgICAgICAgdmFyIGV2ZW50QXJncyA9IG5ldyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3ModGhpcywgTW9kZWxDaGFuZ2VUeXBlLnVwZGF0ZVRhcmdldCwgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsQ2hhbmdlZEhpbnQucmVtb3ZlU2VyaWUsIHtkYXRhOiB0aGlzLmRhdGEsIGNoYXJ0OiBjaGFydCwgc2VyaWU6IHNlcmllLCBzaWduYWxVc2VkSW5PdGhlckNoYXJ0czogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLCBldmVudEFyZ3MpOyAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTW92ZXMgYSBzZXJpZSBmcm9tIG9uZSBwb3NpdGlvbiB0byBhbiBvdGhlciwgd2l0aGluIGEgY2hhcnQgb3IgaW50byBhbiBvdGhlciBjaGFydCAoPT4gY3VycmVudGx5IG9ubHkgY2hhbmdlZCBldmVudCB3aWxsIHJhaXNlZCwgbW92aW5nIGlzIGRvbmUgYnkgc3luY2Z1c2lvbiB0cmVlZ3JpZCEhISkgXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0lDaGFydE1hbmFnZXJDaGFydH0gc291cmNlQ2hhcnRcclxuICAgKiBAcGFyYW0ge1NjYWxlfSBzb3VyY2VBeGlzXHJcbiAgICogQHBhcmFtIHtCYXNlU2VyaWVzfSBzZXJpZVxyXG4gICAqIEBwYXJhbSB7SUNoYXJ0TWFuYWdlckNoYXJ0fSB0YXJnZXRDaGFydFxyXG4gICAqIEBwYXJhbSB7U2NhbGV9IHRhcmdldEF4aXNcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gaW5zZXJ0VHlwZVxyXG4gICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBtb3ZlU2VyaWUoc291cmNlQ2hhcnQgOiBJQ2hhcnRNYW5hZ2VyQ2hhcnQsIHNvdXJjZUF4aXM6IFNjYWxlLCBzZXJpZTogQmFzZVNlcmllcywgdGFyZ2V0Q2hhcnQgOiBJQ2hhcnRNYW5hZ2VyQ2hhcnQsIHRhcmdldEF4aXM6IFNjYWxlLCBpbnNlcnRUeXBlOiBzdHJpbmcpe1xyXG4gICAgLy8gY3VycmVudGx5IG9ubHkgY2hhbmdlZCBldmVudCB3aWxsIHJhaXNlZCAobW92aW5nIGlzIGRvbmUgYnkgc3luY2Z1c2lvbiB0cmVlZ3JpZCEhISkgXHJcbiAgICB2YXIgZXZlbnRBcmdzID0gbmV3IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyh0aGlzLCBNb2RlbENoYW5nZVR5cGUudXBkYXRlVGFyZ2V0LCBDaGFydE1hbmFnZXJEYXRhTW9kZWxDaGFuZ2VkSGludC5tb3ZlU2VyaWUsIHtkYXRhOiB0aGlzLmRhdGEsIGNoYXJ0OiBzb3VyY2VDaGFydCwgdGFyZ2V0Q2hhcnQ6IHRhcmdldENoYXJ0LCBzZXJpZTogc2VyaWUsIHRhcmdldEF4aXM6IHRhcmdldEF4aXN9KTtcclxuICAgIHRoaXMub25Nb2RlbENoYW5nZWQodGhpcywgZXZlbnRBcmdzKTsgIFxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IHRoZSBjaGFydCBkaXNhYmxlZCBvciBlbmFibGVkXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0lDaGFydE1hbmFnZXJDaGFydH0gY2hhcnRcclxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGRpc2FibGVkXHJcbiAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIGRpc2FibGVDaGFydChjaGFydDogSUNoYXJ0TWFuYWdlckNoYXJ0LCBkaXNhYmxlZDogYm9vbGVhbil7XHJcbiAgICBjaGFydC5zZXREaXNhYmxlZChkaXNhYmxlZCk7XHJcbiAgICB2YXIgZXZlbnRBcmdzID0gbmV3IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyh0aGlzLCBNb2RlbENoYW5nZVR5cGUudXBkYXRlVGFyZ2V0LCBDaGFydE1hbmFnZXJEYXRhTW9kZWxDaGFuZ2VkSGludC5kaXNhYmxlQ2hhcnQsIHtkYXRhOiB0aGlzLmRhdGF9KTtcclxuICAgIHRoaXMub25Nb2RlbENoYW5nZWQodGhpcywgZXZlbnRBcmdzKTsgIFxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgY2hhcnQgd2l0aCB0aGUgZ2l2ZW4gbmFtZSBvciB1bmRlZmluZWQgaWYgbm90IGZvdW5kXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2hhcnROYW1lXHJcbiAgICogQHJldHVybnMgeyhJQ2hhcnRNYW5hZ2VyQ2hhcnR8dW5kZWZpbmVkKX1cclxuICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgZ2V0Q2hhcnQoY2hhcnROYW1lOiBzdHJpbmcpOiBJQ2hhcnRNYW5hZ2VyQ2hhcnR8dW5kZWZpbmVke1xyXG4gICAgZm9yIChsZXQgY2hhcnQgb2YgIHRoaXMuX2RhdGEpIHtcclxuICAgICAgaWYoY2hhcnQubmFtZSA9PSBjaGFydE5hbWUpe1xyXG4gICAgICAgIHJldHVybiBjaGFydDtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIGEgdW5pcXVlIGNoYXJ0IG5hbWUgKGUuZyBcIkNoYXJ0IDFcIiwgXCJjaGFydCAyXCIsIC4uLilcclxuICAgKlxyXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIGdldFVuaXF1ZUNoYXJ0TmFtZSgpOiBzdHJpbmd7XHJcbiAgICBmb3IodmFyIGk9MTsgMTwxMDAwOyBpKyspe1xyXG4gICAgICB2YXIgbmV3Y2hhcnROYW1lID0gXCJDaGFydCBcIitpO1xyXG4gICAgICB2YXIgY2hhcnROYW1lQWxyZWFkeUV4aXN0cyA9IGZhbHNlO1xyXG4gICAgICBmb3IgKGxldCBjaGFydCBvZiB0aGlzLl9kYXRhKXtcclxuICAgICAgICBpZihjaGFydC5uYW1lID09IG5ld2NoYXJ0TmFtZSl7XHJcbiAgICAgICAgICBjaGFydE5hbWVBbHJlYWR5RXhpc3RzID0gdHJ1ZTsgIFxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmKGNoYXJ0TmFtZUFscmVhZHlFeGlzdHMgPT0gZmFsc2UpXHJcbiAgICAgICAgcmV0dXJuIG5ld2NoYXJ0TmFtZTtcclxuICAgIH1cclxuICAgIHJldHVybiBcIkNoYXJ0IDEwMDBcIjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgYWxsIGNoYXJ0cyB3aGljaCB3b3JrIHdpdGggdGhlIGdpdmVuIHNlcmllXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0FycmF5PEJhc2VTZXJpZXM+fSBzZXJpZVxyXG4gICAqIEByZXR1cm5zIHtBcnJheTxJQ2hhcnRNYW5hZ2VyQ2hhcnQ+fVxyXG4gICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0Q2hhcnRzVXNpbmdTZXJpZShzZXJpZSA6IEFycmF5PEJhc2VTZXJpZXM+KTogQXJyYXk8SUNoYXJ0TWFuYWdlckNoYXJ0PntcclxuICAgIGxldCBjaGFydHMgPSBuZXcgQXJyYXk8SUNoYXJ0TWFuYWdlckNoYXJ0PigpO1xyXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuX2RhdGEubGVuZ3RoOyBpKyspe1xyXG4gICAgICBsZXQgY2hhcnQ6IElDaGFydE1hbmFnZXJDaGFydCA9IHRoaXMuX2RhdGFbaV07XHJcbiAgICAgIGlmKGNoYXJ0Lmhhc1NlcmllcyhzZXJpZSkpe1xyXG4gICAgICAgIGNoYXJ0cy5wdXNoKGNoYXJ0KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNoYXJ0cztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgYWxsIGNoYXJ0cyB3aGljaCBoYXZlIHRoZSBnaXZlbiBzZXJpZVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtCYXNlU2VyaWVzfSBzZXJpZVxyXG4gICAqIEByZXR1cm5zIHtBcnJheTxJQ2hhcnRNYW5hZ2VyQ2hhcnQ+fVxyXG4gICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0Q2hhcnRzV2l0aFNlcmllKHNlcmllIDogQmFzZVNlcmllcyk6IEFycmF5PElDaGFydE1hbmFnZXJDaGFydD57XHJcbiAgICBsZXQgY2hhcnRzID0gbmV3IEFycmF5PElDaGFydE1hbmFnZXJDaGFydD4oKTtcclxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLl9kYXRhLmxlbmd0aDsgaSsrKXtcclxuICAgICAgbGV0IGNoYXJ0ID0gdGhpcy5fZGF0YVtpXTtcclxuICAgICAgaWYoY2hhcnQuaGFzRXhhY3RTZXJpZShzZXJpZSkpe1xyXG4gICAgICAgIGNoYXJ0cy5wdXNoKGNoYXJ0KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNoYXJ0cztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25TZXJpZURhdGFDaGFuZ2VkKHNlbmRlcjogQmFzZVNlcmllcywgYXJnczogRXZlbnRTZXJpZURhdGFDaGFuZ2VkQXJncyl7XHJcbiAgICBpZihhcmdzLmFjdGlvbiA9PSBTZXJpZUFjdGlvbi5yZW5hbWUpe1xyXG4gICAgICB2YXIgZXZlbnRBcmdzID0gbmV3IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyh0aGlzLCBNb2RlbENoYW5nZVR5cGUudXBkYXRlVGFyZ2V0LCBDaGFydE1hbmFnZXJEYXRhTW9kZWxDaGFuZ2VkSGludC5yZW5hbWVTaWduYWwsIHtkYXRhOiB0aGlzLmRhdGF9KTtcclxuICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLCBldmVudEFyZ3MpOyAgXHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKGFyZ3MuYWN0aW9uID09IFNlcmllQWN0aW9uLnN0YXJ0VHJpZ2dlclRpbWVDaGFuZ2VkKXtcclxuICAgICAgdmFyIGV2ZW50QXJncyA9IG5ldyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3ModGhpcywgTW9kZWxDaGFuZ2VUeXBlLnVwZGF0ZVRhcmdldCwgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsQ2hhbmdlZEhpbnQuc3RhcnRUcmlnZ2VyVGltZUNoYW5nZWQsIHtkYXRhOiB0aGlzLmRhdGF9KTtcclxuICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLCBldmVudEFyZ3MpOyAgXHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKGFyZ3MuYWN0aW9uID09IFNlcmllQWN0aW9uLmNvbG9yQ2hhbmdlZCl7XHJcbiAgICAgIHZhciBldmVudEFyZ3MgPSBuZXcgRXZlbnRNb2RlbENoYW5nZWRBcmdzKHRoaXMsIE1vZGVsQ2hhbmdlVHlwZS51cGRhdGVUYXJnZXQsIENoYXJ0TWFuYWdlckRhdGFNb2RlbENoYW5nZWRIaW50LmNvbG9yQ2hhbmdlZCwge2RhdGE6IHRoaXMuZGF0YX0pO1xyXG4gICAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKHRoaXMsIGV2ZW50QXJncyk7ICBcclxuICAgIH1cclxuICAgIGVsc2UgaWYoYXJncy5hY3Rpb24gPT0gU2VyaWVBY3Rpb24uZGF0YVBvaW50c0NoYW5nZWQpeyAvLyBOZWVkZWQgZm9yIHNob3dpbmcgY29ycmVjdCB2YWxpZC9pbnZhbGlkIGljb24gaW4gY2hhcnRtYW5hZ2VyIGlmIGRhdGEgY2hhbmdlc1xyXG4gICAgICB2YXIgZXZlbnRBcmdzID0gbmV3IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyh0aGlzLCBNb2RlbENoYW5nZVR5cGUudXBkYXRlVGFyZ2V0LCBDaGFydE1hbmFnZXJEYXRhTW9kZWxDaGFuZ2VkSGludC5kYXRhUG9pbnRzQ2hhbmdlZCwge2RhdGE6IHRoaXMuZGF0YX0pO1xyXG4gICAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKHRoaXMsIGV2ZW50QXJncyk7ICBcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25TY2FsZURhdGFDaGFuZ2VkKHNlbmRlcjogU2NhbGUsIGFyZ3M6IEV2ZW50U2NhbGVEYXRhQ2hhbmdlZEFyZ3Mpe1xyXG4gICAgaWYoYXJncy5hY3Rpb24gPT0gU2NhbGVBY3Rpb24ucmFuZ2VDaGFuZ2VkICYmIGFyZ3MuZGF0YS5zY2FsZS5wYXJlbnQuY2hhcnRUeXBlICE9IENoYXJ0VHlwZS5YWUNoYXJ0KXtcclxuICAgICAgdmFyIGV2ZW50QXJncyA9IG5ldyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3ModGhpcywgTW9kZWxDaGFuZ2VUeXBlLnVwZGF0ZVRhcmdldCwgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsQ2hhbmdlZEhpbnQudXBkYXRlU2NhbGVSYW5nZSwge2RhdGE6IHRoaXMuZGF0YSwgc2NhbGU6IHNlbmRlcn0pO1xyXG4gICAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKHRoaXMsIGV2ZW50QXJncyk7ICBcclxuICAgIH1cclxuICB9XHJcbn0iXX0=