define(["require", "exports", "../../common/componentBase/componentSettings"], function (require, exports, componentSettings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DefaultComponentSettings = /** @class */ (function () {
        function DefaultComponentSettings() {
        }
        /**
         * Returns the default component settings for this widget
         *
         * @returns {*}
         * @memberof DefaultComponentSettings
         */
        DefaultComponentSettings.getSignalManagerWidgetDefinition = function () {
            var componentSettings = new componentSettings_1.ComponentSettings();
            componentSettings.addSubComponent("SeriesProvider", "SeriesProvider");
            componentSettings.addSubComponent("SignalManagerDataModel", "SignalManagerDataModel");
            componentSettings.addSubComponent("ChartManagerDataModel", "ChartManagerDataModel");
            return componentSettings;
        };
        DefaultComponentSettings.WidgetDefinitionId = "signalManagerWidgetDefinition";
        return DefaultComponentSettings;
    }());
    exports.DefaultComponentSettings = DefaultComponentSettings;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdENvbXBvbmVudFNldHRpbmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3NpZ25hbE1hbmFnZXJXaWRnZXQvZGVmYXVsdENvbXBvbmVudFNldHRpbmdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUVBO1FBQUE7UUFpQkEsQ0FBQztRQWJHOzs7OztXQUtBO1FBQ1cseURBQWdDLEdBQTlDO1lBQ08sSUFBSSxpQkFBaUIsR0FBRyxJQUFJLHFDQUFpQixFQUFFLENBQUM7WUFDaEQsaUJBQWlCLENBQUMsZUFBZSxDQUFDLGdCQUFnQixFQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDckUsaUJBQWlCLENBQUMsZUFBZSxDQUFDLHdCQUF3QixFQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDckYsaUJBQWlCLENBQUMsZUFBZSxDQUFDLHVCQUF1QixFQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDbkYsT0FBTyxpQkFBaUIsQ0FBQztRQUM3QixDQUFDO1FBZGEsMkNBQWtCLEdBQUcsK0JBQStCLENBQUM7UUFldkUsK0JBQUM7S0FBQSxBQWpCRCxJQWlCQztJQWpCWSw0REFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnRTZXR0aW5nc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIERlZmF1bHRDb21wb25lbnRTZXR0aW5nc3tcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIFdpZGdldERlZmluaXRpb25JZCA9IFwic2lnbmFsTWFuYWdlcldpZGdldERlZmluaXRpb25cIjtcclxuXHJcbiAgICAvKipcclxuXHQgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IGNvbXBvbmVudCBzZXR0aW5ncyBmb3IgdGhpcyB3aWRnZXRcclxuXHQgKlxyXG5cdCAqIEByZXR1cm5zIHsqfVxyXG5cdCAqIEBtZW1iZXJvZiBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NcclxuXHQgKi9cclxuXHRwdWJsaWMgc3RhdGljIGdldFNpZ25hbE1hbmFnZXJXaWRnZXREZWZpbml0aW9uKCkgOiBhbnkge1xyXG4gICAgICAgIGxldCBjb21wb25lbnRTZXR0aW5ncyA9IG5ldyBDb21wb25lbnRTZXR0aW5ncygpO1xyXG4gICAgICAgIGNvbXBvbmVudFNldHRpbmdzLmFkZFN1YkNvbXBvbmVudChcIlNlcmllc1Byb3ZpZGVyXCIsXCJTZXJpZXNQcm92aWRlclwiKTtcclxuICAgICAgICBjb21wb25lbnRTZXR0aW5ncy5hZGRTdWJDb21wb25lbnQoXCJTaWduYWxNYW5hZ2VyRGF0YU1vZGVsXCIsXCJTaWduYWxNYW5hZ2VyRGF0YU1vZGVsXCIpO1xyXG4gICAgICAgIGNvbXBvbmVudFNldHRpbmdzLmFkZFN1YkNvbXBvbmVudChcIkNoYXJ0TWFuYWdlckRhdGFNb2RlbFwiLFwiQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsXCIpO1xyXG4gICAgICAgIHJldHVybiBjb21wb25lbnRTZXR0aW5ncztcclxuICAgIH1cclxufSJdfQ==