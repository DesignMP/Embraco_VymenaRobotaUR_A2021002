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
define(["require", "exports", "../../widgets/widgets", "../common/viewTypeProvider", "../common/viewBase"], function (require, exports, Widgets, viewTypeProvider_1, viewBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ComponentViewWidget = /** @class */ (function (_super) {
        __extends(ComponentViewWidget, _super);
        function ComponentViewWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._layoutWidgetActivatedHandler = function (sender, args) { return _this.onContentActivated(sender, args); };
            return _this;
        }
        ComponentViewWidget.prototype.initialize = function (layoutContainerId) {
            _super.prototype.initialize.call(this, layoutContainerId);
        };
        Object.defineProperty(ComponentViewWidget.prototype, "activeComponent", {
            /**
             * Sets the active component to be displayed by the component view
             *
             * @memberof ComponentViewWidget
             */
            set: function (activeComponent) {
                this._activeComponent = activeComponent;
                this.connectComponent(activeComponent);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Connects the active component
         *
         * @private
         * @param {Property<MappCockpitComponent>} activeComponent
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.connectComponent = function (activeComponent) {
            var _this = this;
            activeComponent.value.commandConnectComponent.execute(null, function () {
                _this.connectPanes();
            });
        };
        /**
         * Connects the panes to the component members
         *
         * @private
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.connectPanes = function () {
            if (this._activeComponent.value.methodsSource != undefined) {
                this.connectMethodsWidget(this._activeComponent.value.userMethods);
            }
            if (this._activeComponent.value.parametersSource != undefined) {
                this.connectWatchablesWidget(this._activeComponent.value.watchableParametersSource);
                this.connectMessagesWidget(this._activeComponent.value.messageParametersSource);
                if (this._activeComponent.value.methodsSource != undefined) {
                    this.connectConfigurationManagerWidget(this._activeComponent.value.methodsSource, this._activeComponent.value.configurationParametersSource);
                }
            }
        };
        /**
         * Connects the watchables widget to the component parameters
         *
         * @private
         * @param {Property<MappCockpitComponentParameter[]>} watchableParameters
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.connectWatchablesWidget = function (watchableParameters) {
            if (this._watchablesWidget) {
                this._watchablesWidget.watchableParameters = watchableParameters;
            }
        };
        /**
         * Connects the configuration manager widget to the component parameters and methods
         *
         * @param {Property<MappCockpitComponentMethod[]>} componentMethodsLink
         * @param {Property<MappCockpitComponentParameter[]>} configurationParametersLink
         * @returns {*}
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.connectConfigurationManagerWidget = function (componentMethodsLink, configurationParametersLink) {
            if (this._configManagerWidget) {
                this._configManagerWidget.methods = componentMethodsLink;
                this._configManagerWidget.configurationParameters = configurationParametersLink;
            }
        };
        /**
         * Connects the messages widget to the component parameters
         *
         * @param {Property<MappCockpitComponentParameter[]>} componentParametersLink
         * @returns {*}
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.connectMessagesWidget = function (componentParametersLink) {
            if (this._messagesWidget) {
                this._messagesWidget.messageParameters = componentParametersLink;
            }
        };
        /**
         * Connects the methods widget to the component parameters
         *
         * @param {Property<MappCockpitComponentMethod[]>} componentMethodsLink
         * @returns {*}
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.connectMethodsWidget = function (componentMethods) {
            if (this._methodsWidget) {
                this._methodsWidget.methods = componentMethods;
            }
        };
        /**
         * Creates the layout of the widget
         *
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.createLayout = function () {
            this._layoutWidget = Widgets.SplitterWidget.create();
            this.attachLayoutToView(this);
            this._layoutWidget.initialize(this.parentContentId);
            this._layoutWidget.eventWidgetActivated.attach(this._layoutWidgetActivatedHandler);
        };
        /**
         * Activates the component view
         *
         * @returns {*}
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.activate = function () {
            this._layoutWidget.activate();
        };
        /**
         * Deactivates the component view
         *
         * @returns {*}
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.deactivate = function () {
            this._layoutWidget.deactivate();
        };
        /**
         * Disposes the component view
         *
         * @returns {*}
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.dispose = function () {
            this._layoutWidget.eventWidgetActivated.detach(this._layoutWidgetActivatedHandler);
            this._layoutWidget.dispose();
            _super.prototype.dispose.call(this);
        };
        /**
         * Resizes the component view
         *
         * @param number width
         * @param number height
         * @returns {*}
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.resize = function (width, height) {
            this._actualWidth = width;
            this._actualHeight = height;
            if (this._layoutWidget != undefined) {
                this._layoutWidget.resize(width, height);
            }
        };
        ComponentViewWidget.prototype.onContentActivated = function (sender, args) {
            args.widget.activate();
            this.resize(this._actualWidth, this._actualHeight);
        };
        /**
         * Creates the widget content and eventually subwidgets
         *
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.createWidgets = function () {
            this.createInnerWidget();
            this.createMessagesWidget();
            this.initializeLayout();
        };
        ComponentViewWidget.prototype.initializeLayout = function () {
            var keys = Object.keys(this._layoutWidget.layoutPanes);
            if (keys.length == 2) {
                this._layoutWidget.setOrientation(true);
                // Set initial pane sizes and settings
                var key0 = keys[0];
                this._layoutWidget.layoutPanes[key0].size = 0;
                this._layoutWidget.layoutPanes[key0].fillSpace = true;
                this._layoutWidget.layoutPanes[key0].expandable = false;
                this._layoutWidget.layoutPanes[key0].collapsible = false;
                var key1 = keys[1];
                this._layoutWidget.layoutPanes[key1].size = 110;
                this._layoutWidget.layoutPanes[key1].expandable = false;
                this._layoutWidget.layoutPanes[key1].collapsible = false;
                // Redraw the layout
                this._layoutWidget.recalculateLayout();
            }
            else {
                throw (new Error("this._layoutWidget.layoutPanes.length != 2"));
            }
        };
        ComponentViewWidget.prototype.initializeInnerLayout = function () {
            var keys = Object.keys(this._innerlayoutWidget.layoutPanes);
            if (keys.length == 3) {
                // Set initial pane sizes and settings
                var key0 = keys[0];
                this._innerlayoutWidget.layoutPanes[key0].size = 400;
                this._innerlayoutWidget.layoutPanes[key0].expandable = false;
                this._innerlayoutWidget.layoutPanes[key0].collapsible = false;
                var key1 = keys[1];
                this._innerlayoutWidget.layoutPanes[key1].size = 0;
                this._innerlayoutWidget.layoutPanes[key1].fillSpace = true;
                this._innerlayoutWidget.layoutPanes[key1].expandable = false;
                this._innerlayoutWidget.layoutPanes[key1].collapsible = false;
                var key2 = keys[2];
                this._innerlayoutWidget.layoutPanes[key2].size = 750;
                this._innerlayoutWidget.layoutPanes[key2].expandable = false;
                this._innerlayoutWidget.layoutPanes[key2].collapsible = false;
                // Redraw the layout
                this._innerlayoutWidget.recalculateLayout();
            }
            else {
                throw (new Error("this._innerlayoutWidget.layoutPanes.length != this._widgetCounter"));
            }
        };
        ComponentViewWidget.prototype.createInnerWidget = function () {
            this.createInnerLayout();
            this.createInnerWidgets();
        };
        ComponentViewWidget.prototype.createInnerWidgets = function () {
            this.createMethodsWidget();
            this.createWatchablesWidget();
            this.createConfigManagerWidget();
            this.initializeInnerLayout();
        };
        ComponentViewWidget.prototype.createInnerLayout = function () {
            this._innerlayoutWidget = Widgets.SplitterWidget.create();
            this._layoutWidget.addWidget(this._innerlayoutWidget, "topSplitter", viewTypeProvider_1.ViewType.Default, -1);
        };
        /**
         * creates the messages widget
         *
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.createMessagesWidget = function () {
            // create messages widget
            var messagesWidget = Widgets.MessagesWidget.create();
            // add widget to the layout
            this._layoutWidget.addWidget(messagesWidget, "Messages", viewTypeProvider_1.ViewType.Default, -1);
            // preserve the messages widget instance
            this._messagesWidget = messagesWidget;
        };
        /**
         * creates the watchables widget
         *
         * @private
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.createWatchablesWidget = function () {
            // create watchables widget
            var watchablesWidget = Widgets.WatchablesWidget.create();
            // add widget to the layout
            this._innerlayoutWidget.addWidget(watchablesWidget, "Watchables", viewTypeProvider_1.ViewType.Default, -1);
            // preserve the watchables widget instance
            this._watchablesWidget = watchablesWidget;
        };
        /**
         * creates the configmanager widget
         *
         * @private
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.createConfigManagerWidget = function () {
            var configManagerWidget = Widgets.ConfigManagerWidget.create();
            // add widget to the layout
            this._innerlayoutWidget.addWidget(configManagerWidget, "Configuration", viewTypeProvider_1.ViewType.Default, -1);
            // preserve the config manager widget instance
            this._configManagerWidget = configManagerWidget;
        };
        /**
         * creates the commands widget
         *
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.createMethodsWidget = function () {
            var methodsWidget = Widgets.MethodsWidget.create();
            // add widget to the layout
            this._innerlayoutWidget.addWidget(methodsWidget, "Methods", viewTypeProvider_1.ViewType.Default, -1);
            // preserve the methods widget instance
            this._methodsWidget = methodsWidget;
        };
        return ComponentViewWidget;
    }(viewBase_1.ViewBase));
    exports.ComponentViewWidget = ComponentViewWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50Vmlld1dpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jb21wb25lbnRWaWV3V2lkZ2V0L2NvbXBvbmVudFZpZXdXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVFBO1FBQWtDLHVDQUFRO1FBQTFDO1lBQUEscUVBNFVDO1lBbFVXLG1DQUE2QixHQUFHLFVBQUMsTUFBTSxFQUFDLElBQUksSUFBRyxPQUFBLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLEVBQXBDLENBQW9DLENBQUM7O1FBa1VoRyxDQUFDO1FBaFVHLHdDQUFVLEdBQVYsVUFBVyxpQkFBeUI7WUFDaEMsaUJBQU0sVUFBVSxZQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDeEMsQ0FBQztRQU9ELHNCQUFXLGdEQUFlO1lBTDFCOzs7O2VBSUc7aUJBQ0gsVUFBMkIsZUFBK0M7Z0JBQ3RFLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxlQUFlLENBQUM7Z0JBRXhDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUMzQyxDQUFDOzs7V0FBQTtRQUVEOzs7Ozs7V0FNRztRQUNLLDhDQUFnQixHQUF4QixVQUF5QixlQUErQztZQUF4RSxpQkFJQztZQUhHLGVBQWUsQ0FBQyxLQUFLLENBQUMsdUJBQXVCLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtnQkFDeEQsS0FBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3hCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0ssMENBQVksR0FBcEI7WUFDSSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsYUFBYSxJQUFJLFNBQVMsRUFBRTtnQkFDeEQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENB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eUIsR0FBakM7WUFFSSxJQUFJLG1CQUFtQixHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUMvRCwyQkFBMkI7WUFDM0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsRUFBRSxlQUFlLEVBQUUsMkJBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5Riw4Q0FBOEM7WUFDOUMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLG1CQUFtQixDQUFDO1FBQ3BELENBQUM7UUFFRDs7OztXQUlHO1FBQ0ssaURBQW1CLEdBQTNCO1lBRUksSUFBSSxhQUFhLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNuRCwyQkFBMkI7WUFDM0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUUsU0FBUyxFQUFFLDJCQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEYsdUNBQXVDO1lBQ3ZDLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1FBQ3hDLENBQUM7UUFDTCwwQkFBQztJQUFELENBQUMsQUE1VUQsQ0FBa0MsbUJBQVEsR0E0VXpDO0lBRVEsa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUNvbXBvbmVudFZpZXdXaWRnZXQgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL2NvbXBvbmVudFZpZXdXaWRnZXRJbnRlcmZhY2VcIjtcclxuXHJcbmltcG9ydCAqIGFzIFdpZGdldHMgZnJvbSBcIi4uLy4uL3dpZGdldHMvd2lkZ2V0c1wiO1xyXG5pbXBvcnQgeyBQcm9wZXJ0eSB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvcHJvcGVydHlcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnQsIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyLCBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFZpZXdUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi92aWV3VHlwZVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IFZpZXdCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi92aWV3QmFzZVwiO1xyXG5cclxuY2xhc3MgQ29tcG9uZW50Vmlld1dpZGdldCBleHRlbmRzIFZpZXdCYXNlIGltcGxlbWVudHMgSUNvbXBvbmVudFZpZXdXaWRnZXR7XHJcblxyXG4gICAgcHJpdmF0ZSBfaW5uZXJsYXlvdXRXaWRnZXQhOiBXaWRnZXRzLklTcGxpdHRlcldpZGdldDtcclxuXHJcbiAgICBwcml2YXRlIF9hY3RpdmVDb21wb25lbnQhOiBQcm9wZXJ0eTxNYXBwQ29ja3BpdENvbXBvbmVudD47XHJcbiAgICBwcml2YXRlIF93YXRjaGFibGVzV2lkZ2V0OiBXaWRnZXRzLklXYXRjaGFibGVzV2lkZ2V0IHwgdW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfbWVzc2FnZXNXaWRnZXQ6IFdpZGdldHMuSU1lc3NhZ2VzV2lkZ2V0IHwgdW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfbWV0aG9kc1dpZGdldDogV2lkZ2V0cy5JTWV0aG9kc1dpZGdldHx1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF9jb25maWdNYW5hZ2VyV2lkZ2V0OiBXaWRnZXRzLklDb25maWdNYW5hZ2VyV2lkZ2V0fHVuZGVmaW5lZDtcclxuXHJcbiAgICBwcml2YXRlIF9sYXlvdXRXaWRnZXRBY3RpdmF0ZWRIYW5kbGVyID0gKHNlbmRlcixhcmdzKT0+dGhpcy5vbkNvbnRlbnRBY3RpdmF0ZWQoc2VuZGVyLGFyZ3MpO1xyXG5cclxuICAgIGluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQ6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgYWN0aXZlIGNvbXBvbmVudCB0byBiZSBkaXNwbGF5ZWQgYnkgdGhlIGNvbXBvbmVudCB2aWV3XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudFZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBhY3RpdmVDb21wb25lbnQoYWN0aXZlQ29tcG9uZW50OiBQcm9wZXJ0eTxNYXBwQ29ja3BpdENvbXBvbmVudD4pIHtcclxuICAgICAgICB0aGlzLl9hY3RpdmVDb21wb25lbnQgPSBhY3RpdmVDb21wb25lbnQ7XHJcblxyXG4gICAgICAgIHRoaXMuY29ubmVjdENvbXBvbmVudChhY3RpdmVDb21wb25lbnQpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIENvbm5lY3RzIHRoZSBhY3RpdmUgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7UHJvcGVydHk8TWFwcENvY2twaXRDb21wb25lbnQ+fSBhY3RpdmVDb21wb25lbnRcclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29ubmVjdENvbXBvbmVudChhY3RpdmVDb21wb25lbnQ6IFByb3BlcnR5PE1hcHBDb2NrcGl0Q29tcG9uZW50Pikge1xyXG4gICAgICAgIGFjdGl2ZUNvbXBvbmVudC52YWx1ZS5jb21tYW5kQ29ubmVjdENvbXBvbmVudC5leGVjdXRlKG51bGwsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0UGFuZXMoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbm5lY3RzIHRoZSBwYW5lcyB0byB0aGUgY29tcG9uZW50IG1lbWJlcnNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudFZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb25uZWN0UGFuZXMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2FjdGl2ZUNvbXBvbmVudC52YWx1ZS5tZXRob2RzU291cmNlICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RNZXRob2RzV2lkZ2V0KHRoaXMuX2FjdGl2ZUNvbXBvbmVudC52YWx1ZS51c2VyTWV0aG9kcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9hY3RpdmVDb21wb25lbnQudmFsdWUucGFyYW1ldGVyc1NvdXJjZSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0V2F0Y2hhYmxlc1dpZGdldCh0aGlzLl9hY3RpdmVDb21wb25lbnQudmFsdWUud2F0Y2hhYmxlUGFyYW1ldGVyc1NvdXJjZSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdE1lc3NhZ2VzV2lkZ2V0KHRoaXMuX2FjdGl2ZUNvbXBvbmVudC52YWx1ZS5tZXNzYWdlUGFyYW1ldGVyc1NvdXJjZSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9hY3RpdmVDb21wb25lbnQudmFsdWUubWV0aG9kc1NvdXJjZSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdENvbmZpZ3VyYXRpb25NYW5hZ2VyV2lkZ2V0KHRoaXMuX2FjdGl2ZUNvbXBvbmVudC52YWx1ZS5tZXRob2RzU291cmNlLCB0aGlzLl9hY3RpdmVDb21wb25lbnQudmFsdWUuY29uZmlndXJhdGlvblBhcmFtZXRlcnNTb3VyY2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29ubmVjdHMgdGhlIHdhdGNoYWJsZXMgd2lkZ2V0IHRvIHRoZSBjb21wb25lbnQgcGFyYW1ldGVyc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge1Byb3BlcnR5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10+fSB3YXRjaGFibGVQYXJhbWV0ZXJzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50Vmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbm5lY3RXYXRjaGFibGVzV2lkZ2V0KHdhdGNoYWJsZVBhcmFtZXRlcnM6IFByb3BlcnR5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10+KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3dhdGNoYWJsZXNXaWRnZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5fd2F0Y2hhYmxlc1dpZGdldC53YXRjaGFibGVQYXJhbWV0ZXJzID0gd2F0Y2hhYmxlUGFyYW1ldGVycztcclxuICAgICAgICB9XHJcbiAgICB9IFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29ubmVjdHMgdGhlIGNvbmZpZ3VyYXRpb24gbWFuYWdlciB3aWRnZXQgdG8gdGhlIGNvbXBvbmVudCBwYXJhbWV0ZXJzIGFuZCBtZXRob2RzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtQcm9wZXJ0eTxNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFtdPn0gY29tcG9uZW50TWV0aG9kc0xpbmtcclxuICAgICAqIEBwYXJhbSB7UHJvcGVydHk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXT59IGNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzTGlua1xyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50Vmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBjb25uZWN0Q29uZmlndXJhdGlvbk1hbmFnZXJXaWRnZXQoY29tcG9uZW50TWV0aG9kc0xpbms6IFByb3BlcnR5PE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kW10+LCBjb25maWd1cmF0aW9uUGFyYW1ldGVyc0xpbms6IFByb3BlcnR5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10+KTogYW55IHtcclxuICAgICAgICBpZiAodGhpcy5fY29uZmlnTWFuYWdlcldpZGdldCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jb25maWdNYW5hZ2VyV2lkZ2V0Lm1ldGhvZHMgPSBjb21wb25lbnRNZXRob2RzTGluaztcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnTWFuYWdlcldpZGdldC5jb25maWd1cmF0aW9uUGFyYW1ldGVycyA9IGNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzTGluaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25uZWN0cyB0aGUgbWVzc2FnZXMgd2lkZ2V0IHRvIHRoZSBjb21wb25lbnQgcGFyYW1ldGVyc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7UHJvcGVydHk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXT59IGNvbXBvbmVudFBhcmFtZXRlcnNMaW5rXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29ubmVjdE1lc3NhZ2VzV2lkZ2V0KGNvbXBvbmVudFBhcmFtZXRlcnNMaW5rOiBQcm9wZXJ0eTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdPik6IGFueSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX21lc3NhZ2VzV2lkZ2V0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21lc3NhZ2VzV2lkZ2V0Lm1lc3NhZ2VQYXJhbWV0ZXJzID0gY29tcG9uZW50UGFyYW1ldGVyc0xpbms7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29ubmVjdHMgdGhlIG1ldGhvZHMgd2lkZ2V0IHRvIHRoZSBjb21wb25lbnQgcGFyYW1ldGVyc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7UHJvcGVydHk8TWFwcENvY2twaXRDb21wb25lbnRNZXRob2RbXT59IGNvbXBvbmVudE1ldGhvZHNMaW5rXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29ubmVjdE1ldGhvZHNXaWRnZXQoY29tcG9uZW50TWV0aG9kczogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RbXSk6IGFueSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX21ldGhvZHNXaWRnZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWV0aG9kc1dpZGdldC5tZXRob2RzID0gY29tcG9uZW50TWV0aG9kcztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBsYXlvdXQgb2YgdGhlIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZUxheW91dCgpIHtcclxuXHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0ID0gV2lkZ2V0cy5TcGxpdHRlcldpZGdldC5jcmVhdGUoKTtcclxuICAgICAgICB0aGlzLmF0dGFjaExheW91dFRvVmlldyh0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0LmluaXRpYWxpemUodGhpcy5wYXJlbnRDb250ZW50SWQpO1xyXG4gICAgICAgIHRoaXMuX2xheW91dFdpZGdldC5ldmVudFdpZGdldEFjdGl2YXRlZC5hdHRhY2godGhpcy5fbGF5b3V0V2lkZ2V0QWN0aXZhdGVkSGFuZGxlcik7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEFjdGl2YXRlcyB0aGUgY29tcG9uZW50IHZpZXdcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGFjdGl2YXRlKCl7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0LmFjdGl2YXRlKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogRGVhY3RpdmF0ZXMgdGhlIGNvbXBvbmVudCB2aWV3XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50Vmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBkZWFjdGl2YXRlKCl7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0LmRlYWN0aXZhdGUoKTtcclxuICAgIH1cclxuICBcclxuICAgIC8qKlxyXG4gICAgICogRGlzcG9zZXMgdGhlIGNvbXBvbmVudCB2aWV3XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50Vmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBkaXNwb3NlKCl7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0LmV2ZW50V2lkZ2V0QWN0aXZhdGVkLmRldGFjaCh0aGlzLl9sYXlvdXRXaWRnZXRBY3RpdmF0ZWRIYW5kbGVyKTtcclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQuZGlzcG9zZSgpO1xyXG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlc2l6ZXMgdGhlIGNvbXBvbmVudCB2aWV3XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG51bWJlciB3aWR0aFxyXG4gICAgICogQHBhcmFtIG51bWJlciBoZWlnaHRcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudFZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcmVzaXplKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKXtcclxuICAgICAgICB0aGlzLl9hY3R1YWxXaWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuX2FjdHVhbEhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLl9sYXlvdXRXaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0IS5yZXNpemUod2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIG9uQ29udGVudEFjdGl2YXRlZChzZW5kZXIsIGFyZ3MpIHtcclxuXHJcbiAgICAgICAgYXJncy53aWRnZXQuYWN0aXZhdGUoKTtcclxuICAgICAgICB0aGlzLnJlc2l6ZSh0aGlzLl9hY3R1YWxXaWR0aCwgdGhpcy5fYWN0dWFsSGVpZ2h0KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSB3aWRnZXQgY29udGVudCBhbmQgZXZlbnR1YWxseSBzdWJ3aWRnZXRzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudFZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgY3JlYXRlV2lkZ2V0cygpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgdGhpcy5jcmVhdGVJbm5lcldpZGdldCgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuY3JlYXRlTWVzc2FnZXNXaWRnZXQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0aWFsaXplTGF5b3V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0aWFsaXplTGF5b3V0KCl7XHJcbiAgICAgICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyh0aGlzLl9sYXlvdXRXaWRnZXQubGF5b3V0UGFuZXMpXHJcbiAgICAgICAgaWYoa2V5cy5sZW5ndGggPT0gMil7XHJcbiAgICAgICAgICAgIHRoaXMuX2xheW91dFdpZGdldC5zZXRPcmllbnRhdGlvbih0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNldCBpbml0aWFsIHBhbmUgc2l6ZXMgYW5kIHNldHRpbmdzXHJcbiAgICAgICAgICAgIGxldCBrZXkwID0ga2V5c1swXTtcclxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0LmxheW91dFBhbmVzW2tleTBdLnNpemUgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQubGF5b3V0UGFuZXNba2V5MF0uZmlsbFNwYWNlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0LmxheW91dFBhbmVzW2tleTBdLmV4cGFuZGFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0LmxheW91dFBhbmVzW2tleTBdLmNvbGxhcHNpYmxlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBsZXQga2V5MSA9IGtleXNbMV07XHJcbiAgICAgICAgICAgIHRoaXMuX2xheW91dFdpZGdldC5sYXlvdXRQYW5lc1trZXkxXS5zaXplID0gMTEwO1xyXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQubGF5b3V0UGFuZXNba2V5MV0uZXhwYW5kYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQubGF5b3V0UGFuZXNba2V5MV0uY29sbGFwc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBSZWRyYXcgdGhlIGxheW91dFxyXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQucmVjYWxjdWxhdGVMYXlvdXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhyb3cobmV3IEVycm9yKFwidGhpcy5fbGF5b3V0V2lkZ2V0LmxheW91dFBhbmVzLmxlbmd0aCAhPSAyXCIpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0aWFsaXplSW5uZXJMYXlvdXQoKXtcclxuICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuX2lubmVybGF5b3V0V2lkZ2V0LmxheW91dFBhbmVzKVxyXG4gICAgICAgIGlmKGtleXMubGVuZ3RoID09IDMpe1xyXG5cclxuICAgICAgICAgICAgLy8gU2V0IGluaXRpYWwgcGFuZSBzaXplcyBhbmQgc2V0dGluZ3NcclxuXHJcbiAgICAgICAgICAgIGxldCBrZXkwID0ga2V5c1swXTtcclxuICAgICAgICAgICAgdGhpcy5faW5uZXJsYXlvdXRXaWRnZXQubGF5b3V0UGFuZXNba2V5MF0uc2l6ZSA9IDQwMDtcclxuICAgICAgICAgICAgdGhpcy5faW5uZXJsYXlvdXRXaWRnZXQubGF5b3V0UGFuZXNba2V5MF0uZXhwYW5kYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9pbm5lcmxheW91dFdpZGdldC5sYXlvdXRQYW5lc1trZXkwXS5jb2xsYXBzaWJsZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgbGV0IGtleTEgPSBrZXlzWzFdO1xyXG4gICAgICAgICAgICB0aGlzLl9pbm5lcmxheW91dFdpZGdldC5sYXlvdXRQYW5lc1trZXkxXS5zaXplID0gMDtcclxuICAgICAgICAgICAgdGhpcy5faW5uZXJsYXlvdXRXaWRnZXQubGF5b3V0UGFuZXNba2V5MV0uZmlsbFNwYWNlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5faW5uZXJsYXlvdXRXaWRnZXQubGF5b3V0UGFuZXNba2V5MV0uZXhwYW5kYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9pbm5lcmxheW91dFdpZGdldC5sYXlvdXRQYW5lc1trZXkxXS5jb2xsYXBzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGtleTIgPSBrZXlzWzJdO1xyXG4gICAgICAgICAgICB0aGlzLl9pbm5lcmxheW91dFdpZGdldC5sYXlvdXRQYW5lc1trZXkyXS5zaXplID0gNzUwO1xyXG4gICAgICAgICAgICB0aGlzLl9pbm5lcmxheW91dFdpZGdldC5sYXlvdXRQYW5lc1trZXkyXS5leHBhbmRhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX2lubmVybGF5b3V0V2lkZ2V0LmxheW91dFBhbmVzW2tleTJdLmNvbGxhcHNpYmxlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAvLyBSZWRyYXcgdGhlIGxheW91dFxyXG4gICAgICAgICAgICB0aGlzLl9pbm5lcmxheW91dFdpZGdldC5yZWNhbGN1bGF0ZUxheW91dCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aHJvdyhuZXcgRXJyb3IoXCJ0aGlzLl9pbm5lcmxheW91dFdpZGdldC5sYXlvdXRQYW5lcy5sZW5ndGggIT0gdGhpcy5fd2lkZ2V0Q291bnRlclwiKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3JlYXRlSW5uZXJXaWRnZXQoKSB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVJbm5lckxheW91dCgpO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlSW5uZXJXaWRnZXRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjcmVhdGVJbm5lcldpZGdldHMoKTogdm9pZCB7XHJcblxyXG4gICAgICAgIHRoaXMuY3JlYXRlTWV0aG9kc1dpZGdldCgpO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlV2F0Y2hhYmxlc1dpZGdldCgpO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlQ29uZmlnTWFuYWdlcldpZGdldCgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZUlubmVyTGF5b3V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjcmVhdGVJbm5lckxheW91dCgpIHtcclxuXHJcbiAgICAgICAgdGhpcy5faW5uZXJsYXlvdXRXaWRnZXQgPSBXaWRnZXRzLlNwbGl0dGVyV2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgIHRoaXMuX2xheW91dFdpZGdldC5hZGRXaWRnZXQodGhpcy5faW5uZXJsYXlvdXRXaWRnZXQsIFwidG9wU3BsaXR0ZXJcIiwgVmlld1R5cGUuRGVmYXVsdCwgLTEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY3JlYXRlcyB0aGUgbWVzc2FnZXMgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudFZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVNZXNzYWdlc1dpZGdldCgpIHtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIG1lc3NhZ2VzIHdpZGdldFxyXG4gICAgICAgIGxldCBtZXNzYWdlc1dpZGdldCA9IFdpZGdldHMuTWVzc2FnZXNXaWRnZXQuY3JlYXRlKCk7XHJcbiAgICAgICAgLy8gYWRkIHdpZGdldCB0byB0aGUgbGF5b3V0XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0LmFkZFdpZGdldChtZXNzYWdlc1dpZGdldCwgXCJNZXNzYWdlc1wiLCBWaWV3VHlwZS5EZWZhdWx0LCAtMSk7XHJcbiAgICAgICAgLy8gcHJlc2VydmUgdGhlIG1lc3NhZ2VzIHdpZGdldCBpbnN0YW5jZVxyXG4gICAgICAgIHRoaXMuX21lc3NhZ2VzV2lkZ2V0ID0gbWVzc2FnZXNXaWRnZXQ7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY3JlYXRlcyB0aGUgd2F0Y2hhYmxlcyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudFZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVXYXRjaGFibGVzV2lkZ2V0KCkge1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgd2F0Y2hhYmxlcyB3aWRnZXRcclxuICAgICAgICB2YXIgd2F0Y2hhYmxlc1dpZGdldCA9IFdpZGdldHMuV2F0Y2hhYmxlc1dpZGdldC5jcmVhdGUoKTtcclxuICAgICAgICAvLyBhZGQgd2lkZ2V0IHRvIHRoZSBsYXlvdXRcclxuICAgICAgICB0aGlzLl9pbm5lcmxheW91dFdpZGdldC5hZGRXaWRnZXQod2F0Y2hhYmxlc1dpZGdldCwgXCJXYXRjaGFibGVzXCIsIFZpZXdUeXBlLkRlZmF1bHQsIC0xKTtcclxuICAgICAgICAvLyBwcmVzZXJ2ZSB0aGUgd2F0Y2hhYmxlcyB3aWRnZXQgaW5zdGFuY2VcclxuICAgICAgICB0aGlzLl93YXRjaGFibGVzV2lkZ2V0ID0gd2F0Y2hhYmxlc1dpZGdldDtcclxuICAgIH0gICBcclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZXMgdGhlIGNvbmZpZ21hbmFnZXIgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlQ29uZmlnTWFuYWdlcldpZGdldCgpIHtcclxuXHJcbiAgICAgICAgbGV0IGNvbmZpZ01hbmFnZXJXaWRnZXQgPSBXaWRnZXRzLkNvbmZpZ01hbmFnZXJXaWRnZXQuY3JlYXRlKCk7XHJcbiAgICAgICAgLy8gYWRkIHdpZGdldCB0byB0aGUgbGF5b3V0XHJcbiAgICAgICAgdGhpcy5faW5uZXJsYXlvdXRXaWRnZXQuYWRkV2lkZ2V0KGNvbmZpZ01hbmFnZXJXaWRnZXQsIFwiQ29uZmlndXJhdGlvblwiLCBWaWV3VHlwZS5EZWZhdWx0LCAtMSk7XHJcbiAgICAgICAgLy8gcHJlc2VydmUgdGhlIGNvbmZpZyBtYW5hZ2VyIHdpZGdldCBpbnN0YW5jZVxyXG4gICAgICAgIHRoaXMuX2NvbmZpZ01hbmFnZXJXaWRnZXQgPSBjb25maWdNYW5hZ2VyV2lkZ2V0O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZXMgdGhlIGNvbW1hbmRzIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlTWV0aG9kc1dpZGdldCgpIHtcclxuXHJcbiAgICAgICAgbGV0IG1ldGhvZHNXaWRnZXQgPSBXaWRnZXRzLk1ldGhvZHNXaWRnZXQuY3JlYXRlKCk7XHJcbiAgICAgICAgLy8gYWRkIHdpZGdldCB0byB0aGUgbGF5b3V0XHJcbiAgICAgICAgdGhpcy5faW5uZXJsYXlvdXRXaWRnZXQuYWRkV2lkZ2V0KG1ldGhvZHNXaWRnZXQsIFwiTWV0aG9kc1wiLCBWaWV3VHlwZS5EZWZhdWx0LCAtMSk7XHJcbiAgICAgICAgLy8gcHJlc2VydmUgdGhlIG1ldGhvZHMgd2lkZ2V0IGluc3RhbmNlXHJcbiAgICAgICAgdGhpcy5fbWV0aG9kc1dpZGdldCA9IG1ldGhvZHNXaWRnZXQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IENvbXBvbmVudFZpZXdXaWRnZXQgfTsiXX0=