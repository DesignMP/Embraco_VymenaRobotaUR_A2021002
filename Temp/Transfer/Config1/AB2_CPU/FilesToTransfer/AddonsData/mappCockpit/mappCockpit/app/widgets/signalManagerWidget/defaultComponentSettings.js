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
         * @returns {*}
         * @memberof DefaultComponentSettings
         */
        DefaultComponentSettings.getSignalManagerWidgetDefinition = function () {
            var componentSettings = new componentSettings_1.ComponentSettings();
            // add subcomponents
            componentSettings.addSubComponent("ImageProvider", DefaultComponentSettings.ImageProviderId);
            // needed for busy screen
            componentSettings.addSubComponent("CommonLayoutProvider", DefaultComponentSettings.CommonLayoutProviderId);
            componentSettings.addSubComponent("SeriesProvider", DefaultComponentSettings.SeriesProviderId);
            componentSettings.addSubComponent("SignalManagerDataModel", DefaultComponentSettings.SignalManagerDataModelId);
            componentSettings.addSubComponent("ChartManagerDataModel", DefaultComponentSettings.ChartManagerDataModelId);
            return componentSettings;
        };
        DefaultComponentSettings.SeriesProviderId = "SeriesProvider";
        DefaultComponentSettings.SignalManagerDataModelId = "SignalManagerDataModel";
        DefaultComponentSettings.ChartManagerDataModelId = "ChartManagerDataModel";
        DefaultComponentSettings.WidgetDefinitionId = "signalManagerWidgetDefinition";
        return DefaultComponentSettings;
    }(defaultComponentSettingsWidgetBase_1.DefaultComponentSettingsWidgetBase));
    exports.DefaultComponentSettings = DefaultComponentSettings;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdENvbXBvbmVudFNldHRpbmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3NpZ25hbE1hbmFnZXJXaWRnZXQvZGVmYXVsdENvbXBvbmVudFNldHRpbmdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFHQTtRQUE4Qyw0Q0FBa0M7UUFBaEY7O1FBMEJBLENBQUM7UUFsQkc7Ozs7O1dBS0E7UUFDVyx5REFBZ0MsR0FBOUM7WUFDTyxJQUFJLGlCQUFpQixHQUFHLElBQUkscUNBQWlCLEVBQUUsQ0FBQztZQUNoRCxvQkFBb0I7WUFDcEIsaUJBQWlCLENBQUMsZUFBZSxDQUFDLGVBQWUsRUFBRSx3QkFBd0IsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUM3Rix5QkFBeUI7WUFDekIsaUJBQWlCLENBQUMsZUFBZSxDQUFDLHNCQUFzQixFQUFFLHdCQUF3QixDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFFM0csaUJBQWlCLENBQUMsZUFBZSxDQUFDLGdCQUFnQixFQUFFLHdCQUF3QixDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDL0YsaUJBQWlCLENBQUMsZUFBZSxDQUFDLHdCQUF3QixFQUFFLHdCQUF3QixDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDL0csaUJBQWlCLENBQUMsZUFBZSxDQUFDLHVCQUF1QixFQUFFLHdCQUF3QixDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDN0csT0FBTyxpQkFBaUIsQ0FBQztRQUM3QixDQUFDO1FBdkJhLHlDQUFnQixHQUFHLGdCQUFnQixDQUFDO1FBQ3BDLGlEQUF3QixHQUFHLHdCQUF3QixDQUFDO1FBQ3BELGdEQUF1QixHQUFHLHVCQUF1QixDQUFDO1FBRWxELDJDQUFrQixHQUFHLCtCQUErQixDQUFDO1FBb0J2RSwrQkFBQztLQUFBLEFBMUJELENBQThDLHVFQUFrQyxHQTBCL0U7SUExQlksNERBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgRGVmYXVsdENvbXBvbmVudFNldHRpbmdzV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vZGVmYXVsdENvbXBvbmVudFNldHRpbmdzV2lkZ2V0QmFzZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIERlZmF1bHRDb21wb25lbnRTZXR0aW5ncyBleHRlbmRzIERlZmF1bHRDb21wb25lbnRTZXR0aW5nc1dpZGdldEJhc2V7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBTZXJpZXNQcm92aWRlcklkID0gXCJTZXJpZXNQcm92aWRlclwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBTaWduYWxNYW5hZ2VyRGF0YU1vZGVsSWQgPSBcIlNpZ25hbE1hbmFnZXJEYXRhTW9kZWxcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsSWQgPSBcIkNoYXJ0TWFuYWdlckRhdGFNb2RlbFwiO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgV2lkZ2V0RGVmaW5pdGlvbklkID0gXCJzaWduYWxNYW5hZ2VyV2lkZ2V0RGVmaW5pdGlvblwiO1xyXG5cclxuICAgIC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIGRlZmF1bHQgY29tcG9uZW50IHNldHRpbmdzIGZvciB0aGlzIHdpZGdldFxyXG5cdCAqXHJcblx0ICogQHJldHVybnMgeyp9XHJcblx0ICogQG1lbWJlcm9mIERlZmF1bHRDb21wb25lbnRTZXR0aW5nc1xyXG5cdCAqL1xyXG5cdHB1YmxpYyBzdGF0aWMgZ2V0U2lnbmFsTWFuYWdlcldpZGdldERlZmluaXRpb24oKTogQ29tcG9uZW50U2V0dGluZ3Mge1xyXG4gICAgICAgIGxldCBjb21wb25lbnRTZXR0aW5ncyA9IG5ldyBDb21wb25lbnRTZXR0aW5ncygpO1xyXG4gICAgICAgIC8vIGFkZCBzdWJjb21wb25lbnRzXHJcbiAgICAgICAgY29tcG9uZW50U2V0dGluZ3MuYWRkU3ViQ29tcG9uZW50KFwiSW1hZ2VQcm92aWRlclwiLCBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuSW1hZ2VQcm92aWRlcklkKTtcclxuICAgICAgICAvLyBuZWVkZWQgZm9yIGJ1c3kgc2NyZWVuXHJcbiAgICAgICAgY29tcG9uZW50U2V0dGluZ3MuYWRkU3ViQ29tcG9uZW50KFwiQ29tbW9uTGF5b3V0UHJvdmlkZXJcIiwgRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLkNvbW1vbkxheW91dFByb3ZpZGVySWQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbXBvbmVudFNldHRpbmdzLmFkZFN1YkNvbXBvbmVudChcIlNlcmllc1Byb3ZpZGVyXCIsIERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5TZXJpZXNQcm92aWRlcklkKTtcclxuICAgICAgICBjb21wb25lbnRTZXR0aW5ncy5hZGRTdWJDb21wb25lbnQoXCJTaWduYWxNYW5hZ2VyRGF0YU1vZGVsXCIsIERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5TaWduYWxNYW5hZ2VyRGF0YU1vZGVsSWQpO1xyXG4gICAgICAgIGNvbXBvbmVudFNldHRpbmdzLmFkZFN1YkNvbXBvbmVudChcIkNoYXJ0TWFuYWdlckRhdGFNb2RlbFwiLCBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsSWQpO1xyXG4gICAgICAgIHJldHVybiBjb21wb25lbnRTZXR0aW5ncztcclxuICAgIH1cclxufSJdfQ==