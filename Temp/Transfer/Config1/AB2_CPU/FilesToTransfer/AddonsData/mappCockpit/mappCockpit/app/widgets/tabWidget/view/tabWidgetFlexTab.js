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
define(["require", "exports", "../interfaces/tabWidgetTabInterface", "../tabWidgetStyleProvider", "../layout/tabWidgetLayoutProvider"], function (require, exports, tabWidgetTabInterface_1, tabWidgetStyleProvider_1, tabWidgetLayoutProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EventTabWidgetActiveHidden = tabWidgetTabInterface_1.EventTabWidgetActiveHidden;
    var TabWidgetFlexTab = /** @class */ (function (_super) {
        __extends(TabWidgetFlexTab, _super);
        function TabWidgetFlexTab() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.eventTabWidgetActiveHidden = new tabWidgetTabInterface_1.EventTabWidgetActiveHidden();
            _this.eventTabWidgetTabClicked = new tabWidgetTabInterface_1.EventTabBarTabClicked();
            _this.eventTabWidgetTabWheelClicked = new tabWidgetTabInterface_1.EventTabBarWheelClicked();
            _this.isActive = false;
            _this.dropDownDataSource = [{}];
            return _this;
        }
        TabWidgetFlexTab.prototype.appendTabLayout = function (layoutContainerId, parentCointainerId, tabId, displayName) {
            var _this = this;
            var newLayoutElementId = "tab_" + tabId.replace(" ", "");
            var widgetContaierId = "inner_" + newLayoutElementId;
            var tabContainer = "<div id=\"" + newLayoutElementId + "_tab\" class=\"TopBarTab TopBarFlexTab\"></div>";
            var tabLayout = tabWidgetLayoutProvider_1.TabWidgetLayoutProvider.getInstance().getFlexTabLayout(newLayoutElementId);
            var outerTab = "<div id=\"" + newLayoutElementId + "\" class=\"TopBarContent\" ></div>";
            var innerTab = "<div id=\"" + widgetContaierId + "\"></div>";
            $("#" + parentCointainerId).append(tabContainer);
            $("#" + newLayoutElementId + "_tab").append(tabLayout);
            $("#" + layoutContainerId).append(outerTab);
            $("#" + newLayoutElementId).append(innerTab);
            var t = $("#" + newLayoutElementId + "_tag");
            t.append(displayName);
            //this.dropDownDataSource = [{ text: displayName, value: "tab1" },{ text: displayName+"_2", value: "tab2" }];
            //this.initializeDropdownList(newLayoutElementId);
            tabWidgetStyleProvider_1.TabWidgetStyleProvider.getInstance().setFlexTabStlye(newLayoutElementId);
            this.tabName = tabId;
            this.widgetContainerId = widgetContaierId;
            this.tabContainerId = newLayoutElementId;
            $("#" + this.tabContainerId + "_tab")[0].addEventListener("click", function (e) { return _this.tabClicked(_this.tabContainerId); });
            $("#" + this.tabContainerId + "_tab")[0].addEventListener("mousedown", function (e) { return _this.preventWheelClickScrolling(e); });
            $("#" + this.tabContainerId + "_tab")[0].addEventListener("auxclick", function (e) { return _this.tabWheelClicked(e, _this.tabContainerId); });
        };
        /*initializeDropdownList(newLayoutElementId){
            $("#"+newLayoutElementId+"_tag").ejDropDownList({
                dataSource: this.dropDownDataSource,
                targetID: newLayoutElementId+"_tag_dropdown",
                width: "100%",
                enabled:false,
               
                change: (event) => {
                    console.log($("#"+newLayoutElementId+"_tag_popup_list_wrapper").css("width"));
                },
    
                selectedIndex: 0,
    
            });
        }*/
        /*enableTagDropDown(enable: boolean){
            let dropDownInstance = $("#"+this.tabContainerId+"_tag").ejDropDownList("instance")
            if(enable == true){
               dropDownInstance.enable();
            }
            else{
                dropDownInstance.disable();
            }
        }*/
        TabWidgetFlexTab.prototype.isVisible = function (trigger) {
            //Tab is visibile if it is in the same line as its parent
            var tabObject = $("#" + this.tabContainerId + "_tab")[0];
            //checks of single TabObject is in the same line as the tabWidget
            if (tabObject.offsetTop == tabObject.parentElement.offsetTop) {
                return true;
            }
            this.eventTabWidgetActiveHidden.raise(this, { eventTrigger: trigger });
            return false;
        };
        TabWidgetFlexTab.prototype.setActive = function () {
            _super.prototype.setActive.call(this);
            //this.enableTagDropDown(true);
        };
        return TabWidgetFlexTab;
    }(tabWidgetTabInterface_1.ITabWidgetTab));
    exports.TabWidgetFlexTab = TabWidgetFlexTab;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiV2lkZ2V0RmxleFRhYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy90YWJXaWRnZXQvdmlldy90YWJXaWRnZXRGbGV4VGFiLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFtRzBCLHFDQW5HRixrREFBMEIsQ0FtR0U7SUE1RnBEO1FBQStCLG9DQUFhO1FBQTVDO1lBQUEscUVBMkZDO1lBekZHLGdDQUEwQixHQUFHLElBQUksa0RBQTBCLEVBQUUsQ0FBQztZQUM5RCw4QkFBd0IsR0FBRyxJQUFJLDZDQUFxQixFQUFFLENBQUM7WUFDdkQsbUNBQTZCLEdBQUcsSUFBSSwrQ0FBdUIsRUFBRSxDQUFDO1lBUTlELGNBQVEsR0FBRyxLQUFLLENBQUM7WUFFakIsd0JBQWtCLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7UUE2RTlCLENBQUM7UUEzRUcsMENBQWUsR0FBZixVQUFnQixpQkFBMEIsRUFBQyxrQkFBMEIsRUFBRSxLQUFZLEVBQUUsV0FBbUI7WUFBeEcsaUJBOEJDO1lBNUJHLElBQUksa0JBQWtCLEdBQUcsTUFBTSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3pELElBQUksZ0JBQWdCLEdBQUcsUUFBUSxHQUFHLGtCQUFrQixDQUFDO1lBRXJELElBQUksWUFBWSxHQUFHLFlBQVcsR0FBRSxrQkFBa0IsR0FBQyxpREFBOEMsQ0FBQTtZQUNqRyxJQUFJLFNBQVMsR0FBRyxpREFBdUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQzNGLElBQUksUUFBUSxHQUFHLFlBQVcsR0FBRSxrQkFBa0IsR0FBRyxvQ0FBaUMsQ0FBQztZQUNuRixJQUFJLFFBQVEsR0FBRyxZQUFXLEdBQUUsZ0JBQWdCLEdBQUcsV0FBVSxDQUFDO1lBRTFELENBQUMsQ0FBQyxHQUFHLEdBQUMsa0JBQWtCLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDL0MsQ0FBQyxDQUFDLEdBQUcsR0FBQyxrQkFBa0IsR0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDbkQsQ0FBQyxDQUFDLEdBQUcsR0FBQyxpQkFBaUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMxQyxDQUFDLENBQUMsR0FBRyxHQUFDLGtCQUFrQixDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRTNDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsa0JBQWtCLEdBQUUsTUFBTSxDQUFDLENBQUM7WUFDNUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN0Qiw2R0FBNkc7WUFDN0csa0RBQWtEO1lBRWxELCtDQUFzQixDQUFDLFdBQVcsRUFBRSxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBRXpFLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxnQkFBZ0IsQ0FBQztZQUMxQyxJQUFJLENBQUMsY0FBYyxHQUFHLGtCQUFrQixDQUFDO1lBR3pDLENBQUMsQ0FBQyxHQUFHLEdBQUMsSUFBSSxDQUFDLGNBQWMsR0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBQyxDQUFPLElBQUssT0FBQSxLQUFJLENBQUMsVUFBVSxDQUFDLEtBQUksQ0FBQyxjQUFjLENBQUMsRUFBcEMsQ0FBb0MsQ0FBQyxDQUFDO1lBQ2xILENBQUMsQ0FBQyxHQUFHLEdBQUMsSUFBSSxDQUFDLGNBQWMsR0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUMsVUFBQyxDQUFPLElBQUssT0FBQSxLQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxDQUFDLEVBQWxDLENBQWtDLENBQUMsQ0FBQztZQUNuSCxDQUFDLENBQUMsR0FBRyxHQUFDLElBQUksQ0FBQyxjQUFjLEdBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLFVBQUMsQ0FBTyxJQUFLLE9BQUEsS0FBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLEVBQUUsS0FBSSxDQUFDLGNBQWMsQ0FBQyxFQUE1QyxDQUE0QyxDQUFDLENBQUM7UUFDakksQ0FBQztRQUdEOzs7Ozs7Ozs7Ozs7OztXQWNHO1FBRUg7Ozs7Ozs7O1dBUUc7UUFFSCxvQ0FBUyxHQUFULFVBQVUsT0FBZ0I7WUFDdEIseURBQXlEO1lBQ3pELElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUUsSUFBSSxDQUFDLGNBQWMsR0FBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuRCxpRUFBaUU7WUFDakUsSUFBRyxTQUFTLENBQUMsU0FBUyxJQUFJLFNBQVMsQ0FBQyxhQUFjLENBQUMsU0FBUyxFQUFDO2dCQUN6RCxPQUFPLElBQUksQ0FBQzthQUNmO1lBQ0wsSUFBSSxDQUFDLDBCQUEyQixDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUMsRUFBQyxZQUFZLEVBQUUsT0FBTyxFQUFDLENBQUMsQ0FBQztZQUNyRSxPQUFPLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBRUQsb0NBQVMsR0FBVDtZQUNJLGlCQUFNLFNBQVMsV0FBRSxDQUFDO1lBQ2xCLCtCQUErQjtRQUNuQyxDQUFDO1FBRUwsdUJBQUM7SUFBRCxDQUFDLEFBM0ZELENBQStCLHFDQUFhLEdBMkYzQztJQUNPLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElUYWJXaWRnZXRUYWIsIEV2ZW50VGFiV2lkZ2V0QWN0aXZlSGlkZGVuLCBFdmVudFRhYkJhclRhYkNsaWNrZWQsIEV2ZW50VGFiQmFyV2hlZWxDbGlja2VkIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvdGFiV2lkZ2V0VGFiSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElXaWRnZXQgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2ludGVyZmFjZXMvd2lkZ2V0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFRhYldpZGdldFN0eWxlUHJvdmlkZXIgfSBmcm9tIFwiLi4vdGFiV2lkZ2V0U3R5bGVQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBUYWJXaWRnZXRMYXlvdXRQcm92aWRlciB9IGZyb20gXCIuLi9sYXlvdXQvdGFiV2lkZ2V0TGF5b3V0UHJvdmlkZXJcIjtcclxuXHJcblxyXG5cclxuY2xhc3MgVGFiV2lkZ2V0RmxleFRhYiBleHRlbmRzIElUYWJXaWRnZXRUYWJ7XHJcbiAgIFxyXG4gICAgZXZlbnRUYWJXaWRnZXRBY3RpdmVIaWRkZW4gPSBuZXcgRXZlbnRUYWJXaWRnZXRBY3RpdmVIaWRkZW4oKTtcclxuICAgIGV2ZW50VGFiV2lkZ2V0VGFiQ2xpY2tlZCA9IG5ldyBFdmVudFRhYkJhclRhYkNsaWNrZWQoKTtcclxuICAgIGV2ZW50VGFiV2lkZ2V0VGFiV2hlZWxDbGlja2VkID0gbmV3IEV2ZW50VGFiQmFyV2hlZWxDbGlja2VkKCk7XHJcblxyXG4gICAgdGFiTmFtZT8gOiBzdHJpbmdcclxuICAgIHRhYkNvbnRhaW5lcklkPyA6IHN0cmluZztcclxuICAgIHdpZGdldENvbnRhaW5lcklkPzogc3RyaW5nXHJcbiAgICBcclxuICAgIHdpZGdldD8gOiBJV2lkZ2V0ICAgIFxyXG5cclxuICAgIGlzQWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgZHJvcERvd25EYXRhU291cmNlID0gW3t9XTtcclxuICAgIFxyXG4gICAgYXBwZW5kVGFiTGF5b3V0KGxheW91dENvbnRhaW5lcklkIDogc3RyaW5nLHBhcmVudENvaW50YWluZXJJZDogc3RyaW5nLCB0YWJJZDpzdHJpbmcsIGRpc3BsYXlOYW1lOiBzdHJpbmcpe1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBuZXdMYXlvdXRFbGVtZW50SWQgPSBcInRhYl9cIiArIHRhYklkLnJlcGxhY2UoXCIgXCIsIFwiXCIpO1xyXG4gICAgICAgIHZhciB3aWRnZXRDb250YWllcklkID0gXCJpbm5lcl9cIiArIG5ld0xheW91dEVsZW1lbnRJZDtcclxuXHJcbiAgICAgICAgbGV0IHRhYkNvbnRhaW5lciA9IGA8ZGl2IGlkPVwiYCsgbmV3TGF5b3V0RWxlbWVudElkK2BfdGFiXCIgY2xhc3M9XCJUb3BCYXJUYWIgVG9wQmFyRmxleFRhYlwiPjwvZGl2PmBcclxuICAgICAgICBsZXQgdGFiTGF5b3V0ID0gVGFiV2lkZ2V0TGF5b3V0UHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXRGbGV4VGFiTGF5b3V0KG5ld0xheW91dEVsZW1lbnRJZCk7XHJcbiAgICAgICAgbGV0IG91dGVyVGFiID0gYDxkaXYgaWQ9XCJgKyBuZXdMYXlvdXRFbGVtZW50SWQgKyBgXCIgY2xhc3M9XCJUb3BCYXJDb250ZW50XCIgPjwvZGl2PmA7XHJcbiAgICAgICAgbGV0IGlubmVyVGFiID0gYDxkaXYgaWQ9XCJgKyB3aWRnZXRDb250YWllcklkICsgYFwiPjwvZGl2PmA7XHJcblxyXG4gICAgICAgICQoXCIjXCIrcGFyZW50Q29pbnRhaW5lcklkKS5hcHBlbmQodGFiQ29udGFpbmVyKTtcclxuICAgICAgICAkKFwiI1wiK25ld0xheW91dEVsZW1lbnRJZCtcIl90YWJcIikuYXBwZW5kKHRhYkxheW91dCk7XHJcbiAgICAgICAgJChcIiNcIitsYXlvdXRDb250YWluZXJJZCkuYXBwZW5kKG91dGVyVGFiKTtcclxuICAgICAgICAkKFwiI1wiK25ld0xheW91dEVsZW1lbnRJZCkuYXBwZW5kKGlubmVyVGFiKTtcclxuXHJcbiAgICAgICAgbGV0IHQgPSAkKFwiI1wiICsgbmV3TGF5b3V0RWxlbWVudElkICtcIl90YWdcIik7XHJcbiAgICAgICAgdC5hcHBlbmQoZGlzcGxheU5hbWUpO1xyXG4gICAgICAgIC8vdGhpcy5kcm9wRG93bkRhdGFTb3VyY2UgPSBbeyB0ZXh0OiBkaXNwbGF5TmFtZSwgdmFsdWU6IFwidGFiMVwiIH0seyB0ZXh0OiBkaXNwbGF5TmFtZStcIl8yXCIsIHZhbHVlOiBcInRhYjJcIiB9XTtcclxuICAgICAgICAvL3RoaXMuaW5pdGlhbGl6ZURyb3Bkb3duTGlzdChuZXdMYXlvdXRFbGVtZW50SWQpO1xyXG5cclxuICAgICAgICBUYWJXaWRnZXRTdHlsZVByb3ZpZGVyLmdldEluc3RhbmNlKCkuc2V0RmxleFRhYlN0bHllKG5ld0xheW91dEVsZW1lbnRJZCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy50YWJOYW1lID0gdGFiSWQ7XHJcbiAgICAgICAgdGhpcy53aWRnZXRDb250YWluZXJJZCA9IHdpZGdldENvbnRhaWVySWQ7XHJcbiAgICAgICAgdGhpcy50YWJDb250YWluZXJJZCA9IG5ld0xheW91dEVsZW1lbnRJZDtcclxuXHJcblxyXG4gICAgICAgICQoXCIjXCIrdGhpcy50YWJDb250YWluZXJJZCtcIl90YWJcIilbMF0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlOkV2ZW50KSA9PiB0aGlzLnRhYkNsaWNrZWQodGhpcy50YWJDb250YWluZXJJZCkpO1xyXG4gICAgICAgICQoXCIjXCIrdGhpcy50YWJDb250YWluZXJJZCtcIl90YWJcIilbMF0uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLChlOkV2ZW50KSA9PiB0aGlzLnByZXZlbnRXaGVlbENsaWNrU2Nyb2xsaW5nKGUpKTtcclxuICAgICAgICAkKFwiI1wiK3RoaXMudGFiQ29udGFpbmVySWQrXCJfdGFiXCIpWzBdLmFkZEV2ZW50TGlzdGVuZXIoXCJhdXhjbGlja1wiLCAoZTpFdmVudCkgPT4gdGhpcy50YWJXaGVlbENsaWNrZWQoZSwgdGhpcy50YWJDb250YWluZXJJZCkpOyBcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyppbml0aWFsaXplRHJvcGRvd25MaXN0KG5ld0xheW91dEVsZW1lbnRJZCl7XHJcbiAgICAgICAgJChcIiNcIituZXdMYXlvdXRFbGVtZW50SWQrXCJfdGFnXCIpLmVqRHJvcERvd25MaXN0KHtcclxuICAgICAgICAgICAgZGF0YVNvdXJjZTogdGhpcy5kcm9wRG93bkRhdGFTb3VyY2UsXHJcbiAgICAgICAgICAgIHRhcmdldElEOiBuZXdMYXlvdXRFbGVtZW50SWQrXCJfdGFnX2Ryb3Bkb3duXCIsXHJcbiAgICAgICAgICAgIHdpZHRoOiBcIjEwMCVcIixcclxuICAgICAgICAgICAgZW5hYmxlZDpmYWxzZSxcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgY2hhbmdlOiAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCQoXCIjXCIrbmV3TGF5b3V0RWxlbWVudElkK1wiX3RhZ19wb3B1cF9saXN0X3dyYXBwZXJcIikuY3NzKFwid2lkdGhcIikpO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgc2VsZWN0ZWRJbmRleDogMCxcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9Ki9cclxuXHJcbiAgICAvKmVuYWJsZVRhZ0Ryb3BEb3duKGVuYWJsZTogYm9vbGVhbil7XHJcbiAgICAgICAgbGV0IGRyb3BEb3duSW5zdGFuY2UgPSAkKFwiI1wiK3RoaXMudGFiQ29udGFpbmVySWQrXCJfdGFnXCIpLmVqRHJvcERvd25MaXN0KFwiaW5zdGFuY2VcIilcclxuICAgICAgICBpZihlbmFibGUgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgZHJvcERvd25JbnN0YW5jZS5lbmFibGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgZHJvcERvd25JbnN0YW5jZS5kaXNhYmxlKCk7ICAgIFxyXG4gICAgICAgIH1cclxuICAgIH0qL1xyXG5cclxuICAgIGlzVmlzaWJsZSh0cmlnZ2VyIDogc3RyaW5nKTogYm9vbGVhbntcclxuICAgICAgICAvL1RhYiBpcyB2aXNpYmlsZSBpZiBpdCBpcyBpbiB0aGUgc2FtZSBsaW5lIGFzIGl0cyBwYXJlbnRcclxuICAgICAgICBsZXQgdGFiT2JqZWN0ID0gJChcIiNcIisgdGhpcy50YWJDb250YWluZXJJZCArXCJfdGFiXCIpWzBdO1xyXG4gICAgICAgICAgICAvL2NoZWNrcyBvZiBzaW5nbGUgVGFiT2JqZWN0IGlzIGluIHRoZSBzYW1lIGxpbmUgYXMgdGhlIHRhYldpZGdldFxyXG4gICAgICAgICAgICBpZih0YWJPYmplY3Qub2Zmc2V0VG9wID09IHRhYk9iamVjdC5wYXJlbnRFbGVtZW50IS5vZmZzZXRUb3Ape1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB0aGlzLmV2ZW50VGFiV2lkZ2V0QWN0aXZlSGlkZGVuIS5yYWlzZSh0aGlzLHtldmVudFRyaWdnZXI6IHRyaWdnZXJ9KTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0QWN0aXZlKCl7XHJcbiAgICAgICAgc3VwZXIuc2V0QWN0aXZlKCk7XHJcbiAgICAgICAgLy90aGlzLmVuYWJsZVRhZ0Ryb3BEb3duKHRydWUpO1xyXG4gICAgfVxyXG5cclxufVxyXG5leHBvcnQge1RhYldpZGdldEZsZXhUYWIsIEV2ZW50VGFiV2lkZ2V0QWN0aXZlSGlkZGVufSJdfQ==