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
        DefaultComponentSettings.getMethodsWidgetDefinition = function () {
            var componentSettings = new componentSettings_1.ComponentSettings();
            componentSettings.addSubComponent("SplitterWidget", DefaultComponentSettings.SplitterWidgetMethodsId, DefaultComponentSettings.MainSplitterDefinitionId);
            return componentSettings;
        };
        DefaultComponentSettings.getMainSplitterDefinition = function () {
            var splitterComponentSettings = new splitterComponentSettings_1.SplitterComponentSettings(splitterDefinition_1.SplitterDefinition.orientationVertical);
            splitterComponentSettings.addPane("MethodListWidget", DefaultComponentSettings.MethodListWidgetId, "", splitterComponentSettings_1.SplitterComponentSettings.getPaneSettings(-1, true, 38));
            splitterComponentSettings.addPane("MethodParameterListWidget", DefaultComponentSettings.MethodParameterListWidgetId, "", splitterComponentSettings_1.SplitterComponentSettings.getPaneSettings(200));
            return splitterComponentSettings;
        };
        DefaultComponentSettings.SplitterWidgetMethodsId = "SplitterWidget_Methods";
        DefaultComponentSettings.MethodListWidgetId = "MethodListWidget";
        DefaultComponentSettings.MethodParameterListWidgetId = "MethodParameterListWidget";
        DefaultComponentSettings.WidgetDefinitionId = "methodsWidgetDefinition";
        DefaultComponentSettings.MainSplitterDefinitionId = "methodsMainSplitterDefinition";
        return DefaultComponentSettings;
    }(defaultComponentSettingsWidgetBase_1.DefaultComponentSettingsWidgetBase));
    exports.DefaultComponentSettings = DefaultComponentSettings;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdENvbXBvbmVudFNldHRpbmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL21ldGhvZHNXaWRnZXQvZGVmYXVsdENvbXBvbmVudFNldHRpbmdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFLQTtRQUE4Qyw0Q0FBa0M7UUFBaEY7O1FBNEJBLENBQUM7UUFuQkc7Ozs7OztXQU1HO1FBQ1csbURBQTBCLEdBQXhDO1lBQ0ksSUFBSSxpQkFBaUIsR0FBRyxJQUFJLHFDQUFpQixFQUFFLENBQUM7WUFDaEQsaUJBQWlCLENBQUMsZUFBZSxDQUFDLGdCQUFnQixFQUFFLHdCQUF3QixDQUFDLHVCQUF1QixFQUFFLHdCQUF3QixDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDekosT0FBTyxpQkFBaUIsQ0FBQztRQUM3QixDQUFDO1FBRWEsa0RBQXlCLEdBQXZDO1lBQ0ksSUFBSSx5QkFBeUIsR0FBRyxJQUFJLHFEQUF5QixDQUFDLHVDQUFrQixDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDdEcseUJBQXlCLENBQUMsT0FBTyxDQUFDLGtCQUFrQixFQUFFLHdCQUF3QixDQUFDLGtCQUFrQixFQUFFLEVBQUUsRUFBRSxxREFBeUIsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDaEsseUJBQXlCLENBQUMsT0FBTyxDQUFDLDJCQUEyQixFQUFFLHdCQUF3QixDQUFDLDJCQUEyQixFQUFFLEVBQUUsRUFBRSxxREFBeUIsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN6SyxPQUFPLHlCQUF5QixDQUFDO1FBQ3JDLENBQUM7UUF6QmEsZ0RBQXVCLEdBQUcsd0JBQXdCLENBQUM7UUFDbkQsMkNBQWtCLEdBQUcsa0JBQWtCLENBQUM7UUFDeEMsb0RBQTJCLEdBQUcsMkJBQTJCLENBQUM7UUFFMUQsMkNBQWtCLEdBQUcseUJBQXlCLENBQUM7UUFDL0MsaURBQXdCLEdBQUcsK0JBQStCLENBQUM7UUFxQjdFLCtCQUFDO0tBQUEsQUE1QkQsQ0FBOEMsdUVBQWtDLEdBNEIvRTtJQTVCWSw0REFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTcGxpdHRlckRlZmluaXRpb24gfSBmcm9tIFwiLi4vc3BsaXR0ZXJXaWRnZXQvc3BsaXR0ZXJEZWZpbml0aW9uXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCB7IFNwbGl0dGVyQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi4vY29tbW9uL3NwbGl0dGVyQ29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgRGVmYXVsdENvbXBvbmVudFNldHRpbmdzV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vZGVmYXVsdENvbXBvbmVudFNldHRpbmdzV2lkZ2V0QmFzZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIERlZmF1bHRDb21wb25lbnRTZXR0aW5ncyBleHRlbmRzIERlZmF1bHRDb21wb25lbnRTZXR0aW5nc1dpZGdldEJhc2V7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBTcGxpdHRlcldpZGdldE1ldGhvZHNJZCA9IFwiU3BsaXR0ZXJXaWRnZXRfTWV0aG9kc1wiO1xyXG4gICAgcHVibGljIHN0YXRpYyBNZXRob2RMaXN0V2lkZ2V0SWQgPSBcIk1ldGhvZExpc3RXaWRnZXRcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgTWV0aG9kUGFyYW1ldGVyTGlzdFdpZGdldElkID0gXCJNZXRob2RQYXJhbWV0ZXJMaXN0V2lkZ2V0XCI7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBXaWRnZXREZWZpbml0aW9uSWQgPSBcIm1ldGhvZHNXaWRnZXREZWZpbml0aW9uXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIE1haW5TcGxpdHRlckRlZmluaXRpb25JZCA9IFwibWV0aG9kc01haW5TcGxpdHRlckRlZmluaXRpb25cIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgY29tcG9uZW50IHNldHRpbmdzIGZvciB0aGlzIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnRTZXR0aW5nc31cclxuICAgICAqIEBtZW1iZXJvZiBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRNZXRob2RzV2lkZ2V0RGVmaW5pdGlvbigpIDogQ29tcG9uZW50U2V0dGluZ3Mge1xyXG4gICAgICAgIGxldCBjb21wb25lbnRTZXR0aW5ncyA9IG5ldyBDb21wb25lbnRTZXR0aW5ncygpO1xyXG4gICAgICAgIGNvbXBvbmVudFNldHRpbmdzLmFkZFN1YkNvbXBvbmVudChcIlNwbGl0dGVyV2lkZ2V0XCIsIERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5TcGxpdHRlcldpZGdldE1ldGhvZHNJZCwgRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLk1haW5TcGxpdHRlckRlZmluaXRpb25JZCk7XHJcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudFNldHRpbmdzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TWFpblNwbGl0dGVyRGVmaW5pdGlvbigpIDogQ29tcG9uZW50U2V0dGluZ3Mge1xyXG4gICAgICAgIGxldCBzcGxpdHRlckNvbXBvbmVudFNldHRpbmdzID0gbmV3IFNwbGl0dGVyQ29tcG9uZW50U2V0dGluZ3MoU3BsaXR0ZXJEZWZpbml0aW9uLm9yaWVudGF0aW9uVmVydGljYWwpO1xyXG4gICAgICAgIHNwbGl0dGVyQ29tcG9uZW50U2V0dGluZ3MuYWRkUGFuZShcIk1ldGhvZExpc3RXaWRnZXRcIiwgRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLk1ldGhvZExpc3RXaWRnZXRJZCwgXCJcIiwgU3BsaXR0ZXJDb21wb25lbnRTZXR0aW5ncy5nZXRQYW5lU2V0dGluZ3MoLTEsIHRydWUsIDM4KSk7XHJcbiAgICAgICAgc3BsaXR0ZXJDb21wb25lbnRTZXR0aW5ncy5hZGRQYW5lKFwiTWV0aG9kUGFyYW1ldGVyTGlzdFdpZGdldFwiLCBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuTWV0aG9kUGFyYW1ldGVyTGlzdFdpZGdldElkLCBcIlwiLCBTcGxpdHRlckNvbXBvbmVudFNldHRpbmdzLmdldFBhbmVTZXR0aW5ncygyMDApKTtcclxuICAgICAgICByZXR1cm4gc3BsaXR0ZXJDb21wb25lbnRTZXR0aW5ncztcclxuICAgIH1cclxufSJdfQ==