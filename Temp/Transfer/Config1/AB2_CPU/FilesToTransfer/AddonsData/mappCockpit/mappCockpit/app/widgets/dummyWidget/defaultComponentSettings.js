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
        DefaultComponentSettings.getDummyWidgetDefinition = function () {
            var componentSettings = new componentSettings_1.ComponentSettings();
            //componentSettings.addSubComponent("SplitterWidget", DefaultComponentSettings.mainWidgetId, DefaultComponentSettings.DummySplitterDefinitionId);
            return componentSettings;
        };
        DefaultComponentSettings.mainWidgetId = "DummySplitterId3";
        DefaultComponentSettings.WidgetDefinitionId = "dummyWidgetDefinition3";
        DefaultComponentSettings.DummySplitterDefinitionId = "dummySplitterDefinition3";
        return DefaultComponentSettings;
    }(defaultComponentSettingsWidgetBase_1.DefaultComponentSettingsWidgetBase));
    exports.DefaultComponentSettings = DefaultComponentSettings;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdENvbXBvbmVudFNldHRpbmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2R1bW15V2lkZ2V0L2RlZmF1bHRDb21wb25lbnRTZXR0aW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBS0E7UUFBOEMsNENBQWtDO1FBQWhGOztRQWlDQSxDQUFDO1FBM0JHOzs7Ozs7V0FNQTtRQUNjLGlEQUF3QixHQUF0QztZQUNJLElBQUksaUJBQWlCLEdBQUcsSUFBSSxxQ0FBaUIsRUFBRSxDQUFDO1lBQ2hELGlKQUFpSjtZQUNqSixPQUFPLGlCQUFpQixDQUFDO1FBQzdCLENBQUM7UUFmYSxxQ0FBWSxHQUFHLGtCQUFrQixDQUFDO1FBQ2xDLDJDQUFrQixHQUFHLHdCQUF3QixDQUFDO1FBQzlDLGtEQUF5QixHQUFHLDBCQUEwQixDQUFDO1FBNkJ6RSwrQkFBQztLQUFBLEFBakNELENBQThDLHVFQUFrQyxHQWlDL0U7SUFqQ1ksNERBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgU3BsaXR0ZXJEZWZpbml0aW9uIH0gZnJvbSBcIi4uL3NwbGl0dGVyV2lkZ2V0L3NwbGl0dGVyRGVmaW5pdGlvblwiO1xyXG5pbXBvcnQgeyBTcGxpdHRlckNvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uL2NvbW1vbi9zcGxpdHRlckNvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCB7IERlZmF1bHRDb21wb25lbnRTZXR0aW5nc1dpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL2RlZmF1bHRDb21wb25lbnRTZXR0aW5nc1dpZGdldEJhc2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MgZXh0ZW5kcyBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NXaWRnZXRCYXNle1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgbWFpbldpZGdldElkID0gXCJEdW1teVNwbGl0dGVySWQzXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIFdpZGdldERlZmluaXRpb25JZCA9IFwiZHVtbXlXaWRnZXREZWZpbml0aW9uM1wiO1xyXG4gICAgcHVibGljIHN0YXRpYyBEdW1teVNwbGl0dGVyRGVmaW5pdGlvbklkID0gXCJkdW1teVNwbGl0dGVyRGVmaW5pdGlvbjNcIjtcclxuICAgIFxyXG4gICAgLyoqXHJcblx0ICogUmV0dXJucyB0aGUgZGVmYXVsdCBjb21wb25lbnQgc2V0dGluZ3MgZm9yIHRoaXMgd2lkZ2V0XHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEByZXR1cm5zIHsqfVxyXG5cdCAqIEBtZW1iZXJvZiBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NcclxuXHQgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0RHVtbXlXaWRnZXREZWZpbml0aW9uKCkgOiBDb21wb25lbnRTZXR0aW5ncyB7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudFNldHRpbmdzID0gbmV3IENvbXBvbmVudFNldHRpbmdzKCk7XHJcbiAgICAgICAgLy9jb21wb25lbnRTZXR0aW5ncy5hZGRTdWJDb21wb25lbnQoXCJTcGxpdHRlcldpZGdldFwiLCBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MubWFpbldpZGdldElkLCBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuRHVtbXlTcGxpdHRlckRlZmluaXRpb25JZCk7XHJcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudFNldHRpbmdzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBwZXJzaXN0aW5nIGRhdGEgZm9yIHNwbGl0dGVyXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgRGVmYXVsdENvbXBvbmVudFNldHRpbmdzXHJcbiAgICAgKi9cclxuICAgIC8qcHVibGljIHN0YXRpYyBnZXREdW1teVNwbGl0dGVyRGVmaW5pdGlvbigpIDogQ29tcG9uZW50U2V0dGluZ3Mge1xyXG4gICAgICAgIGxldCBzcGxpdHRlckNvbXBvbmVudFNldHRpbmdzID0gbmV3IFNwbGl0dGVyV2lkZ2V0RGF0YShTcGxpdHRlckRlZmluaXRpb24ub3JpZW50YXRpb25WZXJ0aWNhbCk7XHJcbiAgICAgICAgc3BsaXR0ZXJDb21wb25lbnRTZXR0aW5ncy5hZGRQYW5lKFwiQ29tcG9uZW50T3ZlcnZpZXdXaWRnZXRcIiwgXCJDb21wb25lbnRPdmVydmlld1dpZGdldElkXCIsIFwiXCIsIFNwbGl0dGVyV2lkZ2V0RGF0YS5nZXRQYW5lUGVyc2lzdGluZ0RhdGEoLTEpKTtcclxuICAgICAgICBzcGxpdHRlckNvbXBvbmVudFNldHRpbmdzLmFkZFBhbmUoXCJUcmFjZU92ZXJ2aWV3V2lkZ2V0XCIsIFwiVHJhY2VPdmVydmlld1dpZGdldElkXCIsIFwiXCIsIFNwbGl0dGVyV2lkZ2V0RGF0YS5nZXRQYW5lUGVyc2lzdGluZ0RhdGEoMjUwKSk7XHJcbiAgICAgICAgc3BsaXR0ZXJDb21wb25lbnRTZXR0aW5ncy5hZGRQYW5lKFwiVG9vbHNPdmVydmlld1dpZGdldFwiLCBcIlRvb2xzT3ZlcnZpZXdXaWRnZXRJZFwiLCBcIlwiLCBTcGxpdHRlcldpZGdldERhdGEuZ2V0UGFuZVBlcnNpc3RpbmdEYXRhKDI1MCkpO1xyXG4gICAgICAgIHJldHVybiBzcGxpdHRlckNvbXBvbmVudFNldHRpbmdzO1xyXG4gICAgfSAqL1xyXG59Il19