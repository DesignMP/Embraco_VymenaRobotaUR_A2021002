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
define(["require", "exports", "../common/treeGridWidgetBase", "./view/traceConfigTriggerTreeGridToolbar", "./view/traceConfigTriggerTreeGridCellEditTemplate", "./view/traceConfigTriggerTreeGridCellEditEvents", "../../view/datapointDialog/datapointDialog", "./model/traceConfigTriggerDataModel", "./triggerDescriptionProvider", "./defaultComponentSettings"], function (require, exports, treeGridWidgetBase_1, traceConfigTriggerTreeGridToolbar_1, traceConfigTriggerTreeGridCellEditTemplate_1, traceConfigTriggerTreeGridCellEditEvents_1, datapointDialog_1, traceConfigTriggerDataModel_1, triggerDescriptionProvider_1, defaultComponentSettings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * implements the TraceConfigTriggerWidget
     *
     * @class TraceConfigTriggerWidget
     * @extends {TreeGridWidgetBase}
     */
    var TraceConfigTriggerWidget = /** @class */ (function (_super) {
        __extends(TraceConfigTriggerWidget, _super);
        function TraceConfigTriggerWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._addDataPointHandler = function (sender, args) { return _this.onAddDatapoint(sender, args); };
            _this._dialogClosedHandler = function (sender, args) { return _this.onDialogClosed(sender, args); };
            _this._availableTraceDataPoints = new Array();
            _this._actualTriggerConditionDescriptionId = 0;
            _this._dropDownListSelectionChangedHandler = function (sender, args) { return _this.onDropDownListSelectionChanged(sender, args); };
            return _this;
        }
        /* initialize the widget
         *
         * @param {string} layoutContainerId
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.initialize = function (layoutContainerId) {
            _super.prototype.initialize.call(this, layoutContainerId, 30, 290);
        };
        TraceConfigTriggerWidget.prototype.initializeComponent = function () {
            this.component.defaultSettingsDataId = defaultComponentSettings_1.DefaultComponentSettings.WidgetDefinitionId;
            this.component.disablePersisting();
        };
        TraceConfigTriggerWidget.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            _super.prototype.setHeaderContent.call(this, "Trigger");
            this.updateFooterContent(0);
            // Set dynamic column settings
            _super.prototype.setDynamicColumn.call(this, 1, 80);
        };
        /**
         * Updates and initializes the trace data points
         *
         * @private
         * @param {TraceDataPoint[]} traceDataPoints
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.initializeAvailableDataPoints = function (availableTraceDataPoints) {
            this._availableTraceDataPoints = availableTraceDataPoints;
            datapointDialog_1.DatapointDialog.setDatapoints(this._availableTraceDataPoints);
        };
        /**
         * Updates and initializes the start triggers
         *
         * @private
         * @param {TraceStartTrigger[]} startTriggers
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.initializeTraceStartTriggerInfo = function (startTriggerInfo) {
            var traceConfigTriggerDataModel = new traceConfigTriggerDataModel_1.TraceConfigTriggerDataModel();
            traceConfigTriggerDataModel.initialize();
            this.dataModel = traceConfigTriggerDataModel;
            traceConfigTriggerDataModel.initData = startTriggerInfo;
        };
        /**
         * Returns the default component settings for this widget
         *
         * @returns {(ComponentSettings|undefined)}
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.getDefaultComponentSettings = function () {
            return defaultComponentSettings_1.DefaultComponentSettings.getTraceConfigurationTriggerDefinition();
        };
        TraceConfigTriggerWidget.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            if (this._cellEditTemplate != undefined) {
                this._cellEditTemplate.eventSelectionChanged.detach(this._dropDownListSelectionChangedHandler);
            }
        };
        /** updates the footer content with the trigger description
         *
         * @param {number} triggerConditionId (e.g. 20 for IN_WINDOW; 30 for OUT_WINDOW; ...)
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.updateFooterContent = function (triggerConditionId) {
            if (this._actualTriggerConditionDescriptionId != triggerConditionId) {
                this._actualTriggerConditionDescriptionId = triggerConditionId;
                var htmlData = triggerDescriptionProvider_1.TriggerDescriptionProvider.getHtmlDescription(triggerConditionId);
                _super.prototype.setFooterContent.call(this, htmlData);
            }
        };
        /**
         * implements the model change handling
         *
         * @param {IDataModel} sender
         * @param {EventModelChangedArgs} data
         * @returns {*}
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.handleModelChanged = function (sender, eventArgs) {
            this.refresh();
            // Set correct footer content 
            var treeGridObj = this.getTreeGridObject();
            var actualSelectedItem = treeGridObj.model.selectedItem;
            if (actualSelectedItem == undefined) {
                // get trigger condition of first trigger
                var conditionParameter = "StartTrigger1_Condition";
                var triggerConditionValue = this.getTriggerConditionValue(treeGridObj.model.dataSource, conditionParameter);
                this.updateFooterContent(triggerConditionValue);
            }
            else {
                this.updateFooterContentToSelectedItem(actualSelectedItem);
            }
        };
        TraceConfigTriggerWidget.prototype.updateFooterContentToSelectedItem = function (selectedItem) {
            var startTriggerGroup;
            if (selectedItem.level == 0) {
                // Rootnode selected
                startTriggerGroup = selectedItem;
            }
            else {
                // Parameter selected
                startTriggerGroup = selectedItem.parentItem;
            }
            if (startTriggerGroup != undefined) {
                // TODO: remove/change _startTriggerRef
                var triggerConditionValue = startTriggerGroup._startTriggerRef.condition;
                this.updateFooterContent(parseInt(triggerConditionValue, 10));
            }
        };
        /**
         * handles the changes of observed items requested by 'observeDataModelItems'
         *
         * @param {IDataModel} sender
         * @param {EventModelChangedArgs} data
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.handleModelItemsChanged = function (sender, eventArgs) {
            this.refresh();
        };
        /** creates the datapoint selection dialog
         *
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.createDatapointsDialog = function () {
            var datapointDialogId = "datapointDialogTrigger";
            $(this.cssParentContentId).append("<div id='" + datapointDialogId + "'></>");
            datapointDialog_1.DatapointDialog.initialize(datapointDialogId);
        };
        /** catches the add datapoint event from the datapoint dialog
         * => sets the selected datapoint to the actual selected trigger and closes the datapoint dialog
         *
         * @param {} sender
         * @param {EventDatapointArgs} args
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.onAddDatapoint = function (sender, args) {
            this.setDatapointNameToSelectedTrigger(args.dataPointInfo.fullname);
            datapointDialog_1.DatapointDialog.close();
        };
        /** catches the dialog close event from the datapoint dialog
         * => detaches the dialog events
         *
         * @param {} sender
         * @param {} args
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.onDialogClosed = function (sender, args) {
            datapointDialog_1.DatapointDialog.eventAddDatapoint.detach(this._addDataPointHandler);
            datapointDialog_1.DatapointDialog.eventDialogClosed.detach(this._dialogClosedHandler);
        };
        /** catches the dialog close event from the datapoint dialog
         * => detaches the dialog events
         *
         * @param {string} dataPointName
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.setDatapointNameToSelectedTrigger = function (dataPointName) {
            var treeGridObj = this.getTreeGridObject();
            var startTriggerItem;
            var actualSelectedItem = treeGridObj.model.selectedItem;
            if (actualSelectedItem != undefined) {
                if (actualSelectedItem.level == 0) {
                    startTriggerItem = actualSelectedItem;
                }
                else {
                    startTriggerItem = actualSelectedItem.parentItem;
                }
            }
            else {
                console.log("No start trigger selected!");
            }
            // Save cell bevor updating the datamodel to see the right data after update
            treeGridObj.saveCell();
            var dataPointNameParameter = startTriggerItem.item.childs.filter(function (triggerParameter) { return triggerParameter.id == "datapoint"; })[0];
            if (dataPointNameParameter != undefined) {
                dataPointNameParameter.displayValue = dataPointName;
                this.refresh();
                startTriggerItem.setValue(dataPointNameParameter, dataPointName);
            }
        };
        /** creates the tree grid for the trigger informations
         *
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.createTreeGrid = function () {
            var _this = this;
            this.createDatapointsDialog();
            $(this.cssParentContentId).ejTreeGrid(__assign(__assign(__assign(__assign(__assign({}, this.getTreeGridColumnDefinition()), this.getTreeGridColumnResizeSupport()), this.getTreeGridToolbarSupport()), this.getTreeGridCellEditSupport()), { childMapping: "childs", expandStateMapping: "expandState", expanded: function (args) { return _this.treeGridNodeExpandedOrCollapsed(); }, collapsed: function (args) { return _this.treeGridNodeExpandedOrCollapsed(); }, rowSelected: function (args) { return _this.treeGridRowSelected(args); }, create: function (args) { return _this.treeGridCreated(); }, actionBegin: function (args) { return _this.treeGridActionBegin(args); }, actionComplete: function (args) { return _this.treeGridActionComplete(args); } }));
        };
        TraceConfigTriggerWidget.prototype.treeGridNodeExpandedOrCollapsed = function () {
            // Refresh to see correct expanded/collapsed icon
            this.refresh();
        };
        /**
         * Returns the tree grid column definition
         *
         * @private
         * @returns {{}}
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.getTreeGridColumnDefinition = function () {
            this._cellEditTemplate = traceConfigTriggerTreeGridCellEditTemplate_1.TraceConfigTriggerTreeGridCellEditTemplate.createInstance();
            this._cellEditTemplate.eventSelectionChanged.attach(this._dropDownListSelectionChangedHandler);
            return {
                columns: [
                    { field: "displayName", headerText: "Name", width: "200" },
                    { field: "displayValue", headerText: "Value", width: "200", editType: "stringedit", editTemplate: this._cellEditTemplate }
                ],
            };
        };
        /**
         * Returns the tree grid column resize settings
         *
         * @private
         * @returns {{}}
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.getTreeGridColumnResizeSupport = function () {
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
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.getTreeGridToolbarSupport = function () {
            var _this = this;
            this._toolbar = new traceConfigTriggerTreeGridToolbar_1.TraceConfigTriggerTreeGridToolbar(this.cssParentContentId);
            return {
                toolbarSettings: {
                    showToolbar: true,
                    customToolbarItems: this._toolbar.getCustomToolbars(),
                },
                toolbarClick: function (args) { return _this._toolbar.toolbarClick(args, _this); },
            };
        };
        /**
         * Returns the tree grid cell edit settings
         *
         * @private
         * @returns {{}}
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.getTreeGridCellEditSupport = function () {
            var cellEditEvents = new traceConfigTriggerTreeGridCellEditEvents_1.TraceConfigTriggerTreeGridCellEditEvents();
            return {
                editSettings: { allowEditing: true },
                beginEdit: function (args) { return cellEditEvents.beginEdit(args); },
                endEdit: function (args) { return cellEditEvents.endEdit(args); },
            };
        };
        TraceConfigTriggerWidget.prototype.treeGridCreated = function () {
            // Sets the custom toolbar icons
            this._toolbar.setStyleForToolbarIcons();
        };
        TraceConfigTriggerWidget.prototype.treeGridActionBegin = function (args) {
            // Support "Entf/Del" key
            if (args.requestType == "delete") {
                this.deleteStartTriggers(args.deletedItems);
                args.cancel = true;
            }
        };
        TraceConfigTriggerWidget.prototype.treeGridActionComplete = function (args) {
            // Event trigger while changing datasource dynamically. 
            // code to done after the dynamic change of datasource. 
            if (args.requestType === 'refreshDataSource') {
                this.refreshSelection();
            }
        };
        TraceConfigTriggerWidget.prototype.treeGridRowSelected = function (args) {
            if (args.model.selectedItem != undefined) {
                this.updateFooterContentToSelectedItem(args.model.selectedItem);
                this.updateToolbarButtonStates(args.model.dataSource, args.model.selectedItem);
            }
        };
        TraceConfigTriggerWidget.prototype.addStartTrigger = function () {
            this.dataModel.addTrigger();
            this.refreshSelection();
            // Get actual selection item
            var treeObj = $(this.cssParentContentId).ejTreeGrid('instance');
            var selectedItem = treeObj.model.selectedItem;
            if (treeObj.model.selectedRowIndex == -1) {
                selectedItem = undefined;
            }
            this.updateToolbarButtonStates(treeObj.model.dataSource, selectedItem);
        };
        TraceConfigTriggerWidget.prototype.deleteStartTriggers = function (deleteItems) {
            var indexList = new Array();
            for (var i = deleteItems.length - 1; i >= 0; i--) {
                if (deleteItems[i].level == 0) {
                    // Only level 0 can be deleted (start trigger group, not single parameters of this group)
                    indexList.push(deleteItems[i].hierarchyRowIndex);
                }
            }
            if (indexList.length > 0) {
                this.dataModel.removeTriggers(indexList);
                this.refreshSelection();
                // Get actual selection item
                var treeObj = $(this.cssParentContentId).ejTreeGrid('instance');
                var selectedItem = treeObj.model.selectedItem;
                if (treeObj.model.selectedRowIndex == -1) {
                    selectedItem = undefined;
                }
                this.updateToolbarButtonStates(treeObj.model.dataSource, selectedItem);
            }
        };
        /**
         * opens the datapoint selection dialog and attaches to the dialog events
         *
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.openDatapointDialog = function () {
            datapointDialog_1.DatapointDialog.eventAddDatapoint.attach(this._addDataPointHandler);
            datapointDialog_1.DatapointDialog.eventDialogClosed.attach(this._dialogClosedHandler);
            datapointDialog_1.DatapointDialog.open(TraceConfigTriggerWidget.selectDataPointDialogTitle, datapointDialog_1.FooterContentType.applyClose);
        };
        TraceConfigTriggerWidget.prototype.refreshSelection = function () {
            var treeObj = $(this.cssParentContentId).ejTreeGrid('instance');
            // Get actual selection index
            var actualSelectedRowIndex = treeObj.model.selectedRowIndex;
            if (actualSelectedRowIndex == -1) {
                // update toolbar buttons in case of no selected item
                this.updateToolbarButtonStates(treeObj.model.dataSource, undefined);
                return;
            }
            // Reset selection
            treeObj.model.selectedRowIndex = -1;
            // Set to last index if index is out of range
            if (actualSelectedRowIndex >= treeObj.model.flatRecords.length) {
                actualSelectedRowIndex = treeObj.model.flatRecords.length - 1;
            }
            // Set selection
            treeObj.model.selectedRowIndex = actualSelectedRowIndex;
            // update toolbar buttons with selected item
            if (treeObj.model.flatRecords[actualSelectedRowIndex] != undefined) {
                this.updateToolbarButtonStates(treeObj.model.dataSource, treeObj.model.flatRecords[actualSelectedRowIndex].item);
            }
        };
        /**
         * Returns the trigger condition(e.g. 20 for IN_WINDOW; 30 for OUT_WINDOW; ...) for the given condition parameter id (e.g. StartTrigger1_Condition)
         *
         * @param {} dataSource
         * @param {string} conditionParameter
         * @returns {number}
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.getTriggerConditionValue = function (dataSource, conditionParameter) {
            for (var i = 0; i < dataSource.length; i++) {
                var startTrigger = dataSource[i];
                for (var j = 0; j < startTrigger.childs.length; j++) {
                    var parameter = startTrigger.childs[j];
                    if (parameter.componentParameter.browseName == conditionParameter) {
                        return parseInt(parameter.componentParameter.value, 10);
                    }
                }
            }
            return 0;
        };
        /**
         * Refreshes trigger parameters tree grid with the current model data
         *
         * @private
         * @memberof TraceConfigTriggerWidget
         */
        TraceConfigTriggerWidget.prototype.refresh = function () {
            this.setModel(this.dataModel.data);
        };
        TraceConfigTriggerWidget.prototype.onDropDownListSelectionChanged = function (sender, args) {
            this.updateFooterContent(args.value);
        };
        TraceConfigTriggerWidget.prototype.updateToolbarButtonStates = function (startTriggers, selectedItem) {
            // Set select trigger datapoint button state
            if (selectedItem == undefined) {
                this._toolbar.disableSelectTriggerDataPointButton(true);
            }
            else {
                this._toolbar.disableSelectTriggerDataPointButton(false);
            }
            // Set add trigger button state
            if (startTriggers.length > 1) {
                this._toolbar.disableAddButton(true);
            }
            else {
                this._toolbar.disableAddButton(false);
            }
            // Set remove trigger button state
            if (startTriggers.length == 0 || selectedItem == undefined || selectedItem.level > 0) {
                this._toolbar.disableRemoveButton(true);
            }
            else {
                this._toolbar.disableRemoveButton(false);
            }
        };
        TraceConfigTriggerWidget.selectDataPointDialogTitle = "Select data point";
        return TraceConfigTriggerWidget;
    }(treeGridWidgetBase_1.TreeGridWidgetBase));
    exports.TraceConfigTriggerWidget = TraceConfigTriggerWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VDb25maWdUcmlnZ2VyV2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RyYWNlQ29uZmlnVHJpZ2dlcldpZGdldC90cmFjZUNvbmZpZ1RyaWdnZXJXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZ0JBOzs7OztPQUtHO0lBQ0g7UUFBdUMsNENBQWtCO1FBQXpEO1lBQUEscUVBZ2VDO1lBOWRXLDBCQUFvQixHQUFHLFVBQUMsTUFBTSxFQUFDLElBQUksSUFBRyxPQUFBLEtBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxFQUFoQyxDQUFnQyxDQUFDO1lBQ3ZFLDBCQUFvQixHQUFHLFVBQUMsTUFBTSxFQUFDLElBQUksSUFBRyxPQUFBLEtBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxFQUFoQyxDQUFnQyxDQUFDO1lBRXZFLCtCQUF5QixHQUF5QixJQUFJLEtBQUssRUFBc0IsQ0FBQztZQUlsRiwwQ0FBb0MsR0FBRyxDQUFDLENBQUM7WUFJekMsMENBQW9DLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFHLE9BQUEsS0FBSSxDQUFDLDhCQUE4QixDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsRUFBaEQsQ0FBZ0QsQ0FBQzs7UUFtZG5ILENBQUM7UUFqZEc7Ozs7V0FJRztRQUNILDZDQUFVLEdBQVYsVUFBVyxpQkFBeUI7WUFDaEMsaUJBQU0sVUFBVSxZQUFDLGlCQUFpQixFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNqRCxDQUFDO1FBRUQsc0RBQW1CLEdBQW5CO1lBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsR0FBRyxtREFBd0IsQ0FBQyxrQkFBa0IsQ0FBQztZQUNuRixJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFD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Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHJlZUdyaWRXaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi90cmVlR3JpZFdpZGdldEJhc2VcIjtcclxuaW1wb3J0IHsgSURhdGFNb2RlbCwgRXZlbnRNb2RlbENoYW5nZWRBcmdzfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2RhdGFNb2RlbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUcmFjZUNvbmZpZ1RyaWdnZXJUcmVlR3JpZFRvb2xiYXIgfSBmcm9tIFwiLi92aWV3L3RyYWNlQ29uZmlnVHJpZ2dlclRyZWVHcmlkVG9vbGJhclwiO1xyXG5pbXBvcnQgeyBUcmFjZUNvbmZpZ1RyaWdnZXJUcmVlR3JpZENlbGxFZGl0VGVtcGxhdGUgfSBmcm9tIFwiLi92aWV3L3RyYWNlQ29uZmlnVHJpZ2dlclRyZWVHcmlkQ2VsbEVkaXRUZW1wbGF0ZVwiO1xyXG5pbXBvcnQgeyBUcmFjZUNvbmZpZ1RyaWdnZXJUcmVlR3JpZENlbGxFZGl0RXZlbnRzIH0gZnJvbSBcIi4vdmlldy90cmFjZUNvbmZpZ1RyaWdnZXJUcmVlR3JpZENlbGxFZGl0RXZlbnRzXCI7XHJcbmltcG9ydCB7IERhdGFwb2ludERpYWxvZywgRm9vdGVyQ29udGVudFR5cGUgfSBmcm9tIFwiLi4vLi4vdmlldy9kYXRhcG9pbnREaWFsb2cvZGF0YXBvaW50RGlhbG9nXCI7XHJcbmltcG9ydCB7IEV2ZW50RGF0YXBvaW50QXJncyB9IGZyb20gXCIuLi8uLi92aWV3L2RhdGFwb2ludERpYWxvZy9ldmVudERhdGFwb2ludEFyZ3NcIjtcclxuaW1wb3J0IHsgVHJhY2VEYXRhUG9pbnRJbmZvIH0gZnJvbSBcIi4uLy4uL21vZGVscy9kaWFnbm9zdGljcy90cmFjZS90cmFjZURhdGFQb2ludEluZm9cIjtcclxuaW1wb3J0IHsgVHJhY2VDb25maWdUcmlnZ2VyRGF0YU1vZGVsIH0gZnJvbSBcIi4vbW9kZWwvdHJhY2VDb25maWdUcmlnZ2VyRGF0YU1vZGVsXCI7XHJcbmltcG9ydCB7IElUcmFjZUNvbmZpZ1RyaWdnZXJEYXRhTW9kZWwgfSBmcm9tIFwiLi9tb2RlbC90cmFjZUNvbmZpZ1RyaWdnZXJEYXRhTW9kZWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVHJpZ2dlckRlc2NyaXB0aW9uUHJvdmlkZXIgfSBmcm9tIFwiLi90cmlnZ2VyRGVzY3JpcHRpb25Qcm92aWRlclwiO1xyXG5pbXBvcnQgeyBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi9kZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgVHJhY2VTdGFydFRyaWdnZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2RpYWdub3N0aWNzL3RyYWNlL3RyYWNlU3RhcnRUcmlnZ2VyXCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyIH0gZnJvbSBcIi4uLy4uL21vZGVscy9vbmxpbmUvbWFwcENvY2twaXRDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50U2V0dGluZ3NcIjtcclxuXHJcbi8qKlxyXG4gKiBpbXBsZW1lbnRzIHRoZSBUcmFjZUNvbmZpZ1RyaWdnZXJXaWRnZXRcclxuICpcclxuICogQGNsYXNzIFRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldFxyXG4gKiBAZXh0ZW5kcyB7VHJlZUdyaWRXaWRnZXRCYXNlfVxyXG4gKi9cclxuY2xhc3MgVHJhY2VDb25maWdUcmlnZ2VyV2lkZ2V0IGV4dGVuZHMgVHJlZUdyaWRXaWRnZXRCYXNle1xyXG5cclxuICAgIHByaXZhdGUgX2FkZERhdGFQb2ludEhhbmRsZXIgPSAoc2VuZGVyLGFyZ3MpPT50aGlzLm9uQWRkRGF0YXBvaW50KHNlbmRlcixhcmdzKTtcclxuICAgIHByaXZhdGUgX2RpYWxvZ0Nsb3NlZEhhbmRsZXIgPSAoc2VuZGVyLGFyZ3MpPT50aGlzLm9uRGlhbG9nQ2xvc2VkKHNlbmRlcixhcmdzKTtcclxuXHJcbiAgICBwcml2YXRlIF9hdmFpbGFibGVUcmFjZURhdGFQb2ludHM6IFRyYWNlRGF0YVBvaW50SW5mb1tdID0gbmV3IEFycmF5PFRyYWNlRGF0YVBvaW50SW5mbz4oKTtcclxuXHJcbiAgICBwcml2YXRlIF90b29sYmFyITogVHJhY2VDb25maWdUcmlnZ2VyVHJlZUdyaWRUb29sYmFyO1xyXG4gICAgcHJpdmF0ZSBfY2VsbEVkaXRUZW1wbGF0ZTtcclxuICAgIHByaXZhdGUgX2FjdHVhbFRyaWdnZXJDb25kaXRpb25EZXNjcmlwdGlvbklkID0gMDtcclxuXHJcbiAgICBzdGF0aWMgc2VsZWN0RGF0YVBvaW50RGlhbG9nVGl0bGUgPSBcIlNlbGVjdCBkYXRhIHBvaW50XCI7XHJcblxyXG4gICAgcHJpdmF0ZSBfZHJvcERvd25MaXN0U2VsZWN0aW9uQ2hhbmdlZEhhbmRsZXIgPSAoc2VuZGVyLGFyZ3MpPT50aGlzLm9uRHJvcERvd25MaXN0U2VsZWN0aW9uQ2hhbmdlZChzZW5kZXIsYXJncyk7XHJcblxyXG4gICAgLyogaW5pdGlhbGl6ZSB0aGUgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxheW91dENvbnRhaW5lcklkXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdUcmlnZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQ6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQsIDMwLCAyOTApO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRpYWxpemVDb21wb25lbnQoKXtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5kZWZhdWx0U2V0dGluZ3NEYXRhSWQgPSBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuV2lkZ2V0RGVmaW5pdGlvbklkO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmRpc2FibGVQZXJzaXN0aW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZWQoKXtcclxuICAgICAgICBzdXBlci5pbml0aWFsaXplZCgpO1xyXG5cclxuICAgICAgICBzdXBlci5zZXRIZWFkZXJDb250ZW50KFwiVHJpZ2dlclwiKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUZvb3RlckNvbnRlbnQoMCk7XHJcblxyXG4gICAgICAgIC8vIFNldCBkeW5hbWljIGNvbHVtbiBzZXR0aW5nc1xyXG4gICAgICAgIHN1cGVyLnNldER5bmFtaWNDb2x1bW4oMSwgODApO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgYW5kIGluaXRpYWxpemVzIHRoZSB0cmFjZSBkYXRhIHBvaW50c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge1RyYWNlRGF0YVBvaW50W119IHRyYWNlRGF0YVBvaW50c1xyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGluaXRpYWxpemVBdmFpbGFibGVEYXRhUG9pbnRzKGF2YWlsYWJsZVRyYWNlRGF0YVBvaW50czpUcmFjZURhdGFQb2ludEluZm9bXSl7XHJcbiAgICAgICAgdGhpcy5fYXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzID0gYXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzO1xyXG4gICAgICAgIERhdGFwb2ludERpYWxvZy5zZXREYXRhcG9pbnRzKHRoaXMuX2F2YWlsYWJsZVRyYWNlRGF0YVBvaW50cyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyBhbmQgaW5pdGlhbGl6ZXMgdGhlIHN0YXJ0IHRyaWdnZXJzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7VHJhY2VTdGFydFRyaWdnZXJbXX0gc3RhcnRUcmlnZ2Vyc1xyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGluaXRpYWxpemVUcmFjZVN0YXJ0VHJpZ2dlckluZm8oc3RhcnRUcmlnZ2VySW5mbzogeyBkYXRhOlRyYWNlU3RhcnRUcmlnZ2VyW10gLCBpbmZvOk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119KXtcclxuICAgICAgICBsZXQgdHJhY2VDb25maWdUcmlnZ2VyRGF0YU1vZGVsID0gbmV3IFRyYWNlQ29uZmlnVHJpZ2dlckRhdGFNb2RlbCgpIGFzIElUcmFjZUNvbmZpZ1RyaWdnZXJEYXRhTW9kZWw7XHJcbiAgICAgICAgdHJhY2VDb25maWdUcmlnZ2VyRGF0YU1vZGVsLmluaXRpYWxpemUoKTtcclxuICAgICAgICB0aGlzLmRhdGFNb2RlbCA9IHRyYWNlQ29uZmlnVHJpZ2dlckRhdGFNb2RlbDtcclxuICAgICAgICB0cmFjZUNvbmZpZ1RyaWdnZXJEYXRhTW9kZWwuaW5pdERhdGEgPSBzdGFydFRyaWdnZXJJbmZvO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBjb21wb25lbnQgc2V0dGluZ3MgZm9yIHRoaXMgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyhDb21wb25lbnRTZXR0aW5nc3x1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBnZXREZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MoKTogQ29tcG9uZW50U2V0dGluZ3N8dW5kZWZpbmVke1xyXG4gICAgICAgIHJldHVybiBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuZ2V0VHJhY2VDb25maWd1cmF0aW9uVHJpZ2dlckRlZmluaXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICBkaXNwb3NlKCl7XHJcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xyXG4gICAgICAgIGlmKHRoaXMuX2NlbGxFZGl0VGVtcGxhdGUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fY2VsbEVkaXRUZW1wbGF0ZS5ldmVudFNlbGVjdGlvbkNoYW5nZWQuZGV0YWNoKHRoaXMuX2Ryb3BEb3duTGlzdFNlbGVjdGlvbkNoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKiB1cGRhdGVzIHRoZSBmb290ZXIgY29udGVudCB3aXRoIHRoZSB0cmlnZ2VyIGRlc2NyaXB0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRyaWdnZXJDb25kaXRpb25JZCAoZS5nLiAyMCBmb3IgSU5fV0lORE9XOyAzMCBmb3IgT1VUX1dJTkRPVzsgLi4uKVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXBkYXRlRm9vdGVyQ29udGVudCh0cmlnZ2VyQ29uZGl0aW9uSWQ6IG51bWJlcil7XHJcbiAgICAgICAgaWYodGhpcy5fYWN0dWFsVHJpZ2dlckNvbmRpdGlvbkRlc2NyaXB0aW9uSWQgIT0gdHJpZ2dlckNvbmRpdGlvbklkKXtcclxuICAgICAgICAgICAgdGhpcy5fYWN0dWFsVHJpZ2dlckNvbmRpdGlvbkRlc2NyaXB0aW9uSWQgPSB0cmlnZ2VyQ29uZGl0aW9uSWQ7XHJcbiAgICAgICAgICAgIGxldCBodG1sRGF0YSA9IFRyaWdnZXJEZXNjcmlwdGlvblByb3ZpZGVyLmdldEh0bWxEZXNjcmlwdGlvbih0cmlnZ2VyQ29uZGl0aW9uSWQpO1xyXG4gICAgICAgICAgICBzdXBlci5zZXRGb290ZXJDb250ZW50KGh0bWxEYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAgICAgXHJcbiAgICAvKipcclxuICAgICAqIGltcGxlbWVudHMgdGhlIG1vZGVsIGNoYW5nZSBoYW5kbGluZ1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SURhdGFNb2RlbH0gc2VuZGVyXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50TW9kZWxDaGFuZ2VkQXJnc30gZGF0YVxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdUcmlnZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGhhbmRsZU1vZGVsQ2hhbmdlZChzZW5kZXI6IElEYXRhTW9kZWwsIGV2ZW50QXJnczogRXZlbnRNb2RlbENoYW5nZWRBcmdzKTogYW55IHtcclxuICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuXHJcbiAgICAgICAgIC8vIFNldCBjb3JyZWN0IGZvb3RlciBjb250ZW50IFxyXG4gICAgICAgICB2YXIgdHJlZUdyaWRPYmogPSB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCk7XHJcbiAgICAgICAgIGxldCBhY3R1YWxTZWxlY3RlZEl0ZW0gPSAoPGFueT50cmVlR3JpZE9iai5tb2RlbCkuc2VsZWN0ZWRJdGVtO1xyXG4gICAgICAgICBpZihhY3R1YWxTZWxlY3RlZEl0ZW0gPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgIC8vIGdldCB0cmlnZ2VyIGNvbmRpdGlvbiBvZiBmaXJzdCB0cmlnZ2VyXHJcbiAgICAgICAgICAgICBsZXQgY29uZGl0aW9uUGFyYW1ldGVyID0gXCJTdGFydFRyaWdnZXIxX0NvbmRpdGlvblwiO1xyXG4gICAgICAgICAgICAgbGV0IHRyaWdnZXJDb25kaXRpb25WYWx1ZSA9IHRoaXMuZ2V0VHJpZ2dlckNvbmRpdGlvblZhbHVlKHRyZWVHcmlkT2JqLm1vZGVsLmRhdGFTb3VyY2UsIGNvbmRpdGlvblBhcmFtZXRlcik7XHJcbiAgICAgICAgICAgICB0aGlzLnVwZGF0ZUZvb3RlckNvbnRlbnQodHJpZ2dlckNvbmRpdGlvblZhbHVlKTtcclxuICAgICAgICAgfVxyXG4gICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUZvb3RlckNvbnRlbnRUb1NlbGVjdGVkSXRlbShhY3R1YWxTZWxlY3RlZEl0ZW0pO1xyXG4gICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHVwZGF0ZUZvb3RlckNvbnRlbnRUb1NlbGVjdGVkSXRlbShzZWxlY3RlZEl0ZW0pe1xyXG4gICAgICAgIGxldCBzdGFydFRyaWdnZXJHcm91cDtcclxuICAgICAgICBpZihzZWxlY3RlZEl0ZW0ubGV2ZWwgPT0gMCl7XHJcbiAgICAgICAgICAgIC8vIFJvb3Rub2RlIHNlbGVjdGVkXHJcbiAgICAgICAgICAgIHN0YXJ0VHJpZ2dlckdyb3VwID0gc2VsZWN0ZWRJdGVtO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAvLyBQYXJhbWV0ZXIgc2VsZWN0ZWRcclxuICAgICAgICAgICAgc3RhcnRUcmlnZ2VyR3JvdXAgPSBzZWxlY3RlZEl0ZW0ucGFyZW50SXRlbTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoc3RhcnRUcmlnZ2VyR3JvdXAgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gVE9ETzogcmVtb3ZlL2NoYW5nZSBfc3RhcnRUcmlnZ2VyUmVmXHJcbiAgICAgICAgICAgIGxldCB0cmlnZ2VyQ29uZGl0aW9uVmFsdWUgPSBzdGFydFRyaWdnZXJHcm91cC5fc3RhcnRUcmlnZ2VyUmVmLmNvbmRpdGlvbjtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVGb290ZXJDb250ZW50KHBhcnNlSW50KHRyaWdnZXJDb25kaXRpb25WYWx1ZSwgMTApKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBoYW5kbGVzIHRoZSBjaGFuZ2VzIG9mIG9ic2VydmVkIGl0ZW1zIHJlcXVlc3RlZCBieSAnb2JzZXJ2ZURhdGFNb2RlbEl0ZW1zJ1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SURhdGFNb2RlbH0gc2VuZGVyXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50TW9kZWxDaGFuZ2VkQXJnc30gZGF0YVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBoYW5kbGVNb2RlbEl0ZW1zQ2hhbmdlZChzZW5kZXI6IElEYXRhTW9kZWwsIGV2ZW50QXJnczogRXZlbnRNb2RlbENoYW5nZWRBcmdzKSB7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGNyZWF0ZXMgdGhlIGRhdGFwb2ludCBzZWxlY3Rpb24gZGlhbG9nXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZURhdGFwb2ludHNEaWFsb2coKXtcclxuICAgICAgICBsZXQgZGF0YXBvaW50RGlhbG9nSWQgPSBcImRhdGFwb2ludERpYWxvZ1RyaWdnZXJcIjtcclxuICAgICAgICAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKS5hcHBlbmQoXCI8ZGl2IGlkPSdcIiArIGRhdGFwb2ludERpYWxvZ0lkICsgXCInPjwvPlwiKTtcclxuXHJcbiAgICAgICAgRGF0YXBvaW50RGlhbG9nLmluaXRpYWxpemUoZGF0YXBvaW50RGlhbG9nSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBjYXRjaGVzIHRoZSBhZGQgZGF0YXBvaW50IGV2ZW50IGZyb20gdGhlIGRhdGFwb2ludCBkaWFsb2dcclxuICAgICAqID0+IHNldHMgdGhlIHNlbGVjdGVkIGRhdGFwb2ludCB0byB0aGUgYWN0dWFsIHNlbGVjdGVkIHRyaWdnZXIgYW5kIGNsb3NlcyB0aGUgZGF0YXBvaW50IGRpYWxvZ1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7fSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7RXZlbnREYXRhcG9pbnRBcmdzfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdUcmlnZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25BZGREYXRhcG9pbnQoc2VuZGVyLCBhcmdzOkV2ZW50RGF0YXBvaW50QXJncyl7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5zZXREYXRhcG9pbnROYW1lVG9TZWxlY3RlZFRyaWdnZXIoYXJncy5kYXRhUG9pbnRJbmZvLmZ1bGxuYW1lKTtcclxuICAgICAgICBEYXRhcG9pbnREaWFsb2cuY2xvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogY2F0Y2hlcyB0aGUgZGlhbG9nIGNsb3NlIGV2ZW50IGZyb20gdGhlIGRhdGFwb2ludCBkaWFsb2dcclxuICAgICAqID0+IGRldGFjaGVzIHRoZSBkaWFsb2cgZXZlbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHt9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHt9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1RyaWdnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbkRpYWxvZ0Nsb3NlZChzZW5kZXIsIGFyZ3Mpe1xyXG4gICAgICAgIERhdGFwb2ludERpYWxvZy5ldmVudEFkZERhdGFwb2ludC5kZXRhY2godGhpcy5fYWRkRGF0YVBvaW50SGFuZGxlcik7XHJcbiAgICAgICAgRGF0YXBvaW50RGlhbG9nLmV2ZW50RGlhbG9nQ2xvc2VkLmRldGFjaCh0aGlzLl9kaWFsb2dDbG9zZWRIYW5kbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogY2F0Y2hlcyB0aGUgZGlhbG9nIGNsb3NlIGV2ZW50IGZyb20gdGhlIGRhdGFwb2ludCBkaWFsb2dcclxuICAgICAqID0+IGRldGFjaGVzIHRoZSBkaWFsb2cgZXZlbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRhdGFQb2ludE5hbWVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1RyaWdnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXREYXRhcG9pbnROYW1lVG9TZWxlY3RlZFRyaWdnZXIoZGF0YVBvaW50TmFtZTogc3RyaW5nKXtcclxuICAgICAgICB2YXIgdHJlZUdyaWRPYmogPSB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCk7XHJcbiAgICAgICAgbGV0IHN0YXJ0VHJpZ2dlckl0ZW07XHJcbiAgICAgICAgbGV0IGFjdHVhbFNlbGVjdGVkSXRlbSA9ICg8YW55PnRyZWVHcmlkT2JqLm1vZGVsKS5zZWxlY3RlZEl0ZW07XHJcbiAgICAgICAgaWYoYWN0dWFsU2VsZWN0ZWRJdGVtICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGlmKGFjdHVhbFNlbGVjdGVkSXRlbS5sZXZlbCA9PSAwKXtcclxuICAgICAgICAgICAgICAgIHN0YXJ0VHJpZ2dlckl0ZW0gPSBhY3R1YWxTZWxlY3RlZEl0ZW07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHN0YXJ0VHJpZ2dlckl0ZW0gPSBhY3R1YWxTZWxlY3RlZEl0ZW0ucGFyZW50SXRlbTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5vIHN0YXJ0IHRyaWdnZXIgc2VsZWN0ZWQhXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU2F2ZSBjZWxsIGJldm9yIHVwZGF0aW5nIHRoZSBkYXRhbW9kZWwgdG8gc2VlIHRoZSByaWdodCBkYXRhIGFmdGVyIHVwZGF0ZVxyXG4gICAgICAgIHRyZWVHcmlkT2JqLnNhdmVDZWxsKCk7IFxyXG4gICAgICAgIGxldCBkYXRhUG9pbnROYW1lUGFyYW1ldGVyID0gc3RhcnRUcmlnZ2VySXRlbS5pdGVtLmNoaWxkcy5maWx0ZXIodHJpZ2dlclBhcmFtZXRlciAgPT4ge3JldHVybiB0cmlnZ2VyUGFyYW1ldGVyLmlkID09IFwiZGF0YXBvaW50XCJ9KVswXTtcclxuICAgICAgICBpZihkYXRhUG9pbnROYW1lUGFyYW1ldGVyICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGRhdGFQb2ludE5hbWVQYXJhbWV0ZXIuZGlzcGxheVZhbHVlID0gZGF0YVBvaW50TmFtZTtcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIHN0YXJ0VHJpZ2dlckl0ZW0uc2V0VmFsdWUoZGF0YVBvaW50TmFtZVBhcmFtZXRlciwgZGF0YVBvaW50TmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBjcmVhdGVzIHRoZSB0cmVlIGdyaWQgZm9yIHRoZSB0cmlnZ2VyIGluZm9ybWF0aW9uc1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1RyaWdnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZVRyZWVHcmlkKCkge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlRGF0YXBvaW50c0RpYWxvZygpO1xyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAoPGFueT4kKHRoaXMuY3NzUGFyZW50Q29udGVudElkKSkuZWpUcmVlR3JpZCh7XHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCksXHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRDb2x1bW5SZXNpemVTdXBwb3J0KCksXHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRUb29sYmFyU3VwcG9ydCgpLFxyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkQ2VsbEVkaXRTdXBwb3J0KCksXHJcblxyXG4gICAgICAgICAgICBjaGlsZE1hcHBpbmc6XCJjaGlsZHNcIixcclxuICAgICAgICAgICAgZXhwYW5kU3RhdGVNYXBwaW5nOiBcImV4cGFuZFN0YXRlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGV4cGFuZGVkOiAoYXJncykgPT4gdGhpcy50cmVlR3JpZE5vZGVFeHBhbmRlZE9yQ29sbGFwc2VkKCksXHJcbiAgICAgICAgICAgIGNvbGxhcHNlZDogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWROb2RlRXhwYW5kZWRPckNvbGxhcHNlZCgpLFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcm93U2VsZWN0ZWQ6IChhcmdzKSA9PiB0aGlzLnRyZWVHcmlkUm93U2VsZWN0ZWQoYXJncyksXHJcbiAgICAgICAgICAgIGNyZWF0ZTogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWRDcmVhdGVkKCksXHJcbiAgICAgICAgICAgIGFjdGlvbkJlZ2luOiAoYXJncykgPT4gdGhpcy50cmVlR3JpZEFjdGlvbkJlZ2luKGFyZ3MpLFxyXG4gICAgICAgICAgICBhY3Rpb25Db21wbGV0ZTogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWRBY3Rpb25Db21wbGV0ZShhcmdzKSwgXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgdHJlZUdyaWROb2RlRXhwYW5kZWRPckNvbGxhcHNlZCgpe1xyXG4gICAgICAgIC8vIFJlZnJlc2ggdG8gc2VlIGNvcnJlY3QgZXhwYW5kZWQvY29sbGFwc2VkIGljb25cclxuICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCBjb2x1bW4gZGVmaW5pdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdUcmlnZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCk6IHt9e1xyXG4gICAgICAgIHRoaXMuX2NlbGxFZGl0VGVtcGxhdGUgPSBUcmFjZUNvbmZpZ1RyaWdnZXJUcmVlR3JpZENlbGxFZGl0VGVtcGxhdGUuY3JlYXRlSW5zdGFuY2UoKTtcclxuICAgICAgICB0aGlzLl9jZWxsRWRpdFRlbXBsYXRlLmV2ZW50U2VsZWN0aW9uQ2hhbmdlZC5hdHRhY2godGhpcy5fZHJvcERvd25MaXN0U2VsZWN0aW9uQ2hhbmdlZEhhbmRsZXIpO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjb2x1bW5zOiBbXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcImRpc3BsYXlOYW1lXCIsIGhlYWRlclRleHQ6IFwiTmFtZVwiLCB3aWR0aDogXCIyMDBcIn0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcImRpc3BsYXlWYWx1ZVwiLCBoZWFkZXJUZXh0OiBcIlZhbHVlXCIsIHdpZHRoOiBcIjIwMFwiLCBlZGl0VHlwZTogXCJzdHJpbmdlZGl0XCIsIGVkaXRUZW1wbGF0ZTogdGhpcy5fY2VsbEVkaXRUZW1wbGF0ZX1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJlZSBncmlkIGNvbHVtbiByZXNpemUgc2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFRyZWVHcmlkQ29sdW1uUmVzaXplU3VwcG9ydCgpOiB7fXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBhbGxvd0NvbHVtblJlc2l6ZTogdHJ1ZSxcclxuICAgICAgICAgICAgY29sdW1uUmVzaXplU2V0dGluZ3M6IHsgY29sdW1uUmVzaXplTW9kZTogZWouVHJlZUdyaWQuQ29sdW1uUmVzaXplTW9kZS5GaXhlZENvbHVtbnMgfSxcclxuICAgICAgICAgICAgY29sdW1uUmVzaXplZDogKGFyZ3MpID0+IHN1cGVyLnJlc2l6ZUR5bmFtaWNDb2x1bW4oYXJncy5jb2x1bW5JbmRleCwgYXJncy5tb2RlbCksXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCB0b29sYmFyIHNldHRpbmdzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1RyaWdnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmVlR3JpZFRvb2xiYXJTdXBwb3J0KCk6IHt9e1xyXG4gICAgICAgIHRoaXMuX3Rvb2xiYXIgPSBuZXcgVHJhY2VDb25maWdUcmlnZ2VyVHJlZUdyaWRUb29sYmFyKHRoaXMuY3NzUGFyZW50Q29udGVudElkKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0b29sYmFyU2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgIHNob3dUb29sYmFyOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tVG9vbGJhckl0ZW1zOiB0aGlzLl90b29sYmFyLmdldEN1c3RvbVRvb2xiYXJzKCksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRvb2xiYXJDbGljazogKGFyZ3MpID0+IHRoaXMuX3Rvb2xiYXIudG9vbGJhckNsaWNrKGFyZ3MsIHRoaXMpLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgY2VsbCBlZGl0IHNldHRpbmdzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1RyaWdnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmVlR3JpZENlbGxFZGl0U3VwcG9ydCgpOiB7fXtcclxuXHRcdGxldCBjZWxsRWRpdEV2ZW50cyA9IG5ldyBUcmFjZUNvbmZpZ1RyaWdnZXJUcmVlR3JpZENlbGxFZGl0RXZlbnRzKCk7XHJcblx0XHRyZXR1cm4ge1xyXG4gICAgICAgICAgICBlZGl0U2V0dGluZ3M6IHsgYWxsb3dFZGl0aW5nOiB0cnVlIH0sXHJcbiAgICAgICAgICAgIGJlZ2luRWRpdDogKGFyZ3MpID0+IGNlbGxFZGl0RXZlbnRzLmJlZ2luRWRpdChhcmdzKSxcclxuICAgICAgICAgICAgZW5kRWRpdDogKGFyZ3MpID0+IGNlbGxFZGl0RXZlbnRzLmVuZEVkaXQoYXJncyksXHJcblx0XHR9O1xyXG5cdH1cclxuXHJcbiAgICBwcml2YXRlIHRyZWVHcmlkQ3JlYXRlZCgpe1xyXG4gICAgICAgIC8vIFNldHMgdGhlIGN1c3RvbSB0b29sYmFyIGljb25zXHJcbiAgICAgICAgdGhpcy5fdG9vbGJhci5zZXRTdHlsZUZvclRvb2xiYXJJY29ucygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdHJlZUdyaWRBY3Rpb25CZWdpbihhcmdzKXtcclxuICAgICAgICAvLyBTdXBwb3J0IFwiRW50Zi9EZWxcIiBrZXlcclxuICAgICAgICBpZihhcmdzLnJlcXVlc3RUeXBlID09IFwiZGVsZXRlXCIpe1xyXG4gICAgICAgICAgICB0aGlzLmRlbGV0ZVN0YXJ0VHJpZ2dlcnMoYXJncy5kZWxldGVkSXRlbXMpO1xyXG4gICAgICAgICAgICBhcmdzLmNhbmNlbCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdHJlZUdyaWRBY3Rpb25Db21wbGV0ZShhcmdzKXtcclxuICAgICAgICAvLyBFdmVudCB0cmlnZ2VyIHdoaWxlIGNoYW5naW5nIGRhdGFzb3VyY2UgZHluYW1pY2FsbHkuIFxyXG4gICAgICAgIC8vIGNvZGUgdG8gZG9uZSBhZnRlciB0aGUgZHluYW1pYyBjaGFuZ2Ugb2YgZGF0YXNvdXJjZS4gXHJcbiAgICAgICAgaWYgKGFyZ3MucmVxdWVzdFR5cGUgPT09ICdyZWZyZXNoRGF0YVNvdXJjZScpIHsgXHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaFNlbGVjdGlvbigpO1x0XHRcdFx0XHRcdFxyXG4gICAgICAgIH0gXHJcbiAgICB9XHJcbiAgIFxyXG4gICAgcHJpdmF0ZSB0cmVlR3JpZFJvd1NlbGVjdGVkKGFyZ3Mpe1xyXG4gICAgICAgIGlmKGFyZ3MubW9kZWwuc2VsZWN0ZWRJdGVtICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRm9vdGVyQ29udGVudFRvU2VsZWN0ZWRJdGVtKGFyZ3MubW9kZWwuc2VsZWN0ZWRJdGVtKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVUb29sYmFyQnV0dG9uU3RhdGVzKGFyZ3MubW9kZWwuZGF0YVNvdXJjZSwgYXJncy5tb2RlbC5zZWxlY3RlZEl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkU3RhcnRUcmlnZ2VyKCl7XHJcbiAgICAgICAgKDxJVHJhY2VDb25maWdUcmlnZ2VyRGF0YU1vZGVsPnRoaXMuZGF0YU1vZGVsKS5hZGRUcmlnZ2VyKCk7XHJcblxyXG4gICAgICAgIHRoaXMucmVmcmVzaFNlbGVjdGlvbigpO1xyXG5cclxuICAgICAgICAvLyBHZXQgYWN0dWFsIHNlbGVjdGlvbiBpdGVtXHJcbiAgICAgICAgY29uc3QgdHJlZU9iaiA9ICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpLmVqVHJlZUdyaWQoJ2luc3RhbmNlJyk7IFxyXG4gICAgICAgIGxldCBzZWxlY3RlZEl0ZW0gPSB0cmVlT2JqLm1vZGVsLnNlbGVjdGVkSXRlbTtcclxuICAgICAgICBpZiggdHJlZU9iai5tb2RlbC5zZWxlY3RlZFJvd0luZGV4ID09IC0xKXtcclxuICAgICAgICAgICAgc2VsZWN0ZWRJdGVtID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnVwZGF0ZVRvb2xiYXJCdXR0b25TdGF0ZXModHJlZU9iai5tb2RlbC5kYXRhU291cmNlLCBzZWxlY3RlZEl0ZW0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZWxldGVTdGFydFRyaWdnZXJzKGRlbGV0ZUl0ZW1zKXtcclxuICAgICAgICBsZXQgaW5kZXhMaXN0ID0gbmV3IEFycmF5PG51bWJlcj4oKTtcclxuICAgICAgICBmb3IobGV0IGk9ZGVsZXRlSXRlbXMubGVuZ3RoLTE7IGkgPj0gMDsgaS0tKXtcclxuICAgICAgICAgICAgaWYoZGVsZXRlSXRlbXNbaV0ubGV2ZWwgPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAvLyBPbmx5IGxldmVsIDAgY2FuIGJlIGRlbGV0ZWQgKHN0YXJ0IHRyaWdnZXIgZ3JvdXAsIG5vdCBzaW5nbGUgcGFyYW1ldGVycyBvZiB0aGlzIGdyb3VwKVxyXG4gICAgICAgICAgICAgICAgaW5kZXhMaXN0LnB1c2goZGVsZXRlSXRlbXNbaV0uaGllcmFyY2h5Um93SW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGluZGV4TGlzdC5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgKDxJVHJhY2VDb25maWdUcmlnZ2VyRGF0YU1vZGVsPnRoaXMuZGF0YU1vZGVsKS5yZW1vdmVUcmlnZ2VycyhpbmRleExpc3QpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoU2VsZWN0aW9uKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBHZXQgYWN0dWFsIHNlbGVjdGlvbiBpdGVtXHJcbiAgICAgICAgICAgIGNvbnN0IHRyZWVPYmogPSAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKS5lalRyZWVHcmlkKCdpbnN0YW5jZScpOyBcclxuICAgICAgICAgICAgbGV0IHNlbGVjdGVkSXRlbSA9IHRyZWVPYmoubW9kZWwuc2VsZWN0ZWRJdGVtO1xyXG4gICAgICAgICAgICBpZiggdHJlZU9iai5tb2RlbC5zZWxlY3RlZFJvd0luZGV4ID09IC0xKXtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkSXRlbSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVRvb2xiYXJCdXR0b25TdGF0ZXModHJlZU9iai5tb2RlbC5kYXRhU291cmNlLCBzZWxlY3RlZEl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIG9wZW5zIHRoZSBkYXRhcG9pbnQgc2VsZWN0aW9uIGRpYWxvZyBhbmQgYXR0YWNoZXMgdG8gdGhlIGRpYWxvZyBldmVudHNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdUcmlnZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvcGVuRGF0YXBvaW50RGlhbG9nKCl7XHJcbiAgICAgICAgRGF0YXBvaW50RGlhbG9nLmV2ZW50QWRkRGF0YXBvaW50LmF0dGFjaCh0aGlzLl9hZGREYXRhUG9pbnRIYW5kbGVyKTtcclxuICAgICAgICBEYXRhcG9pbnREaWFsb2cuZXZlbnREaWFsb2dDbG9zZWQuYXR0YWNoKHRoaXMuX2RpYWxvZ0Nsb3NlZEhhbmRsZXIpO1xyXG4gICAgICAgIERhdGFwb2ludERpYWxvZy5vcGVuKFRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldC5zZWxlY3REYXRhUG9pbnREaWFsb2dUaXRsZSwgRm9vdGVyQ29udGVudFR5cGUuYXBwbHlDbG9zZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWZyZXNoU2VsZWN0aW9uKCl7XHJcblx0XHRjb25zdCB0cmVlT2JqID0gJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCkuZWpUcmVlR3JpZCgnaW5zdGFuY2UnKTsgXHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0Ly8gR2V0IGFjdHVhbCBzZWxlY3Rpb24gaW5kZXhcclxuICAgICAgICBsZXQgYWN0dWFsU2VsZWN0ZWRSb3dJbmRleCA9IHRyZWVPYmoubW9kZWwuc2VsZWN0ZWRSb3dJbmRleDtcclxuICAgICAgICBpZiAoYWN0dWFsU2VsZWN0ZWRSb3dJbmRleCA9PSAtMSl7XHJcbiAgICAgICAgICAgIC8vIHVwZGF0ZSB0b29sYmFyIGJ1dHRvbnMgaW4gY2FzZSBvZiBubyBzZWxlY3RlZCBpdGVtXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVG9vbGJhckJ1dHRvblN0YXRlcyh0cmVlT2JqLm1vZGVsLmRhdGFTb3VyY2UsIHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG5cdFx0Ly8gUmVzZXQgc2VsZWN0aW9uXHJcblx0XHR0cmVlT2JqLm1vZGVsLnNlbGVjdGVkUm93SW5kZXggPSAtMTtcclxuXHRcdFxyXG5cdFx0Ly8gU2V0IHRvIGxhc3QgaW5kZXggaWYgaW5kZXggaXMgb3V0IG9mIHJhbmdlXHJcblx0XHRpZihhY3R1YWxTZWxlY3RlZFJvd0luZGV4ID49IHRyZWVPYmoubW9kZWwuZmxhdFJlY29yZHMubGVuZ3RoKXtcclxuXHRcdFx0YWN0dWFsU2VsZWN0ZWRSb3dJbmRleCA9IHRyZWVPYmoubW9kZWwuZmxhdFJlY29yZHMubGVuZ3RoLTE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG5cdFx0Ly8gU2V0IHNlbGVjdGlvblxyXG5cdFx0dHJlZU9iai5tb2RlbC5zZWxlY3RlZFJvd0luZGV4ID0gYWN0dWFsU2VsZWN0ZWRSb3dJbmRleDtcclxuXHRcdFxyXG5cdFx0Ly8gdXBkYXRlIHRvb2xiYXIgYnV0dG9ucyB3aXRoIHNlbGVjdGVkIGl0ZW1cclxuXHRcdGlmKHRyZWVPYmoubW9kZWwuZmxhdFJlY29yZHNbYWN0dWFsU2VsZWN0ZWRSb3dJbmRleF0gIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0dGhpcy51cGRhdGVUb29sYmFyQnV0dG9uU3RhdGVzKHRyZWVPYmoubW9kZWwuZGF0YVNvdXJjZSwgdHJlZU9iai5tb2RlbC5mbGF0UmVjb3Jkc1thY3R1YWxTZWxlY3RlZFJvd0luZGV4XS5pdGVtKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmlnZ2VyIGNvbmRpdGlvbihlLmcuIDIwIGZvciBJTl9XSU5ET1c7IDMwIGZvciBPVVRfV0lORE9XOyAuLi4pIGZvciB0aGUgZ2l2ZW4gY29uZGl0aW9uIHBhcmFtZXRlciBpZCAoZS5nLiBTdGFydFRyaWdnZXIxX0NvbmRpdGlvbilcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge30gZGF0YVNvdXJjZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbmRpdGlvblBhcmFtZXRlclxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1RyaWdnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmlnZ2VyQ29uZGl0aW9uVmFsdWUoZGF0YVNvdXJjZSwgY29uZGl0aW9uUGFyYW1ldGVyOiBzdHJpbmcpOiBudW1iZXJ7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGkgPCBkYXRhU291cmNlLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0ICBzdGFydFRyaWdnZXIgPSBkYXRhU291cmNlW2ldO1xyXG4gICAgICAgICAgICBmb3IobGV0IGo9MDsgaiA8IHN0YXJ0VHJpZ2dlci5jaGlsZHMubGVuZ3RoOyBqKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IHBhcmFtZXRlciA9IHN0YXJ0VHJpZ2dlci5jaGlsZHNbal07XHJcbiAgICAgICAgICAgICAgICBpZihwYXJhbWV0ZXIuY29tcG9uZW50UGFyYW1ldGVyLmJyb3dzZU5hbWUgPT0gY29uZGl0aW9uUGFyYW1ldGVyKXtcclxuICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUludChwYXJhbWV0ZXIuY29tcG9uZW50UGFyYW1ldGVyLnZhbHVlLCAxMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWZyZXNoZXMgdHJpZ2dlciBwYXJhbWV0ZXJzIHRyZWUgZ3JpZCB3aXRoIHRoZSBjdXJyZW50IG1vZGVsIGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlZnJlc2goKSB7XHJcbiAgICAgICAgdGhpcy5zZXRNb2RlbCh0aGlzLmRhdGFNb2RlbC5kYXRhKTtcclxuICAgIH1cclxuICAgXHJcbiAgICBwcml2YXRlIG9uRHJvcERvd25MaXN0U2VsZWN0aW9uQ2hhbmdlZChzZW5kZXIsYXJncyl7XHJcbiAgICAgICAgdGhpcy51cGRhdGVGb290ZXJDb250ZW50KGFyZ3MudmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlVG9vbGJhckJ1dHRvblN0YXRlcyhzdGFydFRyaWdnZXJzOiBBcnJheTxhbnk+LCBzZWxlY3RlZEl0ZW0pe1xyXG4gICAgICAgIC8vIFNldCBzZWxlY3QgdHJpZ2dlciBkYXRhcG9pbnQgYnV0dG9uIHN0YXRlXHJcbiAgICAgICAgaWYoc2VsZWN0ZWRJdGVtID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2xiYXIuZGlzYWJsZVNlbGVjdFRyaWdnZXJEYXRhUG9pbnRCdXR0b24odHJ1ZSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2xiYXIuZGlzYWJsZVNlbGVjdFRyaWdnZXJEYXRhUG9pbnRCdXR0b24oZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBTZXQgYWRkIHRyaWdnZXIgYnV0dG9uIHN0YXRlXHJcbiAgICAgICAgaWYoc3RhcnRUcmlnZ2Vycy5sZW5ndGggPiAxKXtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbGJhci5kaXNhYmxlQWRkQnV0dG9uKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLl90b29sYmFyLmRpc2FibGVBZGRCdXR0b24oZmFsc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU2V0IHJlbW92ZSB0cmlnZ2VyIGJ1dHRvbiBzdGF0ZVxyXG4gICAgICAgIGlmKHN0YXJ0VHJpZ2dlcnMubGVuZ3RoID09IDAgfHwgc2VsZWN0ZWRJdGVtID09IHVuZGVmaW5lZCB8fCBzZWxlY3RlZEl0ZW0ubGV2ZWwgPiAwKXtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbGJhci5kaXNhYmxlUmVtb3ZlQnV0dG9uKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLl90b29sYmFyLmRpc2FibGVSZW1vdmVCdXR0b24oZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgVHJhY2VDb25maWdUcmlnZ2VyV2lkZ2V0IH07Il19