define(["require", "exports", "../../common/componentBase/componentSettings"], function (require, exports, componentSettings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DefaultComponentSettings = /** @class */ (function () {
        function DefaultComponentSettings() {
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
            componentSettings.addSubComponent("SeriesProvider", "SeriesProvider");
            componentSettings.addSubComponent("ChartManagerDataModel", "ChartManagerDataModel");
            return componentSettings;
        };
        DefaultComponentSettings.WidgetDefinitionId = "chartViewWidgetDefinition";
        return DefaultComponentSettings;
    }());
    exports.DefaultComponentSettings = DefaultComponentSettings;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdENvbXBvbmVudFNldHRpbmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0Vmlld1dpZGdldC9kZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBRUE7UUFBQTtRQWlCQSxDQUFDO1FBYkc7Ozs7OztXQU1BO1FBQ2MscURBQTRCLEdBQTFDO1lBQ0ksSUFBSSxpQkFBaUIsR0FBRyxJQUFJLHFDQUFpQixFQUFFLENBQUM7WUFDaEQsaUJBQWlCLENBQUMsZUFBZSxDQUFDLGdCQUFnQixFQUFFLGdCQUFnQixDQUFDLENBQUM7WUFDdEUsaUJBQWlCLENBQUMsZUFBZSxDQUFDLHVCQUF1QixFQUFFLHVCQUF1QixDQUFDLENBQUM7WUFDcEYsT0FBTyxpQkFBaUIsQ0FBQztRQUM3QixDQUFDO1FBZGEsMkNBQWtCLEdBQUcsMkJBQTJCLENBQUM7UUFlbkUsK0JBQUM7S0FBQSxBQWpCRCxJQWlCQztJQWpCWSw0REFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnRTZXR0aW5nc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIERlZmF1bHRDb21wb25lbnRTZXR0aW5nc3tcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIFdpZGdldERlZmluaXRpb25JZCA9IFwiY2hhcnRWaWV3V2lkZ2V0RGVmaW5pdGlvblwiO1xyXG4gICAgXHJcbiAgICAvKipcclxuXHQgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IGNvbXBvbmVudCBzZXR0aW5ncyBmb3IgdGhpcyB3aWRnZXRcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHJldHVybnMgeyp9XHJcblx0ICogQG1lbWJlcm9mIERlZmF1bHRDb21wb25lbnRTZXR0aW5nc1xyXG5cdCAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRDaGFydFZpZXdXaWRnZXREZWZpbml0aW9uKCkgOiBDb21wb25lbnRTZXR0aW5ncyB7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudFNldHRpbmdzID0gbmV3IENvbXBvbmVudFNldHRpbmdzKCk7XHJcbiAgICAgICAgY29tcG9uZW50U2V0dGluZ3MuYWRkU3ViQ29tcG9uZW50KFwiU2VyaWVzUHJvdmlkZXJcIiwgXCJTZXJpZXNQcm92aWRlclwiKTtcclxuICAgICAgICBjb21wb25lbnRTZXR0aW5ncy5hZGRTdWJDb21wb25lbnQoXCJDaGFydE1hbmFnZXJEYXRhTW9kZWxcIiwgXCJDaGFydE1hbmFnZXJEYXRhTW9kZWxcIik7XHJcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudFNldHRpbmdzO1xyXG4gICAgfVxyXG59Il19