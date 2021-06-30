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
         * @private
         * @returns {*}
         * @memberof DefaultComponentSettings
         */
        DefaultComponentSettings.getChartViewWidgetDefinition = function () {
            var componentSettings = new componentSettings_1.ComponentSettings();
            componentSettings.addSubComponent("ImageProvider", DefaultComponentSettings.ImageProviderId);
            componentSettings.addSubComponent("ChartManagerDataModel", DefaultComponentSettings.ChartManagerDataModelId);
            return componentSettings;
        };
        DefaultComponentSettings.ChartManagerDataModelId = "ChartManagerDataModel";
        DefaultComponentSettings.WidgetDefinitionId = "chartViewWidgetDefinition";
        return DefaultComponentSettings;
    }(defaultComponentSettingsWidgetBase_1.DefaultComponentSettingsWidgetBase));
    exports.DefaultComponentSettings = DefaultComponentSettings;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdENvbXBvbmVudFNldHRpbmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0Vmlld1dpZGdldC9kZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUdBO1FBQThDLDRDQUFrQztRQUFoRjs7UUFtQkEsQ0FBQztRQWJHOzs7Ozs7V0FNQTtRQUNjLHFEQUE0QixHQUExQztZQUNJLElBQUksaUJBQWlCLEdBQUcsSUFBSSxxQ0FBaUIsRUFBRSxDQUFDO1lBQ2hELGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxlQUFlLEVBQUUsd0JBQXdCLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDN0YsaUJBQWlCLENBQUMsZUFBZSxDQUFDLHVCQUF1QixFQUFFLHdCQUF3QixDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDN0csT0FBTyxpQkFBaUIsQ0FBQztRQUM3QixDQUFDO1FBaEJhLGdEQUF1QixHQUFHLHVCQUF1QixDQUFDO1FBRWxELDJDQUFrQixHQUFHLDJCQUEyQixDQUFDO1FBZW5FLCtCQUFDO0tBQUEsQUFuQkQsQ0FBOEMsdUVBQWtDLEdBbUIvRTtJQW5CWSw0REFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnRTZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NXaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi9kZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NXaWRnZXRCYXNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRGVmYXVsdENvbXBvbmVudFNldHRpbmdzIGV4dGVuZHMgRGVmYXVsdENvbXBvbmVudFNldHRpbmdzV2lkZ2V0QmFzZXtcclxuICAgIFxyXG4gICAgcHVibGljIHN0YXRpYyBDaGFydE1hbmFnZXJEYXRhTW9kZWxJZCA9IFwiQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsXCI7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBXaWRnZXREZWZpbml0aW9uSWQgPSBcImNoYXJ0Vmlld1dpZGdldERlZmluaXRpb25cIjtcclxuICAgIFxyXG4gICAgLyoqXHJcblx0ICogUmV0dXJucyB0aGUgZGVmYXVsdCBjb21wb25lbnQgc2V0dGluZ3MgZm9yIHRoaXMgd2lkZ2V0XHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEByZXR1cm5zIHsqfVxyXG5cdCAqIEBtZW1iZXJvZiBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NcclxuXHQgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0Q2hhcnRWaWV3V2lkZ2V0RGVmaW5pdGlvbigpIDogQ29tcG9uZW50U2V0dGluZ3Mge1xyXG4gICAgICAgIGxldCBjb21wb25lbnRTZXR0aW5ncyA9IG5ldyBDb21wb25lbnRTZXR0aW5ncygpO1xyXG4gICAgICAgIGNvbXBvbmVudFNldHRpbmdzLmFkZFN1YkNvbXBvbmVudChcIkltYWdlUHJvdmlkZXJcIiwgRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLkltYWdlUHJvdmlkZXJJZCk7XHJcbiAgICAgICAgY29tcG9uZW50U2V0dGluZ3MuYWRkU3ViQ29tcG9uZW50KFwiQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsXCIsIERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5DaGFydE1hbmFnZXJEYXRhTW9kZWxJZCk7XHJcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudFNldHRpbmdzO1xyXG4gICAgfVxyXG59Il19