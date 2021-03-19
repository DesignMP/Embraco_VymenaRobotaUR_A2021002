define(["require", "exports", "./componentSettings", "../persistence/persistDataProvider", "../componentFactory/componentDefinition", "../../framework/componentHub/bindings/componentBindings"], function (require, exports, componentSettings_1, persistDataProvider_1, componentDefinition_1, componentBindings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ComponentBase = /** @class */ (function () {
        /**
         * Creates an instance of ComponentBase
         * @param {(IComponentFactory|undefined)} componentFactory
         * @param {*} owner
         * @memberof ComponentBase
         */
        function ComponentBase(componentFactory, owner) {
            /**
             * Main definition of this component(e.g. type, id, default settings data id)
             *
             * @type {ComponentDefinition}
             * @memberof ComponentBase
             */
            this._definition = new componentDefinition_1.ComponentDefinition("", "", ""); // Create default component definition
            /**
             * List of all created sub components after loading settings data
             *
             * @protected
             * @type {{ [id: string]: any; }}
             * @memberof ComponentBase
             */
            this._subComponents = {};
            /**
             * Data of this component will not be persisted if this flag is false
             *
             * @memberof ComponentBase
             */
            this._persistData = true;
            this._componentSettings = new componentSettings_1.ComponentSettings();
            this._componentFactory = componentFactory;
            this._owner = owner;
        }
        /**
         * Disable persisting of data for this component
         *
         * @memberof ComponentBase
         */
        ComponentBase.prototype.disablePersisting = function () {
            this._persistData = false;
        };
        /**
         * Retruns the settings of this component
         *
         * @returns {ComponentSettings}
         * @memberof ComponentBase
         */
        ComponentBase.prototype.getComponentSettings = function () {
            return this._componentSettings;
        };
        /**
         * Sets settings to this component
         *
         * @param {(ComponentSettings|undefined)} settings
         * @memberof ComponentBase
         */
        ComponentBase.prototype.setComponentSettings = function (settings) {
            if (settings != undefined) {
                // Set componentSettings
                this._componentSettings.setSettings(settings);
            }
        };
        /**
         * Saves the component settings to the persisting data provider
         *
         * @memberof ComponentBase
         */
        ComponentBase.prototype.saveComponentSettings = function () {
            if (this._persistData == true) {
                if (this.id != "") {
                    // Only persist if data was modified
                    persistDataProvider_1.PersistDataProvider.getInstance().setDataWithId(this.id, this._owner.getComponentSettings());
                }
                else {
                    console.warn("No id for persisting data available!(ComponentBase) => " + this.type);
                    console.warn(this);
                }
            }
        };
        /**
         * Loads the component settings from the persisting data provider
         *
         * @memberof ComponentBase
         */
        ComponentBase.prototype.loadComponentSettings = function () {
            var settingsData = persistDataProvider_1.PersistDataProvider.getInstance().getDataWithId(this.id);
            if (settingsData == undefined || this._persistData == false) {
                settingsData = this.getDefaultSettingsData();
            }
            if (settingsData != undefined) {
                this._owner.setComponentSettings(settingsData);
                this.setSubComponentsData();
            }
        };
        /**
         * Returns subcomponent for the given id
         *
         * @param {string} id
         * @returns {*}
         * @memberof ComponentBase
         */
        ComponentBase.prototype.getSubComponent = function (id) {
            return this._subComponents[id];
        };
        ComponentBase.prototype.setSubComponentsData = function () {
            // Create sub components needed for this component
            var subComponentDefinitions = this.getSetting(componentSettings_1.ComponentSettings.SubComponentsSettingId);
            this.createSubComponents(subComponentDefinitions);
        };
        ComponentBase.prototype.setBindingsData = function () {
            // Set bindings needed for this component
            var bindings = this.getSetting(componentSettings_1.ComponentSettings.BindingsSettingId);
            this.createBindings(bindings);
        };
        ComponentBase.prototype.getSetting = function (key) {
            var setting = undefined;
            if (this._componentSettings != undefined) {
                setting = this._componentSettings.getValue(key);
            }
            return setting;
        };
        Object.defineProperty(ComponentBase.prototype, "type", {
            get: function () {
                return this._definition.type;
            },
            set: function (value) {
                this._definition.type = value;
                // Additionaly set type in componentSettings
                this._componentSettings.type = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ComponentBase.prototype, "id", {
            get: function () {
                return this._definition.id;
            },
            set: function (value) {
                this._definition.id = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ComponentBase.prototype, "defaultSettingsDataId", {
            get: function () {
                return this._definition.defaultSettingsDataId;
            },
            set: function (value) {
                this._definition.defaultSettingsDataId = value;
            },
            enumerable: true,
            configurable: true
        });
        ComponentBase.prototype.setSetting = function (key, value) {
            if (this._componentSettings != undefined) {
                this._componentSettings.setValue(key, value);
            }
            else {
                console.error("ComponentSettings not available for setting data!");
            }
        };
        ComponentBase.prototype.getDefinition = function () {
            return this._definition;
        };
        ComponentBase.prototype.setDefinition = function (value) {
            this._definition = value;
            // set type also to the component settings
            this._componentSettings.type = this._definition.type;
        };
        /**
         * Creates components for the given component definitions and add them to the sub components list of this component
         *
         * @protected
         * @param {Array<ComponentDefinition>} componentDefinitions
         * @memberof ComponentBase
         */
        ComponentBase.prototype.createSubComponents = function (componentDefinitions) {
            if (componentDefinitions != undefined) {
                for (var i = 0; i < componentDefinitions.length; i++) {
                    var componentDef = componentDefinitions[i];
                    if (this._componentFactory != undefined) {
                        var instance = this._componentFactory.create(componentDef);
                        if (instance != undefined) {
                            this._subComponents[instance.component._definition.id] = instance;
                        }
                    }
                    else {
                        console.error("ComponentFactory not available!");
                    }
                }
            }
        };
        /**
         * Creates the bindings an binds them
         *
         * @protected
         * @param {Array<ComponentBinding>} bindings
         * @memberof ComponentBase
         */
        ComponentBase.prototype.createBindings = function (bindings) {
            if (bindings != undefined) {
                for (var i = 0; i < bindings.length; i++) {
                    var binding = bindings[i];
                    // create new binding for this component (binding component = this.owner => e.g. widget, datamodel, ...)
                    componentBindings_1.ComponentBindings.create(binding.type, binding.dataType, this._owner, binding.scope, binding.id, binding.targetKey, binding.sourceKey);
                }
            }
        };
        /**
         * Returns the default settings data which should be used for default startup of this component
         *
         * @private
         * @returns {*}
         * @memberof ComponentBase
         */
        ComponentBase.prototype.getDefaultSettingsData = function () {
            return persistDataProvider_1.PersistDataProvider.getInstance().getDefaultDataWithId(this._definition.defaultSettingsDataId);
        };
        return ComponentBase;
    }());
    exports.ComponentBase = ComponentBase;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50QmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50QmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFRQTtRQThESTs7Ozs7V0FLRztRQUNILHVCQUFZLGdCQUE2QyxFQUFFLEtBQVU7WUF6RHJFOzs7OztlQUtHO1lBQ0ssZ0JBQVcsR0FBd0IsSUFBSSx5Q0FBbUIsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsc0NBQXNDO1lBRXRIOzs7Ozs7ZUFNRztZQUNLLG1CQUFjLEdBQWtDLEVBQUUsQ0FBQztZQW9CM0Q7Ozs7ZUFJRztZQUNLLGlCQUFZLEdBQVksSUFBSSxDQUFDO1lBa0JqQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxxQ0FBaUIsRUFBRSxDQUFDO1lBQ2xELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxnQkFBZ0IsQ0FBQztZQUMxQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN4QixDQUFDO1FBbkJEOzs7O1dBSUc7UUFDSSx5Q0FBaUIsR0FBeEI7WUFDSSxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUM5QixDQUFDO1FBY0Q7Ozs7O1dBS0c7UUFDSSw0Q0FBb0IsR0FBM0I7WUFDSSxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztRQUN0QyxDQUFDO1FBRUQ7Ozs7O1dBS007UUFDSSw0Q0FBb0IsR0FBM0IsVUFBNEIsUUFBcUM7WUFDN0QsSUFBRyxRQUFRLElBQUksU0FBUyxFQUFDO2dCQUNyQix3QkFBd0I7Z0JBQ3hCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDakQ7UUFDTCxDQUFDO1FBRUQ7Ozs7V0FJRztRQUNJLDZDQUFxQixHQUE1QjtZQUNJLElBQUcsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJ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eUJBQ0c7d0JBQ0EsT0FBTyxDQUFDLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO3FCQUNwRDtpQkFDTDthQUNUO1FBQ0MsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLHNDQUFjLEdBQXRCLFVBQXVCLFFBQWlDO1lBQzFELElBQUcsUUFBUSxJQUFJLFNBQVMsRUFBQztnQkFDaEIsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7b0JBQ25DLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDMUIsd0dBQXdHO29CQUN4RyxxQ0FBaUIsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2lCQUMzSTthQUNUO1FBQ0YsQ0FBQztRQUVFOzs7Ozs7V0FNRztRQUNLLDhDQUFzQixHQUE5QjtZQUNJLE9BQU8seUNBQW1CLENBQUMsV0FBVyxFQUFFLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQzFHLENBQUM7UUFDTCxvQkFBQztJQUFELENBQUMsQUFuUUQsSUFtUUM7SUFuUVksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCB7IFBlcnNpc3REYXRhUHJvdmlkZXIgfSBmcm9tIFwiLi4vcGVyc2lzdGVuY2UvcGVyc2lzdERhdGFQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnREZWZpbml0aW9uIH0gZnJvbSBcIi4uL2NvbXBvbmVudEZhY3RvcnkvY29tcG9uZW50RGVmaW5pdGlvblwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRCaW5kaW5nIH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9jb21wb25lbnRIdWIvYmluZGluZ3MvY29tcG9uZW50QmluZGluZ1wiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRCaW5kaW5ncyB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvY29tcG9uZW50SHViL2JpbmRpbmdzL2NvbXBvbmVudEJpbmRpbmdzXCI7XHJcbmltcG9ydCB7IElDb21wb25lbnRGYWN0b3J5IH0gZnJvbSBcIi4uL2NvbXBvbmVudEZhY3RvcnkvaW50ZXJmYWNlcy9jb21wb25lbnRGYWN0b3J5SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElDb21wb25lbnQgfSBmcm9tIFwiLi4vY29tcG9uZW50QmFzZS9pbnRlcmZhY2VzL2NvbXBvbmVudEludGVyZmFjZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbXBvbmVudEJhc2Uge1xyXG4gICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDb21wb25lbnRGYWN0b3J5IGluc3RhbmNlIG5lZWRlZCBmb3IgY3JlYXRpbmcgbmV3IHN1YiBjb21wb25lbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEB0eXBlIHsoSUNvbXBvbmVudEZhY3Rvcnl8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2NvbXBvbmVudEZhY3Rvcnk6IElDb21wb25lbnRGYWN0b3J5fHVuZGVmaW5lZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE1haW4gZGVmaW5pdGlvbiBvZiB0aGlzIGNvbXBvbmVudChlLmcuIHR5cGUsIGlkLCBkZWZhdWx0IHNldHRpbmdzIGRhdGEgaWQpXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge0NvbXBvbmVudERlZmluaXRpb259XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9kZWZpbml0aW9uOiBDb21wb25lbnREZWZpbml0aW9uID0gbmV3IENvbXBvbmVudERlZmluaXRpb24oXCJcIiwgXCJcIiwgXCJcIik7IC8vIENyZWF0ZSBkZWZhdWx0IGNvbXBvbmVudCBkZWZpbml0aW9uXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMaXN0IG9mIGFsbCBjcmVhdGVkIHN1YiBjb21wb25lbnRzIGFmdGVyIGxvYWRpbmcgc2V0dGluZ3MgZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEB0eXBlIHt7IFtpZDogc3RyaW5nXTogYW55OyB9fVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfc3ViQ29tcG9uZW50czogeyBbaWQ6IHN0cmluZ106IElDb21wb25lbnQ7IH0gPSB7fTsgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgb3duZXIgb2YgdGhpcyBjb21wb25lbnQgb2JqZWN0KGUuZy4gYSB3aWRnZXQsIGEgZGF0YW1vZGVsLCAuLi4pXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEB0eXBlIHtJQ29tcG9uZW50fVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfb3duZXI6IElDb21wb25lbnQ7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQ3VycmVudCBjb21wb25lbnQgc2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAdHlwZSB7Q29tcG9uZW50U2V0dGluZ3N9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9jb21wb25lbnRTZXR0aW5ncyE6IENvbXBvbmVudFNldHRpbmdzO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGF0YSBvZiB0aGlzIGNvbXBvbmVudCB3aWxsIG5vdCBiZSBwZXJzaXN0ZWQgaWYgdGhpcyBmbGFnIGlzIGZhbHNlXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfcGVyc2lzdERhdGE6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzYWJsZSBwZXJzaXN0aW5nIG9mIGRhdGEgZm9yIHRoaXMgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRpc2FibGVQZXJzaXN0aW5nKCkge1xyXG4gICAgICAgIHRoaXMuX3BlcnNpc3REYXRhID0gZmFsc2U7XHJcbiAgICB9XHJcbiBcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBDb21wb25lbnRCYXNlXHJcbiAgICAgKiBAcGFyYW0geyhJQ29tcG9uZW50RmFjdG9yeXx1bmRlZmluZWQpfSBjb21wb25lbnRGYWN0b3J5XHJcbiAgICAgKiBAcGFyYW0geyp9IG93bmVyXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmFzZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihjb21wb25lbnRGYWN0b3J5OiBJQ29tcG9uZW50RmFjdG9yeXx1bmRlZmluZWQsIG93bmVyOiBhbnkpe1xyXG4gICAgICAgIHRoaXMuX2NvbXBvbmVudFNldHRpbmdzID0gbmV3IENvbXBvbmVudFNldHRpbmdzKCk7XHJcbiAgICAgICAgdGhpcy5fY29tcG9uZW50RmFjdG9yeSA9IGNvbXBvbmVudEZhY3Rvcnk7XHJcbiAgICAgICAgdGhpcy5fb3duZXIgPSBvd25lcjtcclxuICAgIH1cclxuICBcclxuICAgIC8qKlxyXG4gICAgICogUmV0cnVucyB0aGUgc2V0dGluZ3Mgb2YgdGhpcyBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50U2V0dGluZ3N9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0Q29tcG9uZW50U2V0dGluZ3MoKTogQ29tcG9uZW50U2V0dGluZ3N7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbXBvbmVudFNldHRpbmdzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcbiAgICAgKiBTZXRzIHNldHRpbmdzIHRvIHRoaXMgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsoQ29tcG9uZW50U2V0dGluZ3N8dW5kZWZpbmVkKX0gc2V0dGluZ3NcclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRDb21wb25lbnRTZXR0aW5ncyhzZXR0aW5nczogQ29tcG9uZW50U2V0dGluZ3N8dW5kZWZpbmVkKXtcclxuICAgICAgICBpZihzZXR0aW5ncyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAvLyBTZXQgY29tcG9uZW50U2V0dGluZ3NcclxuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2V0dGluZ3Muc2V0U2V0dGluZ3Moc2V0dGluZ3MpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgICAgICBcclxuICAgIC8qKlxyXG4gICAgICogU2F2ZXMgdGhlIGNvbXBvbmVudCBzZXR0aW5ncyB0byB0aGUgcGVyc2lzdGluZyBkYXRhIHByb3ZpZGVyXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNhdmVDb21wb25lbnRTZXR0aW5ncygpIHtcclxuICAgICAgICBpZih0aGlzLl9wZXJzaXN0RGF0YSA9PSB0cnVlKXsgICAgIFxyXG4gICAgICAgICAgICBpZih0aGlzLmlkICE9IFwiXCIpe1xyXG4gICAgICAgICAgICAgICAgLy8gT25seSBwZXJzaXN0IGlmIGRhdGEgd2FzIG1vZGlmaWVkXHJcbiAgICAgICAgICAgICAgICBQZXJzaXN0RGF0YVByb3ZpZGVyLmdldEluc3RhbmNlKCkuc2V0RGF0YVdpdGhJZCh0aGlzLmlkLCB0aGlzLl9vd25lci5nZXRDb21wb25lbnRTZXR0aW5ncygpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiTm8gaWQgZm9yIHBlcnNpc3RpbmcgZGF0YSBhdmFpbGFibGUhKENvbXBvbmVudEJhc2UpID0+IFwiICsgdGhpcy50eXBlKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2Fybih0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWRzIHRoZSBjb21wb25lbnQgc2V0dGluZ3MgZnJvbSB0aGUgcGVyc2lzdGluZyBkYXRhIHByb3ZpZGVyXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGxvYWRDb21wb25lbnRTZXR0aW5ncygpIHtcclxuICAgICAgICBsZXQgc2V0dGluZ3NEYXRhID0gUGVyc2lzdERhdGFQcm92aWRlci5nZXRJbnN0YW5jZSgpLmdldERhdGFXaXRoSWQodGhpcy5pZCk7XHJcbiAgICAgICAgaWYoc2V0dGluZ3NEYXRhID09IHVuZGVmaW5lZCB8fCB0aGlzLl9wZXJzaXN0RGF0YSA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgIHNldHRpbmdzRGF0YSA9IHRoaXMuZ2V0RGVmYXVsdFNldHRpbmdzRGF0YSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzZXR0aW5nc0RhdGEgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fb3duZXIuc2V0Q29tcG9uZW50U2V0dGluZ3Moc2V0dGluZ3NEYXRhKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdWJDb21wb25lbnRzRGF0YSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgc3ViY29tcG9uZW50IGZvciB0aGUgZ2l2ZW4gaWRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFN1YkNvbXBvbmVudChpZDogc3RyaW5nKTogSUNvbXBvbmVudHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3ViQ29tcG9uZW50c1tpZF07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRTdWJDb21wb25lbnRzRGF0YSgpe1xyXG4gICAgICAgIC8vIENyZWF0ZSBzdWIgY29tcG9uZW50cyBuZWVkZWQgZm9yIHRoaXMgY29tcG9uZW50XHJcbiAgICAgICAgbGV0IHN1YkNvbXBvbmVudERlZmluaXRpb25zID0gdGhpcy5nZXRTZXR0aW5nKENvbXBvbmVudFNldHRpbmdzLlN1YkNvbXBvbmVudHNTZXR0aW5nSWQpO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlU3ViQ29tcG9uZW50cyhzdWJDb21wb25lbnREZWZpbml0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEJpbmRpbmdzRGF0YSgpe1xyXG4gICAgICAgIC8vIFNldCBiaW5kaW5ncyBuZWVkZWQgZm9yIHRoaXMgY29tcG9uZW50XHJcbiAgICAgICAgbGV0IGJpbmRpbmdzID0gdGhpcy5nZXRTZXR0aW5nKENvbXBvbmVudFNldHRpbmdzLkJpbmRpbmdzU2V0dGluZ0lkKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZUJpbmRpbmdzKGJpbmRpbmdzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0U2V0dGluZyhrZXk6IHN0cmluZyk6IGFueXx1bmRlZmluZWR7XHJcbiAgICAgICAgbGV0IHNldHRpbmcgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgaWYodGhpcy5fY29tcG9uZW50U2V0dGluZ3MgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgc2V0dGluZyA9IHRoaXMuX2NvbXBvbmVudFNldHRpbmdzLmdldFZhbHVlKGtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZXR0aW5nO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgdHlwZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kZWZpbml0aW9uLnR5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCB0eXBlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9kZWZpbml0aW9uLnR5cGUgPSB2YWx1ZTtcclxuICAgICAgICAvLyBBZGRpdGlvbmFseSBzZXQgdHlwZSBpbiBjb21wb25lbnRTZXR0aW5nc1xyXG4gICAgICAgIHRoaXMuX2NvbXBvbmVudFNldHRpbmdzLnR5cGUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGlkKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RlZmluaXRpb24uaWQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBzZXQgaWQodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2RlZmluaXRpb24uaWQgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGRlZmF1bHRTZXR0aW5nc0RhdGFJZCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kZWZpbml0aW9uLmRlZmF1bHRTZXR0aW5nc0RhdGFJZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGRlZmF1bHRTZXR0aW5nc0RhdGFJZCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fZGVmaW5pdGlvbi5kZWZhdWx0U2V0dGluZ3NEYXRhSWQgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0U2V0dGluZyhrZXk6IHN0cmluZywgdmFsdWU6IGFueSl7XHJcbiAgICAgICAgaWYodGhpcy5fY29tcG9uZW50U2V0dGluZ3MgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2V0dGluZ3Muc2V0VmFsdWUoa2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDb21wb25lbnRTZXR0aW5ncyBub3QgYXZhaWxhYmxlIGZvciBzZXR0aW5nIGRhdGEhXCIpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXREZWZpbml0aW9uKCk6IENvbXBvbmVudERlZmluaXRpb24ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kZWZpbml0aW9uO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldERlZmluaXRpb24odmFsdWU6IENvbXBvbmVudERlZmluaXRpb24pIHtcclxuICAgICAgICB0aGlzLl9kZWZpbml0aW9uID0gdmFsdWU7XHJcbiAgICAgICAgLy8gc2V0IHR5cGUgYWxzbyB0byB0aGUgY29tcG9uZW50IHNldHRpbmdzXHJcbiAgICAgICAgdGhpcy5fY29tcG9uZW50U2V0dGluZ3MudHlwZSA9IHRoaXMuX2RlZmluaXRpb24udHlwZTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBjb21wb25lbnRzIGZvciB0aGUgZ2l2ZW4gY29tcG9uZW50IGRlZmluaXRpb25zIGFuZCBhZGQgdGhlbSB0byB0aGUgc3ViIGNvbXBvbmVudHMgbGlzdCBvZiB0aGlzIGNvbXBvbmVudFxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8Q29tcG9uZW50RGVmaW5pdGlvbj59IGNvbXBvbmVudERlZmluaXRpb25zXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZVN1YkNvbXBvbmVudHMoY29tcG9uZW50RGVmaW5pdGlvbnM6IEFycmF5PENvbXBvbmVudERlZmluaXRpb24+KXtcclxuXHRcdGlmKGNvbXBvbmVudERlZmluaXRpb25zICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGNvbXBvbmVudERlZmluaXRpb25zLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBjb21wb25lbnREZWYgPSBjb21wb25lbnREZWZpbml0aW9uc1tpXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLl9jb21wb25lbnRGYWN0b3J5ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGluc3RhbmNlOiBJQ29tcG9uZW50fHVuZGVmaW5lZCA9IHRoaXMuX2NvbXBvbmVudEZhY3RvcnkuY3JlYXRlKGNvbXBvbmVudERlZik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaW5zdGFuY2UgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3ViQ29tcG9uZW50c1tpbnN0YW5jZS5jb21wb25lbnQuX2RlZmluaXRpb24uaWRdID0gaW5zdGFuY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ29tcG9uZW50RmFjdG9yeSBub3QgYXZhaWxhYmxlIVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICB9XHJcblx0XHR9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBiaW5kaW5ncyBhbiBiaW5kcyB0aGVtXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHBhcmFtIHtBcnJheTxDb21wb25lbnRCaW5kaW5nPn0gYmluZGluZ3NcclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlQmluZGluZ3MoYmluZGluZ3M6IEFycmF5PENvbXBvbmVudEJpbmRpbmc+KXtcclxuXHRcdGlmKGJpbmRpbmdzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGJpbmRpbmdzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBiaW5kaW5nID0gYmluZGluZ3NbaV07XHJcbiAgICAgICAgICAgICAgICAvLyBjcmVhdGUgbmV3IGJpbmRpbmcgZm9yIHRoaXMgY29tcG9uZW50IChiaW5kaW5nIGNvbXBvbmVudCA9IHRoaXMub3duZXIgPT4gZS5nLiB3aWRnZXQsIGRhdGFtb2RlbCwgLi4uKVxyXG4gICAgICAgICAgICAgICAgQ29tcG9uZW50QmluZGluZ3MuY3JlYXRlKGJpbmRpbmcudHlwZSwgYmluZGluZy5kYXRhVHlwZSwgdGhpcy5fb3duZXIsIGJpbmRpbmcuc2NvcGUsIGJpbmRpbmcuaWQsIGJpbmRpbmcudGFyZ2V0S2V5LCBiaW5kaW5nLnNvdXJjZUtleSk7XHJcbiAgICAgICAgICAgfVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgc2V0dGluZ3MgZGF0YSB3aGljaCBzaG91bGQgYmUgdXNlZCBmb3IgZGVmYXVsdCBzdGFydHVwIG9mIHRoaXMgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXREZWZhdWx0U2V0dGluZ3NEYXRhKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIFBlcnNpc3REYXRhUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXREZWZhdWx0RGF0YVdpdGhJZCh0aGlzLl9kZWZpbml0aW9uLmRlZmF1bHRTZXR0aW5nc0RhdGFJZCk7XHJcbiAgICB9IFxyXG59Il19