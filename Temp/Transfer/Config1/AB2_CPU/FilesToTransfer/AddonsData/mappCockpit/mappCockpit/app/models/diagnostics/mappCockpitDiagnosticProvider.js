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
define(["require", "exports", "../../communication/rest/opcUaRestServices", "./mappCockpitComponentProvider", "./mappCockpitCommonInfoProvider", "./trace/mappCockpitTraceProvider", "./mappCockpitDiagnosticMonitoringProvider", "../../framework/events"], function (require, exports, opcUaRestServices_1, mappCockpitComponentProvider_1, mappCockpitCommonInfoProvider_1, mappCockpitTraceProvider_1, mappCockpitDiagnosticMonitoringProvider_1, events_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventObservablesChanged = /** @class */ (function (_super) {
        __extends(EventObservablesChanged, _super);
        function EventObservablesChanged() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventObservablesChanged;
    }(events_1.TypedEvent));
    ;
    /**
     * Implements the mapp cockpit diagnostic provider
     *
     * @class MappCockpitDiagnosticProvider
     */
    var MappCockpitDiagnosticProvider = /** @class */ (function () {
        /**
         * Creates an instance of MappCockpitDiagnosticProvider.
         * @memberof MappCockpitDiagnosticProvider
         */
        function MappCockpitDiagnosticProvider(dataModel) {
            var _this = this;
            // Holds the currently acive session id
            this._sessionId = -1;
            // Holds the mapp cockpit nmespace index
            this._namespaceIndex = -1;
            this._observedItemsChangedHandler = function (sender, eventArgs) { _this.handleObservableChanged(sender, eventArgs); };
            // Initialize members
            this._dataModel = dataModel;
            this._componentProvider = new mappCockpitComponentProvider_1.MappCockpitComponentProvider(this);
            this._traceProvider = new mappCockpitTraceProvider_1.MappCockpitTraceProvider(this);
            this._monitoringProvider = new mappCockpitDiagnosticMonitoringProvider_1.MappCockpitDiagnosticMonitoringProvider(this);
            this._commonInfoProvider = mappCockpitCommonInfoProvider_1.MappCockpitCommonInfoProvider.getInstance();
            this.eventObservablesChanged = new EventObservablesChanged();
            // attach events 
            this._monitoringProvider.eventObservedItemsChanged.attach(this._observedItemsChangedHandler);
        }
        /**
         * Dispose the MappCockpitDiagnosticProvider
         *
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.dispose = function () {
            var _this = this;
            // detach events 
            this._monitoringProvider.eventObservedItemsChanged.detach(this._observedItemsChangedHandler);
            // terminate the current session
            (function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.endSession()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); })();
        };
        Object.defineProperty(MappCockpitDiagnosticProvider.prototype, "componentProvider", {
            /**
             * Gets the component provider
             *
             * @readonly
             * @type {MappCockpitTraceProvider}
             * @memberof MappCockpitDiagnosticProvider
             */
            get: function () {
                return this._componentProvider;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitDiagnosticProvider.prototype, "model", {
            /**
             * Gets the data model
             *
             * @readonly
             * @type {MappCockpitComponentDataModel}
             * @memberof MappCockpitDiagnosticProvider
             */
            get: function () {
                return this._dataModel;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitDiagnosticProvider.prototype, "traceProvider", {
            /**
             * Gets the trace provider
             *
             * @readonly
             * @type {MappCockpitTraceProvider}
             * @memberof MappCockpitDiagnosticProvider
             */
            get: function () {
                return this._traceProvider;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitDiagnosticProvider.prototype, "sessionId", {
            /**
             * Returns the current session id
             *
             * @readonly
             * @type {string}
             * @memberof MappCockpitDiagnosticProvider
             */
            get: function () {
                return this._sessionId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitDiagnosticProvider.prototype, "namespaceIndex", {
            /**
             * Returns the effective namespace index
             *
             * @readonly
             * @type {number}
             * @memberof MappCockpitDiagnosticProvider
             */
            get: function () {
                return this._namespaceIndex;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitDiagnosticProvider.prototype, "namespace", {
            /**
             * Returns the mapp cockpit namespace
             *
             * @readonly
             * @type {string}
             * @memberof MappCockpitDiagnosticProvider
             */
            get: function () {
                return opcUaRestServices_1.OpcUaRestServices.mappCockpitNamespacePrefix + this._namespaceIndex;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * starts a diagnostic session
         *
         * @private
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.beginSession = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, error_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 7, , 8]);
                            // get opc ua address
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.readOpcUaLocalIp()];
                        case 1:
                            // get opc ua address
                            _b.sent();
                            // authenticate 
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.authenticate()];
                        case 2:
                            // authenticate 
                            _b.sent();
                            // create a socket connection for receiving opc-ua events
                            return [4 /*yield*/, this._monitoringProvider.createOpcUaSocket()];
                        case 3:
                            // create a socket connection for receiving opc-ua events
                            _b.sent();
                            console.log('MappCockpitDiagnosticProvider: created web socket ');
                            // create a session
                            return [4 /*yield*/, this.createSession()];
                        case 4:
                            // create a session
                            _b.sent();
                            console.log("MappCockpitDiagnosticProvider: created session: %o", this.sessionId);
                            // read the namespace index for further access
                            _a = this;
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.getNamespaceIndex(this.sessionId)];
                        case 5:
                            // read the namespace index for further access
                            _a._namespaceIndex = _b.sent();
                            console.log("MappCockpitDiagnosticProvider: got namespace index: %o", this._namespaceIndex);
                            // initialize common info provider 
                            return [4 /*yield*/, this._commonInfoProvider.initialize(this.sessionId, this._namespaceIndex)];
                        case 6:
                            // initialize common info provider 
                            _b.sent();
                            return [3 /*break*/, 8];
                        case 7:
                            error_1 = _b.sent();
                            console.log(error_1);
                            return [3 /*break*/, 8];
                        case 8: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Creates a new session if not already available.
         *
         * @private
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.createSession = function () {
            return __awaiter(this, void 0, void 0, function () {
                var newSessionId;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(this._sessionId === -1)) return [3 /*break*/, 2];
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.createSession()];
                        case 1:
                            newSessionId = _a.sent();
                            this._sessionId = newSessionId;
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * terminates a diagnostic session
         *
         * @private
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.endSession = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this._monitoringProvider.close();
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.deleteSession(this.sessionId)];
                        case 1:
                            _a.sent();
                            this._sessionId = -1;
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Checks is the connection to the target is still valid
         *
         * @returns {*}
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.checkTargetConnection = function () {
            return __awaiter(this, void 0, void 0, function () {
                var connected, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            connected = false;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            // we access the mapp cockpit roots description atribute as live check. The connection is valid if the attribute could be read successfully.
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.readNodeAttribute(this.sessionId, this.namespace + ";" + opcUaRestServices_1.OpcUaRestServices.mappCockpitRootNodeId, opcUaRestServices_1.OpcUaAttribute.DESCRIPTION)];
                        case 2:
                            // we access the mapp cockpit roots description atribute as live check. The connection is valid if the attribute could be read successfully.
                            _a.sent();
                            connected = true;
                            return [3 /*break*/, 4];
                        case 3:
                            error_2 = _a.sent();
                            connected = false;
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/, connected];
                    }
                });
            });
        };
        /**
         * Login new user
         *
         * @param {string} user
         * @param {string} password
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.changeUser = function (userInfo) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.changeUser(this.sessionId, userInfo)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * browses the meta info for a component
         *
         * @param {ModelItems.MappCockpitComponent} mappCockpitComponent
         * @returns {Promise<any>}
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.browseMetaInfo = function (mappCockpitComponent) {
            return __awaiter(this, void 0, void 0, function () {
                var metaInfo;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._componentProvider.browseComponentMetaInfo(mappCockpitComponent)];
                        case 1:
                            metaInfo = _a.sent();
                            return [2 /*return*/, metaInfo];
                    }
                });
            });
        };
        /**
         * browses the parameters of a component
         *
         * @param {ModelItems.MappCockpitComponent} mappCockpitComponent
         * @returns {Promise<ModelItems.MappCockpitComponentParameter[]>}
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.browseParameters = function (mappCockpitComponent) {
            return __awaiter(this, void 0, void 0, function () {
                var mappCockpitComponentParameters;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._componentProvider.browseComponentParameters(mappCockpitComponent)];
                        case 1:
                            mappCockpitComponentParameters = _a.sent();
                            return [2 /*return*/, mappCockpitComponentParameters];
                    }
                });
            });
        };
        /**
         * updates parameter data types
         *
         * @param {ModelItems.MappCockpitComponentParameter[]} parameters
         * @returns {Promise<any>}
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.updateParameterDataTypes = function (parameters) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._componentProvider.updateParameterDataTypes(parameters)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * updates method parameter data types
         *
         * @param {ModelItems.MappCockpitComponentMethod[]} methods
         * @returns {Promise<any>}
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.updateMethodParameterDataTypes = function (methods) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._componentProvider.updateMethodParameterDataTypes(methods)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * reads a list of parameter values
         *
         * @param {Array<ModelItems.MappCockpitComponentParameter>} componentParameters
         * @returns {Promise<Array<ModelItems.MappCockpitComponentParameter>>}
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.readParameterValues = function (componentParameters) {
            return __awaiter(this, void 0, void 0, function () {
                var requestsReadParameterValues;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            requestsReadParameterValues = componentParameters.map(function (componentParameter) { return _this._componentProvider.readComponentParameterValue(componentParameter); });
                            return [4 /*yield*/, Promise.all(requestsReadParameterValues)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, componentParameters];
                    }
                });
            });
        };
        /**
         * Writes the parameters values
         *
         * @param {ModelItems.MappCockpitComponentParameter[]} componentParameters
         * @returns {*}
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.writeParameterValues = function (componentParameters) {
            return __awaiter(this, void 0, void 0, function () {
                var requestsWriteParameterValues;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            requestsWriteParameterValues = componentParameters.map(function (componentParameter) { return _this._componentProvider.writeComponentParameterValue(componentParameter); });
                            return [4 /*yield*/, Promise.all(requestsWriteParameterValues)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, componentParameters];
                    }
                });
            });
        };
        /**
         * observes the list of items for value changes
         *
         * @param {Array<ModelItems.MappCockpitComponentParameter>} componentParameters
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.observeComponentModelItems = function (observer, componentParameters) {
            this._monitoringProvider.observeComponentModelItems(observer, this.sessionId, componentParameters);
        };
        /**
         * Unobserves the passed parameters.
         *
         * @param {*} observer
         * @param {ModelItems.MappCockpitComponentParameter[]} observableParameters
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.unobserveComponentModelItems = function (observer, observableParameters, suspend) {
            this._monitoringProvider.unobserveComponentModelItems(observer, this.sessionId, observableParameters, suspend);
        };
        /**
         * handles change notifications from observables
         *
         * @returns {*}
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.handleObservableChanged = function (sender, changedEventArgs) {
            this.eventObservablesChanged.raise(this, changedEventArgs);
        };
        /**
         * writes a parameters value
         *
         * @param {ModelItems.MappCockpitComponentParameter} componentParameter
         * @param {*} value
         * @returns {Promise<any>}
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.writeParameterValue = function (componentParameter, value) {
            return __awaiter(this, void 0, void 0, function () {
                var componentParameterValue;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._componentProvider.writeComponentParameterValue(componentParameter)];
                        case 1:
                            componentParameterValue = _a.sent();
                            return [2 /*return*/, componentParameterValue];
                    }
                });
            });
        };
        /**
         * browses the methods of a component
         *
         * @param {MappCockpitComponent} mappCockpitComponent
         * @returns {*}
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.browseMethods = function (mappCockpitComponent) {
            return __awaiter(this, void 0, void 0, function () {
                var mappCockpitComponentMethods;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._componentProvider.browseComponentMethods(mappCockpitComponent)];
                        case 1:
                            mappCockpitComponentMethods = _a.sent();
                            return [2 /*return*/, mappCockpitComponentMethods];
                    }
                });
            });
        };
        MappCockpitDiagnosticProvider.prototype.browseMethodParameters = function (mappCockpitComponentMethods) {
            return __awaiter(this, void 0, void 0, function () {
                var mappCockpitComponentMethodParameters;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._componentProvider.browseComponentMethodParameters(mappCockpitComponentMethods)];
                        case 1:
                            mappCockpitComponentMethodParameters = _a.sent();
                            return [2 /*return*/, mappCockpitComponentMethodParameters];
                    }
                });
            });
        };
        /**
         * executes a component method
         *
         * @param {*} mappCockpitComponent
         * @returns {*}
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitDiagnosticProvider.prototype.executeComponentMethod = function (mappCockpitComponentMethod) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._componentProvider.executeComponentMethod(mappCockpitComponentMethod)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        return MappCockpitDiagnosticProvider;
    }());
    exports.MappCockpitDiagnosticProvider = MappCockpitDiagnosticProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9kaWFnbm9zdGljcy9tYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBV0E7UUFBc0MsMkNBQXdFO1FBQTlHOztRQUFnSCxDQUFDO1FBQUQsOEJBQUM7SUFBRCxDQUFDLEFBQWpILENBQXNDLG1CQUFVLEdBQWlFO0lBQUEsQ0FBQztJQUVsSDs7OztPQUlHO0lBQ0g7UUFzQkk7OztXQUdHO1FBQ0gsdUNBQVksU0FBd0M7WUFBcEQsaUJBYUM7WUE1QkQsdUNBQXVDO1lBQy9CLGVBQVUsR0FBVyxDQUFDLENBQUMsQ0FBQztZQUNoQyx3Q0FBd0M7WUFDaEMsb0JBQWUsR0FBVyxDQUFDLENBQUMsQ0FBQztZQU03QixpQ0FBNEIsR0FBRyxVQUFDLE1BQU0sRUFBRSxTQUFTLElBQU8sS0FBSSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQztZQVE5RyxxQkFBcUI7WUFDckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7WUFDNUIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksMkRBQTRCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakUsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLG1EQUF3QixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLGlGQUF1QyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdFLElBQUksQ0FBQyxtQkFBbUIsR0FBRyw2REFBNkIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUV2RSxJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSx1QkFB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QUMsRUFBQTs7NEJBQXhHLHVCQUF1QixHQUFHLFNBQThFOzRCQUU1RyxzQkFBTyx1QkFBdUIsRUFBQzs7OztTQUNsQztRQUVEOzs7Ozs7V0FNRztRQUNHLHFEQUFhLEdBQW5CLFVBQW9CLG9CQUFxRDs7Ozs7Z0NBRW5DLHFCQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxzQkFBc0IsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFBOzs0QkFBeEcsMkJBQTJCLEdBQUcsU0FBMEU7NEJBRTVHLHNCQUFPLDJCQUEyQixFQUFDOzs7O1NBQ3RDO1FBRUssOERBQXNCLEdBQTVCLFVBQTZCLDJCQUFvRTs7Ozs7Z0NBRWxELHFCQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQywrQkFBK0IsQ0FBQywyQkFBMkIsQ0FBQyxFQUFBOzs0QkFBakksb0NBQW9DLEdBQUcsU0FBMEY7NEJBRXJJLHNCQUFPLG9DQUFvQyxFQUFDOzs7O1NBQy9DO1FBRUQ7Ozs7OztXQU1HO1FBQ0csOERBQXNCLEdBQTVCLFVBQTZCLDBCQUFpRTs7OztnQ0FDbkYscUJBQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLHNCQUFzQixDQUFDLDBCQUEwQixDQUFDLEVBQUE7Z0NBQXZGLHNCQUFPLFNBQWdGLEVBQUM7Ozs7U0FDM0Y7UUFDTCxvQ0FBQztJQUFELENBQUMsQUE3WEQsSUE2WEM7SUFHUSxzRUFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPcGNVYVJlc3RTZXJ2aWNlcywgT3BjVWFBdHRyaWJ1dGUgfSBmcm9tICcuLi8uLi9jb21tdW5pY2F0aW9uL3Jlc3Qvb3BjVWFSZXN0U2VydmljZXMnXHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50UHJvdmlkZXIgfSBmcm9tICcuL21hcHBDb2NrcGl0Q29tcG9uZW50UHJvdmlkZXInO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbW1vbkluZm9Qcm92aWRlciB9IGZyb20gJy4vbWFwcENvY2twaXRDb21tb25JbmZvUHJvdmlkZXInO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdFRyYWNlUHJvdmlkZXIgfSBmcm9tICcuL3RyYWNlL21hcHBDb2NrcGl0VHJhY2VQcm92aWRlcic7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0RGlhZ25vc3RpY01vbml0b3JpbmdQcm92aWRlciwgRXZlbnRPYnNlcnZlZEl0ZW1zQ2hhbmdlZEFyZ3MgfSBmcm9tICcuL21hcHBDb2NrcGl0RGlhZ25vc3RpY01vbml0b3JpbmdQcm92aWRlcic7XHJcbmltcG9ydCB7IFR5cGVkRXZlbnQgfSBmcm9tICcuLi8uLi9mcmFtZXdvcmsvZXZlbnRzJztcclxuaW1wb3J0ICogYXMgTW9kZWxJdGVtcyBmcm9tICcuLi9vbmxpbmUvbWFwcENvY2twaXRDb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW0sIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kIH0gZnJvbSAnLi4vb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50JztcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWwgfSBmcm9tICcuLi9vbmxpbmUvY29tcG9uZW50c0RhdGFNb2RlbCc7XHJcblxyXG5cclxuY2xhc3MgRXZlbnRPYnNlcnZhYmxlc0NoYW5nZWQgZXh0ZW5kcyBUeXBlZEV2ZW50PE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyLCBFdmVudE9ic2VydmVkSXRlbXNDaGFuZ2VkQXJncz57IH07XHJcblxyXG4vKipcclxuICogSW1wbGVtZW50cyB0aGUgbWFwcCBjb2NrcGl0IGRpYWdub3N0aWMgcHJvdmlkZXJcclxuICpcclxuICogQGNsYXNzIE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyXHJcbiAqL1xyXG5jbGFzcyBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlciB7XHJcblxyXG4gICAgLy8gSG9sZHMgYW4gaW5zdGFuY2Ugb2YgdGhlIGNvbXBvbmVudCBwcm92aWRlclxyXG4gICAgcHJpdmF0ZSBfY29tcG9uZW50UHJvdmlkZXI6IE1hcHBDb2NrcGl0Q29tcG9uZW50UHJvdmlkZXI7XHJcbiAgICAvLyBIb2xkcyBhbiBpbnN0YW5jZSBvZiB0aGUgdHJhY2UgcHJvdmlkZXJcclxuICAgIHByaXZhdGUgX3RyYWNlUHJvdmlkZXI6IE1hcHBDb2NrcGl0VHJhY2VQcm92aWRlcjtcclxuICAgIC8vIGhvbGRzIGFuIGluc3RhbmNlIG9mIHRoZSBtb25pdG9yaW5nIHByb3ZpZGVyXHJcbiAgICBwcml2YXRlIF9tb25pdG9yaW5nUHJvdmlkZXI6IE1hcHBDb2NrcGl0RGlhZ25vc3RpY01vbml0b3JpbmdQcm92aWRlcjtcclxuICAgIC8vIGhvbGRzIGFuIGluc3RhbmNlIG9mIGEgcHJvdmlkZXIgZm9yIHJlYWRpbmcgYW5kIGV4cG9zaW5nIGNvbW1vbiBpbmZvIChlbnVtcywgbWV0YSlcclxuICAgIHByaXZhdGUgX2NvbW1vbkluZm9Qcm92aWRlcjogTWFwcENvY2twaXRDb21tb25JbmZvUHJvdmlkZXI7XHJcblxyXG4gICAgLy8gSG9sZHMgdGhlIGN1cnJlbnRseSBhY2l2ZSBzZXNzaW9uIGlkXHJcbiAgICBwcml2YXRlIF9zZXNzaW9uSWQ6IG51bWJlciA9IC0xO1xyXG4gICAgLy8gSG9sZHMgdGhlIG1hcHAgY29ja3BpdCBubWVzcGFjZSBpbmRleFxyXG4gICAgcHJpdmF0ZSBfbmFtZXNwYWNlSW5kZXg6IG51bWJlciA9IC0xO1xyXG4gICAgLy8gZGVjbGFyZXMgb2JzZXJ2YWJsZSBjaGFuZ2VkIGV2ZW50XHJcbiAgICBldmVudE9ic2VydmFibGVzQ2hhbmdlZDogRXZlbnRPYnNlcnZhYmxlc0NoYW5nZWQ7XHJcblxyXG4gICAgcHJpdmF0ZSBfZGF0YU1vZGVsOiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbDtcclxuXHJcbiAgICBwcml2YXRlIF9vYnNlcnZlZEl0ZW1zQ2hhbmdlZEhhbmRsZXIgPSAoc2VuZGVyLCBldmVudEFyZ3MpID0+IHsgdGhpcy5oYW5kbGVPYnNlcnZhYmxlQ2hhbmdlZChzZW5kZXIsIGV2ZW50QXJncykgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXIuXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoZGF0YU1vZGVsOiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbCkge1xyXG5cclxuICAgICAgICAvLyBJbml0aWFsaXplIG1lbWJlcnNcclxuICAgICAgICB0aGlzLl9kYXRhTW9kZWwgPSBkYXRhTW9kZWw7XHJcbiAgICAgICAgdGhpcy5fY29tcG9uZW50UHJvdmlkZXIgPSBuZXcgTWFwcENvY2twaXRDb21wb25lbnRQcm92aWRlcih0aGlzKTtcclxuICAgICAgICB0aGlzLl90cmFjZVByb3ZpZGVyID0gbmV3IE1hcHBDb2NrcGl0VHJhY2VQcm92aWRlcih0aGlzKTtcclxuICAgICAgICB0aGlzLl9tb25pdG9yaW5nUHJvdmlkZXIgPSBuZXcgTWFwcENvY2twaXREaWFnbm9zdGljTW9uaXRvcmluZ1Byb3ZpZGVyKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuX2NvbW1vbkluZm9Qcm92aWRlciA9IE1hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyLmdldEluc3RhbmNlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuZXZlbnRPYnNlcnZhYmxlc0NoYW5nZWQgPSBuZXcgRXZlbnRPYnNlcnZhYmxlc0NoYW5nZWQoKTtcclxuXHJcbiAgICAgICAgLy8gYXR0YWNoIGV2ZW50cyBcclxuICAgICAgICB0aGlzLl9tb25pdG9yaW5nUHJvdmlkZXIuZXZlbnRPYnNlcnZlZEl0ZW1zQ2hhbmdlZC5hdHRhY2godGhpcy5fb2JzZXJ2ZWRJdGVtc0NoYW5nZWRIYW5kbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc3Bvc2UgdGhlIE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIGRpc3Bvc2UoKXtcclxuICAgICAgICAvLyBkZXRhY2ggZXZlbnRzIFxyXG4gICAgICAgIHRoaXMuX21vbml0b3JpbmdQcm92aWRlci5ldmVudE9ic2VydmVkSXRlbXNDaGFuZ2VkLmRldGFjaCh0aGlzLl9vYnNlcnZlZEl0ZW1zQ2hhbmdlZEhhbmRsZXIpO1xyXG5cclxuICAgICAgICAvLyB0ZXJtaW5hdGUgdGhlIGN1cnJlbnQgc2Vzc2lvblxyXG4gICAgICAgIChhc3luYyAoKT0+e1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmVuZFNlc3Npb24oKTtcclxuICAgICAgICB9KSgpO1xyXG5cclxuICAgICAgXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgY29tcG9uZW50IHByb3ZpZGVyXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7TWFwcENvY2twaXRUcmFjZVByb3ZpZGVyfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgY29tcG9uZW50UHJvdmlkZXIoKSA6IE1hcHBDb2NrcGl0Q29tcG9uZW50UHJvdmlkZXIge1xyXG4gICAgICAgIHJldHVybiAgdGhpcy5fY29tcG9uZW50UHJvdmlkZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBkYXRhIG1vZGVsXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7TWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWx9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBtb2RlbCgpIDogTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWwge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhTW9kZWw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSB0cmFjZSBwcm92aWRlclxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge01hcHBDb2NrcGl0VHJhY2VQcm92aWRlcn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHRyYWNlUHJvdmlkZXIoKSA6IE1hcHBDb2NrcGl0VHJhY2VQcm92aWRlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RyYWNlUHJvdmlkZXI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgY3VycmVudCBzZXNzaW9uIGlkXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgc2Vzc2lvbklkKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Nlc3Npb25JZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGVmZmVjdGl2ZSBuYW1lc3BhY2UgaW5kZXhcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBuYW1lc3BhY2VJbmRleCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lc3BhY2VJbmRleDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIG1hcHAgY29ja3BpdCBuYW1lc3BhY2VcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBuYW1lc3BhY2UoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gIE9wY1VhUmVzdFNlcnZpY2VzLm1hcHBDb2NrcGl0TmFtZXNwYWNlUHJlZml4ICsgdGhpcy5fbmFtZXNwYWNlSW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBzdGFydHMgYSBkaWFnbm9zdGljIHNlc3Npb25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIGJlZ2luU2Vzc2lvbigpIHtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuXHJcbiAgICAgICAgICAgIC8vIGdldCBvcGMgdWEgYWRkcmVzc1xyXG4gICAgICAgICAgICBhd2FpdCBPcGNVYVJlc3RTZXJ2aWNlcy5yZWFkT3BjVWFMb2NhbElwKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBhdXRoZW50aWNhdGUgXHJcbiAgICAgICAgICAgIGF3YWl0IE9wY1VhUmVzdFNlcnZpY2VzLmF1dGhlbnRpY2F0ZSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gY3JlYXRlIGEgc29ja2V0IGNvbm5lY3Rpb24gZm9yIHJlY2VpdmluZyBvcGMtdWEgZXZlbnRzXHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX21vbml0b3JpbmdQcm92aWRlci5jcmVhdGVPcGNVYVNvY2tldCgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXI6IGNyZWF0ZWQgd2ViIHNvY2tldCAnKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBhIHNlc3Npb25cclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5jcmVhdGVTZXNzaW9uKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXI6IGNyZWF0ZWQgc2Vzc2lvbjogJW9cIiwgdGhpcy5zZXNzaW9uSWQpO1xyXG5cclxuICAgICAgICAgICAgLy8gcmVhZCB0aGUgbmFtZXNwYWNlIGluZGV4IGZvciBmdXJ0aGVyIGFjY2Vzc1xyXG4gICAgICAgICAgICB0aGlzLl9uYW1lc3BhY2VJbmRleCA9IGF3YWl0IE9wY1VhUmVzdFNlcnZpY2VzLmdldE5hbWVzcGFjZUluZGV4KHRoaXMuc2Vzc2lvbklkKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlcjogZ290IG5hbWVzcGFjZSBpbmRleDogJW9cIiwgdGhpcy5fbmFtZXNwYWNlSW5kZXgpO1xyXG5cclxuICAgICAgICAgICAgLy8gaW5pdGlhbGl6ZSBjb21tb24gaW5mbyBwcm92aWRlciBcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5fY29tbW9uSW5mb1Byb3ZpZGVyLmluaXRpYWxpemUodGhpcy5zZXNzaW9uSWQsIHRoaXMuX25hbWVzcGFjZUluZGV4KTtcclxuXHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBuZXcgc2Vzc2lvbiBpZiBub3QgYWxyZWFkeSBhdmFpbGFibGUuIFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBjcmVhdGVTZXNzaW9uKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9zZXNzaW9uSWQgPT09IC0xKSB7ICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgbmV3U2Vzc2lvbklkID0gYXdhaXQgT3BjVWFSZXN0U2VydmljZXMuY3JlYXRlU2Vzc2lvbigpOyAgICBcclxuICAgICAgICAgICAgdGhpcy5fc2Vzc2lvbklkID0gbmV3U2Vzc2lvbklkOyAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdGVybWluYXRlcyBhIGRpYWdub3N0aWMgc2Vzc2lvblxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgYXN5bmMgZW5kU2Vzc2lvbigpIHtcclxuXHJcbiAgICAgICAgdGhpcy5fbW9uaXRvcmluZ1Byb3ZpZGVyLmNsb3NlKCk7XHJcblxyXG4gICAgICAgIGF3YWl0IE9wY1VhUmVzdFNlcnZpY2VzLmRlbGV0ZVNlc3Npb24odGhpcy5zZXNzaW9uSWQpO1xyXG5cclxuICAgICAgICB0aGlzLl9zZXNzaW9uSWQgPSAtMTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpcyB0aGUgY29ubmVjdGlvbiB0byB0aGUgdGFyZ2V0IGlzIHN0aWxsIHZhbGlkXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgYXN5bmMgY2hlY2tUYXJnZXRDb25uZWN0aW9uKCk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgbGV0IGNvbm5lY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIHdlIGFjY2VzcyB0aGUgbWFwcCBjb2NrcGl0IHJvb3RzIGRlc2NyaXB0aW9uIGF0cmlidXRlIGFzIGxpdmUgY2hlY2suIFRoZSBjb25uZWN0aW9uIGlzIHZhbGlkIGlmIHRoZSBhdHRyaWJ1dGUgY291bGQgYmUgcmVhZCBzdWNjZXNzZnVsbHkuXHJcbiAgICAgICAgICAgIGF3YWl0IE9wY1VhUmVzdFNlcnZpY2VzLnJlYWROb2RlQXR0cmlidXRlKHRoaXMuc2Vzc2lvbklkLCB0aGlzLm5hbWVzcGFjZSArIFwiO1wiICsgT3BjVWFSZXN0U2VydmljZXMubWFwcENvY2twaXRSb290Tm9kZUlkLCBPcGNVYUF0dHJpYnV0ZS5ERVNDUklQVElPTik7XHJcbiAgICAgICAgICAgIGNvbm5lY3RlZCA9IHRydWU7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29ubmVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb25uZWN0ZWQ7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvZ2luIG5ldyB1c2VyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXNzd29yZFxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIGNoYW5nZVVzZXIodXNlckluZm86e30pIHtcclxuICAgICAgICByZXR1cm4gYXdhaXQgT3BjVWFSZXN0U2VydmljZXMuY2hhbmdlVXNlcih0aGlzLnNlc3Npb25JZCwgdXNlckluZm8pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYnJvd3NlcyB0aGUgbWV0YSBpbmZvIGZvciBhIGNvbXBvbmVudFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudH0gbWFwcENvY2twaXRDb21wb25lbnRcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgYXN5bmMgYnJvd3NlTWV0YUluZm8obWFwcENvY2twaXRDb21wb25lbnQ6IE1vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnQpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIHZhciBtZXRhSW5mbyA9IGF3YWl0IHRoaXMuX2NvbXBvbmVudFByb3ZpZGVyLmJyb3dzZUNvbXBvbmVudE1ldGFJbmZvKG1hcHBDb2NrcGl0Q29tcG9uZW50KTtcclxuICAgICAgICByZXR1cm4gbWV0YUluZm87XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYnJvd3NlcyB0aGUgcGFyYW1ldGVycyBvZiBhIGNvbXBvbmVudFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudH0gbWFwcENvY2twaXRDb21wb25lbnRcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPE1vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXT59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgYXN5bmMgYnJvd3NlUGFyYW1ldGVycyhtYXBwQ29ja3BpdENvbXBvbmVudDogTW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudCk6IFByb21pc2U8TW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdPiB7XHJcbiAgICAgICAgdmFyIG1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVycyA9IGF3YWl0IHRoaXMuX2NvbXBvbmVudFByb3ZpZGVyLmJyb3dzZUNvbXBvbmVudFBhcmFtZXRlcnMobWFwcENvY2twaXRDb21wb25lbnQpO1xyXG5cclxuICAgICAgICByZXR1cm4gbWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdXBkYXRlcyBwYXJhbWV0ZXIgZGF0YSB0eXBlc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSBwYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIHVwZGF0ZVBhcmFtZXRlckRhdGFUeXBlcyhwYXJhbWV0ZXJzOiBNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIGF3YWl0IHRoaXMuX2NvbXBvbmVudFByb3ZpZGVyLnVwZGF0ZVBhcmFtZXRlckRhdGFUeXBlcyhwYXJhbWV0ZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHVwZGF0ZXMgbWV0aG9kIHBhcmFtZXRlciBkYXRhIHR5cGVzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kW119IG1ldGhvZHNcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgYXN5bmMgdXBkYXRlTWV0aG9kUGFyYW1ldGVyRGF0YVR5cGVzKG1ldGhvZHM6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kW10pOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIGF3YWl0IHRoaXMuX2NvbXBvbmVudFByb3ZpZGVyLnVwZGF0ZU1ldGhvZFBhcmFtZXRlckRhdGFUeXBlcyhtZXRob2RzKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZWFkcyBhIGxpc3Qgb2YgcGFyYW1ldGVyIHZhbHVlc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8TW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj59IGNvbXBvbmVudFBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEFycmF5PE1vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+Pn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBhc3luYyByZWFkUGFyYW1ldGVyVmFsdWVzKGNvbXBvbmVudFBhcmFtZXRlcnM6IEFycmF5PE1vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+KTogUHJvbWlzZTxBcnJheTxNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPj4ge1xyXG5cclxuICAgICAgICBsZXQgcmVxdWVzdHNSZWFkUGFyYW1ldGVyVmFsdWVzID0gY29tcG9uZW50UGFyYW1ldGVycy5tYXAoKGNvbXBvbmVudFBhcmFtZXRlcikgPT4geyByZXR1cm4gdGhpcy5fY29tcG9uZW50UHJvdmlkZXIucmVhZENvbXBvbmVudFBhcmFtZXRlclZhbHVlKGNvbXBvbmVudFBhcmFtZXRlcikgfSk7XHJcblxyXG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKHJlcXVlc3RzUmVhZFBhcmFtZXRlclZhbHVlcyk7XHJcblxyXG4gICAgICAgIHJldHVybiBjb21wb25lbnRQYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogV3JpdGVzIHRoZSBwYXJhbWV0ZXJzIHZhbHVlc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSBjb21wb25lbnRQYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBhc3luYyB3cml0ZVBhcmFtZXRlclZhbHVlcyhjb21wb25lbnRQYXJhbWV0ZXJzOiBNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pe1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCByZXF1ZXN0c1dyaXRlUGFyYW1ldGVyVmFsdWVzID0gY29tcG9uZW50UGFyYW1ldGVycy5tYXAoKGNvbXBvbmVudFBhcmFtZXRlcikgPT4geyByZXR1cm4gdGhpcy5fY29tcG9uZW50UHJvdmlkZXIud3JpdGVDb21wb25lbnRQYXJhbWV0ZXJWYWx1ZShjb21wb25lbnRQYXJhbWV0ZXIpIH0pO1xyXG5cclxuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChyZXF1ZXN0c1dyaXRlUGFyYW1ldGVyVmFsdWVzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudFBhcmFtZXRlcnM7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogb2JzZXJ2ZXMgdGhlIGxpc3Qgb2YgaXRlbXMgZm9yIHZhbHVlIGNoYW5nZXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PE1vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+fSBjb21wb25lbnRQYXJhbWV0ZXJzXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgb2JzZXJ2ZUNvbXBvbmVudE1vZGVsSXRlbXMob2JzZXJ2ZXI6IGFueSwgY29tcG9uZW50UGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRJdGVtW10pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9tb25pdG9yaW5nUHJvdmlkZXIub2JzZXJ2ZUNvbXBvbmVudE1vZGVsSXRlbXMob2JzZXJ2ZXIsIHRoaXMuc2Vzc2lvbklkLCBjb21wb25lbnRQYXJhbWV0ZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVub2JzZXJ2ZXMgdGhlIHBhc3NlZCBwYXJhbWV0ZXJzLiBcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IG9ic2VydmVyXHJcbiAgICAgKiBAcGFyYW0ge01vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gb2JzZXJ2YWJsZVBhcmFtZXRlcnNcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlclxyXG4gICAgICovXHJcbiAgICB1bm9ic2VydmVDb21wb25lbnRNb2RlbEl0ZW1zKG9ic2VydmVyOiBhbnksIG9ic2VydmFibGVQYXJhbWV0ZXJzOiBNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10sIHN1c3BlbmQ6Ym9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuX21vbml0b3JpbmdQcm92aWRlci51bm9ic2VydmVDb21wb25lbnRNb2RlbEl0ZW1zKG9ic2VydmVyLCB0aGlzLnNlc3Npb25JZCwgb2JzZXJ2YWJsZVBhcmFtZXRlcnMsc3VzcGVuZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBoYW5kbGVzIGNoYW5nZSBub3RpZmljYXRpb25zIGZyb20gb2JzZXJ2YWJsZXNcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBoYW5kbGVPYnNlcnZhYmxlQ2hhbmdlZChzZW5kZXI6IGFueSwgY2hhbmdlZEV2ZW50QXJnczogRXZlbnRPYnNlcnZlZEl0ZW1zQ2hhbmdlZEFyZ3MpOiBhbnkge1xyXG4gICAgICAgIHRoaXMuZXZlbnRPYnNlcnZhYmxlc0NoYW5nZWQucmFpc2UodGhpcywgY2hhbmdlZEV2ZW50QXJncylcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB3cml0ZXMgYSBwYXJhbWV0ZXJzIHZhbHVlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyfSBjb21wb25lbnRQYXJhbWV0ZXJcclxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWVcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgYXN5bmMgd3JpdGVQYXJhbWV0ZXJWYWx1ZShjb21wb25lbnRQYXJhbWV0ZXI6IE1vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIsIHZhbHVlOiBhbnkpOiBQcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAvLyBJbml0aWF0ZSBsb2FkaW5nIHRyYWNlIGRhdGFcclxuICAgICAgICB2YXIgY29tcG9uZW50UGFyYW1ldGVyVmFsdWUgPSBhd2FpdCB0aGlzLl9jb21wb25lbnRQcm92aWRlci53cml0ZUNvbXBvbmVudFBhcmFtZXRlclZhbHVlKGNvbXBvbmVudFBhcmFtZXRlcik7XHJcblxyXG4gICAgICAgIHJldHVybiBjb21wb25lbnRQYXJhbWV0ZXJWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGJyb3dzZXMgdGhlIG1ldGhvZHMgb2YgYSBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50fSBtYXBwQ29ja3BpdENvbXBvbmVudFxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgYXN5bmMgYnJvd3NlTWV0aG9kcyhtYXBwQ29ja3BpdENvbXBvbmVudDogTW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudCk6IFByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgIHZhciBtYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZHMgPSBhd2FpdCB0aGlzLl9jb21wb25lbnRQcm92aWRlci5icm93c2VDb21wb25lbnRNZXRob2RzKG1hcHBDb2NrcGl0Q29tcG9uZW50KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kcztcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBicm93c2VNZXRob2RQYXJhbWV0ZXJzKG1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kczogTW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFtdKTogUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgdmFyIG1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kUGFyYW1ldGVycyA9IGF3YWl0IHRoaXMuX2NvbXBvbmVudFByb3ZpZGVyLmJyb3dzZUNvbXBvbmVudE1ldGhvZFBhcmFtZXRlcnMobWFwcENvY2twaXRDb21wb25lbnRNZXRob2RzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kUGFyYW1ldGVycztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGV4ZWN1dGVzIGEgY29tcG9uZW50IG1ldGhvZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gbWFwcENvY2twaXRDb21wb25lbnRcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIGV4ZWN1dGVDb21wb25lbnRNZXRob2QobWFwcENvY2twaXRDb21wb25lbnRNZXRob2Q6IE1vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9jb21wb25lbnRQcm92aWRlci5leGVjdXRlQ29tcG9uZW50TWV0aG9kKG1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCB7IE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyIH07Il19