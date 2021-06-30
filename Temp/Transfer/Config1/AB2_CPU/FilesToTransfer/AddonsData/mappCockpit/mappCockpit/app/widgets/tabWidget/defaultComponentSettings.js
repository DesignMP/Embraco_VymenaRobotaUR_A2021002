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
        DefaultComponentSettings.getTabWidgetDefinition = function () {
            var componentSettings = new componentSettings_1.ComponentSettings();
            componentSettings.addSubComponent("TabWidgetDataModel", DefaultComponentSettings.TabWidgetDataModel);
            return componentSettings;
        };
        DefaultComponentSettings.TabWidgetDataModel = "TabWidgetDataModel";
        DefaultComponentSettings.WidgetDefinitionId = "tabWidgetDefinition";
        return DefaultComponentSettings;
    }(defaultComponentSettingsWidgetBase_1.DefaultComponentSettingsWidgetBase));
    exports.DefaultComponentSettings = DefaultComponentSettings;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdENvbXBvbmVudFNldHRpbmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RhYldpZGdldC9kZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUdBO1FBQThDLDRDQUFrQztRQUFoRjs7UUFxQkEsQ0FBQztRQWZHOzs7Ozs7V0FNRztRQUNXLCtDQUFzQixHQUFwQztZQUNJLElBQUksaUJBQWlCLEdBQUcsSUFBSSxxQ0FBaUIsRUFBRSxDQUFDO1lBRWhELGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxvQkFBb0IsRUFBRSx3QkFBd0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBRXJHLE9BQU8saUJBQWlCLENBQUM7UUFDN0IsQ0FBQztRQWpCYSwyQ0FBa0IsR0FBRyxvQkFBb0IsQ0FBQztRQUUxQywyQ0FBa0IsR0FBRyxxQkFBcUIsQ0FBQztRQWlCN0QsK0JBQUM7S0FBQSxBQXJCRCxDQUE4Qyx1RUFBa0MsR0FxQi9FO0lBckJZLDREQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCB7IERlZmF1bHRDb21wb25lbnRTZXR0aW5nc1dpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL2RlZmF1bHRDb21wb25lbnRTZXR0aW5nc1dpZGdldEJhc2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MgZXh0ZW5kcyBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NXaWRnZXRCYXNle1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgVGFiV2lkZ2V0RGF0YU1vZGVsID0gXCJUYWJXaWRnZXREYXRhTW9kZWxcIjtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIFdpZGdldERlZmluaXRpb25JZCA9IFwidGFiV2lkZ2V0RGVmaW5pdGlvblwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBjb21wb25lbnQgc2V0dGluZ3MgZm9yIHRoaXMgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudFNldHRpbmdzfVxyXG4gICAgICogQG1lbWJlcm9mIERlZmF1bHRDb21wb25lbnRTZXR0aW5nc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFRhYldpZGdldERlZmluaXRpb24oKSA6IENvbXBvbmVudFNldHRpbmdzIHtcclxuICAgICAgICBsZXQgY29tcG9uZW50U2V0dGluZ3MgPSBuZXcgQ29tcG9uZW50U2V0dGluZ3MoKTtcclxuXHJcbiAgICAgICAgY29tcG9uZW50U2V0dGluZ3MuYWRkU3ViQ29tcG9uZW50KFwiVGFiV2lkZ2V0RGF0YU1vZGVsXCIsIERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5UYWJXaWRnZXREYXRhTW9kZWwpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBjb21wb25lbnRTZXR0aW5ncztcclxuICAgIH1cclxuXHJcbn0iXX0=