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
define(["require", "exports", "./defaultComponentSettings", "../common/viewBase"], function (require, exports, defaultComponentSettings_1, viewBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * implements the TraceConfigurationWidget
     *
     * @class TraceConfigurationWidget
     * @extends {WidgetBase}
     */
    var TraceConfigurationWidget = /** @class */ (function (_super) {
        __extends(TraceConfigurationWidget, _super);
        function TraceConfigurationWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._layoutWidgetActivatedHandler = function (sender, args) { return _this.onLayoutContentActivated(sender, args); };
            return _this;
        }
        TraceConfigurationWidget.prototype.initializeComponent = function () {
            this.component.defaultSettingsDataId = defaultComponentSettings_1.DefaultComponentSettings.WidgetDefinitionId;
            this.component.disablePersisting();
        };
        /**
         * Returns the default component settings for this widget
         *
         * @returns {(ComponentSettings|undefined)}
         * @memberof TraceConfigurationWidget
         */
        TraceConfigurationWidget.prototype.getDefaultComponentSettings = function () {
            return defaultComponentSettings_1.DefaultComponentSettings.getTraceConfigurationDefinition();
        };
        /**
         * Adds some default persisting data packages in the main default persisting data provider
         *
         * @private
         * @memberof TraceConfigurationViewWidget
         */
        TraceConfigurationWidget.prototype.addAdditionalDefaultComponentSettings = function () {
            // Splitter definitions  
            this.component.addDefaultComponentSettingsToProvider(defaultComponentSettings_1.DefaultComponentSettings.MainSplitterDefinitionId, defaultComponentSettings_1.DefaultComponentSettings.getMainSplitterDefinition());
        };
        /**
         * Sets the widget content and eventually subwidgets
         *
         * @memberof TraceConfigurationWidget
         */
        TraceConfigurationWidget.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            this.initLayoutWidget();
        };
        TraceConfigurationWidget.prototype.initLayoutWidget = function () {
            this._layoutWidget = this.component.getSubComponent(defaultComponentSettings_1.DefaultComponentSettings.SplitterWidgetTraceConfigurationId);
            this.attachLayoutToView();
            this._layoutWidget.initialize(this.parentContentId);
            this._layoutWidget.eventWidgetActivated.attach(this._layoutWidgetActivatedHandler);
        };
        TraceConfigurationWidget.prototype.dispose = function () {
            this._layoutWidget.eventWidgetActivated.detach(this._layoutWidgetActivatedHandler);
            this._layoutWidget.dispose();
            _super.prototype.dispose.call(this);
        };
        /**
         * resizes the trace configuration widget
         *
         * @param {number} width
         * @param {number} height
         * @memberof TraceConfigurationWidget
         */
        TraceConfigurationWidget.prototype.resize = function (width, height) {
            this._actualWidth = width;
            this._actualHeight = height;
            if (this._layoutWidget != undefined) {
                this._layoutWidget.resize(width, height);
            }
        };
        /**
         * Raised after a layout content was activated
         *
         * @private
         * @param {*} sender
         * @param {*} args
         * @memberof TraceConfigurationWidget
         */
        TraceConfigurationWidget.prototype.onLayoutContentActivated = function (sender, args) {
            args.widget.activate();
            this.resize(this._actualWidth, this._actualHeight);
        };
        return TraceConfigurationWidget;
    }(viewBase_1.ViewBase));
    exports.TraceConfigurationWidget = TraceConfigurationWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VDb25maWd1cmF0aW9uV2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RyYWNlQ29uZmlndXJhdGlvbldpZGdldC90cmFjZUNvbmZpZ3VyYXRpb25XaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQU1BOzs7OztPQUtHO0lBQ0g7UUFBOEMsNENBQVE7UUFBdEQ7WUFBQSxxRUFtRkM7WUFqRlcsbUNBQTZCLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFHLE9BQUEsS0FBSSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsRUFBMUMsQ0FBMEMsQ0FBQzs7UUFpRnRHLENBQUM7UUEvRUcsc0RBQW1CLEdBQW5CO1lBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsR0FBRyxtREFBd0IsQ0FBQyxrQkFBa0IsQ0FBQztZQUNuRixJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDdkMsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gsOERBQTJCLEdBQTNCO1lBQ0ksT0FBTyxtREFBd0IsQ0FBQywrQkFBK0IsRUFBRSxDQUFDO1FBQ3RFLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNILHdFQUFxQyxHQUFyQztZQUNJLHlCQUF5QjtZQUN6QixJQUFJLENBQUMsU0FBUyxDQUFDLHFDQUFxQyxDQUFDLG1EQUF3QixDQUFDLHdCQUF3QixFQUFFLG1EQUF3QixDQUFDLHlCQUF5QixFQUFFLENBQUMsQ0FBQztRQUNsSyxDQUFDO1FBRUQ7Ozs7V0FJRztRQUNILDhDQUFXLEdBQVg7WUFDSSxpQkFBTSxXQUFXLFdBQUUsQ0FBQztZQUVwQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUM1QixDQUFDO1FBRUQsbURBQWdCLEdBQWhCO1lBQ0ksSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxtREFBd0IsQ0FBQyxrQ0FBa0MsQ0FBa0IsQ0FBQztZQUNsSSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztZQUUxQixJQUFJLENBQUMsYUFBYyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDckQsSUFBSSxDQUFDLGFBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLENBQUM7UUFDeEYsQ0FBQztRQUVELDBDQUFPLEdBQVA7WUFDSSxJQUFJLENBQUMsYUFBYyxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsNkJBQTZCLENBQUMsQ0FBQztZQUNwRixJQUFJLENBQUMsYUFBYyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzlCLGlCQUFNLE9BQU8sV0FBRSxDQUFDO1FBQ3BCLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSCx5Q0FBTSxHQUFOLFVBQU8sS0FBYSxFQUFFLE1BQWM7WUFDaEMsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7WUFDMUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7WUFFNUIsSUFBRyxJQUFJLENBQUMsYUFBYSxJQUFJLFNBQVMsRUFBQztnQkFDL0IsSUFBSSxDQUFDLGFBQWMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2FBQzdDO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSywyREFBd0IsR0FBaEMsVUFBaUMsTUFBTSxFQUFFLElBQUk7WUFDekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3ZELENBQUM7UUFDTCwrQkFBQztJQUFELENBQUMsQUFuRkQsQ0FBOEMsbUJBQVEsR0FtRnJEO0lBbkZZLDREQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElUcmFjZUNvbmZpZ3VyYXRpb25XaWRnZXQgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL3RyYWNlQ29uZmlndXJhdGlvbldpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi9kZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgVmlld0Jhc2UgfSBmcm9tIFwiLi4vY29tbW9uL3ZpZXdCYXNlXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCB7IElMYXlvdXRXaWRnZXQgfSBmcm9tIFwiLi4vY29tbW9uL2ludGVyZmFjZXMvbGF5b3V0V2lkZ2V0SW50ZXJmYWNlXCI7XHJcblxyXG4vKipcclxuICogaW1wbGVtZW50cyB0aGUgVHJhY2VDb25maWd1cmF0aW9uV2lkZ2V0XHJcbiAqXHJcbiAqIEBjbGFzcyBUcmFjZUNvbmZpZ3VyYXRpb25XaWRnZXRcclxuICogQGV4dGVuZHMge1dpZGdldEJhc2V9XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVHJhY2VDb25maWd1cmF0aW9uV2lkZ2V0IGV4dGVuZHMgVmlld0Jhc2UgaW1wbGVtZW50cyBJVHJhY2VDb25maWd1cmF0aW9uV2lkZ2V0IHtcclxuXHJcbiAgICBwcml2YXRlIF9sYXlvdXRXaWRnZXRBY3RpdmF0ZWRIYW5kbGVyID0gKHNlbmRlcixhcmdzKT0+dGhpcy5vbkxheW91dENvbnRlbnRBY3RpdmF0ZWQoc2VuZGVyLGFyZ3MpO1xyXG5cclxuICAgIGluaXRpYWxpemVDb21wb25lbnQoKXtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5kZWZhdWx0U2V0dGluZ3NEYXRhSWQgPSBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuV2lkZ2V0RGVmaW5pdGlvbklkO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmRpc2FibGVQZXJzaXN0aW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IGNvbXBvbmVudCBzZXR0aW5ncyBmb3IgdGhpcyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7KENvbXBvbmVudFNldHRpbmdzfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWd1cmF0aW9uV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGdldERlZmF1bHRDb21wb25lbnRTZXR0aW5ncygpOiBDb21wb25lbnRTZXR0aW5nc3x1bmRlZmluZWR7XHJcbiAgICAgICAgcmV0dXJuIERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5nZXRUcmFjZUNvbmZpZ3VyYXRpb25EZWZpbml0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIHNvbWUgZGVmYXVsdCBwZXJzaXN0aW5nIGRhdGEgcGFja2FnZXMgaW4gdGhlIG1haW4gZGVmYXVsdCBwZXJzaXN0aW5nIGRhdGEgcHJvdmlkZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlndXJhdGlvblZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgYWRkQWRkaXRpb25hbERlZmF1bHRDb21wb25lbnRTZXR0aW5ncygpe1xyXG4gICAgICAgIC8vIFNwbGl0dGVyIGRlZmluaXRpb25zICBcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5hZGREZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NUb1Byb3ZpZGVyKERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5NYWluU3BsaXR0ZXJEZWZpbml0aW9uSWQsIERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5nZXRNYWluU3BsaXR0ZXJEZWZpbml0aW9uKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgd2lkZ2V0IGNvbnRlbnQgYW5kIGV2ZW50dWFsbHkgc3Vid2lkZ2V0c1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ3VyYXRpb25XaWRnZXRcclxuICAgICAqL1xyXG4gICAgaW5pdGlhbGl6ZWQoKSB7XHJcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZWQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0TGF5b3V0V2lkZ2V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdExheW91dFdpZGdldCgpIHtcclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQgPSB0aGlzLmNvbXBvbmVudC5nZXRTdWJDb21wb25lbnQoRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLlNwbGl0dGVyV2lkZ2V0VHJhY2VDb25maWd1cmF0aW9uSWQpIGFzIElMYXlvdXRXaWRnZXQ7XHJcbiAgICAgICAgdGhpcy5hdHRhY2hMYXlvdXRUb1ZpZXcoKTtcclxuXHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0IS5pbml0aWFsaXplKHRoaXMucGFyZW50Q29udGVudElkKTtcclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQhLmV2ZW50V2lkZ2V0QWN0aXZhdGVkLmF0dGFjaCh0aGlzLl9sYXlvdXRXaWRnZXRBY3RpdmF0ZWRIYW5kbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBkaXNwb3NlKCl7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0IS5ldmVudFdpZGdldEFjdGl2YXRlZC5kZXRhY2godGhpcy5fbGF5b3V0V2lkZ2V0QWN0aXZhdGVkSGFuZGxlcik7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0IS5kaXNwb3NlKCk7XHJcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBcclxuICAgICAqIHJlc2l6ZXMgdGhlIHRyYWNlIGNvbmZpZ3VyYXRpb24gd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWd1cmF0aW9uV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHJlc2l6ZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcil7XHJcbiAgICAgICAgdGhpcy5fYWN0dWFsV2lkdGggPSB3aWR0aDtcclxuICAgICAgICB0aGlzLl9hY3R1YWxIZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5fbGF5b3V0V2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2xheW91dFdpZGdldCEucmVzaXplKHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgXHJcbiAgICAvKipcclxuICAgICAqIFJhaXNlZCBhZnRlciBhIGxheW91dCBjb250ZW50IHdhcyBhY3RpdmF0ZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlndXJhdGlvbldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uTGF5b3V0Q29udGVudEFjdGl2YXRlZChzZW5kZXIsIGFyZ3MpIHtcclxuICAgICAgICBhcmdzLndpZGdldC5hY3RpdmF0ZSgpO1xyXG4gICAgICAgIHRoaXMucmVzaXplKHRoaXMuX2FjdHVhbFdpZHRoLCB0aGlzLl9hY3R1YWxIZWlnaHQpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==