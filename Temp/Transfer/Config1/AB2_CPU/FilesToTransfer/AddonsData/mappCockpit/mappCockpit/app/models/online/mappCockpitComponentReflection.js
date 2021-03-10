define(["require", "exports", "./mappCockpitComponentMetaData", "../diagnostics/mappCockpitCommonInfoProvider"], function (require, exports, mappCockpitComponentMetaData_1, mappCockpitCommonInfoProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * provides descriptive information for a parameter
     *
     * @class MappCockpitComponentParameterInfo
     */
    var MappCockpitComponentParameterInfo = /** @class */ (function () {
        function MappCockpitComponentParameterInfo() {
        }
        /**
         * retrieves the watchables from the parameter set
         *
         * @static
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @returns {MappCockpitComponentParameter[]}
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.retrieveWatchableParameters = function (componentParameters) {
            // get the watchables meta infos
            if ((componentParameters[0] == undefined) || componentParameters[0].component.metaData.MetaConfigWatchables == undefined) {
                return new Array();
            }
            var watchablesMetaInfo = componentParameters[0].component.metaData.MetaConfigWatchables.WatchablesStructure;
            // retrieve the watchables definitions
            var watchableParameters = MappCockpitComponentParameterInfo.retrieveParametersFromMetaInfo(["Watchable"], watchablesMetaInfo, componentParameters);
            return watchableParameters;
        };
        /**
         * retrieves the message parameters from the component parameters
         *
         * @private
         * @param {Array<MappCockpitComponentParameter>} componentParameters
         * @returns {Array<MappCockpitComponentParameter>}
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.retrieveMessageParameters = function (componentParameters) {
            var messageSeverityParameter = componentParameters.filter(function (parameter) { return parameter.browseName === "intArraySeverity"; })[0];
            if (messageSeverityParameter == undefined) {
                messageSeverityParameter = componentParameters.filter(function (parameter) { return parameter.browseName === "strArraySeverity"; })[0];
            }
            var messageDescriptionParameter = componentParameters.filter(function (parameter) { return parameter.browseName === "strArrayDescription"; })[0];
            var messageEventIdParameter = componentParameters.filter(function (parameter) { return parameter.browseName === "strArrayEventID"; })[0];
            var messageTimeStampParameter = componentParameters.filter(function (parameter) { return parameter.browseName === "strArrayTime"; })[0];
            return [messageSeverityParameter, messageDescriptionParameter, messageEventIdParameter, messageTimeStampParameter];
        };
        /**
         * retrieves the trace configuration timing parameters from the parameter set
         *
         * @static
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @returns {MappCockpitComponentParameter[]}
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.retrieveTraceConfigurationTimingParameters = function (componentParameters) {
            // retrieve the trace configuration timing parameters
            var timingParameters = new Array();
            for (var i = 0; i < componentParameters.length; i++) {
                if (MappCockpitComponentParameterInfo.isTimingParameter(componentParameters[i])) {
                    timingParameters.push(componentParameters[i]);
                }
            }
            // Update the values to the real values from CurrentTrcConfig Property (BUGFIX for missing StartTriggers at startup)
            var currentTrcConfigProperties = componentParameters.filter(function (element) { return element.browseName == "CurrentTrcConfig"; });
            if (currentTrcConfigProperties.length == 1) {
                if (currentTrcConfigProperties[0].value != undefined) {
                    this.updateTimingParameters(timingParameters, currentTrcConfigProperties[0].value);
                }
            }
            return timingParameters;
        };
        /**
         * Updates the values of the timing parameters with the values from a json string (currentTraceConfigJsonString)
         * BUGFIX for missing StartTriggers at startup
         *
         * @private
         * @static
         * @param {MappCockpitComponentParameter[]} timingParameters
         * @param {string} currentTraceConfigJsonString
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.updateTimingParameters = function (timingParameters, currentTraceConfigJsonString) {
            if (currentTraceConfigJsonString != "") {
                var currentTraceConfig = JSON.parse(currentTraceConfigJsonString);
                // Update all timing parameters
                try {
                    if (currentTraceConfig.Timing != undefined) {
                        this.setValueOfProperty(timingParameters, "Timing_TotalRecordingTime", currentTraceConfig.Timing.TotalRecordingTime);
                        this.setValueOfProperty(timingParameters, "Timing_TriggerOffsetTime", currentTraceConfig.Timing.TriggerOffsetTime);
                        this.setValueOfProperty(timingParameters, "Timing_AcoposSampleTime", currentTraceConfig.Timing.ACOPOSSampleTime);
                        this.setValueOfProperty(timingParameters, "Timing_PlcTaskClass", currentTraceConfig.Timing.PVTaskClass);
                        this.setValueOfProperty(timingParameters, "Timing_PlcSampleTime", currentTraceConfig.Timing.PlcSampleTime);
                    }
                }
                catch (error) {
                    console.error("Updating of some trace configuration timing informations not possible!");
                }
            }
        };
        MappCockpitComponentParameterInfo.isTimingParameter = function (parameter) {
            // Timing parameters begin with "Timing_" in the properties name
            var prefix = "Timing_";
            if (parameter.browseName.substr(0, prefix.length) == prefix) {
                return true;
            }
            return false;
        };
        /**
         * retrieves the trace configuration trigger parameters from the parameter set
         *
         * @static
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @returns {MappCockpitComponentParameter[]}
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.retrieveTraceConfigurationTriggerParameters = function (componentParameters) {
            // retrieve the trace configuration trigger parameters
            var triggerParameters = new Array();
            for (var i = 0; i < componentParameters.length; i++) {
                if (MappCockpitComponentParameterInfo.isTriggerParameter(componentParameters[i])) {
                    triggerParameters.push(componentParameters[i]);
                }
            }
            // Update the values to the real values from CurrentTrcConfig Property (BUGFIX for missing StartTriggers at startup)
            var currentTrcConfigProperties = componentParameters.filter(function (element) { return element.browseName == "CurrentTrcConfig"; });
            if (currentTrcConfigProperties.length == 1) {
                if (currentTrcConfigProperties[0].value != undefined) {
                    this.updateTriggerParameters(triggerParameters, currentTrcConfigProperties[0].value);
                }
            }
            return triggerParameters;
        };
        /**
         * Updates the values of the trigger parameters with the values from a json string (currentTraceConfigJsonString)
         * BUGFIX for missing StartTriggers at startup
         *
         * @private
         * @static
         * @param {MappCockpitComponentParameter[]} triggerParameters
         * @param {string} currentTraceConfigJsonString
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.updateTriggerParameters = function (triggerParameters, currentTraceConfigJsonString) {
            if (currentTraceConfigJsonString != "") {
                var currentTraceConfig = JSON.parse(currentTraceConfigJsonString);
                // Update all supported triggers
                for (var i = 0; i < 2; i++) {
                    this.updateSingleTrigger(triggerParameters, i, currentTraceConfig);
                }
            }
        };
        /**
         * Updates the values of a trigger with the given index with the values from a json string (currentTraceConfigJsonString)
         * BUGFIX for missing StartTriggers at startup
         *
         * @private
         * @static
         * @param {MappCockpitComponentParameter[]} triggerParameters
         * @param {number} triggerIndex
         * @param {*} currentTraceConfig
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.updateSingleTrigger = function (triggerParameters, triggerIndex, currentTraceConfig) {
            try {
                var triggerID_1 = (triggerIndex + 1);
                var startTriggerPrefixBrowseName = "StartTrigger" + triggerID_1 + "_";
                var currentTriggerCfg = currentTraceConfig.Triggers.filter(function (element) { return element.ID == triggerID_1; })[0];
                if (currentTriggerCfg != undefined) {
                    this.setValueOfProperty(triggerParameters, startTriggerPrefixBrowseName + "Condition", currentTriggerCfg.Event);
                    this.setValueOfProperty(triggerParameters, startTriggerPrefixBrowseName + "DataPoint", currentTriggerCfg.DataPoint);
                    this.setValueOfProperty(triggerParameters, startTriggerPrefixBrowseName + "Threshold", currentTriggerCfg.Threshold);
                    this.setValueOfProperty(triggerParameters, startTriggerPrefixBrowseName + "Window", currentTriggerCfg.Window);
                }
                else {
                    // Set Trigger to default if not available in current trace config
                    this.setValueOfProperty(triggerParameters, startTriggerPrefixBrowseName + "Condition", "20");
                    this.setValueOfProperty(triggerParameters, startTriggerPrefixBrowseName + "DataPoint", "");
                    this.setValueOfProperty(triggerParameters, startTriggerPrefixBrowseName + "Threshold", "0");
                    this.setValueOfProperty(triggerParameters, startTriggerPrefixBrowseName + "Window", "0");
                }
            }
            catch (error) {
                console.error("Updating of some trace configuration trigger informations not possible!");
            }
        };
        MappCockpitComponentParameterInfo.setValueOfProperty = function (properties, propertyName, value) {
            var property = properties.filter(function (element) { return element.browseName == propertyName; })[0];
            if (property != undefined) {
                property.value = value;
            }
        };
        MappCockpitComponentParameterInfo.isTriggerParameter = function (parameter) {
            // Trigger parameters begin with "StartTrigger" in the properties name
            var prefix = "StartTrigger";
            if (parameter.browseName.substr(0, prefix.length) == prefix) {
                return true;
            }
            return false;
        };
        /**
         * retrieves the trace configuration datapoints from the parameter set
         *
         * @static
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @returns {MappCockpitComponentParameter[]}
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.retrieveTraceConfigurationDatapoints = function (componentParameters) {
            // retrieve the trace configuration datapoints
            var datapoints = new Array();
            for (var i = 0; i < componentParameters.length; i++) {
                if (MappCockpitComponentParameterInfo.isDataPoint(componentParameters[i])) {
                    datapoints.push(componentParameters[i]);
                }
            }
            // Update the values to the real values from CurrentTrcConfig Property (BUGFIX for missing StartTriggers at startup)
            var currentTrcConfigProperties = componentParameters.filter(function (element) { return element.browseName == "CurrentTrcConfig"; });
            if (currentTrcConfigProperties.length == 1) {
                if (currentTrcConfigProperties[0].value != undefined) {
                    this.updateDataPointParameters(datapoints, currentTrcConfigProperties[0].value);
                }
            }
            return datapoints;
        };
        /**
         * Updates the values of the datapoint parameters with the values from a json string (currentTraceConfigJsonString)
         * BUGFIX for missing StartTriggers at startup
         *
         * @private
         * @static
         * @param {MappCockpitComponentParameter[]} dataPointParameters
         * @param {string} currentTraceConfigJsonString
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.updateDataPointParameters = function (dataPointParameters, currentTraceConfigJsonString) {
            if (currentTraceConfigJsonString != "") {
                var currentTraceConfig = JSON.parse(currentTraceConfigJsonString);
                // Update all datapoints
                try {
                    if (currentTraceConfig.DataPoints != undefined) {
                        var _loop_1 = function (index) {
                            var dataPointID = (index + 1);
                            var currentDataPoint = currentTraceConfig.DataPoints.filter(function (element) { return element.ID == dataPointID; })[0];
                            if (currentDataPoint != undefined) {
                                dataPointParameters[index].value = currentDataPoint.Name;
                            }
                            else {
                                dataPointParameters[index].value = "";
                            }
                        };
                        for (var index = 0; index < dataPointParameters.length; index++) {
                            _loop_1(index);
                        }
                    }
                }
                catch (error) {
                    console.error("Updating of some trace configuration datapoint informations not possible!");
                }
            }
        };
        MappCockpitComponentParameterInfo.isDataPoint = function (parameter) {
            // Datapoint parameters begin with "DataPoint" in the properties name
            var prefix = "DataPoint";
            if (parameter.browseName.substr(0, prefix.length) == prefix) {
                return true;
            }
            return false;
        };
        /**
         * retrieves the trace control parameters from the parameter set
         *
         * @static
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @returns {MappCockpitComponentParameter[]}
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.retrieveTraceControlParameters = function (componentParameters) {
            // retrieve the trace configuration datapoints
            var datapoints = new Array();
            for (var i = 0; i < componentParameters.length; i++) {
                if (MappCockpitComponentParameterInfo.isTraceControlParameter(componentParameters[i])) {
                    datapoints.push(componentParameters[i]);
                }
            }
            return datapoints;
        };
        MappCockpitComponentParameterInfo.isTraceControlParameter = function (parameter) {
            if (parameter.browseName == "TraceStatus") {
                return true;
            }
            return false;
        };
        /**
        * retrieves the configuration parameters from the parameter set
        *
        * @static
        * @param {MappCockpitComponentParameter[]} componentParameters
        * @returns {MappCockpitComponentParameter[]}
        * @memberof MappCockpitComponentParameterInfo
        */
        MappCockpitComponentParameterInfo.retrieveConfigurationParameters = function (componentParameters) {
            // get the configuration meta infos
            var configurationMetaInfo;
            if ((componentParameters[0] != undefined) && componentParameters[0].component.metaData.MetaConfigConfigProps != undefined) {
                configurationMetaInfo = componentParameters[0].component.metaData.MetaConfigConfigProps.ConfigurationStructure;
            }
            else {
                return new Array();
            }
            // retrieve the configuration definitions
            var configurationParameters = MappCockpitComponentParameterInfo.retrieveParametersFromMetaInfo(["Parameter", "Group"], configurationMetaInfo, componentParameters);
            return configurationParameters;
        };
        /**
         * retrives parameters declared in the meta info
         *
         * @private
         * @static
         * @param {string[]} requesteItemTypes
         * @param {*} parameterMetaInfo
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @returns
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.retrieveParametersFromMetaInfo = function (requesteItemTypes, parameterMetaInfo, componentParameters) {
            // get requested meta items
            var metaParameterItems = mappCockpitComponentMetaData_1.MappCockpitComponentMetaData.filterMetaItems(parameterMetaInfo, requesteItemTypes);
            // create dictionary of available parameters
            var parameterSet = {};
            componentParameters.forEach(function (parameter) { parameterSet[parameter.browseName] = parameter; });
            // create dictionary of meta parameters
            var metaParameters = {};
            metaParameterItems.forEach(function (metaParameter) { metaParameters[metaParameter.Ref] = metaParameter; });
            // retrieve the parameters with matching name in the meta info
            var matchingParameters = componentParameters.filter(function (componentParameter) { return metaParameters[componentParameter.browseName] !== undefined; });
            // read and assign units
            MappCockpitComponentParameterInfo.updateParameter(matchingParameters, metaParameters);
            // notify invalid or unknown references
            var unknownParameterRefs = metaParameterItems.filter(function (metaParameter) { return metaParameter.Ref !== undefined && parameterSet[metaParameter.Ref] === undefined; });
            if (unknownParameterRefs.length > 0) {
                console.error("MappCockpitComponentParameterInfo.retrieveParametersFromMetaInfo : meta info references unknown parameters %o %o", unknownParameterRefs, parameterSet);
            }
            return matchingParameters;
        };
        MappCockpitComponentParameterInfo.readWatchableParameters = function (parameterMetaInfo) {
            // get requested meta items
            var metaParameterItems = mappCockpitComponentMetaData_1.MappCockpitComponentMetaData.filterMetaItems(parameterMetaInfo, ["Watchable"]);
            // create dictionary of meta parameters
            var metaParameters = {};
            metaParameterItems.forEach(function (metaParameter) { metaParameters[metaParameter.Ref] = metaParameter; });
            return metaParameters;
        };
        MappCockpitComponentParameterInfo.readConfigurationParameters = function (parameterMetaInfo) {
            // get requested meta items
            var metaParameterItems = mappCockpitComponentMetaData_1.MappCockpitComponentMetaData.filterMetaItems(parameterMetaInfo, ["Parameter", "Group"]);
            // create dictionary of meta parameters
            var metaParameters = {};
            metaParameterItems.forEach(function (metaParameter) { metaParameters[metaParameter.Ref] = metaParameter; });
            return metaParameters;
        };
        MappCockpitComponentParameterInfo.readMessageParameters = function (parameterMetaInfo) {
            var metaParameters = {};
            metaParameters["intArraySeverity"] = { Ref: "intArraySeverity" };
            metaParameters["strArrayDescription"] = { Ref: "strArrayDescription" };
            metaParameters["strArrayEventID"] = { Ref: "strArrayEventID" };
            metaParameters["strArrayTime"] = { Ref: "strArrayTime" };
            return metaParameters;
        };
        /**
         * reads engineering units from the meta info and assigns it to the parameters
         *
         * @private
         * @static
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @param {{}} metaParameters
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.updateParameter = function (componentParameters, metaParameters) {
            componentParameters.forEach(function (componentParameter) {
                MappCockpitComponentParameterInfo.updateParameterEngineeringUnit(metaParameters, componentParameter);
                MappCockpitComponentParameterInfo.updateParameterDisplayName(metaParameters, componentParameter);
            });
        };
        /**
         * Updates the parameters display name
         *
         * @static
         * @param {{}} metaParameters
         * @param {MappCockpitComponentParameter} componentParameter
         * @returns {*}
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.updateParameterDisplayName = function (metaParameters, componentParameter) {
            if (metaParameters[componentParameter.browseName].DisplayName) {
                componentParameter.displayName = metaParameters[componentParameter.browseName].DisplayName;
            }
        };
        /**
         * Updates the parameters engineering units
         *
         * @private
         * @static
         * @param {{}} metaParameters
         * @param {MappCockpitComponentParameter} componentParameter
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.updateParameterEngineeringUnit = function (metaParameters, componentParameter) {
            if (metaParameters[componentParameter.browseName].EU) {
                componentParameter.engineeringUnit = metaParameters[componentParameter.browseName].EU;
            }
        };
        /**
         * reads enum values if available and assigns it to the parameter
         *
         * @static
         * @param {MappCockpitComponentParameter} parameter
         * @returns {*} true if the parameter uses an enum for its value
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.readParameterEnums = function (componentParameters) {
            // get available enum parameter defs 
            var enumParameterTypeDefinitions = mappCockpitCommonInfoProvider_1.MappCockpitCommonInfoProvider.getInstance().readEnumParameterDefinitions(componentParameters, componentParameters[0].component.metaData);
            // find matching parameter
            var matchingParameters = componentParameters.filter(function (componentParameter) { return enumParameterTypeDefinitions[componentParameter.browseName]; });
            // set the enum definitions for the matching parameters
            matchingParameters.forEach(function (matchingParameter) {
                // set the enum definition
                matchingParameter.enumType = enumParameterTypeDefinitions[matchingParameter.browseName];
                console.log("MappCockpitComponentParameterInfo - set enum info %o for %o", matchingParameter.enumType, matchingParameter.component.browseName + "." + matchingParameter.browseName);
            });
        };
        return MappCockpitComponentParameterInfo;
    }());
    exports.MappCockpitComponentParameterInfo = MappCockpitComponentParameterInfo;
    /**
     * provides descriptive information for a method
     *
     * @class MappCockpitComponentMethodInfoInfo
     */
    var MappCockpitComponentMethodInfo = /** @class */ (function () {
        function MappCockpitComponentMethodInfo() {
        }
        /**
         * initializes the method input parameters
         *
         * @static
         * @param {MappCockpitComponentMethod} method
         * @returns {*}
         * @memberof MappCockpitComponentMethodInfo
         */
        MappCockpitComponentMethodInfo.updateMethodInputParameters = function (method) {
            // skip if the method has no parameters to initialize.
            if (method.inputParameters.length === 0)
                return;
            // get the meta data
            var methodMetaInfo = MappCockpitComponentMethodInfo.getMethodMetaInfo(method);
            if (methodMetaInfo) {
                // find and initialize method parameter default values
                method.inputParameters.forEach(function (methodInputParameter) {
                    MappCockpitComponentMethodInfo.updateMethodInputParameterDefaults(method, methodInputParameter, methodMetaInfo);
                });
            }
        };
        /**
         * updates respectively initializes the method input parameters with defaults
         *
         * @private
         * @static
         * @param {MappCockpitComponentMethod} method
         * @param {MappCockpitMethodParameter} methodInputParameter
         * @param {*} methodMetaInfo
         * @memberof MappCockpitComponentMethodInfo
         */
        MappCockpitComponentMethodInfo.updateMethodInputParameterDefaults = function (method, methodInputParameter, methodMetaInfo) {
            var methodParameterMetaInfo = MappCockpitComponentMethodInfo.getMethodParameterMetaInfo(methodMetaInfo, methodInputParameter);
            if (methodParameterMetaInfo) {
                // assign default value if defined ...
                MappCockpitComponentMethodInfo.updateMethodInputParameterDefaultValue(methodParameterMetaInfo, methodInputParameter, method);
                // assign engineering unit if defined.
                MappCockpitComponentMethodInfo.updateMethodParameterEngineeringUnit(methodParameterMetaInfo, methodInputParameter);
                // assign display name
                MappCockpitComponentMethodInfo.updateMethodParameterDisplayName(methodParameterMetaInfo, methodInputParameter);
            }
            else {
                console.error("MappCockpitComponentMethodInfo.initializeInputParameterDefaultValues : No meta info defined for for method parameter %o", method.browseName + "." + methodInputParameter.name);
            }
        };
        /**
         * Updates the display from meta info
         *
         * @static
         * @param {*} methodParameterMetaInfo
         * @param {MappCockpitMethodParameter} methodInputParameter
         * @returns {*}
         * @memberof MappCockpitComponentMethodInfo
         */
        MappCockpitComponentMethodInfo.updateMethodParameterDisplayName = function (methodParameterMetaInfo, methodInputParameter) {
            if (methodParameterMetaInfo.Parameter.DisplayName) {
                methodInputParameter.displayName = methodParameterMetaInfo.Parameter.DisplayName;
            }
        };
        /**
         * Updates the engineering unit
         *
         * @private
         * @static
         * @param {*} methodParameterMetaInfo
         * @param {MappCockpitMethodParameter} methodInputParameter
         * @memberof MappCockpitComponentMethodInfo
         */
        MappCockpitComponentMethodInfo.updateMethodParameterEngineeringUnit = function (methodParameterMetaInfo, methodInputParameter) {
            if (methodParameterMetaInfo.Parameter.EU) {
                methodInputParameter.engineeringUnit = methodParameterMetaInfo.Parameter.EU;
            }
        };
        /**
         * Updates the default value
         *
         * @private
         * @static
         * @param {*} methodParameterMetaInfo
         * @param {MappCockpitMethodParameter} methodInputParameter
         * @param {MappCockpitComponentMethod} method
         * @memberof MappCockpitComponentMethodInfo
         */
        MappCockpitComponentMethodInfo.updateMethodInputParameterDefaultValue = function (methodParameterMetaInfo, methodInputParameter, method) {
            var parameterHasDefaultValue = methodParameterMetaInfo.Parameter.hasOwnProperty("DefaultValue");
            if (parameterHasDefaultValue) {
                methodInputParameter.value = methodParameterMetaInfo.Parameter.DefaultValue;
            }
            else {
                // method parameters must have default values defined
                console.error("MappCockpitComponentMethodInfo.initializeInputParameterDefaultValues : No default value defined for method parameter %o", method.browseName + "." + methodInputParameter.name);
            }
        };
        /**
         * gets the meta info for a method parameter
         *
         * @private
         * @static
         * @param {*} methodMetaInfo
         * @param {MappCockpitMethodParameter} methodInputParameter
         * @returns
         * @memberof MappCockpitComponentMethodInfo
         */
        MappCockpitComponentMethodInfo.getMethodParameterMetaInfo = function (methodMetaInfo, methodInputParameter) {
            var methodParameterMetaInfos = methodMetaInfo.Parameters.filter(function (methodMetaItemParameterItem) { return methodMetaItemParameterItem.Parameter.Ref === methodInputParameter.name; });
            var methodParameterMetaInfo = methodParameterMetaInfos.length === 1 ? methodParameterMetaInfos[0] : undefined;
            return methodParameterMetaInfo;
        };
        /**
         * gets the meta info for the requested method
         *
         * @private
         * @static
         * @param {MappCockpitComponentMethod} method
         * @returns
         * @memberof MappCockpitComponentMethodInfo
         */
        MappCockpitComponentMethodInfo.getMethodMetaInfo = function (method) {
            var methodMetaInfo = undefined;
            var componentMetaData = method.component.metaData;
            if (componentMetaData == undefined) {
                return methodMetaInfo;
            }
            // get the method info from meta data
            var methodMetaItems = mappCockpitComponentMetaData_1.MappCockpitComponentMetaData.filterMetaItems(componentMetaData.MetaConfigCommands.CommandsStructure, ["Command"]);
            // get the meta info for the requested method
            var methodMetaInfos = methodMetaItems.filter(function (methodMetaItem) { return methodMetaItem.Ref === method.browseName; });
            methodMetaInfo = methodMetaInfos.length === 1 ? methodMetaInfos[0] : undefined;
            return methodMetaInfo;
        };
        /**
         * gets the method parameters contained in the meta data
         *
         * @private
         * @static
         * @param {*} methodMetaItem
         * @param {MappCockpitMethodParameter} methodInputParameter
         * @returns
         * @memberof MappCockpitComponentMethodInfo
         */
        MappCockpitComponentMethodInfo.getMatchingMethodParameters = function (methodMetaItem, methodInputParameter) {
            return methodMetaItem.Parameters.filter(function (methodMetaItemParameterItem) {
                var isMatchingMethodParameter = methodMetaItemParameterItem.Parameter.Ref === methodInputParameter.name
                    && methodMetaItemParameterItem.Parameter.DefaultValue
                    && methodMetaItemParameterItem.Parameter.DefaultValue !== "";
                return isMatchingMethodParameter;
            });
        };
        /**
         * retrieves the executable methods from the component method set
         *
         * @static
         * @param {MappCockpitComponentMethod[]} componentMethods
         * @returns {*}
         * @memberof MappCockpitComponentMethodInfo
         */
        MappCockpitComponentMethodInfo.retrieveExecutableMethods = function (componentMethods) {
            var _this = this;
            var executableMethods = Array();
            if ((componentMethods[0] == undefined) ||
                componentMethods[0].component.metaData == undefined ||
                componentMethods[0].component.metaData.MetaConfigCommands == undefined) {
                return executableMethods;
            }
            // get the commands meta infos
            var methodsMetaInfo = componentMethods[0].component.metaData.MetaConfigCommands.CommandsStructure;
            // retrieve the method definitions
            var metaMethods = mappCockpitComponentMetaData_1.MappCockpitComponentMetaData.filterMetaItems(methodsMetaInfo, ["Command"]);
            // create dictionary of available methods
            var methodSet = {};
            var metaMethodSet = {};
            componentMethods.forEach(function (method) { methodSet[method.browseName] = method; });
            metaMethods.forEach(function (metaMethod) { metaMethodSet[metaMethod.Ref] = metaMethod; });
            // retrieve the methods with matching name in the meta info
            executableMethods = metaMethods.filter(function (metaMethod) { return methodSet[metaMethod.Ref] !== undefined; }).map(function (metaMethod) { return methodSet[metaMethod.Ref]; });
            // assign the display name
            executableMethods.forEach(function (method) { _this.updateMethodDisplayName(method, metaMethodSet[method.browseName]); });
            // notify invalid or unknown methods
            var unknownMethods = metaMethods.filter(function (metaMethod) { return methodSet[metaMethod.Ref] === undefined; });
            if (unknownMethods.length > 0) {
                console.error("MappCockpitComponentMethodInfo.retrieveExecutableMethods : meta info references unknown methods %o", unknownMethods);
            }
            return executableMethods;
        };
        MappCockpitComponentMethodInfo.readExecutableMethods = function (metaInfo) {
            // get the commands meta infos
            if (metaInfo.MetaConfigCommands == undefined)
                return {};
            var methodsMetaInfo = metaInfo.MetaConfigCommands.CommandsStructure;
            // retrieve the method definitions
            var metaMethods = mappCockpitComponentMetaData_1.MappCockpitComponentMetaData.filterMetaItems(methodsMetaInfo, ["Command"]);
            // create dictionary of available methods
            var metaMethodSet = {};
            metaMethods.forEach(function (metaMethod) { metaMethodSet[metaMethod.Ref] = metaMethod; });
            return metaMethodSet;
        };
        /**
         * Updates a methods display name
         *
         * @static
         * @param {MappCockpitComponentMethod} method
         * @param {*} arg1
         * @returns {*}
         * @memberof MappCockpitComponentMethodInfo
         */
        MappCockpitComponentMethodInfo.updateMethodDisplayName = function (method, metaMethodInfo) {
            if (metaMethodInfo && metaMethodInfo.DisplayName) {
                method.displayName = metaMethodInfo.DisplayName;
            }
        };
        /**
         * reads and updates method parameter enums
         *
         * @static
         * @param {MappCockpitComponentMethod} method
         * @returns {*}
         * @memberof MappCockpitComponentMethodInfo
         */
        MappCockpitComponentMethodInfo.readMethodParameterEnums = function (method, metaData) {
            var methodParameters = method.inputParameters;
            // get available enum method parameter defs 
            var metaMethodParameterEnumTypeDefinitions = mappCockpitCommonInfoProvider_1.MappCockpitCommonInfoProvider.getInstance().readMetaEnumMethodParameterDefinitions(method, metaData);
            // find matching parameter
            var matchingMethodParameters = methodParameters.filter(function (methodParameter) { return metaMethodParameterEnumTypeDefinitions[methodParameter.name]; });
            // set the enum definitions for the matching parameters
            matchingMethodParameters.forEach(function (matchingMethodParameter) {
                // set the enum definition
                matchingMethodParameter.enumType = metaMethodParameterEnumTypeDefinitions[matchingMethodParameter.name];
                console.log("MappCockpitComponentMethodInfo - set enum info %o for %o", matchingMethodParameter.enumType, method.browseName + "." + matchingMethodParameter.name);
            });
        };
        return MappCockpitComponentMethodInfo;
    }());
    exports.MappCockpitComponentMethodInfo = MappCockpitComponentMethodInfo;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcENvY2twaXRDb21wb25lbnRSZWZsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50UmVmbGVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFJQTs7OztPQUlHO0lBRUg7UUFBQTtRQWlkQSxDQUFDO1FBOWNHOzs7Ozs7O1dBT0c7UUFDSSw2REFBMkIsR0FBbEMsVUFBbUMsbUJBQW9EO1lBQ25GLGdDQUFnQztZQUNoQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLElBQUksU0FBUyxDQUFDLElBQWlDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVUsQ0FBQyxRQUFTLENBQUMsb0JBQW9CLElBQUksU0FBUyxFQUFFO2dCQUNySixPQUFPLElBQUksS0FBSyxFQUFpQyxDQUFDO2FBQ3JEO1lBQ0QsSUFBSSxrQkFBa0IsR0FBZ0MsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBVSxDQUFDLFFBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxtQkFBbUIsQ0FBQztZQUMzSSxzQ0FBc0M7WUFDdEMsSUFBSSxtQkFBbUIsR0FBRyxpQ0FBaUMsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxFQUFFLGtCQUFrQixFQUFFLG1CQUFtQixDQUFDLENBQUM7WUFDbkosT0FBTyxtQkFBbUIsQ0FBQztRQUMvQixDQUFDO1FBR0Q7Ozs7Ozs7V0FPRztRQUNJLDJEQUF5QixHQUFoQyxVQUFpQyxtQkFBeUQ7WUFFdEYsSUFBSSx3QkFBd0IsR0FBRyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsVUFBQSxTQUFTLElBQU0sT0FBTyxTQUFTLENBQUMsVUFBVSxLQUFLLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkksSUFBSSx3QkFBd0IsSUFBSSxTQUFTLEVBQUU7Z0JBQ3ZD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QUMsQ0FBQztZQUNySix1REFBdUQ7WUFDdkQsd0JBQXdCLENBQUMsT0FBTyxDQUFDLFVBQUMsdUJBQXVCO2dCQUNyRCwwQkFBMEI7Z0JBQzFCLHVCQUF1QixDQUFDLFFBQVEsR0FBRyxzQ0FBc0MsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDeEcsT0FBTyxDQUFDLEdBQUcsQ0FBQywwREFBMEQsRUFBRSx1QkFBdUIsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLFVBQVUsR0FBRyxHQUFHLEdBQUcsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEssQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBQ0wscUNBQUM7SUFBRCxDQUFDLEFBL1FELElBK1FDO0lBRTJDLHdFQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLCBNYXBwQ29ja3BpdENvbXBvbmVudCwgTWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXIsIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyIH0gZnJvbSBcIi4vbWFwcENvY2twaXRDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnRNZXRhRGF0YSB9IGZyb20gXCIuL21hcHBDb2NrcGl0Q29tcG9uZW50TWV0YURhdGFcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21tb25JbmZvUHJvdmlkZXIgfSBmcm9tIFwiLi4vZGlhZ25vc3RpY3MvbWFwcENvY2twaXRDb21tb25JbmZvUHJvdmlkZXJcIjtcclxuXHJcbi8qKlxyXG4gKiBwcm92aWRlcyBkZXNjcmlwdGl2ZSBpbmZvcm1hdGlvbiBmb3IgYSBwYXJhbWV0ZXJcclxuICpcclxuICogQGNsYXNzIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mb1xyXG4gKi9cclxuXHJcbmNsYXNzIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mbyB7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmV0cmlldmVzIHRoZSB3YXRjaGFibGVzIGZyb20gdGhlIHBhcmFtZXRlciBzZXRcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IGNvbXBvbmVudFBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm5zIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mb1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgcmV0cmlldmVXYXRjaGFibGVQYXJhbWV0ZXJzKGNvbXBvbmVudFBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdIHtcclxuICAgICAgICAvLyBnZXQgdGhlIHdhdGNoYWJsZXMgbWV0YSBpbmZvc1xyXG4gICAgICAgIGlmICgoY29tcG9uZW50UGFyYW1ldGVyc1swXSA9PSB1bmRlZmluZWQpIHx8ICg8YW55Pig8TWFwcENvY2twaXRDb21wb25lbnQ+Y29tcG9uZW50UGFyYW1ldGVyc1swXS5jb21wb25lbnQpLm1ldGFEYXRhKS5NZXRhQ29uZmlnV2F0Y2hhYmxlcyA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHdhdGNoYWJsZXNNZXRhSW5mbyA9ICg8YW55Pig8TWFwcENvY2twaXRDb21wb25lbnQ+Y29tcG9uZW50UGFyYW1ldGVyc1swXS5jb21wb25lbnQpLm1ldGFEYXRhKS5NZXRhQ29uZmlnV2F0Y2hhYmxlcy5XYXRjaGFibGVzU3RydWN0dXJlO1xyXG4gICAgICAgIC8vIHJldHJpZXZlIHRoZSB3YXRjaGFibGVzIGRlZmluaXRpb25zXHJcbiAgICAgICAgbGV0IHdhdGNoYWJsZVBhcmFtZXRlcnMgPSBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm8ucmV0cmlldmVQYXJhbWV0ZXJzRnJvbU1ldGFJbmZvKFtcIldhdGNoYWJsZVwiXSwgd2F0Y2hhYmxlc01ldGFJbmZvLCBjb21wb25lbnRQYXJhbWV0ZXJzKTtcclxuICAgICAgICByZXR1cm4gd2F0Y2hhYmxlUGFyYW1ldGVycztcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZXRyaWV2ZXMgdGhlIG1lc3NhZ2UgcGFyYW1ldGVycyBmcm9tIHRoZSBjb21wb25lbnQgcGFyYW1ldGVyc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPn0gY29tcG9uZW50UGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybnMge0FycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm9cclxuICAgICAqL1xyXG4gICAgc3RhdGljIHJldHJpZXZlTWVzc2FnZVBhcmFtZXRlcnMoY29tcG9uZW50UGFyYW1ldGVyczogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+KTogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSB7XHJcblxyXG4gICAgICAgIGxldCBtZXNzYWdlU2V2ZXJpdHlQYXJhbWV0ZXIgPSBjb21wb25lbnRQYXJhbWV0ZXJzLmZpbHRlcihwYXJhbWV0ZXIgPT4geyByZXR1cm4gcGFyYW1ldGVyLmJyb3dzZU5hbWUgPT09IFwiaW50QXJyYXlTZXZlcml0eVwiOyB9KVswXTtcclxuICAgICAgICBpZiAobWVzc2FnZVNldmVyaXR5UGFyYW1ldGVyID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBtZXNzYWdlU2V2ZXJpdHlQYXJhbWV0ZXIgPSBjb21wb25lbnRQYXJhbWV0ZXJzLmZpbHRlcihwYXJhbWV0ZXIgPT4geyByZXR1cm4gcGFyYW1ldGVyLmJyb3dzZU5hbWUgPT09IFwic3RyQXJyYXlTZXZlcml0eVwiOyB9KVswXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBtZXNzYWdlRGVzY3JpcHRpb25QYXJhbWV0ZXIgPSBjb21wb25lbnRQYXJhbWV0ZXJzLmZpbHRlcihwYXJhbWV0ZXIgPT4geyByZXR1cm4gcGFyYW1ldGVyLmJyb3dzZU5hbWUgPT09IFwic3RyQXJyYXlEZXNjcmlwdGlvblwiOyB9KVswXTtcclxuICAgICAgICBsZXQgbWVzc2FnZUV2ZW50SWRQYXJhbWV0ZXIgPSBjb21wb25lbnRQYXJhbWV0ZXJzLmZpbHRlcihwYXJhbWV0ZXIgPT4geyByZXR1cm4gcGFyYW1ldGVyLmJyb3dzZU5hbWUgPT09IFwic3RyQXJyYXlFdmVudElEXCI7IH0pWzBdO1xyXG4gICAgICAgIGxldCBtZXNzYWdlVGltZVN0YW1wUGFyYW1ldGVyID0gY29tcG9uZW50UGFyYW1ldGVycy5maWx0ZXIocGFyYW1ldGVyID0+IHsgcmV0dXJuIHBhcmFtZXRlci5icm93c2VOYW1lID09PSBcInN0ckFycmF5VGltZVwiOyB9KVswXTtcclxuXHJcbiAgICAgICAgcmV0dXJuIFttZXNzYWdlU2V2ZXJpdHlQYXJhbWV0ZXIsIG1lc3NhZ2VEZXNjcmlwdGlvblBhcmFtZXRlciwgbWVzc2FnZUV2ZW50SWRQYXJhbWV0ZXIsIG1lc3NhZ2VUaW1lU3RhbXBQYXJhbWV0ZXJdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmV0cmlldmVzIHRoZSB0cmFjZSBjb25maWd1cmF0aW9uIHRpbWluZyBwYXJhbWV0ZXJzIGZyb20gdGhlIHBhcmFtZXRlciBzZXRcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IGNvbXBvbmVudFBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm5zIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mb1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgcmV0cmlldmVUcmFjZUNvbmZpZ3VyYXRpb25UaW1pbmdQYXJhbWV0ZXJzKGNvbXBvbmVudFBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdIHtcclxuICAgICAgICAvLyByZXRyaWV2ZSB0aGUgdHJhY2UgY29uZmlndXJhdGlvbiB0aW1pbmcgcGFyYW1ldGVyc1xyXG4gICAgICAgIGxldCB0aW1pbmdQYXJhbWV0ZXJzID0gbmV3IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPigpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29tcG9uZW50UGFyYW1ldGVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvLmlzVGltaW5nUGFyYW1ldGVyKGNvbXBvbmVudFBhcmFtZXRlcnNbaV0pKSB7XHJcbiAgICAgICAgICAgICAgICB0aW1pbmdQYXJhbWV0ZXJzLnB1c2goY29tcG9uZW50UGFyYW1ldGVyc1tpXSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVXBkYXRlIHRoZSB2YWx1ZXMgdG8gdGhlIHJlYWwgdmFsdWVzIGZyb20gQ3VycmVudFRyY0NvbmZpZyBQcm9wZXJ0eSAoQlVHRklYIGZvciBtaXNzaW5nIFN0YXJ0VHJpZ2dlcnMgYXQgc3RhcnR1cClcclxuICAgICAgICBsZXQgY3VycmVudFRyY0NvbmZpZ1Byb3BlcnRpZXMgPSBjb21wb25lbnRQYXJhbWV0ZXJzLmZpbHRlcigoZWxlbWVudCkgPT4geyByZXR1cm4gZWxlbWVudC5icm93c2VOYW1lID09IFwiQ3VycmVudFRyY0NvbmZpZ1wifSk7XHJcbiAgICAgICAgaWYoY3VycmVudFRyY0NvbmZpZ1Byb3BlcnRpZXMubGVuZ3RoID09IDEpe1xyXG4gICAgICAgICAgICBpZihjdXJyZW50VHJjQ29uZmlnUHJvcGVydGllc1swXS52YWx1ZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVUaW1pbmdQYXJhbWV0ZXJzKHRpbWluZ1BhcmFtZXRlcnMsIGN1cnJlbnRUcmNDb25maWdQcm9wZXJ0aWVzWzBdLnZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGltaW5nUGFyYW1ldGVycztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIHZhbHVlcyBvZiB0aGUgdGltaW5nIHBhcmFtZXRlcnMgd2l0aCB0aGUgdmFsdWVzIGZyb20gYSBqc29uIHN0cmluZyAoY3VycmVudFRyYWNlQ29uZmlnSnNvblN0cmluZykgXHJcbiAgICAgKiBCVUdGSVggZm9yIG1pc3NpbmcgU3RhcnRUcmlnZ2VycyBhdCBzdGFydHVwXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gdGltaW5nUGFyYW1ldGVyc1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGN1cnJlbnRUcmFjZUNvbmZpZ0pzb25TdHJpbmdcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm9cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgdXBkYXRlVGltaW5nUGFyYW1ldGVycyh0aW1pbmdQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdLCBjdXJyZW50VHJhY2VDb25maWdKc29uU3RyaW5nOiBzdHJpbmcpe1xyXG4gICAgICAgIGlmKGN1cnJlbnRUcmFjZUNvbmZpZ0pzb25TdHJpbmcgIT0gXCJcIil7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50VHJhY2VDb25maWcgPSBKU09OLnBhcnNlKGN1cnJlbnRUcmFjZUNvbmZpZ0pzb25TdHJpbmcpO1xyXG4gICAgICAgICAgICAvLyBVcGRhdGUgYWxsIHRpbWluZyBwYXJhbWV0ZXJzXHJcbiAgICAgICAgICAgIHRyeXtcclxuICAgICAgICAgICAgICAgIGlmKGN1cnJlbnRUcmFjZUNvbmZpZy5UaW1pbmcgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlT2ZQcm9wZXJ0eSh0aW1pbmdQYXJhbWV0ZXJzLCBcIlRpbWluZ19Ub3RhbFJlY29yZGluZ1RpbWVcIiwgY3VycmVudFRyYWNlQ29uZmlnLlRpbWluZy5Ub3RhbFJlY29yZGluZ1RpbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVPZlByb3BlcnR5KHRpbWluZ1BhcmFtZXRlcnMsIFwiVGltaW5nX1RyaWdnZXJPZmZzZXRUaW1lXCIsIGN1cnJlbnRUcmFjZUNvbmZpZy5UaW1pbmcuVHJpZ2dlck9mZnNldFRpbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVPZlByb3BlcnR5KHRpbWluZ1BhcmFtZXRlcnMsIFwiVGltaW5nX0Fjb3Bvc1NhbXBsZVRpbWVcIiwgY3VycmVudFRyYWNlQ29uZmlnLlRpbWluZy5BQ09QT1NTYW1wbGVUaW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlT2ZQcm9wZXJ0eSh0aW1pbmdQYXJhbWV0ZXJzLCBcIlRpbWluZ19QbGNUYXNrQ2xhc3NcIiwgY3VycmVudFRyYWNlQ29uZmlnLlRpbWluZy5QVlRhc2tDbGFzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZU9mUHJvcGVydHkodGltaW5nUGFyYW1ldGVycywgXCJUaW1pbmdfUGxjU2FtcGxlVGltZVwiLCBjdXJyZW50VHJhY2VDb25maWcuVGltaW5nLlBsY1NhbXBsZVRpbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoKGVycm9yKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJVcGRhdGluZyBvZiBzb21lIHRyYWNlIGNvbmZpZ3VyYXRpb24gdGltaW5nIGluZm9ybWF0aW9ucyBub3QgcG9zc2libGUhXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgaXNUaW1pbmdQYXJhbWV0ZXIocGFyYW1ldGVyOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIC8vIFRpbWluZyBwYXJhbWV0ZXJzIGJlZ2luIHdpdGggXCJUaW1pbmdfXCIgaW4gdGhlIHByb3BlcnRpZXMgbmFtZVxyXG4gICAgICAgIGxldCBwcmVmaXggPSBcIlRpbWluZ19cIjtcclxuICAgICAgICBpZiAocGFyYW1ldGVyLmJyb3dzZU5hbWUuc3Vic3RyKDAsIHByZWZpeC5sZW5ndGgpID09IHByZWZpeCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmV0cmlldmVzIHRoZSB0cmFjZSBjb25maWd1cmF0aW9uIHRyaWdnZXIgcGFyYW1ldGVycyBmcm9tIHRoZSBwYXJhbWV0ZXIgc2V0XHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSBjb21wb25lbnRQYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJucyB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm9cclxuICAgICAqL1xyXG4gICAgc3RhdGljIHJldHJpZXZlVHJhY2VDb25maWd1cmF0aW9uVHJpZ2dlclBhcmFtZXRlcnMoY29tcG9uZW50UGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSk6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10ge1xyXG4gICAgICAgIC8vIHJldHJpZXZlIHRoZSB0cmFjZSBjb25maWd1cmF0aW9uIHRyaWdnZXIgcGFyYW1ldGVyc1xyXG4gICAgICAgIGxldCB0cmlnZ2VyUGFyYW1ldGVycyA9IG5ldyBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4oKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbXBvbmVudFBhcmFtZXRlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mby5pc1RyaWdnZXJQYXJhbWV0ZXIoY29tcG9uZW50UGFyYW1ldGVyc1tpXSkpIHtcclxuICAgICAgICAgICAgICAgIHRyaWdnZXJQYXJhbWV0ZXJzLnB1c2goY29tcG9uZW50UGFyYW1ldGVyc1tpXSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVXBkYXRlIHRoZSB2YWx1ZXMgdG8gdGhlIHJlYWwgdmFsdWVzIGZyb20gQ3VycmVudFRyY0NvbmZpZyBQcm9wZXJ0eSAoQlVHRklYIGZvciBtaXNzaW5nIFN0YXJ0VHJpZ2dlcnMgYXQgc3RhcnR1cClcclxuICAgICAgICBsZXQgY3VycmVudFRyY0NvbmZpZ1Byb3BlcnRpZXMgPSBjb21wb25lbnRQYXJhbWV0ZXJzLmZpbHRlcigoZWxlbWVudCkgPT4geyByZXR1cm4gZWxlbWVudC5icm93c2VOYW1lID09IFwiQ3VycmVudFRyY0NvbmZpZ1wifSk7XHJcbiAgICAgICAgaWYoY3VycmVudFRyY0NvbmZpZ1Byb3BlcnRpZXMubGVuZ3RoID09IDEpe1xyXG4gICAgICAgICAgICBpZihjdXJyZW50VHJjQ29uZmlnUHJvcGVydGllc1swXS52YWx1ZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVUcmlnZ2VyUGFyYW1ldGVycyh0cmlnZ2VyUGFyYW1ldGVycywgY3VycmVudFRyY0NvbmZpZ1Byb3BlcnRpZXNbMF0udmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cmlnZ2VyUGFyYW1ldGVycztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIHZhbHVlcyBvZiB0aGUgdHJpZ2dlciBwYXJhbWV0ZXJzIHdpdGggdGhlIHZhbHVlcyBmcm9tIGEganNvbiBzdHJpbmcgKGN1cnJlbnRUcmFjZUNvbmZpZ0pzb25TdHJpbmcpIFxyXG4gICAgICogQlVHRklYIGZvciBtaXNzaW5nIFN0YXJ0VHJpZ2dlcnMgYXQgc3RhcnR1cFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IHRyaWdnZXJQYXJhbWV0ZXJzXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY3VycmVudFRyYWNlQ29uZmlnSnNvblN0cmluZ1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mb1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyB1cGRhdGVUcmlnZ2VyUGFyYW1ldGVycyh0cmlnZ2VyUGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSwgY3VycmVudFRyYWNlQ29uZmlnSnNvblN0cmluZzogc3RyaW5nKXtcclxuICAgICAgICBpZihjdXJyZW50VHJhY2VDb25maWdKc29uU3RyaW5nICE9IFwiXCIpe1xyXG4gICAgICAgICAgICBsZXQgY3VycmVudFRyYWNlQ29uZmlnID0gSlNPTi5wYXJzZShjdXJyZW50VHJhY2VDb25maWdKc29uU3RyaW5nKTtcclxuICAgICAgICAgICAgLy8gVXBkYXRlIGFsbCBzdXBwb3J0ZWQgdHJpZ2dlcnNcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGkgPCAyOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTaW5nbGVUcmlnZ2VyKHRyaWdnZXJQYXJhbWV0ZXJzLCBpLCBjdXJyZW50VHJhY2VDb25maWcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgdmFsdWVzIG9mIGEgdHJpZ2dlciB3aXRoIHRoZSBnaXZlbiBpbmRleCB3aXRoIHRoZSB2YWx1ZXMgZnJvbSBhIGpzb24gc3RyaW5nIChjdXJyZW50VHJhY2VDb25maWdKc29uU3RyaW5nKSBcclxuICAgICAqIEJVR0ZJWCBmb3IgbWlzc2luZyBTdGFydFRyaWdnZXJzIGF0IHN0YXJ0dXBcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSB0cmlnZ2VyUGFyYW1ldGVyc1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRyaWdnZXJJbmRleFxyXG4gICAgICogQHBhcmFtIHsqfSBjdXJyZW50VHJhY2VDb25maWdcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm9cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgdXBkYXRlU2luZ2xlVHJpZ2dlcih0cmlnZ2VyUGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSwgdHJpZ2dlckluZGV4OiBudW1iZXIsIGN1cnJlbnRUcmFjZUNvbmZpZyl7XHJcbiAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICBsZXQgdHJpZ2dlcklEID0gKHRyaWdnZXJJbmRleCsxKTtcclxuICAgICAgICAgICAgbGV0IHN0YXJ0VHJpZ2dlclByZWZpeEJyb3dzZU5hbWUgPSBcIlN0YXJ0VHJpZ2dlclwiICsgdHJpZ2dlcklEICsgXCJfXCI7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50VHJpZ2dlckNmZyA9IGN1cnJlbnRUcmFjZUNvbmZpZy5UcmlnZ2Vycy5maWx0ZXIoKGVsZW1lbnQpID0+IHsgcmV0dXJuIGVsZW1lbnQuSUQgPT0gdHJpZ2dlcklEfSlbMF07XHJcbiAgICAgICAgICAgIGlmKGN1cnJlbnRUcmlnZ2VyQ2ZnICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlT2ZQcm9wZXJ0eSh0cmlnZ2VyUGFyYW1ldGVycywgc3RhcnRUcmlnZ2VyUHJlZml4QnJvd3NlTmFtZSArIFwiQ29uZGl0aW9uXCIsIGN1cnJlbnRUcmlnZ2VyQ2ZnLkV2ZW50KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVPZlByb3BlcnR5KHRyaWdnZXJQYXJhbWV0ZXJzLCBzdGFydFRyaWdnZXJQcmVmaXhCcm93c2VOYW1lICsgXCJEYXRhUG9pbnRcIiwgY3VycmVudFRyaWdnZXJDZmcuRGF0YVBvaW50KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVPZlByb3BlcnR5KHRyaWdnZXJQYXJhbWV0ZXJzLCBzdGFydFRyaWdnZXJQcmVmaXhCcm93c2VOYW1lICsgXCJUaHJlc2hvbGRcIiwgY3VycmVudFRyaWdnZXJDZmcuVGhyZXNob2xkKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVPZlByb3BlcnR5KHRyaWdnZXJQYXJhbWV0ZXJzLCBzdGFydFRyaWdnZXJQcmVmaXhCcm93c2VOYW1lICsgXCJXaW5kb3dcIiwgY3VycmVudFRyaWdnZXJDZmcuV2luZG93KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgLy8gU2V0IFRyaWdnZXIgdG8gZGVmYXVsdCBpZiBub3QgYXZhaWxhYmxlIGluIGN1cnJlbnQgdHJhY2UgY29uZmlnXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlT2ZQcm9wZXJ0eSh0cmlnZ2VyUGFyYW1ldGVycywgc3RhcnRUcmlnZ2VyUHJlZml4QnJvd3NlTmFtZSArIFwiQ29uZGl0aW9uXCIsIFwiMjBcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlT2ZQcm9wZXJ0eSh0cmlnZ2VyUGFyYW1ldGVycywgc3RhcnRUcmlnZ2VyUHJlZml4QnJvd3NlTmFtZSArIFwiRGF0YVBvaW50XCIsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZU9mUHJvcGVydHkodHJpZ2dlclBhcmFtZXRlcnMsIHN0YXJ0VHJpZ2dlclByZWZpeEJyb3dzZU5hbWUgKyBcIlRocmVzaG9sZFwiLCBcIjBcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlT2ZQcm9wZXJ0eSh0cmlnZ2VyUGFyYW1ldGVycywgc3RhcnRUcmlnZ2VyUHJlZml4QnJvd3NlTmFtZSArIFwiV2luZG93XCIsIFwiMFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaChlcnJvcil7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJVcGRhdGluZyBvZiBzb21lIHRyYWNlIGNvbmZpZ3VyYXRpb24gdHJpZ2dlciBpbmZvcm1hdGlvbnMgbm90IHBvc3NpYmxlIVwiKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBzZXRWYWx1ZU9mUHJvcGVydHkocHJvcGVydGllczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSwgcHJvcGVydHlOYW1lOiBzdHJpbmcsIHZhbHVlKXtcclxuICAgICAgICBsZXQgcHJvcGVydHkgPSBwcm9wZXJ0aWVzLmZpbHRlcigoZWxlbWVudCkgPT4geyByZXR1cm4gZWxlbWVudC5icm93c2VOYW1lID09IHByb3BlcnR5TmFtZX0pWzBdO1xyXG4gICAgICAgIGlmKHByb3BlcnR5ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHByb3BlcnR5LnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGlzVHJpZ2dlclBhcmFtZXRlcihwYXJhbWV0ZXI6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgLy8gVHJpZ2dlciBwYXJhbWV0ZXJzIGJlZ2luIHdpdGggXCJTdGFydFRyaWdnZXJcIiBpbiB0aGUgcHJvcGVydGllcyBuYW1lXHJcbiAgICAgICAgbGV0IHByZWZpeCA9IFwiU3RhcnRUcmlnZ2VyXCI7XHJcbiAgICAgICAgaWYgKHBhcmFtZXRlci5icm93c2VOYW1lLnN1YnN0cigwLCBwcmVmaXgubGVuZ3RoKSA9PSBwcmVmaXgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJldHJpZXZlcyB0aGUgdHJhY2UgY29uZmlndXJhdGlvbiBkYXRhcG9pbnRzIGZyb20gdGhlIHBhcmFtZXRlciBzZXRcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IGNvbXBvbmVudFBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm5zIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mb1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgcmV0cmlldmVUcmFjZUNvbmZpZ3VyYXRpb25EYXRhcG9pbnRzKGNvbXBvbmVudFBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdIHtcclxuICAgICAgICAvLyByZXRyaWV2ZSB0aGUgdHJhY2UgY29uZmlndXJhdGlvbiBkYXRhcG9pbnRzXHJcbiAgICAgICAgbGV0IGRhdGFwb2ludHMgPSBuZXcgQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+KCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb21wb25lbnRQYXJhbWV0ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm8uaXNEYXRhUG9pbnQoY29tcG9uZW50UGFyYW1ldGVyc1tpXSkpIHtcclxuICAgICAgICAgICAgICAgIGRhdGFwb2ludHMucHVzaChjb21wb25lbnRQYXJhbWV0ZXJzW2ldKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBVcGRhdGUgdGhlIHZhbHVlcyB0byB0aGUgcmVhbCB2YWx1ZXMgZnJvbSBDdXJyZW50VHJjQ29uZmlnIFByb3BlcnR5IChCVUdGSVggZm9yIG1pc3NpbmcgU3RhcnRUcmlnZ2VycyBhdCBzdGFydHVwKVxyXG4gICAgICAgIGxldCBjdXJyZW50VHJjQ29uZmlnUHJvcGVydGllcyA9IGNvbXBvbmVudFBhcmFtZXRlcnMuZmlsdGVyKChlbGVtZW50KSA9PiB7IHJldHVybiBlbGVtZW50LmJyb3dzZU5hbWUgPT0gXCJDdXJyZW50VHJjQ29uZmlnXCJ9KTtcclxuICAgICAgICBpZihjdXJyZW50VHJjQ29uZmlnUHJvcGVydGllcy5sZW5ndGggPT0gMSl7XHJcbiAgICAgICAgICAgIGlmKGN1cnJlbnRUcmNDb25maWdQcm9wZXJ0aWVzWzBdLnZhbHVlICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZURhdGFQb2ludFBhcmFtZXRlcnMoZGF0YXBvaW50cywgY3VycmVudFRyY0NvbmZpZ1Byb3BlcnRpZXNbMF0udmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkYXRhcG9pbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgdmFsdWVzIG9mIHRoZSBkYXRhcG9pbnQgcGFyYW1ldGVycyB3aXRoIHRoZSB2YWx1ZXMgZnJvbSBhIGpzb24gc3RyaW5nIChjdXJyZW50VHJhY2VDb25maWdKc29uU3RyaW5nKSBcclxuICAgICAqIEJVR0ZJWCBmb3IgbWlzc2luZyBTdGFydFRyaWdnZXJzIGF0IHN0YXJ0dXBcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSBkYXRhUG9pbnRQYXJhbWV0ZXJzXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY3VycmVudFRyYWNlQ29uZmlnSnNvblN0cmluZ1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mb1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyB1cGRhdGVEYXRhUG9pbnRQYXJhbWV0ZXJzKGRhdGFQb2ludFBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10sIGN1cnJlbnRUcmFjZUNvbmZpZ0pzb25TdHJpbmc6IHN0cmluZyl7XHJcbiAgICAgICAgaWYoY3VycmVudFRyYWNlQ29uZmlnSnNvblN0cmluZyAhPSBcIlwiKXtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRUcmFjZUNvbmZpZyA9IEpTT04ucGFyc2UoY3VycmVudFRyYWNlQ29uZmlnSnNvblN0cmluZyk7XHJcbiAgICAgICAgICAgIC8vIFVwZGF0ZSBhbGwgZGF0YXBvaW50c1xyXG4gICAgICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgICAgICBpZihjdXJyZW50VHJhY2VDb25maWcuRGF0YVBvaW50cyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaW5kZXggPSAwOyBpbmRleCA8IGRhdGFQb2ludFBhcmFtZXRlcnMubGVuZ3RoOyBpbmRleCsrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGFQb2ludElEID0gKGluZGV4KzEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudERhdGFQb2ludCA9IGN1cnJlbnRUcmFjZUNvbmZpZy5EYXRhUG9pbnRzLmZpbHRlcigoZWxlbWVudCkgPT4geyByZXR1cm4gZWxlbWVudC5JRCA9PSBkYXRhUG9pbnRJRH0pWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihjdXJyZW50RGF0YVBvaW50ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhUG9pbnRQYXJhbWV0ZXJzW2luZGV4XS52YWx1ZSA9IGN1cnJlbnREYXRhUG9pbnQuTmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVBvaW50UGFyYW1ldGVyc1tpbmRleF0udmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoKGVycm9yKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJVcGRhdGluZyBvZiBzb21lIHRyYWNlIGNvbmZpZ3VyYXRpb24gZGF0YXBvaW50IGluZm9ybWF0aW9ucyBub3QgcG9zc2libGUhXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgaXNEYXRhUG9pbnQocGFyYW1ldGVyOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIC8vIERhdGFwb2ludCBwYXJhbWV0ZXJzIGJlZ2luIHdpdGggXCJEYXRhUG9pbnRcIiBpbiB0aGUgcHJvcGVydGllcyBuYW1lXHJcbiAgICAgICAgbGV0IHByZWZpeCA9IFwiRGF0YVBvaW50XCI7XHJcbiAgICAgICAgaWYgKHBhcmFtZXRlci5icm93c2VOYW1lLnN1YnN0cigwLCBwcmVmaXgubGVuZ3RoKSA9PSBwcmVmaXgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJldHJpZXZlcyB0aGUgdHJhY2UgY29udHJvbCBwYXJhbWV0ZXJzIGZyb20gdGhlIHBhcmFtZXRlciBzZXRcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IGNvbXBvbmVudFBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm5zIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mb1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgcmV0cmlldmVUcmFjZUNvbnRyb2xQYXJhbWV0ZXJzKGNvbXBvbmVudFBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdIHtcclxuICAgICAgICAvLyByZXRyaWV2ZSB0aGUgdHJhY2UgY29uZmlndXJhdGlvbiBkYXRhcG9pbnRzXHJcbiAgICAgICAgbGV0IGRhdGFwb2ludHMgPSBuZXcgQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+KCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb21wb25lbnRQYXJhbWV0ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm8uaXNUcmFjZUNvbnRyb2xQYXJhbWV0ZXIoY29tcG9uZW50UGFyYW1ldGVyc1tpXSkpIHtcclxuICAgICAgICAgICAgICAgIGRhdGFwb2ludHMucHVzaChjb21wb25lbnRQYXJhbWV0ZXJzW2ldKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkYXRhcG9pbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGlzVHJhY2VDb250cm9sUGFyYW1ldGVyKHBhcmFtZXRlcjogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAocGFyYW1ldGVyLmJyb3dzZU5hbWUgPT0gXCJUcmFjZVN0YXR1c1wiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIHJldHJpZXZlcyB0aGUgY29uZmlndXJhdGlvbiBwYXJhbWV0ZXJzIGZyb20gdGhlIHBhcmFtZXRlciBzZXRcclxuICAgICpcclxuICAgICogQHN0YXRpY1xyXG4gICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IGNvbXBvbmVudFBhcmFtZXRlcnNcclxuICAgICogQHJldHVybnMge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119XHJcbiAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm9cclxuICAgICovXHJcbiAgICBzdGF0aWMgcmV0cmlldmVDb25maWd1cmF0aW9uUGFyYW1ldGVycyhjb21wb25lbnRQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdKTogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSB7XHJcbiAgICAgICAgLy8gZ2V0IHRoZSBjb25maWd1cmF0aW9uIG1ldGEgaW5mb3NcclxuICAgICAgICBsZXQgY29uZmlndXJhdGlvbk1ldGFJbmZvO1xyXG4gICAgICAgIGlmICgoY29tcG9uZW50UGFyYW1ldGVyc1swXSAhPSB1bmRlZmluZWQpICYmICg8YW55Pig8TWFwcENvY2twaXRDb21wb25lbnQ+Y29tcG9uZW50UGFyYW1ldGVyc1swXS5jb21wb25lbnQpLm1ldGFEYXRhKS5NZXRhQ29uZmlnQ29uZmlnUHJvcHMgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZ3VyYXRpb25NZXRhSW5mbyA9ICg8YW55Pig8TWFwcENvY2twaXRDb21wb25lbnQ+Y29tcG9uZW50UGFyYW1ldGVyc1swXS5jb21wb25lbnQpLm1ldGFEYXRhKS5NZXRhQ29uZmlnQ29uZmlnUHJvcHMuQ29uZmlndXJhdGlvblN0cnVjdHVyZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQXJyYXkoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHJldHJpZXZlIHRoZSBjb25maWd1cmF0aW9uIGRlZmluaXRpb25zXHJcbiAgICAgICAgbGV0IGNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzID0gTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvLnJldHJpZXZlUGFyYW1ldGVyc0Zyb21NZXRhSW5mbyhbXCJQYXJhbWV0ZXJcIiwgXCJHcm91cFwiXSwgY29uZmlndXJhdGlvbk1ldGFJbmZvLCBjb21wb25lbnRQYXJhbWV0ZXJzKTtcclxuICAgICAgICByZXR1cm4gY29uZmlndXJhdGlvblBhcmFtZXRlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZXRyaXZlcyBwYXJhbWV0ZXJzIGRlY2xhcmVkIGluIHRoZSBtZXRhIGluZm9cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gcmVxdWVzdGVJdGVtVHlwZXNcclxuICAgICAqIEBwYXJhbSB7Kn0gcGFyYW1ldGVyTWV0YUluZm9cclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gY29tcG9uZW50UGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm9cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmV0cmlldmVQYXJhbWV0ZXJzRnJvbU1ldGFJbmZvKHJlcXVlc3RlSXRlbVR5cGVzOiBzdHJpbmdbXSwgcGFyYW1ldGVyTWV0YUluZm86IGFueSwgY29tcG9uZW50UGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSkge1xyXG5cclxuICAgICAgICAvLyBnZXQgcmVxdWVzdGVkIG1ldGEgaXRlbXNcclxuICAgICAgICBsZXQgbWV0YVBhcmFtZXRlckl0ZW1zID0gTWFwcENvY2twaXRDb21wb25lbnRNZXRhRGF0YS5maWx0ZXJNZXRhSXRlbXMocGFyYW1ldGVyTWV0YUluZm8sIHJlcXVlc3RlSXRlbVR5cGVzKTtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIGRpY3Rpb25hcnkgb2YgYXZhaWxhYmxlIHBhcmFtZXRlcnNcclxuICAgICAgICBsZXQgcGFyYW1ldGVyU2V0ID0ge307XHJcbiAgICAgICAgY29tcG9uZW50UGFyYW1ldGVycy5mb3JFYWNoKChwYXJhbWV0ZXIpID0+IHsgcGFyYW1ldGVyU2V0W3BhcmFtZXRlci5icm93c2VOYW1lXSA9IHBhcmFtZXRlcjsgfSk7XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSBkaWN0aW9uYXJ5IG9mIG1ldGEgcGFyYW1ldGVyc1xyXG4gICAgICAgIGxldCBtZXRhUGFyYW1ldGVycyA9IHt9O1xyXG4gICAgICAgIG1ldGFQYXJhbWV0ZXJJdGVtcy5mb3JFYWNoKChtZXRhUGFyYW1ldGVyKSA9PiB7IG1ldGFQYXJhbWV0ZXJzW21ldGFQYXJhbWV0ZXIuUmVmXSA9IG1ldGFQYXJhbWV0ZXI7IH0pO1xyXG5cclxuICAgICAgICAvLyByZXRyaWV2ZSB0aGUgcGFyYW1ldGVycyB3aXRoIG1hdGNoaW5nIG5hbWUgaW4gdGhlIG1ldGEgaW5mb1xyXG4gICAgICAgIGxldCBtYXRjaGluZ1BhcmFtZXRlcnMgPSBjb21wb25lbnRQYXJhbWV0ZXJzLmZpbHRlcigoY29tcG9uZW50UGFyYW1ldGVyKSA9PiB7IHJldHVybiBtZXRhUGFyYW1ldGVyc1tjb21wb25lbnRQYXJhbWV0ZXIuYnJvd3NlTmFtZV0gIT09IHVuZGVmaW5lZDsgfSk7XHJcblxyXG4gICAgICAgIC8vIHJlYWQgYW5kIGFzc2lnbiB1bml0c1xyXG4gICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mby51cGRhdGVQYXJhbWV0ZXIobWF0Y2hpbmdQYXJhbWV0ZXJzLCBtZXRhUGFyYW1ldGVycyk7XHJcblxyXG4gICAgICAgIC8vIG5vdGlmeSBpbnZhbGlkIG9yIHVua25vd24gcmVmZXJlbmNlc1xyXG4gICAgICAgIGxldCB1bmtub3duUGFyYW1ldGVyUmVmcyA9IG1ldGFQYXJhbWV0ZXJJdGVtcy5maWx0ZXIoKG1ldGFQYXJhbWV0ZXIpID0+IHsgcmV0dXJuIG1ldGFQYXJhbWV0ZXIuUmVmICE9PSB1bmRlZmluZWQgJiYgcGFyYW1ldGVyU2V0W21ldGFQYXJhbWV0ZXIuUmVmXSA9PT0gdW5kZWZpbmVkOyB9KTtcclxuICAgICAgICBpZiAodW5rbm93blBhcmFtZXRlclJlZnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvLnJldHJpZXZlUGFyYW1ldGVyc0Zyb21NZXRhSW5mbyA6IG1ldGEgaW5mbyByZWZlcmVuY2VzIHVua25vd24gcGFyYW1ldGVycyAlbyAlb1wiLCB1bmtub3duUGFyYW1ldGVyUmVmcywgcGFyYW1ldGVyU2V0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1hdGNoaW5nUGFyYW1ldGVycztcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgcmVhZFdhdGNoYWJsZVBhcmFtZXRlcnMocGFyYW1ldGVyTWV0YUluZm86IGFueSk6IG9iamVjdCB7XHJcblxyXG4gICAgICAgIC8vIGdldCByZXF1ZXN0ZWQgbWV0YSBpdGVtc1xyXG4gICAgICAgIGxldCBtZXRhUGFyYW1ldGVySXRlbXMgPSBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGFEYXRhLmZpbHRlck1ldGFJdGVtcyhwYXJhbWV0ZXJNZXRhSW5mbyxbXCJXYXRjaGFibGVcIl0pO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgZGljdGlvbmFyeSBvZiBtZXRhIHBhcmFtZXRlcnNcclxuICAgICAgICBsZXQgbWV0YVBhcmFtZXRlcnMgPSB7fTtcclxuICAgICAgICBtZXRhUGFyYW1ldGVySXRlbXMuZm9yRWFjaCgobWV0YVBhcmFtZXRlcikgPT4geyBtZXRhUGFyYW1ldGVyc1ttZXRhUGFyYW1ldGVyLlJlZl0gPSBtZXRhUGFyYW1ldGVyOyB9KTtcclxuICAgICAgICByZXR1cm4gbWV0YVBhcmFtZXRlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHJlYWRDb25maWd1cmF0aW9uUGFyYW1ldGVycyhwYXJhbWV0ZXJNZXRhSW5mbzogYW55KTogb2JqZWN0IHtcclxuXHJcbiAgICAgICAgLy8gZ2V0IHJlcXVlc3RlZCBtZXRhIGl0ZW1zXHJcbiAgICAgICAgbGV0IG1ldGFQYXJhbWV0ZXJJdGVtcyA9IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0YURhdGEuZmlsdGVyTWV0YUl0ZW1zKHBhcmFtZXRlck1ldGFJbmZvLCBbXCJQYXJhbWV0ZXJcIiwgXCJHcm91cFwiXSk7XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSBkaWN0aW9uYXJ5IG9mIG1ldGEgcGFyYW1ldGVyc1xyXG4gICAgICAgIGxldCBtZXRhUGFyYW1ldGVycyA9IHt9O1xyXG4gICAgICAgIG1ldGFQYXJhbWV0ZXJJdGVtcy5mb3JFYWNoKChtZXRhUGFyYW1ldGVyKSA9PiB7IG1ldGFQYXJhbWV0ZXJzW21ldGFQYXJhbWV0ZXIuUmVmXSA9IG1ldGFQYXJhbWV0ZXI7IH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gbWV0YVBhcmFtZXRlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHJlYWRNZXNzYWdlUGFyYW1ldGVycyhwYXJhbWV0ZXJNZXRhSW5mbzogYW55KTpvYmplY3Qge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBtZXRhUGFyYW1ldGVycyA9IHt9O1xyXG4gICAgICAgIG1ldGFQYXJhbWV0ZXJzW1wiaW50QXJyYXlTZXZlcml0eVwiXSA9ICB7IFJlZjpcImludEFycmF5U2V2ZXJpdHlcIiB9O1xyXG4gICAgICAgIG1ldGFQYXJhbWV0ZXJzW1wic3RyQXJyYXlEZXNjcmlwdGlvblwiXSA9ICB7IFJlZjpcInN0ckFycmF5RGVzY3JpcHRpb25cIiB9O1xyXG4gICAgICAgIG1ldGFQYXJhbWV0ZXJzW1wic3RyQXJyYXlFdmVudElEXCJdID0gIHsgUmVmOlwic3RyQXJyYXlFdmVudElEXCIgfTtcclxuICAgICAgICBtZXRhUGFyYW1ldGVyc1tcInN0ckFycmF5VGltZVwiXSA9ICB7IFJlZjpcInN0ckFycmF5VGltZVwiIH07XHJcbiAgICAgICAgcmV0dXJuIG1ldGFQYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmVhZHMgZW5naW5lZXJpbmcgdW5pdHMgZnJvbSB0aGUgbWV0YSBpbmZvIGFuZCBhc3NpZ25zIGl0IHRvIHRoZSBwYXJhbWV0ZXJzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gY29tcG9uZW50UGFyYW1ldGVyc1xyXG4gICAgICogQHBhcmFtIHt7fX0gbWV0YVBhcmFtZXRlcnNcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm9cclxuICAgICAqL1xyXG4gICAgc3RhdGljIHVwZGF0ZVBhcmFtZXRlcihjb21wb25lbnRQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdLCBtZXRhUGFyYW1ldGVyczoge30pIHtcclxuICAgICAgICBjb21wb25lbnRQYXJhbWV0ZXJzLmZvckVhY2goKGNvbXBvbmVudFBhcmFtZXRlcikgPT4ge1xyXG4gICAgICAgICAgICBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm8udXBkYXRlUGFyYW1ldGVyRW5naW5lZXJpbmdVbml0KG1ldGFQYXJhbWV0ZXJzLCBjb21wb25lbnRQYXJhbWV0ZXIpO1xyXG4gICAgICAgICAgICBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm8udXBkYXRlUGFyYW1ldGVyRGlzcGxheU5hbWUobWV0YVBhcmFtZXRlcnMsIGNvbXBvbmVudFBhcmFtZXRlcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBwYXJhbWV0ZXJzIGRpc3BsYXkgbmFtZVxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7e319IG1ldGFQYXJhbWV0ZXJzXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyfSBjb21wb25lbnRQYXJhbWV0ZXJcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mb1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgdXBkYXRlUGFyYW1ldGVyRGlzcGxheU5hbWUobWV0YVBhcmFtZXRlcnM6IHt9LCBjb21wb25lbnRQYXJhbWV0ZXI6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyKTogYW55IHtcclxuICAgICAgICBpZiAobWV0YVBhcmFtZXRlcnNbY29tcG9uZW50UGFyYW1ldGVyLmJyb3dzZU5hbWVdLkRpc3BsYXlOYW1lKSB7XHJcbiAgICAgICAgICAgIGNvbXBvbmVudFBhcmFtZXRlci5kaXNwbGF5TmFtZSA9IG1ldGFQYXJhbWV0ZXJzW2NvbXBvbmVudFBhcmFtZXRlci5icm93c2VOYW1lXS5EaXNwbGF5TmFtZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBwYXJhbWV0ZXJzIGVuZ2luZWVyaW5nIHVuaXRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7e319IG1ldGFQYXJhbWV0ZXJzXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyfSBjb21wb25lbnRQYXJhbWV0ZXJcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm9cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgdXBkYXRlUGFyYW1ldGVyRW5naW5lZXJpbmdVbml0KG1ldGFQYXJhbWV0ZXJzOiB7fSwgY29tcG9uZW50UGFyYW1ldGVyOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcikge1xyXG4gICAgICAgIGlmIChtZXRhUGFyYW1ldGVyc1tjb21wb25lbnRQYXJhbWV0ZXIuYnJvd3NlTmFtZV0uRVUpIHtcclxuICAgICAgICAgICAgY29tcG9uZW50UGFyYW1ldGVyLmVuZ2luZWVyaW5nVW5pdCA9IG1ldGFQYXJhbWV0ZXJzW2NvbXBvbmVudFBhcmFtZXRlci5icm93c2VOYW1lXS5FVTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZWFkcyBlbnVtIHZhbHVlcyBpZiBhdmFpbGFibGUgYW5kIGFzc2lnbnMgaXQgdG8gdGhlIHBhcmFtZXRlclxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJ9IHBhcmFtZXRlclxyXG4gICAgICogQHJldHVybnMgeyp9IHRydWUgaWYgdGhlIHBhcmFtZXRlciB1c2VzIGFuIGVudW0gZm9yIGl0cyB2YWx1ZVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mb1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgcmVhZFBhcmFtZXRlckVudW1zKGNvbXBvbmVudFBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pIHtcclxuXHJcbiAgICAgICAgLy8gZ2V0IGF2YWlsYWJsZSBlbnVtIHBhcmFtZXRlciBkZWZzIFxyXG4gICAgICAgIGxldCBlbnVtUGFyYW1ldGVyVHlwZURlZmluaXRpb25zID0gTWFwcENvY2twaXRDb21tb25JbmZvUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5yZWFkRW51bVBhcmFtZXRlckRlZmluaXRpb25zKGNvbXBvbmVudFBhcmFtZXRlcnMsKDxNYXBwQ29ja3BpdENvbXBvbmVudD5jb21wb25lbnRQYXJhbWV0ZXJzWzBdLmNvbXBvbmVudCkubWV0YURhdGEpO1xyXG4gICAgICAgIC8vIGZpbmQgbWF0Y2hpbmcgcGFyYW1ldGVyXHJcbiAgICAgICAgbGV0IG1hdGNoaW5nUGFyYW1ldGVycyA9IGNvbXBvbmVudFBhcmFtZXRlcnMuZmlsdGVyKChjb21wb25lbnRQYXJhbWV0ZXIpID0+IHsgcmV0dXJuIGVudW1QYXJhbWV0ZXJUeXBlRGVmaW5pdGlvbnNbY29tcG9uZW50UGFyYW1ldGVyLmJyb3dzZU5hbWVdIH0pO1xyXG4gICAgICAgIC8vIHNldCB0aGUgZW51bSBkZWZpbml0aW9ucyBmb3IgdGhlIG1hdGNoaW5nIHBhcmFtZXRlcnNcclxuICAgICAgICBtYXRjaGluZ1BhcmFtZXRlcnMuZm9yRWFjaCgobWF0Y2hpbmdQYXJhbWV0ZXIpID0+IHtcclxuICAgICAgICAgICAgLy8gc2V0IHRoZSBlbnVtIGRlZmluaXRpb25cclxuICAgICAgICAgICAgbWF0Y2hpbmdQYXJhbWV0ZXIuZW51bVR5cGUgPSBlbnVtUGFyYW1ldGVyVHlwZURlZmluaXRpb25zW21hdGNoaW5nUGFyYW1ldGVyLmJyb3dzZU5hbWVdO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mbyAtIHNldCBlbnVtIGluZm8gJW8gZm9yICVvXCIsIG1hdGNoaW5nUGFyYW1ldGVyLmVudW1UeXBlLCAoPGFueT5tYXRjaGluZ1BhcmFtZXRlci5jb21wb25lbnQpLmJyb3dzZU5hbWUgKyBcIi5cIiArIG1hdGNoaW5nUGFyYW1ldGVyLmJyb3dzZU5hbWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogcHJvdmlkZXMgZGVzY3JpcHRpdmUgaW5mb3JtYXRpb24gZm9yIGEgbWV0aG9kXHJcbiAqXHJcbiAqIEBjbGFzcyBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm9JbmZvXHJcbiAqL1xyXG5jbGFzcyBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm8ge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogaW5pdGlhbGl6ZXMgdGhlIG1ldGhvZCBpbnB1dCBwYXJhbWV0ZXJzXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZH0gbWV0aG9kXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm9cclxuICAgICAqL1xyXG4gICAgc3RhdGljIHVwZGF0ZU1ldGhvZElucHV0UGFyYW1ldGVycyhtZXRob2Q6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kKTogYW55IHtcclxuXHJcbiAgICAgICAgLy8gc2tpcCBpZiB0aGUgbWV0aG9kIGhhcyBubyBwYXJhbWV0ZXJzIHRvIGluaXRpYWxpemUuXHJcbiAgICAgICAgaWYgKG1ldGhvZC5pbnB1dFBhcmFtZXRlcnMubGVuZ3RoID09PSAwKSByZXR1cm47XHJcblxyXG4gICAgICAgIC8vIGdldCB0aGUgbWV0YSBkYXRhXHJcbiAgICAgICAgbGV0IG1ldGhvZE1ldGFJbmZvID0gTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvLmdldE1ldGhvZE1ldGFJbmZvKG1ldGhvZCk7XHJcblxyXG4gICAgICAgIGlmIChtZXRob2RNZXRhSW5mbykge1xyXG5cclxuICAgICAgICAgICAvLyBmaW5kIGFuZCBpbml0aWFsaXplIG1ldGhvZCBwYXJhbWV0ZXIgZGVmYXVsdCB2YWx1ZXNcclxuICAgICAgICAgICAgbWV0aG9kLmlucHV0UGFyYW1ldGVycy5mb3JFYWNoKChtZXRob2RJbnB1dFBhcmFtZXRlcikgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mby51cGRhdGVNZXRob2RJbnB1dFBhcmFtZXRlckRlZmF1bHRzKG1ldGhvZCwgbWV0aG9kSW5wdXRQYXJhbWV0ZXIsIG1ldGhvZE1ldGFJbmZvKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0gXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB1cGRhdGVzIHJlc3BlY3RpdmVseSBpbml0aWFsaXplcyB0aGUgbWV0aG9kIGlucHV0IHBhcmFtZXRlcnMgd2l0aCBkZWZhdWx0c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kfSBtZXRob2RcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXJ9IG1ldGhvZElucHV0UGFyYW1ldGVyXHJcbiAgICAgKiBAcGFyYW0geyp9IG1ldGhvZE1ldGFJbmZvXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIHVwZGF0ZU1ldGhvZElucHV0UGFyYW1ldGVyRGVmYXVsdHMobWV0aG9kOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCwgbWV0aG9kSW5wdXRQYXJhbWV0ZXI6IE1hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVyLCBtZXRob2RNZXRhSW5mbzogYW55LCApIHtcclxuICAgICAgICBsZXQgbWV0aG9kUGFyYW1ldGVyTWV0YUluZm8gPSBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm8uZ2V0TWV0aG9kUGFyYW1ldGVyTWV0YUluZm8obWV0aG9kTWV0YUluZm8sIG1ldGhvZElucHV0UGFyYW1ldGVyKTtcclxuICAgICAgICBpZiAobWV0aG9kUGFyYW1ldGVyTWV0YUluZm8pIHtcclxuXHJcbiAgICAgICAgICAgIC8vIGFzc2lnbiBkZWZhdWx0IHZhbHVlIGlmIGRlZmluZWQgLi4uXHJcbiAgICAgICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mby51cGRhdGVNZXRob2RJbnB1dFBhcmFtZXRlckRlZmF1bHRWYWx1ZShtZXRob2RQYXJhbWV0ZXJNZXRhSW5mbywgbWV0aG9kSW5wdXRQYXJhbWV0ZXIsIG1ldGhvZCk7XHJcblxyXG4gICAgICAgICAgICAvLyBhc3NpZ24gZW5naW5lZXJpbmcgdW5pdCBpZiBkZWZpbmVkLlxyXG4gICAgICAgICAgICBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm8udXBkYXRlTWV0aG9kUGFyYW1ldGVyRW5naW5lZXJpbmdVbml0KG1ldGhvZFBhcmFtZXRlck1ldGFJbmZvLCBtZXRob2RJbnB1dFBhcmFtZXRlcik7XHJcblxyXG4gICAgICAgICAgICAvLyBhc3NpZ24gZGlzcGxheSBuYW1lXHJcbiAgICAgICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mby51cGRhdGVNZXRob2RQYXJhbWV0ZXJEaXNwbGF5TmFtZShtZXRob2RQYXJhbWV0ZXJNZXRhSW5mbywgbWV0aG9kSW5wdXRQYXJhbWV0ZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIk1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mby5pbml0aWFsaXplSW5wdXRQYXJhbWV0ZXJEZWZhdWx0VmFsdWVzIDogTm8gbWV0YSBpbmZvIGRlZmluZWQgZm9yIGZvciBtZXRob2QgcGFyYW1ldGVyICVvXCIsIG1ldGhvZC5icm93c2VOYW1lICsgXCIuXCIgKyBtZXRob2RJbnB1dFBhcmFtZXRlci5uYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBkaXNwbGF5IGZyb20gbWV0YSBpbmZvXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHsqfSBtZXRob2RQYXJhbWV0ZXJNZXRhSW5mb1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcn0gbWV0aG9kSW5wdXRQYXJhbWV0ZXJcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mb1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgdXBkYXRlTWV0aG9kUGFyYW1ldGVyRGlzcGxheU5hbWUobWV0aG9kUGFyYW1ldGVyTWV0YUluZm86IGFueSwgbWV0aG9kSW5wdXRQYXJhbWV0ZXI6IE1hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVyKTogYW55IHtcclxuICAgICAgICBpZiAobWV0aG9kUGFyYW1ldGVyTWV0YUluZm8uUGFyYW1ldGVyLkRpc3BsYXlOYW1lKSB7XHJcbiAgICAgICAgICAgIG1ldGhvZElucHV0UGFyYW1ldGVyLmRpc3BsYXlOYW1lID0gbWV0aG9kUGFyYW1ldGVyTWV0YUluZm8uUGFyYW1ldGVyLkRpc3BsYXlOYW1lO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGVuZ2luZWVyaW5nIHVuaXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHsqfSBtZXRob2RQYXJhbWV0ZXJNZXRhSW5mb1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcn0gbWV0aG9kSW5wdXRQYXJhbWV0ZXJcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm9cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgdXBkYXRlTWV0aG9kUGFyYW1ldGVyRW5naW5lZXJpbmdVbml0KG1ldGhvZFBhcmFtZXRlck1ldGFJbmZvOiBhbnksIG1ldGhvZElucHV0UGFyYW1ldGVyOiBNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcikge1xyXG4gICAgICAgIGlmIChtZXRob2RQYXJhbWV0ZXJNZXRhSW5mby5QYXJhbWV0ZXIuRVUpIHtcclxuICAgICAgICAgICAgbWV0aG9kSW5wdXRQYXJhbWV0ZXIuZW5naW5lZXJpbmdVbml0ID0gbWV0aG9kUGFyYW1ldGVyTWV0YUluZm8uUGFyYW1ldGVyLkVVO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGRlZmF1bHQgdmFsdWVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHsqfSBtZXRob2RQYXJhbWV0ZXJNZXRhSW5mb1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcn0gbWV0aG9kSW5wdXRQYXJhbWV0ZXJcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRNZXRob2R9IG1ldGhvZFxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mb1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyB1cGRhdGVNZXRob2RJbnB1dFBhcmFtZXRlckRlZmF1bHRWYWx1ZShtZXRob2RQYXJhbWV0ZXJNZXRhSW5mbzogYW55LCBtZXRob2RJbnB1dFBhcmFtZXRlcjogTWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXIsIG1ldGhvZDogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QpIHtcclxuICAgICAgICBsZXQgcGFyYW1ldGVySGFzRGVmYXVsdFZhbHVlID0gbWV0aG9kUGFyYW1ldGVyTWV0YUluZm8uUGFyYW1ldGVyLmhhc093blByb3BlcnR5KFwiRGVmYXVsdFZhbHVlXCIpO1xyXG4gICAgICAgIGlmIChwYXJhbWV0ZXJIYXNEZWZhdWx0VmFsdWUpIHtcclxuICAgICAgICAgICAgbWV0aG9kSW5wdXRQYXJhbWV0ZXIudmFsdWUgPSBtZXRob2RQYXJhbWV0ZXJNZXRhSW5mby5QYXJhbWV0ZXIuRGVmYXVsdFZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8gbWV0aG9kIHBhcmFtZXRlcnMgbXVzdCBoYXZlIGRlZmF1bHQgdmFsdWVzIGRlZmluZWRcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIk1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mby5pbml0aWFsaXplSW5wdXRQYXJhbWV0ZXJEZWZhdWx0VmFsdWVzIDogTm8gZGVmYXVsdCB2YWx1ZSBkZWZpbmVkIGZvciBtZXRob2QgcGFyYW1ldGVyICVvXCIsIG1ldGhvZC5icm93c2VOYW1lICsgXCIuXCIgKyBtZXRob2RJbnB1dFBhcmFtZXRlci5uYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXRzIHRoZSBtZXRhIGluZm8gZm9yIGEgbWV0aG9kIHBhcmFtZXRlclxyXG4gICAgICogXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHsqfSBtZXRob2RNZXRhSW5mb1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcn0gbWV0aG9kSW5wdXRQYXJhbWV0ZXJcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIGdldE1ldGhvZFBhcmFtZXRlck1ldGFJbmZvKG1ldGhvZE1ldGFJbmZvOiBhbnksIG1ldGhvZElucHV0UGFyYW1ldGVyOiBNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcikge1xyXG4gICAgICAgIGxldCBtZXRob2RQYXJhbWV0ZXJNZXRhSW5mb3MgPSBtZXRob2RNZXRhSW5mby5QYXJhbWV0ZXJzLmZpbHRlcigobWV0aG9kTWV0YUl0ZW1QYXJhbWV0ZXJJdGVtKSA9PiB7IHJldHVybiBtZXRob2RNZXRhSXRlbVBhcmFtZXRlckl0ZW0uUGFyYW1ldGVyLlJlZiA9PT0gbWV0aG9kSW5wdXRQYXJhbWV0ZXIubmFtZTsgfSk7XHJcbiAgICAgICAgbGV0IG1ldGhvZFBhcmFtZXRlck1ldGFJbmZvID0gbWV0aG9kUGFyYW1ldGVyTWV0YUluZm9zLmxlbmd0aCA9PT0gMSA/IG1ldGhvZFBhcmFtZXRlck1ldGFJbmZvc1swXSA6IHVuZGVmaW5lZDtcclxuICAgICAgICByZXR1cm4gbWV0aG9kUGFyYW1ldGVyTWV0YUluZm87XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXRzIHRoZSBtZXRhIGluZm8gZm9yIHRoZSByZXF1ZXN0ZWQgbWV0aG9kXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRNZXRob2R9IG1ldGhvZFxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm9cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0TWV0aG9kTWV0YUluZm8obWV0aG9kOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCk6IGFueSB7XHJcbiAgICAgICAgbGV0IG1ldGhvZE1ldGFJbmZvID0gdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICBsZXQgY29tcG9uZW50TWV0YURhdGE6IGFueSA9ICg8TWFwcENvY2twaXRDb21wb25lbnQ+bWV0aG9kLmNvbXBvbmVudCkubWV0YURhdGE7XHJcbiAgICAgICAgaWYoY29tcG9uZW50TWV0YURhdGEgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIG1ldGhvZE1ldGFJbmZvO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBnZXQgdGhlIG1ldGhvZCBpbmZvIGZyb20gbWV0YSBkYXRhXHJcbiAgICAgICAgbGV0IG1ldGhvZE1ldGFJdGVtczogYW55W10gPSBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGFEYXRhLmZpbHRlck1ldGFJdGVtcyhjb21wb25lbnRNZXRhRGF0YS5NZXRhQ29uZmlnQ29tbWFuZHMuQ29tbWFuZHNTdHJ1Y3R1cmUsIFtcIkNvbW1hbmRcIl0pO1xyXG4gICAgICAgIC8vIGdldCB0aGUgbWV0YSBpbmZvIGZvciB0aGUgcmVxdWVzdGVkIG1ldGhvZFxyXG4gICAgICAgIGxldCBtZXRob2RNZXRhSW5mb3MgPSBtZXRob2RNZXRhSXRlbXMuZmlsdGVyKChtZXRob2RNZXRhSXRlbSkgPT4geyByZXR1cm4gbWV0aG9kTWV0YUl0ZW0uUmVmID09PSBtZXRob2QuYnJvd3NlTmFtZTsgfSk7XHJcbiAgICAgICAgbWV0aG9kTWV0YUluZm8gPSBtZXRob2RNZXRhSW5mb3MubGVuZ3RoID09PSAxID8gbWV0aG9kTWV0YUluZm9zWzBdIDogdW5kZWZpbmVkO1xyXG4gICAgICAgIHJldHVybiBtZXRob2RNZXRhSW5mbztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldHMgdGhlIG1ldGhvZCBwYXJhbWV0ZXJzIGNvbnRhaW5lZCBpbiB0aGUgbWV0YSBkYXRhXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7Kn0gbWV0aG9kTWV0YUl0ZW1cclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXJ9IG1ldGhvZElucHV0UGFyYW1ldGVyXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mb1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZXRNYXRjaGluZ01ldGhvZFBhcmFtZXRlcnMobWV0aG9kTWV0YUl0ZW06IGFueSwgbWV0aG9kSW5wdXRQYXJhbWV0ZXI6IE1hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVyKSB7XHJcbiAgICAgICAgcmV0dXJuIG1ldGhvZE1ldGFJdGVtLlBhcmFtZXRlcnMuZmlsdGVyKChtZXRob2RNZXRhSXRlbVBhcmFtZXRlckl0ZW0pID0+IHtcclxuICAgICAgICAgICAgbGV0IGlzTWF0Y2hpbmdNZXRob2RQYXJhbWV0ZXIgPSBtZXRob2RNZXRhSXRlbVBhcmFtZXRlckl0ZW0uUGFyYW1ldGVyLlJlZiA9PT0gbWV0aG9kSW5wdXRQYXJhbWV0ZXIubmFtZVxyXG4gICAgICAgICAgICAgICAgJiYgbWV0aG9kTWV0YUl0ZW1QYXJhbWV0ZXJJdGVtLlBhcmFtZXRlci5EZWZhdWx0VmFsdWVcclxuICAgICAgICAgICAgICAgICYmIG1ldGhvZE1ldGFJdGVtUGFyYW1ldGVySXRlbS5QYXJhbWV0ZXIuRGVmYXVsdFZhbHVlICE9PSBcIlwiO1xyXG4gICAgICAgICAgICByZXR1cm4gaXNNYXRjaGluZ01ldGhvZFBhcmFtZXRlcjtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJldHJpZXZlcyB0aGUgZXhlY3V0YWJsZSBtZXRob2RzIGZyb20gdGhlIGNvbXBvbmVudCBtZXRob2Qgc2V0XHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFtdfSBjb21wb25lbnRNZXRob2RzXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm9cclxuICAgICAqL1xyXG4gICAgc3RhdGljIHJldHJpZXZlRXhlY3V0YWJsZU1ldGhvZHMoY29tcG9uZW50TWV0aG9kczogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RbXSk6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kW10ge1xyXG5cclxuICAgICAgICBsZXQgZXhlY3V0YWJsZU1ldGhvZHMgPSBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZD4oKTtcclxuICAgICAgICBpZiAoKGNvbXBvbmVudE1ldGhvZHNbMF0gPT0gdW5kZWZpbmVkKSB8fCBcclxuICAgICAgICAgICAgKDxhbnk+KDxNYXBwQ29ja3BpdENvbXBvbmVudD5jb21wb25lbnRNZXRob2RzWzBdLmNvbXBvbmVudCkubWV0YURhdGEpID09IHVuZGVmaW5lZCB8fFxyXG4gICAgICAgICAgICAoPGFueT4oPE1hcHBDb2NrcGl0Q29tcG9uZW50PmNvbXBvbmVudE1ldGhvZHNbMF0uY29tcG9uZW50KS5tZXRhRGF0YSkuTWV0YUNvbmZpZ0NvbW1hbmRzID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZXhlY3V0YWJsZU1ldGhvZHM7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLy8gZ2V0IHRoZSBjb21tYW5kcyBtZXRhIGluZm9zXHJcbiAgICAgICAgbGV0IG1ldGhvZHNNZXRhSW5mbyA9ICg8YW55Pig8TWFwcENvY2twaXRDb21wb25lbnQ+Y29tcG9uZW50TWV0aG9kc1swXS5jb21wb25lbnQpLm1ldGFEYXRhKS5NZXRhQ29uZmlnQ29tbWFuZHMuQ29tbWFuZHNTdHJ1Y3R1cmU7XHJcblxyXG4gICAgICAgIC8vIHJldHJpZXZlIHRoZSBtZXRob2QgZGVmaW5pdGlvbnNcclxuICAgICAgICBsZXQgbWV0YU1ldGhvZHMgPSBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGFEYXRhLmZpbHRlck1ldGFJdGVtcyhtZXRob2RzTWV0YUluZm8sIFtcIkNvbW1hbmRcIl0pO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgZGljdGlvbmFyeSBvZiBhdmFpbGFibGUgbWV0aG9kc1xyXG4gICAgICAgIGxldCBtZXRob2RTZXQgPSB7fTtcclxuICAgICAgICBsZXQgbWV0YU1ldGhvZFNldCA9IHt9O1xyXG4gICAgICAgIGNvbXBvbmVudE1ldGhvZHMuZm9yRWFjaCgobWV0aG9kKSA9PiB7IG1ldGhvZFNldFttZXRob2QuYnJvd3NlTmFtZV0gPSBtZXRob2QgfSk7XHJcbiAgICAgICAgbWV0YU1ldGhvZHMuZm9yRWFjaCgobWV0YU1ldGhvZCkgPT4geyBtZXRhTWV0aG9kU2V0W21ldGFNZXRob2QuUmVmXSA9IG1ldGFNZXRob2QgfSk7XHJcbiAgICAgICAgLy8gcmV0cmlldmUgdGhlIG1ldGhvZHMgd2l0aCBtYXRjaGluZyBuYW1lIGluIHRoZSBtZXRhIGluZm9cclxuICAgICAgICBleGVjdXRhYmxlTWV0aG9kcyA9IG1ldGFNZXRob2RzLmZpbHRlcigobWV0YU1ldGhvZCkgPT4geyByZXR1cm4gbWV0aG9kU2V0W21ldGFNZXRob2QuUmVmXSAhPT0gdW5kZWZpbmVkIH0pLm1hcCgobWV0YU1ldGhvZCkgPT4geyByZXR1cm4gbWV0aG9kU2V0W21ldGFNZXRob2QuUmVmXSB9KTtcclxuXHJcbiAgICAgICAgLy8gYXNzaWduIHRoZSBkaXNwbGF5IG5hbWVcclxuICAgICAgICBleGVjdXRhYmxlTWV0aG9kcy5mb3JFYWNoKChtZXRob2QpPT57IHRoaXMudXBkYXRlTWV0aG9kRGlzcGxheU5hbWUobWV0aG9kLG1ldGFNZXRob2RTZXRbbWV0aG9kLmJyb3dzZU5hbWVdKX0pXHJcblxyXG4gICAgICAgIC8vIG5vdGlmeSBpbnZhbGlkIG9yIHVua25vd24gbWV0aG9kc1xyXG4gICAgICAgIGxldCB1bmtub3duTWV0aG9kcyA9IG1ldGFNZXRob2RzLmZpbHRlcigobWV0YU1ldGhvZCkgPT4geyByZXR1cm4gbWV0aG9kU2V0W21ldGFNZXRob2QuUmVmXSA9PT0gdW5kZWZpbmVkIH0pO1xyXG4gICAgICAgIGlmICh1bmtub3duTWV0aG9kcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm8ucmV0cmlldmVFeGVjdXRhYmxlTWV0aG9kcyA6IG1ldGEgaW5mbyByZWZlcmVuY2VzIHVua25vd24gbWV0aG9kcyAlb1wiLCB1bmtub3duTWV0aG9kcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBleGVjdXRhYmxlTWV0aG9kcztcclxuICAgIH1cclxuXHJcblxyXG4gICAgXHJcbiAgICBzdGF0aWMgcmVhZEV4ZWN1dGFibGVNZXRob2RzKG1ldGFJbmZvOmFueSk6IG9iamVjdCB7XHJcblxyXG4gICAgICAgIC8vIGdldCB0aGUgY29tbWFuZHMgbWV0YSBpbmZvc1xyXG4gICAgICAgIGlmKG1ldGFJbmZvLk1ldGFDb25maWdDb21tYW5kcyA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHJldHVybiB7fTtcclxuICAgICAgICBsZXQgbWV0aG9kc01ldGFJbmZvID0gbWV0YUluZm8uTWV0YUNvbmZpZ0NvbW1hbmRzLkNvbW1hbmRzU3RydWN0dXJlO1xyXG5cclxuICAgICAgICAvLyByZXRyaWV2ZSB0aGUgbWV0aG9kIGRlZmluaXRpb25zXHJcbiAgICAgICAgbGV0IG1ldGFNZXRob2RzID0gTWFwcENvY2twaXRDb21wb25lbnRNZXRhRGF0YS5maWx0ZXJNZXRhSXRlbXMobWV0aG9kc01ldGFJbmZvLCBbXCJDb21tYW5kXCJdKTtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIGRpY3Rpb25hcnkgb2YgYXZhaWxhYmxlIG1ldGhvZHNcclxuICAgICAgICBsZXQgbWV0YU1ldGhvZFNldCA9IHt9O1xyXG4gICAgICAgIG1ldGFNZXRob2RzLmZvckVhY2goKG1ldGFNZXRob2QpID0+IHsgbWV0YU1ldGhvZFNldFttZXRhTWV0aG9kLlJlZl0gPSBtZXRhTWV0aG9kIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gbWV0YU1ldGhvZFNldDtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyBhIG1ldGhvZHMgZGlzcGxheSBuYW1lXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZH0gbWV0aG9kXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZzFcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mb1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgdXBkYXRlTWV0aG9kRGlzcGxheU5hbWUobWV0aG9kOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCwgbWV0YU1ldGhvZEluZm86IGFueSk6IGFueSB7XHJcbiAgICAgICAgaWYgKG1ldGFNZXRob2RJbmZvICYmIG1ldGFNZXRob2RJbmZvLkRpc3BsYXlOYW1lKSB7XHJcbiAgICAgICAgICAgIG1ldGhvZC5kaXNwbGF5TmFtZSA9IG1ldGFNZXRob2RJbmZvLkRpc3BsYXlOYW1lO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZWFkcyBhbmQgdXBkYXRlcyBtZXRob2QgcGFyYW1ldGVyIGVudW1zXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZH0gbWV0aG9kXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm9cclxuICAgICAqL1xyXG4gICAgc3RhdGljIHJlYWRNZXRob2RQYXJhbWV0ZXJFbnVtcyhtZXRob2Q6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLCBtZXRhRGF0YTogYW55KTogYW55IHtcclxuXHJcbiAgICAgICAgbGV0IG1ldGhvZFBhcmFtZXRlcnMgPSBtZXRob2QuaW5wdXRQYXJhbWV0ZXJzO1xyXG5cclxuICAgICAgICAvLyBnZXQgYXZhaWxhYmxlIGVudW0gbWV0aG9kIHBhcmFtZXRlciBkZWZzIFxyXG4gICAgICAgIGxldCBtZXRhTWV0aG9kUGFyYW1ldGVyRW51bVR5cGVEZWZpbml0aW9ucyA9IE1hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyLmdldEluc3RhbmNlKCkucmVhZE1ldGFFbnVtTWV0aG9kUGFyYW1ldGVyRGVmaW5pdGlvbnMobWV0aG9kLCBtZXRhRGF0YSk7XHJcblxyXG4gICAgICAgIC8vIGZpbmQgbWF0Y2hpbmcgcGFyYW1ldGVyXHJcbiAgICAgICAgbGV0IG1hdGNoaW5nTWV0aG9kUGFyYW1ldGVycyA9IG1ldGhvZFBhcmFtZXRlcnMuZmlsdGVyKChtZXRob2RQYXJhbWV0ZXIpID0+IHsgcmV0dXJuIG1ldGFNZXRob2RQYXJhbWV0ZXJFbnVtVHlwZURlZmluaXRpb25zW21ldGhvZFBhcmFtZXRlci5uYW1lXSB9KTtcclxuICAgICAgICAvLyBzZXQgdGhlIGVudW0gZGVmaW5pdGlvbnMgZm9yIHRoZSBtYXRjaGluZyBwYXJhbWV0ZXJzXHJcbiAgICAgICAgbWF0Y2hpbmdNZXRob2RQYXJhbWV0ZXJzLmZvckVhY2goKG1hdGNoaW5nTWV0aG9kUGFyYW1ldGVyKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIHNldCB0aGUgZW51bSBkZWZpbml0aW9uXHJcbiAgICAgICAgICAgIG1hdGNoaW5nTWV0aG9kUGFyYW1ldGVyLmVudW1UeXBlID0gbWV0YU1ldGhvZFBhcmFtZXRlckVudW1UeXBlRGVmaW5pdGlvbnNbbWF0Y2hpbmdNZXRob2RQYXJhbWV0ZXIubmFtZV07XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvIC0gc2V0IGVudW0gaW5mbyAlbyBmb3IgJW9cIiwgbWF0Y2hpbmdNZXRob2RQYXJhbWV0ZXIuZW51bVR5cGUsIG1ldGhvZC5icm93c2VOYW1lICsgXCIuXCIgKyBtYXRjaGluZ01ldGhvZFBhcmFtZXRlci5uYW1lKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvLCBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm8gfSJdfQ==