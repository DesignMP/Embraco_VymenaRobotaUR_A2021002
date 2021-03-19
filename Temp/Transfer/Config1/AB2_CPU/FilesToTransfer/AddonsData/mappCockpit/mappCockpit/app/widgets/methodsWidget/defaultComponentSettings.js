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
        DefaultComponentSettings.getMethodsWidgetDefinition = function () {
            var componentSettings = new componentSettings_1.ComponentSettings();
            componentSettings.addSubComponent("SplitterWidget", "SplitterWidget_Methods", DefaultComponentSettings.MainSplitterDefinitionId);
            return componentSettings;
        };
        DefaultComponentSettings.getMainSplitterDefinition = function () {
            var splitterComponentSettings = new splitterWidgetData_1.SplitterWidgetData(splitterDefinition_1.SplitterDefinition.orientationVertical);
            splitterComponentSettings.addPane("MethodListWidget", "MethodListWidget", "", splitterWidgetData_1.SplitterWidgetData.getPanePersistingData(-1, true, 38));
            splitterComponentSettings.addPane("MethodParameterListWidget", "MethodParameterListWidget", "", splitterWidgetData_1.SplitterWidgetData.getPanePersistingData(200));
            return splitterComponentSettings;
        };
        DefaultComponentSettings.WidgetDefinitionId = "methodsWidgetDefinition";
        DefaultComponentSettings.MainSplitterDefinitionId = "methodsMainSplitterDefinition";
        return DefaultComponentSettings;
    }());
    exports.DefaultComponentSettings = DefaultComponentSettings;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdENvbXBvbmVudFNldHRpbmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL21ldGhvZHNXaWRnZXQvZGVmYXVsdENvbXBvbmVudFNldHRpbmdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUlBO1FBQUE7UUF3QkEsQ0FBQztRQW5CRzs7Ozs7O1dBTUc7UUFDVyxtREFBMEIsR0FBeEM7WUFDSSxJQUFJLGlCQUFpQixHQUFHLElBQUkscUNBQWlCLEVBQUUsQ0FBQztZQUNoRCxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLEVBQUMsd0JBQXdCLEVBQUUsd0JBQXdCLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUNoSSxPQUFPLGlCQUFpQixDQUFDO1FBQzdCLENBQUM7UUFFYSxrREFBeUIsR0FBdkM7WUFDSSxJQUFJLHlCQUF5QixHQUFHLElBQUksdUNBQWtCLENBQUMsdUNBQWtCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUMvRix5QkFBeUIsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQUUsa0JBQWtCLEVBQUUsRUFBRSxFQUFFLHVDQUFrQixDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3RJLHlCQUF5QixDQUFDLE9BQU8sQ0FBQywyQkFBMkIsRUFBRSwyQkFBMkIsRUFBRSxFQUFFLEVBQUUsdUNBQWtCLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUMvSSxPQUFPLHlCQUF5QixDQUFDO1FBQ3JDLENBQUM7UUFyQmEsMkNBQWtCLEdBQUcseUJBQXlCLENBQUM7UUFDL0MsaURBQXdCLEdBQUcsK0JBQStCLENBQUM7UUFxQjdFLCtCQUFDO0tBQUEsQUF4QkQsSUF3QkM7SUF4QlksNERBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3BsaXR0ZXJEZWZpbml0aW9uIH0gZnJvbSBcIi4uL3NwbGl0dGVyV2lkZ2V0L3NwbGl0dGVyRGVmaW5pdGlvblwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnRTZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBTcGxpdHRlcldpZGdldERhdGEgfSBmcm9tIFwiLi4vY29tbW9uL3NwbGl0dGVyV2lkZ2V0RGF0YVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIERlZmF1bHRDb21wb25lbnRTZXR0aW5nc3tcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIFdpZGdldERlZmluaXRpb25JZCA9IFwibWV0aG9kc1dpZGdldERlZmluaXRpb25cIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgTWFpblNwbGl0dGVyRGVmaW5pdGlvbklkID0gXCJtZXRob2RzTWFpblNwbGl0dGVyRGVmaW5pdGlvblwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBjb21wb25lbnQgc2V0dGluZ3MgZm9yIHRoaXMgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudFNldHRpbmdzfVxyXG4gICAgICogQG1lbWJlcm9mIERlZmF1bHRDb21wb25lbnRTZXR0aW5nc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldE1ldGhvZHNXaWRnZXREZWZpbml0aW9uKCkgOiBDb21wb25lbnRTZXR0aW5ncyB7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudFNldHRpbmdzID0gbmV3IENvbXBvbmVudFNldHRpbmdzKCk7XHJcbiAgICAgICAgY29tcG9uZW50U2V0dGluZ3MuYWRkU3ViQ29tcG9uZW50KFwiU3BsaXR0ZXJXaWRnZXRcIixcIlNwbGl0dGVyV2lkZ2V0X01ldGhvZHNcIiwgRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLk1haW5TcGxpdHRlckRlZmluaXRpb25JZCk7XHJcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudFNldHRpbmdzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TWFpblNwbGl0dGVyRGVmaW5pdGlvbigpIDogQ29tcG9uZW50U2V0dGluZ3Mge1xyXG4gICAgICAgIGxldCBzcGxpdHRlckNvbXBvbmVudFNldHRpbmdzID0gbmV3IFNwbGl0dGVyV2lkZ2V0RGF0YShTcGxpdHRlckRlZmluaXRpb24ub3JpZW50YXRpb25WZXJ0aWNhbCk7XHJcbiAgICAgICAgc3BsaXR0ZXJDb21wb25lbnRTZXR0aW5ncy5hZGRQYW5lKFwiTWV0aG9kTGlzdFdpZGdldFwiLCBcIk1ldGhvZExpc3RXaWRnZXRcIiwgXCJcIiwgU3BsaXR0ZXJXaWRnZXREYXRhLmdldFBhbmVQZXJzaXN0aW5nRGF0YSgtMSwgdHJ1ZSwgMzgpKTtcclxuICAgICAgICBzcGxpdHRlckNvbXBvbmVudFNldHRpbmdzLmFkZFBhbmUoXCJNZXRob2RQYXJhbWV0ZXJMaXN0V2lkZ2V0XCIsIFwiTWV0aG9kUGFyYW1ldGVyTGlzdFdpZGdldFwiLCBcIlwiLCBTcGxpdHRlcldpZGdldERhdGEuZ2V0UGFuZVBlcnNpc3RpbmdEYXRhKDIwMCkpO1xyXG4gICAgICAgIHJldHVybiBzcGxpdHRlckNvbXBvbmVudFNldHRpbmdzO1xyXG4gICAgfVxyXG59Il19