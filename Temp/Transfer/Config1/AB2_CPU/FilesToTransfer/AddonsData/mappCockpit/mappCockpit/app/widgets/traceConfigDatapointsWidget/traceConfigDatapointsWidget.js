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
        };
        TraceConfigDatapointsWidget.prototype.initializeComponent = function () {
            this.component.defaultSettingsDataId = defaultComponentSettings_1.DefaultComponentSettings.WidgetDefinitionId;
            this.component.disablePersisting();
        };
        TraceConfigDatapointsWidget.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            _super.prototype.setHeaderContent.call(this, "Data points");
            // Set dynamic column settings
            _super.prototype.setDynamicColumn.call(this, 3, 250);
        };
        /**
         * Returns the default component settings for this widget
         *
         * @returns {(ComponentSettings|undefined)}
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
            //Cancel edit cell when opening dialog
            var treeGridObj = this.getTreeGridObject();
            if (treeGridObj.model.isEdit == true) {
                treeGridObj.cancelEditCell();
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VDb25maWdEYXRhcG9pbnRzV2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldC90cmFjZUNvbmZpZ0RhdGFwb2ludHNXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBY0E7Ozs7O09BS0c7SUFDSDtRQUEwQywrQ0FBa0I7UUFBNUQ7WUFBQSxxRUEyVkM7WUF6VlcsMEJBQW9CLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFHLE9BQUEsS0FBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLEVBQWhDLENBQWdDLENBQUM7WUFDdkUsMEJBQW9CLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFHLE9BQUEsS0FBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLEVBQWhDLENBQWdDLENBQUM7WUFFdkUsK0JBQXlCLEdBQXlCLElBQUksS0FBSyxFQUFzQixDQUFDOztRQXNWOUYsQ0FBQztRQWxWRzs7OztXQUlHO1FBQ0gsZ0RBQVUsR0FBVixVQUFXLGlCQUF5QjtZQUNoQyxpQkFBTSxVQUFVLFlBQUMsaUJBQWlCLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDNUMsQ0FBQztRQUVELHlEQUFtQixHQUFuQjtZQUNJLElBQUksQ0FBQyxTQUFTLENBQUMscUJBQXFCLEdBQUcsbURBQXdCLENBQUMsa0JBQWtCLENBQUM7WUFDbkYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3ZDLENBQUM7UUFFRCxpREFBVyxHQUFYO1lBQ0ksaUJBQU0sV0FBVyxXQUFFLENBQUM7WUFFcEIsaUJBQU0sZ0JBQWdCLFlBQUMsYUFBYSxDQUFDLENBQUM7WUFFdEMsOEJBQThCO1lBQzlCLGlCQUFNLGdCQUFnQixZQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNuQyxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSCxpRUFBMkIsR0FBM0I7WUFDSSxPQUFPLG1EQUF3QixDQUFDLHlDQUF5QyxFQUFFLENBQUM7UUFDaEYsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLCtEQUF5QixHQUFqQyxVQUFrQyxlQUFnQztZQUM5RCxJQUFJLDhCQUE4QixHQUFHLElBQUksK0RBQThCLEVBQXFDLENBQUM7WUFDN0csOEJBQThCLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDNUMsSUFBSSxDQUFDLFNBQVMsR0FBRyw4QkFBOEIsQ0FBQztZQUNoRCw4QkFBOEIsQ0FBQyxRQUFRLEdBQUcsZUFBZSxDQUFDO1lBQzFELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN6QixDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNILHdEQUFrQixHQUFsQixVQUFtQixNQUFrQixFQUFFLFNBQWdDO1lBQ25FLElBQUksVUFBVSxHQUFHLFNBQVMsQ0FBQyxJQUE2QixDQUFDO1lBQ3pELElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMseUJBQXlCLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0MsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNILDZEQUF1QixHQUF2QixVQUF3QixNQUFrQixFQUFFLFNBQWdDO1lBQ3hFLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBNkIsQ0FBQztZQUM5RCxJQUFJLENBQUMseUJBQXlCLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzdDLENBQUM7UUFFRDs7O1dBR0c7UUFDSyw0REFBc0IsR0FBOUI7WUFDSSxJQUFJLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDO1lBQzFDLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLGlCQUFpQixHQUFHLHlDQUF5QyxDQUFDLENBQUM7WUFFL0csaUNBQWUsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUNsRCxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ssb0RBQWMsR0FBdEIsVUFBdUIsTUFBTSxFQUFFLElBQXdCO1lBQ25ELElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQzNDLElBQUksb0JBQW9CLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQztZQUM5RCxJQUFHLG9CQUFvQixJQUFJLFNBQVMsRUFBQztnQkFDakMsb0JBQW9CLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDN0I7WUFDRCxJQUFJLFNBQVMsR0FBRywrQkFBYyxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUMzRSxJQUFHLElBQUksQ0FBQyxNQUFNLElBQUksb0NBQWUsQ0FBQyxHQUFHLEVBQUM7Z0JBQ0EsSUFBSSxDQUFDLFVBQVcsQ0FBQyxZQUFZLENBQUMsb0JBQW9CLEVBQUUsU0FBUyxDQUFDLENBQUM7YUFDcEc7aUJBQ0ksSUFBRyxJQUFJLENBQUMsTUFBTSxJQUFJLG9DQUFlLENBQUMsT0FBTyxFQUFDO2dCQUNULElBQUksQ0FBQyxVQUFXLENBQUMsZ0JBQWdCLENBQUMsb0JBQW9CLEVBQUUsU0FBUyxDQUFDLENBQUM7YUFDeEc7WUFDRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDekIsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLG9EQUFjLEdBQXRCLFVBQXVCLE1BQU0sRUFBRSxJQUFJO1lBQy9CLGlDQUFlLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQ3BFLGlDQUFlLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ3hFLENBQUM7UUFFRDs7O1dBR0c7UUFDTyxvREFBYyxHQUF4QjtZQUFBLGlCQWlCQztZQWhCRyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztZQUV4QixDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFFLENBQUMsVUFBVSxrREFDckMsSUFBSSxDQUFDLDJCQUEyQixFQUFFLEdBQ2xDLElBQUksQ0FBQyw4QkFBOEIsRUFBRSxHQUNyQyxJQUFJLENBQUMseUJBQXlCLEVBQUUsR0FDaEMsSUFBSSxDQUFDLDBCQUEwQixFQUFFLEtBRXBDLGFBQWEsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQ2pELFlBQVksRUFBRSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsRUFFcEMsV0FBVyxFQUFFLFVBQUMsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxFQUE5QixDQUE4QixFQUNyRCxXQUFXLEVBQUUsVUFBQyxJQUFJLElBQU0sT0FBQSxLQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEVBQTlCLENBQThCLEVBQ3RELE1BQU0sRUFBRSxVQUFDLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxlQUFlLEVBQUUsRUFBdEIsQ0FBc0IsSUFFMUMsQ0FBQztRQUNQLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSyxpRUFBMkIsR0FBbkM7WUFDSSxPQUFPO2dCQUNILE9BQU8sRUFBRTtvQkFDTCxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDO29CQUNqRSxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBQztvQkFDbEQsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUM7b0JBQ3BDLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUM7aUJBQ25FO2FBQ0osQ0FBQztRQUNOLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSyxvRUFBOEIsR0FBdEM7WUFBQSxpQkFNQztZQUxHLE9BQU87Z0JBQ0gsaUJBQWlCLEVBQUUsSUFBSTtnQkFDdkIsb0JBQW9CLEVBQUUsRUFBRSxnQkFBZ0IsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRTtnQkFDckYsYUFBYSxFQUFFLFVBQUMsSUFBSSxJQUFLLE9BQUEsaUJBQU0sbUJBQW1CLGFBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQXZELENBQXVEO2FBQ25GLENBQUM7UUFDTixDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ssK0RBQXlCLEdBQWpDO1lBQUEsaUJBU0M7WUFSRyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksMkVBQW9DLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDbEYsT0FBTztnQkFDSCxlQUFlLEVBQUU7b0JBQ2IsV0FBVyxFQUFFLElBQUk7b0JBQ2pCLGtCQUFrQixFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUU7aUJBQ3hEO2dCQUNELFlBQVksRUFBRSxVQUFDLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxLQUFJLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFyRixDQUFxRjthQUNoSCxDQUFDO1FBQ04sQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLGdFQUEwQixHQUFsQztZQUFBLGlCQU1GO1lBTEEsSUFBSSxjQUFjLEdBQUcsSUFBSSx5RkFBMkMsRUFBRSxDQUFDO1lBQ3ZFLE9BQU87Z0JBQ04sU0FBUyxFQUFFLFVBQUMsSUFBSSxJQUFLLE9BQUEsY0FBYyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBOUIsQ0FBOEI7Z0JBQzFDLE9BQU8sRUFBRSxVQUFDLElBQUksSUFBSyxPQUFBLGNBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUksQ0FBQyxVQUFVLEVBQUUsS0FBSSxDQUFDLHlCQUF5QixDQUFDLEVBQTdFLENBQTZFO2FBQ3pHLENBQUM7UUFDSCxDQUFDO1FBRVUscURBQWUsR0FBdkI7WUFDSSxnQ0FBZ0M7WUFDaEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1lBRXhDLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN0QyxDQUFDO1FBRU8seURBQW1CLEdBQTNCLFVBQTRCLElBQUk7WUFDNUIseUJBQXlCO1lBQ3pCLElBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxRQUFRLEVBQUM7Z0JBQzVCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUNuQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDL0I7UUFDTCxDQUFDO1FBRU8seURBQW1CLEdBQTNCLFVBQTRCLElBQUk7WUFDNUIsSUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksSUFBSSxTQUFTLEVBQUM7Z0JBQ3BDLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDNUM7aUJBQ0c7Z0JBQ0EsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUMzQztRQUNMLENBQUM7UUFFTSxzREFBZ0IsR0FBdkIsVUFBd0IsSUFBSTtZQUN4QixJQUFJLFNBQVMsR0FBRyxJQUFJLEtBQUssRUFBVSxDQUFDO1lBQ3BDLEtBQUksSUFBSSxDQUFDLEdBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQzlDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUM5QztZQUNELElBQUcsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUM7Z0JBQ2MsSUFBSSxDQUFDLFVBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDL0UsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7Z0JBQzNDLElBQUksaUJBQWlCLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RELElBQUcsaUJBQWlCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFDO29CQUNwRCxpQkFBaUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDO2lCQUN6RDtnQkFDRCxXQUFXLENBQUMsTUFBTSxDQUFDLGtCQUFrQixFQUFFLGlCQUFpQixFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ25FO1lBQ0QsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3pCLENBQUM7UUFFRDs7OztXQUlHO1FBQ0kseURBQW1CLEdBQTFCO1lBQ0ksc0NBQXNDO1lBQ3RDLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQzNDLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksSUFBSSxFQUFFO2dCQUNsQyxXQUFXLENBQUMsY0FBYyxFQUFFLENBQUM7YUFDaEM7WUFFRCxpQ0FBZSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUNwRSxpQ0FBZSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUNwRSxpQ0FBZSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzNCLENBQUM7UUFFRDs7Ozs7V0FLRztRQUVLLG1EQUFhLEdBQXJCO1lBQ1Esb0VBQW9FO1lBQ3BFLElBQUksVUFBVSxHQUFxQyxJQUFJLENBQUMsVUFBVyxDQUFDLElBQWtCLENBQUM7WUFDdkYsSUFBSSxDQUFDLHlCQUF5QixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ25ELENBQUM7UUFHRDs7Ozs7O1dBTUc7UUFDSyxtRUFBNkIsR0FBckMsVUFBc0Msd0JBQTZDO1lBQy9FLElBQUksQ0FBQyx5QkFBeUIsR0FBRyx3QkFBd0IsQ0FBQztZQUMxRCxpQ0FBZSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUNqRSxDQUFDO1FBRUY7Ozs7OztXQU1HO1FBQ0ssNkRBQXVCLEdBQS9CLFVBQWdDLFVBQTRCO1lBRXhELElBQUc7Z0JBQ0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUM3QjtZQUNELE9BQU0sQ0FBQyxFQUFDO2dCQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDbEI7UUFDTCxDQUFDO1FBRU8sK0RBQXlCLEdBQWpDLFVBQWtDLFVBQWdDO1lBRTlELElBQUksWUFBWSxHQUFHLFNBQVMsQ0FBQztZQUM3QixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUN2QyxJQUFHLE9BQU8sSUFBSSxTQUFTLEVBQUM7Z0JBQ3BCLFlBQVksR0FBUyxPQUFPLENBQUMsS0FBTSxDQUFDLFlBQVksQ0FBQzthQUNwRDtZQUNELElBQUcsVUFBVSxDQUFDLE1BQU0sR0FBRyxFQUFFLEVBQUM7Z0JBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3JDLElBQUksQ0FBQyxRQUFRLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDN0M7aUJBQ0c7Z0JBQ0EsSUFBRyxJQUFJLENBQUMseUJBQXlCLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBQztvQkFDMUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDeEM7cUJBQ0c7b0JBQ0EsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDekM7Z0JBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUM5QztZQUNELElBQUcsVUFBVSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksWUFBWSxJQUFJLFNBQVMsRUFBRTtnQkFDcEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUMzQztpQkFDRztnQkFDQSxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzVDO1FBQ0wsQ0FBQztRQUNMLGtDQUFDO0lBQUQsQ0FBQyxBQTNWRCxDQUEwQyx1Q0FBa0IsR0EyVjNEO0lBRVEsa0VBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVRyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldCB9IGZyb20gXCIuL2ludGVyZmFjZXMvdHJhY2VDb25maWdEYXRhcG9pbnRzV2lkZ2V0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFRyZWVHcmlkV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vdHJlZUdyaWRXaWRnZXRCYXNlXCI7XHJcbmltcG9ydCB7IElEYXRhTW9kZWwsIEV2ZW50TW9kZWxDaGFuZ2VkQXJncyB9IGZyb20gXCIuLi8uLi9tb2RlbHMvZGF0YU1vZGVsSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFRyYWNlQ29uZmlnRGF0YXBvaW50c1RyZWVHcmlkVG9vbGJhciB9IGZyb20gXCIuL3ZpZXcvdHJhY2VDb25maWdEYXRhcG9pbnRzVHJlZUdyaWRUb29sYmFyXCI7XHJcbmltcG9ydCB7IERhdGFwb2ludERpYWxvZyB9IGZyb20gXCIuLi8uLi92aWV3L2RhdGFwb2ludERpYWxvZy9kYXRhcG9pbnREaWFsb2dcIjtcclxuaW1wb3J0IHsgRXZlbnREYXRhcG9pbnRBcmdzLCBEYXRhcG9pbnRBY3Rpb24gfSBmcm9tIFwiLi4vLi4vdmlldy9kYXRhcG9pbnREaWFsb2cvZXZlbnREYXRhcG9pbnRBcmdzXCI7XHJcbmltcG9ydCB7IFRyYWNlRGF0YVBvaW50fSBmcm9tIFwiLi4vLi4vbW9kZWxzL2RpYWdub3N0aWNzL3RyYWNlL3RyYWNlRGF0YVBvaW50XCI7XHJcbmltcG9ydCB7IFRyYWNlRGF0YVBvaW50SW5mbyB9IGZyb20gXCIuLi8uLi9tb2RlbHMvZGlhZ25vc3RpY3MvdHJhY2UvdHJhY2VEYXRhUG9pbnRJbmZvXCI7XHJcbmltcG9ydCB7IFRyYWNlQ29uZmlnRGF0YXBvaW50c1RyZWVHcmlkQ2VsbEVkaXRFdmVudHMgfSBmcm9tIFwiLi92aWV3L3RyYWNlQ29uZmlnRGF0YXBvaW50c1RyZWVHcmlkQ2VsbEVkaXRFdmVudHNcIjtcclxuaW1wb3J0IHsgVHJhY2VDb25maWdEYXRhcG9pbnRzRGF0YU1vZGVsIH0gZnJvbSBcIi4vbW9kZWwvdHJhY2VDb25maWdEYXRhcG9pbnRzRGF0YU1vZGVsXCI7XHJcbmltcG9ydCB7IElUcmFjZUNvbmZpZ0RhdGFwb2ludHNEYXRhTW9kZWwgfSBmcm9tIFwiLi9tb2RlbC90cmFjZUNvbmZpZ0RhdGFwb2ludHNEYXRhTW9kZWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgRGVmYXVsdENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4vZGVmYXVsdENvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcblxyXG4vKipcclxuICogaW1wbGVtZW50cyB0aGUgVHJhY2VDb25maWdEYXRhcG9pbnRzV2lkZ2V0XHJcbiAqXHJcbiAqIEBjbGFzcyBUcmFjZUNvbmZpZ0RhdGFwb2ludHNXaWRnZXRcclxuICogQGV4dGVuZHMge1RyZWVHcmlkV2lkZ2V0QmFzZX1cclxuICovXHJcbmNsYXNzIFRyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldCBleHRlbmRzIFRyZWVHcmlkV2lkZ2V0QmFzZSBpbXBsZW1lbnRzIElUcmFjZUNvbmZpZ0RhdGFwb2ludHNXaWRnZXQge1xyXG5cclxuICAgIHByaXZhdGUgX2FkZERhdGFQb2ludEhhbmRsZXIgPSAoc2VuZGVyLGFyZ3MpPT50aGlzLm9uQWRkRGF0YXBvaW50KHNlbmRlcixhcmdzKTtcclxuICAgIHByaXZhdGUgX2RpYWxvZ0Nsb3NlZEhhbmRsZXIgPSAoc2VuZGVyLGFyZ3MpPT50aGlzLm9uRGlhbG9nQ2xvc2VkKHNlbmRlcixhcmdzKTtcclxuXHJcbiAgICBwcml2YXRlIF9hdmFpbGFibGVUcmFjZURhdGFQb2ludHM6IFRyYWNlRGF0YVBvaW50SW5mb1tdID0gbmV3IEFycmF5PFRyYWNlRGF0YVBvaW50SW5mbz4oKTtcclxuXHJcbiAgICBwcml2YXRlIF90b29sYmFyITogVHJhY2VDb25maWdEYXRhcG9pbnRzVHJlZUdyaWRUb29sYmFyO1xyXG5cclxuICAgIC8qIGluaXRpYWxpemUgdGhlIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYXlvdXRDb250YWluZXJJZFxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldFxyXG4gICAgICovXHJcbiAgICBpbml0aWFsaXplKGxheW91dENvbnRhaW5lcklkOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlci5pbml0aWFsaXplKGxheW91dENvbnRhaW5lcklkLCAzMCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZUNvbXBvbmVudCgpe1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmRlZmF1bHRTZXR0aW5nc0RhdGFJZCA9IERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5XaWRnZXREZWZpbml0aW9uSWQ7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZGlzYWJsZVBlcnNpc3RpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0aWFsaXplZCgpe1xyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemVkKCk7XHJcblxyXG4gICAgICAgIHN1cGVyLnNldEhlYWRlckNvbnRlbnQoXCJEYXRhIHBvaW50c1wiKTtcclxuXHJcbiAgICAgICAgLy8gU2V0IGR5bmFtaWMgY29sdW1uIHNldHRpbmdzXHJcbiAgICAgICAgc3VwZXIuc2V0RHluYW1pY0NvbHVtbigzLCAyNTApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBjb21wb25lbnQgc2V0dGluZ3MgZm9yIHRoaXMgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyhDb21wb25lbnRTZXR0aW5nc3x1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldFxyXG4gICAgICovXHJcbiAgICBnZXREZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MoKTogQ29tcG9uZW50U2V0dGluZ3N8dW5kZWZpbmVke1xyXG4gICAgICAgIHJldHVybiBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuZ2V0VHJhY2VDb25maWd1cmF0aW9uRGF0YVBvaW50c0RlZmluaXRpb24oKTtcclxuICAgIH1cclxuICBcclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyBhbmQgaW5pdGlhbGl6ZXMgdGhlIHRyYWNlIGRhdGEgcG9pbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7VHJhY2VEYXRhUG9pbnRbXX0gdHJhY2VEYXRhUG9pbnRzXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdEYXRhcG9pbnRzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaW5pdGlhbGl6ZVRyYWNlRGF0YVBvaW50cyh0cmFjZURhdGFQb2ludHM6VHJhY2VEYXRhUG9pbnRbXSl7XHJcbiAgICAgICAgbGV0IHRyYWNlQ29uZmlnRGF0YXBvaW50c0RhdGFNb2RlbCA9IG5ldyBUcmFjZUNvbmZpZ0RhdGFwb2ludHNEYXRhTW9kZWwoKSBhcyBJVHJhY2VDb25maWdEYXRhcG9pbnRzRGF0YU1vZGVsO1xyXG4gICAgICAgIHRyYWNlQ29uZmlnRGF0YXBvaW50c0RhdGFNb2RlbC5pbml0aWFsaXplKCk7XHJcbiAgICAgICAgdGhpcy5kYXRhTW9kZWwgPSB0cmFjZUNvbmZpZ0RhdGFwb2ludHNEYXRhTW9kZWw7XHJcbiAgICAgICAgdHJhY2VDb25maWdEYXRhcG9pbnRzRGF0YU1vZGVsLmluaXREYXRhID0gdHJhY2VEYXRhUG9pbnRzO1xyXG4gICAgICAgIHRoaXMudXBkYXRlVG9vbGJhcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogaW1wbGVtZW50cyB0aGUgbW9kZWwgY2hhbmdlIGhhbmRsaW5nXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJRGF0YU1vZGVsfSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7RXZlbnRNb2RlbENoYW5nZWRBcmdzfSBkYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ0RhdGFwb2ludHNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgaGFuZGxlTW9kZWxDaGFuZ2VkKHNlbmRlcjogSURhdGFNb2RlbCwgZXZlbnRBcmdzOiBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MpOiBhbnkge1xyXG4gICAgICAgIGxldCBkYXRhUG9pbnRzID0gZXZlbnRBcmdzLmRhdGEgYXMgQXJyYXk8VHJhY2VEYXRhUG9pbnQ+O1xyXG4gICAgICAgIHRoaXMucmVmcmVzaERhdGFwb2ludHNWYWx1ZXMoZGF0YVBvaW50cyk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVUb29sYmFyQnV0dG9uU3RhdGVzKGRhdGFQb2ludHMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogaGFuZGxlcyB0aGUgY2hhbmdlcyBvZiBvYnNlcnZlZCBpdGVtcyByZXF1ZXN0ZWQgYnkgJ29ic2VydmVEYXRhTW9kZWxJdGVtcydcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lEYXRhTW9kZWx9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHtFdmVudE1vZGVsQ2hhbmdlZEFyZ3N9IGRhdGFcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ0RhdGFwb2ludHNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgaGFuZGxlTW9kZWxJdGVtc0NoYW5nZWQoc2VuZGVyOiBJRGF0YU1vZGVsLCBldmVudEFyZ3M6IEV2ZW50TW9kZWxDaGFuZ2VkQXJncykge1xyXG4gICAgICAgIGxldCBkYXRhUG9pbnRzID0gdGhpcy5kYXRhTW9kZWwuZGF0YSBhcyBBcnJheTxUcmFjZURhdGFQb2ludD47XHJcbiAgICAgICAgdGhpcy51cGRhdGVUb29sYmFyQnV0dG9uU3RhdGVzKGRhdGFQb2ludHMpO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaERhdGFwb2ludHNWYWx1ZXMoZGF0YVBvaW50cyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGNyZWF0ZXMgdGhlIGRhdGFwb2ludCBzZWxlY3Rpb24gZGlhbG9nXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZURhdGFwb2ludHNEaWFsb2coKXtcclxuICAgICAgICBsZXQgZGF0YXBvaW50RGlhbG9nSWQgPSBcImRhdGFwb2ludERpYWxvZ1wiO1xyXG4gICAgICAgICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpLmFwcGVuZChcIjxkaXYgaWQ9J1wiICsgZGF0YXBvaW50RGlhbG9nSWQgKyBcIic+PGRpdiBpZD0nZGF0YXBvaW50Q29udGVudFJvb3QnPjwvPjwvPlwiKTsgICBcclxuICAgICAgICBcclxuICAgICAgICBEYXRhcG9pbnREaWFsb2cuaW5pdGlhbGl6ZShkYXRhcG9pbnREaWFsb2dJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGNhdGNoZXMgdGhlIGFkZCBkYXRhcG9pbnQgZXZlbnQgZnJvbSB0aGUgZGF0YXBvaW50IGRpYWxvZ1xyXG4gICAgICogPT4gYWRkcyBvciByZXBsYWNlcyB0aGUgc2VsZWN0ZWQgZGF0YXBvaW50IHdpdGggdGhlIGRhdGFwb2ludCBmcm9tIHRoZSBkYXRhcG9pbnQgZGlhbG9nXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHt9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHtFdmVudERhdGFwb2ludEFyZ3N9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ0RhdGFwb2ludHNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbkFkZERhdGFwb2ludChzZW5kZXIsIGFyZ3M6IEV2ZW50RGF0YXBvaW50QXJncyl7XHJcbiAgICAgICAgdmFyIHRyZWVHcmlkT2JqID0gdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpO1xyXG4gICAgICAgIGxldCBhY3R1YWxTZWxlY3Rpb25JbmRleCA9IHRyZWVHcmlkT2JqLm1vZGVsLnNlbGVjdGVkUm93SW5kZXg7XHJcbiAgICAgICAgaWYoYWN0dWFsU2VsZWN0aW9uSW5kZXggPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgYWN0dWFsU2VsZWN0aW9uSW5kZXggPSAtMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGRhdGFQb2ludCA9IFRyYWNlRGF0YVBvaW50LmNyZWF0ZVdpdGhEYXRhUG9pbnRJbmZvKGFyZ3MuZGF0YVBvaW50SW5mbyk7XHJcbiAgICAgICAgaWYoYXJncy5hY3Rpb24gPT0gRGF0YXBvaW50QWN0aW9uLmFkZCl7XHJcbiAgICAgICAgICAgICg8SVRyYWNlQ29uZmlnRGF0YXBvaW50c0RhdGFNb2RlbD50aGlzLl9kYXRhTW9kZWwpLmFkZERhdGFwb2ludChhY3R1YWxTZWxlY3Rpb25JbmRleCwgZGF0YVBvaW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihhcmdzLmFjdGlvbiA9PSBEYXRhcG9pbnRBY3Rpb24ucmVwbGFjZSl7XHJcbiAgICAgICAgICAgICg8SVRyYWNlQ29uZmlnRGF0YXBvaW50c0RhdGFNb2RlbD50aGlzLl9kYXRhTW9kZWwpLnJlcGxhY2VEYXRhcG9pbnQoYWN0dWFsU2VsZWN0aW9uSW5kZXgsIGRhdGFQb2ludCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudXBkYXRlVG9vbGJhcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBjYXRjaGVzIHRoZSBkaWFsb2cgY2xvc2UgZXZlbnQgZnJvbSB0aGUgZGF0YXBvaW50IGRpYWxvZ1xyXG4gICAgICogPT4gZGV0YWNoZXMgdGhlIGRpYWxvZyBldmVudHNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge30gc2VuZGVyXHJcbiAgICAgKiBAcGFyYW0ge30gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uRGlhbG9nQ2xvc2VkKHNlbmRlciwgYXJncyl7XHJcbiAgICAgICAgRGF0YXBvaW50RGlhbG9nLmV2ZW50QWRkRGF0YXBvaW50LmRldGFjaCh0aGlzLl9hZGREYXRhUG9pbnRIYW5kbGVyKTtcclxuICAgICAgICBEYXRhcG9pbnREaWFsb2cuZXZlbnREaWFsb2dDbG9zZWQuZGV0YWNoKHRoaXMuX2RpYWxvZ0Nsb3NlZEhhbmRsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBjcmVhdGVzIHRoZSB0cmVlIGdyaWQgZm9yIHRoZSBkYXRhcG9pbnQgaW5mb3JtYXRpb25zXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlVHJlZUdyaWQoKSB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVEYXRhcG9pbnRzRGlhbG9nKCk7XHJcbiAgICAgXHJcbiAgICAgICAgKDxhbnk+JCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCkpLmVqVHJlZUdyaWQoe1xyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbigpLFxyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkQ29sdW1uUmVzaXplU3VwcG9ydCgpLFxyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkVG9vbGJhclN1cHBvcnQoKSxcclxuICAgICAgICAgICAgLi4udGhpcy5nZXRUcmVlR3JpZENlbGxFZGl0U3VwcG9ydCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBzZWxlY3Rpb25UeXBlOiBlai5UcmVlR3JpZC5TZWxlY3Rpb25UeXBlLk11bHRpcGxlLFxyXG4gICAgICAgICAgICBlZGl0U2V0dGluZ3M6IHsgYWxsb3dFZGl0aW5nOiB0cnVlIH0sXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByb3dTZWxlY3RlZDogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWRSb3dTZWxlY3RlZChhcmdzKSxcclxuICAgICAgICAgICAgYWN0aW9uQmVnaW46IChhcmdzKSA9PiAgdGhpcy50cmVlR3JpZEFjdGlvbkJlZ2luKGFyZ3MpLFxyXG4gICAgICAgICAgICBjcmVhdGU6IChhcmdzKSA9PiB0aGlzLnRyZWVHcmlkQ3JlYXRlZCgpLFxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCBjb2x1bW4gZGVmaW5pdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdEYXRhcG9pbnRzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCk6IHt9e1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNvbHVtbnM6IFtcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwiZGF0YVBvaW50TmFtZVwiLCBoZWFkZXJUZXh0OiBcIkRhdGEgcG9pbnRcIiwgd2lkdGg6IFwiMzUwXCJ9LFxyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJjb21wb25lbnROYW1lXCIsIGhlYWRlclRleHQ6IFwiQ29tcG9uZW50XCJ9LFxyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJuYW1lXCIsIGhlYWRlclRleHQ6IFwiTmFtZVwifSxcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwiZGVzY3JpcHRpb25cIiwgaGVhZGVyVGV4dDogXCJEZXNjcmlwdGlvblwiLCB3aWR0aDogXCIyNTBcIn0sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCBjb2x1bW4gcmVzaXplIHNldHRpbmdzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ0RhdGFwb2ludHNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmVlR3JpZENvbHVtblJlc2l6ZVN1cHBvcnQoKToge317XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYWxsb3dDb2x1bW5SZXNpemU6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbHVtblJlc2l6ZVNldHRpbmdzOiB7IGNvbHVtblJlc2l6ZU1vZGU6IGVqLlRyZWVHcmlkLkNvbHVtblJlc2l6ZU1vZGUuRml4ZWRDb2x1bW5zIH0sXHJcbiAgICAgICAgICAgIGNvbHVtblJlc2l6ZWQ6IChhcmdzKSA9PiBzdXBlci5yZXNpemVEeW5hbWljQ29sdW1uKGFyZ3MuY29sdW1uSW5kZXgsIGFyZ3MubW9kZWwpLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgdG9vbGJhciBzZXR0aW5nc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdEYXRhcG9pbnRzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VHJlZUdyaWRUb29sYmFyU3VwcG9ydCgpOiB7fXtcclxuICAgICAgICB0aGlzLl90b29sYmFyID0gbmV3IFRyYWNlQ29uZmlnRGF0YXBvaW50c1RyZWVHcmlkVG9vbGJhcih0aGlzLmNzc1BhcmVudENvbnRlbnRJZCk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdG9vbGJhclNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICBzaG93VG9vbGJhcjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGN1c3RvbVRvb2xiYXJJdGVtczogdGhpcy5fdG9vbGJhci5nZXRDdXN0b21Ub29sYmFycygpLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0b29sYmFyQ2xpY2s6IChhcmdzKSA9PiB0aGlzLl90b29sYmFyLnRvb2xiYXJDbGljayhhcmdzLCB0aGlzLCAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKS5kYXRhKFwiZWpUcmVlR3JpZFwiKSksXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCBjZWxsIGVkaXQgc2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFRyZWVHcmlkQ2VsbEVkaXRTdXBwb3J0KCk6IHt9e1xyXG5cdFx0dmFyIGNlbGxFZGl0RXZlbnRzID0gbmV3IFRyYWNlQ29uZmlnRGF0YXBvaW50c1RyZWVHcmlkQ2VsbEVkaXRFdmVudHMoKTtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGJlZ2luRWRpdDogKGFyZ3MpID0+IGNlbGxFZGl0RXZlbnRzLmJlZ2luRWRpdChhcmdzKSxcclxuICAgICAgICAgICAgZW5kRWRpdDogKGFyZ3MpID0+IGNlbGxFZGl0RXZlbnRzLmVuZEVkaXQoYXJncywgdGhpcy5fZGF0YU1vZGVsLCB0aGlzLl9hdmFpbGFibGVUcmFjZURhdGFQb2ludHMpLFxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG4gICAgcHJpdmF0ZSB0cmVlR3JpZENyZWF0ZWQoKXtcclxuICAgICAgICAvLyBTZXRzIHRoZSBjdXN0b20gdG9vbGJhciBpY29uc1xyXG4gICAgICAgIHRoaXMuX3Rvb2xiYXIuc2V0U3R5bGVGb3JUb29sYmFySWNvbnMoKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl90b29sYmFyLmluaXRUb29sYmFyU3RhdGVzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0cmVlR3JpZEFjdGlvbkJlZ2luKGFyZ3Mpe1xyXG4gICAgICAgIC8vIFN1cHBvcnQgXCJFbnRmL0RlbFwiIGtleVxyXG4gICAgICAgIGlmKGFyZ3MucmVxdWVzdFR5cGUgPT0gXCJkZWxldGVcIil7XHJcbiAgICAgICAgICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5kZWxldGVEYXRhUG9pbnRzKGFyZ3MpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRyZWVHcmlkUm93U2VsZWN0ZWQoYXJncyl7XHJcbiAgICAgICAgaWYoYXJncy5tb2RlbC5zZWxlY3RlZEl0ZW0gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbGJhci5kaXNhYmxlUmVtb3ZlQnV0dG9uKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbGJhci5kaXNhYmxlUmVtb3ZlQnV0dG9uKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGVsZXRlRGF0YVBvaW50cyhhcmdzKXtcclxuICAgICAgICBsZXQgaW5kZXhMaXN0ID0gbmV3IEFycmF5PG51bWJlcj4oKTtcclxuICAgICAgICBmb3IobGV0IGk9YXJncy5kZWxldGVkSXRlbXMubGVuZ3RoLTE7IGkgPj0gMDsgaS0tKXtcclxuICAgICAgICAgICAgaW5kZXhMaXN0LnB1c2goYXJncy5kZWxldGVkSXRlbXNbaV0uaW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihpbmRleExpc3QubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICg8SVRyYWNlQ29uZmlnRGF0YXBvaW50c0RhdGFNb2RlbD50aGlzLl9kYXRhTW9kZWwpLnJlbW92ZURhdGFwb2ludHMoaW5kZXhMaXN0KTtcclxuICAgICAgICAgICAgdmFyIHRyZWVHcmlkT2JqID0gdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpO1xyXG4gICAgICAgICAgICBsZXQgbmV3U2VsZWN0aW9uSW5kZXggPSBpbmRleExpc3RbaW5kZXhMaXN0Lmxlbmd0aC0xXTtcclxuICAgICAgICAgICAgaWYobmV3U2VsZWN0aW9uSW5kZXggPj0gYXJncy5tb2RlbC5wYXJlbnRSZWNvcmRzLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICBuZXdTZWxlY3Rpb25JbmRleCA9IGFyZ3MubW9kZWwucGFyZW50UmVjb3Jkcy5sZW5ndGgtMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0cmVlR3JpZE9iai5vcHRpb24oXCJzZWxlY3RlZFJvd0luZGV4XCIsIG5ld1NlbGVjdGlvbkluZGV4LCB0cnVlKTsgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudXBkYXRlVG9vbGJhcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogb3BlbnMgdGhlIGRhdGFwb2ludCBzZWxlY3Rpb24gZGlhbG9nIGFuZCBhdHRhY2hlcyB0byB0aGUgZGlhbG9nIGV2ZW50c1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ0RhdGFwb2ludHNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIG9wZW5EYXRhcG9pbnREaWFsb2coKXtcclxuICAgICAgICAvL0NhbmNlbCBlZGl0IGNlbGwgd2hlbiBvcGVuaW5nIGRpYWxvZ1xyXG4gICAgICAgIHZhciB0cmVlR3JpZE9iaiA9IHRoaXMuZ2V0VHJlZUdyaWRPYmplY3QoKTtcclxuICAgICAgICBpZiAodHJlZUdyaWRPYmoubW9kZWwuaXNFZGl0ID09IHRydWUpIHtcclxuICAgICAgICAgICAgdHJlZUdyaWRPYmouY2FuY2VsRWRpdENlbGwoKTsgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBEYXRhcG9pbnREaWFsb2cuZXZlbnRBZGREYXRhcG9pbnQuYXR0YWNoKHRoaXMuX2FkZERhdGFQb2ludEhhbmRsZXIpO1xyXG4gICAgICAgIERhdGFwb2ludERpYWxvZy5ldmVudERpYWxvZ0Nsb3NlZC5hdHRhY2godGhpcy5fZGlhbG9nQ2xvc2VkSGFuZGxlcik7XHJcbiAgICAgICAgRGF0YXBvaW50RGlhbG9nLm9wZW4oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHVwZGF0ZXMgdGhlIHRvb2xiYXIgY29ycmVzcG9uZGluZyB0byB0aGUgY3VycmVudCBkYXRhIHNlbGVjdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdEYXRhcG9pbnRzV2lkZ2V0XHJcbiAgICAgKi9cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZVRvb2xiYXIoKSB7XHJcbiAgICAgICAgICAgIC8vIFVwZGF0ZSB0b29sYmFyIGJ1dHRvbnMgPT4gc2hvdy9oaWRlIGFkZCBkYXRhcG9pbnRzIHRvb2xiYXIgYnV0dG9uXHJcbiAgICAgICAgICAgIGxldCBkYXRhUG9pbnRzID0gKDxJVHJhY2VDb25maWdEYXRhcG9pbnRzRGF0YU1vZGVsPnRoaXMuX2RhdGFNb2RlbCkuZGF0YSBhcyBBcnJheTxhbnk+O1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVRvb2xiYXJCdXR0b25TdGF0ZXMoZGF0YVBvaW50cyk7XHJcbiAgICB9ICAgXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6ZXMgYW5kIHVwZGF0ZXMgdGhlIGF2YWlsYWJsZSB0cmFjZSBkYXRhIHBvaW50c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge1RyYWNlRGF0YVBvaW50SW5mb1tdfSBhdmFpbGFibGVUcmFjZURhdGFQb2ludHNcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ0RhdGFwb2ludHNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbml0aWFsaXplQXZhaWxhYmxlRGF0YVBvaW50cyhhdmFpbGFibGVUcmFjZURhdGFQb2ludHM6VHJhY2VEYXRhUG9pbnRJbmZvW10pe1xyXG4gICAgICAgIHRoaXMuX2F2YWlsYWJsZVRyYWNlRGF0YVBvaW50cyA9IGF2YWlsYWJsZVRyYWNlRGF0YVBvaW50cztcclxuICAgICAgICBEYXRhcG9pbnREaWFsb2cuc2V0RGF0YXBvaW50cyh0aGlzLl9hdmFpbGFibGVUcmFjZURhdGFQb2ludHMpO1xyXG4gICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlZnJlc2hlcyB0aGUgY29udGVudCBvZiB0aGUgZGF0YXBvaW50cyBwYXJhbWV0ZXJzIHZhbHVlIGZpZWxkc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0RhdGFwb2ludFtdfSBkYXRhcG9pbnRzXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdEYXRhcG9pbnRzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVmcmVzaERhdGFwb2ludHNWYWx1ZXMoZGF0YXBvaW50czogVHJhY2VEYXRhUG9pbnRbXSkge1xyXG5cclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0TW9kZWwoZGF0YXBvaW50cyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoKGUpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVUb29sYmFyQnV0dG9uU3RhdGVzKGRhdGFQb2ludHM6QXJyYXk8VHJhY2VEYXRhUG9pbnQ+KXtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgc2VsZWN0ZWRJdGVtID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHZhciB0cmVlT2JqID0gdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpO1xyXG4gICAgICAgIGlmKHRyZWVPYmogIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgc2VsZWN0ZWRJdGVtID0gKDxhbnk+dHJlZU9iai5tb2RlbCkuc2VsZWN0ZWRJdGVtO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihkYXRhUG9pbnRzLmxlbmd0aCA+IDMxKXtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbGJhci5kaXNhYmxlQWRkQnV0dG9uKHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLl90b29sYmFyLmRpc2FibGVBZGRFbXB0eUJ1dHRvbih0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgaWYodGhpcy5fYXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzLmxlbmd0aCA9PSAwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2xiYXIuZGlzYWJsZUFkZEJ1dHRvbih0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdG9vbGJhci5kaXNhYmxlQWRkQnV0dG9uKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl90b29sYmFyLmRpc2FibGVBZGRFbXB0eUJ1dHRvbihmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGRhdGFQb2ludHMubGVuZ3RoID09IDAgfHwgc2VsZWN0ZWRJdGVtID09IHVuZGVmaW5lZCApe1xyXG4gICAgICAgICAgICB0aGlzLl90b29sYmFyLmRpc2FibGVSZW1vdmVCdXR0b24odHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2xiYXIuZGlzYWJsZVJlbW92ZUJ1dHRvbihmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBUcmFjZUNvbmZpZ0RhdGFwb2ludHNXaWRnZXQgfTsiXX0=