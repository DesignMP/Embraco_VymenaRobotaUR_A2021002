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
define(["require", "exports", "../../common/componentBase/componentSettings", "../../framework/componentHub/bindings/componentBinding", "../common/states/cursorStates", "../common/defaultComponentSettingsWidgetBase"], function (require, exports, componentSettings_1, componentBinding_1, cursorStates_1, defaultComponentSettingsWidgetBase_1) {
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
        DefaultComponentSettings.getCursorInfoWidgetDefinition = function () {
            var componentSettings = new componentSettings_1.ComponentSettings();
            componentSettings.addSubComponent("ChartManagerDataModel", DefaultComponentSettings.ChartManagerDataModelId);
            componentSettings.addSubComponent("CursorSignalsDataModel", DefaultComponentSettings.CursorSignalsDataModelId);
            // Add bindings
            componentSettings.addBinding(componentBinding_1.BindingType.STATE, cursorStates_1.CursorStates, "app::trace view chart states", "cursor states", "cursorsStates", "updateCursorStates");
            return componentSettings;
        };
        DefaultComponentSettings.ChartManagerDataModelId = "ChartManagerDataModel";
        DefaultComponentSettings.CursorSignalsDataModelId = "CursorSignalsDataModel";
        DefaultComponentSettings.WidgetDefinitionId = "CursorInfoWidgetDefinition";
        return DefaultComponentSettings;
    }(defaultComponentSettingsWidgetBase_1.DefaultComponentSettingsWidgetBase));
    exports.DefaultComponentSettings = DefaultComponentSettings;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdENvbXBvbmVudFNldHRpbmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2N1cnNvckluZm9XaWRnZXQvZGVmYXVsdENvbXBvbmVudFNldHRpbmdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFLQTtRQUE4Qyw0Q0FBa0M7UUFBaEY7O1FBMEJBLENBQUM7UUFuQkc7Ozs7OztXQU1HO1FBQ1csc0RBQTZCLEdBQTNDO1lBQ0ksSUFBSSxpQkFBaUIsR0FBRyxJQUFJLHFDQUFpQixFQUFFLENBQUM7WUFFaEQsaUJBQWlCLENBQUMsZUFBZSxDQUFDLHVCQUF1QixFQUFFLHdCQUF3QixDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDN0csaUJBQWlCLENBQUMsZUFBZSxDQUFDLHdCQUF3QixFQUFFLHdCQUF3QixDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFFL0csZUFBZTtZQUNmLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyw4QkFBVyxDQUFDLEtBQUssRUFBRSwyQkFBWSxFQUFFLDhCQUE4QixFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztZQUV0SixPQUFPLGlCQUFpQixDQUFDO1FBQzdCLENBQUM7UUF0QmEsZ0RBQXVCLEdBQUcsdUJBQXVCLENBQUM7UUFDbEQsaURBQXdCLEdBQUcsd0JBQXdCLENBQUM7UUFFcEQsMkNBQWtCLEdBQUcsNEJBQTRCLENBQUM7UUFxQnBFLCtCQUFDO0tBQUEsQUExQkQsQ0FBOEMsdUVBQWtDLEdBMEIvRTtJQTFCWSw0REFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnRTZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBCaW5kaW5nVHlwZSB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvY29tcG9uZW50SHViL2JpbmRpbmdzL2NvbXBvbmVudEJpbmRpbmdcIjtcclxuaW1wb3J0IHsgQ3Vyc29yU3RhdGVzIH0gZnJvbSBcIi4uL2NvbW1vbi9zdGF0ZXMvY3Vyc29yU3RhdGVzXCI7XHJcbmltcG9ydCB7IERlZmF1bHRDb21wb25lbnRTZXR0aW5nc1dpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL2RlZmF1bHRDb21wb25lbnRTZXR0aW5nc1dpZGdldEJhc2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MgZXh0ZW5kcyBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NXaWRnZXRCYXNle1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsSWQgPSBcIkNoYXJ0TWFuYWdlckRhdGFNb2RlbFwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBDdXJzb3JTaWduYWxzRGF0YU1vZGVsSWQgPSBcIkN1cnNvclNpZ25hbHNEYXRhTW9kZWxcIjtcclxuICAgIFxyXG4gICAgcHVibGljIHN0YXRpYyBXaWRnZXREZWZpbml0aW9uSWQgPSBcIkN1cnNvckluZm9XaWRnZXREZWZpbml0aW9uXCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IGNvbXBvbmVudCBzZXR0aW5ncyBmb3IgdGhpcyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50U2V0dGluZ3N9XHJcbiAgICAgKiBAbWVtYmVyb2YgRGVmYXVsdENvbXBvbmVudFNldHRpbmdzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0Q3Vyc29ySW5mb1dpZGdldERlZmluaXRpb24oKSA6IENvbXBvbmVudFNldHRpbmdzIHtcclxuICAgICAgICBsZXQgY29tcG9uZW50U2V0dGluZ3MgPSBuZXcgQ29tcG9uZW50U2V0dGluZ3MoKTtcclxuXHJcbiAgICAgICAgY29tcG9uZW50U2V0dGluZ3MuYWRkU3ViQ29tcG9uZW50KFwiQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsXCIsIERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5DaGFydE1hbmFnZXJEYXRhTW9kZWxJZCk7XHJcbiAgICAgICAgY29tcG9uZW50U2V0dGluZ3MuYWRkU3ViQ29tcG9uZW50KFwiQ3Vyc29yU2lnbmFsc0RhdGFNb2RlbFwiLCBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuQ3Vyc29yU2lnbmFsc0RhdGFNb2RlbElkKTtcclxuXHJcbiAgICAgICAgLy8gQWRkIGJpbmRpbmdzXHJcbiAgICAgICAgY29tcG9uZW50U2V0dGluZ3MuYWRkQmluZGluZyhCaW5kaW5nVHlwZS5TVEFURSwgQ3Vyc29yU3RhdGVzLCBcImFwcDo6dHJhY2UgdmlldyBjaGFydCBzdGF0ZXNcIiwgXCJjdXJzb3Igc3RhdGVzXCIsIFwiY3Vyc29yc1N0YXRlc1wiLCBcInVwZGF0ZUN1cnNvclN0YXRlc1wiKTtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gY29tcG9uZW50U2V0dGluZ3M7XHJcbiAgICB9XHJcblxyXG59Il19