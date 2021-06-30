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
        StartPageWidget.prototype.initializeComponent = function () {
            this.component.disablePersisting();
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
        StartPageWidget.prototype.createLayout = function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhcnRQYWdlV2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3N0YXJ0UGFnZVdpZGdldC9zdGFydFBhZ2VXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUdBOzs7OztPQUtHO0lBQ0g7UUFBOEIsbUNBQVU7UUFBeEM7O1FBb0NBLENBQUM7UUFsQ0csNkNBQW1CLEdBQW5CO1lBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3ZDLENBQUM7UUFFRDs7OztXQUlHO1FBQ0gsb0NBQVUsR0FBVjtZQUNJLGlCQUFNLFFBQVEsWUFBQyxzREFBc0QsQ0FBQyxDQUFDO1FBQzNFLENBQUM7UUFFRDs7OztXQUlHO1FBQ0gsc0NBQVksR0FBWjtZQUNJLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLElBQUcsMktBRVMsQ0FBQztRQUN4RCxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSCxnQ0FBTSxHQUFOLFVBQU8sS0FBYSxFQUFFLE1BQWM7WUFDaEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQztZQUNwRSxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQzFFLENBQUM7UUFDTCxzQkFBQztJQUFELENBQUMsQUFwQ0QsQ0FBOEIsdUJBQVUsR0FvQ3ZDO0lBRVEsMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBXaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi93aWRnZXRCYXNlXCI7XHJcbmltcG9ydCB7IElTdGFydFBhZ2VXaWRnZXQgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL3N0YXJ0UGFnZVdpZGdldEludGVyZmFjZVwiO1xyXG5cclxuLyoqXHJcbiAqIGltcGxlbWVudHMgdGhlIFN0YXJ0UGFnZVdpZGdldFxyXG4gKlxyXG4gKiBAY2xhc3MgU3RhcnRQYWdlV2lkZ2V0XHJcbiAqIEBleHRlbmRzIHtXaWRnZXRCYXNlfVxyXG4gKi9cclxuY2xhc3MgU3RhcnRQYWdlV2lkZ2V0IGV4dGVuZHMgV2lkZ2V0QmFzZSBpbXBsZW1lbnRzIElTdGFydFBhZ2VXaWRnZXQge1xyXG5cclxuICAgIGluaXRpYWxpemVDb21wb25lbnQoKXtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5kaXNhYmxlUGVyc2lzdGluZygpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIExvYWRzIHRoZSBzdHlsZXMgZm9yIHRoZSBzdGFydCBwYWdlIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBsb2FkU3R5bGVzKCl7XHJcbiAgICAgICAgc3VwZXIuYWRkU3R5bGUoXCJ3aWRnZXRzL3N0YXJ0UGFnZVdpZGdldC9zdHlsZS9jc3Mvc3RhcnRQYWdlU3R5bGUuY3NzXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgd2lkZ2V0IGNvbnRlbnQgYW5kIGV2ZW50dWFsbHkgc3Vid2lkZ2V0c1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBTdGFydFBhZ2VXaWRnZXRcclxuICAgICAqL1xyXG4gICAgY3JlYXRlTGF5b3V0KCkge1xyXG4gICAgICAgICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpWzBdLmlubmVySFRNTCs9IGAgPGRpdiBpZD1cInBhcmVudF9tQ29fbG9nb1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgaWQ9XCJtQ29fbG9nb1wiLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PmA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIHJlc2l6ZXMgdGhlIHN0YXJ0cGFnZSB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gd2lkdGhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcclxuICAgICAqIEBtZW1iZXJvZiBTdGFydFBhZ2VXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcmVzaXplKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKXtcclxuICAgICAgICAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKVswXS5zdHlsZS53aWR0aCA9IHdpZHRoLnRvU3RyaW5nKCkgKyBcInB4XCI7XHJcbiAgICAgICAgJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZClbMF0uc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0LnRvU3RyaW5nKCkgKyBcInB4XCI7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IFN0YXJ0UGFnZVdpZGdldCB9OyJdfQ==