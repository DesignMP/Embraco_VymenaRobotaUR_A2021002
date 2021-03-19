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
define(["require", "exports", "../common/layoutWidgetBase", "../tabWidget/interfaces/tabWidgetInterface", "../common/viewTypeProvider", "../../framework/property", "../common/uniqueIdGenerator", "../../common/componentFactory/componentFactory", "../../common/componentFactory/componentDefinition"], function (require, exports, layoutWidgetBase_1, tabWidgetInterface_1, viewTypeProvider_1, property_1, uniqueIdGenerator_1, componentFactory_1, componentDefinition_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MainNavigationWidget = /** @class */ (function (_super) {
        __extends(MainNavigationWidget, _super);
        function MainNavigationWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._sideBarMap = {};
            return _this;
        }
        /**
         * Initialize MainNavigationWidget
         *
         * @param {string} layoutContainerId
         * @memberof MainNavigationWidget
         */
        MainNavigationWidget.prototype.initialize = function (layoutContainerId) {
            _super.prototype.initialize.call(this, layoutContainerId);
        };
        MainNavigationWidget.prototype.initializeComponent = function () {
            this.component.disablePersisting();
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
            this.sideBarWidget = componentFactory_1.ComponentFactory.getInstance().create(new componentDefinition_1.ComponentDefinition("SideBarWidget", "SideBarWidget"));
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
            var newTabWidget = componentFactory_1.ComponentFactory.getInstance().create(new componentDefinition_1.ComponentDefinition("TabWidget", "TabWidget_" + name));
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
         * @param {*} select
         * @memberof MainNavigationWidget
         */
        MainNavigationWidget.prototype.addView = function (parent, component, viewType, select) {
            var tabWidget = this._sideBarMap[parent];
            if (!this.componentAlreadyOpen(tabWidget, component.displayName, viewType)) {
                var activeComponentLink = property_1.Property.create({});
                activeComponentLink.value = component;
                var widget = this.getWidgetForViewType(viewType);
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
        MainNavigationWidget.prototype.getWidgetForViewType = function (viewType) {
            if (viewType == viewTypeProvider_1.ViewType.Analysis) {
                return componentFactory_1.ComponentFactory.getInstance().create(new componentDefinition_1.ComponentDefinition("TraceViewWidget", "TraceViewWidget"));
            }
            else if (viewType == viewTypeProvider_1.ViewType.Configuration) {
                return componentFactory_1.ComponentFactory.getInstance().create(new componentDefinition_1.ComponentDefinition("TraceConfigurationViewWidget", "TraceConfigurationViewWidget"));
            }
            else if (viewType == viewTypeProvider_1.ViewType.Common) {
                return componentFactory_1.ComponentFactory.getInstance().create(new componentDefinition_1.ComponentDefinition("ComponentViewWidget", "ComponentViewWidget"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbk5hdmlnYXRpb25XaWRnZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvbWFpbk5hdmlnYXRpb25XaWRnZXQvbWFpbk5hdmlnYXRpb25XaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQWNBO1FBQW1DLHdDQUFnQjtRQUFuRDtZQUFBLHFFQXFNQztZQWxNVyxpQkFBVyxHQUFtQyxFQUFFLENBQUM7O1FBa003RCxDQUFDO1FBaE1HOzs7OztXQUtHO1FBQ0gseUNBQVUsR0FBVixVQUFXLGlCQUF5QjtZQUNoQyxpQkFBTSxVQUFVLFlBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUN4QyxDQUFDO1FBRUQsa0RBQW1CLEdBQW5CO1lBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3ZDLENBQUM7UUFFRDs7OztXQUlHO1FBQ0gsc0NBQU8sR0FBUDtZQUNJLGtCQUFrQjtZQUNsQixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN6QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDbEMsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0MsSUFBRyxVQUFVLElBQUksU0FBUyxFQUFDO29CQUN2QixVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7aUJBQ3hCO2FBQ0o7WUFFRCxJQUFHLElBQUksQ0FBQyxhQUFhLElBQUksU0FBUyxFQUFDO2dCQUMvQixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ2hDO1lBQ0QsaUJBQU0sT0FBTyxXQUFFLENBQUM7UUFDcEIsQ0FBQztRQUVEOzs7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SjtpQkFDSSxJQUFHLFFBQVEsSUFBSSwyQkFBUSxDQUFDLE1BQU0sRUFBQztnQkFDaEMsT0FBTyxtQ0FBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSx5Q0FBbUIsQ0FBQyxxQkFBcUIsRUFBRSxxQkFBcUIsQ0FBQyxDQUFZLENBQUM7YUFDbEk7WUFDRCxPQUFPLFNBQVMsQ0FBQztRQUNyQixDQUFDO1FBRUQ7Ozs7Ozs7OztXQVNHO1FBQ0ssbURBQW9CLEdBQTVCLFVBQTZCLFNBQVMsRUFBRSxhQUFxQixFQUFFLFFBQWtCO1lBQzdFLElBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUM3QyxJQUFJLG9CQUFvQixHQUFHLEtBQUssQ0FBQztZQUNqQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRztnQkFDWixJQUFJLEtBQUssR0FBRyxxQ0FBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxhQUFhLEdBQUcsR0FBRyxHQUFHLFFBQVEsQ0FBQyxDQUFDO2dCQUNsRyxJQUFHLEdBQUcsQ0FBQyxPQUFPLElBQUksS0FBSyxFQUFDO29CQUNwQixvQkFBb0IsR0FBRyxJQUFJLENBQUM7aUJBQy9CO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDSCxPQUFPLG9CQUFvQixDQUFDO1FBQ2hDLENBQUM7UUFDTCwyQkFBQztJQUFELENBQUMsQUFyTUQsQ0FBbUMsbUNBQWdCLEdBcU1sRDtJQUNPLG9EQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExheW91dFdpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL2xheW91dFdpZGdldEJhc2VcIjtcclxuaW1wb3J0IHsgSU1haW5OYXZpZ2F0aW9uV2lkZ2V0IH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9tYWluTmF2aWdhdGlvbldpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgKiBhcyBXaWRnZXRzIGZyb20gXCIuLi8uLi93aWRnZXRzL3dpZGdldHNcIjtcclxuaW1wb3J0IHsgSVdpZGdldCB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy93aWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVRhYldpZGdldCB9IGZyb20gXCIuLi90YWJXaWRnZXQvaW50ZXJmYWNlcy90YWJXaWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVGFiV2lkZ2V0V2lkZ2V0UG9zaXRvbnMgfSBmcm9tIFwiLi4vdGFiV2lkZ2V0L2ludGVyZmFjZXMvdGFiV2lkZ2V0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElTaWRlQmFyV2lkZ2V0IH0gZnJvbSBcIi4uL3NpZGVCYXJXaWRnZXQvaW50ZXJmYWNlcy9zaWRlQmFyV2lkZ2V0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFZpZXdUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi92aWV3VHlwZVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IFByb3BlcnR5IH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9wcm9wZXJ0eVwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFVuaXF1ZUlkR2VuZXJhdG9yIH0gZnJvbSBcIi4uL2NvbW1vbi91bmlxdWVJZEdlbmVyYXRvclwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRGYWN0b3J5IH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRGYWN0b3J5L2NvbXBvbmVudEZhY3RvcnlcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50RGVmaW5pdGlvbiB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50RmFjdG9yeS9jb21wb25lbnREZWZpbml0aW9uXCI7XHJcblxyXG5jbGFzcyBNYWluTmF2aWdhdGlvbldpZGdldCBleHRlbmRzIExheW91dFdpZGdldEJhc2UgaW1wbGVtZW50cyBJTWFpbk5hdmlnYXRpb25XaWRnZXR7XHJcbiAgICBzaWRlQmFyV2lkZ2V0ISA6IElTaWRlQmFyV2lkZ2V0O1xyXG5cclxuICAgIHByaXZhdGUgX3NpZGVCYXJNYXA6IHsgW2lkOiBzdHJpbmddIDogSVRhYldpZGdldDsgfSA9IHt9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6ZSBNYWluTmF2aWdhdGlvbldpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYXlvdXRDb250YWluZXJJZFxyXG4gICAgICogQG1lbWJlcm9mIE1haW5OYXZpZ2F0aW9uV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQ6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRpYWxpemVDb21wb25lbnQoKXtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5kaXNhYmxlUGVyc2lzdGluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzcG9zZSB0aGUgTWFpbk5hdmlnYXRpb25XaWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFpbk5hdmlnYXRpb25XaWRnZXRcclxuICAgICAqL1xyXG4gICAgZGlzcG9zZSgpe1xyXG4gICAgICAgIC8vIERpc3Bvc2Ugd2lkZ2V0c1xyXG4gICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXModGhpcy5fc2lkZUJhck1hcCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBzaWRlQmFyT2JqID0gdGhpcy5fc2lkZUJhck1hcFtrZXlzW2ldXTtcclxuICAgICAgICAgICAgaWYoc2lkZUJhck9iaiAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgc2lkZUJhck9iai5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5zaWRlQmFyV2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2lkZUJhcldpZGdldC5kaXNwb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgU2lkZUJhciB0byBnaXZlbiBDb250YWluZXJcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFpbk5hdmlnYXRpb25XaWRnZXRcclxuICAgICAqL1xyXG4gICAgY3JlYXRlTGF5b3V0KCkge1xyXG4gICAgICAgIHRoaXMuc2lkZUJhcldpZGdldCA9IENvbXBvbmVudEZhY3RvcnkuZ2V0SW5zdGFuY2UoKS5jcmVhdGUobmV3IENvbXBvbmVudERlZmluaXRpb24oXCJTaWRlQmFyV2lkZ2V0XCIsIFwiU2lkZUJhcldpZGdldFwiKSkgYXMgV2lkZ2V0cy5JU2lkZUJhcldpZGdldDtcclxuICAgICAgICB0aGlzLnNpZGVCYXJXaWRnZXQuaW5pdGlhbGl6ZSh0aGlzLnBhcmVudENvbnRlbnRJZCk7ICAgIFxyXG4gICAgfSAgICBcclxuXHJcbiAgICAvKipcclxuICAgICAqUmVzaXplXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFpbk5hdmlnYXRpb25XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcmVzaXplKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKXtcclxuICAgICAgICB0aGlzLl9hY3R1YWxXaWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuX2FjdHVhbEhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICBpZih0aGlzLnNpZGVCYXJXaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5zaWRlQmFyV2lkZ2V0IS5yZXNpemUod2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpTZWxlY3QgVGFiIGluIFRhYndpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXJlbnRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0YWJuYW1lXHJcbiAgICAgKiBAcGFyYW0ge1ZpZXdUeXBlfSB2aWV3VHlwZVxyXG4gICAgICogQG1lbWJlcm9mIE1haW5OYXZpZ2F0aW9uV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHNlbGVjdFRhYihwYXJlbnQ6IHN0cmluZywgdGFibmFtZTogc3RyaW5nLCB2aWV3VHlwZTogVmlld1R5cGUpe1xyXG4gICAgICAgIGxldCB0YWJJZCA9IHRhYm5hbWUgKyBcIl9cIiArIHZpZXdUeXBlLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgdGFiSWQgPSBVbmlxdWVJZEdlbmVyYXRvci5nZXRJbnN0YW5jZSgpLmdldFVuaXF1ZUlkRnJvbVN0cmluZyh0YWJJZCk7XHJcbiAgICAgICAgdGFiSWQgPSB0YWJJZC5yZXBsYWNlKC9bJlxcL1xcXFwjLCsoKSR+JS4nXCI6Kj88Pnt9XS9nLCdfJyk7XHJcblxyXG4gICAgICAgIHRoaXMuX3NpZGVCYXJNYXBbcGFyZW50XS5zZWxlY3RUYWIodGFiSWQpO1xyXG4gICAgICAgIHRoaXMuc2lkZUJhcldpZGdldC5zd2l0Y2hUYWIoXCJ0YWJfXCIrcGFyZW50LCBwYXJlbnQrIFwiX1wiICsgVmlld1R5cGUuU2lkZUJhclRhYik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgV2lkZ2V0IHRvIFNpZGVCYXJUYWJzIFRhYldpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SVdpZGdldH0gd2lkZ2V0XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGFiTmFtZVxyXG4gICAgICogQHBhcmFtIHtWaWV3VHlwZX0gdmlld1R5cGVcclxuICAgICAqIEBwYXJhbSB7Kn0gZGF0YVxyXG4gICAgICogQG1lbWJlcm9mIE1haW5OYXZpZ2F0aW9uV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGFkZFdpZGdldCh3aWRnZXQ6IElXaWRnZXQsIHRhYk5hbWU6IHN0cmluZywgdmlld1R5cGU6IFZpZXdUeXBlLCBkYXRhIDogYW55KXtcclxuICAgICAgICB0aGlzLl9zaWRlQmFyTWFwW2RhdGFbXCJwYXJlbnRcIl1dLmFkZFdpZGdldCh3aWRnZXQsdGFiTmFtZSx2aWV3VHlwZSxkYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBUYWIgdG8gU2lkZUJhclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWNvblBhdGhcclxuICAgICAqIEByZXR1cm5zIHtJVGFiV2lkZ2V0fVxyXG4gICAgICogQG1lbWJlcm9mIE1haW5OYXZpZ2F0aW9uV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGFkZFNpZGVCYXJUYWIobmFtZTogc3RyaW5nLCBpY29uUGF0aDogc3RyaW5nKSA6IElUYWJXaWRnZXR7XHJcbiAgICAgICAgbGV0IG5ld1RhYldpZGdldCA9IENvbXBvbmVudEZhY3RvcnkuZ2V0SW5zdGFuY2UoKS5jcmVhdGUobmV3IENvbXBvbmVudERlZmluaXRpb24oXCJUYWJXaWRnZXRcIiwgXCJUYWJXaWRnZXRfXCIgKyBuYW1lKSkgYXMgSVRhYldpZGdldDtcclxuICAgICAgICB0aGlzLnNpZGVCYXJXaWRnZXQuYWRkV2lkZ2V0KG5ld1RhYldpZGdldCwgbmFtZSwgVmlld1R5cGUuU2lkZUJhclRhYiwgaWNvblBhdGgpO1xyXG5cclxuICAgICAgICB0aGlzLl9zaWRlQmFyTWFwW25hbWVdID0gbmV3VGFiV2lkZ2V0O1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3VGFiV2lkZ2V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIFVzZXJXaWRnZXQgdG8gU2lkZUJhclRhYnMgVGFiV2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtXaWRnZXRzLklMb2dpbldpZGdldH0gbG9naW5XaWRnZXRcclxuICAgICAqIEBwYXJhbSB7Kn0gZGF0YVxyXG4gICAgICogQG1lbWJlcm9mIE1haW5OYXZpZ2F0aW9uV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGFkZFVzZXJXaWRnZXQobG9naW5XaWRnZXQ6IFdpZGdldHMuSUxvZ2luV2lkZ2V0LCBkYXRhIDogYW55KXtcclxuICAgICAgICB0aGlzLl9zaWRlQmFyTWFwW2RhdGFbXCJwYXJlbnRcIl1dLmFkZFdpZGdldChsb2dpbldpZGdldCwgZGF0YVtcInBhcmVudFwiXSArIFwiX0xvZ2luVmlld1wiLCBWaWV3VHlwZS5Vc2VyLCB7d2lkZ2V0UG9zaXRpb246IFRhYldpZGdldFdpZGdldFBvc2l0b25zLnJpZ2h0fSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgVmlld0luc3RhbmNlIG9mIHNwZWNpZmljIHR5cGVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGFyZW50XHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50fSBjb21wb25lbnRcclxuICAgICAqIEBwYXJhbSB7Vmlld1R5cGV9IHZpZXdUeXBlXHJcbiAgICAgKiBAcGFyYW0geyp9IHNlbGVjdFxyXG4gICAgICogQG1lbWJlcm9mIE1haW5OYXZpZ2F0aW9uV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGFkZFZpZXcocGFyZW50OiBzdHJpbmcgLGNvbXBvbmVudDogTWFwcENvY2twaXRDb21wb25lbnQsIHZpZXdUeXBlOiBWaWV3VHlwZSwgc2VsZWN0KXtcclxuICAgICAgICBsZXQgdGFiV2lkZ2V0ID0gdGhpcy5fc2lkZUJhck1hcFtwYXJlbnRdO1xyXG4gICAgXHJcbiAgICAgICAgaWYoIXRoaXMuY29tcG9uZW50QWxyZWFkeU9wZW4odGFiV2lkZ2V0LCBjb21wb25lbnQuZGlzcGxheU5hbWUsIHZpZXdUeXBlKSl7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBhY3RpdmVDb21wb25lbnRMaW5rOiBQcm9wZXJ0eTxNYXBwQ29ja3BpdENvbXBvbmVudD4gPSBQcm9wZXJ0eS5jcmVhdGU8TWFwcENvY2twaXRDb21wb25lbnQ+KDxhbnk+e30pO1xyXG4gICAgICAgICAgICBhY3RpdmVDb21wb25lbnRMaW5rLnZhbHVlID0gY29tcG9uZW50O1xyXG5cclxuICAgICAgICAgICAgbGV0IHdpZGdldCA9IHRoaXMuZ2V0V2lkZ2V0Rm9yVmlld1R5cGUodmlld1R5cGUpO1xyXG4gICAgICAgICAgICBpZih3aWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGFiV2lkZ2V0LmFkZFdpZGdldCh3aWRnZXQsIGNvbXBvbmVudC5kaXNwbGF5TmFtZSwgdmlld1R5cGUsIHt3aWRnZXRQb3NpdGlvbjogVGFiV2lkZ2V0V2lkZ2V0UG9zaXRvbnMuZmxleH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gYWN0aXZlQ29tcG9uZW50IG11c3QgYmUgc2V0IGFmdGVyIGFkZFdpZGdldCg9PiBhZGQgd2lkZ2V0IGluaXRpYWxpemVzIHRoZSB3aWRnZXQgZGF0YSBmdWxseSwgd2hpY2ggd2lsbCBiZSBuZWVkZWQpXHJcbiAgICAgICAgICAgICAgICAoPGFueT53aWRnZXQpLmFjdGl2ZUNvbXBvbmVudCA9IGFjdGl2ZUNvbXBvbmVudExpbms7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHNlbGVjdCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VGFiKHBhcmVudCwgY29tcG9uZW50LmRpc3BsYXlOYW1lLCB2aWV3VHlwZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbmQgcmV0dXJucyBhIHdpZGdldCBmb3IgdGhlIGdpdmVuIHZpZXdUeXBlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Vmlld1R5cGV9IHZpZXdUeXBlXHJcbiAgICAgKiBAcmV0dXJucyB7KElXaWRnZXR8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBNYWluTmF2aWdhdGlvbldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFdpZGdldEZvclZpZXdUeXBlKHZpZXdUeXBlOiBWaWV3VHlwZSk6IElXaWRnZXR8dW5kZWZpbmVke1xyXG4gICAgICAgIGlmKHZpZXdUeXBlID09IFZpZXdUeXBlLkFuYWx5c2lzKXtcclxuICAgICAgICAgICAgIHJldHVybiBDb21wb25lbnRGYWN0b3J5LmdldEluc3RhbmNlKCkuY3JlYXRlKG5ldyBDb21wb25lbnREZWZpbml0aW9uKFwiVHJhY2VWaWV3V2lkZ2V0XCIsIFwiVHJhY2VWaWV3V2lkZ2V0XCIpKSBhcyBJV2lkZ2V0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHZpZXdUeXBlID09IFZpZXdUeXBlLkNvbmZpZ3VyYXRpb24pe1xyXG4gICAgICAgICAgICByZXR1cm4gQ29tcG9uZW50RmFjdG9yeS5nZXRJbnN0YW5jZSgpLmNyZWF0ZShuZXcgQ29tcG9uZW50RGVmaW5pdGlvbihcIlRyYWNlQ29uZmlndXJhdGlvblZpZXdXaWRnZXRcIiwgXCJUcmFjZUNvbmZpZ3VyYXRpb25WaWV3V2lkZ2V0XCIpKSBhcyBJV2lkZ2V0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHZpZXdUeXBlID09IFZpZXdUeXBlLkNvbW1vbil7XHJcbiAgICAgICAgICAgIHJldHVybiBDb21wb25lbnRGYWN0b3J5LmdldEluc3RhbmNlKCkuY3JlYXRlKG5ldyBDb21wb25lbnREZWZpbml0aW9uKFwiQ29tcG9uZW50Vmlld1dpZGdldFwiLCBcIkNvbXBvbmVudFZpZXdXaWRnZXRcIikpIGFzIElXaWRnZXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUZXN0IGlmIHZpZXcgb2YgY29tcG9uZW50IGlzdCBhbHJlYWR5IG9wZW5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSB0YWJXaWRnZXRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb21wb25lbnROYW1lXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmlld1R5cGVcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIE1haW5OYXZpZ2F0aW9uV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29tcG9uZW50QWxyZWFkeU9wZW4odGFiV2lkZ2V0LCBjb21wb25lbnROYW1lOiBzdHJpbmcsIHZpZXdUeXBlOiBWaWV3VHlwZSk6IGJvb2xlYW57XHJcbiAgICAgICAgbGV0IHRhYnMgPSB0YWJXaWRnZXQuZGF0YU1vZGVsLmRhdGEuZmxleFRhYnM7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudEFscmVhZHlPcGVuID0gZmFsc2U7XHJcbiAgICAgICAgdGFicy5mb3JFYWNoKHRhYiA9PiB7XHJcbiAgICAgICAgICAgIGxldCB0YWJJZCA9IFVuaXF1ZUlkR2VuZXJhdG9yLmdldEluc3RhbmNlKCkuZ2V0VW5pcXVlSWRGcm9tU3RyaW5nKGNvbXBvbmVudE5hbWUgKyBcIl9cIiArIHZpZXdUeXBlKTtcclxuICAgICAgICAgICAgaWYodGFiLnRhYk5hbWUgPT0gdGFiSWQpe1xyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50QWxyZWFkeU9wZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudEFscmVhZHlPcGVuO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCB7TWFpbk5hdmlnYXRpb25XaWRnZXR9Il19