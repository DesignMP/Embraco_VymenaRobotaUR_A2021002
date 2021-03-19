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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhcnRQYWdlV2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3N0YXJ0UGFnZVdpZGdldC9zdGFydFBhZ2VXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUdBOzs7OztPQUtHO0lBQ0g7UUFBOEIsbUNBQVU7UUFBeEM7O1FBNkNBLENBQUM7UUEzQ0c7Ozs7V0FJRztRQUNILG9DQUFVLEdBQVYsVUFBVyxpQkFBeUI7WUFDaEMsaUJBQU0sVUFBVSxZQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDeEMsQ0FBQztRQUVELDZDQUFtQixHQUFuQjtZQUNJLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN2QyxDQUFDO1FBRUQ7Ozs7V0FJRztRQUNILG9DQUFVLEdBQVY7WUFDSSxpQkFBTSxRQUFRLFlBQUMsc0RBQXNELENBQUMsQ0FBQztRQUMzRSxDQUFDO1FBRUQ7Ozs7V0FJRztRQUNILHNDQUFZLEdBQVo7WUFDSSxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxJQUFHLDJLQUVTLENBQUM7UUFDeEQsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gsZ0NBQU0sR0FBTixVQUFPLEtBQWEsRUFBRSxNQUFjO1lBQ2hDLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUM7WUFDcEUsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQztRQUMxRSxDQUFDO1FBQ0wsc0JBQUM7SUFBRCxDQUFDLEFBN0NELENBQThCLHVCQUFVLEdBNkN2QztJQUVRLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vd2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBJU3RhcnRQYWdlV2lkZ2V0IH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9zdGFydFBhZ2VXaWRnZXRJbnRlcmZhY2VcIjtcclxuXHJcbi8qKlxyXG4gKiBpbXBsZW1lbnRzIHRoZSBTdGFydFBhZ2VXaWRnZXRcclxuICpcclxuICogQGNsYXNzIFN0YXJ0UGFnZVdpZGdldFxyXG4gKiBAZXh0ZW5kcyB7V2lkZ2V0QmFzZX1cclxuICovXHJcbmNsYXNzIFN0YXJ0UGFnZVdpZGdldCBleHRlbmRzIFdpZGdldEJhc2UgaW1wbGVtZW50cyBJU3RhcnRQYWdlV2lkZ2V0IHtcclxuXHJcbiAgICAvKiBpbml0aWFsaXplIHRoZSB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGF5b3V0Q29udGFpbmVySWRcclxuICAgICAqIEBtZW1iZXJvZiBTdGFydFBhZ2VXaWRnZXRcclxuICAgICAqL1xyXG4gICAgaW5pdGlhbGl6ZShsYXlvdXRDb250YWluZXJJZDogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZShsYXlvdXRDb250YWluZXJJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZUNvbXBvbmVudCgpe1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmRpc2FibGVQZXJzaXN0aW5nKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogTG9hZHMgdGhlIHN0eWxlcyBmb3IgdGhlIHN0YXJ0IHBhZ2Ugd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGxvYWRTdHlsZXMoKXtcclxuICAgICAgICBzdXBlci5hZGRTdHlsZShcIndpZGdldHMvc3RhcnRQYWdlV2lkZ2V0L3N0eWxlL2Nzcy9zdGFydFBhZ2VTdHlsZS5jc3NcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSB3aWRnZXQgY29udGVudCBhbmQgZXZlbnR1YWxseSBzdWJ3aWRnZXRzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFN0YXJ0UGFnZVdpZGdldFxyXG4gICAgICovXHJcbiAgICBjcmVhdGVMYXlvdXQoKSB7XHJcbiAgICAgICAgJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZClbMF0uaW5uZXJIVE1MKz0gYCA8ZGl2IGlkPVwicGFyZW50X21Db19sb2dvXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBpZD1cIm1Db19sb2dvXCIvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+YDtcclxuICAgIH1cclxuXHJcbiAgICAvKiogcmVzaXplcyB0aGUgc3RhcnRwYWdlIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodFxyXG4gICAgICogQG1lbWJlcm9mIFN0YXJ0UGFnZVdpZGdldFxyXG4gICAgICovXHJcbiAgICByZXNpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpe1xyXG4gICAgICAgICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpWzBdLnN0eWxlLndpZHRoID0gd2lkdGgudG9TdHJpbmcoKSArIFwicHhcIjtcclxuICAgICAgICAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKVswXS5zdHlsZS5oZWlnaHQgPSBoZWlnaHQudG9TdHJpbmcoKSArIFwicHhcIjtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgU3RhcnRQYWdlV2lkZ2V0IH07Il19