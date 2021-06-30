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
define(["require", "exports", "../splitterWidget/splitterDefinition", "../../common/componentBase/componentSettings", "../common/splitterComponentSettings", "../common/defaultComponentSettingsWidgetBase"], function (require, exports, splitterDefinition_1, componentSettings_1, splitterComponentSettings_1, defaultComponentSettingsWidgetBase_1) {
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
        DefaultComponentSettings.getTraceConfigurationDefinition = function () {
            var componentSettings = new componentSettings_1.ComponentSettings();
            componentSettings.addSubComponent("SplitterWidget", DefaultComponentSettings.SplitterWidgetTraceConfigurationId, DefaultComponentSettings.MainSplitterDefinitionId);
            return componentSettings;
        };
        DefaultComponentSettings.getMainSplitterDefinition = function () {
            var splitterComponentSettings = new splitterComponentSettings_1.SplitterComponentSettings(splitterDefinition_1.SplitterDefinition.orientationHorizontal);
            splitterComponentSettings.addPane("TraceConfigDatapointsWidget", DefaultComponentSettings.TraceConfigDatapointsWidgetId, "", splitterComponentSettings_1.SplitterComponentSettings.getPaneSettings(-1));
            splitterComponentSettings.addPane("TraceConfigTimingWidget", DefaultComponentSettings.TraceConfigTimingWidgetId, "", splitterComponentSettings_1.SplitterComponentSettings.getPaneSettings(570));
            splitterComponentSettings.addPane("TraceConfigTriggerWidget", DefaultComponentSettings.TraceConfigTriggerWidgetId, "", splitterComponentSettings_1.SplitterComponentSettings.getPaneSettings(500));
            return splitterComponentSettings;
        };
        DefaultComponentSettings.SplitterWidgetTraceConfigurationId = "SplitterWidget_TraceConfiguration";
        DefaultComponentSettings.TraceConfigDatapointsWidgetId = "TraceConfigDatapointsWidget";
        DefaultComponentSettings.TraceConfigTimingWidgetId = "TraceConfigTimingWidget";
        DefaultComponentSettings.TraceConfigTriggerWidgetId = "TraceConfigTriggerWidget";
        DefaultComponentSettings.WidgetDefinitionId = "traceConfigurationDefinition";
        DefaultComponentSettings.MainSplitterDefinitionId = "traceConfigurationMainSplitterDefinition";
        return DefaultComponentSettings;
    }(defaultComponentSettingsWidgetBase_1.DefaultComponentSettingsWidgetBase));
    exports.DefaultComponentSettings = DefaultComponentSettings;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdENvbXBvbmVudFNldHRpbmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RyYWNlQ29uZmlndXJhdGlvbldpZGdldC9kZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUtBO1FBQThDLDRDQUFrQztRQUFoRjs7UUFnQ0EsQ0FBQztRQXBCRzs7Ozs7O1dBTUc7UUFDVyx3REFBK0IsR0FBN0M7WUFDSSxJQUFJLGlCQUFpQixHQUFHLElBQUkscUNBQWlCLEVBQUUsQ0FBQztZQUNoRCxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLEVBQUUsd0JBQXdCLENBQUMsa0NBQWtDLEVBQUUsd0JBQXdCLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUNwSyxPQUFPLGlCQUFpQixDQUFDO1FBQzdCLENBQUM7UUFFYSxrREFBeUIsR0FBdkM7WUFDSSxJQUFJLHlCQUF5QixHQUFHLElBQUkscURBQXlCLENBQUMsdUNBQWtCLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUN4Ryx5QkFBeUIsQ0FBQyxPQUFPLENBQUMsNkJBQTZCLEVBQUUsd0JBQXdCLENBQUMsNkJBQTZCLEVBQUUsRUFBRSxFQUFFLHFEQUF5QixDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUsseUJBQXlCLENBQUMsT0FBTyxDQUFDLHlCQUF5QixFQUFFLHdCQUF3QixDQUFDLHlCQUF5QixFQUFFLEVBQUUsRUFBRSxxREFBeUIsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNySyx5QkFBeUIsQ0FBQyxPQUFPLENBQUMsMEJBQTBCLEVBQUUsd0JBQXdCLENBQUMsMEJBQTBCLEVBQUUsRUFBRSxFQUFFLHFEQUF5QixDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3ZLLE9BQU8seUJBQXlCLENBQUM7UUFDckMsQ0FBQztRQTdCYSwyREFBa0MsR0FBRyxtQ0FBbUMsQ0FBQztRQUN6RSxzREFBNkIsR0FBRyw2QkFBNkIsQ0FBQztRQUM5RCxrREFBeUIsR0FBRyx5QkFBeUIsQ0FBQztRQUN0RCxtREFBMEIsR0FBRywwQkFBMEIsQ0FBQztRQUd4RCwyQ0FBa0IsR0FBRyw4QkFBOEIsQ0FBQztRQUVwRCxpREFBd0IsR0FBRywwQ0FBMEMsQ0FBQztRQXNCeEYsK0JBQUM7S0FBQSxBQWhDRCxDQUE4Qyx1RUFBa0MsR0FnQy9FO0lBaENZLDREQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNwbGl0dGVyRGVmaW5pdGlvbiB9IGZyb20gXCIuLi9zcGxpdHRlcldpZGdldC9zcGxpdHRlckRlZmluaXRpb25cIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgU3BsaXR0ZXJDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuLi9jb21tb24vc3BsaXR0ZXJDb21wb25lbnRTZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NXaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi9kZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NXaWRnZXRCYXNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRGVmYXVsdENvbXBvbmVudFNldHRpbmdzIGV4dGVuZHMgRGVmYXVsdENvbXBvbmVudFNldHRpbmdzV2lkZ2V0QmFzZXtcclxuICAgIFxyXG4gICAgcHVibGljIHN0YXRpYyBTcGxpdHRlcldpZGdldFRyYWNlQ29uZmlndXJhdGlvbklkID0gXCJTcGxpdHRlcldpZGdldF9UcmFjZUNvbmZpZ3VyYXRpb25cIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgVHJhY2VDb25maWdEYXRhcG9pbnRzV2lkZ2V0SWQgPSBcIlRyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldFwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBUcmFjZUNvbmZpZ1RpbWluZ1dpZGdldElkID0gXCJUcmFjZUNvbmZpZ1RpbWluZ1dpZGdldFwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBUcmFjZUNvbmZpZ1RyaWdnZXJXaWRnZXRJZCA9IFwiVHJhY2VDb25maWdUcmlnZ2VyV2lkZ2V0XCI7XHJcblxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgV2lkZ2V0RGVmaW5pdGlvbklkID0gXCJ0cmFjZUNvbmZpZ3VyYXRpb25EZWZpbml0aW9uXCI7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBNYWluU3BsaXR0ZXJEZWZpbml0aW9uSWQgPSBcInRyYWNlQ29uZmlndXJhdGlvbk1haW5TcGxpdHRlckRlZmluaXRpb25cIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgY29tcG9uZW50IHNldHRpbmdzIGZvciB0aGlzIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnRTZXR0aW5nc31cclxuICAgICAqIEBtZW1iZXJvZiBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRUcmFjZUNvbmZpZ3VyYXRpb25EZWZpbml0aW9uKCkgOiBDb21wb25lbnRTZXR0aW5ncyB7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudFNldHRpbmdzID0gbmV3IENvbXBvbmVudFNldHRpbmdzKCk7XHJcbiAgICAgICAgY29tcG9uZW50U2V0dGluZ3MuYWRkU3ViQ29tcG9uZW50KFwiU3BsaXR0ZXJXaWRnZXRcIiwgRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLlNwbGl0dGVyV2lkZ2V0VHJhY2VDb25maWd1cmF0aW9uSWQsIERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5NYWluU3BsaXR0ZXJEZWZpbml0aW9uSWQpO1xyXG4gICAgICAgIHJldHVybiBjb21wb25lbnRTZXR0aW5ncztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldE1haW5TcGxpdHRlckRlZmluaXRpb24oKSA6IGFueSB7XHJcbiAgICAgICAgbGV0IHNwbGl0dGVyQ29tcG9uZW50U2V0dGluZ3MgPSBuZXcgU3BsaXR0ZXJDb21wb25lbnRTZXR0aW5ncyhTcGxpdHRlckRlZmluaXRpb24ub3JpZW50YXRpb25Ib3Jpem9udGFsKTtcclxuICAgICAgICBzcGxpdHRlckNvbXBvbmVudFNldHRpbmdzLmFkZFBhbmUoXCJUcmFjZUNvbmZpZ0RhdGFwb2ludHNXaWRnZXRcIiwgRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLlRyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldElkLCBcIlwiLCBTcGxpdHRlckNvbXBvbmVudFNldHRpbmdzLmdldFBhbmVTZXR0aW5ncygtMSkpO1xyXG4gICAgICAgIHNwbGl0dGVyQ29tcG9uZW50U2V0dGluZ3MuYWRkUGFuZShcIlRyYWNlQ29uZmlnVGltaW5nV2lkZ2V0XCIsIERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5UcmFjZUNvbmZpZ1RpbWluZ1dpZGdldElkLCBcIlwiLCBTcGxpdHRlckNvbXBvbmVudFNldHRpbmdzLmdldFBhbmVTZXR0aW5ncyg1NzApKTtcclxuICAgICAgICBzcGxpdHRlckNvbXBvbmVudFNldHRpbmdzLmFkZFBhbmUoXCJUcmFjZUNvbmZpZ1RyaWdnZXJXaWRnZXRcIiwgRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLlRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldElkLCBcIlwiLCBTcGxpdHRlckNvbXBvbmVudFNldHRpbmdzLmdldFBhbmVTZXR0aW5ncyg1MDApKTtcclxuICAgICAgICByZXR1cm4gc3BsaXR0ZXJDb21wb25lbnRTZXR0aW5ncztcclxuICAgIH0gXHJcbn0iXX0=