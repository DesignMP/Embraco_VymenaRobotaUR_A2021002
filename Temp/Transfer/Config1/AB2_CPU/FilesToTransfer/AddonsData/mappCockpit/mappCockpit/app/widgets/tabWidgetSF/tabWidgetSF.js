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
            for (var key in this._widgets) {
                var widget = this._widgets[key];
                if (widget != undefined) {
                    widget.resize(innerTabWidth, innerTabHeight);
                }
            }
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
            var args = new eventWidgetActivatedArgs_1.EventWidgetActivatedArgs(this, "tab has activated", this._widgets[activeIndex]);
            this.eventWidgetActivated.raise(null, args);
        };
        return TabWidgetSF;
    }(layoutWidgetBase_1.LayoutWidgetBase));
    exports.TabWidgetSF = TabWidgetSF;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiV2lkZ2V0U0YuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvdGFiV2lkZ2V0U0YvdGFiV2lkZ2V0U0YudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQU9BO1FBQW1DLHdDQUEwQztRQUE3RTs7UUFBK0UsQ0FBQztRQUFELDJCQUFDO0lBQUQsQ0FBQyxBQUFoRixDQUFtQyxtQkFBVSxHQUFtQztJQUFBLENBQUM7SUFDakY7UUFBK0Isb0NBQXNCO1FBQXJEOztRQUF1RCxDQUFDO1FBQUQsdUJBQUM7SUFBRCxDQUFDLEFBQXhELENBQStCLG1CQUFVLEdBQWU7SUFBQSxDQUFDO0lBRXpELHlEQUF5RDtJQUN6RCxJQUFNLGFBQWEsR0FBRyxzQkFBc0IsQ0FBQztJQUU3Qzs7Ozs7T0FLRztJQUNIO1FBQTBCLCtCQUFnQjtRQUExQztZQUFBLHFFQThFQztZQTVFRyxTQUFTO1lBQ1QsMEJBQW9CLEdBQUcsSUFBSSxvQkFBb0IsRUFBRSxDQUFDO1lBQ2xELHNCQUFnQixHQUFHLElBQUksZ0JBQWdCLEVBQUUsQ0FBQzs7UUEwRTlDLENBQUM7UUF4RUcsZ0NBQVUsR0FBVixVQUFXLGlCQUF5QjtZQUVoQyxpREFBaUQ7WUFDakQsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ25DLENBQUMsQ0FBQyxHQUFHLEdBQUcsaUJBQWlCLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7WUFFL0MsaUJBQU0sVUFBVSxZQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDeEMsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSCxrQ0FBWSxHQUFaO1lBQUEsaUJBUUM7WUFQRyx3QkFBd0I7WUFDeEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEtBQUssQ0FBQztnQkFDN0IsZ0JBQWdCLEVBQUUsTUFBTTtnQkFDeEIsVUFBVSxFQUFFLFVB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ZW5jZSBwYXRoPVwiLi4vLi4vbGlicy91aS9UeXBlcy9lai53ZWIuYWxsLmQudHNcIiAvPlxyXG5pbXBvcnQgeyBUeXBlZEV2ZW50IH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9ldmVudHNcIjtcclxuaW1wb3J0IHsgRXZlbnRXaWRnZXRBY3RpdmF0ZWRBcmdzIH0gZnJvbSBcIi4uL2NvbW1vbi9ldmVudFdpZGdldEFjdGl2YXRlZEFyZ3NcIjtcclxuaW1wb3J0IHsgSVdpZGdldCB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy93aWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgTGF5b3V0V2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vbGF5b3V0V2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBWaWV3VHlwZSB9IGZyb20gXCIuLi9jb21tb24vdmlld1R5cGVQcm92aWRlclwiO1xyXG5cclxuY2xhc3MgRXZlbnRXaWRnZXRBY3RpdmF0ZWQgZXh0ZW5kcyBUeXBlZEV2ZW50PG51bGwsIEV2ZW50V2lkZ2V0QWN0aXZhdGVkQXJncz57IH07XHJcbmNsYXNzIEV2ZW50U2l6ZUNoYW5nZWQgZXh0ZW5kcyBUeXBlZEV2ZW50PG51bGwsIG51bGw+eyB9O1xyXG5cclxuLy8gRGVjbGFyZSB0aGUgaW5pdGlhbCBsYXlvdXQgZnJhZ21lbnQgZm9yIHRoZSB0YWIgd2lkZ2V0XHJcbmNvbnN0IHRhYkJvb3RMYXlvdXQgPSAnPGRpdj48dWw+PC91bD48L2Rpdj4nO1xyXG5cclxuLyoqXHJcbiAqIEltcGxlbWVudHMgYSB3aWRnZXQgd2l0aCBhbHRlcm5hdGl2ZWx5IHNlbGVjdGFibGUgdGFic1xyXG4gKlxyXG4gKiBAY2xhc3MgVGFiV2lkZ2V0XHJcbiAqIEBpbXBsZW1lbnRzIHtUYWJXaWRnZXRJbnRlcmZhY2V9XHJcbiAqL1xyXG5jbGFzcyBUYWJXaWRnZXRTRiBleHRlbmRzIExheW91dFdpZGdldEJhc2Uge1xyXG5cclxuICAgIC8vIEV2ZW50c1xyXG4gICAgZXZlbnRXaWRnZXRBY3RpdmF0ZWQgPSBuZXcgRXZlbnRXaWRnZXRBY3RpdmF0ZWQoKTtcclxuICAgIGV2ZW50U2l6ZUNoYW5nZWQgPSBuZXcgRXZlbnRTaXplQ2hhbmdlZCgpO1xyXG5cclxuICAgIGluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQ6IHN0cmluZykge1xyXG5cclxuICAgICAgICAvLyBhZGQgaW5pdGlhbCBsYXlvdXQgZnJhZ21lbnQgZm9yIHRoZSB0YWIgd2lkZ2V0XHJcbiAgICAgICAgdmFyICR0YWJDb250ZW50ID0gJCh0YWJCb290TGF5b3V0KTtcclxuICAgICAgICAkKFwiI1wiICsgbGF5b3V0Q29udGFpbmVySWQpLmFwcGVuZCgkdGFiQ29udGVudCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZShsYXlvdXRDb250YWluZXJJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBsYXlvdXQgb2YgdGhlIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBUYWJXaWRnZXRTRlxyXG4gICAgICovXHJcbiAgICBjcmVhdGVMYXlvdXQoKSB7XHJcbiAgICAgICAgLy8gQ3JlYXRlIHRoZSB0YWIgd2lkZ2V0XHJcbiAgICAgICAgJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCkuZWpUYWIoe1xyXG4gICAgICAgICAgICBoZWlnaHRBZGp1c3RNb2RlOiBcIk5vbmVcIixcclxuICAgICAgICAgICAgaXRlbUFjdGl2ZTogKGFyZ3MpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25UYWJIYXNBY3RpdmF0ZWQoYXJncy5hY3RpdmVJbmRleCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzaXplKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKXtcclxuICAgICAgICAvLyBTZXQgc2l6ZSBvZiB0YWIgY29udHJvbCBpdHNlbGZcclxuICAgICAgICAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKVswXS5zdHlsZS53aWR0aCA9IHdpZHRoICsgXCJweFwiO1xyXG4gICAgICAgICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpWzBdLnN0eWxlLmhlaWdodCA9IGhlaWdodCArIFwicHhcIjtcclxuXHJcbi8qICAgICAgICB2YXIgZWpUYWJJbnN0YW5jZSA9ICQodGhpcy5fcGFyZW50Q29udGVudElkKS5kYXRhKFwiZWpUYWJcIik7XHJcbiAgICAgICAgdmFyIGhlYWRlclNpemUgPSBlalRhYkluc3RhbmNlLm9wdGlvbihcImhlYWRlclNpemVcIik7Ki8gXHJcbiAgICAgICAgLy8gU2V0IHRoZSBzaXplcyBvZiB0aGUgY29udGVudHMgb2YgdGhpcyB0YWIgY29udHJvbFxyXG4gICAgICAgIHZhciB0YWJIZWFkZXJTaXplID0gNDU7IC8vIFRPRE86IGdldCBhY3R1YWwgdGFiIGhlYWRlciBoZWlnaHQoIClcclxuICAgICAgICB2YXIgaW5uZXJUYWJXaWR0aCA9IHdpZHRoLTI7IC8vIDJweCBmb3IgdGhlIGJvcmRlciB0byBhdm9pZCBzY3JvbGxiYXJzXHJcbiAgICAgICAgdmFyIGlubmVyVGFiSGVpZ2h0ID0gaGVpZ2h0LXRhYkhlYWRlclNpemU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMuX3dpZGdldHMpIHtcclxuICAgICAgICAgICAgbGV0IHdpZGdldCA9IHRoaXMuX3dpZGdldHNba2V5XTtcclxuICAgICAgICAgICAgaWYod2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICB3aWRnZXQucmVzaXplKGlubmVyVGFiV2lkdGgsIGlubmVyVGFiSGVpZ2h0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgYWRkV2lkZ2V0KHdpZGdldDogSVdpZGdldCwgbmFtZTogc3RyaW5nLCB2aWV3VHlwZTogVmlld1R5cGUpIHtcclxuXHJcbiAgICAgICAgc3VwZXIuYWRkV2lkZ2V0KHdpZGdldCwgbmFtZSwgdmlld1R5cGUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIEFkZCBhIHRhYiBpdGVtXHJcbiAgICAgICAgdmFyIGVqVGFiSW5zdGFuY2UgPSAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKS5kYXRhKFwiZWpUYWJcIik7XHJcbiAgICAgICAgaWYgKGVqVGFiSW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgdmFyIGVqVGFiSWQgPSBcInRhYl9cIiArIG5hbWUucmVwbGFjZShcIiBcIiwgXCJcIik7XHJcbiAgICAgICAgICAgIGVqVGFiSW5zdGFuY2UuYWRkSXRlbShcIiNcIiArIGVqVGFiSWQsIG5hbWUsIGVqVGFiSW5zdGFuY2UuZ2V0SXRlbXNDb3VudCgpLCBcIlwiLCBlalRhYklkKTtcclxuICAgICAgICAgICAgJChcIiNcIiArIGVqVGFiSWQpWzBdLnN0eWxlLnBhZGRpbmcgPSBcIjBweFwiO1xyXG4gICAgICAgICAgICAkKFwiI1wiICsgZWpUYWJJZClbMF0uc3R5bGUub3ZlcmZsb3cgPVwiaGlkZGVuXCI7XHJcblxyXG4gICAgICAgICAgICAvLyBhZGQgaW5uZXIgZWxlbWVudCB0byBlaiB0YWIgZWxlbWVudCBmb3IgdGhlIGNvbnRlbnQgb2YgdGhpcyB0YWJcclxuICAgICAgICAgICAgdmFyIGlubmVyVGFiSWQgPSBcImlubmVyX1wiICsgZWpUYWJJZDtcclxuICAgICAgICAgICAgJChcIiNcIiArIGVqVGFiSWQpLmFwcGVuZChgPGRpdiBpZD1cImArIGlubmVyVGFiSWQgKyBgXCIgc3R5bGU9XCJwYWRkaW5nOiAwcHhcIj48L2Rpdj5gKTtcclxuICAgICAgICAgICAgd2lkZ2V0LmluaXRpYWxpemUoaW5uZXJUYWJJZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuLyoqXHJcbiAgICogTm90aWZpZXMgdGhhdCBhIHRhYiBoYXMgYWN0aXZhdGVkXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25UYWJIYXNBY3RpdmF0ZWQoYWN0aXZlSW5kZXgpIHtcclxuICAgIHZhciBhcmdzID0gbmV3IEV2ZW50V2lkZ2V0QWN0aXZhdGVkQXJncyh0aGlzLCBcInRhYiBoYXMgYWN0aXZhdGVkXCIsIHRoaXMuX3dpZGdldHNbYWN0aXZlSW5kZXhdKTtcclxuICAgIHRoaXMuZXZlbnRXaWRnZXRBY3RpdmF0ZWQucmFpc2UobnVsbCwgYXJncyk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBUYWJXaWRnZXRTRiB9OyJdfQ==