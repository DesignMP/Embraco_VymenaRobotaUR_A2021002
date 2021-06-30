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
        DefaultComponentSettings.getTraceControlDefinition = function () {
            var componentSettings = new componentSettings_1.ComponentSettings();
            // Add subcomponents
            // needed for busy screen
            componentSettings.addSubComponent("CommonLayoutProvider", DefaultComponentSettings.CommonLayoutProviderId);
            // Add bindings
            componentSettings.addBinding(componentBinding_1.BindingType.COMMAND, "", "app::trace control", "trace activate", "", "activateTrace");
            componentSettings.addBinding(componentBinding_1.BindingType.COMMAND_RESPONSE, "", "app::trace control", "trace activated", "onTraceActivated", "");
            componentSettings.addBinding(componentBinding_1.BindingType.DATA, "", "app::trace control", "trace state", "onTraceStateChanged", "");
            return componentSettings;
        };
        DefaultComponentSettings.WidgetDefinitionId = "traceControlDefinition";
        return DefaultComponentSettings;
    }(defaultComponentSettingsWidgetBase_1.DefaultComponentSettingsWidgetBase));
    exports.DefaultComponentSettings = DefaultComponentSettings;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdENvbXBvbmVudFNldHRpbmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RyYWNlQ29udHJvbFdpZGdldC9kZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUlBO1FBQThDLDRDQUFrQztRQUFoRjs7UUF3QkEsQ0FBQztRQXBCRzs7Ozs7O1dBTUc7UUFDVyxrREFBeUIsR0FBdkM7WUFDSSxJQUFJLGlCQUFpQixHQUFHLElBQUkscUNBQWlCLEVBQUUsQ0FBQztZQUVoRCxvQkFBb0I7WUFDcEIseUJBQXlCO1lBQ3pCLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxzQkFBc0IsRUFBRSx3QkFBd0IsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBRTNHLGVBQWU7WUFDZixpQkFBaUIsQ0FBQyxVQUFVLENBQUMsOEJBQVcsQ0FBQyxPQUFPLEVBQUUsRUFBRSxFQUFFLG9CQUFvQixFQUFFLGdCQUFnQixFQUFFLEVBQUUsRUFBRSxlQUFlLENBQUMsQ0FBQztZQUNuSCxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsOEJBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLEVBQUUsb0JBQW9CLEVBQUUsaUJBQWlCLEVBQUUsa0JBQWtCLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDaEksaUJBQWlCLENBQUMsVUFBVSxDQUFDLDhCQUFXLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxvQkFBb0IsRUFBRSxhQUFhLEVBQUUscUJBQXFCLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDbkgsT0FBTyxpQkFBaUIsQ0FBQztRQUM3QixDQUFDO1FBckJhLDJDQUFrQixHQUFHLHdCQUF3QixDQUFDO1FBc0JoRSwrQkFBQztLQUFBLEFBeEJELENBQThDLHVFQUFrQyxHQXdCL0U7SUF4QlksNERBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgQmluZGluZ1R5cGUgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2NvbXBvbmVudEh1Yi9iaW5kaW5ncy9jb21wb25lbnRCaW5kaW5nXCI7XHJcbmltcG9ydCB7IERlZmF1bHRDb21wb25lbnRTZXR0aW5nc1dpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL2RlZmF1bHRDb21wb25lbnRTZXR0aW5nc1dpZGdldEJhc2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MgZXh0ZW5kcyBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NXaWRnZXRCYXNle1xyXG4gICAgXHJcbiAgICBwdWJsaWMgc3RhdGljIFdpZGdldERlZmluaXRpb25JZCA9IFwidHJhY2VDb250cm9sRGVmaW5pdGlvblwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBjb21wb25lbnQgc2V0dGluZ3MgZm9yIHRoaXMgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudFNldHRpbmdzfVxyXG4gICAgICogQG1lbWJlcm9mIERlZmF1bHRDb21wb25lbnRTZXR0aW5nc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFRyYWNlQ29udHJvbERlZmluaXRpb24oKSA6IENvbXBvbmVudFNldHRpbmdzIHtcclxuICAgICAgICBsZXQgY29tcG9uZW50U2V0dGluZ3MgPSBuZXcgQ29tcG9uZW50U2V0dGluZ3MoKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBBZGQgc3ViY29tcG9uZW50c1xyXG4gICAgICAgIC8vIG5lZWRlZCBmb3IgYnVzeSBzY3JlZW5cclxuICAgICAgICBjb21wb25lbnRTZXR0aW5ncy5hZGRTdWJDb21wb25lbnQoXCJDb21tb25MYXlvdXRQcm92aWRlclwiLCBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuQ29tbW9uTGF5b3V0UHJvdmlkZXJJZCk7XHJcblxyXG4gICAgICAgIC8vIEFkZCBiaW5kaW5nc1xyXG4gICAgICAgIGNvbXBvbmVudFNldHRpbmdzLmFkZEJpbmRpbmcoQmluZGluZ1R5cGUuQ09NTUFORCwgXCJcIiwgXCJhcHA6OnRyYWNlIGNvbnRyb2xcIiwgXCJ0cmFjZSBhY3RpdmF0ZVwiLCBcIlwiLCBcImFjdGl2YXRlVHJhY2VcIik7XHJcbiAgICAgICAgY29tcG9uZW50U2V0dGluZ3MuYWRkQmluZGluZyhCaW5kaW5nVHlwZS5DT01NQU5EX1JFU1BPTlNFLCBcIlwiLCBcImFwcDo6dHJhY2UgY29udHJvbFwiLCBcInRyYWNlIGFjdGl2YXRlZFwiLCBcIm9uVHJhY2VBY3RpdmF0ZWRcIiwgXCJcIik7XHJcbiAgICAgICAgY29tcG9uZW50U2V0dGluZ3MuYWRkQmluZGluZyhCaW5kaW5nVHlwZS5EQVRBLCBcIlwiLCBcImFwcDo6dHJhY2UgY29udHJvbFwiLCBcInRyYWNlIHN0YXRlXCIsIFwib25UcmFjZVN0YXRlQ2hhbmdlZFwiLCBcIlwiKTtcclxuICAgICAgICByZXR1cm4gY29tcG9uZW50U2V0dGluZ3M7XHJcbiAgICB9XHJcbn0iXX0=