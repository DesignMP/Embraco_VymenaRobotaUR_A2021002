define(["require", "exports", "../../common/componentBase/componentSettings", "../../framework/componentHub/bindings/componentBinding", "../common/states/cursorStates"], function (require, exports, componentSettings_1, componentBinding_1, cursorStates_1) {
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
        DefaultComponentSettings.getChartBaseDefinition = function () {
            var componentSettings = new componentSettings_1.ComponentSettings();
            // Add bindings
            componentSettings.addBinding(componentBinding_1.BindingType.STATE, cursorStates_1.CursorStates, "app::trace view chart states", "cursor states", "cursorsStates", "updateCursorStates");
            return componentSettings;
        };
        DefaultComponentSettings.WidgetDefinitionId = "chartBaseDefinition";
        return DefaultComponentSettings;
    }());
    exports.DefaultComponentSettings = DefaultComponentSettings;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdENvbXBvbmVudFNldHRpbmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0V2lkZ2V0L2RlZmF1bHRDb21wb25lbnRTZXR0aW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFJQTtRQUFBO1FBbUJBLENBQUM7UUFmRzs7Ozs7O1dBTUc7UUFDVywrQ0FBc0IsR0FBcEM7WUFDSSxJQUFJLGlCQUFpQixHQUFHLElBQUkscUNBQWlCLEVBQUUsQ0FBQztZQUNoRCxlQUFlO1lBQ2YsaUJBQWlCLENBQUMsVUFBVSxDQUFDLDhCQUFXLENBQUMsS0FBSyxFQUFFLDJCQUFZLEVBQUUsOEJBQThCLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1lBRXRKLE9BQU8saUJBQWlCLENBQUM7UUFDN0IsQ0FBQztRQWZhLDJDQUFrQixHQUFHLHFCQUFxQixDQUFDO1FBaUI3RCwrQkFBQztLQUFBLEFBbkJELElBbUJDO0lBbkJZLDREQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCB7IEJpbmRpbmdUeXBlIH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9jb21wb25lbnRIdWIvYmluZGluZ3MvY29tcG9uZW50QmluZGluZ1wiO1xyXG5pbXBvcnQgeyBDdXJzb3JTdGF0ZXMgfSBmcm9tIFwiLi4vY29tbW9uL3N0YXRlcy9jdXJzb3JTdGF0ZXNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3N7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBXaWRnZXREZWZpbml0aW9uSWQgPSBcImNoYXJ0QmFzZURlZmluaXRpb25cIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgY29tcG9uZW50IHNldHRpbmdzIGZvciB0aGlzIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnRTZXR0aW5nc31cclxuICAgICAqIEBtZW1iZXJvZiBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRDaGFydEJhc2VEZWZpbml0aW9uKCkgOiBDb21wb25lbnRTZXR0aW5ncyB7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudFNldHRpbmdzID0gbmV3IENvbXBvbmVudFNldHRpbmdzKCk7XHJcbiAgICAgICAgLy8gQWRkIGJpbmRpbmdzXHJcbiAgICAgICAgY29tcG9uZW50U2V0dGluZ3MuYWRkQmluZGluZyhCaW5kaW5nVHlwZS5TVEFURSwgQ3Vyc29yU3RhdGVzLCBcImFwcDo6dHJhY2UgdmlldyBjaGFydCBzdGF0ZXNcIiwgXCJjdXJzb3Igc3RhdGVzXCIsIFwiY3Vyc29yc1N0YXRlc1wiLCBcInVwZGF0ZUN1cnNvclN0YXRlc1wiKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudFNldHRpbmdzO1xyXG4gICAgfVxyXG5cclxufSJdfQ==