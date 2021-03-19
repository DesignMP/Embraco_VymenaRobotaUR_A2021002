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
        DefaultComponentSettings.getChartManagerWidgetDefinition = function () {
            // remove static and add component
            var componentSettings = new componentSettings_1.ComponentSettings();
            componentSettings.addSubComponent("SeriesProvider", "SeriesProvider");
            componentSettings.addSubComponent("ChartManagerDataModel", "ChartManagerDataModel");
            return componentSettings;
        };
        DefaultComponentSettings.WidgetDefinitionId = "chartManagerWidgetDefinition";
        return DefaultComponentSettings;
    }());
    exports.DefaultComponentSettings = DefaultComponentSettings;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdENvbXBvbmVudFNldHRpbmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0TWFuYWdlcldpZGdldC9kZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBRUE7UUFBQTtRQWtCQSxDQUFDO1FBZEc7Ozs7OztXQU1BO1FBQ2Msd0RBQStCLEdBQTdDO1lBQ0ksa0NBQWtDO1lBQ2xDLElBQUksaUJBQWlCLEdBQUcsSUFBSSxxQ0FBaUIsRUFBRSxDQUFDO1lBQ2hELGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3RFLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyx1QkFBdUIsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO1lBQ3BGLE9BQU8saUJBQWlCLENBQUM7UUFDN0IsQ0FBQztRQWZhLDJDQUFrQixHQUFHLDhCQUE4QixDQUFDO1FBZ0J0RSwrQkFBQztLQUFBLEFBbEJELElBa0JDO0lBbEJZLDREQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRGVmYXVsdENvbXBvbmVudFNldHRpbmdze1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgV2lkZ2V0RGVmaW5pdGlvbklkID0gXCJjaGFydE1hbmFnZXJXaWRnZXREZWZpbml0aW9uXCI7XHJcblxyXG4gICAgLyoqXHJcblx0ICogUmV0dXJucyB0aGUgZGVmYXVsdCBjb21wb25lbnQgc2V0dGluZ3MgZm9yIHRoaXMgd2lkZ2V0XHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEByZXR1cm5zIHsqfVxyXG5cdCAqIEBtZW1iZXJvZiBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NcclxuXHQgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0Q2hhcnRNYW5hZ2VyV2lkZ2V0RGVmaW5pdGlvbigpIDogQ29tcG9uZW50U2V0dGluZ3Mge1xyXG4gICAgICAgIC8vIHJlbW92ZSBzdGF0aWMgYW5kIGFkZCBjb21wb25lbnRcclxuICAgICAgICBsZXQgY29tcG9uZW50U2V0dGluZ3MgPSBuZXcgQ29tcG9uZW50U2V0dGluZ3MoKTtcclxuICAgICAgICBjb21wb25lbnRTZXR0aW5ncy5hZGRTdWJDb21wb25lbnQoXCJTZXJpZXNQcm92aWRlclwiLCBcIlNlcmllc1Byb3ZpZGVyXCIpO1xyXG4gICAgICAgIGNvbXBvbmVudFNldHRpbmdzLmFkZFN1YkNvbXBvbmVudChcIkNoYXJ0TWFuYWdlckRhdGFNb2RlbFwiLCBcIkNoYXJ0TWFuYWdlckRhdGFNb2RlbFwiKTtcclxuICAgICAgICByZXR1cm4gY29tcG9uZW50U2V0dGluZ3M7XHJcbiAgICB9XHJcbn0iXX0=