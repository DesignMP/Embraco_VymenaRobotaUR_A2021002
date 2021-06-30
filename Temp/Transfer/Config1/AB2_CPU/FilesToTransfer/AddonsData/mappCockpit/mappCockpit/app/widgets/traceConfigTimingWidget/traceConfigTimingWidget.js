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
define(["require", "exports", "../common/treeGridWidgetBase", "./view/traceConfigTimingTreeGridToolbar", "./view/traceConfigTimingTreeGridCellEditEvents", "./view/traceConfigTimingTreeGridCellEditTemplate", "./model/traceConfigTimingDataModel", "./defaultComponentSettings"], function (require, exports, treeGridWidgetBase_1, traceConfigTimingTreeGridToolbar_1, traceConfigTimingTreeGridCellEditEvents_1, traceConfigTimingTreeGridCellEditTemplate_1, traceConfigTimingDataModel_1, defaultComponentSettings_1) {
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
        };
        TraceConfigTimingWidget.prototype.initializeComponent = function () {
            this.component.defaultSettingsDataId = defaultComponentSettings_1.DefaultComponentSettings.WidgetDefinitionId;
            this.component.disablePersisting();
        };
        TraceConfigTimingWidget.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            _super.prototype.setHeaderContent.call(this, "Timing");
            this.initFooterContent();
            // Set dynamic column settings
            _super.prototype.setDynamicColumn.call(this, 0, 100);
        };
        /**
         * Processes trace timing parameter changes
         *
         * @private
         * @param {MappCockpitComponentParameter[]} traceTimingParameters
         * @memberof TraceConfigTimingWidget
         */
        TraceConfigTimingWidget.prototype.initializeTraceTimingParameters = function (traceTimingParameters) {
            if (traceTimingParameters.length > 0) {
                var traceConfigTimingDataModel = new traceConfigTimingDataModel_1.TraceConfigTimingDataModel();
                traceConfigTimingDataModel.initialize();
                this.dataModel = traceConfigTimingDataModel;
                traceConfigTimingDataModel.initData = traceTimingParameters;
            }
        };
        /**
         * Returns the default component settings for this widget
         *
         * @returns {(ComponentSettings|undefined)}
         * @memberof TraceConfigTimingWidget
         */
        TraceConfigTimingWidget.prototype.getDefaultComponentSettings = function () {
            return defaultComponentSettings_1.DefaultComponentSettings.getTraceConfigurationTimingDefinition();
        };
        /** initialize the footer content
         *
         * @memberof TraceConfigTimingWidget
         */
        TraceConfigTimingWidget.prototype.initFooterContent = function () {
            var coTraceSetTimingImagePath = "widgets/traceConfigTimingWidget/resources/images/TraceTimingDiagram_TotalRecordingTime.svg";
            _super.prototype.setFooterContent.call(this, "Timing diagram:<br> \n        <img src=\"" + coTraceSetTimingImagePath + "\"></br>1... The first start trigger is detected.");
        };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VDb25maWdUaW1pbmdXaWRnZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvdHJhY2VDb25maWdUaW1pbmdXaWRnZXQvdHJhY2VDb25maWdUaW1pbmdXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBYUE7Ozs7O09BS0c7SUFDSDtRQUFzQywyQ0FBa0I7UUFBeEQ7O1FBcUxBLENBQUM7UUFqTEc7Ozs7V0FJRztRQUNILDRDQUFVLEdBQVYsVUFBVyxpQkFBeUI7WUFDaEMsaUJBQU0sVUFBVSxZQUFDLGlCQUFpQixFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNqRCxDQUFDO1FBRUQscURBQW1CLEdBQW5CO1lBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsR0FBRyxtREFBd0IsQ0FBQyxrQkFBa0IsQ0FBQztZQUNuRixJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDdkMsQ0FBQztRQUdELDZDQUFXLEdBQVg7WUFDSSxpQkFBTSxXQUFXLFdBQUUsQ0FBQztZQUVwQixpQkFBTSxnQkFBZ0IsWUFBQyxRQUFRLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUV6Qiw4QkFBOEI7WUFDOUIsaUJBQU0sZ0JBQWdCLFlBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ25DLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSyxpRUFBK0IsR0FBdkMsVUFBd0MscUJBQXNEO1lBQzFGLElBQUcscUJBQXFCLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQztnQkFDaEMsSUFBSSwwQkFBMEIsR0FBRyxJQUFJLHVEQUEwQixFQUFpQyxDQUFDO2dCQUNqRywwQkFBMEIsQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDeEMsSUFBSSxDQUFDLFNBQVMsR0FBRywwQkFBMEIsQ0FB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LEdBQUcsSUFBSSxtRUFBZ0MsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUM5RSxPQUFPO2dCQUNILGVBQWUsRUFBRTtvQkFDYixXQUFXLEVBQUUsSUFBSTtvQkFDakIsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRTtpQkFDeEQ7YUFDSixDQUFDO1FBQ04sQ0FBQztRQUVPLGlEQUFlLEdBQXZCO1lBQ0ksZ0NBQWdDO1lBQ2hDLElBQUksQ0FBQyxRQUFRLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztZQUV4QyxzQ0FBc0M7WUFDdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQ3ZDLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSyw4REFBNEIsR0FBcEMsVUFBcUMsZ0JBQW1DO1lBQzlELENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUUsQ0FBQyxVQUFVLENBQUM7Z0JBQ3pDLFVBQVUsRUFBRSxnQkFBZ0I7YUFDL0IsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUNMLDhCQUFDO0lBQUQsQ0FBQyxBQXJMRCxDQUFzQyx1Q0FBa0IsR0FxTHZEO0lBRVEsMERBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVRyYWNlQ29uZmlnVGltaW5nV2lkZ2V0IH0gZnJvbSBcIi4vaW50ZXJmYWNlcy90cmFjZUNvbmZpZ1RpbWluZ1dpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUcmVlR3JpZFdpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL3RyZWVHcmlkV2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBJRGF0YU1vZGVsLCBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2RhdGFNb2RlbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUaW1pbmdQYXJhbWV0ZXIgfSBmcm9tIFwiLi9tb2RlbC90aW1pbmdQYXJhbWV0ZXJcIjtcclxuaW1wb3J0IHsgVHJhY2VDb25maWdUaW1pbmdUcmVlR3JpZFRvb2xiYXIgfSBmcm9tIFwiLi92aWV3L3RyYWNlQ29uZmlnVGltaW5nVHJlZUdyaWRUb29sYmFyXCI7XHJcbmltcG9ydCB7IFRyYWNlQ29uZmlnVGltaW5nVHJlZUdyaWRDZWxsRWRpdEV2ZW50cyB9IGZyb20gXCIuL3ZpZXcvdHJhY2VDb25maWdUaW1pbmdUcmVlR3JpZENlbGxFZGl0RXZlbnRzXCI7XHJcbmltcG9ydCB7IElUcmFjZUNvbmZpZ1RpbWluZ0RhdGFNb2RlbCB9IGZyb20gXCIuL21vZGVsL3RyYWNlQ29uZmlnVGltaW5nRGF0YU1vZGVsSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFRyYWNlQ29uZmlnVGltaW5nVHJlZUdyaWRDZWxsRWRpdFRlbXBsYXRlIH0gZnJvbSBcIi4vdmlldy90cmFjZUNvbmZpZ1RpbWluZ1RyZWVHcmlkQ2VsbEVkaXRUZW1wbGF0ZVwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFRyYWNlQ29uZmlnVGltaW5nRGF0YU1vZGVsIH0gZnJvbSBcIi4vbW9kZWwvdHJhY2VDb25maWdUaW1pbmdEYXRhTW9kZWxcIjtcclxuaW1wb3J0IHsgRGVmYXVsdENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4vZGVmYXVsdENvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcblxyXG4vKipcclxuICogaW1wbGVtZW50cyB0aGUgVHJhY2VDb25maWdUaW1pbmdXaWRnZXRcclxuICpcclxuICogQGNsYXNzIFRyYWNlQ29uZmlnVGltaW5nV2lkZ2V0XHJcbiAqIEBleHRlbmRzIHtUcmVlR3JpZFdpZGdldEJhc2V9XHJcbiAqL1xyXG5jbGFzcyBUcmFjZUNvbmZpZ1RpbWluZ1dpZGdldCBleHRlbmRzIFRyZWVHcmlkV2lkZ2V0QmFzZSBpbXBsZW1lbnRzIElUcmFjZUNvbmZpZ1RpbWluZ1dpZGdldCB7XHJcblxyXG4gICAgcHJpdmF0ZSBfdG9vbGJhciE6IFRyYWNlQ29uZmlnVGltaW5nVHJlZUdyaWRUb29sYmFyO1xyXG5cclxuICAgIC8qKiBpbml0aWFsaXplIHRoZSB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGF5b3V0Q29udGFpbmVySWRcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1RpbWluZ1dpZGdldFxyXG4gICAgICovXHJcbiAgICBpbml0aWFsaXplKGxheW91dENvbnRhaW5lcklkOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlci5pbml0aWFsaXplKGxheW91dENvbnRhaW5lcklkLCAzMCwgMjkwKTtcclxuICAgIH1cclxuICAgXHJcbiAgICBpbml0aWFsaXplQ29tcG9uZW50KCl7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZGVmYXVsdFNldHRpbmdzRGF0YUlkID0gRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLldpZGdldERlZmluaXRpb25JZDtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5kaXNhYmxlUGVyc2lzdGluZygpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBpbml0aWFsaXplZCgpe1xyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemVkKCk7XHJcblxyXG4gICAgICAgIHN1cGVyLnNldEhlYWRlckNvbnRlbnQoXCJUaW1pbmdcIik7XHJcbiAgICAgICAgdGhpcy5pbml0Rm9vdGVyQ29udGVudCgpO1xyXG5cclxuICAgICAgICAvLyBTZXQgZHluYW1pYyBjb2x1bW4gc2V0dGluZ3NcclxuICAgICAgICBzdXBlci5zZXREeW5hbWljQ29sdW1uKDAsIDEwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQcm9jZXNzZXMgdHJhY2UgdGltaW5nIHBhcmFtZXRlciBjaGFuZ2VzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gdHJhY2VUaW1pbmdQYXJhbWV0ZXJzXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdUaW1pbmdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbml0aWFsaXplVHJhY2VUaW1pbmdQYXJhbWV0ZXJzKHRyYWNlVGltaW5nUGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSk6IHZvaWQge1xyXG4gICAgICAgIGlmKHRyYWNlVGltaW5nUGFyYW1ldGVycy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgbGV0IHRyYWNlQ29uZmlnVGltaW5nRGF0YU1vZGVsID0gbmV3IFRyYWNlQ29uZmlnVGltaW5nRGF0YU1vZGVsKCkgYXMgSVRyYWNlQ29uZmlnVGltaW5nRGF0YU1vZGVsO1xyXG4gICAgICAgICAgICB0cmFjZUNvbmZpZ1RpbWluZ0RhdGFNb2RlbC5pbml0aWFsaXplKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YU1vZGVsID0gdHJhY2VDb25maWdUaW1pbmdEYXRhTW9kZWw7XHJcbiAgICAgICAgICAgIHRyYWNlQ29uZmlnVGltaW5nRGF0YU1vZGVsLmluaXREYXRhID0gdHJhY2VUaW1pbmdQYXJhbWV0ZXJzOyBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IGNvbXBvbmVudCBzZXR0aW5ncyBmb3IgdGhpcyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7KENvbXBvbmVudFNldHRpbmdzfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdUaW1pbmdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgZ2V0RGVmYXVsdENvbXBvbmVudFNldHRpbmdzKCk6IENvbXBvbmVudFNldHRpbmdzfHVuZGVmaW5lZHtcclxuICAgICAgICByZXR1cm4gRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLmdldFRyYWNlQ29uZmlndXJhdGlvblRpbWluZ0RlZmluaXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIC8qKiBpbml0aWFsaXplIHRoZSBmb290ZXIgY29udGVudFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1RpbWluZ1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGluaXRGb290ZXJDb250ZW50KCl7XHJcbiAgICAgICAgbGV0IGNvVHJhY2VTZXRUaW1pbmdJbWFnZVBhdGggPSBcIndpZGdldHMvdHJhY2VDb25maWdUaW1pbmdXaWRnZXQvcmVzb3VyY2VzL2ltYWdlcy9UcmFjZVRpbWluZ0RpYWdyYW1fVG90YWxSZWNvcmRpbmdUaW1lLnN2Z1wiO1xyXG4gICAgICAgIHN1cGVyLnNldEZvb3RlckNvbnRlbnQoYFRpbWluZyBkaWFncmFtOjxicj4gXHJcbiAgICAgICAgPGltZyBzcmM9XCJgICsgY29UcmFjZVNldFRpbWluZ0ltYWdlUGF0aCArIGBcIj48L2JyPjEuLi4gVGhlIGZpcnN0IHN0YXJ0IHRyaWdnZXIgaXMgZGV0ZWN0ZWQuYCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBpbXBsZW1lbnRzIHRoZSBtb2RlbCBjaGFuZ2UgaGFuZGxpbmdcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lEYXRhTW9kZWx9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHtFdmVudE1vZGVsQ2hhbmdlZEFyZ3N9IGRhdGFcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVGltaW5nV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGhhbmRsZU1vZGVsQ2hhbmdlZChzZW5kZXI6IElEYXRhTW9kZWwsIGV2ZW50QXJnczogRXZlbnRNb2RlbENoYW5nZWRBcmdzKTogYW55IHtcclxuICAgICAgICB0aGlzLnJlZnJlc2hUaW1pbmdQYXJhbWV0ZXJWYWx1ZXModGhpcy5kYXRhTW9kZWwuZGF0YSBhcyBBcnJheTxUaW1pbmdQYXJhbWV0ZXI+KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGhhbmRsZXMgdGhlIGNoYW5nZXMgb2Ygb2JzZXJ2ZWQgaXRlbXMgcmVxdWVzdGVkIGJ5ICdvYnNlcnZlRGF0YU1vZGVsSXRlbXMnXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJRGF0YU1vZGVsfSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7RXZlbnRNb2RlbENoYW5nZWRBcmdzfSBkYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdUaW1pbmdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgaGFuZGxlTW9kZWxJdGVtc0NoYW5nZWQoc2VuZGVyOiBJRGF0YU1vZGVsLCBldmVudEFyZ3M6IEV2ZW50TW9kZWxDaGFuZ2VkQXJncykge1xyXG4gICAgICAgIHRoaXMucmVmcmVzaFRpbWluZ1BhcmFtZXRlclZhbHVlcyh0aGlzLmRhdGFNb2RlbC5kYXRhIGFzIEFycmF5PFRpbWluZ1BhcmFtZXRlcj4pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKiogY3JlYXRlcyB0aGUgdHJlZSBncmlkIGZvciB0aGUgdGltaW5nIGluZm9ybWF0aW9uc1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1RpbWluZ1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlVHJlZUdyaWQoKSB7XHJcbiAgICAgICAgdmFyIGNlbGxFZGl0RXZlbnRzID0gbmV3IFRyYWNlQ29uZmlnVGltaW5nVHJlZUdyaWRDZWxsRWRpdEV2ZW50cygpO1xyXG5cclxuICAgICAgICAoPGFueT4kKHRoaXMuY3NzUGFyZW50Q29udGVudElkKSkuZWpUcmVlR3JpZCh7XHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCksXHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRDb2x1bW5SZXNpemVTdXBwb3J0KCksXHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRUb29sYmFyU3VwcG9ydCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBlZGl0U2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgIGFsbG93RWRpdGluZzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGFsbG93RGVsZXRpbmcgOiBmYWxzZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY3JlYXRlOiAoYXJncykgPT4gdGhpcy50cmVlR3JpZENyZWF0ZWQoKSxcclxuICAgICAgICAgICAgYmVnaW5FZGl0OiAoYXJncykgPT4gY2VsbEVkaXRFdmVudHMuYmVnaW5FZGl0KGFyZ3MpLFxyXG4gICAgICAgICAgICBlbmRFZGl0OiAoYXJncykgPT4gY2VsbEVkaXRFdmVudHMuZW5kRWRpdChhcmdzLCA8SVRyYWNlQ29uZmlnVGltaW5nRGF0YU1vZGVsPnRoaXMuZGF0YU1vZGVsKSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCBjb2x1bW4gZGVmaW5pdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdUaW1pbmdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmVlR3JpZENvbHVtbkRlZmluaXRpb24oKToge317XHJcbiAgICAgICAgbGV0IGNlbGxFZGl0VGVtcGxhdGUgPSBUcmFjZUNvbmZpZ1RpbWluZ1RyZWVHcmlkQ2VsbEVkaXRUZW1wbGF0ZS5jcmVhdGVJbnN0YW5jZSgpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNvbHVtbnM6IFtcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwiZGlzcGxheU5hbWVcIiwgaGVhZGVyVGV4dDogXCJOYW1lXCJ9LFxyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJkaXNwbGF5VmFsdWVcIiwgaGVhZGVyVGV4dDogXCJWYWx1ZVwiLCB3aWR0aDogXCIyMDBcIiwgZWRpdFR5cGU6IFwic3RyaW5nZWRpdFwiLCBlZGl0VGVtcGxhdGU6IGNlbGxFZGl0VGVtcGxhdGV9LFxyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJlbmdpbmVlcmluZ3VuaXRcIiwgaGVhZGVyVGV4dDogXCJVbml0XCIsIHdpZHRoOiBcIjEwMFwifSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJlZSBncmlkIGNvbHVtbiByZXNpemUgc2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVGltaW5nV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VHJlZUdyaWRDb2x1bW5SZXNpemVTdXBwb3J0KCk6IHt9e1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGFsbG93Q29sdW1uUmVzaXplOiB0cnVlLFxyXG4gICAgICAgICAgICBjb2x1bW5SZXNpemVTZXR0aW5nczogeyBjb2x1bW5SZXNpemVNb2RlOiBlai5UcmVlR3JpZC5Db2x1bW5SZXNpemVNb2RlLkZpeGVkQ29sdW1ucyB9LFxyXG4gICAgICAgICAgICBjb2x1bW5SZXNpemVkOiAoYXJncykgPT4gc3VwZXIucmVzaXplRHluYW1pY0NvbHVtbihhcmdzLmNvbHVtbkluZGV4LCBhcmdzLm1vZGVsKSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJlZSBncmlkIHRvb2xiYXIgc2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVGltaW5nV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VHJlZUdyaWRUb29sYmFyU3VwcG9ydCgpOiB7fXtcclxuICAgICAgICB0aGlzLl90b29sYmFyID0gbmV3IFRyYWNlQ29uZmlnVGltaW5nVHJlZUdyaWRUb29sYmFyKHRoaXMuY3NzUGFyZW50Q29udGVudElkKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0b29sYmFyU2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgIHNob3dUb29sYmFyOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tVG9vbGJhckl0ZW1zOiB0aGlzLl90b29sYmFyLmdldEN1c3RvbVRvb2xiYXJzKClcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdHJlZUdyaWRDcmVhdGVkKCl7XHJcbiAgICAgICAgLy8gU2V0cyB0aGUgY3VzdG9tIHRvb2xiYXIgaWNvbnNcclxuICAgICAgICB0aGlzLl90b29sYmFyLnNldFN0eWxlRm9yVG9vbGJhckljb25zKCk7XHJcblxyXG4gICAgICAgIC8vIGRpc2FibGUgZHVtbXkgYnV0dG9uIGFmdGVyIGNyZWF0aW9uXHJcbiAgICAgICAgdGhpcy5fdG9vbGJhci5kaXNhYmxlRHVtbXlCdXR0b24oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlZnJlc2hlcyB0aGUgY29udGVudCBvZiB0aGUgdGltaW5nIHBhcmFtZXRlcnMgdmFsdWUgZmllbGRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7VGltaW5nUGFyYW1ldGVyW119IHRpbWluZ1BhcmFtZXRlcnNcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1RpbWluZ1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlZnJlc2hUaW1pbmdQYXJhbWV0ZXJWYWx1ZXModGltaW5nUGFyYW1ldGVyczogVGltaW5nUGFyYW1ldGVyW10pIHtcclxuICAgICAgICAoPGFueT4kKHRoaXMuY3NzUGFyZW50Q29udGVudElkKSkuZWpUcmVlR3JpZCh7XHJcbiAgICAgICAgICAgIGRhdGFTb3VyY2U6IHRpbWluZ1BhcmFtZXRlcnMsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IFRyYWNlQ29uZmlnVGltaW5nV2lkZ2V0IH07Il19