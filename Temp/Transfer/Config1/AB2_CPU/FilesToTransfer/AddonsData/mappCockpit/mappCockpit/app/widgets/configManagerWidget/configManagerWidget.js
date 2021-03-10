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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnTWFuYWdlcldpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jb25maWdNYW5hZ2VyV2lkZ2V0L2NvbmZpZ01hbmFnZXJXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBWUE7UUFBa0MsdUNBQWtCO1FBQXBEO1lBQUEscUVBNFNDO1lBdFNXLDhCQUF3QixHQUFHLFVBQUMsTUFBTSxFQUFFLFNBQVMsSUFBTyxLQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUM7WUFpQnhGLGNBQVEsR0FBK0MsbUJBQVEsQ0FBQyxNQUFNLENBQStCLEVBQUUsQ0FBQyxDQUFDOztRQXFSckgsQ0FBQztRQXBTRzs7Ozs7V0FLRztRQUNILHdDQUFVLEdBQVYsVUFBVyxpQkFBeUI7WUFFaEMsaUJBQU0sVUFBVSxZQUFDLGlCQUFpQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3hDLGlCQUFNLGdCQUFnQixZQUFDLGVBQWUsQ0FBQyxDQUFDO1lBRXhDLDhCQUE4QjtZQUM5QixpQkFBTSxnQkFBZ0IsWUFBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDbkMsQ0FBQztRQVVELHNCQUFXLHdDQUFPO1lBTGxCOzs7O2VBSUc7aUJBQ0gsVUFBbUIsV0FBd0Q7Z0JBQTNFLGlCQWVDO2dCQWRHLFdBQVcsQ0FBQyxPQUFPLENBQUM7b0JBQ2hCLEtBQUksQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDO29CQUM1QixvQ0FBb0M7b0JBQ3BDLEtBQUksQ0FBQyxxQkFBcUIsR0FBRyxLQUFJLENBQUMsNEJBQTRCLEVBQUUsQ0FBQztvQkFDakUsc0JBQXNCO29CQUN0QixLQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN0Qyx3REFBd0Q7b0JBQ3hELElBQUksS0FBSSxDQUFD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ckQsQ0FBQztRQUVKOzs7Ozs7V0FNTTtRQUNLLDRDQUFjLEdBQXRCLFVBQXVCLFNBQXFCO1lBQ3hDLElBQUksWUFBWSxHQUFHLElBQUksMkRBQTRCLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDL0QsSUFBRyxJQUFJLENBQUMsNkJBQTZCLElBQUksU0FBUyxFQUFDO2dCQUMvQywyREFBMkQ7Z0JBQzNELFlBQVksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7Z0JBQ2hGLHFEQUFxRDtnQkFDckQsSUFBSSxDQUFDLDZCQUE2QixDQUFDLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQztnQkFDL0YsSUFBSSxDQUFDLDZCQUE2QixDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ2hEO1lBQ0QsSUFBSSxDQUFDLDZCQUE2QixHQUFHLFlBQVksQ0FBQztZQUN4RCxJQUFJLENBQUMsNkJBQTZCLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBQy9GLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLENBQUM7UUFDbEQsQ0FBQztRQUVFOzs7Ozs7V0FNRztRQUNLLHFDQUFPLEdBQWYsVUFBZ0IsNEJBQW9FO1lBQ2hGLElBQUcsNEJBQTRCLElBQUksU0FBUyxFQUFDO2dCQUN6QyxJQUFJLENBQUMsUUFBUSxDQUFDLDRCQUE0QixDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7YUFDOUQ7UUFDTCxDQUFDO1FBQ0wsMEJBQUM7SUFBRCxDQUFDLEFBNVNELENBQWtDLHVDQUFrQixHQTRTbkQ7SUFFUSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vbGlicy91aS9UeXBlcy9lai53ZWIuYWxsLmQudHNcIiAvPlxyXG5pbXBvcnQgeyBDb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsIH0gZnJvbSBcIi4vbW9kZWwvY29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbFwiO1xyXG5pbXBvcnQgeyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MsIE1vZGVsQ2hhbmdlVHlwZSwgSURhdGFNb2RlbCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvZGF0YU1vZGVsSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFRyZWVHcmlkV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vdHJlZUdyaWRXaWRnZXRCYXNlXCI7XHJcbmltcG9ydCB7IENtVHJlZUdyaWRDZWxsRWRpdFRlbXBsYXRlIH0gZnJvbSBcIi4vdmlldy9jbVRyZWVHcmlkQ2VsbEVkaXRUZW1wbGF0ZVwiO1xyXG5pbXBvcnQgeyBDbVRyZWVHcmlkQ2VsbEVkaXRFdmVudHMgfSBmcm9tIFwiLi92aWV3L2NtVHJlZUdyaWRDZWxsRWRpdEV2ZW50c1wiO1xyXG5pbXBvcnQgeyBDbVRyZWVHcmlkQ2VsbFN0eWxlIH0gZnJvbSBcIi4vdmlldy9jbVRyZWVHcmlkQ2VsbFN0eWxlXCI7XHJcbmltcG9ydCB7IENtVHJlZUdyaWRUb29sYmFyIH0gZnJvbSBcIi4vdmlldy9jbVRyZWVHcmlkVG9vbGJhclwiO1xyXG5pbXBvcnQgeyBQcm9wZXJ0eSB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvcHJvcGVydHlcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIsIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kIH0gZnJvbSBcIi4uLy4uL21vZGVscy9vbmxpbmUvbWFwcENvY2twaXRDb21wb25lbnRcIjtcclxuaW1wb3J0ICogYXMgRGF0YU1vZGVscyBmcm9tICcuLi8uLi9tb2RlbHMvZGF0YU1vZGVscyc7XHJcblxyXG5jbGFzcyBDb25maWdNYW5hZ2VyV2lkZ2V0IGV4dGVuZHMgVHJlZUdyaWRXaWRnZXRCYXNlIHtcclxuXHRcclxuICAgIHByaXZhdGUgX2NvbmZpZ01hbmFnZXJXaWRnZXREYXRhTW9kZWw6IENvbmZpZ01hbmFnZXJXaWRnZXREYXRhTW9kZWx8dW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfdG9vbGJhciE6IENtVHJlZUdyaWRUb29sYmFyO1xyXG5cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfZGF0YU1vZGVsQ2hhbmdlZEhhbmRsZXIgPSAoc2VuZGVyLCBldmVudEFyZ3MpID0+IHsgdGhpcy5oYW5kbGVHcmlkRW5kRWRpdChldmVudEFyZ3MpIH07XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogSW5pdGl0YWxpemUgdGhlIGNvbmZpZ21hbmFnZXJ3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGF5b3V0Q29udGFpbmVySWRcclxuICAgICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQ6IHN0cmluZyl7XHJcblxyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQsIDMwKTtcclxuICAgICAgICBzdXBlci5zZXRIZWFkZXJDb250ZW50KFwiQ29uZmlndXJhdGlvblwiKTtcclxuXHJcbiAgICAgICAgLy8gU2V0IGR5bmFtaWMgY29sdW1uIHNldHRpbmdzXHJcbiAgICAgICAgc3VwZXIuc2V0RHluYW1pY0NvbHVtbigzLCAxMDApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX21ldGhvZHM6UHJvcGVydHk8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRNZXRob2Q+PiA9IFByb3BlcnR5LmNyZWF0ZTxNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFtdPihbXSk7XHJcbiAgICBwcml2YXRlIF9zYXZlUGFyYW1ldGVyc01ldGhvZDogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2R8dW5kZWZpbmVkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgbWV0aG9kcyBkYXRhIGxpbmsgYXMgYSByZWZlcmVuY2UgdG8gdGhlIG1ldGhvZHMgdG8gYmUgZGlzcGxheWVkXHJcbiAgICAgKiBcclxuICAgICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgbWV0aG9kcyhtZXRob2RzTGluazogUHJvcGVydHk8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRNZXRob2Q+Pikge1xyXG4gICAgICAgIG1ldGhvZHNMaW5rLmNoYW5nZWQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9tZXRob2RzID0gbWV0aG9kc0xpbms7XHJcbiAgICAgICAgICAgIC8vIGdldCB0aGUgc2F2ZSBjb25maWd1cmF0aW9uIG1ldGhvZFxyXG4gICAgICAgICAgICB0aGlzLl9zYXZlUGFyYW1ldGVyc01ldGhvZCA9IHRoaXMucmV0cmlldmVTYXZlUGFyYW1ldGVyc01ldGhvZCgpO1xyXG4gICAgICAgICAgICAvLyBkaXNhYmxlIHNhdmUgYnV0dG9uXHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2xiYXIuZGlzYWJsZVNhdmVCdXR0b24odHJ1ZSk7XHJcbiAgICAgICAgICAgIC8vIGVuYWJsZSB0aGUgc2F2ZSBidXR0b24gZGVwZW5kaW5nIG9uIGV4ZWN1dGFibGUgc3RhdGUuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9zYXZlUGFyYW1ldGVyc01ldGhvZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdG9vbGJhci5kaXNhYmxlU2F2ZUJ1dHRvbighdGhpcy5fc2F2ZVBhcmFtZXRlcnNNZXRob2QuaXNFeGVjdXRhYmxlLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NhdmVQYXJhbWV0ZXJzTWV0aG9kLmlzRXhlY3V0YWJsZS5jaGFuZ2VkKChpc0V4ZWN1dGFibGUpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9vbGJhci5kaXNhYmxlU2F2ZUJ1dHRvbighaXNFeGVjdXRhYmxlKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJldHJpZXZlU2F2ZVBhcmFtZXRlcnNNZXRob2QoKTpNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWV0aG9kcy52YWx1ZS5maWx0ZXIobWV0aG9kID0+IG1ldGhvZC5icm93c2VOYW1lID09IFwiU2F2ZSBDb25maWdcIilbMF07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBjb25maWd1cmF0aW9ucGFyYW1ldGVycyBhcyB0aGUgZGF0YSBzb3VyY2UgZm9yIHRoZSBjb25maWd1cmF0aW9uIG1hbmFnZXIgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBjb25maWd1cmF0aW9uUGFyYW1ldGVycyhjb21wb25lbnRQYXJhbWV0ZXJzOiBQcm9wZXJ0eTxBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4+KSB7XHJcbiAgICAgICAgdmFyIGNvbmZpZ01hbmFnZXJEYXRhTW9kZWwgPSBEYXRhTW9kZWxzLkNvbmZpZ01hbmFnZXJEYXRhTW9kZWwuY3JlYXRlKCk7XHJcblxyXG4gICAgICAgIC8vIHVzZSB0aGUgY29tcG9uZW50IG1vZGVsIGFzIHRoZSBkYXRhIHNvdXJjZSBmb3Igd2F0Y2hhYmxlcyBcclxuICAgICAgICAvL2NvbmZpZ01hbmFnZXJEYXRhTW9kZWwuZGF0YVNvdXJjZSA9ICg8RGF0YU1vZGVscy5JTWFwcENvY2twaXREYXRhTW9kZWw+dGhpcy5kYXRhTW9kZWwpLmRhdGFTb3VyY2U7XHJcbiAgICAgICAgY29uZmlnTWFuYWdlckRhdGFNb2RlbC5pbml0aWFsaXplKCk7XHJcbiAgICAgICAgY29uZmlnTWFuYWdlckRhdGFNb2RlbC5jb25maWd1cmF0aW9uUGFyYW1ldGVycyA9IGNvbXBvbmVudFBhcmFtZXRlcnM7XHJcbiAgICAgICAgdGhpcy5kYXRhTW9kZWwgPSBjb25maWdNYW5hZ2VyRGF0YU1vZGVsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgbGF5b3V0IG9mIHRoZSB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBjcmVhdGVMYXlvdXQoKSB7XHJcbiAgICAgICAgdmFyICR0YWJQYXJlbnRDb250ZW50ID0gJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCk7XHJcbiAgICAgICAgJHRhYlBhcmVudENvbnRlbnRbMF0uc3R5bGUub3ZlcmZsb3cgPVwiaGlkZGVuXCI7XHJcbiAgICAgICAgJHRhYlBhcmVudENvbnRlbnQuYXBwZW5kKHRoaXMuZ2V0U2NyaXB0SW5mb3JtYXRpb25Gb3JUcmVlR3JpZCgpKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBnZXRTY3JpcHRJbmZvcm1hdGlvbkZvclRyZWVHcmlkKCkgOiBzdHJpbmd7XHJcblx0XHR2YXIgc3RyID1cclxuXHRcdGA8c2NyaXB0IHR5cGU9XCJ0ZXh0L3gtanNyZW5kZXJcIiBpZD1cImNtRGlzcGxheU5hbWVDb2x1bW5UZW1wbGF0ZVwiPlxyXG5cdFx0XHRcdDxkaXYgc3R5bGU9J2hlaWdodDoyMHB4OycgdW5zZWxlY3RhYmxlPSdvbic+XHJcblx0XHRcdFx0XHR7e2lmIGhhc0NoaWxkUmVjb3Jkc319XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9J2ludGVuZCcgc3R5bGU9J2hlaWdodDoxcHg7IGZsb2F0OmxlZnQ7IHdpZHRoOnt7OmxldmVsKjIwfX1weDsgZGlzcGxheTppbmxpbmUtYmxvY2s7Jz48L2Rpdj5cclxuXHRcdFx0XHRcdHt7ZWxzZSAhaGFzQ2hpbGRSZWNvcmRzfX1cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz0naW50ZW5kJyBzdHlsZT0naGVpZ2h0OjFweDsgZmxvYXQ6bGVmdDsgd2lkdGg6e3s6bGV2ZWwqMjB9fXB4OyBkaXNwbGF5OmlubGluZS1ibG9jazsnPjwvZGl2PlxyXG5cdFx0XHRcdFx0e3svaWZ9fVxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz0nIHt7aWYgZXhwYW5kZWR9fWUtdHJlZWdyaWRleHBhbmQgZS1jbXRyZWVncmlkZXhwYW5kIHt7ZWxzZSBoYXNDaGlsZFJlY29yZHN9fWUtdHJlZWdyaWRjb2xsYXBzZSBlLWNtdHJlZWdyaWRjb2xsYXBzZSB7ey9pZn19IHt7aWYgIWV4cGFuZGVkICYmICFoYXNDaGlsZFJlY29yZHN9fWUtZG9jIGUtY21kb2N7ey9pZn19JyBzdHlsZT0naGVpZ2h0OjIwcHg7d2lkdGg6MzBweDttYXJnaW46YXV0bztmbG9hdDpsZWZ0O21hcmdpbi1sZWZ0OjEwcHg7Jz48L2Rpdj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9J2UtY2VsbCcgc3R5bGU9J2Rpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOjEwMCUnIHVuc2VsZWN0YWJsZT0nb24nPnt7OiNkYXRhWydkaXNwbGF5TmFtZSddfX08L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdDwvc2NyaXB0PmBcclxuXHJcbiAgICAgIHJldHVybiBzdHI7XHJcblx0fVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZCB0aGUgc3R5bGVzIGZvciB0aGUgY29uZmlnIG1hbmFnZXJcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBsb2FkU3R5bGVzKCl7XHJcbiAgICAgICAgc3VwZXIuYWRkU3R5bGUoXCJ3aWRnZXRzL2NvbmZpZ01hbmFnZXJXaWRnZXQvc3R5bGUvY3NzL3RyZWVHcmlkSWNvblN0eWxlcy5jc3NcIik7XHJcbiAgICB9XHJcblxyXG5cdGhhbmRsZU1vZGVsQ2hhbmdlZChzZW5kZXI6IElEYXRhTW9kZWwsIGRhdGE6IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyk6IGFueSB7XHJcblx0XHR0aGlzLnVwZGF0ZUdyaWREYXRhKHNlbmRlcik7XHJcblx0XHRcclxuXHRcdC8vIGFmdGVyIHBvcHVsYXRpbmcgdGhlIGNvbmZpZ3VyYXRpb25QYXJhbWV0ZXMgd2Ugc3RhcnQgb2JzZXJ2aW5nIGNoYW5nZXMgb2YgdGhlIHBhcmFtZXRlcnNcclxuXHRcdC8vdGhpcy5zdGFydE9ic2VydmluZ0NvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzKCg8Q29uZmlnTWFuYWdlckRhdGFNb2RlbD50aGlzLmRhdGFNb2RlbCkuX2FjdHVhbENvbXBvbmVudERhdGEpO1xyXG5cdH1cclxuXHRcclxuXHQvKipcclxuICAgICAqIEhhbmRsZXMgdGhlIGNoYW5nZXMgb2Ygb2JzZXJ2ZWQgaXRlbXMgcmVxdWVzdGVkIGJ5ICdvYnNlcnZlRGF0YU1vZGVsSXRlbXMnXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJRGF0YU1vZGVsfSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7RXZlbnRNb2RlbENoYW5nZWRBcmdzfSBldmVudEFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGhhbmRsZU1vZGVsSXRlbXNDaGFuZ2VkKHNlbmRlcjogSURhdGFNb2RlbCwgZXZlbnRBcmdzOiBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MpIHtcclxuXHRcdHRoaXMudXBkYXRlR3JpZERhdGEoc2VuZGVyKTtcclxuXHR9XHJcblx0XHJcbiAgICBoYW5kbGVHcmlkRW5kRWRpdChhcmdzOiBhbnkpOiBhbnkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBjaGFuZ2VIaW50ID0ge1xyXG4gICAgICAgICAgICBoaW50OiBcImNoYW5nZWQgcGFyYW1ldGVyIHZhbHVlXCIsXHJcbiAgICAgICAgICAgIGNoYW5nZWRJdGVtRGF0YSA6IGFyZ3MuY2hhbmdlZEl0ZW1EYXRhLCAgXHJcbiAgICAgICAgICAgIG5ld0l0ZW1EYXRhIDogYXJncy5uZXdJdGVtRGF0YSwgXHJcbiAgICAgICAgfVxyXG5cdFx0dmFyIGV2ZW50QXJncyA9IG5ldyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3ModGhpcywgTW9kZWxDaGFuZ2VUeXBlLnVwZGF0ZVNvdXJjZSwgY2hhbmdlSGludCwgdGhpcy5kYXRhTW9kZWwpO1xyXG5cdFx0dGhpcy5kYXRhTW9kZWwhLm9uTW9kZWxDaGFuZ2VkKHRoaXMuZGF0YU1vZGVsISwgZXZlbnRBcmdzKTtcclxuICAgIH1cclxuXHJcblx0LyoqXHJcbiAgICAgKiBBY3RpdmF0ZSB0aGUgY29uZmlnbWFuYWdlcndpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGFjdGl2YXRlKCl7XHJcbiAgICAgICAgaWYoKDxhbnk+dGhpcy5kYXRhTW9kZWwpLl9hY3R1YWxDb21wb25lbnREYXRhKXtcclxuICAgICAgICAgICAgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIuYWN0aXZhdGVDb21wb25lbnRNb2RlbEl0ZW1zKHRoaXMuZGF0YU1vZGVsLCg8YW55PnRoaXMuZGF0YU1vZGVsKS5fYWN0dWFsQ29tcG9uZW50RGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIERlYWN0aXZhdGUgdGhlIGNvbmZpZ21hbmFnZXJ3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBkZWFjdGl2YXRlKCl7XHJcbiAgICAgICAgaWYoKDxhbnk+dGhpcy5kYXRhTW9kZWwpLl9hY3R1YWxDb21wb25lbnREYXRhKXtcclxuICAgICAgICAgICAgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIuZGVhY3RpdmF0ZUNvbXBvbmVudE1vZGVsSXRlbXModGhpcy5kYXRhTW9kZWwsKDxhbnk+dGhpcy5kYXRhTW9kZWwpLl9hY3R1YWxDb21wb25lbnREYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNwb3NlIHRoZSBjb25maWdtYW5hZ2Vyd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgZGlzcG9zZSgpe1xyXG4gICAgICAgIGlmKCg8YW55PnRoaXMuZGF0YU1vZGVsKS5fYWN0dWFsQ29tcG9uZW50RGF0YSl7XHJcbiAgICAgICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyLnVub2JzZXJ2ZUNvbXBvbmVudE1vZGVsSXRlbXModGhpcy5kYXRhTW9kZWwsKDxhbnk+dGhpcy5kYXRhTW9kZWwpLl9hY3R1YWxDb21wb25lbnREYXRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMuZGF0YU1vZGVsICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YU1vZGVsLmRpc3Bvc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcclxuICAgIH1cclxuICAgICAgXHJcblx0LyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSB0cmVlIGdyaWQgZm9yIHRoZSBjb25maWd1cmF0aW9uIHN0cnVjdHVyZVxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBjcmVhdGVUcmVlR3JpZCgpe1xyXG4gICAgICAgIGxldCBjZWxsRWRpdEV2ZW50cyA9IG5ldyBDbVRyZWVHcmlkQ2VsbEVkaXRFdmVudHMoKTtcclxuICAgICAgICBsZXQgY2VsbFN0eWxlID0gbmV3IENtVHJlZUdyaWRDZWxsU3R5bGUoKTtcclxuICAgICAgICBcclxuICAgICAgICAoPGFueT4kKHRoaXMuY3NzUGFyZW50Q29udGVudElkKSkuZWpUcmVlR3JpZCh7XHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCksXHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRDb2x1bW5SZXNpemVTdXBwb3J0KCksXHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRUb29sYmFyU3VwcG9ydCgpLFx0XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBkYXRhU291cmNlOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIGNoaWxkTWFwcGluZzpcImNoaWxkc1wiLFxyXG4gICAgICAgICAgICBleHBhbmRTdGF0ZU1hcHBpbmc6IFwiZXhwYW5kU3RhdGVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGFsbG93UmVvcmRlcmluZzogZmFsc2UsXHJcbiAgICAgICAgICAgIGVkaXRTZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgYWxsb3dFZGl0aW5nOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgYWxsb3dEZWxldGluZyA6IGZhbHNlLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgIFxyXG5cdFx0XHRleHBhbmRlZDogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWROb2RlRXhwYW5kZWRPckNvbGxhcHNlZCgpLFxyXG5cdFx0XHRjb2xsYXBzZWQ6IChhcmdzKSA9PiB0aGlzLnRyZWVHcmlkTm9kZUV4cGFuZGVkT3JDb2xsYXBzZWQoKSxcclxuICAgICAgICAgICAgcXVlcnlDZWxsSW5mbzogKGFyZ3MpID0+IGNlbGxTdHlsZS5zZXRDZWxsU3R5bGUoYXJncyksXHJcbiAgICAgICAgICAgIGJlZ2luRWRpdDogKGFyZ3MpID0+IGNlbGxFZGl0RXZlbnRzLmJlZ2luRWRpdChhcmdzLCB0aGlzLl9jb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsKSxcclxuICAgICAgICAgICAgZW5kRWRpdDogKGFyZ3MpID0+IGNlbGxFZGl0RXZlbnRzLmVuZEVkaXQoYXJncywgdGhpcy5fY29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbCksXHJcbiAgICAgICAgICAgIGNyZWF0ZTogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWRDcmVhdGVkKCksXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCBjb2x1bW4gZGVmaW5pdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbigpOiB7fXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjb2x1bW5zOiBbXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcImRpc3BsYXlOYW1lXCIsIGhlYWRlclRleHQ6IFwiTmFtZVwiLCB3aWR0aDogXCIzMDBcIiwgaXNUZW1wbGF0ZUNvbHVtbjogdHJ1ZSwgdGVtcGxhdGVJRDogXCJjbURpc3BsYXlOYW1lQ29sdW1uVGVtcGxhdGVcIiB9LFxyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJkaXNwbGF5VmFsdWVcIiwgaGVhZGVyVGV4dDogXCJWYWx1ZVwiLCB3aWR0aDogXCIxODBcIiwgZWRpdFR5cGU6IFwic3RyaW5nZWRpdFwiLCBlZGl0VGVtcGxhdGU6IENtVHJlZUdyaWRDZWxsRWRpdFRlbXBsYXRlLmNyZWF0ZUluc3RhbmNlKCl9LFxyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJ1bml0XCIsIGhlYWRlclRleHQ6IFwiVW5pdFwiLCB3aWR0aDogXCIxMDBcIiB9LFxyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJkZXNjcmlwdGlvblwiLCBoZWFkZXJUZXh0OiBcIkRlc2NyaXB0aW9uXCIsIHdpZHRoOiBcIjQwMFwiIH0sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCBjb2x1bW4gcmVzaXplIHNldHRpbmdzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VHJlZUdyaWRDb2x1bW5SZXNpemVTdXBwb3J0KCk6IHt9e1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGFsbG93Q29sdW1uUmVzaXplOiB0cnVlLFxyXG4gICAgICAgICAgICBjb2x1bW5SZXNpemVTZXR0aW5nczogeyBjb2x1bW5SZXNpemVNb2RlOiBlai5UcmVlR3JpZC5Db2x1bW5SZXNpemVNb2RlLkZpeGVkQ29sdW1ucyB9LFxyXG4gICAgICAgICAgICBjb2x1bW5SZXNpemVkOiAoYXJncykgPT4gc3VwZXIucmVzaXplRHluYW1pY0NvbHVtbihhcmdzLmNvbHVtbkluZGV4LCBhcmdzLm1vZGVsKSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJlZSBncmlkIHRvb2xiYXIgc2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmVlR3JpZFRvb2xiYXJTdXBwb3J0KCk6IHt9e1xyXG4gICAgICAgIHRoaXMuX3Rvb2xiYXIgPSBuZXcgQ21UcmVlR3JpZFRvb2xiYXIodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRvb2xiYXJTZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgc2hvd1Rvb2xiYXI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjdXN0b21Ub29sYmFySXRlbXM6IHRoaXMuX3Rvb2xiYXIuZ2V0Q3VzdG9tVG9vbGJhcnMoKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0b29sYmFyQ2xpY2s6IChhcmdzKSA9PiB0aGlzLl90b29sYmFyLnRvb2xiYXJDbGljayhhcmdzLCB0aGlzLl9zYXZlUGFyYW1ldGVyc01ldGhvZCEpLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0cmVlR3JpZENyZWF0ZWQoKXtcclxuICAgICAgICAvLyBTZXRzIHRoZSBjdXN0b20gdG9vbGJhciBpY29uc1xyXG4gICAgICAgIHRoaXMuX3Rvb2xiYXIuc2V0U3R5bGVGb3JUb29sYmFySWNvbnMoKTtcclxuICAgIH1cdFxyXG5cclxuICAgIHByaXZhdGUgdHJlZUdyaWROb2RlRXhwYW5kZWRPckNvbGxhcHNlZCgpe1xyXG4gICAgICAgIC8vIFJlZnJlc2ggdG8gc2VlIGNvcnJlY3QgZXhwYW5kZWQvY29sbGFwc2VkIGljb25cclxuICAgICAgICB0aGlzLnJlZnJlc2godGhpcy5fY29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbCk7XHJcbiAgICB9XHJcblxyXG5cdC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgZ3JpZHMgZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0lEYXRhTW9kZWx9IGRhdGFNb2RlbFxyXG4gICAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVHcmlkRGF0YShkYXRhTW9kZWw6IElEYXRhTW9kZWwpIHtcclxuICAgICAgICBsZXQgbmV3RGF0YU1vZGVsID0gbmV3IENvbmZpZ01hbmFnZXJXaWRnZXREYXRhTW9kZWwoZGF0YU1vZGVsKTtcclxuICAgICAgICBpZih0aGlzLl9jb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIHNldCBleHBhbmRzIHN0YXRlcyBmcm9tIHRoZSBjdXJyZW50IHRvIHRoZSBuZXcgZGF0YW1vZGVsXHJcbiAgICAgICAgICAgIG5ld0RhdGFNb2RlbC5zZXRFeHBhbmRTdGF0ZXModGhpcy5fY29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbC5nZXREYXRhTW9kZWwoKSk7XHJcbiAgICAgICAgICAgIC8vIGRldGFjaCBkYXRhbW9kZWwgY2hhbmdlZCBldmVudHMgZnJvbSBvbGQgZGF0YW1vZGVsXHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZ01hbmFnZXJXaWRnZXREYXRhTW9kZWwuZXZlbnREYXRhTW9kZWxDaGFuZ2VkLmRldGFjaCh0aGlzLl9kYXRhTW9kZWxDaGFuZ2VkSGFuZGxlcik7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZ01hbmFnZXJXaWRnZXREYXRhTW9kZWwuZGlzcG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9jb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsID0gbmV3RGF0YU1vZGVsO1xyXG5cdFx0dGhpcy5fY29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbC5ldmVudERhdGFNb2RlbENoYW5nZWQuYXR0YWNoKHRoaXMuX2RhdGFNb2RlbENoYW5nZWRIYW5kbGVyKTtcclxuXHRcdHRoaXMucmVmcmVzaCh0aGlzLl9jb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsKTtcclxuXHR9XHJcblx0ICAgICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiByZWZyZXNoZXMgdGhlIHRyZWUgZ3JpZHMgZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0NvbmZpZ01hbmFnZXJXaWRnZXREYXRhTW9kZWx9IGNvbmZpZ01hbmFnZXJXaWRnZXREYXRhTW9kZWxcclxuICAgICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVmcmVzaChjb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsOiBDb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsfHVuZGVmaW5lZCl7XHJcbiAgICAgICAgaWYoY29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLnNldE1vZGVsKGNvbmZpZ01hbmFnZXJXaWRnZXREYXRhTW9kZWwuZ2V0RGF0YU1vZGVsKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgQ29uZmlnTWFuYWdlcldpZGdldCB9OyJdfQ==