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
        DefaultComponentSettings.getTraceConfigurationViewDefinition = function () {
            var componentSettings = new componentSettings_1.ComponentSettings();
            componentSettings.addSubComponent("SplitterWidget", DefaultComponentSettings.SplitterWidgetTraceConfigurationViewId, DefaultComponentSettings.MainSplitterDefinitionId);
            return componentSettings;
        };
        DefaultComponentSettings.getMainSplitterDefinition = function () {
            var splitterComponentSettings = new splitterComponentSettings_1.SplitterComponentSettings(splitterDefinition_1.SplitterDefinition.orientationVertical);
            splitterComponentSettings.addPane("TraceControlWidget", DefaultComponentSettings.TraceControlWidgetId, "", splitterComponentSettings_1.SplitterComponentSettings.getPaneSettings(40, false));
            splitterComponentSettings.addPane("TraceConfigurationWidget", DefaultComponentSettings.TraceConfigurationWidgetId, "", splitterComponentSettings_1.SplitterComponentSettings.getPaneSettings(-1, true));
            splitterComponentSettings.addPane("MessagesWidget", DefaultComponentSettings.TraceConfigurationMessagesWidgetId, "", splitterComponentSettings_1.SplitterComponentSettings.getPaneSettings(110));
            return splitterComponentSettings;
        };
        DefaultComponentSettings.SplitterWidgetTraceConfigurationViewId = "SplitterWidget_TraceConfigurationView";
        DefaultComponentSettings.TraceControlWidgetId = "TraceControlWidget";
        DefaultComponentSettings.TraceConfigurationWidgetId = "TraceConfigurationWidget";
        DefaultComponentSettings.TraceConfigurationMessagesWidgetId = "TraceConfigurationMessagesWidget";
        DefaultComponentSettings.WidgetDefinitionId = "traceConfigurationViewDefinition";
        DefaultComponentSettings.MainSplitterDefinitionId = "traceConfigurationViewMainSplitterDefinition";
        DefaultComponentSettings.InnerSplitterDefinitionId = "traceConfigurationViewInnerSplitterDefinition";
        return DefaultComponentSettings;
    }(defaultComponentSettingsWidgetBase_1.DefaultComponentSettingsWidgetBase));
    exports.DefaultComponentSettings = DefaultComponentSettings;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdENvbXBvbmVudFNldHRpbmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RyYWNlQ29uZmlndXJhdGlvblZpZXdXaWRnZXQvZGVmYXVsdENvbXBvbmVudFNldHRpbmdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFLQTtRQUE4Qyw0Q0FBa0M7UUFBaEY7O1FBZ0NBLENBQUM7UUFwQkc7Ozs7OztXQU1HO1FBQ1csNERBQW1DLEdBQWpEO1lBQ0ksSUFBSSxpQkFBaUIsR0FBRyxJQUFJLHFDQUFpQixFQUFFLENBQUM7WUFDaEQsaUJBQWlCLENBQUMsZUFBZSxDQUFDLGdCQUFnQixFQUFFLHdCQUF3QixDQUFDLHNDQUFzQyxFQUFFLHdCQUF3QixDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDeEssT0FBTyxpQkFBaUIsQ0FBQztRQUM3QixDQUFDO1FBRWEsa0RBQXlCLEdBQXZDO1lBQ0ksSUFBSSx5QkFBeUIsR0FBRyxJQUFJLHFEQUF5QixDQUFDLHVDQUFrQixDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDdEcseUJBQXlCLENBQUMsT0FBTyxDQUFDLG9CQUFvQixFQUFFLHdCQUF3QixDQUFDLG9CQUFvQixFQUFFLEVBQUUsRUFBRSxxREFBeUIsQ0FBQyxlQUFlLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDaksseUJBQXlCLENBQUMsT0FBTyxDQUFDLDBCQUEwQixFQUFFLHdCQUF3QixDQUFDLDBCQUEwQixFQUFFLEVBQUUsRUFBRSxxREFBeUIsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM1Syx5QkFBeUIsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsd0JBQXdCLENBQUMsa0NBQWtDLEVBQUUsRUFBRSxFQUFFLHFEQUF5QixDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3JLLE9BQU8seUJBQXlCLENBQUM7UUFDckMsQ0FBQztRQTdCYSwrREFBc0MsR0FBRyx1Q0FBdUMsQ0FBQztRQUNqRiw2Q0FBb0IsR0FBRyxvQkFBb0IsQ0FBQztRQUM1QyxtREFBMEIsR0FBRywwQkFBMEIsQ0FBQztRQUN4RCwyREFBa0MsR0FBRyxrQ0FBa0MsQ0FBQztRQUV4RSwyQ0FBa0IsR0FBRyxrQ0FBa0MsQ0FBQztRQUV4RCxpREFBd0IsR0FBRyw4Q0FBOEMsQ0FBQztRQUMxRSxrREFBeUIsR0FBRywrQ0FBK0MsQ0FBQztRQXNCOUYsK0JBQUM7S0FBQSxBQWhDRCxDQUE4Qyx1RUFBa0MsR0FnQy9FO0lBaENZLDREQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNwbGl0dGVyRGVmaW5pdGlvbiB9IGZyb20gXCIuLi9zcGxpdHRlcldpZGdldC9zcGxpdHRlckRlZmluaXRpb25cIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgU3BsaXR0ZXJDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuLi9jb21tb24vc3BsaXR0ZXJDb21wb25lbnRTZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NXaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi9kZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NXaWRnZXRCYXNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRGVmYXVsdENvbXBvbmVudFNldHRpbmdzIGV4dGVuZHMgRGVmYXVsdENvbXBvbmVudFNldHRpbmdzV2lkZ2V0QmFzZXtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIFNwbGl0dGVyV2lkZ2V0VHJhY2VDb25maWd1cmF0aW9uVmlld0lkID0gXCJTcGxpdHRlcldpZGdldF9UcmFjZUNvbmZpZ3VyYXRpb25WaWV3XCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIFRyYWNlQ29udHJvbFdpZGdldElkID0gXCJUcmFjZUNvbnRyb2xXaWRnZXRcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgVHJhY2VDb25maWd1cmF0aW9uV2lkZ2V0SWQgPSBcIlRyYWNlQ29uZmlndXJhdGlvbldpZGdldFwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBUcmFjZUNvbmZpZ3VyYXRpb25NZXNzYWdlc1dpZGdldElkID0gXCJUcmFjZUNvbmZpZ3VyYXRpb25NZXNzYWdlc1dpZGdldFwiO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgV2lkZ2V0RGVmaW5pdGlvbklkID0gXCJ0cmFjZUNvbmZpZ3VyYXRpb25WaWV3RGVmaW5pdGlvblwiO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgTWFpblNwbGl0dGVyRGVmaW5pdGlvbklkID0gXCJ0cmFjZUNvbmZpZ3VyYXRpb25WaWV3TWFpblNwbGl0dGVyRGVmaW5pdGlvblwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBJbm5lclNwbGl0dGVyRGVmaW5pdGlvbklkID0gXCJ0cmFjZUNvbmZpZ3VyYXRpb25WaWV3SW5uZXJTcGxpdHRlckRlZmluaXRpb25cIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgY29tcG9uZW50IHNldHRpbmdzIGZvciB0aGlzIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnRTZXR0aW5nc31cclxuICAgICAqIEBtZW1iZXJvZiBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRUcmFjZUNvbmZpZ3VyYXRpb25WaWV3RGVmaW5pdGlvbigpIDogQ29tcG9uZW50U2V0dGluZ3Mge1xyXG4gICAgICAgIGxldCBjb21wb25lbnRTZXR0aW5ncyA9IG5ldyBDb21wb25lbnRTZXR0aW5ncygpO1xyXG4gICAgICAgIGNvbXBvbmVudFNldHRpbmdzLmFkZFN1YkNvbXBvbmVudChcIlNwbGl0dGVyV2lkZ2V0XCIsIERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5TcGxpdHRlcldpZGdldFRyYWNlQ29uZmlndXJhdGlvblZpZXdJZCwgRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLk1haW5TcGxpdHRlckRlZmluaXRpb25JZCk7XHJcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudFNldHRpbmdzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TWFpblNwbGl0dGVyRGVmaW5pdGlvbigpIDogYW55IHtcclxuICAgICAgICBsZXQgc3BsaXR0ZXJDb21wb25lbnRTZXR0aW5ncyA9IG5ldyBTcGxpdHRlckNvbXBvbmVudFNldHRpbmdzKFNwbGl0dGVyRGVmaW5pdGlvbi5vcmllbnRhdGlvblZlcnRpY2FsKTtcclxuICAgICAgICBzcGxpdHRlckNvbXBvbmVudFNldHRpbmdzLmFkZFBhbmUoXCJUcmFjZUNvbnRyb2xXaWRnZXRcIiwgRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLlRyYWNlQ29udHJvbFdpZGdldElkLCBcIlwiLCBTcGxpdHRlckNvbXBvbmVudFNldHRpbmdzLmdldFBhbmVTZXR0aW5ncyg0MCwgZmFsc2UpKTtcclxuICAgICAgICBzcGxpdHRlckNvbXBvbmVudFNldHRpbmdzLmFkZFBhbmUoXCJUcmFjZUNvbmZpZ3VyYXRpb25XaWRnZXRcIiwgRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLlRyYWNlQ29uZmlndXJhdGlvbldpZGdldElkLCBcIlwiLCBTcGxpdHRlckNvbXBvbmVudFNldHRpbmdzLmdldFBhbmVTZXR0aW5ncygtMSwgdHJ1ZSkpO1xyXG4gICAgICAgIHNwbGl0dGVyQ29tcG9uZW50U2V0dGluZ3MuYWRkUGFuZShcIk1lc3NhZ2VzV2lkZ2V0XCIsIERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5UcmFjZUNvbmZpZ3VyYXRpb25NZXNzYWdlc1dpZGdldElkLCBcIlwiLCBTcGxpdHRlckNvbXBvbmVudFNldHRpbmdzLmdldFBhbmVTZXR0aW5ncygxMTApKTtcclxuICAgICAgICByZXR1cm4gc3BsaXR0ZXJDb21wb25lbnRTZXR0aW5ncztcclxuICAgIH1cclxufSJdfQ==