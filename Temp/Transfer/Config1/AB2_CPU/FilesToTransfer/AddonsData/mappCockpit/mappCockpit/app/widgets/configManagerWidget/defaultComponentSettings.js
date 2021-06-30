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
        DefaultComponentSettings.getConfigManagerWidgetDefinition = function () {
            var componentSettings = new componentSettings_1.ComponentSettings();
            componentSettings.addSubComponent("ConfigManagerDataModel", DefaultComponentSettings.ConfigManagerDataModel);
            return componentSettings;
        };
        DefaultComponentSettings.ConfigManagerDataModel = "ConfigManagerDataModel";
        DefaultComponentSettings.WidgetDefinitionId = "configManagerWidgetDefinition";
        return DefaultComponentSettings;
    }(defaultComponentSettingsWidgetBase_1.DefaultComponentSettingsWidgetBase));
    exports.DefaultComponentSettings = DefaultComponentSettings;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdENvbXBvbmVudFNldHRpbmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NvbmZpZ01hbmFnZXJXaWRnZXQvZGVmYXVsdENvbXBvbmVudFNldHRpbmdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFJQTtRQUE4Qyw0Q0FBa0M7UUFBaEY7O1FBcUJBLENBQUM7UUFmRzs7Ozs7O1dBTUc7UUFDVyx5REFBZ0MsR0FBOUM7WUFDSSxJQUFJLGlCQUFpQixHQUFHLElBQUkscUNBQWlCLEVBQUUsQ0FBQztZQUVoRCxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsd0JBQXdCLEVBQUUsd0JBQXdCLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUU3RyxPQUFPLGlCQUFpQixDQUFDO1FBQzdCLENBQUM7UUFqQmEsK0NBQXNCLEdBQUcsd0JBQXdCLENBQUM7UUFFbEQsMkNBQWtCLEdBQUcsK0JBQStCLENBQUM7UUFpQnZFLCtCQUFDO0tBQUEsQUFyQkQsQ0FBOEMsdUVBQWtDLEdBcUIvRTtJQXJCWSw0REFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnRTZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NXaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi9kZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NXaWRnZXRCYXNlXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIERlZmF1bHRDb21wb25lbnRTZXR0aW5ncyBleHRlbmRzIERlZmF1bHRDb21wb25lbnRTZXR0aW5nc1dpZGdldEJhc2V7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBDb25maWdNYW5hZ2VyRGF0YU1vZGVsID0gXCJDb25maWdNYW5hZ2VyRGF0YU1vZGVsXCI7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBXaWRnZXREZWZpbml0aW9uSWQgPSBcImNvbmZpZ01hbmFnZXJXaWRnZXREZWZpbml0aW9uXCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IGNvbXBvbmVudCBzZXR0aW5ncyBmb3IgdGhpcyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50U2V0dGluZ3N9XHJcbiAgICAgKiBAbWVtYmVyb2YgRGVmYXVsdENvbXBvbmVudFNldHRpbmdzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0Q29uZmlnTWFuYWdlcldpZGdldERlZmluaXRpb24oKSA6IENvbXBvbmVudFNldHRpbmdzIHtcclxuICAgICAgICBsZXQgY29tcG9uZW50U2V0dGluZ3MgPSBuZXcgQ29tcG9uZW50U2V0dGluZ3MoKTtcclxuXHJcbiAgICAgICAgY29tcG9uZW50U2V0dGluZ3MuYWRkU3ViQ29tcG9uZW50KFwiQ29uZmlnTWFuYWdlckRhdGFNb2RlbFwiLCBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuQ29uZmlnTWFuYWdlckRhdGFNb2RlbCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudFNldHRpbmdzO1xyXG4gICAgfVxyXG5cclxufSJdfQ==