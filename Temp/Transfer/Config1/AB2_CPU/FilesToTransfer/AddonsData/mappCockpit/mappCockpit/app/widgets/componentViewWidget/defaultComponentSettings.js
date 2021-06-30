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
        DefaultComponentSettings.getComponentViewWidgetDefinition = function () {
            var componentSettings = new componentSettings_1.ComponentSettings();
            componentSettings.addSubComponent("SplitterWidget", DefaultComponentSettings.SplitterWidgetComponentViewId, DefaultComponentSettings.MainSplitterDefinitionId);
            return componentSettings;
        };
        DefaultComponentSettings.getMainSplitterDefinition = function () {
            var splitterComponentSettings = new splitterComponentSettings_1.SplitterComponentSettings(splitterDefinition_1.SplitterDefinition.orientationVertical);
            splitterComponentSettings.addPane("SplitterWidget", DefaultComponentSettings.SplitterWidgetTopSplitterId, DefaultComponentSettings.TopSplitterDefinitionId, splitterComponentSettings_1.SplitterComponentSettings.getPaneSettings(-1));
            splitterComponentSettings.addPane("MessagesWidget", DefaultComponentSettings.ComponentViewMessagesWidgetId, "", splitterComponentSettings_1.SplitterComponentSettings.getPaneSettings(110));
            return splitterComponentSettings;
        };
        DefaultComponentSettings.getTopSplitterDefinition = function () {
            var splitterComponentSettings = new splitterComponentSettings_1.SplitterComponentSettings(splitterDefinition_1.SplitterDefinition.orientationHorizontal);
            splitterComponentSettings.addPane("MethodsWidget", DefaultComponentSettings.MethodsWidgetId, "", splitterComponentSettings_1.SplitterComponentSettings.getPaneSettings(400));
            splitterComponentSettings.addPane("WatchablesWidget", DefaultComponentSettings.WatchablesWidgetId, "", splitterComponentSettings_1.SplitterComponentSettings.getPaneSettings(-1));
            splitterComponentSettings.addPane("ConfigManagerWidget", DefaultComponentSettings.ConfigManagerWidgetId, "", splitterComponentSettings_1.SplitterComponentSettings.getPaneSettings(750));
            return splitterComponentSettings;
        };
        DefaultComponentSettings.SplitterWidgetComponentViewId = "SplitterWidget_ComponentView";
        DefaultComponentSettings.SplitterWidgetTopSplitterId = "SplitterWidget_TopSplitter";
        DefaultComponentSettings.ComponentViewMessagesWidgetId = "ComponentViewMessagesWidget";
        DefaultComponentSettings.MethodsWidgetId = "MethodsWidget";
        DefaultComponentSettings.WatchablesWidgetId = "WatchablesWidget";
        DefaultComponentSettings.ConfigManagerWidgetId = "ConfigManagerWidget";
        DefaultComponentSettings.WidgetDefinitionId = "componentViewWidgetDefinition";
        DefaultComponentSettings.MainSplitterDefinitionId = "componentViewMainSplitterDefinition";
        DefaultComponentSettings.TopSplitterDefinitionId = "componentViewTopSplitterDefinition";
        return DefaultComponentSettings;
    }(defaultComponentSettingsWidgetBase_1.DefaultComponentSettingsWidgetBase));
    exports.DefaultComponentSettings = DefaultComponentSettings;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdENvbXBvbmVudFNldHRpbmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NvbXBvbmVudFZpZXdXaWRnZXQvZGVmYXVsdENvbXBvbmVudFNldHRpbmdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFLQTtRQUE4Qyw0Q0FBa0M7UUFBaEY7O1FBeUNBLENBQUM7UUEzQkc7Ozs7OztXQU1HO1FBQ1cseURBQWdDLEdBQTlDO1lBQ0ksSUFBSSxpQkFBaUIsR0FBRyxJQUFJLHFDQUFpQixFQUFFLENBQUM7WUFDaEQsaUJBQWlCLENBQUMsZUFBZSxDQUFDLGdCQUFnQixFQUFFLHdCQUF3QixDQUFDLDZCQUE2QixFQUFFLHdCQUF3QixDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDL0osT0FBTyxpQkFBaUIsQ0FBQztRQUM3QixDQUFDO1FBRWEsa0RBQXlCLEdBQXZDO1lBQ0ksSUFBSSx5QkFBeUIsR0FBRyxJQUFJLHFEQUF5QixDQUFDLHVDQUFrQixDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDdEcseUJBQXlCLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLHdCQUF3QixDQUFDLDJCQUEyQixFQUFFLHdCQUF3QixDQUFDLHVCQUF1QixFQUFFLHFEQUF5QixDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM00seUJBQXlCLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLHdCQUF3QixDQUFDLDZCQUE2QixFQUFFLEVBQUUsRUFBRSxxREFBeUIsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNoSyxPQUFPLHlCQUF5QixDQUFDO1FBQ3JDLENBQUM7UUFFYSxpREFBd0IsR0FBdEM7WUFDSSxJQUFJLHlCQUF5QixHQUFHLElBQUkscURBQXlCLENBQUMsdUNBQWtCLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUN4Ryx5QkFBeUIsQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLHdCQUF3QixDQUFDLGVBQWUsRUFBRSxFQUFFLEVBQUUscURBQXlCLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDakoseUJBQXlCLENBQUMsT0FBTyxDQUFDLGtCQUFrQixFQUFFLHdCQUF3QixDQUFDLGtCQUFrQixFQUFFLEVBQUUsRUFBRSxxREFBeUIsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RKLHlCQUF5QixDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSx3QkFBd0IsQ0FBQyxxQkFBcUIsRUFBRSxFQUFFLEVBQUUscURBQXlCLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDN0osT0FBTyx5QkFBeUIsQ0FBQztRQUNyQyxDQUFDO1FBdENhLHNEQUE2QixHQUFHLDhCQUE4QixDQUFDO1FBQy9ELG9EQUEyQixHQUFHLDRCQUE0QixDQUFDO1FBQzNELHNEQUE2QixHQUFHLDZCQUE2QixDQUFDO1FBQzlELHdDQUFlLEdBQUcsZUFBZSxDQUFDO1FBQ2xDLDJDQUFrQixHQUFHLGtCQUFrQixDQUFDO1FBQ3hDLDhDQUFxQixHQUFHLHFCQUFxQixDQUFDO1FBRzlDLDJDQUFrQixHQUFHLCtCQUErQixDQUFDO1FBQ3JELGlEQUF3QixHQUFHLHFDQUFxQyxDQUFDO1FBQ2pFLGdEQUF1QixHQUFHLG9DQUFvQyxDQUFDO1FBNkJqRiwrQkFBQztLQUFBLEFBekNELENBQThDLHVFQUFrQyxHQXlDL0U7SUF6Q1ksNERBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3BsaXR0ZXJEZWZpbml0aW9uIH0gZnJvbSBcIi4uL3NwbGl0dGVyV2lkZ2V0L3NwbGl0dGVyRGVmaW5pdGlvblwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnRTZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBTcGxpdHRlckNvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uL2NvbW1vbi9zcGxpdHRlckNvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCB7IERlZmF1bHRDb21wb25lbnRTZXR0aW5nc1dpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL2RlZmF1bHRDb21wb25lbnRTZXR0aW5nc1dpZGdldEJhc2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MgZXh0ZW5kcyBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NXaWRnZXRCYXNle1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgU3BsaXR0ZXJXaWRnZXRDb21wb25lbnRWaWV3SWQgPSBcIlNwbGl0dGVyV2lkZ2V0X0NvbXBvbmVudFZpZXdcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgU3BsaXR0ZXJXaWRnZXRUb3BTcGxpdHRlcklkID0gXCJTcGxpdHRlcldpZGdldF9Ub3BTcGxpdHRlclwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBDb21wb25lbnRWaWV3TWVzc2FnZXNXaWRnZXRJZCA9IFwiQ29tcG9uZW50Vmlld01lc3NhZ2VzV2lkZ2V0XCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIE1ldGhvZHNXaWRnZXRJZCA9IFwiTWV0aG9kc1dpZGdldFwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBXYXRjaGFibGVzV2lkZ2V0SWQgPSBcIldhdGNoYWJsZXNXaWRnZXRcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgQ29uZmlnTWFuYWdlcldpZGdldElkID0gXCJDb25maWdNYW5hZ2VyV2lkZ2V0XCI7XHJcblxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgV2lkZ2V0RGVmaW5pdGlvbklkID0gXCJjb21wb25lbnRWaWV3V2lkZ2V0RGVmaW5pdGlvblwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBNYWluU3BsaXR0ZXJEZWZpbml0aW9uSWQgPSBcImNvbXBvbmVudFZpZXdNYWluU3BsaXR0ZXJEZWZpbml0aW9uXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIFRvcFNwbGl0dGVyRGVmaW5pdGlvbklkID0gXCJjb21wb25lbnRWaWV3VG9wU3BsaXR0ZXJEZWZpbml0aW9uXCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IGNvbXBvbmVudCBzZXR0aW5ncyBmb3IgdGhpcyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50U2V0dGluZ3N9XHJcbiAgICAgKiBAbWVtYmVyb2YgRGVmYXVsdENvbXBvbmVudFNldHRpbmdzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0Q29tcG9uZW50Vmlld1dpZGdldERlZmluaXRpb24oKSA6IENvbXBvbmVudFNldHRpbmdzIHtcclxuICAgICAgICBsZXQgY29tcG9uZW50U2V0dGluZ3MgPSBuZXcgQ29tcG9uZW50U2V0dGluZ3MoKTtcclxuICAgICAgICBjb21wb25lbnRTZXR0aW5ncy5hZGRTdWJDb21wb25lbnQoXCJTcGxpdHRlcldpZGdldFwiLCBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuU3BsaXR0ZXJXaWRnZXRDb21wb25lbnRWaWV3SWQsIERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5NYWluU3BsaXR0ZXJEZWZpbml0aW9uSWQpO1xyXG4gICAgICAgIHJldHVybiBjb21wb25lbnRTZXR0aW5ncztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldE1haW5TcGxpdHRlckRlZmluaXRpb24oKSA6IENvbXBvbmVudFNldHRpbmdzIHtcclxuICAgICAgICBsZXQgc3BsaXR0ZXJDb21wb25lbnRTZXR0aW5ncyA9IG5ldyBTcGxpdHRlckNvbXBvbmVudFNldHRpbmdzKFNwbGl0dGVyRGVmaW5pdGlvbi5vcmllbnRhdGlvblZlcnRpY2FsKTtcclxuICAgICAgICBzcGxpdHRlckNvbXBvbmVudFNldHRpbmdzLmFkZFBhbmUoXCJTcGxpdHRlcldpZGdldFwiLCBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuU3BsaXR0ZXJXaWRnZXRUb3BTcGxpdHRlcklkLCBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuVG9wU3BsaXR0ZXJEZWZpbml0aW9uSWQsIFNwbGl0dGVyQ29tcG9uZW50U2V0dGluZ3MuZ2V0UGFuZVNldHRpbmdzKC0xKSk7XHJcbiAgICAgICAgc3BsaXR0ZXJDb21wb25lbnRTZXR0aW5ncy5hZGRQYW5lKFwiTWVzc2FnZXNXaWRnZXRcIiwgRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLkNvbXBvbmVudFZpZXdNZXNzYWdlc1dpZGdldElkLCBcIlwiLCBTcGxpdHRlckNvbXBvbmVudFNldHRpbmdzLmdldFBhbmVTZXR0aW5ncygxMTApKTtcclxuICAgICAgICByZXR1cm4gc3BsaXR0ZXJDb21wb25lbnRTZXR0aW5ncztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFRvcFNwbGl0dGVyRGVmaW5pdGlvbigpIDogQ29tcG9uZW50U2V0dGluZ3Mge1xyXG4gICAgICAgIGxldCBzcGxpdHRlckNvbXBvbmVudFNldHRpbmdzID0gbmV3IFNwbGl0dGVyQ29tcG9uZW50U2V0dGluZ3MoU3BsaXR0ZXJEZWZpbml0aW9uLm9yaWVudGF0aW9uSG9yaXpvbnRhbCk7XHJcbiAgICAgICAgc3BsaXR0ZXJDb21wb25lbnRTZXR0aW5ncy5hZGRQYW5lKFwiTWV0aG9kc1dpZGdldFwiLCBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuTWV0aG9kc1dpZGdldElkLCBcIlwiLCBTcGxpdHRlckNvbXBvbmVudFNldHRpbmdzLmdldFBhbmVTZXR0aW5ncyg0MDApKTtcclxuICAgICAgICBzcGxpdHRlckNvbXBvbmVudFNldHRpbmdzLmFkZFBhbmUoXCJXYXRjaGFibGVzV2lkZ2V0XCIsIERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5XYXRjaGFibGVzV2lkZ2V0SWQsIFwiXCIsIFNwbGl0dGVyQ29tcG9uZW50U2V0dGluZ3MuZ2V0UGFuZVNldHRpbmdzKC0xKSk7XHJcbiAgICAgICAgc3BsaXR0ZXJDb21wb25lbnRTZXR0aW5ncy5hZGRQYW5lKFwiQ29uZmlnTWFuYWdlcldpZGdldFwiLCBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuQ29uZmlnTWFuYWdlcldpZGdldElkLCBcIlwiLCBTcGxpdHRlckNvbXBvbmVudFNldHRpbmdzLmdldFBhbmVTZXR0aW5ncyg3NTApKTtcclxuICAgICAgICByZXR1cm4gc3BsaXR0ZXJDb21wb25lbnRTZXR0aW5ncztcclxuICAgIH0gXHJcbn0iXX0=