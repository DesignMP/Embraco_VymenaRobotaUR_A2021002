define(["require", "exports", "../../../common/componentBase/componentSettings"], function (require, exports, componentSettings_1) {
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
        DefaultComponentSettings.getSeriesProviderDefinition = function () {
            var componentSettings = new componentSettings_1.ComponentSettings();
            // Add sub components
            componentSettings.addSubComponent("SeriesIconProvider", DefaultComponentSettings.SeriesIconProviderId);
            return componentSettings;
        };
        DefaultComponentSettings.SeriesIconProviderId = "SeriesIconProvider";
        DefaultComponentSettings.SeriesProviderDefinitionId = "seriesProviderDefinition";
        return DefaultComponentSettings;
    }());
    exports.DefaultComponentSettings = DefaultComponentSettings;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdENvbXBvbmVudFNldHRpbmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvY29tbW9uL3Nlcmllc1Byb3ZpZGVyL2RlZmF1bHRDb21wb25lbnRTZXR0aW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFHQTtRQUFBO1FBcUJBLENBQUM7UUFmRzs7Ozs7O1dBTUc7UUFDVyxvREFBMkIsR0FBekM7WUFDSSxJQUFJLGlCQUFpQixHQUFHLElBQUkscUNBQWlCLEVBQUUsQ0FBQztZQUNoRCxxQkFBcUI7WUFDckIsaUJBQWlCLENBQUMsZUFBZSxDQUFDLG9CQUFvQixFQUFFLHdCQUF3QixDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFFdkcsT0FBTyxpQkFBaUIsQ0FBQztRQUM3QixDQUFDO1FBakJhLDZDQUFvQixHQUFHLG9CQUFvQixDQUFDO1FBRTVDLG1EQUEwQixHQUFHLDBCQUEwQixDQUFDO1FBaUIxRSwrQkFBQztLQUFBLEFBckJELElBcUJDO0lBckJZLDREQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIERlZmF1bHRDb21wb25lbnRTZXR0aW5ncyB7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBTZXJpZXNJY29uUHJvdmlkZXJJZCA9IFwiU2VyaWVzSWNvblByb3ZpZGVyXCI7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBTZXJpZXNQcm92aWRlckRlZmluaXRpb25JZCA9IFwic2VyaWVzUHJvdmlkZXJEZWZpbml0aW9uXCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IGNvbXBvbmVudCBzZXR0aW5ncyBmb3IgdGhpcyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50U2V0dGluZ3N9XHJcbiAgICAgKiBAbWVtYmVyb2YgRGVmYXVsdENvbXBvbmVudFNldHRpbmdzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0U2VyaWVzUHJvdmlkZXJEZWZpbml0aW9uKCkgOiBDb21wb25lbnRTZXR0aW5ncyB7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudFNldHRpbmdzID0gbmV3IENvbXBvbmVudFNldHRpbmdzKCk7XHJcbiAgICAgICAgLy8gQWRkIHN1YiBjb21wb25lbnRzXHJcbiAgICAgICAgY29tcG9uZW50U2V0dGluZ3MuYWRkU3ViQ29tcG9uZW50KFwiU2VyaWVzSWNvblByb3ZpZGVyXCIsIERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5TZXJpZXNJY29uUHJvdmlkZXJJZCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudFNldHRpbmdzO1xyXG4gICAgfVxyXG5cclxufSJdfQ==