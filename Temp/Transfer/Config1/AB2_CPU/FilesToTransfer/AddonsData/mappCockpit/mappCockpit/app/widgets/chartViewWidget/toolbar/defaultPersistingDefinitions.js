define(["require", "exports", "../../../common/componentBase/componentSettings", "../../../framework/componentHub/bindings/componentBinding", "../../common/states/cursorStates"], function (require, exports, componentSettings_1, componentBinding_1, cursorStates_1) {
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
        DefaultComponentSettings.getChartViewToolbarDefinition = function () {
            var componentSettings = new componentSettings_1.ComponentSettings();
            // Add bindings
            componentSettings.addBinding(componentBinding_1.BindingType.STATE, cursorStates_1.CursorStates, "app::trace view chart states", "cursor states", "cursorsStates", "updateCursorStates");
            return componentSettings;
        };
        DefaultComponentSettings.WidgetDefinitionId = "chartViewToolbarDefinition";
        return DefaultComponentSettings;
    }());
    exports.DefaultComponentSettings = DefaultComponentSettings;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdFBlcnNpc3RpbmdEZWZpbml0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jaGFydFZpZXdXaWRnZXQvdG9vbGJhci9kZWZhdWx0UGVyc2lzdGluZ0RlZmluaXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUlBO1FBQUE7UUFtQkEsQ0FBQztRQWZHOzs7Ozs7V0FNRztRQUNXLHNEQUE2QixHQUEzQztZQUNJLElBQUksaUJBQWlCLEdBQUcsSUFBSSxxQ0FBaUIsRUFBRSxDQUFDO1lBQ2hELGVBQWU7WUFDZixpQkFBaUIsQ0FBQyxVQUFVLENBQUMsOEJBQVcsQ0FBQyxLQUFLLEVBQUUsMkJBQVksRUFBRSw4QkFBOEIsRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLG9CQUFvQixDQUFDLENBQUM7WUFFdEosT0FBTyxpQkFBaUIsQ0FBQztRQUM3QixDQUFDO1FBZmEsMkNBQWtCLEdBQUcsNEJBQTRCLENBQUM7UUFpQnBFLCtCQUFDO0tBQUEsQUFuQkQsSUFtQkM7SUFuQlksNERBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgQmluZGluZ1R5cGUgfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL2NvbXBvbmVudEh1Yi9iaW5kaW5ncy9jb21wb25lbnRCaW5kaW5nXCI7XHJcbmltcG9ydCB7IEN1cnNvclN0YXRlcyB9IGZyb20gXCIuLi8uLi9jb21tb24vc3RhdGVzL2N1cnNvclN0YXRlc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIERlZmF1bHRDb21wb25lbnRTZXR0aW5nc3tcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIFdpZGdldERlZmluaXRpb25JZCA9IFwiY2hhcnRWaWV3VG9vbGJhckRlZmluaXRpb25cIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgY29tcG9uZW50IHNldHRpbmdzIGZvciB0aGlzIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnRTZXR0aW5nc31cclxuICAgICAqIEBtZW1iZXJvZiBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRDaGFydFZpZXdUb29sYmFyRGVmaW5pdGlvbigpIDogQ29tcG9uZW50U2V0dGluZ3Mge1xyXG4gICAgICAgIGxldCBjb21wb25lbnRTZXR0aW5ncyA9IG5ldyBDb21wb25lbnRTZXR0aW5ncygpO1xyXG4gICAgICAgIC8vIEFkZCBiaW5kaW5nc1xyXG4gICAgICAgIGNvbXBvbmVudFNldHRpbmdzLmFkZEJpbmRpbmcoQmluZGluZ1R5cGUuU1RBVEUsIEN1cnNvclN0YXRlcywgXCJhcHA6OnRyYWNlIHZpZXcgY2hhcnQgc3RhdGVzXCIsIFwiY3Vyc29yIHN0YXRlc1wiLCBcImN1cnNvcnNTdGF0ZXNcIiwgXCJ1cGRhdGVDdXJzb3JTdGF0ZXNcIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudFNldHRpbmdzO1xyXG4gICAgfVxyXG5cclxufSJdfQ==