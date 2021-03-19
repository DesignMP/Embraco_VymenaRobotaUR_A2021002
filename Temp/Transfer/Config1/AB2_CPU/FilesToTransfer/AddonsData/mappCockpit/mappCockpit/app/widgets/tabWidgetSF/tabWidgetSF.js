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
define(["require", "exports", "../../framework/events", "../common/eventWidgetActivatedArgs", "../common/layoutWidgetBase"], function (require, exports, events_1, eventWidgetActivatedArgs_1, layoutWidgetBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventWidgetActivated = /** @class */ (function (_super) {
        __extends(EventWidgetActivated, _super);
        function EventWidgetActivated() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventWidgetActivated;
    }(events_1.TypedEvent));
    ;
    var EventSizeChanged = /** @class */ (function (_super) {
        __extends(EventSizeChanged, _super);
        function EventSizeChanged() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventSizeChanged;
    }(events_1.TypedEvent));
    ;
    // Declare the initial layout fragment for the tab widget
    var tabBootLayout = '<div><ul></ul></div>';
    /**
     * Implements a widget with alternatively selectable tabs
     *
     * @class TabWidget
     * @implements {TabWidgetInterface}
     */
    var TabWidgetSF = /** @class */ (function (_super) {
        __extends(TabWidgetSF, _super);
        function TabWidgetSF() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // Events
            _this.eventWidgetActivated = new EventWidgetActivated();
            _this.eventSizeChanged = new EventSizeChanged();
            return _this;
        }
        TabWidgetSF.prototype.initialize = function (layoutContainerId) {
            // add initial layout fragment for the tab widget
            var $tabContent = $(tabBootLayout);
            $("#" + layoutContainerId).append($tabContent);
            _super.prototype.initialize.call(this, layoutContainerId);
        };
        /**
         * Creates the layout of the widget
         *
         * @memberof TabWidgetSF
         */
        TabWidgetSF.prototype.createLayout = function () {
            var _this = this;
            // Create the tab widget
            $(this.cssParentContentId).ejTab({
                heightAdjustMode: "None",
                itemActive: function (args) {
                    _this.onTabHasActivated(args.activeIndex);
                },
            });
        };
        TabWidgetSF.prototype.resize = function (width, height) {
            // Set size of tab control itself
            $(this.cssParentContentId)[0].style.width = width + "px";
            $(this.cssParentContentId)[0].style.height = height + "px";
            /*        var ejTabInstance = $(this._parentContentId).data("ejTab");
                    var headerSize = ejTabInstance.option("headerSize");*/
            // Set the sizes of the contents of this tab control
            var tabHeaderSize = 45; // TODO: get actual tab header height( )
            var innerTabWidth = width - 2; // 2px for the border to avoid scrollbars
            var innerTabHeight = height - tabHeaderSize;
            this._widgets.forEach(function (widget) {
                if (widget != undefined) {
                    widget.resize(innerTabWidth, innerTabHeight);
                }
            });
        };
        TabWidgetSF.prototype.addWidget = function (widget, name, viewType) {
            _super.prototype.addWidget.call(this, widget, name, viewType);
            // Add a tab item
            var ejTabInstance = $(this.cssParentContentId).data("ejTab");
            if (ejTabInstance) {
                var ejTabId = "tab_" + name.replace(" ", "");
                ejTabInstance.addItem("#" + ejTabId, name, ejTabInstance.getItemsCount(), "", ejTabId);
                $("#" + ejTabId)[0].style.padding = "0px";
                $("#" + ejTabId)[0].style.overflow = "hidden";
                // add inner element to ej tab element for the content of this tab
                var innerTabId = "inner_" + ejTabId;
                $("#" + ejTabId).append("<div id=\"" + innerTabId + "\" style=\"padding: 0px\"></div>");
                widget.initialize(innerTabId);
            }
        };
        /**
           * Notifies that a tab has activated
           *
           * @private
           */
        TabWidgetSF.prototype.onTabHasActivated = function (activeIndex) {
            var args = new eventWidgetActivatedArgs_1.EventWidgetActivatedArgs(this, "tab has activated", this._widgets.get(activeIndex));
            this.eventWidgetActivated.raise(null, args);
        };
        return TabWidgetSF;
    }(layoutWidgetBase_1.LayoutWidgetBase));
    exports.TabWidgetSF = TabWidgetSF;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiV2lkZ2V0U0YuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvdGFiV2lkZ2V0U0YvdGFiV2lkZ2V0U0YudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQU9BO1FBQW1DLHdDQUEwQztRQUE3RTs7UUFBK0UsQ0FBQztRQUFELDJCQUFDO0lBQUQsQ0FBQyxBQUFoRixDQUFtQyxtQkFBVSxHQUFtQztJQUFBLENBQUM7SUFDakY7UUFBK0Isb0NBQXNCO1FBQXJEOztRQUF1RCxDQUFDO1FBQUQsdUJBQUM7SUFBRCxDQUFDLEFBQXhELENBQStCLG1CQUFVLEdBQWU7SUFBQSxDQUFDO0lBRXpELHlEQUF5RDtJQUN6RCxJQUFNLGFBQWEsR0FBRyxzQkFBc0IsQ0FBQztJQUU3Qzs7Ozs7T0FLRztJQUNIO1FBQTBCLCtCQUFnQjtRQUExQztZQUFBLHFFQTZFQztZQTNFRyxTQUFTO1lBQ1QsMEJBQW9CLEdBQUcsSUFBSSxvQkFBb0IsRUFBRSxDQUFDO1lBQ2xELHNCQUFnQixHQUFHLElBQUksZ0JBQWdCLEVBQUUsQ0FBQzs7UUF5RTlDLENBQUM7UUF2RUcsZ0NBQVUsR0FBVixVQUFXLGlCQUF5QjtZQUVoQyxpREFBaUQ7WUFDakQsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ25DLENBQUMsQ0FBQyxHQUFHLEdBQUcsaUJBQWlCLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7WUFFL0MsaUJBQU0sVUFBVSxZQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDeEMsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSCxrQ0FBWSxHQUFaO1lBQUEsaUJBUUM7WUFQRyx3QkFBd0I7WUFDeEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEtBQUssQ0FBQztnQkFDN0IsZ0JBQWdCLEVBQUUsTUFBTTtnQkFDeEIsVUFBVSxFQUFFLFVB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ZWoud2ViLmFsbC5kLnRzXCIgLz5cclxuaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvZXZlbnRzXCI7XHJcbmltcG9ydCB7IEV2ZW50V2lkZ2V0QWN0aXZhdGVkQXJncyB9IGZyb20gXCIuLi9jb21tb24vZXZlbnRXaWRnZXRBY3RpdmF0ZWRBcmdzXCI7XHJcbmltcG9ydCB7IElXaWRnZXQgfSBmcm9tIFwiLi4vY29tbW9uL2ludGVyZmFjZXMvd2lkZ2V0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IExheW91dFdpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL2xheW91dFdpZGdldEJhc2VcIjtcclxuaW1wb3J0IHsgVmlld1R5cGUgfSBmcm9tIFwiLi4vY29tbW9uL3ZpZXdUeXBlUHJvdmlkZXJcIjtcclxuXHJcbmNsYXNzIEV2ZW50V2lkZ2V0QWN0aXZhdGVkIGV4dGVuZHMgVHlwZWRFdmVudDxudWxsLCBFdmVudFdpZGdldEFjdGl2YXRlZEFyZ3M+eyB9O1xyXG5jbGFzcyBFdmVudFNpemVDaGFuZ2VkIGV4dGVuZHMgVHlwZWRFdmVudDxudWxsLCBudWxsPnsgfTtcclxuXHJcbi8vIERlY2xhcmUgdGhlIGluaXRpYWwgbGF5b3V0IGZyYWdtZW50IGZvciB0aGUgdGFiIHdpZGdldFxyXG5jb25zdCB0YWJCb290TGF5b3V0ID0gJzxkaXY+PHVsPjwvdWw+PC9kaXY+JztcclxuXHJcbi8qKlxyXG4gKiBJbXBsZW1lbnRzIGEgd2lkZ2V0IHdpdGggYWx0ZXJuYXRpdmVseSBzZWxlY3RhYmxlIHRhYnNcclxuICpcclxuICogQGNsYXNzIFRhYldpZGdldFxyXG4gKiBAaW1wbGVtZW50cyB7VGFiV2lkZ2V0SW50ZXJmYWNlfVxyXG4gKi9cclxuY2xhc3MgVGFiV2lkZ2V0U0YgZXh0ZW5kcyBMYXlvdXRXaWRnZXRCYXNlIHtcclxuXHJcbiAgICAvLyBFdmVudHNcclxuICAgIGV2ZW50V2lkZ2V0QWN0aXZhdGVkID0gbmV3IEV2ZW50V2lkZ2V0QWN0aXZhdGVkKCk7XHJcbiAgICBldmVudFNpemVDaGFuZ2VkID0gbmV3IEV2ZW50U2l6ZUNoYW5nZWQoKTtcclxuXHJcbiAgICBpbml0aWFsaXplKGxheW91dENvbnRhaW5lcklkOiBzdHJpbmcpIHtcclxuXHJcbiAgICAgICAgLy8gYWRkIGluaXRpYWwgbGF5b3V0IGZyYWdtZW50IGZvciB0aGUgdGFiIHdpZGdldFxyXG4gICAgICAgIHZhciAkdGFiQ29udGVudCA9ICQodGFiQm9vdExheW91dCk7XHJcbiAgICAgICAgJChcIiNcIiArIGxheW91dENvbnRhaW5lcklkKS5hcHBlbmQoJHRhYkNvbnRlbnQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgbGF5b3V0IG9mIHRoZSB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgVGFiV2lkZ2V0U0ZcclxuICAgICAqL1xyXG4gICAgY3JlYXRlTGF5b3V0KCkge1xyXG4gICAgICAgIC8vIENyZWF0ZSB0aGUgdGFiIHdpZGdldFxyXG4gICAgICAgICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpLmVqVGFiKHtcclxuICAgICAgICAgICAgaGVpZ2h0QWRqdXN0TW9kZTogXCJOb25lXCIsXHJcbiAgICAgICAgICAgIGl0ZW1BY3RpdmU6IChhcmdzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uVGFiSGFzQWN0aXZhdGVkKGFyZ3MuYWN0aXZlSW5kZXgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc2l6ZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcil7XHJcbiAgICAgICAgLy8gU2V0IHNpemUgb2YgdGFiIGNvbnRyb2wgaXRzZWxmXHJcbiAgICAgICAgJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZClbMF0uc3R5bGUud2lkdGggPSB3aWR0aCArIFwicHhcIjtcclxuICAgICAgICAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKVswXS5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyBcInB4XCI7XHJcblxyXG4vKiAgICAgICAgdmFyIGVqVGFiSW5zdGFuY2UgPSAkKHRoaXMuX3BhcmVudENvbnRlbnRJZCkuZGF0YShcImVqVGFiXCIpO1xyXG4gICAgICAgIHZhciBoZWFkZXJTaXplID0gZWpUYWJJbnN0YW5jZS5vcHRpb24oXCJoZWFkZXJTaXplXCIpOyovIFxyXG4gICAgICAgIC8vIFNldCB0aGUgc2l6ZXMgb2YgdGhlIGNvbnRlbnRzIG9mIHRoaXMgdGFiIGNvbnRyb2xcclxuICAgICAgICB2YXIgdGFiSGVhZGVyU2l6ZSA9IDQ1OyAvLyBUT0RPOiBnZXQgYWN0dWFsIHRhYiBoZWFkZXIgaGVpZ2h0KCApXHJcbiAgICAgICAgdmFyIGlubmVyVGFiV2lkdGggPSB3aWR0aC0yOyAvLyAycHggZm9yIHRoZSBib3JkZXIgdG8gYXZvaWQgc2Nyb2xsYmFyc1xyXG4gICAgICAgIHZhciBpbm5lclRhYkhlaWdodCA9IGhlaWdodC10YWJIZWFkZXJTaXplO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX3dpZGdldHMuZm9yRWFjaCgod2lkZ2V0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHdpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgd2lkZ2V0LnJlc2l6ZShpbm5lclRhYldpZHRoLCBpbm5lclRhYkhlaWdodCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgYWRkV2lkZ2V0KHdpZGdldDogSVdpZGdldCwgbmFtZTogc3RyaW5nLCB2aWV3VHlwZTogVmlld1R5cGUpIHtcclxuXHJcbiAgICAgICAgc3VwZXIuYWRkV2lkZ2V0KHdpZGdldCwgbmFtZSwgdmlld1R5cGUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIEFkZCBhIHRhYiBpdGVtXHJcbiAgICAgICAgdmFyIGVqVGFiSW5zdGFuY2UgPSAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKS5kYXRhKFwiZWpUYWJcIik7XHJcbiAgICAgICAgaWYgKGVqVGFiSW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgdmFyIGVqVGFiSWQgPSBcInRhYl9cIiArIG5hbWUucmVwbGFjZShcIiBcIiwgXCJcIik7XHJcbiAgICAgICAgICAgIGVqVGFiSW5zdGFuY2UuYWRkSXRlbShcIiNcIiArIGVqVGFiSWQsIG5hbWUsIGVqVGFiSW5zdGFuY2UuZ2V0SXRlbXNDb3VudCgpLCBcIlwiLCBlalRhYklkKTtcclxuICAgICAgICAgICAgJChcIiNcIiArIGVqVGFiSWQpWzBdLnN0eWxlLnBhZGRpbmcgPSBcIjBweFwiO1xyXG4gICAgICAgICAgICAkKFwiI1wiICsgZWpUYWJJZClbMF0uc3R5bGUub3ZlcmZsb3cgPVwiaGlkZGVuXCI7XHJcblxyXG4gICAgICAgICAgICAvLyBhZGQgaW5uZXIgZWxlbWVudCB0byBlaiB0YWIgZWxlbWVudCBmb3IgdGhlIGNvbnRlbnQgb2YgdGhpcyB0YWJcclxuICAgICAgICAgICAgdmFyIGlubmVyVGFiSWQgPSBcImlubmVyX1wiICsgZWpUYWJJZDtcclxuICAgICAgICAgICAgJChcIiNcIiArIGVqVGFiSWQpLmFwcGVuZChgPGRpdiBpZD1cImArIGlubmVyVGFiSWQgKyBgXCIgc3R5bGU9XCJwYWRkaW5nOiAwcHhcIj48L2Rpdj5gKTtcclxuICAgICAgICAgICAgd2lkZ2V0LmluaXRpYWxpemUoaW5uZXJUYWJJZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuLyoqXHJcbiAgICogTm90aWZpZXMgdGhhdCBhIHRhYiBoYXMgYWN0aXZhdGVkXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25UYWJIYXNBY3RpdmF0ZWQoYWN0aXZlSW5kZXgpIHtcclxuICAgIHZhciBhcmdzID0gbmV3IEV2ZW50V2lkZ2V0QWN0aXZhdGVkQXJncyh0aGlzLCBcInRhYiBoYXMgYWN0aXZhdGVkXCIsIHRoaXMuX3dpZGdldHMuZ2V0KGFjdGl2ZUluZGV4KSk7XHJcbiAgICB0aGlzLmV2ZW50V2lkZ2V0QWN0aXZhdGVkLnJhaXNlKG51bGwsIGFyZ3MpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IHsgVGFiV2lkZ2V0U0YgfTsiXX0=