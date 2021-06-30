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
define(["require", "exports", "./model/configManagerWidgetDataModel", "../../models/dataModelInterface", "../common/treeGridWidgetBase", "./view/cmTreeGridCellEditTemplate", "./view/cmTreeGridCellEditEvents", "./view/cmTreeGridCellStyle", "./view/cmTreeGridToolbar", "../../framework/property", "../../models/online/mappCockpitComponent", "./defaultComponentSettings"], function (require, exports, configManagerWidgetDataModel_1, dataModelInterface_1, treeGridWidgetBase_1, cmTreeGridCellEditTemplate_1, cmTreeGridCellEditEvents_1, cmTreeGridCellStyle_1, cmTreeGridToolbar_1, property_1, mappCockpitComponent_1, defaultComponentSettings_1) {
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
        };
        ConfigManagerWidget.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            _super.prototype.setHeaderContent.call(this, "Configuration");
            // Set dynamic column settings
            _super.prototype.setDynamicColumn.call(this, 3, 100);
        };
        ConfigManagerWidget.prototype.initializeComponent = function () {
            this.component.defaultSettingsDataId = defaultComponentSettings_1.DefaultComponentSettings.WidgetDefinitionId;
        };
        /**
         * Returns the default component settings for this widget
         *
         * @returns {(ComponentSettings|undefined)}
         * @memberof ConfigManagerWidget
         */
        ConfigManagerWidget.prototype.getDefaultComponentSettings = function () {
            return defaultComponentSettings_1.DefaultComponentSettings.getConfigManagerWidgetDefinition();
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
                var configManagerDataModel = this.component.getSubComponent(defaultComponentSettings_1.DefaultComponentSettings.ConfigManagerDataModel);
                if (configManagerDataModel != undefined) {
                    configManagerDataModel.configurationParameters = componentParameters;
                    this.dataModel = configManagerDataModel;
                }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnTWFuYWdlcldpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jb25maWdNYW5hZ2VyV2lkZ2V0L2NvbmZpZ01hbmFnZXJXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBY0E7UUFBa0MsdUNBQWtCO1FBQXBEO1lBQUEscUVBNlRDO1lBeFRXLDhCQUF3QixHQUFHLFVBQUMsTUFBTSxFQUFFLFNBQVMsSUFBTyxLQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUM7WUFtQ3hGLGNBQVEsR0FBK0MsbUJBQVEsQ0FBQyxNQUFNLENBQStCLEVBQUUsQ0FBQyxDQUFDOztRQXFSckgsQ0FBQztRQXRURzs7Ozs7V0FLRztRQUNILHdDQUFVLEdBQVYsVUFBVyxpQkFBeUI7WUFDaEMsaUJBQU0sVUFBVSxZQUFDLGlCQUFpQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzVDLENBQUM7UUFFRCx5Q0FBVyxHQUFYO1lBQ0ksaUJBQU0sV0FBVyxXQUFFLENBQUM7WUFFcEIsaUJBQU0sZ0JBQWdCLFlBQUMsZUFBZSxDQUFDLENBQUM7WUFFeEMsOEJBQThCO1lBQzlCLGlCQUFNLGdCQUFnQixZQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNuQyxDQUFDO1FBRUQsaURBQW1CLEdBQW5CO1lBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsR0FBRyxtREFBd0IsQ0FBQyxrQkFBa0IsQ0FBQztRQUN2RixDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSCx5REFBMkIsR0FBM0I7WUFDSSxPQUFPLG1EQUF3QixDQUFDLGdDQUFnQyxFQUFFLENBQUM7UUFDdkUsQ0FBQztRQVVELHNCQUFXLHdDQUFPO1lBTGxCOzs7O2VBSUc7aUJBQ0gsVUFBbUIsV0FBd0Q7Z0JBQTNFLGlCQWVDO2dCQWRHLFdBQVcsQ0FBQyxPQUFPLENBQUM7b0JBQ2hCLEtBQUksQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDO29CQUM1QixvQ0FBb0M7b0JBQ3BDLEtBQUksQ0FBQyxxQkFBcUIsR0FBRyxLQUFJLENBQUMsNEJBQTRCLEVBQUUsQ0FBQztvQkFDakUsc0JBQXNCO29CQUN0QixLQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN0Qyx3REFBd0Q7b0JBQ3hELElBQUksS0FBSSxDQUFDLHFCQUFxQixFQUFFO3dCQUM1QixLQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUMsS0FBSSxDQUFDLHFCQUFxQixDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDaEYsS0FBSSxDQUFDLHFCQUFxQixDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBQyxZQUFZOzRCQUN6RCxLQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7d0JBQ25ELENBQUMsQ0FBQyxDQUFBO3FCQUNMO2dCQUNMLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQzs7O1dBQUE7UUFFTywwREFBNEIsR0FBcEM7WUFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLE1BQU0sQ0FBQyxVQUFVLElBQUksYUFBYSxFQUFsQyxDQUFrQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkYsQ0FBQztRQU9ELHNCQUFXLHdEQUF1QjtZQUxsQzs7OztlQUlHO2lCQUNILFVBQW1DLG1CQUFtRTtnQkFDbkcsSUFBSSxzQkFBc0IsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxtREFBd0IsQ0FBQyxzQkFBc0IsQ0FBNEIsQ0FBQztnQkFDdkksSUFBRyxzQkFBc0IsSUFBSSxTQUFTLEVBQUM7b0JBQ25DLHNCQUFzQixDQUFDLHVCQUF1QixHQUFHLG1CQUFtQixDQUFDO29CQUNyRSxJQUFJLENBQUMsU0FBUyxHQUFHLHNCQUFzQixDQUFDO2lCQUMzQztZQUNMLENBQUM7OztXQUFBO1FBRUQ7Ozs7V0FJRztRQUNILDBDQUFZLEdBQVo7WUFDSSxJQUFJLGlCQUFpQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUNuRCxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFFLFFBQVEsQ0FBQztZQUM5QyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLCtCQUErQixFQUFFLENBQUMsQ0FBQztZQUVqRSxpQkFBTSxZQUFZLFdBQUUsQ0FBQztRQUN6QixDQUFDO1FBRU8sNkRBQStCLEdBQXZDO1lBQ0YsSUFBSSxHQUFHLEdBQ1AsbzNCQVVVLENBQUE7WUFFTixPQUFPLEdBQUcsQ0FBQztRQUNoQixDQUFDO1FBRUU7Ozs7V0FJRztRQUNILHdDQUFVLEdBQVY7WUFDSSxpQkFBTSxRQUFRLFlBQUMsOERBQThELENBQUMsQ0FBQztRQUNuRixDQUFDO1FBRUosZ0RBQWtCLEdBQWxCLFVBQW1CLE1BQWtCLEVBQUUsSUFBMkI7WUFDakUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUU1QiwyRkFBMkY7WUFDM0YsNEdBQTRHO1FBQzdHLENBQUM7UUFFRDs7Ozs7O1dBTU07UUFDSCxxREFBdUIsR0FBdkIsVUFBd0IsTUFBa0IsRUFBRSxTQUFnQztZQUM5RSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdCLENBQUM7UUFFRSwrQ0FBaUIsR0FBakIsVUFBa0IsSUFBUztZQUV2QixJQUFJLFVBQVUsR0FBRztnQkFDYixJQUFJLEVBQUUseUJBQXlCO2dCQUMvQixlQUFlLEVBQUcsSUFBSSxDQUFDLGVBQWU7Z0JBQ3RDLFdBQVcsRUFBRyxJQUFJLENBQUMsV0FBVzthQUNqQyxDQUFBO1lBQ1AsSUFBSSxTQUFTLEdBQUcsSUFBSSwwQ0FBcUIsQ0FBQyxJQUFJLEVBQUUsb0NBQWUsQ0FBQyxZQUFZLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMxRyxJQUFJLENBQUMsU0FBVSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsU0FBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3pELENBQUM7UUFFSjs7OztXQUlNO1FBQ0gsc0NBQVEsR0FBUjtZQUNJLElBQVMsSUFBSSxDQUFDLFNBQVUsQ0FBQyxvQkFBb0IsRUFBQztnQkFDMUMsb0RBQTZCLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBTyxJQUFJLENBQUMsU0FBVSxDQUFDLG9CQUFvQixDQUFDLENBQUM7YUFDeEg7UUFDTCxDQUFDO1FBRUQ7Ozs7V0FJRztRQUNILHdDQUFVLEdBQVY7WUFDSSxJQUFTLElBQUksQ0FBQyxTQUFVLENBQUMsb0JBQW9CLEVBQUM7Z0JBQzFDLG9EQUE2QixDQUFDLDZCQUE2QixDQUFDLElBQUksQ0FBQyxTQUFTLEVBQU8sSUFBSSxDQUFDLFNBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO2FBQzFIO1FBQ0wsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSCxxQ0FBTyxHQUFQO1lBQ0ksSUFBUyxJQUFJLENBQUMsU0FBVSxDQUFDLG9CQUFvQixFQUFDO2dCQUMxQyxvREFBNkIsQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFPLElBQUksQ0FBQyxTQUFVLENBQUMsb0JBQW9CLENBQUMsQ0FBQzthQUN6SDtZQUVELElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxTQUFTLEVBQUM7Z0JBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDNUI7WUFFRCxpQkFBTSxPQUFPLFdBQUUsQ0FBQztRQUNwQixDQUFDO1FBRUo7Ozs7O1dBS007UUFDTyw0Q0FBYyxHQUF4QjtZQUFBLGlCQTBCQztZQXpCRyxJQUFJLGNBQWMsR0FBRyxJQUFJLG1EQUF3QixFQUFFLENBQUM7WUFDcEQsSUFBSSxTQUFTLEdBQUcsSUFBSSx5Q0FBbUIsRUFBRSxDQUFDO1lBRXBDLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUUsQ0FBQyxVQUFVLHlDQUNyQyxJQUFJLENBQUMsMkJBQTJCLEVBQUUsR0FDbEMsSUFBSSxDQUFDLDhCQUE4QixFQUFFLEdBQ3JDLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxLQUVuQyxVQUFVLEVBQUUsU0FBUyxFQUNyQixZQUFZLEVBQUMsUUFBUSxFQUNyQixrQkFBa0IsRUFBRSxhQUFhLEVBRWpDLGVBQWUsRUFBRSxLQUFLLEVBQ3RCLFlBQVksRUFBRTtvQkFDVixZQUFZLEVBQUUsSUFBSTtvQkFDbEIsYUFBYSxFQUFHLEtBQUs7aUJBQ3hCLEVBRVYsUUFBUSxFQUFFLFVBQUMsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLCtCQUErQixFQUFFLEVBQXRDLENBQXNDLEVBQzFELFNBQVMsRUFBRSxVQUFDLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQywrQkFBK0IsRUFBRSxFQUF0QyxDQUFzQyxFQUNsRCxhQUFhLEVBQUUsVUFBQyxJQUFJLElBQUssT0FBQSxTQUFTLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUE1QixDQUE0QixFQUNyRCxTQUFTLEVBQUUsVUFBQyxJQUFJLElBQUssT0FBQSxjQUFjLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxLQUFJLENBQUMsNkJBQTZCLENBQUMsRUFBbEUsQ0FBa0UsRUFDdkYsT0FBTyxFQUFFLFVBQUMsSUFBSSxJQUFLLE9BQUEsY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSSxDQUFDLDZCQUE2QixDQUFDLEVBQWhFLENBQWdFLEVBQ25GLE1BQU0sRUFBRSxVQUFDLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxlQUFlLEVBQUUsRUFBdEIsQ0FBc0IsSUFDMUMsQ0FBQTtRQUNOLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSyx5REFBMkIsR0FBbkM7WUFDSSxPQUFPO2dCQUNILE9BQU8sRUFBRTtvQkFDTCxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLGdCQUFnQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsNkJBQTZCLEVBQUU7b0JBQzdILEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsdURBQTBCLENBQUMsY0FBYyxFQUFFLEVBQUM7b0JBQzlJLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7b0JBQ25ELEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7aUJBQ3BFO2FBQ0osQ0FBQztRQUNOLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSyw0REFBOEIsR0FBdEM7WUFBQSxpQkFNQztZQUxHLE9BQU87Z0JBQ0gsaUJBQWlCLEVBQUUsSUFBSTtnQkFDdkIsb0JBQW9CLEVBQUUsRUFBRSxnQkFBZ0IsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRTtnQkFDckYsYUFBYSxFQUFFLFVBQUMsSUFBSSxJQUFLLE9BQUEsaUJBQU0sbUJBQW1CLGFBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQXZELENBQXVEO2FBQ25GLENBQUM7UUFDTixDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ssdURBQXlCLEdBQWpDO1lBQUEsaUJBU0M7WUFSRyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUkscUNBQWlCLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDL0QsT0FBTztnQkFDSCxlQUFlLEVBQUU7b0JBQ2IsV0FBVyxFQUFFLElBQUk7b0JBQ2pCLGtCQUFrQixFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUU7aUJBQ3hEO2dCQUNELFlBQVksRUFBRSxVQUFDLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxLQUFJLENBQUMscUJBQXNCLENBQUMsRUFBN0QsQ0FBNkQ7YUFDeEYsQ0FBQztRQUNOLENBQUM7UUFFTyw2Q0FBZSxHQUF2QjtZQUNJLGdDQUFnQztZQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLHVCQUF1QixFQUFFLENBQUM7UUFDNUMsQ0FBQztRQUVPLDZEQUErQixHQUF2QztZQUNJLGlEQUFpRDtZQUNqRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1FBQ3JELENBQUM7UUFFSjs7Ozs7O1dBTU07UUFDSyw0Q0FBYyxHQUF0QixVQUF1QixTQUFxQjtZQUN4QyxJQUFJLFlBQVksR0FBRyxJQUFJLDJEQUE0QixDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQy9ELElBQUcsSUFBSSxDQUFDLDZCQUE2QixJQUFJLFNBQVMsRUFBQztnQkFDL0MsMkRBQTJEO2dCQUMzRCxZQUFZLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO2dCQUNoRixxREFBcUQ7Z0JBQ3JELElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM7Z0JBQy9GLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUNoRDtZQUNELElBQUksQ0FBQyw2QkFBNkIsR0FBRyxZQUFZLENBQUM7WUFDeEQsSUFBSSxDQUFDLDZCQUE2QixDQUFDLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUMvRixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1FBQ2xELENBQUM7UUFFRTs7Ozs7O1dBTUc7UUFDSyxxQ0FBTyxHQUFmLFVBQWdCLDRCQUFvRTtZQUNoRixJQUFHLDRCQUE0QixJQUFJLFNBQVMsRUFBQztnQkFDekMsSUFBSSxDQUFDLFFBQVEsQ0FBQyw0QkFBNEIsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO2FBQzlEO1FBQ0wsQ0FBQztRQUNMLDBCQUFDO0lBQUQsQ0FBQyxBQTdURCxDQUFrQyx1Q0FBa0IsR0E2VG5EO0lBRVEsa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2xpYnMvdWkvVHlwZXMvZWoud2ViLmFsbC5kLnRzXCIgLz5cclxuaW1wb3J0IHsgQ29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbCB9IGZyb20gXCIuL21vZGVsL2NvbmZpZ01hbmFnZXJXaWRnZXREYXRhTW9kZWxcIjtcclxuaW1wb3J0IHsgRXZlbnRNb2RlbENoYW5nZWRBcmdzLCBNb2RlbENoYW5nZVR5cGUsIElEYXRhTW9kZWwgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2RhdGFNb2RlbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUcmVlR3JpZFdpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL3RyZWVHcmlkV2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBDbVRyZWVHcmlkQ2VsbEVkaXRUZW1wbGF0ZSB9IGZyb20gXCIuL3ZpZXcvY21UcmVlR3JpZENlbGxFZGl0VGVtcGxhdGVcIjtcclxuaW1wb3J0IHsgQ21UcmVlR3JpZENlbGxFZGl0RXZlbnRzIH0gZnJvbSBcIi4vdmlldy9jbVRyZWVHcmlkQ2VsbEVkaXRFdmVudHNcIjtcclxuaW1wb3J0IHsgQ21UcmVlR3JpZENlbGxTdHlsZSB9IGZyb20gXCIuL3ZpZXcvY21UcmVlR3JpZENlbGxTdHlsZVwiO1xyXG5pbXBvcnQgeyBDbVRyZWVHcmlkVG9vbGJhciB9IGZyb20gXCIuL3ZpZXcvY21UcmVlR3JpZFRvb2xiYXJcIjtcclxuaW1wb3J0IHsgUHJvcGVydHkgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL3Byb3BlcnR5XCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyLCBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50XCI7XHJcbmltcG9ydCB7IElDb25maWdNYW5hZ2VyRGF0YU1vZGVsIH0gZnJvbSBcIi4uLy4uL21vZGVscy9kYXRhTW9kZWxzXCI7XHJcbmltcG9ydCB7IERlZmF1bHRDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuL2RlZmF1bHRDb21wb25lbnRTZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnRTZXR0aW5nc1wiO1xyXG5cclxuY2xhc3MgQ29uZmlnTWFuYWdlcldpZGdldCBleHRlbmRzIFRyZWVHcmlkV2lkZ2V0QmFzZSB7XHJcblx0XHJcbiAgICBwcml2YXRlIF9jb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsOiBDb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsfHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX3Rvb2xiYXIhOiBDbVRyZWVHcmlkVG9vbGJhcjtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfZGF0YU1vZGVsQ2hhbmdlZEhhbmRsZXIgPSAoc2VuZGVyLCBldmVudEFyZ3MpID0+IHsgdGhpcy5oYW5kbGVHcmlkRW5kRWRpdChldmVudEFyZ3MpIH07XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogSW5pdGl0YWxpemUgdGhlIGNvbmZpZ21hbmFnZXJ3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGF5b3V0Q29udGFpbmVySWRcclxuICAgICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQ6IHN0cmluZyl7XHJcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZShsYXlvdXRDb250YWluZXJJZCwgMzApO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRpYWxpemVkKCl7XHJcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZWQoKTtcclxuXHJcbiAgICAgICAgc3VwZXIuc2V0SGVhZGVyQ29udGVudChcIkNvbmZpZ3VyYXRpb25cIik7XHJcblxyXG4gICAgICAgIC8vIFNldCBkeW5hbWljIGNvbHVtbiBzZXR0aW5nc1xyXG4gICAgICAgIHN1cGVyLnNldER5bmFtaWNDb2x1bW4oMywgMTAwKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0aWFsaXplQ29tcG9uZW50KCl7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZGVmYXVsdFNldHRpbmdzRGF0YUlkID0gRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLldpZGdldERlZmluaXRpb25JZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgY29tcG9uZW50IHNldHRpbmdzIGZvciB0aGlzIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsoQ29tcG9uZW50U2V0dGluZ3N8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGdldERlZmF1bHRDb21wb25lbnRTZXR0aW5ncygpOiBDb21wb25lbnRTZXR0aW5nc3x1bmRlZmluZWR7XHJcbiAgICAgICAgcmV0dXJuIERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5nZXRDb25maWdNYW5hZ2VyV2lkZ2V0RGVmaW5pdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX21ldGhvZHM6UHJvcGVydHk8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRNZXRob2Q+PiA9IFByb3BlcnR5LmNyZWF0ZTxNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFtdPihbXSk7XHJcbiAgICBwcml2YXRlIF9zYXZlUGFyYW1ldGVyc01ldGhvZDogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2R8dW5kZWZpbmVkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgbWV0aG9kcyBkYXRhIGxpbmsgYXMgYSByZWZlcmVuY2UgdG8gdGhlIG1ldGhvZHMgdG8gYmUgZGlzcGxheWVkXHJcbiAgICAgKiBcclxuICAgICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgbWV0aG9kcyhtZXRob2RzTGluazogUHJvcGVydHk8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRNZXRob2Q+Pikge1xyXG4gICAgICAgIG1ldGhvZHNMaW5rLmNoYW5nZWQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9tZXRob2RzID0gbWV0aG9kc0xpbms7XHJcbiAgICAgICAgICAgIC8vIGdldCB0aGUgc2F2ZSBjb25maWd1cmF0aW9uIG1ldGhvZFxyXG4gICAgICAgICAgICB0aGlzLl9zYXZlUGFyYW1ldGVyc01ldGhvZCA9IHRoaXMucmV0cmlldmVTYXZlUGFyYW1ldGVyc01ldGhvZCgpO1xyXG4gICAgICAgICAgICAvLyBkaXNhYmxlIHNhdmUgYnV0dG9uXHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2xiYXIuZGlzYWJsZVNhdmVCdXR0b24odHJ1ZSk7XHJcbiAgICAgICAgICAgIC8vIGVuYWJsZSB0aGUgc2F2ZSBidXR0b24gZGVwZW5kaW5nIG9uIGV4ZWN1dGFibGUgc3RhdGUuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9zYXZlUGFyYW1ldGVyc01ldGhvZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdG9vbGJhci5kaXNhYmxlU2F2ZUJ1dHRvbighdGhpcy5fc2F2ZVBhcmFtZXRlcnNNZXRob2QuaXNFeGVjdXRhYmxlLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NhdmVQYXJhbWV0ZXJzTWV0aG9kLmlzRXhlY3V0YWJsZS5jaGFuZ2VkKChpc0V4ZWN1dGFibGUpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9vbGJhci5kaXNhYmxlU2F2ZUJ1dHRvbighaXNFeGVjdXRhYmxlKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJldHJpZXZlU2F2ZVBhcmFtZXRlcnNNZXRob2QoKTpNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWV0aG9kcy52YWx1ZS5maWx0ZXIobWV0aG9kID0+IG1ldGhvZC5icm93c2VOYW1lID09IFwiU2F2ZSBDb25maWdcIilbMF07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBjb25maWd1cmF0aW9ucGFyYW1ldGVycyBhcyB0aGUgZGF0YSBzb3VyY2UgZm9yIHRoZSBjb25maWd1cmF0aW9uIG1hbmFnZXIgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBjb25maWd1cmF0aW9uUGFyYW1ldGVycyhjb21wb25lbnRQYXJhbWV0ZXJzOiBQcm9wZXJ0eTxBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4+KSB7XHJcbiAgICAgICBsZXQgY29uZmlnTWFuYWdlckRhdGFNb2RlbCA9IHRoaXMuY29tcG9uZW50LmdldFN1YkNvbXBvbmVudChEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuQ29uZmlnTWFuYWdlckRhdGFNb2RlbCkgYXMgSUNvbmZpZ01hbmFnZXJEYXRhTW9kZWw7XHJcbiAgICAgICAgaWYoY29uZmlnTWFuYWdlckRhdGFNb2RlbCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBjb25maWdNYW5hZ2VyRGF0YU1vZGVsLmNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzID0gY29tcG9uZW50UGFyYW1ldGVycztcclxuICAgICAgICAgICAgdGhpcy5kYXRhTW9kZWwgPSBjb25maWdNYW5hZ2VyRGF0YU1vZGVsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIGxheW91dCBvZiB0aGUgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgY3JlYXRlTGF5b3V0KCkge1xyXG4gICAgICAgIHZhciAkdGFiUGFyZW50Q29udGVudCA9ICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpO1xyXG4gICAgICAgICR0YWJQYXJlbnRDb250ZW50WzBdLnN0eWxlLm92ZXJmbG93ID1cImhpZGRlblwiO1xyXG4gICAgICAgICR0YWJQYXJlbnRDb250ZW50LmFwcGVuZCh0aGlzLmdldFNjcmlwdEluZm9ybWF0aW9uRm9yVHJlZUdyaWQoKSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgc3VwZXIuY3JlYXRlTGF5b3V0KCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByaXZhdGUgZ2V0U2NyaXB0SW5mb3JtYXRpb25Gb3JUcmVlR3JpZCgpIDogc3RyaW5ne1xyXG5cdFx0dmFyIHN0ciA9XHJcblx0XHRgPHNjcmlwdCB0eXBlPVwidGV4dC94LWpzcmVuZGVyXCIgaWQ9XCJjbURpc3BsYXlOYW1lQ29sdW1uVGVtcGxhdGVcIj5cclxuXHRcdFx0XHQ8ZGl2IHN0eWxlPSdoZWlnaHQ6MjBweDsnIHVuc2VsZWN0YWJsZT0nb24nPlxyXG5cdFx0XHRcdFx0e3tpZiBoYXNDaGlsZFJlY29yZHN9fVxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPSdpbnRlbmQnIHN0eWxlPSdoZWlnaHQ6MXB4OyBmbG9hdDpsZWZ0OyB3aWR0aDp7ezpsZXZlbCoyMH19cHg7IGRpc3BsYXk6aW5saW5lLWJsb2NrOyc+PC9kaXY+XHJcblx0XHRcdFx0XHR7e2Vsc2UgIWhhc0NoaWxkUmVjb3Jkc319XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9J2ludGVuZCcgc3R5bGU9J2hlaWdodDoxcHg7IGZsb2F0OmxlZnQ7IHdpZHRoOnt7OmxldmVsKjIwfX1weDsgZGlzcGxheTppbmxpbmUtYmxvY2s7Jz48L2Rpdj5cclxuXHRcdFx0XHRcdHt7L2lmfX1cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9JyB7e2lmIGV4cGFuZGVkfX1lLXRyZWVncmlkZXhwYW5kIGUtY210cmVlZ3JpZGV4cGFuZCB7e2Vsc2UgaGFzQ2hpbGRSZWNvcmRzfX1lLXRyZWVncmlkY29sbGFwc2UgZS1jbXRyZWVncmlkY29sbGFwc2Uge3svaWZ9fSB7e2lmICFleHBhbmRlZCAmJiAhaGFzQ2hpbGRSZWNvcmRzfX1lLWRvYyBlLWNtZG9je3svaWZ9fScgc3R5bGU9J2hlaWdodDoyMHB4O3dpZHRoOjMwcHg7bWFyZ2luOmF1dG87ZmxvYXQ6bGVmdDttYXJnaW4tbGVmdDoxMHB4Oyc+PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPSdlLWNlbGwnIHN0eWxlPSdkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDoxMDAlJyB1bnNlbGVjdGFibGU9J29uJz57ezojZGF0YVsnZGlzcGxheU5hbWUnXX19PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHQ8L3NjcmlwdD5gXHJcblxyXG4gICAgICByZXR1cm4gc3RyO1xyXG5cdH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWQgdGhlIHN0eWxlcyBmb3IgdGhlIGNvbmZpZyBtYW5hZ2VyXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgbG9hZFN0eWxlcygpe1xyXG4gICAgICAgIHN1cGVyLmFkZFN0eWxlKFwid2lkZ2V0cy9jb25maWdNYW5hZ2VyV2lkZ2V0L3N0eWxlL2Nzcy90cmVlR3JpZEljb25TdHlsZXMuY3NzXCIpO1xyXG4gICAgfVxyXG5cclxuXHRoYW5kbGVNb2RlbENoYW5nZWQoc2VuZGVyOiBJRGF0YU1vZGVsLCBkYXRhOiBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MpOiBhbnkge1xyXG5cdFx0dGhpcy51cGRhdGVHcmlkRGF0YShzZW5kZXIpO1xyXG5cdFx0XHJcblx0XHQvLyBhZnRlciBwb3B1bGF0aW5nIHRoZSBjb25maWd1cmF0aW9uUGFyYW1ldGVzIHdlIHN0YXJ0IG9ic2VydmluZyBjaGFuZ2VzIG9mIHRoZSBwYXJhbWV0ZXJzXHJcblx0XHQvL3RoaXMuc3RhcnRPYnNlcnZpbmdDb25maWd1cmF0aW9uUGFyYW1ldGVycygoPENvbmZpZ01hbmFnZXJEYXRhTW9kZWw+dGhpcy5kYXRhTW9kZWwpLl9hY3R1YWxDb21wb25lbnREYXRhKTtcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcbiAgICAgKiBIYW5kbGVzIHRoZSBjaGFuZ2VzIG9mIG9ic2VydmVkIGl0ZW1zIHJlcXVlc3RlZCBieSAnb2JzZXJ2ZURhdGFNb2RlbEl0ZW1zJ1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SURhdGFNb2RlbH0gc2VuZGVyXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50TW9kZWxDaGFuZ2VkQXJnc30gZXZlbnRBcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBoYW5kbGVNb2RlbEl0ZW1zQ2hhbmdlZChzZW5kZXI6IElEYXRhTW9kZWwsIGV2ZW50QXJnczogRXZlbnRNb2RlbENoYW5nZWRBcmdzKSB7XHJcblx0XHR0aGlzLnVwZGF0ZUdyaWREYXRhKHNlbmRlcik7XHJcblx0fVxyXG5cdFxyXG4gICAgaGFuZGxlR3JpZEVuZEVkaXQoYXJnczogYW55KTogYW55IHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgY2hhbmdlSGludCA9IHtcclxuICAgICAgICAgICAgaGludDogXCJjaGFuZ2VkIHBhcmFtZXRlciB2YWx1ZVwiLFxyXG4gICAgICAgICAgICBjaGFuZ2VkSXRlbURhdGEgOiBhcmdzLmNoYW5nZWRJdGVtRGF0YSwgIFxyXG4gICAgICAgICAgICBuZXdJdGVtRGF0YSA6IGFyZ3MubmV3SXRlbURhdGEsIFxyXG4gICAgICAgIH1cclxuXHRcdHZhciBldmVudEFyZ3MgPSBuZXcgRXZlbnRNb2RlbENoYW5nZWRBcmdzKHRoaXMsIE1vZGVsQ2hhbmdlVHlwZS51cGRhdGVTb3VyY2UsIGNoYW5nZUhpbnQsIHRoaXMuZGF0YU1vZGVsKTtcclxuXHRcdHRoaXMuZGF0YU1vZGVsIS5vbk1vZGVsQ2hhbmdlZCh0aGlzLmRhdGFNb2RlbCEsIGV2ZW50QXJncyk7XHJcbiAgICB9XHJcblxyXG5cdC8qKlxyXG4gICAgICogQWN0aXZhdGUgdGhlIGNvbmZpZ21hbmFnZXJ3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBhY3RpdmF0ZSgpe1xyXG4gICAgICAgIGlmKCg8YW55PnRoaXMuZGF0YU1vZGVsKS5fYWN0dWFsQ29tcG9uZW50RGF0YSl7XHJcbiAgICAgICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyLmFjdGl2YXRlQ29tcG9uZW50TW9kZWxJdGVtcyh0aGlzLmRhdGFNb2RlbCwoPGFueT50aGlzLmRhdGFNb2RlbCkuX2FjdHVhbENvbXBvbmVudERhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWFjdGl2YXRlIHRoZSBjb25maWdtYW5hZ2Vyd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgZGVhY3RpdmF0ZSgpe1xyXG4gICAgICAgIGlmKCg8YW55PnRoaXMuZGF0YU1vZGVsKS5fYWN0dWFsQ29tcG9uZW50RGF0YSl7XHJcbiAgICAgICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyLmRlYWN0aXZhdGVDb21wb25lbnRNb2RlbEl0ZW1zKHRoaXMuZGF0YU1vZGVsLCg8YW55PnRoaXMuZGF0YU1vZGVsKS5fYWN0dWFsQ29tcG9uZW50RGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzcG9zZSB0aGUgY29uZmlnbWFuYWdlcndpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGRpc3Bvc2UoKXtcclxuICAgICAgICBpZigoPGFueT50aGlzLmRhdGFNb2RlbCkuX2FjdHVhbENvbXBvbmVudERhdGEpe1xyXG4gICAgICAgICAgICBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlci51bm9ic2VydmVDb21wb25lbnRNb2RlbEl0ZW1zKHRoaXMuZGF0YU1vZGVsLCg8YW55PnRoaXMuZGF0YU1vZGVsKS5fYWN0dWFsQ29tcG9uZW50RGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLmRhdGFNb2RlbCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFNb2RlbC5kaXNwb3NlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgICB9XHJcbiAgICAgIFxyXG5cdC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgdHJlZSBncmlkIGZvciB0aGUgY29uZmlndXJhdGlvbiBzdHJ1Y3R1cmVcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlVHJlZUdyaWQoKXtcclxuICAgICAgICBsZXQgY2VsbEVkaXRFdmVudHMgPSBuZXcgQ21UcmVlR3JpZENlbGxFZGl0RXZlbnRzKCk7XHJcbiAgICAgICAgbGV0IGNlbGxTdHlsZSA9IG5ldyBDbVRyZWVHcmlkQ2VsbFN0eWxlKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgKDxhbnk+JCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCkpLmVqVHJlZUdyaWQoe1xyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbigpLFxyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkQ29sdW1uUmVzaXplU3VwcG9ydCgpLFxyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkVG9vbGJhclN1cHBvcnQoKSxcdFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZGF0YVNvdXJjZTogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICBjaGlsZE1hcHBpbmc6XCJjaGlsZHNcIixcclxuICAgICAgICAgICAgZXhwYW5kU3RhdGVNYXBwaW5nOiBcImV4cGFuZFN0YXRlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBhbGxvd1Jlb3JkZXJpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICBlZGl0U2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgIGFsbG93RWRpdGluZzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGFsbG93RGVsZXRpbmcgOiBmYWxzZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICBcclxuXHRcdFx0ZXhwYW5kZWQ6IChhcmdzKSA9PiB0aGlzLnRyZWVHcmlkTm9kZUV4cGFuZGVkT3JDb2xsYXBzZWQoKSxcclxuXHRcdFx0Y29sbGFwc2VkOiAoYXJncykgPT4gdGhpcy50cmVlR3JpZE5vZGVFeHBhbmRlZE9yQ29sbGFwc2VkKCksXHJcbiAgICAgICAgICAgIHF1ZXJ5Q2VsbEluZm86IChhcmdzKSA9PiBjZWxsU3R5bGUuc2V0Q2VsbFN0eWxlKGFyZ3MpLFxyXG4gICAgICAgICAgICBiZWdpbkVkaXQ6IChhcmdzKSA9PiBjZWxsRWRpdEV2ZW50cy5iZWdpbkVkaXQoYXJncywgdGhpcy5fY29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbCksXHJcbiAgICAgICAgICAgIGVuZEVkaXQ6IChhcmdzKSA9PiBjZWxsRWRpdEV2ZW50cy5lbmRFZGl0KGFyZ3MsIHRoaXMuX2NvbmZpZ01hbmFnZXJXaWRnZXREYXRhTW9kZWwpLFxyXG4gICAgICAgICAgICBjcmVhdGU6IChhcmdzKSA9PiB0aGlzLnRyZWVHcmlkQ3JlYXRlZCgpLFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgY29sdW1uIGRlZmluaXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmVlR3JpZENvbHVtbkRlZmluaXRpb24oKToge317XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY29sdW1uczogW1xyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJkaXNwbGF5TmFtZVwiLCBoZWFkZXJUZXh0OiBcIk5hbWVcIiwgd2lkdGg6IFwiMzAwXCIsIGlzVGVtcGxhdGVDb2x1bW46IHRydWUsIHRlbXBsYXRlSUQ6IFwiY21EaXNwbGF5TmFtZUNvbHVtblRlbXBsYXRlXCIgfSxcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwiZGlzcGxheVZhbHVlXCIsIGhlYWRlclRleHQ6IFwiVmFsdWVcIiwgd2lkdGg6IFwiMTgwXCIsIGVkaXRUeXBlOiBcInN0cmluZ2VkaXRcIiwgZWRpdFRlbXBsYXRlOiBDbVRyZWVHcmlkQ2VsbEVkaXRUZW1wbGF0ZS5jcmVhdGVJbnN0YW5jZSgpfSxcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwidW5pdFwiLCBoZWFkZXJUZXh0OiBcIlVuaXRcIiwgd2lkdGg6IFwiMTAwXCIgfSxcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwiZGVzY3JpcHRpb25cIiwgaGVhZGVyVGV4dDogXCJEZXNjcmlwdGlvblwiLCB3aWR0aDogXCI0MDBcIiB9LFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgY29sdW1uIHJlc2l6ZSBzZXR0aW5nc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFRyZWVHcmlkQ29sdW1uUmVzaXplU3VwcG9ydCgpOiB7fXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBhbGxvd0NvbHVtblJlc2l6ZTogdHJ1ZSxcclxuICAgICAgICAgICAgY29sdW1uUmVzaXplU2V0dGluZ3M6IHsgY29sdW1uUmVzaXplTW9kZTogZWouVHJlZUdyaWQuQ29sdW1uUmVzaXplTW9kZS5GaXhlZENvbHVtbnMgfSxcclxuICAgICAgICAgICAgY29sdW1uUmVzaXplZDogKGFyZ3MpID0+IHN1cGVyLnJlc2l6ZUR5bmFtaWNDb2x1bW4oYXJncy5jb2x1bW5JbmRleCwgYXJncy5tb2RlbCksXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCB0b29sYmFyIHNldHRpbmdzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VHJlZUdyaWRUb29sYmFyU3VwcG9ydCgpOiB7fXtcclxuICAgICAgICB0aGlzLl90b29sYmFyID0gbmV3IENtVHJlZUdyaWRUb29sYmFyKHRoaXMuY3NzUGFyZW50Q29udGVudElkKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0b29sYmFyU2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgIHNob3dUb29sYmFyOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tVG9vbGJhckl0ZW1zOiB0aGlzLl90b29sYmFyLmdldEN1c3RvbVRvb2xiYXJzKClcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdG9vbGJhckNsaWNrOiAoYXJncykgPT4gdGhpcy5fdG9vbGJhci50b29sYmFyQ2xpY2soYXJncywgdGhpcy5fc2F2ZVBhcmFtZXRlcnNNZXRob2QhKSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdHJlZUdyaWRDcmVhdGVkKCl7XHJcbiAgICAgICAgLy8gU2V0cyB0aGUgY3VzdG9tIHRvb2xiYXIgaWNvbnNcclxuICAgICAgICB0aGlzLl90b29sYmFyLnNldFN0eWxlRm9yVG9vbGJhckljb25zKCk7XHJcbiAgICB9XHRcclxuXHJcbiAgICBwcml2YXRlIHRyZWVHcmlkTm9kZUV4cGFuZGVkT3JDb2xsYXBzZWQoKXtcclxuICAgICAgICAvLyBSZWZyZXNoIHRvIHNlZSBjb3JyZWN0IGV4cGFuZGVkL2NvbGxhcHNlZCBpY29uXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoKHRoaXMuX2NvbmZpZ01hbmFnZXJXaWRnZXREYXRhTW9kZWwpO1xyXG4gICAgfVxyXG5cclxuXHQvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGdyaWRzIGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtJRGF0YU1vZGVsfSBkYXRhTW9kZWxcclxuICAgICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlR3JpZERhdGEoZGF0YU1vZGVsOiBJRGF0YU1vZGVsKSB7XHJcbiAgICAgICAgbGV0IG5ld0RhdGFNb2RlbCA9IG5ldyBDb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsKGRhdGFNb2RlbCk7XHJcbiAgICAgICAgaWYodGhpcy5fY29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAvLyBzZXQgZXhwYW5kcyBzdGF0ZXMgZnJvbSB0aGUgY3VycmVudCB0byB0aGUgbmV3IGRhdGFtb2RlbFxyXG4gICAgICAgICAgICBuZXdEYXRhTW9kZWwuc2V0RXhwYW5kU3RhdGVzKHRoaXMuX2NvbmZpZ01hbmFnZXJXaWRnZXREYXRhTW9kZWwuZ2V0RGF0YU1vZGVsKCkpO1xyXG4gICAgICAgICAgICAvLyBkZXRhY2ggZGF0YW1vZGVsIGNoYW5nZWQgZXZlbnRzIGZyb20gb2xkIGRhdGFtb2RlbFxyXG4gICAgICAgICAgICB0aGlzLl9jb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsLmV2ZW50RGF0YU1vZGVsQ2hhbmdlZC5kZXRhY2godGhpcy5fZGF0YU1vZGVsQ2hhbmdlZEhhbmRsZXIpO1xyXG4gICAgICAgICAgICB0aGlzLl9jb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsLmRpc3Bvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fY29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbCA9IG5ld0RhdGFNb2RlbDtcclxuXHRcdHRoaXMuX2NvbmZpZ01hbmFnZXJXaWRnZXREYXRhTW9kZWwuZXZlbnREYXRhTW9kZWxDaGFuZ2VkLmF0dGFjaCh0aGlzLl9kYXRhTW9kZWxDaGFuZ2VkSGFuZGxlcik7XHJcblx0XHR0aGlzLnJlZnJlc2godGhpcy5fY29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbCk7XHJcblx0fVxyXG5cdCAgICAgICBcclxuICAgIC8qKlxyXG4gICAgICogcmVmcmVzaGVzIHRoZSB0cmVlIGdyaWRzIGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtDb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsfSBjb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlZnJlc2goY29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbDogQ29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbHx1bmRlZmluZWQpe1xyXG4gICAgICAgIGlmKGNvbmZpZ01hbmFnZXJXaWRnZXREYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5zZXRNb2RlbChjb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsLmdldERhdGFNb2RlbCgpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IENvbmZpZ01hbmFnZXJXaWRnZXQgfTsiXX0=