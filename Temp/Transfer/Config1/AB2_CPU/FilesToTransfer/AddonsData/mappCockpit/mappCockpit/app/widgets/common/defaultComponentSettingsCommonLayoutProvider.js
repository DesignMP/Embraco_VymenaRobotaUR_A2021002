define(["require", "exports", "../../common/componentBase/componentSettings"], function (require, exports, componentSettings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DefaultComponentSettingsCommonLayoutProvider = /** @class */ (function () {
        function DefaultComponentSettingsCommonLayoutProvider() {
        }
        /**
         * Returns the default component settings for this widget
         *
         * @static
         * @returns {ComponentSettings}
         * @memberof DefaultComponentSettings
         */
        DefaultComponentSettingsCommonLayoutProvider.getCommonLayoutProviderDefinition = function () {
            var componentSettings = new componentSettings_1.ComponentSettings();
            // add subcomponents
            componentSettings.addSubComponent("ImageProvider", DefaultComponentSettingsCommonLayoutProvider.ImageProviderId);
            return componentSettings;
        };
        DefaultComponentSettingsCommonLayoutProvider.ImageProviderId = "ImageProvider";
        DefaultComponentSettingsCommonLayoutProvider.ProviderDefinitionId = "commonLayoutProviderDefinition";
        return DefaultComponentSettingsCommonLayoutProvider;
    }());
    exports.DefaultComponentSettingsCommonLayoutProvider = DefaultComponentSettingsCommonLayoutProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdENvbXBvbmVudFNldHRpbmdzQ29tbW9uTGF5b3V0UHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY29tbW9uL2RlZmF1bHRDb21wb25lbnRTZXR0aW5nc0NvbW1vbkxheW91dFByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUVBO1FBQUE7UUFvQkEsQ0FBQztRQWZHOzs7Ozs7V0FNRztRQUNXLDhFQUFpQyxHQUEvQztZQUNJLElBQUksaUJBQWlCLEdBQUcsSUFBSSxxQ0FBaUIsRUFBRSxDQUFDO1lBRWhELG9CQUFvQjtZQUNwQixpQkFBaUIsQ0FBQyxlQUFlLENBQUMsZUFBZSxFQUFFLDRDQUE0QyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBRWpILE9BQU8saUJBQWlCLENBQUM7UUFDN0IsQ0FBQztRQWpCYSw0REFBZSxHQUFHLGVBQWUsQ0FBQztRQUNsQyxpRUFBb0IsR0FBRyxnQ0FBZ0MsQ0FBQztRQWlCMUUsbURBQUM7S0FBQSxBQXBCRCxJQW9CQztJQXBCWSxvR0FBNEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnRTZXR0aW5nc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIERlZmF1bHRDb21wb25lbnRTZXR0aW5nc0NvbW1vbkxheW91dFByb3ZpZGVye1xyXG4gICAgICAgIFxyXG4gICAgcHVibGljIHN0YXRpYyBJbWFnZVByb3ZpZGVySWQgPSBcIkltYWdlUHJvdmlkZXJcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgUHJvdmlkZXJEZWZpbml0aW9uSWQgPSBcImNvbW1vbkxheW91dFByb3ZpZGVyRGVmaW5pdGlvblwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBjb21wb25lbnQgc2V0dGluZ3MgZm9yIHRoaXMgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudFNldHRpbmdzfVxyXG4gICAgICogQG1lbWJlcm9mIERlZmF1bHRDb21wb25lbnRTZXR0aW5nc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldENvbW1vbkxheW91dFByb3ZpZGVyRGVmaW5pdGlvbigpIDogQ29tcG9uZW50U2V0dGluZ3Mge1xyXG4gICAgICAgIGxldCBjb21wb25lbnRTZXR0aW5ncyA9IG5ldyBDb21wb25lbnRTZXR0aW5ncygpO1xyXG5cclxuICAgICAgICAvLyBhZGQgc3ViY29tcG9uZW50c1xyXG4gICAgICAgIGNvbXBvbmVudFNldHRpbmdzLmFkZFN1YkNvbXBvbmVudChcIkltYWdlUHJvdmlkZXJcIiwgRGVmYXVsdENvbXBvbmVudFNldHRpbmdzQ29tbW9uTGF5b3V0UHJvdmlkZXIuSW1hZ2VQcm92aWRlcklkKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudFNldHRpbmdzO1xyXG4gICAgfVxyXG59Il19