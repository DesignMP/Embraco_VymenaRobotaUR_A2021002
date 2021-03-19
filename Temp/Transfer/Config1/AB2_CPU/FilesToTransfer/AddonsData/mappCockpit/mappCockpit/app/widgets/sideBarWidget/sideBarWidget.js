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
        SideBarWidget.prototype.initializeComponent = function () {
            this.component.disablePersisting();
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
            var tabWidget = this._widgets.get(tabId);
            if (this._activeWidget != undefined && this._activeWidget != tabWidget) {
                this._activeWidget.deactivate();
                if (tabWidget != undefined) {
                    tabWidget.activate();
                }
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
            this._widgets.forEach(function (widget) {
                if (widget != undefined) {
                    widget.resize(innerTabWidth, innerTabHeight);
                }
            });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZUJhcldpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9zaWRlQmFyV2lkZ2V0L3NpZGVCYXJXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVFBO1FBQW1DLHdDQUEwQztRQUE3RTs7UUFBK0UsQ0FBQztRQUFELDJCQUFDO0lBQUQsQ0FBQyxBQUFoRixDQUFtQyxtQkFBVSxHQUFtQztJQUFBLENBQUM7SUFDakY7UUFBK0Isb0NBQXNCO1FBQXJEOztRQUF1RCxDQUFDO1FBQUQsdUJBQUM7SUFBRCxDQUFDLEFBQXhELENBQStCLG1CQUFVLEdBQWU7SUFBQSxDQUFDO0lBR3pELElBQU0sdUJBQXVCLEdBQUcsZ0JBQWdCLENBQUM7SUFpSzNCLDBEQUF1QjtJQS9KN0M7UUFBNEIsaUNBQWdCO1FBQTVDO1lBQUEscUVBOEpDO1lBNUpHLFNBQVM7WUFDVCwwQkFBb0IsR0FBRyxJQUFJLG9CQUFvQixFQUFFLENBQUM7WUFDbEQsc0JBQWdCLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDOztRQTBKOUMsQ0FBQztRQW5KRzs7Ozs7V0FLRztRQUNILGtDQUFVLEdBQVYsVUFBVyxpQkFBeUI7WUFDakMsaUJBQU0sVUFBVSxZQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDdkMsQ0FBQztRQUVELDJDQUFtQixHQUFuQjtZQUNJLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN2QyxDQUFDO1FBRUQ7Ozs7V0FJRztRQUNILG9DQUFZLEdBQVo7WUFDSSx3QkFBd0I7WUFDeEIsSUFBSSxTQUFTLEdBQVUsNkJBQ04sR0FBQyx1QkFBdUIsR0FBQywyQ0FFckMsQ0FBQztZQUNOLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDakQsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSCxr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bnRlbnQiOlsiaW1wb3J0IHsgTGF5b3V0V2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vbGF5b3V0V2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBUeXBlZEV2ZW50IH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9ldmVudHNcIjtcclxuaW1wb3J0IHsgRXZlbnRXaWRnZXRBY3RpdmF0ZWRBcmdzIH0gZnJvbSBcIi4uL2NvbW1vbi9ldmVudFdpZGdldEFjdGl2YXRlZEFyZ3NcIjtcclxuaW1wb3J0IHsgSVdpZGdldCB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy93aWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVNpZGVCYXJXaWRnZXQgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL3NpZGVCYXJXaWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVmlld1R5cGUgfSBmcm9tIFwiLi4vY29tbW9uL3ZpZXdUeXBlUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgVW5pcXVlSWRHZW5lcmF0b3IgfSBmcm9tIFwiLi4vY29tbW9uL3VuaXF1ZUlkR2VuZXJhdG9yXCI7XHJcblxyXG5jbGFzcyBFdmVudFdpZGdldEFjdGl2YXRlZCBleHRlbmRzIFR5cGVkRXZlbnQ8bnVsbCwgRXZlbnRXaWRnZXRBY3RpdmF0ZWRBcmdzPnsgfTtcclxuY2xhc3MgRXZlbnRTaXplQ2hhbmdlZCBleHRlbmRzIFR5cGVkRXZlbnQ8bnVsbCwgbnVsbD57IH07XHJcblxyXG5cclxuY29uc3QgbWFpbk5hdmlnYXRpb25DbGFzc05hbWUgPSBcIm1haW5OYXZpZ2F0aW9uXCI7XHJcblxyXG5jbGFzcyBTaWRlQmFyV2lkZ2V0IGV4dGVuZHMgTGF5b3V0V2lkZ2V0QmFzZSBpbXBsZW1lbnRzIElTaWRlQmFyV2lkZ2V0e1xyXG4gICAgXHJcbiAgICAvLyBFdmVudHNcclxuICAgIGV2ZW50V2lkZ2V0QWN0aXZhdGVkID0gbmV3IEV2ZW50V2lkZ2V0QWN0aXZhdGVkKCk7XHJcbiAgICBldmVudFNpemVDaGFuZ2VkID0gbmV3IEV2ZW50U2l6ZUNoYW5nZWQoKTtcclxuXHJcbiAgICBfYWN0dWFsV2lkdGg7XHJcbiAgICBfYWN0dWFsSGVpZ2h0O1xyXG5cclxuICAgIHByaXZhdGUgX2FjdGl2ZVdpZGdldD8gOiBJV2lkZ2V0O1xyXG4gICBcclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGF5b3V0Q29udGFpbmVySWRcclxuICAgICAqIEBtZW1iZXJvZiBTaWRlQmFyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQ6IHN0cmluZykge1xyXG4gICAgICAgc3VwZXIuaW5pdGlhbGl6ZShsYXlvdXRDb250YWluZXJJZCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGluaXRpYWxpemVDb21wb25lbnQoKXtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5kaXNhYmxlUGVyc2lzdGluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgbGF5b3V0IG9mIHRoZSB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgU2lkZUJhcldpZGdldFxyXG4gICAgICovXHJcbiAgICBjcmVhdGVMYXlvdXQoKSB7XHJcbiAgICAgICAgLy8gQ3JlYXRlIHRoZSB0YWIgd2lkZ2V0XHJcbiAgICAgICAgbGV0IHRhYkxheW91dDogc3RyaW5nID1gXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJgK21haW5OYXZpZ2F0aW9uQ2xhc3NOYW1lK2BcIj4gICAgXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpLmFwcGVuZCh0YWJMYXlvdXQpOyAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZHMgdGhlIHN0eWxlcyBmb3IgdGhlIHNpZGViYXIgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFNpZGVCYXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgbG9hZFN0eWxlcygpe1xyXG4gICAgICAgIHN1cGVyLmFkZFN0eWxlKFwid2lkZ2V0cy9zaWRlQmFyV2lkZ2V0L3N0eWxlL2Nzcy9zaWRlQmFyV2lkZ2V0U3R5bGUuY3NzXCIpO1xyXG4gICAgICAgIHN1cGVyLmFkZFN0eWxlKFwid2lkZ2V0cy9zaWRlQmFyV2lkZ2V0L3N0eWxlL2Nzcy9zaWRlQmFyV2lkZ2V0U3R5bGVWYXJpYWJsZXMuY3NzXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IGV2dFxyXG4gICAgICogQHBhcmFtIHsqfSBvdXRlclRhYklkXHJcbiAgICAgKiBAcGFyYW0geyp9IHRhYklkXHJcbiAgICAgKiBAbWVtYmVyb2YgU2lkZUJhcldpZGdldFxyXG4gICAgICovXHJcbiAgICBzd2l0Y2hUYWIob3V0ZXJUYWJJZCwgdGFiSWQpIHtcclxuICAgICAgICB2YXIgaSwgdGFiY29udGVudCwgdGFibGlua3M7XHJcbiAgICAgICAgbGV0IGJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG91dGVyVGFiSWQrXCJfYnV0dG9uXCIpITtcclxuXHJcbiAgICAgICAgdGFiY29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ0YWJjb250ZW50XCIpO1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCB0YWJjb250ZW50Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRhYmNvbnRlbnRbaV0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0YWJsaW5rcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ0YWJsaW5rc1wiKTtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdGFibGlua3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGFibGlua3NbaV0uY2xhc3NOYW1lID0gdGFibGlua3NbaV0uY2xhc3NOYW1lLnJlcGxhY2UoXCIgYWN0aXZlXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICB0YWJsaW5rc1tpXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW1nJylbMF0uc3JjID0gdGFibGlua3NbaV0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ltZycpWzBdLnNyYy5yZXBsYWNlKCdfYWN0aXZlLnN2ZycsICcuc3ZnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgXHJcbiAgICAgICAgdGFiSWQgPSBVbmlxdWVJZEdlbmVyYXRvci5nZXRJbnN0YW5jZSgpLmdldFVuaXF1ZUlkRnJvbVN0cmluZyh0YWJJZCk7XHJcbiAgICAgICAgbGV0IHRhYldpZGdldCA9IHRoaXMuX3dpZGdldHMuZ2V0KHRhYklkKTtcclxuICAgICAgICBpZih0aGlzLl9hY3RpdmVXaWRnZXQgIT0gdW5kZWZpbmVkICYmIHRoaXMuX2FjdGl2ZVdpZGdldCAhPSB0YWJXaWRnZXQpe1xyXG4gICAgICAgICAgICB0aGlzLl9hY3RpdmVXaWRnZXQuZGVhY3RpdmF0ZSgpO1xyXG4gICAgICAgICAgICBpZih0YWJXaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHRhYldpZGdldC5hY3RpdmF0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2FjdGl2ZVdpZGdldCA9IHRhYldpZGdldDtcclxuICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG91dGVyVGFiSWQpIS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgIGlmKGJ1dHRvbi5jbGFzc05hbWUuaW5kZXhPZihcImFjdGl2ZVwiKSA8IDApe1xyXG4gICAgICAgICAgICBidXR0b24uY2xhc3NOYW1lICs9IFwiIGFjdGl2ZVwiO1xyXG4gICAgICAgICAgICBidXR0b24uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ltZycpWzBdLnNyYyA9IGJ1dHRvbi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW1nJylbMF0uc3JjLnJlcGxhY2UoLyhcXC5bXFx3XFxkXy1dKykkL2ksICdfYWN0aXZlLnN2ZycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlc2l6ZSh0aGlzLl9hY3R1YWxXaWR0aCx0aGlzLl9hY3R1YWxIZWlnaHQpXHJcbiAgICB9XHJcblxyXG4gICAvKipcclxuICAgICpcclxuICAgICpcclxuICAgICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoXHJcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcclxuICAgICogQG1lbWJlcm9mIFNpZGVCYXJXaWRnZXRcclxuICAgICovXHJcbiAgIHJlc2l6ZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcil7XHJcbiAgICAgICAvLyBTZXQgc2l6ZSBvZiB0YWIgY29udHJvbCBpdHNlbGZcclxuXHJcbiAgICAgICB0aGlzLl9hY3R1YWxXaWR0aCA9IHdpZHRoO1xyXG4gICAgICAgdGhpcy5fYWN0dWFsSGVpZ2h0ID0gaGVpZ2h0O1xyXG5cclxuICAgICAgICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpWzBdLnN0eWxlLndpZHRoID0gd2lkdGggKyBcInB4XCI7XHJcbiAgICAgICAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKVswXS5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyBcInB4XCI7XHJcblxyXG4vKiAgICAgICAgdmFyIGVqVGFiSW5zdGFuY2UgPSAkKHRoaXMuX3BhcmVudENvbnRlbnRJZCkuZGF0YShcImVqVGFiXCIpO1xyXG4gICAgICAgdmFyIGhlYWRlclNpemUgPSBlalRhYkluc3RhbmNlLm9wdGlvbihcImhlYWRlclNpemVcIik7Ki8gXHJcbiAgICAgICAvLyBTZXQgdGhlIHNpemVzIG9mIHRoZSBjb250ZW50cyBvZiB0aGlzIHRhYiBjb250cm9sXHJcbiAgICAgICB2YXIgaW5uZXJUYWJXaWR0aCA9IHdpZHRoIC0gNDg7IC8vIDQ4cHggc2lkZWJhciBvbiB0aGUgbGVmdFxyXG4gICAgICAgdmFyIGlubmVyVGFiSGVpZ2h0ID0gaGVpZ2h0IC0gNTA7IC8vIDUwcHggdG9wYmFyIFxyXG4gICAgICAgXHJcbiAgICAgICB0aGlzLl93aWRnZXRzLmZvckVhY2goKHdpZGdldCkgPT4ge1xyXG4gICAgICAgICAgICBpZih3aWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgd2lkZ2V0LnJlc2l6ZShpbm5lclRhYldpZHRoLCBpbm5lclRhYkhlaWdodCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgIH0pO1xyXG4gICB9XHJcbiAgIFxyXG4gICAvKipcclxuICAgICpcclxuICAgICpcclxuICAgICogQHBhcmFtIHtJV2lkZ2V0fSB3aWRnZXRcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICAgICogQHBhcmFtIHtWaWV3VHlwZX0gdmlld1R5cGVcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IGljb25QYXRoXHJcbiAgICAqIEBtZW1iZXJvZiBTaWRlQmFyV2lkZ2V0XHJcbiAgICAqL1xyXG4gICBhZGRXaWRnZXQod2lkZ2V0OiBJV2lkZ2V0LCBuYW1lOiBzdHJpbmcsIHZpZXdUeXBlOiBWaWV3VHlwZSwgaWNvblBhdGg6IHN0cmluZykge1xyXG4gICAgICAgIFxyXG4gICAgICAgIG5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHN1cGVyLmFkZFdpZGdldCh3aWRnZXQsIG5hbWUsIHZpZXdUeXBlKTtcclxuICAgICAgIC8vIEFkZCBhIHRhYiBpdGVtXHJcbiAgICAgICB2YXIgb3V0ZXJUYWJJZCA9IFwidGFiX1wiICsgbmFtZS5yZXBsYWNlKFwiIFwiLCBcIlwiKTtcclxuICAgICAgIHZhciBpbm5lclRhYklkID0gXCJpbm5lcl9cIiArIG91dGVyVGFiSWQ7XHJcblxyXG4gICAgICAgbGV0IGJ1dHRvbkNsYXNzID0gXCJcIjtcclxuICAgICAgIGxldCBvdXRlclRhYkNsYXNzID0gXCJcIjtcclxuICAgICAgIGlmKHZpZXdUeXBlID09IFZpZXdUeXBlLlVzZXIpe1xyXG4gICAgICAgICAgIGJ1dHRvbkNsYXNzID0gXCJyaWdodEhhbmRTaWRlQmFyQnV0dG9uXCJcclxuICAgICAgICAgICBvdXRlclRhYkNsYXNzID0gXCJhYnNvbHV0ZVRhYlwiO1xyXG4gICAgICAgfVxyXG4gICAgICAgbGV0IHRoZW1lZEljb25QYXRoID0gdGhpcy5nZXRUaGVtZWRGaWxlUGF0aChpY29uUGF0aCk7XHJcbiAgICAgICBsZXQgbmF2QnV0dG9uID0gYDxidXR0b24gaWQ9XCJgKyBvdXRlclRhYklkK2BfYnV0dG9uXCIgY2xhc3M9XCJpY29uNDggdGFibGlua3MgYCsgYnV0dG9uQ2xhc3MgK2BcIj48aW1nIHNyYz1cImAgKyB0aGVtZWRJY29uUGF0aCArIGBcIj48L2ltZz48L2J1dHRvbj5gXHJcbiAgICAgICAkKFwiLlwiK21haW5OYXZpZ2F0aW9uQ2xhc3NOYW1lKS5hcHBlbmQobmF2QnV0dG9uKTtcclxuICAgICAgXHJcbiAgICAgICBsZXQgb3V0ZXJUYWIgPSBgPGRpdiBpZD1cImArIG91dGVyVGFiSWQgKyBgXCIgY2xhc3M9XCJ0YWJjb250ZW50IGArb3V0ZXJUYWJDbGFzcytgXCIgPjwvZGl2PmA7XHJcbiAgICAgICAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKS5hcHBlbmQob3V0ZXJUYWIpO1xyXG5cclxuICAgICAgIGxldCBpbm5lclRhYiA9IGA8ZGl2IGlkPVwiYCsgaW5uZXJUYWJJZCArIGBcIj48L2Rpdj5gO1xyXG4gICAgICAgJChcIiNcIitvdXRlclRhYklkKS5hcHBlbmQoaW5uZXJUYWIpO1xyXG5cclxuICAgICAgIHdpZGdldC5pbml0aWFsaXplKGlubmVyVGFiSWQpO1xyXG5cclxuICAgICAgIGxldCB0YWJJZCA9IG5hbWUgKyBcIl9cIiArIHZpZXdUeXBlO1xyXG4gICAgICAgXHJcbiAgICAgICAkKFwiI1wiK291dGVyVGFiSWQrXCJfYnV0dG9uXCIpWzBdLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZTpFdmVudCkgPT4gdGhpcy5zd2l0Y2hUYWIob3V0ZXJUYWJJZCwgdGFiSWQgKSk7XHJcbiAgIH1cclxuXHJcbn1cclxuZXhwb3J0e1NpZGVCYXJXaWRnZXQsIG1haW5OYXZpZ2F0aW9uQ2xhc3NOYW1lfTsiXX0=