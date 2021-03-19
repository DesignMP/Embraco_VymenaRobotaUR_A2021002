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
         * Returns the widget for the given id if found, else undefined
         *
         * @param {string} id the widget id
         * @returns {*}
         * @memberof ViewBase
         */
        ViewBase.prototype.getWidgetById = function (id) {
            for (var key in this._childWidgets) {
                var widget = this._childWidgets[key];
                if (widget.component.id == id) {
                    return widget;
                }
            }
            return undefined;
        };
        return ViewBase;
    }(widgetBase_1.WidgetBase));
    exports.ViewBase = ViewBase;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld0Jhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY29tbW9uL3ZpZXdCYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFLQTs7Ozs7Ozs7T0FRRztJQUNIO1FBQXVDLDRCQUFVO1FBQWpEO1lBQUEscUVBaUVDO1lBL0RXLG1CQUFhLEdBQWtCLEVBQUUsQ0FBQzs7UUErRDlDLENBQUM7UUE3REc7Ozs7O1dBS0c7UUFDSCw2QkFBVSxHQUFWLFVBQVcsaUJBQXlCO1lBQ2hDLGlCQUFNLFVBQVUsWUFBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3hDLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNILDRCQUFTLEdBQVQsVUFBVSxNQUFlO1lBQ3JCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2hDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNILCtCQUFZLEdBQVosVUFBYSxNQUFlO1lBQ3hCLElBQUksQ0FBQyxHQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDUixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7YUFDbEM7UUFDTCxDQUFDO1FBU0Qsc0JBQVcsNEJBQU07WUFQakI7Ozs7OztlQU1HO2lCQUNIO2dCQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUN4QixDQUFDOzs7V0FBQTtRQUVEOzs7Ozs7V0FNRztRQUNJLGdDQUFhLEdBQXBCLFVBQXFCLEVBQVU7WUFDM0IsS0FBSyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO2dCQUNoQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNyQyxJQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBQztvQkFDekIsT0FBTyxNQUFNLENBQUM7aUJBQ2pCO2FBQ0o7WUFDRCxPQUFPLFNBQVMsQ0FBQTtRQUNwQixDQUFDO1FBQ0wsZUFBQztJQUFELENBQUMsQUFqRUQsQ0FBdUMsdUJBQVUsR0FpRWhEO0lBakVxQiw0QkFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFdpZGdldEJhc2UgfSBmcm9tIFwiLi93aWRnZXRCYXNlXCI7XHJcbmltcG9ydCB7IElWaWV3IH0gZnJvbSBcIi4vaW50ZXJmYWNlcy92aWV3SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElXaWRnZXQgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL3dpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvc3RvcmVcIjtcclxuXHJcbi8qKlxyXG4gKiBUaGUgY2xhc3MgaXMgdGhlIGJhc2UgZm9yIHZpZXdzIHJlcHJlc2VudGluZyBhIGNvbnRhaW5lciBmb3IgYSBjb21wb3NpdGlvbiBvZiBvdGhlciB3aWdldHNcclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAYWJzdHJhY3RcclxuICogQGNsYXNzIFZpZXdCYXNlXHJcbiAqIEBleHRlbmRzIHtXaWRnZXRCYXNlfVxyXG4gKiBAaW1wbGVtZW50cyB7SVZpZXd9XHJcbiAqL1xyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVmlld0Jhc2UgZXh0ZW5kcyBXaWRnZXRCYXNlIGltcGxlbWVudHMgSVZpZXcge1xyXG4gICAgXHJcbiAgICBwcml2YXRlIF9jaGlsZFdpZGdldHM6QXJyYXk8SVdpZGdldD4gPSBbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemVzIHRoZSBpbnN0YW5jZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYXlvdXRDb250YWluZXJJZFxyXG4gICAgICogQG1lbWJlcm9mIFZpZXdCYXNlXHJcbiAgICAgKi9cclxuICAgIGluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQ6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyByZXNwZWN0aXZlbHkgY29ubmVjdHMgYSB3aWRnZXQgdG8gaXRzIHZpZXdcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lXaWRnZXR9IHdpZGdldFxyXG4gICAgICogQG1lbWJlcm9mIFZpZXdCYXNlXHJcbiAgICAgKi9cclxuICAgIGFkZFdpZGdldCh3aWRnZXQ6IElXaWRnZXQpIHsgICAgXHJcbiAgICAgICAgdGhpcy5fY2hpbGRXaWRnZXRzLnB1c2god2lkZ2V0KTtcclxuICAgICAgICB3aWRnZXQudmlldyA9IHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIHJlc3BlY3RpdmVseSBkaXNjb25uZWN0cyBhIHdpZGdldCBmcm9tIGl0cyB2aWV3XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJV2lkZ2V0fSB3aWRnZXRcclxuICAgICAqIEBtZW1iZXJvZiBWaWV3QmFzZVxyXG4gICAgICovXHJcbiAgICByZW1vdmVXaWRnZXQod2lkZ2V0OiBJV2lkZ2V0KSB7ICAgIFxyXG4gICAgICAgIGxldCBpICA9IHRoaXMuX2NoaWxkV2lkZ2V0cy5pbmRleE9mKHdpZGdldCk7XHJcbiAgICAgICAgaWYgKGkgPj0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jaGlsZFdpZGdldHMuc3BsaWNlKGksMSk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHZpZXdzIHN0YXRlc1xyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge1N0b3JlfVxyXG4gICAgICogQG1lbWJlcm9mIFZpZXdCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgc3RhdGVzKCkgOiBTdG9yZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXRlcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHdpZGdldCBmb3IgdGhlIGdpdmVuIGlkIGlmIGZvdW5kLCBlbHNlIHVuZGVmaW5lZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZCB0aGUgd2lkZ2V0IGlkXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBWaWV3QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0V2lkZ2V0QnlJZChpZDogc3RyaW5nKTogSVdpZGdldHx1bmRlZmluZWR7XHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMuX2NoaWxkV2lkZ2V0cykge1xyXG4gICAgICAgICAgICBsZXQgd2lkZ2V0ID0gdGhpcy5fY2hpbGRXaWRnZXRzW2tleV07XHJcbiAgICAgICAgICAgIGlmKHdpZGdldC5jb21wb25lbnQuaWQgPT0gaWQpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHdpZGdldDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkXHJcbiAgICB9XHJcbn1cclxuIl19