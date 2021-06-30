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
        DefaultComponentSettings.getTraceConfigurationTimingDefinition = function () {
            var componentSettings = new componentSettings_1.ComponentSettings();
            // Add bindings
            componentSettings.addBinding(componentBinding_1.BindingType.DATA, "", "app::trace configuration", "trace timing parameters", "initializeTraceTimingParameters", "");
            return componentSettings;
        };
        DefaultComponentSettings.WidgetDefinitionId = "traceConfigurationTimingDefinition";
        return DefaultComponentSettings;
    }(defaultComponentSettingsWidgetBase_1.DefaultComponentSettingsWidgetBase));
    exports.DefaultComponentSettings = DefaultComponentSettings;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdENvbXBvbmVudFNldHRpbmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RyYWNlQ29uZmlnVGltaW5nV2lkZ2V0L2RlZmF1bHRDb21wb25lbnRTZXR0aW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBSUE7UUFBOEMsNENBQWtDO1FBQWhGOztRQW1CQSxDQUFDO1FBZkc7Ozs7OztXQU1HO1FBQ1csOERBQXFDLEdBQW5EO1lBQ0ksSUFBSSxpQkFBaUIsR0FBRyxJQUFJLHFDQUFpQixFQUFFLENBQUM7WUFFaEQsZUFBZTtZQUNmLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyw4QkFBVyxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsMEJBQTBCLEVBQUUseUJBQXlCLEVBQUUsaUNBQWlDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFakosT0FBTyxpQkFBaUIsQ0FBQztRQUM3QixDQUFDO1FBaEJhLDJDQUFrQixHQUFHLG9DQUFvQyxDQUFDO1FBaUI1RSwrQkFBQztLQUFBLEFBbkJELENBQThDLHVFQUFrQyxHQW1CL0U7SUFuQlksNERBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgQmluZGluZ1R5cGUgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2NvbXBvbmVudEh1Yi9iaW5kaW5ncy9jb21wb25lbnRCaW5kaW5nXCI7XHJcbmltcG9ydCB7IERlZmF1bHRDb21wb25lbnRTZXR0aW5nc1dpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL2RlZmF1bHRDb21wb25lbnRTZXR0aW5nc1dpZGdldEJhc2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MgZXh0ZW5kcyBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NXaWRnZXRCYXNle1xyXG4gICAgXHJcbiAgICBwdWJsaWMgc3RhdGljIFdpZGdldERlZmluaXRpb25JZCA9IFwidHJhY2VDb25maWd1cmF0aW9uVGltaW5nRGVmaW5pdGlvblwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBjb21wb25lbnQgc2V0dGluZ3MgZm9yIHRoaXMgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudFNldHRpbmdzfVxyXG4gICAgICogQG1lbWJlcm9mIERlZmF1bHRDb21wb25lbnRTZXR0aW5nc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFRyYWNlQ29uZmlndXJhdGlvblRpbWluZ0RlZmluaXRpb24oKSA6IENvbXBvbmVudFNldHRpbmdzIHtcclxuICAgICAgICBsZXQgY29tcG9uZW50U2V0dGluZ3MgPSBuZXcgQ29tcG9uZW50U2V0dGluZ3MoKTtcclxuXHJcbiAgICAgICAgLy8gQWRkIGJpbmRpbmdzXHJcbiAgICAgICAgY29tcG9uZW50U2V0dGluZ3MuYWRkQmluZGluZyhCaW5kaW5nVHlwZS5EQVRBLCBcIlwiLCBcImFwcDo6dHJhY2UgY29uZmlndXJhdGlvblwiLCBcInRyYWNlIHRpbWluZyBwYXJhbWV0ZXJzXCIsIFwiaW5pdGlhbGl6ZVRyYWNlVGltaW5nUGFyYW1ldGVyc1wiLCBcIlwiKTtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gY29tcG9uZW50U2V0dGluZ3M7XHJcbiAgICB9XHJcbn0iXX0=