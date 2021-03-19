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
define(["require", "exports", "../common/viewBase", "./defaultComponentSettings"], function (require, exports, viewBase_1, defaultComponentSettings_1) {
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
        ComponentViewWidget.prototype.initializeComponent = function () {
            this.component.defaultSettingsDataId = defaultComponentSettings_1.DefaultComponentSettings.WidgetDefinitionId;
            this.component.disablePersisting();
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
                this.connectMethodsWidget(this._activeComponent.value.userMethods, this._activeComponent.value.quickCommands);
            }
            if (this._activeComponent.value.parametersSource != undefined) {
                this.connectWatchablesWidget(this._activeComponent.value.watchableParametersSource, this._activeComponent.value.watchableStateParameters);
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
         * @param {Property<MappCockpitComponentParameter[]>} watchableStateParameters
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.connectWatchablesWidget = function (watchableParameters, watchableStateParameters) {
            if (this._watchablesWidget) {
                this._watchablesWidget.watchableStateParameters = watchableStateParameters;
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
         * @private
         * @param {MappCockpitComponentMethod[]} componentMethods
         * @param {MappCockpitQuickCommandParameter[]} quickCommands
         * @returns {*}
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.connectMethodsWidget = function (componentMethods, quickCommands) {
            if (this._methodsWidget) {
                //quickCommands is set, then methods is set and all tree grid is updated
                this._methodsWidget.quickCommands = quickCommands;
                this._methodsWidget.methods = componentMethods;
            }
        };
        /**
         * Sets the widget content and eventually subwidgets
         *
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.initialized = function () {
            this.initLayoutWidget();
            this.setMethodsWidget();
            this.setWatchablesWidget();
            this.setConfigManagerWidget();
            this.setMessagesWidget();
        };
        ComponentViewWidget.prototype.initLayoutWidget = function () {
            this._layoutWidget = this.component.getSubComponent("SplitterWidget_ComponentView");
            this.attachLayoutToView(this);
            this._layoutWidget.initialize(this.parentContentId);
            this._layoutWidget.eventWidgetActivated.attach(this._layoutWidgetActivatedHandler);
        };
        /**
         * Returns the default component settings for this widget
         *
         * @returns {*}
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.getDefaultComponentSettings = function () {
            return defaultComponentSettings_1.DefaultComponentSettings.getComponentViewWidgetDefinition();
        };
        /**
         * Adds some default persisting data packages in the main default persisting data provider
         *
         * @private
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.addAdditionalDefaultComponentSettings = function () {
            // Splitter definitions  
            this.addDefaultComponentSettingsToProvider(defaultComponentSettings_1.DefaultComponentSettings.MainSplitterDefinitionId, defaultComponentSettings_1.DefaultComponentSettings.getMainSplitterDefinition());
            this.addDefaultComponentSettingsToProvider(defaultComponentSettings_1.DefaultComponentSettings.TopSplitterDefinitionId, defaultComponentSettings_1.DefaultComponentSettings.getTopSplitterDefinition());
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
         * set the messages widget
         *
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.setMessagesWidget = function () {
            this._messagesWidget = this.getWidgetById("ComponentViewMessagesWidget");
        };
        /**
         * set the watchables widget
         *
         * @private
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.setWatchablesWidget = function () {
            this._watchablesWidget = this.getWidgetById("WatchablesWidget");
        };
        /**
         * set the configmanager widget
         *
         * @private
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.setConfigManagerWidget = function () {
            this._configManagerWidget = this.getWidgetById("ConfigManagerWidget");
        };
        /**
         * set the commands widget
         *
         * @memberof ComponentViewWidget
         */
        ComponentViewWidget.prototype.setMethodsWidget = function () {
            this._methodsWidget = this.getWidgetById("MethodsWidget");
        };
        return ComponentViewWidget;
    }(viewBase_1.ViewBase));
    exports.ComponentViewWidget = ComponentViewWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50Vmlld1dpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jb21wb25lbnRWaWV3V2lkZ2V0L2NvbXBvbmVudFZpZXdXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVVBO1FBQWtDLHVDQUFRO1FBQTFDO1lBQUEscUVBcVFDO1lBN1BXLG1DQUE2QixHQUFHLFVBQUMsTUFBTSxFQUFDLElBQUksSUFBRyxPQUFBLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLEVBQXBDLENBQW9DLENBQUM7O1FBNlBoRyxDQUFDO1FBM1BHLHdDQUFVLEdBQVYsVUFBVyxpQkFBeUI7WUFDaEMsaUJBQU0sVUFBVSxZQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDeEMsQ0FBQztRQUVELGlEQUFtQixHQUFuQjtZQUNJLElBQUksQ0FBQyxTQUFTLENBQUMscUJBQXFCLEdBQUcsbURBQXdCLENBQUMsa0JBQWtCLENBQUM7WUFDbkYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3ZDLENBQUM7UUFPRCxzQkFBVyxnREFBZTtZQUwxQjs7OztlQUlHO2lCQUNILFVBQTJCLGVBQStDO2dCQUN0RSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZUFBZSxDQUFDO2dCQUV4QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDM0MsQ0FBQzs7O1dBQUE7UUFFRDs7Ozs7O1dBTUc7UUFDSyw4Q0FBZ0IsR0FBeEIsVUFBeUIsZUFBK0M7WUFBeEUsaUJBSUM7WUFIRyxlQUFlLENBQUMsS0FBSyxDQUFDLHVCQUF1QixDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUU7Z0JBQ3hELEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUN4QixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNL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QWEsR0FBRyxNQUFNLENBQUM7WUFFNUIsSUFBRyxJQUFJLENBQUMsYUFBYSxJQUFJLFNBQVMsRUFBQztnQkFDL0IsSUFBSSxDQUFDLGFBQWMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2FBQzdDO1FBQ0wsQ0FBQztRQUVPLGdEQUFrQixHQUExQixVQUEyQixNQUFNLEVBQUUsSUFBSTtZQUNuQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDdkQsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSywrQ0FBaUIsR0FBekI7WUFDSSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsNkJBQTZCLENBQTRCLENBQUM7UUFDeEcsQ0FBQztRQUdEOzs7OztXQUtHO1FBQ0ssaURBQW1CLEdBQTNCO1lBQ0ksSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQThCLENBQUM7UUFDakcsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0ssb0RBQXNCLEdBQTlCO1lBRUksSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMscUJBQXFCLENBQWlDLENBQUM7UUFDMUcsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSyw4Q0FBZ0IsR0FBeEI7WUFFSSxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUEyQixDQUFDO1FBQ3hGLENBQUM7UUFDTCwwQkFBQztJQUFELENBQUMsQUFyUUQsQ0FBa0MsbUJBQVEsR0FxUXpDO0lBRVEsa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUNvbXBvbmVudFZpZXdXaWRnZXQgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL2NvbXBvbmVudFZpZXdXaWRnZXRJbnRlcmZhY2VcIjtcclxuXHJcbmltcG9ydCAqIGFzIFdpZGdldHMgZnJvbSBcIi4uLy4uL3dpZGdldHMvd2lkZ2V0c1wiO1xyXG5pbXBvcnQgeyBQcm9wZXJ0eSB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvcHJvcGVydHlcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnQsIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyLCBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCwgTWFwcENvY2twaXRTdGF0ZVBhcmFtZXRlciwgTWFwcENvY2twaXRRdWlja0NvbW1hbmRQYXJhbWV0ZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBWaWV3QmFzZSB9IGZyb20gXCIuLi9jb21tb24vdmlld0Jhc2VcIjtcclxuaW1wb3J0IHsgRGVmYXVsdENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4vZGVmYXVsdENvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCB7IElMYXlvdXRXaWRnZXQgfSBmcm9tIFwiLi4vY29tbW9uL2ludGVyZmFjZXMvbGF5b3V0V2lkZ2V0SW50ZXJmYWNlXCI7XHJcblxyXG5jbGFzcyBDb21wb25lbnRWaWV3V2lkZ2V0IGV4dGVuZHMgVmlld0Jhc2UgaW1wbGVtZW50cyBJQ29tcG9uZW50Vmlld1dpZGdldHtcclxuXHJcbiAgICBwcml2YXRlIF9hY3RpdmVDb21wb25lbnQhOiBQcm9wZXJ0eTxNYXBwQ29ja3BpdENvbXBvbmVudD47XHJcbiAgICBwcml2YXRlIF93YXRjaGFibGVzV2lkZ2V0OiBXaWRnZXRzLklXYXRjaGFibGVzV2lkZ2V0IHwgdW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfbWVzc2FnZXNXaWRnZXQ6IFdpZGdldHMuSU1lc3NhZ2VzV2lkZ2V0IHwgdW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfbWV0aG9kc1dpZGdldDogV2lkZ2V0cy5JTWV0aG9kc1dpZGdldHx1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF9jb25maWdNYW5hZ2VyV2lkZ2V0OiBXaWRnZXRzLklDb25maWdNYW5hZ2VyV2lkZ2V0fHVuZGVmaW5lZDtcclxuXHJcbiAgICBwcml2YXRlIF9sYXlvdXRXaWRnZXRBY3RpdmF0ZWRIYW5kbGVyID0gKHNlbmRlcixhcmdzKT0+dGhpcy5vbkNvbnRlbnRBY3RpdmF0ZWQoc2VuZGVyLGFyZ3MpO1xyXG5cclxuICAgIGluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQ6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRpYWxpemVDb21wb25lbnQoKXtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5kZWZhdWx0U2V0dGluZ3NEYXRhSWQgPSBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuV2lkZ2V0RGVmaW5pdGlvbklkO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmRpc2FibGVQZXJzaXN0aW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBhY3RpdmUgY29tcG9uZW50IHRvIGJlIGRpc3BsYXllZCBieSB0aGUgY29tcG9uZW50IHZpZXdcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50Vmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IGFjdGl2ZUNvbXBvbmVudChhY3RpdmVDb21wb25lbnQ6IFByb3BlcnR5PE1hcHBDb2NrcGl0Q29tcG9uZW50Pikge1xyXG4gICAgICAgIHRoaXMuX2FjdGl2ZUNvbXBvbmVudCA9IGFjdGl2ZUNvbXBvbmVudDtcclxuXHJcbiAgICAgICAgdGhpcy5jb25uZWN0Q29tcG9uZW50KGFjdGl2ZUNvbXBvbmVudCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQ29ubmVjdHMgdGhlIGFjdGl2ZSBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtQcm9wZXJ0eTxNYXBwQ29ja3BpdENvbXBvbmVudD59IGFjdGl2ZUNvbXBvbmVudFxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudFZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb25uZWN0Q29tcG9uZW50KGFjdGl2ZUNvbXBvbmVudDogUHJvcGVydHk8TWFwcENvY2twaXRDb21wb25lbnQ+KSB7XHJcbiAgICAgICAgYWN0aXZlQ29tcG9uZW50LnZhbHVlLmNvbW1hbmRDb25uZWN0Q29tcG9uZW50LmV4ZWN1dGUobnVsbCwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RQYW5lcygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29ubmVjdHMgdGhlIHBhbmVzIHRvIHRoZSBjb21wb25lbnQgbWVtYmVyc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50Vmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbm5lY3RQYW5lcygpIHtcclxuICAgICAgICBpZiAodGhpcy5fYWN0aXZlQ29tcG9uZW50LnZhbHVlLm1ldGhvZHNTb3VyY2UgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdE1ldGhvZHNXaWRnZXQodGhpcy5fYWN0aXZlQ29tcG9uZW50LnZhbHVlLnVzZXJNZXRob2RzLCB0aGlzLl9hY3RpdmVDb21wb25lbnQudmFsdWUucXVpY2tDb21tYW5kcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9hY3RpdmVDb21wb25lbnQudmFsdWUucGFyYW1ldGVyc1NvdXJjZSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0V2F0Y2hhYmxlc1dpZGdldCh0aGlzLl9hY3RpdmVDb21wb25lbnQudmFsdWUud2F0Y2hhYmxlUGFyYW1ldGVyc1NvdXJjZSwgdGhpcy5fYWN0aXZlQ29tcG9uZW50LnZhbHVlLndhdGNoYWJsZVN0YXRlUGFyYW1ldGVycyk7XHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdE1lc3NhZ2VzV2lkZ2V0KHRoaXMuX2FjdGl2ZUNvbXBvbmVudC52YWx1ZS5tZXNzYWdlUGFyYW1ldGVyc1NvdXJjZSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9hY3RpdmVDb21wb25lbnQudmFsdWUubWV0aG9kc1NvdXJjZSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdENvbmZpZ3VyYXRpb25NYW5hZ2VyV2lkZ2V0KHRoaXMuX2FjdGl2ZUNvbXBvbmVudC52YWx1ZS5tZXRob2RzU291cmNlLCB0aGlzLl9hY3RpdmVDb21wb25lbnQudmFsdWUuY29uZmlndXJhdGlvblBhcmFtZXRlcnNTb3VyY2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29ubmVjdHMgdGhlIHdhdGNoYWJsZXMgd2lkZ2V0IHRvIHRoZSBjb21wb25lbnQgcGFyYW1ldGVyc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge1Byb3BlcnR5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10+fSB3YXRjaGFibGVQYXJhbWV0ZXJzXHJcbiAgICAgKiBAcGFyYW0ge1Byb3BlcnR5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10+fSB3YXRjaGFibGVTdGF0ZVBhcmFtZXRlcnNcclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29ubmVjdFdhdGNoYWJsZXNXaWRnZXQod2F0Y2hhYmxlUGFyYW1ldGVyczogUHJvcGVydHk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXT4sIHdhdGNoYWJsZVN0YXRlUGFyYW1ldGVyczogTWFwcENvY2twaXRTdGF0ZVBhcmFtZXRlcltdKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3dhdGNoYWJsZXNXaWRnZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5fd2F0Y2hhYmxlc1dpZGdldC53YXRjaGFibGVTdGF0ZVBhcmFtZXRlcnMgPSB3YXRjaGFibGVTdGF0ZVBhcmFtZXRlcnM7XHJcbiAgICAgICAgICAgIHRoaXMuX3dhdGNoYWJsZXNXaWRnZXQud2F0Y2hhYmxlUGFyYW1ldGVycyA9IHdhdGNoYWJsZVBhcmFtZXRlcnM7XHJcbiAgICAgICAgfVxyXG4gICAgfSBcclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbm5lY3RzIHRoZSBjb25maWd1cmF0aW9uIG1hbmFnZXIgd2lkZ2V0IHRvIHRoZSBjb21wb25lbnQgcGFyYW1ldGVycyBhbmQgbWV0aG9kc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7UHJvcGVydHk8TWFwcENvY2twaXRDb21wb25lbnRNZXRob2RbXT59IGNvbXBvbmVudE1ldGhvZHNMaW5rXHJcbiAgICAgKiBAcGFyYW0ge1Byb3BlcnR5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10+fSBjb25maWd1cmF0aW9uUGFyYW1ldGVyc0xpbmtcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudFZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgY29ubmVjdENvbmZpZ3VyYXRpb25NYW5hZ2VyV2lkZ2V0KGNvbXBvbmVudE1ldGhvZHNMaW5rOiBQcm9wZXJ0eTxNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFtdPiwgY29uZmlndXJhdGlvblBhcmFtZXRlcnNMaW5rOiBQcm9wZXJ0eTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdPik6IGFueSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NvbmZpZ01hbmFnZXJXaWRnZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnTWFuYWdlcldpZGdldC5tZXRob2RzID0gY29tcG9uZW50TWV0aG9kc0xpbms7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZ01hbmFnZXJXaWRnZXQuY29uZmlndXJhdGlvblBhcmFtZXRlcnMgPSBjb25maWd1cmF0aW9uUGFyYW1ldGVyc0xpbms7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29ubmVjdHMgdGhlIG1lc3NhZ2VzIHdpZGdldCB0byB0aGUgY29tcG9uZW50IHBhcmFtZXRlcnNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1Byb3BlcnR5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10+fSBjb21wb25lbnRQYXJhbWV0ZXJzTGlua1xyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50Vmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbm5lY3RNZXNzYWdlc1dpZGdldChjb21wb25lbnRQYXJhbWV0ZXJzTGluazogUHJvcGVydHk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXT4pOiBhbnkge1xyXG4gICAgICAgIGlmICh0aGlzLl9tZXNzYWdlc1dpZGdldCkge1xyXG4gICAgICAgICAgICB0aGlzLl9tZXNzYWdlc1dpZGdldC5tZXNzYWdlUGFyYW1ldGVycyA9IGNvbXBvbmVudFBhcmFtZXRlcnNMaW5rO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbm5lY3RzIHRoZSBtZXRob2RzIHdpZGdldCB0byB0aGUgY29tcG9uZW50IHBhcmFtZXRlcnNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFtdfSBjb21wb25lbnRNZXRob2RzXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0UXVpY2tDb21tYW5kUGFyYW1ldGVyW119IHF1aWNrQ29tbWFuZHNcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudFZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb25uZWN0TWV0aG9kc1dpZGdldChjb21wb25lbnRNZXRob2RzOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFtdLCBxdWlja0NvbW1hbmRzOiBNYXBwQ29ja3BpdFF1aWNrQ29tbWFuZFBhcmFtZXRlcltdKTogYW55IHtcclxuICAgICAgICBpZiAodGhpcy5fbWV0aG9kc1dpZGdldCkge1xyXG4gICAgICAgICAgICAvL3F1aWNrQ29tbWFuZHMgaXMgc2V0LCB0aGVuIG1ldGhvZHMgaXMgc2V0IGFuZCBhbGwgdHJlZSBncmlkIGlzIHVwZGF0ZWRcclxuICAgICAgICAgICAgdGhpcy5fbWV0aG9kc1dpZGdldC5xdWlja0NvbW1hbmRzID0gcXVpY2tDb21tYW5kcztcclxuICAgICAgICAgICAgdGhpcy5fbWV0aG9kc1dpZGdldC5tZXRob2RzID0gY29tcG9uZW50TWV0aG9kcztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSB3aWRnZXQgY29udGVudCBhbmQgZXZlbnR1YWxseSBzdWJ3aWRnZXRzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudFZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgaW5pdGlhbGl6ZWQoKSB7XHJcbiAgICAgICAgdGhpcy5pbml0TGF5b3V0V2lkZ2V0KCk7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0TWV0aG9kc1dpZGdldCgpO1xyXG4gICAgICAgIHRoaXMuc2V0V2F0Y2hhYmxlc1dpZGdldCgpO1xyXG4gICAgICAgIHRoaXMuc2V0Q29uZmlnTWFuYWdlcldpZGdldCgpO1xyXG5cclxuICAgICAgICB0aGlzLnNldE1lc3NhZ2VzV2lkZ2V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdExheW91dFdpZGdldCgpIHtcclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQgPSB0aGlzLmNvbXBvbmVudC5nZXRTdWJDb21wb25lbnQoXCJTcGxpdHRlcldpZGdldF9Db21wb25lbnRWaWV3XCIpIGFzIElMYXlvdXRXaWRnZXQ7XHJcbiAgICAgICAgdGhpcy5hdHRhY2hMYXlvdXRUb1ZpZXcoPGFueT50aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0IS5pbml0aWFsaXplKHRoaXMucGFyZW50Q29udGVudElkKTtcclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQhLmV2ZW50V2lkZ2V0QWN0aXZhdGVkLmF0dGFjaCh0aGlzLl9sYXlvdXRXaWRnZXRBY3RpdmF0ZWRIYW5kbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgY29tcG9uZW50IHNldHRpbmdzIGZvciB0aGlzIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudFZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgZ2V0RGVmYXVsdENvbXBvbmVudFNldHRpbmdzKCk6IENvbXBvbmVudFNldHRpbmdze1xyXG4gICAgICAgIHJldHVybiBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuZ2V0Q29tcG9uZW50Vmlld1dpZGdldERlZmluaXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgc29tZSBkZWZhdWx0IHBlcnNpc3RpbmcgZGF0YSBwYWNrYWdlcyBpbiB0aGUgbWFpbiBkZWZhdWx0IHBlcnNpc3RpbmcgZGF0YSBwcm92aWRlclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50Vmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBhZGRBZGRpdGlvbmFsRGVmYXVsdENvbXBvbmVudFNldHRpbmdzKCl7XHJcbiAgICAgICAgLy8gU3BsaXR0ZXIgZGVmaW5pdGlvbnMgIFxyXG4gICAgICAgIHRoaXMuYWRkRGVmYXVsdENvbXBvbmVudFNldHRpbmdzVG9Qcm92aWRlcihEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuTWFpblNwbGl0dGVyRGVmaW5pdGlvbklkLCBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuZ2V0TWFpblNwbGl0dGVyRGVmaW5pdGlvbigpKTtcclxuICAgICAgICB0aGlzLmFkZERlZmF1bHRDb21wb25lbnRTZXR0aW5nc1RvUHJvdmlkZXIoRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLlRvcFNwbGl0dGVyRGVmaW5pdGlvbklkLCBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuZ2V0VG9wU3BsaXR0ZXJEZWZpbml0aW9uKCkpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEFjdGl2YXRlcyB0aGUgY29tcG9uZW50IHZpZXdcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGFjdGl2YXRlKCl7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0IS5hY3RpdmF0ZSgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIERlYWN0aXZhdGVzIHRoZSBjb21wb25lbnQgdmlld1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudFZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgZGVhY3RpdmF0ZSgpe1xyXG4gICAgICAgIHRoaXMuX2xheW91dFdpZGdldCEuZGVhY3RpdmF0ZSgpO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNwb3NlcyB0aGUgY29tcG9uZW50IHZpZXdcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGRpc3Bvc2UoKXtcclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQhLmV2ZW50V2lkZ2V0QWN0aXZhdGVkLmRldGFjaCh0aGlzLl9sYXlvdXRXaWRnZXRBY3RpdmF0ZWRIYW5kbGVyKTtcclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQhLmRpc3Bvc2UoKTtcclxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgICB9XHJcbiAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNpemVzIHRoZSBjb21wb25lbnQgdmlld1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBudW1iZXIgd2lkdGhcclxuICAgICAqIEBwYXJhbSBudW1iZXIgaGVpZ2h0XHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHJlc2l6ZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcil7XHJcbiAgICAgICAgdGhpcy5fYWN0dWFsV2lkdGggPSB3aWR0aDtcclxuICAgICAgICB0aGlzLl9hY3R1YWxIZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5fbGF5b3V0V2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2xheW91dFdpZGdldCEucmVzaXplKHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBvbkNvbnRlbnRBY3RpdmF0ZWQoc2VuZGVyLCBhcmdzKSB7XHJcbiAgICAgICAgYXJncy53aWRnZXQuYWN0aXZhdGUoKTtcclxuICAgICAgICB0aGlzLnJlc2l6ZSh0aGlzLl9hY3R1YWxXaWR0aCwgdGhpcy5fYWN0dWFsSGVpZ2h0KTtcclxuICAgIH1cclxuICAgICBcclxuICAgIC8qKlxyXG4gICAgICogc2V0IHRoZSBtZXNzYWdlcyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50Vmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldE1lc3NhZ2VzV2lkZ2V0KCkge1xyXG4gICAgICAgIHRoaXMuX21lc3NhZ2VzV2lkZ2V0ID0gdGhpcy5nZXRXaWRnZXRCeUlkKFwiQ29tcG9uZW50Vmlld01lc3NhZ2VzV2lkZ2V0XCIpIGFzIFdpZGdldHMuSU1lc3NhZ2VzV2lkZ2V0O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIHNldCB0aGUgd2F0Y2hhYmxlcyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudFZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRXYXRjaGFibGVzV2lkZ2V0KCkge1xyXG4gICAgICAgIHRoaXMuX3dhdGNoYWJsZXNXaWRnZXQgPSB0aGlzLmdldFdpZGdldEJ5SWQoXCJXYXRjaGFibGVzV2lkZ2V0XCIpIGFzIFdpZGdldHMuSVdhdGNoYWJsZXNXaWRnZXQ7XHJcbiAgICB9ICAgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBzZXQgdGhlIGNvbmZpZ21hbmFnZXIgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0Q29uZmlnTWFuYWdlcldpZGdldCgpIHtcclxuXHJcbiAgICAgICAgdGhpcy5fY29uZmlnTWFuYWdlcldpZGdldCA9IHRoaXMuZ2V0V2lkZ2V0QnlJZChcIkNvbmZpZ01hbmFnZXJXaWRnZXRcIikgYXMgV2lkZ2V0cy5JQ29uZmlnTWFuYWdlcldpZGdldDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBzZXQgdGhlIGNvbW1hbmRzIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0TWV0aG9kc1dpZGdldCgpIHtcclxuXHJcbiAgICAgICAgdGhpcy5fbWV0aG9kc1dpZGdldCA9IHRoaXMuZ2V0V2lkZ2V0QnlJZChcIk1ldGhvZHNXaWRnZXRcIikgYXMgV2lkZ2V0cy5JTWV0aG9kc1dpZGdldDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgQ29tcG9uZW50Vmlld1dpZGdldCB9OyJdfQ==