define(["require", "exports", "../../common/componentBase/componentSettings", "../../framework/componentHub/bindings/componentBinding"], function (require, exports, componentSettings_1, componentBinding_1) {
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
        DefaultComponentSettings.getTraceConfigurationTimingDefinition = function () {
            var componentSettings = new componentSettings_1.ComponentSettings();
            // Add bindings
            componentSettings.addBinding(componentBinding_1.BindingType.DATA, "", "app::trace configuration", "trace timing parameters", "initializeTraceTimingParameters", "");
            return componentSettings;
        };
        DefaultComponentSettings.WidgetDefinitionId = "traceConfigurationTimingDefinition";
        return DefaultComponentSettings;
    }());
    exports.DefaultComponentSettings = DefaultComponentSettings;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdENvbXBvbmVudFNldHRpbmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RyYWNlQ29uZmlnVGltaW5nV2lkZ2V0L2RlZmF1bHRDb21wb25lbnRTZXR0aW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFHQTtRQUFBO1FBbUJBLENBQUM7UUFmRzs7Ozs7O1dBTUc7UUFDVyw4REFBcUMsR0FBbkQ7WUFDSSxJQUFJLGlCQUFpQixHQUFHLElBQUkscUNBQWlCLEVBQUUsQ0FBQztZQUVoRCxlQUFlO1lBQ2YsaUJBQWlCLENBQUMsVUFBVSxDQUFDLDhCQUFXLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSwwQkFBMEIsRUFBRSx5QkFBeUIsRUFBRSxpQ0FBaUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUVqSixPQUFPLGlCQUFpQixDQUFDO1FBQzdCLENBQUM7UUFoQmEsMkNBQWtCLEdBQUcsb0NBQW9DLENBQUM7UUFpQjVFLCtCQUFDO0tBQUEsQUFuQkQsSUFtQkM7SUFuQlksNERBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgQmluZGluZ1R5cGUgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2NvbXBvbmVudEh1Yi9iaW5kaW5ncy9jb21wb25lbnRCaW5kaW5nXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRGVmYXVsdENvbXBvbmVudFNldHRpbmdze1xyXG4gICAgXHJcbiAgICBwdWJsaWMgc3RhdGljIFdpZGdldERlZmluaXRpb25JZCA9IFwidHJhY2VDb25maWd1cmF0aW9uVGltaW5nRGVmaW5pdGlvblwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBjb21wb25lbnQgc2V0dGluZ3MgZm9yIHRoaXMgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudFNldHRpbmdzfVxyXG4gICAgICogQG1lbWJlcm9mIERlZmF1bHRDb21wb25lbnRTZXR0aW5nc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFRyYWNlQ29uZmlndXJhdGlvblRpbWluZ0RlZmluaXRpb24oKSA6IENvbXBvbmVudFNldHRpbmdzIHtcclxuICAgICAgICBsZXQgY29tcG9uZW50U2V0dGluZ3MgPSBuZXcgQ29tcG9uZW50U2V0dGluZ3MoKTtcclxuXHJcbiAgICAgICAgLy8gQWRkIGJpbmRpbmdzXHJcbiAgICAgICAgY29tcG9uZW50U2V0dGluZ3MuYWRkQmluZGluZyhCaW5kaW5nVHlwZS5EQVRBLCBcIlwiLCBcImFwcDo6dHJhY2UgY29uZmlndXJhdGlvblwiLCBcInRyYWNlIHRpbWluZyBwYXJhbWV0ZXJzXCIsIFwiaW5pdGlhbGl6ZVRyYWNlVGltaW5nUGFyYW1ldGVyc1wiLCBcIlwiKTtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gY29tcG9uZW50U2V0dGluZ3M7XHJcbiAgICB9XHJcbn0iXX0=