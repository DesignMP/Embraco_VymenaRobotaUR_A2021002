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
        DefaultComponentSettings.getSignalManagerDatamodelDefinition = function () {
            var componentSettings = new componentSettings_1.ComponentSettings();
            componentSettings.addSubComponent("SeriesProvider", DefaultComponentSettings.SeriesProviderId);
            return componentSettings;
        };
        DefaultComponentSettings.SeriesProviderId = "SeriesProvider";
        DefaultComponentSettings.DataModelDefinitionId = "signalManagerDatamodelDefinition";
        return DefaultComponentSettings;
    }());
    exports.DefaultComponentSettings = DefaultComponentSettings;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdENvbXBvbmVudFNldHRpbmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvc2lnbmFsTWFuYWdlckRhdGFNb2RlbC9kZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBRUE7UUFBQTtRQWtCQSxDQUFDO1FBWkc7Ozs7OztXQU1BO1FBQ2MsNERBQW1DLEdBQWpEO1lBQ0ksSUFBSSxpQkFBaUIsR0FBRyxJQUFJLHFDQUFpQixFQUFFLENBQUM7WUFDaEQsaUJBQWlCLENBQUMsZUFBZSxDQUFDLGdCQUFnQixFQUFFLHdCQUF3QixDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDL0YsT0FBTyxpQkFBaUIsQ0FBQztRQUM3QixDQUFDO1FBZmEseUNBQWdCLEdBQUcsZ0JBQWdCLENBQUM7UUFFcEMsOENBQXFCLEdBQUcsa0NBQWtDLENBQUM7UUFjN0UsK0JBQUM7S0FBQSxBQWxCRCxJQWtCQztJQWxCWSw0REFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnRTZXR0aW5nc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIERlZmF1bHRDb21wb25lbnRTZXR0aW5nc3tcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIFNlcmllc1Byb3ZpZGVySWQgPSBcIlNlcmllc1Byb3ZpZGVyXCI7XHJcbiAgICBcclxuICAgIHB1YmxpYyBzdGF0aWMgRGF0YU1vZGVsRGVmaW5pdGlvbklkID0gXCJzaWduYWxNYW5hZ2VyRGF0YW1vZGVsRGVmaW5pdGlvblwiO1xyXG5cclxuICAgIC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIGRlZmF1bHQgY29tcG9uZW50IHNldHRpbmdzIGZvciB0aGlzIGRhdGFtb2RlbFxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcmV0dXJucyB7Kn1cclxuXHQgKiBAbWVtYmVyb2YgRGVmYXVsdENvbXBvbmVudFNldHRpbmdzXHJcblx0ICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFNpZ25hbE1hbmFnZXJEYXRhbW9kZWxEZWZpbml0aW9uKCkgOiBDb21wb25lbnRTZXR0aW5ncyB7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudFNldHRpbmdzID0gbmV3IENvbXBvbmVudFNldHRpbmdzKCk7XHJcbiAgICAgICAgY29tcG9uZW50U2V0dGluZ3MuYWRkU3ViQ29tcG9uZW50KFwiU2VyaWVzUHJvdmlkZXJcIiwgRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLlNlcmllc1Byb3ZpZGVySWQpO1xyXG4gICAgICAgIHJldHVybiBjb21wb25lbnRTZXR0aW5ncztcclxuICAgIH1cclxufSAiXX0=