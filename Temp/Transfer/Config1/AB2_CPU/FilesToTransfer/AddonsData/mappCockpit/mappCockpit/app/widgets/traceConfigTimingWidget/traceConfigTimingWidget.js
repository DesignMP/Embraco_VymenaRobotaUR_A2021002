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
define(["require", "exports", "../common/treeGridWidgetBase", "./view/traceConfigTimingTreeGridToolbar", "./view/traceConfigTimingTreeGridCellEditEvents", "./view/traceConfigTimingTreeGridCellEditTemplate", "./model/traceConfigTimingDataModel"], function (require, exports, treeGridWidgetBase_1, traceConfigTimingTreeGridToolbar_1, traceConfigTimingTreeGridCellEditEvents_1, traceConfigTimingTreeGridCellEditTemplate_1, traceConfigTimingDataModel_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * implements the TraceConfigTimingWidget
     *
     * @class TraceConfigTimingWidget
     * @extends {TreeGridWidgetBase}
     */
    var TraceConfigTimingWidget = /** @class */ (function (_super) {
        __extends(TraceConfigTimingWidget, _super);
        function TraceConfigTimingWidget() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /** initialize the widget
         *
         * @param {string} layoutContainerId
         * @memberof TraceConfigTimingWidget
         */
        TraceConfigTimingWidget.prototype.initialize = function (layoutContainerId) {
            _super.prototype.initialize.call(this, layoutContainerId, 30, 290);
            _super.prototype.setHeaderContent.call(this, "Timing");
            this.initFooterContent();
            // Set dynamic column settings
            _super.prototype.setDynamicColumn.call(this, 0, 100);
        };
        /** initialize the footer content
         *
         * @memberof TraceConfigTimingWidget
         */
        TraceConfigTimingWidget.prototype.initFooterContent = function () {
            var coTraceSetTimingImagePath = "widgets/traceConfigTimingWidget/resources/images/TraceTimingDiagram_TotalRecordingTime.svg";
            _super.prototype.setFooterContent.call(this, "Timing diagram:<br> \n        <img src=\"" + coTraceSetTimingImagePath + "\"></br>1... The first start trigger is detected.");
        };
        Object.defineProperty(TraceConfigTimingWidget.prototype, "timingParameters", {
            set: function (parameters) {
                var traceConfigTimingDataModel = new traceConfigTimingDataModel_1.TraceConfigTimingDataModel();
                traceConfigTimingDataModel.initialize();
                this.dataModel = traceConfigTimingDataModel;
                traceConfigTimingDataModel.initData = parameters;
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
         * @memberof TraceConfigTimingWidget
         */
        TraceConfigTimingWidget.prototype.handleModelChanged = function (sender, eventArgs) {
            this.refreshTimingParameterValues(this.dataModel.data);
        };
        /**
         * handles the changes of observed items requested by 'observeDataModelItems'
         *
         * @param {IDataModel} sender
         * @param {EventModelChangedArgs} data
         * @memberof TraceConfigTimingWidget
         */
        TraceConfigTimingWidget.prototype.handleModelItemsChanged = function (sender, eventArgs) {
            this.refreshTimingParameterValues(this.dataModel.data);
        };
        /** creates the tree grid for the timing informations
         *
         * @memberof TraceConfigTimingWidget
         */
        TraceConfigTimingWidget.prototype.createTreeGrid = function () {
            var _this = this;
            var cellEditEvents = new traceConfigTimingTreeGridCellEditEvents_1.TraceConfigTimingTreeGridCellEditEvents();
            $(this.cssParentContentId).ejTreeGrid(__assign(__assign(__assign(__assign({}, this.getTreeGridColumnDefinition()), this.getTreeGridColumnResizeSupport()), this.getTreeGridToolbarSupport()), { editSettings: {
                    allowEditing: true,
                    allowDeleting: false,
                }, create: function (args) { return _this.treeGridCreated(); }, beginEdit: function (args) { return cellEditEvents.beginEdit(args); }, endEdit: function (args) { return cellEditEvents.endEdit(args, _this.dataModel); } }));
        };
        /**
         * Returns the tree grid column definition
         *
         * @private
         * @returns {{}}
         * @memberof TraceConfigTimingWidget
         */
        TraceConfigTimingWidget.prototype.getTreeGridColumnDefinition = function () {
            var cellEditTemplate = traceConfigTimingTreeGridCellEditTemplate_1.TraceConfigTimingTreeGridCellEditTemplate.createInstance();
            return {
                columns: [
                    { field: "displayName", headerText: "Name" },
                    { field: "displayValue", headerText: "Value", width: "200", editType: "stringedit", editTemplate: cellEditTemplate },
                    { field: "engineeringunit", headerText: "Unit", width: "100" },
                ],
            };
        };
        /**
         * Returns the tree grid column resize settings
         *
         * @private
         * @returns {{}}
         * @memberof TraceConfigTimingWidget
         */
        TraceConfigTimingWidget.prototype.getTreeGridColumnResizeSupport = function () {
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
         * @memberof TraceConfigTimingWidget
         */
        TraceConfigTimingWidget.prototype.getTreeGridToolbarSupport = function () {
            this._toolbar = new traceConfigTimingTreeGridToolbar_1.TraceConfigTimingTreeGridToolbar(this.cssParentContentId);
            return {
                toolbarSettings: {
                    showToolbar: true,
                    customToolbarItems: this._toolbar.getCustomToolbars()
                },
            };
        };
        TraceConfigTimingWidget.prototype.treeGridCreated = function () {
            // Sets the custom toolbar icons
            this._toolbar.setStyleForToolbarIcons();
            // disable dummy button after creation
            this._toolbar.disableDummyButton();
        };
        /**
         * refreshes the content of the timing parameters value fields
         *
         * @private
         * @param {TimingParameter[]} timingParameters
         * @memberof TraceConfigTimingWidget
         */
        TraceConfigTimingWidget.prototype.refreshTimingParameterValues = function (timingParameters) {
            $(this.cssParentContentId).ejTreeGrid({
                dataSource: timingParameters,
            });
        };
        return TraceConfigTimingWidget;
    }(treeGridWidgetBase_1.TreeGridWidgetBase));
    exports.TraceConfigTimingWidget = TraceConfigTimingWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VDb25maWdUaW1pbmdXaWRnZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvdHJhY2VDb25maWdUaW1pbmdXaWRnZXQvdHJhY2VDb25maWdUaW1pbmdXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBV0E7Ozs7O09BS0c7SUFDSDtRQUFzQywyQ0FBa0I7UUFBeEQ7O1FBdUpBLENBQUM7UUFsSkc7Ozs7V0FJRztRQUNILDRDQUFVLEdBQVYsVUFBVyxpQkFBeUI7WUFDaEMsaUJBQU0sVUFBVSxZQUFDLGlCQUFpQixFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUM3QyxpQkFBTSxnQkFBZ0IsWUFBQyxRQUFRLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUV6Qiw4QkFBOEI7WUFDOUIsaUJBQU0sZ0JBQWdCLFlBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ25DLENBQUM7UUFFRDs7O1dBR0c7UUFDSyxtREFBaUIsR0FBekI7WUFDSSxJQUFJLHlCQUF5QixHQUFHLDRGQUE0RixDQUFDO1lBQzdILGlCQUFNLGdCQUFnQixZQUFDLDJDQUNaLEdBQUcseUJBQXlCLEdBQUcsbURBQWtELENBQUMsQ0FBQztRQUNsRyxDQUFDO1FBRUQsc0JBQUkscURBQWdCO2lCQUFwQixVQUFxQixVQUEyQztnQkFDNUQsSUFBSSwwQkFBMEIsR0FBRyxJQUFJLHVEQUEwQixFQUFpQyxDQUFDO2dCQUNqRywwQkFBMEIsQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDeEMsSUFBSSxDQUFDLFNBQVMsR0FBRywwQkFBMEIsQ0FBQztnQkFDNUMsMEJBQTBCLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztZQUNyRCxDQUFDOzs7V0FBQTtRQUVEOzs7Ozs7O1dBT0c7UUFDSCxvREFBa0IsR0FBbEIsVUFBbUIs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Ozs7OztXQU1HO1FBQ0ssOERBQTRCLEdBQXBDLFVBQXFDLGdCQUFtQztZQUM5RCxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFFLENBQUMsVUFBVSxDQUFDO2dCQUN6QyxVQUFVLEVBQUUsZ0JBQWdCO2FBQy9CLENBQUMsQ0FBQztRQUNQLENBQUM7UUFDTCw4QkFBQztJQUFELENBQUMsQUF2SkQsQ0FBc0MsdUNBQWtCLEdBdUp2RDtJQUVRLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElUcmFjZUNvbmZpZ1RpbWluZ1dpZGdldCB9IGZyb20gXCIuL2ludGVyZmFjZXMvdHJhY2VDb25maWdUaW1pbmdXaWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVHJlZUdyaWRXaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi90cmVlR3JpZFdpZGdldEJhc2VcIjtcclxuaW1wb3J0IHsgSURhdGFNb2RlbCwgRXZlbnRNb2RlbENoYW5nZWRBcmdzIH0gZnJvbSBcIi4uLy4uL21vZGVscy9kYXRhTW9kZWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVGltaW5nUGFyYW1ldGVyIH0gZnJvbSBcIi4vbW9kZWwvdGltaW5nUGFyYW1ldGVyXCI7XHJcbmltcG9ydCB7IFRyYWNlQ29uZmlnVGltaW5nVHJlZUdyaWRUb29sYmFyIH0gZnJvbSBcIi4vdmlldy90cmFjZUNvbmZpZ1RpbWluZ1RyZWVHcmlkVG9vbGJhclwiO1xyXG5pbXBvcnQgeyBUcmFjZUNvbmZpZ1RpbWluZ1RyZWVHcmlkQ2VsbEVkaXRFdmVudHMgfSBmcm9tIFwiLi92aWV3L3RyYWNlQ29uZmlnVGltaW5nVHJlZUdyaWRDZWxsRWRpdEV2ZW50c1wiO1xyXG5pbXBvcnQgeyBJVHJhY2VDb25maWdUaW1pbmdEYXRhTW9kZWwgfSBmcm9tIFwiLi9tb2RlbC90cmFjZUNvbmZpZ1RpbWluZ0RhdGFNb2RlbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUcmFjZUNvbmZpZ1RpbWluZ1RyZWVHcmlkQ2VsbEVkaXRUZW1wbGF0ZSB9IGZyb20gXCIuL3ZpZXcvdHJhY2VDb25maWdUaW1pbmdUcmVlR3JpZENlbGxFZGl0VGVtcGxhdGVcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBUcmFjZUNvbmZpZ1RpbWluZ0RhdGFNb2RlbCB9IGZyb20gXCIuL21vZGVsL3RyYWNlQ29uZmlnVGltaW5nRGF0YU1vZGVsXCI7XHJcblxyXG4vKipcclxuICogaW1wbGVtZW50cyB0aGUgVHJhY2VDb25maWdUaW1pbmdXaWRnZXRcclxuICpcclxuICogQGNsYXNzIFRyYWNlQ29uZmlnVGltaW5nV2lkZ2V0XHJcbiAqIEBleHRlbmRzIHtUcmVlR3JpZFdpZGdldEJhc2V9XHJcbiAqL1xyXG5jbGFzcyBUcmFjZUNvbmZpZ1RpbWluZ1dpZGdldCBleHRlbmRzIFRyZWVHcmlkV2lkZ2V0QmFzZSBpbXBsZW1lbnRzIElUcmFjZUNvbmZpZ1RpbWluZ1dpZGdldCB7XHJcblxyXG4gICAgcHJpdmF0ZSBfdG9vbGJhciE6IFRyYWNlQ29uZmlnVGltaW5nVHJlZUdyaWRUb29sYmFyO1xyXG5cclxuXHJcbiAgICAvKiogaW5pdGlhbGl6ZSB0aGUgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxheW91dENvbnRhaW5lcklkXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdUaW1pbmdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgaW5pdGlhbGl6ZShsYXlvdXRDb250YWluZXJJZDogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZShsYXlvdXRDb250YWluZXJJZCwgMzAsIDI5MCk7XHJcbiAgICAgICAgc3VwZXIuc2V0SGVhZGVyQ29udGVudChcIlRpbWluZ1wiKTtcclxuICAgICAgICB0aGlzLmluaXRGb290ZXJDb250ZW50KCk7XHJcblxyXG4gICAgICAgIC8vIFNldCBkeW5hbWljIGNvbHVtbiBzZXR0aW5nc1xyXG4gICAgICAgIHN1cGVyLnNldER5bmFtaWNDb2x1bW4oMCwgMTAwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogaW5pdGlhbGl6ZSB0aGUgZm9vdGVyIGNvbnRlbnRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdUaW1pbmdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbml0Rm9vdGVyQ29udGVudCgpe1xyXG4gICAgICAgIGxldCBjb1RyYWNlU2V0VGltaW5nSW1hZ2VQYXRoID0gXCJ3aWRnZXRzL3RyYWNlQ29uZmlnVGltaW5nV2lkZ2V0L3Jlc291cmNlcy9pbWFnZXMvVHJhY2VUaW1pbmdEaWFncmFtX1RvdGFsUmVjb3JkaW5nVGltZS5zdmdcIjtcclxuICAgICAgICBzdXBlci5zZXRGb290ZXJDb250ZW50KGBUaW1pbmcgZGlhZ3JhbTo8YnI+IFxyXG4gICAgICAgIDxpbWcgc3JjPVwiYCArIGNvVHJhY2VTZXRUaW1pbmdJbWFnZVBhdGggKyBgXCI+PC9icj4xLi4uIFRoZSBmaXJzdCBzdGFydCB0cmlnZ2VyIGlzIGRldGVjdGVkLmApO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCB0aW1pbmdQYXJhbWV0ZXJzKHBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pe1xyXG4gICAgICAgIGxldCB0cmFjZUNvbmZpZ1RpbWluZ0RhdGFNb2RlbCA9IG5ldyBUcmFjZUNvbmZpZ1RpbWluZ0RhdGFNb2RlbCgpIGFzIElUcmFjZUNvbmZpZ1RpbWluZ0RhdGFNb2RlbDtcclxuICAgICAgICB0cmFjZUNvbmZpZ1RpbWluZ0RhdGFNb2RlbC5pbml0aWFsaXplKCk7XHJcbiAgICAgICAgdGhpcy5kYXRhTW9kZWwgPSB0cmFjZUNvbmZpZ1RpbWluZ0RhdGFNb2RlbDtcclxuICAgICAgICB0cmFjZUNvbmZpZ1RpbWluZ0RhdGFNb2RlbC5pbml0RGF0YSA9IHBhcmFtZXRlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBpbXBsZW1lbnRzIHRoZSBtb2RlbCBjaGFuZ2UgaGFuZGxpbmdcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lEYXRhTW9kZWx9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHtFdmVudE1vZGVsQ2hhbmdlZEFyZ3N9IGRhdGFcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVGltaW5nV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGhhbmRsZU1vZGVsQ2hhbmdlZChzZW5kZXI6IElEYXRhTW9kZWwsIGV2ZW50QXJnczogRXZlbnRNb2RlbENoYW5nZWRBcmdzKTogYW55IHtcclxuICAgICAgICB0aGlzLnJlZnJlc2hUaW1pbmdQYXJhbWV0ZXJWYWx1ZXModGhpcy5kYXRhTW9kZWwuZGF0YSBhcyBBcnJheTxUaW1pbmdQYXJhbWV0ZXI+KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGhhbmRsZXMgdGhlIGNoYW5nZXMgb2Ygb2JzZXJ2ZWQgaXRlbXMgcmVxdWVzdGVkIGJ5ICdvYnNlcnZlRGF0YU1vZGVsSXRlbXMnXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJRGF0YU1vZGVsfSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7RXZlbnRNb2RlbENoYW5nZWRBcmdzfSBkYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdUaW1pbmdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgaGFuZGxlTW9kZWxJdGVtc0NoYW5nZWQoc2VuZGVyOiBJRGF0YU1vZGVsLCBldmVudEFyZ3M6IEV2ZW50TW9kZWxDaGFuZ2VkQXJncykge1xyXG4gICAgICAgIHRoaXMucmVmcmVzaFRpbWluZ1BhcmFtZXRlclZhbHVlcyh0aGlzLmRhdGFNb2RlbC5kYXRhIGFzIEFycmF5PFRpbWluZ1BhcmFtZXRlcj4pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKiogY3JlYXRlcyB0aGUgdHJlZSBncmlkIGZvciB0aGUgdGltaW5nIGluZm9ybWF0aW9uc1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1RpbWluZ1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlVHJlZUdyaWQoKSB7XHJcbiAgICAgICAgdmFyIGNlbGxFZGl0RXZlbnRzID0gbmV3IFRyYWNlQ29uZmlnVGltaW5nVHJlZUdyaWRDZWxsRWRpdEV2ZW50cygpO1xyXG5cclxuICAgICAgICAoPGFueT4kKHRoaXMuY3NzUGFyZW50Q29udGVudElkKSkuZWpUcmVlR3JpZCh7XHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCksXHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRDb2x1bW5SZXNpemVTdXBwb3J0KCksXHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRUb29sYmFyU3VwcG9ydCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBlZGl0U2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgIGFsbG93RWRpdGluZzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGFsbG93RGVsZXRpbmcgOiBmYWxzZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY3JlYXRlOiAoYXJncykgPT4gdGhpcy50cmVlR3JpZENyZWF0ZWQoKSxcclxuICAgICAgICAgICAgYmVnaW5FZGl0OiAoYXJncykgPT4gY2VsbEVkaXRFdmVudHMuYmVnaW5FZGl0KGFyZ3MpLFxyXG4gICAgICAgICAgICBlbmRFZGl0OiAoYXJncykgPT4gY2VsbEVkaXRFdmVudHMuZW5kRWRpdChhcmdzLCA8SVRyYWNlQ29uZmlnVGltaW5nRGF0YU1vZGVsPnRoaXMuZGF0YU1vZGVsKSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCBjb2x1bW4gZGVmaW5pdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdUaW1pbmdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmVlR3JpZENvbHVtbkRlZmluaXRpb24oKToge317XHJcbiAgICAgICAgbGV0IGNlbGxFZGl0VGVtcGxhdGUgPSBUcmFjZUNvbmZpZ1RpbWluZ1RyZWVHcmlkQ2VsbEVkaXRUZW1wbGF0ZS5jcmVhdGVJbnN0YW5jZSgpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNvbHVtbnM6IFtcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwiZGlzcGxheU5hbWVcIiwgaGVhZGVyVGV4dDogXCJOYW1lXCJ9LFxyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJkaXNwbGF5VmFsdWVcIiwgaGVhZGVyVGV4dDogXCJWYWx1ZVwiLCB3aWR0aDogXCIyMDBcIiwgZWRpdFR5cGU6IFwic3RyaW5nZWRpdFwiLCBlZGl0VGVtcGxhdGU6IGNlbGxFZGl0VGVtcGxhdGV9LFxyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJlbmdpbmVlcmluZ3VuaXRcIiwgaGVhZGVyVGV4dDogXCJVbml0XCIsIHdpZHRoOiBcIjEwMFwifSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJlZSBncmlkIGNvbHVtbiByZXNpemUgc2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVGltaW5nV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VHJlZUdyaWRDb2x1bW5SZXNpemVTdXBwb3J0KCk6IHt9e1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGFsbG93Q29sdW1uUmVzaXplOiB0cnVlLFxyXG4gICAgICAgICAgICBjb2x1bW5SZXNpemVTZXR0aW5nczogeyBjb2x1bW5SZXNpemVNb2RlOiBlai5UcmVlR3JpZC5Db2x1bW5SZXNpemVNb2RlLkZpeGVkQ29sdW1ucyB9LFxyXG4gICAgICAgICAgICBjb2x1bW5SZXNpemVkOiAoYXJncykgPT4gc3VwZXIucmVzaXplRHluYW1pY0NvbHVtbihhcmdzLmNvbHVtbkluZGV4LCBhcmdzLm1vZGVsKSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJlZSBncmlkIHRvb2xiYXIgc2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVGltaW5nV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VHJlZUdyaWRUb29sYmFyU3VwcG9ydCgpOiB7fXtcclxuICAgICAgICB0aGlzLl90b29sYmFyID0gbmV3IFRyYWNlQ29uZmlnVGltaW5nVHJlZUdyaWRUb29sYmFyKHRoaXMuY3NzUGFyZW50Q29udGVudElkKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0b29sYmFyU2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgIHNob3dUb29sYmFyOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tVG9vbGJhckl0ZW1zOiB0aGlzLl90b29sYmFyLmdldEN1c3RvbVRvb2xiYXJzKClcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdHJlZUdyaWRDcmVhdGVkKCl7XHJcbiAgICAgICAgLy8gU2V0cyB0aGUgY3VzdG9tIHRvb2xiYXIgaWNvbnNcclxuICAgICAgICB0aGlzLl90b29sYmFyLnNldFN0eWxlRm9yVG9vbGJhckljb25zKCk7XHJcblxyXG4gICAgICAgIC8vIGRpc2FibGUgZHVtbXkgYnV0dG9uIGFmdGVyIGNyZWF0aW9uXHJcbiAgICAgICAgdGhpcy5fdG9vbGJhci5kaXNhYmxlRHVtbXlCdXR0b24oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlZnJlc2hlcyB0aGUgY29udGVudCBvZiB0aGUgdGltaW5nIHBhcmFtZXRlcnMgdmFsdWUgZmllbGRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7VGltaW5nUGFyYW1ldGVyW119IHRpbWluZ1BhcmFtZXRlcnNcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1RpbWluZ1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlZnJlc2hUaW1pbmdQYXJhbWV0ZXJWYWx1ZXModGltaW5nUGFyYW1ldGVyczogVGltaW5nUGFyYW1ldGVyW10pIHtcclxuICAgICAgICAoPGFueT4kKHRoaXMuY3NzUGFyZW50Q29udGVudElkKSkuZWpUcmVlR3JpZCh7XHJcbiAgICAgICAgICAgIGRhdGFTb3VyY2U6IHRpbWluZ1BhcmFtZXRlcnMsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IFRyYWNlQ29uZmlnVGltaW5nV2lkZ2V0IH07Il19