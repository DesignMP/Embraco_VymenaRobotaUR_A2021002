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
define(["require", "exports", "./chartViewChartManager", "../chartViewWidget/chartViewLayoutManager", "../common/widgetBase", "../../framework/events", "../chartWidget/userInteraction/userInteractionController", "../chartWidget/userInteraction/commands/setCursorCommand", "../chartWidget/userInteraction/commands/resetZoomCommand", "../chartWidget/ChartBase", "../chartWidget/userInteraction/commands/cursorHoveringCommand", "../chartWidget/userInteraction/commands/dragCursorCommand", "../chartWidget/userInteraction/commands/endCursorDragCommand", "../chartWidget/userInteraction/commands/panChartCommand", "../chartWidget/userInteraction/commands/toogleBoxZoomCommand", "../chartWidget/userInteraction/commands/tooglePanningCommand", "../chartWidget/userInteraction/commands/selectZoomAxesCommand", "../../models/chartManagerDataModel/chartManagerChart", "../common/interfaces/dropInterface", "../chartWidget/userInteraction/commands/zoomChartCommand", "../chartWidget/userInteraction/commands/selectPanningAxesCommand", "../../models/chartManagerDataModel/baseSeries", "./helpers/chartDropHelper", "../chartWidget/userInteraction/commands/autoScaleCommand", "../common/imageProvider", "../chartWidget/userInteraction/commands/resetDragPositionCommand", "../common/SerieChartTypeHelper", "../../models/chartManagerDataModel/seriesType", "./defaultComponentSettings"], function (require, exports, chartViewChartManager_1, chartViewLayoutManager_1, widgetBase_1, events_1, userInteractionController_1, setCursorCommand_1, resetZoomCommand_1, ChartBase_1, cursorHoveringCommand_1, dragCursorCommand_1, endCursorDragCommand_1, panChartCommand_1, toogleBoxZoomCommand_1, tooglePanningCommand_1, selectZoomAxesCommand_1, chartManagerChart_1, dropInterface_1, zoomChartCommand_1, selectPanningAxesCommand_1, baseSeries_1, chartDropHelper_1, autoScaleCommand_1, imageProvider_1, resetDragPositionCommand_1, SerieChartTypeHelper_1, seriesType_1, defaultComponentSettings_1) {
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
            _this.chartCommandMap = {};
            _this._userInteractionControllerExecuteChartCommandHandler = function (sender, args) { return _this.onExecuteChartCommand(sender, args); };
            return _this;
            //#endregion drop support
        }
        ChartViewWidget.prototype.initialize = function (layoutContainerId) {
            _super.prototype.initialize.call(this, layoutContainerId);
            this.addSupportedDragDropDataId(dropInterface_1.DragDropDataId.signal);
        };
        ChartViewWidget.prototype.initializeComponent = function () {
            this.component.defaultSettingsDataId = defaultComponentSettings_1.DefaultComponentSettings.WidgetDefinitionId;
            this.component.disablePersisting();
        };
        /**
         * Dispose the objects from this widget
         *
         * @memberof ChartViewWidget
         */
        ChartViewWidget.prototype.dispose = function () {
            this.removeSupportedDragDropDataId(dropInterface_1.DragDropDataId.signal);
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
            this._layoutManager = new chartViewLayoutManager_1.ChartViewLayoutManager(this);
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
         * @returns {*}
         * @memberof ChartViewWidget
         */
        ChartViewWidget.prototype.getDefaultComponentSettings = function () {
            return defaultComponentSettings_1.DefaultComponentSettings.getChartViewWidgetDefinition();
        };
        ChartViewWidget.prototype.initialized = function () {
            this.initChartManagerDataModel();
            if (this.userInteractionController) {
                this.chartManager = new chartViewChartManager_1.ChartViewChartManager(this, this.userInteractionController, this._layoutManager, this.dataModel);
            }
            this.addChartCommands();
            this._layoutManager.initializeChartViewLayout(this.chartManager.traceChartList);
            this.disableMouseWheelForScrollbar();
            this.chartManager.initChartViewWithDataModel();
        };
        ChartViewWidget.prototype.initChartManagerDataModel = function () {
            var dataModel = this.component.getSubComponent("ChartManagerDataModel");
            this.dataModel = dataModel;
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
            $("#InnerChartViewContainer")[0].style.width = width + "px";
            $("#InnerChartViewContainer")[0].style.height = height + "px";
            this._layoutManager.resize(width, height);
        };
        ChartViewWidget.prototype.updateCharts = function (traceChartList) {
            this._layoutManager.updateCharts(this.chartManager.traceChartList);
        };
        ChartViewWidget.prototype.refreshCharts = function (sender, data) {
            this.chartManager.onChartManagerModelChanged(sender, data);
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
                if (ChartViewWidget._pageScrollActive == false) {
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
        //#region drop support
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
                        this.updateDragDropRepresentation(dragDropRepresentation, "../app/widgets/common/style/images/dragDrop/addNewScale.svg", "Calculate FFT singal and add it to new scale");
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
                    var addNewScaleImage = imageProvider_1.ImageProvider.getInstance().getImage(overlayIconPath);
                    if (addNewScaleImage != "") {
                        dragDropRepresentation.iconList.push(addNewScaleImage);
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
                    var serieChartTypeHelper = new SerieChartTypeHelper_1.SerieChartTypeHelper();
                    series = serieChartTypeHelper.getDroppableSeries(chart.getAllSeries(), series);
                }
                dropHelper.addSeries(args.currentTarget, targetChart, series, this._layoutManager);
            }
        };
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
        return ChartViewWidget;
    }(widgetBase_1.WidgetBase));
    exports.ChartViewWidget = ChartViewWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRWaWV3V2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0Vmlld1dpZGdldC9jaGFydFZpZXdXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQW9DQTtRQUE4QixtQ0FBc0I7UUFBcEQ7O1FBQXVELENBQUM7UUFBRCxzQkFBQztJQUFELENBQUMsQUFBeEQsQ0FBOEIsbUJBQVUsR0FBZ0I7SUF5ZEMsMENBQWU7SUF6ZGhCLENBQUM7SUFFekQsSUFBSyxjQVFKO0lBUkQsV0FBSyxjQUFjO1FBQ2YsbURBQUksQ0FBQTtRQUNKLDJFQUFnQixDQUFBO1FBQ2hCLDJFQUFnQixDQUFBO1FBQ2hCLCtEQUFVLENBQUE7UUFDVixpRUFBVyxDQUFBO1FBQ1gseURBQU8sQ0FBQTtRQUNQLHlEQUFPLENBQUE7SUFDWCxDQUFDLEVBUkksY0FBYyxLQUFkLGNBQWMsUUFRbEI7SUErY3lCLHdDQUFjO0lBN2N4QyxJQUFLLGFBSUo7SUFKRCxXQUFLLGFBQWE7UUFDZCwyQ0FBQyxDQUFBO1FBQ0QsMkNBQUMsQ0FBQTtRQUNELDZDQUFFLENBQUE7SUFDTixDQUFDLEVBSkksYUFBYSxLQUFiLGFBQWEsUUFJakI7SUF5Y3lDLHNDQUFhO0lBdmN2RDtRQUE4QixtQ0FBVTtRQUF4QztZQUFBLHFFQXFjQztZQW5jRyxxQkFBZSxHQUFvQixJQUFJLGVBQWUsRUFBRSxDQUFDO1lBT3pELDRCQUFzQixHQUFHLGFBQWEsQ0FBQyxFQUFFLENBQUM7WUFDMUMsa0JBQVksR0FBWSxLQUFLLENBQUM7WUFHdEIscUJBQWUsR0FBdUMsRUFBRSxDQUFDO1lBRXpELDBEQUFvRCxHQUFHLFVBQUMsTUFBTSxFQUFDLElBQUksSUFBRyxPQUFBLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQXhDLENBQXdDLENBQUM7O1lBcWJ2SCx5QkFBeUI7UUFD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YyxDQUFDLEVBQUUsSUFBSSxPQUFPLEVBQUU7Z0JBQ25FLE9BQU8sT0FBTyxDQUFDO2FBQ2xCO2lCQUNJLElBQUksTUFBTSxDQUFDLEVBQUUsSUFBSSxNQUFNLElBQUksTUFBTyxDQUFDLGFBQWMsQ0FBQyxFQUFFLElBQUksTUFBTSxFQUFFO2dCQUNqRSxPQUFPLE1BQU0sQ0FBQzthQUNqQjtZQUNELE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0ssZ0RBQXNCLEdBQTlCLFVBQStCLE1BQXlCO1lBQ3BELElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDOUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUM7Z0JBQ3pDLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxNQUFNLEVBQUM7b0JBQzNCLE9BQU8sS0FBSyxDQUFDO2lCQUNoQjthQUNKO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQXZiTSxpQ0FBaUIsR0FBWSxLQUFLLENBQUM7UUEwYjlDLHNCQUFDO0tBQUEsQUFyY0QsQ0FBOEIsdUJBQVUsR0FxY3ZDO0lBRVEsMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFydFZpZXdDaGFydE1hbmFnZXIgfSBmcm9tIFwiLi9jaGFydFZpZXdDaGFydE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgQ2hhcnRWaWV3TGF5b3V0TWFuYWdlciB9IGZyb20gXCIuLi9jaGFydFZpZXdXaWRnZXQvY2hhcnRWaWV3TGF5b3V0TWFuYWdlclwiO1xyXG5pbXBvcnQgeyBXaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi93aWRnZXRCYXNlXCI7XHJcbmltcG9ydCB7IElUcmFjZUNoYXJ0IH0gZnJvbSBcIi4uL2NoYXJ0V2lkZ2V0L2ludGVyZmFjZXMvdHJhY2VDaGFydEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUeXBlZEV2ZW50IH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9ldmVudHNcIjtcclxuaW1wb3J0IHsgVXNlckludGVyYWN0aW9uQ29udHJvbGxlciwgQ2hhcnRDb21tYW5kVHlwZSB9IGZyb20gXCIuLi9jaGFydFdpZGdldC91c2VySW50ZXJhY3Rpb24vdXNlckludGVyYWN0aW9uQ29udHJvbGxlclwiO1xyXG5pbXBvcnQgeyBTZXRDdXJzb3JPblBvaW50ZXJQb3NpdGlvbkNvbW1hbmQgfSBmcm9tIFwiLi4vY2hhcnRXaWRnZXQvdXNlckludGVyYWN0aW9uL2NvbW1hbmRzL3NldEN1cnNvckNvbW1hbmRcIjtcclxuaW1wb3J0IHsgUmVzZXRab29tQ29tbWFuZCB9IGZyb20gXCIuLi9jaGFydFdpZGdldC91c2VySW50ZXJhY3Rpb24vY29tbWFuZHMvcmVzZXRab29tQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBDaGFydENvbW1hbmRCYXNlIH0gZnJvbSBcIi4uL2NoYXJ0V2lkZ2V0L3VzZXJJbnRlcmFjdGlvbi9jaGFydENvbW1hbmRCYXNlXCI7XHJcbmltcG9ydCB7IEV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb25BcmdzLCBDaGFydEJhc2UsIERyb3BMb2NhdGlvblR5cGUgfSBmcm9tIFwiLi4vY2hhcnRXaWRnZXQvQ2hhcnRCYXNlXCI7XHJcbmltcG9ydCB7IENoZWNrQ3Vyc29ySG92ZXJpbmdDb21tYW5kIH0gZnJvbSBcIi4uL2NoYXJ0V2lkZ2V0L3VzZXJJbnRlcmFjdGlvbi9jb21tYW5kcy9jdXJzb3JIb3ZlcmluZ0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgRHJhZ0N1cnNvckNvbW1hbmQgfSBmcm9tIFwiLi4vY2hhcnRXaWRnZXQvdXNlckludGVyYWN0aW9uL2NvbW1hbmRzL2RyYWdDdXJzb3JDb21tYW5kXCI7XHJcbmltcG9ydCB7IEVuZEN1cnNvckRyYWdDb21tYW5kIH0gZnJvbSBcIi4uL2NoYXJ0V2lkZ2V0L3VzZXJJbnRlcmFjdGlvbi9jb21tYW5kcy9lbmRDdXJzb3JEcmFnQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBQYW5DaGFydENvbW1hbmQgfSBmcm9tIFwiLi4vY2hhcnRXaWRnZXQvdXNlckludGVyYWN0aW9uL2NvbW1hbmRzL3BhbkNoYXJ0Q29tbWFuZFwiO1xyXG5pbXBvcnQgeyBUb29nbGVCb3hab29tQ29tbWFuZCBhcyBUb2dnbGVCb3hab29tQ29tbWFuZCB9IGZyb20gXCIuLi9jaGFydFdpZGdldC91c2VySW50ZXJhY3Rpb24vY29tbWFuZHMvdG9vZ2xlQm94Wm9vbUNvbW1hbmRcIjtcclxuaW1wb3J0IHsgVG9vZ2xlUGFubmluZ0NvbW1hbmQgfSBmcm9tIFwiLi4vY2hhcnRXaWRnZXQvdXNlckludGVyYWN0aW9uL2NvbW1hbmRzL3Rvb2dsZVBhbm5pbmdDb21tYW5kXCI7XHJcbmltcG9ydCB7IFNlbGVjdFpvb21BeGVzQ29tbWFuZCB9IGZyb20gXCIuLi9jaGFydFdpZGdldC91c2VySW50ZXJhY3Rpb24vY29tbWFuZHMvc2VsZWN0Wm9vbUF4ZXNDb21tYW5kXCI7XHJcbmltcG9ydCB7IENoYXJ0VHlwZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2NoYXJ0TWFuYWdlckNoYXJ0XCI7XHJcbmltcG9ydCB7IElEcm9wcGFibGUsIERyYWdEcm9wRGF0YUlkIH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL2Ryb3BJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgWm9vbUNoYXJ0Q29tbWFuZCB9IGZyb20gXCIuLi9jaGFydFdpZGdldC91c2VySW50ZXJhY3Rpb24vY29tbWFuZHMvem9vbUNoYXJ0Q29tbWFuZFwiO1xyXG5pbXBvcnQgeyBTZWxlY3RQYW5uaW5nQXhlc0NvbW1hbmQgfSBmcm9tIFwiLi4vY2hhcnRXaWRnZXQvdXNlckludGVyYWN0aW9uL2NvbW1hbmRzL3NlbGVjdFBhbm5pbmdBeGVzQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvYmFzZVNlcmllc1wiO1xyXG5pbXBvcnQgeyBJQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvaW50ZXJmYWNlcy9jaGFydE1hbmFnZXJEYXRhTW9kZWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ2hhcnREcm9wSGVscGVyIH0gZnJvbSBcIi4vaGVscGVycy9jaGFydERyb3BIZWxwZXJcIjtcclxuaW1wb3J0IHsgQXV0b1NjYWxlQ29tbWFuZCB9IGZyb20gXCIuLi9jaGFydFdpZGdldC91c2VySW50ZXJhY3Rpb24vY29tbWFuZHMvYXV0b1NjYWxlQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBJbWFnZVByb3ZpZGVyIH0gZnJvbSBcIi4uL2NvbW1vbi9pbWFnZVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IERyYWdEcm9wQXJncyB9IGZyb20gXCIuLi9jb21tb24vZHJhZ0Ryb3BBcmdzXCI7XHJcbmltcG9ydCB7IFJlc2V0RHJhZ1Bvc2l0aW9uQ29tbWFuZCB9IGZyb20gXCIuLi9jaGFydFdpZGdldC91c2VySW50ZXJhY3Rpb24vY29tbWFuZHMvcmVzZXREcmFnUG9zaXRpb25Db21tYW5kXCI7XHJcbmltcG9ydCB7IERyYWdEcm9wUmVwcmVzZW50YXRpb24gfSBmcm9tIFwiLi4vY29tbW9uL2RyYWdEcm9wUmVwcmVzZW50YXRpb25cIjtcclxuaW1wb3J0IHsgSUNoYXJ0TWFuYWdlckNoYXJ0IH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvaW50ZXJmYWNlcy9jaGFydE1hbmFnZXJDaGFydEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTZXJpZUNoYXJ0VHlwZUhlbHBlciB9IGZyb20gXCIuLi9jb21tb24vU2VyaWVDaGFydFR5cGVIZWxwZXJcIjtcclxuaW1wb3J0IHsgU2VyaWVzVHlwZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL3Nlcmllc1R5cGVcIjtcclxuaW1wb3J0IHsgRGVmYXVsdENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4vZGVmYXVsdENvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcblxyXG5cclxuY2xhc3MgRXZlbnREcm9wSGVscGVyIGV4dGVuZHMgVHlwZWRFdmVudDxPYmplY3QsIHt9PiB7IH07XHJcblxyXG5lbnVtIENoYXJ0Vmlld1Rvb2xzIHtcclxuICAgIG5vbmUsXHJcbiAgICByZWZlcmVuY2VDdXJzb3IxLFxyXG4gICAgcmVmZXJlbmNlQ3Vyc29yMixcclxuICAgIHBhZ2VTY3JvbGwsXHJcbiAgICBjaGFydFNjcm9sbCxcclxuICAgIGJveFpvb20sXHJcbiAgICBwYW5uaW5nLFxyXG59XHJcblxyXG5lbnVtIFpvb21EaXJlY3Rpb24ge1xyXG4gICAgWCxcclxuICAgIFksXHJcbiAgICBYWVxyXG59XHJcblxyXG5jbGFzcyBDaGFydFZpZXdXaWRnZXQgZXh0ZW5kcyBXaWRnZXRCYXNlIGltcGxlbWVudHMgSURyb3BwYWJsZSB7XHJcblxyXG4gICAgZXZlbnREcm9wSGVscGVyOiBFdmVudERyb3BIZWxwZXIgPSBuZXcgRXZlbnREcm9wSGVscGVyKCk7XHJcbiAgICAvL2V2ZW50RHJhZ092ZXI6IEV2ZW50RHJhZ092ZXIgPSBuZXcgRXZlbnREcmFnT3ZlcigpO1xyXG5cclxuICAgIF9sYXlvdXRNYW5hZ2VyPzogQ2hhcnRWaWV3TGF5b3V0TWFuYWdlcjtcclxuICAgIGNoYXJ0TWFuYWdlcj86IENoYXJ0Vmlld0NoYXJ0TWFuYWdlclxyXG4gICAgdXNlckludGVyYWN0aW9uQ29udHJvbGxlcj86IFVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXI7XHJcblxyXG4gICAgYWN0aXZlU2VsZWN0ZWRab29tQXhpcyA9IFpvb21EaXJlY3Rpb24uWFk7XHJcbiAgICBkcm9wUG9zc2libGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHN0YXRpYyBfcGFnZVNjcm9sbEFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIHByaXZhdGUgY2hhcnRDb21tYW5kTWFwOiB7IFtpZDogc3RyaW5nXTogQ2hhcnRDb21tYW5kQmFzZSB9ID0ge307XHJcblxyXG4gICAgcHJpdmF0ZSBfdXNlckludGVyYWN0aW9uQ29udHJvbGxlckV4ZWN1dGVDaGFydENvbW1hbmRIYW5kbGVyID0gKHNlbmRlcixhcmdzKT0+dGhpcy5vbkV4ZWN1dGVDaGFydENvbW1hbmQoc2VuZGVyICxhcmdzKTtcclxuXHJcbiAgICBpbml0aWFsaXplKGxheW91dENvbnRhaW5lcklkOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlci5pbml0aWFsaXplKGxheW91dENvbnRhaW5lcklkKTtcclxuICAgICAgICB0aGlzLmFkZFN1cHBvcnRlZERyYWdEcm9wRGF0YUlkKERyYWdEcm9wRGF0YUlkLnNpZ25hbCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZUNvbXBvbmVudCgpe1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmRlZmF1bHRTZXR0aW5nc0RhdGFJZCA9IERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5XaWRnZXREZWZpbml0aW9uSWQ7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZGlzYWJsZVBlcnNpc3RpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc3Bvc2UgdGhlIG9iamVjdHMgZnJvbSB0aGlzIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgZGlzcG9zZSgpIHtcclxuICAgICAgICB0aGlzLnJlbW92ZVN1cHBvcnRlZERyYWdEcm9wRGF0YUlkKERyYWdEcm9wRGF0YUlkLnNpZ25hbCk7XHJcbiAgICAgICAgaWYodGhpcy5fbGF5b3V0TWFuYWdlciAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXRNYW5hZ2VyLmRpc3Bvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5jaGFydE1hbmFnZXIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5jaGFydE1hbmFnZXIuZGlzcG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICB0aGlzLnVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXIuZXZlbnRFeGVjdXRlQ2hhcnRDb21tYW5kLmRldGFjaCh0aGlzLl91c2VySW50ZXJhY3Rpb25Db250cm9sbGVyRXhlY3V0ZUNoYXJ0Q29tbWFuZEhhbmRsZXIpOyBcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgbGF5b3V0IG9mIHRoZSB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZUxheW91dCgpIHtcclxuXHJcbiAgICAgICAgJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCkuY3NzKFwib3ZlcmZsb3dcIiwgXCJoaWRkZW5cIik7XHJcbiAgICAgICAgJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCkuYXBwZW5kKCc8ZGl2IGlkPVwiSW5uZXJDaGFydFZpZXdDb250YWluZXJcIiBzdHlsZT1cImRpc3BsYXk6IGZsZXg7IGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47IGhlaWdodDogMTAwJTtcIj48L2Rpdj4nKVxyXG5cclxuICAgICAgICBpZiAodGhpcy52aWV3ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLnVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXIgPSBuZXcgVXNlckludGVyYWN0aW9uQ29udHJvbGxlcih0aGlzLnN0YXRlcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9sYXlvdXRNYW5hZ2VyID0gbmV3IENoYXJ0Vmlld0xheW91dE1hbmFnZXIodGhpcyk7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0TWFuYWdlciEuYWRkQ2hhcnRWaWV3Q29udGFpbmVycyhcIiNJbm5lckNoYXJ0Vmlld0NvbnRhaW5lclwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWRzIHRoZSBzdHlsZXMgZm9yIHRoZSBjaGFydCB2aWV3IHRvb2xiYXJcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGxvYWRTdHlsZXMoKSB7XHJcbiAgICAgICAgc3VwZXIuYWRkU3R5bGUoXCJ3aWRnZXRzL2NoYXJ0Vmlld1dpZGdldC9zdHlsZS9jc3MvcmVmQ3Vyc29yU3R5bGUuY3NzXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBjb21wb25lbnQgc2V0dGluZ3MgZm9yIHRoaXMgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGdldERlZmF1bHRDb21wb25lbnRTZXR0aW5ncygpOiBDb21wb25lbnRTZXR0aW5nc3tcclxuICAgICAgICByZXR1cm4gRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLmdldENoYXJ0Vmlld1dpZGdldERlZmluaXRpb24oKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgaW5pdGlhbGl6ZWQoKXtcclxuICAgICAgICB0aGlzLmluaXRDaGFydE1hbmFnZXJEYXRhTW9kZWwoKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMudXNlckludGVyYWN0aW9uQ29udHJvbGxlcikge1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJ0TWFuYWdlciA9IG5ldyBDaGFydFZpZXdDaGFydE1hbmFnZXIodGhpcywgdGhpcy51c2VySW50ZXJhY3Rpb25Db250cm9sbGVyLCB0aGlzLl9sYXlvdXRNYW5hZ2VyISwgdGhpcy5kYXRhTW9kZWwgYXMgSUNoYXJ0TWFuYWdlckRhdGFNb2RlbCk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFkZENoYXJ0Q29tbWFuZHMoKTtcclxuXHJcbiAgICAgICAgdGhpcy5fbGF5b3V0TWFuYWdlciEuaW5pdGlhbGl6ZUNoYXJ0Vmlld0xheW91dCh0aGlzLmNoYXJ0TWFuYWdlciEudHJhY2VDaGFydExpc3QpO1xyXG5cclxuICAgICAgICB0aGlzLmRpc2FibGVNb3VzZVdoZWVsRm9yU2Nyb2xsYmFyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuY2hhcnRNYW5hZ2VyIS5pbml0Q2hhcnRWaWV3V2l0aERhdGFNb2RlbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRDaGFydE1hbmFnZXJEYXRhTW9kZWwoKSB7XHJcbiAgICAgICAgbGV0IGRhdGFNb2RlbCA9IHRoaXMuY29tcG9uZW50LmdldFN1YkNvbXBvbmVudChcIkNoYXJ0TWFuYWdlckRhdGFNb2RlbFwiKTtcclxuICAgICAgICB0aGlzLmRhdGFNb2RlbCA9IGRhdGFNb2RlbCBhcyBJQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYWRkQ2hhcnRDb21tYW5kcygpIHtcclxuICAgICAgICBpZiAodGhpcy5jaGFydE1hbmFnZXIgIT0gdW5kZWZpbmVkICYmIHRoaXMudXNlckludGVyYWN0aW9uQ29udHJvbGxlciAhPSB1bmRlZmluZWQpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBzZXRDdXJzb3JPblBvaW50ZXJQb3NpdGlvbkNvbW1hbmQgPSBuZXcgU2V0Q3Vyc29yT25Qb2ludGVyUG9zaXRpb25Db21tYW5kKHRoaXMuY2hhcnRNYW5hZ2VyISk7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcnRDb21tYW5kTWFwW0NoYXJ0Q29tbWFuZFR5cGUuc2V0Q3Vyc29yT25Qb2ludGVyUG9zaXRpb25dID0gc2V0Q3Vyc29yT25Qb2ludGVyUG9zaXRpb25Db21tYW5kO1xyXG5cclxuICAgICAgICAgICAgbGV0IHJlc2V0Wm9vbUNvbW1hbmQgPSBuZXcgUmVzZXRab29tQ29tbWFuZCh0aGlzLmNoYXJ0TWFuYWdlcik7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcnRDb21tYW5kTWFwW0NoYXJ0Q29tbWFuZFR5cGUucmVzZXRab29tXSA9IHJlc2V0Wm9vbUNvbW1hbmQ7XHJcblxyXG4gICAgICAgICAgICBsZXQgY2hlY2tDdXJzb3JIb3ZlcmluZ0NvbW1hbmQgPSBuZXcgQ2hlY2tDdXJzb3JIb3ZlcmluZ0NvbW1hbmQodGhpcy5jaGFydE1hbmFnZXIpO1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJ0Q29tbWFuZE1hcFtDaGFydENvbW1hbmRUeXBlLmNoZWNrQ3Vyc29ySG92ZXJpbmddID0gY2hlY2tDdXJzb3JIb3ZlcmluZ0NvbW1hbmQ7XHJcblxyXG4gICAgICAgICAgICBsZXQgZHJhZ0N1cnNvckNvbW1hbmQgPSBuZXcgRHJhZ0N1cnNvckNvbW1hbmQodGhpcy5jaGFydE1hbmFnZXIpO1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJ0Q29tbWFuZE1hcFtDaGFydENvbW1hbmRUeXBlLmRyYWdDdXJzb3JdID0gZHJhZ0N1cnNvckNvbW1hbmQ7XHJcblxyXG4gICAgICAgICAgICBsZXQgZW5kQ3Vyc29yRHJhZ0NvbW1hbmQgPSBuZXcgRW5kQ3Vyc29yRHJhZ0NvbW1hbmQodGhpcy5jaGFydE1hbmFnZXIpO1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJ0Q29tbWFuZE1hcFtDaGFydENvbW1hbmRUeXBlLmVuZEN1cnNvckRyYWddID0gZW5kQ3Vyc29yRHJhZ0NvbW1hbmQ7XHJcblxyXG4gICAgICAgICAgICBsZXQgcGFuQ2hhcnRDb21tYW5kID0gbmV3IFBhbkNoYXJ0Q29tbWFuZCh0aGlzLmNoYXJ0TWFuYWdlcik7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcnRDb21tYW5kTWFwW0NoYXJ0Q29tbWFuZFR5cGUucGFuQ2hhcnRdID0gcGFuQ2hhcnRDb21tYW5kO1xyXG5cclxuICAgICAgICAgICAgbGV0IHRvZ2dsZUJveFpvb21Db21tYW5kID0gbmV3IFRvZ2dsZUJveFpvb21Db21tYW5kKHRoaXMuY2hhcnRNYW5hZ2VyKTtcclxuICAgICAgICAgICAgdGhpcy5jaGFydENvbW1hbmRNYXBbQ2hhcnRDb21tYW5kVHlwZS50b2dnbGVCb3hab29tXSA9IHRvZ2dsZUJveFpvb21Db21tYW5kO1xyXG5cclxuICAgICAgICAgICAgbGV0IHRvZ2dsZVBhbm5pbmdDb21tYW5kID0gbmV3IFRvb2dsZVBhbm5pbmdDb21tYW5kKHRoaXMuY2hhcnRNYW5hZ2VyKTtcclxuICAgICAgICAgICAgdGhpcy5jaGFydENvbW1hbmRNYXBbQ2hhcnRDb21tYW5kVHlwZS50b2dnbGVQYW5uaW5nXSA9IHRvZ2dsZVBhbm5pbmdDb21tYW5kO1xyXG5cclxuICAgICAgICAgICAgbGV0IHNlbGVjdFpvb21BeGVzQ29tbWFuZCA9IG5ldyBTZWxlY3Rab29tQXhlc0NvbW1hbmQodGhpcy5jaGFydE1hbmFnZXIpO1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJ0Q29tbWFuZE1hcFtDaGFydENvbW1hbmRUeXBlLnNlbGVjdFpvb21BeGlzXSA9IHNlbGVjdFpvb21BeGVzQ29tbWFuZDtcclxuXHJcbiAgICAgICAgICAgIGxldCB6b29tQ2hhcnRDb21tYW5kID0gbmV3IFpvb21DaGFydENvbW1hbmQodGhpcy5jaGFydE1hbmFnZXIpO1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJ0Q29tbWFuZE1hcFtDaGFydENvbW1hbmRUeXBlLnpvb21DaGFydF0gPSB6b29tQ2hhcnRDb21tYW5kO1xyXG5cclxuICAgICAgICAgICAgbGV0IHNlbGVjdFBhbm5pbmdBeGVzQ29tbWFuZCA9IG5ldyBTZWxlY3RQYW5uaW5nQXhlc0NvbW1hbmQodGhpcy5jaGFydE1hbmFnZXIpO1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJ0Q29tbWFuZE1hcFtDaGFydENvbW1hbmRUeXBlLnNlbGVjdFBhbm5pbmdBeGVzXSA9IHNlbGVjdFBhbm5pbmdBeGVzQ29tbWFuZDtcclxuXHJcbiAgICAgICAgICAgIGxldCBhdXRvU2NhbGVDb21tYW5kID0gbmV3IEF1dG9TY2FsZUNvbW1hbmQodGhpcy5jaGFydE1hbmFnZXIpO1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJ0Q29tbWFuZE1hcFtDaGFydENvbW1hbmRUeXBlLmF1dG9TY2FsZV0gPSBhdXRvU2NhbGVDb21tYW5kO1xyXG5cclxuICAgICAgICAgICAgbGV0IHJlc2V0RHJhZ1Bvc2l0aW9uQ29tbWFuZCA9IG5ldyBSZXNldERyYWdQb3NpdGlvbkNvbW1hbmQodGhpcy5jaGFydE1hbmFnZXIpO1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJ0Q29tbWFuZE1hcFtDaGFydENvbW1hbmRUeXBlLnJlc2V0RHJhZ1Bvc2l0aW9uXSA9IHJlc2V0RHJhZ1Bvc2l0aW9uQ29tbWFuZDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudXNlckludGVyYWN0aW9uQ29udHJvbGxlci5ldmVudEV4ZWN1dGVDaGFydENvbW1hbmQuYXR0YWNoKHRoaXMuX3VzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXJFeGVjdXRlQ2hhcnRDb21tYW5kSGFuZGxlcik7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjaGFydE1hbmFnZXIgdW5kZWZpbmVkXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uRXhlY3V0ZUNoYXJ0Q29tbWFuZChzZW5kZXIsIGFyZ3MpIHtcclxuICAgICAgICB0aGlzLmNoYXJ0Q29tbWFuZE1hcFthcmdzLmNvbW1hbmRUeXBlXS5vbkV4ZWN1dGVDaGFydENvbW1hbmQoc2VuZGVyLCBhcmdzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25FdmVudFRvb2xiYXJCdXR0b25DbGlja2VkKHNlbmRlciwgYXJncykge1xyXG4gICAgICAgIGlmICh0aGlzLnVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXIpIHtcclxuICAgICAgICAgICAgdGhpcy51c2VySW50ZXJhY3Rpb25Db250cm9sbGVyLm9uVG9vbGJhckNsaWNrKHNlbmRlciwgYXJncylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uVXNlckNoYXJ0SW50ZXJhY3Rpb24oc2VuZGVyLCBldmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJnczogRXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbkFyZ3MpIHtcclxuICAgICAgICBpZiAodGhpcy51c2VySW50ZXJhY3Rpb25Db250cm9sbGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXNlckludGVyYWN0aW9uQ29udHJvbGxlci5vbkNoYXJ0SW50ZXJhY3Rpb24oZXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbkFyZ3MuY2hhcnRJbnRlcmFjdGlvblR5cGUsIHNlbmRlciwgZXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbkFyZ3MuZXZlbnRBcmd1bWVudHMpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVzaXplKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7XHJcbiAgICAgICAgJChcIiNJbm5lckNoYXJ0Vmlld0NvbnRhaW5lclwiKVswXS5zdHlsZS53aWR0aCA9IHdpZHRoICsgXCJweFwiO1xyXG4gICAgICAgICQoXCIjSW5uZXJDaGFydFZpZXdDb250YWluZXJcIilbMF0uc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ICsgXCJweFwiO1xyXG4gICAgICAgIHRoaXMuX2xheW91dE1hbmFnZXIhLnJlc2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVDaGFydHModHJhY2VDaGFydExpc3Q6IEFycmF5PElUcmFjZUNoYXJ0Pikge1xyXG4gICAgICAgIHRoaXMuX2xheW91dE1hbmFnZXIhLnVwZGF0ZUNoYXJ0cyh0aGlzLmNoYXJ0TWFuYWdlciEudHJhY2VDaGFydExpc3QpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hDaGFydHMoc2VuZGVyLCBkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5jaGFydE1hbmFnZXIhLm9uQ2hhcnRNYW5hZ2VyTW9kZWxDaGFuZ2VkKHNlbmRlciwgZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UGFnZVNjcm9sbChlbmFibGU6IGJvb2xlYW4pIHtcclxuICAgICAgICBDaGFydFZpZXdXaWRnZXQuX3BhZ2VTY3JvbGxBY3RpdmUgPSBlbmFibGU7XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0UmVmZXJlbmNlQ3Vyc29yKGN1cnNvckluZGV4KSB7XHJcbiAgICAgICAgaWYgKHRoaXMudXNlckludGVyYWN0aW9uQ29udHJvbGxlcikge1xyXG4gICAgICAgICAgICB0aGlzLnVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXIuc2VsZWN0Q3Vyc29yKGN1cnNvckluZGV4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJVc2VySW50ZXJhY3Rpb25Db250cm9sbGVyIG5vdCBkZWZpbmVkXCIpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZGlzYWJsZU1vdXNlV2hlZWxGb3JTY3JvbGxiYXIoKSB7XHJcbiAgICAgICAgJChcIiNcIiArIHRoaXMuX2xheW91dE1hbmFnZXIhLmNoYXJ0U3BsaXR0ZXJQYXJlbnRDb250YWluZXJJZCkuYmluZCgnbW91c2V3aGVlbCBET01Nb3VzZVNjcm9sbCcsIGZ1bmN0aW9uIChlKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgZGlzYWJsZVNjcm9sbGJhclNjcm9sbCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgaWYgKENoYXJ0Vmlld1dpZGdldC5fcGFnZVNjcm9sbEFjdGl2ZSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUudHlwZSA9PSAnbW91c2V3aGVlbCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlU2Nyb2xsYmFyU2Nyb2xsID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGUudHlwZSA9PSAnRE9NTW91c2VTY3JvbGwnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZVNjcm9sbGJhclNjcm9sbCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGRpc2FibGVTY3JvbGxiYXJTY3JvbGwpIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vI3JlZ2lvbiBkcm9wIHN1cHBvcnRcclxuICAgIGRyYWdTdGFydChhcmdzOiBEcmFnRHJvcEFyZ3MpIHtcclxuICAgICAgICBpZiAoYXJncy5kYXRhWzBdIGluc3RhbmNlb2YgQmFzZVNlcmllcykge1xyXG4gICAgICAgICAgICBsZXQgc2FtZUdyb3VwID0gdGhpcy5hcmVTZXJpZXNGcm9tU2FtZUdyb3VwKGFyZ3MuZGF0YSk7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcnRNYW5hZ2VyIS5hZGREcm9wcGFibGVMb2NhdGlvbnMoYXJncy5kYXRhLCBzYW1lR3JvdXApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkcmFnU3RvcChhcmdzOiBEcmFnRHJvcEFyZ3MpIHtcclxuICAgICAgICBpZiAoYXJncy5kYXRhWzBdIGluc3RhbmNlb2YgQmFzZVNlcmllcykge1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJ0TWFuYWdlciEucmVtb3ZlRHJvcHBhYmxlTG9jYXRpb25zKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRyYWdPdmVyKGFyZ3M6IERyYWdEcm9wQXJncyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHRoaXMuZHJvcFBvc3NpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIHRhcmdldENoYXJ0Q29udGFpbmVySWQgPSBhcmdzLmN1cnJlbnRUYXJnZXQucGFyZW50RWxlbWVudC5pZDtcclxuICAgICAgICB2YXIgdGFyZ2V0Q2hhcnQgPSB0aGlzLmNoYXJ0TWFuYWdlciEuZ2V0VHJhY2VDaGFydEJ5Q29udGFpbmVySWQodGFyZ2V0Q2hhcnRDb250YWluZXJJZCk7XHJcbiAgICAgICAgbGV0IGNoYXJ0TWFuYWdlckRhdGFNb2RlbCA9IHRoaXMuZGF0YU1vZGVsIGFzIElDaGFydE1hbmFnZXJEYXRhTW9kZWw7XHJcbiAgICAgICAgbGV0IGRyb3BIZWxwZXIgPSBuZXcgQ2hhcnREcm9wSGVscGVyKGNoYXJ0TWFuYWdlckRhdGFNb2RlbCwgdGhpcyk7XHJcbiAgICAgICAgbGV0IGNoYXJ0QXJlYSA9IHRoaXMuZ2V0Q2hhcnRBcmVhSWQoYXJncy5jdXJyZW50VGFyZ2V0KTtcclxuICAgICAgICBpZiAodGFyZ2V0Q2hhcnQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIC8vIERyYWcgb3ZlciBhIGNoYXJ0L2NoYXJ0IHdpZGdldFxyXG4gICAgICAgICAgICBsZXQgc2VyaWVzID0gYXJncy5kYXRhIGFzIEFycmF5PEJhc2VTZXJpZXM+O1xyXG4gICAgICAgICAgICBsZXQgY2hhcnQgPSB0YXJnZXRDaGFydCBhcyBDaGFydEJhc2U7XHJcbiAgICAgICAgICAgIGxldCBkcm9wTG9jYXRpb25UeXBlID0gZHJvcEhlbHBlci5nZXREcm9wTG9jYXRpb25UeXBlKGFyZ3MuY3VycmVudFRhcmdldCwgY2hhcnQsIHNlcmllcyk7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhZ0FuZERyb3BSZXByZXNlbnRhdGlvbihjaGFydCwgc2VyaWVzLCBkcm9wTG9jYXRpb25UeXBlLCBhcmdzLmRyYWdEcm9wUmVwcmVzZW50YXRpb24pO1xyXG4gICAgICAgICAgICB0aGlzLmhpZ2hsaWdodERyb3BwYWJsZUFyZWFzKGNoYXJ0LCBhcmdzLmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChkcm9wSGVscGVyLmNhbkFkZENoYXJ0KCkgPT0gdHJ1ZSkgeyAgLy8gSXMgaXQgcG9zc2libGUgdG8gYWRkIG9uZSBtb3JlIGNoYXJ0XHJcbiAgICAgICAgICAgIHRoaXMucmVzZXRIaWdobGlnaHRpbmcoKTtcclxuICAgICAgICAgICAgLy8gTWF5YmUgZHJhZyBvdmVyIGVtcHR5IHNwYWNlXHJcbiAgICAgICAgICAgIGlmIChjaGFydEFyZWEgPT0gXCJDaGFydFZpZXdDaGFydFNwbGl0dGVyX21haW5fbGFzdFBhbmVfWVRcIiApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJvcFBvc3NpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlRHJhZ0Ryb3BSZXByZXNlbnRhdGlvbihhcmdzLmRyYWdEcm9wUmVwcmVzZW50YXRpb24sIFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9kcmFnRHJvcC9hZGROZXdZVENoYXJ0LnN2Z1wiLCBcIkNyZWF0ZSBhIG5ldyBZVCBjaGFydCBhbmQgYWRkIGRyYWdnZWQgc2lnbmFsc1wiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQ2hhcnRUeXBlRHJvcHBhYmxlQXJlYXMoY2hhcnRBcmVhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChjaGFydEFyZWEgPT0gXCJDaGFydFZpZXdDaGFydFNwbGl0dGVyX21haW5fbGFzdFBhbmVfRkZUXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJvcFBvc3NpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlRHJhZ0Ryb3BSZXByZXNlbnRhdGlvbihhcmdzLmRyYWdEcm9wUmVwcmVzZW50YXRpb24sIFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9kcmFnRHJvcC9hZGROZXdGRlRDaGFydC5zdmdcIiwgXCJDcmVhdGUgYSBuZXcgRkZUIGNoYXJ0IGFuZCBhZGQgZHJhZ2dlZCBzaWduYWxzXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVDaGFydFR5cGVEcm9wcGFibGVBcmVhcyhjaGFydEFyZWEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGNoYXJ0QXJlYSA9PSBcIkNoYXJ0Vmlld0NoYXJ0U3BsaXR0ZXJfbWFpbl9sYXN0UGFuZV9YWVwiKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJvcFBvc3NpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlRHJhZ0Ryb3BSZXByZXNlbnRhdGlvbihhcmdzLmRyYWdEcm9wUmVwcmVzZW50YXRpb24sIFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9kcmFnRHJvcC9hZGROZXdYWUNoYXJ0LnN2Z1wiLCBcIkNyZWF0ZSBhIG5ldyBYWSBjaGFydCBhbmQgYWRkIGEgY2FsY3VsYXRlZCBYWSBzaWduYWxcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUNoYXJ0VHlwZURyb3BwYWJsZUFyZWFzKGNoYXJ0QXJlYSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNoYXJ0QXJlYSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDaGFydFR5cGVEcm9wcGFibGVBcmVhcyhjaGFydEFyZWEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gdGhpcy5kcm9wUG9zc2libGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmFnQW5kRHJvcFJlcHJlc2VudGF0aW9uKGNoYXJ0OiBJVHJhY2VDaGFydCwgc2VyaWVzOiBBcnJheTxCYXNlU2VyaWVzPiwgZHJvcExvY2F0aW9uVHlwZTogRHJvcExvY2F0aW9uVHlwZSwgZHJhZ0Ryb3BSZXByZXNlbnRhdGlvbil7XHJcbiAgICAgICAgaWYoY2hhcnQudHlwZSA9PSBDaGFydFR5cGUuWVRDaGFydCB8fCBjaGFydC50eXBlID09IENoYXJ0VHlwZS5GRlRDaGFydCl7XHJcbiAgICAgICAgICAgIGlmIChkcm9wTG9jYXRpb25UeXBlID09IERyb3BMb2NhdGlvblR5cGUuYWRkTmV3U2NhbGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJvcFBvc3NpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmKHNlcmllc1swXS50eXBlID09PSBTZXJpZXNUeXBlLnRpbWVTZXJpZXMgJiYgY2hhcnQudHlwZSA9PSBDaGFydFR5cGUuRkZUQ2hhcnQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVEcmFnRHJvcFJlcHJlc2VudGF0aW9uKGRyYWdEcm9wUmVwcmVzZW50YXRpb24sIFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9kcmFnRHJvcC9hZGROZXdTY2FsZS5zdmdcIiwgXCJDYWxjdWxhdGUgRkZUIHNpbmdhbCBhbmQgYWRkIGl0IHRvIG5ldyBzY2FsZVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlRHJhZ0Ryb3BSZXByZXNlbnRhdGlvbihkcmFnRHJvcFJlcHJlc2VudGF0aW9uLCBcIi4uL2FwcC93aWRnZXRzL2NvbW1vbi9zdHlsZS9pbWFnZXMvZHJhZ0Ryb3AvYWRkTmV3U2NhbGUuc3ZnXCIsIFwiQ3JlYXRlIGEgbmV3IHNjYWxlIGFuZCBhZGQgZHJhZ2dlZCBzaWduYWxzXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGRyb3BMb2NhdGlvblR5cGUgPT0gRHJvcExvY2F0aW9uVHlwZS5hc3NpZ25Ub1NjYWxlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyb3BQb3NzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpZihzZXJpZXNbMF0udHlwZSA9PT0gU2VyaWVzVHlwZS50aW1lU2VyaWVzICYmIGNoYXJ0LnR5cGUgPT0gQ2hhcnRUeXBlLkZGVENoYXJ0ICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlRHJhZ0Ryb3BSZXByZXNlbnRhdGlvbihkcmFnRHJvcFJlcHJlc2VudGF0aW9uLCBcIi4uL2FwcC93aWRnZXRzL2NvbW1vbi9zdHlsZS9pbWFnZXMvZHJhZ0Ryb3AvYXNzaWduVG9TY2FsZS5zdmdcIiwgXCJDYWxjdWxhdGUgRkZUIHNpZ25hbCBhbmQgYWRkIGl0IHRvIHNjYWxlXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVEcmFnRHJvcFJlcHJlc2VudGF0aW9uKGRyYWdEcm9wUmVwcmVzZW50YXRpb24sIFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9kcmFnRHJvcC9hc3NpZ25Ub1NjYWxlLnN2Z1wiLCBcIkFkZCBkcmFnZ2VkIHNpZ25hbHMgdG8gc2NhbGVcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChkcm9wTG9jYXRpb25UeXBlID09IERyb3BMb2NhdGlvblR5cGUuYXNzaWduVG9TY2FsZSAmJiB0aGlzLmFyZVNlcmllc0Zyb21TYW1lR3JvdXAoc2VyaWVzKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kcm9wUG9zc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaWYoc2VyaWVzWzBdLnR5cGUgPT0gU2VyaWVzVHlwZS50aW1lU2VyaWVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVEcmFnRHJvcFJlcHJlc2VudGF0aW9uKGRyYWdEcm9wUmVwcmVzZW50YXRpb24sIFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9kcmFnRHJvcC9hc3NpZ25Ub0NoYXJ0LnN2Z1wiLCBcIkNhbGN1bGF0ZSBYWSBzaWduYWwgYW5kIGFkZCBpdCB0byB0aGUgY2hhcnRcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZURyYWdEcm9wUmVwcmVzZW50YXRpb24oZHJhZ0Ryb3BSZXByZXNlbnRhdGlvbiwgXCIuLi9hcHAvd2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL2RyYWdEcm9wL2Fzc2lnblRvQ2hhcnQuc3ZnXCIsIFwiQWRkIGRyYWdnZWQgc2lnbmFscyB0byBjaGFydFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGRyYWcgYW5kIGRyb3AgcmVwcmVzZW50YXRpb24gd2hpbGUgZHJhZ2dpbmcgd2l0aCBuZXcgaWNvbnMgb3IgdGV4dHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtEcmFnRHJvcFJlcHJlc2VudGF0aW9ufSBkcmFnRHJvcFJlcHJlc2VudGF0aW9uXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gb3ZlcmxheUljb25QYXRoXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmV3VGV4dFxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZURyYWdEcm9wUmVwcmVzZW50YXRpb24oZHJhZ0Ryb3BSZXByZXNlbnRhdGlvbjogRHJhZ0Ryb3BSZXByZXNlbnRhdGlvbnx1bmRlZmluZWQsIG92ZXJsYXlJY29uUGF0aDogc3RyaW5nLCBuZXdUZXh0OiBzdHJpbmcpe1xyXG4gICAgICAgIGlmKGRyYWdEcm9wUmVwcmVzZW50YXRpb24gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gQWRkIG92ZXJsYXkgaWNvbiBpZiBhdmFpbGFibGVcclxuICAgICAgICAgICAgaWYob3ZlcmxheUljb25QYXRoICE9IFwiXCIpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGFkZE5ld1NjYWxlSW1hZ2UgPSBJbWFnZVByb3ZpZGVyLmdldEluc3RhbmNlKCkuZ2V0SW1hZ2Uob3ZlcmxheUljb25QYXRoKTtcclxuICAgICAgICAgICAgICAgIGlmKGFkZE5ld1NjYWxlSW1hZ2UgIT0gXCJcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgZHJhZ0Ryb3BSZXByZXNlbnRhdGlvbi5pY29uTGlzdC5wdXNoKGFkZE5ld1NjYWxlSW1hZ2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGFkZCB0ZXh0IG9yIHJlcGxhY2UgZXhpc3RpbmcgdGV4dFxyXG4gICAgICAgICAgICBpZihkcmFnRHJvcFJlcHJlc2VudGF0aW9uLnRleHRMaXN0Lmxlbmd0aCA9PSAwKXtcclxuICAgICAgICAgICAgICAgIGRyYWdEcm9wUmVwcmVzZW50YXRpb24udGV4dExpc3QucHVzaChuZXdUZXh0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgZHJhZ0Ryb3BSZXByZXNlbnRhdGlvbi50ZXh0TGlzdFswXSA9IG5ld1RleHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZHJvcChhcmdzOiBEcmFnRHJvcEFyZ3MpIHtcclxuICAgICAgICBsZXQgc2VyaWVzID0gYXJncy5kYXRhIGFzIEFycmF5PEJhc2VTZXJpZXM+O1xyXG4gICAgICAgIGlmICh0aGlzLmRyb3BQb3NzaWJsZSkgeyAvLyBJcyBkcm9wIHBvc3NpYmxlXHJcbiAgICAgICAgICAgIGxldCBjaGFydE1hbmFnZXJEYXRhTW9kZWwgPSB0aGlzLmRhdGFNb2RlbCBhcyBJQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsO1xyXG4gICAgICAgICAgICBsZXQgZHJvcEhlbHBlciA9IG5ldyBDaGFydERyb3BIZWxwZXIoY2hhcnRNYW5hZ2VyRGF0YU1vZGVsLCB0aGlzKTtcclxuICAgICAgICAgICAgbGV0IHRhcmdldENoYXJ0ID0gdGhpcy5jaGFydE1hbmFnZXIhLmdldFRyYWNlQ2hhcnRCeUNvbnRhaW5lcklkKGFyZ3MuY3VycmVudFRhcmdldC5wYXJlbnRFbGVtZW50LmlkKTtcclxuICAgICAgICAgICAgaWYgKHRhcmdldENoYXJ0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2hhcnQ6IElDaGFydE1hbmFnZXJDaGFydCB8IHVuZGVmaW5lZCA9IGNoYXJ0TWFuYWdlckRhdGFNb2RlbC5nZXRDaGFydCh0YXJnZXRDaGFydC53aWRnZXROYW1lKTtcclxuICAgICAgICAgICAgICAgIGxldCBzZXJpZUNoYXJ0VHlwZUhlbHBlciA9IG5ldyBTZXJpZUNoYXJ0VHlwZUhlbHBlcigpO1xyXG4gICAgICAgICAgICAgICAgc2VyaWVzID0gc2VyaWVDaGFydFR5cGVIZWxwZXIuZ2V0RHJvcHBhYmxlU2VyaWVzKGNoYXJ0IS5nZXRBbGxTZXJpZXMoKSxzZXJpZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRyb3BIZWxwZXIuYWRkU2VyaWVzKGFyZ3MuY3VycmVudFRhcmdldCwgdGFyZ2V0Q2hhcnQsIHNlcmllcywgdGhpcy5fbGF5b3V0TWFuYWdlciEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkcm9wRm9jdXNMb3N0KGFyZ3M6IERyYWdEcm9wQXJncykge1xyXG4gICAgICAgIHRoaXMudXBkYXRlQ2hhcnRUeXBlRHJvcHBhYmxlQXJlYXMoYXJncy5jdXJyZW50VGFyZ2V0KTtcclxuICAgICAgICB0aGlzLnJlc2V0SGlnaGxpZ2h0aW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIaWdobGlnaHRzIGFyZWFzIHdoZXJlIHNpZ25hbHMgaXMgYmVpbmcgZHJhZ2dlZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Q2hhcnRCYXNlfSBjaGFydFxyXG4gICAgICogQHBhcmFtIHsqfSBjdXJyZW50VGFyZ2V0XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaGlnaGxpZ2h0RHJvcHBhYmxlQXJlYXMoY2hhcnQ6IENoYXJ0QmFzZSwgY3VycmVudFRhcmdldCl7XHJcbiAgICAgICAgaWYoY3VycmVudFRhcmdldC5pZC5pbmNsdWRlcyhcIl9heGlzRHJvcFpvbmVTY2FsZVwiKSB8fCBjdXJyZW50VGFyZ2V0LmlkLmluY2x1ZGVzKFwiX2F4aXNEcm9wWm9uZV9jaGFydEFyZWFcIikgfHwgY3VycmVudFRhcmdldC5pZC5pbmNsdWRlcyhcIl9yZWZDdXJzb3JfXCIpKXtcclxuICAgICAgICAgICAgY2hhcnQudXBkYXRlRHJvcHBhYmxlQXJlYXMoY3VycmVudFRhcmdldCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVzZXRIaWdobGlnaHRpbmcoY2hhcnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yZXNldEhpZ2hsaWdodGluZygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlc2V0IGhpZ2hsaWdodGVkIGFyZWFzIGZvciBhbGwgY2hhcnRzLCBleGNlcHQgdGhlIHNlbGVjdGVkIG9uZSBcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lUcmFjZUNoYXJ0fSBbY2hhcnRdXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVzZXRIaWdobGlnaHRpbmcoY2hhcnQ/OiBJVHJhY2VDaGFydCl7XHJcbiAgICAgICAgbGV0IHRyYWNlQ2hhcnRzOiBBcnJheTxJVHJhY2VDaGFydD4gPSB0aGlzLmNoYXJ0TWFuYWdlciEudHJhY2VDaGFydExpc3Q7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRyYWNlQ2hhcnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFydCAhPSB0cmFjZUNoYXJ0c1tpXSl7XHJcbiAgICAgICAgICAgICAgICB0cmFjZUNoYXJ0c1tpXS5yZXNldEhpZ2hsaWdodGluZygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlIGhpZ2hsaWdodGluZyBzdGF0ZSBmb3IgY2hhcnQgVHlwZSBhcmVhc1xyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBwYXJhbSB7KHN0cmluZyB8IHVuZGVmaW5lZCl9IGN1cnJlbnRUYXJnZXRJZFxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgdXBkYXRlQ2hhcnRUeXBlRHJvcHBhYmxlQXJlYXMoY3VycmVudFRhcmdldElkOiBzdHJpbmcgfCB1bmRlZmluZWQpe1xyXG4gICAgICAgIGxldCBlbXB0eVNwYWNlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdDaGFydFZpZXdDaGFydFNwbGl0dGVyX21haW5fbGFzdFBhbmUnKTtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgZW1wdHlTcGFjZUVsZW1lbnQhLmNoaWxkRWxlbWVudENvdW50OyBpID0gaSArIDEpe1xyXG4gICAgICAgICAgICBpZiAoZW1wdHlTcGFjZUVsZW1lbnQhLmNoaWxkcmVuW2ldLmlkID09IGN1cnJlbnRUYXJnZXRJZCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbXB0eVNwYWNlRWxlbWVudCEuY2hpbGRyZW5baV0uaWQpO1xyXG4gICAgICAgICAgICAgICAgYXJlYSEuY2xhc3NMaXN0LmFkZCgnZHJhZ2dlZE92ZXInKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCBhcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZW1wdHlTcGFjZUVsZW1lbnQhLmNoaWxkcmVuW2ldLmlkKTtcclxuICAgICAgICAgICAgICAgIGFyZWEhLmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWdnZWRPdmVyJyk7ICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgY2hhcnQgYXJlYSBpZCBcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSB0YXJnZXRcclxuICAgICAqIEByZXR1cm5zIHsoc3RyaW5nIHwgdW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldENoYXJ0QXJlYUlkKHRhcmdldDogSFRNTEVsZW1lbnQpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGxldCB5dEFyZWEgPSAnQ2hhcnRWaWV3Q2hhcnRTcGxpdHRlcl9tYWluX2xhc3RQYW5lX1lUJztcclxuICAgICAgICBsZXQgZmZ0QXJlYSA9ICdDaGFydFZpZXdDaGFydFNwbGl0dGVyX21haW5fbGFzdFBhbmVfRkZUJztcclxuICAgICAgICBsZXQgeHlBcmVhID0gJ0NoYXJ0Vmlld0NoYXJ0U3BsaXR0ZXJfbWFpbl9sYXN0UGFuZV9YWSc7XHJcblxyXG4gICAgICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNhYmxlZCcpIHx8IHRhcmdldCEucGFyZW50RWxlbWVudCEuY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNhYmxlZCcpKXtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGFyZ2V0LmlkID09IHl0QXJlYSB8fCB0YXJnZXQhLnBhcmVudEVsZW1lbnQhLmlkID09IHl0QXJlYSkge1xyXG4gICAgICAgICAgICByZXR1cm4geXRBcmVhO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0YXJnZXQuaWQgPT0gZmZ0QXJlYSB8fCB0YXJnZXQhLnBhcmVudEVsZW1lbnQhLmlkID09IGZmdEFyZWEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZmdEFyZWE7XHJcbiAgICAgICAgfSBcclxuICAgICAgICBlbHNlIGlmICh0YXJnZXQuaWQgPT0geHlBcmVhIHx8IHRhcmdldCEucGFyZW50RWxlbWVudCEuaWQgPT0geHlBcmVhKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB4eUFyZWE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgZHJhZyBzZXJpZXMgYmVsb25nIHRvIHRoZSBzYW1lIHNlcmllIGdyb3VwXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8QmFzZVNlcmllcz59IHNlcmllc1xyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXJlU2VyaWVzRnJvbVNhbWVHcm91cChzZXJpZXM6IEFycmF5PEJhc2VTZXJpZXM+KTogYm9vbGVhbntcclxuICAgICAgICBsZXQgcGFyZW50ID0gc2VyaWVzWzBdLnBhcmVudDtcclxuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IHNlcmllcy5sZW5ndGg7IGkgPSBpICsgMSl7XHJcbiAgICAgICAgICAgIGlmIChzZXJpZXNbaV0ucGFyZW50ICE9IHBhcmVudCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8jZW5kcmVnaW9uIGRyb3Agc3VwcG9ydFxyXG59XHJcblxyXG5leHBvcnQgeyBDaGFydFZpZXdXaWRnZXQsIENoYXJ0Vmlld1Rvb2xzLCBab29tRGlyZWN0aW9uLCBFdmVudERyb3BIZWxwZXJ9O1xyXG5cclxuIl19