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
define(["require", "exports", "../../../framework/events", "../tabWidgetStyleProvider"], function (require, exports, events_1, tabWidgetStyleProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventTabWidgetActiveHidden = /** @class */ (function (_super) {
        __extends(EventTabWidgetActiveHidden, _super);
        function EventTabWidgetActiveHidden() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventTabWidgetActiveHidden;
    }(events_1.TypedEvent));
    exports.EventTabWidgetActiveHidden = EventTabWidgetActiveHidden;
    ;
    var EventTabBarTabClicked = /** @class */ (function (_super) {
        __extends(EventTabBarTabClicked, _super);
        function EventTabBarTabClicked() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventTabBarTabClicked;
    }(events_1.TypedEvent));
    exports.EventTabBarTabClicked = EventTabBarTabClicked;
    ;
    var EventTabBarWheelClicked = /** @class */ (function (_super) {
        __extends(EventTabBarWheelClicked, _super);
        function EventTabBarWheelClicked() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventTabBarWheelClicked;
    }(events_1.TypedEvent));
    exports.EventTabBarWheelClicked = EventTabBarWheelClicked;
    ;
    var ITabWidgetTab = /** @class */ (function () {
        function ITabWidgetTab() {
            this.eventTabWidgetActiveHidden = new EventTabWidgetActiveHidden();
            this.eventTabWidgetTabClicked = new EventTabBarTabClicked();
            this.eventTabWidgetTabWheelClicked = new EventTabBarWheelClicked();
            this.isActive = false;
        }
        ITabWidgetTab.prototype.tabClicked = function (tabContainerId) {
            var tabName = tabContainerId = tabContainerId.replace('tab_', '');
            this.eventTabWidgetTabClicked.raise(this, { tabName: tabName });
        };
        ITabWidgetTab.prototype.tabWheelClicked = function (event, tabContainerId) {
            var middleButton = 2;
            if (event.which === middleButton) {
                var tabName = tabContainerId;
                this.eventTabWidgetTabWheelClicked.raise(this, { tabName: tabName });
            }
        };
        ITabWidgetTab.prototype.preventWheelClickScrolling = function (event) {
            var auxiliaryButton = 1;
            if (event.button !== auxiliaryButton) {
                return;
            }
            event.preventDefault();
            event.stopPropagation();
        };
        ITabWidgetTab.prototype.addWidget = function (widget) {
            widget.initialize(this.widgetContainerId);
            this.widget = widget;
        };
        ITabWidgetTab.prototype.setIcon = function (iconPath) {
            $("#" + this.tabContainerId + "_icon").find('img').attr("src", iconPath);
        };
        ITabWidgetTab.prototype.setDisplayNone = function () {
            $("#" + this.tabContainerId).css("display", "none");
        };
        ITabWidgetTab.prototype.removeStyleClassActive = function () {
            $("#" + this.tabContainerId + "_tab").removeClass("active");
        };
        ITabWidgetTab.prototype.setActive = function () {
            tabWidgetStyleProvider_1.TabWidgetStyleProvider.getInstance().setFlexTabActiveTabStyle(this.tabContainerId);
            this.isVisible("setActive");
        };
        return ITabWidgetTab;
    }());
    exports.ITabWidgetTab = ITabWidgetTab;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiV2lkZ2V0VGFiSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RhYldpZGdldC9pbnRlcmZhY2VzL3RhYldpZGdldFRhYkludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBSUE7UUFBeUMsOENBQWlDO1FBQTFFOztRQUEyRSxDQUFDO1FBQUQsaUNBQUM7SUFBRCxDQUFDLEFBQTVFLENBQXlDLG1CQUFVLEdBQXlCO0lBK0QvQixnRUFBMEI7SUEvREssQ0FBQztJQUM3RTtRQUFvQyx5Q0FBaUM7UUFBckU7O1FBQXNFLENBQUM7UUFBRCw0QkFBQztJQUFELENBQUMsQUFBdkUsQ0FBb0MsbUJBQVUsR0FBeUI7SUE4RGhELHNEQUFxQjtJQTlEMkIsQ0FBQztJQUN4RTtRQUFzQywyQ0FBaUM7UUFBdkU7O1FBQXdFLENBQUM7UUFBRCw4QkFBQztJQUFELENBQUMsQUFBekUsQ0FBc0MsbUJBQVUsR0FBeUI7SUE2REEsMERBQXVCO0lBN0R2QixDQUFDO0lBRTFFO1FBQUE7WUFFSSwrQkFBMEIsR0FBK0IsSUFBSSwwQkFBMEIsRUFBRSxDQUFDO1lBQzFGLDZCQUF3QixHQUEwQixJQUFJLHFCQUFxQixFQUFFLENBQUM7WUFDOUUsa0NBQTZCLEdBQTRCLElBQUksdUJBQXVCLEVBQUUsQ0FBQztZQU12RixhQUFRLEdBQVksS0FBSyxDQUFDO1FBZ0Q5QixDQUFDO1FBM0NHLGtDQUFVLEdBQVYsVUFBVyxjQUFjO1lBQ3JCLElBQUksT0FBTyxHQUFHLGNBQWMsR0FBRyxjQUFjLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNsRSxJQUFJLENBQUMsd0JBQXlCLENBQUMsS0FBSyxDQUFDLElBQUksRUFBQyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDO1FBQ2pFLENBQUM7UUFFRCx1Q0FBZSxHQUFmLFVBQWdCLEtBQUssRUFBRSxjQUFjO1lBQ2pDLElBQU0sWUFBWSxHQUFXLENBQUMsQ0FBQztZQUMvQixJQUFJLEtBQUssQ0FBQyxLQUFLLEtBQUssWUFBWSxFQUFDO2dCQUM3QixJQUFJLE9BQU8sR0FBRyxjQUFjLENBQUM7Z0JBQzdCLElBQUksQ0FBQyw2QkFBOEIsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFDLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxDQUFDLENBQUM7YUFDckU7UUFDTCxDQUFDO1FBRUQsa0RBQTBCLEdBQTFCLFVBQTJCLEtBQUs7WUFDNUIsSUFBTSxlQUFlLEdBQVcsQ0FBQyxDQUFDO1lBQ2xDLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxlQUFlLEVBQUM7Z0JBQUMsT0FBTzthQUFDO1lBQzlDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDNUIsQ0FBQztRQUVELGlDQUFTLEdBQVQsVUFBVSxNQUFlO1lBQ3JCLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGlCQUFrQixDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDekIsQ0FBQztRQUVELCtCQUFPLEdBQVAsVUFBUSxRQUFnQjtZQUNwQixDQUFDLENBQUMsR0FBRyxHQUFDLElBQUksQ0FBQyxjQUFlLEdBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUMsUUFBUSxDQUFDLENBQUM7UUFDekUsQ0FBQztRQUVELHNDQUFjLEdBQWQ7WUFDSSxDQUFDLENBQUMsR0FBRyxHQUFDLElBQUksQ0FBQyxjQUFlLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZELENBQUM7UUFFRCw4Q0FBc0IsR0FBdEI7WUFDSSxDQUFDLENBQUMsR0FBRyxHQUFDLElBQUksQ0FBQyxjQUFlLEdBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdELENBQUM7UUFFRCxpQ0FBUyxHQUFUO1lBQ0ksK0NBQXNCLENBQUMsV0FBVyxFQUFFLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLGNBQWUsQ0FBQyxDQUFDO1lBQ3BGLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDaEMsQ0FBQztRQUdMLG9CQUFDO0lBQUQsQ0FBQyxBQTFERCxJQTBEQztJQUNPLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVdpZGdldCB9IGZyb20gXCIuLi8uLi9jb21tb24vaW50ZXJmYWNlcy93aWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvZXZlbnRzXCI7XHJcbmltcG9ydCB7IFRhYldpZGdldFN0eWxlUHJvdmlkZXIgfSBmcm9tIFwiLi4vdGFiV2lkZ2V0U3R5bGVQcm92aWRlclwiO1xyXG5cclxuY2xhc3MgRXZlbnRUYWJXaWRnZXRBY3RpdmVIaWRkZW4gZXh0ZW5kcyBUeXBlZEV2ZW50PElUYWJXaWRnZXRUYWIsIG9iamVjdD57fTtcclxuY2xhc3MgRXZlbnRUYWJCYXJUYWJDbGlja2VkIGV4dGVuZHMgVHlwZWRFdmVudDxJVGFiV2lkZ2V0VGFiLCBvYmplY3Q+e307XHJcbmNsYXNzIEV2ZW50VGFiQmFyV2hlZWxDbGlja2VkIGV4dGVuZHMgVHlwZWRFdmVudDxJVGFiV2lkZ2V0VGFiLCBvYmplY3Q+e307XHJcblxyXG5hYnN0cmFjdCBjbGFzcyBJVGFiV2lkZ2V0VGFie1xyXG4gICAgdGFiTmFtZT86IHN0cmluZztcclxuICAgIGV2ZW50VGFiV2lkZ2V0QWN0aXZlSGlkZGVuOiBFdmVudFRhYldpZGdldEFjdGl2ZUhpZGRlbiA9IG5ldyBFdmVudFRhYldpZGdldEFjdGl2ZUhpZGRlbigpOyAgICBcclxuICAgIGV2ZW50VGFiV2lkZ2V0VGFiQ2xpY2tlZDogRXZlbnRUYWJCYXJUYWJDbGlja2VkID0gbmV3IEV2ZW50VGFiQmFyVGFiQ2xpY2tlZCgpO1xyXG4gICAgZXZlbnRUYWJXaWRnZXRUYWJXaGVlbENsaWNrZWQ6IEV2ZW50VGFiQmFyV2hlZWxDbGlja2VkID0gbmV3IEV2ZW50VGFiQmFyV2hlZWxDbGlja2VkKCk7XHJcblxyXG4gICAgdGFiQ29udGFpbmVySWQ/IDogc3RyaW5nO1xyXG4gICAgd2lkZ2V0Q29udGFpbmVySWQ/OiBzdHJpbmdcclxuICAgIHdpZGdldD86IElXaWRnZXRcclxuXHJcbiAgICBpc0FjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIGFic3RyYWN0IGlzVmlzaWJsZSh0cmlnZ2VyIDogc3RyaW5nKTogYm9vbGVhbjtcclxuICAgIGFic3RyYWN0IGFwcGVuZFRhYkxheW91dChsYXlvdXRDb250YWluZXI6IHN0cmluZywgcGFyZW50Q29pbnRhaW5lcklkOnN0cmluZywgdGFiSUQ6c3RyaW5nLCBkaXNwbGF5TmFtZTogc3RyaW5nKTtcclxuXHJcbiAgICB0YWJDbGlja2VkKHRhYkNvbnRhaW5lcklkKXtcclxuICAgICAgICBsZXQgdGFiTmFtZSA9IHRhYkNvbnRhaW5lcklkID0gdGFiQ29udGFpbmVySWQucmVwbGFjZSgndGFiXycsICcnKTtcclxuICAgICAgICB0aGlzLmV2ZW50VGFiV2lkZ2V0VGFiQ2xpY2tlZCEucmFpc2UodGhpcyx7dGFiTmFtZTp0YWJOYW1lfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGFiV2hlZWxDbGlja2VkKGV2ZW50LCB0YWJDb250YWluZXJJZCl7XHJcbiAgICAgICAgY29uc3QgbWlkZGxlQnV0dG9uOiBudW1iZXIgPSAyO1xyXG4gICAgICAgIGlmIChldmVudC53aGljaCA9PT0gbWlkZGxlQnV0dG9uKXtcclxuICAgICAgICAgICAgbGV0IHRhYk5hbWUgPSB0YWJDb250YWluZXJJZDtcclxuICAgICAgICAgICAgdGhpcy5ldmVudFRhYldpZGdldFRhYldoZWVsQ2xpY2tlZCEucmFpc2UodGhpcyx7dGFiTmFtZTp0YWJOYW1lfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByZXZlbnRXaGVlbENsaWNrU2Nyb2xsaW5nKGV2ZW50KXtcclxuICAgICAgICBjb25zdCBhdXhpbGlhcnlCdXR0b246IG51bWJlciA9IDE7XHJcbiAgICAgICAgaWYgKGV2ZW50LmJ1dHRvbiAhPT0gYXV4aWxpYXJ5QnV0dG9uKXtyZXR1cm47fVxyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkV2lkZ2V0KHdpZGdldDogSVdpZGdldCkge1xyXG4gICAgICAgIHdpZGdldC5pbml0aWFsaXplKHRoaXMud2lkZ2V0Q29udGFpbmVySWQhKTtcclxuICAgICAgICB0aGlzLndpZGdldCA9IHdpZGdldDtcclxuICAgIH1cclxuXHJcbiAgICBzZXRJY29uKGljb25QYXRoOiBzdHJpbmcpIHtcclxuICAgICAgICAkKFwiI1wiK3RoaXMudGFiQ29udGFpbmVySWQhK1wiX2ljb25cIikuZmluZCgnaW1nJykuYXR0cihcInNyY1wiLGljb25QYXRoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXREaXNwbGF5Tm9uZSgpIHtcclxuICAgICAgICAkKFwiI1wiK3RoaXMudGFiQ29udGFpbmVySWQhKS5jc3MoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVTdHlsZUNsYXNzQWN0aXZlKCkge1xyXG4gICAgICAgICQoXCIjXCIrdGhpcy50YWJDb250YWluZXJJZCErXCJfdGFiXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEFjdGl2ZSgpe1xyXG4gICAgICAgIFRhYldpZGdldFN0eWxlUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5zZXRGbGV4VGFiQWN0aXZlVGFiU3R5bGUodGhpcy50YWJDb250YWluZXJJZCEpO1xyXG4gICAgICAgIHRoaXMuaXNWaXNpYmxlKFwic2V0QWN0aXZlXCIpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBcclxufVxyXG5leHBvcnQge0lUYWJXaWRnZXRUYWIsIEV2ZW50VGFiQmFyVGFiQ2xpY2tlZCxFdmVudFRhYldpZGdldEFjdGl2ZUhpZGRlbiwgRXZlbnRUYWJCYXJXaGVlbENsaWNrZWR9Il19