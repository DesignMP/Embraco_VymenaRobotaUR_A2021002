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
        DefaultComponentSettings.getChartBaseDefinition = function () {
            var componentSettings = new componentSettings_1.ComponentSettings();
            // Add bindings
            componentSettings.addBinding(componentBinding_1.BindingType.STATE, cursorStates_1.CursorStates, "app::trace view chart states", "cursor states", "cursorsStates", "updateCursorStates");
            return componentSettings;
        };
        DefaultComponentSettings.WidgetDefinitionId = "chartBaseDefinition";
        return DefaultComponentSettings;
    }(defaultComponentSettingsWidgetBase_1.DefaultComponentSettingsWidgetBase));
    exports.DefaultComponentSettings = DefaultComponentSettings;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdENvbXBvbmVudFNldHRpbmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0V2lkZ2V0L2RlZmF1bHRDb21wb25lbnRTZXR0aW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBS0E7UUFBOEMsNENBQWtDO1FBQWhGOztRQW1CQSxDQUFDO1FBZkc7Ozs7OztXQU1HO1FBQ1csK0NBQXNCLEdBQXBDO1lBQ0ksSUFBSSxpQkFBaUIsR0FBRyxJQUFJLHFDQUFpQixFQUFFLENBQUM7WUFDaEQsZUFBZTtZQUNmLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyw4QkFBVyxDQUFDLEtBQUssRUFBRSwyQkFBWSxFQUFFLDhCQUE4QixFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztZQUV0SixPQUFPLGlCQUFpQixDQUFDO1FBQzdCLENBQUM7UUFmYSwyQ0FBa0IsR0FBRyxxQkFBcUIsQ0FBQztRQWlCN0QsK0JBQUM7S0FBQSxBQW5CRCxDQUE4Qyx1RUFBa0MsR0FtQi9FO0lBbkJZLDREQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCB7IEJpbmRpbmdUeXBlIH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9jb21wb25lbnRIdWIvYmluZGluZ3MvY29tcG9uZW50QmluZGluZ1wiO1xyXG5pbXBvcnQgeyBDdXJzb3JTdGF0ZXMgfSBmcm9tIFwiLi4vY29tbW9uL3N0YXRlcy9jdXJzb3JTdGF0ZXNcIjtcclxuaW1wb3J0IHsgRGVmYXVsdENvbXBvbmVudFNldHRpbmdzV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vZGVmYXVsdENvbXBvbmVudFNldHRpbmdzV2lkZ2V0QmFzZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIERlZmF1bHRDb21wb25lbnRTZXR0aW5ncyBleHRlbmRzIERlZmF1bHRDb21wb25lbnRTZXR0aW5nc1dpZGdldEJhc2V7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBXaWRnZXREZWZpbml0aW9uSWQgPSBcImNoYXJ0QmFzZURlZmluaXRpb25cIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgY29tcG9uZW50IHNldHRpbmdzIGZvciB0aGlzIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnRTZXR0aW5nc31cclxuICAgICAqIEBtZW1iZXJvZiBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRDaGFydEJhc2VEZWZpbml0aW9uKCkgOiBDb21wb25lbnRTZXR0aW5ncyB7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudFNldHRpbmdzID0gbmV3IENvbXBvbmVudFNldHRpbmdzKCk7XHJcbiAgICAgICAgLy8gQWRkIGJpbmRpbmdzXHJcbiAgICAgICAgY29tcG9uZW50U2V0dGluZ3MuYWRkQmluZGluZyhCaW5kaW5nVHlwZS5TVEFURSwgQ3Vyc29yU3RhdGVzLCBcImFwcDo6dHJhY2UgdmlldyBjaGFydCBzdGF0ZXNcIiwgXCJjdXJzb3Igc3RhdGVzXCIsIFwiY3Vyc29yc1N0YXRlc1wiLCBcInVwZGF0ZUN1cnNvclN0YXRlc1wiKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudFNldHRpbmdzO1xyXG4gICAgfVxyXG5cclxufSJdfQ==