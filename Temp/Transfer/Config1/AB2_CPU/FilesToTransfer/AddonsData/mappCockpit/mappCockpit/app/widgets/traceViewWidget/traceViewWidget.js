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
define(["require", "exports", "../../widgets/widgets", "../../models/dataModels", "../../common/dateTimeHelper", "../../models/signalManagerDataModel/signalCategory", "../../models/common/signal/serieGroup", "../../models/common/signal/signal", "../../models/common/point", "../../common/colorHelper", "../common/busyInformation", "../common/viewTypeProvider", "../../models/chartManagerDataModel/chartManagerChart", "../../models/chartManagerDataModel/chartManagerDataModel", "../../models/diagnostics/trace/traceConfig/traceConfigDefines", "../../models/chartManagerDataModel/YTSeries", "../common/viewBase", "../common/states/cursorStates", "../chartViewWidget/helpers/chartDropHelper", "../chartViewWidget/insertedInfo", "../../models/signalManagerDataModel/signalManagerCalculation", "../../models/chartManagerDataModel/scale", "../chartViewWidget/ChartBase", "../common/SerieChartTypeHelper", "../../models/chartManagerDataModel/seriesType"], function (require, exports, Widgets, DataModels, dateTimeHelper_1, signalCategory_1, serieGroup_1, signal_1, point_1, colorHelper_1, busyInformation_1, viewTypeProvider_1, chartManagerChart_1, chartManagerDataModel_1, traceConfigDefines_1, YTSeries_1, viewBase_1, cursorStates_1, chartDropHelper_1, insertedInfo_1, signalManagerCalculation_1, scale_1, ChartBase_1, SerieChartTypeHelper_1, seriesType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TraceViewWidget = /** @class */ (function (_super) {
        __extends(TraceViewWidget, _super);
        function TraceViewWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._isLoadingTraceData = false;
            _this._widgetIsActive = true;
            _this.cursorStatesId = "CursorStates";
            // Event handlers
            _this._contentActivatedHandler = function (sender, args) { return _this.onContentActivated(sender, args); };
            _this._chartViewWidgetDropChangedHandler = function (sender, args) { return _this.onDropChanged(sender, args); };
            _this._signalManagerWidgetSerieDoubleClickedHandler = function (sender, data) { return _this.onSignalManagerWidgetSerieDoubleClicked(sender, data); };
            _this._signalManagerWidgetChangeSizeHandler = function (sender, data) { return _this.onSignalManagerWidgetChangeSize(sender, data); };
            _this._signalManagerSignalRemovedHandler = function (sender, data) { return _this.onSignalManagerSignalRemoved(sender, data); };
            _this._chartManagerWidgetdropHelperHandler = function (sender, args) { return _this.onDropChanged(sender, args); };
            _this._chartManagerModelChangedHandler = function (sender, data) { return _this.onChartManagerModelChanged(sender, data); };
            return _this;
        }
        /**
         * Initialize the widget
         *
         * @param {string} layoutContainerId
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.initialize = function (layoutContainerId) {
            _super.prototype.initialize.call(this, layoutContainerId);
            this.states.observe(cursorStates_1.CursorStates, function (modifiedItem, item) {
                // observedItem = modifiedItem;
                modifiedItem;
                item;
            }, this.cursorStatesId);
        };
        /**
         * Creates the layout of the widget
         *
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.createLayout = function () {
            this._layoutWidget = Widgets.SplitterWidget.create();
            this.attachLayoutToView(this);
            this._layoutWidget.initialize(this.parentContentId);
            this._layoutWidget.eventWidgetActivated.attach(this._contentActivatedHandler);
        };
        /**
         * Creates the widget content and eventually subwidgets
         *
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.createWidgets = function () {
            this.createTraceControlWidget();
            this.createInnerWidget();
            this.initializeLayout();
        };
        /**
         * creates the trace control widget
         *
         * @returns {*}
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.createTraceControlWidget = function () {
            this._traceControlWidget = Widgets.TraceControlWidget.create();
            this._layoutWidget.addWidget(this._traceControlWidget, "TraceController", viewTypeProvider_1.ViewType.Default, -1);
        };
        /**
         *  Create the inner layout and widgets
         *
         * @private
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.createInnerWidget = function () {
            this.createInnerLayout();
            this.createInnerWidgets();
        };
        /**
         * Create the inner widgets (signalmanager, chart view, chartmanager/cursorinfo)
         *
         * @private
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.createInnerWidgets = function () {
            // Create datamodel for the widgets
            this.createSignalManagerDataModel();
            this.createChartManagerDataModel();
            // Create left widget
            this.createSignalManagerWidget();
            this.attachSignalManagerWidgetEvents();
            // Create the middle widget
            this.createChartViewWidget();
            // Create the widgets on the right side
            this.createRightLayout();
            this.createRightWidgets();
            this.initializeInnerLayout();
            this.attachSignalManagerDataModelEvents();
        };
        /**
         * Creates the right widgets (chartmanager, cursorinfo)
         *
         * @private
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.createRightWidgets = function () {
            // Create the chart manager widget on top
            this.createChartManagerWidget();
            // Create the cursor info widget on bottom
            this.createCursorInfoWidget();
            this.initializeRightLayout();
            this.attachChartManagerDataModelEvents();
        };
        /**
         * Creates the inner layout
         *
         * @private
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.createInnerLayout = function () {
            this._innerLayoutWidget = Widgets.SplitterWidget.create();
            this._layoutWidget.addWidget(this._innerLayoutWidget, "bottomSplitter", viewTypeProvider_1.ViewType.Default, -1);
        };
        /**
         * Creates the right layout
         *
         * @private
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.createRightLayout = function () {
            this._rightLayoutWidget = Widgets.SplitterWidget.create();
            this._innerLayoutWidget.addWidget(this._rightLayoutWidget, "rightSplitter", viewTypeProvider_1.ViewType.Default, -1);
        };
        /**
         * Activate the widget
         *
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.activate = function () {
            this._layoutWidget.activate();
            this._innerLayoutWidget.activate();
        };
        TraceViewWidget.prototype.dispose = function () {
            this._widgetIsActive = false;
            this._layoutWidget.dispose();
            // Detach events
            this.detachEvents();
            // Dispose datamodels
            this.disposeDataModels();
            _super.prototype.dispose.call(this);
        };
        /**
         * Detaches all events
         *
         * @private
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.detachEvents = function () {
            this.detachChartViewWidgetEvents();
            this.detachSignalManagerWidgetEvents();
            this.detachSignalManagerDataModelEvents();
            this.detachChartManagerWidgetEvents();
            this.detachChartManagerDataModelEvents();
            this._layoutWidget.eventWidgetActivated.detach(this._contentActivatedHandler);
            this._chartManagerDataModel.dispose();
        };
        /**
         * Dispose all data models
         *
         * @private
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.disposeDataModels = function () {
            if (this._signalManagerDataModel != undefined) {
                this._signalManagerDataModel.dispose();
            }
            if (this._chartManagerDataModel != undefined) {
                this._chartManagerDataModel.dispose();
            }
        };
        /** resizes the trace configuration widget
         *
         * @param {number} width
         * @param {number} height
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.resize = function (width, height) {
            this._actualWidth = width;
            this._actualHeight = height;
            if (this._layoutWidget != undefined) {
                this._layoutWidget.resize(width, height);
            }
        };
        TraceViewWidget.prototype.initializeLayout = function () {
            var keys = Object.keys(this._layoutWidget.layoutPanes);
            if (keys.length == 2) {
                this._layoutWidget.setOrientation(true);
                // Set initial pane sizes and settings
                var key0 = keys[0];
                this._layoutWidget.layoutPanes[key0].size = 40;
                this._layoutWidget.layoutPanes[key0].expandable = false;
                this._layoutWidget.layoutPanes[key0].collapsible = false;
                this._layoutWidget.layoutPanes[key0].resizable = false;
                var key1 = keys[1];
                this._layoutWidget.layoutPanes[key1].size = 0;
                this._layoutWidget.layoutPanes[key1].fillSpace = true;
                this._layoutWidget.layoutPanes[key1].expandable = false;
                this._layoutWidget.layoutPanes[key1].collapsible = false;
                // Redraw the layout
                this._layoutWidget.recalculateLayout();
            }
        };
        TraceViewWidget.prototype.initializeInnerLayout = function () {
            var keys = Object.keys(this._innerLayoutWidget.layoutPanes);
            if (keys.length == 3) {
                // Set initial pane sizes and settings
                var key0 = keys[0];
                this._innerLayoutWidget.layoutPanes[key0].size = 350;
                this._innerLayoutWidget.layoutPanes[key0].expandable = false;
                this._innerLayoutWidget.layoutPanes[key0].collapsible = false;
                var key1 = keys[1];
                this._innerLayoutWidget.layoutPanes[key1].size = 0;
                this._innerLayoutWidget.layoutPanes[key1].fillSpace = true;
                this._innerLayoutWidget.layoutPanes[key1].expandable = false;
                this._innerLayoutWidget.layoutPanes[key1].collapsible = false;
                var key2 = keys[2];
                this._innerLayoutWidget.layoutPanes[key2].size = 300;
                this._innerLayoutWidget.layoutPanes[key2].expandable = false;
                this._innerLayoutWidget.layoutPanes[key2].collapsible = false;
                // Redraw the layout
                this._innerLayoutWidget.recalculateLayout();
            }
        };
        TraceViewWidget.prototype.initializeRightLayout = function () {
            var keys = Object.keys(this._rightLayoutWidget.layoutPanes);
            if (keys.length == 2) {
                this._rightLayoutWidget.setOrientation(true);
                // Set initial pane sizes and settings
                var key0 = keys[0];
                this._rightLayoutWidget.layoutPanes[key0].size = 0;
                this._rightLayoutWidget.layoutPanes[key0].fillSpace = true;
                this._rightLayoutWidget.layoutPanes[key0].expandable = false;
                this._rightLayoutWidget.layoutPanes[key0].collapsible = false;
                var key1 = keys[1];
                this._rightLayoutWidget.layoutPanes[key1].size = 300;
                this._rightLayoutWidget.layoutPanes[key1].expandable = false;
                this._rightLayoutWidget.layoutPanes[key1].collapsible = false;
                // Redraw the layout
                this._rightLayoutWidget.recalculateLayout();
            }
        };
        TraceViewWidget.prototype.onContentActivated = function (sender, args) {
            args.widget.activate();
            this.resize(this._actualWidth, this._actualHeight);
        };
        /**
         * Creates the signal manager datamodel
         *
         * @private
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.createSignalManagerDataModel = function () {
            this._signalManagerDataModel = DataModels.SignalManagerDataModel.create();
            this._signalManagerDataModel.initialize();
        };
        /**
         * Creates the chart manager datamodel
         *
         * @private
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.createChartManagerDataModel = function () {
            this._chartManagerDataModel = DataModels.ChartManagerDataModel.create();
            this._chartManagerDataModel.initialize();
        };
        /**
         * Creates the signal manager widget
         *
         * @private
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.createSignalManagerWidget = function () {
            this._signalManagerWidget = Widgets.SignalManagerWidget.create();
            this._signalManagerWidget.dataModel = this._signalManagerDataModel;
            this._innerLayoutWidget.addWidget(this._signalManagerWidget, "SignalManager", viewTypeProvider_1.ViewType.Default, -1);
        };
        /**
         * Creates the chart view widget
         *
         * @private
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.createChartViewWidget = function () {
            this._chartViewWidget = Widgets.ChartViewWidget.create();
            this._chartViewWidget.dataModel = this._chartManagerDataModel;
            this._chartViewWidget.eventDropHelper.attach(this._chartViewWidgetDropChangedHandler);
            this._innerLayoutWidget.addWidget(this._chartViewWidget, "ChartView", viewTypeProvider_1.ViewType.Default, -1);
        };
        TraceViewWidget.prototype.detachChartViewWidgetEvents = function () {
            if (this._chartViewWidget != undefined) {
                this._chartViewWidget.eventDropHelper.detach(this._chartViewWidgetDropChangedHandler);
            }
        };
        /**
         * Called when a D&D operation has been done
         *
         * @private
         * @param {*} sender
         * @param {*} args
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.onDropChanged = function (sender, args) {
            switch (args.hint) {
                case chartDropHelper_1.ChartDropHelperChangedHint.createChart: {
                    //creates a chart an adds its series
                    var chartName = this._chartManagerDataModel.getUniqueChartName();
                    var chartManagerChart = new chartManagerChart_1.ChartManagerChart(chartName, args.data.type);
                    this._chartManagerDataModel.addChart(chartManagerChart, -1);
                    if (args.data.series != undefined) {
                        var yAxisId = chartManagerChart.getDefaultYAxisId();
                        var series = args.data.series;
                        if (args.data.type != chartManagerChart_1.ChartType.YTChart && args.data.series[0].type == seriesType_1.SeriesType.timeSeries) {
                            if (args.data.type == chartManagerChart_1.ChartType.XYChart) {
                                series = new Array();
                                series.push(this.createXYSerie(args.data.series[0].parent, args.data.series));
                            }
                            else if (args.data.type == chartManagerChart_1.ChartType.FFTChart) {
                                series = new Array();
                                for (var i = 0; i < args.data.series.length; i++) {
                                    series.push(this.createFFTSerie(args.data.series[i].parent, args.data.series[i]));
                                }
                            }
                            if (!this._signalManagerWidget.editModeActive && args.data.type == chartManagerChart_1.ChartType.XYChart) {
                                this._signalManagerWidget.activateEditMode(true);
                            }
                        }
                        //Add all dragged series to the chart.
                        this.addSerieToChart(series, chartManagerChart, yAxisId);
                    }
                    break;
                }
                case chartDropHelper_1.ChartDropHelperChangedHint.addSerie: {
                    var series = args.data.series;
                    var chart = args.data.chart;
                    var yAxis = args.data.yAxis;
                    if (chart != undefined) {
                        var yAxisId = this.getYAxisId(sender, chart, yAxis, args.data.targetChart);
                        //insert serie to empty a chart
                        this.addSerieToChart(series, chart, yAxisId);
                    }
                    break;
                }
                case chartDropHelper_1.ChartDropHelperChangedHint.createXYSerie: {
                    //Creates XY serie and adds it to the XY chart
                    var chartManagerChart = args.data.chart;
                    var series = new Array();
                    series.push(this.createXYSerie(args.data.series[0].parent, args.data.series));
                    var yAxisId = chartManagerChart.getDefaultYAxisId();
                    //Add all dragged series to the chart.
                    this.addSerieToChart(series, chartManagerChart, yAxisId);
                    break;
                }
                case chartDropHelper_1.ChartDropHelperChangedHint.createFFTSerie: {
                    //Creates FFT serie and add it to the FFT chart
                    var chart = args.data.chart;
                    var series = new Array();
                    for (var i = 0; i < args.data.series.length; i++) {
                        series.push(this.createFFTSerie(args.data.series[i].parent, args.data.series[i]));
                    }
                    var yAxis = args.data.yAxis;
                    var yAxisId = this.getYAxisId(sender, chart, yAxis, args.data.targetChart);
                    //Add all dragged series to the chart.
                    this.addSerieToChart(series, chart, yAxisId);
                }
            }
        };
        /**
         * Creates the chart manager widget
         *
         * @private
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.createChartManagerWidget = function () {
            this._chartManagerWidget = Widgets.ChartManagerWidget.create();
            this._chartManagerWidget.dataModel = this._chartManagerDataModel;
            this._chartManagerWidget.eventDropHelper.attach(this._chartManagerWidgetdropHelperHandler);
            this._rightLayoutWidget.addWidget(this._chartManagerWidget, "ChartManager", viewTypeProvider_1.ViewType.Default, -1);
        };
        /**
         * Creates the cursor info widget
         *
         * @private
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.createCursorInfoWidget = function () {
            this._cursorInfoWidget = Widgets.CursorInfoWidget.create();
            this._rightLayoutWidget.addWidget(this._cursorInfoWidget, "CursorInfo", viewTypeProvider_1.ViewType.Default, -1);
        };
        /**
         * Attaches the signal manager widget events
         *
         * @private
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.attachSignalManagerWidgetEvents = function () {
            if (this._signalManagerWidget != undefined) {
                this._signalManagerWidget.eventSerieDoubleClicked.attach(this._signalManagerWidgetSerieDoubleClickedHandler);
                this._signalManagerWidget.eventChangeSize.attach(this._signalManagerWidgetChangeSizeHandler);
            }
        };
        /**
         * Detaches the signal manager widget events
         *
         * @private
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.detachSignalManagerWidgetEvents = function () {
            if (this._signalManagerWidget != undefined) {
                this._signalManagerWidget.eventSerieDoubleClicked.detach(this._signalManagerWidgetSerieDoubleClickedHandler);
                this._signalManagerWidget.eventChangeSize.detach(this._signalManagerWidgetChangeSizeHandler);
            }
        };
        TraceViewWidget.prototype.onSignalManagerWidgetSerieDoubleClicked = function (sender, serie) {
            this.addNewChart(serie);
        };
        TraceViewWidget.prototype.onSignalManagerWidgetChangeSize = function (sender, newSize) {
            this._innerLayoutWidget.resizeWidget(sender, newSize);
        };
        /**
         * Adds a new chart to the chartmanager datamodel(if possible => max chart number) and adds the given signal to the new chart
         *
         * @private
         * @param {BaseSeries} serie
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.addNewChart = function (serie) {
            if (this._chartManagerDataModel) {
                var newChartName = this._chartManagerDataModel.getUniqueChartName();
                var serieChartType = new SerieChartTypeHelper_1.SerieChartTypeHelper().getSerieChartType(serie.type);
                var newChart = new chartManagerChart_1.ChartManagerChart(newChartName, serieChartType);
                var isChartAdded = this._chartManagerDataModel.addChart(newChart, 0);
                if (serie != undefined && isChartAdded) {
                    var series = new Array();
                    series.push(serie);
                    var yAxis = newChart.getYScale(newChart.getDefaultYAxisId());
                    if (yAxis != undefined) {
                        this.addSerieToChart(series, newChart, yAxis.id);
                    }
                    else {
                        console.error("Default yAxis not available!");
                    }
                }
            }
        };
        /**
         * Add serie to chart (one by one)
         *
         * @private
         * @param {Array<BaseSeries>} series
         * @param {(IChartManagerChart | undefined)} chartManagerChart
         * @param {string} yAxisId
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.addSerieToChart = function (series, chartManagerChart, yAxisId) {
            var yAxis = chartManagerChart.getYScale(yAxisId);
            var insertedInfo = new insertedInfo_1.InsertedInfo(series, yAxis, chartManagerChart);
            if (insertedInfo != undefined && insertedInfo.yAxis != undefined && insertedInfo.chart != undefined) {
                this._chartManagerDataModel.addSeriesToChart(insertedInfo.chart, insertedInfo.series, insertedInfo.yAxis);
            }
        };
        TraceViewWidget.prototype.createXYSerie = function (container, series) {
            // create calculation
            var calculation = new signalManagerCalculation_1.SignalManagerCalculation("Calculation");
            // add calculation to container
            container.addSerieContainer(calculation, -1);
            // set calculation type
            calculation.setCalculatorType('XY');
            // set calculation input data
            if (series.length > 0 && series[0] != undefined) {
                calculation.setXValue(series[0].name);
            }
            if (series.length > 1 && series[1] != undefined) {
                calculation.setYValue(series[1].name);
            }
            // Return calculation output data 
            return calculation.getOutputCalculationData()[0].serie;
        };
        /**
         * Create FFT output serie
         *
         * @private
         * @param {ISerieContainer} container
         * @param {BaseSeries} series
         * @returns
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.createFFTSerie = function (container, series) {
            // create calculation
            var calculation = new signalManagerCalculation_1.SignalManagerCalculation("Calculation");
            // add calculation to container
            container.addSerieContainer(calculation, -1);
            // set calculation type
            calculation.setCalculatorType('FFT');
            // set calculation input data
            calculation.setXValue(series.name);
            // Return calculation output data 
            return calculation.getOutputCalculationData()[0].serie;
        };
        /**
         *
         *
         * @private
         * @param {*} sender
         * @param {IChartManagerChart} chart
         * @param {(Scale | undefined)} yAxis
         * @param {(ITraceChart | undefined)} targetChart
         * @returns
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.getYAxisId = function (sender, chart, yAxis, targetChart) {
            var yAxisId;
            if (sender instanceof chartDropHelper_1.ChartDropHelper) {
                yAxisId = this.getYScale(chart, targetChart);
            }
            else if (yAxis != undefined) {
                chart = yAxis.parent;
                yAxisId = yAxis.id;
            }
            else {
                yAxisId = chart.getNextYAxisId();
                var newYAxis = new scale_1.Scale(yAxisId, chart);
                this._chartManagerDataModel.addYScale(chart, newYAxis);
            }
            return yAxisId;
        };
        /**
         * Get yAxis id when serie is dropped in the chart view
         *
         * @private
         * @param {IChartManagerChart} chartManagerChart
         * @param {*} targetChart
         * @returns
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.getYScale = function (chartManagerChart, targetChart) {
            var yAxisId;
            if (chartManagerChart.chartType == chartManagerChart_1.ChartType.XYChart) {
                yAxisId = chartManagerChart.getDefaultYAxisId();
            }
            else {
                //adding series to YT charts
                var objectUnderMouse = targetChart.getChartObjectUnderMouse(targetChart.chartInstance.mousemoveX, targetChart.chartInstance.mousemoveY);
                if (objectUnderMouse.chartObjectType == ChartBase_1.ChartObjectType.axis) {
                    // get axis id
                    yAxisId = objectUnderMouse.args.axis.getAxisID();
                }
                else if (objectUnderMouse.chartObjectType == ChartBase_1.ChartObjectType.chartSpace) {
                    // create new axis
                    yAxisId = chartManagerChart.getNextYAxisId();
                    var newYAxis = new scale_1.Scale(yAxisId, chartManagerChart);
                    this._chartManagerDataModel.addYScale(chartManagerChart, newYAxis);
                }
            }
            return yAxisId;
        };
        /**
         * Attaches the signal manager datamodel events
         *
         * @private
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.attachSignalManagerDataModelEvents = function () {
            if (this._signalManagerDataModel) {
                this._signalManagerDataModel.eventSignalRemoved.attach(this._signalManagerSignalRemovedHandler);
            }
        };
        /**
         * Detaches the signal manager datamodel events
         *
         * @private
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.detachSignalManagerDataModelEvents = function () {
            if (this._signalManagerDataModel) {
                this._signalManagerDataModel.eventSignalRemoved.detach(this._signalManagerSignalRemovedHandler);
            }
        };
        TraceViewWidget.prototype.onSignalManagerSignalRemoved = function (sender, serie) {
            if (this._chartManagerDataModel) {
                this._chartManagerDataModel.removeSerieFromAllCharts(serie);
            }
        };
        /**
         * Attaches the chart manager datamodel events
         *
         * @private
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.attachChartManagerDataModelEvents = function () {
            if (this._chartManagerDataModel) {
                this._chartManagerDataModel.eventModelChanged.attach(this._chartManagerModelChangedHandler);
            }
        };
        /**
         * Detaches the chart manager widget events
         *
         * @private
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.detachChartManagerWidgetEvents = function () {
            this._chartManagerWidget.eventDropHelper.detach(this._chartManagerWidgetdropHelperHandler);
        };
        /**
         * Detaches the chart manager datamodel events
         *
         * @private
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.detachChartManagerDataModelEvents = function () {
            if (this._chartManagerDataModel) {
                this._chartManagerDataModel.eventModelChanged.detach(this._chartManagerModelChangedHandler);
            }
        };
        TraceViewWidget.prototype.onChartManagerModelChanged = function (sender, args) {
            if (this._chartViewWidget) {
                // Update the chart view widget
                this._chartViewWidget.refreshCharts(sender, args);
            }
            if (this._cursorInfoWidget) {
                // Update the cursor info widget
                if (args.hint == chartManagerDataModel_1.ChartManagerDataModelChangedHint.addSerie && args.data.series != undefined) {
                    this._cursorInfoWidget.addSeries(args.data.series);
                }
                else if (args.hint == chartManagerDataModel_1.ChartManagerDataModelChangedHint.removeSerie) {
                    if (args.data.signalUsedInOtherCharts == false) {
                        this._cursorInfoWidget.removeSerie(args.data.serie);
                    }
                }
            }
        };
        Object.defineProperty(TraceViewWidget.prototype, "activeComponent", {
            set: function (activeComponent) {
                var _this = this;
                this._activeComponent = activeComponent;
                this._activeComponent.value.initialize().then(function () {
                    _this._activeComponent.changed(function () {
                        var currentActiveComponent = _this._activeComponent.value;
                        if (currentActiveComponent.traceControlInterface != undefined) {
                            _this.traceControlInterface = currentActiveComponent.traceControlInterface;
                        }
                        if (currentActiveComponent.traceParameters != undefined) {
                            _this.traceParametersInterface = currentActiveComponent.traceParameters;
                        }
                    });
                });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TraceViewWidget.prototype, "traceParametersInterface", {
            set: function (traceParameterInterface) {
                var _this = this;
                traceParameterInterface.changed(function (traceParameterInterface) {
                    try {
                        if (_this._signalManagerWidget != undefined) {
                            _this._signalManagerWidget.availableDataPoints = traceParameterInterface.availableTraceDataPoints;
                        }
                        _this.availableDataPoints = traceParameterInterface.availableTraceDataPoints;
                    }
                    catch (error) {
                        console.log(error);
                    }
                });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TraceViewWidget.prototype, "availableDataPoints", {
            /**
             * Sets the available trace datapoints to the trace view widget
             *
             * @memberof TraceViewWidget
             */
            set: function (availableTraceDataPoints) {
                var _this = this;
                availableTraceDataPoints.changed(function (dataPoints) {
                    _this._traceDataPointInfos = dataPoints;
                });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TraceViewWidget.prototype, "traceControlInterface", {
            /**
             * Sets and defines the interface to the trace control
             *
             * @memberof TraceViewWidget
             */
            set: function (traceComponentControl) {
                this.connectTraceControlWidget(traceComponentControl);
                this.connectTraceViewWidgetToTraceState(traceComponentControl);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Start loading trace data from target
         *
         * @private
         * @returns
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.loadTraceDataFromTarget = function () {
            var _this = this;
            if (this._traceControlInterface == undefined) {
                return;
            }
            if (this._isLoadingTraceData == true || this._widgetIsActive == false) {
                return;
            }
            this._isLoadingTraceData = true;
            this._traceControlWidget.setBusyInformation(new busyInformation_1.BusyInformation("Loading trace data", busyInformation_1.ImageId.defaultImage, 25, false));
            this._traceControlWidget.setBusy(true);
            this._traceControlInterface.commandLoadTraceData.execute(null, function (result) { return _this.traceDataLoaded(result); }, function (errorData) { return _this.traceDataLoadingError(errorData); });
        };
        /**
         * Informations if loading of trace data from target failed
         *
         * @private
         * @param {*} errorData
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.traceDataLoadingError = function (errorData) {
            this._isLoadingTraceData = false;
            this._traceControlWidget.setBusy(false);
        };
        /**
         * Informations(tracedata) from target after successful trace data upload
         *
         * @private
         * @param {*} result
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.traceDataLoaded = function (result) {
            var traceData = result;
            var addTraceDataToSignalManager = true;
            // check if data already in signalmanager datamodel
            if (traceData.traceChannels.length > 0 && traceData.traceChannels[0].tracePoints.length > 0) {
                var serieGroupName = dateTimeHelper_1.DateTimeHelper.getDateTime(traceData.traceChannels[0].tracePoints[0].timeStamp);
                var latestCategory = this._signalManagerDataModel.getSignalCategory(signalCategory_1.SignalCategory.CategoryIdRecent);
                if (latestCategory != undefined) {
                    var serieContainer = latestCategory.getSerieContainer(serieGroupName);
                    if (serieContainer != undefined) { // signal container already exists; needed to avoid duplicated signal containers if event comes multiple times
                        addTraceDataToSignalManager = false;
                    }
                }
            }
            if (addTraceDataToSignalManager == true) {
                if (traceData.traceChannels.length > 0 && traceData.traceChannels[0].tracePoints.length > 0) {
                    this.addTraceDataToSignalManager(traceData);
                }
            }
            this._isLoadingTraceData = false;
            this._traceControlWidget.setBusy(false);
        };
        /**
         * Adds the given trace data to the signal manager
         *
         * @private
         * @param {*} traceData
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.addTraceDataToSignalManager = function (traceData) {
            var newSerieGroup = new serieGroup_1.SerieGroup(dateTimeHelper_1.DateTimeHelper.getDateTime(traceData.triggerTime), traceData.triggerTime);
            var _loop_1 = function () {
                data = new Array();
                for (var j = 0; j < traceData.traceChannels[i].tracePoints.length; j++) {
                    xVal = (traceData.traceChannels[i].tracePoints[j].timeStamp - traceData.triggerTime) / 1000000;
                    yVal = traceData.traceChannels[i].tracePoints[j].dataValue;
                    data.push(new point_1.Point(xVal, yVal));
                }
                var newSignal = new signal_1.Signal(traceData.traceChannels[i].name, data);
                var newSerie = new YTSeries_1.YTSeries(newSignal, newSignal.name, colorHelper_1.ColorHelper.getColor());
                if (this_1._traceDataPointInfos != undefined) {
                    var tracePointInfos = this_1._traceDataPointInfos.filter(function (element) { return element.fullname == newSignal.name; });
                    if (tracePointInfos.length == 1) {
                        newSerie.name = tracePointInfos[0].componentName + ":" + tracePointInfos[0].name;
                        newSerie.description = tracePointInfos[0].description;
                    }
                }
                newSerieGroup.addSerie(newSerie);
            };
            var this_1 = this, data, xVal, yVal;
            for (var i = 0; i < traceData.traceChannels.length; i++) {
                _loop_1();
            }
            this.addSerieGroupToSignalManager(newSerieGroup);
        };
        /**
         * Adds a signal group to the datamodel(into uploaded->latest category and creates a clone to uploaded->all category )
         *
         * @private
         * @param {ISerieGroup} serieGroup
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.addSerieGroupToSignalManager = function (serieGroup) {
            var subCategoryRecent = this._signalManagerDataModel.getSignalCategory(signalCategory_1.SignalCategory.CategoryIdRecent);
            var subCategoryAll = this._signalManagerDataModel.getSignalCategory(signalCategory_1.SignalCategory.CategoryIdUploaded);
            if (subCategoryRecent != undefined && subCategoryAll != undefined) {
                var serieGroupClone = void 0;
                if (subCategoryRecent.getChilds().length > 0) { // Copy latest uploaded data to all if available
                    var latestSerieGroup = subCategoryRecent.getChilds()[0];
                    latestSerieGroup.mergeWithSerieGroup(serieGroup);
                    serieGroupClone = latestSerieGroup.clone();
                }
                else { // Add uploaded data to "recent" and clone to "all"
                    subCategoryRecent.addSerieContainer(serieGroup, -1);
                    serieGroupClone = serieGroup.clone();
                }
                subCategoryAll.addSerieContainer(serieGroupClone, 0);
                // TODO: Calculate after clone
            }
        };
        /**
         *   Connects the trace control widget to the trace control provider
         *
         * @param {ITraceComponentControl} traceComponentControl
         * @returns {*}
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.connectTraceControlWidget = function (traceComponentControl) {
            if (this._traceControlWidget) {
                this._traceControlWidget.traceControlInterface = this.getInterfaceWithoutSaveCommand(traceComponentControl);
            }
        };
        /**
         * Returns the trace component control with out the save/import/export trace configuration command
         *
         * @private
         * @param {ITraceComponentControl} traceComponentControl
         * @returns {*}
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.getInterfaceWithoutSaveCommand = function (traceComponentControl) {
            return {
                commandActivate: traceComponentControl.commandActivate,
                commandForceStart: traceComponentControl.commandForceStart,
                commandForceStop: traceComponentControl.commandForceStop,
                traceState: traceComponentControl.traceState,
            };
        };
        /**
         *   Connects the TraceViewWidget to the trace control provider(trace state)
         *
         * @param {ITraceComponentControl} traceComponentControl
         * @returns {*}
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.connectTraceViewWidgetToTraceState = function (traceComponentControl) {
            var _this = this;
            this._traceControlInterface = traceComponentControl;
            this._isLoadingTraceData = false;
            var oldTraceStateValue = this._traceControlInterface.traceState.value.value.toString();
            if (oldTraceStateValue == traceConfigDefines_1.TraceStateIds.Data_available) {
                // Initial load trace data
                this.loadTraceDataFromTarget();
            }
            this._traceControlInterface.traceState.changed(function (traceStateParameter) {
                if (traceStateParameter.value.toString() == traceConfigDefines_1.TraceStateIds.Data_available && oldTraceStateValue != traceConfigDefines_1.TraceStateIds.Data_available) {
                    // Auto upload of trace data
                    _this.loadTraceDataFromTarget();
                }
                oldTraceStateValue = traceStateParameter.value;
            });
        };
        return TraceViewWidget;
    }(viewBase_1.ViewBase));
    exports.TraceViewWidget = TraceViewWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VWaWV3V2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RyYWNlVmlld1dpZGdldC90cmFjZVZpZXdXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQXlDQTtRQUE4QixtQ0FBUTtRQUF0QztZQUFBLHFFQTQ4QkM7WUF6N0JXLHlCQUFtQixHQUFHLEtBQUssQ0FBQztZQUs1QixxQkFBZSxHQUFHLElBQUksQ0FBQztZQUVkLG9CQUFjLEdBQUcsY0FBYyxDQUFDO1lBRWpELGlCQUFpQjtZQUNULDhCQUF3QixHQUFHLFVBQUMsTUFBTSxFQUFFLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQXJDLENBQXFDLENBQUM7WUFFbkYsd0NBQWtDLEdBQUcsVUFBQyxNQUFNLEVBQUUsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQWhDLENBQWdDLENBQUM7WUFFeEYsbURBQTZDLEdBQUcsVUFBQyxNQUFNLEVBQUUsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLHVDQUF1QyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBMUQsQ0FBMEQsQ0FBQztZQUM3SCwyQ0FBcUMsR0FBRyxVQUFDLE1BQU0sRUFBRSxJQUFJLElBQUssT0FBQSxLQUFJLENBQUMsK0JBQStCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFsRCxDQUFrRCxDQUFDO1lBQzdHLHdDQUFrQyxHQUFHLFVBQUMsTUFBTSxFQUFFLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyw0QkFBNEIsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQS9DLENBQStDLENBQUM7WUFFdkcsMENBQW9DLEdBQUcsVUFBQyxNQUFNLEVBQUUsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLGFB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QyxjQUFjLEVBQUU7Z0JBQ3BELDBCQUEwQjtnQkFDMUIsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7YUFDbEM7WUFFRCxJQUFJLENBQUMsc0JBQXNCLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFDLG1CQUFtQjtnQkFDL0QsSUFBSSxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLElBQUksa0NBQWEsQ0FBQyxjQUFjLElBQUksa0JBQWtCLElBQUksa0NBQWEsQ0FBQyxjQUFjLEVBQUU7b0JBQzVILDRCQUE0QjtvQkFDNUIsS0FBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7aUJBQ2xDO2dCQUNELGtCQUFrQixHQUFHLG1CQUFtQixDQUFDLEtBQUssQ0FBQztZQUNuRCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFDTCxzQkFBQztJQUFELENBQUMsQUE1OEJELENBQThCLG1CQUFRLEdBNDhCckM7SUFFUSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFdpZGdldHMgZnJvbSBcIi4uLy4uL3dpZGdldHMvd2lkZ2V0c1wiO1xyXG5pbXBvcnQgKiBhcyBEYXRhTW9kZWxzIGZyb20gJy4uLy4uL21vZGVscy9kYXRhTW9kZWxzJztcclxuaW1wb3J0IHsgUHJvcGVydHkgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL3Byb3BlcnR5XCI7XHJcblxyXG5pbXBvcnQgeyBJVHJhY2VDb21wb25lbnRDb250cm9sIH0gZnJvbSBcIi4uLy4uL21vZGVscy9kaWFnbm9zdGljcy90cmFjZS9pbnRlcmZhY2VzL3RyYWNlQ29udHJvbFByb3ZpZGVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0VHJhY2VDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2RpYWdub3N0aWNzL3RyYWNlL21hcHBDb2NrcGl0VHJhY2VDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgVHJhY2VEYXRhIH0gZnJvbSBcIi4uLy4uL21vZGVscy9kaWFnbm9zdGljcy90cmFjZS90cmFjZURhdGFSZWFkZXJcIjtcclxuaW1wb3J0IHsgRGF0ZVRpbWVIZWxwZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2RhdGVUaW1lSGVscGVyXCI7XHJcbmltcG9ydCB7IFNpZ25hbENhdGVnb3J5IH0gZnJvbSBcIi4uLy4uL21vZGVscy9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsL3NpZ25hbENhdGVnb3J5XCI7XHJcbmltcG9ydCB7IFNlcmllR3JvdXAgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbW1vbi9zaWduYWwvc2VyaWVHcm91cFwiO1xyXG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbW1vbi9pbnRlcmZhY2VzL3BvaW50SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNpZ25hbCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL3NpZ25hbC9zaWduYWxcIjtcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbW1vbi9wb2ludFwiO1xyXG5pbXBvcnQgeyBDb2xvckhlbHBlciB9IGZyb20gXCIuLi8uLi9jb21tb24vY29sb3JIZWxwZXJcIjtcclxuaW1wb3J0IHsgQnVzeUluZm9ybWF0aW9uLCBJbWFnZUlkIH0gZnJvbSBcIi4uL2NvbW1vbi9idXN5SW5mb3JtYXRpb25cIjtcclxuaW1wb3J0IHsgVmlld1R5cGUgfSBmcm9tIFwiLi4vY29tbW9uL3ZpZXdUeXBlUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgQ2hhcnRNYW5hZ2VyQ2hhcnQsIENoYXJ0VHlwZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2NoYXJ0TWFuYWdlckNoYXJ0XCI7XHJcbmltcG9ydCB7IENoYXJ0TWFuYWdlckRhdGFNb2RlbENoYW5nZWRIaW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsXCI7XHJcbmltcG9ydCB7IFRyYWNlU3RhdGVJZHMgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2RpYWdub3N0aWNzL3RyYWNlL3RyYWNlQ29uZmlnL3RyYWNlQ29uZmlnRGVmaW5lc1wiO1xyXG5pbXBvcnQgeyBJU2VyaWVHcm91cCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL2ludGVyZmFjZXMvc2VyaWVHcm91cEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBZVFNlcmllcyB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL1lUU2VyaWVzXCI7XHJcbmltcG9ydCB7IFRyYWNlRGF0YVBvaW50SW5mbyB9IGZyb20gXCIuLi8uLi9tb2RlbHMvZGlhZ25vc3RpY3MvdHJhY2UvdHJhY2VEYXRhUG9pbnRJbmZvXCI7XHJcbmltcG9ydCB7IFZpZXdCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi92aWV3QmFzZVwiO1xyXG5pbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvYmFzZVNlcmllc1wiO1xyXG5pbXBvcnQgeyBDdXJzb3JTdGF0ZXMgfSBmcm9tIFwiLi4vY29tbW9uL3N0YXRlcy9jdXJzb3JTdGF0ZXNcIjtcclxuaW1wb3J0IHsgSVRyYWNlQ29tcG9uZW50UGFyYW1ldGVycyB9IGZyb20gXCIuLi8uLi9tb2RlbHMvZGlhZ25vc3RpY3MvdHJhY2UvaW50ZXJmYWNlcy90cmFjZUNvbXBvbmVudFBhcmFtZXRlckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDaGFydERyb3BIZWxwZXIsIENoYXJ0RHJvcEhlbHBlckNoYW5nZWRIaW50IH0gZnJvbSBcIi4uL2NoYXJ0Vmlld1dpZGdldC9oZWxwZXJzL2NoYXJ0RHJvcEhlbHBlclwiO1xyXG5pbXBvcnQgeyBJbnNlcnRlZEluZm8gfSBmcm9tIFwiLi4vY2hhcnRWaWV3V2lkZ2V0L2luc2VydGVkSW5mb1wiO1xyXG5pbXBvcnQgeyBJQ2hhcnRNYW5hZ2VyQ2hhcnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9pbnRlcmZhY2VzL2NoYXJ0TWFuYWdlckNoYXJ0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbiB9IGZyb20gXCIuLi8uLi9tb2RlbHMvc2lnbmFsTWFuYWdlckRhdGFNb2RlbC9zaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25cIjtcclxuaW1wb3J0IHsgSVNlcmllQ29udGFpbmVyIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb21tb24vaW50ZXJmYWNlcy9zZXJpZUNvbnRhaW5lckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTY2FsZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL3NjYWxlXCI7XHJcbmltcG9ydCB7IENoYXJ0T2JqZWN0VHlwZSwgQ2hhcnRCYXNlIH0gZnJvbSBcIi4uL2NoYXJ0Vmlld1dpZGdldC9DaGFydEJhc2VcIjtcclxuaW1wb3J0IHsgU2VyaWVDaGFydFR5cGVIZWxwZXIgfSBmcm9tIFwiLi4vY29tbW9uL1NlcmllQ2hhcnRUeXBlSGVscGVyXCI7XHJcbmltcG9ydCB7IElUcmFjZUNoYXJ0IH0gZnJvbSBcIi4uL2NoYXJ0Vmlld1dpZGdldC9pbnRlcmZhY2VzL3RyYWNlQ2hhcnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU2VyaWVzVHlwZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL3Nlcmllc1R5cGVcIjtcclxuaW1wb3J0IHsgWFlTZXJpZXMgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9YWVNlcmllc1wiO1xyXG5pbXBvcnQgeyBGRlRTZXJpZXMgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9GRlRTZXJpZXNcIjtcclxuaW1wb3J0IHsgSVNjYWxlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvaW50ZXJmYWNlcy9zY2FsZUludGVyZmFjZVwiO1xyXG5cclxuXHJcbmNsYXNzIFRyYWNlVmlld1dpZGdldCBleHRlbmRzIFZpZXdCYXNlIHtcclxuXHJcbiAgICBwcml2YXRlIF9pbm5lckxheW91dFdpZGdldCE6IFdpZGdldHMuSVNwbGl0dGVyV2lkZ2V0O1xyXG4gICAgcHJpdmF0ZSBfcmlnaHRMYXlvdXRXaWRnZXQhOiBXaWRnZXRzLklTcGxpdHRlcldpZGdldDtcclxuXHJcbiAgICBwcml2YXRlIF9jaGFydE1hbmFnZXJEYXRhTW9kZWwhOiBEYXRhTW9kZWxzLklDaGFydE1hbmFnZXJEYXRhTW9kZWw7XHJcbiAgICBwcml2YXRlIF9jaGFydE1hbmFnZXJXaWRnZXQhOiBXaWRnZXRzLklDaGFydE1hbmFnZXJXaWRnZXQ7XHJcblxyXG4gICAgcHJpdmF0ZSBfY3Vyc29ySW5mb1dpZGdldD86IFdpZGdldHMuSUN1cnNvckluZm9XaWRnZXQ7XHJcblxyXG4gICAgcHJpdmF0ZSBfc2lnbmFsTWFuYWdlckRhdGFNb2RlbCE6IERhdGFNb2RlbHMuSVNpZ25hbE1hbmFnZXJEYXRhTW9kZWw7XHJcbiAgICBwdWJsaWMgX3NpZ25hbE1hbmFnZXJXaWRnZXQ/OiBXaWRnZXRzLklTaWduYWxNYW5hZ2VyV2lkZ2V0O1xyXG5cclxuXHJcbiAgICBwcml2YXRlIF9jaGFydFZpZXdXaWRnZXQ/OiBXaWRnZXRzLklDaGFydFZpZXdXaWRnZXQ7XHJcblxyXG4gICAgcHJpdmF0ZSBfYWN0aXZlQ29tcG9uZW50ITogUHJvcGVydHk8TWFwcENvY2twaXRUcmFjZUNvbXBvbmVudD47XHJcbiAgICBwcml2YXRlIF90cmFjZUNvbnRyb2xXaWRnZXQhOiBXaWRnZXRzLklUcmFjZUNvbnRyb2xXaWRnZXQ7XHJcblxyXG4gICAgcHJpdmF0ZSBfaXNMb2FkaW5nVHJhY2VEYXRhID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF90cmFjZUNvbnRyb2xJbnRlcmZhY2U6IElUcmFjZUNvbXBvbmVudENvbnRyb2wgfCB1bmRlZmluZWQ7XHJcblxyXG4gICAgcHJpdmF0ZSBfdHJhY2VEYXRhUG9pbnRJbmZvczogQXJyYXk8VHJhY2VEYXRhUG9pbnRJbmZvPiB8IHVuZGVmaW5lZDtcclxuXHJcbiAgICBwcml2YXRlIF93aWRnZXRJc0FjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBjdXJzb3JTdGF0ZXNJZCA9IFwiQ3Vyc29yU3RhdGVzXCI7XHJcblxyXG4gICAgLy8gRXZlbnQgaGFuZGxlcnNcclxuICAgIHByaXZhdGUgX2NvbnRlbnRBY3RpdmF0ZWRIYW5kbGVyID0gKHNlbmRlciwgYXJncykgPT4gdGhpcy5vbkNvbnRlbnRBY3RpdmF0ZWQoc2VuZGVyLCBhcmdzKTtcclxuXHJcbiAgICBwcml2YXRlIF9jaGFydFZpZXdXaWRnZXREcm9wQ2hhbmdlZEhhbmRsZXIgPSAoc2VuZGVyLCBhcmdzKSA9PiB0aGlzLm9uRHJvcENoYW5nZWQoc2VuZGVyLCBhcmdzKTsgICBcclxuXHJcbiAgICBwcml2YXRlIF9zaWduYWxNYW5hZ2VyV2lkZ2V0U2VyaWVEb3VibGVDbGlja2VkSGFuZGxlciA9IChzZW5kZXIsIGRhdGEpID0+IHRoaXMub25TaWduYWxNYW5hZ2VyV2lkZ2V0U2VyaWVEb3VibGVDbGlja2VkKHNlbmRlciwgZGF0YSk7ICAgICBcclxuICAgIHByaXZhdGUgX3NpZ25hbE1hbmFnZXJXaWRnZXRDaGFuZ2VTaXplSGFuZGxlciA9IChzZW5kZXIsIGRhdGEpID0+IHRoaXMub25TaWduYWxNYW5hZ2VyV2lkZ2V0Q2hhbmdlU2l6ZShzZW5kZXIsIGRhdGEpOyAgICAgXHJcbiAgICBwcml2YXRlIF9zaWduYWxNYW5hZ2VyU2lnbmFsUmVtb3ZlZEhhbmRsZXIgPSAoc2VuZGVyLCBkYXRhKSA9PiB0aGlzLm9uU2lnbmFsTWFuYWdlclNpZ25hbFJlbW92ZWQoc2VuZGVyLCBkYXRhKTsgICAgIFxyXG4gICAgXHJcbiAgICBwcml2YXRlIF9jaGFydE1hbmFnZXJXaWRnZXRkcm9wSGVscGVySGFuZGxlciA9IChzZW5kZXIsIGFyZ3MpID0+IHRoaXMub25Ecm9wQ2hhbmdlZChzZW5kZXIsIGFyZ3MpO1xyXG4gICAgcHJpdmF0ZSBfY2hhcnRNYW5hZ2VyTW9kZWxDaGFuZ2VkSGFuZGxlciA9IChzZW5kZXIsIGRhdGEpID0+IHRoaXMub25DaGFydE1hbmFnZXJNb2RlbENoYW5nZWQoc2VuZGVyLCBkYXRhKTsgICAgIFxyXG4gXHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemUgdGhlIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYXlvdXRDb250YWluZXJJZFxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBpbml0aWFsaXplKGxheW91dENvbnRhaW5lcklkOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlci5pbml0aWFsaXplKGxheW91dENvbnRhaW5lcklkKTtcclxuXHJcbiAgICAgICAgdGhpcy5zdGF0ZXMub2JzZXJ2ZShDdXJzb3JTdGF0ZXMsIChtb2RpZmllZEl0ZW06IEN1cnNvclN0YXRlcywgaXRlbTogQ3Vyc29yU3RhdGVzKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIG9ic2VydmVkSXRlbSA9IG1vZGlmaWVkSXRlbTtcclxuICAgICAgICAgICAgbW9kaWZpZWRJdGVtO1xyXG4gICAgICAgICAgICBpdGVtO1xyXG4gICAgICAgIH0sIHRoaXMuY3Vyc29yU3RhdGVzSWQpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBsYXlvdXQgb2YgdGhlIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZVZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgY3JlYXRlTGF5b3V0KCkge1xyXG4gICAgICAgIHRoaXMuX2xheW91dFdpZGdldCA9IFdpZGdldHMuU3BsaXR0ZXJXaWRnZXQuY3JlYXRlKCk7XHJcbiAgICAgICAgdGhpcy5hdHRhY2hMYXlvdXRUb1ZpZXcodGhpcyk7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0LmluaXRpYWxpemUodGhpcy5wYXJlbnRDb250ZW50SWQpO1xyXG4gICAgICAgIHRoaXMuX2xheW91dFdpZGdldC5ldmVudFdpZGdldEFjdGl2YXRlZC5hdHRhY2godGhpcy5fY29udGVudEFjdGl2YXRlZEhhbmRsZXIpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSB3aWRnZXQgY29udGVudCBhbmQgZXZlbnR1YWxseSBzdWJ3aWRnZXRzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBjcmVhdGVXaWRnZXRzKCkge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlVHJhY2VDb250cm9sV2lkZ2V0KCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVJbm5lcldpZGdldCgpO1xyXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZUxheW91dCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY3JlYXRlcyB0aGUgdHJhY2UgY29udHJvbCB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZVZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVUcmFjZUNvbnRyb2xXaWRnZXQoKSB7XHJcbiAgICAgICAgdGhpcy5fdHJhY2VDb250cm9sV2lkZ2V0ID0gV2lkZ2V0cy5UcmFjZUNvbnRyb2xXaWRnZXQuY3JlYXRlKCk7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0LmFkZFdpZGdldCh0aGlzLl90cmFjZUNvbnRyb2xXaWRnZXQsIFwiVHJhY2VDb250cm9sbGVyXCIsIFZpZXdUeXBlLkRlZmF1bHQsIC0xKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICBDcmVhdGUgdGhlIGlubmVyIGxheW91dCBhbmQgd2lkZ2V0c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlSW5uZXJXaWRnZXQoKSB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVJbm5lckxheW91dCgpO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlSW5uZXJXaWRnZXRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgdGhlIGlubmVyIHdpZGdldHMgKHNpZ25hbG1hbmFnZXIsIGNoYXJ0IHZpZXcsIGNoYXJ0bWFuYWdlci9jdXJzb3JpbmZvKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlSW5uZXJXaWRnZXRzKCkge1xyXG4gICAgICAgIC8vIENyZWF0ZSBkYXRhbW9kZWwgZm9yIHRoZSB3aWRnZXRzXHJcbiAgICAgICAgdGhpcy5jcmVhdGVTaWduYWxNYW5hZ2VyRGF0YU1vZGVsKCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVDaGFydE1hbmFnZXJEYXRhTW9kZWwoKTtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIGxlZnQgd2lkZ2V0XHJcbiAgICAgICAgdGhpcy5jcmVhdGVTaWduYWxNYW5hZ2VyV2lkZ2V0KCk7XHJcbiAgICAgICAgdGhpcy5hdHRhY2hTaWduYWxNYW5hZ2VyV2lkZ2V0RXZlbnRzKCk7XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSB0aGUgbWlkZGxlIHdpZGdldFxyXG4gICAgICAgIHRoaXMuY3JlYXRlQ2hhcnRWaWV3V2lkZ2V0KCk7XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSB0aGUgd2lkZ2V0cyBvbiB0aGUgcmlnaHQgc2lkZVxyXG4gICAgICAgIHRoaXMuY3JlYXRlUmlnaHRMYXlvdXQoKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZVJpZ2h0V2lkZ2V0cygpO1xyXG5cclxuICAgICAgICB0aGlzLmluaXRpYWxpemVJbm5lckxheW91dCgpO1xyXG5cclxuICAgICAgICB0aGlzLmF0dGFjaFNpZ25hbE1hbmFnZXJEYXRhTW9kZWxFdmVudHMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIHJpZ2h0IHdpZGdldHMgKGNoYXJ0bWFuYWdlciwgY3Vyc29yaW5mbylcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZVJpZ2h0V2lkZ2V0cygpIHtcclxuICAgICAgICAvLyBDcmVhdGUgdGhlIGNoYXJ0IG1hbmFnZXIgd2lkZ2V0IG9uIHRvcFxyXG4gICAgICAgIHRoaXMuY3JlYXRlQ2hhcnRNYW5hZ2VyV2lkZ2V0KCk7XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSB0aGUgY3Vyc29yIGluZm8gd2lkZ2V0IG9uIGJvdHRvbVxyXG4gICAgICAgIHRoaXMuY3JlYXRlQ3Vyc29ySW5mb1dpZGdldCgpO1xyXG5cclxuICAgICAgICB0aGlzLmluaXRpYWxpemVSaWdodExheW91dCgpO1xyXG5cclxuICAgICAgICB0aGlzLmF0dGFjaENoYXJ0TWFuYWdlckRhdGFNb2RlbEV2ZW50cygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgaW5uZXIgbGF5b3V0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZVZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVJbm5lckxheW91dCgpIHtcclxuICAgICAgICB0aGlzLl9pbm5lckxheW91dFdpZGdldCA9IFdpZGdldHMuU3BsaXR0ZXJXaWRnZXQuY3JlYXRlKCk7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0LmFkZFdpZGdldCh0aGlzLl9pbm5lckxheW91dFdpZGdldCwgXCJib3R0b21TcGxpdHRlclwiLCBWaWV3VHlwZS5EZWZhdWx0LCAtMSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSByaWdodCBsYXlvdXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZVJpZ2h0TGF5b3V0KCkge1xyXG4gICAgICAgIHRoaXMuX3JpZ2h0TGF5b3V0V2lkZ2V0ID0gV2lkZ2V0cy5TcGxpdHRlcldpZGdldC5jcmVhdGUoKTtcclxuICAgICAgICB0aGlzLl9pbm5lckxheW91dFdpZGdldC5hZGRXaWRnZXQodGhpcy5fcmlnaHRMYXlvdXRXaWRnZXQsIFwicmlnaHRTcGxpdHRlclwiLCBWaWV3VHlwZS5EZWZhdWx0LCAtMSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBY3RpdmF0ZSB0aGUgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBhY3RpdmF0ZSgpIHtcclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQuYWN0aXZhdGUoKTtcclxuICAgICAgICB0aGlzLl9pbm5lckxheW91dFdpZGdldC5hY3RpdmF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3Bvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5fd2lkZ2V0SXNBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQuZGlzcG9zZSgpO1xyXG5cclxuICAgICAgICAvLyBEZXRhY2ggZXZlbnRzXHJcbiAgICAgICAgdGhpcy5kZXRhY2hFdmVudHMoKTtcclxuXHJcbiAgICAgICAgLy8gRGlzcG9zZSBkYXRhbW9kZWxzXHJcbiAgICAgICAgdGhpcy5kaXNwb3NlRGF0YU1vZGVscygpO1xyXG5cclxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7ICAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXRhY2hlcyBhbGwgZXZlbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZVZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkZXRhY2hFdmVudHMoKXtcclxuICAgICAgICB0aGlzLmRldGFjaENoYXJ0Vmlld1dpZGdldEV2ZW50cygpO1xyXG5cclxuICAgICAgICB0aGlzLmRldGFjaFNpZ25hbE1hbmFnZXJXaWRnZXRFdmVudHMoKTtcclxuICAgICAgICB0aGlzLmRldGFjaFNpZ25hbE1hbmFnZXJEYXRhTW9kZWxFdmVudHMoKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmRldGFjaENoYXJ0TWFuYWdlcldpZGdldEV2ZW50cygpO1xyXG4gICAgICAgIHRoaXMuZGV0YWNoQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsRXZlbnRzKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0LmV2ZW50V2lkZ2V0QWN0aXZhdGVkLmRldGFjaCh0aGlzLl9jb250ZW50QWN0aXZhdGVkSGFuZGxlcik7ICB0aGlzLl9jaGFydE1hbmFnZXJEYXRhTW9kZWwuZGlzcG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzcG9zZSBhbGwgZGF0YSBtb2RlbHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRpc3Bvc2VEYXRhTW9kZWxzKCl7XHJcbiAgICAgICAgaWYodGhpcy5fc2lnbmFsTWFuYWdlckRhdGFNb2RlbCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsLmRpc3Bvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2NoYXJ0TWFuYWdlckRhdGFNb2RlbC5kaXNwb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiByZXNpemVzIHRoZSB0cmFjZSBjb25maWd1cmF0aW9uIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodFxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICByZXNpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9hY3R1YWxXaWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuX2FjdHVhbEhlaWdodCA9IGhlaWdodDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2xheW91dFdpZGdldCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0IS5yZXNpemUod2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdGlhbGl6ZUxheW91dCgpIHtcclxuICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuX2xheW91dFdpZGdldC5sYXlvdXRQYW5lcyk7XHJcbiAgICAgICAgaWYgKGtleXMubGVuZ3RoID09IDIpIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2xheW91dFdpZGdldC5zZXRPcmllbnRhdGlvbih0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNldCBpbml0aWFsIHBhbmUgc2l6ZXMgYW5kIHNldHRpbmdzXHJcbiAgICAgICAgICAgIGxldCBrZXkwID0ga2V5c1swXTtcclxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0LmxheW91dFBhbmVzW2tleTBdLnNpemUgPSA0MDtcclxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0LmxheW91dFBhbmVzW2tleTBdLmV4cGFuZGFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0LmxheW91dFBhbmVzW2tleTBdLmNvbGxhcHNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX2xheW91dFdpZGdldC5sYXlvdXRQYW5lc1trZXkwXS5yZXNpemFibGUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGxldCBrZXkxID0ga2V5c1sxXTtcclxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0LmxheW91dFBhbmVzW2tleTFdLnNpemUgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQubGF5b3V0UGFuZXNba2V5MV0uZmlsbFNwYWNlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0LmxheW91dFBhbmVzW2tleTFdLmV4cGFuZGFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0LmxheW91dFBhbmVzW2tleTFdLmNvbGxhcHNpYmxlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAvLyBSZWRyYXcgdGhlIGxheW91dFxyXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQucmVjYWxjdWxhdGVMYXlvdXQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0aWFsaXplSW5uZXJMYXlvdXQoKSB7XHJcbiAgICAgICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyh0aGlzLl9pbm5lckxheW91dFdpZGdldC5sYXlvdXRQYW5lcyk7XHJcbiAgICAgICAgaWYgKGtleXMubGVuZ3RoID09IDMpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIFNldCBpbml0aWFsIHBhbmUgc2l6ZXMgYW5kIHNldHRpbmdzXHJcbiAgICAgICAgICAgIGxldCBrZXkwID0ga2V5c1swXTtcclxuICAgICAgICAgICAgdGhpcy5faW5uZXJMYXlvdXRXaWRnZXQubGF5b3V0UGFuZXNba2V5MF0uc2l6ZSA9IDM1MDtcclxuICAgICAgICAgICAgdGhpcy5faW5uZXJMYXlvdXRXaWRnZXQubGF5b3V0UGFuZXNba2V5MF0uZXhwYW5kYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9pbm5lckxheW91dFdpZGdldC5sYXlvdXRQYW5lc1trZXkwXS5jb2xsYXBzaWJsZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgbGV0IGtleTEgPSBrZXlzWzFdO1xyXG4gICAgICAgICAgICB0aGlzLl9pbm5lckxheW91dFdpZGdldC5sYXlvdXRQYW5lc1trZXkxXS5zaXplID0gMDtcclxuICAgICAgICAgICAgdGhpcy5faW5uZXJMYXlvdXRXaWRnZXQubGF5b3V0UGFuZXNba2V5MV0uZmlsbFNwYWNlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5faW5uZXJMYXlvdXRXaWRnZXQubGF5b3V0UGFuZXNba2V5MV0uZXhwYW5kYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9pbm5lckxheW91dFdpZGdldC5sYXlvdXRQYW5lc1trZXkxXS5jb2xsYXBzaWJsZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgbGV0IGtleTIgPSBrZXlzWzJdO1xyXG4gICAgICAgICAgICB0aGlzLl9pbm5lckxheW91dFdpZGdldC5sYXlvdXRQYW5lc1trZXkyXS5zaXplID0gMzAwO1xyXG4gICAgICAgICAgICB0aGlzLl9pbm5lckxheW91dFdpZGdldC5sYXlvdXRQYW5lc1trZXkyXS5leHBhbmRhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX2lubmVyTGF5b3V0V2lkZ2V0LmxheW91dFBhbmVzW2tleTJdLmNvbGxhcHNpYmxlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAvLyBSZWRyYXcgdGhlIGxheW91dFxyXG4gICAgICAgICAgICB0aGlzLl9pbm5lckxheW91dFdpZGdldC5yZWNhbGN1bGF0ZUxheW91dCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRpYWxpemVSaWdodExheW91dCgpIHtcclxuICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuX3JpZ2h0TGF5b3V0V2lkZ2V0LmxheW91dFBhbmVzKTtcclxuICAgICAgICBpZiAoa2V5cy5sZW5ndGggPT0gMikge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fcmlnaHRMYXlvdXRXaWRnZXQuc2V0T3JpZW50YXRpb24odHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBTZXQgaW5pdGlhbCBwYW5lIHNpemVzIGFuZCBzZXR0aW5nc1xyXG4gICAgICAgICAgICBsZXQga2V5MCA9IGtleXNbMF07XHJcbiAgICAgICAgICAgIHRoaXMuX3JpZ2h0TGF5b3V0V2lkZ2V0LmxheW91dFBhbmVzW2tleTBdLnNpemUgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl9yaWdodExheW91dFdpZGdldC5sYXlvdXRQYW5lc1trZXkwXS5maWxsU3BhY2UgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9yaWdodExheW91dFdpZGdldC5sYXlvdXRQYW5lc1trZXkwXS5leHBhbmRhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX3JpZ2h0TGF5b3V0V2lkZ2V0LmxheW91dFBhbmVzW2tleTBdLmNvbGxhcHNpYmxlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBsZXQga2V5MSA9IGtleXNbMV07XHJcbiAgICAgICAgICAgIHRoaXMuX3JpZ2h0TGF5b3V0V2lkZ2V0LmxheW91dFBhbmVzW2tleTFdLnNpemUgPSAzMDA7XHJcbiAgICAgICAgICAgIHRoaXMuX3JpZ2h0TGF5b3V0V2lkZ2V0LmxheW91dFBhbmVzW2tleTFdLmV4cGFuZGFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fcmlnaHRMYXlvdXRXaWRnZXQubGF5b3V0UGFuZXNba2V5MV0uY29sbGFwc2libGUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIC8vIFJlZHJhdyB0aGUgbGF5b3V0XHJcbiAgICAgICAgICAgIHRoaXMuX3JpZ2h0TGF5b3V0V2lkZ2V0LnJlY2FsY3VsYXRlTGF5b3V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25Db250ZW50QWN0aXZhdGVkKHNlbmRlciwgYXJncykge1xyXG4gICAgICAgIGFyZ3Mud2lkZ2V0LmFjdGl2YXRlKCk7XHJcbiAgICAgICAgdGhpcy5yZXNpemUodGhpcy5fYWN0dWFsV2lkdGgsIHRoaXMuX2FjdHVhbEhlaWdodClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIHNpZ25hbCBtYW5hZ2VyIGRhdGFtb2RlbFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlU2lnbmFsTWFuYWdlckRhdGFNb2RlbCgpIHtcclxuICAgICAgICB0aGlzLl9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsID0gRGF0YU1vZGVscy5TaWduYWxNYW5hZ2VyRGF0YU1vZGVsLmNyZWF0ZSgpO1xyXG4gICAgICAgIHRoaXMuX3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwuaW5pdGlhbGl6ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgY2hhcnQgbWFuYWdlciBkYXRhbW9kZWxcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZUNoYXJ0TWFuYWdlckRhdGFNb2RlbCgpIHtcclxuICAgICAgICB0aGlzLl9jaGFydE1hbmFnZXJEYXRhTW9kZWwgPSBEYXRhTW9kZWxzLkNoYXJ0TWFuYWdlckRhdGFNb2RlbC5jcmVhdGUoKTtcclxuICAgICAgICB0aGlzLl9jaGFydE1hbmFnZXJEYXRhTW9kZWwuaW5pdGlhbGl6ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgc2lnbmFsIG1hbmFnZXIgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZVZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVTaWduYWxNYW5hZ2VyV2lkZ2V0KCkge1xyXG4gICAgICAgIHRoaXMuX3NpZ25hbE1hbmFnZXJXaWRnZXQgPSBXaWRnZXRzLlNpZ25hbE1hbmFnZXJXaWRnZXQuY3JlYXRlKCk7XHJcbiAgICAgICAgdGhpcy5fc2lnbmFsTWFuYWdlcldpZGdldC5kYXRhTW9kZWwgPSB0aGlzLl9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsO1xyXG4gICAgICAgIHRoaXMuX2lubmVyTGF5b3V0V2lkZ2V0LmFkZFdpZGdldCh0aGlzLl9zaWduYWxNYW5hZ2VyV2lkZ2V0LCBcIlNpZ25hbE1hbmFnZXJcIiwgVmlld1R5cGUuRGVmYXVsdCwgLTEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgY2hhcnQgdmlldyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZUNoYXJ0Vmlld1dpZGdldCgpIHtcclxuICAgICAgICB0aGlzLl9jaGFydFZpZXdXaWRnZXQgPSBXaWRnZXRzLkNoYXJ0Vmlld1dpZGdldC5jcmVhdGUoKTtcclxuICAgICAgICB0aGlzLl9jaGFydFZpZXdXaWRnZXQuZGF0YU1vZGVsID0gdGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsO1xyXG4gICAgICAgIHRoaXMuX2NoYXJ0Vmlld1dpZGdldC5ldmVudERyb3BIZWxwZXIuYXR0YWNoKHRoaXMuX2NoYXJ0Vmlld1dpZGdldERyb3BDaGFuZ2VkSGFuZGxlcik7XHJcbiAgICAgICAgdGhpcy5faW5uZXJMYXlvdXRXaWRnZXQuYWRkV2lkZ2V0KHRoaXMuX2NoYXJ0Vmlld1dpZGdldCwgXCJDaGFydFZpZXdcIiwgVmlld1R5cGUuRGVmYXVsdCwgLTEpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZGV0YWNoQ2hhcnRWaWV3V2lkZ2V0RXZlbnRzKCl7XHJcbiAgICAgICAgaWYodGhpcy5fY2hhcnRWaWV3V2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2NoYXJ0Vmlld1dpZGdldC5ldmVudERyb3BIZWxwZXIuZGV0YWNoKHRoaXMuX2NoYXJ0Vmlld1dpZGdldERyb3BDaGFuZ2VkSGFuZGxlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIHdoZW4gYSBEJkQgb3BlcmF0aW9uIGhhcyBiZWVuIGRvbmVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uRHJvcENoYW5nZWQoc2VuZGVyLCBhcmdzKSB7XHJcbiAgICAgICAgc3dpdGNoIChhcmdzLmhpbnQpIHtcclxuICAgICAgICAgICAgY2FzZSBDaGFydERyb3BIZWxwZXJDaGFuZ2VkSGludC5jcmVhdGVDaGFydDoge1xyXG4gICAgICAgICAgICAgICAgLy9jcmVhdGVzIGEgY2hhcnQgYW4gYWRkcyBpdHMgc2VyaWVzXHJcbiAgICAgICAgICAgICAgICBsZXQgY2hhcnROYW1lID0gdGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsLmdldFVuaXF1ZUNoYXJ0TmFtZSgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGNoYXJ0TWFuYWdlckNoYXJ0ID0gbmV3IENoYXJ0TWFuYWdlckNoYXJ0KGNoYXJ0TmFtZSwgYXJncy5kYXRhLnR5cGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsLmFkZENoYXJ0KGNoYXJ0TWFuYWdlckNoYXJ0LCAtMSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJncy5kYXRhLnNlcmllcyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgeUF4aXNJZCA9IGNoYXJ0TWFuYWdlckNoYXJ0LmdldERlZmF1bHRZQXhpc0lkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlcmllcyA9IGFyZ3MuZGF0YS5zZXJpZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFyZ3MuZGF0YS50eXBlICE9IENoYXJ0VHlwZS5ZVENoYXJ0ICYmIGFyZ3MuZGF0YS5zZXJpZXNbMF0udHlwZSA9PSBTZXJpZXNUeXBlLnRpbWVTZXJpZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhcmdzLmRhdGEudHlwZSA9PSBDaGFydFR5cGUuWFlDaGFydCkgeyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcmllcyA9IG5ldyBBcnJheTxCYXNlU2VyaWVzPigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VyaWVzLnB1c2godGhpcy5jcmVhdGVYWVNlcmllKGFyZ3MuZGF0YS5zZXJpZXNbMF0ucGFyZW50LCBhcmdzLmRhdGEuc2VyaWVzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoYXJncy5kYXRhLnR5cGUgPT0gQ2hhcnRUeXBlLkZGVENoYXJ0KSB7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VyaWVzID0gbmV3IEFycmF5PEJhc2VTZXJpZXM+KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MuZGF0YS5zZXJpZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcmllcy5wdXNoKHRoaXMuY3JlYXRlRkZUU2VyaWUoYXJncy5kYXRhLnNlcmllc1tpXS5wYXJlbnQsIGFyZ3MuZGF0YS5zZXJpZXNbaV0pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9zaWduYWxNYW5hZ2VyV2lkZ2V0IS5lZGl0TW9kZUFjdGl2ZSAmJiBhcmdzLmRhdGEudHlwZSA9PSBDaGFydFR5cGUuWFlDaGFydCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2lnbmFsTWFuYWdlcldpZGdldCEuYWN0aXZhdGVFZGl0TW9kZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL0FkZCBhbGwgZHJhZ2dlZCBzZXJpZXMgdG8gdGhlIGNoYXJ0LlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkU2VyaWVUb0NoYXJ0KHNlcmllcywgY2hhcnRNYW5hZ2VyQ2hhcnQsIHlBeGlzSWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBDaGFydERyb3BIZWxwZXJDaGFuZ2VkSGludC5hZGRTZXJpZTogeyBcclxuICAgICAgICAgICAgICAgIGxldCBzZXJpZXM6IEFycmF5PEJhc2VTZXJpZXM+ID0gYXJncy5kYXRhLnNlcmllcztcclxuICAgICAgICAgICAgICAgIGxldCBjaGFydDogSUNoYXJ0TWFuYWdlckNoYXJ0IHwgdW5kZWZpbmVkID0gYXJncy5kYXRhLmNoYXJ0O1xyXG4gICAgICAgICAgICAgICAgbGV0IHlBeGlzOiBTY2FsZSA9IGFyZ3MuZGF0YS55QXhpcztcclxuICAgICAgICAgICAgICAgIGlmIChjaGFydCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgeUF4aXNJZCA9IHRoaXMuZ2V0WUF4aXNJZChzZW5kZXIsIGNoYXJ0LCB5QXhpcywgYXJncy5kYXRhLnRhcmdldENoYXJ0KTtcclxuICAgICAgICAgICAgICAgICAgICAvL2luc2VydCBzZXJpZSB0byBlbXB0eSBhIGNoYXJ0XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRTZXJpZVRvQ2hhcnQoc2VyaWVzLCBjaGFydCwgeUF4aXNJZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNhc2UgQ2hhcnREcm9wSGVscGVyQ2hhbmdlZEhpbnQuY3JlYXRlWFlTZXJpZTogeyBcclxuICAgICAgICAgICAgICAgIC8vQ3JlYXRlcyBYWSBzZXJpZSBhbmQgYWRkcyBpdCB0byB0aGUgWFkgY2hhcnRcclxuICAgICAgICAgICAgICAgIGxldCBjaGFydE1hbmFnZXJDaGFydDogSUNoYXJ0TWFuYWdlckNoYXJ0ID0gYXJncy5kYXRhLmNoYXJ0O1xyXG4gICAgICAgICAgICAgICAgbGV0IHNlcmllcyA9IG5ldyBBcnJheTxCYXNlU2VyaWVzPigpO1xyXG4gICAgICAgICAgICAgICAgc2VyaWVzLnB1c2godGhpcy5jcmVhdGVYWVNlcmllKGFyZ3MuZGF0YS5zZXJpZXNbMF0ucGFyZW50LCBhcmdzLmRhdGEuc2VyaWVzKSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgeUF4aXNJZCA9IGNoYXJ0TWFuYWdlckNoYXJ0LmdldERlZmF1bHRZQXhpc0lkKCk7XHJcbiAgICAgICAgICAgICAgICAvL0FkZCBhbGwgZHJhZ2dlZCBzZXJpZXMgdG8gdGhlIGNoYXJ0LlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRTZXJpZVRvQ2hhcnQoc2VyaWVzLCBjaGFydE1hbmFnZXJDaGFydCwgeUF4aXNJZCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY2FzZSBDaGFydERyb3BIZWxwZXJDaGFuZ2VkSGludC5jcmVhdGVGRlRTZXJpZTogeyBcclxuICAgICAgICAgICAgICAgIC8vQ3JlYXRlcyBGRlQgc2VyaWUgYW5kIGFkZCBpdCB0byB0aGUgRkZUIGNoYXJ0XHJcbiAgICAgICAgICAgICAgICBsZXQgY2hhcnQ6IElDaGFydE1hbmFnZXJDaGFydCA9IGFyZ3MuZGF0YS5jaGFydDtcclxuICAgICAgICAgICAgICAgIGxldCBzZXJpZXMgPSBuZXcgQXJyYXk8QmFzZVNlcmllcz4oKTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5kYXRhLnNlcmllcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VyaWVzLnB1c2godGhpcy5jcmVhdGVGRlRTZXJpZShhcmdzLmRhdGEuc2VyaWVzW2ldLnBhcmVudCwgYXJncy5kYXRhLnNlcmllc1tpXSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IHlBeGlzOiBTY2FsZSA9IGFyZ3MuZGF0YS55QXhpcztcclxuICAgICAgICAgICAgICAgIGxldCB5QXhpc0lkID0gdGhpcy5nZXRZQXhpc0lkKHNlbmRlciwgY2hhcnQsIHlBeGlzLCBhcmdzLmRhdGEudGFyZ2V0Q2hhcnQpO1xyXG4gICAgICAgICAgICAgICAgLy9BZGQgYWxsIGRyYWdnZWQgc2VyaWVzIHRvIHRoZSBjaGFydC5cclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkU2VyaWVUb0NoYXJ0KHNlcmllcywgY2hhcnQsIHlBeGlzSWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgY2hhcnQgbWFuYWdlciB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZUNoYXJ0TWFuYWdlcldpZGdldCgpIHtcclxuICAgICAgICB0aGlzLl9jaGFydE1hbmFnZXJXaWRnZXQgPSBXaWRnZXRzLkNoYXJ0TWFuYWdlcldpZGdldC5jcmVhdGUoKTtcclxuICAgICAgICB0aGlzLl9jaGFydE1hbmFnZXJXaWRnZXQuZGF0YU1vZGVsID0gdGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsO1xyXG4gICAgICAgIHRoaXMuX2NoYXJ0TWFuYWdlcldpZGdldC5ldmVudERyb3BIZWxwZXIuYXR0YWNoKHRoaXMuX2NoYXJ0TWFuYWdlcldpZGdldGRyb3BIZWxwZXJIYW5kbGVyKTtcclxuICAgICAgICB0aGlzLl9yaWdodExheW91dFdpZGdldC5hZGRXaWRnZXQodGhpcy5fY2hhcnRNYW5hZ2VyV2lkZ2V0LCBcIkNoYXJ0TWFuYWdlclwiLCBWaWV3VHlwZS5EZWZhdWx0LCAtMSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBjdXJzb3IgaW5mbyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZUN1cnNvckluZm9XaWRnZXQoKSB7XHJcbiAgICAgICAgdGhpcy5fY3Vyc29ySW5mb1dpZGdldCA9IFdpZGdldHMuQ3Vyc29ySW5mb1dpZGdldC5jcmVhdGUoKTtcclxuICAgICAgICB0aGlzLl9yaWdodExheW91dFdpZGdldC5hZGRXaWRnZXQodGhpcy5fY3Vyc29ySW5mb1dpZGdldCwgXCJDdXJzb3JJbmZvXCIsIFZpZXdUeXBlLkRlZmF1bHQsIC0xKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEF0dGFjaGVzIHRoZSBzaWduYWwgbWFuYWdlciB3aWRnZXQgZXZlbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZVZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhdHRhY2hTaWduYWxNYW5hZ2VyV2lkZ2V0RXZlbnRzKCkge1xyXG4gICAgICAgIGlmKHRoaXMuX3NpZ25hbE1hbmFnZXJXaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fc2lnbmFsTWFuYWdlcldpZGdldC5ldmVudFNlcmllRG91YmxlQ2xpY2tlZC5hdHRhY2godGhpcy5fc2lnbmFsTWFuYWdlcldpZGdldFNlcmllRG91YmxlQ2xpY2tlZEhhbmRsZXIpO1xyXG4gICAgICAgICAgICB0aGlzLl9zaWduYWxNYW5hZ2VyV2lkZ2V0LmV2ZW50Q2hhbmdlU2l6ZS5hdHRhY2godGhpcy5fc2lnbmFsTWFuYWdlcldpZGdldENoYW5nZVNpemVIYW5kbGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXRhY2hlcyB0aGUgc2lnbmFsIG1hbmFnZXIgd2lkZ2V0IGV2ZW50c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZGV0YWNoU2lnbmFsTWFuYWdlcldpZGdldEV2ZW50cygpIHtcclxuICAgICAgICBpZih0aGlzLl9zaWduYWxNYW5hZ2VyV2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX3NpZ25hbE1hbmFnZXJXaWRnZXQuZXZlbnRTZXJpZURvdWJsZUNsaWNrZWQuZGV0YWNoKHRoaXMuX3NpZ25hbE1hbmFnZXJXaWRnZXRTZXJpZURvdWJsZUNsaWNrZWRIYW5kbGVyKTtcclxuICAgICAgICAgICAgdGhpcy5fc2lnbmFsTWFuYWdlcldpZGdldC5ldmVudENoYW5nZVNpemUuZGV0YWNoKHRoaXMuX3NpZ25hbE1hbmFnZXJXaWRnZXRDaGFuZ2VTaXplSGFuZGxlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25TaWduYWxNYW5hZ2VyV2lkZ2V0U2VyaWVEb3VibGVDbGlja2VkKHNlbmRlciwgc2VyaWU6IEJhc2VTZXJpZXMpIHtcclxuICAgICAgICB0aGlzLmFkZE5ld0NoYXJ0KHNlcmllKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uU2lnbmFsTWFuYWdlcldpZGdldENoYW5nZVNpemUoc2VuZGVyLCBuZXdTaXplKSB7XHJcbiAgICAgICAgdGhpcy5faW5uZXJMYXlvdXRXaWRnZXQucmVzaXplV2lkZ2V0KHNlbmRlciwgbmV3U2l6ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgbmV3IGNoYXJ0IHRvIHRoZSBjaGFydG1hbmFnZXIgZGF0YW1vZGVsKGlmIHBvc3NpYmxlID0+IG1heCBjaGFydCBudW1iZXIpIGFuZCBhZGRzIHRoZSBnaXZlbiBzaWduYWwgdG8gdGhlIG5ldyBjaGFydFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNlcmllXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkTmV3Q2hhcnQoc2VyaWU6IEJhc2VTZXJpZXMpIHtcclxuICAgICAgICBpZiAodGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsKSB7XHJcbiAgICAgICAgICAgIHZhciBuZXdDaGFydE5hbWUgPSB0aGlzLl9jaGFydE1hbmFnZXJEYXRhTW9kZWwuZ2V0VW5pcXVlQ2hhcnROYW1lKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgc2VyaWVDaGFydFR5cGUgPSBuZXcgU2VyaWVDaGFydFR5cGVIZWxwZXIoKS5nZXRTZXJpZUNoYXJ0VHlwZShzZXJpZS50eXBlKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBuZXdDaGFydCA9IG5ldyBDaGFydE1hbmFnZXJDaGFydChuZXdDaGFydE5hbWUsIHNlcmllQ2hhcnRUeXBlKTtcclxuICAgICAgICAgICAgbGV0IGlzQ2hhcnRBZGRlZCA9IHRoaXMuX2NoYXJ0TWFuYWdlckRhdGFNb2RlbC5hZGRDaGFydChuZXdDaGFydCwgMCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoc2VyaWUgIT0gdW5kZWZpbmVkICYmIGlzQ2hhcnRBZGRlZCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNlcmllcyA9IG5ldyBBcnJheTxCYXNlU2VyaWVzPigpO1xyXG4gICAgICAgICAgICAgICAgc2VyaWVzLnB1c2goc2VyaWUpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHlBeGlzID0gbmV3Q2hhcnQuZ2V0WVNjYWxlKG5ld0NoYXJ0LmdldERlZmF1bHRZQXhpc0lkKCkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHlBeGlzICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkU2VyaWVUb0NoYXJ0KHNlcmllcywgbmV3Q2hhcnQsIHlBeGlzLmlkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJEZWZhdWx0IHlBeGlzIG5vdCBhdmFpbGFibGUhXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIHNlcmllIHRvIGNoYXJ0IChvbmUgYnkgb25lKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PEJhc2VTZXJpZXM+fSBzZXJpZXNcclxuICAgICAqIEBwYXJhbSB7KElDaGFydE1hbmFnZXJDaGFydCB8IHVuZGVmaW5lZCl9IGNoYXJ0TWFuYWdlckNoYXJ0XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30geUF4aXNJZFxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZFNlcmllVG9DaGFydChzZXJpZXM6IEFycmF5PEJhc2VTZXJpZXM+LCBjaGFydE1hbmFnZXJDaGFydDogSUNoYXJ0TWFuYWdlckNoYXJ0IHwgdW5kZWZpbmVkLCB5QXhpc0lkOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgeUF4aXMgPSBjaGFydE1hbmFnZXJDaGFydCEuZ2V0WVNjYWxlKHlBeGlzSWQpO1xyXG4gICAgICAgIGxldCBpbnNlcnRlZEluZm8gPSBuZXcgSW5zZXJ0ZWRJbmZvKHNlcmllcywgeUF4aXMsIGNoYXJ0TWFuYWdlckNoYXJ0ISk7XHJcbiAgICAgICAgaWYgKGluc2VydGVkSW5mbyAhPSB1bmRlZmluZWQgJiYgaW5zZXJ0ZWRJbmZvLnlBeGlzICE9IHVuZGVmaW5lZCAmJiBpbnNlcnRlZEluZm8uY2hhcnQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NoYXJ0TWFuYWdlckRhdGFNb2RlbC5hZGRTZXJpZXNUb0NoYXJ0KGluc2VydGVkSW5mby5jaGFydCwgaW5zZXJ0ZWRJbmZvLnNlcmllcywgaW5zZXJ0ZWRJbmZvLnlBeGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjcmVhdGVYWVNlcmllKGNvbnRhaW5lcjogSVNlcmllQ29udGFpbmVyLCBzZXJpZXM6IEFycmF5PEJhc2VTZXJpZXM+KTogWFlTZXJpZXMge1xyXG4gICAgICAvLyBjcmVhdGUgY2FsY3VsYXRpb25cclxuXHQgIGxldCBjYWxjdWxhdGlvbiA9IG5ldyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb24oXCJDYWxjdWxhdGlvblwiKTtcclxuICAgICAgICBcclxuXHQgIC8vIGFkZCBjYWxjdWxhdGlvbiB0byBjb250YWluZXJcclxuXHQgIGNvbnRhaW5lci5hZGRTZXJpZUNvbnRhaW5lcihjYWxjdWxhdGlvbiwgLTEpO1xyXG4gICAgICAgIFxyXG5cdCAgLy8gc2V0IGNhbGN1bGF0aW9uIHR5cGVcclxuXHQgIGNhbGN1bGF0aW9uLnNldENhbGN1bGF0b3JUeXBlKCdYWScpO1xyXG5cclxuXHQgIC8vIHNldCBjYWxjdWxhdGlvbiBpbnB1dCBkYXRhXHJcblx0ICBpZihzZXJpZXMubGVuZ3RoID4gMCAmJiBzZXJpZXNbMF0gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICBjYWxjdWxhdGlvbi5zZXRYVmFsdWUoc2VyaWVzWzBdLm5hbWUpO1xyXG4gICAgICB9XHJcbiAgICAgIFxyXG5cdCAgaWYoc2VyaWVzLmxlbmd0aCA+IDEgJiYgc2VyaWVzWzFdICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGNhbGN1bGF0aW9uLnNldFlWYWx1ZShzZXJpZXNbMV0ubmFtZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFJldHVybiBjYWxjdWxhdGlvbiBvdXRwdXQgZGF0YSBcclxuICAgICAgcmV0dXJuIGNhbGN1bGF0aW9uLmdldE91dHB1dENhbGN1bGF0aW9uRGF0YSgpWzBdLnNlcmllIGFzIFhZU2VyaWVzO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBGRlQgb3V0cHV0IHNlcmllXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SVNlcmllQ29udGFpbmVyfSBjb250YWluZXJcclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVzXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZUZGVFNlcmllKGNvbnRhaW5lcjogSVNlcmllQ29udGFpbmVyLCBzZXJpZXM6IEJhc2VTZXJpZXMpOiBGRlRTZXJpZXMge1xyXG4gICAgICAgIC8vIGNyZWF0ZSBjYWxjdWxhdGlvblxyXG4gICAgICAgIGxldCBjYWxjdWxhdGlvbiA9IG5ldyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb24oXCJDYWxjdWxhdGlvblwiKTtcclxuXHJcbiAgICAgICAgLy8gYWRkIGNhbGN1bGF0aW9uIHRvIGNvbnRhaW5lclxyXG4gICAgICAgIGNvbnRhaW5lci5hZGRTZXJpZUNvbnRhaW5lcihjYWxjdWxhdGlvbiwgLTEpO1xyXG5cclxuICAgICAgICAvLyBzZXQgY2FsY3VsYXRpb24gdHlwZVxyXG4gICAgICAgIGNhbGN1bGF0aW9uLnNldENhbGN1bGF0b3JUeXBlKCdGRlQnKTtcclxuXHJcbiAgICAgICAgLy8gc2V0IGNhbGN1bGF0aW9uIGlucHV0IGRhdGFcclxuICAgICAgICBjYWxjdWxhdGlvbi5zZXRYVmFsdWUoc2VyaWVzLm5hbWUpO1xyXG5cclxuICAgICAgICAvLyBSZXR1cm4gY2FsY3VsYXRpb24gb3V0cHV0IGRhdGEgXHJcbiAgICAgICAgcmV0dXJuIGNhbGN1bGF0aW9uLmdldE91dHB1dENhbGN1bGF0aW9uRGF0YSgpWzBdLnNlcmllIGFzIEZGVFNlcmllcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHtJQ2hhcnRNYW5hZ2VyQ2hhcnR9IGNoYXJ0XHJcbiAgICAgKiBAcGFyYW0geyhTY2FsZSB8IHVuZGVmaW5lZCl9IHlBeGlzXHJcbiAgICAgKiBAcGFyYW0geyhJVHJhY2VDaGFydCB8IHVuZGVmaW5lZCl9IHRhcmdldENoYXJ0XHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFlBeGlzSWQoc2VuZGVyLCBjaGFydDogSUNoYXJ0TWFuYWdlckNoYXJ0LCB5QXhpczogU2NhbGUgfCB1bmRlZmluZWQsIHRhcmdldENoYXJ0OiBJVHJhY2VDaGFydCB8IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGxldCB5QXhpc0lkO1xyXG4gICAgICAgIGlmIChzZW5kZXIgaW5zdGFuY2VvZiBDaGFydERyb3BIZWxwZXIpIHtcclxuICAgICAgICAgICAgeUF4aXNJZCA9IHRoaXMuZ2V0WVNjYWxlKGNoYXJ0LCB0YXJnZXRDaGFydCk7XHJcbiAgICAgICAgfSBcclxuICAgICAgICBlbHNlIGlmICh5QXhpcyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgY2hhcnQgPSB5QXhpcy5wYXJlbnQ7XHJcbiAgICAgICAgICAgIHlBeGlzSWQgPSB5QXhpcy5pZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHlBeGlzSWQgPSBjaGFydC5nZXROZXh0WUF4aXNJZCgpO1xyXG4gICAgICAgICAgICBsZXQgbmV3WUF4aXMgPSBuZXcgU2NhbGUoeUF4aXNJZCwgY2hhcnQpO1xyXG4gICAgICAgICAgICB0aGlzLl9jaGFydE1hbmFnZXJEYXRhTW9kZWwuYWRkWVNjYWxlKGNoYXJ0LCBuZXdZQXhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB5QXhpc0lkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHlBeGlzIGlkIHdoZW4gc2VyaWUgaXMgZHJvcHBlZCBpbiB0aGUgY2hhcnQgdmlld1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0lDaGFydE1hbmFnZXJDaGFydH0gY2hhcnRNYW5hZ2VyQ2hhcnRcclxuICAgICAqIEBwYXJhbSB7Kn0gdGFyZ2V0Q2hhcnRcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0WVNjYWxlKGNoYXJ0TWFuYWdlckNoYXJ0OiBJQ2hhcnRNYW5hZ2VyQ2hhcnQsIHRhcmdldENoYXJ0KXtcclxuICAgICAgICBsZXQgeUF4aXNJZDtcclxuICAgICAgICBpZiAoY2hhcnRNYW5hZ2VyQ2hhcnQuY2hhcnRUeXBlID09IENoYXJ0VHlwZS5YWUNoYXJ0KSB7XHJcbiAgICAgICAgICAgIHlBeGlzSWQgPSBjaGFydE1hbmFnZXJDaGFydC5nZXREZWZhdWx0WUF4aXNJZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy9hZGRpbmcgc2VyaWVzIHRvIFlUIGNoYXJ0c1xyXG4gICAgICAgICAgICBsZXQgb2JqZWN0VW5kZXJNb3VzZSA9IHRhcmdldENoYXJ0LmdldENoYXJ0T2JqZWN0VW5kZXJNb3VzZSh0YXJnZXRDaGFydC5jaGFydEluc3RhbmNlLm1vdXNlbW92ZVgsIHRhcmdldENoYXJ0LmNoYXJ0SW5zdGFuY2UubW91c2Vtb3ZlWSk7XHJcbiAgICAgICAgICAgIGlmIChvYmplY3RVbmRlck1vdXNlLmNoYXJ0T2JqZWN0VHlwZSA9PSBDaGFydE9iamVjdFR5cGUuYXhpcykgeyBcclxuICAgICAgICAgICAgICAgIC8vIGdldCBheGlzIGlkXHJcbiAgICAgICAgICAgICAgICB5QXhpc0lkID0gb2JqZWN0VW5kZXJNb3VzZS5hcmdzLmF4aXMuZ2V0QXhpc0lEKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAob2JqZWN0VW5kZXJNb3VzZS5jaGFydE9iamVjdFR5cGUgPT0gQ2hhcnRPYmplY3RUeXBlLmNoYXJ0U3BhY2UpIHsgXHJcbiAgICAgICAgICAgICAgICAvLyBjcmVhdGUgbmV3IGF4aXNcclxuICAgICAgICAgICAgICAgIHlBeGlzSWQgPSBjaGFydE1hbmFnZXJDaGFydC5nZXROZXh0WUF4aXNJZCgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld1lBeGlzID0gbmV3IFNjYWxlKHlBeGlzSWQsIGNoYXJ0TWFuYWdlckNoYXJ0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NoYXJ0TWFuYWdlckRhdGFNb2RlbC5hZGRZU2NhbGUoY2hhcnRNYW5hZ2VyQ2hhcnQsIG5ld1lBeGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4geUF4aXNJZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEF0dGFjaGVzIHRoZSBzaWduYWwgbWFuYWdlciBkYXRhbW9kZWwgZXZlbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZVZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhdHRhY2hTaWduYWxNYW5hZ2VyRGF0YU1vZGVsRXZlbnRzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwuZXZlbnRTaWduYWxSZW1vdmVkLmF0dGFjaCh0aGlzLl9zaWduYWxNYW5hZ2VyU2lnbmFsUmVtb3ZlZEhhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERldGFjaGVzIHRoZSBzaWduYWwgbWFuYWdlciBkYXRhbW9kZWwgZXZlbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZVZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkZXRhY2hTaWduYWxNYW5hZ2VyRGF0YU1vZGVsRXZlbnRzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwuZXZlbnRTaWduYWxSZW1vdmVkLmRldGFjaCh0aGlzLl9zaWduYWxNYW5hZ2VyU2lnbmFsUmVtb3ZlZEhhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uU2lnbmFsTWFuYWdlclNpZ25hbFJlbW92ZWQoc2VuZGVyLCBzZXJpZSkge1xyXG4gICAgICAgIGlmICh0aGlzLl9jaGFydE1hbmFnZXJEYXRhTW9kZWwpIHtcclxuICAgICAgICAgICAgdGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsLnJlbW92ZVNlcmllRnJvbUFsbENoYXJ0cyhzZXJpZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXR0YWNoZXMgdGhlIGNoYXJ0IG1hbmFnZXIgZGF0YW1vZGVsIGV2ZW50c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXR0YWNoQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsRXZlbnRzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9jaGFydE1hbmFnZXJEYXRhTW9kZWwpIHtcclxuICAgICAgICAgICAgdGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsLmV2ZW50TW9kZWxDaGFuZ2VkLmF0dGFjaCh0aGlzLl9jaGFydE1hbmFnZXJNb2RlbENoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXRhY2hlcyB0aGUgY2hhcnQgbWFuYWdlciB3aWRnZXQgZXZlbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZVZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkZXRhY2hDaGFydE1hbmFnZXJXaWRnZXRFdmVudHMoKSB7XHJcbiAgICAgICAgdGhpcy5fY2hhcnRNYW5hZ2VyV2lkZ2V0LmV2ZW50RHJvcEhlbHBlci5kZXRhY2godGhpcy5fY2hhcnRNYW5hZ2VyV2lkZ2V0ZHJvcEhlbHBlckhhbmRsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGV0YWNoZXMgdGhlIGNoYXJ0IG1hbmFnZXIgZGF0YW1vZGVsIGV2ZW50c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZGV0YWNoQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsRXZlbnRzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9jaGFydE1hbmFnZXJEYXRhTW9kZWwpIHtcclxuICAgICAgICAgICAgdGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsLmV2ZW50TW9kZWxDaGFuZ2VkLmRldGFjaCh0aGlzLl9jaGFydE1hbmFnZXJNb2RlbENoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNoYXJ0TWFuYWdlck1vZGVsQ2hhbmdlZChzZW5kZXIsIGFyZ3MpIHtcclxuICAgICAgICBpZiAodGhpcy5fY2hhcnRWaWV3V2lkZ2V0KSB7XHJcbiAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgY2hhcnQgdmlldyB3aWRnZXRcclxuICAgICAgICAgICAgdGhpcy5fY2hhcnRWaWV3V2lkZ2V0LnJlZnJlc2hDaGFydHMoc2VuZGVyLCBhcmdzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX2N1cnNvckluZm9XaWRnZXQpIHtcclxuICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSBjdXJzb3IgaW5mbyB3aWRnZXRcclxuICAgICAgICAgICAgaWYgKGFyZ3MuaGludCA9PSBDaGFydE1hbmFnZXJEYXRhTW9kZWxDaGFuZ2VkSGludC5hZGRTZXJpZSAmJiBhcmdzLmRhdGEuc2VyaWVzICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3Vyc29ySW5mb1dpZGdldC5hZGRTZXJpZXMoYXJncy5kYXRhLnNlcmllcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoYXJncy5oaW50ID09IENoYXJ0TWFuYWdlckRhdGFNb2RlbENoYW5nZWRIaW50LnJlbW92ZVNlcmllKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJncy5kYXRhLnNpZ25hbFVzZWRJbk90aGVyQ2hhcnRzID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3Vyc29ySW5mb1dpZGdldC5yZW1vdmVTZXJpZShhcmdzLmRhdGEuc2VyaWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgYWN0aXZlQ29tcG9uZW50KGFjdGl2ZUNvbXBvbmVudDogUHJvcGVydHk8TWFwcENvY2twaXRUcmFjZUNvbXBvbmVudD4pIHtcclxuICAgICAgICB0aGlzLl9hY3RpdmVDb21wb25lbnQgPSBhY3RpdmVDb21wb25lbnQ7XHJcbiAgICAgICAgdGhpcy5fYWN0aXZlQ29tcG9uZW50LnZhbHVlLmluaXRpYWxpemUoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fYWN0aXZlQ29tcG9uZW50LmNoYW5nZWQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRBY3RpdmVDb21wb25lbnQgPSB0aGlzLl9hY3RpdmVDb21wb25lbnQudmFsdWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudEFjdGl2ZUNvbXBvbmVudC50cmFjZUNvbnRyb2xJbnRlcmZhY2UgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFjZUNvbnRyb2xJbnRlcmZhY2UgPSBjdXJyZW50QWN0aXZlQ29tcG9uZW50LnRyYWNlQ29udHJvbEludGVyZmFjZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50QWN0aXZlQ29tcG9uZW50LnRyYWNlUGFyYW1ldGVycyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYWNlUGFyYW1ldGVyc0ludGVyZmFjZSA9IGN1cnJlbnRBY3RpdmVDb21wb25lbnQudHJhY2VQYXJhbWV0ZXJzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHRyYWNlUGFyYW1ldGVyc0ludGVyZmFjZSh0cmFjZVBhcmFtZXRlckludGVyZmFjZTogUHJvcGVydHk8SVRyYWNlQ29tcG9uZW50UGFyYW1ldGVycz4pIHtcclxuICAgICAgICB0cmFjZVBhcmFtZXRlckludGVyZmFjZS5jaGFuZ2VkKCh0cmFjZVBhcmFtZXRlckludGVyZmFjZSkgPT4ge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3NpZ25hbE1hbmFnZXJXaWRnZXQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2lnbmFsTWFuYWdlcldpZGdldC5hdmFpbGFibGVEYXRhUG9pbnRzID0gdHJhY2VQYXJhbWV0ZXJJbnRlcmZhY2UuYXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5hdmFpbGFibGVEYXRhUG9pbnRzID0gdHJhY2VQYXJhbWV0ZXJJbnRlcmZhY2UuYXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuXHQgKiBTZXRzIHRoZSBhdmFpbGFibGUgdHJhY2UgZGF0YXBvaW50cyB0byB0aGUgdHJhY2UgdmlldyB3aWRnZXRcclxuXHQgKlxyXG5cdCAqIEBtZW1iZXJvZiBUcmFjZVZpZXdXaWRnZXRcclxuXHQgKi9cclxuICAgIHB1YmxpYyBzZXQgYXZhaWxhYmxlRGF0YVBvaW50cyhhdmFpbGFibGVUcmFjZURhdGFQb2ludHM6IFByb3BlcnR5PFRyYWNlRGF0YVBvaW50SW5mb1tdPikge1xyXG4gICAgICAgIGF2YWlsYWJsZVRyYWNlRGF0YVBvaW50cy5jaGFuZ2VkKChkYXRhUG9pbnRzKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RyYWNlRGF0YVBvaW50SW5mb3MgPSBkYXRhUG9pbnRzO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcblx0ICogU2V0cyBhbmQgZGVmaW5lcyB0aGUgaW50ZXJmYWNlIHRvIHRoZSB0cmFjZSBjb250cm9sXHJcblx0ICpcclxuXHQgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcblx0ICovXHJcbiAgICBwdWJsaWMgc2V0IHRyYWNlQ29udHJvbEludGVyZmFjZSh0cmFjZUNvbXBvbmVudENvbnRyb2w6IElUcmFjZUNvbXBvbmVudENvbnRyb2wpIHtcclxuICAgICAgICB0aGlzLmNvbm5lY3RUcmFjZUNvbnRyb2xXaWRnZXQodHJhY2VDb21wb25lbnRDb250cm9sKTtcclxuICAgICAgICB0aGlzLmNvbm5lY3RUcmFjZVZpZXdXaWRnZXRUb1RyYWNlU3RhdGUodHJhY2VDb21wb25lbnRDb250cm9sKTtcclxuICAgIH1cclxuXHJcblx0LyoqXHJcbiAgICAgKiBTdGFydCBsb2FkaW5nIHRyYWNlIGRhdGEgZnJvbSB0YXJnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZVZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBsb2FkVHJhY2VEYXRhRnJvbVRhcmdldCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fdHJhY2VDb250cm9sSW50ZXJmYWNlID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5faXNMb2FkaW5nVHJhY2VEYXRhID09IHRydWUgfHwgdGhpcy5fd2lkZ2V0SXNBY3RpdmUgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faXNMb2FkaW5nVHJhY2VEYXRhID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl90cmFjZUNvbnRyb2xXaWRnZXQuc2V0QnVzeUluZm9ybWF0aW9uKG5ldyBCdXN5SW5mb3JtYXRpb24oXCJMb2FkaW5nIHRyYWNlIGRhdGFcIiwgSW1hZ2VJZC5kZWZhdWx0SW1hZ2UsIDI1LCBmYWxzZSkpO1xyXG4gICAgICAgIHRoaXMuX3RyYWNlQ29udHJvbFdpZGdldC5zZXRCdXN5KHRydWUpO1xyXG4gICAgICAgIHRoaXMuX3RyYWNlQ29udHJvbEludGVyZmFjZS5jb21tYW5kTG9hZFRyYWNlRGF0YS5leGVjdXRlKG51bGwsIChyZXN1bHQpID0+IHRoaXMudHJhY2VEYXRhTG9hZGVkKHJlc3VsdCksIChlcnJvckRhdGEpID0+IHRoaXMudHJhY2VEYXRhTG9hZGluZ0Vycm9yKGVycm9yRGF0YSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5mb3JtYXRpb25zIGlmIGxvYWRpbmcgb2YgdHJhY2UgZGF0YSBmcm9tIHRhcmdldCBmYWlsZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBlcnJvckRhdGFcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZVZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB0cmFjZURhdGFMb2FkaW5nRXJyb3IoZXJyb3JEYXRhKSB7XHJcbiAgICAgICAgdGhpcy5faXNMb2FkaW5nVHJhY2VEYXRhID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fdHJhY2VDb250cm9sV2lkZ2V0LnNldEJ1c3koZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5mb3JtYXRpb25zKHRyYWNlZGF0YSkgZnJvbSB0YXJnZXQgYWZ0ZXIgc3VjY2Vzc2Z1bCB0cmFjZSBkYXRhIHVwbG9hZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHJlc3VsdFxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHRyYWNlRGF0YUxvYWRlZChyZXN1bHQpIHtcclxuICAgICAgICB2YXIgdHJhY2VEYXRhID0gcmVzdWx0IGFzIFRyYWNlRGF0YTtcclxuICAgICAgICBsZXQgYWRkVHJhY2VEYXRhVG9TaWduYWxNYW5hZ2VyID0gdHJ1ZTtcclxuICAgICAgICAvLyBjaGVjayBpZiBkYXRhIGFscmVhZHkgaW4gc2lnbmFsbWFuYWdlciBkYXRhbW9kZWxcclxuICAgICAgICBpZiAodHJhY2VEYXRhLnRyYWNlQ2hhbm5lbHMubGVuZ3RoID4gMCAmJiB0cmFjZURhdGEudHJhY2VDaGFubmVsc1swXSEudHJhY2VQb2ludHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB2YXIgc2VyaWVHcm91cE5hbWUgPSBEYXRlVGltZUhlbHBlci5nZXREYXRlVGltZSh0cmFjZURhdGEudHJhY2VDaGFubmVsc1swXSEudHJhY2VQb2ludHNbMF0hLnRpbWVTdGFtcCk7XHJcbiAgICAgICAgICAgIGxldCBsYXRlc3RDYXRlZ29yeSA9IHRoaXMuX3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwuZ2V0U2lnbmFsQ2F0ZWdvcnkoU2lnbmFsQ2F0ZWdvcnkuQ2F0ZWdvcnlJZFJlY2VudCk7XHJcbiAgICAgICAgICAgIGlmIChsYXRlc3RDYXRlZ29yeSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBzZXJpZUNvbnRhaW5lciA9IGxhdGVzdENhdGVnb3J5LmdldFNlcmllQ29udGFpbmVyKHNlcmllR3JvdXBOYW1lKTtcclxuICAgICAgICAgICAgICAgIGlmIChzZXJpZUNvbnRhaW5lciAhPSB1bmRlZmluZWQpIHsgLy8gc2lnbmFsIGNvbnRhaW5lciBhbHJlYWR5IGV4aXN0czsgbmVlZGVkIHRvIGF2b2lkIGR1cGxpY2F0ZWQgc2lnbmFsIGNvbnRhaW5lcnMgaWYgZXZlbnQgY29tZXMgbXVsdGlwbGUgdGltZXNcclxuICAgICAgICAgICAgICAgICAgICBhZGRUcmFjZURhdGFUb1NpZ25hbE1hbmFnZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFkZFRyYWNlRGF0YVRvU2lnbmFsTWFuYWdlciA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGlmICh0cmFjZURhdGEudHJhY2VDaGFubmVscy5sZW5ndGggPiAwICYmIHRyYWNlRGF0YS50cmFjZUNoYW5uZWxzWzBdIS50cmFjZVBvaW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFRyYWNlRGF0YVRvU2lnbmFsTWFuYWdlcih0cmFjZURhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2lzTG9hZGluZ1RyYWNlRGF0YSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3RyYWNlQ29udHJvbFdpZGdldC5zZXRCdXN5KGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgdGhlIGdpdmVuIHRyYWNlIGRhdGEgdG8gdGhlIHNpZ25hbCBtYW5hZ2VyXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gdHJhY2VEYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkVHJhY2VEYXRhVG9TaWduYWxNYW5hZ2VyKHRyYWNlRGF0YSkge1xyXG4gICAgICAgIHZhciBuZXdTZXJpZUdyb3VwID0gbmV3IFNlcmllR3JvdXAoRGF0ZVRpbWVIZWxwZXIuZ2V0RGF0ZVRpbWUodHJhY2VEYXRhLnRyaWdnZXJUaW1lKSwgdHJhY2VEYXRhLnRyaWdnZXJUaW1lKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRyYWNlRGF0YS50cmFjZUNoYW5uZWxzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IG5ldyBBcnJheTxJUG9pbnQ+KCk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdHJhY2VEYXRhLnRyYWNlQ2hhbm5lbHNbaV0udHJhY2VQb2ludHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciB4VmFsOiBudW1iZXIgPSAodHJhY2VEYXRhLnRyYWNlQ2hhbm5lbHNbaV0udHJhY2VQb2ludHNbal0udGltZVN0YW1wIC0gdHJhY2VEYXRhLnRyaWdnZXJUaW1lKSAvIDEwMDAwMDA7XHJcbiAgICAgICAgICAgICAgICB2YXIgeVZhbDogbnVtYmVyID0gdHJhY2VEYXRhLnRyYWNlQ2hhbm5lbHNbaV0udHJhY2VQb2ludHNbal0uZGF0YVZhbHVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGRhdGEucHVzaChuZXcgUG9pbnQoeFZhbCwgeVZhbCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBuZXdTaWduYWwgPSBuZXcgU2lnbmFsKHRyYWNlRGF0YS50cmFjZUNoYW5uZWxzW2ldLm5hbWUsIGRhdGEpO1xyXG4gICAgICAgICAgICBsZXQgbmV3U2VyaWUgPSBuZXcgWVRTZXJpZXMobmV3U2lnbmFsLCBuZXdTaWduYWwubmFtZSwgQ29sb3JIZWxwZXIuZ2V0Q29sb3IoKSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl90cmFjZURhdGFQb2ludEluZm9zICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRyYWNlUG9pbnRJbmZvcyA9IHRoaXMuX3RyYWNlRGF0YVBvaW50SW5mb3MuZmlsdGVyKGVsZW1lbnQgPT4gZWxlbWVudC5mdWxsbmFtZSA9PSBuZXdTaWduYWwubmFtZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAodHJhY2VQb2ludEluZm9zLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3U2VyaWUubmFtZSA9IHRyYWNlUG9pbnRJbmZvc1swXS5jb21wb25lbnROYW1lICsgXCI6XCIgKyB0cmFjZVBvaW50SW5mb3NbMF0ubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICBuZXdTZXJpZS5kZXNjcmlwdGlvbiA9IHRyYWNlUG9pbnRJbmZvc1swXS5kZXNjcmlwdGlvbjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBuZXdTZXJpZUdyb3VwLmFkZFNlcmllKG5ld1NlcmllKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hZGRTZXJpZUdyb3VwVG9TaWduYWxNYW5hZ2VyKG5ld1NlcmllR3JvdXApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIHNpZ25hbCBncm91cCB0byB0aGUgZGF0YW1vZGVsKGludG8gdXBsb2FkZWQtPmxhdGVzdCBjYXRlZ29yeSBhbmQgY3JlYXRlcyBhIGNsb25lIHRvIHVwbG9hZGVkLT5hbGwgY2F0ZWdvcnkgKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0lTZXJpZUdyb3VwfSBzZXJpZUdyb3VwXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkU2VyaWVHcm91cFRvU2lnbmFsTWFuYWdlcihzZXJpZUdyb3VwOiBJU2VyaWVHcm91cCkge1xyXG4gICAgICAgIGxldCBzdWJDYXRlZ29yeVJlY2VudCA9IHRoaXMuX3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwuZ2V0U2lnbmFsQ2F0ZWdvcnkoU2lnbmFsQ2F0ZWdvcnkuQ2F0ZWdvcnlJZFJlY2VudCk7XHJcbiAgICAgICAgbGV0IHN1YkNhdGVnb3J5QWxsID0gdGhpcy5fc2lnbmFsTWFuYWdlckRhdGFNb2RlbC5nZXRTaWduYWxDYXRlZ29yeShTaWduYWxDYXRlZ29yeS5DYXRlZ29yeUlkVXBsb2FkZWQpO1xyXG4gICAgICAgIGlmIChzdWJDYXRlZ29yeVJlY2VudCAhPSB1bmRlZmluZWQgJiYgc3ViQ2F0ZWdvcnlBbGwgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGxldCBzZXJpZUdyb3VwQ2xvbmU7XHJcbiAgICAgICAgICAgIGlmIChzdWJDYXRlZ29yeVJlY2VudC5nZXRDaGlsZHMoKS5sZW5ndGggPiAwKSB7IC8vIENvcHkgbGF0ZXN0IHVwbG9hZGVkIGRhdGEgdG8gYWxsIGlmIGF2YWlsYWJsZVxyXG4gICAgICAgICAgICAgICAgbGV0IGxhdGVzdFNlcmllR3JvdXAgPSBzdWJDYXRlZ29yeVJlY2VudC5nZXRDaGlsZHMoKVswXSBhcyBJU2VyaWVHcm91cDtcclxuICAgICAgICAgICAgICAgIGxhdGVzdFNlcmllR3JvdXAubWVyZ2VXaXRoU2VyaWVHcm91cChzZXJpZUdyb3VwKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZXJpZUdyb3VwQ2xvbmUgPSBsYXRlc3RTZXJpZUdyb3VwLmNsb25lKCkgYXMgSVNlcmllR3JvdXA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7IC8vIEFkZCB1cGxvYWRlZCBkYXRhIHRvIFwicmVjZW50XCIgYW5kIGNsb25lIHRvIFwiYWxsXCJcclxuICAgICAgICAgICAgICAgIHN1YkNhdGVnb3J5UmVjZW50LmFkZFNlcmllQ29udGFpbmVyKHNlcmllR3JvdXAsIC0xKTtcclxuICAgICAgICAgICAgICAgIHNlcmllR3JvdXBDbG9uZSA9IHNlcmllR3JvdXAuY2xvbmUoKSBhcyBJU2VyaWVHcm91cDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzdWJDYXRlZ29yeUFsbC5hZGRTZXJpZUNvbnRhaW5lcihzZXJpZUdyb3VwQ2xvbmUsIDApO1xyXG4gICAgICAgICAgICAvLyBUT0RPOiBDYWxjdWxhdGUgYWZ0ZXIgY2xvbmVcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAgIENvbm5lY3RzIHRoZSB0cmFjZSBjb250cm9sIHdpZGdldCB0byB0aGUgdHJhY2UgY29udHJvbCBwcm92aWRlclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SVRyYWNlQ29tcG9uZW50Q29udHJvbH0gdHJhY2VDb21wb25lbnRDb250cm9sXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZVZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb25uZWN0VHJhY2VDb250cm9sV2lkZ2V0KHRyYWNlQ29tcG9uZW50Q29udHJvbDogSVRyYWNlQ29tcG9uZW50Q29udHJvbCk6IGFueSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3RyYWNlQ29udHJvbFdpZGdldCkge1xyXG4gICAgICAgICAgICB0aGlzLl90cmFjZUNvbnRyb2xXaWRnZXQudHJhY2VDb250cm9sSW50ZXJmYWNlID0gdGhpcy5nZXRJbnRlcmZhY2VXaXRob3V0U2F2ZUNvbW1hbmQodHJhY2VDb21wb25lbnRDb250cm9sKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmFjZSBjb21wb25lbnQgY29udHJvbCB3aXRoIG91dCB0aGUgc2F2ZS9pbXBvcnQvZXhwb3J0IHRyYWNlIGNvbmZpZ3VyYXRpb24gY29tbWFuZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0lUcmFjZUNvbXBvbmVudENvbnRyb2x9IHRyYWNlQ29tcG9uZW50Q29udHJvbFxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0SW50ZXJmYWNlV2l0aG91dFNhdmVDb21tYW5kKHRyYWNlQ29tcG9uZW50Q29udHJvbDogSVRyYWNlQ29tcG9uZW50Q29udHJvbCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY29tbWFuZEFjdGl2YXRlOiB0cmFjZUNvbXBvbmVudENvbnRyb2wuY29tbWFuZEFjdGl2YXRlLFxyXG4gICAgICAgICAgICBjb21tYW5kRm9yY2VTdGFydDogdHJhY2VDb21wb25lbnRDb250cm9sLmNvbW1hbmRGb3JjZVN0YXJ0LFxyXG4gICAgICAgICAgICBjb21tYW5kRm9yY2VTdG9wOiB0cmFjZUNvbXBvbmVudENvbnRyb2wuY29tbWFuZEZvcmNlU3RvcCxcclxuICAgICAgICAgICAgdHJhY2VTdGF0ZTogdHJhY2VDb21wb25lbnRDb250cm9sLnRyYWNlU3RhdGUsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICAgQ29ubmVjdHMgdGhlIFRyYWNlVmlld1dpZGdldCB0byB0aGUgdHJhY2UgY29udHJvbCBwcm92aWRlcih0cmFjZSBzdGF0ZSlcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lUcmFjZUNvbXBvbmVudENvbnRyb2x9IHRyYWNlQ29tcG9uZW50Q29udHJvbFxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29ubmVjdFRyYWNlVmlld1dpZGdldFRvVHJhY2VTdGF0ZSh0cmFjZUNvbXBvbmVudENvbnRyb2w6IElUcmFjZUNvbXBvbmVudENvbnRyb2wpOiBhbnkge1xyXG4gICAgICAgIHRoaXMuX3RyYWNlQ29udHJvbEludGVyZmFjZSA9IHRyYWNlQ29tcG9uZW50Q29udHJvbDtcclxuICAgICAgICB0aGlzLl9pc0xvYWRpbmdUcmFjZURhdGEgPSBmYWxzZTtcclxuICAgICAgICBsZXQgb2xkVHJhY2VTdGF0ZVZhbHVlID0gdGhpcy5fdHJhY2VDb250cm9sSW50ZXJmYWNlLnRyYWNlU3RhdGUudmFsdWUudmFsdWUudG9TdHJpbmcoKTtcclxuICAgICAgICBpZiAob2xkVHJhY2VTdGF0ZVZhbHVlID09IFRyYWNlU3RhdGVJZHMuRGF0YV9hdmFpbGFibGUpIHtcclxuICAgICAgICAgICAgLy8gSW5pdGlhbCBsb2FkIHRyYWNlIGRhdGFcclxuICAgICAgICAgICAgdGhpcy5sb2FkVHJhY2VEYXRhRnJvbVRhcmdldCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fdHJhY2VDb250cm9sSW50ZXJmYWNlLnRyYWNlU3RhdGUuY2hhbmdlZCgodHJhY2VTdGF0ZVBhcmFtZXRlcikgPT4ge1xyXG4gICAgICAgICAgICBpZiAodHJhY2VTdGF0ZVBhcmFtZXRlci52YWx1ZS50b1N0cmluZygpID09IFRyYWNlU3RhdGVJZHMuRGF0YV9hdmFpbGFibGUgJiYgb2xkVHJhY2VTdGF0ZVZhbHVlICE9IFRyYWNlU3RhdGVJZHMuRGF0YV9hdmFpbGFibGUpIHtcclxuICAgICAgICAgICAgICAgIC8vIEF1dG8gdXBsb2FkIG9mIHRyYWNlIGRhdGFcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZFRyYWNlRGF0YUZyb21UYXJnZXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvbGRUcmFjZVN0YXRlVmFsdWUgPSB0cmFjZVN0YXRlUGFyYW1ldGVyLnZhbHVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBUcmFjZVZpZXdXaWRnZXQgfTsiXX0=