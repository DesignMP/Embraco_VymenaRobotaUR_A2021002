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
define(["require", "exports", "../common/layoutWidgetBase", "./view/tabWidgetFlexTab", "../../models/topBarDataModel/tabWidgetDataModel", "./interfaces/tabWidgetInterface", "./view/tabWidgetFixedTab", "./layout/tabWidgetLayoutProvider", "./view/tabWidgetFlexDropDown", "./tabWidgetStyleProvider", "../common/viewTypeProvider", "../common/uniqueIdGenerator"], function (require, exports, layoutWidgetBase_1, tabWidgetFlexTab_1, tabWidgetDataModel_1, tabWidgetInterface_1, tabWidgetFixedTab_1, tabWidgetLayoutProvider_1, tabWidgetFlexDropDown_1, tabWidgetStyleProvider_1, viewTypeProvider_1, uniqueIdGenerator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.topBarClassName = "TopBar";
    var tabWidgetFlexTabAreaWidth = "100%";
    var tabWidgetRightTabAreaWidth = "0px";
    var TabWidget = /** @class */ (function (_super) {
        __extends(TabWidget, _super);
        function TabWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._rightTabContainerId = "tabWidgetTabContainerRight";
            _this._flexibleTabContainerId = "tabWidgetFlexibleTabContainer";
            _this._leftTabContainerId = "tabWidgetTabContainerLeft";
            _this._tabSelectedFromDropDownHandler = function (sender, eventArgs) { _this.onTabClicked(eventArgs); };
            _this._tabBarCloseTabHandler = function (sender, args) { _this.closeTab(args, false); };
            _this._tabBarCloseAllTabsHandler = function (sender, args) { _this.closeAllTabs(args); };
            _this._tabBarCloseAllTabsButActiveHandler = function (sender, args) { _this.closeAllTabsButActive(args); };
            _this._tabClickedHandler = function (sender, args) { _this.onTabClicked(args); };
            _this._tabWheelClickedHandler = function (sender, args) { _this.onTabWheelClicked(args); };
            _this._activeTabHiddenHandler = function (sender, args) { _this.onActiveTabHidden(sender, args); };
            return _this;
        }
        /**
         *
         *
         * @param {string} layoutContainerId
         * @memberof TabWidget
         */
        TabWidget.prototype.initialize = function (layoutContainerId) {
            this._actualWidth = 500;
            this._actualHeight = 500;
            this.dataModel = new tabWidgetDataModel_1.TabWidgetDataModel();
            this.dataModel.initialize();
            this._flexDropDown = new tabWidgetFlexDropDown_1.TabWidgetFlexDropDown();
            this.attachFlexDropDownEvents();
            this.setUniqueTabContainerIds(layoutContainerId);
            var dropDownStyle = tabWidgetStyleProvider_1.TabWidgetStyleProvider.getInstance().getLayoutStyleForTabBarDropDown(layoutContainerId);
            $("#" + layoutContainerId).append(dropDownStyle);
            _super.prototype.initialize.call(this, layoutContainerId);
        };
        TabWidget.prototype.dispose = function () {
            this.dataModel.dispose();
            this.detachFlexDropDownEvents();
            _super.prototype.dispose.call(this);
        };
        /**
         * Attaches the flexDropDown events
         *
         * @private
         * @memberof TabWidget
         */
        TabWidget.prototype.attachFlexDropDownEvents = function () {
            if (this._flexDropDown != undefined) {
                this._flexDropDown.eventTabSelectedFromDropdown.attach(this._tabSelectedFromDropDownHandler);
                this._flexDropDown.eventTabBarCloseTab.attach(this._tabBarCloseTabHandler);
                this._flexDropDown.eventTabBarCloseAllTabs.attach(this._tabBarCloseAllTabsHandler);
                this._flexDropDown.eventTabBarCloseAllTabsButActive.attach(this._tabBarCloseAllTabsButActiveHandler);
            }
        };
        /**
         * Detaches the flexDropDown events
         *
         * @private
         * @memberof TabWidget
         */
        TabWidget.prototype.detachFlexDropDownEvents = function () {
            if (this._flexDropDown != undefined) {
                this._flexDropDown.eventTabSelectedFromDropdown.detach(this._tabSelectedFromDropDownHandler);
                this._flexDropDown.eventTabBarCloseTab.detach(this._tabBarCloseTabHandler);
                this._flexDropDown.eventTabBarCloseAllTabs.detach(this._tabBarCloseAllTabsHandler);
                this._flexDropDown.eventTabBarCloseAllTabsButActive.detach(this._tabBarCloseAllTabsButActiveHandler);
            }
        };
        /**
         *
         *
         * @private
         * @param {string} layoutContainerId
         * @memberof TabWidget
         */
        TabWidget.prototype.setUniqueTabContainerIds = function (layoutContainerId) {
            this._rightTabContainerId = layoutContainerId + "_tabWidgetTabContainerRight";
            this._flexibleTabContainerId = layoutContainerId + "_tabWidgetFlexibleTabContainer";
            this._leftTabContainerId = layoutContainerId + "_tabWidgetTabContainerLeft";
        };
        /**
         * Creates the layout of the widget
         *
         * @memberof TabWidget
         */
        TabWidget.prototype.createLayout = function () {
            var tabLayout = tabWidgetLayoutProvider_1.TabWidgetLayoutProvider.getInstance().getTabBarLayout(this.parentContentId, this._leftTabContainerId, this._flexibleTabContainerId, this._rightTabContainerId);
            $(this.cssParentContentId).append(tabLayout);
            //$("."+mainNavigationClassName).parent().append($(`<div id="`+ this._rightTabContainerId +`" class="topBarTabContainerRight"></div>`))
            this._flexDropDown.addFlexTabDropdown(this.parentContentId, this._flexibleTabContainerId);
            this.adaptWidthOfFlexTabBar();
        };
        /**
         * Loads the styles for the tab widget
         *
         * @memberof TabWidget
         */
        TabWidget.prototype.loadStyles = function () {
            _super.prototype.addStyle.call(this, "widgets/tabWidget/style/css/tabWidgetStyle.css");
        };
        /**
         *
         *
         * @memberof TabWidget
         */
        TabWidget.prototype.activate = function () {
            if (this.dataModel.getFlexTabs().length == 0) {
                this.selectOverview();
            }
            var widget = this.dataModel.getActiveTab().widget;
            if (widget != undefined) {
                widget.activate();
            }
        };
        TabWidget.prototype.deactivate = function () {
            var tabs = this.dataModel.getAllTabs();
            for (var _i = 0, tabs_1 = tabs; _i < tabs_1.length; _i++) {
                var element = tabs_1[_i];
                if (element.widget != undefined) {
                    element.widget.deactivate();
                }
            }
        };
        /**
         *
         *
         * @param {IWidget} widget
         * @param {string} tabName
         * @param {ViewType} viewType
         * @param {*} data
         * @memberof TabWidget
         */
        TabWidget.prototype.addWidget = function (widget, tabName, viewType, data) {
            _super.prototype.addWidget.call(this, widget, tabName, viewType);
            var tabId = tabName + "_" + viewType.toString();
            tabId = uniqueIdGenerator_1.UniqueIdGenerator.getInstance().getUniqueIdFromString(tabId);
            tabId = tabId.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '_');
            var iconPath = viewTypeProvider_1.ViewTypeProvider.getInstance().getIconByViewType(viewType);
            var newTab = this.addNewTab(data.widgetPosition, iconPath, tabId, tabName);
            if (newTab) {
                newTab.addWidget(widget);
            }
        };
        /**
         *
         *
         * @private
         * @param {*} widgetPosition
         * @param {*} iconPath
         * @param {*} tabId
         * @returns
         * @memberof TabWidget
         */
        TabWidget.prototype.addNewTab = function (widgetPosition, iconPath, tabId, displayName) {
            var newTab;
            switch (widgetPosition) {
                case tabWidgetInterface_1.TabWidgetWidgetPositons.flex:
                    newTab = this.addFlexibleTab(tabId, iconPath, displayName);
                    break;
                case tabWidgetInterface_1.TabWidgetWidgetPositons.right:
                    newTab = this.addFixedTab(tabId, iconPath, this._rightTabContainerId);
                    break;
                case tabWidgetInterface_1.TabWidgetWidgetPositons.left:
                    newTab = this.addFixedTab(tabId, iconPath, this._leftTabContainerId);
                    break;
            }
            this.registerEventsForTab(newTab);
            this.dataModel.addTab(newTab);
            return newTab;
        };
        /**
         *
         *
         * @private
         * @param {ITabWidgetTab} tab
         * @memberof TabWidget
         */
        TabWidget.prototype.registerEventsForTab = function (tab) {
            if (tab != undefined) {
                tab.eventTabWidgetTabClicked.attach(this._tabClickedHandler);
                tab.eventTabWidgetTabWheelClicked.attach(this._tabWheelClickedHandler);
                tab.eventTabWidgetActiveHidden.attach(this._activeTabHiddenHandler);
            }
        };
        TabWidget.prototype.unregisterEventsForTab = function (tab) {
            if (tab != undefined) {
                tab.eventTabWidgetTabClicked.detach(this._tabClickedHandler);
                tab.eventTabWidgetTabWheelClicked.detach(this._tabWheelClickedHandler);
                tab.eventTabWidgetActiveHidden.detach(this._activeTabHiddenHandler);
            }
        };
        /**
         *
         *
         * @private
         * @param {*} tabID
         * @param {*} iconPath
         * @returns {ITabWidgetTab}
         * @memberof TabWidget
         */
        TabWidget.prototype.addFlexibleTab = function (tabID, iconPath, displayName) {
            var newTab = new tabWidgetFlexTab_1.TabWidgetFlexTab();
            newTab.appendTabLayout(this.parentContentId, this._flexibleTabContainerId + "_flexBox", tabID, displayName);
            newTab.setIcon(iconPath);
            this._flexDropDown.addItemToDropdown(displayName, newTab.tabContainerId, this.parentContentId, iconPath);
            return newTab;
        };
        /**
         *
         *
         * @private
         * @param {*} tabName
         * @param {*} iconPath
         * @param {*} widgetPosition
         * @returns {ITabWidgetTab}
         * @memberof TabWidget
         */
        TabWidget.prototype.addFixedTab = function (tabName, iconPath, widgetPosition) {
            var newTab = new tabWidgetFixedTab_1.TabWidgetFixedTab();
            newTab.appendTabLayout(this.parentContentId, widgetPosition, tabName, "");
            newTab.setIcon(iconPath);
            return newTab;
        };
        /**
         *
         *
         * @private
         * @memberof TabWidget
         */
        TabWidget.prototype.adaptWidthOfFlexTabBar = function () {
            tabWidgetFlexTabAreaWidth = "calc( 100% - 54px )";
            tabWidgetRightTabAreaWidth = "calc( 0px + 51px )";
            document.documentElement.style.setProperty('--tabWidgetFlexTabAreaWidth', tabWidgetFlexTabAreaWidth);
            document.documentElement.style.setProperty('--tabWidgetRightTabAreaWidth', tabWidgetRightTabAreaWidth);
        };
        /**
         *
         *
         * @private
         * @param {ITabWidgetTab} sender
         * @param {object} eventArgs
         * @returns {*}
         * @memberof TabWidget
         */
        TabWidget.prototype.onActiveTabHidden = function (sender, eventArgs) {
            if (eventArgs["eventTrigger"] == "resize") {
                var newIndex = this.dataModel.getFlexTabIndex(sender) - 1;
                if (newIndex >= 0) {
                    this.dataModel.setFlexTabPosition(newIndex, sender);
                }
            }
            else {
                this.dataModel.setFlexTabPosition(0, sender);
            }
        };
        /**
         *
         *
         * @private
         * @param {*} args
         * @memberof TabWidget
         */
        TabWidget.prototype.onTabClicked = function (args) {
            this.selectTab(args.tabName);
        };
        /**
         *
         *
         * @private
         * @param {*} args
         * @memberof TabWidget
         */
        TabWidget.prototype.onTabWheelClicked = function (args) {
            this.closeTab(args, true);
        };
        /**
         *
         *
         * @param {*} tabName
         * @returns {ITabWidgetTab}
         * @memberof TabWidget
         */
        TabWidget.prototype.selectTab = function (tabName) {
            var tabId = "tab_" + tabName;
            var selectedTab = this.dataModel.getTabById(tabId);
            if (selectedTab != undefined && !selectedTab.isActive) {
                this._flexDropDown.setTabSelected(tabId);
                this.setTabActive(selectedTab);
                this.resizeTab(selectedTab);
            }
            else if (selectedTab == undefined) {
                console.error("selected Tab is not defined");
            }
            return selectedTab;
        };
        /**
         *
         *
         * @private
         * @param {ITabWidgetTab} selectedTab
         * @memberof TabWidget
         */
        TabWidget.prototype.setTabActive = function (selectedTab) {
            this.setAllTabsInactive();
            if (this.dataModel.getActiveTab().widget != undefined) {
                this.dataModel.getActiveTab().widget.deactivate();
            }
            selectedTab.setActive();
            if (selectedTab.widget != undefined) {
                selectedTab.widget.activate();
            }
            this.dataModel.setActiveTab(selectedTab);
        };
        /**
         *
         *
         * @private
         * @param {ITabWidgetTab} selectedTab
         * @memberof TabWidget
         */
        TabWidget.prototype.resizeTab = function (selectedTab) {
            if (selectedTab.widget != undefined) {
                selectedTab.widget.resize(this._actualWidth, this._actualHeight);
            }
        };
        /**
         *
         *
         * @private
         * @memberof TabWidget
         */
        TabWidget.prototype.setAllTabsInactive = function () {
            for (var i = 0; i < this.dataModel.getAllTabs().length; i++) {
                this.dataModel.getAllTabs()[i].setDisplayNone();
                this.dataModel.getAllTabs()[i].removeStyleClassActive();
            }
        };
        TabWidget.prototype.onAbsoluteTabSelected = function () {
            for (var i = 0; i < this.dataModel.getAllTabs().length; i++) {
                this.dataModel.getAllTabs()[i].removeStyleClassActive();
            }
            var rightHandSideBarButtons = $(".rightHandSideBarButton");
            for (var i = 0; i < rightHandSideBarButtons.length; i++) {
                rightHandSideBarButtons[i].className = rightHandSideBarButtons[i].className.replace(" active", "");
                rightHandSideBarButtons[i].getElementsByTagName('img')[0].src = rightHandSideBarButtons[i].getElementsByTagName('img')[0].src.replace('_active.svg', '.svg');
            }
            var absoluteTabs = $(".absoluteTab");
            for (var i = 0; i < rightHandSideBarButtons.length; i++) {
                absoluteTabs[i].style.display = "none";
            }
        };
        /**
         *
         *
         * @param {number} width
         * @param {number} height
         * @memberof TabWidget
         */
        TabWidget.prototype.resize = function (width, height) {
            this._actualWidth = width;
            this._actualHeight = height;
            // Set size of tab control itself
            $(this.cssParentContentId)[0].style.width = width + "px";
            $(this.cssParentContentId)[0].style.height = height + "px";
            this.dataModel.getActiveTab().isVisible("resize");
            if (this.dataModel.getActiveTab().widget != undefined) {
                this.dataModel.getActiveTab().widget.resize(width, height);
            }
        };
        /**
         *
         *
         * @memberof TabWidget
         */
        TabWidget.prototype.selectOverview = function () {
            var fixedTabs = this.dataModel.data.fixedTabs;
            var overviewId = fixedTabs[fixedTabs.length - 1].tabContainerId;
            overviewId = overviewId.replace("tab_", "");
            this.selectTab(overviewId);
        };
        /**
         *
         *
         * @private
         * @param {ITabWidgetTab} tabToRemove
         * @param {*} mouseWheelClicked
         * @memberof TabWidget
         */
        TabWidget.prototype.removeTab = function (tabToRemove, mouseWheelClicked) {
            if (tabToRemove == this.dataModel.getActiveTab()) {
                var flexTabIndex = this.dataModel.getFlexTabIndex(tabToRemove);
                if ((this.dataModel.getFlexTabs()[flexTabIndex - 1]) != undefined) {
                    this.selectTab(this.dataModel.getFlexTabs()[flexTabIndex - 1].tabName);
                }
                else if ((this.dataModel.getFlexTabs()[flexTabIndex + 1]) != undefined) {
                    this.selectTab(this.dataModel.getFlexTabs()[flexTabIndex + 1].tabName);
                }
                else {
                    this.selectOverview();
                }
            }
            var index = this.dataModel.data.flexTabs.indexOf(tabToRemove, 0);
            if (index > -1) {
                this.dataModel.data.flexTabs.splice(index, 1);
            }
            this._flexDropDown.removeItemFromDropdown(tabToRemove.tabContainerId, mouseWheelClicked);
            var tabContainer = document.getElementById(tabToRemove.tabContainerId);
            var tabContainertab = document.getElementById(tabToRemove.tabContainerId + "_tab");
            tabContainertab.parentNode.removeChild(tabContainertab);
            tabContainer.parentNode.removeChild(tabContainer);
            this.unregisterEventsForTab(tabToRemove);
            _super.prototype.removeWidget.call(this, tabToRemove.widget);
        };
        /**
         *
         *
         * @private
         * @param {*} args
         * @param {*} mouseWheelClicked
         * @memberof TabWidget
         */
        TabWidget.prototype.closeTab = function (args, mouseWheelClicked) {
            var tabToClose = this.dataModel.getTabById(args.tabName);
            if (tabToClose.widget != undefined) {
                tabToClose.widget.dispose();
            }
            this.removeTab(tabToClose, mouseWheelClicked);
        };
        /**
         *
         *
         * @private
         * @param {*} args
         * @memberof TabWidget
         */
        TabWidget.prototype.closeAllTabs = function (args) {
            var tabsToClose = new Array();
            for (var i = 0; i < this.dataModel.getFlexTabs().length; i++) {
                tabsToClose.push(this.dataModel.getFlexTabs()[i]);
            }
            for (var i = 0; i < tabsToClose.length; i++) {
                tabsToClose[i].widget.dispose();
                this.removeTab(tabsToClose[i], false);
            }
        };
        /**
         *
         *
         * @private
         * @param {*} args
         * @memberof TabWidget
         */
        TabWidget.prototype.closeAllTabsButActive = function (args) {
            var tabsToClose = new Array();
            for (var i = 0; i < this.dataModel.getFlexTabs().length; i++) {
                if (this.dataModel.getFlexTabs()[i] != this.dataModel.getActiveTab()) {
                    tabsToClose.push(this.dataModel.getFlexTabs()[i]);
                }
            }
            for (var i = 0; i < tabsToClose.length; i++) {
                tabsToClose[i].widget.dispose();
                this.removeTab(tabsToClose[i], false);
            }
        };
        return TabWidget;
    }(layoutWidgetBase_1.LayoutWidgetBase));
    exports.TabWidget = TabWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiV2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RhYldpZGdldC90YWJXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQWNhLFFBQUEsZUFBZSxHQUFHLFFBQVEsQ0FBQztJQUV4QyxJQUFJLHlCQUF5QixHQUFHLE1BQU0sQ0FBQztJQUN2QyxJQUFJLDBCQUEwQixHQUFHLEtBQUssQ0FBQztJQUd2QztRQUF3Qiw2QkFBZ0I7UUFBeEM7WUFBQSxxRUEwZ0JDO1lBeGdCRywwQkFBb0IsR0FBRyw0QkFBNEIsQ0FBQTtZQUNuRCw2QkFBdUIsR0FBRywrQkFBK0IsQ0FBQztZQUMxRCx5QkFBbUIsR0FBRywyQkFBMkIsQ0FBQTtZQU16QyxxQ0FBK0IsR0FBRyxVQUFDLE1BQU0sRUFBRSxTQUFTLElBQU8sS0FBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQSxDQUFBLENBQUMsQ0FBQztZQUN6Riw0QkFBc0IsR0FBRyxVQUFDLE1BQU0sRUFBQyxJQUFJLElBQU0sS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUEsQ0FBQSxDQUFDLENBQUM7WUFDdkUsZ0NBQTBCLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFNLEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQSxDQUFDLENBQUM7WUFDeEUseUNBQW1DLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFNLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFBLENBQUMsQ0FBQztZQUUxRix3QkFBa0IsR0FBRyxVQUFDLE1BQU0sRUFBRSxJQUFJLElBQU0sS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFBLENBQUMsQ0FBQztZQUNqRSw2QkFBdUIsR0FBRyxVQUFDLE1BQU0sRUFBRSxJQUFJLElB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QUFXLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDekM7UUFDTCxDQUFDO1FBQ0wsZ0JBQUM7SUFBRCxDQUFDLEFBMWdCRCxDQUF3QixtQ0FBZ0IsR0EwZ0J2QztJQUNPLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTGF5b3V0V2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vbGF5b3V0V2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBJV2lkZ2V0IH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL3dpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUYWJXaWRnZXRGbGV4VGFiIH0gZnJvbSBcIi4vdmlldy90YWJXaWRnZXRGbGV4VGFiXCI7XHJcbmltcG9ydCB7IElUYWJXaWRnZXRUYWIgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL3RhYldpZGdldFRhYkludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUYWJXaWRnZXREYXRhTW9kZWwgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3RvcEJhckRhdGFNb2RlbC90YWJXaWRnZXREYXRhTW9kZWxcIjtcclxuaW1wb3J0IHsgSVRhYldpZGdldERhdGFNb2RlbCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvdG9wQmFyRGF0YU1vZGVsL2ludGVyZmFjZXMvdGFiV2lkZ2V0RGF0YU1vZGVsSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFRhYldpZGdldFdpZGdldFBvc2l0b25zfSBmcm9tIFwiLi9pbnRlcmZhY2VzL3RhYldpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUYWJXaWRnZXRGaXhlZFRhYiB9IGZyb20gXCIuL3ZpZXcvdGFiV2lkZ2V0Rml4ZWRUYWJcIjtcclxuaW1wb3J0IHsgVGFiV2lkZ2V0TGF5b3V0UHJvdmlkZXIgfSBmcm9tIFwiLi9sYXlvdXQvdGFiV2lkZ2V0TGF5b3V0UHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgVGFiV2lkZ2V0RmxleERyb3BEb3duIH0gZnJvbSBcIi4vdmlldy90YWJXaWRnZXRGbGV4RHJvcERvd25cIjtcclxuaW1wb3J0IHsgVGFiV2lkZ2V0U3R5bGVQcm92aWRlciB9IGZyb20gXCIuL3RhYldpZGdldFN0eWxlUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgVmlld1R5cGVQcm92aWRlciwgVmlld1R5cGV9IGZyb20gXCIuLi9jb21tb24vdmlld1R5cGVQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBVbmlxdWVJZEdlbmVyYXRvciB9IGZyb20gXCIuLi9jb21tb24vdW5pcXVlSWRHZW5lcmF0b3JcIjtcclxuXHJcbmV4cG9ydCBjb25zdCB0b3BCYXJDbGFzc05hbWUgPSBcIlRvcEJhclwiO1xyXG5cclxubGV0IHRhYldpZGdldEZsZXhUYWJBcmVhV2lkdGggPSBcIjEwMCVcIjtcclxubGV0IHRhYldpZGdldFJpZ2h0VGFiQXJlYVdpZHRoID0gXCIwcHhcIjtcclxuXHJcblxyXG5jbGFzcyBUYWJXaWRnZXQgZXh0ZW5kcyBMYXlvdXRXaWRnZXRCYXNlIHtcclxuXHJcbiAgICBfcmlnaHRUYWJDb250YWluZXJJZCA9IFwidGFiV2lkZ2V0VGFiQ29udGFpbmVyUmlnaHRcIlxyXG4gICAgX2ZsZXhpYmxlVGFiQ29udGFpbmVySWQgPSBcInRhYldpZGdldEZsZXhpYmxlVGFiQ29udGFpbmVyXCI7XHJcbiAgICBfbGVmdFRhYkNvbnRhaW5lcklkID0gXCJ0YWJXaWRnZXRUYWJDb250YWluZXJMZWZ0XCJcclxuXHJcbiAgICBfZmxleERyb3BEb3duPzogVGFiV2lkZ2V0RmxleERyb3BEb3duO1xyXG5cclxuICAgIGRhdGFNb2RlbCE6IElUYWJXaWRnZXREYXRhTW9kZWw7XHJcbiAgIFxyXG4gICAgcHJpdmF0ZSBfdGFiU2VsZWN0ZWRGcm9tRHJvcERvd25IYW5kbGVyID0gKHNlbmRlciwgZXZlbnRBcmdzKSA9PiB7IHRoaXMub25UYWJDbGlja2VkKGV2ZW50QXJncyl9O1xyXG4gICAgcHJpdmF0ZSBfdGFiQmFyQ2xvc2VUYWJIYW5kbGVyID0gKHNlbmRlcixhcmdzKSA9PiB7dGhpcy5jbG9zZVRhYihhcmdzLCBmYWxzZSl9O1xyXG4gICAgcHJpdmF0ZSBfdGFiQmFyQ2xvc2VBbGxUYWJzSGFuZGxlciA9IChzZW5kZXIsYXJncykgPT4ge3RoaXMuY2xvc2VBbGxUYWJzKGFyZ3MpfTtcclxuICAgIHByaXZhdGUgX3RhYkJhckNsb3NlQWxsVGFic0J1dEFjdGl2ZUhhbmRsZXIgPSAoc2VuZGVyLGFyZ3MpID0+IHt0aGlzLmNsb3NlQWxsVGFic0J1dEFjdGl2ZShhcmdzKX07XHJcbiAgICBcclxuICAgIHByaXZhdGUgX3RhYkNsaWNrZWRIYW5kbGVyID0gKHNlbmRlciwgYXJncykgPT4ge3RoaXMub25UYWJDbGlja2VkKGFyZ3MpfTtcclxuICAgIHByaXZhdGUgX3RhYldoZWVsQ2xpY2tlZEhhbmRsZXIgPSAoc2VuZGVyLCBhcmdzKSA9PiB7dGhpcy5vblRhYldoZWVsQ2xpY2tlZChhcmdzKX07XHJcbiAgICBwcml2YXRlIF9hY3RpdmVUYWJIaWRkZW5IYW5kbGVyID0gKHNlbmRlcixhcmdzKSA9PiB7dGhpcy5vbkFjdGl2ZVRhYkhpZGRlbihzZW5kZXIsYXJncyl9O1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxheW91dENvbnRhaW5lcklkXHJcbiAgICAgKiBAbWVtYmVyb2YgVGFiV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQ6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2FjdHVhbFdpZHRoPTUwMDtcclxuICAgICAgICB0aGlzLl9hY3R1YWxIZWlnaHQ9NTAwO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuZGF0YU1vZGVsID0gbmV3IFRhYldpZGdldERhdGFNb2RlbCgpXHJcbiAgICAgICAgdGhpcy5kYXRhTW9kZWwuaW5pdGlhbGl6ZSgpO1xyXG5cclxuICAgICAgICB0aGlzLl9mbGV4RHJvcERvd24gPSBuZXcgVGFiV2lkZ2V0RmxleERyb3BEb3duKCk7XHJcbiAgICAgICAgdGhpcy5hdHRhY2hGbGV4RHJvcERvd25FdmVudHMoKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRVbmlxdWVUYWJDb250YWluZXJJZHMobGF5b3V0Q29udGFpbmVySWQpO1xyXG4gICAgICAgIGxldCBkcm9wRG93blN0eWxlID0gVGFiV2lkZ2V0U3R5bGVQcm92aWRlci5nZXRJbnN0YW5jZSgpLmdldExheW91dFN0eWxlRm9yVGFiQmFyRHJvcERvd24obGF5b3V0Q29udGFpbmVySWQpO1xyXG4gICAgICAgICQoXCIjXCIrbGF5b3V0Q29udGFpbmVySWQpLmFwcGVuZChkcm9wRG93blN0eWxlKTtcclxuXHJcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZShsYXlvdXRDb250YWluZXJJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzcG9zZSgpe1xyXG4gICAgICAgIHRoaXMuZGF0YU1vZGVsLmRpc3Bvc2UoKTtcclxuICAgICAgICB0aGlzLmRldGFjaEZsZXhEcm9wRG93bkV2ZW50cygpO1xyXG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBBdHRhY2hlcyB0aGUgZmxleERyb3BEb3duIGV2ZW50c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVGFiV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXR0YWNoRmxleERyb3BEb3duRXZlbnRzKCl7XHJcbiAgICAgICAgaWYodGhpcy5fZmxleERyb3BEb3duICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZsZXhEcm9wRG93bi5ldmVudFRhYlNlbGVjdGVkRnJvbURyb3Bkb3duLmF0dGFjaCh0aGlzLl90YWJTZWxlY3RlZEZyb21Ecm9wRG93bkhhbmRsZXIpO1xyXG4gICAgICAgICAgICB0aGlzLl9mbGV4RHJvcERvd24uZXZlbnRUYWJCYXJDbG9zZVRhYi5hdHRhY2godGhpcy5fdGFiQmFyQ2xvc2VUYWJIYW5kbGVyKTtcclxuICAgICAgICAgICAgdGhpcy5fZmxleERyb3BEb3duLmV2ZW50VGFiQmFyQ2xvc2VBbGxUYWJzLmF0dGFjaCh0aGlzLl90YWJCYXJDbG9zZUFsbFRhYnNIYW5kbGVyKTtcclxuICAgICAgICAgICAgdGhpcy5fZmxleERyb3BEb3duLmV2ZW50VGFiQmFyQ2xvc2VBbGxUYWJzQnV0QWN0aXZlLmF0dGFjaCh0aGlzLl90YWJCYXJDbG9zZUFsbFRhYnNCdXRBY3RpdmVIYW5kbGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXRhY2hlcyB0aGUgZmxleERyb3BEb3duIGV2ZW50c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVGFiV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZGV0YWNoRmxleERyb3BEb3duRXZlbnRzKCl7XHJcbiAgICAgICAgaWYodGhpcy5fZmxleERyb3BEb3duICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZsZXhEcm9wRG93bi5ldmVudFRhYlNlbGVjdGVkRnJvbURyb3Bkb3duLmRldGFjaCh0aGlzLl90YWJTZWxlY3RlZEZyb21Ecm9wRG93bkhhbmRsZXIpO1xyXG4gICAgICAgICAgICB0aGlzLl9mbGV4RHJvcERvd24uZXZlbnRUYWJCYXJDbG9zZVRhYi5kZXRhY2godGhpcy5fdGFiQmFyQ2xvc2VUYWJIYW5kbGVyKTtcclxuICAgICAgICAgICAgdGhpcy5fZmxleERyb3BEb3duLmV2ZW50VGFiQmFyQ2xvc2VBbGxUYWJzLmRldGFjaCh0aGlzLl90YWJCYXJDbG9zZUFsbFRhYnNIYW5kbGVyKTtcclxuICAgICAgICAgICAgdGhpcy5fZmxleERyb3BEb3duLmV2ZW50VGFiQmFyQ2xvc2VBbGxUYWJzQnV0QWN0aXZlLmRldGFjaCh0aGlzLl90YWJCYXJDbG9zZUFsbFRhYnNCdXRBY3RpdmVIYW5kbGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGF5b3V0Q29udGFpbmVySWRcclxuICAgICAqIEBtZW1iZXJvZiBUYWJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRVbmlxdWVUYWJDb250YWluZXJJZHMobGF5b3V0Q29udGFpbmVySWQ6IHN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5fcmlnaHRUYWJDb250YWluZXJJZCA9IGxheW91dENvbnRhaW5lcklkICsgXCJfdGFiV2lkZ2V0VGFiQ29udGFpbmVyUmlnaHRcIlxyXG4gICAgICAgIHRoaXMuX2ZsZXhpYmxlVGFiQ29udGFpbmVySWQgPSBsYXlvdXRDb250YWluZXJJZCArIFwiX3RhYldpZGdldEZsZXhpYmxlVGFiQ29udGFpbmVyXCI7XHJcbiAgICAgICAgdGhpcy5fbGVmdFRhYkNvbnRhaW5lcklkID0gbGF5b3V0Q29udGFpbmVySWQgKyBcIl90YWJXaWRnZXRUYWJDb250YWluZXJMZWZ0XCJcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBsYXlvdXQgb2YgdGhlIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBUYWJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgY3JlYXRlTGF5b3V0KCkge1xyXG5cclxuICAgICAgICBsZXQgdGFiTGF5b3V0OiBzdHJpbmcgPSBUYWJXaWRnZXRMYXlvdXRQcm92aWRlci5nZXRJbnN0YW5jZSgpLmdldFRhYkJhckxheW91dCh0aGlzLnBhcmVudENvbnRlbnRJZCwgdGhpcy5fbGVmdFRhYkNvbnRhaW5lcklkLHRoaXMuX2ZsZXhpYmxlVGFiQ29udGFpbmVySWQsdGhpcy5fcmlnaHRUYWJDb250YWluZXJJZCk7XHJcbiAgICAgICAgJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCkuYXBwZW5kKHRhYkxheW91dCk7XHJcbiAgICAgICAgLy8kKFwiLlwiK21haW5OYXZpZ2F0aW9uQ2xhc3NOYW1lKS5wYXJlbnQoKS5hcHBlbmQoJChgPGRpdiBpZD1cImArIHRoaXMuX3JpZ2h0VGFiQ29udGFpbmVySWQgK2BcIiBjbGFzcz1cInRvcEJhclRhYkNvbnRhaW5lclJpZ2h0XCI+PC9kaXY+YCkpXHJcbiAgICAgICAgdGhpcy5fZmxleERyb3BEb3duIS5hZGRGbGV4VGFiRHJvcGRvd24odGhpcy5wYXJlbnRDb250ZW50SWQsIHRoaXMuX2ZsZXhpYmxlVGFiQ29udGFpbmVySWQpO1xyXG4gICAgICAgIHRoaXMuYWRhcHRXaWR0aE9mRmxleFRhYkJhcigpO1xyXG4gICAgfSAgICBcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkcyB0aGUgc3R5bGVzIGZvciB0aGUgdGFiIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBUYWJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgbG9hZFN0eWxlcygpe1xyXG4gICAgICAgIHN1cGVyLmFkZFN0eWxlKFwid2lkZ2V0cy90YWJXaWRnZXQvc3R5bGUvY3NzL3RhYldpZGdldFN0eWxlLmNzc1wiKTtcclxuICAgIH1cclxuICAgICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBUYWJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgYWN0aXZhdGUoKXtcclxuICAgICAgICBpZih0aGlzLmRhdGFNb2RlbC5nZXRGbGV4VGFicygpLmxlbmd0aCA9PSAwKXtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RPdmVydmlldygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgd2lkZ2V0ID0gdGhpcy5kYXRhTW9kZWwuZ2V0QWN0aXZlVGFiKCkud2lkZ2V0O1xyXG4gICAgICAgIGlmKHdpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB3aWRnZXQuYWN0aXZhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGVhY3RpdmF0ZSgpe1xyXG4gICAgICAgIGxldCB0YWJzID0gdGhpcy5kYXRhTW9kZWwuZ2V0QWxsVGFicygpO1xyXG4gICAgICAgIGZvcihsZXQgZWxlbWVudCBvZiB0YWJzKXtcclxuICAgICAgICAgICAgaWYoZWxlbWVudC53aWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQud2lkZ2V0IS5kZWFjdGl2YXRlKCk7XHJcbiAgICAgICAgICAgIH0gICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJV2lkZ2V0fSB3aWRnZXRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0YWJOYW1lXHJcbiAgICAgKiBAcGFyYW0ge1ZpZXdUeXBlfSB2aWV3VHlwZVxyXG4gICAgICogQHBhcmFtIHsqfSBkYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgVGFiV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGFkZFdpZGdldCh3aWRnZXQ6IElXaWRnZXQsIHRhYk5hbWU6IHN0cmluZywgdmlld1R5cGU6IFZpZXdUeXBlLCBkYXRhIDogYW55KXtcclxuICAgICAgICBzdXBlci5hZGRXaWRnZXQod2lkZ2V0LCB0YWJOYW1lLCB2aWV3VHlwZSk7XHJcbiAgICAgICAgbGV0IHRhYklkID0gdGFiTmFtZSArIFwiX1wiICsgdmlld1R5cGUudG9TdHJpbmcoKTtcclxuICAgICAgICB0YWJJZCA9IFVuaXF1ZUlkR2VuZXJhdG9yLmdldEluc3RhbmNlKCkuZ2V0VW5pcXVlSWRGcm9tU3RyaW5nKHRhYklkKVxyXG4gICAgICAgIHRhYklkID0gdGFiSWQucmVwbGFjZSgvWyZcXC9cXFxcIywrKCkkfiUuJ1wiOio/PD57fV0vZywnXycpO1xyXG5cclxuICAgICAgICBsZXQgaWNvblBhdGggPSBWaWV3VHlwZVByb3ZpZGVyLmdldEluc3RhbmNlKCkuZ2V0SWNvbkJ5Vmlld1R5cGUodmlld1R5cGUpO1xyXG4gICAgICAgIGxldCBuZXdUYWIgPSB0aGlzLmFkZE5ld1RhYihkYXRhLndpZGdldFBvc2l0aW9uLCBpY29uUGF0aCwgdGFiSWQsIHRhYk5hbWUpO1xyXG4gICAgICAgIGlmKG5ld1RhYil7XHJcbiAgICAgICAgICAgIG5ld1RhYi5hZGRXaWRnZXQod2lkZ2V0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHdpZGdldFBvc2l0aW9uXHJcbiAgICAgKiBAcGFyYW0geyp9IGljb25QYXRoXHJcbiAgICAgKiBAcGFyYW0geyp9IHRhYklkXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFRhYldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZE5ld1RhYih3aWRnZXRQb3NpdGlvbiwgaWNvblBhdGgsIHRhYklkLCBkaXNwbGF5TmFtZSl7XHJcbiAgICAgICAgbGV0IG5ld1RhYjogSVRhYldpZGdldFRhYiB8IHVuZGVmaW5lZDtcclxuICAgICAgICBzd2l0Y2ggKHdpZGdldFBvc2l0aW9uKXtcclxuICAgICAgICAgICAgICAgIGNhc2UgVGFiV2lkZ2V0V2lkZ2V0UG9zaXRvbnMuZmxleCA6XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3VGFiID0gdGhpcy5hZGRGbGV4aWJsZVRhYih0YWJJZCwgaWNvblBhdGgsIGRpc3BsYXlOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgVGFiV2lkZ2V0V2lkZ2V0UG9zaXRvbnMucmlnaHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3VGFiID0gdGhpcy5hZGRGaXhlZFRhYih0YWJJZCxpY29uUGF0aCx0aGlzLl9yaWdodFRhYkNvbnRhaW5lcklkKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBjYXNlIFRhYldpZGdldFdpZGdldFBvc2l0b25zLmxlZnQ6XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3VGFiID0gdGhpcy5hZGRGaXhlZFRhYih0YWJJZCxpY29uUGF0aCx0aGlzLl9sZWZ0VGFiQ29udGFpbmVySWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50c0ZvclRhYihuZXdUYWIpO1xyXG4gICAgICAgIHRoaXMuZGF0YU1vZGVsLmFkZFRhYihuZXdUYWIhKTtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gbmV3VGFiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtJVGFiV2lkZ2V0VGFifSB0YWJcclxuICAgICAqIEBtZW1iZXJvZiBUYWJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWdpc3RlckV2ZW50c0ZvclRhYih0YWI6IElUYWJXaWRnZXRUYWJ8dW5kZWZpbmVkKXtcclxuICAgICAgICBpZih0YWIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGFiLmV2ZW50VGFiV2lkZ2V0VGFiQ2xpY2tlZC5hdHRhY2godGhpcy5fdGFiQ2xpY2tlZEhhbmRsZXIpO1xyXG4gICAgICAgICAgICB0YWIuZXZlbnRUYWJXaWRnZXRUYWJXaGVlbENsaWNrZWQuYXR0YWNoKHRoaXMuX3RhYldoZWVsQ2xpY2tlZEhhbmRsZXIpO1xyXG4gICAgICAgICAgICB0YWIuZXZlbnRUYWJXaWRnZXRBY3RpdmVIaWRkZW4uYXR0YWNoKHRoaXMuX2FjdGl2ZVRhYkhpZGRlbkhhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVucmVnaXN0ZXJFdmVudHNGb3JUYWIodGFiOiBJVGFiV2lkZ2V0VGFifHVuZGVmaW5lZCl7XHJcbiAgICAgICAgaWYodGFiICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRhYi5ldmVudFRhYldpZGdldFRhYkNsaWNrZWQuZGV0YWNoKHRoaXMuX3RhYkNsaWNrZWRIYW5kbGVyKTtcclxuICAgICAgICAgICAgdGFiLmV2ZW50VGFiV2lkZ2V0VGFiV2hlZWxDbGlja2VkLmRldGFjaCh0aGlzLl90YWJXaGVlbENsaWNrZWRIYW5kbGVyKTtcclxuICAgICAgICAgICAgdGFiLmV2ZW50VGFiV2lkZ2V0QWN0aXZlSGlkZGVuLmRldGFjaCh0aGlzLl9hY3RpdmVUYWJIaWRkZW5IYW5kbGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHRhYklEXHJcbiAgICAgKiBAcGFyYW0geyp9IGljb25QYXRoXHJcbiAgICAgKiBAcmV0dXJucyB7SVRhYldpZGdldFRhYn1cclxuICAgICAqIEBtZW1iZXJvZiBUYWJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRGbGV4aWJsZVRhYih0YWJJRCxpY29uUGF0aCwgZGlzcGxheU5hbWUpIDogSVRhYldpZGdldFRhYntcclxuICAgICAgICBsZXQgbmV3VGFiOiBJVGFiV2lkZ2V0VGFiID0gbmV3IFRhYldpZGdldEZsZXhUYWIoKTtcclxuICAgICAgICBuZXdUYWIuYXBwZW5kVGFiTGF5b3V0KHRoaXMucGFyZW50Q29udGVudElkLCB0aGlzLl9mbGV4aWJsZVRhYkNvbnRhaW5lcklkK1wiX2ZsZXhCb3hcIiwgdGFiSUQsIGRpc3BsYXlOYW1lKTtcclxuICAgICAgICBuZXdUYWIuc2V0SWNvbihpY29uUGF0aCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2ZsZXhEcm9wRG93biEuYWRkSXRlbVRvRHJvcGRvd24oZGlzcGxheU5hbWUsIG5ld1RhYi50YWJDb250YWluZXJJZCwgdGhpcy5wYXJlbnRDb250ZW50SWQsIGljb25QYXRoKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICByZXR1cm4gbmV3VGFiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSB0YWJOYW1lXHJcbiAgICAgKiBAcGFyYW0geyp9IGljb25QYXRoXHJcbiAgICAgKiBAcGFyYW0geyp9IHdpZGdldFBvc2l0aW9uXHJcbiAgICAgKiBAcmV0dXJucyB7SVRhYldpZGdldFRhYn1cclxuICAgICAqIEBtZW1iZXJvZiBUYWJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRGaXhlZFRhYih0YWJOYW1lLGljb25QYXRoLCB3aWRnZXRQb3NpdGlvbikgOiBJVGFiV2lkZ2V0VGFie1xyXG4gICAgICAgIGxldCBuZXdUYWI6IElUYWJXaWRnZXRUYWIgPSBuZXcgVGFiV2lkZ2V0Rml4ZWRUYWIoKTtcclxuICAgICAgICBuZXdUYWIuYXBwZW5kVGFiTGF5b3V0KHRoaXMucGFyZW50Q29udGVudElkLCB3aWRnZXRQb3NpdGlvbiwgdGFiTmFtZSwgXCJcIik7XHJcbiAgICAgICAgbmV3VGFiLnNldEljb24oaWNvblBhdGgpO1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3VGFiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRhYldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkYXB0V2lkdGhPZkZsZXhUYWJCYXIoKXtcclxuICAgICAgICB0YWJXaWRnZXRGbGV4VGFiQXJlYVdpZHRoID0gXCJjYWxjKCAxMDAlIC0gNTRweCApXCI7XHJcbiAgICAgICAgdGFiV2lkZ2V0UmlnaHRUYWJBcmVhV2lkdGggPSBcImNhbGMoIDBweCArIDUxcHggKVwiO1xyXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCEuc3R5bGUuc2V0UHJvcGVydHkoJy0tdGFiV2lkZ2V0RmxleFRhYkFyZWFXaWR0aCcsIHRhYldpZGdldEZsZXhUYWJBcmVhV2lkdGgpO1xyXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCEuc3R5bGUuc2V0UHJvcGVydHkoJy0tdGFiV2lkZ2V0UmlnaHRUYWJBcmVhV2lkdGgnLCB0YWJXaWRnZXRSaWdodFRhYkFyZWFXaWR0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0lUYWJXaWRnZXRUYWJ9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGV2ZW50QXJnc1xyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgVGFiV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25BY3RpdmVUYWJIaWRkZW4oc2VuZGVyOiBJVGFiV2lkZ2V0VGFiLCBldmVudEFyZ3M6IG9iamVjdCk6IGFueSB7XHJcbiAgICAgICAgaWYoZXZlbnRBcmdzW1wiZXZlbnRUcmlnZ2VyXCJdID09IFwicmVzaXplXCIpe1xyXG4gICAgICAgICAgICBsZXQgbmV3SW5kZXggPSB0aGlzLmRhdGFNb2RlbC5nZXRGbGV4VGFiSW5kZXgoc2VuZGVyKS0xO1xyXG4gICAgICAgICAgICBpZihuZXdJbmRleCA+PSAwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YU1vZGVsLnNldEZsZXhUYWJQb3NpdGlvbihuZXdJbmRleCwgc2VuZGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFNb2RlbC5zZXRGbGV4VGFiUG9zaXRpb24oMCxzZW5kZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIFRhYldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uVGFiQ2xpY2tlZChhcmdzKXtcclxuICAgICAgICB0aGlzLnNlbGVjdFRhYihhcmdzLnRhYk5hbWUpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBUYWJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvblRhYldoZWVsQ2xpY2tlZChhcmdzKXtcclxuICAgICAgICB0aGlzLmNsb3NlVGFiKGFyZ3MsIHRydWUpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gdGFiTmFtZVxyXG4gICAgICogQHJldHVybnMge0lUYWJXaWRnZXRUYWJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgVGFiV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHNlbGVjdFRhYih0YWJOYW1lKSA6IElUYWJXaWRnZXRUYWJ7XHJcbiAgICAgICAgbGV0IHRhYklkID0gXCJ0YWJfXCIrdGFiTmFtZTtcclxuICAgICAgICBsZXQgc2VsZWN0ZWRUYWIgPSB0aGlzLmRhdGFNb2RlbC5nZXRUYWJCeUlkKHRhYklkKTtcclxuICAgICAgICBpZiAoc2VsZWN0ZWRUYWIgIT0gdW5kZWZpbmVkICYmICFzZWxlY3RlZFRhYi5pc0FjdGl2ZSl7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZsZXhEcm9wRG93biEuc2V0VGFiU2VsZWN0ZWQodGFiSWQpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFRhYkFjdGl2ZShzZWxlY3RlZFRhYik7XHJcbiAgICAgICAgICAgIHRoaXMucmVzaXplVGFiKHNlbGVjdGVkVGFiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihzZWxlY3RlZFRhYiA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwic2VsZWN0ZWQgVGFiIGlzIG5vdCBkZWZpbmVkXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZWxlY3RlZFRhYjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SVRhYldpZGdldFRhYn0gc2VsZWN0ZWRUYWJcclxuICAgICAqIEBtZW1iZXJvZiBUYWJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRUYWJBY3RpdmUoc2VsZWN0ZWRUYWI6IElUYWJXaWRnZXRUYWIpe1xyXG4gICAgICAgIHRoaXMuc2V0QWxsVGFic0luYWN0aXZlKCk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuZGF0YU1vZGVsLmdldEFjdGl2ZVRhYigpLndpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFNb2RlbC5nZXRBY3RpdmVUYWIoKS53aWRnZXQhLmRlYWN0aXZhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VsZWN0ZWRUYWIuc2V0QWN0aXZlKCk7XHJcbiAgICAgICAgaWYoc2VsZWN0ZWRUYWIud2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBzZWxlY3RlZFRhYi53aWRnZXQuYWN0aXZhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5kYXRhTW9kZWwuc2V0QWN0aXZlVGFiKHNlbGVjdGVkVGFiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SVRhYldpZGdldFRhYn0gc2VsZWN0ZWRUYWJcclxuICAgICAqIEBtZW1iZXJvZiBUYWJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZXNpemVUYWIoc2VsZWN0ZWRUYWI6IElUYWJXaWRnZXRUYWIpe1xyXG4gICAgICAgIGlmKHNlbGVjdGVkVGFiLndpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBzZWxlY3RlZFRhYi53aWRnZXQhLnJlc2l6ZSh0aGlzLl9hY3R1YWxXaWR0aCwgdGhpcy5fYWN0dWFsSGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVGFiV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHNldEFsbFRhYnNJbmFjdGl2ZSgpe1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmRhdGFNb2RlbC5nZXRBbGxUYWJzKCkubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YU1vZGVsLmdldEFsbFRhYnMoKVtpXS5zZXREaXNwbGF5Tm9uZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFNb2RlbC5nZXRBbGxUYWJzKClbaV0ucmVtb3ZlU3R5bGVDbGFzc0FjdGl2ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkFic29sdXRlVGFiU2VsZWN0ZWQoKXtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5kYXRhTW9kZWwuZ2V0QWxsVGFicygpLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFNb2RlbC5nZXRBbGxUYWJzKClbaV0ucmVtb3ZlU3R5bGVDbGFzc0FjdGl2ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHJpZ2h0SGFuZFNpZGVCYXJCdXR0b25zID0gJChcIi5yaWdodEhhbmRTaWRlQmFyQnV0dG9uXCIpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCByaWdodEhhbmRTaWRlQmFyQnV0dG9ucy5sZW5ndGggOyBpKyspe1xyXG4gICAgICAgICAgICByaWdodEhhbmRTaWRlQmFyQnV0dG9uc1tpXS5jbGFzc05hbWUgPSByaWdodEhhbmRTaWRlQmFyQnV0dG9uc1tpXS5jbGFzc05hbWUucmVwbGFjZShcIiBhY3RpdmVcIiwgXCJcIik7XHJcbiAgICAgICAgICAgIHJpZ2h0SGFuZFNpZGVCYXJCdXR0b25zW2ldLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbWcnKVswXS5zcmMgPSByaWdodEhhbmRTaWRlQmFyQnV0dG9uc1tpXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW1nJylbMF0uc3JjLnJlcGxhY2UoJ19hY3RpdmUuc3ZnJywgJy5zdmcnKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYWJzb2x1dGVUYWJzID0gJChcIi5hYnNvbHV0ZVRhYlwiKTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcmlnaHRIYW5kU2lkZUJhckJ1dHRvbnMubGVuZ3RoIDsgaSsrKXtcclxuICAgICAgICAgICAgYWJzb2x1dGVUYWJzW2ldLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gd2lkdGhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcclxuICAgICAqIEBtZW1iZXJvZiBUYWJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcmVzaXplKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKXtcclxuXHJcbiAgICAgICAgdGhpcy5fYWN0dWFsV2lkdGggPSB3aWR0aDtcclxuICAgICAgICB0aGlzLl9hY3R1YWxIZWlnaHQgPSBoZWlnaHQ7XHJcblxyXG4gICAgICAgIC8vIFNldCBzaXplIG9mIHRhYiBjb250cm9sIGl0c2VsZlxyXG4gICAgICAgICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpWzBdLnN0eWxlLndpZHRoID0gd2lkdGggKyBcInB4XCI7XHJcbiAgICAgICAgJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZClbMF0uc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ICsgXCJweFwiO1xyXG4gICAgXHJcblxyXG4gICAgICAgIHRoaXMuZGF0YU1vZGVsLmdldEFjdGl2ZVRhYigpLmlzVmlzaWJsZShcInJlc2l6ZVwiKVxyXG4gICAgICAgIGlmKHRoaXMuZGF0YU1vZGVsLmdldEFjdGl2ZVRhYigpLndpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFNb2RlbC5nZXRBY3RpdmVUYWIoKS53aWRnZXQhLnJlc2l6ZSh3aWR0aCxoZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRhYldpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2VsZWN0T3ZlcnZpZXcoKXtcclxuICAgICAgICBsZXQgZml4ZWRUYWJzID0gdGhpcy5kYXRhTW9kZWwuZGF0YS5maXhlZFRhYnM7XHJcbiAgICAgICAgbGV0IG92ZXJ2aWV3SWQgPSBmaXhlZFRhYnNbZml4ZWRUYWJzLmxlbmd0aC0xXS50YWJDb250YWluZXJJZDtcclxuICAgICAgICBvdmVydmlld0lkID0gb3ZlcnZpZXdJZC5yZXBsYWNlKFwidGFiX1wiLFwiXCIpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0VGFiKG92ZXJ2aWV3SWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtJVGFiV2lkZ2V0VGFifSB0YWJUb1JlbW92ZVxyXG4gICAgICogQHBhcmFtIHsqfSBtb3VzZVdoZWVsQ2xpY2tlZFxyXG4gICAgICogQG1lbWJlcm9mIFRhYldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlbW92ZVRhYih0YWJUb1JlbW92ZTogSVRhYldpZGdldFRhYiwgbW91c2VXaGVlbENsaWNrZWQpe1xyXG4gICAgICAgIGlmKHRhYlRvUmVtb3ZlID09IHRoaXMuZGF0YU1vZGVsLmdldEFjdGl2ZVRhYigpKXtcclxuICAgICAgICAgICAgbGV0IGZsZXhUYWJJbmRleCA9IHRoaXMuZGF0YU1vZGVsLmdldEZsZXhUYWJJbmRleCh0YWJUb1JlbW92ZSk7XHJcbiAgICAgICAgICAgIGlmKCh0aGlzLmRhdGFNb2RlbC5nZXRGbGV4VGFicygpW2ZsZXhUYWJJbmRleCAtIDFdKSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RUYWIodGhpcy5kYXRhTW9kZWwuZ2V0RmxleFRhYnMoKVtmbGV4VGFiSW5kZXggLSAxXS50YWJOYW1lKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYoKHRoaXMuZGF0YU1vZGVsLmdldEZsZXhUYWJzKClbZmxleFRhYkluZGV4ICsgMV0pICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdFRhYih0aGlzLmRhdGFNb2RlbC5nZXRGbGV4VGFicygpW2ZsZXhUYWJJbmRleCArIDFdLnRhYk5hbWUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0T3ZlcnZpZXcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmRhdGFNb2RlbC5kYXRhLmZsZXhUYWJzLmluZGV4T2YodGFiVG9SZW1vdmUsIDApO1xyXG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YU1vZGVsLmRhdGEuZmxleFRhYnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fZmxleERyb3BEb3duIS5yZW1vdmVJdGVtRnJvbURyb3Bkb3duKHRhYlRvUmVtb3ZlLnRhYkNvbnRhaW5lcklkISwgbW91c2VXaGVlbENsaWNrZWQpO1xyXG5cclxuICAgICAgICBsZXQgdGFiQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFiVG9SZW1vdmUudGFiQ29udGFpbmVySWQhKTtcclxuICAgICAgICBsZXQgdGFiQ29udGFpbmVydGFiID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFiVG9SZW1vdmUudGFiQ29udGFpbmVySWQrXCJfdGFiXCIpO1xyXG5cclxuICAgICAgICB0YWJDb250YWluZXJ0YWIhLnBhcmVudE5vZGUhLnJlbW92ZUNoaWxkKHRhYkNvbnRhaW5lcnRhYiEpO1xyXG4gICAgICAgIHRhYkNvbnRhaW5lciEucGFyZW50Tm9kZSEucmVtb3ZlQ2hpbGQodGFiQ29udGFpbmVyISk7XHJcbiAgICAgICAgdGhpcy51bnJlZ2lzdGVyRXZlbnRzRm9yVGFiKHRhYlRvUmVtb3ZlKTtcclxuICAgICAgICBzdXBlci5yZW1vdmVXaWRnZXQodGFiVG9SZW1vdmUud2lkZ2V0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQHBhcmFtIHsqfSBtb3VzZVdoZWVsQ2xpY2tlZFxyXG4gICAgICogQG1lbWJlcm9mIFRhYldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNsb3NlVGFiKGFyZ3MsIG1vdXNlV2hlZWxDbGlja2VkKXtcclxuICAgICAgICBsZXQgdGFiVG9DbG9zZSA9IHRoaXMuZGF0YU1vZGVsLmdldFRhYkJ5SWQoYXJncy50YWJOYW1lKTsgICBcclxuICAgICAgICBpZih0YWJUb0Nsb3NlLndpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0YWJUb0Nsb3NlLndpZGdldC5kaXNwb3NlKCk7XHJcbiAgICAgICAgfSAgIFxyXG4gICAgICAgIHRoaXMucmVtb3ZlVGFiKHRhYlRvQ2xvc2UsIG1vdXNlV2hlZWxDbGlja2VkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIFRhYldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNsb3NlQWxsVGFicyhhcmdzKXtcclxuICAgICAgICBsZXQgdGFic1RvQ2xvc2UgPSBuZXcgQXJyYXkoKTtcclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuZGF0YU1vZGVsLmdldEZsZXhUYWJzKCkubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICB0YWJzVG9DbG9zZS5wdXNoKHRoaXMuZGF0YU1vZGVsLmdldEZsZXhUYWJzKClbaV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRhYnNUb0Nsb3NlLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgdGFic1RvQ2xvc2VbaV0ud2lkZ2V0LmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVUYWIodGFic1RvQ2xvc2VbaV0sIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBUYWJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjbG9zZUFsbFRhYnNCdXRBY3RpdmUoYXJncyl7XHJcbiAgICAgICAgbGV0IHRhYnNUb0Nsb3NlID0gbmV3IEFycmF5KCk7XHJcblxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmRhdGFNb2RlbC5nZXRGbGV4VGFicygpLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYodGhpcy5kYXRhTW9kZWwuZ2V0RmxleFRhYnMoKVtpXSAhPSB0aGlzLmRhdGFNb2RlbC5nZXRBY3RpdmVUYWIoKSl7XHJcbiAgICAgICAgICAgICAgICB0YWJzVG9DbG9zZS5wdXNoKHRoaXMuZGF0YU1vZGVsLmdldEZsZXhUYWJzKClbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0YWJzVG9DbG9zZS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIHRhYnNUb0Nsb3NlW2ldLndpZGdldC5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlVGFiKHRhYnNUb0Nsb3NlW2ldLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCB7VGFiV2lkZ2V0fTsiXX0=