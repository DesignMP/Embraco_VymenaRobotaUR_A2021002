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
define(["require", "exports", "../common/widgetBase"], function (require, exports, widgetBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * implements the StartPageWidget
     *
     * @class StartPageWidget
     * @extends {WidgetBase}
     */
    var StartPageWidget = /** @class */ (function (_super) {
        __extends(StartPageWidget, _super);
        function StartPageWidget() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /* initialize the widget
         *
         * @param {string} layoutContainerId
         * @memberof StartPageWidget
         */
        StartPageWidget.prototype.initialize = function (layoutContainerId) {
            _super.prototype.initialize.call(this, layoutContainerId);
        };
        /**
         * Loads the styles for the start page widget
         *
         * @memberof SplitterWidget
         */
        StartPageWidget.prototype.loadStyles = function () {
            _super.prototype.addStyle.call(this, "widgets/startPageWidget/style/css/startPageStyle.css");
        };
        /**
         * Creates the widget content and eventually subwidgets
         *
         * @memberof StartPageWidget
         */
        StartPageWidget.prototype.createWidgets = function () {
            $(this.cssParentContentId)[0].innerHTML += " <div id=\"parent_mCo_logo\">\n                                                        <img id=\"mCo_logo\"/>\n                                                    </div>";
        };
        /** resizes the startpage widget
         *
         * @param {number} width
         * @param {number} height
         * @memberof StartPageWidget
         */
        StartPageWidget.prototype.resize = function (width, height) {
            $(this.cssParentContentId)[0].style.width = width.toString() + "px";
            $(this.cssParentContentId)[0].style.height = height.toString() + "px";
        };
        return StartPageWidget;
    }(widgetBase_1.WidgetBase));
    exports.StartPageWidget = StartPageWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhcnRQYWdlV2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3N0YXJ0UGFnZVdpZGdldC9zdGFydFBhZ2VXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUdBOzs7OztPQUtHO0lBQ0g7UUFBOEIsbUNBQVU7UUFBeEM7O1FBeUNBLENBQUM7UUF2Q0c7Ozs7V0FJRztRQUNILG9DQUFVLEdBQVYsVUFBVyxpQkFBeUI7WUFDaEMsaUJBQU0sVUFBVSxZQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDeEMsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSCxvQ0FBVSxHQUFWO1lBQ0ksaUJBQU0sUUFBUSxZQUFDLHNEQUFzRCxDQUFDLENBQUM7UUFDM0UsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSCx1Q0FBYSxHQUFiO1lBQ0ksQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsSUFBRywyS0FFUyxDQUFDO1FBQ3hELENBQUM7UUFFRDs7Ozs7V0FLRztRQUNILGdDQUFNLEdBQU4sVUFBTyxLQUFhLEVBQUUsTUFBYztZQUNoQyxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDO1lBQ3BFLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDMUUsQ0FBQztRQUNMLHNCQUFDO0lBQUQsQ0FBQyxBQXpDRCxDQUE4Qix1QkFBVSxHQXlDdkM7SUFFUSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFdpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL3dpZGdldEJhc2VcIjtcclxuaW1wb3J0IHsgSVN0YXJ0UGFnZVdpZGdldCB9IGZyb20gXCIuL2ludGVyZmFjZXMvc3RhcnRQYWdlV2lkZ2V0SW50ZXJmYWNlXCI7XHJcblxyXG4vKipcclxuICogaW1wbGVtZW50cyB0aGUgU3RhcnRQYWdlV2lkZ2V0XHJcbiAqXHJcbiAqIEBjbGFzcyBTdGFydFBhZ2VXaWRnZXRcclxuICogQGV4dGVuZHMge1dpZGdldEJhc2V9XHJcbiAqL1xyXG5jbGFzcyBTdGFydFBhZ2VXaWRnZXQgZXh0ZW5kcyBXaWRnZXRCYXNlIGltcGxlbWVudHMgSVN0YXJ0UGFnZVdpZGdldCB7XHJcblxyXG4gICAgLyogaW5pdGlhbGl6ZSB0aGUgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxheW91dENvbnRhaW5lcklkXHJcbiAgICAgKiBAbWVtYmVyb2YgU3RhcnRQYWdlV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQ6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIExvYWRzIHRoZSBzdHlsZXMgZm9yIHRoZSBzdGFydCBwYWdlIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBsb2FkU3R5bGVzKCl7XHJcbiAgICAgICAgc3VwZXIuYWRkU3R5bGUoXCJ3aWRnZXRzL3N0YXJ0UGFnZVdpZGdldC9zdHlsZS9jc3Mvc3RhcnRQYWdlU3R5bGUuY3NzXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgd2lkZ2V0IGNvbnRlbnQgYW5kIGV2ZW50dWFsbHkgc3Vid2lkZ2V0c1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBTdGFydFBhZ2VXaWRnZXRcclxuICAgICAqL1xyXG4gICAgY3JlYXRlV2lkZ2V0cygpIHtcclxuICAgICAgICAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKVswXS5pbm5lckhUTUwrPSBgIDxkaXYgaWQ9XCJwYXJlbnRfbUNvX2xvZ29cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIGlkPVwibUNvX2xvZ29cIi8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5gO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiByZXNpemVzIHRoZSBzdGFydHBhZ2Ugd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0XHJcbiAgICAgKiBAbWVtYmVyb2YgU3RhcnRQYWdlV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHJlc2l6ZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcil7XHJcbiAgICAgICAgJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZClbMF0uc3R5bGUud2lkdGggPSB3aWR0aC50b1N0cmluZygpICsgXCJweFwiO1xyXG4gICAgICAgICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpWzBdLnN0eWxlLmhlaWdodCA9IGhlaWdodC50b1N0cmluZygpICsgXCJweFwiO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBTdGFydFBhZ2VXaWRnZXQgfTsiXX0=