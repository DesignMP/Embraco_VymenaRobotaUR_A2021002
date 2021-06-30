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
        DefaultComponentSettings.getChartManagerWidgetDefinition = function () {
            // remove static and add component
            var componentSettings = new componentSettings_1.ComponentSettings();
            componentSettings.addSubComponent("ImageProvider", DefaultComponentSettings.ImageProviderId);
            componentSettings.addSubComponent("ChartManagerDataModel", DefaultComponentSettings.ChartManagerDataModelId);
            return componentSettings;
        };
        DefaultComponentSettings.ChartManagerDataModelId = "ChartManagerDataModel";
        DefaultComponentSettings.WidgetDefinitionId = "chartManagerWidgetDefinition";
        return DefaultComponentSettings;
    }(defaultComponentSettingsWidgetBase_1.DefaultComponentSettingsWidgetBase));
    exports.DefaultComponentSettings = DefaultComponentSettings;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdENvbXBvbmVudFNldHRpbmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0TWFuYWdlcldpZGdldC9kZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUdBO1FBQThDLDRDQUFrQztRQUFoRjs7UUFvQkEsQ0FBQztRQWRHOzs7Ozs7V0FNQTtRQUNjLHdEQUErQixHQUE3QztZQUNJLGtDQUFrQztZQUNsQyxJQUFJLGlCQUFpQixHQUFHLElBQUkscUNBQWlCLEVBQUUsQ0FBQztZQUNoRCxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsZUFBZSxFQUFFLHdCQUF3QixDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQzdGLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyx1QkFBdUIsRUFBRSx3QkFBd0IsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBQzdHLE9BQU8saUJBQWlCLENBQUM7UUFDN0IsQ0FBQztRQWpCYSxnREFBdUIsR0FBRyx1QkFBdUIsQ0FBQztRQUVsRCwyQ0FBa0IsR0FBRyw4QkFBOEIsQ0FBQztRQWdCdEUsK0JBQUM7S0FBQSxBQXBCRCxDQUE4Qyx1RUFBa0MsR0FvQi9FO0lBcEJZLDREQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCB7IERlZmF1bHRDb21wb25lbnRTZXR0aW5nc1dpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL2RlZmF1bHRDb21wb25lbnRTZXR0aW5nc1dpZGdldEJhc2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MgZXh0ZW5kcyBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NXaWRnZXRCYXNle1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsSWQgPSBcIkNoYXJ0TWFuYWdlckRhdGFNb2RlbFwiO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgV2lkZ2V0RGVmaW5pdGlvbklkID0gXCJjaGFydE1hbmFnZXJXaWRnZXREZWZpbml0aW9uXCI7XHJcblxyXG4gICAgLyoqXHJcblx0ICogUmV0dXJucyB0aGUgZGVmYXVsdCBjb21wb25lbnQgc2V0dGluZ3MgZm9yIHRoaXMgd2lkZ2V0XHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEByZXR1cm5zIHsqfVxyXG5cdCAqIEBtZW1iZXJvZiBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NcclxuXHQgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0Q2hhcnRNYW5hZ2VyV2lkZ2V0RGVmaW5pdGlvbigpIDogQ29tcG9uZW50U2V0dGluZ3Mge1xyXG4gICAgICAgIC8vIHJlbW92ZSBzdGF0aWMgYW5kIGFkZCBjb21wb25lbnRcclxuICAgICAgICBsZXQgY29tcG9uZW50U2V0dGluZ3MgPSBuZXcgQ29tcG9uZW50U2V0dGluZ3MoKTtcclxuICAgICAgICBjb21wb25lbnRTZXR0aW5ncy5hZGRTdWJDb21wb25lbnQoXCJJbWFnZVByb3ZpZGVyXCIsIERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5JbWFnZVByb3ZpZGVySWQpO1xyXG4gICAgICAgIGNvbXBvbmVudFNldHRpbmdzLmFkZFN1YkNvbXBvbmVudChcIkNoYXJ0TWFuYWdlckRhdGFNb2RlbFwiLCBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsSWQpO1xyXG4gICAgICAgIHJldHVybiBjb21wb25lbnRTZXR0aW5ncztcclxuICAgIH1cclxufSAiXX0=