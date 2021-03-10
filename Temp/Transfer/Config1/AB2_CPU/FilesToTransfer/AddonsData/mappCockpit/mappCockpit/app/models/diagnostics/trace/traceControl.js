var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "../../online/mappCockpitComponent", "../../online/mappCockpitComponentReflection", "../../../framework/property", "../../../framework/command", "./traceDataReader", "./traceConfig/traceConfigData", "./traceConfig/traceConfigExport", "./traceConfig/traceConfigImport"], function (require, exports, mappCockpitComponent_1, mappCockpitComponentReflection_1, property_1, command_1, traceDataReader_1, traceConfigData_1, traceConfigExport_1, traceConfigImport_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Defines the browsenames of the trace control methods on the opc ua server (e.g. "Activate")
     *
     * @class TraceMethodIds
     */
    var TraceMethodIds = /** @class */ (function () {
        function TraceMethodIds() {
        }
        TraceMethodIds.Activate = "Activate";
        TraceMethodIds.ForceStop = "ForceStop";
        TraceMethodIds.ForceStart = "ForceStart";
        TraceMethodIds.SaveTraceConfig = "SaveTraceConfig";
        TraceMethodIds.Reset = "Reset";
        TraceMethodIds.RemoveDataPoint = "RemoveDataPoint";
        TraceMethodIds.RemoveStartTrigger1 = "RemoveStartTrigger1";
        TraceMethodIds.RemoveStartTrigger2 = "RemoveStartTrigger2";
        TraceMethodIds.AddDataPoint = "AddDataPoint";
        TraceMethodIds.SetStartTrigger = "SetStartTrigger";
        return TraceMethodIds;
    }());
    var TraceControl = /** @class */ (function () {
        /**
         * Creates an instance of TraceControl.
         * @param {MappCockpitDiagnosticProvider} diagnosticProvider
         * @memberof TraceControl
         */
        function TraceControl(diagnosticProvider) {
            this._diagnosticProvider = diagnosticProvider;
            this._traceDataReader = new traceDataReader_1.MappCockpitTraceDataReader(diagnosticProvider);
        }
        /**
         * Initializes the TraceControl instance
         *
         * @returns {*}
         * @memberof TraceControl
         */
        TraceControl.prototype.initialize = function (traceComponent) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this._traceComponent = traceComponent;
                    // create commands
                    this.createCommands();
                    // create the control command provider
                    this.createTraceControlProperties();
                    this.observeTraceState(this._traceComponent.mappCockpitComponent.parameters);
                    return [2 /*return*/];
                });
            });
        };
        /**
         * Creates commands exposed by trace control
         *
         * @private
         * @memberof TraceControl
         */
        TraceControl.prototype.createCommands = function () {
            this._commandActivate = command_1.Command.create(this, this.executeCommandActivate());
            this._commandForceStart = command_1.Command.create(this, this.executeCommandForceStart());
            this._commandForceStop = command_1.Command.create(this, this.executeCommandForceStop());
            this._commandSaveConfiguration = command_1.Command.create(this, this.executeCommandSaveConfiguration());
            this._commandLoadTraceData = command_1.Command.create(this, this.executeCommandLoadTraceData());
            this._commandImportTraceConfiguration = command_1.Command.create(this, this.executeCommandImportTraceConfiguration());
            this._commandExportTraceConfiguration = command_1.Command.create(this, this.executeCommandExportTraceConfiguration());
        };
        Object.defineProperty(TraceControl.prototype, "commandActivate", {
            get: function () {
                return this._commandActivate;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TraceControl.prototype, "commandForceStart", {
            get: function () {
                return this._commandForceStart;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TraceControl.prototype, "commandForceStop", {
            get: function () {
                return this._commandForceStop;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TraceControl.prototype, "commandSaveConfiguration", {
            get: function () {
                return this._commandSaveConfiguration;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TraceControl.prototype, "commandLoadTraceData", {
            get: function () {
                return this._commandLoadTraceData;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TraceControl.prototype, "commandImportTraceConfiguration", {
            get: function () {
                return this._commandImportTraceConfiguration;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TraceControl.prototype, "commandExportTraceConfiguration", {
            get: function () {
                return this._commandExportTraceConfiguration;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Processes the activate command
         *
         * @private
         * @returns {(commandDelegate: ICommandExecutionResponseDelegate<any>) => void}
         * @memberof TraceControl
         */
        TraceControl.prototype.executeCommandActivate = function () {
            var _this = this;
            return function (commandPars, commandResponse) {
                _this.transferDataToTarget()
                    .then(function () {
                    return _this.executeMethod(_this.getTraceMethod(TraceMethodIds.Activate));
                })
                    .then(function () {
                    commandResponse.executed();
                })
                    .catch(function (error) {
                    commandResponse.rejected(error);
                });
            };
        };
        /**
         * Processes the force stop command
         *
         * @private
         * @returns {ICommandExecutionDelegate<any,any>}
         * @memberof TraceControl
         */
        TraceControl.prototype.executeCommandForceStop = function () {
            var _this = this;
            return function (commandPars, commandResponse) {
                _this.executeMethod(_this.getTraceMethod(TraceMethodIds.ForceStop))
                    .then(function () {
                    commandResponse.executed();
                }).catch(function (error) {
                    commandResponse.rejected(error);
                });
                commandResponse.executed();
            };
        };
        /**
         * Processes the force start command
         *
         * @private
         * @returns {ICommandExecutionDelegate<any,any>}
         * @memberof TraceControl
         */
        TraceControl.prototype.executeCommandForceStart = function () {
            var _this = this;
            return function (commandPars, commandResponse) {
                _this.executeMethod(_this.getTraceMethod(TraceMethodIds.ForceStart))
                    .then(function () {
                    commandResponse.executed();
                })
                    .catch(function (error) {
                    commandResponse.rejected(error);
                });
            };
        };
        /**
         * Processes the save configuration command
         *
         * @private
         * @returns {ICommandExecutionDelegate<any,any>}
         * @memberof TraceControl
         */
        TraceControl.prototype.executeCommandSaveConfiguration = function () {
            var _this = this;
            return function (commandPars, commandResponse) {
                _this.transferDataToTarget()
                    .then(function () {
                    return _this.executeMethod(_this.getTraceMethod(TraceMethodIds.SaveTraceConfig));
                })
                    .then(function () {
                    commandResponse.executed();
                })
                    .catch(function (error) {
                    commandResponse.rejected(error);
                });
            };
        };
        /**
         * Implements the command for reading trace data
         *
         * @returns {*}
         * @memberof MappCockpitTraceProvider
         */
        TraceControl.prototype.executeCommandLoadTraceData = function () {
            var _this = this;
            return function (commandArguments, commandResponse) {
                _this._traceDataReader.requestLoadTraceDataFromTarget().then(function (traceData) {
                    commandResponse.executed(traceData);
                }).catch(function (error) {
                    commandResponse.rejected(error);
                });
            };
        };
        /**
         * Processes the import trace configuration command
         *
         * @private
         * @returns {ICommandExecutionDelegate<any,any>}
         * @memberof TraceControl
         */
        TraceControl.prototype.executeCommandImportTraceConfiguration = function () {
            var _this = this;
            return function (commandPars, commandResponse) {
                try {
                    _this.importTraceConfiguration(commandPars);
                }
                catch (e) {
                    console.error(e);
                }
                commandResponse.executed();
            };
        };
        /**
         * Processes the export trace configuration command
         *
         * @private
         * @returns {ICommandExecutionDelegate<any,any>}
         * @memberof TraceControl
         */
        TraceControl.prototype.executeCommandExportTraceConfiguration = function () {
            var _this = this;
            return function (commandPars, commandResponse) {
                var exportData = "";
                try {
                    exportData = _this.exportTraceConfiguration();
                }
                catch (e) {
                    console.error(e);
                }
                commandResponse.executed(exportData);
            };
        };
        /**
         * Returns the XmlData of the current trace configuration (for export)
         *
         * @private
         * @returns {string}
         * @memberof TraceControl
         */
        TraceControl.prototype.exportTraceConfiguration = function () {
            var traceConfigExport = new traceConfigExport_1.TraceConfigExport();
            return traceConfigExport.getXmlDataFromTraceConfig(this._traceComponent.traceConfigurationData);
        };
        /**
         * Imports the given xml data to the trace configuration
         *
         * @private
         * @param {string} fileData
         * @returns
         * @memberof TraceControl
         */
        TraceControl.prototype.importTraceConfiguration = function (fileData) {
            var traceConfigData = traceConfigImport_1.TraceConfigImport.getTraceConfigDataFromXml(fileData);
            if (traceConfigData != undefined) {
                this.setValuesOfTimingParameters(this._traceComponent.traceConfigurationData.timingParameters, traceConfigData.timingParameters);
                var traceConfigurationData = new traceConfigData_1.TraceConfigurationData(traceConfigData.dataPoints, this._traceComponent.traceConfigurationData.timingParameters, traceConfigData.startTriggers);
                // Update datapoint informations (e.g. axis name, description, ...)
                this._traceComponent.updateDataPointInformations(traceConfigurationData);
                // Set new trace configuration data to trace component
                this._traceComponent.traceConfigurationData = traceConfigurationData;
            }
        };
        /**
         * Sets the values of the timing parameters(from import) to the mappCockpitComponentParameters
         *
         * @private
         * @param {MappCockpitComponentParameter[]} timingParameters
         * @param {{[key: string]: string}} values
         * @memberof TraceControl
         */
        TraceControl.prototype.setValuesOfTimingParameters = function (timingParameters, values) {
            for (var i = 0; i < timingParameters.length; i++) {
                var timingParam = timingParameters[i];
                var timingParamId = traceConfigExport_1.TraceConfigExport.getTimingParamId(timingParam.browseName);
                if (timingParamId != "") {
                    var newValue = values[timingParamId];
                    timingParam.value = newValue;
                }
            }
        };
        /**
         * Creates a command provider for handling trace control commands
         *
         * @private
         * @memberof TraceControl
         */
        TraceControl.prototype.createTraceControlProperties = function () {
            this._traceState = property_1.Property.create(new mappCockpitComponent_1.MappCockpitComponentParameter(null, "DymmyPar", null));
        };
        Object.defineProperty(TraceControl.prototype, "traceState", {
            /**
             * Gets the trace state link
             *
             * @readonly
             * @type {*}
             * @memberof TraceControl
             */
            get: function () {
                return this._traceState;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Observes the trace state
         *
         * @private
         * @param {MappCockpitComponentParameter[]} parameters
         * @returns {*}
         * @memberof TraceControl
         */
        TraceControl.prototype.observeTraceState = function (parameters) {
            var _this = this;
            var traceStateParameter = parameters.filter(function (traceParameter) { return traceParameter.browseName === "TraceStatus"; })[0];
            traceStateParameter.valueSource.changed(function (newTraceStateValue) {
                _this._traceState.value = traceStateParameter;
            });
            // watch trace state changes
            this._diagnosticProvider.observeComponentModelItems(this, [traceStateParameter]);
        };
        /**
         * transfers the trace configuration data to the target (e.g. datapoints, timing parameters, triggers, ...),
         * and clears all data on target before
         *
         * @private
         * @memberof TraceControl
         */
        TraceControl.prototype.transferDataToTarget = function () {
            return __awaiter(this, void 0, void 0, function () {
                var i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < this._traceComponent.mappCockpitComponent.methods.length)) return [3 /*break*/, 4];
                            // update the methods input parameters
                            return [4 /*yield*/, mappCockpitComponent_1.MappCockpitComponentMethod.updateInputParameters(this._traceComponent.mappCockpitComponent.methods[i])];
                        case 2:
                            // update the methods input parameters
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            i++;
                            return [3 /*break*/, 1];
                        case 4: 
                        // TODO: only needed if in wrong state
                        return [4 /*yield*/, this.executeMethod(this.getTraceMethod(TraceMethodIds.Reset))];
                        case 5:
                            // TODO: only needed if in wrong state
                            _a.sent();
                            // remove all datapoints
                            return [4 /*yield*/, this.removeAllDatapoints()];
                        case 6:
                            // remove all datapoints
                            _a.sent();
                            // remove all start triggers
                            return [4 /*yield*/, this.removeAllStartTriggers()];
                        case 7:
                            // remove all start triggers
                            _a.sent();
                            // write timing parameters
                            return [4 /*yield*/, this.setTimingParameters()];
                        case 8:
                            // write timing parameters
                            _a.sent();
                            // add all datapoints
                            return [4 /*yield*/, this.addDatapoints()];
                        case 9:
                            // add all datapoints
                            _a.sent();
                            // add all start triggers
                            return [4 /*yield*/, this.addStartTriggers()];
                        case 10:
                            // add all start triggers
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Removes all trace configuration datapoints on target
         *
         * @private
         * @memberof TraceControl
         */
        TraceControl.prototype.removeAllDatapoints = function () {
            return __awaiter(this, void 0, void 0, function () {
                var datapoints, removeDataPointMethod, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            datapoints = mappCockpitComponentReflection_1.MappCockpitComponentParameterInfo.retrieveTraceConfigurationDatapoints(this._traceComponent.mappCockpitComponent.parameters);
                            return [4 /*yield*/, this._diagnosticProvider.readParameterValues(datapoints)];
                        case 1:
                            _a.sent();
                            removeDataPointMethod = this.getTraceMethod(TraceMethodIds.RemoveDataPoint);
                            if (!(removeDataPointMethod != undefined)) return [3 /*break*/, 5];
                            i = 0;
                            _a.label = 2;
                        case 2:
                            if (!(i < datapoints.length)) return [3 /*break*/, 5];
                            if (!(datapoints[i].value != "")) return [3 /*break*/, 4];
                            removeDataPointMethod.inputParameters[0].value = datapoints[i].value;
                            console.info("Remove datapoint: " + datapoints[i].value);
                            return [4 /*yield*/, this.executeMethod(removeDataPointMethod)];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            i++;
                            return [3 /*break*/, 2];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Removes all trace configuration start triggers on target
         *
         * @private
         * @memberof TraceControl
         */
        TraceControl.prototype.removeAllStartTriggers = function () {
            return __awaiter(this, void 0, void 0, function () {
                var triggerParameters, startTriggerDataPoint1, startTriggerDataPoint2, removeStartTrigger1Method, removeStartTrigger2Method;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            triggerParameters = mappCockpitComponentReflection_1.MappCockpitComponentParameterInfo.retrieveTraceConfigurationTriggerParameters(this._traceComponent.mappCockpitComponent.parameters);
                            return [4 /*yield*/, this._diagnosticProvider.readParameterValues(triggerParameters)];
                        case 1:
                            _a.sent();
                            startTriggerDataPoint1 = this.getTraceParameter("StartTrigger1_DataPoint");
                            startTriggerDataPoint2 = this.getTraceParameter("StartTrigger2_DataPoint");
                            removeStartTrigger1Method = this.getTraceMethod(TraceMethodIds.RemoveStartTrigger1);
                            removeStartTrigger2Method = this.getTraceMethod(TraceMethodIds.RemoveStartTrigger2);
                            if (!(startTriggerDataPoint2.value != "")) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.executeMethod(removeStartTrigger2Method)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            if (!(startTriggerDataPoint1.value != "")) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.executeMethod(removeStartTrigger1Method)];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Sets all timing parameters on target with the current trace configuration from mappCockpit
         *
         * @private
         * @memberof TraceControl
         */
        TraceControl.prototype.setTimingParameters = function () {
            return __awaiter(this, void 0, void 0, function () {
                var timingParameters, i, timingParameter;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            timingParameters = this._traceComponent.traceConfigurationData.timingParameters;
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < timingParameters.length)) return [3 /*break*/, 4];
                            timingParameter = timingParameters[i];
                            /*if (timingParam.displayName == "PLC task class number") {
                                // use value to avoid problems with taskclass cycle time displayValue
                                //timingParam.componentParameter.value = timingParam.value; // value not up to date currently
                                timingParam.componentParameter.value = timingParam.displayValue.substr(0, 1); // value not up to date currently
                            }
                            else {
                                timingParam.componentParameter.value = timingParam.displayValue;
                            }*/
                            return [4 /*yield*/, this._diagnosticProvider.writeParameterValue(timingParameter, timingParameter.value)];
                        case 2:
                            /*if (timingParam.displayName == "PLC task class number") {
                                // use value to avoid problems with taskclass cycle time displayValue
                                //timingParam.componentParameter.value = timingParam.value; // value not up to date currently
                                timingParam.componentParameter.value = timingParam.displayValue.substr(0, 1); // value not up to date currently
                            }
                            else {
                                timingParam.componentParameter.value = timingParam.displayValue;
                            }*/
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Sets all datapoints on target with the current trace configuration from mappCockpit
         *
         * @private
         * @memberof TraceControl
         */
        TraceControl.prototype.addDatapoints = function () {
            return __awaiter(this, void 0, void 0, function () {
                var addDataPointMethod, dataPoints, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            addDataPointMethod = this.getTraceMethod(TraceMethodIds.AddDataPoint);
                            if (!(addDataPointMethod != undefined)) return [3 /*break*/, 4];
                            dataPoints = this._traceComponent.traceConfigurationData.dataPoints;
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < dataPoints.length)) return [3 /*break*/, 4];
                            if (!(dataPoints[i].dataPointName != "")) return [3 /*break*/, 3];
                            addDataPointMethod.inputParameters[0].value = dataPoints[i].dataPointName;
                            console.info("Add datapoint: " + dataPoints[i].dataPointName);
                            return [4 /*yield*/, this.executeMethod(addDataPointMethod)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Sets all starttriggers on target with the current trace configuration from mappCockpit
         *
         * @private
         * @memberof TraceControl
         */
        TraceControl.prototype.addStartTriggers = function () {
            return __awaiter(this, void 0, void 0, function () {
                var setStartTriggerMethod, startTriggers, i, startTrigger, missingInfo;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            setStartTriggerMethod = this.getTraceMethod(TraceMethodIds.SetStartTrigger);
                            startTriggers = this._traceComponent.traceConfigurationData.startTriggers;
                            if (!(setStartTriggerMethod != undefined)) return [3 /*break*/, 4];
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < startTriggers.length)) return [3 /*break*/, 4];
                            startTrigger = startTriggers[i];
                            missingInfo = false;
                            // set setStartTrigger method input args
                            setStartTriggerMethod.inputParameters[0].value = startTrigger.condition;
                            setStartTriggerMethod.inputParameters[1].value = startTrigger.dataPointName;
                            setStartTriggerMethod.inputParameters[2].value = startTrigger.threshold;
                            setStartTriggerMethod.inputParameters[3].value = startTrigger.window;
                            if (!(missingInfo == false)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.executeMethod(setStartTriggerMethod)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Returns a trace component method for the given method id or undefined if not found
         *
         * @private
         * @param {string} methodId
         * @returns {(MappCockpitComponentMethod | undefined)}
         * @memberof TraceControl
         */
        TraceControl.prototype.getTraceMethod = function (methodId) {
            var traceComponent = this._traceComponent.mappCockpitComponent;
            for (var i = 0; i < traceComponent.methods.length; i++) {
                if (traceComponent.methods[i].browseName == methodId) {
                    return traceComponent.methods[i];
                }
            }
            console.warn("Method '" + methodId + "' not found on trace component!");
            return undefined;
        };
        /**
         * Returns a trace component parameter for the given parameter id or undefined if not found
         *
         * @private
         * @param {string} parameterId
         * @returns {(MappCockpitComponentParameter | undefined)}
         * @memberof TraceControl
         */
        TraceControl.prototype.getTraceParameter = function (parameterId) {
            var traceComponent = this._traceComponent.mappCockpitComponent;
            for (var i = 0; i < traceComponent.parameters.length; i++) {
                if (traceComponent.parameters[i].browseName == parameterId) {
                    return traceComponent.parameters[i];
                }
            }
            console.warn("Parameter '" + parameterId + "' not found on trace component!");
            return undefined;
        };
        /**
         * executes the selected method
         *
         * @private
         * @memberof TraceControl
         */
        TraceControl.prototype.executeMethod = function (method) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!method) return [3 /*break*/, 2];
                            return [4 /*yield*/, this._diagnosticProvider.executeComponentMethod(method)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        return TraceControl;
    }());
    exports.TraceControl = TraceControl;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VDb250cm9sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvZGlhZ25vc3RpY3MvdHJhY2UvdHJhY2VDb250cm9sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQVlBOzs7O09BSUc7SUFDSDtRQUFBO1FBV0EsQ0FBQztRQVZtQix1QkFBUSxHQUFHLFVBQVUsQ0FBQztRQUN0Qix3QkFBUyxHQUFHLFdBQVcsQ0FBQztRQUN4Qix5QkFBVSxHQUFHLFlBQVksQ0FBQztRQUMxQiw4QkFBZSxHQUFHLGlCQUFpQixDQUFDO1FBQ3BDLG9CQUFLLEdBQUcsT0FBTyxDQUFDO1FBQ2hCLDhCQUFlLEdBQUcsaUJBQWlCLENBQUM7UUFDcEMsa0NBQW1CLEdBQUcscUJBQXFCLENBQUM7UUFDNUMsa0NBQW1CLEdBQUcscUJBQXFCLENBQUM7UUFDNUMsMkJBQVksR0FBRyxjQUFjLENBQUM7UUFDOUIsOEJBQWUsR0FBRyxpQkFBaUIsQ0FBQztRQUN4RCxxQkFBQztLQUFBLEFBWEQsSUFXQztJQUVEO1FBZ0JJOzs7O1dBSUc7UUFDSCxzQkFBWSxrQkFBaUQ7WUFDekQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLGtCQUFrQixDQUFDO1lBQzlDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLDRDQUEwQixDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDL0UsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0csaUNBQVUsR0FBaEIsVUFBaUIsY0FBeUM7OztvQkFDdEQsSUFBSSxDQUFDLGVBQWUsR0FBRyxjQUFjLENBQUM7b0JBRXRDLGtCQUFrQjtvQkFDbEIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUN0QixzQ0FBc0M7b0JBQ3RDLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxDQUFDO29CQUVwQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxD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WUFDekMsSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxvQkFBb0IsQ0FBQztZQUMvRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsY0FBYyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3ZELElBQUksY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLElBQUksV0FBVyxFQUFFO29CQUN4RCxPQUFPLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3ZDO2FBQ0o7WUFDRCxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxXQUFXLEdBQUcsaUNBQWlDLENBQUMsQ0FBQztZQUM5RSxPQUFPLFNBQVMsQ0FBQztRQUNyQixDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDVyxvQ0FBYSxHQUEzQixVQUE0QixNQUE4Qzs7Ozs7aUNBQ2xFLE1BQU0sRUFBTix3QkFBTTs0QkFDTixxQkFBTSxJQUFJLENBQUMsbUJBQW1CLENBQUMsc0JBQXNCLENBQUMsTUFBTSxDQUFDLEVBQUE7OzRCQUE3RCxTQUE2RCxDQUFDOzs7Ozs7U0FFckU7UUFDTCxtQkFBQztJQUFELENBQUMsQUFuZ0JELElBbWdCQztJQUVRLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIsIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLCBNYXBwQ29ja3BpdENvbXBvbmVudCB9IGZyb20gXCIuLi8uLi9vbmxpbmUvbWFwcENvY2twaXRDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvIH0gZnJvbSBcIi4uLy4uL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudFJlZmxlY3Rpb25cIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXIgfSBmcm9tIFwiLi4vbWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgUHJvcGVydHkgfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL3Byb3BlcnR5XCI7XHJcbmltcG9ydCB7IENvbW1hbmQsIElDb21tYW5kRXhlY3V0aW9uRGVsZWdhdGUsIElDb21tYW5kRXhlY3V0aW9uUmVzcG9uc2VEZWxlZ2F0ZSB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvY29tbWFuZFwiO1xyXG5pbXBvcnQgeyBJVHJhY2VDb21wb25lbnRDb250cm9sIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy90cmFjZUNvbnRyb2xQcm92aWRlckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUcmFjZURhdGEsIE1hcHBDb2NrcGl0VHJhY2VEYXRhUmVhZGVyIH0gZnJvbSBcIi4vdHJhY2VEYXRhUmVhZGVyXCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0VHJhY2VDb21wb25lbnQgfSBmcm9tIFwiLi9tYXBwQ29ja3BpdFRyYWNlQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFRyYWNlQ29uZmlndXJhdGlvbkRhdGEgfSBmcm9tIFwiLi90cmFjZUNvbmZpZy90cmFjZUNvbmZpZ0RhdGFcIjtcclxuaW1wb3J0IHsgVHJhY2VDb25maWdFeHBvcnQgfSBmcm9tIFwiLi90cmFjZUNvbmZpZy90cmFjZUNvbmZpZ0V4cG9ydFwiO1xyXG5pbXBvcnQgeyBUcmFjZUNvbmZpZ0ltcG9ydCB9IGZyb20gXCIuL3RyYWNlQ29uZmlnL3RyYWNlQ29uZmlnSW1wb3J0XCI7XHJcblxyXG4vKipcclxuICogRGVmaW5lcyB0aGUgYnJvd3NlbmFtZXMgb2YgdGhlIHRyYWNlIGNvbnRyb2wgbWV0aG9kcyBvbiB0aGUgb3BjIHVhIHNlcnZlciAoZS5nLiBcIkFjdGl2YXRlXCIpXHJcbiAqXHJcbiAqIEBjbGFzcyBUcmFjZU1ldGhvZElkc1xyXG4gKi9cclxuY2xhc3MgVHJhY2VNZXRob2RJZHN7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgQWN0aXZhdGUgPSBcIkFjdGl2YXRlXCI7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgRm9yY2VTdG9wID0gXCJGb3JjZVN0b3BcIjtcclxuICAgIHN0YXRpYyByZWFkb25seSBGb3JjZVN0YXJ0ID0gXCJGb3JjZVN0YXJ0XCI7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgU2F2ZVRyYWNlQ29uZmlnID0gXCJTYXZlVHJhY2VDb25maWdcIjtcclxuICAgIHN0YXRpYyByZWFkb25seSBSZXNldCA9IFwiUmVzZXRcIjtcclxuICAgIHN0YXRpYyByZWFkb25seSBSZW1vdmVEYXRhUG9pbnQgPSBcIlJlbW92ZURhdGFQb2ludFwiO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IFJlbW92ZVN0YXJ0VHJpZ2dlcjEgPSBcIlJlbW92ZVN0YXJ0VHJpZ2dlcjFcIjtcclxuICAgIHN0YXRpYyByZWFkb25seSBSZW1vdmVTdGFydFRyaWdnZXIyID0gXCJSZW1vdmVTdGFydFRyaWdnZXIyXCI7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgQWRkRGF0YVBvaW50ID0gXCJBZGREYXRhUG9pbnRcIjtcclxuICAgIHN0YXRpYyByZWFkb25seSBTZXRTdGFydFRyaWdnZXIgPSBcIlNldFN0YXJ0VHJpZ2dlclwiO1xyXG59XHJcblxyXG5jbGFzcyBUcmFjZUNvbnRyb2wgaW1wbGVtZW50cyBJVHJhY2VDb21wb25lbnRDb250cm9se1xyXG5cclxuICAgIHByaXZhdGUgX2RpYWdub3N0aWNQcm92aWRlcjogTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXI7XHJcbiAgICBwcml2YXRlIF90cmFjZUNvbXBvbmVudCE6IE1hcHBDb2NrcGl0VHJhY2VDb21wb25lbnQ7XHJcbiAgICBwcml2YXRlIF90cmFjZVN0YXRlITogUHJvcGVydHk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+O1xyXG4gICAgcHJpdmF0ZSBfY29tbWFuZEFjdGl2YXRlITogQ29tbWFuZDxhbnksIGFueT47XHJcbiAgICBwcml2YXRlIF9jb21tYW5kRm9yY2VTdGFydCE6IENvbW1hbmQ8YW55LGFueT47XHJcbiAgICBwcml2YXRlIF9jb21tYW5kRm9yY2VTdG9wITogQ29tbWFuZDxhbnksYW55PjtcclxuICAgIHByaXZhdGUgX2NvbW1hbmRTYXZlQ29uZmlndXJhdGlvbiE6IENvbW1hbmQ8YW55LGFueT47XHJcbiAgICBwcml2YXRlIF9jb21tYW5kTG9hZFRyYWNlRGF0YSE6IENvbW1hbmQ8YW55LGFueT47XHJcbiAgICBwcml2YXRlIF9jb21tYW5kSW1wb3J0VHJhY2VDb25maWd1cmF0aW9uITogQ29tbWFuZDxhbnksYW55PjtcclxuICAgIHByaXZhdGUgX2NvbW1hbmRFeHBvcnRUcmFjZUNvbmZpZ3VyYXRpb24hOiBDb21tYW5kPGFueSxhbnk+O1xyXG5cclxuICAgIC8vIGhvbGRzIGFuIGluc3RhbmNlIG9mIGEgdHJhY2UgZGF0YSByZWFkZXJcclxuICAgIHByaXZhdGUgX3RyYWNlRGF0YVJlYWRlcjogTWFwcENvY2twaXRUcmFjZURhdGFSZWFkZXI7XHJcblxyXG4gICAgLyoqIFxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBUcmFjZUNvbnRyb2wuXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyfSBkaWFnbm9zdGljUHJvdmlkZXJcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoZGlhZ25vc3RpY1Byb3ZpZGVyOiBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlcikge1xyXG4gICAgICAgIHRoaXMuX2RpYWdub3N0aWNQcm92aWRlciA9IGRpYWdub3N0aWNQcm92aWRlcjtcclxuICAgICAgICB0aGlzLl90cmFjZURhdGFSZWFkZXIgPSBuZXcgTWFwcENvY2twaXRUcmFjZURhdGFSZWFkZXIoZGlhZ25vc3RpY1Byb3ZpZGVyKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXplcyB0aGUgVHJhY2VDb250cm9sIGluc3RhbmNlXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIGluaXRpYWxpemUodHJhY2VDb21wb25lbnQ6IE1hcHBDb2NrcGl0VHJhY2VDb21wb25lbnQpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIHRoaXMuX3RyYWNlQ29tcG9uZW50ID0gdHJhY2VDb21wb25lbnQ7XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gY3JlYXRlIGNvbW1hbmRzXHJcbiAgICAgICAgdGhpcy5jcmVhdGVDb21tYW5kcygpO1xyXG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgY29udHJvbCBjb21tYW5kIHByb3ZpZGVyXHJcbiAgICAgICAgdGhpcy5jcmVhdGVUcmFjZUNvbnRyb2xQcm9wZXJ0aWVzKCk7XHJcblxyXG4gICAgICAgIHRoaXMub2JzZXJ2ZVRyYWNlU3RhdGUodGhpcy5fdHJhY2VDb21wb25lbnQubWFwcENvY2twaXRDb21wb25lbnQucGFyYW1ldGVycyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGNvbW1hbmRzIGV4cG9zZWQgYnkgdHJhY2UgY29udHJvbFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlQ29tbWFuZHMoKSB7XHJcbiAgICAgICAgdGhpcy5fY29tbWFuZEFjdGl2YXRlID0gQ29tbWFuZC5jcmVhdGUodGhpcywgdGhpcy5leGVjdXRlQ29tbWFuZEFjdGl2YXRlKCkpO1xyXG4gICAgICAgIHRoaXMuX2NvbW1hbmRGb3JjZVN0YXJ0ID0gQ29tbWFuZC5jcmVhdGUodGhpcywgdGhpcy5leGVjdXRlQ29tbWFuZEZvcmNlU3RhcnQoKSk7XHJcbiAgICAgICAgdGhpcy5fY29tbWFuZEZvcmNlU3RvcCA9IENvbW1hbmQuY3JlYXRlKHRoaXMsIHRoaXMuZXhlY3V0ZUNvbW1hbmRGb3JjZVN0b3AoKSk7XHJcbiAgICAgICAgdGhpcy5fY29tbWFuZFNhdmVDb25maWd1cmF0aW9uID0gQ29tbWFuZC5jcmVhdGUodGhpcywgdGhpcy5leGVjdXRlQ29tbWFuZFNhdmVDb25maWd1cmF0aW9uKCkpO1xyXG4gICAgICAgIHRoaXMuX2NvbW1hbmRMb2FkVHJhY2VEYXRhID0gQ29tbWFuZC5jcmVhdGUodGhpcywgdGhpcy5leGVjdXRlQ29tbWFuZExvYWRUcmFjZURhdGEoKSk7XHJcbiAgICAgICAgdGhpcy5fY29tbWFuZEltcG9ydFRyYWNlQ29uZmlndXJhdGlvbiA9IENvbW1hbmQuY3JlYXRlKHRoaXMsIHRoaXMuZXhlY3V0ZUNvbW1hbmRJbXBvcnRUcmFjZUNvbmZpZ3VyYXRpb24oKSk7XHJcbiAgICAgICAgdGhpcy5fY29tbWFuZEV4cG9ydFRyYWNlQ29uZmlndXJhdGlvbiA9IENvbW1hbmQuY3JlYXRlKHRoaXMsIHRoaXMuZXhlY3V0ZUNvbW1hbmRFeHBvcnRUcmFjZUNvbmZpZ3VyYXRpb24oKSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBnZXQgY29tbWFuZEFjdGl2YXRlKCkgOiBDb21tYW5kPGFueSxhbnk+IHsgXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbW1hbmRBY3RpdmF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvbW1hbmRGb3JjZVN0YXJ0KCkgOiBDb21tYW5kPGFueSxhbnk+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29tbWFuZEZvcmNlU3RhcnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjb21tYW5kRm9yY2VTdG9wKCkgOiBDb21tYW5kPGFueSxhbnk+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29tbWFuZEZvcmNlU3RvcDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvbW1hbmRTYXZlQ29uZmlndXJhdGlvbigpIDogQ29tbWFuZDxhbnksYW55PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbW1hbmRTYXZlQ29uZmlndXJhdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvbW1hbmRMb2FkVHJhY2VEYXRhKCkgOiBDb21tYW5kPGFueSxhbnk+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29tbWFuZExvYWRUcmFjZURhdGE7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBnZXQgY29tbWFuZEltcG9ydFRyYWNlQ29uZmlndXJhdGlvbigpIDogQ29tbWFuZDxhbnksYW55PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbW1hbmRJbXBvcnRUcmFjZUNvbmZpZ3VyYXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjb21tYW5kRXhwb3J0VHJhY2VDb25maWd1cmF0aW9uKCkgOiBDb21tYW5kPGFueSxhbnk+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29tbWFuZEV4cG9ydFRyYWNlQ29uZmlndXJhdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFByb2Nlc3NlcyB0aGUgYWN0aXZhdGUgY29tbWFuZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7KGNvbW1hbmREZWxlZ2F0ZTogSUNvbW1hbmRFeGVjdXRpb25SZXNwb25zZURlbGVnYXRlPGFueT4pID0+IHZvaWR9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZXhlY3V0ZUNvbW1hbmRBY3RpdmF0ZSgpOiBJQ29tbWFuZEV4ZWN1dGlvbkRlbGVnYXRlPGFueSxhbnk+IHtcclxuICAgICAgICByZXR1cm4gKGNvbW1hbmRQYXJzLGNvbW1hbmRSZXNwb25zZSkgPT4geyBcclxuXHJcbiAgICAgICAgICAgIHRoaXMudHJhbnNmZXJEYXRhVG9UYXJnZXQoKVxyXG4gICAgICAgICAgICAudGhlbigoKT0+e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY3V0ZU1ldGhvZCh0aGlzLmdldFRyYWNlTWV0aG9kKFRyYWNlTWV0aG9kSWRzLkFjdGl2YXRlKSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKCgpPT57XHJcbiAgICAgICAgICAgICAgICBjb21tYW5kUmVzcG9uc2UuZXhlY3V0ZWQoKTsgXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpPT57XHJcbiAgICAgICAgICAgICAgICBjb21tYW5kUmVzcG9uc2UucmVqZWN0ZWQoZXJyb3IpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJvY2Vzc2VzIHRoZSBmb3JjZSBzdG9wIGNvbW1hbmRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge0lDb21tYW5kRXhlY3V0aW9uRGVsZWdhdGU8YW55LGFueT59XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZXhlY3V0ZUNvbW1hbmRGb3JjZVN0b3AoKTogSUNvbW1hbmRFeGVjdXRpb25EZWxlZ2F0ZTxhbnksYW55PiB7XHJcbiAgICAgICAgcmV0dXJuIChjb21tYW5kUGFyczphbnksY29tbWFuZFJlc3BvbnNlKSA9PiB7IFxyXG4gICAgICAgICAgICB0aGlzLmV4ZWN1dGVNZXRob2QodGhpcy5nZXRUcmFjZU1ldGhvZChUcmFjZU1ldGhvZElkcy5Gb3JjZVN0b3ApKVxyXG4gICAgICAgICAgICAudGhlbigoKT0+e1xyXG4gICAgICAgICAgICAgICAgY29tbWFuZFJlc3BvbnNlLmV4ZWN1dGVkKCk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKChlcnJvcik9PntcclxuICAgICAgICAgICAgICAgIGNvbW1hbmRSZXNwb25zZS5yZWplY3RlZChlcnJvcik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb21tYW5kUmVzcG9uc2UuZXhlY3V0ZWQoKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJvY2Vzc2VzIHRoZSBmb3JjZSBzdGFydCBjb21tYW5kXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHtJQ29tbWFuZEV4ZWN1dGlvbkRlbGVnYXRlPGFueSxhbnk+fVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGV4ZWN1dGVDb21tYW5kRm9yY2VTdGFydCgpOiAgSUNvbW1hbmRFeGVjdXRpb25EZWxlZ2F0ZTxhbnksYW55PiB7XHJcbiAgICAgICAgcmV0dXJuIChjb21tYW5kUGFyczphbnksY29tbWFuZFJlc3BvbnNlKSA9PiB7IFxyXG4gICAgICAgICAgICB0aGlzLmV4ZWN1dGVNZXRob2QodGhpcy5nZXRUcmFjZU1ldGhvZChUcmFjZU1ldGhvZElkcy5Gb3JjZVN0YXJ0KSlcclxuICAgICAgICAgICAgLnRoZW4oKCk9PntcclxuICAgICAgICAgICAgICAgIGNvbW1hbmRSZXNwb25zZS5leGVjdXRlZCgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9yKT0+e1xyXG4gICAgICAgICAgICAgICAgY29tbWFuZFJlc3BvbnNlLnJlamVjdGVkKGVycm9yKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICBcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJvY2Vzc2VzIHRoZSBzYXZlIGNvbmZpZ3VyYXRpb24gY29tbWFuZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7SUNvbW1hbmRFeGVjdXRpb25EZWxlZ2F0ZTxhbnksYW55Pn1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBleGVjdXRlQ29tbWFuZFNhdmVDb25maWd1cmF0aW9uKCk6IElDb21tYW5kRXhlY3V0aW9uRGVsZWdhdGU8YW55LGFueT4ge1xyXG4gICAgICAgIHJldHVybiAoY29tbWFuZFBhcnM6YW55LGNvbW1hbmRSZXNwb25zZSkgPT4geyBcclxuICAgICAgICAgICAgdGhpcy50cmFuc2ZlckRhdGFUb1RhcmdldCgpXHJcbiAgICAgICAgICAgIC50aGVuKCgpPT57XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlTWV0aG9kKHRoaXMuZ2V0VHJhY2VNZXRob2QoVHJhY2VNZXRob2RJZHMuU2F2ZVRyYWNlQ29uZmlnKSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKCgpPT57XHJcbiAgICAgICAgICAgICAgICBjb21tYW5kUmVzcG9uc2UuZXhlY3V0ZWQoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcik9PntcclxuICAgICAgICAgICAgICAgIGNvbW1hbmRSZXNwb25zZS5yZWplY3RlZChlcnJvcik7XHJcbiAgICAgICAgICAgIH0pOyBcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW1wbGVtZW50cyB0aGUgY29tbWFuZCBmb3IgcmVhZGluZyB0cmFjZSBkYXRhXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRUcmFjZVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZXhlY3V0ZUNvbW1hbmRMb2FkVHJhY2VEYXRhKCk6IElDb21tYW5kRXhlY3V0aW9uRGVsZWdhdGU8YW55LFRyYWNlRGF0YT4ge1xyXG4gICAgICAgIHJldHVybiAoY29tbWFuZEFyZ3VtZW50czphbnksY29tbWFuZFJlc3BvbnNlOiBJQ29tbWFuZEV4ZWN1dGlvblJlc3BvbnNlRGVsZWdhdGU8VHJhY2VEYXRhPikgPT4gIHtcclxuICAgICAgICAgICAgdGhpcy5fdHJhY2VEYXRhUmVhZGVyLnJlcXVlc3RMb2FkVHJhY2VEYXRhRnJvbVRhcmdldCgpLnRoZW4oKHRyYWNlRGF0YSk9PntcclxuICAgICAgICAgICAgICAgIGNvbW1hbmRSZXNwb25zZS5leGVjdXRlZCh0cmFjZURhdGEpO1xyXG4gICAgICAgICAgICB9KS5jYXRjaCgoZXJyb3IpPT57XHJcbiAgICAgICAgICAgICAgICBjb21tYW5kUmVzcG9uc2UucmVqZWN0ZWQoZXJyb3IpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9OyAgIFxyXG4gICAgfSAgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQcm9jZXNzZXMgdGhlIGltcG9ydCB0cmFjZSBjb25maWd1cmF0aW9uIGNvbW1hbmRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge0lDb21tYW5kRXhlY3V0aW9uRGVsZWdhdGU8YW55LGFueT59XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZXhlY3V0ZUNvbW1hbmRJbXBvcnRUcmFjZUNvbmZpZ3VyYXRpb24oKTogSUNvbW1hbmRFeGVjdXRpb25EZWxlZ2F0ZTxhbnksYW55PiB7XHJcbiAgICAgICAgcmV0dXJuIChjb21tYW5kUGFyczphbnksY29tbWFuZFJlc3BvbnNlKSA9PiB7IFxyXG4gICAgICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmltcG9ydFRyYWNlQ29uZmlndXJhdGlvbihjb21tYW5kUGFycyk7IFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoKGUpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb21tYW5kUmVzcG9uc2UuZXhlY3V0ZWQoKTtcclxuICAgICAgICB9O1xyXG4gICAgfSBcclxuXHJcbiAgICAvKipcclxuICAgICAqIFByb2Nlc3NlcyB0aGUgZXhwb3J0IHRyYWNlIGNvbmZpZ3VyYXRpb24gY29tbWFuZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7SUNvbW1hbmRFeGVjdXRpb25EZWxlZ2F0ZTxhbnksYW55Pn1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBleGVjdXRlQ29tbWFuZEV4cG9ydFRyYWNlQ29uZmlndXJhdGlvbigpOiBJQ29tbWFuZEV4ZWN1dGlvbkRlbGVnYXRlPGFueSxhbnk+IHtcclxuICAgICAgICByZXR1cm4gKGNvbW1hbmRQYXJzOmFueSxjb21tYW5kUmVzcG9uc2U6IElDb21tYW5kRXhlY3V0aW9uUmVzcG9uc2VEZWxlZ2F0ZTxzdHJpbmc+KSA9PiB7IFxyXG4gICAgICAgICAgICBsZXQgZXhwb3J0RGF0YTogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICAgICAgZXhwb3J0RGF0YSA9IHRoaXMuZXhwb3J0VHJhY2VDb25maWd1cmF0aW9uKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2goZSl7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbW1hbmRSZXNwb25zZS5leGVjdXRlZChleHBvcnREYXRhKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgWG1sRGF0YSBvZiB0aGUgY3VycmVudCB0cmFjZSBjb25maWd1cmF0aW9uIChmb3IgZXhwb3J0KVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGV4cG9ydFRyYWNlQ29uZmlndXJhdGlvbigpOiBzdHJpbmd7XHJcbiAgICAgICAgbGV0IHRyYWNlQ29uZmlnRXhwb3J0ID0gbmV3IFRyYWNlQ29uZmlnRXhwb3J0KCk7XHJcbiAgICAgICAgcmV0dXJuIHRyYWNlQ29uZmlnRXhwb3J0LmdldFhtbERhdGFGcm9tVHJhY2VDb25maWcodGhpcy5fdHJhY2VDb21wb25lbnQudHJhY2VDb25maWd1cmF0aW9uRGF0YSk7ICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW1wb3J0cyB0aGUgZ2l2ZW4geG1sIGRhdGEgdG8gdGhlIHRyYWNlIGNvbmZpZ3VyYXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZpbGVEYXRhXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGltcG9ydFRyYWNlQ29uZmlndXJhdGlvbihmaWxlRGF0YTogc3RyaW5nKXtcclxuICAgICAgICBsZXQgdHJhY2VDb25maWdEYXRhID0gVHJhY2VDb25maWdJbXBvcnQuZ2V0VHJhY2VDb25maWdEYXRhRnJvbVhtbChmaWxlRGF0YSk7XHJcbiAgICAgICAgaWYodHJhY2VDb25maWdEYXRhICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVzT2ZUaW1pbmdQYXJhbWV0ZXJzKHRoaXMuX3RyYWNlQ29tcG9uZW50LnRyYWNlQ29uZmlndXJhdGlvbkRhdGEudGltaW5nUGFyYW1ldGVycywgdHJhY2VDb25maWdEYXRhLnRpbWluZ1BhcmFtZXRlcnMpO1xyXG4gICAgICAgICAgICBsZXQgdHJhY2VDb25maWd1cmF0aW9uRGF0YSA9IG5ldyBUcmFjZUNvbmZpZ3VyYXRpb25EYXRhKHRyYWNlQ29uZmlnRGF0YS5kYXRhUG9pbnRzLCB0aGlzLl90cmFjZUNvbXBvbmVudC50cmFjZUNvbmZpZ3VyYXRpb25EYXRhLnRpbWluZ1BhcmFtZXRlcnMsIHRyYWNlQ29uZmlnRGF0YS5zdGFydFRyaWdnZXJzKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIFVwZGF0ZSBkYXRhcG9pbnQgaW5mb3JtYXRpb25zIChlLmcuIGF4aXMgbmFtZSwgZGVzY3JpcHRpb24sIC4uLilcclxuICAgICAgICAgICAgdGhpcy5fdHJhY2VDb21wb25lbnQudXBkYXRlRGF0YVBvaW50SW5mb3JtYXRpb25zKHRyYWNlQ29uZmlndXJhdGlvbkRhdGEpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gU2V0IG5ldyB0cmFjZSBjb25maWd1cmF0aW9uIGRhdGEgdG8gdHJhY2UgY29tcG9uZW50XHJcbiAgICAgICAgICAgIHRoaXMuX3RyYWNlQ29tcG9uZW50LnRyYWNlQ29uZmlndXJhdGlvbkRhdGEgPSB0cmFjZUNvbmZpZ3VyYXRpb25EYXRhO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHZhbHVlcyBvZiB0aGUgdGltaW5nIHBhcmFtZXRlcnMoZnJvbSBpbXBvcnQpIHRvIHRoZSBtYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcnNcclxuICAgICAqIFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gdGltaW5nUGFyYW1ldGVyc1xyXG4gICAgICogQHBhcmFtIHt7W2tleTogc3RyaW5nXTogc3RyaW5nfX0gdmFsdWVzXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0VmFsdWVzT2ZUaW1pbmdQYXJhbWV0ZXJzKHRpbWluZ1BhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10sIHZhbHVlczoge1trZXk6IHN0cmluZ106IHN0cmluZ30pe1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aW1pbmdQYXJhbWV0ZXJzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IHRpbWluZ1BhcmFtID0gdGltaW5nUGFyYW1ldGVyc1tpXTtcclxuICAgICAgICAgICAgbGV0IHRpbWluZ1BhcmFtSWQgPSBUcmFjZUNvbmZpZ0V4cG9ydC5nZXRUaW1pbmdQYXJhbUlkKHRpbWluZ1BhcmFtLmJyb3dzZU5hbWUpO1xyXG4gICAgICAgICAgICBpZih0aW1pbmdQYXJhbUlkICE9IFwiXCIpe1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld1ZhbHVlID0gdmFsdWVzW3RpbWluZ1BhcmFtSWRdO1xyXG4gICAgICAgICAgICAgICAgdGltaW5nUGFyYW0udmFsdWUgPSBuZXdWYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgY29tbWFuZCBwcm92aWRlciBmb3IgaGFuZGxpbmcgdHJhY2UgY29udHJvbCBjb21tYW5kc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlVHJhY2VDb250cm9sUHJvcGVydGllcygpIHtcclxuICAgICAgICB0aGlzLl90cmFjZVN0YXRlID0gUHJvcGVydHkuY3JlYXRlPE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPihuZXcgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIobnVsbCxcIkR5bW15UGFyXCIsbnVsbCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgdHJhY2Ugc3RhdGUgbGlua1xyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgdHJhY2VTdGF0ZSgpOiBQcm9wZXJ0eTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90cmFjZVN0YXRlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT2JzZXJ2ZXMgdGhlIHRyYWNlIHN0YXRlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gcGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb2JzZXJ2ZVRyYWNlU3RhdGUocGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSk6IGFueSB7XHJcbiAgICAgICAgbGV0IHRyYWNlU3RhdGVQYXJhbWV0ZXIgPSBwYXJhbWV0ZXJzLmZpbHRlcigodHJhY2VQYXJhbWV0ZXIpID0+IHsgcmV0dXJuIHRyYWNlUGFyYW1ldGVyLmJyb3dzZU5hbWUgPT09IFwiVHJhY2VTdGF0dXNcIiB9KVswXTtcclxuXHJcbiAgICAgICAgdHJhY2VTdGF0ZVBhcmFtZXRlci52YWx1ZVNvdXJjZS5jaGFuZ2VkKChuZXdUcmFjZVN0YXRlVmFsdWUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fdHJhY2VTdGF0ZS52YWx1ZSA9IHRyYWNlU3RhdGVQYXJhbWV0ZXI7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIHdhdGNoIHRyYWNlIHN0YXRlIGNoYW5nZXNcclxuICAgICAgICB0aGlzLl9kaWFnbm9zdGljUHJvdmlkZXIub2JzZXJ2ZUNvbXBvbmVudE1vZGVsSXRlbXModGhpcywgW3RyYWNlU3RhdGVQYXJhbWV0ZXJdKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHRyYW5zZmVycyB0aGUgdHJhY2UgY29uZmlndXJhdGlvbiBkYXRhIHRvIHRoZSB0YXJnZXQgKGUuZy4gZGF0YXBvaW50cywgdGltaW5nIHBhcmFtZXRlcnMsIHRyaWdnZXJzLCAuLi4pLFxyXG4gICAgICogYW5kIGNsZWFycyBhbGwgZGF0YSBvbiB0YXJnZXQgYmVmb3JlIFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgdHJhbnNmZXJEYXRhVG9UYXJnZXQoKSB7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGkgPCB0aGlzLl90cmFjZUNvbXBvbmVudC5tYXBwQ29ja3BpdENvbXBvbmVudC5tZXRob2RzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSBtZXRob2RzIGlucHV0IHBhcmFtZXRlcnNcclxuICAgICAgICAgICAgYXdhaXQgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QudXBkYXRlSW5wdXRQYXJhbWV0ZXJzKHRoaXMuX3RyYWNlQ29tcG9uZW50Lm1hcHBDb2NrcGl0Q29tcG9uZW50Lm1ldGhvZHNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBUT0RPOiBvbmx5IG5lZWRlZCBpZiBpbiB3cm9uZyBzdGF0ZVxyXG4gICAgICAgIGF3YWl0IHRoaXMuZXhlY3V0ZU1ldGhvZCh0aGlzLmdldFRyYWNlTWV0aG9kKFRyYWNlTWV0aG9kSWRzLlJlc2V0KSk7XHJcblxyXG4gICAgICAgIC8vIHJlbW92ZSBhbGwgZGF0YXBvaW50c1xyXG4gICAgICAgIGF3YWl0IHRoaXMucmVtb3ZlQWxsRGF0YXBvaW50cygpO1xyXG4gICAgICAgIC8vIHJlbW92ZSBhbGwgc3RhcnQgdHJpZ2dlcnNcclxuICAgICAgICBhd2FpdCB0aGlzLnJlbW92ZUFsbFN0YXJ0VHJpZ2dlcnMoKTtcclxuXHJcbiAgICAgICAgLy8gd3JpdGUgdGltaW5nIHBhcmFtZXRlcnNcclxuICAgICAgICBhd2FpdCB0aGlzLnNldFRpbWluZ1BhcmFtZXRlcnMoKTtcclxuXHJcbiAgICAgICAgLy8gYWRkIGFsbCBkYXRhcG9pbnRzXHJcbiAgICAgICAgYXdhaXQgdGhpcy5hZGREYXRhcG9pbnRzKCk7XHJcbiAgICAgICAgLy8gYWRkIGFsbCBzdGFydCB0cmlnZ2Vyc1xyXG4gICAgICAgIGF3YWl0IHRoaXMuYWRkU3RhcnRUcmlnZ2VycygpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgYWxsIHRyYWNlIGNvbmZpZ3VyYXRpb24gZGF0YXBvaW50cyBvbiB0YXJnZXQgXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyByZW1vdmVBbGxEYXRhcG9pbnRzKCkge1xyXG4gICAgICAgIGxldCBkYXRhcG9pbnRzID0gTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvLnJldHJpZXZlVHJhY2VDb25maWd1cmF0aW9uRGF0YXBvaW50cyh0aGlzLl90cmFjZUNvbXBvbmVudC5tYXBwQ29ja3BpdENvbXBvbmVudC5wYXJhbWV0ZXJzKTtcclxuICAgICAgICBhd2FpdCB0aGlzLl9kaWFnbm9zdGljUHJvdmlkZXIucmVhZFBhcmFtZXRlclZhbHVlcyhkYXRhcG9pbnRzKTtcclxuXHJcbiAgICAgICAgbGV0IHJlbW92ZURhdGFQb2ludE1ldGhvZCA9IHRoaXMuZ2V0VHJhY2VNZXRob2QoVHJhY2VNZXRob2RJZHMuUmVtb3ZlRGF0YVBvaW50KTtcclxuICAgICAgICBpZiAocmVtb3ZlRGF0YVBvaW50TWV0aG9kICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGFwb2ludHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhcG9pbnRzW2ldLnZhbHVlICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZW1vdmVEYXRhUG9pbnRNZXRob2QuaW5wdXRQYXJhbWV0ZXJzWzBdLnZhbHVlID0gZGF0YXBvaW50c1tpXS52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oXCJSZW1vdmUgZGF0YXBvaW50OiBcIiArIGRhdGFwb2ludHNbaV0udmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuZXhlY3V0ZU1ldGhvZChyZW1vdmVEYXRhUG9pbnRNZXRob2QpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyBhbGwgdHJhY2UgY29uZmlndXJhdGlvbiBzdGFydCB0cmlnZ2VycyBvbiB0YXJnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIHJlbW92ZUFsbFN0YXJ0VHJpZ2dlcnMoKSB7XHJcbiAgICAgICAgbGV0IHRyaWdnZXJQYXJhbWV0ZXJzID0gTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvLnJldHJpZXZlVHJhY2VDb25maWd1cmF0aW9uVHJpZ2dlclBhcmFtZXRlcnModGhpcy5fdHJhY2VDb21wb25lbnQubWFwcENvY2twaXRDb21wb25lbnQucGFyYW1ldGVycyk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5fZGlhZ25vc3RpY1Byb3ZpZGVyLnJlYWRQYXJhbWV0ZXJWYWx1ZXModHJpZ2dlclBhcmFtZXRlcnMpO1xyXG5cclxuICAgICAgICBsZXQgc3RhcnRUcmlnZ2VyRGF0YVBvaW50MSA9IHRoaXMuZ2V0VHJhY2VQYXJhbWV0ZXIoXCJTdGFydFRyaWdnZXIxX0RhdGFQb2ludFwiKTtcclxuICAgICAgICBsZXQgc3RhcnRUcmlnZ2VyRGF0YVBvaW50MiA9IHRoaXMuZ2V0VHJhY2VQYXJhbWV0ZXIoXCJTdGFydFRyaWdnZXIyX0RhdGFQb2ludFwiKTtcclxuXHJcbiAgICAgICAgbGV0IHJlbW92ZVN0YXJ0VHJpZ2dlcjFNZXRob2QgPSB0aGlzLmdldFRyYWNlTWV0aG9kKFRyYWNlTWV0aG9kSWRzLlJlbW92ZVN0YXJ0VHJpZ2dlcjEpO1xyXG4gICAgICAgIGxldCByZW1vdmVTdGFydFRyaWdnZXIyTWV0aG9kID0gdGhpcy5nZXRUcmFjZU1ldGhvZChUcmFjZU1ldGhvZElkcy5SZW1vdmVTdGFydFRyaWdnZXIyKTtcclxuXHJcbiAgICAgICAgLy8gb25seSBkZWxldGUgaWYgc3RhcnR0cmlnZ2VyIGlmIGRlZmluZWQoZGF0YXBvaW50IGlzIGRlZmluZWQpXHJcbiAgICAgICAgaWYgKHN0YXJ0VHJpZ2dlckRhdGFQb2ludDIhLnZhbHVlICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5leGVjdXRlTWV0aG9kKHJlbW92ZVN0YXJ0VHJpZ2dlcjJNZXRob2QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc3RhcnRUcmlnZ2VyRGF0YVBvaW50MSEudmFsdWUgIT0gXCJcIikge1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmV4ZWN1dGVNZXRob2QocmVtb3ZlU3RhcnRUcmlnZ2VyMU1ldGhvZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyBhbGwgdGltaW5nIHBhcmFtZXRlcnMgb24gdGFyZ2V0IHdpdGggdGhlIGN1cnJlbnQgdHJhY2UgY29uZmlndXJhdGlvbiBmcm9tIG1hcHBDb2NrcGl0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBzZXRUaW1pbmdQYXJhbWV0ZXJzKCkge1xyXG4gICAgICAgIGxldCB0aW1pbmdQYXJhbWV0ZXJzID0gdGhpcy5fdHJhY2VDb21wb25lbnQudHJhY2VDb25maWd1cmF0aW9uRGF0YSEudGltaW5nUGFyYW1ldGVycztcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRpbWluZ1BhcmFtZXRlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHRpbWluZ1BhcmFtZXRlciA9IHRpbWluZ1BhcmFtZXRlcnNbaV07XHJcbiAgICAgICAgICAgIC8qaWYgKHRpbWluZ1BhcmFtLmRpc3BsYXlOYW1lID09IFwiUExDIHRhc2sgY2xhc3MgbnVtYmVyXCIpIHtcclxuICAgICAgICAgICAgICAgIC8vIHVzZSB2YWx1ZSB0byBhdm9pZCBwcm9ibGVtcyB3aXRoIHRhc2tjbGFzcyBjeWNsZSB0aW1lIGRpc3BsYXlWYWx1ZVxyXG4gICAgICAgICAgICAgICAgLy90aW1pbmdQYXJhbS5jb21wb25lbnRQYXJhbWV0ZXIudmFsdWUgPSB0aW1pbmdQYXJhbS52YWx1ZTsgLy8gdmFsdWUgbm90IHVwIHRvIGRhdGUgY3VycmVudGx5XHJcbiAgICAgICAgICAgICAgICB0aW1pbmdQYXJhbS5jb21wb25lbnRQYXJhbWV0ZXIudmFsdWUgPSB0aW1pbmdQYXJhbS5kaXNwbGF5VmFsdWUuc3Vic3RyKDAsIDEpOyAvLyB2YWx1ZSBub3QgdXAgdG8gZGF0ZSBjdXJyZW50bHlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRpbWluZ1BhcmFtLmNvbXBvbmVudFBhcmFtZXRlci52YWx1ZSA9IHRpbWluZ1BhcmFtLmRpc3BsYXlWYWx1ZTtcclxuICAgICAgICAgICAgfSovXHJcbiAgICAgICAgICAgYXdhaXQgdGhpcy5fZGlhZ25vc3RpY1Byb3ZpZGVyLndyaXRlUGFyYW1ldGVyVmFsdWUodGltaW5nUGFyYW1ldGVyLCB0aW1pbmdQYXJhbWV0ZXIudmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgYWxsIGRhdGFwb2ludHMgb24gdGFyZ2V0IHdpdGggdGhlIGN1cnJlbnQgdHJhY2UgY29uZmlndXJhdGlvbiBmcm9tIG1hcHBDb2NrcGl0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBhZGREYXRhcG9pbnRzKCkge1xyXG4gICAgICAgIGxldCBhZGREYXRhUG9pbnRNZXRob2QgPSB0aGlzLmdldFRyYWNlTWV0aG9kKFRyYWNlTWV0aG9kSWRzLkFkZERhdGFQb2ludCk7XHJcbiAgICAgICAgaWYgKGFkZERhdGFQb2ludE1ldGhvZCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgbGV0IGRhdGFQb2ludHMgPSB0aGlzLl90cmFjZUNvbXBvbmVudC50cmFjZUNvbmZpZ3VyYXRpb25EYXRhIS5kYXRhUG9pbnRzO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGFQb2ludHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhUG9pbnRzW2ldLmRhdGFQb2ludE5hbWUgIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZERhdGFQb2ludE1ldGhvZC5pbnB1dFBhcmFtZXRlcnNbMF0udmFsdWUgPSBkYXRhUG9pbnRzW2ldLmRhdGFQb2ludE5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKFwiQWRkIGRhdGFwb2ludDogXCIgKyBkYXRhUG9pbnRzW2ldLmRhdGFQb2ludE5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuZXhlY3V0ZU1ldGhvZChhZGREYXRhUG9pbnRNZXRob2QpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyBhbGwgc3RhcnR0cmlnZ2VycyBvbiB0YXJnZXQgd2l0aCB0aGUgY3VycmVudCB0cmFjZSBjb25maWd1cmF0aW9uIGZyb20gbWFwcENvY2twaXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29udHJvbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGFkZFN0YXJ0VHJpZ2dlcnMoKSB7XHJcbiAgICAgICAgbGV0IHNldFN0YXJ0VHJpZ2dlck1ldGhvZCA9IHRoaXMuZ2V0VHJhY2VNZXRob2QoVHJhY2VNZXRob2RJZHMuU2V0U3RhcnRUcmlnZ2VyKTtcclxuICAgICAgICBsZXQgc3RhcnRUcmlnZ2VycyA9IHRoaXMuX3RyYWNlQ29tcG9uZW50LnRyYWNlQ29uZmlndXJhdGlvbkRhdGEhLnN0YXJ0VHJpZ2dlcnM7XHJcblxyXG4gICAgICAgIGlmIChzZXRTdGFydFRyaWdnZXJNZXRob2QgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RhcnRUcmlnZ2Vycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBsZXQgc3RhcnRUcmlnZ2VyID0gc3RhcnRUcmlnZ2Vyc1tpXTtcclxuICAgICAgICAgICAgICAgIGxldCBtaXNzaW5nSW5mbyA9IGZhbHNlOyAvLyBUT0RPOiB1c2UgbWlzc2luZyBpbmZvIGFuZCByZXBvcnQgZXJyb3IgPT4gbm8gZGF0YXBvaW50bmFtZSBkZWZpbmVkXHJcbiAgICAgICAgICAgICAgICAvLyBzZXQgc2V0U3RhcnRUcmlnZ2VyIG1ldGhvZCBpbnB1dCBhcmdzXHJcbiAgICAgICAgICAgICAgICBzZXRTdGFydFRyaWdnZXJNZXRob2QuaW5wdXRQYXJhbWV0ZXJzWzBdLnZhbHVlID0gc3RhcnRUcmlnZ2VyLmNvbmRpdGlvbjtcclxuICAgICAgICAgICAgICAgIHNldFN0YXJ0VHJpZ2dlck1ldGhvZC5pbnB1dFBhcmFtZXRlcnNbMV0udmFsdWUgPSBzdGFydFRyaWdnZXIuZGF0YVBvaW50TmFtZTtcclxuICAgICAgICAgICAgICAgIHNldFN0YXJ0VHJpZ2dlck1ldGhvZC5pbnB1dFBhcmFtZXRlcnNbMl0udmFsdWUgPSBzdGFydFRyaWdnZXIudGhyZXNob2xkO1xyXG4gICAgICAgICAgICAgICAgc2V0U3RhcnRUcmlnZ2VyTWV0aG9kLmlucHV0UGFyYW1ldGVyc1szXS52YWx1ZSA9IHN0YXJ0VHJpZ2dlci53aW5kb3c7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG1pc3NpbmdJbmZvID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5leGVjdXRlTWV0aG9kKHNldFN0YXJ0VHJpZ2dlck1ldGhvZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgdHJhY2UgY29tcG9uZW50IG1ldGhvZCBmb3IgdGhlIGdpdmVuIG1ldGhvZCBpZCBvciB1bmRlZmluZWQgaWYgbm90IGZvdW5kXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2RJZFxyXG4gICAgICogQHJldHVybnMgeyhNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCB8IHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VHJhY2VNZXRob2QobWV0aG9kSWQ6IHN0cmluZyk6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICBsZXQgdHJhY2VDb21wb25lbnQgPSB0aGlzLl90cmFjZUNvbXBvbmVudC5tYXBwQ29ja3BpdENvbXBvbmVudDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRyYWNlQ29tcG9uZW50Lm1ldGhvZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRyYWNlQ29tcG9uZW50Lm1ldGhvZHNbaV0uYnJvd3NlTmFtZSA9PSBtZXRob2RJZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRyYWNlQ29tcG9uZW50Lm1ldGhvZHNbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS53YXJuKFwiTWV0aG9kICdcIiArIG1ldGhvZElkICsgXCInIG5vdCBmb3VuZCBvbiB0cmFjZSBjb21wb25lbnQhXCIpO1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgdHJhY2UgY29tcG9uZW50IHBhcmFtZXRlciBmb3IgdGhlIGdpdmVuIHBhcmFtZXRlciBpZCBvciB1bmRlZmluZWQgaWYgbm90IGZvdW5kXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXJhbWV0ZXJJZFxyXG4gICAgICogQHJldHVybnMgeyhNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlciB8IHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb250cm9sXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VHJhY2VQYXJhbWV0ZXIocGFyYW1ldGVySWQ6IHN0cmluZyk6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICBsZXQgdHJhY2VDb21wb25lbnQgPSB0aGlzLl90cmFjZUNvbXBvbmVudC5tYXBwQ29ja3BpdENvbXBvbmVudDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRyYWNlQ29tcG9uZW50LnBhcmFtZXRlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRyYWNlQ29tcG9uZW50LnBhcmFtZXRlcnNbaV0uYnJvd3NlTmFtZSA9PSBwYXJhbWV0ZXJJZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRyYWNlQ29tcG9uZW50LnBhcmFtZXRlcnNbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS53YXJuKFwiUGFyYW1ldGVyICdcIiArIHBhcmFtZXRlcklkICsgXCInIG5vdCBmb3VuZCBvbiB0cmFjZSBjb21wb25lbnQhXCIpO1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBleGVjdXRlcyB0aGUgc2VsZWN0ZWQgbWV0aG9kXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbnRyb2xcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBleGVjdXRlTWV0aG9kKG1ldGhvZDogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QgfCB1bmRlZmluZWQpIHtcclxuICAgICAgICBpZiAobWV0aG9kKSB7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX2RpYWdub3N0aWNQcm92aWRlci5leGVjdXRlQ29tcG9uZW50TWV0aG9kKG1ldGhvZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBUcmFjZUNvbnRyb2wgfTsiXX0=