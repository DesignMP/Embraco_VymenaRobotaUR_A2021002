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
define(["require", "exports", "../../common/componentBase/componentSettings", "../../framework/componentHub/bindings/componentBinding", "../common/defaultComponentSettingsWidgetBase"], function (require, exports, componentSettings_1, componentBinding_1, defaultComponentSettingsWidgetBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DefaultComponentSettings = /** @class */ (function (_super) {
        __extends(DefaultComponentSettings, _super);
        function DefaultComponentSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Returns the default component settings for this widget
         *
         * @static
         * @returns {ComponentSettings}
         * @memberof DefaultComponentSettings
         */
        DefaultComponentSettings.getTraceConfigurationDataPointsDefinition = function () {
            var componentSettings = new componentSettings_1.ComponentSettings();
            // Add bindings
            componentSettings.addBinding(componentBinding_1.BindingType.DATA, "", "app::trace configuration", "available data points", "initializeAvailableDataPoints", "");
            componentSettings.addBinding(componentBinding_1.BindingType.DATA, "", "app::trace configuration", "trace data points", "initializeTraceDataPoints", "");
            return componentSettings;
        };
        DefaultComponentSettings.WidgetDefinitionId = "traceConfigurationDataPointsDefinition";
        return DefaultComponentSettings;
    }(defaultComponentSettingsWidgetBase_1.DefaultComponentSettingsWidgetBase));
    exports.DefaultComponentSettings = DefaultComponentSettings;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdENvbXBvbmVudFNldHRpbmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldC9kZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUlBO1FBQThDLDRDQUFrQztRQUFoRjs7UUFvQkEsQ0FBQztRQWhCRzs7Ozs7O1dBTUc7UUFDVyxrRUFBeUMsR0FBdkQ7WUFDSSxJQUFJLGlCQUFpQixHQUFHLElBQUkscUNBQWlCLEVBQUUsQ0FBQztZQUVoRCxlQUFlO1lBQ2YsaUJBQWlCLENBQUMsVUFBVSxDQUFDLDhCQUFXLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSwwQkFBMEIsRUFBRSx1QkFBdUIsRUFBRSwrQkFBK0IsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUM3SSxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsOEJBQVcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLDBCQUEwQixFQUFFLG1CQUFtQixFQUFFLDJCQUEyQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRXJJLE9BQU8saUJBQWlCLENBQUM7UUFDN0IsQ0FBQztRQWpCYSwyQ0FBa0IsR0FBRyx3Q0FBd0MsQ0FBQztRQWtCaEYsK0JBQUM7S0FBQSxBQXBCRCxDQUE4Qyx1RUFBa0MsR0FvQi9FO0lBcEJZLDREQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCB7IEJpbmRpbmdUeXBlIH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9jb21wb25lbnRIdWIvYmluZGluZ3MvY29tcG9uZW50QmluZGluZ1wiO1xyXG5pbXBvcnQgeyBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NXaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi9kZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NXaWRnZXRCYXNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRGVmYXVsdENvbXBvbmVudFNldHRpbmdzIGV4dGVuZHMgRGVmYXVsdENvbXBvbmVudFNldHRpbmdzV2lkZ2V0QmFzZXtcclxuICAgIFxyXG4gICAgcHVibGljIHN0YXRpYyBXaWRnZXREZWZpbml0aW9uSWQgPSBcInRyYWNlQ29uZmlndXJhdGlvbkRhdGFQb2ludHNEZWZpbml0aW9uXCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IGNvbXBvbmVudCBzZXR0aW5ncyBmb3IgdGhpcyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50U2V0dGluZ3N9XHJcbiAgICAgKiBAbWVtYmVyb2YgRGVmYXVsdENvbXBvbmVudFNldHRpbmdzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0VHJhY2VDb25maWd1cmF0aW9uRGF0YVBvaW50c0RlZmluaXRpb24oKSA6IENvbXBvbmVudFNldHRpbmdzIHtcclxuICAgICAgICBsZXQgY29tcG9uZW50U2V0dGluZ3MgPSBuZXcgQ29tcG9uZW50U2V0dGluZ3MoKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBBZGQgYmluZGluZ3NcclxuICAgICAgICBjb21wb25lbnRTZXR0aW5ncy5hZGRCaW5kaW5nKEJpbmRpbmdUeXBlLkRBVEEsIFwiXCIsIFwiYXBwOjp0cmFjZSBjb25maWd1cmF0aW9uXCIsIFwiYXZhaWxhYmxlIGRhdGEgcG9pbnRzXCIsIFwiaW5pdGlhbGl6ZUF2YWlsYWJsZURhdGFQb2ludHNcIiwgXCJcIik7XHJcbiAgICAgICAgY29tcG9uZW50U2V0dGluZ3MuYWRkQmluZGluZyhCaW5kaW5nVHlwZS5EQVRBLCBcIlwiLCBcImFwcDo6dHJhY2UgY29uZmlndXJhdGlvblwiLCBcInRyYWNlIGRhdGEgcG9pbnRzXCIsIFwiaW5pdGlhbGl6ZVRyYWNlRGF0YVBvaW50c1wiLCBcIlwiKTtcclxuICAgICAgIFxyXG4gICAgICAgIHJldHVybiBjb21wb25lbnRTZXR0aW5ncztcclxuICAgIH1cclxufSJdfQ==