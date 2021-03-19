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
define(["require", "exports", "./chartManagerData", "../dataModelBase", "../dataModelInterface", "./scale", "./eventSerieDataChangedArgs", "./eventScaleDataChangedArgs", "./chartManagerChart", "../common/seriesProvider/seriesProvider"], function (require, exports, chartManagerData_1, dataModelBase_1, dataModelInterface_1, scale_1, eventSerieDataChangedArgs_1, eventScaleDataChangedArgs_1, chartManagerChart_1, seriesProvider_1) {
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
            this._data = this._chartManagerData.childs;
            _super.prototype.initialize.call(this);
            this._dataSource = this;
            _super.prototype.initialize.call(this);
        };
        ChartManagerDataModel.prototype.initializeComponent = function () {
            this.component.disablePersisting();
        };
        ChartManagerDataModel.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this.clear();
        };
        ChartManagerDataModel.prototype.clear = function () {
            // Remove all charts
            if (this.data != undefined) {
                for (var i = this.data.length - 1; i >= 0; i--) {
                    this.removeChart(this.data[i]);
                }
            }
        };
        ChartManagerDataModel.prototype.getComponentSettings = function () {
            var chartList = new Array();
            // export data
            this.data.forEach(function (child) {
                chartList.push(child.getSettings());
            });
            this.component.setSetting("dataModel", chartList);
            return _super.prototype.getComponentSettings.call(this);
        };
        ChartManagerDataModel.prototype.setComponentSettings = function (componentSettings) {
            var _this = this;
            _super.prototype.setComponentSettings.call(this, componentSettings);
            var dataModel = this.component.getSetting("dataModel");
            // Reset the data of this datamodel
            this.clear();
            // import data
            dataModel.forEach(function (chart) {
                var newChart = new chartManagerChart_1.ChartManagerChart("");
                newChart.setSettings(chart);
                _this.addChart(newChart, -1);
                // TODO: Set scales to chart within setSettings method of chart
                var scales = chart.data["scales"];
                var _loop_1 = function (i) {
                    var scale = scales[i];
                    var newScale;
                    if (i == 0) {
                        // Set scale data to already available default scale
                        newScale = newChart.childs[0];
                        newScale.setSettings(scale);
                    }
                    else {
                        // Add new scale
                        newScale = new scale_1.Scale("", newChart);
                        newScale.setSettings(scale);
                        newChart.addYScale(newScale);
                    }
                    // TODO: Set series to scale within setSettings method of scale
                    var seriesIds = scale.data["seriesIds"];
                    seriesIds.forEach(function (seriesId) {
                        var series = seriesProvider_1.SeriesProvider.getInstance().get(seriesId);
                        if (series != undefined) {
                            _this.addSeriesToChart(newChart, [series], newScale);
                        }
                    });
                };
                for (var i = 0; i < scales.length; i++) {
                    _loop_1(i);
                }
                ;
            });
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
            var data = this.data;
            if (data.length >= this._maxChartCount) { // Limitation of charts
                return false;
            }
            this._chartManagerData.addChart(chart, index);
            var minX = 0;
            var maxX = 100;
            for (var _i = 0, _a = data; _i < _a.length; _i++) {
                var charts = _a[_i];
                if (charts.chartType == chart.chartType) {
                    if (charts.childs[0] != undefined) {
                        minX = charts.childs[0].minXValue;
                        maxX = charts.childs[0].maxXValue;
                    }
                }
            }
            chart.addDefaultYScale(this, minX, maxX);
            var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, ChartManagerDataModelChangedHint.addChart, { data: data, chart: chart, index: index, type: chart.chartType });
            this.onModelChanged(this, eventArgs);
            var childsclone = chart.childs.slice();
            for (var i = 0; i < childsclone.length; i++) {
                var yAxis = childsclone[i];
                var series = yAxis.childs.slice();
                for (var j = 0; j < series.length; j++) {
                    // fire add serie event for all series of this chart
                    var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, ChartManagerDataModelChangedHint.addSerie, { data: data, chart: chart, serie: series[j] });
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
            if (this.data.length >= this._maxChartCount) { // Limitation of charts
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
            for (var i = 0; i < this.data.length; i++) {
                var chart = this.data[i];
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
            for (var _i = 0, _a = this.data; _i < _a.length; _i++) {
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
                for (var _i = 0, _a = this.data; _i < _a.length; _i++) {
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
            for (var i = 0; i < this.data.length; i++) {
                var chart = this.data[i];
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
            for (var i = 0; i < this.data.length; i++) {
                var chart = this.data[i];
                if (chart.hasSerie(serie)) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRNYW5hZ2VyRGF0YU1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBZUEsSUFBWSxnQ0FnQlg7SUFoQkQsV0FBWSxnQ0FBZ0M7UUFDeEMsK0ZBQVEsQ0FBQTtRQUNSLGlHQUFTLENBQUE7UUFDVCxxR0FBVyxDQUFBO1FBQ1gsK0ZBQVEsQ0FBQTtRQUNSLGlHQUFTLENBQUE7UUFDVCxxR0FBVyxDQUFBO1FBQ1gsaUdBQVMsQ0FBQTtRQUNULHVHQUFZLENBQUE7UUFDWiwrR0FBZ0IsQ0FBQTtRQUNoQix1R0FBWSxDQUFBO1FBQ1osd0dBQVksQ0FBQTtRQUNaLDhIQUF1QixDQUFBO1FBQ3ZCLHdHQUFZLENBQUE7UUFDWixrSEFBaUIsQ0FBQTtJQUVyQixDQUFDLEVBaEJXLGdDQUFnQyxHQUFoQyx3Q0FBZ0MsS0FBaEMsd0NBQWdDLFFBZ0IzQztJQUVEO1FBQTJDLHlDQUFhO1FBQXhEO1lBQUEscUVBNFpDO1lBMVpDLFlBQU0sR0FBaUIsSUFBSSxLQUFLLEVBQWMsQ0FBQztZQUV2Qyx1QkFBaUIsR0FBcUIsSUFBSSxtQ0FBZ0IsRUFBRSxDQUFDO1lBRTdELDhCQUF3QixHQUFHLFVBQUMsTUFBTSxFQUFDLElBQUksSUFBRyxPQUFBLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLEVBQXBDLENBQW9DLENBQUM7WUFDaEYsOEJBQXdCLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFHLE9BQUEsS0FBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsRUFBcEMsQ0FBb0MsQ0FBQztZQUVyRSxvQkFBYyxHQUFHLENBQUMsQ0FBQyxDQUFDLG1EQUFtRDs7UUFtWjFGLENBQUM7UUFqWkM7Ozs7V0FJRztRQUNILDBDQUFVLEdBQVY7WUFDRSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUM7WUFDM0MsaUJBQU0sVUFBVSxXQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7WUFDeEIsaUJBQU0sVUFBVSxXQUFFLENBQUM7UUFDckIsQ0FBQztRQUVELG1EQUFtQixHQUFuQjtZQUNFLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUNyQyxDQUFDO1FBRUQsdUNBQU8sR0FBUDtZQUNFLGlCQUFNLE9BQU8sV0FBRSxDQUFDO1lBQ2hCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNmLENBQUM7UUFFTSxxQ0FBSyxHQUFaO1lBQ0Usb0JBQW9CO1lBQ3BCLElBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxTQUFTLEVBQUM7Z0JBQ3hCLEtBQUksSUFBSSxDQUFDLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUM7b0JBQ3hDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNoQzthQUNGO1FBQ0gsQ0FBQztRQUVELG9EQUFvQixHQUFwQjtZQUNFLElBQUksU0FBUyxHQUFHLElBQUksS0FBSyxFQUFPLENBQUM7WUFDakMsY0FBYztZQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSztnQkFDckIsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztZQUN0QyxDQUFDLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUNsRCxPQUFPLGlCQUFNLG9CQUFvQixXQUFFLENBQUM7UUFDdEMsQ0FBQztRQUVELG9EQUFvQixHQUFwQixVQUFxQixpQkFBb0M7WUFBekQsaUJBdUNDO1lBdENDLGlCQUFNLG9CQUFvQixZQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDOUMsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDdkQsbUNBQW1DO1lBQ25DLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUViLGNBQWM7WUFDaEIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUs7Z0JBQ25CLElBQUksUUFBUSxHQUFHLElBQUkscUNBQWlCLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3pDLFFBQVEsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzVCLEtBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRTVCLCtEQUErRDtnQkFDL0QsSUFBSSxNQUFNLEdBQXFCLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7d0NBQzVDLENBQUM7b0JBQ1AsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN0QixJQUFJLFFBQVEsQ0FBQztvQkFDYixJQUFHLENBQUMsSUFBSSxDQUFDLEVBQUM7d0JBQ1Isb0RBQW9EO3dCQUNwRCxRQUFRLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDOUIsUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztxQkFDN0I7eUJBQ0c7d0JBQ0YsZ0JBQWdCO3dCQUNoQixRQUFRLEdBQUcsSUFBSSxhQUFLLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO3dCQUNuQyxRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUM1QixRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO3FCQUM5QjtvQkFFRCwrREFBK0Q7b0JBQy9ELElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQ3hDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQSxRQUFRO3dCQUN4QixJQUFJLE1BQU0sR0FBRywrQkFBYyxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDeEQsSUFBRyxNQUFNLElBQUksU0FBUyxFQUFDOzRCQUNyQixLQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7eUJBQ3BEO29CQUNILENBQUMsQ0FBQyxDQUFDOztnQkF0QkwsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFOzRCQUE3QixDQUFDO2lCQXVCUjtnQkFBQSxDQUFDO1lBQ04sQ0FBQyxDQUFDLENBQUM7UUFDSCxDQUFDO1FBR0Q7Ozs7Ozs7V0FPRztRQUNILHdDQUFRLEdBQVIsVUFBUyxLQUEwQixFQUFFLEtBQWE7WUFDaEQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNyQixJQUFHLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBQyxFQUFFLHVCQUF1QjtnQkFDN0QsT0FBTyxLQUFLLENBQUM7YUFDZDtZQUNELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBRTlDLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQztZQUNiLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQztZQUVmLEtBQWtCLFVBQUssRUFBTCxLQUFBLElBQUssRUFBTCxjQUFLLEVBQUwsSUFBSyxFQUFDO2dCQUFwQixJQUFJLE1BQU0sU0FBQTtnQkFDWixJQUFJLE1BQTRCLENBQUMsU0FBUyxJQUFJLEtBQUssQ0FBQyxTQUFTLEVBQUM7b0JBQzVELElBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLEVBQUM7d0JBQy9CLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQzt3QkFDbEMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO3FCQUNuQztpQkFDRjthQUNGO1lBRUQsS0FBSyxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDekMsSUFBSSxTQUFTLEdBQUcsSUFBSSwwQ0FBcUIsQ0FBQyxJQUFJLEVBQUUsb0NBQWUsQ0FBQyxZQUFZLEVBQUUsZ0NBQWdDLENBQUMsUUFBUSxFQUFFLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxTQUFTLEVBQUMsQ0FBQyxDQUFDO1lBQzFMLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBRXJDLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDdkMsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQ3pDLElBQUksS0FBSyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0IsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDbEMsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7b0JBQ3BDLG9EQUFvRDtvQkFDcEQsSUFBSSxTQUFTLEdBQUcsSUFBSSwwQ0FBcUIsQ0FBQyxJQUFJLEVBQUUsb0NBQWUsQ0FBQyxZQUFZLEVBQUUsZ0NBQWdDLENBQUMsUUFBUSxFQUFFLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO29CQUN2SyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztpQkFDdEM7YUFDRjtZQUNELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gsMkNBQVcsR0FBWDtZQUNFLElBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBQyxFQUFFLHVCQUF1QjtnQkFDbEUsT0FBTyxLQUFLLENBQUM7YUFDZDtZQUNELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gsMkNBQVcsR0FBWCxVQUFZLEtBQTBCO1lBQ3BDLElBQUksWUFBWSxHQUFHLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNyQyxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztnQkFDMUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDMUM7WUFDRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzFDLElBQUksU0FBUyxHQUFHLElBQUksMENBQXFCLENBQUMsSUFBSSxFQUFFLG9DQUFlLENBQUMsWUFBWSxFQUFFLGdDQUFnQyxDQUFDLFdBQVcsRUFBRSxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO1lBQzdKLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZDLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0gseUNBQVMsR0FBVCxVQUFVLEtBQTBCLEVBQUUsV0FBZ0MsRUFBRSxVQUFrQjtZQUN4RixJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDakUsSUFBSSxTQUFTLEdBQUcsSUFBSSwwQ0FBcUIsQ0FBQyxJQUFJLEVBQUUsb0NBQWUsQ0FBQyxZQUFZLEVBQUUsZ0NBQWdDLENBQUMsU0FBUyxFQUFFLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUMsQ0FBQyxDQUFDO1lBQ3hNLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZDLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0gsZ0RBQWdCLEdBQWhCLFVBQWlCLEtBQXlCLEVBQUUsTUFBeUIsRUFBRSxLQUFhO1lBQ2xGLElBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksU0FBUyxFQUFDO2dCQUN4QyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3hCO1lBQ0QsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDL0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQ3JDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM7YUFDbEU7WUFDRCxJQUFJLFNBQVMsR0FBRyxJQUFJLDBDQUFxQixDQUFDLElBQUksRUFBRSxvQ0FBZSxDQUFDLFlBQVksRUFBRSxnQ0FBZ0MsQ0FBQyxRQUFRLEVBQUUsRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7WUFDdkwsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDdkMsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNILDJDQUFXLEdBQVgsVUFBWSxLQUF5QixFQUFFLEtBQWtCO1lBQ3ZELElBQUcsS0FBSyxJQUFJLFNBQVMsRUFBQztnQkFDcEIsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDekIsSUFBSSxtQkFBbUIsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3pELElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQztnQkFDdEIsSUFBRyxtQkFBbUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDO29CQUNoQyxTQUFTLEdBQUcsSUFBSSxDQUFDO2lCQUNsQjtxQkFDRyxFQUFFLG9EQUFvRDtvQkFDeEQsS0FBSyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQztpQkFDOUQ7Z0JBRUQsSUFBSSxTQUFTLEdBQUcsSUFBSSwwQ0FBcUIsQ0FBQyxJQUFJLEVBQUUsb0NBQWUsQ0FBQyxZQUFZLEVBQUUsZ0NBQWdDLENBQUMsV0FBVyxFQUFFLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBQyxDQUFDLENBQUM7Z0JBQy9NLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO2FBQ3RDO1FBQ0gsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNILHlDQUFTLEdBQVQsVUFBVSxLQUF5QixFQUFFLE1BQWE7WUFDaEQsSUFBRyxLQUFLLElBQUksU0FBUyxFQUFDO2dCQUNwQixLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUV4QixNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO2dCQUM5RCxJQUFJLFNBQVMsR0FBRyxJQUFJLDBDQUFxQixDQUFDLElBQUksRUFBRSxvQ0FBZSxDQUFDLFlBQVksRUFBRSxnQ0FBZ0MsQ0FBQyxTQUFTLEVBQUUsRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDO2dCQUMxSyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQzthQUN0QztRQUNILENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSCwyQ0FBVyxHQUFYLFVBQVksS0FBeUIsRUFBRSxLQUFZO1lBQ2pELElBQUcsS0FBSyxJQUFJLFNBQVMsRUFBQztnQkFDcEIsa0NBQWtDO2dCQUNsQyxJQUFJLFlBQVksR0FBRyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ3JDLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO29CQUMxQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDMUM7Z0JBRUQsSUFBRyxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksRUFBQztvQkFDbEMsSUFBSSxTQUFTLEdBQUcsSUFBSSwwQ0FBcUIsQ0FBQyxJQUFJLEVBQUUsb0NBQWUsQ0FBQyxZQUFZLEVBQUUsZ0NBQWdDLENBQUMsWUFBWSxFQUFFLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztvQkFDNUssSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7aUJBQ3RDO2FBQ0Y7UUFDSCxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSCx3REFBd0IsR0FBeEIsVUFBeUIsS0FBb0I7WUFDM0MsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUNyQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixJQUFHLEtBQUssSUFBSSxTQUFTLEVBQUM7b0JBQ3BCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQzt3QkFDM0MsSUFBRyxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFDOzRCQUMxQixJQUFJLFNBQVMsR0FBRyxJQUFJLDBDQUFxQixDQUFDLElBQUksRUFBRSxvQ0FBZSxDQUFDLFlBQVksRUFBRSxnQ0FBZ0MsQ0FBQyxXQUFXLEVBQUUsRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsdUJBQXVCLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQzs0QkFDNU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7eUJBQ3RDO3FCQUNGO2lCQUNKO2FBQ0Y7UUFDSCxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILHlDQUFTLEdBQVQsVUFBVSxXQUFnQyxFQUFFLFVBQWlCLEVBQUUsS0FBaUIsRUFBRSxXQUFnQyxFQUFFLFVBQWlCLEVBQUUsVUFBa0I7WUFDdkosdUZBQXVGO1lBQ3ZGLElBQUksU0FBUyxHQUFHLElBQUksMENBQXFCLENBQUMsSUFBSSxFQUFFLG9DQUFlLENBQUMsWUFBWSxFQUFFLGdDQUFnQyxDQUFDLFNBQVMsRUFBRSxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUMsQ0FBQyxDQUFDO1lBQ2pPLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZDLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSCw0Q0FBWSxHQUFaLFVBQWEsS0FBeUIsRUFBRSxRQUFpQjtZQUN2RCxLQUFLLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzVCLElBQUksU0FBUyxHQUFHLElBQUksMENBQXFCLENBQUMsSUFBSSxFQUFFLG9DQUFlLENBQUMsWUFBWSxFQUFFLGdDQUFnQyxDQUFDLFlBQVksRUFBRSxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQztZQUNoSixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN2QyxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0gsd0NBQVEsR0FBUixVQUFTLFNBQWlCO1lBQ3hCLEtBQW1CLFVBQVMsRUFBVCxLQUFBLElBQUksQ0FBQyxJQUFJLEVBQVQsY0FBUyxFQUFULElBQVMsRUFBRTtnQkFBekIsSUFBSSxLQUFLLFNBQUE7Z0JBQ1osSUFBRyxLQUFLLENBQUMsSUFBSSxJQUFJLFNBQVMsRUFBQztvQkFDekIsT0FBTyxLQUFLLENBQUM7aUJBQ2Q7YUFDRjtZQUFBLENBQUM7WUFDRixPQUFPLFNBQVMsQ0FBQztRQUNuQixDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSCxrREFBa0IsR0FBbEI7WUFDRSxLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUN2QixJQUFJLFlBQVksR0FBRyxRQUFRLEdBQUMsQ0FBQyxDQUFDO2dCQUM5QixJQUFJLHNCQUFzQixHQUFHLEtBQUssQ0FBQztnQkFDbkMsS0FBa0IsVUFBUyxFQUFULEtBQUEsSUFBSSxDQUFDLElBQUksRUFBVCxjQUFTLEVBQVQsSUFBUyxFQUFDO29CQUF2QixJQUFJLEtBQUssU0FBQTtvQkFDWixJQUFHLEtBQUssQ0FBQyxJQUFJLElBQUksWUFBWSxFQUFDO3dCQUM1QixzQkFBc0IsR0FBRyxJQUFJLENBQUM7d0JBQzlCLE1BQU07cUJBQ1A7aUJBQ0Y7Z0JBQ0QsSUFBRyxzQkFBc0IsSUFBSSxLQUFLO29CQUNoQyxPQUFPLFlBQVksQ0FBQzthQUN2QjtZQUNELE9BQU8sWUFBWSxDQUFDO1FBQ3RCLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSSxtREFBbUIsR0FBMUIsVUFBMkIsS0FBeUI7WUFDbEQsSUFBSSxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQXNCLENBQUM7WUFDN0MsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUN2QyxJQUFJLEtBQUssR0FBdUIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0MsSUFBRyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFDO29CQUN4QixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNwQjthQUNGO1lBQ0QsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNJLGtEQUFrQixHQUF6QixVQUEwQixLQUFrQjtZQUMxQyxJQUFJLE1BQU0sR0FBRyxJQUFJLEtBQUssRUFBc0IsQ0FBQztZQUM3QyxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQ3ZDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLElBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBQztvQkFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDcEI7YUFDRjtZQUNELE9BQU8sTUFBTSxDQUFDO1FBQ2hCLENBQUM7UUFFTyxrREFBa0IsR0FBMUIsVUFBMkIsTUFBa0IsRUFBRSxJQUErQjtZQUM1RSxJQUFHLElBQUksQ0FBQyxNQUFNLElBQUksdUNBQVcsQ0FBQyxNQUFNLEVBQUM7Z0JBQ25DLElBQUksU0FBUyxHQUFHLElBQUksMENBQXFCLENBQUMsSUFBSSxFQUFFLG9DQUFlLENBQUMsWUFBWSxFQUFFLGdDQUFnQyxDQUFDLFlBQVksRUFBRSxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQztnQkFDaEosSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7YUFDdEM7aUJBQ0ksSUFBRyxJQUFJLENBQUMsTUFBTSxJQUFJLHVDQUFXLENBQUMsdUJBQXVCLEVBQUM7Z0JBQ3pELElBQUksU0FBUyxHQUFHLElBQUksMENBQXFCLENBQUMsSUFBSSxFQUFFLG9DQUFlLENBQUMsWUFBWSxFQUFFLGdDQUFnQyxDQUFDLHVCQUF1QixFQUFFLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDO2dCQUMzSixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQzthQUN0QztpQkFDSSxJQUFHLElBQUksQ0FBQyxNQUFNLElBQUksdUNBQVcsQ0FBQyxZQUFZLEVBQUM7Z0JBQzlDLElBQUksU0FBUyxHQUFHLElBQUksMENBQXFCLENBQUMsSUFBSSxFQUFFLG9DQUFlLENBQUMsWUFBWSxFQUFFLGdDQUFnQyxDQUFDLFlBQVksRUFBRSxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQztnQkFDaEosSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7YUFDdEM7aUJBQ0ksSUFBRyxJQUFJLENBQUMsTUFBTSxJQUFJLHVDQUFXLENBQUMsaUJBQWlCLEVBQUMsRUFBRSxnRkFBZ0Y7Z0JBQ3JJLElBQUksU0FBUyxHQUFHLElBQUksMENBQXFCLENBQUMsSUFBSSxFQUFFLG9DQUFlLENBQUMsWUFBWSxFQUFFLGdDQUFnQyxDQUFDLGlCQUFpQixFQUFFLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDO2dCQUNySixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQzthQUN0QztRQUNILENBQUM7UUFFTyxrREFBa0IsR0FBMUIsVUFBMkIsTUFBYSxFQUFFLElBQStCO1lBQ3ZFLElBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSx1Q0FBVyxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxJQUFJLDZCQUFTLENBQUMsT0FBTyxFQUFDO2dCQUNsRyxJQUFJLFNBQVMsR0FBRyxJQUFJLDBDQUFxQixDQUFDLElBQUksRUFBRSxvQ0FBZSxDQUFDLFlBQVksRUFBRSxnQ0FBZ0MsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDO2dCQUNuSyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQzthQUN0QztRQUNILENBQUM7UUFDSCw0QkFBQztJQUFELENBQUMsQUE1WkQsQ0FBMkMsNkJBQWEsR0E0WnZEO0lBNVpZLHNEQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYXJ0TWFuYWdlckRhdGEgfSBmcm9tIFwiLi9jaGFydE1hbmFnZXJEYXRhXCI7XHJcbmltcG9ydCB7IElDaGFydE1hbmFnZXJDaGFydCB9IGZyb20gXCIuL2ludGVyZmFjZXMvY2hhcnRNYW5hZ2VyQ2hhcnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgRGF0YU1vZGVsQmFzZSB9IGZyb20gXCIuLi9kYXRhTW9kZWxCYXNlXCI7XHJcbmltcG9ydCB7IElDaGFydE1hbmFnZXJEYXRhTW9kZWwgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MsIE1vZGVsQ2hhbmdlVHlwZSB9IGZyb20gXCIuLi9kYXRhTW9kZWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQmFzZVNlcmllcyB9IGZyb20gXCIuL2Jhc2VTZXJpZXNcIjtcclxuaW1wb3J0IHsgU2NhbGUgfSBmcm9tIFwiLi9zY2FsZVwiO1xyXG5pbXBvcnQgeyBFdmVudFNlcmllRGF0YUNoYW5nZWRBcmdzLCBTZXJpZUFjdGlvbiB9IGZyb20gXCIuL2V2ZW50U2VyaWVEYXRhQ2hhbmdlZEFyZ3NcIjtcclxuaW1wb3J0IHsgRXZlbnRTY2FsZURhdGFDaGFuZ2VkQXJncywgU2NhbGVBY3Rpb24gfSBmcm9tIFwiLi9ldmVudFNjYWxlRGF0YUNoYW5nZWRBcmdzXCI7XHJcbmltcG9ydCB7IENoYXJ0VHlwZSwgQ2hhcnRNYW5hZ2VyQ2hhcnQgfSBmcm9tIFwiLi9jaGFydE1hbmFnZXJDaGFydFwiO1xyXG5pbXBvcnQgeyBTZXJpZXNQcm92aWRlciB9IGZyb20gXCIuLi9jb21tb24vc2VyaWVzUHJvdmlkZXIvc2VyaWVzUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgSVNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9pbnRlcmZhY2VzL3NldHRpbmdzSW50ZXJmYWNlXCI7XHJcblxyXG5cclxuZXhwb3J0IGVudW0gQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsQ2hhbmdlZEhpbnR7XHJcbiAgICBhZGRTZXJpZSxcclxuICAgIG1vdmVTZXJpZSxcclxuICAgIHJlbW92ZVNlcmllLFxyXG4gICAgYWRkQ2hhcnQsXHJcbiAgICBtb3ZlQ2hhcnQsXHJcbiAgICByZW1vdmVDaGFydCxcclxuICAgIGFkZFlTY2FsZSxcclxuICAgIHJlbW92ZVlTY2FsZSxcclxuICAgIHVwZGF0ZVNjYWxlUmFuZ2UsXHJcbiAgICBkaXNhYmxlQ2hhcnQsIC8vVE9ETzogbm90IGltcGxlbWVudGVkIHlldFxyXG4gICAgcmVuYW1lU2lnbmFsLFxyXG4gICAgc3RhcnRUcmlnZ2VyVGltZUNoYW5nZWQsXHJcbiAgICBjb2xvckNoYW5nZWQsXHJcbiAgICBkYXRhUG9pbnRzQ2hhbmdlZCxcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDaGFydE1hbmFnZXJEYXRhTW9kZWwgZXh0ZW5kcyBEYXRhTW9kZWxCYXNlIGltcGxlbWVudHMgSUNoYXJ0TWFuYWdlckRhdGFNb2RlbHtcclxuICAgICBcclxuICBzZXJpZXM6IEJhc2VTZXJpZXNbXSA9IG5ldyBBcnJheTxCYXNlU2VyaWVzPigpO1xyXG5cclxuICBwcml2YXRlIF9jaGFydE1hbmFnZXJEYXRhOiBDaGFydE1hbmFnZXJEYXRhID0gbmV3IENoYXJ0TWFuYWdlckRhdGEoKTtcclxuXHJcbiAgcHJpdmF0ZSBfc2VyaWVEYXRhQ2hhbmdlZEhhbmRsZXIgPSAoc2VuZGVyLGFyZ3MpPT50aGlzLm9uU2VyaWVEYXRhQ2hhbmdlZChzZW5kZXIsYXJncyk7XHJcbiAgcHVibGljIF9zY2FsZURhdGFDaGFuZ2VkSGFuZGxlciA9IChzZW5kZXIsYXJncyk9PnRoaXMub25TY2FsZURhdGFDaGFuZ2VkKHNlbmRlcixhcmdzKTtcclxuXHJcbiAgcHJpdmF0ZSByZWFkb25seSBfbWF4Q2hhcnRDb3VudCA9IDQ7IC8vIEN1cnJlbnRseSBsaW1pdGF0aW9uIG9mIGNoYXJ0cyB0byB0aGUgbWF4LiBvZiA0IFxyXG5cclxuICAvKipcclxuICAgKiBJbml0aWFsaXplcyB0aGUgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICpcclxuICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgaW5pdGlhbGl6ZSgpIHtcclxuICAgIHRoaXMuX2RhdGEgPSB0aGlzLl9jaGFydE1hbmFnZXJEYXRhLmNoaWxkcztcclxuICAgIHN1cGVyLmluaXRpYWxpemUoKTtcclxuICAgIHRoaXMuX2RhdGFTb3VyY2UgPSB0aGlzO1xyXG4gICAgc3VwZXIuaW5pdGlhbGl6ZSgpO1xyXG4gIH1cclxuXHJcbiAgaW5pdGlhbGl6ZUNvbXBvbmVudCgpe1xyXG4gICAgdGhpcy5jb21wb25lbnQuZGlzYWJsZVBlcnNpc3RpbmcoKTtcclxuICB9XHJcblxyXG4gIGRpc3Bvc2UoKXtcclxuICAgIHN1cGVyLmRpc3Bvc2UoKTtcclxuICAgIHRoaXMuY2xlYXIoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjbGVhcigpe1xyXG4gICAgLy8gUmVtb3ZlIGFsbCBjaGFydHNcclxuICAgIGlmKHRoaXMuZGF0YSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICBmb3IobGV0IGk9dGhpcy5kYXRhLmxlbmd0aC0xOyBpID49IDA7IGktLSl7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVDaGFydCh0aGlzLmRhdGFbaV0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRDb21wb25lbnRTZXR0aW5ncygpOiBDb21wb25lbnRTZXR0aW5ncyB7XHJcbiAgICBsZXQgY2hhcnRMaXN0ID0gbmV3IEFycmF5PGFueT4oKTtcclxuICAgIC8vIGV4cG9ydCBkYXRhXHJcbiAgICB0aGlzLmRhdGEuZm9yRWFjaChjaGlsZCA9PiB7XHJcbiAgICAgIGNoYXJ0TGlzdC5wdXNoKGNoaWxkLmdldFNldHRpbmdzKCkpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmNvbXBvbmVudC5zZXRTZXR0aW5nKFwiZGF0YU1vZGVsXCIsIGNoYXJ0TGlzdCk7XHJcbiAgICByZXR1cm4gc3VwZXIuZ2V0Q29tcG9uZW50U2V0dGluZ3MoKTtcclxuICB9XHJcblxyXG4gIHNldENvbXBvbmVudFNldHRpbmdzKGNvbXBvbmVudFNldHRpbmdzOiBDb21wb25lbnRTZXR0aW5ncykge1xyXG4gICAgc3VwZXIuc2V0Q29tcG9uZW50U2V0dGluZ3MoY29tcG9uZW50U2V0dGluZ3MpO1xyXG4gICAgbGV0IGRhdGFNb2RlbCA9IHRoaXMuY29tcG9uZW50LmdldFNldHRpbmcoXCJkYXRhTW9kZWxcIik7XHJcbiAgICAvLyBSZXNldCB0aGUgZGF0YSBvZiB0aGlzIGRhdGFtb2RlbFxyXG4gICAgdGhpcy5jbGVhcigpO1xyXG4gICAgXHJcbiAgICAvLyBpbXBvcnQgZGF0YVxyXG5cdFx0ZGF0YU1vZGVsLmZvckVhY2goY2hhcnQgPT4ge1xyXG4gICAgICBsZXQgbmV3Q2hhcnQgPSBuZXcgQ2hhcnRNYW5hZ2VyQ2hhcnQoXCJcIik7XHJcbiAgICAgIG5ld0NoYXJ0LnNldFNldHRpbmdzKGNoYXJ0KTtcclxuICAgICAgdGhpcy5hZGRDaGFydChuZXdDaGFydCwgLTEpO1xyXG5cclxuICAgICAgLy8gVE9ETzogU2V0IHNjYWxlcyB0byBjaGFydCB3aXRoaW4gc2V0U2V0dGluZ3MgbWV0aG9kIG9mIGNoYXJ0XHJcbiAgICAgIGxldCBzY2FsZXM6IEFycmF5PElTZXR0aW5ncz4gPSBjaGFydC5kYXRhW1wic2NhbGVzXCJdO1xyXG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2NhbGVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICBsZXQgc2NhbGUgPSBzY2FsZXNbaV07XHJcbiAgICAgICAgbGV0IG5ld1NjYWxlO1xyXG4gICAgICAgIGlmKGkgPT0gMCl7XHJcbiAgICAgICAgICAvLyBTZXQgc2NhbGUgZGF0YSB0byBhbHJlYWR5IGF2YWlsYWJsZSBkZWZhdWx0IHNjYWxlXHJcbiAgICAgICAgICBuZXdTY2FsZSA9IG5ld0NoYXJ0LmNoaWxkc1swXTtcclxuICAgICAgICAgIG5ld1NjYWxlLnNldFNldHRpbmdzKHNjYWxlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgIC8vIEFkZCBuZXcgc2NhbGVcclxuICAgICAgICAgIG5ld1NjYWxlID0gbmV3IFNjYWxlKFwiXCIsIG5ld0NoYXJ0KTtcclxuICAgICAgICAgIG5ld1NjYWxlLnNldFNldHRpbmdzKHNjYWxlKTtcclxuICAgICAgICAgIG5ld0NoYXJ0LmFkZFlTY2FsZShuZXdTY2FsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFRPRE86IFNldCBzZXJpZXMgdG8gc2NhbGUgd2l0aGluIHNldFNldHRpbmdzIG1ldGhvZCBvZiBzY2FsZVxyXG4gICAgICAgIGxldCBzZXJpZXNJZHMgPSBzY2FsZS5kYXRhW1wic2VyaWVzSWRzXCJdO1xyXG4gICAgICAgIHNlcmllc0lkcy5mb3JFYWNoKHNlcmllc0lkID0+IHtcclxuICAgICAgICAgIGxldCBzZXJpZXMgPSBTZXJpZXNQcm92aWRlci5nZXRJbnN0YW5jZSgpLmdldChzZXJpZXNJZCk7XHJcbiAgICAgICAgICBpZihzZXJpZXMgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5hZGRTZXJpZXNUb0NoYXJ0KG5ld0NoYXJ0LFtzZXJpZXNdLCBuZXdTY2FsZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH07XHJcblx0XHR9KTtcclxuICB9XHJcblxyXG4gIFxyXG4gIC8qKlxyXG4gICAqIEFkZHMgYSBjaGFydCB0byB0aGUgZGF0YW1vZGVsXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0lDaGFydE1hbmFnZXJDaGFydH0gY2hhcnRcclxuICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXhcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gZmFsc2UgaWYgY2hhcnQgYWRkaW5nIG5vdCBwb3NzaWJsZSwgZWxzZSB0cnVlXHJcbiAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIGFkZENoYXJ0KGNoYXJ0IDogSUNoYXJ0TWFuYWdlckNoYXJ0LCBpbmRleDogbnVtYmVyKTogYm9vbGVhbntcclxuICAgIGxldCBkYXRhID0gdGhpcy5kYXRhO1xyXG4gICAgaWYoZGF0YS5sZW5ndGggPj0gdGhpcy5fbWF4Q2hhcnRDb3VudCl7IC8vIExpbWl0YXRpb24gb2YgY2hhcnRzXHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHRoaXMuX2NoYXJ0TWFuYWdlckRhdGEuYWRkQ2hhcnQoY2hhcnQsIGluZGV4KTtcclxuXHJcbiAgICBsZXQgbWluWCA9IDA7XHJcbiAgICBsZXQgbWF4WCA9IDEwMDtcclxuXHJcbiAgICBmb3IobGV0IGNoYXJ0cyBvZiBkYXRhISl7XHJcbiAgICAgIGlmKChjaGFydHMgYXMgQ2hhcnRNYW5hZ2VyQ2hhcnQpLmNoYXJ0VHlwZSA9PSBjaGFydC5jaGFydFR5cGUpe1xyXG4gICAgICAgIGlmKGNoYXJ0cy5jaGlsZHNbMF0gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgIG1pblggPSBjaGFydHMuY2hpbGRzWzBdLm1pblhWYWx1ZTtcclxuICAgICAgICAgIG1heFggPSBjaGFydHMuY2hpbGRzWzBdLm1heFhWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaGFydC5hZGREZWZhdWx0WVNjYWxlKHRoaXMsIG1pblgsIG1heFgpO1xyXG4gICAgdmFyIGV2ZW50QXJncyA9IG5ldyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3ModGhpcywgTW9kZWxDaGFuZ2VUeXBlLnVwZGF0ZVRhcmdldCwgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsQ2hhbmdlZEhpbnQuYWRkQ2hhcnQsIHtkYXRhOiBkYXRhLCBjaGFydDogY2hhcnQsIGluZGV4OiBpbmRleCwgdHlwZTogY2hhcnQuY2hhcnRUeXBlfSk7XHJcbiAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKHRoaXMsIGV2ZW50QXJncyk7ICBcclxuXHJcbiAgICBsZXQgY2hpbGRzY2xvbmUgPSBjaGFydC5jaGlsZHMuc2xpY2UoKTtcclxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBjaGlsZHNjbG9uZS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgIGxldCB5QXhpcyA9IGNoaWxkc2Nsb25lW2ldO1xyXG4gICAgICBsZXQgc2VyaWVzID0geUF4aXMuY2hpbGRzLnNsaWNlKCk7XHJcbiAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBzZXJpZXMubGVuZ3RoOyBqKyspe1xyXG4gICAgICAgIC8vIGZpcmUgYWRkIHNlcmllIGV2ZW50IGZvciBhbGwgc2VyaWVzIG9mIHRoaXMgY2hhcnRcclxuICAgICAgICB2YXIgZXZlbnRBcmdzID0gbmV3IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyh0aGlzLCBNb2RlbENoYW5nZVR5cGUudXBkYXRlVGFyZ2V0LCBDaGFydE1hbmFnZXJEYXRhTW9kZWxDaGFuZ2VkSGludC5hZGRTZXJpZSwge2RhdGE6IGRhdGEsIGNoYXJ0OiBjaGFydCwgc2VyaWU6IHNlcmllc1tqXX0pO1xyXG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZWQodGhpcywgZXZlbnRBcmdzKTsgXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0cnVlIGlmIGEgY2hhcnQgY2FuIGJlIGFkZGVkLCBlbHNlIGZhbHNlIGlmIGNoYXJ0IGxpbWl0IHdhcyByZWFjaGVkXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgY2FuQWRkQ2hhcnQoKTpib29sZWFue1xyXG4gICAgaWYodGhpcy5kYXRhLmxlbmd0aCA+PSB0aGlzLl9tYXhDaGFydENvdW50KXsgLy8gTGltaXRhdGlvbiBvZiBjaGFydHNcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG4gIFxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZXMgYSBjaGFydCBmcm9tIHRoZSBkYXRhbW9kZWxcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7SUNoYXJ0TWFuYWdlckNoYXJ0fSBjaGFydFxyXG4gICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICByZW1vdmVDaGFydChjaGFydCA6IElDaGFydE1hbmFnZXJDaGFydCl7XHJcbiAgICBsZXQgYXhpc0luQ2hhcnRzID0gY2hhcnQuZ2V0Q2hpbGRzKCk7XHJcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgYXhpc0luQ2hhcnRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgdGhpcy5yZW1vdmVZQXhpcyhjaGFydCwgYXhpc0luQ2hhcnRzW2ldKTtcclxuICAgIH1cclxuICAgIHRoaXMuX2NoYXJ0TWFuYWdlckRhdGEucmVtb3ZlQ2hhcnQoY2hhcnQpO1xyXG4gICAgdmFyIGV2ZW50QXJncyA9IG5ldyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3ModGhpcywgTW9kZWxDaGFuZ2VUeXBlLnVwZGF0ZVRhcmdldCwgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsQ2hhbmdlZEhpbnQucmVtb3ZlQ2hhcnQsIHtkYXRhOiB0aGlzLmRhdGEsIGNoYXJ0OiBjaGFydH0pO1xyXG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLCBldmVudEFyZ3MpOyAgXHJcbiAgfVxyXG4gIFxyXG4gIC8qKlxyXG4gICAqIE1vdmVzIGEgY2hhcnQgd2l0aGluIHRoZSBkYXRhbW9kZWxcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7SUNoYXJ0TWFuYWdlckNoYXJ0fSBjaGFydFxyXG4gICAqIEBwYXJhbSB7SUNoYXJ0TWFuYWdlckNoYXJ0fSB0YXJnZXRDaGFydFxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpbnNlcnRUeXBlIGUuZyBcImluc2VydEFib3ZlXCIgb3IgXCJpbnNlcnRCZWxvd1wiXHJcbiAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIG1vdmVDaGFydChjaGFydCA6IElDaGFydE1hbmFnZXJDaGFydCwgdGFyZ2V0Q2hhcnQgOiBJQ2hhcnRNYW5hZ2VyQ2hhcnQsIGluc2VydFR5cGU6IHN0cmluZyl7XHJcbiAgICB0aGlzLl9jaGFydE1hbmFnZXJEYXRhLm1vdmVDaGFydChjaGFydCwgdGFyZ2V0Q2hhcnQsIGluc2VydFR5cGUpO1xyXG4gICAgdmFyIGV2ZW50QXJncyA9IG5ldyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3ModGhpcywgTW9kZWxDaGFuZ2VUeXBlLnVwZGF0ZVRhcmdldCwgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsQ2hhbmdlZEhpbnQubW92ZUNoYXJ0LCB7ZGF0YTogdGhpcy5kYXRhLCBjaGFydDogY2hhcnQsIHRhcmdldDogdGFyZ2V0Q2hhcnQsIGluc2VydFR5cGU6IGluc2VydFR5cGV9KTtcclxuICAgIHRoaXMub25Nb2RlbENoYW5nZWQodGhpcywgZXZlbnRBcmdzKTsgIFxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkcyBhIHNlcmllIHRvIGEgY2hhcnRcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7SUNoYXJ0TWFuYWdlckNoYXJ0fSBjaGFydFxyXG4gICAqIEBwYXJhbSB7QXJyYXk8QmFzZVNlcmllcz59IHNlcmllc1xyXG4gICAqIEBwYXJhbSB7U2NhbGV9IHNjYWxlXHJcbiAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIGFkZFNlcmllc1RvQ2hhcnQoY2hhcnQ6IElDaGFydE1hbmFnZXJDaGFydCwgc2VyaWVzOiBBcnJheTxCYXNlU2VyaWVzPiwgc2NhbGUgOiBTY2FsZSl7XHJcbiAgICBpZihjaGFydC5nZXRZU2NhbGUoc2NhbGUuaWQpID09IHVuZGVmaW5lZCl7XHJcbiAgICAgIGNoYXJ0LmFkZFlTY2FsZShzY2FsZSk7XHJcbiAgICB9XHJcbiAgICBjaGFydC5hZGRTZXJpZXMoc2VyaWVzLCBzY2FsZSk7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNlcmllcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgIHNlcmllc1tpXS5ldmVudERhdGFDaGFuZ2VkLmF0dGFjaCh0aGlzLl9zZXJpZURhdGFDaGFuZ2VkSGFuZGxlcik7XHJcbiAgICB9XHJcbiAgICB2YXIgZXZlbnRBcmdzID0gbmV3IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyh0aGlzLCBNb2RlbENoYW5nZVR5cGUudXBkYXRlVGFyZ2V0LCBDaGFydE1hbmFnZXJEYXRhTW9kZWxDaGFuZ2VkSGludC5hZGRTZXJpZSwge2RhdGE6IHRoaXMuZGF0YSwgY2hhcnQ6IGNoYXJ0LCBzZXJpZXM6IHNlcmllcywgYXhpczogc2NhbGV9KTtcclxuICAgIHRoaXMub25Nb2RlbENoYW5nZWQodGhpcywgZXZlbnRBcmdzKTtcclxuICB9XHJcbiAgXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlcyBhIHNlcmllIGZyb20gYSBjaGFydFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtJQ2hhcnRNYW5hZ2VyQ2hhcnR9IGNoYXJ0XHJcbiAgICogQHBhcmFtIHtCYXNlU2VyaWVzfSBzZXJpZVxyXG4gICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICByZW1vdmVTZXJpZShjaGFydDogSUNoYXJ0TWFuYWdlckNoYXJ0LCBzZXJpZSA6IEJhc2VTZXJpZXMpe1xyXG4gICAgaWYoY2hhcnQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgY2hhcnQucmVtb3ZlU2VyaWUoc2VyaWUpO1xyXG4gICAgICBsZXQgY2hhcnRzV2l0aFRoaXNTZXJpZSA9IHRoaXMuZ2V0Q2hhcnRzV2l0aFNlcmllKHNlcmllKTtcclxuICAgICAgbGV0IHNlcmllVXNlZCA9IGZhbHNlO1xyXG4gICAgICBpZihjaGFydHNXaXRoVGhpc1NlcmllLmxlbmd0aCA+IDApe1xyXG4gICAgICAgIHNlcmllVXNlZCA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZXsgLy8gU2VyaWUgbm90IHVzZWQgaW4gYW4gb3RoZXIgY2hhcnQgPT4gZGV0YWNoIGV2ZW50c1xyXG4gICAgICAgIHNlcmllLmV2ZW50RGF0YUNoYW5nZWQuZGV0YWNoKHRoaXMuX3NlcmllRGF0YUNoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIGV2ZW50QXJncyA9IG5ldyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3ModGhpcywgTW9kZWxDaGFuZ2VUeXBlLnVwZGF0ZVRhcmdldCwgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsQ2hhbmdlZEhpbnQucmVtb3ZlU2VyaWUsIHtkYXRhOiB0aGlzLmRhdGEsIGNoYXJ0OiBjaGFydCwgc2VyaWU6IHNlcmllLCBzaWduYWxVc2VkSW5PdGhlckNoYXJ0czogc2VyaWVVc2VkfSk7XHJcbiAgICAgIHRoaXMub25Nb2RlbENoYW5nZWQodGhpcywgZXZlbnRBcmdzKTsgIFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkcyBhIHlBeGlzIHRvIHRoZSBnaXZlbiBjaGFydFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtJQ2hhcnRNYW5hZ2VyQ2hhcnR9IGNoYXJ0XHJcbiAgICogQHBhcmFtIHtTY2FsZX0geVNjYWxlXHJcbiAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIGFkZFlTY2FsZShjaGFydDogSUNoYXJ0TWFuYWdlckNoYXJ0LCB5U2NhbGU6IFNjYWxlKSB7XHJcbiAgICBpZihjaGFydCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICBjaGFydC5hZGRZU2NhbGUoeVNjYWxlKTtcclxuXHJcbiAgICAgIHlTY2FsZS5ldmVudERhdGFDaGFuZ2VkLmF0dGFjaCh0aGlzLl9zY2FsZURhdGFDaGFuZ2VkSGFuZGxlcik7XHJcbiAgICAgIHZhciBldmVudEFyZ3MgPSBuZXcgRXZlbnRNb2RlbENoYW5nZWRBcmdzKHRoaXMsIE1vZGVsQ2hhbmdlVHlwZS51cGRhdGVUYXJnZXQsIENoYXJ0TWFuYWdlckRhdGFNb2RlbENoYW5nZWRIaW50LmFkZFlTY2FsZSwge2RhdGE6IHRoaXMuZGF0YSwgY2hhcnQ6IGNoYXJ0LCB5QXhpczogeVNjYWxlfSk7XHJcbiAgICAgIHRoaXMub25Nb2RlbENoYW5nZWQodGhpcywgZXZlbnRBcmdzKTsgIFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlcyBhIHlBeGlzIGZyb20gdGhlIGdpdmVuIGNoYXJ0XHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0lDaGFydE1hbmFnZXJDaGFydH0gY2hhcnRcclxuICAgKiBAcGFyYW0ge1NjYWxlfSB5QXhpc1xyXG4gICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICByZW1vdmVZQXhpcyhjaGFydDogSUNoYXJ0TWFuYWdlckNoYXJ0LCB5QXhpczogU2NhbGUpIHtcclxuICAgIGlmKGNoYXJ0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgIC8vRmlyc3QsIHJlbW92ZSBzZXJpZXMgZnJvbSBZIEF4aXNcclxuICAgICAgbGV0IHNlcmllc0luQXhpcyA9IHlBeGlzLmdldENoaWxkcygpO1xyXG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2VyaWVzSW5BeGlzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICB0aGlzLnJlbW92ZVNlcmllKGNoYXJ0LCBzZXJpZXNJbkF4aXNbaV0pO1xyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgICBpZihjaGFydC5yZW1vdmVZQXhpcyh5QXhpcykgPT0gdHJ1ZSl7XHJcbiAgICAgICAgdmFyIGV2ZW50QXJncyA9IG5ldyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3ModGhpcywgTW9kZWxDaGFuZ2VUeXBlLnVwZGF0ZVRhcmdldCwgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsQ2hhbmdlZEhpbnQucmVtb3ZlWVNjYWxlLCB7ZGF0YTogdGhpcy5kYXRhLCBjaGFydDogY2hhcnQsIHlBeGlzOiB5QXhpc30pO1xyXG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZWQodGhpcywgZXZlbnRBcmdzKTsgIFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmVzIGEgc2VyaWUgZnJvbSBhbGwgY2hhcnRzXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNlcmllc1xyXG4gICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICByZW1vdmVTZXJpZUZyb21BbGxDaGFydHMoc2VyaWUgOiBCYXNlU2VyaWVzW10pe1xyXG4gICAgZm9yKGxldCBpPTA7IGkgPCB0aGlzLmRhdGEubGVuZ3RoOyBpKyspe1xyXG4gICAgICBsZXQgY2hhcnQgPSB0aGlzLmRhdGFbaV07XHJcbiAgICAgICAgaWYoY2hhcnQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY2hhcnQuY2hpbGRzLmxlbmd0aDsgaisrKXtcclxuICAgICAgICAgICAgaWYoY2hhcnQucmVtb3ZlU2VyaWUoc2VyaWUpKXtcclxuICAgICAgICAgICAgICB2YXIgZXZlbnRBcmdzID0gbmV3IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyh0aGlzLCBNb2RlbENoYW5nZVR5cGUudXBkYXRlVGFyZ2V0LCBDaGFydE1hbmFnZXJEYXRhTW9kZWxDaGFuZ2VkSGludC5yZW1vdmVTZXJpZSwge2RhdGE6IHRoaXMuZGF0YSwgY2hhcnQ6IGNoYXJ0LCBzZXJpZTogc2VyaWUsIHNpZ25hbFVzZWRJbk90aGVyQ2hhcnRzOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKHRoaXMsIGV2ZW50QXJncyk7ICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBNb3ZlcyBhIHNlcmllIGZyb20gb25lIHBvc2l0aW9uIHRvIGFuIG90aGVyLCB3aXRoaW4gYSBjaGFydCBvciBpbnRvIGFuIG90aGVyIGNoYXJ0ICg9PiBjdXJyZW50bHkgb25seSBjaGFuZ2VkIGV2ZW50IHdpbGwgcmFpc2VkLCBtb3ZpbmcgaXMgZG9uZSBieSBzeW5jZnVzaW9uIHRyZWVncmlkISEhKSBcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7SUNoYXJ0TWFuYWdlckNoYXJ0fSBzb3VyY2VDaGFydFxyXG4gICAqIEBwYXJhbSB7U2NhbGV9IHNvdXJjZUF4aXNcclxuICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNlcmllXHJcbiAgICogQHBhcmFtIHtJQ2hhcnRNYW5hZ2VyQ2hhcnR9IHRhcmdldENoYXJ0XHJcbiAgICogQHBhcmFtIHtTY2FsZX0gdGFyZ2V0QXhpc1xyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpbnNlcnRUeXBlXHJcbiAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIG1vdmVTZXJpZShzb3VyY2VDaGFydCA6IElDaGFydE1hbmFnZXJDaGFydCwgc291cmNlQXhpczogU2NhbGUsIHNlcmllOiBCYXNlU2VyaWVzLCB0YXJnZXRDaGFydCA6IElDaGFydE1hbmFnZXJDaGFydCwgdGFyZ2V0QXhpczogU2NhbGUsIGluc2VydFR5cGU6IHN0cmluZyl7XHJcbiAgICAvLyBjdXJyZW50bHkgb25seSBjaGFuZ2VkIGV2ZW50IHdpbGwgcmFpc2VkIChtb3ZpbmcgaXMgZG9uZSBieSBzeW5jZnVzaW9uIHRyZWVncmlkISEhKSBcclxuICAgIHZhciBldmVudEFyZ3MgPSBuZXcgRXZlbnRNb2RlbENoYW5nZWRBcmdzKHRoaXMsIE1vZGVsQ2hhbmdlVHlwZS51cGRhdGVUYXJnZXQsIENoYXJ0TWFuYWdlckRhdGFNb2RlbENoYW5nZWRIaW50Lm1vdmVTZXJpZSwge2RhdGE6IHRoaXMuZGF0YSwgY2hhcnQ6IHNvdXJjZUNoYXJ0LCB0YXJnZXRDaGFydDogdGFyZ2V0Q2hhcnQsIHNlcmllOiBzZXJpZSwgdGFyZ2V0QXhpczogdGFyZ2V0QXhpc30pO1xyXG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLCBldmVudEFyZ3MpOyAgXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdGhlIGNoYXJ0IGRpc2FibGVkIG9yIGVuYWJsZWRcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7SUNoYXJ0TWFuYWdlckNoYXJ0fSBjaGFydFxyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gZGlzYWJsZWRcclxuICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgZGlzYWJsZUNoYXJ0KGNoYXJ0OiBJQ2hhcnRNYW5hZ2VyQ2hhcnQsIGRpc2FibGVkOiBib29sZWFuKXtcclxuICAgIGNoYXJ0LnNldERpc2FibGVkKGRpc2FibGVkKTtcclxuICAgIHZhciBldmVudEFyZ3MgPSBuZXcgRXZlbnRNb2RlbENoYW5nZWRBcmdzKHRoaXMsIE1vZGVsQ2hhbmdlVHlwZS51cGRhdGVUYXJnZXQsIENoYXJ0TWFuYWdlckRhdGFNb2RlbENoYW5nZWRIaW50LmRpc2FibGVDaGFydCwge2RhdGE6IHRoaXMuZGF0YX0pO1xyXG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLCBldmVudEFyZ3MpOyAgXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBjaGFydCB3aXRoIHRoZSBnaXZlbiBuYW1lIG9yIHVuZGVmaW5lZCBpZiBub3QgZm91bmRcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjaGFydE5hbWVcclxuICAgKiBAcmV0dXJucyB7KElDaGFydE1hbmFnZXJDaGFydHx1bmRlZmluZWQpfVxyXG4gICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBnZXRDaGFydChjaGFydE5hbWU6IHN0cmluZyk6IElDaGFydE1hbmFnZXJDaGFydHx1bmRlZmluZWR7XHJcbiAgICBmb3IgKGxldCBjaGFydCBvZiAgdGhpcy5kYXRhKSB7XHJcbiAgICAgIGlmKGNoYXJ0Lm5hbWUgPT0gY2hhcnROYW1lKXtcclxuICAgICAgICByZXR1cm4gY2hhcnQ7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyBhIHVuaXF1ZSBjaGFydCBuYW1lIChlLmcgXCJDaGFydCAxXCIsIFwiY2hhcnQgMlwiLCAuLi4pXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBnZXRVbmlxdWVDaGFydE5hbWUoKTogc3RyaW5ne1xyXG4gICAgZm9yKHZhciBpPTE7IDE8MTAwMDsgaSsrKXtcclxuICAgICAgdmFyIG5ld2NoYXJ0TmFtZSA9IFwiQ2hhcnQgXCIraTtcclxuICAgICAgdmFyIGNoYXJ0TmFtZUFscmVhZHlFeGlzdHMgPSBmYWxzZTtcclxuICAgICAgZm9yIChsZXQgY2hhcnQgb2YgdGhpcy5kYXRhKXtcclxuICAgICAgICBpZihjaGFydC5uYW1lID09IG5ld2NoYXJ0TmFtZSl7XHJcbiAgICAgICAgICBjaGFydE5hbWVBbHJlYWR5RXhpc3RzID0gdHJ1ZTsgIFxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmKGNoYXJ0TmFtZUFscmVhZHlFeGlzdHMgPT0gZmFsc2UpXHJcbiAgICAgICAgcmV0dXJuIG5ld2NoYXJ0TmFtZTtcclxuICAgIH1cclxuICAgIHJldHVybiBcIkNoYXJ0IDEwMDBcIjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgYWxsIGNoYXJ0cyB3aGljaCB3b3JrIHdpdGggdGhlIGdpdmVuIHNlcmllXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0FycmF5PEJhc2VTZXJpZXM+fSBzZXJpZVxyXG4gICAqIEByZXR1cm5zIHtBcnJheTxJQ2hhcnRNYW5hZ2VyQ2hhcnQ+fVxyXG4gICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0Q2hhcnRzVXNpbmdTZXJpZShzZXJpZSA6IEFycmF5PEJhc2VTZXJpZXM+KTogQXJyYXk8SUNoYXJ0TWFuYWdlckNoYXJ0PntcclxuICAgIGxldCBjaGFydHMgPSBuZXcgQXJyYXk8SUNoYXJ0TWFuYWdlckNoYXJ0PigpO1xyXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuZGF0YS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgIGxldCBjaGFydDogSUNoYXJ0TWFuYWdlckNoYXJ0ID0gdGhpcy5kYXRhW2ldO1xyXG4gICAgICBpZihjaGFydC5oYXNTZXJpZXMoc2VyaWUpKXtcclxuICAgICAgICBjaGFydHMucHVzaChjaGFydCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBjaGFydHM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIGFsbCBjaGFydHMgd2hpY2ggaGF2ZSB0aGUgZ2l2ZW4gc2VyaWVcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVcclxuICAgKiBAcmV0dXJucyB7QXJyYXk8SUNoYXJ0TWFuYWdlckNoYXJ0Pn1cclxuICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgcHVibGljIGdldENoYXJ0c1dpdGhTZXJpZShzZXJpZSA6IEJhc2VTZXJpZXMpOiBBcnJheTxJQ2hhcnRNYW5hZ2VyQ2hhcnQ+e1xyXG4gICAgbGV0IGNoYXJ0cyA9IG5ldyBBcnJheTxJQ2hhcnRNYW5hZ2VyQ2hhcnQ+KCk7XHJcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5kYXRhLmxlbmd0aDsgaSsrKXtcclxuICAgICAgbGV0IGNoYXJ0ID0gdGhpcy5kYXRhW2ldO1xyXG4gICAgICBpZihjaGFydC5oYXNTZXJpZShzZXJpZSkpe1xyXG4gICAgICAgIGNoYXJ0cy5wdXNoKGNoYXJ0KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNoYXJ0cztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25TZXJpZURhdGFDaGFuZ2VkKHNlbmRlcjogQmFzZVNlcmllcywgYXJnczogRXZlbnRTZXJpZURhdGFDaGFuZ2VkQXJncyl7XHJcbiAgICBpZihhcmdzLmFjdGlvbiA9PSBTZXJpZUFjdGlvbi5yZW5hbWUpe1xyXG4gICAgICB2YXIgZXZlbnRBcmdzID0gbmV3IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyh0aGlzLCBNb2RlbENoYW5nZVR5cGUudXBkYXRlVGFyZ2V0LCBDaGFydE1hbmFnZXJEYXRhTW9kZWxDaGFuZ2VkSGludC5yZW5hbWVTaWduYWwsIHtkYXRhOiB0aGlzLmRhdGF9KTtcclxuICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLCBldmVudEFyZ3MpOyAgXHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKGFyZ3MuYWN0aW9uID09IFNlcmllQWN0aW9uLnN0YXJ0VHJpZ2dlclRpbWVDaGFuZ2VkKXtcclxuICAgICAgdmFyIGV2ZW50QXJncyA9IG5ldyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3ModGhpcywgTW9kZWxDaGFuZ2VUeXBlLnVwZGF0ZVRhcmdldCwgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsQ2hhbmdlZEhpbnQuc3RhcnRUcmlnZ2VyVGltZUNoYW5nZWQsIHtkYXRhOiB0aGlzLmRhdGF9KTtcclxuICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLCBldmVudEFyZ3MpOyAgXHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKGFyZ3MuYWN0aW9uID09IFNlcmllQWN0aW9uLmNvbG9yQ2hhbmdlZCl7XHJcbiAgICAgIHZhciBldmVudEFyZ3MgPSBuZXcgRXZlbnRNb2RlbENoYW5nZWRBcmdzKHRoaXMsIE1vZGVsQ2hhbmdlVHlwZS51cGRhdGVUYXJnZXQsIENoYXJ0TWFuYWdlckRhdGFNb2RlbENoYW5nZWRIaW50LmNvbG9yQ2hhbmdlZCwge2RhdGE6IHRoaXMuZGF0YX0pO1xyXG4gICAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKHRoaXMsIGV2ZW50QXJncyk7ICBcclxuICAgIH1cclxuICAgIGVsc2UgaWYoYXJncy5hY3Rpb24gPT0gU2VyaWVBY3Rpb24uZGF0YVBvaW50c0NoYW5nZWQpeyAvLyBOZWVkZWQgZm9yIHNob3dpbmcgY29ycmVjdCB2YWxpZC9pbnZhbGlkIGljb24gaW4gY2hhcnRtYW5hZ2VyIGlmIGRhdGEgY2hhbmdlc1xyXG4gICAgICB2YXIgZXZlbnRBcmdzID0gbmV3IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyh0aGlzLCBNb2RlbENoYW5nZVR5cGUudXBkYXRlVGFyZ2V0LCBDaGFydE1hbmFnZXJEYXRhTW9kZWxDaGFuZ2VkSGludC5kYXRhUG9pbnRzQ2hhbmdlZCwge2RhdGE6IHRoaXMuZGF0YX0pO1xyXG4gICAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKHRoaXMsIGV2ZW50QXJncyk7ICBcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25TY2FsZURhdGFDaGFuZ2VkKHNlbmRlcjogU2NhbGUsIGFyZ3M6IEV2ZW50U2NhbGVEYXRhQ2hhbmdlZEFyZ3Mpe1xyXG4gICAgaWYoYXJncy5hY3Rpb24gPT0gU2NhbGVBY3Rpb24ucmFuZ2VDaGFuZ2VkICYmIGFyZ3MuZGF0YS5zY2FsZS5wYXJlbnQuY2hhcnRUeXBlICE9IENoYXJ0VHlwZS5YWUNoYXJ0KXtcclxuICAgICAgdmFyIGV2ZW50QXJncyA9IG5ldyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3ModGhpcywgTW9kZWxDaGFuZ2VUeXBlLnVwZGF0ZVRhcmdldCwgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsQ2hhbmdlZEhpbnQudXBkYXRlU2NhbGVSYW5nZSwge2RhdGE6IHRoaXMuZGF0YSwgc2NhbGU6IHNlbmRlcn0pO1xyXG4gICAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKHRoaXMsIGV2ZW50QXJncyk7ICBcclxuICAgIH1cclxuICB9XHJcbn0iXX0=