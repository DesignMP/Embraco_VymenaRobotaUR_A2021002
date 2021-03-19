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
define(["require", "exports", "../layout/tabWidgetLayoutProvider", "../tabWidgetStyleProvider", "../../../framework/events"], function (require, exports, tabWidgetLayoutProvider_1, tabWidgetStyleProvider_1, events_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventTabSelectedFromDropdown = /** @class */ (function (_super) {
        __extends(EventTabSelectedFromDropdown, _super);
        function EventTabSelectedFromDropdown() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventTabSelectedFromDropdown;
    }(events_1.TypedEvent));
    ;
    var EventTabBarCloseTab = /** @class */ (function (_super) {
        __extends(EventTabBarCloseTab, _super);
        function EventTabBarCloseTab() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventTabBarCloseTab;
    }(events_1.TypedEvent));
    ;
    var EventTabBarCloseAllTabs = /** @class */ (function (_super) {
        __extends(EventTabBarCloseAllTabs, _super);
        function EventTabBarCloseAllTabs() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventTabBarCloseAllTabs;
    }(events_1.TypedEvent));
    ;
    var EventTabBarCloseAllTabsButActive = /** @class */ (function (_super) {
        __extends(EventTabBarCloseAllTabsButActive, _super);
        function EventTabBarCloseAllTabsButActive() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventTabBarCloseAllTabsButActive;
    }(events_1.TypedEvent));
    ;
    var TabWidgetFlexDropDown = /** @class */ (function () {
        function TabWidgetFlexDropDown() {
            this.eventTabSelectedFromDropdown = new EventTabSelectedFromDropdown();
            this.eventTabBarCloseTab = new EventTabBarCloseTab();
            this.eventTabBarCloseAllTabs = new EventTabBarCloseAllTabs();
            this.eventTabBarCloseAllTabsButActive = new EventTabBarCloseAllTabsButActive();
            this._closeTabButtonPressedFlag = false;
        }
        TabWidgetFlexDropDown.prototype.addFlexTabDropdown = function (layoutContainerId, flexibleTabContainerId) {
            var _this = this;
            this._dropDownContainerId = layoutContainerId + "_dropdown";
            this.appendDropDownLayout(flexibleTabContainerId, layoutContainerId);
            var dropDownData = [];
            $("#" + this._dropDownContainerId).ejDropDownList({
                targetID: layoutContainerId + "_dropdownList",
                width: "48px",
                height: "50px",
                fields: { id: "id", text: "text", name: "name" },
                dataSource: dropDownData,
                template: tabWidgetLayoutProvider_1.TabWidgetLayoutProvider.getInstance().getTabOverviewDropdownTemplate(layoutContainerId),
                minPopupWidth: "280px",
                popupHeight: "250px",
                change: function (args) { return _this.onDropdownChanged(args); },
                popupShown: function (args) { return _this.onDropdownPopup(args); },
            });
            this.addItemToDropdown("footer", "footerId", layoutContainerId);
            this.setDropdownLayout(layoutContainerId);
            this.hideDropDownMenuButton();
            this._layoutContainerId = layoutContainerId;
        };
        TabWidgetFlexDropDown.prototype.onDropdownChanged = function (args) {
            args.cancel = true;
            if (this._closeTabButtonPressedFlag != true) {
                var dataSource = args.model.dataSource;
                this.setTabSelected(dataSource[args.itemId].id);
                var tabId = dataSource[args.itemId].id;
                tabId = tabId.replace("tab_", "");
                this.eventTabSelectedFromDropdown.raise(this, { tabName: tabId });
                var dropdown = $("#" + this._layoutContainerId + "_dropdown").data("ejDropDownList");
                dropdown.option("dataSource", dataSource, true);
                this.resetDropdown();
            }
            this._closeTabButtonPressedFlag = false;
        };
        TabWidgetFlexDropDown.prototype.onDropdownPopup = function (args) {
            $("head").append('<style type="text/css"></style>');
            var newStyleElement = $("head").children(':last');
        };
        TabWidgetFlexDropDown.prototype.appendDropDownLayout = function (flexibleTabContainerId, layoutContainerId) {
            var html = tabWidgetLayoutProvider_1.TabWidgetLayoutProvider.getInstance().getFlexTabDropdownLayout(layoutContainerId);
            $("#" + flexibleTabContainerId).append(html);
        };
        TabWidgetFlexDropDown.prototype.setDropdownLayout = function (layoutContainerId) {
            tabWidgetStyleProvider_1.TabWidgetStyleProvider.getInstance().setFlexTabSelectionDropdownPopupStyle(layoutContainerId);
            var dropdownStyle = tabWidgetStyleProvider_1.TabWidgetStyleProvider.getInstance().getDropdownStyle(layoutContainerId);
            $("#" + layoutContainerId).append(dropdownStyle);
            tabWidgetStyleProvider_1.TabWidgetStyleProvider.getInstance().setOverviewDropdownMouseOver(layoutContainerId);
        };
        TabWidgetFlexDropDown.prototype.addItemToDropdown = function (tabName, tabId, layoutContainerId, iconPath) {
            if (iconPath === void 0) { iconPath = ""; }
            this._layoutContainerId = layoutContainerId;
            var dropdown = $("#" + layoutContainerId + "_dropdown").data("ejDropDownList");
            if (dropdown.model.dataSource != null) {
                var text = "<img src=\"" + iconPath + "\" style=\"width:17px; float:left; margin-right: 5px; margin-top: 2px; margin-left: -5px \" >" + tabName;
                dropdown.model.dataSource.splice(0, 0, { id: tabId, text: text, iconPath: iconPath, name: tabName });
                var dataSource = dropdown.model.dataSource;
                dropdown.model.dataSource = null;
                dropdown.option("dataSource", dataSource);
            }
            this.resetDropdown();
            this.showDropDownMenuButton();
        };
        TabWidgetFlexDropDown.prototype.setTabSelected = function (tabId) {
            tabId = tabId.replace("_tab", "");
            var itemId = this.getItemIdFromTabId(tabId);
            var dropdown = $("#" + this._layoutContainerId + "_dropdown").data("ejDropDownList");
            var dataSource = dropdown.model.dataSource;
            for (var _i = 0, dataSource_1 = dataSource; _i < dataSource_1.length; _i++) {
                var element = dataSource_1[_i];
                element.text = element.text.replace("_orange.svg", ".svg");
            }
            if (dataSource[itemId] != undefined) {
                var newText = dataSource[itemId].text.replace(".svg", "_orange.svg");
                dataSource[itemId].text = newText;
            }
            dropdown.option("dataSource", dataSource, true);
            this.resetDropdown();
        };
        TabWidgetFlexDropDown.prototype.resetDropdown = function () {
            var _this = this;
            var dropdown = $("#" + this._layoutContainerId + "_dropdown").data("ejDropDownList");
            var dataSource = dropdown.model.dataSource;
            dropdown.model.dataSource = null;
            dropdown.option("dataSource", dataSource, true);
            var lastDropdownItem = $("#" + this._layoutContainerId + "_dropdown_popup_wrapper").find("li").last();
            lastDropdownItem.html(tabWidgetLayoutProvider_1.TabWidgetLayoutProvider.getInstance().getTabOverviewFooterButtonsTemplate(this._layoutContainerId));
            var _loop_1 = function (i) {
                var buttonName = dropdown.model.dataSource[i]["id"];
                $("#" + this_1._layoutContainerId + "_dropdownList_button_" + buttonName).ejButton({
                    contentType: "imageonly",
                    prefixIcon: "e-icon " + this_1._layoutContainerId + "_dropdownList_button_" + buttonName,
                    create: this_1.setDropdownButtonStyle(this_1._layoutContainerId + "_dropdownList_button_" + buttonName, this_1._layoutContainerId),
                });
                $("#" + this_1._layoutContainerId + "_dropdownList_button_" + buttonName).on("click", function (e) {
                    _this.onCloseTab(buttonName);
                });
            };
            var this_1 = this;
            for (var i = 0; i < dropdown.model.dataSource.length; i++) {
                _loop_1(i);
            }
            $("#" + this._layoutContainerId + "_dropdown_closeAll")[0].addEventListener("click", function (e) { _this.onCloseAllTabs(e); });
            $("#" + this._layoutContainerId + "_dropdown_closeAllOther")[0].addEventListener("click", function (e) { _this.onCloseAllTabsButActive(e); });
        };
        /**
         *
         *
         * @param {*} itemName
         * @param {*} mouseWheelClicked
         * @memberof TabWidgetFlexDropDown
         */
        TabWidgetFlexDropDown.prototype.removeItemFromDropdown = function (itemName, mouseWheelClicked) {
            var dropdown = $("#" + this._dropDownContainerId).data("ejDropDownList");
            if (dropdown.model.dataSource != null) {
                for (var i = 0; i < dropdown.model.dataSource.length; i++) {
                    if (dropdown.model.dataSource[i].id == itemName) {
                        dropdown.model.dataSource.splice(i, 1);
                    }
                }
                var dataSource = dropdown.model.dataSource;
                dropdown.model.dataSource = null;
                dropdown.option("dataSource", dataSource);
            }
            this.resetDropdown();
            if (dropdown.model.dataSource.length == 1) {
                dropdown.hidePopup();
                this.hideDropDownMenuButton();
            }
            else if (!mouseWheelClicked) {
                dropdown.hidePopup();
                dropdown.showPopup();
            }
            else {
                dropdown.hidePopup();
            }
        };
        TabWidgetFlexDropDown.prototype.onCloseTab = function (tabName) {
            //let tabName = this.getTabNameFromClickEvent(event);
            this.eventTabBarCloseTab.raise(this, { tabName: tabName });
            this._closeTabButtonPressedFlag = true;
        };
        TabWidgetFlexDropDown.prototype.onCloseAllTabs = function (event) {
            this.eventTabBarCloseAllTabs.raise(this, event);
            this._closeTabButtonPressedFlag = true;
        };
        TabWidgetFlexDropDown.prototype.onCloseAllTabsButActive = function (event) {
            this.eventTabBarCloseAllTabsButActive.raise(this, event);
            this._closeTabButtonPressedFlag = true;
        };
        TabWidgetFlexDropDown.prototype.setDropdownButtonStyle = function (buttonId, layoutContainerId) {
            var dropdownButtonStyle = tabWidgetStyleProvider_1.TabWidgetStyleProvider.getInstance().getDropdownButtonStyle(buttonId);
            $("#" + layoutContainerId).append(dropdownButtonStyle);
        };
        TabWidgetFlexDropDown.prototype.hideDropDownMenuButton = function () {
            $("#" + this._dropDownContainerId + "_wrapper").css("display", "none");
        };
        TabWidgetFlexDropDown.prototype.showDropDownMenuButton = function () {
            $("#" + this._dropDownContainerId + "_wrapper").css("display", "block");
        };
        TabWidgetFlexDropDown.prototype.getTabNameFromItemText = function (itemText) {
            var text = itemText.trim();
            var whitespace = text.indexOf(' ', 1);
            var tabName = "tab_" + text.substr(whitespace + 1);
            return tabName;
        };
        TabWidgetFlexDropDown.prototype.getTabNameFromDropDownDataModelText = function (itemText) {
            var text = itemText.trim();
            var whitespace = text.indexOf(' ', 1);
            var tabName = "tab_" + text.substr(whitespace + 1);
            return tabName;
        };
        TabWidgetFlexDropDown.prototype.getTabNameFromClickEvent = function (event) {
            var str = event.currentTarget.id;
            var n = str.lastIndexOf('_button_');
            var result = str.substring(n + 8);
            //let tabName = event.currentTarget.id.substring(event.currentTarget.id.lastIndexOf("_") + 1);
            return result;
        };
        /**
         * Return Id of Element in Dropdown by TabId
         *
         * @param {string} tabId
         * @returns {number}
         * @memberof TabWidgetFlexDropDown
         */
        TabWidgetFlexDropDown.prototype.getItemIdFromTabId = function (tabId) {
            var dropdown = $("#" + this._dropDownContainerId).data("ejDropDownList");
            var dataSource = dropdown.model.dataSource;
            for (var i = 0; i < dataSource.length; i++) {
                if (tabId == dataSource[i].id) {
                    return i;
                }
            }
            return -1;
        };
        return TabWidgetFlexDropDown;
    }());
    exports.TabWidgetFlexDropDown = TabWidgetFlexDropDown;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiV2lkZ2V0RmxleERyb3BEb3duLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RhYldpZGdldC92aWV3L3RhYldpZGdldEZsZXhEcm9wRG93bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBSUE7UUFBMkMsZ0RBQXlDO1FBQXBGOztRQUFxRixDQUFDO1FBQUQsbUNBQUM7SUFBRCxDQUFDLEFBQXRGLENBQTJDLG1CQUFVLEdBQWlDO0lBQUEsQ0FBQztJQUN2RjtRQUFrQyx1Q0FBeUM7UUFBM0U7O1FBQTRFLENBQUM7UUFBRCwwQkFBQztJQUFELENBQUMsQUFBN0UsQ0FBa0MsbUJBQVUsR0FBaUM7SUFBQSxDQUFDO0lBQzlFO1FBQXNDLDJDQUF5QztRQUEvRTs7UUFBZ0YsQ0FBQztRQUFELDhCQUFDO0lBQUQsQ0FBQyxBQUFqRixDQUFzQyxtQkFBVSxHQUFpQztJQUFBLENBQUM7SUFDbEY7UUFBK0Msb0RBQXlDO1FBQXhGOztRQUF5RixDQUFDO1FBQUQsdUNBQUM7SUFBRCxDQUFDLEFBQTFGLENBQStDLG1CQUFVLEdBQWlDO0lBQUEsQ0FBQztJQUUzRjtRQUFBO1lBRUksaUNBQTRCLEdBQUcsSUFBSSw0QkFBNEIsRUFBRSxDQUFDO1lBQ2xFLHdCQUFtQixHQUFHLElBQUksbUJBQW1CLEVBQUUsQ0FBQztZQUNoRCw0QkFBdUIsR0FBRyxJQUFJLHVCQUF1QixFQUFFLENBQUM7WUFDeEQscUNBQWdDLEdBQUcsSUFBSSxnQ0FBZ0MsRUFBRSxDQUFDO1lBSWxFLCtCQUEwQixHQUFHLEtBQUssQ0FBQztRQThPL0MsQ0FBQztRQTVPRyxrREFBa0IsR0FBbEIsVUFBbUIsaUJBQWlCLEVBQUUsc0JBQXNCO1lBQTVELGlCQXdCQztZQXZCRyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsaUJBQWlCLEdBQUMsV0FBVyxDQUFDO1lBQzFELElBQUksQ0FBQyxvQkFBb0IsQ0FB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QUFBO2lCQUNYO2FBQ0o7WUFFRCxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ2QsQ0FBQztRQUNMLDRCQUFDO0lBQUQsQ0FBQyxBQXZQRCxJQXVQQztJQUNPLHNEQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRhYldpZGdldExheW91dFByb3ZpZGVyIH0gZnJvbSBcIi4uL2xheW91dC90YWJXaWRnZXRMYXlvdXRQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBUYWJXaWRnZXRTdHlsZVByb3ZpZGVyIH0gZnJvbSBcIi4uL3RhYldpZGdldFN0eWxlUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvZXZlbnRzXCI7XHJcblxyXG5jbGFzcyBFdmVudFRhYlNlbGVjdGVkRnJvbURyb3Bkb3duIGV4dGVuZHMgVHlwZWRFdmVudDxUYWJXaWRnZXRGbGV4RHJvcERvd24sIG9iamVjdD57fTtcclxuY2xhc3MgRXZlbnRUYWJCYXJDbG9zZVRhYiBleHRlbmRzIFR5cGVkRXZlbnQ8VGFiV2lkZ2V0RmxleERyb3BEb3duLCBvYmplY3Q+e307XHJcbmNsYXNzIEV2ZW50VGFiQmFyQ2xvc2VBbGxUYWJzIGV4dGVuZHMgVHlwZWRFdmVudDxUYWJXaWRnZXRGbGV4RHJvcERvd24sIG9iamVjdD57fTtcclxuY2xhc3MgRXZlbnRUYWJCYXJDbG9zZUFsbFRhYnNCdXRBY3RpdmUgZXh0ZW5kcyBUeXBlZEV2ZW50PFRhYldpZGdldEZsZXhEcm9wRG93biwgb2JqZWN0Pnt9O1xyXG5cclxuY2xhc3MgVGFiV2lkZ2V0RmxleERyb3BEb3dueyBcclxuXHJcbiAgICBldmVudFRhYlNlbGVjdGVkRnJvbURyb3Bkb3duID0gbmV3IEV2ZW50VGFiU2VsZWN0ZWRGcm9tRHJvcGRvd24oKTtcclxuICAgIGV2ZW50VGFiQmFyQ2xvc2VUYWIgPSBuZXcgRXZlbnRUYWJCYXJDbG9zZVRhYigpO1xyXG4gICAgZXZlbnRUYWJCYXJDbG9zZUFsbFRhYnMgPSBuZXcgRXZlbnRUYWJCYXJDbG9zZUFsbFRhYnMoKTtcclxuICAgIGV2ZW50VGFiQmFyQ2xvc2VBbGxUYWJzQnV0QWN0aXZlID0gbmV3IEV2ZW50VGFiQmFyQ2xvc2VBbGxUYWJzQnV0QWN0aXZlKCk7XHJcbiAgICBcclxuICAgIHByaXZhdGUgX2Ryb3BEb3duQ29udGFpbmVySWQ/OiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF9sYXlvdXRDb250YWluZXJJZD86IHN0cmluZztcclxuICAgIHByaXZhdGUgX2Nsb3NlVGFiQnV0dG9uUHJlc3NlZEZsYWcgPSBmYWxzZTtcclxuXHJcbiAgICBhZGRGbGV4VGFiRHJvcGRvd24obGF5b3V0Q29udGFpbmVySWQsIGZsZXhpYmxlVGFiQ29udGFpbmVySWQpe1xyXG4gICAgICAgIHRoaXMuX2Ryb3BEb3duQ29udGFpbmVySWQgPSBsYXlvdXRDb250YWluZXJJZCtcIl9kcm9wZG93blwiO1xyXG4gICAgICAgIHRoaXMuYXBwZW5kRHJvcERvd25MYXlvdXQoZmxleGlibGVUYWJDb250YWluZXJJZCwgbGF5b3V0Q29udGFpbmVySWQpO1xyXG4gICAgICAgIGxldCBkcm9wRG93bkRhdGEgPSBbXTtcclxuXHJcbiAgICAgICAgJChcIiNcIit0aGlzLl9kcm9wRG93bkNvbnRhaW5lcklkKS5lakRyb3BEb3duTGlzdCh7XHJcbiAgICAgICAgICAgIHRhcmdldElEOiBsYXlvdXRDb250YWluZXJJZCArIFwiX2Ryb3Bkb3duTGlzdFwiLFxyXG4gICAgICAgICAgICB3aWR0aDogXCI0OHB4XCIsXHJcbiAgICAgICAgICAgIGhlaWdodDogXCI1MHB4XCIsXHJcbiAgICAgICAgICAgIGZpZWxkczoge2lkOiBcImlkXCIgLCB0ZXh0OiBcInRleHRcIiwgbmFtZTogXCJuYW1lXCJ9LFxyXG4gICAgICAgICAgICBkYXRhU291cmNlIDogZHJvcERvd25EYXRhLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZTogVGFiV2lkZ2V0TGF5b3V0UHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXRUYWJPdmVydmlld0Ryb3Bkb3duVGVtcGxhdGUobGF5b3V0Q29udGFpbmVySWQpLFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbWluUG9wdXBXaWR0aDogXCIyODBweFwiLCBcclxuICAgICAgICAgICAgcG9wdXBIZWlnaHQgOiBcIjI1MHB4XCIsXHJcblxyXG4gICAgICAgICAgICBjaGFuZ2U6IChhcmdzKSA9PiB0aGlzLm9uRHJvcGRvd25DaGFuZ2VkKGFyZ3MpLFxyXG4gICAgICAgICAgICBwb3B1cFNob3duOiAoYXJncykgPT4gdGhpcy5vbkRyb3Bkb3duUG9wdXAoYXJncyksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5hZGRJdGVtVG9Ecm9wZG93bihcImZvb3RlclwiLCBcImZvb3RlcklkXCIsIGxheW91dENvbnRhaW5lcklkKTtcclxuICAgICAgICB0aGlzLnNldERyb3Bkb3duTGF5b3V0KGxheW91dENvbnRhaW5lcklkKTtcclxuICAgICAgICB0aGlzLmhpZGVEcm9wRG93bk1lbnVCdXR0b24oKTtcclxuXHJcbiAgICAgICAgdGhpcy5fbGF5b3V0Q29udGFpbmVySWQgPSBsYXlvdXRDb250YWluZXJJZDtcclxuICAgIH1cclxuXHJcbiAgICBvbkRyb3Bkb3duQ2hhbmdlZChhcmdzKXtcclxuICAgICAgICBhcmdzLmNhbmNlbCA9IHRydWU7XHJcbiAgICAgICAgaWYodGhpcy5fY2xvc2VUYWJCdXR0b25QcmVzc2VkRmxhZyAhPSB0cnVlKXtcclxuICAgICAgICAgICAgbGV0IGRhdGFTb3VyY2UgPSBhcmdzLm1vZGVsLmRhdGFTb3VyY2U7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGFiU2VsZWN0ZWQoZGF0YVNvdXJjZVthcmdzLml0ZW1JZCFdLmlkKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCB0YWJJZCA9IGRhdGFTb3VyY2VbYXJncy5pdGVtSWQhXS5pZDtcclxuICAgICAgICAgICAgdGFiSWQgPSB0YWJJZC5yZXBsYWNlKFwidGFiX1wiLFwiXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmV2ZW50VGFiU2VsZWN0ZWRGcm9tRHJvcGRvd24ucmFpc2UodGhpcyx7dGFiTmFtZTogdGFiSWR9KVxyXG5cclxuICAgICAgICAgICAgbGV0IGRyb3Bkb3duID0gJChcIiNcIit0aGlzLl9sYXlvdXRDb250YWluZXJJZCArIFwiX2Ryb3Bkb3duXCIpLmRhdGEoXCJlakRyb3BEb3duTGlzdFwiKTtcclxuICAgICAgICAgICAgZHJvcGRvd24ub3B0aW9uKFwiZGF0YVNvdXJjZVwiLCBkYXRhU291cmNlLCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5yZXNldERyb3Bkb3duKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2Nsb3NlVGFiQnV0dG9uUHJlc3NlZEZsYWcgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRyb3Bkb3duUG9wdXAoYXJncyl7XHJcbiAgICAgICAgJChcImhlYWRcIikuYXBwZW5kKCc8c3R5bGUgdHlwZT1cInRleHQvY3NzXCI+PC9zdHlsZT4nKTtcclxuICAgICAgICB2YXIgbmV3U3R5bGVFbGVtZW50ID0gJChcImhlYWRcIikuY2hpbGRyZW4oJzpsYXN0Jyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGFwcGVuZERyb3BEb3duTGF5b3V0KGZsZXhpYmxlVGFiQ29udGFpbmVySWQsIGxheW91dENvbnRhaW5lcklkKXtcclxuICAgICAgICBsZXQgaHRtbCA9IFRhYldpZGdldExheW91dFByb3ZpZGVyLmdldEluc3RhbmNlKCkuZ2V0RmxleFRhYkRyb3Bkb3duTGF5b3V0KGxheW91dENvbnRhaW5lcklkKTtcclxuICAgICAgICAkKFwiI1wiK2ZsZXhpYmxlVGFiQ29udGFpbmVySWQpLmFwcGVuZChodG1sKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXREcm9wZG93bkxheW91dChsYXlvdXRDb250YWluZXJJZDogc3RyaW5nKXtcclxuXHJcbiAgICAgICAgVGFiV2lkZ2V0U3R5bGVQcm92aWRlci5nZXRJbnN0YW5jZSgpLnNldEZsZXhUYWJTZWxlY3Rpb25Ecm9wZG93blBvcHVwU3R5bGUobGF5b3V0Q29udGFpbmVySWQpO1xyXG4gICAgXHJcbiAgICAgICAgbGV0IGRyb3Bkb3duU3R5bGUgPSBUYWJXaWRnZXRTdHlsZVByb3ZpZGVyLmdldEluc3RhbmNlKCkuZ2V0RHJvcGRvd25TdHlsZShsYXlvdXRDb250YWluZXJJZCk7XHJcbiAgICAgICAgJChcIiNcIitsYXlvdXRDb250YWluZXJJZCkuYXBwZW5kKGRyb3Bkb3duU3R5bGUpOyBcclxuXHJcbiAgICAgICAgVGFiV2lkZ2V0U3R5bGVQcm92aWRlci5nZXRJbnN0YW5jZSgpLnNldE92ZXJ2aWV3RHJvcGRvd25Nb3VzZU92ZXIobGF5b3V0Q29udGFpbmVySWQpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGFkZEl0ZW1Ub0Ryb3Bkb3duKHRhYk5hbWUsIHRhYklkLCBsYXlvdXRDb250YWluZXJJZCwgaWNvblBhdGggPSBcIlwiKXtcclxuICAgICAgICB0aGlzLl9sYXlvdXRDb250YWluZXJJZCA9IGxheW91dENvbnRhaW5lcklkO1xyXG5cclxuICAgICAgICBsZXQgZHJvcGRvd24gPSAkKFwiI1wiK2xheW91dENvbnRhaW5lcklkICsgXCJfZHJvcGRvd25cIikuZGF0YShcImVqRHJvcERvd25MaXN0XCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChkcm9wZG93bi5tb2RlbC5kYXRhU291cmNlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgbGV0IHRleHQgID0gIGA8aW1nIHNyYz1cImAraWNvblBhdGgrYFwiIHN0eWxlPVwid2lkdGg6MTdweDsgZmxvYXQ6bGVmdDsgbWFyZ2luLXJpZ2h0OiA1cHg7IG1hcmdpbi10b3A6IDJweDsgbWFyZ2luLWxlZnQ6IC01cHggXCIgPmAgKyB0YWJOYW1lOyBcclxuICAgICAgICAgICAgZHJvcGRvd24ubW9kZWwuZGF0YVNvdXJjZS5zcGxpY2UoMCwgMCwge2lkIDogdGFiSWQsIHRleHQgOiB0ZXh0LCBpY29uUGF0aDogaWNvblBhdGgsIG5hbWU6IHRhYk5hbWV9KTtcclxuICAgICAgICAgICAgdmFyIGRhdGFTb3VyY2UgPSBkcm9wZG93bi5tb2RlbC5kYXRhU291cmNlO1xyXG4gICAgICAgICAgICBkcm9wZG93bi5tb2RlbC5kYXRhU291cmNlID0gbnVsbDtcclxuICAgICAgICAgICAgZHJvcGRvd24ub3B0aW9uKFwiZGF0YVNvdXJjZVwiLCBkYXRhU291cmNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucmVzZXREcm9wZG93bigpO1xyXG4gICAgICAgIHRoaXMuc2hvd0Ryb3BEb3duTWVudUJ1dHRvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRhYlNlbGVjdGVkKHRhYklkOiBzdHJpbmcpe1xyXG4gICAgICAgIHRhYklkID0gdGFiSWQucmVwbGFjZShcIl90YWJcIiwgXCJcIik7XHJcblxyXG4gICAgICAgIGxldCBpdGVtSWQgPSB0aGlzLmdldEl0ZW1JZEZyb21UYWJJZCh0YWJJZCk7XHJcblxyXG4gICAgICAgIGxldCBkcm9wZG93biA9ICQoXCIjXCIrdGhpcy5fbGF5b3V0Q29udGFpbmVySWQhK1wiX2Ryb3Bkb3duXCIpLmRhdGEoXCJlakRyb3BEb3duTGlzdFwiKTtcclxuICAgICAgICB2YXIgZGF0YVNvdXJjZSA9IGRyb3Bkb3duLm1vZGVsLmRhdGFTb3VyY2U7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yKGxldCBlbGVtZW50IG9mIGRhdGFTb3VyY2Upe1xyXG4gICAgICAgICAgICBlbGVtZW50LnRleHQgPSBlbGVtZW50LnRleHQucmVwbGFjZShcIl9vcmFuZ2Uuc3ZnXCIsIFwiLnN2Z1wiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGRhdGFTb3VyY2VbaXRlbUlkXSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBsZXQgbmV3VGV4dCA9IGRhdGFTb3VyY2VbaXRlbUlkXS50ZXh0LnJlcGxhY2UoXCIuc3ZnXCIsIFwiX29yYW5nZS5zdmdcIik7XHJcbiAgICAgICAgICAgIGRhdGFTb3VyY2VbaXRlbUlkXS50ZXh0ID0gbmV3VGV4dDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRyb3Bkb3duLm9wdGlvbihcImRhdGFTb3VyY2VcIiwgZGF0YVNvdXJjZSwgdHJ1ZSk7XHJcblxyXG4gICAgICAgIHRoaXMucmVzZXREcm9wZG93bigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVzZXREcm9wZG93bigpe1xyXG5cclxuICAgICAgICBsZXQgZHJvcGRvd24gPSAkKFwiI1wiK3RoaXMuX2xheW91dENvbnRhaW5lcklkIStcIl9kcm9wZG93blwiKS5kYXRhKFwiZWpEcm9wRG93bkxpc3RcIik7XHJcblxyXG4gICAgICAgIHZhciBkYXRhU291cmNlID0gZHJvcGRvd24ubW9kZWwuZGF0YVNvdXJjZTtcclxuICAgICAgICBkcm9wZG93bi5tb2RlbC5kYXRhU291cmNlID0gbnVsbDtcclxuICAgICAgICBkcm9wZG93bi5vcHRpb24oXCJkYXRhU291cmNlXCIsIGRhdGFTb3VyY2UsIHRydWUpO1xyXG5cclxuICAgICAgICBsZXQgbGFzdERyb3Bkb3duSXRlbSA9ICQoXCIjXCIrdGhpcy5fbGF5b3V0Q29udGFpbmVySWQhK1wiX2Ryb3Bkb3duX3BvcHVwX3dyYXBwZXJcIikuZmluZChcImxpXCIpLmxhc3QoKTtcclxuICAgICAgICBsYXN0RHJvcGRvd25JdGVtLmh0bWwoVGFiV2lkZ2V0TGF5b3V0UHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXRUYWJPdmVydmlld0Zvb3RlckJ1dHRvbnNUZW1wbGF0ZSh0aGlzLl9sYXlvdXRDb250YWluZXJJZCEhKSk7XHJcblxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBkcm9wZG93bi5tb2RlbC5kYXRhU291cmNlLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGJ1dHRvbk5hbWUgPSBkcm9wZG93bi5tb2RlbC5kYXRhU291cmNlW2ldW1wiaWRcIl1cclxuICAgICAgICAgICAgJChcIiNcIit0aGlzLl9sYXlvdXRDb250YWluZXJJZCErXCJfZHJvcGRvd25MaXN0X2J1dHRvbl9cIitidXR0b25OYW1lKS5lakJ1dHRvbih7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50VHlwZTogXCJpbWFnZW9ubHlcIixcclxuICAgICAgICAgICAgICAgIHByZWZpeEljb246IFwiZS1pY29uIFwiKyB0aGlzLl9sYXlvdXRDb250YWluZXJJZCErXCJfZHJvcGRvd25MaXN0X2J1dHRvbl9cIitidXR0b25OYW1lLFxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBjcmVhdGU6IHRoaXMuc2V0RHJvcGRvd25CdXR0b25TdHlsZSh0aGlzLl9sYXlvdXRDb250YWluZXJJZCErXCJfZHJvcGRvd25MaXN0X2J1dHRvbl9cIitidXR0b25OYW1lLCB0aGlzLl9sYXlvdXRDb250YWluZXJJZCEpLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgJChcIiNcIit0aGlzLl9sYXlvdXRDb250YWluZXJJZCErXCJfZHJvcGRvd25MaXN0X2J1dHRvbl9cIitidXR0b25OYW1lKS5vbihcImNsaWNrXCIsKGU6RXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25DbG9zZVRhYihidXR0b25OYW1lKTt9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgJChcIiNcIit0aGlzLl9sYXlvdXRDb250YWluZXJJZCEgK1wiX2Ryb3Bkb3duX2Nsb3NlQWxsXCIpWzBdLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLChlOkV2ZW50KSA9PiB7dGhpcy5vbkNsb3NlQWxsVGFicyhlKTt9KTtcclxuICAgICAgICAkKFwiI1wiK3RoaXMuX2xheW91dENvbnRhaW5lcklkISArXCJfZHJvcGRvd25fY2xvc2VBbGxPdGhlclwiKVswXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwoZTpFdmVudCkgPT4ge3RoaXMub25DbG9zZUFsbFRhYnNCdXRBY3RpdmUoZSk7fSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gaXRlbU5hbWVcclxuICAgICAqIEBwYXJhbSB7Kn0gbW91c2VXaGVlbENsaWNrZWRcclxuICAgICAqIEBtZW1iZXJvZiBUYWJXaWRnZXRGbGV4RHJvcERvd25cclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlbW92ZUl0ZW1Gcm9tRHJvcGRvd24oaXRlbU5hbWUsIG1vdXNlV2hlZWxDbGlja2VkKXtcclxuICAgICAgICBsZXQgZHJvcGRvd24gPSAkKFwiI1wiK3RoaXMuX2Ryb3BEb3duQ29udGFpbmVySWQpLmRhdGEoXCJlakRyb3BEb3duTGlzdFwiKTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoZHJvcGRvd24ubW9kZWwuZGF0YVNvdXJjZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBkcm9wZG93bi5tb2RlbC5kYXRhU291cmNlIS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBpZihkcm9wZG93bi5tb2RlbC5kYXRhU291cmNlW2ldLmlkID09IGl0ZW1OYW1lKXtcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bi5tb2RlbC5kYXRhU291cmNlLnNwbGljZShpLDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBkYXRhU291cmNlID0gZHJvcGRvd24ubW9kZWwuZGF0YVNvdXJjZTtcclxuICAgICAgICAgICAgZHJvcGRvd24ubW9kZWwuZGF0YVNvdXJjZSA9IG51bGw7XHJcbiAgICAgICAgICAgIGRyb3Bkb3duLm9wdGlvbihcImRhdGFTb3VyY2VcIiwgZGF0YVNvdXJjZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICBcclxuICAgICAgICB0aGlzLnJlc2V0RHJvcGRvd24oKTtcclxuXHJcbiAgICAgICAgaWYoZHJvcGRvd24ubW9kZWwuZGF0YVNvdXJjZS5sZW5ndGggPT0gMSl7XHJcbiAgICAgICAgICAgIGRyb3Bkb3duLmhpZGVQb3B1cCgpO1xyXG4gICAgICAgICAgICB0aGlzLmhpZGVEcm9wRG93bk1lbnVCdXR0b24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZighbW91c2VXaGVlbENsaWNrZWQpe1xyXG4gICAgICAgICAgICBkcm9wZG93bi5oaWRlUG9wdXAoKTtcclxuICAgICAgICAgICAgZHJvcGRvd24uc2hvd1BvcHVwKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGRyb3Bkb3duLmhpZGVQb3B1cCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQ2xvc2VUYWIodGFiTmFtZSl7XHJcbiAgICAgICAgLy9sZXQgdGFiTmFtZSA9IHRoaXMuZ2V0VGFiTmFtZUZyb21DbGlja0V2ZW50KGV2ZW50KTtcclxuICAgICAgICB0aGlzLmV2ZW50VGFiQmFyQ2xvc2VUYWIucmFpc2UodGhpcyx7dGFiTmFtZTogdGFiTmFtZX0pO1xyXG4gICAgICAgIHRoaXMuX2Nsb3NlVGFiQnV0dG9uUHJlc3NlZEZsYWcgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DbG9zZUFsbFRhYnMoZXZlbnQpe1xyXG4gICAgICAgIHRoaXMuZXZlbnRUYWJCYXJDbG9zZUFsbFRhYnMucmFpc2UodGhpcyxldmVudCk7XHJcbiAgICAgICAgdGhpcy5fY2xvc2VUYWJCdXR0b25QcmVzc2VkRmxhZyA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNsb3NlQWxsVGFic0J1dEFjdGl2ZShldmVudCl7XHJcbiAgICAgICAgdGhpcy5ldmVudFRhYkJhckNsb3NlQWxsVGFic0J1dEFjdGl2ZS5yYWlzZSh0aGlzLGV2ZW50KTtcclxuICAgICAgICB0aGlzLl9jbG9zZVRhYkJ1dHRvblByZXNzZWRGbGFnID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldERyb3Bkb3duQnV0dG9uU3R5bGUoYnV0dG9uSWQ6IHN0cmluZywgbGF5b3V0Q29udGFpbmVySWQpe1xyXG4gICAgICAgIGxldCBkcm9wZG93bkJ1dHRvblN0eWxlID0gVGFiV2lkZ2V0U3R5bGVQcm92aWRlci5nZXRJbnN0YW5jZSgpLmdldERyb3Bkb3duQnV0dG9uU3R5bGUoYnV0dG9uSWQpO1xyXG4gICAgICAgICQoXCIjXCIrbGF5b3V0Q29udGFpbmVySWQpLmFwcGVuZChkcm9wZG93bkJ1dHRvblN0eWxlKTtcclxuICAgIH1cclxuXHJcbiAgICBoaWRlRHJvcERvd25NZW51QnV0dG9uKCl7XHJcbiAgICAgICAgJChcIiNcIit0aGlzLl9kcm9wRG93bkNvbnRhaW5lcklkICsgXCJfd3JhcHBlclwiKS5jc3MoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcclxuICAgIH1cclxuICAgIHNob3dEcm9wRG93bk1lbnVCdXR0b24oKXtcclxuICAgICAgICAkKFwiI1wiK3RoaXMuX2Ryb3BEb3duQ29udGFpbmVySWQgKyBcIl93cmFwcGVyXCIpLmNzcyhcImRpc3BsYXlcIiwgXCJibG9ja1wiKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRUYWJOYW1lRnJvbUl0ZW1UZXh0KGl0ZW1UZXh0OiBzdHJpbmcpIDogc3RyaW5ne1xyXG4gICAgICAgIGxldCB0ZXh0ID0gaXRlbVRleHQudHJpbSgpO1xyXG4gICAgICAgIGxldCB3aGl0ZXNwYWNlID0gdGV4dC5pbmRleE9mKCcgJywgMSk7XHJcbiAgICAgICAgbGV0IHRhYk5hbWUgPSBcInRhYl9cIit0ZXh0LnN1YnN0cih3aGl0ZXNwYWNlICsgMSk7XHJcbiAgICAgICAgcmV0dXJuIHRhYk5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VGFiTmFtZUZyb21Ecm9wRG93bkRhdGFNb2RlbFRleHQoaXRlbVRleHQ6IHN0cmluZykgOiBzdHJpbmd7XHJcbiAgICAgICAgbGV0IHRleHQgPSBpdGVtVGV4dC50cmltKCk7XHJcbiAgICAgICAgbGV0IHdoaXRlc3BhY2UgPSB0ZXh0LmluZGV4T2YoJyAnLCAxKTtcclxuICAgICAgICBsZXQgdGFiTmFtZSA9IFwidGFiX1wiK3RleHQuc3Vic3RyKHdoaXRlc3BhY2UgKyAxKTtcclxuICAgICAgICByZXR1cm4gdGFiTmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRUYWJOYW1lRnJvbUNsaWNrRXZlbnQoZXZlbnQpe1xyXG4gICAgICAgIHZhciBzdHIgPSBldmVudC5jdXJyZW50VGFyZ2V0LmlkO1xyXG4gICAgICAgIHZhciBuID0gc3RyLmxhc3RJbmRleE9mKCdfYnV0dG9uXycpO1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBzdHIuc3Vic3RyaW5nKG4gKyA4KTtcclxuICAgICAgICAvL2xldCB0YWJOYW1lID0gZXZlbnQuY3VycmVudFRhcmdldC5pZC5zdWJzdHJpbmcoZXZlbnQuY3VycmVudFRhcmdldC5pZC5sYXN0SW5kZXhPZihcIl9cIikgKyAxKTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIElkIG9mIEVsZW1lbnQgaW4gRHJvcGRvd24gYnkgVGFiSWRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGFiSWRcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgVGFiV2lkZ2V0RmxleERyb3BEb3duXHJcbiAgICAgKi9cclxuICAgIGdldEl0ZW1JZEZyb21UYWJJZCh0YWJJZDogc3RyaW5nKSA6IG51bWJlcntcclxuICAgICAgICBsZXQgZHJvcGRvd24gPSAkKFwiI1wiK3RoaXMuX2Ryb3BEb3duQ29udGFpbmVySWQpLmRhdGEoXCJlakRyb3BEb3duTGlzdFwiKTtcclxuICAgICAgICBsZXQgZGF0YVNvdXJjZSA9IGRyb3Bkb3duLm1vZGVsLmRhdGFTb3VyY2U7XHJcblxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBkYXRhU291cmNlLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYodGFiSWQgPT0gZGF0YVNvdXJjZVtpXS5pZCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxufVxyXG5leHBvcnQge1RhYldpZGdldEZsZXhEcm9wRG93bn07Il19