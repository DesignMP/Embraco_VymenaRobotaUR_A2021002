define(["require", "exports", "../../common/componentBase/componentSettings", "./languageCodes", "./settingIds"], function (require, exports, componentSettings_1, languageCodes_1, settingIds_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DefaultComponentSettings = /** @class */ (function () {
        function DefaultComponentSettings() {
        }
        /**
         * Returns the default component settings for this component
         *
         * @static
         * @returns {ComponentSettings}
         * @memberof DefaultComponentSettings
         */
        DefaultComponentSettings.getTextProviderDefinition = function () {
            var componentSettings = new componentSettings_1.ComponentSettings();
            // per default, english should be set as the selected langauge
            componentSettings.setValue(settingIds_1.SettingIds.SelectedLanguage, languageCodes_1.LanguageCodes.english);
            // per default, english should be set as the fallback language
            componentSettings.setValue(settingIds_1.SettingIds.FallbackLanguage, languageCodes_1.LanguageCodes.english);
            return componentSettings;
        };
        DefaultComponentSettings.TextProviderDefinitionId = "textProviderDefinition";
        return DefaultComponentSettings;
    }());
    exports.DefaultComponentSettings = DefaultComponentSettings;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdENvbXBvbmVudFNldHRpbmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vdGV4dFByb3ZpZGVyL2RlZmF1bHRDb21wb25lbnRTZXR0aW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFNQTtRQUFBO1FBeUJBLENBQUM7UUFyQkc7Ozs7OztXQU1HO1FBQ1csa0RBQXlCLEdBQXZDO1lBQ0ksSUFBSSxpQkFBaUIsR0FBRyxJQUFJLHFDQUFpQixFQUFFLENBQUM7WUFHaEQsOERBQThEO1lBQzlELGlCQUFpQixDQUFDLFFBQVEsQ0FBQyx1QkFBVSxDQUFDLGdCQUFnQixFQUFDLDZCQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFOUUsOERBQThEO1lBQzlELGlCQUFpQixDQUFDLFFBQVEsQ0FBQyx1QkFBVSxDQUFDLGdCQUFnQixFQUFDLDZCQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7WUFHOUUsT0FBTyxpQkFBaUIsQ0FBQztRQUM3QixDQUFDO1FBckJhLGlEQUF3QixHQUFHLHdCQUF3QixDQUFDO1FBdUJ0RSwrQkFBQztLQUFBLEFBekJELElBeUJDO0lBekJZLDREQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCB7IExhbmd1YWdlQ29kZXMgfSBmcm9tIFwiLi9sYW5ndWFnZUNvZGVzXCI7XHJcbmltcG9ydCB7IFNldHRpbmdJZHMgfSBmcm9tIFwiLi9zZXR0aW5nSWRzXCI7XHJcblxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3Mge1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgVGV4dFByb3ZpZGVyRGVmaW5pdGlvbklkID0gXCJ0ZXh0UHJvdmlkZXJEZWZpbml0aW9uXCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IGNvbXBvbmVudCBzZXR0aW5ncyBmb3IgdGhpcyBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50U2V0dGluZ3N9XHJcbiAgICAgKiBAbWVtYmVyb2YgRGVmYXVsdENvbXBvbmVudFNldHRpbmdzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0VGV4dFByb3ZpZGVyRGVmaW5pdGlvbigpIDogQ29tcG9uZW50U2V0dGluZ3Mge1xyXG4gICAgICAgIGxldCBjb21wb25lbnRTZXR0aW5ncyA9IG5ldyBDb21wb25lbnRTZXR0aW5ncygpO1xyXG5cclxuICAgICAgICBcclxuICAgICAgICAvLyBwZXIgZGVmYXVsdCwgZW5nbGlzaCBzaG91bGQgYmUgc2V0IGFzIHRoZSBzZWxlY3RlZCBsYW5nYXVnZVxyXG4gICAgICAgIGNvbXBvbmVudFNldHRpbmdzLnNldFZhbHVlKFNldHRpbmdJZHMuU2VsZWN0ZWRMYW5ndWFnZSxMYW5ndWFnZUNvZGVzLmVuZ2xpc2gpO1xyXG5cclxuICAgICAgICAvLyBwZXIgZGVmYXVsdCwgZW5nbGlzaCBzaG91bGQgYmUgc2V0IGFzIHRoZSBmYWxsYmFjayBsYW5ndWFnZVxyXG4gICAgICAgIGNvbXBvbmVudFNldHRpbmdzLnNldFZhbHVlKFNldHRpbmdJZHMuRmFsbGJhY2tMYW5ndWFnZSxMYW5ndWFnZUNvZGVzLmVuZ2xpc2gpO1xyXG5cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gY29tcG9uZW50U2V0dGluZ3M7XHJcbiAgICB9XHJcblxyXG59Il19