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
define(["require", "exports", "../dataModelInterface", "./scale", "./eventSerieDataChangedArgs", "./eventScaleDataChangedArgs", "./chartManagerChart", "./settingIds", "./defaultComponentSettings", "./chartManagerData", "../dataModelBase"], function (require, exports, dataModelInterface_1, scale_1, eventSerieDataChangedArgs_1, eventScaleDataChangedArgs_1, chartManagerChart_1, settingIds_1, defaultComponentSettings_1, chartManagerData_1, dataModelBase_1) {
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
        ChartManagerDataModelChangedHint[ChartManagerDataModelChangedHint["default"] = 14] = "default";
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
            this.component.defaultSettingsDataId = defaultComponentSettings_1.DefaultComponentSettings.DataModelDefinitionId;
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
        /**
           * Returns the default component settings for this datamodel
           *
           * @returns {(ComponentSettings|undefined)}
           * @memberof ChartManagerDataModel
           */
        ChartManagerDataModel.prototype.getDefaultComponentSettings = function () {
            return defaultComponentSettings_1.DefaultComponentSettings.getChartManagerDatamodelDefinition();
        };
        ChartManagerDataModel.prototype.getComponentSettings = function (onlyModified) {
            var chartList = new Array();
            // export data
            this.data.forEach(function (child) {
                chartList.push(child.getSettings());
            });
            this.component.setSetting("dataModel", chartList);
            return _super.prototype.getComponentSettings.call(this, onlyModified);
        };
        ChartManagerDataModel.prototype.setComponentSettings = function (componentSettings) {
            var _this = this;
            _super.prototype.setComponentSettings.call(this, componentSettings);
            var dataModel = this.component.getSetting("dataModel");
            // Reset the data of this datamodel
            this.clear();
            if (dataModel != undefined) {
                // import data
                dataModel.forEach(function (chart) {
                    var newChart = new chartManagerChart_1.ChartManagerChart("");
                    newChart.setSettings(chart);
                    newChart.addDefaultYScale(_this);
                    // TODO: Set scales to chart within setSettings method of chart
                    var scales = chart.data[settingIds_1.SettingIds.ChartScales];
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
                            _this.addYScale(newChart, newScale);
                        }
                        // TODO: Set series to scale within setSettings method of scale
                        var seriesProvider = _this.component.getSubComponent(defaultComponentSettings_1.DefaultComponentSettings.SeriesProviderId);
                        var seriesIds = scale.data[settingIds_1.SettingIds.ScaleSeriesIds];
                        seriesIds.forEach(function (seriesId) {
                            if (seriesProvider != undefined) {
                                var series = seriesProvider.get(seriesId);
                                if (series != undefined) {
                                    _this.addSeriesToChart(newChart, [series], newScale, true);
                                }
                            }
                        });
                    };
                    for (var i = 0; i < scales.length; i++) {
                        _loop_1(i);
                    }
                    ;
                    _this.addChart(newChart, -1);
                });
            }
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
            var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, ChartManagerDataModelChangedHint.addChart, { data: data, chart: chart, index: index, type: chart.chartType });
            this.onModelChanged(this, eventArgs);
            var childsclone = chart.childs.slice();
            for (var i = 0; i < childsclone.length; i++) {
                var yAxis = childsclone[i];
                var series = yAxis.childs.slice();
                for (var j = 0; j < series.length; j++) {
                    // fire add serie event for all series of this chart
                    var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, ChartManagerDataModelChangedHint.addSerie, { data: data, chart: chart, axis: chart.childs[0], series: series, keepScales: true });
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
        ChartManagerDataModel.prototype.addSeriesToChart = function (chart, series, scale, keepScales) {
            if (keepScales === void 0) { keepScales = false; }
            if (chart.getYScale(scale.id) == undefined) {
                chart.addYScale(scale);
            }
            chart.addSeries(series, scale);
            for (var i = 0; i < series.length; i++) {
                series[i].eventDataChanged.attach(this._serieDataChangedHandler);
            }
            var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, ChartManagerDataModelChangedHint.addSerie, { data: this.data, chart: chart, series: series, axis: scale, keepScales: keepScales });
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
        ChartManagerDataModel.prototype.getDefaultXScaleRangeByType = function (type) {
            var scaleRange = { min: 0, max: 100 };
            var chart;
            if (type == chartManagerChart_1.ChartType.XYChart) {
                return scaleRange;
            }
            else {
                for (var _i = 0, _a = this.data; _i < _a.length; _i++) {
                    chart = _a[_i];
                    if (chart.chartType == type) {
                        scaleRange.max = chart.childs[0].maxXValue;
                        scaleRange.min = chart.childs[0].minXValue;
                        return scaleRange;
                    }
                }
            }
            return scaleRange;
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
        /*disableChart(chart: IChartManagerChart, disabled: boolean){
          chart.setDisabled(disabled);
          var eventArgs = new EventModelChangedArgs(this, ModelChangeType.updateTarget, ChartManagerDataModelChangedHint.disableChart, {data: this.data});
          this.onModelChanged(this, eventArgs);
        }*/
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
            if (args.action == eventScaleDataChangedArgs_1.ScaleAction.xRangeChanged && args.data.scale.parent.chartType != chartManagerChart_1.ChartType.XYChart) {
                var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, ChartManagerDataModelChangedHint.updateScaleRange, { data: this.data, scale: sender });
                this.onModelChanged(this, eventArgs);
            }
            if (args.action == eventScaleDataChangedArgs_1.ScaleAction.yRangeChanged) {
                var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, ChartManagerDataModelChangedHint.default, { data: this.data, scale: sender });
                this.onModelChanged(this, eventArgs);
            }
            if (args.action == eventScaleDataChangedArgs_1.ScaleAction.xRangeChanged && args.data.scale.parent.chartType == chartManagerChart_1.ChartType.XYChart) {
                var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, ChartManagerDataModelChangedHint.default, { data: this.data, scale: sender });
                this.onModelChanged(this, eventArgs);
            }
        };
        return ChartManagerDataModel;
    }(dataModelBase_1.DataModelBase));
    exports.ChartManagerDataModel = ChartManagerDataModel;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRNYW5hZ2VyRGF0YU1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBbUJBLElBQVksZ0NBaUJYO0lBakJELFdBQVksZ0NBQWdDO1FBQ3hDLCtGQUFRLENBQUE7UUFDUixpR0FBUyxDQUFBO1FBQ1QscUdBQVcsQ0FBQTtRQUNYLCtGQUFRLENBQUE7UUFDUixpR0FBUyxDQUFBO1FBQ1QscUdBQVcsQ0FBQTtRQUNYLGlHQUFTLENBQUE7UUFDVCx1R0FBWSxDQUFBO1FBQ1osK0dBQWdCLENBQUE7UUFDaEIsdUdBQVksQ0FBQTtRQUNaLHdHQUFZLENBQUE7UUFDWiw4SEFBdUIsQ0FBQTtRQUN2Qix3R0FBWSxDQUFBO1FBQ1osa0hBQWlCLENBQUE7UUFDakIsOEZBQU8sQ0FBQTtJQUVYLENBQUMsRUFqQlcsZ0NBQWdDLEdBQWhDLHdDQUFnQyxLQUFoQyx3Q0FBZ0MsUUFpQjNDO0lBRUQ7UUFBMkMseUNBQWE7UUFBeEQ7WUFBQSxxRUFpY0M7WUEvYkMsWUFBTSxHQUFpQixJQUFJLEtBQUssRUFBYyxDQUFDO1lBRXZDLHVCQUFpQixHQUFxQixJQUFJLG1DQUFnQixFQUFFLENBQUM7WUFFN0QsOEJBQXdCLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFHLE9BQUEsS0FBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsRUFBcEMsQ0FBb0MsQ0FBQztZQUNoRiw4QkFBd0IsR0FBRyxVQUFDLE1BQU0sRUFBQyxJQUFJLElBQUcsT0FBQSxLQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxFQUFwQyxDQUFvQyxDQUFDO1lBRXJFLG9CQUFjLEdBQUcsQ0FBQyxDQUFDLENBQUMsbURBQW1EOztRQXdiMUYsQ0FBQztRQXRiQzs7OztXQUlHO1FBQ0gsMENBQVUsR0FBVjtZQUNFLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQztZQUMzQyxpQkFBTSxVQUFVLFdBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztZQUN4QixpQkFBTSxVQUFVLFdBQUUsQ0FBQztRQUNyQixDQUFDO1FBRUQsbURBQW1CLEdBQW5CO1lBQ0UsSUFBSSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsR0FBRyxtREFBd0IsQ0FBQyxxQkFBcUIsQ0FBQztRQUN4RixDQUFDO1FBRUQsdUNBQU8sR0FBUDtZQUNFLGlCQUFNLE9BQU8sV0FBRSxDQUFDO1lBQ2hCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNmLENBQUM7UUFFTSxxQ0FBSyxHQUFaO1lBQ0Usb0JBQW9CO1lBQ3BCLElBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxTQUFTLEVBQUM7Z0JBQ3hCLEtBQUksSUFBSSxDQUFDLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUM7b0JBQ3hDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNoQzthQUNGO1FBQ0gsQ0FBQztRQUVEOzs7OzthQUtLO1FBQ0wsMkRBQTJCLEdBQTNCO1lBQ0UsT0FBTyxtREFBd0IsQ0FBQyxrQ0FBa0MsRUFBRSxDQUFDO1FBQ3ZFLENBQUM7UUFFRCxvREFBb0IsR0FBcEIsVUFBcUIsWUFBcUI7WUFDeEMsSUFBSSxTQUFTLEdBQUcsSUFBSSxLQUFLLEVBQU8sQ0FBQztZQUNqQyxjQUFjO1lBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLO2dCQUNyQixTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1lBQ3RDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ2xELE9BQU8saUJBQU0sb0JBQW9CLFlBQUMsWUFBWSxDQUFDLENBQUM7UUFDbEQsQ0FBQztRQUVELG9EQUFvQixHQUFwQixVQUFxQixpQkFBb0M7WUFBekQsaUJBZ0RDO1lBL0NDLGlCQUFNLG9CQUFvQixZQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDOUMsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDdkQsbUNBQW1DO1lBQ25DLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUViLElBQUcsU0FBUyxJQUFJLFNBQVMsRUFBQztnQkFDeEIsY0FBYztnQkFDZCxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSztvQkFDckIsSUFBSSxRQUFRLEdBQUcsSUFBSSxxQ0FBaUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDekMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFFNUIsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEtBQUksQ0FBQyxDQUFDO29CQUVoQywrREFBK0Q7b0JBQy9ELElBQUksTUFBTSxHQUFxQixLQUFLLENBQUMsSUFBSSxDQUFDLHVCQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7NENBQzFELENBQUM7d0JBQ1AsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN0QixJQUFJLFFBQWUsQ0FBQzt3QkFDcEIsSUFBRyxDQUFDLElBQUksQ0FBQyxFQUFDOzRCQUNSLG9EQUFvRDs0QkFDcEQsUUFBUSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQzlCLFFBQVEsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7eUJBQzdCOzZCQUNHOzRCQUNGLGdCQUFnQjs0QkFDaEIsUUFBUSxHQUFHLElBQUksYUFBSyxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQzs0QkFDbkMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQzs0QkFDNUIsS0FBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7eUJBQ3BDO3dCQUVELCtEQUErRDt3QkFDL0QsSUFBSSxjQUFjLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsbURBQXdCLENBQUMsZ0JBQWdCLENBQW9CLENBQUM7d0JBQ2xILElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsdUJBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQzt3QkFDdEQsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFBLFFBQVE7NEJBQ3hCLElBQUcsY0FBYyxJQUFJLFNBQVMsRUFBQztnQ0FDN0IsSUFBSSxNQUFNLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQ0FDMUMsSUFBRyxNQUFNLElBQUksU0FBUyxFQUFDO29DQUNyQixLQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO2lDQUMxRDs2QkFDRjt3QkFDSCxDQUFDLENBQUMsQ0FBQzs7b0JBekJMLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRTtnQ0FBN0IsQ0FBQztxQkEwQlI7b0JBQUEsQ0FBQztvQkFFRixLQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUU5QixDQUFDLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQztRQUdEOzs7Ozs7O1dBT0c7UUFDSCx3Q0FBUSxHQUFSLFVBQVMsS0FBMEIsRUFBRSxLQUFhO1lBQ2hELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDckIsSUFBRyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUMsRUFBRSx1QkFBdUI7Z0JBQzdELE9BQU8sS0FBSyxDQUFDO2FBQ2Q7WUFDRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztZQUU5QyxJQUFJLFNBQVMsR0FBRyxJQUFJLDBDQUFxQixDQUFDLElBQUksRUFBRSxvQ0FBZSxDQUFDLFlBQVksRUFBRSxnQ0FBZ0MsQ0FBQyxRQUFRLEVBQUUsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLFNBQVMsRUFBQyxDQUFDLENBQUM7WUFDMUwsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFFckMsSUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN2QyxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztnQkFDekMsSUFBSSxLQUFLLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNsQyxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztvQkFDcEMsb0RBQW9EO29CQUNwRCxJQUFJLFNBQVMsR0FBRyxJQUFJLDBDQUFxQixDQUFDLElBQUksRUFBRSxvQ0FBZSxDQUFDLFlBQVksRUFBRSxnQ0FBZ0MsQ0FBQyxRQUFRLEVBQUUsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztvQkFDOU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7aUJBQ3RDO2FBQ0Y7WUFDRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNILDJDQUFXLEdBQVg7WUFDRSxJQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUMsRUFBRSx1QkFBdUI7Z0JBQ2xFLE9BQU8sS0FBSyxDQUFDO2FBQ2Q7WUFDRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNILDJDQUFXLEdBQVgsVUFBWSxLQUEwQjtZQUNwQyxJQUFJLFlBQVksR0FBRyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDckMsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQzFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzFDO1lBQ0QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxQyxJQUFJLFNBQVMsR0FBRyxJQUFJLDBDQUFxQixDQUFDLElBQUksRUFBRSxvQ0FBZSxDQUFDLFlBQVksRUFBRSxnQ0FBZ0MsQ0FBQyxXQUFXLEVBQUUsRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztZQUM3SixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN2QyxDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNILHlDQUFTLEdBQVQsVUFBVSxLQUEwQixFQUFFLFdBQWdDLEVBQUUsVUFBa0I7WUFDeEYsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ2pFLElBQUksU0FBUyxHQUFHLElBQUksMENBQXFCLENBQUMsSUFBSSxFQUFFLG9DQUFlLENBQUMsWUFBWSxFQUFFLGdDQUFnQyxDQUFDLFNBQVMsRUFBRSxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFDLENBQUMsQ0FBQztZQUN4TSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN2QyxDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNILGdEQUFnQixHQUFoQixVQUFpQixLQUF5QixFQUFFLE1BQXlCLEVBQUUsS0FBYSxFQUFFLFVBQTJCO1lBQTNCLDJCQUFBLEVBQUEsa0JBQTJCO1lBQy9HLElBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksU0FBUyxFQUFDO2dCQUN4QyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3hCO1lBQ0QsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDL0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQ3JDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM7YUFDbEU7WUFDRCxJQUFJLFNBQVMsR0FBRyxJQUFJLDBDQUFxQixDQUFDLElBQUksRUFBRSxvQ0FBZSxDQUFDLFlBQVksRUFBRSxnQ0FBZ0MsQ0FBQyxRQUFRLEVBQUUsRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFDLENBQUMsQ0FBQztZQUMvTSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN2QyxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0gsMkNBQVcsR0FBWCxVQUFZLEtBQXlCLEVBQUUsS0FBa0I7WUFDdkQsSUFBRyxLQUFLLElBQUksU0FBUyxFQUFDO2dCQUNwQixLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN6QixJQUFJLG1CQUFtQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDekQsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDO2dCQUN0QixJQUFHLG1CQUFtQixDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUM7b0JBQ2hDLFNBQVMsR0FBRyxJQUFJLENBQUM7aUJBQ2xCO3FCQUNHLEVBQUUsb0RBQW9EO29CQUN4RCxLQUFLLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO2lCQUM5RDtnQkFFRCxJQUFJLFNBQVMsR0FBRyxJQUFJLDBDQUFxQixDQUFDLElBQUksRUFBRSxvQ0FBZSxDQUFDLFlBQVksRUFBRSxnQ0FBZ0MsQ0FBQyxXQUFXLEVBQUUsRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFDLENBQUMsQ0FBQztnQkFDL00sSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7YUFDdEM7UUFDSCxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0gseUNBQVMsR0FBVCxVQUFVLEtBQXlCLEVBQUUsTUFBYTtZQUNoRCxJQUFHLEtBQUssSUFBSSxTQUFTLEVBQUM7Z0JBQ3BCLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBRXhCLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM7Z0JBQzlELElBQUksU0FBUyxHQUFHLElBQUksMENBQXFCLENBQUMsSUFBSSxFQUFFLG9DQUFlLENBQUMsWUFBWSxFQUFFLGdDQUFnQyxDQUFDLFNBQVMsRUFBRSxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUM7Z0JBQzFLLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO2FBQ3RDO1FBQ0gsQ0FBQztRQUVNLDJEQUEyQixHQUFsQyxVQUFtQyxJQUFlO1lBQ2hELElBQUksVUFBVSxHQUFnQixFQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBQyxDQUFDO1lBQ2pELElBQUksS0FBd0IsQ0FBQztZQUU3QixJQUFHLElBQUksSUFBSSw2QkFBUyxDQUFDLE9BQU8sRUFBQztnQkFDM0IsT0FBTyxVQUFVLENBQUM7YUFDbkI7aUJBQ0c7Z0JBQ0YsS0FBYSxVQUFTLEVBQVQsS0FBQSxJQUFJLENBQUMsSUFBSSxFQUFULGNBQVMsRUFBVCxJQUFTLEVBQUM7b0JBQW5CLEtBQUssU0FBQTtvQkFDUCxJQUFHLEtBQUssQ0FBQyxTQUFTLElBQUksSUFBSSxFQUFDO3dCQUN6QixVQUFVLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO3dCQUMzQyxVQUFVLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO3dCQUMzQyxPQUFPLFVBQVUsQ0FBQztxQkFDbkI7aUJBQ0Y7YUFDRjtZQUVELE9BQU8sVUFBVSxDQUFDO1FBQ3BCLENBQUM7UUFJRDs7Ozs7O1dBTUc7UUFDSCwyQ0FBVyxHQUFYLFVBQVksS0FBeUIsRUFBRSxLQUFZO1lBQ2pELElBQUcsS0FBSyxJQUFJLFNBQVMsRUFBQztnQkFDcEIsa0NBQWtDO2dCQUNsQyxJQUFJLFlBQVksR0FBRyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ3JDLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO29CQUMxQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDMUM7Z0JBRUQsSUFBRyxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksRUFBQztvQkFDbEMsSUFBSSxTQUFTLEdBQUcsSUFBSSwwQ0FBcUIsQ0FBQyxJQUFJLEVBQUUsb0NBQWUsQ0FBQyxZQUFZLEVBQUUsZ0NBQWdDLENBQUMsWUFBWSxFQUFFLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztvQkFDNUssSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7aUJBQ3RDO2FBQ0Y7UUFDSCxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSCx3REFBd0IsR0FBeEIsVUFBeUIsS0FBb0I7WUFDM0MsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUNyQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixJQUFHLEtBQUssSUFBSSxTQUFTLEVBQUM7b0JBQ3BCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQzt3QkFDM0MsSUFBRyxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFDOzRCQUMxQixJQUFJLFNBQVMsR0FBRyxJQUFJLDBDQUFxQixDQUFDLElBQUksRUFBRSxvQ0FBZSxDQUFDLFlBQVksRUFBRSxnQ0FBZ0MsQ0FBQyxXQUFXLEVBQUUsRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsdUJBQXVCLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQzs0QkFDNU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7eUJBQ3RDO3FCQUNGO2lCQUNKO2FBQ0Y7UUFDSCxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILHlDQUFTLEdBQVQsVUFBVSxXQUFnQyxFQUFFLFVBQWlCLEVBQUUsS0FBaUIsRUFBRSxXQUFnQyxFQUFFLFVBQWlCLEVBQUUsVUFBa0I7WUFDdkosdUZBQXVGO1lBQ3ZGLElBQUksU0FBUyxHQUFHLElBQUksMENBQXFCLENBQUMsSUFBSSxFQUFFLG9DQUFlLENBQUMsWUFBWSxFQUFFLGdDQUFnQyxDQUFDLFNBQVMsRUFBRSxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUMsQ0FBQyxDQUFDO1lBQ2pPLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZDLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSDs7OztXQUlHO1FBRUg7Ozs7OztXQU1HO1FBQ0gsd0NBQVEsR0FBUixVQUFTLFNBQWlCO1lBQ3hCLEtBQW1CLFVBQVMsRUFBVCxLQUFBLElBQUksQ0FBQyxJQUFJLEVBQVQsY0FBUyxFQUFULElBQVMsRUFBRTtnQkFBekIsSUFBSSxLQUFLLFNBQUE7Z0JBQ1osSUFBRyxLQUFLLENBQUMsSUFBSSxJQUFJLFNBQVMsRUFBQztvQkFDekIsT0FBTyxLQUFLLENBQUM7aUJBQ2Q7YUFDRjtZQUFBLENBQUM7WUFDRixPQUFPLFNBQVMsQ0FBQztRQUNuQixDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSCxrREFBa0IsR0FBbEI7WUFDRSxLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUN2QixJQUFJLFlBQVksR0FBRyxRQUFRLEdBQUMsQ0FBQyxDQUFDO2dCQUM5QixJQUFJLHNCQUFzQixHQUFHLEtBQUssQ0FBQztnQkFDbkMsS0FBa0IsVUFBUyxFQUFULEtBQUEsSUFBSSxDQUFDLElBQUksRUFBVCxjQUFTLEVBQVQsSUFBUyxFQUFDO29CQUF2QixJQUFJLEtBQUssU0FBQTtvQkFDWixJQUFHLEtBQUssQ0FBQyxJQUFJLElBQUksWUFBWSxFQUFDO3dCQUM1QixzQkFBc0IsR0FBRyxJQUFJLENBQUM7d0JBQzlCLE1BQU07cUJBQ1A7aUJBQ0Y7Z0JBQ0QsSUFBRyxzQkFBc0IsSUFBSSxLQUFLO29CQUNoQyxPQUFPLFlBQVksQ0FBQzthQUN2QjtZQUNELE9BQU8sWUFBWSxDQUFDO1FBQ3RCLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSSxtREFBbUIsR0FBMUIsVUFBMkIsS0FBeUI7WUFDbEQsSUFBSSxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQXNCLENBQUM7WUFDN0MsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUN2QyxJQUFJLEtBQUssR0FBdUIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0MsSUFBRyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFDO29CQUN4QixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNwQjthQUNGO1lBQ0QsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNJLGtEQUFrQixHQUF6QixVQUEwQixLQUFrQjtZQUMxQyxJQUFJLE1BQU0sR0FBRyxJQUFJLEtBQUssRUFBc0IsQ0FBQztZQUM3QyxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQ3ZDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLElBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBQztvQkFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDcEI7YUFDRjtZQUNELE9BQU8sTUFBTSxDQUFDO1FBQ2hCLENBQUM7UUFFTyxrREFBa0IsR0FBMUIsVUFBMkIsTUFBa0IsRUFBRSxJQUErQjtZQUM1RSxJQUFHLElBQUksQ0FBQyxNQUFNLElBQUksdUNBQVcsQ0FBQyxNQUFNLEVBQUM7Z0JBQ25DLElBQUksU0FBUyxHQUFHLElBQUksMENBQXFCLENBQUMsSUFBSSxFQUFFLG9DQUFlLENBQUMsWUFBWSxFQUFFLGdDQUFnQyxDQUFDLFlBQVksRUFBRSxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQztnQkFDaEosSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7YUFDdEM7aUJBQ0ksSUFBRyxJQUFJLENBQUMsTUFBTSxJQUFJLHVDQUFXLENBQUMsdUJBQXVCLEVBQUM7Z0JBQ3pELElBQUksU0FBUyxHQUFHLElBQUksMENBQXFCLENBQUMsSUFBSSxFQUFFLG9DQUFlLENBQUMsWUFBWSxFQUFFLGdDQUFnQyxDQUFDLHVCQUF1QixFQUFFLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDO2dCQUMzSixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQzthQUN0QztpQkFDSSxJQUFHLElBQUksQ0FBQyxNQUFNLElBQUksdUNBQVcsQ0FBQyxZQUFZLEVBQUM7Z0JBQzlDLElBQUksU0FBUyxHQUFHLElBQUksMENBQXFCLENBQUMsSUFBSSxFQUFFLG9DQUFlLENBQUMsWUFBWSxFQUFFLGdDQUFnQyxDQUFDLFlBQVksRUFBRSxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQztnQkFDaEosSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7YUFDdEM7aUJBQ0ksSUFBRyxJQUFJLENBQUMsTUFBTSxJQUFJLHVDQUFXLENBQUMsaUJBQWlCLEVBQUMsRUFBRSxnRkFBZ0Y7Z0JBQ3JJLElBQUksU0FBUyxHQUFHLElBQUksMENBQXFCLENBQUMsSUFBSSxFQUFFLG9DQUFlLENBQUMsWUFBWSxFQUFFLGdDQUFnQyxDQUFDLGlCQUFpQixFQUFFLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDO2dCQUNySixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQzthQUN0QztRQUNILENBQUM7UUFFTyxrREFBa0IsR0FBMUIsVUFBMkIsTUFBYSxFQUFFLElBQStCO1lBQ3ZFLElBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSx1Q0FBVyxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxJQUFJLDZCQUFTLENBQUMsT0FBTyxFQUFDO2dCQUNuRyxJQUFJLFNBQVMsR0FBRyxJQUFJLDBDQUFxQixDQUFDLElBQUksRUFBRSxvQ0FBZSxDQUFDLFlBQVksRUFBRSxnQ0FBZ0MsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDO2dCQUNuSyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQzthQUN0QztZQUNELElBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSx1Q0FBVyxDQUFDLGFBQWEsRUFBQztnQkFDMUMsSUFBSSxTQUFTLEdBQUcsSUFBSSwwQ0FBcUIsQ0FBQyxJQUFJLEVBQUUsb0NBQWUsQ0FBQyxZQUFZLEVBQUUsZ0NBQWdDLENBQUMsT0FBTyxFQUFFLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUM7Z0JBQzFKLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO2FBQ3RDO1lBRUQsSUFBRyxJQUFJLENBQUMsTUFBTSxJQUFJLHVDQUFXLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLElBQUksNkJBQVMsQ0FBQyxPQUFPLEVBQUM7Z0JBQ25HLElBQUksU0FBUyxHQUFHLElBQUksMENBQXFCLENBQUMsSUFBSSxFQUFFLG9DQUFlLENBQUMsWUFBWSxFQUFFLGdDQUFnQyxDQUFDLE9BQU8sRUFBRSxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDO2dCQUMxSixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQzthQUN0QztRQUNILENBQUM7UUFDSCw0QkFBQztJQUFELENBQUMsQUFqY0QsQ0FBMkMsNkJBQWEsR0FpY3ZEO0lBamNZLHNEQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElTZXJpZXNQcm92aWRlciB9IGZyb20gXCIuLi9jb21tb24vc2VyaWVzUHJvdmlkZXIvc2VyaWVzUHJvdmlkZXJJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSUNoYXJ0TWFuYWdlckNoYXJ0IH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9jaGFydE1hbmFnZXJDaGFydEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9jaGFydE1hbmFnZXJEYXRhTW9kZWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9pbnRlcmZhY2VzL3NldHRpbmdzSW50ZXJmYWNlXCI7XHJcblxyXG5pbXBvcnQgeyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MsIE1vZGVsQ2hhbmdlVHlwZSB9IGZyb20gXCIuLi9kYXRhTW9kZWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU2NhbGUgfSBmcm9tIFwiLi9zY2FsZVwiO1xyXG5pbXBvcnQgeyBFdmVudFNlcmllRGF0YUNoYW5nZWRBcmdzLCBTZXJpZUFjdGlvbiB9IGZyb20gXCIuL2V2ZW50U2VyaWVEYXRhQ2hhbmdlZEFyZ3NcIjtcclxuaW1wb3J0IHsgRXZlbnRTY2FsZURhdGFDaGFuZ2VkQXJncywgU2NhbGVBY3Rpb24gfSBmcm9tIFwiLi9ldmVudFNjYWxlRGF0YUNoYW5nZWRBcmdzXCI7XHJcbmltcG9ydCB7IENoYXJ0VHlwZSwgQ2hhcnRNYW5hZ2VyQ2hhcnQgfSBmcm9tIFwiLi9jaGFydE1hbmFnZXJDaGFydFwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnRTZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBTZXR0aW5nSWRzIH0gZnJvbSBcIi4vc2V0dGluZ0lkc1wiO1xyXG5pbXBvcnQgeyBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi9kZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgQ2hhcnRNYW5hZ2VyRGF0YSB9IGZyb20gXCIuL2NoYXJ0TWFuYWdlckRhdGFcIjtcclxuaW1wb3J0IHsgQmFzZVNlcmllcyB9IGZyb20gXCIuL2Jhc2VTZXJpZXNcIjtcclxuaW1wb3J0IHsgRGF0YU1vZGVsQmFzZSB9IGZyb20gXCIuLi9kYXRhTW9kZWxCYXNlXCI7XHJcbmltcG9ydCB7IFNpbXBsZVJhbmdlIH0gZnJvbSBcIi4uLy4uL2NvcmUvaW50ZXJmYWNlcy9jb21wb25lbnRzL3VpL2NoYXJ0L2NoYXJ0SW50ZXJmYWNlXCI7XHJcblxyXG5cclxuZXhwb3J0IGVudW0gQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsQ2hhbmdlZEhpbnR7XHJcbiAgICBhZGRTZXJpZSxcclxuICAgIG1vdmVTZXJpZSxcclxuICAgIHJlbW92ZVNlcmllLFxyXG4gICAgYWRkQ2hhcnQsXHJcbiAgICBtb3ZlQ2hhcnQsXHJcbiAgICByZW1vdmVDaGFydCxcclxuICAgIGFkZFlTY2FsZSxcclxuICAgIHJlbW92ZVlTY2FsZSxcclxuICAgIHVwZGF0ZVNjYWxlUmFuZ2UsXHJcbiAgICBkaXNhYmxlQ2hhcnQsIC8vVE9ETzogbm90IGltcGxlbWVudGVkIHlldFxyXG4gICAgcmVuYW1lU2lnbmFsLFxyXG4gICAgc3RhcnRUcmlnZ2VyVGltZUNoYW5nZWQsXHJcbiAgICBjb2xvckNoYW5nZWQsXHJcbiAgICBkYXRhUG9pbnRzQ2hhbmdlZCxcclxuICAgIGRlZmF1bHQsXHJcblxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsIGV4dGVuZHMgRGF0YU1vZGVsQmFzZSBpbXBsZW1lbnRzIElDaGFydE1hbmFnZXJEYXRhTW9kZWx7XHJcbiAgICAgXHJcbiAgc2VyaWVzOiBCYXNlU2VyaWVzW10gPSBuZXcgQXJyYXk8QmFzZVNlcmllcz4oKTtcclxuXHJcbiAgcHJpdmF0ZSBfY2hhcnRNYW5hZ2VyRGF0YTogQ2hhcnRNYW5hZ2VyRGF0YSA9IG5ldyBDaGFydE1hbmFnZXJEYXRhKCk7XHJcblxyXG4gIHByaXZhdGUgX3NlcmllRGF0YUNoYW5nZWRIYW5kbGVyID0gKHNlbmRlcixhcmdzKT0+dGhpcy5vblNlcmllRGF0YUNoYW5nZWQoc2VuZGVyLGFyZ3MpO1xyXG4gIHB1YmxpYyBfc2NhbGVEYXRhQ2hhbmdlZEhhbmRsZXIgPSAoc2VuZGVyLGFyZ3MpPT50aGlzLm9uU2NhbGVEYXRhQ2hhbmdlZChzZW5kZXIsYXJncyk7XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgX21heENoYXJ0Q291bnQgPSA0OyAvLyBDdXJyZW50bHkgbGltaXRhdGlvbiBvZiBjaGFydHMgdG8gdGhlIG1heC4gb2YgNCBcclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdGlhbGl6ZXMgdGhlIENoYXJ0TWFuYWdlckRhdGFNb2RlbFxyXG4gICAqXHJcbiAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIGluaXRpYWxpemUoKSB7XHJcbiAgICB0aGlzLl9kYXRhID0gdGhpcy5fY2hhcnRNYW5hZ2VyRGF0YS5jaGlsZHM7XHJcbiAgICBzdXBlci5pbml0aWFsaXplKCk7XHJcbiAgICB0aGlzLl9kYXRhU291cmNlID0gdGhpcztcclxuICAgIHN1cGVyLmluaXRpYWxpemUoKTtcclxuICB9XHJcblxyXG4gIGluaXRpYWxpemVDb21wb25lbnQoKXtcclxuICAgIHRoaXMuY29tcG9uZW50LmRlZmF1bHRTZXR0aW5nc0RhdGFJZCA9IERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5EYXRhTW9kZWxEZWZpbml0aW9uSWQ7XHJcbiAgfVxyXG5cclxuICBkaXNwb3NlKCl7XHJcbiAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgICB0aGlzLmNsZWFyKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2xlYXIoKXtcclxuICAgIC8vIFJlbW92ZSBhbGwgY2hhcnRzXHJcbiAgICBpZih0aGlzLmRhdGEgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgZm9yKGxldCBpPXRoaXMuZGF0YS5sZW5ndGgtMTsgaSA+PSAwOyBpLS0pe1xyXG4gICAgICAgIHRoaXMucmVtb3ZlQ2hhcnQodGhpcy5kYXRhW2ldKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IGNvbXBvbmVudCBzZXR0aW5ncyBmb3IgdGhpcyBkYXRhbW9kZWxcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7KENvbXBvbmVudFNldHRpbmdzfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICBnZXREZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MoKTogQ29tcG9uZW50U2V0dGluZ3N8dW5kZWZpbmVke1xyXG4gICAgcmV0dXJuIERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5nZXRDaGFydE1hbmFnZXJEYXRhbW9kZWxEZWZpbml0aW9uKCk7XHJcbiAgfVxyXG5cclxuICBnZXRDb21wb25lbnRTZXR0aW5ncyhvbmx5TW9kaWZpZWQ6IGJvb2xlYW4pOiBDb21wb25lbnRTZXR0aW5ncyB7XHJcbiAgICBsZXQgY2hhcnRMaXN0ID0gbmV3IEFycmF5PGFueT4oKTtcclxuICAgIC8vIGV4cG9ydCBkYXRhXHJcbiAgICB0aGlzLmRhdGEuZm9yRWFjaChjaGlsZCA9PiB7XHJcbiAgICAgIGNoYXJ0TGlzdC5wdXNoKGNoaWxkLmdldFNldHRpbmdzKCkpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmNvbXBvbmVudC5zZXRTZXR0aW5nKFwiZGF0YU1vZGVsXCIsIGNoYXJ0TGlzdCk7XHJcbiAgICByZXR1cm4gc3VwZXIuZ2V0Q29tcG9uZW50U2V0dGluZ3Mob25seU1vZGlmaWVkKTtcclxuICB9XHJcblxyXG4gIHNldENvbXBvbmVudFNldHRpbmdzKGNvbXBvbmVudFNldHRpbmdzOiBDb21wb25lbnRTZXR0aW5ncykge1xyXG4gICAgc3VwZXIuc2V0Q29tcG9uZW50U2V0dGluZ3MoY29tcG9uZW50U2V0dGluZ3MpO1xyXG4gICAgbGV0IGRhdGFNb2RlbCA9IHRoaXMuY29tcG9uZW50LmdldFNldHRpbmcoXCJkYXRhTW9kZWxcIik7XHJcbiAgICAvLyBSZXNldCB0aGUgZGF0YSBvZiB0aGlzIGRhdGFtb2RlbFxyXG4gICAgdGhpcy5jbGVhcigpO1xyXG4gICAgXHJcbiAgICBpZihkYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgLy8gaW1wb3J0IGRhdGFcclxuICAgICAgZGF0YU1vZGVsLmZvckVhY2goY2hhcnQgPT4ge1xyXG4gICAgICAgIGxldCBuZXdDaGFydCA9IG5ldyBDaGFydE1hbmFnZXJDaGFydChcIlwiKTtcclxuICAgICAgICBuZXdDaGFydC5zZXRTZXR0aW5ncyhjaGFydCk7XHJcblxyXG4gICAgICAgIG5ld0NoYXJ0LmFkZERlZmF1bHRZU2NhbGUodGhpcyk7XHJcblxyXG4gICAgICAgIC8vIFRPRE86IFNldCBzY2FsZXMgdG8gY2hhcnQgd2l0aGluIHNldFNldHRpbmdzIG1ldGhvZCBvZiBjaGFydFxyXG4gICAgICAgIGxldCBzY2FsZXM6IEFycmF5PElTZXR0aW5ncz4gPSBjaGFydC5kYXRhW1NldHRpbmdJZHMuQ2hhcnRTY2FsZXNdO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzY2FsZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgbGV0IHNjYWxlID0gc2NhbGVzW2ldO1xyXG4gICAgICAgICAgbGV0IG5ld1NjYWxlOiBTY2FsZTtcclxuICAgICAgICAgIGlmKGkgPT0gMCl7XHJcbiAgICAgICAgICAgIC8vIFNldCBzY2FsZSBkYXRhIHRvIGFscmVhZHkgYXZhaWxhYmxlIGRlZmF1bHQgc2NhbGVcclxuICAgICAgICAgICAgbmV3U2NhbGUgPSBuZXdDaGFydC5jaGlsZHNbMF07XHJcbiAgICAgICAgICAgIG5ld1NjYWxlLnNldFNldHRpbmdzKHNjYWxlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIC8vIEFkZCBuZXcgc2NhbGVcclxuICAgICAgICAgICAgbmV3U2NhbGUgPSBuZXcgU2NhbGUoXCJcIiwgbmV3Q2hhcnQpO1xyXG4gICAgICAgICAgICBuZXdTY2FsZS5zZXRTZXR0aW5ncyhzY2FsZSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkWVNjYWxlKG5ld0NoYXJ0LCBuZXdTY2FsZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIC8vIFRPRE86IFNldCBzZXJpZXMgdG8gc2NhbGUgd2l0aGluIHNldFNldHRpbmdzIG1ldGhvZCBvZiBzY2FsZVxyXG4gICAgICAgICAgbGV0IHNlcmllc1Byb3ZpZGVyID0gdGhpcy5jb21wb25lbnQuZ2V0U3ViQ29tcG9uZW50KERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5TZXJpZXNQcm92aWRlcklkKSBhcyBJU2VyaWVzUHJvdmlkZXI7XHJcbiAgICAgICAgICBsZXQgc2VyaWVzSWRzID0gc2NhbGUuZGF0YVtTZXR0aW5nSWRzLlNjYWxlU2VyaWVzSWRzXTtcclxuICAgICAgICAgIHNlcmllc0lkcy5mb3JFYWNoKHNlcmllc0lkID0+IHtcclxuICAgICAgICAgICAgaWYoc2VyaWVzUHJvdmlkZXIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICBsZXQgc2VyaWVzID0gc2VyaWVzUHJvdmlkZXIuZ2V0KHNlcmllc0lkKTtcclxuICAgICAgICAgICAgICBpZihzZXJpZXMgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkU2VyaWVzVG9DaGFydChuZXdDaGFydCxbc2VyaWVzXSwgbmV3U2NhbGUsIHRydWUpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRDaGFydChuZXdDaGFydCwgLTEpO1xyXG5cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBcclxuICAvKipcclxuICAgKiBBZGRzIGEgY2hhcnQgdG8gdGhlIGRhdGFtb2RlbFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtJQ2hhcnRNYW5hZ2VyQ2hhcnR9IGNoYXJ0XHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XHJcbiAgICogQHJldHVybnMge2Jvb2xlYW59IGZhbHNlIGlmIGNoYXJ0IGFkZGluZyBub3QgcG9zc2libGUsIGVsc2UgdHJ1ZVxyXG4gICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBhZGRDaGFydChjaGFydCA6IElDaGFydE1hbmFnZXJDaGFydCwgaW5kZXg6IG51bWJlcik6IGJvb2xlYW57XHJcbiAgICBsZXQgZGF0YSA9IHRoaXMuZGF0YTtcclxuICAgIGlmKGRhdGEubGVuZ3RoID49IHRoaXMuX21heENoYXJ0Q291bnQpeyAvLyBMaW1pdGF0aW9uIG9mIGNoYXJ0c1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9jaGFydE1hbmFnZXJEYXRhLmFkZENoYXJ0KGNoYXJ0LCBpbmRleCk7XHJcblxyXG4gICAgdmFyIGV2ZW50QXJncyA9IG5ldyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3ModGhpcywgTW9kZWxDaGFuZ2VUeXBlLnVwZGF0ZVRhcmdldCwgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsQ2hhbmdlZEhpbnQuYWRkQ2hhcnQsIHtkYXRhOiBkYXRhLCBjaGFydDogY2hhcnQsIGluZGV4OiBpbmRleCwgdHlwZTogY2hhcnQuY2hhcnRUeXBlfSk7XHJcbiAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKHRoaXMsIGV2ZW50QXJncyk7ICBcclxuXHJcbiAgICBsZXQgY2hpbGRzY2xvbmUgPSBjaGFydC5jaGlsZHMuc2xpY2UoKTtcclxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBjaGlsZHNjbG9uZS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgIGxldCB5QXhpcyA9IGNoaWxkc2Nsb25lW2ldO1xyXG4gICAgICBsZXQgc2VyaWVzID0geUF4aXMuY2hpbGRzLnNsaWNlKCk7XHJcbiAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBzZXJpZXMubGVuZ3RoOyBqKyspe1xyXG4gICAgICAgIC8vIGZpcmUgYWRkIHNlcmllIGV2ZW50IGZvciBhbGwgc2VyaWVzIG9mIHRoaXMgY2hhcnRcclxuICAgICAgICB2YXIgZXZlbnRBcmdzID0gbmV3IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyh0aGlzLCBNb2RlbENoYW5nZVR5cGUudXBkYXRlVGFyZ2V0LCBDaGFydE1hbmFnZXJEYXRhTW9kZWxDaGFuZ2VkSGludC5hZGRTZXJpZSwge2RhdGE6IGRhdGEsIGNoYXJ0OiBjaGFydCwgYXhpczogY2hhcnQuY2hpbGRzWzBdLCBzZXJpZXM6IHNlcmllcywga2VlcFNjYWxlczogdHJ1ZX0pO1xyXG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZWQodGhpcywgZXZlbnRBcmdzKTsgXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0cnVlIGlmIGEgY2hhcnQgY2FuIGJlIGFkZGVkLCBlbHNlIGZhbHNlIGlmIGNoYXJ0IGxpbWl0IHdhcyByZWFjaGVkXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgY2FuQWRkQ2hhcnQoKTpib29sZWFue1xyXG4gICAgaWYodGhpcy5kYXRhLmxlbmd0aCA+PSB0aGlzLl9tYXhDaGFydENvdW50KXsgLy8gTGltaXRhdGlvbiBvZiBjaGFydHNcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG4gIFxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZXMgYSBjaGFydCBmcm9tIHRoZSBkYXRhbW9kZWxcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7SUNoYXJ0TWFuYWdlckNoYXJ0fSBjaGFydFxyXG4gICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICByZW1vdmVDaGFydChjaGFydCA6IElDaGFydE1hbmFnZXJDaGFydCl7XHJcbiAgICBsZXQgYXhpc0luQ2hhcnRzID0gY2hhcnQuZ2V0Q2hpbGRzKCk7XHJcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgYXhpc0luQ2hhcnRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgdGhpcy5yZW1vdmVZQXhpcyhjaGFydCwgYXhpc0luQ2hhcnRzW2ldKTtcclxuICAgIH1cclxuICAgIHRoaXMuX2NoYXJ0TWFuYWdlckRhdGEucmVtb3ZlQ2hhcnQoY2hhcnQpO1xyXG4gICAgdmFyIGV2ZW50QXJncyA9IG5ldyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3ModGhpcywgTW9kZWxDaGFuZ2VUeXBlLnVwZGF0ZVRhcmdldCwgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsQ2hhbmdlZEhpbnQucmVtb3ZlQ2hhcnQsIHtkYXRhOiB0aGlzLmRhdGEsIGNoYXJ0OiBjaGFydH0pO1xyXG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLCBldmVudEFyZ3MpOyAgXHJcbiAgfVxyXG4gIFxyXG4gIC8qKlxyXG4gICAqIE1vdmVzIGEgY2hhcnQgd2l0aGluIHRoZSBkYXRhbW9kZWxcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7SUNoYXJ0TWFuYWdlckNoYXJ0fSBjaGFydFxyXG4gICAqIEBwYXJhbSB7SUNoYXJ0TWFuYWdlckNoYXJ0fSB0YXJnZXRDaGFydFxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpbnNlcnRUeXBlIGUuZyBcImluc2VydEFib3ZlXCIgb3IgXCJpbnNlcnRCZWxvd1wiXHJcbiAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIG1vdmVDaGFydChjaGFydCA6IElDaGFydE1hbmFnZXJDaGFydCwgdGFyZ2V0Q2hhcnQgOiBJQ2hhcnRNYW5hZ2VyQ2hhcnQsIGluc2VydFR5cGU6IHN0cmluZyl7XHJcbiAgICB0aGlzLl9jaGFydE1hbmFnZXJEYXRhLm1vdmVDaGFydChjaGFydCwgdGFyZ2V0Q2hhcnQsIGluc2VydFR5cGUpO1xyXG4gICAgdmFyIGV2ZW50QXJncyA9IG5ldyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3ModGhpcywgTW9kZWxDaGFuZ2VUeXBlLnVwZGF0ZVRhcmdldCwgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsQ2hhbmdlZEhpbnQubW92ZUNoYXJ0LCB7ZGF0YTogdGhpcy5kYXRhLCBjaGFydDogY2hhcnQsIHRhcmdldDogdGFyZ2V0Q2hhcnQsIGluc2VydFR5cGU6IGluc2VydFR5cGV9KTtcclxuICAgIHRoaXMub25Nb2RlbENoYW5nZWQodGhpcywgZXZlbnRBcmdzKTsgIFxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkcyBhIHNlcmllIHRvIGEgY2hhcnRcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7SUNoYXJ0TWFuYWdlckNoYXJ0fSBjaGFydFxyXG4gICAqIEBwYXJhbSB7QXJyYXk8QmFzZVNlcmllcz59IHNlcmllc1xyXG4gICAqIEBwYXJhbSB7U2NhbGV9IHNjYWxlXHJcbiAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIGFkZFNlcmllc1RvQ2hhcnQoY2hhcnQ6IElDaGFydE1hbmFnZXJDaGFydCwgc2VyaWVzOiBBcnJheTxCYXNlU2VyaWVzPiwgc2NhbGUgOiBTY2FsZSwga2VlcFNjYWxlczogYm9vbGVhbiA9IGZhbHNlKXtcclxuICAgIGlmKGNoYXJ0LmdldFlTY2FsZShzY2FsZS5pZCkgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgY2hhcnQuYWRkWVNjYWxlKHNjYWxlKTtcclxuICAgIH1cclxuICAgIGNoYXJ0LmFkZFNlcmllcyhzZXJpZXMsIHNjYWxlKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2VyaWVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgc2VyaWVzW2ldLmV2ZW50RGF0YUNoYW5nZWQuYXR0YWNoKHRoaXMuX3NlcmllRGF0YUNoYW5nZWRIYW5kbGVyKTtcclxuICAgIH1cclxuICAgIHZhciBldmVudEFyZ3MgPSBuZXcgRXZlbnRNb2RlbENoYW5nZWRBcmdzKHRoaXMsIE1vZGVsQ2hhbmdlVHlwZS51cGRhdGVUYXJnZXQsIENoYXJ0TWFuYWdlckRhdGFNb2RlbENoYW5nZWRIaW50LmFkZFNlcmllLCB7ZGF0YTogdGhpcy5kYXRhLCBjaGFydDogY2hhcnQsIHNlcmllczogc2VyaWVzLCBheGlzOiBzY2FsZSwga2VlcFNjYWxlczoga2VlcFNjYWxlc30pO1xyXG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLCBldmVudEFyZ3MpO1xyXG4gIH1cclxuICBcclxuICAvKipcclxuICAgKiBSZW1vdmVzIGEgc2VyaWUgZnJvbSBhIGNoYXJ0XHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0lDaGFydE1hbmFnZXJDaGFydH0gY2hhcnRcclxuICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNlcmllXHJcbiAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIHJlbW92ZVNlcmllKGNoYXJ0OiBJQ2hhcnRNYW5hZ2VyQ2hhcnQsIHNlcmllIDogQmFzZVNlcmllcyl7XHJcbiAgICBpZihjaGFydCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICBjaGFydC5yZW1vdmVTZXJpZShzZXJpZSk7XHJcbiAgICAgIGxldCBjaGFydHNXaXRoVGhpc1NlcmllID0gdGhpcy5nZXRDaGFydHNXaXRoU2VyaWUoc2VyaWUpO1xyXG4gICAgICBsZXQgc2VyaWVVc2VkID0gZmFsc2U7XHJcbiAgICAgIGlmKGNoYXJ0c1dpdGhUaGlzU2VyaWUubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgc2VyaWVVc2VkID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICBlbHNleyAvLyBTZXJpZSBub3QgdXNlZCBpbiBhbiBvdGhlciBjaGFydCA9PiBkZXRhY2ggZXZlbnRzXHJcbiAgICAgICAgc2VyaWUuZXZlbnREYXRhQ2hhbmdlZC5kZXRhY2godGhpcy5fc2VyaWVEYXRhQ2hhbmdlZEhhbmRsZXIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgZXZlbnRBcmdzID0gbmV3IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyh0aGlzLCBNb2RlbENoYW5nZVR5cGUudXBkYXRlVGFyZ2V0LCBDaGFydE1hbmFnZXJEYXRhTW9kZWxDaGFuZ2VkSGludC5yZW1vdmVTZXJpZSwge2RhdGE6IHRoaXMuZGF0YSwgY2hhcnQ6IGNoYXJ0LCBzZXJpZTogc2VyaWUsIHNpZ25hbFVzZWRJbk90aGVyQ2hhcnRzOiBzZXJpZVVzZWR9KTtcclxuICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLCBldmVudEFyZ3MpOyAgXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGRzIGEgeUF4aXMgdG8gdGhlIGdpdmVuIGNoYXJ0XHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0lDaGFydE1hbmFnZXJDaGFydH0gY2hhcnRcclxuICAgKiBAcGFyYW0ge1NjYWxlfSB5U2NhbGVcclxuICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgYWRkWVNjYWxlKGNoYXJ0OiBJQ2hhcnRNYW5hZ2VyQ2hhcnQsIHlTY2FsZTogU2NhbGUpIHtcclxuICAgIGlmKGNoYXJ0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgIGNoYXJ0LmFkZFlTY2FsZSh5U2NhbGUpO1xyXG5cclxuICAgICAgeVNjYWxlLmV2ZW50RGF0YUNoYW5nZWQuYXR0YWNoKHRoaXMuX3NjYWxlRGF0YUNoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgdmFyIGV2ZW50QXJncyA9IG5ldyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3ModGhpcywgTW9kZWxDaGFuZ2VUeXBlLnVwZGF0ZVRhcmdldCwgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsQ2hhbmdlZEhpbnQuYWRkWVNjYWxlLCB7ZGF0YTogdGhpcy5kYXRhLCBjaGFydDogY2hhcnQsIHlBeGlzOiB5U2NhbGV9KTtcclxuICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLCBldmVudEFyZ3MpOyAgXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0RGVmYXVsdFhTY2FsZVJhbmdlQnlUeXBlKHR5cGU6IENoYXJ0VHlwZSkgOiBTaW1wbGVSYW5nZXtcclxuICAgIGxldCBzY2FsZVJhbmdlOiBTaW1wbGVSYW5nZSA9IHttaW46IDAsIG1heDogMTAwfTtcclxuICAgIGxldCBjaGFydDogQ2hhcnRNYW5hZ2VyQ2hhcnQ7XHJcblxyXG4gICAgaWYodHlwZSA9PSBDaGFydFR5cGUuWFlDaGFydCl7XHJcbiAgICAgIHJldHVybiBzY2FsZVJhbmdlO1xyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgZm9yKGNoYXJ0IG9mIHRoaXMuZGF0YSl7XHJcbiAgICAgICAgaWYoY2hhcnQuY2hhcnRUeXBlID09IHR5cGUpe1xyXG4gICAgICAgICAgc2NhbGVSYW5nZS5tYXggPSBjaGFydC5jaGlsZHNbMF0ubWF4WFZhbHVlO1xyXG4gICAgICAgICAgc2NhbGVSYW5nZS5taW4gPSBjaGFydC5jaGlsZHNbMF0ubWluWFZhbHVlO1xyXG4gICAgICAgICAgcmV0dXJuIHNjYWxlUmFuZ2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgXHJcbiAgICByZXR1cm4gc2NhbGVSYW5nZTtcclxuICB9XHJcblxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlcyBhIHlBeGlzIGZyb20gdGhlIGdpdmVuIGNoYXJ0XHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0lDaGFydE1hbmFnZXJDaGFydH0gY2hhcnRcclxuICAgKiBAcGFyYW0ge1NjYWxlfSB5QXhpc1xyXG4gICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICByZW1vdmVZQXhpcyhjaGFydDogSUNoYXJ0TWFuYWdlckNoYXJ0LCB5QXhpczogU2NhbGUpIHtcclxuICAgIGlmKGNoYXJ0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgIC8vRmlyc3QsIHJlbW92ZSBzZXJpZXMgZnJvbSBZIEF4aXNcclxuICAgICAgbGV0IHNlcmllc0luQXhpcyA9IHlBeGlzLmdldENoaWxkcygpO1xyXG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2VyaWVzSW5BeGlzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICB0aGlzLnJlbW92ZVNlcmllKGNoYXJ0LCBzZXJpZXNJbkF4aXNbaV0pO1xyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgICBpZihjaGFydC5yZW1vdmVZQXhpcyh5QXhpcykgPT0gdHJ1ZSl7XHJcbiAgICAgICAgdmFyIGV2ZW50QXJncyA9IG5ldyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3ModGhpcywgTW9kZWxDaGFuZ2VUeXBlLnVwZGF0ZVRhcmdldCwgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsQ2hhbmdlZEhpbnQucmVtb3ZlWVNjYWxlLCB7ZGF0YTogdGhpcy5kYXRhLCBjaGFydDogY2hhcnQsIHlBeGlzOiB5QXhpc30pO1xyXG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZWQodGhpcywgZXZlbnRBcmdzKTsgIFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmVzIGEgc2VyaWUgZnJvbSBhbGwgY2hhcnRzXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNlcmllc1xyXG4gICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICByZW1vdmVTZXJpZUZyb21BbGxDaGFydHMoc2VyaWUgOiBCYXNlU2VyaWVzW10pe1xyXG4gICAgZm9yKGxldCBpPTA7IGkgPCB0aGlzLmRhdGEubGVuZ3RoOyBpKyspe1xyXG4gICAgICBsZXQgY2hhcnQgPSB0aGlzLmRhdGFbaV07XHJcbiAgICAgICAgaWYoY2hhcnQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY2hhcnQuY2hpbGRzLmxlbmd0aDsgaisrKXtcclxuICAgICAgICAgICAgaWYoY2hhcnQucmVtb3ZlU2VyaWUoc2VyaWUpKXtcclxuICAgICAgICAgICAgICB2YXIgZXZlbnRBcmdzID0gbmV3IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyh0aGlzLCBNb2RlbENoYW5nZVR5cGUudXBkYXRlVGFyZ2V0LCBDaGFydE1hbmFnZXJEYXRhTW9kZWxDaGFuZ2VkSGludC5yZW1vdmVTZXJpZSwge2RhdGE6IHRoaXMuZGF0YSwgY2hhcnQ6IGNoYXJ0LCBzZXJpZTogc2VyaWUsIHNpZ25hbFVzZWRJbk90aGVyQ2hhcnRzOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKHRoaXMsIGV2ZW50QXJncyk7ICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBNb3ZlcyBhIHNlcmllIGZyb20gb25lIHBvc2l0aW9uIHRvIGFuIG90aGVyLCB3aXRoaW4gYSBjaGFydCBvciBpbnRvIGFuIG90aGVyIGNoYXJ0ICg9PiBjdXJyZW50bHkgb25seSBjaGFuZ2VkIGV2ZW50IHdpbGwgcmFpc2VkLCBtb3ZpbmcgaXMgZG9uZSBieSBzeW5jZnVzaW9uIHRyZWVncmlkISEhKSBcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7SUNoYXJ0TWFuYWdlckNoYXJ0fSBzb3VyY2VDaGFydFxyXG4gICAqIEBwYXJhbSB7U2NhbGV9IHNvdXJjZUF4aXNcclxuICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNlcmllXHJcbiAgICogQHBhcmFtIHtJQ2hhcnRNYW5hZ2VyQ2hhcnR9IHRhcmdldENoYXJ0XHJcbiAgICogQHBhcmFtIHtTY2FsZX0gdGFyZ2V0QXhpc1xyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpbnNlcnRUeXBlXHJcbiAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIG1vdmVTZXJpZShzb3VyY2VDaGFydCA6IElDaGFydE1hbmFnZXJDaGFydCwgc291cmNlQXhpczogU2NhbGUsIHNlcmllOiBCYXNlU2VyaWVzLCB0YXJnZXRDaGFydCA6IElDaGFydE1hbmFnZXJDaGFydCwgdGFyZ2V0QXhpczogU2NhbGUsIGluc2VydFR5cGU6IHN0cmluZyl7XHJcbiAgICAvLyBjdXJyZW50bHkgb25seSBjaGFuZ2VkIGV2ZW50IHdpbGwgcmFpc2VkIChtb3ZpbmcgaXMgZG9uZSBieSBzeW5jZnVzaW9uIHRyZWVncmlkISEhKSBcclxuICAgIHZhciBldmVudEFyZ3MgPSBuZXcgRXZlbnRNb2RlbENoYW5nZWRBcmdzKHRoaXMsIE1vZGVsQ2hhbmdlVHlwZS51cGRhdGVUYXJnZXQsIENoYXJ0TWFuYWdlckRhdGFNb2RlbENoYW5nZWRIaW50Lm1vdmVTZXJpZSwge2RhdGE6IHRoaXMuZGF0YSwgY2hhcnQ6IHNvdXJjZUNoYXJ0LCB0YXJnZXRDaGFydDogdGFyZ2V0Q2hhcnQsIHNlcmllOiBzZXJpZSwgdGFyZ2V0QXhpczogdGFyZ2V0QXhpc30pO1xyXG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLCBldmVudEFyZ3MpOyAgXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdGhlIGNoYXJ0IGRpc2FibGVkIG9yIGVuYWJsZWRcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7SUNoYXJ0TWFuYWdlckNoYXJ0fSBjaGFydFxyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gZGlzYWJsZWRcclxuICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgLypkaXNhYmxlQ2hhcnQoY2hhcnQ6IElDaGFydE1hbmFnZXJDaGFydCwgZGlzYWJsZWQ6IGJvb2xlYW4pe1xyXG4gICAgY2hhcnQuc2V0RGlzYWJsZWQoZGlzYWJsZWQpO1xyXG4gICAgdmFyIGV2ZW50QXJncyA9IG5ldyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3ModGhpcywgTW9kZWxDaGFuZ2VUeXBlLnVwZGF0ZVRhcmdldCwgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsQ2hhbmdlZEhpbnQuZGlzYWJsZUNoYXJ0LCB7ZGF0YTogdGhpcy5kYXRhfSk7XHJcbiAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKHRoaXMsIGV2ZW50QXJncyk7ICBcclxuICB9Ki9cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgY2hhcnQgd2l0aCB0aGUgZ2l2ZW4gbmFtZSBvciB1bmRlZmluZWQgaWYgbm90IGZvdW5kXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2hhcnROYW1lXHJcbiAgICogQHJldHVybnMgeyhJQ2hhcnRNYW5hZ2VyQ2hhcnR8dW5kZWZpbmVkKX1cclxuICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgZ2V0Q2hhcnQoY2hhcnROYW1lOiBzdHJpbmcpOiBJQ2hhcnRNYW5hZ2VyQ2hhcnR8dW5kZWZpbmVke1xyXG4gICAgZm9yIChsZXQgY2hhcnQgb2YgIHRoaXMuZGF0YSkge1xyXG4gICAgICBpZihjaGFydC5uYW1lID09IGNoYXJ0TmFtZSl7XHJcbiAgICAgICAgcmV0dXJuIGNoYXJ0O1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgYSB1bmlxdWUgY2hhcnQgbmFtZSAoZS5nIFwiQ2hhcnQgMVwiLCBcImNoYXJ0IDJcIiwgLi4uKVxyXG4gICAqXHJcbiAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgZ2V0VW5pcXVlQ2hhcnROYW1lKCk6IHN0cmluZ3tcclxuICAgIGZvcih2YXIgaT0xOyAxPDEwMDA7IGkrKyl7XHJcbiAgICAgIHZhciBuZXdjaGFydE5hbWUgPSBcIkNoYXJ0IFwiK2k7XHJcbiAgICAgIHZhciBjaGFydE5hbWVBbHJlYWR5RXhpc3RzID0gZmFsc2U7XHJcbiAgICAgIGZvciAobGV0IGNoYXJ0IG9mIHRoaXMuZGF0YSl7XHJcbiAgICAgICAgaWYoY2hhcnQubmFtZSA9PSBuZXdjaGFydE5hbWUpe1xyXG4gICAgICAgICAgY2hhcnROYW1lQWxyZWFkeUV4aXN0cyA9IHRydWU7ICBcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZihjaGFydE5hbWVBbHJlYWR5RXhpc3RzID09IGZhbHNlKVxyXG4gICAgICAgIHJldHVybiBuZXdjaGFydE5hbWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gXCJDaGFydCAxMDAwXCI7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIGFsbCBjaGFydHMgd2hpY2ggd29yayB3aXRoIHRoZSBnaXZlbiBzZXJpZVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtBcnJheTxCYXNlU2VyaWVzPn0gc2VyaWVcclxuICAgKiBAcmV0dXJucyB7QXJyYXk8SUNoYXJ0TWFuYWdlckNoYXJ0Pn1cclxuICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgcHVibGljIGdldENoYXJ0c1VzaW5nU2VyaWUoc2VyaWUgOiBBcnJheTxCYXNlU2VyaWVzPik6IEFycmF5PElDaGFydE1hbmFnZXJDaGFydD57XHJcbiAgICBsZXQgY2hhcnRzID0gbmV3IEFycmF5PElDaGFydE1hbmFnZXJDaGFydD4oKTtcclxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmRhdGEubGVuZ3RoOyBpKyspe1xyXG4gICAgICBsZXQgY2hhcnQ6IElDaGFydE1hbmFnZXJDaGFydCA9IHRoaXMuZGF0YVtpXTtcclxuICAgICAgaWYoY2hhcnQuaGFzU2VyaWVzKHNlcmllKSl7XHJcbiAgICAgICAgY2hhcnRzLnB1c2goY2hhcnQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY2hhcnRzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyBhbGwgY2hhcnRzIHdoaWNoIGhhdmUgdGhlIGdpdmVuIHNlcmllXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNlcmllXHJcbiAgICogQHJldHVybnMge0FycmF5PElDaGFydE1hbmFnZXJDaGFydD59XHJcbiAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXRDaGFydHNXaXRoU2VyaWUoc2VyaWUgOiBCYXNlU2VyaWVzKTogQXJyYXk8SUNoYXJ0TWFuYWdlckNoYXJ0PntcclxuICAgIGxldCBjaGFydHMgPSBuZXcgQXJyYXk8SUNoYXJ0TWFuYWdlckNoYXJ0PigpO1xyXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuZGF0YS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgIGxldCBjaGFydCA9IHRoaXMuZGF0YVtpXTtcclxuICAgICAgaWYoY2hhcnQuaGFzU2VyaWUoc2VyaWUpKXtcclxuICAgICAgICBjaGFydHMucHVzaChjaGFydCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBjaGFydHM7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uU2VyaWVEYXRhQ2hhbmdlZChzZW5kZXI6IEJhc2VTZXJpZXMsIGFyZ3M6IEV2ZW50U2VyaWVEYXRhQ2hhbmdlZEFyZ3Mpe1xyXG4gICAgaWYoYXJncy5hY3Rpb24gPT0gU2VyaWVBY3Rpb24ucmVuYW1lKXtcclxuICAgICAgdmFyIGV2ZW50QXJncyA9IG5ldyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3ModGhpcywgTW9kZWxDaGFuZ2VUeXBlLnVwZGF0ZVRhcmdldCwgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsQ2hhbmdlZEhpbnQucmVuYW1lU2lnbmFsLCB7ZGF0YTogdGhpcy5kYXRhfSk7XHJcbiAgICAgIHRoaXMub25Nb2RlbENoYW5nZWQodGhpcywgZXZlbnRBcmdzKTsgIFxyXG4gICAgfVxyXG4gICAgZWxzZSBpZihhcmdzLmFjdGlvbiA9PSBTZXJpZUFjdGlvbi5zdGFydFRyaWdnZXJUaW1lQ2hhbmdlZCl7XHJcbiAgICAgIHZhciBldmVudEFyZ3MgPSBuZXcgRXZlbnRNb2RlbENoYW5nZWRBcmdzKHRoaXMsIE1vZGVsQ2hhbmdlVHlwZS51cGRhdGVUYXJnZXQsIENoYXJ0TWFuYWdlckRhdGFNb2RlbENoYW5nZWRIaW50LnN0YXJ0VHJpZ2dlclRpbWVDaGFuZ2VkLCB7ZGF0YTogdGhpcy5kYXRhfSk7XHJcbiAgICAgIHRoaXMub25Nb2RlbENoYW5nZWQodGhpcywgZXZlbnRBcmdzKTsgIFxyXG4gICAgfVxyXG4gICAgZWxzZSBpZihhcmdzLmFjdGlvbiA9PSBTZXJpZUFjdGlvbi5jb2xvckNoYW5nZWQpe1xyXG4gICAgICB2YXIgZXZlbnRBcmdzID0gbmV3IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyh0aGlzLCBNb2RlbENoYW5nZVR5cGUudXBkYXRlVGFyZ2V0LCBDaGFydE1hbmFnZXJEYXRhTW9kZWxDaGFuZ2VkSGludC5jb2xvckNoYW5nZWQsIHtkYXRhOiB0aGlzLmRhdGF9KTtcclxuICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLCBldmVudEFyZ3MpOyAgXHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKGFyZ3MuYWN0aW9uID09IFNlcmllQWN0aW9uLmRhdGFQb2ludHNDaGFuZ2VkKXsgLy8gTmVlZGVkIGZvciBzaG93aW5nIGNvcnJlY3QgdmFsaWQvaW52YWxpZCBpY29uIGluIGNoYXJ0bWFuYWdlciBpZiBkYXRhIGNoYW5nZXNcclxuICAgICAgdmFyIGV2ZW50QXJncyA9IG5ldyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3ModGhpcywgTW9kZWxDaGFuZ2VUeXBlLnVwZGF0ZVRhcmdldCwgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsQ2hhbmdlZEhpbnQuZGF0YVBvaW50c0NoYW5nZWQsIHtkYXRhOiB0aGlzLmRhdGF9KTtcclxuICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLCBldmVudEFyZ3MpOyAgXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uU2NhbGVEYXRhQ2hhbmdlZChzZW5kZXI6IFNjYWxlLCBhcmdzOiBFdmVudFNjYWxlRGF0YUNoYW5nZWRBcmdzKXtcclxuICAgIGlmKGFyZ3MuYWN0aW9uID09IFNjYWxlQWN0aW9uLnhSYW5nZUNoYW5nZWQgJiYgYXJncy5kYXRhLnNjYWxlLnBhcmVudC5jaGFydFR5cGUgIT0gQ2hhcnRUeXBlLlhZQ2hhcnQpe1xyXG4gICAgICB2YXIgZXZlbnRBcmdzID0gbmV3IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyh0aGlzLCBNb2RlbENoYW5nZVR5cGUudXBkYXRlVGFyZ2V0LCBDaGFydE1hbmFnZXJEYXRhTW9kZWxDaGFuZ2VkSGludC51cGRhdGVTY2FsZVJhbmdlLCB7ZGF0YTogdGhpcy5kYXRhLCBzY2FsZTogc2VuZGVyfSk7XHJcbiAgICAgIHRoaXMub25Nb2RlbENoYW5nZWQodGhpcywgZXZlbnRBcmdzKTsgIFxyXG4gICAgfVxyXG4gICAgaWYoYXJncy5hY3Rpb24gPT0gU2NhbGVBY3Rpb24ueVJhbmdlQ2hhbmdlZCl7XHJcbiAgICAgIHZhciBldmVudEFyZ3MgPSBuZXcgRXZlbnRNb2RlbENoYW5nZWRBcmdzKHRoaXMsIE1vZGVsQ2hhbmdlVHlwZS51cGRhdGVUYXJnZXQsIENoYXJ0TWFuYWdlckRhdGFNb2RlbENoYW5nZWRIaW50LmRlZmF1bHQsIHtkYXRhOiB0aGlzLmRhdGEsIHNjYWxlOiBzZW5kZXJ9KTtcclxuICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLCBldmVudEFyZ3MpOyAgXHJcbiAgICB9XHJcblxyXG4gICAgaWYoYXJncy5hY3Rpb24gPT0gU2NhbGVBY3Rpb24ueFJhbmdlQ2hhbmdlZCAmJiBhcmdzLmRhdGEuc2NhbGUucGFyZW50LmNoYXJ0VHlwZSA9PSBDaGFydFR5cGUuWFlDaGFydCl7XHJcbiAgICAgIHZhciBldmVudEFyZ3MgPSBuZXcgRXZlbnRNb2RlbENoYW5nZWRBcmdzKHRoaXMsIE1vZGVsQ2hhbmdlVHlwZS51cGRhdGVUYXJnZXQsIENoYXJ0TWFuYWdlckRhdGFNb2RlbENoYW5nZWRIaW50LmRlZmF1bHQsIHtkYXRhOiB0aGlzLmRhdGEsIHNjYWxlOiBzZW5kZXJ9KTtcclxuICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLCBldmVudEFyZ3MpOyAgXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==