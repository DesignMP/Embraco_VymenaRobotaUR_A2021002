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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
define(["require", "exports", "../common/treeGridWidgetBase", "./view/traceConfigDatapointsTreeGridToolbar", "../../view/datapointDialog/datapointDialog", "../../view/datapointDialog/eventDatapointArgs", "../../models/diagnostics/trace/traceDataPoint", "./view/traceConfigDatapointsTreeGridCellEditEvents", "./model/traceConfigDatapointsDataModel", "./defaultComponentSettings"], function (require, exports, treeGridWidgetBase_1, traceConfigDatapointsTreeGridToolbar_1, datapointDialog_1, eventDatapointArgs_1, traceDataPoint_1, traceConfigDatapointsTreeGridCellEditEvents_1, traceConfigDatapointsDataModel_1, defaultComponentSettings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * implements the TraceConfigDatapointsWidget
     *
     * @class TraceConfigDatapointsWidget
     * @extends {TreeGridWidgetBase}
     */
    var TraceConfigDatapointsWidget = /** @class */ (function (_super) {
        __extends(TraceConfigDatapointsWidget, _super);
        function TraceConfigDatapointsWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._addDataPointHandler = function (sender, args) { return _this.onAddDatapoint(sender, args); };
            _this._dialogClosedHandler = function (sender, args) { return _this.onDialogClosed(sender, args); };
            _this._availableTraceDataPoints = new Array();
            return _this;
        }
        /* initialize the widget
         *
         * @param {string} layoutContainerId
         * @memberof TraceConfigDatapointsWidget
         */
        TraceConfigDatapointsWidget.prototype.initialize = function (layoutContainerId) {
            _super.prototype.initialize.call(this, layoutContainerId, 30);
            _super.prototype.setHeaderContent.call(this, "Data points");
            // Set dynamic column settings
            _super.prototype.setDynamicColumn.call(this, 3, 250);
        };
        TraceConfigDatapointsWidget.prototype.initializeComponent = function () {
            this.component.defaultSettingsDataId = defaultComponentSettings_1.DefaultComponentSettings.WidgetDefinitionId;
            this.component.disablePersisting();
        };
        /**
         * Returns the default component settings for this widget
         *
         * @returns {*}
         * @memberof TraceConfigDatapointsWidget
         */
        TraceConfigDatapointsWidget.prototype.getDefaultComponentSettings = function () {
            return defaultComponentSettings_1.DefaultComponentSettings.getTraceConfigurationDataPointsDefinition();
        };
        /**
         * Updates and initializes the trace data points
         *
         * @private
         * @param {TraceDataPoint[]} traceDataPoints
         * @memberof TraceConfigDatapointsWidget
         */
        TraceConfigDatapointsWidget.prototype.initializeTraceDataPoints = function (traceDataPoints) {
            var traceConfigDatapointsDataModel = new traceConfigDatapointsDataModel_1.TraceConfigDatapointsDataModel();
            traceConfigDatapointsDataModel.initialize();
            this.dataModel = traceConfigDatapointsDataModel;
            traceConfigDatapointsDataModel.initData = traceDataPoints;
            this.updateToolbar();
        };
        /**
         * implements the model change handling
         *
         * @param {IDataModel} sender
         * @param {EventModelChangedArgs} data
         * @returns {*}
         * @memberof TraceConfigDatapointsWidget
         */
        TraceConfigDatapointsWidget.prototype.handleModelChanged = function (sender, eventArgs) {
            var dataPoints = eventArgs.data;
            this.refreshDatapointsValues(dataPoints);
            this.updateToolbarButtonStates(dataPoints);
        };
        /**
         * handles the changes of observed items requested by 'observeDataModelItems'
         *
         * @param {IDataModel} sender
         * @param {EventModelChangedArgs} data
         * @memberof TraceConfigDatapointsWidget
         */
        TraceConfigDatapointsWidget.prototype.handleModelItemsChanged = function (sender, eventArgs) {
            var dataPoints = this.dataModel.data;
            this.updateToolbarButtonStates(dataPoints);
            this.refreshDatapointsValues(dataPoints);
        };
        /** creates the datapoint selection dialog
         *
         * @memberof TraceConfigDatapointsWidget
         */
        TraceConfigDatapointsWidget.prototype.createDatapointsDialog = function () {
            var datapointDialogId = "datapointDialog";
            $(this.cssParentContentId).append("<div id='" + datapointDialogId + "'><div id='datapointContentRoot'></></>");
            datapointDialog_1.DatapointDialog.initialize(datapointDialogId);
        };
        /** catches the add datapoint event from the datapoint dialog
         * => adds or replaces the selected datapoint with the datapoint from the datapoint dialog
         *
         * @param {} sender
         * @param {EventDatapointArgs} args
         * @memberof TraceConfigDatapointsWidget
         */
        TraceConfigDatapointsWidget.prototype.onAddDatapoint = function (sender, args) {
            var treeGridObj = this.getTreeGridObject();
            var actualSelectionIndex = treeGridObj.model.selectedRowIndex;
            if (actualSelectionIndex == undefined) {
                actualSelectionIndex = -1;
            }
            var dataPoint = traceDataPoint_1.TraceDataPoint.createWithDataPointInfo(args.dataPointInfo);
            if (args.action == eventDatapointArgs_1.DatapointAction.add) {
                this._dataModel.addDatapoint(actualSelectionIndex, dataPoint);
            }
            else if (args.action == eventDatapointArgs_1.DatapointAction.replace) {
                this._dataModel.replaceDatapoint(actualSelectionIndex, dataPoint);
            }
            this.updateToolbar();
        };
        /** catches the dialog close event from the datapoint dialog
         * => detaches the dialog events
         *
         * @param {} sender
         * @param {} args
         * @memberof TraceConfigDatapointsWidget
         */
        TraceConfigDatapointsWidget.prototype.onDialogClosed = function (sender, args) {
            datapointDialog_1.DatapointDialog.eventAddDatapoint.detach(this._addDataPointHandler);
            datapointDialog_1.DatapointDialog.eventDialogClosed.detach(this._dialogClosedHandler);
        };
        /** creates the tree grid for the datapoint informations
         *
         * @memberof TraceConfigDatapointsWidget
         */
        TraceConfigDatapointsWidget.prototype.createTreeGrid = function () {
            var _this = this;
            this.createDatapointsDialog();
            $(this.cssParentContentId).ejTreeGrid(__assign(__assign(__assign(__assign(__assign({}, this.getTreeGridColumnDefinition()), this.getTreeGridColumnResizeSupport()), this.getTreeGridToolbarSupport()), this.getTreeGridCellEditSupport()), { selectionType: ej.TreeGrid.SelectionType.Multiple, editSettings: { allowEditing: true }, rowSelected: function (args) { return _this.treeGridRowSelected(args); }, actionBegin: function (args) { return _this.treeGridActionBegin(args); }, create: function (args) { return _this.treeGridCreated(); } }));
        };
        /**
         * Returns the tree grid column definition
         *
         * @private
         * @returns {{}}
         * @memberof TraceConfigDatapointsWidget
         */
        TraceConfigDatapointsWidget.prototype.getTreeGridColumnDefinition = function () {
            return {
                columns: [
                    { field: "dataPointName", headerText: "Data point", width: "350" },
                    { field: "componentName", headerText: "Component" },
                    { field: "name", headerText: "Name" },
                    { field: "description", headerText: "Description", width: "250" },
                ],
            };
        };
        /**
         * Returns the tree grid column resize settings
         *
         * @private
         * @returns {{}}
         * @memberof TraceConfigDatapointsWidget
         */
        TraceConfigDatapointsWidget.prototype.getTreeGridColumnResizeSupport = function () {
            var _this = this;
            return {
                allowColumnResize: true,
                columnResizeSettings: { columnResizeMode: ej.TreeGrid.ColumnResizeMode.FixedColumns },
                columnResized: function (args) { return _super.prototype.resizeDynamicColumn.call(_this, args.columnIndex, args.model); },
            };
        };
        /**
         * Returns the tree grid toolbar settings
         *
         * @private
         * @returns {{}}
         * @memberof TraceConfigDatapointsWidget
         */
        TraceConfigDatapointsWidget.prototype.getTreeGridToolbarSupport = function () {
            var _this = this;
            this._toolbar = new traceConfigDatapointsTreeGridToolbar_1.TraceConfigDatapointsTreeGridToolbar(this.cssParentContentId);
            return {
                toolbarSettings: {
                    showToolbar: true,
                    customToolbarItems: this._toolbar.getCustomToolbars(),
                },
                toolbarClick: function (args) { return _this._toolbar.toolbarClick(args, _this, $(_this.cssParentContentId).data("ejTreeGrid")); },
            };
        };
        /**
         * Returns the tree grid cell edit settings
         *
         * @private
         * @returns {{}}
         * @memberof TraceConfigDatapointsWidget
         */
        TraceConfigDatapointsWidget.prototype.getTreeGridCellEditSupport = function () {
            var _this = this;
            var cellEditEvents = new traceConfigDatapointsTreeGridCellEditEvents_1.TraceConfigDatapointsTreeGridCellEditEvents();
            return {
                beginEdit: function (args) { return cellEditEvents.beginEdit(args); },
                endEdit: function (args) { return cellEditEvents.endEdit(args, _this._dataModel, _this._availableTraceDataPoints); },
            };
        };
        TraceConfigDatapointsWidget.prototype.treeGridCreated = function () {
            // Sets the custom toolbar icons
            this._toolbar.setStyleForToolbarIcons();
            this._toolbar.initToolbarStates();
        };
        TraceConfigDatapointsWidget.prototype.treeGridActionBegin = function (args) {
            // Support "Entf/Del" key
            if (args.requestType == "delete") {
                args.cancel = true;
                this.deleteDataPoints(args);
            }
        };
        TraceConfigDatapointsWidget.prototype.treeGridRowSelected = function (args) {
            if (args.model.selectedItem != undefined) {
                this._toolbar.disableRemoveButton(false);
            }
            else {
                this._toolbar.disableRemoveButton(true);
            }
        };
        TraceConfigDatapointsWidget.prototype.deleteDataPoints = function (args) {
            var indexList = new Array();
            for (var i = args.deletedItems.length - 1; i >= 0; i--) {
                indexList.push(args.deletedItems[i].index);
            }
            if (indexList.length > 0) {
                this._dataModel.removeDatapoints(indexList);
                var treeGridObj = this.getTreeGridObject();
                var newSelectionIndex = indexList[indexList.length - 1];
                if (newSelectionIndex >= args.model.parentRecords.length) {
                    newSelectionIndex = args.model.parentRecords.length - 1;
                }
                treeGridObj.option("selectedRowIndex", newSelectionIndex, true);
            }
            this.updateToolbar();
        };
        /**
         * opens the datapoint selection dialog and attaches to the dialog events
         *
         * @memberof TraceConfigDatapointsWidget
         */
        TraceConfigDatapointsWidget.prototype.openDatapointDialog = function () {
            datapointDialog_1.DatapointDialog.eventAddDatapoint.attach(this._addDataPointHandler);
            datapointDialog_1.DatapointDialog.eventDialogClosed.attach(this._dialogClosedHandler);
            datapointDialog_1.DatapointDialog.open();
        };
        /**
         * updates the toolbar corresponding to the current data selection
         *
         * @private
         * @memberof TraceConfigDatapointsWidget
         */
        TraceConfigDatapointsWidget.prototype.updateToolbar = function () {
            // Update toolbar buttons => show/hide add datapoints toolbar button
            var dataPoints = this._dataModel.data;
            this.updateToolbarButtonStates(dataPoints);
        };
        /**
         * Initializes and updates the available trace data points
         *
         * @private
         * @param {TraceDataPointInfo[]} availableTraceDataPoints
         * @memberof TraceConfigDatapointsWidget
         */
        TraceConfigDatapointsWidget.prototype.initializeAvailableDataPoints = function (availableTraceDataPoints) {
            this._availableTraceDataPoints = availableTraceDataPoints;
            datapointDialog_1.DatapointDialog.setDatapoints(this._availableTraceDataPoints);
        };
        /**
         * refreshes the content of the datapoints parameters value fields
         *
         * @private
         * @param {Datapoint[]} datapoints
         * @memberof TraceConfigDatapointsWidget
         */
        TraceConfigDatapointsWidget.prototype.refreshDatapointsValues = function (datapoints) {
            try {
                this.setModel(datapoints);
            }
            catch (e) {
                console.log(e);
            }
        };
        TraceConfigDatapointsWidget.prototype.updateToolbarButtonStates = function (dataPoints) {
            var selectedItem = undefined;
            var treeObj = this.getTreeGridObject();
            if (treeObj != undefined) {
                selectedItem = treeObj.model.selectedItem;
            }
            if (dataPoints.length > 31) {
                this._toolbar.disableAddButton(true);
                this._toolbar.disableAddEmptyButton(true);
            }
            else {
                if (this._availableTraceDataPoints.length == 0) {
                    this._toolbar.disableAddButton(true);
                }
                else {
                    this._toolbar.disableAddButton(false);
                }
                this._toolbar.disableAddEmptyButton(false);
            }
            if (dataPoints.length == 0 || selectedItem == undefined) {
                this._toolbar.disableRemoveButton(true);
            }
            else {
                this._toolbar.disableRemoveButton(false);
            }
        };
        return TraceConfigDatapointsWidget;
    }(treeGridWidgetBase_1.TreeGridWidgetBase));
    exports.TraceConfigDatapointsWidget = TraceConfigDatapointsWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VDb25maWdEYXRhcG9pbnRzV2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldC90cmFjZUNvbmZpZ0RhdGFwb2ludHNXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBY0E7Ozs7O09BS0c7SUFDSDtRQUEwQywrQ0FBa0I7UUFBNUQ7WUFBQSxxRUFrVkM7WUFoVlcsMEJBQW9CLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFHLE9BQUEsS0FBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLEVBQWhDLENBQWdDLENBQUM7WUFDdkUsMEJBQW9CLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFHLE9BQUEsS0FBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLEVBQWhDLENBQWdDLENBQUM7WUFFdkUsK0JBQXlCLEdBQXlCLElBQUksS0FBSyxFQUFzQixDQUFDOztRQTZVOUYsQ0FBQztRQXpVRzs7OztXQUlHO1FBQ0gsZ0RBQVUsR0FBVixVQUFXLGlCQUF5QjtZQUNoQyxpQkFBTSxVQUFVLFlBQUMsaUJBQWlCLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDeEMsaUJBQU0sZ0JBQWdCLFlBQUMsYUFBYSxDQUFDLENBQUM7WUFFdEMsOEJBQThCO1lBQzlCLGlCQUFNLGdCQUFnQixZQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNuQyxDQUFDO1FBRUQseURBQW1CLEdBQW5CO1lBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsR0FBRyxtREFBd0IsQ0FBQyxrQkFBa0IsQ0FBQztZQUNuRixJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFFdkMsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gsaUVBQTJCLEdBQTNCO1lBQ0ksT0FBTyxtREFBd0IsQ0FBQyx5Q0FBeUMsRUFBRSxDQUFDO1FBQ2hGLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSywrREFBeUIsR0FBakMsVUFBa0MsZUFBZ0M7WUFDOUQsSUFBSSw4QkFBOEIsR0FBRyxJQUFJLCtEQUE4QixFQUFxQyxDQUFDO1lBQzdHLDhCQUE4QixDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQzVDLElBQUksQ0FBQyxTQUFTLEdBQUcsOEJBQThCLENBQUM7WUFDaEQsOEJBQThCLENBQUMsUUFBUSxHQUFHLGVBQWUsQ0FBQztZQUMxRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDekIsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSCx3REFBa0IsR0FBbEIsVUFBbUIsTUFBa0IsRUFBRSxTQUFnQztZQUNuRSxJQUFJLFVBQVUsR0FBRyxTQUFTLENBQUMsSUFBNkIsQ0FBQztZQUN6RCxJQUFJLENBQUMsdUJBQXVCLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9DLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSCw2REFBdUIsR0FBdkIsVUFBd0IsTUFBa0IsRUFBRSxTQUFnQztZQUN4RSxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQTZCLENBQUM7WUFDOUQsSUFBSSxDQUFDLHlCQUF5QixDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzNDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM3QyxDQUFDO1FBRUQ7OztXQUdHO1FBQ0ssNERBQXNCLEdBQTlCO1lBQ0ksSUFBSSxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQztZQUMxQyxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxpQkFBaUIsR0FBRyx5Q0FBeUMsQ0FBQyxDQUFDO1lBRS9HLGlDQUFlLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDbEQsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLG9EQUFjLEdBQXRCLFVBQXVCLE1BQU0sRUFBRSxJQUF3QjtZQUNuRCxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUMzQyxJQUFJLG9CQUFvQixHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7WUFDOUQsSUFBRyxvQkFBb0IsSUFBSSxTQUFTLEVBQUM7Z0JBQ2pDLG9CQUFvQixHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQzdCO1lBQ0QsSUFBSSxTQUFTLEdBQUcsK0JBQWMsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDM0UsSUFBRyxJQUFJLENBQUMsTUFBTSxJQUFJLG9DQUFlLENBQUMsR0FBRyxFQUFDO2dCQUNBLElBQUksQ0FBQyxVQUFXLENBQUMsWUFBWSxDQUFDLG9CQUFvQixFQUFFLFNBQVMsQ0FBQyxDQUFDO2FBQ3BHO2lCQUNJLElBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxvQ0FBZSxDQUFDLE9BQU8sRUFBQztnQkFDVCxJQUFJLENBQUMsVUFBVyxDQUFDLGdCQUFnQixDQUFDLG9CQUFvQixFQUFFLFNBQVMsQ0FBQyxDQUFDO2FBQ3hHO1lBQ0QsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3pCLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSyxvREFBYyxHQUF0QixVQUF1QixNQUFNLEVBQUUsSUFBSTtZQUMvQixpQ0FBZSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUNwRSxpQ0FBZSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUN4RSxDQUFDO1FBRUQ7OztXQUdHO1FBQ08sb0RBQWMsR0FBeEI7WUFBQSxpQkFpQkM7WUFoQkcsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7WUFFeEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBRSxDQUFDLFVBQVUsa0RBQ3JDLElBQUksQ0FBQywyQkFBMkIsRUFBRSxHQUNsQyxJQUFJLENBQUMsOEJBQThCLEVBQUUsR0FDckMsSUFBSSxDQUFDLHlCQUF5QixFQUFFLEdBQ2hDLElBQUksQ0FBQywwQkFBMEIsRUFBRSxLQUVwQyxhQUFhLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUNqRCxZQUFZLEVBQUUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLEVBRXBDLFdBQVcsRUFBRSxVQUFDLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsRUFBOUIsQ0FBOEIsRUFDckQsV0FBVyxFQUFFLFVBQUMsSUFBSSxJQUFNLE9BQUEsS0FBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxFQUE5QixDQUE4QixFQUN0RCxNQUFNLEVBQUUsVUFBQyxJQUFJLElBQUssT0FBQSxLQUFJLENBQUMsZUFBZSxFQUFFLEVBQXRCLENBQXNCLElBRTFDLENBQUM7UUFDUCxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ssaUVBQTJCLEdBQW5DO1lBQ0ksT0FBTztnQkFDSCxPQUFPLEVBQUU7b0JBQ0wsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBQztvQkFDakUsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUM7b0JBQ2xELEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFDO29CQUNwQyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDO2lCQUNuRTthQUNKLENBQUM7UUFDTixDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ssb0VBQThCLEdBQXRDO1lBQUEsaUJBTUM7WUFMRyxPQUFPO2dCQUNILGlCQUFpQixFQUFFLElBQUk7Z0JBQ3ZCLG9CQUFvQixFQUFFLEVBQUUsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUU7Z0JBQ3JGLGFBQWEsRUFBRSxVQUFDLElBQUksSUFBSyxPQUFBLGlCQUFNLG1CQUFtQixhQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUF2RCxDQUF1RDthQUNuRixDQUFDO1FBQ04sQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLCtEQUF5QixHQUFqQztZQUFBLGlCQVNDO1lBUkcsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLDJFQUFvQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQ2xGLE9BQU87Z0JBQ0gsZUFBZSxFQUFFO29CQUNiLFdBQVcsRUFBRSxJQUFJO29CQUNqQixrQkFBa0IsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixFQUFFO2lCQUN4RDtnQkFDRCxZQUFZLEVBQUUsVUFBQyxJQUFJLElBQUssT0FBQSxLQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsS0FBSSxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBckYsQ0FBcUY7YUFDaEgsQ0FBQztRQUNOLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSyxnRUFBMEIsR0FBbEM7WUFBQSxpQkFNRjtZQUxBLElBQUksY0FBYyxHQUFHLElBQUkseUZBQTJDLEVBQUUsQ0FBQztZQUN2RSxPQUFPO2dCQUNOLFNBQVMsRUFBRSxVQUFDLElBQUksSUFBSyxPQUFBLGNBQWMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQTlCLENBQThCO2dCQUMxQyxPQUFPLEVBQUUsVUFBQyxJQUFJLElBQUssT0FBQSxjQUFjLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxLQUFJLENBQUMsVUFBVSxFQUFFLEtBQUksQ0FBQyx5QkFBeUIsQ0FBQyxFQUE3RSxDQUE2RTthQUN6RyxDQUFDO1FBQ0gsQ0FBQztRQUVVLHFEQUFlLEdBQXZCO1lBQ0ksZ0NBQWdDO1lBQ2hDLElBQUksQ0FBQyxRQUFRLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztZQUV4QyxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDdEMsQ0FBQztRQUVPLHlEQUFtQixHQUEzQixVQUE0QixJQUFJO1lBQzVCLHlCQUF5QjtZQUN6QixJQUFHLElBQUksQ0FBQyxXQUFXLElBQUksUUFBUSxFQUFDO2dCQUM1QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDbkIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO2FBQy9CO1FBQ0wsQ0FBQztRQUVPLHlEQUFtQixHQUEzQixVQUE0QixJQUFJO1lBQzVCLElBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLElBQUksU0FBUyxFQUFDO2dCQUNwQyxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzVDO2lCQUNHO2dCQUNBLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDM0M7UUFDTCxDQUFDO1FBRU0sc0RBQWdCLEdBQXZCLFVBQXdCLElBQUk7WUFDeEIsSUFBSSxTQUFTLEdBQUcsSUFBSSxLQUFLLEVBQVUsQ0FBQztZQUNwQyxLQUFJLElBQUksQ0FBQyxHQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUM5QyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDOUM7WUFDRCxJQUFHLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDO2dCQUNjLElBQUksQ0FBQyxVQUFXLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQy9FLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2dCQUMzQyxJQUFJLGlCQUFpQixHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0RCxJQUFHLGlCQUFpQixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBQztvQkFDcEQsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQztpQkFDekQ7Z0JBQ0QsV0FBVyxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsRUFBRSxpQkFBaUIsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUNuRTtZQUNELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN6QixDQUFDO1FBRUQ7Ozs7V0FJRztRQUNJLHlEQUFtQixHQUExQjtZQUVJLGlDQUFlLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQ3BFLGlDQUFlLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQ3BFLGlDQUFlLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDM0IsQ0FBQztRQUVEOzs7OztXQUtHO1FBRUssbURBQWEsR0FBckI7WUFDUSxvRUFBb0U7WUFDcEUsSUFBSSxVQUFVLEdBQXFDLElBQUksQ0FBQyxVQUFXLENBQUMsSUFBa0IsQ0FBQztZQUN2RixJQUFJLENBQUMseUJBQXlCLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbkQsQ0FBQztRQUdEOzs7Ozs7V0FNRztRQUNLLG1FQUE2QixHQUFyQyxVQUFzQyx3QkFBNkM7WUFDL0UsSUFBSSxDQUFDLHlCQUF5QixHQUFHLHdCQUF3QixDQUFDO1lBQzFELGlDQUFlLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBQ2pFLENBQUM7UUFFRjs7Ozs7O1dBTUc7UUFDSyw2REFBdUIsR0FBL0IsVUFBZ0MsVUFBNEI7WUFFeEQsSUFBRztnQkFDQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQzdCO1lBQ0QsT0FBTSxDQUFDLEVBQUM7Z0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNsQjtRQUNMLENBQUM7UUFFTywrREFBeUIsR0FBakMsVUFBa0MsVUFBZ0M7WUFFOUQsSUFBSSxZQUFZLEdBQUcsU0FBUyxDQUFDO1lBQzdCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ3ZDLElBQUcsT0FBTyxJQUFJLFNBQVMsRUFBQztnQkFDcEIsWUFBWSxHQUFTLE9BQU8sQ0FBQyxLQUFNLENBQUMsWUFBWSxDQUFDO2FBQ3BEO1lBQ0QsSUFBRyxVQUFVLENBQUMsTUFBTSxHQUFHLEVBQUUsRUFBQztnQkFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDckMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUM3QztpQkFDRztnQkFDQSxJQUFHLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFDO29CQUMxQyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUN4QztxQkFDRztvQkFDQSxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUN6QztnQkFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzlDO1lBQ0QsSUFBRyxVQUFVLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxZQUFZLElBQUksU0FBUyxFQUFFO2dCQUNwRCxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzNDO2lCQUNHO2dCQUNBLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDNUM7UUFDTCxDQUFDO1FBQ0wsa0NBQUM7SUFBRCxDQUFDLEFBbFZELENBQTBDLHVDQUFrQixHQWtWM0Q7SUFFUSxrRUFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJVHJhY2VDb25maWdEYXRhcG9pbnRzV2lkZ2V0IH0gZnJvbSBcIi4vaW50ZXJmYWNlcy90cmFjZUNvbmZpZ0RhdGFwb2ludHNXaWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVHJlZUdyaWRXaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi90cmVlR3JpZFdpZGdldEJhc2VcIjtcclxuaW1wb3J0IHsgSURhdGFNb2RlbCwgRXZlbnRNb2RlbENoYW5nZWRBcmdzIH0gZnJvbSBcIi4uLy4uL21vZGVscy9kYXRhTW9kZWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVHJhY2VDb25maWdEYXRhcG9pbnRzVHJlZUdyaWRUb29sYmFyIH0gZnJvbSBcIi4vdmlldy90cmFjZUNvbmZpZ0RhdGFwb2ludHNUcmVlR3JpZFRvb2xiYXJcIjtcclxuaW1wb3J0IHsgRGF0YXBvaW50RGlhbG9nIH0gZnJvbSBcIi4uLy4uL3ZpZXcvZGF0YXBvaW50RGlhbG9nL2RhdGFwb2ludERpYWxvZ1wiO1xyXG5pbXBvcnQgeyBFdmVudERhdGFwb2ludEFyZ3MsIERhdGFwb2ludEFjdGlvbiB9IGZyb20gXCIuLi8uLi92aWV3L2RhdGFwb2ludERpYWxvZy9ldmVudERhdGFwb2ludEFyZ3NcIjtcclxuaW1wb3J0IHsgVHJhY2VEYXRhUG9pbnR9IGZyb20gXCIuLi8uLi9tb2RlbHMvZGlhZ25vc3RpY3MvdHJhY2UvdHJhY2VEYXRhUG9pbnRcIjtcclxuaW1wb3J0IHsgVHJhY2VEYXRhUG9pbnRJbmZvIH0gZnJvbSBcIi4uLy4uL21vZGVscy9kaWFnbm9zdGljcy90cmFjZS90cmFjZURhdGFQb2ludEluZm9cIjtcclxuaW1wb3J0IHsgVHJhY2VDb25maWdEYXRhcG9pbnRzVHJlZUdyaWRDZWxsRWRpdEV2ZW50cyB9IGZyb20gXCIuL3ZpZXcvdHJhY2VDb25maWdEYXRhcG9pbnRzVHJlZUdyaWRDZWxsRWRpdEV2ZW50c1wiO1xyXG5pbXBvcnQgeyBUcmFjZUNvbmZpZ0RhdGFwb2ludHNEYXRhTW9kZWwgfSBmcm9tIFwiLi9tb2RlbC90cmFjZUNvbmZpZ0RhdGFwb2ludHNEYXRhTW9kZWxcIjtcclxuaW1wb3J0IHsgSVRyYWNlQ29uZmlnRGF0YXBvaW50c0RhdGFNb2RlbCB9IGZyb20gXCIuL21vZGVsL3RyYWNlQ29uZmlnRGF0YXBvaW50c0RhdGFNb2RlbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi9kZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50U2V0dGluZ3NcIjtcclxuXHJcbi8qKlxyXG4gKiBpbXBsZW1lbnRzIHRoZSBUcmFjZUNvbmZpZ0RhdGFwb2ludHNXaWRnZXRcclxuICpcclxuICogQGNsYXNzIFRyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldFxyXG4gKiBAZXh0ZW5kcyB7VHJlZUdyaWRXaWRnZXRCYXNlfVxyXG4gKi9cclxuY2xhc3MgVHJhY2VDb25maWdEYXRhcG9pbnRzV2lkZ2V0IGV4dGVuZHMgVHJlZUdyaWRXaWRnZXRCYXNlIGltcGxlbWVudHMgSVRyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldCB7XHJcblxyXG4gICAgcHJpdmF0ZSBfYWRkRGF0YVBvaW50SGFuZGxlciA9IChzZW5kZXIsYXJncyk9PnRoaXMub25BZGREYXRhcG9pbnQoc2VuZGVyLGFyZ3MpO1xyXG4gICAgcHJpdmF0ZSBfZGlhbG9nQ2xvc2VkSGFuZGxlciA9IChzZW5kZXIsYXJncyk9PnRoaXMub25EaWFsb2dDbG9zZWQoc2VuZGVyLGFyZ3MpO1xyXG5cclxuICAgIHByaXZhdGUgX2F2YWlsYWJsZVRyYWNlRGF0YVBvaW50czogVHJhY2VEYXRhUG9pbnRJbmZvW10gPSBuZXcgQXJyYXk8VHJhY2VEYXRhUG9pbnRJbmZvPigpO1xyXG5cclxuICAgIHByaXZhdGUgX3Rvb2xiYXIhOiBUcmFjZUNvbmZpZ0RhdGFwb2ludHNUcmVlR3JpZFRvb2xiYXI7XHJcblxyXG4gICAgLyogaW5pdGlhbGl6ZSB0aGUgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxheW91dENvbnRhaW5lcklkXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdEYXRhcG9pbnRzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQ6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQsIDMwKTtcclxuICAgICAgICBzdXBlci5zZXRIZWFkZXJDb250ZW50KFwiRGF0YSBwb2ludHNcIik7XHJcblxyXG4gICAgICAgIC8vIFNldCBkeW5hbWljIGNvbHVtbiBzZXR0aW5nc1xyXG4gICAgICAgIHN1cGVyLnNldER5bmFtaWNDb2x1bW4oMywgMjUwKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0aWFsaXplQ29tcG9uZW50KCl7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZGVmYXVsdFNldHRpbmdzRGF0YUlkID0gRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLldpZGdldERlZmluaXRpb25JZDtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5kaXNhYmxlUGVyc2lzdGluZygpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgY29tcG9uZW50IHNldHRpbmdzIGZvciB0aGlzIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldFxyXG4gICAgICovXHJcbiAgICBnZXREZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MoKTogQ29tcG9uZW50U2V0dGluZ3N7XHJcbiAgICAgICAgcmV0dXJuIERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5nZXRUcmFjZUNvbmZpZ3VyYXRpb25EYXRhUG9pbnRzRGVmaW5pdGlvbigpO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIGFuZCBpbml0aWFsaXplcyB0aGUgdHJhY2UgZGF0YSBwb2ludHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtUcmFjZURhdGFQb2ludFtdfSB0cmFjZURhdGFQb2ludHNcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ0RhdGFwb2ludHNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbml0aWFsaXplVHJhY2VEYXRhUG9pbnRzKHRyYWNlRGF0YVBvaW50czpUcmFjZURhdGFQb2ludFtdKXtcclxuICAgICAgICBsZXQgdHJhY2VDb25maWdEYXRhcG9pbnRzRGF0YU1vZGVsID0gbmV3IFRyYWNlQ29uZmlnRGF0YXBvaW50c0RhdGFNb2RlbCgpIGFzIElUcmFjZUNvbmZpZ0RhdGFwb2ludHNEYXRhTW9kZWw7XHJcbiAgICAgICAgdHJhY2VDb25maWdEYXRhcG9pbnRzRGF0YU1vZGVsLmluaXRpYWxpemUoKTtcclxuICAgICAgICB0aGlzLmRhdGFNb2RlbCA9IHRyYWNlQ29uZmlnRGF0YXBvaW50c0RhdGFNb2RlbDtcclxuICAgICAgICB0cmFjZUNvbmZpZ0RhdGFwb2ludHNEYXRhTW9kZWwuaW5pdERhdGEgPSB0cmFjZURhdGFQb2ludHM7XHJcbiAgICAgICAgdGhpcy51cGRhdGVUb29sYmFyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBpbXBsZW1lbnRzIHRoZSBtb2RlbCBjaGFuZ2UgaGFuZGxpbmdcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lEYXRhTW9kZWx9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHtFdmVudE1vZGVsQ2hhbmdlZEFyZ3N9IGRhdGFcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldFxyXG4gICAgICovXHJcbiAgICBoYW5kbGVNb2RlbENoYW5nZWQoc2VuZGVyOiBJRGF0YU1vZGVsLCBldmVudEFyZ3M6IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyk6IGFueSB7XHJcbiAgICAgICAgbGV0IGRhdGFQb2ludHMgPSBldmVudEFyZ3MuZGF0YSBhcyBBcnJheTxUcmFjZURhdGFQb2ludD47XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoRGF0YXBvaW50c1ZhbHVlcyhkYXRhUG9pbnRzKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVRvb2xiYXJCdXR0b25TdGF0ZXMoZGF0YVBvaW50cyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBoYW5kbGVzIHRoZSBjaGFuZ2VzIG9mIG9ic2VydmVkIGl0ZW1zIHJlcXVlc3RlZCBieSAnb2JzZXJ2ZURhdGFNb2RlbEl0ZW1zJ1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SURhdGFNb2RlbH0gc2VuZGVyXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50TW9kZWxDaGFuZ2VkQXJnc30gZGF0YVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldFxyXG4gICAgICovXHJcbiAgICBoYW5kbGVNb2RlbEl0ZW1zQ2hhbmdlZChzZW5kZXI6IElEYXRhTW9kZWwsIGV2ZW50QXJnczogRXZlbnRNb2RlbENoYW5nZWRBcmdzKSB7XHJcbiAgICAgICAgbGV0IGRhdGFQb2ludHMgPSB0aGlzLmRhdGFNb2RlbC5kYXRhIGFzIEFycmF5PFRyYWNlRGF0YVBvaW50PjtcclxuICAgICAgICB0aGlzLnVwZGF0ZVRvb2xiYXJCdXR0b25TdGF0ZXMoZGF0YVBvaW50cyk7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoRGF0YXBvaW50c1ZhbHVlcyhkYXRhUG9pbnRzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogY3JlYXRlcyB0aGUgZGF0YXBvaW50IHNlbGVjdGlvbiBkaWFsb2dcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdEYXRhcG9pbnRzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlRGF0YXBvaW50c0RpYWxvZygpe1xyXG4gICAgICAgIGxldCBkYXRhcG9pbnREaWFsb2dJZCA9IFwiZGF0YXBvaW50RGlhbG9nXCI7XHJcbiAgICAgICAgJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCkuYXBwZW5kKFwiPGRpdiBpZD0nXCIgKyBkYXRhcG9pbnREaWFsb2dJZCArIFwiJz48ZGl2IGlkPSdkYXRhcG9pbnRDb250ZW50Um9vdCc+PC8+PC8+XCIpOyAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIERhdGFwb2ludERpYWxvZy5pbml0aWFsaXplKGRhdGFwb2ludERpYWxvZ0lkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogY2F0Y2hlcyB0aGUgYWRkIGRhdGFwb2ludCBldmVudCBmcm9tIHRoZSBkYXRhcG9pbnQgZGlhbG9nXHJcbiAgICAgKiA9PiBhZGRzIG9yIHJlcGxhY2VzIHRoZSBzZWxlY3RlZCBkYXRhcG9pbnQgd2l0aCB0aGUgZGF0YXBvaW50IGZyb20gdGhlIGRhdGFwb2ludCBkaWFsb2dcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge30gc2VuZGVyXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50RGF0YXBvaW50QXJnc30gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uQWRkRGF0YXBvaW50KHNlbmRlciwgYXJnczogRXZlbnREYXRhcG9pbnRBcmdzKXtcclxuICAgICAgICB2YXIgdHJlZUdyaWRPYmogPSB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCk7XHJcbiAgICAgICAgbGV0IGFjdHVhbFNlbGVjdGlvbkluZGV4ID0gdHJlZUdyaWRPYmoubW9kZWwuc2VsZWN0ZWRSb3dJbmRleDtcclxuICAgICAgICBpZihhY3R1YWxTZWxlY3Rpb25JbmRleCA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBhY3R1YWxTZWxlY3Rpb25JbmRleCA9IC0xO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZGF0YVBvaW50ID0gVHJhY2VEYXRhUG9pbnQuY3JlYXRlV2l0aERhdGFQb2ludEluZm8oYXJncy5kYXRhUG9pbnRJbmZvKTtcclxuICAgICAgICBpZihhcmdzLmFjdGlvbiA9PSBEYXRhcG9pbnRBY3Rpb24uYWRkKXtcclxuICAgICAgICAgICAgKDxJVHJhY2VDb25maWdEYXRhcG9pbnRzRGF0YU1vZGVsPnRoaXMuX2RhdGFNb2RlbCkuYWRkRGF0YXBvaW50KGFjdHVhbFNlbGVjdGlvbkluZGV4LCBkYXRhUG9pbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGFyZ3MuYWN0aW9uID09IERhdGFwb2ludEFjdGlvbi5yZXBsYWNlKXtcclxuICAgICAgICAgICAgKDxJVHJhY2VDb25maWdEYXRhcG9pbnRzRGF0YU1vZGVsPnRoaXMuX2RhdGFNb2RlbCkucmVwbGFjZURhdGFwb2ludChhY3R1YWxTZWxlY3Rpb25JbmRleCwgZGF0YVBvaW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGVUb29sYmFyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGNhdGNoZXMgdGhlIGRpYWxvZyBjbG9zZSBldmVudCBmcm9tIHRoZSBkYXRhcG9pbnQgZGlhbG9nXHJcbiAgICAgKiA9PiBkZXRhY2hlcyB0aGUgZGlhbG9nIGV2ZW50c1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7fSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7fSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdEYXRhcG9pbnRzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25EaWFsb2dDbG9zZWQoc2VuZGVyLCBhcmdzKXtcclxuICAgICAgICBEYXRhcG9pbnREaWFsb2cuZXZlbnRBZGREYXRhcG9pbnQuZGV0YWNoKHRoaXMuX2FkZERhdGFQb2ludEhhbmRsZXIpO1xyXG4gICAgICAgIERhdGFwb2ludERpYWxvZy5ldmVudERpYWxvZ0Nsb3NlZC5kZXRhY2godGhpcy5fZGlhbG9nQ2xvc2VkSGFuZGxlcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGNyZWF0ZXMgdGhlIHRyZWUgZ3JpZCBmb3IgdGhlIGRhdGFwb2ludCBpbmZvcm1hdGlvbnNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdEYXRhcG9pbnRzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBjcmVhdGVUcmVlR3JpZCgpIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZURhdGFwb2ludHNEaWFsb2coKTtcclxuICAgICBcclxuICAgICAgICAoPGFueT4kKHRoaXMuY3NzUGFyZW50Q29udGVudElkKSkuZWpUcmVlR3JpZCh7XHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCksXHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRDb2x1bW5SZXNpemVTdXBwb3J0KCksXHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRUb29sYmFyU3VwcG9ydCgpLFxyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkQ2VsbEVkaXRTdXBwb3J0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHNlbGVjdGlvblR5cGU6IGVqLlRyZWVHcmlkLlNlbGVjdGlvblR5cGUuTXVsdGlwbGUsXHJcbiAgICAgICAgICAgIGVkaXRTZXR0aW5nczogeyBhbGxvd0VkaXRpbmc6IHRydWUgfSxcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJvd1NlbGVjdGVkOiAoYXJncykgPT4gdGhpcy50cmVlR3JpZFJvd1NlbGVjdGVkKGFyZ3MpLFxyXG4gICAgICAgICAgICBhY3Rpb25CZWdpbjogKGFyZ3MpID0+ICB0aGlzLnRyZWVHcmlkQWN0aW9uQmVnaW4oYXJncyksXHJcbiAgICAgICAgICAgIGNyZWF0ZTogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWRDcmVhdGVkKCksXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJlZSBncmlkIGNvbHVtbiBkZWZpbml0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ0RhdGFwb2ludHNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmVlR3JpZENvbHVtbkRlZmluaXRpb24oKToge317XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY29sdW1uczogW1xyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJkYXRhUG9pbnROYW1lXCIsIGhlYWRlclRleHQ6IFwiRGF0YSBwb2ludFwiLCB3aWR0aDogXCIzNTBcIn0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcImNvbXBvbmVudE5hbWVcIiwgaGVhZGVyVGV4dDogXCJDb21wb25lbnRcIn0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcIm5hbWVcIiwgaGVhZGVyVGV4dDogXCJOYW1lXCJ9LFxyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJkZXNjcmlwdGlvblwiLCBoZWFkZXJUZXh0OiBcIkRlc2NyaXB0aW9uXCIsIHdpZHRoOiBcIjI1MFwifSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJlZSBncmlkIGNvbHVtbiByZXNpemUgc2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFRyZWVHcmlkQ29sdW1uUmVzaXplU3VwcG9ydCgpOiB7fXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBhbGxvd0NvbHVtblJlc2l6ZTogdHJ1ZSxcclxuICAgICAgICAgICAgY29sdW1uUmVzaXplU2V0dGluZ3M6IHsgY29sdW1uUmVzaXplTW9kZTogZWouVHJlZUdyaWQuQ29sdW1uUmVzaXplTW9kZS5GaXhlZENvbHVtbnMgfSxcclxuICAgICAgICAgICAgY29sdW1uUmVzaXplZDogKGFyZ3MpID0+IHN1cGVyLnJlc2l6ZUR5bmFtaWNDb2x1bW4oYXJncy5jb2x1bW5JbmRleCwgYXJncy5tb2RlbCksXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCB0b29sYmFyIHNldHRpbmdzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ0RhdGFwb2ludHNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmVlR3JpZFRvb2xiYXJTdXBwb3J0KCk6IHt9e1xyXG4gICAgICAgIHRoaXMuX3Rvb2xiYXIgPSBuZXcgVHJhY2VDb25maWdEYXRhcG9pbnRzVHJlZUdyaWRUb29sYmFyKHRoaXMuY3NzUGFyZW50Q29udGVudElkKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0b29sYmFyU2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgIHNob3dUb29sYmFyOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tVG9vbGJhckl0ZW1zOiB0aGlzLl90b29sYmFyLmdldEN1c3RvbVRvb2xiYXJzKCksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRvb2xiYXJDbGljazogKGFyZ3MpID0+IHRoaXMuX3Rvb2xiYXIudG9vbGJhckNsaWNrKGFyZ3MsIHRoaXMsICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpLmRhdGEoXCJlalRyZWVHcmlkXCIpKSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJlZSBncmlkIGNlbGwgZWRpdCBzZXR0aW5nc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdEYXRhcG9pbnRzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VHJlZUdyaWRDZWxsRWRpdFN1cHBvcnQoKToge317XHJcblx0XHR2YXIgY2VsbEVkaXRFdmVudHMgPSBuZXcgVHJhY2VDb25maWdEYXRhcG9pbnRzVHJlZUdyaWRDZWxsRWRpdEV2ZW50cygpO1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0YmVnaW5FZGl0OiAoYXJncykgPT4gY2VsbEVkaXRFdmVudHMuYmVnaW5FZGl0KGFyZ3MpLFxyXG4gICAgICAgICAgICBlbmRFZGl0OiAoYXJncykgPT4gY2VsbEVkaXRFdmVudHMuZW5kRWRpdChhcmdzLCB0aGlzLl9kYXRhTW9kZWwsIHRoaXMuX2F2YWlsYWJsZVRyYWNlRGF0YVBvaW50cyksXHJcblx0XHR9O1xyXG5cdH1cclxuXHJcbiAgICBwcml2YXRlIHRyZWVHcmlkQ3JlYXRlZCgpe1xyXG4gICAgICAgIC8vIFNldHMgdGhlIGN1c3RvbSB0b29sYmFyIGljb25zXHJcbiAgICAgICAgdGhpcy5fdG9vbGJhci5zZXRTdHlsZUZvclRvb2xiYXJJY29ucygpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX3Rvb2xiYXIuaW5pdFRvb2xiYXJTdGF0ZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRyZWVHcmlkQWN0aW9uQmVnaW4oYXJncyl7XHJcbiAgICAgICAgLy8gU3VwcG9ydCBcIkVudGYvRGVsXCIga2V5XHJcbiAgICAgICAgaWYoYXJncy5yZXF1ZXN0VHlwZSA9PSBcImRlbGV0ZVwiKXtcclxuICAgICAgICAgICAgYXJncy5jYW5jZWwgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmRlbGV0ZURhdGFQb2ludHMoYXJncyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdHJlZUdyaWRSb3dTZWxlY3RlZChhcmdzKXtcclxuICAgICAgICBpZihhcmdzLm1vZGVsLnNlbGVjdGVkSXRlbSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl90b29sYmFyLmRpc2FibGVSZW1vdmVCdXR0b24oZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLl90b29sYmFyLmRpc2FibGVSZW1vdmVCdXR0b24odHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZWxldGVEYXRhUG9pbnRzKGFyZ3Mpe1xyXG4gICAgICAgIGxldCBpbmRleExpc3QgPSBuZXcgQXJyYXk8bnVtYmVyPigpO1xyXG4gICAgICAgIGZvcihsZXQgaT1hcmdzLmRlbGV0ZWRJdGVtcy5sZW5ndGgtMTsgaSA+PSAwOyBpLS0pe1xyXG4gICAgICAgICAgICBpbmRleExpc3QucHVzaChhcmdzLmRlbGV0ZWRJdGVtc1tpXS5pbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGluZGV4TGlzdC5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgKDxJVHJhY2VDb25maWdEYXRhcG9pbnRzRGF0YU1vZGVsPnRoaXMuX2RhdGFNb2RlbCkucmVtb3ZlRGF0YXBvaW50cyhpbmRleExpc3QpO1xyXG4gICAgICAgICAgICB2YXIgdHJlZUdyaWRPYmogPSB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCk7XHJcbiAgICAgICAgICAgIGxldCBuZXdTZWxlY3Rpb25JbmRleCA9IGluZGV4TGlzdFtpbmRleExpc3QubGVuZ3RoLTFdO1xyXG4gICAgICAgICAgICBpZihuZXdTZWxlY3Rpb25JbmRleCA+PSBhcmdzLm1vZGVsLnBhcmVudFJlY29yZHMubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgIG5ld1NlbGVjdGlvbkluZGV4ID0gYXJncy5tb2RlbC5wYXJlbnRSZWNvcmRzLmxlbmd0aC0xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRyZWVHcmlkT2JqLm9wdGlvbihcInNlbGVjdGVkUm93SW5kZXhcIiwgbmV3U2VsZWN0aW9uSW5kZXgsIHRydWUpOyBcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGVUb29sYmFyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBvcGVucyB0aGUgZGF0YXBvaW50IHNlbGVjdGlvbiBkaWFsb2cgYW5kIGF0dGFjaGVzIHRvIHRoZSBkaWFsb2cgZXZlbnRzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb3BlbkRhdGFwb2ludERpYWxvZygpe1xyXG4gICAgICAgIFxyXG4gICAgICAgIERhdGFwb2ludERpYWxvZy5ldmVudEFkZERhdGFwb2ludC5hdHRhY2godGhpcy5fYWRkRGF0YVBvaW50SGFuZGxlcik7XHJcbiAgICAgICAgRGF0YXBvaW50RGlhbG9nLmV2ZW50RGlhbG9nQ2xvc2VkLmF0dGFjaCh0aGlzLl9kaWFsb2dDbG9zZWRIYW5kbGVyKTtcclxuICAgICAgICBEYXRhcG9pbnREaWFsb2cub3BlbigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdXBkYXRlcyB0aGUgdG9vbGJhciBjb3JyZXNwb25kaW5nIHRvIHRoZSBjdXJyZW50IGRhdGEgc2VsZWN0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ0RhdGFwb2ludHNXaWRnZXRcclxuICAgICAqL1xyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlVG9vbGJhcigpIHtcclxuICAgICAgICAgICAgLy8gVXBkYXRlIHRvb2xiYXIgYnV0dG9ucyA9PiBzaG93L2hpZGUgYWRkIGRhdGFwb2ludHMgdG9vbGJhciBidXR0b25cclxuICAgICAgICAgICAgbGV0IGRhdGFQb2ludHMgPSAoPElUcmFjZUNvbmZpZ0RhdGFwb2ludHNEYXRhTW9kZWw+dGhpcy5fZGF0YU1vZGVsKS5kYXRhIGFzIEFycmF5PGFueT47XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVG9vbGJhckJ1dHRvblN0YXRlcyhkYXRhUG9pbnRzKTtcclxuICAgIH0gICBcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXplcyBhbmQgdXBkYXRlcyB0aGUgYXZhaWxhYmxlIHRyYWNlIGRhdGEgcG9pbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7VHJhY2VEYXRhUG9pbnRJbmZvW119IGF2YWlsYWJsZVRyYWNlRGF0YVBvaW50c1xyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGluaXRpYWxpemVBdmFpbGFibGVEYXRhUG9pbnRzKGF2YWlsYWJsZVRyYWNlRGF0YVBvaW50czpUcmFjZURhdGFQb2ludEluZm9bXSl7XHJcbiAgICAgICAgdGhpcy5fYXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzID0gYXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzO1xyXG4gICAgICAgIERhdGFwb2ludERpYWxvZy5zZXREYXRhcG9pbnRzKHRoaXMuX2F2YWlsYWJsZVRyYWNlRGF0YVBvaW50cyk7XHJcbiAgICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmVmcmVzaGVzIHRoZSBjb250ZW50IG9mIHRoZSBkYXRhcG9pbnRzIHBhcmFtZXRlcnMgdmFsdWUgZmllbGRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7RGF0YXBvaW50W119IGRhdGFwb2ludHNcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ0RhdGFwb2ludHNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWZyZXNoRGF0YXBvaW50c1ZhbHVlcyhkYXRhcG9pbnRzOiBUcmFjZURhdGFQb2ludFtdKSB7XHJcblxyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgICAgdGhpcy5zZXRNb2RlbChkYXRhcG9pbnRzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2goZSl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZVRvb2xiYXJCdXR0b25TdGF0ZXMoZGF0YVBvaW50czpBcnJheTxUcmFjZURhdGFQb2ludD4pe1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBzZWxlY3RlZEl0ZW0gPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdmFyIHRyZWVPYmogPSB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCk7XHJcbiAgICAgICAgaWYodHJlZU9iaiAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBzZWxlY3RlZEl0ZW0gPSAoPGFueT50cmVlT2JqLm1vZGVsKS5zZWxlY3RlZEl0ZW07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGRhdGFQb2ludHMubGVuZ3RoID4gMzEpe1xyXG4gICAgICAgICAgICB0aGlzLl90b29sYmFyLmRpc2FibGVBZGRCdXR0b24odHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2xiYXIuZGlzYWJsZUFkZEVtcHR5QnV0dG9uKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBpZih0aGlzLl9hdmFpbGFibGVUcmFjZURhdGFQb2ludHMubGVuZ3RoID09IDApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdG9vbGJhci5kaXNhYmxlQWRkQnV0dG9uKHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90b29sYmFyLmRpc2FibGVBZGRCdXR0b24oZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2xiYXIuZGlzYWJsZUFkZEVtcHR5QnV0dG9uKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZGF0YVBvaW50cy5sZW5ndGggPT0gMCB8fCBzZWxlY3RlZEl0ZW0gPT0gdW5kZWZpbmVkICl7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2xiYXIuZGlzYWJsZVJlbW92ZUJ1dHRvbih0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbGJhci5kaXNhYmxlUmVtb3ZlQnV0dG9uKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IFRyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldCB9OyJdfQ==