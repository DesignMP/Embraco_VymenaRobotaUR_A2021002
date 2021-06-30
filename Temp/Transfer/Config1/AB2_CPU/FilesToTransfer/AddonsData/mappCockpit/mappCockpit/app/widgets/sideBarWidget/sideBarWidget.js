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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZUJhcldpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9zaWRlQmFyV2lkZ2V0L3NpZGVCYXJXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVFBO1FBQW1DLHdDQUEwQztRQUE3RTs7UUFBK0UsQ0FBQztRQUFELDJCQUFDO0lBQUQsQ0FBQyxBQUFoRixDQUFtQyxtQkFBVSxHQUFtQztJQUFBLENBQUM7SUFDakY7UUFBK0Isb0NBQXNCO1FBQXJEOztRQUF1RCxDQUFDO1FBQUQsdUJBQUM7SUFBRCxDQUFDLEFBQXhELENBQStCLG1CQUFVLEdBQWU7SUFBQSxDQUFDO0lBR3pELElBQU0sdUJBQXVCLEdBQUcsZ0JBQWdCLENBQUM7SUF1SjNCLDBEQUF1QjtJQXJKN0M7UUFBNEIsaUNBQWdCO1FBQTVDO1lBQUEscUVBb0pDO1lBbEpHLFNBQVM7WUFDVCwwQkFBb0IsR0FBRyxJQUFJLG9CQUFvQixFQUFFLENBQUM7WUFDbEQsc0JBQWdCLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDOztRQWdKOUMsQ0FBQztRQXpJRywyQ0FBbUIsR0FBbkI7WUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDdkMsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSCxvQ0FBWSxHQUFaO1lBQ0ksd0JBQXdCO1lBQ3hCLElBQUksU0FBUyxHQUFVLDZCQUNOLEdBQUMsdUJBQXVCLEdBQUMsMkNBRXJDLENBQUM7WUFDTixDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2pELENBQUM7UUFFRDs7OztXQUlHO1FBQ0gsa0NBQVUsR0FBVjtZQUNJLGlCQUFNLFFBQVEsWUFBQyx3REFBd0QsQ0FBQyxDQUFDO1lBQ3pFLGlCQUFNLFFBQVEsWUFBQyxpRUFBaUUsQ0FBQyxDQUFDO1FBQ3RG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YyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN0RCxJQUFJLFNBQVMsR0FBRyxlQUFjLEdBQUUsVUFBVSxHQUFDLG9DQUFrQyxHQUFFLFdBQVcsR0FBRSxnQkFBYyxHQUFHLGNBQWMsR0FBRyxvQkFBbUIsQ0FBQTtZQUNqSixDQUFDLENBQUMsR0FBRyxHQUFDLHVCQUF1QixDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRWpELElBQUksUUFBUSxHQUFHLFlBQVcsR0FBRSxVQUFVLEdBQUcsd0JBQXNCLEdBQUMsYUFBYSxHQUFDLFlBQVcsQ0FBQztZQUMxRixDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRTVDLElBQUksUUFBUSxHQUFHLFlBQVcsR0FBRSxVQUFVLEdBQUcsV0FBVSxDQUFDO1lBQ3BELENBQUMsQ0FBQyxHQUFHLEdBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRW5DLE1BQU0sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFOUIsSUFBSSxLQUFLLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxRQUFRLENBQUM7WUFFbEMsQ0FBQyxDQUFDLEdBQUcsR0FBQyxVQUFVLEdBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQUMsQ0FBTyxJQUFLLE9BQUEsS0FBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFFLEVBQWxDLENBQWtDLENBQUMsQ0FBQztRQUM5RyxDQUFDO1FBRUosb0JBQUM7SUFBRCxDQUFDLEFBcEpELENBQTRCLG1DQUFnQixHQW9KM0M7SUFDTSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExheW91dFdpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL2xheW91dFdpZGdldEJhc2VcIjtcclxuaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvZXZlbnRzXCI7XHJcbmltcG9ydCB7IEV2ZW50V2lkZ2V0QWN0aXZhdGVkQXJncyB9IGZyb20gXCIuLi9jb21tb24vZXZlbnRXaWRnZXRBY3RpdmF0ZWRBcmdzXCI7XHJcbmltcG9ydCB7IElXaWRnZXQgfSBmcm9tIFwiLi4vY29tbW9uL2ludGVyZmFjZXMvd2lkZ2V0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElTaWRlQmFyV2lkZ2V0IH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9zaWRlQmFyV2lkZ2V0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFZpZXdUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi92aWV3VHlwZVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IFVuaXF1ZUlkR2VuZXJhdG9yIH0gZnJvbSBcIi4uL2NvbW1vbi91bmlxdWVJZEdlbmVyYXRvclwiO1xyXG5cclxuY2xhc3MgRXZlbnRXaWRnZXRBY3RpdmF0ZWQgZXh0ZW5kcyBUeXBlZEV2ZW50PG51bGwsIEV2ZW50V2lkZ2V0QWN0aXZhdGVkQXJncz57IH07XHJcbmNsYXNzIEV2ZW50U2l6ZUNoYW5nZWQgZXh0ZW5kcyBUeXBlZEV2ZW50PG51bGwsIG51bGw+eyB9O1xyXG5cclxuXHJcbmNvbnN0IG1haW5OYXZpZ2F0aW9uQ2xhc3NOYW1lID0gXCJtYWluTmF2aWdhdGlvblwiO1xyXG5cclxuY2xhc3MgU2lkZUJhcldpZGdldCBleHRlbmRzIExheW91dFdpZGdldEJhc2UgaW1wbGVtZW50cyBJU2lkZUJhcldpZGdldHtcclxuICAgIFxyXG4gICAgLy8gRXZlbnRzXHJcbiAgICBldmVudFdpZGdldEFjdGl2YXRlZCA9IG5ldyBFdmVudFdpZGdldEFjdGl2YXRlZCgpO1xyXG4gICAgZXZlbnRTaXplQ2hhbmdlZCA9IG5ldyBFdmVudFNpemVDaGFuZ2VkKCk7XHJcblxyXG4gICAgX2FjdHVhbFdpZHRoO1xyXG4gICAgX2FjdHVhbEhlaWdodDtcclxuXHJcbiAgICBwcml2YXRlIF9hY3RpdmVXaWRnZXQ/IDogSVdpZGdldDtcclxuICAgICBcclxuICAgIGluaXRpYWxpemVDb21wb25lbnQoKXtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5kaXNhYmxlUGVyc2lzdGluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgbGF5b3V0IG9mIHRoZSB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgU2lkZUJhcldpZGdldFxyXG4gICAgICovXHJcbiAgICBjcmVhdGVMYXlvdXQoKSB7XHJcbiAgICAgICAgLy8gQ3JlYXRlIHRoZSB0YWIgd2lkZ2V0XHJcbiAgICAgICAgbGV0IHRhYkxheW91dDogc3RyaW5nID1gXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJgK21haW5OYXZpZ2F0aW9uQ2xhc3NOYW1lK2BcIj4gICAgXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpLmFwcGVuZCh0YWJMYXlvdXQpOyAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZHMgdGhlIHN0eWxlcyBmb3IgdGhlIHNpZGViYXIgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFNpZGVCYXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgbG9hZFN0eWxlcygpe1xyXG4gICAgICAgIHN1cGVyLmFkZFN0eWxlKFwid2lkZ2V0cy9zaWRlQmFyV2lkZ2V0L3N0eWxlL2Nzcy9zaWRlQmFyV2lkZ2V0U3R5bGUuY3NzXCIpO1xyXG4gICAgICAgIHN1cGVyLmFkZFN0eWxlKFwid2lkZ2V0cy9zaWRlQmFyV2lkZ2V0L3N0eWxlL2Nzcy9zaWRlQmFyV2lkZ2V0U3R5bGVWYXJpYWJsZXMuY3NzXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IGV2dFxyXG4gICAgICogQHBhcmFtIHsqfSBvdXRlclRhYklkXHJcbiAgICAgKiBAcGFyYW0geyp9IHRhYklkXHJcbiAgICAgKiBAbWVtYmVyb2YgU2lkZUJhcldpZGdldFxyXG4gICAgICovXHJcbiAgICBzd2l0Y2hUYWIob3V0ZXJUYWJJZCwgdGFiSWQpIHtcclxuICAgICAgICB2YXIgaSwgdGFiY29udGVudCwgdGFibGlua3M7XHJcbiAgICAgICAgbGV0IGJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG91dGVyVGFiSWQrXCJfYnV0dG9uXCIpITtcclxuXHJcbiAgICAgICAgdGFiY29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ0YWJjb250ZW50XCIpO1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCB0YWJjb250ZW50Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRhYmNvbnRlbnRbaV0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0YWJsaW5rcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ0YWJsaW5rc1wiKTtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdGFibGlua3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGFibGlua3NbaV0uY2xhc3NOYW1lID0gdGFibGlua3NbaV0uY2xhc3NOYW1lLnJlcGxhY2UoXCIgYWN0aXZlXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICB0YWJsaW5rc1tpXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW1nJylbMF0uc3JjID0gdGFibGlua3NbaV0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ltZycpWzBdLnNyYy5yZXBsYWNlKCdfYWN0aXZlLnN2ZycsICcuc3ZnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgXHJcbiAgICAgICAgdGFiSWQgPSBVbmlxdWVJZEdlbmVyYXRvci5nZXRJbnN0YW5jZSgpLmdldFVuaXF1ZUlkRnJvbVN0cmluZyh0YWJJZCk7XHJcbiAgICAgICAgbGV0IHRhYldpZGdldCA9IHRoaXMuX3dpZGdldHMuZ2V0KHRhYklkKTtcclxuICAgICAgICBpZih0aGlzLl9hY3RpdmVXaWRnZXQgIT0gdW5kZWZpbmVkICYmIHRoaXMuX2FjdGl2ZVdpZGdldCAhPSB0YWJXaWRnZXQpe1xyXG4gICAgICAgICAgICB0aGlzLl9hY3RpdmVXaWRnZXQuZGVhY3RpdmF0ZSgpO1xyXG4gICAgICAgICAgICBpZih0YWJXaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHRhYldpZGdldC5hY3RpdmF0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2FjdGl2ZVdpZGdldCA9IHRhYldpZGdldDtcclxuICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG91dGVyVGFiSWQpIS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgIGlmKGJ1dHRvbi5jbGFzc05hbWUuaW5kZXhPZihcImFjdGl2ZVwiKSA8IDApe1xyXG4gICAgICAgICAgICBidXR0b24uY2xhc3NOYW1lICs9IFwiIGFjdGl2ZVwiO1xyXG4gICAgICAgICAgICBidXR0b24uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ltZycpWzBdLnNyYyA9IGJ1dHRvbi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW1nJylbMF0uc3JjLnJlcGxhY2UoLyhcXC5bXFx3XFxkXy1dKykkL2ksICdfYWN0aXZlLnN2ZycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlc2l6ZSh0aGlzLl9hY3R1YWxXaWR0aCx0aGlzLl9hY3R1YWxIZWlnaHQpXHJcbiAgICB9XHJcblxyXG4gICAvKipcclxuICAgICpcclxuICAgICpcclxuICAgICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoXHJcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcclxuICAgICogQG1lbWJlcm9mIFNpZGVCYXJXaWRnZXRcclxuICAgICovXHJcbiAgIHJlc2l6ZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcil7XHJcbiAgICAgICAvLyBTZXQgc2l6ZSBvZiB0YWIgY29udHJvbCBpdHNlbGZcclxuXHJcbiAgICAgICB0aGlzLl9hY3R1YWxXaWR0aCA9IHdpZHRoO1xyXG4gICAgICAgdGhpcy5fYWN0dWFsSGVpZ2h0ID0gaGVpZ2h0O1xyXG5cclxuICAgICAgICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpWzBdLnN0eWxlLndpZHRoID0gd2lkdGggKyBcInB4XCI7XHJcbiAgICAgICAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKVswXS5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyBcInB4XCI7XHJcblxyXG4vKiAgICAgICAgdmFyIGVqVGFiSW5zdGFuY2UgPSAkKHRoaXMuX3BhcmVudENvbnRlbnRJZCkuZGF0YShcImVqVGFiXCIpO1xyXG4gICAgICAgdmFyIGhlYWRlclNpemUgPSBlalRhYkluc3RhbmNlLm9wdGlvbihcImhlYWRlclNpemVcIik7Ki8gXHJcbiAgICAgICAvLyBTZXQgdGhlIHNpemVzIG9mIHRoZSBjb250ZW50cyBvZiB0aGlzIHRhYiBjb250cm9sXHJcbiAgICAgICB2YXIgaW5uZXJUYWJXaWR0aCA9IHdpZHRoIC0gNDg7IC8vIDQ4cHggc2lkZWJhciBvbiB0aGUgbGVmdFxyXG4gICAgICAgdmFyIGlubmVyVGFiSGVpZ2h0ID0gaGVpZ2h0IC0gNTA7IC8vIDUwcHggdG9wYmFyIFxyXG4gICAgICAgXHJcbiAgICAgICB0aGlzLl93aWRnZXRzLmZvckVhY2goKHdpZGdldCkgPT4ge1xyXG4gICAgICAgICAgICBpZih3aWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgd2lkZ2V0LnJlc2l6ZShpbm5lclRhYldpZHRoLCBpbm5lclRhYkhlaWdodCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgIH0pO1xyXG4gICB9XHJcbiAgIFxyXG4gICAvKipcclxuICAgICpcclxuICAgICpcclxuICAgICogQHBhcmFtIHtJV2lkZ2V0fSB3aWRnZXRcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICAgICogQHBhcmFtIHtWaWV3VHlwZX0gdmlld1R5cGVcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IGljb25QYXRoXHJcbiAgICAqIEBtZW1iZXJvZiBTaWRlQmFyV2lkZ2V0XHJcbiAgICAqL1xyXG4gICBhZGRXaWRnZXQod2lkZ2V0OiBJV2lkZ2V0LCBuYW1lOiBzdHJpbmcsIHZpZXdUeXBlOiBWaWV3VHlwZSwgaWNvblBhdGg6IHN0cmluZykge1xyXG4gICAgICAgIFxyXG4gICAgICAgIG5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHN1cGVyLmFkZFdpZGdldCh3aWRnZXQsIG5hbWUsIHZpZXdUeXBlKTtcclxuICAgICAgIC8vIEFkZCBhIHRhYiBpdGVtXHJcbiAgICAgICB2YXIgb3V0ZXJUYWJJZCA9IFwidGFiX1wiICsgbmFtZS5yZXBsYWNlKFwiIFwiLCBcIlwiKTtcclxuICAgICAgIHZhciBpbm5lclRhYklkID0gXCJpbm5lcl9cIiArIG91dGVyVGFiSWQ7XHJcblxyXG4gICAgICAgbGV0IGJ1dHRvbkNsYXNzID0gXCJcIjtcclxuICAgICAgIGxldCBvdXRlclRhYkNsYXNzID0gXCJcIjtcclxuICAgICAgIGlmKHZpZXdUeXBlID09IFZpZXdUeXBlLlVzZXIpe1xyXG4gICAgICAgICAgIGJ1dHRvbkNsYXNzID0gXCJyaWdodEhhbmRTaWRlQmFyQnV0dG9uXCJcclxuICAgICAgICAgICBvdXRlclRhYkNsYXNzID0gXCJhYnNvbHV0ZVRhYlwiO1xyXG4gICAgICAgfVxyXG4gICAgICAgbGV0IHRoZW1lZEljb25QYXRoID0gdGhpcy5nZXRUaGVtZWRGaWxlUGF0aChpY29uUGF0aCk7XHJcbiAgICAgICBsZXQgbmF2QnV0dG9uID0gYDxidXR0b24gaWQ9XCJgKyBvdXRlclRhYklkK2BfYnV0dG9uXCIgY2xhc3M9XCJpY29uNDggdGFibGlua3MgYCsgYnV0dG9uQ2xhc3MgK2BcIj48aW1nIHNyYz1cImAgKyB0aGVtZWRJY29uUGF0aCArIGBcIj48L2ltZz48L2J1dHRvbj5gXHJcbiAgICAgICAkKFwiLlwiK21haW5OYXZpZ2F0aW9uQ2xhc3NOYW1lKS5hcHBlbmQobmF2QnV0dG9uKTtcclxuICAgICAgXHJcbiAgICAgICBsZXQgb3V0ZXJUYWIgPSBgPGRpdiBpZD1cImArIG91dGVyVGFiSWQgKyBgXCIgY2xhc3M9XCJ0YWJjb250ZW50IGArb3V0ZXJUYWJDbGFzcytgXCIgPjwvZGl2PmA7XHJcbiAgICAgICAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKS5hcHBlbmQob3V0ZXJUYWIpO1xyXG5cclxuICAgICAgIGxldCBpbm5lclRhYiA9IGA8ZGl2IGlkPVwiYCsgaW5uZXJUYWJJZCArIGBcIj48L2Rpdj5gO1xyXG4gICAgICAgJChcIiNcIitvdXRlclRhYklkKS5hcHBlbmQoaW5uZXJUYWIpO1xyXG5cclxuICAgICAgIHdpZGdldC5pbml0aWFsaXplKGlubmVyVGFiSWQpO1xyXG5cclxuICAgICAgIGxldCB0YWJJZCA9IG5hbWUgKyBcIl9cIiArIHZpZXdUeXBlO1xyXG4gICAgICAgXHJcbiAgICAgICAkKFwiI1wiK291dGVyVGFiSWQrXCJfYnV0dG9uXCIpWzBdLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZTpFdmVudCkgPT4gdGhpcy5zd2l0Y2hUYWIob3V0ZXJUYWJJZCwgdGFiSWQgKSk7XHJcbiAgIH1cclxuXHJcbn1cclxuZXhwb3J0e1NpZGVCYXJXaWRnZXQsIG1haW5OYXZpZ2F0aW9uQ2xhc3NOYW1lfTsiXX0=