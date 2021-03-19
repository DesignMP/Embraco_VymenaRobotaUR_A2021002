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
        /* initialize the widget
         *
         * @param {string} layoutContainerId
         * @memberof TraceConfigurationWidget
         */
        TraceConfigurationWidget.prototype.initialize = function (layoutContainerId) {
            _super.prototype.initialize.call(this, layoutContainerId);
        };
        TraceConfigurationWidget.prototype.initializeComponent = function () {
            this.component.defaultSettingsDataId = defaultComponentSettings_1.DefaultComponentSettings.WidgetDefinitionId;
            this.component.disablePersisting();
        };
        /**
         * Returns the default component settings for this widget
         *
         * @returns {*}
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
            this.addDefaultComponentSettingsToProvider(defaultComponentSettings_1.DefaultComponentSettings.MainSplitterDefinitionId, defaultComponentSettings_1.DefaultComponentSettings.getMainSplitterDefinition());
        };
        /**
         * Sets the widget content and eventually subwidgets
         *
         * @memberof TraceConfigurationWidget
         */
        TraceConfigurationWidget.prototype.initialized = function () {
            this.initLayoutWidget();
        };
        TraceConfigurationWidget.prototype.initLayoutWidget = function () {
            this._layoutWidget = this.component.getSubComponent("SplitterWidget_TraceConfiguration");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VDb25maWd1cmF0aW9uV2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RyYWNlQ29uZmlndXJhdGlvbldpZGdldC90cmFjZUNvbmZpZ3VyYXRpb25XaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQU1BOzs7OztPQUtHO0lBQ0g7UUFBOEMsNENBQVE7UUFBdEQ7WUFBQSxxRUEwRkM7WUF4RlcsbUNBQTZCLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFHLE9BQUEsS0FBSSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsRUFBMUMsQ0FBMEMsQ0FBQzs7UUF3RnRHLENBQUM7UUF0Rkc7Ozs7V0FJRztRQUNILDZDQUFVLEdBQVYsVUFBVyxpQkFBeUI7WUFDaEMsaUJBQU0sVUFBVSxZQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDeEMsQ0FBQztRQUVELHNEQUFtQixHQUFuQjtZQUNJLElBQUksQ0FBQyxTQUFTLENBQUMscUJBQXFCLEdBQUcsbURBQXdCLENBQUMsa0JBQWtCLENBQUM7WUFDbkYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3ZDLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNILDhEQUEyQixHQUEzQjtZQUNJLE9BQU8sbURBQXdCLENBQUMsK0JBQStCLEVBQUUsQ0FBQztRQUN0RSxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSCx3RUFBcUMsR0FBckM7WUFDSSx5QkFBeUI7WUFDekIsSUFBSSxDQUFDLHFDQUFxQyxDQUFDLG1EQUF3QixDQUFDLHdCQUF3QixFQUFFLG1EQUF3QixDQUFDLHlCQUF5QixFQUFFLENBQUMsQ0FBQztRQUN4SixDQUFDO1FBRUQ7Ozs7V0FJRztRQUNILDhDQUFXLEdBQVg7WUFDSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUM1QixDQUFDO1FBRUQsbURBQWdCLEdBQWhCO1lBQ0ksSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxtQ0FBbUMsQ0FBa0IsQ0FBQztZQUMxRyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztZQUUxQixJQUFJLENBQUMsYUFBYyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDckQsSUFBSSxDQUFDLGFBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLENBQUM7UUFDeEYsQ0FBQztRQUVELDBDQUFPLEdBQVA7WUFDSSxJQUFJLENBQUMsYUFBYyxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsNkJBQTZCLENBQUMsQ0FBQztZQUNwRixJQUFJLENBQUMsYUFBYyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzlCLGlCQUFNLE9BQU8sV0FBRSxDQUFDO1FBQ3BCLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSCx5Q0FBTSxHQUFOLFVBQU8sS0FBYSxFQUFFLE1BQWM7WUFDaEMsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7WUFDMUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7WUFFNUIsSUFBRyxJQUFJLENBQUMsYUFBYSxJQUFJLFNBQVMsRUFBQztnQkFDL0IsSUFBSSxDQUFDLGFBQWMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2FBQzdDO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSywyREFBd0IsR0FBaEMsVUFBaUMsTUFBTSxFQUFFLElBQUk7WUFDekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3ZELENBQUM7UUFDTCwrQkFBQztJQUFELENBQUMsQUExRkQsQ0FBOEMsbUJBQVEsR0EwRnJEO0lBMUZZLDREQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElUcmFjZUNvbmZpZ3VyYXRpb25XaWRnZXQgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL3RyYWNlQ29uZmlndXJhdGlvbldpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi9kZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgVmlld0Jhc2UgfSBmcm9tIFwiLi4vY29tbW9uL3ZpZXdCYXNlXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCB7IElMYXlvdXRXaWRnZXQgfSBmcm9tIFwiLi4vY29tbW9uL2ludGVyZmFjZXMvbGF5b3V0V2lkZ2V0SW50ZXJmYWNlXCI7XHJcblxyXG4vKipcclxuICogaW1wbGVtZW50cyB0aGUgVHJhY2VDb25maWd1cmF0aW9uV2lkZ2V0XHJcbiAqXHJcbiAqIEBjbGFzcyBUcmFjZUNvbmZpZ3VyYXRpb25XaWRnZXRcclxuICogQGV4dGVuZHMge1dpZGdldEJhc2V9XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVHJhY2VDb25maWd1cmF0aW9uV2lkZ2V0IGV4dGVuZHMgVmlld0Jhc2UgaW1wbGVtZW50cyBJVHJhY2VDb25maWd1cmF0aW9uV2lkZ2V0IHtcclxuXHJcbiAgICBwcml2YXRlIF9sYXlvdXRXaWRnZXRBY3RpdmF0ZWRIYW5kbGVyID0gKHNlbmRlcixhcmdzKT0+dGhpcy5vbkxheW91dENvbnRlbnRBY3RpdmF0ZWQoc2VuZGVyLGFyZ3MpO1xyXG5cclxuICAgIC8qIGluaXRpYWxpemUgdGhlIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYXlvdXRDb250YWluZXJJZFxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlndXJhdGlvbldpZGdldFxyXG4gICAgICovXHJcbiAgICBpbml0aWFsaXplKGxheW91dENvbnRhaW5lcklkOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlci5pbml0aWFsaXplKGxheW91dENvbnRhaW5lcklkKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0aWFsaXplQ29tcG9uZW50KCl7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZGVmYXVsdFNldHRpbmdzRGF0YUlkID0gRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLldpZGdldERlZmluaXRpb25JZDtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5kaXNhYmxlUGVyc2lzdGluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBjb21wb25lbnQgc2V0dGluZ3MgZm9yIHRoaXMgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWd1cmF0aW9uV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGdldERlZmF1bHRDb21wb25lbnRTZXR0aW5ncygpOiBDb21wb25lbnRTZXR0aW5nc3tcclxuICAgICAgICByZXR1cm4gRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLmdldFRyYWNlQ29uZmlndXJhdGlvbkRlZmluaXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgc29tZSBkZWZhdWx0IHBlcnNpc3RpbmcgZGF0YSBwYWNrYWdlcyBpbiB0aGUgbWFpbiBkZWZhdWx0IHBlcnNpc3RpbmcgZGF0YSBwcm92aWRlclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWd1cmF0aW9uVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBhZGRBZGRpdGlvbmFsRGVmYXVsdENvbXBvbmVudFNldHRpbmdzKCl7XHJcbiAgICAgICAgLy8gU3BsaXR0ZXIgZGVmaW5pdGlvbnMgIFxyXG4gICAgICAgIHRoaXMuYWRkRGVmYXVsdENvbXBvbmVudFNldHRpbmdzVG9Qcm92aWRlcihEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuTWFpblNwbGl0dGVyRGVmaW5pdGlvbklkLCBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuZ2V0TWFpblNwbGl0dGVyRGVmaW5pdGlvbigpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHdpZGdldCBjb250ZW50IGFuZCBldmVudHVhbGx5IHN1YndpZGdldHNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWd1cmF0aW9uV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGluaXRpYWxpemVkKCkge1xyXG4gICAgICAgIHRoaXMuaW5pdExheW91dFdpZGdldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRMYXlvdXRXaWRnZXQoKSB7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0ID0gdGhpcy5jb21wb25lbnQuZ2V0U3ViQ29tcG9uZW50KFwiU3BsaXR0ZXJXaWRnZXRfVHJhY2VDb25maWd1cmF0aW9uXCIpIGFzIElMYXlvdXRXaWRnZXQ7XHJcbiAgICAgICAgdGhpcy5hdHRhY2hMYXlvdXRUb1ZpZXcoKTtcclxuXHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0IS5pbml0aWFsaXplKHRoaXMucGFyZW50Q29udGVudElkKTtcclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQhLmV2ZW50V2lkZ2V0QWN0aXZhdGVkLmF0dGFjaCh0aGlzLl9sYXlvdXRXaWRnZXRBY3RpdmF0ZWRIYW5kbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBkaXNwb3NlKCl7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0IS5ldmVudFdpZGdldEFjdGl2YXRlZC5kZXRhY2godGhpcy5fbGF5b3V0V2lkZ2V0QWN0aXZhdGVkSGFuZGxlcik7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0IS5kaXNwb3NlKCk7XHJcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBcclxuICAgICAqIHJlc2l6ZXMgdGhlIHRyYWNlIGNvbmZpZ3VyYXRpb24gd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWd1cmF0aW9uV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHJlc2l6ZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcil7XHJcbiAgICAgICAgdGhpcy5fYWN0dWFsV2lkdGggPSB3aWR0aDtcclxuICAgICAgICB0aGlzLl9hY3R1YWxIZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5fbGF5b3V0V2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2xheW91dFdpZGdldCEucmVzaXplKHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgXHJcbiAgICAvKipcclxuICAgICAqIFJhaXNlZCBhZnRlciBhIGxheW91dCBjb250ZW50IHdhcyBhY3RpdmF0ZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlndXJhdGlvbldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uTGF5b3V0Q29udGVudEFjdGl2YXRlZChzZW5kZXIsIGFyZ3MpIHtcclxuICAgICAgICBhcmdzLndpZGdldC5hY3RpdmF0ZSgpO1xyXG4gICAgICAgIHRoaXMucmVzaXplKHRoaXMuX2FjdHVhbFdpZHRoLCB0aGlzLl9hY3R1YWxIZWlnaHQpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==