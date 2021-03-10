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
define(["require", "exports", "../common/layoutWidgetBase", "../../widgets/widgets", "../tabWidget/interfaces/tabWidgetInterface", "../common/viewTypeProvider", "../../framework/property", "../common/uniqueIdGenerator"], function (require, exports, layoutWidgetBase_1, Widgets, tabWidgetInterface_1, viewTypeProvider_1, property_1, uniqueIdGenerator_1) {
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
        /**
         * Dispose the MainNavigationWidget
         *
         * @memberof MainNavigationWidget
         */
        MainNavigationWidget.prototype.dispose = function () {
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
            this.sideBarWidget = Widgets.SideBarWidget.create();
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
            var newTabWidget = Widgets.TabWidget.create();
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
                return Widgets.TraceViewWidget.create();
            }
            else if (viewType == viewTypeProvider_1.ViewType.Configuration) {
                return Widgets.TraceConfigurationViewWidget.create();
            }
            else if (viewType == viewTypeProvider_1.ViewType.Common) {
                return Widgets.ComponentViewWidget.create();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbk5hdmlnYXRpb25XaWRnZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvbWFpbk5hdmlnYXRpb25XaWRnZXQvbWFpbk5hdmlnYXRpb25XaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVlBO1FBQW1DLHdDQUFnQjtRQUFuRDtZQUFBLHFFQXVMQztZQXBMVyxpQkFBVyxHQUFtQyxFQUFFLENBQUM7O1FBb0w3RCxDQUFDO1FBbExHOzs7OztXQUtHO1FBQ0gseUNBQVUsR0FBVixVQUFXLGlCQUF5QjtZQUNoQyxpQkFBTSxVQUFVLFlBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUN4QyxDQUFDO1FBRUQ7Ozs7V0FJRztRQUNILHNDQUFPLEdBQVA7WUFDSSxJQUFHLElBQUksQ0FBQyxhQUFhLElBQUksU0FBUyxFQUFDO2dCQUMvQixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ2hDO1lBQ0QsaUJBQU0sT0FBTyxXQUFFLENBQUM7UUFDcEIsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSCwyQ0FBWSxHQUFaO1lBQ0ksSUFBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBNEIsQ0FBQztZQUM5RSxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDeEQsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNILHFDQUFNLEdBQU4sVUFBTyxLQUFhLEVBQUUsTUFBYztZQUNoQyxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztZQUMxQixJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQztZQUM1QixJQUFHLElBQUksQ0FBQyxhQUFhLElBQUksU0FBUyxFQUFDO2dCQUMvQixJQUFJLENBQUMsYUFBYyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENB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QUFnQixHQXVMbEQ7SUFDTyxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMYXlvdXRXaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi9sYXlvdXRXaWRnZXRCYXNlXCI7XHJcbmltcG9ydCB7IElNYWluTmF2aWdhdGlvbldpZGdldCB9IGZyb20gXCIuL2ludGVyZmFjZXMvbWFpbk5hdmlnYXRpb25XaWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0ICogYXMgV2lkZ2V0cyBmcm9tIFwiLi4vLi4vd2lkZ2V0cy93aWRnZXRzXCI7XHJcbmltcG9ydCB7IElXaWRnZXQgfSBmcm9tIFwiLi4vY29tbW9uL2ludGVyZmFjZXMvd2lkZ2V0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElUYWJXaWRnZXQgfSBmcm9tIFwiLi4vdGFiV2lkZ2V0L2ludGVyZmFjZXMvdGFiV2lkZ2V0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFRhYldpZGdldFdpZGdldFBvc2l0b25zIH0gZnJvbSBcIi4uL3RhYldpZGdldC9pbnRlcmZhY2VzL3RhYldpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJU2lkZUJhcldpZGdldCB9IGZyb20gXCIuLi9zaWRlQmFyV2lkZ2V0L2ludGVyZmFjZXMvc2lkZUJhcldpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBWaWV3VHlwZSB9IGZyb20gXCIuLi9jb21tb24vdmlld1R5cGVQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBQcm9wZXJ0eSB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvcHJvcGVydHlcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBVbmlxdWVJZEdlbmVyYXRvciB9IGZyb20gXCIuLi9jb21tb24vdW5pcXVlSWRHZW5lcmF0b3JcIjtcclxuXHJcbmNsYXNzIE1haW5OYXZpZ2F0aW9uV2lkZ2V0IGV4dGVuZHMgTGF5b3V0V2lkZ2V0QmFzZSBpbXBsZW1lbnRzIElNYWluTmF2aWdhdGlvbldpZGdldHtcclxuICAgIHNpZGVCYXJXaWRnZXQhIDogSVNpZGVCYXJXaWRnZXQ7XHJcblxyXG4gICAgcHJpdmF0ZSBfc2lkZUJhck1hcDogeyBbaWQ6IHN0cmluZ10gOiBJVGFiV2lkZ2V0OyB9ID0ge307XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXplIE1haW5OYXZpZ2F0aW9uV2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxheW91dENvbnRhaW5lcklkXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFpbk5hdmlnYXRpb25XaWRnZXRcclxuICAgICAqL1xyXG4gICAgaW5pdGlhbGl6ZShsYXlvdXRDb250YWluZXJJZDogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZShsYXlvdXRDb250YWluZXJJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNwb3NlIHRoZSBNYWluTmF2aWdhdGlvbldpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYWluTmF2aWdhdGlvbldpZGdldFxyXG4gICAgICovXHJcbiAgICBkaXNwb3NlKCl7XHJcbiAgICAgICAgaWYodGhpcy5zaWRlQmFyV2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2lkZUJhcldpZGdldC5kaXNwb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgU2lkZUJhciB0byBnaXZlbiBDb250YWluZXJcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFpbk5hdmlnYXRpb25XaWRnZXRcclxuICAgICAqL1xyXG4gICAgY3JlYXRlTGF5b3V0KCkge1xyXG4gICAgICAgIHRoaXMuc2lkZUJhcldpZGdldCA9IFdpZGdldHMuU2lkZUJhcldpZGdldC5jcmVhdGUoKSBhcyBXaWRnZXRzLklTaWRlQmFyV2lkZ2V0O1xyXG4gICAgICAgIHRoaXMuc2lkZUJhcldpZGdldC5pbml0aWFsaXplKHRoaXMucGFyZW50Q29udGVudElkKTsgICAgXHJcbiAgICB9ICAgIFxyXG5cclxuICAgIC8qKlxyXG4gICAgICpSZXNpemVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gd2lkdGhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcclxuICAgICAqIEBtZW1iZXJvZiBNYWluTmF2aWdhdGlvbldpZGdldFxyXG4gICAgICovXHJcbiAgICByZXNpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuX2FjdHVhbFdpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5fYWN0dWFsSGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIGlmKHRoaXMuc2lkZUJhcldpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLnNpZGVCYXJXaWRnZXQhLnJlc2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlNlbGVjdCBUYWIgaW4gVGFid2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhcmVudFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRhYm5hbWVcclxuICAgICAqIEBwYXJhbSB7Vmlld1R5cGV9IHZpZXdUeXBlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFpbk5hdmlnYXRpb25XaWRnZXRcclxuICAgICAqL1xyXG4gICAgc2VsZWN0VGFiKHBhcmVudDogc3RyaW5nLCB0YWJuYW1lOiBzdHJpbmcsIHZpZXdUeXBlOiBWaWV3VHlwZSl7XHJcbiAgICAgICAgbGV0IHRhYklkID0gdGFibmFtZSArIFwiX1wiICsgdmlld1R5cGUudG9TdHJpbmcoKTtcclxuICAgICAgICB0YWJJZCA9IFVuaXF1ZUlkR2VuZXJhdG9yLmdldEluc3RhbmNlKCkuZ2V0VW5pcXVlSWRGcm9tU3RyaW5nKHRhYklkKTtcclxuICAgICAgICB0YWJJZCA9IHRhYklkLnJlcGxhY2UoL1smXFwvXFxcXCMsKygpJH4lLidcIjoqPzw+e31dL2csJ18nKTtcclxuXHJcbiAgICAgICAgdGhpcy5fc2lkZUJhck1hcFtwYXJlbnRdLnNlbGVjdFRhYih0YWJJZCk7XHJcbiAgICAgICAgdGhpcy5zaWRlQmFyV2lkZ2V0LnN3aXRjaFRhYihcInRhYl9cIitwYXJlbnQsIHBhcmVudCsgXCJfXCIgKyBWaWV3VHlwZS5TaWRlQmFyVGFiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBXaWRnZXQgdG8gU2lkZUJhclRhYnMgVGFiV2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJV2lkZ2V0fSB3aWRnZXRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0YWJOYW1lXHJcbiAgICAgKiBAcGFyYW0ge1ZpZXdUeXBlfSB2aWV3VHlwZVxyXG4gICAgICogQHBhcmFtIHsqfSBkYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFpbk5hdmlnYXRpb25XaWRnZXRcclxuICAgICAqL1xyXG4gICAgYWRkV2lkZ2V0KHdpZGdldDogSVdpZGdldCwgdGFiTmFtZTogc3RyaW5nLCB2aWV3VHlwZTogVmlld1R5cGUsIGRhdGEgOiBhbnkpe1xyXG4gICAgICAgIHRoaXMuX3NpZGVCYXJNYXBbZGF0YVtcInBhcmVudFwiXV0uYWRkV2lkZ2V0KHdpZGdldCx0YWJOYW1lLHZpZXdUeXBlLGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIFRhYiB0byBTaWRlQmFyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpY29uUGF0aFxyXG4gICAgICogQHJldHVybnMge0lUYWJXaWRnZXR9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFpbk5hdmlnYXRpb25XaWRnZXRcclxuICAgICAqL1xyXG4gICAgYWRkU2lkZUJhclRhYihuYW1lOiBzdHJpbmcsIGljb25QYXRoOiBzdHJpbmcpIDogSVRhYldpZGdldHtcclxuICAgICAgICBsZXQgbmV3VGFiV2lkZ2V0ID0gV2lkZ2V0cy5UYWJXaWRnZXQuY3JlYXRlKCk7XHJcbiAgICAgICAgdGhpcy5zaWRlQmFyV2lkZ2V0LmFkZFdpZGdldChuZXdUYWJXaWRnZXQsIG5hbWUsIFZpZXdUeXBlLlNpZGVCYXJUYWIsIGljb25QYXRoKTtcclxuXHJcbiAgICAgICAgdGhpcy5fc2lkZUJhck1hcFtuYW1lXSA9IG5ld1RhYldpZGdldDtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ld1RhYldpZGdldDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBVc2VyV2lkZ2V0IHRvIFNpZGVCYXJUYWJzIFRhYldpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7V2lkZ2V0cy5JTG9naW5XaWRnZXR9IGxvZ2luV2lkZ2V0XHJcbiAgICAgKiBAcGFyYW0geyp9IGRhdGFcclxuICAgICAqIEBtZW1iZXJvZiBNYWluTmF2aWdhdGlvbldpZGdldFxyXG4gICAgICovXHJcbiAgICBhZGRVc2VyV2lkZ2V0KGxvZ2luV2lkZ2V0OiBXaWRnZXRzLklMb2dpbldpZGdldCwgZGF0YSA6IGFueSl7XHJcbiAgICAgICAgdGhpcy5fc2lkZUJhck1hcFtkYXRhW1wicGFyZW50XCJdXS5hZGRXaWRnZXQobG9naW5XaWRnZXQsIGRhdGFbXCJwYXJlbnRcIl0gKyBcIl9Mb2dpblZpZXdcIiwgVmlld1R5cGUuVXNlciwge3dpZGdldFBvc2l0aW9uOiBUYWJXaWRnZXRXaWRnZXRQb3NpdG9ucy5yaWdodH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIFZpZXdJbnN0YW5jZSBvZiBzcGVjaWZpYyB0eXBlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhcmVudFxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudH0gY29tcG9uZW50XHJcbiAgICAgKiBAcGFyYW0ge1ZpZXdUeXBlfSB2aWV3VHlwZVxyXG4gICAgICogQHBhcmFtIHsqfSBzZWxlY3RcclxuICAgICAqIEBtZW1iZXJvZiBNYWluTmF2aWdhdGlvbldpZGdldFxyXG4gICAgICovXHJcbiAgICBhZGRWaWV3KHBhcmVudDogc3RyaW5nICxjb21wb25lbnQ6IE1hcHBDb2NrcGl0Q29tcG9uZW50LCB2aWV3VHlwZTogVmlld1R5cGUsIHNlbGVjdCl7XHJcbiAgICAgICAgbGV0IHRhYldpZGdldCA9IHRoaXMuX3NpZGVCYXJNYXBbcGFyZW50XTtcclxuICAgIFxyXG4gICAgICAgIGlmKCF0aGlzLmNvbXBvbmVudEFscmVhZHlPcGVuKHRhYldpZGdldCwgY29tcG9uZW50LmRpc3BsYXlOYW1lLCB2aWV3VHlwZSkpe1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgYWN0aXZlQ29tcG9uZW50TGluazogUHJvcGVydHk8TWFwcENvY2twaXRDb21wb25lbnQ+ID0gUHJvcGVydHkuY3JlYXRlPE1hcHBDb2NrcGl0Q29tcG9uZW50Pig8YW55Pnt9KTtcclxuICAgICAgICAgICAgYWN0aXZlQ29tcG9uZW50TGluay52YWx1ZSA9IGNvbXBvbmVudDtcclxuXHJcbiAgICAgICAgICAgIGxldCB3aWRnZXQgPSB0aGlzLmdldFdpZGdldEZvclZpZXdUeXBlKHZpZXdUeXBlKTtcclxuICAgICAgICAgICAgaWYod2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRhYldpZGdldC5hZGRXaWRnZXQod2lkZ2V0LCBjb21wb25lbnQuZGlzcGxheU5hbWUsIHZpZXdUeXBlLCB7d2lkZ2V0UG9zaXRpb246IFRhYldpZGdldFdpZGdldFBvc2l0b25zLmZsZXh9KTtcclxuICAgICAgICAgICAgICAgIC8vIGFjdGl2ZUNvbXBvbmVudCBtdXN0IGJlIHNldCBhZnRlciBhZGRXaWRnZXQoPT4gYWRkIHdpZGdldCBpbml0aWFsaXplcyB0aGUgd2lkZ2V0IGRhdGEgZnVsbHksIHdoaWNoIHdpbGwgYmUgbmVlZGVkKVxyXG4gICAgICAgICAgICAgICAgKDxhbnk+d2lkZ2V0KS5hY3RpdmVDb21wb25lbnQgPSBhY3RpdmVDb21wb25lbnRMaW5rO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHNlbGVjdCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VGFiKHBhcmVudCwgY29tcG9uZW50LmRpc3BsYXlOYW1lLCB2aWV3VHlwZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbmQgcmV0dXJucyBhIHdpZGdldCBmb3IgdGhlIGdpdmVuIHZpZXdUeXBlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Vmlld1R5cGV9IHZpZXdUeXBlXHJcbiAgICAgKiBAcmV0dXJucyB7KElXaWRnZXR8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBNYWluTmF2aWdhdGlvbldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFdpZGdldEZvclZpZXdUeXBlKHZpZXdUeXBlOiBWaWV3VHlwZSk6IElXaWRnZXR8dW5kZWZpbmVke1xyXG4gICAgICAgIGlmKHZpZXdUeXBlID09IFZpZXdUeXBlLkFuYWx5c2lzKXtcclxuICAgICAgICAgICAgcmV0dXJuIFdpZGdldHMuVHJhY2VWaWV3V2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHZpZXdUeXBlID09IFZpZXdUeXBlLkNvbmZpZ3VyYXRpb24pe1xyXG4gICAgICAgICAgICByZXR1cm4gV2lkZ2V0cy5UcmFjZUNvbmZpZ3VyYXRpb25WaWV3V2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHZpZXdUeXBlID09IFZpZXdUeXBlLkNvbW1vbil7XHJcbiAgICAgICAgICAgIHJldHVybiBXaWRnZXRzLkNvbXBvbmVudFZpZXdXaWRnZXQuY3JlYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUZXN0IGlmIHZpZXcgb2YgY29tcG9uZW50IGlzdCBhbHJlYWR5IG9wZW5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSB0YWJXaWRnZXRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb21wb25lbnROYW1lXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmlld1R5cGVcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIE1haW5OYXZpZ2F0aW9uV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29tcG9uZW50QWxyZWFkeU9wZW4odGFiV2lkZ2V0LCBjb21wb25lbnROYW1lOiBzdHJpbmcsIHZpZXdUeXBlOiBWaWV3VHlwZSk6IGJvb2xlYW57XHJcbiAgICAgICAgbGV0IHRhYnMgPSB0YWJXaWRnZXQuZGF0YU1vZGVsLmRhdGEuZmxleFRhYnM7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudEFscmVhZHlPcGVuID0gZmFsc2U7XHJcbiAgICAgICAgdGFicy5mb3JFYWNoKHRhYiA9PiB7XHJcbiAgICAgICAgICAgIGxldCB0YWJJZCA9IFVuaXF1ZUlkR2VuZXJhdG9yLmdldEluc3RhbmNlKCkuZ2V0VW5pcXVlSWRGcm9tU3RyaW5nKGNvbXBvbmVudE5hbWUgKyBcIl9cIiArIHZpZXdUeXBlKTtcclxuICAgICAgICAgICAgaWYodGFiLnRhYk5hbWUgPT0gdGFiSWQpe1xyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50QWxyZWFkeU9wZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudEFscmVhZHlPcGVuO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCB7TWFpbk5hdmlnYXRpb25XaWRnZXR9Il19