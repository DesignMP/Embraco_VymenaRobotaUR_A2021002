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
define(["require", "exports", "../../../framework/property", "./traceControl", "./traceConfig/traceConfigData", "./traceDataPoint", "./traceStartTrigger", "./traceConfig/traceConfigInfo", "../../../framework/command", "../../online/mappCockpitComponentReflection"], function (require, exports, property_1, traceControl_1, traceConfigData_1, traceDataPoint_1, traceStartTrigger_1, traceConfigInfo_1, command_1, mappCockpitComponentReflection_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Provides data for describing a trace component
     *
     * @class MappCockpitTraceComponent
     */
    var MappCockpitTraceComponent = /** @class */ (function () {
        function MappCockpitTraceComponent(diagnosticProvider, mappCockpitComponent) {
            this._initialized = false;
            this._diagnosticProvider = diagnosticProvider;
            this._mappCockpitComponent = mappCockpitComponent;
            this._traceControl = new traceControl_1.TraceControl(this._diagnosticProvider);
            this._availableTraceDataPoints = property_1.Property.create([]);
            //todo  Property.create TraceConfigurationData
            this._traceConfigurationData = new traceConfigData_1.TraceConfigurationData(new Array(), new Array(), new Array());
            this._traceConfigurationInfo = new traceConfigInfo_1.TraceConfigurationInfo(new Array(), new Array(), new Array());
            this._traceComponentParameterInterface = property_1.Property.create({
                parameters: [],
                availableTraceDataPoints: this._availableTraceDataPoints,
                traceConfigurationData: this._traceConfigurationData,
                traceConfigurationInfo: this._traceConfigurationInfo,
                commandRead: this._commandReadTraceParameters,
                commandWrite: this._commandWriteTraceParameters,
            });
            this.createCommands();
        }
        /**
         * Activates the configurated trace
         *
         * @private
         * @param {*} commandArgs
         * @memberof MappCockpitTraceComponent
         */
        MappCockpitTraceComponent.prototype.activateTrace = function (commandArgs) {
            console.log("MappCockpitTraceComponent: received Command - activate trace");
        };
        /**
         * Creates the exposed commands
         *
         * @private
         * @memberof MappCockpitTraceComponent
         */
        MappCockpitTraceComponent.prototype.createCommands = function () {
            this._commandReadTraceParameters = command_1.Command.create(this, this.executeCommandReadTraceParameters());
            this._commandWriteTraceParameters = command_1.Command.create(this, this.executeCommandWriteTraceParameters());
        };
        /**
         * Implements the command for reading the trace parameters
         *
         * @returns {*}
         * @memberof MappCockpitTraceComponent
         */
        MappCockpitTraceComponent.prototype.executeCommandReadTraceParameters = function () {
            var _this = this;
            return function (traceParameters, commandResponse) {
                var parametersToRead = traceParameters ? traceParameters : _this.mappCockpitComponent.parameters;
                _this._diagnosticProvider.readParameterValues(parametersToRead).then(function (updatedParameters) {
                    commandResponse.executed(updatedParameters);
                }).catch(function (error) {
                    commandResponse.rejected(error);
                });
            };
        };
        /**
         * Implements the command for writing the trace parameters
         *
         * @returns {*}
         * @memberof MappCockpitTraceComponent
         */
        MappCockpitTraceComponent.prototype.executeCommandWriteTraceParameters = function () {
            var _this = this;
            return function (traceParameters, commandResponse) {
                var parametersToWrite = traceParameters ? traceParameters : _this.mappCockpitComponent.parameters;
                _this._diagnosticProvider.writeParameterValues(parametersToWrite).then(function (updatedParameters) {
                    commandResponse.executed(updatedParameters);
                }).catch(function (error) {
                    commandResponse.rejected(error);
                });
            };
        };
        MappCockpitTraceComponent.prototype.initialize = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this._initialized == true) {
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.connectComponent()];
                        case 1:
                            _a.sent();
                            this._traceControl.initialize(this);
                            this._traceConfigurationInfo = new traceConfigInfo_1.TraceConfigurationInfo(mappCockpitComponentReflection_1.MappCockpitComponentParameterInfo.retrieveTraceConfigurationDatapoints(this.mappCockpitComponent.parameters), mappCockpitComponentReflection_1.MappCockpitComponentParameterInfo.retrieveTraceConfigurationTimingParameters(this.mappCockpitComponent.parameters), mappCockpitComponentReflection_1.MappCockpitComponentParameterInfo.retrieveTraceConfigurationTriggerParameters(this.mappCockpitComponent.parameters));
                            this._traceConfigurationData = this.getTraceConfigurationData(this._traceConfigurationInfo);
                            this.updateParameterInterface();
                            this._initialized = true;
                            return [2 /*return*/];
                    }
                });
            });
        };
        MappCockpitTraceComponent.prototype.updateParameterInterface = function () {
            this._traceComponentParameterInterface.value = {
                parameters: this.mappCockpitComponent.parameters,
                availableTraceDataPoints: this._availableTraceDataPoints,
                traceConfigurationData: this._traceConfigurationData,
                traceConfigurationInfo: this._traceConfigurationInfo,
                commandRead: this._commandReadTraceParameters,
                commandWrite: this._commandWriteTraceParameters,
            };
        };
        /**
         * Connects the trace component to the target and browses the methods,parameters
         *
         * @private
         * @param {MappCockpitComponent} traceComponent
         * @memberof MappCockpitTraceComponent
         */
        MappCockpitTraceComponent.prototype.connectComponent = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._diagnosticProvider.browseParameters(this._mappCockpitComponent)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this._diagnosticProvider.updateParameterDataTypes(this._mappCockpitComponent.parameters)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this._diagnosticProvider.browseMethods(this._mappCockpitComponent)];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, this._diagnosticProvider.browseMethodParameters(this._mappCockpitComponent.methods)];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, this._diagnosticProvider.readParameterValues(this._mappCockpitComponent.parameters)];
                        case 5:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        MappCockpitTraceComponent.prototype.getTraceConfigurationData = function (traceConfigurationInfo) {
            // get datapoints
            var datapoints = this.getDataPoints(traceConfigurationInfo.dataPointInfos);
            // get timing parameters
            var timingParameters = traceConfigurationInfo.timingParameterInfos;
            // get start trigger parameters
            var startTriggers = this.getStartTriggers(traceConfigurationInfo.startTriggerInfos);
            // create trace configuration data
            return new traceConfigData_1.TraceConfigurationData(datapoints, timingParameters, startTriggers);
        };
        MappCockpitTraceComponent.prototype.getDataPoints = function (datapointParameters) {
            var datapoints = new Array();
            var _loop_1 = function (datapoint) {
                if (datapoint.displayValue != "") {
                    var newDatapoint = traceDataPoint_1.TraceDataPoint.createSimpleDataPoint(datapoint.displayValue);
                    if (this_1._availableTraceDataPoints != undefined) {
                        var dataPointInfo = this_1._availableTraceDataPoints.value.filter(function (ele) { return ele.fullname == datapoint.displayValue; })[0];
                        if (dataPointInfo != undefined) {
                            newDatapoint = traceDataPoint_1.TraceDataPoint.createWithDataPointInfo(dataPointInfo);
                        }
                    }
                    datapoints.push(newDatapoint);
                }
            };
            var this_1 = this;
            for (var _i = 0, datapointParameters_1 = datapointParameters; _i < datapointParameters_1.length; _i++) {
                var datapoint = datapointParameters_1[_i];
                _loop_1(datapoint);
            }
            return datapoints;
        };
        MappCockpitTraceComponent.prototype.getStartTriggers = function (triggerParameters) {
            var startTriggers = new Array();
            var _loop_2 = function (triggerInstance) {
                var triggerInstanceId = "StartTrigger" + triggerInstance + "_";
                var dataPointNameParam = triggerParameters.filter(function (param) { return param.browseName == triggerInstanceId + "DataPoint"; })[0];
                if (dataPointNameParam != undefined) {
                    if (dataPointNameParam.value != "") { // Add no starttrigger if datapoint name is not defined
                        var startTrigger = this_2.getStartTrigger(dataPointNameParam.value, triggerInstanceId, triggerParameters);
                        startTriggers.push(startTrigger);
                    }
                }
            };
            var this_2 = this;
            for (var triggerInstance = 1; triggerInstance < 10; triggerInstance++) {
                _loop_2(triggerInstance);
            }
            return startTriggers;
        };
        MappCockpitTraceComponent.prototype.getStartTrigger = function (dataPointName, instanceId, componentParameters) {
            var condition = "";
            var conditionParam = componentParameters.filter(function (param) { return param.browseName == instanceId + "Condition"; })[0];
            if (conditionParam != undefined) {
                condition = conditionParam.value.toString();
            }
            var threshold = "";
            var thresholdParam = componentParameters.filter(function (param) { return param.browseName == instanceId + "Threshold"; })[0];
            if (thresholdParam != undefined) {
                threshold = thresholdParam.displayValue;
            }
            var triggerWindow = "";
            var triggerParam = componentParameters.filter(function (param) { return param.browseName == instanceId + "Window"; })[0];
            if (triggerParam != undefined) {
                triggerWindow = triggerParam.displayValue;
            }
            return new traceStartTrigger_1.TraceStartTrigger(condition, dataPointName, threshold, triggerWindow);
        };
        MappCockpitTraceComponent.prototype.updateDataPointInformations = function (traceConfigurationData) {
            var _this = this;
            traceConfigurationData.dataPoints.forEach(function (datapoint) {
                var dataPointInfo = _this._availableTraceDataPoints.value.filter(function (ele) { return ele.fullname == datapoint.dataPointName; })[0];
                if (dataPointInfo != undefined) {
                    var newDatapoint = traceDataPoint_1.TraceDataPoint.createWithDataPointInfo(dataPointInfo);
                    datapoint.componentName = newDatapoint.componentName;
                    datapoint.name = newDatapoint.name;
                    datapoint.description = newDatapoint.description;
                }
            });
        };
        Object.defineProperty(MappCockpitTraceComponent.prototype, "availableTraceDataPoints", {
            set: function (dataPoints) {
                this._availableTraceDataPoints = dataPoints;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitTraceComponent.prototype, "traceConfigurationData", {
            /**
             * Returns traceConfigurationData
             *
             * @readonly
             * @type {InterfaceTraceData}
             * @memberof MappCockpitTraceComponent
             */
            get: function () {
                return this._traceConfigurationData;
            },
            set: function (traceConfigurationData) {
                this._traceConfigurationData = traceConfigurationData;
                this.updateParameterInterface();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitTraceComponent.prototype, "mappCockpitComponent", {
            /**
             * Gets the MappCockpitComponent
             *
             * @readonly
             * @type {MappCockpitComponent}
             * @memberof MappCockpitTraceComponent
             */
            get: function () {
                return this._mappCockpitComponent;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitTraceComponent.prototype, "traceControlInterface", {
            /**
             * Gets the TraceControlInterface
             *
             * @readonly
             * @type {ITraceComponentControl}
             * @memberof MappCockpitTraceComponent
             */
            get: function () {
                return this._traceControl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitTraceComponent.prototype, "traceParameters", {
            /**
             * Gets the Property<ITraceComponentParameters>
             *
             * @readonly
             * @type {Property<ITraceComponentParameters>}
             * @memberof MappCockpitTraceComponent
             */
            get: function () {
                return this._traceComponentParameterInterface;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitTraceComponent.prototype, "displayName", {
            /**
             * Gets the DisplayName
             *
             * @readonly
             * @type {Property<ITraceComponentParameters>}
             * @memberof MappCockpitTraceComponent
             */
            get: function () {
                return this._mappCockpitComponent.displayName;
            },
            enumerable: true,
            configurable: true
        });
        return MappCockpitTraceComponent;
    }());
    exports.MappCockpitTraceComponent = MappCockpitTraceComponent;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcENvY2twaXRUcmFjZUNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2RpYWdub3N0aWNzL3RyYWNlL21hcHBDb2NrcGl0VHJhY2VDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBY0E7Ozs7T0FJRztJQUNIO1FBeUJJLG1DQUFtQixrQkFBaUQsRUFBRSxvQkFBMEM7WUF0QnhHLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1lBdUJ6QixJQUFJLENBQUMsbUJBQW1CLEdBQUcsa0JBQWtCLENBQUM7WUFDOUMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLG9CQUFvQixDQUFDO1lBRWxELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSwyQkFBWSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQ2hFLElBQUksQ0FBQyx5QkFBeUIsR0FBRyxtQkFBUSxDQUFDLE1BQU0sQ0FBNEIsRUFBRSxDQUFDLENBQUM7WUFDcEYsOENBQThDO1lBQzFDLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLHdDQUFzQixDQUFDLElBQUksS0FBSyxFQUFrQixFQUFFLElBQUksS0FBSyxFQUFpQyxFQUFFLElBQUksS0FBSyxFQUFxQixDQUFDLENBQUE7WUFDbEssSUFBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksd0NBQXNCLENBQUMsSUFBSSxLQUFLLEVBQWlDLEVBQUUsSUFBSSxLQUFLLEVBQWlDLEVBQUUsSUFBSSxLQUFLLEVBQWlDLENBQUMsQ0FBQTtZQUU3TCxJQUFJLENBQUMsaUNBQWlDLEdBQUcsbUJBQVEsQ0FBQyxNQUFNLENBQ3hEO2dCQUNJLFVBQVUsRUFBRSxFQUFFO2dCQUNkLHdCQUF3QixFQUFFLElBQUksQ0FBQyx5QkFBeUI7Z0JBQ3hELHNCQUFzQixFQUFFLElBQUksQ0FBQyx1QkFBdUI7Z0JB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LENBQUMsaUNBQWlDLENBQUM7WUFDbEQsQ0FBQzs7O1dBQUE7UUFTRCxzQkFBVyxrREFBVztZQVB0Qjs7Ozs7O2VBTUc7aUJBQ0g7Z0JBQ0ksT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUMsV0FBVyxDQUFDO1lBQ2xELENBQUM7OztXQUFBO1FBQ0wsZ0NBQUM7SUFBRCxDQUFDLEFBeFNELElBd1NDO0lBR08sOERBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnQsIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyIH0gZnJvbSBcIi4uLy4uL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBJVHJhY2VDb21wb25lbnRDb250cm9sIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy90cmFjZUNvbnRyb2xQcm92aWRlckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBQcm9wZXJ0eSB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvcHJvcGVydHlcIjtcclxuaW1wb3J0IHsgSVRyYWNlQ29tcG9uZW50UGFyYW1ldGVycyB9IGZyb20gXCIuL2ludGVyZmFjZXMvdHJhY2VDb21wb25lbnRQYXJhbWV0ZXJJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVHJhY2VDb250cm9sIH0gZnJvbSBcIi4vdHJhY2VDb250cm9sXCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyIH0gZnJvbSBcIi4uL21hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyXCI7XHJcbmltcG9ydCB7IFRyYWNlQ29uZmlndXJhdGlvbkRhdGEgfSBmcm9tIFwiLi90cmFjZUNvbmZpZy90cmFjZUNvbmZpZ0RhdGFcIjtcclxuaW1wb3J0IHsgVHJhY2VEYXRhUG9pbnQgfSBmcm9tIFwiLi90cmFjZURhdGFQb2ludFwiO1xyXG5pbXBvcnQgeyBUcmFjZVN0YXJ0VHJpZ2dlciB9IGZyb20gXCIuL3RyYWNlU3RhcnRUcmlnZ2VyXCI7XHJcbmltcG9ydCB7IFRyYWNlQ29uZmlndXJhdGlvbkluZm8gfSBmcm9tIFwiLi90cmFjZUNvbmZpZy90cmFjZUNvbmZpZ0luZm9cIjtcclxuaW1wb3J0IHsgVHJhY2VEYXRhUG9pbnRJbmZvIH0gZnJvbSBcIi4vdHJhY2VEYXRhUG9pbnRJbmZvXCI7XHJcbmltcG9ydCB7IENvbW1hbmQsIElDb21tYW5kRXhlY3V0aW9uRGVsZWdhdGUsIElDb21tYW5kRXhlY3V0aW9uUmVzcG9uc2VEZWxlZ2F0ZSB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvY29tbWFuZFwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm8gfSBmcm9tIFwiLi4vLi4vb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50UmVmbGVjdGlvblwiO1xyXG5cclxuLyoqXHJcbiAqIFByb3ZpZGVzIGRhdGEgZm9yIGRlc2NyaWJpbmcgYSB0cmFjZSBjb21wb25lbnRcclxuICpcclxuICogQGNsYXNzIE1hcHBDb2NrcGl0VHJhY2VDb21wb25lbnRcclxuICovXHJcbmNsYXNzIE1hcHBDb2NrcGl0VHJhY2VDb21wb25lbnR7XHJcblxyXG5cclxuICAgIHByaXZhdGUgX2luaXRpYWxpemVkID0gZmFsc2U7XHJcblxyXG4gICAgLy8gUmVmZXJlbmNlcyB0aGUgZGlhZ25vc3RpYyBwcm92aWRlclxyXG4gICAgcHJpdmF0ZSBfZGlhZ25vc3RpY1Byb3ZpZGVyOiBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlcjtcclxuXHJcbiAgICBwcml2YXRlIF9tYXBwQ29ja3BpdENvbXBvbmVudDogTWFwcENvY2twaXRDb21wb25lbnQ7XHJcbiAgICBwcml2YXRlIF90cmFjZUNvbXBvbmVudFBhcmFtZXRlckludGVyZmFjZTogUHJvcGVydHk8SVRyYWNlQ29tcG9uZW50UGFyYW1ldGVycz47XHJcbiAgICBwcml2YXRlIF90cmFjZUNvbnRyb2whOiBUcmFjZUNvbnRyb2w7XHJcbiAgICBcclxuICAgIC8vIEhvbGRzIHRoZSBhdmFpbGFibGUgdHJhY2UgZGF0YSBwb2ludHM7XHJcbiAgICBwcml2YXRlIF9hdmFpbGFibGVUcmFjZURhdGFQb2ludHM6IFByb3BlcnR5PEFycmF5PFRyYWNlRGF0YVBvaW50SW5mbz4+O1xyXG5cclxuICAgIC8vIEhvbGRzIHRoZSBjb21tYW5kIGZvciByZWFkaW5nIHRoZSB0cmFjZSBwYXJhbWV0ZXJzXHJcbiAgICBwcml2YXRlIF9jb21tYW5kUmVhZFRyYWNlUGFyYW1ldGVycyE6IENvbW1hbmQ8IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10sIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10+O1xyXG4gICAgLy8gSG9sZHMgdGhlIGNvbW1hbmQgZm9yIHdyaXRpbmcgdGhlIHRyYWNlIHBhcmFtZXRlcnNcclxuICAgIHByaXZhdGUgX2NvbW1hbmRXcml0ZVRyYWNlUGFyYW1ldGVycyE6IENvbW1hbmQ8IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10sIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10+O1xyXG5cclxuICAgIC8vIEhvbGRzIHRoZSBlZmZlY3RpdmUgdHJhY2UgY29uZmlndXJhdGlvbiBkYXRhXHJcbiAgICBwcml2YXRlIF90cmFjZUNvbmZpZ3VyYXRpb25EYXRhOiBUcmFjZUNvbmZpZ3VyYXRpb25EYXRhO1xyXG4gICAgLy8gdHJhY2UgY29uZmlndXJhdGlvbiBkYXRhIGluZm9ybWF0aW9uXHJcbiAgICBwcml2YXRlIF90cmFjZUNvbmZpZ3VyYXRpb25JbmZvOiBUcmFjZUNvbmZpZ3VyYXRpb25JbmZvO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihkaWFnbm9zdGljUHJvdmlkZXI6IE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyLCBtYXBwQ29ja3BpdENvbXBvbmVudDogTWFwcENvY2twaXRDb21wb25lbnQpe1xyXG4gICAgICAgIHRoaXMuX2RpYWdub3N0aWNQcm92aWRlciA9IGRpYWdub3N0aWNQcm92aWRlcjtcclxuICAgICAgICB0aGlzLl9tYXBwQ29ja3BpdENvbXBvbmVudCA9IG1hcHBDb2NrcGl0Q29tcG9uZW50O1xyXG5cclxuICAgICAgICB0aGlzLl90cmFjZUNvbnRyb2wgPSBuZXcgVHJhY2VDb250cm9sKHRoaXMuX2RpYWdub3N0aWNQcm92aWRlcik7XHJcbiAgICAgICAgdGhpcy5fYXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzID0gUHJvcGVydHkuY3JlYXRlPEFycmF5PFRyYWNlRGF0YVBvaW50SW5mbz4+KFtdKTtcclxuICAgIC8vdG9kbyAgUHJvcGVydHkuY3JlYXRlIFRyYWNlQ29uZmlndXJhdGlvbkRhdGFcclxuICAgICAgICB0aGlzLl90cmFjZUNvbmZpZ3VyYXRpb25EYXRhID0gbmV3IFRyYWNlQ29uZmlndXJhdGlvbkRhdGEobmV3IEFycmF5PFRyYWNlRGF0YVBvaW50PigpLCBuZXcgQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+KCksIG5ldyBBcnJheTxUcmFjZVN0YXJ0VHJpZ2dlcj4oKSlcclxuICAgICAgICB0aGlzLl90cmFjZUNvbmZpZ3VyYXRpb25JbmZvID0gbmV3IFRyYWNlQ29uZmlndXJhdGlvbkluZm8obmV3IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPigpLCBuZXcgQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+KCksIG5ldyBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4oKSlcclxuXHJcbiAgICAgICAgdGhpcy5fdHJhY2VDb21wb25lbnRQYXJhbWV0ZXJJbnRlcmZhY2UgPSBQcm9wZXJ0eS5jcmVhdGU8SVRyYWNlQ29tcG9uZW50UGFyYW1ldGVycz4oXHJcbiAgICAgICAgeyBcclxuICAgICAgICAgICAgcGFyYW1ldGVyczogW10sIFxyXG4gICAgICAgICAgICBhdmFpbGFibGVUcmFjZURhdGFQb2ludHM6IHRoaXMuX2F2YWlsYWJsZVRyYWNlRGF0YVBvaW50cyxcclxuICAgICAgICAgICAgdHJhY2VDb25maWd1cmF0aW9uRGF0YTogdGhpcy5fdHJhY2VDb25maWd1cmF0aW9uRGF0YSxcclxuICAgICAgICAgICAgdHJhY2VDb25maWd1cmF0aW9uSW5mbzogdGhpcy5fdHJhY2VDb25maWd1cmF0aW9uSW5mbyxcclxuICAgICAgICAgICAgY29tbWFuZFJlYWQ6IHRoaXMuX2NvbW1hbmRSZWFkVHJhY2VQYXJhbWV0ZXJzLFxyXG4gICAgICAgICAgICBjb21tYW5kV3JpdGU6IHRoaXMuX2NvbW1hbmRXcml0ZVRyYWNlUGFyYW1ldGVycyxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5jcmVhdGVDb21tYW5kcygpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFjdGl2YXRlcyB0aGUgY29uZmlndXJhdGVkIHRyYWNlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gY29tbWFuZEFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFRyYWNlQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWN0aXZhdGVUcmFjZShjb21tYW5kQXJnczogYW55KXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk1hcHBDb2NrcGl0VHJhY2VDb21wb25lbnQ6IHJlY2VpdmVkIENvbW1hbmQgLSBhY3RpdmF0ZSB0cmFjZVwiKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBleHBvc2VkIGNvbW1hbmRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFRyYWNlQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlQ29tbWFuZHMoKSB7XHJcbiAgICAgICAgdGhpcy5fY29tbWFuZFJlYWRUcmFjZVBhcmFtZXRlcnMgPSBDb21tYW5kLmNyZWF0ZSh0aGlzLCB0aGlzLmV4ZWN1dGVDb21tYW5kUmVhZFRyYWNlUGFyYW1ldGVycygpKTtcclxuICAgICAgICB0aGlzLl9jb21tYW5kV3JpdGVUcmFjZVBhcmFtZXRlcnMgPSBDb21tYW5kLmNyZWF0ZSh0aGlzLCB0aGlzLmV4ZWN1dGVDb21tYW5kV3JpdGVUcmFjZVBhcmFtZXRlcnMoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbXBsZW1lbnRzIHRoZSBjb21tYW5kIGZvciByZWFkaW5nIHRoZSB0cmFjZSBwYXJhbWV0ZXJzXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRUcmFjZUNvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBleGVjdXRlQ29tbWFuZFJlYWRUcmFjZVBhcmFtZXRlcnMoKTogSUNvbW1hbmRFeGVjdXRpb25EZWxlZ2F0ZTxhbnksTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXT57XHJcbiAgICAgICAgcmV0dXJuICh0cmFjZVBhcmFtZXRlcnM6TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSxjb21tYW5kUmVzcG9uc2U6IElDb21tYW5kRXhlY3V0aW9uUmVzcG9uc2VEZWxlZ2F0ZTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdPikgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcGFyYW1ldGVyc1RvUmVhZCA9IHRyYWNlUGFyYW1ldGVycyA/IHRyYWNlUGFyYW1ldGVycyA6IHRoaXMubWFwcENvY2twaXRDb21wb25lbnQucGFyYW1ldGVycztcclxuICAgICAgICAgICAgdGhpcy5fZGlhZ25vc3RpY1Byb3ZpZGVyLnJlYWRQYXJhbWV0ZXJWYWx1ZXMocGFyYW1ldGVyc1RvUmVhZCkudGhlbigodXBkYXRlZFBhcmFtZXRlcnMpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbW1hbmRSZXNwb25zZS5leGVjdXRlZCh1cGRhdGVkUGFyYW1ldGVycyk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29tbWFuZFJlc3BvbnNlLnJlamVjdGVkKGVycm9yKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEltcGxlbWVudHMgdGhlIGNvbW1hbmQgZm9yIHdyaXRpbmcgdGhlIHRyYWNlIHBhcmFtZXRlcnNcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFRyYWNlQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIGV4ZWN1dGVDb21tYW5kV3JpdGVUcmFjZVBhcmFtZXRlcnMoKTogSUNvbW1hbmRFeGVjdXRpb25EZWxlZ2F0ZTxhbnksTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXT57XHJcbiAgICAgICByZXR1cm4gKHRyYWNlUGFyYW1ldGVyczpNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdLGNvbW1hbmRSZXNwb25zZTogSUNvbW1hbmRFeGVjdXRpb25SZXNwb25zZURlbGVnYXRlPE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10+KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBwYXJhbWV0ZXJzVG9Xcml0ZSA9IHRyYWNlUGFyYW1ldGVycyA/IHRyYWNlUGFyYW1ldGVycyA6IHRoaXMubWFwcENvY2twaXRDb21wb25lbnQucGFyYW1ldGVycztcclxuICAgICAgICAgICAgdGhpcy5fZGlhZ25vc3RpY1Byb3ZpZGVyLndyaXRlUGFyYW1ldGVyVmFsdWVzKHBhcmFtZXRlcnNUb1dyaXRlKS50aGVuKCh1cGRhdGVkUGFyYW1ldGVycykgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29tbWFuZFJlc3BvbnNlLmV4ZWN1dGVkKHVwZGF0ZWRQYXJhbWV0ZXJzKTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb21tYW5kUmVzcG9uc2UucmVqZWN0ZWQoZXJyb3IpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBpbml0aWFsaXplKCl7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuX2luaXRpYWxpemVkID09IHRydWUpe1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgYXdhaXQgdGhpcy5jb25uZWN0Q29tcG9uZW50KCk7XHJcblxyXG4gICAgICAgIHRoaXMuX3RyYWNlQ29udHJvbC5pbml0aWFsaXplKHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLl90cmFjZUNvbmZpZ3VyYXRpb25JbmZvID0gbmV3IFRyYWNlQ29uZmlndXJhdGlvbkluZm8oTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvLnJldHJpZXZlVHJhY2VDb25maWd1cmF0aW9uRGF0YXBvaW50cyh0aGlzLm1hcHBDb2NrcGl0Q29tcG9uZW50LnBhcmFtZXRlcnMpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvLnJldHJpZXZlVHJhY2VDb25maWd1cmF0aW9uVGltaW5nUGFyYW1ldGVycyh0aGlzLm1hcHBDb2NrcGl0Q29tcG9uZW50LnBhcmFtZXRlcnMpLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mby5yZXRyaWV2ZVRyYWNlQ29uZmlndXJhdGlvblRyaWdnZXJQYXJhbWV0ZXJzKHRoaXMubWFwcENvY2twaXRDb21wb25lbnQucGFyYW1ldGVycykpO1xyXG4gICAgICAgIHRoaXMuX3RyYWNlQ29uZmlndXJhdGlvbkRhdGEgPSB0aGlzLmdldFRyYWNlQ29uZmlndXJhdGlvbkRhdGEodGhpcy5fdHJhY2VDb25maWd1cmF0aW9uSW5mbyk7XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlUGFyYW1ldGVySW50ZXJmYWNlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2luaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVQYXJhbWV0ZXJJbnRlcmZhY2UoKXtcclxuICAgICAgICB0aGlzLl90cmFjZUNvbXBvbmVudFBhcmFtZXRlckludGVyZmFjZS52YWx1ZSA9IHtcclxuICAgICAgICAgICAgcGFyYW1ldGVyczogdGhpcy5tYXBwQ29ja3BpdENvbXBvbmVudC5wYXJhbWV0ZXJzLFxyXG4gICAgICAgICAgICBhdmFpbGFibGVUcmFjZURhdGFQb2ludHM6IHRoaXMuX2F2YWlsYWJsZVRyYWNlRGF0YVBvaW50cyxcclxuICAgICAgICAgICAgdHJhY2VDb25maWd1cmF0aW9uRGF0YTogdGhpcy5fdHJhY2VDb25maWd1cmF0aW9uRGF0YSxcclxuICAgICAgICAgICAgdHJhY2VDb25maWd1cmF0aW9uSW5mbzogdGhpcy5fdHJhY2VDb25maWd1cmF0aW9uSW5mbyxcclxuICAgICAgICAgICAgY29tbWFuZFJlYWQ6IHRoaXMuX2NvbW1hbmRSZWFkVHJhY2VQYXJhbWV0ZXJzLFxyXG4gICAgICAgICAgICBjb21tYW5kV3JpdGU6IHRoaXMuX2NvbW1hbmRXcml0ZVRyYWNlUGFyYW1ldGVycyxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIENvbm5lY3RzIHRoZSB0cmFjZSBjb21wb25lbnQgdG8gdGhlIHRhcmdldCBhbmQgYnJvd3NlcyB0aGUgbWV0aG9kcyxwYXJhbWV0ZXJzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnR9IHRyYWNlQ29tcG9uZW50XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRUcmFjZUNvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGNvbm5lY3RDb21wb25lbnQoKSB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5fZGlhZ25vc3RpY1Byb3ZpZGVyLmJyb3dzZVBhcmFtZXRlcnModGhpcy5fbWFwcENvY2twaXRDb21wb25lbnQpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuX2RpYWdub3N0aWNQcm92aWRlci51cGRhdGVQYXJhbWV0ZXJEYXRhVHlwZXModGhpcy5fbWFwcENvY2twaXRDb21wb25lbnQucGFyYW1ldGVycyk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5fZGlhZ25vc3RpY1Byb3ZpZGVyLmJyb3dzZU1ldGhvZHModGhpcy5fbWFwcENvY2twaXRDb21wb25lbnQpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuX2RpYWdub3N0aWNQcm92aWRlci5icm93c2VNZXRob2RQYXJhbWV0ZXJzKHRoaXMuX21hcHBDb2NrcGl0Q29tcG9uZW50Lm1ldGhvZHMpO1xyXG5cclxuICAgICAgICBhd2FpdCB0aGlzLl9kaWFnbm9zdGljUHJvdmlkZXIucmVhZFBhcmFtZXRlclZhbHVlcyh0aGlzLl9tYXBwQ29ja3BpdENvbXBvbmVudC5wYXJhbWV0ZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFRyYWNlQ29uZmlndXJhdGlvbkRhdGEodHJhY2VDb25maWd1cmF0aW9uSW5mbzogVHJhY2VDb25maWd1cmF0aW9uSW5mbyk6IFRyYWNlQ29uZmlndXJhdGlvbkRhdGF7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZ2V0IGRhdGFwb2ludHNcclxuICAgICAgICBsZXQgZGF0YXBvaW50cyA9IHRoaXMuZ2V0RGF0YVBvaW50cyh0cmFjZUNvbmZpZ3VyYXRpb25JbmZvLmRhdGFQb2ludEluZm9zKTtcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAvLyBnZXQgdGltaW5nIHBhcmFtZXRlcnNcclxuICAgICAgICBsZXQgdGltaW5nUGFyYW1ldGVycyA9IHRyYWNlQ29uZmlndXJhdGlvbkluZm8udGltaW5nUGFyYW1ldGVySW5mb3M7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZ2V0IHN0YXJ0IHRyaWdnZXIgcGFyYW1ldGVyc1xyXG4gICAgICAgIGxldCBzdGFydFRyaWdnZXJzID0gdGhpcy5nZXRTdGFydFRyaWdnZXJzKHRyYWNlQ29uZmlndXJhdGlvbkluZm8uc3RhcnRUcmlnZ2VySW5mb3MpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGNyZWF0ZSB0cmFjZSBjb25maWd1cmF0aW9uIGRhdGFcclxuICAgICAgICByZXR1cm4gbmV3IFRyYWNlQ29uZmlndXJhdGlvbkRhdGEoZGF0YXBvaW50cywgdGltaW5nUGFyYW1ldGVycywgc3RhcnRUcmlnZ2Vycyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXREYXRhUG9pbnRzKGRhdGFwb2ludFBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pOiBBcnJheTxUcmFjZURhdGFQb2ludD57XHJcbiAgICAgICAgbGV0IGRhdGFwb2ludHMgPSBuZXcgQXJyYXk8VHJhY2VEYXRhUG9pbnQ+KCk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGRhdGFwb2ludCBvZiBkYXRhcG9pbnRQYXJhbWV0ZXJzKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhcG9pbnQuZGlzcGxheVZhbHVlICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdEYXRhcG9pbnQgPSBUcmFjZURhdGFQb2ludC5jcmVhdGVTaW1wbGVEYXRhUG9pbnQoZGF0YXBvaW50LmRpc3BsYXlWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLl9hdmFpbGFibGVUcmFjZURhdGFQb2ludHMgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YVBvaW50SW5mbyA9IHRoaXMuX2F2YWlsYWJsZVRyYWNlRGF0YVBvaW50cy52YWx1ZS5maWx0ZXIoZWxlID0+IHtyZXR1cm4gZWxlLmZ1bGxuYW1lID09IGRhdGFwb2ludC5kaXNwbGF5VmFsdWV9KVswXTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRhdGFQb2ludEluZm8gIT0gdW5kZWZpbmVkKSAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdEYXRhcG9pbnQgPSBUcmFjZURhdGFQb2ludC5jcmVhdGVXaXRoRGF0YVBvaW50SW5mbyhkYXRhUG9pbnRJbmZvKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkYXRhcG9pbnRzLnB1c2gobmV3RGF0YXBvaW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZGF0YXBvaW50cztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFN0YXJ0VHJpZ2dlcnModHJpZ2dlclBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pOiBUcmFjZVN0YXJ0VHJpZ2dlcltde1xyXG4gICAgICAgIGxldCBzdGFydFRyaWdnZXJzID0gbmV3IEFycmF5PFRyYWNlU3RhcnRUcmlnZ2VyPigpO1xyXG4gICAgICAgIGZvcihsZXQgdHJpZ2dlckluc3RhbmNlID0gMTsgdHJpZ2dlckluc3RhbmNlIDwgMTA7IHRyaWdnZXJJbnN0YW5jZSsrKXsgLy8gU2VhcmNoIGZvciBzdGFydCB0cmlnZ2VycyB3aXRoIGEgZGVmaW5lZCBkYXRhcG9pbnQgbmFtZVxyXG4gICAgICAgICAgICBsZXQgdHJpZ2dlckluc3RhbmNlSWQgPSBcIlN0YXJ0VHJpZ2dlclwiICsgdHJpZ2dlckluc3RhbmNlICsgXCJfXCI7XHJcbiAgICAgICAgICAgIGxldCBkYXRhUG9pbnROYW1lUGFyYW0gPSB0cmlnZ2VyUGFyYW1ldGVycy5maWx0ZXIocGFyYW0gPT4gcGFyYW0uYnJvd3NlTmFtZSA9PSB0cmlnZ2VySW5zdGFuY2VJZCArIFwiRGF0YVBvaW50XCIpWzBdO1xyXG4gICAgICAgICAgICBpZihkYXRhUG9pbnROYW1lUGFyYW0gIT0gdW5kZWZpbmVkKXsgXHJcbiAgICAgICAgICAgICAgICBpZihkYXRhUG9pbnROYW1lUGFyYW0udmFsdWUgIT0gXCJcIil7IC8vIEFkZCBubyBzdGFydHRyaWdnZXIgaWYgZGF0YXBvaW50IG5hbWUgaXMgbm90IGRlZmluZWRcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3RhcnRUcmlnZ2VyID0gdGhpcy5nZXRTdGFydFRyaWdnZXIoZGF0YVBvaW50TmFtZVBhcmFtLnZhbHVlLCB0cmlnZ2VySW5zdGFuY2VJZCwgdHJpZ2dlclBhcmFtZXRlcnMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0VHJpZ2dlcnMucHVzaChzdGFydFRyaWdnZXIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdGFydFRyaWdnZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0U3RhcnRUcmlnZ2VyKGRhdGFQb2ludE5hbWU6IHN0cmluZywgaW5zdGFuY2VJZDogc3RyaW5nLCBjb21wb25lbnRQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdKTogVHJhY2VTdGFydFRyaWdnZXIge1xyXG4gICAgICAgIGxldCBjb25kaXRpb24gPSBcIlwiO1xyXG4gICAgICAgIGxldCBjb25kaXRpb25QYXJhbSA9IGNvbXBvbmVudFBhcmFtZXRlcnMuZmlsdGVyKHBhcmFtID0+IHBhcmFtLmJyb3dzZU5hbWUgPT0gaW5zdGFuY2VJZCArIFwiQ29uZGl0aW9uXCIpWzBdO1xyXG4gICAgICAgIGlmKGNvbmRpdGlvblBhcmFtICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGNvbmRpdGlvbiA9IGNvbmRpdGlvblBhcmFtLnZhbHVlLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgbGV0IHRocmVzaG9sZCA9IFwiXCI7XHJcbiAgICAgICAgbGV0IHRocmVzaG9sZFBhcmFtID0gY29tcG9uZW50UGFyYW1ldGVycy5maWx0ZXIocGFyYW0gPT4gcGFyYW0uYnJvd3NlTmFtZSA9PSBpbnN0YW5jZUlkICsgXCJUaHJlc2hvbGRcIilbMF07XHJcbiAgICAgICAgaWYodGhyZXNob2xkUGFyYW0gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhyZXNob2xkID0gdGhyZXNob2xkUGFyYW0uZGlzcGxheVZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdHJpZ2dlcldpbmRvdyA9IFwiXCI7XHJcbiAgICAgICAgbGV0IHRyaWdnZXJQYXJhbSA9IGNvbXBvbmVudFBhcmFtZXRlcnMuZmlsdGVyKHBhcmFtID0+IHBhcmFtLmJyb3dzZU5hbWUgPT0gaW5zdGFuY2VJZCArIFwiV2luZG93XCIpWzBdO1xyXG4gICAgICAgIGlmKHRyaWdnZXJQYXJhbSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0cmlnZ2VyV2luZG93ID0gdHJpZ2dlclBhcmFtLmRpc3BsYXlWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIG5ldyBUcmFjZVN0YXJ0VHJpZ2dlcihjb25kaXRpb24sIGRhdGFQb2ludE5hbWUsIHRocmVzaG9sZCwgdHJpZ2dlcldpbmRvdyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyB1cGRhdGVEYXRhUG9pbnRJbmZvcm1hdGlvbnModHJhY2VDb25maWd1cmF0aW9uRGF0YTogVHJhY2VDb25maWd1cmF0aW9uRGF0YSl7XHJcbiAgICAgICAgdHJhY2VDb25maWd1cmF0aW9uRGF0YS5kYXRhUG9pbnRzLmZvckVhY2goZGF0YXBvaW50ID0+IHtcclxuICAgICAgICAgICAgbGV0IGRhdGFQb2ludEluZm8gPSB0aGlzLl9hdmFpbGFibGVUcmFjZURhdGFQb2ludHMudmFsdWUuZmlsdGVyKGVsZSA9PiB7cmV0dXJuIGVsZS5mdWxsbmFtZSA9PSBkYXRhcG9pbnQuZGF0YVBvaW50TmFtZX0pWzBdO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYoZGF0YVBvaW50SW5mbyAhPSB1bmRlZmluZWQpICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3RGF0YXBvaW50ID0gVHJhY2VEYXRhUG9pbnQuY3JlYXRlV2l0aERhdGFQb2ludEluZm8oZGF0YVBvaW50SW5mbyk7XHJcbiAgICAgICAgICAgICAgICBkYXRhcG9pbnQuY29tcG9uZW50TmFtZSA9IG5ld0RhdGFwb2ludC5jb21wb25lbnROYW1lO1xyXG4gICAgICAgICAgICAgICAgZGF0YXBvaW50Lm5hbWUgPSBuZXdEYXRhcG9pbnQubmFtZTtcclxuICAgICAgICAgICAgICAgIGRhdGFwb2ludC5kZXNjcmlwdGlvbiA9IG5ld0RhdGFwb2ludC5kZXNjcmlwdGlvbjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgYXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzKGRhdGFQb2ludHMgOiBQcm9wZXJ0eTxBcnJheTxUcmFjZURhdGFQb2ludEluZm8+Pikge1xyXG4gICAgICAgIHRoaXMuX2F2YWlsYWJsZVRyYWNlRGF0YVBvaW50cyA9IGRhdGFQb2ludHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRyYWNlQ29uZmlndXJhdGlvbkRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtJbnRlcmZhY2VUcmFjZURhdGF9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRUcmFjZUNvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHRyYWNlQ29uZmlndXJhdGlvbkRhdGEoKTogVHJhY2VDb25maWd1cmF0aW9uRGF0YSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RyYWNlQ29uZmlndXJhdGlvbkRhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCB0cmFjZUNvbmZpZ3VyYXRpb25EYXRhKHRyYWNlQ29uZmlndXJhdGlvbkRhdGEgOiBUcmFjZUNvbmZpZ3VyYXRpb25EYXRhKSB7XHJcbiAgICAgICAgdGhpcy5fdHJhY2VDb25maWd1cmF0aW9uRGF0YSA9IHRyYWNlQ29uZmlndXJhdGlvbkRhdGE7XHJcbiAgICAgICAgdGhpcy51cGRhdGVQYXJhbWV0ZXJJbnRlcmZhY2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIE1hcHBDb2NrcGl0Q29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7TWFwcENvY2twaXRDb21wb25lbnR9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRUcmFjZUNvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IG1hcHBDb2NrcGl0Q29tcG9uZW50KCk6IE1hcHBDb2NrcGl0Q29tcG9uZW50IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFwcENvY2twaXRDb21wb25lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBUcmFjZUNvbnRyb2xJbnRlcmZhY2VcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtJVHJhY2VDb21wb25lbnRDb250cm9sfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0VHJhY2VDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCB0cmFjZUNvbnRyb2xJbnRlcmZhY2UoKTogSVRyYWNlQ29tcG9uZW50Q29udHJvbCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RyYWNlQ29udHJvbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIFByb3BlcnR5PElUcmFjZUNvbXBvbmVudFBhcmFtZXRlcnM+XHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7UHJvcGVydHk8SVRyYWNlQ29tcG9uZW50UGFyYW1ldGVycz59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRUcmFjZUNvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHRyYWNlUGFyYW1ldGVycygpOiBQcm9wZXJ0eTxJVHJhY2VDb21wb25lbnRQYXJhbWV0ZXJzPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RyYWNlQ29tcG9uZW50UGFyYW1ldGVySW50ZXJmYWNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgRGlzcGxheU5hbWVcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtQcm9wZXJ0eTxJVHJhY2VDb21wb25lbnRQYXJhbWV0ZXJzPn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFRyYWNlQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgZGlzcGxheU5hbWUoKSA6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcHBDb2NrcGl0Q29tcG9uZW50LmRpc3BsYXlOYW1lO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IHtNYXBwQ29ja3BpdFRyYWNlQ29tcG9uZW50fSJdfQ==