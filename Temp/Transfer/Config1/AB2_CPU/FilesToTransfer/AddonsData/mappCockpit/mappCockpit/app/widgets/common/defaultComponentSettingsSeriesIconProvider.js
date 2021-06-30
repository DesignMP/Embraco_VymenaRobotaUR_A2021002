define(["require", "exports", "../../common/componentBase/componentSettings"], function (require, exports, componentSettings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DefaultComponentSettingsSeriesIconProvider = /** @class */ (function () {
        function DefaultComponentSettingsSeriesIconProvider() {
        }
        /**
         * Returns the default component settings for this provider
         *
         * @static
         * @returns {ComponentSettings}
         * @memberof DefaultComponentSettings
         */
        DefaultComponentSettingsSeriesIconProvider.getSeriesIconProviderDefinition = function () {
            var componentSettings = new componentSettings_1.ComponentSettings();
            // add subcomponents
            componentSettings.addSubComponent("ImageProvider", DefaultComponentSettingsSeriesIconProvider.ImageProviderId);
            return componentSettings;
        };
        DefaultComponentSettingsSeriesIconProvider.ImageProviderId = "ImageProvider";
        DefaultComponentSettingsSeriesIconProvider.ProviderDefinitionId = "seriesIconProviderDefinition";
        return DefaultComponentSettingsSeriesIconProvider;
    }());
    exports.DefaultComponentSettingsSeriesIconProvider = DefaultComponentSettingsSeriesIconProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdENvbXBvbmVudFNldHRpbmdzU2VyaWVzSWNvblByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NvbW1vbi9kZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NTZXJpZXNJY29uUHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBRUE7UUFBQTtRQW9CQSxDQUFDO1FBZkc7Ozs7OztXQU1HO1FBQ1csMEVBQStCLEdBQTdDO1lBQ0ksSUFBSSxpQkFBaUIsR0FBRyxJQUFJLHFDQUFpQixFQUFFLENBQUM7WUFFaEQsb0JBQW9CO1lBQ3BCLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxlQUFlLEVBQUUsMENBQTBDLENBQUMsZUFBZSxDQUFDLENBQUM7WUFFL0csT0FBTyxpQkFBaUIsQ0FBQztRQUM3QixDQUFDO1FBakJhLDBEQUFlLEdBQUcsZUFBZSxDQUFDO1FBQ2xDLCtEQUFvQixHQUFHLDhCQUE4QixDQUFDO1FBaUJ4RSxpREFBQztLQUFBLEFBcEJELElBb0JDO0lBcEJZLGdHQUEwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRGVmYXVsdENvbXBvbmVudFNldHRpbmdzU2VyaWVzSWNvblByb3ZpZGVye1xyXG4gICAgICAgIFxyXG4gICAgcHVibGljIHN0YXRpYyBJbWFnZVByb3ZpZGVySWQgPSBcIkltYWdlUHJvdmlkZXJcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgUHJvdmlkZXJEZWZpbml0aW9uSWQgPSBcInNlcmllc0ljb25Qcm92aWRlckRlZmluaXRpb25cIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgY29tcG9uZW50IHNldHRpbmdzIGZvciB0aGlzIHByb3ZpZGVyXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudFNldHRpbmdzfVxyXG4gICAgICogQG1lbWJlcm9mIERlZmF1bHRDb21wb25lbnRTZXR0aW5nc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFNlcmllc0ljb25Qcm92aWRlckRlZmluaXRpb24oKSA6IENvbXBvbmVudFNldHRpbmdzIHtcclxuICAgICAgICBsZXQgY29tcG9uZW50U2V0dGluZ3MgPSBuZXcgQ29tcG9uZW50U2V0dGluZ3MoKTtcclxuXHJcbiAgICAgICAgLy8gYWRkIHN1YmNvbXBvbmVudHNcclxuICAgICAgICBjb21wb25lbnRTZXR0aW5ncy5hZGRTdWJDb21wb25lbnQoXCJJbWFnZVByb3ZpZGVyXCIsIERlZmF1bHRDb21wb25lbnRTZXR0aW5nc1Nlcmllc0ljb25Qcm92aWRlci5JbWFnZVByb3ZpZGVySWQpO1xyXG5cclxuICAgICAgICByZXR1cm4gY29tcG9uZW50U2V0dGluZ3M7XHJcbiAgICB9XHJcbn0iXX0=