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
define(["require", "exports", "../common/treeGridWidgetBase", "./view/traceConfigTriggerTreeGridToolbar", "./view/traceConfigTriggerTreeGridCellEditTemplate", "./view/traceConfigTriggerTreeGridCellEditEvents", "../../view/datapointDialog/datapointDialog", "./model/traceConfigTriggerDataModel", "./triggerDescriptionProvider"], function (require, exports, treeGridWidgetBase_1, traceConfigTriggerTreeGridToolbar_1, traceConfigTriggerTreeGridCellEditTemplate_1, traceConfigTriggerTreeGridCellEditEvents_1, datapointDialog_1, traceConfigTriggerDataModel_1, triggerDescriptionProvider_1) {
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
            _super.prototype.setHeaderContent.call(this, "Trigger");
            this.updateFooterContent(0);
            // Set dynamic column settings
            _super.prototype.setDynamicColumn.call(this, 1, 80);
        };
        TraceConfigTriggerWidget.prototype.dispose = function () {
            if (this._cellEditTemplate != undefined) {
                this._cellEditTemplate.eventSelectionChanged.detach(this._dropDownListSelectionChangedHandler);
            }
        };
        Object.defineProperty(TraceConfigTriggerWidget.prototype, "startTriggers", {
            set: function (data) {
                var traceConfigTriggerDataModel = new traceConfigTriggerDataModel_1.TraceConfigTriggerDataModel();
                traceConfigTriggerDataModel.initialize();
                this.dataModel = traceConfigTriggerDataModel;
                traceConfigTriggerDataModel.initData = data;
            },
            enumerable: true,
            configurable: true
        });
        /** updates the footer content with the trigger description
         *
         * @param {number} triggerConditionId (e.g. 20 for IN_WINDOW; 30 for OUT_WINDOW; ...)
         * @memberof TraceConfigTimingWidget
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
        Object.defineProperty(TraceConfigTriggerWidget.prototype, "availableDataPoints", {
            /**
             * Sets the available trace datapoints to the trigger widget
             *
             * @memberof TraceConfigTriggerWidget
             */
            set: function (availableTraceDataPoints) {
                var _this = this;
                availableTraceDataPoints.changed(function (traceParameterInterface) {
                    _this._availableTraceDataPoints = traceParameterInterface;
                    datapointDialog_1.DatapointDialog.setDatapoints(_this._availableTraceDataPoints);
                });
            },
            enumerable: true,
            configurable: true
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VDb25maWdUcmlnZ2VyV2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RyYWNlQ29uZmlnVHJpZ2dlcldpZGdldC90cmFjZUNvbmZpZ1RyaWdnZXJXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBY0E7Ozs7O09BS0c7SUFDSDtRQUF1Qyw0Q0FBa0I7UUFBekQ7WUFBQSxxRUFrY0M7WUFoY1csMEJBQW9CLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFHLE9BQUEsS0FBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLEVBQWhDLENBQWdDLENBQUM7WUFDdkUsMEJBQW9CLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFHLE9BQUEsS0FBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLEVBQWhDLENBQWdDLENBQUM7WUFFdkUsK0JBQXlCLEdBQXlCLElBQUksS0FBSyxFQUFzQixDQUFDO1lBSWxGLDBDQUFvQyxHQUFHLENBQUMsQ0FBQztZQUl6QywwQ0FBb0MsR0FBRyxVQUFDLE1BQU0sRUFBQyxJQUFJLElBQUcsT0FBQSxLQUFJLENBQUMsOEJBQThCLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxFQUFoRCxDQUFnRCxDQUFDOztRQXFibkgsQ0FBQztRQW5iRzs7OztXQUlHO1FBQ0gsNkNBQVUsR0FBVixVQUFXLGlCQUF5QjtZQUNoQyxpQkFBTSxVQUFVLFlBQUMsaUJBQWlCLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQzdDLGlCQUFNLGdCQUFnQixZQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUU1Qiw4QkFBOEI7WUFDOUIsaUJBQU0sZ0JBQWdCLFlBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FB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QWtDLGFBQXlCLEVBQUUsWUFBWTtZQUNyRSw0Q0FBNEM7WUFDNUMsSUFBRyxZQUFZLElBQUksU0FBUyxFQUFDO2dCQUN6QixJQUFJLENBQUMsUUFBUSxDQUFDLG1DQUFtQyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzNEO2lCQUFJO2dCQUNELElBQUksQ0FBQyxRQUFRLENBQUMsbUNBQW1DLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDNUQ7WUFFRCwrQkFBK0I7WUFDL0IsSUFBRyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQztnQkFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN4QztpQkFDRztnQkFDQSxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3pDO1lBRUQsa0NBQWtDO1lBQ2xDLElBQUcsYUFBYSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksWUFBWSxJQUFJLFNBQVMsSUFBSSxZQUFZLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBQztnQkFDaEYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUMzQztpQkFDRztnQkFDQSxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzVDO1FBQ0wsQ0FBQztRQXRiTSxtREFBMEIsR0FBRyxtQkFBbUIsQ0FBQztRQXViNUQsK0JBQUM7S0FBQSxBQWxjRCxDQUF1Qyx1Q0FBa0IsR0FrY3hEO0lBRVEsNERBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldCB9IGZyb20gXCIuL2ludGVyZmFjZXMvdHJhY2VDb25maWdUcmlnZ2VyV2lkZ2V0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFRyZWVHcmlkV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vdHJlZUdyaWRXaWRnZXRCYXNlXCI7XHJcbmltcG9ydCB7IElEYXRhTW9kZWwsIEV2ZW50TW9kZWxDaGFuZ2VkQXJnc30gZnJvbSBcIi4uLy4uL21vZGVscy9kYXRhTW9kZWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVHJhY2VDb25maWdUcmlnZ2VyVHJlZUdyaWRUb29sYmFyIH0gZnJvbSBcIi4vdmlldy90cmFjZUNvbmZpZ1RyaWdnZXJUcmVlR3JpZFRvb2xiYXJcIjtcclxuaW1wb3J0IHsgVHJhY2VDb25maWdUcmlnZ2VyVHJlZUdyaWRDZWxsRWRpdFRlbXBsYXRlIH0gZnJvbSBcIi4vdmlldy90cmFjZUNvbmZpZ1RyaWdnZXJUcmVlR3JpZENlbGxFZGl0VGVtcGxhdGVcIjtcclxuaW1wb3J0IHsgVHJhY2VDb25maWdUcmlnZ2VyVHJlZUdyaWRDZWxsRWRpdEV2ZW50cyB9IGZyb20gXCIuL3ZpZXcvdHJhY2VDb25maWdUcmlnZ2VyVHJlZUdyaWRDZWxsRWRpdEV2ZW50c1wiO1xyXG5pbXBvcnQgeyBEYXRhcG9pbnREaWFsb2csIEZvb3RlckNvbnRlbnRUeXBlIH0gZnJvbSBcIi4uLy4uL3ZpZXcvZGF0YXBvaW50RGlhbG9nL2RhdGFwb2ludERpYWxvZ1wiO1xyXG5pbXBvcnQgeyBFdmVudERhdGFwb2ludEFyZ3MgfSBmcm9tIFwiLi4vLi4vdmlldy9kYXRhcG9pbnREaWFsb2cvZXZlbnREYXRhcG9pbnRBcmdzXCI7XHJcbmltcG9ydCB7IFByb3BlcnR5IH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9wcm9wZXJ0eVwiO1xyXG5pbXBvcnQgeyBUcmFjZURhdGFQb2ludEluZm8gfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2RpYWdub3N0aWNzL3RyYWNlL3RyYWNlRGF0YVBvaW50SW5mb1wiO1xyXG5pbXBvcnQgeyBUcmFjZUNvbmZpZ1RyaWdnZXJEYXRhTW9kZWwgfSBmcm9tIFwiLi9tb2RlbC90cmFjZUNvbmZpZ1RyaWdnZXJEYXRhTW9kZWxcIjtcclxuaW1wb3J0IHsgSVRyYWNlQ29uZmlnVHJpZ2dlckRhdGFNb2RlbCB9IGZyb20gXCIuL21vZGVsL3RyYWNlQ29uZmlnVHJpZ2dlckRhdGFNb2RlbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUcmlnZ2VyRGVzY3JpcHRpb25Qcm92aWRlciB9IGZyb20gXCIuL3RyaWdnZXJEZXNjcmlwdGlvblByb3ZpZGVyXCI7XHJcblxyXG4vKipcclxuICogaW1wbGVtZW50cyB0aGUgVHJhY2VDb25maWdUcmlnZ2VyV2lkZ2V0XHJcbiAqXHJcbiAqIEBjbGFzcyBUcmFjZUNvbmZpZ1RyaWdnZXJXaWRnZXRcclxuICogQGV4dGVuZHMge1RyZWVHcmlkV2lkZ2V0QmFzZX1cclxuICovXHJcbmNsYXNzIFRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldCBleHRlbmRzIFRyZWVHcmlkV2lkZ2V0QmFzZSBpbXBsZW1lbnRzIElUcmFjZUNvbmZpZ1RyaWdnZXJXaWRnZXQge1xyXG5cclxuICAgIHByaXZhdGUgX2FkZERhdGFQb2ludEhhbmRsZXIgPSAoc2VuZGVyLGFyZ3MpPT50aGlzLm9uQWRkRGF0YXBvaW50KHNlbmRlcixhcmdzKTtcclxuICAgIHByaXZhdGUgX2RpYWxvZ0Nsb3NlZEhhbmRsZXIgPSAoc2VuZGVyLGFyZ3MpPT50aGlzLm9uRGlhbG9nQ2xvc2VkKHNlbmRlcixhcmdzKTtcclxuXHJcbiAgICBwcml2YXRlIF9hdmFpbGFibGVUcmFjZURhdGFQb2ludHM6IFRyYWNlRGF0YVBvaW50SW5mb1tdID0gbmV3IEFycmF5PFRyYWNlRGF0YVBvaW50SW5mbz4oKTtcclxuXHJcbiAgICBwcml2YXRlIF90b29sYmFyITogVHJhY2VDb25maWdUcmlnZ2VyVHJlZUdyaWRUb29sYmFyO1xyXG4gICAgcHJpdmF0ZSBfY2VsbEVkaXRUZW1wbGF0ZTtcclxuICAgIHByaXZhdGUgX2FjdHVhbFRyaWdnZXJDb25kaXRpb25EZXNjcmlwdGlvbklkID0gMDtcclxuXHJcbiAgICBzdGF0aWMgc2VsZWN0RGF0YVBvaW50RGlhbG9nVGl0bGUgPSBcIlNlbGVjdCBkYXRhIHBvaW50XCI7XHJcblxyXG4gICAgcHJpdmF0ZSBfZHJvcERvd25MaXN0U2VsZWN0aW9uQ2hhbmdlZEhhbmRsZXIgPSAoc2VuZGVyLGFyZ3MpPT50aGlzLm9uRHJvcERvd25MaXN0U2VsZWN0aW9uQ2hhbmdlZChzZW5kZXIsYXJncyk7XHJcblxyXG4gICAgLyogaW5pdGlhbGl6ZSB0aGUgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxheW91dENvbnRhaW5lcklkXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdUcmlnZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQ6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQsIDMwLCAyOTApO1xyXG4gICAgICAgIHN1cGVyLnNldEhlYWRlckNvbnRlbnQoXCJUcmlnZ2VyXCIpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlRm9vdGVyQ29udGVudCgwKTtcclxuXHJcbiAgICAgICAgLy8gU2V0IGR5bmFtaWMgY29sdW1uIHNldHRpbmdzXHJcbiAgICAgICAgc3VwZXIuc2V0RHluYW1pY0NvbHVtbigxLCA4MCk7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzcG9zZSgpe1xyXG4gICAgICAgIGlmKHRoaXMuX2NlbGxFZGl0VGVtcGxhdGUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fY2VsbEVkaXRUZW1wbGF0ZS5ldmVudFNlbGVjdGlvbkNoYW5nZWQuZGV0YWNoKHRoaXMuX2Ryb3BEb3duTGlzdFNlbGVjdGlvbkNoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHNldCBzdGFydFRyaWdnZXJzKGRhdGE6IGFueSl7XHJcbiAgICAgICAgbGV0IHRyYWNlQ29uZmlnVHJpZ2dlckRhdGFNb2RlbCA9IG5ldyBUcmFjZUNvbmZpZ1RyaWdnZXJEYXRhTW9kZWwoKSBhcyBJVHJhY2VDb25maWdUcmlnZ2VyRGF0YU1vZGVsO1xyXG4gICAgICAgIHRyYWNlQ29uZmlnVHJpZ2dlckRhdGFNb2RlbC5pbml0aWFsaXplKCk7XHJcbiAgICAgICAgdGhpcy5kYXRhTW9kZWwgPSB0cmFjZUNvbmZpZ1RyaWdnZXJEYXRhTW9kZWw7XHJcbiAgICAgICAgdHJhY2VDb25maWdUcmlnZ2VyRGF0YU1vZGVsLmluaXREYXRhID0gZGF0YTtcclxuICAgIH1cclxuICBcclxuICAgIC8qKiB1cGRhdGVzIHRoZSBmb290ZXIgY29udGVudCB3aXRoIHRoZSB0cmlnZ2VyIGRlc2NyaXB0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRyaWdnZXJDb25kaXRpb25JZCAoZS5nLiAyMCBmb3IgSU5fV0lORE9XOyAzMCBmb3IgT1VUX1dJTkRPVzsgLi4uKVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVGltaW5nV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB1cGRhdGVGb290ZXJDb250ZW50KHRyaWdnZXJDb25kaXRpb25JZDogbnVtYmVyKXtcclxuICAgICAgICBpZih0aGlzLl9hY3R1YWxUcmlnZ2VyQ29uZGl0aW9uRGVzY3JpcHRpb25JZCAhPSB0cmlnZ2VyQ29uZGl0aW9uSWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9hY3R1YWxUcmlnZ2VyQ29uZGl0aW9uRGVzY3JpcHRpb25JZCA9IHRyaWdnZXJDb25kaXRpb25JZDtcclxuICAgICAgICAgICAgbGV0IGh0bWxEYXRhID0gVHJpZ2dlckRlc2NyaXB0aW9uUHJvdmlkZXIuZ2V0SHRtbERlc2NyaXB0aW9uKHRyaWdnZXJDb25kaXRpb25JZCk7XHJcbiAgICAgICAgICAgIHN1cGVyLnNldEZvb3RlckNvbnRlbnQoaHRtbERhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgICAgICBcclxuICAgIC8qKlxyXG4gICAgICogaW1wbGVtZW50cyB0aGUgbW9kZWwgY2hhbmdlIGhhbmRsaW5nXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJRGF0YU1vZGVsfSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7RXZlbnRNb2RlbENoYW5nZWRBcmdzfSBkYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1RyaWdnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgaGFuZGxlTW9kZWxDaGFuZ2VkKHNlbmRlcjogSURhdGFNb2RlbCwgZXZlbnRBcmdzOiBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MpOiBhbnkge1xyXG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG5cclxuICAgICAgICAgLy8gU2V0IGNvcnJlY3QgZm9vdGVyIGNvbnRlbnQgXHJcbiAgICAgICAgIHZhciB0cmVlR3JpZE9iaiA9IHRoaXMuZ2V0VHJlZUdyaWRPYmplY3QoKTtcclxuICAgICAgICAgbGV0IGFjdHVhbFNlbGVjdGVkSXRlbSA9ICg8YW55PnRyZWVHcmlkT2JqLm1vZGVsKS5zZWxlY3RlZEl0ZW07XHJcbiAgICAgICAgIGlmKGFjdHVhbFNlbGVjdGVkSXRlbSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgLy8gZ2V0IHRyaWdnZXIgY29uZGl0aW9uIG9mIGZpcnN0IHRyaWdnZXJcclxuICAgICAgICAgICAgIGxldCBjb25kaXRpb25QYXJhbWV0ZXIgPSBcIlN0YXJ0VHJpZ2dlcjFfQ29uZGl0aW9uXCI7XHJcbiAgICAgICAgICAgICBsZXQgdHJpZ2dlckNvbmRpdGlvblZhbHVlID0gdGhpcy5nZXRUcmlnZ2VyQ29uZGl0aW9uVmFsdWUodHJlZUdyaWRPYmoubW9kZWwuZGF0YVNvdXJjZSwgY29uZGl0aW9uUGFyYW1ldGVyKTtcclxuICAgICAgICAgICAgIHRoaXMudXBkYXRlRm9vdGVyQ29udGVudCh0cmlnZ2VyQ29uZGl0aW9uVmFsdWUpO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRm9vdGVyQ29udGVudFRvU2VsZWN0ZWRJdGVtKGFjdHVhbFNlbGVjdGVkSXRlbSk7XHJcbiAgICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgdXBkYXRlRm9vdGVyQ29udGVudFRvU2VsZWN0ZWRJdGVtKHNlbGVjdGVkSXRlbSl7XHJcbiAgICAgICAgbGV0IHN0YXJ0VHJpZ2dlckdyb3VwO1xyXG4gICAgICAgIGlmKHNlbGVjdGVkSXRlbS5sZXZlbCA9PSAwKXtcclxuICAgICAgICAgICAgLy8gUm9vdG5vZGUgc2VsZWN0ZWRcclxuICAgICAgICAgICAgc3RhcnRUcmlnZ2VyR3JvdXAgPSBzZWxlY3RlZEl0ZW07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIC8vIFBhcmFtZXRlciBzZWxlY3RlZFxyXG4gICAgICAgICAgICBzdGFydFRyaWdnZXJHcm91cCA9IHNlbGVjdGVkSXRlbS5wYXJlbnRJdGVtO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzdGFydFRyaWdnZXJHcm91cCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAvLyBUT0RPOiByZW1vdmUvY2hhbmdlIF9zdGFydFRyaWdnZXJSZWZcclxuICAgICAgICAgICAgbGV0IHRyaWdnZXJDb25kaXRpb25WYWx1ZSA9IHN0YXJ0VHJpZ2dlckdyb3VwLl9zdGFydFRyaWdnZXJSZWYuY29uZGl0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUZvb3RlckNvbnRlbnQocGFyc2VJbnQodHJpZ2dlckNvbmRpdGlvblZhbHVlLCAxMCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGhhbmRsZXMgdGhlIGNoYW5nZXMgb2Ygb2JzZXJ2ZWQgaXRlbXMgcmVxdWVzdGVkIGJ5ICdvYnNlcnZlRGF0YU1vZGVsSXRlbXMnXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJRGF0YU1vZGVsfSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7RXZlbnRNb2RlbENoYW5nZWRBcmdzfSBkYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdUcmlnZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGhhbmRsZU1vZGVsSXRlbXNDaGFuZ2VkKHNlbmRlcjogSURhdGFNb2RlbCwgZXZlbnRBcmdzOiBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MpIHtcclxuICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogY3JlYXRlcyB0aGUgZGF0YXBvaW50IHNlbGVjdGlvbiBkaWFsb2dcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdUcmlnZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlRGF0YXBvaW50c0RpYWxvZygpe1xyXG4gICAgICAgIGxldCBkYXRhcG9pbnREaWFsb2dJZCA9IFwiZGF0YXBvaW50RGlhbG9nVHJpZ2dlclwiO1xyXG4gICAgICAgICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpLmFwcGVuZChcIjxkaXYgaWQ9J1wiICsgZGF0YXBvaW50RGlhbG9nSWQgKyBcIic+PC8+XCIpO1xyXG5cclxuICAgICAgICBEYXRhcG9pbnREaWFsb2cuaW5pdGlhbGl6ZShkYXRhcG9pbnREaWFsb2dJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGNhdGNoZXMgdGhlIGFkZCBkYXRhcG9pbnQgZXZlbnQgZnJvbSB0aGUgZGF0YXBvaW50IGRpYWxvZ1xyXG4gICAgICogPT4gc2V0cyB0aGUgc2VsZWN0ZWQgZGF0YXBvaW50IHRvIHRoZSBhY3R1YWwgc2VsZWN0ZWQgdHJpZ2dlciBhbmQgY2xvc2VzIHRoZSBkYXRhcG9pbnQgZGlhbG9nXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHt9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHtFdmVudERhdGFwb2ludEFyZ3N9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1RyaWdnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbkFkZERhdGFwb2ludChzZW5kZXIsIGFyZ3M6RXZlbnREYXRhcG9pbnRBcmdzKXtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnNldERhdGFwb2ludE5hbWVUb1NlbGVjdGVkVHJpZ2dlcihhcmdzLmRhdGFQb2ludEluZm8uZnVsbG5hbWUpO1xyXG4gICAgICAgIERhdGFwb2ludERpYWxvZy5jbG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBjYXRjaGVzIHRoZSBkaWFsb2cgY2xvc2UgZXZlbnQgZnJvbSB0aGUgZGF0YXBvaW50IGRpYWxvZ1xyXG4gICAgICogPT4gZGV0YWNoZXMgdGhlIGRpYWxvZyBldmVudHNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge30gc2VuZGVyXHJcbiAgICAgKiBAcGFyYW0ge30gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uRGlhbG9nQ2xvc2VkKHNlbmRlciwgYXJncyl7XHJcbiAgICAgICAgRGF0YXBvaW50RGlhbG9nLmV2ZW50QWRkRGF0YXBvaW50LmRldGFjaCh0aGlzLl9hZGREYXRhUG9pbnRIYW5kbGVyKTtcclxuICAgICAgICBEYXRhcG9pbnREaWFsb2cuZXZlbnREaWFsb2dDbG9zZWQuZGV0YWNoKHRoaXMuX2RpYWxvZ0Nsb3NlZEhhbmRsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBjYXRjaGVzIHRoZSBkaWFsb2cgY2xvc2UgZXZlbnQgZnJvbSB0aGUgZGF0YXBvaW50IGRpYWxvZ1xyXG4gICAgICogPT4gZGV0YWNoZXMgdGhlIGRpYWxvZyBldmVudHNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGF0YVBvaW50TmFtZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldERhdGFwb2ludE5hbWVUb1NlbGVjdGVkVHJpZ2dlcihkYXRhUG9pbnROYW1lOiBzdHJpbmcpe1xyXG4gICAgICAgIHZhciB0cmVlR3JpZE9iaiA9IHRoaXMuZ2V0VHJlZUdyaWRPYmplY3QoKTtcclxuICAgICAgICBsZXQgc3RhcnRUcmlnZ2VySXRlbTtcclxuICAgICAgICBsZXQgYWN0dWFsU2VsZWN0ZWRJdGVtID0gKDxhbnk+dHJlZUdyaWRPYmoubW9kZWwpLnNlbGVjdGVkSXRlbTtcclxuICAgICAgICBpZihhY3R1YWxTZWxlY3RlZEl0ZW0gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgaWYoYWN0dWFsU2VsZWN0ZWRJdGVtLmxldmVsID09IDApe1xyXG4gICAgICAgICAgICAgICAgc3RhcnRUcmlnZ2VySXRlbSA9IGFjdHVhbFNlbGVjdGVkSXRlbTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgc3RhcnRUcmlnZ2VySXRlbSA9IGFjdHVhbFNlbGVjdGVkSXRlbS5wYXJlbnRJdGVtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm8gc3RhcnQgdHJpZ2dlciBzZWxlY3RlZCFcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTYXZlIGNlbGwgYmV2b3IgdXBkYXRpbmcgdGhlIGRhdGFtb2RlbCB0byBzZWUgdGhlIHJpZ2h0IGRhdGEgYWZ0ZXIgdXBkYXRlXHJcbiAgICAgICAgdHJlZUdyaWRPYmouc2F2ZUNlbGwoKTsgXHJcbiAgICAgICAgbGV0IGRhdGFQb2ludE5hbWVQYXJhbWV0ZXIgPSBzdGFydFRyaWdnZXJJdGVtLml0ZW0uY2hpbGRzLmZpbHRlcih0cmlnZ2VyUGFyYW1ldGVyICA9PiB7cmV0dXJuIHRyaWdnZXJQYXJhbWV0ZXIuaWQgPT0gXCJkYXRhcG9pbnRcIn0pWzBdO1xyXG4gICAgICAgIGlmKGRhdGFQb2ludE5hbWVQYXJhbWV0ZXIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgZGF0YVBvaW50TmFtZVBhcmFtZXRlci5kaXNwbGF5VmFsdWUgPSBkYXRhUG9pbnROYW1lO1xyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgICAgICAgICAgc3RhcnRUcmlnZ2VySXRlbS5zZXRWYWx1ZShkYXRhUG9pbnROYW1lUGFyYW1ldGVyLCBkYXRhUG9pbnROYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGNyZWF0ZXMgdGhlIHRyZWUgZ3JpZCBmb3IgdGhlIHRyaWdnZXIgaW5mb3JtYXRpb25zXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlVHJlZUdyaWQoKSB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVEYXRhcG9pbnRzRGlhbG9nKCk7XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICg8YW55PiQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpKS5lalRyZWVHcmlkKHtcclxuICAgICAgICAgICAgLi4udGhpcy5nZXRUcmVlR3JpZENvbHVtbkRlZmluaXRpb24oKSxcclxuICAgICAgICAgICAgLi4udGhpcy5nZXRUcmVlR3JpZENvbHVtblJlc2l6ZVN1cHBvcnQoKSxcclxuICAgICAgICAgICAgLi4udGhpcy5nZXRUcmVlR3JpZFRvb2xiYXJTdXBwb3J0KCksXHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRDZWxsRWRpdFN1cHBvcnQoKSxcclxuXHJcbiAgICAgICAgICAgIGNoaWxkTWFwcGluZzpcImNoaWxkc1wiLFxyXG4gICAgICAgICAgICBleHBhbmRTdGF0ZU1hcHBpbmc6IFwiZXhwYW5kU3RhdGVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgZXhwYW5kZWQ6IChhcmdzKSA9PiB0aGlzLnRyZWVHcmlkTm9kZUV4cGFuZGVkT3JDb2xsYXBzZWQoKSxcclxuICAgICAgICAgICAgY29sbGFwc2VkOiAoYXJncykgPT4gdGhpcy50cmVlR3JpZE5vZGVFeHBhbmRlZE9yQ29sbGFwc2VkKCksXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByb3dTZWxlY3RlZDogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWRSb3dTZWxlY3RlZChhcmdzKSxcclxuICAgICAgICAgICAgY3JlYXRlOiAoYXJncykgPT4gdGhpcy50cmVlR3JpZENyZWF0ZWQoKSxcclxuICAgICAgICAgICAgYWN0aW9uQmVnaW46IChhcmdzKSA9PiB0aGlzLnRyZWVHcmlkQWN0aW9uQmVnaW4oYXJncyksXHJcbiAgICAgICAgICAgIGFjdGlvbkNvbXBsZXRlOiAoYXJncykgPT4gdGhpcy50cmVlR3JpZEFjdGlvbkNvbXBsZXRlKGFyZ3MpLCBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSB0cmVlR3JpZE5vZGVFeHBhbmRlZE9yQ29sbGFwc2VkKCl7XHJcbiAgICAgICAgLy8gUmVmcmVzaCB0byBzZWUgY29ycmVjdCBleHBhbmRlZC9jb2xsYXBzZWQgaWNvblxyXG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJlZSBncmlkIGNvbHVtbiBkZWZpbml0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1RyaWdnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmVlR3JpZENvbHVtbkRlZmluaXRpb24oKToge317XHJcbiAgICAgICAgdGhpcy5fY2VsbEVkaXRUZW1wbGF0ZSA9IFRyYWNlQ29uZmlnVHJpZ2dlclRyZWVHcmlkQ2VsbEVkaXRUZW1wbGF0ZS5jcmVhdGVJbnN0YW5jZSgpO1xyXG4gICAgICAgIHRoaXMuX2NlbGxFZGl0VGVtcGxhdGUuZXZlbnRTZWxlY3Rpb25DaGFuZ2VkLmF0dGFjaCh0aGlzLl9kcm9wRG93bkxpc3RTZWxlY3Rpb25DaGFuZ2VkSGFuZGxlcik7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNvbHVtbnM6IFtcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwiZGlzcGxheU5hbWVcIiwgaGVhZGVyVGV4dDogXCJOYW1lXCIsIHdpZHRoOiBcIjIwMFwifSxcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwiZGlzcGxheVZhbHVlXCIsIGhlYWRlclRleHQ6IFwiVmFsdWVcIiwgd2lkdGg6IFwiMjAwXCIsIGVkaXRUeXBlOiBcInN0cmluZ2VkaXRcIiwgZWRpdFRlbXBsYXRlOiB0aGlzLl9jZWxsRWRpdFRlbXBsYXRlfVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgY29sdW1uIHJlc2l6ZSBzZXR0aW5nc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdUcmlnZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VHJlZUdyaWRDb2x1bW5SZXNpemVTdXBwb3J0KCk6IHt9e1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGFsbG93Q29sdW1uUmVzaXplOiB0cnVlLFxyXG4gICAgICAgICAgICBjb2x1bW5SZXNpemVTZXR0aW5nczogeyBjb2x1bW5SZXNpemVNb2RlOiBlai5UcmVlR3JpZC5Db2x1bW5SZXNpemVNb2RlLkZpeGVkQ29sdW1ucyB9LFxyXG4gICAgICAgICAgICBjb2x1bW5SZXNpemVkOiAoYXJncykgPT4gc3VwZXIucmVzaXplRHluYW1pY0NvbHVtbihhcmdzLmNvbHVtbkluZGV4LCBhcmdzLm1vZGVsKSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJlZSBncmlkIHRvb2xiYXIgc2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFRyZWVHcmlkVG9vbGJhclN1cHBvcnQoKToge317XHJcbiAgICAgICAgdGhpcy5fdG9vbGJhciA9IG5ldyBUcmFjZUNvbmZpZ1RyaWdnZXJUcmVlR3JpZFRvb2xiYXIodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRvb2xiYXJTZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgc2hvd1Rvb2xiYXI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjdXN0b21Ub29sYmFySXRlbXM6IHRoaXMuX3Rvb2xiYXIuZ2V0Q3VzdG9tVG9vbGJhcnMoKSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdG9vbGJhckNsaWNrOiAoYXJncykgPT4gdGhpcy5fdG9vbGJhci50b29sYmFyQ2xpY2soYXJncywgdGhpcyksXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCBjZWxsIGVkaXQgc2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFRyZWVHcmlkQ2VsbEVkaXRTdXBwb3J0KCk6IHt9e1xyXG5cdFx0bGV0IGNlbGxFZGl0RXZlbnRzID0gbmV3IFRyYWNlQ29uZmlnVHJpZ2dlclRyZWVHcmlkQ2VsbEVkaXRFdmVudHMoKTtcclxuXHRcdHJldHVybiB7XHJcbiAgICAgICAgICAgIGVkaXRTZXR0aW5nczogeyBhbGxvd0VkaXRpbmc6IHRydWUgfSxcclxuICAgICAgICAgICAgYmVnaW5FZGl0OiAoYXJncykgPT4gY2VsbEVkaXRFdmVudHMuYmVnaW5FZGl0KGFyZ3MpLFxyXG4gICAgICAgICAgICBlbmRFZGl0OiAoYXJncykgPT4gY2VsbEVkaXRFdmVudHMuZW5kRWRpdChhcmdzKSxcclxuXHRcdH07XHJcblx0fVxyXG5cclxuICAgIHByaXZhdGUgdHJlZUdyaWRDcmVhdGVkKCl7XHJcbiAgICAgICAgLy8gU2V0cyB0aGUgY3VzdG9tIHRvb2xiYXIgaWNvbnNcclxuICAgICAgICB0aGlzLl90b29sYmFyLnNldFN0eWxlRm9yVG9vbGJhckljb25zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0cmVlR3JpZEFjdGlvbkJlZ2luKGFyZ3Mpe1xyXG4gICAgICAgIC8vIFN1cHBvcnQgXCJFbnRmL0RlbFwiIGtleVxyXG4gICAgICAgIGlmKGFyZ3MucmVxdWVzdFR5cGUgPT0gXCJkZWxldGVcIil7XHJcbiAgICAgICAgICAgIHRoaXMuZGVsZXRlU3RhcnRUcmlnZ2VycyhhcmdzLmRlbGV0ZWRJdGVtcyk7XHJcbiAgICAgICAgICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0cmVlR3JpZEFjdGlvbkNvbXBsZXRlKGFyZ3Mpe1xyXG4gICAgICAgIC8vIEV2ZW50IHRyaWdnZXIgd2hpbGUgY2hhbmdpbmcgZGF0YXNvdXJjZSBkeW5hbWljYWxseS4gXHJcbiAgICAgICAgLy8gY29kZSB0byBkb25lIGFmdGVyIHRoZSBkeW5hbWljIGNoYW5nZSBvZiBkYXRhc291cmNlLiBcclxuICAgICAgICBpZiAoYXJncy5yZXF1ZXN0VHlwZSA9PT0gJ3JlZnJlc2hEYXRhU291cmNlJykgeyBcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoU2VsZWN0aW9uKCk7XHRcdFx0XHRcdFx0XHJcbiAgICAgICAgfSBcclxuICAgIH1cclxuICAgXHJcbiAgICBwcml2YXRlIHRyZWVHcmlkUm93U2VsZWN0ZWQoYXJncyl7XHJcbiAgICAgICAgaWYoYXJncy5tb2RlbC5zZWxlY3RlZEl0ZW0gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVGb290ZXJDb250ZW50VG9TZWxlY3RlZEl0ZW0oYXJncy5tb2RlbC5zZWxlY3RlZEl0ZW0pO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVRvb2xiYXJCdXR0b25TdGF0ZXMoYXJncy5tb2RlbC5kYXRhU291cmNlLCBhcmdzLm1vZGVsLnNlbGVjdGVkSXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRTdGFydFRyaWdnZXIoKXtcclxuICAgICAgICAoPElUcmFjZUNvbmZpZ1RyaWdnZXJEYXRhTW9kZWw+dGhpcy5kYXRhTW9kZWwpLmFkZFRyaWdnZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoU2VsZWN0aW9uKCk7XHJcblxyXG4gICAgICAgIC8vIEdldCBhY3R1YWwgc2VsZWN0aW9uIGl0ZW1cclxuICAgICAgICBjb25zdCB0cmVlT2JqID0gJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCkuZWpUcmVlR3JpZCgnaW5zdGFuY2UnKTsgXHJcbiAgICAgICAgbGV0IHNlbGVjdGVkSXRlbSA9IHRyZWVPYmoubW9kZWwuc2VsZWN0ZWRJdGVtO1xyXG4gICAgICAgIGlmKCB0cmVlT2JqLm1vZGVsLnNlbGVjdGVkUm93SW5kZXggPT0gLTEpe1xyXG4gICAgICAgICAgICBzZWxlY3RlZEl0ZW0gPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudXBkYXRlVG9vbGJhckJ1dHRvblN0YXRlcyh0cmVlT2JqLm1vZGVsLmRhdGFTb3VyY2UsIHNlbGVjdGVkSXRlbSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRlbGV0ZVN0YXJ0VHJpZ2dlcnMoZGVsZXRlSXRlbXMpe1xyXG4gICAgICAgIGxldCBpbmRleExpc3QgPSBuZXcgQXJyYXk8bnVtYmVyPigpO1xyXG4gICAgICAgIGZvcihsZXQgaT1kZWxldGVJdGVtcy5sZW5ndGgtMTsgaSA+PSAwOyBpLS0pe1xyXG4gICAgICAgICAgICBpZihkZWxldGVJdGVtc1tpXS5sZXZlbCA9PSAwKXtcclxuICAgICAgICAgICAgICAgIC8vIE9ubHkgbGV2ZWwgMCBjYW4gYmUgZGVsZXRlZCAoc3RhcnQgdHJpZ2dlciBncm91cCwgbm90IHNpbmdsZSBwYXJhbWV0ZXJzIG9mIHRoaXMgZ3JvdXApXHJcbiAgICAgICAgICAgICAgICBpbmRleExpc3QucHVzaChkZWxldGVJdGVtc1tpXS5oaWVyYXJjaHlSb3dJbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaW5kZXhMaXN0Lmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAoPElUcmFjZUNvbmZpZ1RyaWdnZXJEYXRhTW9kZWw+dGhpcy5kYXRhTW9kZWwpLnJlbW92ZVRyaWdnZXJzKGluZGV4TGlzdCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hTZWxlY3Rpb24oKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIEdldCBhY3R1YWwgc2VsZWN0aW9uIGl0ZW1cclxuICAgICAgICAgICAgY29uc3QgdHJlZU9iaiA9ICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpLmVqVHJlZUdyaWQoJ2luc3RhbmNlJyk7IFxyXG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRJdGVtID0gdHJlZU9iai5tb2RlbC5zZWxlY3RlZEl0ZW07XHJcbiAgICAgICAgICAgIGlmKCB0cmVlT2JqLm1vZGVsLnNlbGVjdGVkUm93SW5kZXggPT0gLTEpe1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRJdGVtID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVG9vbGJhckJ1dHRvblN0YXRlcyh0cmVlT2JqLm1vZGVsLmRhdGFTb3VyY2UsIHNlbGVjdGVkSXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogb3BlbnMgdGhlIGRhdGFwb2ludCBzZWxlY3Rpb24gZGlhbG9nIGFuZCBhdHRhY2hlcyB0byB0aGUgZGlhbG9nIGV2ZW50c1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1RyaWdnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIG9wZW5EYXRhcG9pbnREaWFsb2coKXtcclxuICAgICAgICBEYXRhcG9pbnREaWFsb2cuZXZlbnRBZGREYXRhcG9pbnQuYXR0YWNoKHRoaXMuX2FkZERhdGFQb2ludEhhbmRsZXIpO1xyXG4gICAgICAgIERhdGFwb2ludERpYWxvZy5ldmVudERpYWxvZ0Nsb3NlZC5hdHRhY2godGhpcy5fZGlhbG9nQ2xvc2VkSGFuZGxlcik7XHJcbiAgICAgICAgRGF0YXBvaW50RGlhbG9nLm9wZW4oVHJhY2VDb25maWdUcmlnZ2VyV2lkZ2V0LnNlbGVjdERhdGFQb2ludERpYWxvZ1RpdGxlLCBGb290ZXJDb250ZW50VHlwZS5hcHBseUNsb3NlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGF2YWlsYWJsZSB0cmFjZSBkYXRhcG9pbnRzIHRvIHRoZSB0cmlnZ2VyIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1RyaWdnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBhdmFpbGFibGVEYXRhUG9pbnRzKGF2YWlsYWJsZVRyYWNlRGF0YVBvaW50czogUHJvcGVydHk8VHJhY2VEYXRhUG9pbnRJbmZvW10+KSB7XHJcbiAgICAgICAgYXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzLmNoYW5nZWQoKHRyYWNlUGFyYW1ldGVySW50ZXJmYWNlKT0+e1xyXG4gICAgICAgICAgICB0aGlzLl9hdmFpbGFibGVUcmFjZURhdGFQb2ludHMgPSB0cmFjZVBhcmFtZXRlckludGVyZmFjZTtcclxuICAgICAgICAgICAgRGF0YXBvaW50RGlhbG9nLnNldERhdGFwb2ludHModGhpcy5fYXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzKTtcclxuICAgICAgICB9KVxyXG4gICAgfSAgIFxyXG5cclxuICAgIHByaXZhdGUgcmVmcmVzaFNlbGVjdGlvbigpe1xyXG5cdFx0Y29uc3QgdHJlZU9iaiA9ICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpLmVqVHJlZUdyaWQoJ2luc3RhbmNlJyk7IFxyXG5cdFx0XHRcdFx0XHRcclxuXHRcdC8vIEdldCBhY3R1YWwgc2VsZWN0aW9uIGluZGV4XHJcbiAgICAgICAgbGV0IGFjdHVhbFNlbGVjdGVkUm93SW5kZXggPSB0cmVlT2JqLm1vZGVsLnNlbGVjdGVkUm93SW5kZXg7XHJcbiAgICAgICAgaWYgKGFjdHVhbFNlbGVjdGVkUm93SW5kZXggPT0gLTEpe1xyXG4gICAgICAgICAgICAvLyB1cGRhdGUgdG9vbGJhciBidXR0b25zIGluIGNhc2Ugb2Ygbm8gc2VsZWN0ZWQgaXRlbVxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVRvb2xiYXJCdXR0b25TdGF0ZXModHJlZU9iai5tb2RlbC5kYXRhU291cmNlLCB1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuXHRcdC8vIFJlc2V0IHNlbGVjdGlvblxyXG5cdFx0dHJlZU9iai5tb2RlbC5zZWxlY3RlZFJvd0luZGV4ID0gLTE7XHJcblx0XHRcclxuXHRcdC8vIFNldCB0byBsYXN0IGluZGV4IGlmIGluZGV4IGlzIG91dCBvZiByYW5nZVxyXG5cdFx0aWYoYWN0dWFsU2VsZWN0ZWRSb3dJbmRleCA+PSB0cmVlT2JqLm1vZGVsLmZsYXRSZWNvcmRzLmxlbmd0aCl7XHJcblx0XHRcdGFjdHVhbFNlbGVjdGVkUm93SW5kZXggPSB0cmVlT2JqLm1vZGVsLmZsYXRSZWNvcmRzLmxlbmd0aC0xO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuXHRcdC8vIFNldCBzZWxlY3Rpb25cclxuXHRcdHRyZWVPYmoubW9kZWwuc2VsZWN0ZWRSb3dJbmRleCA9IGFjdHVhbFNlbGVjdGVkUm93SW5kZXg7XHJcblx0XHRcclxuXHRcdC8vIHVwZGF0ZSB0b29sYmFyIGJ1dHRvbnMgd2l0aCBzZWxlY3RlZCBpdGVtXHJcblx0XHRpZih0cmVlT2JqLm1vZGVsLmZsYXRSZWNvcmRzW2FjdHVhbFNlbGVjdGVkUm93SW5kZXhdICE9IHVuZGVmaW5lZCl7XHJcblx0XHRcdHRoaXMudXBkYXRlVG9vbGJhckJ1dHRvblN0YXRlcyh0cmVlT2JqLm1vZGVsLmRhdGFTb3VyY2UsIHRyZWVPYmoubW9kZWwuZmxhdFJlY29yZHNbYWN0dWFsU2VsZWN0ZWRSb3dJbmRleF0uaXRlbSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJpZ2dlciBjb25kaXRpb24oZS5nLiAyMCBmb3IgSU5fV0lORE9XOyAzMCBmb3IgT1VUX1dJTkRPVzsgLi4uKSBmb3IgdGhlIGdpdmVuIGNvbmRpdGlvbiBwYXJhbWV0ZXIgaWQgKGUuZy4gU3RhcnRUcmlnZ2VyMV9Db25kaXRpb24pXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHt9IGRhdGFTb3VyY2VcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb25kaXRpb25QYXJhbWV0ZXJcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdUcmlnZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VHJpZ2dlckNvbmRpdGlvblZhbHVlKGRhdGFTb3VyY2UsIGNvbmRpdGlvblBhcmFtZXRlcjogc3RyaW5nKTogbnVtYmVye1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpIDwgZGF0YVNvdXJjZS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCAgc3RhcnRUcmlnZ2VyID0gZGF0YVNvdXJjZVtpXTtcclxuICAgICAgICAgICAgZm9yKGxldCBqPTA7IGogPCBzdGFydFRyaWdnZXIuY2hpbGRzLmxlbmd0aDsgaisrKXtcclxuICAgICAgICAgICAgICAgIGxldCBwYXJhbWV0ZXIgPSBzdGFydFRyaWdnZXIuY2hpbGRzW2pdO1xyXG4gICAgICAgICAgICAgICAgaWYocGFyYW1ldGVyLmNvbXBvbmVudFBhcmFtZXRlci5icm93c2VOYW1lID09IGNvbmRpdGlvblBhcmFtZXRlcil7XHJcbiAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQocGFyYW1ldGVyLmNvbXBvbmVudFBhcmFtZXRlci52YWx1ZSwgMTApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVmcmVzaGVzIHRyaWdnZXIgcGFyYW1ldGVycyB0cmVlIGdyaWQgd2l0aCB0aGUgY3VycmVudCBtb2RlbCBkYXRhXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1RyaWdnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWZyZXNoKCkge1xyXG4gICAgICAgIHRoaXMuc2V0TW9kZWwodGhpcy5kYXRhTW9kZWwuZGF0YSk7XHJcbiAgICB9XHJcbiAgIFxyXG4gICAgcHJpdmF0ZSBvbkRyb3BEb3duTGlzdFNlbGVjdGlvbkNoYW5nZWQoc2VuZGVyLGFyZ3Mpe1xyXG4gICAgICAgIHRoaXMudXBkYXRlRm9vdGVyQ29udGVudChhcmdzLnZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZVRvb2xiYXJCdXR0b25TdGF0ZXMoc3RhcnRUcmlnZ2VyczogQXJyYXk8YW55Piwgc2VsZWN0ZWRJdGVtKXtcclxuICAgICAgICAvLyBTZXQgc2VsZWN0IHRyaWdnZXIgZGF0YXBvaW50IGJ1dHRvbiBzdGF0ZVxyXG4gICAgICAgIGlmKHNlbGVjdGVkSXRlbSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl90b29sYmFyLmRpc2FibGVTZWxlY3RUcmlnZ2VyRGF0YVBvaW50QnV0dG9uKHRydWUpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLl90b29sYmFyLmRpc2FibGVTZWxlY3RUcmlnZ2VyRGF0YVBvaW50QnV0dG9uKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gU2V0IGFkZCB0cmlnZ2VyIGJ1dHRvbiBzdGF0ZVxyXG4gICAgICAgIGlmKHN0YXJ0VHJpZ2dlcnMubGVuZ3RoID4gMSl7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2xiYXIuZGlzYWJsZUFkZEJ1dHRvbih0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbGJhci5kaXNhYmxlQWRkQnV0dG9uKGZhbHNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNldCByZW1vdmUgdHJpZ2dlciBidXR0b24gc3RhdGVcclxuICAgICAgICBpZihzdGFydFRyaWdnZXJzLmxlbmd0aCA9PSAwIHx8IHNlbGVjdGVkSXRlbSA9PSB1bmRlZmluZWQgfHwgc2VsZWN0ZWRJdGVtLmxldmVsID4gMCl7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2xiYXIuZGlzYWJsZVJlbW92ZUJ1dHRvbih0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbGJhci5kaXNhYmxlUmVtb3ZlQnV0dG9uKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IFRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldCB9OyJdfQ==