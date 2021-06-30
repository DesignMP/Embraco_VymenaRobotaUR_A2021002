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
define(["require", "exports", "../../common/dateTimeHelper", "../../models/common/point", "../../common/colorHelper", "../common/busyInformation", "../../models/chartManagerDataModel/chartManagerChart", "../../models/diagnostics/trace/traceConfig/traceConfigDefines", "../common/viewBase", "../chartViewWidget/helpers/chartDropHelper", "../chartViewWidget/insertedInfo", "../../models/chartManagerDataModel/scale", "../chartWidget/ChartBase", "../common/SerieChartTypeHelper", "../../models/signalManagerDataModel/signalManagerCalculation", "../../models/signalManagerDataModel/signalCategory", "../../models/common/signal/serieGroup", "../../models/common/signal/signal", "../../models/chartManagerDataModel/seriesType", "./defaultComponentSettings", "../../common/seriesHelper", "../../models/common/calculatorProvider/calculators/xyCalculator", "../../models/common/calculatorProvider/calculators/fftCalculator"], function (require, exports, dateTimeHelper_1, point_1, colorHelper_1, busyInformation_1, chartManagerChart_1, traceConfigDefines_1, viewBase_1, chartDropHelper_1, insertedInfo_1, scale_1, ChartBase_1, SerieChartTypeHelper_1, signalManagerCalculation_1, signalCategory_1, serieGroup_1, signal_1, seriesType_1, defaultComponentSettings_1, seriesHelper_1, xyCalculator_1, fftCalculator_1) {
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
         * @returns {(ComponentSettings|undefined)}
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
            this.component.addDefaultComponentSettingsToProvider(defaultComponentSettings_1.DefaultComponentSettings.MainSplitterDefinitionId, defaultComponentSettings_1.DefaultComponentSettings.getMainSplitterDefinition());
            this.component.addDefaultComponentSettingsToProvider(defaultComponentSettings_1.DefaultComponentSettings.InnerSplitterDefinitionId, defaultComponentSettings_1.DefaultComponentSettings.getInnerSplitterDefinition());
            this.component.addDefaultComponentSettingsToProvider(defaultComponentSettings_1.DefaultComponentSettings.RightSplitterDefinitionId, defaultComponentSettings_1.DefaultComponentSettings.getRightSplitterDefinition());
        };
        /**
         * Sets the widget content and eventually subwidgets
         *
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            this.initLayoutWidget();
            this.setSeriesProvider();
            this.setTraceControlWidget();
            this.setInnerWidgets();
        };
        TraceViewWidget.prototype.initLayoutWidget = function () {
            this._layoutWidget = this.component.getSubComponent(defaultComponentSettings_1.DefaultComponentSettings.SplitterWidgetTraceViewId);
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
        };
        /**
         * Sets the seriesProvider
         *
         * @returns {*}
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.setSeriesProvider = function () {
            this._seriesProvider = this.component.getSubComponent(defaultComponentSettings_1.DefaultComponentSettings.SeriesProviderId);
        };
        /**
         * Sets the trace control widget
         *
         * @returns {*}
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.setTraceControlWidget = function () {
            this._traceControlWidget = this.getWidgetById(defaultComponentSettings_1.DefaultComponentSettings.TraceControlWidgetId);
        };
        /**
         * Sets the signal manager widget
         *
         * @private
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.setSignalManagerWidget = function () {
            this._signalManagerWidget = this.getWidgetById(defaultComponentSettings_1.DefaultComponentSettings.SignalManagerWidgetId);
            this._signalManagerDataModel = this._signalManagerWidget.dataModel;
        };
        /**
         * Sets the chart view widget
         *
         * @private
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.setChartViewWidget = function () {
            this._chartViewWidget = this.getWidgetById(defaultComponentSettings_1.DefaultComponentSettings.ChartViewWidgetId);
            this._chartViewWidget.eventDropHelper.attach(this._chartViewWidgetDropChangedHandler);
        };
        /**
         * Sets the chart manager widget
         *
         * @private
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.setChartManagerWidget = function () {
            this._chartManagerWidget = this.getWidgetById(defaultComponentSettings_1.DefaultComponentSettings.ChartManagerWidgetId);
            this._chartManagerWidget.eventDropHelper.attach(this._chartManagerWidgetdropHelperHandler);
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
            // Dispose provider
            this.disposeProviders();
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
            this._layoutWidget.eventWidgetActivated.detach(this._contentActivatedHandler);
        };
        TraceViewWidget.prototype.disposeProviders = function () {
            if (this._seriesProvider != undefined) {
                // TODO: Last user must dispose
                this.component.componentFactory.disposeComponent("SeriesProvider");
            }
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
                // TODO: Last user must dispose
                // TODO: only needed to remove singleton instance of chartmanagerDataModel
                this.component.componentFactory.disposeComponent("ChartManagerDataModel");
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
                    chartManagerChart.addDefaultYScale(this._chartManagerDataModel);
                    chartManagerDataModel.addChart(chartManagerChart, -1);
                    if (args.data.series != undefined) {
                        var yAxisId = chartManagerChart.getDefaultYAxisId();
                        var series = args.data.series;
                        if (args.data.type != chartManagerChart_1.ChartType.YTChart && args.data.series[0].type == seriesType_1.SeriesType.timeSeries) {
                            this._signalManagerWidget.suppressRefresh(true);
                            if (args.data.type == chartManagerChart_1.ChartType.XYChart) {
                                series = new Array();
                                var xySeries = this.createXYSerie(args.data.series[0].parent, args.data.series);
                                if (xySeries != undefined) {
                                    series.push(xySeries);
                                }
                            }
                            else if (args.data.type == chartManagerChart_1.ChartType.FFTChart) {
                                series = new Array();
                                for (var i = 0; i < args.data.series.length; i++) {
                                    var fftSeries = this.createFFTSerie(args.data.series[i].parent, args.data.series[i]);
                                    if (fftSeries != undefined) {
                                        series.push(fftSeries);
                                    }
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
                        //target chart may not be provided by the event args
                        if (args.data.targetChart == undefined) {
                            if (this._chartViewWidget != undefined) {
                                args.data.targetChart = this._chartViewWidget.getTraceChartByName(chart.name);
                            }
                        }
                        //if target chart still does not exist dont try to add the series to anything
                        if (args.data.targetChart != undefined) {
                            var yAxisId = this.getYAxisId(chartManagerDataModel, chart, yAxis, args.data.targetChart);
                            //insert serie to empty a chart
                            this.addSerieToChart(chartManagerDataModel, series, chart, yAxisId);
                        }
                    }
                    break;
                }
                case chartDropHelper_1.ChartDropHelperChangedHint.createXYSerie: {
                    //Creates XY serie and adds it to the XY chart
                    var chartManagerChart = args.data.chart;
                    var series = new Array();
                    var xySeries = this.createXYSerie(args.data.series[0].parent, args.data.series);
                    if (xySeries != undefined) {
                        series.push(xySeries);
                    }
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
                        var fftSeries = this.createFFTSerie(args.data.series[i].parent, args.data.series[i]);
                        if (fftSeries != undefined) {
                            series.push(fftSeries);
                        }
                    }
                    var yAxis = args.data.yAxis;
                    //target chart may not be provided by the event args
                    if (args.data.targetChart == undefined) {
                        if (this._chartViewWidget != undefined) {
                            args.data.targetChart = this._chartViewWidget.getTraceChartByName(chart.name);
                        }
                    }
                    //if target chart still does not exist dont try to add the series to anything
                    if (args.data.targetChart != undefined) {
                        var yAxisId = this.getYAxisId(chartManagerDataModel, chart, yAxis, args.data.targetChart);
                        //Add all dragged series to the chart.
                        this.addSerieToChart(chartManagerDataModel, series, chart, yAxisId);
                    }
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
            var innerLayoutSplitterWidget = this.getWidgetById(defaultComponentSettings_1.DefaultComponentSettings.SplitterWidgetMainTraceId);
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
                var serieChartType = SerieChartTypeHelper_1.SerieChartTypeHelper.getSerieChartType(serie.type);
                var newChart = new chartManagerChart_1.ChartManagerChart(newChartName, serieChartType);
                newChart.addDefaultYScale(this._chartManagerDataModel);
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
            if (this._seriesProvider == undefined) {
                return undefined;
            }
            // create calculation
            var calculation = new signalManagerCalculation_1.SignalManagerCalculation("Calculation", this._seriesProvider);
            // add calculation to container
            container.addSerieContainer(calculation, -1);
            // set calculation type
            calculation.setCalculatorTypeById(xyCalculator_1.XYCalculator.id);
            // set calculation input data
            if (series.length > 0 && series[0] != undefined) {
                calculation.setInputValueById(xyCalculator_1.XYCalculator.inputIdXSignal, series[0].name);
            }
            if (series.length > 1 && series[1] != undefined) {
                calculation.setInputValueById(xyCalculator_1.XYCalculator.inputIdYSignal, series[1].name);
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
            if (this._seriesProvider == undefined) {
                return undefined;
            }
            // create calculation
            var calculation = new signalManagerCalculation_1.SignalManagerCalculation("Calculation", this._seriesProvider);
            // add calculation to container
            container.addSerieContainer(calculation, -1);
            // set calculation type
            calculation.setCalculatorTypeById(fftCalculator_1.FftCalculator.id);
            // set calculation input data
            calculation.setInputValueById(fftCalculator_1.FftCalculator.inputIdSignal, series.name);
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
         * Detaches the chart manager widget events
         *
         * @private
         * @memberof TraceViewWidget
         */
        TraceViewWidget.prototype.detachChartManagerWidgetEvents = function () {
            this._chartManagerWidget.eventDropHelper.detach(this._chartManagerWidgetdropHelperHandler);
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
                var serieGroupName = dateTimeHelper_1.DateTimeHelper.getDateTime(traceData.triggerTime);
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
                if (this_1._seriesProvider != undefined) {
                    var settings = seriesHelper_1.SeriesHelper.createSerieSettings(newSignal, newSignal.name, colorHelper_1.ColorHelper.getColor(), this_1._seriesProvider.getUniqueId(), seriesType_1.SeriesType.timeSeries);
                    var newSerie = this_1._seriesProvider.createSerie(settings);
                    if (newSerie != undefined) {
                        if (this_1._traceDataPointInfos != undefined) {
                            var tracePointInfos = this_1._traceDataPointInfos.filter(function (element) { return element.fullname == newSignal.name; });
                            if (tracePointInfos.length == 1) {
                                newSerie.name = tracePointInfos[0].componentName + ":" + tracePointInfos[0].name;
                                newSerie.description = tracePointInfos[0].description;
                            }
                        }
                        newSerieGroup.addSerie(newSerie);
                    }
                    else {
                        console.error("Creation of the serie was not possible!");
                    }
                }
                else {
                    console.error("SeriesProvider not available!");
                }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VWaWV3V2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RyYWNlVmlld1dpZGdldC90cmFjZVZpZXdXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQXVDQTtRQUE4QixtQ0FBUTtRQUF0QztZQUFBLHFFQXUyQkM7WUF4MUJXLHlCQUFtQixHQUFHLEtBQUssQ0FBQztZQUk1QixxQkFBZSxHQUFHLElBQUksQ0FBQztZQUUvQixpQkFBaUI7WUFDVCw4QkFBd0IsR0FBRyxVQUFDLE1BQU0sRUFBRSxJQUFJLElBQUssT0FBQSxLQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFyQyxDQUFxQyxDQUFDO1lBRW5GLHdDQUFrQyxHQUFHLFVBQUMsTUFBTSxFQUFFLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFoQyxDQUFnQyxDQUFDO1lBRXhGLG1EQUE2QyxHQUFHLFVBQUMsTUFBTSxFQUFFLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyx1Q0FBdUMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQTFELENBQTBELENBQUM7WUFDN0gsMkNBQXFDLEdBQUcsVUFBQyxNQUFNLEVBQUUsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLCtCQUErQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBbEQsQ0FBa0QsQ0FBQztZQUM3Ryx3Q0FBa0MsR0FBRyxVQUFDLE1BQU0sRUFBRSxJQUFJLElBQUssT0FBQSxLQUFJLENBQUMsNEJBQTRCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUEvQyxDQUErQyxDQUFDO1lBRXZHLDBDQUFvQyxHQUFHLFVBQUMsTUFBTSxFQUFFLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFoQyxDQUFnQyxDQUFDO1lBQzFGLGlCQUFXLEdBQVMsRUFBRSxDQUFDOztRQXcwQm5DLENBQUM7UUFyMEJHOzs7OztXQUtHO1FBQ0gsb0NBQVUsR0FBVixVQUFXLGlCQUF5QjtZQUNoQyxpQkFBTSxVQUFVLFlBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUN4QyxDQUFDO1FBRUQsNkNBQW1CLEdBQW5CO1lBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsR0FBRyxtREFBd0IsQ0FBQyxrQkFBa0IsQ0FBQztZQUNuRixJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDdkMsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gscURBQTJCLEdBQTNCO1lBQ0ksT0FBTyxtREFBd0IsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1FBQzdELENBQUM7UUFFRDs7Ozs7V0FLRztRQUNILCtEQUFxQyxHQUFyQztZQUNJLHlCQUF5QjtZQUN6QixJQUFJLENBQUMsU0FBUyxDQUFDLHFDQUFxQyxDQUFDLG1EQUF3QixDQUFDLHdCQUF3QixFQUFFLG1EQUF3QixDQUFDLHlCQUF5QixFQUFFLENBQUMsQ0FBQztZQUM5SixJQUFJLENBQUMsU0FBUyxDQUFDLHFDQUFxQyxDQUFDLG1EQUF3QixDQUFDLHlCQUF5QixFQUFFLG1EQUF3QixDQUFDLDBCQUEwQixFQUFFLENBQUMsQ0FBQztZQUNoSyxJQUFJLENBQUMsU0FBUyxDQUFDLHFDQUFxQyxDQUFDLG1EQUF3QixDQUFDLHlCQUF5QixFQUFFLG1EQUF3QixDQUFDLDBCQUEwQixFQUFFLENBQUMsQ0FBQztRQUNwSyxDQUFDO1FBRUQ7Ozs7V0FJRztRQUNILHFDQUFXLEdBQVg7WUFDSSxpQkFBTSxXQUFXLFdBQUUsQ0FBQztZQUVwQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUV4QixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUN6QixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUM3QixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDM0IsQ0FBQztRQUVELDBDQUFnQixHQUFoQjtZQUNJLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsbURBQXdCLENBQUMseUJBQXlCLENBQWtCLENBQUM7WUFDekgsSUFBSSxDQUFDLGtCQUFrQixDQUFNLElBQUksQ0FBQyxDQUFDO1lBRW5DLElBQUksQ0FBQyxhQUFjLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUNyRCxJQUFJLENBQUMsYUFBYyxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUNuRixDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSyx5Q0FBZSxHQUF2QjtZQUVJLHFCQUFxQjtZQUNyQixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztZQUM5QixJQUFJLENBQUMsK0JBQStCLEVBQUUsQ0FBQztZQUV2QywyQkFBMkI7WUFDM0IsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7WUFFMUIsdUNBQXVDO1lBQ3ZDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUV2QixJQUFJLENBQUMsa0NBQWtDLEVBQUUsQ0FBQztRQUM5QyxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSyx5Q0FBZSxHQUF2QjtZQUVJLHVDQUF1QztZQUN2QyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUNqQyxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSywyQ0FBaUIsR0FBekI7WUFDSSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLG1EQUF3QixDQUFDLGdCQUFnQixDQUFvQixDQUFDO1FBQ3hILENBQUM7UUFFRDs7Ozs7V0FLRztRQUNLLCtDQUFxQixHQUE3QjtZQUNJLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLG1EQUF3QixDQUFDLG9CQUFvQixDQUFnQyxDQUFDO1FBQ2hJLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNLLGdEQUFzQixHQUE5QjtZQUNJLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLG1EQUF3QixDQUFDLHFCQUFxQixDQUFpQyxDQUFDO1lBQy9ILElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsU0FBK0MsQ0FBQztRQUM3RyxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSyw0Q0FBa0IsR0FBMUI7WUFDSSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxtREFBd0IsQ0FBQyxpQkFBaUIsQ0FBNkIsQ0FBQztZQUNuSCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0NBQWtDLENBQUMsQ0FBQztRQUMxRixDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSywrQ0FBcUIsR0FBN0I7WUFDSSxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxtREFBd0IsQ0FBQyxvQkFBb0IsQ0FBZ0MsQ0FBQztZQUM1SCxJQUFJLENBQUMsbUJBQW1CLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0NBQW9DLENBQUMsQ0FBQztZQUUzRixJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQThDLENBQUM7UUFDMUcsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSCxrQ0FBUSxHQUFSO1lBQ0ksSUFBSSxDQUFDLGFBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNuQyxDQUFDO1FBRUQsaUNBQU8sR0FBUDtZQUNJLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1lBQzdCLElBQUksQ0FBQyxhQUFjLENBQUMsT0FBTyxFQUFFLENBQUM7WUFFOUIsZ0JBQWdCO1lBQ2hCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUVwQixtQkFBbUI7WUFDbkIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFFeEIscUJBQXFCO1lBQ3JCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBRXpCLGlCQUFNLE9BQU8sV0FBRSxDQUFDO1FBQ3BCLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNLLHNDQUFZLEdBQXBCO1lBQ0ksSUFBSSxDQUFDLDJCQUEyQixFQUFFLENBQUM7WUFFbkMsSUFBSSxDQUFDLCtCQUErQixFQUFFLENBQUM7WUFDdkMsSUFBSSxDQUFDLGtDQUFrQyxFQUFFLENBQUM7WUFFMUMsSUFBSSxDQUFDLDhCQUE4QixFQUFFLENBQUM7WUFFdEMsSUFBSSxDQUFDLGFBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDbkYsQ0FBQztRQUVELDBDQUFnQixHQUFoQjtZQUNJLElBQUcsSUFBSSxDQUFDLGVBQWUsSUFBSSxTQUFTLEVBQUM7Z0JBQ2pDLCtCQUErQjtnQkFDL0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2FBQ3ZFO1FBQ0wsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0ssMkNBQWlCLEdBQXpCO1lBQ0ksbUNBQW1DO1lBQ25DLElBQUcsSUFBSSxDQUFDLHVCQUF1QixJQUFJLFNBQVMsRUFBQztnQkFDekMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQzFDO1lBQ0QsSUFBRyxJQUFJLENBQUMsc0JBQXNCLElBQUksU0FBUyxFQUFDO2dCQUN4QywrQkFBK0I7Z0JBQy9CLDBFQUEwRTtnQkFDMUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO2FBQzlFO1FBQ0wsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gsZ0NBQU0sR0FBTixVQUFPLEtBQWEsRUFBRSxNQUFjO1lBQ2hDLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1lBQzFCLElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDO1lBRTVCLElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxTQUFTLEVBQUU7Z0JBQ2pDLElBQUksQ0FBQyxhQUFjLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQzthQUM3QztRQUNMLENBQUM7UUFFTyw0Q0FBa0IsR0FBMUIsVUFBMkIsTUFBTSxFQUFFLElBQUk7WUFDbkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFBO1FBQ3RELENBQUM7UUFHTyxxREFBMkIsR0FBbkM7WUFDSSxJQUFHLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxTQUFTLEVBQUM7Z0JBQ2xDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO2FBQ3pGO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSyx1Q0FBYSxHQUFyQixVQUFzQixxQkFBd0QsRUFBRSxJQUFJO1lBQ2hGLFFBQVEsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDZixLQUFLLDRDQUEwQixDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUN6QyxvQ0FBb0M7b0JBQ3BDLElBQUksU0FBUyxHQUFHLHFCQUFxQixDQUFDLGtCQUFrQixFQUFFLENBQUM7b0JBQzNELElBQUksaUJBQWlCLEdBQUcsSUFBSSxxQ0FBaUIsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDekUsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7b0JBQ2hFLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN0RCxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLFNBQVMsRUFBRTt3QkFDL0IsSUFBSSxPQUFPLEdBQUcsaUJBQWlCLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzt3QkFDcEQsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFzQixDQUFDO3dCQUM5QyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLDZCQUFTLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSx1QkFBVSxDQUFDLFVBQVUsRUFBRTs0QkFFMUYsSUFBSSxDQUFDLG9CQUFxQixDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDakQsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSw2QkFBUyxDQUFDLE9BQU8sRUFBRTtnQ0FDckMsTUFBTSxHQUFHLElBQUksS0FBSyxFQUFjLENBQUM7Z0NBQ2pDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0NBQ2hGLElBQUcsUUFBUSxJQUFJLFNBQVMsRUFBQztvQ0FDckIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztpQ0FDekI7NkJBQ0o7aUNBQ0ksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSw2QkFBUyxDQUFDLFFBQVEsRUFBRTtnQ0FDM0MsTUFBTSxHQUFHLElBQUksS0FBSyxFQUFjLENBQUM7Z0NBQ2pDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7b0NBQzdDLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0NBQ3JGLElBQUcsU0FBUyxJQUFJLFNBQVMsRUFBQzt3Q0FDdEIsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztxQ0FDMUI7aUNBQ0o7NkJBQ0o7NEJBQ0QsSUFBSSxDQUFDLG9CQUFxQixDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQzs0QkFFbEQsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBcUIsQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksNkJBQVMsQ0FBQyxPQUFPLEVBQUU7Z0NBQ25GLElBQUksQ0FBQyxvQkFBcUIsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQzs2QkFDckQ7eUJBQ0o7d0JBQ0Qsc0NBQXNDO3dCQUN0QyxJQUFJLENBQUMsZUFBZSxDQUFDLHFCQUFxQixFQUFFLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxPQUFPLENBQUMsQ0FBQztxQkFDbkY7b0JBQ0QsTUFBTTtpQkFDVDtnQkFDRCxLQUFLLDRDQUEwQixDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUN0QyxJQUFJLE1BQU0sR0FBc0IsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7b0JBQ2pELElBQUksS0FBSyxHQUFtQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztvQkFDNUQsSUFBSSxLQUFLLEdBQVUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7b0JBQ25DLElBQUksS0FBSyxJQUFJLFNBQVMsRUFBRTt3QkFDcEIsb0RBQW9EO3dCQUNwRCxJQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLFNBQVMsRUFBQzs0QkFDbEMsSUFBRyxJQUFJLENBQUMsZ0JBQWdCLElBQUksU0FBUyxFQUFDO2dDQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDOzZCQUNqRjt5QkFDSjt3QkFDRCw2RUFBNkU7d0JBQzdFLElBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksU0FBUyxFQUFDOzRCQUNsQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLHFCQUFxQixFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzs0QkFDMUYsK0JBQStCOzRCQUMvQixJQUFJLENBQUMsZUFBZSxDQUFDLHFCQUFxQixFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7eUJBQ3ZFO3FCQUNKO29CQUNELE1BQU07aUJBQ1Q7Z0JBRUQsS0FBSyw0Q0FBMEIsQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFDM0MsOENBQThDO29CQUM5QyxJQUFJLGlCQUFpQixHQUF1QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztvQkFDNUQsSUFBSSxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQWMsQ0FBQztvQkFDckMsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDaEYsSUFBRyxRQUFRLElBQUksU0FBUyxFQUFDO3dCQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3FCQUN6QjtvQkFDRCxJQUFJLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO29CQUNwRCxzQ0FBc0M7b0JBQ3RDLElBQUksQ0FBQyxlQUFlLENBQUMscUJBQXFCLEVBQUUsTUFBTSxFQUFFLGlCQUFpQixFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUNoRixNQUFNO2lCQUNUO2dCQUVELEtBQUssNENBQTBCLENBQUMsY0FBYyxDQUFDLENBQUM7b0JBQzVDLCtDQUErQztvQkFDL0MsSUFBSSxLQUFLLEdBQXVCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO29CQUNoRCxJQUFJLE1BQU0sR0FBRyxJQUFJLEtBQUssRUFBYyxDQUFDO29CQUNyQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO3dCQUM3QyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNyRixJQUFHLFNBQVMsSUFBSSxTQUFTLEVBQUM7NEJBQ3RCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7eUJBQzFCO3FCQUNKO29CQUNELElBQUksS0FBSyxHQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO29CQUVuQyxvREFBb0Q7b0JBQ3BELElBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksU0FBUyxFQUFDO3dCQUNsQyxJQUFHLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxTQUFTLEVBQUM7NEJBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7eUJBQ2pGO3FCQUNKO29CQUNELDZFQUE2RTtvQkFDN0UsSUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxTQUFTLEVBQUM7d0JBQ2xDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMscUJBQXFCLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO3dCQUMxRixzQ0FBc0M7d0JBQ3RDLElBQUksQ0FBQyxlQUFlLENBQUMscUJBQXFCLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztxQkFDdkU7aUJBQ0o7YUFDSjtRQUNMLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNLLHlEQUErQixHQUF2QztZQUNJLElBQUcsSUFBSSxDQUFDLG9CQUFvQixJQUFJLFNBQVMsRUFBQztnQkFDdEMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsNkNBQTZDLENBQUMsQ0FBQztnQkFDN0csSUFBSSxDQUFDLG9CQUFvQixDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHFDQUFxQyxDQUFDLENBQUM7YUFDaEc7UUFDTCxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSyx5REFBK0IsR0FBdkM7WUFDSSxJQUFHLElBQUksQ0FBQyxvQkFBb0IsSUFBSSxTQUFTLEVBQUM7Z0JBQ3RDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDZDQUE2QyxDQUFDLENBQUM7Z0JBQzdHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO2FBQ2hHO1FBQ0wsQ0FBQztRQUVPLGlFQUF1QyxHQUEvQyxVQUFnRCxNQUFNLEVBQUUsS0FBaUI7WUFDckUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBOEMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNyRyxDQUFDO1FBRU8seURBQStCLEdBQXZDLFVBQXdDLE1BQU0sRUFBRSxPQUFPO1lBQ25ELHVEQUF1RDtZQUN2RCxJQUFJLHlCQUF5QixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsbURBQXdCLENBQUMseUJBQXlCLENBQTRCLENBQUM7WUFDbEksK0JBQStCO1lBQy9CLHlCQUF5QixDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDNUQsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLHFDQUFXLEdBQW5CLFVBQW9CLHFCQUF3RCxFQUFFLEtBQWlCO1lBQzNGLElBQUkscUJBQXFCLEVBQUU7Z0JBQ3ZCLElBQUksWUFBWSxHQUFHLHFCQUFxQixDQUFDLGtCQUFrQixFQUFFLENBQUM7Z0JBRTlELElBQUksY0FBYyxHQUFHLDJDQUFvQixDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFeEUsSUFBSSxRQUFRLEdBQUcsSUFBSSxxQ0FBaUIsQ0FBQyxZQUFZLEVBQUUsY0FBYyxDQUFDLENBQUM7Z0JBQ25FLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztnQkFFdkQsSUFBSSxZQUFZLEdBQUcscUJBQXFCLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFFL0QsSUFBSSxLQUFLLElBQUksU0FBUyxJQUFJLFlBQVksRUFBRTtvQkFDcEMsSUFBSSxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQWMsQ0FBQztvQkFDckMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDbkIsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO29CQUM3RCxJQUFJLEtBQUssSUFBSSxTQUFTLEVBQUU7d0JBQ3BCLElBQUksQ0FBQyxlQUFlLENBQUMscUJBQXFCLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7cUJBQzNFO3lCQUNJO3dCQUNELE9BQU8sQ0FBQyxLQUFLLENBQUMsOEJBQThCLENBQUMsQ0FBQztxQkFDakQ7aUJBQ0o7YUFDSjtRQUNMLENBQUM7UUFFRDs7Ozs7Ozs7V0FRRztRQUNLLHlDQUFlLEdBQXZCLFVBQXdCLHFCQUF3RCxFQUFFLE1BQXlCLEVBQUUsaUJBQWlELEVBQUUsT0FBZTtZQUMzSyxJQUFJLEtBQUssR0FBRyxpQkFBa0IsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbEQsSUFBSSxZQUFZLEdBQUcsSUFBSSwyQkFBWSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsaUJBQWtCLENBQUMsQ0FBQztZQUN2RSxJQUFJLFlBQVksSUFBSSxTQUFTLElBQUksWUFBWSxDQUFDLEtBQUssSUFBSSxTQUFTLElBQUksWUFBWSxDQUFDLEtBQUssSUFBSSxTQUFTLEVBQUU7Z0JBQ2pHLHFCQUFxQixDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDdkc7UUFDTCxDQUFDO1FBRU8sdUNBQWEsR0FBckIsVUFBc0IsU0FBMEIsRUFBRSxNQUF5QjtZQUN6RSxJQUFHLElBQUksQ0FBQyxlQUFlLElBQUksU0FBUyxFQUFDO2dCQUNqQyxPQUFPLFNBQVMsQ0FBQzthQUNwQjtZQUVELHFCQUFxQjtZQUN4QixJQUFJLFdBQVcsR0FBRyxJQUFJLG1EQUF3QixDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7WUFFcEYsK0JBQStCO1lBQy9CLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUU3Qyx1QkFBdUI7WUFDdkIsV0FBVyxDQUFDLHFCQUFxQixDQUFDLDJCQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFbkQsNkJBQTZCO1lBQzdCLElBQUcsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLFNBQVMsRUFBQztnQkFDMUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLDJCQUFZLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUM1RTtZQUVKLElBQUcsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLFNBQVMsRUFBQztnQkFDdEMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLDJCQUFZLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNoRjtZQUVELGtDQUFrQztZQUNsQyxPQUFPLFdBQVcsQ0FBQyx3QkFBd0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQW1CLENBQUM7UUFDdkUsQ0FBQztRQUdEOzs7Ozs7OztXQVFHO1FBQ0ssd0NBQWMsR0FBdEIsVUFBdUIsU0FBMEIsRUFBRSxNQUFrQjtZQUNqRSxJQUFHLElBQUksQ0FBQyxlQUFlLElBQUksU0FBUyxFQUFDO2dCQUNqQyxPQUFPLFNBQVMsQ0FBQzthQUNwQjtZQUVELHFCQUFxQjtZQUNyQixJQUFJLFdBQVcsR0FBRyxJQUFJLG1EQUF3QixDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7WUFFcEYsK0JBQStCO1lBQy9CLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUU3Qyx1QkFBdUI7WUFDdkIsV0FBVyxDQUFDLHFCQUFxQixDQUFDLDZCQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFcEQsNkJBQTZCO1lBQzdCLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyw2QkFBYSxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFeEUsMkRBQTJEO1lBQzNELElBQUksU0FBUyxHQUFHLFdBQVcsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1lBQ3RELElBQUksVUFBVSxHQUFHLFdBQVcsQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1lBQ3hELElBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxTQUFTLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUU7Z0JBQ3JFLElBQUksWUFBVSxHQUFHLFdBQVcsQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO2dCQUN4RCxJQUFHLFlBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDO29CQUVyQixZQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO29CQUMvQyxZQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLE1BQU0sR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLEdBQUcsV0FBVyxDQUFDLEtBQU0sQ0FBQyxtQkFBb0IsQ0FBQyxRQUFRLENBQUM7aUJBQ3BIO2FBQ0o7WUFFRCxrQ0FBa0M7WUFDbEMsT0FBTyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBbUIsQ0FBQztRQUM3QyxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNLLG9DQUFVLEdBQWxCLFVBQW1CLHFCQUF3RCxFQUFFLEtBQXlCLEVBQUUsS0FBd0IsRUFBRSxXQUFvQztZQUNuSyxJQUFJLE9BQWUsQ0FBQztZQUNuQixJQUFJLEtBQUssSUFBSSxTQUFTLEVBQUU7Z0JBQ3BCLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO2dCQUNyQixPQUFPLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQzthQUN0QjtpQkFDSTtnQkFDRCxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsRUFBRSxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUM7Z0JBQ3RFLElBQUcsT0FBTyxJQUFJLFNBQVMsRUFBQztvQkFDcEIsbUJBQW1CO29CQUNuQixPQUFPLEdBQUcsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUNqQyxJQUFJLFFBQVEsR0FBRyxJQUFJLGFBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBQ3pDLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7aUJBQ3BEO2FBQ0o7WUFDRCxPQUFPLE9BQU8sQ0FBQztRQUNuQixDQUFDO1FBRUQ7Ozs7Ozs7OztXQVNHO1FBQ0sscUNBQVcsR0FBbkIsVUFBb0IscUJBQXdELEVBQUUsaUJBQXFDLEVBQUUsV0FBVztZQUM1SCxJQUFJLE9BQU8sQ0FBQztZQUNaLElBQUksaUJBQWlCLENBQUMsU0FBUyxJQUFJLDZCQUFTLENBQUMsT0FBTyxFQUFFO2dCQUNsRCxPQUFPLEdBQUcsaUJBQWlCLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzthQUNuRDtpQkFDSTtnQkFDRCw0QkFBNEI7Z0JBQzVCLElBQUksZ0JBQWdCLEdBQUcsV0FBVyxDQUFDLHdCQUF3QixDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3hJLElBQUksZ0JBQWdCLENBQUMsZUFBZSxJQUFJLDJCQUFlLENBQUMsSUFBSSxFQUFFO29CQUMxRCxjQUFjO29CQUNkLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2lCQUNwRDtxQkFDSSxJQUFJLGdCQUFnQixDQUFDLGVBQWUsSUFBSSwyQkFBZSxDQUFDLFVBQVUsRUFBRTtvQkFDckUsa0JBQWtCO29CQUNsQixPQUFPLEdBQUcsaUJBQWlCLENBQUMsY0FBYyxFQUFFLENBQUM7b0JBQzdDLElBQUksUUFBUSxHQUFHLElBQUksYUFBSyxDQUFDLE9BQU8sRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO29CQUNyRCxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsUUFBUSxDQUFDLENBQUM7aUJBQ2hFO2FBQ0o7WUFDRCxPQUFPLE9BQU8sQ0FBQztRQUNuQixDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSyw0REFBa0MsR0FBMUM7WUFDSSxJQUFJLElBQUksQ0FBQyx1QkFBdUIsRUFBRTtnQkFDOUIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0NBQWtDLENBQUMsQ0FBQzthQUNuRztRQUNMLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNLLDREQUFrQyxHQUExQztZQUNJLElBQUksSUFBSSxDQUFDLHVCQUF1QixFQUFFO2dCQUM5QixJQUFJLENBQUMsdUJBQXVCLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO2FBQ25HO1FBQ0wsQ0FBQztRQUVPLHNEQUE0QixHQUFwQyxVQUFxQyxNQUFNLEVBQUUsS0FBSztZQUM5QyxJQUFJLElBQUksQ0FBQyxzQkFBc0IsRUFBRTtnQkFDN0IsSUFBSSxDQUFDLHNCQUFzQixDQUFDLHdCQUF3QixDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQy9EO1FBQ0wsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0ssd0RBQThCLEdBQXRDO1lBQ0ksSUFBSSxDQUFDLG1CQUFtQixDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLG9DQUFvQyxDQUFDLENBQUM7UUFDL0YsQ0FBQztRQUVELHNCQUFXLDRDQUFlO2lCQUExQixVQUEyQixlQUFvRDtnQkFBL0UsaUJBYUM7Z0JBWkcsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGVBQWUsQ0FBQztnQkFDeEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUM7b0JBQzFDLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUM7d0JBQzFCLElBQUksc0JBQXNCLEdBQUcsS0FBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQzt3QkFDekQsSUFBSSxzQkFBc0IsQ0FBQyxxQkFBcUIsSUFBSSxTQUFTLEVBQUU7NEJBQzNELEtBQUksQ0FBQyxxQkFBcUIsR0FBRyxzQkFBc0IsQ0FBQyxxQkFBcUIsQ0FBQzt5QkFDN0U7d0JBQ0QsSUFBSSxzQkFBc0IsQ0FBQyxlQUFlLElBQUksU0FBUyxFQUFFOzRCQUNyRCxLQUFJLENBQUMsd0JBQXdCLEdBQUcsc0JBQXNCLENBQUMsZUFBZSxDQUFDO3lCQUMxRTtvQkFDTCxDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUM7OztXQUFBO1FBRUQsc0JBQVcscURBQXdCO2lCQUFuQyxVQUFvQyx1QkFBNEQ7Z0JBQWhHLGlCQVNDO2dCQVJHLHVCQUF1QixDQUFDLE9BQU8sQ0FBQyxVQUFDLHVCQUF1QjtvQkFDcEQsSUFBSTt3QkFDQSxLQUFJLENBQUMsbUJBQW1CLEdBQUcsdUJBQXVCLENBQUMsd0JBQXdCLENBQUM7cUJBQy9FO29CQUNELE9BQU8sS0FBSyxFQUFFO3dCQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQ3RCO2dCQUNMLENBQUMsQ0FBQyxDQUFBO1lBQ04sQ0FBQzs7O1dBQUE7UUFPRCxzQkFBVyxnREFBbUI7WUFMOUI7Ozs7ZUFJQTtpQkFDQSxVQUErQix3QkFBd0Q7Z0JBQXZGLGlCQUlDO2dCQUhHLHdCQUF3QixDQUFDLE9BQU8sQ0FBQyxVQUFDLFVBQVU7b0JBQ3hDLEtBQUksQ0FBQyxvQkFBb0IsR0FBRyxVQUFVLENBQUM7Z0JBQzNDLENBQUMsQ0FBQyxDQUFBO1lBQ04sQ0FBQzs7O1dBQUE7UUFPRCxzQkFBVyxrREFBcUI7WUFMaEM7Ozs7ZUFJQTtpQkFDQSxVQUFpQyxxQkFBNkM7Z0JBQzFFLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO2dCQUN0RCxJQUFJLENBQUMsa0NBQWtDLEVBQUUsQ0FBQztZQUM5QyxDQUFDOzs7V0FBQTtRQUVKOzs7Ozs7V0FNTTtRQUNLLGlEQUF1QixHQUEvQjtZQUNJLElBQUksSUFBSSxDQUFDLG1CQUFtQixJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsZUFBZSxJQUFJLEtBQUssRUFBRTtnQkFDbkUsT0FBTzthQUNWO1lBRUQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztZQUNoQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsa0JBQWtCLENBQUMsSUFBSSxpQ0FBZSxDQUFDLG9CQUFvQixFQUFFLHlCQUFPLENBQUMsWUFBWSxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3hILElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFdkMsNEJBQTRCO1lBQzVCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQy9CLENBQUM7UUFFTyw2Q0FBbUIsR0FBM0I7WUFDSSxtRUFBbUU7UUFDdkUsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLGlEQUF1QixHQUEvQixVQUFnQyxTQUFTO1lBQ3JDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7WUFDakMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QyxDQUFDO1FBR0Q7Ozs7O1dBS0c7UUFDSyw2Q0FBbUIsR0FBM0IsVUFBNEIsVUFBa0IsRUFBQyxhQUFhO1lBQ3hELElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO1lBQzlCLElBQUksVUFBVSxJQUFJLGtDQUFhLENBQUMsY0FBYyxJQUFJLGFBQWEsSUFBSSxrQ0FBYSxDQUFDLGNBQWMsRUFBRTtnQkFDN0YsNEJBQTRCO2dCQUM1QixJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQzthQUNsQztRQUNMLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSywyQ0FBaUIsR0FBekIsVUFBMEIsTUFBTTtZQUM1QixJQUFJLFNBQVMsR0FBRyxNQUFtQixDQUFDO1lBQ3BDLElBQUksMkJBQTJCLEdBQUcsSUFBSSxDQUFDO1lBQ3ZDLG1EQUFtRDtZQUNuRCxJQUFJLFNBQVMsQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBRSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUMxRixJQUFJLGNBQWMsR0FBRywrQkFBYyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBRXZFLElBQUcsSUFBSSxDQUFDLHVCQUF1QixJQUFJLFNBQVMsRUFBQztvQkFDekMsSUFBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsVUFBVSxDQUFDLElBQUksSUFBSSxFQUFDLEVBQUMsZ0RBQWdEO3dCQUVqRyxJQUFJLGNBQWMsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsaUJBQWlCLENBQUMsK0JBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO3dCQUNyRyxJQUFJLGNBQWMsSUFBSSxTQUFTLEVBQUU7NEJBQzdCLElBQUksY0FBYyxHQUFHLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsQ0FBQzs0QkFDdEUsSUFBSSxjQUFjLElBQUksU0FBUyxFQUFFLEVBQUUsOEdBQThHO2dDQUM3SSwyQkFBMkIsR0FBRyxLQUFLLENBQUM7NkJBQ3ZDO3lCQUNKO3FCQUNKO2lCQUNKO3FCQUNHO29CQUNBLE9BQU8sQ0FBQyxLQUFLLENBQUMsc0NBQXNDLENBQUMsQ0FBQztpQkFDekQ7YUFDSjtZQUVELElBQUksMkJBQTJCLElBQUksSUFBSSxFQUFFO2dCQUNyQyxJQUFJLFNBQVMsQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBRSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUMxRixJQUFJLENBQUMsMkJBQTJCLENBQUMsU0FBUyxDQUFDLENBQUM7aUJBQy9DO2FBQ0o7WUFDRCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUMsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLHFEQUEyQixHQUFuQyxVQUFvQyxTQUFTO1lBQ3pDLElBQUksYUFBYSxHQUFHLElBQUksdUJBQVUsQ0FBQywrQkFBYyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEVBQUUsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDOztnQkFHckcsSUFBSSxHQUFHLElBQUksS0FBSyxFQUFVLENBQUM7Z0JBQy9CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQ2hFLElBQUksR0FBVyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLEdBQUcsT0FBTyxDQUFDO29CQUN2RyxJQUFJLEdBQVcsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO29CQUV2RSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksYUFBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO2lCQUNwQztnQkFDRCxJQUFJLFNBQVMsR0FBRyxJQUFJLGVBQU0sQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDbEUsSUFBRyxPQUFLLGVBQWUsSUFBSSxTQUFTLEVBQUM7b0JBQ2pDLElBQUksUUFBUSxHQUFHLDJCQUFZLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxJQUFJLEVBQUUseUJBQVcsQ0FBQyxRQUFRLEVBQUUsRUFBRSxPQUFLLGVBQWUsQ0FBQyxXQUFXLEVBQUUsRUFBRSx1QkFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUM5SixJQUFJLFFBQVEsR0FBRyxPQUFLLGVBQWUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQzFELElBQUcsUUFBUSxJQUFJLFNBQVMsRUFBQzt3QkFDckIsSUFBSSxPQUFLLG9CQUFvQixJQUFJLFNBQVMsRUFBRTs0QkFDeEMsSUFBSSxlQUFlLEdBQUcsT0FBSyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsUUFBUSxJQUFJLFNBQVMsQ0FBQyxJQUFJLEVBQWxDLENBQWtDLENBQUMsQ0FBQzs0QkFDdEcsSUFBSSxlQUFlLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtnQ0FDN0IsUUFBUSxDQUFDLElBQUksR0FBRyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxHQUFHLEdBQUcsR0FBRyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO2dDQUNqRixRQUFRLENBQUMsV0FBVyxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUM7NkJBQ3pEO3lCQUNKO3dCQUNELGFBQWEsQ0FBQyxRQUFRLENBQUMsUUFBUyxDQUFDLENBQUM7cUJBQ3JDO3lCQUNHO3dCQUNBLE9BQU8sQ0FBQyxLQUFLLENBQUMseUNBQXlDLENBQUMsQ0FBQTtxQkFDM0Q7aUJBQ0o7cUJBQ0c7b0JBQ0EsT0FBTyxDQUFDLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFBO2lCQUNqRDs7K0JBM0JHLElBQUksRUFFQSxJQUFJLEVBQ0osSUFBSTtZQUxoQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFOzthQThCdEQ7WUFDRCxJQUFJLENBQUMsdUJBQXVCLENBQUMscUJBQXFCLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDdEUsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLG1EQUF5QixHQUFqQyxVQUFrQyxxQkFBNkM7WUFDM0UsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsOEJBQThCLENBQUMscUJBQXFCLENBQUMsQ0FBQzthQUMvRztRQUNMLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0ssd0RBQThCLEdBQXRDLFVBQXVDLHFCQUE2QztZQUNoRixPQUFPO2dCQUNILGlCQUFpQixFQUFFLHFCQUFxQixDQUFDLGlCQUFpQjtnQkFDMUQsZ0JBQWdCLEVBQUUscUJBQXFCLENBQUMsZ0JBQWdCO2dCQUN4RCxVQUFVLEVBQUUscUJBQXFCLENBQUMsVUFBVTthQUMvQyxDQUFDO1FBQ04sQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0ssNERBQWtDLEdBQTFDO1lBQ0ksSUFBSSxDQUFDLG1CQUFtQixHQUFHLEtBQUssQ0FBQztZQUVqQyx5Q0FBeUM7WUFDekMsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLGtDQUFhLENBQUMsY0FBYyxFQUFFO2dCQUNsRCwwQkFBMEI7Z0JBQzFCLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO2FBQ2xDO1FBQ0wsQ0FBQztRQUNMLHNCQUFDO0lBQUQsQ0FBQyxBQXYyQkQsQ0FBOEIsbUJBQVEsR0F1MkJyQztJQUVRLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUxheW91dFdpZGdldCB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy9sYXlvdXRXaWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVNlcmllc1Byb3ZpZGVyIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb21tb24vc2VyaWVzUHJvdmlkZXIvc2VyaWVzUHJvdmlkZXJJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSUNoYXJ0TWFuYWdlckNoYXJ0IH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvaW50ZXJmYWNlcy9jaGFydE1hbmFnZXJDaGFydEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJVHJhY2VDb21wb25lbnRDb250cm9sIH0gZnJvbSBcIi4uLy4uL21vZGVscy9kaWFnbm9zdGljcy90cmFjZS9pbnRlcmZhY2VzL3RyYWNlQ29udHJvbFByb3ZpZGVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElQb2ludCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVRyYWNlQ29tcG9uZW50UGFyYW1ldGVycyB9IGZyb20gXCIuLi8uLi9tb2RlbHMvZGlhZ25vc3RpY3MvdHJhY2UvaW50ZXJmYWNlcy90cmFjZUNvbXBvbmVudFBhcmFtZXRlckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJVHJhY2VDaGFydCB9IGZyb20gXCIuLi9jaGFydFdpZGdldC9pbnRlcmZhY2VzL3RyYWNlQ2hhcnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVNlcmllQ29udGFpbmVyIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb21tb24vaW50ZXJmYWNlcy9zZXJpZUNvbnRhaW5lckludGVyZmFjZVwiO1xyXG5cclxuaW1wb3J0IHsgUHJvcGVydHkgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL3Byb3BlcnR5XCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0VHJhY2VDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2RpYWdub3N0aWNzL3RyYWNlL21hcHBDb2NrcGl0VHJhY2VDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgVHJhY2VEYXRhIH0gZnJvbSBcIi4uLy4uL21vZGVscy9kaWFnbm9zdGljcy90cmFjZS90cmFjZURhdGFSZWFkZXJcIjtcclxuaW1wb3J0IHsgRGF0ZVRpbWVIZWxwZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2RhdGVUaW1lSGVscGVyXCI7XHJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb21tb24vcG9pbnRcIjtcclxuaW1wb3J0IHsgQ29sb3JIZWxwZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbG9ySGVscGVyXCI7XHJcbmltcG9ydCB7IEJ1c3lJbmZvcm1hdGlvbiwgSW1hZ2VJZCB9IGZyb20gXCIuLi9jb21tb24vYnVzeUluZm9ybWF0aW9uXCI7XHJcbmltcG9ydCB7IENoYXJ0TWFuYWdlckNoYXJ0LCBDaGFydFR5cGUgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9jaGFydE1hbmFnZXJDaGFydFwiO1xyXG5pbXBvcnQgeyBUcmFjZVN0YXRlSWRzIH0gZnJvbSBcIi4uLy4uL21vZGVscy9kaWFnbm9zdGljcy90cmFjZS90cmFjZUNvbmZpZy90cmFjZUNvbmZpZ0RlZmluZXNcIjtcclxuaW1wb3J0IHsgVHJhY2VEYXRhUG9pbnRJbmZvIH0gZnJvbSBcIi4uLy4uL21vZGVscy9kaWFnbm9zdGljcy90cmFjZS90cmFjZURhdGFQb2ludEluZm9cIjtcclxuaW1wb3J0IHsgVmlld0Jhc2UgfSBmcm9tIFwiLi4vY29tbW9uL3ZpZXdCYXNlXCI7XHJcbmltcG9ydCB7IENoYXJ0RHJvcEhlbHBlckNoYW5nZWRIaW50IH0gZnJvbSBcIi4uL2NoYXJ0Vmlld1dpZGdldC9oZWxwZXJzL2NoYXJ0RHJvcEhlbHBlclwiO1xyXG5pbXBvcnQgeyBJbnNlcnRlZEluZm8gfSBmcm9tIFwiLi4vY2hhcnRWaWV3V2lkZ2V0L2luc2VydGVkSW5mb1wiO1xyXG5pbXBvcnQgeyBTY2FsZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL3NjYWxlXCI7XHJcbmltcG9ydCB7IENoYXJ0T2JqZWN0VHlwZSB9IGZyb20gXCIuLi9jaGFydFdpZGdldC9DaGFydEJhc2VcIjtcclxuaW1wb3J0IHsgU2VyaWVDaGFydFR5cGVIZWxwZXIgfSBmcm9tIFwiLi4vY29tbW9uL1NlcmllQ2hhcnRUeXBlSGVscGVyXCI7XHJcbmltcG9ydCB7IFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbiB9IGZyb20gXCIuLi8uLi9tb2RlbHMvc2lnbmFsTWFuYWdlckRhdGFNb2RlbC9zaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25cIjtcclxuaW1wb3J0IHsgU2lnbmFsQ2F0ZWdvcnkgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvc2lnbmFsQ2F0ZWdvcnlcIjtcclxuaW1wb3J0IHsgU2VyaWVHcm91cCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL3NpZ25hbC9zZXJpZUdyb3VwXCI7XHJcbmltcG9ydCB7IFNpZ25hbCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL3NpZ25hbC9zaWduYWxcIjtcclxuaW1wb3J0IHsgU2VyaWVzVHlwZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL3Nlcmllc1R5cGVcIjtcclxuaW1wb3J0IHsgQmFzZVNlcmllcyB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2Jhc2VTZXJpZXNcIjtcclxuaW1wb3J0IHsgRGVmYXVsdENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4vZGVmYXVsdENvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCAqIGFzIFdpZGdldHMgZnJvbSBcIi4uLy4uL3dpZGdldHMvd2lkZ2V0c1wiO1xyXG5pbXBvcnQgKiBhcyBEYXRhTW9kZWxzIGZyb20gJy4uLy4uL21vZGVscy9kYXRhTW9kZWxzJztcclxuaW1wb3J0IHsgU2VyaWVzSGVscGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJpZXNIZWxwZXJcIjtcclxuaW1wb3J0IHsgWFlDYWxjdWxhdG9yIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb21tb24vY2FsY3VsYXRvclByb3ZpZGVyL2NhbGN1bGF0b3JzL3h5Q2FsY3VsYXRvclwiO1xyXG5pbXBvcnQgeyBGZnRDYWxjdWxhdG9yIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb21tb24vY2FsY3VsYXRvclByb3ZpZGVyL2NhbGN1bGF0b3JzL2ZmdENhbGN1bGF0b3JcIjtcclxuXHJcbmNsYXNzIFRyYWNlVmlld1dpZGdldCBleHRlbmRzIFZpZXdCYXNlIHtcclxuXHJcbiAgICBwcml2YXRlIF9jaGFydE1hbmFnZXJEYXRhTW9kZWwhOiBEYXRhTW9kZWxzLklDaGFydE1hbmFnZXJEYXRhTW9kZWw7XHJcbiAgICBwcml2YXRlIF9jaGFydE1hbmFnZXJXaWRnZXQhOiBXaWRnZXRzLklDaGFydE1hbmFnZXJXaWRnZXQ7XHJcblxyXG4gICAgcHJpdmF0ZSBfc2lnbmFsTWFuYWdlckRhdGFNb2RlbCE6IERhdGFNb2RlbHMuSVNpZ25hbE1hbmFnZXJEYXRhTW9kZWw7XHJcbiAgICBwdWJsaWMgX3NpZ25hbE1hbmFnZXJXaWRnZXQ/OiBXaWRnZXRzLklTaWduYWxNYW5hZ2VyV2lkZ2V0O1xyXG5cclxuICAgIHByaXZhdGUgX3Nlcmllc1Byb3ZpZGVyOiBJU2VyaWVzUHJvdmlkZXJ8dW5kZWZpbmVkO1xyXG5cclxuICAgIHByaXZhdGUgX2NoYXJ0Vmlld1dpZGdldD86IFdpZGdldHMuSUNoYXJ0Vmlld1dpZGdldDtcclxuXHJcbiAgICBwcml2YXRlIF9hY3RpdmVDb21wb25lbnQhOiBQcm9wZXJ0eTxNYXBwQ29ja3BpdFRyYWNlQ29tcG9uZW50PjtcclxuICAgIHByaXZhdGUgX3RyYWNlQ29udHJvbFdpZGdldCE6IFdpZGdldHMuSVRyYWNlQ29udHJvbFdpZGdldDtcclxuXHJcbiAgICBwcml2YXRlIF9pc0xvYWRpbmdUcmFjZURhdGEgPSBmYWxzZTtcclxuXHJcbiAgICBwcml2YXRlIF90cmFjZURhdGFQb2ludEluZm9zOiBBcnJheTxUcmFjZURhdGFQb2ludEluZm8+IHwgdW5kZWZpbmVkO1xyXG5cclxuICAgIHByaXZhdGUgX3dpZGdldElzQWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAvLyBFdmVudCBoYW5kbGVyc1xyXG4gICAgcHJpdmF0ZSBfY29udGVudEFjdGl2YXRlZEhhbmRsZXIgPSAoc2VuZGVyLCBhcmdzKSA9PiB0aGlzLm9uQ29udGVudEFjdGl2YXRlZChzZW5kZXIsIGFyZ3MpO1xyXG5cclxuICAgIHByaXZhdGUgX2NoYXJ0Vmlld1dpZGdldERyb3BDaGFuZ2VkSGFuZGxlciA9IChzZW5kZXIsIGFyZ3MpID0+IHRoaXMub25Ecm9wQ2hhbmdlZChzZW5kZXIsIGFyZ3MpOyAgIFxyXG5cclxuICAgIHByaXZhdGUgX3NpZ25hbE1hbmFnZXJXaWRnZXRTZXJpZURvdWJsZUNsaWNrZWRIYW5kbGVyID0gKHNlbmRlciwgZGF0YSkgPT4gdGhpcy5vblNpZ25hbE1hbmFnZXJXaWRnZXRTZXJpZURvdWJsZUNsaWNrZWQoc2VuZGVyLCBkYXRhKTsgICAgIFxyXG4gICAgcHJpdmF0ZSBfc2lnbmFsTWFuYWdlcldpZGdldENoYW5nZVNpemVIYW5kbGVyID0gKHNlbmRlciwgZGF0YSkgPT4gdGhpcy5vblNpZ25hbE1hbmFnZXJXaWRnZXRDaGFuZ2VTaXplKHNlbmRlciwgZGF0YSk7ICAgICBcclxuICAgIHByaXZhdGUgX3NpZ25hbE1hbmFnZXJTaWduYWxSZW1vdmVkSGFuZGxlciA9IChzZW5kZXIsIGRhdGEpID0+IHRoaXMub25TaWduYWxNYW5hZ2VyU2lnbmFsUmVtb3ZlZChzZW5kZXIsIGRhdGEpOyAgICAgXHJcbiAgICBcclxuICAgIHByaXZhdGUgX2NoYXJ0TWFuYWdlcldpZGdldGRyb3BIZWxwZXJIYW5kbGVyID0gKHNlbmRlciwgYXJncykgPT4gdGhpcy5vbkRyb3BDaGFuZ2VkKHNlbmRlciwgYXJncyk7XHJcbiAgICBwcml2YXRlIF90cmFjZVN0YXRlOiBzdHJpbmc9XCJcIjtcclxuXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6ZSB0aGUgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxheW91dENvbnRhaW5lcklkXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQ6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRpYWxpemVDb21wb25lbnQoKXtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5kZWZhdWx0U2V0dGluZ3NEYXRhSWQgPSBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuV2lkZ2V0RGVmaW5pdGlvbklkO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmRpc2FibGVQZXJzaXN0aW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IGNvbXBvbmVudCBzZXR0aW5ncyBmb3IgdGhpcyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7KENvbXBvbmVudFNldHRpbmdzfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGdldERlZmF1bHRDb21wb25lbnRTZXR0aW5ncygpOiBDb21wb25lbnRTZXR0aW5nc3x1bmRlZmluZWR7XHJcbiAgICAgICAgcmV0dXJuIERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5nZXRUcmFjZVZpZXdEZWZpbml0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIHNvbWUgZGVmYXVsdCBwZXJzaXN0aW5nIGRhdGEgcGFja2FnZXMgaW4gdGhlIG1haW4gZGVmYXVsdCBwZXJzaXN0aW5nIGRhdGEgcHJvdmlkZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBhZGRBZGRpdGlvbmFsRGVmYXVsdENvbXBvbmVudFNldHRpbmdzKCl7XHJcbiAgICAgICAgLy8gU3BsaXR0ZXIgZGVmaW5pdGlvbnMgIFxyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmFkZERlZmF1bHRDb21wb25lbnRTZXR0aW5nc1RvUHJvdmlkZXIoRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLk1haW5TcGxpdHRlckRlZmluaXRpb25JZCwgRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLmdldE1haW5TcGxpdHRlckRlZmluaXRpb24oKSk7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuYWRkRGVmYXVsdENvbXBvbmVudFNldHRpbmdzVG9Qcm92aWRlcihEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuSW5uZXJTcGxpdHRlckRlZmluaXRpb25JZCwgRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLmdldElubmVyU3BsaXR0ZXJEZWZpbml0aW9uKCkpO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmFkZERlZmF1bHRDb21wb25lbnRTZXR0aW5nc1RvUHJvdmlkZXIoRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLlJpZ2h0U3BsaXR0ZXJEZWZpbml0aW9uSWQsIERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5nZXRSaWdodFNwbGl0dGVyRGVmaW5pdGlvbigpKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSB3aWRnZXQgY29udGVudCBhbmQgZXZlbnR1YWxseSBzdWJ3aWRnZXRzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBpbml0aWFsaXplZCgpIHtcclxuICAgICAgICBzdXBlci5pbml0aWFsaXplZCgpO1xyXG5cclxuICAgICAgICB0aGlzLmluaXRMYXlvdXRXaWRnZXQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRTZXJpZXNQcm92aWRlcigpO1xyXG4gICAgICAgIHRoaXMuc2V0VHJhY2VDb250cm9sV2lkZ2V0KCk7XHJcbiAgICAgICAgdGhpcy5zZXRJbm5lcldpZGdldHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0TGF5b3V0V2lkZ2V0KCkge1xyXG4gICAgICAgIHRoaXMuX2xheW91dFdpZGdldCA9IHRoaXMuY29tcG9uZW50LmdldFN1YkNvbXBvbmVudChEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuU3BsaXR0ZXJXaWRnZXRUcmFjZVZpZXdJZCkgYXMgSUxheW91dFdpZGdldDtcclxuICAgICAgICB0aGlzLmF0dGFjaExheW91dFRvVmlldyg8YW55PnRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQhLmluaXRpYWxpemUodGhpcy5wYXJlbnRDb250ZW50SWQpO1xyXG4gICAgICAgIHRoaXMuX2xheW91dFdpZGdldCEuZXZlbnRXaWRnZXRBY3RpdmF0ZWQuYXR0YWNoKHRoaXMuX2NvbnRlbnRBY3RpdmF0ZWRIYW5kbGVyKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBpbm5lciB3aWRnZXRzIChzaWduYWxtYW5hZ2VyLCBjaGFydCB2aWV3LCBjaGFydG1hbmFnZXIvY3Vyc29yaW5mbylcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldElubmVyV2lkZ2V0cygpIHtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIGxlZnQgd2lkZ2V0XHJcbiAgICAgICAgdGhpcy5zZXRTaWduYWxNYW5hZ2VyV2lkZ2V0KCk7XHJcbiAgICAgICAgdGhpcy5hdHRhY2hTaWduYWxNYW5hZ2VyV2lkZ2V0RXZlbnRzKCk7XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSB0aGUgbWlkZGxlIHdpZGdldFxyXG4gICAgICAgIHRoaXMuc2V0Q2hhcnRWaWV3V2lkZ2V0KCk7XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSB0aGUgd2lkZ2V0cyBvbiB0aGUgcmlnaHQgc2lkZVxyXG4gICAgICAgIHRoaXMuc2V0UmlnaHRXaWRnZXRzKCk7XHJcblxyXG4gICAgICAgIHRoaXMuYXR0YWNoU2lnbmFsTWFuYWdlckRhdGFNb2RlbEV2ZW50cygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgcmlnaHQgd2lkZ2V0cyAoY2hhcnRtYW5hZ2VyLCBjdXJzb3JpbmZvKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0UmlnaHRXaWRnZXRzKCkge1xyXG5cclxuICAgICAgICAvLyBTZXRzIHRoZSBjaGFydCBtYW5hZ2VyIHdpZGdldCBvbiB0b3BcclxuICAgICAgICB0aGlzLnNldENoYXJ0TWFuYWdlcldpZGdldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgc2VyaWVzUHJvdmlkZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZVZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRTZXJpZXNQcm92aWRlcigpIHtcclxuICAgICAgICB0aGlzLl9zZXJpZXNQcm92aWRlciA9IHRoaXMuY29tcG9uZW50LmdldFN1YkNvbXBvbmVudChEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuU2VyaWVzUHJvdmlkZXJJZCkgYXMgSVNlcmllc1Byb3ZpZGVyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgdHJhY2UgY29udHJvbCB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZVZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRUcmFjZUNvbnRyb2xXaWRnZXQoKSB7XHJcbiAgICAgICAgdGhpcy5fdHJhY2VDb250cm9sV2lkZ2V0ID0gdGhpcy5nZXRXaWRnZXRCeUlkKERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5UcmFjZUNvbnRyb2xXaWRnZXRJZCkgYXMgV2lkZ2V0cy5JVHJhY2VDb250cm9sV2lkZ2V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgc2lnbmFsIG1hbmFnZXIgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZVZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRTaWduYWxNYW5hZ2VyV2lkZ2V0KCkge1xyXG4gICAgICAgIHRoaXMuX3NpZ25hbE1hbmFnZXJXaWRnZXQgPSB0aGlzLmdldFdpZGdldEJ5SWQoRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLlNpZ25hbE1hbmFnZXJXaWRnZXRJZCkgYXMgV2lkZ2V0cy5JU2lnbmFsTWFuYWdlcldpZGdldDtcclxuICAgICAgICB0aGlzLl9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsID0gdGhpcy5fc2lnbmFsTWFuYWdlcldpZGdldC5kYXRhTW9kZWwgYXMgRGF0YU1vZGVscy5JU2lnbmFsTWFuYWdlckRhdGFNb2RlbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGNoYXJ0IHZpZXcgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZVZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRDaGFydFZpZXdXaWRnZXQoKSB7XHJcbiAgICAgICAgdGhpcy5fY2hhcnRWaWV3V2lkZ2V0ID0gdGhpcy5nZXRXaWRnZXRCeUlkKERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5DaGFydFZpZXdXaWRnZXRJZCkgYXMgV2lkZ2V0cy5JQ2hhcnRWaWV3V2lkZ2V0O1xyXG4gICAgICAgIHRoaXMuX2NoYXJ0Vmlld1dpZGdldC5ldmVudERyb3BIZWxwZXIuYXR0YWNoKHRoaXMuX2NoYXJ0Vmlld1dpZGdldERyb3BDaGFuZ2VkSGFuZGxlcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBjaGFydCBtYW5hZ2VyIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0Q2hhcnRNYW5hZ2VyV2lkZ2V0KCkge1xyXG4gICAgICAgIHRoaXMuX2NoYXJ0TWFuYWdlcldpZGdldCA9IHRoaXMuZ2V0V2lkZ2V0QnlJZChEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuQ2hhcnRNYW5hZ2VyV2lkZ2V0SWQpIGFzIFdpZGdldHMuSUNoYXJ0TWFuYWdlcldpZGdldDtcclxuICAgICAgICB0aGlzLl9jaGFydE1hbmFnZXJXaWRnZXQuZXZlbnREcm9wSGVscGVyLmF0dGFjaCh0aGlzLl9jaGFydE1hbmFnZXJXaWRnZXRkcm9wSGVscGVySGFuZGxlcik7XHJcblxyXG4gICAgICAgIHRoaXMuX2NoYXJ0TWFuYWdlckRhdGFNb2RlbCA9IHRoaXMuX2NoYXJ0TWFuYWdlcldpZGdldC5kYXRhTW9kZWwgYXMgRGF0YU1vZGVscy5JQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWN0aXZhdGUgdGhlIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZVZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgYWN0aXZhdGUoKSB7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0IS5hY3RpdmF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3Bvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5fd2lkZ2V0SXNBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQhLmRpc3Bvc2UoKTtcclxuXHJcbiAgICAgICAgLy8gRGV0YWNoIGV2ZW50c1xyXG4gICAgICAgIHRoaXMuZGV0YWNoRXZlbnRzKCk7XHJcblxyXG4gICAgICAgIC8vIERpc3Bvc2UgcHJvdmlkZXJcclxuICAgICAgICB0aGlzLmRpc3Bvc2VQcm92aWRlcnMoKTtcclxuXHJcbiAgICAgICAgLy8gRGlzcG9zZSBkYXRhbW9kZWxzXHJcbiAgICAgICAgdGhpcy5kaXNwb3NlRGF0YU1vZGVscygpO1xyXG5cclxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERldGFjaGVzIGFsbCBldmVudHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRldGFjaEV2ZW50cygpe1xyXG4gICAgICAgIHRoaXMuZGV0YWNoQ2hhcnRWaWV3V2lkZ2V0RXZlbnRzKCk7XHJcblxyXG4gICAgICAgIHRoaXMuZGV0YWNoU2lnbmFsTWFuYWdlcldpZGdldEV2ZW50cygpO1xyXG4gICAgICAgIHRoaXMuZGV0YWNoU2lnbmFsTWFuYWdlckRhdGFNb2RlbEV2ZW50cygpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuZGV0YWNoQ2hhcnRNYW5hZ2VyV2lkZ2V0RXZlbnRzKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0IS5ldmVudFdpZGdldEFjdGl2YXRlZC5kZXRhY2godGhpcy5fY29udGVudEFjdGl2YXRlZEhhbmRsZXIpOyAgXHJcbiAgICB9XHJcblxyXG4gICAgZGlzcG9zZVByb3ZpZGVycygpe1xyXG4gICAgICAgIGlmKHRoaXMuX3Nlcmllc1Byb3ZpZGVyICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IExhc3QgdXNlciBtdXN0IGRpc3Bvc2VcclxuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuY29tcG9uZW50RmFjdG9yeSEuZGlzcG9zZUNvbXBvbmVudChcIlNlcmllc1Byb3ZpZGVyXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc3Bvc2UgYWxsIGRhdGEgbW9kZWxzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZVZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkaXNwb3NlRGF0YU1vZGVscygpe1xyXG4gICAgICAgIC8vIFRPRE86IERpc3Bvc2UgZGF0YW1vZGVscyBjZW50cmFsXHJcbiAgICAgICAgaWYodGhpcy5fc2lnbmFsTWFuYWdlckRhdGFNb2RlbCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsLmRpc3Bvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IExhc3QgdXNlciBtdXN0IGRpc3Bvc2VcclxuICAgICAgICAgICAgLy8gVE9ETzogb25seSBuZWVkZWQgdG8gcmVtb3ZlIHNpbmdsZXRvbiBpbnN0YW5jZSBvZiBjaGFydG1hbmFnZXJEYXRhTW9kZWxcclxuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuY29tcG9uZW50RmFjdG9yeSEuZGlzcG9zZUNvbXBvbmVudChcIkNoYXJ0TWFuYWdlckRhdGFNb2RlbFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIHJlc2l6ZXMgdGhlIHRyYWNlIGNvbmZpZ3VyYXRpb24gd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHJlc2l6ZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX2FjdHVhbFdpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5fYWN0dWFsSGVpZ2h0ID0gaGVpZ2h0O1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fbGF5b3V0V2lkZ2V0ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQhLnJlc2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNvbnRlbnRBY3RpdmF0ZWQoc2VuZGVyLCBhcmdzKSB7XHJcbiAgICAgICAgYXJncy53aWRnZXQuYWN0aXZhdGUoKTtcclxuICAgICAgICB0aGlzLnJlc2l6ZSh0aGlzLl9hY3R1YWxXaWR0aCwgdGhpcy5fYWN0dWFsSGVpZ2h0KVxyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBkZXRhY2hDaGFydFZpZXdXaWRnZXRFdmVudHMoKXtcclxuICAgICAgICBpZih0aGlzLl9jaGFydFZpZXdXaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fY2hhcnRWaWV3V2lkZ2V0LmV2ZW50RHJvcEhlbHBlci5kZXRhY2godGhpcy5fY2hhcnRWaWV3V2lkZ2V0RHJvcENoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgd2hlbiBhIEQmRCBvcGVyYXRpb24gaGFzIGJlZW4gZG9uZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25Ecm9wQ2hhbmdlZChjaGFydE1hbmFnZXJEYXRhTW9kZWw6IERhdGFNb2RlbHMuSUNoYXJ0TWFuYWdlckRhdGFNb2RlbCwgYXJncykge1xyXG4gICAgICAgIHN3aXRjaCAoYXJncy5oaW50KSB7XHJcbiAgICAgICAgICAgIGNhc2UgQ2hhcnREcm9wSGVscGVyQ2hhbmdlZEhpbnQuY3JlYXRlQ2hhcnQ6IHtcclxuICAgICAgICAgICAgICAgIC8vY3JlYXRlcyBhIGNoYXJ0IGFuIGFkZHMgaXRzIHNlcmllc1xyXG4gICAgICAgICAgICAgICAgbGV0IGNoYXJ0TmFtZSA9IGNoYXJ0TWFuYWdlckRhdGFNb2RlbC5nZXRVbmlxdWVDaGFydE5hbWUoKTtcclxuICAgICAgICAgICAgICAgIGxldCBjaGFydE1hbmFnZXJDaGFydCA9IG5ldyBDaGFydE1hbmFnZXJDaGFydChjaGFydE5hbWUsIGFyZ3MuZGF0YS50eXBlKTtcclxuICAgICAgICAgICAgICAgIGNoYXJ0TWFuYWdlckNoYXJ0LmFkZERlZmF1bHRZU2NhbGUodGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsKTtcclxuICAgICAgICAgICAgICAgIGNoYXJ0TWFuYWdlckRhdGFNb2RlbC5hZGRDaGFydChjaGFydE1hbmFnZXJDaGFydCwgLTEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFyZ3MuZGF0YS5zZXJpZXMgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHlBeGlzSWQgPSBjaGFydE1hbmFnZXJDaGFydC5nZXREZWZhdWx0WUF4aXNJZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzZXJpZXMgPSBhcmdzLmRhdGEuc2VyaWVzIGFzIEJhc2VTZXJpZXNbXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXJncy5kYXRhLnR5cGUgIT0gQ2hhcnRUeXBlLllUQ2hhcnQgJiYgYXJncy5kYXRhLnNlcmllc1swXS50eXBlID09IFNlcmllc1R5cGUudGltZVNlcmllcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2lnbmFsTWFuYWdlcldpZGdldCEuc3VwcHJlc3NSZWZyZXNoKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXJncy5kYXRhLnR5cGUgPT0gQ2hhcnRUeXBlLlhZQ2hhcnQpIHsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJpZXMgPSBuZXcgQXJyYXk8QmFzZVNlcmllcz4oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB4eVNlcmllcyA9IHRoaXMuY3JlYXRlWFlTZXJpZShhcmdzLmRhdGEuc2VyaWVzWzBdLnBhcmVudCwgYXJncy5kYXRhLnNlcmllcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih4eVNlcmllcyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcmllcy5wdXNoKHh5U2VyaWVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChhcmdzLmRhdGEudHlwZSA9PSBDaGFydFR5cGUuRkZUQ2hhcnQpIHsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJpZXMgPSBuZXcgQXJyYXk8QmFzZVNlcmllcz4oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5kYXRhLnNlcmllcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZmdFNlcmllcyA9IHRoaXMuY3JlYXRlRkZUU2VyaWUoYXJncy5kYXRhLnNlcmllc1tpXS5wYXJlbnQsIGFyZ3MuZGF0YS5zZXJpZXNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGZmdFNlcmllcyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJpZXMucHVzaChmZnRTZXJpZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaWduYWxNYW5hZ2VyV2lkZ2V0IS5zdXBwcmVzc1JlZnJlc2goZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9zaWduYWxNYW5hZ2VyV2lkZ2V0IS5lZGl0TW9kZUFjdGl2ZSAmJiBhcmdzLmRhdGEudHlwZSA9PSBDaGFydFR5cGUuWFlDaGFydCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2lnbmFsTWFuYWdlcldpZGdldCEuYWN0aXZhdGVFZGl0TW9kZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL0FkZCBhbGwgZHJhZ2dlZCBzZXJpZXMgdG8gdGhlIGNoYXJ0LlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkU2VyaWVUb0NoYXJ0KGNoYXJ0TWFuYWdlckRhdGFNb2RlbCwgc2VyaWVzLCBjaGFydE1hbmFnZXJDaGFydCwgeUF4aXNJZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIENoYXJ0RHJvcEhlbHBlckNoYW5nZWRIaW50LmFkZFNlcmllOiB7IFxyXG4gICAgICAgICAgICAgICAgbGV0IHNlcmllczogQXJyYXk8QmFzZVNlcmllcz4gPSBhcmdzLmRhdGEuc2VyaWVzO1xyXG4gICAgICAgICAgICAgICAgbGV0IGNoYXJ0OiBJQ2hhcnRNYW5hZ2VyQ2hhcnQgfCB1bmRlZmluZWQgPSBhcmdzLmRhdGEuY2hhcnQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgeUF4aXM6IFNjYWxlID0gYXJncy5kYXRhLnlBeGlzO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoYXJ0ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGFyZ2V0IGNoYXJ0IG1heSBub3QgYmUgcHJvdmlkZWQgYnkgdGhlIGV2ZW50IGFyZ3NcclxuICAgICAgICAgICAgICAgICAgICBpZihhcmdzLmRhdGEudGFyZ2V0Q2hhcnQgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5fY2hhcnRWaWV3V2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzLmRhdGEudGFyZ2V0Q2hhcnQgPSB0aGlzLl9jaGFydFZpZXdXaWRnZXQuZ2V0VHJhY2VDaGFydEJ5TmFtZShjaGFydC5uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL2lmIHRhcmdldCBjaGFydCBzdGlsbCBkb2VzIG5vdCBleGlzdCBkb250IHRyeSB0byBhZGQgdGhlIHNlcmllcyB0byBhbnl0aGluZ1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGFyZ3MuZGF0YS50YXJnZXRDaGFydCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgeUF4aXNJZCA9IHRoaXMuZ2V0WUF4aXNJZChjaGFydE1hbmFnZXJEYXRhTW9kZWwsIGNoYXJ0LCB5QXhpcywgYXJncy5kYXRhLnRhcmdldENoYXJ0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pbnNlcnQgc2VyaWUgdG8gZW1wdHkgYSBjaGFydFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFNlcmllVG9DaGFydChjaGFydE1hbmFnZXJEYXRhTW9kZWwsIHNlcmllcywgY2hhcnQsIHlBeGlzSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjYXNlIENoYXJ0RHJvcEhlbHBlckNoYW5nZWRIaW50LmNyZWF0ZVhZU2VyaWU6IHsgXHJcbiAgICAgICAgICAgICAgICAvL0NyZWF0ZXMgWFkgc2VyaWUgYW5kIGFkZHMgaXQgdG8gdGhlIFhZIGNoYXJ0XHJcbiAgICAgICAgICAgICAgICBsZXQgY2hhcnRNYW5hZ2VyQ2hhcnQ6IElDaGFydE1hbmFnZXJDaGFydCA9IGFyZ3MuZGF0YS5jaGFydDtcclxuICAgICAgICAgICAgICAgIGxldCBzZXJpZXMgPSBuZXcgQXJyYXk8QmFzZVNlcmllcz4oKTtcclxuICAgICAgICAgICAgICAgIGxldCB4eVNlcmllcyA9IHRoaXMuY3JlYXRlWFlTZXJpZShhcmdzLmRhdGEuc2VyaWVzWzBdLnBhcmVudCwgYXJncy5kYXRhLnNlcmllcyk7XHJcbiAgICAgICAgICAgICAgICBpZih4eVNlcmllcyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHNlcmllcy5wdXNoKHh5U2VyaWVzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCB5QXhpc0lkID0gY2hhcnRNYW5hZ2VyQ2hhcnQuZ2V0RGVmYXVsdFlBeGlzSWQoKTtcclxuICAgICAgICAgICAgICAgIC8vQWRkIGFsbCBkcmFnZ2VkIHNlcmllcyB0byB0aGUgY2hhcnQuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFNlcmllVG9DaGFydChjaGFydE1hbmFnZXJEYXRhTW9kZWwsIHNlcmllcywgY2hhcnRNYW5hZ2VyQ2hhcnQsIHlBeGlzSWQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNhc2UgQ2hhcnREcm9wSGVscGVyQ2hhbmdlZEhpbnQuY3JlYXRlRkZUU2VyaWU6IHsgXHJcbiAgICAgICAgICAgICAgICAvL0NyZWF0ZXMgRkZUIHNlcmllIGFuZCBhZGQgaXQgdG8gdGhlIEZGVCBjaGFydFxyXG4gICAgICAgICAgICAgICAgbGV0IGNoYXJ0OiBJQ2hhcnRNYW5hZ2VyQ2hhcnQgPSBhcmdzLmRhdGEuY2hhcnQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2VyaWVzID0gbmV3IEFycmF5PEJhc2VTZXJpZXM+KCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MuZGF0YS5zZXJpZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmZnRTZXJpZXMgPSB0aGlzLmNyZWF0ZUZGVFNlcmllKGFyZ3MuZGF0YS5zZXJpZXNbaV0ucGFyZW50LCBhcmdzLmRhdGEuc2VyaWVzW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihmZnRTZXJpZXMgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VyaWVzLnB1c2goZmZ0U2VyaWVzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgeUF4aXM6IFNjYWxlID0gYXJncy5kYXRhLnlBeGlzO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvL3RhcmdldCBjaGFydCBtYXkgbm90IGJlIHByb3ZpZGVkIGJ5IHRoZSBldmVudCBhcmdzXHJcbiAgICAgICAgICAgICAgICBpZihhcmdzLmRhdGEudGFyZ2V0Q2hhcnQgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLl9jaGFydFZpZXdXaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5kYXRhLnRhcmdldENoYXJ0ID0gdGhpcy5fY2hhcnRWaWV3V2lkZ2V0LmdldFRyYWNlQ2hhcnRCeU5hbWUoY2hhcnQubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9pZiB0YXJnZXQgY2hhcnQgc3RpbGwgZG9lcyBub3QgZXhpc3QgZG9udCB0cnkgdG8gYWRkIHRoZSBzZXJpZXMgdG8gYW55dGhpbmdcclxuICAgICAgICAgICAgICAgIGlmKGFyZ3MuZGF0YS50YXJnZXRDaGFydCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB5QXhpc0lkID0gdGhpcy5nZXRZQXhpc0lkKGNoYXJ0TWFuYWdlckRhdGFNb2RlbCwgY2hhcnQsIHlBeGlzLCBhcmdzLmRhdGEudGFyZ2V0Q2hhcnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQWRkIGFsbCBkcmFnZ2VkIHNlcmllcyB0byB0aGUgY2hhcnQuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRTZXJpZVRvQ2hhcnQoY2hhcnRNYW5hZ2VyRGF0YU1vZGVsLCBzZXJpZXMsIGNoYXJ0LCB5QXhpc0lkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEF0dGFjaGVzIHRoZSBzaWduYWwgbWFuYWdlciB3aWRnZXQgZXZlbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZVZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhdHRhY2hTaWduYWxNYW5hZ2VyV2lkZ2V0RXZlbnRzKCkge1xyXG4gICAgICAgIGlmKHRoaXMuX3NpZ25hbE1hbmFnZXJXaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fc2lnbmFsTWFuYWdlcldpZGdldC5ldmVudFNlcmllRG91YmxlQ2xpY2tlZC5hdHRhY2godGhpcy5fc2lnbmFsTWFuYWdlcldpZGdldFNlcmllRG91YmxlQ2xpY2tlZEhhbmRsZXIpO1xyXG4gICAgICAgICAgICB0aGlzLl9zaWduYWxNYW5hZ2VyV2lkZ2V0LmV2ZW50Q2hhbmdlU2l6ZS5hdHRhY2godGhpcy5fc2lnbmFsTWFuYWdlcldpZGdldENoYW5nZVNpemVIYW5kbGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXRhY2hlcyB0aGUgc2lnbmFsIG1hbmFnZXIgd2lkZ2V0IGV2ZW50c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZGV0YWNoU2lnbmFsTWFuYWdlcldpZGdldEV2ZW50cygpIHtcclxuICAgICAgICBpZih0aGlzLl9zaWduYWxNYW5hZ2VyV2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX3NpZ25hbE1hbmFnZXJXaWRnZXQuZXZlbnRTZXJpZURvdWJsZUNsaWNrZWQuZGV0YWNoKHRoaXMuX3NpZ25hbE1hbmFnZXJXaWRnZXRTZXJpZURvdWJsZUNsaWNrZWRIYW5kbGVyKTtcclxuICAgICAgICAgICAgdGhpcy5fc2lnbmFsTWFuYWdlcldpZGdldC5ldmVudENoYW5nZVNpemUuZGV0YWNoKHRoaXMuX3NpZ25hbE1hbmFnZXJXaWRnZXRDaGFuZ2VTaXplSGFuZGxlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25TaWduYWxNYW5hZ2VyV2lkZ2V0U2VyaWVEb3VibGVDbGlja2VkKHNlbmRlciwgc2VyaWU6IEJhc2VTZXJpZXMpIHtcclxuICAgICAgICB0aGlzLmFkZE5ld0NoYXJ0KHRoaXMuX2NoYXJ0TWFuYWdlcldpZGdldC5kYXRhTW9kZWwgYXMgRGF0YU1vZGVscy5JQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsLCBzZXJpZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblNpZ25hbE1hbmFnZXJXaWRnZXRDaGFuZ2VTaXplKHNlbmRlciwgbmV3U2l6ZSkge1xyXG4gICAgICAgIC8vIGdldCBwYXJlbnQoc3BsaXR0ZXIpIHdpZGdldCBvZiBzZW5kZXIoc2lnbmFsTWFuYWdlcilcclxuICAgICAgICBsZXQgaW5uZXJMYXlvdXRTcGxpdHRlcldpZGdldCA9IHRoaXMuZ2V0V2lkZ2V0QnlJZChEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuU3BsaXR0ZXJXaWRnZXRNYWluVHJhY2VJZCkgYXMgV2lkZ2V0cy5JU3BsaXR0ZXJXaWRnZXQ7XHJcbiAgICAgICAgLy8gY2hhbmdlIHNpemUgb2Ygc3BsaXR0ZXIgcGFuZVxyXG4gICAgICAgIGlubmVyTGF5b3V0U3BsaXR0ZXJXaWRnZXQucmVzaXplV2lkZ2V0KHNlbmRlciwgbmV3U2l6ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgbmV3IGNoYXJ0IHRvIHRoZSBjaGFydG1hbmFnZXIgZGF0YW1vZGVsKGlmIHBvc3NpYmxlID0+IG1heCBjaGFydCBudW1iZXIpIGFuZCBhZGRzIHRoZSBnaXZlbiBzaWduYWwgdG8gdGhlIG5ldyBjaGFydFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNlcmllXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkTmV3Q2hhcnQoY2hhcnRNYW5hZ2VyRGF0YU1vZGVsOiBEYXRhTW9kZWxzLklDaGFydE1hbmFnZXJEYXRhTW9kZWwsIHNlcmllOiBCYXNlU2VyaWVzKSB7XHJcbiAgICAgICAgaWYgKGNoYXJ0TWFuYWdlckRhdGFNb2RlbCkge1xyXG4gICAgICAgICAgICB2YXIgbmV3Q2hhcnROYW1lID0gY2hhcnRNYW5hZ2VyRGF0YU1vZGVsLmdldFVuaXF1ZUNoYXJ0TmFtZSgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IHNlcmllQ2hhcnRUeXBlID0gU2VyaWVDaGFydFR5cGVIZWxwZXIuZ2V0U2VyaWVDaGFydFR5cGUoc2VyaWUudHlwZSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgbmV3Q2hhcnQgPSBuZXcgQ2hhcnRNYW5hZ2VyQ2hhcnQobmV3Q2hhcnROYW1lLCBzZXJpZUNoYXJ0VHlwZSk7XHJcbiAgICAgICAgICAgIG5ld0NoYXJ0LmFkZERlZmF1bHRZU2NhbGUodGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBpc0NoYXJ0QWRkZWQgPSBjaGFydE1hbmFnZXJEYXRhTW9kZWwuYWRkQ2hhcnQobmV3Q2hhcnQsIDApO1xyXG5cclxuICAgICAgICAgICAgaWYgKHNlcmllICE9IHVuZGVmaW5lZCAmJiBpc0NoYXJ0QWRkZWQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBzZXJpZXMgPSBuZXcgQXJyYXk8QmFzZVNlcmllcz4oKTtcclxuICAgICAgICAgICAgICAgIHNlcmllcy5wdXNoKHNlcmllKTtcclxuICAgICAgICAgICAgICAgIGxldCB5QXhpcyA9IG5ld0NoYXJ0LmdldFlTY2FsZShuZXdDaGFydC5nZXREZWZhdWx0WUF4aXNJZCgpKTtcclxuICAgICAgICAgICAgICAgIGlmICh5QXhpcyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFNlcmllVG9DaGFydChjaGFydE1hbmFnZXJEYXRhTW9kZWwsIHNlcmllcywgbmV3Q2hhcnQsIHlBeGlzLmlkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJEZWZhdWx0IHlBeGlzIG5vdCBhdmFpbGFibGUhXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIHNlcmllIHRvIGNoYXJ0IChvbmUgYnkgb25lKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PEJhc2VTZXJpZXM+fSBzZXJpZXNcclxuICAgICAqIEBwYXJhbSB7KElDaGFydE1hbmFnZXJDaGFydCB8IHVuZGVmaW5lZCl9IGNoYXJ0TWFuYWdlckNoYXJ0XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30geUF4aXNJZFxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZFNlcmllVG9DaGFydChjaGFydE1hbmFnZXJEYXRhTW9kZWw6IERhdGFNb2RlbHMuSUNoYXJ0TWFuYWdlckRhdGFNb2RlbCwgc2VyaWVzOiBBcnJheTxCYXNlU2VyaWVzPiwgY2hhcnRNYW5hZ2VyQ2hhcnQ6IElDaGFydE1hbmFnZXJDaGFydCB8IHVuZGVmaW5lZCwgeUF4aXNJZDogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHlBeGlzID0gY2hhcnRNYW5hZ2VyQ2hhcnQhLmdldFlTY2FsZSh5QXhpc0lkKTtcclxuICAgICAgICBsZXQgaW5zZXJ0ZWRJbmZvID0gbmV3IEluc2VydGVkSW5mbyhzZXJpZXMsIHlBeGlzLCBjaGFydE1hbmFnZXJDaGFydCEpO1xyXG4gICAgICAgIGlmIChpbnNlcnRlZEluZm8gIT0gdW5kZWZpbmVkICYmIGluc2VydGVkSW5mby55QXhpcyAhPSB1bmRlZmluZWQgJiYgaW5zZXJ0ZWRJbmZvLmNoYXJ0ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBjaGFydE1hbmFnZXJEYXRhTW9kZWwuYWRkU2VyaWVzVG9DaGFydChpbnNlcnRlZEluZm8uY2hhcnQsIGluc2VydGVkSW5mby5zZXJpZXMsIGluc2VydGVkSW5mby55QXhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3JlYXRlWFlTZXJpZShjb250YWluZXI6IElTZXJpZUNvbnRhaW5lciwgc2VyaWVzOiBBcnJheTxCYXNlU2VyaWVzPik6IEJhc2VTZXJpZXN8dW5kZWZpbmVkIHtcclxuICAgICAgaWYodGhpcy5fc2VyaWVzUHJvdmlkZXIgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgIH0gXHJcblxyXG4gICAgICAvLyBjcmVhdGUgY2FsY3VsYXRpb25cclxuXHQgIGxldCBjYWxjdWxhdGlvbiA9IG5ldyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb24oXCJDYWxjdWxhdGlvblwiLCB0aGlzLl9zZXJpZXNQcm92aWRlcik7XHJcbiAgICAgICAgXHJcblx0ICAvLyBhZGQgY2FsY3VsYXRpb24gdG8gY29udGFpbmVyXHJcblx0ICBjb250YWluZXIuYWRkU2VyaWVDb250YWluZXIoY2FsY3VsYXRpb24sIC0xKTtcclxuICAgICAgICBcclxuXHQgIC8vIHNldCBjYWxjdWxhdGlvbiB0eXBlXHJcblx0ICBjYWxjdWxhdGlvbi5zZXRDYWxjdWxhdG9yVHlwZUJ5SWQoWFlDYWxjdWxhdG9yLmlkKTtcclxuXHJcblx0ICAvLyBzZXQgY2FsY3VsYXRpb24gaW5wdXQgZGF0YVxyXG5cdCAgaWYoc2VyaWVzLmxlbmd0aCA+IDAgJiYgc2VyaWVzWzBdICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgY2FsY3VsYXRpb24uc2V0SW5wdXRWYWx1ZUJ5SWQoWFlDYWxjdWxhdG9yLmlucHV0SWRYU2lnbmFsLCBzZXJpZXNbMF0ubmFtZSk7XHJcbiAgICAgIH1cclxuICAgICAgXHJcblx0ICBpZihzZXJpZXMubGVuZ3RoID4gMSAmJiBzZXJpZXNbMV0gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgY2FsY3VsYXRpb24uc2V0SW5wdXRWYWx1ZUJ5SWQoWFlDYWxjdWxhdG9yLmlucHV0SWRZU2lnbmFsLCBzZXJpZXNbMV0ubmFtZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFJldHVybiBjYWxjdWxhdGlvbiBvdXRwdXQgZGF0YSBcclxuICAgICAgcmV0dXJuIGNhbGN1bGF0aW9uLmdldE91dHB1dENhbGN1bGF0aW9uRGF0YSgpWzBdLnNlcmllIGFzIEJhc2VTZXJpZXM7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIEZGVCBvdXRwdXQgc2VyaWVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtJU2VyaWVDb250YWluZXJ9IGNvbnRhaW5lclxyXG4gICAgICogQHBhcmFtIHtCYXNlU2VyaWVzfSBzZXJpZXNcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlRkZUU2VyaWUoY29udGFpbmVyOiBJU2VyaWVDb250YWluZXIsIHNlcmllczogQmFzZVNlcmllcyk6IEJhc2VTZXJpZXN8dW5kZWZpbmVkIHtcclxuICAgICAgICBpZih0aGlzLl9zZXJpZXNQcm92aWRlciA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH0gXHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSBjYWxjdWxhdGlvblxyXG4gICAgICAgIGxldCBjYWxjdWxhdGlvbiA9IG5ldyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb24oXCJDYWxjdWxhdGlvblwiLCB0aGlzLl9zZXJpZXNQcm92aWRlcik7XHJcblxyXG4gICAgICAgIC8vIGFkZCBjYWxjdWxhdGlvbiB0byBjb250YWluZXJcclxuICAgICAgICBjb250YWluZXIuYWRkU2VyaWVDb250YWluZXIoY2FsY3VsYXRpb24sIC0xKTtcclxuXHJcbiAgICAgICAgLy8gc2V0IGNhbGN1bGF0aW9uIHR5cGVcclxuICAgICAgICBjYWxjdWxhdGlvbi5zZXRDYWxjdWxhdG9yVHlwZUJ5SWQoRmZ0Q2FsY3VsYXRvci5pZCk7XHJcblxyXG4gICAgICAgIC8vIHNldCBjYWxjdWxhdGlvbiBpbnB1dCBkYXRhXHJcbiAgICAgICAgY2FsY3VsYXRpb24uc2V0SW5wdXRWYWx1ZUJ5SWQoRmZ0Q2FsY3VsYXRvci5pbnB1dElkU2lnbmFsLCBzZXJpZXMubmFtZSk7XHJcblxyXG4gICAgICAgIC8vIENoYW5nZSBvdXRwdXQgZGF0YSBuYW1lIGFuZCBjb2xvciBvZiBuZXcgRkZUIGNhbGN1bGF0aW9uXHJcbiAgICAgICAgbGV0IGlucHV0RGF0YSA9IGNhbGN1bGF0aW9uLmdldElucHV0Q2FsY3VsYXRpb25EYXRhKCk7XHJcbiAgICAgICAgbGV0IG91dHB1dERhdGEgPSBjYWxjdWxhdGlvbi5nZXRPdXRwdXRDYWxjdWxhdGlvbkRhdGEoKTtcclxuICAgICAgICBpZihpbnB1dERhdGFbMF0uc2VyaWUgIT0gdW5kZWZpbmVkICYmIGlucHV0RGF0YVswXS5zZXJpZS5yYXdQb2ludHNWYWxpZCkge1xyXG4gICAgICAgICAgICBsZXQgb3V0cHV0RGF0YSA9IGNhbGN1bGF0aW9uLmdldE91dHB1dENhbGN1bGF0aW9uRGF0YSgpO1xyXG4gICAgICAgICAgICBpZihvdXRwdXREYXRhLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBvdXRwdXREYXRhWzBdLmNvbG9yID0gaW5wdXREYXRhWzBdLnNlcmllLmNvbG9yO1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0RGF0YVswXS52YWx1ZSA9ICdGRlQoJyArIGlucHV0RGF0YVswXS5zZXJpZS5uYW1lICsgJykgJyArIGNhbGN1bGF0aW9uLnNlcmllIS5jYWxjdWxhdGlvbkRhdGFJbmZvIS51bmlxdWVJZDsgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZXR1cm4gY2FsY3VsYXRpb24gb3V0cHV0IGRhdGEgXHJcbiAgICAgICAgcmV0dXJuIG91dHB1dERhdGFbMF0uc2VyaWUgYXMgQmFzZVNlcmllcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SUNoYXJ0TWFuYWdlckRhdGFNb2RlbH0gY2hhcnRNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICAgKiBAcGFyYW0ge0lDaGFydE1hbmFnZXJDaGFydH0gY2hhcnRcclxuICAgICAqIEBwYXJhbSB7KFNjYWxlIHwgdW5kZWZpbmVkKX0geUF4aXNcclxuICAgICAqIEBwYXJhbSB7KElUcmFjZUNoYXJ0IHwgdW5kZWZpbmVkKX0gdGFyZ2V0Q2hhcnRcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0WUF4aXNJZChjaGFydE1hbmFnZXJEYXRhTW9kZWw6IERhdGFNb2RlbHMuSUNoYXJ0TWFuYWdlckRhdGFNb2RlbCwgY2hhcnQ6IElDaGFydE1hbmFnZXJDaGFydCwgeUF4aXM6IFNjYWxlIHwgdW5kZWZpbmVkLCB0YXJnZXRDaGFydDogSVRyYWNlQ2hhcnQgfCB1bmRlZmluZWQpOiBzdHJpbmcge1xyXG4gICAgICAgbGV0IHlBeGlzSWQ6IHN0cmluZztcclxuICAgICAgICBpZiAoeUF4aXMgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGNoYXJ0ID0geUF4aXMucGFyZW50O1xyXG4gICAgICAgICAgICB5QXhpc0lkID0geUF4aXMuaWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB5QXhpc0lkID0gdGhpcy5nZXRZU2NhbGVJZChjaGFydE1hbmFnZXJEYXRhTW9kZWwsIGNoYXJ0LCB0YXJnZXRDaGFydCk7XHJcbiAgICAgICAgICAgIGlmKHlBeGlzSWQgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBuZXcgc2NhbGVcclxuICAgICAgICAgICAgICAgIHlBeGlzSWQgPSBjaGFydC5nZXROZXh0WUF4aXNJZCgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld1lBeGlzID0gbmV3IFNjYWxlKHlBeGlzSWQsIGNoYXJ0KTtcclxuICAgICAgICAgICAgICAgIGNoYXJ0TWFuYWdlckRhdGFNb2RlbC5hZGRZU2NhbGUoY2hhcnQsIG5ld1lBeGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4geUF4aXNJZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybiB5QXhpcyBpZCB3aGVuIHNlcmllIGlzIGRyb3BwZWQgaW4gdGhlIGNoYXJ0IHZpZXdcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtEYXRhTW9kZWxzLklDaGFydE1hbmFnZXJEYXRhTW9kZWx9IGNoYXJ0TWFuYWdlckRhdGFNb2RlbFxyXG4gICAgICogQHBhcmFtIHtJQ2hhcnRNYW5hZ2VyQ2hhcnR9IGNoYXJ0TWFuYWdlckNoYXJ0XHJcbiAgICAgKiBAcGFyYW0geyp9IHRhcmdldENoYXJ0XHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFlTY2FsZUlkKGNoYXJ0TWFuYWdlckRhdGFNb2RlbDogRGF0YU1vZGVscy5JQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsLCBjaGFydE1hbmFnZXJDaGFydDogSUNoYXJ0TWFuYWdlckNoYXJ0LCB0YXJnZXRDaGFydCk6IHN0cmluZ3tcclxuICAgICAgICBsZXQgeUF4aXNJZDtcclxuICAgICAgICBpZiAoY2hhcnRNYW5hZ2VyQ2hhcnQuY2hhcnRUeXBlID09IENoYXJ0VHlwZS5YWUNoYXJ0KSB7XHJcbiAgICAgICAgICAgIHlBeGlzSWQgPSBjaGFydE1hbmFnZXJDaGFydC5nZXREZWZhdWx0WUF4aXNJZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy9hZGRpbmcgc2VyaWVzIHRvIFlUIGNoYXJ0c1xyXG4gICAgICAgICAgICBsZXQgb2JqZWN0VW5kZXJNb3VzZSA9IHRhcmdldENoYXJ0LmdldENoYXJ0T2JqZWN0VW5kZXJNb3VzZSh0YXJnZXRDaGFydC5jaGFydEluc3RhbmNlLm1vdXNlbW92ZVgsIHRhcmdldENoYXJ0LmNoYXJ0SW5zdGFuY2UubW91c2Vtb3ZlWSk7XHJcbiAgICAgICAgICAgIGlmIChvYmplY3RVbmRlck1vdXNlLmNoYXJ0T2JqZWN0VHlwZSA9PSBDaGFydE9iamVjdFR5cGUuYXhpcykgeyBcclxuICAgICAgICAgICAgICAgIC8vIGdldCBheGlzIGlkXHJcbiAgICAgICAgICAgICAgICB5QXhpc0lkID0gb2JqZWN0VW5kZXJNb3VzZS5hcmdzLmF4aXMuZ2V0QXhpc0lEKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAob2JqZWN0VW5kZXJNb3VzZS5jaGFydE9iamVjdFR5cGUgPT0gQ2hhcnRPYmplY3RUeXBlLmNoYXJ0U3BhY2UpIHsgXHJcbiAgICAgICAgICAgICAgICAvLyBjcmVhdGUgbmV3IGF4aXNcclxuICAgICAgICAgICAgICAgIHlBeGlzSWQgPSBjaGFydE1hbmFnZXJDaGFydC5nZXROZXh0WUF4aXNJZCgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld1lBeGlzID0gbmV3IFNjYWxlKHlBeGlzSWQsIGNoYXJ0TWFuYWdlckNoYXJ0KTtcclxuICAgICAgICAgICAgICAgIGNoYXJ0TWFuYWdlckRhdGFNb2RlbC5hZGRZU2NhbGUoY2hhcnRNYW5hZ2VyQ2hhcnQsIG5ld1lBeGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4geUF4aXNJZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEF0dGFjaGVzIHRoZSBzaWduYWwgbWFuYWdlciBkYXRhbW9kZWwgZXZlbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZVZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhdHRhY2hTaWduYWxNYW5hZ2VyRGF0YU1vZGVsRXZlbnRzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwuZXZlbnRTaWduYWxSZW1vdmVkLmF0dGFjaCh0aGlzLl9zaWduYWxNYW5hZ2VyU2lnbmFsUmVtb3ZlZEhhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERldGFjaGVzIHRoZSBzaWduYWwgbWFuYWdlciBkYXRhbW9kZWwgZXZlbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZVZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkZXRhY2hTaWduYWxNYW5hZ2VyRGF0YU1vZGVsRXZlbnRzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwuZXZlbnRTaWduYWxSZW1vdmVkLmRldGFjaCh0aGlzLl9zaWduYWxNYW5hZ2VyU2lnbmFsUmVtb3ZlZEhhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uU2lnbmFsTWFuYWdlclNpZ25hbFJlbW92ZWQoc2VuZGVyLCBzZXJpZSkge1xyXG4gICAgICAgIGlmICh0aGlzLl9jaGFydE1hbmFnZXJEYXRhTW9kZWwpIHtcclxuICAgICAgICAgICAgdGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsLnJlbW92ZVNlcmllRnJvbUFsbENoYXJ0cyhzZXJpZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGV0YWNoZXMgdGhlIGNoYXJ0IG1hbmFnZXIgd2lkZ2V0IGV2ZW50c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZGV0YWNoQ2hhcnRNYW5hZ2VyV2lkZ2V0RXZlbnRzKCkge1xyXG4gICAgICAgIHRoaXMuX2NoYXJ0TWFuYWdlcldpZGdldC5ldmVudERyb3BIZWxwZXIuZGV0YWNoKHRoaXMuX2NoYXJ0TWFuYWdlcldpZGdldGRyb3BIZWxwZXJIYW5kbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGFjdGl2ZUNvbXBvbmVudChhY3RpdmVDb21wb25lbnQ6IFByb3BlcnR5PE1hcHBDb2NrcGl0VHJhY2VDb21wb25lbnQ+KSB7XHJcbiAgICAgICAgdGhpcy5fYWN0aXZlQ29tcG9uZW50ID0gYWN0aXZlQ29tcG9uZW50O1xyXG4gICAgICAgIHRoaXMuX2FjdGl2ZUNvbXBvbmVudC52YWx1ZS5pbml0aWFsaXplKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2FjdGl2ZUNvbXBvbmVudC5jaGFuZ2VkKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBjdXJyZW50QWN0aXZlQ29tcG9uZW50ID0gdGhpcy5fYWN0aXZlQ29tcG9uZW50LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRBY3RpdmVDb21wb25lbnQudHJhY2VDb250cm9sSW50ZXJmYWNlICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJhY2VDb250cm9sSW50ZXJmYWNlID0gY3VycmVudEFjdGl2ZUNvbXBvbmVudC50cmFjZUNvbnRyb2xJbnRlcmZhY2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudEFjdGl2ZUNvbXBvbmVudC50cmFjZVBhcmFtZXRlcnMgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFjZVBhcmFtZXRlcnNJbnRlcmZhY2UgPSBjdXJyZW50QWN0aXZlQ29tcG9uZW50LnRyYWNlUGFyYW1ldGVycztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCB0cmFjZVBhcmFtZXRlcnNJbnRlcmZhY2UodHJhY2VQYXJhbWV0ZXJJbnRlcmZhY2U6IFByb3BlcnR5PElUcmFjZUNvbXBvbmVudFBhcmFtZXRlcnM+KSB7XHJcbiAgICAgICAgdHJhY2VQYXJhbWV0ZXJJbnRlcmZhY2UuY2hhbmdlZCgodHJhY2VQYXJhbWV0ZXJJbnRlcmZhY2UpID0+IHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXZhaWxhYmxlRGF0YVBvaW50cyA9IHRyYWNlUGFyYW1ldGVySW50ZXJmYWNlLmF2YWlsYWJsZVRyYWNlRGF0YVBvaW50cztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcblx0ICogU2V0cyB0aGUgYXZhaWxhYmxlIHRyYWNlIGRhdGFwb2ludHMgdG8gdGhlIHRyYWNlIHZpZXcgd2lkZ2V0XHJcblx0ICpcclxuXHQgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcblx0ICovXHJcbiAgICBwdWJsaWMgc2V0IGF2YWlsYWJsZURhdGFQb2ludHMoYXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzOiBQcm9wZXJ0eTxUcmFjZURhdGFQb2ludEluZm9bXT4pIHtcclxuICAgICAgICBhdmFpbGFibGVUcmFjZURhdGFQb2ludHMuY2hhbmdlZCgoZGF0YVBvaW50cykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl90cmFjZURhdGFQb2ludEluZm9zID0gZGF0YVBvaW50cztcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG5cdCAqIFNldHMgYW5kIGRlZmluZXMgdGhlIGludGVyZmFjZSB0byB0aGUgdHJhY2UgY29udHJvbFxyXG5cdCAqXHJcblx0ICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG5cdCAqL1xyXG4gICAgcHVibGljIHNldCB0cmFjZUNvbnRyb2xJbnRlcmZhY2UodHJhY2VDb21wb25lbnRDb250cm9sOiBJVHJhY2VDb21wb25lbnRDb250cm9sKSB7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0VHJhY2VDb250cm9sV2lkZ2V0KHRyYWNlQ29tcG9uZW50Q29udHJvbCk7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0VHJhY2VWaWV3V2lkZ2V0VG9UcmFjZVN0YXRlKCk7XHJcbiAgICB9XHJcblxyXG5cdC8qKlxyXG4gICAgICogU3RhcnQgbG9hZGluZyB0cmFjZSBkYXRhIGZyb20gdGFyZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbG9hZFRyYWNlRGF0YUZyb21UYXJnZXQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2lzTG9hZGluZ1RyYWNlRGF0YSA9PSB0cnVlIHx8IHRoaXMuX3dpZGdldElzQWN0aXZlID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2lzTG9hZGluZ1RyYWNlRGF0YSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fdHJhY2VDb250cm9sV2lkZ2V0LnNldEJ1c3lJbmZvcm1hdGlvbihuZXcgQnVzeUluZm9ybWF0aW9uKFwiTG9hZGluZyB0cmFjZSBkYXRhXCIsIEltYWdlSWQuZGVmYXVsdEltYWdlLCAyNSwgZmFsc2UpKTtcclxuICAgICAgICB0aGlzLl90cmFjZUNvbnRyb2xXaWRnZXQuc2V0QnVzeSh0cnVlKTtcclxuXHJcbiAgICAgICAgLy8gaW52b2tlIGxvYWRpbmcgdHJhY2UgZGF0YVxyXG4gICAgICAgIHRoaXMuaW52b2tlTG9hZFRyYWNlRGF0YSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW52b2tlTG9hZFRyYWNlRGF0YSgpIHtcclxuICAgICAgICAvLyBCSU5ESU5HU09VUkNFOiBtZXRob2QgZm9yIGRpc3BhdGNoaW5nIHRoZSBjYWxsIHRvIGEgYm91bmQgdGFyZ2V0XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbmZvcm1hdGlvbnMgaWYgbG9hZGluZyBvZiB0cmFjZSBkYXRhIGZyb20gdGFyZ2V0IGZhaWxlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGVycm9yRGF0YVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uRXJyb3JMb2FkaW5nVHJhY2VEYXRhKGVycm9yRGF0YSkge1xyXG4gICAgICAgIHRoaXMuX2lzTG9hZGluZ1RyYWNlRGF0YSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3RyYWNlQ29udHJvbFdpZGdldC5zZXRCdXN5KGZhbHNlKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBoYW5kbGVzIHRyYWNlIHN0YXRlIGNoYW5nZXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IHRyYWNlU3RhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZVZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvblRyYWNlU3RhdGVDaGFuZ2VkKHRyYWNlU3RhdGU6IHN0cmluZyxvbGRUcmFjZVN0YXRlKSB7XHJcbiAgICAgICAgdGhpcy5fdHJhY2VTdGF0ZSA9IHRyYWNlU3RhdGU7XHJcbiAgICAgICAgaWYgKHRyYWNlU3RhdGUgPT0gVHJhY2VTdGF0ZUlkcy5EYXRhX2F2YWlsYWJsZSAmJiBvbGRUcmFjZVN0YXRlICE9IFRyYWNlU3RhdGVJZHMuRGF0YV9hdmFpbGFibGUpIHtcclxuICAgICAgICAgICAgLy8gQXV0byB1cGxvYWQgb2YgdHJhY2UgZGF0YVxyXG4gICAgICAgICAgICB0aGlzLmxvYWRUcmFjZURhdGFGcm9tVGFyZ2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5mb3JtYXRpb25zKHRyYWNlZGF0YSkgZnJvbSB0YXJnZXQgYWZ0ZXIgc3VjY2Vzc2Z1bCB0cmFjZSBkYXRhIHVwbG9hZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHJlc3VsdFxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uVHJhY2VEYXRhTG9hZGVkKHJlc3VsdCkge1xyXG4gICAgICAgIHZhciB0cmFjZURhdGEgPSByZXN1bHQgYXMgVHJhY2VEYXRhO1xyXG4gICAgICAgIGxldCBhZGRUcmFjZURhdGFUb1NpZ25hbE1hbmFnZXIgPSB0cnVlO1xyXG4gICAgICAgIC8vIGNoZWNrIGlmIGRhdGEgYWxyZWFkeSBpbiBzaWduYWxtYW5hZ2VyIGRhdGFtb2RlbFxyXG4gICAgICAgIGlmICh0cmFjZURhdGEudHJhY2VDaGFubmVscy5sZW5ndGggPiAwICYmIHRyYWNlRGF0YS50cmFjZUNoYW5uZWxzWzBdIS50cmFjZVBvaW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHZhciBzZXJpZUdyb3VwTmFtZSA9IERhdGVUaW1lSGVscGVyLmdldERhdGVUaW1lKHRyYWNlRGF0YS50cmlnZ2VyVGltZSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZih0aGlzLl9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLl9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsW1wiZGlzcG9zZWRcIl0gIT0gdHJ1ZSl7Ly8gQnVnZml4IHRvIGF2b2lkIHVzZSBvZiBub3QgdW5iaW5kZWQgZGF0YW1vZGVsXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxhdGVzdENhdGVnb3J5ID0gdGhpcy5fc2lnbmFsTWFuYWdlckRhdGFNb2RlbC5nZXRTaWduYWxDYXRlZ29yeShTaWduYWxDYXRlZ29yeS5DYXRlZ29yeUlkUmVjZW50KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobGF0ZXN0Q2F0ZWdvcnkgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZXJpZUNvbnRhaW5lciA9IGxhdGVzdENhdGVnb3J5LmdldFNlcmllQ29udGFpbmVyKHNlcmllR3JvdXBOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlcmllQ29udGFpbmVyICE9IHVuZGVmaW5lZCkgeyAvLyBzaWduYWwgY29udGFpbmVyIGFscmVhZHkgZXhpc3RzOyBuZWVkZWQgdG8gYXZvaWQgZHVwbGljYXRlZCBzaWduYWwgY29udGFpbmVycyBpZiBldmVudCBjb21lcyBtdWx0aXBsZSB0aW1lc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkVHJhY2VEYXRhVG9TaWduYWxNYW5hZ2VyID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJzaWduYWxNYW5hZ2VyRGF0YU1vZGVsIG5vdCBhdmFpbGFibGVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhZGRUcmFjZURhdGFUb1NpZ25hbE1hbmFnZXIgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBpZiAodHJhY2VEYXRhLnRyYWNlQ2hhbm5lbHMubGVuZ3RoID4gMCAmJiB0cmFjZURhdGEudHJhY2VDaGFubmVsc1swXSEudHJhY2VQb2ludHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRUcmFjZURhdGFUb1NpZ25hbE1hbmFnZXIodHJhY2VEYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9pc0xvYWRpbmdUcmFjZURhdGEgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl90cmFjZUNvbnRyb2xXaWRnZXQuc2V0QnVzeShmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIHRoZSBnaXZlbiB0cmFjZSBkYXRhIHRvIHRoZSBzaWduYWwgbWFuYWdlclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHRyYWNlRGF0YVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZFRyYWNlRGF0YVRvU2lnbmFsTWFuYWdlcih0cmFjZURhdGEpIHtcclxuICAgICAgICB2YXIgbmV3U2VyaWVHcm91cCA9IG5ldyBTZXJpZUdyb3VwKERhdGVUaW1lSGVscGVyLmdldERhdGVUaW1lKHRyYWNlRGF0YS50cmlnZ2VyVGltZSksIHRyYWNlRGF0YS50cmlnZ2VyVGltZSk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0cmFjZURhdGEudHJhY2VDaGFubmVscy5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBuZXcgQXJyYXk8SVBvaW50PigpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRyYWNlRGF0YS50cmFjZUNoYW5uZWxzW2ldLnRyYWNlUG9pbnRzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgeFZhbDogbnVtYmVyID0gKHRyYWNlRGF0YS50cmFjZUNoYW5uZWxzW2ldLnRyYWNlUG9pbnRzW2pdLnRpbWVTdGFtcCAtIHRyYWNlRGF0YS50cmlnZ2VyVGltZSkgLyAxMDAwMDAwO1xyXG4gICAgICAgICAgICAgICAgdmFyIHlWYWw6IG51bWJlciA9IHRyYWNlRGF0YS50cmFjZUNoYW5uZWxzW2ldLnRyYWNlUG9pbnRzW2pdLmRhdGFWYWx1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBkYXRhLnB1c2gobmV3IFBvaW50KHhWYWwsIHlWYWwpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgbmV3U2lnbmFsID0gbmV3IFNpZ25hbCh0cmFjZURhdGEudHJhY2VDaGFubmVsc1tpXS5uYW1lLCBkYXRhKTtcclxuICAgICAgICAgICAgaWYodGhpcy5fc2VyaWVzUHJvdmlkZXIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGxldCBzZXR0aW5ncyA9IFNlcmllc0hlbHBlci5jcmVhdGVTZXJpZVNldHRpbmdzKG5ld1NpZ25hbCwgbmV3U2lnbmFsLm5hbWUsIENvbG9ySGVscGVyLmdldENvbG9yKCksIHRoaXMuX3Nlcmllc1Byb3ZpZGVyLmdldFVuaXF1ZUlkKCksIFNlcmllc1R5cGUudGltZVNlcmllcyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3U2VyaWUgPSB0aGlzLl9zZXJpZXNQcm92aWRlci5jcmVhdGVTZXJpZShzZXR0aW5ncyk7XHJcbiAgICAgICAgICAgICAgICBpZihuZXdTZXJpZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl90cmFjZURhdGFQb2ludEluZm9zICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdHJhY2VQb2ludEluZm9zID0gdGhpcy5fdHJhY2VEYXRhUG9pbnRJbmZvcy5maWx0ZXIoZWxlbWVudCA9PiBlbGVtZW50LmZ1bGxuYW1lID09IG5ld1NpZ25hbC5uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRyYWNlUG9pbnRJbmZvcy5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3U2VyaWUubmFtZSA9IHRyYWNlUG9pbnRJbmZvc1swXS5jb21wb25lbnROYW1lICsgXCI6XCIgKyB0cmFjZVBvaW50SW5mb3NbMF0ubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1NlcmllLmRlc2NyaXB0aW9uID0gdHJhY2VQb2ludEluZm9zWzBdLmRlc2NyaXB0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIG5ld1NlcmllR3JvdXAuYWRkU2VyaWUobmV3U2VyaWUhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkNyZWF0aW9uIG9mIHRoZSBzZXJpZSB3YXMgbm90IHBvc3NpYmxlIVwiKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiU2VyaWVzUHJvdmlkZXIgbm90IGF2YWlsYWJsZSFcIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsLmFkZFVwbG9hZGVkU2VyaWVHcm91cChuZXdTZXJpZUdyb3VwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICAgQ29ubmVjdHMgdGhlIHRyYWNlIGNvbnRyb2wgd2lkZ2V0IHRvIHRoZSB0cmFjZSBjb250cm9sIHByb3ZpZGVyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJVHJhY2VDb21wb25lbnRDb250cm9sfSB0cmFjZUNvbXBvbmVudENvbnRyb2xcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbm5lY3RUcmFjZUNvbnRyb2xXaWRnZXQodHJhY2VDb21wb25lbnRDb250cm9sOiBJVHJhY2VDb21wb25lbnRDb250cm9sKTogYW55IHtcclxuICAgICAgICBpZiAodGhpcy5fdHJhY2VDb250cm9sV2lkZ2V0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RyYWNlQ29udHJvbFdpZGdldC50cmFjZUNvbnRyb2xJbnRlcmZhY2UgPSB0aGlzLmdldEludGVyZmFjZVdpdGhvdXRTYXZlQ29tbWFuZCh0cmFjZUNvbXBvbmVudENvbnRyb2wpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRyYWNlIGNvbXBvbmVudCBjb250cm9sIHdpdGggb3V0IHRoZSBzYXZlL2ltcG9ydC9leHBvcnQgdHJhY2UgY29uZmlndXJhdGlvbiBjb21tYW5kXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SVRyYWNlQ29tcG9uZW50Q29udHJvbH0gdHJhY2VDb21wb25lbnRDb250cm9sXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZVZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRJbnRlcmZhY2VXaXRob3V0U2F2ZUNvbW1hbmQodHJhY2VDb21wb25lbnRDb250cm9sOiBJVHJhY2VDb21wb25lbnRDb250cm9sKTogYW55IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjb21tYW5kRm9yY2VTdGFydDogdHJhY2VDb21wb25lbnRDb250cm9sLmNvbW1hbmRGb3JjZVN0YXJ0LFxyXG4gICAgICAgICAgICBjb21tYW5kRm9yY2VTdG9wOiB0cmFjZUNvbXBvbmVudENvbnRyb2wuY29tbWFuZEZvcmNlU3RvcCxcclxuICAgICAgICAgICAgdHJhY2VTdGF0ZTogdHJhY2VDb21wb25lbnRDb250cm9sLnRyYWNlU3RhdGUsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICAgQ29ubmVjdHMgdGhlIFRyYWNlVmlld1dpZGdldCB0byB0aGUgdHJhY2UgY29udHJvbCBwcm92aWRlcih0cmFjZSBzdGF0ZSlcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZVZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb25uZWN0VHJhY2VWaWV3V2lkZ2V0VG9UcmFjZVN0YXRlKCk6IGFueSB7XHJcbiAgICAgICAgdGhpcy5faXNMb2FkaW5nVHJhY2VEYXRhID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8vIGxvYWQgdHJhY2UgZGF0YSBpbml0aWFsbHkgaWYgYXZhaWxhYmxlXHJcbiAgICAgICAgaWYgKHRoaXMuX3RyYWNlU3RhdGUgPT0gVHJhY2VTdGF0ZUlkcy5EYXRhX2F2YWlsYWJsZSkge1xyXG4gICAgICAgICAgICAvLyBJbml0aWFsIGxvYWQgdHJhY2UgZGF0YVxyXG4gICAgICAgICAgICB0aGlzLmxvYWRUcmFjZURhdGFGcm9tVGFyZ2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBUcmFjZVZpZXdXaWRnZXQgfTsiXX0=