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
define(["require", "exports", "./model/configManagerWidgetDataModel", "../../models/dataModelInterface", "../common/treeGridWidgetBase", "./view/cmTreeGridCellEditTemplate", "./view/cmTreeGridCellEditEvents", "./view/cmTreeGridCellStyle", "./view/cmTreeGridToolbar", "../../framework/property", "../../models/online/mappCockpitComponent", "../../models/dataModels"], function (require, exports, configManagerWidgetDataModel_1, dataModelInterface_1, treeGridWidgetBase_1, cmTreeGridCellEditTemplate_1, cmTreeGridCellEditEvents_1, cmTreeGridCellStyle_1, cmTreeGridToolbar_1, property_1, mappCockpitComponent_1, DataModels) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ConfigManagerWidget = /** @class */ (function (_super) {
        __extends(ConfigManagerWidget, _super);
        function ConfigManagerWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._dataModelChangedHandler = function (sender, eventArgs) { _this.handleGridEndEdit(eventArgs); };
            _this._methods = property_1.Property.create([]);
            return _this;
        }
        /**
         * Inititalize the configmanagerwidget
         *
         * @param {string} layoutContainerId
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.initialize = function (layoutContainerId) {
            _super.prototype.initialize.call(this, layoutContainerId, 30);
            _super.prototype.setHeaderContent.call(this, "Configuration");
            // Set dynamic column settings
            _super.prototype.setDynamicColumn.call(this, 3, 100);
        };
        ConfigManagerWidget.prototype.initializeComponent = function () {
            this.component.disablePersisting();
        };
        Object.defineProperty(ConfigManagerWidget.prototype, "methods", {
            /**
             * Sets the methods data link as a reference to the methods to be displayed
             *
             * @memberof ConfigManagerWidget
             */
            set: function (methodsLink) {
                var _this = this;
                methodsLink.changed(function () {
                    _this._methods = methodsLink;
                    // get the save configuration method
                    _this._saveParametersMethod = _this.retrieveSaveParametersMethod();
                    // disable save button
                    _this._toolbar.disableSaveButton(true);
                    // enable the save button depending on executable state.
                    if (_this._saveParametersMethod) {
                        _this._toolbar.disableSaveButton(!_this._saveParametersMethod.isExecutable.value);
                        _this._saveParametersMethod.isExecutable.changed(function (isExecutable) {
                            _this._toolbar.disableSaveButton(!isExecutable);
                        });
                    }
                });
            },
            enumerable: true,
            configurable: true
        });
        ConfigManagerWidget.prototype.retrieveSaveParametersMethod = function () {
            return this._methods.value.filter(function (method) { return method.browseName == "Save Config"; })[0];
        };
        Object.defineProperty(ConfigManagerWidget.prototype, "configurationParameters", {
            /**
             * Sets the configurationparameters as the data source for the configuration manager widget
             *
             * @memberof ConfigManagerWidget
             */
            set: function (componentParameters) {
                var configManagerDataModel = DataModels.ConfigManagerDataModel.create();
                // use the component model as the data source for watchables 
                //configManagerDataModel.dataSource = (<DataModels.IMappCockpitDataModel>this.dataModel).dataSource;
                configManagerDataModel.initialize();
                configManagerDataModel.configurationParameters = componentParameters;
                this.dataModel = configManagerDataModel;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Creates the layout of the widget
         *
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.createLayout = function () {
            var $tabParentContent = $(this.cssParentContentId);
            $tabParentContent[0].style.overflow = "hidden";
            $tabParentContent.append(this.getScriptInformationForTreeGrid());
            _super.prototype.createLayout.call(this);
        };
        ConfigManagerWidget.prototype.getScriptInformationForTreeGrid = function () {
            var str = "<script type=\"text/x-jsrender\" id=\"cmDisplayNameColumnTemplate\">\n\t\t\t\t<div style='height:20px;' unselectable='on'>\n\t\t\t\t\t{{if hasChildRecords}}\n\t\t\t\t\t\t<div class='intend' style='height:1px; float:left; width:{{:level*20}}px; display:inline-block;'></div>\n\t\t\t\t\t{{else !hasChildRecords}}\n\t\t\t\t\t\t<div class='intend' style='height:1px; float:left; width:{{:level*20}}px; display:inline-block;'></div>\n\t\t\t\t\t{{/if}}\n\t\t\t\t\t<div class=' {{if expanded}}e-treegridexpand e-cmtreegridexpand {{else hasChildRecords}}e-treegridcollapse e-cmtreegridcollapse {{/if}} {{if !expanded && !hasChildRecords}}e-doc e-cmdoc{{/if}}' style='height:20px;width:30px;margin:auto;float:left;margin-left:10px;'></div>\n\t\t\t\t\t<div class='e-cell' style='display:inline-block;width:100%' unselectable='on'>{{:#data['displayName']}}</div>\n\t\t\t\t</div>\n\t\t</script>";
            return str;
        };
        /**
         * Load the styles for the config manager
         *
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.loadStyles = function () {
            _super.prototype.addStyle.call(this, "widgets/configManagerWidget/style/css/treeGridIconStyles.css");
        };
        ConfigManagerWidget.prototype.handleModelChanged = function (sender, data) {
            this.updateGridData(sender);
            // after populating the configurationParametes we start observing changes of the parameters
            //this.startObservingConfigurationParameters((<ConfigManagerDataModel>this.dataModel)._actualComponentData);
        };
        /**
         * Handles the changes of observed items requested by 'observeDataModelItems'
         *
         * @param {IDataModel} sender
         * @param {EventModelChangedArgs} eventArgs
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.handleModelItemsChanged = function (sender, eventArgs) {
            this.updateGridData(sender);
        };
        ConfigManagerWidget.prototype.handleGridEndEdit = function (args) {
            var changeHint = {
                hint: "changed parameter value",
                changedItemData: args.changedItemData,
                newItemData: args.newItemData,
            };
            var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateSource, changeHint, this.dataModel);
            this.dataModel.onModelChanged(this.dataModel, eventArgs);
        };
        /**
         * Activate the configmanagerwidget
         *
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.activate = function () {
            if (this.dataModel._actualComponentData) {
                mappCockpitComponent_1.MappCockpitComponentParameter.activateComponentModelItems(this.dataModel, this.dataModel._actualComponentData);
            }
        };
        /**
         * Deactivate the configmanagerwidget
         *
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.deactivate = function () {
            if (this.dataModel._actualComponentData) {
                mappCockpitComponent_1.MappCockpitComponentParameter.deactivateComponentModelItems(this.dataModel, this.dataModel._actualComponentData);
            }
        };
        /**
         * Dispose the configmanagerwidget
         *
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.dispose = function () {
            if (this.dataModel._actualComponentData) {
                mappCockpitComponent_1.MappCockpitComponentParameter.unobserveComponentModelItems(this.dataModel, this.dataModel._actualComponentData);
            }
            if (this.dataModel != undefined) {
                this.dataModel.dispose();
            }
            _super.prototype.dispose.call(this);
        };
        /**
         * Creates the tree grid for the configuration structure
         *
         * @protected
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.createTreeGrid = function () {
            var _this = this;
            var cellEditEvents = new cmTreeGridCellEditEvents_1.CmTreeGridCellEditEvents();
            var cellStyle = new cmTreeGridCellStyle_1.CmTreeGridCellStyle();
            $(this.cssParentContentId).ejTreeGrid(__assign(__assign(__assign(__assign({}, this.getTreeGridColumnDefinition()), this.getTreeGridColumnResizeSupport()), this.getTreeGridToolbarSupport()), { dataSource: undefined, childMapping: "childs", expandStateMapping: "expandState", allowReordering: false, editSettings: {
                    allowEditing: true,
                    allowDeleting: false,
                }, expanded: function (args) { return _this.treeGridNodeExpandedOrCollapsed(); }, collapsed: function (args) { return _this.treeGridNodeExpandedOrCollapsed(); }, queryCellInfo: function (args) { return cellStyle.setCellStyle(args); }, beginEdit: function (args) { return cellEditEvents.beginEdit(args, _this._configManagerWidgetDataModel); }, endEdit: function (args) { return cellEditEvents.endEdit(args, _this._configManagerWidgetDataModel); }, create: function (args) { return _this.treeGridCreated(); } }));
        };
        /**
         * Returns the tree grid column definition
         *
         * @private
         * @returns {{}}
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.getTreeGridColumnDefinition = function () {
            return {
                columns: [
                    { field: "displayName", headerText: "Name", width: "300", isTemplateColumn: true, templateID: "cmDisplayNameColumnTemplate" },
                    { field: "displayValue", headerText: "Value", width: "180", editType: "stringedit", editTemplate: cmTreeGridCellEditTemplate_1.CmTreeGridCellEditTemplate.createInstance() },
                    { field: "unit", headerText: "Unit", width: "100" },
                    { field: "description", headerText: "Description", width: "400" },
                ],
            };
        };
        /**
         * Returns the tree grid column resize settings
         *
         * @private
         * @returns {{}}
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.getTreeGridColumnResizeSupport = function () {
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
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.getTreeGridToolbarSupport = function () {
            var _this = this;
            this._toolbar = new cmTreeGridToolbar_1.CmTreeGridToolbar(this.cssParentContentId);
            return {
                toolbarSettings: {
                    showToolbar: true,
                    customToolbarItems: this._toolbar.getCustomToolbars()
                },
                toolbarClick: function (args) { return _this._toolbar.toolbarClick(args, _this._saveParametersMethod); },
            };
        };
        ConfigManagerWidget.prototype.treeGridCreated = function () {
            // Sets the custom toolbar icons
            this._toolbar.setStyleForToolbarIcons();
        };
        ConfigManagerWidget.prototype.treeGridNodeExpandedOrCollapsed = function () {
            // Refresh to see correct expanded/collapsed icon
            this.refresh(this._configManagerWidgetDataModel);
        };
        /**
         * Updates the grids data
         *
         * @private
         * @param {IDataModel} dataModel
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.updateGridData = function (dataModel) {
            var newDataModel = new configManagerWidgetDataModel_1.ConfigManagerWidgetDataModel(dataModel);
            if (this._configManagerWidgetDataModel != undefined) {
                // set expands states from the current to the new datamodel
                newDataModel.setExpandStates(this._configManagerWidgetDataModel.getDataModel());
                // detach datamodel changed events from old datamodel
                this._configManagerWidgetDataModel.eventDataModelChanged.detach(this._dataModelChangedHandler);
                this._configManagerWidgetDataModel.dispose();
            }
            this._configManagerWidgetDataModel = newDataModel;
            this._configManagerWidgetDataModel.eventDataModelChanged.attach(this._dataModelChangedHandler);
            this.refresh(this._configManagerWidgetDataModel);
        };
        /**
         * refreshes the tree grids data
         *
         * @private
         * @param {ConfigManagerWidgetDataModel} configManagerWidgetDataModel
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.refresh = function (configManagerWidgetDataModel) {
            if (configManagerWidgetDataModel != undefined) {
                this.setModel(configManagerWidgetDataModel.getDataModel());
            }
        };
        return ConfigManagerWidget;
    }(treeGridWidgetBase_1.TreeGridWidgetBase));
    exports.ConfigManagerWidget = ConfigManagerWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnTWFuYWdlcldpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jb25maWdNYW5hZ2VyV2lkZ2V0L2NvbmZpZ01hbmFnZXJXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBWUE7UUFBa0MsdUNBQWtCO1FBQXBEO1lBQUEscUVBa1RDO1lBNVNXLDhCQUF3QixHQUFHLFVBQUMsTUFBTSxFQUFFLFNBQVMsSUFBTyxLQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUM7WUFxQnhGLGNBQVEsR0FBK0MsbUJBQVEsQ0FBQyxNQUFNLENBQStCLEVBQUUsQ0FBQyxDQUFDOztRQXVSckgsQ0FBQztRQTFTRzs7Ozs7V0FLRztRQUNILHdDQUFVLEdBQVYsVUFBVyxpQkFBeUI7WUFFaEMsaUJBQU0sVUFBVSxZQUFDLGlCQUFpQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3hDLGlCQUFNLGdCQUFnQixZQUFDLGVBQWUsQ0FBQyxDQUFDO1lBRXhDLDhCQUE4QjtZQUM5QixpQkFBTSxnQkFBZ0IsWUFBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDbkMsQ0FBQztRQUVELGlEQUFtQixHQUFuQjtZQUNJLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN2QyxDQUFDO1FBVUQsc0JBQVcsd0NBQU87WUFMbEI7Ozs7ZUFJRztpQkFDSCxVQUFtQixXQUF3RDtnQkFBM0UsaUJBZUM7Z0JBZEcsV0FBVyxDQUFDLE9BQU8sQ0FBQztvQkFDaEIsS0FBSSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUM7b0JBQzVCLG9DQUFvQztvQkFDcEMsS0FBSSxDQUFDLHFCQUFxQixHQUFHLEtBQUksQ0FBQyw0QkFBNEIsRUFBRSxDQUFDO29CQUNqRSxzQkFBc0I7b0JBQ3RCLEtBQUksQ0FBQyxR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XCIuLi8uLi9saWJzL3VpL1R5cGVzL2VqLndlYi5hbGwuZC50c1wiIC8+XHJcbmltcG9ydCB7IENvbmZpZ01hbmFnZXJXaWRnZXREYXRhTW9kZWwgfSBmcm9tIFwiLi9tb2RlbC9jb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsXCI7XHJcbmltcG9ydCB7IEV2ZW50TW9kZWxDaGFuZ2VkQXJncywgTW9kZWxDaGFuZ2VUeXBlLCBJRGF0YU1vZGVsIH0gZnJvbSBcIi4uLy4uL21vZGVscy9kYXRhTW9kZWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVHJlZUdyaWRXaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi90cmVlR3JpZFdpZGdldEJhc2VcIjtcclxuaW1wb3J0IHsgQ21UcmVlR3JpZENlbGxFZGl0VGVtcGxhdGUgfSBmcm9tIFwiLi92aWV3L2NtVHJlZUdyaWRDZWxsRWRpdFRlbXBsYXRlXCI7XHJcbmltcG9ydCB7IENtVHJlZUdyaWRDZWxsRWRpdEV2ZW50cyB9IGZyb20gXCIuL3ZpZXcvY21UcmVlR3JpZENlbGxFZGl0RXZlbnRzXCI7XHJcbmltcG9ydCB7IENtVHJlZUdyaWRDZWxsU3R5bGUgfSBmcm9tIFwiLi92aWV3L2NtVHJlZUdyaWRDZWxsU3R5bGVcIjtcclxuaW1wb3J0IHsgQ21UcmVlR3JpZFRvb2xiYXIgfSBmcm9tIFwiLi92aWV3L2NtVHJlZUdyaWRUb29sYmFyXCI7XHJcbmltcG9ydCB7IFByb3BlcnR5IH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9wcm9wZXJ0eVwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlciwgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudFwiO1xyXG5pbXBvcnQgKiBhcyBEYXRhTW9kZWxzIGZyb20gJy4uLy4uL21vZGVscy9kYXRhTW9kZWxzJztcclxuXHJcbmNsYXNzIENvbmZpZ01hbmFnZXJXaWRnZXQgZXh0ZW5kcyBUcmVlR3JpZFdpZGdldEJhc2Uge1xyXG5cdFxyXG4gICAgcHJpdmF0ZSBfY29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbDogQ29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbHx1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF90b29sYmFyITogQ21UcmVlR3JpZFRvb2xiYXI7XHJcblxyXG4gICAgXHJcbiAgICBwcml2YXRlIF9kYXRhTW9kZWxDaGFuZ2VkSGFuZGxlciA9IChzZW5kZXIsIGV2ZW50QXJncykgPT4geyB0aGlzLmhhbmRsZUdyaWRFbmRFZGl0KGV2ZW50QXJncykgfTtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aXRhbGl6ZSB0aGUgY29uZmlnbWFuYWdlcndpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYXlvdXRDb250YWluZXJJZFxyXG4gICAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgaW5pdGlhbGl6ZShsYXlvdXRDb250YWluZXJJZDogc3RyaW5nKXtcclxuXHJcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZShsYXlvdXRDb250YWluZXJJZCwgMzApO1xyXG4gICAgICAgIHN1cGVyLnNldEhlYWRlckNvbnRlbnQoXCJDb25maWd1cmF0aW9uXCIpO1xyXG5cclxuICAgICAgICAvLyBTZXQgZHluYW1pYyBjb2x1bW4gc2V0dGluZ3NcclxuICAgICAgICBzdXBlci5zZXREeW5hbWljQ29sdW1uKDMsIDEwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZUNvbXBvbmVudCgpe1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmRpc2FibGVQZXJzaXN0aW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfbWV0aG9kczpQcm9wZXJ0eTxBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZD4+ID0gUHJvcGVydHkuY3JlYXRlPE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kW10+KFtdKTtcclxuICAgIHByaXZhdGUgX3NhdmVQYXJhbWV0ZXJzTWV0aG9kOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZHx1bmRlZmluZWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBtZXRob2RzIGRhdGEgbGluayBhcyBhIHJlZmVyZW5jZSB0byB0aGUgbWV0aG9kcyB0byBiZSBkaXNwbGF5ZWRcclxuICAgICAqIFxyXG4gICAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBtZXRob2RzKG1ldGhvZHNMaW5rOiBQcm9wZXJ0eTxBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZD4+KSB7XHJcbiAgICAgICAgbWV0aG9kc0xpbmsuY2hhbmdlZCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX21ldGhvZHMgPSBtZXRob2RzTGluaztcclxuICAgICAgICAgICAgLy8gZ2V0IHRoZSBzYXZlIGNvbmZpZ3VyYXRpb24gbWV0aG9kXHJcbiAgICAgICAgICAgIHRoaXMuX3NhdmVQYXJhbWV0ZXJzTWV0aG9kID0gdGhpcy5yZXRyaWV2ZVNhdmVQYXJhbWV0ZXJzTWV0aG9kKCk7XHJcbiAgICAgICAgICAgIC8vIGRpc2FibGUgc2F2ZSBidXR0b25cclxuICAgICAgICAgICAgdGhpcy5fdG9vbGJhci5kaXNhYmxlU2F2ZUJ1dHRvbih0cnVlKTtcclxuICAgICAgICAgICAgLy8gZW5hYmxlIHRoZSBzYXZlIGJ1dHRvbiBkZXBlbmRpbmcgb24gZXhlY3V0YWJsZSBzdGF0ZS5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX3NhdmVQYXJhbWV0ZXJzTWV0aG9kKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90b29sYmFyLmRpc2FibGVTYXZlQnV0dG9uKCF0aGlzLl9zYXZlUGFyYW1ldGVyc01ldGhvZC5pc0V4ZWN1dGFibGUudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2F2ZVBhcmFtZXRlcnNNZXRob2QuaXNFeGVjdXRhYmxlLmNoYW5nZWQoKGlzRXhlY3V0YWJsZSk9PntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl90b29sYmFyLmRpc2FibGVTYXZlQnV0dG9uKCFpc0V4ZWN1dGFibGUpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmV0cmlldmVTYXZlUGFyYW1ldGVyc01ldGhvZCgpOk1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9ke1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tZXRob2RzLnZhbHVlLmZpbHRlcihtZXRob2QgPT4gbWV0aG9kLmJyb3dzZU5hbWUgPT0gXCJTYXZlIENvbmZpZ1wiKVswXTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGNvbmZpZ3VyYXRpb25wYXJhbWV0ZXJzIGFzIHRoZSBkYXRhIHNvdXJjZSBmb3IgdGhlIGNvbmZpZ3VyYXRpb24gbWFuYWdlciB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IGNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzKGNvbXBvbmVudFBhcmFtZXRlcnM6IFByb3BlcnR5PEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPj4pIHtcclxuICAgICAgICB2YXIgY29uZmlnTWFuYWdlckRhdGFNb2RlbCA9IERhdGFNb2RlbHMuQ29uZmlnTWFuYWdlckRhdGFNb2RlbC5jcmVhdGUoKTtcclxuXHJcbiAgICAgICAgLy8gdXNlIHRoZSBjb21wb25lbnQgbW9kZWwgYXMgdGhlIGRhdGEgc291cmNlIGZvciB3YXRjaGFibGVzIFxyXG4gICAgICAgIC8vY29uZmlnTWFuYWdlckRhdGFNb2RlbC5kYXRhU291cmNlID0gKDxEYXRhTW9kZWxzLklNYXBwQ29ja3BpdERhdGFNb2RlbD50aGlzLmRhdGFNb2RlbCkuZGF0YVNvdXJjZTtcclxuICAgICAgICBjb25maWdNYW5hZ2VyRGF0YU1vZGVsLmluaXRpYWxpemUoKTtcclxuICAgICAgICBjb25maWdNYW5hZ2VyRGF0YU1vZGVsLmNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzID0gY29tcG9uZW50UGFyYW1ldGVycztcclxuICAgICAgICB0aGlzLmRhdGFNb2RlbCA9IGNvbmZpZ01hbmFnZXJEYXRhTW9kZWw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBsYXlvdXQgb2YgdGhlIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZUxheW91dCgpIHtcclxuICAgICAgICB2YXIgJHRhYlBhcmVudENvbnRlbnQgPSAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKTtcclxuICAgICAgICAkdGFiUGFyZW50Q29udGVudFswXS5zdHlsZS5vdmVyZmxvdyA9XCJoaWRkZW5cIjtcclxuICAgICAgICAkdGFiUGFyZW50Q29udGVudC5hcHBlbmQodGhpcy5nZXRTY3JpcHRJbmZvcm1hdGlvbkZvclRyZWVHcmlkKCkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHN1cGVyLmNyZWF0ZUxheW91dCgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIGdldFNjcmlwdEluZm9ybWF0aW9uRm9yVHJlZUdyaWQoKSA6IHN0cmluZ3tcclxuXHRcdHZhciBzdHIgPVxyXG5cdFx0YDxzY3JpcHQgdHlwZT1cInRleHQveC1qc3JlbmRlclwiIGlkPVwiY21EaXNwbGF5TmFtZUNvbHVtblRlbXBsYXRlXCI+XHJcblx0XHRcdFx0PGRpdiBzdHlsZT0naGVpZ2h0OjIwcHg7JyB1bnNlbGVjdGFibGU9J29uJz5cclxuXHRcdFx0XHRcdHt7aWYgaGFzQ2hpbGRSZWNvcmRzfX1cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz0naW50ZW5kJyBzdHlsZT0naGVpZ2h0OjFweDsgZmxvYXQ6bGVmdDsgd2lkdGg6e3s6bGV2ZWwqMjB9fXB4OyBkaXNwbGF5OmlubGluZS1ibG9jazsnPjwvZGl2PlxyXG5cdFx0XHRcdFx0e3tlbHNlICFoYXNDaGlsZFJlY29yZHN9fVxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPSdpbnRlbmQnIHN0eWxlPSdoZWlnaHQ6MXB4OyBmbG9hdDpsZWZ0OyB3aWR0aDp7ezpsZXZlbCoyMH19cHg7IGRpc3BsYXk6aW5saW5lLWJsb2NrOyc+PC9kaXY+XHJcblx0XHRcdFx0XHR7ey9pZn19XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPScge3tpZiBleHBhbmRlZH19ZS10cmVlZ3JpZGV4cGFuZCBlLWNtdHJlZWdyaWRleHBhbmQge3tlbHNlIGhhc0NoaWxkUmVjb3Jkc319ZS10cmVlZ3JpZGNvbGxhcHNlIGUtY210cmVlZ3JpZGNvbGxhcHNlIHt7L2lmfX0ge3tpZiAhZXhwYW5kZWQgJiYgIWhhc0NoaWxkUmVjb3Jkc319ZS1kb2MgZS1jbWRvY3t7L2lmfX0nIHN0eWxlPSdoZWlnaHQ6MjBweDt3aWR0aDozMHB4O21hcmdpbjphdXRvO2Zsb2F0OmxlZnQ7bWFyZ2luLWxlZnQ6MTBweDsnPjwvZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz0nZS1jZWxsJyBzdHlsZT0nZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6MTAwJScgdW5zZWxlY3RhYmxlPSdvbic+e3s6I2RhdGFbJ2Rpc3BsYXlOYW1lJ119fTwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0PC9zY3JpcHQ+YFxyXG5cclxuICAgICAgcmV0dXJuIHN0cjtcclxuXHR9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkIHRoZSBzdHlsZXMgZm9yIHRoZSBjb25maWcgbWFuYWdlclxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGxvYWRTdHlsZXMoKXtcclxuICAgICAgICBzdXBlci5hZGRTdHlsZShcIndpZGdldHMvY29uZmlnTWFuYWdlcldpZGdldC9zdHlsZS9jc3MvdHJlZUdyaWRJY29uU3R5bGVzLmNzc1wiKTtcclxuICAgIH1cclxuXHJcblx0aGFuZGxlTW9kZWxDaGFuZ2VkKHNlbmRlcjogSURhdGFNb2RlbCwgZGF0YTogRXZlbnRNb2RlbENoYW5nZWRBcmdzKTogYW55IHtcclxuXHRcdHRoaXMudXBkYXRlR3JpZERhdGEoc2VuZGVyKTtcclxuXHRcdFxyXG5cdFx0Ly8gYWZ0ZXIgcG9wdWxhdGluZyB0aGUgY29uZmlndXJhdGlvblBhcmFtZXRlcyB3ZSBzdGFydCBvYnNlcnZpbmcgY2hhbmdlcyBvZiB0aGUgcGFyYW1ldGVyc1xyXG5cdFx0Ly90aGlzLnN0YXJ0T2JzZXJ2aW5nQ29uZmlndXJhdGlvblBhcmFtZXRlcnMoKDxDb25maWdNYW5hZ2VyRGF0YU1vZGVsPnRoaXMuZGF0YU1vZGVsKS5fYWN0dWFsQ29tcG9uZW50RGF0YSk7XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG4gICAgICogSGFuZGxlcyB0aGUgY2hhbmdlcyBvZiBvYnNlcnZlZCBpdGVtcyByZXF1ZXN0ZWQgYnkgJ29ic2VydmVEYXRhTW9kZWxJdGVtcydcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lEYXRhTW9kZWx9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHtFdmVudE1vZGVsQ2hhbmdlZEFyZ3N9IGV2ZW50QXJnc1xyXG4gICAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgaGFuZGxlTW9kZWxJdGVtc0NoYW5nZWQoc2VuZGVyOiBJRGF0YU1vZGVsLCBldmVudEFyZ3M6IEV2ZW50TW9kZWxDaGFuZ2VkQXJncykge1xyXG5cdFx0dGhpcy51cGRhdGVHcmlkRGF0YShzZW5kZXIpO1xyXG5cdH1cclxuXHRcclxuICAgIGhhbmRsZUdyaWRFbmRFZGl0KGFyZ3M6IGFueSk6IGFueSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGNoYW5nZUhpbnQgPSB7XHJcbiAgICAgICAgICAgIGhpbnQ6IFwiY2hhbmdlZCBwYXJhbWV0ZXIgdmFsdWVcIixcclxuICAgICAgICAgICAgY2hhbmdlZEl0ZW1EYXRhIDogYXJncy5jaGFuZ2VkSXRlbURhdGEsICBcclxuICAgICAgICAgICAgbmV3SXRlbURhdGEgOiBhcmdzLm5ld0l0ZW1EYXRhLCBcclxuICAgICAgICB9XHJcblx0XHR2YXIgZXZlbnRBcmdzID0gbmV3IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyh0aGlzLCBNb2RlbENoYW5nZVR5cGUudXBkYXRlU291cmNlLCBjaGFuZ2VIaW50LCB0aGlzLmRhdGFNb2RlbCk7XHJcblx0XHR0aGlzLmRhdGFNb2RlbCEub25Nb2RlbENoYW5nZWQodGhpcy5kYXRhTW9kZWwhLCBldmVudEFyZ3MpO1xyXG4gICAgfVxyXG5cclxuXHQvKipcclxuICAgICAqIEFjdGl2YXRlIHRoZSBjb25maWdtYW5hZ2Vyd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgYWN0aXZhdGUoKXtcclxuICAgICAgICBpZigoPGFueT50aGlzLmRhdGFNb2RlbCkuX2FjdHVhbENvbXBvbmVudERhdGEpe1xyXG4gICAgICAgICAgICBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlci5hY3RpdmF0ZUNvbXBvbmVudE1vZGVsSXRlbXModGhpcy5kYXRhTW9kZWwsKDxhbnk+dGhpcy5kYXRhTW9kZWwpLl9hY3R1YWxDb21wb25lbnREYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogRGVhY3RpdmF0ZSB0aGUgY29uZmlnbWFuYWdlcndpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGRlYWN0aXZhdGUoKXtcclxuICAgICAgICBpZigoPGFueT50aGlzLmRhdGFNb2RlbCkuX2FjdHVhbENvbXBvbmVudERhdGEpe1xyXG4gICAgICAgICAgICBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlci5kZWFjdGl2YXRlQ29tcG9uZW50TW9kZWxJdGVtcyh0aGlzLmRhdGFNb2RlbCwoPGFueT50aGlzLmRhdGFNb2RlbCkuX2FjdHVhbENvbXBvbmVudERhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc3Bvc2UgdGhlIGNvbmZpZ21hbmFnZXJ3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBkaXNwb3NlKCl7XHJcbiAgICAgICAgaWYoKDxhbnk+dGhpcy5kYXRhTW9kZWwpLl9hY3R1YWxDb21wb25lbnREYXRhKXtcclxuICAgICAgICAgICAgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIudW5vYnNlcnZlQ29tcG9uZW50TW9kZWxJdGVtcyh0aGlzLmRhdGFNb2RlbCwoPGFueT50aGlzLmRhdGFNb2RlbCkuX2FjdHVhbENvbXBvbmVudERhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5kYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5kYXRhTW9kZWwuZGlzcG9zZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xyXG4gICAgfVxyXG4gICAgICBcclxuXHQvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIHRyZWUgZ3JpZCBmb3IgdGhlIGNvbmZpZ3VyYXRpb24gc3RydWN0dXJlXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZVRyZWVHcmlkKCl7XHJcbiAgICAgICAgbGV0IGNlbGxFZGl0RXZlbnRzID0gbmV3IENtVHJlZUdyaWRDZWxsRWRpdEV2ZW50cygpO1xyXG4gICAgICAgIGxldCBjZWxsU3R5bGUgPSBuZXcgQ21UcmVlR3JpZENlbGxTdHlsZSgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICg8YW55PiQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpKS5lalRyZWVHcmlkKHtcclxuICAgICAgICAgICAgLi4udGhpcy5nZXRUcmVlR3JpZENvbHVtbkRlZmluaXRpb24oKSxcclxuICAgICAgICAgICAgLi4udGhpcy5nZXRUcmVlR3JpZENvbHVtblJlc2l6ZVN1cHBvcnQoKSxcclxuICAgICAgICAgICAgLi4udGhpcy5nZXRUcmVlR3JpZFRvb2xiYXJTdXBwb3J0KCksXHRcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGRhdGFTb3VyY2U6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgY2hpbGRNYXBwaW5nOlwiY2hpbGRzXCIsXHJcbiAgICAgICAgICAgIGV4cGFuZFN0YXRlTWFwcGluZzogXCJleHBhbmRTdGF0ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgYWxsb3dSZW9yZGVyaW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgZWRpdFNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICBhbGxvd0VkaXRpbmc6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBhbGxvd0RlbGV0aW5nIDogZmFsc2UsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgXHJcblx0XHRcdGV4cGFuZGVkOiAoYXJncykgPT4gdGhpcy50cmVlR3JpZE5vZGVFeHBhbmRlZE9yQ29sbGFwc2VkKCksXHJcblx0XHRcdGNvbGxhcHNlZDogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWROb2RlRXhwYW5kZWRPckNvbGxhcHNlZCgpLFxyXG4gICAgICAgICAgICBxdWVyeUNlbGxJbmZvOiAoYXJncykgPT4gY2VsbFN0eWxlLnNldENlbGxTdHlsZShhcmdzKSxcclxuICAgICAgICAgICAgYmVnaW5FZGl0OiAoYXJncykgPT4gY2VsbEVkaXRFdmVudHMuYmVnaW5FZGl0KGFyZ3MsIHRoaXMuX2NvbmZpZ01hbmFnZXJXaWRnZXREYXRhTW9kZWwpLFxyXG4gICAgICAgICAgICBlbmRFZGl0OiAoYXJncykgPT4gY2VsbEVkaXRFdmVudHMuZW5kRWRpdChhcmdzLCB0aGlzLl9jb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsKSxcclxuICAgICAgICAgICAgY3JlYXRlOiAoYXJncykgPT4gdGhpcy50cmVlR3JpZENyZWF0ZWQoKSxcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJlZSBncmlkIGNvbHVtbiBkZWZpbml0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCk6IHt9e1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNvbHVtbnM6IFtcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwiZGlzcGxheU5hbWVcIiwgaGVhZGVyVGV4dDogXCJOYW1lXCIsIHdpZHRoOiBcIjMwMFwiLCBpc1RlbXBsYXRlQ29sdW1uOiB0cnVlLCB0ZW1wbGF0ZUlEOiBcImNtRGlzcGxheU5hbWVDb2x1bW5UZW1wbGF0ZVwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcImRpc3BsYXlWYWx1ZVwiLCBoZWFkZXJUZXh0OiBcIlZhbHVlXCIsIHdpZHRoOiBcIjE4MFwiLCBlZGl0VHlwZTogXCJzdHJpbmdlZGl0XCIsIGVkaXRUZW1wbGF0ZTogQ21UcmVlR3JpZENlbGxFZGl0VGVtcGxhdGUuY3JlYXRlSW5zdGFuY2UoKX0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcInVuaXRcIiwgaGVhZGVyVGV4dDogXCJVbml0XCIsIHdpZHRoOiBcIjEwMFwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcImRlc2NyaXB0aW9uXCIsIGhlYWRlclRleHQ6IFwiRGVzY3JpcHRpb25cIiwgd2lkdGg6IFwiNDAwXCIgfSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJlZSBncmlkIGNvbHVtbiByZXNpemUgc2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmVlR3JpZENvbHVtblJlc2l6ZVN1cHBvcnQoKToge317XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYWxsb3dDb2x1bW5SZXNpemU6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbHVtblJlc2l6ZVNldHRpbmdzOiB7IGNvbHVtblJlc2l6ZU1vZGU6IGVqLlRyZWVHcmlkLkNvbHVtblJlc2l6ZU1vZGUuRml4ZWRDb2x1bW5zIH0sXHJcbiAgICAgICAgICAgIGNvbHVtblJlc2l6ZWQ6IChhcmdzKSA9PiBzdXBlci5yZXNpemVEeW5hbWljQ29sdW1uKGFyZ3MuY29sdW1uSW5kZXgsIGFyZ3MubW9kZWwpLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgdG9vbGJhciBzZXR0aW5nc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFRyZWVHcmlkVG9vbGJhclN1cHBvcnQoKToge317XHJcbiAgICAgICAgdGhpcy5fdG9vbGJhciA9IG5ldyBDbVRyZWVHcmlkVG9vbGJhcih0aGlzLmNzc1BhcmVudENvbnRlbnRJZCk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdG9vbGJhclNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICBzaG93VG9vbGJhcjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGN1c3RvbVRvb2xiYXJJdGVtczogdGhpcy5fdG9vbGJhci5nZXRDdXN0b21Ub29sYmFycygpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRvb2xiYXJDbGljazogKGFyZ3MpID0+IHRoaXMuX3Rvb2xiYXIudG9vbGJhckNsaWNrKGFyZ3MsIHRoaXMuX3NhdmVQYXJhbWV0ZXJzTWV0aG9kISksXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRyZWVHcmlkQ3JlYXRlZCgpe1xyXG4gICAgICAgIC8vIFNldHMgdGhlIGN1c3RvbSB0b29sYmFyIGljb25zXHJcbiAgICAgICAgdGhpcy5fdG9vbGJhci5zZXRTdHlsZUZvclRvb2xiYXJJY29ucygpO1xyXG4gICAgfVx0XHJcblxyXG4gICAgcHJpdmF0ZSB0cmVlR3JpZE5vZGVFeHBhbmRlZE9yQ29sbGFwc2VkKCl7XHJcbiAgICAgICAgLy8gUmVmcmVzaCB0byBzZWUgY29ycmVjdCBleHBhbmRlZC9jb2xsYXBzZWQgaWNvblxyXG4gICAgICAgIHRoaXMucmVmcmVzaCh0aGlzLl9jb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsKTtcclxuICAgIH1cclxuXHJcblx0LyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBncmlkcyBkYXRhXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SURhdGFNb2RlbH0gZGF0YU1vZGVsXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZUdyaWREYXRhKGRhdGFNb2RlbDogSURhdGFNb2RlbCkge1xyXG4gICAgICAgIGxldCBuZXdEYXRhTW9kZWwgPSBuZXcgQ29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbChkYXRhTW9kZWwpO1xyXG4gICAgICAgIGlmKHRoaXMuX2NvbmZpZ01hbmFnZXJXaWRnZXREYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gc2V0IGV4cGFuZHMgc3RhdGVzIGZyb20gdGhlIGN1cnJlbnQgdG8gdGhlIG5ldyBkYXRhbW9kZWxcclxuICAgICAgICAgICAgbmV3RGF0YU1vZGVsLnNldEV4cGFuZFN0YXRlcyh0aGlzLl9jb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsLmdldERhdGFNb2RlbCgpKTtcclxuICAgICAgICAgICAgLy8gZGV0YWNoIGRhdGFtb2RlbCBjaGFuZ2VkIGV2ZW50cyBmcm9tIG9sZCBkYXRhbW9kZWxcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbC5ldmVudERhdGFNb2RlbENoYW5nZWQuZGV0YWNoKHRoaXMuX2RhdGFNb2RlbENoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbC5kaXNwb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2NvbmZpZ01hbmFnZXJXaWRnZXREYXRhTW9kZWwgPSBuZXdEYXRhTW9kZWw7XHJcblx0XHR0aGlzLl9jb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsLmV2ZW50RGF0YU1vZGVsQ2hhbmdlZC5hdHRhY2godGhpcy5fZGF0YU1vZGVsQ2hhbmdlZEhhbmRsZXIpO1xyXG5cdFx0dGhpcy5yZWZyZXNoKHRoaXMuX2NvbmZpZ01hbmFnZXJXaWRnZXREYXRhTW9kZWwpO1xyXG5cdH1cclxuXHQgICAgICAgXHJcbiAgICAvKipcclxuICAgICAqIHJlZnJlc2hlcyB0aGUgdHJlZSBncmlkcyBkYXRhXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Q29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbH0gY29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbFxyXG4gICAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWZyZXNoKGNvbmZpZ01hbmFnZXJXaWRnZXREYXRhTW9kZWw6IENvbmZpZ01hbmFnZXJXaWRnZXREYXRhTW9kZWx8dW5kZWZpbmVkKXtcclxuICAgICAgICBpZihjb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0TW9kZWwoY29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbC5nZXREYXRhTW9kZWwoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBDb25maWdNYW5hZ2VyV2lkZ2V0IH07Il19