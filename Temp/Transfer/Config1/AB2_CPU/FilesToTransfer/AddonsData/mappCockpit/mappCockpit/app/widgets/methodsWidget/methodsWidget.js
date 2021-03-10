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
define(["require", "exports", "../common/widgetBase", "../../widgets/widgets", "../common/viewTypeProvider"], function (require, exports, widgetBase_1, Widgets, viewTypeProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * implements displaying and execution of methods
     *
     * @class MethodsWidget
     * @extends {WidgetBase}
     * @implements {IMethodsWidget}
     */
    var MethodsWidget = /** @class */ (function (_super) {
        __extends(MethodsWidget, _super);
        function MethodsWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._methods = [];
            _this._layoutWidgetActivated = function (sender, args) { return _this.onContentActivated(sender, args); };
            _this._methodListSelectionChangedHandler = function (sender, args) { return _this.onMethodListSelectionChanged(sender, args); };
            return _this;
        }
        MethodsWidget.prototype.initialize = function (layoutContainerId) {
            _super.prototype.initialize.call(this, layoutContainerId);
        };
        Object.defineProperty(MethodsWidget.prototype, "methods", {
            /**
             * Sets the methods data link as a reference to the methods to be displayed
             *
             * @memberof MethodsWidget
             */
            set: function (methods) {
                this._methods = methods;
                if (methods.length > 0) {
                    this.onComponentMethodsUpdated(methods);
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * The component methods have been updated.....
         *
         * @param {*} componentMethods
         * @returns {*}
         * @memberof MethodsWidget
         */
        MethodsWidget.prototype.onComponentMethodsUpdated = function (componentMethods) {
            this.connectMethodsListWidget();
        };
        /**
         * Creates the layout of the widget
         *
         * @memberof MethodsWidget
         */
        MethodsWidget.prototype.createLayout = function () {
            this._layoutWidget = Widgets.SplitterWidget.create();
            this._layoutWidget.initialize(this.parentContentId, 30);
            this._layoutWidget.setHeaderContent("Commands");
            this._layoutWidget.eventWidgetActivated.attach(this._layoutWidgetActivated);
        };
        /**
         * Creates the widget content and eventually subwidgets
         *
         * @memberof MethodsWidget
         */
        MethodsWidget.prototype.createWidgets = function () {
            this._methodListWidget = Widgets.MethodListWidget.create();
            this._methodListWidget.dataModel = this.dataModel;
            this._layoutWidget.addWidget(this._methodListWidget, "MethodList", viewTypeProvider_1.ViewType.Default, -1);
            this._methodListWidget.eventSelectionChanged.attach(this._methodListSelectionChangedHandler);
            this._methodParameterListWidget = Widgets.MethodParameterListWidget.create();
            this._layoutWidget.addWidget(this._methodParameterListWidget, "ParameterList", viewTypeProvider_1.ViewType.Default, -1);
            this.initializeLayout();
        };
        /**
         * activates MethodWidget
         *
         * @memberof MethodsWidget
         */
        MethodsWidget.prototype.activate = function () {
            this._layoutWidget.activate();
        };
        /**
         * deactivates MethodWidget
         *
         * @memberof MethodsWidget
         */
        MethodsWidget.prototype.deactivate = function () {
        };
        /**
         * disposes MethodWidget
         *
         * @memberof MethodsWidget
         */
        MethodsWidget.prototype.dispose = function () {
            if (this._methodListWidget != undefined) {
                this._methodListWidget.eventSelectionChanged.detach(this._methodListSelectionChangedHandler);
            }
            this._layoutWidget.eventWidgetActivated.detach(this._layoutWidgetActivated);
            this._layoutWidget.dispose();
            _super.prototype.dispose.call(this);
        };
        /**
         * resizes the methods widget
         *
         * @param {number} width
         * @param {number} height
         * @memberof MethodsWidget
         */
        MethodsWidget.prototype.resize = function (width, height) {
            this._actualWidth = width;
            this._actualHeight = height;
            if (this._layoutWidget != undefined) {
                this._layoutWidget.resize(width, height);
            }
        };
        MethodsWidget.prototype.onMethodListSelectionChanged = function (sender, args) {
            this._methodParameterListWidget.updateParametersList(args);
        };
        MethodsWidget.prototype.connectMethodsListWidget = function () {
            if (this._methodListWidget) {
                this._methodListWidget.methods = this._methods;
            }
        };
        MethodsWidget.prototype.onContentActivated = function (sender, args) {
            args.widget.activate();
            this.resize(this._actualWidth, this._actualHeight);
        };
        MethodsWidget.prototype.initializeLayout = function () {
            var keys = Object.keys(this._layoutWidget.layoutPanes);
            if (keys.length == 2) {
                // Set initial pane sizes and settings
                this._layoutWidget.setOrientation(true);
                // MethodList
                var key0 = keys[0];
                this._layoutWidget.layoutPanes[key0].size = 0;
                this._layoutWidget.layoutPanes[key0].fillSpace = true;
                this._layoutWidget.layoutPanes[key0].expandable = false;
                this._layoutWidget.layoutPanes[key0].collapsible = false;
                this._layoutWidget.layoutPanes[key0].minimumSize = 38;
                // ParameterList
                var key1 = keys[1];
                this._layoutWidget.layoutPanes[key1].size = 200;
                this._layoutWidget.layoutPanes[key1].expandable = false;
                this._layoutWidget.layoutPanes[key1].collapsible = false;
                // Redraw the layout
                this._layoutWidget.recalculateLayout();
            }
            else {
                throw (new Error("this._layoutWidget.layoutPanes.length != 2"));
            }
        };
        return MethodsWidget;
    }(widgetBase_1.WidgetBase));
    exports.MethodsWidget = MethodsWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0aG9kc1dpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9tZXRob2RzV2lkZ2V0L21ldGhvZHNXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQU9BOzs7Ozs7T0FNRztJQUNIO1FBQTRCLGlDQUFVO1FBQXRDO1lBQUEscUVBNkpDO1lBeEpXLGNBQVEsR0FBc0MsRUFBRSxDQUFDO1lBRWpELDRCQUFzQixHQUFHLFVBQUMsTUFBTSxFQUFDLElBQUksSUFBRyxPQUFBLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLEVBQXBDLENBQW9DLENBQUM7WUFDN0Usd0NBQWtDLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFHLE9BQUEsS0FBSSxDQUFDLDRCQUE0QixDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsRUFBOUMsQ0FBOEMsQ0FBQzs7UUFxSi9HLENBQUM7UUFuSkcsa0NBQVUsR0FBVixVQUFXLGlCQUF5QjtZQUNoQyxpQkFBTSxVQUFVLFlBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUN4QyxDQUFDO1FBT0Qsc0JBQVcsa0NBQU87WUFMbEI7Ozs7ZUFJRztpQkFDSCxVQUFtQixPQUEwQztnQkFDekQsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7Z0JBQ3hCLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQ3BCLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDM0M7WUFDTCxDQUFDOzs7V0FBQTtRQUVEOzs7Ozs7V0FNRztRQUNILGlEQUF5QixHQUF6QixVQUEwQixnQkFBcUI7WUFDM0MsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7UUFDcEMsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSCxvQ0FBWSxHQUFaO1lBQ0ksSUFBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLENB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LENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7Z0JBRXpELG9CQUFvQjtnQkFDcEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2FBQzFDO2lCQUNHO2dCQUNBLE1BQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDLENBQUM7YUFDbEU7UUFDTCxDQUFDO1FBQ0wsb0JBQUM7SUFBRCxDQUFDLEFBN0pELENBQTRCLHVCQUFVLEdBNkpyQztJQUVRLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2xpYnMvdWkvVHlwZXMvZWoud2ViLmFsbC5kLnRzXCIgLz5cclxuaW1wb3J0IHsgV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vd2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBJTWV0aG9kc1dpZGdldCB9IGZyb20gXCIuL2ludGVyZmFjZXMvbWV0aG9kc1dpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgKiBhcyBXaWRnZXRzIGZyb20gXCIuLi8uLi93aWRnZXRzL3dpZGdldHNcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBWaWV3VHlwZSB9IGZyb20gXCIuLi9jb21tb24vdmlld1R5cGVQcm92aWRlclwiO1xyXG5cclxuLyoqXHJcbiAqIGltcGxlbWVudHMgZGlzcGxheWluZyBhbmQgZXhlY3V0aW9uIG9mIG1ldGhvZHNcclxuICpcclxuICogQGNsYXNzIE1ldGhvZHNXaWRnZXRcclxuICogQGV4dGVuZHMge1dpZGdldEJhc2V9XHJcbiAqIEBpbXBsZW1lbnRzIHtJTWV0aG9kc1dpZGdldH1cclxuICovXHJcbmNsYXNzIE1ldGhvZHNXaWRnZXQgZXh0ZW5kcyBXaWRnZXRCYXNlIGltcGxlbWVudHMgSU1ldGhvZHNXaWRnZXQge1xyXG5cclxuICAgIHByaXZhdGUgX21ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXQ6IFdpZGdldHMuSU1ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXR8dW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfbWV0aG9kTGlzdFdpZGdldDogV2lkZ2V0cy5JTWV0aG9kTGlzdFdpZGdldHx1bmRlZmluZWQ7XHJcblxyXG4gICAgcHJpdmF0ZSBfbWV0aG9kczogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRNZXRob2Q+ID0gW107XHJcblxyXG4gICAgcHJpdmF0ZSBfbGF5b3V0V2lkZ2V0QWN0aXZhdGVkID0gKHNlbmRlcixhcmdzKT0+dGhpcy5vbkNvbnRlbnRBY3RpdmF0ZWQoc2VuZGVyLGFyZ3MpO1xyXG4gICAgcHJpdmF0ZSBfbWV0aG9kTGlzdFNlbGVjdGlvbkNoYW5nZWRIYW5kbGVyID0gKHNlbmRlcixhcmdzKT0+dGhpcy5vbk1ldGhvZExpc3RTZWxlY3Rpb25DaGFuZ2VkKHNlbmRlcixhcmdzKTtcclxuICAgXHJcbiAgICBpbml0aWFsaXplKGxheW91dENvbnRhaW5lcklkOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlci5pbml0aWFsaXplKGxheW91dENvbnRhaW5lcklkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIG1ldGhvZHMgZGF0YSBsaW5rIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBtZXRob2RzIHRvIGJlIGRpc3BsYXllZFxyXG4gICAgICogXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IG1ldGhvZHMobWV0aG9kczogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRNZXRob2Q+KSB7XHJcbiAgICAgICAgdGhpcy5fbWV0aG9kcyA9IG1ldGhvZHM7XHJcbiAgICAgICAgaWYgKG1ldGhvZHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLm9uQ29tcG9uZW50TWV0aG9kc1VwZGF0ZWQobWV0aG9kcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbXBvbmVudCBtZXRob2RzIGhhdmUgYmVlbiB1cGRhdGVkLi4uLi5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IGNvbXBvbmVudE1ldGhvZHNcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZHNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgb25Db21wb25lbnRNZXRob2RzVXBkYXRlZChjb21wb25lbnRNZXRob2RzOiBhbnkpOiBhbnkge1xyXG4gICAgICAgIHRoaXMuY29ubmVjdE1ldGhvZHNMaXN0V2lkZ2V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBsYXlvdXQgb2YgdGhlIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZUxheW91dCgpIHtcclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQgPSBXaWRnZXRzLlNwbGl0dGVyV2lkZ2V0LmNyZWF0ZSgpIGFzIFdpZGdldHMuSVNwbGl0dGVyV2lkZ2V0O1xyXG4gICAgICAgIHRoaXMuX2xheW91dFdpZGdldC5pbml0aWFsaXplKHRoaXMucGFyZW50Q29udGVudElkLCAzMCk7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0LnNldEhlYWRlckNvbnRlbnQoXCJDb21tYW5kc1wiKTtcclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQuZXZlbnRXaWRnZXRBY3RpdmF0ZWQuYXR0YWNoKHRoaXMuX2xheW91dFdpZGdldEFjdGl2YXRlZCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgd2lkZ2V0IGNvbnRlbnQgYW5kIGV2ZW50dWFsbHkgc3Vid2lkZ2V0c1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZVdpZGdldHMoKSB7XHJcbiAgICAgICAgdGhpcy5fbWV0aG9kTGlzdFdpZGdldCA9IFdpZGdldHMuTWV0aG9kTGlzdFdpZGdldC5jcmVhdGUoKTtcclxuICAgICAgICB0aGlzLl9tZXRob2RMaXN0V2lkZ2V0LmRhdGFNb2RlbCA9IHRoaXMuZGF0YU1vZGVsO1xyXG4gICAgICAgIHRoaXMuX2xheW91dFdpZGdldC5hZGRXaWRnZXQoIHRoaXMuX21ldGhvZExpc3RXaWRnZXQsIFwiTWV0aG9kTGlzdFwiLCBWaWV3VHlwZS5EZWZhdWx0LCAtMSk7XHJcbiAgICAgICAgdGhpcy5fbWV0aG9kTGlzdFdpZGdldC5ldmVudFNlbGVjdGlvbkNoYW5nZWQuYXR0YWNoKHRoaXMuX21ldGhvZExpc3RTZWxlY3Rpb25DaGFuZ2VkSGFuZGxlcik7XHJcblxyXG4gICAgICAgIHRoaXMuX21ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXQgPSBXaWRnZXRzLk1ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXQuY3JlYXRlKCkgYXMgV2lkZ2V0cy5JTWV0aG9kUGFyYW1ldGVyTGlzdFdpZGdldDtcclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQuYWRkV2lkZ2V0KHRoaXMuX21ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXQsIFwiUGFyYW1ldGVyTGlzdFwiLCBWaWV3VHlwZS5EZWZhdWx0LCAtMSk7XHJcbiAgICBcclxuICAgICAgICB0aGlzLmluaXRpYWxpemVMYXlvdXQoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBhY3RpdmF0ZXMgTWV0aG9kV2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZHNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgYWN0aXZhdGUoKSB7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0LmFjdGl2YXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBkZWFjdGl2YXRlcyBNZXRob2RXaWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBkZWFjdGl2YXRlKCkge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZGlzcG9zZXMgTWV0aG9kV2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZHNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgZGlzcG9zZSgpIHtcclxuICAgICAgICBpZih0aGlzLl9tZXRob2RMaXN0V2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX21ldGhvZExpc3RXaWRnZXQuZXZlbnRTZWxlY3Rpb25DaGFuZ2VkLmRldGFjaCh0aGlzLl9tZXRob2RMaXN0U2VsZWN0aW9uQ2hhbmdlZEhhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQuZXZlbnRXaWRnZXRBY3RpdmF0ZWQuZGV0YWNoKHRoaXMuX2xheW91dFdpZGdldEFjdGl2YXRlZCk7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0LmRpc3Bvc2UoKTtcclxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFxyXG4gICAgICogcmVzaXplcyB0aGUgbWV0aG9kcyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gd2lkdGhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHJlc2l6ZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX2FjdHVhbFdpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5fYWN0dWFsSGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuX2xheW91dFdpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQhLnJlc2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbk1ldGhvZExpc3RTZWxlY3Rpb25DaGFuZ2VkKHNlbmRlcixhcmdzKXtcclxuICAgICAgICB0aGlzLl9tZXRob2RQYXJhbWV0ZXJMaXN0V2lkZ2V0IS51cGRhdGVQYXJhbWV0ZXJzTGlzdChhcmdzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNvbm5lY3RNZXRob2RzTGlzdFdpZGdldCgpOiBhbnkge1xyXG4gICAgICAgIGlmICh0aGlzLl9tZXRob2RMaXN0V2lkZ2V0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21ldGhvZExpc3RXaWRnZXQubWV0aG9kcyA9IHRoaXMuX21ldGhvZHM7XHJcbiBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNvbnRlbnRBY3RpdmF0ZWQoc2VuZGVyLCBhcmdzKSB7XHJcblxyXG4gICAgICAgIGFyZ3Mud2lkZ2V0LmFjdGl2YXRlKCk7XHJcbiAgICAgICAgdGhpcy5yZXNpemUodGhpcy5fYWN0dWFsV2lkdGgsIHRoaXMuX2FjdHVhbEhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0aWFsaXplTGF5b3V0KCl7XHJcbiAgICAgICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyh0aGlzLl9sYXlvdXRXaWRnZXQubGF5b3V0UGFuZXMpO1xyXG4gICAgICAgIGlmKGtleXMubGVuZ3RoID09IDIpe1xyXG4gICAgICAgICAgICAvLyBTZXQgaW5pdGlhbCBwYW5lIHNpemVzIGFuZCBzZXR0aW5nc1xyXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQuc2V0T3JpZW50YXRpb24odHJ1ZSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBNZXRob2RMaXN0XHJcbiAgICAgICAgICAgIGxldCBrZXkwID0ga2V5c1swXTtcclxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0LmxheW91dFBhbmVzW2tleTBdLnNpemUgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQubGF5b3V0UGFuZXNba2V5MF0uZmlsbFNwYWNlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0LmxheW91dFBhbmVzW2tleTBdLmV4cGFuZGFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0LmxheW91dFBhbmVzW2tleTBdLmNvbGxhcHNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX2xheW91dFdpZGdldC5sYXlvdXRQYW5lc1trZXkwXS5taW5pbXVtU2l6ZSA9IDM4O1xyXG5cclxuICAgICAgICAgICAgLy8gUGFyYW1ldGVyTGlzdFxyXG4gICAgICAgICAgICBsZXQga2V5MSA9IGtleXNbMV07XHJcbiAgICAgICAgICAgIHRoaXMuX2xheW91dFdpZGdldC5sYXlvdXRQYW5lc1trZXkxXS5zaXplID0gMjAwO1xyXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQubGF5b3V0UGFuZXNba2V5MV0uZXhwYW5kYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQubGF5b3V0UGFuZXNba2V5MV0uY29sbGFwc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIFJlZHJhdyB0aGUgbGF5b3V0XHJcbiAgICAgICAgICAgIHRoaXMuX2xheW91dFdpZGdldC5yZWNhbGN1bGF0ZUxheW91dCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aHJvdyhuZXcgRXJyb3IoXCJ0aGlzLl9sYXlvdXRXaWRnZXQubGF5b3V0UGFuZXMubGVuZ3RoICE9IDJcIikpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgTWV0aG9kc1dpZGdldCB9OyJdfQ==