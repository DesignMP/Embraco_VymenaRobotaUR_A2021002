define(["require", "exports", "../../common/componentBase/componentSettings"], function (require, exports, componentSettings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DefaultComponentSettings = /** @class */ (function () {
        function DefaultComponentSettings() {
        }
        /**
         * Returns the default component settings for this datamodel
         *
         * @private
         * @returns {*}
         * @memberof DefaultComponentSettings
         */
        DefaultComponentSettings.getChartManagerDatamodelDefinition = function () {
            var componentSettings = new componentSettings_1.ComponentSettings();
            componentSettings.addSubComponent("SeriesProvider", DefaultComponentSettings.SeriesProviderId);
            return componentSettings;
        };
        DefaultComponentSettings.SeriesProviderId = "SeriesProvider";
        DefaultComponentSettings.DataModelDefinitionId = "chartManagerDatamodelDefinition";
        return DefaultComponentSettings;
    }());
    exports.DefaultComponentSettings = DefaultComponentSettings;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdENvbXBvbmVudFNldHRpbmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2RlZmF1bHRDb21wb25lbnRTZXR0aW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFFQTtRQUFBO1FBa0JBLENBQUM7UUFaRzs7Ozs7O1dBTUE7UUFDYywyREFBa0MsR0FBaEQ7WUFDSSxJQUFJLGlCQUFpQixHQUFHLElBQUkscUNBQWlCLEVBQUUsQ0FBQztZQUNoRCxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLEVBQUUsd0JBQXdCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUMvRixPQUFPLGlCQUFpQixDQUFDO1FBQzdCLENBQUM7UUFmYSx5Q0FBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztRQUVwQyw4Q0FBcUIsR0FBRyxpQ0FBaUMsQ0FBQztRQWM1RSwrQkFBQztLQUFBLEFBbEJELElBa0JDO0lBbEJZLDREQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRGVmYXVsdENvbXBvbmVudFNldHRpbmdze1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgU2VyaWVzUHJvdmlkZXJJZCA9IFwiU2VyaWVzUHJvdmlkZXJcIjtcclxuICAgICBcclxuICAgIHB1YmxpYyBzdGF0aWMgRGF0YU1vZGVsRGVmaW5pdGlvbklkID0gXCJjaGFydE1hbmFnZXJEYXRhbW9kZWxEZWZpbml0aW9uXCI7XHJcblxyXG4gICAgLyoqXHJcblx0ICogUmV0dXJucyB0aGUgZGVmYXVsdCBjb21wb25lbnQgc2V0dGluZ3MgZm9yIHRoaXMgZGF0YW1vZGVsXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEByZXR1cm5zIHsqfVxyXG5cdCAqIEBtZW1iZXJvZiBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NcclxuXHQgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0Q2hhcnRNYW5hZ2VyRGF0YW1vZGVsRGVmaW5pdGlvbigpIDogQ29tcG9uZW50U2V0dGluZ3Mge1xyXG4gICAgICAgIGxldCBjb21wb25lbnRTZXR0aW5ncyA9IG5ldyBDb21wb25lbnRTZXR0aW5ncygpO1xyXG4gICAgICAgIGNvbXBvbmVudFNldHRpbmdzLmFkZFN1YkNvbXBvbmVudChcIlNlcmllc1Byb3ZpZGVyXCIsIERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5TZXJpZXNQcm92aWRlcklkKTtcclxuICAgICAgICByZXR1cm4gY29tcG9uZW50U2V0dGluZ3M7XHJcbiAgICB9XHJcbn0gIl19