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
            _this._layoutWidgetActivated = function (sender, args) { return _this.onContentActivated(sender, args); };
            _this._methodListSelectionChangedHandler = function (sender, args) { return _this.onMethodListSelectionChanged(sender, args); };
            return _this;
        }
        MethodsWidget.prototype.initialize = function (layoutContainerId) {
            _super.prototype.initialize.call(this, layoutContainerId);
        };
        MethodsWidget.prototype.initializeComponent = function () {
            this.component.defaultSettingsDataId = defaultComponentSettings_1.DefaultComponentSettings.WidgetDefinitionId;
            this.component.disablePersisting();
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
        Object.defineProperty(MethodsWidget.prototype, "quickCommands", {
            set: function (quickCommands) {
                this._quickCommands = quickCommands;
                if (this._methodListWidget) {
                    this._methodListWidget.quickCommands = quickCommands;
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
         * Returns the default component settings for this widget
         *
         * @returns {*}
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
            this.addDefaultComponentSettingsToProvider(defaultComponentSettings_1.DefaultComponentSettings.MainSplitterDefinitionId, defaultComponentSettings_1.DefaultComponentSettings.getMainSplitterDefinition());
        };
        /**
         * Sets the widget content and eventually subwidgets
         *
         * @memberof MethodsWidget
         */
        MethodsWidget.prototype.initialized = function () {
            this.initLayoutWidget();
            this.setMethodListWidget();
            this.setParameterListWidget();
        };
        MethodsWidget.prototype.initLayoutWidget = function () {
            this._layoutWidget = this.component.getSubComponent("SplitterWidget_Methods");
            this.attachLayoutToView(this);
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
            this._methodListWidget = this.getWidgetById("MethodListWidget");
            this._methodListWidget.eventSelectionChanged.attach(this._methodListSelectionChangedHandler);
        };
        /**
         * set the method parameter list widget
         *
         * @returns {*}
         * @memberof MethodsWidget
         */
        MethodsWidget.prototype.setParameterListWidget = function () {
            this._methodParameterListWidget = this.getWidgetById("MethodParameterListWidget");
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
        return MethodsWidget;
    }(viewBase_1.ViewBase));
    exports.MethodsWidget = MethodsWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0aG9kc1dpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9tZXRob2RzV2lkZ2V0L21ldGhvZHNXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVVBOzs7Ozs7T0FNRztJQUNIO1FBQTRCLGlDQUFRO1FBQXBDO1lBQUEscUVBaUxDO1lBNUtXLGNBQVEsR0FBc0MsRUFBRSxDQUFDO1lBQ2pELG9CQUFjLEdBQTRDLEVBQUUsQ0FBQztZQUc3RCw0QkFBc0IsR0FBRyxVQUFDLE1BQU0sRUFBQyxJQUFJLElBQUcsT0FBQSxLQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxFQUFwQyxDQUFvQyxDQUFDO1lBQzdFLHdDQUFrQyxHQUFHLFVBQUMsTUFBTSxFQUFDLElBQUksSUFBRyxPQUFBLEtBQUksQ0FBQyw0QkFBNEIsQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLEVBQTlDLENBQThDLENBQUM7O1FBdUsvRyxDQUFDO1FBcktHLGtDQUFVLEdBQVYsVUFBVyxpQkFBeUI7WUFDaEMsaUJBQU0sVUFBVSxZQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDeEMsQ0FBQztRQUVELDJDQUFtQixHQUFuQjtZQUNJLElBQUksQ0FBQyxTQUFTLENBQUMscUJBQXFCLEdBQUcsbURBQXdCLENBQUMsa0JBQWtCLENBQUM7WUFDbkYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3ZDLENBQUM7UUFPRCxzQkFBVyxrQ0FBTztZQUxsQjs7OztlQUlHO2lCQUNILFVBQW1CLE9BQTBDO2dCQUN6RCxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztnQkFDeEIsSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDcEIsSUFBSSxDQUFDLHlCQUF5QixDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUMzQztZQUNMLENB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SUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7WUFFNUIsSUFBRyxJQUFJLENBQUMsYUFBYSxJQUFJLFNBQVMsRUFBQztnQkFDL0IsSUFBSSxDQUFDLGFBQWMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2FBQzdDO1FBQ0wsQ0FBQztRQUVPLG9EQUE0QixHQUFwQyxVQUFxQyxNQUFNLEVBQUMsSUFBSTtZQUM1QyxJQUFJLENBQUMsMEJBQTJCLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEUsQ0FBQztRQUVPLGdEQUF3QixHQUFoQztZQUNJLElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFO2dCQUN4QixJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7YUFFbEQ7UUFDTCxDQUFDO1FBRU8sMENBQWtCLEdBQTFCLFVBQTJCLE1BQU0sRUFBRSxJQUFJO1lBRW5DLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN2RCxDQUFDO1FBQ0wsb0JBQUM7SUFBRCxDQUFDLEFBakxELENBQTRCLG1CQUFRLEdBaUxuQztJQUVRLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2xpYnMvdWkvVHlwZXMvZWoud2ViLmFsbC5kLnRzXCIgLz5cclxuaW1wb3J0IHsgSU1ldGhvZHNXaWRnZXQgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL21ldGhvZHNXaWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0ICogYXMgV2lkZ2V0cyBmcm9tIFwiLi4vLi4vd2lkZ2V0cy93aWRnZXRzXCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLCBNYXBwQ29ja3BpdFF1aWNrQ29tbWFuZFBhcmFtZXRlciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFNwbGl0dGVyV2lkZ2V0IH0gZnJvbSBcIi4uL3NwbGl0dGVyV2lkZ2V0L3NwbGl0dGVyV2lkZ2V0XCI7XHJcbmltcG9ydCB7IFZpZXdCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi92aWV3QmFzZVwiO1xyXG5pbXBvcnQgeyBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi9kZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgSUxheW91dFdpZGdldCB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy9sYXlvdXRXaWRnZXRJbnRlcmZhY2VcIjtcclxuXHJcbi8qKlxyXG4gKiBpbXBsZW1lbnRzIGRpc3BsYXlpbmcgYW5kIGV4ZWN1dGlvbiBvZiBtZXRob2RzXHJcbiAqXHJcbiAqIEBjbGFzcyBNZXRob2RzV2lkZ2V0XHJcbiAqIEBleHRlbmRzIHtXaWRnZXRCYXNlfVxyXG4gKiBAaW1wbGVtZW50cyB7SU1ldGhvZHNXaWRnZXR9XHJcbiAqL1xyXG5jbGFzcyBNZXRob2RzV2lkZ2V0IGV4dGVuZHMgVmlld0Jhc2UgaW1wbGVtZW50cyBJTWV0aG9kc1dpZGdldCB7XHJcblxyXG4gICAgcHJpdmF0ZSBfbWV0aG9kUGFyYW1ldGVyTGlzdFdpZGdldDogV2lkZ2V0cy5JTWV0aG9kUGFyYW1ldGVyTGlzdFdpZGdldHx1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF9tZXRob2RMaXN0V2lkZ2V0OiBXaWRnZXRzLklNZXRob2RMaXN0V2lkZ2V0fHVuZGVmaW5lZDtcclxuXHJcbiAgICBwcml2YXRlIF9tZXRob2RzOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZD4gPSBbXTtcclxuICAgIHByaXZhdGUgX3F1aWNrQ29tbWFuZHM6IEFycmF5PE1hcHBDb2NrcGl0UXVpY2tDb21tYW5kUGFyYW1ldGVyPiA9IFtdO1xyXG5cclxuXHJcbiAgICBwcml2YXRlIF9sYXlvdXRXaWRnZXRBY3RpdmF0ZWQgPSAoc2VuZGVyLGFyZ3MpPT50aGlzLm9uQ29udGVudEFjdGl2YXRlZChzZW5kZXIsYXJncyk7XHJcbiAgICBwcml2YXRlIF9tZXRob2RMaXN0U2VsZWN0aW9uQ2hhbmdlZEhhbmRsZXIgPSAoc2VuZGVyLGFyZ3MpPT50aGlzLm9uTWV0aG9kTGlzdFNlbGVjdGlvbkNoYW5nZWQoc2VuZGVyLGFyZ3MpO1xyXG4gICBcclxuICAgIGluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQ6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRpYWxpemVDb21wb25lbnQoKXtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5kZWZhdWx0U2V0dGluZ3NEYXRhSWQgPSBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuV2lkZ2V0RGVmaW5pdGlvbklkO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmRpc2FibGVQZXJzaXN0aW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBtZXRob2RzIGRhdGEgbGluayBhcyBhIHJlZmVyZW5jZSB0byB0aGUgbWV0aG9kcyB0byBiZSBkaXNwbGF5ZWRcclxuICAgICAqIFxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZHNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBtZXRob2RzKG1ldGhvZHM6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kPikge1xyXG4gICAgICAgIHRoaXMuX21ldGhvZHMgPSBtZXRob2RzO1xyXG4gICAgICAgIGlmIChtZXRob2RzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5vbkNvbXBvbmVudE1ldGhvZHNVcGRhdGVkKG1ldGhvZHMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHF1aWNrQ29tbWFuZHMocXVpY2tDb21tYW5kczogQXJyYXk8TWFwcENvY2twaXRRdWlja0NvbW1hbmRQYXJhbWV0ZXI+KSB7XHJcbiAgICAgICAgdGhpcy5fcXVpY2tDb21tYW5kcyA9IHF1aWNrQ29tbWFuZHM7XHJcbiAgICAgICAgaWYgKHRoaXMuX21ldGhvZExpc3RXaWRnZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWV0aG9kTGlzdFdpZGdldC5xdWlja0NvbW1hbmRzID0gcXVpY2tDb21tYW5kcztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY29tcG9uZW50IG1ldGhvZHMgaGF2ZSBiZWVuIHVwZGF0ZWQuLi4uLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gY29tcG9uZW50TWV0aG9kc1xyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBvbkNvbXBvbmVudE1ldGhvZHNVcGRhdGVkKGNvbXBvbmVudE1ldGhvZHM6IGFueSk6IGFueSB7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0TWV0aG9kc0xpc3RXaWRnZXQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgY29tcG9uZW50IHNldHRpbmdzIGZvciB0aGlzIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZHNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgZ2V0RGVmYXVsdENvbXBvbmVudFNldHRpbmdzKCk6IENvbXBvbmVudFNldHRpbmdze1xyXG4gICAgICAgIHJldHVybiBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuZ2V0TWV0aG9kc1dpZGdldERlZmluaXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgc29tZSBkZWZhdWx0IHBlcnNpc3RpbmcgZGF0YSBwYWNrYWdlcyBpbiB0aGUgbWFpbiBkZWZhdWx0IHBlcnNpc3RpbmcgZGF0YSBwcm92aWRlclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBhZGRBZGRpdGlvbmFsRGVmYXVsdENvbXBvbmVudFNldHRpbmdzKCl7XHJcbiAgICAgICAgLy8gU3BsaXR0ZXIgZGVmaW5pdGlvbnMgIFxyXG4gICAgICAgIHRoaXMuYWRkRGVmYXVsdENvbXBvbmVudFNldHRpbmdzVG9Qcm92aWRlcihEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuTWFpblNwbGl0dGVyRGVmaW5pdGlvbklkLCBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuZ2V0TWFpblNwbGl0dGVyRGVmaW5pdGlvbigpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHdpZGdldCBjb250ZW50IGFuZCBldmVudHVhbGx5IHN1YndpZGdldHNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBpbml0aWFsaXplZCgpIHtcclxuICAgICAgICB0aGlzLmluaXRMYXlvdXRXaWRnZXQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRNZXRob2RMaXN0V2lkZ2V0KCk7XHJcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXJMaXN0V2lkZ2V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdExheW91dFdpZGdldCgpIHtcclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQgPSB0aGlzLmNvbXBvbmVudC5nZXRTdWJDb21wb25lbnQoXCJTcGxpdHRlcldpZGdldF9NZXRob2RzXCIpIGFzIElMYXlvdXRXaWRnZXQ7XHJcbiAgICAgICAgdGhpcy5hdHRhY2hMYXlvdXRUb1ZpZXcoPGFueT50aGlzKTtcclxuXHJcbiAgICAgICAgKHRoaXMuX2xheW91dFdpZGdldCBhcyBTcGxpdHRlcldpZGdldCkuaW5pdGlhbGl6ZSh0aGlzLnBhcmVudENvbnRlbnRJZCwgMzApO1xyXG4gICAgICAgICh0aGlzLl9sYXlvdXRXaWRnZXQgYXMgU3BsaXR0ZXJXaWRnZXQpLnNldEhlYWRlckNvbnRlbnQoXCJDb21tYW5kc1wiKTtcclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQhLmV2ZW50V2lkZ2V0QWN0aXZhdGVkLmF0dGFjaCh0aGlzLl9sYXlvdXRXaWRnZXRBY3RpdmF0ZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogc2V0IHRoZSBtZXRob2QgbGlzdCB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHNldE1ldGhvZExpc3RXaWRnZXQoKSB7XHJcbiAgICAgICAgdGhpcy5fbWV0aG9kTGlzdFdpZGdldCA9IHRoaXMuZ2V0V2lkZ2V0QnlJZChcIk1ldGhvZExpc3RXaWRnZXRcIikgYXMgV2lkZ2V0cy5JTWV0aG9kTGlzdFdpZGdldDtcclxuICAgICAgICB0aGlzLl9tZXRob2RMaXN0V2lkZ2V0LmV2ZW50U2VsZWN0aW9uQ2hhbmdlZC5hdHRhY2godGhpcy5fbWV0aG9kTGlzdFNlbGVjdGlvbkNoYW5nZWRIYW5kbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHNldCB0aGUgbWV0aG9kIHBhcmFtZXRlciBsaXN0IHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZHNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgc2V0UGFyYW1ldGVyTGlzdFdpZGdldCgpIHtcclxuICAgICAgICB0aGlzLl9tZXRob2RQYXJhbWV0ZXJMaXN0V2lkZ2V0ID0gdGhpcy5nZXRXaWRnZXRCeUlkKFwiTWV0aG9kUGFyYW1ldGVyTGlzdFdpZGdldFwiKSBhcyBXaWRnZXRzLklNZXRob2RQYXJhbWV0ZXJMaXN0V2lkZ2V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYWN0aXZhdGVzIE1ldGhvZFdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGFjdGl2YXRlKCkge1xyXG4gICAgICAgIHRoaXMuX2xheW91dFdpZGdldCEuYWN0aXZhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGRlYWN0aXZhdGVzIE1ldGhvZFdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGRlYWN0aXZhdGUoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBkaXNwb3NlcyBNZXRob2RXaWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBkaXNwb3NlKCkge1xyXG4gICAgICAgIGlmKHRoaXMuX21ldGhvZExpc3RXaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fbWV0aG9kTGlzdFdpZGdldC5ldmVudFNlbGVjdGlvbkNoYW5nZWQuZGV0YWNoKHRoaXMuX21ldGhvZExpc3RTZWxlY3Rpb25DaGFuZ2VkSGFuZGxlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2xheW91dFdpZGdldCEuZXZlbnRXaWRnZXRBY3RpdmF0ZWQuZGV0YWNoKHRoaXMuX2xheW91dFdpZGdldEFjdGl2YXRlZCk7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0IS5kaXNwb3NlKCk7XHJcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBcclxuICAgICAqIHJlc2l6ZXMgdGhlIG1ldGhvZHMgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0XHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kc1dpZGdldFxyXG4gICAgICovXHJcbiAgICByZXNpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9hY3R1YWxXaWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuX2FjdHVhbEhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLl9sYXlvdXRXaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0IS5yZXNpemUod2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25NZXRob2RMaXN0U2VsZWN0aW9uQ2hhbmdlZChzZW5kZXIsYXJncyl7XHJcbiAgICAgICAgdGhpcy5fbWV0aG9kUGFyYW1ldGVyTGlzdFdpZGdldCEudXBkYXRlUGFyYW1ldGVyc0xpc3QoYXJncyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjb25uZWN0TWV0aG9kc0xpc3RXaWRnZXQoKTogYW55IHtcclxuICAgICAgICBpZiAodGhpcy5fbWV0aG9kTGlzdFdpZGdldCkge1xyXG4gICAgICAgICAgICB0aGlzLl9tZXRob2RMaXN0V2lkZ2V0Lm1ldGhvZHMgPSB0aGlzLl9tZXRob2RzO1xyXG4gXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25Db250ZW50QWN0aXZhdGVkKHNlbmRlciwgYXJncykge1xyXG5cclxuICAgICAgICBhcmdzLndpZGdldC5hY3RpdmF0ZSgpO1xyXG4gICAgICAgIHRoaXMucmVzaXplKHRoaXMuX2FjdHVhbFdpZHRoLCB0aGlzLl9hY3R1YWxIZWlnaHQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBNZXRob2RzV2lkZ2V0IH07Il19