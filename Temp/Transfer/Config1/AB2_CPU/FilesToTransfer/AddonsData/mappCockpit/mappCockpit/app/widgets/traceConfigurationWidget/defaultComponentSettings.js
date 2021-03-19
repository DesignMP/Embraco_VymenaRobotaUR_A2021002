define(["require", "exports", "../splitterWidget/splitterDefinition", "../../common/componentBase/componentSettings", "../common/splitterWidgetData"], function (require, exports, splitterDefinition_1, componentSettings_1, splitterWidgetData_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DefaultComponentSettings = /** @class */ (function () {
        function DefaultComponentSettings() {
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
            componentSettings.addSubComponent("SplitterWidget", "SplitterWidget_TraceConfiguration", DefaultComponentSettings.MainSplitterDefinitionId);
            return componentSettings;
        };
        DefaultComponentSettings.getMainSplitterDefinition = function () {
            var splitterComponentSettings = new splitterWidgetData_1.SplitterWidgetData(splitterDefinition_1.SplitterDefinition.orientationHorizontal);
            splitterComponentSettings.addPane("TraceConfigDatapointsWidget", "TraceConfigDatapointsWidget", "", splitterWidgetData_1.SplitterWidgetData.getPanePersistingData(-1));
            splitterComponentSettings.addPane("TraceConfigTimingWidget", "TraceConfigTimingWidget", "", splitterWidgetData_1.SplitterWidgetData.getPanePersistingData(570));
            splitterComponentSettings.addPane("TraceConfigTriggerWidget", "TraceConfigTriggerWidget", "", splitterWidgetData_1.SplitterWidgetData.getPanePersistingData(500));
            return splitterComponentSettings;
        };
        DefaultComponentSettings.WidgetDefinitionId = "traceConfigurationDefinition";
        DefaultComponentSettings.MainSplitterDefinitionId = "traceConfigurationMainSplitterDefinition";
        return DefaultComponentSettings;
    }());
    exports.DefaultComponentSettings = DefaultComponentSettings;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdENvbXBvbmVudFNldHRpbmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RyYWNlQ29uZmlndXJhdGlvbldpZGdldC9kZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBSUE7UUFBQTtRQTBCQSxDQUFDO1FBcEJHOzs7Ozs7V0FNRztRQUNXLHdEQUErQixHQUE3QztZQUNJLElBQUksaUJBQWlCLEdBQUcsSUFBSSxxQ0FBaUIsRUFBRSxDQUFDO1lBQ2hELGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsRUFBQyxtQ0FBbUMsRUFBRSx3QkFBd0IsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBQzNJLE9BQU8saUJBQWlCLENBQUM7UUFDN0IsQ0FBQztRQUVhLGtEQUF5QixHQUF2QztZQUNJLElBQUkseUJBQXlCLEdBQUcsSUFBSSx1Q0FBa0IsQ0FBQyx1Q0FBa0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ2pHLHlCQUF5QixDQUFDLE9BQU8sQ0FBQyw2QkFBNkIsRUFBRSw2QkFBNkIsRUFBRSxFQUFFLEVBQUUsdUNBQWtCLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xKLHlCQUF5QixDQUFDLE9BQU8sQ0FBQyx5QkFBeUIsRUFBRSx5QkFBeUIsRUFBRSxFQUFFLEVBQUUsdUNBQWtCLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUMzSSx5QkFBeUIsQ0FBQyxPQUFPLENBQUMsMEJBQTBCLEVBQUUsMEJBQTBCLEVBQUUsRUFBRSxFQUFFLHVDQUFrQixDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDN0ksT0FBTyx5QkFBeUIsQ0FBQztRQUNyQyxDQUFDO1FBdkJhLDJDQUFrQixHQUFHLDhCQUE4QixDQUFDO1FBRXBELGlEQUF3QixHQUFHLDBDQUEwQyxDQUFDO1FBc0J4RiwrQkFBQztLQUFBLEFBMUJELElBMEJDO0lBMUJZLDREQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNwbGl0dGVyRGVmaW5pdGlvbiB9IGZyb20gXCIuLi9zcGxpdHRlcldpZGdldC9zcGxpdHRlckRlZmluaXRpb25cIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgU3BsaXR0ZXJXaWRnZXREYXRhIH0gZnJvbSBcIi4uL2NvbW1vbi9zcGxpdHRlcldpZGdldERhdGFcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3N7XHJcbiAgICBcclxuICAgIHB1YmxpYyBzdGF0aWMgV2lkZ2V0RGVmaW5pdGlvbklkID0gXCJ0cmFjZUNvbmZpZ3VyYXRpb25EZWZpbml0aW9uXCI7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBNYWluU3BsaXR0ZXJEZWZpbml0aW9uSWQgPSBcInRyYWNlQ29uZmlndXJhdGlvbk1haW5TcGxpdHRlckRlZmluaXRpb25cIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgY29tcG9uZW50IHNldHRpbmdzIGZvciB0aGlzIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnRTZXR0aW5nc31cclxuICAgICAqIEBtZW1iZXJvZiBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRUcmFjZUNvbmZpZ3VyYXRpb25EZWZpbml0aW9uKCkgOiBDb21wb25lbnRTZXR0aW5ncyB7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudFNldHRpbmdzID0gbmV3IENvbXBvbmVudFNldHRpbmdzKCk7XHJcbiAgICAgICAgY29tcG9uZW50U2V0dGluZ3MuYWRkU3ViQ29tcG9uZW50KFwiU3BsaXR0ZXJXaWRnZXRcIixcIlNwbGl0dGVyV2lkZ2V0X1RyYWNlQ29uZmlndXJhdGlvblwiLCBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuTWFpblNwbGl0dGVyRGVmaW5pdGlvbklkKTtcclxuICAgICAgICByZXR1cm4gY29tcG9uZW50U2V0dGluZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRNYWluU3BsaXR0ZXJEZWZpbml0aW9uKCkgOiBhbnkge1xyXG4gICAgICAgIGxldCBzcGxpdHRlckNvbXBvbmVudFNldHRpbmdzID0gbmV3IFNwbGl0dGVyV2lkZ2V0RGF0YShTcGxpdHRlckRlZmluaXRpb24ub3JpZW50YXRpb25Ib3Jpem9udGFsKTtcclxuICAgICAgICBzcGxpdHRlckNvbXBvbmVudFNldHRpbmdzLmFkZFBhbmUoXCJUcmFjZUNvbmZpZ0RhdGFwb2ludHNXaWRnZXRcIiwgXCJUcmFjZUNvbmZpZ0RhdGFwb2ludHNXaWRnZXRcIiwgXCJcIiwgU3BsaXR0ZXJXaWRnZXREYXRhLmdldFBhbmVQZXJzaXN0aW5nRGF0YSgtMSkpO1xyXG4gICAgICAgIHNwbGl0dGVyQ29tcG9uZW50U2V0dGluZ3MuYWRkUGFuZShcIlRyYWNlQ29uZmlnVGltaW5nV2lkZ2V0XCIsIFwiVHJhY2VDb25maWdUaW1pbmdXaWRnZXRcIiwgXCJcIiwgU3BsaXR0ZXJXaWRnZXREYXRhLmdldFBhbmVQZXJzaXN0aW5nRGF0YSg1NzApKTtcclxuICAgICAgICBzcGxpdHRlckNvbXBvbmVudFNldHRpbmdzLmFkZFBhbmUoXCJUcmFjZUNvbmZpZ1RyaWdnZXJXaWRnZXRcIiwgXCJUcmFjZUNvbmZpZ1RyaWdnZXJXaWRnZXRcIiwgXCJcIiwgU3BsaXR0ZXJXaWRnZXREYXRhLmdldFBhbmVQZXJzaXN0aW5nRGF0YSg1MDApKTtcclxuICAgICAgICByZXR1cm4gc3BsaXR0ZXJDb21wb25lbnRTZXR0aW5ncztcclxuICAgIH0gXHJcbn0iXX0=