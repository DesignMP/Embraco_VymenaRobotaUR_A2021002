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
define(["require", "exports", "./chartViewChartManager", "../chartViewWidget/chartViewLayoutManager", "../common/widgetBase", "../../framework/events", "../chartWidget/userInteraction/userInteractionController", "../chartWidget/userInteraction/commands/setCursorCommand", "../chartWidget/userInteraction/commands/resetZoomCommand", "../chartWidget/ChartBase", "../chartWidget/userInteraction/commands/cursorHoveringCommand", "../chartWidget/userInteraction/commands/dragCursorCommand", "../chartWidget/userInteraction/commands/endCursorDragCommand", "../chartWidget/userInteraction/commands/panChartCommand", "../chartWidget/userInteraction/commands/toogleBoxZoomCommand", "../chartWidget/userInteraction/commands/tooglePanningCommand", "../chartWidget/userInteraction/commands/selectZoomAxesCommand", "../../models/chartManagerDataModel/chartManagerChart", "../common/interfaces/dropInterface", "../chartWidget/userInteraction/commands/zoomChartCommand", "../chartWidget/userInteraction/commands/selectPanningAxesCommand", "../../models/chartManagerDataModel/baseSeries", "./helpers/chartDropHelper", "../chartWidget/userInteraction/commands/autoScaleCommand", "../chartWidget/userInteraction/commands/resetDragPositionCommand", "../chartWidget/userInteraction/commands/resetCursorHoveringCommand", "../common/SerieChartTypeHelper", "../../models/chartManagerDataModel/seriesType", "./defaultComponentSettings"], function (require, exports, chartViewChartManager_1, chartViewLayoutManager_1, widgetBase_1, events_1, userInteractionController_1, setCursorCommand_1, resetZoomCommand_1, ChartBase_1, cursorHoveringCommand_1, dragCursorCommand_1, endCursorDragCommand_1, panChartCommand_1, toogleBoxZoomCommand_1, tooglePanningCommand_1, selectZoomAxesCommand_1, chartManagerChart_1, dropInterface_1, zoomChartCommand_1, selectPanningAxesCommand_1, baseSeries_1, chartDropHelper_1, autoScaleCommand_1, resetDragPositionCommand_1, resetCursorHoveringCommand_1, SerieChartTypeHelper_1, seriesType_1, defaultComponentSettings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventDropHelper = /** @class */ (function (_super) {
        __extends(EventDropHelper, _super);
        function EventDropHelper() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventDropHelper;
    }(events_1.TypedEvent));
    exports.EventDropHelper = EventDropHelper;
    ;
    var ChartViewTools;
    (function (ChartViewTools) {
        ChartViewTools[ChartViewTools["none"] = 0] = "none";
        ChartViewTools[ChartViewTools["referenceCursor1"] = 1] = "referenceCursor1";
        ChartViewTools[ChartViewTools["referenceCursor2"] = 2] = "referenceCursor2";
        ChartViewTools[ChartViewTools["pageScroll"] = 3] = "pageScroll";
        ChartViewTools[ChartViewTools["chartScroll"] = 4] = "chartScroll";
        ChartViewTools[ChartViewTools["boxZoom"] = 5] = "boxZoom";
        ChartViewTools[ChartViewTools["panning"] = 6] = "panning";
    })(ChartViewTools || (ChartViewTools = {}));
    exports.ChartViewTools = ChartViewTools;
    var ZoomDirection;
    (function (ZoomDirection) {
        ZoomDirection[ZoomDirection["X"] = 0] = "X";
        ZoomDirection[ZoomDirection["Y"] = 1] = "Y";
        ZoomDirection[ZoomDirection["XY"] = 2] = "XY";
    })(ZoomDirection || (ZoomDirection = {}));
    exports.ZoomDirection = ZoomDirection;
    var ChartViewWidget = /** @class */ (function (_super) {
        __extends(ChartViewWidget, _super);
        function ChartViewWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.eventDropHelper = new EventDropHelper();
            _this.activeSelectedZoomAxis = ZoomDirection.XY;
            _this.dropPossible = false;
            _this._scrollbarTopPosition = 0;
            _this.chartCommandMap = {};
            _this._userInteractionControllerExecuteChartCommandHandler = function (sender, args) { return _this.onExecuteChartCommand(sender, args); };
            _this._chartManagerModelChangedHandler = function (sender, data) { return _this.onChartManagerModelChanged(sender, data); };
            return _this;
            //****************************************#endregion drop support*****************************************
        }
        ChartViewWidget.prototype.initializeComponent = function () {
            this.component.defaultSettingsDataId = defaultComponentSettings_1.DefaultComponentSettings.WidgetDefinitionId;
        };
        /**
         * Dispose the objects from this widget
         *
         * @memberof ChartViewWidget
         */
        ChartViewWidget.prototype.dispose = function () {
            this.removeSupportedDragDropDataId(dropInterface_1.DragDropDataId.signal);
            this.detachChartManagerDataModelEvents();
            if (this._layoutManager != undefined) {
                this._layoutManager.dispose();
            }
            if (this.chartManager != undefined) {
                this.chartManager.dispose();
            }
            if (this.userInteractionController != undefined) {
                this.userInteractionController.eventExecuteChartCommand.detach(this._userInteractionControllerExecuteChartCommandHandler);
            }
            _super.prototype.dispose.call(this);
        };
        /**
         * Creates the layout of the widget
         *
         * @memberof ChartViewWidget
         */
        ChartViewWidget.prototype.createLayout = function () {
            $(this.cssParentContentId).css("overflow", "hidden");
            $(this.cssParentContentId).append('<div id="InnerChartViewContainer" style="display: flex; flex-direction: column; height: 100%;"></div>');
            if (this.view != undefined) {
                this.userInteractionController = new userInteractionController_1.UserInteractionController(this.states);
            }
            this._layoutManager = new chartViewLayoutManager_1.ChartViewLayoutManager(this, this.component);
            this._layoutManager.addChartViewContainers("#InnerChartViewContainer");
        };
        /**
         * Loads the styles for the chart view toolbar
         *
         * @memberof ChartViewWidget
         */
        ChartViewWidget.prototype.loadStyles = function () {
            _super.prototype.addStyle.call(this, "widgets/chartViewWidget/style/css/refCursorStyle.css");
        };
        /**
         * Returns the default component settings for this widget
         *
         * @returns {(ComponentSettings|undefined)}
         * @memberof ChartViewWidget
         */
        ChartViewWidget.prototype.getDefaultComponentSettings = function () {
            return defaultComponentSettings_1.DefaultComponentSettings.getChartViewWidgetDefinition();
        };
        ChartViewWidget.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            this.initChartManagerDataModel();
            if (this.userInteractionController) {
                this.chartManager = new chartViewChartManager_1.ChartViewChartManager(this, this.userInteractionController, this._layoutManager, this.dataModel);
            }
            this.addChartCommands();
            this._layoutManager.initializeChartViewLayout();
            this.disableMouseWheelForScrollbar();
            this.attachChartManagerDataModelEvents();
            this.chartManager.initChartViewWithDataModel();
            this.enableScrollPersisting();
            this.addSupportedDragDropDataId(dropInterface_1.DragDropDataId.signal);
        };
        ChartViewWidget.prototype.initChartManagerDataModel = function () {
            var dataModel = this.component.getSubComponent(defaultComponentSettings_1.DefaultComponentSettings.ChartManagerDataModelId);
            this.dataModel = dataModel;
        };
        /**
         * Attaches the chart manager datamodel events
         *
         * @private
         * @memberof ChartViewWidget
         */
        ChartViewWidget.prototype.attachChartManagerDataModelEvents = function () {
            if (this.dataModel) {
                this.dataModel.eventModelChanged.attach(this._chartManagerModelChangedHandler);
            }
        };
        /**
         * Detaches the chart manager datamodel events
         *
         * @private
         * @memberof ChartViewWidget
         */
        ChartViewWidget.prototype.detachChartManagerDataModelEvents = function () {
            if (this.dataModel) {
                this.dataModel.eventModelChanged.detach(this._chartManagerModelChangedHandler);
            }
        };
        ChartViewWidget.prototype.onChartManagerModelChanged = function (sender, args) {
            // Update the chart view widget
            this.refreshCharts(sender, args);
        };
        ChartViewWidget.prototype.addChartCommands = function () {
            if (this.chartManager != undefined && this.userInteractionController != undefined) {
                var setCursorOnPointerPositionCommand = new setCursorCommand_1.SetCursorOnPointerPositionCommand(this.chartManager);
                this.chartCommandMap[userInteractionController_1.ChartCommandType.setCursorOnPointerPosition] = setCursorOnPointerPositionCommand;
                var resetZoomCommand = new resetZoomCommand_1.ResetZoomCommand(this.chartManager);
                this.chartCommandMap[userInteractionController_1.ChartCommandType.resetZoom] = resetZoomCommand;
                var checkCursorHoveringCommand = new cursorHoveringCommand_1.CheckCursorHoveringCommand(this.chartManager);
                this.chartCommandMap[userInteractionController_1.ChartCommandType.checkCursorHovering] = checkCursorHoveringCommand;
                var dragCursorCommand = new dragCursorCommand_1.DragCursorCommand(this.chartManager);
                this.chartCommandMap[userInteractionController_1.ChartCommandType.dragCursor] = dragCursorCommand;
                var endCursorDragCommand = new endCursorDragCommand_1.EndCursorDragCommand(this.chartManager);
                this.chartCommandMap[userInteractionController_1.ChartCommandType.endCursorDrag] = endCursorDragCommand;
                var panChartCommand = new panChartCommand_1.PanChartCommand(this.chartManager);
                this.chartCommandMap[userInteractionController_1.ChartCommandType.panChart] = panChartCommand;
                var toggleBoxZoomCommand = new toogleBoxZoomCommand_1.ToogleBoxZoomCommand(this.chartManager);
                this.chartCommandMap[userInteractionController_1.ChartCommandType.toggleBoxZoom] = toggleBoxZoomCommand;
                var togglePanningCommand = new tooglePanningCommand_1.TooglePanningCommand(this.chartManager);
                this.chartCommandMap[userInteractionController_1.ChartCommandType.togglePanning] = togglePanningCommand;
                var selectZoomAxesCommand = new selectZoomAxesCommand_1.SelectZoomAxesCommand(this.chartManager);
                this.chartCommandMap[userInteractionController_1.ChartCommandType.selectZoomAxis] = selectZoomAxesCommand;
                var zoomChartCommand = new zoomChartCommand_1.ZoomChartCommand(this.chartManager);
                this.chartCommandMap[userInteractionController_1.ChartCommandType.zoomChart] = zoomChartCommand;
                var selectPanningAxesCommand = new selectPanningAxesCommand_1.SelectPanningAxesCommand(this.chartManager);
                this.chartCommandMap[userInteractionController_1.ChartCommandType.selectPanningAxes] = selectPanningAxesCommand;
                var autoScaleCommand = new autoScaleCommand_1.AutoScaleCommand(this.chartManager);
                this.chartCommandMap[userInteractionController_1.ChartCommandType.autoScale] = autoScaleCommand;
                var resetDragPositionCommand = new resetDragPositionCommand_1.ResetDragPositionCommand(this.chartManager);
                this.chartCommandMap[userInteractionController_1.ChartCommandType.resetDragPosition] = resetDragPositionCommand;
                var resetCursorHoveringCommand = new resetCursorHoveringCommand_1.ResetCursorHoveringCommand(this.chartManager);
                this.chartCommandMap[userInteractionController_1.ChartCommandType.resetCursorHovering] = resetCursorHoveringCommand;
                this.userInteractionController.eventExecuteChartCommand.attach(this._userInteractionControllerExecuteChartCommandHandler);
            }
            else {
                console.log("chartManager undefined");
            }
        };
        ChartViewWidget.prototype.onExecuteChartCommand = function (sender, args) {
            this.chartCommandMap[args.commandType].onExecuteChartCommand(sender, args);
        };
        ChartViewWidget.prototype.onEventToolbarButtonClicked = function (sender, args) {
            if (this.userInteractionController) {
                this.userInteractionController.onToolbarClick(sender, args);
            }
        };
        ChartViewWidget.prototype.onUserChartInteraction = function (sender, eventUserChartInteractionArgs) {
            if (this.userInteractionController) {
                this.userInteractionController.onChartInteraction(eventUserChartInteractionArgs.chartInteractionType, sender, eventUserChartInteractionArgs.eventArguments);
            }
        };
        ChartViewWidget.prototype.resize = function (width, height) {
            $("#InnerChartViewContainer")[0].style.height = height + "px";
            //If width is not defined, it means it is first resize and scroll needs to be set
            if ($("#InnerChartViewContainer")[0].style.width === "") {
                var scrollbarSettings = this.component.getSetting(ChartViewWidget.ScrollbarSettingId);
                this.setScrollBarSettings(scrollbarSettings);
            }
            $("#InnerChartViewContainer")[0].style.width = width + "px";
            this._layoutManager.resize(width, height);
        };
        ChartViewWidget.prototype.updateCharts = function (traceChartList) {
            this._layoutManager.updateCharts(this.chartManager.traceChartList);
        };
        ChartViewWidget.prototype.refreshCharts = function (sender, data) {
            this.chartManager.onChartManagerModelChanged(sender, data);
        };
        ChartViewWidget.prototype.getTraceChartByName = function (name) {
            if (this.chartManager != undefined) {
                return this.chartManager.getTraceChartByName(name);
            }
            return undefined;
        };
        ChartViewWidget.prototype.setPageScroll = function (enable) {
            ChartViewWidget._pageScrollActive = enable;
        };
        ChartViewWidget.prototype.selectReferenceCursor = function (cursorIndex) {
            if (this.userInteractionController) {
                this.userInteractionController.selectCursor(cursorIndex);
            }
            else {
                console.error("UserInteractionController not defined");
            }
        };
        ChartViewWidget.prototype.disableMouseWheelForScrollbar = function () {
            $("#" + this._layoutManager.chartSplitterParentContainerId).bind('mousewheel DOMMouseScroll', function (e) {
                var disableScrollbarScroll = false;
                if (ChartViewWidget._pageScrollActive == false && e.target.id !== 'ChartViewChartSplitterContainer') {
                    if (e.type == 'mousewheel') {
                        disableScrollbarScroll = true;
                    }
                    else if (e.type == 'DOMMouseScroll') {
                        disableScrollbarScroll = true;
                    }
                }
                if (disableScrollbarScroll) {
                    e.preventDefault();
                }
            });
        };
        /**
         * Enable persistency of scroll
         *
         * @private
         * @memberof ChartViewWidget
         */
        ChartViewWidget.prototype.enableScrollPersisting = function () {
            var widget = this;
            $("#" + this._layoutManager.chartSplitterParentContainerId).scroll(function (e) {
                widget._scrollbarTopPosition = this.scrollTop;
                widget.saveSettings();
            });
        };
        ChartViewWidget.prototype.getComponentSettings = function (onlyModified) {
            this.component.setSetting(ChartViewWidget.ScrollbarSettingId, this.getScrollBarSettings());
            return _super.prototype.getComponentSettings.call(this, onlyModified);
        };
        ChartViewWidget.prototype.getScrollBarSettings = function () {
            var settings = { "vertical": this._scrollbarTopPosition };
            return settings;
        };
        ChartViewWidget.prototype.setScrollBarSettings = function (data) {
            if (data == undefined) {
                return;
            }
            $("#" + this._layoutManager.chartSplitterParentContainerId)[0].scrollTo(0, data["vertical"]);
        };
        //***************************************#Region drop support**************************************************
        ChartViewWidget.prototype.dragStart = function (args) {
            if (args.data[0] instanceof baseSeries_1.BaseSeries) {
                var sameGroup = this.areSeriesFromSameGroup(args.data);
                this.chartManager.addDroppableLocations(args.data, sameGroup);
            }
        };
        ChartViewWidget.prototype.dragStop = function (args) {
            if (args.data[0] instanceof baseSeries_1.BaseSeries) {
                this.chartManager.removeDroppableLocations();
            }
        };
        ChartViewWidget.prototype.dragOver = function (args) {
            this.dropPossible = false;
            var targetChartContainerId = args.currentTarget.parentElement.id;
            var targetChart = this.chartManager.getTraceChartByContainerId(targetChartContainerId);
            var chartManagerDataModel = this.dataModel;
            var dropHelper = new chartDropHelper_1.ChartDropHelper(chartManagerDataModel, this);
            var chartArea = this.getChartAreaId(args.currentTarget);
            if (targetChart != undefined) {
                // Drag over a chart/chart widget
                var series = args.data;
                var chart = targetChart;
                var dropLocationType = dropHelper.getDropLocationType(args.currentTarget, chart, series);
                this.dragAndDropRepresentation(chart, series, dropLocationType, args.dragDropRepresentation);
                this.highlightDroppableAreas(chart, args.currentTarget);
            }
            else if (dropHelper.canAddChart() == true) { // Is it possible to add one more chart
                this.resetHighlighting();
                // Maybe drag over empty space
                if (chartArea == "ChartViewChartSplitter_main_lastPane_YT") {
                    this.dropPossible = true;
                    this.updateDragDropRepresentation(args.dragDropRepresentation, "../app/widgets/common/style/images/dragDrop/addNewYTChart.svg", "Create a new YT chart and add dragged signals");
                    this.updateChartTypeDroppableAreas(chartArea);
                }
                else if (chartArea == "ChartViewChartSplitter_main_lastPane_FFT") {
                    this.dropPossible = true;
                    this.updateDragDropRepresentation(args.dragDropRepresentation, "../app/widgets/common/style/images/dragDrop/addNewFFTChart.svg", "Create a new FFT chart and add dragged signals");
                    this.updateChartTypeDroppableAreas(chartArea);
                }
                else if (chartArea == "ChartViewChartSplitter_main_lastPane_XY") {
                    this.dropPossible = true;
                    this.updateDragDropRepresentation(args.dragDropRepresentation, "../app/widgets/common/style/images/dragDrop/addNewXYChart.svg", "Create a new XY chart and add a calculated XY signal");
                    this.updateChartTypeDroppableAreas(chartArea);
                }
            }
            if (chartArea == undefined) {
                this.updateChartTypeDroppableAreas(chartArea);
            }
            return this.dropPossible;
        };
        ChartViewWidget.prototype.dragAndDropRepresentation = function (chart, series, dropLocationType, dragDropRepresentation) {
            if (chart.type == chartManagerChart_1.ChartType.YTChart || chart.type == chartManagerChart_1.ChartType.FFTChart) {
                if (dropLocationType == ChartBase_1.DropLocationType.addNewScale) {
                    this.dropPossible = true;
                    if (series[0].type === seriesType_1.SeriesType.timeSeries && chart.type == chartManagerChart_1.ChartType.FFTChart) {
                        this.updateDragDropRepresentation(dragDropRepresentation, "../app/widgets/common/style/images/dragDrop/addNewScale.svg", "Calculate FFT signal and add it to new scale");
                    }
                    else {
                        this.updateDragDropRepresentation(dragDropRepresentation, "../app/widgets/common/style/images/dragDrop/addNewScale.svg", "Create a new scale and add dragged signals");
                    }
                }
                else if (dropLocationType == ChartBase_1.DropLocationType.assignToScale) {
                    this.dropPossible = true;
                    if (series[0].type === seriesType_1.SeriesType.timeSeries && chart.type == chartManagerChart_1.ChartType.FFTChart) {
                        this.updateDragDropRepresentation(dragDropRepresentation, "../app/widgets/common/style/images/dragDrop/assignToScale.svg", "Calculate FFT signal and add it to scale");
                    }
                    else {
                        this.updateDragDropRepresentation(dragDropRepresentation, "../app/widgets/common/style/images/dragDrop/assignToScale.svg", "Add dragged signals to scale");
                    }
                }
            }
            else {
                if (dropLocationType == ChartBase_1.DropLocationType.assignToScale && this.areSeriesFromSameGroup(series)) {
                    this.dropPossible = true;
                    if (series[0].type == seriesType_1.SeriesType.timeSeries) {
                        this.updateDragDropRepresentation(dragDropRepresentation, "../app/widgets/common/style/images/dragDrop/assignToChart.svg", "Calculate XY signal and add it to the chart");
                    }
                    else {
                        this.updateDragDropRepresentation(dragDropRepresentation, "../app/widgets/common/style/images/dragDrop/assignToChart.svg", "Add dragged signals to chart");
                    }
                }
            }
        };
        /**
         * Updates the drag and drop representation while dragging with new icons or texts
         *
         * @private
         * @param {DragDropRepresentation} dragDropRepresentation
         * @param {string} overlayIconPath
         * @param {string} newText
         * @memberof ChartViewWidget
         */
        ChartViewWidget.prototype.updateDragDropRepresentation = function (dragDropRepresentation, overlayIconPath, newText) {
            if (dragDropRepresentation != undefined) {
                // Add overlay icon if available
                if (overlayIconPath != "") {
                    var imageProvider = this.component.getSubComponent(defaultComponentSettings_1.DefaultComponentSettings.ImageProviderId);
                    if (imageProvider != undefined) {
                        var addNewScaleImage = imageProvider.getImage(overlayIconPath);
                        if (addNewScaleImage != "") {
                            dragDropRepresentation.iconList.push(addNewScaleImage);
                        }
                    }
                }
                // add text or replace existing text
                if (dragDropRepresentation.textList.length == 0) {
                    dragDropRepresentation.textList.push(newText);
                }
                else {
                    dragDropRepresentation.textList[0] = newText;
                }
            }
        };
        ChartViewWidget.prototype.drop = function (args) {
            var series = args.data;
            if (this.dropPossible) { // Is drop possible
                var chartManagerDataModel = this.dataModel;
                var dropHelper = new chartDropHelper_1.ChartDropHelper(chartManagerDataModel, this);
                var targetChart = this.chartManager.getTraceChartByContainerId(args.currentTarget.parentElement.id);
                if (targetChart != undefined) {
                    var chart = chartManagerDataModel.getChart(targetChart.widgetName);
                    series = SerieChartTypeHelper_1.SerieChartTypeHelper.getDroppableSeries(chart.getAllSeries(), series);
                }
                dropHelper.addSeries(args.currentTarget, targetChart, series, this._layoutManager);
            }
        };
        /**
         * Mouse is not over chartView while dragging operation
         *
         * @param {DragDropArgs} args
         * @memberof ChartViewWidget
         */
        ChartViewWidget.prototype.dropFocusLost = function (args) {
            this.updateChartTypeDroppableAreas(args.currentTarget);
            this.resetHighlighting();
        };
        /**
         * Highlights areas where signals is being dragged
         *
         * @param {ChartBase} chart
         * @param {*} currentTarget
         * @memberof ChartViewWidget
         */
        ChartViewWidget.prototype.highlightDroppableAreas = function (chart, currentTarget) {
            if (currentTarget.id.includes("_axisDropZoneScale") || currentTarget.id.includes("_axisDropZone_chartArea") || currentTarget.id.includes("_refCursor_")) {
                chart.updateDroppableAreas(currentTarget);
                this.resetHighlighting(chart);
            }
            else {
                this.resetHighlighting();
            }
        };
        /**
         * Reset highlighted areas for all charts, except the selected one
         *
         * @param {ITraceChart} [chart]
         * @memberof ChartViewWidget
         */
        ChartViewWidget.prototype.resetHighlighting = function (chart) {
            var traceCharts = this.chartManager.traceChartList;
            for (var i = 0; i < traceCharts.length; i++) {
                if (chart != traceCharts[i]) {
                    traceCharts[i].resetHighlighting();
                }
            }
        };
        /**
         * Update highlighting state for chart Type areas
         *
         * @protected
         * @param {(string | undefined)} currentTargetId
         * @memberof ChartViewWidget
         */
        ChartViewWidget.prototype.updateChartTypeDroppableAreas = function (currentTargetId) {
            var emptySpaceElement = document.getElementById('ChartViewChartSplitter_main_lastPane');
            for (var i = 0; i < emptySpaceElement.childElementCount; i = i + 1) {
                if (emptySpaceElement.children[i].id == currentTargetId) {
                    var area = document.getElementById(emptySpaceElement.children[i].id);
                    area.classList.add('draggedOver');
                }
                else {
                    var area = document.getElementById(emptySpaceElement.children[i].id);
                    area.classList.remove('draggedOver');
                }
            }
        };
        /**
         * Gets the chart area id
         *
         * @protected
         * @param {HTMLElement} target
         * @returns {(string | undefined)}
         * @memberof ChartViewWidget
         */
        ChartViewWidget.prototype.getChartAreaId = function (target) {
            var ytArea = 'ChartViewChartSplitter_main_lastPane_YT';
            var fftArea = 'ChartViewChartSplitter_main_lastPane_FFT';
            var xyArea = 'ChartViewChartSplitter_main_lastPane_XY';
            if (target.classList.contains('disabled') || target.parentElement.classList.contains('disabled')) {
                return undefined;
            }
            else if (target.id == ytArea || target.parentElement.id == ytArea) {
                return ytArea;
            }
            else if (target.id == fftArea || target.parentElement.id == fftArea) {
                return fftArea;
            }
            else if (target.id == xyArea || target.parentElement.id == xyArea) {
                return xyArea;
            }
            return undefined;
        };
        /**
         * Returns true if drag series belong to the same serie group
         *
         * @private
         * @param {Array<BaseSeries>} series
         * @returns {boolean}
         * @memberof ChartViewWidget
         */
        ChartViewWidget.prototype.areSeriesFromSameGroup = function (series) {
            var parent = series[0].parent;
            for (var i = 1; i < series.length; i = i + 1) {
                if (series[i].parent != parent) {
                    return false;
                }
            }
            return true;
        };
        ChartViewWidget._pageScrollActive = false;
        ChartViewWidget.ScrollbarSettingId = "scrollbar";
        return ChartViewWidget;
    }(widgetBase_1.WidgetBase));
    exports.ChartViewWidget = ChartViewWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRWaWV3V2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0Vmlld1dpZGdldC9jaGFydFZpZXdXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQXVDQTtRQUE4QixtQ0FBc0I7UUFBcEQ7O1FBQXVELENBQUM7UUFBRCxzQkFBQztJQUFELENBQUMsQUFBeEQsQ0FBOEIsbUJBQVUsR0FBZ0I7SUEwakJDLDBDQUFlO0lBMWpCaEIsQ0FBQztJQUV6RCxJQUFLLGNBUUo7SUFSRCxXQUFLLGNBQWM7UUFDZixtREFBSSxDQUFBO1FBQ0osMkVBQWdCLENBQUE7UUFDaEIsMkVBQWdCLENBQUE7UUFDaEIsK0RBQVUsQ0FBQTtRQUNWLGlFQUFXLENBQUE7UUFDWCx5REFBTyxDQUFBO1FBQ1AseURBQU8sQ0FBQTtJQUNYLENBQUMsRUFSSSxjQUFjLEtBQWQsY0FBYyxRQVFsQjtJQWdqQnlCLHdDQUFjO0lBOWlCeEMsSUFBSyxhQUlKO0lBSkQsV0FBSyxhQUFhO1FBQ2QsMkNBQUMsQ0FBQTtRQUNELDJDQUFDLENBQUE7UUFDRCw2Q0FBRSxDQUFBO0lBQ04sQ0FBQyxFQUpJLGFBQWEsS0FBYixhQUFhLFFBSWpCO0lBMGlCeUMsc0NBQWE7SUF4aUJ2RDtRQUE4QixtQ0FBVTtRQUF4QztZQUFBLHFFQXNpQkM7WUFwaUJHLHFCQUFlLEdBQW9CLElBQUksZUFBZSxFQUFFLENBQUM7WUFPekQsNEJBQXNCLEdBQUcsYUFBYSxDQUFDLEVBQUUsQ0FBQztZQUMxQyxrQkFBWSxHQUFZLEtBQUssQ0FBQztZQUc5QiwyQkFBcUIsR0FBVyxDQUFDLENBQUM7WUFHMUIscUJBQWUsR0FBdUMsRUFBRSxDQUFDO1lBRXpELDBEQUFvRCxHQUFHLFVBQUMsTUFBTSxFQUFDLElBQUksSUFBRyxPQUFBLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFD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LFNBQVMsQ0FBQzthQUNwQjtpQkFDSSxJQUFJLE1BQU0sQ0FBQyxFQUFFLElBQUksTUFBTSxJQUFJLE1BQU8sQ0FBQyxhQUFjLENBQUMsRUFBRSxJQUFJLE1BQU0sRUFBRTtnQkFDakUsT0FBTyxNQUFNLENBQUM7YUFDakI7aUJBQ0ksSUFBSSxNQUFNLENBQUMsRUFBRSxJQUFJLE9BQU8sSUFBSSxNQUFPLENBQUMsYUFBYyxDQUFDLEVBQUUsSUFBSSxPQUFPLEVBQUU7Z0JBQ25FLE9BQU8sT0FBTyxDQUFDO2FBQ2xCO2lCQUNJLElBQUksTUFBTSxDQUFDLEVBQUUsSUFBSSxNQUFNLElBQUksTUFBTyxDQUFDLGFBQWMsQ0FBQyxFQUFFLElBQUksTUFBTSxFQUFFO2dCQUNqRSxPQUFPLE1BQU0sQ0FBQzthQUNqQjtZQUNELE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0ssZ0RBQXNCLEdBQTlCLFVBQStCLE1BQXlCO1lBQ3BELElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDOUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUM7Z0JBQ3pDLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxNQUFNLEVBQUM7b0JBQzNCLE9BQU8sS0FBSyxDQUFDO2lCQUNoQjthQUNKO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQXhoQk0saUNBQWlCLEdBQVksS0FBSyxDQUFDO1FBR25CLGtDQUFrQixHQUFHLFdBQVcsQ0FBQztRQXdoQjVELHNCQUFDO0tBQUEsQUF0aUJELENBQThCLHVCQUFVLEdBc2lCdkM7SUFFUSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYXJ0Vmlld0NoYXJ0TWFuYWdlciB9IGZyb20gXCIuL2NoYXJ0Vmlld0NoYXJ0TWFuYWdlclwiO1xyXG5pbXBvcnQgeyBDaGFydFZpZXdMYXlvdXRNYW5hZ2VyIH0gZnJvbSBcIi4uL2NoYXJ0Vmlld1dpZGdldC9jaGFydFZpZXdMYXlvdXRNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFdpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL3dpZGdldEJhc2VcIjtcclxuaW1wb3J0IHsgSVRyYWNlQ2hhcnQgfSBmcm9tIFwiLi4vY2hhcnRXaWRnZXQvaW50ZXJmYWNlcy90cmFjZUNoYXJ0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFR5cGVkRXZlbnQgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2V2ZW50c1wiO1xyXG5pbXBvcnQgeyBVc2VySW50ZXJhY3Rpb25Db250cm9sbGVyLCBDaGFydENvbW1hbmRUeXBlIH0gZnJvbSBcIi4uL2NoYXJ0V2lkZ2V0L3VzZXJJbnRlcmFjdGlvbi91c2VySW50ZXJhY3Rpb25Db250cm9sbGVyXCI7XHJcbmltcG9ydCB7IFNldEN1cnNvck9uUG9pbnRlclBvc2l0aW9uQ29tbWFuZCB9IGZyb20gXCIuLi9jaGFydFdpZGdldC91c2VySW50ZXJhY3Rpb24vY29tbWFuZHMvc2V0Q3Vyc29yQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBSZXNldFpvb21Db21tYW5kIH0gZnJvbSBcIi4uL2NoYXJ0V2lkZ2V0L3VzZXJJbnRlcmFjdGlvbi9jb21tYW5kcy9yZXNldFpvb21Db21tYW5kXCI7XHJcbmltcG9ydCB7IENoYXJ0Q29tbWFuZEJhc2UgfSBmcm9tIFwiLi4vY2hhcnRXaWRnZXQvdXNlckludGVyYWN0aW9uL2NoYXJ0Q29tbWFuZEJhc2VcIjtcclxuaW1wb3J0IHsgRXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbkFyZ3MsIENoYXJ0QmFzZSwgRHJvcExvY2F0aW9uVHlwZSB9IGZyb20gXCIuLi9jaGFydFdpZGdldC9DaGFydEJhc2VcIjtcclxuaW1wb3J0IHsgQ2hlY2tDdXJzb3JIb3ZlcmluZ0NvbW1hbmQgfSBmcm9tIFwiLi4vY2hhcnRXaWRnZXQvdXNlckludGVyYWN0aW9uL2NvbW1hbmRzL2N1cnNvckhvdmVyaW5nQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBEcmFnQ3Vyc29yQ29tbWFuZCB9IGZyb20gXCIuLi9jaGFydFdpZGdldC91c2VySW50ZXJhY3Rpb24vY29tbWFuZHMvZHJhZ0N1cnNvckNvbW1hbmRcIjtcclxuaW1wb3J0IHsgRW5kQ3Vyc29yRHJhZ0NvbW1hbmQgfSBmcm9tIFwiLi4vY2hhcnRXaWRnZXQvdXNlckludGVyYWN0aW9uL2NvbW1hbmRzL2VuZEN1cnNvckRyYWdDb21tYW5kXCI7XHJcbmltcG9ydCB7IFBhbkNoYXJ0Q29tbWFuZCB9IGZyb20gXCIuLi9jaGFydFdpZGdldC91c2VySW50ZXJhY3Rpb24vY29tbWFuZHMvcGFuQ2hhcnRDb21tYW5kXCI7XHJcbmltcG9ydCB7IFRvb2dsZUJveFpvb21Db21tYW5kIGFzIFRvZ2dsZUJveFpvb21Db21tYW5kIH0gZnJvbSBcIi4uL2NoYXJ0V2lkZ2V0L3VzZXJJbnRlcmFjdGlvbi9jb21tYW5kcy90b29nbGVCb3hab29tQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBUb29nbGVQYW5uaW5nQ29tbWFuZCB9IGZyb20gXCIuLi9jaGFydFdpZGdldC91c2VySW50ZXJhY3Rpb24vY29tbWFuZHMvdG9vZ2xlUGFubmluZ0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgU2VsZWN0Wm9vbUF4ZXNDb21tYW5kIH0gZnJvbSBcIi4uL2NoYXJ0V2lkZ2V0L3VzZXJJbnRlcmFjdGlvbi9jb21tYW5kcy9zZWxlY3Rab29tQXhlc0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgQ2hhcnRUeXBlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvY2hhcnRNYW5hZ2VyQ2hhcnRcIjtcclxuaW1wb3J0IHsgSURyb3BwYWJsZSwgRHJhZ0Ryb3BEYXRhSWQgfSBmcm9tIFwiLi4vY29tbW9uL2ludGVyZmFjZXMvZHJvcEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBab29tQ2hhcnRDb21tYW5kIH0gZnJvbSBcIi4uL2NoYXJ0V2lkZ2V0L3VzZXJJbnRlcmFjdGlvbi9jb21tYW5kcy96b29tQ2hhcnRDb21tYW5kXCI7XHJcbmltcG9ydCB7IFNlbGVjdFBhbm5pbmdBeGVzQ29tbWFuZCB9IGZyb20gXCIuLi9jaGFydFdpZGdldC91c2VySW50ZXJhY3Rpb24vY29tbWFuZHMvc2VsZWN0UGFubmluZ0F4ZXNDb21tYW5kXCI7XHJcbmltcG9ydCB7IEJhc2VTZXJpZXMgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9iYXNlU2VyaWVzXCI7XHJcbmltcG9ydCB7IElDaGFydE1hbmFnZXJEYXRhTW9kZWwgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9pbnRlcmZhY2VzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDaGFydERyb3BIZWxwZXIgfSBmcm9tIFwiLi9oZWxwZXJzL2NoYXJ0RHJvcEhlbHBlclwiO1xyXG5pbXBvcnQgeyBBdXRvU2NhbGVDb21tYW5kIH0gZnJvbSBcIi4uL2NoYXJ0V2lkZ2V0L3VzZXJJbnRlcmFjdGlvbi9jb21tYW5kcy9hdXRvU2NhbGVDb21tYW5kXCI7XHJcbmltcG9ydCB7IERyYWdEcm9wQXJncyB9IGZyb20gXCIuLi9jb21tb24vZHJhZ0Ryb3BBcmdzXCI7XHJcbmltcG9ydCB7IFJlc2V0RHJhZ1Bvc2l0aW9uQ29tbWFuZCB9IGZyb20gXCIuLi9jaGFydFdpZGdldC91c2VySW50ZXJhY3Rpb24vY29tbWFuZHMvcmVzZXREcmFnUG9zaXRpb25Db21tYW5kXCI7XHJcbmltcG9ydCB7IFJlc2V0Q3Vyc29ySG92ZXJpbmdDb21tYW5kIH0gZnJvbSBcIi4uL2NoYXJ0V2lkZ2V0L3VzZXJJbnRlcmFjdGlvbi9jb21tYW5kcy9yZXNldEN1cnNvckhvdmVyaW5nQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBEcmFnRHJvcFJlcHJlc2VudGF0aW9uIH0gZnJvbSBcIi4uL2NvbW1vbi9kcmFnRHJvcFJlcHJlc2VudGF0aW9uXCI7XHJcbmltcG9ydCB7IElDaGFydE1hbmFnZXJDaGFydCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2ludGVyZmFjZXMvY2hhcnRNYW5hZ2VyQ2hhcnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU2VyaWVDaGFydFR5cGVIZWxwZXIgfSBmcm9tIFwiLi4vY29tbW9uL1NlcmllQ2hhcnRUeXBlSGVscGVyXCI7XHJcbmltcG9ydCB7IFNlcmllc1R5cGUgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9zZXJpZXNUeXBlXCI7XHJcbmltcG9ydCB7IERlZmF1bHRDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuL2RlZmF1bHRDb21wb25lbnRTZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnRTZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBJSW1hZ2VQcm92aWRlciB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy9pbWFnZVByb3ZpZGVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEV2ZW50TW9kZWxDaGFuZ2VkQXJncywgSURhdGFNb2RlbCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvZGF0YU1vZGVsSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEN1cnNvclN0YXRlcyB9IGZyb20gXCIuLi9jb21tb24vc3RhdGVzL2N1cnNvclN0YXRlc1wiO1xyXG5cclxuXHJcbmNsYXNzIEV2ZW50RHJvcEhlbHBlciBleHRlbmRzIFR5cGVkRXZlbnQ8T2JqZWN0LCB7fT4geyB9O1xyXG5cclxuZW51bSBDaGFydFZpZXdUb29scyB7XHJcbiAgICBub25lLFxyXG4gICAgcmVmZXJlbmNlQ3Vyc29yMSxcclxuICAgIHJlZmVyZW5jZUN1cnNvcjIsXHJcbiAgICBwYWdlU2Nyb2xsLFxyXG4gICAgY2hhcnRTY3JvbGwsXHJcbiAgICBib3hab29tLFxyXG4gICAgcGFubmluZyxcclxufVxyXG5cclxuZW51bSBab29tRGlyZWN0aW9uIHtcclxuICAgIFgsXHJcbiAgICBZLFxyXG4gICAgWFlcclxufVxyXG5cclxuY2xhc3MgQ2hhcnRWaWV3V2lkZ2V0IGV4dGVuZHMgV2lkZ2V0QmFzZSBpbXBsZW1lbnRzIElEcm9wcGFibGUge1xyXG5cclxuICAgIGV2ZW50RHJvcEhlbHBlcjogRXZlbnREcm9wSGVscGVyID0gbmV3IEV2ZW50RHJvcEhlbHBlcigpO1xyXG4gICAgLy9ldmVudERyYWdPdmVyOiBFdmVudERyYWdPdmVyID0gbmV3IEV2ZW50RHJhZ092ZXIoKTtcclxuXHJcbiAgICBfbGF5b3V0TWFuYWdlcj86IENoYXJ0Vmlld0xheW91dE1hbmFnZXI7XHJcbiAgICBjaGFydE1hbmFnZXI/OiBDaGFydFZpZXdDaGFydE1hbmFnZXJcclxuICAgIHVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXI/OiBVc2VySW50ZXJhY3Rpb25Db250cm9sbGVyO1xyXG4gICAgXHJcbiAgICBhY3RpdmVTZWxlY3RlZFpvb21BeGlzID0gWm9vbURpcmVjdGlvbi5YWTtcclxuICAgIGRyb3BQb3NzaWJsZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgc3RhdGljIF9wYWdlU2Nyb2xsQWN0aXZlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgX3Njcm9sbGJhclRvcFBvc2l0aW9uOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBTY3JvbGxiYXJTZXR0aW5nSWQgPSBcInNjcm9sbGJhclwiO1xyXG5cclxuICAgIHByaXZhdGUgY2hhcnRDb21tYW5kTWFwOiB7IFtpZDogc3RyaW5nXTogQ2hhcnRDb21tYW5kQmFzZSB9ID0ge307XHJcblxyXG4gICAgcHJpdmF0ZSBfdXNlckludGVyYWN0aW9uQ29udHJvbGxlckV4ZWN1dGVDaGFydENvbW1hbmRIYW5kbGVyID0gKHNlbmRlcixhcmdzKT0+dGhpcy5vbkV4ZWN1dGVDaGFydENvbW1hbmQoc2VuZGVyICxhcmdzKTtcclxuXHJcbiAgICBwcml2YXRlIF9jaGFydE1hbmFnZXJNb2RlbENoYW5nZWRIYW5kbGVyID0gKHNlbmRlciwgZGF0YSkgPT4gdGhpcy5vbkNoYXJ0TWFuYWdlck1vZGVsQ2hhbmdlZChzZW5kZXIsIGRhdGEpOyAgXHJcblxyXG4gICAgaW5pdGlhbGl6ZUNvbXBvbmVudCgpe1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmRlZmF1bHRTZXR0aW5nc0RhdGFJZCA9IERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5XaWRnZXREZWZpbml0aW9uSWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNwb3NlIHRoZSBvYmplY3RzIGZyb20gdGhpcyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGRpc3Bvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVTdXBwb3J0ZWREcmFnRHJvcERhdGFJZChEcmFnRHJvcERhdGFJZC5zaWduYWwpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuZGV0YWNoQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsRXZlbnRzKCk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuX2xheW91dE1hbmFnZXIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0TWFuYWdlci5kaXNwb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuY2hhcnRNYW5hZ2VyICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcnRNYW5hZ2VyLmRpc3Bvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy51c2VySW50ZXJhY3Rpb25Db250cm9sbGVyICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgdGhpcy51c2VySW50ZXJhY3Rpb25Db250cm9sbGVyLmV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZC5kZXRhY2godGhpcy5fdXNlckludGVyYWN0aW9uQ29udHJvbGxlckV4ZWN1dGVDaGFydENvbW1hbmRIYW5kbGVyKTsgXHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBsYXlvdXQgb2YgdGhlIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgY3JlYXRlTGF5b3V0KCkge1xyXG5cclxuICAgICAgICAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKS5jc3MoXCJvdmVyZmxvd1wiLCBcImhpZGRlblwiKTtcclxuICAgICAgICAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKS5hcHBlbmQoJzxkaXYgaWQ9XCJJbm5lckNoYXJ0Vmlld0NvbnRhaW5lclwiIHN0eWxlPVwiZGlzcGxheTogZmxleDsgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsgaGVpZ2h0OiAxMDAlO1wiPjwvZGl2PicpXHJcblxyXG4gICAgICAgIGlmICh0aGlzLnZpZXcgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXNlckludGVyYWN0aW9uQ29udHJvbGxlciA9IG5ldyBVc2VySW50ZXJhY3Rpb25Db250cm9sbGVyKHRoaXMuc3RhdGVzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0TWFuYWdlciA9IG5ldyBDaGFydFZpZXdMYXlvdXRNYW5hZ2VyKHRoaXMsIHRoaXMuY29tcG9uZW50KTtcclxuICAgICAgICB0aGlzLl9sYXlvdXRNYW5hZ2VyIS5hZGRDaGFydFZpZXdDb250YWluZXJzKFwiI0lubmVyQ2hhcnRWaWV3Q29udGFpbmVyXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZHMgdGhlIHN0eWxlcyBmb3IgdGhlIGNoYXJ0IHZpZXcgdG9vbGJhclxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgbG9hZFN0eWxlcygpIHtcclxuICAgICAgICBzdXBlci5hZGRTdHlsZShcIndpZGdldHMvY2hhcnRWaWV3V2lkZ2V0L3N0eWxlL2Nzcy9yZWZDdXJzb3JTdHlsZS5jc3NcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IGNvbXBvbmVudCBzZXR0aW5ncyBmb3IgdGhpcyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7KENvbXBvbmVudFNldHRpbmdzfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGdldERlZmF1bHRDb21wb25lbnRTZXR0aW5ncygpOiBDb21wb25lbnRTZXR0aW5nc3x1bmRlZmluZWR7XHJcbiAgICAgICAgcmV0dXJuIERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5nZXRDaGFydFZpZXdXaWRnZXREZWZpbml0aW9uKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGluaXRpYWxpemVkKCl7XHJcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZWQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0Q2hhcnRNYW5hZ2VyRGF0YU1vZGVsKCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGFydE1hbmFnZXIgPSBuZXcgQ2hhcnRWaWV3Q2hhcnRNYW5hZ2VyKHRoaXMsIHRoaXMudXNlckludGVyYWN0aW9uQ29udHJvbGxlciwgdGhpcy5fbGF5b3V0TWFuYWdlciEsIHRoaXMuZGF0YU1vZGVsIGFzIElDaGFydE1hbmFnZXJEYXRhTW9kZWwpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hZGRDaGFydENvbW1hbmRzKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2xheW91dE1hbmFnZXIhLmluaXRpYWxpemVDaGFydFZpZXdMYXlvdXQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5kaXNhYmxlTW91c2VXaGVlbEZvclNjcm9sbGJhcigpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuYXR0YWNoQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsRXZlbnRzKCk7XHJcblxyXG4gICAgICAgIHRoaXMuY2hhcnRNYW5hZ2VyIS5pbml0Q2hhcnRWaWV3V2l0aERhdGFNb2RlbCgpO1xyXG5cclxuICAgICAgICB0aGlzLmVuYWJsZVNjcm9sbFBlcnNpc3RpbmcoKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRTdXBwb3J0ZWREcmFnRHJvcERhdGFJZChEcmFnRHJvcERhdGFJZC5zaWduYWwpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRDaGFydE1hbmFnZXJEYXRhTW9kZWwoKSB7XHJcbiAgICAgICAgbGV0IGRhdGFNb2RlbCA9IHRoaXMuY29tcG9uZW50LmdldFN1YkNvbXBvbmVudChEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsSWQpO1xyXG4gICAgICAgIHRoaXMuZGF0YU1vZGVsID0gZGF0YU1vZGVsIGFzIElDaGFydE1hbmFnZXJEYXRhTW9kZWw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBdHRhY2hlcyB0aGUgY2hhcnQgbWFuYWdlciBkYXRhbW9kZWwgZXZlbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhdHRhY2hDaGFydE1hbmFnZXJEYXRhTW9kZWxFdmVudHMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGF0YU1vZGVsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YU1vZGVsLmV2ZW50TW9kZWxDaGFuZ2VkLmF0dGFjaCh0aGlzLl9jaGFydE1hbmFnZXJNb2RlbENoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXRhY2hlcyB0aGUgY2hhcnQgbWFuYWdlciBkYXRhbW9kZWwgZXZlbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkZXRhY2hDaGFydE1hbmFnZXJEYXRhTW9kZWxFdmVudHMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGF0YU1vZGVsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YU1vZGVsLmV2ZW50TW9kZWxDaGFuZ2VkLmRldGFjaCh0aGlzLl9jaGFydE1hbmFnZXJNb2RlbENoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNoYXJ0TWFuYWdlck1vZGVsQ2hhbmdlZChzZW5kZXI6IElEYXRhTW9kZWwsIGFyZ3M6IEV2ZW50TW9kZWxDaGFuZ2VkQXJncykge1xyXG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgY2hhcnQgdmlldyB3aWRnZXRcclxuICAgICAgICB0aGlzLnJlZnJlc2hDaGFydHMoc2VuZGVyLCBhcmdzKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBhZGRDaGFydENvbW1hbmRzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNoYXJ0TWFuYWdlciAhPSB1bmRlZmluZWQgJiYgdGhpcy51c2VySW50ZXJhY3Rpb25Db250cm9sbGVyICE9IHVuZGVmaW5lZCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IHNldEN1cnNvck9uUG9pbnRlclBvc2l0aW9uQ29tbWFuZCA9IG5ldyBTZXRDdXJzb3JPblBvaW50ZXJQb3NpdGlvbkNvbW1hbmQodGhpcy5jaGFydE1hbmFnZXIhKTtcclxuICAgICAgICAgICAgdGhpcy5jaGFydENvbW1hbmRNYXBbQ2hhcnRDb21tYW5kVHlwZS5zZXRDdXJzb3JPblBvaW50ZXJQb3NpdGlvbl0gPSBzZXRDdXJzb3JPblBvaW50ZXJQb3NpdGlvbkNvbW1hbmQ7XHJcblxyXG4gICAgICAgICAgICBsZXQgcmVzZXRab29tQ29tbWFuZCA9IG5ldyBSZXNldFpvb21Db21tYW5kKHRoaXMuY2hhcnRNYW5hZ2VyKTtcclxuICAgICAgICAgICAgdGhpcy5jaGFydENvbW1hbmRNYXBbQ2hhcnRDb21tYW5kVHlwZS5yZXNldFpvb21dID0gcmVzZXRab29tQ29tbWFuZDtcclxuXHJcbiAgICAgICAgICAgIGxldCBjaGVja0N1cnNvckhvdmVyaW5nQ29tbWFuZCA9IG5ldyBDaGVja0N1cnNvckhvdmVyaW5nQ29tbWFuZCh0aGlzLmNoYXJ0TWFuYWdlcik7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcnRDb21tYW5kTWFwW0NoYXJ0Q29tbWFuZFR5cGUuY2hlY2tDdXJzb3JIb3ZlcmluZ10gPSBjaGVja0N1cnNvckhvdmVyaW5nQ29tbWFuZDtcclxuXHJcbiAgICAgICAgICAgIGxldCBkcmFnQ3Vyc29yQ29tbWFuZCA9IG5ldyBEcmFnQ3Vyc29yQ29tbWFuZCh0aGlzLmNoYXJ0TWFuYWdlcik7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcnRDb21tYW5kTWFwW0NoYXJ0Q29tbWFuZFR5cGUuZHJhZ0N1cnNvcl0gPSBkcmFnQ3Vyc29yQ29tbWFuZDtcclxuXHJcbiAgICAgICAgICAgIGxldCBlbmRDdXJzb3JEcmFnQ29tbWFuZCA9IG5ldyBFbmRDdXJzb3JEcmFnQ29tbWFuZCh0aGlzLmNoYXJ0TWFuYWdlcik7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcnRDb21tYW5kTWFwW0NoYXJ0Q29tbWFuZFR5cGUuZW5kQ3Vyc29yRHJhZ10gPSBlbmRDdXJzb3JEcmFnQ29tbWFuZDtcclxuXHJcbiAgICAgICAgICAgIGxldCBwYW5DaGFydENvbW1hbmQgPSBuZXcgUGFuQ2hhcnRDb21tYW5kKHRoaXMuY2hhcnRNYW5hZ2VyKTtcclxuICAgICAgICAgICAgdGhpcy5jaGFydENvbW1hbmRNYXBbQ2hhcnRDb21tYW5kVHlwZS5wYW5DaGFydF0gPSBwYW5DaGFydENvbW1hbmQ7XHJcblxyXG4gICAgICAgICAgICBsZXQgdG9nZ2xlQm94Wm9vbUNvbW1hbmQgPSBuZXcgVG9nZ2xlQm94Wm9vbUNvbW1hbmQodGhpcy5jaGFydE1hbmFnZXIpO1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJ0Q29tbWFuZE1hcFtDaGFydENvbW1hbmRUeXBlLnRvZ2dsZUJveFpvb21dID0gdG9nZ2xlQm94Wm9vbUNvbW1hbmQ7XHJcblxyXG4gICAgICAgICAgICBsZXQgdG9nZ2xlUGFubmluZ0NvbW1hbmQgPSBuZXcgVG9vZ2xlUGFubmluZ0NvbW1hbmQodGhpcy5jaGFydE1hbmFnZXIpO1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJ0Q29tbWFuZE1hcFtDaGFydENvbW1hbmRUeXBlLnRvZ2dsZVBhbm5pbmddID0gdG9nZ2xlUGFubmluZ0NvbW1hbmQ7XHJcblxyXG4gICAgICAgICAgICBsZXQgc2VsZWN0Wm9vbUF4ZXNDb21tYW5kID0gbmV3IFNlbGVjdFpvb21BeGVzQ29tbWFuZCh0aGlzLmNoYXJ0TWFuYWdlcik7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcnRDb21tYW5kTWFwW0NoYXJ0Q29tbWFuZFR5cGUuc2VsZWN0Wm9vbUF4aXNdID0gc2VsZWN0Wm9vbUF4ZXNDb21tYW5kO1xyXG5cclxuICAgICAgICAgICAgbGV0IHpvb21DaGFydENvbW1hbmQgPSBuZXcgWm9vbUNoYXJ0Q29tbWFuZCh0aGlzLmNoYXJ0TWFuYWdlcik7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcnRDb21tYW5kTWFwW0NoYXJ0Q29tbWFuZFR5cGUuem9vbUNoYXJ0XSA9IHpvb21DaGFydENvbW1hbmQ7XHJcblxyXG4gICAgICAgICAgICBsZXQgc2VsZWN0UGFubmluZ0F4ZXNDb21tYW5kID0gbmV3IFNlbGVjdFBhbm5pbmdBeGVzQ29tbWFuZCh0aGlzLmNoYXJ0TWFuYWdlcik7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcnRDb21tYW5kTWFwW0NoYXJ0Q29tbWFuZFR5cGUuc2VsZWN0UGFubmluZ0F4ZXNdID0gc2VsZWN0UGFubmluZ0F4ZXNDb21tYW5kO1xyXG5cclxuICAgICAgICAgICAgbGV0IGF1dG9TY2FsZUNvbW1hbmQgPSBuZXcgQXV0b1NjYWxlQ29tbWFuZCh0aGlzLmNoYXJ0TWFuYWdlcik7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcnRDb21tYW5kTWFwW0NoYXJ0Q29tbWFuZFR5cGUuYXV0b1NjYWxlXSA9IGF1dG9TY2FsZUNvbW1hbmQ7XHJcblxyXG4gICAgICAgICAgICBsZXQgcmVzZXREcmFnUG9zaXRpb25Db21tYW5kID0gbmV3IFJlc2V0RHJhZ1Bvc2l0aW9uQ29tbWFuZCh0aGlzLmNoYXJ0TWFuYWdlcik7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcnRDb21tYW5kTWFwW0NoYXJ0Q29tbWFuZFR5cGUucmVzZXREcmFnUG9zaXRpb25dID0gcmVzZXREcmFnUG9zaXRpb25Db21tYW5kO1xyXG5cclxuICAgICAgICAgICAgbGV0IHJlc2V0Q3Vyc29ySG92ZXJpbmdDb21tYW5kID0gbmV3IFJlc2V0Q3Vyc29ySG92ZXJpbmdDb21tYW5kKHRoaXMuY2hhcnRNYW5hZ2VyKTtcclxuICAgICAgICAgICAgdGhpcy5jaGFydENvbW1hbmRNYXBbQ2hhcnRDb21tYW5kVHlwZS5yZXNldEN1cnNvckhvdmVyaW5nXSA9IHJlc2V0Q3Vyc29ySG92ZXJpbmdDb21tYW5kO1xyXG5cclxuICAgICAgICAgICAgdGhpcy51c2VySW50ZXJhY3Rpb25Db250cm9sbGVyLmV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZC5hdHRhY2godGhpcy5fdXNlckludGVyYWN0aW9uQ29udHJvbGxlckV4ZWN1dGVDaGFydENvbW1hbmRIYW5kbGVyKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNoYXJ0TWFuYWdlciB1bmRlZmluZWRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25FeGVjdXRlQ2hhcnRDb21tYW5kKHNlbmRlciwgYXJncykge1xyXG4gICAgICAgIHRoaXMuY2hhcnRDb21tYW5kTWFwW2FyZ3MuY29tbWFuZFR5cGVdLm9uRXhlY3V0ZUNoYXJ0Q29tbWFuZChzZW5kZXIsIGFyZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkV2ZW50VG9vbGJhckJ1dHRvbkNsaWNrZWQoc2VuZGVyLCBhcmdzKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudXNlckludGVyYWN0aW9uQ29udHJvbGxlcikge1xyXG4gICAgICAgICAgICB0aGlzLnVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXIub25Ub29sYmFyQ2xpY2soc2VuZGVyLCBhcmdzKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25Vc2VyQ2hhcnRJbnRlcmFjdGlvbihzZW5kZXIsIGV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb25BcmdzOiBFdmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncykge1xyXG4gICAgICAgIGlmICh0aGlzLnVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXIpIHtcclxuICAgICAgICAgICAgdGhpcy51c2VySW50ZXJhY3Rpb25Db250cm9sbGVyLm9uQ2hhcnRJbnRlcmFjdGlvbihldmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncy5jaGFydEludGVyYWN0aW9uVHlwZSwgc2VuZGVyLCBldmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncy5ldmVudEFyZ3VtZW50cyk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXNpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHtcclxuICAgICAgICAkKFwiI0lubmVyQ2hhcnRWaWV3Q29udGFpbmVyXCIpWzBdLnN0eWxlLmhlaWdodCA9IGhlaWdodCArIFwicHhcIjtcclxuXHJcbiAgICAgICAgLy9JZiB3aWR0aCBpcyBub3QgZGVmaW5lZCwgaXQgbWVhbnMgaXQgaXMgZmlyc3QgcmVzaXplIGFuZCBzY3JvbGwgbmVlZHMgdG8gYmUgc2V0XHJcbiAgICAgICAgaWYgKCQoXCIjSW5uZXJDaGFydFZpZXdDb250YWluZXJcIilbMF0uc3R5bGUud2lkdGggPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgbGV0IHNjcm9sbGJhclNldHRpbmdzID0gdGhpcy5jb21wb25lbnQuZ2V0U2V0dGluZyhDaGFydFZpZXdXaWRnZXQuU2Nyb2xsYmFyU2V0dGluZ0lkKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTY3JvbGxCYXJTZXR0aW5ncyhzY3JvbGxiYXJTZXR0aW5ncyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKFwiI0lubmVyQ2hhcnRWaWV3Q29udGFpbmVyXCIpWzBdLnN0eWxlLndpZHRoID0gd2lkdGggKyBcInB4XCI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fbGF5b3V0TWFuYWdlciEucmVzaXplKHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUNoYXJ0cyh0cmFjZUNoYXJ0TGlzdDogQXJyYXk8SVRyYWNlQ2hhcnQ+KSB7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0TWFuYWdlciEudXBkYXRlQ2hhcnRzKHRoaXMuY2hhcnRNYW5hZ2VyIS50cmFjZUNoYXJ0TGlzdCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaENoYXJ0cyhzZW5kZXI6IElEYXRhTW9kZWwsIGRhdGE6IEV2ZW50TW9kZWxDaGFuZ2VkQXJncykge1xyXG4gICAgICAgIHRoaXMuY2hhcnRNYW5hZ2VyIS5vbkNoYXJ0TWFuYWdlck1vZGVsQ2hhbmdlZChzZW5kZXIgYXMgSUNoYXJ0TWFuYWdlckRhdGFNb2RlbCwgZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VHJhY2VDaGFydEJ5TmFtZShuYW1lOiBzdHJpbmcpOiBJVHJhY2VDaGFydHx1bmRlZmluZWR7XHJcbiAgICAgICAgaWYodGhpcy5jaGFydE1hbmFnZXIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2hhcnRNYW5hZ2VyLmdldFRyYWNlQ2hhcnRCeU5hbWUobmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UGFnZVNjcm9sbChlbmFibGU6IGJvb2xlYW4pIHtcclxuICAgICAgICBDaGFydFZpZXdXaWRnZXQuX3BhZ2VTY3JvbGxBY3RpdmUgPSBlbmFibGU7XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0UmVmZXJlbmNlQ3Vyc29yKGN1cnNvckluZGV4KSB7XHJcbiAgICAgICAgaWYgKHRoaXMudXNlckludGVyYWN0aW9uQ29udHJvbGxlcikge1xyXG4gICAgICAgICAgICB0aGlzLnVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXIuc2VsZWN0Q3Vyc29yKGN1cnNvckluZGV4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJVc2VySW50ZXJhY3Rpb25Db250cm9sbGVyIG5vdCBkZWZpbmVkXCIpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZGlzYWJsZU1vdXNlV2hlZWxGb3JTY3JvbGxiYXIoKSB7XHJcbiAgICAgICAgJChcIiNcIiArIHRoaXMuX2xheW91dE1hbmFnZXIhLmNoYXJ0U3BsaXR0ZXJQYXJlbnRDb250YWluZXJJZCkuYmluZCgnbW91c2V3aGVlbCBET01Nb3VzZVNjcm9sbCcsIGZ1bmN0aW9uIChlKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgZGlzYWJsZVNjcm9sbGJhclNjcm9sbCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgaWYgKENoYXJ0Vmlld1dpZGdldC5fcGFnZVNjcm9sbEFjdGl2ZSA9PSBmYWxzZSAmJiBlLnRhcmdldC5pZCAhPT0gJ0NoYXJ0Vmlld0NoYXJ0U3BsaXR0ZXJDb250YWluZXInKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS50eXBlID09ICdtb3VzZXdoZWVsJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVTY3JvbGxiYXJTY3JvbGwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZS50eXBlID09ICdET01Nb3VzZVNjcm9sbCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlU2Nyb2xsYmFyU2Nyb2xsID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZGlzYWJsZVNjcm9sbGJhclNjcm9sbCkge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRW5hYmxlIHBlcnNpc3RlbmN5IG9mIHNjcm9sbFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZW5hYmxlU2Nyb2xsUGVyc2lzdGluZygpIHtcclxuICAgICAgICBsZXQgd2lkZ2V0OiBDaGFydFZpZXdXaWRnZXQgPSB0aGlzO1xyXG4gICAgICAgICQoXCIjXCIgKyB0aGlzLl9sYXlvdXRNYW5hZ2VyIS5jaGFydFNwbGl0dGVyUGFyZW50Q29udGFpbmVySWQpLnNjcm9sbChmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgd2lkZ2V0Ll9zY3JvbGxiYXJUb3BQb3NpdGlvbiA9IHRoaXMuc2Nyb2xsVG9wO1xyXG4gICAgICAgICAgICB3aWRnZXQuc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldENvbXBvbmVudFNldHRpbmdzKG9ubHlNb2RpZmllZDogYm9vbGVhbik6IENvbXBvbmVudFNldHRpbmdze1xyXG5cdFx0dGhpcy5jb21wb25lbnQuc2V0U2V0dGluZyhDaGFydFZpZXdXaWRnZXQuU2Nyb2xsYmFyU2V0dGluZ0lkLCB0aGlzLmdldFNjcm9sbEJhclNldHRpbmdzKCkpO1xyXG5cdFx0cmV0dXJuIHN1cGVyLmdldENvbXBvbmVudFNldHRpbmdzKG9ubHlNb2RpZmllZCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByaXZhdGUgZ2V0U2Nyb2xsQmFyU2V0dGluZ3MoKTogYW55IHtcclxuXHRcdGxldCBzZXR0aW5ncyA9IHtcInZlcnRpY2FsXCI6IHRoaXMuX3Njcm9sbGJhclRvcFBvc2l0aW9ufTtcclxuXHRcdHJldHVybiBzZXR0aW5ncztcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIHNldFNjcm9sbEJhclNldHRpbmdzKGRhdGEpe1xyXG5cdFx0aWYoZGF0YSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcblx0XHR9XHJcblx0XHQkKFwiI1wiICsgdGhpcy5fbGF5b3V0TWFuYWdlciEuY2hhcnRTcGxpdHRlclBhcmVudENvbnRhaW5lcklkKVswXS5zY3JvbGxUbygwLCBkYXRhW1widmVydGljYWxcIl0pO1xyXG5cdH1cclxuXHJcbiAgICAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiNSZWdpb24gZHJvcCBzdXBwb3J0KioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgIGRyYWdTdGFydChhcmdzOiBEcmFnRHJvcEFyZ3MpIHtcclxuICAgICAgICBpZiAoYXJncy5kYXRhWzBdIGluc3RhbmNlb2YgQmFzZVNlcmllcykge1xyXG4gICAgICAgICAgICBsZXQgc2FtZUdyb3VwID0gdGhpcy5hcmVTZXJpZXNGcm9tU2FtZUdyb3VwKGFyZ3MuZGF0YSk7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcnRNYW5hZ2VyIS5hZGREcm9wcGFibGVMb2NhdGlvbnMoYXJncy5kYXRhLCBzYW1lR3JvdXApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkcmFnU3RvcChhcmdzOiBEcmFnRHJvcEFyZ3MpIHtcclxuICAgICAgICBpZiAoYXJncy5kYXRhWzBdIGluc3RhbmNlb2YgQmFzZVNlcmllcykge1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJ0TWFuYWdlciEucmVtb3ZlRHJvcHBhYmxlTG9jYXRpb25zKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRyYWdPdmVyKGFyZ3M6IERyYWdEcm9wQXJncyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHRoaXMuZHJvcFBvc3NpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIHRhcmdldENoYXJ0Q29udGFpbmVySWQgPSBhcmdzLmN1cnJlbnRUYXJnZXQucGFyZW50RWxlbWVudC5pZDtcclxuICAgICAgICB2YXIgdGFyZ2V0Q2hhcnQgPSB0aGlzLmNoYXJ0TWFuYWdlciEuZ2V0VHJhY2VDaGFydEJ5Q29udGFpbmVySWQodGFyZ2V0Q2hhcnRDb250YWluZXJJZCk7XHJcbiAgICAgICAgbGV0IGNoYXJ0TWFuYWdlckRhdGFNb2RlbCA9IHRoaXMuZGF0YU1vZGVsIGFzIElDaGFydE1hbmFnZXJEYXRhTW9kZWw7XHJcbiAgICAgICAgbGV0IGRyb3BIZWxwZXIgPSBuZXcgQ2hhcnREcm9wSGVscGVyKGNoYXJ0TWFuYWdlckRhdGFNb2RlbCwgdGhpcyk7XHJcbiAgICAgICAgbGV0IGNoYXJ0QXJlYSA9IHRoaXMuZ2V0Q2hhcnRBcmVhSWQoYXJncy5jdXJyZW50VGFyZ2V0KTtcclxuICAgICAgICBpZiAodGFyZ2V0Q2hhcnQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIC8vIERyYWcgb3ZlciBhIGNoYXJ0L2NoYXJ0IHdpZGdldFxyXG4gICAgICAgICAgICBsZXQgc2VyaWVzID0gYXJncy5kYXRhIGFzIEFycmF5PEJhc2VTZXJpZXM+O1xyXG4gICAgICAgICAgICBsZXQgY2hhcnQgPSB0YXJnZXRDaGFydCBhcyBDaGFydEJhc2U7XHJcbiAgICAgICAgICAgIGxldCBkcm9wTG9jYXRpb25UeXBlID0gZHJvcEhlbHBlci5nZXREcm9wTG9jYXRpb25UeXBlKGFyZ3MuY3VycmVudFRhcmdldCwgY2hhcnQsIHNlcmllcyk7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhZ0FuZERyb3BSZXByZXNlbnRhdGlvbihjaGFydCwgc2VyaWVzLCBkcm9wTG9jYXRpb25UeXBlLCBhcmdzLmRyYWdEcm9wUmVwcmVzZW50YXRpb24pO1xyXG4gICAgICAgICAgICB0aGlzLmhpZ2hsaWdodERyb3BwYWJsZUFyZWFzKGNoYXJ0LCBhcmdzLmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChkcm9wSGVscGVyLmNhbkFkZENoYXJ0KCkgPT0gdHJ1ZSkgeyAgLy8gSXMgaXQgcG9zc2libGUgdG8gYWRkIG9uZSBtb3JlIGNoYXJ0XHJcbiAgICAgICAgICAgIHRoaXMucmVzZXRIaWdobGlnaHRpbmcoKTtcclxuICAgICAgICAgICAgLy8gTWF5YmUgZHJhZyBvdmVyIGVtcHR5IHNwYWNlXHJcbiAgICAgICAgICAgIGlmIChjaGFydEFyZWEgPT0gXCJDaGFydFZpZXdDaGFydFNwbGl0dGVyX21haW5fbGFzdFBhbmVfWVRcIiApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJvcFBvc3NpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlRHJhZ0Ryb3BSZXByZXNlbnRhdGlvbihhcmdzLmRyYWdEcm9wUmVwcmVzZW50YXRpb24sIFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9kcmFnRHJvcC9hZGROZXdZVENoYXJ0LnN2Z1wiLCBcIkNyZWF0ZSBhIG5ldyBZVCBjaGFydCBhbmQgYWRkIGRyYWdnZWQgc2lnbmFsc1wiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQ2hhcnRUeXBlRHJvcHBhYmxlQXJlYXMoY2hhcnRBcmVhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChjaGFydEFyZWEgPT0gXCJDaGFydFZpZXdDaGFydFNwbGl0dGVyX21haW5fbGFzdFBhbmVfRkZUXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJvcFBvc3NpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlRHJhZ0Ryb3BSZXByZXNlbnRhdGlvbihhcmdzLmRyYWdEcm9wUmVwcmVzZW50YXRpb24sIFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9kcmFnRHJvcC9hZGROZXdGRlRDaGFydC5zdmdcIiwgXCJDcmVhdGUgYSBuZXcgRkZUIGNoYXJ0IGFuZCBhZGQgZHJhZ2dlZCBzaWduYWxzXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVDaGFydFR5cGVEcm9wcGFibGVBcmVhcyhjaGFydEFyZWEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGNoYXJ0QXJlYSA9PSBcIkNoYXJ0Vmlld0NoYXJ0U3BsaXR0ZXJfbWFpbl9sYXN0UGFuZV9YWVwiKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJvcFBvc3NpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlRHJhZ0Ryb3BSZXByZXNlbnRhdGlvbihhcmdzLmRyYWdEcm9wUmVwcmVzZW50YXRpb24sIFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9kcmFnRHJvcC9hZGROZXdYWUNoYXJ0LnN2Z1wiLCBcIkNyZWF0ZSBhIG5ldyBYWSBjaGFydCBhbmQgYWRkIGEgY2FsY3VsYXRlZCBYWSBzaWduYWxcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUNoYXJ0VHlwZURyb3BwYWJsZUFyZWFzKGNoYXJ0QXJlYSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNoYXJ0QXJlYSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDaGFydFR5cGVEcm9wcGFibGVBcmVhcyhjaGFydEFyZWEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gdGhpcy5kcm9wUG9zc2libGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmFnQW5kRHJvcFJlcHJlc2VudGF0aW9uKGNoYXJ0OiBJVHJhY2VDaGFydCwgc2VyaWVzOiBBcnJheTxCYXNlU2VyaWVzPiwgZHJvcExvY2F0aW9uVHlwZTogRHJvcExvY2F0aW9uVHlwZSwgZHJhZ0Ryb3BSZXByZXNlbnRhdGlvbil7XHJcbiAgICAgICAgaWYoY2hhcnQudHlwZSA9PSBDaGFydFR5cGUuWVRDaGFydCB8fCBjaGFydC50eXBlID09IENoYXJ0VHlwZS5GRlRDaGFydCl7XHJcbiAgICAgICAgICAgIGlmIChkcm9wTG9jYXRpb25UeXBlID09IERyb3BMb2NhdGlvblR5cGUuYWRkTmV3U2NhbGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJvcFBvc3NpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmKHNlcmllc1swXS50eXBlID09PSBTZXJpZXNUeXBlLnRpbWVTZXJpZXMgJiYgY2hhcnQudHlwZSA9PSBDaGFydFR5cGUuRkZUQ2hhcnQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVEcmFnRHJvcFJlcHJlc2VudGF0aW9uKGRyYWdEcm9wUmVwcmVzZW50YXRpb24sIFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9kcmFnRHJvcC9hZGROZXdTY2FsZS5zdmdcIiwgXCJDYWxjdWxhdGUgRkZUIHNpZ25hbCBhbmQgYWRkIGl0IHRvIG5ldyBzY2FsZVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlRHJhZ0Ryb3BSZXByZXNlbnRhdGlvbihkcmFnRHJvcFJlcHJlc2VudGF0aW9uLCBcIi4uL2FwcC93aWRnZXRzL2NvbW1vbi9zdHlsZS9pbWFnZXMvZHJhZ0Ryb3AvYWRkTmV3U2NhbGUuc3ZnXCIsIFwiQ3JlYXRlIGEgbmV3IHNjYWxlIGFuZCBhZGQgZHJhZ2dlZCBzaWduYWxzXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGRyb3BMb2NhdGlvblR5cGUgPT0gRHJvcExvY2F0aW9uVHlwZS5hc3NpZ25Ub1NjYWxlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyb3BQb3NzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpZihzZXJpZXNbMF0udHlwZSA9PT0gU2VyaWVzVHlwZS50aW1lU2VyaWVzICYmIGNoYXJ0LnR5cGUgPT0gQ2hhcnRUeXBlLkZGVENoYXJ0ICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlRHJhZ0Ryb3BSZXByZXNlbnRhdGlvbihkcmFnRHJvcFJlcHJlc2VudGF0aW9uLCBcIi4uL2FwcC93aWRnZXRzL2NvbW1vbi9zdHlsZS9pbWFnZXMvZHJhZ0Ryb3AvYXNzaWduVG9TY2FsZS5zdmdcIiwgXCJDYWxjdWxhdGUgRkZUIHNpZ25hbCBhbmQgYWRkIGl0IHRvIHNjYWxlXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVEcmFnRHJvcFJlcHJlc2VudGF0aW9uKGRyYWdEcm9wUmVwcmVzZW50YXRpb24sIFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9kcmFnRHJvcC9hc3NpZ25Ub1NjYWxlLnN2Z1wiLCBcIkFkZCBkcmFnZ2VkIHNpZ25hbHMgdG8gc2NhbGVcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChkcm9wTG9jYXRpb25UeXBlID09IERyb3BMb2NhdGlvblR5cGUuYXNzaWduVG9TY2FsZSAmJiB0aGlzLmFyZVNlcmllc0Zyb21TYW1lR3JvdXAoc2VyaWVzKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kcm9wUG9zc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaWYoc2VyaWVzWzBdLnR5cGUgPT0gU2VyaWVzVHlwZS50aW1lU2VyaWVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVEcmFnRHJvcFJlcHJlc2VudGF0aW9uKGRyYWdEcm9wUmVwcmVzZW50YXRpb24sIFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9kcmFnRHJvcC9hc3NpZ25Ub0NoYXJ0LnN2Z1wiLCBcIkNhbGN1bGF0ZSBYWSBzaWduYWwgYW5kIGFkZCBpdCB0byB0aGUgY2hhcnRcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZURyYWdEcm9wUmVwcmVzZW50YXRpb24oZHJhZ0Ryb3BSZXByZXNlbnRhdGlvbiwgXCIuLi9hcHAvd2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL2RyYWdEcm9wL2Fzc2lnblRvQ2hhcnQuc3ZnXCIsIFwiQWRkIGRyYWdnZWQgc2lnbmFscyB0byBjaGFydFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGRyYWcgYW5kIGRyb3AgcmVwcmVzZW50YXRpb24gd2hpbGUgZHJhZ2dpbmcgd2l0aCBuZXcgaWNvbnMgb3IgdGV4dHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtEcmFnRHJvcFJlcHJlc2VudGF0aW9ufSBkcmFnRHJvcFJlcHJlc2VudGF0aW9uXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gb3ZlcmxheUljb25QYXRoXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmV3VGV4dFxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZURyYWdEcm9wUmVwcmVzZW50YXRpb24oZHJhZ0Ryb3BSZXByZXNlbnRhdGlvbjogRHJhZ0Ryb3BSZXByZXNlbnRhdGlvbnx1bmRlZmluZWQsIG92ZXJsYXlJY29uUGF0aDogc3RyaW5nLCBuZXdUZXh0OiBzdHJpbmcpe1xyXG4gICAgICAgIGlmKGRyYWdEcm9wUmVwcmVzZW50YXRpb24gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gQWRkIG92ZXJsYXkgaWNvbiBpZiBhdmFpbGFibGVcclxuICAgICAgICAgICAgaWYob3ZlcmxheUljb25QYXRoICE9IFwiXCIpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGltYWdlUHJvdmlkZXIgPSB0aGlzLmNvbXBvbmVudC5nZXRTdWJDb21wb25lbnQoRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLkltYWdlUHJvdmlkZXJJZCkgYXMgSUltYWdlUHJvdmlkZXI7XHJcbiAgICAgICAgICAgICAgICBpZihpbWFnZVByb3ZpZGVyICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFkZE5ld1NjYWxlSW1hZ2UgPSBpbWFnZVByb3ZpZGVyLmdldEltYWdlKG92ZXJsYXlJY29uUGF0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYWRkTmV3U2NhbGVJbWFnZSAhPSBcIlwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJhZ0Ryb3BSZXByZXNlbnRhdGlvbi5pY29uTGlzdC5wdXNoKGFkZE5ld1NjYWxlSW1hZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBhZGQgdGV4dCBvciByZXBsYWNlIGV4aXN0aW5nIHRleHRcclxuICAgICAgICAgICAgaWYoZHJhZ0Ryb3BSZXByZXNlbnRhdGlvbi50ZXh0TGlzdC5sZW5ndGggPT0gMCl7XHJcbiAgICAgICAgICAgICAgICBkcmFnRHJvcFJlcHJlc2VudGF0aW9uLnRleHRMaXN0LnB1c2gobmV3VGV4dCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGRyYWdEcm9wUmVwcmVzZW50YXRpb24udGV4dExpc3RbMF0gPSBuZXdUZXh0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRyb3AoYXJnczogRHJhZ0Ryb3BBcmdzKSB7XHJcbiAgICAgICAgbGV0IHNlcmllcyA9IGFyZ3MuZGF0YSBhcyBBcnJheTxCYXNlU2VyaWVzPjtcclxuICAgICAgICBpZiAodGhpcy5kcm9wUG9zc2libGUpIHsgLy8gSXMgZHJvcCBwb3NzaWJsZVxyXG4gICAgICAgICAgICBsZXQgY2hhcnRNYW5hZ2VyRGF0YU1vZGVsID0gdGhpcy5kYXRhTW9kZWwgYXMgSUNoYXJ0TWFuYWdlckRhdGFNb2RlbDtcclxuICAgICAgICAgICAgbGV0IGRyb3BIZWxwZXIgPSBuZXcgQ2hhcnREcm9wSGVscGVyKGNoYXJ0TWFuYWdlckRhdGFNb2RlbCwgdGhpcyk7XHJcbiAgICAgICAgICAgIGxldCB0YXJnZXRDaGFydCA9IHRoaXMuY2hhcnRNYW5hZ2VyIS5nZXRUcmFjZUNoYXJ0QnlDb250YWluZXJJZChhcmdzLmN1cnJlbnRUYXJnZXQucGFyZW50RWxlbWVudC5pZCk7XHJcbiAgICAgICAgICAgIGlmICh0YXJnZXRDaGFydCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGNoYXJ0OiBJQ2hhcnRNYW5hZ2VyQ2hhcnQgfCB1bmRlZmluZWQgPSBjaGFydE1hbmFnZXJEYXRhTW9kZWwuZ2V0Q2hhcnQodGFyZ2V0Q2hhcnQud2lkZ2V0TmFtZSk7XHJcbiAgICAgICAgICAgICAgICBzZXJpZXMgPSBTZXJpZUNoYXJ0VHlwZUhlbHBlci5nZXREcm9wcGFibGVTZXJpZXMoY2hhcnQhLmdldEFsbFNlcmllcygpLHNlcmllcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZHJvcEhlbHBlci5hZGRTZXJpZXMoYXJncy5jdXJyZW50VGFyZ2V0LCB0YXJnZXRDaGFydCwgc2VyaWVzLCB0aGlzLl9sYXlvdXRNYW5hZ2VyISk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTW91c2UgaXMgbm90IG92ZXIgY2hhcnRWaWV3IHdoaWxlIGRyYWdnaW5nIG9wZXJhdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7RHJhZ0Ryb3BBcmdzfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkcm9wRm9jdXNMb3N0KGFyZ3M6IERyYWdEcm9wQXJncykge1xyXG4gICAgICAgIHRoaXMudXBkYXRlQ2hhcnRUeXBlRHJvcHBhYmxlQXJlYXMoYXJncy5jdXJyZW50VGFyZ2V0KTtcclxuICAgICAgICB0aGlzLnJlc2V0SGlnaGxpZ2h0aW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIaWdobGlnaHRzIGFyZWFzIHdoZXJlIHNpZ25hbHMgaXMgYmVpbmcgZHJhZ2dlZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Q2hhcnRCYXNlfSBjaGFydFxyXG4gICAgICogQHBhcmFtIHsqfSBjdXJyZW50VGFyZ2V0XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaGlnaGxpZ2h0RHJvcHBhYmxlQXJlYXMoY2hhcnQ6IENoYXJ0QmFzZSwgY3VycmVudFRhcmdldCl7XHJcbiAgICAgICAgaWYoY3VycmVudFRhcmdldC5pZC5pbmNsdWRlcyhcIl9heGlzRHJvcFpvbmVTY2FsZVwiKSB8fCBjdXJyZW50VGFyZ2V0LmlkLmluY2x1ZGVzKFwiX2F4aXNEcm9wWm9uZV9jaGFydEFyZWFcIikgfHwgY3VycmVudFRhcmdldC5pZC5pbmNsdWRlcyhcIl9yZWZDdXJzb3JfXCIpKXtcclxuICAgICAgICAgICAgY2hhcnQudXBkYXRlRHJvcHBhYmxlQXJlYXMoY3VycmVudFRhcmdldCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVzZXRIaWdobGlnaHRpbmcoY2hhcnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yZXNldEhpZ2hsaWdodGluZygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlc2V0IGhpZ2hsaWdodGVkIGFyZWFzIGZvciBhbGwgY2hhcnRzLCBleGNlcHQgdGhlIHNlbGVjdGVkIG9uZSBcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lUcmFjZUNoYXJ0fSBbY2hhcnRdXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVzZXRIaWdobGlnaHRpbmcoY2hhcnQ/OiBJVHJhY2VDaGFydCl7XHJcbiAgICAgICAgbGV0IHRyYWNlQ2hhcnRzOiBBcnJheTxJVHJhY2VDaGFydD4gPSB0aGlzLmNoYXJ0TWFuYWdlciEudHJhY2VDaGFydExpc3Q7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRyYWNlQ2hhcnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFydCAhPSB0cmFjZUNoYXJ0c1tpXSl7XHJcbiAgICAgICAgICAgICAgICB0cmFjZUNoYXJ0c1tpXS5yZXNldEhpZ2hsaWdodGluZygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlIGhpZ2hsaWdodGluZyBzdGF0ZSBmb3IgY2hhcnQgVHlwZSBhcmVhc1xyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBwYXJhbSB7KHN0cmluZyB8IHVuZGVmaW5lZCl9IGN1cnJlbnRUYXJnZXRJZFxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgdXBkYXRlQ2hhcnRUeXBlRHJvcHBhYmxlQXJlYXMoY3VycmVudFRhcmdldElkOiBzdHJpbmcgfCB1bmRlZmluZWQpe1xyXG4gICAgICAgIGxldCBlbXB0eVNwYWNlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdDaGFydFZpZXdDaGFydFNwbGl0dGVyX21haW5fbGFzdFBhbmUnKTtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgZW1wdHlTcGFjZUVsZW1lbnQhLmNoaWxkRWxlbWVudENvdW50OyBpID0gaSArIDEpe1xyXG4gICAgICAgICAgICBpZiAoZW1wdHlTcGFjZUVsZW1lbnQhLmNoaWxkcmVuW2ldLmlkID09IGN1cnJlbnRUYXJnZXRJZCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbXB0eVNwYWNlRWxlbWVudCEuY2hpbGRyZW5baV0uaWQpO1xyXG4gICAgICAgICAgICAgICAgYXJlYSEuY2xhc3NMaXN0LmFkZCgnZHJhZ2dlZE92ZXInKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCBhcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZW1wdHlTcGFjZUVsZW1lbnQhLmNoaWxkcmVuW2ldLmlkKTtcclxuICAgICAgICAgICAgICAgIGFyZWEhLmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWdnZWRPdmVyJyk7ICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgY2hhcnQgYXJlYSBpZCBcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSB0YXJnZXRcclxuICAgICAqIEByZXR1cm5zIHsoc3RyaW5nIHwgdW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldENoYXJ0QXJlYUlkKHRhcmdldDogSFRNTEVsZW1lbnQpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGxldCB5dEFyZWEgPSAnQ2hhcnRWaWV3Q2hhcnRTcGxpdHRlcl9tYWluX2xhc3RQYW5lX1lUJztcclxuICAgICAgICBsZXQgZmZ0QXJlYSA9ICdDaGFydFZpZXdDaGFydFNwbGl0dGVyX21haW5fbGFzdFBhbmVfRkZUJztcclxuICAgICAgICBsZXQgeHlBcmVhID0gJ0NoYXJ0Vmlld0NoYXJ0U3BsaXR0ZXJfbWFpbl9sYXN0UGFuZV9YWSc7XHJcblxyXG4gICAgICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNhYmxlZCcpIHx8IHRhcmdldCEucGFyZW50RWxlbWVudCEuY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNhYmxlZCcpKXtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGFyZ2V0LmlkID09IHl0QXJlYSB8fCB0YXJnZXQhLnBhcmVudEVsZW1lbnQhLmlkID09IHl0QXJlYSkge1xyXG4gICAgICAgICAgICByZXR1cm4geXRBcmVhO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0YXJnZXQuaWQgPT0gZmZ0QXJlYSB8fCB0YXJnZXQhLnBhcmVudEVsZW1lbnQhLmlkID09IGZmdEFyZWEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZmdEFyZWE7XHJcbiAgICAgICAgfSBcclxuICAgICAgICBlbHNlIGlmICh0YXJnZXQuaWQgPT0geHlBcmVhIHx8IHRhcmdldCEucGFyZW50RWxlbWVudCEuaWQgPT0geHlBcmVhKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB4eUFyZWE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgZHJhZyBzZXJpZXMgYmVsb25nIHRvIHRoZSBzYW1lIHNlcmllIGdyb3VwXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8QmFzZVNlcmllcz59IHNlcmllc1xyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXJlU2VyaWVzRnJvbVNhbWVHcm91cChzZXJpZXM6IEFycmF5PEJhc2VTZXJpZXM+KTogYm9vbGVhbntcclxuICAgICAgICBsZXQgcGFyZW50ID0gc2VyaWVzWzBdLnBhcmVudDtcclxuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IHNlcmllcy5sZW5ndGg7IGkgPSBpICsgMSl7XHJcbiAgICAgICAgICAgIGlmIChzZXJpZXNbaV0ucGFyZW50ICE9IHBhcmVudCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqI2VuZHJlZ2lvbiBkcm9wIHN1cHBvcnQqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG59XHJcblxyXG5leHBvcnQgeyBDaGFydFZpZXdXaWRnZXQsIENoYXJ0Vmlld1Rvb2xzLCBab29tRGlyZWN0aW9uLCBFdmVudERyb3BIZWxwZXJ9O1xyXG5cclxuIl19