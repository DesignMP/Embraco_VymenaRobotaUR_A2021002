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
define(["require", "exports", "./widgetBase"], function (require, exports, widgetBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * The class is the base for views representing a container for a composition of other wigets
     *
     * @export
     * @abstract
     * @class ViewBase
     * @extends {WidgetBase}
     * @implements {IView}
     */
    var ViewBase = /** @class */ (function (_super) {
        __extends(ViewBase, _super);
        function ViewBase() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._childWidgets = [];
            return _this;
        }
        /**
         * Initializes the instance
         *
         * @param {string} layoutContainerId
         * @memberof ViewBase
         */
        ViewBase.prototype.initialize = function (layoutContainerId) {
            _super.prototype.initialize.call(this, layoutContainerId);
        };
        /**
         * Adds respectively connects a widget to its view
         *
         * @param {IWidget} widget
         * @memberof ViewBase
         */
        ViewBase.prototype.addWidget = function (widget) {
            this._childWidgets.push(widget);
            widget.view = this;
            // connect the widget to the views component layer
            this.connectWidgetToView(widget);
        };
        /**
         * Removes respectively disconnects a widget from its view
         *
         * @param {IWidget} widget
         * @memberof ViewBase
         */
        ViewBase.prototype.removeWidget = function (widget) {
            var i = this._childWidgets.indexOf(widget);
            if (i >= 0) {
                this._childWidgets.splice(i, 1);
            }
        };
        Object.defineProperty(ViewBase.prototype, "states", {
            /**
             * Gets the views states
             *
             * @readonly
             * @type {Store}
             * @memberof ViewBase
             */
            get: function () {
                return this._states;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Connects the widget to the views component layer
         *
         * @private
         * @param {IWidget} widget
         * @memberof ViewBase
         */
        ViewBase.prototype.connectWidgetToView = function (widget) {
        };
        return ViewBase;
    }(widgetBase_1.WidgetBase));
    exports.ViewBase = ViewBase;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld0Jhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY29tbW9uL3ZpZXdCYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFLQTs7Ozs7Ozs7T0FRRztJQUNIO1FBQXVDLDRCQUFVO1FBQWpEO1lBQUEscUVBZ0VDO1lBOURXLG1CQUFhLEdBQWtCLEVBQUUsQ0FBQzs7UUE4RDlDLENBQUM7UUE1REc7Ozs7O1dBS0c7UUFDSCw2QkFBVSxHQUFWLFVBQVcsaUJBQXlCO1lBQ2hDLGlCQUFNLFVBQVUsWUFBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3hDLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNILDRCQUFTLEdBQVQsVUFBVSxNQUFlO1lBQ3JCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2hDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBRW5CLGtEQUFrRDtZQUNsRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckMsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gsK0JBQVksR0FBWixVQUFhLE1BQWU7WUFDeEIsSUFBSSxDQUFDLEdBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNSLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQzthQUNsQztRQUNMLENBQUM7UUFTRCxzQkFBVyw0QkFBTTtZQVBqQjs7Ozs7O2VBTUc7aUJBQ0g7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ3hCLENBQUM7OztXQUFBO1FBRUQ7Ozs7OztXQU1HO1FBQ0ssc0NBQW1CLEdBQTNCLFVBQTRCLE1BQWU7UUFDM0MsQ0FBQztRQUlMLGVBQUM7SUFBRCxDQUFDLEFBaEVELENBQXVDLHVCQUFVLEdBZ0VoRDtJQWhFcUIsNEJBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBXaWRnZXRCYXNlIH0gZnJvbSBcIi4vd2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBJVmlldyB9IGZyb20gXCIuL2ludGVyZmFjZXMvdmlld0ludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJV2lkZ2V0IH0gZnJvbSBcIi4vaW50ZXJmYWNlcy93aWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU3RvcmUgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL3N0b3JlXCI7XHJcblxyXG4vKipcclxuICogVGhlIGNsYXNzIGlzIHRoZSBiYXNlIGZvciB2aWV3cyByZXByZXNlbnRpbmcgYSBjb250YWluZXIgZm9yIGEgY29tcG9zaXRpb24gb2Ygb3RoZXIgd2lnZXRzXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGFic3RyYWN0XHJcbiAqIEBjbGFzcyBWaWV3QmFzZVxyXG4gKiBAZXh0ZW5kcyB7V2lkZ2V0QmFzZX1cclxuICogQGltcGxlbWVudHMge0lWaWV3fVxyXG4gKi9cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFZpZXdCYXNlIGV4dGVuZHMgV2lkZ2V0QmFzZSBpbXBsZW1lbnRzIElWaWV3IHtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfY2hpbGRXaWRnZXRzOkFycmF5PElXaWRnZXQ+ID0gW107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXplcyB0aGUgaW5zdGFuY2VcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGF5b3V0Q29udGFpbmVySWRcclxuICAgICAqIEBtZW1iZXJvZiBWaWV3QmFzZVxyXG4gICAgICovXHJcbiAgICBpbml0aWFsaXplKGxheW91dENvbnRhaW5lcklkOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlci5pbml0aWFsaXplKGxheW91dENvbnRhaW5lcklkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgcmVzcGVjdGl2ZWx5IGNvbm5lY3RzIGEgd2lkZ2V0IHRvIGl0cyB2aWV3XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJV2lkZ2V0fSB3aWRnZXRcclxuICAgICAqIEBtZW1iZXJvZiBWaWV3QmFzZVxyXG4gICAgICovXHJcbiAgICBhZGRXaWRnZXQod2lkZ2V0OiBJV2lkZ2V0KSB7ICAgIFxyXG4gICAgICAgIHRoaXMuX2NoaWxkV2lkZ2V0cy5wdXNoKHdpZGdldCk7XHJcbiAgICAgICAgd2lkZ2V0LnZpZXcgPSB0aGlzO1xyXG5cclxuICAgICAgICAvLyBjb25uZWN0IHRoZSB3aWRnZXQgdG8gdGhlIHZpZXdzIGNvbXBvbmVudCBsYXllclxyXG4gICAgICAgIHRoaXMuY29ubmVjdFdpZGdldFRvVmlldyh3aWRnZXQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyByZXNwZWN0aXZlbHkgZGlzY29ubmVjdHMgYSB3aWRnZXQgZnJvbSBpdHMgdmlld1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SVdpZGdldH0gd2lkZ2V0XHJcbiAgICAgKiBAbWVtYmVyb2YgVmlld0Jhc2VcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlV2lkZ2V0KHdpZGdldDogSVdpZGdldCkgeyAgICBcclxuICAgICAgICBsZXQgaSAgPSB0aGlzLl9jaGlsZFdpZGdldHMuaW5kZXhPZih3aWRnZXQpO1xyXG4gICAgICAgIGlmIChpID49IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fY2hpbGRXaWRnZXRzLnNwbGljZShpLDEpOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSB2aWV3cyBzdGF0ZXNcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtTdG9yZX1cclxuICAgICAqIEBtZW1iZXJvZiBWaWV3QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHN0YXRlcygpIDogU3RvcmUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0ZXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25uZWN0cyB0aGUgd2lkZ2V0IHRvIHRoZSB2aWV3cyBjb21wb25lbnQgbGF5ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtJV2lkZ2V0fSB3aWRnZXRcclxuICAgICAqIEBtZW1iZXJvZiBWaWV3QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbm5lY3RXaWRnZXRUb1ZpZXcod2lkZ2V0OiBJV2lkZ2V0KSB7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbn1cclxuIl19