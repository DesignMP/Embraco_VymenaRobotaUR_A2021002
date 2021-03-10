define(["require", "exports", "./YTChart", "./XYChart", "./chartViewWidget", "../common/viewTypeProvider", "./helpers/chartRangeHelper", "../../models/chartManagerDataModel/chartManagerDataModel", "../../models/chartManagerDataModel/chartManagerChart", "../../models/chartManagerDataModel/eventSerieDataChangedArgs", "./helpers/chartDropHelper", "../common/states/chartViewToolbarStates", "../../core/interfaces/components/ui/chart/chartInterface", "./FFTChart", "../common/SerieChartTypeHelper", "../../models/chartManagerDataModel/seriesType"], function (require, exports, YTChart_1, XYChart_1, chartViewWidget_1, viewTypeProvider_1, chartRangeHelper_1, chartManagerDataModel_1, chartManagerChart_1, eventSerieDataChangedArgs_1, chartDropHelper_1, chartViewToolbarStates_1, chartInterface_1, FFTChart_1, SerieChartTypeHelper_1, seriesType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ChartViewChartManager = /** @class */ (function () {
        function ChartViewChartManager(chartViewWidget, userInteractionController, layoutManager, chartManagerDataModel) {
            var _this = this;
            this.traceChartList = [];
            this.series = new Array();
            this._onSerieDataChanged = function (sender, eventArgs) { return _this.onSerieDataChanged(sender, eventArgs); };
            this._userChartInteractionHandler = function (sender, args) { return _this.onUserChartInteraction(sender, args); };
            this.chartViewWidget = chartViewWidget;
            this._states = chartViewWidget.states;
            this.userInteractionController = userInteractionController;
            this.layoutManager = layoutManager;
            this._chartManagerDataModel = chartManagerDataModel;
        }
        ChartViewChartManager.prototype.dispose = function () {
            for (var i = 0; i < this.traceChartList.length; i++) {
                this.traceChartList[i].dispose();
            }
        };
        ChartViewChartManager.prototype.addTraceChart = function (chart, index, type) {
            if (index === void 0) { index = -1; }
            var scale = chart.childs[0];
            var newTraceChart = this.addChartToContainer(chart.name, index, type, scale);
            this.updateZoomSettings();
            this.redrawCharts();
            this.updateXAxisWidth(chart.chartType);
            return newTraceChart;
        };
        ChartViewChartManager.prototype.addChartToContainer = function (name, index, type, scale) {
            if (index === void 0) { index = -1; }
            var traceChart;
            if (type === chartManagerChart_1.ChartType.YTChart) {
                traceChart = new YTChart_1.YTChart(this, name, type, scale);
            }
            else if (type === chartManagerChart_1.ChartType.XYChart) {
                traceChart = new XYChart_1.XYChart(this, name, type, scale);
            }
            else {
                traceChart = new FFTChart_1.FFTChart(this, name, type, scale);
            }
            traceChart.eventUserChartInteraction.attach(this._userChartInteractionHandler);
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
        ChartViewChartManager.prototype.addSeriesToChart = function (series, chart, scale) {
            for (var i = 0; i < series.length; i++) {
                series[i].eventDataChanged.attach(this._onSerieDataChanged);
            }
            var chartName = chart.name;
            var ytCharts = this.getYTCharts();
            var fftCharts = this.getFFTCharts();
            var xRange = this.isFirstSeriesOfTypeInCharts(series[0]);
            var yRange = this.isFirstSeriesOnScale(series[0], scale);
            this.addSeries(series, chartName, scale, yRange);
            if (xRange) {
                if (series[0].type == seriesType_1.SeriesType.timeSeries) {
                    new chartRangeHelper_1.ChartRangeHelper().resetChartRangesX(ytCharts);
                }
                else if (series[0].type == seriesType_1.SeriesType.fftSeries) {
                    new chartRangeHelper_1.ChartRangeHelper().resetChartRangesX(fftCharts);
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
                charts = this.getFFTCharts();
            }
            else if (series.type == seriesType_1.SeriesType.timeSeries) {
                charts = this.getYTCharts();
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
                                else if (series[0].type == seriesType_1.SeriesType.fftSeries) {
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
            chartRangeHelper.updateChartRangesY(this.traceChartList);
            this.redrawCharts(true);
        };
        ChartViewChartManager.prototype.resetXRangesFFT = function () {
            var fftCharts = this.getFFTCharts();
            new chartRangeHelper_1.ChartRangeHelper().resetChartRangesX(fftCharts);
        };
        ChartViewChartManager.prototype.resetXRangesYT = function () {
            var ytCharts = this.getYTCharts();
            new chartRangeHelper_1.ChartRangeHelper().resetChartRangesX(ytCharts);
        };
        ChartViewChartManager.prototype.autoScale = function () {
            var chartRangeHelper = new chartRangeHelper_1.ChartRangeHelper();
            for (var _i = 0, _a = this.traceChartList; _i < _a.length; _i++) {
                var chart = _a[_i];
                chart.resetYScalesChartZoom();
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
        ChartViewChartManager.prototype.getYTCharts = function () {
            var ytCharts = [];
            for (var _i = 0, _a = this.traceChartList; _i < _a.length; _i++) {
                var chart = _a[_i];
                if (chart.type == chartManagerChart_1.ChartType.YTChart) {
                    ytCharts.push(chart);
                }
            }
            return ytCharts;
        };
        ChartViewChartManager.prototype.getFFTCharts = function () {
            var fftCharts = [];
            for (var _i = 0, _a = this.traceChartList; _i < _a.length; _i++) {
                var chart = _a[_i];
                if (chart.type == chartManagerChart_1.ChartType.FFTChart) {
                    fftCharts.push(chart);
                }
            }
            return fftCharts;
        };
        return ChartViewChartManager;
    }());
    exports.ChartViewChartManager = ChartViewChartManager;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRWaWV3Q2hhcnRNYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0Vmlld1dpZGdldC9jaGFydFZpZXdDaGFydE1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBNkJBO1FBZ0JJLCtCQUFZLGVBQWdDLEVBQUUseUJBQXFELEVBQUUsYUFBcUMsRUFBRSxxQkFBNkM7WUFBekwsaUJBTUM7WUFwQkQsbUJBQWMsR0FBdUIsRUFBRSxDQUFDO1lBQ3hDLFdBQU0sR0FBaUIsSUFBSSxLQUFLLEVBQWMsQ0FBQztZQVF2Qyx3QkFBbUIsR0FBRyxVQUFDLE1BQU0sRUFBRSxTQUFTLElBQUssT0FBQSxLQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxFQUExQyxDQUEwQyxDQUFDO1lBQ3hGLGlDQUE0QixHQUFHLFVBQUMsTUFBTSxFQUFFLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQXpDLENBQXlDLENBQUM7WUFLL0YsSUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7WUFDdkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUMsTUFBTSxDQUFDO1lBQ3RDLElBQUksQ0FBQyx5QkFBeUIsR0FBRyx5QkFBeUIsQ0FBQztZQUMzRCxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztZQUNuQyxJQUFJLENBQUMsc0JBQXNCLEdBQUcscUJBQXFCLENBQUM7UUFDeEQsQ0FBQztRQUVELHVDQUFPLEdBQVA7WUFDSSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2pELElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7YUFD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LE9BQU8sUUFBUSxDQUFDO1FBQ3BCLENBQUM7UUFFTyw0Q0FBWSxHQUFwQjtZQUNJLElBQUksU0FBUyxHQUFlLEVBQUUsQ0FBQztZQUMvQixLQUFrQixVQUFtQixFQUFuQixLQUFBLElBQUksQ0FBQyxjQUFjLEVBQW5CLGNBQW1CLEVBQW5CLElBQW1CLEVBQUU7Z0JBQWxDLElBQUksS0FBSyxTQUFBO2dCQUNWLElBQUksS0FBSyxDQUFDLElBQUksSUFBSSw2QkFBUyxDQUFDLFFBQVEsRUFBRTtvQkFDbEMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFpQixDQUFDLENBQUM7aUJBQ3JDO2FBQ0o7WUFFRCxPQUFPLFNBQVMsQ0FBQztRQUNyQixDQUFDO1FBQ0wsNEJBQUM7SUFBRCxDQUFDLEFBbDFCRCxJQWsxQkM7SUFsMUJZLHNEQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElUcmFjZUNoYXJ0IH0gZnJvbSBcImludGVyZmFjZXMvdHJhY2VDaGFydEludGVyZmFjZVwiXHJcbmltcG9ydCB7IFlUQ2hhcnQgfSBmcm9tIFwiLi9ZVENoYXJ0XCJcclxuaW1wb3J0IHsgWFlDaGFydCB9IGZyb20gXCIuL1hZQ2hhcnRcIlxyXG5pbXBvcnQgeyBFdmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncywgQ2hhcnRPYmplY3RUeXBlLCBDaGFydEJhc2UgfSBmcm9tIFwiLi9DaGFydEJhc2VcIlxyXG5pbXBvcnQgeyBDaGFydFZpZXdMYXlvdXRNYW5hZ2VyIH0gZnJvbSBcIi4vY2hhcnRWaWV3TGF5b3V0TWFuYWdlclwiO1xyXG5pbXBvcnQgeyBJQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvaW50ZXJmYWNlcy9jaGFydE1hbmFnZXJEYXRhTW9kZWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ2hhcnRWaWV3V2lkZ2V0LCBab29tRGlyZWN0aW9uIH0gZnJvbSBcIi4vY2hhcnRWaWV3V2lkZ2V0XCI7XHJcbmltcG9ydCB7IFZpZXdUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi92aWV3VHlwZVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IENoYXJ0UmFuZ2VIZWxwZXIgfSBmcm9tIFwiLi9oZWxwZXJzL2NoYXJ0UmFuZ2VIZWxwZXJcIjtcclxuaW1wb3J0IHsgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsQ2hhbmdlZEhpbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9jaGFydE1hbmFnZXJEYXRhTW9kZWxcIjtcclxuaW1wb3J0IHsgSVVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXIgfSBmcm9tIFwiLi91c2VySW50ZXJhY3Rpb24vaW50ZXJmYWNlcy9jb250cm9sbGVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IENoYXJ0VHlwZSwgQ2hhcnRNYW5hZ2VyQ2hhcnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9jaGFydE1hbmFnZXJDaGFydFwiXHJcbmltcG9ydCB7IEJhc2VTZXJpZXMgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9iYXNlU2VyaWVzXCJcclxuaW1wb3J0IHsgU2VyaWVBY3Rpb24sIEV2ZW50U2VyaWVEYXRhQ2hhbmdlZEFyZ3MgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9ldmVudFNlcmllRGF0YUNoYW5nZWRBcmdzXCJcclxuaW1wb3J0IHsgU2NhbGUgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9zY2FsZVwiO1xyXG5pbXBvcnQgeyBDaGFydERyb3BIZWxwZXIgfSBmcm9tIFwiLi9oZWxwZXJzL2NoYXJ0RHJvcEhlbHBlclwiO1xyXG5pbXBvcnQgeyBDaGFydFZpZXdUb29sU3RhdGUsIENoYXJ0Vmlld1pvb21EaXJlY3Rpb25TdGF0ZSwgQ2hhcnRWaWV3VG9vbFN0YXRlRW51bSB9IGZyb20gXCIuLi9jb21tb24vc3RhdGVzL2NoYXJ0Vmlld1Rvb2xiYXJTdGF0ZXNcIjtcclxuaW1wb3J0IHsgU3RvcmUgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL3N0b3JlXCI7XHJcbmltcG9ydCB7IElDaGFydE1hbmFnZXJDaGFydCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2ludGVyZmFjZXMvY2hhcnRNYW5hZ2VyQ2hhcnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQXhpc1Bvc2l0aW9uLCBBeGlzT3JpZW50YXRpb24gfSBmcm9tIFwiLi4vLi4vY29yZS9pbnRlcmZhY2VzL2NvbXBvbmVudHMvdWkvY2hhcnQvY2hhcnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgUmVjdGFuZ2xlIH0gZnJvbSBcIi4uLy4uL2NvcmUvdHlwZXMvUmVjdGFuZ2xlXCI7XHJcbmltcG9ydCB7IElDaGFydEF4aXMgfSBmcm9tIFwiLi4vLi4vY29yZS9pbnRlcmZhY2VzL2NvbXBvbmVudHMvdWkvY2hhcnQvQ2hhcnRBeGlzSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEZGVENoYXJ0IH0gZnJvbSBcIi4vRkZUQ2hhcnRcIjtcclxuaW1wb3J0IHsgU2VyaWVDaGFydFR5cGVIZWxwZXIgfSBmcm9tIFwiLi4vY29tbW9uL1NlcmllQ2hhcnRUeXBlSGVscGVyXCI7XHJcbmltcG9ydCB7IFNlcmllc1R5cGUgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9zZXJpZXNUeXBlXCI7XHJcbmltcG9ydCB7IEJhc2ljQ2hhcnQgfSBmcm9tIFwiLi9CYXNpY0NoYXJ0XCI7XHJcbmltcG9ydCB7IElQb2ludCB9IGZyb20gXCIuLi8uLi9jb3JlL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgQ2hhcnRWaWV3Q2hhcnRNYW5hZ2VyIHtcclxuICAgIGNoYXJ0Vmlld1dpZGdldDogQ2hhcnRWaWV3V2lkZ2V0O1xyXG4gICAgdHJhY2VDaGFydExpc3Q6IEFycmF5PElUcmFjZUNoYXJ0PiA9IFtdO1xyXG4gICAgc2VyaWVzOiBCYXNlU2VyaWVzW10gPSBuZXcgQXJyYXk8QmFzZVNlcmllcz4oKTtcclxuXHJcbiAgICBsYXlvdXRNYW5hZ2VyOiBDaGFydFZpZXdMYXlvdXRNYW5hZ2VyO1xyXG4gICAgdXNlckludGVyYWN0aW9uQ29udHJvbGxlcjogSVVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXI7XHJcbiAgICBfY2hhcnRNYW5hZ2VyRGF0YU1vZGVsOiBJQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsO1xyXG5cclxuICAgIHByaXZhdGUgX3N0YXRlczogU3RvcmU7XHJcblxyXG4gICAgcHJpdmF0ZSBfb25TZXJpZURhdGFDaGFuZ2VkID0gKHNlbmRlciwgZXZlbnRBcmdzKSA9PiB0aGlzLm9uU2VyaWVEYXRhQ2hhbmdlZChzZW5kZXIsIGV2ZW50QXJncyk7XHJcbiAgICBwcml2YXRlIF91c2VyQ2hhcnRJbnRlcmFjdGlvbkhhbmRsZXIgPSAoc2VuZGVyLCBhcmdzKSA9PiB0aGlzLm9uVXNlckNoYXJ0SW50ZXJhY3Rpb24oc2VuZGVyLCBhcmdzKTtcclxuXHJcbiAgICBwcml2YXRlIGFjdGl2ZVBhbm5pbmdBeGVzO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNoYXJ0Vmlld1dpZGdldDogQ2hhcnRWaWV3V2lkZ2V0LCB1c2VySW50ZXJhY3Rpb25Db250cm9sbGVyOiBJVXNlckludGVyYWN0aW9uQ29udHJvbGxlciwgbGF5b3V0TWFuYWdlcjogQ2hhcnRWaWV3TGF5b3V0TWFuYWdlciwgY2hhcnRNYW5hZ2VyRGF0YU1vZGVsOiBJQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsKSB7XHJcbiAgICAgICAgdGhpcy5jaGFydFZpZXdXaWRnZXQgPSBjaGFydFZpZXdXaWRnZXQ7XHJcbiAgICAgICAgdGhpcy5fc3RhdGVzID0gY2hhcnRWaWV3V2lkZ2V0LnN0YXRlcztcclxuICAgICAgICB0aGlzLnVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXIgPSB1c2VySW50ZXJhY3Rpb25Db250cm9sbGVyO1xyXG4gICAgICAgIHRoaXMubGF5b3V0TWFuYWdlciA9IGxheW91dE1hbmFnZXI7XHJcbiAgICAgICAgdGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsID0gY2hhcnRNYW5hZ2VyRGF0YU1vZGVsO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3Bvc2UoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRyYWNlQ2hhcnRMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMudHJhY2VDaGFydExpc3RbaV0uZGlzcG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhZGRUcmFjZUNoYXJ0KGNoYXJ0OiBDaGFydE1hbmFnZXJDaGFydCwgaW5kZXg6IG51bWJlciA9IC0xLCB0eXBlOiBudW1iZXIpOiBJVHJhY2VDaGFydCB7XHJcbiAgICAgICAgbGV0IHNjYWxlOiBTY2FsZSA9IGNoYXJ0LmNoaWxkc1swXVxyXG4gICAgICAgIGxldCBuZXdUcmFjZUNoYXJ0OiBJVHJhY2VDaGFydCA9IHRoaXMuYWRkQ2hhcnRUb0NvbnRhaW5lcihjaGFydC5uYW1lLCBpbmRleCwgdHlwZSwgc2NhbGUpO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZVpvb21TZXR0aW5ncygpO1xyXG4gICAgICAgIHRoaXMucmVkcmF3Q2hhcnRzKCk7XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlWEF4aXNXaWR0aChjaGFydC5jaGFydFR5cGUpO1xyXG4gICAgICAgIHJldHVybiBuZXdUcmFjZUNoYXJ0O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIGFkZENoYXJ0VG9Db250YWluZXIobmFtZTogc3RyaW5nLCBpbmRleDogbnVtYmVyID0gLTEsIHR5cGU6IENoYXJ0VHlwZSwgc2NhbGU6IFNjYWxlKTogSVRyYWNlQ2hhcnQge1xyXG4gICAgICAgIGxldCB0cmFjZUNoYXJ0OiBJVHJhY2VDaGFydDtcclxuXHJcbiAgICAgICAgaWYgKHR5cGUgPT09IENoYXJ0VHlwZS5ZVENoYXJ0KSB7XHJcbiAgICAgICAgICAgIHRyYWNlQ2hhcnQgPSBuZXcgWVRDaGFydCh0aGlzLCBuYW1lLCB0eXBlLCBzY2FsZSlcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IENoYXJ0VHlwZS5YWUNoYXJ0KSB7XHJcbiAgICAgICAgICAgIHRyYWNlQ2hhcnQgPSBuZXcgWFlDaGFydCh0aGlzLCBuYW1lLCB0eXBlLCBzY2FsZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdHJhY2VDaGFydCA9IG5ldyBGRlRDaGFydCh0aGlzLCBuYW1lLCB0eXBlLCBzY2FsZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0cmFjZUNoYXJ0LmV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb24uYXR0YWNoKHRoaXMuX3VzZXJDaGFydEludGVyYWN0aW9uSGFuZGxlcik7XHJcbiAgICAgICAgdGhpcy5sYXlvdXRNYW5hZ2VyLmNoYXJ0U3BsaXR0ZXIuYWRkV2lkZ2V0KHRyYWNlQ2hhcnQsIG5hbWUsIFZpZXdUeXBlLlVzZXIsIDMwMCk7XHJcblxyXG4gICAgICAgIGlmIChpbmRleCAhPSAtMSkge1xyXG4gICAgICAgICAgICAvLyBUT0RPOiBzZXQgaW5kZXggYXQgYWRkV2lkZ2V0IE1ldGhvZCB0byBhdm9pZCBtb3ZpbmcgdGhlIGNoYXJ0IGFmdGVyd2FyZHNcclxuICAgICAgICAgICAgdGhpcy5sYXlvdXRNYW5hZ2VyLmNoYXJ0U3BsaXR0ZXIubW92ZVdpZGdldCh0cmFjZUNoYXJ0LCBpbmRleCk7XHJcbiAgICAgICAgICAgIHRoaXMudHJhY2VDaGFydExpc3Quc3BsaWNlKGluZGV4LCAwLCB0cmFjZUNoYXJ0KVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy50cmFjZUNoYXJ0TGlzdC5wdXNoKHRyYWNlQ2hhcnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJhY2VDaGFydDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogTWV0aG9kIHRvIHNldCB0aGUgWm9vbVNldHRpbmcoRGlyZWN0aW9uIGFuZCBCb3hab29tKSBmb3IgYWxsIENoYXJ0cyBhY2NvcmRpbmcgdG8gdGhlIGNvcnJlc3BvbmRpbmcgc3RhdGVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdDaGFydE1hbmFnZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVab29tU2V0dGluZ3MoKSB7XHJcbiAgICAgICAgbGV0IHRvb2xzdGF0ZTogQ2hhcnRWaWV3VG9vbFN0YXRlID0gdGhpcy5fc3RhdGVzLnJlYWQoQ2hhcnRWaWV3VG9vbFN0YXRlLCBcIkNoYXJ0Vmlld1Rvb2xTdGF0ZVwiKTtcclxuICAgICAgICBsZXQgem9vbURpcmVjdGlvblN0YXRlOiBDaGFydFZpZXdab29tRGlyZWN0aW9uU3RhdGUgPSB0aGlzLl9zdGF0ZXMucmVhZChDaGFydFZpZXdab29tRGlyZWN0aW9uU3RhdGUsIFwiQ2hhcnRWaWV3Wm9vbURpcmVjdGlvblN0YXRlXCIpO1xyXG5cclxuICAgICAgICBpZiAodG9vbHN0YXRlLnNlbGVjdGVkVG9vbCA9PSBDaGFydFZpZXdUb29sU3RhdGVFbnVtLkJPWFpPT00pIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRCb3hab29tKHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFBhbm5pbmcoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0b29sc3RhdGUuc2VsZWN0ZWRUb29sID09IENoYXJ0Vmlld1Rvb2xTdGF0ZUVudW0uUEFOTklORykge1xyXG4gICAgICAgICAgICB0aGlzLnNldEJveFpvb20oZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFBhbm5pbmcoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRCb3hab29tKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRQYW5uaW5nKGZhbHNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2V0Q2hhcnRab29tQXhlcyh6b29tRGlyZWN0aW9uU3RhdGUuem9vbURpcmVjdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlVHJhY2VDaGFydChjaGFydDogSVRyYWNlQ2hhcnQpIHtcclxuICAgICAgICBjaGFydC5ldmVudFVzZXJDaGFydEludGVyYWN0aW9uLmRldGFjaCh0aGlzLl91c2VyQ2hhcnRJbnRlcmFjdGlvbkhhbmRsZXIpO1xyXG4gICAgICAgIHRoaXMucmVtb3ZlQ2hhcnRGcm9tQ2hhcnRMaXN0KGNoYXJ0KTtcclxuICAgICAgICBjaGFydC5kaXNwb3NlKCk7XHJcbiAgICAgICAgdGhpcy5sYXlvdXRNYW5hZ2VyLmNoYXJ0U3BsaXR0ZXIucmVtb3ZlV2lkZ2V0KGNoYXJ0KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlbW92ZUNoYXJ0RnJvbUNoYXJ0TGlzdChjaGFydDogSVRyYWNlQ2hhcnQpIHtcclxuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmdldENoYXJ0SW5kZXgoY2hhcnQpO1xyXG5cclxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLnRyYWNlQ2hhcnRMaXN0LnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1vdmVUcmFjZUNoYXJ0KGNoYXJ0OiBDaGFydE1hbmFnZXJDaGFydCwgdGFyZ2V0Q2hhcnQ6IENoYXJ0TWFuYWdlckNoYXJ0LCBhcmdzKSB7XHJcblxyXG4gICAgICAgIGxldCB0cmFjZUNoYXJ0ID0gdGhpcy5nZXRDaGFydE9iamVjdEJ5TmFtZShjaGFydC5uYW1lKTtcclxuICAgICAgICBsZXQgdGFyZ2V0VHJhY2VDaGFydCA9IHRoaXMuZ2V0Q2hhcnRPYmplY3RCeU5hbWUodGFyZ2V0Q2hhcnQubmFtZSk7XHJcblxyXG4gICAgICAgIGlmICh0cmFjZUNoYXJ0ICE9IHVuZGVmaW5lZCAmJiB0YXJnZXRUcmFjZUNoYXJ0ICE9IHVuZGVmaW5lZCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IGNoYXJ0SW5kZXggPSB0aGlzLmdldENoYXJ0SW5kZXgodHJhY2VDaGFydCk7XHJcbiAgICAgICAgICAgIGxldCB0YXJnZXRJbmRleCA9IHRoaXMuZ2V0Q2hhcnRJbmRleCh0YXJnZXRUcmFjZUNoYXJ0KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChhcmdzLmluc2VydFR5cGUgPT0gXCJpbnNlcnRCZWxvd1wiKSB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRJbmRleCArPSAxO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY2hhcnRJbmRleCA+IC0xICYmIHRhcmdldEluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudHJhY2VDaGFydExpc3Quc3BsaWNlKGNoYXJ0SW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoYXJ0SW5kZXggPCB0YXJnZXRJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJhY2VDaGFydExpc3Quc3BsaWNlKHRhcmdldEluZGV4IC0gMSwgMCwgdHJhY2VDaGFydCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYWNlQ2hhcnRMaXN0LnNwbGljZSh0YXJnZXRJbmRleCwgMCwgdHJhY2VDaGFydCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxheW91dE1hbmFnZXIuY2hhcnRTcGxpdHRlci5tb3ZlV2lkZ2V0KHRyYWNlQ2hhcnQsIHRhcmdldEluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9hZGQgYWxsIGFkZGl0aW9uYWwgYXhlcyB0byBjaGFydFxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHRyYWNlQ2hhcnQuc2NhbGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0cmFjZUNoYXJ0LmFkZFlTY2FsZSh0cmFjZUNoYXJ0LnNjYWxlc1tpXSwgQXhpc1Bvc2l0aW9uLnJpZ2h0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLnJlZHJhd0NoYXJ0cygpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVhBeGlzV2lkdGgoY2hhcnQuY2hhcnRUeXBlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlQWxsQ2hhcnRzKCkge1xyXG4gICAgICAgIHdoaWxlICh0aGlzLnRyYWNlQ2hhcnRMaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVUcmFjZUNoYXJ0KHRoaXMudHJhY2VDaGFydExpc3RbMF0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldENoYXJ0SW5kZXgoY2hhcnQ6IElUcmFjZUNoYXJ0KTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgaW5kZXggPSAtMVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50cmFjZUNoYXJ0TGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50cmFjZUNoYXJ0TGlzdFtpXSA9PSBjaGFydCkge1xyXG4gICAgICAgICAgICAgICAgaW5kZXggPSBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpbmRleDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRUcmFjZUNoYXJ0QnlDb250YWluZXJJZChjb250YWluZXJJRDogc3RyaW5nKTogSVRyYWNlQ2hhcnQgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50cmFjZUNoYXJ0TGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5wYXJlbnRDb250ZW50SWQgPT0gY29udGFpbmVySUQuc3Vic3RyKDAsIHRoaXMudHJhY2VDaGFydExpc3RbaV0ucGFyZW50Q29udGVudElkLmxlbmd0aCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFRyYWNlQ2hhcnRCeU5hbWUoY2hhcnROYW1lOiBzdHJpbmcpOiBJVHJhY2VDaGFydCB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRyYWNlQ2hhcnRMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLndpZGdldE5hbWUgPT0gY2hhcnROYW1lKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50cmFjZUNoYXJ0TGlzdFtpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBvbkNoYXJ0TWFuYWdlck1vZGVsQ2hhbmdlZChkYXRhTW9kZWw6IElDaGFydE1hbmFnZXJEYXRhTW9kZWwsIGFyZ3MpIHtcclxuICAgICAgICB0aGlzLl9jaGFydE1hbmFnZXJEYXRhTW9kZWwgPSBkYXRhTW9kZWw7XHJcbiAgICAgICAgc3dpdGNoIChhcmdzLmhpbnQpIHtcclxuICAgICAgICAgICAgY2FzZSBDaGFydE1hbmFnZXJEYXRhTW9kZWxDaGFuZ2VkSGludC5hZGRTZXJpZToge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRTZXJpZXNUb0NoYXJ0KGFyZ3MuZGF0YS5zZXJpZXMsIGFyZ3MuZGF0YS5jaGFydCwgYXJncy5kYXRhLmF4aXMpXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIENoYXJ0TWFuYWdlckRhdGFNb2RlbENoYW5nZWRIaW50Lm1vdmVTZXJpZToge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlU2VyaWUoYXJncy5kYXRhLnNlcmllLCBhcmdzLmRhdGEuY2hhcnQubmFtZSwgYXJncy5kYXRhLnRhcmdldENoYXJ0Lm5hbWUsIGFyZ3MuZGF0YS50YXJnZXRBeGlzKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsQ2hhbmdlZEhpbnQucmVtb3ZlU2VyaWU6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlU2VyaWUoYXJncy5kYXRhLnNlcmllLCBhcmdzLmRhdGEuY2hhcnQubmFtZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIENoYXJ0TWFuYWdlckRhdGFNb2RlbENoYW5nZWRIaW50LnJlbW92ZUNoYXJ0OiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUNoYXJ0KGFyZ3MuZGF0YS5jaGFydCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIENoYXJ0TWFuYWdlckRhdGFNb2RlbENoYW5nZWRIaW50LmFkZENoYXJ0OiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFRyYWNlQ2hhcnQoYXJncy5kYXRhLmNoYXJ0LCBhcmdzLmRhdGEuaW5kZXgsIGFyZ3MuZGF0YS50eXBlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsQ2hhbmdlZEhpbnQubW92ZUNoYXJ0OiB7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlVHJhY2VDaGFydChhcmdzLmRhdGEuY2hhcnQsIGFyZ3MuZGF0YS50YXJnZXQsIGFyZ3MuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIENoYXJ0TWFuYWdlckRhdGFNb2RlbENoYW5nZWRIaW50LmFkZFlTY2FsZToge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRZU2NhbGUoYXJncy5kYXRhLnlBeGlzLCBhcmdzLmRhdGEuY2hhcnQubmFtZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIENoYXJ0TWFuYWdlckRhdGFNb2RlbENoYW5nZWRIaW50LnJlbW92ZVlTY2FsZToge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVZQXhpcyhhcmdzLmRhdGEueUF4aXMsIGFyZ3MuZGF0YS5jaGFydCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIENoYXJ0TWFuYWdlckRhdGFNb2RlbENoYW5nZWRIaW50LnVwZGF0ZVNjYWxlUmFuZ2U6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3luY2hyb25pemVTY2FsZVhSYW5nZShhcmdzLmRhdGEuc2NhbGUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBwcml2YXRlIGFkZFNlcmllc1RvQ2hhcnQoc2VyaWVzOiBBcnJheTxCYXNlU2VyaWVzPiwgY2hhcnQ6IElDaGFydE1hbmFnZXJDaGFydCwgc2NhbGU6IFNjYWxlKSB7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2VyaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHNlcmllc1tpXS5ldmVudERhdGFDaGFuZ2VkLmF0dGFjaCh0aGlzLl9vblNlcmllRGF0YUNoYW5nZWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY2hhcnROYW1lID0gY2hhcnQubmFtZTtcclxuICAgICAgICBsZXQgeXRDaGFydHM6IEFycmF5PFlUQ2hhcnQ+ID0gdGhpcy5nZXRZVENoYXJ0cygpO1xyXG4gICAgICAgIGxldCBmZnRDaGFydHM6IEFycmF5PEZGVENoYXJ0PiA9IHRoaXMuZ2V0RkZUQ2hhcnRzKCk7XHJcblxyXG4gICAgICAgIGxldCB4UmFuZ2UgPSB0aGlzLmlzRmlyc3RTZXJpZXNPZlR5cGVJbkNoYXJ0cyhzZXJpZXNbMF0pXHJcbiAgICAgICAgbGV0IHlSYW5nZSA9IHRoaXMuaXNGaXJzdFNlcmllc09uU2NhbGUoc2VyaWVzWzBdLCBzY2FsZSk7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkU2VyaWVzKHNlcmllcywgY2hhcnROYW1lLCBzY2FsZSwgeVJhbmdlKTtcclxuXHJcbiAgICAgICAgaWYgKHhSYW5nZSkge1xyXG4gICAgICAgICAgICBpZiAoc2VyaWVzWzBdLnR5cGUgPT0gU2VyaWVzVHlwZS50aW1lU2VyaWVzKSB7XHJcbiAgICAgICAgICAgICAgICBuZXcgQ2hhcnRSYW5nZUhlbHBlcigpLnJlc2V0Q2hhcnRSYW5nZXNYKHl0Q2hhcnRzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChzZXJpZXNbMF0udHlwZSA9PSBTZXJpZXNUeXBlLmZmdFNlcmllcykge1xyXG4gICAgICAgICAgICAgICAgbmV3IENoYXJ0UmFuZ2VIZWxwZXIoKS5yZXNldENoYXJ0UmFuZ2VzWChmZnRDaGFydHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucmVkcmF3Q2hhcnRzKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqQ2hlY2tzIGlmIGEgZ2l2ZW4gU2VyaWVzIGlzIHRoZSBmaXJzdCBTZXJpZXMgb24gYSBwYXJ0aWN1bGFyIHNjYWxlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8QmFzZVNlcmllcz59IHNlcmllc1xyXG4gICAgICogQHBhcmFtIHtTY2FsZX0gc2NhbGVcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld0NoYXJ0TWFuYWdlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGlzRmlyc3RTZXJpZXNPblNjYWxlKHNlcmllczogQmFzZVNlcmllcywgc2NhbGU6IFNjYWxlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgLy9vbmx5IHJlc2V0IHRoZSBjaGFydHJhbmdlIG9uIHRoZSB5IGF4aXMgaWYgdGhlc2UgYXJlIHRoZSBmaXJzdCBzZXJpZXMgaW4gdGhlIHNjYWxlXHJcbiAgICAgICAgaWYgKHNjYWxlLmNoaWxkcy5sZW5ndGggPCAxIHx8IHNlcmllcyAhPSBzY2FsZS5jaGlsZHNbMF0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqQ2hlY2tzIGlmIGEgZ2l2ZW4gU2VyaWVzIGlzIHRoZSBmaXJzdCBvZiBpdHMgdHlwZSBpbiBhbGwgY2hhcnRzXHJcblxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNlcmllc1xyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdDaGFydE1hbmFnZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpc0ZpcnN0U2VyaWVzT2ZUeXBlSW5DaGFydHMoc2VyaWVzOiBCYXNlU2VyaWVzKSB7XHJcbiAgICAgICAgbGV0IGNoYXJ0cyA9IHRoaXMuZ2V0Q2hhcnRzRm9yU2VyaWUoc2VyaWVzKTtcclxuICAgICAgICBsZXQgaXNGaXJzdFNlcmllID0gZmFsc2U7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFydHMubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChjaGFydHNbaV0uc2VyaWVzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBpc0ZpcnN0U2VyaWUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGNoYXJ0c1tpXS5zZXJpZXMubGVuZ3RoID09IDEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjaGFydHNbaV0uc2VyaWVzWzBdLnNlcmllICE9IHNlcmllcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGlzRmlyc3RTZXJpZTtcclxuXHJcblxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBnZXRDaGFydHNGb3JTZXJpZShzZXJpZXM6IEJhc2VTZXJpZXMpOiBCYXNpY0NoYXJ0W10ge1xyXG4gICAgICAgIGxldCBjaGFydHMgPSBBcnJheTxCYXNpY0NoYXJ0PigpO1xyXG4gICAgICAgIGlmIChzZXJpZXMudHlwZSA9PSBTZXJpZXNUeXBlLmZmdFNlcmllcykge1xyXG4gICAgICAgICAgICBjaGFydHMgPSB0aGlzLmdldEZGVENoYXJ0cygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChzZXJpZXMudHlwZSA9PSBTZXJpZXNUeXBlLnRpbWVTZXJpZXMpIHtcclxuICAgICAgICAgICAgY2hhcnRzID0gdGhpcy5nZXRZVENoYXJ0cygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2hhcnRzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25TZXJpZURhdGFDaGFuZ2VkKHNlbmRlciwgZXZlbnRBcmdzOiBFdmVudFNlcmllRGF0YUNoYW5nZWRBcmdzKSB7XHJcbiAgICAgICAgaWYgKGV2ZW50QXJncy5hY3Rpb24gPT0gU2VyaWVBY3Rpb24uZGF0YVBvaW50c0NoYW5nZWQpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVTZXJpZURhdGEoc2VuZGVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZXZlbnRBcmdzLmFjdGlvbiA9PSBTZXJpZUFjdGlvbi5jb2xvckNoYW5nZWQpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVTZXJpZUNvbG9yKHNlbmRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogIFVwZGF0ZXMgdGhlIHNlcmllIGRhdGFwb2ludHMgaW4gYWxsIGNoYXJ0cyB3aGVyZSB0aGUgc2VyaWUgaXMgZGlzcGxheWVkXHJcbiAgICAgKiAgSWYgZGF0YXBvaW50cyBub3QgdmFsaWQsIHRoZSBzZXJpZSB3aWxsIGJlIHJlbW92ZWQgZnJvbSB0aGUgY2hhcnRzIG90aGVyd2lzZSBhZGRlZCBpZiBub3QgYWxyZWFkeSBpbiB0aGUgY2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtCYXNlU2VyaWVzfSBzZXJpZXNcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdDaGFydE1hbmFnZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVTZXJpZURhdGEoc2VyaWVzOiBCYXNlU2VyaWVzKSB7XHJcbiAgICAgICAgaWYgKHNlcmllcy5yYXdQb2ludHNWYWxpZCA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAvLyBObyB2YWxpZCBzZXJpZSBkYXRhID0+IHJlbW92ZSBmcm9tIGFsbCBjaGFydHNcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVTZXJpZUZyb21BbGxDaGFydHMoc2VyaWVzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIGFkZCBzZXJpZSB0byBjaGFydCBpZiBub3QgYWxyZWFkeSBpbiBpdCBvdGhlcndpc2UgdXBkYXRlIGNoYXJ0XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9jaGFydE1hbmFnZXJEYXRhTW9kZWwgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2hhcnRzID0gdGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsLmdldENoYXJ0c1VzaW5nU2VyaWUoW3Nlcmllc10pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTZXJpZUluQWxsQ2hhcnRzKGNoYXJ0cywgc2VyaWVzKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlU2VyaWVJbkFsbENoYXJ0cyhjaGFydHM6IElDaGFydE1hbmFnZXJDaGFydFtdLCBzZXJpZXM6IEJhc2VTZXJpZXMpIHtcclxuICAgICAgICBsZXQgc2VyaWVDaGFydFR5cGUgPSBuZXcgU2VyaWVDaGFydFR5cGVIZWxwZXIoKS5nZXRTZXJpZUNoYXJ0VHlwZShzZXJpZXMudHlwZSk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hhcnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjaGFydCA9IHRoaXMuZ2V0Q2hhcnRPYmplY3RCeU5hbWUoY2hhcnRzW2ldLm5hbWUpO1xyXG4gICAgICAgICAgICBpZiAoY2hhcnQgIT0gdW5kZWZpbmVkICYmIHNlcmllQ2hhcnRUeXBlID09IGNoYXJ0LnR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1NlcmllSW5DaGFydChjaGFydCwgc2VyaWVzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFkZCBzZXJpZXMgXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNjYWxlID0gY2hhcnRzW2ldLmdldFlBeGlzRm9yU2VyaWUoc2VyaWVzKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2NhbGUgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpc0ZpcnN0U2VyaWVzSW5DaGFydCA9IHRoaXMuaXNGaXJzdFNlcmllc09mVHlwZUluQ2hhcnRzKHNlcmllcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkU2VyaWVzKFtzZXJpZXNdLCBjaGFydHNbaV0ubmFtZSwgc2NhbGUsIHRoaXMuaXNGaXJzdFNlcmllc09uU2NhbGUoc2VyaWVzLCBzY2FsZSkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzRmlyc3RTZXJpZXNJbkNoYXJ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VyaWVzLnR5cGUgPT0gU2VyaWVzVHlwZS50aW1lU2VyaWVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNldFhSYW5nZXNZVCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoc2VyaWVzWzBdLnR5cGUgPT0gU2VyaWVzVHlwZS5mZnRTZXJpZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2V0WFJhbmdlc0ZGVCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWRyYXdDaGFydHModHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJTY2FsZSBub3QgZm91bmQgZm9yIHNlcmllXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNoYXJ0LnNldEF2YWlsYWJsZVNlcmllc0FzRGF0YVNvdXJjZSgpO1xyXG4gICAgICAgICAgICAgICAgY2hhcnQucmVkcmF3Q2hhcnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGNvbG9yIG9mIHRoZSBzZXJpZSBpbiBhbGwgY2hhcnRzIHdoZXJlIHRoZSBzZXJpZSBpcyBkaXNwbGF5ZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtCYXNlU2VyaWVzfSBzZXJpZVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld0NoYXJ0TWFuYWdlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZVNlcmllQ29sb3Ioc2VyaWU6IEJhc2VTZXJpZXMpIHtcclxuICAgICAgICBpZiAodGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBsZXQgc2VyaWVzID0gbmV3IEFycmF5PEJhc2VTZXJpZXM+KCk7XHJcbiAgICAgICAgICAgIHNlcmllcy5wdXNoKHNlcmllKTtcclxuICAgICAgICAgICAgbGV0IGNoYXJ0cyA9IHRoaXMuX2NoYXJ0TWFuYWdlckRhdGFNb2RlbC5nZXRDaGFydHNVc2luZ1NlcmllKHNlcmllcyk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hhcnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2hhcnQgPSB0aGlzLmdldENoYXJ0T2JqZWN0QnlOYW1lKGNoYXJ0c1tpXS5uYW1lKTtcclxuICAgICAgICAgICAgICAgIGlmIChjaGFydCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBVcGRhdGUgc2VyaWVzIGNvbG9yIGluIHRoZSBjaGFydFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYXJ0LnNldEF2YWlsYWJsZVNlcmllc0FzRGF0YVNvdXJjZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYWRkIHNlcmllIHRvIGNoYXJ0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxCYXNlU2VyaWVzPn0gc2VyaWVzXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY2hhcnROYW1lXHJcbiAgICAgKiBAcGFyYW0ge1NjYWxlfSBzY2FsZVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSB1cGRhdGVSYW5nZVlcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdDaGFydE1hbmFnZXJcclxuICAgICAqL1xyXG4gICAgYWRkU2VyaWVzKHNlcmllczogQXJyYXk8QmFzZVNlcmllcz4sIGNoYXJ0TmFtZTogc3RyaW5nLCBzY2FsZTogU2NhbGUsIHVwZGF0ZVJhbmdlWTogYm9vbGVhbikge1xyXG4gICAgICAgIGxldCBjaGFydCA9IHRoaXMuZ2V0Q2hhcnRPYmplY3RCeU5hbWUoY2hhcnROYW1lKTtcclxuICAgICAgICBpZiAoY2hhcnQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGxldCBheGlzTWluOiBudW1iZXIgfCB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIGxldCBheGlzTWF4OiBudW1iZXIgfCB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgICAgICBsZXQgYXhpc1JhbmdlID0gKGNoYXJ0IGFzIENoYXJ0QmFzZSkuY2hhcnQuZ2V0QXhpcyhzY2FsZS5pZCkhLmdldEF4aXNSYW5nZSgpO1xyXG4gICAgICAgICAgICBpZiAoYXhpc1JhbmdlICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgYXhpc01pbiA9IGF4aXNSYW5nZS5taW47XHJcbiAgICAgICAgICAgICAgICBheGlzTWF4ID0gYXhpc1JhbmdlLm1heFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjaGFydC5hZGRTZXJpZXNUb0NoYXJ0KHNlcmllcywgc2NhbGUpO1xyXG4gICAgICAgICAgICBjaGFydC5zZXRBdmFpbGFibGVTZXJpZXNBc0RhdGFTb3VyY2UoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChheGlzTWluICE9IHVuZGVmaW5lZCAmJiBheGlzTWF4ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgY2hhcnQuc2V0U2NhbGVSYW5nZShzY2FsZSwgc2NhbGUubWluWFZhbHVlLCBzY2FsZS5tYXhYVmFsdWUsIGF4aXNNaW4sIGF4aXNNYXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh1cGRhdGVSYW5nZVkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBheGlzTWluVmFsdWUgPSBjaGFydC5nZXRTZXJpZXNNaW5ZRm9yU2NhbGUoc2NhbGUpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGF4aXNNYXhWYWx1ZSA9IGNoYXJ0LmdldFNlcmllc01heFlGb3JTY2FsZShzY2FsZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGF4aXNNaW5WYWx1ZSAhPSB1bmRlZmluZWQgJiYgYXhpc01heFZhbHVlICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoYXJ0LnVwZGF0ZVJhbmdlWShzY2FsZSwgYXhpc01pblZhbHVlLCBheGlzTWF4VmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNoYXJ0LnJlZHJhd0NoYXJ0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgYWRkWVNjYWxlKHlTY2FsZSwgY2hhcnROYW1lKSB7XHJcbiAgICAgICAgbGV0IGNoYXJ0ID0gdGhpcy5nZXRDaGFydE9iamVjdEJ5TmFtZShjaGFydE5hbWUpO1xyXG4gICAgICAgIGNoYXJ0IS5hZGRZU2NhbGUoeVNjYWxlLCBBeGlzUG9zaXRpb24ucmlnaHQpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlWEF4aXNXaWR0aChjaGFydCEudHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBtb3ZlIG9uZSBzZXJpZSBmcm9tIG9uZSBjaGFydCB0byBhbm90aGVyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtCYXNlU2VyaWVzfSBzZXJpZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNoYXJ0TmFtZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRhcmdldENoYXJ0TmFtZVxyXG4gICAgICogQHBhcmFtIHtTY2FsZX0gdGFyZ2V0U2NhbGVcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdDaGFydE1hbmFnZXJcclxuICAgICAqL1xyXG4gICAgbW92ZVNlcmllKHNlcmllOiBCYXNlU2VyaWVzLCBjaGFydE5hbWU6IHN0cmluZywgdGFyZ2V0Q2hhcnROYW1lOiBzdHJpbmcsIHRhcmdldFNjYWxlOiBTY2FsZSkge1xyXG4gICAgICAgIGlmIChzZXJpZS5yYXdQb2ludHNWYWxpZCA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGxldCBjaGFydCA9IHRoaXMuZ2V0Q2hhcnRPYmplY3RCeU5hbWUoY2hhcnROYW1lKTtcclxuICAgICAgICAgICAgbGV0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcnRPYmplY3RCeU5hbWUodGFyZ2V0Q2hhcnROYW1lKTtcclxuICAgICAgICAgICAgbGV0IHNlcmllcyA9IG5ldyBBcnJheTxCYXNlU2VyaWVzPigpO1xyXG4gICAgICAgICAgICBzZXJpZXMucHVzaChzZXJpZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoY2hhcnQgIT0gdW5kZWZpbmVkICYmIHRhcmdldCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGNoYXJ0LnJlbW92ZVNlcmllRnJvbUNoYXJ0KHNlcmllKTtcclxuICAgICAgICAgICAgICAgIHRhcmdldC5hZGRTZXJpZXNUb0NoYXJ0KHNlcmllcywgdGFyZ2V0U2NhbGUpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNoYXJ0LnNldEF2YWlsYWJsZVNlcmllc0FzRGF0YVNvdXJjZSgpO1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0LnNldEF2YWlsYWJsZVNlcmllc0FzRGF0YVNvdXJjZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVhBeGlzV2lkdGgoY2hhcnQhLnR5cGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlbW92ZSBvbmUgc2VyaWUgZnJvbSBnaXZlbiBjaGFydFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjaGFydE5hbWVcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdDaGFydE1hbmFnZXJcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlU2VyaWUoc2VyaWU6IEJhc2VTZXJpZXMsIGNoYXJ0TmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IGNoYXJ0ID0gdGhpcy5nZXRDaGFydE9iamVjdEJ5TmFtZShjaGFydE5hbWUpO1xyXG4gICAgICAgIGlmIChjaGFydCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgY2hhcnQucmVtb3ZlU2VyaWVGcm9tQ2hhcnQoc2VyaWUpO1xyXG4gICAgICAgICAgICBjaGFydC5zZXRBdmFpbGFibGVTZXJpZXNBc0RhdGFTb3VyY2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjaGFydHNXaXRoU2VyaWUgPSB0aGlzLl9jaGFydE1hbmFnZXJEYXRhTW9kZWwuZ2V0Q2hhcnRzVXNpbmdTZXJpZShbc2VyaWVdKTtcclxuICAgICAgICBpZiAoY2hhcnRzV2l0aFNlcmllLmxlbmd0aCA9PSAwKSB7IC8vIFNlcmllIG5vdCB1c2VkIGluIGFuIG90aGVyIGNoYXJ0ID0+IGRldGFjaCBzZXJpZSBldmVudHNcclxuICAgICAgICAgICAgc2VyaWUuZXZlbnREYXRhQ2hhbmdlZC5kZXRhY2godGhpcy5fb25TZXJpZURhdGFDaGFuZ2VkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlWUF4aXMoeVNjYWxlOiBTY2FsZSwgY2hhcnQ6IENoYXJ0TWFuYWdlckNoYXJ0KSB7XHJcbiAgICAgICAgbGV0IHRyYWNlQ2hhcnQgPSB0aGlzLmdldENoYXJ0T2JqZWN0QnlOYW1lKGNoYXJ0Lm5hbWUpO1xyXG4gICAgICAgIGlmICh0cmFjZUNoYXJ0ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0cmFjZUNoYXJ0LnJlbW92ZVlTY2FsZUZyb21DaGFydCh5U2NhbGUpO1xyXG4gICAgICAgICAgICB0cmFjZUNoYXJ0LnNldEF2YWlsYWJsZVNlcmllc0FzRGF0YVNvdXJjZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVYQXhpc1dpZHRoKGNoYXJ0LmNoYXJ0VHlwZSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmVtb3ZlIGNoYXJ0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNoYXJ0TmFtZVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld0NoYXJ0TWFuYWdlclxyXG4gICAgICovXHJcbiAgICByZW1vdmVDaGFydChjaGFydDogQ2hhcnRNYW5hZ2VyQ2hhcnQpIHtcclxuICAgICAgICBsZXQgdHJhY2VDaGFydCA9IHRoaXMuZ2V0Q2hhcnRPYmplY3RCeU5hbWUoY2hhcnQubmFtZSk7XHJcbiAgICAgICAgaWYgKHRyYWNlQ2hhcnQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlVHJhY2VDaGFydCh0cmFjZUNoYXJ0KTtcclxuXHJcbiAgICAgICAgICAgIGxldCBtaW5YOiBudW1iZXIgfCB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIGxldCBtYXhYOiBudW1iZXIgfCB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRyYWNlQ2hhcnQuc2VyaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobWluWCA9PSB1bmRlZmluZWQgfHwgbWluWCA+IHRyYWNlQ2hhcnQuc2VyaWVzW2ldLm1pblghKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWluWCA9IHRyYWNlQ2hhcnQuc2VyaWVzW2ldLm1pblg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobWF4WCA9PSB1bmRlZmluZWQgfHwgbWF4WCA8IHRyYWNlQ2hhcnQuc2VyaWVzW2ldLm1heFghKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF4WCA9IHRyYWNlQ2hhcnQuc2VyaWVzW2ldLm1heFg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlWEF4aXNXaWR0aChjaGFydC5jaGFydFR5cGUpO1xyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgc2V0UGFubmluZ0F4ZXMoYXhlczogSUNoYXJ0QXhpc1tdKSB7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50cmFjZUNoYXJ0TGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgcGFubmluZ0F4aXMgPSBuZXcgQXJyYXk8SUNoYXJ0QXhpcz4oKTtcclxuICAgICAgICAgICAgaWYgKGF4ZXNbMF0gPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMudHJhY2VDaGFydExpc3RbaV0uc2NhbGVzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGF4aXMgPSB0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLmNoYXJ0LmdldEF4aXModGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5zY2FsZXNbal0uaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChheGlzICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYW5uaW5nQXhpcy5wdXNoKGF4aXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgYXhpcyA9IHRoaXMudHJhY2VDaGFydExpc3RbaV0uY2hhcnQuZ2V0QXhpcyh0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLnByaW1hcnlYQXhpc05hbWUpXHJcbiAgICAgICAgICAgICAgICBpZiAoYXhpcyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBwYW5uaW5nQXhpcy5wdXNoKGF4aXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcGFubmluZ0F4aXMgPSBheGVzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLmNoYXJ0LnNldFBhbm5pbmdBeGVzKHBhbm5pbmdBeGlzKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBzeW5jaHJvbml6ZVNjYWxlWFJhbmdlKHNjYWxlOiBTY2FsZSkge1xyXG4gICAgICAgIGxldCBjaGFydFR5cGUgPSBzY2FsZS5wYXJlbnQuY2hhcnRUeXBlO1xyXG4gICAgICAgIGxldCBtaW4gPSBzY2FsZS5taW5YVmFsdWU7XHJcbiAgICAgICAgbGV0IG1heCA9IHNjYWxlLm1heFhWYWx1ZTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRyYWNlQ2hhcnRMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLnR5cGUgPT0gY2hhcnRUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLm9uU3luY2hyb25pemVTY2FsZVJhbmdlKHNjYWxlLCBtaW4sIG1heCk7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMudHJhY2VDaGFydExpc3RbaV0ucmVkcmF3Q2hhcnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRab29tQXhlc0luQ2hhcnQoY2hhcnQ6IElUcmFjZUNoYXJ0LCB6b29tRGlyZWN0aW9uOiBab29tRGlyZWN0aW9uKTogQXJyYXk8SUNoYXJ0QXhpcz4ge1xyXG4gICAgICAgIGxldCBheGVzID0gbmV3IEFycmF5PElDaGFydEF4aXM+KCk7XHJcblxyXG4gICAgICAgIGlmICh6b29tRGlyZWN0aW9uID09IFpvb21EaXJlY3Rpb24uWFkgfHwgem9vbURpcmVjdGlvbiA9PSBab29tRGlyZWN0aW9uLlgpIHtcclxuICAgICAgICAgICAgbGV0IGF4aXMgPSBjaGFydC5jaGFydC5nZXRBeGlzKGNoYXJ0LnByaW1hcnlYQXhpc05hbWUpO1xyXG4gICAgICAgICAgICBpZiAoYXhpcyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGF4ZXMucHVzaChheGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHpvb21EaXJlY3Rpb24gPT0gWm9vbURpcmVjdGlvbi5YWSB8fCB6b29tRGlyZWN0aW9uID09IFpvb21EaXJlY3Rpb24uWSkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoYXJ0LnNjYWxlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGF4aXMgPSBjaGFydC5jaGFydC5nZXRBeGlzKGNoYXJ0LnNjYWxlc1tpXS5pZCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXhpcyAhPSB1bmRlZmluZWQgJiYgYXhpcy5nZXRBeGlzT3JpZW50YXRpb24oKSA9PSBBeGlzT3JpZW50YXRpb24udmVydGljYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBheGVzLnB1c2goYXhpcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBheGVzO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGaW5kcyBJVHJhY2VDaGFydE9iamVjdCBieSBnaXZlIG5hbWUgYW5kIHJldHVybiBvYmplY3RcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICAgICAqIEByZXR1cm5zIHsoSVRyYWNlQ2hhcnQgfCB1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld0NoYXJ0TWFuYWdlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldENoYXJ0T2JqZWN0QnlOYW1lKG5hbWU6IHN0cmluZyk6IElUcmFjZUNoYXJ0IHwgdW5kZWZpbmVkIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudHJhY2VDaGFydExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudHJhY2VDaGFydExpc3RbaV0ud2lkZ2V0TmFtZSA9PSBuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50cmFjZUNoYXJ0TGlzdFtpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNTZXJpZUluQ2hhcnQoY2hhcnQsIHNlcmllKTogYm9vbGVhbiB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFydC5zZXJpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJ0LnNlcmllc1tpXS5pZCA9PT0gc2VyaWUuaWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKnByaXZhdGUgZ2V0UHJldmlvdXNDaGFydE9iamVjdEJ5TmFtZShuYW1lIDpzdHJpbmcpIDogSVRyYWNlQ2hhcnQgfCB1bmRlZmluZWR7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMudHJhY2VDaGFydExpc3QubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZih0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLndpZGdldE5hbWUgPT0gbmFtZSl7XHJcbiAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9Ki9cclxuXHJcbiAgICBwcml2YXRlIHJlbW92ZVNlcmllRnJvbUFsbENoYXJ0cyhzZXJpZTogQmFzZVNlcmllcykge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50cmFjZUNoYXJ0TGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLnNlcmllcy5tYXAoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHguaWQ7IH0pLmluZGV4T2Yoc2VyaWUuaWQpO1xyXG4gICAgICAgICAgICAvL2NvbnN0IGluZGV4ID0gdGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5zZXJpZXMuaW5kZXhPZihzZXJpZSwgMCk7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLnJlbW92ZVNlcmllRnJvbUNoYXJ0KHRoaXMudHJhY2VDaGFydExpc3RbaV0uc2VyaWVzW2luZGV4XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tSZWZlcmVuY2VDdXJzb3JzSG92ZXJpbmcobW91c2VQb2ludDogSVBvaW50LCB0cmFjZUNoYXJ0OiBJVHJhY2VDaGFydCk6IHZvaWR7XHJcbiAgICAgICAgdHJhY2VDaGFydC5jaGVja0N1cnNvcnNIb3ZlcmluZyhtb3VzZVBvaW50KTtcclxuICAgIH1cclxuXHJcbiAgICBkcmFnQ3Vyc29yQWxvbmdMaW5lKHRyYWNlQ2hhcnQ6IElUcmFjZUNoYXJ0LCBtb3ZlbWVudFg6IG51bWJlciwgbW92ZW1lbnRZOiBudW1iZXIpOiB2b2lke1xyXG4gICAgICAgIHRyYWNlQ2hhcnQuZHJhZ0N1cnNvckFsb25nTGluZShtb3ZlbWVudFgsIG1vdmVtZW50WSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Q3Vyc29yT25Qb2ludGVyUG9zaXRpb24odHJhY2VDaGFydCA6IElUcmFjZUNoYXJ0LCBtb3VzZVBvaW50OiBJUG9pbnQpe1xyXG4gICAgICAgIHRyYWNlQ2hhcnQuc2V0Q3Vyc29yT25Qb2ludGVyUG9zaXRpb24obW91c2VQb2ludCk7XHJcbiAgICB9XHJcblxyXG4gICAgZG9QYW5uaW5nKHRyYWNlQ2hhcnQ6IElUcmFjZUNoYXJ0LCBtb3VzZVBvaW50WDogbnVtYmVyLCBtb3VzZVBvaW50WTogbnVtYmVyKTogdm9pZHtcclxuICAgICAgICB0cmFjZUNoYXJ0LmRvUGFubmluZyhtb3VzZVBvaW50WCwgbW91c2VQb2ludFkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc2V0UGFubmluZ0Nvb3Jkcygpe1xyXG4gICAgICAgIGZvcihsZXQgY2hhcnQgb2YgdGhpcy50cmFjZUNoYXJ0TGlzdCl7XHJcbiAgICAgICAgICAgIGNoYXJ0LnJlc2V0UGFubmluZ0Nvb3JkcygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcmVzZXRab29tKCkge1xyXG4gICAgICAgIGxldCBjaGFydFJhbmdlSGVscGVyID0gbmV3IENoYXJ0UmFuZ2VIZWxwZXIoKTtcclxuXHJcbiAgICAgICAgY2hhcnRSYW5nZUhlbHBlci5yZXNldENoYXJ0UmFuZ2VzWCh0aGlzLnRyYWNlQ2hhcnRMaXN0KTtcclxuICAgICAgICBjaGFydFJhbmdlSGVscGVyLnVwZGF0ZUNoYXJ0UmFuZ2VzWSh0aGlzLnRyYWNlQ2hhcnRMaXN0KTtcclxuICAgICAgICB0aGlzLnJlZHJhd0NoYXJ0cyh0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICByZXNldFhSYW5nZXNGRlQoKSB7XHJcbiAgICAgICAgbGV0IGZmdENoYXJ0czogQXJyYXk8RkZUQ2hhcnQ+ID0gdGhpcy5nZXRGRlRDaGFydHMoKTtcclxuICAgICAgICBuZXcgQ2hhcnRSYW5nZUhlbHBlcigpLnJlc2V0Q2hhcnRSYW5nZXNYKGZmdENoYXJ0cyk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJlc2V0WFJhbmdlc1lUKCkge1xyXG4gICAgICAgIGxldCB5dENoYXJ0czogQXJyYXk8WVRDaGFydD4gPSB0aGlzLmdldFlUQ2hhcnRzKCk7XHJcbiAgICAgICAgbmV3IENoYXJ0UmFuZ2VIZWxwZXIoKS5yZXNldENoYXJ0UmFuZ2VzWCh5dENoYXJ0cyk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGF1dG9TY2FsZSgpIHtcclxuICAgICAgICBsZXQgY2hhcnRSYW5nZUhlbHBlciA9IG5ldyBDaGFydFJhbmdlSGVscGVyKCk7XHJcbiAgICAgICAgZm9yIChsZXQgY2hhcnQgb2YgdGhpcy50cmFjZUNoYXJ0TGlzdCkge1xyXG4gICAgICAgICAgICBjaGFydC5yZXNldFlTY2FsZXNDaGFydFpvb20oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNoYXJ0UmFuZ2VIZWxwZXIucmVzZXRDaGFydFJhbmdlc1godGhpcy50cmFjZUNoYXJ0TGlzdCk7XHJcbiAgICAgICAgdGhpcy5yZWRyYXdDaGFydHModHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Q2hhcnRab29tQXhlcyhheGVzOiBab29tRGlyZWN0aW9uKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRyYWNlQ2hhcnRMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMudHJhY2VDaGFydExpc3RbaV0uc2V0Wm9vbUF4ZXMoYXhlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2hhcnRWaWV3V2lkZ2V0LmFjdGl2ZVNlbGVjdGVkWm9vbUF4aXMgPSBheGVzO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFBhbm5pbmcoZW5hYmxlOiBib29sZWFuKTogYW55IHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudHJhY2VDaGFydExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5zZXRQYW5uaW5nKGVuYWJsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldEJveFpvb20oZW5hYmxlOiBib29sZWFuKTogYW55IHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudHJhY2VDaGFydExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5zZXRCb3hab29tKGVuYWJsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlZHJhd0NoYXJ0cyhmb3JjZVJlZHJhdzogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRyYWNlQ2hhcnRMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChmb3JjZVJlZHJhdyA9PSB0cnVlIHx8IHRoaXMudHJhY2VDaGFydExpc3RbaV0udHlwZSAhPSBDaGFydFR5cGUuWFlDaGFydCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5yZWRyYXdDaGFydCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25Vc2VyQ2hhcnRJbnRlcmFjdGlvbihzZW5kZXIsIGV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb25BcmdzOiBFdmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncykge1xyXG4gICAgICAgIHRoaXMuY2hhcnRWaWV3V2lkZ2V0Lm9uVXNlckNoYXJ0SW50ZXJhY3Rpb24oc2VuZGVyLCBldmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncylcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkRHJvcHBhYmxlTG9jYXRpb25zKGRhdGEsIHNhbWVHcm91cDogYm9vbGVhbikge1xyXG4gICAgICAgIGxldCBzZXJpZUNoYXJ0VHlwZUhlbHBlciA9IG5ldyBTZXJpZUNoYXJ0VHlwZUhlbHBlcigpO1xyXG4gICAgICAgIGZvciAobGV0IGNoYXJ0IG9mIHRoaXMudHJhY2VDaGFydExpc3QpIHtcclxuICAgICAgICAgICAgbGV0IGNoYXJ0TWFuYWdlckNoYXJ0ID0gdGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsLmdldENoYXJ0KGNoYXJ0LndpZGdldE5hbWUpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHNlcmllQ2hhcnRUeXBlID0gc2VyaWVDaGFydFR5cGVIZWxwZXIuZ2V0U2VyaWVDaGFydFR5cGUoZGF0YVswXS50eXBlKTtcclxuICAgICAgICAgICAgc2VyaWVDaGFydFR5cGVIZWxwZXIuc2V0RHJvcFBvc3NpYmxlQXJlYXMoY2hhcnRNYW5hZ2VyQ2hhcnQhLCBkYXRhLCBzZXJpZUNoYXJ0VHlwZSwgc2FtZUdyb3VwKTtcclxuICAgICAgICAgICAgY2hhcnQuYWRkU2VyaWVEcm9wTG9jYXRpb25zKGRhdGEsIGNoYXJ0TWFuYWdlckNoYXJ0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBkcm9wSGVscGVyID0gbmV3IENoYXJ0RHJvcEhlbHBlcih0aGlzLl9jaGFydE1hbmFnZXJEYXRhTW9kZWwsIHRoaXMuY2hhcnRWaWV3V2lkZ2V0KTtcclxuICAgICAgICAvLyBBZGQgZW1wdHkgc3BhY2UgZHJvcCBsb2NhdGlvblxyXG4gICAgICAgIGlmIChkcm9wSGVscGVyLmNhbkFkZENoYXJ0KCkgPT0gdHJ1ZSkgeyAvLyBJcyBpdCBwb3NzaWJsZSB0byBhZGQgb25lIG1vcmUgY2hhcnRcclxuICAgICAgICAgICAgbGV0IGVtcHR5U3BhY2VFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5sYXlvdXRNYW5hZ2VyLmNoYXJ0U3BsaXR0ZXIucGFyZW50Q29udGVudElkICsgXCJfbGFzdFBhbmVcIik7XHJcbiAgICAgICAgICAgIGxldCBzY3JvbGxCYXJXaWR0aCA9ICQoJyMnICsgdGhpcy5sYXlvdXRNYW5hZ2VyLmNoYXJ0U3BsaXR0ZXJQYXJlbnRDb250YWluZXJJZClbMF0ub2Zmc2V0V2lkdGggLSAkKCcjJyArIHRoaXMubGF5b3V0TWFuYWdlci5jaGFydFNwbGl0dGVyQ29udGFpbmVySWQpWzBdLm9mZnNldFdpZHRoO1xyXG4gICAgICAgICAgICBpZiAoZW1wdHlTcGFjZUVsZW1lbnQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBlbXB0eVNwYWNlRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiYSgxMjUsMTYwLDE2NSwgMC4yKSc7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YVswXS50eXBlID09IFNlcmllc1R5cGUudGltZVNlcmllcyAmJiBkYXRhLmxlbmd0aCA+IDIgfHwgIXNhbWVHcm91cCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2hhcnRUeXBlQXJlYXMoZW1wdHlTcGFjZUVsZW1lbnQsIFt0cnVlLCBmYWxzZSwgdHJ1ZV0sIHNjcm9sbEJhcldpZHRoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRhdGFbMF0udHlwZSA9PSBTZXJpZXNUeXBlLnRpbWVTZXJpZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZENoYXJ0VHlwZUFyZWFzKGVtcHR5U3BhY2VFbGVtZW50LCBbdHJ1ZSwgdHJ1ZSwgdHJ1ZV0sIHNjcm9sbEJhcldpZHRoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRhdGFbMF0udHlwZSA9PSBTZXJpZXNUeXBlLnh5U2VyaWVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRDaGFydFR5cGVBcmVhcyhlbXB0eVNwYWNlRWxlbWVudCwgW2ZhbHNlLCB0cnVlLCBmYWxzZV0sIHNjcm9sbEJhcldpZHRoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRhdGFbMF0udHlwZSA9PSBTZXJpZXNUeXBlLmZmdFNlcmllcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2hhcnRUeXBlQXJlYXMoZW1wdHlTcGFjZUVsZW1lbnQsIFtmYWxzZSwgZmFsc2UsIHRydWVdLCBzY3JvbGxCYXJXaWR0aCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhZGRDaGFydFR5cGVBcmVhcyhwYXJlbnQ6IEhUTUxFbGVtZW50LCBlbmFibGVkOiBBcnJheTxib29sZWFuPiwgc2Nyb2xsQmFyV2lkdGgpIHtcclxuICAgICAgICBsZXQgY2hhcnROYW1lcyA9IFsnWVQnLCAnWFknLCAnRkZUJ107XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGFydE5hbWVzLmxlbmd0aDsgaSA9IGkgKyAxKSB7XHJcbiAgICAgICAgICAgIGxldCBhcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGFyZWEuaWQgPSBwYXJlbnQuaWQgKyAnXycgKyBjaGFydE5hbWVzW2ldO1xyXG4gICAgICAgICAgICBhcmVhLmNsYXNzTGlzdC5hZGQoJ2NoYXJ0VHlwZXMnKTtcclxuICAgICAgICAgICAgaWYgKCFlbmFibGVkW2ldKSB7XHJcbiAgICAgICAgICAgICAgICBhcmVhLmNsYXNzTGlzdC5hZGQoJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGFyZWEuc3R5bGUud2lkdGggPSAoKHBhcmVudC5vZmZzZXRXaWR0aCAtIHNjcm9sbEJhcldpZHRoKSAvIGNoYXJ0TmFtZXMubGVuZ3RoKS50b1N0cmluZygpICsgJ3B4JztcclxuXHJcbiAgICAgICAgICAgIGxldCBpbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XHJcbiAgICAgICAgICAgIGltYWdlLnNyYyA9ICcuL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9jaGFydFR5cGUnICsgY2hhcnROYW1lc1tpXSArICcuc3ZnJztcclxuICAgICAgICAgICAgaW1hZ2UuY2xhc3NMaXN0LmFkZCgnaW1hZ2VDaGFydCcpO1xyXG5cclxuICAgICAgICAgICAgYXJlYS5hcHBlbmRDaGlsZChpbWFnZSk7XHJcbiAgICAgICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChhcmVhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZURyb3BwYWJsZUxvY2F0aW9ucygpIHtcclxuICAgICAgICBmb3IgKGxldCBjaGFydCBvZiB0aGlzLnRyYWNlQ2hhcnRMaXN0KSB7XHJcbiAgICAgICAgICAgIGNoYXJ0LnJlbW92ZVNlcmllRHJvcExvY2F0aW9ucygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBSZW1vdmUgZW1wdHkgc3BhY2UgZHJvcCBsb2NhdGlvblxyXG4gICAgICAgIGxldCBlbXB0eVNwYWNlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMubGF5b3V0TWFuYWdlci5jaGFydFNwbGl0dGVyLnBhcmVudENvbnRlbnRJZCArIFwiX2xhc3RQYW5lXCIpO1xyXG4gICAgICAgIGlmIChlbXB0eVNwYWNlRWxlbWVudCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgbGV0IHR5cGVPZkNoYXJ0cyA9IGVtcHR5U3BhY2VFbGVtZW50LmNoaWxkcmVuLmxlbmd0aDtcclxuICAgICAgICAgICAgZW1wdHlTcGFjZUVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNmZmYnO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHR5cGVPZkNoYXJ0czsgaSA9IGkgKyAxKSB7XHJcbiAgICAgICAgICAgICAgICBlbXB0eVNwYWNlRWxlbWVudC5jaGlsZHJlblswXS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlWEF4aXNXaWR0aChjaGFydFR5cGU6IENoYXJ0VHlwZSkge1xyXG4gICAgICAgIGxldCBtYXhZQXhlcyA9IDA7XHJcbiAgICAgICAgbGV0IGNoYXJ0QXJlYTogUmVjdGFuZ2xlIHwgdW5kZWZpbmVkO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50cmFjZUNoYXJ0TGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50cmFjZUNoYXJ0TGlzdFtpXS50eXBlID09IGNoYXJ0VHlwZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5jaGFydC5yZWRyYXcoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbnVtYmVyT2ZZQXhlc0luQ2hhcnQgPSB0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLmdldE51bWJlck9mWVNjYWxlcygpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG51bWJlck9mWUF4ZXNJbkNoYXJ0ID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBudW1iZXJPZllBeGVzSW5DaGFydCA9IDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy9pZiBvbmUgY2hhcnQgaGFzIG1vcmUgYXhpcyB0aGFuIHRoZSBvdGhlcnMgdXNlIGl0cyB3aWR0aCwgaWYgdGhleSBoYXZlIHRoZSBzYW1lIGFtb3VudCB1c2UgdGhlIG9uZSB3aXRoIHRoZSBoaWdoZXIgd2lkdGhcclxuICAgICAgICAgICAgICAgIGlmIChudW1iZXJPZllBeGVzSW5DaGFydCA+IG1heFlBeGVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF4WUF4ZXMgPSBudW1iZXJPZllBeGVzSW5DaGFydDtcclxuICAgICAgICAgICAgICAgICAgICBjaGFydEFyZWEgPSB0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLmNoYXJ0LmdldENoYXJ0QXJlYSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobnVtYmVyT2ZZQXhlc0luQ2hhcnQgPT0gbWF4WUF4ZXMgJiYgdGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5jaGFydC5nZXRDaGFydEFyZWEoKS53aWR0aCA+IGNoYXJ0QXJlYSEud2lkdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBjaGFydEFyZWEgPSB0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLmNoYXJ0LmdldENoYXJ0QXJlYSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY2hhcnRBcmVhICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLmFsaWduWUF4ZXMoY2hhcnRBcmVhLCBjaGFydFR5cGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFsaWduWUF4ZXMoY2hhcnRBcmVhOiBSZWN0YW5nbGUsIGNoYXJ0VHlwZTogQ2hhcnRUeXBlKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRyYWNlQ2hhcnRMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLnR5cGUgPT0gY2hhcnRUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3Q2hhcnRBcmVhID0geyB4OiBjaGFydEFyZWEueCwgeTogY2hhcnRBcmVhLnksIHdpZHRoOiBjaGFydEFyZWEud2lkdGgsIGhlaWdodDogdGhpcy50cmFjZUNoYXJ0TGlzdFtpXS5jaGFydC5nZXRDaGFydEFyZWEoKS5oZWlnaHQgfTtcclxuICAgICAgICAgICAgICAgIHRoaXMudHJhY2VDaGFydExpc3RbaV0uY2hhcnQuc2V0Q2hhcnRBcmVhKG5ld0NoYXJ0QXJlYSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyYWNlQ2hhcnRMaXN0W2ldLnJlZHJhd0NoYXJ0KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0WVRDaGFydHMoKTogWVRDaGFydFtdIHtcclxuICAgICAgICBsZXQgeXRDaGFydHM6IFlUQ2hhcnRbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGNoYXJ0IG9mIHRoaXMudHJhY2VDaGFydExpc3QpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJ0LnR5cGUgPT0gQ2hhcnRUeXBlLllUQ2hhcnQpIHtcclxuICAgICAgICAgICAgICAgIHl0Q2hhcnRzLnB1c2goY2hhcnQgYXMgWVRDaGFydCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB5dENoYXJ0cztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEZGVENoYXJ0cygpOiBGRlRDaGFydFtdIHtcclxuICAgICAgICBsZXQgZmZ0Q2hhcnRzOiBGRlRDaGFydFtdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgY2hhcnQgb2YgdGhpcy50cmFjZUNoYXJ0TGlzdCkge1xyXG4gICAgICAgICAgICBpZiAoY2hhcnQudHlwZSA9PSBDaGFydFR5cGUuRkZUQ2hhcnQpIHtcclxuICAgICAgICAgICAgICAgIGZmdENoYXJ0cy5wdXNoKGNoYXJ0IGFzIEZGVENoYXJ0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZmdENoYXJ0cztcclxuICAgIH1cclxufSJdfQ==