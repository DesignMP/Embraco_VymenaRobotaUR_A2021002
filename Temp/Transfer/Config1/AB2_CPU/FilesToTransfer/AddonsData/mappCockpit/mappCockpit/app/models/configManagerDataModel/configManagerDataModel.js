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
         * @param {MappCockpitComponentParameter[]} componentParaonnectconmeters
         * @param {MappCockpitComponentParameter[]} componentParameters
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
            this.metaInformationDataModel = new Array();
            if (metaInformation.ConfigurationStructure != null) {
                if (metaInformation.ConfigurationStructure.Childs != null) {
                    metaInformation.ConfigurationStructure.Childs.forEach(function (element) {
                        _this.metaInformationDataModel.push(new cmGroup_1.CmGroup(element, componentDataModel));
                    });
                }
            }
            return this.metaInformationDataModel;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnTWFuYWdlckRhdGFNb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbmZpZ01hbmFnZXJEYXRhTW9kZWwvY29uZmlnTWFuYWdlckRhdGFNb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBY0E7UUFBNEMsMENBQWE7UUFBekQ7WUFBQSxxRUErUEM7WUF4UFMsOEJBQXdCLEdBQUcsVUFBQyxNQUFNLEVBQUUsU0FBUyxJQUFPLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUM7O1FBd1AzRyxDQUFDO1FBdFBDOzs7O1dBSUc7UUFDSCwyQ0FBVSxHQUFWO1lBRUUseUNBQXlDO1lBQ3pDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDL0QsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSCx3Q0FBTyxHQUFQO1lBQ0UsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUMvRCxDQUFDO1FBT0Qsc0JBQVcsMkRBQXVCO1lBTGxDOzs7O2VBSUc7aUJBQ0gsVUFBbUMsbUJBQW1FO2dCQUVwRyxJQUFJLHVCQUF1QixHQUFHLG1CQUFtQixDQUFDLEtBQUssQ0FBQztnQkFFeEQsSUFBSSx1QkFBdUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUN0QyxJQUFJLENBQUMsNEJBQTRCLENBQUMsdUJBQXVCLENBQUMsQ0FBQztpQkFDNUQ7WUFDSCxDQUFDOzs7V0FBQTtRQUVEOzs7Ozs7O1dBT0c7UUFDSCw2REFBNEIsR0FBNUIsVUFBNkIsZ0JBQWlEO1lBQzVFLHNFQUFzRTtZQUN0RSxJQUFJLGdCQUFnQixDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksZ0JBQWdCLENBQUMsQ0FB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RSxvQ0FBZSxDQUFDLFlBQVksRUFBRSw0QkFBNEIsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQy9ILENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSCw0REFBMkIsR0FBM0IsVUFBNEIsZ0JBQWlEO1lBQTdFLGlCQUtDO1lBSkMsc0dBQXNHO1lBQy9FLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDO2dCQUN4RSxLQUFJLENBQUMsY0FBYyxDQUFDLEtBQUksRUFBRSxJQUFJLDBDQUFxQixDQUFDLEtBQUksRUFBRSxvQ0FBZSxDQUFDLFlBQVksRUFBRSw0QkFBNEIsRUFBRSxLQUFJLENBQUMsQ0FBQyxDQUFDO1lBQy9ILENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUVILDZCQUFDO0lBQUQsQ0FBQyxBQS9QRCxDQUE0Qyw2QkFBYSxHQStQeEQ7SUEvUFksd0RBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IElDbUdyb3VwIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9jbUdyb3VwSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IENtR3JvdXAgfSBmcm9tIFwiLi9jbUdyb3VwXCI7XHJcbmltcG9ydCB7IElDbUZpbHRlciB9IGZyb20gXCIuL2ludGVyZmFjZXMvY21GaWx0ZXJJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSUNtUGFyYW1ldGVyIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9jbVBhcmFtZXRlckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBEYXRhTW9kZWxCYXNlIH0gZnJvbSBcIi4uL2RhdGFNb2RlbEJhc2VcIjtcclxuaW1wb3J0IHsgSUNvbmZpZ01hbmFnZXJEYXRhTW9kZWwgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL2NvbmZpZ01hbmFnZXJEYXRhTW9kZWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWwgfSBmcm9tIFwiLi4vb25saW5lL2NvbXBvbmVudHNEYXRhTW9kZWxcIjtcclxuaW1wb3J0IHsgRXZlbnRNb2RlbENoYW5nZWRBcmdzLCBNb2RlbENoYW5nZVR5cGUsIElEYXRhTW9kZWwgfSBmcm9tIFwiLi4vZGF0YU1vZGVsSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyLCBNYXBwQ29ja3BpdENvbXBvbmVudCB9IGZyb20gXCIuLi9vbmxpbmUvbWFwcENvY2twaXRDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvIH0gZnJvbSBcIi4uL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudFJlZmxlY3Rpb25cIjtcclxuaW1wb3J0IHsgUHJvcGVydHkgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL3Byb3BlcnR5XCI7XHJcbmltcG9ydCB7IElPYnNlcnZlciwgT2JzZXJ2YWJsZSB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvaW50ZXJmYWNlcy9vYnNlcnZlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbmZpZ01hbmFnZXJEYXRhTW9kZWwgZXh0ZW5kcyBEYXRhTW9kZWxCYXNlIGltcGxlbWVudHMgSUNvbmZpZ01hbmFnZXJEYXRhTW9kZWwsSU9ic2VydmVyIHtcclxuXHJcblxyXG4gIHByaXZhdGUgX2FjdHVhbENvbXBvbmVudERhdGE7XHJcblxyXG4gIHByaXZhdGUgbWV0YUluZm9ybWF0aW9uRGF0YU1vZGVsO1xyXG5cclxuICBwcml2YXRlIF9kYXRhTW9kZWxDaGFuZ2VkSGFuZGxlciA9IChzZW5kZXIsIGV2ZW50QXJncykgPT4geyB0aGlzLmhhbmRsZU1vZGVsQ2hhbmdlZChzZW5kZXIsIGV2ZW50QXJncykgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdGlhbGl6ZSB0aGUgY29uZmlnbWFuYWdlciBkYXRhbW9kZWxcclxuICAgKlxyXG4gICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgaW5pdGlhbGl6ZSgpIHtcclxuXHJcbiAgICAvLyB3YXRjaCB0aGUgZGF0YSBtb2RlbCBmb3IgY2hhbmdlIGV2ZW50c1xyXG4gICAgdGhpcy5ldmVudE1vZGVsQ2hhbmdlZC5hdHRhY2godGhpcy5fZGF0YU1vZGVsQ2hhbmdlZEhhbmRsZXIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGlzcG9zZSB0aGUgY29uZmlnbWFuYWdlciBkYXRhbW9kZWxcclxuICAgKlxyXG4gICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgZGlzcG9zZSgpe1xyXG4gICAgdGhpcy5ldmVudE1vZGVsQ2hhbmdlZC5kZXRhY2godGhpcy5fZGF0YU1vZGVsQ2hhbmdlZEhhbmRsZXIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgY29uZmlndXJhdGlvbnBhcmFtZXRlcnMgYXMgdGhlIGRhdGEgc291cmNlIGZvciB0aGUgY29uZmlndXJhdGlvbiBtYW5hZ2VyIGRhdGFtb2RlbFxyXG4gICAqXHJcbiAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBwdWJsaWMgc2V0IGNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzKGNvbXBvbmVudFBhcmFtZXRlcnM6IFByb3BlcnR5PEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPj4pIHtcclxuXHJcbiAgICBsZXQgY29uZmlndXJhdGlvblBhcmFtZXRlcnMgPSBjb21wb25lbnRQYXJhbWV0ZXJzLnZhbHVlO1xyXG5cclxuICAgIGlmIChjb25maWd1cmF0aW9uUGFyYW1ldGVycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHRoaXMub25Db21wb25lbnRQYXJhbWV0ZXJzVXBkYXRlZChjb25maWd1cmF0aW9uUGFyYW1ldGVycyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGUgY29tcG9uZW50IHBhcmFtZXRlcnMgdXBkYXRlXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IGNvbXBvbmVudFBhcmFvbm5lY3Rjb25tZXRlcnNcclxuICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IGNvbXBvbmVudFBhcmFtZXRlcnNcclxuICAgKiBAcmV0dXJucyB7Kn1cclxuICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIG9uQ29tcG9uZW50UGFyYW1ldGVyc1VwZGF0ZWQoY29uZmlnUGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSk6IGFueSB7XHJcbiAgICAvLyBmaWx0ZXIgdGhlIGNvbmZpZ3VyYXRpb24gcGFyYW1ldGVycyBhbmQgdXBkYXRlIHRoZSBwYXJhbWV0ZXIgdmFsdWVzXHJcbiAgICBpZiAoY29uZmlnUGFyYW1ldGVycy5sZW5ndGggIT0gMCAmJiBjb25maWdQYXJhbWV0ZXJzWzBdICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICB2YXIgYWN0dWFsQ29tcG9uZW50ID0gKGNvbmZpZ1BhcmFtZXRlcnNbMF0uY29tcG9uZW50IGFzIE1hcHBDb2NrcGl0Q29tcG9uZW50KTtcclxuXHJcbiAgICAgIHRoaXMuX2FjdHVhbENvbXBvbmVudERhdGEgPSBjb25maWdQYXJhbWV0ZXJzO1xyXG4gICAgICB0aGlzLl9kYXRhID0gdGhpcy5jcmVhdGVEYXRhTW9kZWwoKDxhbnk+YWN0dWFsQ29tcG9uZW50Lm1ldGFEYXRhKS5NZXRhQ29uZmlnQ29uZmlnUHJvcHMsIGNvbmZpZ1BhcmFtZXRlcnMpO1xyXG4gICAgICB0aGlzLm9ic2VydmVDb25maWdQYXJhbWV0ZXJzKGNvbmZpZ1BhcmFtZXRlcnMpO1xyXG5cclxuICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLCBuZXcgRXZlbnRNb2RlbENoYW5nZWRBcmdzKHRoaXMsIE1vZGVsQ2hhbmdlVHlwZS51cGRhdGVUYXJnZXQsIFwiY29tcG9uZW50UGFyYW1ldGVyc1VwZGF0ZWRcIiwgdGhpcykpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICAgKiBoYW5kbGVzIHRoZSBjb21wb25lbnQgcGFyYW1ldGVyIHVwZGF0ZS4gXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbH0gc2VuZGVyXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50TW9kZWxDaGFuZ2VkQXJnc30gZXZlbnRBcmdzXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICBoYW5kbGVFdmVudENvbXBvbmVudFBhcmFtZXRlcnNVcGRhdGVkKHNlbmRlcjogTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWwsIGV2ZW50QXJnczogRXZlbnRNb2RlbENoYW5nZWRBcmdzKTogYW55IHtcclxuICAgIGxldCBjb21wb25lbnRQYXJhbWV0ZXJzID0gZXZlbnRBcmdzLmRhdGEgYXMgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXTtcclxuICAgIGlmIChjb21wb25lbnRQYXJhbWV0ZXJzKSB7XHJcbiAgICAgIGxldCBjb25maWdQYXJhbWV0ZXJzID0gTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvLnJldHJpZXZlQ29uZmlndXJhdGlvblBhcmFtZXRlcnMoY29tcG9uZW50UGFyYW1ldGVycyk7XHJcbiAgICAgIGlmIChjb25maWdQYXJhbWV0ZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICB2YXIgYWN0dWFsQ29tcG9uZW50ID0gKGNvbmZpZ1BhcmFtZXRlcnNbMF0uY29tcG9uZW50IGFzIE1hcHBDb2NrcGl0Q29tcG9uZW50KTtcclxuXHJcbiAgICAgICAgdGhpcy5fYWN0dWFsQ29tcG9uZW50RGF0YSA9IGNvbmZpZ1BhcmFtZXRlcnM7XHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IHRoaXMuY3JlYXRlRGF0YU1vZGVsKCg8YW55PmFjdHVhbENvbXBvbmVudC5tZXRhRGF0YSkuTWV0YUNvbmZpZ0NvbmZpZ1Byb3BzLCBjb25maWdQYXJhbWV0ZXJzKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLCBuZXcgRXZlbnRNb2RlbENoYW5nZWRBcmdzKHRoaXMsIE1vZGVsQ2hhbmdlVHlwZS51cGRhdGVUYXJnZXQsIFwiY29tcG9uZW50UGFyYW1ldGVyc1VwZGF0ZWRcIiwgdGhpcykpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICAgKiBvdmVycmlkZXMgdGhlIG9uTW9kZWxJdGVtcyBjaGFuZ2VkLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SURhdGFNb2RlbH0gc2VuZGVyXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50TW9kZWxDaGFuZ2VkQXJnc30gZGF0YVxyXG4gICAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJEYXRhTW9kZWxcclxuICAgICAqL1xyXG4gIG9uTW9kZWxJdGVtc0NoYW5nZWQoc2VuZGVyOiBJRGF0YU1vZGVsLCBkYXRhOiBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MpIHtcclxuICAgIC8vIGZpbHRlcnMgdGhlIGNvbmZpZ3VyYXRpb24gcGFyYW1ldGVyc1xyXG4gICAgdGhpcy51cGRhdGVGaWx0ZXJTdGF0ZSh0aGlzLl9kYXRhLCB0aGlzLl9hY3R1YWxDb21wb25lbnREYXRhKTtcclxuICAgIHN1cGVyLm9uTW9kZWxJdGVtc0NoYW5nZWQoc2VuZGVyLCBkYXRhKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGhhbmRsZXMgbW9kZWwgY2hhbmdlc1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHtJRGF0YU1vZGVsfSBzZW5kZXJcclxuICAgKiBAcGFyYW0ge0V2ZW50TW9kZWxDaGFuZ2VkQXJnc30gZXZlbnRBcmdzXHJcbiAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBoYW5kbGVNb2RlbENoYW5nZWQoc2VuZGVyOiBJRGF0YU1vZGVsLCBldmVudEFyZ3M6IEV2ZW50TW9kZWxDaGFuZ2VkQXJncykge1xyXG5cclxuICAgIC8vIGV4dGVybmFsIG1vZGVsIGNoYW5nZXMgd2l0aCBjaGFuZ2UgdHlwZSBcInVwZGF0ZVNvdXJjZVwiIGhhdmUgdG8gYmUgZm9yd2FyZGVkICh3cml0dGVuKSB0byB0aGUgc291cmNlXHJcbiAgICBpZiAoZXZlbnRBcmdzLmNhbGxlciAhPT0gdGhpcyAmJiBldmVudEFyZ3MuY2hhbmdlVHlwZSA9PT0gTW9kZWxDaGFuZ2VUeXBlLnVwZGF0ZVNvdXJjZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcImhhbmRsZU1vZGVsQ2hhbmdlZCAoJW8pIDogJW9cIiwgdGhpcywgZXZlbnRBcmdzKTtcclxuXHJcbiAgICAgIGxldCBtb2RpZmllZFBhcmFtZXRlciA9IGV2ZW50QXJncy5oaW50LmNoYW5nZWRJdGVtRGF0YS5jb21wb25lbnRQYXJhbWV0ZXIgYXMgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI7XHJcbiAgICAgIC8vIHVwZGF0ZSB0aGUgcGFyZW1ldGVyIHZhbHVlXHJcbiAgICAgIG1vZGlmaWVkUGFyYW1ldGVyLmRpc3BsYXlWYWx1ZSA9IGV2ZW50QXJncy5oaW50Lm5ld0l0ZW1EYXRhO1xyXG4gICAgICBcclxuICAgICAgLy8gZm9yY2Ugd3JpdGluZyB0aGUgcGFyYW1ldGVyIHZhbHVlXHJcbiAgICAgIG1vZGlmaWVkUGFyYW1ldGVyLndyaXRlKChyZWZsZWN0ZWRXcml0ZVJlc3BvbnNlVmFsdWUpPT50aGlzLm9uV3JpdHRlblZhbHVlUmVmbGVjdGVkKHJlZmxlY3RlZFdyaXRlUmVzcG9uc2VWYWx1ZSkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsbGVkIGFmdGVyIHRoZSB3cml0dGVuIHZhbHVlIGhhcyBiZWVuIHJlcmVhZCAocmVmbGVjdGVkKS5cclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogQHBhcmFtIHsqfSByZWZsZWN0ZWRXcml0ZVJlc3BvbnNlVmFsdWVcclxuICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25Xcml0dGVuVmFsdWVSZWZsZWN0ZWQocmVmbGVjdGVkV3JpdGVSZXNwb25zZVZhbHVlKXtcclxuICAgICAgICAvLyBhZnRlciByZWNlaXZpbmcgdGhlIHJlZmxlY3RlZCB3cml0dGVuIHZhbHVlIHdlIGZvcmNlIHJlZnJlc2hpbmcgdGhlIG1vZGVsL3ZpZXdcclxuICAgICAgICB0aGlzLnVwZGF0ZUZpbHRlclN0YXRlKHRoaXMuX2RhdGEsIHRoaXMuX2FjdHVhbENvbXBvbmVudERhdGEpO1xyXG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZWQodGhpcywgbmV3IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyh0aGlzLCBNb2RlbENoYW5nZVR5cGUudXBkYXRlVGFyZ2V0LCBcImNvbXBvbmVudFBhcmFtZXRlcnNVcGRhdGVkXCIsIHRoaXMpKTtcclxuICB9XHJcblxyXG4gIGdldERhdGFNb2RlbCgpOiBJQ21Hcm91cFtdIHtcclxuXHJcbiAgICB0aGlzLnVwZGF0ZUZpbHRlclN0YXRlKHRoaXMuX2RhdGEsIHRoaXMuX2FjdHVhbENvbXBvbmVudERhdGEpO1xyXG4gICAgcmV0dXJuIHRoaXMuX2RhdGE7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZURhdGFNb2RlbChtZXRhSW5mb3JtYXRpb246IGFueSwgY29tcG9uZW50RGF0YU1vZGVsOiBhbnkpOiBBcnJheTxJQ21Hcm91cD4ge1xyXG5cclxuICAgIHRoaXMubWV0YUluZm9ybWF0aW9uRGF0YU1vZGVsID0gbmV3IEFycmF5PElDbUdyb3VwPigpO1xyXG4gICAgaWYgKG1ldGFJbmZvcm1hdGlvbi5Db25maWd1cmF0aW9uU3RydWN0dXJlICE9IG51bGwpIHtcclxuICAgICAgaWYgKG1ldGFJbmZvcm1hdGlvbi5Db25maWd1cmF0aW9uU3RydWN0dXJlLkNoaWxkcyAhPSBudWxsKSB7XHJcbiAgICAgICAgbWV0YUluZm9ybWF0aW9uLkNvbmZpZ3VyYXRpb25TdHJ1Y3R1cmUuQ2hpbGRzLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICB0aGlzLm1ldGFJbmZvcm1hdGlvbkRhdGFNb2RlbC5wdXNoKG5ldyBDbUdyb3VwKGVsZW1lbnQsIGNvbXBvbmVudERhdGFNb2RlbCkpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLm1ldGFJbmZvcm1hdGlvbkRhdGFNb2RlbDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdXBkYXRlRmlsdGVyU3RhdGUoZGF0YU1vZGVsOiBJQ21QYXJhbWV0ZXJbXSwgY29tcG9uZW50UGFyYW1ldGVycykge1xyXG5cclxuICAgIGRhdGFNb2RlbC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIENtR3JvdXApIHtcclxuICAgICAgICBpZiAoZWxlbWVudC5maWx0ZXIgIT0gbnVsbCkge1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVGaWx0ZXIoZWxlbWVudC5maWx0ZXIsIGNvbXBvbmVudFBhcmFtZXRlcnMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZWxlbWVudC5jaGlsZHMgIT0gbnVsbCkge1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVGaWx0ZXJTdGF0ZShlbGVtZW50LmNoaWxkcywgY29tcG9uZW50UGFyYW1ldGVycyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIGlmIChlbGVtZW50LmZpbHRlciAhPSBudWxsKSB7XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZUZpbHRlcihlbGVtZW50LmZpbHRlciwgY29tcG9uZW50UGFyYW1ldGVycyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdXBkYXRlRmlsdGVyKGZpbHRlcjogSUNtRmlsdGVyLCBjb21wb25lbnRQYXJhbWV0ZXJzKSB7XHJcblxyXG4gICAgZmlsdGVyLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgaWYgKGZpbHRlci5wYXJhbWV0ZXJSZWYgPT0gXCJcIiAmJiBmaWx0ZXIucGFyYW1ldGVyVmFsdWUgPT0gdW5kZWZpbmVkICYmIGZpbHRlci5wYXJhbWV0ZXJWYWx1ZXMgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybjsgLy8gTm8gZmlsdGVyIGRlZmluZWRcclxuICAgIH1cclxuXHJcbiAgICB2YXIgcGFyYW1WYWx1ZSA9IHRoaXMuZ2V0UGFyYW1ldGVyVmFsdWVGcm9tU291cmNlKGZpbHRlci5wYXJhbWV0ZXJSZWYsIGNvbXBvbmVudFBhcmFtZXRlcnMpO1xyXG4gICAgaWYgKHBhcmFtVmFsdWUgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGZpbHRlci5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoZmlsdGVyLnBhcmFtZXRlclZhbHVlICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAvLyBDaGVjayBzaW5nbGUgcGFyYW1ldGVyVmFsdWUgZmlsdGVyXHJcbiAgICAgIGlmIChwYXJhbVZhbHVlICE9IGZpbHRlci5wYXJhbWV0ZXJWYWx1ZSkge1xyXG4gICAgICAgIGZpbHRlci5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChmaWx0ZXIucGFyYW1ldGVyVmFsdWVzICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAvLyBDaGVjayBtdWx0aXBsZSBwYXJhbWV0ZXJWYWx1ZSBmaWx0ZXJcclxuICAgICAgZmlsdGVyLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIGZpbHRlci5wYXJhbWV0ZXJWYWx1ZXMuZm9yRWFjaChmaWx0ZXJQYXJhbVZhbHVlID0+IHtcclxuICAgICAgICBpZiAoZmlsdGVyUGFyYW1WYWx1ZSA9PSBwYXJhbVZhbHVlKSB7XHJcbiAgICAgICAgICBmaWx0ZXIuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0UGFyYW1ldGVyVmFsdWVGcm9tU291cmNlKHBhcmFtZXRlclJlZjogYW55LCBjb21wb25lbnRQYXJhbWV0ZXJzKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcclxuICAgIGlmIChjb21wb25lbnRQYXJhbWV0ZXJzID09IG51bGwpIHtcclxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBwYXJhbWV0ZXIgb2YgY29tcG9uZW50UGFyYW1ldGVycykge1xyXG4gICAgICBpZiAocGFyYW1ldGVyLl9yZWZlcmVuY2UuYnJvd3NlTmFtZSA9PSBwYXJhbWV0ZXJSZWYpXHJcbiAgICAgICAgcmV0dXJuIHBhcmFtZXRlci52YWx1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZlcyB0aGUgY29uZmlnIHBhcmFtZXRlcnMgZm9yIGNoYW5nZXNcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gY29uZmlnUGFyYW1ldGVyc1xyXG4gICAqIEByZXR1cm5zIHsqfVxyXG4gICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgb2JzZXJ2ZUNvbmZpZ1BhcmFtZXRlcnMoY29uZmlnUGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSk6IGFueSB7XHJcblxyXG4gICAgLy8gb2JzZXJ2ZSBjb21wb25lbnQgd3JpdGUgYWNjZXNzXHJcbiAgICB0aGlzLm9ic2VydmVDb21wb25lbnRXcml0ZUFjY2Vzcyhjb25maWdQYXJhbWV0ZXJzKTtcclxuICAgIC8vIGludm9rZSBvYnNlcnZpbmcgdGhlIGNvbmZpZyBwYXJhbWV0ZXJzXHJcbiAgICBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlci5vYnNlcnZlUGFyYW1ldGVyVmFsdWVDaGFuZ2VzKHRoaXMsY29uZmlnUGFyYW1ldGVycyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBoYW5kbGVzIG9ic2VydmFibGUgY2hhbmdlc1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHtPYnNlcnZhYmxlW119IGNoYW5nZWRPYnNlcnZhYmxlc1xyXG4gICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgb25PYnNlcnZhYmxlc0NoYW5nZWQoY2hhbmdlZE9ic2VydmFibGVzOiBPYnNlcnZhYmxlW10pIHtcclxuICAgIGNvbnNvbGUubG9nKFwib25PYnNlcnZhYmxlc0NoYW5nZWQ6ICVvICVvXCIsdGhpcyxjaGFuZ2VkT2JzZXJ2YWJsZXMpO1xyXG4gICAgdGhpcy51cGRhdGVGaWx0ZXJTdGF0ZSh0aGlzLl9kYXRhLCB0aGlzLl9hY3R1YWxDb21wb25lbnREYXRhKTtcclxuICAgIHRoaXMub25Nb2RlbENoYW5nZWQodGhpcywgbmV3IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyh0aGlzLCBNb2RlbENoYW5nZVR5cGUudXBkYXRlVGFyZ2V0LCBcImNvbXBvbmVudFBhcmFtZXRlcnNVcGRhdGVkXCIsIHRoaXMpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9ic2VydmVzIGlmIHRoZSBjb21wb25lbnQgY2hhbmdlcyB0aGUgd3JpdGUgYWNjZXNzXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IGNvbmZpZ1BhcmFtZXRlcnNcclxuICAgKiBAcmV0dXJucyB7Kn1cclxuICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIG9ic2VydmVDb21wb25lbnRXcml0ZUFjY2Vzcyhjb25maWdQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdKTogYW55IHtcclxuICAgIC8vIHdlIHVzZSBhIHNpbmdsZSBwYXJhbWV0ZXIgdG8gZ2V0IHRoZSBwYXJlbnQgY29tcG9uZW50IGFuZCBvYnNlcnZlIGNoYW5nZXMgb2YgdGhlIHdyaXRlIGFjY2VzIHZhbHVlLlxyXG4gICAgKDxNYXBwQ29ja3BpdENvbXBvbmVudD5jb25maWdQYXJhbWV0ZXJzWzBdLmNvbXBvbmVudCkud3JpdGVBY2Nlc3MuY2hhbmdlZCgoKSA9PiB7XHJcbiAgICAgIHRoaXMub25Nb2RlbENoYW5nZWQodGhpcywgbmV3IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyh0aGlzLCBNb2RlbENoYW5nZVR5cGUudXBkYXRlVGFyZ2V0LCBcImNvbXBvbmVudFBhcmFtZXRlcnNVcGRhdGVkXCIsIHRoaXMpKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbn0iXX0=