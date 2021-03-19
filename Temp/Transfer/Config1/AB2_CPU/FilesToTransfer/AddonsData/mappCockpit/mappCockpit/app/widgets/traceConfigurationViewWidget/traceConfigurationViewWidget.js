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
     * implements the trace configuration view widget
     *
     * @class TraceConfigurationViewWidget
     * @extends {WidgetBase}
     */
    var TraceConfigurationViewWidget = /** @class */ (function (_super) {
        __extends(TraceConfigurationViewWidget, _super);
        function TraceConfigurationViewWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._layoutWidgetActivatedHandler = function (sender, args) { return _this.onContentActivated(sender, args); };
            return _this;
        }
        /**
         *  initialize the widget
         *
         * @param {string} layoutContainerId
         * @memberof TraceConfigurationViewWidget
         */
        TraceConfigurationViewWidget.prototype.initialize = function (layoutContainerId) {
            _super.prototype.initialize.call(this, layoutContainerId);
        };
        TraceConfigurationViewWidget.prototype.initializeComponent = function () {
            this.component.defaultSettingsDataId = defaultComponentSettings_1.DefaultComponentSettings.WidgetDefinitionId;
            this.component.disablePersisting();
        };
        /**
         * Returns the default component settings for this widget
         *
         * @returns {*}
         * @memberof TraceConfigurationViewWidget
         */
        TraceConfigurationViewWidget.prototype.getDefaultComponentSettings = function () {
            return defaultComponentSettings_1.DefaultComponentSettings.getTraceConfigurationViewDefinition();
        };
        /**
         * Adds some default persisting data packages in the main default persisting data provider
         *
         * @private
         * @memberof TraceConfigurationViewWidget
         */
        TraceConfigurationViewWidget.prototype.addAdditionalDefaultComponentSettings = function () {
            // Splitter definitions  
            this.addDefaultComponentSettingsToProvider(defaultComponentSettings_1.DefaultComponentSettings.MainSplitterDefinitionId, defaultComponentSettings_1.DefaultComponentSettings.getMainSplitterDefinition());
        };
        /**
         * Sets the widget content and eventually subwidgets
         *
         * @memberof TraceConfigurationViewWidget
         */
        TraceConfigurationViewWidget.prototype.initialized = function () {
            this.initLayoutWidget();
            this.setTraceControlWidget();
            this.setMessagesWidget();
            // attach layout of traceConfigurationWidget to view
            this.attachLayoutToView(this);
        };
        TraceConfigurationViewWidget.prototype.initLayoutWidget = function () {
            this._layoutWidget = this.component.getSubComponent("SplitterWidget_TraceConfigurationView");
            this.attachLayoutToView(this);
            this._layoutWidget.initialize(this.parentContentId);
            this._layoutWidget.eventWidgetActivated.attach(this._layoutWidgetActivatedHandler);
        };
        TraceConfigurationViewWidget.prototype.dispose = function () {
            this._layoutWidget.eventWidgetActivated.detach(this._layoutWidgetActivatedHandler);
            this._layoutWidget.dispose();
            _super.prototype.dispose.call(this);
        };
        /**
         * set the trace control widget
         *
         * @returns {*}
         * @memberof TraceConfigurationViewWidget
         */
        TraceConfigurationViewWidget.prototype.setTraceControlWidget = function () {
            this._traceControlWidget = this.getWidgetById("TraceControlWidget");
        };
        /**
         * set the messages widget
         *
         * @returns {*}
         * @memberof TraceConfigurationViewWidget
         */
        TraceConfigurationViewWidget.prototype.setMessagesWidget = function () {
            this._messagesWidget = this.getWidgetById("TraceConfigurationMessagesWidget");
        };
        /** resizes the trace configuration view widget
         *
         * @param {number} width
         * @param {number} height
         * @memberof TraceConfigurationViewWidget
         */
        TraceConfigurationViewWidget.prototype.resize = function (width, height) {
            this._actualWidth = width;
            this._actualHeight = height;
            if (this._layoutWidget != undefined) {
                this._layoutWidget.resize(width, height);
            }
        };
        Object.defineProperty(TraceConfigurationViewWidget.prototype, "activeComponent", {
            /**
             * Sets the active component to be displayed by the component view
             *
             * @memberof TraceConfigurationViewWidget
             */
            set: function (activeComponent) {
                var _this = this;
                this._activeComponent = activeComponent;
                this._activeComponent.value.initialize().then(function () {
                    _this.connectComponent(_this._activeComponent.value);
                });
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Connects the active component
         *
         * @private
         * @param {MappCockpitComponent} activeComponent
         * @memberof TraceConfigurationViewWidget
         */
        TraceConfigurationViewWidget.prototype.connectComponent = function (activeComponent) {
            var _this = this;
            activeComponent.mappCockpitComponent.commandConnectComponent.execute(null, function () {
                if (activeComponent.mappCockpitComponent.parametersSource != undefined) {
                    _this.connectMessagesWidget(activeComponent.mappCockpitComponent.messageParametersSource);
                }
                if (activeComponent.traceControlInterface != undefined) {
                    _this.connectTraceControlWidget(activeComponent.traceControlInterface);
                }
            });
        };
        /**
         *   Connects the messages widget to the component parameters
         *
         * @param {Property<MappCockpitComponentParameter[]>} parametersSource
         * @returns {*}
         * @memberof TraceConfigurationViewWidget
         */
        TraceConfigurationViewWidget.prototype.connectMessagesWidget = function (componentParametersLink) {
            if (this._messagesWidget) {
                this._messagesWidget.messageParameters = componentParametersLink;
            }
        };
        /**
         *   Connects the trace control widget to the trace control provider
         *
         * @param {ITraceComponentControl} traceControlProvider
         * @returns {*}
         * @memberof TraceConfigurationViewWidget
         */
        TraceConfigurationViewWidget.prototype.connectTraceControlWidget = function (traceComponentControl) {
            if (this._traceControlWidget) {
                this._traceControlWidget.traceControlInterface = traceComponentControl;
            }
        };
        TraceConfigurationViewWidget.prototype.onContentActivated = function (sender, args) {
            args.widget.activate();
            this.resize(this._actualWidth, this._actualHeight);
        };
        return TraceConfigurationViewWidget;
    }(viewBase_1.ViewBase));
    exports.TraceConfigurationViewWidget = TraceConfigurationViewWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VDb25maWd1cmF0aW9uVmlld1dpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy90cmFjZUNvbmZpZ3VyYXRpb25WaWV3V2lkZ2V0L3RyYWNlQ29uZmlndXJhdGlvblZpZXdXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVVBOzs7OztPQUtHO0lBQ0g7UUFBMkMsZ0RBQVE7UUFBbkQ7WUFBQSxxRUEyS0M7WUFwS1csbUNBQTZCLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFHLE9BQUEsS0FBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsRUFBcEMsQ0FBb0MsQ0FBQzs7UUFvS2hHLENBQUM7UUFsS0c7Ozs7O1dBS0c7UUFDSCxpREFBVSxHQUFWLFVBQVcsaUJBQXlCO1lBQ2hDLGlCQUFNLFVBQVUsWUFBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3hDLENBQUM7UUFFRCwwREFBbUIsR0FBbkI7WUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLHFCQUFxQixHQUFHLG1EQUF3QixDQUFDLGtCQUFrQixDQUFDO1lBQ25GLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN2QyxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSCxrRUFBMkIsR0FBM0I7WUFDSSxPQUFPLG1EQUF3QixDQUFDLG1DQUFtQyxFQUFFLENBQUM7UUFDMUUsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gsNEVBQXFDLEdBQXJDO1lBQ0kseUJBQXlCO1lBQ3pCLElBQUksQ0FBQyxxQ0FBcUMsQ0FBQyxtREFBd0IsQ0FBQyx3QkFBd0IsRUFBRSxtREFBd0IsQ0FBQyx5QkFBeUIsRUFBRSxDQUFDLENBQUM7UUFDeEosQ0FBQztRQUVEOzs7O1dBSUc7UUFDSCxrREFBVyxHQUFYO1lBRUksSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFFeEIs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dUJBQXVCLENBQUM7YUFDcEU7UUFDTCxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ssZ0VBQXlCLEdBQWpDLFVBQWtDLHFCQUE2QztZQUMzRSxJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtnQkFDMUIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLHFCQUFxQixHQUFHLHFCQUFxQixDQUFDO2FBQzFFO1FBQ0wsQ0FBQztRQUVPLHlEQUFrQixHQUExQixVQUEyQixNQUFNLEVBQUUsSUFBSTtZQUVuQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDdkQsQ0FBQztRQUNMLG1DQUFDO0lBQUQsQ0FBQyxBQTNLRCxDQUEyQyxtQkFBUSxHQTJLbEQ7SUFFUSxvRUFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJVHJhY2VDb25maWd1cmF0aW9uVmlld1dpZGdldCB9IGZyb20gXCIuL2ludGVyZmFjZXMvdHJhY2VDb25maWd1cmF0aW9uVmlld1dpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgKiBhcyBXaWRnZXRzIGZyb20gXCIuLi8uLi93aWRnZXRzL3dpZGdldHNcIjtcclxuaW1wb3J0IHsgUHJvcGVydHkgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL3Byb3BlcnR5XCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyIH0gZnJvbSBcIi4uLy4uL21vZGVscy9vbmxpbmUvbWFwcENvY2twaXRDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgSVRyYWNlQ29tcG9uZW50Q29udHJvbCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvZGlhZ25vc3RpY3MvdHJhY2UvaW50ZXJmYWNlcy90cmFjZUNvbnRyb2xQcm92aWRlckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdFRyYWNlQ29tcG9uZW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9kaWFnbm9zdGljcy90cmFjZS9tYXBwQ29ja3BpdFRyYWNlQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFZpZXdCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi92aWV3QmFzZVwiO1xyXG5pbXBvcnQgeyBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi9kZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50U2V0dGluZ3NcIjtcclxuXHJcbi8qKlxyXG4gKiBpbXBsZW1lbnRzIHRoZSB0cmFjZSBjb25maWd1cmF0aW9uIHZpZXcgd2lkZ2V0XHJcbiAqXHJcbiAqIEBjbGFzcyBUcmFjZUNvbmZpZ3VyYXRpb25WaWV3V2lkZ2V0XHJcbiAqIEBleHRlbmRzIHtXaWRnZXRCYXNlfVxyXG4gKi9cclxuY2xhc3MgVHJhY2VDb25maWd1cmF0aW9uVmlld1dpZGdldCBleHRlbmRzIFZpZXdCYXNlIGltcGxlbWVudHMgSVRyYWNlQ29uZmlndXJhdGlvblZpZXdXaWRnZXQge1xyXG5cclxuICAgIHByaXZhdGUgX3RyYWNlQ29udHJvbFdpZGdldCE6IFdpZGdldHMuSVRyYWNlQ29udHJvbFdpZGdldDtcclxuXHJcbiAgICBwcml2YXRlIF9hY3RpdmVDb21wb25lbnQhOiBQcm9wZXJ0eTxNYXBwQ29ja3BpdFRyYWNlQ29tcG9uZW50PjtcclxuICAgIHByaXZhdGUgX21lc3NhZ2VzV2lkZ2V0OiBXaWRnZXRzLklNZXNzYWdlc1dpZGdldCB8IHVuZGVmaW5lZDtcclxuXHJcbiAgICBwcml2YXRlIF9sYXlvdXRXaWRnZXRBY3RpdmF0ZWRIYW5kbGVyID0gKHNlbmRlcixhcmdzKT0+dGhpcy5vbkNvbnRlbnRBY3RpdmF0ZWQoc2VuZGVyLGFyZ3MpO1xyXG5cclxuICAgIC8qKiBcclxuICAgICAqICBpbml0aWFsaXplIHRoZSB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGF5b3V0Q29udGFpbmVySWRcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ3VyYXRpb25WaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQ6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRpYWxpemVDb21wb25lbnQoKXtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5kZWZhdWx0U2V0dGluZ3NEYXRhSWQgPSBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuV2lkZ2V0RGVmaW5pdGlvbklkO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmRpc2FibGVQZXJzaXN0aW5nKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBjb21wb25lbnQgc2V0dGluZ3MgZm9yIHRoaXMgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWd1cmF0aW9uVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBnZXREZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MoKTogQ29tcG9uZW50U2V0dGluZ3N7XHJcbiAgICAgICAgcmV0dXJuIERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5nZXRUcmFjZUNvbmZpZ3VyYXRpb25WaWV3RGVmaW5pdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBzb21lIGRlZmF1bHQgcGVyc2lzdGluZyBkYXRhIHBhY2thZ2VzIGluIHRoZSBtYWluIGRlZmF1bHQgcGVyc2lzdGluZyBkYXRhIHByb3ZpZGVyXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ3VyYXRpb25WaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGFkZEFkZGl0aW9uYWxEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MoKXtcclxuICAgICAgICAvLyBTcGxpdHRlciBkZWZpbml0aW9ucyAgXHJcbiAgICAgICAgdGhpcy5hZGREZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NUb1Byb3ZpZGVyKERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5NYWluU3BsaXR0ZXJEZWZpbml0aW9uSWQsIERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5nZXRNYWluU3BsaXR0ZXJEZWZpbml0aW9uKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgd2lkZ2V0IGNvbnRlbnQgYW5kIGV2ZW50dWFsbHkgc3Vid2lkZ2V0c1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ3VyYXRpb25WaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGluaXRpYWxpemVkKCkge1xyXG5cclxuICAgICAgICB0aGlzLmluaXRMYXlvdXRXaWRnZXQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRUcmFjZUNvbnRyb2xXaWRnZXQoKTtcclxuICAgICAgICB0aGlzLnNldE1lc3NhZ2VzV2lkZ2V0KCk7XHJcblxyXG4gICAgICAgIC8vIGF0dGFjaCBsYXlvdXQgb2YgdHJhY2VDb25maWd1cmF0aW9uV2lkZ2V0IHRvIHZpZXdcclxuICAgICAgICB0aGlzLmF0dGFjaExheW91dFRvVmlldyg8YW55PnRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRMYXlvdXRXaWRnZXQoKSB7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0ID0gdGhpcy5jb21wb25lbnQuZ2V0U3ViQ29tcG9uZW50KFwiU3BsaXR0ZXJXaWRnZXRfVHJhY2VDb25maWd1cmF0aW9uVmlld1wiKSBhcyBXaWRnZXRzLklTcGxpdHRlcldpZGdldDtcclxuICAgICAgICB0aGlzLmF0dGFjaExheW91dFRvVmlldyg8YW55PnRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQuaW5pdGlhbGl6ZSh0aGlzLnBhcmVudENvbnRlbnRJZCk7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0LmV2ZW50V2lkZ2V0QWN0aXZhdGVkLmF0dGFjaCh0aGlzLl9sYXlvdXRXaWRnZXRBY3RpdmF0ZWRIYW5kbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBkaXNwb3NlKCl7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0IS5ldmVudFdpZGdldEFjdGl2YXRlZC5kZXRhY2godGhpcy5fbGF5b3V0V2lkZ2V0QWN0aXZhdGVkSGFuZGxlcik7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0IS5kaXNwb3NlKCk7XHJcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogc2V0IHRoZSB0cmFjZSBjb250cm9sIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlndXJhdGlvblZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgc2V0VHJhY2VDb250cm9sV2lkZ2V0KCkge1xyXG4gICAgICAgIHRoaXMuX3RyYWNlQ29udHJvbFdpZGdldCA9IHRoaXMuZ2V0V2lkZ2V0QnlJZChcIlRyYWNlQ29udHJvbFdpZGdldFwiKSBhcyBXaWRnZXRzLklUcmFjZUNvbnRyb2xXaWRnZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBzZXQgdGhlIG1lc3NhZ2VzIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlndXJhdGlvblZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgc2V0TWVzc2FnZXNXaWRnZXQoKSB7XHJcbiAgICAgICAgdGhpcy5fbWVzc2FnZXNXaWRnZXQgPSB0aGlzLmdldFdpZGdldEJ5SWQoXCJUcmFjZUNvbmZpZ3VyYXRpb25NZXNzYWdlc1dpZGdldFwiKSBhcyBXaWRnZXRzLklNZXNzYWdlc1dpZGdldDtcclxuICAgIH1cclxuXHJcbiAgICAvKiogcmVzaXplcyB0aGUgdHJhY2UgY29uZmlndXJhdGlvbiB2aWV3IHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodFxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlndXJhdGlvblZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcmVzaXplKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKXtcclxuICAgICAgICB0aGlzLl9hY3R1YWxXaWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuX2FjdHVhbEhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLl9sYXlvdXRXaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0IS5yZXNpemUod2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSAgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBhY3RpdmUgY29tcG9uZW50IHRvIGJlIGRpc3BsYXllZCBieSB0aGUgY29tcG9uZW50IHZpZXdcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWd1cmF0aW9uVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IGFjdGl2ZUNvbXBvbmVudChhY3RpdmVDb21wb25lbnQ6IFByb3BlcnR5PE1hcHBDb2NrcGl0VHJhY2VDb21wb25lbnQ+KSB7XHJcbiAgICAgICAgdGhpcy5fYWN0aXZlQ29tcG9uZW50ID0gYWN0aXZlQ29tcG9uZW50O1xyXG4gICAgICAgIHRoaXMuX2FjdGl2ZUNvbXBvbmVudC52YWx1ZS5pbml0aWFsaXplKCkudGhlbigoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RDb21wb25lbnQodGhpcy5fYWN0aXZlQ29tcG9uZW50LnZhbHVlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gICBcclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbm5lY3RzIHRoZSBhY3RpdmUgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnR9IGFjdGl2ZUNvbXBvbmVudFxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlndXJhdGlvblZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb25uZWN0Q29tcG9uZW50KGFjdGl2ZUNvbXBvbmVudDogTWFwcENvY2twaXRUcmFjZUNvbXBvbmVudCkge1xyXG4gICAgICAgIGFjdGl2ZUNvbXBvbmVudC5tYXBwQ29ja3BpdENvbXBvbmVudC5jb21tYW5kQ29ubmVjdENvbXBvbmVudC5leGVjdXRlKG51bGwsICgpID0+IHtcclxuICAgICAgICAgICAgaWYoYWN0aXZlQ29tcG9uZW50Lm1hcHBDb2NrcGl0Q29tcG9uZW50LnBhcmFtZXRlcnNTb3VyY2UgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdE1lc3NhZ2VzV2lkZ2V0KGFjdGl2ZUNvbXBvbmVudC5tYXBwQ29ja3BpdENvbXBvbmVudC5tZXNzYWdlUGFyYW1ldGVyc1NvdXJjZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoYWN0aXZlQ29tcG9uZW50LnRyYWNlQ29udHJvbEludGVyZmFjZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0VHJhY2VDb250cm9sV2lkZ2V0KGFjdGl2ZUNvbXBvbmVudC50cmFjZUNvbnRyb2xJbnRlcmZhY2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAgIENvbm5lY3RzIHRoZSBtZXNzYWdlcyB3aWRnZXQgdG8gdGhlIGNvbXBvbmVudCBwYXJhbWV0ZXJzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtQcm9wZXJ0eTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdPn0gcGFyYW1ldGVyc1NvdXJjZVxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWd1cmF0aW9uVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbm5lY3RNZXNzYWdlc1dpZGdldChjb21wb25lbnRQYXJhbWV0ZXJzTGluazogUHJvcGVydHk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXT4pOiBhbnkge1xyXG4gICAgICAgIGlmICh0aGlzLl9tZXNzYWdlc1dpZGdldCkge1xyXG4gICAgICAgICAgICB0aGlzLl9tZXNzYWdlc1dpZGdldC5tZXNzYWdlUGFyYW1ldGVycyA9IGNvbXBvbmVudFBhcmFtZXRlcnNMaW5rO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICAgQ29ubmVjdHMgdGhlIHRyYWNlIGNvbnRyb2wgd2lkZ2V0IHRvIHRoZSB0cmFjZSBjb250cm9sIHByb3ZpZGVyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJVHJhY2VDb21wb25lbnRDb250cm9sfSB0cmFjZUNvbnRyb2xQcm92aWRlclxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWd1cmF0aW9uVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbm5lY3RUcmFjZUNvbnRyb2xXaWRnZXQodHJhY2VDb21wb25lbnRDb250cm9sOiBJVHJhY2VDb21wb25lbnRDb250cm9sKTogYW55IHtcclxuICAgICAgICBpZiAodGhpcy5fdHJhY2VDb250cm9sV2lkZ2V0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RyYWNlQ29udHJvbFdpZGdldC50cmFjZUNvbnRyb2xJbnRlcmZhY2UgPSB0cmFjZUNvbXBvbmVudENvbnRyb2w7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIG9uQ29udGVudEFjdGl2YXRlZChzZW5kZXIsIGFyZ3MpIHtcclxuXHJcbiAgICAgICAgYXJncy53aWRnZXQuYWN0aXZhdGUoKTtcclxuICAgICAgICB0aGlzLnJlc2l6ZSh0aGlzLl9hY3R1YWxXaWR0aCwgdGhpcy5fYWN0dWFsSGVpZ2h0KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgVHJhY2VDb25maWd1cmF0aW9uVmlld1dpZGdldCB9OyJdfQ==