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
            // detach events 
            this._monitoringProvider.eventObservedItemsChanged.detach(this._observedItemsChangedHandler);
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
                            _b.trys.push([0, 6, , 7]);
                            // authenticate 
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.authenticate()];
                        case 1:
                            // authenticate 
                            _b.sent();
                            // create a socket connection for receiving opc-ua events
                            return [4 /*yield*/, this._monitoringProvider.createOpcUaSocket()];
                        case 2:
                            // create a socket connection for receiving opc-ua events
                            _b.sent();
                            console.log('MappCockpitDiagnosticProvider: created web socket ');
                            // create a session
                            return [4 /*yield*/, this.createSession()];
                        case 3:
                            // create a session
                            _b.sent();
                            console.log("MappCockpitDiagnosticProvider: created session: %o", this.sessionId);
                            // read the namespace index for further access
                            _a = this;
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.getNamespaceIndex(this.sessionId)];
                        case 4:
                            // read the namespace index for further access
                            _a._namespaceIndex = _b.sent();
                            console.log("MappCockpitDiagnosticProvider: got namespace index: %o", this._namespaceIndex);
                            // initialize common info provider 
                            return [4 /*yield*/, this._commonInfoProvider.initialize(this.sessionId, this._namespaceIndex)];
                        case 5:
                            // initialize common info provider 
                            _b.sent();
                            return [3 /*break*/, 7];
                        case 6:
                            error_1 = _b.sent();
                            console.log(error_1);
                            return [3 /*break*/, 7];
                        case 7: return [2 /*return*/];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9kaWFnbm9zdGljcy9tYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBV0E7UUFBc0MsMkNBQXdFO1FBQTlHOztRQUFnSCxDQUFDO1FBQUQsOEJBQUM7SUFBRCxDQUFDLEFBQWpILENBQXNDLG1CQUFVLEdBQWlFO0lBQUEsQ0FBQztJQUVsSDs7OztPQUlHO0lBQ0g7UUFzQkk7OztXQUdHO1FBQ0gsdUNBQVksU0FBd0M7WUFBcEQsaUJBYUM7WUE1QkQsdUNBQXVDO1lBQy9CLGVBQVUsR0FBVyxDQUFDLENBQUMsQ0FBQztZQUNoQyx3Q0FBd0M7WUFDaEMsb0JBQWUsR0FBVyxDQUFDLENBQUMsQ0FBQztZQU03QixpQ0FBNEIsR0FBRyxVQUFDLE1BQU0sRUFBRSxTQUFTLElBQU8sS0FBSSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQztZQVE5RyxxQkFBcUI7WUFDckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7WUFDNUIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksMkRBQTRCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakUsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLG1EQUF3QixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLGlGQUF1QyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdFLElBQUksQ0FBQyxtQkFBbUIsR0FBRyw2REFBNkIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUV2RSxJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSx1QkFB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OzRCQUU1RyxzQkFBTywyQkFBMkIsRUFBQzs7OztTQUN0QztRQUVLLDhEQUFzQixHQUE1QixVQUE2QiwyQkFBb0U7Ozs7O2dDQUVsRCxxQkFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsK0JBQStCLENBQUMsMkJBQTJCLENBQUMsRUFBQTs7NEJBQWpJLG9DQUFvQyxHQUFHLFNBQTBGOzRCQUVySSxzQkFBTyxvQ0FBb0MsRUFBQzs7OztTQUMvQztRQUVEOzs7Ozs7V0FNRztRQUNHLDhEQUFzQixHQUE1QixVQUE2QiwwQkFBaUU7Ozs7Z0NBQ25GLHFCQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxzQkFBc0IsQ0FBQywwQkFBMEIsQ0FBQyxFQUFBO2dDQUF2RixzQkFBTyxTQUFnRixFQUFDOzs7O1NBQzNGO1FBQ0wsb0NBQUM7SUFBRCxDQUFDLEFBblhELElBbVhDO0lBR1Esc0VBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3BjVWFSZXN0U2VydmljZXMsIE9wY1VhQXR0cmlidXRlIH0gZnJvbSAnLi4vLi4vY29tbXVuaWNhdGlvbi9yZXN0L29wY1VhUmVzdFNlcnZpY2VzJ1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudFByb3ZpZGVyIH0gZnJvbSAnLi9tYXBwQ29ja3BpdENvbXBvbmVudFByb3ZpZGVyJztcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21tb25JbmZvUHJvdmlkZXIgfSBmcm9tICcuL21hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyJztcclxuaW1wb3J0IHsgTWFwcENvY2twaXRUcmFjZVByb3ZpZGVyIH0gZnJvbSAnLi90cmFjZS9tYXBwQ29ja3BpdFRyYWNlUHJvdmlkZXInO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdERpYWdub3N0aWNNb25pdG9yaW5nUHJvdmlkZXIsIEV2ZW50T2JzZXJ2ZWRJdGVtc0NoYW5nZWRBcmdzIH0gZnJvbSAnLi9tYXBwQ29ja3BpdERpYWdub3N0aWNNb25pdG9yaW5nUHJvdmlkZXInO1xyXG5pbXBvcnQgeyBUeXBlZEV2ZW50IH0gZnJvbSAnLi4vLi4vZnJhbWV3b3JrL2V2ZW50cyc7XHJcbmltcG9ydCAqIGFzIE1vZGVsSXRlbXMgZnJvbSAnLi4vb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50JztcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnRJdGVtLCBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCB9IGZyb20gJy4uL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudCc7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsIH0gZnJvbSAnLi4vb25saW5lL2NvbXBvbmVudHNEYXRhTW9kZWwnO1xyXG5cclxuXHJcbmNsYXNzIEV2ZW50T2JzZXJ2YWJsZXNDaGFuZ2VkIGV4dGVuZHMgVHlwZWRFdmVudDxNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlciwgRXZlbnRPYnNlcnZlZEl0ZW1zQ2hhbmdlZEFyZ3M+eyB9O1xyXG5cclxuLyoqXHJcbiAqIEltcGxlbWVudHMgdGhlIG1hcHAgY29ja3BpdCBkaWFnbm9zdGljIHByb3ZpZGVyXHJcbiAqXHJcbiAqIEBjbGFzcyBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlclxyXG4gKi9cclxuY2xhc3MgTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXIge1xyXG5cclxuICAgIC8vIEhvbGRzIGFuIGluc3RhbmNlIG9mIHRoZSBjb21wb25lbnQgcHJvdmlkZXJcclxuICAgIHByaXZhdGUgX2NvbXBvbmVudFByb3ZpZGVyOiBNYXBwQ29ja3BpdENvbXBvbmVudFByb3ZpZGVyO1xyXG4gICAgLy8gSG9sZHMgYW4gaW5zdGFuY2Ugb2YgdGhlIHRyYWNlIHByb3ZpZGVyXHJcbiAgICBwcml2YXRlIF90cmFjZVByb3ZpZGVyOiBNYXBwQ29ja3BpdFRyYWNlUHJvdmlkZXI7XHJcbiAgICAvLyBob2xkcyBhbiBpbnN0YW5jZSBvZiB0aGUgbW9uaXRvcmluZyBwcm92aWRlclxyXG4gICAgcHJpdmF0ZSBfbW9uaXRvcmluZ1Byb3ZpZGVyOiBNYXBwQ29ja3BpdERpYWdub3N0aWNNb25pdG9yaW5nUHJvdmlkZXI7XHJcbiAgICAvLyBob2xkcyBhbiBpbnN0YW5jZSBvZiBhIHByb3ZpZGVyIGZvciByZWFkaW5nIGFuZCBleHBvc2luZyBjb21tb24gaW5mbyAoZW51bXMsIG1ldGEpXHJcbiAgICBwcml2YXRlIF9jb21tb25JbmZvUHJvdmlkZXI6IE1hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyO1xyXG5cclxuICAgIC8vIEhvbGRzIHRoZSBjdXJyZW50bHkgYWNpdmUgc2Vzc2lvbiBpZFxyXG4gICAgcHJpdmF0ZSBfc2Vzc2lvbklkOiBudW1iZXIgPSAtMTtcclxuICAgIC8vIEhvbGRzIHRoZSBtYXBwIGNvY2twaXQgbm1lc3BhY2UgaW5kZXhcclxuICAgIHByaXZhdGUgX25hbWVzcGFjZUluZGV4OiBudW1iZXIgPSAtMTtcclxuICAgIC8vIGRlY2xhcmVzIG9ic2VydmFibGUgY2hhbmdlZCBldmVudFxyXG4gICAgZXZlbnRPYnNlcnZhYmxlc0NoYW5nZWQ6IEV2ZW50T2JzZXJ2YWJsZXNDaGFuZ2VkO1xyXG5cclxuICAgIHByaXZhdGUgX2RhdGFNb2RlbDogTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWw7XHJcblxyXG4gICAgcHJpdmF0ZSBfb2JzZXJ2ZWRJdGVtc0NoYW5nZWRIYW5kbGVyID0gKHNlbmRlciwgZXZlbnRBcmdzKSA9PiB7IHRoaXMuaGFuZGxlT2JzZXJ2YWJsZUNoYW5nZWQoc2VuZGVyLCBldmVudEFyZ3MpIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyLlxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGRhdGFNb2RlbDogTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWwpIHtcclxuXHJcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBtZW1iZXJzXHJcbiAgICAgICAgdGhpcy5fZGF0YU1vZGVsID0gZGF0YU1vZGVsO1xyXG4gICAgICAgIHRoaXMuX2NvbXBvbmVudFByb3ZpZGVyID0gbmV3IE1hcHBDb2NrcGl0Q29tcG9uZW50UHJvdmlkZXIodGhpcyk7XHJcbiAgICAgICAgdGhpcy5fdHJhY2VQcm92aWRlciA9IG5ldyBNYXBwQ29ja3BpdFRyYWNlUHJvdmlkZXIodGhpcyk7XHJcbiAgICAgICAgdGhpcy5fbW9uaXRvcmluZ1Byb3ZpZGVyID0gbmV3IE1hcHBDb2NrcGl0RGlhZ25vc3RpY01vbml0b3JpbmdQcm92aWRlcih0aGlzKTtcclxuICAgICAgICB0aGlzLl9jb21tb25JbmZvUHJvdmlkZXIgPSBNYXBwQ29ja3BpdENvbW1vbkluZm9Qcm92aWRlci5nZXRJbnN0YW5jZSgpO1xyXG5cclxuICAgICAgICB0aGlzLmV2ZW50T2JzZXJ2YWJsZXNDaGFuZ2VkID0gbmV3IEV2ZW50T2JzZXJ2YWJsZXNDaGFuZ2VkKCk7XHJcblxyXG4gICAgICAgIC8vIGF0dGFjaCBldmVudHMgXHJcbiAgICAgICAgdGhpcy5fbW9uaXRvcmluZ1Byb3ZpZGVyLmV2ZW50T2JzZXJ2ZWRJdGVtc0NoYW5nZWQuYXR0YWNoKHRoaXMuX29ic2VydmVkSXRlbXNDaGFuZ2VkSGFuZGxlcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNwb3NlIHRoZSBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlclxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBkaXNwb3NlKCl7XHJcbiAgICAgICAgLy8gZGV0YWNoIGV2ZW50cyBcclxuICAgICAgICB0aGlzLl9tb25pdG9yaW5nUHJvdmlkZXIuZXZlbnRPYnNlcnZlZEl0ZW1zQ2hhbmdlZC5kZXRhY2godGhpcy5fb2JzZXJ2ZWRJdGVtc0NoYW5nZWRIYW5kbGVyKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBjb21wb25lbnQgcHJvdmlkZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtNYXBwQ29ja3BpdFRyYWNlUHJvdmlkZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBjb21wb25lbnRQcm92aWRlcigpIDogTWFwcENvY2twaXRDb21wb25lbnRQcm92aWRlciB7XHJcbiAgICAgICAgcmV0dXJuICB0aGlzLl9jb21wb25lbnRQcm92aWRlcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGRhdGEgbW9kZWxcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbH1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IG1vZGVsKCkgOiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFNb2RlbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHRyYWNlIHByb3ZpZGVyXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7TWFwcENvY2twaXRUcmFjZVByb3ZpZGVyfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgdHJhY2VQcm92aWRlcigpIDogTWFwcENvY2twaXRUcmFjZVByb3ZpZGVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdHJhY2VQcm92aWRlcjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBjdXJyZW50IHNlc3Npb24gaWRcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBzZXNzaW9uSWQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2Vzc2lvbklkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZWZmZWN0aXZlIG5hbWVzcGFjZSBpbmRleFxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IG5hbWVzcGFjZUluZGV4KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWVzcGFjZUluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgbWFwcCBjb2NrcGl0IG5hbWVzcGFjZVxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IG5hbWVzcGFjZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiAgT3BjVWFSZXN0U2VydmljZXMubWFwcENvY2twaXROYW1lc3BhY2VQcmVmaXggKyB0aGlzLl9uYW1lc3BhY2VJbmRleDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHN0YXJ0cyBhIGRpYWdub3N0aWMgc2Vzc2lvblxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgYXN5bmMgYmVnaW5TZXNzaW9uKCkge1xyXG5cclxuICAgICAgICB0cnkge1xyXG5cclxuICAgICAgICAgICAgLy8gYXV0aGVudGljYXRlIFxyXG4gICAgICAgICAgICBhd2FpdCBPcGNVYVJlc3RTZXJ2aWNlcy5hdXRoZW50aWNhdGUoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBhIHNvY2tldCBjb25uZWN0aW9uIGZvciByZWNlaXZpbmcgb3BjLXVhIGV2ZW50c1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9tb25pdG9yaW5nUHJvdmlkZXIuY3JlYXRlT3BjVWFTb2NrZXQoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ01hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyOiBjcmVhdGVkIHdlYiBzb2NrZXQgJyk7XHJcblxyXG4gICAgICAgICAgICAvLyBjcmVhdGUgYSBzZXNzaW9uXHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuY3JlYXRlU2Vzc2lvbigpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyOiBjcmVhdGVkIHNlc3Npb246ICVvXCIsIHRoaXMuc2Vzc2lvbklkKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHJlYWQgdGhlIG5hbWVzcGFjZSBpbmRleCBmb3IgZnVydGhlciBhY2Nlc3NcclxuICAgICAgICAgICAgdGhpcy5fbmFtZXNwYWNlSW5kZXggPSBhd2FpdCBPcGNVYVJlc3RTZXJ2aWNlcy5nZXROYW1lc3BhY2VJbmRleCh0aGlzLnNlc3Npb25JZCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXI6IGdvdCBuYW1lc3BhY2UgaW5kZXg6ICVvXCIsIHRoaXMuX25hbWVzcGFjZUluZGV4KTtcclxuXHJcbiAgICAgICAgICAgIC8vIGluaXRpYWxpemUgY29tbW9uIGluZm8gcHJvdmlkZXIgXHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX2NvbW1vbkluZm9Qcm92aWRlci5pbml0aWFsaXplKHRoaXMuc2Vzc2lvbklkLCB0aGlzLl9uYW1lc3BhY2VJbmRleCk7XHJcblxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbmV3IHNlc3Npb24gaWYgbm90IGFscmVhZHkgYXZhaWxhYmxlLiBcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgY3JlYXRlU2Vzc2lvbigpIHtcclxuICAgICAgICBpZiAodGhpcy5fc2Vzc2lvbklkID09PSAtMSkgeyAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IG5ld1Nlc3Npb25JZCA9IGF3YWl0IE9wY1VhUmVzdFNlcnZpY2VzLmNyZWF0ZVNlc3Npb24oKTsgICAgXHJcbiAgICAgICAgICAgIHRoaXMuX3Nlc3Npb25JZCA9IG5ld1Nlc3Npb25JZDsgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHRlcm1pbmF0ZXMgYSBkaWFnbm9zdGljIHNlc3Npb25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIGVuZFNlc3Npb24oKSB7XHJcblxyXG4gICAgICAgIHRoaXMuX21vbml0b3JpbmdQcm92aWRlci5jbG9zZSgpO1xyXG5cclxuICAgICAgICBhd2FpdCBPcGNVYVJlc3RTZXJ2aWNlcy5kZWxldGVTZXNzaW9uKHRoaXMuc2Vzc2lvbklkKTtcclxuXHJcbiAgICAgICAgdGhpcy5fc2Vzc2lvbklkID0gLTE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaXMgdGhlIGNvbm5lY3Rpb24gdG8gdGhlIHRhcmdldCBpcyBzdGlsbCB2YWxpZFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIGNoZWNrVGFyZ2V0Q29ubmVjdGlvbigpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIGxldCBjb25uZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvLyB3ZSBhY2Nlc3MgdGhlIG1hcHAgY29ja3BpdCByb290cyBkZXNjcmlwdGlvbiBhdHJpYnV0ZSBhcyBsaXZlIGNoZWNrLiBUaGUgY29ubmVjdGlvbiBpcyB2YWxpZCBpZiB0aGUgYXR0cmlidXRlIGNvdWxkIGJlIHJlYWQgc3VjY2Vzc2Z1bGx5LlxyXG4gICAgICAgICAgICBhd2FpdCBPcGNVYVJlc3RTZXJ2aWNlcy5yZWFkTm9kZUF0dHJpYnV0ZSh0aGlzLnNlc3Npb25JZCwgdGhpcy5uYW1lc3BhY2UgKyBcIjtcIiArIE9wY1VhUmVzdFNlcnZpY2VzLm1hcHBDb2NrcGl0Um9vdE5vZGVJZCwgT3BjVWFBdHRyaWJ1dGUuREVTQ1JJUFRJT04pO1xyXG4gICAgICAgICAgICBjb25uZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbm5lY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29ubmVjdGVkO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2dpbiBuZXcgdXNlclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGFzc3dvcmRcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBhc3luYyBjaGFuZ2VVc2VyKHVzZXJJbmZvOnt9KSB7XHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IE9wY1VhUmVzdFNlcnZpY2VzLmNoYW5nZVVzZXIodGhpcy5zZXNzaW9uSWQsIHVzZXJJbmZvKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGJyb3dzZXMgdGhlIG1ldGEgaW5mbyBmb3IgYSBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnR9IG1hcHBDb2NrcGl0Q29tcG9uZW50XHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIGJyb3dzZU1ldGFJbmZvKG1hcHBDb2NrcGl0Q29tcG9uZW50OiBNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50KTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICB2YXIgbWV0YUluZm8gPSBhd2FpdCB0aGlzLl9jb21wb25lbnRQcm92aWRlci5icm93c2VDb21wb25lbnRNZXRhSW5mbyhtYXBwQ29ja3BpdENvbXBvbmVudCk7XHJcbiAgICAgICAgcmV0dXJuIG1ldGFJbmZvO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIGJyb3dzZXMgdGhlIHBhcmFtZXRlcnMgb2YgYSBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnR9IG1hcHBDb2NrcGl0Q29tcG9uZW50XHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIGJyb3dzZVBhcmFtZXRlcnMobWFwcENvY2twaXRDb21wb25lbnQ6IE1vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnQpOiBQcm9taXNlPE1vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXT4ge1xyXG4gICAgICAgIHZhciBtYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcnMgPSBhd2FpdCB0aGlzLl9jb21wb25lbnRQcm92aWRlci5icm93c2VDb21wb25lbnRQYXJhbWV0ZXJzKG1hcHBDb2NrcGl0Q29tcG9uZW50KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVycztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHVwZGF0ZXMgcGFyYW1ldGVyIGRhdGEgdHlwZXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gcGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBhc3luYyB1cGRhdGVQYXJhbWV0ZXJEYXRhVHlwZXMocGFyYW1ldGVyczogTW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdKTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICBhd2FpdCB0aGlzLl9jb21wb25lbnRQcm92aWRlci51cGRhdGVQYXJhbWV0ZXJEYXRhVHlwZXMocGFyYW1ldGVycyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB1cGRhdGVzIG1ldGhvZCBwYXJhbWV0ZXIgZGF0YSB0eXBlc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFtdfSBtZXRob2RzXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIHVwZGF0ZU1ldGhvZFBhcmFtZXRlckRhdGFUeXBlcyhtZXRob2RzOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFtdKTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICBhd2FpdCB0aGlzLl9jb21wb25lbnRQcm92aWRlci51cGRhdGVNZXRob2RQYXJhbWV0ZXJEYXRhVHlwZXMobWV0aG9kcyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmVhZHMgYSBsaXN0IG9mIHBhcmFtZXRlciB2YWx1ZXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PE1vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+fSBjb21wb25lbnRQYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxBcnJheTxNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPj59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgYXN5bmMgcmVhZFBhcmFtZXRlclZhbHVlcyhjb21wb25lbnRQYXJhbWV0ZXJzOiBBcnJheTxNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPik6IFByb21pc2U8QXJyYXk8TW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4+IHtcclxuXHJcbiAgICAgICAgbGV0IHJlcXVlc3RzUmVhZFBhcmFtZXRlclZhbHVlcyA9IGNvbXBvbmVudFBhcmFtZXRlcnMubWFwKChjb21wb25lbnRQYXJhbWV0ZXIpID0+IHsgcmV0dXJuIHRoaXMuX2NvbXBvbmVudFByb3ZpZGVyLnJlYWRDb21wb25lbnRQYXJhbWV0ZXJWYWx1ZShjb21wb25lbnRQYXJhbWV0ZXIpIH0pO1xyXG5cclxuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChyZXF1ZXN0c1JlYWRQYXJhbWV0ZXJWYWx1ZXMpO1xyXG5cclxuICAgICAgICByZXR1cm4gY29tcG9uZW50UGFyYW1ldGVycztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFdyaXRlcyB0aGUgcGFyYW1ldGVycyB2YWx1ZXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gY29tcG9uZW50UGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgYXN5bmMgd3JpdGVQYXJhbWV0ZXJWYWx1ZXMoY29tcG9uZW50UGFyYW1ldGVyczogTW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdKXtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgcmVxdWVzdHNXcml0ZVBhcmFtZXRlclZhbHVlcyA9IGNvbXBvbmVudFBhcmFtZXRlcnMubWFwKChjb21wb25lbnRQYXJhbWV0ZXIpID0+IHsgcmV0dXJuIHRoaXMuX2NvbXBvbmVudFByb3ZpZGVyLndyaXRlQ29tcG9uZW50UGFyYW1ldGVyVmFsdWUoY29tcG9uZW50UGFyYW1ldGVyKSB9KTtcclxuXHJcbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwocmVxdWVzdHNXcml0ZVBhcmFtZXRlclZhbHVlcyk7XHJcblxyXG4gICAgICAgIHJldHVybiBjb21wb25lbnRQYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIG9ic2VydmVzIHRoZSBsaXN0IG9mIGl0ZW1zIGZvciB2YWx1ZSBjaGFuZ2VzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPn0gY29tcG9uZW50UGFyYW1ldGVyc1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIG9ic2VydmVDb21wb25lbnRNb2RlbEl0ZW1zKG9ic2VydmVyOiBhbnksIGNvbXBvbmVudFBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbVtdKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fbW9uaXRvcmluZ1Byb3ZpZGVyLm9ic2VydmVDb21wb25lbnRNb2RlbEl0ZW1zKG9ic2VydmVyLCB0aGlzLnNlc3Npb25JZCwgY29tcG9uZW50UGFyYW1ldGVycyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVbm9ic2VydmVzIHRoZSBwYXNzZWQgcGFyYW1ldGVycy4gXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBvYnNlcnZlclxyXG4gICAgICogQHBhcmFtIHtNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IG9ic2VydmFibGVQYXJhbWV0ZXJzXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgdW5vYnNlcnZlQ29tcG9uZW50TW9kZWxJdGVtcyhvYnNlcnZlcjogYW55LCBvYnNlcnZhYmxlUGFyYW1ldGVyczogTW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdLCBzdXNwZW5kOmJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl9tb25pdG9yaW5nUHJvdmlkZXIudW5vYnNlcnZlQ29tcG9uZW50TW9kZWxJdGVtcyhvYnNlcnZlciwgdGhpcy5zZXNzaW9uSWQsIG9ic2VydmFibGVQYXJhbWV0ZXJzLHN1c3BlbmQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogaGFuZGxlcyBjaGFuZ2Ugbm90aWZpY2F0aW9ucyBmcm9tIG9ic2VydmFibGVzXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgaGFuZGxlT2JzZXJ2YWJsZUNoYW5nZWQoc2VuZGVyOiBhbnksIGNoYW5nZWRFdmVudEFyZ3M6IEV2ZW50T2JzZXJ2ZWRJdGVtc0NoYW5nZWRBcmdzKTogYW55IHtcclxuICAgICAgICB0aGlzLmV2ZW50T2JzZXJ2YWJsZXNDaGFuZ2VkLnJhaXNlKHRoaXMsIGNoYW5nZWRFdmVudEFyZ3MpXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogd3JpdGVzIGEgcGFyYW1ldGVycyB2YWx1ZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcn0gY29tcG9uZW50UGFyYW1ldGVyXHJcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIHdyaXRlUGFyYW1ldGVyVmFsdWUoY29tcG9uZW50UGFyYW1ldGVyOiBNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyLCB2YWx1ZTogYW55KTogUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgLy8gSW5pdGlhdGUgbG9hZGluZyB0cmFjZSBkYXRhXHJcbiAgICAgICAgdmFyIGNvbXBvbmVudFBhcmFtZXRlclZhbHVlID0gYXdhaXQgdGhpcy5fY29tcG9uZW50UHJvdmlkZXIud3JpdGVDb21wb25lbnRQYXJhbWV0ZXJWYWx1ZShjb21wb25lbnRQYXJhbWV0ZXIpO1xyXG5cclxuICAgICAgICByZXR1cm4gY29tcG9uZW50UGFyYW1ldGVyVmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBicm93c2VzIHRoZSBtZXRob2RzIG9mIGEgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudH0gbWFwcENvY2twaXRDb21wb25lbnRcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIGJyb3dzZU1ldGhvZHMobWFwcENvY2twaXRDb21wb25lbnQ6IE1vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnQpOiBQcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICB2YXIgbWFwcENvY2twaXRDb21wb25lbnRNZXRob2RzID0gYXdhaXQgdGhpcy5fY29tcG9uZW50UHJvdmlkZXIuYnJvd3NlQ29tcG9uZW50TWV0aG9kcyhtYXBwQ29ja3BpdENvbXBvbmVudCk7XHJcblxyXG4gICAgICAgIHJldHVybiBtYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZHM7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgYnJvd3NlTWV0aG9kUGFyYW1ldGVycyhtYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZHM6IE1vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RbXSk6IFByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgIHZhciBtYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFBhcmFtZXRlcnMgPSBhd2FpdCB0aGlzLl9jb21wb25lbnRQcm92aWRlci5icm93c2VDb21wb25lbnRNZXRob2RQYXJhbWV0ZXJzKG1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kcyk7XHJcblxyXG4gICAgICAgIHJldHVybiBtYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFBhcmFtZXRlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBleGVjdXRlcyBhIGNvbXBvbmVudCBtZXRob2RcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IG1hcHBDb2NrcGl0Q29tcG9uZW50XHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBhc3luYyBleGVjdXRlQ29tcG9uZW50TWV0aG9kKG1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kOiBNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kKTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5fY29tcG9uZW50UHJvdmlkZXIuZXhlY3V0ZUNvbXBvbmVudE1ldGhvZChtYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgeyBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlciB9OyJdfQ==