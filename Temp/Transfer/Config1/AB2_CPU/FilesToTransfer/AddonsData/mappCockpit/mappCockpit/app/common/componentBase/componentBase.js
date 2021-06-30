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
        Object.defineProperty(ComponentBase.prototype, "componentFactory", {
            get: function () {
                return this._componentFactory;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Disable persisting of data for this component
         *
         * @memberof ComponentBase
         */
        ComponentBase.prototype.disablePersisting = function () {
            this._persistData = false;
        };
        /**
         * Returns persist state of component
         *
         * @returns {boolean}
         * @memberof ComponentBase
         */
        ComponentBase.prototype.getPersistency = function () {
            return this._persistData;
        };
        /**
         * Initialize the component
         *
         * @memberof ComponentBase
         */
        ComponentBase.prototype.initialize = function () {
            this._owner.initializeComponent();
            this.addDefaultComponentSettings();
        };
        /**
         * Returns the settings of this component
         *
         * @returns {ComponentSettings}
         * @memberof ComponentBase
         */
        ComponentBase.prototype.getComponentSettings = function (onlyModified) {
            if (onlyModified === void 0) { onlyModified = false; }
            return this._componentSettings.getSettings(onlyModified);
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
                var defaultSettingsData = this.getDefaultSettingsData();
                if (defaultSettingsData != undefined) {
                    // Currently SubComponent and Binding settings are static and were not saved, therefore the default settings must be used
                    var defaultSubComponentSettings = defaultSettingsData.getSubComponentSettings();
                    var subComponentSettings = this._componentSettings.getSubComponentSettings();
                    if (subComponentSettings == undefined && defaultSubComponentSettings != undefined) {
                        // Use default sub component settings if no sub component settings are available
                        this._componentSettings.setSubComponentSettings(defaultSubComponentSettings);
                    }
                    var defaultBindingSettings = defaultSettingsData.getBindingSettings();
                    var bindingSettings = this._componentSettings.getBindingSettings();
                    if (bindingSettings == undefined && defaultBindingSettings != undefined) {
                        // Use default binding settings if no sub component settings are available
                        this._componentSettings.setBindingSettings(defaultBindingSettings);
                    }
                }
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
                    persistDataProvider_1.PersistDataProvider.getInstance().setDataWithId(this.id, this._owner.getComponentSettings(true));
                }
                else {
                    console.warn("No id for persisting data available!(ComponentBase) => " + this.type);
                    console.warn(this);
                }
            }
        };
        /**
         * Loads the component settings from the persisting data provider(default or persisted data if available) to the component base,
         * and creates the subcomponents
         *
         * @memberof ComponentBase
         */
        ComponentBase.prototype.loadComponentSettings = function () {
            var componentSettings = persistDataProvider_1.PersistDataProvider.getInstance().getDataWithId(this.id);
            if (this.useDefaultComponentSettings(componentSettings) == true) {
                componentSettings = this.getDefaultSettingsData();
            }
            if (componentSettings != undefined) {
                // Set the component settings
                this.setComponentSettings(componentSettings);
                // Create sub component before set settings to the owner of this component base (because sub components are sometimes needed in the owner setComponentSettings method)
                this.setSubComponentsData();
            }
        };
        /**
         * Returns true if no components settings are defined, or if persisting is deactivated, or version of component settings is not supported
         *
         * @private
         * @param {ComponentSettings} componentSettings
         * @returns {boolean}
         * @memberof ComponentBase
         */
        ComponentBase.prototype.useDefaultComponentSettings = function (componentSettings) {
            if (componentSettings == undefined) {
                return true;
            }
            if (this._persistData == false) {
                return true;
            }
            if (this.isComponentSupportingSettings(componentSettings) == false) {
                return true;
            }
            return false;
        };
        /**
         * Check if the settings version is supported in this component version (equal versions are supported => only major version is checked)
         * major.minor => x.y (e.g)
         *
         * @private
         * @param {ComponentSettings} componentSettings
         * @returns {boolean}
         * @memberof ComponentBase
         */
        ComponentBase.prototype.isComponentSupportingSettings = function (componentSettings) {
            var splittedSettingsVersion = componentSettings.version.split(".");
            var splittedComponentVersion = this._componentSettings.version.split(".");
            var settingVersionNumber = parseInt(splittedSettingsVersion[0], 10);
            var settingComponentNumber = parseInt(splittedComponentVersion[0], 10);
            // Currently only equal versions are allowed
            if (settingVersionNumber == settingComponentNumber) {
                return true;
            }
            return false;
        };
        /**
         * Add the default component settings to the provider
         *
         * @private
         * @memberof ComponentBase
         */
        ComponentBase.prototype.addDefaultComponentSettings = function () {
            // Is a default persisting data id definied
            if (this.defaultSettingsDataId != "") {
                // Is some default persisting data defined
                var defaultComponentSettings = this._owner.getDefaultComponentSettings();
                if (defaultComponentSettings != undefined) {
                    // Add default persisting definition to the default persisting data provider
                    this.addDefaultComponentSettingsToProvider(this.defaultSettingsDataId, defaultComponentSettings);
                }
            }
        };
        /**
         * Adds the given default component settings to the default persisting data provider(TODO: should be a seperated default componentSettings provider)
         *
         * @memberof ComponentBase
         */
        ComponentBase.prototype.addDefaultComponentSettingsToProvider = function (id, settings) {
            if (settings == undefined) {
                console.error("No default persisting data available for id: " + id);
            }
            else {
                persistDataProvider_1.PersistDataProvider.getInstance().setDefaultDataWithId(id, settings);
            }
        };
        ComponentBase.prototype.addSubComponent = function (type, id, defaultSettingsDataId, context) {
            if (defaultSettingsDataId === void 0) { defaultSettingsDataId = ""; }
            if (context === void 0) { context = undefined; }
            // Only add dynamic sub components to component settings if they should be persisted
            // this.getComponentSettings().addSubComponent(type, id, defaultInstanceDataId);
            var instance = this.createComponentInstance(new componentDefinition_1.ComponentDefinition(type, id, defaultSettingsDataId), context);
            if (instance != undefined) {
                this._subComponents[instance.component._definition.id] = instance;
            }
            return instance;
        };
        /**
         * Returns subcomponent for the given id
         *
         * @param {string} id
         * @returns {IComponent}
         * @memberof ComponentBase
         */
        ComponentBase.prototype.getSubComponent = function (id) {
            return this._subComponents[id];
        };
        ComponentBase.prototype.setBindingsData = function () {
            // Set bindings needed for this component
            var bindings = this.getSetting(componentSettings_1.ComponentSettings.BindingsSettingId);
            this.createBindings(bindings);
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
            /**
             * Returns the defaultSettingsData id (the component uses this data at startup if no persited data is available for this component)
             *
             * @type {string}
             * @memberof ComponentBase
             */
            get: function () {
                return this._definition.defaultSettingsDataId;
            },
            /**
             * Sets the defaultSettingsDataid (the component uses this data at startup if no persited data is available for this component)
             *
             * @memberof ComponentBase
             */
            set: function (value) {
                this._definition.defaultSettingsDataId = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Returns the setting for the given key
         *
         * @param {string} key
         * @returns {(any|undefined)}
         * @memberof ComponentBase
         */
        ComponentBase.prototype.getSetting = function (key) {
            var setting = undefined;
            if (this._componentSettings != undefined) {
                setting = this._componentSettings.getValue(key);
            }
            return setting;
        };
        /**
         * Sets a new setting with the given key and value to the componentSettings
         *
         * @param {string} key
         * @param {*} value
         * @memberof ComponentBase
         */
        ComponentBase.prototype.setSetting = function (key, value) {
            if (this._componentSettings != undefined) {
                this._componentSettings.setValue(key, value);
            }
            else {
                console.error("ComponentSettings not available for setting data!");
            }
        };
        /**
         * Returns the coomponentDefinition of this component(type, id, defaultDataId)
         *
         * @returns {ComponentDefinition}
         * @memberof ComponentBase
         */
        ComponentBase.prototype.getDefinition = function () {
            return this._definition;
        };
        /**
         * Sets the componentDefinition of this component(type, id, defaultDataId)
         *
         * @param {ComponentDefinition} value
         * @memberof ComponentBase
         */
        ComponentBase.prototype.setDefinition = function (value) {
            var defaultSettingsDataId = this._definition.defaultSettingsDataId;
            this._definition = value;
            if (this._definition.defaultSettingsDataId == "") {
                this._definition.defaultSettingsDataId = defaultSettingsDataId; // Use old settings data id if not defined in the new one
            }
            // set type also to the component settings
            this._componentSettings.type = this._definition.type;
        };
        /**
         * Creates the subcomponents with the given subComponents settings and adds them to the subComponents list
         *
         * @private
         * @memberof ComponentBase
         */
        ComponentBase.prototype.setSubComponentsData = function () {
            // Create sub components needed for this component
            var subComponentDefinitions = this.getSetting(componentSettings_1.ComponentSettings.SubComponentsSettingId);
            this.createSubComponents(subComponentDefinitions);
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
                    var instance = this.createComponentInstance(componentDef, this.context);
                    if (instance != undefined) {
                        this._subComponents[instance.component._definition.id] = instance;
                    }
                }
            }
        };
        /**
         * Creates a component instance with the given component definition if the component factory is available
         *
         * @private
         * @param {ComponentDefinition} componentDef
         * @returns {(IComponent|undefined)}
         * @memberof ComponentBase
         */
        ComponentBase.prototype.createComponentInstance = function (componentDef, context) {
            if (this._componentFactory != undefined) {
                var instance = this._componentFactory.create(componentDef, context);
                if (instance != undefined) {
                    return instance;
                }
            }
            else {
                console.error("ComponentFactory not available!");
            }
            return undefined;
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
         * Returns the default settings data which should be used for default startup of this component or undefined if not available
         *
         * @private
         * @returns {(ComponentSettings|undefined)}
         * @memberof ComponentBase
         */
        ComponentBase.prototype.getDefaultSettingsData = function () {
            if (this._definition.defaultSettingsDataId != "") {
                return persistDataProvider_1.PersistDataProvider.getInstance().getDefaultDataWithId(this._definition.defaultSettingsDataId);
            }
            return undefined;
        };
        return ComponentBase;
    }());
    exports.ComponentBase = ComponentBase;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50QmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50QmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFTQTtRQThFSTs7Ozs7V0FLRztRQUNILHVCQUFZLGdCQUE2QyxFQUFFLEtBQVU7WUFuRXJFOzs7OztlQUtHO1lBQ0ssZ0JBQVcsR0FBd0IsSUFBSSx5Q0FBbUIsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsc0NBQXNDO1lBRXRIOzs7Ozs7ZUFNRztZQUNLLG1CQUFjLEdBQWtDLEVBQUUsQ0FBQztZQW9CM0Q7Ozs7ZUFJRztZQUNLLGlCQUFZLEdBQVksSUFBSSxDQUFDO1lBNEJqQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxxQ0FBaUIsRUFBRSxDQUFDO1lBQ2xELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxnQkFBZ0IsQ0FBQztZQUMxQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN4QixDQUFDO1FBM0VELHNCQUFXLDJDQUFnQjtpQkFBM0I7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7WUFDbEMsQ0FBQzs7O1dBQUE7UUE0Q0Q7Ozs7V0FJRztRQUNJLHlDQUFpQixHQUF4QjtZQUNJLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQzlCLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNJLHNDQUFjLEdBQXJCO1lBQ0ksT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzdCLENBQUM7UUFjRDs7OztXQUlHO1FBQ0gsa0NBQVUsR0FBVjtZQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztZQUNsQyxJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztRQUN2QyxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSSw0Q0FBb0IsR0FBM0IsVUFB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LENBQUMsU0FBUyxDQUFDLENBQUM7aUJBQzNJO2FBQ1Q7UUFDRixDQUFDO1FBRUU7Ozs7OztXQU1HO1FBQ0ssOENBQXNCLEdBQTlCO1lBQ0ksSUFBRyxJQUFJLENBQUMsV0FBVyxDQUFDLHFCQUFxQixJQUFJLEVBQUUsRUFBQztnQkFDNUMsT0FBTyx5Q0FBbUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLHFCQUFxQixDQUFDLENBQUM7YUFDekc7WUFDRCxPQUFPLFNBQVMsQ0FBQztRQUNyQixDQUFDO1FBQ0wsb0JBQUM7SUFBRCxDQUFDLEFBemNELElBeWNDO0lBemNZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi9jb21wb25lbnRTZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBQZXJzaXN0RGF0YVByb3ZpZGVyIH0gZnJvbSBcIi4uL3BlcnNpc3RlbmNlL3BlcnNpc3REYXRhUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50RGVmaW5pdGlvbiB9IGZyb20gXCIuLi9jb21wb25lbnRGYWN0b3J5L2NvbXBvbmVudERlZmluaXRpb25cIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50QmluZGluZyB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvY29tcG9uZW50SHViL2JpbmRpbmdzL2NvbXBvbmVudEJpbmRpbmdcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50QmluZGluZ3MgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2NvbXBvbmVudEh1Yi9iaW5kaW5ncy9jb21wb25lbnRCaW5kaW5nc1wiO1xyXG5pbXBvcnQgeyBJQ29tcG9uZW50RmFjdG9yeSB9IGZyb20gXCIuLi9jb21wb25lbnRGYWN0b3J5L2ludGVyZmFjZXMvY29tcG9uZW50RmFjdG9yeUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJQ29tcG9uZW50IH0gZnJvbSBcIi4uL2NvbXBvbmVudEJhc2UvaW50ZXJmYWNlcy9jb21wb25lbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50Q29udGV4dCB9IGZyb20gXCIuL2NvbXBvbmVudENvbnRleHRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDb21wb25lbnRCYXNlIHtcclxuICAgICBcclxuICAgIC8qKlxyXG4gICAgICogQ29tcG9uZW50RmFjdG9yeSBpbnN0YW5jZSBuZWVkZWQgZm9yIGNyZWF0aW5nIG5ldyBzdWIgY29tcG9uZW50c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAdHlwZSB7KElDb21wb25lbnRGYWN0b3J5fHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9jb21wb25lbnRGYWN0b3J5OiBJQ29tcG9uZW50RmFjdG9yeSB8IHVuZGVmaW5lZDtcclxuXHJcbiAgICBwdWJsaWMgY29udGV4dDogQ29tcG9uZW50Q29udGV4dHx1bmRlZmluZWQ7XHJcbiAgICBcclxuICAgIHB1YmxpYyBnZXQgY29tcG9uZW50RmFjdG9yeSgpOiBJQ29tcG9uZW50RmFjdG9yeSB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbXBvbmVudEZhY3Rvcnk7XHJcbiAgICB9ICAgIFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFpbiBkZWZpbml0aW9uIG9mIHRoaXMgY29tcG9uZW50KGUuZy4gdHlwZSwgaWQsIGRlZmF1bHQgc2V0dGluZ3MgZGF0YSBpZClcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7Q29tcG9uZW50RGVmaW5pdGlvbn1cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2RlZmluaXRpb246IENvbXBvbmVudERlZmluaXRpb24gPSBuZXcgQ29tcG9uZW50RGVmaW5pdGlvbihcIlwiLCBcIlwiLCBcIlwiKTsgLy8gQ3JlYXRlIGRlZmF1bHQgY29tcG9uZW50IGRlZmluaXRpb25cclxuXHJcbiAgICAvKipcclxuICAgICAqIExpc3Qgb2YgYWxsIGNyZWF0ZWQgc3ViIGNvbXBvbmVudHMgYWZ0ZXIgbG9hZGluZyBzZXR0aW5ncyBkYXRhXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHR5cGUge3sgW2lkOiBzdHJpbmddOiBhbnk7IH19XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9zdWJDb21wb25lbnRzOiB7IFtpZDogc3RyaW5nXTogSUNvbXBvbmVudDsgfSA9IHt9OyBcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBvd25lciBvZiB0aGlzIGNvbXBvbmVudCBvYmplY3QoZS5nLiBhIHdpZGdldCwgYSBkYXRhbW9kZWwsIC4uLilcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUge0lDb21wb25lbnR9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9vd25lcjogSUNvbXBvbmVudDtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDdXJyZW50IGNvbXBvbmVudCBzZXR0aW5nc1xyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEB0eXBlIHtDb21wb25lbnRTZXR0aW5nc31cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2NvbXBvbmVudFNldHRpbmdzITogQ29tcG9uZW50U2V0dGluZ3M7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEYXRhIG9mIHRoaXMgY29tcG9uZW50IHdpbGwgbm90IGJlIHBlcnNpc3RlZCBpZiB0aGlzIGZsYWcgaXMgZmFsc2VcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9wZXJzaXN0RGF0YTogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNhYmxlIHBlcnNpc3Rpbmcgb2YgZGF0YSBmb3IgdGhpcyBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGlzYWJsZVBlcnNpc3RpbmcoKSB7XHJcbiAgICAgICAgdGhpcy5fcGVyc2lzdERhdGEgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgcGVyc2lzdCBzdGF0ZSBvZiBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRQZXJzaXN0ZW5jeSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGVyc2lzdERhdGE7XHJcbiAgICB9XHJcbiBcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBDb21wb25lbnRCYXNlXHJcbiAgICAgKiBAcGFyYW0geyhJQ29tcG9uZW50RmFjdG9yeXx1bmRlZmluZWQpfSBjb21wb25lbnRGYWN0b3J5XHJcbiAgICAgKiBAcGFyYW0geyp9IG93bmVyXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmFzZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihjb21wb25lbnRGYWN0b3J5OiBJQ29tcG9uZW50RmFjdG9yeXx1bmRlZmluZWQsIG93bmVyOiBhbnkpe1xyXG4gICAgICAgIHRoaXMuX2NvbXBvbmVudFNldHRpbmdzID0gbmV3IENvbXBvbmVudFNldHRpbmdzKCk7XHJcbiAgICAgICAgdGhpcy5fY29tcG9uZW50RmFjdG9yeSA9IGNvbXBvbmVudEZhY3Rvcnk7XHJcbiAgICAgICAgdGhpcy5fb3duZXIgPSBvd25lcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemUgdGhlIGNvbXBvbmVudFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRCYXNlXHJcbiAgICAgKi9cclxuICAgIGluaXRpYWxpemUoKXtcclxuICAgICAgICB0aGlzLl9vd25lci5pbml0aWFsaXplQ29tcG9uZW50KCk7XHJcbiAgICAgICAgdGhpcy5hZGREZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MoKTtcclxuICAgIH1cclxuICBcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgc2V0dGluZ3Mgb2YgdGhpcyBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50U2V0dGluZ3N9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0Q29tcG9uZW50U2V0dGluZ3Mob25seU1vZGlmaWVkOiBib29sZWFuID0gZmFsc2UpOiBDb21wb25lbnRTZXR0aW5nc3tcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29tcG9uZW50U2V0dGluZ3MuZ2V0U2V0dGluZ3Mob25seU1vZGlmaWVkKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG4gICAgICogU2V0cyBzZXR0aW5ncyB0byB0aGlzIGNvbXBvbmVudFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7KENvbXBvbmVudFNldHRpbmdzfHVuZGVmaW5lZCl9IHNldHRpbmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0Q29tcG9uZW50U2V0dGluZ3Moc2V0dGluZ3M6IENvbXBvbmVudFNldHRpbmdzfHVuZGVmaW5lZCl7XHJcbiAgICAgICAgaWYoc2V0dGluZ3MgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gU2V0IGNvbXBvbmVudFNldHRpbmdzXHJcbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNldHRpbmdzLnNldFNldHRpbmdzKHNldHRpbmdzKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBkZWZhdWx0U2V0dGluZ3NEYXRhID0gdGhpcy5nZXREZWZhdWx0U2V0dGluZ3NEYXRhKCk7XHJcbiAgICAgICAgICAgIGlmKGRlZmF1bHRTZXR0aW5nc0RhdGEgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIC8vIEN1cnJlbnRseSBTdWJDb21wb25lbnQgYW5kIEJpbmRpbmcgc2V0dGluZ3MgYXJlIHN0YXRpYyBhbmQgd2VyZSBub3Qgc2F2ZWQsIHRoZXJlZm9yZSB0aGUgZGVmYXVsdCBzZXR0aW5ncyBtdXN0IGJlIHVzZWRcclxuICAgICAgICAgICAgICAgIGxldCBkZWZhdWx0U3ViQ29tcG9uZW50U2V0dGluZ3MgPSBkZWZhdWx0U2V0dGluZ3NEYXRhLmdldFN1YkNvbXBvbmVudFNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3ViQ29tcG9uZW50U2V0dGluZ3MgPSB0aGlzLl9jb21wb25lbnRTZXR0aW5ncy5nZXRTdWJDb21wb25lbnRTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAgICAgaWYoc3ViQ29tcG9uZW50U2V0dGluZ3MgPT0gdW5kZWZpbmVkICYmIGRlZmF1bHRTdWJDb21wb25lbnRTZXR0aW5ncyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFVzZSBkZWZhdWx0IHN1YiBjb21wb25lbnQgc2V0dGluZ3MgaWYgbm8gc3ViIGNvbXBvbmVudCBzZXR0aW5ncyBhcmUgYXZhaWxhYmxlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2V0dGluZ3Muc2V0U3ViQ29tcG9uZW50U2V0dGluZ3MoZGVmYXVsdFN1YkNvbXBvbmVudFNldHRpbmdzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZGVmYXVsdEJpbmRpbmdTZXR0aW5ncyA9IGRlZmF1bHRTZXR0aW5nc0RhdGEuZ2V0QmluZGluZ1NldHRpbmdzKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgYmluZGluZ1NldHRpbmdzID0gdGhpcy5fY29tcG9uZW50U2V0dGluZ3MuZ2V0QmluZGluZ1NldHRpbmdzKCk7XHJcbiAgICAgICAgICAgICAgICBpZihiaW5kaW5nU2V0dGluZ3MgPT0gdW5kZWZpbmVkICYmIGRlZmF1bHRCaW5kaW5nU2V0dGluZ3MgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyBVc2UgZGVmYXVsdCBiaW5kaW5nIHNldHRpbmdzIGlmIG5vIHN1YiBjb21wb25lbnQgc2V0dGluZ3MgYXJlIGF2YWlsYWJsZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNldHRpbmdzLnNldEJpbmRpbmdTZXR0aW5ncyhkZWZhdWx0QmluZGluZ1NldHRpbmdzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgICAgICBcclxuICAgIC8qKlxyXG4gICAgICogU2F2ZXMgdGhlIGNvbXBvbmVudCBzZXR0aW5ncyB0byB0aGUgcGVyc2lzdGluZyBkYXRhIHByb3ZpZGVyXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNhdmVDb21wb25lbnRTZXR0aW5ncygpIHtcclxuICAgICAgICBpZih0aGlzLl9wZXJzaXN0RGF0YSA9PSB0cnVlKXsgICAgIFxyXG4gICAgICAgICAgICBpZih0aGlzLmlkICE9IFwiXCIpe1xyXG4gICAgICAgICAgICAgICAgLy8gT25seSBwZXJzaXN0IGlmIGRhdGEgd2FzIG1vZGlmaWVkXHJcbiAgICAgICAgICAgICAgICBQZXJzaXN0RGF0YVByb3ZpZGVyLmdldEluc3RhbmNlKCkuc2V0RGF0YVdpdGhJZCh0aGlzLmlkLCB0aGlzLl9vd25lci5nZXRDb21wb25lbnRTZXR0aW5ncyh0cnVlKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIk5vIGlkIGZvciBwZXJzaXN0aW5nIGRhdGEgYXZhaWxhYmxlIShDb21wb25lbnRCYXNlKSA9PiBcIiArIHRoaXMudHlwZSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4odGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkcyB0aGUgY29tcG9uZW50IHNldHRpbmdzIGZyb20gdGhlIHBlcnNpc3RpbmcgZGF0YSBwcm92aWRlcihkZWZhdWx0IG9yIHBlcnNpc3RlZCBkYXRhIGlmIGF2YWlsYWJsZSkgdG8gdGhlIGNvbXBvbmVudCBiYXNlLFxyXG4gICAgICogYW5kIGNyZWF0ZXMgdGhlIHN1YmNvbXBvbmVudHNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9hZENvbXBvbmVudFNldHRpbmdzKCkge1xyXG4gICAgICAgIGxldCBjb21wb25lbnRTZXR0aW5nczogQ29tcG9uZW50U2V0dGluZ3N8dW5kZWZpbmVkID0gUGVyc2lzdERhdGFQcm92aWRlci5nZXRJbnN0YW5jZSgpLmdldERhdGFXaXRoSWQodGhpcy5pZCkgYXMgQ29tcG9uZW50U2V0dGluZ3M7XHJcbiAgICAgICAgaWYodGhpcy51c2VEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MoY29tcG9uZW50U2V0dGluZ3MpID09IHRydWUpe1xyXG4gICAgICAgICAgICBjb21wb25lbnRTZXR0aW5ncyA9IHRoaXMuZ2V0RGVmYXVsdFNldHRpbmdzRGF0YSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihjb21wb25lbnRTZXR0aW5ncyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAvLyBTZXQgdGhlIGNvbXBvbmVudCBzZXR0aW5nc1xyXG4gICAgICAgICAgICB0aGlzLnNldENvbXBvbmVudFNldHRpbmdzKGNvbXBvbmVudFNldHRpbmdzKTtcclxuICAgICAgICAgICAgLy8gQ3JlYXRlIHN1YiBjb21wb25lbnQgYmVmb3JlIHNldCBzZXR0aW5ncyB0byB0aGUgb3duZXIgb2YgdGhpcyBjb21wb25lbnQgYmFzZSAoYmVjYXVzZSBzdWIgY29tcG9uZW50cyBhcmUgc29tZXRpbWVzIG5lZWRlZCBpbiB0aGUgb3duZXIgc2V0Q29tcG9uZW50U2V0dGluZ3MgbWV0aG9kKVxyXG4gICAgICAgICAgICB0aGlzLnNldFN1YkNvbXBvbmVudHNEYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIG5vIGNvbXBvbmVudHMgc2V0dGluZ3MgYXJlIGRlZmluZWQsIG9yIGlmIHBlcnNpc3RpbmcgaXMgZGVhY3RpdmF0ZWQsIG9yIHZlcnNpb24gb2YgY29tcG9uZW50IHNldHRpbmdzIGlzIG5vdCBzdXBwb3J0ZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtDb21wb25lbnRTZXR0aW5nc30gY29tcG9uZW50U2V0dGluZ3NcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1c2VEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MoY29tcG9uZW50U2V0dGluZ3M6IENvbXBvbmVudFNldHRpbmdzfHVuZGVmaW5lZCk6IGJvb2xlYW57XHJcbiAgICAgICAgaWYoY29tcG9uZW50U2V0dGluZ3MgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuX3BlcnNpc3REYXRhID09IGZhbHNlKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuaXNDb21wb25lbnRTdXBwb3J0aW5nU2V0dGluZ3MoY29tcG9uZW50U2V0dGluZ3MpID09IGZhbHNlKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrIGlmIHRoZSBzZXR0aW5ncyB2ZXJzaW9uIGlzIHN1cHBvcnRlZCBpbiB0aGlzIGNvbXBvbmVudCB2ZXJzaW9uIChlcXVhbCB2ZXJzaW9ucyBhcmUgc3VwcG9ydGVkID0+IG9ubHkgbWFqb3IgdmVyc2lvbiBpcyBjaGVja2VkKVxyXG4gICAgICogbWFqb3IubWlub3IgPT4geC55IChlLmcpXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50U2V0dGluZ3N9IGNvbXBvbmVudFNldHRpbmdzXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaXNDb21wb25lbnRTdXBwb3J0aW5nU2V0dGluZ3MoY29tcG9uZW50U2V0dGluZ3M6IENvbXBvbmVudFNldHRpbmdzKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IHNwbGl0dGVkU2V0dGluZ3NWZXJzaW9uID0gY29tcG9uZW50U2V0dGluZ3MudmVyc2lvbi5zcGxpdChcIi5cIik7XHJcbiAgICAgICAgbGV0IHNwbGl0dGVkQ29tcG9uZW50VmVyc2lvbiA9IHRoaXMuX2NvbXBvbmVudFNldHRpbmdzLnZlcnNpb24uc3BsaXQoXCIuXCIpO1xyXG5cclxuICAgICAgICBsZXQgc2V0dGluZ1ZlcnNpb25OdW1iZXIgPSBwYXJzZUludChzcGxpdHRlZFNldHRpbmdzVmVyc2lvblswXSwgMTApO1xyXG4gICAgICAgIGxldCBzZXR0aW5nQ29tcG9uZW50TnVtYmVyID0gcGFyc2VJbnQoc3BsaXR0ZWRDb21wb25lbnRWZXJzaW9uWzBdLCAxMCk7XHJcbiAgICAgICAgLy8gQ3VycmVudGx5IG9ubHkgZXF1YWwgdmVyc2lvbnMgYXJlIGFsbG93ZWRcclxuICAgICAgICBpZihzZXR0aW5nVmVyc2lvbk51bWJlciA9PSBzZXR0aW5nQ29tcG9uZW50TnVtYmVyKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgdGhlIGRlZmF1bHQgY29tcG9uZW50IHNldHRpbmdzIHRvIHRoZSBwcm92aWRlclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkRGVmYXVsdENvbXBvbmVudFNldHRpbmdzKCl7XHJcbiAgICAgICAgLy8gSXMgYSBkZWZhdWx0IHBlcnNpc3RpbmcgZGF0YSBpZCBkZWZpbmllZFxyXG4gICAgICAgIGlmKHRoaXMuZGVmYXVsdFNldHRpbmdzRGF0YUlkICE9IFwiXCIpe1xyXG4gICAgICAgICAgICAvLyBJcyBzb21lIGRlZmF1bHQgcGVyc2lzdGluZyBkYXRhIGRlZmluZWRcclxuICAgICAgICAgICAgbGV0IGRlZmF1bHRDb21wb25lbnRTZXR0aW5ncyA9IHRoaXMuX293bmVyLmdldERlZmF1bHRDb21wb25lbnRTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICBpZihkZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIC8vIEFkZCBkZWZhdWx0IHBlcnNpc3RpbmcgZGVmaW5pdGlvbiB0byB0aGUgZGVmYXVsdCBwZXJzaXN0aW5nIGRhdGEgcHJvdmlkZXJcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkRGVmYXVsdENvbXBvbmVudFNldHRpbmdzVG9Qcm92aWRlcih0aGlzLmRlZmF1bHRTZXR0aW5nc0RhdGFJZCwgZGVmYXVsdENvbXBvbmVudFNldHRpbmdzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgdGhlIGdpdmVuIGRlZmF1bHQgY29tcG9uZW50IHNldHRpbmdzIHRvIHRoZSBkZWZhdWx0IHBlcnNpc3RpbmcgZGF0YSBwcm92aWRlcihUT0RPOiBzaG91bGQgYmUgYSBzZXBlcmF0ZWQgZGVmYXVsdCBjb21wb25lbnRTZXR0aW5ncyBwcm92aWRlcilcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkRGVmYXVsdENvbXBvbmVudFNldHRpbmdzVG9Qcm92aWRlcihpZDogc3RyaW5nLCBzZXR0aW5nczogQ29tcG9uZW50U2V0dGluZ3Mpe1xyXG4gICAgICAgIGlmKHNldHRpbmdzID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJObyBkZWZhdWx0IHBlcnNpc3RpbmcgZGF0YSBhdmFpbGFibGUgZm9yIGlkOiBcIiArIGlkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgUGVyc2lzdERhdGFQcm92aWRlci5nZXRJbnN0YW5jZSgpLnNldERlZmF1bHREYXRhV2l0aElkKGlkLCBzZXR0aW5ncyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSAgICBcclxuXHJcbiAgICBwdWJsaWMgYWRkU3ViQ29tcG9uZW50KHR5cGU6IHN0cmluZywgaWQ6IHN0cmluZywgZGVmYXVsdFNldHRpbmdzRGF0YUlkOiBzdHJpbmcgPSBcIlwiLCBjb250ZXh0OiBDb21wb25lbnRDb250ZXh0fHVuZGVmaW5lZCA9IHVuZGVmaW5lZCk6IElDb21wb25lbnR8dW5kZWZpbmVke1xyXG4gICAgICAgIC8vIE9ubHkgYWRkIGR5bmFtaWMgc3ViIGNvbXBvbmVudHMgdG8gY29tcG9uZW50IHNldHRpbmdzIGlmIHRoZXkgc2hvdWxkIGJlIHBlcnNpc3RlZFxyXG4gICAgICAgIC8vIHRoaXMuZ2V0Q29tcG9uZW50U2V0dGluZ3MoKS5hZGRTdWJDb21wb25lbnQodHlwZSwgaWQsIGRlZmF1bHRJbnN0YW5jZURhdGFJZCk7XHJcbiAgICAgICAgbGV0IGluc3RhbmNlID0gdGhpcy5jcmVhdGVDb21wb25lbnRJbnN0YW5jZShuZXcgQ29tcG9uZW50RGVmaW5pdGlvbih0eXBlLCBpZCwgZGVmYXVsdFNldHRpbmdzRGF0YUlkKSwgY29udGV4dCk7XHJcbiAgICAgICAgaWYoaW5zdGFuY2UgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fc3ViQ29tcG9uZW50c1tpbnN0YW5jZS5jb21wb25lbnQuX2RlZmluaXRpb24uaWRdID0gaW5zdGFuY2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgc3ViY29tcG9uZW50IGZvciB0aGUgZ2l2ZW4gaWRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgICAqIEByZXR1cm5zIHtJQ29tcG9uZW50fVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFN1YkNvbXBvbmVudChpZDogc3RyaW5nKTogSUNvbXBvbmVudHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3ViQ29tcG9uZW50c1tpZF07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEJpbmRpbmdzRGF0YSgpe1xyXG4gICAgICAgIC8vIFNldCBiaW5kaW5ncyBuZWVkZWQgZm9yIHRoaXMgY29tcG9uZW50XHJcbiAgICAgICAgbGV0IGJpbmRpbmdzID0gdGhpcy5nZXRTZXR0aW5nKENvbXBvbmVudFNldHRpbmdzLkJpbmRpbmdzU2V0dGluZ0lkKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZUJpbmRpbmdzKGJpbmRpbmdzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHR5cGUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGVmaW5pdGlvbi50eXBlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgdHlwZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fZGVmaW5pdGlvbi50eXBlID0gdmFsdWU7XHJcbiAgICAgICAgLy8gQWRkaXRpb25hbHkgc2V0IHR5cGUgaW4gY29tcG9uZW50U2V0dGluZ3NcclxuICAgICAgICB0aGlzLl9jb21wb25lbnRTZXR0aW5ncy50eXBlID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBpZCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kZWZpbml0aW9uLmlkO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgc2V0IGlkKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9kZWZpbml0aW9uLmlkID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0U2V0dGluZ3NEYXRhIGlkICh0aGUgY29tcG9uZW50IHVzZXMgdGhpcyBkYXRhIGF0IHN0YXJ0dXAgaWYgbm8gcGVyc2l0ZWQgZGF0YSBpcyBhdmFpbGFibGUgZm9yIHRoaXMgY29tcG9uZW50KVxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGRlZmF1bHRTZXR0aW5nc0RhdGFJZCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kZWZpbml0aW9uLmRlZmF1bHRTZXR0aW5nc0RhdGFJZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGRlZmF1bHRTZXR0aW5nc0RhdGFpZCAodGhlIGNvbXBvbmVudCB1c2VzIHRoaXMgZGF0YSBhdCBzdGFydHVwIGlmIG5vIHBlcnNpdGVkIGRhdGEgaXMgYXZhaWxhYmxlIGZvciB0aGlzIGNvbXBvbmVudClcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IGRlZmF1bHRTZXR0aW5nc0RhdGFJZCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fZGVmaW5pdGlvbi5kZWZhdWx0U2V0dGluZ3NEYXRhSWQgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBzZXR0aW5nIGZvciB0aGUgZ2l2ZW4ga2V5XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxyXG4gICAgICogQHJldHVybnMgeyhhbnl8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRTZXR0aW5nKGtleTogc3RyaW5nKTogYW55fHVuZGVmaW5lZHtcclxuICAgICAgICBsZXQgc2V0dGluZyA9IHVuZGVmaW5lZDtcclxuICAgICAgICBpZih0aGlzLl9jb21wb25lbnRTZXR0aW5ncyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBzZXR0aW5nID0gdGhpcy5fY29tcG9uZW50U2V0dGluZ3MuZ2V0VmFsdWUoa2V5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNldHRpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIGEgbmV3IHNldHRpbmcgd2l0aCB0aGUgZ2l2ZW4ga2V5IGFuZCB2YWx1ZSB0byB0aGUgY29tcG9uZW50U2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XHJcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0U2V0dGluZyhrZXk6IHN0cmluZywgdmFsdWU6IGFueSl7XHJcbiAgICAgICAgaWYodGhpcy5fY29tcG9uZW50U2V0dGluZ3MgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2V0dGluZ3Muc2V0VmFsdWUoa2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDb21wb25lbnRTZXR0aW5ncyBub3QgYXZhaWxhYmxlIGZvciBzZXR0aW5nIGRhdGEhXCIpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgY29vbXBvbmVudERlZmluaXRpb24gb2YgdGhpcyBjb21wb25lbnQodHlwZSwgaWQsIGRlZmF1bHREYXRhSWQpXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudERlZmluaXRpb259XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0RGVmaW5pdGlvbigpOiBDb21wb25lbnREZWZpbml0aW9uIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGVmaW5pdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGNvbXBvbmVudERlZmluaXRpb24gb2YgdGhpcyBjb21wb25lbnQodHlwZSwgaWQsIGRlZmF1bHREYXRhSWQpXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtDb21wb25lbnREZWZpbml0aW9ufSB2YWx1ZVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldERlZmluaXRpb24odmFsdWU6IENvbXBvbmVudERlZmluaXRpb24pIHtcclxuICAgICAgICBsZXQgZGVmYXVsdFNldHRpbmdzRGF0YUlkID0gdGhpcy5fZGVmaW5pdGlvbi5kZWZhdWx0U2V0dGluZ3NEYXRhSWQ7XHJcbiAgICAgICAgdGhpcy5fZGVmaW5pdGlvbiA9IHZhbHVlO1xyXG4gICAgICAgIGlmKHRoaXMuX2RlZmluaXRpb24uZGVmYXVsdFNldHRpbmdzRGF0YUlkID09IFwiXCIpe1xyXG4gICAgICAgICAgICB0aGlzLl9kZWZpbml0aW9uLmRlZmF1bHRTZXR0aW5nc0RhdGFJZCA9IGRlZmF1bHRTZXR0aW5nc0RhdGFJZDsgLy8gVXNlIG9sZCBzZXR0aW5ncyBkYXRhIGlkIGlmIG5vdCBkZWZpbmVkIGluIHRoZSBuZXcgb25lXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHNldCB0eXBlIGFsc28gdG8gdGhlIGNvbXBvbmVudCBzZXR0aW5nc1xyXG4gICAgICAgIHRoaXMuX2NvbXBvbmVudFNldHRpbmdzLnR5cGUgPSB0aGlzLl9kZWZpbml0aW9uLnR5cGU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgc3ViY29tcG9uZW50cyB3aXRoIHRoZSBnaXZlbiBzdWJDb21wb25lbnRzIHNldHRpbmdzIGFuZCBhZGRzIHRoZW0gdG8gdGhlIHN1YkNvbXBvbmVudHMgbGlzdFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldFN1YkNvbXBvbmVudHNEYXRhKCl7XHJcbiAgICAgICAgLy8gQ3JlYXRlIHN1YiBjb21wb25lbnRzIG5lZWRlZCBmb3IgdGhpcyBjb21wb25lbnRcclxuICAgICAgICBsZXQgc3ViQ29tcG9uZW50RGVmaW5pdGlvbnMgPSB0aGlzLmdldFNldHRpbmcoQ29tcG9uZW50U2V0dGluZ3MuU3ViQ29tcG9uZW50c1NldHRpbmdJZCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVTdWJDb21wb25lbnRzKHN1YkNvbXBvbmVudERlZmluaXRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgY29tcG9uZW50cyBmb3IgdGhlIGdpdmVuIGNvbXBvbmVudCBkZWZpbml0aW9ucyBhbmQgYWRkIHRoZW0gdG8gdGhlIHN1YiBjb21wb25lbnRzIGxpc3Qgb2YgdGhpcyBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PENvbXBvbmVudERlZmluaXRpb24+fSBjb21wb25lbnREZWZpbml0aW9uc1xyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVTdWJDb21wb25lbnRzKGNvbXBvbmVudERlZmluaXRpb25zOiBBcnJheTxDb21wb25lbnREZWZpbml0aW9uPil7XHJcblx0XHRpZihjb21wb25lbnREZWZpbml0aW9ucyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBjb21wb25lbnREZWZpbml0aW9ucy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29tcG9uZW50RGVmID0gY29tcG9uZW50RGVmaW5pdGlvbnNbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGluc3RhbmNlID0gdGhpcy5jcmVhdGVDb21wb25lbnRJbnN0YW5jZShjb21wb25lbnREZWYsIHRoaXMuY29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICBpZihpbnN0YW5jZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N1YkNvbXBvbmVudHNbaW5zdGFuY2UuY29tcG9uZW50Ll9kZWZpbml0aW9uLmlkXSA9IGluc3RhbmNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgIH1cclxuXHRcdH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBjb21wb25lbnQgaW5zdGFuY2Ugd2l0aCB0aGUgZ2l2ZW4gY29tcG9uZW50IGRlZmluaXRpb24gaWYgdGhlIGNvbXBvbmVudCBmYWN0b3J5IGlzIGF2YWlsYWJsZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudERlZmluaXRpb259IGNvbXBvbmVudERlZlxyXG4gICAgICogQHJldHVybnMgeyhJQ29tcG9uZW50fHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZUNvbXBvbmVudEluc3RhbmNlKGNvbXBvbmVudERlZjogQ29tcG9uZW50RGVmaW5pdGlvbiwgY29udGV4dDogQ29tcG9uZW50Q29udGV4dHx1bmRlZmluZWQpOiBJQ29tcG9uZW50fHVuZGVmaW5lZHtcclxuICAgICAgICBpZih0aGlzLl9jb21wb25lbnRGYWN0b3J5ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGxldCBpbnN0YW5jZTogSUNvbXBvbmVudHx1bmRlZmluZWQgPSB0aGlzLl9jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShjb21wb25lbnREZWYsIGNvbnRleHQpO1xyXG4gICAgICAgICAgICBpZihpbnN0YW5jZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGluc3RhbmNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDb21wb25lbnRGYWN0b3J5IG5vdCBhdmFpbGFibGUhXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgYmluZGluZ3MgYW4gYmluZHMgdGhlbVxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8Q29tcG9uZW50QmluZGluZz59IGJpbmRpbmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZUJpbmRpbmdzKGJpbmRpbmdzOiBBcnJheTxDb21wb25lbnRCaW5kaW5nPil7XHJcblx0XHRpZihiaW5kaW5ncyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBiaW5kaW5ncy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgYmluZGluZyA9IGJpbmRpbmdzW2ldO1xyXG4gICAgICAgICAgICAgICAgLy8gY3JlYXRlIG5ldyBiaW5kaW5nIGZvciB0aGlzIGNvbXBvbmVudCAoYmluZGluZyBjb21wb25lbnQgPSB0aGlzLm93bmVyID0+IGUuZy4gd2lkZ2V0LCBkYXRhbW9kZWwsIC4uLilcclxuICAgICAgICAgICAgICAgIENvbXBvbmVudEJpbmRpbmdzLmNyZWF0ZShiaW5kaW5nLnR5cGUsIGJpbmRpbmcuZGF0YVR5cGUsIHRoaXMuX293bmVyLCBiaW5kaW5nLnNjb3BlLCBiaW5kaW5nLmlkLCBiaW5kaW5nLnRhcmdldEtleSwgYmluZGluZy5zb3VyY2VLZXkpO1xyXG4gICAgICAgICAgIH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IHNldHRpbmdzIGRhdGEgd2hpY2ggc2hvdWxkIGJlIHVzZWQgZm9yIGRlZmF1bHQgc3RhcnR1cCBvZiB0aGlzIGNvbXBvbmVudCBvciB1bmRlZmluZWQgaWYgbm90IGF2YWlsYWJsZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7KENvbXBvbmVudFNldHRpbmdzfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldERlZmF1bHRTZXR0aW5nc0RhdGEoKTogQ29tcG9uZW50U2V0dGluZ3N8dW5kZWZpbmVkIHtcclxuICAgICAgICBpZih0aGlzLl9kZWZpbml0aW9uLmRlZmF1bHRTZXR0aW5nc0RhdGFJZCAhPSBcIlwiKXtcclxuICAgICAgICAgICAgcmV0dXJuIFBlcnNpc3REYXRhUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXREZWZhdWx0RGF0YVdpdGhJZCh0aGlzLl9kZWZpbml0aW9uLmRlZmF1bHRTZXR0aW5nc0RhdGFJZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9IFxyXG59Il19