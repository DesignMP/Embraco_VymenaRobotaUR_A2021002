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
        DefaultComponentSettings.getTraceControlDefinition = function () {
            var componentSettings = new componentSettings_1.ComponentSettings();
            // Add bindings
            componentSettings.addBinding(componentBinding_1.BindingType.COMMAND, "", "app::trace control", "trace activate", "", "activateTrace");
            componentSettings.addBinding(componentBinding_1.BindingType.COMMAND_RESPONSE, "", "app::trace control", "trace activated", "onTraceActivated", "");
            componentSettings.addBinding(componentBinding_1.BindingType.DATA, "", "app::trace control", "trace state", "onTraceStateChanged", "");
            return componentSettings;
        };
        DefaultComponentSettings.WidgetDefinitionId = "traceControlDefinition";
        return DefaultComponentSettings;
    }());
    exports.DefaultComponentSettings = DefaultComponentSettings;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdENvbXBvbmVudFNldHRpbmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RyYWNlQ29udHJvbFdpZGdldC9kZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBR0E7UUFBQTtRQW9CQSxDQUFDO1FBaEJHOzs7Ozs7V0FNRztRQUNXLGtEQUF5QixHQUF2QztZQUNJLElBQUksaUJBQWlCLEdBQUcsSUFBSSxxQ0FBaUIsRUFBRSxDQUFDO1lBRWhELGVBQWU7WUFDZixpQkFBaUIsQ0FBQyxVQUFVLENBQUMsOEJBQVcsQ0FBQyxPQUFPLEVBQUUsRUFBRSxFQUFFLG9CQUFvQixFQUFFLGdCQUFnQixFQUFFLEVBQUUsRUFBRSxlQUFlLENBQUMsQ0FBQztZQUNuSCxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsOEJBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLEVBQUUsb0JBQW9CLEVBQUUsaUJBQWlCLEVBQUUsa0JBQWtCLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDaEksaUJBQWlCLENBQUMsVUFBVSxDQUFDLDhCQUFXLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxvQkFBb0IsRUFBRSxhQUFhLEVBQUUscUJBQXFCLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDbkgsT0FBTyxpQkFBaUIsQ0FBQztRQUM3QixDQUFDO1FBakJhLDJDQUFrQixHQUFHLHdCQUF3QixDQUFDO1FBa0JoRSwrQkFBQztLQUFBLEFBcEJELElBb0JDO0lBcEJZLDREQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCB7IEJpbmRpbmdUeXBlIH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9jb21wb25lbnRIdWIvYmluZGluZ3MvY29tcG9uZW50QmluZGluZ1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIERlZmF1bHRDb21wb25lbnRTZXR0aW5nc3tcclxuICAgIFxyXG4gICAgcHVibGljIHN0YXRpYyBXaWRnZXREZWZpbml0aW9uSWQgPSBcInRyYWNlQ29udHJvbERlZmluaXRpb25cIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgY29tcG9uZW50IHNldHRpbmdzIGZvciB0aGlzIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnRTZXR0aW5nc31cclxuICAgICAqIEBtZW1iZXJvZiBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRUcmFjZUNvbnRyb2xEZWZpbml0aW9uKCkgOiBDb21wb25lbnRTZXR0aW5ncyB7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudFNldHRpbmdzID0gbmV3IENvbXBvbmVudFNldHRpbmdzKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gQWRkIGJpbmRpbmdzXHJcbiAgICAgICAgY29tcG9uZW50U2V0dGluZ3MuYWRkQmluZGluZyhCaW5kaW5nVHlwZS5DT01NQU5ELCBcIlwiLCBcImFwcDo6dHJhY2UgY29udHJvbFwiLCBcInRyYWNlIGFjdGl2YXRlXCIsIFwiXCIsIFwiYWN0aXZhdGVUcmFjZVwiKTtcclxuICAgICAgICBjb21wb25lbnRTZXR0aW5ncy5hZGRCaW5kaW5nKEJpbmRpbmdUeXBlLkNPTU1BTkRfUkVTUE9OU0UsIFwiXCIsIFwiYXBwOjp0cmFjZSBjb250cm9sXCIsIFwidHJhY2UgYWN0aXZhdGVkXCIsIFwib25UcmFjZUFjdGl2YXRlZFwiLCBcIlwiKTtcclxuICAgICAgICBjb21wb25lbnRTZXR0aW5ncy5hZGRCaW5kaW5nKEJpbmRpbmdUeXBlLkRBVEEsIFwiXCIsIFwiYXBwOjp0cmFjZSBjb250cm9sXCIsIFwidHJhY2Ugc3RhdGVcIiwgXCJvblRyYWNlU3RhdGVDaGFuZ2VkXCIsIFwiXCIpO1xyXG4gICAgICAgIHJldHVybiBjb21wb25lbnRTZXR0aW5ncztcclxuICAgIH1cclxufSJdfQ==