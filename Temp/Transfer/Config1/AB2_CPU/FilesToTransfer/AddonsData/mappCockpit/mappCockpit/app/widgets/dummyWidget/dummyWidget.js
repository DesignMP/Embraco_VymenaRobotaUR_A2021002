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
define(["require", "exports", "../common/widgetBase", "../../common/colorHelper"], function (require, exports, widgetBase_1, colorHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * implements the dummy widget
     *
     * @class DummyWidget
     * @extends {WidgetBase}
     */
    var DummyWidget = /** @class */ (function (_super) {
        __extends(DummyWidget, _super);
        function DummyWidget() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**  initialize the widget
         *
         * @param {string} layoutContainerId
         * @memberof DummyWidget
         */
        DummyWidget.prototype.initialize = function (layoutContainerId) {
            _super.prototype.initialize.call(this, layoutContainerId);
        };
        /**
         * Creates the widget content and eventually subwidgets
         *
         * @param {string} layoutContainerId
         * @memberof DummyWidget
         */
        DummyWidget.prototype.createWidgets = function () {
            this.createDummyData();
        };
        DummyWidget.prototype.resize = function (width, height) {
            $(this.cssParentContentId)[0].style.width = width.toString() + "px";
            $(this.cssParentContentId)[0].style.height = height.toString() + "px";
        };
        DummyWidget.prototype.createDummyData = function () {
            $(this.cssParentContentId).append("Dummy widget");
            $(this.cssParentContentId)[0].style.background = colorHelper_1.ColorHelper.getColor();
            $(this.cssParentContentId)[0].style.overflow = "hidden";
        };
        return DummyWidget;
    }(widgetBase_1.WidgetBase));
    exports.DummyWidget = DummyWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHVtbXlXaWRnZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvZHVtbXlXaWRnZXQvZHVtbXlXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUlBOzs7OztPQUtHO0lBQ0g7UUFBMEIsK0JBQVU7UUFBcEM7O1FBaUNBLENBQUM7UUEvQkc7Ozs7V0FJRztRQUNILGdDQUFVLEdBQVYsVUFBVyxpQkFBeUI7WUFDaEMsaUJBQU0sVUFBVSxZQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDeEMsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gsbUNBQWEsR0FBYjtZQUNJLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUMzQixDQUFDO1FBRUQsNEJBQU0sR0FBTixVQUFPLEtBQWEsRUFBRSxNQUFjO1lBRWhDLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUM7WUFDcEUsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQztRQUMxRSxDQUFDO1FBRU8scUNBQWUsR0FBdkI7WUFFSSxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ2xELENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLHlCQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDeEUsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQzVELENBQUM7UUFDTCxrQkFBQztJQUFELENBQUMsQUFqQ0QsQ0FBMEIsdUJBQVUsR0FpQ25DO0lBRVEsa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBXaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi93aWRnZXRCYXNlXCI7XHJcbmltcG9ydCB7IElEdW1teVdpZGdldCB9IGZyb20gXCIuL2ludGVyZmFjZXMvZHVtbXlXaWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ29sb3JIZWxwZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbG9ySGVscGVyXCI7XHJcblxyXG4vKipcclxuICogaW1wbGVtZW50cyB0aGUgZHVtbXkgd2lkZ2V0XHJcbiAqXHJcbiAqIEBjbGFzcyBEdW1teVdpZGdldFxyXG4gKiBAZXh0ZW5kcyB7V2lkZ2V0QmFzZX1cclxuICovXHJcbmNsYXNzIER1bW15V2lkZ2V0IGV4dGVuZHMgV2lkZ2V0QmFzZSBpbXBsZW1lbnRzIElEdW1teVdpZGdldCB7XHJcblxyXG4gICAgLyoqICBpbml0aWFsaXplIHRoZSB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGF5b3V0Q29udGFpbmVySWRcclxuICAgICAqIEBtZW1iZXJvZiBEdW1teVdpZGdldFxyXG4gICAgICovXHJcbiAgICBpbml0aWFsaXplKGxheW91dENvbnRhaW5lcklkOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlci5pbml0aWFsaXplKGxheW91dENvbnRhaW5lcklkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIHdpZGdldCBjb250ZW50IGFuZCBldmVudHVhbGx5IHN1YndpZGdldHNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGF5b3V0Q29udGFpbmVySWRcclxuICAgICAqIEBtZW1iZXJvZiBEdW1teVdpZGdldFxyXG4gICAgICovXHJcbiAgICBjcmVhdGVXaWRnZXRzKCkge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlRHVtbXlEYXRhKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzaXplKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKXtcclxuXHJcbiAgICAgICAgJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZClbMF0uc3R5bGUud2lkdGggPSB3aWR0aC50b1N0cmluZygpICsgXCJweFwiO1xyXG4gICAgICAgICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpWzBdLnN0eWxlLmhlaWdodCA9IGhlaWdodC50b1N0cmluZygpICsgXCJweFwiO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3JlYXRlRHVtbXlEYXRhKCkge1xyXG5cclxuICAgICAgICAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKS5hcHBlbmQoXCJEdW1teSB3aWRnZXRcIik7XHJcbiAgICAgICAgJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZClbMF0uc3R5bGUuYmFja2dyb3VuZCA9IENvbG9ySGVscGVyLmdldENvbG9yKCk7XHJcbiAgICAgICAgJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZClbMF0uc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBEdW1teVdpZGdldCB9OyJdfQ==