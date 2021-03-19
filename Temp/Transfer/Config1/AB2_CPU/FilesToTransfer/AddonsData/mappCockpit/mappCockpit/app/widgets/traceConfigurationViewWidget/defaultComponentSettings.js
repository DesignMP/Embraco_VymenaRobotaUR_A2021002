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
        DefaultComponentSettings.getTraceConfigurationViewDefinition = function () {
            var componentSettings = new componentSettings_1.ComponentSettings();
            componentSettings.addSubComponent("SplitterWidget", "SplitterWidget_TraceConfigurationView", DefaultComponentSettings.MainSplitterDefinitionId);
            return componentSettings;
        };
        DefaultComponentSettings.getMainSplitterDefinition = function () {
            var splitterComponentSettings = new splitterWidgetData_1.SplitterWidgetData(splitterDefinition_1.SplitterDefinition.orientationVertical);
            splitterComponentSettings.addPane("TraceControlWidget", "TraceControlWidget", "", splitterWidgetData_1.SplitterWidgetData.getPanePersistingData(40, false));
            splitterComponentSettings.addPane("TraceConfigurationWidget", "TraceConfigurationWidget", "", splitterWidgetData_1.SplitterWidgetData.getPanePersistingData(-1, true));
            splitterComponentSettings.addPane("MessagesWidget", "TraceConfigurationMessagesWidget", "", splitterWidgetData_1.SplitterWidgetData.getPanePersistingData(110));
            return splitterComponentSettings;
        };
        DefaultComponentSettings.WidgetDefinitionId = "traceConfigurationViewDefinition";
        DefaultComponentSettings.MainSplitterDefinitionId = "traceConfigurationViewMainSplitterDefinition";
        DefaultComponentSettings.InnerSplitterDefinitionId = "traceConfigurationViewInnerSplitterDefinition";
        return DefaultComponentSettings;
    }());
    exports.DefaultComponentSettings = DefaultComponentSettings;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdENvbXBvbmVudFNldHRpbmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RyYWNlQ29uZmlndXJhdGlvblZpZXdXaWRnZXQvZGVmYXVsdENvbXBvbmVudFNldHRpbmdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUlBO1FBQUE7UUEyQkEsQ0FBQztRQXBCRzs7Ozs7O1dBTUc7UUFDVyw0REFBbUMsR0FBakQ7WUFDSSxJQUFJLGlCQUFpQixHQUFHLElBQUkscUNBQWlCLEVBQUUsQ0FBQztZQUNoRCxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLEVBQUMsdUNBQXVDLEVBQUUsd0JBQXdCLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUMvSSxPQUFPLGlCQUFpQixDQUFDO1FBQzdCLENBQUM7UUFFYSxrREFBeUIsR0FBdkM7WUFDSSxJQUFJLHlCQUF5QixHQUFHLElBQUksdUNBQWtCLENBQUMsdUNBQWtCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUMvRix5QkFBeUIsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLEVBQUUsb0JBQW9CLEVBQUUsRUFBRSxFQUFFLHVDQUFrQixDQUFDLHFCQUFxQixDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3ZJLHlCQUF5QixDQUFDLE9BQU8sQ0FBQywwQkFBMEIsRUFBRSwwQkFBMEIsRUFBRSxFQUFFLEVBQUUsdUNBQWtCLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNsSix5QkFBeUIsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsa0NBQWtDLEVBQUUsRUFBRSxFQUFFLHVDQUFrQixDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDM0ksT0FBTyx5QkFBeUIsQ0FBQztRQUNyQyxDQUFDO1FBeEJhLDJDQUFrQixHQUFHLGtDQUFrQyxDQUFDO1FBRXhELGlEQUF3QixHQUFHLDhDQUE4QyxDQUFDO1FBQzFFLGtEQUF5QixHQUFHLCtDQUErQyxDQUFDO1FBc0I5RiwrQkFBQztLQUFBLEFBM0JELElBMkJDO0lBM0JZLDREQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNwbGl0dGVyRGVmaW5pdGlvbiB9IGZyb20gXCIuLi9zcGxpdHRlcldpZGdldC9zcGxpdHRlckRlZmluaXRpb25cIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgU3BsaXR0ZXJXaWRnZXREYXRhIH0gZnJvbSBcIi4uL2NvbW1vbi9zcGxpdHRlcldpZGdldERhdGFcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3N7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBXaWRnZXREZWZpbml0aW9uSWQgPSBcInRyYWNlQ29uZmlndXJhdGlvblZpZXdEZWZpbml0aW9uXCI7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBNYWluU3BsaXR0ZXJEZWZpbml0aW9uSWQgPSBcInRyYWNlQ29uZmlndXJhdGlvblZpZXdNYWluU3BsaXR0ZXJEZWZpbml0aW9uXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIElubmVyU3BsaXR0ZXJEZWZpbml0aW9uSWQgPSBcInRyYWNlQ29uZmlndXJhdGlvblZpZXdJbm5lclNwbGl0dGVyRGVmaW5pdGlvblwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBjb21wb25lbnQgc2V0dGluZ3MgZm9yIHRoaXMgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudFNldHRpbmdzfVxyXG4gICAgICogQG1lbWJlcm9mIERlZmF1bHRDb21wb25lbnRTZXR0aW5nc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFRyYWNlQ29uZmlndXJhdGlvblZpZXdEZWZpbml0aW9uKCkgOiBDb21wb25lbnRTZXR0aW5ncyB7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudFNldHRpbmdzID0gbmV3IENvbXBvbmVudFNldHRpbmdzKCk7XHJcbiAgICAgICAgY29tcG9uZW50U2V0dGluZ3MuYWRkU3ViQ29tcG9uZW50KFwiU3BsaXR0ZXJXaWRnZXRcIixcIlNwbGl0dGVyV2lkZ2V0X1RyYWNlQ29uZmlndXJhdGlvblZpZXdcIiwgRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLk1haW5TcGxpdHRlckRlZmluaXRpb25JZCk7XHJcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudFNldHRpbmdzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TWFpblNwbGl0dGVyRGVmaW5pdGlvbigpIDogYW55IHtcclxuICAgICAgICBsZXQgc3BsaXR0ZXJDb21wb25lbnRTZXR0aW5ncyA9IG5ldyBTcGxpdHRlcldpZGdldERhdGEoU3BsaXR0ZXJEZWZpbml0aW9uLm9yaWVudGF0aW9uVmVydGljYWwpO1xyXG4gICAgICAgIHNwbGl0dGVyQ29tcG9uZW50U2V0dGluZ3MuYWRkUGFuZShcIlRyYWNlQ29udHJvbFdpZGdldFwiLCBcIlRyYWNlQ29udHJvbFdpZGdldFwiLCBcIlwiLCBTcGxpdHRlcldpZGdldERhdGEuZ2V0UGFuZVBlcnNpc3RpbmdEYXRhKDQwLCBmYWxzZSkpO1xyXG4gICAgICAgIHNwbGl0dGVyQ29tcG9uZW50U2V0dGluZ3MuYWRkUGFuZShcIlRyYWNlQ29uZmlndXJhdGlvbldpZGdldFwiLCBcIlRyYWNlQ29uZmlndXJhdGlvbldpZGdldFwiLCBcIlwiLCBTcGxpdHRlcldpZGdldERhdGEuZ2V0UGFuZVBlcnNpc3RpbmdEYXRhKC0xLCB0cnVlKSk7XHJcbiAgICAgICAgc3BsaXR0ZXJDb21wb25lbnRTZXR0aW5ncy5hZGRQYW5lKFwiTWVzc2FnZXNXaWRnZXRcIiwgXCJUcmFjZUNvbmZpZ3VyYXRpb25NZXNzYWdlc1dpZGdldFwiLCBcIlwiLCBTcGxpdHRlcldpZGdldERhdGEuZ2V0UGFuZVBlcnNpc3RpbmdEYXRhKDExMCkpO1xyXG4gICAgICAgIHJldHVybiBzcGxpdHRlckNvbXBvbmVudFNldHRpbmdzO1xyXG4gICAgfVxyXG59Il19