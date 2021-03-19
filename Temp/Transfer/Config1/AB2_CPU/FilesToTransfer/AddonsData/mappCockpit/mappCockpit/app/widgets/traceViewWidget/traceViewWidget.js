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
define(["require", "exports", "../../common/dateTimeHelper", "../../models/signalManagerDataModel/signalCategory", "../../models/common/signal/serieGroup", "../../models/common/signal/signal", "../../models/common/point", "../../common/colorHelper", "../common/busyInformation", "../../models/chartManagerDataModel/chartManagerChart", "../../models/chartManagerDataModel/chartManagerDataModel", "../../models/diagnostics/trace/traceConfig/traceConfigDefines", "../../models/chartManagerDataModel/YTSeries", "../common/viewBase", "../chartViewWidget/helpers/chartDropHelper", "../chartViewWidget/insertedInfo", "../../models/signalManagerDataModel/signalManagerCalculation", "../../models/chartManagerDataModel/scale", "../chartWidget/ChartBase", "../common/SerieChartTypeHelper", "../../models/chartManagerDataModel/seriesType", "./defaultComponentSettings", "../../models/common/seriesProvider/seriesProvider", "../../common/componentFactory/componentFactory"], function (require, exports, dateTimeHelper_1, signalCategory_1, serieGroup_1, signal_1, point_1, colorHelper_1, busyInformation_1, chartManagerChart_1, chartManagerDataModel_1, traceConfigDefines_1, YTSeries_1, viewBase_1, chartDropHelper_1, insertedInfo_1, signalManagerCalculation_1, scale_1, ChartBase_1, SerieChartTypeHelper_1, seriesType_1, defaultComponentSettings_1, seriesProvider_1, componentFactory_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TraceViewWidget = /** @class */ (function (_super) {
        __extends(TraceViewWidget, _super);
        function TraceViewWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._isLoadingTraceData = false;
            _this._widgetIsActive = true;
            // Event handlers
            _this._contentActivatedHandler = function (sender, args) { return _this.onContentActivated(sender, args); };
            _this._chartViewWidgetDropChangedHandler = function (sender, args) { return _this.onDropChanged(sender, args); };
            _this._signalManagerWidgetSerieDoubleClickedHandler = function (sender, data) { return _this.onSignalManagerWidgetSerieDoubleClicked(sender, data); };
            _this._signalManagerWidgetChangeSizeHandler = function (sender, data) { return _this.onSignalManagerWidgetChangeSize(sender, data); };
            _this._signalManagerSignalRemovedHandler = function (sender, data) { return _this.onSignalManagerSignalRemoved(sender, data); };
            _this._chartManagerWidgetdropHelperHandler = function (sender, args) { return _this.onDropChanged(sender, args); };
            _this._chartManagerModelChangedHandler = function (sender, data) { return _this.onChartManagerModelChanged(sender, data); };
            _this._traceState = "";
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
        };
        TraceViewWidget.prototype.initializeComponent = function () {
            this.component.defaultSettingsDataId = defaultComponentSettings_1.DefaultComponentSettings.WidgetDefinitionId;
            this.component.disablePersisting();
        };
        /**
         * Returns the default component settings for this widget
         *
         * @returns {*}
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.getDefaultComponentSettings = function () {
            return defaultComponentSettings_1.DefaultComponentSettings.getTraceViewDefinition();
        };
        /**
         * Adds some default persisting data packages in the main default persisting data provider
         *
         * @private
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.addAdditionalDefaultComponentSettings = function () {
            // Splitter definitions  
            this.addDefaultComponentSettingsToProvider(defaultComponentSettings_1.DefaultComponentSettings.MainSplitterDefinitionId, defaultComponentSettings_1.DefaultComponentSettings.getMainSplitterDefinition());
            this.addDefaultComponentSettingsToProvider(defaultComponentSettings_1.DefaultComponentSettings.InnerSplitterDefinitionId, defaultComponentSettings_1.DefaultComponentSettings.getInnerSplitterDefinition());
            this.addDefaultComponentSettingsToProvider(defaultComponentSettings_1.DefaultComponentSettings.RightSplitterDefinitionId, defaultComponentSettings_1.DefaultComponentSettings.getRightSplitterDefinition());
        };
        /**
         * Sets the widget content and eventually subwidgets
         *
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.initialized = function () {
            this.initLayoutWidget();
            this.setTraceControlWidget();
            this.setInnerWidgets();
        };
        TraceViewWidget.prototype.initLayoutWidget = function () {
            this._layoutWidget = this.component.getSubComponent("SplitterWidget_TraceView");
            this.attachLayoutToView(this);
            this._layoutWidget.initialize(this.parentContentId);
            this._layoutWidget.eventWidgetActivated.attach(this._contentActivatedHandler);
        };
        /**
         * Sets the inner widgets (signalmanager, chart view, chartmanager/cursorinfo)
         *
         * @private
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.setInnerWidgets = function () {
            // Create left widget
            this.setSignalManagerWidget();
            this.attachSignalManagerWidgetEvents();
            // Create the middle widget
            this.setChartViewWidget();
            // Create the widgets on the right side
            this.setRightWidgets();
            this.attachSignalManagerDataModelEvents();
        };
        /**
         * Sets the right widgets (chartmanager, cursorinfo)
         *
         * @private
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.setRightWidgets = function () {
            // Sets the chart manager widget on top
            this.setChartManagerWidget();
            this.attachChartManagerDataModelEvents();
        };
        /**
         * Sets the trace control widget
         *
         * @returns {*}
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.setTraceControlWidget = function () {
            this._traceControlWidget = this.getWidgetById("TraceControlWidget");
        };
        /**
         * Sets the signal manager widget
         *
         * @private
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.setSignalManagerWidget = function () {
            this._signalManagerWidget = this.getWidgetById("SignalManagerWidget");
            this._signalManagerDataModel = this._signalManagerWidget.dataModel;
        };
        /**
         * Sets the chart view widget
         *
         * @private
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.setChartViewWidget = function () {
            this._chartViewWidget = this.getWidgetById("ChartViewWidget");
            this._chartViewWidget.eventDropHelper.attach(this._chartViewWidgetDropChangedHandler);
        };
        /**
         * Sets the chart manager widget
         *
         * @private
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.setChartManagerWidget = function () {
            this._chartManagerWidget = this.getWidgetById("ChartManagerWidget");
            this._chartManagerWidget.eventDropHelper.attach(this._chartManagerWidgetdropHelperHandler);
            // TODO:
            this._chartManagerDataModel = this._chartManagerWidget.dataModel;
        };
        /**
         * Activate the widget
         *
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.activate = function () {
            this._layoutWidget.activate();
        };
        TraceViewWidget.prototype.dispose = function () {
            this._widgetIsActive = false;
            this._layoutWidget.dispose();
            // Detach events
            this.detachEvents();
            // Dispose SeriesProvider
            // TODO: Last user must dispose
            seriesProvider_1.SeriesProvider.getInstance().dispose();
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
        };
        /**
         * Dispose all data models
         *
         * @private
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.disposeDataModels = function () {
            // TODO: Dispose datamodels central
            if (this._signalManagerDataModel != undefined) {
                this._signalManagerDataModel.dispose();
            }
            if (this._chartManagerDataModel != undefined) {
                this._chartManagerDataModel.dispose();
                // TODO: only needed to remove singleton instance of chartmanagerDataModel
                componentFactory_1.ComponentFactory._chartManagerInstance = undefined;
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
        TraceViewWidget.prototype.onContentActivated = function (sender, args) {
            args.widget.activate();
            this.resize(this._actualWidth, this._actualHeight);
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
        TraceViewWidget.prototype.onDropChanged = function (chartManagerDataModel, args) {
            switch (args.hint) {
                case chartDropHelper_1.ChartDropHelperChangedHint.createChart: {
                    //creates a chart an adds its series
                    var chartName = chartManagerDataModel.getUniqueChartName();
                    var chartManagerChart = new chartManagerChart_1.ChartManagerChart(chartName, args.data.type);
                    chartManagerDataModel.addChart(chartManagerChart, -1);
                    if (args.data.series != undefined) {
                        var yAxisId = chartManagerChart.getDefaultYAxisId();
                        var series = args.data.series;
                        if (args.data.type != chartManagerChart_1.ChartType.YTChart && args.data.series[0].type == seriesType_1.SeriesType.timeSeries) {
                            this._signalManagerWidget.suppressRefresh(true);
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
                            this._signalManagerWidget.suppressRefresh(false);
                            if (!this._signalManagerWidget.editModeActive && args.data.type == chartManagerChart_1.ChartType.XYChart) {
                                this._signalManagerWidget.activateEditMode(true);
                            }
                        }
                        //Add all dragged series to the chart.
                        this.addSerieToChart(chartManagerDataModel, series, chartManagerChart, yAxisId);
                    }
                    break;
                }
                case chartDropHelper_1.ChartDropHelperChangedHint.addSerie: {
                    var series = args.data.series;
                    var chart = args.data.chart;
                    var yAxis = args.data.yAxis;
                    if (chart != undefined) {
                        var yAxisId = this.getYAxisId(chartManagerDataModel, chart, yAxis, args.data.targetChart);
                        //insert serie to empty a chart
                        this.addSerieToChart(chartManagerDataModel, series, chart, yAxisId);
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
                    this.addSerieToChart(chartManagerDataModel, series, chartManagerChart, yAxisId);
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
                    var yAxisId = this.getYAxisId(chartManagerDataModel, chart, yAxis, args.data.targetChart);
                    //Add all dragged series to the chart.
                    this.addSerieToChart(chartManagerDataModel, series, chart, yAxisId);
                }
            }
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
            this.addNewChart(this._chartManagerWidget.dataModel, serie);
        };
        TraceViewWidget.prototype.onSignalManagerWidgetChangeSize = function (sender, newSize) {
            // get parent(splitter) widget of sender(signalManager)
            var innerLayoutSplitterWidget = this.getWidgetById("SplitterWidget_MainTrace");
            // change size of splitter pane
            innerLayoutSplitterWidget.resizeWidget(sender, newSize);
        };
        /**
         * Adds a new chart to the chartmanager datamodel(if possible => max chart number) and adds the given signal to the new chart
         *
         * @private
         * @param {BaseSeries} serie
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.addNewChart = function (chartManagerDataModel, serie) {
            if (chartManagerDataModel) {
                var newChartName = chartManagerDataModel.getUniqueChartName();
                var serieChartType = new SerieChartTypeHelper_1.SerieChartTypeHelper().getSerieChartType(serie.type);
                var newChart = new chartManagerChart_1.ChartManagerChart(newChartName, serieChartType);
                var isChartAdded = chartManagerDataModel.addChart(newChart, 0);
                if (serie != undefined && isChartAdded) {
                    var series = new Array();
                    series.push(serie);
                    var yAxis = newChart.getYScale(newChart.getDefaultYAxisId());
                    if (yAxis != undefined) {
                        this.addSerieToChart(chartManagerDataModel, series, newChart, yAxis.id);
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
        TraceViewWidget.prototype.addSerieToChart = function (chartManagerDataModel, series, chartManagerChart, yAxisId) {
            var yAxis = chartManagerChart.getYScale(yAxisId);
            var insertedInfo = new insertedInfo_1.InsertedInfo(series, yAxis, chartManagerChart);
            if (insertedInfo != undefined && insertedInfo.yAxis != undefined && insertedInfo.chart != undefined) {
                chartManagerDataModel.addSeriesToChart(insertedInfo.chart, insertedInfo.series, insertedInfo.yAxis);
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
                calculation.setValue(0, series[0].name);
            }
            if (series.length > 1 && series[1] != undefined) {
                calculation.setValue(1, series[1].name);
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
            calculation.setValue(0, series.name);
            // Change output data name and color of new FFT calculation
            var inputData = calculation.getInputCalculationData();
            var outputData = calculation.getOutputCalculationData();
            if (inputData[0].serie != undefined && inputData[0].serie.rawPointsValid) {
                var outputData_1 = calculation.getOutputCalculationData();
                if (outputData_1.length > 0) {
                    outputData_1[0].color = inputData[0].serie.color;
                    outputData_1[0].value = 'FFT(' + inputData[0].serie.name + ') ' + calculation.serie.calculationDataInfo.uniqueId;
                }
            }
            // Return calculation output data 
            return outputData[0].serie;
        };
        /**
         *
         *
         * @private
         * @param {IChartManagerDataModel} chartManagerDataModel
         * @param {IChartManagerChart} chart
         * @param {(Scale | undefined)} yAxis
         * @param {(ITraceChart | undefined)} targetChart
         * @returns {string}
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.getYAxisId = function (chartManagerDataModel, chart, yAxis, targetChart) {
            var yAxisId;
            if (yAxis != undefined) {
                chart = yAxis.parent;
                yAxisId = yAxis.id;
            }
            else {
                yAxisId = this.getYScaleId(chartManagerDataModel, chart, targetChart);
                if (yAxisId == undefined) {
                    // Create new scale
                    yAxisId = chart.getNextYAxisId();
                    var newYAxis = new scale_1.Scale(yAxisId, chart);
                    chartManagerDataModel.addYScale(chart, newYAxis);
                }
            }
            return yAxisId;
        };
        /**
         * Return yAxis id when serie is dropped in the chart view
         *
         * @private
         * @param {DataModels.IChartManagerDataModel} chartManagerDataModel
         * @param {IChartManagerChart} chartManagerChart
         * @param {*} targetChart
         * @returns {string}
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.getYScaleId = function (chartManagerDataModel, chartManagerChart, targetChart) {
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
                    chartManagerDataModel.addYScale(chartManagerChart, newYAxis);
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
            var cursorInfoWidget = this.getWidgetById("CursorInfoWidget");
            if (cursorInfoWidget) {
                // Update the cursor info widget
                if (args.hint == chartManagerDataModel_1.ChartManagerDataModelChangedHint.addSerie && args.data.series != undefined) {
                    cursorInfoWidget.addSeries(args.data.series);
                }
                else if (args.hint == chartManagerDataModel_1.ChartManagerDataModelChangedHint.removeSerie) {
                    if (args.data.signalUsedInOtherCharts == false) {
                        cursorInfoWidget.removeSerie(args.data.serie);
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
                this.connectTraceViewWidgetToTraceState();
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
            if (this._isLoadingTraceData == true || this._widgetIsActive == false) {
                return;
            }
            this._isLoadingTraceData = true;
            this._traceControlWidget.setBusyInformation(new busyInformation_1.BusyInformation("Loading trace data", busyInformation_1.ImageId.defaultImage, 25, false));
            this._traceControlWidget.setBusy(true);
            // invoke loading trace data
            this.invokeLoadTraceData();
        };
        TraceViewWidget.prototype.invokeLoadTraceData = function () {
            // BINDINGSOURCE: method for dispatching the call to a bound target
        };
        /**
         * Informations if loading of trace data from target failed
         *
         * @private
         * @param {*} errorData
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.onErrorLoadingTraceData = function (errorData) {
            this._isLoadingTraceData = false;
            this._traceControlWidget.setBusy(false);
        };
        /**
         * handles trace state changes
         *
         * @param {*} traceState
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.onTraceStateChanged = function (traceState, oldTraceState) {
            this._traceState = traceState;
            if (traceState == traceConfigDefines_1.TraceStateIds.Data_available && oldTraceState != traceConfigDefines_1.TraceStateIds.Data_available) {
                // Auto upload of trace data
                this.loadTraceDataFromTarget();
            }
        };
        /**
         * Informations(tracedata) from target after successful trace data upload
         *
         * @private
         * @param {*} result
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.onTraceDataLoaded = function (result) {
            var traceData = result;
            var addTraceDataToSignalManager = true;
            // check if data already in signalmanager datamodel
            if (traceData.traceChannels.length > 0 && traceData.traceChannels[0].tracePoints.length > 0) {
                var serieGroupName = dateTimeHelper_1.DateTimeHelper.getDateTime(traceData.traceChannels[0].tracePoints[0].timeStamp);
                if (this._signalManagerDataModel != undefined) {
                    if (this._signalManagerDataModel["disposed"] != true) { // Bugfix to avoid use of not unbinded datamodel
                        var latestCategory = this._signalManagerDataModel.getSignalCategory(signalCategory_1.SignalCategory.CategoryIdRecent);
                        if (latestCategory != undefined) {
                            var serieContainer = latestCategory.getSerieContainer(serieGroupName);
                            if (serieContainer != undefined) { // signal container already exists; needed to avoid duplicated signal containers if event comes multiple times
                                addTraceDataToSignalManager = false;
                            }
                        }
                    }
                }
                else {
                    console.error("signalManagerDataModel not available");
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
                var newSerie = new YTSeries_1.YTSeries(newSignal, newSignal.name, colorHelper_1.ColorHelper.getColor(), seriesProvider_1.SeriesProvider.getInstance());
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
            this._signalManagerDataModel.addUploadedSerieGroup(newSerieGroup);
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
                commandForceStart: traceComponentControl.commandForceStart,
                commandForceStop: traceComponentControl.commandForceStop,
                traceState: traceComponentControl.traceState,
            };
        };
        /**
         *   Connects the TraceViewWidget to the trace control provider(trace state)
         *
         * @returns {*}
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.connectTraceViewWidgetToTraceState = function () {
            this._isLoadingTraceData = false;
            // load trace data initially if available
            if (this._traceState == traceConfigDefines_1.TraceStateIds.Data_available) {
                // Initial load trace data
                this.loadTraceDataFromTarget();
            }
        };
        return TraceViewWidget;
    }(viewBase_1.ViewBase));
    exports.TraceViewWidget = TraceViewWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VWaWV3V2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RyYWNlVmlld1dpZGdldC90cmFjZVZpZXdXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQXdDQTtRQUE4QixtQ0FBUTtRQUF0QztZQUFBLHFFQWkxQkM7WUFuMEJXLHlCQUFtQixHQUFHLEtBQUssQ0FBQztZQUk1QixxQkFBZSxHQUFHLElBQUksQ0FBQztZQUUvQixpQkFBaUI7WUFDVCw4QkFBd0IsR0FBRyxVQUFDLE1BQU0sRUFBRSxJQUFJLElBQUssT0FBQSxLQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFyQyxDQUFxQyxDQUFDO1lBRW5GLHdDQUFrQyxHQUFHLFVBQUMsTUFBTSxFQUFFLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFoQyxDQUFnQyxDQUFDO1lBRXhGLG1EQUE2QyxHQUFHLFVBQUMsTUFBTSxFQUFFLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyx1Q0FBdUMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQTFELENBQTBELENBQUM7WUFDN0gsMkNBQXFDLEdBQUcsVUFBQyxNQUFNLEVBQUUsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLCtCQUErQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBbEQsQ0FBa0QsQ0FBQztZQUM3Ryx3Q0FBa0MsR0FBRyxVQUFDLE1BQU0sRUFBRSxJQUFJLElBQUssT0FBQSxLQUFJLENBQUMsNEJBQTRCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUEvQyxDQUErQyxDQUFDO1lBRXZHLDBDQUFvQyxHQUFHLFVBQUMsTUFBTSxFQUFFLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLElBQUksQ0FB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Ozs7O1dBT0c7UUFDSyx3REFBOEIsR0FBdEMsVUFBdUMscUJBQTZDO1lBQ2hGLE9BQU87Z0JBQ0gsaUJBQWlCLEVBQUUscUJBQXFCLENBQUMsaUJBQWlCO2dCQUMxRCxnQkFBZ0IsRUFBRSxxQkFBcUIsQ0FBQyxnQkFBZ0I7Z0JBQ3hELFVBQVUsRUFBRSxxQkFBcUIsQ0FBQyxVQUFVO2FBQy9DLENBQUM7UUFDTixDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSyw0REFBa0MsR0FBMUM7WUFDSSxJQUFJLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDO1lBRWpDLHlDQUF5QztZQUN6QyxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksa0NBQWEsQ0FBQyxjQUFjLEVBQUU7Z0JBQ2xELDBCQUEwQjtnQkFDMUIsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7YUFDbEM7UUFDTCxDQUFDO1FBQ0wsc0JBQUM7SUFBRCxDQUFDLEFBajFCRCxDQUE4QixtQkFBUSxHQWkxQnJDO0lBRVEsMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBXaWRnZXRzIGZyb20gXCIuLi8uLi93aWRnZXRzL3dpZGdldHNcIjtpbXBvcnQgKiBhcyBEYXRhTW9kZWxzIGZyb20gJy4uLy4uL21vZGVscy9kYXRhTW9kZWxzJztcclxuaW1wb3J0IHsgUHJvcGVydHkgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL3Byb3BlcnR5XCI7XHJcblxyXG5pbXBvcnQgeyBJVHJhY2VDb21wb25lbnRDb250cm9sIH0gZnJvbSBcIi4uLy4uL21vZGVscy9kaWFnbm9zdGljcy90cmFjZS9pbnRlcmZhY2VzL3RyYWNlQ29udHJvbFByb3ZpZGVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0VHJhY2VDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2RpYWdub3N0aWNzL3RyYWNlL21hcHBDb2NrcGl0VHJhY2VDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgVHJhY2VEYXRhIH0gZnJvbSBcIi4uLy4uL21vZGVscy9kaWFnbm9zdGljcy90cmFjZS90cmFjZURhdGFSZWFkZXJcIjtcclxuaW1wb3J0IHsgRGF0ZVRpbWVIZWxwZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2RhdGVUaW1lSGVscGVyXCI7XHJcbmltcG9ydCB7IFNpZ25hbENhdGVnb3J5IH0gZnJvbSBcIi4uLy4uL21vZGVscy9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsL3NpZ25hbENhdGVnb3J5XCI7XHJcbmltcG9ydCB7IFNlcmllR3JvdXAgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbW1vbi9zaWduYWwvc2VyaWVHcm91cFwiO1xyXG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbW1vbi9pbnRlcmZhY2VzL3BvaW50SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNpZ25hbCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL3NpZ25hbC9zaWduYWxcIjtcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbW1vbi9wb2ludFwiO1xyXG5pbXBvcnQgeyBDb2xvckhlbHBlciB9IGZyb20gXCIuLi8uLi9jb21tb24vY29sb3JIZWxwZXJcIjtcclxuaW1wb3J0IHsgQnVzeUluZm9ybWF0aW9uLCBJbWFnZUlkIH0gZnJvbSBcIi4uL2NvbW1vbi9idXN5SW5mb3JtYXRpb25cIjtcclxuaW1wb3J0IHsgQ2hhcnRNYW5hZ2VyQ2hhcnQsIENoYXJ0VHlwZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2NoYXJ0TWFuYWdlckNoYXJ0XCI7XHJcbmltcG9ydCB7IENoYXJ0TWFuYWdlckRhdGFNb2RlbENoYW5nZWRIaW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsXCI7XHJcbmltcG9ydCB7IFRyYWNlU3RhdGVJZHMgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2RpYWdub3N0aWNzL3RyYWNlL3RyYWNlQ29uZmlnL3RyYWNlQ29uZmlnRGVmaW5lc1wiO1xyXG5pbXBvcnQgeyBZVFNlcmllcyB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL1lUU2VyaWVzXCI7XHJcbmltcG9ydCB7IFRyYWNlRGF0YVBvaW50SW5mbyB9IGZyb20gXCIuLi8uLi9tb2RlbHMvZGlhZ25vc3RpY3MvdHJhY2UvdHJhY2VEYXRhUG9pbnRJbmZvXCI7XHJcbmltcG9ydCB7IFZpZXdCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi92aWV3QmFzZVwiO1xyXG5pbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvYmFzZVNlcmllc1wiO1xyXG5pbXBvcnQgeyBJVHJhY2VDb21wb25lbnRQYXJhbWV0ZXJzIH0gZnJvbSBcIi4uLy4uL21vZGVscy9kaWFnbm9zdGljcy90cmFjZS9pbnRlcmZhY2VzL3RyYWNlQ29tcG9uZW50UGFyYW1ldGVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IENoYXJ0RHJvcEhlbHBlckNoYW5nZWRIaW50IH0gZnJvbSBcIi4uL2NoYXJ0Vmlld1dpZGdldC9oZWxwZXJzL2NoYXJ0RHJvcEhlbHBlclwiO1xyXG5pbXBvcnQgeyBJbnNlcnRlZEluZm8gfSBmcm9tIFwiLi4vY2hhcnRWaWV3V2lkZ2V0L2luc2VydGVkSW5mb1wiO1xyXG5pbXBvcnQgeyBJQ2hhcnRNYW5hZ2VyQ2hhcnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9pbnRlcmZhY2VzL2NoYXJ0TWFuYWdlckNoYXJ0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbiB9IGZyb20gXCIuLi8uLi9tb2RlbHMvc2lnbmFsTWFuYWdlckRhdGFNb2RlbC9zaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25cIjtcclxuaW1wb3J0IHsgSVNlcmllQ29udGFpbmVyIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb21tb24vaW50ZXJmYWNlcy9zZXJpZUNvbnRhaW5lckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTY2FsZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL3NjYWxlXCI7XHJcbmltcG9ydCB7IENoYXJ0T2JqZWN0VHlwZSB9IGZyb20gXCIuLi9jaGFydFdpZGdldC9DaGFydEJhc2VcIjtcclxuaW1wb3J0IHsgU2VyaWVDaGFydFR5cGVIZWxwZXIgfSBmcm9tIFwiLi4vY29tbW9uL1NlcmllQ2hhcnRUeXBlSGVscGVyXCI7XHJcbmltcG9ydCB7IElUcmFjZUNoYXJ0IH0gZnJvbSBcIi4uL2NoYXJ0V2lkZ2V0L2ludGVyZmFjZXMvdHJhY2VDaGFydEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTZXJpZXNUeXBlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvc2VyaWVzVHlwZVwiO1xyXG5pbXBvcnQgeyBYWVNlcmllcyB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL1hZU2VyaWVzXCI7XHJcbmltcG9ydCB7IEZGVFNlcmllcyB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL0ZGVFNlcmllc1wiO1xyXG5pbXBvcnQgeyBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi9kZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgU2VyaWVzUHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbW1vbi9zZXJpZXNQcm92aWRlci9zZXJpZXNQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRGYWN0b3J5IH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRGYWN0b3J5L2NvbXBvbmVudEZhY3RvcnlcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgSUxheW91dFdpZGdldCB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy9sYXlvdXRXaWRnZXRJbnRlcmZhY2VcIjtcclxuXHJcbmNsYXNzIFRyYWNlVmlld1dpZGdldCBleHRlbmRzIFZpZXdCYXNlIHtcclxuXHJcbiAgICBwcml2YXRlIF9jaGFydE1hbmFnZXJEYXRhTW9kZWwhOiBEYXRhTW9kZWxzLklDaGFydE1hbmFnZXJEYXRhTW9kZWw7XHJcbiAgICBwcml2YXRlIF9jaGFydE1hbmFnZXJXaWRnZXQhOiBXaWRnZXRzLklDaGFydE1hbmFnZXJXaWRnZXQ7XHJcblxyXG4gICAgcHJpdmF0ZSBfc2lnbmFsTWFuYWdlckRhdGFNb2RlbCE6IERhdGFNb2RlbHMuSVNpZ25hbE1hbmFnZXJEYXRhTW9kZWw7XHJcbiAgICBwdWJsaWMgX3NpZ25hbE1hbmFnZXJXaWRnZXQ/OiBXaWRnZXRzLklTaWduYWxNYW5hZ2VyV2lkZ2V0O1xyXG5cclxuXHJcbiAgICBwcml2YXRlIF9jaGFydFZpZXdXaWRnZXQ/OiBXaWRnZXRzLklDaGFydFZpZXdXaWRnZXQ7XHJcblxyXG4gICAgcHJpdmF0ZSBfYWN0aXZlQ29tcG9uZW50ITogUHJvcGVydHk8TWFwcENvY2twaXRUcmFjZUNvbXBvbmVudD47XHJcbiAgICBwcml2YXRlIF90cmFjZUNvbnRyb2xXaWRnZXQhOiBXaWRnZXRzLklUcmFjZUNvbnRyb2xXaWRnZXQ7XHJcblxyXG4gICAgcHJpdmF0ZSBfaXNMb2FkaW5nVHJhY2VEYXRhID0gZmFsc2U7XHJcblxyXG4gICAgcHJpdmF0ZSBfdHJhY2VEYXRhUG9pbnRJbmZvczogQXJyYXk8VHJhY2VEYXRhUG9pbnRJbmZvPiB8IHVuZGVmaW5lZDtcclxuXHJcbiAgICBwcml2YXRlIF93aWRnZXRJc0FjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgLy8gRXZlbnQgaGFuZGxlcnNcclxuICAgIHByaXZhdGUgX2NvbnRlbnRBY3RpdmF0ZWRIYW5kbGVyID0gKHNlbmRlciwgYXJncykgPT4gdGhpcy5vbkNvbnRlbnRBY3RpdmF0ZWQoc2VuZGVyLCBhcmdzKTtcclxuXHJcbiAgICBwcml2YXRlIF9jaGFydFZpZXdXaWRnZXREcm9wQ2hhbmdlZEhhbmRsZXIgPSAoc2VuZGVyLCBhcmdzKSA9PiB0aGlzLm9uRHJvcENoYW5nZWQoc2VuZGVyLCBhcmdzKTsgICBcclxuXHJcbiAgICBwcml2YXRlIF9zaWduYWxNYW5hZ2VyV2lkZ2V0U2VyaWVEb3VibGVDbGlja2VkSGFuZGxlciA9IChzZW5kZXIsIGRhdGEpID0+IHRoaXMub25TaWduYWxNYW5hZ2VyV2lkZ2V0U2VyaWVEb3VibGVDbGlja2VkKHNlbmRlciwgZGF0YSk7ICAgICBcclxuICAgIHByaXZhdGUgX3NpZ25hbE1hbmFnZXJXaWRnZXRDaGFuZ2VTaXplSGFuZGxlciA9IChzZW5kZXIsIGRhdGEpID0+IHRoaXMub25TaWduYWxNYW5hZ2VyV2lkZ2V0Q2hhbmdlU2l6ZShzZW5kZXIsIGRhdGEpOyAgICAgXHJcbiAgICBwcml2YXRlIF9zaWduYWxNYW5hZ2VyU2lnbmFsUmVtb3ZlZEhhbmRsZXIgPSAoc2VuZGVyLCBkYXRhKSA9PiB0aGlzLm9uU2lnbmFsTWFuYWdlclNpZ25hbFJlbW92ZWQoc2VuZGVyLCBkYXRhKTsgICAgIFxyXG4gICAgXHJcbiAgICBwcml2YXRlIF9jaGFydE1hbmFnZXJXaWRnZXRkcm9wSGVscGVySGFuZGxlciA9IChzZW5kZXIsIGFyZ3MpID0+IHRoaXMub25Ecm9wQ2hhbmdlZChzZW5kZXIsIGFyZ3MpO1xyXG4gICAgcHJpdmF0ZSBfY2hhcnRNYW5hZ2VyTW9kZWxDaGFuZ2VkSGFuZGxlciA9IChzZW5kZXIsIGRhdGEpID0+IHRoaXMub25DaGFydE1hbmFnZXJNb2RlbENoYW5nZWQoc2VuZGVyLCBkYXRhKTsgIFxyXG5cclxuICAgIHByaXZhdGUgX3RyYWNlU3RhdGU6IHN0cmluZz1cIlwiO1xyXG5cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXplIHRoZSB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGF5b3V0Q29udGFpbmVySWRcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZVZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgaW5pdGlhbGl6ZShsYXlvdXRDb250YWluZXJJZDogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZShsYXlvdXRDb250YWluZXJJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZUNvbXBvbmVudCgpe1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmRlZmF1bHRTZXR0aW5nc0RhdGFJZCA9IERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5XaWRnZXREZWZpbml0aW9uSWQ7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZGlzYWJsZVBlcnNpc3RpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgY29tcG9uZW50IHNldHRpbmdzIGZvciB0aGlzIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBnZXREZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MoKTogQ29tcG9uZW50U2V0dGluZ3N7XHJcbiAgICAgICAgcmV0dXJuIERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5nZXRUcmFjZVZpZXdEZWZpbml0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIHNvbWUgZGVmYXVsdCBwZXJzaXN0aW5nIGRhdGEgcGFja2FnZXMgaW4gdGhlIG1haW4gZGVmYXVsdCBwZXJzaXN0aW5nIGRhdGEgcHJvdmlkZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBhZGRBZGRpdGlvbmFsRGVmYXVsdENvbXBvbmVudFNldHRpbmdzKCl7XHJcbiAgICAgICAgLy8gU3BsaXR0ZXIgZGVmaW5pdGlvbnMgIFxyXG4gICAgICAgIHRoaXMuYWRkRGVmYXVsdENvbXBvbmVudFNldHRpbmdzVG9Qcm92aWRlcihEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuTWFpblNwbGl0dGVyRGVmaW5pdGlvbklkLCBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuZ2V0TWFpblNwbGl0dGVyRGVmaW5pdGlvbigpKTtcclxuICAgICAgICB0aGlzLmFkZERlZmF1bHRDb21wb25lbnRTZXR0aW5nc1RvUHJvdmlkZXIoRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLklubmVyU3BsaXR0ZXJEZWZpbml0aW9uSWQsIERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5nZXRJbm5lclNwbGl0dGVyRGVmaW5pdGlvbigpKTtcclxuICAgICAgICB0aGlzLmFkZERlZmF1bHRDb21wb25lbnRTZXR0aW5nc1RvUHJvdmlkZXIoRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLlJpZ2h0U3BsaXR0ZXJEZWZpbml0aW9uSWQsIERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5nZXRSaWdodFNwbGl0dGVyRGVmaW5pdGlvbigpKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSB3aWRnZXQgY29udGVudCBhbmQgZXZlbnR1YWxseSBzdWJ3aWRnZXRzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBpbml0aWFsaXplZCgpIHtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0TGF5b3V0V2lkZ2V0KCk7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0VHJhY2VDb250cm9sV2lkZ2V0KCk7XHJcbiAgICAgICAgdGhpcy5zZXRJbm5lcldpZGdldHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0TGF5b3V0V2lkZ2V0KCkge1xyXG4gICAgICAgIHRoaXMuX2xheW91dFdpZGdldCA9IHRoaXMuY29tcG9uZW50LmdldFN1YkNvbXBvbmVudChcIlNwbGl0dGVyV2lkZ2V0X1RyYWNlVmlld1wiKSBhcyBJTGF5b3V0V2lkZ2V0O1xyXG4gICAgICAgIHRoaXMuYXR0YWNoTGF5b3V0VG9WaWV3KDxhbnk+dGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMuX2xheW91dFdpZGdldCEuaW5pdGlhbGl6ZSh0aGlzLnBhcmVudENvbnRlbnRJZCk7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0IS5ldmVudFdpZGdldEFjdGl2YXRlZC5hdHRhY2godGhpcy5fY29udGVudEFjdGl2YXRlZEhhbmRsZXIpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGlubmVyIHdpZGdldHMgKHNpZ25hbG1hbmFnZXIsIGNoYXJ0IHZpZXcsIGNoYXJ0bWFuYWdlci9jdXJzb3JpbmZvKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0SW5uZXJXaWRnZXRzKCkge1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgbGVmdCB3aWRnZXRcclxuICAgICAgICB0aGlzLnNldFNpZ25hbE1hbmFnZXJXaWRnZXQoKTtcclxuICAgICAgICB0aGlzLmF0dGFjaFNpZ25hbE1hbmFnZXJXaWRnZXRFdmVudHMoKTtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBtaWRkbGUgd2lkZ2V0XHJcbiAgICAgICAgdGhpcy5zZXRDaGFydFZpZXdXaWRnZXQoKTtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIHRoZSB3aWRnZXRzIG9uIHRoZSByaWdodCBzaWRlXHJcbiAgICAgICAgdGhpcy5zZXRSaWdodFdpZGdldHMoKTtcclxuXHJcbiAgICAgICAgdGhpcy5hdHRhY2hTaWduYWxNYW5hZ2VyRGF0YU1vZGVsRXZlbnRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSByaWdodCB3aWRnZXRzIChjaGFydG1hbmFnZXIsIGN1cnNvcmluZm8pXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZVZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRSaWdodFdpZGdldHMoKSB7XHJcblxyXG4gICAgICAgIC8vIFNldHMgdGhlIGNoYXJ0IG1hbmFnZXIgd2lkZ2V0IG9uIHRvcFxyXG4gICAgICAgIHRoaXMuc2V0Q2hhcnRNYW5hZ2VyV2lkZ2V0KCk7XHJcblxyXG4gICAgICAgIHRoaXMuYXR0YWNoQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsRXZlbnRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSB0cmFjZSBjb250cm9sIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldFRyYWNlQ29udHJvbFdpZGdldCgpIHtcclxuICAgICAgICB0aGlzLl90cmFjZUNvbnRyb2xXaWRnZXQgPSB0aGlzLmdldFdpZGdldEJ5SWQoXCJUcmFjZUNvbnRyb2xXaWRnZXRcIikgYXMgV2lkZ2V0cy5JVHJhY2VDb250cm9sV2lkZ2V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgc2lnbmFsIG1hbmFnZXIgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZVZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRTaWduYWxNYW5hZ2VyV2lkZ2V0KCkge1xyXG4gICAgICAgIHRoaXMuX3NpZ25hbE1hbmFnZXJXaWRnZXQgPSB0aGlzLmdldFdpZGdldEJ5SWQoXCJTaWduYWxNYW5hZ2VyV2lkZ2V0XCIpIGFzIFdpZGdldHMuSVNpZ25hbE1hbmFnZXJXaWRnZXQ7XHJcbiAgICAgICAgdGhpcy5fc2lnbmFsTWFuYWdlckRhdGFNb2RlbCA9IHRoaXMuX3NpZ25hbE1hbmFnZXJXaWRnZXQuZGF0YU1vZGVsIGFzIERhdGFNb2RlbHMuSVNpZ25hbE1hbmFnZXJEYXRhTW9kZWw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBjaGFydCB2aWV3IHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0Q2hhcnRWaWV3V2lkZ2V0KCkge1xyXG4gICAgICAgIHRoaXMuX2NoYXJ0Vmlld1dpZGdldCA9IHRoaXMuZ2V0V2lkZ2V0QnlJZChcIkNoYXJ0Vmlld1dpZGdldFwiKSBhcyBXaWRnZXRzLklDaGFydFZpZXdXaWRnZXQ7XHJcbiAgICAgICAgdGhpcy5fY2hhcnRWaWV3V2lkZ2V0LmV2ZW50RHJvcEhlbHBlci5hdHRhY2godGhpcy5fY2hhcnRWaWV3V2lkZ2V0RHJvcENoYW5nZWRIYW5kbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGNoYXJ0IG1hbmFnZXIgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZVZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRDaGFydE1hbmFnZXJXaWRnZXQoKSB7XHJcbiAgICAgICAgdGhpcy5fY2hhcnRNYW5hZ2VyV2lkZ2V0ID0gdGhpcy5nZXRXaWRnZXRCeUlkKFwiQ2hhcnRNYW5hZ2VyV2lkZ2V0XCIpIGFzIFdpZGdldHMuSUNoYXJ0TWFuYWdlcldpZGdldDtcclxuICAgICAgICB0aGlzLl9jaGFydE1hbmFnZXJXaWRnZXQuZXZlbnREcm9wSGVscGVyLmF0dGFjaCh0aGlzLl9jaGFydE1hbmFnZXJXaWRnZXRkcm9wSGVscGVySGFuZGxlcik7XHJcblxyXG4gICAgICAgIC8vIFRPRE86XHJcbiAgICAgICAgdGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsID0gdGhpcy5fY2hhcnRNYW5hZ2VyV2lkZ2V0LmRhdGFNb2RlbCBhcyBEYXRhTW9kZWxzLklDaGFydE1hbmFnZXJEYXRhTW9kZWw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBY3RpdmF0ZSB0aGUgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBhY3RpdmF0ZSgpIHtcclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQhLmFjdGl2YXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzcG9zZSgpIHtcclxuICAgICAgICB0aGlzLl93aWRnZXRJc0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2xheW91dFdpZGdldCEuZGlzcG9zZSgpO1xyXG5cclxuICAgICAgICAvLyBEZXRhY2ggZXZlbnRzXHJcbiAgICAgICAgdGhpcy5kZXRhY2hFdmVudHMoKTtcclxuXHJcbiAgICAgICAgLy8gRGlzcG9zZSBTZXJpZXNQcm92aWRlclxyXG4gICAgICAgIC8vIFRPRE86IExhc3QgdXNlciBtdXN0IGRpc3Bvc2VcclxuICAgICAgICBTZXJpZXNQcm92aWRlci5nZXRJbnN0YW5jZSgpLmRpc3Bvc2UoKTtcclxuXHJcbiAgICAgICAgLy8gRGlzcG9zZSBkYXRhbW9kZWxzXHJcbiAgICAgICAgdGhpcy5kaXNwb3NlRGF0YU1vZGVscygpO1xyXG5cclxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERldGFjaGVzIGFsbCBldmVudHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRldGFjaEV2ZW50cygpe1xyXG4gICAgICAgIHRoaXMuZGV0YWNoQ2hhcnRWaWV3V2lkZ2V0RXZlbnRzKCk7XHJcblxyXG4gICAgICAgIHRoaXMuZGV0YWNoU2lnbmFsTWFuYWdlcldpZGdldEV2ZW50cygpO1xyXG4gICAgICAgIHRoaXMuZGV0YWNoU2lnbmFsTWFuYWdlckRhdGFNb2RlbEV2ZW50cygpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuZGV0YWNoQ2hhcnRNYW5hZ2VyV2lkZ2V0RXZlbnRzKCk7XHJcbiAgICAgICAgdGhpcy5kZXRhY2hDaGFydE1hbmFnZXJEYXRhTW9kZWxFdmVudHMoKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQhLmV2ZW50V2lkZ2V0QWN0aXZhdGVkLmRldGFjaCh0aGlzLl9jb250ZW50QWN0aXZhdGVkSGFuZGxlcik7ICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc3Bvc2UgYWxsIGRhdGEgbW9kZWxzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZVZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkaXNwb3NlRGF0YU1vZGVscygpe1xyXG4gICAgICAgIC8vIFRPRE86IERpc3Bvc2UgZGF0YW1vZGVscyBjZW50cmFsXHJcbiAgICAgICAgaWYodGhpcy5fc2lnbmFsTWFuYWdlckRhdGFNb2RlbCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsLmRpc3Bvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2NoYXJ0TWFuYWdlckRhdGFNb2RlbC5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IG9ubHkgbmVlZGVkIHRvIHJlbW92ZSBzaW5nbGV0b24gaW5zdGFuY2Ugb2YgY2hhcnRtYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICAgICAgICAgICg8YW55PkNvbXBvbmVudEZhY3RvcnkpLl9jaGFydE1hbmFnZXJJbnN0YW5jZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIHJlc2l6ZXMgdGhlIHRyYWNlIGNvbmZpZ3VyYXRpb24gd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHJlc2l6ZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX2FjdHVhbFdpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5fYWN0dWFsSGVpZ2h0ID0gaGVpZ2h0O1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fbGF5b3V0V2lkZ2V0ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQhLnJlc2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNvbnRlbnRBY3RpdmF0ZWQoc2VuZGVyLCBhcmdzKSB7XHJcbiAgICAgICAgYXJncy53aWRnZXQuYWN0aXZhdGUoKTtcclxuICAgICAgICB0aGlzLnJlc2l6ZSh0aGlzLl9hY3R1YWxXaWR0aCwgdGhpcy5fYWN0dWFsSGVpZ2h0KVxyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBkZXRhY2hDaGFydFZpZXdXaWRnZXRFdmVudHMoKXtcclxuICAgICAgICBpZih0aGlzLl9jaGFydFZpZXdXaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fY2hhcnRWaWV3V2lkZ2V0LmV2ZW50RHJvcEhlbHBlci5kZXRhY2godGhpcy5fY2hhcnRWaWV3V2lkZ2V0RHJvcENoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgd2hlbiBhIEQmRCBvcGVyYXRpb24gaGFzIGJlZW4gZG9uZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25Ecm9wQ2hhbmdlZChjaGFydE1hbmFnZXJEYXRhTW9kZWw6IERhdGFNb2RlbHMuSUNoYXJ0TWFuYWdlckRhdGFNb2RlbCwgYXJncykge1xyXG4gICAgICAgIHN3aXRjaCAoYXJncy5oaW50KSB7XHJcbiAgICAgICAgICAgIGNhc2UgQ2hhcnREcm9wSGVscGVyQ2hhbmdlZEhpbnQuY3JlYXRlQ2hhcnQ6IHtcclxuICAgICAgICAgICAgICAgIC8vY3JlYXRlcyBhIGNoYXJ0IGFuIGFkZHMgaXRzIHNlcmllc1xyXG4gICAgICAgICAgICAgICAgbGV0IGNoYXJ0TmFtZSA9IGNoYXJ0TWFuYWdlckRhdGFNb2RlbC5nZXRVbmlxdWVDaGFydE5hbWUoKTtcclxuICAgICAgICAgICAgICAgIGxldCBjaGFydE1hbmFnZXJDaGFydCA9IG5ldyBDaGFydE1hbmFnZXJDaGFydChjaGFydE5hbWUsIGFyZ3MuZGF0YS50eXBlKTtcclxuICAgICAgICAgICAgICAgIGNoYXJ0TWFuYWdlckRhdGFNb2RlbC5hZGRDaGFydChjaGFydE1hbmFnZXJDaGFydCwgLTEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFyZ3MuZGF0YS5zZXJpZXMgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHlBeGlzSWQgPSBjaGFydE1hbmFnZXJDaGFydC5nZXREZWZhdWx0WUF4aXNJZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzZXJpZXMgPSBhcmdzLmRhdGEuc2VyaWVzO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhcmdzLmRhdGEudHlwZSAhPSBDaGFydFR5cGUuWVRDaGFydCAmJiBhcmdzLmRhdGEuc2VyaWVzWzBdLnR5cGUgPT0gU2VyaWVzVHlwZS50aW1lU2VyaWVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaWduYWxNYW5hZ2VyV2lkZ2V0IS5zdXBwcmVzc1JlZnJlc2godHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhcmdzLmRhdGEudHlwZSA9PSBDaGFydFR5cGUuWFlDaGFydCkgeyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcmllcyA9IG5ldyBBcnJheTxCYXNlU2VyaWVzPigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VyaWVzLnB1c2godGhpcy5jcmVhdGVYWVNlcmllKGFyZ3MuZGF0YS5zZXJpZXNbMF0ucGFyZW50LCBhcmdzLmRhdGEuc2VyaWVzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoYXJncy5kYXRhLnR5cGUgPT0gQ2hhcnRUeXBlLkZGVENoYXJ0KSB7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VyaWVzID0gbmV3IEFycmF5PEJhc2VTZXJpZXM+KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MuZGF0YS5zZXJpZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcmllcy5wdXNoKHRoaXMuY3JlYXRlRkZUU2VyaWUoYXJncy5kYXRhLnNlcmllc1tpXS5wYXJlbnQsIGFyZ3MuZGF0YS5zZXJpZXNbaV0pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaWduYWxNYW5hZ2VyV2lkZ2V0IS5zdXBwcmVzc1JlZnJlc2goZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9zaWduYWxNYW5hZ2VyV2lkZ2V0IS5lZGl0TW9kZUFjdGl2ZSAmJiBhcmdzLmRhdGEudHlwZSA9PSBDaGFydFR5cGUuWFlDaGFydCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2lnbmFsTWFuYWdlcldpZGdldCEuYWN0aXZhdGVFZGl0TW9kZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL0FkZCBhbGwgZHJhZ2dlZCBzZXJpZXMgdG8gdGhlIGNoYXJ0LlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkU2VyaWVUb0NoYXJ0KGNoYXJ0TWFuYWdlckRhdGFNb2RlbCwgc2VyaWVzLCBjaGFydE1hbmFnZXJDaGFydCwgeUF4aXNJZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIENoYXJ0RHJvcEhlbHBlckNoYW5nZWRIaW50LmFkZFNlcmllOiB7IFxyXG4gICAgICAgICAgICAgICAgbGV0IHNlcmllczogQXJyYXk8QmFzZVNlcmllcz4gPSBhcmdzLmRhdGEuc2VyaWVzO1xyXG4gICAgICAgICAgICAgICAgbGV0IGNoYXJ0OiBJQ2hhcnRNYW5hZ2VyQ2hhcnQgfCB1bmRlZmluZWQgPSBhcmdzLmRhdGEuY2hhcnQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgeUF4aXM6IFNjYWxlID0gYXJncy5kYXRhLnlBeGlzO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoYXJ0ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB5QXhpc0lkID0gdGhpcy5nZXRZQXhpc0lkKGNoYXJ0TWFuYWdlckRhdGFNb2RlbCwgY2hhcnQsIHlBeGlzLCBhcmdzLmRhdGEudGFyZ2V0Q2hhcnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vaW5zZXJ0IHNlcmllIHRvIGVtcHR5IGEgY2hhcnRcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFNlcmllVG9DaGFydChjaGFydE1hbmFnZXJEYXRhTW9kZWwsIHNlcmllcywgY2hhcnQsIHlBeGlzSWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjYXNlIENoYXJ0RHJvcEhlbHBlckNoYW5nZWRIaW50LmNyZWF0ZVhZU2VyaWU6IHsgXHJcbiAgICAgICAgICAgICAgICAvL0NyZWF0ZXMgWFkgc2VyaWUgYW5kIGFkZHMgaXQgdG8gdGhlIFhZIGNoYXJ0XHJcbiAgICAgICAgICAgICAgICBsZXQgY2hhcnRNYW5hZ2VyQ2hhcnQ6IElDaGFydE1hbmFnZXJDaGFydCA9IGFyZ3MuZGF0YS5jaGFydDtcclxuICAgICAgICAgICAgICAgIGxldCBzZXJpZXMgPSBuZXcgQXJyYXk8QmFzZVNlcmllcz4oKTtcclxuICAgICAgICAgICAgICAgIHNlcmllcy5wdXNoKHRoaXMuY3JlYXRlWFlTZXJpZShhcmdzLmRhdGEuc2VyaWVzWzBdLnBhcmVudCwgYXJncy5kYXRhLnNlcmllcykpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHlBeGlzSWQgPSBjaGFydE1hbmFnZXJDaGFydC5nZXREZWZhdWx0WUF4aXNJZCgpO1xyXG4gICAgICAgICAgICAgICAgLy9BZGQgYWxsIGRyYWdnZWQgc2VyaWVzIHRvIHRoZSBjaGFydC5cclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkU2VyaWVUb0NoYXJ0KGNoYXJ0TWFuYWdlckRhdGFNb2RlbCwgc2VyaWVzLCBjaGFydE1hbmFnZXJDaGFydCwgeUF4aXNJZCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY2FzZSBDaGFydERyb3BIZWxwZXJDaGFuZ2VkSGludC5jcmVhdGVGRlRTZXJpZTogeyBcclxuICAgICAgICAgICAgICAgIC8vQ3JlYXRlcyBGRlQgc2VyaWUgYW5kIGFkZCBpdCB0byB0aGUgRkZUIGNoYXJ0XHJcbiAgICAgICAgICAgICAgICBsZXQgY2hhcnQ6IElDaGFydE1hbmFnZXJDaGFydCA9IGFyZ3MuZGF0YS5jaGFydDtcclxuICAgICAgICAgICAgICAgIGxldCBzZXJpZXMgPSBuZXcgQXJyYXk8QmFzZVNlcmllcz4oKTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5kYXRhLnNlcmllcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VyaWVzLnB1c2godGhpcy5jcmVhdGVGRlRTZXJpZShhcmdzLmRhdGEuc2VyaWVzW2ldLnBhcmVudCwgYXJncy5kYXRhLnNlcmllc1tpXSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IHlBeGlzOiBTY2FsZSA9IGFyZ3MuZGF0YS55QXhpcztcclxuICAgICAgICAgICAgICAgIGxldCB5QXhpc0lkID0gdGhpcy5nZXRZQXhpc0lkKGNoYXJ0TWFuYWdlckRhdGFNb2RlbCwgY2hhcnQsIHlBeGlzLCBhcmdzLmRhdGEudGFyZ2V0Q2hhcnQpO1xyXG4gICAgICAgICAgICAgICAgLy9BZGQgYWxsIGRyYWdnZWQgc2VyaWVzIHRvIHRoZSBjaGFydC5cclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkU2VyaWVUb0NoYXJ0KGNoYXJ0TWFuYWdlckRhdGFNb2RlbCwgc2VyaWVzLCBjaGFydCwgeUF4aXNJZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBdHRhY2hlcyB0aGUgc2lnbmFsIG1hbmFnZXIgd2lkZ2V0IGV2ZW50c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXR0YWNoU2lnbmFsTWFuYWdlcldpZGdldEV2ZW50cygpIHtcclxuICAgICAgICBpZih0aGlzLl9zaWduYWxNYW5hZ2VyV2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX3NpZ25hbE1hbmFnZXJXaWRnZXQuZXZlbnRTZXJpZURvdWJsZUNsaWNrZWQuYXR0YWNoKHRoaXMuX3NpZ25hbE1hbmFnZXJXaWRnZXRTZXJpZURvdWJsZUNsaWNrZWRIYW5kbGVyKTtcclxuICAgICAgICAgICAgdGhpcy5fc2lnbmFsTWFuYWdlcldpZGdldC5ldmVudENoYW5nZVNpemUuYXR0YWNoKHRoaXMuX3NpZ25hbE1hbmFnZXJXaWRnZXRDaGFuZ2VTaXplSGFuZGxlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGV0YWNoZXMgdGhlIHNpZ25hbCBtYW5hZ2VyIHdpZGdldCBldmVudHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRldGFjaFNpZ25hbE1hbmFnZXJXaWRnZXRFdmVudHMoKSB7XHJcbiAgICAgICAgaWYodGhpcy5fc2lnbmFsTWFuYWdlcldpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9zaWduYWxNYW5hZ2VyV2lkZ2V0LmV2ZW50U2VyaWVEb3VibGVDbGlja2VkLmRldGFjaCh0aGlzLl9zaWduYWxNYW5hZ2VyV2lkZ2V0U2VyaWVEb3VibGVDbGlja2VkSGFuZGxlcik7XHJcbiAgICAgICAgICAgIHRoaXMuX3NpZ25hbE1hbmFnZXJXaWRnZXQuZXZlbnRDaGFuZ2VTaXplLmRldGFjaCh0aGlzLl9zaWduYWxNYW5hZ2VyV2lkZ2V0Q2hhbmdlU2l6ZUhhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uU2lnbmFsTWFuYWdlcldpZGdldFNlcmllRG91YmxlQ2xpY2tlZChzZW5kZXIsIHNlcmllOiBCYXNlU2VyaWVzKSB7XHJcbiAgICAgICAgdGhpcy5hZGROZXdDaGFydCh0aGlzLl9jaGFydE1hbmFnZXJXaWRnZXQuZGF0YU1vZGVsIGFzIERhdGFNb2RlbHMuSUNoYXJ0TWFuYWdlckRhdGFNb2RlbCwgc2VyaWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25TaWduYWxNYW5hZ2VyV2lkZ2V0Q2hhbmdlU2l6ZShzZW5kZXIsIG5ld1NpemUpIHtcclxuICAgICAgICAvLyBnZXQgcGFyZW50KHNwbGl0dGVyKSB3aWRnZXQgb2Ygc2VuZGVyKHNpZ25hbE1hbmFnZXIpXHJcbiAgICAgICAgbGV0IGlubmVyTGF5b3V0U3BsaXR0ZXJXaWRnZXQgPSB0aGlzLmdldFdpZGdldEJ5SWQoXCJTcGxpdHRlcldpZGdldF9NYWluVHJhY2VcIikgYXMgV2lkZ2V0cy5JU3BsaXR0ZXJXaWRnZXQ7XHJcbiAgICAgICAgLy8gY2hhbmdlIHNpemUgb2Ygc3BsaXR0ZXIgcGFuZVxyXG4gICAgICAgIGlubmVyTGF5b3V0U3BsaXR0ZXJXaWRnZXQucmVzaXplV2lkZ2V0KHNlbmRlciwgbmV3U2l6ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgbmV3IGNoYXJ0IHRvIHRoZSBjaGFydG1hbmFnZXIgZGF0YW1vZGVsKGlmIHBvc3NpYmxlID0+IG1heCBjaGFydCBudW1iZXIpIGFuZCBhZGRzIHRoZSBnaXZlbiBzaWduYWwgdG8gdGhlIG5ldyBjaGFydFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNlcmllXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkTmV3Q2hhcnQoY2hhcnRNYW5hZ2VyRGF0YU1vZGVsOiBEYXRhTW9kZWxzLklDaGFydE1hbmFnZXJEYXRhTW9kZWwsIHNlcmllOiBCYXNlU2VyaWVzKSB7XHJcbiAgICAgICAgaWYgKGNoYXJ0TWFuYWdlckRhdGFNb2RlbCkge1xyXG4gICAgICAgICAgICB2YXIgbmV3Q2hhcnROYW1lID0gY2hhcnRNYW5hZ2VyRGF0YU1vZGVsLmdldFVuaXF1ZUNoYXJ0TmFtZSgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IHNlcmllQ2hhcnRUeXBlID0gbmV3IFNlcmllQ2hhcnRUeXBlSGVscGVyKCkuZ2V0U2VyaWVDaGFydFR5cGUoc2VyaWUudHlwZSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgbmV3Q2hhcnQgPSBuZXcgQ2hhcnRNYW5hZ2VyQ2hhcnQobmV3Q2hhcnROYW1lLCBzZXJpZUNoYXJ0VHlwZSk7XHJcbiAgICAgICAgICAgIGxldCBpc0NoYXJ0QWRkZWQgPSBjaGFydE1hbmFnZXJEYXRhTW9kZWwuYWRkQ2hhcnQobmV3Q2hhcnQsIDApO1xyXG5cclxuICAgICAgICAgICAgaWYgKHNlcmllICE9IHVuZGVmaW5lZCAmJiBpc0NoYXJ0QWRkZWQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBzZXJpZXMgPSBuZXcgQXJyYXk8QmFzZVNlcmllcz4oKTtcclxuICAgICAgICAgICAgICAgIHNlcmllcy5wdXNoKHNlcmllKTtcclxuICAgICAgICAgICAgICAgIGxldCB5QXhpcyA9IG5ld0NoYXJ0LmdldFlTY2FsZShuZXdDaGFydC5nZXREZWZhdWx0WUF4aXNJZCgpKTtcclxuICAgICAgICAgICAgICAgIGlmICh5QXhpcyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFNlcmllVG9DaGFydChjaGFydE1hbmFnZXJEYXRhTW9kZWwsIHNlcmllcywgbmV3Q2hhcnQsIHlBeGlzLmlkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJEZWZhdWx0IHlBeGlzIG5vdCBhdmFpbGFibGUhXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIHNlcmllIHRvIGNoYXJ0IChvbmUgYnkgb25lKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PEJhc2VTZXJpZXM+fSBzZXJpZXNcclxuICAgICAqIEBwYXJhbSB7KElDaGFydE1hbmFnZXJDaGFydCB8IHVuZGVmaW5lZCl9IGNoYXJ0TWFuYWdlckNoYXJ0XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30geUF4aXNJZFxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZFNlcmllVG9DaGFydChjaGFydE1hbmFnZXJEYXRhTW9kZWw6IERhdGFNb2RlbHMuSUNoYXJ0TWFuYWdlckRhdGFNb2RlbCwgc2VyaWVzOiBBcnJheTxCYXNlU2VyaWVzPiwgY2hhcnRNYW5hZ2VyQ2hhcnQ6IElDaGFydE1hbmFnZXJDaGFydCB8IHVuZGVmaW5lZCwgeUF4aXNJZDogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHlBeGlzID0gY2hhcnRNYW5hZ2VyQ2hhcnQhLmdldFlTY2FsZSh5QXhpc0lkKTtcclxuICAgICAgICBsZXQgaW5zZXJ0ZWRJbmZvID0gbmV3IEluc2VydGVkSW5mbyhzZXJpZXMsIHlBeGlzLCBjaGFydE1hbmFnZXJDaGFydCEpO1xyXG4gICAgICAgIGlmIChpbnNlcnRlZEluZm8gIT0gdW5kZWZpbmVkICYmIGluc2VydGVkSW5mby55QXhpcyAhPSB1bmRlZmluZWQgJiYgaW5zZXJ0ZWRJbmZvLmNoYXJ0ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBjaGFydE1hbmFnZXJEYXRhTW9kZWwuYWRkU2VyaWVzVG9DaGFydChpbnNlcnRlZEluZm8uY2hhcnQsIGluc2VydGVkSW5mby5zZXJpZXMsIGluc2VydGVkSW5mby55QXhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3JlYXRlWFlTZXJpZShjb250YWluZXI6IElTZXJpZUNvbnRhaW5lciwgc2VyaWVzOiBBcnJheTxCYXNlU2VyaWVzPik6IFhZU2VyaWVzIHtcclxuICAgICAgLy8gY3JlYXRlIGNhbGN1bGF0aW9uXHJcblx0ICBsZXQgY2FsY3VsYXRpb24gPSBuZXcgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uKFwiQ2FsY3VsYXRpb25cIik7XHJcbiAgICAgICAgXHJcblx0ICAvLyBhZGQgY2FsY3VsYXRpb24gdG8gY29udGFpbmVyXHJcblx0ICBjb250YWluZXIuYWRkU2VyaWVDb250YWluZXIoY2FsY3VsYXRpb24sIC0xKTtcclxuICAgICAgICBcclxuXHQgIC8vIHNldCBjYWxjdWxhdGlvbiB0eXBlXHJcblx0ICBjYWxjdWxhdGlvbi5zZXRDYWxjdWxhdG9yVHlwZSgnWFknKTtcclxuXHJcblx0ICAvLyBzZXQgY2FsY3VsYXRpb24gaW5wdXQgZGF0YVxyXG5cdCAgaWYoc2VyaWVzLmxlbmd0aCA+IDAgJiYgc2VyaWVzWzBdICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgY2FsY3VsYXRpb24uc2V0VmFsdWUoMCwgc2VyaWVzWzBdLm5hbWUpO1xyXG4gICAgICB9XHJcbiAgICAgIFxyXG5cdCAgaWYoc2VyaWVzLmxlbmd0aCA+IDEgJiYgc2VyaWVzWzFdICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGNhbGN1bGF0aW9uLnNldFZhbHVlKDEsIHNlcmllc1sxXS5uYW1lKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gUmV0dXJuIGNhbGN1bGF0aW9uIG91dHB1dCBkYXRhIFxyXG4gICAgICByZXR1cm4gY2FsY3VsYXRpb24uZ2V0T3V0cHV0Q2FsY3VsYXRpb25EYXRhKClbMF0uc2VyaWUgYXMgWFlTZXJpZXM7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIEZGVCBvdXRwdXQgc2VyaWVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtJU2VyaWVDb250YWluZXJ9IGNvbnRhaW5lclxyXG4gICAgICogQHBhcmFtIHtCYXNlU2VyaWVzfSBzZXJpZXNcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlRkZUU2VyaWUoY29udGFpbmVyOiBJU2VyaWVDb250YWluZXIsIHNlcmllczogQmFzZVNlcmllcyk6IEZGVFNlcmllcyB7XHJcbiAgICAgICAgLy8gY3JlYXRlIGNhbGN1bGF0aW9uXHJcbiAgICAgICAgbGV0IGNhbGN1bGF0aW9uID0gbmV3IFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbihcIkNhbGN1bGF0aW9uXCIpO1xyXG5cclxuICAgICAgICAvLyBhZGQgY2FsY3VsYXRpb24gdG8gY29udGFpbmVyXHJcbiAgICAgICAgY29udGFpbmVyLmFkZFNlcmllQ29udGFpbmVyKGNhbGN1bGF0aW9uLCAtMSk7XHJcblxyXG4gICAgICAgIC8vIHNldCBjYWxjdWxhdGlvbiB0eXBlXHJcbiAgICAgICAgY2FsY3VsYXRpb24uc2V0Q2FsY3VsYXRvclR5cGUoJ0ZGVCcpO1xyXG5cclxuICAgICAgICAvLyBzZXQgY2FsY3VsYXRpb24gaW5wdXQgZGF0YVxyXG4gICAgICAgIGNhbGN1bGF0aW9uLnNldFZhbHVlKDAsIHNlcmllcy5uYW1lKTtcclxuXHJcbiAgICAgICAgLy8gQ2hhbmdlIG91dHB1dCBkYXRhIG5hbWUgYW5kIGNvbG9yIG9mIG5ldyBGRlQgY2FsY3VsYXRpb25cclxuICAgICAgICBsZXQgaW5wdXREYXRhID0gY2FsY3VsYXRpb24uZ2V0SW5wdXRDYWxjdWxhdGlvbkRhdGEoKTtcclxuICAgICAgICBsZXQgb3V0cHV0RGF0YSA9IGNhbGN1bGF0aW9uLmdldE91dHB1dENhbGN1bGF0aW9uRGF0YSgpO1xyXG4gICAgICAgIGlmKGlucHV0RGF0YVswXS5zZXJpZSAhPSB1bmRlZmluZWQgJiYgaW5wdXREYXRhWzBdLnNlcmllLnJhd1BvaW50c1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIGxldCBvdXRwdXREYXRhID0gY2FsY3VsYXRpb24uZ2V0T3V0cHV0Q2FsY3VsYXRpb25EYXRhKCk7XHJcbiAgICAgICAgICAgIGlmKG91dHB1dERhdGEubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIG91dHB1dERhdGFbMF0uY29sb3IgPSBpbnB1dERhdGFbMF0uc2VyaWUuY29sb3I7XHJcbiAgICAgICAgICAgICAgICBvdXRwdXREYXRhWzBdLnZhbHVlID0gJ0ZGVCgnICsgaW5wdXREYXRhWzBdLnNlcmllLm5hbWUgKyAnKSAnICsgY2FsY3VsYXRpb24uc2VyaWUhLmNhbGN1bGF0aW9uRGF0YUluZm8hLnVuaXF1ZUlkOyAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJldHVybiBjYWxjdWxhdGlvbiBvdXRwdXQgZGF0YSBcclxuICAgICAgICByZXR1cm4gb3V0cHV0RGF0YVswXS5zZXJpZSBhcyBGRlRTZXJpZXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0lDaGFydE1hbmFnZXJEYXRhTW9kZWx9IGNoYXJ0TWFuYWdlckRhdGFNb2RlbFxyXG4gICAgICogQHBhcmFtIHtJQ2hhcnRNYW5hZ2VyQ2hhcnR9IGNoYXJ0XHJcbiAgICAgKiBAcGFyYW0geyhTY2FsZSB8IHVuZGVmaW5lZCl9IHlBeGlzXHJcbiAgICAgKiBAcGFyYW0geyhJVHJhY2VDaGFydCB8IHVuZGVmaW5lZCl9IHRhcmdldENoYXJ0XHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFlBeGlzSWQoY2hhcnRNYW5hZ2VyRGF0YU1vZGVsOiBEYXRhTW9kZWxzLklDaGFydE1hbmFnZXJEYXRhTW9kZWwsIGNoYXJ0OiBJQ2hhcnRNYW5hZ2VyQ2hhcnQsIHlBeGlzOiBTY2FsZSB8IHVuZGVmaW5lZCwgdGFyZ2V0Q2hhcnQ6IElUcmFjZUNoYXJ0IHwgdW5kZWZpbmVkKTogc3RyaW5nIHtcclxuICAgICAgIGxldCB5QXhpc0lkOiBzdHJpbmc7XHJcbiAgICAgICAgaWYgKHlBeGlzICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBjaGFydCA9IHlBeGlzLnBhcmVudDtcclxuICAgICAgICAgICAgeUF4aXNJZCA9IHlBeGlzLmlkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgeUF4aXNJZCA9IHRoaXMuZ2V0WVNjYWxlSWQoY2hhcnRNYW5hZ2VyRGF0YU1vZGVsLCBjaGFydCwgdGFyZ2V0Q2hhcnQpO1xyXG4gICAgICAgICAgICBpZih5QXhpc0lkID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgbmV3IHNjYWxlXHJcbiAgICAgICAgICAgICAgICB5QXhpc0lkID0gY2hhcnQuZ2V0TmV4dFlBeGlzSWQoKTtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdZQXhpcyA9IG5ldyBTY2FsZSh5QXhpc0lkLCBjaGFydCk7XHJcbiAgICAgICAgICAgICAgICBjaGFydE1hbmFnZXJEYXRhTW9kZWwuYWRkWVNjYWxlKGNoYXJ0LCBuZXdZQXhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHlBeGlzSWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4geUF4aXMgaWQgd2hlbiBzZXJpZSBpcyBkcm9wcGVkIGluIHRoZSBjaGFydCB2aWV3XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7RGF0YU1vZGVscy5JQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsfSBjaGFydE1hbmFnZXJEYXRhTW9kZWxcclxuICAgICAqIEBwYXJhbSB7SUNoYXJ0TWFuYWdlckNoYXJ0fSBjaGFydE1hbmFnZXJDaGFydFxyXG4gICAgICogQHBhcmFtIHsqfSB0YXJnZXRDaGFydFxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZVZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRZU2NhbGVJZChjaGFydE1hbmFnZXJEYXRhTW9kZWw6IERhdGFNb2RlbHMuSUNoYXJ0TWFuYWdlckRhdGFNb2RlbCwgY2hhcnRNYW5hZ2VyQ2hhcnQ6IElDaGFydE1hbmFnZXJDaGFydCwgdGFyZ2V0Q2hhcnQpOiBzdHJpbmd7XHJcbiAgICAgICAgbGV0IHlBeGlzSWQ7XHJcbiAgICAgICAgaWYgKGNoYXJ0TWFuYWdlckNoYXJ0LmNoYXJ0VHlwZSA9PSBDaGFydFR5cGUuWFlDaGFydCkge1xyXG4gICAgICAgICAgICB5QXhpc0lkID0gY2hhcnRNYW5hZ2VyQ2hhcnQuZ2V0RGVmYXVsdFlBeGlzSWQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vYWRkaW5nIHNlcmllcyB0byBZVCBjaGFydHNcclxuICAgICAgICAgICAgbGV0IG9iamVjdFVuZGVyTW91c2UgPSB0YXJnZXRDaGFydC5nZXRDaGFydE9iamVjdFVuZGVyTW91c2UodGFyZ2V0Q2hhcnQuY2hhcnRJbnN0YW5jZS5tb3VzZW1vdmVYLCB0YXJnZXRDaGFydC5jaGFydEluc3RhbmNlLm1vdXNlbW92ZVkpO1xyXG4gICAgICAgICAgICBpZiAob2JqZWN0VW5kZXJNb3VzZS5jaGFydE9iamVjdFR5cGUgPT0gQ2hhcnRPYmplY3RUeXBlLmF4aXMpIHsgXHJcbiAgICAgICAgICAgICAgICAvLyBnZXQgYXhpcyBpZFxyXG4gICAgICAgICAgICAgICAgeUF4aXNJZCA9IG9iamVjdFVuZGVyTW91c2UuYXJncy5heGlzLmdldEF4aXNJRCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG9iamVjdFVuZGVyTW91c2UuY2hhcnRPYmplY3RUeXBlID09IENoYXJ0T2JqZWN0VHlwZS5jaGFydFNwYWNlKSB7IFxyXG4gICAgICAgICAgICAgICAgLy8gY3JlYXRlIG5ldyBheGlzXHJcbiAgICAgICAgICAgICAgICB5QXhpc0lkID0gY2hhcnRNYW5hZ2VyQ2hhcnQuZ2V0TmV4dFlBeGlzSWQoKTtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdZQXhpcyA9IG5ldyBTY2FsZSh5QXhpc0lkLCBjaGFydE1hbmFnZXJDaGFydCk7XHJcbiAgICAgICAgICAgICAgICBjaGFydE1hbmFnZXJEYXRhTW9kZWwuYWRkWVNjYWxlKGNoYXJ0TWFuYWdlckNoYXJ0LCBuZXdZQXhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHlBeGlzSWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBdHRhY2hlcyB0aGUgc2lnbmFsIG1hbmFnZXIgZGF0YW1vZGVsIGV2ZW50c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXR0YWNoU2lnbmFsTWFuYWdlckRhdGFNb2RlbEV2ZW50cygpIHtcclxuICAgICAgICBpZiAodGhpcy5fc2lnbmFsTWFuYWdlckRhdGFNb2RlbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsLmV2ZW50U2lnbmFsUmVtb3ZlZC5hdHRhY2godGhpcy5fc2lnbmFsTWFuYWdlclNpZ25hbFJlbW92ZWRIYW5kbGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXRhY2hlcyB0aGUgc2lnbmFsIG1hbmFnZXIgZGF0YW1vZGVsIGV2ZW50c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZGV0YWNoU2lnbmFsTWFuYWdlckRhdGFNb2RlbEV2ZW50cygpIHtcclxuICAgICAgICBpZiAodGhpcy5fc2lnbmFsTWFuYWdlckRhdGFNb2RlbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsLmV2ZW50U2lnbmFsUmVtb3ZlZC5kZXRhY2godGhpcy5fc2lnbmFsTWFuYWdlclNpZ25hbFJlbW92ZWRIYW5kbGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblNpZ25hbE1hbmFnZXJTaWduYWxSZW1vdmVkKHNlbmRlciwgc2VyaWUpIHtcclxuICAgICAgICBpZiAodGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NoYXJ0TWFuYWdlckRhdGFNb2RlbC5yZW1vdmVTZXJpZUZyb21BbGxDaGFydHMoc2VyaWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEF0dGFjaGVzIHRoZSBjaGFydCBtYW5hZ2VyIGRhdGFtb2RlbCBldmVudHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGF0dGFjaENoYXJ0TWFuYWdlckRhdGFNb2RlbEV2ZW50cygpIHtcclxuICAgICAgICBpZiAodGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NoYXJ0TWFuYWdlckRhdGFNb2RlbC5ldmVudE1vZGVsQ2hhbmdlZC5hdHRhY2godGhpcy5fY2hhcnRNYW5hZ2VyTW9kZWxDaGFuZ2VkSGFuZGxlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGV0YWNoZXMgdGhlIGNoYXJ0IG1hbmFnZXIgd2lkZ2V0IGV2ZW50c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZGV0YWNoQ2hhcnRNYW5hZ2VyV2lkZ2V0RXZlbnRzKCkge1xyXG4gICAgICAgIHRoaXMuX2NoYXJ0TWFuYWdlcldpZGdldC5ldmVudERyb3BIZWxwZXIuZGV0YWNoKHRoaXMuX2NoYXJ0TWFuYWdlcldpZGdldGRyb3BIZWxwZXJIYW5kbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERldGFjaGVzIHRoZSBjaGFydCBtYW5hZ2VyIGRhdGFtb2RlbCBldmVudHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRldGFjaENoYXJ0TWFuYWdlckRhdGFNb2RlbEV2ZW50cygpIHtcclxuICAgICAgICBpZiAodGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NoYXJ0TWFuYWdlckRhdGFNb2RlbC5ldmVudE1vZGVsQ2hhbmdlZC5kZXRhY2godGhpcy5fY2hhcnRNYW5hZ2VyTW9kZWxDaGFuZ2VkSGFuZGxlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DaGFydE1hbmFnZXJNb2RlbENoYW5nZWQoc2VuZGVyLCBhcmdzKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NoYXJ0Vmlld1dpZGdldCkge1xyXG4gICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGNoYXJ0IHZpZXcgd2lkZ2V0XHJcbiAgICAgICAgICAgIHRoaXMuX2NoYXJ0Vmlld1dpZGdldC5yZWZyZXNoQ2hhcnRzKHNlbmRlciwgYXJncyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBjdXJzb3JJbmZvV2lkZ2V0ID0gdGhpcy5nZXRXaWRnZXRCeUlkKFwiQ3Vyc29ySW5mb1dpZGdldFwiKSBhcyBXaWRnZXRzLklDdXJzb3JJbmZvV2lkZ2V0O1xyXG4gICAgICAgIGlmIChjdXJzb3JJbmZvV2lkZ2V0KSB7XHJcbiAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgY3Vyc29yIGluZm8gd2lkZ2V0XHJcbiAgICAgICAgICAgIGlmIChhcmdzLmhpbnQgPT0gQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsQ2hhbmdlZEhpbnQuYWRkU2VyaWUgJiYgYXJncy5kYXRhLnNlcmllcyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGN1cnNvckluZm9XaWRnZXQuYWRkU2VyaWVzKGFyZ3MuZGF0YS5zZXJpZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGFyZ3MuaGludCA9PSBDaGFydE1hbmFnZXJEYXRhTW9kZWxDaGFuZ2VkSGludC5yZW1vdmVTZXJpZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFyZ3MuZGF0YS5zaWduYWxVc2VkSW5PdGhlckNoYXJ0cyA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnNvckluZm9XaWRnZXQucmVtb3ZlU2VyaWUoYXJncy5kYXRhLnNlcmllKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGFjdGl2ZUNvbXBvbmVudChhY3RpdmVDb21wb25lbnQ6IFByb3BlcnR5PE1hcHBDb2NrcGl0VHJhY2VDb21wb25lbnQ+KSB7XHJcbiAgICAgICAgdGhpcy5fYWN0aXZlQ29tcG9uZW50ID0gYWN0aXZlQ29tcG9uZW50O1xyXG4gICAgICAgIHRoaXMuX2FjdGl2ZUNvbXBvbmVudC52YWx1ZS5pbml0aWFsaXplKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2FjdGl2ZUNvbXBvbmVudC5jaGFuZ2VkKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBjdXJyZW50QWN0aXZlQ29tcG9uZW50ID0gdGhpcy5fYWN0aXZlQ29tcG9uZW50LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRBY3RpdmVDb21wb25lbnQudHJhY2VDb250cm9sSW50ZXJmYWNlICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJhY2VDb250cm9sSW50ZXJmYWNlID0gY3VycmVudEFjdGl2ZUNvbXBvbmVudC50cmFjZUNvbnRyb2xJbnRlcmZhY2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudEFjdGl2ZUNvbXBvbmVudC50cmFjZVBhcmFtZXRlcnMgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFjZVBhcmFtZXRlcnNJbnRlcmZhY2UgPSBjdXJyZW50QWN0aXZlQ29tcG9uZW50LnRyYWNlUGFyYW1ldGVycztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCB0cmFjZVBhcmFtZXRlcnNJbnRlcmZhY2UodHJhY2VQYXJhbWV0ZXJJbnRlcmZhY2U6IFByb3BlcnR5PElUcmFjZUNvbXBvbmVudFBhcmFtZXRlcnM+KSB7XHJcbiAgICAgICAgdHJhY2VQYXJhbWV0ZXJJbnRlcmZhY2UuY2hhbmdlZCgodHJhY2VQYXJhbWV0ZXJJbnRlcmZhY2UpID0+IHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXZhaWxhYmxlRGF0YVBvaW50cyA9IHRyYWNlUGFyYW1ldGVySW50ZXJmYWNlLmF2YWlsYWJsZVRyYWNlRGF0YVBvaW50cztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcblx0ICogU2V0cyB0aGUgYXZhaWxhYmxlIHRyYWNlIGRhdGFwb2ludHMgdG8gdGhlIHRyYWNlIHZpZXcgd2lkZ2V0XHJcblx0ICpcclxuXHQgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcblx0ICovXHJcbiAgICBwdWJsaWMgc2V0IGF2YWlsYWJsZURhdGFQb2ludHMoYXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzOiBQcm9wZXJ0eTxUcmFjZURhdGFQb2ludEluZm9bXT4pIHtcclxuICAgICAgICBhdmFpbGFibGVUcmFjZURhdGFQb2ludHMuY2hhbmdlZCgoZGF0YVBvaW50cykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl90cmFjZURhdGFQb2ludEluZm9zID0gZGF0YVBvaW50cztcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG5cdCAqIFNldHMgYW5kIGRlZmluZXMgdGhlIGludGVyZmFjZSB0byB0aGUgdHJhY2UgY29udHJvbFxyXG5cdCAqXHJcblx0ICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG5cdCAqL1xyXG4gICAgcHVibGljIHNldCB0cmFjZUNvbnRyb2xJbnRlcmZhY2UodHJhY2VDb21wb25lbnRDb250cm9sOiBJVHJhY2VDb21wb25lbnRDb250cm9sKSB7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0VHJhY2VDb250cm9sV2lkZ2V0KHRyYWNlQ29tcG9uZW50Q29udHJvbCk7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0VHJhY2VWaWV3V2lkZ2V0VG9UcmFjZVN0YXRlKCk7XHJcbiAgICB9XHJcblxyXG5cdC8qKlxyXG4gICAgICogU3RhcnQgbG9hZGluZyB0cmFjZSBkYXRhIGZyb20gdGFyZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbG9hZFRyYWNlRGF0YUZyb21UYXJnZXQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2lzTG9hZGluZ1RyYWNlRGF0YSA9PSB0cnVlIHx8IHRoaXMuX3dpZGdldElzQWN0aXZlID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2lzTG9hZGluZ1RyYWNlRGF0YSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fdHJhY2VDb250cm9sV2lkZ2V0LnNldEJ1c3lJbmZvcm1hdGlvbihuZXcgQnVzeUluZm9ybWF0aW9uKFwiTG9hZGluZyB0cmFjZSBkYXRhXCIsIEltYWdlSWQuZGVmYXVsdEltYWdlLCAyNSwgZmFsc2UpKTtcclxuICAgICAgICB0aGlzLl90cmFjZUNvbnRyb2xXaWRnZXQuc2V0QnVzeSh0cnVlKTtcclxuXHJcbiAgICAgICAgLy8gaW52b2tlIGxvYWRpbmcgdHJhY2UgZGF0YVxyXG4gICAgICAgIHRoaXMuaW52b2tlTG9hZFRyYWNlRGF0YSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW52b2tlTG9hZFRyYWNlRGF0YSgpIHtcclxuICAgICAgICAvLyBCSU5ESU5HU09VUkNFOiBtZXRob2QgZm9yIGRpc3BhdGNoaW5nIHRoZSBjYWxsIHRvIGEgYm91bmQgdGFyZ2V0XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbmZvcm1hdGlvbnMgaWYgbG9hZGluZyBvZiB0cmFjZSBkYXRhIGZyb20gdGFyZ2V0IGZhaWxlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGVycm9yRGF0YVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uRXJyb3JMb2FkaW5nVHJhY2VEYXRhKGVycm9yRGF0YSkge1xyXG4gICAgICAgIHRoaXMuX2lzTG9hZGluZ1RyYWNlRGF0YSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3RyYWNlQ29udHJvbFdpZGdldC5zZXRCdXN5KGZhbHNlKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBoYW5kbGVzIHRyYWNlIHN0YXRlIGNoYW5nZXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IHRyYWNlU3RhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZVZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvblRyYWNlU3RhdGVDaGFuZ2VkKHRyYWNlU3RhdGU6IHN0cmluZyxvbGRUcmFjZVN0YXRlKSB7XHJcbiAgICAgICAgdGhpcy5fdHJhY2VTdGF0ZSA9IHRyYWNlU3RhdGU7XHJcbiAgICAgICAgaWYgKHRyYWNlU3RhdGUgPT0gVHJhY2VTdGF0ZUlkcy5EYXRhX2F2YWlsYWJsZSAmJiBvbGRUcmFjZVN0YXRlICE9IFRyYWNlU3RhdGVJZHMuRGF0YV9hdmFpbGFibGUpIHtcclxuICAgICAgICAgICAgLy8gQXV0byB1cGxvYWQgb2YgdHJhY2UgZGF0YVxyXG4gICAgICAgICAgICB0aGlzLmxvYWRUcmFjZURhdGFGcm9tVGFyZ2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5mb3JtYXRpb25zKHRyYWNlZGF0YSkgZnJvbSB0YXJnZXQgYWZ0ZXIgc3VjY2Vzc2Z1bCB0cmFjZSBkYXRhIHVwbG9hZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHJlc3VsdFxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uVHJhY2VEYXRhTG9hZGVkKHJlc3VsdCkge1xyXG4gICAgICAgIHZhciB0cmFjZURhdGEgPSByZXN1bHQgYXMgVHJhY2VEYXRhO1xyXG4gICAgICAgIGxldCBhZGRUcmFjZURhdGFUb1NpZ25hbE1hbmFnZXIgPSB0cnVlO1xyXG4gICAgICAgIC8vIGNoZWNrIGlmIGRhdGEgYWxyZWFkeSBpbiBzaWduYWxtYW5hZ2VyIGRhdGFtb2RlbFxyXG4gICAgICAgIGlmICh0cmFjZURhdGEudHJhY2VDaGFubmVscy5sZW5ndGggPiAwICYmIHRyYWNlRGF0YS50cmFjZUNoYW5uZWxzWzBdIS50cmFjZVBvaW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHZhciBzZXJpZUdyb3VwTmFtZSA9IERhdGVUaW1lSGVscGVyLmdldERhdGVUaW1lKHRyYWNlRGF0YS50cmFjZUNoYW5uZWxzWzBdIS50cmFjZVBvaW50c1swXSEudGltZVN0YW1wKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHRoaXMuX3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuX3NpZ25hbE1hbmFnZXJEYXRhTW9kZWxbXCJkaXNwb3NlZFwiXSAhPSB0cnVlKXsvLyBCdWdmaXggdG8gYXZvaWQgdXNlIG9mIG5vdCB1bmJpbmRlZCBkYXRhbW9kZWxcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbGF0ZXN0Q2F0ZWdvcnkgPSB0aGlzLl9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsLmdldFNpZ25hbENhdGVnb3J5KFNpZ25hbENhdGVnb3J5LkNhdGVnb3J5SWRSZWNlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsYXRlc3RDYXRlZ29yeSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNlcmllQ29udGFpbmVyID0gbGF0ZXN0Q2F0ZWdvcnkuZ2V0U2VyaWVDb250YWluZXIoc2VyaWVHcm91cE5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VyaWVDb250YWluZXIgIT0gdW5kZWZpbmVkKSB7IC8vIHNpZ25hbCBjb250YWluZXIgYWxyZWFkeSBleGlzdHM7IG5lZWRlZCB0byBhdm9pZCBkdXBsaWNhdGVkIHNpZ25hbCBjb250YWluZXJzIGlmIGV2ZW50IGNvbWVzIG11bHRpcGxlIHRpbWVzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRUcmFjZURhdGFUb1NpZ25hbE1hbmFnZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcInNpZ25hbE1hbmFnZXJEYXRhTW9kZWwgbm90IGF2YWlsYWJsZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFkZFRyYWNlRGF0YVRvU2lnbmFsTWFuYWdlciA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGlmICh0cmFjZURhdGEudHJhY2VDaGFubmVscy5sZW5ndGggPiAwICYmIHRyYWNlRGF0YS50cmFjZUNoYW5uZWxzWzBdIS50cmFjZVBvaW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFRyYWNlRGF0YVRvU2lnbmFsTWFuYWdlcih0cmFjZURhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2lzTG9hZGluZ1RyYWNlRGF0YSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3RyYWNlQ29udHJvbFdpZGdldC5zZXRCdXN5KGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgdGhlIGdpdmVuIHRyYWNlIGRhdGEgdG8gdGhlIHNpZ25hbCBtYW5hZ2VyXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gdHJhY2VEYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkVHJhY2VEYXRhVG9TaWduYWxNYW5hZ2VyKHRyYWNlRGF0YSkge1xyXG4gICAgICAgIHZhciBuZXdTZXJpZUdyb3VwID0gbmV3IFNlcmllR3JvdXAoRGF0ZVRpbWVIZWxwZXIuZ2V0RGF0ZVRpbWUodHJhY2VEYXRhLnRyaWdnZXJUaW1lKSwgdHJhY2VEYXRhLnRyaWdnZXJUaW1lKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRyYWNlRGF0YS50cmFjZUNoYW5uZWxzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IG5ldyBBcnJheTxJUG9pbnQ+KCk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdHJhY2VEYXRhLnRyYWNlQ2hhbm5lbHNbaV0udHJhY2VQb2ludHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciB4VmFsOiBudW1iZXIgPSAodHJhY2VEYXRhLnRyYWNlQ2hhbm5lbHNbaV0udHJhY2VQb2ludHNbal0udGltZVN0YW1wIC0gdHJhY2VEYXRhLnRyaWdnZXJUaW1lKSAvIDEwMDAwMDA7XHJcbiAgICAgICAgICAgICAgICB2YXIgeVZhbDogbnVtYmVyID0gdHJhY2VEYXRhLnRyYWNlQ2hhbm5lbHNbaV0udHJhY2VQb2ludHNbal0uZGF0YVZhbHVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGRhdGEucHVzaChuZXcgUG9pbnQoeFZhbCwgeVZhbCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBuZXdTaWduYWwgPSBuZXcgU2lnbmFsKHRyYWNlRGF0YS50cmFjZUNoYW5uZWxzW2ldLm5hbWUsIGRhdGEpO1xyXG4gICAgICAgICAgICBsZXQgbmV3U2VyaWUgPSBuZXcgWVRTZXJpZXMobmV3U2lnbmFsLCBuZXdTaWduYWwubmFtZSwgQ29sb3JIZWxwZXIuZ2V0Q29sb3IoKSwgU2VyaWVzUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl90cmFjZURhdGFQb2ludEluZm9zICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRyYWNlUG9pbnRJbmZvcyA9IHRoaXMuX3RyYWNlRGF0YVBvaW50SW5mb3MuZmlsdGVyKGVsZW1lbnQgPT4gZWxlbWVudC5mdWxsbmFtZSA9PSBuZXdTaWduYWwubmFtZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAodHJhY2VQb2ludEluZm9zLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3U2VyaWUubmFtZSA9IHRyYWNlUG9pbnRJbmZvc1swXS5jb21wb25lbnROYW1lICsgXCI6XCIgKyB0cmFjZVBvaW50SW5mb3NbMF0ubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICBuZXdTZXJpZS5kZXNjcmlwdGlvbiA9IHRyYWNlUG9pbnRJbmZvc1swXS5kZXNjcmlwdGlvbjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBuZXdTZXJpZUdyb3VwLmFkZFNlcmllKG5ld1NlcmllKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc2lnbmFsTWFuYWdlckRhdGFNb2RlbC5hZGRVcGxvYWRlZFNlcmllR3JvdXAobmV3U2VyaWVHcm91cCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAgIENvbm5lY3RzIHRoZSB0cmFjZSBjb250cm9sIHdpZGdldCB0byB0aGUgdHJhY2UgY29udHJvbCBwcm92aWRlclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SVRyYWNlQ29tcG9uZW50Q29udHJvbH0gdHJhY2VDb21wb25lbnRDb250cm9sXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZVZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb25uZWN0VHJhY2VDb250cm9sV2lkZ2V0KHRyYWNlQ29tcG9uZW50Q29udHJvbDogSVRyYWNlQ29tcG9uZW50Q29udHJvbCk6IGFueSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3RyYWNlQ29udHJvbFdpZGdldCkge1xyXG4gICAgICAgICAgICB0aGlzLl90cmFjZUNvbnRyb2xXaWRnZXQudHJhY2VDb250cm9sSW50ZXJmYWNlID0gdGhpcy5nZXRJbnRlcmZhY2VXaXRob3V0U2F2ZUNvbW1hbmQodHJhY2VDb21wb25lbnRDb250cm9sKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmFjZSBjb21wb25lbnQgY29udHJvbCB3aXRoIG91dCB0aGUgc2F2ZS9pbXBvcnQvZXhwb3J0IHRyYWNlIGNvbmZpZ3VyYXRpb24gY29tbWFuZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0lUcmFjZUNvbXBvbmVudENvbnRyb2x9IHRyYWNlQ29tcG9uZW50Q29udHJvbFxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0SW50ZXJmYWNlV2l0aG91dFNhdmVDb21tYW5kKHRyYWNlQ29tcG9uZW50Q29udHJvbDogSVRyYWNlQ29tcG9uZW50Q29udHJvbCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY29tbWFuZEZvcmNlU3RhcnQ6IHRyYWNlQ29tcG9uZW50Q29udHJvbC5jb21tYW5kRm9yY2VTdGFydCxcclxuICAgICAgICAgICAgY29tbWFuZEZvcmNlU3RvcDogdHJhY2VDb21wb25lbnRDb250cm9sLmNvbW1hbmRGb3JjZVN0b3AsXHJcbiAgICAgICAgICAgIHRyYWNlU3RhdGU6IHRyYWNlQ29tcG9uZW50Q29udHJvbC50cmFjZVN0YXRlLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAgIENvbm5lY3RzIHRoZSBUcmFjZVZpZXdXaWRnZXQgdG8gdGhlIHRyYWNlIGNvbnRyb2wgcHJvdmlkZXIodHJhY2Ugc3RhdGUpXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29ubmVjdFRyYWNlVmlld1dpZGdldFRvVHJhY2VTdGF0ZSgpOiBhbnkge1xyXG4gICAgICAgIHRoaXMuX2lzTG9hZGluZ1RyYWNlRGF0YSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvLyBsb2FkIHRyYWNlIGRhdGEgaW5pdGlhbGx5IGlmIGF2YWlsYWJsZVxyXG4gICAgICAgIGlmICh0aGlzLl90cmFjZVN0YXRlID09IFRyYWNlU3RhdGVJZHMuRGF0YV9hdmFpbGFibGUpIHtcclxuICAgICAgICAgICAgLy8gSW5pdGlhbCBsb2FkIHRyYWNlIGRhdGFcclxuICAgICAgICAgICAgdGhpcy5sb2FkVHJhY2VEYXRhRnJvbVRhcmdldCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgVHJhY2VWaWV3V2lkZ2V0IH07Il19