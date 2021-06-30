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
define(["require", "exports", "../../common/componentBase/componentSettings", "../common/defaultComponentSettingsWidgetBase"], function (require, exports, componentSettings_1, defaultComponentSettingsWidgetBase_1) {
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
        DefaultComponentSettings.getMappCockpitWidgetDefinition = function () {
            var componentSettings = new componentSettings_1.ComponentSettings();
            // add all subcomponents
            // add Image provider in the mappCockpit widget to trigger the initialization
            componentSettings.addSubComponent("ImageProvider", DefaultComponentSettings.ImageProviderId);
            // needed for disconnected screen
            componentSettings.addSubComponent("CommonLayoutProvider", DefaultComponentSettings.CommonLayoutProviderId);
            componentSettings.addSubComponent("MappCockpitDataModel", DefaultComponentSettings.MappCockpitDataModelId);
            componentSettings.addSubComponent("MainNavigationWidget", DefaultComponentSettings.MainNavigationWidgetId);
            componentSettings.addSubComponent("ComponentOverviewWidget", DefaultComponentSettings.ComponentOverviewWidgetId);
            componentSettings.addSubComponent("TraceOverviewWidget", DefaultComponentSettings.TraceOverviewWidgetId);
            componentSettings.addSubComponent("ToolsOverviewWidget", DefaultComponentSettings.ToolsOverviewWidgetId);
            componentSettings.addSubComponent("StartPageWidget", DefaultComponentSettings.StartPageWidgetId);
            componentSettings.addSubComponent("LoginWidget", DefaultComponentSettings.LoginWidgetId);
            //componentSettings.addSubComponent("DummyWidget", DefaultComponentSettings.DummyWidgetId);
            return componentSettings;
        };
        DefaultComponentSettings.MappCockpitDataModelId = "MappCockpitDataModel";
        DefaultComponentSettings.MainNavigationWidgetId = "MainNavigationWidget";
        DefaultComponentSettings.ComponentOverviewWidgetId = "ComponentOverviewWidget";
        DefaultComponentSettings.TraceOverviewWidgetId = "TraceOverviewWidget";
        DefaultComponentSettings.ToolsOverviewWidgetId = "ToolsOverviewWidget";
        DefaultComponentSettings.StartPageWidgetId = "StartPageWidget";
        DefaultComponentSettings.LoginWidgetId = "LoginWidget";
        DefaultComponentSettings.DummyWidgetId = "DummyWidget";
        DefaultComponentSettings.WidgetDefinitionId = "mappCockpitWidgetDefinition";
        return DefaultComponentSettings;
    }(defaultComponentSettingsWidgetBase_1.DefaultComponentSettingsWidgetBase));
    exports.DefaultComponentSettings = DefaultComponentSettings;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdENvbXBvbmVudFNldHRpbmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL21hcHBDb2NrcGl0V2lkZ2V0L2RlZmF1bHRDb21wb25lbnRTZXR0aW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBR0E7UUFBOEMsNENBQWtDO1FBQWhGOztRQTRDQSxDQUFDO1FBOUJHOzs7Ozs7V0FNRztRQUNXLHVEQUE4QixHQUE1QztZQUNJLElBQUksaUJBQWlCLEdBQUcsSUFBSSxxQ0FBaUIsRUFBRSxDQUFDO1lBRWhELHdCQUF3QjtZQUV4Qiw2RUFBNkU7WUFDN0UsaUJBQWlCLENBQUMsZUFBZSxDQUFDLGVBQWUsRUFBRSx3QkFBd0IsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUU3RixpQ0FBaUM7WUFDakMsaUJBQWlCLENBQUMsZUFBZSxDQUFDLHNCQUFzQixFQUFFLHdCQUF3QixDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFFM0csaUJBQWlCLENBQUMsZUFBZSxDQUFDLHNCQUFzQixFQUFFLHdCQUF3QixDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFFM0csaUJBQWlCLENBQUMsZUFBZSxDQUFDLHNCQUFzQixFQUFFLHdCQUF3QixDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFDM0csaUJBQWlCLENBQUMsZUFBZSxDQUFDLHlCQUF5QixFQUFFLHdCQUF3QixDQUFDLHlCQUF5QixDQUFDLENBQUM7WUFDakgsaUJBQWlCLENBQUMsZUFBZSxDQUFDLHFCQUFxQixFQUFFLHdCQUF3QixDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDekcsaUJBQWlCLENBQUMsZUFBZSxDQUFDLHFCQUFxQixFQUFFLHdCQUF3QixDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDekcsaUJBQWlCLENBQUMsZUFBZSxDQUFDLGlCQUFpQixFQUFFLHdCQUF3QixDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDakcsaUJBQWlCLENBQUMsZUFBZSxDQUFDLGFBQWEsRUFBRSx3QkFBd0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUN6RiwyRkFBMkY7WUFFM0YsT0FBTyxpQkFBaUIsQ0FBQztRQUM3QixDQUFDO1FBMUNhLCtDQUFzQixHQUFHLHNCQUFzQixDQUFDO1FBRWhELCtDQUFzQixHQUFHLHNCQUFzQixDQUFDO1FBQ2hELGtEQUF5QixHQUFHLHlCQUF5QixDQUFDO1FBQ3RELDhDQUFxQixHQUFHLHFCQUFxQixDQUFDO1FBQzlDLDhDQUFxQixHQUFHLHFCQUFxQixDQUFDO1FBQzlDLDBDQUFpQixHQUFHLGlCQUFpQixDQUFDO1FBQ3RDLHNDQUFhLEdBQUcsYUFBYSxDQUFDO1FBRTlCLHNDQUFhLEdBQUcsYUFBYSxDQUFDO1FBRTlCLDJDQUFrQixHQUFHLDZCQUE2QixDQUFDO1FBZ0NyRSwrQkFBQztLQUFBLEFBNUNELENBQThDLHVFQUFrQyxHQTRDL0U7SUE1Q1ksNERBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgRGVmYXVsdENvbXBvbmVudFNldHRpbmdzV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vZGVmYXVsdENvbXBvbmVudFNldHRpbmdzV2lkZ2V0QmFzZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIERlZmF1bHRDb21wb25lbnRTZXR0aW5ncyBleHRlbmRzIERlZmF1bHRDb21wb25lbnRTZXR0aW5nc1dpZGdldEJhc2V7XHJcbiAgICBwdWJsaWMgc3RhdGljIE1hcHBDb2NrcGl0RGF0YU1vZGVsSWQgPSBcIk1hcHBDb2NrcGl0RGF0YU1vZGVsXCI7XHJcbiAgICBcclxuICAgIHB1YmxpYyBzdGF0aWMgTWFpbk5hdmlnYXRpb25XaWRnZXRJZCA9IFwiTWFpbk5hdmlnYXRpb25XaWRnZXRcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgQ29tcG9uZW50T3ZlcnZpZXdXaWRnZXRJZCA9IFwiQ29tcG9uZW50T3ZlcnZpZXdXaWRnZXRcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgVHJhY2VPdmVydmlld1dpZGdldElkID0gXCJUcmFjZU92ZXJ2aWV3V2lkZ2V0XCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIFRvb2xzT3ZlcnZpZXdXaWRnZXRJZCA9IFwiVG9vbHNPdmVydmlld1dpZGdldFwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBTdGFydFBhZ2VXaWRnZXRJZCA9IFwiU3RhcnRQYWdlV2lkZ2V0XCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIExvZ2luV2lkZ2V0SWQgPSBcIkxvZ2luV2lkZ2V0XCI7XHJcbiAgICAgICAgXHJcbiAgICBwdWJsaWMgc3RhdGljIER1bW15V2lkZ2V0SWQgPSBcIkR1bW15V2lkZ2V0XCI7XHJcbiAgICBcclxuICAgIHB1YmxpYyBzdGF0aWMgV2lkZ2V0RGVmaW5pdGlvbklkID0gXCJtYXBwQ29ja3BpdFdpZGdldERlZmluaXRpb25cIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgY29tcG9uZW50IHNldHRpbmdzIGZvciB0aGlzIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnRTZXR0aW5nc31cclxuICAgICAqIEBtZW1iZXJvZiBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRNYXBwQ29ja3BpdFdpZGdldERlZmluaXRpb24oKSA6IENvbXBvbmVudFNldHRpbmdzIHtcclxuICAgICAgICBsZXQgY29tcG9uZW50U2V0dGluZ3MgPSBuZXcgQ29tcG9uZW50U2V0dGluZ3MoKTtcclxuXHJcbiAgICAgICAgLy8gYWRkIGFsbCBzdWJjb21wb25lbnRzXHJcblxyXG4gICAgICAgIC8vIGFkZCBJbWFnZSBwcm92aWRlciBpbiB0aGUgbWFwcENvY2twaXQgd2lkZ2V0IHRvIHRyaWdnZXIgdGhlIGluaXRpYWxpemF0aW9uXHJcbiAgICAgICAgY29tcG9uZW50U2V0dGluZ3MuYWRkU3ViQ29tcG9uZW50KFwiSW1hZ2VQcm92aWRlclwiLCBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuSW1hZ2VQcm92aWRlcklkKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBuZWVkZWQgZm9yIGRpc2Nvbm5lY3RlZCBzY3JlZW5cclxuICAgICAgICBjb21wb25lbnRTZXR0aW5ncy5hZGRTdWJDb21wb25lbnQoXCJDb21tb25MYXlvdXRQcm92aWRlclwiLCBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuQ29tbW9uTGF5b3V0UHJvdmlkZXJJZCk7XHJcblxyXG4gICAgICAgIGNvbXBvbmVudFNldHRpbmdzLmFkZFN1YkNvbXBvbmVudChcIk1hcHBDb2NrcGl0RGF0YU1vZGVsXCIsIERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5NYXBwQ29ja3BpdERhdGFNb2RlbElkKTtcclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgY29tcG9uZW50U2V0dGluZ3MuYWRkU3ViQ29tcG9uZW50KFwiTWFpbk5hdmlnYXRpb25XaWRnZXRcIiwgRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLk1haW5OYXZpZ2F0aW9uV2lkZ2V0SWQpO1xyXG4gICAgICAgIGNvbXBvbmVudFNldHRpbmdzLmFkZFN1YkNvbXBvbmVudChcIkNvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0XCIsIERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5Db21wb25lbnRPdmVydmlld1dpZGdldElkKTtcclxuICAgICAgICBjb21wb25lbnRTZXR0aW5ncy5hZGRTdWJDb21wb25lbnQoXCJUcmFjZU92ZXJ2aWV3V2lkZ2V0XCIsIERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5UcmFjZU92ZXJ2aWV3V2lkZ2V0SWQpO1xyXG4gICAgICAgIGNvbXBvbmVudFNldHRpbmdzLmFkZFN1YkNvbXBvbmVudChcIlRvb2xzT3ZlcnZpZXdXaWRnZXRcIiwgRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLlRvb2xzT3ZlcnZpZXdXaWRnZXRJZCk7XHJcbiAgICAgICAgY29tcG9uZW50U2V0dGluZ3MuYWRkU3ViQ29tcG9uZW50KFwiU3RhcnRQYWdlV2lkZ2V0XCIsIERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5TdGFydFBhZ2VXaWRnZXRJZCk7XHJcbiAgICAgICAgY29tcG9uZW50U2V0dGluZ3MuYWRkU3ViQ29tcG9uZW50KFwiTG9naW5XaWRnZXRcIiwgRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLkxvZ2luV2lkZ2V0SWQpOyAgICAgICAgXHJcbiAgICAgICAgLy9jb21wb25lbnRTZXR0aW5ncy5hZGRTdWJDb21wb25lbnQoXCJEdW1teVdpZGdldFwiLCBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuRHVtbXlXaWRnZXRJZCk7XHJcblxyXG4gICAgICAgIHJldHVybiBjb21wb25lbnRTZXR0aW5ncztcclxuICAgIH1cclxufSJdfQ==