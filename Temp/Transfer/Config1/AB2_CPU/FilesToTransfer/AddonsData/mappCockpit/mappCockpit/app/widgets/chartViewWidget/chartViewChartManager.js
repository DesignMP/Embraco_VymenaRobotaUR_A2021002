define(["require", "exports", "../chartWidget/YTChart", "../chartWidget/XYChart", "../chartWidget/FFTChart", "./chartViewWidget", "../common/viewTypeProvider", "../chartWidget/helpers/chartRangeHelper", "../../models/chartManagerDataModel/chartManagerDataModel", "../../models/chartManagerDataModel/chartManagerChart", "../../models/chartManagerDataModel/eventSerieDataChangedArgs", "./helpers/chartDropHelper", "../common/states/chartViewToolbarStates", "../../core/interfaces/components/ui/chart/chartInterface", "../common/SerieChartTypeHelper", "../../models/chartManagerDataModel/seriesType", "../chartWidget/cursor/CrossHairCursor", "../chartWidget/cursor/LineCursor", "../common/paneProperties"], function (require, exports, YTChart_1, XYChart_1, FFTChart_1, chartViewWidget_1, viewTypeProvider_1, chartRangeHelper_1, chartManagerDataModel_1, chartManagerChart_1, eventSerieDataChangedArgs_1, chartDropHelper_1, chartViewToolbarStates_1, chartInterface_1, SerieChartTypeHelper_1, seriesType_1, CrossHairCursor_1, LineCursor_1, paneProperties_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ChartViewChartManager = /** @class */ (function () {
        function ChartViewChartManager(chartViewWidget, userInteractionController, layoutManager, chartManagerDataModel) {
            var _this = this;
            this.traceChartList = [];
            this.series = new Array();
            this._onSerieDataChanged = function (sender, eventArgs) { return _this.onSerieDataChanged(sender, eventArgs); };
            this._userChartInteractionHandler = function (sender, args) { return _this.onUserChartInteraction(sender, args); };
            this._onRedrawAllCharts = function (sender, args) { return _this.onRedrawAllCharts(sender, args); };
            this._persistedPanes = [];
            this.chartViewWidget = chartViewWidget;
            this._states = chartViewWidget.states;
            this.userInteractionController = userInteractionController;
            this.layoutManager = layoutManager;
            this._chartManagerDataModel = chartManagerDataModel;
        }
        ChartViewChartManager.prototype.initChartViewWithDataModel = function () {
            var _this = this;
            if (this._chartManagerDataModel != undefined) {
                // If there are already charts in the datamodel => show in chart view => needed for persisting
                if (this._chartManagerDataModel.data != undefined) {
                    //Get persisted chart panes
                    this._persistedPanes = this.layoutManager.chartSplitter.getChartViewSplitterPaneDefinitions();
                    this._chartManagerDataModel.data.forEach(function (chart) {
                        // Add charts, add scales, add series
                        _this.addTraceChart(chart, -1, chart.chartType);
                    });
                }
            }
        };
        ChartViewChartManager.prototype.dispose = function () {
            for (var i = 0; i < this.traceChartList.length; i++) {
                this.traceChartList[i].dispose();
            }
        };
        ChartViewChartManager.prototype.addTraceChart = function (chart, index, type) {
            if (index === void 0) { index = -1; }
            //store series in variable and remove them from chart for initialisation
            var series = chart.childs[0].childs;
            chart.childs[0].childs = [];
            var newTraceChart = this.addChartToContainer(chart.name, index, type, chart.childs[0]);
            //add series to scale again
            chart.childs[0].childs = series;
            this.redrawCharts(false);
            var scales = chart.childs;
            for (var i = 0; i < scales.length; i++) {
                if (i == 0) {
                    // Update scale(X)
                    /*let chartObj = this.getChartObjectByName(chart.name);
                    if(chartObj != undefined){
                        chartObj.updateChartRangeX(scales[i].minXValue, scales[i].maxXValue);
                    }*/
                }
                else {
                    this.addYScale(scales[i], chart.name);
                }
            }
            for (var i = 0; i < scales.length; i++) {
                if (scales[i].childs.length > 0) {
                    this.addSeriesToChart(scales[i].childs, chart, chart.childs[i], true);
                }
                if (newTraceChart != undefined) {
                    newTraceChart.setScaleRange(scales[i], scales[i].minXValue, scales[i].maxXValue, scales[i].minYValue, scales[i].maxYValue);
                }
            }
            this.updateZoomSettings();
            this.updateXAxisWidth(chart.chartType);
            return newTraceChart;
        };
        ChartViewChartManager.prototype.addChartToContainer = function (name, index, type, scale) {
            if (index === void 0) { index = -1; }
            var traceChart;
            var chartHeight = 300;
            var minSize = 100;
            if (this.chartViewWidget.view) {
                // TODO: Handle with settings object factory
                if (type === chartManagerChart_1.ChartType.YTChart) {
                    traceChart = new YTChart_1.YTChart(this.chartViewWidget.view, name, type, scale);
                }
                else if (type === chartManagerChart_1.ChartType.XYChart) {
                    traceChart = new XYChart_1.XYChart(this.chartViewWidget.view, name, type, scale);
                }
                else {
                    traceChart = new FFTChart_1.FFTChart(this.chartViewWidget.view, name, type, scale);
                }
                traceChart.eventUserChartInteraction.attach(this._userChartInteractionHandler);
                traceChart.eventRedrawAllCharts.attach(this._onRedrawAllCharts);
                //Set the height of persisted charts
                if (this._persistedPanes.length > 0) {
                    chartHeight = this.getPersistedChartHeight(name);
                    //Workaround: Add 2 pixels if is the first chart 
                    if (this.layoutManager.chartSplitter.layoutPanes.length == 0) {
                        chartHeight += 2;
                    }
                }
                var paneProperties = new paneProperties_1.PaneProperties();
                paneProperties.paneSize = chartHeight;
                paneProperties.minSize = minSize;
                this.layoutManager.chartSplitter.addWidget(traceChart, name, viewTypeProvider_1.ViewType.User, paneProperties);
                if (index != -1) {
                    // TODO: set index at addWidget Method to avoid moving the chart afterwards
                    this.layoutManager.chartSplitter.moveWidget(traceChart, index);
                    this.traceChartList.splice(index, 0, traceChart);
                }
                else {
                    this.traceChartList.push(traceChart);
                }
                return traceChart;
            }
            return undefined;
        };
        /**
         * Get height of persisted charts
         *
         * @param {string} chartName
         * @returns {number}
         * @memberof ChartViewChartManager
         */
        ChartViewChartManager.prototype.getPersistedChartHeight = function (chartName) {
            var chartHeight = this.layoutManager.getChartViewSplitterHeight(this._persistedPanes, chartName);
            this._persistedPanes = this._persistedPanes.filter(function (element) { return element.componentDefinition.id != chartName; });
            return chartHeight;
        };
        /**
         * Method to set the ZoomSetting(Direction and BoxZoom) for all Charts according to the corresponding states
         *
         * @private
         * @memberof ChartViewChartManager
         */
        ChartViewChartManager.prototype.updateZoomSettings = function () {
            var toolstate = this._states.read(chartViewToolbarStates_1.ChartViewToolState, "ChartViewToolState");
            var zoomDirectionState = this._states.read(chartViewToolbarStates_1.ChartViewZoomDirectionState, "ChartViewZoomDirectionState");
            if (toolstate.selectedTool == chartViewToolbarStates_1.ChartViewToolStateEnum.BOXZOOM) {
                this.setBoxZoom(true);
                this.setPanning(false);
            }
            else if (toolstate.selectedTool == chartViewToolbarStates_1.ChartViewToolStateEnum.PANNING) {
                this.setBoxZoom(false);
                this.setPanning(false);
            }
            else {
                this.setBoxZoom(false);
                this.setPanning(false);
            }
            this.setChartZoomAxes(zoomDirectionState.zoomDirection);
        };
        ChartViewChartManager.prototype.removeTraceChart = function (chart) {
            chart.eventUserChartInteraction.detach(this._userChartInteractionHandler);
            chart.eventRedrawAllCharts.detach(this._onRedrawAllCharts);
            this.removeChartFromChartList(chart);
            chart.dispose();
            this.layoutManager.chartSplitter.removeWidget(chart);
        };
        ChartViewChartManager.prototype.removeChartFromChartList = function (chart) {
            var index = this.getChartIndex(chart);
            if (index > -1) {
                this.traceChartList.splice(index, 1);
            }
        };
        ChartViewChartManager.prototype.moveTraceChart = function (chart, targetChart, args) {
            var traceChart = this.getChartObjectByName(chart.name);
            var targetTraceChart = this.getChartObjectByName(targetChart.name);
            if (traceChart != undefined && targetTraceChart != undefined) {
                var chartIndex = this.getChartIndex(traceChart);
                var targetIndex = this.getChartIndex(targetTraceChart);
                if (args.insertType == "insertBelow") {
                    targetIndex += 1;
                }
                if (chartIndex > -1 && targetIndex > -1) {
                    this.traceChartList.splice(chartIndex, 1);
                    if (chartIndex < targetIndex) {
                        this.traceChartList.splice(targetIndex - 1, 0, traceChart);
                    }
                    else {
                        this.traceChartList.splice(targetIndex, 0, traceChart);
                    }
                    this.layoutManager.chartSplitter.moveWidget(traceChart, targetIndex);
                }
                //add all additional axes to chart
                for (var i = 1; i < traceChart.scales.length; i++) {
                    traceChart.addYScale(traceChart.scales[i], chartInterface_1.AxisPosition.right);
                }
                this.redrawCharts(false);
                this.updateXAxisWidth(chart.chartType);
            }
        };
        ChartViewChartManager.prototype.removeAllCharts = function () {
            while (this.traceChartList.length > 0) {
                this.removeTraceChart(this.traceChartList[0]);
            }
        };
        ChartViewChartManager.prototype.getChartIndex = function (chart) {
            var index = -1;
            for (var i = 0; i < this.traceChartList.length; i++) {
                if (this.traceChartList[i] == chart) {
                    index = i;
                }
            }
            return index;
        };
        ChartViewChartManager.prototype.getTraceChartByContainerId = function (containerID) {
            for (var i = 0; i < this.traceChartList.length; i++) {
                if (this.traceChartList[i].parentContentId == containerID.substr(0, this.traceChartList[i].parentContentId.length)) {
                    return this.traceChartList[i];
                }
            }
            return undefined;
        };
        ChartViewChartManager.prototype.getTraceChartByName = function (chartName) {
            for (var i = 0; i < this.traceChartList.length; i++) {
                if (this.traceChartList[i].widgetName == chartName) {
                    return this.traceChartList[i];
                }
            }
            return undefined;
        };
        ChartViewChartManager.prototype.onChartManagerModelChanged = function (dataModel, args) {
            this._chartManagerDataModel = dataModel;
            switch (args.hint) {
                case chartManagerDataModel_1.ChartManagerDataModelChangedHint.addSerie: {
                    this.addSeriesToChart(args.data.series, args.data.chart, args.data.axis, args.data.keepScales);
                    break;
                }
                case chartManagerDataModel_1.ChartManagerDataModelChangedHint.moveSerie: {
                    this.moveSerie(args.data.serie, args.data.chart.name, args.data.targetChart.name, args.data.targetAxis);
                    break;
                }
                case chartManagerDataModel_1.ChartManagerDataModelChangedHint.removeSerie: {
                    this.removeSerie(args.data.serie, args.data.chart.name);
                    break;
                }
                case chartManagerDataModel_1.ChartManagerDataModelChangedHint.removeChart: {
                    this.removeChart(args.data.chart);
                    break;
                }
                case chartManagerDataModel_1.ChartManagerDataModelChangedHint.addChart: {
                    this.addTraceChart(args.data.chart, args.data.index, args.data.type);
                    break;
                }
                case chartManagerDataModel_1.ChartManagerDataModelChangedHint.moveChart: {
                    this.moveTraceChart(args.data.chart, args.data.target, args.data);
                    break;
                }
                case chartManagerDataModel_1.ChartManagerDataModelChangedHint.addYScale: {
                    this.addYScale(args.data.yAxis, args.data.chart.name);
                    break;
                }
                case chartManagerDataModel_1.ChartManagerDataModelChangedHint.removeYScale: {
                    this.removeYAxis(args.data.yAxis, args.data.chart);
                    break;
                }
                case chartManagerDataModel_1.ChartManagerDataModelChangedHint.updateScaleRange: {
                    this.synchronizeScaleXRange(args.data.scale);
                    break;
                }
            }
        };
        ChartViewChartManager.prototype.addSeriesToChart = function (series, chart, scale, keepScales) {
            if (keepScales === void 0) { keepScales = false; }
            for (var i = 0; i < series.length; i++) {
                series[i].eventDataChanged.attach(this._onSerieDataChanged);
            }
            var chartName = chart.name;
            //let ytCharts: Array<ITraceChart> = this.getYTCharts();
            //let fftCharts: Array<ITraceChart> = this.getFFTCharts();
            var resetXRange = false;
            var resetYRange = false;
            if (!keepScales) {
                resetXRange = this.isFirstSeriesOfTypeInCharts(series[0]);
                resetYRange = this.isFirstSeriesOnScale(series[0], scale);
            }
            else {
                var chartObj = this.getChartObjectByName(chartName);
                if (chartObj != undefined) {
                    // TODO: Only works for YT but not for FFT
                    // Update scale(Y)
                    chartObj.setScaleRange(scale, scale.minXValue, scale.maxXValue, scale.minYValue, scale.maxYValue);
                    // Update scale(X)
                    chartObj.setRangeX(scale.minXValue, scale.maxXValue);
                }
            }
            this.addSeries(series, chartName, scale, resetYRange, resetXRange);
            if (resetXRange) {
                this.resetXRange(series[0]);
            }
        };
        /**
         *Checks if a given Series is the first Series on a particular scale
         *
         * @private
         * @param {Array<BaseSeries>} series
         * @param {Scale} scale
         * @returns {boolean}
         * @memberof ChartViewChartManager
         */
        ChartViewChartManager.prototype.isFirstSeriesOnScale = function (series, scale) {
            //only reset the chartrange on the y axis if these are the first series in the scale
            if (scale.childs.length < 1 || series != scale.childs[0]) {
                return false;
            }
            return true;
        };
        /**
         *Checks if a given Series is the first of its type in all charts
         *
         * @private
         * @param {BaseSeries} series
         * @returns
         * @memberof ChartViewChartManager
         */
        ChartViewChartManager.prototype.isFirstSeriesOfTypeInCharts = function (series) {
            var charts = this.getChartsForSerie(series);
            for (var _i = 0, charts_1 = charts; _i < charts_1.length; _i++) {
                var chart = charts_1[_i];
                if (chart.series.length != 0) {
                    return false;
                }
            }
            return true;
        };
        ChartViewChartManager.prototype.getChartsForSerie = function (series) {
            var charts = Array();
            if (series.type == seriesType_1.SeriesType.fftSeries) {
                charts = new chartRangeHelper_1.ChartRangeHelper().getFFTCharts(this.traceChartList);
            }
            else if (series.type == seriesType_1.SeriesType.timeSeries) {
                charts = new chartRangeHelper_1.ChartRangeHelper().getYTCharts(this.traceChartList);
            }
            return charts;
        };
        ChartViewChartManager.prototype.onSerieDataChanged = function (sender, eventArgs) {
            if (eventArgs.action == eventSerieDataChangedArgs_1.SerieAction.dataPointsChanged) {
                this.updateSerieData(sender);
            }
            else if (eventArgs.action == eventSerieDataChangedArgs_1.SerieAction.colorChanged) {
                this.updateSerieColor(sender);
            }
        };
        /**
         *  Updates the serie datapoints in all charts where the serie is displayed
         *  If datapoints not valid, the serie will be removed from the charts otherwise added if not already in the chart
         *
         * @private
         * @param {BaseSeries} series
         * @memberof ChartViewChartManager
         */
        ChartViewChartManager.prototype.updateSerieData = function (series) {
            if (series.rawPointsValid == false) {
                // No valid serie data => remove from all charts
                this.removeSerieFromAllCharts(series);
            }
            else {
                // add serie to chart if not already in it otherwise update chart
                if (this._chartManagerDataModel != undefined) {
                    var charts = this._chartManagerDataModel.getChartsUsingSerie([series]);
                    this.updateSerieInAllCharts(charts, series);
                }
            }
        };
        ChartViewChartManager.prototype.updateSerieInAllCharts = function (charts, series) {
            var serieChartType = SerieChartTypeHelper_1.SerieChartTypeHelper.getSerieChartType(series.type);
            for (var i = 0; i < charts.length; i++) {
                var chart = this.getChartObjectByName(charts[i].name);
                if (chart != undefined && serieChartType == chart.type) {
                    if (!this.isSerieInChart(chart, series)) {
                        // add series 
                        var scale = charts[i].getYAxisForSerie(series);
                        if (scale != undefined) {
                            var isFirstSeriesInChart = this.isFirstSeriesOfTypeInCharts(series);
                            this.addSeries([series], charts[i].name, scale, this.isFirstSeriesOnScale(series, scale), true);
                            if (isFirstSeriesInChart) {
                                this.resetXRange(series);
                            }
                        }
                        else {
                            console.error("Scale not found for serie");
                        }
                    }
                    chart.setAvailableSeriesAsDataSource();
                    chart.redrawChart();
                }
            }
        };
        ChartViewChartManager.prototype.resetXRange = function (series) {
            var chartRangeHelper = new chartRangeHelper_1.ChartRangeHelper();
            if (series.type == seriesType_1.SeriesType.timeSeries) {
                chartRangeHelper.resetXRangesYT(this.traceChartList);
            }
            else if (series.type == seriesType_1.SeriesType.fftSeries) {
                chartRangeHelper.resetXRangesFFT(this.traceChartList);
            }
            this.redrawCharts(true);
        };
        /**
         * Updates the color of the serie in all charts where the serie is displayed
         *
         * @private
         * @param {BaseSeries} serie
         * @memberof ChartViewChartManager
         */
        ChartViewChartManager.prototype.updateSerieColor = function (serie) {
            if (this._chartManagerDataModel != undefined) {
                var series = new Array();
                series.push(serie);
                var charts = this._chartManagerDataModel.getChartsUsingSerie(series);
                for (var i = 0; i < charts.length; i++) {
                    var chart = this.getChartObjectByName(charts[i].name);
                    if (chart != undefined) {
                        // Update series color in the chart
                        chart.setAvailableSeriesAsDataSource();
                    }
                }
            }
        };
        /**
         * add serie to chart
         *
         * @param {Array<BaseSeries>} series
         * @param {string} chartName
         * @param {Scale} scale
         * @param {boolean} updateRangeY
         * @memberof ChartViewChartManager
         */
        ChartViewChartManager.prototype.addSeries = function (series, chartName, scale, updateRangeY, updateRangeX) {
            var chart = this.getChartObjectByName(chartName);
            if (chart != undefined) {
                var axisMin = void 0;
                var axisMax = void 0;
                var axis = chart.chart.getAxis(scale.id);
                if (axis != undefined) {
                    var axisRange = axis.getAxisRange();
                    if (axisRange != undefined) {
                        axisMin = axisRange.min;
                        axisMax = axisRange.max;
                    }
                }
                else {
                    console.error("Scale not available! " + scale.id);
                }
                chart.addSeriesToChart(series, scale, updateRangeX);
                chart.setAvailableSeriesAsDataSource();
                if (axisMin != undefined && axisMax != undefined) {
                    chart.setScaleRange(scale, scale.minXValue, scale.maxXValue, axisMin, axisMax);
                }
                if (updateRangeY) {
                    var axisMinValue = chart.getSeriesMinYForScale(scale);
                    var axisMaxValue = chart.getSeriesMaxYForScale(scale);
                    if (axisMinValue != undefined && axisMaxValue != undefined) {
                        chart.updateRangeY(scale, axisMinValue, axisMaxValue);
                    }
                }
                chart.redrawChart();
            }
        };
        ChartViewChartManager.prototype.addYScale = function (yScale, chartName) {
            var chart = this.getChartObjectByName(chartName);
            if (chart != undefined) {
                chart.addYScale(yScale, chartInterface_1.AxisPosition.right);
                this.updateXAxisWidth(chart.type);
            }
        };
        /**
         * move one serie from one chart to another
         *
         * @param {BaseSeries} serie
         * @param {string} chartName
         * @param {string} targetChartName
         * @param {Scale} targetScale
         * @memberof ChartViewChartManager
         */
        ChartViewChartManager.prototype.moveSerie = function (serie, chartName, targetChartName, targetScale) {
            if (serie.rawPointsValid == true) {
                var chart = this.getChartObjectByName(chartName);
                var target = this.getChartObjectByName(targetChartName);
                var series = new Array();
                series.push(serie);
                if (chart != undefined && target != undefined) {
                    chart.removeSerieFromChart(serie, this.isLastSerieWithCursorType(chart));
                    target.addSeriesToChart(series, targetScale, true);
                    chart.setAvailableSeriesAsDataSource();
                    target.setAvailableSeriesAsDataSource();
                }
                this.updateXAxisWidth(chart.type);
            }
        };
        /**
         * remove one serie from given chart
         *
         * @param {BaseSeries} serie
         * @param {string} chartName
         * @memberof ChartViewChartManager
         */
        ChartViewChartManager.prototype.removeSerie = function (serie, chartName) {
            var chart = this.getChartObjectByName(chartName);
            if (chart != undefined) {
                chart.removeSerieFromChart(serie, this.isLastSerieWithCursorType(chart));
                chart.setAvailableSeriesAsDataSource();
            }
            var chartsWithSerie = this._chartManagerDataModel.getChartsUsingSerie([serie]);
            if (chartsWithSerie.length == 0) { // Serie not used in an other chart => detach serie events
                serie.eventDataChanged.detach(this._onSerieDataChanged);
            }
        };
        ChartViewChartManager.prototype.removeYAxis = function (yScale, chart) {
            var traceChart = this.getChartObjectByName(chart.name);
            if (traceChart != undefined) {
                traceChart.removeYScaleFromChart(yScale);
                traceChart.setAvailableSeriesAsDataSource();
            }
            this.updateXAxisWidth(chart.chartType);
        };
        /**
         * remove chart
         *
         * @param {string} chartName
         * @memberof ChartViewChartManager
         */
        ChartViewChartManager.prototype.removeChart = function (chart) {
            var traceChart = this.getChartObjectByName(chart.name);
            if (traceChart != undefined) {
                this.removeTraceChart(traceChart);
                var minX = void 0;
                var maxX = void 0;
                for (var i = 0; i < traceChart.series.length; i++) {
                    if (minX == undefined || minX > traceChart.series[i].minX) {
                        minX = traceChart.series[i].minX;
                    }
                    if (maxX == undefined || maxX < traceChart.series[i].maxX) {
                        maxX = traceChart.series[i].maxX;
                    }
                }
            }
            this.updateXAxisWidth(chart.chartType);
        };
        ChartViewChartManager.prototype.setPanningAxes = function (axes) {
            for (var i = 0; i < this.traceChartList.length; i++) {
                var panningAxis = new Array();
                if (axes[0] == undefined) {
                    for (var j = 0; j < this.traceChartList[i].scales.length; j++) {
                        var axis = this.traceChartList[i].chart.getAxis(this.traceChartList[i].scales[j].id);
                        if (axis != undefined) {
                            panningAxis.push(axis);
                        }
                    }
                    var axis = this.traceChartList[i].chart.getAxis(this.traceChartList[i].primaryXAxisName);
                    if (axis != undefined) {
                        panningAxis.push(axis);
                    }
                }
                else {
                    panningAxis = axes;
                }
                this.traceChartList[i].chart.setPanningAxes(panningAxis);
            }
        };
        ChartViewChartManager.prototype.synchronizeScaleXRange = function (scale) {
            var chartType = scale.parent.chartType;
            var min = scale.minXValue;
            var max = scale.maxXValue;
            for (var i = 0; i < this.traceChartList.length; i++) {
                if (this.traceChartList[i].type == chartType) {
                    this.traceChartList[i].onSynchronizeScaleRange(scale, min, max);
                    //this.traceChartList[i].redrawChart();
                }
            }
        };
        ChartViewChartManager.prototype.getZoomAxesInChart = function (chart, zoomDirection) {
            var axes = new Array();
            if (zoomDirection == chartViewWidget_1.ZoomDirection.XY || zoomDirection == chartViewWidget_1.ZoomDirection.X) {
                var axis = chart.chart.getAxis(chart.primaryXAxisName);
                if (axis != undefined) {
                    axes.push(axis);
                }
            }
            if (zoomDirection == chartViewWidget_1.ZoomDirection.XY || zoomDirection == chartViewWidget_1.ZoomDirection.Y) {
                for (var i = 0; i < chart.scales.length; i++) {
                    var axis = chart.chart.getAxis(chart.scales[i].id);
                    if (axis != undefined && axis.getAxisOrientation() == chartInterface_1.AxisOrientation.vertical) {
                        axes.push(axis);
                    }
                }
            }
            return axes;
        };
        /**
         * Returns true if there are no more series in all other charts with the same cursor type
         *
         * @private
         * @param {ITraceChart} chart
         * @returns {boolean}
         * @memberof ChartViewChartManager
         */
        ChartViewChartManager.prototype.isLastSerieWithCursorType = function (chart) {
            var cursorType = chart.getSerieCursorType();
            if (chart.series.length > 1) {
                return false;
            }
            for (var i = 0; i < this.traceChartList.length; i++) {
                if (this.traceChartList[i].getSerieCursorType() === cursorType && this.traceChartList[i] !== chart) {
                    return false;
                }
            }
            return true;
        };
        /**
         * Finds ITraceChartObject by give name and return object
         *
         * @private
         * @param {string} name
         * @returns {(ITraceChart | undefined)}
         * @memberof ChartViewChartManager
         */
        ChartViewChartManager.prototype.getChartObjectByName = function (name) {
            for (var i = 0; i < this.traceChartList.length; i++) {
                if (this.traceChartList[i].widgetName == name) {
                    return this.traceChartList[i];
                }
            }
            return undefined;
        };
        ChartViewChartManager.prototype.isSerieInChart = function (chart, serie) {
            for (var i = 0; i < chart.series.length; i++) {
                if (chart.series[i].id === serie.id) {
                    return true;
                }
            }
            return false;
        };
        /*private getPreviousChartObjectByName(name :string) : ITraceChart | undefined{
            for(let i = 0; i < this.traceChartList.length; i++){
                if(this.traceChartList[i].widgetName == name){
                   return this.traceChartList[i];
                }
            }
            return undefined;
        }*/
        ChartViewChartManager.prototype.removeSerieFromAllCharts = function (serie) {
            for (var i = 0; i < this.traceChartList.length; i++) {
                var index = this.traceChartList[i].series.map(function (x) { return x.id; }).indexOf(serie.id);
                //const index = this.traceChartList[i].series.indexOf(serie, 0);
                if (index > -1) {
                    this.traceChartList[i].removeSerieFromChart(this.traceChartList[i].series[index], this.isLastSerieWithCursorType(this.traceChartList[i]));
                }
            }
        };
        ChartViewChartManager.prototype.checkReferenceCursorsHovering = function (mousePoint, traceChart) {
            traceChart.checkCursorsHovering(mousePoint);
        };
        ChartViewChartManager.prototype.dragCursorAlongLine = function (traceChart, movementX, movementY) {
            traceChart.dragCursorAlongLine(movementX, movementY);
        };
        ChartViewChartManager.prototype.setCursorOnPointerPosition = function (traceChart, mousePoint) {
            traceChart.setCursorOnPointerPosition(mousePoint);
        };
        ChartViewChartManager.prototype.doPanning = function (traceChart, mousePointX, mousePointY) {
            traceChart.doPanning(mousePointX, mousePointY);
        };
        ChartViewChartManager.prototype.resetPanningCoords = function () {
            for (var _i = 0, _a = this.traceChartList; _i < _a.length; _i++) {
                var chart = _a[_i];
                chart.resetPanningCoords();
            }
        };
        ChartViewChartManager.prototype.resetZoom = function () {
            var chartRangeHelper = new chartRangeHelper_1.ChartRangeHelper();
            chartRangeHelper.resetXRangesAllChartTypes(this.traceChartList);
            chartRangeHelper.resetYRangesAllChartTypes(this.traceChartList);
            this.redrawCharts(true);
        };
        ChartViewChartManager.prototype.resetCursorsHovering = function (args) {
            if (this.traceChartList.length > 0) {
                var parentElement = args.data.e.target.parentElement;
                if (parentElement !== undefined && parentElement !== null) {
                    var mouseOverCursors = this.isMouseOverCursors(parentElement);
                    //Just reset cursors if mouse is moving outside a chart
                    if (this.getTraceChartByContainerId(parentElement.id) === undefined && !mouseOverCursors) {
                        this.traceChartList[0].resetCursorsHovered();
                    }
                }
            }
        };
        ChartViewChartManager.prototype.autoScale = function () {
            var chartRangeHelper = new chartRangeHelper_1.ChartRangeHelper();
            for (var _i = 0, _a = this.traceChartList; _i < _a.length; _i++) {
                var chart = _a[_i];
                chart.autoScaleYScales();
            }
            chartRangeHelper.resetXRangesAllChartTypes(this.traceChartList);
            this.redrawCharts(true);
        };
        ChartViewChartManager.prototype.setChartZoomAxes = function (axes) {
            for (var i = 0; i < this.traceChartList.length; i++) {
                this.traceChartList[i].setZoomAxes(axes);
            }
            this.chartViewWidget.activeSelectedZoomAxis = axes;
        };
        ChartViewChartManager.prototype.setPanning = function (enable) {
            for (var i = 0; i < this.traceChartList.length; i++) {
                this.traceChartList[i].setPanning(enable);
            }
        };
        ChartViewChartManager.prototype.setBoxZoom = function (enable) {
            for (var i = 0; i < this.traceChartList.length; i++) {
                this.traceChartList[i].setBoxZoom(enable);
            }
        };
        ChartViewChartManager.prototype.redrawCharts = function (forceRedraw, chartType) {
            for (var i = 0; i < this.traceChartList.length; i++) {
                //if (forceRedraw == true || this.traceChartList[i].type != ChartType.XYChart) {
                //    this.traceChartList[i].redrawChart();
                //}
                if (chartType == undefined || forceRedraw == true || this.traceChartList[i].type == chartType) {
                    this.traceChartList[i].redrawChart();
                }
            }
        };
        ChartViewChartManager.prototype.onRedrawAllCharts = function (sender, args) {
            this.redrawCharts(false, args.chartType);
        };
        ChartViewChartManager.prototype.isMouseOverCursors = function (element) {
            if (element.classList.value.includes(CrossHairCursor_1.CrossHairCursor.crossHairCursorId) || element.classList.value.includes(LineCursor_1.LineCursor.lineCursorId)) {
                return true;
            }
            return false;
        };
        ChartViewChartManager.prototype.onUserChartInteraction = function (sender, eventUserChartInteractionArgs) {
            this.chartViewWidget.onUserChartInteraction(sender, eventUserChartInteractionArgs);
        };
        ChartViewChartManager.prototype.addDroppableLocations = function (data, sameGroup) {
            for (var _i = 0, _a = this.traceChartList; _i < _a.length; _i++) {
                var chart = _a[_i];
                var chartManagerChart = this._chartManagerDataModel.getChart(chart.widgetName);
                var serieChartType = SerieChartTypeHelper_1.SerieChartTypeHelper.getSerieChartType(data[0].type);
                SerieChartTypeHelper_1.SerieChartTypeHelper.setDropPossibleAreas(chartManagerChart, data, serieChartType, sameGroup);
                chart.addSerieDropLocations(data, chartManagerChart);
            }
            var dropHelper = new chartDropHelper_1.ChartDropHelper(this._chartManagerDataModel, this.chartViewWidget);
            // Add empty space drop location
            if (dropHelper.canAddChart() == true) { // Is it possible to add one more chart
                var emptySpaceElement = document.getElementById(this.layoutManager.chartSplitter.parentContentId + "_lastPane");
                var scrollBarWidth = $('#' + this.layoutManager.chartSplitterParentContainerId)[0].offsetWidth - $('#' + this.layoutManager.chartSplitterContainerId)[0].offsetWidth;
                if (emptySpaceElement != undefined) {
                    emptySpaceElement.style.backgroundColor = 'rgba(125,160,165, 0.2)';
                    if (data[0].type == seriesType_1.SeriesType.timeSeries && data.length > 2 || !sameGroup) {
                        this.addChartTypeAreas(emptySpaceElement, [true, false, true], scrollBarWidth);
                    }
                    else if (data[0].type == seriesType_1.SeriesType.timeSeries) {
                        this.addChartTypeAreas(emptySpaceElement, [true, true, true], scrollBarWidth);
                    }
                    else if (data[0].type == seriesType_1.SeriesType.xySeries) {
                        this.addChartTypeAreas(emptySpaceElement, [false, true, false], scrollBarWidth);
                    }
                    else if (data[0].type == seriesType_1.SeriesType.fftSeries) {
                        this.addChartTypeAreas(emptySpaceElement, [false, false, true], scrollBarWidth);
                    }
                }
            }
        };
        ChartViewChartManager.prototype.addChartTypeAreas = function (parent, enabled, scrollBarWidth) {
            var chartNames = ['YT', 'XY', 'FFT'];
            for (var i = 0; i < chartNames.length; i = i + 1) {
                var area = document.createElement('div');
                area.id = parent.id + '_' + chartNames[i];
                area.classList.add('chartTypes');
                if (!enabled[i]) {
                    area.classList.add('disabled');
                }
                area.style.width = ((parent.offsetWidth - scrollBarWidth) / chartNames.length).toString() + 'px';
                var image = document.createElement("img");
                image.src = './widgets/common/style/images/chartType' + chartNames[i] + '.svg';
                image.classList.add('imageChart');
                area.appendChild(image);
                parent.appendChild(area);
            }
        };
        ChartViewChartManager.prototype.removeDroppableLocations = function () {
            for (var _i = 0, _a = this.traceChartList; _i < _a.length; _i++) {
                var chart = _a[_i];
                chart.removeSerieDropLocations();
            }
            // Remove empty space drop location
            var emptySpaceElement = document.getElementById(this.layoutManager.chartSplitter.parentContentId + "_lastPane");
            if (emptySpaceElement != undefined) {
                var typeOfCharts = emptySpaceElement.children.length;
                emptySpaceElement.style.backgroundColor = '#fff';
                for (var i = 0; i < typeOfCharts; i = i + 1) {
                    emptySpaceElement.children[0].remove();
                }
            }
        };
        ChartViewChartManager.prototype.updateXAxisWidth = function (chartType) {
            var maxYAxes = 0;
            var chartArea;
            for (var i = 0; i < this.traceChartList.length; i++) {
                if (this.traceChartList[i].type == chartType) {
                    this.traceChartList[i].chart.redraw();
                    var numberOfYAxesInChart = this.traceChartList[i].getNumberOfYScales();
                    if (numberOfYAxesInChart == 0) {
                        numberOfYAxesInChart = 1;
                    }
                    //if one chart has more axis than the others use its width, if they have the same amount use the one with the higher width
                    if (numberOfYAxesInChart > maxYAxes) {
                        maxYAxes = numberOfYAxesInChart;
                        chartArea = this.traceChartList[i].chart.getChartArea();
                    }
                    else if (numberOfYAxesInChart == maxYAxes && this.traceChartList[i].chart.getChartArea().width > chartArea.width) {
                        chartArea = this.traceChartList[i].chart.getChartArea();
                    }
                }
            }
            if (chartArea != undefined) {
                this.alignYAxes(chartArea, chartType);
            }
        };
        ChartViewChartManager.prototype.alignYAxes = function (chartArea, chartType) {
            for (var i = 0; i < this.traceChartList.length; i++) {
                if (this.traceChartList[i].type == chartType) {
                    var newChartArea = { x: chartArea.x, y: chartArea.y, width: chartArea.width, height: this.traceChartList[i].chart.getChartArea().height - 1 };
                    this.traceChartList[i].chart.setChartArea(newChartArea);
                    this.traceChartList[i].redrawChart();
                }
            }
        };
        return ChartViewChartManager;
    }());
    exports.ChartViewChartManager = ChartViewChartManager;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRWaWV3Q2hhcnRNYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0Vmlld1dpZGdldC9jaGFydFZpZXdDaGFydE1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBaUNBO1FBaUJJLCtCQUFZLGVBQWdDLEVBQUUseUJBQXFELEVBQUUsYUFBcUMsRUFBRSxxQkFBNkM7WUFBekwsaUJBTUM7WUFyQkQsbUJBQWMsR0FBdUIsRUFBRSxDQUFDO1lBQ3hDLFdBQU0sR0FBaUIsSUFBSSxLQUFLLEVBQWMsQ0FBQztZQVF2Qyx3QkFBbUIsR0FBRyxVQUFDLE1BQU0sRUFBRSxTQUFTLElBQUssT0FBQSxLQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxFQUExQyxDQUEwQyxDQUFDO1lBQ3hGLGlDQUE0QixHQUFHLFVBQUMsTUFBTSxFQUFFLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQXpDLENBQXlDLENBQUM7WUFDM0YsdUJBQWtCLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsRUFBbkMsQ0FBbUMsQ0FBQztZQUUxRSxvQkFBZSxHQUFrQyxFQUFFLENBQUM7WUFHeEQsSUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7WUFDdkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUMsTUFBTSxDQUFDO1lBQ3RDLElBQUksQ0FBQyx5QkFBeUIsR0FBRyx5QkFBeUIsQ0FBQztZQUMzRCxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztZQUNuQyxJQUFJLENBQUMsc0JBQXNCLEdBQUcscUJBQXFCLENBQUM7UUFDeEQsQ0FBQztRQUVNLDBEQUEwQixHQUFqQztZQUFBLGlCQVlDO1lB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LENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDLENBQUM7b0JBQzdJLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFDeEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztpQkFDeEM7YUFFSjtRQUNMLENBQUM7UUFDTCw0QkFBQztJQUFELENBQUMsQUF6N0JELElBeTdCQztJQXo3Qlksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVRyYWNlQ2hhcnQgfSBmcm9tIFwiLi4vY2hhcnRXaWRnZXQvaW50ZXJmYWNlcy90cmFjZUNoYXJ0SW50ZXJmYWNlXCJcclxuaW1wb3J0IHsgWVRDaGFydCB9IGZyb20gXCIuLi9jaGFydFdpZGdldC9ZVENoYXJ0XCJcclxuaW1wb3J0IHsgWFlDaGFydCB9IGZyb20gXCIuLi9jaGFydFdpZGdldC9YWUNoYXJ0XCJcclxuaW1wb3J0IHsgRkZUQ2hhcnQgfSBmcm9tIFwiLi4vY2hhcnRXaWRnZXQvRkZUQ2hhcnRcIjtcclxuaW1wb3J0IHsgRXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbkFyZ3MsIENoYXJ0QmFzZSwgRXZlbnRSZWRyYXdBbGxDaGFydHNBcmdzIH0gZnJvbSBcIi4uL2NoYXJ0V2lkZ2V0L0NoYXJ0QmFzZVwiXHJcbmltcG9ydCB7IENoYXJ0Vmlld0xheW91dE1hbmFnZXIgfSBmcm9tIFwiLi9jaGFydFZpZXdMYXlvdXRNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IElDaGFydE1hbmFnZXJEYXRhTW9kZWwgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9pbnRlcmZhY2VzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDaGFydFZpZXdXaWRnZXQsIFpvb21EaXJlY3Rpb24gfSBmcm9tIFwiLi9jaGFydFZpZXdXaWRnZXRcIjtcclxuaW1wb3J0IHsgVmlld1R5cGUgfSBmcm9tIFwiLi4vY29tbW9uL3ZpZXdUeXBlUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgQ2hhcnRSYW5nZUhlbHBlciB9IGZyb20gXCIuLi9jaGFydFdpZGdldC9oZWxwZXJzL2NoYXJ0UmFuZ2VIZWxwZXJcIjtcclxuaW1wb3J0IHsgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsQ2hhbmdlZEhpbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9jaGFydE1hbmFnZXJEYXRhTW9kZWxcIjtcclxuaW1wb3J0IHsgSVVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXIgfSBmcm9tIFwiLi4vY2hhcnRXaWRnZXQvdXNlckludGVyYWN0aW9uL2ludGVyZmFjZXMvY29udHJvbGxlckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDaGFydFR5cGUsIENoYXJ0TWFuYWdlckNoYXJ0IH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvY2hhcnRNYW5hZ2VyQ2hhcnRcIlxyXG5pbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvYmFzZVNlcmllc1wiXHJcbmltcG9ydCB7IFNlcmllQWN0aW9uLCBFdmVudFNlcmllRGF0YUNoYW5nZWRBcmdzIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvZXZlbnRTZXJpZURhdGFDaGFuZ2VkQXJnc1wiXHJcbmltcG9ydCB7IFNjYWxlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvc2NhbGVcIjtcclxuaW1wb3J0IHsgQ2hhcnREcm9wSGVscGVyIH0gZnJvbSBcIi4vaGVscGVycy9jaGFydERyb3BIZWxwZXJcIjtcclxuaW1wb3J0IHsgQ2hhcnRWaWV3VG9vbFN0YXRlLCBDaGFydFZpZXdab29tRGlyZWN0aW9uU3RhdGUsIENoYXJ0Vmlld1Rvb2xTdGF0ZUVudW0gfSBmcm9tIFwiLi4vY29tbW9uL3N0YXRlcy9jaGFydFZpZXdUb29sYmFyU3RhdGVzXCI7XHJcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9zdG9yZVwiO1xyXG5pbXBvcnQgeyBJQ2hhcnRNYW5hZ2VyQ2hhcnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9pbnRlcmZhY2VzL2NoYXJ0TWFuYWdlckNoYXJ0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEF4aXNQb3NpdGlvbiwgQXhpc09yaWVudGF0aW9uIH0gZnJvbSBcIi4uLy4uL2NvcmUvaW50ZXJmYWNlcy9jb21wb25lbnRzL3VpL2NoYXJ0L2NoYXJ0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFJlY3RhbmdsZSB9IGZyb20gXCIuLi8uLi9jb3JlL3R5cGVzL1JlY3RhbmdsZVwiO1xyXG5pbXBvcnQgeyBJQ2hhcnRBeGlzIH0gZnJvbSBcIi4uLy4uL2NvcmUvaW50ZXJmYWNlcy9jb21wb25lbnRzL3VpL2NoYXJ0L0NoYXJ0QXhpc0ludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTZXJpZUNoYXJ0VHlwZUhlbHBlciB9IGZyb20gXCIuLi9jb21tb24vU2VyaWVDaGFydFR5cGVIZWxwZXJcIjtcclxuaW1wb3J0IHsgU2VyaWVzVHlwZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL3Nlcmllc1R5cGVcIjtcclxuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSBcIi4uLy4uL2NvcmUvaW50ZXJmYWNlcy9wb2ludEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTcGxpdHRlclBhbmVEZWZpbml0aW9uIH0gZnJvbSBcIi4uL3NwbGl0dGVyV2lkZ2V0L3NwbGl0dGVyUGFuZURlZmluaXRpb25cIjtcclxuaW1wb3J0IHsgRXZlbnRNb2RlbENoYW5nZWRBcmdzIH0gZnJvbSBcIi4uLy4uL21vZGVscy9kYXRhTW9kZWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ3Jvc3NIYWlyQ3Vyc29yIH0gZnJvbSBcIi4uL2NoYXJ0V2lkZ2V0L2N1cnNvci9Dcm9zc0hhaXJDdXJzb3JcIjtcclxuaW1wb3J0IHsgTGluZUN1cnNvciB9IGZyb20gXCIuLi9jaGFydFdpZGdldC9jdXJzb3IvTGluZUN1cnNvclwiO1xyXG5pbXBvcnQgeyBDdXJzb3JUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi9zdGF0ZXMvY3Vyc29yU3RhdGVzXCI7XHJcbmltcG9ydCB7IFBhbmVQcm9wZXJ0aWVzIH0gZnJvbSBcIi4uL2NvbW1vbi9wYW5lUHJvcGVydGllc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENoYXJ0Vmlld0NoYXJ0TWFuYWdlciB7XHJcbiAgICBjaGFydFZpZXdXaWRnZXQ6IENoYXJ0Vmlld1dpZGdldDtcclxuICAgIHRyYWNlQ2hhcnRMaXN0OiBBcnJheTxJVHJhY2VDaGFydD4gPSBbXTtcclxuICAgIHNlcmllczogQmFzZVNlcmllc1tdID0gbmV3IEFycmF5PEJhc2VTZXJpZXM+KCk7XHJcblxyXG4gICAgbGF5b3V0TWFuYWdlcjogQ2hhcnRWaWV3TGF5b3V0TWFuYWdlcjtcclxuICAgIHVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXI6IElVc2VySW50ZXJhY3Rpb25Db250cm9sbGVyO1xyXG4gICAgX2NoYXJ0TWFuYWdlckRhdGFNb2RlbDogSUNoYXJ0TWFuYWdlckRhdGFNb2RlbDtcclxuXHJcbiAgICBwcml2YXRlIF9zdGF0ZXM6IFN0b3JlO1xyXG5cclxuICAgIHByaXZhdGUgX29uU2VyaWVEYXRhQ2hhbmdlZCA9IChzZW5kZXIsIGV2ZW50QXJncykgPT4gdGhpcy5vblNlcmllRGF0YUNoYW5nZWQoc2VuZGVyLCBldmVudEFyZ3MpO1xyXG4gICAgcHJpdmF0ZSBfdXNlckNoYXJ0SW50ZXJhY3Rpb25IYW5kbGVyID0gKHNlbmRlciwgYXJncykgPT4gdGhpcy5vblVzZXJDaGFydEludGVyYWN0aW9uKHNlbmRlciwgYXJncyk7XHJcbiAgICBwcml2YXRlIF9vblJlZHJhd0FsbENoYXJ0cyA9IChzZW5kZXIsYXJncykgPT4gdGhpcy5vblJlZHJhd0FsbENoYXJ0cyhzZW5kZXIsYXJncyk7XHJcblxyXG4gICAgcHJpdmF0ZSBfcGVyc2lzdGVkUGFuZXM6IEFycmF5PFNwbGl0dGVyUGFuZURlZmluaXRpb24+ID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoY2hhcnRWaWV3V2lkZ2V0OiBDaGFydFZpZXdXaWRnZXQsIHVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXI6IElVc2VySW50ZXJhY3Rpb25Db250cm9sbGVyLCBsYXlvdXRNYW5hZ2VyOiBDaGFydFZpZXdMYXlvdXRNYW5hZ2VyLCBjaGFydE1hbmFnZXJEYXRhTW9kZWw6IElDaGFydE1hbmFnZXJEYXRhTW9kZWwpIHtcclxuICAgICAgICB0aGlzLmNoYXJ0Vmlld1dpZGdldCA9IGNoYXJ0Vmlld1dpZGdldDtcclxuICAgICAgICB0aGlzLl9zdGF0ZXMgPSBjaGFydFZpZXdXaWRnZXQuc3RhdGVzO1xyXG4gICAgICAgIHRoaXMudXNlckludGVyYWN0aW9uQ29udHJvbGxlciA9IHVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXI7XHJcbiAgICAgICAgdGhpcy5sYXlvdXRNYW5hZ2VyID0gbGF5b3V0TWFuYWdlcjtcclxuICAgICAgICB0aGlzLl9jaGFydE1hbmFnZXJEYXRhTW9kZWwgPSBjaGFydE1hbmFnZXJEYXRhTW9kZWw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluaXRDaGFydFZpZXdXaXRoRGF0YU1vZGVsKCl7XHJcbiAgICAgICAgaWYodGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIElmIHRoZXJlIGFyZSBhbHJlYWR5IGNoYXJ0cyBpbiB0aGUgZGF0YW1vZGVsID0+IHNob3cgaW4gY2hhcnQgdmlldyA9PiBuZWVkZWQgZm9yIHBlcnNpc3RpbmdcclxuICAgICAgICAgICAgaWYodGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsLmRhdGEgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIC8vR2V0IHBlcnNpc3RlZCBjaGFydCBwYW5lc1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGVyc2lzdGVkUGFuZXMgPSB0aGlzLmxheW91dE1hbmFnZXIuY2hhcnRTcGxpdHRlci5nZXRDaGFydFZpZXdTcGxpdHRlclBhbmVEZWZpbml0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsLmRhdGEuZm9yRWFjaChjaGFydD0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBBZGQgY2hhcnRzLCBhZGQgc2NhbGVzLCBhZGQgc2VyaWVzXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRUcmFjZUNoYXJ0KGNoYXJ0LC0xLCAoY2hhcnQgYXMgQ2hhcnRNYW5hZ2VyQ2hhcnQpLmNoYXJ0VHlwZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkaXNwb3NlKCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50cmFjZUNoYXJ0TGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLmRpc3Bvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYWRkVHJhY2VDaGFydChjaGFydDogQ2hhcnRNYW5hZ2VyQ2hhcnQsIGluZGV4OiBudW1iZXIgPSAtMSwgdHlwZTogbnVtYmVyKTogSVRyYWNlQ2hhcnR8dW5kZWZpbmVkIHtcclxuICAgICAgICBcclxuICAgICAgICAvL3N0b3JlIHNlcmllcyBpbiB2YXJpYWJsZSBhbmQgcmVtb3ZlIHRoZW0gZnJvbSBjaGFydCBmb3IgaW5pdGlhbGlzYXRpb25cclxuICAgICAgICBsZXQgc2VyaWVzOiBCYXNlU2VyaWVzW10gPSBjaGFydC5jaGlsZHNbMF0uY2hpbGRzO1xyXG4gICAgICAgIGNoYXJ0LmNoaWxkc1swXS5jaGlsZHMgPSBbXTtcclxuICAgICAgIFxyXG4gICAgICAgIGxldCBuZXdUcmFjZUNoYXJ0OiBJVHJhY2VDaGFydHx1bmRlZmluZWQgPSB0aGlzLmFkZENoYXJ0VG9Db250YWluZXIoY2hhcnQubmFtZSwgaW5kZXgsIHR5cGUsIGNoYXJ0LmNoaWxkc1swXSk7XHJcblxyXG4gICAgICAgIC8vYWRkIHNlcmllcyB0byBzY2FsZSBhZ2FpblxyXG4gICAgICAgIGNoYXJ0LmNoaWxkc1swXS5jaGlsZHMgPSBzZXJpZXM7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5yZWRyYXdDaGFydHMoZmFsc2UpO1xyXG5cclxuICAgICAgICBsZXQgc2NhbGVzID0gY2hhcnQuY2hpbGRzO1xyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2NhbGVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYoaSA9PSAwKXtcclxuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSBzY2FsZShYKVxyXG4gICAgICAgICAgICAgICAgLypsZXQgY2hhcnRPYmogPSB0aGlzLmdldENoYXJ0T2JqZWN0QnlOYW1lKGNoYXJ0Lm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgaWYoY2hhcnRPYmogIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICBjaGFydE9iai51cGRhdGVDaGFydFJhbmdlWChzY2FsZXNbaV0ubWluWFZhbHVlLCBzY2FsZXNbaV0ubWF4WFZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH0qL1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFlTY2FsZShzY2FsZXNbaV0sY2hhcnQubmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzY2FsZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZihzY2FsZXNbaV0uY2hpbGRzLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRTZXJpZXNUb0NoYXJ0KHNjYWxlc1tpXS5jaGlsZHMsIGNoYXJ0LCBjaGFydC5jaGlsZHNbaV0sIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChuZXdUcmFjZUNoYXJ0ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgbmV3VHJhY2VDaGFydC5zZXRTY2FsZVJhbmdlKHNjYWxlc1tpXSwgc2NhbGVzW2ldLm1pblhWYWx1ZSwgc2NhbGVzW2ldLm1heFhWYWx1ZSwgc2NhbGVzW2ldLm1pbllWYWx1ZSwgc2NhbGVzW2ldLm1heFlWYWx1ZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnVwZGF0ZVpvb21TZXR0aW5ncygpO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZVhBeGlzV2lkdGgoY2hhcnQuY2hhcnRUeXBlKTtcclxuICAgICAgICByZXR1cm4gbmV3VHJhY2VDaGFydDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBhZGRDaGFydFRvQ29udGFpbmVyKG5hbWU6IHN0cmluZywgaW5kZXg6IG51bWJlciA9IC0xLCB0eXBlOiBDaGFydFR5cGUsIHNjYWxlOiBTY2FsZSk6IElUcmFjZUNoYXJ0fHVuZGVmaW5lZCB7XHJcbiAgICAgICAgbGV0IHRyYWNlQ2hhcnQ6IElUcmFjZUNoYXJ0O1xyXG4gICAgICAgIGxldCBjaGFydEhlaWdodCA9IDMwMDtcclxuICAgICAgICBsZXQgbWluU2l6ZSA9IDEwMDtcclxuICAgICAgICBpZiAodGhpcy5jaGFydFZpZXdXaWRnZXQudmlldykge1xyXG4gICAgICAgICAgICAvLyBUT0RPOiBIYW5kbGUgd2l0aCBzZXR0aW5ncyBvYmplY3QgZmFjdG9yeVxyXG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gQ2hhcnRUeXBlLllUQ2hhcnQpIHtcclxuICAgICAgICAgICAgICAgIHRyYWNlQ2hhcnQgPSBuZXcgWVRDaGFydCh0aGlzLmNoYXJ0Vmlld1dpZGdldC52aWV3LCBuYW1lLCB0eXBlLCBzY2FsZSlcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSBDaGFydFR5cGUuWFlDaGFydCkge1xyXG4gICAgICAgICAgICAgICAgdHJhY2VDaGFydCA9IG5ldyBYWUNoYXJ0KHRoaXMuY2hhcnRWaWV3V2lkZ2V0LnZpZXcsIG5hbWUsIHR5cGUsIHNjYWxlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRyYWNlQ2hhcnQgPSBuZXcgRkZUQ2hhcnQodGhpcy5jaGFydFZpZXdXaWRnZXQudmlldywgbmFtZSwgdHlwZSwgc2NhbGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0cmFjZUNoYXJ0LmV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb24uYXR0YWNoKHRoaXMuX3VzZXJDaGFydEludGVyYWN0aW9uSGFuZGxlcik7XHJcbiAgICAgICAgICAgIHRyYWNlQ2hhcnQuZXZlbnRSZWRyYXdBbGxDaGFydHMuYXR0YWNoKHRoaXMuX29uUmVkcmF3QWxsQ2hhcnRzKTtcclxuXHJcbiAgICAgICAgICAgIC8vU2V0IHRoZSBoZWlnaHQgb2YgcGVyc2lzdGVkIGNoYXJ0c1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fcGVyc2lzdGVkUGFuZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgY2hhcnRIZWlnaHQgPSB0aGlzLmdldFBlcnNpc3RlZENoYXJ0SGVpZ2h0KG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgLy9Xb3JrYXJvdW5kOiBBZGQgMiBwaXhlbHMgaWYgaXMgdGhlIGZpcnN0IGNoYXJ0IFxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGF5b3V0TWFuYWdlci5jaGFydFNwbGl0dGVyLmxheW91dFBhbmVzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hhcnRIZWlnaHQgKz0gMjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IHBhbmVQcm9wZXJ0aWVzID0gbmV3IFBhbmVQcm9wZXJ0aWVzKCk7XHJcbiAgICAgICAgICAgIHBhbmVQcm9wZXJ0aWVzLnBhbmVTaXplID0gY2hhcnRIZWlnaHQ7XHJcbiAgICAgICAgICAgIHBhbmVQcm9wZXJ0aWVzLm1pblNpemUgPSBtaW5TaXplO1xyXG4gICAgICAgICAgICB0aGlzLmxheW91dE1hbmFnZXIuY2hhcnRTcGxpdHRlci5hZGRXaWRnZXQodHJhY2VDaGFydCwgbmFtZSwgVmlld1R5cGUuVXNlciwgcGFuZVByb3BlcnRpZXMpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGluZGV4ICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBzZXQgaW5kZXggYXQgYWRkV2lkZ2V0IE1ldGhvZCB0byBhdm9pZCBtb3ZpbmcgdGhlIGNoYXJ0IGFmdGVyd2FyZHNcclxuICAgICAgICAgICAgICAgIHRoaXMubGF5b3V0TWFuYWdlci5jaGFydFNwbGl0dGVyLm1vdmVXaWRnZXQodHJhY2VDaGFydCwgaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50cmFjZUNoYXJ0TGlzdC5zcGxpY2UoaW5kZXgsIDAsIHRyYWNlQ2hhcnQpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyYWNlQ2hhcnRMaXN0LnB1c2godHJhY2VDaGFydCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRyYWNlQ2hhcnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkOyBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBoZWlnaHQgb2YgcGVyc2lzdGVkIGNoYXJ0c1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjaGFydE5hbWVcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3Q2hhcnRNYW5hZ2VyXHJcbiAgICAgKi9cclxuICAgIGdldFBlcnNpc3RlZENoYXJ0SGVpZ2h0KGNoYXJ0TmFtZTogc3RyaW5nKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgY2hhcnRIZWlnaHQgPSB0aGlzLmxheW91dE1hbmFnZXIuZ2V0Q2hhcnRWaWV3U3BsaXR0ZXJIZWlnaHQodGhpcy5fcGVyc2lzdGVkUGFuZXMsIGNoYXJ0TmFtZSk7XHJcbiAgICAgICAgdGhpcy5fcGVyc2lzdGVkUGFuZXMgPSB0aGlzLl9wZXJzaXN0ZWRQYW5lcy5maWx0ZXIoZWxlbWVudCA9PiB7IHJldHVybiBlbGVtZW50LmNvbXBvbmVudERlZmluaXRpb24uaWQgIT0gY2hhcnROYW1lfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBjaGFydEhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1ldGhvZCB0byBzZXQgdGhlIFpvb21TZXR0aW5nKERpcmVjdGlvbiBhbmQgQm94Wm9vbSkgZm9yIGFsbCBDaGFydHMgYWNjb3JkaW5nIHRvIHRoZSBjb3JyZXNwb25kaW5nIHN0YXRlc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3Q2hhcnRNYW5hZ2VyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlWm9vbVNldHRpbmdzKCkge1xyXG4gICAgICAgIGxldCB0b29sc3RhdGU6IENoYXJ0Vmlld1Rvb2xTdGF0ZSA9IHRoaXMuX3N0YXRlcy5yZWFkKENoYXJ0Vmlld1Rvb2xTdGF0ZSwgXCJDaGFydFZpZXdUb29sU3RhdGVcIik7XHJcbiAgICAgICAgbGV0IHpvb21EaXJlY3Rpb25TdGF0ZTogQ2hhcnRWaWV3Wm9vbURpcmVjdGlvblN0YXRlID0gdGhpcy5fc3RhdGVzLnJlYWQoQ2hhcnRWaWV3Wm9vbURpcmVjdGlvblN0YXRlLCBcIkNoYXJ0Vmlld1pvb21EaXJlY3Rpb25TdGF0ZVwiKTtcclxuXHJcbiAgICAgICAgaWYgKHRvb2xzdGF0ZS5zZWxlY3RlZFRvb2wgPT0gQ2hhcnRWaWV3VG9vbFN0YXRlRW51bS5CT1haT09NKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Qm94Wm9vbSh0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRQYW5uaW5nKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodG9vbHN0YXRlLnNlbGVjdGVkVG9vbCA9PSBDaGFydFZpZXdUb29sU3RhdGVFbnVtLlBBTk5JTkcpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRCb3hab29tKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRQYW5uaW5nKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Qm94Wm9vbShmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0UGFubmluZyhmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNldENoYXJ0Wm9vbUF4ZXMoem9vbURpcmVjdGlvblN0YXRlLnpvb21EaXJlY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZVRyYWNlQ2hhcnQoY2hhcnQ6IElUcmFjZUNoYXJ0KSB7XHJcbiAgICAgICAgY2hhcnQuZXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbi5kZXRhY2godGhpcy5fdXNlckNoYXJ0SW50ZXJhY3Rpb25IYW5kbGVyKTtcclxuICAgICAgICBjaGFydC5ldmVudFJlZHJhd0FsbENoYXJ0cy5kZXRhY2godGhpcy5fb25SZWRyYXdBbGxDaGFydHMpO1xyXG4gICAgICAgIHRoaXMucmVtb3ZlQ2hhcnRGcm9tQ2hhcnRMaXN0KGNoYXJ0KTtcclxuICAgICAgICBjaGFydC5kaXNwb3NlKCk7XHJcbiAgICAgICAgdGhpcy5sYXlvdXRNYW5hZ2VyLmNoYXJ0U3BsaXR0ZXIucmVtb3ZlV2lkZ2V0KGNoYXJ0KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlbW92ZUNoYXJ0RnJvbUNoYXJ0TGlzdChjaGFydDogSVRyYWNlQ2hhcnQpIHtcclxuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmdldENoYXJ0SW5kZXgoY2hhcnQpO1xyXG5cclxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLnRyYWNlQ2hhcnRMaXN0LnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1vdmVUcmFjZUNoYXJ0KGNoYXJ0OiBDaGFydE1hbmFnZXJDaGFydCwgdGFyZ2V0Q2hhcnQ6IENoYXJ0TWFuYWdlckNoYXJ0LCBhcmdzKSB7XHJcblxyXG4gICAgICAgIGxldCB0cmFjZUNoYXJ0ID0gdGhpcy5nZXRDaGFydE9iamVjdEJ5TmFtZShjaGFydC5uYW1lKTtcclxuICAgICAgICBsZXQgdGFyZ2V0VHJhY2VDaGFydCA9IHRoaXMuZ2V0Q2hhcnRPYmplY3RCeU5hbWUodGFyZ2V0Q2hhcnQubmFtZSk7XHJcblxyXG4gICAgICAgIGlmICh0cmFjZUNoYXJ0ICE9IHVuZGVmaW5lZCAmJiB0YXJnZXRUcmFjZUNoYXJ0ICE9IHVuZGVmaW5lZCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IGNoYXJ0SW5kZXggPSB0aGlzLmdldENoYXJ0SW5kZXgodHJhY2VDaGFydCk7XHJcbiAgICAgICAgICAgIGxldCB0YXJnZXRJbmRleCA9IHRoaXMuZ2V0Q2hhcnRJbmRleCh0YXJnZXRUcmFjZUNoYXJ0KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChhcmdzLmluc2VydFR5cGUgPT0gXCJpbnNlcnRCZWxvd1wiKSB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRJbmRleCArPSAxO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY2hhcnRJbmRleCA+IC0xICYmIHRhcmdldEluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudHJhY2VDaGFydExpc3Quc3BsaWNlKGNoYXJ0SW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoYXJ0SW5kZXggPCB0YXJnZXRJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJhY2VDaGFydExpc3Quc3BsaWNlKHRhcmdldEluZGV4IC0gMSwgMCwgdHJhY2VDaGFydCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYWNlQ2hhcnRMaXN0LnNwbGljZSh0YXJnZXRJbmRleCwgMCwgdHJhY2VDaGFydCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxheW91dE1hbmFnZXIuY2hhcnRTcGxpdHRlci5tb3ZlV2lkZ2V0KHRyYWNlQ2hhcnQsIHRhcmdldEluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9hZGQgYWxsIGFkZGl0aW9uYWwgYXhlcyB0byBjaGFydFxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHRyYWNlQ2hhcnQuc2NhbGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0cmFjZUNoYXJ0LmFkZFlTY2FsZSh0cmFjZUNoYXJ0LnNjYWxlc1tpXSwgQXhpc1Bvc2l0aW9uLnJpZ2h0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLnJlZHJhd0NoYXJ0cyhmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlWEF4aXNXaWR0aChjaGFydC5jaGFydFR5cGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlbW92ZUFsbENoYXJ0cygpIHtcclxuICAgICAgICB3aGlsZSAodGhpcy50cmFjZUNoYXJ0TGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlVHJhY2VDaGFydCh0aGlzLnRyYWNlQ2hhcnRMaXN0WzBdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRDaGFydEluZGV4KGNoYXJ0OiBJVHJhY2VDaGFydCk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gLTFcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudHJhY2VDaGFydExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudHJhY2VDaGFydExpc3RbaV0gPT0gY2hhcnQpIHtcclxuICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VHJhY2VDaGFydEJ5Q29udGFpbmVySWQoY29udGFpbmVySUQ6IHN0cmluZyk6IElUcmFjZUNoYXJ0IHwgdW5kZWZpbmVkIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudHJhY2VDaGFydExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudHJhY2VDaGFydExpc3RbaV0ucGFyZW50Q29udGVudElkID09IGNvbnRhaW5lcklELnN1YnN0cigwLCB0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLnBhcmVudENvbnRlbnRJZC5sZW5ndGgpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50cmFjZUNoYXJ0TGlzdFtpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRUcmFjZUNoYXJ0QnlOYW1lKGNoYXJ0TmFtZTogc3RyaW5nKTogSVRyYWNlQ2hhcnQgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50cmFjZUNoYXJ0TGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50cmFjZUNoYXJ0TGlzdFtpXS53aWRnZXROYW1lID09IGNoYXJ0TmFtZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudHJhY2VDaGFydExpc3RbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgb25DaGFydE1hbmFnZXJNb2RlbENoYW5nZWQoZGF0YU1vZGVsOiBJQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsLCBhcmdzOiBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MpIHtcclxuICAgICAgICB0aGlzLl9jaGFydE1hbmFnZXJEYXRhTW9kZWwgPSBkYXRhTW9kZWw7ICAgICAgXHJcbiAgICAgICAgc3dpdGNoIChhcmdzLmhpbnQpIHtcclxuICAgICAgICAgICAgY2FzZSBDaGFydE1hbmFnZXJEYXRhTW9kZWxDaGFuZ2VkSGludC5hZGRTZXJpZToge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRTZXJpZXNUb0NoYXJ0KGFyZ3MuZGF0YS5zZXJpZXMsIGFyZ3MuZGF0YS5jaGFydCwgYXJncy5kYXRhLmF4aXMsIGFyZ3MuZGF0YS5rZWVwU2NhbGVzKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsQ2hhbmdlZEhpbnQubW92ZVNlcmllOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVTZXJpZShhcmdzLmRhdGEuc2VyaWUsIGFyZ3MuZGF0YS5jaGFydC5uYW1lLCBhcmdzLmRhdGEudGFyZ2V0Q2hhcnQubmFtZSwgYXJncy5kYXRhLnRhcmdldEF4aXMpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBDaGFydE1hbmFnZXJEYXRhTW9kZWxDaGFuZ2VkSGludC5yZW1vdmVTZXJpZToge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVTZXJpZShhcmdzLmRhdGEuc2VyaWUsIGFyZ3MuZGF0YS5jaGFydC5uYW1lKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsQ2hhbmdlZEhpbnQucmVtb3ZlQ2hhcnQ6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQ2hhcnQoYXJncy5kYXRhLmNoYXJ0KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsQ2hhbmdlZEhpbnQuYWRkQ2hhcnQ6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkVHJhY2VDaGFydChhcmdzLmRhdGEuY2hhcnQsIGFyZ3MuZGF0YS5pbmRleCwgYXJncy5kYXRhLnR5cGUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBDaGFydE1hbmFnZXJEYXRhTW9kZWxDaGFuZ2VkSGludC5tb3ZlQ2hhcnQ6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubW92ZVRyYWNlQ2hhcnQoYXJncy5kYXRhLmNoYXJ0LCBhcmdzLmRhdGEudGFyZ2V0LCBhcmdzLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBDaGFydE1hbmFnZXJEYXRhTW9kZWxDaGFuZ2VkSGludC5hZGRZU2NhbGU6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkWVNjYWxlKGFyZ3MuZGF0YS55QXhpcywgYXJncy5kYXRhLmNoYXJ0Lm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBDaGFydE1hbmFnZXJEYXRhTW9kZWxDaGFuZ2VkSGludC5yZW1vdmVZU2NhbGU6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlWUF4aXMoYXJncy5kYXRhLnlBeGlzLCBhcmdzLmRhdGEuY2hhcnQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBDaGFydE1hbmFnZXJEYXRhTW9kZWxDaGFuZ2VkSGludC51cGRhdGVTY2FsZVJhbmdlOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN5bmNocm9uaXplU2NhbGVYUmFuZ2UoYXJncy5kYXRhLnNjYWxlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBhZGRTZXJpZXNUb0NoYXJ0KHNlcmllczogQXJyYXk8QmFzZVNlcmllcz4sIGNoYXJ0OiBJQ2hhcnRNYW5hZ2VyQ2hhcnQsIHNjYWxlOiBTY2FsZSwga2VlcFNjYWxlczogYm9vbGVhbiA9IGZhbHNlKSB7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2VyaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHNlcmllc1tpXS5ldmVudERhdGFDaGFuZ2VkLmF0dGFjaCh0aGlzLl9vblNlcmllRGF0YUNoYW5nZWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY2hhcnROYW1lID0gY2hhcnQubmFtZTtcclxuICAgICAgICAvL2xldCB5dENoYXJ0czogQXJyYXk8SVRyYWNlQ2hhcnQ+ID0gdGhpcy5nZXRZVENoYXJ0cygpO1xyXG4gICAgICAgIC8vbGV0IGZmdENoYXJ0czogQXJyYXk8SVRyYWNlQ2hhcnQ+ID0gdGhpcy5nZXRGRlRDaGFydHMoKTtcclxuXHJcbiAgICAgICAgbGV0IHJlc2V0WFJhbmdlID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHJlc2V0WVJhbmdlID0gZmFsc2U7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoIWtlZXBTY2FsZXMpe1xyXG4gICAgICAgICAgICByZXNldFhSYW5nZT0gdGhpcy5pc0ZpcnN0U2VyaWVzT2ZUeXBlSW5DaGFydHMoc2VyaWVzWzBdKVxyXG4gICAgICAgICAgICByZXNldFlSYW5nZSA9IHRoaXMuaXNGaXJzdFNlcmllc09uU2NhbGUoc2VyaWVzWzBdLCBzY2FsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGxldCBjaGFydE9iaiA9IHRoaXMuZ2V0Q2hhcnRPYmplY3RCeU5hbWUoY2hhcnROYW1lKTtcclxuICAgICAgICAgICAgaWYoY2hhcnRPYmogIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIC8vIFRPRE86IE9ubHkgd29ya3MgZm9yIFlUIGJ1dCBub3QgZm9yIEZGVFxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSBzY2FsZShZKVxyXG4gICAgICAgICAgICAgICAgY2hhcnRPYmouc2V0U2NhbGVSYW5nZShzY2FsZSwgc2NhbGUubWluWFZhbHVlLCBzY2FsZS5tYXhYVmFsdWUsIHNjYWxlLm1pbllWYWx1ZSwgc2NhbGUubWF4WVZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgc2NhbGUoWClcclxuICAgICAgICAgICAgICAgIGNoYXJ0T2JqLnNldFJhbmdlWChzY2FsZS5taW5YVmFsdWUsIHNjYWxlLm1heFhWYWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuYWRkU2VyaWVzKHNlcmllcywgY2hhcnROYW1lLCBzY2FsZSwgcmVzZXRZUmFuZ2UsIHJlc2V0WFJhbmdlKTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAocmVzZXRYUmFuZ2UpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXNldFhSYW5nZShzZXJpZXNbMF0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqQ2hlY2tzIGlmIGEgZ2l2ZW4gU2VyaWVzIGlzIHRoZSBmaXJzdCBTZXJpZXMgb24gYSBwYXJ0aWN1bGFyIHNjYWxlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8QmFzZVNlcmllcz59IHNlcmllc1xyXG4gICAgICogQHBhcmFtIHtTY2FsZX0gc2NhbGVcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld0NoYXJ0TWFuYWdlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGlzRmlyc3RTZXJpZXNPblNjYWxlKHNlcmllczogQmFzZVNlcmllcywgc2NhbGU6IFNjYWxlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgLy9vbmx5IHJlc2V0IHRoZSBjaGFydHJhbmdlIG9uIHRoZSB5IGF4aXMgaWYgdGhlc2UgYXJlIHRoZSBmaXJzdCBzZXJpZXMgaW4gdGhlIHNjYWxlXHJcbiAgICAgICAgaWYgKHNjYWxlLmNoaWxkcy5sZW5ndGggPCAxIHx8IHNlcmllcyAhPSBzY2FsZS5jaGlsZHNbMF0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqQ2hlY2tzIGlmIGEgZ2l2ZW4gU2VyaWVzIGlzIHRoZSBmaXJzdCBvZiBpdHMgdHlwZSBpbiBhbGwgY2hhcnRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVzXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld0NoYXJ0TWFuYWdlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGlzRmlyc3RTZXJpZXNPZlR5cGVJbkNoYXJ0cyhzZXJpZXM6IEJhc2VTZXJpZXMpIHtcclxuICAgICAgICBsZXQgY2hhcnRzID0gdGhpcy5nZXRDaGFydHNGb3JTZXJpZShzZXJpZXMpO1xyXG5cclxuICAgICAgICBmb3IoIGxldCBjaGFydCBvZiBjaGFydHMpe1xyXG4gICAgICAgICAgICBpZihjaGFydC5zZXJpZXMubGVuZ3RoICE9IDApe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0Q2hhcnRzRm9yU2VyaWUoc2VyaWVzOiBCYXNlU2VyaWVzKTogSVRyYWNlQ2hhcnRbXSB7XHJcbiAgICAgICAgbGV0IGNoYXJ0cyA9IEFycmF5PElUcmFjZUNoYXJ0PigpO1xyXG4gICAgICAgIGlmIChzZXJpZXMudHlwZSA9PSBTZXJpZXNUeXBlLmZmdFNlcmllcykge1xyXG5cclxuICAgICAgICAgICAgY2hhcnRzID0gbmV3IENoYXJ0UmFuZ2VIZWxwZXIoKS5nZXRGRlRDaGFydHModGhpcy50cmFjZUNoYXJ0TGlzdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHNlcmllcy50eXBlID09IFNlcmllc1R5cGUudGltZVNlcmllcykge1xyXG4gICAgICAgICAgICBjaGFydHMgPSBuZXcgQ2hhcnRSYW5nZUhlbHBlcigpLmdldFlUQ2hhcnRzKHRoaXMudHJhY2VDaGFydExpc3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2hhcnRzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25TZXJpZURhdGFDaGFuZ2VkKHNlbmRlciwgZXZlbnRBcmdzOiBFdmVudFNlcmllRGF0YUNoYW5nZWRBcmdzKSB7XHJcbiAgICAgICAgaWYgKGV2ZW50QXJncy5hY3Rpb24gPT0gU2VyaWVBY3Rpb24uZGF0YVBvaW50c0NoYW5nZWQpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVTZXJpZURhdGEoc2VuZGVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZXZlbnRBcmdzLmFjdGlvbiA9PSBTZXJpZUFjdGlvbi5jb2xvckNoYW5nZWQpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVTZXJpZUNvbG9yKHNlbmRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogIFVwZGF0ZXMgdGhlIHNlcmllIGRhdGFwb2ludHMgaW4gYWxsIGNoYXJ0cyB3aGVyZSB0aGUgc2VyaWUgaXMgZGlzcGxheWVkXHJcbiAgICAgKiAgSWYgZGF0YXBvaW50cyBub3QgdmFsaWQsIHRoZSBzZXJpZSB3aWxsIGJlIHJlbW92ZWQgZnJvbSB0aGUgY2hhcnRzIG90aGVyd2lzZSBhZGRlZCBpZiBub3QgYWxyZWFkeSBpbiB0aGUgY2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtCYXNlU2VyaWVzfSBzZXJpZXNcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdDaGFydE1hbmFnZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVTZXJpZURhdGEoc2VyaWVzOiBCYXNlU2VyaWVzKSB7XHJcbiAgICAgICAgaWYgKHNlcmllcy5yYXdQb2ludHNWYWxpZCA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAvLyBObyB2YWxpZCBzZXJpZSBkYXRhID0+IHJlbW92ZSBmcm9tIGFsbCBjaGFydHNcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVTZXJpZUZyb21BbGxDaGFydHMoc2VyaWVzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIGFkZCBzZXJpZSB0byBjaGFydCBpZiBub3QgYWxyZWFkeSBpbiBpdCBvdGhlcndpc2UgdXBkYXRlIGNoYXJ0XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9jaGFydE1hbmFnZXJEYXRhTW9kZWwgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2hhcnRzID0gdGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsLmdldENoYXJ0c1VzaW5nU2VyaWUoW3Nlcmllc10pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTZXJpZUluQWxsQ2hhcnRzKGNoYXJ0cywgc2VyaWVzKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlU2VyaWVJbkFsbENoYXJ0cyhjaGFydHM6IElDaGFydE1hbmFnZXJDaGFydFtdLCBzZXJpZXM6IEJhc2VTZXJpZXMpIHtcclxuICAgICAgICBsZXQgc2VyaWVDaGFydFR5cGUgPSBTZXJpZUNoYXJ0VHlwZUhlbHBlci5nZXRTZXJpZUNoYXJ0VHlwZShzZXJpZXMudHlwZSk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hhcnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjaGFydCA9IHRoaXMuZ2V0Q2hhcnRPYmplY3RCeU5hbWUoY2hhcnRzW2ldLm5hbWUpO1xyXG4gICAgICAgICAgICBpZiAoY2hhcnQgIT0gdW5kZWZpbmVkICYmIHNlcmllQ2hhcnRUeXBlID09IGNoYXJ0LnR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1NlcmllSW5DaGFydChjaGFydCwgc2VyaWVzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFkZCBzZXJpZXMgXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNjYWxlID0gY2hhcnRzW2ldLmdldFlBeGlzRm9yU2VyaWUoc2VyaWVzKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2NhbGUgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpc0ZpcnN0U2VyaWVzSW5DaGFydCA9IHRoaXMuaXNGaXJzdFNlcmllc09mVHlwZUluQ2hhcnRzKHNlcmllcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkU2VyaWVzKFtzZXJpZXNdLCBjaGFydHNbaV0ubmFtZSwgc2NhbGUsIHRoaXMuaXNGaXJzdFNlcmllc09uU2NhbGUoc2VyaWVzLCBzY2FsZSksIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzRmlyc3RTZXJpZXNJbkNoYXJ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2V0WFJhbmdlKHNlcmllcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJTY2FsZSBub3QgZm91bmQgZm9yIHNlcmllXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNoYXJ0LnNldEF2YWlsYWJsZVNlcmllc0FzRGF0YVNvdXJjZSgpO1xyXG4gICAgICAgICAgICAgICAgY2hhcnQucmVkcmF3Q2hhcnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlc2V0WFJhbmdlKHNlcmllczogQmFzZVNlcmllcyl7XHJcbiAgICAgICAgbGV0IGNoYXJ0UmFuZ2VIZWxwZXIgOiBDaGFydFJhbmdlSGVscGVyID0gbmV3IENoYXJ0UmFuZ2VIZWxwZXIoKTtcclxuICAgICAgICBpZiAoc2VyaWVzLnR5cGUgPT0gU2VyaWVzVHlwZS50aW1lU2VyaWVzKSB7XHJcbiAgICAgICAgICAgIGNoYXJ0UmFuZ2VIZWxwZXIucmVzZXRYUmFuZ2VzWVQodGhpcy50cmFjZUNoYXJ0TGlzdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHNlcmllcy50eXBlID09IFNlcmllc1R5cGUuZmZ0U2VyaWVzKSB7XHJcbiAgICAgICAgICAgIGNoYXJ0UmFuZ2VIZWxwZXIucmVzZXRYUmFuZ2VzRkZUKHRoaXMudHJhY2VDaGFydExpc3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlZHJhd0NoYXJ0cyh0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGNvbG9yIG9mIHRoZSBzZXJpZSBpbiBhbGwgY2hhcnRzIHdoZXJlIHRoZSBzZXJpZSBpcyBkaXNwbGF5ZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtCYXNlU2VyaWVzfSBzZXJpZVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld0NoYXJ0TWFuYWdlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZVNlcmllQ29sb3Ioc2VyaWU6IEJhc2VTZXJpZXMpIHtcclxuICAgICAgICBpZiAodGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBsZXQgc2VyaWVzID0gbmV3IEFycmF5PEJhc2VTZXJpZXM+KCk7XHJcbiAgICAgICAgICAgIHNlcmllcy5wdXNoKHNlcmllKTtcclxuICAgICAgICAgICAgbGV0IGNoYXJ0cyA9IHRoaXMuX2NoYXJ0TWFuYWdlckRhdGFNb2RlbC5nZXRDaGFydHNVc2luZ1NlcmllKHNlcmllcyk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hhcnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2hhcnQgPSB0aGlzLmdldENoYXJ0T2JqZWN0QnlOYW1lKGNoYXJ0c1tpXS5uYW1lKTtcclxuICAgICAgICAgICAgICAgIGlmIChjaGFydCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBVcGRhdGUgc2VyaWVzIGNvbG9yIGluIHRoZSBjaGFydFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYXJ0LnNldEF2YWlsYWJsZVNlcmllc0FzRGF0YVNvdXJjZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYWRkIHNlcmllIHRvIGNoYXJ0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxCYXNlU2VyaWVzPn0gc2VyaWVzXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY2hhcnROYW1lXHJcbiAgICAgKiBAcGFyYW0ge1NjYWxlfSBzY2FsZVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSB1cGRhdGVSYW5nZVlcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdDaGFydE1hbmFnZXJcclxuICAgICAqL1xyXG4gICAgYWRkU2VyaWVzKHNlcmllczogQXJyYXk8QmFzZVNlcmllcz4sIGNoYXJ0TmFtZTogc3RyaW5nLCBzY2FsZTogU2NhbGUsIHVwZGF0ZVJhbmdlWTogYm9vbGVhbiwgdXBkYXRlUmFuZ2VYOiBib29sZWFuKSB7XHJcbiAgICAgICAgbGV0IGNoYXJ0ID0gdGhpcy5nZXRDaGFydE9iamVjdEJ5TmFtZShjaGFydE5hbWUpO1xyXG4gICAgICAgIGlmIChjaGFydCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgbGV0IGF4aXNNaW46IG51bWJlciB8IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgbGV0IGF4aXNNYXg6IG51bWJlciB8IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgICAgIGxldCBheGlzID0gKGNoYXJ0IGFzIENoYXJ0QmFzZSkuY2hhcnQuZ2V0QXhpcyhzY2FsZS5pZCk7XHJcbiAgICAgICAgICAgIGlmKGF4aXMgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGxldCBheGlzUmFuZ2UgPSBheGlzLmdldEF4aXNSYW5nZSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGF4aXNSYW5nZSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBheGlzTWluID0gYXhpc1JhbmdlLm1pbjtcclxuICAgICAgICAgICAgICAgICAgICBheGlzTWF4ID0gYXhpc1JhbmdlLm1heFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiU2NhbGUgbm90IGF2YWlsYWJsZSEgXCIgKyBzY2FsZS5pZCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNoYXJ0LmFkZFNlcmllc1RvQ2hhcnQoc2VyaWVzLCBzY2FsZSwgdXBkYXRlUmFuZ2VYKTtcclxuICAgICAgICAgICAgY2hhcnQuc2V0QXZhaWxhYmxlU2VyaWVzQXNEYXRhU291cmNlKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoYXhpc01pbiAhPSB1bmRlZmluZWQgJiYgYXhpc01heCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGNoYXJ0LnNldFNjYWxlUmFuZ2Uoc2NhbGUsIHNjYWxlLm1pblhWYWx1ZSwgc2NhbGUubWF4WFZhbHVlLCBheGlzTWluLCBheGlzTWF4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodXBkYXRlUmFuZ2VZKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYXhpc01pblZhbHVlID0gY2hhcnQuZ2V0U2VyaWVzTWluWUZvclNjYWxlKHNjYWxlKTtcclxuICAgICAgICAgICAgICAgIGxldCBheGlzTWF4VmFsdWUgPSBjaGFydC5nZXRTZXJpZXNNYXhZRm9yU2NhbGUoc2NhbGUpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChheGlzTWluVmFsdWUgIT0gdW5kZWZpbmVkICYmIGF4aXNNYXhWYWx1ZSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjaGFydC51cGRhdGVSYW5nZVkoc2NhbGUsIGF4aXNNaW5WYWx1ZSwgYXhpc01heFZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjaGFydC5yZWRyYXdDaGFydCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhZGRZU2NhbGUoeVNjYWxlOiBTY2FsZSwgY2hhcnROYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgY2hhcnQgPSB0aGlzLmdldENoYXJ0T2JqZWN0QnlOYW1lKGNoYXJ0TmFtZSk7XHJcbiAgICAgICAgaWYoY2hhcnQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgY2hhcnQhLmFkZFlTY2FsZSh5U2NhbGUsIEF4aXNQb3NpdGlvbi5yaWdodCk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlWEF4aXNXaWR0aChjaGFydCEudHlwZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbW92ZSBvbmUgc2VyaWUgZnJvbSBvbmUgY2hhcnQgdG8gYW5vdGhlclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjaGFydE5hbWVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0YXJnZXRDaGFydE5hbWVcclxuICAgICAqIEBwYXJhbSB7U2NhbGV9IHRhcmdldFNjYWxlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3Q2hhcnRNYW5hZ2VyXHJcbiAgICAgKi9cclxuICAgIG1vdmVTZXJpZShzZXJpZTogQmFzZVNlcmllcywgY2hhcnROYW1lOiBzdHJpbmcsIHRhcmdldENoYXJ0TmFtZTogc3RyaW5nLCB0YXJnZXRTY2FsZTogU2NhbGUpIHtcclxuICAgICAgICBpZiAoc2VyaWUucmF3UG9pbnRzVmFsaWQgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBsZXQgY2hhcnQgPSB0aGlzLmdldENoYXJ0T2JqZWN0QnlOYW1lKGNoYXJ0TmFtZSk7XHJcbiAgICAgICAgICAgIGxldCB0YXJnZXQgPSB0aGlzLmdldENoYXJ0T2JqZWN0QnlOYW1lKHRhcmdldENoYXJ0TmFtZSk7XHJcbiAgICAgICAgICAgIGxldCBzZXJpZXMgPSBuZXcgQXJyYXk8QmFzZVNlcmllcz4oKTtcclxuICAgICAgICAgICAgc2VyaWVzLnB1c2goc2VyaWUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNoYXJ0ICE9IHVuZGVmaW5lZCAmJiB0YXJnZXQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBjaGFydC5yZW1vdmVTZXJpZUZyb21DaGFydChzZXJpZSwgdGhpcy5pc0xhc3RTZXJpZVdpdGhDdXJzb3JUeXBlKGNoYXJ0KSk7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQuYWRkU2VyaWVzVG9DaGFydChzZXJpZXMsIHRhcmdldFNjYWxlLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjaGFydC5zZXRBdmFpbGFibGVTZXJpZXNBc0RhdGFTb3VyY2UoKTtcclxuICAgICAgICAgICAgICAgIHRhcmdldC5zZXRBdmFpbGFibGVTZXJpZXNBc0RhdGFTb3VyY2UoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy51cGRhdGVYQXhpc1dpZHRoKGNoYXJ0IS50eXBlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZW1vdmUgb25lIHNlcmllIGZyb20gZ2l2ZW4gY2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNlcmllXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY2hhcnROYW1lXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3Q2hhcnRNYW5hZ2VyXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZVNlcmllKHNlcmllOiBCYXNlU2VyaWVzLCBjaGFydE5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBjaGFydCA9IHRoaXMuZ2V0Q2hhcnRPYmplY3RCeU5hbWUoY2hhcnROYW1lKTtcclxuICAgICAgICBpZiAoY2hhcnQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGNoYXJ0LnJlbW92ZVNlcmllRnJvbUNoYXJ0KHNlcmllLCB0aGlzLmlzTGFzdFNlcmllV2l0aEN1cnNvclR5cGUoY2hhcnQpKTtcclxuICAgICAgICAgICAgY2hhcnQuc2V0QXZhaWxhYmxlU2VyaWVzQXNEYXRhU291cmNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY2hhcnRzV2l0aFNlcmllID0gdGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsLmdldENoYXJ0c1VzaW5nU2VyaWUoW3NlcmllXSk7XHJcbiAgICAgICAgaWYgKGNoYXJ0c1dpdGhTZXJpZS5sZW5ndGggPT0gMCkgeyAvLyBTZXJpZSBub3QgdXNlZCBpbiBhbiBvdGhlciBjaGFydCA9PiBkZXRhY2ggc2VyaWUgZXZlbnRzXHJcbiAgICAgICAgICAgIHNlcmllLmV2ZW50RGF0YUNoYW5nZWQuZGV0YWNoKHRoaXMuX29uU2VyaWVEYXRhQ2hhbmdlZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZVlBeGlzKHlTY2FsZTogU2NhbGUsIGNoYXJ0OiBDaGFydE1hbmFnZXJDaGFydCkge1xyXG4gICAgICAgIGxldCB0cmFjZUNoYXJ0ID0gdGhpcy5nZXRDaGFydE9iamVjdEJ5TmFtZShjaGFydC5uYW1lKTtcclxuICAgICAgICBpZiAodHJhY2VDaGFydCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdHJhY2VDaGFydC5yZW1vdmVZU2NhbGVGcm9tQ2hhcnQoeVNjYWxlKTtcclxuICAgICAgICAgICAgdHJhY2VDaGFydC5zZXRBdmFpbGFibGVTZXJpZXNBc0RhdGFTb3VyY2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlWEF4aXNXaWR0aChjaGFydC5jaGFydFR5cGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmVtb3ZlIGNoYXJ0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNoYXJ0TmFtZVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld0NoYXJ0TWFuYWdlclxyXG4gICAgICovXHJcbiAgICByZW1vdmVDaGFydChjaGFydDogQ2hhcnRNYW5hZ2VyQ2hhcnQpIHtcclxuICAgICAgICBsZXQgdHJhY2VDaGFydCA9IHRoaXMuZ2V0Q2hhcnRPYmplY3RCeU5hbWUoY2hhcnQubmFtZSk7XHJcbiAgICAgICAgaWYgKHRyYWNlQ2hhcnQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlVHJhY2VDaGFydCh0cmFjZUNoYXJ0KTtcclxuXHJcbiAgICAgICAgICAgIGxldCBtaW5YOiBudW1iZXIgfCB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIGxldCBtYXhYOiBudW1iZXIgfCB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRyYWNlQ2hhcnQuc2VyaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobWluWCA9PSB1bmRlZmluZWQgfHwgbWluWCA+IHRyYWNlQ2hhcnQuc2VyaWVzW2ldLm1pblghKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWluWCA9IHRyYWNlQ2hhcnQuc2VyaWVzW2ldLm1pblg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobWF4WCA9PSB1bmRlZmluZWQgfHwgbWF4WCA8IHRyYWNlQ2hhcnQuc2VyaWVzW2ldLm1heFghKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF4WCA9IHRyYWNlQ2hhcnQuc2VyaWVzW2ldLm1heFg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlWEF4aXNXaWR0aChjaGFydC5jaGFydFR5cGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFBhbm5pbmdBeGVzKGF4ZXM6IElDaGFydEF4aXNbXSkge1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudHJhY2VDaGFydExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHBhbm5pbmdBeGlzID0gbmV3IEFycmF5PElDaGFydEF4aXM+KCk7XHJcbiAgICAgICAgICAgIGlmIChheGVzWzBdID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLnNjYWxlcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBheGlzID0gdGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5jaGFydC5nZXRBeGlzKHRoaXMudHJhY2VDaGFydExpc3RbaV0uc2NhbGVzW2pdLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXhpcyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFubmluZ0F4aXMucHVzaChheGlzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGF4aXMgPSB0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLmNoYXJ0LmdldEF4aXModGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5wcmltYXJ5WEF4aXNOYW1lKVxyXG4gICAgICAgICAgICAgICAgaWYgKGF4aXMgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFubmluZ0F4aXMucHVzaChheGlzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHBhbm5pbmdBeGlzID0gYXhlcztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5jaGFydC5zZXRQYW5uaW5nQXhlcyhwYW5uaW5nQXhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN5bmNocm9uaXplU2NhbGVYUmFuZ2Uoc2NhbGU6IFNjYWxlKSB7XHJcbiAgICAgICAgbGV0IGNoYXJ0VHlwZSA9IHNjYWxlLnBhcmVudC5jaGFydFR5cGU7XHJcbiAgICAgICAgbGV0IG1pbiA9IHNjYWxlLm1pblhWYWx1ZTtcclxuICAgICAgICBsZXQgbWF4ID0gc2NhbGUubWF4WFZhbHVlO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudHJhY2VDaGFydExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudHJhY2VDaGFydExpc3RbaV0udHlwZSA9PSBjaGFydFR5cGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudHJhY2VDaGFydExpc3RbaV0ub25TeW5jaHJvbml6ZVNjYWxlUmFuZ2Uoc2NhbGUsIG1pbiwgbWF4KTtcclxuICAgICAgICAgICAgICAgIC8vdGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5yZWRyYXdDaGFydCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldFpvb21BeGVzSW5DaGFydChjaGFydDogSVRyYWNlQ2hhcnQsIHpvb21EaXJlY3Rpb246IFpvb21EaXJlY3Rpb24pOiBBcnJheTxJQ2hhcnRBeGlzPiB7XHJcbiAgICAgICAgbGV0IGF4ZXMgPSBuZXcgQXJyYXk8SUNoYXJ0QXhpcz4oKTtcclxuXHJcbiAgICAgICAgaWYgKHpvb21EaXJlY3Rpb24gPT0gWm9vbURpcmVjdGlvbi5YWSB8fCB6b29tRGlyZWN0aW9uID09IFpvb21EaXJlY3Rpb24uWCkge1xyXG4gICAgICAgICAgICBsZXQgYXhpcyA9IGNoYXJ0LmNoYXJ0LmdldEF4aXMoY2hhcnQucHJpbWFyeVhBeGlzTmFtZSk7XHJcbiAgICAgICAgICAgIGlmIChheGlzICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgYXhlcy5wdXNoKGF4aXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoem9vbURpcmVjdGlvbiA9PSBab29tRGlyZWN0aW9uLlhZIHx8IHpvb21EaXJlY3Rpb24gPT0gWm9vbURpcmVjdGlvbi5ZKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hhcnQuc2NhbGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYXhpcyA9IGNoYXJ0LmNoYXJ0LmdldEF4aXMoY2hhcnQuc2NhbGVzW2ldLmlkKTtcclxuICAgICAgICAgICAgICAgIGlmIChheGlzICE9IHVuZGVmaW5lZCAmJiBheGlzLmdldEF4aXNPcmllbnRhdGlvbigpID09IEF4aXNPcmllbnRhdGlvbi52ZXJ0aWNhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGF4ZXMucHVzaChheGlzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXhlcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGVyZSBhcmUgbm8gbW9yZSBzZXJpZXMgaW4gYWxsIG90aGVyIGNoYXJ0cyB3aXRoIHRoZSBzYW1lIGN1cnNvciB0eXBlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SVRyYWNlQ2hhcnR9IGNoYXJ0XHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdDaGFydE1hbmFnZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpc0xhc3RTZXJpZVdpdGhDdXJzb3JUeXBlKGNoYXJ0OiBJVHJhY2VDaGFydCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBjdXJzb3JUeXBlID0gY2hhcnQuZ2V0U2VyaWVDdXJzb3JUeXBlKCk7XHJcbiAgICAgICAgaWYgKGNoYXJ0LnNlcmllcy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnRyYWNlQ2hhcnRMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLmdldFNlcmllQ3Vyc29yVHlwZSgpID09PSBjdXJzb3JUeXBlICYmIHRoaXMudHJhY2VDaGFydExpc3RbaV0gIT09IGNoYXJ0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGaW5kcyBJVHJhY2VDaGFydE9iamVjdCBieSBnaXZlIG5hbWUgYW5kIHJldHVybiBvYmplY3RcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICAgICAqIEByZXR1cm5zIHsoSVRyYWNlQ2hhcnQgfCB1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld0NoYXJ0TWFuYWdlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldENoYXJ0T2JqZWN0QnlOYW1lKG5hbWU6IHN0cmluZyk6IElUcmFjZUNoYXJ0IHwgdW5kZWZpbmVkIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudHJhY2VDaGFydExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudHJhY2VDaGFydExpc3RbaV0ud2lkZ2V0TmFtZSA9PSBuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50cmFjZUNoYXJ0TGlzdFtpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNTZXJpZUluQ2hhcnQoY2hhcnQsIHNlcmllKTogYm9vbGVhbiB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFydC5zZXJpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJ0LnNlcmllc1tpXS5pZCA9PT0gc2VyaWUuaWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKnByaXZhdGUgZ2V0UHJldmlvdXNDaGFydE9iamVjdEJ5TmFtZShuYW1lIDpzdHJpbmcpIDogSVRyYWNlQ2hhcnQgfCB1bmRlZmluZWR7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMudHJhY2VDaGFydExpc3QubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZih0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLndpZGdldE5hbWUgPT0gbmFtZSl7XHJcbiAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9Ki9cclxuXHJcbiAgICBwcml2YXRlIHJlbW92ZVNlcmllRnJvbUFsbENoYXJ0cyhzZXJpZTogQmFzZVNlcmllcykge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50cmFjZUNoYXJ0TGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLnNlcmllcy5tYXAoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHguaWQ7IH0pLmluZGV4T2Yoc2VyaWUuaWQpO1xyXG4gICAgICAgICAgICAvL2NvbnN0IGluZGV4ID0gdGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5zZXJpZXMuaW5kZXhPZihzZXJpZSwgMCk7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLnJlbW92ZVNlcmllRnJvbUNoYXJ0KHRoaXMudHJhY2VDaGFydExpc3RbaV0uc2VyaWVzW2luZGV4XSwgdGhpcy5pc0xhc3RTZXJpZVdpdGhDdXJzb3JUeXBlKHRoaXMudHJhY2VDaGFydExpc3RbaV0pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaGVja1JlZmVyZW5jZUN1cnNvcnNIb3ZlcmluZyhtb3VzZVBvaW50OiBJUG9pbnQsIHRyYWNlQ2hhcnQ6IElUcmFjZUNoYXJ0KTogdm9pZHtcclxuICAgICAgICB0cmFjZUNoYXJ0LmNoZWNrQ3Vyc29yc0hvdmVyaW5nKG1vdXNlUG9pbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYWdDdXJzb3JBbG9uZ0xpbmUodHJhY2VDaGFydDogSVRyYWNlQ2hhcnQsIG1vdmVtZW50WDogbnVtYmVyLCBtb3ZlbWVudFk6IG51bWJlcik6IHZvaWR7XHJcbiAgICAgICAgdHJhY2VDaGFydC5kcmFnQ3Vyc29yQWxvbmdMaW5lKG1vdmVtZW50WCwgbW92ZW1lbnRZKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRDdXJzb3JPblBvaW50ZXJQb3NpdGlvbih0cmFjZUNoYXJ0IDogSVRyYWNlQ2hhcnQsIG1vdXNlUG9pbnQ6IElQb2ludCl7XHJcbiAgICAgICAgdHJhY2VDaGFydC5zZXRDdXJzb3JPblBvaW50ZXJQb3NpdGlvbihtb3VzZVBvaW50KTtcclxuICAgIH1cclxuXHJcbiAgICBkb1Bhbm5pbmcodHJhY2VDaGFydDogSVRyYWNlQ2hhcnQsIG1vdXNlUG9pbnRYOiBudW1iZXIsIG1vdXNlUG9pbnRZOiBudW1iZXIpOiB2b2lke1xyXG4gICAgICAgIHRyYWNlQ2hhcnQuZG9QYW5uaW5nKG1vdXNlUG9pbnRYLCBtb3VzZVBvaW50WSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzZXRQYW5uaW5nQ29vcmRzKCl7XHJcbiAgICAgICAgZm9yKGxldCBjaGFydCBvZiB0aGlzLnRyYWNlQ2hhcnRMaXN0KXtcclxuICAgICAgICAgICAgY2hhcnQucmVzZXRQYW5uaW5nQ29vcmRzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICByZXNldFpvb20oKSB7XHJcbiAgICAgICAgbGV0IGNoYXJ0UmFuZ2VIZWxwZXIgPSBuZXcgQ2hhcnRSYW5nZUhlbHBlcigpO1xyXG5cclxuICAgICAgICBjaGFydFJhbmdlSGVscGVyLnJlc2V0WFJhbmdlc0FsbENoYXJ0VHlwZXModGhpcy50cmFjZUNoYXJ0TGlzdCk7XHJcbiAgICAgICAgY2hhcnRSYW5nZUhlbHBlci5yZXNldFlSYW5nZXNBbGxDaGFydFR5cGVzKHRoaXMudHJhY2VDaGFydExpc3QpO1xyXG4gICAgICAgIHRoaXMucmVkcmF3Q2hhcnRzKHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc2V0Q3Vyc29yc0hvdmVyaW5nKGFyZ3MpIHtcclxuICAgICAgICBpZiAodGhpcy50cmFjZUNoYXJ0TGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCBwYXJlbnRFbGVtZW50ID0gYXJncy5kYXRhLmUudGFyZ2V0LnBhcmVudEVsZW1lbnRcclxuICAgICAgICAgICAgaWYgKHBhcmVudEVsZW1lbnQgIT09IHVuZGVmaW5lZCAmJiBwYXJlbnRFbGVtZW50ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbW91c2VPdmVyQ3Vyc29ycyA9IHRoaXMuaXNNb3VzZU92ZXJDdXJzb3JzKHBhcmVudEVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgLy9KdXN0IHJlc2V0IGN1cnNvcnMgaWYgbW91c2UgaXMgbW92aW5nIG91dHNpZGUgYSBjaGFydFxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5nZXRUcmFjZUNoYXJ0QnlDb250YWluZXJJZChwYXJlbnRFbGVtZW50LmlkKSA9PT0gdW5kZWZpbmVkICYmICFtb3VzZU92ZXJDdXJzb3JzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFjZUNoYXJ0TGlzdFswXS5yZXNldEN1cnNvcnNIb3ZlcmVkKClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICBcclxuXHJcbiAgICBhdXRvU2NhbGUoKSB7XHJcbiAgICAgICAgbGV0IGNoYXJ0UmFuZ2VIZWxwZXIgPSBuZXcgQ2hhcnRSYW5nZUhlbHBlcigpO1xyXG4gICAgICAgIGZvciAobGV0IGNoYXJ0IG9mIHRoaXMudHJhY2VDaGFydExpc3QpIHtcclxuICAgICAgICAgICAgY2hhcnQuYXV0b1NjYWxlWVNjYWxlcygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2hhcnRSYW5nZUhlbHBlci5yZXNldFhSYW5nZXNBbGxDaGFydFR5cGVzKHRoaXMudHJhY2VDaGFydExpc3QpO1xyXG4gICAgICAgIHRoaXMucmVkcmF3Q2hhcnRzKHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldENoYXJ0Wm9vbUF4ZXMoYXhlczogWm9vbURpcmVjdGlvbikge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50cmFjZUNoYXJ0TGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLnNldFpvb21BeGVzKGF4ZXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNoYXJ0Vmlld1dpZGdldC5hY3RpdmVTZWxlY3RlZFpvb21BeGlzID0gYXhlcztcclxuICAgIH1cclxuXHJcbiAgICBzZXRQYW5uaW5nKGVuYWJsZTogYm9vbGVhbik6IGFueSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRyYWNlQ2hhcnRMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMudHJhY2VDaGFydExpc3RbaV0uc2V0UGFubmluZyhlbmFibGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRCb3hab29tKGVuYWJsZTogYm9vbGVhbik6IGFueSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRyYWNlQ2hhcnRMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMudHJhY2VDaGFydExpc3RbaV0uc2V0Qm94Wm9vbShlbmFibGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZWRyYXdDaGFydHMoZm9yY2VSZWRyYXc6IGJvb2xlYW4sIGNoYXJ0VHlwZT86IENoYXJ0VHlwZSkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50cmFjZUNoYXJ0TGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAvL2lmIChmb3JjZVJlZHJhdyA9PSB0cnVlIHx8IHRoaXMudHJhY2VDaGFydExpc3RbaV0udHlwZSAhPSBDaGFydFR5cGUuWFlDaGFydCkge1xyXG4gICAgICAgICAgICAvLyAgICB0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLnJlZHJhd0NoYXJ0KCk7XHJcbiAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICBpZihjaGFydFR5cGUgPT0gdW5kZWZpbmVkIHx8IGZvcmNlUmVkcmF3ID09IHRydWUgfHwgdGhpcy50cmFjZUNoYXJ0TGlzdFtpXS50eXBlID09IGNoYXJ0VHlwZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLnJlZHJhd0NoYXJ0KCk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uUmVkcmF3QWxsQ2hhcnRzKHNlbmRlciwgYXJncyA6IEV2ZW50UmVkcmF3QWxsQ2hhcnRzQXJncyl7XHJcbiAgICAgICAgdGhpcy5yZWRyYXdDaGFydHMoZmFsc2UsIGFyZ3MuY2hhcnRUeXBlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzTW91c2VPdmVyQ3Vyc29ycyhlbGVtZW50KTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0LnZhbHVlLmluY2x1ZGVzKENyb3NzSGFpckN1cnNvci5jcm9zc0hhaXJDdXJzb3JJZCkgfHwgZWxlbWVudC5jbGFzc0xpc3QudmFsdWUuaW5jbHVkZXMoTGluZUN1cnNvci5saW5lQ3Vyc29ySWQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uVXNlckNoYXJ0SW50ZXJhY3Rpb24oc2VuZGVyLCBldmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJnczogRXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbkFyZ3MpIHtcclxuICAgICAgICB0aGlzLmNoYXJ0Vmlld1dpZGdldC5vblVzZXJDaGFydEludGVyYWN0aW9uKHNlbmRlciwgZXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbkFyZ3MpXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZERyb3BwYWJsZUxvY2F0aW9ucyhkYXRhLCBzYW1lR3JvdXA6IGJvb2xlYW4pIHtcclxuICAgICAgICBmb3IgKGxldCBjaGFydCBvZiB0aGlzLnRyYWNlQ2hhcnRMaXN0KSB7XHJcbiAgICAgICAgICAgIGxldCBjaGFydE1hbmFnZXJDaGFydCA9IHRoaXMuX2NoYXJ0TWFuYWdlckRhdGFNb2RlbC5nZXRDaGFydChjaGFydC53aWRnZXROYW1lKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBzZXJpZUNoYXJ0VHlwZSA9IFNlcmllQ2hhcnRUeXBlSGVscGVyLmdldFNlcmllQ2hhcnRUeXBlKGRhdGFbMF0udHlwZSk7XHJcbiAgICAgICAgICAgIFNlcmllQ2hhcnRUeXBlSGVscGVyLnNldERyb3BQb3NzaWJsZUFyZWFzKGNoYXJ0TWFuYWdlckNoYXJ0ISwgZGF0YSwgc2VyaWVDaGFydFR5cGUsIHNhbWVHcm91cCk7XHJcbiAgICAgICAgICAgIGNoYXJ0LmFkZFNlcmllRHJvcExvY2F0aW9ucyhkYXRhLCBjaGFydE1hbmFnZXJDaGFydCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZHJvcEhlbHBlciA9IG5ldyBDaGFydERyb3BIZWxwZXIodGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsLCB0aGlzLmNoYXJ0Vmlld1dpZGdldCk7XHJcbiAgICAgICAgLy8gQWRkIGVtcHR5IHNwYWNlIGRyb3AgbG9jYXRpb25cclxuICAgICAgICBpZiAoZHJvcEhlbHBlci5jYW5BZGRDaGFydCgpID09IHRydWUpIHsgLy8gSXMgaXQgcG9zc2libGUgdG8gYWRkIG9uZSBtb3JlIGNoYXJ0XHJcbiAgICAgICAgICAgIGxldCBlbXB0eVNwYWNlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMubGF5b3V0TWFuYWdlci5jaGFydFNwbGl0dGVyLnBhcmVudENvbnRlbnRJZCArIFwiX2xhc3RQYW5lXCIpO1xyXG4gICAgICAgICAgICBsZXQgc2Nyb2xsQmFyV2lkdGggPSAkKCcjJyArIHRoaXMubGF5b3V0TWFuYWdlci5jaGFydFNwbGl0dGVyUGFyZW50Q29udGFpbmVySWQpWzBdLm9mZnNldFdpZHRoIC0gJCgnIycgKyB0aGlzLmxheW91dE1hbmFnZXIuY2hhcnRTcGxpdHRlckNvbnRhaW5lcklkKVswXS5vZmZzZXRXaWR0aDtcclxuICAgICAgICAgICAgaWYgKGVtcHR5U3BhY2VFbGVtZW50ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgZW1wdHlTcGFjZUVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoMTI1LDE2MCwxNjUsIDAuMiknO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGFbMF0udHlwZSA9PSBTZXJpZXNUeXBlLnRpbWVTZXJpZXMgJiYgZGF0YS5sZW5ndGggPiAyIHx8ICFzYW1lR3JvdXApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZENoYXJ0VHlwZUFyZWFzKGVtcHR5U3BhY2VFbGVtZW50LCBbdHJ1ZSwgZmFsc2UsIHRydWVdLCBzY3JvbGxCYXJXaWR0aCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChkYXRhWzBdLnR5cGUgPT0gU2VyaWVzVHlwZS50aW1lU2VyaWVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRDaGFydFR5cGVBcmVhcyhlbXB0eVNwYWNlRWxlbWVudCwgW3RydWUsIHRydWUsIHRydWVdLCBzY3JvbGxCYXJXaWR0aCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChkYXRhWzBdLnR5cGUgPT0gU2VyaWVzVHlwZS54eVNlcmllcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2hhcnRUeXBlQXJlYXMoZW1wdHlTcGFjZUVsZW1lbnQsIFtmYWxzZSwgdHJ1ZSwgZmFsc2VdLCBzY3JvbGxCYXJXaWR0aCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChkYXRhWzBdLnR5cGUgPT0gU2VyaWVzVHlwZS5mZnRTZXJpZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZENoYXJ0VHlwZUFyZWFzKGVtcHR5U3BhY2VFbGVtZW50LCBbZmFsc2UsIGZhbHNlLCB0cnVlXSwgc2Nyb2xsQmFyV2lkdGgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYWRkQ2hhcnRUeXBlQXJlYXMocGFyZW50OiBIVE1MRWxlbWVudCwgZW5hYmxlZDogQXJyYXk8Ym9vbGVhbj4sIHNjcm9sbEJhcldpZHRoKSB7XHJcbiAgICAgICAgbGV0IGNoYXJ0TmFtZXMgPSBbJ1lUJywgJ1hZJywgJ0ZGVCddO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hhcnROYW1lcy5sZW5ndGg7IGkgPSBpICsgMSkge1xyXG4gICAgICAgICAgICBsZXQgYXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBhcmVhLmlkID0gcGFyZW50LmlkICsgJ18nICsgY2hhcnROYW1lc1tpXTtcclxuICAgICAgICAgICAgYXJlYS5jbGFzc0xpc3QuYWRkKCdjaGFydFR5cGVzJyk7XHJcbiAgICAgICAgICAgIGlmICghZW5hYmxlZFtpXSkge1xyXG4gICAgICAgICAgICAgICAgYXJlYS5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBhcmVhLnN0eWxlLndpZHRoID0gKChwYXJlbnQub2Zmc2V0V2lkdGggLSBzY3JvbGxCYXJXaWR0aCkgLyBjaGFydE5hbWVzLmxlbmd0aCkudG9TdHJpbmcoKSArICdweCc7XHJcblxyXG4gICAgICAgICAgICBsZXQgaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xyXG4gICAgICAgICAgICBpbWFnZS5zcmMgPSAnLi93aWRnZXRzL2NvbW1vbi9zdHlsZS9pbWFnZXMvY2hhcnRUeXBlJyArIGNoYXJ0TmFtZXNbaV0gKyAnLnN2Zyc7XHJcbiAgICAgICAgICAgIGltYWdlLmNsYXNzTGlzdC5hZGQoJ2ltYWdlQ2hhcnQnKTtcclxuXHJcbiAgICAgICAgICAgIGFyZWEuYXBwZW5kQ2hpbGQoaW1hZ2UpO1xyXG4gICAgICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoYXJlYSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmVEcm9wcGFibGVMb2NhdGlvbnMoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgY2hhcnQgb2YgdGhpcy50cmFjZUNoYXJ0TGlzdCkge1xyXG4gICAgICAgICAgICBjaGFydC5yZW1vdmVTZXJpZURyb3BMb2NhdGlvbnMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gUmVtb3ZlIGVtcHR5IHNwYWNlIGRyb3AgbG9jYXRpb25cclxuICAgICAgICBsZXQgZW1wdHlTcGFjZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmxheW91dE1hbmFnZXIuY2hhcnRTcGxpdHRlci5wYXJlbnRDb250ZW50SWQgKyBcIl9sYXN0UGFuZVwiKTtcclxuICAgICAgICBpZiAoZW1wdHlTcGFjZUVsZW1lbnQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGxldCB0eXBlT2ZDaGFydHMgPSBlbXB0eVNwYWNlRWxlbWVudC5jaGlsZHJlbi5sZW5ndGg7XHJcbiAgICAgICAgICAgIGVtcHR5U3BhY2VFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjZmZmJztcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0eXBlT2ZDaGFydHM7IGkgPSBpICsgMSkge1xyXG4gICAgICAgICAgICAgICAgZW1wdHlTcGFjZUVsZW1lbnQuY2hpbGRyZW5bMF0ucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZVhBeGlzV2lkdGgoY2hhcnRUeXBlOiBDaGFydFR5cGUpIHtcclxuICAgICAgICBsZXQgbWF4WUF4ZXMgPSAwO1xyXG4gICAgICAgIGxldCBjaGFydEFyZWE6IFJlY3RhbmdsZSB8IHVuZGVmaW5lZDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudHJhY2VDaGFydExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudHJhY2VDaGFydExpc3RbaV0udHlwZSA9PSBjaGFydFR5cGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudHJhY2VDaGFydExpc3RbaV0uY2hhcnQucmVkcmF3KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG51bWJlck9mWUF4ZXNJbkNoYXJ0ID0gdGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5nZXROdW1iZXJPZllTY2FsZXMoKTtcclxuICAgICAgICAgICAgICAgIGlmIChudW1iZXJPZllBeGVzSW5DaGFydCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbnVtYmVyT2ZZQXhlc0luQ2hhcnQgPSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vaWYgb25lIGNoYXJ0IGhhcyBtb3JlIGF4aXMgdGhhbiB0aGUgb3RoZXJzIHVzZSBpdHMgd2lkdGgsIGlmIHRoZXkgaGF2ZSB0aGUgc2FtZSBhbW91bnQgdXNlIHRoZSBvbmUgd2l0aCB0aGUgaGlnaGVyIHdpZHRoXHJcbiAgICAgICAgICAgICAgICBpZiAobnVtYmVyT2ZZQXhlc0luQ2hhcnQgPiBtYXhZQXhlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIG1heFlBeGVzID0gbnVtYmVyT2ZZQXhlc0luQ2hhcnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hhcnRBcmVhID0gdGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5jaGFydC5nZXRDaGFydEFyZWEoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG51bWJlck9mWUF4ZXNJbkNoYXJ0ID09IG1heFlBeGVzICYmIHRoaXMudHJhY2VDaGFydExpc3RbaV0uY2hhcnQuZ2V0Q2hhcnRBcmVhKCkud2lkdGggPiBjaGFydEFyZWEhLndpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hhcnRBcmVhID0gdGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5jaGFydC5nZXRDaGFydEFyZWEoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGNoYXJ0QXJlYSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5hbGlnbllBeGVzKGNoYXJ0QXJlYSwgY2hhcnRUeXBlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhbGlnbllBeGVzKGNoYXJ0QXJlYTogUmVjdGFuZ2xlLCBjaGFydFR5cGU6IENoYXJ0VHlwZSkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50cmFjZUNoYXJ0TGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50cmFjZUNoYXJ0TGlzdFtpXS50eXBlID09IGNoYXJ0VHlwZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld0NoYXJ0QXJlYSA9IHsgeDogY2hhcnRBcmVhLngsIHk6IGNoYXJ0QXJlYS55LCB3aWR0aDogY2hhcnRBcmVhLndpZHRoLCBoZWlnaHQ6IHRoaXMudHJhY2VDaGFydExpc3RbaV0uY2hhcnQuZ2V0Q2hhcnRBcmVhKCkuaGVpZ2h0IC0gMX07XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLmNoYXJ0LnNldENoYXJ0QXJlYShuZXdDaGFydEFyZWEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5yZWRyYXdDaGFydCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==