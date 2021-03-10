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
define(["require", "exports", "./chartViewChartManager", "../chartViewWidget/chartViewLayoutManager", "../common/widgetBase", "../../framework/events", "./userInteraction/userInteractionController", "./userInteraction/commands/setCursorCommand", "./userInteraction/commands/resetZoomCommand", "./ChartBase", "./userInteraction/commands/cursorHoveringCommand", "./userInteraction/commands/dragCursorCommand", "./userInteraction/commands/endCursorDragCommand", "./userInteraction/commands/panChartCommand", "./userInteraction/commands/toogleBoxZoomCommand", "./userInteraction/commands/tooglePanningCommand", "./userInteraction/commands/selectZoomAxesCommand", "../../models/chartManagerDataModel/chartManagerChart", "../common/interfaces/dropInterface", "./userInteraction/commands/zoomChartCommand", "./userInteraction/commands/selectPanningAxesCommand", "../../models/chartManagerDataModel/baseSeries", "./helpers/chartDropHelper", "./userInteraction/commands/autoScaleCommand", "../common/imageProvider", "./userInteraction/commands/resetDragPositionCommand", "../common/SerieChartTypeHelper", "../../models/chartManagerDataModel/seriesType"], function (require, exports, chartViewChartManager_1, chartViewLayoutManager_1, widgetBase_1, events_1, userInteractionController_1, setCursorCommand_1, resetZoomCommand_1, ChartBase_1, cursorHoveringCommand_1, dragCursorCommand_1, endCursorDragCommand_1, panChartCommand_1, toogleBoxZoomCommand_1, tooglePanningCommand_1, selectZoomAxesCommand_1, chartManagerChart_1, dropInterface_1, zoomChartCommand_1, selectPanningAxesCommand_1, baseSeries_1, chartDropHelper_1, autoScaleCommand_1, imageProvider_1, resetDragPositionCommand_1, SerieChartTypeHelper_1, seriesType_1) {
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
            if (this.userInteractionController) {
                this.chartManager = new chartViewChartManager_1.ChartViewChartManager(this, this.userInteractionController, this._layoutManager, this.dataModel);
            }
            this.addChartCommands();
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
         * Creates the widget content and eventually subwidgets
         *
         * @memberof ChartViewWidget
         */
        ChartViewWidget.prototype.createWidgets = function () {
            this._layoutManager.initializeChartViewLayout(this.chartManager.traceChartList);
            this.disableMouseWheelForScrollbar();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRWaWV3V2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0Vmlld1dpZGdldC9jaGFydFZpZXdXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQWtDQTtRQUE4QixtQ0FBc0I7UUFBcEQ7O1FBQXVELENBQUM7UUFBRCxzQkFBQztJQUFELENBQUMsQUFBeEQsQ0FBOEIsbUJBQVUsR0FBZ0I7SUF5Y0MsMENBQWU7SUF6Y2hCLENBQUM7SUFFekQsSUFBSyxjQVFKO0lBUkQsV0FBSyxjQUFjO1FBQ2YsbURBQUksQ0FBQTtRQUNKLDJFQUFnQixDQUFBO1FBQ2hCLDJFQUFnQixDQUFBO1FBQ2hCLCtEQUFVLENBQUE7UUFDVixpRUFBVyxDQUFBO1FBQ1gseURBQU8sQ0FBQTtRQUNQLHlEQUFPLENBQUE7SUFDWCxDQUFDLEVBUkksY0FBYyxLQUFkLGNBQWMsUUFRbEI7SUErYnlCLHdDQUFjO0lBN2J4QyxJQUFLLGFBSUo7SUFKRCxXQUFLLGFBQWE7UUFDZCwyQ0FBQyxDQUFBO1FBQ0QsMkNBQUMsQ0FBQTtRQUNELDZDQUFFLENBQUE7SUFDTixDQUFDLEVBSkksYUFBYSxLQUFiLGFBQWEsUUFJakI7SUF5YnlDLHNDQUFhO0lBdmJ2RDtRQUE4QixtQ0FBVTtRQUF4QztZQUFBLHFFQXFiQztZQW5iRyxxQkFBZSxHQUFvQixJQUFJLGVBQWUsRUFBRSxDQUFDO1lBT3pELDRCQUFzQixHQUFHLGFBQWEsQ0FBQyxFQUFFLENBQUM7WUFDMUMsa0JBQVksR0FBWSxLQUFLLENBQUM7WUFHdEIscUJBQWUsR0FBdUMsRUFBRSxDQUFDO1lBRXpELDBEQUFvRCxHQUFHLFVBQUMsTUFBTSxFQUFDLElBQUksSUFBRyxPQUFBLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQXhDLENBQXdDLENBQUM7O1lBcWF2SCx5QkFBeUI7UUFD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QUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxNQUFNLEVBQUM7b0JBQzNCLE9BQU8sS0FBSyxDQUFDO2lCQUNoQjthQUNKO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQXZhTSxpQ0FBaUIsR0FBWSxLQUFLLENBQUM7UUEwYTlDLHNCQUFDO0tBQUEsQUFyYkQsQ0FBOEIsdUJBQVUsR0FxYnZDO0lBRVEsMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFydFZpZXdDaGFydE1hbmFnZXIgfSBmcm9tIFwiLi9jaGFydFZpZXdDaGFydE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgQ2hhcnRWaWV3TGF5b3V0TWFuYWdlciB9IGZyb20gXCIuLi9jaGFydFZpZXdXaWRnZXQvY2hhcnRWaWV3TGF5b3V0TWFuYWdlclwiO1xyXG5pbXBvcnQgeyBXaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi93aWRnZXRCYXNlXCI7XHJcbmltcG9ydCB7IElUcmFjZUNoYXJ0IH0gZnJvbSBcIi4vaW50ZXJmYWNlcy90cmFjZUNoYXJ0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFR5cGVkRXZlbnQgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2V2ZW50c1wiO1xyXG5pbXBvcnQgeyBVc2VySW50ZXJhY3Rpb25Db250cm9sbGVyLCBDaGFydENvbW1hbmRUeXBlIH0gZnJvbSBcIi4vdXNlckludGVyYWN0aW9uL3VzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXJcIjtcclxuaW1wb3J0IHsgU2V0Q3Vyc29yT25Qb2ludGVyUG9zaXRpb25Db21tYW5kIH0gZnJvbSBcIi4vdXNlckludGVyYWN0aW9uL2NvbW1hbmRzL3NldEN1cnNvckNvbW1hbmRcIjtcclxuaW1wb3J0IHsgUmVzZXRab29tQ29tbWFuZCB9IGZyb20gXCIuL3VzZXJJbnRlcmFjdGlvbi9jb21tYW5kcy9yZXNldFpvb21Db21tYW5kXCI7XHJcbmltcG9ydCB7IENoYXJ0Q29tbWFuZEJhc2UgfSBmcm9tIFwiLi91c2VySW50ZXJhY3Rpb24vY2hhcnRDb21tYW5kQmFzZVwiO1xyXG5pbXBvcnQgeyBFdmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncywgQ2hhcnRCYXNlLCBEcm9wTG9jYXRpb25UeXBlIH0gZnJvbSBcIi4vQ2hhcnRCYXNlXCI7XHJcbmltcG9ydCB7IENoZWNrQ3Vyc29ySG92ZXJpbmdDb21tYW5kIH0gZnJvbSBcIi4vdXNlckludGVyYWN0aW9uL2NvbW1hbmRzL2N1cnNvckhvdmVyaW5nQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBEcmFnQ3Vyc29yQ29tbWFuZCB9IGZyb20gXCIuL3VzZXJJbnRlcmFjdGlvbi9jb21tYW5kcy9kcmFnQ3Vyc29yQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBFbmRDdXJzb3JEcmFnQ29tbWFuZCB9IGZyb20gXCIuL3VzZXJJbnRlcmFjdGlvbi9jb21tYW5kcy9lbmRDdXJzb3JEcmFnQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBQYW5DaGFydENvbW1hbmQgfSBmcm9tIFwiLi91c2VySW50ZXJhY3Rpb24vY29tbWFuZHMvcGFuQ2hhcnRDb21tYW5kXCI7XHJcbmltcG9ydCB7IFRvb2dsZUJveFpvb21Db21tYW5kIGFzIFRvZ2dsZUJveFpvb21Db21tYW5kIH0gZnJvbSBcIi4vdXNlckludGVyYWN0aW9uL2NvbW1hbmRzL3Rvb2dsZUJveFpvb21Db21tYW5kXCI7XHJcbmltcG9ydCB7IFRvb2dsZVBhbm5pbmdDb21tYW5kIH0gZnJvbSBcIi4vdXNlckludGVyYWN0aW9uL2NvbW1hbmRzL3Rvb2dsZVBhbm5pbmdDb21tYW5kXCI7XHJcbmltcG9ydCB7IFNlbGVjdFpvb21BeGVzQ29tbWFuZCB9IGZyb20gXCIuL3VzZXJJbnRlcmFjdGlvbi9jb21tYW5kcy9zZWxlY3Rab29tQXhlc0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgQ2hhcnRUeXBlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvY2hhcnRNYW5hZ2VyQ2hhcnRcIjtcclxuaW1wb3J0IHsgSURyb3BwYWJsZSwgRHJhZ0Ryb3BEYXRhSWQgfSBmcm9tIFwiLi4vY29tbW9uL2ludGVyZmFjZXMvZHJvcEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBab29tQ2hhcnRDb21tYW5kIH0gZnJvbSBcIi4vdXNlckludGVyYWN0aW9uL2NvbW1hbmRzL3pvb21DaGFydENvbW1hbmRcIjtcclxuaW1wb3J0IHsgU2VsZWN0UGFubmluZ0F4ZXNDb21tYW5kIH0gZnJvbSBcIi4vdXNlckludGVyYWN0aW9uL2NvbW1hbmRzL3NlbGVjdFBhbm5pbmdBeGVzQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvYmFzZVNlcmllc1wiO1xyXG5pbXBvcnQgeyBJQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvaW50ZXJmYWNlcy9jaGFydE1hbmFnZXJEYXRhTW9kZWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ2hhcnREcm9wSGVscGVyIH0gZnJvbSBcIi4vaGVscGVycy9jaGFydERyb3BIZWxwZXJcIjtcclxuaW1wb3J0IHsgQXV0b1NjYWxlQ29tbWFuZCB9IGZyb20gXCIuL3VzZXJJbnRlcmFjdGlvbi9jb21tYW5kcy9hdXRvU2NhbGVDb21tYW5kXCI7XHJcbmltcG9ydCB7IEltYWdlUHJvdmlkZXIgfSBmcm9tIFwiLi4vY29tbW9uL2ltYWdlUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgRHJhZ0Ryb3BBcmdzIH0gZnJvbSBcIi4uL2NvbW1vbi9kcmFnRHJvcEFyZ3NcIjtcclxuaW1wb3J0IHsgUmVzZXREcmFnUG9zaXRpb25Db21tYW5kIH0gZnJvbSBcIi4vdXNlckludGVyYWN0aW9uL2NvbW1hbmRzL3Jlc2V0RHJhZ1Bvc2l0aW9uQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBEcmFnRHJvcFJlcHJlc2VudGF0aW9uIH0gZnJvbSBcIi4uL2NvbW1vbi9kcmFnRHJvcFJlcHJlc2VudGF0aW9uXCI7XHJcbmltcG9ydCB7IElDaGFydE1hbmFnZXJDaGFydCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2ludGVyZmFjZXMvY2hhcnRNYW5hZ2VyQ2hhcnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU2VyaWVDaGFydFR5cGVIZWxwZXIgfSBmcm9tIFwiLi4vY29tbW9uL1NlcmllQ2hhcnRUeXBlSGVscGVyXCI7XHJcbmltcG9ydCB7IFNlcmllc1R5cGUgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9zZXJpZXNUeXBlXCI7XHJcblxyXG5cclxuY2xhc3MgRXZlbnREcm9wSGVscGVyIGV4dGVuZHMgVHlwZWRFdmVudDxPYmplY3QsIHt9PiB7IH07XHJcblxyXG5lbnVtIENoYXJ0Vmlld1Rvb2xzIHtcclxuICAgIG5vbmUsXHJcbiAgICByZWZlcmVuY2VDdXJzb3IxLFxyXG4gICAgcmVmZXJlbmNlQ3Vyc29yMixcclxuICAgIHBhZ2VTY3JvbGwsXHJcbiAgICBjaGFydFNjcm9sbCxcclxuICAgIGJveFpvb20sXHJcbiAgICBwYW5uaW5nLFxyXG59XHJcblxyXG5lbnVtIFpvb21EaXJlY3Rpb24ge1xyXG4gICAgWCxcclxuICAgIFksXHJcbiAgICBYWVxyXG59XHJcblxyXG5jbGFzcyBDaGFydFZpZXdXaWRnZXQgZXh0ZW5kcyBXaWRnZXRCYXNlIGltcGxlbWVudHMgSURyb3BwYWJsZSB7XHJcblxyXG4gICAgZXZlbnREcm9wSGVscGVyOiBFdmVudERyb3BIZWxwZXIgPSBuZXcgRXZlbnREcm9wSGVscGVyKCk7XHJcbiAgICAvL2V2ZW50RHJhZ092ZXI6IEV2ZW50RHJhZ092ZXIgPSBuZXcgRXZlbnREcmFnT3ZlcigpO1xyXG5cclxuICAgIF9sYXlvdXRNYW5hZ2VyPzogQ2hhcnRWaWV3TGF5b3V0TWFuYWdlcjtcclxuICAgIGNoYXJ0TWFuYWdlcj86IENoYXJ0Vmlld0NoYXJ0TWFuYWdlclxyXG4gICAgdXNlckludGVyYWN0aW9uQ29udHJvbGxlcj86IFVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXI7XHJcblxyXG4gICAgYWN0aXZlU2VsZWN0ZWRab29tQXhpcyA9IFpvb21EaXJlY3Rpb24uWFk7XHJcbiAgICBkcm9wUG9zc2libGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHN0YXRpYyBfcGFnZVNjcm9sbEFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIHByaXZhdGUgY2hhcnRDb21tYW5kTWFwOiB7IFtpZDogc3RyaW5nXTogQ2hhcnRDb21tYW5kQmFzZSB9ID0ge307XHJcblxyXG4gICAgcHJpdmF0ZSBfdXNlckludGVyYWN0aW9uQ29udHJvbGxlckV4ZWN1dGVDaGFydENvbW1hbmRIYW5kbGVyID0gKHNlbmRlcixhcmdzKT0+dGhpcy5vbkV4ZWN1dGVDaGFydENvbW1hbmQoc2VuZGVyICxhcmdzKTtcclxuXHJcbiAgICBpbml0aWFsaXplKGxheW91dENvbnRhaW5lcklkOiBzdHJpbmcpIHtcclxuXHJcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZShsYXlvdXRDb250YWluZXJJZCk7XHJcbiAgICAgICAgdGhpcy5hZGRTdXBwb3J0ZWREcmFnRHJvcERhdGFJZChEcmFnRHJvcERhdGFJZC5zaWduYWwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzcG9zZSB0aGUgb2JqZWN0cyBmcm9tIHRoaXMgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBkaXNwb3NlKCkge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlU3VwcG9ydGVkRHJhZ0Ryb3BEYXRhSWQoRHJhZ0Ryb3BEYXRhSWQuc2lnbmFsKTtcclxuICAgICAgICBpZih0aGlzLl9sYXlvdXRNYW5hZ2VyICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2xheW91dE1hbmFnZXIuZGlzcG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmNoYXJ0TWFuYWdlciAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJ0TWFuYWdlci5kaXNwb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMudXNlckludGVyYWN0aW9uQ29udHJvbGxlciAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgIHRoaXMudXNlckludGVyYWN0aW9uQ29udHJvbGxlci5ldmVudEV4ZWN1dGVDaGFydENvbW1hbmQuZGV0YWNoKHRoaXMuX3VzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXJFeGVjdXRlQ2hhcnRDb21tYW5kSGFuZGxlcik7IFxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBsYXlvdXQgb2YgdGhlIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgY3JlYXRlTGF5b3V0KCkge1xyXG5cclxuICAgICAgICAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKS5jc3MoXCJvdmVyZmxvd1wiLCBcImhpZGRlblwiKTtcclxuICAgICAgICAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKS5hcHBlbmQoJzxkaXYgaWQ9XCJJbm5lckNoYXJ0Vmlld0NvbnRhaW5lclwiIHN0eWxlPVwiZGlzcGxheTogZmxleDsgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsgaGVpZ2h0OiAxMDAlO1wiPjwvZGl2PicpXHJcblxyXG4gICAgICAgIGlmICh0aGlzLnZpZXcgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXNlckludGVyYWN0aW9uQ29udHJvbGxlciA9IG5ldyBVc2VySW50ZXJhY3Rpb25Db250cm9sbGVyKHRoaXMuc3RhdGVzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2xheW91dE1hbmFnZXIgPSBuZXcgQ2hhcnRWaWV3TGF5b3V0TWFuYWdlcih0aGlzKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMudXNlckludGVyYWN0aW9uQ29udHJvbGxlcikge1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJ0TWFuYWdlciA9IG5ldyBDaGFydFZpZXdDaGFydE1hbmFnZXIodGhpcywgdGhpcy51c2VySW50ZXJhY3Rpb25Db250cm9sbGVyLCB0aGlzLl9sYXlvdXRNYW5hZ2VyISwgdGhpcy5kYXRhTW9kZWwgYXMgSUNoYXJ0TWFuYWdlckRhdGFNb2RlbCk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFkZENoYXJ0Q29tbWFuZHMoKTtcclxuXHJcbiAgICAgICAgdGhpcy5fbGF5b3V0TWFuYWdlciEuYWRkQ2hhcnRWaWV3Q29udGFpbmVycyhcIiNJbm5lckNoYXJ0Vmlld0NvbnRhaW5lclwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWRzIHRoZSBzdHlsZXMgZm9yIHRoZSBjaGFydCB2aWV3IHRvb2xiYXJcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGxvYWRTdHlsZXMoKSB7XHJcbiAgICAgICAgc3VwZXIuYWRkU3R5bGUoXCJ3aWRnZXRzL2NoYXJ0Vmlld1dpZGdldC9zdHlsZS9jc3MvcmVmQ3Vyc29yU3R5bGUuY3NzXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgd2lkZ2V0IGNvbnRlbnQgYW5kIGV2ZW50dWFsbHkgc3Vid2lkZ2V0c1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgY3JlYXRlV2lkZ2V0cygpIHtcclxuXHJcbiAgICAgICAgdGhpcy5fbGF5b3V0TWFuYWdlciEuaW5pdGlhbGl6ZUNoYXJ0Vmlld0xheW91dCh0aGlzLmNoYXJ0TWFuYWdlciEudHJhY2VDaGFydExpc3QpO1xyXG5cclxuICAgICAgICB0aGlzLmRpc2FibGVNb3VzZVdoZWVsRm9yU2Nyb2xsYmFyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhZGRDaGFydENvbW1hbmRzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNoYXJ0TWFuYWdlciAhPSB1bmRlZmluZWQgJiYgdGhpcy51c2VySW50ZXJhY3Rpb25Db250cm9sbGVyICE9IHVuZGVmaW5lZCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IHNldEN1cnNvck9uUG9pbnRlclBvc2l0aW9uQ29tbWFuZCA9IG5ldyBTZXRDdXJzb3JPblBvaW50ZXJQb3NpdGlvbkNvbW1hbmQodGhpcy5jaGFydE1hbmFnZXIhKTtcclxuICAgICAgICAgICAgdGhpcy5jaGFydENvbW1hbmRNYXBbQ2hhcnRDb21tYW5kVHlwZS5zZXRDdXJzb3JPblBvaW50ZXJQb3NpdGlvbl0gPSBzZXRDdXJzb3JPblBvaW50ZXJQb3NpdGlvbkNvbW1hbmQ7XHJcblxyXG4gICAgICAgICAgICBsZXQgcmVzZXRab29tQ29tbWFuZCA9IG5ldyBSZXNldFpvb21Db21tYW5kKHRoaXMuY2hhcnRNYW5hZ2VyKTtcclxuICAgICAgICAgICAgdGhpcy5jaGFydENvbW1hbmRNYXBbQ2hhcnRDb21tYW5kVHlwZS5yZXNldFpvb21dID0gcmVzZXRab29tQ29tbWFuZDtcclxuXHJcbiAgICAgICAgICAgIGxldCBjaGVja0N1cnNvckhvdmVyaW5nQ29tbWFuZCA9IG5ldyBDaGVja0N1cnNvckhvdmVyaW5nQ29tbWFuZCh0aGlzLmNoYXJ0TWFuYWdlcik7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcnRDb21tYW5kTWFwW0NoYXJ0Q29tbWFuZFR5cGUuY2hlY2tDdXJzb3JIb3ZlcmluZ10gPSBjaGVja0N1cnNvckhvdmVyaW5nQ29tbWFuZDtcclxuXHJcbiAgICAgICAgICAgIGxldCBkcmFnQ3Vyc29yQ29tbWFuZCA9IG5ldyBEcmFnQ3Vyc29yQ29tbWFuZCh0aGlzLmNoYXJ0TWFuYWdlcik7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcnRDb21tYW5kTWFwW0NoYXJ0Q29tbWFuZFR5cGUuZHJhZ0N1cnNvcl0gPSBkcmFnQ3Vyc29yQ29tbWFuZDtcclxuXHJcbiAgICAgICAgICAgIGxldCBlbmRDdXJzb3JEcmFnQ29tbWFuZCA9IG5ldyBFbmRDdXJzb3JEcmFnQ29tbWFuZCh0aGlzLmNoYXJ0TWFuYWdlcik7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcnRDb21tYW5kTWFwW0NoYXJ0Q29tbWFuZFR5cGUuZW5kQ3Vyc29yRHJhZ10gPSBlbmRDdXJzb3JEcmFnQ29tbWFuZDtcclxuXHJcbiAgICAgICAgICAgIGxldCBwYW5DaGFydENvbW1hbmQgPSBuZXcgUGFuQ2hhcnRDb21tYW5kKHRoaXMuY2hhcnRNYW5hZ2VyKTtcclxuICAgICAgICAgICAgdGhpcy5jaGFydENvbW1hbmRNYXBbQ2hhcnRDb21tYW5kVHlwZS5wYW5DaGFydF0gPSBwYW5DaGFydENvbW1hbmQ7XHJcblxyXG4gICAgICAgICAgICBsZXQgdG9nZ2xlQm94Wm9vbUNvbW1hbmQgPSBuZXcgVG9nZ2xlQm94Wm9vbUNvbW1hbmQodGhpcy5jaGFydE1hbmFnZXIpO1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJ0Q29tbWFuZE1hcFtDaGFydENvbW1hbmRUeXBlLnRvZ2dsZUJveFpvb21dID0gdG9nZ2xlQm94Wm9vbUNvbW1hbmQ7XHJcblxyXG4gICAgICAgICAgICBsZXQgdG9nZ2xlUGFubmluZ0NvbW1hbmQgPSBuZXcgVG9vZ2xlUGFubmluZ0NvbW1hbmQodGhpcy5jaGFydE1hbmFnZXIpO1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJ0Q29tbWFuZE1hcFtDaGFydENvbW1hbmRUeXBlLnRvZ2dsZVBhbm5pbmddID0gdG9nZ2xlUGFubmluZ0NvbW1hbmQ7XHJcblxyXG4gICAgICAgICAgICBsZXQgc2VsZWN0Wm9vbUF4ZXNDb21tYW5kID0gbmV3IFNlbGVjdFpvb21BeGVzQ29tbWFuZCh0aGlzLmNoYXJ0TWFuYWdlcik7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcnRDb21tYW5kTWFwW0NoYXJ0Q29tbWFuZFR5cGUuc2VsZWN0Wm9vbUF4aXNdID0gc2VsZWN0Wm9vbUF4ZXNDb21tYW5kO1xyXG5cclxuICAgICAgICAgICAgbGV0IHpvb21DaGFydENvbW1hbmQgPSBuZXcgWm9vbUNoYXJ0Q29tbWFuZCh0aGlzLmNoYXJ0TWFuYWdlcik7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcnRDb21tYW5kTWFwW0NoYXJ0Q29tbWFuZFR5cGUuem9vbUNoYXJ0XSA9IHpvb21DaGFydENvbW1hbmQ7XHJcblxyXG4gICAgICAgICAgICBsZXQgc2VsZWN0UGFubmluZ0F4ZXNDb21tYW5kID0gbmV3IFNlbGVjdFBhbm5pbmdBeGVzQ29tbWFuZCh0aGlzLmNoYXJ0TWFuYWdlcik7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcnRDb21tYW5kTWFwW0NoYXJ0Q29tbWFuZFR5cGUuc2VsZWN0UGFubmluZ0F4ZXNdID0gc2VsZWN0UGFubmluZ0F4ZXNDb21tYW5kO1xyXG5cclxuICAgICAgICAgICAgbGV0IGF1dG9TY2FsZUNvbW1hbmQgPSBuZXcgQXV0b1NjYWxlQ29tbWFuZCh0aGlzLmNoYXJ0TWFuYWdlcik7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcnRDb21tYW5kTWFwW0NoYXJ0Q29tbWFuZFR5cGUuYXV0b1NjYWxlXSA9IGF1dG9TY2FsZUNvbW1hbmQ7XHJcblxyXG4gICAgICAgICAgICBsZXQgcmVzZXREcmFnUG9zaXRpb25Db21tYW5kID0gbmV3IFJlc2V0RHJhZ1Bvc2l0aW9uQ29tbWFuZCh0aGlzLmNoYXJ0TWFuYWdlcik7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcnRDb21tYW5kTWFwW0NoYXJ0Q29tbWFuZFR5cGUucmVzZXREcmFnUG9zaXRpb25dID0gcmVzZXREcmFnUG9zaXRpb25Db21tYW5kO1xyXG5cclxuICAgICAgICAgICAgdGhpcy51c2VySW50ZXJhY3Rpb25Db250cm9sbGVyLmV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZC5hdHRhY2godGhpcy5fdXNlckludGVyYWN0aW9uQ29udHJvbGxlckV4ZWN1dGVDaGFydENvbW1hbmRIYW5kbGVyKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNoYXJ0TWFuYWdlciB1bmRlZmluZWRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25FeGVjdXRlQ2hhcnRDb21tYW5kKHNlbmRlciwgYXJncykge1xyXG4gICAgICAgIHRoaXMuY2hhcnRDb21tYW5kTWFwW2FyZ3MuY29tbWFuZFR5cGVdLm9uRXhlY3V0ZUNoYXJ0Q29tbWFuZChzZW5kZXIsIGFyZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkV2ZW50VG9vbGJhckJ1dHRvbkNsaWNrZWQoc2VuZGVyLCBhcmdzKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudXNlckludGVyYWN0aW9uQ29udHJvbGxlcikge1xyXG4gICAgICAgICAgICB0aGlzLnVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXIub25Ub29sYmFyQ2xpY2soc2VuZGVyLCBhcmdzKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25Vc2VyQ2hhcnRJbnRlcmFjdGlvbihzZW5kZXIsIGV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb25BcmdzOiBFdmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncykge1xyXG4gICAgICAgIGlmICh0aGlzLnVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXIpIHtcclxuICAgICAgICAgICAgdGhpcy51c2VySW50ZXJhY3Rpb25Db250cm9sbGVyLm9uQ2hhcnRJbnRlcmFjdGlvbihldmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncy5jaGFydEludGVyYWN0aW9uVHlwZSwgc2VuZGVyLCBldmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncy5ldmVudEFyZ3VtZW50cyk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXNpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHtcclxuICAgICAgICAkKFwiI0lubmVyQ2hhcnRWaWV3Q29udGFpbmVyXCIpWzBdLnN0eWxlLndpZHRoID0gd2lkdGggKyBcInB4XCI7XHJcbiAgICAgICAgJChcIiNJbm5lckNoYXJ0Vmlld0NvbnRhaW5lclwiKVswXS5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0TWFuYWdlciEucmVzaXplKHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUNoYXJ0cyh0cmFjZUNoYXJ0TGlzdDogQXJyYXk8SVRyYWNlQ2hhcnQ+KSB7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0TWFuYWdlciEudXBkYXRlQ2hhcnRzKHRoaXMuY2hhcnRNYW5hZ2VyIS50cmFjZUNoYXJ0TGlzdCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaENoYXJ0cyhzZW5kZXIsIGRhdGEpIHtcclxuICAgICAgICB0aGlzLmNoYXJ0TWFuYWdlciEub25DaGFydE1hbmFnZXJNb2RlbENoYW5nZWQoc2VuZGVyLCBkYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRQYWdlU2Nyb2xsKGVuYWJsZTogYm9vbGVhbikge1xyXG4gICAgICAgIENoYXJ0Vmlld1dpZGdldC5fcGFnZVNjcm9sbEFjdGl2ZSA9IGVuYWJsZTtcclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3RSZWZlcmVuY2VDdXJzb3IoY3Vyc29ySW5kZXgpIHtcclxuICAgICAgICBpZiAodGhpcy51c2VySW50ZXJhY3Rpb25Db250cm9sbGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXNlckludGVyYWN0aW9uQ29udHJvbGxlci5zZWxlY3RDdXJzb3IoY3Vyc29ySW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXIgbm90IGRlZmluZWRcIilcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkaXNhYmxlTW91c2VXaGVlbEZvclNjcm9sbGJhcigpIHtcclxuICAgICAgICAkKFwiI1wiICsgdGhpcy5fbGF5b3V0TWFuYWdlciEuY2hhcnRTcGxpdHRlclBhcmVudENvbnRhaW5lcklkKS5iaW5kKCdtb3VzZXdoZWVsIERPTU1vdXNlU2Nyb2xsJywgZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBkaXNhYmxlU2Nyb2xsYmFyU2Nyb2xsID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBpZiAoQ2hhcnRWaWV3V2lkZ2V0Ll9wYWdlU2Nyb2xsQWN0aXZlID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS50eXBlID09ICdtb3VzZXdoZWVsJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVTY3JvbGxiYXJTY3JvbGwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZS50eXBlID09ICdET01Nb3VzZVNjcm9sbCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlU2Nyb2xsYmFyU2Nyb2xsID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZGlzYWJsZVNjcm9sbGJhclNjcm9sbCkge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8jcmVnaW9uIGRyb3Agc3VwcG9ydFxyXG4gICAgZHJhZ1N0YXJ0KGFyZ3M6IERyYWdEcm9wQXJncykge1xyXG4gICAgICAgIGlmIChhcmdzLmRhdGFbMF0gaW5zdGFuY2VvZiBCYXNlU2VyaWVzKSB7XHJcbiAgICAgICAgICAgIGxldCBzYW1lR3JvdXAgPSB0aGlzLmFyZVNlcmllc0Zyb21TYW1lR3JvdXAoYXJncy5kYXRhKTtcclxuICAgICAgICAgICAgdGhpcy5jaGFydE1hbmFnZXIhLmFkZERyb3BwYWJsZUxvY2F0aW9ucyhhcmdzLmRhdGEsIHNhbWVHcm91cCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRyYWdTdG9wKGFyZ3M6IERyYWdEcm9wQXJncykge1xyXG4gICAgICAgIGlmIChhcmdzLmRhdGFbMF0gaW5zdGFuY2VvZiBCYXNlU2VyaWVzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcnRNYW5hZ2VyIS5yZW1vdmVEcm9wcGFibGVMb2NhdGlvbnMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZHJhZ092ZXIoYXJnczogRHJhZ0Ryb3BBcmdzKTogYm9vbGVhbiB7XHJcbiAgICAgICAgdGhpcy5kcm9wUG9zc2libGUgPSBmYWxzZTtcclxuICAgICAgICB2YXIgdGFyZ2V0Q2hhcnRDb250YWluZXJJZCA9IGFyZ3MuY3VycmVudFRhcmdldC5wYXJlbnRFbGVtZW50LmlkO1xyXG4gICAgICAgIHZhciB0YXJnZXRDaGFydCA9IHRoaXMuY2hhcnRNYW5hZ2VyIS5nZXRUcmFjZUNoYXJ0QnlDb250YWluZXJJZCh0YXJnZXRDaGFydENvbnRhaW5lcklkKTtcclxuICAgICAgICBsZXQgY2hhcnRNYW5hZ2VyRGF0YU1vZGVsID0gdGhpcy5kYXRhTW9kZWwgYXMgSUNoYXJ0TWFuYWdlckRhdGFNb2RlbDtcclxuICAgICAgICBsZXQgZHJvcEhlbHBlciA9IG5ldyBDaGFydERyb3BIZWxwZXIoY2hhcnRNYW5hZ2VyRGF0YU1vZGVsLCB0aGlzKTtcclxuICAgICAgICBsZXQgY2hhcnRBcmVhID0gdGhpcy5nZXRDaGFydEFyZWFJZChhcmdzLmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgICAgIGlmICh0YXJnZXRDaGFydCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgLy8gRHJhZyBvdmVyIGEgY2hhcnQvY2hhcnQgd2lkZ2V0XHJcbiAgICAgICAgICAgIGxldCBzZXJpZXMgPSBhcmdzLmRhdGEgYXMgQXJyYXk8QmFzZVNlcmllcz47XHJcbiAgICAgICAgICAgIGxldCBjaGFydCA9IHRhcmdldENoYXJ0IGFzIENoYXJ0QmFzZTtcclxuICAgICAgICAgICAgbGV0IGRyb3BMb2NhdGlvblR5cGUgPSBkcm9wSGVscGVyLmdldERyb3BMb2NhdGlvblR5cGUoYXJncy5jdXJyZW50VGFyZ2V0LCBjaGFydCwgc2VyaWVzKTtcclxuICAgICAgICAgICAgdGhpcy5kcmFnQW5kRHJvcFJlcHJlc2VudGF0aW9uKGNoYXJ0LCBzZXJpZXMsIGRyb3BMb2NhdGlvblR5cGUsIGFyZ3MuZHJhZ0Ryb3BSZXByZXNlbnRhdGlvbik7XHJcbiAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0RHJvcHBhYmxlQXJlYXMoY2hhcnQsIGFyZ3MuY3VycmVudFRhcmdldCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGRyb3BIZWxwZXIuY2FuQWRkQ2hhcnQoKSA9PSB0cnVlKSB7ICAvLyBJcyBpdCBwb3NzaWJsZSB0byBhZGQgb25lIG1vcmUgY2hhcnRcclxuICAgICAgICAgICAgdGhpcy5yZXNldEhpZ2hsaWdodGluZygpO1xyXG4gICAgICAgICAgICAvLyBNYXliZSBkcmFnIG92ZXIgZW1wdHkgc3BhY2VcclxuICAgICAgICAgICAgaWYgKGNoYXJ0QXJlYSA9PSBcIkNoYXJ0Vmlld0NoYXJ0U3BsaXR0ZXJfbWFpbl9sYXN0UGFuZV9ZVFwiICkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kcm9wUG9zc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVEcmFnRHJvcFJlcHJlc2VudGF0aW9uKGFyZ3MuZHJhZ0Ryb3BSZXByZXNlbnRhdGlvbiwgXCIuLi9hcHAvd2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL2RyYWdEcm9wL2FkZE5ld1lUQ2hhcnQuc3ZnXCIsIFwiQ3JlYXRlIGEgbmV3IFlUIGNoYXJ0IGFuZCBhZGQgZHJhZ2dlZCBzaWduYWxzXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVDaGFydFR5cGVEcm9wcGFibGVBcmVhcyhjaGFydEFyZWEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGNoYXJ0QXJlYSA9PSBcIkNoYXJ0Vmlld0NoYXJ0U3BsaXR0ZXJfbWFpbl9sYXN0UGFuZV9GRlRcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kcm9wUG9zc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVEcmFnRHJvcFJlcHJlc2VudGF0aW9uKGFyZ3MuZHJhZ0Ryb3BSZXByZXNlbnRhdGlvbiwgXCIuLi9hcHAvd2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL2RyYWdEcm9wL2FkZE5ld0ZGVENoYXJ0LnN2Z1wiLCBcIkNyZWF0ZSBhIG5ldyBGRlQgY2hhcnQgYW5kIGFkZCBkcmFnZ2VkIHNpZ25hbHNcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUNoYXJ0VHlwZURyb3BwYWJsZUFyZWFzKGNoYXJ0QXJlYSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoY2hhcnRBcmVhID09IFwiQ2hhcnRWaWV3Q2hhcnRTcGxpdHRlcl9tYWluX2xhc3RQYW5lX1hZXCIpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kcm9wUG9zc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVEcmFnRHJvcFJlcHJlc2VudGF0aW9uKGFyZ3MuZHJhZ0Ryb3BSZXByZXNlbnRhdGlvbiwgXCIuLi9hcHAvd2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL2RyYWdEcm9wL2FkZE5ld1hZQ2hhcnQuc3ZnXCIsIFwiQ3JlYXRlIGEgbmV3IFhZIGNoYXJ0IGFuZCBhZGQgYSBjYWxjdWxhdGVkIFhZIHNpZ25hbFwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQ2hhcnRUeXBlRHJvcHBhYmxlQXJlYXMoY2hhcnRBcmVhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY2hhcnRBcmVhID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNoYXJ0VHlwZURyb3BwYWJsZUFyZWFzKGNoYXJ0QXJlYSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB0aGlzLmRyb3BQb3NzaWJsZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyYWdBbmREcm9wUmVwcmVzZW50YXRpb24oY2hhcnQ6IElUcmFjZUNoYXJ0LCBzZXJpZXM6IEFycmF5PEJhc2VTZXJpZXM+LCBkcm9wTG9jYXRpb25UeXBlOiBEcm9wTG9jYXRpb25UeXBlLCBkcmFnRHJvcFJlcHJlc2VudGF0aW9uKXtcclxuICAgICAgICBpZihjaGFydC50eXBlID09IENoYXJ0VHlwZS5ZVENoYXJ0IHx8IGNoYXJ0LnR5cGUgPT0gQ2hhcnRUeXBlLkZGVENoYXJ0KXtcclxuICAgICAgICAgICAgaWYgKGRyb3BMb2NhdGlvblR5cGUgPT0gRHJvcExvY2F0aW9uVHlwZS5hZGROZXdTY2FsZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kcm9wUG9zc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaWYoc2VyaWVzWzBdLnR5cGUgPT09IFNlcmllc1R5cGUudGltZVNlcmllcyAmJiBjaGFydC50eXBlID09IENoYXJ0VHlwZS5GRlRDaGFydCApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZURyYWdEcm9wUmVwcmVzZW50YXRpb24oZHJhZ0Ryb3BSZXByZXNlbnRhdGlvbiwgXCIuLi9hcHAvd2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL2RyYWdEcm9wL2FkZE5ld1NjYWxlLnN2Z1wiLCBcIkNhbGN1bGF0ZSBGRlQgc2luZ2FsIGFuZCBhZGQgaXQgdG8gbmV3IHNjYWxlXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVEcmFnRHJvcFJlcHJlc2VudGF0aW9uKGRyYWdEcm9wUmVwcmVzZW50YXRpb24sIFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9kcmFnRHJvcC9hZGROZXdTY2FsZS5zdmdcIiwgXCJDcmVhdGUgYSBuZXcgc2NhbGUgYW5kIGFkZCBkcmFnZ2VkIHNpZ25hbHNcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZHJvcExvY2F0aW9uVHlwZSA9PSBEcm9wTG9jYXRpb25UeXBlLmFzc2lnblRvU2NhbGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJvcFBvc3NpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmKHNlcmllc1swXS50eXBlID09PSBTZXJpZXNUeXBlLnRpbWVTZXJpZXMgJiYgY2hhcnQudHlwZSA9PSBDaGFydFR5cGUuRkZUQ2hhcnQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVEcmFnRHJvcFJlcHJlc2VudGF0aW9uKGRyYWdEcm9wUmVwcmVzZW50YXRpb24sIFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9kcmFnRHJvcC9hc3NpZ25Ub1NjYWxlLnN2Z1wiLCBcIkNhbGN1bGF0ZSBGRlQgc2lnbmFsIGFuZCBhZGQgaXQgdG8gc2NhbGVcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZURyYWdEcm9wUmVwcmVzZW50YXRpb24oZHJhZ0Ryb3BSZXByZXNlbnRhdGlvbiwgXCIuLi9hcHAvd2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL2RyYWdEcm9wL2Fzc2lnblRvU2NhbGUuc3ZnXCIsIFwiQWRkIGRyYWdnZWQgc2lnbmFscyB0byBzY2FsZVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgaWYgKGRyb3BMb2NhdGlvblR5cGUgPT0gRHJvcExvY2F0aW9uVHlwZS5hc3NpZ25Ub1NjYWxlICYmIHRoaXMuYXJlU2VyaWVzRnJvbVNhbWVHcm91cChzZXJpZXMpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyb3BQb3NzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpZihzZXJpZXNbMF0udHlwZSA9PSBTZXJpZXNUeXBlLnRpbWVTZXJpZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZURyYWdEcm9wUmVwcmVzZW50YXRpb24oZHJhZ0Ryb3BSZXByZXNlbnRhdGlvbiwgXCIuLi9hcHAvd2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL2RyYWdEcm9wL2Fzc2lnblRvQ2hhcnQuc3ZnXCIsIFwiQ2FsY3VsYXRlIFhZIHNpZ25hbCBhbmQgYWRkIGl0IHRvIHRoZSBjaGFydFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlRHJhZ0Ryb3BSZXByZXNlbnRhdGlvbihkcmFnRHJvcFJlcHJlc2VudGF0aW9uLCBcIi4uL2FwcC93aWRnZXRzL2NvbW1vbi9zdHlsZS9pbWFnZXMvZHJhZ0Ryb3AvYXNzaWduVG9DaGFydC5zdmdcIiwgXCJBZGQgZHJhZ2dlZCBzaWduYWxzIHRvIGNoYXJ0XCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgZHJhZyBhbmQgZHJvcCByZXByZXNlbnRhdGlvbiB3aGlsZSBkcmFnZ2luZyB3aXRoIG5ldyBpY29ucyBvciB0ZXh0c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0RyYWdEcm9wUmVwcmVzZW50YXRpb259IGRyYWdEcm9wUmVwcmVzZW50YXRpb25cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBvdmVybGF5SWNvblBhdGhcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuZXdUZXh0XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlRHJhZ0Ryb3BSZXByZXNlbnRhdGlvbihkcmFnRHJvcFJlcHJlc2VudGF0aW9uOiBEcmFnRHJvcFJlcHJlc2VudGF0aW9ufHVuZGVmaW5lZCwgb3ZlcmxheUljb25QYXRoOiBzdHJpbmcsIG5ld1RleHQ6IHN0cmluZyl7XHJcbiAgICAgICAgaWYoZHJhZ0Ryb3BSZXByZXNlbnRhdGlvbiAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAvLyBBZGQgb3ZlcmxheSBpY29uIGlmIGF2YWlsYWJsZVxyXG4gICAgICAgICAgICBpZihvdmVybGF5SWNvblBhdGggIT0gXCJcIil7XHJcbiAgICAgICAgICAgICAgICBsZXQgYWRkTmV3U2NhbGVJbWFnZSA9IEltYWdlUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXRJbWFnZShvdmVybGF5SWNvblBhdGgpO1xyXG4gICAgICAgICAgICAgICAgaWYoYWRkTmV3U2NhbGVJbWFnZSAhPSBcIlwiKXtcclxuICAgICAgICAgICAgICAgICAgICBkcmFnRHJvcFJlcHJlc2VudGF0aW9uLmljb25MaXN0LnB1c2goYWRkTmV3U2NhbGVJbWFnZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gYWRkIHRleHQgb3IgcmVwbGFjZSBleGlzdGluZyB0ZXh0XHJcbiAgICAgICAgICAgIGlmKGRyYWdEcm9wUmVwcmVzZW50YXRpb24udGV4dExpc3QubGVuZ3RoID09IDApe1xyXG4gICAgICAgICAgICAgICAgZHJhZ0Ryb3BSZXByZXNlbnRhdGlvbi50ZXh0TGlzdC5wdXNoKG5ld1RleHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBkcmFnRHJvcFJlcHJlc2VudGF0aW9uLnRleHRMaXN0WzBdID0gbmV3VGV4dDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkcm9wKGFyZ3M6IERyYWdEcm9wQXJncykge1xyXG4gICAgICAgIGxldCBzZXJpZXMgPSBhcmdzLmRhdGEgYXMgQXJyYXk8QmFzZVNlcmllcz47XHJcbiAgICAgICAgaWYgKHRoaXMuZHJvcFBvc3NpYmxlKSB7IC8vIElzIGRyb3AgcG9zc2libGVcclxuICAgICAgICAgICAgbGV0IGNoYXJ0TWFuYWdlckRhdGFNb2RlbCA9IHRoaXMuZGF0YU1vZGVsIGFzIElDaGFydE1hbmFnZXJEYXRhTW9kZWw7XHJcbiAgICAgICAgICAgIGxldCBkcm9wSGVscGVyID0gbmV3IENoYXJ0RHJvcEhlbHBlcihjaGFydE1hbmFnZXJEYXRhTW9kZWwsIHRoaXMpO1xyXG4gICAgICAgICAgICBsZXQgdGFyZ2V0Q2hhcnQgPSB0aGlzLmNoYXJ0TWFuYWdlciEuZ2V0VHJhY2VDaGFydEJ5Q29udGFpbmVySWQoYXJncy5jdXJyZW50VGFyZ2V0LnBhcmVudEVsZW1lbnQuaWQpO1xyXG4gICAgICAgICAgICBpZiAodGFyZ2V0Q2hhcnQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGxldCBjaGFydDogSUNoYXJ0TWFuYWdlckNoYXJ0IHwgdW5kZWZpbmVkID0gY2hhcnRNYW5hZ2VyRGF0YU1vZGVsLmdldENoYXJ0KHRhcmdldENoYXJ0LndpZGdldE5hbWUpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNlcmllQ2hhcnRUeXBlSGVscGVyID0gbmV3IFNlcmllQ2hhcnRUeXBlSGVscGVyKCk7XHJcbiAgICAgICAgICAgICAgICBzZXJpZXMgPSBzZXJpZUNoYXJ0VHlwZUhlbHBlci5nZXREcm9wcGFibGVTZXJpZXMoY2hhcnQhLmdldEFsbFNlcmllcygpLHNlcmllcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZHJvcEhlbHBlci5hZGRTZXJpZXMoYXJncy5jdXJyZW50VGFyZ2V0LCB0YXJnZXRDaGFydCwgc2VyaWVzLCB0aGlzLl9sYXlvdXRNYW5hZ2VyISk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRyb3BGb2N1c0xvc3QoYXJnczogRHJhZ0Ryb3BBcmdzKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVDaGFydFR5cGVEcm9wcGFibGVBcmVhcyhhcmdzLmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgICAgIHRoaXMucmVzZXRIaWdobGlnaHRpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhpZ2hsaWdodHMgYXJlYXMgd2hlcmUgc2lnbmFscyBpcyBiZWluZyBkcmFnZ2VkXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtDaGFydEJhc2V9IGNoYXJ0XHJcbiAgICAgKiBAcGFyYW0geyp9IGN1cnJlbnRUYXJnZXRcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBoaWdobGlnaHREcm9wcGFibGVBcmVhcyhjaGFydDogQ2hhcnRCYXNlLCBjdXJyZW50VGFyZ2V0KXtcclxuICAgICAgICBpZihjdXJyZW50VGFyZ2V0LmlkLmluY2x1ZGVzKFwiX2F4aXNEcm9wWm9uZVNjYWxlXCIpIHx8IGN1cnJlbnRUYXJnZXQuaWQuaW5jbHVkZXMoXCJfYXhpc0Ryb3Bab25lX2NoYXJ0QXJlYVwiKSB8fCBjdXJyZW50VGFyZ2V0LmlkLmluY2x1ZGVzKFwiX3JlZkN1cnNvcl9cIikpe1xyXG4gICAgICAgICAgICBjaGFydC51cGRhdGVEcm9wcGFibGVBcmVhcyhjdXJyZW50VGFyZ2V0KTtcclxuICAgICAgICAgICAgdGhpcy5yZXNldEhpZ2hsaWdodGluZyhjaGFydCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJlc2V0SGlnaGxpZ2h0aW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVzZXQgaGlnaGxpZ2h0ZWQgYXJlYXMgZm9yIGFsbCBjaGFydHMsIGV4Y2VwdCB0aGUgc2VsZWN0ZWQgb25lIFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SVRyYWNlQ2hhcnR9IFtjaGFydF1cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZXNldEhpZ2hsaWdodGluZyhjaGFydD86IElUcmFjZUNoYXJ0KXtcclxuICAgICAgICBsZXQgdHJhY2VDaGFydHM6IEFycmF5PElUcmFjZUNoYXJ0PiA9IHRoaXMuY2hhcnRNYW5hZ2VyIS50cmFjZUNoYXJ0TGlzdDtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdHJhY2VDaGFydHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJ0ICE9IHRyYWNlQ2hhcnRzW2ldKXtcclxuICAgICAgICAgICAgICAgIHRyYWNlQ2hhcnRzW2ldLnJlc2V0SGlnaGxpZ2h0aW5nKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGUgaGlnaGxpZ2h0aW5nIHN0YXRlIGZvciBjaGFydCBUeXBlIGFyZWFzXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHBhcmFtIHsoc3RyaW5nIHwgdW5kZWZpbmVkKX0gY3VycmVudFRhcmdldElkXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCB1cGRhdGVDaGFydFR5cGVEcm9wcGFibGVBcmVhcyhjdXJyZW50VGFyZ2V0SWQ6IHN0cmluZyB8IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgbGV0IGVtcHR5U3BhY2VFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0NoYXJ0Vmlld0NoYXJ0U3BsaXR0ZXJfbWFpbl9sYXN0UGFuZScpO1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBlbXB0eVNwYWNlRWxlbWVudCEuY2hpbGRFbGVtZW50Q291bnQ7IGkgPSBpICsgMSl7XHJcbiAgICAgICAgICAgIGlmIChlbXB0eVNwYWNlRWxlbWVudCEuY2hpbGRyZW5baV0uaWQgPT0gY3VycmVudFRhcmdldElkKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVtcHR5U3BhY2VFbGVtZW50IS5jaGlsZHJlbltpXS5pZCk7XHJcbiAgICAgICAgICAgICAgICBhcmVhIS5jbGFzc0xpc3QuYWRkKCdkcmFnZ2VkT3ZlcicpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IGFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbXB0eVNwYWNlRWxlbWVudCEuY2hpbGRyZW5baV0uaWQpO1xyXG4gICAgICAgICAgICAgICAgYXJlYSEuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZ2dlZE92ZXInKTsgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBjaGFydCBhcmVhIGlkIFxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHRhcmdldFxyXG4gICAgICogQHJldHVybnMgeyhzdHJpbmcgfCB1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0Q2hhcnRBcmVhSWQodGFyZ2V0OiBIVE1MRWxlbWVudCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgbGV0IHl0QXJlYSA9ICdDaGFydFZpZXdDaGFydFNwbGl0dGVyX21haW5fbGFzdFBhbmVfWVQnO1xyXG4gICAgICAgIGxldCBmZnRBcmVhID0gJ0NoYXJ0Vmlld0NoYXJ0U3BsaXR0ZXJfbWFpbl9sYXN0UGFuZV9GRlQnO1xyXG4gICAgICAgIGxldCB4eUFyZWEgPSAnQ2hhcnRWaWV3Q2hhcnRTcGxpdHRlcl9tYWluX2xhc3RQYW5lX1hZJztcclxuXHJcbiAgICAgICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2Rpc2FibGVkJykgfHwgdGFyZ2V0IS5wYXJlbnRFbGVtZW50IS5jbGFzc0xpc3QuY29udGFpbnMoJ2Rpc2FibGVkJykpe1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0YXJnZXQuaWQgPT0geXRBcmVhIHx8IHRhcmdldCEucGFyZW50RWxlbWVudCEuaWQgPT0geXRBcmVhKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB5dEFyZWE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRhcmdldC5pZCA9PSBmZnRBcmVhIHx8IHRhcmdldCEucGFyZW50RWxlbWVudCEuaWQgPT0gZmZ0QXJlYSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmZ0QXJlYTtcclxuICAgICAgICB9IFxyXG4gICAgICAgIGVsc2UgaWYgKHRhcmdldC5pZCA9PSB4eUFyZWEgfHwgdGFyZ2V0IS5wYXJlbnRFbGVtZW50IS5pZCA9PSB4eUFyZWEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHh5QXJlYTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiBkcmFnIHNlcmllcyBiZWxvbmcgdG8gdGhlIHNhbWUgc2VyaWUgZ3JvdXBcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxCYXNlU2VyaWVzPn0gc2VyaWVzXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhcmVTZXJpZXNGcm9tU2FtZUdyb3VwKHNlcmllczogQXJyYXk8QmFzZVNlcmllcz4pOiBib29sZWFue1xyXG4gICAgICAgIGxldCBwYXJlbnQgPSBzZXJpZXNbMF0ucGFyZW50O1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgc2VyaWVzLmxlbmd0aDsgaSA9IGkgKyAxKXtcclxuICAgICAgICAgICAgaWYgKHNlcmllc1tpXS5wYXJlbnQgIT0gcGFyZW50KXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyNlbmRyZWdpb24gZHJvcCBzdXBwb3J0XHJcbn1cclxuXHJcbmV4cG9ydCB7IENoYXJ0Vmlld1dpZGdldCwgQ2hhcnRWaWV3VG9vbHMsIFpvb21EaXJlY3Rpb24sIEV2ZW50RHJvcEhlbHBlcn07XHJcblxyXG4iXX0=