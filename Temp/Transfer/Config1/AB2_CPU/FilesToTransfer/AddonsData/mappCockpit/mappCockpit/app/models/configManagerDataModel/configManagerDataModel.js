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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnTWFuYWdlckRhdGFNb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbmZpZ01hbmFnZXJEYXRhTW9kZWwvY29uZmlnTWFuYWdlckRhdGFNb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBY0E7UUFBNEMsMENBQWE7UUFBekQ7WUFBQSxxRUFtUUM7WUE1UFMsOEJBQXdCLEdBQUcsVUFBQyxNQUFNLEVBQUUsU0FBUyxJQUFPLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUM7O1FBNFAzRyxDQUFDO1FBMVBDOzs7O1dBSUc7UUFDSCwyQ0FBVSxHQUFWO1lBQ0UseUNBQXlDO1lBQ3pDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDN0QsaUJBQU0sVUFBVSxXQUFFLENBQUM7UUFDckIsQ0FBQztRQUVELG9EQUFtQixHQUFuQjtZQUNFLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUNyQyxDQUFDO1FBRUQ7Ozs7V0FJRztRQUNILHdDQUFPLEdBQVA7WUFDRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQy9ELENBQUM7UUFPRCxzQkFBVywyREFBdUI7WUFMbEM7Ozs7ZUFJRztpQkFDSCxVQUFtQyxtQkFBbUU7Z0JBRXBHLElBQUksdUJBQXVCLEdBQUcsbUJBQW1CLENBQUMsS0FBSyxDQUFDO2dCQUV4RCxJQUFJLHVCQUF1QixDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQ3RDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO2lCQUM1RDtZQUNILENBQUM7OztXQUFBO1FBRUQ7Ozs7Ozs7V0FPRztRQUNI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S0FBSyxFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQzlELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLElBQUksMENBQXFCLENBQUMsSUFBSSxFQUFFLG9DQUFlLENBQUMsWUFBWSxFQUFFLDRCQUE0QixFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDL0gsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNILDREQUEyQixHQUEzQixVQUE0QixnQkFBaUQ7WUFBN0UsaUJBS0M7WUFKQyxzR0FBc0c7WUFDL0UsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBVSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUM7Z0JBQ3hFLEtBQUksQ0FBQyxjQUFjLENBQUMsS0FBSSxFQUFFLElBQUksMENBQXFCLENBQUMsS0FBSSxFQUFFLG9DQUFlLENBQUMsWUFBWSxFQUFFLDRCQUE0QixFQUFFLEtBQUksQ0FBQyxDQUFDLENBQUM7WUFDL0gsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBRUgsNkJBQUM7SUFBRCxDQUFDLEFBblFELENBQTRDLDZCQUFhLEdBbVF4RDtJQW5RWSx3REFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHsgSUNtR3JvdXAgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL2NtR3JvdXBJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ21Hcm91cCB9IGZyb20gXCIuL2NtR3JvdXBcIjtcclxuaW1wb3J0IHsgSUNtRmlsdGVyIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9jbUZpbHRlckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJQ21QYXJhbWV0ZXIgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL2NtUGFyYW1ldGVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IERhdGFNb2RlbEJhc2UgfSBmcm9tIFwiLi4vZGF0YU1vZGVsQmFzZVwiO1xyXG5pbXBvcnQgeyBJQ29uZmlnTWFuYWdlckRhdGFNb2RlbCB9IGZyb20gXCIuL2ludGVyZmFjZXMvY29uZmlnTWFuYWdlckRhdGFNb2RlbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbCB9IGZyb20gXCIuLi9vbmxpbmUvY29tcG9uZW50c0RhdGFNb2RlbFwiO1xyXG5pbXBvcnQgeyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MsIE1vZGVsQ2hhbmdlVHlwZSwgSURhdGFNb2RlbCB9IGZyb20gXCIuLi9kYXRhTW9kZWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIsIE1hcHBDb2NrcGl0Q29tcG9uZW50IH0gZnJvbSBcIi4uL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm8gfSBmcm9tIFwiLi4vb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50UmVmbGVjdGlvblwiO1xyXG5pbXBvcnQgeyBQcm9wZXJ0eSB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvcHJvcGVydHlcIjtcclxuaW1wb3J0IHsgSU9ic2VydmVyLCBPYnNlcnZhYmxlIH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9pbnRlcmZhY2VzL29ic2VydmVyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29uZmlnTWFuYWdlckRhdGFNb2RlbCBleHRlbmRzIERhdGFNb2RlbEJhc2UgaW1wbGVtZW50cyBJQ29uZmlnTWFuYWdlckRhdGFNb2RlbCxJT2JzZXJ2ZXIge1xyXG5cclxuXHJcbiAgcHJpdmF0ZSBfYWN0dWFsQ29tcG9uZW50RGF0YTtcclxuXHJcbiAgcHJpdmF0ZSBtZXRhSW5mb3JtYXRpb25EYXRhTW9kZWw7XHJcblxyXG4gIHByaXZhdGUgX2RhdGFNb2RlbENoYW5nZWRIYW5kbGVyID0gKHNlbmRlciwgZXZlbnRBcmdzKSA9PiB7IHRoaXMuaGFuZGxlTW9kZWxDaGFuZ2VkKHNlbmRlciwgZXZlbnRBcmdzKSB9O1xyXG5cclxuICAvKipcclxuICAgKiBJbml0aWFsaXplIHRoZSBjb25maWdtYW5hZ2VyIGRhdGFtb2RlbFxyXG4gICAqXHJcbiAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBpbml0aWFsaXplKCkge1xyXG4gICAgLy8gd2F0Y2ggdGhlIGRhdGEgbW9kZWwgZm9yIGNoYW5nZSBldmVudHNcclxuICAgIHRoaXMuZXZlbnRNb2RlbENoYW5nZWQuYXR0YWNoKHRoaXMuX2RhdGFNb2RlbENoYW5nZWRIYW5kbGVyKTtcclxuICAgIHN1cGVyLmluaXRpYWxpemUoKTtcclxuICB9XHJcblxyXG4gIGluaXRpYWxpemVDb21wb25lbnQoKXtcclxuICAgIHRoaXMuY29tcG9uZW50LmRpc2FibGVQZXJzaXN0aW5nKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEaXNwb3NlIHRoZSBjb25maWdtYW5hZ2VyIGRhdGFtb2RlbFxyXG4gICAqXHJcbiAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBkaXNwb3NlKCl7XHJcbiAgICB0aGlzLmV2ZW50TW9kZWxDaGFuZ2VkLmRldGFjaCh0aGlzLl9kYXRhTW9kZWxDaGFuZ2VkSGFuZGxlcik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIHRoZSBjb25maWd1cmF0aW9ucGFyYW1ldGVycyBhcyB0aGUgZGF0YSBzb3VyY2UgZm9yIHRoZSBjb25maWd1cmF0aW9uIG1hbmFnZXIgZGF0YW1vZGVsXHJcbiAgICpcclxuICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIHB1YmxpYyBzZXQgY29uZmlndXJhdGlvblBhcmFtZXRlcnMoY29tcG9uZW50UGFyYW1ldGVyczogUHJvcGVydHk8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+Pikge1xyXG5cclxuICAgIGxldCBjb25maWd1cmF0aW9uUGFyYW1ldGVycyA9IGNvbXBvbmVudFBhcmFtZXRlcnMudmFsdWU7XHJcblxyXG4gICAgaWYgKGNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgdGhpcy5vbkNvbXBvbmVudFBhcmFtZXRlcnNVcGRhdGVkKGNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhbmRsZSBjb21wb25lbnQgcGFyYW1ldGVycyB1cGRhdGVcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gY29tcG9uZW50UGFyYW9ubmVjdGNvbm1ldGVyc1xyXG4gICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gY29tcG9uZW50UGFyYW1ldGVyc1xyXG4gICAqIEByZXR1cm5zIHsqfVxyXG4gICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgb25Db21wb25lbnRQYXJhbWV0ZXJzVXBkYXRlZChjb25maWdQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdKTogYW55IHtcclxuICAgIC8vIGZpbHRlciB0aGUgY29uZmlndXJhdGlvbiBwYXJhbWV0ZXJzIGFuZCB1cGRhdGUgdGhlIHBhcmFtZXRlciB2YWx1ZXNcclxuICAgIGlmIChjb25maWdQYXJhbWV0ZXJzLmxlbmd0aCAhPSAwICYmIGNvbmZpZ1BhcmFtZXRlcnNbMF0gIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHZhciBhY3R1YWxDb21wb25lbnQgPSAoY29uZmlnUGFyYW1ldGVyc1swXS5jb21wb25lbnQgYXMgTWFwcENvY2twaXRDb21wb25lbnQpO1xyXG5cclxuICAgICAgdGhpcy5fYWN0dWFsQ29tcG9uZW50RGF0YSA9IGNvbmZpZ1BhcmFtZXRlcnM7XHJcbiAgICAgIHRoaXMuX2RhdGEgPSB0aGlzLmNyZWF0ZURhdGFNb2RlbCgoPGFueT5hY3R1YWxDb21wb25lbnQubWV0YURhdGEpLk1ldGFDb25maWdDb25maWdQcm9wcywgY29uZmlnUGFyYW1ldGVycyk7XHJcbiAgICAgIHRoaXMub2JzZXJ2ZUNvbmZpZ1BhcmFtZXRlcnMoY29uZmlnUGFyYW1ldGVycyk7XHJcblxyXG4gICAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKHRoaXMsIG5ldyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3ModGhpcywgTW9kZWxDaGFuZ2VUeXBlLnVwZGF0ZVRhcmdldCwgXCJjb21wb25lbnRQYXJhbWV0ZXJzVXBkYXRlZFwiLCB0aGlzKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgICAqIGhhbmRsZXMgdGhlIGNvbXBvbmVudCBwYXJhbWV0ZXIgdXBkYXRlLiBcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsfSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7RXZlbnRNb2RlbENoYW5nZWRBcmdzfSBldmVudEFyZ3NcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJEYXRhTW9kZWxcclxuICAgICAqL1xyXG4gIGhhbmRsZUV2ZW50Q29tcG9uZW50UGFyYW1ldGVyc1VwZGF0ZWQoc2VuZGVyOiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbCwgZXZlbnRBcmdzOiBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MpOiBhbnkge1xyXG4gICAgbGV0IGNvbXBvbmVudFBhcmFtZXRlcnMgPSBldmVudEFyZ3MuZGF0YSBhcyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdO1xyXG4gICAgaWYgKGNvbXBvbmVudFBhcmFtZXRlcnMpIHtcclxuICAgICAgbGV0IGNvbmZpZ1BhcmFtZXRlcnMgPSBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm8ucmV0cmlldmVDb25maWd1cmF0aW9uUGFyYW1ldGVycyhjb21wb25lbnRQYXJhbWV0ZXJzKTtcclxuICAgICAgaWYgKGNvbmZpZ1BhcmFtZXRlcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHZhciBhY3R1YWxDb21wb25lbnQgPSAoY29uZmlnUGFyYW1ldGVyc1swXS5jb21wb25lbnQgYXMgTWFwcENvY2twaXRDb21wb25lbnQpO1xyXG5cclxuICAgICAgICB0aGlzLl9hY3R1YWxDb21wb25lbnREYXRhID0gY29uZmlnUGFyYW1ldGVycztcclxuICAgICAgICB0aGlzLl9kYXRhID0gdGhpcy5jcmVhdGVEYXRhTW9kZWwoKDxhbnk+YWN0dWFsQ29tcG9uZW50Lm1ldGFEYXRhKS5NZXRhQ29uZmlnQ29uZmlnUHJvcHMsIGNvbmZpZ1BhcmFtZXRlcnMpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKHRoaXMsIG5ldyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3ModGhpcywgTW9kZWxDaGFuZ2VUeXBlLnVwZGF0ZVRhcmdldCwgXCJjb21wb25lbnRQYXJhbWV0ZXJzVXBkYXRlZFwiLCB0aGlzKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgICAqIG92ZXJyaWRlcyB0aGUgb25Nb2RlbEl0ZW1zIGNoYW5nZWQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJRGF0YU1vZGVsfSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7RXZlbnRNb2RlbENoYW5nZWRBcmdzfSBkYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlckRhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgb25Nb2RlbEl0ZW1zQ2hhbmdlZChzZW5kZXI6IElEYXRhTW9kZWwsIGRhdGE6IEV2ZW50TW9kZWxDaGFuZ2VkQXJncykge1xyXG4gICAgLy8gZmlsdGVycyB0aGUgY29uZmlndXJhdGlvbiBwYXJhbWV0ZXJzXHJcbiAgICB0aGlzLnVwZGF0ZUZpbHRlclN0YXRlKHRoaXMuX2RhdGEsIHRoaXMuX2FjdHVhbENvbXBvbmVudERhdGEpO1xyXG4gICAgc3VwZXIub25Nb2RlbEl0ZW1zQ2hhbmdlZChzZW5kZXIsIGRhdGEpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogaGFuZGxlcyBtb2RlbCBjaGFuZ2VzXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0lEYXRhTW9kZWx9IHNlbmRlclxyXG4gICAqIEBwYXJhbSB7RXZlbnRNb2RlbENoYW5nZWRBcmdzfSBldmVudEFyZ3NcclxuICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIGhhbmRsZU1vZGVsQ2hhbmdlZChzZW5kZXI6IElEYXRhTW9kZWwsIGV2ZW50QXJnczogRXZlbnRNb2RlbENoYW5nZWRBcmdzKSB7XHJcblxyXG4gICAgLy8gZXh0ZXJuYWwgbW9kZWwgY2hhbmdlcyB3aXRoIGNoYW5nZSB0eXBlIFwidXBkYXRlU291cmNlXCIgaGF2ZSB0byBiZSBmb3J3YXJkZWQgKHdyaXR0ZW4pIHRvIHRoZSBzb3VyY2VcclxuICAgIGlmIChldmVudEFyZ3MuY2FsbGVyICE9PSB0aGlzICYmIGV2ZW50QXJncy5jaGFuZ2VUeXBlID09PSBNb2RlbENoYW5nZVR5cGUudXBkYXRlU291cmNlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiaGFuZGxlTW9kZWxDaGFuZ2VkICglbykgOiAlb1wiLCB0aGlzLCBldmVudEFyZ3MpO1xyXG5cclxuICAgICAgbGV0IG1vZGlmaWVkUGFyYW1ldGVyID0gZXZlbnRBcmdzLmhpbnQuY2hhbmdlZEl0ZW1EYXRhLmNvbXBvbmVudFBhcmFtZXRlciBhcyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcjtcclxuICAgICAgLy8gdXBkYXRlIHRoZSBwYXJlbWV0ZXIgdmFsdWVcclxuICAgICAgbW9kaWZpZWRQYXJhbWV0ZXIuZGlzcGxheVZhbHVlID0gZXZlbnRBcmdzLmhpbnQubmV3SXRlbURhdGE7XHJcbiAgICAgIFxyXG4gICAgICAvLyBmb3JjZSB3cml0aW5nIHRoZSBwYXJhbWV0ZXIgdmFsdWVcclxuICAgICAgbW9kaWZpZWRQYXJhbWV0ZXIud3JpdGUoKHJlZmxlY3RlZFdyaXRlUmVzcG9uc2VWYWx1ZSk9PnRoaXMub25Xcml0dGVuVmFsdWVSZWZsZWN0ZWQocmVmbGVjdGVkV3JpdGVSZXNwb25zZVZhbHVlKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDYWxsZWQgYWZ0ZXIgdGhlIHdyaXR0ZW4gdmFsdWUgaGFzIGJlZW4gcmVyZWFkIChyZWZsZWN0ZWQpLlxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBAcGFyYW0geyp9IHJlZmxlY3RlZFdyaXRlUmVzcG9uc2VWYWx1ZVxyXG4gICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbldyaXR0ZW5WYWx1ZVJlZmxlY3RlZChyZWZsZWN0ZWRXcml0ZVJlc3BvbnNlVmFsdWUpe1xyXG4gICAgICAgIC8vIGFmdGVyIHJlY2VpdmluZyB0aGUgcmVmbGVjdGVkIHdyaXR0ZW4gdmFsdWUgd2UgZm9yY2UgcmVmcmVzaGluZyB0aGUgbW9kZWwvdmlld1xyXG4gICAgICAgIHRoaXMudXBkYXRlRmlsdGVyU3RhdGUodGhpcy5fZGF0YSwgdGhpcy5fYWN0dWFsQ29tcG9uZW50RGF0YSk7XHJcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLCBuZXcgRXZlbnRNb2RlbENoYW5nZWRBcmdzKHRoaXMsIE1vZGVsQ2hhbmdlVHlwZS51cGRhdGVUYXJnZXQsIFwiY29tcG9uZW50UGFyYW1ldGVyc1VwZGF0ZWRcIiwgdGhpcykpO1xyXG4gIH1cclxuXHJcbiAgZ2V0RGF0YU1vZGVsKCk6IElDbUdyb3VwW10ge1xyXG5cclxuICAgIHRoaXMudXBkYXRlRmlsdGVyU3RhdGUodGhpcy5fZGF0YSwgdGhpcy5fYWN0dWFsQ29tcG9uZW50RGF0YSk7XHJcbiAgICByZXR1cm4gdGhpcy5fZGF0YTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlRGF0YU1vZGVsKG1ldGFJbmZvcm1hdGlvbjogYW55LCBjb21wb25lbnREYXRhTW9kZWw6IGFueSk6IEFycmF5PElDbUdyb3VwPiB7XHJcblxyXG4gICAgdGhpcy5tZXRhSW5mb3JtYXRpb25EYXRhTW9kZWwgPSBuZXcgQXJyYXk8SUNtR3JvdXA+KCk7XHJcbiAgICBpZiAobWV0YUluZm9ybWF0aW9uLkNvbmZpZ3VyYXRpb25TdHJ1Y3R1cmUgIT0gbnVsbCkge1xyXG4gICAgICBpZiAobWV0YUluZm9ybWF0aW9uLkNvbmZpZ3VyYXRpb25TdHJ1Y3R1cmUuQ2hpbGRzICE9IG51bGwpIHtcclxuICAgICAgICBtZXRhSW5mb3JtYXRpb24uQ29uZmlndXJhdGlvblN0cnVjdHVyZS5DaGlsZHMuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgIHRoaXMubWV0YUluZm9ybWF0aW9uRGF0YU1vZGVsLnB1c2gobmV3IENtR3JvdXAoZWxlbWVudCwgY29tcG9uZW50RGF0YU1vZGVsKSlcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMubWV0YUluZm9ybWF0aW9uRGF0YU1vZGVsO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB1cGRhdGVGaWx0ZXJTdGF0ZShkYXRhTW9kZWw6IElDbVBhcmFtZXRlcltdLCBjb21wb25lbnRQYXJhbWV0ZXJzKSB7XHJcblxyXG4gICAgZGF0YU1vZGVsLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgQ21Hcm91cCkge1xyXG4gICAgICAgIGlmIChlbGVtZW50LmZpbHRlciAhPSBudWxsKSB7XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZUZpbHRlcihlbGVtZW50LmZpbHRlciwgY29tcG9uZW50UGFyYW1ldGVycyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChlbGVtZW50LmNoaWxkcyAhPSBudWxsKSB7XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZUZpbHRlclN0YXRlKGVsZW1lbnQuY2hpbGRzLCBjb21wb25lbnRQYXJhbWV0ZXJzKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgaWYgKGVsZW1lbnQuZmlsdGVyICE9IG51bGwpIHtcclxuICAgICAgICAgIHRoaXMudXBkYXRlRmlsdGVyKGVsZW1lbnQuZmlsdGVyLCBjb21wb25lbnRQYXJhbWV0ZXJzKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB1cGRhdGVGaWx0ZXIoZmlsdGVyOiBJQ21GaWx0ZXIsIGNvbXBvbmVudFBhcmFtZXRlcnMpIHtcclxuXHJcbiAgICBmaWx0ZXIuYWN0aXZlID0gZmFsc2U7XHJcbiAgICBpZiAoZmlsdGVyLnBhcmFtZXRlclJlZiA9PSBcIlwiICYmIGZpbHRlci5wYXJhbWV0ZXJWYWx1ZSA9PSB1bmRlZmluZWQgJiYgZmlsdGVyLnBhcmFtZXRlclZhbHVlcyA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuOyAvLyBObyBmaWx0ZXIgZGVmaW5lZFxyXG4gICAgfVxyXG5cclxuICAgIHZhciBwYXJhbVZhbHVlID0gdGhpcy5nZXRQYXJhbWV0ZXJWYWx1ZUZyb21Tb3VyY2UoZmlsdGVyLnBhcmFtZXRlclJlZiwgY29tcG9uZW50UGFyYW1ldGVycyk7XHJcbiAgICBpZiAocGFyYW1WYWx1ZSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgZmlsdGVyLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChmaWx0ZXIucGFyYW1ldGVyVmFsdWUgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIC8vIENoZWNrIHNpbmdsZSBwYXJhbWV0ZXJWYWx1ZSBmaWx0ZXJcclxuICAgICAgaWYgKHBhcmFtVmFsdWUgIT0gZmlsdGVyLnBhcmFtZXRlclZhbHVlKSB7XHJcbiAgICAgICAgZmlsdGVyLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGZpbHRlci5wYXJhbWV0ZXJWYWx1ZXMgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIC8vIENoZWNrIG11bHRpcGxlIHBhcmFtZXRlclZhbHVlIGZpbHRlclxyXG4gICAgICBmaWx0ZXIuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgZmlsdGVyLnBhcmFtZXRlclZhbHVlcy5mb3JFYWNoKGZpbHRlclBhcmFtVmFsdWUgPT4ge1xyXG4gICAgICAgIGlmIChmaWx0ZXJQYXJhbVZhbHVlID09IHBhcmFtVmFsdWUpIHtcclxuICAgICAgICAgIGZpbHRlci5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRQYXJhbWV0ZXJWYWx1ZUZyb21Tb3VyY2UocGFyYW1ldGVyUmVmOiBhbnksIGNvbXBvbmVudFBhcmFtZXRlcnMpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xyXG4gICAgaWYgKGNvbXBvbmVudFBhcmFtZXRlcnMgPT0gbnVsbCkge1xyXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IHBhcmFtZXRlciBvZiBjb21wb25lbnRQYXJhbWV0ZXJzKSB7XHJcbiAgICAgIGlmIChwYXJhbWV0ZXIuX3JlZmVyZW5jZS5icm93c2VOYW1lID09IHBhcmFtZXRlclJlZilcclxuICAgICAgICByZXR1cm4gcGFyYW1ldGVyLnZhbHVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9ic2VydmVzIHRoZSBjb25maWcgcGFyYW1ldGVycyBmb3IgY2hhbmdlc1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSBjb25maWdQYXJhbWV0ZXJzXHJcbiAgICogQHJldHVybnMgeyp9XHJcbiAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBvYnNlcnZlQ29uZmlnUGFyYW1ldGVycyhjb25maWdQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdKTogYW55IHtcclxuXHJcbiAgICAvLyBvYnNlcnZlIGNvbXBvbmVudCB3cml0ZSBhY2Nlc3NcclxuICAgIHRoaXMub2JzZXJ2ZUNvbXBvbmVudFdyaXRlQWNjZXNzKGNvbmZpZ1BhcmFtZXRlcnMpO1xyXG4gICAgLy8gaW52b2tlIG9ic2VydmluZyB0aGUgY29uZmlnIHBhcmFtZXRlcnNcclxuICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyLm9ic2VydmVQYXJhbWV0ZXJWYWx1ZUNoYW5nZXModGhpcyxjb25maWdQYXJhbWV0ZXJzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGhhbmRsZXMgb2JzZXJ2YWJsZSBjaGFuZ2VzXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge09ic2VydmFibGVbXX0gY2hhbmdlZE9ic2VydmFibGVzXHJcbiAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBvbk9ic2VydmFibGVzQ2hhbmdlZChjaGFuZ2VkT2JzZXJ2YWJsZXM6IE9ic2VydmFibGVbXSkge1xyXG4gICAgY29uc29sZS5sb2coXCJvbk9ic2VydmFibGVzQ2hhbmdlZDogJW8gJW9cIix0aGlzLGNoYW5nZWRPYnNlcnZhYmxlcyk7XHJcbiAgICB0aGlzLnVwZGF0ZUZpbHRlclN0YXRlKHRoaXMuX2RhdGEsIHRoaXMuX2FjdHVhbENvbXBvbmVudERhdGEpO1xyXG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLCBuZXcgRXZlbnRNb2RlbENoYW5nZWRBcmdzKHRoaXMsIE1vZGVsQ2hhbmdlVHlwZS51cGRhdGVUYXJnZXQsIFwiY29tcG9uZW50UGFyYW1ldGVyc1VwZGF0ZWRcIiwgdGhpcykpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT2JzZXJ2ZXMgaWYgdGhlIGNvbXBvbmVudCBjaGFuZ2VzIHRoZSB3cml0ZSBhY2Nlc3NcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gY29uZmlnUGFyYW1ldGVyc1xyXG4gICAqIEByZXR1cm5zIHsqfVxyXG4gICAqIEBtZW1iZXJvZiBDb25maWdNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgb2JzZXJ2ZUNvbXBvbmVudFdyaXRlQWNjZXNzKGNvbmZpZ1BhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pOiBhbnkge1xyXG4gICAgLy8gd2UgdXNlIGEgc2luZ2xlIHBhcmFtZXRlciB0byBnZXQgdGhlIHBhcmVudCBjb21wb25lbnQgYW5kIG9ic2VydmUgY2hhbmdlcyBvZiB0aGUgd3JpdGUgYWNjZXMgdmFsdWUuXHJcbiAgICAoPE1hcHBDb2NrcGl0Q29tcG9uZW50PmNvbmZpZ1BhcmFtZXRlcnNbMF0uY29tcG9uZW50KS53cml0ZUFjY2Vzcy5jaGFuZ2VkKCgpID0+IHtcclxuICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLCBuZXcgRXZlbnRNb2RlbENoYW5nZWRBcmdzKHRoaXMsIE1vZGVsQ2hhbmdlVHlwZS51cGRhdGVUYXJnZXQsIFwiY29tcG9uZW50UGFyYW1ldGVyc1VwZGF0ZWRcIiwgdGhpcykpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxufSJdfQ==