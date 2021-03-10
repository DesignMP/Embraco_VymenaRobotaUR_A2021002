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
define(["require", "exports", "../common/layoutWidgetBase", "../../framework/events", "../common/viewTypeProvider", "../common/uniqueIdGenerator"], function (require, exports, layoutWidgetBase_1, events_1, viewTypeProvider_1, uniqueIdGenerator_1) {
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
    var mainNavigationClassName = "mainNavigation";
    exports.mainNavigationClassName = mainNavigationClassName;
    var SideBarWidget = /** @class */ (function (_super) {
        __extends(SideBarWidget, _super);
        function SideBarWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // Events
            _this.eventWidgetActivated = new EventWidgetActivated();
            _this.eventSizeChanged = new EventSizeChanged();
            //_widgets: { [id: number]: IWidget; } = {};
            _this._widgets = new Array();
            return _this;
        }
        /**
         *
         *
         * @param {string} layoutContainerId
         * @memberof SideBarWidget
         */
        SideBarWidget.prototype.initialize = function (layoutContainerId) {
            _super.prototype.initialize.call(this, layoutContainerId);
        };
        /**
         * Creates the layout of the widget
         *
         * @memberof SideBarWidget
         */
        SideBarWidget.prototype.createLayout = function () {
            // Create the tab widget
            var tabLayout = "\n            <div class=\"" + mainNavigationClassName + "\">    \n            </div>\n            ";
            $(this.cssParentContentId).append(tabLayout);
        };
        /**
         * Loads the styles for the sidebar widget
         *
         * @memberof SideBarWidget
         */
        SideBarWidget.prototype.loadStyles = function () {
            _super.prototype.addStyle.call(this, "widgets/sideBarWidget/style/css/sideBarWidgetStyle.css");
            _super.prototype.addStyle.call(this, "widgets/sideBarWidget/style/css/sideBarWidgetStyleVariables.css");
        };
        /**
         *
         *
         * @param {*} evt
         * @param {*} outerTabId
         * @param {*} tabId
         * @memberof SideBarWidget
         */
        SideBarWidget.prototype.switchTab = function (outerTabId, tabId) {
            var i, tabcontent, tablinks;
            var button = document.getElementById(outerTabId + "_button");
            tabcontent = document.getElementsByClassName("tabcontent");
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }
            tablinks = document.getElementsByClassName("tablinks");
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" active", "");
                tablinks[i].getElementsByTagName('img')[0].src = tablinks[i].getElementsByTagName('img')[0].src.replace('_active.svg', '.svg');
            }
            tabId = uniqueIdGenerator_1.UniqueIdGenerator.getInstance().getUniqueIdFromString(tabId);
            var tabWidget = this._widgets[tabId];
            if (this._activeWidget != undefined && this._activeWidget != tabWidget) {
                this._activeWidget.deactivate();
                tabWidget.activate();
            }
            this._activeWidget = tabWidget;
            document.getElementById(outerTabId).style.display = "block";
            if (button.className.indexOf("active") < 0) {
                button.className += " active";
                button.getElementsByTagName('img')[0].src = button.getElementsByTagName('img')[0].src.replace(/(\.[\w\d_-]+)$/i, '_active.svg');
            }
            this.resize(this._actualWidth, this._actualHeight);
        };
        /**
         *
         *
         * @param {number} width
         * @param {number} height
         * @memberof SideBarWidget
         */
        SideBarWidget.prototype.resize = function (width, height) {
            // Set size of tab control itself
            this._actualWidth = width;
            this._actualHeight = height;
            $(this.cssParentContentId)[0].style.width = width + "px";
            $(this.cssParentContentId)[0].style.height = height + "px";
            /*        var ejTabInstance = $(this._parentContentId).data("ejTab");
                   var headerSize = ejTabInstance.option("headerSize");*/
            // Set the sizes of the contents of this tab control
            var innerTabWidth = width - 48; // 48px sidebar on the left
            var innerTabHeight = height - 50; // 50px topbar 
            var keys = Object.keys(this._widgets);
            for (var i = 0; i < keys.length; i++) {
                var widget = this._widgets[keys[i]];
                if (widget != undefined) {
                    widget.resize(innerTabWidth, innerTabHeight);
                }
            }
        };
        /**
         *
         *
         * @param {IWidget} widget
         * @param {string} name
         * @param {ViewType} viewType
         * @param {string} iconPath
         * @memberof SideBarWidget
         */
        SideBarWidget.prototype.addWidget = function (widget, name, viewType, iconPath) {
            var _this = this;
            name = name;
            _super.prototype.addWidget.call(this, widget, name, viewType);
            // Add a tab item
            var outerTabId = "tab_" + name.replace(" ", "");
            var innerTabId = "inner_" + outerTabId;
            var buttonClass = "";
            var outerTabClass = "";
            if (viewType == viewTypeProvider_1.ViewType.User) {
                buttonClass = "rightHandSideBarButton";
                outerTabClass = "absoluteTab";
            }
            var themedIconPath = this.getThemedFilePath(iconPath);
            var navButton = "<button id=\"" + outerTabId + "_button\" class=\"icon48 tablinks " + buttonClass + "\"><img src=\"" + themedIconPath + "\"></img></button>";
            $("." + mainNavigationClassName).append(navButton);
            var outerTab = "<div id=\"" + outerTabId + "\" class=\"tabcontent " + outerTabClass + "\" ></div>";
            $(this.cssParentContentId).append(outerTab);
            var innerTab = "<div id=\"" + innerTabId + "\"></div>";
            $("#" + outerTabId).append(innerTab);
            widget.initialize(innerTabId);
            var tabId = name + "_" + viewType;
            $("#" + outerTabId + "_button")[0].addEventListener("click", function (e) { return _this.switchTab(outerTabId, tabId); });
        };
        return SideBarWidget;
    }(layoutWidgetBase_1.LayoutWidgetBase));
    exports.SideBarWidget = SideBarWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZUJhcldpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9zaWRlQmFyV2lkZ2V0L3NpZGVCYXJXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVFBO1FBQW1DLHdDQUEwQztRQUE3RTs7UUFBK0UsQ0FBQztRQUFELDJCQUFDO0lBQUQsQ0FBQyxBQUFoRixDQUFtQyxtQkFBVSxHQUFtQztJQUFBLENBQUM7SUFDakY7UUFBK0Isb0NBQXNCO1FBQXJEOztRQUF1RCxDQUFDO1FBQUQsdUJBQUM7SUFBRCxDQUFDLEFBQXhELENBQStCLG1CQUFVLEdBQWU7SUFBQSxDQUFDO0lBR3pELElBQU0sdUJBQXVCLEdBQUcsZ0JBQWdCLENBQUM7SUErSjNCLDBEQUF1QjtJQTdKN0M7UUFBNEIsaUNBQWdCO1FBQTVDO1lBQUEscUVBNEpDO1lBMUpHLFNBQVM7WUFDVCwwQkFBb0IsR0FBRyxJQUFJLG9CQUFvQixFQUFFLENBQUM7WUFDbEQsc0JBQWdCLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO1lBSzFDLDRDQUE0QztZQUNyQyxjQUFRLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQzs7UUFrSmxDLENBQUM7UUEvSUc7Ozs7O1dBS0c7UUFDSCxrQ0FBVSxHQUFWLFVBQVcsaUJBQXlCO1lBQ2pDLGlCQUFNLFVBQVUsWUFBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3ZDLENBQUM7UUFFRDs7OztXQUlHO1FBQ0gsb0NBQVksR0FBWjtZQUNJLHdCQUF3QjtZQUN4QixJQUFJLFNBQVMsR0FBVSw2QkFDTixHQUFDLHVCQUF1QixHQUFDLDJDQUVyQyxDQUFDO1lBQ04sQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNqRCxDQUFDO1FBRUQ7Ozs7V0FJRztRQUNILGtDQUFVLEdBQVY7WUFDSSxpQkFBTSxR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QUMsQ0FBQztRQUM5RyxDQUFDO1FBRUosb0JBQUM7SUFBRCxDQUFDLEFBNUpELENBQTRCLG1DQUFnQixHQTRKM0M7SUFDTSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExheW91dFdpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL2xheW91dFdpZGdldEJhc2VcIjtcclxuaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvZXZlbnRzXCI7XHJcbmltcG9ydCB7IEV2ZW50V2lkZ2V0QWN0aXZhdGVkQXJncyB9IGZyb20gXCIuLi9jb21tb24vZXZlbnRXaWRnZXRBY3RpdmF0ZWRBcmdzXCI7XHJcbmltcG9ydCB7IElXaWRnZXQgfSBmcm9tIFwiLi4vY29tbW9uL2ludGVyZmFjZXMvd2lkZ2V0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElTaWRlQmFyV2lkZ2V0IH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9zaWRlQmFyV2lkZ2V0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFZpZXdUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi92aWV3VHlwZVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IFVuaXF1ZUlkR2VuZXJhdG9yIH0gZnJvbSBcIi4uL2NvbW1vbi91bmlxdWVJZEdlbmVyYXRvclwiO1xyXG5cclxuY2xhc3MgRXZlbnRXaWRnZXRBY3RpdmF0ZWQgZXh0ZW5kcyBUeXBlZEV2ZW50PG51bGwsIEV2ZW50V2lkZ2V0QWN0aXZhdGVkQXJncz57IH07XHJcbmNsYXNzIEV2ZW50U2l6ZUNoYW5nZWQgZXh0ZW5kcyBUeXBlZEV2ZW50PG51bGwsIG51bGw+eyB9O1xyXG5cclxuXHJcbmNvbnN0IG1haW5OYXZpZ2F0aW9uQ2xhc3NOYW1lID0gXCJtYWluTmF2aWdhdGlvblwiO1xyXG5cclxuY2xhc3MgU2lkZUJhcldpZGdldCBleHRlbmRzIExheW91dFdpZGdldEJhc2UgaW1wbGVtZW50cyBJU2lkZUJhcldpZGdldHtcclxuICAgIFxyXG4gICAgLy8gRXZlbnRzXHJcbiAgICBldmVudFdpZGdldEFjdGl2YXRlZCA9IG5ldyBFdmVudFdpZGdldEFjdGl2YXRlZCgpO1xyXG4gICAgZXZlbnRTaXplQ2hhbmdlZCA9IG5ldyBFdmVudFNpemVDaGFuZ2VkKCk7XHJcblxyXG4gICAgX2FjdHVhbFdpZHRoO1xyXG4gICAgX2FjdHVhbEhlaWdodDtcclxuXHJcbiAgICAvL193aWRnZXRzOiB7IFtpZDogbnVtYmVyXTogSVdpZGdldDsgfSA9IHt9O1xyXG4gICAgcHVibGljIF93aWRnZXRzID0gbmV3IEFycmF5KCk7XHJcbiAgICBwcml2YXRlIF9hY3RpdmVXaWRnZXQ/IDogSVdpZGdldDtcclxuICAgXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxheW91dENvbnRhaW5lcklkXHJcbiAgICAgKiBAbWVtYmVyb2YgU2lkZUJhcldpZGdldFxyXG4gICAgICovXHJcbiAgICBpbml0aWFsaXplKGxheW91dENvbnRhaW5lcklkOiBzdHJpbmcpIHtcclxuICAgICAgIHN1cGVyLmluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgbGF5b3V0IG9mIHRoZSB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgU2lkZUJhcldpZGdldFxyXG4gICAgICovXHJcbiAgICBjcmVhdGVMYXlvdXQoKSB7XHJcbiAgICAgICAgLy8gQ3JlYXRlIHRoZSB0YWIgd2lkZ2V0XHJcbiAgICAgICAgbGV0IHRhYkxheW91dDogc3RyaW5nID1gXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJgK21haW5OYXZpZ2F0aW9uQ2xhc3NOYW1lK2BcIj4gICAgXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpLmFwcGVuZCh0YWJMYXlvdXQpOyAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZHMgdGhlIHN0eWxlcyBmb3IgdGhlIHNpZGViYXIgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFNpZGVCYXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgbG9hZFN0eWxlcygpe1xyXG4gICAgICAgIHN1cGVyLmFkZFN0eWxlKFwid2lkZ2V0cy9zaWRlQmFyV2lkZ2V0L3N0eWxlL2Nzcy9zaWRlQmFyV2lkZ2V0U3R5bGUuY3NzXCIpO1xyXG4gICAgICAgIHN1cGVyLmFkZFN0eWxlKFwid2lkZ2V0cy9zaWRlQmFyV2lkZ2V0L3N0eWxlL2Nzcy9zaWRlQmFyV2lkZ2V0U3R5bGVWYXJpYWJsZXMuY3NzXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IGV2dFxyXG4gICAgICogQHBhcmFtIHsqfSBvdXRlclRhYklkXHJcbiAgICAgKiBAcGFyYW0geyp9IHRhYklkXHJcbiAgICAgKiBAbWVtYmVyb2YgU2lkZUJhcldpZGdldFxyXG4gICAgICovXHJcbiAgICBzd2l0Y2hUYWIob3V0ZXJUYWJJZCwgdGFiSWQpIHtcclxuICAgICAgICB2YXIgaSwgdGFiY29udGVudCwgdGFibGlua3M7XHJcbiAgICAgICAgbGV0IGJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG91dGVyVGFiSWQrXCJfYnV0dG9uXCIpITtcclxuXHJcbiAgICAgICAgdGFiY29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ0YWJjb250ZW50XCIpO1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCB0YWJjb250ZW50Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRhYmNvbnRlbnRbaV0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0YWJsaW5rcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ0YWJsaW5rc1wiKTtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdGFibGlua3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGFibGlua3NbaV0uY2xhc3NOYW1lID0gdGFibGlua3NbaV0uY2xhc3NOYW1lLnJlcGxhY2UoXCIgYWN0aXZlXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICB0YWJsaW5rc1tpXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW1nJylbMF0uc3JjID0gdGFibGlua3NbaV0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ltZycpWzBdLnNyYy5yZXBsYWNlKCdfYWN0aXZlLnN2ZycsICcuc3ZnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgXHJcbiAgICAgICAgdGFiSWQgPSBVbmlxdWVJZEdlbmVyYXRvci5nZXRJbnN0YW5jZSgpLmdldFVuaXF1ZUlkRnJvbVN0cmluZyh0YWJJZCk7XHJcbiAgICAgICAgbGV0IHRhYldpZGdldCA9IHRoaXMuX3dpZGdldHNbdGFiSWRdO1xyXG4gICAgICAgIGlmKHRoaXMuX2FjdGl2ZVdpZGdldCAhPSB1bmRlZmluZWQgJiYgdGhpcy5fYWN0aXZlV2lkZ2V0ICE9IHRhYldpZGdldCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2FjdGl2ZVdpZGdldC5kZWFjdGl2YXRlKCk7XHJcbiAgICAgICAgICAgIHRhYldpZGdldC5hY3RpdmF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9hY3RpdmVXaWRnZXQgPSB0YWJXaWRnZXQ7XHJcbiAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChvdXRlclRhYklkKSEuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgICBpZihidXR0b24uY2xhc3NOYW1lLmluZGV4T2YoXCJhY3RpdmVcIikgPCAwKXtcclxuICAgICAgICAgICAgYnV0dG9uLmNsYXNzTmFtZSArPSBcIiBhY3RpdmVcIjtcclxuICAgICAgICAgICAgYnV0dG9uLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbWcnKVswXS5zcmMgPSBidXR0b24uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ltZycpWzBdLnNyYy5yZXBsYWNlKC8oXFwuW1xcd1xcZF8tXSspJC9pLCAnX2FjdGl2ZS5zdmcnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZXNpemUodGhpcy5fYWN0dWFsV2lkdGgsdGhpcy5fYWN0dWFsSGVpZ2h0KVxyXG4gICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqXHJcbiAgICAqXHJcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aFxyXG4gICAgKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0XHJcbiAgICAqIEBtZW1iZXJvZiBTaWRlQmFyV2lkZ2V0XHJcbiAgICAqL1xyXG4gICByZXNpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpe1xyXG4gICAgICAgLy8gU2V0IHNpemUgb2YgdGFiIGNvbnRyb2wgaXRzZWxmXHJcblxyXG4gICAgICAgdGhpcy5fYWN0dWFsV2lkdGggPSB3aWR0aDtcclxuICAgICAgIHRoaXMuX2FjdHVhbEhlaWdodCA9IGhlaWdodDtcclxuXHJcbiAgICAgICAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKVswXS5zdHlsZS53aWR0aCA9IHdpZHRoICsgXCJweFwiO1xyXG4gICAgICAgJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZClbMF0uc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ICsgXCJweFwiO1xyXG5cclxuLyogICAgICAgIHZhciBlalRhYkluc3RhbmNlID0gJCh0aGlzLl9wYXJlbnRDb250ZW50SWQpLmRhdGEoXCJlalRhYlwiKTtcclxuICAgICAgIHZhciBoZWFkZXJTaXplID0gZWpUYWJJbnN0YW5jZS5vcHRpb24oXCJoZWFkZXJTaXplXCIpOyovIFxyXG4gICAgICAgLy8gU2V0IHRoZSBzaXplcyBvZiB0aGUgY29udGVudHMgb2YgdGhpcyB0YWIgY29udHJvbFxyXG4gICAgICAgdmFyIGlubmVyVGFiV2lkdGggPSB3aWR0aCAtIDQ4OyAvLyA0OHB4IHNpZGViYXIgb24gdGhlIGxlZnRcclxuICAgICAgIHZhciBpbm5lclRhYkhlaWdodCA9IGhlaWdodCAtIDUwOyAvLyA1MHB4IHRvcGJhciBcclxuICAgICAgIFxyXG4gICAgICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyh0aGlzLl93aWRnZXRzKTtcclxuICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgIGxldCB3aWRnZXQgPSB0aGlzLl93aWRnZXRzW2tleXNbaV1dO1xyXG4gICAgICAgICAgIGlmKHdpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICB3aWRnZXQucmVzaXplKGlubmVyVGFiV2lkdGgsIGlubmVyVGFiSGVpZ2h0KTtcclxuICAgICAgICAgICB9XHJcbiAgICAgICB9XHJcbiAgIH1cclxuICAgXHJcbiAgIC8qKlxyXG4gICAgKlxyXG4gICAgKlxyXG4gICAgKiBAcGFyYW0ge0lXaWRnZXR9IHdpZGdldFxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gICAgKiBAcGFyYW0ge1ZpZXdUeXBlfSB2aWV3VHlwZVxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gaWNvblBhdGhcclxuICAgICogQG1lbWJlcm9mIFNpZGVCYXJXaWRnZXRcclxuICAgICovXHJcbiAgIGFkZFdpZGdldCh3aWRnZXQ6IElXaWRnZXQsIG5hbWU6IHN0cmluZywgdmlld1R5cGU6IFZpZXdUeXBlLCBpY29uUGF0aDogc3RyaW5nKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbmFtZSA9IG5hbWU7XHJcbiAgICAgICAgc3VwZXIuYWRkV2lkZ2V0KHdpZGdldCwgbmFtZSwgdmlld1R5cGUpO1xyXG4gICAgICAgLy8gQWRkIGEgdGFiIGl0ZW1cclxuICAgICAgIHZhciBvdXRlclRhYklkID0gXCJ0YWJfXCIgKyBuYW1lLnJlcGxhY2UoXCIgXCIsIFwiXCIpO1xyXG4gICAgICAgdmFyIGlubmVyVGFiSWQgPSBcImlubmVyX1wiICsgb3V0ZXJUYWJJZDtcclxuXHJcbiAgICAgICBsZXQgYnV0dG9uQ2xhc3MgPSBcIlwiO1xyXG4gICAgICAgbGV0IG91dGVyVGFiQ2xhc3MgPSBcIlwiO1xyXG4gICAgICAgaWYodmlld1R5cGUgPT0gVmlld1R5cGUuVXNlcil7XHJcbiAgICAgICAgICAgYnV0dG9uQ2xhc3MgPSBcInJpZ2h0SGFuZFNpZGVCYXJCdXR0b25cIlxyXG4gICAgICAgICAgIG91dGVyVGFiQ2xhc3MgPSBcImFic29sdXRlVGFiXCI7XHJcbiAgICAgICB9XHJcbiAgICAgICBsZXQgdGhlbWVkSWNvblBhdGggPSB0aGlzLmdldFRoZW1lZEZpbGVQYXRoKGljb25QYXRoKTtcclxuICAgICAgIGxldCBuYXZCdXR0b24gPSBgPGJ1dHRvbiBpZD1cImArIG91dGVyVGFiSWQrYF9idXR0b25cIiBjbGFzcz1cImljb240OCB0YWJsaW5rcyBgKyBidXR0b25DbGFzcyArYFwiPjxpbWcgc3JjPVwiYCArIHRoZW1lZEljb25QYXRoICsgYFwiPjwvaW1nPjwvYnV0dG9uPmBcclxuICAgICAgICQoXCIuXCIrbWFpbk5hdmlnYXRpb25DbGFzc05hbWUpLmFwcGVuZChuYXZCdXR0b24pO1xyXG4gICAgICBcclxuICAgICAgIGxldCBvdXRlclRhYiA9IGA8ZGl2IGlkPVwiYCsgb3V0ZXJUYWJJZCArIGBcIiBjbGFzcz1cInRhYmNvbnRlbnQgYCtvdXRlclRhYkNsYXNzK2BcIiA+PC9kaXY+YDtcclxuICAgICAgICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpLmFwcGVuZChvdXRlclRhYik7XHJcblxyXG4gICAgICAgbGV0IGlubmVyVGFiID0gYDxkaXYgaWQ9XCJgKyBpbm5lclRhYklkICsgYFwiPjwvZGl2PmA7XHJcbiAgICAgICAkKFwiI1wiK291dGVyVGFiSWQpLmFwcGVuZChpbm5lclRhYik7XHJcblxyXG4gICAgICAgd2lkZ2V0LmluaXRpYWxpemUoaW5uZXJUYWJJZCk7XHJcblxyXG4gICAgICAgbGV0IHRhYklkID0gbmFtZSArIFwiX1wiICsgdmlld1R5cGU7XHJcbiAgICAgICBcclxuICAgICAgICQoXCIjXCIrb3V0ZXJUYWJJZCtcIl9idXR0b25cIilbMF0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlOkV2ZW50KSA9PiB0aGlzLnN3aXRjaFRhYihvdXRlclRhYklkLCB0YWJJZCApKTtcclxuICAgfVxyXG5cclxufVxyXG5leHBvcnR7U2lkZUJhcldpZGdldCwgbWFpbk5hdmlnYXRpb25DbGFzc05hbWV9OyJdfQ==