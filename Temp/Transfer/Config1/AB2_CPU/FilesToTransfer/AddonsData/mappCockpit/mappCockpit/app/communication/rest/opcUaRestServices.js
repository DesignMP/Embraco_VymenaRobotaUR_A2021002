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
define(["require", "exports", "./opcUaRestResultTypes", "./restService", "../../common/mappCockpitConfig"], function (require, exports, Rest, restService_1, mappCockpitConfig_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Rest = Rest;
    exports.RestServiceMode = restService_1.RestServiceMode;
    /**
     * Implements the rest service calls for mapp Cockpit
     *
     * @class OpcUaRestServices
     */
    var OpcUaRestServices = /** @class */ (function () {
        function OpcUaRestServices() {
        }
        // Specifies the rest service end point url
        OpcUaRestServices.getOpcUaRestServiceEndPointUrl = function () {
            return 'opc.tcp://' + location.hostname + ':' + mappCockpitConfig_1.MappCockpitConfiguration.opcUaPort;
        };
        /**
         * reads access configuration data and sets the base url for the rest services
         *
         * @private
         * @static
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.getBaseUrl = function () {
            // get port for RestServiceBaseUrl from mappCockpit config => TODO: get data from json file
            return "http://" + location.hostname + ":" + mappCockpitConfig_1.MappCockpitConfiguration.port + "/api/1.0";
        };
        /**
         * gets the base url for opc ua access
         *
         * @static
         * @returns {string}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.getOpcUaBaseUrl = function () {
            return this.getBaseUrl() + "/opcua";
        };
        /**
         * gets the base url for the web socket
         *
         * @private
         * @static
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.getWsBaseUrl = function () {
            // get port for RestServiceBaseUrl from mappCockpit config => TODO: get data from json file
            var webSocketBaseUrl = "ws://" + location.hostname + ":" + mappCockpitConfig_1.MappCockpitConfiguration.port + "/api/1.0/pushchannel";
            return webSocketBaseUrl;
        };
        /**
         * provides authentifictaion for rest service access
         *
         * @static
         * @returns {Promise<number>}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.authenticate = function () {
            return __awaiter(this, void 0, void 0, function () {
                var serviceUrl, result, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            serviceUrl = OpcUaRestServices.getBaseUrl() + '/auth';
                            return [4 /*yield*/, restService_1.RestService.call(restService_1.RestServiceType.GET, serviceUrl)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result];
                        case 2:
                            error_1 = _a.sent();
                            throw new Error(error_1);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Changes login to the specified user with
         *
         * @static
         * @param {number} sessionId
         * @param {string} user
         * @param {string} password
         * @returns {Promise<number>}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.changeUser = function (sessionId, userInfo) {
            return __awaiter(this, void 0, void 0, function () {
                var serviceData, serviceUrl, userRoles, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            serviceData = { "userIdentityToken": userInfo };
                            serviceUrl = OpcUaRestServices.getOpcUaBaseUrl() + '/sessions/' + sessionId;
                            return [4 /*yield*/, restService_1.RestService.call(restService_1.RestServiceType.PATCH, serviceUrl, serviceData)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, OpcUaRestServices.getUserRoles(userInfo)];
                        case 2:
                            userRoles = _a.sent();
                            // return user roles as login (change user) result
                            return [2 /*return*/, userRoles.roles];
                        case 3:
                            error_2 = _a.sent();
                            throw new Error(error_2);
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Reads a users roles
         *
         * @static
         * @param {{}} userInfo
         * @returns {Promise<{}>}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.getUserRoles = function (userInfo) {
            return __awaiter(this, void 0, void 0, function () {
                var headers, serviceUrl, userRoles, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            headers = OpcUaRestServices.createUserRoleAccessHeaders(userInfo);
                            serviceUrl = OpcUaRestServices.getBaseUrl() + '/rbac/myroles';
                            return [4 /*yield*/, restService_1.RestService.call(restService_1.RestServiceType.GET, serviceUrl, null, headers)];
                        case 1:
                            userRoles = _a.sent();
                            return [2 /*return*/, userRoles];
                        case 2:
                            error_3 = _a.sent();
                            throw new Error(error_3);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Creates the headers for accessing user roles
         *
         * @private
         * @static
         * @param {{}} userInfo
         * @returns
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.createUserRoleAccessHeaders = function (userInfo) {
            return {
                "Authorization": "Basic " + btoa(OpcUaRestServices.encode_utf8(userInfo.username) + ":" + OpcUaRestServices.encode_utf8(userInfo.password))
            };
        };
        OpcUaRestServices.encode_utf8 = function (s) {
            return unescape(encodeURIComponent(s));
        };
        /**
         * Creates a new session
         *
         * @static
         * @returns {Promise<string>} The created session id
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.createSession = function () {
            return __awaiter(this, void 0, void 0, function () {
                var serviceUrl, serviceData, result, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            serviceUrl = OpcUaRestServices.getOpcUaBaseUrl() + '/sessions';
                            serviceData = { "url": OpcUaRestServices.getOpcUaRestServiceEndPointUrl() };
                            return [4 /*yield*/, restService_1.RestService.call(restService_1.RestServiceType.POST, serviceUrl, serviceData)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result.id];
                        case 2:
                            error_4 = _a.sent();
                            throw new Error(error_4);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Deletes a session
         *
         * @static
         * @param {number} sessionId Specifies the session to delete.
         * @returns {Promise<number>}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.deleteSession = function (sessionId) {
            return __awaiter(this, void 0, void 0, function () {
                var serviceUrl, error_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            serviceUrl = OpcUaRestServices.getOpcUaBaseUrl() + '/sessions/' + sessionId;
                            return [4 /*yield*/, restService_1.RestService.call(restService_1.RestServiceType.DELETE, serviceUrl)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, sessionId];
                        case 2:
                            error_5 = _a.sent();
                            throw new Error(error_5);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * creates a subscription as a container for opc-ua items to be monitored (observed)
         *
         * @static
         * @param {number} sessionId
         * @param {number} [interval=100]
         * @param {boolean} [enabled=true]
         * @returns {Promise<string>}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.createSubscription = function (sessionId, interval, enabled) {
            if (interval === void 0) { interval = 200; }
            if (enabled === void 0) { enabled = true; }
            return __awaiter(this, void 0, void 0, function () {
                var serviceUrl, subscriptionSettings, serviceData, result, error_6;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            serviceUrl = OpcUaRestServices.getOpcUaBaseUrl() + '/sessions/' + sessionId + '/subscriptions';
                            subscriptionSettings = {
                                publishingInterval: interval,
                                publishingEnabled: enabled
                            };
                            serviceData = subscriptionSettings;
                            return [4 /*yield*/, restService_1.RestService.call(restService_1.RestServiceType.POST, serviceUrl, serviceData)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result.subscriptionId];
                        case 2:
                            error_6 = _a.sent();
                            throw new Error(error_6);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * deletes a subscription
         *
         * @static
         * @param {number} sessionId
         * @param {*} subscriptionId
         * @returns {Promise<string>}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.deleteSubscription = function (sessionId, subscriptionId) {
            return __awaiter(this, void 0, void 0, function () {
                var serviceUrl, serviceData, error_7;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            serviceUrl = OpcUaRestServices.getOpcUaBaseUrl() + '/sessions/' + sessionId + '/subscriptions/' + subscriptionId;
                            serviceData = { "url": OpcUaRestServices.getOpcUaRestServiceEndPointUrl() };
                            return [4 /*yield*/, restService_1.RestService.call(restService_1.RestServiceType.DELETE, serviceUrl, serviceData)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, subscriptionId];
                        case 2:
                            error_7 = _a.sent();
                            throw new Error(error_7);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * create a monitored item
         *
         * @static
         * @param {number} sessionId specifies the service session id
         * @param {string} subscriptionId specifies the subscription id
         * @param {string} nodeId specifies the node to be subscribed
         * @param {OpcUaAttribute} specifies the attribute to be scubscribed
         * @returns {Promise<string>}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.createMonitoredItem = function (sessionId, subscriptionId, nodeId, itemId, samplingInterval, attribute) {
            return __awaiter(this, void 0, void 0, function () {
                var serviceUrl, monitorItemSettings, serviceData, result, error_8;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            serviceUrl = OpcUaRestServices.getOpcUaBaseUrl() + '/sessions/' + sessionId + '/subscriptions/' + subscriptionId + '/monitoredItems';
                            monitorItemSettings = {
                                itemToMonitor: {
                                    nodeId: nodeId,
                                    attribute: attribute
                                },
                                monitoringParameters: {
                                    samplingInterval: samplingInterval,
                                    clientHandle: itemId
                                },
                            };
                            serviceData = monitorItemSettings;
                            return [4 /*yield*/, restService_1.RestService.call(restService_1.RestServiceType.POST, serviceUrl, serviceData)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result];
                        case 2:
                            error_8 = _a.sent();
                            throw new Error(error_8);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * deletes a monitored item
         *
         * @static
         * @param {number} sessionId
         * @param {string} subscriptionId
         * @param {*} monitoredItemId
         * @returns {Promise<string>}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.deleteMonitoredItem = function (sessionId, subscriptionId, monitoredItemId) {
            try {
                // define baes url
                var serviceUrl = OpcUaRestServices.getOpcUaBaseUrl() + '/sessions/' + sessionId + '/subscriptions/' + subscriptionId + '/monitoredItems/' + monitoredItemId;
                // call the service with the specified parameters            
                // var result = OpcUaRestServices.mode ==  RestServiceMode.EXECUTE ? 
                //     await RestService.call<any>(RestServiceType.DELETE, serviceUrl) : 
                //     RestService.createRequest(RestServiceType.DELETE, serviceUrl); ;
                var result = restService_1.RestService.createRequest(restService_1.RestServiceType.DELETE, serviceUrl);
                if (result === undefined) {
                    console.log("??????");
                }
                return result;
            }
            catch (error) {
                throw new Error(error);
            }
        };
        /**
        * Reads the namespace index for mapp Cockpit services
        *
        * @static
        * @param {number} sessionId
        * @returns {Promise<number>} The index of the namespace
        * @memberof OpcUaRestServices
        */
        OpcUaRestServices.getNamespaceIndex = function (sessionId) {
            return __awaiter(this, void 0, void 0, function () {
                var serviceUrl, result, error_9;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            serviceUrl = OpcUaRestServices.getOpcUaBaseUrl() + '/sessions/' + sessionId + '/namespaces/' + encodeURIComponent(OpcUaRestServices.mappCockpitOpcUaNamespace);
                            return [4 /*yield*/, restService_1.RestService.call(restService_1.RestServiceType.GET, serviceUrl)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result.index];
                        case 2:
                            error_9 = _a.sent();
                            throw new Error(error_9);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Browses the child nodes of the specified parent node
         *
         * @static
         * @param {number} sessionId
         * @param {string} parentNodeId
         * @returns {Promise<any>}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.browseNodes = function (sessionId, parentNodeId) {
            return __awaiter(this, void 0, void 0, function () {
                var serviceUrl, result, error_10;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            serviceUrl = OpcUaRestServices.getOpcUaBaseUrl() + '/sessions/' + sessionId + '/nodes/' + encodeURIComponent(parentNodeId) + '/references';
                            return [4 /*yield*/, restService_1.RestService.call(restService_1.RestServiceType.GET, serviceUrl)];
                        case 1:
                            result = _a.sent();
                            // Remove NamespaceIndex from browseName
                            result.references.forEach(function (reference) {
                                var startIndex = reference.browseName.indexOf('"', 0);
                                startIndex++;
                                var endIndex = reference.browseName.indexOf('"', startIndex);
                                reference.browseName = reference.browseName.substr(startIndex, endIndex - startIndex);
                            });
                            return [2 /*return*/, result.references];
                        case 2:
                            error_10 = _a.sent();
                            throw new Error(error_10);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * browses the meta info for a component
         *
         * @static
         * @param {number} sessionId
         * @param {string} nodeId
         * @returns {Promise<Array<Rest.InterfaceOpcUaRestResultNodeReference>>}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.browseNodeMetaInfo = function (sessionId, nodeId) {
            return __awaiter(this, void 0, void 0, function () {
                var metaInfoReferences, childNodes, metaNodes, metaNode, i, metaInfoReference, metaInfoValue, error_11;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 7, , 8]);
                            metaInfoReferences = undefined;
                            return [4 /*yield*/, OpcUaRestServices.browseNodes(sessionId, nodeId)];
                        case 1:
                            childNodes = _a.sent();
                            metaNodes = childNodes.filter(function (childNode) { return childNode.browseName === OpcUaRestServices.mappCockpitMetaNodeId; });
                            if (!(metaNodes.length === 1)) return [3 /*break*/, 6];
                            metaNode = metaNodes[0];
                            return [4 /*yield*/, OpcUaRestServices.browseNodes(sessionId, metaNode.nodeId)];
                        case 2:
                            // Browse the meta info nodes
                            metaInfoReferences = _a.sent();
                            if (!metaInfoReferences) return [3 /*break*/, 6];
                            // retrieve valid meta nodes
                            metaInfoReferences = metaInfoReferences.filter(function (parameter) { return parameter.nodeClass === "Variable"; });
                            i = 0;
                            _a.label = 3;
                        case 3:
                            if (!(i < metaInfoReferences.length)) return [3 /*break*/, 6];
                            metaInfoReference = metaInfoReferences[i];
                            return [4 /*yield*/, OpcUaRestServices.readNodeAttribute(sessionId, metaInfoReference.nodeId)];
                        case 4:
                            metaInfoValue = _a.sent();
                            metaInfoReference.value = metaInfoValue;
                            _a.label = 5;
                        case 5:
                            i++;
                            return [3 /*break*/, 3];
                        case 6: return [2 /*return*/, metaInfoReferences];
                        case 7:
                            error_11 = _a.sent();
                            throw error_11;
                        case 8: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Browses the parameter set of a node if any.
         *
         * @static
         * @param {number} sessionId
         * @param {string} nodeId
         * @returns {Promise<Array<OpcUaNodeReferenceInterface>>} The paremeter references
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.browseNodeParameterSet = function (sessionId, nodeId) {
            return __awaiter(this, void 0, void 0, function () {
                var parameterReferences, valueParameterReferences, error_12;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            // Add the sub node id for parameter.
                            nodeId += ".ParameterSet";
                            return [4 /*yield*/, OpcUaRestServices.browseNodes(sessionId, nodeId)];
                        case 1:
                            parameterReferences = (_a.sent());
                            valueParameterReferences = parameterReferences.filter(function (parameter) { return parameter.nodeClass === "Variable"; });
                            return [2 /*return*/, valueParameterReferences];
                        case 2:
                            error_12 = _a.sent();
                            throw new Error(error_12);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Reads the specified node attribute
         *
         * @static
         * @param {number} sessionId
         * @param {string} nodeId
         * @param {*} attribute
         * @param {*} OpcUaAttribute
         * @returns {Promise<any>}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.readNodeAttribute = function (sessionId, nodeId, attribute) {
            if (attribute === void 0) { attribute = OpcUaAttribute.VALUE; }
            return __awaiter(this, void 0, void 0, function () {
                var serviceUrl, result, error_13;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            serviceUrl = OpcUaRestServices.getOpcUaBaseUrl() + '/sessions/' + sessionId + '/nodes/' + encodeURIComponent(nodeId) + '/attributes/' + attribute;
                            return [4 /*yield*/, restService_1.RestService.call(restService_1.RestServiceType.GET, serviceUrl)];
                        case 1:
                            result = (_a.sent()).value;
                            return [2 /*return*/, result];
                        case 2:
                            error_13 = _a.sent();
                            throw new Error(error_13);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Writes the node attribute
         *
         * @static
         * @param {number} sessionId
         * @param {string} nodeId
         * @param {OpcUaAttribute} [attribute=OpcUaAttribute.VALUE]
         * @param {*} value
         * @returns {Promise<any>}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.writeNodeAttribute = function (sessionId, nodeId, attribute, value) {
            if (attribute === void 0) { attribute = OpcUaAttribute.VALUE; }
            return __awaiter(this, void 0, void 0, function () {
                var valueData, serviceUrl, error_14;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            valueData = value;
                            if (attribute === OpcUaAttribute.VALUE) {
                                valueData = { "value": value };
                            }
                            serviceUrl = OpcUaRestServices.getOpcUaBaseUrl() + '/sessions/' + sessionId + '/nodes/' + encodeURIComponent(nodeId) + '/attributes/' + attribute;
                            return [4 /*yield*/, restService_1.RestService.call(restService_1.RestServiceType.PUT, serviceUrl, valueData)];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            error_14 = _a.sent();
                            throw new Error(error_14);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Browses the method set of a node if any.
         *
         * @static
         * @param {number} sessionId
         * @param {string} nodeId
         * @returns {Promise<Array<OpcUaNodeReferenceInterface>>}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.browseNodeMethodSet = function (sessionId, nodeId) {
            return __awaiter(this, void 0, void 0, function () {
                var methodReferences, error_15;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            // Add the sub node id for methods.
                            nodeId += ".MethodSet";
                            return [4 /*yield*/, OpcUaRestServices.browseNodes(sessionId, nodeId)];
                        case 1:
                            methodReferences = (_a.sent()).filter(function (method) { return method.nodeClass === "Method"; });
                            return [2 /*return*/, methodReferences];
                        case 2:
                            error_15 = _a.sent();
                            throw new Error(error_15);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Reads the input parameters of a method
         *
         * @static
         * @param {number} sessionId
         * @param {string} nodeId
         * @returns {Promise<any>}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.readMethodParameters = function (sessionId, nodeId) {
            return __awaiter(this, void 0, void 0, function () {
                var inputArguments, error_16;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            // Add the sub node id for method parameters.
                            nodeId += "#InputArguments";
                            return [4 /*yield*/, OpcUaRestServices.readNodeAttribute(sessionId, nodeId, OpcUaAttribute.VALUE)];
                        case 1:
                            inputArguments = (_a.sent());
                            return [2 /*return*/, inputArguments];
                        case 2:
                            error_16 = _a.sent();
                            throw new Error(error_16);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Create and call a json batch request
         *
         * @static
         * @param {JQuery.AjaxSettings<any>[]} restRequests
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.callBatchRequest = function (restRequests) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, restService_1.RestService.callBatchRequest(this.getOpcUaBaseUrl(), restRequests)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * Executes the specified method
         *
         * @static
         * @template T_METHOD_RESULT
         * @param {number} sessionId
         * @param {string} nodeId
         * @param {string} methodId
         * @param {*} methodArgs
         * @returns {Promise<T_METHOD_RESULT>}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.executeMethod = function (sessionId, nodeId, methodId, methodArgs) {
            return __awaiter(this, void 0, void 0, function () {
                var serviceUrl, result, error_17;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            serviceUrl = OpcUaRestServices.getOpcUaBaseUrl() + '/sessions/' + sessionId + '/nodes/' + encodeURIComponent(nodeId) + '/methods/' + encodeURIComponent(methodId);
                            return [4 /*yield*/, restService_1.RestService.call(restService_1.RestServiceType.POST, serviceUrl, methodArgs)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result];
                        case 2:
                            error_17 = _a.sent();
                            throw new Error(error_17);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Filters the nodes to be displayed in mapp cockpit
         *
         * @static
         * @param {Array<Rest.InterfaceOpcUaRestResultNodeReference>} opcUaNodes
         * @param {string} mappCockpitNamespace
         * @returns
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.filterMappCockpitNodes = function (opcUaNodes, mappCockpitNamespace) {
            return opcUaNodes.filter(function (nodeReference) {
                var isChildNode = nodeReference.isForward === true;
                // check if the node is within the mapp cockpit namespace
                var isMappComponent = nodeReference.typeDefinition.indexOf(mappCockpitNamespace) > -1;
                return isChildNode && isMappComponent;
            });
        };
        // Specifies the mapp Cockpit namespace
        OpcUaRestServices.mappCockpitOpcUaNamespace = "urn:B&R/Diagnosis/mappCockpit";
        // Specifies the mapp Cockpit componente root node id
        OpcUaRestServices.mappCockpitRootNodeId = "i=2100";
        // Specifies the component for reading trace data
        OpcUaRestServices.mappCockpitTraceDataProviderId = "s=NewTraceRecord.MethodSet";
        // Specifies the datapoint name base for reading trace data
        OpcUaRestServices.mappCockpitTraceDataPointNameId = "s=NewTraceRecord.RecordedDataPointName";
        // Specifies the trgger time name for reading trace data
        OpcUaRestServices.mappCockpitTraceTriggerTime = "s=NewTraceRecord.TriggerTime";
        OpcUaRestServices.mappCockpitTraceDataPointCount = 32;
        // Specifies the component for reading trace data
        OpcUaRestServices.mappCockpitTraceReadDataMethodId = "s=NewTraceRecord.GetRecordedDataArray";
        // specifies the root node id for enum definitions
        OpcUaRestServices.mappCockpitEnumsId = "ns=0;i=29";
        // specifies the meta info node id
        OpcUaRestServices.mappCockpitMetaNodeId = "$BrMetaInfo";
        // specifies the namespace prefix string
        OpcUaRestServices.mappCockpitNamespacePrefix = "ns=";
        // specifies the sampling rate for montitoring items
        OpcUaRestServices.monitoringSamplingInterval = 100;
        // specifies the service mode
        OpcUaRestServices.mode = restService_1.RestServiceMode.EXECUTE;
        return OpcUaRestServices;
    }());
    exports.OpcUaRestServices = OpcUaRestServices;
    /**
     * Defines OpcUa Attribute names.
     *
     * @enum {number}
     */
    var OpcUaAttribute;
    (function (OpcUaAttribute) {
        OpcUaAttribute["VALUE"] = "Value";
        OpcUaAttribute["DATA_TYPE"] = "DataType";
        OpcUaAttribute["BROWSE_NAME"] = "BrowseName";
        OpcUaAttribute["DISPLAY_NAME"] = "DisplayName";
        OpcUaAttribute["DESCRIPTION"] = "Description";
        OpcUaAttribute["USER_ACCESS_LEVEL"] = "UserAccessLevel";
    })(OpcUaAttribute || (OpcUaAttribute = {}));
    exports.OpcUaAttribute = OpcUaAttribute;
    /**
     * Specifies access levels ( as bit flags )
     *
     * @enum {number}
     */
    var OpcUaAccessLevel;
    (function (OpcUaAccessLevel) {
        OpcUaAccessLevel[OpcUaAccessLevel["CurrentRead"] = 1] = "CurrentRead";
        OpcUaAccessLevel[OpcUaAccessLevel["CurrentWrite"] = 2] = "CurrentWrite";
        OpcUaAccessLevel[OpcUaAccessLevel["HistoryRead"] = 4] = "HistoryRead";
        OpcUaAccessLevel[OpcUaAccessLevel["HistoryWrite"] = 8] = "HistoryWrite";
        OpcUaAccessLevel[OpcUaAccessLevel["SemanticChange"] = 16] = "SemanticChange";
        OpcUaAccessLevel[OpcUaAccessLevel["StatusWrite"] = 32] = "StatusWrite";
        OpcUaAccessLevel[OpcUaAccessLevel["TimestampWrite"] = 64] = "TimestampWrite";
        OpcUaAccessLevel[OpcUaAccessLevel["Reserved"] = 128] = "Reserved";
    })(OpcUaAccessLevel || (OpcUaAccessLevel = {}));
    exports.OpcUaAccessLevel = OpcUaAccessLevel;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3BjVWFSZXN0U2VydmljZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW11bmljYXRpb24vcmVzdC9vcGNVYVJlc3RTZXJ2aWNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFvbkI0QixvQkFBSTtJQUFFLDBCQW5uQkksNkJBQWUsQ0FtbkJKO0lBaG5CakQ7Ozs7T0FJRztJQUNIO1FBQUE7UUF5a0JBLENBQUM7UUFuaUJHLDJDQUEyQztRQUNwQyxnREFBOEIsR0FBckM7WUFDSSxPQUFPLFlBQVksR0FBRyxRQUFRLENBQUMsUUFBUSxHQUFHLEdBQUcsR0FBRyw0Q0FBd0IsQ0FBQyxTQUFTLENBQUM7UUFDdkYsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNJLDRCQUFVLEdBQWpCO1lBQ0ksMkZBQTJGO1lBQzNGLE9BQU8sU0FBUyxHQUFHLFFBQVEsQ0FBQyxRQUFRLEdBQUcsR0FBRyxHQUFHLDRDQUF3QixDQUFDLElBQUksR0FBRyxVQUFVLENBQUM7UUFFNUYsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNJLGlDQUFlLEdBQXRCO1lBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxFQUFFLEdBQUcsUUFBUSxDQUFDO1FBQ3hDLENBQUM7UUFHRDs7Ozs7O1dBTUc7UUFDSSw4QkFBWSxHQUFuQjtZQUNJLDJGQUEyRjtZQUMzRixJQUFJLGdCQUFnQixHQUFHLE9BQU8sR0FBRyxRQUFRLENBQUMsUUFBUSxHQUFHLEdBQUcsR0FBRyw0Q0FBd0IsQ0FBQyxJQUFJLEdBQUcsc0JBQXNCLENBQUM7WUFFbEgsT0FBTyxnQkFBZ0IsQ0FBQztRQUM1QixDQUFDO1FBR0Q7Ozs7OztXQU1HO1FBQ1UsOEJBQVksR0FBekI7Ozs7Ozs7NEJBR1ksVUFBVSxHQUFHLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxHQUFHLE9BQU8sQ0FBQzs0QkFDN0MscUJBQU0seUJB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MkIsR0FBVyw4QkFBOEIsQ0FBQztRQUVyRSxnREFBOEIsR0FBVyxFQUFFLENBQUM7UUFFNUQsaURBQWlEO1FBQ2pDLGtEQUFnQyxHQUFXLHVDQUF1QyxDQUFDO1FBRW5HLGtEQUFrRDtRQUNsQyxvQ0FBa0IsR0FBVyxXQUFXLENBQUM7UUFFekQsa0NBQWtDO1FBQ2xCLHVDQUFxQixHQUFVLGFBQWEsQ0FBQztRQUU3RCx3Q0FBd0M7UUFDeEIsNENBQTBCLEdBQVcsS0FBSyxDQUFDO1FBRTNELG9EQUFvRDtRQUNwQyw0Q0FBMEIsR0FBVyxHQUFHLENBQUM7UUFFekQsNkJBQTZCO1FBQ3RCLHNCQUFJLEdBQW9CLDZCQUFlLENBQUMsT0FBTyxDQUFDO1FBc2lCM0Qsd0JBQUM7S0FBQSxBQXprQkQsSUF5a0JDO0lBa0NRLDhDQUFpQjtJQWpDMUI7Ozs7T0FJRztJQUNILElBQUssY0FPSjtJQVBELFdBQUssY0FBYztRQUNmLGlDQUFlLENBQUE7UUFDZix3Q0FBc0IsQ0FBQTtRQUN0Qiw0Q0FBMEIsQ0FBQTtRQUMxQiw4Q0FBNEIsQ0FBQTtRQUM1Qiw2Q0FBMkIsQ0FBQTtRQUMzQix1REFBcUMsQ0FBQTtJQUN6QyxDQUFDLEVBUEksY0FBYyxLQUFkLGNBQWMsUUFPbEI7SUFxQmlELHdDQUFjO0lBbkJoRTs7OztPQUlHO0lBQ0gsSUFBSyxnQkFTSjtJQVRELFdBQUssZ0JBQWdCO1FBQ2pCLHFFQUFrQixDQUFBO1FBQ2xCLHVFQUFtQixDQUFBO1FBQ25CLHFFQUFrQixDQUFBO1FBQ2xCLHVFQUFtQixDQUFBO1FBQ25CLDRFQUFxQixDQUFBO1FBQ3JCLHNFQUFrQixDQUFBO1FBQ2xCLDRFQUFxQixDQUFBO1FBQ3JCLGlFQUFlLENBQUE7SUFDbkIsQ0FBQyxFQVRJLGdCQUFnQixLQUFoQixnQkFBZ0IsUUFTcEI7SUFLaUUsNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVzdCBmcm9tIFwiLi9vcGNVYVJlc3RSZXN1bHRUeXBlc1wiO1xyXG5pbXBvcnQgeyBSZXN0U2VydmljZSwgUmVzdFNlcnZpY2VUeXBlLFJlc3RTZXJ2aWNlTW9kZSwgUmVzdFJlcXVlc3RJbmZvIH0gZnJvbSBcIi4vcmVzdFNlcnZpY2VcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb25maWd1cmF0aW9uIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9tYXBwQ29ja3BpdENvbmZpZ1wiO1xyXG5cclxuLyoqXHJcbiAqIEltcGxlbWVudHMgdGhlIHJlc3Qgc2VydmljZSBjYWxscyBmb3IgbWFwcCBDb2NrcGl0XHJcbiAqXHJcbiAqIEBjbGFzcyBPcGNVYVJlc3RTZXJ2aWNlc1xyXG4gKi9cclxuY2xhc3MgT3BjVWFSZXN0U2VydmljZXMge1xyXG5cclxuICAgIC8vIFNwZWNpZmllcyB0aGUgbWFwcCBDb2NrcGl0IG5hbWVzcGFjZVxyXG4gICAgc3RhdGljIHJlYWRvbmx5IG1hcHBDb2NrcGl0T3BjVWFOYW1lc3BhY2U6IHN0cmluZyA9IFwidXJuOkImUi9EaWFnbm9zaXMvbWFwcENvY2twaXRcIjtcclxuXHJcbiAgICAvLyBTcGVjaWZpZXMgdGhlIG1hcHAgQ29ja3BpdCBjb21wb25lbnRlIHJvb3Qgbm9kZSBpZFxyXG4gICAgc3RhdGljIHJlYWRvbmx5IG1hcHBDb2NrcGl0Um9vdE5vZGVJZDogc3RyaW5nID0gXCJpPTIxMDBcIjtcclxuXHJcbiAgICAvLyBTcGVjaWZpZXMgdGhlIGNvbXBvbmVudCBmb3IgcmVhZGluZyB0cmFjZSBkYXRhXHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgbWFwcENvY2twaXRUcmFjZURhdGFQcm92aWRlcklkOiBzdHJpbmcgPSBcInM9TmV3VHJhY2VSZWNvcmQuTWV0aG9kU2V0XCI7XHJcblxyXG4gICAgLy8gU3BlY2lmaWVzIHRoZSBkYXRhcG9pbnQgbmFtZSBiYXNlIGZvciByZWFkaW5nIHRyYWNlIGRhdGFcclxuICAgIHN0YXRpYyByZWFkb25seSBtYXBwQ29ja3BpdFRyYWNlRGF0YVBvaW50TmFtZUlkOiBzdHJpbmcgPSBcInM9TmV3VHJhY2VSZWNvcmQuUmVjb3JkZWREYXRhUG9pbnROYW1lXCI7XHJcblxyXG4gICAgLy8gU3BlY2lmaWVzIHRoZSB0cmdnZXIgdGltZSBuYW1lIGZvciByZWFkaW5nIHRyYWNlIGRhdGFcclxuICAgIHN0YXRpYyByZWFkb25seSBtYXBwQ29ja3BpdFRyYWNlVHJpZ2dlclRpbWU6IHN0cmluZyA9IFwicz1OZXdUcmFjZVJlY29yZC5UcmlnZ2VyVGltZVwiO1xyXG5cclxuICAgIHN0YXRpYyByZWFkb25seSBtYXBwQ29ja3BpdFRyYWNlRGF0YVBvaW50Q291bnQ6IG51bWJlciA9IDMyO1xyXG5cclxuICAgIC8vIFNwZWNpZmllcyB0aGUgY29tcG9uZW50IGZvciByZWFkaW5nIHRyYWNlIGRhdGFcclxuICAgIHN0YXRpYyByZWFkb25seSBtYXBwQ29ja3BpdFRyYWNlUmVhZERhdGFNZXRob2RJZDogc3RyaW5nID0gXCJzPU5ld1RyYWNlUmVjb3JkLkdldFJlY29yZGVkRGF0YUFycmF5XCI7XHJcblxyXG4gICAgLy8gc3BlY2lmaWVzIHRoZSByb290IG5vZGUgaWQgZm9yIGVudW0gZGVmaW5pdGlvbnNcclxuICAgIHN0YXRpYyByZWFkb25seSBtYXBwQ29ja3BpdEVudW1zSWQ6IHN0cmluZyA9IFwibnM9MDtpPTI5XCI7XHJcblxyXG4gICAgLy8gc3BlY2lmaWVzIHRoZSBtZXRhIGluZm8gbm9kZSBpZFxyXG4gICAgc3RhdGljIHJlYWRvbmx5IG1hcHBDb2NrcGl0TWV0YU5vZGVJZDpzdHJpbmcgPSBcIiRCck1ldGFJbmZvXCI7XHJcblxyXG4gICAgLy8gc3BlY2lmaWVzIHRoZSBuYW1lc3BhY2UgcHJlZml4IHN0cmluZ1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IG1hcHBDb2NrcGl0TmFtZXNwYWNlUHJlZml4OiBzdHJpbmcgPSBcIm5zPVwiO1xyXG5cclxuICAgIC8vIHNwZWNpZmllcyB0aGUgc2FtcGxpbmcgcmF0ZSBmb3IgbW9udGl0b3JpbmcgaXRlbXNcclxuICAgIHN0YXRpYyByZWFkb25seSBtb25pdG9yaW5nU2FtcGxpbmdJbnRlcnZhbDogbnVtYmVyID0gMTAwO1xyXG4gICAgXHJcbiAgICAvLyBzcGVjaWZpZXMgdGhlIHNlcnZpY2UgbW9kZVxyXG4gICAgc3RhdGljIG1vZGU6IFJlc3RTZXJ2aWNlTW9kZSA9IFJlc3RTZXJ2aWNlTW9kZS5FWEVDVVRFO1xyXG5cclxuXHJcbiAgICAvLyBTcGVjaWZpZXMgdGhlIHJlc3Qgc2VydmljZSBlbmQgcG9pbnQgdXJsXHJcbiAgICBzdGF0aWMgZ2V0T3BjVWFSZXN0U2VydmljZUVuZFBvaW50VXJsKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuICdvcGMudGNwOi8vJyArIGxvY2F0aW9uLmhvc3RuYW1lICsgJzonICsgTWFwcENvY2twaXRDb25maWd1cmF0aW9uLm9wY1VhUG9ydDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlYWRzIGFjY2VzcyBjb25maWd1cmF0aW9uIGRhdGEgYW5kIHNldHMgdGhlIGJhc2UgdXJsIGZvciB0aGUgcmVzdCBzZXJ2aWNlc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAbWVtYmVyb2YgT3BjVWFSZXN0U2VydmljZXNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldEJhc2VVcmwoKTogc3RyaW5nIHtcclxuICAgICAgICAvLyBnZXQgcG9ydCBmb3IgUmVzdFNlcnZpY2VCYXNlVXJsIGZyb20gbWFwcENvY2twaXQgY29uZmlnID0+IFRPRE86IGdldCBkYXRhIGZyb20ganNvbiBmaWxlXHJcbiAgICAgICAgcmV0dXJuIFwiaHR0cDovL1wiICsgbG9jYXRpb24uaG9zdG5hbWUgKyBcIjpcIiArIE1hcHBDb2NrcGl0Q29uZmlndXJhdGlvbi5wb3J0ICsgXCIvYXBpLzEuMFwiO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldHMgdGhlIGJhc2UgdXJsIGZvciBvcGMgdWEgYWNjZXNzXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBPcGNVYVJlc3RTZXJ2aWNlc1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0T3BjVWFCYXNlVXJsKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QmFzZVVybCgpICsgXCIvb3BjdWFcIjtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXRzIHRoZSBiYXNlIHVybCBmb3IgdGhlIHdlYiBzb2NrZXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQG1lbWJlcm9mIE9wY1VhUmVzdFNlcnZpY2VzXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBnZXRXc0Jhc2VVcmwoKTogc3RyaW5nIHtcclxuICAgICAgICAvLyBnZXQgcG9ydCBmb3IgUmVzdFNlcnZpY2VCYXNlVXJsIGZyb20gbWFwcENvY2twaXQgY29uZmlnID0+IFRPRE86IGdldCBkYXRhIGZyb20ganNvbiBmaWxlXHJcbiAgICAgICAgbGV0IHdlYlNvY2tldEJhc2VVcmwgPSBcIndzOi8vXCIgKyBsb2NhdGlvbi5ob3N0bmFtZSArIFwiOlwiICsgTWFwcENvY2twaXRDb25maWd1cmF0aW9uLnBvcnQgKyBcIi9hcGkvMS4wL3B1c2hjaGFubmVsXCI7XHJcblxyXG4gICAgICAgIHJldHVybiB3ZWJTb2NrZXRCYXNlVXJsO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIHByb3ZpZGVzIGF1dGhlbnRpZmljdGFpb24gZm9yIHJlc3Qgc2VydmljZSBhY2Nlc3NcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxudW1iZXI+fVxyXG4gICAgICogQG1lbWJlcm9mIE9wY1VhUmVzdFNlcnZpY2VzXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBhc3luYyBhdXRoZW50aWNhdGUoKTogUHJvbWlzZTxudW1iZXI+IHtcclxuICAgICAgICB0cnkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHNlcnZpY2VVcmwgPSBPcGNVYVJlc3RTZXJ2aWNlcy5nZXRCYXNlVXJsKCkgKyAnL2F1dGgnO1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gYXdhaXQgUmVzdFNlcnZpY2UuY2FsbDxhbnk+KFJlc3RTZXJ2aWNlVHlwZS5HRVQsIHNlcnZpY2VVcmwpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hhbmdlcyBsb2dpbiB0byB0aGUgc3BlY2lmaWVkIHVzZXIgd2l0aFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzZXNzaW9uSWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGFzc3dvcmRcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPG51bWJlcj59XHJcbiAgICAgKiBAbWVtYmVyb2YgT3BjVWFSZXN0U2VydmljZXNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFzeW5jIGNoYW5nZVVzZXIoc2Vzc2lvbklkOiBudW1iZXIsIHVzZXJJbmZvOiB7fSk6IFByb21pc2U8e30+IHtcclxuICAgICAgICB0cnkge1xyXG5cclxuICAgICAgICAgICAgLy97IHVzZXJuYW1lOiB1c2VyLCBwYXNzd29yZDogcGFzc3dvcmQgfSBcclxuICAgICAgICAgICAgdmFyIHNlcnZpY2VEYXRhID0geyBcInVzZXJJZGVudGl0eVRva2VuXCI6IHVzZXJJbmZvIH07XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzZXJ2aWNlVXJsID0gT3BjVWFSZXN0U2VydmljZXMuZ2V0T3BjVWFCYXNlVXJsKCkgKyAnL3Nlc3Npb25zLycgKyBzZXNzaW9uSWQ7XHJcbiAgICAgICAgICAgIGF3YWl0IFJlc3RTZXJ2aWNlLmNhbGwoUmVzdFNlcnZpY2VUeXBlLlBBVENILCBzZXJ2aWNlVXJsLCBzZXJ2aWNlRGF0YSk7XHJcblxyXG4gICAgICAgICAgICAvLyBhZnRlciBzdWNjZXNzZnVsbCBsb2dpbiB3ZSByZWFkIHRoZSB1c2VycyByb2xlc1xyXG4gICAgICAgICAgICBsZXQgdXNlclJvbGVzID0gYXdhaXQgT3BjVWFSZXN0U2VydmljZXMuZ2V0VXNlclJvbGVzKHVzZXJJbmZvKTtcclxuICAgICAgICAgICAgLy8gcmV0dXJuIHVzZXIgcm9sZXMgYXMgbG9naW4gKGNoYW5nZSB1c2VyKSByZXN1bHRcclxuICAgICAgICAgICAgcmV0dXJuICg8YW55PnVzZXJSb2xlcykucm9sZXM7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZHMgYSB1c2VycyByb2xlc1xyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7e319IHVzZXJJbmZvXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx7fT59XHJcbiAgICAgKiBAbWVtYmVyb2YgT3BjVWFSZXN0U2VydmljZXNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFzeW5jIGdldFVzZXJSb2xlcyh1c2VySW5mbzoge30pOiBQcm9taXNlPHt9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuXHJcbiAgICAgICAgICAgIGxldCBoZWFkZXJzID0gT3BjVWFSZXN0U2VydmljZXMuY3JlYXRlVXNlclJvbGVBY2Nlc3NIZWFkZXJzKHVzZXJJbmZvKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHNlcnZpY2VVcmwgPSBPcGNVYVJlc3RTZXJ2aWNlcy5nZXRCYXNlVXJsKCkgKyAnL3JiYWMvbXlyb2xlcyc7XHJcbiAgICAgICAgICAgIGxldCB1c2VyUm9sZXMgPSBhd2FpdCBSZXN0U2VydmljZS5jYWxsPHt9PihSZXN0U2VydmljZVR5cGUuR0VULCBzZXJ2aWNlVXJsLCBudWxsLCBoZWFkZXJzKTtcclxuICAgICAgICAgICAgcmV0dXJuIHVzZXJSb2xlcztcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIGhlYWRlcnMgZm9yIGFjY2Vzc2luZyB1c2VyIHJvbGVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7e319IHVzZXJJbmZvXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIE9wY1VhUmVzdFNlcnZpY2VzXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIGNyZWF0ZVVzZXJSb2xlQWNjZXNzSGVhZGVycyh1c2VySW5mbzoge30pIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBcIkF1dGhvcml6YXRpb25cIjogXCJCYXNpYyBcIiArIGJ0b2EoT3BjVWFSZXN0U2VydmljZXMuZW5jb2RlX3V0ZjgoKDxhbnk+dXNlckluZm8pLnVzZXJuYW1lKSArIFwiOlwiICsgT3BjVWFSZXN0U2VydmljZXMuZW5jb2RlX3V0ZjgoKDxhbnk+dXNlckluZm8pLnBhc3N3b3JkKSlcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGVuY29kZV91dGY4KHMpIHtcclxuICAgICAgICByZXR1cm4gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KHMpKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbmV3IHNlc3Npb25cclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxzdHJpbmc+fSBUaGUgY3JlYXRlZCBzZXNzaW9uIGlkXHJcbiAgICAgKiBAbWVtYmVyb2YgT3BjVWFSZXN0U2VydmljZXNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFzeW5jIGNyZWF0ZVNlc3Npb24oKTogUHJvbWlzZTxudW1iZXI+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB2YXIgc2VydmljZVVybCA9IE9wY1VhUmVzdFNlcnZpY2VzLmdldE9wY1VhQmFzZVVybCgpICsgJy9zZXNzaW9ucyc7XHJcbiAgICAgICAgICAgIHZhciBzZXJ2aWNlRGF0YSA9IHsgXCJ1cmxcIjogT3BjVWFSZXN0U2VydmljZXMuZ2V0T3BjVWFSZXN0U2VydmljZUVuZFBvaW50VXJsKCkgfTtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGF3YWl0IFJlc3RTZXJ2aWNlLmNhbGw8YW55PihSZXN0U2VydmljZVR5cGUuUE9TVCwgc2VydmljZVVybCwgc2VydmljZURhdGEpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0LmlkO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWxldGVzIGEgc2Vzc2lvblxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzZXNzaW9uSWQgU3BlY2lmaWVzIHRoZSBzZXNzaW9uIHRvIGRlbGV0ZS5cclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPG51bWJlcj59XHJcbiAgICAgKiBAbWVtYmVyb2YgT3BjVWFSZXN0U2VydmljZXNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFzeW5jIGRlbGV0ZVNlc3Npb24oc2Vzc2lvbklkOiBudW1iZXIpOiBQcm9taXNlPG51bWJlcj4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlcnZpY2VVcmwgPSBPcGNVYVJlc3RTZXJ2aWNlcy5nZXRPcGNVYUJhc2VVcmwoKSArICcvc2Vzc2lvbnMvJyArIHNlc3Npb25JZDtcclxuICAgICAgICAgICAgYXdhaXQgUmVzdFNlcnZpY2UuY2FsbChSZXN0U2VydmljZVR5cGUuREVMRVRFLCBzZXJ2aWNlVXJsKTtcclxuICAgICAgICAgICAgcmV0dXJuIHNlc3Npb25JZDtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZXMgYSBzdWJzY3JpcHRpb24gYXMgYSBjb250YWluZXIgZm9yIG9wYy11YSBpdGVtcyB0byBiZSBtb25pdG9yZWQgKG9ic2VydmVkKVxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzZXNzaW9uSWRcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbaW50ZXJ2YWw9MTAwXVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbZW5hYmxlZD10cnVlXVxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8c3RyaW5nPn1cclxuICAgICAqIEBtZW1iZXJvZiBPcGNVYVJlc3RTZXJ2aWNlc1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYXN5bmMgY3JlYXRlU3Vic2NyaXB0aW9uKHNlc3Npb25JZDogbnVtYmVyLCBpbnRlcnZhbDogbnVtYmVyID0gMjAwLCBlbmFibGVkOiBib29sZWFuID0gdHJ1ZSk6IFByb21pc2U8bnVtYmVyPiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gZGVmaW5lIGJhZXMgdXJsXHJcbiAgICAgICAgICAgIHZhciBzZXJ2aWNlVXJsID0gT3BjVWFSZXN0U2VydmljZXMuZ2V0T3BjVWFCYXNlVXJsKCkgKyAnL3Nlc3Npb25zLycgKyBzZXNzaW9uSWQgKyAnL3N1YnNjcmlwdGlvbnMnO1xyXG5cclxuICAgICAgICAgICAgLy8gZGVmaW5lIHN1YnNjcml0aW9uIHNldHRpbmdzXHJcbiAgICAgICAgICAgIGxldCBzdWJzY3JpcHRpb25TZXR0aW5ncyA9IHtcclxuICAgICAgICAgICAgICAgIHB1Ymxpc2hpbmdJbnRlcnZhbDogaW50ZXJ2YWwsXHJcbiAgICAgICAgICAgICAgICBwdWJsaXNoaW5nRW5hYmxlZDogZW5hYmxlZFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAvLyBjYWxsIHRoZSBzZXJ2aWNlIHdpdGggdGhlIHNwZWNpZmllZCBwYXJhbWV0ZXJzICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBzZXJ2aWNlRGF0YSA9IHN1YnNjcmlwdGlvblNldHRpbmdzO1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gYXdhaXQgUmVzdFNlcnZpY2UuY2FsbDxhbnk+KFJlc3RTZXJ2aWNlVHlwZS5QT1NULCBzZXJ2aWNlVXJsLCBzZXJ2aWNlRGF0YSk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQuc3Vic2NyaXB0aW9uSWQ7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBkZWxldGVzIGEgc3Vic2NyaXB0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNlc3Npb25JZFxyXG4gICAgICogQHBhcmFtIHsqfSBzdWJzY3JpcHRpb25JZFxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8c3RyaW5nPn1cclxuICAgICAqIEBtZW1iZXJvZiBPcGNVYVJlc3RTZXJ2aWNlc1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYXN5bmMgZGVsZXRlU3Vic2NyaXB0aW9uKHNlc3Npb25JZDogbnVtYmVyLCBzdWJzY3JpcHRpb25JZDogbnVtYmVyKTogUHJvbWlzZTxudW1iZXI+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB2YXIgc2VydmljZVVybCA9IE9wY1VhUmVzdFNlcnZpY2VzLmdldE9wY1VhQmFzZVVybCgpICsgJy9zZXNzaW9ucy8nICsgc2Vzc2lvbklkICsgJy9zdWJzY3JpcHRpb25zLycgKyBzdWJzY3JpcHRpb25JZDtcclxuICAgICAgICAgICAgdmFyIHNlcnZpY2VEYXRhID0geyBcInVybFwiOiBPcGNVYVJlc3RTZXJ2aWNlcy5nZXRPcGNVYVJlc3RTZXJ2aWNlRW5kUG9pbnRVcmwoKSB9O1xyXG4gICAgICAgICAgICBhd2FpdCBSZXN0U2VydmljZS5jYWxsPGFueT4oUmVzdFNlcnZpY2VUeXBlLkRFTEVURSwgc2VydmljZVVybCwgc2VydmljZURhdGEpO1xyXG4gICAgICAgICAgICByZXR1cm4gc3Vic2NyaXB0aW9uSWQ7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjcmVhdGUgYSBtb25pdG9yZWQgaXRlbVxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzZXNzaW9uSWQgc3BlY2lmaWVzIHRoZSBzZXJ2aWNlIHNlc3Npb24gaWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdWJzY3JpcHRpb25JZCBzcGVjaWZpZXMgdGhlIHN1YnNjcmlwdGlvbiBpZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5vZGVJZCBzcGVjaWZpZXMgdGhlIG5vZGUgdG8gYmUgc3Vic2NyaWJlZFxyXG4gICAgICogQHBhcmFtIHtPcGNVYUF0dHJpYnV0ZX0gc3BlY2lmaWVzIHRoZSBhdHRyaWJ1dGUgdG8gYmUgc2N1YnNjcmliZWRcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHN0cmluZz59XHJcbiAgICAgKiBAbWVtYmVyb2YgT3BjVWFSZXN0U2VydmljZXNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFzeW5jIGNyZWF0ZU1vbml0b3JlZEl0ZW0oc2Vzc2lvbklkOiBudW1iZXIsIHN1YnNjcmlwdGlvbklkOiBudW1iZXIsIG5vZGVJZDogc3RyaW5nLCBpdGVtSWQ6IG51bWJlciwgc2FtcGxpbmdJbnRlcnZhbDogbnVtYmVyLCBhdHRyaWJ1dGU6IE9wY1VhQXR0cmlidXRlKTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvLyBkZWZpbmUgYmFlcyB1cmxcclxuICAgICAgICAgICAgdmFyIHNlcnZpY2VVcmwgPSBPcGNVYVJlc3RTZXJ2aWNlcy5nZXRPcGNVYUJhc2VVcmwoKSArICcvc2Vzc2lvbnMvJyArIHNlc3Npb25JZCArICcvc3Vic2NyaXB0aW9ucy8nICsgc3Vic2NyaXB0aW9uSWQgKyAnL21vbml0b3JlZEl0ZW1zJztcclxuXHJcbiAgICAgICAgICAgIC8vIGRlZmluZSBtb25pdG9yIGl0ZW0gc2V0dGluZ3NcclxuICAgICAgICAgICAgY29uc3QgbW9uaXRvckl0ZW1TZXR0aW5ncyA9IHtcclxuICAgICAgICAgICAgICAgIGl0ZW1Ub01vbml0b3I6IHtcclxuICAgICAgICAgICAgICAgICAgICBub2RlSWQ6IG5vZGVJZCxcclxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGU6IGF0dHJpYnV0ZVxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBtb25pdG9yaW5nUGFyYW1ldGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNhbXBsaW5nSW50ZXJ2YWw6IHNhbXBsaW5nSW50ZXJ2YWwsXHJcbiAgICAgICAgICAgICAgICAgICAgY2xpZW50SGFuZGxlOiBpdGVtSWRcclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLy8gY2FsbCB0aGUgc2VydmljZSB3aXRoIHRoZSBzcGVjaWZpZWQgcGFyYW1ldGVycyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgc2VydmljZURhdGEgPSBtb25pdG9ySXRlbVNldHRpbmdzO1xyXG5cclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGF3YWl0IFJlc3RTZXJ2aWNlLmNhbGw8YW55PihSZXN0U2VydmljZVR5cGUuUE9TVCwgc2VydmljZVVybCwgc2VydmljZURhdGEpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBkZWxldGVzIGEgbW9uaXRvcmVkIGl0ZW1cclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2Vzc2lvbklkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3Vic2NyaXB0aW9uSWRcclxuICAgICAqIEBwYXJhbSB7Kn0gbW9uaXRvcmVkSXRlbUlkXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxzdHJpbmc+fVxyXG4gICAgICogQG1lbWJlcm9mIE9wY1VhUmVzdFNlcnZpY2VzXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyAgZGVsZXRlTW9uaXRvcmVkSXRlbShzZXNzaW9uSWQ6IHN0cmluZywgc3Vic2NyaXB0aW9uSWQ6IG51bWJlciwgbW9uaXRvcmVkSXRlbUlkOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIGRlZmluZSBiYWVzIHVybFxyXG4gICAgICAgICAgICB2YXIgc2VydmljZVVybCA9IE9wY1VhUmVzdFNlcnZpY2VzLmdldE9wY1VhQmFzZVVybCgpICsgJy9zZXNzaW9ucy8nICsgc2Vzc2lvbklkICsgJy9zdWJzY3JpcHRpb25zLycgKyBzdWJzY3JpcHRpb25JZCArICcvbW9uaXRvcmVkSXRlbXMvJyArIG1vbml0b3JlZEl0ZW1JZDtcclxuXHJcbiAgICAgICAgICAgIC8vIGNhbGwgdGhlIHNlcnZpY2Ugd2l0aCB0aGUgc3BlY2lmaWVkIHBhcmFtZXRlcnMgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gdmFyIHJlc3VsdCA9IE9wY1VhUmVzdFNlcnZpY2VzLm1vZGUgPT0gIFJlc3RTZXJ2aWNlTW9kZS5FWEVDVVRFID8gXHJcbiAgICAgICAgICAgIC8vICAgICBhd2FpdCBSZXN0U2VydmljZS5jYWxsPGFueT4oUmVzdFNlcnZpY2VUeXBlLkRFTEVURSwgc2VydmljZVVybCkgOiBcclxuICAgICAgICAgICAgLy8gICAgIFJlc3RTZXJ2aWNlLmNyZWF0ZVJlcXVlc3QoUmVzdFNlcnZpY2VUeXBlLkRFTEVURSwgc2VydmljZVVybCk7IDtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gUmVzdFNlcnZpY2UuY3JlYXRlUmVxdWVzdChSZXN0U2VydmljZVR5cGUuREVMRVRFLCBzZXJ2aWNlVXJsKTtcclxuXHJcblxyXG4gICAgICAgICAgICBpZihyZXN1bHQgPT09IHVuZGVmaW5lZCkgIFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIj8/Pz8/P1wiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuXHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIFJlYWRzIHRoZSBuYW1lc3BhY2UgaW5kZXggZm9yIG1hcHAgQ29ja3BpdCBzZXJ2aWNlcyBcclxuICAgICpcclxuICAgICogQHN0YXRpY1xyXG4gICAgKiBAcGFyYW0ge251bWJlcn0gc2Vzc2lvbklkXHJcbiAgICAqIEByZXR1cm5zIHtQcm9taXNlPG51bWJlcj59IFRoZSBpbmRleCBvZiB0aGUgbmFtZXNwYWNlXHJcbiAgICAqIEBtZW1iZXJvZiBPcGNVYVJlc3RTZXJ2aWNlc1xyXG4gICAgKi9cclxuICAgIHN0YXRpYyBhc3luYyBnZXROYW1lc3BhY2VJbmRleChzZXNzaW9uSWQ6IG51bWJlcik6IFByb21pc2U8bnVtYmVyPiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmFyIHNlcnZpY2VVcmwgPSBPcGNVYVJlc3RTZXJ2aWNlcy5nZXRPcGNVYUJhc2VVcmwoKSArICcvc2Vzc2lvbnMvJyArIHNlc3Npb25JZCArICcvbmFtZXNwYWNlcy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KE9wY1VhUmVzdFNlcnZpY2VzLm1hcHBDb2NrcGl0T3BjVWFOYW1lc3BhY2UpO1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gYXdhaXQgUmVzdFNlcnZpY2UuY2FsbDxhbnk+KFJlc3RTZXJ2aWNlVHlwZS5HRVQsIHNlcnZpY2VVcmwpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0LmluZGV4O1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBCcm93c2VzIHRoZSBjaGlsZCBub2RlcyBvZiB0aGUgc3BlY2lmaWVkIHBhcmVudCBub2RlXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNlc3Npb25JZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhcmVudE5vZGVJZFxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cclxuICAgICAqIEBtZW1iZXJvZiBPcGNVYVJlc3RTZXJ2aWNlc1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYXN5bmMgYnJvd3NlTm9kZXMoc2Vzc2lvbklkOiBudW1iZXIsIHBhcmVudE5vZGVJZDogc3RyaW5nKTogUHJvbWlzZTxBcnJheTxSZXN0LkludGVyZmFjZU9wY1VhUmVzdFJlc3VsdE5vZGVSZWZlcmVuY2U+PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmFyIHNlcnZpY2VVcmwgPSBPcGNVYVJlc3RTZXJ2aWNlcy5nZXRPcGNVYUJhc2VVcmwoKSArICcvc2Vzc2lvbnMvJyArIHNlc3Npb25JZCArICcvbm9kZXMvJyArIGVuY29kZVVSSUNvbXBvbmVudChwYXJlbnROb2RlSWQpICsgJy9yZWZlcmVuY2VzJztcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGF3YWl0IFJlc3RTZXJ2aWNlLmNhbGw8UmVzdC5JbnRlcmZhY2VPcGNVYVJlc3RSZXN1bHRSZWZlcmVuY2VzVmFsdWU+KFJlc3RTZXJ2aWNlVHlwZS5HRVQsIHNlcnZpY2VVcmwpO1xyXG4gICAgICAgICAgICBcclxuXHQgICAgLy8gUmVtb3ZlIE5hbWVzcGFjZUluZGV4IGZyb20gYnJvd3NlTmFtZVxyXG4gICAgICAgICAgICByZXN1bHQucmVmZXJlbmNlcy5mb3JFYWNoKHJlZmVyZW5jZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3RhcnRJbmRleCA9IHJlZmVyZW5jZS5icm93c2VOYW1lLmluZGV4T2YoJ1wiJywgMCk7XHJcbiAgICAgICAgICAgICAgICBzdGFydEluZGV4Kys7XHJcbiAgICAgICAgICAgICAgICBsZXQgZW5kSW5kZXggPSByZWZlcmVuY2UuYnJvd3NlTmFtZS5pbmRleE9mKCdcIicsIHN0YXJ0SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgcmVmZXJlbmNlLmJyb3dzZU5hbWUgPSByZWZlcmVuY2UuYnJvd3NlTmFtZS5zdWJzdHIoc3RhcnRJbmRleCwgZW5kSW5kZXgtc3RhcnRJbmRleCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5yZWZlcmVuY2VzO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYnJvd3NlcyB0aGUgbWV0YSBpbmZvIGZvciBhIGNvbXBvbmVudFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzZXNzaW9uSWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBub2RlSWRcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEFycmF5PFJlc3QuSW50ZXJmYWNlT3BjVWFSZXN0UmVzdWx0Tm9kZVJlZmVyZW5jZT4+fVxyXG4gICAgICogQG1lbWJlcm9mIE9wY1VhUmVzdFNlcnZpY2VzXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBhc3luYyBicm93c2VOb2RlTWV0YUluZm8oc2Vzc2lvbklkOiBudW1iZXIsIG5vZGVJZDogc3RyaW5nKTogUHJvbWlzZTxBcnJheTxSZXN0LkludGVyZmFjZU9wY1VhUmVzdFJlc3VsdE5vZGVSZWZlcmVuY2U+fHVuZGVmaW5lZD4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCBtZXRhSW5mb1JlZmVyZW5jZXM6QXJyYXk8UmVzdC5JbnRlcmZhY2VPcGNVYVJlc3RSZXN1bHROb2RlUmVmZXJlbmNlPnx1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgICAgICAvLyByZWFkIHRoZSBjaGlsZCBub2Rlc1xyXG4gICAgICAgICAgICBsZXQgY2hpbGROb2RlcyA9IGF3YWl0IE9wY1VhUmVzdFNlcnZpY2VzLmJyb3dzZU5vZGVzKHNlc3Npb25JZCwgbm9kZUlkKTtcclxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIGNoaWxkIG5vZGVzIGNvbnRhaW4gYSBtZXRhIG5vZGVcclxuICAgICAgICAgICAgbGV0IG1ldGFOb2RlcyA9IGNoaWxkTm9kZXMuZmlsdGVyKChjaGlsZE5vZGUpPT57IHJldHVybiBjaGlsZE5vZGUuYnJvd3NlTmFtZSA9PT0gIE9wY1VhUmVzdFNlcnZpY2VzLm1hcHBDb2NrcGl0TWV0YU5vZGVJZDt9KVxyXG4gICAgICAgICAgICBpZiAobWV0YU5vZGVzLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgLy8gQWRkIHRoZSBzdWIgbm9kZSBpZCBmb3IgcGFyYW1ldGVyLlxyXG4gICAgICAgICAgICAgICAgbGV0IG1ldGFOb2RlID0gbWV0YU5vZGVzWzBdO1xyXG4gICAgICAgICAgICAgICAgLy8gQnJvd3NlIHRoZSBtZXRhIGluZm8gbm9kZXNcclxuICAgICAgICAgICAgICAgIG1ldGFJbmZvUmVmZXJlbmNlcyA9IGF3YWl0IE9wY1VhUmVzdFNlcnZpY2VzLmJyb3dzZU5vZGVzKHNlc3Npb25JZCwgbWV0YU5vZGUubm9kZUlkKTtcclxuICAgICAgICAgICAgICAgIGlmIChtZXRhSW5mb1JlZmVyZW5jZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyByZXRyaWV2ZSB2YWxpZCBtZXRhIG5vZGVzXHJcbiAgICAgICAgICAgICAgICAgICAgbWV0YUluZm9SZWZlcmVuY2VzID0gbWV0YUluZm9SZWZlcmVuY2VzLmZpbHRlcigocGFyYW1ldGVyKSA9PiB7IHJldHVybiBwYXJhbWV0ZXIubm9kZUNsYXNzID09PSBcIlZhcmlhYmxlXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVhZCB0aGUgbWV0YSBpbmZvIHZhbHVlc1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWV0YUluZm9SZWZlcmVuY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1ldGFJbmZvUmVmZXJlbmNlID0gbWV0YUluZm9SZWZlcmVuY2VzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWV0YUluZm9WYWx1ZSA9IGF3YWl0IE9wY1VhUmVzdFNlcnZpY2VzLnJlYWROb2RlQXR0cmlidXRlKHNlc3Npb25JZCwgbWV0YUluZm9SZWZlcmVuY2Uubm9kZUlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgKDxhbnk+bWV0YUluZm9SZWZlcmVuY2UpLnZhbHVlID0gbWV0YUluZm9WYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbWV0YUluZm9SZWZlcmVuY2VzO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEJyb3dzZXMgdGhlIHBhcmFtZXRlciBzZXQgb2YgYSBub2RlIGlmIGFueS5cclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2Vzc2lvbklkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbm9kZUlkXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxBcnJheTxPcGNVYU5vZGVSZWZlcmVuY2VJbnRlcmZhY2U+Pn0gVGhlIHBhcmVtZXRlciByZWZlcmVuY2VzXHJcbiAgICAgKiBAbWVtYmVyb2YgT3BjVWFSZXN0U2VydmljZXNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFzeW5jIGJyb3dzZU5vZGVQYXJhbWV0ZXJTZXQoc2Vzc2lvbklkOiBudW1iZXIsIG5vZGVJZDogc3RyaW5nKTogUHJvbWlzZTxBcnJheTxSZXN0LkludGVyZmFjZU9wY1VhUmVzdFJlc3VsdE5vZGVSZWZlcmVuY2U+PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gQWRkIHRoZSBzdWIgbm9kZSBpZCBmb3IgcGFyYW1ldGVyLlxyXG4gICAgICAgICAgICBub2RlSWQgKz0gXCIuUGFyYW1ldGVyU2V0XCI7XHJcbiAgICAgICAgICAgIC8vIEJyb3dzZSB0aGUgcGFyYW1ldGVyIHNldCBhbmQgZXh0cmFjdCB2YXJpYWJsZSB0eXBlcyBvbmx5LlxyXG5cclxuICAgICAgICAgICAgdmFyIHBhcmFtZXRlclJlZmVyZW5jZXMgPSAoYXdhaXQgT3BjVWFSZXN0U2VydmljZXMuYnJvd3NlTm9kZXMoc2Vzc2lvbklkLCBub2RlSWQpKTtcclxuICAgICAgICAgICAgdmFyIHZhbHVlUGFyYW1ldGVyUmVmZXJlbmNlcyA9IHBhcmFtZXRlclJlZmVyZW5jZXMuZmlsdGVyKChwYXJhbWV0ZXIpID0+IHsgcmV0dXJuIHBhcmFtZXRlci5ub2RlQ2xhc3MgPT09IFwiVmFyaWFibGVcIiB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlUGFyYW1ldGVyUmVmZXJlbmNlcztcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogUmVhZHMgdGhlIHNwZWNpZmllZCBub2RlIGF0dHJpYnV0ZVxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzZXNzaW9uSWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBub2RlSWRcclxuICAgICAqIEBwYXJhbSB7Kn0gYXR0cmlidXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IE9wY1VhQXR0cmlidXRlXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxyXG4gICAgICogQG1lbWJlcm9mIE9wY1VhUmVzdFNlcnZpY2VzXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBhc3luYyByZWFkTm9kZUF0dHJpYnV0ZShzZXNzaW9uSWQ6IG51bWJlciwgbm9kZUlkOiBzdHJpbmcsIGF0dHJpYnV0ZTogT3BjVWFBdHRyaWJ1dGUgPSBPcGNVYUF0dHJpYnV0ZS5WQUxVRSk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmFyIHNlcnZpY2VVcmwgPSBPcGNVYVJlc3RTZXJ2aWNlcy5nZXRPcGNVYUJhc2VVcmwoKSArICcvc2Vzc2lvbnMvJyArIHNlc3Npb25JZCArICcvbm9kZXMvJyArIGVuY29kZVVSSUNvbXBvbmVudChub2RlSWQpICsgJy9hdHRyaWJ1dGVzLycgKyBhdHRyaWJ1dGU7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSAoYXdhaXQgUmVzdFNlcnZpY2UuY2FsbDxSZXN0LkludGVyZmFjZU9wY1VhUmVzdFJlc3VsdEF0dHJpYnV0ZVZhbHVlPihSZXN0U2VydmljZVR5cGUuR0VULCBzZXJ2aWNlVXJsKSkudmFsdWU7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXcml0ZXMgdGhlIG5vZGUgYXR0cmlidXRlXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNlc3Npb25JZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5vZGVJZFxyXG4gICAgICogQHBhcmFtIHtPcGNVYUF0dHJpYnV0ZX0gW2F0dHJpYnV0ZT1PcGNVYUF0dHJpYnV0ZS5WQUxVRV1cclxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWVcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XHJcbiAgICAgKiBAbWVtYmVyb2YgT3BjVWFSZXN0U2VydmljZXNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFzeW5jIHdyaXRlTm9kZUF0dHJpYnV0ZShzZXNzaW9uSWQ6IG51bWJlciwgbm9kZUlkOiBzdHJpbmcsIGF0dHJpYnV0ZTogT3BjVWFBdHRyaWJ1dGUgPSBPcGNVYUF0dHJpYnV0ZS5WQUxVRSwgdmFsdWU6IGFueSk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlRGF0YSA9IHZhbHVlO1xyXG5cclxuICAgICAgICAgICAgaWYgKGF0dHJpYnV0ZSA9PT0gT3BjVWFBdHRyaWJ1dGUuVkFMVUUpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlRGF0YSA9IHsgXCJ2YWx1ZVwiOiB2YWx1ZSB9O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgc2VydmljZVVybCA9IE9wY1VhUmVzdFNlcnZpY2VzLmdldE9wY1VhQmFzZVVybCgpICsgJy9zZXNzaW9ucy8nICsgc2Vzc2lvbklkICsgJy9ub2Rlcy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KG5vZGVJZCkgKyAnL2F0dHJpYnV0ZXMvJyArIGF0dHJpYnV0ZTtcclxuICAgICAgICAgICAgYXdhaXQgUmVzdFNlcnZpY2UuY2FsbDxSZXN0LkludGVyZmFjZU9wY1VhUmVzdFJlc3VsdEF0dHJpYnV0ZVZhbHVlPihSZXN0U2VydmljZVR5cGUuUFVULCBzZXJ2aWNlVXJsLCB2YWx1ZURhdGEpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQnJvd3NlcyB0aGUgbWV0aG9kIHNldCBvZiBhIG5vZGUgaWYgYW55LlxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzZXNzaW9uSWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBub2RlSWRcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEFycmF5PE9wY1VhTm9kZVJlZmVyZW5jZUludGVyZmFjZT4+fVxyXG4gICAgICogQG1lbWJlcm9mIE9wY1VhUmVzdFNlcnZpY2VzXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBhc3luYyBicm93c2VOb2RlTWV0aG9kU2V0KHNlc3Npb25JZDogbnVtYmVyLCBub2RlSWQ6IHN0cmluZyk6IFByb21pc2U8QXJyYXk8UmVzdC5JbnRlcmZhY2VPcGNVYVJlc3RSZXN1bHROb2RlUmVmZXJlbmNlPj4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIEFkZCB0aGUgc3ViIG5vZGUgaWQgZm9yIG1ldGhvZHMuXHJcbiAgICAgICAgICAgIG5vZGVJZCArPSBcIi5NZXRob2RTZXRcIjtcclxuICAgICAgICAgICAgLy8gQnJvd3NlIHRoZSBtZXRob2Qgc2V0LlxyXG4gICAgICAgICAgICB2YXIgbWV0aG9kUmVmZXJlbmNlcyA9IChhd2FpdCBPcGNVYVJlc3RTZXJ2aWNlcy5icm93c2VOb2RlcyhzZXNzaW9uSWQsIG5vZGVJZCkpLmZpbHRlcigobWV0aG9kKSA9PiB7IHJldHVybiBtZXRob2Qubm9kZUNsYXNzID09PSBcIk1ldGhvZFwiIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gbWV0aG9kUmVmZXJlbmNlcztcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkcyB0aGUgaW5wdXQgcGFyYW1ldGVycyBvZiBhIG1ldGhvZFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzZXNzaW9uSWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBub2RlSWRcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XHJcbiAgICAgKiBAbWVtYmVyb2YgT3BjVWFSZXN0U2VydmljZXNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFzeW5jIHJlYWRNZXRob2RQYXJhbWV0ZXJzKHNlc3Npb25JZDogbnVtYmVyLCBub2RlSWQ6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gQWRkIHRoZSBzdWIgbm9kZSBpZCBmb3IgbWV0aG9kIHBhcmFtZXRlcnMuXHJcbiAgICAgICAgICAgIG5vZGVJZCArPSBcIiNJbnB1dEFyZ3VtZW50c1wiO1xyXG4gICAgICAgICAgICAvLyBCcm93c2UgdGhlIGlucHV0IGFyZ3VtZW50c1xyXG4gICAgICAgICAgICB2YXIgaW5wdXRBcmd1bWVudHMgPSAoYXdhaXQgT3BjVWFSZXN0U2VydmljZXMucmVhZE5vZGVBdHRyaWJ1dGUoc2Vzc2lvbklkLCBub2RlSWQsIE9wY1VhQXR0cmlidXRlLlZBTFVFKSk7XHJcbiAgICAgICAgICAgIHJldHVybiBpbnB1dEFyZ3VtZW50cztcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhbmQgY2FsbCBhIGpzb24gYmF0Y2ggcmVxdWVzdFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7SlF1ZXJ5LkFqYXhTZXR0aW5nczxhbnk+W119IHJlc3RSZXF1ZXN0c1xyXG4gICAgICogQG1lbWJlcm9mIE9wY1VhUmVzdFNlcnZpY2VzXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBhc3luYyBjYWxsQmF0Y2hSZXF1ZXN0KHJlc3RSZXF1ZXN0czogUmVzdFJlcXVlc3RJbmZvW10pIHtcclxuICAgICAgICByZXR1cm4gYXdhaXQgUmVzdFNlcnZpY2UuY2FsbEJhdGNoUmVxdWVzdDxhbnk+KHRoaXMuZ2V0T3BjVWFCYXNlVXJsKCkgLHJlc3RSZXF1ZXN0cyk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEV4ZWN1dGVzIHRoZSBzcGVjaWZpZWQgbWV0aG9kIFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEB0ZW1wbGF0ZSBUX01FVEhPRF9SRVNVTFRcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzZXNzaW9uSWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBub2RlSWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2RJZFxyXG4gICAgICogQHBhcmFtIHsqfSBtZXRob2RBcmdzXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxUX01FVEhPRF9SRVNVTFQ+fVxyXG4gICAgICogQG1lbWJlcm9mIE9wY1VhUmVzdFNlcnZpY2VzXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBhc3luYyBleGVjdXRlTWV0aG9kPFRfTUVUSE9EX1JFU1VMVD4oc2Vzc2lvbklkOiBudW1iZXIsIG5vZGVJZDogc3RyaW5nLCBtZXRob2RJZDogc3RyaW5nLCBtZXRob2RBcmdzOiBhbnkpOiBQcm9taXNlPFRfTUVUSE9EX1JFU1VMVD4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHZhciBzZXJ2aWNlVXJsID0gT3BjVWFSZXN0U2VydmljZXMuZ2V0T3BjVWFCYXNlVXJsKCkgKyAnL3Nlc3Npb25zLycgKyBzZXNzaW9uSWQgKyAnL25vZGVzLycgKyBlbmNvZGVVUklDb21wb25lbnQobm9kZUlkKSArICcvbWV0aG9kcy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KG1ldGhvZElkKTtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGF3YWl0IFJlc3RTZXJ2aWNlLmNhbGw8YW55PihSZXN0U2VydmljZVR5cGUuUE9TVCwgc2VydmljZVVybCwgbWV0aG9kQXJncyk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGaWx0ZXJzIHRoZSBub2RlcyB0byBiZSBkaXNwbGF5ZWQgaW4gbWFwcCBjb2NrcGl0XHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtBcnJheTxSZXN0LkludGVyZmFjZU9wY1VhUmVzdFJlc3VsdE5vZGVSZWZlcmVuY2U+fSBvcGNVYU5vZGVzXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWFwcENvY2twaXROYW1lc3BhY2VcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgT3BjVWFSZXN0U2VydmljZXNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGZpbHRlck1hcHBDb2NrcGl0Tm9kZXMob3BjVWFOb2RlczogQXJyYXk8UmVzdC5JbnRlcmZhY2VPcGNVYVJlc3RSZXN1bHROb2RlUmVmZXJlbmNlPiwgbWFwcENvY2twaXROYW1lc3BhY2U6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiBvcGNVYU5vZGVzLmZpbHRlcigobm9kZVJlZmVyZW5jZSkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgaXNDaGlsZE5vZGUgPSBub2RlUmVmZXJlbmNlLmlzRm9yd2FyZCA9PT0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSBub2RlIGlzIHdpdGhpbiB0aGUgbWFwcCBjb2NrcGl0IG5hbWVzcGFjZVxyXG4gICAgICAgICAgICB2YXIgaXNNYXBwQ29tcG9uZW50ID0gKDxTdHJpbmc+bm9kZVJlZmVyZW5jZS50eXBlRGVmaW5pdGlvbikuaW5kZXhPZihtYXBwQ29ja3BpdE5hbWVzcGFjZSkgPiAtMTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBpc0NoaWxkTm9kZSAmJiBpc01hcHBDb21wb25lbnQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuLyoqXHJcbiAqIERlZmluZXMgT3BjVWEgQXR0cmlidXRlIG5hbWVzLlxyXG4gKlxyXG4gKiBAZW51bSB7bnVtYmVyfVxyXG4gKi9cclxuZW51bSBPcGNVYUF0dHJpYnV0ZSB7XHJcbiAgICBWQUxVRSA9IFwiVmFsdWVcIixcclxuICAgIERBVEFfVFlQRSA9IFwiRGF0YVR5cGVcIixcclxuICAgIEJST1dTRV9OQU1FID0gXCJCcm93c2VOYW1lXCIsXHJcbiAgICBESVNQTEFZX05BTUUgPSBcIkRpc3BsYXlOYW1lXCIsXHJcbiAgICBERVNDUklQVElPTiA9IFwiRGVzY3JpcHRpb25cIixcclxuICAgIFVTRVJfQUNDRVNTX0xFVkVMID0gXCJVc2VyQWNjZXNzTGV2ZWxcIlxyXG59XHJcblxyXG4vKipcclxuICogU3BlY2lmaWVzIGFjY2VzcyBsZXZlbHMgKCBhcyBiaXQgZmxhZ3MgKSBcclxuICpcclxuICogQGVudW0ge251bWJlcn1cclxuICovXHJcbmVudW0gT3BjVWFBY2Nlc3NMZXZlbCB7XHJcbiAgICBDdXJyZW50UmVhZCA9IDB4MDEsXHJcbiAgICBDdXJyZW50V3JpdGUgPSAweDAyLFxyXG4gICAgSGlzdG9yeVJlYWQgPSAweDA0LFxyXG4gICAgSGlzdG9yeVdyaXRlID0gMHgwOCxcclxuICAgIFNlbWFudGljQ2hhbmdlID0gMHgxMCxcclxuICAgIFN0YXR1c1dyaXRlID0gMHgyMCxcclxuICAgIFRpbWVzdGFtcFdyaXRlID0gMHg0MCxcclxuICAgIFJlc2VydmVkID0gMHg4MCxcclxufVxyXG5cclxuXHJcblxyXG5cclxuZXhwb3J0IHsgT3BjVWFSZXN0U2VydmljZXMsIFJlc3QsIFJlc3RTZXJ2aWNlTW9kZSxPcGNVYUF0dHJpYnV0ZSwgT3BjVWFBY2Nlc3NMZXZlbCB9OyJdfQ==