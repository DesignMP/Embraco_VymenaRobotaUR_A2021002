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
        DefaultComponentSettings.getTraceConfigurationTriggerDefinition = function () {
            var componentSettings = new componentSettings_1.ComponentSettings();
            // Add bindings
            componentSettings.addBinding(componentBinding_1.BindingType.DATA, "", "app::trace configuration", "available data points", "initializeAvailableDataPoints", "");
            componentSettings.addBinding(componentBinding_1.BindingType.DATA, "", "app::trace configuration", "trace start trigger info", "initializeTraceStartTriggerInfo", "");
            return componentSettings;
        };
        DefaultComponentSettings.WidgetDefinitionId = "traceConfigurationTriggerDefinition";
        return DefaultComponentSettings;
    }());
    exports.DefaultComponentSettings = DefaultComponentSettings;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdENvbXBvbmVudFNldHRpbmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RyYWNlQ29uZmlnVHJpZ2dlcldpZGdldC9kZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBR0E7UUFBQTtRQW9CQSxDQUFDO1FBaEJHOzs7Ozs7V0FNRztRQUNXLCtEQUFzQyxHQUFwRDtZQUNJLElBQUksaUJBQWlCLEdBQUcsSUFBSSxxQ0FBaUIsRUFBRSxDQUFDO1lBRWhELGVBQWU7WUFDZixpQkFBaUIsQ0FBQyxVQUFVLENBQUMsOEJBQVcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLDBCQUEwQixFQUFFLHVCQUF1QixFQUFFLCtCQUErQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzdJLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyw4QkFBVyxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsMEJBQTBCLEVBQUUsMEJBQTBCLEVBQUUsaUNBQWlDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFbEosT0FBTyxpQkFBaUIsQ0FBQztRQUM3QixDQUFDO1FBakJhLDJDQUFrQixHQUFHLHFDQUFxQyxDQUFDO1FBa0I3RSwrQkFBQztLQUFBLEFBcEJELElBb0JDO0lBcEJZLDREQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCB7IEJpbmRpbmdUeXBlIH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9jb21wb25lbnRIdWIvYmluZGluZ3MvY29tcG9uZW50QmluZGluZ1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIERlZmF1bHRDb21wb25lbnRTZXR0aW5nc3tcclxuICAgIFxyXG4gICAgcHVibGljIHN0YXRpYyBXaWRnZXREZWZpbml0aW9uSWQgPSBcInRyYWNlQ29uZmlndXJhdGlvblRyaWdnZXJEZWZpbml0aW9uXCI7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBjb21wb25lbnQgc2V0dGluZ3MgZm9yIHRoaXMgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudFNldHRpbmdzfVxyXG4gICAgICogQG1lbWJlcm9mIERlZmF1bHRDb21wb25lbnRTZXR0aW5nc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFRyYWNlQ29uZmlndXJhdGlvblRyaWdnZXJEZWZpbml0aW9uKCkgOiBDb21wb25lbnRTZXR0aW5ncyB7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudFNldHRpbmdzID0gbmV3IENvbXBvbmVudFNldHRpbmdzKCk7XHJcblxyXG4gICAgICAgIC8vIEFkZCBiaW5kaW5nc1xyXG4gICAgICAgIGNvbXBvbmVudFNldHRpbmdzLmFkZEJpbmRpbmcoQmluZGluZ1R5cGUuREFUQSwgXCJcIiwgXCJhcHA6OnRyYWNlIGNvbmZpZ3VyYXRpb25cIiwgXCJhdmFpbGFibGUgZGF0YSBwb2ludHNcIiwgXCJpbml0aWFsaXplQXZhaWxhYmxlRGF0YVBvaW50c1wiLCBcIlwiKTtcclxuICAgICAgICBjb21wb25lbnRTZXR0aW5ncy5hZGRCaW5kaW5nKEJpbmRpbmdUeXBlLkRBVEEsIFwiXCIsIFwiYXBwOjp0cmFjZSBjb25maWd1cmF0aW9uXCIsIFwidHJhY2Ugc3RhcnQgdHJpZ2dlciBpbmZvXCIsIFwiaW5pdGlhbGl6ZVRyYWNlU3RhcnRUcmlnZ2VySW5mb1wiLCBcIlwiKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudFNldHRpbmdzO1xyXG4gICAgfVxyXG59Il19