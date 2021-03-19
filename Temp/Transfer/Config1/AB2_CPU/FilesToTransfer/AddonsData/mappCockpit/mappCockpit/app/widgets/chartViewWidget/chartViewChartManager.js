define(["require", "exports", "../chartWidget/YTChart", "../chartWidget/XYChart", "../chartWidget/FFTChart", "./chartViewWidget", "../common/viewTypeProvider", "../chartWidget/helpers/chartRangeHelper", "../../models/chartManagerDataModel/chartManagerDataModel", "../../models/chartManagerDataModel/chartManagerChart", "../../models/chartManagerDataModel/eventSerieDataChangedArgs", "./helpers/chartDropHelper", "../common/states/chartViewToolbarStates", "../../core/interfaces/components/ui/chart/chartInterface", "../common/SerieChartTypeHelper", "../../models/chartManagerDataModel/seriesType"], function (require, exports, YTChart_1, XYChart_1, FFTChart_1, chartViewWidget_1, viewTypeProvider_1, chartRangeHelper_1, chartManagerDataModel_1, chartManagerChart_1, eventSerieDataChangedArgs_1, chartDropHelper_1, chartViewToolbarStates_1, chartInterface_1, SerieChartTypeHelper_1, seriesType_1) {
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
            this.chartViewWidget = chartViewWidget;
            this._states = chartViewWidget.states;
            this.userInteractionController = userInteractionController;
            this.layoutManager = layoutManager;
            this._chartManagerDataModel = chartManagerDataModel;
        }
        ChartViewChartManager.prototype.initChartViewWithDataModel = function () {
            var _this = this;
            // If there are already charts in the datamodel => show in chart view => needed for persisting
            if (this._chartManagerDataModel.data != undefined) {
                this._chartManagerDataModel.data.forEach(function (chart) {
                    // Add charts, add scales, add series
                    _this.addTraceChart(chart, -1, chart.chartType);
                });
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
            this.redrawCharts();
            var scales = chart.childs;
            for (var i = 1; i < scales.length; i++) {
                this.addYScale(scales[i], chart.name);
            }
            for (var i = 0; i < scales.length; i++) {
                if (scales[i].childs.length > 0) {
                    this.addSeriesToChart(scales[i].childs, chart, chart.childs[i], true);
                }
            }
            this.updateZoomSettings();
            this.updateXAxisWidth(chart.chartType);
            return newTraceChart;
        };
        ChartViewChartManager.prototype.addChartToContainer = function (name, index, type, scale) {
            if (index === void 0) { index = -1; }
            var traceChart;
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
                this.layoutManager.chartSplitter.addWidget(traceChart, name, viewTypeProvider_1.ViewType.User, 300);
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
                this.redrawCharts();
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
                    this.addSeriesToChart(args.data.series, args.data.chart, args.data.axis);
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
            this.addSeries(series, chartName, scale, resetYRange);
            if (resetXRange) {
                if (series[0].type == seriesType_1.SeriesType.timeSeries) {
                    new chartRangeHelper_1.ChartRangeHelper().resetChartRangesX(this.traceChartList, chartManagerChart_1.ChartType.YTChart);
                }
                else if (series[0].type == seriesType_1.SeriesType.fftSeries) {
                    new chartRangeHelper_1.ChartRangeHelper().resetChartRangesX(this.traceChartList, chartManagerChart_1.ChartType.FFTChart);
                }
                this.redrawCharts(true);
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
            var isFirstSerie = false;
            for (var i = 0; i < charts.length; i++) {
                if (charts[i].series.length == 0) {
                    isFirstSerie = true;
                }
                else if (charts[i].series.length == 1) {
                    if (charts[i].series[0].serie != series) {
                        return false;
                    }
                }
            }
            return isFirstSerie;
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
            var serieChartType = new SerieChartTypeHelper_1.SerieChartTypeHelper().getSerieChartType(series.type);
            for (var i = 0; i < charts.length; i++) {
                var chart = this.getChartObjectByName(charts[i].name);
                if (chart != undefined && serieChartType == chart.type) {
                    if (!this.isSerieInChart(chart, series)) {
                        // add series 
                        var scale = charts[i].getYAxisForSerie(series);
                        if (scale != undefined) {
                            var isFirstSeriesInChart = this.isFirstSeriesOfTypeInCharts(series);
                            this.addSeries([series], charts[i].name, scale, this.isFirstSeriesOnScale(series, scale));
                            if (isFirstSeriesInChart) {
                                if (series.type == seriesType_1.SeriesType.timeSeries) {
                                    this.resetXRangesYT();
                                }
                                else if (series.type == seriesType_1.SeriesType.fftSeries) {
                                    this.resetXRangesFFT();
                                }
                                this.redrawCharts(true);
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
        ChartViewChartManager.prototype.addSeries = function (series, chartName, scale, updateRangeY) {
            var chart = this.getChartObjectByName(chartName);
            if (chart != undefined) {
                var axisMin = void 0;
                var axisMax = void 0;
                var axisRange = chart.chart.getAxis(scale.id).getAxisRange();
                if (axisRange != undefined) {
                    axisMin = axisRange.min;
                    axisMax = axisRange.max;
                }
                chart.addSeriesToChart(series, scale);
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
            chart.addYScale(yScale, chartInterface_1.AxisPosition.right);
            this.updateXAxisWidth(chart.type);
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
                    chart.removeSerieFromChart(serie);
                    target.addSeriesToChart(series, targetScale);
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
                chart.removeSerieFromChart(serie);
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
                    this.traceChartList[i].removeSerieFromChart(this.traceChartList[i].series[index]);
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
            chartRangeHelper.resetChartRangesX(this.traceChartList);
            chartRangeHelper.resetChartRangesY(this.traceChartList);
            this.redrawCharts(true);
        };
        ChartViewChartManager.prototype.resetXRangesFFT = function () {
            new chartRangeHelper_1.ChartRangeHelper().resetChartRangesX(this.traceChartList, chartManagerChart_1.ChartType.FFTChart);
        };
        ChartViewChartManager.prototype.resetXRangesYT = function () {
            new chartRangeHelper_1.ChartRangeHelper().resetChartRangesX(this.traceChartList, chartManagerChart_1.ChartType.YTChart);
        };
        ChartViewChartManager.prototype.autoScale = function () {
            var chartRangeHelper = new chartRangeHelper_1.ChartRangeHelper();
            for (var _i = 0, _a = this.traceChartList; _i < _a.length; _i++) {
                var chart = _a[_i];
                chart.autoScaleYScales();
            }
            chartRangeHelper.resetChartRangesX(this.traceChartList);
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
        ChartViewChartManager.prototype.redrawCharts = function (forceRedraw) {
            if (forceRedraw === void 0) { forceRedraw = false; }
            for (var i = 0; i < this.traceChartList.length; i++) {
                if (forceRedraw == true || this.traceChartList[i].type != chartManagerChart_1.ChartType.XYChart) {
                    this.traceChartList[i].redrawChart();
                }
            }
        };
        ChartViewChartManager.prototype.onRedrawAllCharts = function (sender, args) {
            this.redrawCharts();
        };
        ChartViewChartManager.prototype.onUserChartInteraction = function (sender, eventUserChartInteractionArgs) {
            this.chartViewWidget.onUserChartInteraction(sender, eventUserChartInteractionArgs);
        };
        ChartViewChartManager.prototype.addDroppableLocations = function (data, sameGroup) {
            var serieChartTypeHelper = new SerieChartTypeHelper_1.SerieChartTypeHelper();
            for (var _i = 0, _a = this.traceChartList; _i < _a.length; _i++) {
                var chart = _a[_i];
                var chartManagerChart = this._chartManagerDataModel.getChart(chart.widgetName);
                var serieChartType = serieChartTypeHelper.getSerieChartType(data[0].type);
                serieChartTypeHelper.setDropPossibleAreas(chartManagerChart, data, serieChartType, sameGroup);
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
                    var newChartArea = { x: chartArea.x, y: chartArea.y, width: chartArea.width, height: this.traceChartList[i].chart.getChartArea().height };
                    this.traceChartList[i].chart.setChartArea(newChartArea);
                    this.traceChartList[i].redrawChart();
                }
            }
        };
        return ChartViewChartManager;
    }());
    exports.ChartViewChartManager = ChartViewChartManager;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRWaWV3Q2hhcnRNYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0Vmlld1dpZGdldC9jaGFydFZpZXdDaGFydE1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBNEJBO1FBaUJJLCtCQUFZLGVBQWdDLEVBQUUseUJBQXFELEVBQUUsYUFBcUMsRUFBRSxxQkFBNkM7WUFBekwsaUJBTUM7WUFyQkQsbUJBQWMsR0FBdUIsRUFBRSxDQUFDO1lBQ3hDLFdBQU0sR0FBaUIsSUFBSSxLQUFLLEVBQWMsQ0FBQztZQVF2Qyx3QkFBbUIsR0FBRyxVQUFDLE1BQU0sRUFBRSxTQUFTLElBQUssT0FBQSxLQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxFQUExQyxDQUEwQyxDQUFDO1lBQ3hGLGlDQUE0QixHQUFHLFVBQUMsTUFBTSxFQUFFLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQXpDLENBQXlDLENBQUM7WUFDM0YsdUJBQWtCLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsRUFBbkMsQ0FBbUMsQ0FBQztZQUs5RSxJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztZQUN2QyxJQUFJLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQyxNQUFNLENBQUM7WUFDdEMsSUFBSSxDQUFDLHlCQUF5QixHQUFHLHlCQUF5QixDQUFDO1lBQzNELElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1lBQ25DLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxxQkFBcUIsQ0FBQztRQUN4RCxDQUFDO1FBRU0sMERBQTBCLEdBQWpDO1lBQUEsaUJBUUM7WUFQRyw4RkFBOEY7WUFDOUYsSUFBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxJQUFJLFNBQVMsRUFBQztnQkFDN0MsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLO29CQUMxQyxxQ0FBcUM7b0JBQ3JDLEtBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxFQUFHLEtBQTJCLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3pFLENBQUMsQ0FBQyxDQUFDO2FBQ047UUFDTCxDQUFDO1FBRUQsdUNBQU8sR0FBUDtZQUNJLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDakQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUNwQztRQUNMLENBQUM7UUFFRCw2Q0FBYSxHQUFiLFVBQWMsS0FBd0IsRUFBRSxLQUFrQixFQUFFLElBQVk7WUFBaEMsc0JBQUEsRUFBQSxTQUFpQixDQUFDO1lBRXRELHdFQUF3RTtZQUN4RSxJQUFJLE1BQU0sR0FBaUIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDbEQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1lBRTVCLElBQUksYUFBYSxHQUEwQixJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUU5RywyQkFBMkI7WUFDM0IsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1lBRWhDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUVwQixJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO1lBQzFCLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUNsQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDeEM7WUFFRCxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztnQkFDbEMsSUFBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUM7b0JBQzNCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUN6RTthQUNKO1lBRUQsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7WUFFMUIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN2QyxPQUFPLGFBQWEsQ0FBQztRQUN6QixDQUFDO1FBR08sbURBQW1CLEdBQTNCLFVBQTRCLElBQVksRUFBRSxLQUFrQixFQUFFLElBQWUsRUFBRSxLQUFZO1lBQWpELHNCQUFBLEVBQUEsU0FBaUIsQ0FBQztZQUN4RCxJQUFJLFVBQXVCLENBQUM7WUFFNUIsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRTtnQkFDM0IsNENBQTRDO2dCQUM1QyxJQUFJLElBQUksS0FBSyw2QkFBUyxDQUFDLE9BQU8sRUFBRTtvQkFDNUIsVUFBVSxHQUFHLElBQUksaUJBQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFBO2lCQUN6RTtxQkFBTSxJQUFJLElBQUksS0FBSyw2QkFBUyxDQUFDLE9BQU8sRUFBRTtvQkFDbkMsVUFBVSxHQUFHLElBQUksaUJBQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO2lCQUMxRTtxQkFBTTtvQkFDSCxVQUFVLEdBQUcsSUFBSSxtQkFBUSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7aUJBQzNFO2dCQUdELFVBQVUsQ0FBQyx5QkFBeUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUM7Z0JBQy9FLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7Z0JBQ2hFLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLDJCQUFRLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUVqRixJQUFJLEtBQUssSUFBSSxDQUFDLENBQUMsRUFBRTtvQkFDYiwyRUFBMkU7b0JBQzNFLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBQy9ELElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUE7aUJBQ25EO3FCQUNJO29CQUNELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2lCQUN4QztnQkFDRCxPQUFPLFVBQVUsQ0FBQzthQUNyQjtZQUVELE9BQU8sU0FBUyxDQUFDO1FBR3JCLENBQUM7UUFDRDs7Ozs7V0FLRztRQUNLLGtEQUFrQixHQUExQjtZQUNJLElBQUksU0FBUyxHQUF1QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQywyQ0FBa0IsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1lBQ2hHLElBQUksa0JBQWtCLEdBQWdDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLG9EQUEyQixFQUFFLDZCQUE2QixDQUFDLENBQUM7WUFFcEksSUFBSSxTQUFTLENBQUMsWUFBWSxJQUFJLCtDQUFzQixDQUFDLE9BQU8sRUFBRTtnQkFDMUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUMxQjtpQkFDSSxJQUFJLFNBQVMsQ0FBQyxZQUFZLElBQUksK0NBQXNCLENBQUMsT0FBTyxFQUFFO2dCQUMvRCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzFCO2lCQUNJO2dCQUNELElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDMUI7WUFFRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDNUQsQ0FBQztRQUVELGdEQUFnQixHQUFoQixVQUFpQixLQUFrQjtZQUMvQixLQUFLLENBQUMseUJBQXlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1lBQzFFLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDM0QsSUFBSSxDQUFDLHdCQUF3QixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNoQixJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekQsQ0FBQztRQUVPLHdEQUF3QixHQUFoQyxVQUFpQyxLQUFrQjtZQUMvQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRXRDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFO2dCQUNaLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQzthQUN4QztRQUNMLENBQUM7UUFFRCw4Q0FBYyxHQUFkLFVBQWUsS0FBd0IsRUFBRSxXQUE4QixFQUFFLElBQUk7WUFFekUsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2RCxJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFbkUsSUFBSSxVQUFVLElBQUksU0FBUyxJQUFJLGdCQUFnQixJQUFJLFNBQVMsRUFBRTtnQkFFMUQsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDaEQsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUV2RCxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksYUFBYSxFQUFFO29CQUNsQyxXQUFXLElBQUksQ0FBQyxDQUFDO2lCQUNwQjtnQkFFRCxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUMsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDLEVBQUU7b0JBQ3JDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDMUMsSUFBSSxVQUFVLEdBQUcsV0FBVyxFQUFFO3dCQUMxQixJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQztxQkFDOUQ7eUJBQ0k7d0JBQ0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQztxQkFDMUQ7b0JBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQztpQkFDeEU7Z0JBRUQsa0NBQWtDO2dCQUNsQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQy9DLFVBQVUsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSw2QkFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNsRTtnQkFJRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDMUM7UUFDTCxDQUFDO1FBRU8sK0NBQWUsR0FBdkI7WUFDSSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDbkMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNqRDtRQUNMLENBQUM7UUFFTyw2Q0FBYSxHQUFyQixVQUFzQixLQUFrQjtZQUNwQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQTtZQUNkLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDakQsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRTtvQkFDakMsS0FBSyxHQUFHLENBQUMsQ0FBQztpQkFDYjthQUNKO1lBQ0QsT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUVELDBEQUEwQixHQUExQixVQUEyQixXQUFtQjtZQUMxQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2pELElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLElBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLEVBQUU7b0JBQ2hILE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDakM7YUFDSjtZQUVELE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFFRCxtREFBbUIsR0FBbkIsVUFBb0IsU0FBaUI7WUFDakMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNqRCxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxJQUFJLFNBQVMsRUFBRTtvQkFDaEQsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNqQzthQUNKO1lBRUQsT0FBTyxTQUFTLENBQUM7UUFDckIsQ0FBQztRQUVELDBEQUEwQixHQUExQixVQUEyQixTQUFpQyxFQUFFLElBQUk7WUFDOUQsSUFBSSxDQUFDLHNCQUFzQixHQUFHLFNBQVMsQ0FBQztZQUN4QyxRQUFRLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ2YsS0FBSyx3REFBZ0MsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDNUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7b0JBQ3hFLE1BQU07aUJBQ1Q7Z0JBQ0QsS0FBSyx3REFBZ0MsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDN0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQ3hHLE1BQU07aUJBQ1Q7Z0JBQ0QsS0FBSyx3REFBZ0MsQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDL0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDeEQsTUFBTTtpQkFDVDtnQkFDRCxLQUFLLHdEQUFnQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUMvQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ2xDLE1BQU07aUJBQ1Q7Z0JBQ0QsS0FBSyx3REFBZ0MsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDNUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNyRSxNQUFNO2lCQUNUO2dCQUNELEtBQUssd0RBQWdDLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBRTdDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNsRSxNQUFNO2lCQUNUO2dCQUNELEtBQUssd0RBQWdDLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQzdDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3RELE1BQU07aUJBQ1Q7Z0JBQ0QsS0FBSyx3REFBZ0MsQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFDaEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNuRCxNQUFNO2lCQUNUO2dCQUNELEtBQUssd0RBQWdDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztvQkFDcEQsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzdDLE1BQU07aUJBQ1Q7YUFDSjtRQUNMLENBQUM7UUFJTyxnREFBZ0IsR0FBeEIsVUFBeUIsTUFBeUIsRUFBRSxLQUF5QixFQUFFLEtBQVksRUFBRSxVQUEyQjtZQUEzQiwyQkFBQSxFQUFBLGtCQUEyQjtZQUVwSCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDcEMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQzthQUMvRDtZQUNELElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFDM0Isd0RBQXdEO1lBQ3hELDBEQUEwRDtZQUUxRCxJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDeEIsSUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFDO1lBRXhCLElBQUcsQ0FBQyxVQUFVLEVBQUM7Z0JBQ1gsV0FBVyxHQUFFLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDeEQsV0FBVyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDN0Q7WUFFRCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBRXRELElBQUksV0FBVyxFQUFFO2dCQUNiLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSx1QkFBVSxDQUFDLFVBQVUsRUFBRTtvQkFDekMsSUFBSSxtQ0FBZ0IsRUFBRSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsNkJBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDcEY7cUJBQ0ksSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLHVCQUFVLENBQUMsU0FBUyxFQUFFO29CQUM3QyxJQUFJLG1DQUFnQixFQUFFLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSw2QkFBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUNyRjtnQkFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzNCO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ0ssb0RBQW9CLEdBQTVCLFVBQTZCLE1BQWtCLEVBQUUsS0FBWTtZQUN6RCxvRkFBb0Y7WUFDcEYsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksTUFBTSxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ2xELE9BQU8sS0FBSyxDQUFBO2FBQ25CO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ0ssMkRBQTJCLEdBQW5DLFVBQW9DLE1BQWtCO1lBQ2xELElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM1QyxJQUFJLFlBQVksR0FBRyxLQUFLLENBQUM7WUFDekIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBRXBDLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO29CQUM5QixZQUFZLEdBQUcsSUFBSSxDQUFDO2lCQUN2QjtxQkFDSSxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtvQkFDbkMsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxNQUFNLEVBQUU7d0JBQ3JDLE9BQU8sS0FBSyxDQUFDO3FCQUNoQjtpQkFDSjthQUVKO1lBQ0QsT0FBTyxZQUFZLENBQUM7UUFHeEIsQ0FBQztRQUNPLGlEQUFpQixHQUF6QixVQUEwQixNQUFrQjtZQUN4QyxJQUFJLE1BQU0sR0FBRyxLQUFLLEVBQWUsQ0FBQztZQUNsQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLElBQUksdUJBQVUsQ0FBQyxTQUFTLEVBQUU7Z0JBRXJDLE1BQU0sR0FBRyxJQUFJLG1DQUFnQixFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQzthQUNyRTtpQkFDSSxJQUFJLE1BQU0sQ0FBQyxJQUFJLElBQUksdUJBQVUsQ0FBQyxVQUFVLEVBQUU7Z0JBQzNDLE1BQU0sR0FBRyxJQUFJLG1DQUFnQixFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQzthQUNwRTtZQUNELE9BQU8sTUFBTSxDQUFDO1FBQ2xCLENBQUM7UUFFTyxrREFBa0IsR0FBMUIsVUFBMkIsTUFBTSxFQUFFLFNBQW9DO1lBQ25FLElBQUksU0FBUyxDQUFDLE1BQU0sSUFBSSx1Q0FBVyxDQUFDLGlCQUFpQixFQUFFO2dCQUNuRCxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ2hDO2lCQUNJLElBQUksU0FBUyxDQUFDLE1BQU0sSUFBSSx1Q0FBVyxDQUFDLFlBQVksRUFBRTtnQkFDbkQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ2pDO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSywrQ0FBZSxHQUF2QixVQUF3QixNQUFrQjtZQUN0QyxJQUFJLE1BQU0sQ0FBQyxjQUFjLElBQUksS0FBSyxFQUFFO2dCQUNoQyxnREFBZ0Q7Z0JBQ2hELElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUN6QztpQkFDSTtnQkFDRCxpRUFBaUU7Z0JBQ2pFLElBQUksSUFBSSxDQUFDLHNCQUFzQixJQUFJLFNBQVMsRUFBRTtvQkFDMUMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLG1CQUFtQixDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDdkUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQTtpQkFDOUM7YUFDSjtRQUNMLENBQUM7UUFFTyxzREFBc0IsR0FBOUIsVUFBK0IsTUFBNEIsRUFBRSxNQUFrQjtZQUMzRSxJQUFJLGNBQWMsR0FBRyxJQUFJLDJDQUFvQixFQUFFLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRS9FLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNwQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN0RCxJQUFJLEtBQUssSUFBSSxTQUFTLElBQUksY0FBYyxJQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUU7b0JBQ3BELElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsRUFBRTt3QkFDckMsY0FBYzt3QkFDZCxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQy9DLElBQUksS0FBSyxJQUFJLFNBQVMsRUFBRTs0QkFDcEIsSUFBSSxvQkFBb0IsR0FBRyxJQUFJLENBQUMsMkJBQTJCLENBQUMsTUFBTSxDQUFDLENBQUM7NEJBQ3BFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7NEJBRTFGLElBQUksb0JBQW9CLEVBQUU7Z0NBQ3RCLElBQUksTUFBTSxDQUFDLElBQUksSUFBSSx1QkFBVSxDQUFDLFVBQVUsRUFBRTtvQ0FDdEMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO2lDQUN6QjtxQ0FDSSxJQUFJLE1BQU0sQ0FBQyxJQUFJLElBQUksdUJBQVUsQ0FBQyxTQUFTLEVBQUU7b0NBQzFDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztpQ0FDMUI7Z0NBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQzs2QkFDM0I7eUJBQ0o7NkJBQ0k7NEJBQ0QsT0FBTyxDQUFDLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO3lCQUM5QztxQkFDSjtvQkFDRCxLQUFLLENBQUMsOEJBQThCLEVBQUUsQ0FBQztvQkFDdkMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO2lCQUN2QjthQUNKO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLGdEQUFnQixHQUF4QixVQUF5QixLQUFpQjtZQUN0QyxJQUFJLElBQUksQ0FBQyxzQkFBc0IsSUFBSSxTQUFTLEVBQUU7Z0JBQzFDLElBQUksTUFBTSxHQUFHLElBQUksS0FBSyxFQUFjLENBQUM7Z0JBQ3JDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ25CLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDckUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQ3BDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3RELElBQUksS0FBSyxJQUFJLFNBQVMsRUFBRTt3QkFDcEIsbUNBQW1DO3dCQUNuQyxLQUFLLENBQUMsOEJBQThCLEVBQUUsQ0FBQztxQkFDMUM7aUJBQ0o7YUFDSjtRQUNMLENBQUM7UUFFRDs7Ozs7Ozs7V0FRRztRQUNILHlDQUFTLEdBQVQsVUFBVSxNQUF5QixFQUFFLFNBQWlCLEVBQUUsS0FBWSxFQUFFLFlBQXFCO1lBQ3ZGLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNqRCxJQUFJLEtBQUssSUFBSSxTQUFTLEVBQUU7Z0JBQ3BCLElBQUksT0FBTyxTQUFvQixDQUFDO2dCQUNoQyxJQUFJLE9BQU8sU0FBb0IsQ0FBQztnQkFFaEMsSUFBSSxTQUFTLEdBQUksS0FBbUIsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDN0UsSUFBSSxTQUFTLElBQUksU0FBUyxFQUFFO29CQUN4QixPQUFPLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQztvQkFDeEIsT0FBTyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUE7aUJBQzFCO2dCQUVELEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ3RDLEtBQUssQ0FBQyw4QkFBOEIsRUFBRSxDQUFDO2dCQUV2QyxJQUFJLE9BQU8sSUFBSSxTQUFTLElBQUksT0FBTyxJQUFJLFNBQVMsRUFBRTtvQkFDOUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztpQkFDbEY7Z0JBQ0QsSUFBSSxZQUFZLEVBQUU7b0JBQ2QsSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN0RCxJQUFJLFlBQVksR0FBRyxLQUFLLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBRXRELElBQUksWUFBWSxJQUFJLFNBQVMsSUFBSSxZQUFZLElBQUksU0FBUyxFQUFFO3dCQUN4RCxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxZQUFZLEVBQUUsWUFBWSxDQUFDLENBQUM7cUJBQ3pEO2lCQUNKO2dCQUNELEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUN2QjtRQUdMLENBQUM7UUFFRCx5Q0FBUyxHQUFULFVBQVUsTUFBTSxFQUFFLFNBQVM7WUFDdkIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2pELEtBQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLDZCQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QyxDQUFDO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDSCx5Q0FBUyxHQUFULFVBQVUsS0FBaUIsRUFBRSxTQUFpQixFQUFFLGVBQXVCLEVBQUUsV0FBa0I7WUFDdkYsSUFBSSxLQUFLLENBQUMsY0FBYyxJQUFJLElBQUksRUFBRTtnQkFDOUIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNqRCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQ3hELElBQUksTUFBTSxHQUFHLElBQUksS0FBSyxFQUFjLENBQUM7Z0JBQ3JDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBRW5CLElBQUksS0FBSyxJQUFJLFNBQVMsSUFBSSxNQUFNLElBQUksU0FBUyxFQUFFO29CQUMzQyxLQUFLLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ2xDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUM7b0JBRTdDLEtBQUssQ0FBQyw4QkFBOEIsRUFBRSxDQUFDO29CQUN2QyxNQUFNLENBQUMsOEJBQThCLEVBQUUsQ0FBQztpQkFDM0M7Z0JBRUQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN0QztRQUNMLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSCwyQ0FBVyxHQUFYLFVBQVksS0FBaUIsRUFBRSxTQUFpQjtZQUM1QyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDakQsSUFBSSxLQUFLLElBQUksU0FBUyxFQUFFO2dCQUNwQixLQUFLLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2xDLEtBQUssQ0FBQyw4QkFBOEIsRUFBRSxDQUFDO2FBQzFDO1lBRUQsSUFBSSxlQUFlLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLG1CQUFtQixDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUMvRSxJQUFJLGVBQWUsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFLEVBQUUsMERBQTBEO2dCQUN6RixLQUFLLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2FBQzNEO1FBQ0wsQ0FBQztRQUVELDJDQUFXLEdBQVgsVUFBWSxNQUFhLEVBQUUsS0FBd0I7WUFDL0MsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2RCxJQUFJLFVBQVUsSUFBSSxTQUFTLEVBQUU7Z0JBQ3pCLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDekMsVUFBVSxDQUFDLDhCQUE4QixFQUFFLENBQUM7YUFDL0M7WUFFRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTNDLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNILDJDQUFXLEdBQVgsVUFBWSxLQUF3QjtZQUNoQyxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZELElBQUksVUFBVSxJQUFJLFNBQVMsRUFBRTtnQkFDekIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUVsQyxJQUFJLElBQUksU0FBb0IsQ0FBQztnQkFDN0IsSUFBSSxJQUFJLFNBQW9CLENBQUM7Z0JBRTdCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDL0MsSUFBSSxJQUFJLElBQUksU0FBUyxJQUFJLElBQUksR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUssRUFBRTt3QkFDeEQsSUFBSSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO3FCQUNwQztvQkFDRCxJQUFJLElBQUksSUFBSSxTQUFTLElBQUksSUFBSSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSyxFQUFFO3dCQUN4RCxJQUFJLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7cUJBQ3BDO2lCQUNKO2FBQ0o7WUFFRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRzNDLENBQUM7UUFFRCw4Q0FBYyxHQUFkLFVBQWUsSUFBa0I7WUFFN0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNqRCxJQUFJLFdBQVcsR0FBRyxJQUFJLEtBQUssRUFBYyxDQUFDO2dCQUMxQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLEVBQUU7b0JBQ3RCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7d0JBQzNELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFDckYsSUFBSSxJQUFJLElBQUksU0FBUyxFQUFFOzRCQUNuQixXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3lCQUMxQjtxQkFDSjtvQkFFRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO29CQUN4RixJQUFJLElBQUksSUFBSSxTQUFTLEVBQUU7d0JBQ25CLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQzFCO2lCQUNKO3FCQUNJO29CQUNELFdBQVcsR0FBRyxJQUFJLENBQUM7aUJBQ3RCO2dCQUVELElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUU1RDtRQUVMLENBQUM7UUFFRCxzREFBc0IsR0FBdEIsVUFBdUIsS0FBWTtZQUMvQixJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztZQUN2QyxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQzFCLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7WUFFMUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNqRCxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLFNBQVMsRUFBRTtvQkFDMUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUNoRSx1Q0FBdUM7aUJBQzFDO2FBQ0o7UUFDTCxDQUFDO1FBRUQsa0RBQWtCLEdBQWxCLFVBQW1CLEtBQWtCLEVBQUUsYUFBNEI7WUFDL0QsSUFBSSxJQUFJLEdBQUcsSUFBSSxLQUFLLEVBQWMsQ0FBQztZQUVuQyxJQUFJLGFBQWEsSUFBSSwrQkFBYSxDQUFDLEVBQUUsSUFBSSxhQUFhLElBQUksK0JBQWEsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3ZFLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUN2RCxJQUFJLElBQUksSUFBSSxTQUFTLEVBQUU7b0JBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ25CO2FBQ0o7WUFFRCxJQUFJLGFBQWEsSUFBSSwrQkFBYSxDQUFDLEVBQUUsSUFBSSxhQUFhLElBQUksK0JBQWEsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3ZFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDMUMsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDbkQsSUFBSSxJQUFJLElBQUksU0FBUyxJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLGdDQUFlLENBQUMsUUFBUSxFQUFFO3dCQUM1RSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUNuQjtpQkFDSjthQUNKO1lBRUQsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUlEOzs7Ozs7O1dBT0c7UUFDSyxvREFBb0IsR0FBNUIsVUFBNkIsSUFBWTtZQUNyQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2pELElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLElBQUksSUFBSSxFQUFFO29CQUMzQyxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ2pDO2FBQ0o7WUFDRCxPQUFPLFNBQVMsQ0FBQztRQUNyQixDQUFDO1FBRU8sOENBQWMsR0FBdEIsVUFBdUIsS0FBSyxFQUFFLEtBQUs7WUFDL0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUMxQyxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEtBQUssQ0FBQyxFQUFFLEVBQUU7b0JBQ2pDLE9BQU8sSUFBSSxDQUFDO2lCQUNmO2FBQ0o7WUFDRCxPQUFPLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUVLLHdEQUF3QixHQUFoQyxVQUFpQyxLQUFpQjtZQUM5QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2pELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUMvRixnRUFBZ0U7Z0JBQ2hFLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFO29CQUNaLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztpQkFDckY7YUFDSjtRQUNMLENBQUM7UUFFRCw2REFBNkIsR0FBN0IsVUFBOEIsVUFBa0IsRUFBRSxVQUF1QjtZQUNyRSxVQUFVLENBQUMsb0JBQW9CLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDaEQsQ0FBQztRQUVELG1EQUFtQixHQUFuQixVQUFvQixVQUF1QixFQUFFLFNBQWlCLEVBQUUsU0FBaUI7WUFDN0UsVUFBVSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN6RCxDQUFDO1FBRUQsMERBQTBCLEdBQTFCLFVBQTJCLFVBQXdCLEVBQUUsVUFBa0I7WUFDbkUsVUFBVSxDQUFDLDBCQUEwQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3RELENBQUM7UUFFRCx5Q0FBUyxHQUFULFVBQVUsVUFBdUIsRUFBRSxXQUFtQixFQUFFLFdBQW1CO1lBQ3ZFLFVBQVUsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ25ELENBQUM7UUFFRCxrREFBa0IsR0FBbEI7WUFDSSxLQUFpQixVQUFtQixFQUFuQixLQUFBLElBQUksQ0FBQyxjQUFjLEVBQW5CLGNBQW1CLEVBQW5CLElBQW1CLEVBQUM7Z0JBQWpDLElBQUksS0FBSyxTQUFBO2dCQUNULEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO2FBQzlCO1FBQ0wsQ0FBQztRQUdELHlDQUFTLEdBQVQ7WUFDSSxJQUFJLGdCQUFnQixHQUFHLElBQUksbUNBQWdCLEVBQUUsQ0FBQztZQUU5QyxnQkFBZ0IsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDeEQsZ0JBQWdCLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ3hELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUIsQ0FBQztRQUVELCtDQUFlLEdBQWY7WUFDSSxJQUFJLG1DQUFnQixFQUFFLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSw2QkFBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXRGLENBQUM7UUFFRCw4Q0FBYyxHQUFkO1lBQ0ksSUFBSSxtQ0FBZ0IsRUFBRSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsNkJBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVyRixDQUFDO1FBRUQseUNBQVMsR0FBVDtZQUNJLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxtQ0FBZ0IsRUFBRSxDQUFDO1lBQzlDLEtBQWtCLFVBQW1CLEVBQW5CLEtBQUEsSUFBSSxDQUFDLGNBQWMsRUFBbkIsY0FBbUIsRUFBbkIsSUFBbUIsRUFBRTtnQkFBbEMsSUFBSSxLQUFLLFNBQUE7Z0JBQ1YsS0FBSyxDQUFDLGdCQUFnQixFQUFFLENBQUM7YUFDNUI7WUFFRCxnQkFBZ0IsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDeEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixDQUFDO1FBRUQsZ0RBQWdCLEdBQWhCLFVBQWlCLElBQW1CO1lBQ2hDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDakQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDNUM7WUFDRCxJQUFJLENBQUMsZUFBZSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQztRQUN2RCxDQUFDO1FBRUQsMENBQVUsR0FBVixVQUFXLE1BQWU7WUFDdEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNqRCxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUM3QztRQUNMLENBQUM7UUFFRCwwQ0FBVSxHQUFWLFVBQVcsTUFBZTtZQUN0QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2pELElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzdDO1FBQ0wsQ0FBQztRQUVELDRDQUFZLEdBQVosVUFBYSxXQUE0QjtZQUE1Qiw0QkFBQSxFQUFBLG1CQUE0QjtZQUNyQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2pELElBQUksV0FBVyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSw2QkFBUyxDQUFDLE9BQU8sRUFBRTtvQkFDekUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztpQkFDeEM7YUFDSjtRQUNMLENBQUM7UUFFRCxpREFBaUIsR0FBakIsVUFBa0IsTUFBTSxFQUFFLElBQUk7WUFDMUIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3hCLENBQUM7UUFFTyxzREFBc0IsR0FBOUIsVUFBK0IsTUFBTSxFQUFFLDZCQUE0RDtZQUMvRixJQUFJLENBQUMsZUFBZSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sRUFBRSw2QkFBNkIsQ0FBQyxDQUFBO1FBQ3RGLENBQUM7UUFFTSxxREFBcUIsR0FBNUIsVUFBNkIsSUFBSSxFQUFFLFNBQWtCO1lBQ2pELElBQUksb0JBQW9CLEdBQUcsSUFBSSwyQ0FBb0IsRUFBRSxDQUFDO1lBQ3RELEtBQWtCLFVBQW1CLEVBQW5CLEtBQUEsSUFBSSxDQUFDLGNBQWMsRUFBbkIsY0FBbUIsRUFBbkIsSUFBbUIsRUFBRTtnQkFBbEMsSUFBSSxLQUFLLFNBQUE7Z0JBQ1YsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFFL0UsSUFBSSxjQUFjLEdBQUcsb0JBQW9CLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMxRSxvQkFBb0IsQ0FBQyxvQkFBb0IsQ0FBQyxpQkFBa0IsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUMvRixLQUFLLENBQUMscUJBQXFCLENBQUMsSUFBSSxFQUFFLGlCQUFpQixDQUFDLENBQUM7YUFDeEQ7WUFFRCxJQUFJLFVBQVUsR0FBRyxJQUFJLGlDQUFlLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUN4RixnQ0FBZ0M7WUFDaEMsSUFBSSxVQUFVLENBQUMsV0FBVyxFQUFFLElBQUksSUFBSSxFQUFFLEVBQUUsdUNBQXVDO2dCQUMzRSxJQUFJLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsZUFBZSxHQUFHLFdBQVcsQ0FBQyxDQUFDO2dCQUNoSCxJQUFJLGNBQWMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsOEJBQThCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDO2dCQUNySyxJQUFJLGlCQUFpQixJQUFJLFNBQVMsRUFBRTtvQkFDaEMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyx3QkFBd0IsQ0FBQztvQkFDbkUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLHVCQUFVLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO3dCQUN4RSxJQUFJLENBQUMsaUJBQWlCLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFLGNBQWMsQ0FBQyxDQUFDO3FCQUNsRjt5QkFDSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksdUJBQVUsQ0FBQyxVQUFVLEVBQUU7d0JBQzVDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsY0FBYyxDQUFDLENBQUM7cUJBQ2pGO3lCQUNJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSx1QkFBVSxDQUFDLFFBQVEsRUFBRTt3QkFDMUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixFQUFFLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxjQUFjLENBQUMsQ0FBQztxQkFDbkY7eUJBQ0ksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLHVCQUFVLENBQUMsU0FBUyxFQUFFO3dCQUMzQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFLGNBQWMsQ0FBQyxDQUFDO3FCQUNuRjtpQkFDSjthQUNKO1FBQ0wsQ0FBQztRQUVPLGlEQUFpQixHQUF6QixVQUEwQixNQUFtQixFQUFFLE9BQXVCLEVBQUUsY0FBYztZQUNsRixJQUFJLFVBQVUsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDckMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQzlDLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3pDLElBQUksQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLEVBQUUsR0FBRyxHQUFHLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDYixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztpQkFDbEM7Z0JBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsY0FBYyxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQztnQkFFakcsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDMUMsS0FBSyxDQUFDLEdBQUcsR0FBRyx5Q0FBeUMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDO2dCQUMvRSxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFFbEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDeEIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUM1QjtRQUNMLENBQUM7UUFFTSx3REFBd0IsR0FBL0I7WUFDSSxLQUFrQixVQUFtQixFQUFuQixLQUFBLElBQUksQ0FBQyxjQUFjLEVBQW5CLGNBQW1CLEVBQW5CLElBQW1CLEVBQUU7Z0JBQWxDLElBQUksS0FBSyxTQUFBO2dCQUNWLEtBQUssQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO2FBQ3BDO1lBQ0QsbUNBQW1DO1lBQ25DLElBQUksaUJBQWlCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxlQUFlLEdBQUcsV0FBVyxDQUFDLENBQUM7WUFDaEgsSUFBSSxpQkFBaUIsSUFBSSxTQUFTLEVBQUU7Z0JBQ2hDLElBQUksWUFBWSxHQUFHLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7Z0JBQ3JELGlCQUFpQixDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDO2dCQUNqRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsWUFBWSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUN6QyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7aUJBQzFDO2FBQ0o7UUFDTCxDQUFDO1FBRU0sZ0RBQWdCLEdBQXZCLFVBQXdCLFNBQW9CO1lBQ3hDLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztZQUNqQixJQUFJLFNBQWdDLENBQUM7WUFDckMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNqRCxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLFNBQVMsRUFBRTtvQkFDMUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBRXRDLElBQUksb0JBQW9CLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO29CQUN2RSxJQUFJLG9CQUFvQixJQUFJLENBQUMsRUFBRTt3QkFDM0Isb0JBQW9CLEdBQUcsQ0FBQyxDQUFDO3FCQUM1QjtvQkFFRCwwSEFBMEg7b0JBQzFILElBQUksb0JBQW9CLEdBQUcsUUFBUSxFQUFFO3dCQUNqQyxRQUFRLEdBQUcsb0JBQW9CLENBQUM7d0JBQ2hDLFNBQVMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztxQkFDM0Q7eUJBQ0ksSUFBSSxvQkFBb0IsSUFBSSxRQUFRLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUMsS0FBSyxHQUFHLFNBQVUsQ0FBQyxLQUFLLEVBQUU7d0JBQy9HLFNBQVMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztxQkFDM0Q7aUJBQ0o7YUFDSjtZQUVELElBQUksU0FBUyxJQUFJLFNBQVMsRUFBRTtnQkFDeEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7YUFDekM7UUFFTCxDQUFDO1FBRU0sMENBQVUsR0FBakIsVUFBa0IsU0FBb0IsRUFBRSxTQUFvQjtZQUN4RCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2pELElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksU0FBUyxFQUFFO29CQUMxQyxJQUFJLFlBQVksR0FBRyxFQUFFLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDMUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUN4RCxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO2lCQUN4QzthQUVKO1FBQ0wsQ0FBQztRQUdMLDRCQUFDO0lBQUQsQ0FBQyxBQTkyQkQsSUE4MkJDO0lBOTJCWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJVHJhY2VDaGFydCB9IGZyb20gXCIuLi9jaGFydFdpZGdldC9pbnRlcmZhY2VzL3RyYWNlQ2hhcnRJbnRlcmZhY2VcIlxyXG5pbXBvcnQgeyBZVENoYXJ0IH0gZnJvbSBcIi4uL2NoYXJ0V2lkZ2V0L1lUQ2hhcnRcIlxyXG5pbXBvcnQgeyBYWUNoYXJ0IH0gZnJvbSBcIi4uL2NoYXJ0V2lkZ2V0L1hZQ2hhcnRcIlxyXG5pbXBvcnQgeyBGRlRDaGFydCB9IGZyb20gXCIuLi9jaGFydFdpZGdldC9GRlRDaGFydFwiO1xyXG5pbXBvcnQgeyBFdmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncywgQ2hhcnRCYXNlIH0gZnJvbSBcIi4uL2NoYXJ0V2lkZ2V0L0NoYXJ0QmFzZVwiXHJcbmltcG9ydCB7IENoYXJ0Vmlld0xheW91dE1hbmFnZXIgfSBmcm9tIFwiLi9jaGFydFZpZXdMYXlvdXRNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IElDaGFydE1hbmFnZXJEYXRhTW9kZWwgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9pbnRlcmZhY2VzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDaGFydFZpZXdXaWRnZXQsIFpvb21EaXJlY3Rpb24gfSBmcm9tIFwiLi9jaGFydFZpZXdXaWRnZXRcIjtcclxuaW1wb3J0IHsgVmlld1R5cGUgfSBmcm9tIFwiLi4vY29tbW9uL3ZpZXdUeXBlUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgQ2hhcnRSYW5nZUhlbHBlciB9IGZyb20gXCIuLi9jaGFydFdpZGdldC9oZWxwZXJzL2NoYXJ0UmFuZ2VIZWxwZXJcIjtcclxuaW1wb3J0IHsgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsQ2hhbmdlZEhpbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9jaGFydE1hbmFnZXJEYXRhTW9kZWxcIjtcclxuaW1wb3J0IHsgSVVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXIgfSBmcm9tIFwiLi4vY2hhcnRXaWRnZXQvdXNlckludGVyYWN0aW9uL2ludGVyZmFjZXMvY29udHJvbGxlckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDaGFydFR5cGUsIENoYXJ0TWFuYWdlckNoYXJ0IH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvY2hhcnRNYW5hZ2VyQ2hhcnRcIlxyXG5pbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvYmFzZVNlcmllc1wiXHJcbmltcG9ydCB7IFNlcmllQWN0aW9uLCBFdmVudFNlcmllRGF0YUNoYW5nZWRBcmdzIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvZXZlbnRTZXJpZURhdGFDaGFuZ2VkQXJnc1wiXHJcbmltcG9ydCB7IFNjYWxlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvc2NhbGVcIjtcclxuaW1wb3J0IHsgQ2hhcnREcm9wSGVscGVyIH0gZnJvbSBcIi4vaGVscGVycy9jaGFydERyb3BIZWxwZXJcIjtcclxuaW1wb3J0IHsgQ2hhcnRWaWV3VG9vbFN0YXRlLCBDaGFydFZpZXdab29tRGlyZWN0aW9uU3RhdGUsIENoYXJ0Vmlld1Rvb2xTdGF0ZUVudW0gfSBmcm9tIFwiLi4vY29tbW9uL3N0YXRlcy9jaGFydFZpZXdUb29sYmFyU3RhdGVzXCI7XHJcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9zdG9yZVwiO1xyXG5pbXBvcnQgeyBJQ2hhcnRNYW5hZ2VyQ2hhcnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9pbnRlcmZhY2VzL2NoYXJ0TWFuYWdlckNoYXJ0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEF4aXNQb3NpdGlvbiwgQXhpc09yaWVudGF0aW9uIH0gZnJvbSBcIi4uLy4uL2NvcmUvaW50ZXJmYWNlcy9jb21wb25lbnRzL3VpL2NoYXJ0L2NoYXJ0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFJlY3RhbmdsZSB9IGZyb20gXCIuLi8uLi9jb3JlL3R5cGVzL1JlY3RhbmdsZVwiO1xyXG5pbXBvcnQgeyBJQ2hhcnRBeGlzIH0gZnJvbSBcIi4uLy4uL2NvcmUvaW50ZXJmYWNlcy9jb21wb25lbnRzL3VpL2NoYXJ0L0NoYXJ0QXhpc0ludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTZXJpZUNoYXJ0VHlwZUhlbHBlciB9IGZyb20gXCIuLi9jb21tb24vU2VyaWVDaGFydFR5cGVIZWxwZXJcIjtcclxuaW1wb3J0IHsgU2VyaWVzVHlwZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL3Nlcmllc1R5cGVcIjtcclxuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSBcIi4uLy4uL2NvcmUvaW50ZXJmYWNlcy9wb2ludEludGVyZmFjZVwiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBDaGFydFZpZXdDaGFydE1hbmFnZXIge1xyXG4gICAgY2hhcnRWaWV3V2lkZ2V0OiBDaGFydFZpZXdXaWRnZXQ7XHJcbiAgICB0cmFjZUNoYXJ0TGlzdDogQXJyYXk8SVRyYWNlQ2hhcnQ+ID0gW107XHJcbiAgICBzZXJpZXM6IEJhc2VTZXJpZXNbXSA9IG5ldyBBcnJheTxCYXNlU2VyaWVzPigpO1xyXG5cclxuICAgIGxheW91dE1hbmFnZXI6IENoYXJ0Vmlld0xheW91dE1hbmFnZXI7XHJcbiAgICB1c2VySW50ZXJhY3Rpb25Db250cm9sbGVyOiBJVXNlckludGVyYWN0aW9uQ29udHJvbGxlcjtcclxuICAgIF9jaGFydE1hbmFnZXJEYXRhTW9kZWw6IElDaGFydE1hbmFnZXJEYXRhTW9kZWw7XHJcblxyXG4gICAgcHJpdmF0ZSBfc3RhdGVzOiBTdG9yZTtcclxuXHJcbiAgICBwcml2YXRlIF9vblNlcmllRGF0YUNoYW5nZWQgPSAoc2VuZGVyLCBldmVudEFyZ3MpID0+IHRoaXMub25TZXJpZURhdGFDaGFuZ2VkKHNlbmRlciwgZXZlbnRBcmdzKTtcclxuICAgIHByaXZhdGUgX3VzZXJDaGFydEludGVyYWN0aW9uSGFuZGxlciA9IChzZW5kZXIsIGFyZ3MpID0+IHRoaXMub25Vc2VyQ2hhcnRJbnRlcmFjdGlvbihzZW5kZXIsIGFyZ3MpO1xyXG4gICAgcHJpdmF0ZSBfb25SZWRyYXdBbGxDaGFydHMgPSAoc2VuZGVyLGFyZ3MpID0+IHRoaXMub25SZWRyYXdBbGxDaGFydHMoc2VuZGVyLGFyZ3MpO1xyXG5cclxuICAgIHByaXZhdGUgYWN0aXZlUGFubmluZ0F4ZXM7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY2hhcnRWaWV3V2lkZ2V0OiBDaGFydFZpZXdXaWRnZXQsIHVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXI6IElVc2VySW50ZXJhY3Rpb25Db250cm9sbGVyLCBsYXlvdXRNYW5hZ2VyOiBDaGFydFZpZXdMYXlvdXRNYW5hZ2VyLCBjaGFydE1hbmFnZXJEYXRhTW9kZWw6IElDaGFydE1hbmFnZXJEYXRhTW9kZWwpIHtcclxuICAgICAgICB0aGlzLmNoYXJ0Vmlld1dpZGdldCA9IGNoYXJ0Vmlld1dpZGdldDtcclxuICAgICAgICB0aGlzLl9zdGF0ZXMgPSBjaGFydFZpZXdXaWRnZXQuc3RhdGVzO1xyXG4gICAgICAgIHRoaXMudXNlckludGVyYWN0aW9uQ29udHJvbGxlciA9IHVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXI7XHJcbiAgICAgICAgdGhpcy5sYXlvdXRNYW5hZ2VyID0gbGF5b3V0TWFuYWdlcjtcclxuICAgICAgICB0aGlzLl9jaGFydE1hbmFnZXJEYXRhTW9kZWwgPSBjaGFydE1hbmFnZXJEYXRhTW9kZWw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluaXRDaGFydFZpZXdXaXRoRGF0YU1vZGVsKCl7XHJcbiAgICAgICAgLy8gSWYgdGhlcmUgYXJlIGFscmVhZHkgY2hhcnRzIGluIHRoZSBkYXRhbW9kZWwgPT4gc2hvdyBpbiBjaGFydCB2aWV3ID0+IG5lZWRlZCBmb3IgcGVyc2lzdGluZ1xyXG4gICAgICAgIGlmKHRoaXMuX2NoYXJ0TWFuYWdlckRhdGFNb2RlbC5kYXRhICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2NoYXJ0TWFuYWdlckRhdGFNb2RlbC5kYXRhLmZvckVhY2goY2hhcnQ9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBBZGQgY2hhcnRzLCBhZGQgc2NhbGVzLCBhZGQgc2VyaWVzXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFRyYWNlQ2hhcnQoY2hhcnQsLTEsIChjaGFydCBhcyBDaGFydE1hbmFnZXJDaGFydCkuY2hhcnRUeXBlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRpc3Bvc2UoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRyYWNlQ2hhcnRMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMudHJhY2VDaGFydExpc3RbaV0uZGlzcG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhZGRUcmFjZUNoYXJ0KGNoYXJ0OiBDaGFydE1hbmFnZXJDaGFydCwgaW5kZXg6IG51bWJlciA9IC0xLCB0eXBlOiBudW1iZXIpOiBJVHJhY2VDaGFydHx1bmRlZmluZWQge1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vc3RvcmUgc2VyaWVzIGluIHZhcmlhYmxlIGFuZCByZW1vdmUgdGhlbSBmcm9tIGNoYXJ0IGZvciBpbml0aWFsaXNhdGlvblxyXG4gICAgICAgIGxldCBzZXJpZXM6IEJhc2VTZXJpZXNbXSA9IGNoYXJ0LmNoaWxkc1swXS5jaGlsZHM7XHJcbiAgICAgICAgY2hhcnQuY2hpbGRzWzBdLmNoaWxkcyA9IFtdO1xyXG4gICAgICAgXHJcbiAgICAgICAgbGV0IG5ld1RyYWNlQ2hhcnQ6IElUcmFjZUNoYXJ0fHVuZGVmaW5lZCA9IHRoaXMuYWRkQ2hhcnRUb0NvbnRhaW5lcihjaGFydC5uYW1lLCBpbmRleCwgdHlwZSwgY2hhcnQuY2hpbGRzWzBdKTtcclxuXHJcbiAgICAgICAgLy9hZGQgc2VyaWVzIHRvIHNjYWxlIGFnYWluXHJcbiAgICAgICAgY2hhcnQuY2hpbGRzWzBdLmNoaWxkcyA9IHNlcmllcztcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnJlZHJhd0NoYXJ0cygpO1xyXG5cclxuICAgICAgICBsZXQgc2NhbGVzID0gY2hhcnQuY2hpbGRzO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDE7IGkgPCBzY2FsZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICB0aGlzLmFkZFlTY2FsZShzY2FsZXNbaV0sY2hhcnQubmFtZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2NhbGVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYoc2NhbGVzW2ldLmNoaWxkcy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkU2VyaWVzVG9DaGFydChzY2FsZXNbaV0uY2hpbGRzLCBjaGFydCwgY2hhcnQuY2hpbGRzW2ldLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnVwZGF0ZVpvb21TZXR0aW5ncygpO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZVhBeGlzV2lkdGgoY2hhcnQuY2hhcnRUeXBlKTtcclxuICAgICAgICByZXR1cm4gbmV3VHJhY2VDaGFydDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBhZGRDaGFydFRvQ29udGFpbmVyKG5hbWU6IHN0cmluZywgaW5kZXg6IG51bWJlciA9IC0xLCB0eXBlOiBDaGFydFR5cGUsIHNjYWxlOiBTY2FsZSk6IElUcmFjZUNoYXJ0fHVuZGVmaW5lZCB7XHJcbiAgICAgICAgbGV0IHRyYWNlQ2hhcnQ6IElUcmFjZUNoYXJ0O1xyXG5cclxuICAgICAgICBpZiAodGhpcy5jaGFydFZpZXdXaWRnZXQudmlldykge1xyXG4gICAgICAgICAgICAvLyBUT0RPOiBIYW5kbGUgd2l0aCBzZXR0aW5ncyBvYmplY3QgZmFjdG9yeVxyXG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gQ2hhcnRUeXBlLllUQ2hhcnQpIHtcclxuICAgICAgICAgICAgICAgIHRyYWNlQ2hhcnQgPSBuZXcgWVRDaGFydCh0aGlzLmNoYXJ0Vmlld1dpZGdldC52aWV3LCBuYW1lLCB0eXBlLCBzY2FsZSlcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSBDaGFydFR5cGUuWFlDaGFydCkge1xyXG4gICAgICAgICAgICAgICAgdHJhY2VDaGFydCA9IG5ldyBYWUNoYXJ0KHRoaXMuY2hhcnRWaWV3V2lkZ2V0LnZpZXcsIG5hbWUsIHR5cGUsIHNjYWxlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRyYWNlQ2hhcnQgPSBuZXcgRkZUQ2hhcnQodGhpcy5jaGFydFZpZXdXaWRnZXQudmlldywgbmFtZSwgdHlwZSwgc2NhbGUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgdHJhY2VDaGFydC5ldmVudFVzZXJDaGFydEludGVyYWN0aW9uLmF0dGFjaCh0aGlzLl91c2VyQ2hhcnRJbnRlcmFjdGlvbkhhbmRsZXIpO1xyXG4gICAgICAgICAgICB0cmFjZUNoYXJ0LmV2ZW50UmVkcmF3QWxsQ2hhcnRzLmF0dGFjaCh0aGlzLl9vblJlZHJhd0FsbENoYXJ0cyk7XHJcbiAgICAgICAgICAgIHRoaXMubGF5b3V0TWFuYWdlci5jaGFydFNwbGl0dGVyLmFkZFdpZGdldCh0cmFjZUNoYXJ0LCBuYW1lLCBWaWV3VHlwZS5Vc2VyLCAzMDApO1xyXG5cclxuICAgICAgICAgICAgaWYgKGluZGV4ICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBzZXQgaW5kZXggYXQgYWRkV2lkZ2V0IE1ldGhvZCB0byBhdm9pZCBtb3ZpbmcgdGhlIGNoYXJ0IGFmdGVyd2FyZHNcclxuICAgICAgICAgICAgICAgIHRoaXMubGF5b3V0TWFuYWdlci5jaGFydFNwbGl0dGVyLm1vdmVXaWRnZXQodHJhY2VDaGFydCwgaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50cmFjZUNoYXJ0TGlzdC5zcGxpY2UoaW5kZXgsIDAsIHRyYWNlQ2hhcnQpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyYWNlQ2hhcnRMaXN0LnB1c2godHJhY2VDaGFydCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRyYWNlQ2hhcnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICBcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogTWV0aG9kIHRvIHNldCB0aGUgWm9vbVNldHRpbmcoRGlyZWN0aW9uIGFuZCBCb3hab29tKSBmb3IgYWxsIENoYXJ0cyBhY2NvcmRpbmcgdG8gdGhlIGNvcnJlc3BvbmRpbmcgc3RhdGVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdDaGFydE1hbmFnZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVab29tU2V0dGluZ3MoKSB7XHJcbiAgICAgICAgbGV0IHRvb2xzdGF0ZTogQ2hhcnRWaWV3VG9vbFN0YXRlID0gdGhpcy5fc3RhdGVzLnJlYWQoQ2hhcnRWaWV3VG9vbFN0YXRlLCBcIkNoYXJ0Vmlld1Rvb2xTdGF0ZVwiKTtcclxuICAgICAgICBsZXQgem9vbURpcmVjdGlvblN0YXRlOiBDaGFydFZpZXdab29tRGlyZWN0aW9uU3RhdGUgPSB0aGlzLl9zdGF0ZXMucmVhZChDaGFydFZpZXdab29tRGlyZWN0aW9uU3RhdGUsIFwiQ2hhcnRWaWV3Wm9vbURpcmVjdGlvblN0YXRlXCIpO1xyXG5cclxuICAgICAgICBpZiAodG9vbHN0YXRlLnNlbGVjdGVkVG9vbCA9PSBDaGFydFZpZXdUb29sU3RhdGVFbnVtLkJPWFpPT00pIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRCb3hab29tKHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFBhbm5pbmcoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0b29sc3RhdGUuc2VsZWN0ZWRUb29sID09IENoYXJ0Vmlld1Rvb2xTdGF0ZUVudW0uUEFOTklORykge1xyXG4gICAgICAgICAgICB0aGlzLnNldEJveFpvb20oZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFBhbm5pbmcoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRCb3hab29tKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRQYW5uaW5nKGZhbHNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2V0Q2hhcnRab29tQXhlcyh6b29tRGlyZWN0aW9uU3RhdGUuem9vbURpcmVjdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlVHJhY2VDaGFydChjaGFydDogSVRyYWNlQ2hhcnQpIHtcclxuICAgICAgICBjaGFydC5ldmVudFVzZXJDaGFydEludGVyYWN0aW9uLmRldGFjaCh0aGlzLl91c2VyQ2hhcnRJbnRlcmFjdGlvbkhhbmRsZXIpO1xyXG4gICAgICAgIGNoYXJ0LmV2ZW50UmVkcmF3QWxsQ2hhcnRzLmRldGFjaCh0aGlzLl9vblJlZHJhd0FsbENoYXJ0cyk7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVDaGFydEZyb21DaGFydExpc3QoY2hhcnQpO1xyXG4gICAgICAgIGNoYXJ0LmRpc3Bvc2UoKTtcclxuICAgICAgICB0aGlzLmxheW91dE1hbmFnZXIuY2hhcnRTcGxpdHRlci5yZW1vdmVXaWRnZXQoY2hhcnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVtb3ZlQ2hhcnRGcm9tQ2hhcnRMaXN0KGNoYXJ0OiBJVHJhY2VDaGFydCkge1xyXG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuZ2V0Q2hhcnRJbmRleChjaGFydCk7XHJcblxyXG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMudHJhY2VDaGFydExpc3Quc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZVRyYWNlQ2hhcnQoY2hhcnQ6IENoYXJ0TWFuYWdlckNoYXJ0LCB0YXJnZXRDaGFydDogQ2hhcnRNYW5hZ2VyQ2hhcnQsIGFyZ3MpIHtcclxuXHJcbiAgICAgICAgbGV0IHRyYWNlQ2hhcnQgPSB0aGlzLmdldENoYXJ0T2JqZWN0QnlOYW1lKGNoYXJ0Lm5hbWUpO1xyXG4gICAgICAgIGxldCB0YXJnZXRUcmFjZUNoYXJ0ID0gdGhpcy5nZXRDaGFydE9iamVjdEJ5TmFtZSh0YXJnZXRDaGFydC5uYW1lKTtcclxuXHJcbiAgICAgICAgaWYgKHRyYWNlQ2hhcnQgIT0gdW5kZWZpbmVkICYmIHRhcmdldFRyYWNlQ2hhcnQgIT0gdW5kZWZpbmVkKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgY2hhcnRJbmRleCA9IHRoaXMuZ2V0Q2hhcnRJbmRleCh0cmFjZUNoYXJ0KTtcclxuICAgICAgICAgICAgbGV0IHRhcmdldEluZGV4ID0gdGhpcy5nZXRDaGFydEluZGV4KHRhcmdldFRyYWNlQ2hhcnQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGFyZ3MuaW5zZXJ0VHlwZSA9PSBcImluc2VydEJlbG93XCIpIHtcclxuICAgICAgICAgICAgICAgIHRhcmdldEluZGV4ICs9IDE7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjaGFydEluZGV4ID4gLTEgJiYgdGFyZ2V0SW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50cmFjZUNoYXJ0TGlzdC5zcGxpY2UoY2hhcnRJbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hhcnRJbmRleCA8IHRhcmdldEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFjZUNoYXJ0TGlzdC5zcGxpY2UodGFyZ2V0SW5kZXggLSAxLCAwLCB0cmFjZUNoYXJ0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJhY2VDaGFydExpc3Quc3BsaWNlKHRhcmdldEluZGV4LCAwLCB0cmFjZUNoYXJ0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMubGF5b3V0TWFuYWdlci5jaGFydFNwbGl0dGVyLm1vdmVXaWRnZXQodHJhY2VDaGFydCwgdGFyZ2V0SW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL2FkZCBhbGwgYWRkaXRpb25hbCBheGVzIHRvIGNoYXJ0XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgdHJhY2VDaGFydC5zY2FsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRyYWNlQ2hhcnQuYWRkWVNjYWxlKHRyYWNlQ2hhcnQuc2NhbGVzW2ldLCBBeGlzUG9zaXRpb24ucmlnaHQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMucmVkcmF3Q2hhcnRzKCk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlWEF4aXNXaWR0aChjaGFydC5jaGFydFR5cGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlbW92ZUFsbENoYXJ0cygpIHtcclxuICAgICAgICB3aGlsZSAodGhpcy50cmFjZUNoYXJ0TGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlVHJhY2VDaGFydCh0aGlzLnRyYWNlQ2hhcnRMaXN0WzBdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRDaGFydEluZGV4KGNoYXJ0OiBJVHJhY2VDaGFydCk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gLTFcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudHJhY2VDaGFydExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudHJhY2VDaGFydExpc3RbaV0gPT0gY2hhcnQpIHtcclxuICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VHJhY2VDaGFydEJ5Q29udGFpbmVySWQoY29udGFpbmVySUQ6IHN0cmluZyk6IElUcmFjZUNoYXJ0IHwgdW5kZWZpbmVkIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudHJhY2VDaGFydExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudHJhY2VDaGFydExpc3RbaV0ucGFyZW50Q29udGVudElkID09IGNvbnRhaW5lcklELnN1YnN0cigwLCB0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLnBhcmVudENvbnRlbnRJZC5sZW5ndGgpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50cmFjZUNoYXJ0TGlzdFtpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRUcmFjZUNoYXJ0QnlOYW1lKGNoYXJ0TmFtZTogc3RyaW5nKTogSVRyYWNlQ2hhcnQgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50cmFjZUNoYXJ0TGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50cmFjZUNoYXJ0TGlzdFtpXS53aWRnZXROYW1lID09IGNoYXJ0TmFtZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudHJhY2VDaGFydExpc3RbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgb25DaGFydE1hbmFnZXJNb2RlbENoYW5nZWQoZGF0YU1vZGVsOiBJQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsLCBhcmdzKSB7XHJcbiAgICAgICAgdGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsID0gZGF0YU1vZGVsO1xyXG4gICAgICAgIHN3aXRjaCAoYXJncy5oaW50KSB7XHJcbiAgICAgICAgICAgIGNhc2UgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsQ2hhbmdlZEhpbnQuYWRkU2VyaWU6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkU2VyaWVzVG9DaGFydChhcmdzLmRhdGEuc2VyaWVzLCBhcmdzLmRhdGEuY2hhcnQsIGFyZ3MuZGF0YS5heGlzKVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBDaGFydE1hbmFnZXJEYXRhTW9kZWxDaGFuZ2VkSGludC5tb3ZlU2VyaWU6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubW92ZVNlcmllKGFyZ3MuZGF0YS5zZXJpZSwgYXJncy5kYXRhLmNoYXJ0Lm5hbWUsIGFyZ3MuZGF0YS50YXJnZXRDaGFydC5uYW1lLCBhcmdzLmRhdGEudGFyZ2V0QXhpcyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIENoYXJ0TWFuYWdlckRhdGFNb2RlbENoYW5nZWRIaW50LnJlbW92ZVNlcmllOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVNlcmllKGFyZ3MuZGF0YS5zZXJpZSwgYXJncy5kYXRhLmNoYXJ0Lm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBDaGFydE1hbmFnZXJEYXRhTW9kZWxDaGFuZ2VkSGludC5yZW1vdmVDaGFydDoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVDaGFydChhcmdzLmRhdGEuY2hhcnQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBDaGFydE1hbmFnZXJEYXRhTW9kZWxDaGFuZ2VkSGludC5hZGRDaGFydDoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRUcmFjZUNoYXJ0KGFyZ3MuZGF0YS5jaGFydCwgYXJncy5kYXRhLmluZGV4LCBhcmdzLmRhdGEudHlwZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIENoYXJ0TWFuYWdlckRhdGFNb2RlbENoYW5nZWRIaW50Lm1vdmVDaGFydDoge1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMubW92ZVRyYWNlQ2hhcnQoYXJncy5kYXRhLmNoYXJ0LCBhcmdzLmRhdGEudGFyZ2V0LCBhcmdzLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBDaGFydE1hbmFnZXJEYXRhTW9kZWxDaGFuZ2VkSGludC5hZGRZU2NhbGU6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkWVNjYWxlKGFyZ3MuZGF0YS55QXhpcywgYXJncy5kYXRhLmNoYXJ0Lm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBDaGFydE1hbmFnZXJEYXRhTW9kZWxDaGFuZ2VkSGludC5yZW1vdmVZU2NhbGU6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlWUF4aXMoYXJncy5kYXRhLnlBeGlzLCBhcmdzLmRhdGEuY2hhcnQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBDaGFydE1hbmFnZXJEYXRhTW9kZWxDaGFuZ2VkSGludC51cGRhdGVTY2FsZVJhbmdlOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN5bmNocm9uaXplU2NhbGVYUmFuZ2UoYXJncy5kYXRhLnNjYWxlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBhZGRTZXJpZXNUb0NoYXJ0KHNlcmllczogQXJyYXk8QmFzZVNlcmllcz4sIGNoYXJ0OiBJQ2hhcnRNYW5hZ2VyQ2hhcnQsIHNjYWxlOiBTY2FsZSwga2VlcFNjYWxlczogYm9vbGVhbiA9IGZhbHNlKSB7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2VyaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHNlcmllc1tpXS5ldmVudERhdGFDaGFuZ2VkLmF0dGFjaCh0aGlzLl9vblNlcmllRGF0YUNoYW5nZWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY2hhcnROYW1lID0gY2hhcnQubmFtZTtcclxuICAgICAgICAvL2xldCB5dENoYXJ0czogQXJyYXk8SVRyYWNlQ2hhcnQ+ID0gdGhpcy5nZXRZVENoYXJ0cygpO1xyXG4gICAgICAgIC8vbGV0IGZmdENoYXJ0czogQXJyYXk8SVRyYWNlQ2hhcnQ+ID0gdGhpcy5nZXRGRlRDaGFydHMoKTtcclxuXHJcbiAgICAgICAgbGV0IHJlc2V0WFJhbmdlID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHJlc2V0WVJhbmdlID0gZmFsc2U7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoIWtlZXBTY2FsZXMpe1xyXG4gICAgICAgICAgICByZXNldFhSYW5nZT0gdGhpcy5pc0ZpcnN0U2VyaWVzT2ZUeXBlSW5DaGFydHMoc2VyaWVzWzBdKVxyXG4gICAgICAgICAgICByZXNldFlSYW5nZSA9IHRoaXMuaXNGaXJzdFNlcmllc09uU2NhbGUoc2VyaWVzWzBdLCBzY2FsZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmFkZFNlcmllcyhzZXJpZXMsIGNoYXJ0TmFtZSwgc2NhbGUsIHJlc2V0WVJhbmdlKTtcclxuXHJcbiAgICAgICAgaWYgKHJlc2V0WFJhbmdlKSB7XHJcbiAgICAgICAgICAgIGlmIChzZXJpZXNbMF0udHlwZSA9PSBTZXJpZXNUeXBlLnRpbWVTZXJpZXMpIHtcclxuICAgICAgICAgICAgICAgIG5ldyBDaGFydFJhbmdlSGVscGVyKCkucmVzZXRDaGFydFJhbmdlc1godGhpcy50cmFjZUNoYXJ0TGlzdCwgQ2hhcnRUeXBlLllUQ2hhcnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHNlcmllc1swXS50eXBlID09IFNlcmllc1R5cGUuZmZ0U2VyaWVzKSB7XHJcbiAgICAgICAgICAgICAgICBuZXcgQ2hhcnRSYW5nZUhlbHBlcigpLnJlc2V0Q2hhcnRSYW5nZXNYKHRoaXMudHJhY2VDaGFydExpc3QsIENoYXJ0VHlwZS5GRlRDaGFydCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5yZWRyYXdDaGFydHModHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpDaGVja3MgaWYgYSBnaXZlbiBTZXJpZXMgaXMgdGhlIGZpcnN0IFNlcmllcyBvbiBhIHBhcnRpY3VsYXIgc2NhbGVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxCYXNlU2VyaWVzPn0gc2VyaWVzXHJcbiAgICAgKiBAcGFyYW0ge1NjYWxlfSBzY2FsZVxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3Q2hhcnRNYW5hZ2VyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaXNGaXJzdFNlcmllc09uU2NhbGUoc2VyaWVzOiBCYXNlU2VyaWVzLCBzY2FsZTogU2NhbGUpOiBib29sZWFuIHtcclxuICAgICAgICAvL29ubHkgcmVzZXQgdGhlIGNoYXJ0cmFuZ2Ugb24gdGhlIHkgYXhpcyBpZiB0aGVzZSBhcmUgdGhlIGZpcnN0IHNlcmllcyBpbiB0aGUgc2NhbGVcclxuICAgICAgICBpZiAoc2NhbGUuY2hpbGRzLmxlbmd0aCA8IDEgfHwgc2VyaWVzICE9IHNjYWxlLmNoaWxkc1swXSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpDaGVja3MgaWYgYSBnaXZlbiBTZXJpZXMgaXMgdGhlIGZpcnN0IG9mIGl0cyB0eXBlIGluIGFsbCBjaGFydHNcclxuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVzXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld0NoYXJ0TWFuYWdlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGlzRmlyc3RTZXJpZXNPZlR5cGVJbkNoYXJ0cyhzZXJpZXM6IEJhc2VTZXJpZXMpIHtcclxuICAgICAgICBsZXQgY2hhcnRzID0gdGhpcy5nZXRDaGFydHNGb3JTZXJpZShzZXJpZXMpO1xyXG4gICAgICAgIGxldCBpc0ZpcnN0U2VyaWUgPSBmYWxzZTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoYXJ0cy5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgaWYgKGNoYXJ0c1tpXS5zZXJpZXMubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgIGlzRmlyc3RTZXJpZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoY2hhcnRzW2ldLnNlcmllcy5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoYXJ0c1tpXS5zZXJpZXNbMF0uc2VyaWUgIT0gc2VyaWVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaXNGaXJzdFNlcmllO1xyXG5cclxuXHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGdldENoYXJ0c0ZvclNlcmllKHNlcmllczogQmFzZVNlcmllcyk6IElUcmFjZUNoYXJ0W10ge1xyXG4gICAgICAgIGxldCBjaGFydHMgPSBBcnJheTxJVHJhY2VDaGFydD4oKTtcclxuICAgICAgICBpZiAoc2VyaWVzLnR5cGUgPT0gU2VyaWVzVHlwZS5mZnRTZXJpZXMpIHtcclxuXHJcbiAgICAgICAgICAgIGNoYXJ0cyA9IG5ldyBDaGFydFJhbmdlSGVscGVyKCkuZ2V0RkZUQ2hhcnRzKHRoaXMudHJhY2VDaGFydExpc3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChzZXJpZXMudHlwZSA9PSBTZXJpZXNUeXBlLnRpbWVTZXJpZXMpIHtcclxuICAgICAgICAgICAgY2hhcnRzID0gbmV3IENoYXJ0UmFuZ2VIZWxwZXIoKS5nZXRZVENoYXJ0cyh0aGlzLnRyYWNlQ2hhcnRMaXN0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNoYXJ0cztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uU2VyaWVEYXRhQ2hhbmdlZChzZW5kZXIsIGV2ZW50QXJnczogRXZlbnRTZXJpZURhdGFDaGFuZ2VkQXJncykge1xyXG4gICAgICAgIGlmIChldmVudEFyZ3MuYWN0aW9uID09IFNlcmllQWN0aW9uLmRhdGFQb2ludHNDaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU2VyaWVEYXRhKHNlbmRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGV2ZW50QXJncy5hY3Rpb24gPT0gU2VyaWVBY3Rpb24uY29sb3JDaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU2VyaWVDb2xvcihzZW5kZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICBVcGRhdGVzIHRoZSBzZXJpZSBkYXRhcG9pbnRzIGluIGFsbCBjaGFydHMgd2hlcmUgdGhlIHNlcmllIGlzIGRpc3BsYXllZFxyXG4gICAgICogIElmIGRhdGFwb2ludHMgbm90IHZhbGlkLCB0aGUgc2VyaWUgd2lsbCBiZSByZW1vdmVkIGZyb20gdGhlIGNoYXJ0cyBvdGhlcndpc2UgYWRkZWQgaWYgbm90IGFscmVhZHkgaW4gdGhlIGNoYXJ0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3Q2hhcnRNYW5hZ2VyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlU2VyaWVEYXRhKHNlcmllczogQmFzZVNlcmllcykge1xyXG4gICAgICAgIGlmIChzZXJpZXMucmF3UG9pbnRzVmFsaWQgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgLy8gTm8gdmFsaWQgc2VyaWUgZGF0YSA9PiByZW1vdmUgZnJvbSBhbGwgY2hhcnRzXHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlU2VyaWVGcm9tQWxsQ2hhcnRzKHNlcmllcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBhZGQgc2VyaWUgdG8gY2hhcnQgaWYgbm90IGFscmVhZHkgaW4gaXQgb3RoZXJ3aXNlIHVwZGF0ZSBjaGFydFxyXG4gICAgICAgICAgICBpZiAodGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNoYXJ0cyA9IHRoaXMuX2NoYXJ0TWFuYWdlckRhdGFNb2RlbC5nZXRDaGFydHNVc2luZ1NlcmllKFtzZXJpZXNdKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2VyaWVJbkFsbENoYXJ0cyhjaGFydHMsIHNlcmllcylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZVNlcmllSW5BbGxDaGFydHMoY2hhcnRzOiBJQ2hhcnRNYW5hZ2VyQ2hhcnRbXSwgc2VyaWVzOiBCYXNlU2VyaWVzKSB7XHJcbiAgICAgICAgbGV0IHNlcmllQ2hhcnRUeXBlID0gbmV3IFNlcmllQ2hhcnRUeXBlSGVscGVyKCkuZ2V0U2VyaWVDaGFydFR5cGUoc2VyaWVzLnR5cGUpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoYXJ0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY2hhcnQgPSB0aGlzLmdldENoYXJ0T2JqZWN0QnlOYW1lKGNoYXJ0c1tpXS5uYW1lKTtcclxuICAgICAgICAgICAgaWYgKGNoYXJ0ICE9IHVuZGVmaW5lZCAmJiBzZXJpZUNoYXJ0VHlwZSA9PSBjaGFydC50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNTZXJpZUluQ2hhcnQoY2hhcnQsIHNlcmllcykpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBhZGQgc2VyaWVzIFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzY2FsZSA9IGNoYXJ0c1tpXS5nZXRZQXhpc0ZvclNlcmllKHNlcmllcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNjYWxlICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXNGaXJzdFNlcmllc0luQ2hhcnQgPSB0aGlzLmlzRmlyc3RTZXJpZXNPZlR5cGVJbkNoYXJ0cyhzZXJpZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFNlcmllcyhbc2VyaWVzXSwgY2hhcnRzW2ldLm5hbWUsIHNjYWxlLCB0aGlzLmlzRmlyc3RTZXJpZXNPblNjYWxlKHNlcmllcywgc2NhbGUpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0ZpcnN0U2VyaWVzSW5DaGFydCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlcmllcy50eXBlID09IFNlcmllc1R5cGUudGltZVNlcmllcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVzZXRYUmFuZ2VzWVQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHNlcmllcy50eXBlID09IFNlcmllc1R5cGUuZmZ0U2VyaWVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNldFhSYW5nZXNGRlQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVkcmF3Q2hhcnRzKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiU2NhbGUgbm90IGZvdW5kIGZvciBzZXJpZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjaGFydC5zZXRBdmFpbGFibGVTZXJpZXNBc0RhdGFTb3VyY2UoKTtcclxuICAgICAgICAgICAgICAgIGNoYXJ0LnJlZHJhd0NoYXJ0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBjb2xvciBvZiB0aGUgc2VyaWUgaW4gYWxsIGNoYXJ0cyB3aGVyZSB0aGUgc2VyaWUgaXMgZGlzcGxheWVkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdDaGFydE1hbmFnZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVTZXJpZUNvbG9yKHNlcmllOiBCYXNlU2VyaWVzKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NoYXJ0TWFuYWdlckRhdGFNb2RlbCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgbGV0IHNlcmllcyA9IG5ldyBBcnJheTxCYXNlU2VyaWVzPigpO1xyXG4gICAgICAgICAgICBzZXJpZXMucHVzaChzZXJpZSk7XHJcbiAgICAgICAgICAgIGxldCBjaGFydHMgPSB0aGlzLl9jaGFydE1hbmFnZXJEYXRhTW9kZWwuZ2V0Q2hhcnRzVXNpbmdTZXJpZShzZXJpZXMpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoYXJ0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNoYXJ0ID0gdGhpcy5nZXRDaGFydE9iamVjdEJ5TmFtZShjaGFydHNbaV0ubmFtZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hhcnQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVXBkYXRlIHNlcmllcyBjb2xvciBpbiB0aGUgY2hhcnRcclxuICAgICAgICAgICAgICAgICAgICBjaGFydC5zZXRBdmFpbGFibGVTZXJpZXNBc0RhdGFTb3VyY2UoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGFkZCBzZXJpZSB0byBjaGFydFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8QmFzZVNlcmllcz59IHNlcmllc1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNoYXJ0TmFtZVxyXG4gICAgICogQHBhcmFtIHtTY2FsZX0gc2NhbGVcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gdXBkYXRlUmFuZ2VZXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3Q2hhcnRNYW5hZ2VyXHJcbiAgICAgKi9cclxuICAgIGFkZFNlcmllcyhzZXJpZXM6IEFycmF5PEJhc2VTZXJpZXM+LCBjaGFydE5hbWU6IHN0cmluZywgc2NhbGU6IFNjYWxlLCB1cGRhdGVSYW5nZVk6IGJvb2xlYW4pIHtcclxuICAgICAgICBsZXQgY2hhcnQgPSB0aGlzLmdldENoYXJ0T2JqZWN0QnlOYW1lKGNoYXJ0TmFtZSk7XHJcbiAgICAgICAgaWYgKGNoYXJ0ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBsZXQgYXhpc01pbjogbnVtYmVyIHwgdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBsZXQgYXhpc01heDogbnVtYmVyIHwgdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICAgICAgbGV0IGF4aXNSYW5nZSA9IChjaGFydCBhcyBDaGFydEJhc2UpLmNoYXJ0LmdldEF4aXMoc2NhbGUuaWQpIS5nZXRBeGlzUmFuZ2UoKTtcclxuICAgICAgICAgICAgaWYgKGF4aXNSYW5nZSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGF4aXNNaW4gPSBheGlzUmFuZ2UubWluO1xyXG4gICAgICAgICAgICAgICAgYXhpc01heCA9IGF4aXNSYW5nZS5tYXhcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY2hhcnQuYWRkU2VyaWVzVG9DaGFydChzZXJpZXMsIHNjYWxlKTtcclxuICAgICAgICAgICAgY2hhcnQuc2V0QXZhaWxhYmxlU2VyaWVzQXNEYXRhU291cmNlKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoYXhpc01pbiAhPSB1bmRlZmluZWQgJiYgYXhpc01heCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGNoYXJ0LnNldFNjYWxlUmFuZ2Uoc2NhbGUsIHNjYWxlLm1pblhWYWx1ZSwgc2NhbGUubWF4WFZhbHVlLCBheGlzTWluLCBheGlzTWF4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodXBkYXRlUmFuZ2VZKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYXhpc01pblZhbHVlID0gY2hhcnQuZ2V0U2VyaWVzTWluWUZvclNjYWxlKHNjYWxlKTtcclxuICAgICAgICAgICAgICAgIGxldCBheGlzTWF4VmFsdWUgPSBjaGFydC5nZXRTZXJpZXNNYXhZRm9yU2NhbGUoc2NhbGUpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChheGlzTWluVmFsdWUgIT0gdW5kZWZpbmVkICYmIGF4aXNNYXhWYWx1ZSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjaGFydC51cGRhdGVSYW5nZVkoc2NhbGUsIGF4aXNNaW5WYWx1ZSwgYXhpc01heFZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjaGFydC5yZWRyYXdDaGFydCgpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGFkZFlTY2FsZSh5U2NhbGUsIGNoYXJ0TmFtZSkge1xyXG4gICAgICAgIGxldCBjaGFydCA9IHRoaXMuZ2V0Q2hhcnRPYmplY3RCeU5hbWUoY2hhcnROYW1lKTtcclxuICAgICAgICBjaGFydCEuYWRkWVNjYWxlKHlTY2FsZSwgQXhpc1Bvc2l0aW9uLnJpZ2h0KTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVhBeGlzV2lkdGgoY2hhcnQhLnR5cGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbW92ZSBvbmUgc2VyaWUgZnJvbSBvbmUgY2hhcnQgdG8gYW5vdGhlclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjaGFydE5hbWVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0YXJnZXRDaGFydE5hbWVcclxuICAgICAqIEBwYXJhbSB7U2NhbGV9IHRhcmdldFNjYWxlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3Q2hhcnRNYW5hZ2VyXHJcbiAgICAgKi9cclxuICAgIG1vdmVTZXJpZShzZXJpZTogQmFzZVNlcmllcywgY2hhcnROYW1lOiBzdHJpbmcsIHRhcmdldENoYXJ0TmFtZTogc3RyaW5nLCB0YXJnZXRTY2FsZTogU2NhbGUpIHtcclxuICAgICAgICBpZiAoc2VyaWUucmF3UG9pbnRzVmFsaWQgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBsZXQgY2hhcnQgPSB0aGlzLmdldENoYXJ0T2JqZWN0QnlOYW1lKGNoYXJ0TmFtZSk7XHJcbiAgICAgICAgICAgIGxldCB0YXJnZXQgPSB0aGlzLmdldENoYXJ0T2JqZWN0QnlOYW1lKHRhcmdldENoYXJ0TmFtZSk7XHJcbiAgICAgICAgICAgIGxldCBzZXJpZXMgPSBuZXcgQXJyYXk8QmFzZVNlcmllcz4oKTtcclxuICAgICAgICAgICAgc2VyaWVzLnB1c2goc2VyaWUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNoYXJ0ICE9IHVuZGVmaW5lZCAmJiB0YXJnZXQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBjaGFydC5yZW1vdmVTZXJpZUZyb21DaGFydChzZXJpZSk7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQuYWRkU2VyaWVzVG9DaGFydChzZXJpZXMsIHRhcmdldFNjYWxlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjaGFydC5zZXRBdmFpbGFibGVTZXJpZXNBc0RhdGFTb3VyY2UoKTtcclxuICAgICAgICAgICAgICAgIHRhcmdldC5zZXRBdmFpbGFibGVTZXJpZXNBc0RhdGFTb3VyY2UoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy51cGRhdGVYQXhpc1dpZHRoKGNoYXJ0IS50eXBlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZW1vdmUgb25lIHNlcmllIGZyb20gZ2l2ZW4gY2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNlcmllXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY2hhcnROYW1lXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3Q2hhcnRNYW5hZ2VyXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZVNlcmllKHNlcmllOiBCYXNlU2VyaWVzLCBjaGFydE5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBjaGFydCA9IHRoaXMuZ2V0Q2hhcnRPYmplY3RCeU5hbWUoY2hhcnROYW1lKTtcclxuICAgICAgICBpZiAoY2hhcnQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGNoYXJ0LnJlbW92ZVNlcmllRnJvbUNoYXJ0KHNlcmllKTtcclxuICAgICAgICAgICAgY2hhcnQuc2V0QXZhaWxhYmxlU2VyaWVzQXNEYXRhU291cmNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY2hhcnRzV2l0aFNlcmllID0gdGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsLmdldENoYXJ0c1VzaW5nU2VyaWUoW3NlcmllXSk7XHJcbiAgICAgICAgaWYgKGNoYXJ0c1dpdGhTZXJpZS5sZW5ndGggPT0gMCkgeyAvLyBTZXJpZSBub3QgdXNlZCBpbiBhbiBvdGhlciBjaGFydCA9PiBkZXRhY2ggc2VyaWUgZXZlbnRzXHJcbiAgICAgICAgICAgIHNlcmllLmV2ZW50RGF0YUNoYW5nZWQuZGV0YWNoKHRoaXMuX29uU2VyaWVEYXRhQ2hhbmdlZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZVlBeGlzKHlTY2FsZTogU2NhbGUsIGNoYXJ0OiBDaGFydE1hbmFnZXJDaGFydCkge1xyXG4gICAgICAgIGxldCB0cmFjZUNoYXJ0ID0gdGhpcy5nZXRDaGFydE9iamVjdEJ5TmFtZShjaGFydC5uYW1lKTtcclxuICAgICAgICBpZiAodHJhY2VDaGFydCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdHJhY2VDaGFydC5yZW1vdmVZU2NhbGVGcm9tQ2hhcnQoeVNjYWxlKTtcclxuICAgICAgICAgICAgdHJhY2VDaGFydC5zZXRBdmFpbGFibGVTZXJpZXNBc0RhdGFTb3VyY2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlWEF4aXNXaWR0aChjaGFydC5jaGFydFR5cGUpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlbW92ZSBjaGFydFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjaGFydE5hbWVcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdDaGFydE1hbmFnZXJcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlQ2hhcnQoY2hhcnQ6IENoYXJ0TWFuYWdlckNoYXJ0KSB7XHJcbiAgICAgICAgbGV0IHRyYWNlQ2hhcnQgPSB0aGlzLmdldENoYXJ0T2JqZWN0QnlOYW1lKGNoYXJ0Lm5hbWUpO1xyXG4gICAgICAgIGlmICh0cmFjZUNoYXJ0ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZVRyYWNlQ2hhcnQodHJhY2VDaGFydCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgbWluWDogbnVtYmVyIHwgdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBsZXQgbWF4WDogbnVtYmVyIHwgdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0cmFjZUNoYXJ0LnNlcmllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG1pblggPT0gdW5kZWZpbmVkIHx8IG1pblggPiB0cmFjZUNoYXJ0LnNlcmllc1tpXS5taW5YISkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1pblggPSB0cmFjZUNoYXJ0LnNlcmllc1tpXS5taW5YO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG1heFggPT0gdW5kZWZpbmVkIHx8IG1heFggPCB0cmFjZUNoYXJ0LnNlcmllc1tpXS5tYXhYISkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1heFggPSB0cmFjZUNoYXJ0LnNlcmllc1tpXS5tYXhYO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZVhBeGlzV2lkdGgoY2hhcnQuY2hhcnRUeXBlKTtcclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHNldFBhbm5pbmdBeGVzKGF4ZXM6IElDaGFydEF4aXNbXSkge1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudHJhY2VDaGFydExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHBhbm5pbmdBeGlzID0gbmV3IEFycmF5PElDaGFydEF4aXM+KCk7XHJcbiAgICAgICAgICAgIGlmIChheGVzWzBdID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLnNjYWxlcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBheGlzID0gdGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5jaGFydC5nZXRBeGlzKHRoaXMudHJhY2VDaGFydExpc3RbaV0uc2NhbGVzW2pdLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXhpcyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFubmluZ0F4aXMucHVzaChheGlzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGF4aXMgPSB0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLmNoYXJ0LmdldEF4aXModGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5wcmltYXJ5WEF4aXNOYW1lKVxyXG4gICAgICAgICAgICAgICAgaWYgKGF4aXMgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFubmluZ0F4aXMucHVzaChheGlzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHBhbm5pbmdBeGlzID0gYXhlcztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5jaGFydC5zZXRQYW5uaW5nQXhlcyhwYW5uaW5nQXhpcyk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgc3luY2hyb25pemVTY2FsZVhSYW5nZShzY2FsZTogU2NhbGUpIHtcclxuICAgICAgICBsZXQgY2hhcnRUeXBlID0gc2NhbGUucGFyZW50LmNoYXJ0VHlwZTtcclxuICAgICAgICBsZXQgbWluID0gc2NhbGUubWluWFZhbHVlO1xyXG4gICAgICAgIGxldCBtYXggPSBzY2FsZS5tYXhYVmFsdWU7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50cmFjZUNoYXJ0TGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50cmFjZUNoYXJ0TGlzdFtpXS50eXBlID09IGNoYXJ0VHlwZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5vblN5bmNocm9uaXplU2NhbGVSYW5nZShzY2FsZSwgbWluLCBtYXgpO1xyXG4gICAgICAgICAgICAgICAgLy90aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLnJlZHJhd0NoYXJ0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Wm9vbUF4ZXNJbkNoYXJ0KGNoYXJ0OiBJVHJhY2VDaGFydCwgem9vbURpcmVjdGlvbjogWm9vbURpcmVjdGlvbik6IEFycmF5PElDaGFydEF4aXM+IHtcclxuICAgICAgICBsZXQgYXhlcyA9IG5ldyBBcnJheTxJQ2hhcnRBeGlzPigpO1xyXG5cclxuICAgICAgICBpZiAoem9vbURpcmVjdGlvbiA9PSBab29tRGlyZWN0aW9uLlhZIHx8IHpvb21EaXJlY3Rpb24gPT0gWm9vbURpcmVjdGlvbi5YKSB7XHJcbiAgICAgICAgICAgIGxldCBheGlzID0gY2hhcnQuY2hhcnQuZ2V0QXhpcyhjaGFydC5wcmltYXJ5WEF4aXNOYW1lKTtcclxuICAgICAgICAgICAgaWYgKGF4aXMgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBheGVzLnB1c2goYXhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh6b29tRGlyZWN0aW9uID09IFpvb21EaXJlY3Rpb24uWFkgfHwgem9vbURpcmVjdGlvbiA9PSBab29tRGlyZWN0aW9uLlkpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFydC5zY2FsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBheGlzID0gY2hhcnQuY2hhcnQuZ2V0QXhpcyhjaGFydC5zY2FsZXNbaV0uaWQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGF4aXMgIT0gdW5kZWZpbmVkICYmIGF4aXMuZ2V0QXhpc09yaWVudGF0aW9uKCkgPT0gQXhpc09yaWVudGF0aW9uLnZlcnRpY2FsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXhlcy5wdXNoKGF4aXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYXhlcztcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmluZHMgSVRyYWNlQ2hhcnRPYmplY3QgYnkgZ2l2ZSBuYW1lIGFuZCByZXR1cm4gb2JqZWN0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAgICAgKiBAcmV0dXJucyB7KElUcmFjZUNoYXJ0IHwgdW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdDaGFydE1hbmFnZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRDaGFydE9iamVjdEJ5TmFtZShuYW1lOiBzdHJpbmcpOiBJVHJhY2VDaGFydCB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRyYWNlQ2hhcnRMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLndpZGdldE5hbWUgPT0gbmFtZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudHJhY2VDaGFydExpc3RbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzU2VyaWVJbkNoYXJ0KGNoYXJ0LCBzZXJpZSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hhcnQuc2VyaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFydC5zZXJpZXNbaV0uaWQgPT09IHNlcmllLmlkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLypwcml2YXRlIGdldFByZXZpb3VzQ2hhcnRPYmplY3RCeU5hbWUobmFtZSA6c3RyaW5nKSA6IElUcmFjZUNoYXJ0IHwgdW5kZWZpbmVke1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnRyYWNlQ2hhcnRMaXN0Lmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYodGhpcy50cmFjZUNoYXJ0TGlzdFtpXS53aWRnZXROYW1lID09IG5hbWUpe1xyXG4gICAgICAgICAgICAgICByZXR1cm4gdGhpcy50cmFjZUNoYXJ0TGlzdFtpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfSovXHJcblxyXG4gICAgcHJpdmF0ZSByZW1vdmVTZXJpZUZyb21BbGxDaGFydHMoc2VyaWU6IEJhc2VTZXJpZXMpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudHJhY2VDaGFydExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5zZXJpZXMubWFwKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4LmlkOyB9KS5pbmRleE9mKHNlcmllLmlkKTtcclxuICAgICAgICAgICAgLy9jb25zdCBpbmRleCA9IHRoaXMudHJhY2VDaGFydExpc3RbaV0uc2VyaWVzLmluZGV4T2Yoc2VyaWUsIDApO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5yZW1vdmVTZXJpZUZyb21DaGFydCh0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLnNlcmllc1tpbmRleF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrUmVmZXJlbmNlQ3Vyc29yc0hvdmVyaW5nKG1vdXNlUG9pbnQ6IElQb2ludCwgdHJhY2VDaGFydDogSVRyYWNlQ2hhcnQpOiB2b2lke1xyXG4gICAgICAgIHRyYWNlQ2hhcnQuY2hlY2tDdXJzb3JzSG92ZXJpbmcobW91c2VQb2ludCk7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhZ0N1cnNvckFsb25nTGluZSh0cmFjZUNoYXJ0OiBJVHJhY2VDaGFydCwgbW92ZW1lbnRYOiBudW1iZXIsIG1vdmVtZW50WTogbnVtYmVyKTogdm9pZHtcclxuICAgICAgICB0cmFjZUNoYXJ0LmRyYWdDdXJzb3JBbG9uZ0xpbmUobW92ZW1lbnRYLCBtb3ZlbWVudFkpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEN1cnNvck9uUG9pbnRlclBvc2l0aW9uKHRyYWNlQ2hhcnQgOiBJVHJhY2VDaGFydCwgbW91c2VQb2ludDogSVBvaW50KXtcclxuICAgICAgICB0cmFjZUNoYXJ0LnNldEN1cnNvck9uUG9pbnRlclBvc2l0aW9uKG1vdXNlUG9pbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGRvUGFubmluZyh0cmFjZUNoYXJ0OiBJVHJhY2VDaGFydCwgbW91c2VQb2ludFg6IG51bWJlciwgbW91c2VQb2ludFk6IG51bWJlcik6IHZvaWR7XHJcbiAgICAgICAgdHJhY2VDaGFydC5kb1Bhbm5pbmcobW91c2VQb2ludFgsIG1vdXNlUG9pbnRZKTtcclxuICAgIH1cclxuXHJcbiAgICByZXNldFBhbm5pbmdDb29yZHMoKXtcclxuICAgICAgICBmb3IobGV0IGNoYXJ0IG9mIHRoaXMudHJhY2VDaGFydExpc3Qpe1xyXG4gICAgICAgICAgICBjaGFydC5yZXNldFBhbm5pbmdDb29yZHMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHJlc2V0Wm9vbSgpIHtcclxuICAgICAgICBsZXQgY2hhcnRSYW5nZUhlbHBlciA9IG5ldyBDaGFydFJhbmdlSGVscGVyKCk7XHJcblxyXG4gICAgICAgIGNoYXJ0UmFuZ2VIZWxwZXIucmVzZXRDaGFydFJhbmdlc1godGhpcy50cmFjZUNoYXJ0TGlzdCk7XHJcbiAgICAgICAgY2hhcnRSYW5nZUhlbHBlci5yZXNldENoYXJ0UmFuZ2VzWSh0aGlzLnRyYWNlQ2hhcnRMaXN0KTtcclxuICAgICAgICB0aGlzLnJlZHJhd0NoYXJ0cyh0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICByZXNldFhSYW5nZXNGRlQoKSB7XHJcbiAgICAgICAgbmV3IENoYXJ0UmFuZ2VIZWxwZXIoKS5yZXNldENoYXJ0UmFuZ2VzWCh0aGlzLnRyYWNlQ2hhcnRMaXN0LCBDaGFydFR5cGUuRkZUQ2hhcnQpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICByZXNldFhSYW5nZXNZVCgpIHtcclxuICAgICAgICBuZXcgQ2hhcnRSYW5nZUhlbHBlcigpLnJlc2V0Q2hhcnRSYW5nZXNYKHRoaXMudHJhY2VDaGFydExpc3QsIENoYXJ0VHlwZS5ZVENoYXJ0KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgYXV0b1NjYWxlKCkge1xyXG4gICAgICAgIGxldCBjaGFydFJhbmdlSGVscGVyID0gbmV3IENoYXJ0UmFuZ2VIZWxwZXIoKTtcclxuICAgICAgICBmb3IgKGxldCBjaGFydCBvZiB0aGlzLnRyYWNlQ2hhcnRMaXN0KSB7XHJcbiAgICAgICAgICAgIGNoYXJ0LmF1dG9TY2FsZVlTY2FsZXMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNoYXJ0UmFuZ2VIZWxwZXIucmVzZXRDaGFydFJhbmdlc1godGhpcy50cmFjZUNoYXJ0TGlzdCk7XHJcbiAgICAgICAgdGhpcy5yZWRyYXdDaGFydHModHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Q2hhcnRab29tQXhlcyhheGVzOiBab29tRGlyZWN0aW9uKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRyYWNlQ2hhcnRMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMudHJhY2VDaGFydExpc3RbaV0uc2V0Wm9vbUF4ZXMoYXhlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2hhcnRWaWV3V2lkZ2V0LmFjdGl2ZVNlbGVjdGVkWm9vbUF4aXMgPSBheGVzO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFBhbm5pbmcoZW5hYmxlOiBib29sZWFuKTogYW55IHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudHJhY2VDaGFydExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5zZXRQYW5uaW5nKGVuYWJsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldEJveFpvb20oZW5hYmxlOiBib29sZWFuKTogYW55IHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudHJhY2VDaGFydExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5zZXRCb3hab29tKGVuYWJsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlZHJhd0NoYXJ0cyhmb3JjZVJlZHJhdzogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRyYWNlQ2hhcnRMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChmb3JjZVJlZHJhdyA9PSB0cnVlIHx8IHRoaXMudHJhY2VDaGFydExpc3RbaV0udHlwZSAhPSBDaGFydFR5cGUuWFlDaGFydCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5yZWRyYXdDaGFydCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uUmVkcmF3QWxsQ2hhcnRzKHNlbmRlciwgYXJncyl7XHJcbiAgICAgICAgdGhpcy5yZWRyYXdDaGFydHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uVXNlckNoYXJ0SW50ZXJhY3Rpb24oc2VuZGVyLCBldmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJnczogRXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbkFyZ3MpIHtcclxuICAgICAgICB0aGlzLmNoYXJ0Vmlld1dpZGdldC5vblVzZXJDaGFydEludGVyYWN0aW9uKHNlbmRlciwgZXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbkFyZ3MpXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZERyb3BwYWJsZUxvY2F0aW9ucyhkYXRhLCBzYW1lR3JvdXA6IGJvb2xlYW4pIHtcclxuICAgICAgICBsZXQgc2VyaWVDaGFydFR5cGVIZWxwZXIgPSBuZXcgU2VyaWVDaGFydFR5cGVIZWxwZXIoKTtcclxuICAgICAgICBmb3IgKGxldCBjaGFydCBvZiB0aGlzLnRyYWNlQ2hhcnRMaXN0KSB7XHJcbiAgICAgICAgICAgIGxldCBjaGFydE1hbmFnZXJDaGFydCA9IHRoaXMuX2NoYXJ0TWFuYWdlckRhdGFNb2RlbC5nZXRDaGFydChjaGFydC53aWRnZXROYW1lKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBzZXJpZUNoYXJ0VHlwZSA9IHNlcmllQ2hhcnRUeXBlSGVscGVyLmdldFNlcmllQ2hhcnRUeXBlKGRhdGFbMF0udHlwZSk7XHJcbiAgICAgICAgICAgIHNlcmllQ2hhcnRUeXBlSGVscGVyLnNldERyb3BQb3NzaWJsZUFyZWFzKGNoYXJ0TWFuYWdlckNoYXJ0ISwgZGF0YSwgc2VyaWVDaGFydFR5cGUsIHNhbWVHcm91cCk7XHJcbiAgICAgICAgICAgIGNoYXJ0LmFkZFNlcmllRHJvcExvY2F0aW9ucyhkYXRhLCBjaGFydE1hbmFnZXJDaGFydCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZHJvcEhlbHBlciA9IG5ldyBDaGFydERyb3BIZWxwZXIodGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsLCB0aGlzLmNoYXJ0Vmlld1dpZGdldCk7XHJcbiAgICAgICAgLy8gQWRkIGVtcHR5IHNwYWNlIGRyb3AgbG9jYXRpb25cclxuICAgICAgICBpZiAoZHJvcEhlbHBlci5jYW5BZGRDaGFydCgpID09IHRydWUpIHsgLy8gSXMgaXQgcG9zc2libGUgdG8gYWRkIG9uZSBtb3JlIGNoYXJ0XHJcbiAgICAgICAgICAgIGxldCBlbXB0eVNwYWNlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMubGF5b3V0TWFuYWdlci5jaGFydFNwbGl0dGVyLnBhcmVudENvbnRlbnRJZCArIFwiX2xhc3RQYW5lXCIpO1xyXG4gICAgICAgICAgICBsZXQgc2Nyb2xsQmFyV2lkdGggPSAkKCcjJyArIHRoaXMubGF5b3V0TWFuYWdlci5jaGFydFNwbGl0dGVyUGFyZW50Q29udGFpbmVySWQpWzBdLm9mZnNldFdpZHRoIC0gJCgnIycgKyB0aGlzLmxheW91dE1hbmFnZXIuY2hhcnRTcGxpdHRlckNvbnRhaW5lcklkKVswXS5vZmZzZXRXaWR0aDtcclxuICAgICAgICAgICAgaWYgKGVtcHR5U3BhY2VFbGVtZW50ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgZW1wdHlTcGFjZUVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoMTI1LDE2MCwxNjUsIDAuMiknO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGFbMF0udHlwZSA9PSBTZXJpZXNUeXBlLnRpbWVTZXJpZXMgJiYgZGF0YS5sZW5ndGggPiAyIHx8ICFzYW1lR3JvdXApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZENoYXJ0VHlwZUFyZWFzKGVtcHR5U3BhY2VFbGVtZW50LCBbdHJ1ZSwgZmFsc2UsIHRydWVdLCBzY3JvbGxCYXJXaWR0aCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChkYXRhWzBdLnR5cGUgPT0gU2VyaWVzVHlwZS50aW1lU2VyaWVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRDaGFydFR5cGVBcmVhcyhlbXB0eVNwYWNlRWxlbWVudCwgW3RydWUsIHRydWUsIHRydWVdLCBzY3JvbGxCYXJXaWR0aCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChkYXRhWzBdLnR5cGUgPT0gU2VyaWVzVHlwZS54eVNlcmllcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2hhcnRUeXBlQXJlYXMoZW1wdHlTcGFjZUVsZW1lbnQsIFtmYWxzZSwgdHJ1ZSwgZmFsc2VdLCBzY3JvbGxCYXJXaWR0aCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChkYXRhWzBdLnR5cGUgPT0gU2VyaWVzVHlwZS5mZnRTZXJpZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZENoYXJ0VHlwZUFyZWFzKGVtcHR5U3BhY2VFbGVtZW50LCBbZmFsc2UsIGZhbHNlLCB0cnVlXSwgc2Nyb2xsQmFyV2lkdGgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYWRkQ2hhcnRUeXBlQXJlYXMocGFyZW50OiBIVE1MRWxlbWVudCwgZW5hYmxlZDogQXJyYXk8Ym9vbGVhbj4sIHNjcm9sbEJhcldpZHRoKSB7XHJcbiAgICAgICAgbGV0IGNoYXJ0TmFtZXMgPSBbJ1lUJywgJ1hZJywgJ0ZGVCddO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hhcnROYW1lcy5sZW5ndGg7IGkgPSBpICsgMSkge1xyXG4gICAgICAgICAgICBsZXQgYXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBhcmVhLmlkID0gcGFyZW50LmlkICsgJ18nICsgY2hhcnROYW1lc1tpXTtcclxuICAgICAgICAgICAgYXJlYS5jbGFzc0xpc3QuYWRkKCdjaGFydFR5cGVzJyk7XHJcbiAgICAgICAgICAgIGlmICghZW5hYmxlZFtpXSkge1xyXG4gICAgICAgICAgICAgICAgYXJlYS5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBhcmVhLnN0eWxlLndpZHRoID0gKChwYXJlbnQub2Zmc2V0V2lkdGggLSBzY3JvbGxCYXJXaWR0aCkgLyBjaGFydE5hbWVzLmxlbmd0aCkudG9TdHJpbmcoKSArICdweCc7XHJcblxyXG4gICAgICAgICAgICBsZXQgaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xyXG4gICAgICAgICAgICBpbWFnZS5zcmMgPSAnLi93aWRnZXRzL2NvbW1vbi9zdHlsZS9pbWFnZXMvY2hhcnRUeXBlJyArIGNoYXJ0TmFtZXNbaV0gKyAnLnN2Zyc7XHJcbiAgICAgICAgICAgIGltYWdlLmNsYXNzTGlzdC5hZGQoJ2ltYWdlQ2hhcnQnKTtcclxuXHJcbiAgICAgICAgICAgIGFyZWEuYXBwZW5kQ2hpbGQoaW1hZ2UpO1xyXG4gICAgICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoYXJlYSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmVEcm9wcGFibGVMb2NhdGlvbnMoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgY2hhcnQgb2YgdGhpcy50cmFjZUNoYXJ0TGlzdCkge1xyXG4gICAgICAgICAgICBjaGFydC5yZW1vdmVTZXJpZURyb3BMb2NhdGlvbnMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gUmVtb3ZlIGVtcHR5IHNwYWNlIGRyb3AgbG9jYXRpb25cclxuICAgICAgICBsZXQgZW1wdHlTcGFjZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmxheW91dE1hbmFnZXIuY2hhcnRTcGxpdHRlci5wYXJlbnRDb250ZW50SWQgKyBcIl9sYXN0UGFuZVwiKTtcclxuICAgICAgICBpZiAoZW1wdHlTcGFjZUVsZW1lbnQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGxldCB0eXBlT2ZDaGFydHMgPSBlbXB0eVNwYWNlRWxlbWVudC5jaGlsZHJlbi5sZW5ndGg7XHJcbiAgICAgICAgICAgIGVtcHR5U3BhY2VFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjZmZmJztcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0eXBlT2ZDaGFydHM7IGkgPSBpICsgMSkge1xyXG4gICAgICAgICAgICAgICAgZW1wdHlTcGFjZUVsZW1lbnQuY2hpbGRyZW5bMF0ucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZVhBeGlzV2lkdGgoY2hhcnRUeXBlOiBDaGFydFR5cGUpIHtcclxuICAgICAgICBsZXQgbWF4WUF4ZXMgPSAwO1xyXG4gICAgICAgIGxldCBjaGFydEFyZWE6IFJlY3RhbmdsZSB8IHVuZGVmaW5lZDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudHJhY2VDaGFydExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudHJhY2VDaGFydExpc3RbaV0udHlwZSA9PSBjaGFydFR5cGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudHJhY2VDaGFydExpc3RbaV0uY2hhcnQucmVkcmF3KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG51bWJlck9mWUF4ZXNJbkNoYXJ0ID0gdGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5nZXROdW1iZXJPZllTY2FsZXMoKTtcclxuICAgICAgICAgICAgICAgIGlmIChudW1iZXJPZllBeGVzSW5DaGFydCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbnVtYmVyT2ZZQXhlc0luQ2hhcnQgPSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vaWYgb25lIGNoYXJ0IGhhcyBtb3JlIGF4aXMgdGhhbiB0aGUgb3RoZXJzIHVzZSBpdHMgd2lkdGgsIGlmIHRoZXkgaGF2ZSB0aGUgc2FtZSBhbW91bnQgdXNlIHRoZSBvbmUgd2l0aCB0aGUgaGlnaGVyIHdpZHRoXHJcbiAgICAgICAgICAgICAgICBpZiAobnVtYmVyT2ZZQXhlc0luQ2hhcnQgPiBtYXhZQXhlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIG1heFlBeGVzID0gbnVtYmVyT2ZZQXhlc0luQ2hhcnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hhcnRBcmVhID0gdGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5jaGFydC5nZXRDaGFydEFyZWEoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG51bWJlck9mWUF4ZXNJbkNoYXJ0ID09IG1heFlBeGVzICYmIHRoaXMudHJhY2VDaGFydExpc3RbaV0uY2hhcnQuZ2V0Q2hhcnRBcmVhKCkud2lkdGggPiBjaGFydEFyZWEhLndpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hhcnRBcmVhID0gdGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5jaGFydC5nZXRDaGFydEFyZWEoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGNoYXJ0QXJlYSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5hbGlnbllBeGVzKGNoYXJ0QXJlYSwgY2hhcnRUeXBlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhbGlnbllBeGVzKGNoYXJ0QXJlYTogUmVjdGFuZ2xlLCBjaGFydFR5cGU6IENoYXJ0VHlwZSkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50cmFjZUNoYXJ0TGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50cmFjZUNoYXJ0TGlzdFtpXS50eXBlID09IGNoYXJ0VHlwZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld0NoYXJ0QXJlYSA9IHsgeDogY2hhcnRBcmVhLngsIHk6IGNoYXJ0QXJlYS55LCB3aWR0aDogY2hhcnRBcmVhLndpZHRoLCBoZWlnaHQ6IHRoaXMudHJhY2VDaGFydExpc3RbaV0uY2hhcnQuZ2V0Q2hhcnRBcmVhKCkuaGVpZ2h0IH07XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLmNoYXJ0LnNldENoYXJ0QXJlYShuZXdDaGFydEFyZWEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5yZWRyYXdDaGFydCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBcclxufSJdfQ==