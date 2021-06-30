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
            _this._quickCommands = [];
            _this._watchableParameters = [];
            _this._layoutWidgetActivated = function (sender, args) { return _this.onContentActivated(sender, args); };
            _this._methodListSelectionChangedHandler = function (sender, args) { return _this.onMethodListSelectionChanged(sender, args); };
            return _this;
        }
        MethodsWidget.prototype.initializeComponent = function () {
            this.component.defaultSettingsDataId = defaultComponentSettings_1.DefaultComponentSettings.WidgetDefinitionId;
            this.component.disablePersisting();
        };
        MethodsWidget.prototype.setComponentsMethodsWidget = function (methods, quickCommands, watchableParameters) {
            //TODO: this.methods must be setted the last one. Change it so it doesn't matter when is set.
            this.quickCommands = quickCommands;
            this.watchableParameters = watchableParameters;
            this.methods = methods;
        };
        Object.defineProperty(MethodsWidget.prototype, "methods", {
            /**
             * Sets the methods data link as a reference to the methods to be displayed
             *
             * @memberof MethodsWidget
             */
            set: function (methods) {
                this._methods = methods;
                if (this._methodListWidget) {
                    this._methodListWidget.methods = this._methods;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MethodsWidget.prototype, "quickCommands", {
            set: function (quickCommands) {
                this._quickCommands = quickCommands;
                if (this._methodListWidget) {
                    this._methodListWidget.quickCommands = this._quickCommands;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MethodsWidget.prototype, "watchableParameters", {
            set: function (watchableParameters) {
                this._watchableParameters = watchableParameters;
                if (this._methodListWidget) {
                    this._methodListWidget.watchableParameters = this._watchableParameters;
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Returns the default component settings for this widget
         *
         * @returns {(ComponentSettings|undefined)}
         * @memberof MethodsWidget
         */
        MethodsWidget.prototype.getDefaultComponentSettings = function () {
            return defaultComponentSettings_1.DefaultComponentSettings.getMethodsWidgetDefinition();
        };
        /**
         * Adds some default persisting data packages in the main default persisting data provider
         *
         * @private
         * @memberof MethodsWidget
         */
        MethodsWidget.prototype.addAdditionalDefaultComponentSettings = function () {
            // Splitter definitions  
            this.component.addDefaultComponentSettingsToProvider(defaultComponentSettings_1.DefaultComponentSettings.MainSplitterDefinitionId, defaultComponentSettings_1.DefaultComponentSettings.getMainSplitterDefinition());
        };
        /**
         * Sets the widget content and eventually subwidgets
         *
         * @memberof MethodsWidget
         */
        MethodsWidget.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            this.initLayoutWidget();
            this.setMethodListWidget();
            this.setParameterListWidget();
        };
        MethodsWidget.prototype.initLayoutWidget = function () {
            this._layoutWidget = this.component.getSubComponent(defaultComponentSettings_1.DefaultComponentSettings.SplitterWidgetMethodsId);
            this.attachLayoutToView(this);
            //No persisting data in the common component view
            this._layoutWidget.component.disablePersisting();
            this._layoutWidget.initialize(this.parentContentId, 30);
            this._layoutWidget.setHeaderContent("Commands");
            this._layoutWidget.eventWidgetActivated.attach(this._layoutWidgetActivated);
        };
        /**
         * set the method list widget
         *
         * @returns {*}
         * @memberof MethodsWidget
         */
        MethodsWidget.prototype.setMethodListWidget = function () {
            this._methodListWidget = this.getWidgetById(defaultComponentSettings_1.DefaultComponentSettings.MethodListWidgetId);
            this._methodListWidget.eventSelectionChanged.attach(this._methodListSelectionChangedHandler);
        };
        /**
         * set the method parameter list widget
         *
         * @returns {*}
         * @memberof MethodsWidget
         */
        MethodsWidget.prototype.setParameterListWidget = function () {
            this._methodParameterListWidget = this.getWidgetById(defaultComponentSettings_1.DefaultComponentSettings.MethodParameterListWidgetId);
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
        MethodsWidget.prototype.onContentActivated = function (sender, args) {
            args.widget.activate();
            this.resize(this._actualWidth, this._actualHeight);
        };
        return MethodsWidget;
    }(viewBase_1.ViewBase));
    exports.MethodsWidget = MethodsWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0aG9kc1dpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9tZXRob2RzV2lkZ2V0L21ldGhvZHNXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVVBOzs7Ozs7T0FNRztJQUNIO1FBQTRCLGlDQUFRO1FBQXBDO1lBQUEscUVBOEtDO1lBektXLGNBQVEsR0FBc0MsRUFBRSxDQUFDO1lBQ2pELG9CQUFjLEdBQTRDLEVBQUUsQ0FBQztZQUM3RCwwQkFBb0IsR0FBeUMsRUFBRSxDQUFDO1lBR2hFLDRCQUFzQixHQUFHLFVBQUMsTUFBTSxFQUFDLElBQUksSUFBRyxPQUFBLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLEVBQXBDLENBQW9DLENBQUM7WUFDN0Usd0NBQWtDLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFHLE9BQUEsS0FBSSxDQUFDLDRCQUE0QixDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsRUFBOUMsQ0FBOEMsQ0FBQzs7UUFtSy9HLENBQUM7UUFqS0csMkNBQW1CLEdBQW5CO1lBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsR0FBRyxtREFBd0IsQ0FBQyxrQkFBa0IsQ0FBQztZQUNuRixJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDdkMsQ0FBQztRQUVNLGtEQUEwQixHQUFqQyxVQUFrQyxPQUEwQyxFQUFFLGFBQXNELEVBQUUsbUJBQXlEO1lBQzNMLDZGQUE2RjtZQUM3RixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztZQUNuQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsbUJBQW1CLENBQUM7WUFDL0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUE7UUFDMUIsQ0FBQztRQU9ELHNCQUFXLGtDQUFPO1lBTGxCOzs7O2VBSUc7aUJBQ0gsVUFBbUIsT0FB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Ly8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vbGlicy91aS9UeXBlcy9lai53ZWIuYWxsLmQudHNcIiAvPlxyXG5pbXBvcnQgeyBJTWV0aG9kc1dpZGdldCB9IGZyb20gXCIuL2ludGVyZmFjZXMvbWV0aG9kc1dpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgKiBhcyBXaWRnZXRzIGZyb20gXCIuLi8uLi93aWRnZXRzL3dpZGdldHNcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QsIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyLCBNYXBwQ29ja3BpdFF1aWNrQ29tbWFuZFBhcmFtZXRlciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFNwbGl0dGVyV2lkZ2V0IH0gZnJvbSBcIi4uL3NwbGl0dGVyV2lkZ2V0L3NwbGl0dGVyV2lkZ2V0XCI7XHJcbmltcG9ydCB7IFZpZXdCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi92aWV3QmFzZVwiO1xyXG5pbXBvcnQgeyBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi9kZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgSUxheW91dFdpZGdldCB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy9sYXlvdXRXaWRnZXRJbnRlcmZhY2VcIjtcclxuXHJcbi8qKlxyXG4gKiBpbXBsZW1lbnRzIGRpc3BsYXlpbmcgYW5kIGV4ZWN1dGlvbiBvZiBtZXRob2RzXHJcbiAqXHJcbiAqIEBjbGFzcyBNZXRob2RzV2lkZ2V0XHJcbiAqIEBleHRlbmRzIHtXaWRnZXRCYXNlfVxyXG4gKiBAaW1wbGVtZW50cyB7SU1ldGhvZHNXaWRnZXR9XHJcbiAqL1xyXG5jbGFzcyBNZXRob2RzV2lkZ2V0IGV4dGVuZHMgVmlld0Jhc2UgaW1wbGVtZW50cyBJTWV0aG9kc1dpZGdldCB7XHJcblxyXG4gICAgcHJpdmF0ZSBfbWV0aG9kUGFyYW1ldGVyTGlzdFdpZGdldDogV2lkZ2V0cy5JTWV0aG9kUGFyYW1ldGVyTGlzdFdpZGdldHx1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF9tZXRob2RMaXN0V2lkZ2V0OiBXaWRnZXRzLklNZXRob2RMaXN0V2lkZ2V0fHVuZGVmaW5lZDtcclxuXHJcbiAgICBwcml2YXRlIF9tZXRob2RzOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZD4gPSBbXTtcclxuICAgIHByaXZhdGUgX3F1aWNrQ29tbWFuZHM6IEFycmF5PE1hcHBDb2NrcGl0UXVpY2tDb21tYW5kUGFyYW1ldGVyPiA9IFtdO1xyXG4gICAgcHJpdmF0ZSBfd2F0Y2hhYmxlUGFyYW1ldGVyczogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+ID0gW107XHJcblxyXG5cclxuICAgIHByaXZhdGUgX2xheW91dFdpZGdldEFjdGl2YXRlZCA9IChzZW5kZXIsYXJncyk9PnRoaXMub25Db250ZW50QWN0aXZhdGVkKHNlbmRlcixhcmdzKTtcclxuICAgIHByaXZhdGUgX21ldGhvZExpc3RTZWxlY3Rpb25DaGFuZ2VkSGFuZGxlciA9IChzZW5kZXIsYXJncyk9PnRoaXMub25NZXRob2RMaXN0U2VsZWN0aW9uQ2hhbmdlZChzZW5kZXIsYXJncyk7XHJcbiAgIFxyXG4gICAgaW5pdGlhbGl6ZUNvbXBvbmVudCgpe1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmRlZmF1bHRTZXR0aW5nc0RhdGFJZCA9IERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5XaWRnZXREZWZpbml0aW9uSWQ7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZGlzYWJsZVBlcnNpc3RpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0Q29tcG9uZW50c01ldGhvZHNXaWRnZXQobWV0aG9kczogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRNZXRob2Q+LCBxdWlja0NvbW1hbmRzOiBBcnJheTxNYXBwQ29ja3BpdFF1aWNrQ29tbWFuZFBhcmFtZXRlcj4sIHdhdGNoYWJsZVBhcmFtZXRlcnM6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPil7XHJcbiAgICAgICAgLy9UT0RPOiB0aGlzLm1ldGhvZHMgbXVzdCBiZSBzZXR0ZWQgdGhlIGxhc3Qgb25lLiBDaGFuZ2UgaXQgc28gaXQgZG9lc24ndCBtYXR0ZXIgd2hlbiBpcyBzZXQuXHJcbiAgICAgICAgdGhpcy5xdWlja0NvbW1hbmRzID0gcXVpY2tDb21tYW5kcztcclxuICAgICAgICB0aGlzLndhdGNoYWJsZVBhcmFtZXRlcnMgPSB3YXRjaGFibGVQYXJhbWV0ZXJzO1xyXG4gICAgICAgIHRoaXMubWV0aG9kcyA9IG1ldGhvZHNcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIG1ldGhvZHMgZGF0YSBsaW5rIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBtZXRob2RzIHRvIGJlIGRpc3BsYXllZFxyXG4gICAgICogXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IG1ldGhvZHMobWV0aG9kczogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRNZXRob2Q+KSB7XHJcbiAgICAgICAgdGhpcy5fbWV0aG9kcyA9IG1ldGhvZHM7XHJcbiAgICAgICAgaWYgKHRoaXMuX21ldGhvZExpc3RXaWRnZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWV0aG9kTGlzdFdpZGdldC5tZXRob2RzID0gdGhpcy5fbWV0aG9kcztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBxdWlja0NvbW1hbmRzKHF1aWNrQ29tbWFuZHM6IEFycmF5PE1hcHBDb2NrcGl0UXVpY2tDb21tYW5kUGFyYW1ldGVyPikge1xyXG4gICAgICAgIHRoaXMuX3F1aWNrQ29tbWFuZHMgPSBxdWlja0NvbW1hbmRzO1xyXG4gICAgICAgIGlmICh0aGlzLl9tZXRob2RMaXN0V2lkZ2V0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21ldGhvZExpc3RXaWRnZXQucXVpY2tDb21tYW5kcyA9IHRoaXMuX3F1aWNrQ29tbWFuZHM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgd2F0Y2hhYmxlUGFyYW1ldGVycyh3YXRjaGFibGVQYXJhbWV0ZXJzOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4pIHtcclxuICAgICAgICB0aGlzLl93YXRjaGFibGVQYXJhbWV0ZXJzID0gd2F0Y2hhYmxlUGFyYW1ldGVycztcclxuICAgICAgICBpZiAodGhpcy5fbWV0aG9kTGlzdFdpZGdldCkge1xyXG4gICAgICAgICAgICB0aGlzLl9tZXRob2RMaXN0V2lkZ2V0LndhdGNoYWJsZVBhcmFtZXRlcnMgPSB0aGlzLl93YXRjaGFibGVQYXJhbWV0ZXJzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgY29tcG9uZW50IHNldHRpbmdzIGZvciB0aGlzIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsoQ29tcG9uZW50U2V0dGluZ3N8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGdldERlZmF1bHRDb21wb25lbnRTZXR0aW5ncygpOiBDb21wb25lbnRTZXR0aW5nc3x1bmRlZmluZWR7XHJcbiAgICAgICAgcmV0dXJuIERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5nZXRNZXRob2RzV2lkZ2V0RGVmaW5pdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBzb21lIGRlZmF1bHQgcGVyc2lzdGluZyBkYXRhIHBhY2thZ2VzIGluIHRoZSBtYWluIGRlZmF1bHQgcGVyc2lzdGluZyBkYXRhIHByb3ZpZGVyXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGFkZEFkZGl0aW9uYWxEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MoKXtcclxuICAgICAgICAvLyBTcGxpdHRlciBkZWZpbml0aW9ucyAgXHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuYWRkRGVmYXVsdENvbXBvbmVudFNldHRpbmdzVG9Qcm92aWRlcihEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuTWFpblNwbGl0dGVyRGVmaW5pdGlvbklkLCBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuZ2V0TWFpblNwbGl0dGVyRGVmaW5pdGlvbigpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHdpZGdldCBjb250ZW50IGFuZCBldmVudHVhbGx5IHN1YndpZGdldHNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBpbml0aWFsaXplZCgpIHtcclxuICAgICAgICBzdXBlci5pbml0aWFsaXplZCgpO1xyXG5cclxuICAgICAgICB0aGlzLmluaXRMYXlvdXRXaWRnZXQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRNZXRob2RMaXN0V2lkZ2V0KCk7XHJcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXJMaXN0V2lkZ2V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdExheW91dFdpZGdldCgpIHtcclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQgPSB0aGlzLmNvbXBvbmVudC5nZXRTdWJDb21wb25lbnQoRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLlNwbGl0dGVyV2lkZ2V0TWV0aG9kc0lkKSBhcyBJTGF5b3V0V2lkZ2V0O1xyXG4gICAgICAgIHRoaXMuYXR0YWNoTGF5b3V0VG9WaWV3KDxhbnk+dGhpcyk7XHJcbiAgICAgICAgLy9ObyBwZXJzaXN0aW5nIGRhdGEgaW4gdGhlIGNvbW1vbiBjb21wb25lbnQgdmlld1xyXG4gICAgICAgIHRoaXMuX2xheW91dFdpZGdldC5jb21wb25lbnQuZGlzYWJsZVBlcnNpc3RpbmcoKTtcclxuXHJcbiAgICAgICAgKHRoaXMuX2xheW91dFdpZGdldCBhcyBTcGxpdHRlcldpZGdldCkuaW5pdGlhbGl6ZSh0aGlzLnBhcmVudENvbnRlbnRJZCwgMzApO1xyXG4gICAgICAgICh0aGlzLl9sYXlvdXRXaWRnZXQgYXMgU3BsaXR0ZXJXaWRnZXQpLnNldEhlYWRlckNvbnRlbnQoXCJDb21tYW5kc1wiKTtcclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQhLmV2ZW50V2lkZ2V0QWN0aXZhdGVkLmF0dGFjaCh0aGlzLl9sYXlvdXRXaWRnZXRBY3RpdmF0ZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogc2V0IHRoZSBtZXRob2QgbGlzdCB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHNldE1ldGhvZExpc3RXaWRnZXQoKSB7XHJcbiAgICAgICAgdGhpcy5fbWV0aG9kTGlzdFdpZGdldCA9IHRoaXMuZ2V0V2lkZ2V0QnlJZChEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuTWV0aG9kTGlzdFdpZGdldElkKSBhcyBXaWRnZXRzLklNZXRob2RMaXN0V2lkZ2V0O1xyXG4gICAgICAgIHRoaXMuX21ldGhvZExpc3RXaWRnZXQuZXZlbnRTZWxlY3Rpb25DaGFuZ2VkLmF0dGFjaCh0aGlzLl9tZXRob2RMaXN0U2VsZWN0aW9uQ2hhbmdlZEhhbmRsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogc2V0IHRoZSBtZXRob2QgcGFyYW1ldGVyIGxpc3Qgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBzZXRQYXJhbWV0ZXJMaXN0V2lkZ2V0KCkge1xyXG4gICAgICAgIHRoaXMuX21ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXQgPSB0aGlzLmdldFdpZGdldEJ5SWQoRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLk1ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXRJZCkgYXMgV2lkZ2V0cy5JTWV0aG9kUGFyYW1ldGVyTGlzdFdpZGdldDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGFjdGl2YXRlcyBNZXRob2RXaWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBhY3RpdmF0ZSgpIHtcclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQhLmFjdGl2YXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBkZWFjdGl2YXRlcyBNZXRob2RXaWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBkZWFjdGl2YXRlKCkge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZGlzcG9zZXMgTWV0aG9kV2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZHNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgZGlzcG9zZSgpIHtcclxuICAgICAgICBpZih0aGlzLl9tZXRob2RMaXN0V2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX21ldGhvZExpc3RXaWRnZXQuZXZlbnRTZWxlY3Rpb25DaGFuZ2VkLmRldGFjaCh0aGlzLl9tZXRob2RMaXN0U2VsZWN0aW9uQ2hhbmdlZEhhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQhLmV2ZW50V2lkZ2V0QWN0aXZhdGVkLmRldGFjaCh0aGlzLl9sYXlvdXRXaWRnZXRBY3RpdmF0ZWQpO1xyXG4gICAgICAgIHRoaXMuX2xheW91dFdpZGdldCEuZGlzcG9zZSgpO1xyXG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogXHJcbiAgICAgKiByZXNpemVzIHRoZSBtZXRob2RzIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodFxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZHNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcmVzaXplKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fYWN0dWFsV2lkdGggPSB3aWR0aDtcclxuICAgICAgICB0aGlzLl9hY3R1YWxIZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5fbGF5b3V0V2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2xheW91dFdpZGdldCEucmVzaXplKHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uTWV0aG9kTGlzdFNlbGVjdGlvbkNoYW5nZWQoc2VuZGVyLGFyZ3Mpe1xyXG4gICAgICAgIHRoaXMuX21ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXQhLnVwZGF0ZVBhcmFtZXRlcnNMaXN0KGFyZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25Db250ZW50QWN0aXZhdGVkKHNlbmRlciwgYXJncykge1xyXG5cclxuICAgICAgICBhcmdzLndpZGdldC5hY3RpdmF0ZSgpO1xyXG4gICAgICAgIHRoaXMucmVzaXplKHRoaXMuX2FjdHVhbFdpZHRoLCB0aGlzLl9hY3R1YWxIZWlnaHQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBNZXRob2RzV2lkZ2V0IH07Il19