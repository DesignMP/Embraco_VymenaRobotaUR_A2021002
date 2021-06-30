define(["require", "exports", "./mappCockpitComponent", "./mappCockpitComponentMetaData", "../diagnostics/mappCockpitCommonInfoProvider"], function (require, exports, mappCockpitComponent_1, mappCockpitComponentMetaData_1, mappCockpitCommonInfoProvider_1) {
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
         * Retrieves watchableParameters
         *
         * @static
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @param {Array<string>} dataToRetrieve
         * @returns {MappCockpitComponentParameter[]}
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.retrieveWatchableParameters = function (componentParameters, dataToRetrieve) {
            var metaConfig = dataToRetrieve[0];
            var metaStructure = dataToRetrieve[1];
            var metaName = dataToRetrieve[2];
            // get the watchables meta infos
            if ((componentParameters[0] == undefined) || componentParameters[0].component.metaData[metaConfig] == undefined) {
                return new Array();
            }
            var metaInfo = componentParameters[0].component.metaData[metaConfig][metaStructure];
            // retrieve the watchables definitions
            var parameters = MappCockpitComponentParameterInfo.retrieveParametersFromMetaInfo([metaName], metaInfo, componentParameters);
            return parameters;
        };
        /**
         * Create watchable state parameters according to metaInfo
         *
         * @static
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @param {Array<string>} dataToRetrieve
         * @returns {MappCockpitStateParameter[]}
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.retrieveWatchableStates = function (componentParameters, dataToRetrieve) {
            var metaConfig = dataToRetrieve[0];
            var metaStructure = dataToRetrieve[1];
            var metaName = dataToRetrieve[2];
            // get the watchables meta infos
            if ((componentParameters[0] == undefined) || componentParameters[0].component.metaData[metaConfig] == undefined) {
                return new Array();
            }
            var metaInfo = componentParameters[0].component.metaData[metaConfig][metaStructure];
            var stateParameters = MappCockpitComponentParameterInfo.retrieveWatchableStatesFromMetaInfo([metaName], metaInfo, componentParameters);
            return stateParameters;
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
        /**
         * Retrieves watchable states declared in the metaInfo
         *
         * @static
         * @param {string[]} requesteItemTypes
         * @param {*} parameterMetaInfo
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @returns {MappCockpitStateParameter[]}
         * @memberof MappCockpitComponentParameterInfo
         */
        MappCockpitComponentParameterInfo.retrieveWatchableStatesFromMetaInfo = function (requesteItemTypes, parameterMetaInfo, componentParameters) {
            var stateParameters = new Array();
            // get requested meta items
            var metaParameterItems = mappCockpitComponentMetaData_1.MappCockpitComponentMetaData.filterMetaItems(parameterMetaInfo, requesteItemTypes);
            // create dictionary of available parameters
            var parameterSet = {};
            componentParameters.forEach(function (parameter) { parameterSet[parameter.browseName] = parameter; });
            // create watchable states
            metaParameterItems.forEach(function (metaParameter) {
                stateParameters.push(new mappCockpitComponent_1.MappCockpitStateParameter(metaParameter.Name, metaParameter.IconExpression, metaParameter.Icon));
            });
            // notify invalid or unknown references
            var unknownParameterRefs = metaParameterItems.filter(function (metaParameter) { return metaParameter.Ref !== undefined && parameterSet[metaParameter.Ref] === undefined; });
            if (unknownParameterRefs.length > 0) {
                console.error("MappCockpitComponentParameterInfo.retrieveWatchableStatesFromMetaInfo : meta info references unknown watchable state parameters %o", unknownParameterRefs);
            }
            return stateParameters;
        };
        MappCockpitComponentParameterInfo.readParameters = function (parameterMetaInfo, parameter) {
            // get requested meta items
            var metaParameterItems = mappCockpitComponentMetaData_1.MappCockpitComponentMetaData.filterMetaItems(parameterMetaInfo, parameter);
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
                //assign filter if defined
                MappCockpitComponentMethodInfo.updateMethodParameterFilter(methodParameterMetaInfo, methodInputParameter);
            }
            else {
                console.error("MappCockpitComponentMethodInfo.initializeInputParameterDefaultValues : No meta info defined for for method parameter %o", method.browseName + "." + methodInputParameter.name);
            }
        };
        MappCockpitComponentMethodInfo.updateMethodParameterFilter = function (methodParameterMetaInfo, methodInputParameter) {
            var parameterHasFilter = methodParameterMetaInfo.Parameter.hasOwnProperty("Filter");
            if (parameterHasFilter) {
                methodInputParameter.filter.parameterRef = methodParameterMetaInfo.Parameter.Filter.ParameterRef;
                methodInputParameter.filter.parameterValues = methodParameterMetaInfo.Parameter.Filter.ParameterValues;
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
         * Retrieves the executable methods from the component method set
         *
         * @static
         * @param {MappCockpitComponentMethod[]} componentMethods
         * @param {Array<string>} dataToRetrieve
         * @returns {MappCockpitComponentMethod[]}
         * @memberof MappCockpitComponentMethodInfo
         */
        MappCockpitComponentMethodInfo.retrieveExecutableMethods = function (componentMethods, dataToRetrieve) {
            var _this = this;
            var metaConfig = dataToRetrieve[0];
            var metaStructure = dataToRetrieve[1];
            var metaName = dataToRetrieve[2];
            var executableMethods = Array();
            if ((componentMethods[0] == undefined) ||
                componentMethods[0].component.metaData == undefined ||
                componentMethods[0].component.metaData[metaConfig] == undefined) {
                return executableMethods;
            }
            // get the commands meta infos
            var methodsMetaInfo = componentMethods[0].component.metaData[metaConfig][metaStructure];
            // retrieve the method definitions
            var metaMethods = mappCockpitComponentMetaData_1.MappCockpitComponentMetaData.filterMetaItems(methodsMetaInfo, [metaName]);
            // create dictionary of available methods
            var methodSet = {};
            var metaMethodSet = {};
            componentMethods.forEach(function (method) { methodSet[method.browseName] = method; });
            metaMethods.forEach(function (metaMethod) { metaMethodSet[metaMethod.Ref] = metaMethod; });
            // retrieve the methods with matching name in the meta info
            executableMethods = metaMethods.filter(function (metaMethod) { return methodSet[metaMethod.Ref] !== undefined; }).map(function (metaMethod) { return methodSet[metaMethod.Ref]; });
            // assign the display name
            executableMethods.forEach(function (method) { _this.updateMethodDisplayName(method, metaMethodSet[method.browseName]); });
            // assign expression to evaluate
            executableMethods.forEach(function (method) { _this.updateExpression(method, metaMethodSet[method.browseName]); });
            // notify invalid or unknown methods
            var unknownMethods = metaMethods.filter(function (metaMethod) { return methodSet[metaMethod.Ref] === undefined; });
            if (unknownMethods.length > 0) {
                console.error("MappCockpitComponentMethodInfo.retrieveExecutableMethods : meta info references unknown methods %o", unknownMethods);
            }
            return executableMethods;
        };
        /**
         * Retrieves quick commands methods from metaInfo
         *
         * @static
         * @param {MappCockpitComponentMethod[]} componentMethods
         * @param {Array<string>} dataToRetrieve
         * @returns {MappCockpitQuickCommandParameter[]}
         * @memberof MappCockpitComponentMethodInfo
         */
        MappCockpitComponentMethodInfo.retrieveQuickCommands = function (componentMethods, dataToRetrieve) {
            var metaConfig = dataToRetrieve[0];
            var metaStructure = dataToRetrieve[1];
            var metaName = dataToRetrieve[2];
            var quickCommands = Array();
            if ((componentMethods[0] == undefined) ||
                componentMethods[0].component.metaData == undefined ||
                componentMethods[0].component.metaData[metaConfig] == undefined) {
                return quickCommands;
            }
            // get the commands meta infos
            var methodsMetaInfo = componentMethods[0].component.metaData[metaConfig][metaStructure];
            // retrieve the method definitions
            var metaMethods = mappCockpitComponentMetaData_1.MappCockpitComponentMetaData.filterMetaItems(methodsMetaInfo, [metaName]);
            // create dictionary of available methods
            var methodSet = {};
            componentMethods.forEach(function (method) { methodSet[method.browseName] = method; });
            metaMethods.forEach(function (metaMethod) {
                quickCommands.push(new mappCockpitComponent_1.MappCockpitQuickCommandParameter(metaMethod.Ref, metaMethod.Tooltip, metaMethod.ImageName));
            });
            // notify invalid or unknown methods
            var unknownMethods = quickCommands.filter(function (quickCommand) { return methodSet[quickCommand.name] === undefined; });
            if (unknownMethods.length > 0) {
                console.error("MappCockpitComponentMethodInfo.retrieveQuickCommands : meta info references unknown methods %o", unknownMethods);
            }
            return quickCommands;
        };
        MappCockpitComponentMethodInfo.readMethods = function (metaInfo, property, method) {
            var metaConfig = property[0];
            var metaConfigStructure = property[1];
            // get the commands meta infos
            if (metaInfo[metaConfig] == undefined)
                return {};
            var methodsMetaInfo = metaInfo[metaConfig][metaConfigStructure];
            // retrieve the method definitions
            var metaMethods = mappCockpitComponentMetaData_1.MappCockpitComponentMetaData.filterMetaItems(methodsMetaInfo, method);
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
        MappCockpitComponentMethodInfo.updateExpression = function (method, metaMethodInfo) {
            if (metaMethodInfo && metaMethodInfo.DisplayName) {
                method.expression = metaMethodInfo.EnableStateExpression;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcENvY2twaXRDb21wb25lbnRSZWZsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50UmVmbGVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFJQTs7OztPQUlHO0lBRUg7UUFBQTtRQW1nQkEsQ0FBQztRQWpnQkc7Ozs7Ozs7O1dBUUc7UUFDSSw2REFBMkIsR0FBbEMsVUFBbUMsbUJBQW9ELEVBQUUsY0FBNkI7WUFDbEgsSUFBSSxVQUFVLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25DLElBQUksYUFBYSxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QyxJQUFJLFFBQVEsR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFakMsZ0NBQWdDO1lBQ2hDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLENBQUMsSUFBaUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBVSxDQUFDLFFBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxTQUFTLEVBQUU7Z0JBQzVJLE9BQU8sSUFBSSxLQUFLLEVBQWlDLENBQUM7YUFDckQ7WUFDRCxJQUFJLFFBQVEsR0FBZ0MsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBVSxDQUFDLFFBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUNuSCxzQ0FBc0M7WUFDdEMsSUFBSSxVQUFVLEdBQUcsaUNBQWlDLENBQUMsOEJBQThCLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxRQUFRLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztZQUM3SCxPQUFPLFVBQVUsQ0FBQztRQUN0QixDQUFDO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDSSx5REFBdUIsR0FBOUIsVUFBK0IsbUJBQW9ELEVBQUUsY0FBNkI7WUFDOUcs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LENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3hHLE9BQU8sQ0FBQyxHQUFHLENBQUMsMERBQTBELEVBQUUsdUJBQXVCLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxVQUFVLEdBQUcsR0FBRyxHQUFHLHVCQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RLLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUVMLHFDQUFDO0lBQUQsQ0FBQyxBQTlVRCxJQThVQztJQUUyQyx3RUFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCwgTWFwcENvY2twaXRDb21wb25lbnQsIE1hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVyLCBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlciwgTWFwcENvY2twaXRTdGF0ZVBhcmFtZXRlciwgTWFwcENvY2twaXRRdWlja0NvbW1hbmRQYXJhbWV0ZXIgfSBmcm9tIFwiLi9tYXBwQ29ja3BpdENvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGFEYXRhIH0gZnJvbSBcIi4vbWFwcENvY2twaXRDb21wb25lbnRNZXRhRGF0YVwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbW1vbkluZm9Qcm92aWRlciB9IGZyb20gXCIuLi9kaWFnbm9zdGljcy9tYXBwQ29ja3BpdENvbW1vbkluZm9Qcm92aWRlclwiO1xyXG5cclxuLyoqXHJcbiAqIHByb3ZpZGVzIGRlc2NyaXB0aXZlIGluZm9ybWF0aW9uIGZvciBhIHBhcmFtZXRlclxyXG4gKlxyXG4gKiBAY2xhc3MgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvXHJcbiAqL1xyXG5cclxuY2xhc3MgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHJpZXZlcyB3YXRjaGFibGVQYXJhbWV0ZXJzXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSBjb21wb25lbnRQYXJhbWV0ZXJzXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PHN0cmluZz59IGRhdGFUb1JldHJpZXZlXHJcbiAgICAgKiBAcmV0dXJucyB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm9cclxuICAgICAqL1xyXG4gICAgc3RhdGljIHJldHJpZXZlV2F0Y2hhYmxlUGFyYW1ldGVycyhjb21wb25lbnRQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdLCBkYXRhVG9SZXRyaWV2ZTogQXJyYXk8c3RyaW5nPik6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10ge1xyXG4gICAgICAgIGxldCBtZXRhQ29uZmlnID0gZGF0YVRvUmV0cmlldmVbMF07XHJcbiAgICAgICAgbGV0IG1ldGFTdHJ1Y3R1cmUgPSBkYXRhVG9SZXRyaWV2ZVsxXTtcclxuICAgICAgICBsZXQgbWV0YU5hbWUgPSBkYXRhVG9SZXRyaWV2ZVsyXTtcclxuXHJcbiAgICAgICAgLy8gZ2V0IHRoZSB3YXRjaGFibGVzIG1ldGEgaW5mb3NcclxuICAgICAgICBpZiAoKGNvbXBvbmVudFBhcmFtZXRlcnNbMF0gPT0gdW5kZWZpbmVkKSB8fCAoPGFueT4oPE1hcHBDb2NrcGl0Q29tcG9uZW50PmNvbXBvbmVudFBhcmFtZXRlcnNbMF0uY29tcG9uZW50KS5tZXRhRGF0YSlbbWV0YUNvbmZpZ10gPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBtZXRhSW5mbyA9ICg8YW55Pig8TWFwcENvY2twaXRDb21wb25lbnQ+Y29tcG9uZW50UGFyYW1ldGVyc1swXS5jb21wb25lbnQpLm1ldGFEYXRhKVttZXRhQ29uZmlnXVttZXRhU3RydWN0dXJlXTtcclxuICAgICAgICAvLyByZXRyaWV2ZSB0aGUgd2F0Y2hhYmxlcyBkZWZpbml0aW9uc1xyXG4gICAgICAgIGxldCBwYXJhbWV0ZXJzID0gTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvLnJldHJpZXZlUGFyYW1ldGVyc0Zyb21NZXRhSW5mbyhbbWV0YU5hbWVdLCBtZXRhSW5mbywgY29tcG9uZW50UGFyYW1ldGVycyk7XHJcbiAgICAgICAgcmV0dXJuIHBhcmFtZXRlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgd2F0Y2hhYmxlIHN0YXRlIHBhcmFtZXRlcnMgYWNjb3JkaW5nIHRvIG1ldGFJbmZvXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSBjb21wb25lbnRQYXJhbWV0ZXJzXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PHN0cmluZz59IGRhdGFUb1JldHJpZXZlXHJcbiAgICAgKiBAcmV0dXJucyB7TWFwcENvY2twaXRTdGF0ZVBhcmFtZXRlcltdfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mb1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgcmV0cmlldmVXYXRjaGFibGVTdGF0ZXMoY29tcG9uZW50UGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSwgZGF0YVRvUmV0cmlldmU6IEFycmF5PHN0cmluZz4pOiBNYXBwQ29ja3BpdFN0YXRlUGFyYW1ldGVyW10ge1xyXG4gICAgICAgIGxldCBtZXRhQ29uZmlnID0gZGF0YVRvUmV0cmlldmVbMF07XHJcbiAgICAgICAgbGV0IG1ldGFTdHJ1Y3R1cmUgPSBkYXRhVG9SZXRyaWV2ZVsxXTtcclxuICAgICAgICBsZXQgbWV0YU5hbWUgPSBkYXRhVG9SZXRyaWV2ZVsyXTtcclxuXHJcbiAgICAgICAgLy8gZ2V0IHRoZSB3YXRjaGFibGVzIG1ldGEgaW5mb3NcclxuICAgICAgICBpZiAoKGNvbXBvbmVudFBhcmFtZXRlcnNbMF0gPT0gdW5kZWZpbmVkKSB8fCAoPGFueT4oPE1hcHBDb2NrcGl0Q29tcG9uZW50PmNvbXBvbmVudFBhcmFtZXRlcnNbMF0uY29tcG9uZW50KS5tZXRhRGF0YSlbbWV0YUNvbmZpZ10gPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQXJyYXk8TWFwcENvY2twaXRTdGF0ZVBhcmFtZXRlcj4oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG1ldGFJbmZvID0gKDxhbnk+KDxNYXBwQ29ja3BpdENvbXBvbmVudD5jb21wb25lbnRQYXJhbWV0ZXJzWzBdLmNvbXBvbmVudCkubWV0YURhdGEpW21ldGFDb25maWddW21ldGFTdHJ1Y3R1cmVdO1xyXG5cclxuICAgICAgICBsZXQgc3RhdGVQYXJhbWV0ZXJzID0gTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvLnJldHJpZXZlV2F0Y2hhYmxlU3RhdGVzRnJvbU1ldGFJbmZvKFttZXRhTmFtZV0sIG1ldGFJbmZvLCBjb21wb25lbnRQYXJhbWV0ZXJzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHN0YXRlUGFyYW1ldGVycztcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZXRyaWV2ZXMgdGhlIG1lc3NhZ2UgcGFyYW1ldGVycyBmcm9tIHRoZSBjb21wb25lbnQgcGFyYW1ldGVyc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPn0gY29tcG9uZW50UGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybnMge0FycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm9cclxuICAgICAqL1xyXG4gICAgc3RhdGljIHJldHJpZXZlTWVzc2FnZVBhcmFtZXRlcnMoY29tcG9uZW50UGFyYW1ldGVyczogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+KTogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSB7XHJcblxyXG4gICAgICAgIGxldCBtZXNzYWdlU2V2ZXJpdHlQYXJhbWV0ZXIgPSBjb21wb25lbnRQYXJhbWV0ZXJzLmZpbHRlcihwYXJhbWV0ZXIgPT4geyByZXR1cm4gcGFyYW1ldGVyLmJyb3dzZU5hbWUgPT09IFwiaW50QXJyYXlTZXZlcml0eVwiOyB9KVswXTtcclxuICAgICAgICBpZiAobWVzc2FnZVNldmVyaXR5UGFyYW1ldGVyID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBtZXNzYWdlU2V2ZXJpdHlQYXJhbWV0ZXIgPSBjb21wb25lbnRQYXJhbWV0ZXJzLmZpbHRlcihwYXJhbWV0ZXIgPT4geyByZXR1cm4gcGFyYW1ldGVyLmJyb3dzZU5hbWUgPT09IFwic3RyQXJyYXlTZXZlcml0eVwiOyB9KVswXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBtZXNzYWdlRGVzY3JpcHRpb25QYXJhbWV0ZXIgPSBjb21wb25lbnRQYXJhbWV0ZXJzLmZpbHRlcihwYXJhbWV0ZXIgPT4geyByZXR1cm4gcGFyYW1ldGVyLmJyb3dzZU5hbWUgPT09IFwic3RyQXJyYXlEZXNjcmlwdGlvblwiOyB9KVswXTtcclxuICAgICAgICBsZXQgbWVzc2FnZUV2ZW50SWRQYXJhbWV0ZXIgPSBjb21wb25lbnRQYXJhbWV0ZXJzLmZpbHRlcihwYXJhbWV0ZXIgPT4geyByZXR1cm4gcGFyYW1ldGVyLmJyb3dzZU5hbWUgPT09IFwic3RyQXJyYXlFdmVudElEXCI7IH0pWzBdO1xyXG4gICAgICAgIGxldCBtZXNzYWdlVGltZVN0YW1wUGFyYW1ldGVyID0gY29tcG9uZW50UGFyYW1ldGVycy5maWx0ZXIocGFyYW1ldGVyID0+IHsgcmV0dXJuIHBhcmFtZXRlci5icm93c2VOYW1lID09PSBcInN0ckFycmF5VGltZVwiOyB9KVswXTtcclxuXHJcbiAgICAgICAgcmV0dXJuIFttZXNzYWdlU2V2ZXJpdHlQYXJhbWV0ZXIsIG1lc3NhZ2VEZXNjcmlwdGlvblBhcmFtZXRlciwgbWVzc2FnZUV2ZW50SWRQYXJhbWV0ZXIsIG1lc3NhZ2VUaW1lU3RhbXBQYXJhbWV0ZXJdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmV0cmlldmVzIHRoZSB0cmFjZSBjb25maWd1cmF0aW9uIHRpbWluZyBwYXJhbWV0ZXJzIGZyb20gdGhlIHBhcmFtZXRlciBzZXRcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IGNvbXBvbmVudFBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm5zIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mb1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgcmV0cmlldmVUcmFjZUNvbmZpZ3VyYXRpb25UaW1pbmdQYXJhbWV0ZXJzKGNvbXBvbmVudFBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdIHtcclxuICAgICAgICAvLyByZXRyaWV2ZSB0aGUgdHJhY2UgY29uZmlndXJhdGlvbiB0aW1pbmcgcGFyYW1ldGVyc1xyXG4gICAgICAgIGxldCB0aW1pbmdQYXJhbWV0ZXJzID0gbmV3IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPigpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29tcG9uZW50UGFyYW1ldGVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvLmlzVGltaW5nUGFyYW1ldGVyKGNvbXBvbmVudFBhcmFtZXRlcnNbaV0pKSB7XHJcbiAgICAgICAgICAgICAgICB0aW1pbmdQYXJhbWV0ZXJzLnB1c2goY29tcG9uZW50UGFyYW1ldGVyc1tpXSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVXBkYXRlIHRoZSB2YWx1ZXMgdG8gdGhlIHJlYWwgdmFsdWVzIGZyb20gQ3VycmVudFRyY0NvbmZpZyBQcm9wZXJ0eSAoQlVHRklYIGZvciBtaXNzaW5nIFN0YXJ0VHJpZ2dlcnMgYXQgc3RhcnR1cClcclxuICAgICAgICBsZXQgY3VycmVudFRyY0NvbmZpZ1Byb3BlcnRpZXMgPSBjb21wb25lbnRQYXJhbWV0ZXJzLmZpbHRlcigoZWxlbWVudCkgPT4geyByZXR1cm4gZWxlbWVudC5icm93c2VOYW1lID09IFwiQ3VycmVudFRyY0NvbmZpZ1wiIH0pO1xyXG4gICAgICAgIGlmIChjdXJyZW50VHJjQ29uZmlnUHJvcGVydGllcy5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudFRyY0NvbmZpZ1Byb3BlcnRpZXNbMF0udmFsdWUgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVRpbWluZ1BhcmFtZXRlcnModGltaW5nUGFyYW1ldGVycywgY3VycmVudFRyY0NvbmZpZ1Byb3BlcnRpZXNbMF0udmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aW1pbmdQYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgdmFsdWVzIG9mIHRoZSB0aW1pbmcgcGFyYW1ldGVycyB3aXRoIHRoZSB2YWx1ZXMgZnJvbSBhIGpzb24gc3RyaW5nIChjdXJyZW50VHJhY2VDb25maWdKc29uU3RyaW5nKSBcclxuICAgICAqIEJVR0ZJWCBmb3IgbWlzc2luZyBTdGFydFRyaWdnZXJzIGF0IHN0YXJ0dXBcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSB0aW1pbmdQYXJhbWV0ZXJzXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY3VycmVudFRyYWNlQ29uZmlnSnNvblN0cmluZ1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mb1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyB1cGRhdGVUaW1pbmdQYXJhbWV0ZXJzKHRpbWluZ1BhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10sIGN1cnJlbnRUcmFjZUNvbmZpZ0pzb25TdHJpbmc6IHN0cmluZykge1xyXG4gICAgICAgIGlmIChjdXJyZW50VHJhY2VDb25maWdKc29uU3RyaW5nICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRUcmFjZUNvbmZpZyA9IEpTT04ucGFyc2UoY3VycmVudFRyYWNlQ29uZmlnSnNvblN0cmluZyk7XHJcbiAgICAgICAgICAgIC8vIFVwZGF0ZSBhbGwgdGltaW5nIHBhcmFtZXRlcnNcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50VHJhY2VDb25maWcuVGltaW5nICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVPZlByb3BlcnR5KHRpbWluZ1BhcmFtZXRlcnMsIFwiVGltaW5nX1RvdGFsUmVjb3JkaW5nVGltZVwiLCBjdXJyZW50VHJhY2VDb25maWcuVGltaW5nLlRvdGFsUmVjb3JkaW5nVGltZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZU9mUHJvcGVydHkodGltaW5nUGFyYW1ldGVycywgXCJUaW1pbmdfVHJpZ2dlck9mZnNldFRpbWVcIiwgY3VycmVudFRyYWNlQ29uZmlnLlRpbWluZy5UcmlnZ2VyT2Zmc2V0VGltZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZU9mUHJvcGVydHkodGltaW5nUGFyYW1ldGVycywgXCJUaW1pbmdfQWNvcG9zU2FtcGxlVGltZVwiLCBjdXJyZW50VHJhY2VDb25maWcuVGltaW5nLkFDT1BPU1NhbXBsZVRpbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVPZlByb3BlcnR5KHRpbWluZ1BhcmFtZXRlcnMsIFwiVGltaW5nX1BsY1Rhc2tDbGFzc1wiLCBjdXJyZW50VHJhY2VDb25maWcuVGltaW5nLlBWVGFza0NsYXNzKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlT2ZQcm9wZXJ0eSh0aW1pbmdQYXJhbWV0ZXJzLCBcIlRpbWluZ19QbGNTYW1wbGVUaW1lXCIsIGN1cnJlbnRUcmFjZUNvbmZpZy5UaW1pbmcuUGxjU2FtcGxlVGltZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVXBkYXRpbmcgb2Ygc29tZSB0cmFjZSBjb25maWd1cmF0aW9uIHRpbWluZyBpbmZvcm1hdGlvbnMgbm90IHBvc3NpYmxlIVwiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGlzVGltaW5nUGFyYW1ldGVyKHBhcmFtZXRlcjogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIpOiBib29sZWFuIHtcclxuICAgICAgICAvLyBUaW1pbmcgcGFyYW1ldGVycyBiZWdpbiB3aXRoIFwiVGltaW5nX1wiIGluIHRoZSBwcm9wZXJ0aWVzIG5hbWVcclxuICAgICAgICBsZXQgcHJlZml4ID0gXCJUaW1pbmdfXCI7XHJcbiAgICAgICAgaWYgKHBhcmFtZXRlci5icm93c2VOYW1lLnN1YnN0cigwLCBwcmVmaXgubGVuZ3RoKSA9PSBwcmVmaXgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJldHJpZXZlcyB0aGUgdHJhY2UgY29uZmlndXJhdGlvbiB0cmlnZ2VyIHBhcmFtZXRlcnMgZnJvbSB0aGUgcGFyYW1ldGVyIHNldFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gY29tcG9uZW50UGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybnMge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyByZXRyaWV2ZVRyYWNlQ29uZmlndXJhdGlvblRyaWdnZXJQYXJhbWV0ZXJzKGNvbXBvbmVudFBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdIHtcclxuICAgICAgICAvLyByZXRyaWV2ZSB0aGUgdHJhY2UgY29uZmlndXJhdGlvbiB0cmlnZ2VyIHBhcmFtZXRlcnNcclxuICAgICAgICBsZXQgdHJpZ2dlclBhcmFtZXRlcnMgPSBuZXcgQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+KCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb21wb25lbnRQYXJhbWV0ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm8uaXNUcmlnZ2VyUGFyYW1ldGVyKGNvbXBvbmVudFBhcmFtZXRlcnNbaV0pKSB7XHJcbiAgICAgICAgICAgICAgICB0cmlnZ2VyUGFyYW1ldGVycy5wdXNoKGNvbXBvbmVudFBhcmFtZXRlcnNbaV0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgdmFsdWVzIHRvIHRoZSByZWFsIHZhbHVlcyBmcm9tIEN1cnJlbnRUcmNDb25maWcgUHJvcGVydHkgKEJVR0ZJWCBmb3IgbWlzc2luZyBTdGFydFRyaWdnZXJzIGF0IHN0YXJ0dXApXHJcbiAgICAgICAgbGV0IGN1cnJlbnRUcmNDb25maWdQcm9wZXJ0aWVzID0gY29tcG9uZW50UGFyYW1ldGVycy5maWx0ZXIoKGVsZW1lbnQpID0+IHsgcmV0dXJuIGVsZW1lbnQuYnJvd3NlTmFtZSA9PSBcIkN1cnJlbnRUcmNDb25maWdcIiB9KTtcclxuICAgICAgICBpZiAoY3VycmVudFRyY0NvbmZpZ1Byb3BlcnRpZXMubGVuZ3RoID09IDEpIHtcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRUcmNDb25maWdQcm9wZXJ0aWVzWzBdLnZhbHVlICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVUcmlnZ2VyUGFyYW1ldGVycyh0cmlnZ2VyUGFyYW1ldGVycywgY3VycmVudFRyY0NvbmZpZ1Byb3BlcnRpZXNbMF0udmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cmlnZ2VyUGFyYW1ldGVycztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIHZhbHVlcyBvZiB0aGUgdHJpZ2dlciBwYXJhbWV0ZXJzIHdpdGggdGhlIHZhbHVlcyBmcm9tIGEganNvbiBzdHJpbmcgKGN1cnJlbnRUcmFjZUNvbmZpZ0pzb25TdHJpbmcpIFxyXG4gICAgICogQlVHRklYIGZvciBtaXNzaW5nIFN0YXJ0VHJpZ2dlcnMgYXQgc3RhcnR1cFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IHRyaWdnZXJQYXJhbWV0ZXJzXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY3VycmVudFRyYWNlQ29uZmlnSnNvblN0cmluZ1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mb1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyB1cGRhdGVUcmlnZ2VyUGFyYW1ldGVycyh0cmlnZ2VyUGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSwgY3VycmVudFRyYWNlQ29uZmlnSnNvblN0cmluZzogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRUcmFjZUNvbmZpZ0pzb25TdHJpbmcgIT0gXCJcIikge1xyXG4gICAgICAgICAgICBsZXQgY3VycmVudFRyYWNlQ29uZmlnID0gSlNPTi5wYXJzZShjdXJyZW50VHJhY2VDb25maWdKc29uU3RyaW5nKTtcclxuICAgICAgICAgICAgLy8gVXBkYXRlIGFsbCBzdXBwb3J0ZWQgdHJpZ2dlcnNcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2luZ2xlVHJpZ2dlcih0cmlnZ2VyUGFyYW1ldGVycywgaSwgY3VycmVudFRyYWNlQ29uZmlnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIHZhbHVlcyBvZiBhIHRyaWdnZXIgd2l0aCB0aGUgZ2l2ZW4gaW5kZXggd2l0aCB0aGUgdmFsdWVzIGZyb20gYSBqc29uIHN0cmluZyAoY3VycmVudFRyYWNlQ29uZmlnSnNvblN0cmluZykgXHJcbiAgICAgKiBCVUdGSVggZm9yIG1pc3NpbmcgU3RhcnRUcmlnZ2VycyBhdCBzdGFydHVwXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gdHJpZ2dlclBhcmFtZXRlcnNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0cmlnZ2VySW5kZXhcclxuICAgICAqIEBwYXJhbSB7Kn0gY3VycmVudFRyYWNlQ29uZmlnXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIHVwZGF0ZVNpbmdsZVRyaWdnZXIodHJpZ2dlclBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10sIHRyaWdnZXJJbmRleDogbnVtYmVyLCBjdXJyZW50VHJhY2VDb25maWcpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBsZXQgdHJpZ2dlcklEID0gKHRyaWdnZXJJbmRleCArIDEpO1xyXG4gICAgICAgICAgICBsZXQgc3RhcnRUcmlnZ2VyUHJlZml4QnJvd3NlTmFtZSA9IFwiU3RhcnRUcmlnZ2VyXCIgKyB0cmlnZ2VySUQgKyBcIl9cIjtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRUcmlnZ2VyQ2ZnID0gY3VycmVudFRyYWNlQ29uZmlnLlRyaWdnZXJzLmZpbHRlcigoZWxlbWVudCkgPT4geyByZXR1cm4gZWxlbWVudC5JRCA9PSB0cmlnZ2VySUQgfSlbMF07XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50VHJpZ2dlckNmZyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVPZlByb3BlcnR5KHRyaWdnZXJQYXJhbWV0ZXJzLCBzdGFydFRyaWdnZXJQcmVmaXhCcm93c2VOYW1lICsgXCJDb25kaXRpb25cIiwgY3VycmVudFRyaWdnZXJDZmcuRXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZU9mUHJvcGVydHkodHJpZ2dlclBhcmFtZXRlcnMsIHN0YXJ0VHJpZ2dlclByZWZpeEJyb3dzZU5hbWUgKyBcIkRhdGFQb2ludFwiLCBjdXJyZW50VHJpZ2dlckNmZy5EYXRhUG9pbnQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZU9mUHJvcGVydHkodHJpZ2dlclBhcmFtZXRlcnMsIHN0YXJ0VHJpZ2dlclByZWZpeEJyb3dzZU5hbWUgKyBcIlRocmVzaG9sZFwiLCBjdXJyZW50VHJpZ2dlckNmZy5UaHJlc2hvbGQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZU9mUHJvcGVydHkodHJpZ2dlclBhcmFtZXRlcnMsIHN0YXJ0VHJpZ2dlclByZWZpeEJyb3dzZU5hbWUgKyBcIldpbmRvd1wiLCBjdXJyZW50VHJpZ2dlckNmZy5XaW5kb3cpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gU2V0IFRyaWdnZXIgdG8gZGVmYXVsdCBpZiBub3QgYXZhaWxhYmxlIGluIGN1cnJlbnQgdHJhY2UgY29uZmlnXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlT2ZQcm9wZXJ0eSh0cmlnZ2VyUGFyYW1ldGVycywgc3RhcnRUcmlnZ2VyUHJlZml4QnJvd3NlTmFtZSArIFwiQ29uZGl0aW9uXCIsIFwiMjBcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlT2ZQcm9wZXJ0eSh0cmlnZ2VyUGFyYW1ldGVycywgc3RhcnRUcmlnZ2VyUHJlZml4QnJvd3NlTmFtZSArIFwiRGF0YVBvaW50XCIsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZU9mUHJvcGVydHkodHJpZ2dlclBhcmFtZXRlcnMsIHN0YXJ0VHJpZ2dlclByZWZpeEJyb3dzZU5hbWUgKyBcIlRocmVzaG9sZFwiLCBcIjBcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlT2ZQcm9wZXJ0eSh0cmlnZ2VyUGFyYW1ldGVycywgc3RhcnRUcmlnZ2VyUHJlZml4QnJvd3NlTmFtZSArIFwiV2luZG93XCIsIFwiMFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlVwZGF0aW5nIG9mIHNvbWUgdHJhY2UgY29uZmlndXJhdGlvbiB0cmlnZ2VyIGluZm9ybWF0aW9ucyBub3QgcG9zc2libGUhXCIpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIHNldFZhbHVlT2ZQcm9wZXJ0eShwcm9wZXJ0aWVzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdLCBwcm9wZXJ0eU5hbWU6IHN0cmluZywgdmFsdWUpIHtcclxuICAgICAgICBsZXQgcHJvcGVydHkgPSBwcm9wZXJ0aWVzLmZpbHRlcigoZWxlbWVudCkgPT4geyByZXR1cm4gZWxlbWVudC5icm93c2VOYW1lID09IHByb3BlcnR5TmFtZSB9KVswXTtcclxuICAgICAgICBpZiAocHJvcGVydHkgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHByb3BlcnR5LnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGlzVHJpZ2dlclBhcmFtZXRlcihwYXJhbWV0ZXI6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgLy8gVHJpZ2dlciBwYXJhbWV0ZXJzIGJlZ2luIHdpdGggXCJTdGFydFRyaWdnZXJcIiBpbiB0aGUgcHJvcGVydGllcyBuYW1lXHJcbiAgICAgICAgbGV0IHByZWZpeCA9IFwiU3RhcnRUcmlnZ2VyXCI7XHJcbiAgICAgICAgaWYgKHBhcmFtZXRlci5icm93c2VOYW1lLnN1YnN0cigwLCBwcmVmaXgubGVuZ3RoKSA9PSBwcmVmaXgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJldHJpZXZlcyB0aGUgdHJhY2UgY29uZmlndXJhdGlvbiBkYXRhcG9pbnRzIGZyb20gdGhlIHBhcmFtZXRlciBzZXRcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IGNvbXBvbmVudFBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm5zIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mb1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgcmV0cmlldmVUcmFjZUNvbmZpZ3VyYXRpb25EYXRhcG9pbnRzKGNvbXBvbmVudFBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdIHtcclxuICAgICAgICAvLyByZXRyaWV2ZSB0aGUgdHJhY2UgY29uZmlndXJhdGlvbiBkYXRhcG9pbnRzXHJcbiAgICAgICAgbGV0IGRhdGFwb2ludHMgPSBuZXcgQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+KCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb21wb25lbnRQYXJhbWV0ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm8uaXNEYXRhUG9pbnQoY29tcG9uZW50UGFyYW1ldGVyc1tpXSkpIHtcclxuICAgICAgICAgICAgICAgIGRhdGFwb2ludHMucHVzaChjb21wb25lbnRQYXJhbWV0ZXJzW2ldKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBVcGRhdGUgdGhlIHZhbHVlcyB0byB0aGUgcmVhbCB2YWx1ZXMgZnJvbSBDdXJyZW50VHJjQ29uZmlnIFByb3BlcnR5IChCVUdGSVggZm9yIG1pc3NpbmcgU3RhcnRUcmlnZ2VycyBhdCBzdGFydHVwKVxyXG4gICAgICAgIGxldCBjdXJyZW50VHJjQ29uZmlnUHJvcGVydGllcyA9IGNvbXBvbmVudFBhcmFtZXRlcnMuZmlsdGVyKChlbGVtZW50KSA9PiB7IHJldHVybiBlbGVtZW50LmJyb3dzZU5hbWUgPT0gXCJDdXJyZW50VHJjQ29uZmlnXCIgfSk7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRUcmNDb25maWdQcm9wZXJ0aWVzLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50VHJjQ29uZmlnUHJvcGVydGllc1swXS52YWx1ZSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlRGF0YVBvaW50UGFyYW1ldGVycyhkYXRhcG9pbnRzLCBjdXJyZW50VHJjQ29uZmlnUHJvcGVydGllc1swXS52YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRhdGFwb2ludHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSB2YWx1ZXMgb2YgdGhlIGRhdGFwb2ludCBwYXJhbWV0ZXJzIHdpdGggdGhlIHZhbHVlcyBmcm9tIGEganNvbiBzdHJpbmcgKGN1cnJlbnRUcmFjZUNvbmZpZ0pzb25TdHJpbmcpIFxyXG4gICAgICogQlVHRklYIGZvciBtaXNzaW5nIFN0YXJ0VHJpZ2dlcnMgYXQgc3RhcnR1cFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IGRhdGFQb2ludFBhcmFtZXRlcnNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjdXJyZW50VHJhY2VDb25maWdKc29uU3RyaW5nXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIHVwZGF0ZURhdGFQb2ludFBhcmFtZXRlcnMoZGF0YVBvaW50UGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSwgY3VycmVudFRyYWNlQ29uZmlnSnNvblN0cmluZzogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRUcmFjZUNvbmZpZ0pzb25TdHJpbmcgIT0gXCJcIikge1xyXG4gICAgICAgICAgICBsZXQgY3VycmVudFRyYWNlQ29uZmlnID0gSlNPTi5wYXJzZShjdXJyZW50VHJhY2VDb25maWdKc29uU3RyaW5nKTtcclxuICAgICAgICAgICAgLy8gVXBkYXRlIGFsbCBkYXRhcG9pbnRzXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFRyYWNlQ29uZmlnLkRhdGFQb2ludHMgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGRhdGFQb2ludFBhcmFtZXRlcnMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhUG9pbnRJRCA9IChpbmRleCArIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudERhdGFQb2ludCA9IGN1cnJlbnRUcmFjZUNvbmZpZy5EYXRhUG9pbnRzLmZpbHRlcigoZWxlbWVudCkgPT4geyByZXR1cm4gZWxlbWVudC5JRCA9PSBkYXRhUG9pbnRJRCB9KVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnREYXRhUG9pbnQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhUG9pbnRQYXJhbWV0ZXJzW2luZGV4XS52YWx1ZSA9IGN1cnJlbnREYXRhUG9pbnQuTmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFQb2ludFBhcmFtZXRlcnNbaW5kZXhdLnZhbHVlID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJVcGRhdGluZyBvZiBzb21lIHRyYWNlIGNvbmZpZ3VyYXRpb24gZGF0YXBvaW50IGluZm9ybWF0aW9ucyBub3QgcG9zc2libGUhXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgaXNEYXRhUG9pbnQocGFyYW1ldGVyOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIC8vIERhdGFwb2ludCBwYXJhbWV0ZXJzIGJlZ2luIHdpdGggXCJEYXRhUG9pbnRcIiBpbiB0aGUgcHJvcGVydGllcyBuYW1lXHJcbiAgICAgICAgbGV0IHByZWZpeCA9IFwiRGF0YVBvaW50XCI7XHJcbiAgICAgICAgaWYgKHBhcmFtZXRlci5icm93c2VOYW1lLnN1YnN0cigwLCBwcmVmaXgubGVuZ3RoKSA9PSBwcmVmaXgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJldHJpZXZlcyB0aGUgdHJhY2UgY29udHJvbCBwYXJhbWV0ZXJzIGZyb20gdGhlIHBhcmFtZXRlciBzZXRcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IGNvbXBvbmVudFBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm5zIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mb1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgcmV0cmlldmVUcmFjZUNvbnRyb2xQYXJhbWV0ZXJzKGNvbXBvbmVudFBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdIHtcclxuICAgICAgICAvLyByZXRyaWV2ZSB0aGUgdHJhY2UgY29uZmlndXJhdGlvbiBkYXRhcG9pbnRzXHJcbiAgICAgICAgbGV0IGRhdGFwb2ludHMgPSBuZXcgQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+KCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb21wb25lbnRQYXJhbWV0ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm8uaXNUcmFjZUNvbnRyb2xQYXJhbWV0ZXIoY29tcG9uZW50UGFyYW1ldGVyc1tpXSkpIHtcclxuICAgICAgICAgICAgICAgIGRhdGFwb2ludHMucHVzaChjb21wb25lbnRQYXJhbWV0ZXJzW2ldKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkYXRhcG9pbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGlzVHJhY2VDb250cm9sUGFyYW1ldGVyKHBhcmFtZXRlcjogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAocGFyYW1ldGVyLmJyb3dzZU5hbWUgPT0gXCJUcmFjZVN0YXR1c1wiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIHJldHJpZXZlcyB0aGUgY29uZmlndXJhdGlvbiBwYXJhbWV0ZXJzIGZyb20gdGhlIHBhcmFtZXRlciBzZXRcclxuICAgICpcclxuICAgICogQHN0YXRpY1xyXG4gICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IGNvbXBvbmVudFBhcmFtZXRlcnNcclxuICAgICogQHJldHVybnMge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119XHJcbiAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm9cclxuICAgICovXHJcbiAgICBzdGF0aWMgcmV0cmlldmVDb25maWd1cmF0aW9uUGFyYW1ldGVycyhjb21wb25lbnRQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdKTogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSB7XHJcbiAgICAgICAgLy8gZ2V0IHRoZSBjb25maWd1cmF0aW9uIG1ldGEgaW5mb3NcclxuICAgICAgICBsZXQgY29uZmlndXJhdGlvbk1ldGFJbmZvO1xyXG4gICAgICAgIGlmICgoY29tcG9uZW50UGFyYW1ldGVyc1swXSAhPSB1bmRlZmluZWQpICYmICg8YW55Pig8TWFwcENvY2twaXRDb21wb25lbnQ+Y29tcG9uZW50UGFyYW1ldGVyc1swXS5jb21wb25lbnQpLm1ldGFEYXRhKS5NZXRhQ29uZmlnQ29uZmlnUHJvcHMgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZ3VyYXRpb25NZXRhSW5mbyA9ICg8YW55Pig8TWFwcENvY2twaXRDb21wb25lbnQ+Y29tcG9uZW50UGFyYW1ldGVyc1swXS5jb21wb25lbnQpLm1ldGFEYXRhKS5NZXRhQ29uZmlnQ29uZmlnUHJvcHMuQ29uZmlndXJhdGlvblN0cnVjdHVyZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQXJyYXkoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHJldHJpZXZlIHRoZSBjb25maWd1cmF0aW9uIGRlZmluaXRpb25zXHJcbiAgICAgICAgbGV0IGNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzID0gTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvLnJldHJpZXZlUGFyYW1ldGVyc0Zyb21NZXRhSW5mbyhbXCJQYXJhbWV0ZXJcIiwgXCJHcm91cFwiXSwgY29uZmlndXJhdGlvbk1ldGFJbmZvLCBjb21wb25lbnRQYXJhbWV0ZXJzKTtcclxuICAgICAgICByZXR1cm4gY29uZmlndXJhdGlvblBhcmFtZXRlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZXRyaXZlcyBwYXJhbWV0ZXJzIGRlY2xhcmVkIGluIHRoZSBtZXRhIGluZm9cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gcmVxdWVzdGVJdGVtVHlwZXNcclxuICAgICAqIEBwYXJhbSB7Kn0gcGFyYW1ldGVyTWV0YUluZm9cclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gY29tcG9uZW50UGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm9cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmV0cmlldmVQYXJhbWV0ZXJzRnJvbU1ldGFJbmZvKHJlcXVlc3RlSXRlbVR5cGVzOiBzdHJpbmdbXSwgcGFyYW1ldGVyTWV0YUluZm86IGFueSwgY29tcG9uZW50UGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSkge1xyXG5cclxuICAgICAgICAvLyBnZXQgcmVxdWVzdGVkIG1ldGEgaXRlbXNcclxuICAgICAgICBsZXQgbWV0YVBhcmFtZXRlckl0ZW1zID0gTWFwcENvY2twaXRDb21wb25lbnRNZXRhRGF0YS5maWx0ZXJNZXRhSXRlbXMocGFyYW1ldGVyTWV0YUluZm8sIHJlcXVlc3RlSXRlbVR5cGVzKTtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIGRpY3Rpb25hcnkgb2YgYXZhaWxhYmxlIHBhcmFtZXRlcnNcclxuICAgICAgICBsZXQgcGFyYW1ldGVyU2V0ID0ge307XHJcbiAgICAgICAgY29tcG9uZW50UGFyYW1ldGVycy5mb3JFYWNoKChwYXJhbWV0ZXIpID0+IHsgcGFyYW1ldGVyU2V0W3BhcmFtZXRlci5icm93c2VOYW1lXSA9IHBhcmFtZXRlcjsgfSk7XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSBkaWN0aW9uYXJ5IG9mIG1ldGEgcGFyYW1ldGVyc1xyXG4gICAgICAgIGxldCBtZXRhUGFyYW1ldGVycyA9IHt9O1xyXG4gICAgICAgIG1ldGFQYXJhbWV0ZXJJdGVtcy5mb3JFYWNoKChtZXRhUGFyYW1ldGVyKSA9PiB7IG1ldGFQYXJhbWV0ZXJzW21ldGFQYXJhbWV0ZXIuUmVmXSA9IG1ldGFQYXJhbWV0ZXI7IH0pO1xyXG5cclxuICAgICAgICAvLyByZXRyaWV2ZSB0aGUgcGFyYW1ldGVycyB3aXRoIG1hdGNoaW5nIG5hbWUgaW4gdGhlIG1ldGEgaW5mb1xyXG4gICAgICAgIGxldCBtYXRjaGluZ1BhcmFtZXRlcnMgPSBjb21wb25lbnRQYXJhbWV0ZXJzLmZpbHRlcigoY29tcG9uZW50UGFyYW1ldGVyKSA9PiB7IHJldHVybiBtZXRhUGFyYW1ldGVyc1tjb21wb25lbnRQYXJhbWV0ZXIuYnJvd3NlTmFtZV0gIT09IHVuZGVmaW5lZDsgfSk7XHJcblxyXG4gICAgICAgIC8vIHJlYWQgYW5kIGFzc2lnbiB1bml0c1xyXG4gICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mby51cGRhdGVQYXJhbWV0ZXIobWF0Y2hpbmdQYXJhbWV0ZXJzLCBtZXRhUGFyYW1ldGVycyk7XHJcblxyXG4gICAgICAgIC8vIG5vdGlmeSBpbnZhbGlkIG9yIHVua25vd24gcmVmZXJlbmNlc1xyXG4gICAgICAgIGxldCB1bmtub3duUGFyYW1ldGVyUmVmcyA9IG1ldGFQYXJhbWV0ZXJJdGVtcy5maWx0ZXIoKG1ldGFQYXJhbWV0ZXIpID0+IHsgcmV0dXJuIG1ldGFQYXJhbWV0ZXIuUmVmICE9PSB1bmRlZmluZWQgJiYgcGFyYW1ldGVyU2V0W21ldGFQYXJhbWV0ZXIuUmVmXSA9PT0gdW5kZWZpbmVkOyB9KTtcclxuICAgICAgICBpZiAodW5rbm93blBhcmFtZXRlclJlZnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvLnJldHJpZXZlUGFyYW1ldGVyc0Zyb21NZXRhSW5mbyA6IG1ldGEgaW5mbyByZWZlcmVuY2VzIHVua25vd24gcGFyYW1ldGVycyAlbyAlb1wiLCB1bmtub3duUGFyYW1ldGVyUmVmcywgcGFyYW1ldGVyU2V0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1hdGNoaW5nUGFyYW1ldGVycztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHJpZXZlcyB3YXRjaGFibGUgc3RhdGVzIGRlY2xhcmVkIGluIHRoZSBtZXRhSW5mb1xyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IHJlcXVlc3RlSXRlbVR5cGVzXHJcbiAgICAgKiBAcGFyYW0geyp9IHBhcmFtZXRlck1ldGFJbmZvXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IGNvbXBvbmVudFBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm5zIHtNYXBwQ29ja3BpdFN0YXRlUGFyYW1ldGVyW119XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyByZXRyaWV2ZVdhdGNoYWJsZVN0YXRlc0Zyb21NZXRhSW5mbyhyZXF1ZXN0ZUl0ZW1UeXBlczogc3RyaW5nW10sIHBhcmFtZXRlck1ldGFJbmZvOiBhbnksIGNvbXBvbmVudFBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pOiBNYXBwQ29ja3BpdFN0YXRlUGFyYW1ldGVyW10ge1xyXG4gICAgICAgIGxldCBzdGF0ZVBhcmFtZXRlcnMgPSBuZXcgQXJyYXk8TWFwcENvY2twaXRTdGF0ZVBhcmFtZXRlcj4oKTtcclxuXHJcbiAgICAgICAgLy8gZ2V0IHJlcXVlc3RlZCBtZXRhIGl0ZW1zXHJcbiAgICAgICAgbGV0IG1ldGFQYXJhbWV0ZXJJdGVtcyA9IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0YURhdGEuZmlsdGVyTWV0YUl0ZW1zKHBhcmFtZXRlck1ldGFJbmZvLCByZXF1ZXN0ZUl0ZW1UeXBlcyk7XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSBkaWN0aW9uYXJ5IG9mIGF2YWlsYWJsZSBwYXJhbWV0ZXJzXHJcbiAgICAgICAgbGV0IHBhcmFtZXRlclNldCA9IHt9O1xyXG4gICAgICAgIGNvbXBvbmVudFBhcmFtZXRlcnMuZm9yRWFjaCgocGFyYW1ldGVyKSA9PiB7IHBhcmFtZXRlclNldFtwYXJhbWV0ZXIuYnJvd3NlTmFtZV0gPSBwYXJhbWV0ZXI7IH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGNyZWF0ZSB3YXRjaGFibGUgc3RhdGVzXHJcbiAgICAgICAgbWV0YVBhcmFtZXRlckl0ZW1zLmZvckVhY2goKG1ldGFQYXJhbWV0ZXIpID0+IHtcclxuICAgICAgICAgICAgc3RhdGVQYXJhbWV0ZXJzLnB1c2gobmV3IE1hcHBDb2NrcGl0U3RhdGVQYXJhbWV0ZXIobWV0YVBhcmFtZXRlci5OYW1lLCBtZXRhUGFyYW1ldGVyLkljb25FeHByZXNzaW9uLCBtZXRhUGFyYW1ldGVyLkljb24pKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBub3RpZnkgaW52YWxpZCBvciB1bmtub3duIHJlZmVyZW5jZXNcclxuICAgICAgICBsZXQgdW5rbm93blBhcmFtZXRlclJlZnMgPSBtZXRhUGFyYW1ldGVySXRlbXMuZmlsdGVyKChtZXRhUGFyYW1ldGVyKSA9PiB7IHJldHVybiAgbWV0YVBhcmFtZXRlci5SZWYgIT09IHVuZGVmaW5lZCAmJiBwYXJhbWV0ZXJTZXRbbWV0YVBhcmFtZXRlci5SZWZdID09PSB1bmRlZmluZWQ7IH0pO1xyXG4gICAgICAgIGlmICh1bmtub3duUGFyYW1ldGVyUmVmcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm8ucmV0cmlldmVXYXRjaGFibGVTdGF0ZXNGcm9tTWV0YUluZm8gOiBtZXRhIGluZm8gcmVmZXJlbmNlcyB1bmtub3duIHdhdGNoYWJsZSBzdGF0ZSBwYXJhbWV0ZXJzICVvXCIsIHVua25vd25QYXJhbWV0ZXJSZWZzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzdGF0ZVBhcmFtZXRlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHJlYWRQYXJhbWV0ZXJzKHBhcmFtZXRlck1ldGFJbmZvOiBhbnksIHBhcmFtZXRlcjogQXJyYXk8c3RyaW5nPik6IG9iamVjdCB7XHJcbiAgICAgICAgLy8gZ2V0IHJlcXVlc3RlZCBtZXRhIGl0ZW1zXHJcbiAgICAgICAgbGV0IG1ldGFQYXJhbWV0ZXJJdGVtcyA9IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0YURhdGEuZmlsdGVyTWV0YUl0ZW1zKHBhcmFtZXRlck1ldGFJbmZvLCBwYXJhbWV0ZXIpO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgZGljdGlvbmFyeSBvZiBtZXRhIHBhcmFtZXRlcnNcclxuICAgICAgICBsZXQgbWV0YVBhcmFtZXRlcnMgPSB7fTtcclxuICAgICAgICBtZXRhUGFyYW1ldGVySXRlbXMuZm9yRWFjaCgobWV0YVBhcmFtZXRlcikgPT4geyBtZXRhUGFyYW1ldGVyc1ttZXRhUGFyYW1ldGVyLlJlZl0gPSBtZXRhUGFyYW1ldGVyOyB9KTtcclxuICAgICAgICByZXR1cm4gbWV0YVBhcmFtZXRlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHJlYWRNZXNzYWdlUGFyYW1ldGVycyhwYXJhbWV0ZXJNZXRhSW5mbzogYW55KTogb2JqZWN0IHtcclxuXHJcbiAgICAgICAgbGV0IG1ldGFQYXJhbWV0ZXJzID0ge307XHJcbiAgICAgICAgbWV0YVBhcmFtZXRlcnNbXCJpbnRBcnJheVNldmVyaXR5XCJdID0geyBSZWY6IFwiaW50QXJyYXlTZXZlcml0eVwiIH07XHJcbiAgICAgICAgbWV0YVBhcmFtZXRlcnNbXCJzdHJBcnJheURlc2NyaXB0aW9uXCJdID0geyBSZWY6IFwic3RyQXJyYXlEZXNjcmlwdGlvblwiIH07XHJcbiAgICAgICAgbWV0YVBhcmFtZXRlcnNbXCJzdHJBcnJheUV2ZW50SURcIl0gPSB7IFJlZjogXCJzdHJBcnJheUV2ZW50SURcIiB9O1xyXG4gICAgICAgIG1ldGFQYXJhbWV0ZXJzW1wic3RyQXJyYXlUaW1lXCJdID0geyBSZWY6IFwic3RyQXJyYXlUaW1lXCIgfTtcclxuICAgICAgICByZXR1cm4gbWV0YVBhcmFtZXRlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZWFkcyBlbmdpbmVlcmluZyB1bml0cyBmcm9tIHRoZSBtZXRhIGluZm8gYW5kIGFzc2lnbnMgaXQgdG8gdGhlIHBhcmFtZXRlcnNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSBjb21wb25lbnRQYXJhbWV0ZXJzXHJcbiAgICAgKiBAcGFyYW0ge3t9fSBtZXRhUGFyYW1ldGVyc1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mb1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgdXBkYXRlUGFyYW1ldGVyKGNvbXBvbmVudFBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10sIG1ldGFQYXJhbWV0ZXJzOiB7fSkge1xyXG4gICAgICAgIGNvbXBvbmVudFBhcmFtZXRlcnMuZm9yRWFjaCgoY29tcG9uZW50UGFyYW1ldGVyKSA9PiB7XHJcbiAgICAgICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mby51cGRhdGVQYXJhbWV0ZXJFbmdpbmVlcmluZ1VuaXQobWV0YVBhcmFtZXRlcnMsIGNvbXBvbmVudFBhcmFtZXRlcik7XHJcbiAgICAgICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mby51cGRhdGVQYXJhbWV0ZXJEaXNwbGF5TmFtZShtZXRhUGFyYW1ldGVycywgY29tcG9uZW50UGFyYW1ldGVyKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIHBhcmFtZXRlcnMgZGlzcGxheSBuYW1lXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHt7fX0gbWV0YVBhcmFtZXRlcnNcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJ9IGNvbXBvbmVudFBhcmFtZXRlclxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyB1cGRhdGVQYXJhbWV0ZXJEaXNwbGF5TmFtZShtZXRhUGFyYW1ldGVyczoge30sIGNvbXBvbmVudFBhcmFtZXRlcjogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIpOiBhbnkge1xyXG4gICAgICAgIGlmIChtZXRhUGFyYW1ldGVyc1tjb21wb25lbnRQYXJhbWV0ZXIuYnJvd3NlTmFtZV0uRGlzcGxheU5hbWUpIHtcclxuICAgICAgICAgICAgY29tcG9uZW50UGFyYW1ldGVyLmRpc3BsYXlOYW1lID0gbWV0YVBhcmFtZXRlcnNbY29tcG9uZW50UGFyYW1ldGVyLmJyb3dzZU5hbWVdLkRpc3BsYXlOYW1lO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIHBhcmFtZXRlcnMgZW5naW5lZXJpbmcgdW5pdHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHt7fX0gbWV0YVBhcmFtZXRlcnNcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJ9IGNvbXBvbmVudFBhcmFtZXRlclxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mb1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyB1cGRhdGVQYXJhbWV0ZXJFbmdpbmVlcmluZ1VuaXQobWV0YVBhcmFtZXRlcnM6IHt9LCBjb21wb25lbnRQYXJhbWV0ZXI6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyKSB7XHJcbiAgICAgICAgaWYgKG1ldGFQYXJhbWV0ZXJzW2NvbXBvbmVudFBhcmFtZXRlci5icm93c2VOYW1lXS5FVSkge1xyXG4gICAgICAgICAgICBjb21wb25lbnRQYXJhbWV0ZXIuZW5naW5lZXJpbmdVbml0ID0gbWV0YVBhcmFtZXRlcnNbY29tcG9uZW50UGFyYW1ldGVyLmJyb3dzZU5hbWVdLkVVO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlYWRzIGVudW0gdmFsdWVzIGlmIGF2YWlsYWJsZSBhbmQgYXNzaWducyBpdCB0byB0aGUgcGFyYW1ldGVyXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcn0gcGFyYW1ldGVyXHJcbiAgICAgKiBAcmV0dXJucyB7Kn0gdHJ1ZSBpZiB0aGUgcGFyYW1ldGVyIHVzZXMgYW4gZW51bSBmb3IgaXRzIHZhbHVlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyByZWFkUGFyYW1ldGVyRW51bXMoY29tcG9uZW50UGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSkge1xyXG5cclxuICAgICAgICAvLyBnZXQgYXZhaWxhYmxlIGVudW0gcGFyYW1ldGVyIGRlZnMgXHJcbiAgICAgICAgbGV0IGVudW1QYXJhbWV0ZXJUeXBlRGVmaW5pdGlvbnMgPSBNYXBwQ29ja3BpdENvbW1vbkluZm9Qcm92aWRlci5nZXRJbnN0YW5jZSgpLnJlYWRFbnVtUGFyYW1ldGVyRGVmaW5pdGlvbnMoY29tcG9uZW50UGFyYW1ldGVycywgKDxNYXBwQ29ja3BpdENvbXBvbmVudD5jb21wb25lbnRQYXJhbWV0ZXJzWzBdLmNvbXBvbmVudCkubWV0YURhdGEpO1xyXG4gICAgICAgIC8vIGZpbmQgbWF0Y2hpbmcgcGFyYW1ldGVyXHJcbiAgICAgICAgbGV0IG1hdGNoaW5nUGFyYW1ldGVycyA9IGNvbXBvbmVudFBhcmFtZXRlcnMuZmlsdGVyKChjb21wb25lbnRQYXJhbWV0ZXIpID0+IHsgcmV0dXJuIGVudW1QYXJhbWV0ZXJUeXBlRGVmaW5pdGlvbnNbY29tcG9uZW50UGFyYW1ldGVyLmJyb3dzZU5hbWVdIH0pO1xyXG4gICAgICAgIC8vIHNldCB0aGUgZW51bSBkZWZpbml0aW9ucyBmb3IgdGhlIG1hdGNoaW5nIHBhcmFtZXRlcnNcclxuICAgICAgICBtYXRjaGluZ1BhcmFtZXRlcnMuZm9yRWFjaCgobWF0Y2hpbmdQYXJhbWV0ZXIpID0+IHtcclxuICAgICAgICAgICAgLy8gc2V0IHRoZSBlbnVtIGRlZmluaXRpb25cclxuICAgICAgICAgICAgbWF0Y2hpbmdQYXJhbWV0ZXIuZW51bVR5cGUgPSBlbnVtUGFyYW1ldGVyVHlwZURlZmluaXRpb25zW21hdGNoaW5nUGFyYW1ldGVyLmJyb3dzZU5hbWVdO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mbyAtIHNldCBlbnVtIGluZm8gJW8gZm9yICVvXCIsIG1hdGNoaW5nUGFyYW1ldGVyLmVudW1UeXBlLCAoPGFueT5tYXRjaGluZ1BhcmFtZXRlci5jb21wb25lbnQpLmJyb3dzZU5hbWUgKyBcIi5cIiArIG1hdGNoaW5nUGFyYW1ldGVyLmJyb3dzZU5hbWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogcHJvdmlkZXMgZGVzY3JpcHRpdmUgaW5mb3JtYXRpb24gZm9yIGEgbWV0aG9kXHJcbiAqXHJcbiAqIEBjbGFzcyBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm9JbmZvXHJcbiAqL1xyXG5jbGFzcyBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm8ge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogaW5pdGlhbGl6ZXMgdGhlIG1ldGhvZCBpbnB1dCBwYXJhbWV0ZXJzXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZH0gbWV0aG9kXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm9cclxuICAgICAqL1xyXG4gICAgc3RhdGljIHVwZGF0ZU1ldGhvZElucHV0UGFyYW1ldGVycyhtZXRob2Q6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kKTogYW55IHtcclxuXHJcbiAgICAgICAgLy8gc2tpcCBpZiB0aGUgbWV0aG9kIGhhcyBubyBwYXJhbWV0ZXJzIHRvIGluaXRpYWxpemUuXHJcbiAgICAgICAgaWYgKG1ldGhvZC5pbnB1dFBhcmFtZXRlcnMubGVuZ3RoID09PSAwKSByZXR1cm47XHJcblxyXG4gICAgICAgIC8vIGdldCB0aGUgbWV0YSBkYXRhXHJcbiAgICAgICAgbGV0IG1ldGhvZE1ldGFJbmZvID0gTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvLmdldE1ldGhvZE1ldGFJbmZvKG1ldGhvZCk7XHJcblxyXG4gICAgICAgIGlmIChtZXRob2RNZXRhSW5mbykge1xyXG5cclxuICAgICAgICAgICAgLy8gZmluZCBhbmQgaW5pdGlhbGl6ZSBtZXRob2QgcGFyYW1ldGVyIGRlZmF1bHQgdmFsdWVzXHJcbiAgICAgICAgICAgIG1ldGhvZC5pbnB1dFBhcmFtZXRlcnMuZm9yRWFjaCgobWV0aG9kSW5wdXRQYXJhbWV0ZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mby51cGRhdGVNZXRob2RJbnB1dFBhcmFtZXRlckRlZmF1bHRzKG1ldGhvZCwgbWV0aG9kSW5wdXRQYXJhbWV0ZXIsIG1ldGhvZE1ldGFJbmZvKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHVwZGF0ZXMgcmVzcGVjdGl2ZWx5IGluaXRpYWxpemVzIHRoZSBtZXRob2QgaW5wdXQgcGFyYW1ldGVycyB3aXRoIGRlZmF1bHRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRNZXRob2R9IG1ldGhvZFxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcn0gbWV0aG9kSW5wdXRQYXJhbWV0ZXJcclxuICAgICAqIEBwYXJhbSB7Kn0gbWV0aG9kTWV0YUluZm9cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm9cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgdXBkYXRlTWV0aG9kSW5wdXRQYXJhbWV0ZXJEZWZhdWx0cyhtZXRob2Q6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLCBtZXRob2RJbnB1dFBhcmFtZXRlcjogTWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXIsIG1ldGhvZE1ldGFJbmZvOiBhbnksKSB7XHJcbiAgICAgICAgbGV0IG1ldGhvZFBhcmFtZXRlck1ldGFJbmZvID0gTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvLmdldE1ldGhvZFBhcmFtZXRlck1ldGFJbmZvKG1ldGhvZE1ldGFJbmZvLCBtZXRob2RJbnB1dFBhcmFtZXRlcik7XHJcbiAgICAgICAgaWYgKG1ldGhvZFBhcmFtZXRlck1ldGFJbmZvKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBhc3NpZ24gZGVmYXVsdCB2YWx1ZSBpZiBkZWZpbmVkIC4uLlxyXG4gICAgICAgICAgICBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm8udXBkYXRlTWV0aG9kSW5wdXRQYXJhbWV0ZXJEZWZhdWx0VmFsdWUobWV0aG9kUGFyYW1ldGVyTWV0YUluZm8sIG1ldGhvZElucHV0UGFyYW1ldGVyLCBtZXRob2QpO1xyXG5cclxuICAgICAgICAgICAgLy8gYXNzaWduIGVuZ2luZWVyaW5nIHVuaXQgaWYgZGVmaW5lZC5cclxuICAgICAgICAgICAgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvLnVwZGF0ZU1ldGhvZFBhcmFtZXRlckVuZ2luZWVyaW5nVW5pdChtZXRob2RQYXJhbWV0ZXJNZXRhSW5mbywgbWV0aG9kSW5wdXRQYXJhbWV0ZXIpO1xyXG5cclxuICAgICAgICAgICAgLy8gYXNzaWduIGRpc3BsYXkgbmFtZVxyXG4gICAgICAgICAgICBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm8udXBkYXRlTWV0aG9kUGFyYW1ldGVyRGlzcGxheU5hbWUobWV0aG9kUGFyYW1ldGVyTWV0YUluZm8sIG1ldGhvZElucHV0UGFyYW1ldGVyKTtcclxuXHJcbiAgICAgICAgICAgIC8vYXNzaWduIGZpbHRlciBpZiBkZWZpbmVkXHJcbiAgICAgICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mby51cGRhdGVNZXRob2RQYXJhbWV0ZXJGaWx0ZXIobWV0aG9kUGFyYW1ldGVyTWV0YUluZm8sIG1ldGhvZElucHV0UGFyYW1ldGVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm8uaW5pdGlhbGl6ZUlucHV0UGFyYW1ldGVyRGVmYXVsdFZhbHVlcyA6IE5vIG1ldGEgaW5mbyBkZWZpbmVkIGZvciBmb3IgbWV0aG9kIHBhcmFtZXRlciAlb1wiLCBtZXRob2QuYnJvd3NlTmFtZSArIFwiLlwiICsgbWV0aG9kSW5wdXRQYXJhbWV0ZXIubmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIHVwZGF0ZU1ldGhvZFBhcmFtZXRlckZpbHRlcihtZXRob2RQYXJhbWV0ZXJNZXRhSW5mbzogYW55LCBtZXRob2RJbnB1dFBhcmFtZXRlcjogTWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXIpOiBhbnkge1xyXG4gICAgICAgIGxldCBwYXJhbWV0ZXJIYXNGaWx0ZXIgPSBtZXRob2RQYXJhbWV0ZXJNZXRhSW5mby5QYXJhbWV0ZXIuaGFzT3duUHJvcGVydHkoXCJGaWx0ZXJcIik7XHJcbiAgICAgICAgaWYgKHBhcmFtZXRlckhhc0ZpbHRlcikge1xyXG4gICAgICAgICAgICBtZXRob2RJbnB1dFBhcmFtZXRlci5maWx0ZXIucGFyYW1ldGVyUmVmID0gbWV0aG9kUGFyYW1ldGVyTWV0YUluZm8uUGFyYW1ldGVyLkZpbHRlci5QYXJhbWV0ZXJSZWY7XHJcbiAgICAgICAgICAgIG1ldGhvZElucHV0UGFyYW1ldGVyLmZpbHRlci5wYXJhbWV0ZXJWYWx1ZXMgPSBtZXRob2RQYXJhbWV0ZXJNZXRhSW5mby5QYXJhbWV0ZXIuRmlsdGVyLlBhcmFtZXRlclZhbHVlcztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBkaXNwbGF5IGZyb20gbWV0YSBpbmZvXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHsqfSBtZXRob2RQYXJhbWV0ZXJNZXRhSW5mb1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcn0gbWV0aG9kSW5wdXRQYXJhbWV0ZXJcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mb1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgdXBkYXRlTWV0aG9kUGFyYW1ldGVyRGlzcGxheU5hbWUobWV0aG9kUGFyYW1ldGVyTWV0YUluZm86IGFueSwgbWV0aG9kSW5wdXRQYXJhbWV0ZXI6IE1hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVyKTogYW55IHtcclxuICAgICAgICBpZiAobWV0aG9kUGFyYW1ldGVyTWV0YUluZm8uUGFyYW1ldGVyLkRpc3BsYXlOYW1lKSB7XHJcbiAgICAgICAgICAgIG1ldGhvZElucHV0UGFyYW1ldGVyLmRpc3BsYXlOYW1lID0gbWV0aG9kUGFyYW1ldGVyTWV0YUluZm8uUGFyYW1ldGVyLkRpc3BsYXlOYW1lO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGVuZ2luZWVyaW5nIHVuaXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHsqfSBtZXRob2RQYXJhbWV0ZXJNZXRhSW5mb1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcn0gbWV0aG9kSW5wdXRQYXJhbWV0ZXJcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm9cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgdXBkYXRlTWV0aG9kUGFyYW1ldGVyRW5naW5lZXJpbmdVbml0KG1ldGhvZFBhcmFtZXRlck1ldGFJbmZvOiBhbnksIG1ldGhvZElucHV0UGFyYW1ldGVyOiBNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcikge1xyXG4gICAgICAgIGlmIChtZXRob2RQYXJhbWV0ZXJNZXRhSW5mby5QYXJhbWV0ZXIuRVUpIHtcclxuICAgICAgICAgICAgbWV0aG9kSW5wdXRQYXJhbWV0ZXIuZW5naW5lZXJpbmdVbml0ID0gbWV0aG9kUGFyYW1ldGVyTWV0YUluZm8uUGFyYW1ldGVyLkVVO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGRlZmF1bHQgdmFsdWVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHsqfSBtZXRob2RQYXJhbWV0ZXJNZXRhSW5mb1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcn0gbWV0aG9kSW5wdXRQYXJhbWV0ZXJcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRNZXRob2R9IG1ldGhvZFxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mb1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyB1cGRhdGVNZXRob2RJbnB1dFBhcmFtZXRlckRlZmF1bHRWYWx1ZShtZXRob2RQYXJhbWV0ZXJNZXRhSW5mbzogYW55LCBtZXRob2RJbnB1dFBhcmFtZXRlcjogTWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXIsIG1ldGhvZDogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QpIHtcclxuICAgICAgICBsZXQgcGFyYW1ldGVySGFzRGVmYXVsdFZhbHVlID0gbWV0aG9kUGFyYW1ldGVyTWV0YUluZm8uUGFyYW1ldGVyLmhhc093blByb3BlcnR5KFwiRGVmYXVsdFZhbHVlXCIpO1xyXG4gICAgICAgIGlmIChwYXJhbWV0ZXJIYXNEZWZhdWx0VmFsdWUpIHtcclxuICAgICAgICAgICAgbWV0aG9kSW5wdXRQYXJhbWV0ZXIudmFsdWUgPSBtZXRob2RQYXJhbWV0ZXJNZXRhSW5mby5QYXJhbWV0ZXIuRGVmYXVsdFZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8gbWV0aG9kIHBhcmFtZXRlcnMgbXVzdCBoYXZlIGRlZmF1bHQgdmFsdWVzIGRlZmluZWRcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIk1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mby5pbml0aWFsaXplSW5wdXRQYXJhbWV0ZXJEZWZhdWx0VmFsdWVzIDogTm8gZGVmYXVsdCB2YWx1ZSBkZWZpbmVkIGZvciBtZXRob2QgcGFyYW1ldGVyICVvXCIsIG1ldGhvZC5icm93c2VOYW1lICsgXCIuXCIgKyBtZXRob2RJbnB1dFBhcmFtZXRlci5uYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXRzIHRoZSBtZXRhIGluZm8gZm9yIGEgbWV0aG9kIHBhcmFtZXRlclxyXG4gICAgICogXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHsqfSBtZXRob2RNZXRhSW5mb1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcn0gbWV0aG9kSW5wdXRQYXJhbWV0ZXJcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIGdldE1ldGhvZFBhcmFtZXRlck1ldGFJbmZvKG1ldGhvZE1ldGFJbmZvOiBhbnksIG1ldGhvZElucHV0UGFyYW1ldGVyOiBNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcikge1xyXG4gICAgICAgIGxldCBtZXRob2RQYXJhbWV0ZXJNZXRhSW5mb3MgPSBtZXRob2RNZXRhSW5mby5QYXJhbWV0ZXJzLmZpbHRlcigobWV0aG9kTWV0YUl0ZW1QYXJhbWV0ZXJJdGVtKSA9PiB7IHJldHVybiBtZXRob2RNZXRhSXRlbVBhcmFtZXRlckl0ZW0uUGFyYW1ldGVyLlJlZiA9PT0gbWV0aG9kSW5wdXRQYXJhbWV0ZXIubmFtZTsgfSk7XHJcbiAgICAgICAgbGV0IG1ldGhvZFBhcmFtZXRlck1ldGFJbmZvID0gbWV0aG9kUGFyYW1ldGVyTWV0YUluZm9zLmxlbmd0aCA9PT0gMSA/IG1ldGhvZFBhcmFtZXRlck1ldGFJbmZvc1swXSA6IHVuZGVmaW5lZDtcclxuICAgICAgICByZXR1cm4gbWV0aG9kUGFyYW1ldGVyTWV0YUluZm87XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXRzIHRoZSBtZXRhIGluZm8gZm9yIHRoZSByZXF1ZXN0ZWQgbWV0aG9kXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRNZXRob2R9IG1ldGhvZFxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm9cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0TWV0aG9kTWV0YUluZm8obWV0aG9kOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCk6IGFueSB7XHJcbiAgICAgICAgbGV0IG1ldGhvZE1ldGFJbmZvID0gdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICBsZXQgY29tcG9uZW50TWV0YURhdGE6IGFueSA9ICg8TWFwcENvY2twaXRDb21wb25lbnQ+bWV0aG9kLmNvbXBvbmVudCkubWV0YURhdGE7XHJcbiAgICAgICAgaWYgKGNvbXBvbmVudE1ldGFEYXRhID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbWV0aG9kTWV0YUluZm87XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGdldCB0aGUgbWV0aG9kIGluZm8gZnJvbSBtZXRhIGRhdGFcclxuICAgICAgICBsZXQgbWV0aG9kTWV0YUl0ZW1zOiBhbnlbXSA9IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0YURhdGEuZmlsdGVyTWV0YUl0ZW1zKGNvbXBvbmVudE1ldGFEYXRhLk1ldGFDb25maWdDb21tYW5kcy5Db21tYW5kc1N0cnVjdHVyZSwgW1wiQ29tbWFuZFwiXSk7XHJcbiAgICAgICAgLy8gZ2V0IHRoZSBtZXRhIGluZm8gZm9yIHRoZSByZXF1ZXN0ZWQgbWV0aG9kXHJcbiAgICAgICAgbGV0IG1ldGhvZE1ldGFJbmZvcyA9IG1ldGhvZE1ldGFJdGVtcy5maWx0ZXIoKG1ldGhvZE1ldGFJdGVtKSA9PiB7IHJldHVybiBtZXRob2RNZXRhSXRlbS5SZWYgPT09IG1ldGhvZC5icm93c2VOYW1lOyB9KTtcclxuICAgICAgICBtZXRob2RNZXRhSW5mbyA9IG1ldGhvZE1ldGFJbmZvcy5sZW5ndGggPT09IDEgPyBtZXRob2RNZXRhSW5mb3NbMF0gOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgcmV0dXJuIG1ldGhvZE1ldGFJbmZvO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0cyB0aGUgbWV0aG9kIHBhcmFtZXRlcnMgY29udGFpbmVkIGluIHRoZSBtZXRhIGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHsqfSBtZXRob2RNZXRhSXRlbVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcn0gbWV0aG9kSW5wdXRQYXJhbWV0ZXJcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIGdldE1hdGNoaW5nTWV0aG9kUGFyYW1ldGVycyhtZXRob2RNZXRhSXRlbTogYW55LCBtZXRob2RJbnB1dFBhcmFtZXRlcjogTWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXIpIHtcclxuICAgICAgICByZXR1cm4gbWV0aG9kTWV0YUl0ZW0uUGFyYW1ldGVycy5maWx0ZXIoKG1ldGhvZE1ldGFJdGVtUGFyYW1ldGVySXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgaXNNYXRjaGluZ01ldGhvZFBhcmFtZXRlciA9IG1ldGhvZE1ldGFJdGVtUGFyYW1ldGVySXRlbS5QYXJhbWV0ZXIuUmVmID09PSBtZXRob2RJbnB1dFBhcmFtZXRlci5uYW1lXHJcbiAgICAgICAgICAgICAgICAmJiBtZXRob2RNZXRhSXRlbVBhcmFtZXRlckl0ZW0uUGFyYW1ldGVyLkRlZmF1bHRWYWx1ZVxyXG4gICAgICAgICAgICAgICAgJiYgbWV0aG9kTWV0YUl0ZW1QYXJhbWV0ZXJJdGVtLlBhcmFtZXRlci5EZWZhdWx0VmFsdWUgIT09IFwiXCI7XHJcbiAgICAgICAgICAgIHJldHVybiBpc01hdGNoaW5nTWV0aG9kUGFyYW1ldGVyO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0cmlldmVzIHRoZSBleGVjdXRhYmxlIG1ldGhvZHMgZnJvbSB0aGUgY29tcG9uZW50IG1ldGhvZCBzZXRcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kW119IGNvbXBvbmVudE1ldGhvZHNcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gZGF0YVRvUmV0cmlldmVcclxuICAgICAqIEByZXR1cm5zIHtNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFtdfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mb1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgcmV0cmlldmVFeGVjdXRhYmxlTWV0aG9kcyhjb21wb25lbnRNZXRob2RzOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFtdLCBkYXRhVG9SZXRyaWV2ZTogQXJyYXk8c3RyaW5nPik6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kW10ge1xyXG4gICAgICAgIGxldCBtZXRhQ29uZmlnID0gZGF0YVRvUmV0cmlldmVbMF07XHJcbiAgICAgICAgbGV0IG1ldGFTdHJ1Y3R1cmUgPSBkYXRhVG9SZXRyaWV2ZVsxXTtcclxuICAgICAgICBsZXQgbWV0YU5hbWUgPSBkYXRhVG9SZXRyaWV2ZVsyXTtcclxuXHJcbiAgICAgICAgbGV0IGV4ZWN1dGFibGVNZXRob2RzID0gQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRNZXRob2Q+KCk7XHJcbiAgICAgICAgaWYgKChjb21wb25lbnRNZXRob2RzWzBdID09IHVuZGVmaW5lZCkgfHxcclxuICAgICAgICAgICAgKDxhbnk+KDxNYXBwQ29ja3BpdENvbXBvbmVudD5jb21wb25lbnRNZXRob2RzWzBdLmNvbXBvbmVudCkubWV0YURhdGEpID09IHVuZGVmaW5lZCB8fFxyXG4gICAgICAgICAgICAoPGFueT4oPE1hcHBDb2NrcGl0Q29tcG9uZW50PmNvbXBvbmVudE1ldGhvZHNbMF0uY29tcG9uZW50KS5tZXRhRGF0YSlbbWV0YUNvbmZpZ10gPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBleGVjdXRhYmxlTWV0aG9kcztcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvLyBnZXQgdGhlIGNvbW1hbmRzIG1ldGEgaW5mb3NcclxuICAgICAgICBsZXQgbWV0aG9kc01ldGFJbmZvID0gKDxhbnk+KDxNYXBwQ29ja3BpdENvbXBvbmVudD5jb21wb25lbnRNZXRob2RzWzBdLmNvbXBvbmVudCkubWV0YURhdGEpW21ldGFDb25maWddW21ldGFTdHJ1Y3R1cmVdO1xyXG5cclxuICAgICAgICAvLyByZXRyaWV2ZSB0aGUgbWV0aG9kIGRlZmluaXRpb25zXHJcbiAgICAgICAgbGV0IG1ldGFNZXRob2RzID0gTWFwcENvY2twaXRDb21wb25lbnRNZXRhRGF0YS5maWx0ZXJNZXRhSXRlbXMobWV0aG9kc01ldGFJbmZvLCBbbWV0YU5hbWVdKTtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIGRpY3Rpb25hcnkgb2YgYXZhaWxhYmxlIG1ldGhvZHNcclxuICAgICAgICBsZXQgbWV0aG9kU2V0ID0ge307XHJcbiAgICAgICAgbGV0IG1ldGFNZXRob2RTZXQgPSB7fTtcclxuICAgICAgICBjb21wb25lbnRNZXRob2RzLmZvckVhY2goKG1ldGhvZCkgPT4geyBtZXRob2RTZXRbbWV0aG9kLmJyb3dzZU5hbWVdID0gbWV0aG9kIH0pO1xyXG4gICAgICAgIG1ldGFNZXRob2RzLmZvckVhY2goKG1ldGFNZXRob2QpID0+IHsgbWV0YU1ldGhvZFNldFttZXRhTWV0aG9kLlJlZl0gPSBtZXRhTWV0aG9kIH0pO1xyXG4gICAgICAgIC8vIHJldHJpZXZlIHRoZSBtZXRob2RzIHdpdGggbWF0Y2hpbmcgbmFtZSBpbiB0aGUgbWV0YSBpbmZvXHJcbiAgICAgICAgZXhlY3V0YWJsZU1ldGhvZHMgPSBtZXRhTWV0aG9kcy5maWx0ZXIoKG1ldGFNZXRob2QpID0+IHsgcmV0dXJuIG1ldGhvZFNldFttZXRhTWV0aG9kLlJlZl0gIT09IHVuZGVmaW5lZCB9KS5tYXAoKG1ldGFNZXRob2QpID0+IHsgcmV0dXJuIG1ldGhvZFNldFttZXRhTWV0aG9kLlJlZl0gfSk7XHJcblxyXG4gICAgICAgIC8vIGFzc2lnbiB0aGUgZGlzcGxheSBuYW1lXHJcbiAgICAgICAgZXhlY3V0YWJsZU1ldGhvZHMuZm9yRWFjaCgobWV0aG9kKSA9PiB7IHRoaXMudXBkYXRlTWV0aG9kRGlzcGxheU5hbWUobWV0aG9kLCBtZXRhTWV0aG9kU2V0W21ldGhvZC5icm93c2VOYW1lXSkgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBhc3NpZ24gZXhwcmVzc2lvbiB0byBldmFsdWF0ZVxyXG4gICAgICAgICAgICAgICAgZXhlY3V0YWJsZU1ldGhvZHMuZm9yRWFjaCgobWV0aG9kKSA9PiB7IHRoaXMudXBkYXRlRXhwcmVzc2lvbihtZXRob2QsIG1ldGFNZXRob2RTZXRbbWV0aG9kLmJyb3dzZU5hbWVdKSB9KVxyXG4gICAgICAgIC8vIG5vdGlmeSBpbnZhbGlkIG9yIHVua25vd24gbWV0aG9kc1xyXG4gICAgICAgIGxldCB1bmtub3duTWV0aG9kcyA9IG1ldGFNZXRob2RzLmZpbHRlcigobWV0YU1ldGhvZCkgPT4geyByZXR1cm4gbWV0aG9kU2V0W21ldGFNZXRob2QuUmVmXSA9PT0gdW5kZWZpbmVkIH0pO1xyXG4gICAgICAgIGlmICh1bmtub3duTWV0aG9kcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm8ucmV0cmlldmVFeGVjdXRhYmxlTWV0aG9kcyA6IG1ldGEgaW5mbyByZWZlcmVuY2VzIHVua25vd24gbWV0aG9kcyAlb1wiLCB1bmtub3duTWV0aG9kcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBleGVjdXRhYmxlTWV0aG9kcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHJpZXZlcyBxdWljayBjb21tYW5kcyBtZXRob2RzIGZyb20gbWV0YUluZm9cclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kW119IGNvbXBvbmVudE1ldGhvZHNcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gZGF0YVRvUmV0cmlldmVcclxuICAgICAqIEByZXR1cm5zIHtNYXBwQ29ja3BpdFF1aWNrQ29tbWFuZFBhcmFtZXRlcltdfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mb1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgcmV0cmlldmVRdWlja0NvbW1hbmRzKGNvbXBvbmVudE1ldGhvZHM6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kW10sIGRhdGFUb1JldHJpZXZlOiBBcnJheTxzdHJpbmc+KTogTWFwcENvY2twaXRRdWlja0NvbW1hbmRQYXJhbWV0ZXJbXSB7XHJcbiAgICAgICAgbGV0IG1ldGFDb25maWcgPSBkYXRhVG9SZXRyaWV2ZVswXTtcclxuICAgICAgICBsZXQgbWV0YVN0cnVjdHVyZSA9IGRhdGFUb1JldHJpZXZlWzFdO1xyXG4gICAgICAgIGxldCBtZXRhTmFtZSA9IGRhdGFUb1JldHJpZXZlWzJdO1xyXG5cclxuICAgICAgICBsZXQgcXVpY2tDb21tYW5kcyA9IEFycmF5PE1hcHBDb2NrcGl0UXVpY2tDb21tYW5kUGFyYW1ldGVyPigpO1xyXG4gICAgICAgIGlmICgoY29tcG9uZW50TWV0aG9kc1swXSA9PSB1bmRlZmluZWQpIHx8XHJcbiAgICAgICAgICAgICg8YW55Pig8TWFwcENvY2twaXRDb21wb25lbnQ+Y29tcG9uZW50TWV0aG9kc1swXS5jb21wb25lbnQpLm1ldGFEYXRhKSA9PSB1bmRlZmluZWQgfHxcclxuICAgICAgICAgICAgKDxhbnk+KDxNYXBwQ29ja3BpdENvbXBvbmVudD5jb21wb25lbnRNZXRob2RzWzBdLmNvbXBvbmVudCkubWV0YURhdGEpW21ldGFDb25maWddID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gcXVpY2tDb21tYW5kcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGdldCB0aGUgY29tbWFuZHMgbWV0YSBpbmZvc1xyXG4gICAgICAgIGxldCBtZXRob2RzTWV0YUluZm8gPSAoPGFueT4oPE1hcHBDb2NrcGl0Q29tcG9uZW50PmNvbXBvbmVudE1ldGhvZHNbMF0uY29tcG9uZW50KS5tZXRhRGF0YSlbbWV0YUNvbmZpZ11bbWV0YVN0cnVjdHVyZV07XHJcblxyXG4gICAgICAgIC8vIHJldHJpZXZlIHRoZSBtZXRob2QgZGVmaW5pdGlvbnNcclxuICAgICAgICBsZXQgbWV0YU1ldGhvZHMgPSBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGFEYXRhLmZpbHRlck1ldGFJdGVtcyhtZXRob2RzTWV0YUluZm8sIFttZXRhTmFtZV0pO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgZGljdGlvbmFyeSBvZiBhdmFpbGFibGUgbWV0aG9kc1xyXG4gICAgICAgIGxldCBtZXRob2RTZXQgPSB7fTtcclxuXHJcbiAgICAgICAgY29tcG9uZW50TWV0aG9kcy5mb3JFYWNoKChtZXRob2QpID0+IHsgbWV0aG9kU2V0W21ldGhvZC5icm93c2VOYW1lXSA9IG1ldGhvZCB9KTtcclxuICAgICAgICBtZXRhTWV0aG9kcy5mb3JFYWNoKChtZXRhTWV0aG9kKSA9PiB7IFxyXG4gICAgICAgICAgICBxdWlja0NvbW1hbmRzLnB1c2gobmV3IE1hcHBDb2NrcGl0UXVpY2tDb21tYW5kUGFyYW1ldGVyKG1ldGFNZXRob2QuUmVmLCBtZXRhTWV0aG9kLlRvb2x0aXAsIG1ldGFNZXRob2QuSW1hZ2VOYW1lKSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIG5vdGlmeSBpbnZhbGlkIG9yIHVua25vd24gbWV0aG9kc1xyXG4gICAgICAgIGxldCB1bmtub3duTWV0aG9kcyA9IHF1aWNrQ29tbWFuZHMuZmlsdGVyKChxdWlja0NvbW1hbmQpID0+IHsgcmV0dXJuIG1ldGhvZFNldFtxdWlja0NvbW1hbmQubmFtZV0gPT09IHVuZGVmaW5lZCB9KTtcclxuICAgICAgICBpZiAodW5rbm93bk1ldGhvZHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvLnJldHJpZXZlUXVpY2tDb21tYW5kcyA6IG1ldGEgaW5mbyByZWZlcmVuY2VzIHVua25vd24gbWV0aG9kcyAlb1wiLCB1bmtub3duTWV0aG9kcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBxdWlja0NvbW1hbmRzO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyByZWFkTWV0aG9kcyhtZXRhSW5mbzogYW55LCBwcm9wZXJ0eTogQXJyYXk8c3RyaW5nPiwgbWV0aG9kOiBBcnJheTxzdHJpbmc+KTogb2JqZWN0IHtcclxuXHJcbiAgICAgICAgbGV0IG1ldGFDb25maWcgPSBwcm9wZXJ0eVswXTtcclxuICAgICAgICBsZXQgbWV0YUNvbmZpZ1N0cnVjdHVyZSA9IHByb3BlcnR5WzFdO1xyXG5cclxuICAgICAgICAvLyBnZXQgdGhlIGNvbW1hbmRzIG1ldGEgaW5mb3NcclxuICAgICAgICBpZiAobWV0YUluZm9bbWV0YUNvbmZpZ10gPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICByZXR1cm4ge307XHJcbiAgICAgICAgbGV0IG1ldGhvZHNNZXRhSW5mbyA9IG1ldGFJbmZvW21ldGFDb25maWddW21ldGFDb25maWdTdHJ1Y3R1cmVdO1xyXG5cclxuICAgICAgICAvLyByZXRyaWV2ZSB0aGUgbWV0aG9kIGRlZmluaXRpb25zXHJcbiAgICAgICAgbGV0IG1ldGFNZXRob2RzID0gTWFwcENvY2twaXRDb21wb25lbnRNZXRhRGF0YS5maWx0ZXJNZXRhSXRlbXMobWV0aG9kc01ldGFJbmZvLCBtZXRob2QpO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgZGljdGlvbmFyeSBvZiBhdmFpbGFibGUgbWV0aG9kc1xyXG4gICAgICAgIGxldCBtZXRhTWV0aG9kU2V0ID0ge307XHJcbiAgICAgICAgbWV0YU1ldGhvZHMuZm9yRWFjaCgobWV0YU1ldGhvZCkgPT4geyBtZXRhTWV0aG9kU2V0W21ldGFNZXRob2QuUmVmXSA9IG1ldGFNZXRob2QgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBtZXRhTWV0aG9kU2V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyBhIG1ldGhvZHMgZGlzcGxheSBuYW1lXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZH0gbWV0aG9kXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZzFcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mb1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgdXBkYXRlTWV0aG9kRGlzcGxheU5hbWUobWV0aG9kOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCwgbWV0YU1ldGhvZEluZm86IGFueSk6IGFueSB7XHJcbiAgICAgICAgaWYgKG1ldGFNZXRob2RJbmZvICYmIG1ldGFNZXRob2RJbmZvLkRpc3BsYXlOYW1lKSB7XHJcbiAgICAgICAgICAgIG1ldGhvZC5kaXNwbGF5TmFtZSA9IG1ldGFNZXRob2RJbmZvLkRpc3BsYXlOYW1lO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgdXBkYXRlRXhwcmVzc2lvbihtZXRob2Q6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLCBtZXRhTWV0aG9kSW5mbzogYW55KXtcclxuICAgICAgICBpZiAobWV0YU1ldGhvZEluZm8gJiYgbWV0YU1ldGhvZEluZm8uRGlzcGxheU5hbWUpIHtcclxuICAgICAgICAgICAgbWV0aG9kLmV4cHJlc3Npb24gPSBtZXRhTWV0aG9kSW5mby5FbmFibGVTdGF0ZUV4cHJlc3Npb247XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiByZWFkcyBhbmQgdXBkYXRlcyBtZXRob2QgcGFyYW1ldGVyIGVudW1zXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZH0gbWV0aG9kXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm9cclxuICAgICAqL1xyXG4gICAgc3RhdGljIHJlYWRNZXRob2RQYXJhbWV0ZXJFbnVtcyhtZXRob2Q6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLCBtZXRhRGF0YTogYW55KTogYW55IHtcclxuXHJcbiAgICAgICAgbGV0IG1ldGhvZFBhcmFtZXRlcnMgPSBtZXRob2QuaW5wdXRQYXJhbWV0ZXJzO1xyXG5cclxuICAgICAgICAvLyBnZXQgYXZhaWxhYmxlIGVudW0gbWV0aG9kIHBhcmFtZXRlciBkZWZzIFxyXG4gICAgICAgIGxldCBtZXRhTWV0aG9kUGFyYW1ldGVyRW51bVR5cGVEZWZpbml0aW9ucyA9IE1hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyLmdldEluc3RhbmNlKCkucmVhZE1ldGFFbnVtTWV0aG9kUGFyYW1ldGVyRGVmaW5pdGlvbnMobWV0aG9kLCBtZXRhRGF0YSk7XHJcblxyXG4gICAgICAgIC8vIGZpbmQgbWF0Y2hpbmcgcGFyYW1ldGVyXHJcbiAgICAgICAgbGV0IG1hdGNoaW5nTWV0aG9kUGFyYW1ldGVycyA9IG1ldGhvZFBhcmFtZXRlcnMuZmlsdGVyKChtZXRob2RQYXJhbWV0ZXIpID0+IHsgcmV0dXJuIG1ldGFNZXRob2RQYXJhbWV0ZXJFbnVtVHlwZURlZmluaXRpb25zW21ldGhvZFBhcmFtZXRlci5uYW1lXSB9KTtcclxuICAgICAgICAvLyBzZXQgdGhlIGVudW0gZGVmaW5pdGlvbnMgZm9yIHRoZSBtYXRjaGluZyBwYXJhbWV0ZXJzXHJcbiAgICAgICAgbWF0Y2hpbmdNZXRob2RQYXJhbWV0ZXJzLmZvckVhY2goKG1hdGNoaW5nTWV0aG9kUGFyYW1ldGVyKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIHNldCB0aGUgZW51bSBkZWZpbml0aW9uXHJcbiAgICAgICAgICAgIG1hdGNoaW5nTWV0aG9kUGFyYW1ldGVyLmVudW1UeXBlID0gbWV0YU1ldGhvZFBhcmFtZXRlckVudW1UeXBlRGVmaW5pdGlvbnNbbWF0Y2hpbmdNZXRob2RQYXJhbWV0ZXIubmFtZV07XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvIC0gc2V0IGVudW0gaW5mbyAlbyBmb3IgJW9cIiwgbWF0Y2hpbmdNZXRob2RQYXJhbWV0ZXIuZW51bVR5cGUsIG1ldGhvZC5icm93c2VOYW1lICsgXCIuXCIgKyBtYXRjaGluZ01ldGhvZFBhcmFtZXRlci5uYW1lKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mbywgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvIH0iXX0=