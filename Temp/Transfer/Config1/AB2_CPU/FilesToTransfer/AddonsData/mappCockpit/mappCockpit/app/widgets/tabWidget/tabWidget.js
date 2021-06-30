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
define(["require", "exports", "../common/layoutWidgetBase", "./view/tabWidgetFlexTab", "./interfaces/tabWidgetInterface", "./view/tabWidgetFixedTab", "./layout/tabWidgetLayoutProvider", "./view/tabWidgetFlexDropDown", "./tabWidgetStyleProvider", "../common/viewTypeProvider", "../common/uniqueIdGenerator", "./defaultComponentSettings"], function (require, exports, layoutWidgetBase_1, tabWidgetFlexTab_1, tabWidgetInterface_1, tabWidgetFixedTab_1, tabWidgetLayoutProvider_1, tabWidgetFlexDropDown_1, tabWidgetStyleProvider_1, viewTypeProvider_1, uniqueIdGenerator_1, defaultComponentSettings_1) {
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
            this._flexDropDown = new tabWidgetFlexDropDown_1.TabWidgetFlexDropDown();
            this.attachFlexDropDownEvents();
            this.setUniqueTabContainerIds(layoutContainerId);
            var dropDownStyle = tabWidgetStyleProvider_1.TabWidgetStyleProvider.getInstance().getLayoutStyleForTabBarDropDown(layoutContainerId);
            $("#" + layoutContainerId).append(dropDownStyle);
            _super.prototype.initialize.call(this, layoutContainerId);
        };
        TabWidget.prototype.initializeComponent = function () {
            this.component.defaultSettingsDataId = defaultComponentSettings_1.DefaultComponentSettings.WidgetDefinitionId;
            this.component.disablePersisting();
        };
        TabWidget.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            this.dataModel = this.component.getSubComponent(defaultComponentSettings_1.DefaultComponentSettings.TabWidgetDataModel);
        };
        /**
         * Returns the default component settings for this widget
         *
         * @returns {(ComponentSettings|undefined)}
         * @memberof TabWidget
         */
        TabWidget.prototype.getDefaultComponentSettings = function () {
            return defaultComponentSettings_1.DefaultComponentSettings.getTabWidgetDefinition();
        };
        TabWidget.prototype.dispose = function () {
            // Dispose widgets
            this._widgets.forEach(function (widget) {
                if (widget != undefined) {
                    widget.dispose();
                }
            });
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
            if (tabToClose != undefined) {
                //tabToClose.widget.saveComponentSettings();
                if (tabToClose.widget != undefined) {
                    tabToClose.widget.dispose();
                }
                this.removeTab(tabToClose, mouseWheelClicked);
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiV2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RhYldpZGdldC90YWJXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQWVhLFFBQUEsZUFBZSxHQUFHLFFBQVEsQ0FBQztJQUV4QyxJQUFJLHlCQUF5QixHQUFHLE1BQU0sQ0FBQztJQUN2QyxJQUFJLDBCQUEwQixHQUFHLEtBQUssQ0FBQztJQUd2QztRQUF3Qiw2QkFBZ0I7UUFBeEM7WUFBQSxxRUFzaUJDO1lBcGlCRywwQkFBb0IsR0FBRyw0QkFBNEIsQ0FBQTtZQUNuRCw2QkFBdUIsR0FBRywrQkFBK0IsQ0FBQztZQUMxRCx5QkFBbUIsR0FBRywyQkFBMkIsQ0FBQTtZQU16QyxxQ0FBK0IsR0FBRyxVQUFDLE1BQU0sRUFBRSxTQUFTLElBQU8sS0FBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQSxDQUFBLENBQUMsQ0FBQztZQUN6Riw0QkFBc0IsR0FBRyxVQUFDLE1BQU0sRUFBQyxJQUFJLElBQU0sS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUEsQ0FBQSxDQUFDLENBQUM7WUFDdkUsZ0NBQTBCLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFNLEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQSxDQUFDLENBQUM7WUFDeEUseUNBQW1DLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFNLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFBLENBQUMsQ0FBQztZQUUxRix3QkFBa0IsR0FBRyxVQUFDLE1BQU0sRUFBRSxJQUFJLElBQU0sS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFBLENBQUMsQ0FBQztZQUNqRSw2QkFBdUIsR0FBRyxVQUFDLE1BQU0sRUFBRSxJQUFJLElB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RSxDQUFDO1lBRTlCLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztnQkFDeEQsSUFBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLEVBQUM7b0JBQ2hFLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNyRDthQUNKO1lBQ0QsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQ3ZDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ3pDO1FBQ0wsQ0FBQztRQUNMLGdCQUFDO0lBQUQsQ0FBQyxBQXRpQkQsQ0FBd0IsbUNBQWdCLEdBc2lCdkM7SUFDTyw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExheW91dFdpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL2xheW91dFdpZGdldEJhc2VcIjtcclxuaW1wb3J0IHsgSVdpZGdldCB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy93aWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVGFiV2lkZ2V0RmxleFRhYiB9IGZyb20gXCIuL3ZpZXcvdGFiV2lkZ2V0RmxleFRhYlwiO1xyXG5pbXBvcnQgeyBJVGFiV2lkZ2V0VGFiIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy90YWJXaWRnZXRUYWJJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVRhYldpZGdldERhdGFNb2RlbCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvdG9wQmFyRGF0YU1vZGVsL2ludGVyZmFjZXMvdGFiV2lkZ2V0RGF0YU1vZGVsSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFRhYldpZGdldFdpZGdldFBvc2l0b25zfSBmcm9tIFwiLi9pbnRlcmZhY2VzL3RhYldpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUYWJXaWRnZXRGaXhlZFRhYiB9IGZyb20gXCIuL3ZpZXcvdGFiV2lkZ2V0Rml4ZWRUYWJcIjtcclxuaW1wb3J0IHsgVGFiV2lkZ2V0TGF5b3V0UHJvdmlkZXIgfSBmcm9tIFwiLi9sYXlvdXQvdGFiV2lkZ2V0TGF5b3V0UHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgVGFiV2lkZ2V0RmxleERyb3BEb3duIH0gZnJvbSBcIi4vdmlldy90YWJXaWRnZXRGbGV4RHJvcERvd25cIjtcclxuaW1wb3J0IHsgVGFiV2lkZ2V0U3R5bGVQcm92aWRlciB9IGZyb20gXCIuL3RhYldpZGdldFN0eWxlUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgVmlld1R5cGVQcm92aWRlciwgVmlld1R5cGV9IGZyb20gXCIuLi9jb21tb24vdmlld1R5cGVQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBVbmlxdWVJZEdlbmVyYXRvciB9IGZyb20gXCIuLi9jb21tb24vdW5pcXVlSWRHZW5lcmF0b3JcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgRGVmYXVsdENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4vZGVmYXVsdENvbXBvbmVudFNldHRpbmdzXCI7XHJcblxyXG5leHBvcnQgY29uc3QgdG9wQmFyQ2xhc3NOYW1lID0gXCJUb3BCYXJcIjtcclxuXHJcbmxldCB0YWJXaWRnZXRGbGV4VGFiQXJlYVdpZHRoID0gXCIxMDAlXCI7XHJcbmxldCB0YWJXaWRnZXRSaWdodFRhYkFyZWFXaWR0aCA9IFwiMHB4XCI7XHJcblxyXG5cclxuY2xhc3MgVGFiV2lkZ2V0IGV4dGVuZHMgTGF5b3V0V2lkZ2V0QmFzZSB7XHJcblxyXG4gICAgX3JpZ2h0VGFiQ29udGFpbmVySWQgPSBcInRhYldpZGdldFRhYkNvbnRhaW5lclJpZ2h0XCJcclxuICAgIF9mbGV4aWJsZVRhYkNvbnRhaW5lcklkID0gXCJ0YWJXaWRnZXRGbGV4aWJsZVRhYkNvbnRhaW5lclwiO1xyXG4gICAgX2xlZnRUYWJDb250YWluZXJJZCA9IFwidGFiV2lkZ2V0VGFiQ29udGFpbmVyTGVmdFwiXHJcblxyXG4gICAgX2ZsZXhEcm9wRG93bj86IFRhYldpZGdldEZsZXhEcm9wRG93bjtcclxuXHJcbiAgICBkYXRhTW9kZWwhOiBJVGFiV2lkZ2V0RGF0YU1vZGVsO1xyXG4gICBcclxuICAgIHByaXZhdGUgX3RhYlNlbGVjdGVkRnJvbURyb3BEb3duSGFuZGxlciA9IChzZW5kZXIsIGV2ZW50QXJncykgPT4geyB0aGlzLm9uVGFiQ2xpY2tlZChldmVudEFyZ3MpfTtcclxuICAgIHByaXZhdGUgX3RhYkJhckNsb3NlVGFiSGFuZGxlciA9IChzZW5kZXIsYXJncykgPT4ge3RoaXMuY2xvc2VUYWIoYXJncywgZmFsc2UpfTtcclxuICAgIHByaXZhdGUgX3RhYkJhckNsb3NlQWxsVGFic0hhbmRsZXIgPSAoc2VuZGVyLGFyZ3MpID0+IHt0aGlzLmNsb3NlQWxsVGFicyhhcmdzKX07XHJcbiAgICBwcml2YXRlIF90YWJCYXJDbG9zZUFsbFRhYnNCdXRBY3RpdmVIYW5kbGVyID0gKHNlbmRlcixhcmdzKSA9PiB7dGhpcy5jbG9zZUFsbFRhYnNCdXRBY3RpdmUoYXJncyl9O1xyXG4gICAgXHJcbiAgICBwcml2YXRlIF90YWJDbGlja2VkSGFuZGxlciA9IChzZW5kZXIsIGFyZ3MpID0+IHt0aGlzLm9uVGFiQ2xpY2tlZChhcmdzKX07XHJcbiAgICBwcml2YXRlIF90YWJXaGVlbENsaWNrZWRIYW5kbGVyID0gKHNlbmRlciwgYXJncykgPT4ge3RoaXMub25UYWJXaGVlbENsaWNrZWQoYXJncyl9O1xyXG4gICAgcHJpdmF0ZSBfYWN0aXZlVGFiSGlkZGVuSGFuZGxlciA9IChzZW5kZXIsYXJncykgPT4ge3RoaXMub25BY3RpdmVUYWJIaWRkZW4oc2VuZGVyLGFyZ3MpfTtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYXlvdXRDb250YWluZXJJZFxyXG4gICAgICogQG1lbWJlcm9mIFRhYldpZGdldFxyXG4gICAgICovXHJcbiAgICBpbml0aWFsaXplKGxheW91dENvbnRhaW5lcklkOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9hY3R1YWxXaWR0aD01MDA7XHJcbiAgICAgICAgdGhpcy5fYWN0dWFsSGVpZ2h0PTUwMDtcclxuXHJcbiAgICAgICAgdGhpcy5fZmxleERyb3BEb3duID0gbmV3IFRhYldpZGdldEZsZXhEcm9wRG93bigpO1xyXG4gICAgICAgIHRoaXMuYXR0YWNoRmxleERyb3BEb3duRXZlbnRzKCk7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0VW5pcXVlVGFiQ29udGFpbmVySWRzKGxheW91dENvbnRhaW5lcklkKTtcclxuICAgICAgICBsZXQgZHJvcERvd25TdHlsZSA9IFRhYldpZGdldFN0eWxlUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXRMYXlvdXRTdHlsZUZvclRhYkJhckRyb3BEb3duKGxheW91dENvbnRhaW5lcklkKTtcclxuICAgICAgICAkKFwiI1wiK2xheW91dENvbnRhaW5lcklkKS5hcHBlbmQoZHJvcERvd25TdHlsZSk7XHJcblxyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRpYWxpemVDb21wb25lbnQoKXtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5kZWZhdWx0U2V0dGluZ3NEYXRhSWQgPSBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuV2lkZ2V0RGVmaW5pdGlvbklkO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmRpc2FibGVQZXJzaXN0aW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZWQoKXtcclxuICAgICAgICBzdXBlci5pbml0aWFsaXplZCgpO1xyXG5cclxuICAgICAgICB0aGlzLmRhdGFNb2RlbCA9IHRoaXMuY29tcG9uZW50LmdldFN1YkNvbXBvbmVudChEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuVGFiV2lkZ2V0RGF0YU1vZGVsKSBhcyBJVGFiV2lkZ2V0RGF0YU1vZGVsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBjb21wb25lbnQgc2V0dGluZ3MgZm9yIHRoaXMgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyhDb21wb25lbnRTZXR0aW5nc3x1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIFRhYldpZGdldFxyXG4gICAgICovXHJcbiAgICBnZXREZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MoKTogQ29tcG9uZW50U2V0dGluZ3N8dW5kZWZpbmVke1xyXG4gICAgICAgIHJldHVybiBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuZ2V0VGFiV2lkZ2V0RGVmaW5pdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3Bvc2UoKXtcclxuICAgICAgICAvLyBEaXNwb3NlIHdpZGdldHNcclxuICAgICAgICB0aGlzLl93aWRnZXRzLmZvckVhY2goKHdpZGdldCkgPT4ge1xyXG4gICAgICAgICAgICBpZih3aWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHdpZGdldC5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5kYXRhTW9kZWwuZGlzcG9zZSgpO1xyXG4gICAgICAgIHRoaXMuZGV0YWNoRmxleERyb3BEb3duRXZlbnRzKCk7XHJcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEF0dGFjaGVzIHRoZSBmbGV4RHJvcERvd24gZXZlbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUYWJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhdHRhY2hGbGV4RHJvcERvd25FdmVudHMoKXtcclxuICAgICAgICBpZih0aGlzLl9mbGV4RHJvcERvd24gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fZmxleERyb3BEb3duLmV2ZW50VGFiU2VsZWN0ZWRGcm9tRHJvcGRvd24uYXR0YWNoKHRoaXMuX3RhYlNlbGVjdGVkRnJvbURyb3BEb3duSGFuZGxlcik7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZsZXhEcm9wRG93bi5ldmVudFRhYkJhckNsb3NlVGFiLmF0dGFjaCh0aGlzLl90YWJCYXJDbG9zZVRhYkhhbmRsZXIpO1xyXG4gICAgICAgICAgICB0aGlzLl9mbGV4RHJvcERvd24uZXZlbnRUYWJCYXJDbG9zZUFsbFRhYnMuYXR0YWNoKHRoaXMuX3RhYkJhckNsb3NlQWxsVGFic0hhbmRsZXIpO1xyXG4gICAgICAgICAgICB0aGlzLl9mbGV4RHJvcERvd24uZXZlbnRUYWJCYXJDbG9zZUFsbFRhYnNCdXRBY3RpdmUuYXR0YWNoKHRoaXMuX3RhYkJhckNsb3NlQWxsVGFic0J1dEFjdGl2ZUhhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERldGFjaGVzIHRoZSBmbGV4RHJvcERvd24gZXZlbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUYWJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkZXRhY2hGbGV4RHJvcERvd25FdmVudHMoKXtcclxuICAgICAgICBpZih0aGlzLl9mbGV4RHJvcERvd24gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fZmxleERyb3BEb3duLmV2ZW50VGFiU2VsZWN0ZWRGcm9tRHJvcGRvd24uZGV0YWNoKHRoaXMuX3RhYlNlbGVjdGVkRnJvbURyb3BEb3duSGFuZGxlcik7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZsZXhEcm9wRG93bi5ldmVudFRhYkJhckNsb3NlVGFiLmRldGFjaCh0aGlzLl90YWJCYXJDbG9zZVRhYkhhbmRsZXIpO1xyXG4gICAgICAgICAgICB0aGlzLl9mbGV4RHJvcERvd24uZXZlbnRUYWJCYXJDbG9zZUFsbFRhYnMuZGV0YWNoKHRoaXMuX3RhYkJhckNsb3NlQWxsVGFic0hhbmRsZXIpO1xyXG4gICAgICAgICAgICB0aGlzLl9mbGV4RHJvcERvd24uZXZlbnRUYWJCYXJDbG9zZUFsbFRhYnNCdXRBY3RpdmUuZGV0YWNoKHRoaXMuX3RhYkJhckNsb3NlQWxsVGFic0J1dEFjdGl2ZUhhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYXlvdXRDb250YWluZXJJZFxyXG4gICAgICogQG1lbWJlcm9mIFRhYldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldFVuaXF1ZVRhYkNvbnRhaW5lcklkcyhsYXlvdXRDb250YWluZXJJZDogc3RyaW5nKXtcclxuICAgICAgICB0aGlzLl9yaWdodFRhYkNvbnRhaW5lcklkID0gbGF5b3V0Q29udGFpbmVySWQgKyBcIl90YWJXaWRnZXRUYWJDb250YWluZXJSaWdodFwiXHJcbiAgICAgICAgdGhpcy5fZmxleGlibGVUYWJDb250YWluZXJJZCA9IGxheW91dENvbnRhaW5lcklkICsgXCJfdGFiV2lkZ2V0RmxleGlibGVUYWJDb250YWluZXJcIjtcclxuICAgICAgICB0aGlzLl9sZWZ0VGFiQ29udGFpbmVySWQgPSBsYXlvdXRDb250YWluZXJJZCArIFwiX3RhYldpZGdldFRhYkNvbnRhaW5lckxlZnRcIlxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIGxheW91dCBvZiB0aGUgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRhYldpZGdldFxyXG4gICAgICovXHJcbiAgICBjcmVhdGVMYXlvdXQoKSB7XHJcblxyXG4gICAgICAgIGxldCB0YWJMYXlvdXQ6IHN0cmluZyA9IFRhYldpZGdldExheW91dFByb3ZpZGVyLmdldEluc3RhbmNlKCkuZ2V0VGFiQmFyTGF5b3V0KHRoaXMucGFyZW50Q29udGVudElkLCB0aGlzLl9sZWZ0VGFiQ29udGFpbmVySWQsdGhpcy5fZmxleGlibGVUYWJDb250YWluZXJJZCx0aGlzLl9yaWdodFRhYkNvbnRhaW5lcklkKTtcclxuICAgICAgICAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKS5hcHBlbmQodGFiTGF5b3V0KTtcclxuICAgICAgICAvLyQoXCIuXCIrbWFpbk5hdmlnYXRpb25DbGFzc05hbWUpLnBhcmVudCgpLmFwcGVuZCgkKGA8ZGl2IGlkPVwiYCsgdGhpcy5fcmlnaHRUYWJDb250YWluZXJJZCArYFwiIGNsYXNzPVwidG9wQmFyVGFiQ29udGFpbmVyUmlnaHRcIj48L2Rpdj5gKSlcclxuICAgICAgICB0aGlzLl9mbGV4RHJvcERvd24hLmFkZEZsZXhUYWJEcm9wZG93bih0aGlzLnBhcmVudENvbnRlbnRJZCwgdGhpcy5fZmxleGlibGVUYWJDb250YWluZXJJZCk7XHJcbiAgICAgICAgdGhpcy5hZGFwdFdpZHRoT2ZGbGV4VGFiQmFyKCk7XHJcbiAgICB9ICAgIFxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIExvYWRzIHRoZSBzdHlsZXMgZm9yIHRoZSB0YWIgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRhYldpZGdldFxyXG4gICAgICovXHJcbiAgICBsb2FkU3R5bGVzKCl7XHJcbiAgICAgICAgc3VwZXIuYWRkU3R5bGUoXCJ3aWRnZXRzL3RhYldpZGdldC9zdHlsZS9jc3MvdGFiV2lkZ2V0U3R5bGUuY3NzXCIpO1xyXG4gICAgfVxyXG4gICAgICAgXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRhYldpZGdldFxyXG4gICAgICovXHJcbiAgICBhY3RpdmF0ZSgpe1xyXG4gICAgICAgIGlmKHRoaXMuZGF0YU1vZGVsLmdldEZsZXhUYWJzKCkubGVuZ3RoID09IDApe1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdE92ZXJ2aWV3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB3aWRnZXQgPSB0aGlzLmRhdGFNb2RlbC5nZXRBY3RpdmVUYWIoKS53aWRnZXQ7XHJcbiAgICAgICAgaWYod2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHdpZGdldC5hY3RpdmF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkZWFjdGl2YXRlKCl7XHJcbiAgICAgICAgbGV0IHRhYnMgPSB0aGlzLmRhdGFNb2RlbC5nZXRBbGxUYWJzKCk7XHJcbiAgICAgICAgZm9yKGxldCBlbGVtZW50IG9mIHRhYnMpe1xyXG4gICAgICAgICAgICBpZihlbGVtZW50LndpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC53aWRnZXQhLmRlYWN0aXZhdGUoKTtcclxuICAgICAgICAgICAgfSAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lXaWRnZXR9IHdpZGdldFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRhYk5hbWVcclxuICAgICAqIEBwYXJhbSB7Vmlld1R5cGV9IHZpZXdUeXBlXHJcbiAgICAgKiBAcGFyYW0geyp9IGRhdGFcclxuICAgICAqIEBtZW1iZXJvZiBUYWJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgYWRkV2lkZ2V0KHdpZGdldDogSVdpZGdldCwgdGFiTmFtZTogc3RyaW5nLCB2aWV3VHlwZTogVmlld1R5cGUsIGRhdGEgOiBhbnkpe1xyXG4gICAgICAgIHN1cGVyLmFkZFdpZGdldCh3aWRnZXQsIHRhYk5hbWUsIHZpZXdUeXBlKTtcclxuICAgICAgICBsZXQgdGFiSWQgPSB0YWJOYW1lICsgXCJfXCIgKyB2aWV3VHlwZS50b1N0cmluZygpO1xyXG4gICAgICAgIHRhYklkID0gVW5pcXVlSWRHZW5lcmF0b3IuZ2V0SW5zdGFuY2UoKS5nZXRVbmlxdWVJZEZyb21TdHJpbmcodGFiSWQpXHJcbiAgICAgICAgdGFiSWQgPSB0YWJJZC5yZXBsYWNlKC9bJlxcL1xcXFwjLCsoKSR+JS4nXCI6Kj88Pnt9XS9nLCdfJyk7XHJcblxyXG4gICAgICAgIGxldCBpY29uUGF0aCA9IFZpZXdUeXBlUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXRJY29uQnlWaWV3VHlwZSh2aWV3VHlwZSk7XHJcbiAgICAgICAgbGV0IG5ld1RhYiA9IHRoaXMuYWRkTmV3VGFiKGRhdGEud2lkZ2V0UG9zaXRpb24sIGljb25QYXRoLCB0YWJJZCwgdGFiTmFtZSk7XHJcbiAgICAgICAgaWYobmV3VGFiKXtcclxuICAgICAgICAgICAgbmV3VGFiLmFkZFdpZGdldCh3aWRnZXQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gd2lkZ2V0UG9zaXRpb25cclxuICAgICAqIEBwYXJhbSB7Kn0gaWNvblBhdGhcclxuICAgICAqIEBwYXJhbSB7Kn0gdGFiSWRcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgVGFiV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkTmV3VGFiKHdpZGdldFBvc2l0aW9uLCBpY29uUGF0aCwgdGFiSWQsIGRpc3BsYXlOYW1lKXtcclxuICAgICAgICBsZXQgbmV3VGFiOiBJVGFiV2lkZ2V0VGFiIHwgdW5kZWZpbmVkO1xyXG4gICAgICAgIHN3aXRjaCAod2lkZ2V0UG9zaXRpb24pe1xyXG4gICAgICAgICAgICAgICAgY2FzZSBUYWJXaWRnZXRXaWRnZXRQb3NpdG9ucy5mbGV4IDpcclxuICAgICAgICAgICAgICAgICAgICBuZXdUYWIgPSB0aGlzLmFkZEZsZXhpYmxlVGFiKHRhYklkLCBpY29uUGF0aCwgZGlzcGxheU5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBUYWJXaWRnZXRXaWRnZXRQb3NpdG9ucy5yaWdodDpcclxuICAgICAgICAgICAgICAgICAgICBuZXdUYWIgPSB0aGlzLmFkZEZpeGVkVGFiKHRhYklkLGljb25QYXRoLHRoaXMuX3JpZ2h0VGFiQ29udGFpbmVySWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGNhc2UgVGFiV2lkZ2V0V2lkZ2V0UG9zaXRvbnMubGVmdDpcclxuICAgICAgICAgICAgICAgICAgICBuZXdUYWIgPSB0aGlzLmFkZEZpeGVkVGFiKHRhYklkLGljb25QYXRoLHRoaXMuX2xlZnRUYWJDb250YWluZXJJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnRzRm9yVGFiKG5ld1RhYik7XHJcbiAgICAgICAgdGhpcy5kYXRhTW9kZWwuYWRkVGFiKG5ld1RhYiEpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBuZXdUYWI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0lUYWJXaWRnZXRUYWJ9IHRhYlxyXG4gICAgICogQG1lbWJlcm9mIFRhYldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlZ2lzdGVyRXZlbnRzRm9yVGFiKHRhYjogSVRhYldpZGdldFRhYnx1bmRlZmluZWQpe1xyXG4gICAgICAgIGlmKHRhYiAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0YWIuZXZlbnRUYWJXaWRnZXRUYWJDbGlja2VkLmF0dGFjaCh0aGlzLl90YWJDbGlja2VkSGFuZGxlcik7XHJcbiAgICAgICAgICAgIHRhYi5ldmVudFRhYldpZGdldFRhYldoZWVsQ2xpY2tlZC5hdHRhY2godGhpcy5fdGFiV2hlZWxDbGlja2VkSGFuZGxlcik7XHJcbiAgICAgICAgICAgIHRhYi5ldmVudFRhYldpZGdldEFjdGl2ZUhpZGRlbi5hdHRhY2godGhpcy5fYWN0aXZlVGFiSGlkZGVuSGFuZGxlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdW5yZWdpc3RlckV2ZW50c0ZvclRhYih0YWI6IElUYWJXaWRnZXRUYWJ8dW5kZWZpbmVkKXtcclxuICAgICAgICBpZih0YWIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGFiLmV2ZW50VGFiV2lkZ2V0VGFiQ2xpY2tlZC5kZXRhY2godGhpcy5fdGFiQ2xpY2tlZEhhbmRsZXIpO1xyXG4gICAgICAgICAgICB0YWIuZXZlbnRUYWJXaWRnZXRUYWJXaGVlbENsaWNrZWQuZGV0YWNoKHRoaXMuX3RhYldoZWVsQ2xpY2tlZEhhbmRsZXIpO1xyXG4gICAgICAgICAgICB0YWIuZXZlbnRUYWJXaWRnZXRBY3RpdmVIaWRkZW4uZGV0YWNoKHRoaXMuX2FjdGl2ZVRhYkhpZGRlbkhhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gdGFiSURcclxuICAgICAqIEBwYXJhbSB7Kn0gaWNvblBhdGhcclxuICAgICAqIEByZXR1cm5zIHtJVGFiV2lkZ2V0VGFifVxyXG4gICAgICogQG1lbWJlcm9mIFRhYldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZEZsZXhpYmxlVGFiKHRhYklELGljb25QYXRoLCBkaXNwbGF5TmFtZSkgOiBJVGFiV2lkZ2V0VGFie1xyXG4gICAgICAgIGxldCBuZXdUYWI6IElUYWJXaWRnZXRUYWIgPSBuZXcgVGFiV2lkZ2V0RmxleFRhYigpO1xyXG4gICAgICAgIG5ld1RhYi5hcHBlbmRUYWJMYXlvdXQodGhpcy5wYXJlbnRDb250ZW50SWQsIHRoaXMuX2ZsZXhpYmxlVGFiQ29udGFpbmVySWQrXCJfZmxleEJveFwiLCB0YWJJRCwgZGlzcGxheU5hbWUpO1xyXG4gICAgICAgIG5ld1RhYi5zZXRJY29uKGljb25QYXRoKTtcclxuXHJcbiAgICAgICAgdGhpcy5fZmxleERyb3BEb3duIS5hZGRJdGVtVG9Ecm9wZG93bihkaXNwbGF5TmFtZSwgbmV3VGFiLnRhYkNvbnRhaW5lcklkLCB0aGlzLnBhcmVudENvbnRlbnRJZCwgaWNvblBhdGgpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgIHJldHVybiBuZXdUYWI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHRhYk5hbWVcclxuICAgICAqIEBwYXJhbSB7Kn0gaWNvblBhdGhcclxuICAgICAqIEBwYXJhbSB7Kn0gd2lkZ2V0UG9zaXRpb25cclxuICAgICAqIEByZXR1cm5zIHtJVGFiV2lkZ2V0VGFifVxyXG4gICAgICogQG1lbWJlcm9mIFRhYldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZEZpeGVkVGFiKHRhYk5hbWUsaWNvblBhdGgsIHdpZGdldFBvc2l0aW9uKSA6IElUYWJXaWRnZXRUYWJ7XHJcbiAgICAgICAgbGV0IG5ld1RhYjogSVRhYldpZGdldFRhYiA9IG5ldyBUYWJXaWRnZXRGaXhlZFRhYigpO1xyXG4gICAgICAgIG5ld1RhYi5hcHBlbmRUYWJMYXlvdXQodGhpcy5wYXJlbnRDb250ZW50SWQsIHdpZGdldFBvc2l0aW9uLCB0YWJOYW1lLCBcIlwiKTtcclxuICAgICAgICBuZXdUYWIuc2V0SWNvbihpY29uUGF0aCk7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXdUYWI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVGFiV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRhcHRXaWR0aE9mRmxleFRhYkJhcigpe1xyXG4gICAgICAgIHRhYldpZGdldEZsZXhUYWJBcmVhV2lkdGggPSBcImNhbGMoIDEwMCUgLSA1NHB4IClcIjtcclxuICAgICAgICB0YWJXaWRnZXRSaWdodFRhYkFyZWFXaWR0aCA9IFwiY2FsYyggMHB4ICsgNTFweCApXCI7XHJcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IS5zdHlsZS5zZXRQcm9wZXJ0eSgnLS10YWJXaWRnZXRGbGV4VGFiQXJlYVdpZHRoJywgdGFiV2lkZ2V0RmxleFRhYkFyZWFXaWR0aCk7XHJcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IS5zdHlsZS5zZXRQcm9wZXJ0eSgnLS10YWJXaWRnZXRSaWdodFRhYkFyZWFXaWR0aCcsIHRhYldpZGdldFJpZ2h0VGFiQXJlYVdpZHRoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SVRhYldpZGdldFRhYn0gc2VuZGVyXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZXZlbnRBcmdzXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBUYWJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbkFjdGl2ZVRhYkhpZGRlbihzZW5kZXI6IElUYWJXaWRnZXRUYWIsIGV2ZW50QXJnczogb2JqZWN0KTogYW55IHtcclxuICAgICAgICBpZihldmVudEFyZ3NbXCJldmVudFRyaWdnZXJcIl0gPT0gXCJyZXNpemVcIil7XHJcbiAgICAgICAgICAgIGxldCBuZXdJbmRleCA9IHRoaXMuZGF0YU1vZGVsLmdldEZsZXhUYWJJbmRleChzZW5kZXIpLTE7XHJcbiAgICAgICAgICAgIGlmKG5ld0luZGV4ID49IDApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhTW9kZWwuc2V0RmxleFRhYlBvc2l0aW9uKG5ld0luZGV4LCBzZW5kZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YU1vZGVsLnNldEZsZXhUYWJQb3NpdGlvbigwLHNlbmRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgVGFiV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25UYWJDbGlja2VkKGFyZ3Mpe1xyXG4gICAgICAgIHRoaXMuc2VsZWN0VGFiKGFyZ3MudGFiTmFtZSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIFRhYldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uVGFiV2hlZWxDbGlja2VkKGFyZ3Mpe1xyXG4gICAgICAgIHRoaXMuY2xvc2VUYWIoYXJncywgdHJ1ZSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSB0YWJOYW1lXHJcbiAgICAgKiBAcmV0dXJucyB7SVRhYldpZGdldFRhYn1cclxuICAgICAqIEBtZW1iZXJvZiBUYWJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgc2VsZWN0VGFiKHRhYk5hbWUpIDogSVRhYldpZGdldFRhYnx1bmRlZmluZWR7XHJcbiAgICAgICAgbGV0IHRhYklkID0gXCJ0YWJfXCIrdGFiTmFtZTtcclxuICAgICAgICBsZXQgc2VsZWN0ZWRUYWIgPSB0aGlzLmRhdGFNb2RlbC5nZXRUYWJCeUlkKHRhYklkKTtcclxuICAgICAgICBpZiAoc2VsZWN0ZWRUYWIgIT0gdW5kZWZpbmVkICYmICFzZWxlY3RlZFRhYi5pc0FjdGl2ZSl7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZsZXhEcm9wRG93biEuc2V0VGFiU2VsZWN0ZWQodGFiSWQpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFRhYkFjdGl2ZShzZWxlY3RlZFRhYik7XHJcbiAgICAgICAgICAgIHRoaXMucmVzaXplVGFiKHNlbGVjdGVkVGFiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihzZWxlY3RlZFRhYiA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwic2VsZWN0ZWQgVGFiIGlzIG5vdCBkZWZpbmVkXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZWxlY3RlZFRhYjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SVRhYldpZGdldFRhYn0gc2VsZWN0ZWRUYWJcclxuICAgICAqIEBtZW1iZXJvZiBUYWJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRUYWJBY3RpdmUoc2VsZWN0ZWRUYWI6IElUYWJXaWRnZXRUYWIpe1xyXG4gICAgICAgIHRoaXMuc2V0QWxsVGFic0luYWN0aXZlKCk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuZGF0YU1vZGVsLmdldEFjdGl2ZVRhYigpLndpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFNb2RlbC5nZXRBY3RpdmVUYWIoKS53aWRnZXQhLmRlYWN0aXZhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VsZWN0ZWRUYWIuc2V0QWN0aXZlKCk7XHJcbiAgICAgICAgaWYoc2VsZWN0ZWRUYWIud2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBzZWxlY3RlZFRhYi53aWRnZXQuYWN0aXZhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5kYXRhTW9kZWwuc2V0QWN0aXZlVGFiKHNlbGVjdGVkVGFiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SVRhYldpZGdldFRhYn0gc2VsZWN0ZWRUYWJcclxuICAgICAqIEBtZW1iZXJvZiBUYWJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZXNpemVUYWIoc2VsZWN0ZWRUYWI6IElUYWJXaWRnZXRUYWIpe1xyXG4gICAgICAgIGlmKHNlbGVjdGVkVGFiLndpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBzZWxlY3RlZFRhYi53aWRnZXQhLnJlc2l6ZSh0aGlzLl9hY3R1YWxXaWR0aCwgdGhpcy5fYWN0dWFsSGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVGFiV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHNldEFsbFRhYnNJbmFjdGl2ZSgpe1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmRhdGFNb2RlbC5nZXRBbGxUYWJzKCkubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YU1vZGVsLmdldEFsbFRhYnMoKVtpXS5zZXREaXNwbGF5Tm9uZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFNb2RlbC5nZXRBbGxUYWJzKClbaV0ucmVtb3ZlU3R5bGVDbGFzc0FjdGl2ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkFic29sdXRlVGFiU2VsZWN0ZWQoKXtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5kYXRhTW9kZWwuZ2V0QWxsVGFicygpLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFNb2RlbC5nZXRBbGxUYWJzKClbaV0ucmVtb3ZlU3R5bGVDbGFzc0FjdGl2ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHJpZ2h0SGFuZFNpZGVCYXJCdXR0b25zID0gJChcIi5yaWdodEhhbmRTaWRlQmFyQnV0dG9uXCIpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCByaWdodEhhbmRTaWRlQmFyQnV0dG9ucy5sZW5ndGggOyBpKyspe1xyXG4gICAgICAgICAgICByaWdodEhhbmRTaWRlQmFyQnV0dG9uc1tpXS5jbGFzc05hbWUgPSByaWdodEhhbmRTaWRlQmFyQnV0dG9uc1tpXS5jbGFzc05hbWUucmVwbGFjZShcIiBhY3RpdmVcIiwgXCJcIik7XHJcbiAgICAgICAgICAgIHJpZ2h0SGFuZFNpZGVCYXJCdXR0b25zW2ldLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbWcnKVswXS5zcmMgPSByaWdodEhhbmRTaWRlQmFyQnV0dG9uc1tpXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW1nJylbMF0uc3JjLnJlcGxhY2UoJ19hY3RpdmUuc3ZnJywgJy5zdmcnKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYWJzb2x1dGVUYWJzID0gJChcIi5hYnNvbHV0ZVRhYlwiKTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcmlnaHRIYW5kU2lkZUJhckJ1dHRvbnMubGVuZ3RoIDsgaSsrKXtcclxuICAgICAgICAgICAgYWJzb2x1dGVUYWJzW2ldLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gd2lkdGhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcclxuICAgICAqIEBtZW1iZXJvZiBUYWJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcmVzaXplKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKXtcclxuXHJcbiAgICAgICAgdGhpcy5fYWN0dWFsV2lkdGggPSB3aWR0aDtcclxuICAgICAgICB0aGlzLl9hY3R1YWxIZWlnaHQgPSBoZWlnaHQ7XHJcblxyXG4gICAgICAgIC8vIFNldCBzaXplIG9mIHRhYiBjb250cm9sIGl0c2VsZlxyXG4gICAgICAgICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpWzBdLnN0eWxlLndpZHRoID0gd2lkdGggKyBcInB4XCI7XHJcbiAgICAgICAgJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZClbMF0uc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ICsgXCJweFwiO1xyXG4gICAgXHJcblxyXG4gICAgICAgIHRoaXMuZGF0YU1vZGVsLmdldEFjdGl2ZVRhYigpLmlzVmlzaWJsZShcInJlc2l6ZVwiKVxyXG4gICAgICAgIGlmKHRoaXMuZGF0YU1vZGVsLmdldEFjdGl2ZVRhYigpLndpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFNb2RlbC5nZXRBY3RpdmVUYWIoKS53aWRnZXQhLnJlc2l6ZSh3aWR0aCxoZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRhYldpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2VsZWN0T3ZlcnZpZXcoKXtcclxuICAgICAgICBsZXQgZml4ZWRUYWJzID0gdGhpcy5kYXRhTW9kZWwuZGF0YS5maXhlZFRhYnM7XHJcbiAgICAgICAgbGV0IG92ZXJ2aWV3SWQgPSBmaXhlZFRhYnNbZml4ZWRUYWJzLmxlbmd0aC0xXS50YWJDb250YWluZXJJZDtcclxuICAgICAgICBvdmVydmlld0lkID0gb3ZlcnZpZXdJZC5yZXBsYWNlKFwidGFiX1wiLFwiXCIpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0VGFiKG92ZXJ2aWV3SWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtJVGFiV2lkZ2V0VGFifSB0YWJUb1JlbW92ZVxyXG4gICAgICogQHBhcmFtIHsqfSBtb3VzZVdoZWVsQ2xpY2tlZFxyXG4gICAgICogQG1lbWJlcm9mIFRhYldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlbW92ZVRhYih0YWJUb1JlbW92ZTogSVRhYldpZGdldFRhYiwgbW91c2VXaGVlbENsaWNrZWQpe1xyXG4gICAgICAgIGlmKHRhYlRvUmVtb3ZlID09IHRoaXMuZGF0YU1vZGVsLmdldEFjdGl2ZVRhYigpKXtcclxuICAgICAgICAgICAgbGV0IGZsZXhUYWJJbmRleCA9IHRoaXMuZGF0YU1vZGVsLmdldEZsZXhUYWJJbmRleCh0YWJUb1JlbW92ZSk7XHJcbiAgICAgICAgICAgIGlmKCh0aGlzLmRhdGFNb2RlbC5nZXRGbGV4VGFicygpW2ZsZXhUYWJJbmRleCAtIDFdKSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RUYWIodGhpcy5kYXRhTW9kZWwuZ2V0RmxleFRhYnMoKVtmbGV4VGFiSW5kZXggLSAxXS50YWJOYW1lKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYoKHRoaXMuZGF0YU1vZGVsLmdldEZsZXhUYWJzKClbZmxleFRhYkluZGV4ICsgMV0pICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdFRhYih0aGlzLmRhdGFNb2RlbC5nZXRGbGV4VGFicygpW2ZsZXhUYWJJbmRleCArIDFdLnRhYk5hbWUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0T3ZlcnZpZXcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmRhdGFNb2RlbC5kYXRhLmZsZXhUYWJzLmluZGV4T2YodGFiVG9SZW1vdmUsIDApO1xyXG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YU1vZGVsLmRhdGEuZmxleFRhYnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fZmxleERyb3BEb3duIS5yZW1vdmVJdGVtRnJvbURyb3Bkb3duKHRhYlRvUmVtb3ZlLnRhYkNvbnRhaW5lcklkISwgbW91c2VXaGVlbENsaWNrZWQpO1xyXG5cclxuICAgICAgICBsZXQgdGFiQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFiVG9SZW1vdmUudGFiQ29udGFpbmVySWQhKTtcclxuICAgICAgICBsZXQgdGFiQ29udGFpbmVydGFiID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFiVG9SZW1vdmUudGFiQ29udGFpbmVySWQrXCJfdGFiXCIpO1xyXG5cclxuICAgICAgICB0YWJDb250YWluZXJ0YWIhLnBhcmVudE5vZGUhLnJlbW92ZUNoaWxkKHRhYkNvbnRhaW5lcnRhYiEpO1xyXG4gICAgICAgIHRhYkNvbnRhaW5lciEucGFyZW50Tm9kZSEucmVtb3ZlQ2hpbGQodGFiQ29udGFpbmVyISk7XHJcbiAgICAgICAgdGhpcy51bnJlZ2lzdGVyRXZlbnRzRm9yVGFiKHRhYlRvUmVtb3ZlKTtcclxuICAgICAgICBzdXBlci5yZW1vdmVXaWRnZXQodGFiVG9SZW1vdmUud2lkZ2V0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQHBhcmFtIHsqfSBtb3VzZVdoZWVsQ2xpY2tlZFxyXG4gICAgICogQG1lbWJlcm9mIFRhYldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNsb3NlVGFiKGFyZ3MsIG1vdXNlV2hlZWxDbGlja2VkKXtcclxuICAgICAgICBsZXQgdGFiVG9DbG9zZSA9IHRoaXMuZGF0YU1vZGVsLmdldFRhYkJ5SWQoYXJncy50YWJOYW1lKTsgICBcclxuICAgICAgICBpZih0YWJUb0Nsb3NlICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vdGFiVG9DbG9zZS53aWRnZXQuc2F2ZUNvbXBvbmVudFNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgIGlmKHRhYlRvQ2xvc2Uud2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICB0YWJUb0Nsb3NlLndpZGdldC5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVUYWIodGFiVG9DbG9zZSwgbW91c2VXaGVlbENsaWNrZWQpO1xyXG4gICAgICAgIH0gICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIFRhYldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNsb3NlQWxsVGFicyhhcmdzKXtcclxuICAgICAgICBsZXQgdGFic1RvQ2xvc2UgPSBuZXcgQXJyYXkoKTtcclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuZGF0YU1vZGVsLmdldEZsZXhUYWJzKCkubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICB0YWJzVG9DbG9zZS5wdXNoKHRoaXMuZGF0YU1vZGVsLmdldEZsZXhUYWJzKClbaV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRhYnNUb0Nsb3NlLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgdGFic1RvQ2xvc2VbaV0ud2lkZ2V0LmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVUYWIodGFic1RvQ2xvc2VbaV0sIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBUYWJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjbG9zZUFsbFRhYnNCdXRBY3RpdmUoYXJncyl7XHJcbiAgICAgICAgbGV0IHRhYnNUb0Nsb3NlID0gbmV3IEFycmF5KCk7XHJcblxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmRhdGFNb2RlbC5nZXRGbGV4VGFicygpLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYodGhpcy5kYXRhTW9kZWwuZ2V0RmxleFRhYnMoKVtpXSAhPSB0aGlzLmRhdGFNb2RlbC5nZXRBY3RpdmVUYWIoKSl7XHJcbiAgICAgICAgICAgICAgICB0YWJzVG9DbG9zZS5wdXNoKHRoaXMuZGF0YU1vZGVsLmdldEZsZXhUYWJzKClbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0YWJzVG9DbG9zZS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIHRhYnNUb0Nsb3NlW2ldLndpZGdldC5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlVGFiKHRhYnNUb0Nsb3NlW2ldLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCB7VGFiV2lkZ2V0fTsiXX0=