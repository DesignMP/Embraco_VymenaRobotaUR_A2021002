define(["require", "exports", "../../common/packageConversion/exportContainer", "../../common/packageConversion/mceConversionError"], function (require, exports, exportContainer_1, mceConversionError_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Handles the creation of *.mce file export data (mce => MappCockpitExport), and also the import of the export data into the components/settingsObjects
     *
     * @export
     * @class MceExportImportHelper
     */
    var MceExportImportHelper = /** @class */ (function () {
        function MceExportImportHelper() {
        }
        /**
         * Returns the export data for the given components
         *
         * @static
         * @param {Array<IComponent>} componentInstances
         * @param {Array<ISettingsObject>} settingsObjects
         * @returns {string}
         * @memberof MceExportImportHelper
         */
        MceExportImportHelper.getExportData = function (componentInstances, settingsObjects) {
            var container = new exportContainer_1.ExportContainer();
            try {
                // Add component data
                componentInstances.forEach(function (instance) {
                    var componentSettings = instance.getComponentSettings(false);
                    if (componentSettings !== undefined) {
                        container.addSettings(componentSettings, instance.component.type);
                    }
                });
                // TODO: Add settings objects data for CursorStates support
                /*settingsObjects.forEach(settingsObject => {
                    let settings = settingsObject.getSettings();
                    if(settings !== undefined){
                        container.addSettings(settings, "CursorStates"); // CursorState type needed, or type of settings object
                    }
                });*/
                var stringData = container.toJson();
                return stringData;
            }
            catch (e) {
                if (mceConversionError_1.MceConversionError.isMceConversionError(e)) {
                    console.error(e.toString());
                }
                else {
                    console.error(e);
                }
            }
            return "";
        };
        /**
         * Clears all the components in the given order (needed before importing new data)
         *
         * @static
         * @param {Array<IComponent>} componentInstances
         * @memberof MceExportImportHelper
         */
        MceExportImportHelper.clearComponents = function (componentInstances) {
            componentInstances.forEach(function (componentInstances) {
                componentInstances.clear();
            });
        };
        /**
         * Sets the given data from a exportContainer to the given components
         *
         * @static
         * @param {Array<IComponent>} componentInstances
         * @param {Array<ISettingsObject>} settingsObjects
         * @param {ExportContainer} exportContainer
         * @memberof MceExportImportHelper
         */
        MceExportImportHelper.setImportData = function (componentInstances, settingsObjects, exportContainer) {
            // set all settings to the components
            componentInstances.forEach(function (componentInstances) {
                var componentSettings = exportContainer.getSettingsByKey(componentInstances.component.type);
                if (componentSettings != undefined) {
                    componentInstances.setComponentSettings(componentSettings);
                }
            });
            // TODO: Set settings objects data for CursorStates support
        };
        return MceExportImportHelper;
    }());
    exports.MceExportImportHelper = MceExportImportHelper;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWNlRXhwb3J0SW1wb3J0SGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3NpZ25hbE1hbmFnZXJXaWRnZXQvbWNlRXhwb3J0SW1wb3J0SGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQU1BOzs7OztPQUtHO0lBQ0g7UUFBQTtRQTJFQSxDQUFDO1FBekVHOzs7Ozs7OztXQVFHO1FBQ0ksbUNBQWEsR0FBcEIsVUFBcUIsa0JBQXFDLEVBQUUsZUFBdUM7WUFDL0YsSUFBSSxTQUFTLEdBQUcsSUFBSSxpQ0FBZSxFQUFFLENBQUM7WUFDdEMsSUFBRztnQkFDQyxxQkFBcUI7Z0JBQ3JCLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxVQUFBLFFBQVE7b0JBQy9CLElBQUksaUJBQWlCLEdBQUcsUUFBUSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUM3RCxJQUFHLGlCQUFpQixLQUFLLFNBQVMsRUFBQzt3QkFDL0IsU0FBUyxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsRUFBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUNwRTtnQkFDTCxDQUFDLENBQUMsQ0FBQztnQkFFSCwyREFBMkQ7Z0JBQzNEOzs7OztxQkFLSztnQkFDTCxJQUFJLFVBQVUsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ3BDLE9BQU8sVUFBVSxDQUFDO2FBQ3JCO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1IsSUFBRyx1Q0FBa0IsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDM0MsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQTtpQkFDOUI7cUJBQU07b0JBQ0gsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDcEI7YUFDSjtZQUNELE9BQU8sRUFBRSxDQUFDO1FBQ2QsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNJLHFDQUFlLEdBQXRCLFVBQXVCLGtCQUFxQztZQUN4RCxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsVUFBQSxrQkFBa0I7Z0JBQ2xDLGtCQUFtQixDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3ZDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ0ksbUNBQWEsR0FBcEIsVUFBcUIsa0JBQXFDLEVBQUUsZUFBdUMsRUFBRSxlQUFnQztZQUVqSSxxQ0FBcUM7WUFDckMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLFVBQUEsa0JBQWtCO2dCQUN6QyxJQUFJLGlCQUFpQixHQUFHLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFzQixDQUFDO2dCQUNqSCxJQUFHLGlCQUFpQixJQUFJLFNBQVMsRUFBQztvQkFDOUIsa0JBQWtCLENBQUMsb0JBQW9CLENBQUMsaUJBQWlCLENBQUMsQ0FBQztpQkFDOUQ7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILDJEQUEyRDtRQUMvRCxDQUFDO1FBQ0wsNEJBQUM7SUFBRCxDQUFDLEFBM0VELElBMkVDO0lBM0VZLHNEQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV4cG9ydENvbnRhaW5lciB9IGZyb20gXCIuLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vZXhwb3J0Q29udGFpbmVyXCI7XHJcbmltcG9ydCB7IE1jZUNvbnZlcnNpb25FcnJvciB9IGZyb20gXCIuLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vbWNlQ29udmVyc2lvbkVycm9yXCI7XHJcbmltcG9ydCB7IElDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvaW50ZXJmYWNlcy9jb21wb25lbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVNldHRpbmdzT2JqZWN0IH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9pbnRlcmZhY2VzL3NldHRpbmdzT2JqZWN0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcblxyXG4vKipcclxuICogSGFuZGxlcyB0aGUgY3JlYXRpb24gb2YgKi5tY2UgZmlsZSBleHBvcnQgZGF0YSAobWNlID0+IE1hcHBDb2NrcGl0RXhwb3J0KSwgYW5kIGFsc28gdGhlIGltcG9ydCBvZiB0aGUgZXhwb3J0IGRhdGEgaW50byB0aGUgY29tcG9uZW50cy9zZXR0aW5nc09iamVjdHNcclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAY2xhc3MgTWNlRXhwb3J0SW1wb3J0SGVscGVyXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTWNlRXhwb3J0SW1wb3J0SGVscGVye1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZXhwb3J0IGRhdGEgZm9yIHRoZSBnaXZlbiBjb21wb25lbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtBcnJheTxJQ29tcG9uZW50Pn0gY29tcG9uZW50SW5zdGFuY2VzXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElTZXR0aW5nc09iamVjdD59IHNldHRpbmdzT2JqZWN0c1xyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBNY2VFeHBvcnRJbXBvcnRIZWxwZXJcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldEV4cG9ydERhdGEoY29tcG9uZW50SW5zdGFuY2VzOiBBcnJheTxJQ29tcG9uZW50Piwgc2V0dGluZ3NPYmplY3RzOiBBcnJheTxJU2V0dGluZ3NPYmplY3Q+KTogc3RyaW5ne1xyXG4gICAgICAgIGxldCBjb250YWluZXIgPSBuZXcgRXhwb3J0Q29udGFpbmVyKCk7XHJcbiAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICAvLyBBZGQgY29tcG9uZW50IGRhdGFcclxuICAgICAgICAgICAgY29tcG9uZW50SW5zdGFuY2VzLmZvckVhY2goaW5zdGFuY2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbXBvbmVudFNldHRpbmdzID0gaW5zdGFuY2UuZ2V0Q29tcG9uZW50U2V0dGluZ3MoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgaWYoY29tcG9uZW50U2V0dGluZ3MgIT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmFkZFNldHRpbmdzKGNvbXBvbmVudFNldHRpbmdzLGluc3RhbmNlLmNvbXBvbmVudC50eXBlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBUT0RPOiBBZGQgc2V0dGluZ3Mgb2JqZWN0cyBkYXRhIGZvciBDdXJzb3JTdGF0ZXMgc3VwcG9ydFxyXG4gICAgICAgICAgICAvKnNldHRpbmdzT2JqZWN0cy5mb3JFYWNoKHNldHRpbmdzT2JqZWN0ID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBzZXR0aW5ncyA9IHNldHRpbmdzT2JqZWN0LmdldFNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgICAgICBpZihzZXR0aW5ncyAhPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuYWRkU2V0dGluZ3Moc2V0dGluZ3MsIFwiQ3Vyc29yU3RhdGVzXCIpOyAvLyBDdXJzb3JTdGF0ZSB0eXBlIG5lZWRlZCwgb3IgdHlwZSBvZiBzZXR0aW5ncyBvYmplY3RcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7Ki9cclxuICAgICAgICAgICAgbGV0IHN0cmluZ0RhdGEgPSBjb250YWluZXIudG9Kc29uKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBzdHJpbmdEYXRhO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgaWYoTWNlQ29udmVyc2lvbkVycm9yLmlzTWNlQ29udmVyc2lvbkVycm9yKGUpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGUudG9TdHJpbmcoKSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IFxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2xlYXJzIGFsbCB0aGUgY29tcG9uZW50cyBpbiB0aGUgZ2l2ZW4gb3JkZXIgKG5lZWRlZCBiZWZvcmUgaW1wb3J0aW5nIG5ldyBkYXRhKVxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SUNvbXBvbmVudD59IGNvbXBvbmVudEluc3RhbmNlc1xyXG4gICAgICogQG1lbWJlcm9mIE1jZUV4cG9ydEltcG9ydEhlbHBlclxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY2xlYXJDb21wb25lbnRzKGNvbXBvbmVudEluc3RhbmNlczogQXJyYXk8SUNvbXBvbmVudD4pe1xyXG4gICAgICAgIGNvbXBvbmVudEluc3RhbmNlcy5mb3JFYWNoKGNvbXBvbmVudEluc3RhbmNlcyA9PiB7XHJcbiAgICAgICAgICAgICAoPGFueT5jb21wb25lbnRJbnN0YW5jZXMpLmNsZWFyKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBnaXZlbiBkYXRhIGZyb20gYSBleHBvcnRDb250YWluZXIgdG8gdGhlIGdpdmVuIGNvbXBvbmVudHNcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElDb21wb25lbnQ+fSBjb21wb25lbnRJbnN0YW5jZXNcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SVNldHRpbmdzT2JqZWN0Pn0gc2V0dGluZ3NPYmplY3RzXHJcbiAgICAgKiBAcGFyYW0ge0V4cG9ydENvbnRhaW5lcn0gZXhwb3J0Q29udGFpbmVyXHJcbiAgICAgKiBAbWVtYmVyb2YgTWNlRXhwb3J0SW1wb3J0SGVscGVyXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBzZXRJbXBvcnREYXRhKGNvbXBvbmVudEluc3RhbmNlczogQXJyYXk8SUNvbXBvbmVudD4sIHNldHRpbmdzT2JqZWN0czogQXJyYXk8SVNldHRpbmdzT2JqZWN0PiwgZXhwb3J0Q29udGFpbmVyOiBFeHBvcnRDb250YWluZXIpe1xyXG4gICAgICAgXHJcbiAgICAgICAgLy8gc2V0IGFsbCBzZXR0aW5ncyB0byB0aGUgY29tcG9uZW50c1xyXG4gICAgICAgIGNvbXBvbmVudEluc3RhbmNlcy5mb3JFYWNoKGNvbXBvbmVudEluc3RhbmNlcyA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjb21wb25lbnRTZXR0aW5ncyA9IGV4cG9ydENvbnRhaW5lci5nZXRTZXR0aW5nc0J5S2V5KGNvbXBvbmVudEluc3RhbmNlcy5jb21wb25lbnQudHlwZSkgYXMgQ29tcG9uZW50U2V0dGluZ3M7XHJcbiAgICAgICAgICAgIGlmKGNvbXBvbmVudFNldHRpbmdzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBjb21wb25lbnRJbnN0YW5jZXMuc2V0Q29tcG9uZW50U2V0dGluZ3MoY29tcG9uZW50U2V0dGluZ3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFRPRE86IFNldCBzZXR0aW5ncyBvYmplY3RzIGRhdGEgZm9yIEN1cnNvclN0YXRlcyBzdXBwb3J0XHJcbiAgICB9XHJcbn0iXX0=