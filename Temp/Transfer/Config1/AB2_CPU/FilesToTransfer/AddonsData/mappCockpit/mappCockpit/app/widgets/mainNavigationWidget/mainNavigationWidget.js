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
define(["require", "exports", "../common/layoutWidgetBase", "../tabWidget/interfaces/tabWidgetInterface", "../common/viewTypeProvider", "../../framework/property", "../common/uniqueIdGenerator", "./defaultComponentSettings", "../../common/componentBase/contextIds/ctxComponentView", "../../common/componentBase/componentContext"], function (require, exports, layoutWidgetBase_1, tabWidgetInterface_1, viewTypeProvider_1, property_1, uniqueIdGenerator_1, defaultComponentSettings_1, ctxComponentView_1, componentContext_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MainNavigationWidget = /** @class */ (function (_super) {
        __extends(MainNavigationWidget, _super);
        function MainNavigationWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._sideBarMap = {};
            return _this;
        }
        MainNavigationWidget.prototype.initializeComponent = function () {
            this.component.defaultSettingsDataId = defaultComponentSettings_1.DefaultComponentSettings.WidgetDefinitionId;
            this.component.disablePersisting();
        };
        /**
         * Returns the default component settings for this widget
         *
         * @returns {(ComponentSettings|undefined)}
         * @memberof MainNavigationWidget
         */
        MainNavigationWidget.prototype.getDefaultComponentSettings = function () {
            return defaultComponentSettings_1.DefaultComponentSettings.getMainNavigationWidgetDefinition();
        };
        /**
         * Dispose the MainNavigationWidget
         *
         * @memberof MainNavigationWidget
         */
        MainNavigationWidget.prototype.dispose = function () {
            // Dispose widgets
            var keys = Object.keys(this._sideBarMap);
            for (var i = 0; i < keys.length; i++) {
                var sideBarObj = this._sideBarMap[keys[i]];
                if (sideBarObj != undefined) {
                    sideBarObj.dispose();
                }
            }
            if (this.sideBarWidget != undefined) {
                this.sideBarWidget.dispose();
            }
            _super.prototype.dispose.call(this);
        };
        /**
         * Adds SideBar to given Container
         *
         * @memberof MainNavigationWidget
         */
        MainNavigationWidget.prototype.createLayout = function () {
            this.sideBarWidget = this.component.getSubComponent(defaultComponentSettings_1.DefaultComponentSettings.SideBarWidgetId);
            this.sideBarWidget.initialize(this.parentContentId);
        };
        /**
         *Resize
         *
         * @param {number} width
         * @param {number} height
         * @memberof MainNavigationWidget
         */
        MainNavigationWidget.prototype.resize = function (width, height) {
            this._actualWidth = width;
            this._actualHeight = height;
            if (this.sideBarWidget != undefined) {
                this.sideBarWidget.resize(width, height);
            }
        };
        /**
         *Select Tab in Tabwidget
         *
         * @param {string} parent
         * @param {string} tabname
         * @param {ViewType} viewType
         * @memberof MainNavigationWidget
         */
        MainNavigationWidget.prototype.selectTab = function (parent, tabname, viewType) {
            var tabId = tabname + "_" + viewType.toString();
            tabId = uniqueIdGenerator_1.UniqueIdGenerator.getInstance().getUniqueIdFromString(tabId);
            tabId = tabId.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '_');
            this._sideBarMap[parent].selectTab(tabId);
            this.sideBarWidget.switchTab("tab_" + parent, parent + "_" + viewTypeProvider_1.ViewType.SideBarTab);
        };
        /**
         * Add Widget to SideBarTabs TabWidget
         *
         * @param {IWidget} widget
         * @param {string} tabName
         * @param {ViewType} viewType
         * @param {*} data
         * @memberof MainNavigationWidget
         */
        MainNavigationWidget.prototype.addWidget = function (widget, tabName, viewType, data) {
            this._sideBarMap[data["parent"]].addWidget(widget, tabName, viewType, data);
        };
        /**
         * Add Tab to SideBar
         *
         * @param {string} name
         * @param {string} iconPath
         * @returns {ITabWidget}
         * @memberof MainNavigationWidget
         */
        MainNavigationWidget.prototype.addSideBarTab = function (name, iconPath) {
            var newTabWidget = this.component.addSubComponent("TabWidget", "TabWidget_" + name, "", this.component.context);
            this.sideBarWidget.addWidget(newTabWidget, name, viewTypeProvider_1.ViewType.SideBarTab, iconPath);
            this._sideBarMap[name] = newTabWidget;
            return newTabWidget;
        };
        /**
         * Add UserWidget to SideBarTabs TabWidget
         *
         * @param {Widgets.ILoginWidget} loginWidget
         * @param {*} data
         * @memberof MainNavigationWidget
         */
        MainNavigationWidget.prototype.addUserWidget = function (loginWidget, data) {
            this._sideBarMap[data["parent"]].addWidget(loginWidget, data["parent"] + "_LoginView", viewTypeProvider_1.ViewType.User, { widgetPosition: tabWidgetInterface_1.TabWidgetWidgetPositons.right });
        };
        /**
         * Add ViewInstance of specific type
         *
         * @param {string} parent
         * @param {MappCockpitComponent} component
         * @param {ViewType} viewType
         * @param {boolean} select
         * @memberof MainNavigationWidget
         */
        MainNavigationWidget.prototype.addView = function (parent, component, viewType, select) {
            var tabWidget = this._sideBarMap[parent];
            if (!this.componentAlreadyOpen(tabWidget, component.displayName, viewType)) {
                var activeComponentLink = property_1.Property.create({});
                activeComponentLink.value = component;
                var widget = this.createWidgetForViewType(viewType, component.browseName);
                if (widget != undefined) {
                    tabWidget.addWidget(widget, component.displayName, viewType, { widgetPosition: tabWidgetInterface_1.TabWidgetWidgetPositons.flex });
                    // activeComponent must be set after addWidget(=> add widget initializes the widget data fully, which will be needed)
                    widget.activeComponent = activeComponentLink;
                }
            }
            if (select) {
                this.selectTab(parent, component.displayName, viewType);
            }
        };
        /**
         * Creates and returns a widget for the given viewType
         *
         * @private
         * @param {ViewType} viewType
         * @returns {(IWidget|undefined)}
         * @memberof MainNavigationWidget
         */
        MainNavigationWidget.prototype.createWidgetForViewType = function (viewType, contextComponentId) {
            var componentType = "";
            var componentId = "";
            if (viewType == viewTypeProvider_1.ViewType.Analysis) {
                componentType = "TraceViewWidget";
                componentId = "TraceViewWidget";
            }
            else if (viewType == viewTypeProvider_1.ViewType.Configuration) {
                componentType = "TraceConfigurationViewWidget";
                componentId = "TraceConfigurationViewWidget";
            }
            else if (viewType == viewTypeProvider_1.ViewType.Common) {
                componentType = "ComponentViewWidget";
                componentId = "ComponentViewWidget";
            }
            if (componentType != "" && componentId != "") {
                var context = new componentContext_1.ComponentContext();
                context.data.set(ctxComponentView_1.CtxComponentView.componentId, contextComponentId);
                return this.component.addSubComponent(componentType, componentId, "", context);
            }
            return undefined;
        };
        /**
         * Test if view of component ist already open
         *
         * @private
         * @param {*} tabWidget
         * @param {string} componentName
         * @param {string} viewType
         * @returns {boolean}
         * @memberof MainNavigationWidget
         */
        MainNavigationWidget.prototype.componentAlreadyOpen = function (tabWidget, componentName, viewType) {
            var tabs = tabWidget.dataModel.data.flexTabs;
            var componentAlreadyOpen = false;
            tabs.forEach(function (tab) {
                var tabId = uniqueIdGenerator_1.UniqueIdGenerator.getInstance().getUniqueIdFromString(componentName + "_" + viewType);
                if (tab.tabName == tabId) {
                    componentAlreadyOpen = true;
                }
            });
            return componentAlreadyOpen;
        };
        return MainNavigationWidget;
    }(layoutWidgetBase_1.LayoutWidgetBase));
    exports.MainNavigationWidget = MainNavigationWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbk5hdmlnYXRpb25XaWRnZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvbWFpbk5hdmlnYXRpb25XaWRnZXQvbWFpbk5hdmlnYXRpb25XaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQWdCQTtRQUFtQyx3Q0FBZ0I7UUFBbkQ7WUFBQSxxRUE0TUM7WUF6TVcsaUJBQVcsR0FBbUMsRUFBRSxDQUFDOztRQXlNN0QsQ0FBQztRQXZNRyxrREFBbUIsR0FBbkI7WUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLHFCQUFxQixHQUFHLG1EQUF3QixDQUFDLGtCQUFrQixDQUFDO1lBQ25GLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN2QyxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSCwwREFBMkIsR0FBM0I7WUFDSSxPQUFPLG1EQUF3QixDQUFDLGlDQUFpQyxFQUFFLENBQUM7UUFDeEUsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSCxzQ0FBTyxHQUFQO1lBQ0ksa0JBQWtCO1lBQ2xCLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3pDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNsQyxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzQyxJQUFHLFVBQVUsSUFBSSxTQUFTLEVBQUM7b0JBQ3ZCLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztpQkFDeEI7YUFDSjtZQUVELElBQUcsSUFBSSxDQUFDLGFBQWEsSUFBSSxTQUFTLEVBQUM7Z0JBQy9CLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDaEM7WUFDRCxpQkFBTSxPQUFPLFdBQUUsQ0FBQztRQUNwQixDQUFDO1FBRUQ7Ozs7V0FJRztRQUNILDJDQUFZLEdBQVo7WUFDSSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLG1EQUF3QixDQUFDLGVBQWUsQ0FBMkIsQ0FBQztZQUN4SCxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDeEQsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNILHFDQUFNLEdBQU4sVUFBTyxLQUFhLEVBQUUsTUFBYztZQUNoQyxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztZQUMxQixJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQztZQUM1QixJQUFHLElBQUksQ0FBQyxhQUFhLElBQUksU0FBUyxFQUFDO2dCQUMvQixJQUFJLENBQUMsYUFBYyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7YUFDN0M7UUFDTCxDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNILHdDQUFTLEdBQVQsVUFBVSxNQUFjLEVBQUUsT0FBZSxFQUFFLFFBQWtCO1lBQ3pELElBQUksS0FBSyxHQUFHLE9BQU8sR0FBRyxHQUFHLEdBQUcsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2hELEtBQUssR0FBRyxxQ0FBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNyRSxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyw0QkFBNEIsRUFBQyxHQUFHLENBQUMsQ0FBQztZQUV4RCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUMsTUFBTSxFQUFFLE1BQU0sR0FBRSxHQUFHLEdBQUcsMkJBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNuRixDQUFDO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDSCx3Q0FBUyxHQUFULFVBQVUsTUFBZSxFQUFFLE9BQWUsRUFBRSxRQUFrQixFQUFFLElBQVU7WUFDdEUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0UsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSCw0Q0FBYSxHQUFiLFVBQWMsSUFBWSxFQUFFLFFBQWdCO1lBQ3hDLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxZQUFZLEdBQUcsSUFBSSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBZSxDQUFDO1lBQzlILElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxJQUFJLEVBQUUsMkJBQVEsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFFaEYsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxZQUFZLENBQUM7WUFFdEMsT0FBTyxZQUFZLENBQUM7UUFDeEIsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNILDRDQUFhLEdBQWIsVUFBYyxXQUFpQyxFQUFFLElBQVU7WUFDdkQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxZQUFZLEVBQUUsMkJBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBQyxjQUFjLEVBQUUsNENBQXVCLENBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQztRQUMzSixDQUFDO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDSCxzQ0FBTyxHQUFQLFVBQVEsTUFBYyxFQUFFLFNBQStCLEVBQUUsUUFBa0IsRUFBRSxNQUFlO1lBQ3hGLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFekMsSUFBRyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsRUFBQztnQkFFdEUsSUFBSSxtQkFBbUIsR0FBbUMsbUJBQVEsQ0FBQyxNQUFNLENBQTRCLEVBQUUsQ0FBQyxDQUFDO2dCQUN6RyxtQkFBbUIsQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO2dCQUN0QyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDMUUsSUFBRyxNQUFNLElBQUksU0FBUyxFQUFDO29CQUNuQixTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsV0FBVyxFQUFFLFFBQVEsRUFBRSxFQUFDLGNBQWMsRUFBRSw0Q0FBdUIsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDO29CQUM3RyxxSEFBcUg7b0JBQy9HLE1BQU8sQ0FBQyxlQUFlLEdBQUcsbUJBQW1CLENBQUM7aUJBQ3ZEO2FBQ0o7WUFDRCxJQUFHLE1BQU0sRUFBQztnQkFDTixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQzNEO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSyxzREFBdUIsR0FBL0IsVUFBZ0MsUUFBa0IsRUFBRSxrQkFBMEI7WUFDMUUsSUFBSSxhQUFhLEdBQUcsRUFBRSxDQUFDO1lBQ3ZCLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQztZQUNyQixJQUFHLFFBQVEsSUFBSSwyQkFBUSxDQUFDLFFBQVEsRUFBQztnQkFDN0IsYUFBYSxHQUFHLGlCQUFpQixDQUFDO2dCQUNsQyxXQUFXLEdBQUcsaUJBQWlCLENBQUM7YUFDbkM7aUJBQ0ksSUFBRyxRQUFRLElBQUksMkJBQVEsQ0FBQyxhQUFhLEVBQUM7Z0JBQ3ZDLGFBQWEsR0FBRyw4QkFBOEIsQ0FBQztnQkFDL0MsV0FBVyxHQUFHLDhCQUE4QixDQUFDO2FBQ2hEO2lCQUNJLElBQUcsUUFBUSxJQUFJLDJCQUFRLENBQUMsTUFBTSxFQUFDO2dCQUNoQyxhQUFhLEdBQUcscUJBQXFCLENBQUM7Z0JBQ3RDLFdBQVcsR0FBRyxxQkFBcUIsQ0FBQzthQUN2QztZQUNELElBQUcsYUFBYSxJQUFJLEVBQUUsSUFBSSxXQUFXLElBQUksRUFBRSxFQUFDO2dCQUN4QyxJQUFJLE9BQU8sR0FBRyxJQUFJLG1DQUFnQixFQUFFLENBQUM7Z0JBQ3JDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLG1DQUFnQixDQUFDLFdBQVcsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO2dCQUNuRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLGFBQWEsRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLE9BQU8sQ0FBWSxDQUFDO2FBQzdGO1lBQ0QsT0FBTyxTQUFTLENBQUM7UUFDckIsQ0FBQztRQUVEOzs7Ozs7Ozs7V0FTRztRQUNLLG1EQUFvQixHQUE1QixVQUE2QixTQUFTLEVBQUUsYUFBcUIsRUFBRSxRQUFrQjtZQUM3RSxJQUFJLElBQUksR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDN0MsSUFBSSxvQkFBb0IsR0FBRyxLQUFLLENBQUM7WUFDakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUc7Z0JBQ1osSUFBSSxLQUFLLEdBQUcscUNBQWlCLENBQUMsV0FBVyxFQUFFLENBQUMscUJBQXFCLENBQUMsYUFBYSxHQUFHLEdBQUcsR0FBRyxRQUFRLENBQUMsQ0FBQztnQkFDbEcsSUFBRyxHQUFHLENBQUMsT0FBTyxJQUFJLEtBQUssRUFBQztvQkFDcEIsb0JBQW9CLEdBQUcsSUFBSSxDQUFDO2lCQUMvQjtZQUNMLENBQUMsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxvQkFBb0IsQ0FBQztRQUNoQyxDQUFDO1FBQ0wsMkJBQUM7SUFBRCxDQUFDLEFBNU1ELENBQW1DLG1DQUFnQixHQTRNbEQ7SUFDTyxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMYXlvdXRXaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi9sYXlvdXRXaWRnZXRCYXNlXCI7XHJcbmltcG9ydCB7IElNYWluTmF2aWdhdGlvbldpZGdldCB9IGZyb20gXCIuL2ludGVyZmFjZXMvbWFpbk5hdmlnYXRpb25XaWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0ICogYXMgV2lkZ2V0cyBmcm9tIFwiLi4vLi4vd2lkZ2V0cy93aWRnZXRzXCI7XHJcbmltcG9ydCB7IElXaWRnZXQgfSBmcm9tIFwiLi4vY29tbW9uL2ludGVyZmFjZXMvd2lkZ2V0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElUYWJXaWRnZXQgfSBmcm9tIFwiLi4vdGFiV2lkZ2V0L2ludGVyZmFjZXMvdGFiV2lkZ2V0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFRhYldpZGdldFdpZGdldFBvc2l0b25zIH0gZnJvbSBcIi4uL3RhYldpZGdldC9pbnRlcmZhY2VzL3RhYldpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJU2lkZUJhcldpZGdldCB9IGZyb20gXCIuLi9zaWRlQmFyV2lkZ2V0L2ludGVyZmFjZXMvc2lkZUJhcldpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBWaWV3VHlwZSB9IGZyb20gXCIuLi9jb21tb24vdmlld1R5cGVQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBQcm9wZXJ0eSB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvcHJvcGVydHlcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBVbmlxdWVJZEdlbmVyYXRvciB9IGZyb20gXCIuLi9jb21tb24vdW5pcXVlSWRHZW5lcmF0b3JcIjtcclxuaW1wb3J0IHsgRGVmYXVsdENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4vZGVmYXVsdENvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCB7IEN0eENvbXBvbmVudFZpZXcgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29udGV4dElkcy9jdHhDb21wb25lbnRWaWV3XCI7XHJcbmltcG9ydCB7IENvbXBvbmVudENvbnRleHQgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50Q29udGV4dFwiO1xyXG5cclxuY2xhc3MgTWFpbk5hdmlnYXRpb25XaWRnZXQgZXh0ZW5kcyBMYXlvdXRXaWRnZXRCYXNlIGltcGxlbWVudHMgSU1haW5OYXZpZ2F0aW9uV2lkZ2V0e1xyXG4gICAgc2lkZUJhcldpZGdldCEgOiBJU2lkZUJhcldpZGdldDtcclxuXHJcbiAgICBwcml2YXRlIF9zaWRlQmFyTWFwOiB7IFtpZDogc3RyaW5nXSA6IElUYWJXaWRnZXQ7IH0gPSB7fTtcclxuXHJcbiAgICBpbml0aWFsaXplQ29tcG9uZW50KCl7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZGVmYXVsdFNldHRpbmdzRGF0YUlkID0gRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLldpZGdldERlZmluaXRpb25JZDtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5kaXNhYmxlUGVyc2lzdGluZygpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgY29tcG9uZW50IHNldHRpbmdzIGZvciB0aGlzIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsoQ29tcG9uZW50U2V0dGluZ3N8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBNYWluTmF2aWdhdGlvbldpZGdldFxyXG4gICAgICovXHJcbiAgICBnZXREZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MoKTogQ29tcG9uZW50U2V0dGluZ3N8dW5kZWZpbmVke1xyXG4gICAgICAgIHJldHVybiBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuZ2V0TWFpbk5hdmlnYXRpb25XaWRnZXREZWZpbml0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNwb3NlIHRoZSBNYWluTmF2aWdhdGlvbldpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYWluTmF2aWdhdGlvbldpZGdldFxyXG4gICAgICovXHJcbiAgICBkaXNwb3NlKCl7XHJcbiAgICAgICAgLy8gRGlzcG9zZSB3aWRnZXRzXHJcbiAgICAgICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyh0aGlzLl9zaWRlQmFyTWFwKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHNpZGVCYXJPYmogPSB0aGlzLl9zaWRlQmFyTWFwW2tleXNbaV1dO1xyXG4gICAgICAgICAgICBpZihzaWRlQmFyT2JqICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBzaWRlQmFyT2JqLmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLnNpZGVCYXJXaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5zaWRlQmFyV2lkZ2V0LmRpc3Bvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBTaWRlQmFyIHRvIGdpdmVuIENvbnRhaW5lclxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYWluTmF2aWdhdGlvbldpZGdldFxyXG4gICAgICovXHJcbiAgICBjcmVhdGVMYXlvdXQoKSB7XHJcbiAgICAgICAgdGhpcy5zaWRlQmFyV2lkZ2V0ID0gdGhpcy5jb21wb25lbnQuZ2V0U3ViQ29tcG9uZW50KERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5TaWRlQmFyV2lkZ2V0SWQpIGFzIFdpZGdldHMuSVNpZGVCYXJXaWRnZXQ7XHJcbiAgICAgICAgdGhpcy5zaWRlQmFyV2lkZ2V0LmluaXRpYWxpemUodGhpcy5wYXJlbnRDb250ZW50SWQpOyAgICBcclxuICAgIH0gICAgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlJlc2l6ZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodFxyXG4gICAgICogQG1lbWJlcm9mIE1haW5OYXZpZ2F0aW9uV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHJlc2l6ZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcil7XHJcbiAgICAgICAgdGhpcy5fYWN0dWFsV2lkdGggPSB3aWR0aDtcclxuICAgICAgICB0aGlzLl9hY3R1YWxIZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgaWYodGhpcy5zaWRlQmFyV2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2lkZUJhcldpZGdldCEucmVzaXplKHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqU2VsZWN0IFRhYiBpbiBUYWJ3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGFyZW50XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGFibmFtZVxyXG4gICAgICogQHBhcmFtIHtWaWV3VHlwZX0gdmlld1R5cGVcclxuICAgICAqIEBtZW1iZXJvZiBNYWluTmF2aWdhdGlvbldpZGdldFxyXG4gICAgICovXHJcbiAgICBzZWxlY3RUYWIocGFyZW50OiBzdHJpbmcsIHRhYm5hbWU6IHN0cmluZywgdmlld1R5cGU6IFZpZXdUeXBlKXtcclxuICAgICAgICBsZXQgdGFiSWQgPSB0YWJuYW1lICsgXCJfXCIgKyB2aWV3VHlwZS50b1N0cmluZygpO1xyXG4gICAgICAgIHRhYklkID0gVW5pcXVlSWRHZW5lcmF0b3IuZ2V0SW5zdGFuY2UoKS5nZXRVbmlxdWVJZEZyb21TdHJpbmcodGFiSWQpO1xyXG4gICAgICAgIHRhYklkID0gdGFiSWQucmVwbGFjZSgvWyZcXC9cXFxcIywrKCkkfiUuJ1wiOio/PD57fV0vZywnXycpO1xyXG5cclxuICAgICAgICB0aGlzLl9zaWRlQmFyTWFwW3BhcmVudF0uc2VsZWN0VGFiKHRhYklkKTtcclxuICAgICAgICB0aGlzLnNpZGVCYXJXaWRnZXQuc3dpdGNoVGFiKFwidGFiX1wiK3BhcmVudCwgcGFyZW50KyBcIl9cIiArIFZpZXdUeXBlLlNpZGVCYXJUYWIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIFdpZGdldCB0byBTaWRlQmFyVGFicyBUYWJXaWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lXaWRnZXR9IHdpZGdldFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRhYk5hbWVcclxuICAgICAqIEBwYXJhbSB7Vmlld1R5cGV9IHZpZXdUeXBlXHJcbiAgICAgKiBAcGFyYW0geyp9IGRhdGFcclxuICAgICAqIEBtZW1iZXJvZiBNYWluTmF2aWdhdGlvbldpZGdldFxyXG4gICAgICovXHJcbiAgICBhZGRXaWRnZXQod2lkZ2V0OiBJV2lkZ2V0LCB0YWJOYW1lOiBzdHJpbmcsIHZpZXdUeXBlOiBWaWV3VHlwZSwgZGF0YSA6IGFueSl7XHJcbiAgICAgICAgdGhpcy5fc2lkZUJhck1hcFtkYXRhW1wicGFyZW50XCJdXS5hZGRXaWRnZXQod2lkZ2V0LHRhYk5hbWUsdmlld1R5cGUsZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgVGFiIHRvIFNpZGVCYXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGljb25QYXRoXHJcbiAgICAgKiBAcmV0dXJucyB7SVRhYldpZGdldH1cclxuICAgICAqIEBtZW1iZXJvZiBNYWluTmF2aWdhdGlvbldpZGdldFxyXG4gICAgICovXHJcbiAgICBhZGRTaWRlQmFyVGFiKG5hbWU6IHN0cmluZywgaWNvblBhdGg6IHN0cmluZykgOiBJVGFiV2lkZ2V0e1xyXG4gICAgICAgIGxldCBuZXdUYWJXaWRnZXQgPSB0aGlzLmNvbXBvbmVudC5hZGRTdWJDb21wb25lbnQoXCJUYWJXaWRnZXRcIiwgXCJUYWJXaWRnZXRfXCIgKyBuYW1lLCBcIlwiLCB0aGlzLmNvbXBvbmVudC5jb250ZXh0KSBhcyBJVGFiV2lkZ2V0O1xyXG4gICAgICAgIHRoaXMuc2lkZUJhcldpZGdldC5hZGRXaWRnZXQobmV3VGFiV2lkZ2V0LCBuYW1lLCBWaWV3VHlwZS5TaWRlQmFyVGFiLCBpY29uUGF0aCk7XHJcblxyXG4gICAgICAgIHRoaXMuX3NpZGVCYXJNYXBbbmFtZV0gPSBuZXdUYWJXaWRnZXQ7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXdUYWJXaWRnZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgVXNlcldpZGdldCB0byBTaWRlQmFyVGFicyBUYWJXaWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1dpZGdldHMuSUxvZ2luV2lkZ2V0fSBsb2dpbldpZGdldFxyXG4gICAgICogQHBhcmFtIHsqfSBkYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFpbk5hdmlnYXRpb25XaWRnZXRcclxuICAgICAqL1xyXG4gICAgYWRkVXNlcldpZGdldChsb2dpbldpZGdldDogV2lkZ2V0cy5JTG9naW5XaWRnZXQsIGRhdGEgOiBhbnkpe1xyXG4gICAgICAgIHRoaXMuX3NpZGVCYXJNYXBbZGF0YVtcInBhcmVudFwiXV0uYWRkV2lkZ2V0KGxvZ2luV2lkZ2V0LCBkYXRhW1wicGFyZW50XCJdICsgXCJfTG9naW5WaWV3XCIsIFZpZXdUeXBlLlVzZXIsIHt3aWRnZXRQb3NpdGlvbjogVGFiV2lkZ2V0V2lkZ2V0UG9zaXRvbnMucmlnaHR9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBWaWV3SW5zdGFuY2Ugb2Ygc3BlY2lmaWMgdHlwZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXJlbnRcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnR9IGNvbXBvbmVudFxyXG4gICAgICogQHBhcmFtIHtWaWV3VHlwZX0gdmlld1R5cGVcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2VsZWN0XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFpbk5hdmlnYXRpb25XaWRnZXRcclxuICAgICAqL1xyXG4gICAgYWRkVmlldyhwYXJlbnQ6IHN0cmluZywgY29tcG9uZW50OiBNYXBwQ29ja3BpdENvbXBvbmVudCwgdmlld1R5cGU6IFZpZXdUeXBlLCBzZWxlY3Q6IGJvb2xlYW4pe1xyXG4gICAgICAgIGxldCB0YWJXaWRnZXQgPSB0aGlzLl9zaWRlQmFyTWFwW3BhcmVudF07XHJcbiAgICBcclxuICAgICAgICBpZighdGhpcy5jb21wb25lbnRBbHJlYWR5T3Blbih0YWJXaWRnZXQsIGNvbXBvbmVudC5kaXNwbGF5TmFtZSwgdmlld1R5cGUpKXtcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGFjdGl2ZUNvbXBvbmVudExpbms6IFByb3BlcnR5PE1hcHBDb2NrcGl0Q29tcG9uZW50PiA9IFByb3BlcnR5LmNyZWF0ZTxNYXBwQ29ja3BpdENvbXBvbmVudD4oPGFueT57fSk7XHJcbiAgICAgICAgICAgIGFjdGl2ZUNvbXBvbmVudExpbmsudmFsdWUgPSBjb21wb25lbnQ7XHJcbiAgICAgICAgICAgIGxldCB3aWRnZXQgPSB0aGlzLmNyZWF0ZVdpZGdldEZvclZpZXdUeXBlKHZpZXdUeXBlLCBjb21wb25lbnQuYnJvd3NlTmFtZSk7XHJcbiAgICAgICAgICAgIGlmKHdpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgdGFiV2lkZ2V0LmFkZFdpZGdldCh3aWRnZXQsIGNvbXBvbmVudC5kaXNwbGF5TmFtZSwgdmlld1R5cGUsIHt3aWRnZXRQb3NpdGlvbjogVGFiV2lkZ2V0V2lkZ2V0UG9zaXRvbnMuZmxleH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gYWN0aXZlQ29tcG9uZW50IG11c3QgYmUgc2V0IGFmdGVyIGFkZFdpZGdldCg9PiBhZGQgd2lkZ2V0IGluaXRpYWxpemVzIHRoZSB3aWRnZXQgZGF0YSBmdWxseSwgd2hpY2ggd2lsbCBiZSBuZWVkZWQpXHJcbiAgICAgICAgICAgICAgICAoPGFueT53aWRnZXQpLmFjdGl2ZUNvbXBvbmVudCA9IGFjdGl2ZUNvbXBvbmVudExpbms7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoc2VsZWN0KXtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RUYWIocGFyZW50LCBjb21wb25lbnQuZGlzcGxheU5hbWUsIHZpZXdUeXBlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuZCByZXR1cm5zIGEgd2lkZ2V0IGZvciB0aGUgZ2l2ZW4gdmlld1R5cGVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtWaWV3VHlwZX0gdmlld1R5cGVcclxuICAgICAqIEByZXR1cm5zIHsoSVdpZGdldHx1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIE1haW5OYXZpZ2F0aW9uV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlV2lkZ2V0Rm9yVmlld1R5cGUodmlld1R5cGU6IFZpZXdUeXBlLCBjb250ZXh0Q29tcG9uZW50SWQ6IHN0cmluZyk6IElXaWRnZXR8dW5kZWZpbmVke1xyXG4gICAgICAgIGxldCBjb21wb25lbnRUeXBlID0gXCJcIjtcclxuICAgICAgICBsZXQgY29tcG9uZW50SWQgPSBcIlwiO1xyXG4gICAgICAgIGlmKHZpZXdUeXBlID09IFZpZXdUeXBlLkFuYWx5c2lzKXtcclxuICAgICAgICAgICAgY29tcG9uZW50VHlwZSA9IFwiVHJhY2VWaWV3V2lkZ2V0XCI7XHJcbiAgICAgICAgICAgIGNvbXBvbmVudElkID0gXCJUcmFjZVZpZXdXaWRnZXRcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih2aWV3VHlwZSA9PSBWaWV3VHlwZS5Db25maWd1cmF0aW9uKXtcclxuICAgICAgICAgICAgY29tcG9uZW50VHlwZSA9IFwiVHJhY2VDb25maWd1cmF0aW9uVmlld1dpZGdldFwiO1xyXG4gICAgICAgICAgICBjb21wb25lbnRJZCA9IFwiVHJhY2VDb25maWd1cmF0aW9uVmlld1dpZGdldFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHZpZXdUeXBlID09IFZpZXdUeXBlLkNvbW1vbil7XHJcbiAgICAgICAgICAgIGNvbXBvbmVudFR5cGUgPSBcIkNvbXBvbmVudFZpZXdXaWRnZXRcIjtcclxuICAgICAgICAgICAgY29tcG9uZW50SWQgPSBcIkNvbXBvbmVudFZpZXdXaWRnZXRcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoY29tcG9uZW50VHlwZSAhPSBcIlwiICYmIGNvbXBvbmVudElkICE9IFwiXCIpe1xyXG4gICAgICAgICAgICBsZXQgY29udGV4dCA9IG5ldyBDb21wb25lbnRDb250ZXh0KCk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuZGF0YS5zZXQoQ3R4Q29tcG9uZW50Vmlldy5jb21wb25lbnRJZCwgY29udGV4dENvbXBvbmVudElkKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29tcG9uZW50LmFkZFN1YkNvbXBvbmVudChjb21wb25lbnRUeXBlLCBjb21wb25lbnRJZCwgXCJcIiwgY29udGV4dCkgYXMgSVdpZGdldDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRlc3QgaWYgdmlldyBvZiBjb21wb25lbnQgaXN0IGFscmVhZHkgb3BlblxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHRhYldpZGdldFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbXBvbmVudE5hbWVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2aWV3VHlwZVxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFpbk5hdmlnYXRpb25XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb21wb25lbnRBbHJlYWR5T3Blbih0YWJXaWRnZXQsIGNvbXBvbmVudE5hbWU6IHN0cmluZywgdmlld1R5cGU6IFZpZXdUeXBlKTogYm9vbGVhbntcclxuICAgICAgICBsZXQgdGFicyA9IHRhYldpZGdldC5kYXRhTW9kZWwuZGF0YS5mbGV4VGFicztcclxuICAgICAgICBsZXQgY29tcG9uZW50QWxyZWFkeU9wZW4gPSBmYWxzZTtcclxuICAgICAgICB0YWJzLmZvckVhY2godGFiID0+IHtcclxuICAgICAgICAgICAgbGV0IHRhYklkID0gVW5pcXVlSWRHZW5lcmF0b3IuZ2V0SW5zdGFuY2UoKS5nZXRVbmlxdWVJZEZyb21TdHJpbmcoY29tcG9uZW50TmFtZSArIFwiX1wiICsgdmlld1R5cGUpO1xyXG4gICAgICAgICAgICBpZih0YWIudGFiTmFtZSA9PSB0YWJJZCl7XHJcbiAgICAgICAgICAgICAgICBjb21wb25lbnRBbHJlYWR5T3BlbiA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gY29tcG9uZW50QWxyZWFkeU9wZW47XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IHtNYWluTmF2aWdhdGlvbldpZGdldH0iXX0=