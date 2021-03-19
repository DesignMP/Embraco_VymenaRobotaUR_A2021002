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
define(["require", "exports", "../diagnostics/mappCockpitDiagnosticProvider", "./mappCockpitComponent", "../../framework/events", "../dataModelInterface", "../dataModelBase", "../../framework/property", "../../framework/command", "../diagnostics/mappCockpitCommonInfoProvider", "./mappCockpitComponentReflection", "../../common/mappCockpitConfig"], function (require, exports, mappCockpitDiagnosticProvider_1, mappCockpitComponent_1, events_1, dataModelInterface_1, dataModelBase_1, property_1, command_1, mappCockpitCommonInfoProvider_1, mappCockpitComponentReflection_1, mappCockpitConfig_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventTraceDataLoaded = /** @class */ (function (_super) {
        __extends(EventTraceDataLoaded, _super);
        function EventTraceDataLoaded() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventTraceDataLoaded;
    }(events_1.TypedEvent));
    ;
    var EventComponentsUpdated = /** @class */ (function (_super) {
        __extends(EventComponentsUpdated, _super);
        function EventComponentsUpdated() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventComponentsUpdated;
    }(events_1.TypedEvent));
    ;
    var EventComponentParametersUpdated = /** @class */ (function (_super) {
        __extends(EventComponentParametersUpdated, _super);
        function EventComponentParametersUpdated() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventComponentParametersUpdated;
    }(events_1.TypedEvent));
    ;
    var EventComponentMethodsUpdated = /** @class */ (function (_super) {
        __extends(EventComponentMethodsUpdated, _super);
        function EventComponentMethodsUpdated() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventComponentMethodsUpdated;
    }(events_1.TypedEvent));
    ;
    var EventParameterValuesUpdated = /** @class */ (function (_super) {
        __extends(EventParameterValuesUpdated, _super);
        function EventParameterValuesUpdated() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventParameterValuesUpdated;
    }(events_1.TypedEvent));
    ;
    var EventModelConnection = /** @class */ (function (_super) {
        __extends(EventModelConnection, _super);
        function EventModelConnection() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventModelConnection;
    }(events_1.TypedEvent));
    ;
    /**
     * The class implements the main data model for mapp Cockpit.
     *
     * @class MappCockpitComponentDataModel
     */
    var MappCockpitComponentDataModel = /** @class */ (function () {
        /**
         * Creates an instance of MappCockpitComponentDataModel.
         * @memberof MappCockpitComponentDataModel
         */
        function MappCockpitComponentDataModel() {
            var _this = this;
            // Create a data source for the components.
            this._componentsSource = property_1.Property.create([]);
            this._userComponentsSource = property_1.Property.create([], function (dataLink) { _this.requestReadUserComponents(dataLink); });
            // Holds user roles
            this._userRoles = property_1.Property.create([]);
            // specifies interval for connection observation
            this._connectionObservationInterval = 1000;
            // specefies the connection observation id
            this._connectionObservationTimerId = -1;
            // holds the current model connection state
            this._modelConnected = false;
            this._observablesChangedHandler = function (sender, eventArgs) { _this.handleObservableItemsChanged(eventArgs); };
            // Initialize members
            this._mappCockpitDiagnosticProvider = new mappCockpitDiagnosticProvider_1.MappCockpitDiagnosticProvider(this);
            this._components = [];
            // Create event sources
            this.eventTraceDataLoaded = new EventTraceDataLoaded();
            this.eventComponentsUpdated = new EventComponentsUpdated();
            this.eventComponentParametersUpdated = new EventComponentParametersUpdated();
            this.eventParameterValuesUpdated = new EventParameterValuesUpdated();
            this.eventComponentMethodsUpdated = new EventComponentMethodsUpdated();
            this.eventModelConnectionChanged = new EventModelConnection();
            // forward the event
            this._mappCockpitDiagnosticProvider.eventObservablesChanged.attach(this._observablesChangedHandler);
            // Create and initialize commands
            this.createCommands();
        }
        /**
         * Dispose the MappCockpitComponentDataModel
         *
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.dispose = function () {
            // detach events
            this._mappCockpitDiagnosticProvider.eventObservablesChanged.detach(this._observablesChangedHandler);
            this._mappCockpitDiagnosticProvider.dispose();
        };
        /**
         * Creates exposed commands
         *
         * @private
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.createCommands = function () {
            this._commandChangeUser = command_1.Command.create(this, this.executeCommandChangeUser());
        };
        /**
         * initializes the data model
         *
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.initialize = function () {
        };
        Object.defineProperty(MappCockpitComponentDataModel.prototype, "traceProvider", {
            /**
             * Gets the trace provider
             *
             * @readonly
             * @type {MappCockpitTraceProvider}
             * @memberof MappCockpitComponentDataModel
             */
            get: function () {
                return this._mappCockpitDiagnosticProvider.traceProvider;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * connects the data model to the data source
         *
         * @returns {*}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.connect = function () {
            return __awaiter(this, void 0, void 0, function () {
                var error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, this._mappCockpitDiagnosticProvider.beginSession()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.browseComponents()];
                        case 2:
                            _a.sent();
                            // after connectin successfully
                            this.startObserveModelConnection();
                            return [2 /*return*/, true];
                        case 3:
                            error_1 = _a.sent();
                            return [2 /*return*/, false];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        Object.defineProperty(MappCockpitComponentDataModel.prototype, "commandChangeUser", {
            get: function () {
                return this._commandChangeUser;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentDataModel.prototype, "components", {
            /**
             * Returns the available mapp components
             *
             * @readonly
             * @type {Array<MappCockpitComponent>}
             * @memberof MappCockpitComponentDataModel
             */
            get: function () {
                return this._components;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentDataModel.prototype, "componentsSource", {
            get: function () {
                return this._componentsSource;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentDataModel.prototype, "userComponentsSource", {
            get: function () {
                return this._userComponentsSource;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentDataModel.prototype, "userRoles", {
            /**
             * Gets the current user roles
             *
             * @readonly
             * @type {string[]}
             * @memberof MappCockpitComponentDataModel
             */
            get: function () {
                return this._userRoles;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentDataModel.prototype, "writeAccess", {
            /**
             *
             *
             * @returns {boolean}
             * @memberof MappCockpitComponentDataModel
             */
            get: function () {
                var modelHasWriteAccess = false;
                if (this.userRoles.value.length > 0) {
                    // update the write access right according the current role
                    modelHasWriteAccess = this.userRoles.value.some(function (userRole) { return userRole === mappCockpitConfig_1.MappCockpitConfiguration.writeAccessRole; });
                }
                return modelHasWriteAccess;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Clears the data model
         *
         * @returns {*}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.clear = function () {
            this._components = [];
        };
        /**
         * Browses all available resources and updates the model
         *
         * @returns {*}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.browseComponents = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            // Update components in model
                            _a = this;
                            return [4 /*yield*/, this._mappCockpitDiagnosticProvider.componentProvider.browseComponents()];
                        case 1:
                            // Update components in model
                            _a._components = _b.sent();
                            return [4 /*yield*/, this.updateComponentMetaData()];
                        case 2:
                            _b.sent();
                            // Connect to model
                            this.connectComponentsToModel();
                            this.componentsSource.value = this._components;
                            return [2 /*return*/, this._components];
                    }
                });
            });
        };
        /**
         * Connects the components to the maon data model
         *
         * @private
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.connectComponentsToModel = function () {
            var _this = this;
            this._components.forEach(function (component) { component.model = _this; });
        };
        /**
         * Updates the components meta data
         *
         * @private
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.updateComponentMetaData = function () {
            return __awaiter(this, void 0, void 0, function () {
                var i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < this._components.length)) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.browseMetaInfo(this._components[i])];
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
         * Reads the available user components
         *
         * @private
         * @param {Property<MappCockpitComponent[]>} dataLink
         * @returns {Promise<MappCockpitComponent[]>}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.requestReadUserComponents = function (dataLink) {
            return __awaiter(this, void 0, void 0, function () {
                var components;
                return __generator(this, function (_a) {
                    components = [];
                    try {
                        // filter components to be exposed to the user
                        components = this._components.filter(function (component) { return component.metaData; });
                        components.forEach(function (component) { mappCockpitComponent_1.MappCockpitComponent.registerUserComponent(component); });
                        dataLink.readRequestExecuted(components);
                    }
                    catch (error) {
                        console.error(error);
                        dataLink.readRequestRejected(error);
                    }
                    return [2 /*return*/, components];
                });
            });
        };
        /**
         * browses the meta data, parameters ans methods of a single component
         *
         * @private
         * @param {MappCockpitComponent} mappCockpitComponent
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.browseComponent = function (mappCockpitComponent) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.browseParameters(mappCockpitComponent)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.browseMethods(mappCockpitComponent)];
                        case 2:
                            _a.sent();
                            console.log("MappCockpitComponentDataModel.browseComponent: %o", mappCockpitComponent);
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Called after components update
         *
         * @param {MappCockpitComponent[]} mappCockpitComponents
         * @returns {*}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.onComponentsUpdated = function (mappCockpitComponents) {
            this.eventComponentsUpdated.raise(this, mappCockpitComponents);
        };
        /**
           * browses the meta info for a component
         *
         * @param {MappCockpitComponent} mappCockpitComponent
         * @returns {Promise<any>}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.browseMetaInfo = function (mappCockpitComponent) {
            return __awaiter(this, void 0, void 0, function () {
                var metaInfoReferences, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this._mappCockpitDiagnosticProvider.browseMetaInfo(mappCockpitComponent)];
                        case 1:
                            metaInfoReferences = _a.sent();
                            if (metaInfoReferences) {
                                mappCockpitComponent.metaData = this.readMetaData(metaInfoReferences);
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            error_2 = _a.sent();
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/, mappCockpitComponent.metaData];
                    }
                });
            });
        };
        /**
         * Browses available component parameters
         *
         * @returns {Promise<void>}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.browseParameters = function (mappCockpitComponent) {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            // Update components in model
                            _a = mappCockpitComponent;
                            return [4 /*yield*/, this._mappCockpitDiagnosticProvider.browseParameters(mappCockpitComponent)];
                        case 1:
                            // Update components in model
                            _a.parameters = _b.sent();
                            // retrieve and update user parameters
                            return [4 /*yield*/, this.retrieveUserParameters(mappCockpitComponent)];
                        case 2:
                            // retrieve and update user parameters
                            _b.sent();
                            return [2 /*return*/, mappCockpitComponent.parameters];
                    }
                });
            });
        };
        /**
         * Browses and updates the methods input parameters
         *
         * @param {MappCockpitComponentMethod} mappCockpitComponentMethod
         * @returns {Promise<MappCockpitMethodParameter[]>}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.browseMethodInputParameters = function (mappCockpitComponentMethod) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: 
                        // browse and update the methods parameters
                        return [4 /*yield*/, this._mappCockpitDiagnosticProvider.browseMethodParameters([mappCockpitComponentMethod])];
                        case 1:
                            // browse and update the methods parameters
                            _a.sent();
                            // Method doesn't need to be browsed again
                            mappCockpitComponentMethod.isBrowsed = true;
                            // update the parameter data types
                            return [4 /*yield*/, this._mappCockpitDiagnosticProvider.updateMethodParameterDataTypes([mappCockpitComponentMethod])];
                        case 2:
                            // update the parameter data types
                            _a.sent();
                            return [2 /*return*/, mappCockpitComponentMethod.inputParameters];
                    }
                });
            });
        };
        /**
         * Retrieves the component parameters relevant for the user. They are specified by meta data
         *
         * @private
         * @param {MappCockpitComponent} mappCockpitComponent
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.retrieveUserParameters = function (mappCockpitComponent) {
            return __awaiter(this, void 0, void 0, function () {
                var watchableMetaConfig, watchableStateMetaConfig;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            watchableMetaConfig = ['MetaConfigWatchables', 'WatchablesStructure', 'Watchable'];
                            watchableStateMetaConfig = ['MetaConfigWatchablesStates', 'WatchablesStatesStructure', 'WatchableState'];
                            mappCockpitComponent.messageParameters = mappCockpitComponentReflection_1.MappCockpitComponentParameterInfo.retrieveMessageParameters(mappCockpitComponent.parameters);
                            if (!mappCockpitComponent.metaData) return [3 /*break*/, 5];
                            if (!(mappCockpitComponent.metaData.hasOwnProperty("Parameters") && mappCockpitComponent.metaData["Parameters"].hasOwnProperty("Watchable"))) return [3 /*break*/, 2];
                            mappCockpitComponent.watchableParameters = mappCockpitComponentReflection_1.MappCockpitComponentParameterInfo.retrieveWatchableParameters(mappCockpitComponent.parameters, watchableMetaConfig);
                            if (!(mappCockpitComponent.watchableParameters.length > 0)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this._mappCockpitDiagnosticProvider.updateParameterDataTypes(mappCockpitComponent.watchableParameters)];
                        case 1:
                            _a.sent();
                            mappCockpitComponentReflection_1.MappCockpitComponentParameterInfo.updateParameter(mappCockpitComponent.watchableParameters, mappCockpitComponent.metaData["Parameters"]["Watchable"]);
                            _a.label = 2;
                        case 2:
                            if (!(mappCockpitComponent.metaData.hasOwnProperty("Parameters") && mappCockpitComponent.metaData["Parameters"].hasOwnProperty("Configuration"))) return [3 /*break*/, 4];
                            mappCockpitComponent.configurationParameters = mappCockpitComponentReflection_1.MappCockpitComponentParameterInfo.retrieveConfigurationParameters(mappCockpitComponent.parameters);
                            if (!(mappCockpitComponent.configurationParameters.length > 0)) return [3 /*break*/, 4];
                            return [4 /*yield*/, this._mappCockpitDiagnosticProvider.updateParameterDataTypes(mappCockpitComponent.configurationParameters)];
                        case 3:
                            _a.sent();
                            mappCockpitComponentReflection_1.MappCockpitComponentParameterInfo.updateParameter(mappCockpitComponent.configurationParameters, mappCockpitComponent.metaData["Parameters"]["Configuration"]);
                            _a.label = 4;
                        case 4:
                            if (mappCockpitComponent.metaData.hasOwnProperty("Parameters") && mappCockpitComponent.metaData["Parameters"].hasOwnProperty("WatchableState") && mappCockpitComponent.watchableParameters.length > 0) {
                                mappCockpitComponent.watchableStateParameters = mappCockpitComponentReflection_1.MappCockpitComponentParameterInfo.retrieveWatchableStates(mappCockpitComponent.watchableParameters, watchableStateMetaConfig);
                            }
                            _a.label = 5;
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * writes the value to component parameter
         *
         * @param {MappCockpitComponentParameter} parameter
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.writeComponentParameter = function (parameter) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._mappCockpitDiagnosticProvider.writeParameterValue(parameter, parameter.value)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * browses the component methods
         *
         * @param {MappCockpitComponent} mappCockpitComponent
         * @returns {Promise<MappCockpitComponentMethod[]>}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.browseMethods = function (mappCockpitComponent) {
            return __awaiter(this, void 0, void 0, function () {
                var methodsMetaConfig, quickCommandsMetaConfig, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            methodsMetaConfig = ['MetaConfigCommands', 'CommandsStructure', 'Command'];
                            quickCommandsMetaConfig = ['MetaConfigQuickCommands', 'QuickCommandsStructure', 'QuickCommand'];
                            // Update component methods in model
                            _a = mappCockpitComponent;
                            return [4 /*yield*/, this._mappCockpitDiagnosticProvider.browseMethods(mappCockpitComponent)];
                        case 1:
                            // Update component methods in model
                            _a.methods = _b.sent();
                            // filter the methods to the ones specefied by meta info
                            mappCockpitComponent.userMethods = mappCockpitComponentReflection_1.MappCockpitComponentMethodInfo.retrieveExecutableMethods(mappCockpitComponent.methods, methodsMetaConfig);
                            mappCockpitComponent.quickCommands = mappCockpitComponentReflection_1.MappCockpitComponentMethodInfo.retrieveQuickCommands(mappCockpitComponent.methods, quickCommandsMetaConfig);
                            return [2 /*return*/, mappCockpitComponent.methods];
                    }
                });
            });
        };
        /**
         * Retrieves the methods relevant for the user. They are specified by meta data
         *
         * @private
         * @param {MappCockpitComponent} mappCockpitComponent
         * @param {*} componentMethods
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.retrieveUserMethods = function (mappCockpitComponent, componentMethods) {
            var userMethods = [];
            if (mappCockpitComponent.metaData && mappCockpitComponent.metaData.hasOwnProperty("Methods") && mappCockpitComponent.metaData["Methods"].hasOwnProperty("Executable")) {
                var methodsMeta_1 = mappCockpitComponent.metaData["Methods"]["Executable"];
                userMethods = componentMethods.filter(function (method) { return methodsMeta_1[method.browseName]; });
            }
            return userMethods;
        };
        /**
         * reads the meta infos into a single object
         *
         * @private
         * @param {Array<string>} metaParameters
         * @returns
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.readMetaData = function (metaParameters) {
            var metaData = {};
            try {
                metaParameters.forEach(function (metaParameter) {
                    if (metaParameter.value == "") { // Fallback: Use empty object in case of empty metaInfo
                        metaParameter.value = "{}";
                    }
                    metaData[metaParameter.browseName] = JSON.parse(metaParameter.value);
                    //Use for prototyping
                    // var watchstateMetaData = '{"WatchablesStatesStructure":{"Scope":"mapp/Motion/Axis/AcpAxis","Childs":[{"Group":{"DisplayName":"Main","Childs":[{"WatchableState":{"Name":"Axis_state","Parameters":["PlcOpen State","Communication Ready"],"Expression":"Communication Ready == false ? 1 : PlcOpen State == 1 ? 2 : PlcOpen State == 2 ? 3 : PlcOpen State == 3 or PlcOpen State == 4 or PlcOpen State == 5 ? 4 : PlcOpen State == 6 ? 5 : PlcOpen State == 7 ? 6 : 0","Icon":{"0":{"ImageName":"axis_disabled","Tooltip":"Axis is disabled"},"1":{"ImageName":"communicationNotReady","Tooltip":"Communication is not ready"},"2":{"ImageName":"axis_standstill","Tooltip":"Axis is standstill"},"3":{"ImageName":"axis_error","Tooltip":"Axis is in error state"},"4":{"ImageName":"axis_motion","Tooltip":"Axis is moving"},"5":{"ImageName":"axis_synchronized_motion","Tooltip":"Axis is synchronized"},"6":{"ImageName":"axis_homing","Tooltip":"Axis is homing"}}}},{"WatchableState":{"Name":"Controller_state","Parameters":["Is Powered"],"Expression":"Is Powered == true ? 1 : 0","Icon":{"0":{"ImageName":"controller_off","Tooltip":"Controller is switched off"},"1":{"ImageName":"controller_on","Tooltip":"Controller is switched on"}}}},{"WatchableState":{"Name":"Axis_reference_state","Parameters":["Is Homed"],"Expression":"Is Homed == true ? 1 : 0","Icon":{"0":{"ImageName":"notHomed","Tooltip":"Axis is not homed"},"1":{"ImageName":"homed","Tooltip":"Axis is homed"}}}}]}}]}}'; 
                    // metaData['MetaConfigWatchablesStates'] = JSON.parse(watchstateMetaData);
                    // var quickMethod = ' {"QuickCommandsStructure":{"Scope":"mapp/Motion/Axis/AcpAxis","Childs":[{"Group":{"DisplayName":"Main","Childs":[{"QuickCommand":{"Ref":"Power On","Tooltip":"Power on","ImageName":"On"}},{"QuickCommand":{"Ref":"Power Off","Tooltip":"Power off","ImageName":"Off"}},{"QuickCommand":{"Ref":"Abort Command","Tooltip":"Abort command","ImageName":"Stop"}},{"QuickCommand":{"Ref":"Reset","Tooltip":"Reset","ImageName":"Reset"}}]}}]}} '
                    // metaData['MetaConfigQuickCommands'] = JSON.parse(quickMethod);
                });
                // update specific parameter types in meta data object
                mappCockpitCommonInfoProvider_1.MappCockpitCommonInfoProvider.initializeMetaData(metaData);
            }
            catch (e) {
                throw new Error("MappCockpitComponentDataModel.browseMetaData: could not parse meta data: " + e.message);
            }
            return metaData;
        };
        MappCockpitComponentDataModel.prototype.executeComponentMethod = function (componentMethod) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._mappCockpitDiagnosticProvider.executeComponentMethod(componentMethod)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * called after component parameters have been updated
         *
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @returns {*}
         * @memberof MappCockpitComponentDataModel
         */
        // TODO: obsolete? else can component be removed?
        MappCockpitComponentDataModel.prototype.onComponentParametersUpdated = function (component, componentParameters) {
            this.eventComponentParametersUpdated.raise(this, new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, "updatedComponentParameters", componentParameters));
        };
        /**
         * called after component methods have been updated
         *
         * @param {MappCockpitComponent} component
         * @param {MappCockpitComponentParameter[]} componentMethods
         * @returns {*}
         * @memberof MappCockpitComponentDataModel
         */
        // TODO: obsolete? else can component be removed?
        MappCockpitComponentDataModel.prototype.onComponentMethodsUpdated = function (component, componentMethods) {
            this.eventComponentMethodsUpdated.raise(this, new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, "updatedComponentMethods", componentMethods));
        };
        /**
         * reads  and updates the parameter values of the specified parameter list
         *
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @returns {*}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.readParameterValues = function (componentParameters) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._mappCockpitDiagnosticProvider.readParameterValues(componentParameters)];
                        case 1:
                            _a.sent();
                            this.onParameterValuesUpdated(componentParameters);
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * observes the parameters for value changes
         *
         * @param {IObserver} observer
         * @param {MappCockpitComponentItem[]} observableDataModelItems
         * @returns {Promise<any>}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.observeDataModelItems = function (observer, observableDataModelItems) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._mappCockpitDiagnosticProvider.observeComponentModelItems(observer, observableDataModelItems)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Unobserves the passed parameters.
         *
         * @param {*} observer
         * @param {MappCockpitComponentParameter[]} observableParameters
         * @param {boolean} suspend
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.unobserveComponentModelItems = function (observer, observableParameters, suspend) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._mappCockpitDiagnosticProvider.unobserveComponentModelItems(observer, observableParameters, suspend)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * handles observable changed notifications
         *
         * @private
         * @param {EventObservedItemsChangedArgs} eventArgs
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.handleObservableItemsChanged = function (eventArgs) {
            if (eventArgs.observer instanceof dataModelBase_1.DataModelBase) {
                // create model changed args
                var modelItemsChangedArgs = new dataModelInterface_1.EventModelChangedArgs(eventArgs.observer, dataModelInterface_1.ModelChangeType.updateTarget, "changed observables", eventArgs.changedItems);
                // notify observers from changing model items
                eventArgs.observer.onModelItemsChanged(eventArgs.observer, modelItemsChangedArgs);
            }
        };
        /**
         * notify from updating the specified parameters values
         *
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @returns {*}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.onParameterValuesUpdated = function (componentParameters) {
            this.eventParameterValuesUpdated.raise(this, componentParameters);
        };
        /**
         * Called when the model has been successfully connected
         *
         * @private
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.onModelConnected = function () {
            this._modelConnected = true;
            this.onModelConnectionChanged(this._modelConnected);
        };
        /**
         * Called when the model has lost the connection to the target
         *
         * @private
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.onModelDisconnected = function () {
            // notify connection change
            this._modelConnected = false;
            this.onModelConnectionChanged(this._modelConnected);
        };
        /**
         * Observes the connection if it is still alive
         *
         * @returns {*}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.startObserveModelConnection = function () {
            var _this = this;
            // initially notify the successfull connection
            this.onModelConnected();
            // establish a timer for watching the connection
            if (this._connectionObservationTimerId == -1) {
                this._connectionObservationTimerId = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.observeModelConnection()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); }, this._connectionObservationInterval);
            }
        };
        /**
         * Obsereves the model connection
         *
         * @returns {*}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.observeModelConnection = function () {
            return __awaiter(this, void 0, void 0, function () {
                var isConnected;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._mappCockpitDiagnosticProvider.checkTargetConnection()];
                        case 1:
                            isConnected = _a.sent();
                            if (isConnected) {
                                if (!this._modelConnected) {
                                    this.onModelConnected();
                                }
                            }
                            else {
                                if (this._modelConnected) {
                                    this.onModelDisconnected();
                                }
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Called when the model connection has changed
         *
         * @param {boolean} connected
         * @returns {*}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.onModelConnectionChanged = function (connected) {
            this.eventModelConnectionChanged.raise(this, connected);
        };
        /**
         * Provides command for changing the user to be logged in
         *
         * @returns {ICommandExecutionDelegate<any,any>}
         * @memberof MappCockpitComponentDataModel
         */
        MappCockpitComponentDataModel.prototype.executeCommandChangeUser = function () {
            var _this = this;
            return function (userInfo, commandResponse) { return __awaiter(_this, void 0, void 0, function () {
                var _a, error_3;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            // update the user roles
                            _a = this._userRoles;
                            return [4 /*yield*/, this._mappCockpitDiagnosticProvider.changeUser(userInfo)];
                        case 1:
                            // update the user roles
                            _a.value = (_b.sent());
                            commandResponse.executed(this._userRoles);
                            return [3 /*break*/, 3];
                        case 2:
                            error_3 = _b.sent();
                            commandResponse.rejected(error_3);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); };
        };
        return MappCockpitComponentDataModel;
    }());
    exports.MappCockpitComponentDataModel = MappCockpitComponentDataModel;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50c0RhdGFNb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL29ubGluZS9jb21wb25lbnRzRGF0YU1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFnQkE7UUFBbUMsd0NBQW9EO1FBQXZGOztRQUF5RixDQUFDO1FBQUQsMkJBQUM7SUFBRCxDQUFDLEFBQTFGLENBQW1DLG1CQUFVLEdBQTZDO0lBQUEsQ0FBQztJQUMzRjtRQUFxQywwQ0FBaUU7UUFBdEc7O1FBQXdHLENBQUM7UUFBRCw2QkFBQztJQUFELENBQUMsQUFBekcsQ0FBcUMsbUJBQVUsR0FBMEQ7SUFBQSxDQUFDO0lBQzFHO1FBQThDLG1EQUFnRTtRQUE5Rzs7UUFBZ0gsQ0FBQztRQUFELHNDQUFDO0lBQUQsQ0FBQyxBQUFqSCxDQUE4QyxtQkFBVSxHQUF5RDtJQUFBLENBQUM7SUFDbEg7UUFBMkMsZ0RBQWdFO1FBQTNHOztRQUE2RyxDQUFDO1FBQUQsbUNBQUM7SUFBRCxDQUFDLEFBQTlHLENBQTJDLG1CQUFVLEdBQXlEO0lBQUEsQ0FBQztJQUMvRztRQUEwQywrQ0FBK0U7UUFBekg7O1FBQTJILENBQUM7UUFBRCxrQ0FBQztJQUFELENBQUMsQUFBNUgsQ0FBMEMsbUJBQVUsR0FBd0U7SUFBQSxDQUFDO0lBRTdIO1FBQW1DLHdDQUFrRDtRQUFyRjs7UUFBc0YsQ0FBQztRQUFELDJCQUFDO0lBQUQsQ0FBQyxBQUF2RixDQUFtQyxtQkFBVSxHQUEwQztJQUFBLENBQUM7SUFFeEY7Ozs7T0FJRztJQUNIO1FBd0NJOzs7V0FHRztRQUNIO1lBQUEsaUJBb0JDO1lBM0NELDJDQUEyQztZQUNuQyxzQkFBaUIsR0FBMEMsbUJBQVEsQ0FBQyxNQUFNLENBQThCLEVBQUUsQ0FBQyxDQUFDO1lBQzVHLDBCQUFxQixHQUEwQyxt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QUFnQixFQUFFLENBQUM7aUNBQzNCOzZCQUNKO2lDQUFJO2dDQUNELElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtvQ0FDdEIsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7aUNBQzlCOzZCQUNKOzs7OztTQUNKO1FBRUQ7Ozs7OztXQU1HO1FBQ0gsZ0VBQXdCLEdBQXhCLFVBQXlCLFNBQWlCO1lBQ3RDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzNELENBQUM7UUFFRDs7Ozs7V0FLRztRQUNILGdFQUF3QixHQUF4QjtZQUFBLGlCQVVDO1lBVEcsT0FBTyxVQUFPLFFBQVksRUFBRSxlQUF1RDs7Ozs7OzRCQUUzRSx3QkFBd0I7NEJBQ3hCLEtBQUEsSUFBSSxDQUFDLFVBQVUsQ0FBQTs0QkFBVSxxQkFBTSxJQUFJLENBQUMsOEJBQThCLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFBOzs0QkFEdkYsd0JBQXdCOzRCQUN4QixHQUFnQixLQUFLLElBQUksU0FBMEUsQ0FBQSxDQUFDOzRCQUNwRyxlQUFlLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzs7Ozs0QkFFMUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxPQUFLLENBQUMsQ0FBQzs7Ozs7aUJBRXZDLENBQUM7UUFDTixDQUFDO1FBQ0wsb0NBQUM7SUFBRCxDQUFDLEFBcm9CRCxJQXFvQkM7SUFFUSxzRUFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlciB9IGZyb20gXCIuLi9kaWFnbm9zdGljcy9tYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudCwgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIsIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLCBNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW0sIE1hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVyIH0gZnJvbSBcIi4vbWFwcENvY2twaXRDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRUcmFjZVByb3ZpZGVyIH0gZnJvbSBcIi4uL2RpYWdub3N0aWNzL3RyYWNlL21hcHBDb2NrcGl0VHJhY2VQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBUeXBlZEV2ZW50IH0gZnJvbSAnLi4vLi4vZnJhbWV3b3JrL2V2ZW50cyc7XHJcbmltcG9ydCB7IEV2ZW50TW9kZWxDaGFuZ2VkQXJncywgTW9kZWxDaGFuZ2VUeXBlIH0gZnJvbSBcIi4uL2RhdGFNb2RlbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBFdmVudE9ic2VydmVkSXRlbXNDaGFuZ2VkQXJncyB9IGZyb20gXCIuLi9kaWFnbm9zdGljcy9tYXBwQ29ja3BpdERpYWdub3N0aWNNb25pdG9yaW5nUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgRGF0YU1vZGVsQmFzZSB9IGZyb20gXCIuLi9kYXRhTW9kZWxCYXNlXCI7XHJcbmltcG9ydCB7IFByb3BlcnR5IH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9wcm9wZXJ0eVwiO1xyXG5pbXBvcnQgeyBDb21tYW5kLCBJQ29tbWFuZEV4ZWN1dGlvblJlc3BvbnNlRGVsZWdhdGUsIElDb21tYW5kRXhlY3V0aW9uRGVsZWdhdGUgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2NvbW1hbmRcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21tb25JbmZvUHJvdmlkZXIgfSBmcm9tIFwiLi4vZGlhZ25vc3RpY3MvbWFwcENvY2twaXRDb21tb25JbmZvUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgVHJhY2VEYXRhIH0gZnJvbSBcIi4uL2RpYWdub3N0aWNzL3RyYWNlL3RyYWNlRGF0YVJlYWRlclwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm8sIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mbyB9IGZyb20gXCIuL21hcHBDb2NrcGl0Q29tcG9uZW50UmVmbGVjdGlvblwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbmZpZ3VyYXRpb24gfSBmcm9tIFwiLi4vLi4vY29tbW9uL21hcHBDb2NrcGl0Q29uZmlnXCI7XHJcbmltcG9ydCB7IElPYnNlcnZlciB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvaW50ZXJmYWNlcy9vYnNlcnZlclwiO1xyXG5cclxuXHJcbmNsYXNzIEV2ZW50VHJhY2VEYXRhTG9hZGVkIGV4dGVuZHMgVHlwZWRFdmVudDxNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbCwgVHJhY2VEYXRhPnsgfTtcclxuY2xhc3MgRXZlbnRDb21wb25lbnRzVXBkYXRlZCBleHRlbmRzIFR5cGVkRXZlbnQ8TWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWwsIE1hcHBDb2NrcGl0Q29tcG9uZW50W10+eyB9O1xyXG5jbGFzcyBFdmVudENvbXBvbmVudFBhcmFtZXRlcnNVcGRhdGVkIGV4dGVuZHMgVHlwZWRFdmVudDxNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbCwgRXZlbnRNb2RlbENoYW5nZWRBcmdzPnsgfTtcclxuY2xhc3MgRXZlbnRDb21wb25lbnRNZXRob2RzVXBkYXRlZCBleHRlbmRzIFR5cGVkRXZlbnQ8TWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWwsIEV2ZW50TW9kZWxDaGFuZ2VkQXJncz57IH07XHJcbmNsYXNzIEV2ZW50UGFyYW1ldGVyVmFsdWVzVXBkYXRlZCBleHRlbmRzIFR5cGVkRXZlbnQ8TWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWwsIEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPj57IH07XHJcblxyXG5jbGFzcyBFdmVudE1vZGVsQ29ubmVjdGlvbiBleHRlbmRzIFR5cGVkRXZlbnQ8TWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWwsIGJvb2xlYW4+e307XHJcblxyXG4vKipcclxuICogVGhlIGNsYXNzIGltcGxlbWVudHMgdGhlIG1haW4gZGF0YSBtb2RlbCBmb3IgbWFwcCBDb2NrcGl0LiBcclxuICpcclxuICogQGNsYXNzIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsXHJcbiAqL1xyXG5jbGFzcyBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbCB7XHJcblxyXG4gICAgcHJvdGVjdGVkIF9tYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlcjogTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXI7XHJcblxyXG4gICAgcHJvdGVjdGVkIF9jb21wb25lbnRzOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudD47XHJcblxyXG4gICAgLy8gRGVjbGFyZSBldmVudCB0cmFjZSBkYXRhIGxvYWRlZFxyXG4gICAgcHVibGljIGV2ZW50VHJhY2VEYXRhTG9hZGVkOiBFdmVudFRyYWNlRGF0YUxvYWRlZDtcclxuXHJcbiAgICAvLyBEZWNsYXJlIGV2ZW50IHRyYWNlIGRhdGEgbG9hZGVkXHJcbiAgICBwdWJsaWMgZXZlbnRDb21wb25lbnRzVXBkYXRlZDogRXZlbnRDb21wb25lbnRzVXBkYXRlZDtcclxuXHJcbiAgICBwdWJsaWMgZXZlbnRDb21wb25lbnRQYXJhbWV0ZXJzVXBkYXRlZDogRXZlbnRDb21wb25lbnRQYXJhbWV0ZXJzVXBkYXRlZDtcclxuXHJcbiAgICBwdWJsaWMgZXZlbnRDb21wb25lbnRNZXRob2RzVXBkYXRlZDogRXZlbnRDb21wb25lbnRNZXRob2RzVXBkYXRlZDtcclxuXHJcbiAgICBwdWJsaWMgZXZlbnRQYXJhbWV0ZXJWYWx1ZXNVcGRhdGVkOiBFdmVudFBhcmFtZXRlclZhbHVlc1VwZGF0ZWQ7XHJcblxyXG4gICAgLy8gRGVjbGFyZSBldmVudCBmb3IgbW9kZWwgY29ubmVjdGlvbiBjaGFuZ2VcclxuICAgIHB1YmxpYyBldmVudE1vZGVsQ29ubmVjdGlvbkNoYW5nZWQ6IEV2ZW50TW9kZWxDb25uZWN0aW9uO1xyXG5cclxuICAgIC8vIENyZWF0ZSBhIGRhdGEgc291cmNlIGZvciB0aGUgY29tcG9uZW50cy5cclxuICAgIHByaXZhdGUgX2NvbXBvbmVudHNTb3VyY2U6IFByb3BlcnR5PEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50Pj4gPSBQcm9wZXJ0eS5jcmVhdGU8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnQ+PihbXSk7XHJcbiAgICBwcml2YXRlIF91c2VyQ29tcG9uZW50c1NvdXJjZTogUHJvcGVydHk8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnQ+PiA9IFByb3BlcnR5LmNyZWF0ZTxBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudD4+KFtdLChkYXRhTGluayk9Pnt0aGlzLnJlcXVlc3RSZWFkVXNlckNvbXBvbmVudHMoZGF0YUxpbmspO30pO1xyXG5cclxuICAgIC8vIENvbW1hbmQgZm9yIGNoYW5naW5nIHRoZSB1c2VyXHJcbiAgICBwcml2YXRlIF9jb21tYW5kQ2hhbmdlVXNlciE6IENvbW1hbmQ8e30sIHt9PjtcclxuICAgIFxyXG4gICAgLy8gSG9sZHMgdXNlciByb2xlc1xyXG4gICAgcHJpdmF0ZSBfdXNlclJvbGVzOiBQcm9wZXJ0eTxzdHJpbmdbXT4gPSAgUHJvcGVydHkuY3JlYXRlPHN0cmluZ1tdPihbXSk7XHJcblxyXG4gICAgLy8gc3BlY2lmaWVzIGludGVydmFsIGZvciBjb25uZWN0aW9uIG9ic2VydmF0aW9uXHJcbiAgICBwcml2YXRlICBfY29ubmVjdGlvbk9ic2VydmF0aW9uSW50ZXJ2YWw6IG51bWJlciA9IDEwMDA7XHJcbiAgICAvLyBzcGVjZWZpZXMgdGhlIGNvbm5lY3Rpb24gb2JzZXJ2YXRpb24gaWRcclxuICAgIHByaXZhdGUgX2Nvbm5lY3Rpb25PYnNlcnZhdGlvblRpbWVySWQ6IG51bWJlciA9IC0xO1xyXG4gICAgLy8gaG9sZHMgdGhlIGN1cnJlbnQgbW9kZWwgY29ubmVjdGlvbiBzdGF0ZVxyXG4gICAgcHJpdmF0ZSBfbW9kZWxDb25uZWN0ZWQgPSBmYWxzZTtcclxuXHJcbiAgICBwcml2YXRlIF9vYnNlcnZhYmxlc0NoYW5nZWRIYW5kbGVyID0gKHNlbmRlciwgZXZlbnRBcmdzKSA9PiB7IHRoaXMuaGFuZGxlT2JzZXJ2YWJsZUl0ZW1zQ2hhbmdlZChldmVudEFyZ3MpOyB9OyBcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWwuXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgICAgIC8vIEluaXRpYWxpemUgbWVtYmVyc1xyXG4gICAgICAgIHRoaXMuX21hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyID0gbmV3IE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuX2NvbXBvbmVudHMgPSBbXTtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIGV2ZW50IHNvdXJjZXNcclxuICAgICAgICB0aGlzLmV2ZW50VHJhY2VEYXRhTG9hZGVkID0gbmV3IEV2ZW50VHJhY2VEYXRhTG9hZGVkKCk7XHJcbiAgICAgICAgdGhpcy5ldmVudENvbXBvbmVudHNVcGRhdGVkID0gbmV3IEV2ZW50Q29tcG9uZW50c1VwZGF0ZWQoKTtcclxuICAgICAgICB0aGlzLmV2ZW50Q29tcG9uZW50UGFyYW1ldGVyc1VwZGF0ZWQgPSBuZXcgRXZlbnRDb21wb25lbnRQYXJhbWV0ZXJzVXBkYXRlZCgpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRQYXJhbWV0ZXJWYWx1ZXNVcGRhdGVkID0gbmV3IEV2ZW50UGFyYW1ldGVyVmFsdWVzVXBkYXRlZCgpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRDb21wb25lbnRNZXRob2RzVXBkYXRlZCA9IG5ldyBFdmVudENvbXBvbmVudE1ldGhvZHNVcGRhdGVkKCk7XHJcblxyXG4gICAgICAgIHRoaXMuZXZlbnRNb2RlbENvbm5lY3Rpb25DaGFuZ2VkID0gbmV3IEV2ZW50TW9kZWxDb25uZWN0aW9uKCk7XHJcblxyXG4gICAgICAgIC8vIGZvcndhcmQgdGhlIGV2ZW50XHJcbiAgICAgICAgdGhpcy5fbWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXIuZXZlbnRPYnNlcnZhYmxlc0NoYW5nZWQuYXR0YWNoKHRoaXMuX29ic2VydmFibGVzQ2hhbmdlZEhhbmRsZXIpO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgYW5kIGluaXRpYWxpemUgY29tbWFuZHNcclxuICAgICAgICB0aGlzLmNyZWF0ZUNvbW1hbmRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNwb3NlIHRoZSBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBkaXNwb3NlKCl7XHJcbiAgICAgICAgLy8gZGV0YWNoIGV2ZW50c1xyXG4gICAgICAgIHRoaXMuX21hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyLmV2ZW50T2JzZXJ2YWJsZXNDaGFuZ2VkLmRldGFjaCh0aGlzLl9vYnNlcnZhYmxlc0NoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICB0aGlzLl9tYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlci5kaXNwb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGV4cG9zZWQgY29tbWFuZHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlQ29tbWFuZHMoKSB7XHJcbiAgICAgICAgdGhpcy5fY29tbWFuZENoYW5nZVVzZXIgPSBDb21tYW5kLmNyZWF0ZTx7fSx7fT4odGhpcywgdGhpcy5leGVjdXRlQ29tbWFuZENoYW5nZVVzZXIoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBpbml0aWFsaXplcyB0aGUgZGF0YSBtb2RlbFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBpbml0aWFsaXplKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHRyYWNlIHByb3ZpZGVyXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7TWFwcENvY2twaXRUcmFjZVByb3ZpZGVyfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgdHJhY2VQcm92aWRlcigpOiBNYXBwQ29ja3BpdFRyYWNlUHJvdmlkZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlci50cmFjZVByb3ZpZGVyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY29ubmVjdHMgdGhlIGRhdGEgbW9kZWwgdG8gdGhlIGRhdGEgc291cmNlXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgYXN5bmMgY29ubmVjdCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgICAgICB0cnkge1xyXG5cclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5fbWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXIuYmVnaW5TZXNzaW9uKCk7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuYnJvd3NlQ29tcG9uZW50cygpO1xyXG5cclxuICAgICAgICAgICAgLy8gYWZ0ZXIgY29ubmVjdGluIHN1Y2Nlc3NmdWxseVxyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0T2JzZXJ2ZU1vZGVsQ29ubmVjdGlvbigpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY29tbWFuZENoYW5nZVVzZXIoKTogQ29tbWFuZDx7fSwge30+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29tbWFuZENoYW5nZVVzZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBhdmFpbGFibGUgbWFwcCBjb21wb25lbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnQ+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgY29tcG9uZW50cygpOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb21wb25lbnRzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgZ2V0IGNvbXBvbmVudHNTb3VyY2UoKSA6IFByb3BlcnR5PEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50Pj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb21wb25lbnRzU291cmNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgdXNlckNvbXBvbmVudHNTb3VyY2UoKSA6IFByb3BlcnR5PEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50Pj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl91c2VyQ29tcG9uZW50c1NvdXJjZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBjdXJyZW50IHVzZXIgcm9sZXNcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtzdHJpbmdbXX1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHVzZXJSb2xlcygpIDogUHJvcGVydHk8c3RyaW5nW10+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdXNlclJvbGVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHdyaXRlQWNjZXNzKCk6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIGxldCBtb2RlbEhhc1dyaXRlQWNjZXNzID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMudXNlclJvbGVzLnZhbHVlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSB3cml0ZSBhY2Nlc3MgcmlnaHQgYWNjb3JkaW5nIHRoZSBjdXJyZW50IHJvbGVcclxuICAgICAgICAgICAgbW9kZWxIYXNXcml0ZUFjY2VzcyA9IHRoaXMudXNlclJvbGVzLnZhbHVlLnNvbWUoKHVzZXJSb2xlKT0+eyByZXR1cm4gdXNlclJvbGUgPT09IE1hcHBDb2NrcGl0Q29uZmlndXJhdGlvbi53cml0ZUFjY2Vzc1JvbGUgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbW9kZWxIYXNXcml0ZUFjY2VzcztcclxuICAgIH0gICBcclxuICBcclxuICAgIC8qKlxyXG4gICAgICogQ2xlYXJzIHRoZSBkYXRhIG1vZGVsXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgY2xlYXIoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29tcG9uZW50cyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQnJvd3NlcyBhbGwgYXZhaWxhYmxlIHJlc291cmNlcyBhbmQgdXBkYXRlcyB0aGUgbW9kZWxcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBhc3luYyBicm93c2VDb21wb25lbnRzKCk6IFByb21pc2U8TWFwcENvY2twaXRDb21wb25lbnRbXT4ge1xyXG5cclxuICAgICAgICAvLyBVcGRhdGUgY29tcG9uZW50cyBpbiBtb2RlbFxyXG4gICAgICAgIHRoaXMuX2NvbXBvbmVudHMgPSBhd2FpdCB0aGlzLl9tYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlci5jb21wb25lbnRQcm92aWRlci5icm93c2VDb21wb25lbnRzKCk7XHJcblxyXG4gICAgICAgIGF3YWl0IHRoaXMudXBkYXRlQ29tcG9uZW50TWV0YURhdGEoKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBDb25uZWN0IHRvIG1vZGVsXHJcbiAgICAgICAgdGhpcy5jb25uZWN0Q29tcG9uZW50c1RvTW9kZWwoKTtcclxuXHJcbiAgICAgICAgdGhpcy5jb21wb25lbnRzU291cmNlLnZhbHVlID0gdGhpcy5fY29tcG9uZW50cztcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbXBvbmVudHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25uZWN0cyB0aGUgY29tcG9uZW50cyB0byB0aGUgbWFvbiBkYXRhIG1vZGVsXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbm5lY3RDb21wb25lbnRzVG9Nb2RlbCgpIHtcclxuICAgICAgICB0aGlzLl9jb21wb25lbnRzLmZvckVhY2goKGNvbXBvbmVudCkgPT4geyAoPGFueT5jb21wb25lbnQpLm1vZGVsID0gdGhpczsgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBjb21wb25lbnRzIG1ldGEgZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyB1cGRhdGVDb21wb25lbnRNZXRhRGF0YSgpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2NvbXBvbmVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5icm93c2VNZXRhSW5mbyh0aGlzLl9jb21wb25lbnRzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkcyB0aGUgYXZhaWxhYmxlIHVzZXIgY29tcG9uZW50c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge1Byb3BlcnR5PE1hcHBDb2NrcGl0Q29tcG9uZW50W10+fSBkYXRhTGlua1xyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8TWFwcENvY2twaXRDb21wb25lbnRbXT59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyByZXF1ZXN0UmVhZFVzZXJDb21wb25lbnRzKGRhdGFMaW5rOiBQcm9wZXJ0eTxNYXBwQ29ja3BpdENvbXBvbmVudFtdPik6IFByb21pc2U8TWFwcENvY2twaXRDb21wb25lbnRbXT4ge1xyXG4gICAgICAgIGxldCBjb21wb25lbnRzOiBNYXBwQ29ja3BpdENvbXBvbmVudFtdID0gW107XHJcblxyXG4gICAgICAgIHRyeSB7ICAgICAgXHJcbiAgICAgICAgICAgIC8vIGZpbHRlciBjb21wb25lbnRzIHRvIGJlIGV4cG9zZWQgdG8gdGhlIHVzZXJcclxuICAgICAgICAgICAgY29tcG9uZW50cyA9IHRoaXMuX2NvbXBvbmVudHMuZmlsdGVyKChjb21wb25lbnQpID0+IHsgcmV0dXJuIGNvbXBvbmVudC5tZXRhRGF0YTsgfSk7XHJcblxyXG4gICAgICAgICAgICBjb21wb25lbnRzLmZvckVhY2goKGNvbXBvbmVudCk9PnsgTWFwcENvY2twaXRDb21wb25lbnQucmVnaXN0ZXJVc2VyQ29tcG9uZW50KGNvbXBvbmVudCk7IH0pO1xyXG5cclxuICAgICAgICAgICAgZGF0YUxpbmsucmVhZFJlcXVlc3RFeGVjdXRlZChjb21wb25lbnRzKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgZGF0YUxpbmsucmVhZFJlcXVlc3RSZWplY3RlZChlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb21wb25lbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYnJvd3NlcyB0aGUgbWV0YSBkYXRhLCBwYXJhbWV0ZXJzIGFucyBtZXRob2RzIG9mIGEgc2luZ2xlIGNvbXBvbmVudFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50fSBtYXBwQ29ja3BpdENvbXBvbmVudFxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyBicm93c2VDb21wb25lbnQobWFwcENvY2twaXRDb21wb25lbnQ6IE1hcHBDb2NrcGl0Q29tcG9uZW50KSB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5icm93c2VQYXJhbWV0ZXJzKG1hcHBDb2NrcGl0Q29tcG9uZW50KTtcclxuICAgICAgICBhd2FpdCB0aGlzLmJyb3dzZU1ldGhvZHMobWFwcENvY2twaXRDb21wb25lbnQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWwuYnJvd3NlQ29tcG9uZW50OiAlb1wiLCBtYXBwQ29ja3BpdENvbXBvbmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgYWZ0ZXIgY29tcG9uZW50cyB1cGRhdGVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50W119IG1hcHBDb2NrcGl0Q29tcG9uZW50c1xyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgb25Db21wb25lbnRzVXBkYXRlZChtYXBwQ29ja3BpdENvbXBvbmVudHM6IE1hcHBDb2NrcGl0Q29tcG9uZW50W10pOiBhbnkge1xyXG4gICAgICAgIHRoaXMuZXZlbnRDb21wb25lbnRzVXBkYXRlZC5yYWlzZSh0aGlzLCBtYXBwQ29ja3BpdENvbXBvbmVudHMpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAqIGJyb3dzZXMgdGhlIG1ldGEgaW5mbyBmb3IgYSBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50fSBtYXBwQ29ja3BpdENvbXBvbmVudFxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBhc3luYyBicm93c2VNZXRhSW5mbyhtYXBwQ29ja3BpdENvbXBvbmVudDogTWFwcENvY2twaXRDb21wb25lbnQpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIFVwZGF0ZSBjb21wb25lbnRzIGluIG1vZGVsXHJcbiAgICAgICAgICAgIGxldCBtZXRhSW5mb1JlZmVyZW5jZXMgPSBhd2FpdCB0aGlzLl9tYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlci5icm93c2VNZXRhSW5mbyhtYXBwQ29ja3BpdENvbXBvbmVudCk7XHJcbiAgICAgICAgICAgIGlmIChtZXRhSW5mb1JlZmVyZW5jZXMpIHtcclxuICAgICAgICAgICAgICAgIG1hcHBDb2NrcGl0Q29tcG9uZW50Lm1ldGFEYXRhID0gdGhpcy5yZWFkTWV0YURhdGEobWV0YUluZm9SZWZlcmVuY2VzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtYXBwQ29ja3BpdENvbXBvbmVudC5tZXRhRGF0YTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEJyb3dzZXMgYXZhaWxhYmxlIGNvbXBvbmVudCBwYXJhbWV0ZXJzXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgYXN5bmMgYnJvd3NlUGFyYW1ldGVycyhtYXBwQ29ja3BpdENvbXBvbmVudDogTWFwcENvY2twaXRDb21wb25lbnQpOiBQcm9taXNlPE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10+IHtcclxuICAgICAgICAvLyBVcGRhdGUgY29tcG9uZW50cyBpbiBtb2RlbFxyXG4gICAgICAgIG1hcHBDb2NrcGl0Q29tcG9uZW50LnBhcmFtZXRlcnMgPSBhd2FpdCB0aGlzLl9tYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlci5icm93c2VQYXJhbWV0ZXJzKG1hcHBDb2NrcGl0Q29tcG9uZW50KTtcclxuXHJcbiAgICAgICAgLy8gcmV0cmlldmUgYW5kIHVwZGF0ZSB1c2VyIHBhcmFtZXRlcnNcclxuICAgICAgICBhd2FpdCB0aGlzLnJldHJpZXZlVXNlclBhcmFtZXRlcnMobWFwcENvY2twaXRDb21wb25lbnQpO1xyXG4gICAgICAgXHJcbiAgICAgICAgcmV0dXJuIG1hcHBDb2NrcGl0Q29tcG9uZW50LnBhcmFtZXRlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCcm93c2VzIGFuZCB1cGRhdGVzIHRoZSBtZXRob2RzIGlucHV0IHBhcmFtZXRlcnNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kfSBtYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8TWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXJbXT59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgYXN5bmMgYnJvd3NlTWV0aG9kSW5wdXRQYXJhbWV0ZXJzKG1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCk6IFByb21pc2U8TWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXJbXT4ge1xyXG5cclxuICAgICAgICAvLyBicm93c2UgYW5kIHVwZGF0ZSB0aGUgbWV0aG9kcyBwYXJhbWV0ZXJzXHJcbiAgICAgICAgYXdhaXQgdGhpcy5fbWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXIuYnJvd3NlTWV0aG9kUGFyYW1ldGVycyhbbWFwcENvY2twaXRDb21wb25lbnRNZXRob2RdKTtcclxuXHJcbiAgICAgICAgLy8gTWV0aG9kIGRvZXNuJ3QgbmVlZCB0byBiZSBicm93c2VkIGFnYWluXHJcbiAgICAgICAgbWFwcENvY2twaXRDb21wb25lbnRNZXRob2QuaXNCcm93c2VkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgLy8gdXBkYXRlIHRoZSBwYXJhbWV0ZXIgZGF0YSB0eXBlc1xyXG4gICAgICAgIGF3YWl0IHRoaXMuX21hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyLnVwZGF0ZU1ldGhvZFBhcmFtZXRlckRhdGFUeXBlcyhbbWFwcENvY2twaXRDb21wb25lbnRNZXRob2RdKTsgIFxyXG4gICAgICAgXHJcbiAgICAgICAgcmV0dXJuIG1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLmlucHV0UGFyYW1ldGVycztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHJpZXZlcyB0aGUgY29tcG9uZW50IHBhcmFtZXRlcnMgcmVsZXZhbnQgZm9yIHRoZSB1c2VyLiBUaGV5IGFyZSBzcGVjaWZpZWQgYnkgbWV0YSBkYXRhXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnR9IG1hcHBDb2NrcGl0Q29tcG9uZW50XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyByZXRyaWV2ZVVzZXJQYXJhbWV0ZXJzKG1hcHBDb2NrcGl0Q29tcG9uZW50OiBNYXBwQ29ja3BpdENvbXBvbmVudCkge1xyXG4gICAgICAgIGxldCB3YXRjaGFibGVNZXRhQ29uZmlnID0gWydNZXRhQ29uZmlnV2F0Y2hhYmxlcycsICdXYXRjaGFibGVzU3RydWN0dXJlJywgJ1dhdGNoYWJsZSddO1xyXG4gICAgICAgIGxldCB3YXRjaGFibGVTdGF0ZU1ldGFDb25maWcgPSBbJ01ldGFDb25maWdXYXRjaGFibGVzU3RhdGVzJywgJ1dhdGNoYWJsZXNTdGF0ZXNTdHJ1Y3R1cmUnLCAnV2F0Y2hhYmxlU3RhdGUnXTtcclxuXHJcbiAgICAgICAgbWFwcENvY2twaXRDb21wb25lbnQubWVzc2FnZVBhcmFtZXRlcnMgPSBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm8ucmV0cmlldmVNZXNzYWdlUGFyYW1ldGVycyhtYXBwQ29ja3BpdENvbXBvbmVudC5wYXJhbWV0ZXJzKTtcclxuICAgICAgICBpZiAobWFwcENvY2twaXRDb21wb25lbnQubWV0YURhdGEpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgaWYgKCBtYXBwQ29ja3BpdENvbXBvbmVudC5tZXRhRGF0YS5oYXNPd25Qcm9wZXJ0eShcIlBhcmFtZXRlcnNcIikgJiYgbWFwcENvY2twaXRDb21wb25lbnQubWV0YURhdGFbXCJQYXJhbWV0ZXJzXCJdLmhhc093blByb3BlcnR5KFwiV2F0Y2hhYmxlXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBtYXBwQ29ja3BpdENvbXBvbmVudC53YXRjaGFibGVQYXJhbWV0ZXJzID0gTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvLnJldHJpZXZlV2F0Y2hhYmxlUGFyYW1ldGVycyhtYXBwQ29ja3BpdENvbXBvbmVudC5wYXJhbWV0ZXJzLCB3YXRjaGFibGVNZXRhQ29uZmlnKTtcclxuICAgICAgICAgICAgICAgIGlmIChtYXBwQ29ja3BpdENvbXBvbmVudC53YXRjaGFibGVQYXJhbWV0ZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9tYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlci51cGRhdGVQYXJhbWV0ZXJEYXRhVHlwZXMobWFwcENvY2twaXRDb21wb25lbnQud2F0Y2hhYmxlUGFyYW1ldGVycyk7ICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mby51cGRhdGVQYXJhbWV0ZXIobWFwcENvY2twaXRDb21wb25lbnQud2F0Y2hhYmxlUGFyYW1ldGVycywgbWFwcENvY2twaXRDb21wb25lbnQubWV0YURhdGFbXCJQYXJhbWV0ZXJzXCJdW1wiV2F0Y2hhYmxlXCJdKTsgICAgIFxyXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICBcclxuICAgXHJcbiAgICAgICAgICAgIGlmICggbWFwcENvY2twaXRDb21wb25lbnQubWV0YURhdGEuaGFzT3duUHJvcGVydHkoXCJQYXJhbWV0ZXJzXCIpICYmIG1hcHBDb2NrcGl0Q29tcG9uZW50Lm1ldGFEYXRhW1wiUGFyYW1ldGVyc1wiXS5oYXNPd25Qcm9wZXJ0eShcIkNvbmZpZ3VyYXRpb25cIikpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBtYXBwQ29ja3BpdENvbXBvbmVudC5jb25maWd1cmF0aW9uUGFyYW1ldGVycyA9IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mby5yZXRyaWV2ZUNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzKG1hcHBDb2NrcGl0Q29tcG9uZW50LnBhcmFtZXRlcnMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1hcHBDb2NrcGl0Q29tcG9uZW50LmNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9tYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlci51cGRhdGVQYXJhbWV0ZXJEYXRhVHlwZXMobWFwcENvY2twaXRDb21wb25lbnQuY29uZmlndXJhdGlvblBhcmFtZXRlcnMpOyAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mby51cGRhdGVQYXJhbWV0ZXIobWFwcENvY2twaXRDb21wb25lbnQuY29uZmlndXJhdGlvblBhcmFtZXRlcnMsIG1hcHBDb2NrcGl0Q29tcG9uZW50Lm1ldGFEYXRhW1wiUGFyYW1ldGVyc1wiXVtcIkNvbmZpZ3VyYXRpb25cIl0pOyAgICAgXHJcbiAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9ICAgXHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoIG1hcHBDb2NrcGl0Q29tcG9uZW50Lm1ldGFEYXRhLmhhc093blByb3BlcnR5KFwiUGFyYW1ldGVyc1wiKSAmJiBtYXBwQ29ja3BpdENvbXBvbmVudC5tZXRhRGF0YVtcIlBhcmFtZXRlcnNcIl0uaGFzT3duUHJvcGVydHkoXCJXYXRjaGFibGVTdGF0ZVwiKSAmJiBtYXBwQ29ja3BpdENvbXBvbmVudC53YXRjaGFibGVQYXJhbWV0ZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIG1hcHBDb2NrcGl0Q29tcG9uZW50LndhdGNoYWJsZVN0YXRlUGFyYW1ldGVycyA9IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mby5yZXRyaWV2ZVdhdGNoYWJsZVN0YXRlcyhtYXBwQ29ja3BpdENvbXBvbmVudC53YXRjaGFibGVQYXJhbWV0ZXJzLCB3YXRjaGFibGVTdGF0ZU1ldGFDb25maWcpOyAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogd3JpdGVzIHRoZSB2YWx1ZSB0byBjb21wb25lbnQgcGFyYW1ldGVyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcn0gcGFyYW1ldGVyXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgYXN5bmMgd3JpdGVDb21wb25lbnRQYXJhbWV0ZXIocGFyYW1ldGVyOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcikge1xyXG4gICAgICAgIGF3YWl0IHRoaXMuX21hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyLndyaXRlUGFyYW1ldGVyVmFsdWUocGFyYW1ldGVyLCBwYXJhbWV0ZXIudmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYnJvd3NlcyB0aGUgY29tcG9uZW50IG1ldGhvZHNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50fSBtYXBwQ29ja3BpdENvbXBvbmVudFxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8TWFwcENvY2twaXRDb21wb25lbnRNZXRob2RbXT59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgYXN5bmMgYnJvd3NlTWV0aG9kcyhtYXBwQ29ja3BpdENvbXBvbmVudDogTWFwcENvY2twaXRDb21wb25lbnQpOiBQcm9taXNlPE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kW10+IHtcclxuICAgICAgICBsZXQgbWV0aG9kc01ldGFDb25maWcgPSBbJ01ldGFDb25maWdDb21tYW5kcycsICdDb21tYW5kc1N0cnVjdHVyZScsICdDb21tYW5kJ107XHJcbiAgICAgICAgbGV0IHF1aWNrQ29tbWFuZHNNZXRhQ29uZmlnID0gWydNZXRhQ29uZmlnUXVpY2tDb21tYW5kcycsICdRdWlja0NvbW1hbmRzU3RydWN0dXJlJywgJ1F1aWNrQ29tbWFuZCddO1xyXG5cclxuICAgICAgICAvLyBVcGRhdGUgY29tcG9uZW50IG1ldGhvZHMgaW4gbW9kZWxcclxuICAgICAgICBtYXBwQ29ja3BpdENvbXBvbmVudC5tZXRob2RzID0gYXdhaXQgdGhpcy5fbWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXIuYnJvd3NlTWV0aG9kcyhtYXBwQ29ja3BpdENvbXBvbmVudCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZmlsdGVyIHRoZSBtZXRob2RzIHRvIHRoZSBvbmVzIHNwZWNlZmllZCBieSBtZXRhIGluZm9cclxuICAgICAgICBtYXBwQ29ja3BpdENvbXBvbmVudC51c2VyTWV0aG9kcyA9IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mby5yZXRyaWV2ZUV4ZWN1dGFibGVNZXRob2RzKG1hcHBDb2NrcGl0Q29tcG9uZW50Lm1ldGhvZHMsIG1ldGhvZHNNZXRhQ29uZmlnKTtcclxuICAgICAgICBtYXBwQ29ja3BpdENvbXBvbmVudC5xdWlja0NvbW1hbmRzID0gTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvLnJldHJpZXZlUXVpY2tDb21tYW5kcyhtYXBwQ29ja3BpdENvbXBvbmVudC5tZXRob2RzLCBxdWlja0NvbW1hbmRzTWV0YUNvbmZpZyk7XHJcbiAgICAgICAgcmV0dXJuIG1hcHBDb2NrcGl0Q29tcG9uZW50Lm1ldGhvZHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRyaWV2ZXMgdGhlIG1ldGhvZHMgcmVsZXZhbnQgZm9yIHRoZSB1c2VyLiBUaGV5IGFyZSBzcGVjaWZpZWQgYnkgbWV0YSBkYXRhXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnR9IG1hcHBDb2NrcGl0Q29tcG9uZW50XHJcbiAgICAgKiBAcGFyYW0geyp9IGNvbXBvbmVudE1ldGhvZHNcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJldHJpZXZlVXNlck1ldGhvZHMobWFwcENvY2twaXRDb21wb25lbnQ6IE1hcHBDb2NrcGl0Q29tcG9uZW50LCBjb21wb25lbnRNZXRob2RzOiBhbnkpOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFtdIHtcclxuICAgICAgICBsZXQgdXNlck1ldGhvZHM6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kW10gPSBbXTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAobWFwcENvY2twaXRDb21wb25lbnQubWV0YURhdGEgJiYgIG1hcHBDb2NrcGl0Q29tcG9uZW50Lm1ldGFEYXRhLmhhc093blByb3BlcnR5KFwiTWV0aG9kc1wiKSAmJiBtYXBwQ29ja3BpdENvbXBvbmVudC5tZXRhRGF0YVtcIk1ldGhvZHNcIl0uaGFzT3duUHJvcGVydHkoXCJFeGVjdXRhYmxlXCIpKSB7XHJcbiAgICAgICAgICAgIGxldCBtZXRob2RzTWV0YSA9IG1hcHBDb2NrcGl0Q29tcG9uZW50Lm1ldGFEYXRhW1wiTWV0aG9kc1wiXVtcIkV4ZWN1dGFibGVcIl07XHJcbiAgICAgICAgICAgIHVzZXJNZXRob2RzID0gY29tcG9uZW50TWV0aG9kcy5maWx0ZXIoKG1ldGhvZCkgPT4geyByZXR1cm4gbWV0aG9kc01ldGFbbWV0aG9kLmJyb3dzZU5hbWVdOyB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVzZXJNZXRob2RzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmVhZHMgdGhlIG1ldGEgaW5mb3MgaW50byBhIHNpbmdsZSBvYmplY3RcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSBtZXRhUGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlYWRNZXRhRGF0YShtZXRhUGFyYW1ldGVyczogQXJyYXk8c3RyaW5nPikge1xyXG4gICAgICAgIGxldCBtZXRhRGF0YSA9IHt9O1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBtZXRhUGFyYW1ldGVycy5mb3JFYWNoKChtZXRhUGFyYW1ldGVyOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKG1ldGFQYXJhbWV0ZXIudmFsdWUgPT0gXCJcIil7IC8vIEZhbGxiYWNrOiBVc2UgZW1wdHkgb2JqZWN0IGluIGNhc2Ugb2YgZW1wdHkgbWV0YUluZm9cclxuICAgICAgICAgICAgICAgICAgICBtZXRhUGFyYW1ldGVyLnZhbHVlID0gXCJ7fVwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbWV0YURhdGFbbWV0YVBhcmFtZXRlci5icm93c2VOYW1lXSA9IEpTT04ucGFyc2UobWV0YVBhcmFtZXRlci52YWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9Vc2UgZm9yIHByb3RvdHlwaW5nXHJcbiAgICAgICAgICAgICAgICAvLyB2YXIgd2F0Y2hzdGF0ZU1ldGFEYXRhID0gJ3tcIldhdGNoYWJsZXNTdGF0ZXNTdHJ1Y3R1cmVcIjp7XCJTY29wZVwiOlwibWFwcC9Nb3Rpb24vQXhpcy9BY3BBeGlzXCIsXCJDaGlsZHNcIjpbe1wiR3JvdXBcIjp7XCJEaXNwbGF5TmFtZVwiOlwiTWFpblwiLFwiQ2hpbGRzXCI6W3tcIldhdGNoYWJsZVN0YXRlXCI6e1wiTmFtZVwiOlwiQXhpc19zdGF0ZVwiLFwiUGFyYW1ldGVyc1wiOltcIlBsY09wZW4gU3RhdGVcIixcIkNvbW11bmljYXRpb24gUmVhZHlcIl0sXCJFeHByZXNzaW9uXCI6XCJDb21tdW5pY2F0aW9uIFJlYWR5ID09IGZhbHNlID8gMSA6IFBsY09wZW4gU3RhdGUgPT0gMSA/IDIgOiBQbGNPcGVuIFN0YXRlID09IDIgPyAzIDogUGxjT3BlbiBTdGF0ZSA9PSAzIG9yIFBsY09wZW4gU3RhdGUgPT0gNCBvciBQbGNPcGVuIFN0YXRlID09IDUgPyA0IDogUGxjT3BlbiBTdGF0ZSA9PSA2ID8gNSA6IFBsY09wZW4gU3RhdGUgPT0gNyA/IDYgOiAwXCIsXCJJY29uXCI6e1wiMFwiOntcIkltYWdlTmFtZVwiOlwiYXhpc19kaXNhYmxlZFwiLFwiVG9vbHRpcFwiOlwiQXhpcyBpcyBkaXNhYmxlZFwifSxcIjFcIjp7XCJJbWFnZU5hbWVcIjpcImNvbW11bmljYXRpb25Ob3RSZWFkeVwiLFwiVG9vbHRpcFwiOlwiQ29tbXVuaWNhdGlvbiBpcyBub3QgcmVhZHlcIn0sXCIyXCI6e1wiSW1hZ2VOYW1lXCI6XCJheGlzX3N0YW5kc3RpbGxcIixcIlRvb2x0aXBcIjpcIkF4aXMgaXMgc3RhbmRzdGlsbFwifSxcIjNcIjp7XCJJbWFnZU5hbWVcIjpcImF4aXNfZXJyb3JcIixcIlRvb2x0aXBcIjpcIkF4aXMgaXMgaW4gZXJyb3Igc3RhdGVcIn0sXCI0XCI6e1wiSW1hZ2VOYW1lXCI6XCJheGlzX21vdGlvblwiLFwiVG9vbHRpcFwiOlwiQXhpcyBpcyBtb3ZpbmdcIn0sXCI1XCI6e1wiSW1hZ2VOYW1lXCI6XCJheGlzX3N5bmNocm9uaXplZF9tb3Rpb25cIixcIlRvb2x0aXBcIjpcIkF4aXMgaXMgc3luY2hyb25pemVkXCJ9LFwiNlwiOntcIkltYWdlTmFtZVwiOlwiYXhpc19ob21pbmdcIixcIlRvb2x0aXBcIjpcIkF4aXMgaXMgaG9taW5nXCJ9fX19LHtcIldhdGNoYWJsZVN0YXRlXCI6e1wiTmFtZVwiOlwiQ29udHJvbGxlcl9zdGF0ZVwiLFwiUGFyYW1ldGVyc1wiOltcIklzIFBvd2VyZWRcIl0sXCJFeHByZXNzaW9uXCI6XCJJcyBQb3dlcmVkID09IHRydWUgPyAxIDogMFwiLFwiSWNvblwiOntcIjBcIjp7XCJJbWFnZU5hbWVcIjpcImNvbnRyb2xsZXJfb2ZmXCIsXCJUb29sdGlwXCI6XCJDb250cm9sbGVyIGlzIHN3aXRjaGVkIG9mZlwifSxcIjFcIjp7XCJJbWFnZU5hbWVcIjpcImNvbnRyb2xsZXJfb25cIixcIlRvb2x0aXBcIjpcIkNvbnRyb2xsZXIgaXMgc3dpdGNoZWQgb25cIn19fX0se1wiV2F0Y2hhYmxlU3RhdGVcIjp7XCJOYW1lXCI6XCJBeGlzX3JlZmVyZW5jZV9zdGF0ZVwiLFwiUGFyYW1ldGVyc1wiOltcIklzIEhvbWVkXCJdLFwiRXhwcmVzc2lvblwiOlwiSXMgSG9tZWQgPT0gdHJ1ZSA/IDEgOiAwXCIsXCJJY29uXCI6e1wiMFwiOntcIkltYWdlTmFtZVwiOlwibm90SG9tZWRcIixcIlRvb2x0aXBcIjpcIkF4aXMgaXMgbm90IGhvbWVkXCJ9LFwiMVwiOntcIkltYWdlTmFtZVwiOlwiaG9tZWRcIixcIlRvb2x0aXBcIjpcIkF4aXMgaXMgaG9tZWRcIn19fX1dfX1dfX0nOyBcclxuICAgICAgICAgICAgICAgIC8vIG1ldGFEYXRhWydNZXRhQ29uZmlnV2F0Y2hhYmxlc1N0YXRlcyddID0gSlNPTi5wYXJzZSh3YXRjaHN0YXRlTWV0YURhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHZhciBxdWlja01ldGhvZCA9ICcge1wiUXVpY2tDb21tYW5kc1N0cnVjdHVyZVwiOntcIlNjb3BlXCI6XCJtYXBwL01vdGlvbi9BeGlzL0FjcEF4aXNcIixcIkNoaWxkc1wiOlt7XCJHcm91cFwiOntcIkRpc3BsYXlOYW1lXCI6XCJNYWluXCIsXCJDaGlsZHNcIjpbe1wiUXVpY2tDb21tYW5kXCI6e1wiUmVmXCI6XCJQb3dlciBPblwiLFwiVG9vbHRpcFwiOlwiUG93ZXIgb25cIixcIkltYWdlTmFtZVwiOlwiT25cIn19LHtcIlF1aWNrQ29tbWFuZFwiOntcIlJlZlwiOlwiUG93ZXIgT2ZmXCIsXCJUb29sdGlwXCI6XCJQb3dlciBvZmZcIixcIkltYWdlTmFtZVwiOlwiT2ZmXCJ9fSx7XCJRdWlja0NvbW1hbmRcIjp7XCJSZWZcIjpcIkFib3J0IENvbW1hbmRcIixcIlRvb2x0aXBcIjpcIkFib3J0IGNvbW1hbmRcIixcIkltYWdlTmFtZVwiOlwiU3RvcFwifX0se1wiUXVpY2tDb21tYW5kXCI6e1wiUmVmXCI6XCJSZXNldFwiLFwiVG9vbHRpcFwiOlwiUmVzZXRcIixcIkltYWdlTmFtZVwiOlwiUmVzZXRcIn19XX19XX19ICdcclxuICAgICAgICAgICAgICAgIC8vIG1ldGFEYXRhWydNZXRhQ29uZmlnUXVpY2tDb21tYW5kcyddID0gSlNPTi5wYXJzZShxdWlja01ldGhvZCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gdXBkYXRlIHNwZWNpZmljIHBhcmFtZXRlciB0eXBlcyBpbiBtZXRhIGRhdGEgb2JqZWN0XHJcbiAgICAgICAgICAgIE1hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyLmluaXRpYWxpemVNZXRhRGF0YShtZXRhRGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsLmJyb3dzZU1ldGFEYXRhOiBjb3VsZCBub3QgcGFyc2UgbWV0YSBkYXRhOiBcIiArIGUubWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtZXRhRGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBleGVjdXRlQ29tcG9uZW50TWV0aG9kKGNvbXBvbmVudE1ldGhvZDogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9tYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlci5leGVjdXRlQ29tcG9uZW50TWV0aG9kKGNvbXBvbmVudE1ldGhvZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjYWxsZWQgYWZ0ZXIgY29tcG9uZW50IHBhcmFtZXRlcnMgaGF2ZSBiZWVuIHVwZGF0ZWRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IGNvbXBvbmVudFBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIC8vIFRPRE86IG9ic29sZXRlPyBlbHNlIGNhbiBjb21wb25lbnQgYmUgcmVtb3ZlZD9cclxuICAgIG9uQ29tcG9uZW50UGFyYW1ldGVyc1VwZGF0ZWQoY29tcG9uZW50OiBNYXBwQ29ja3BpdENvbXBvbmVudCwgY29tcG9uZW50UGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSk6IGFueSB7XHJcbiAgICAgICAgdGhpcy5ldmVudENvbXBvbmVudFBhcmFtZXRlcnNVcGRhdGVkLnJhaXNlKHRoaXMsIG5ldyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3ModGhpcywgTW9kZWxDaGFuZ2VUeXBlLnVwZGF0ZVRhcmdldCwgXCJ1cGRhdGVkQ29tcG9uZW50UGFyYW1ldGVyc1wiLCBjb21wb25lbnRQYXJhbWV0ZXJzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjYWxsZWQgYWZ0ZXIgY29tcG9uZW50IG1ldGhvZHMgaGF2ZSBiZWVuIHVwZGF0ZWRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50fSBjb21wb25lbnRcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gY29tcG9uZW50TWV0aG9kc1xyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgLy8gVE9ETzogb2Jzb2xldGU/IGVsc2UgY2FuIGNvbXBvbmVudCBiZSByZW1vdmVkP1xyXG4gICAgb25Db21wb25lbnRNZXRob2RzVXBkYXRlZChjb21wb25lbnQ6IE1hcHBDb2NrcGl0Q29tcG9uZW50LCBjb21wb25lbnRNZXRob2RzOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFtdKTogYW55IHtcclxuICAgICAgICB0aGlzLmV2ZW50Q29tcG9uZW50TWV0aG9kc1VwZGF0ZWQucmFpc2UodGhpcywgbmV3IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyh0aGlzLCBNb2RlbENoYW5nZVR5cGUudXBkYXRlVGFyZ2V0LCBcInVwZGF0ZWRDb21wb25lbnRNZXRob2RzXCIsIGNvbXBvbmVudE1ldGhvZHMpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlYWRzICBhbmQgdXBkYXRlcyB0aGUgcGFyYW1ldGVyIHZhbHVlcyBvZiB0aGUgc3BlY2lmaWVkIHBhcmFtZXRlciBsaXN0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSBjb21wb25lbnRQYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBhc3luYyByZWFkUGFyYW1ldGVyVmFsdWVzKGNvbXBvbmVudFBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIGF3YWl0IHRoaXMuX21hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyLnJlYWRQYXJhbWV0ZXJWYWx1ZXMoY29tcG9uZW50UGFyYW1ldGVycyk7XHJcbiAgICAgICAgdGhpcy5vblBhcmFtZXRlclZhbHVlc1VwZGF0ZWQoY29tcG9uZW50UGFyYW1ldGVycyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBvYnNlcnZlcyB0aGUgcGFyYW1ldGVycyBmb3IgdmFsdWUgY2hhbmdlc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SU9ic2VydmVyfSBvYnNlcnZlclxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW1bXX0gb2JzZXJ2YWJsZURhdGFNb2RlbEl0ZW1zXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIG9ic2VydmVEYXRhTW9kZWxJdGVtcyhvYnNlcnZlcjogSU9ic2VydmVyLCBvYnNlcnZhYmxlRGF0YU1vZGVsSXRlbXM6IE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbVtdKTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICBhd2FpdCB0aGlzLl9tYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlci5vYnNlcnZlQ29tcG9uZW50TW9kZWxJdGVtcyhvYnNlcnZlciwgb2JzZXJ2YWJsZURhdGFNb2RlbEl0ZW1zKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVub2JzZXJ2ZXMgdGhlIHBhc3NlZCBwYXJhbWV0ZXJzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gb2JzZXJ2ZXJcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gb2JzZXJ2YWJsZVBhcmFtZXRlcnNcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gc3VzcGVuZFxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIHVub2JzZXJ2ZUNvbXBvbmVudE1vZGVsSXRlbXMob2JzZXJ2ZXI6IGFueSwgb2JzZXJ2YWJsZVBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10sIHN1c3BlbmQ6Ym9vbGVhbikge1xyXG4gICAgICAgIGF3YWl0IHRoaXMuX21hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyLnVub2JzZXJ2ZUNvbXBvbmVudE1vZGVsSXRlbXMob2JzZXJ2ZXIsIG9ic2VydmFibGVQYXJhbWV0ZXJzLHN1c3BlbmQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogaGFuZGxlcyBvYnNlcnZhYmxlIGNoYW5nZWQgbm90aWZpY2F0aW9uc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50T2JzZXJ2ZWRJdGVtc0NoYW5nZWRBcmdzfSBldmVudEFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGhhbmRsZU9ic2VydmFibGVJdGVtc0NoYW5nZWQoZXZlbnRBcmdzOiBFdmVudE9ic2VydmVkSXRlbXNDaGFuZ2VkQXJncykge1xyXG5cclxuICAgICAgICBpZiAoZXZlbnRBcmdzLm9ic2VydmVyIGluc3RhbmNlb2YgRGF0YU1vZGVsQmFzZSkge1xyXG5cclxuICAgICAgICAgICAgLy8gY3JlYXRlIG1vZGVsIGNoYW5nZWQgYXJnc1xyXG4gICAgICAgICAgICBsZXQgbW9kZWxJdGVtc0NoYW5nZWRBcmdzID0gbmV3IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyhldmVudEFyZ3Mub2JzZXJ2ZXIsIE1vZGVsQ2hhbmdlVHlwZS51cGRhdGVUYXJnZXQsIFwiY2hhbmdlZCBvYnNlcnZhYmxlc1wiLCBldmVudEFyZ3MuY2hhbmdlZEl0ZW1zKTtcclxuICAgICAgICAgICAgLy8gbm90aWZ5IG9ic2VydmVycyBmcm9tIGNoYW5naW5nIG1vZGVsIGl0ZW1zXHJcbiAgICAgICAgICAgIGV2ZW50QXJncy5vYnNlcnZlci5vbk1vZGVsSXRlbXNDaGFuZ2VkKGV2ZW50QXJncy5vYnNlcnZlciwgbW9kZWxJdGVtc0NoYW5nZWRBcmdzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBub3RpZnkgZnJvbSB1cGRhdGluZyB0aGUgc3BlY2lmaWVkIHBhcmFtZXRlcnMgdmFsdWVzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSBjb21wb25lbnRQYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uUGFyYW1ldGVyVmFsdWVzVXBkYXRlZChjb21wb25lbnRQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdKTogYW55IHtcclxuICAgICAgICB0aGlzLmV2ZW50UGFyYW1ldGVyVmFsdWVzVXBkYXRlZC5yYWlzZSh0aGlzLCBjb21wb25lbnRQYXJhbWV0ZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCB3aGVuIHRoZSBtb2RlbCBoYXMgYmVlbiBzdWNjZXNzZnVsbHkgY29ubmVjdGVkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uTW9kZWxDb25uZWN0ZWQoKSB7XHJcblxyXG4gICAgICAgIHRoaXMuX21vZGVsQ29ubmVjdGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm9uTW9kZWxDb25uZWN0aW9uQ2hhbmdlZCh0aGlzLl9tb2RlbENvbm5lY3RlZCk7IFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIHdoZW4gdGhlIG1vZGVsIGhhcyBsb3N0IHRoZSBjb25uZWN0aW9uIHRvIHRoZSB0YXJnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25Nb2RlbERpc2Nvbm5lY3RlZCgpIHtcclxuICAgICAgICAvLyBub3RpZnkgY29ubmVjdGlvbiBjaGFuZ2VcclxuICAgICAgICB0aGlzLl9tb2RlbENvbm5lY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMub25Nb2RlbENvbm5lY3Rpb25DaGFuZ2VkKHRoaXMuX21vZGVsQ29ubmVjdGVkKTsgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPYnNlcnZlcyB0aGUgY29ubmVjdGlvbiBpZiBpdCBpcyBzdGlsbCBhbGl2ZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhcnRPYnNlcnZlTW9kZWxDb25uZWN0aW9uKCk6IGFueSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gaW5pdGlhbGx5IG5vdGlmeSB0aGUgc3VjY2Vzc2Z1bGwgY29ubmVjdGlvblxyXG4gICAgICAgIHRoaXMub25Nb2RlbENvbm5lY3RlZCgpO1xyXG5cclxuICAgICAgICAvLyBlc3RhYmxpc2ggYSB0aW1lciBmb3Igd2F0Y2hpbmcgdGhlIGNvbm5lY3Rpb25cclxuICAgICAgICBpZiAodGhpcy5fY29ubmVjdGlvbk9ic2VydmF0aW9uVGltZXJJZCA9PSAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jb25uZWN0aW9uT2JzZXJ2YXRpb25UaW1lcklkID0gc2V0SW50ZXJ2YWwoYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5vYnNlcnZlTW9kZWxDb25uZWN0aW9uKCk7XHJcbiAgICAgICAgICAgIH0sIHRoaXMuX2Nvbm5lY3Rpb25PYnNlcnZhdGlvbkludGVydmFsKTsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPYnNlcmV2ZXMgdGhlIG1vZGVsIGNvbm5lY3Rpb24gXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBvYnNlcnZlTW9kZWxDb25uZWN0aW9uKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHJlYWQgdGhlIGNvbm5lY3Rpb24gc3RhdGVcclxuICAgICAgICBsZXQgaXNDb25uZWN0ZWQgPSBhd2FpdCB0aGlzLl9tYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlci5jaGVja1RhcmdldENvbm5lY3Rpb24oKTsgICBcclxuIFxyXG4gICAgICAgIGlmIChpc0Nvbm5lY3RlZCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX21vZGVsQ29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uTW9kZWxDb25uZWN0ZWQoKTtcclxuICAgICAgICAgICAgfSAgICAgICBcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX21vZGVsQ29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uTW9kZWxEaXNjb25uZWN0ZWQoKTsgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgd2hlbiB0aGUgbW9kZWwgY29ubmVjdGlvbiBoYXMgY2hhbmdlZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gY29ubmVjdGVkXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBvbk1vZGVsQ29ubmVjdGlvbkNoYW5nZWQoY29ubmVjdGVkOmJvb2xlYW4pOiBhbnkge1xyXG4gICAgICAgIHRoaXMuZXZlbnRNb2RlbENvbm5lY3Rpb25DaGFuZ2VkLnJhaXNlKHRoaXMsY29ubmVjdGVkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFByb3ZpZGVzIGNvbW1hbmQgZm9yIGNoYW5naW5nIHRoZSB1c2VyIHRvIGJlIGxvZ2dlZCBpblxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtJQ29tbWFuZEV4ZWN1dGlvbkRlbGVnYXRlPGFueSxhbnk+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIGV4ZWN1dGVDb21tYW5kQ2hhbmdlVXNlcigpOiBJQ29tbWFuZEV4ZWN1dGlvbkRlbGVnYXRlPGFueSxhbnk+IHtcclxuICAgICAgICByZXR1cm4gYXN5bmMgKHVzZXJJbmZvOiB7fSwgY29tbWFuZFJlc3BvbnNlOiBJQ29tbWFuZEV4ZWN1dGlvblJlc3BvbnNlRGVsZWdhdGU8YW55PikgPT4ge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSB1c2VyIHJvbGVzXHJcbiAgICAgICAgICAgICAgICB0aGlzLl91c2VyUm9sZXMudmFsdWUgPSAgYXdhaXQgdGhpcy5fbWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXIuY2hhbmdlVXNlcih1c2VySW5mbykgYXMgc3RyaW5nW107XHJcbiAgICAgICAgICAgICAgICBjb21tYW5kUmVzcG9uc2UuZXhlY3V0ZWQodGhpcy5fdXNlclJvbGVzKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbW1hbmRSZXNwb25zZS5yZWplY3RlZChlcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbCB9OyJdfQ==