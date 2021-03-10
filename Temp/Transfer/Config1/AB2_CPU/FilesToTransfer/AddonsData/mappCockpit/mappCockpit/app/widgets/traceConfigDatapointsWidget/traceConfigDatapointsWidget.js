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
define(["require", "exports", "../common/treeGridWidgetBase", "./view/traceConfigDatapointsTreeGridToolbar", "../../view/datapointDialog/datapointDialog", "../../view/datapointDialog/eventDatapointArgs", "../../models/diagnostics/trace/traceDataPoint", "./view/traceConfigDatapointsTreeGridCellEditEvents", "./model/traceConfigDatapointsDataModel"], function (require, exports, treeGridWidgetBase_1, traceConfigDatapointsTreeGridToolbar_1, datapointDialog_1, eventDatapointArgs_1, traceDataPoint_1, traceConfigDatapointsTreeGridCellEditEvents_1, traceConfigDatapointsDataModel_1) {
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
        Object.defineProperty(TraceConfigDatapointsWidget.prototype, "dataPoints", {
            set: function (dataPoints) {
                var traceConfigDatapointsDataModel = new traceConfigDatapointsDataModel_1.TraceConfigDatapointsDataModel();
                traceConfigDatapointsDataModel.initialize();
                this.dataModel = traceConfigDatapointsDataModel;
                traceConfigDatapointsDataModel.initData = dataPoints;
            },
            enumerable: true,
            configurable: true
        });
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
            var dataPoints = this._dataModel.data;
            this.updateToolbarButtonStates(dataPoints);
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
            var dataPoints = this._dataModel.data;
            this.updateToolbarButtonStates(dataPoints);
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
        Object.defineProperty(TraceConfigDatapointsWidget.prototype, "availableDataPoints", {
            /**
             * Sets the available trace datapoints to the datapoint widget
             *
             * @memberof TraceConfigDatapointsWidget
             */
            set: function (availableTraceDataPoints) {
                var _this = this;
                availableTraceDataPoints.changed(function (traceParameterInterface) {
                    _this._availableTraceDataPoints = traceParameterInterface;
                    datapointDialog_1.DatapointDialog.setDatapoints(_this._availableTraceDataPoints);
                    // Update toolbar buttons => show/hide add datapoints toolbar button
                    var dataPoints = _this._dataModel.data;
                    _this.updateToolbarButtonStates(dataPoints);
                });
            },
            enumerable: true,
            configurable: true
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VDb25maWdEYXRhcG9pbnRzV2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldC90cmFjZUNvbmZpZ0RhdGFwb2ludHNXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBY0E7Ozs7O09BS0c7SUFDSDtRQUEwQywrQ0FBa0I7UUFBNUQ7WUFBQSxxRUFpVEM7WUEvU1csMEJBQW9CLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFHLE9BQUEsS0FBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLEVBQWhDLENBQWdDLENBQUM7WUFDdkUsMEJBQW9CLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFHLE9BQUEsS0FBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLEVBQWhDLENBQWdDLENBQUM7WUFFdkUsK0JBQXlCLEdBQXlCLElBQUksS0FBSyxFQUFzQixDQUFDOztRQTRTOUYsQ0FBQztRQXhTRzs7OztXQUlHO1FBQ0gsZ0RBQVUsR0FBVixVQUFXLGlCQUF5QjtZQUNoQyxpQkFBTSxVQUFVLFlBQUMsaUJBQWlCLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDeEMsaUJBQU0sZ0JBQWdCLFlBQUMsYUFBYSxDQUFDLENBQUM7WUFFdEMsOEJBQThCO1lBQzlCLGlCQUFNLGdCQUFnQixZQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNuQyxDQUFDO1FBRUQsc0JBQUksbURBQVU7aUJBQWQsVUFBZSxVQUE0QjtnQkFDdkMsSUFBSSw4QkFBOEIsR0FBRyxJQUFJLCtEQUE4QixFQUFxQyxDQUFDO2dCQUM3Ryw4QkFBOEIsQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDNUMsSUFBSSxDQUFDLFNBQVMsR0FBRyw4QkFBOEIsQ0FBQztnQkFDaEQs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LCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJVHJhY2VDb25maWdEYXRhcG9pbnRzV2lkZ2V0IH0gZnJvbSBcIi4vaW50ZXJmYWNlcy90cmFjZUNvbmZpZ0RhdGFwb2ludHNXaWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVHJlZUdyaWRXaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi90cmVlR3JpZFdpZGdldEJhc2VcIjtcclxuaW1wb3J0IHsgSURhdGFNb2RlbCwgRXZlbnRNb2RlbENoYW5nZWRBcmdzIH0gZnJvbSBcIi4uLy4uL21vZGVscy9kYXRhTW9kZWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVHJhY2VDb25maWdEYXRhcG9pbnRzVHJlZUdyaWRUb29sYmFyIH0gZnJvbSBcIi4vdmlldy90cmFjZUNvbmZpZ0RhdGFwb2ludHNUcmVlR3JpZFRvb2xiYXJcIjtcclxuaW1wb3J0IHsgRGF0YXBvaW50RGlhbG9nIH0gZnJvbSBcIi4uLy4uL3ZpZXcvZGF0YXBvaW50RGlhbG9nL2RhdGFwb2ludERpYWxvZ1wiO1xyXG5pbXBvcnQgeyBFdmVudERhdGFwb2ludEFyZ3MsIERhdGFwb2ludEFjdGlvbiB9IGZyb20gXCIuLi8uLi92aWV3L2RhdGFwb2ludERpYWxvZy9ldmVudERhdGFwb2ludEFyZ3NcIjtcclxuXHJcbmltcG9ydCB7IFRyYWNlRGF0YVBvaW50fSBmcm9tIFwiLi4vLi4vbW9kZWxzL2RpYWdub3N0aWNzL3RyYWNlL3RyYWNlRGF0YVBvaW50XCI7XHJcbmltcG9ydCB7IFRyYWNlRGF0YVBvaW50SW5mbyB9IGZyb20gXCIuLi8uLi9tb2RlbHMvZGlhZ25vc3RpY3MvdHJhY2UvdHJhY2VEYXRhUG9pbnRJbmZvXCI7XHJcbmltcG9ydCB7IFByb3BlcnR5IH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9wcm9wZXJ0eVwiO1xyXG5pbXBvcnQgeyBUcmFjZUNvbmZpZ0RhdGFwb2ludHNUcmVlR3JpZENlbGxFZGl0RXZlbnRzIH0gZnJvbSBcIi4vdmlldy90cmFjZUNvbmZpZ0RhdGFwb2ludHNUcmVlR3JpZENlbGxFZGl0RXZlbnRzXCI7XHJcbmltcG9ydCB7IFRyYWNlQ29uZmlnRGF0YXBvaW50c0RhdGFNb2RlbCB9IGZyb20gXCIuL21vZGVsL3RyYWNlQ29uZmlnRGF0YXBvaW50c0RhdGFNb2RlbFwiO1xyXG5pbXBvcnQgeyBJVHJhY2VDb25maWdEYXRhcG9pbnRzRGF0YU1vZGVsIH0gZnJvbSBcIi4vbW9kZWwvdHJhY2VDb25maWdEYXRhcG9pbnRzRGF0YU1vZGVsSW50ZXJmYWNlXCI7XHJcblxyXG4vKipcclxuICogaW1wbGVtZW50cyB0aGUgVHJhY2VDb25maWdEYXRhcG9pbnRzV2lkZ2V0XHJcbiAqXHJcbiAqIEBjbGFzcyBUcmFjZUNvbmZpZ0RhdGFwb2ludHNXaWRnZXRcclxuICogQGV4dGVuZHMge1RyZWVHcmlkV2lkZ2V0QmFzZX1cclxuICovXHJcbmNsYXNzIFRyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldCBleHRlbmRzIFRyZWVHcmlkV2lkZ2V0QmFzZSBpbXBsZW1lbnRzIElUcmFjZUNvbmZpZ0RhdGFwb2ludHNXaWRnZXQge1xyXG5cclxuICAgIHByaXZhdGUgX2FkZERhdGFQb2ludEhhbmRsZXIgPSAoc2VuZGVyLGFyZ3MpPT50aGlzLm9uQWRkRGF0YXBvaW50KHNlbmRlcixhcmdzKTtcclxuICAgIHByaXZhdGUgX2RpYWxvZ0Nsb3NlZEhhbmRsZXIgPSAoc2VuZGVyLGFyZ3MpPT50aGlzLm9uRGlhbG9nQ2xvc2VkKHNlbmRlcixhcmdzKTtcclxuXHJcbiAgICBwcml2YXRlIF9hdmFpbGFibGVUcmFjZURhdGFQb2ludHM6IFRyYWNlRGF0YVBvaW50SW5mb1tdID0gbmV3IEFycmF5PFRyYWNlRGF0YVBvaW50SW5mbz4oKTtcclxuXHJcbiAgICBwcml2YXRlIF90b29sYmFyITogVHJhY2VDb25maWdEYXRhcG9pbnRzVHJlZUdyaWRUb29sYmFyO1xyXG5cclxuICAgIC8qIGluaXRpYWxpemUgdGhlIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYXlvdXRDb250YWluZXJJZFxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldFxyXG4gICAgICovXHJcbiAgICBpbml0aWFsaXplKGxheW91dENvbnRhaW5lcklkOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlci5pbml0aWFsaXplKGxheW91dENvbnRhaW5lcklkLCAzMCk7XHJcbiAgICAgICAgc3VwZXIuc2V0SGVhZGVyQ29udGVudChcIkRhdGEgcG9pbnRzXCIpO1xyXG5cclxuICAgICAgICAvLyBTZXQgZHluYW1pYyBjb2x1bW4gc2V0dGluZ3NcclxuICAgICAgICBzdXBlci5zZXREeW5hbWljQ29sdW1uKDMsIDI1MCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGRhdGFQb2ludHMoZGF0YVBvaW50czogVHJhY2VEYXRhUG9pbnRbXSl7XHJcbiAgICAgICAgbGV0IHRyYWNlQ29uZmlnRGF0YXBvaW50c0RhdGFNb2RlbCA9IG5ldyBUcmFjZUNvbmZpZ0RhdGFwb2ludHNEYXRhTW9kZWwoKSBhcyBJVHJhY2VDb25maWdEYXRhcG9pbnRzRGF0YU1vZGVsO1xyXG4gICAgICAgIHRyYWNlQ29uZmlnRGF0YXBvaW50c0RhdGFNb2RlbC5pbml0aWFsaXplKCk7XHJcbiAgICAgICAgdGhpcy5kYXRhTW9kZWwgPSB0cmFjZUNvbmZpZ0RhdGFwb2ludHNEYXRhTW9kZWw7XHJcbiAgICAgICAgdHJhY2VDb25maWdEYXRhcG9pbnRzRGF0YU1vZGVsLmluaXREYXRhID0gZGF0YVBvaW50cztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGltcGxlbWVudHMgdGhlIG1vZGVsIGNoYW5nZSBoYW5kbGluZ1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SURhdGFNb2RlbH0gc2VuZGVyXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50TW9kZWxDaGFuZ2VkQXJnc30gZGF0YVxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdEYXRhcG9pbnRzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGhhbmRsZU1vZGVsQ2hhbmdlZChzZW5kZXI6IElEYXRhTW9kZWwsIGV2ZW50QXJnczogRXZlbnRNb2RlbENoYW5nZWRBcmdzKTogYW55IHtcclxuICAgICAgICBsZXQgZGF0YVBvaW50cyA9IGV2ZW50QXJncy5kYXRhIGFzIEFycmF5PFRyYWNlRGF0YVBvaW50PjtcclxuICAgICAgICB0aGlzLnJlZnJlc2hEYXRhcG9pbnRzVmFsdWVzKGRhdGFQb2ludHMpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlVG9vbGJhckJ1dHRvblN0YXRlcyhkYXRhUG9pbnRzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGhhbmRsZXMgdGhlIGNoYW5nZXMgb2Ygb2JzZXJ2ZWQgaXRlbXMgcmVxdWVzdGVkIGJ5ICdvYnNlcnZlRGF0YU1vZGVsSXRlbXMnXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJRGF0YU1vZGVsfSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7RXZlbnRNb2RlbENoYW5nZWRBcmdzfSBkYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdEYXRhcG9pbnRzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGhhbmRsZU1vZGVsSXRlbXNDaGFuZ2VkKHNlbmRlcjogSURhdGFNb2RlbCwgZXZlbnRBcmdzOiBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MpIHtcclxuICAgICAgICBsZXQgZGF0YVBvaW50cyA9IHRoaXMuZGF0YU1vZGVsLmRhdGEgYXMgQXJyYXk8VHJhY2VEYXRhUG9pbnQ+O1xyXG4gICAgICAgIHRoaXMudXBkYXRlVG9vbGJhckJ1dHRvblN0YXRlcyhkYXRhUG9pbnRzKTtcclxuICAgICAgICB0aGlzLnJlZnJlc2hEYXRhcG9pbnRzVmFsdWVzKGRhdGFQb2ludHMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBjcmVhdGVzIHRoZSBkYXRhcG9pbnQgc2VsZWN0aW9uIGRpYWxvZ1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ0RhdGFwb2ludHNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVEYXRhcG9pbnRzRGlhbG9nKCl7XHJcbiAgICAgICAgbGV0IGRhdGFwb2ludERpYWxvZ0lkID0gXCJkYXRhcG9pbnREaWFsb2dcIjtcclxuICAgICAgICAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKS5hcHBlbmQoXCI8ZGl2IGlkPSdcIiArIGRhdGFwb2ludERpYWxvZ0lkICsgXCInPjxkaXYgaWQ9J2RhdGFwb2ludENvbnRlbnRSb290Jz48Lz48Lz5cIik7ICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgRGF0YXBvaW50RGlhbG9nLmluaXRpYWxpemUoZGF0YXBvaW50RGlhbG9nSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBjYXRjaGVzIHRoZSBhZGQgZGF0YXBvaW50IGV2ZW50IGZyb20gdGhlIGRhdGFwb2ludCBkaWFsb2dcclxuICAgICAqID0+IGFkZHMgb3IgcmVwbGFjZXMgdGhlIHNlbGVjdGVkIGRhdGFwb2ludCB3aXRoIHRoZSBkYXRhcG9pbnQgZnJvbSB0aGUgZGF0YXBvaW50IGRpYWxvZ1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7fSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7RXZlbnREYXRhcG9pbnRBcmdzfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdEYXRhcG9pbnRzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25BZGREYXRhcG9pbnQoc2VuZGVyLCBhcmdzOiBFdmVudERhdGFwb2ludEFyZ3Mpe1xyXG4gICAgICAgIHZhciB0cmVlR3JpZE9iaiA9IHRoaXMuZ2V0VHJlZUdyaWRPYmplY3QoKTtcclxuICAgICAgICBsZXQgYWN0dWFsU2VsZWN0aW9uSW5kZXggPSB0cmVlR3JpZE9iai5tb2RlbC5zZWxlY3RlZFJvd0luZGV4O1xyXG4gICAgICAgIGlmKGFjdHVhbFNlbGVjdGlvbkluZGV4ID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGFjdHVhbFNlbGVjdGlvbkluZGV4ID0gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBkYXRhUG9pbnQgPSBUcmFjZURhdGFQb2ludC5jcmVhdGVXaXRoRGF0YVBvaW50SW5mbyhhcmdzLmRhdGFQb2ludEluZm8pO1xyXG4gICAgICAgIGlmKGFyZ3MuYWN0aW9uID09IERhdGFwb2ludEFjdGlvbi5hZGQpe1xyXG4gICAgICAgICAgICAoPElUcmFjZUNvbmZpZ0RhdGFwb2ludHNEYXRhTW9kZWw+dGhpcy5fZGF0YU1vZGVsKS5hZGREYXRhcG9pbnQoYWN0dWFsU2VsZWN0aW9uSW5kZXgsIGRhdGFQb2ludCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoYXJncy5hY3Rpb24gPT0gRGF0YXBvaW50QWN0aW9uLnJlcGxhY2Upe1xyXG4gICAgICAgICAgICAoPElUcmFjZUNvbmZpZ0RhdGFwb2ludHNEYXRhTW9kZWw+dGhpcy5fZGF0YU1vZGVsKS5yZXBsYWNlRGF0YXBvaW50KGFjdHVhbFNlbGVjdGlvbkluZGV4LCBkYXRhUG9pbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZGF0YVBvaW50cyA9ICg8SVRyYWNlQ29uZmlnRGF0YXBvaW50c0RhdGFNb2RlbD50aGlzLl9kYXRhTW9kZWwpLmRhdGEgYXMgQXJyYXk8YW55PjtcclxuICAgICAgICB0aGlzLnVwZGF0ZVRvb2xiYXJCdXR0b25TdGF0ZXMoZGF0YVBvaW50cyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGNhdGNoZXMgdGhlIGRpYWxvZyBjbG9zZSBldmVudCBmcm9tIHRoZSBkYXRhcG9pbnQgZGlhbG9nXHJcbiAgICAgKiA9PiBkZXRhY2hlcyB0aGUgZGlhbG9nIGV2ZW50c1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7fSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7fSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdEYXRhcG9pbnRzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25EaWFsb2dDbG9zZWQoc2VuZGVyLCBhcmdzKXtcclxuICAgICAgICBEYXRhcG9pbnREaWFsb2cuZXZlbnRBZGREYXRhcG9pbnQuZGV0YWNoKHRoaXMuX2FkZERhdGFQb2ludEhhbmRsZXIpO1xyXG4gICAgICAgIERhdGFwb2ludERpYWxvZy5ldmVudERpYWxvZ0Nsb3NlZC5kZXRhY2godGhpcy5fZGlhbG9nQ2xvc2VkSGFuZGxlcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGNyZWF0ZXMgdGhlIHRyZWUgZ3JpZCBmb3IgdGhlIGRhdGFwb2ludCBpbmZvcm1hdGlvbnNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdEYXRhcG9pbnRzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBjcmVhdGVUcmVlR3JpZCgpIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZURhdGFwb2ludHNEaWFsb2coKTtcclxuICAgICBcclxuICAgICAgICAoPGFueT4kKHRoaXMuY3NzUGFyZW50Q29udGVudElkKSkuZWpUcmVlR3JpZCh7XHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCksXHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRDb2x1bW5SZXNpemVTdXBwb3J0KCksXHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRUb29sYmFyU3VwcG9ydCgpLFxyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkQ2VsbEVkaXRTdXBwb3J0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHNlbGVjdGlvblR5cGU6IGVqLlRyZWVHcmlkLlNlbGVjdGlvblR5cGUuTXVsdGlwbGUsXHJcbiAgICAgICAgICAgIGVkaXRTZXR0aW5nczogeyBhbGxvd0VkaXRpbmc6IHRydWUgfSxcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJvd1NlbGVjdGVkOiAoYXJncykgPT4gdGhpcy50cmVlR3JpZFJvd1NlbGVjdGVkKGFyZ3MpLFxyXG4gICAgICAgICAgICBhY3Rpb25CZWdpbjogKGFyZ3MpID0+ICB0aGlzLnRyZWVHcmlkQWN0aW9uQmVnaW4oYXJncyksXHJcbiAgICAgICAgICAgIGNyZWF0ZTogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWRDcmVhdGVkKCksXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJlZSBncmlkIGNvbHVtbiBkZWZpbml0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ0RhdGFwb2ludHNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmVlR3JpZENvbHVtbkRlZmluaXRpb24oKToge317XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY29sdW1uczogW1xyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJkYXRhUG9pbnROYW1lXCIsIGhlYWRlclRleHQ6IFwiRGF0YSBwb2ludFwiLCB3aWR0aDogXCIzNTBcIn0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcImNvbXBvbmVudE5hbWVcIiwgaGVhZGVyVGV4dDogXCJDb21wb25lbnRcIn0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcIm5hbWVcIiwgaGVhZGVyVGV4dDogXCJOYW1lXCJ9LFxyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJkZXNjcmlwdGlvblwiLCBoZWFkZXJUZXh0OiBcIkRlc2NyaXB0aW9uXCIsIHdpZHRoOiBcIjI1MFwifSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJlZSBncmlkIGNvbHVtbiByZXNpemUgc2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFRyZWVHcmlkQ29sdW1uUmVzaXplU3VwcG9ydCgpOiB7fXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBhbGxvd0NvbHVtblJlc2l6ZTogdHJ1ZSxcclxuICAgICAgICAgICAgY29sdW1uUmVzaXplU2V0dGluZ3M6IHsgY29sdW1uUmVzaXplTW9kZTogZWouVHJlZUdyaWQuQ29sdW1uUmVzaXplTW9kZS5GaXhlZENvbHVtbnMgfSxcclxuICAgICAgICAgICAgY29sdW1uUmVzaXplZDogKGFyZ3MpID0+IHN1cGVyLnJlc2l6ZUR5bmFtaWNDb2x1bW4oYXJncy5jb2x1bW5JbmRleCwgYXJncy5tb2RlbCksXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCB0b29sYmFyIHNldHRpbmdzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ0RhdGFwb2ludHNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmVlR3JpZFRvb2xiYXJTdXBwb3J0KCk6IHt9e1xyXG4gICAgICAgIHRoaXMuX3Rvb2xiYXIgPSBuZXcgVHJhY2VDb25maWdEYXRhcG9pbnRzVHJlZUdyaWRUb29sYmFyKHRoaXMuY3NzUGFyZW50Q29udGVudElkKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0b29sYmFyU2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgIHNob3dUb29sYmFyOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tVG9vbGJhckl0ZW1zOiB0aGlzLl90b29sYmFyLmdldEN1c3RvbVRvb2xiYXJzKCksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRvb2xiYXJDbGljazogKGFyZ3MpID0+IHRoaXMuX3Rvb2xiYXIudG9vbGJhckNsaWNrKGFyZ3MsIHRoaXMsICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpLmRhdGEoXCJlalRyZWVHcmlkXCIpKSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJlZSBncmlkIGNlbGwgZWRpdCBzZXR0aW5nc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdEYXRhcG9pbnRzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VHJlZUdyaWRDZWxsRWRpdFN1cHBvcnQoKToge317XHJcblx0XHR2YXIgY2VsbEVkaXRFdmVudHMgPSBuZXcgVHJhY2VDb25maWdEYXRhcG9pbnRzVHJlZUdyaWRDZWxsRWRpdEV2ZW50cygpO1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0YmVnaW5FZGl0OiAoYXJncykgPT4gY2VsbEVkaXRFdmVudHMuYmVnaW5FZGl0KGFyZ3MpLFxyXG4gICAgICAgICAgICBlbmRFZGl0OiAoYXJncykgPT4gY2VsbEVkaXRFdmVudHMuZW5kRWRpdChhcmdzLCB0aGlzLl9kYXRhTW9kZWwsIHRoaXMuX2F2YWlsYWJsZVRyYWNlRGF0YVBvaW50cyksXHJcblx0XHR9O1xyXG5cdH1cclxuXHJcbiAgICBwcml2YXRlIHRyZWVHcmlkQ3JlYXRlZCgpe1xyXG4gICAgICAgIC8vIFNldHMgdGhlIGN1c3RvbSB0b29sYmFyIGljb25zXHJcbiAgICAgICAgdGhpcy5fdG9vbGJhci5zZXRTdHlsZUZvclRvb2xiYXJJY29ucygpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX3Rvb2xiYXIuaW5pdFRvb2xiYXJTdGF0ZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRyZWVHcmlkQWN0aW9uQmVnaW4oYXJncyl7XHJcbiAgICAgICAgLy8gU3VwcG9ydCBcIkVudGYvRGVsXCIga2V5XHJcbiAgICAgICAgaWYoYXJncy5yZXF1ZXN0VHlwZSA9PSBcImRlbGV0ZVwiKXtcclxuICAgICAgICAgICAgYXJncy5jYW5jZWwgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmRlbGV0ZURhdGFQb2ludHMoYXJncyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdHJlZUdyaWRSb3dTZWxlY3RlZChhcmdzKXtcclxuICAgICAgICBpZihhcmdzLm1vZGVsLnNlbGVjdGVkSXRlbSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl90b29sYmFyLmRpc2FibGVSZW1vdmVCdXR0b24oZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLl90b29sYmFyLmRpc2FibGVSZW1vdmVCdXR0b24odHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZWxldGVEYXRhUG9pbnRzKGFyZ3Mpe1xyXG4gICAgICAgIGxldCBpbmRleExpc3QgPSBuZXcgQXJyYXk8bnVtYmVyPigpO1xyXG4gICAgICAgIGZvcihsZXQgaT1hcmdzLmRlbGV0ZWRJdGVtcy5sZW5ndGgtMTsgaSA+PSAwOyBpLS0pe1xyXG4gICAgICAgICAgICBpbmRleExpc3QucHVzaChhcmdzLmRlbGV0ZWRJdGVtc1tpXS5pbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGluZGV4TGlzdC5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgKDxJVHJhY2VDb25maWdEYXRhcG9pbnRzRGF0YU1vZGVsPnRoaXMuX2RhdGFNb2RlbCkucmVtb3ZlRGF0YXBvaW50cyhpbmRleExpc3QpO1xyXG4gICAgICAgICAgICB2YXIgdHJlZUdyaWRPYmogPSB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCk7XHJcbiAgICAgICAgICAgIGxldCBuZXdTZWxlY3Rpb25JbmRleCA9IGluZGV4TGlzdFtpbmRleExpc3QubGVuZ3RoLTFdO1xyXG4gICAgICAgICAgICBpZihuZXdTZWxlY3Rpb25JbmRleCA+PSBhcmdzLm1vZGVsLnBhcmVudFJlY29yZHMubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgIG5ld1NlbGVjdGlvbkluZGV4ID0gYXJncy5tb2RlbC5wYXJlbnRSZWNvcmRzLmxlbmd0aC0xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRyZWVHcmlkT2JqLm9wdGlvbihcInNlbGVjdGVkUm93SW5kZXhcIiwgbmV3U2VsZWN0aW9uSW5kZXgsIHRydWUpOyBcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGRhdGFQb2ludHMgPSAoPElUcmFjZUNvbmZpZ0RhdGFwb2ludHNEYXRhTW9kZWw+dGhpcy5fZGF0YU1vZGVsKS5kYXRhIGFzIEFycmF5PGFueT47XHJcbiAgICAgICAgdGhpcy51cGRhdGVUb29sYmFyQnV0dG9uU3RhdGVzKGRhdGFQb2ludHMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogb3BlbnMgdGhlIGRhdGFwb2ludCBzZWxlY3Rpb24gZGlhbG9nIGFuZCBhdHRhY2hlcyB0byB0aGUgZGlhbG9nIGV2ZW50c1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ0RhdGFwb2ludHNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIG9wZW5EYXRhcG9pbnREaWFsb2coKXtcclxuICAgICAgICBcclxuICAgICAgICBEYXRhcG9pbnREaWFsb2cuZXZlbnRBZGREYXRhcG9pbnQuYXR0YWNoKHRoaXMuX2FkZERhdGFQb2ludEhhbmRsZXIpO1xyXG4gICAgICAgIERhdGFwb2ludERpYWxvZy5ldmVudERpYWxvZ0Nsb3NlZC5hdHRhY2godGhpcy5fZGlhbG9nQ2xvc2VkSGFuZGxlcik7XHJcbiAgICAgICAgRGF0YXBvaW50RGlhbG9nLm9wZW4oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGF2YWlsYWJsZSB0cmFjZSBkYXRhcG9pbnRzIHRvIHRoZSBkYXRhcG9pbnQgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IGF2YWlsYWJsZURhdGFQb2ludHMoYXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzOiBQcm9wZXJ0eTxUcmFjZURhdGFQb2ludEluZm9bXT4pIHtcclxuICAgICAgICBhdmFpbGFibGVUcmFjZURhdGFQb2ludHMuY2hhbmdlZCgodHJhY2VQYXJhbWV0ZXJJbnRlcmZhY2UpPT57XHJcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVRyYWNlRGF0YVBvaW50cyA9IHRyYWNlUGFyYW1ldGVySW50ZXJmYWNlO1xyXG4gICAgICAgICAgICBEYXRhcG9pbnREaWFsb2cuc2V0RGF0YXBvaW50cyh0aGlzLl9hdmFpbGFibGVUcmFjZURhdGFQb2ludHMpO1xyXG4gICAgICAgICAgICAvLyBVcGRhdGUgdG9vbGJhciBidXR0b25zID0+IHNob3cvaGlkZSBhZGQgZGF0YXBvaW50cyB0b29sYmFyIGJ1dHRvblxyXG4gICAgICAgICAgICBsZXQgZGF0YVBvaW50cyA9ICg8SVRyYWNlQ29uZmlnRGF0YXBvaW50c0RhdGFNb2RlbD50aGlzLl9kYXRhTW9kZWwpLmRhdGEgYXMgQXJyYXk8YW55PjtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVUb29sYmFyQnV0dG9uU3RhdGVzKGRhdGFQb2ludHMpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9ICAgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZWZyZXNoZXMgdGhlIGNvbnRlbnQgb2YgdGhlIGRhdGFwb2ludHMgcGFyYW1ldGVycyB2YWx1ZSBmaWVsZHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtEYXRhcG9pbnRbXX0gZGF0YXBvaW50c1xyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlZnJlc2hEYXRhcG9pbnRzVmFsdWVzKGRhdGFwb2ludHM6IFRyYWNlRGF0YVBvaW50W10pIHtcclxuXHJcbiAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICB0aGlzLnNldE1vZGVsKGRhdGFwb2ludHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaChlKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlVG9vbGJhckJ1dHRvblN0YXRlcyhkYXRhUG9pbnRzOkFycmF5PFRyYWNlRGF0YVBvaW50Pil7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHNlbGVjdGVkSXRlbSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB2YXIgdHJlZU9iaiA9IHRoaXMuZ2V0VHJlZUdyaWRPYmplY3QoKTtcclxuICAgICAgICBpZih0cmVlT2JqICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkSXRlbSA9ICg8YW55PnRyZWVPYmoubW9kZWwpLnNlbGVjdGVkSXRlbTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZGF0YVBvaW50cy5sZW5ndGggPiAzMSl7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2xiYXIuZGlzYWJsZUFkZEJ1dHRvbih0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbGJhci5kaXNhYmxlQWRkRW1wdHlCdXR0b24odHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX2F2YWlsYWJsZVRyYWNlRGF0YVBvaW50cy5sZW5ndGggPT0gMCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90b29sYmFyLmRpc2FibGVBZGRCdXR0b24odHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2xiYXIuZGlzYWJsZUFkZEJ1dHRvbihmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fdG9vbGJhci5kaXNhYmxlQWRkRW1wdHlCdXR0b24oZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihkYXRhUG9pbnRzLmxlbmd0aCA9PSAwIHx8IHNlbGVjdGVkSXRlbSA9PSB1bmRlZmluZWQgKXtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbGJhci5kaXNhYmxlUmVtb3ZlQnV0dG9uKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLl90b29sYmFyLmRpc2FibGVSZW1vdmVCdXR0b24oZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgVHJhY2VDb25maWdEYXRhcG9pbnRzV2lkZ2V0IH07Il19