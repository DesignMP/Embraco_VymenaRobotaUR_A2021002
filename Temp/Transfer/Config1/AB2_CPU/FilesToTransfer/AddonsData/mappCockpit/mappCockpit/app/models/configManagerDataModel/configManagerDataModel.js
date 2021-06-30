var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "./cmGroup", "../dataModelBase", "../dataModelInterface", "../online/mappCockpitComponent", "../online/mappCockpitComponentReflection"], function (require, exports, cmGroup_1, dataModelBase_1, dataModelInterface_1, mappCockpitComponent_1, mappCockpitComponentReflection_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ConfigManagerDataModel = /** @class */ (function (_super) {
        __extends(ConfigManagerDataModel, _super);
        function ConfigManagerDataModel() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._dataModelChangedHandler = function (sender, eventArgs) { _this.handleModelChanged(sender, eventArgs); };
            return _this;
        }
        /**
         * Initialize the configmanager datamodel
         *
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.initialize = function () {
            // watch the data model for change events
            this.eventModelChanged.attach(this._dataModelChangedHandler);
            _super.prototype.initialize.call(this);
        };
        ConfigManagerDataModel.prototype.initializeComponent = function () {
            this.component.disablePersisting();
        };
        /**
         * Dispose the configmanager datamodel
         *
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.dispose = function () {
            this.eventModelChanged.detach(this._dataModelChangedHandler);
        };
        Object.defineProperty(ConfigManagerDataModel.prototype, "configurationParameters", {
            /**
             * Sets the configurationparameters as the data source for the configuration manager datamodel
             *
             * @memberof ConfigManagerDataModel
             */
            set: function (componentParameters) {
                var configurationParameters = componentParameters.value;
                if (configurationParameters.length > 0) {
                    this.onComponentParametersUpdated(configurationParameters);
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Handle component parameters update
         *
         * @param {MappCockpitComponentParameter[]} configParameters
         * @returns {*}
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.onComponentParametersUpdated = function (configParameters) {
            // filter the configuration parameters and update the parameter values
            if (configParameters.length != 0 && configParameters[0] != undefined) {
                var actualComponent = configParameters[0].component;
                this._actualComponentData = configParameters;
                this._data = this.createDataModel(actualComponent.metaData.MetaConfigConfigProps, configParameters);
                this.observeConfigParameters(configParameters);
                this.onModelChanged(this, new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, "componentParametersUpdated", this));
            }
        };
        /**
           * handles the component parameter update.
           *
           * @param {MappCockpitComponentDataModel} sender
           * @param {EventModelChangedArgs} eventArgs
           * @returns {*}
           * @memberof ConfigManagerDataModel
           */
        ConfigManagerDataModel.prototype.handleEventComponentParametersUpdated = function (sender, eventArgs) {
            var componentParameters = eventArgs.data;
            if (componentParameters) {
                var configParameters = mappCockpitComponentReflection_1.MappCockpitComponentParameterInfo.retrieveConfigurationParameters(componentParameters);
                if (configParameters.length > 0) {
                    var actualComponent = configParameters[0].component;
                    this._actualComponentData = configParameters;
                    this._data = this.createDataModel(actualComponent.metaData.MetaConfigConfigProps, configParameters);
                }
                this.onModelChanged(this, new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, "componentParametersUpdated", this));
            }
        };
        /**
         * overrides the onModelItems changed.
         *
         * @param {IDataModel} sender
         * @param {EventModelChangedArgs} data
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.onModelItemsChanged = function (sender, data) {
            // filters the configuration parameters
            this.updateFilterState(this._data, this._actualComponentData);
            _super.prototype.onModelItemsChanged.call(this, sender, data);
        };
        /**
         * handles model changes
         *
         * @param {IDataModel} sender
         * @param {EventModelChangedArgs} eventArgs
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.handleModelChanged = function (sender, eventArgs) {
            var _this = this;
            // external model changes with change type "updateSource" have to be forwarded (written) to the source
            if (eventArgs.caller !== this && eventArgs.changeType === dataModelInterface_1.ModelChangeType.updateSource) {
                console.log("handleModelChanged (%o) : %o", this, eventArgs);
                var modifiedParameter = eventArgs.hint.changedItemData.componentParameter;
                // update the paremeter value
                modifiedParameter.displayValue = eventArgs.hint.newItemData;
                // force writing the parameter value
                modifiedParameter.write(function (reflectedWriteResponseValue) { return _this.onWrittenValueReflected(reflectedWriteResponseValue); });
            }
        };
        /**
         * Called after the written value has been reread (reflected).
         *
         * @private
         * @param {*} reflectedWriteResponseValue
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.onWrittenValueReflected = function (reflectedWriteResponseValue) {
            // after receiving the reflected written value we force refreshing the model/view
            this.updateFilterState(this._data, this._actualComponentData);
            this.onModelChanged(this, new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, "componentParametersUpdated", this));
        };
        ConfigManagerDataModel.prototype.getDataModel = function () {
            this.updateFilterState(this._data, this._actualComponentData);
            return this._data;
        };
        ConfigManagerDataModel.prototype.createDataModel = function (metaInformation, componentDataModel) {
            var _this = this;
            this._metaInformationDataModel = new Array();
            if (metaInformation.ConfigurationStructure != null) {
                if (metaInformation.ConfigurationStructure.Childs != null) {
                    metaInformation.ConfigurationStructure.Childs.forEach(function (element) {
                        _this._metaInformationDataModel.push(new cmGroup_1.CmGroup(element, componentDataModel));
                    });
                }
            }
            return this._metaInformationDataModel;
        };
        ConfigManagerDataModel.prototype.updateFilterState = function (dataModel, componentParameters) {
            var _this = this;
            dataModel.forEach(function (element) {
                if (element instanceof cmGroup_1.CmGroup) {
                    if (element.filter != null) {
                        _this.updateFilter(element.filter, componentParameters);
                    }
                    if (element.childs != null) {
                        _this.updateFilterState(element.childs, componentParameters);
                    }
                }
                else {
                    if (element.filter != null) {
                        _this.updateFilter(element.filter, componentParameters);
                    }
                }
            });
        };
        ConfigManagerDataModel.prototype.updateFilter = function (filter, componentParameters) {
            filter.active = false;
            if (filter.parameterRef == "" && filter.parameterValue == undefined && filter.parameterValues == undefined) {
                return; // No filter defined
            }
            var paramValue = this.getParameterValueFromSource(filter.parameterRef, componentParameters);
            if (paramValue == undefined) {
                filter.active = true;
                return;
            }
            if (filter.parameterValue != undefined) {
                // Check single parameterValue filter
                if (paramValue != filter.parameterValue) {
                    filter.active = true;
                }
            }
            else if (filter.parameterValues != undefined) {
                // Check multiple parameterValue filter
                filter.active = true;
                filter.parameterValues.forEach(function (filterParamValue) {
                    if (filterParamValue == paramValue) {
                        filter.active = false;
                    }
                });
            }
        };
        ConfigManagerDataModel.prototype.getParameterValueFromSource = function (parameterRef, componentParameters) {
            if (componentParameters == null) {
                return undefined;
            }
            for (var _i = 0, componentParameters_1 = componentParameters; _i < componentParameters_1.length; _i++) {
                var parameter = componentParameters_1[_i];
                if (parameter._reference.browseName == parameterRef)
                    return parameter.value;
            }
            return undefined;
        };
        /**
         * Observes the config parameters for changes
         *
         * @param {MappCockpitComponentParameter[]} configParameters
         * @returns {*}
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.observeConfigParameters = function (configParameters) {
            // observe component write access
            this.observeComponentWriteAccess(configParameters);
            // invoke observing the config parameters
            mappCockpitComponent_1.MappCockpitComponentParameter.observeParameterValueChanges(this, configParameters);
        };
        /**
         * handles observable changes
         *
         * @param {Observable[]} changedObservables
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.onObservablesChanged = function (changedObservables) {
            console.log("onObservablesChanged: %o %o", this, changedObservables);
            this.updateFilterState(this._data, this._actualComponentData);
            this.onModelChanged(this, new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, "componentParametersUpdated", this));
        };
        /**
         * Observes if the component changes the write access
         *
         * @param {MappCockpitComponentParameter[]} configParameters
         * @returns {*}
         * @memberof ConfigManagerDataModel
         */
        ConfigManagerDataModel.prototype.observeComponentWriteAccess = function (configParameters) {
            var _this = this;
            // we use a single parameter to get the parent component and observe changes of the write acces value.
            configParameters[0].component.writeAccess.changed(function () {
                _this.onModelChanged(_this, new dataModelInterface_1.EventModelChangedArgs(_this, dataModelInterface_1.ModelChangeType.updateTarget, "componentParametersUpdated", _this));
            });
        };
        return ConfigManagerDataModel;
    }(dataModelBase_1.DataModelBase));
    exports.ConfigManagerDataModel = ConfigManagerDataModel;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnTWFuYWdlckRhdGFNb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbmZpZ01hbmFnZXJEYXRhTW9kZWwvY29uZmlnTWFuYWdlckRhdGFNb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBYUE7UUFBNEMsMENBQWE7UUFBekQ7WUFBQSxxRUF5UEM7WUFuUFMsOEJBQXdCLEdBQUcsVUFBQyxNQUFNLEVBQUUsU0FBUyxJQUFPLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUM7O1FBbVAzRyxDQUFDO1FBalBDOzs7O1dBSUc7UUFDSCwyQ0FBVSxHQUFWO1lBQ0UseUNBQXlDO1lBQ3pDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDN0QsaUJBQU0sVUFBVSxXQUFFLENBQUM7UUFDckIsQ0FBQztRQUVELG9EQUFtQixHQUFuQjtZQUNFLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUNyQyxDQUFDO1FBRUQ7Ozs7V0FJRztRQUNILHdDQUFPLEdBQVA7WUFDRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQy9ELENBQUM7UUFPRCxzQkFBVywyREFBdUI7WUFMbEM7Ozs7ZUFJRztpQkFDSCxVQUFtQyxtQkFBbUU7Z0JBQ3BHLElBQUksdUJBQXVCLEdBQUcsbUJBQW1CLENBQUMsS0FBSyxDQUFDO2dCQUN4RCxJQUFJLHVCQUF1QixDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQ3RDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO2lCQUM1RDtZQUNILENBQUM7OztXQUFBO1FBRUQ7Ozs7OztXQU1HO1FBQ0gs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QUFLLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDOUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSwwQ0FBcUIsQ0FBQyxJQUFJLEVBQUUsb0NBQWUsQ0FBQyxZQUFZLEVBQUUsNEJBQTRCLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMvSCxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0gsNERBQTJCLEdBQTNCLFVBQTRCLGdCQUFpRDtZQUE3RSxpQkFLQztZQUpDLHNHQUFzRztZQUMvRSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFVLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQztnQkFDeEUsS0FBSSxDQUFDLGNBQWMsQ0FBQyxLQUFJLEVBQUUsSUFBSSwwQ0FBcUIsQ0FBQyxLQUFJLEVBQUUsb0NBQWUsQ0FBQyxZQUFZLEVBQUUsNEJBQTRCLEVBQUUsS0FBSSxDQUFDLENBQUMsQ0FBQztZQUMvSCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFDSCw2QkFBQztJQUFELENBQUMsQUF6UEQsQ0FBNEMsNkJBQWEsR0F5UHhEO0lBelBZLHdEQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDbUdyb3VwIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9jbUdyb3VwSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IENtR3JvdXAgfSBmcm9tIFwiLi9jbUdyb3VwXCI7XHJcbmltcG9ydCB7IElDbUZpbHRlciB9IGZyb20gXCIuL2ludGVyZmFjZXMvY21GaWx0ZXJJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSUNtUGFyYW1ldGVyIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9jbVBhcmFtZXRlckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBEYXRhTW9kZWxCYXNlIH0gZnJvbSBcIi4uL2RhdGFNb2RlbEJhc2VcIjtcclxuaW1wb3J0IHsgSUNvbmZpZ01hbmFnZXJEYXRhTW9kZWwgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL2NvbmZpZ01hbmFnZXJEYXRhTW9kZWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWwgfSBmcm9tIFwiLi4vb25saW5lL2NvbXBvbmVudHNEYXRhTW9kZWxcIjtcclxuaW1wb3J0IHsgRXZlbnRNb2RlbENoYW5nZWRBcmdzLCBNb2RlbENoYW5nZVR5cGUsIElEYXRhTW9kZWwgfSBmcm9tIFwiLi4vZGF0YU1vZGVsSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyLCBNYXBwQ29ja3BpdENvbXBvbmVudCB9IGZyb20gXCIuLi9vbmxpbmUvbWFwcENvY2twaXRDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvIH0gZnJvbSBcIi4uL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudFJlZmxlY3Rpb25cIjtcclxuaW1wb3J0IHsgUHJvcGVydHkgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL3Byb3BlcnR5XCI7XHJcbmltcG9ydCB7IElPYnNlcnZlciwgT2JzZXJ2YWJsZSB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvaW50ZXJmYWNlcy9vYnNlcnZlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbmZpZ01hbmFnZXJEYXRhTW9kZWwgZXh0ZW5kcyBEYXRhTW9kZWxCYXNlIGltcGxlbWVudHMgSUNvbmZpZ01hbmFnZXJEYXRhTW9kZWwsSU9ic2VydmVyIHtcclxuXHJcbiAgcHJpdmF0ZSBfYWN0dWFsQ29tcG9uZW50RGF0YTtcclxuXHJcbiAgcHJpdmF0ZSBfbWV0YUluZm9ybWF0aW9uRGF0YU1vZGVsO1xyXG5cclxuICBwcml2YXRlIF9kYXRhTW9kZWxDaGFuZ2VkSGFuZGxlciA9IChzZW5kZXIsIGV2ZW50QXJncykgPT4geyB0aGlzLmhhbmRsZU1vZGVsQ2hhbmdlZChzZW5kZXIsIGV2ZW50QXJncykgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdGlhbGl6ZSB0aGUgY29uZmlnbWFuYWdlciBkYXRhbW9kZWxcclxuICAgKlxyXG4gICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgaW5pdGlhbGl6ZSgpIHtcclxuICAgIC8vIHdhdGNoIHRoZSBkYXRhIG1vZGVsIGZvciBjaGFuZ2UgZXZlbnRzXHJcbiAgICB0aGlzLmV2ZW50TW9kZWxDaGFuZ2VkLmF0dGFjaCh0aGlzLl9kYXRhTW9kZWxDaGFuZ2VkSGFuZGxlcik7XHJcbiAgICBzdXBlci5pbml0aWFsaXplKCk7XHJcbiAgfVxyXG5cclxuICBpbml0aWFsaXplQ29tcG9uZW50KCl7XHJcbiAgICB0aGlzLmNvbXBvbmVudC5kaXNhYmxlUGVyc2lzdGluZygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGlzcG9zZSB0aGUgY29uZmlnbWFuYWdlciBkYXRhbW9kZWxcclxuICAgKlxyXG4gICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgZGlzcG9zZSgpe1xyXG4gICAgdGhpcy5ldmVudE1vZGVsQ2hhbmdlZC5kZXRhY2godGhpcy5fZGF0YU1vZGVsQ2hhbmdlZEhhbmRsZXIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgY29uZmlndXJhdGlvbnBhcmFtZXRlcnMgYXMgdGhlIGRhdGEgc291cmNlIGZvciB0aGUgY29uZmlndXJhdGlvbiBtYW5hZ2VyIGRhdGFtb2RlbFxyXG4gICAqXHJcbiAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBwdWJsaWMgc2V0IGNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzKGNvbXBvbmVudFBhcmFtZXRlcnM6IFByb3BlcnR5PEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPj4pIHtcclxuICAgIGxldCBjb25maWd1cmF0aW9uUGFyYW1ldGVycyA9IGNvbXBvbmVudFBhcmFtZXRlcnMudmFsdWU7XHJcbiAgICBpZiAoY29uZmlndXJhdGlvblBhcmFtZXRlcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICB0aGlzLm9uQ29tcG9uZW50UGFyYW1ldGVyc1VwZGF0ZWQoY29uZmlndXJhdGlvblBhcmFtZXRlcnMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlIGNvbXBvbmVudCBwYXJhbWV0ZXJzIHVwZGF0ZVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSBjb25maWdQYXJhbWV0ZXJzXHJcbiAgICogQHJldHVybnMgeyp9XHJcbiAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBvbkNvbXBvbmVudFBhcmFtZXRlcnNVcGRhdGVkKGNvbmZpZ1BhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pOiBhbnkge1xyXG4gICAgLy8gZmlsdGVyIHRoZSBjb25maWd1cmF0aW9uIHBhcmFtZXRlcnMgYW5kIHVwZGF0ZSB0aGUgcGFyYW1ldGVyIHZhbHVlc1xyXG4gICAgaWYgKGNvbmZpZ1BhcmFtZXRlcnMubGVuZ3RoICE9IDAgJiYgY29uZmlnUGFyYW1ldGVyc1swXSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgdmFyIGFjdHVhbENvbXBvbmVudCA9IChjb25maWdQYXJhbWV0ZXJzWzBdLmNvbXBvbmVudCBhcyBNYXBwQ29ja3BpdENvbXBvbmVudCk7XHJcblxyXG4gICAgICB0aGlzLl9hY3R1YWxDb21wb25lbnREYXRhID0gY29uZmlnUGFyYW1ldGVycztcclxuICAgICAgdGhpcy5fZGF0YSA9IHRoaXMuY3JlYXRlRGF0YU1vZGVsKCg8YW55PmFjdHVhbENvbXBvbmVudC5tZXRhRGF0YSkuTWV0YUNvbmZpZ0NvbmZpZ1Byb3BzLCBjb25maWdQYXJhbWV0ZXJzKTtcclxuICAgICAgdGhpcy5vYnNlcnZlQ29uZmlnUGFyYW1ldGVycyhjb25maWdQYXJhbWV0ZXJzKTtcclxuXHJcbiAgICAgIHRoaXMub25Nb2RlbENoYW5nZWQodGhpcywgbmV3IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyh0aGlzLCBNb2RlbENoYW5nZVR5cGUudXBkYXRlVGFyZ2V0LCBcImNvbXBvbmVudFBhcmFtZXRlcnNVcGRhdGVkXCIsIHRoaXMpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAgICogaGFuZGxlcyB0aGUgY29tcG9uZW50IHBhcmFtZXRlciB1cGRhdGUuIFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWx9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHtFdmVudE1vZGVsQ2hhbmdlZEFyZ3N9IGV2ZW50QXJnc1xyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlckRhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgaGFuZGxlRXZlbnRDb21wb25lbnRQYXJhbWV0ZXJzVXBkYXRlZChzZW5kZXI6IE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsLCBldmVudEFyZ3M6IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyk6IGFueSB7XHJcbiAgICBsZXQgY29tcG9uZW50UGFyYW1ldGVycyA9IGV2ZW50QXJncy5kYXRhIGFzIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW107XHJcbiAgICBpZiAoY29tcG9uZW50UGFyYW1ldGVycykge1xyXG4gICAgICBsZXQgY29uZmlnUGFyYW1ldGVycyA9IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mby5yZXRyaWV2ZUNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzKGNvbXBvbmVudFBhcmFtZXRlcnMpO1xyXG4gICAgICBpZiAoY29uZmlnUGFyYW1ldGVycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgdmFyIGFjdHVhbENvbXBvbmVudCA9IChjb25maWdQYXJhbWV0ZXJzWzBdLmNvbXBvbmVudCBhcyBNYXBwQ29ja3BpdENvbXBvbmVudCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2FjdHVhbENvbXBvbmVudERhdGEgPSBjb25maWdQYXJhbWV0ZXJzO1xyXG4gICAgICAgIHRoaXMuX2RhdGEgPSB0aGlzLmNyZWF0ZURhdGFNb2RlbCgoPGFueT5hY3R1YWxDb21wb25lbnQubWV0YURhdGEpLk1ldGFDb25maWdDb25maWdQcm9wcywgY29uZmlnUGFyYW1ldGVycyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMub25Nb2RlbENoYW5nZWQodGhpcywgbmV3IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyh0aGlzLCBNb2RlbENoYW5nZVR5cGUudXBkYXRlVGFyZ2V0LCBcImNvbXBvbmVudFBhcmFtZXRlcnNVcGRhdGVkXCIsIHRoaXMpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIG92ZXJyaWRlcyB0aGUgb25Nb2RlbEl0ZW1zIGNoYW5nZWQuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0lEYXRhTW9kZWx9IHNlbmRlclxyXG4gICAqIEBwYXJhbSB7RXZlbnRNb2RlbENoYW5nZWRBcmdzfSBkYXRhXHJcbiAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBvbk1vZGVsSXRlbXNDaGFuZ2VkKHNlbmRlcjogSURhdGFNb2RlbCwgZGF0YTogRXZlbnRNb2RlbENoYW5nZWRBcmdzKSB7XHJcbiAgICAvLyBmaWx0ZXJzIHRoZSBjb25maWd1cmF0aW9uIHBhcmFtZXRlcnNcclxuICAgIHRoaXMudXBkYXRlRmlsdGVyU3RhdGUodGhpcy5fZGF0YSwgdGhpcy5fYWN0dWFsQ29tcG9uZW50RGF0YSk7XHJcbiAgICBzdXBlci5vbk1vZGVsSXRlbXNDaGFuZ2VkKHNlbmRlciwgZGF0YSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBoYW5kbGVzIG1vZGVsIGNoYW5nZXNcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7SURhdGFNb2RlbH0gc2VuZGVyXHJcbiAgICogQHBhcmFtIHtFdmVudE1vZGVsQ2hhbmdlZEFyZ3N9IGV2ZW50QXJnc1xyXG4gICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgaGFuZGxlTW9kZWxDaGFuZ2VkKHNlbmRlcjogSURhdGFNb2RlbCwgZXZlbnRBcmdzOiBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MpIHtcclxuXHJcbiAgICAvLyBleHRlcm5hbCBtb2RlbCBjaGFuZ2VzIHdpdGggY2hhbmdlIHR5cGUgXCJ1cGRhdGVTb3VyY2VcIiBoYXZlIHRvIGJlIGZvcndhcmRlZCAod3JpdHRlbikgdG8gdGhlIHNvdXJjZVxyXG4gICAgaWYgKGV2ZW50QXJncy5jYWxsZXIgIT09IHRoaXMgJiYgZXZlbnRBcmdzLmNoYW5nZVR5cGUgPT09IE1vZGVsQ2hhbmdlVHlwZS51cGRhdGVTb3VyY2UpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJoYW5kbGVNb2RlbENoYW5nZWQgKCVvKSA6ICVvXCIsIHRoaXMsIGV2ZW50QXJncyk7XHJcblxyXG4gICAgICBsZXQgbW9kaWZpZWRQYXJhbWV0ZXIgPSBldmVudEFyZ3MuaGludC5jaGFuZ2VkSXRlbURhdGEuY29tcG9uZW50UGFyYW1ldGVyIGFzIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyO1xyXG4gICAgICAvLyB1cGRhdGUgdGhlIHBhcmVtZXRlciB2YWx1ZVxyXG4gICAgICBtb2RpZmllZFBhcmFtZXRlci5kaXNwbGF5VmFsdWUgPSBldmVudEFyZ3MuaGludC5uZXdJdGVtRGF0YTtcclxuICAgICAgXHJcbiAgICAgIC8vIGZvcmNlIHdyaXRpbmcgdGhlIHBhcmFtZXRlciB2YWx1ZVxyXG4gICAgICBtb2RpZmllZFBhcmFtZXRlci53cml0ZSgocmVmbGVjdGVkV3JpdGVSZXNwb25zZVZhbHVlKT0+dGhpcy5vbldyaXR0ZW5WYWx1ZVJlZmxlY3RlZChyZWZsZWN0ZWRXcml0ZVJlc3BvbnNlVmFsdWUpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbGxlZCBhZnRlciB0aGUgd3JpdHRlbiB2YWx1ZSBoYXMgYmVlbiByZXJlYWQgKHJlZmxlY3RlZCkuXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIEBwYXJhbSB7Kn0gcmVmbGVjdGVkV3JpdGVSZXNwb25zZVZhbHVlXHJcbiAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBwcml2YXRlIG9uV3JpdHRlblZhbHVlUmVmbGVjdGVkKHJlZmxlY3RlZFdyaXRlUmVzcG9uc2VWYWx1ZSl7XHJcbiAgICAvLyBhZnRlciByZWNlaXZpbmcgdGhlIHJlZmxlY3RlZCB3cml0dGVuIHZhbHVlIHdlIGZvcmNlIHJlZnJlc2hpbmcgdGhlIG1vZGVsL3ZpZXdcclxuICAgIHRoaXMudXBkYXRlRmlsdGVyU3RhdGUodGhpcy5fZGF0YSwgdGhpcy5fYWN0dWFsQ29tcG9uZW50RGF0YSk7XHJcbiAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKHRoaXMsIG5ldyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3ModGhpcywgTW9kZWxDaGFuZ2VUeXBlLnVwZGF0ZVRhcmdldCwgXCJjb21wb25lbnRQYXJhbWV0ZXJzVXBkYXRlZFwiLCB0aGlzKSk7XHJcbiAgfVxyXG5cclxuICBnZXREYXRhTW9kZWwoKTogSUNtR3JvdXBbXSB7XHJcbiAgICB0aGlzLnVwZGF0ZUZpbHRlclN0YXRlKHRoaXMuX2RhdGEsIHRoaXMuX2FjdHVhbENvbXBvbmVudERhdGEpO1xyXG4gICAgcmV0dXJuIHRoaXMuX2RhdGE7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZURhdGFNb2RlbChtZXRhSW5mb3JtYXRpb246IGFueSwgY29tcG9uZW50RGF0YU1vZGVsOiBhbnkpOiBBcnJheTxJQ21Hcm91cD4ge1xyXG4gICAgdGhpcy5fbWV0YUluZm9ybWF0aW9uRGF0YU1vZGVsID0gbmV3IEFycmF5PElDbUdyb3VwPigpO1xyXG4gICAgaWYgKG1ldGFJbmZvcm1hdGlvbi5Db25maWd1cmF0aW9uU3RydWN0dXJlICE9IG51bGwpIHtcclxuICAgICAgaWYgKG1ldGFJbmZvcm1hdGlvbi5Db25maWd1cmF0aW9uU3RydWN0dXJlLkNoaWxkcyAhPSBudWxsKSB7XHJcbiAgICAgICAgbWV0YUluZm9ybWF0aW9uLkNvbmZpZ3VyYXRpb25TdHJ1Y3R1cmUuQ2hpbGRzLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICB0aGlzLl9tZXRhSW5mb3JtYXRpb25EYXRhTW9kZWwucHVzaChuZXcgQ21Hcm91cChlbGVtZW50LCBjb21wb25lbnREYXRhTW9kZWwpKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5fbWV0YUluZm9ybWF0aW9uRGF0YU1vZGVsO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB1cGRhdGVGaWx0ZXJTdGF0ZShkYXRhTW9kZWw6IElDbVBhcmFtZXRlcltdLCBjb21wb25lbnRQYXJhbWV0ZXJzKSB7XHJcbiAgICBkYXRhTW9kZWwuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBDbUdyb3VwKSB7XHJcbiAgICAgICAgaWYgKGVsZW1lbnQuZmlsdGVyICE9IG51bGwpIHtcclxuICAgICAgICAgIHRoaXMudXBkYXRlRmlsdGVyKGVsZW1lbnQuZmlsdGVyLCBjb21wb25lbnRQYXJhbWV0ZXJzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGVsZW1lbnQuY2hpbGRzICE9IG51bGwpIHtcclxuICAgICAgICAgIHRoaXMudXBkYXRlRmlsdGVyU3RhdGUoZWxlbWVudC5jaGlsZHMsIGNvbXBvbmVudFBhcmFtZXRlcnMpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICBpZiAoZWxlbWVudC5maWx0ZXIgIT0gbnVsbCkge1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVGaWx0ZXIoZWxlbWVudC5maWx0ZXIsIGNvbXBvbmVudFBhcmFtZXRlcnMpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHVwZGF0ZUZpbHRlcihmaWx0ZXI6IElDbUZpbHRlciwgY29tcG9uZW50UGFyYW1ldGVycykge1xyXG4gICAgZmlsdGVyLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgaWYgKGZpbHRlci5wYXJhbWV0ZXJSZWYgPT0gXCJcIiAmJiBmaWx0ZXIucGFyYW1ldGVyVmFsdWUgPT0gdW5kZWZpbmVkICYmIGZpbHRlci5wYXJhbWV0ZXJWYWx1ZXMgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybjsgLy8gTm8gZmlsdGVyIGRlZmluZWRcclxuICAgIH1cclxuXHJcbiAgICB2YXIgcGFyYW1WYWx1ZSA9IHRoaXMuZ2V0UGFyYW1ldGVyVmFsdWVGcm9tU291cmNlKGZpbHRlci5wYXJhbWV0ZXJSZWYsIGNvbXBvbmVudFBhcmFtZXRlcnMpO1xyXG4gICAgaWYgKHBhcmFtVmFsdWUgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGZpbHRlci5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoZmlsdGVyLnBhcmFtZXRlclZhbHVlICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAvLyBDaGVjayBzaW5nbGUgcGFyYW1ldGVyVmFsdWUgZmlsdGVyXHJcbiAgICAgIGlmIChwYXJhbVZhbHVlICE9IGZpbHRlci5wYXJhbWV0ZXJWYWx1ZSkge1xyXG4gICAgICAgIGZpbHRlci5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChmaWx0ZXIucGFyYW1ldGVyVmFsdWVzICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAvLyBDaGVjayBtdWx0aXBsZSBwYXJhbWV0ZXJWYWx1ZSBmaWx0ZXJcclxuICAgICAgZmlsdGVyLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIGZpbHRlci5wYXJhbWV0ZXJWYWx1ZXMuZm9yRWFjaChmaWx0ZXJQYXJhbVZhbHVlID0+IHtcclxuICAgICAgICBpZiAoZmlsdGVyUGFyYW1WYWx1ZSA9PSBwYXJhbVZhbHVlKSB7XHJcbiAgICAgICAgICBmaWx0ZXIuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0UGFyYW1ldGVyVmFsdWVGcm9tU291cmNlKHBhcmFtZXRlclJlZjogYW55LCBjb21wb25lbnRQYXJhbWV0ZXJzKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcclxuICAgIGlmIChjb21wb25lbnRQYXJhbWV0ZXJzID09IG51bGwpIHtcclxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBwYXJhbWV0ZXIgb2YgY29tcG9uZW50UGFyYW1ldGVycykge1xyXG4gICAgICBpZiAocGFyYW1ldGVyLl9yZWZlcmVuY2UuYnJvd3NlTmFtZSA9PSBwYXJhbWV0ZXJSZWYpXHJcbiAgICAgICAgcmV0dXJuIHBhcmFtZXRlci52YWx1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZlcyB0aGUgY29uZmlnIHBhcmFtZXRlcnMgZm9yIGNoYW5nZXNcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gY29uZmlnUGFyYW1ldGVyc1xyXG4gICAqIEByZXR1cm5zIHsqfVxyXG4gICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgb2JzZXJ2ZUNvbmZpZ1BhcmFtZXRlcnMoY29uZmlnUGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSk6IGFueSB7XHJcbiAgICAvLyBvYnNlcnZlIGNvbXBvbmVudCB3cml0ZSBhY2Nlc3NcclxuICAgIHRoaXMub2JzZXJ2ZUNvbXBvbmVudFdyaXRlQWNjZXNzKGNvbmZpZ1BhcmFtZXRlcnMpO1xyXG4gICAgLy8gaW52b2tlIG9ic2VydmluZyB0aGUgY29uZmlnIHBhcmFtZXRlcnNcclxuICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyLm9ic2VydmVQYXJhbWV0ZXJWYWx1ZUNoYW5nZXModGhpcyxjb25maWdQYXJhbWV0ZXJzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGhhbmRsZXMgb2JzZXJ2YWJsZSBjaGFuZ2VzXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge09ic2VydmFibGVbXX0gY2hhbmdlZE9ic2VydmFibGVzXHJcbiAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBvbk9ic2VydmFibGVzQ2hhbmdlZChjaGFuZ2VkT2JzZXJ2YWJsZXM6IE9ic2VydmFibGVbXSkge1xyXG4gICAgY29uc29sZS5sb2coXCJvbk9ic2VydmFibGVzQ2hhbmdlZDogJW8gJW9cIix0aGlzLGNoYW5nZWRPYnNlcnZhYmxlcyk7XHJcbiAgICB0aGlzLnVwZGF0ZUZpbHRlclN0YXRlKHRoaXMuX2RhdGEsIHRoaXMuX2FjdHVhbENvbXBvbmVudERhdGEpO1xyXG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLCBuZXcgRXZlbnRNb2RlbENoYW5nZWRBcmdzKHRoaXMsIE1vZGVsQ2hhbmdlVHlwZS51cGRhdGVUYXJnZXQsIFwiY29tcG9uZW50UGFyYW1ldGVyc1VwZGF0ZWRcIiwgdGhpcykpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT2JzZXJ2ZXMgaWYgdGhlIGNvbXBvbmVudCBjaGFuZ2VzIHRoZSB3cml0ZSBhY2Nlc3NcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gY29uZmlnUGFyYW1ldGVyc1xyXG4gICAqIEByZXR1cm5zIHsqfVxyXG4gICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgb2JzZXJ2ZUNvbXBvbmVudFdyaXRlQWNjZXNzKGNvbmZpZ1BhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pOiBhbnkge1xyXG4gICAgLy8gd2UgdXNlIGEgc2luZ2xlIHBhcmFtZXRlciB0byBnZXQgdGhlIHBhcmVudCBjb21wb25lbnQgYW5kIG9ic2VydmUgY2hhbmdlcyBvZiB0aGUgd3JpdGUgYWNjZXMgdmFsdWUuXHJcbiAgICAoPE1hcHBDb2NrcGl0Q29tcG9uZW50PmNvbmZpZ1BhcmFtZXRlcnNbMF0uY29tcG9uZW50KS53cml0ZUFjY2Vzcy5jaGFuZ2VkKCgpID0+IHtcclxuICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLCBuZXcgRXZlbnRNb2RlbENoYW5nZWRBcmdzKHRoaXMsIE1vZGVsQ2hhbmdlVHlwZS51cGRhdGVUYXJnZXQsIFwiY29tcG9uZW50UGFyYW1ldGVyc1VwZGF0ZWRcIiwgdGhpcykpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59Il19