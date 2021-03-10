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
            newStyleElement.html('.e-focus{background:green;}');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiV2lkZ2V0RmxleERyb3BEb3duLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RhYldpZGdldC92aWV3L3RhYldpZGdldEZsZXhEcm9wRG93bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBSUE7UUFBMkMsZ0RBQXlDO1FBQXBGOztRQUFxRixDQUFDO1FBQUQsbUNBQUM7SUFBRCxDQUFDLEFBQXRGLENBQTJDLG1CQUFVLEdBQWlDO0lBQUEsQ0FBQztJQUN2RjtRQUFrQyx1Q0FBeUM7UUFBM0U7O1FBQTRFLENBQUM7UUFBRCwwQkFBQztJQUFELENBQUMsQUFBN0UsQ0FBa0MsbUJBQVUsR0FBaUM7SUFBQSxDQUFDO0lBQzlFO1FBQXNDLDJDQUF5QztRQUEvRTs7UUFBZ0YsQ0FBQztRQUFELDhCQUFDO0lBQUQsQ0FBQyxBQUFqRixDQUFzQyxtQkFBVSxHQUFpQztJQUFBLENBQUM7SUFDbEY7UUFBK0Msb0RBQXlDO1FBQXhGOztRQUF5RixDQUFDO1FBQUQsdUNBQUM7SUFBRCxDQUFDLEFBQTFGLENBQStDLG1CQUFVLEdBQWlDO0lBQUEsQ0FBQztJQUUzRjtRQUFBO1lBRUksaUNBQTRCLEdBQUcsSUFBSSw0QkFBNEIsRUFBRSxDQUFDO1lBQ2xFLHdCQUFtQixHQUFHLElBQUksbUJBQW1CLEVBQUUsQ0FBQztZQUNoRCw0QkFBdUIsR0FBRyxJQUFJLHVCQUF1QixFQUFFLENBQUM7WUFDeEQscUNBQWdDLEdBQUcsSUFBSSxnQ0FBZ0MsRUFBRSxDQUFDO1lBSWxFLCtCQUEwQixHQUFHLEtBQUssQ0FBQztRQStPL0MsQ0FBQztRQTdPRyxrREFBa0IsR0FBbEIsVUFBbUIsaUJBQWlCLEVBQUUsc0JBQXNCO1lBQTVELGlCQXdCQztZQXZCRyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsaUJBQWlCLEdBQUMsV0FBVyxDQUFDO1lBQzFELElBQUksQ0FBQyxvQkFBb0IsQ0FB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Q0FBQyxDQUFDLENBQUMsRUFBRSxFQUFDO29CQUN6QixPQUFPLENBQUMsQ0FBQTtpQkFDWDthQUNKO1lBRUQsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNkLENBQUM7UUFDTCw0QkFBQztJQUFELENBQUMsQUF4UEQsSUF3UEM7SUFDTyxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUYWJXaWRnZXRMYXlvdXRQcm92aWRlciB9IGZyb20gXCIuLi9sYXlvdXQvdGFiV2lkZ2V0TGF5b3V0UHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgVGFiV2lkZ2V0U3R5bGVQcm92aWRlciB9IGZyb20gXCIuLi90YWJXaWRnZXRTdHlsZVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IFR5cGVkRXZlbnQgfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL2V2ZW50c1wiO1xyXG5cclxuY2xhc3MgRXZlbnRUYWJTZWxlY3RlZEZyb21Ecm9wZG93biBleHRlbmRzIFR5cGVkRXZlbnQ8VGFiV2lkZ2V0RmxleERyb3BEb3duLCBvYmplY3Q+e307XHJcbmNsYXNzIEV2ZW50VGFiQmFyQ2xvc2VUYWIgZXh0ZW5kcyBUeXBlZEV2ZW50PFRhYldpZGdldEZsZXhEcm9wRG93biwgb2JqZWN0Pnt9O1xyXG5jbGFzcyBFdmVudFRhYkJhckNsb3NlQWxsVGFicyBleHRlbmRzIFR5cGVkRXZlbnQ8VGFiV2lkZ2V0RmxleERyb3BEb3duLCBvYmplY3Q+e307XHJcbmNsYXNzIEV2ZW50VGFiQmFyQ2xvc2VBbGxUYWJzQnV0QWN0aXZlIGV4dGVuZHMgVHlwZWRFdmVudDxUYWJXaWRnZXRGbGV4RHJvcERvd24sIG9iamVjdD57fTtcclxuXHJcbmNsYXNzIFRhYldpZGdldEZsZXhEcm9wRG93bnsgXHJcblxyXG4gICAgZXZlbnRUYWJTZWxlY3RlZEZyb21Ecm9wZG93biA9IG5ldyBFdmVudFRhYlNlbGVjdGVkRnJvbURyb3Bkb3duKCk7XHJcbiAgICBldmVudFRhYkJhckNsb3NlVGFiID0gbmV3IEV2ZW50VGFiQmFyQ2xvc2VUYWIoKTtcclxuICAgIGV2ZW50VGFiQmFyQ2xvc2VBbGxUYWJzID0gbmV3IEV2ZW50VGFiQmFyQ2xvc2VBbGxUYWJzKCk7XHJcbiAgICBldmVudFRhYkJhckNsb3NlQWxsVGFic0J1dEFjdGl2ZSA9IG5ldyBFdmVudFRhYkJhckNsb3NlQWxsVGFic0J1dEFjdGl2ZSgpO1xyXG4gICAgXHJcbiAgICBwcml2YXRlIF9kcm9wRG93bkNvbnRhaW5lcklkPzogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfbGF5b3V0Q29udGFpbmVySWQ/OiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF9jbG9zZVRhYkJ1dHRvblByZXNzZWRGbGFnID0gZmFsc2U7XHJcblxyXG4gICAgYWRkRmxleFRhYkRyb3Bkb3duKGxheW91dENvbnRhaW5lcklkLCBmbGV4aWJsZVRhYkNvbnRhaW5lcklkKXtcclxuICAgICAgICB0aGlzLl9kcm9wRG93bkNvbnRhaW5lcklkID0gbGF5b3V0Q29udGFpbmVySWQrXCJfZHJvcGRvd25cIjtcclxuICAgICAgICB0aGlzLmFwcGVuZERyb3BEb3duTGF5b3V0KGZsZXhpYmxlVGFiQ29udGFpbmVySWQsIGxheW91dENvbnRhaW5lcklkKTtcclxuICAgICAgICBsZXQgZHJvcERvd25EYXRhID0gW107XHJcblxyXG4gICAgICAgICQoXCIjXCIrdGhpcy5fZHJvcERvd25Db250YWluZXJJZCkuZWpEcm9wRG93bkxpc3Qoe1xyXG4gICAgICAgICAgICB0YXJnZXRJRDogbGF5b3V0Q29udGFpbmVySWQgKyBcIl9kcm9wZG93bkxpc3RcIixcclxuICAgICAgICAgICAgd2lkdGg6IFwiNDhweFwiLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IFwiNTBweFwiLFxyXG4gICAgICAgICAgICBmaWVsZHM6IHtpZDogXCJpZFwiICwgdGV4dDogXCJ0ZXh0XCIsIG5hbWU6IFwibmFtZVwifSxcclxuICAgICAgICAgICAgZGF0YVNvdXJjZSA6IGRyb3BEb3duRGF0YSxcclxuICAgICAgICAgICAgdGVtcGxhdGU6IFRhYldpZGdldExheW91dFByb3ZpZGVyLmdldEluc3RhbmNlKCkuZ2V0VGFiT3ZlcnZpZXdEcm9wZG93blRlbXBsYXRlKGxheW91dENvbnRhaW5lcklkKSxcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG1pblBvcHVwV2lkdGg6IFwiMjgwcHhcIiwgXHJcbiAgICAgICAgICAgIHBvcHVwSGVpZ2h0IDogXCIyNTBweFwiLFxyXG5cclxuICAgICAgICAgICAgY2hhbmdlOiAoYXJncykgPT4gdGhpcy5vbkRyb3Bkb3duQ2hhbmdlZChhcmdzKSxcclxuICAgICAgICAgICAgcG9wdXBTaG93bjogKGFyZ3MpID0+IHRoaXMub25Ecm9wZG93blBvcHVwKGFyZ3MpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuYWRkSXRlbVRvRHJvcGRvd24oXCJmb290ZXJcIiwgXCJmb290ZXJJZFwiLCBsYXlvdXRDb250YWluZXJJZCk7XHJcbiAgICAgICAgdGhpcy5zZXREcm9wZG93bkxheW91dChsYXlvdXRDb250YWluZXJJZCk7XHJcbiAgICAgICAgdGhpcy5oaWRlRHJvcERvd25NZW51QnV0dG9uKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2xheW91dENvbnRhaW5lcklkID0gbGF5b3V0Q29udGFpbmVySWQ7XHJcbiAgICB9XHJcblxyXG4gICAgb25Ecm9wZG93bkNoYW5nZWQoYXJncyl7XHJcbiAgICAgICAgYXJncy5jYW5jZWwgPSB0cnVlO1xyXG4gICAgICAgIGlmKHRoaXMuX2Nsb3NlVGFiQnV0dG9uUHJlc3NlZEZsYWcgIT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIGxldCBkYXRhU291cmNlID0gYXJncy5tb2RlbC5kYXRhU291cmNlO1xyXG4gICAgICAgICAgICB0aGlzLnNldFRhYlNlbGVjdGVkKGRhdGFTb3VyY2VbYXJncy5pdGVtSWQhXS5pZCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgdGFiSWQgPSBkYXRhU291cmNlW2FyZ3MuaXRlbUlkIV0uaWQ7XHJcbiAgICAgICAgICAgIHRhYklkID0gdGFiSWQucmVwbGFjZShcInRhYl9cIixcIlwiKTtcclxuICAgICAgICAgICAgdGhpcy5ldmVudFRhYlNlbGVjdGVkRnJvbURyb3Bkb3duLnJhaXNlKHRoaXMse3RhYk5hbWU6IHRhYklkfSlcclxuXHJcbiAgICAgICAgICAgIGxldCBkcm9wZG93biA9ICQoXCIjXCIrdGhpcy5fbGF5b3V0Q29udGFpbmVySWQgKyBcIl9kcm9wZG93blwiKS5kYXRhKFwiZWpEcm9wRG93bkxpc3RcIik7XHJcbiAgICAgICAgICAgIGRyb3Bkb3duLm9wdGlvbihcImRhdGFTb3VyY2VcIiwgZGF0YVNvdXJjZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVzZXREcm9wZG93bigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9jbG9zZVRhYkJ1dHRvblByZXNzZWRGbGFnID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgb25Ecm9wZG93blBvcHVwKGFyZ3Mpe1xyXG4gICAgICAgICQoXCJoZWFkXCIpLmFwcGVuZCgnPHN0eWxlIHR5cGU9XCJ0ZXh0L2Nzc1wiPjwvc3R5bGU+Jyk7XHJcbiAgICAgICAgdmFyIG5ld1N0eWxlRWxlbWVudCA9ICQoXCJoZWFkXCIpLmNoaWxkcmVuKCc6bGFzdCcpO1xyXG4gICAgICAgIG5ld1N0eWxlRWxlbWVudC5odG1sKCcuZS1mb2N1c3tiYWNrZ3JvdW5kOmdyZWVuO30nKTsgXHJcbiAgICB9XHJcblxyXG5cclxuICAgIGFwcGVuZERyb3BEb3duTGF5b3V0KGZsZXhpYmxlVGFiQ29udGFpbmVySWQsIGxheW91dENvbnRhaW5lcklkKXtcclxuICAgICAgICBsZXQgaHRtbCA9IFRhYldpZGdldExheW91dFByb3ZpZGVyLmdldEluc3RhbmNlKCkuZ2V0RmxleFRhYkRyb3Bkb3duTGF5b3V0KGxheW91dENvbnRhaW5lcklkKTtcclxuICAgICAgICAkKFwiI1wiK2ZsZXhpYmxlVGFiQ29udGFpbmVySWQpLmFwcGVuZChodG1sKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXREcm9wZG93bkxheW91dChsYXlvdXRDb250YWluZXJJZDogc3RyaW5nKXtcclxuXHJcbiAgICAgICAgVGFiV2lkZ2V0U3R5bGVQcm92aWRlci5nZXRJbnN0YW5jZSgpLnNldEZsZXhUYWJTZWxlY3Rpb25Ecm9wZG93blBvcHVwU3R5bGUobGF5b3V0Q29udGFpbmVySWQpO1xyXG4gICAgXHJcbiAgICAgICAgbGV0IGRyb3Bkb3duU3R5bGUgPSBUYWJXaWRnZXRTdHlsZVByb3ZpZGVyLmdldEluc3RhbmNlKCkuZ2V0RHJvcGRvd25TdHlsZShsYXlvdXRDb250YWluZXJJZCk7XHJcbiAgICAgICAgJChcIiNcIitsYXlvdXRDb250YWluZXJJZCkuYXBwZW5kKGRyb3Bkb3duU3R5bGUpOyBcclxuXHJcbiAgICAgICAgVGFiV2lkZ2V0U3R5bGVQcm92aWRlci5nZXRJbnN0YW5jZSgpLnNldE92ZXJ2aWV3RHJvcGRvd25Nb3VzZU92ZXIobGF5b3V0Q29udGFpbmVySWQpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGFkZEl0ZW1Ub0Ryb3Bkb3duKHRhYk5hbWUsIHRhYklkLCBsYXlvdXRDb250YWluZXJJZCwgaWNvblBhdGggPSBcIlwiKXtcclxuICAgICAgICB0aGlzLl9sYXlvdXRDb250YWluZXJJZCA9IGxheW91dENvbnRhaW5lcklkO1xyXG5cclxuICAgICAgICBsZXQgZHJvcGRvd24gPSAkKFwiI1wiK2xheW91dENvbnRhaW5lcklkICsgXCJfZHJvcGRvd25cIikuZGF0YShcImVqRHJvcERvd25MaXN0XCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChkcm9wZG93bi5tb2RlbC5kYXRhU291cmNlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgbGV0IHRleHQgID0gIGA8aW1nIHNyYz1cImAraWNvblBhdGgrYFwiIHN0eWxlPVwid2lkdGg6MTdweDsgZmxvYXQ6bGVmdDsgbWFyZ2luLXJpZ2h0OiA1cHg7IG1hcmdpbi10b3A6IDJweDsgbWFyZ2luLWxlZnQ6IC01cHggXCIgPmAgKyB0YWJOYW1lOyBcclxuICAgICAgICAgICAgZHJvcGRvd24ubW9kZWwuZGF0YVNvdXJjZS5zcGxpY2UoMCwgMCwge2lkIDogdGFiSWQsIHRleHQgOiB0ZXh0LCBpY29uUGF0aDogaWNvblBhdGgsIG5hbWU6IHRhYk5hbWV9KTtcclxuICAgICAgICAgICAgdmFyIGRhdGFTb3VyY2UgPSBkcm9wZG93bi5tb2RlbC5kYXRhU291cmNlO1xyXG4gICAgICAgICAgICBkcm9wZG93bi5tb2RlbC5kYXRhU291cmNlID0gbnVsbDtcclxuICAgICAgICAgICAgZHJvcGRvd24ub3B0aW9uKFwiZGF0YVNvdXJjZVwiLCBkYXRhU291cmNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucmVzZXREcm9wZG93bigpO1xyXG4gICAgICAgIHRoaXMuc2hvd0Ryb3BEb3duTWVudUJ1dHRvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRhYlNlbGVjdGVkKHRhYklkOiBzdHJpbmcpe1xyXG4gICAgICAgIHRhYklkID0gdGFiSWQucmVwbGFjZShcIl90YWJcIiwgXCJcIik7XHJcblxyXG4gICAgICAgIGxldCBpdGVtSWQgPSB0aGlzLmdldEl0ZW1JZEZyb21UYWJJZCh0YWJJZCk7XHJcblxyXG4gICAgICAgIGxldCBkcm9wZG93biA9ICQoXCIjXCIrdGhpcy5fbGF5b3V0Q29udGFpbmVySWQhK1wiX2Ryb3Bkb3duXCIpLmRhdGEoXCJlakRyb3BEb3duTGlzdFwiKTtcclxuICAgICAgICB2YXIgZGF0YVNvdXJjZSA9IGRyb3Bkb3duLm1vZGVsLmRhdGFTb3VyY2U7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yKGxldCBlbGVtZW50IG9mIGRhdGFTb3VyY2Upe1xyXG4gICAgICAgICAgICBlbGVtZW50LnRleHQgPSBlbGVtZW50LnRleHQucmVwbGFjZShcIl9vcmFuZ2Uuc3ZnXCIsIFwiLnN2Z1wiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGRhdGFTb3VyY2VbaXRlbUlkXSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBsZXQgbmV3VGV4dCA9IGRhdGFTb3VyY2VbaXRlbUlkXS50ZXh0LnJlcGxhY2UoXCIuc3ZnXCIsIFwiX29yYW5nZS5zdmdcIik7XHJcbiAgICAgICAgICAgIGRhdGFTb3VyY2VbaXRlbUlkXS50ZXh0ID0gbmV3VGV4dDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRyb3Bkb3duLm9wdGlvbihcImRhdGFTb3VyY2VcIiwgZGF0YVNvdXJjZSwgdHJ1ZSk7XHJcblxyXG4gICAgICAgIHRoaXMucmVzZXREcm9wZG93bigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVzZXREcm9wZG93bigpe1xyXG5cclxuICAgICAgICBsZXQgZHJvcGRvd24gPSAkKFwiI1wiK3RoaXMuX2xheW91dENvbnRhaW5lcklkIStcIl9kcm9wZG93blwiKS5kYXRhKFwiZWpEcm9wRG93bkxpc3RcIik7XHJcblxyXG4gICAgICAgIHZhciBkYXRhU291cmNlID0gZHJvcGRvd24ubW9kZWwuZGF0YVNvdXJjZTtcclxuICAgICAgICBkcm9wZG93bi5tb2RlbC5kYXRhU291cmNlID0gbnVsbDtcclxuICAgICAgICBkcm9wZG93bi5vcHRpb24oXCJkYXRhU291cmNlXCIsIGRhdGFTb3VyY2UsIHRydWUpO1xyXG5cclxuICAgICAgICBsZXQgbGFzdERyb3Bkb3duSXRlbSA9ICQoXCIjXCIrdGhpcy5fbGF5b3V0Q29udGFpbmVySWQhK1wiX2Ryb3Bkb3duX3BvcHVwX3dyYXBwZXJcIikuZmluZChcImxpXCIpLmxhc3QoKTtcclxuICAgICAgICBsYXN0RHJvcGRvd25JdGVtLmh0bWwoVGFiV2lkZ2V0TGF5b3V0UHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXRUYWJPdmVydmlld0Zvb3RlckJ1dHRvbnNUZW1wbGF0ZSh0aGlzLl9sYXlvdXRDb250YWluZXJJZCEhKSk7XHJcblxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBkcm9wZG93bi5tb2RlbC5kYXRhU291cmNlLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGJ1dHRvbk5hbWUgPSBkcm9wZG93bi5tb2RlbC5kYXRhU291cmNlW2ldW1wiaWRcIl1cclxuICAgICAgICAgICAgJChcIiNcIit0aGlzLl9sYXlvdXRDb250YWluZXJJZCErXCJfZHJvcGRvd25MaXN0X2J1dHRvbl9cIitidXR0b25OYW1lKS5lakJ1dHRvbih7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50VHlwZTogXCJpbWFnZW9ubHlcIixcclxuICAgICAgICAgICAgICAgIHByZWZpeEljb246IFwiZS1pY29uIFwiKyB0aGlzLl9sYXlvdXRDb250YWluZXJJZCErXCJfZHJvcGRvd25MaXN0X2J1dHRvbl9cIitidXR0b25OYW1lLFxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBjcmVhdGU6IHRoaXMuc2V0RHJvcGRvd25CdXR0b25TdHlsZSh0aGlzLl9sYXlvdXRDb250YWluZXJJZCErXCJfZHJvcGRvd25MaXN0X2J1dHRvbl9cIitidXR0b25OYW1lLCB0aGlzLl9sYXlvdXRDb250YWluZXJJZCEpLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgJChcIiNcIit0aGlzLl9sYXlvdXRDb250YWluZXJJZCErXCJfZHJvcGRvd25MaXN0X2J1dHRvbl9cIitidXR0b25OYW1lKS5vbihcImNsaWNrXCIsKGU6RXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25DbG9zZVRhYihidXR0b25OYW1lKTt9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgJChcIiNcIit0aGlzLl9sYXlvdXRDb250YWluZXJJZCEgK1wiX2Ryb3Bkb3duX2Nsb3NlQWxsXCIpWzBdLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLChlOkV2ZW50KSA9PiB7dGhpcy5vbkNsb3NlQWxsVGFicyhlKTt9KTtcclxuICAgICAgICAkKFwiI1wiK3RoaXMuX2xheW91dENvbnRhaW5lcklkISArXCJfZHJvcGRvd25fY2xvc2VBbGxPdGhlclwiKVswXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwoZTpFdmVudCkgPT4ge3RoaXMub25DbG9zZUFsbFRhYnNCdXRBY3RpdmUoZSk7fSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gaXRlbU5hbWVcclxuICAgICAqIEBwYXJhbSB7Kn0gbW91c2VXaGVlbENsaWNrZWRcclxuICAgICAqIEBtZW1iZXJvZiBUYWJXaWRnZXRGbGV4RHJvcERvd25cclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlbW92ZUl0ZW1Gcm9tRHJvcGRvd24oaXRlbU5hbWUsIG1vdXNlV2hlZWxDbGlja2VkKXtcclxuICAgICAgICBsZXQgZHJvcGRvd24gPSAkKFwiI1wiK3RoaXMuX2Ryb3BEb3duQ29udGFpbmVySWQpLmRhdGEoXCJlakRyb3BEb3duTGlzdFwiKTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoZHJvcGRvd24ubW9kZWwuZGF0YVNvdXJjZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBkcm9wZG93bi5tb2RlbC5kYXRhU291cmNlIS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBpZihkcm9wZG93bi5tb2RlbC5kYXRhU291cmNlW2ldLmlkID09IGl0ZW1OYW1lKXtcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bi5tb2RlbC5kYXRhU291cmNlLnNwbGljZShpLDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBkYXRhU291cmNlID0gZHJvcGRvd24ubW9kZWwuZGF0YVNvdXJjZTtcclxuICAgICAgICAgICAgZHJvcGRvd24ubW9kZWwuZGF0YVNvdXJjZSA9IG51bGw7XHJcbiAgICAgICAgICAgIGRyb3Bkb3duLm9wdGlvbihcImRhdGFTb3VyY2VcIiwgZGF0YVNvdXJjZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICBcclxuICAgICAgICB0aGlzLnJlc2V0RHJvcGRvd24oKTtcclxuXHJcbiAgICAgICAgaWYoZHJvcGRvd24ubW9kZWwuZGF0YVNvdXJjZS5sZW5ndGggPT0gMSl7XHJcbiAgICAgICAgICAgIGRyb3Bkb3duLmhpZGVQb3B1cCgpO1xyXG4gICAgICAgICAgICB0aGlzLmhpZGVEcm9wRG93bk1lbnVCdXR0b24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZighbW91c2VXaGVlbENsaWNrZWQpe1xyXG4gICAgICAgICAgICBkcm9wZG93bi5oaWRlUG9wdXAoKTtcclxuICAgICAgICAgICAgZHJvcGRvd24uc2hvd1BvcHVwKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGRyb3Bkb3duLmhpZGVQb3B1cCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQ2xvc2VUYWIodGFiTmFtZSl7XHJcbiAgICAgICAgLy9sZXQgdGFiTmFtZSA9IHRoaXMuZ2V0VGFiTmFtZUZyb21DbGlja0V2ZW50KGV2ZW50KTtcclxuICAgICAgICB0aGlzLmV2ZW50VGFiQmFyQ2xvc2VUYWIucmFpc2UodGhpcyx7dGFiTmFtZTogdGFiTmFtZX0pO1xyXG4gICAgICAgIHRoaXMuX2Nsb3NlVGFiQnV0dG9uUHJlc3NlZEZsYWcgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DbG9zZUFsbFRhYnMoZXZlbnQpe1xyXG4gICAgICAgIHRoaXMuZXZlbnRUYWJCYXJDbG9zZUFsbFRhYnMucmFpc2UodGhpcyxldmVudCk7XHJcbiAgICAgICAgdGhpcy5fY2xvc2VUYWJCdXR0b25QcmVzc2VkRmxhZyA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNsb3NlQWxsVGFic0J1dEFjdGl2ZShldmVudCl7XHJcbiAgICAgICAgdGhpcy5ldmVudFRhYkJhckNsb3NlQWxsVGFic0J1dEFjdGl2ZS5yYWlzZSh0aGlzLGV2ZW50KTtcclxuICAgICAgICB0aGlzLl9jbG9zZVRhYkJ1dHRvblByZXNzZWRGbGFnID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldERyb3Bkb3duQnV0dG9uU3R5bGUoYnV0dG9uSWQ6IHN0cmluZywgbGF5b3V0Q29udGFpbmVySWQpe1xyXG4gICAgICAgIGxldCBkcm9wZG93bkJ1dHRvblN0eWxlID0gVGFiV2lkZ2V0U3R5bGVQcm92aWRlci5nZXRJbnN0YW5jZSgpLmdldERyb3Bkb3duQnV0dG9uU3R5bGUoYnV0dG9uSWQpO1xyXG4gICAgICAgICQoXCIjXCIrbGF5b3V0Q29udGFpbmVySWQpLmFwcGVuZChkcm9wZG93bkJ1dHRvblN0eWxlKTtcclxuICAgIH1cclxuXHJcbiAgICBoaWRlRHJvcERvd25NZW51QnV0dG9uKCl7XHJcbiAgICAgICAgJChcIiNcIit0aGlzLl9kcm9wRG93bkNvbnRhaW5lcklkICsgXCJfd3JhcHBlclwiKS5jc3MoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcclxuICAgIH1cclxuICAgIHNob3dEcm9wRG93bk1lbnVCdXR0b24oKXtcclxuICAgICAgICAkKFwiI1wiK3RoaXMuX2Ryb3BEb3duQ29udGFpbmVySWQgKyBcIl93cmFwcGVyXCIpLmNzcyhcImRpc3BsYXlcIiwgXCJibG9ja1wiKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRUYWJOYW1lRnJvbUl0ZW1UZXh0KGl0ZW1UZXh0OiBzdHJpbmcpIDogc3RyaW5ne1xyXG4gICAgICAgIGxldCB0ZXh0ID0gaXRlbVRleHQudHJpbSgpO1xyXG4gICAgICAgIGxldCB3aGl0ZXNwYWNlID0gdGV4dC5pbmRleE9mKCcgJywgMSk7XHJcbiAgICAgICAgbGV0IHRhYk5hbWUgPSBcInRhYl9cIit0ZXh0LnN1YnN0cih3aGl0ZXNwYWNlICsgMSk7XHJcbiAgICAgICAgcmV0dXJuIHRhYk5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VGFiTmFtZUZyb21Ecm9wRG93bkRhdGFNb2RlbFRleHQoaXRlbVRleHQ6IHN0cmluZykgOiBzdHJpbmd7XHJcbiAgICAgICAgbGV0IHRleHQgPSBpdGVtVGV4dC50cmltKCk7XHJcbiAgICAgICAgbGV0IHdoaXRlc3BhY2UgPSB0ZXh0LmluZGV4T2YoJyAnLCAxKTtcclxuICAgICAgICBsZXQgdGFiTmFtZSA9IFwidGFiX1wiK3RleHQuc3Vic3RyKHdoaXRlc3BhY2UgKyAxKTtcclxuICAgICAgICByZXR1cm4gdGFiTmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRUYWJOYW1lRnJvbUNsaWNrRXZlbnQoZXZlbnQpe1xyXG4gICAgICAgIHZhciBzdHIgPSBldmVudC5jdXJyZW50VGFyZ2V0LmlkO1xyXG4gICAgICAgIHZhciBuID0gc3RyLmxhc3RJbmRleE9mKCdfYnV0dG9uXycpO1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBzdHIuc3Vic3RyaW5nKG4gKyA4KTtcclxuICAgICAgICAvL2xldCB0YWJOYW1lID0gZXZlbnQuY3VycmVudFRhcmdldC5pZC5zdWJzdHJpbmcoZXZlbnQuY3VycmVudFRhcmdldC5pZC5sYXN0SW5kZXhPZihcIl9cIikgKyAxKTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIElkIG9mIEVsZW1lbnQgaW4gRHJvcGRvd24gYnkgVGFiSWRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGFiSWRcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgVGFiV2lkZ2V0RmxleERyb3BEb3duXHJcbiAgICAgKi9cclxuICAgIGdldEl0ZW1JZEZyb21UYWJJZCh0YWJJZDogc3RyaW5nKSA6IG51bWJlcntcclxuICAgICAgICBsZXQgZHJvcGRvd24gPSAkKFwiI1wiK3RoaXMuX2Ryb3BEb3duQ29udGFpbmVySWQpLmRhdGEoXCJlakRyb3BEb3duTGlzdFwiKTtcclxuICAgICAgICBsZXQgZGF0YVNvdXJjZSA9IGRyb3Bkb3duLm1vZGVsLmRhdGFTb3VyY2U7XHJcblxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBkYXRhU291cmNlLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYodGFiSWQgPT0gZGF0YVNvdXJjZVtpXS5pZCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxufVxyXG5leHBvcnQge1RhYldpZGdldEZsZXhEcm9wRG93bn07Il19