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
            return 'opc.tcp://' + this.opcuaIp + ':' + mappCockpitConfig_1.MappCockpitConfiguration.opcUaPort;
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
         * Gets the url for reading the opcu local ip address
         *
         * @static
         * @returns {string}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.getOpcUaIpUrl = function () {
            // get resource string for reading the opcua ip address 
            return this.getOpcUaBaseUrl() + "/localip";
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
         * Reads the ip address to be used for opcua services
         *
         * @static
         * @returns {Promise<string>}
         * @memberof OpcUaRestServices
         */
        OpcUaRestServices.readOpcUaLocalIp = function () {
            return __awaiter(this, void 0, void 0, function () {
                var serviceUrl, result, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            serviceUrl = this.getOpcUaIpUrl();
                            return [4 /*yield*/, restService_1.RestService.call(restService_1.RestServiceType.GET, serviceUrl)];
                        case 1:
                            result = _a.sent();
                            this.opcuaIp = result.ip;
                            return [2 /*return*/, this.opcuaIp];
                        case 2:
                            error_1 = _a.sent();
                            throw new Error(error_1);
                        case 3: return [2 /*return*/];
                    }
                });
            });
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
                var serviceUrl, result, error_2;
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
                            error_2 = _a.sent();
                            throw new Error(error_2);
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
                var serviceData, serviceUrl, userRoles, error_3;
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
                            error_3 = _a.sent();
                            throw new Error(error_3);
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
                var headers, serviceUrl, userRoles, error_4;
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
                            error_4 = _a.sent();
                            throw new Error(error_4);
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
                var serviceUrl, serviceData, result, error_5;
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
                            error_5 = _a.sent();
                            throw new Error(error_5);
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
                var serviceUrl, error_6;
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
                            error_6 = _a.sent();
                            throw new Error(error_6);
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
                var serviceUrl, subscriptionSettings, serviceData, result, error_7;
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
                            error_7 = _a.sent();
                            throw new Error(error_7);
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
                var serviceUrl, serviceData, error_8;
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
                            error_8 = _a.sent();
                            throw new Error(error_8);
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
                var serviceUrl, monitorItemSettings, serviceData, result, error_9;
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
                            error_9 = _a.sent();
                            throw new Error(error_9);
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
                var serviceUrl, result, error_10;
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
                            error_10 = _a.sent();
                            throw new Error(error_10);
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
                var serviceUrl, result, error_11;
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
                            error_11 = _a.sent();
                            throw new Error(error_11);
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
                var metaInfoReferences, childNodes, metaNodes, metaNode, i, metaInfoReference, metaInfoValue, error_12;
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
                            error_12 = _a.sent();
                            throw error_12;
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
                var parameterReferences, valueParameterReferences, error_13;
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
                            error_13 = _a.sent();
                            throw new Error(error_13);
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
                var serviceUrl, result, error_14;
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
                            error_14 = _a.sent();
                            throw new Error(error_14);
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
                var valueData, serviceUrl, error_15;
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
                            error_15 = _a.sent();
                            throw new Error(error_15);
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
                var methodReferences, error_16;
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
                            error_16 = _a.sent();
                            throw new Error(error_16);
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
                var inputArguments, error_17;
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
                            error_17 = _a.sent();
                            throw new Error(error_17);
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
                var serviceUrl, result, error_18;
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
                            error_18 = _a.sent();
                            throw new Error(error_18);
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
        // specifies the opc ua rest services address an set it to localhost. This is necessary to make sure that the rest connection works with NAT.
        OpcUaRestServices.opcuaIp = '127.0.0.1';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3BjVWFSZXN0U2VydmljZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW11bmljYXRpb24vcmVzdC9vcGNVYVJlc3RTZXJ2aWNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFxcEI0QixvQkFBSTtJQUFFLDBCQXBwQkksNkJBQWUsQ0FvcEJKO0lBanBCakQ7Ozs7T0FJRztJQUNIO1FBQUE7UUEwbUJBLENBQUM7UUFsa0JHLDJDQUEyQztRQUNwQyxnREFBOEIsR0FBckM7WUFDSSxPQUFPLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsR0FBRyw0Q0FBd0IsQ0FBQyxTQUFTLENBQUM7UUFDbEYsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNJLDRCQUFVLEdBQWpCO1lBQ0ksMkZBQTJGO1lBQzNGLE9BQU8sU0FBUyxHQUFHLFFBQVEsQ0FBQyxRQUFRLEdBQUcsR0FBRyxHQUFHLDRDQUF3QixDQUFDLElBQUksR0FBRyxVQUFVLENBQUM7UUFFNUYsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNJLCtCQUFhLEdBQXBCO1lBQ0ksd0RBQXdEO1lBQ3hELE9BQU8sSUFBSSxDQUFDLGVBQWUsRUFBRSxHQUFHLFVBQVUsQ0FBQztRQUMvQyxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ksaUNBQWUsR0FBdEI7WUFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLEVBQUUsR0FBRyxRQUFRLENBQUM7UUFDeEMsQ0FBQztRQUdEOzs7Ozs7V0FNRztRQUNJLDhCQUFZLEdBQW5CO1lBQ0ksMkZBQTJGO1lBQzNGLElBQUksZ0JBQWdCLEdBQUcsT0FBTyxHQUFHLFFBQVEsQ0FBQyxRQUFRLEdBQUcsR0FBRyxHQUFHLDRDQUF3QixDQUFDLElBQUksR0FBRyxzQkFBc0IsQ0FBQztZQUVsSCxPQUFPLGdCQUFnQixDQUFDO1FBQzVCLENBQUM7UUFFRDs7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QzFCLDhDQUE0QixDQUFBO1FBQzVCLDZDQUEyQixDQUFBO1FBQzNCLHVEQUFxQyxDQUFBO0lBQ3pDLENBQUMsRUFQSSxjQUFjLEtBQWQsY0FBYyxRQU9sQjtJQXFCaUQsd0NBQWM7SUFuQmhFOzs7O09BSUc7SUFDSCxJQUFLLGdCQVNKO0lBVEQsV0FBSyxnQkFBZ0I7UUFDakIscUVBQWtCLENBQUE7UUFDbEIsdUVBQW1CLENBQUE7UUFDbkIscUVBQWtCLENBQUE7UUFDbEIsdUVBQW1CLENBQUE7UUFDbkIsNEVBQXFCLENBQUE7UUFDckIsc0VBQWtCLENBQUE7UUFDbEIsNEVBQXFCLENBQUE7UUFDckIsaUVBQWUsQ0FBQTtJQUNuQixDQUFDLEVBVEksZ0JBQWdCLEtBQWhCLGdCQUFnQixRQVNwQjtJQUtpRSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZXN0IGZyb20gXCIuL29wY1VhUmVzdFJlc3VsdFR5cGVzXCI7XHJcbmltcG9ydCB7IFJlc3RTZXJ2aWNlLCBSZXN0U2VydmljZVR5cGUsUmVzdFNlcnZpY2VNb2RlLCBSZXN0UmVxdWVzdEluZm8gfSBmcm9tIFwiLi9yZXN0U2VydmljZVwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbmZpZ3VyYXRpb24gfSBmcm9tIFwiLi4vLi4vY29tbW9uL21hcHBDb2NrcGl0Q29uZmlnXCI7XHJcblxyXG4vKipcclxuICogSW1wbGVtZW50cyB0aGUgcmVzdCBzZXJ2aWNlIGNhbGxzIGZvciBtYXBwIENvY2twaXRcclxuICpcclxuICogQGNsYXNzIE9wY1VhUmVzdFNlcnZpY2VzXHJcbiAqL1xyXG5jbGFzcyBPcGNVYVJlc3RTZXJ2aWNlcyB7XHJcblxyXG4gICAgLy8gU3BlY2lmaWVzIHRoZSBtYXBwIENvY2twaXQgbmFtZXNwYWNlXHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgbWFwcENvY2twaXRPcGNVYU5hbWVzcGFjZTogc3RyaW5nID0gXCJ1cm46QiZSL0RpYWdub3Npcy9tYXBwQ29ja3BpdFwiO1xyXG5cclxuICAgIC8vIFNwZWNpZmllcyB0aGUgbWFwcCBDb2NrcGl0IGNvbXBvbmVudGUgcm9vdCBub2RlIGlkXHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgbWFwcENvY2twaXRSb290Tm9kZUlkOiBzdHJpbmcgPSBcImk9MjEwMFwiO1xyXG5cclxuICAgIC8vIFNwZWNpZmllcyB0aGUgY29tcG9uZW50IGZvciByZWFkaW5nIHRyYWNlIGRhdGFcclxuICAgIHN0YXRpYyByZWFkb25seSBtYXBwQ29ja3BpdFRyYWNlRGF0YVByb3ZpZGVySWQ6IHN0cmluZyA9IFwicz1OZXdUcmFjZVJlY29yZC5NZXRob2RTZXRcIjtcclxuXHJcbiAgICAvLyBTcGVjaWZpZXMgdGhlIGRhdGFwb2ludCBuYW1lIGJhc2UgZm9yIHJlYWRpbmcgdHJhY2UgZGF0YVxyXG4gICAgc3RhdGljIHJlYWRvbmx5IG1hcHBDb2NrcGl0VHJhY2VEYXRhUG9pbnROYW1lSWQ6IHN0cmluZyA9IFwicz1OZXdUcmFjZVJlY29yZC5SZWNvcmRlZERhdGFQb2ludE5hbWVcIjtcclxuXHJcbiAgICAvLyBTcGVjaWZpZXMgdGhlIHRyZ2dlciB0aW1lIG5hbWUgZm9yIHJlYWRpbmcgdHJhY2UgZGF0YVxyXG4gICAgc3RhdGljIHJlYWRvbmx5IG1hcHBDb2NrcGl0VHJhY2VUcmlnZ2VyVGltZTogc3RyaW5nID0gXCJzPU5ld1RyYWNlUmVjb3JkLlRyaWdnZXJUaW1lXCI7XHJcblxyXG4gICAgc3RhdGljIHJlYWRvbmx5IG1hcHBDb2NrcGl0VHJhY2VEYXRhUG9pbnRDb3VudDogbnVtYmVyID0gMzI7XHJcblxyXG4gICAgLy8gU3BlY2lmaWVzIHRoZSBjb21wb25lbnQgZm9yIHJlYWRpbmcgdHJhY2UgZGF0YVxyXG4gICAgc3RhdGljIHJlYWRvbmx5IG1hcHBDb2NrcGl0VHJhY2VSZWFkRGF0YU1ldGhvZElkOiBzdHJpbmcgPSBcInM9TmV3VHJhY2VSZWNvcmQuR2V0UmVjb3JkZWREYXRhQXJyYXlcIjtcclxuXHJcbiAgICAvLyBzcGVjaWZpZXMgdGhlIHJvb3Qgbm9kZSBpZCBmb3IgZW51bSBkZWZpbml0aW9uc1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IG1hcHBDb2NrcGl0RW51bXNJZDogc3RyaW5nID0gXCJucz0wO2k9MjlcIjtcclxuXHJcbiAgICAvLyBzcGVjaWZpZXMgdGhlIG1ldGEgaW5mbyBub2RlIGlkXHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgbWFwcENvY2twaXRNZXRhTm9kZUlkOnN0cmluZyA9IFwiJEJyTWV0YUluZm9cIjtcclxuXHJcbiAgICAvLyBzcGVjaWZpZXMgdGhlIG5hbWVzcGFjZSBwcmVmaXggc3RyaW5nXHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgbWFwcENvY2twaXROYW1lc3BhY2VQcmVmaXg6IHN0cmluZyA9IFwibnM9XCI7XHJcblxyXG4gICAgLy8gc3BlY2lmaWVzIHRoZSBzYW1wbGluZyByYXRlIGZvciBtb250aXRvcmluZyBpdGVtc1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IG1vbml0b3JpbmdTYW1wbGluZ0ludGVydmFsOiBudW1iZXIgPSAxMDA7XHJcbiAgICBcclxuICAgIC8vIHNwZWNpZmllcyB0aGUgc2VydmljZSBtb2RlXHJcbiAgICBzdGF0aWMgbW9kZTogUmVzdFNlcnZpY2VNb2RlID0gUmVzdFNlcnZpY2VNb2RlLkVYRUNVVEU7XHJcblxyXG4gICAgLy8gc3BlY2lmaWVzIHRoZSBvcGMgdWEgcmVzdCBzZXJ2aWNlcyBhZGRyZXNzIGFuIHNldCBpdCB0byBsb2NhbGhvc3QuIFRoaXMgaXMgbmVjZXNzYXJ5IHRvIG1ha2Ugc3VyZSB0aGF0IHRoZSByZXN0IGNvbm5lY3Rpb24gd29ya3Mgd2l0aCBOQVQuXHJcbiAgICBzdGF0aWMgb3BjdWFJcCA9ICcxMjcuMC4wLjEnO1xyXG5cclxuICAgIC8vIFNwZWNpZmllcyB0aGUgcmVzdCBzZXJ2aWNlIGVuZCBwb2ludCB1cmxcclxuICAgIHN0YXRpYyBnZXRPcGNVYVJlc3RTZXJ2aWNlRW5kUG9pbnRVcmwoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gJ29wYy50Y3A6Ly8nICsgdGhpcy5vcGN1YUlwICsgJzonICsgTWFwcENvY2twaXRDb25maWd1cmF0aW9uLm9wY1VhUG9ydDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlYWRzIGFjY2VzcyBjb25maWd1cmF0aW9uIGRhdGEgYW5kIHNldHMgdGhlIGJhc2UgdXJsIGZvciB0aGUgcmVzdCBzZXJ2aWNlc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAbWVtYmVyb2YgT3BjVWFSZXN0U2VydmljZXNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldEJhc2VVcmwoKTogc3RyaW5nIHtcclxuICAgICAgICAvLyBnZXQgcG9ydCBmb3IgUmVzdFNlcnZpY2VCYXNlVXJsIGZyb20gbWFwcENvY2twaXQgY29uZmlnID0+IFRPRE86IGdldCBkYXRhIGZyb20ganNvbiBmaWxlXHJcbiAgICAgICAgcmV0dXJuIFwiaHR0cDovL1wiICsgbG9jYXRpb24uaG9zdG5hbWUgKyBcIjpcIiArIE1hcHBDb2NrcGl0Q29uZmlndXJhdGlvbi5wb3J0ICsgXCIvYXBpLzEuMFwiO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHVybCBmb3IgcmVhZGluZyB0aGUgb3BjdSBsb2NhbCBpcCBhZGRyZXNzXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBPcGNVYVJlc3RTZXJ2aWNlc1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0T3BjVWFJcFVybCgpOiBzdHJpbmcge1xyXG4gICAgICAgIC8vIGdldCByZXNvdXJjZSBzdHJpbmcgZm9yIHJlYWRpbmcgdGhlIG9wY3VhIGlwIGFkZHJlc3MgXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T3BjVWFCYXNlVXJsKCkgKyBcIi9sb2NhbGlwXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXRzIHRoZSBiYXNlIHVybCBmb3Igb3BjIHVhIGFjY2Vzc1xyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgT3BjVWFSZXN0U2VydmljZXNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldE9wY1VhQmFzZVVybCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEJhc2VVcmwoKSArIFwiL29wY3VhXCI7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0cyB0aGUgYmFzZSB1cmwgZm9yIHRoZSB3ZWIgc29ja2V0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBtZW1iZXJvZiBPcGNVYVJlc3RTZXJ2aWNlc1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0V3NCYXNlVXJsKCk6IHN0cmluZyB7XHJcbiAgICAgICAgLy8gZ2V0IHBvcnQgZm9yIFJlc3RTZXJ2aWNlQmFzZVVybCBmcm9tIG1hcHBDb2NrcGl0IGNvbmZpZyA9PiBUT0RPOiBnZXQgZGF0YSBmcm9tIGpzb24gZmlsZVxyXG4gICAgICAgIGxldCB3ZWJTb2NrZXRCYXNlVXJsID0gXCJ3czovL1wiICsgbG9jYXRpb24uaG9zdG5hbWUgKyBcIjpcIiArIE1hcHBDb2NrcGl0Q29uZmlndXJhdGlvbi5wb3J0ICsgXCIvYXBpLzEuMC9wdXNoY2hhbm5lbFwiO1xyXG5cclxuICAgICAgICByZXR1cm4gd2ViU29ja2V0QmFzZVVybDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWRzIHRoZSBpcCBhZGRyZXNzIHRvIGJlIHVzZWQgZm9yIG9wY3VhIHNlcnZpY2VzXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8c3RyaW5nPn1cclxuICAgICAqIEBtZW1iZXJvZiBPcGNVYVJlc3RTZXJ2aWNlc1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYXN5bmMgcmVhZE9wY1VhTG9jYWxJcCgpOlByb21pc2U8c3RyaW5nPiB7XHJcbiAgICAgICAgdHJ5IHtcclxuXHJcbiAgICAgICAgICAgIHZhciBzZXJ2aWNlVXJsID0gdGhpcy5nZXRPcGNVYUlwVXJsKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IFJlc3RTZXJ2aWNlLmNhbGw8YW55PihSZXN0U2VydmljZVR5cGUuR0VULCBzZXJ2aWNlVXJsKTtcclxuICAgICAgICAgICAgdGhpcy5vcGN1YUlwID0gcmVzdWx0LmlwO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vcGN1YUlwO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIHByb3ZpZGVzIGF1dGhlbnRpZmljdGFpb24gZm9yIHJlc3Qgc2VydmljZSBhY2Nlc3NcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxudW1iZXI+fVxyXG4gICAgICogQG1lbWJlcm9mIE9wY1VhUmVzdFNlcnZpY2VzXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBhc3luYyBhdXRoZW50aWNhdGUoKTogUHJvbWlzZTxudW1iZXI+IHtcclxuICAgICAgICB0cnkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHNlcnZpY2VVcmwgPSBPcGNVYVJlc3RTZXJ2aWNlcy5nZXRCYXNlVXJsKCkgKyAnL2F1dGgnO1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gYXdhaXQgUmVzdFNlcnZpY2UuY2FsbDxhbnk+KFJlc3RTZXJ2aWNlVHlwZS5HRVQsIHNlcnZpY2VVcmwpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hhbmdlcyBsb2dpbiB0byB0aGUgc3BlY2lmaWVkIHVzZXIgd2l0aFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzZXNzaW9uSWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGFzc3dvcmRcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPG51bWJlcj59XHJcbiAgICAgKiBAbWVtYmVyb2YgT3BjVWFSZXN0U2VydmljZXNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFzeW5jIGNoYW5nZVVzZXIoc2Vzc2lvbklkOiBudW1iZXIsIHVzZXJJbmZvOiB7fSk6IFByb21pc2U8e30+IHtcclxuICAgICAgICB0cnkge1xyXG5cclxuICAgICAgICAgICAgLy97IHVzZXJuYW1lOiB1c2VyLCBwYXNzd29yZDogcGFzc3dvcmQgfSBcclxuICAgICAgICAgICAgdmFyIHNlcnZpY2VEYXRhID0geyBcInVzZXJJZGVudGl0eVRva2VuXCI6IHVzZXJJbmZvIH07XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzZXJ2aWNlVXJsID0gT3BjVWFSZXN0U2VydmljZXMuZ2V0T3BjVWFCYXNlVXJsKCkgKyAnL3Nlc3Npb25zLycgKyBzZXNzaW9uSWQ7XHJcbiAgICAgICAgICAgIGF3YWl0IFJlc3RTZXJ2aWNlLmNhbGwoUmVzdFNlcnZpY2VUeXBlLlBBVENILCBzZXJ2aWNlVXJsLCBzZXJ2aWNlRGF0YSk7XHJcblxyXG4gICAgICAgICAgICAvLyBhZnRlciBzdWNjZXNzZnVsbCBsb2dpbiB3ZSByZWFkIHRoZSB1c2VycyByb2xlc1xyXG4gICAgICAgICAgICBsZXQgdXNlclJvbGVzID0gYXdhaXQgT3BjVWFSZXN0U2VydmljZXMuZ2V0VXNlclJvbGVzKHVzZXJJbmZvKTtcclxuICAgICAgICAgICAgLy8gcmV0dXJuIHVzZXIgcm9sZXMgYXMgbG9naW4gKGNoYW5nZSB1c2VyKSByZXN1bHRcclxuICAgICAgICAgICAgcmV0dXJuICg8YW55PnVzZXJSb2xlcykucm9sZXM7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZHMgYSB1c2VycyByb2xlc1xyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7e319IHVzZXJJbmZvXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx7fT59XHJcbiAgICAgKiBAbWVtYmVyb2YgT3BjVWFSZXN0U2VydmljZXNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFzeW5jIGdldFVzZXJSb2xlcyh1c2VySW5mbzoge30pOiBQcm9taXNlPHt9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuXHJcbiAgICAgICAgICAgIGxldCBoZWFkZXJzID0gT3BjVWFSZXN0U2VydmljZXMuY3JlYXRlVXNlclJvbGVBY2Nlc3NIZWFkZXJzKHVzZXJJbmZvKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHNlcnZpY2VVcmwgPSBPcGNVYVJlc3RTZXJ2aWNlcy5nZXRCYXNlVXJsKCkgKyAnL3JiYWMvbXlyb2xlcyc7XHJcbiAgICAgICAgICAgIGxldCB1c2VyUm9sZXMgPSBhd2FpdCBSZXN0U2VydmljZS5jYWxsPHt9PihSZXN0U2VydmljZVR5cGUuR0VULCBzZXJ2aWNlVXJsLCBudWxsLCBoZWFkZXJzKTtcclxuICAgICAgICAgICAgcmV0dXJuIHVzZXJSb2xlcztcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIGhlYWRlcnMgZm9yIGFjY2Vzc2luZyB1c2VyIHJvbGVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7e319IHVzZXJJbmZvXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIE9wY1VhUmVzdFNlcnZpY2VzXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIGNyZWF0ZVVzZXJSb2xlQWNjZXNzSGVhZGVycyh1c2VySW5mbzoge30pIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBcIkF1dGhvcml6YXRpb25cIjogXCJCYXNpYyBcIiArIGJ0b2EoT3BjVWFSZXN0U2VydmljZXMuZW5jb2RlX3V0ZjgoKDxhbnk+dXNlckluZm8pLnVzZXJuYW1lKSArIFwiOlwiICsgT3BjVWFSZXN0U2VydmljZXMuZW5jb2RlX3V0ZjgoKDxhbnk+dXNlckluZm8pLnBhc3N3b3JkKSlcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGVuY29kZV91dGY4KHMpIHtcclxuICAgICAgICByZXR1cm4gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KHMpKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbmV3IHNlc3Npb25cclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxzdHJpbmc+fSBUaGUgY3JlYXRlZCBzZXNzaW9uIGlkXHJcbiAgICAgKiBAbWVtYmVyb2YgT3BjVWFSZXN0U2VydmljZXNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFzeW5jIGNyZWF0ZVNlc3Npb24oKTogUHJvbWlzZTxudW1iZXI+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB2YXIgc2VydmljZVVybCA9IE9wY1VhUmVzdFNlcnZpY2VzLmdldE9wY1VhQmFzZVVybCgpICsgJy9zZXNzaW9ucyc7XHJcbiAgICAgICAgICAgIHZhciBzZXJ2aWNlRGF0YSA9IHsgXCJ1cmxcIjogT3BjVWFSZXN0U2VydmljZXMuZ2V0T3BjVWFSZXN0U2VydmljZUVuZFBvaW50VXJsKCkgfTtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGF3YWl0IFJlc3RTZXJ2aWNlLmNhbGw8YW55PihSZXN0U2VydmljZVR5cGUuUE9TVCwgc2VydmljZVVybCwgc2VydmljZURhdGEpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0LmlkO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWxldGVzIGEgc2Vzc2lvblxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzZXNzaW9uSWQgU3BlY2lmaWVzIHRoZSBzZXNzaW9uIHRvIGRlbGV0ZS5cclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPG51bWJlcj59XHJcbiAgICAgKiBAbWVtYmVyb2YgT3BjVWFSZXN0U2VydmljZXNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFzeW5jIGRlbGV0ZVNlc3Npb24oc2Vzc2lvbklkOiBudW1iZXIpOiBQcm9taXNlPG51bWJlcj4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlcnZpY2VVcmwgPSBPcGNVYVJlc3RTZXJ2aWNlcy5nZXRPcGNVYUJhc2VVcmwoKSArICcvc2Vzc2lvbnMvJyArIHNlc3Npb25JZDtcclxuICAgICAgICAgICAgYXdhaXQgUmVzdFNlcnZpY2UuY2FsbChSZXN0U2VydmljZVR5cGUuREVMRVRFLCBzZXJ2aWNlVXJsKTtcclxuICAgICAgICAgICAgcmV0dXJuIHNlc3Npb25JZDtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZXMgYSBzdWJzY3JpcHRpb24gYXMgYSBjb250YWluZXIgZm9yIG9wYy11YSBpdGVtcyB0byBiZSBtb25pdG9yZWQgKG9ic2VydmVkKVxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzZXNzaW9uSWRcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbaW50ZXJ2YWw9MTAwXVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbZW5hYmxlZD10cnVlXVxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8c3RyaW5nPn1cclxuICAgICAqIEBtZW1iZXJvZiBPcGNVYVJlc3RTZXJ2aWNlc1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYXN5bmMgY3JlYXRlU3Vic2NyaXB0aW9uKHNlc3Npb25JZDogbnVtYmVyLCBpbnRlcnZhbDogbnVtYmVyID0gMjAwLCBlbmFibGVkOiBib29sZWFuID0gdHJ1ZSk6IFByb21pc2U8bnVtYmVyPiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gZGVmaW5lIGJhZXMgdXJsXHJcbiAgICAgICAgICAgIHZhciBzZXJ2aWNlVXJsID0gT3BjVWFSZXN0U2VydmljZXMuZ2V0T3BjVWFCYXNlVXJsKCkgKyAnL3Nlc3Npb25zLycgKyBzZXNzaW9uSWQgKyAnL3N1YnNjcmlwdGlvbnMnO1xyXG5cclxuICAgICAgICAgICAgLy8gZGVmaW5lIHN1YnNjcml0aW9uIHNldHRpbmdzXHJcbiAgICAgICAgICAgIGxldCBzdWJzY3JpcHRpb25TZXR0aW5ncyA9IHtcclxuICAgICAgICAgICAgICAgIHB1Ymxpc2hpbmdJbnRlcnZhbDogaW50ZXJ2YWwsXHJcbiAgICAgICAgICAgICAgICBwdWJsaXNoaW5nRW5hYmxlZDogZW5hYmxlZFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAvLyBjYWxsIHRoZSBzZXJ2aWNlIHdpdGggdGhlIHNwZWNpZmllZCBwYXJhbWV0ZXJzICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBzZXJ2aWNlRGF0YSA9IHN1YnNjcmlwdGlvblNldHRpbmdzO1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gYXdhaXQgUmVzdFNlcnZpY2UuY2FsbDxhbnk+KFJlc3RTZXJ2aWNlVHlwZS5QT1NULCBzZXJ2aWNlVXJsLCBzZXJ2aWNlRGF0YSk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQuc3Vic2NyaXB0aW9uSWQ7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBkZWxldGVzIGEgc3Vic2NyaXB0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNlc3Npb25JZFxyXG4gICAgICogQHBhcmFtIHsqfSBzdWJzY3JpcHRpb25JZFxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8c3RyaW5nPn1cclxuICAgICAqIEBtZW1iZXJvZiBPcGNVYVJlc3RTZXJ2aWNlc1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYXN5bmMgZGVsZXRlU3Vic2NyaXB0aW9uKHNlc3Npb25JZDogbnVtYmVyLCBzdWJzY3JpcHRpb25JZDogbnVtYmVyKTogUHJvbWlzZTxudW1iZXI+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB2YXIgc2VydmljZVVybCA9IE9wY1VhUmVzdFNlcnZpY2VzLmdldE9wY1VhQmFzZVVybCgpICsgJy9zZXNzaW9ucy8nICsgc2Vzc2lvbklkICsgJy9zdWJzY3JpcHRpb25zLycgKyBzdWJzY3JpcHRpb25JZDtcclxuICAgICAgICAgICAgdmFyIHNlcnZpY2VEYXRhID0geyBcInVybFwiOiBPcGNVYVJlc3RTZXJ2aWNlcy5nZXRPcGNVYVJlc3RTZXJ2aWNlRW5kUG9pbnRVcmwoKSB9O1xyXG4gICAgICAgICAgICBhd2FpdCBSZXN0U2VydmljZS5jYWxsPGFueT4oUmVzdFNlcnZpY2VUeXBlLkRFTEVURSwgc2VydmljZVVybCwgc2VydmljZURhdGEpO1xyXG4gICAgICAgICAgICByZXR1cm4gc3Vic2NyaXB0aW9uSWQ7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjcmVhdGUgYSBtb25pdG9yZWQgaXRlbVxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzZXNzaW9uSWQgc3BlY2lmaWVzIHRoZSBzZXJ2aWNlIHNlc3Npb24gaWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdWJzY3JpcHRpb25JZCBzcGVjaWZpZXMgdGhlIHN1YnNjcmlwdGlvbiBpZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5vZGVJZCBzcGVjaWZpZXMgdGhlIG5vZGUgdG8gYmUgc3Vic2NyaWJlZFxyXG4gICAgICogQHBhcmFtIHtPcGNVYUF0dHJpYnV0ZX0gc3BlY2lmaWVzIHRoZSBhdHRyaWJ1dGUgdG8gYmUgc2N1YnNjcmliZWRcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHN0cmluZz59XHJcbiAgICAgKiBAbWVtYmVyb2YgT3BjVWFSZXN0U2VydmljZXNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFzeW5jIGNyZWF0ZU1vbml0b3JlZEl0ZW0oc2Vzc2lvbklkOiBudW1iZXIsIHN1YnNjcmlwdGlvbklkOiBudW1iZXIsIG5vZGVJZDogc3RyaW5nLCBpdGVtSWQ6IG51bWJlciwgc2FtcGxpbmdJbnRlcnZhbDogbnVtYmVyLCBhdHRyaWJ1dGU6IE9wY1VhQXR0cmlidXRlKTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvLyBkZWZpbmUgYmFlcyB1cmxcclxuICAgICAgICAgICAgdmFyIHNlcnZpY2VVcmwgPSBPcGNVYVJlc3RTZXJ2aWNlcy5nZXRPcGNVYUJhc2VVcmwoKSArICcvc2Vzc2lvbnMvJyArIHNlc3Npb25JZCArICcvc3Vic2NyaXB0aW9ucy8nICsgc3Vic2NyaXB0aW9uSWQgKyAnL21vbml0b3JlZEl0ZW1zJztcclxuXHJcbiAgICAgICAgICAgIC8vIGRlZmluZSBtb25pdG9yIGl0ZW0gc2V0dGluZ3NcclxuICAgICAgICAgICAgY29uc3QgbW9uaXRvckl0ZW1TZXR0aW5ncyA9IHtcclxuICAgICAgICAgICAgICAgIGl0ZW1Ub01vbml0b3I6IHtcclxuICAgICAgICAgICAgICAgICAgICBub2RlSWQ6IG5vZGVJZCxcclxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGU6IGF0dHJpYnV0ZVxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBtb25pdG9yaW5nUGFyYW1ldGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNhbXBsaW5nSW50ZXJ2YWw6IHNhbXBsaW5nSW50ZXJ2YWwsXHJcbiAgICAgICAgICAgICAgICAgICAgY2xpZW50SGFuZGxlOiBpdGVtSWRcclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLy8gY2FsbCB0aGUgc2VydmljZSB3aXRoIHRoZSBzcGVjaWZpZWQgcGFyYW1ldGVycyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgc2VydmljZURhdGEgPSBtb25pdG9ySXRlbVNldHRpbmdzO1xyXG5cclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGF3YWl0IFJlc3RTZXJ2aWNlLmNhbGw8YW55PihSZXN0U2VydmljZVR5cGUuUE9TVCwgc2VydmljZVVybCwgc2VydmljZURhdGEpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBkZWxldGVzIGEgbW9uaXRvcmVkIGl0ZW1cclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2Vzc2lvbklkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3Vic2NyaXB0aW9uSWRcclxuICAgICAqIEBwYXJhbSB7Kn0gbW9uaXRvcmVkSXRlbUlkXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxzdHJpbmc+fVxyXG4gICAgICogQG1lbWJlcm9mIE9wY1VhUmVzdFNlcnZpY2VzXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyAgZGVsZXRlTW9uaXRvcmVkSXRlbShzZXNzaW9uSWQ6IHN0cmluZywgc3Vic2NyaXB0aW9uSWQ6IG51bWJlciwgbW9uaXRvcmVkSXRlbUlkOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIGRlZmluZSBiYWVzIHVybFxyXG4gICAgICAgICAgICB2YXIgc2VydmljZVVybCA9IE9wY1VhUmVzdFNlcnZpY2VzLmdldE9wY1VhQmFzZVVybCgpICsgJy9zZXNzaW9ucy8nICsgc2Vzc2lvbklkICsgJy9zdWJzY3JpcHRpb25zLycgKyBzdWJzY3JpcHRpb25JZCArICcvbW9uaXRvcmVkSXRlbXMvJyArIG1vbml0b3JlZEl0ZW1JZDtcclxuXHJcbiAgICAgICAgICAgIC8vIGNhbGwgdGhlIHNlcnZpY2Ugd2l0aCB0aGUgc3BlY2lmaWVkIHBhcmFtZXRlcnMgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gdmFyIHJlc3VsdCA9IE9wY1VhUmVzdFNlcnZpY2VzLm1vZGUgPT0gIFJlc3RTZXJ2aWNlTW9kZS5FWEVDVVRFID8gXHJcbiAgICAgICAgICAgIC8vICAgICBhd2FpdCBSZXN0U2VydmljZS5jYWxsPGFueT4oUmVzdFNlcnZpY2VUeXBlLkRFTEVURSwgc2VydmljZVVybCkgOiBcclxuICAgICAgICAgICAgLy8gICAgIFJlc3RTZXJ2aWNlLmNyZWF0ZVJlcXVlc3QoUmVzdFNlcnZpY2VUeXBlLkRFTEVURSwgc2VydmljZVVybCk7IDtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gUmVzdFNlcnZpY2UuY3JlYXRlUmVxdWVzdChSZXN0U2VydmljZVR5cGUuREVMRVRFLCBzZXJ2aWNlVXJsKTtcclxuXHJcblxyXG4gICAgICAgICAgICBpZihyZXN1bHQgPT09IHVuZGVmaW5lZCkgIFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIj8/Pz8/P1wiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuXHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIFJlYWRzIHRoZSBuYW1lc3BhY2UgaW5kZXggZm9yIG1hcHAgQ29ja3BpdCBzZXJ2aWNlcyBcclxuICAgICpcclxuICAgICogQHN0YXRpY1xyXG4gICAgKiBAcGFyYW0ge251bWJlcn0gc2Vzc2lvbklkXHJcbiAgICAqIEByZXR1cm5zIHtQcm9taXNlPG51bWJlcj59IFRoZSBpbmRleCBvZiB0aGUgbmFtZXNwYWNlXHJcbiAgICAqIEBtZW1iZXJvZiBPcGNVYVJlc3RTZXJ2aWNlc1xyXG4gICAgKi9cclxuICAgIHN0YXRpYyBhc3luYyBnZXROYW1lc3BhY2VJbmRleChzZXNzaW9uSWQ6IG51bWJlcik6IFByb21pc2U8bnVtYmVyPiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmFyIHNlcnZpY2VVcmwgPSBPcGNVYVJlc3RTZXJ2aWNlcy5nZXRPcGNVYUJhc2VVcmwoKSArICcvc2Vzc2lvbnMvJyArIHNlc3Npb25JZCArICcvbmFtZXNwYWNlcy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KE9wY1VhUmVzdFNlcnZpY2VzLm1hcHBDb2NrcGl0T3BjVWFOYW1lc3BhY2UpO1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gYXdhaXQgUmVzdFNlcnZpY2UuY2FsbDxhbnk+KFJlc3RTZXJ2aWNlVHlwZS5HRVQsIHNlcnZpY2VVcmwpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0LmluZGV4O1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBCcm93c2VzIHRoZSBjaGlsZCBub2RlcyBvZiB0aGUgc3BlY2lmaWVkIHBhcmVudCBub2RlXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNlc3Npb25JZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhcmVudE5vZGVJZFxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cclxuICAgICAqIEBtZW1iZXJvZiBPcGNVYVJlc3RTZXJ2aWNlc1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYXN5bmMgYnJvd3NlTm9kZXMoc2Vzc2lvbklkOiBudW1iZXIsIHBhcmVudE5vZGVJZDogc3RyaW5nKTogUHJvbWlzZTxBcnJheTxSZXN0LkludGVyZmFjZU9wY1VhUmVzdFJlc3VsdE5vZGVSZWZlcmVuY2U+PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmFyIHNlcnZpY2VVcmwgPSBPcGNVYVJlc3RTZXJ2aWNlcy5nZXRPcGNVYUJhc2VVcmwoKSArICcvc2Vzc2lvbnMvJyArIHNlc3Npb25JZCArICcvbm9kZXMvJyArIGVuY29kZVVSSUNvbXBvbmVudChwYXJlbnROb2RlSWQpICsgJy9yZWZlcmVuY2VzJztcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGF3YWl0IFJlc3RTZXJ2aWNlLmNhbGw8UmVzdC5JbnRlcmZhY2VPcGNVYVJlc3RSZXN1bHRSZWZlcmVuY2VzVmFsdWU+KFJlc3RTZXJ2aWNlVHlwZS5HRVQsIHNlcnZpY2VVcmwpO1xyXG4gICAgICAgICAgICBcclxuXHQgICAgLy8gUmVtb3ZlIE5hbWVzcGFjZUluZGV4IGZyb20gYnJvd3NlTmFtZVxyXG4gICAgICAgICAgICByZXN1bHQucmVmZXJlbmNlcy5mb3JFYWNoKHJlZmVyZW5jZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3RhcnRJbmRleCA9IHJlZmVyZW5jZS5icm93c2VOYW1lLmluZGV4T2YoJ1wiJywgMCk7XHJcbiAgICAgICAgICAgICAgICBzdGFydEluZGV4Kys7XHJcbiAgICAgICAgICAgICAgICBsZXQgZW5kSW5kZXggPSByZWZlcmVuY2UuYnJvd3NlTmFtZS5pbmRleE9mKCdcIicsIHN0YXJ0SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgcmVmZXJlbmNlLmJyb3dzZU5hbWUgPSByZWZlcmVuY2UuYnJvd3NlTmFtZS5zdWJzdHIoc3RhcnRJbmRleCwgZW5kSW5kZXgtc3RhcnRJbmRleCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5yZWZlcmVuY2VzO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYnJvd3NlcyB0aGUgbWV0YSBpbmZvIGZvciBhIGNvbXBvbmVudFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzZXNzaW9uSWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBub2RlSWRcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEFycmF5PFJlc3QuSW50ZXJmYWNlT3BjVWFSZXN0UmVzdWx0Tm9kZVJlZmVyZW5jZT4+fVxyXG4gICAgICogQG1lbWJlcm9mIE9wY1VhUmVzdFNlcnZpY2VzXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBhc3luYyBicm93c2VOb2RlTWV0YUluZm8oc2Vzc2lvbklkOiBudW1iZXIsIG5vZGVJZDogc3RyaW5nKTogUHJvbWlzZTxBcnJheTxSZXN0LkludGVyZmFjZU9wY1VhUmVzdFJlc3VsdE5vZGVSZWZlcmVuY2U+fHVuZGVmaW5lZD4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCBtZXRhSW5mb1JlZmVyZW5jZXM6QXJyYXk8UmVzdC5JbnRlcmZhY2VPcGNVYVJlc3RSZXN1bHROb2RlUmVmZXJlbmNlPnx1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgICAgICAvLyByZWFkIHRoZSBjaGlsZCBub2Rlc1xyXG4gICAgICAgICAgICBsZXQgY2hpbGROb2RlcyA9IGF3YWl0IE9wY1VhUmVzdFNlcnZpY2VzLmJyb3dzZU5vZGVzKHNlc3Npb25JZCwgbm9kZUlkKTtcclxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIGNoaWxkIG5vZGVzIGNvbnRhaW4gYSBtZXRhIG5vZGVcclxuICAgICAgICAgICAgbGV0IG1ldGFOb2RlcyA9IGNoaWxkTm9kZXMuZmlsdGVyKChjaGlsZE5vZGUpPT57IHJldHVybiBjaGlsZE5vZGUuYnJvd3NlTmFtZSA9PT0gIE9wY1VhUmVzdFNlcnZpY2VzLm1hcHBDb2NrcGl0TWV0YU5vZGVJZDt9KVxyXG4gICAgICAgICAgICBpZiAobWV0YU5vZGVzLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgLy8gQWRkIHRoZSBzdWIgbm9kZSBpZCBmb3IgcGFyYW1ldGVyLlxyXG4gICAgICAgICAgICAgICAgbGV0IG1ldGFOb2RlID0gbWV0YU5vZGVzWzBdO1xyXG4gICAgICAgICAgICAgICAgLy8gQnJvd3NlIHRoZSBtZXRhIGluZm8gbm9kZXNcclxuICAgICAgICAgICAgICAgIG1ldGFJbmZvUmVmZXJlbmNlcyA9IGF3YWl0IE9wY1VhUmVzdFNlcnZpY2VzLmJyb3dzZU5vZGVzKHNlc3Npb25JZCwgbWV0YU5vZGUubm9kZUlkKTtcclxuICAgICAgICAgICAgICAgIGlmIChtZXRhSW5mb1JlZmVyZW5jZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyByZXRyaWV2ZSB2YWxpZCBtZXRhIG5vZGVzXHJcbiAgICAgICAgICAgICAgICAgICAgbWV0YUluZm9SZWZlcmVuY2VzID0gbWV0YUluZm9SZWZlcmVuY2VzLmZpbHRlcigocGFyYW1ldGVyKSA9PiB7IHJldHVybiBwYXJhbWV0ZXIubm9kZUNsYXNzID09PSBcIlZhcmlhYmxlXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVhZCB0aGUgbWV0YSBpbmZvIHZhbHVlc1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWV0YUluZm9SZWZlcmVuY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1ldGFJbmZvUmVmZXJlbmNlID0gbWV0YUluZm9SZWZlcmVuY2VzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWV0YUluZm9WYWx1ZSA9IGF3YWl0IE9wY1VhUmVzdFNlcnZpY2VzLnJlYWROb2RlQXR0cmlidXRlKHNlc3Npb25JZCwgbWV0YUluZm9SZWZlcmVuY2Uubm9kZUlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgKDxhbnk+bWV0YUluZm9SZWZlcmVuY2UpLnZhbHVlID0gbWV0YUluZm9WYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbWV0YUluZm9SZWZlcmVuY2VzO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEJyb3dzZXMgdGhlIHBhcmFtZXRlciBzZXQgb2YgYSBub2RlIGlmIGFueS5cclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2Vzc2lvbklkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbm9kZUlkXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxBcnJheTxPcGNVYU5vZGVSZWZlcmVuY2VJbnRlcmZhY2U+Pn0gVGhlIHBhcmVtZXRlciByZWZlcmVuY2VzXHJcbiAgICAgKiBAbWVtYmVyb2YgT3BjVWFSZXN0U2VydmljZXNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFzeW5jIGJyb3dzZU5vZGVQYXJhbWV0ZXJTZXQoc2Vzc2lvbklkOiBudW1iZXIsIG5vZGVJZDogc3RyaW5nKTogUHJvbWlzZTxBcnJheTxSZXN0LkludGVyZmFjZU9wY1VhUmVzdFJlc3VsdE5vZGVSZWZlcmVuY2U+PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gQWRkIHRoZSBzdWIgbm9kZSBpZCBmb3IgcGFyYW1ldGVyLlxyXG4gICAgICAgICAgICBub2RlSWQgKz0gXCIuUGFyYW1ldGVyU2V0XCI7XHJcbiAgICAgICAgICAgIC8vIEJyb3dzZSB0aGUgcGFyYW1ldGVyIHNldCBhbmQgZXh0cmFjdCB2YXJpYWJsZSB0eXBlcyBvbmx5LlxyXG5cclxuICAgICAgICAgICAgdmFyIHBhcmFtZXRlclJlZmVyZW5jZXMgPSAoYXdhaXQgT3BjVWFSZXN0U2VydmljZXMuYnJvd3NlTm9kZXMoc2Vzc2lvbklkLCBub2RlSWQpKTtcclxuICAgICAgICAgICAgdmFyIHZhbHVlUGFyYW1ldGVyUmVmZXJlbmNlcyA9IHBhcmFtZXRlclJlZmVyZW5jZXMuZmlsdGVyKChwYXJhbWV0ZXIpID0+IHsgcmV0dXJuIHBhcmFtZXRlci5ub2RlQ2xhc3MgPT09IFwiVmFyaWFibGVcIiB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlUGFyYW1ldGVyUmVmZXJlbmNlcztcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogUmVhZHMgdGhlIHNwZWNpZmllZCBub2RlIGF0dHJpYnV0ZVxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzZXNzaW9uSWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBub2RlSWRcclxuICAgICAqIEBwYXJhbSB7Kn0gYXR0cmlidXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IE9wY1VhQXR0cmlidXRlXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxyXG4gICAgICogQG1lbWJlcm9mIE9wY1VhUmVzdFNlcnZpY2VzXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBhc3luYyByZWFkTm9kZUF0dHJpYnV0ZShzZXNzaW9uSWQ6IG51bWJlciwgbm9kZUlkOiBzdHJpbmcsIGF0dHJpYnV0ZTogT3BjVWFBdHRyaWJ1dGUgPSBPcGNVYUF0dHJpYnV0ZS5WQUxVRSk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmFyIHNlcnZpY2VVcmwgPSBPcGNVYVJlc3RTZXJ2aWNlcy5nZXRPcGNVYUJhc2VVcmwoKSArICcvc2Vzc2lvbnMvJyArIHNlc3Npb25JZCArICcvbm9kZXMvJyArIGVuY29kZVVSSUNvbXBvbmVudChub2RlSWQpICsgJy9hdHRyaWJ1dGVzLycgKyBhdHRyaWJ1dGU7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSAoYXdhaXQgUmVzdFNlcnZpY2UuY2FsbDxSZXN0LkludGVyZmFjZU9wY1VhUmVzdFJlc3VsdEF0dHJpYnV0ZVZhbHVlPihSZXN0U2VydmljZVR5cGUuR0VULCBzZXJ2aWNlVXJsKSkudmFsdWU7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXcml0ZXMgdGhlIG5vZGUgYXR0cmlidXRlXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNlc3Npb25JZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5vZGVJZFxyXG4gICAgICogQHBhcmFtIHtPcGNVYUF0dHJpYnV0ZX0gW2F0dHJpYnV0ZT1PcGNVYUF0dHJpYnV0ZS5WQUxVRV1cclxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWVcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XHJcbiAgICAgKiBAbWVtYmVyb2YgT3BjVWFSZXN0U2VydmljZXNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFzeW5jIHdyaXRlTm9kZUF0dHJpYnV0ZShzZXNzaW9uSWQ6IG51bWJlciwgbm9kZUlkOiBzdHJpbmcsIGF0dHJpYnV0ZTogT3BjVWFBdHRyaWJ1dGUgPSBPcGNVYUF0dHJpYnV0ZS5WQUxVRSwgdmFsdWU6IGFueSk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlRGF0YSA9IHZhbHVlO1xyXG5cclxuICAgICAgICAgICAgaWYgKGF0dHJpYnV0ZSA9PT0gT3BjVWFBdHRyaWJ1dGUuVkFMVUUpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlRGF0YSA9IHsgXCJ2YWx1ZVwiOiB2YWx1ZSB9O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgc2VydmljZVVybCA9IE9wY1VhUmVzdFNlcnZpY2VzLmdldE9wY1VhQmFzZVVybCgpICsgJy9zZXNzaW9ucy8nICsgc2Vzc2lvbklkICsgJy9ub2Rlcy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KG5vZGVJZCkgKyAnL2F0dHJpYnV0ZXMvJyArIGF0dHJpYnV0ZTtcclxuICAgICAgICAgICAgYXdhaXQgUmVzdFNlcnZpY2UuY2FsbDxSZXN0LkludGVyZmFjZU9wY1VhUmVzdFJlc3VsdEF0dHJpYnV0ZVZhbHVlPihSZXN0U2VydmljZVR5cGUuUFVULCBzZXJ2aWNlVXJsLCB2YWx1ZURhdGEpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQnJvd3NlcyB0aGUgbWV0aG9kIHNldCBvZiBhIG5vZGUgaWYgYW55LlxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzZXNzaW9uSWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBub2RlSWRcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEFycmF5PE9wY1VhTm9kZVJlZmVyZW5jZUludGVyZmFjZT4+fVxyXG4gICAgICogQG1lbWJlcm9mIE9wY1VhUmVzdFNlcnZpY2VzXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBhc3luYyBicm93c2VOb2RlTWV0aG9kU2V0KHNlc3Npb25JZDogbnVtYmVyLCBub2RlSWQ6IHN0cmluZyk6IFByb21pc2U8QXJyYXk8UmVzdC5JbnRlcmZhY2VPcGNVYVJlc3RSZXN1bHROb2RlUmVmZXJlbmNlPj4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIEFkZCB0aGUgc3ViIG5vZGUgaWQgZm9yIG1ldGhvZHMuXHJcbiAgICAgICAgICAgIG5vZGVJZCArPSBcIi5NZXRob2RTZXRcIjtcclxuICAgICAgICAgICAgLy8gQnJvd3NlIHRoZSBtZXRob2Qgc2V0LlxyXG4gICAgICAgICAgICB2YXIgbWV0aG9kUmVmZXJlbmNlcyA9IChhd2FpdCBPcGNVYVJlc3RTZXJ2aWNlcy5icm93c2VOb2RlcyhzZXNzaW9uSWQsIG5vZGVJZCkpLmZpbHRlcigobWV0aG9kKSA9PiB7IHJldHVybiBtZXRob2Qubm9kZUNsYXNzID09PSBcIk1ldGhvZFwiIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gbWV0aG9kUmVmZXJlbmNlcztcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkcyB0aGUgaW5wdXQgcGFyYW1ldGVycyBvZiBhIG1ldGhvZFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzZXNzaW9uSWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBub2RlSWRcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XHJcbiAgICAgKiBAbWVtYmVyb2YgT3BjVWFSZXN0U2VydmljZXNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFzeW5jIHJlYWRNZXRob2RQYXJhbWV0ZXJzKHNlc3Npb25JZDogbnVtYmVyLCBub2RlSWQ6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gQWRkIHRoZSBzdWIgbm9kZSBpZCBmb3IgbWV0aG9kIHBhcmFtZXRlcnMuXHJcbiAgICAgICAgICAgIG5vZGVJZCArPSBcIiNJbnB1dEFyZ3VtZW50c1wiO1xyXG4gICAgICAgICAgICAvLyBCcm93c2UgdGhlIGlucHV0IGFyZ3VtZW50c1xyXG4gICAgICAgICAgICB2YXIgaW5wdXRBcmd1bWVudHMgPSAoYXdhaXQgT3BjVWFSZXN0U2VydmljZXMucmVhZE5vZGVBdHRyaWJ1dGUoc2Vzc2lvbklkLCBub2RlSWQsIE9wY1VhQXR0cmlidXRlLlZBTFVFKSk7XHJcbiAgICAgICAgICAgIHJldHVybiBpbnB1dEFyZ3VtZW50cztcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhbmQgY2FsbCBhIGpzb24gYmF0Y2ggcmVxdWVzdFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7SlF1ZXJ5LkFqYXhTZXR0aW5nczxhbnk+W119IHJlc3RSZXF1ZXN0c1xyXG4gICAgICogQG1lbWJlcm9mIE9wY1VhUmVzdFNlcnZpY2VzXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBhc3luYyBjYWxsQmF0Y2hSZXF1ZXN0KHJlc3RSZXF1ZXN0czogUmVzdFJlcXVlc3RJbmZvW10pIHtcclxuICAgICAgICByZXR1cm4gYXdhaXQgUmVzdFNlcnZpY2UuY2FsbEJhdGNoUmVxdWVzdDxhbnk+KHRoaXMuZ2V0T3BjVWFCYXNlVXJsKCkgLHJlc3RSZXF1ZXN0cyk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEV4ZWN1dGVzIHRoZSBzcGVjaWZpZWQgbWV0aG9kIFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEB0ZW1wbGF0ZSBUX01FVEhPRF9SRVNVTFRcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzZXNzaW9uSWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBub2RlSWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2RJZFxyXG4gICAgICogQHBhcmFtIHsqfSBtZXRob2RBcmdzXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxUX01FVEhPRF9SRVNVTFQ+fVxyXG4gICAgICogQG1lbWJlcm9mIE9wY1VhUmVzdFNlcnZpY2VzXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBhc3luYyBleGVjdXRlTWV0aG9kPFRfTUVUSE9EX1JFU1VMVD4oc2Vzc2lvbklkOiBudW1iZXIsIG5vZGVJZDogc3RyaW5nLCBtZXRob2RJZDogc3RyaW5nLCBtZXRob2RBcmdzOiBhbnkpOiBQcm9taXNlPFRfTUVUSE9EX1JFU1VMVD4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHZhciBzZXJ2aWNlVXJsID0gT3BjVWFSZXN0U2VydmljZXMuZ2V0T3BjVWFCYXNlVXJsKCkgKyAnL3Nlc3Npb25zLycgKyBzZXNzaW9uSWQgKyAnL25vZGVzLycgKyBlbmNvZGVVUklDb21wb25lbnQobm9kZUlkKSArICcvbWV0aG9kcy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KG1ldGhvZElkKTtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGF3YWl0IFJlc3RTZXJ2aWNlLmNhbGw8YW55PihSZXN0U2VydmljZVR5cGUuUE9TVCwgc2VydmljZVVybCwgbWV0aG9kQXJncyk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGaWx0ZXJzIHRoZSBub2RlcyB0byBiZSBkaXNwbGF5ZWQgaW4gbWFwcCBjb2NrcGl0XHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtBcnJheTxSZXN0LkludGVyZmFjZU9wY1VhUmVzdFJlc3VsdE5vZGVSZWZlcmVuY2U+fSBvcGNVYU5vZGVzXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWFwcENvY2twaXROYW1lc3BhY2VcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgT3BjVWFSZXN0U2VydmljZXNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGZpbHRlck1hcHBDb2NrcGl0Tm9kZXMob3BjVWFOb2RlczogQXJyYXk8UmVzdC5JbnRlcmZhY2VPcGNVYVJlc3RSZXN1bHROb2RlUmVmZXJlbmNlPiwgbWFwcENvY2twaXROYW1lc3BhY2U6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiBvcGNVYU5vZGVzLmZpbHRlcigobm9kZVJlZmVyZW5jZSkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgaXNDaGlsZE5vZGUgPSBub2RlUmVmZXJlbmNlLmlzRm9yd2FyZCA9PT0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSBub2RlIGlzIHdpdGhpbiB0aGUgbWFwcCBjb2NrcGl0IG5hbWVzcGFjZVxyXG4gICAgICAgICAgICB2YXIgaXNNYXBwQ29tcG9uZW50ID0gKDxTdHJpbmc+bm9kZVJlZmVyZW5jZS50eXBlRGVmaW5pdGlvbikuaW5kZXhPZihtYXBwQ29ja3BpdE5hbWVzcGFjZSkgPiAtMTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBpc0NoaWxkTm9kZSAmJiBpc01hcHBDb21wb25lbnQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuLyoqXHJcbiAqIERlZmluZXMgT3BjVWEgQXR0cmlidXRlIG5hbWVzLlxyXG4gKlxyXG4gKiBAZW51bSB7bnVtYmVyfVxyXG4gKi9cclxuZW51bSBPcGNVYUF0dHJpYnV0ZSB7XHJcbiAgICBWQUxVRSA9IFwiVmFsdWVcIixcclxuICAgIERBVEFfVFlQRSA9IFwiRGF0YVR5cGVcIixcclxuICAgIEJST1dTRV9OQU1FID0gXCJCcm93c2VOYW1lXCIsXHJcbiAgICBESVNQTEFZX05BTUUgPSBcIkRpc3BsYXlOYW1lXCIsXHJcbiAgICBERVNDUklQVElPTiA9IFwiRGVzY3JpcHRpb25cIixcclxuICAgIFVTRVJfQUNDRVNTX0xFVkVMID0gXCJVc2VyQWNjZXNzTGV2ZWxcIlxyXG59XHJcblxyXG4vKipcclxuICogU3BlY2lmaWVzIGFjY2VzcyBsZXZlbHMgKCBhcyBiaXQgZmxhZ3MgKSBcclxuICpcclxuICogQGVudW0ge251bWJlcn1cclxuICovXHJcbmVudW0gT3BjVWFBY2Nlc3NMZXZlbCB7XHJcbiAgICBDdXJyZW50UmVhZCA9IDB4MDEsXHJcbiAgICBDdXJyZW50V3JpdGUgPSAweDAyLFxyXG4gICAgSGlzdG9yeVJlYWQgPSAweDA0LFxyXG4gICAgSGlzdG9yeVdyaXRlID0gMHgwOCxcclxuICAgIFNlbWFudGljQ2hhbmdlID0gMHgxMCxcclxuICAgIFN0YXR1c1dyaXRlID0gMHgyMCxcclxuICAgIFRpbWVzdGFtcFdyaXRlID0gMHg0MCxcclxuICAgIFJlc2VydmVkID0gMHg4MCxcclxufVxyXG5cclxuXHJcblxyXG5cclxuZXhwb3J0IHsgT3BjVWFSZXN0U2VydmljZXMsIFJlc3QsIFJlc3RTZXJ2aWNlTW9kZSxPcGNVYUF0dHJpYnV0ZSwgT3BjVWFBY2Nlc3NMZXZlbCB9OyJdfQ==