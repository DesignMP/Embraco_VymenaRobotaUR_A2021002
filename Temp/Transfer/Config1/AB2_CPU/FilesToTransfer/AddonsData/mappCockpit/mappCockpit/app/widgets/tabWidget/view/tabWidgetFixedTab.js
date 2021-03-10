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
define(["require", "exports", "../interfaces/tabWidgetTabInterface"], function (require, exports, tabWidgetTabInterface_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TabWidgetFixedTab = /** @class */ (function (_super) {
        __extends(TabWidgetFixedTab, _super);
        function TabWidgetFixedTab() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.isActive = false;
            return _this;
        }
        TabWidgetFixedTab.prototype.appendTabLayout = function (layoutContainerId, parentCointainerId, tabName) {
            var _this = this;
            var newLayoutElementId = "tab_" + tabName.replace(" ", "");
            var widgetContaierId = "inner_" + newLayoutElementId;
            var tabContainer = "<div id=\"" + newLayoutElementId + "_tab\" class=\"TopBarTab\"></div>";
            $("#" + parentCointainerId).append(tabContainer);
            var navIcon = "<div id=\"" + newLayoutElementId + "_icon\" class=\"icon48 topBarNavigationElement\"><img src=\"\"></div>";
            $("#" + newLayoutElementId + "_tab").append(navIcon);
            this.widgetContainerId = widgetContaierId;
            this.tabContainerId = newLayoutElementId;
            var outerTab = "<div id=\"" + newLayoutElementId + "\" class=\"TopBarContent\" ></div>";
            $("#" + layoutContainerId).append(outerTab);
            if (!$("#" + widgetContaierId).length) {
                var innerTab = "<div id=\"" + widgetContaierId + "\"></div>";
                $("#" + newLayoutElementId).append(innerTab);
            }
            $("#" + $.escapeSelector(this.tabContainerId + "_tab"))[0].addEventListener("click", function (e) { return _this.tabClicked(_this.tabContainerId); });
        };
        TabWidgetFixedTab.prototype.isVisible = function () {
            return true;
        };
        return TabWidgetFixedTab;
    }(tabWidgetTabInterface_1.ITabWidgetTab));
    exports.TabWidgetFixedTab = TabWidgetFixedTab;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiV2lkZ2V0Rml4ZWRUYWIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvdGFiV2lkZ2V0L3ZpZXcvdGFiV2lkZ2V0Rml4ZWRUYWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUlBO1FBQWdDLHFDQUFhO1FBQTdDO1lBQUEscUVBdUNDO1lBakNHLGNBQVEsR0FBWSxLQUFLLENBQUM7O1FBaUM5QixDQUFDO1FBL0JHLDJDQUFlLEdBQWYsVUFBZ0IsaUJBQXlCLEVBQUUsa0JBQTBCLEVBQUUsT0FBZTtZQUF0RixpQkF5QkM7WUF4QkcsSUFBSSxrQkFBa0IsR0FBRyxNQUFNLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDM0QsSUFBSSxnQkFBZ0IsR0FBRyxRQUFRLEdBQUcsa0JBQWtCLENBQUM7WUFFckQsSUFBSSxZQUFZLEdBQUcsWUFBVyxHQUFHLGtCQUFrQixHQUFDLG1DQUFnQyxDQUFBO1lBQ3BGLENBQUMsQ0FBQyxHQUFHLEdBQUMsa0JBQWtCLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7WUFFL0MsSUFBSSxPQUFPLEdBQUUsWUFBVyxHQUFFLGtCQUFrQixHQUFDLHVFQUFrRSxDQUFBO1lBRS9HLENBQUMsQ0FBQyxHQUFHLEdBQUMsa0JBQWtCLEdBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRWpELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxnQkFBZ0IsQ0FBQztZQUMxQyxJQUFJLENBQUMsY0FBYyxHQUFHLGtCQUFrQixDQUFDO1lBR3pDLElBQUksUUFBUSxHQUFHLFlBQVcsR0FBRSxrQkFBa0IsR0FBRyxvQ0FBaUMsQ0FBQztZQUNuRixDQUFDLENBQUMsR0FBRyxHQUFDLGlCQUFpQixDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRTFDLElBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFDLGdCQUFnQixDQUFDLENBQUMsTUFBTSxFQUFFO2dCQUNoQyxJQUFJLFFBQVEsR0FBRyxZQUFXLEdBQUUsZ0JBQWdCLEdBQUcsV0FBVSxDQUFDO2dCQUMxRCxDQUFDLENBQUMsR0FBRyxHQUFDLGtCQUFrQixDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzlDO1lBRUQsQ0FBQyxDQUFDLEdBQUcsR0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxjQUFjLEdBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBQyxDQUFPLElBQUssT0FBQSxLQUFJLENBQUMsVUFBVSxDQUFDLEtBQUksQ0FBQyxjQUFjLENBQUMsRUFBcEMsQ0FBb0MsQ0FBQyxDQUFDO1FBRXhJLENBQUM7UUFFRCxxQ0FBUyxHQUFUO1lBQ0ksT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUVMLHdCQUFDO0lBQUQsQ0FBQyxBQXZDRCxDQUFnQyxxQ0FBYSxHQXVDNUM7SUFDTyw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJVGFiV2lkZ2V0VGFiIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvdGFiV2lkZ2V0VGFiSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElXaWRnZXQgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2ludGVyZmFjZXMvd2lkZ2V0SW50ZXJmYWNlXCI7XHJcblxyXG5cclxuY2xhc3MgVGFiV2lkZ2V0Rml4ZWRUYWIgZXh0ZW5kcyBJVGFiV2lkZ2V0VGFie1xyXG4gICAgXHJcbiAgICB0YWJDb250YWluZXJJZD86IHN0cmluZyB8IHVuZGVmaW5lZDtcclxuICAgIHdpZGdldENvbnRhaW5lcklkPzogc3RyaW5nIHwgdW5kZWZpbmVkO1xyXG4gICAgd2lkZ2V0PzogSVdpZGdldCB8IHVuZGVmaW5lZDtcclxuICAgIFxyXG4gICAgaXNBY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBhcHBlbmRUYWJMYXlvdXQobGF5b3V0Q29udGFpbmVySWQ6IHN0cmluZywgcGFyZW50Q29pbnRhaW5lcklkOiBzdHJpbmcsIHRhYk5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHZhciBuZXdMYXlvdXRFbGVtZW50SWQgPSBcInRhYl9cIiArIHRhYk5hbWUucmVwbGFjZShcIiBcIiwgXCJcIik7XHJcbiAgICAgICAgdmFyIHdpZGdldENvbnRhaWVySWQgPSBcImlubmVyX1wiICsgbmV3TGF5b3V0RWxlbWVudElkO1xyXG5cclxuICAgICAgICBsZXQgdGFiQ29udGFpbmVyID0gYDxkaXYgaWQ9XCJgICsgbmV3TGF5b3V0RWxlbWVudElkK2BfdGFiXCIgY2xhc3M9XCJUb3BCYXJUYWJcIj48L2Rpdj5gXHJcbiAgICAgICAgJChcIiNcIitwYXJlbnRDb2ludGFpbmVySWQpLmFwcGVuZCh0YWJDb250YWluZXIpO1xyXG5cclxuICAgICAgICBsZXQgbmF2SWNvbj0gYDxkaXYgaWQ9XCJgKyBuZXdMYXlvdXRFbGVtZW50SWQrYF9pY29uXCIgY2xhc3M9XCJpY29uNDggdG9wQmFyTmF2aWdhdGlvbkVsZW1lbnRcIj48aW1nIHNyYz1cIlwiPjwvZGl2PmBcclxuXHJcbiAgICAgICAgJChcIiNcIituZXdMYXlvdXRFbGVtZW50SWQrXCJfdGFiXCIpLmFwcGVuZChuYXZJY29uKTtcclxuXHJcbiAgICAgICAgdGhpcy53aWRnZXRDb250YWluZXJJZCA9IHdpZGdldENvbnRhaWVySWQ7XHJcbiAgICAgICAgdGhpcy50YWJDb250YWluZXJJZCA9IG5ld0xheW91dEVsZW1lbnRJZDtcclxuXHJcblxyXG4gICAgICAgIGxldCBvdXRlclRhYiA9IGA8ZGl2IGlkPVwiYCsgbmV3TGF5b3V0RWxlbWVudElkICsgYFwiIGNsYXNzPVwiVG9wQmFyQ29udGVudFwiID48L2Rpdj5gO1xyXG4gICAgICAgICQoXCIjXCIrbGF5b3V0Q29udGFpbmVySWQpLmFwcGVuZChvdXRlclRhYik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoISQoXCIjXCIrd2lkZ2V0Q29udGFpZXJJZCkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGxldCBpbm5lclRhYiA9IGA8ZGl2IGlkPVwiYCsgd2lkZ2V0Q29udGFpZXJJZCArIGBcIj48L2Rpdj5gO1xyXG4gICAgICAgICAgICAkKFwiI1wiK25ld0xheW91dEVsZW1lbnRJZCkuYXBwZW5kKGlubmVyVGFiKTsgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgXHJcbiAgICAgICAgJChcIiNcIiskLmVzY2FwZVNlbGVjdG9yKHRoaXMudGFiQ29udGFpbmVySWQrXCJfdGFiXCIpKVswXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGU6RXZlbnQpID0+IHRoaXMudGFiQ2xpY2tlZCh0aGlzLnRhYkNvbnRhaW5lcklkKSk7XHJcblxyXG4gICAgfVxyXG4gICBcclxuICAgIGlzVmlzaWJsZSgpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxufVxyXG5leHBvcnQge1RhYldpZGdldEZpeGVkVGFifVxyXG4iXX0=