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
            // get port for RestServiceBaseUrl from mappCockpit config
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
            // get port for RestServiceBaseUrl from mappCockpit config
            return "ws://" + location.hostname + ":" + mappCockpitConfig_1.MappCockpitConfiguration.port + "/api/1.0/pushchannel";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3BjVWFSZXN0U2VydmljZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW11bmljYXRpb24vcmVzdC9vcGNVYVJlc3RTZXJ2aWNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFrcEI0QixvQkFBSTtJQUFFLDBCQWpwQkksNkJBQWUsQ0FpcEJKO0lBOW9CakQ7Ozs7T0FJRztJQUNIO1FBQUE7UUF1bUJBLENBQUM7UUEvakJHLDJDQUEyQztRQUNwQyxnREFBOEIsR0FBckM7WUFDSSxPQUFPLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsR0FBRyw0Q0FBd0IsQ0FBQyxTQUFTLENBQUM7UUFDbEYsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNJLDRCQUFVLEdBQWpCO1lBQ0ssMERBQTBEO1lBQzNELE9BQU8sU0FBUyxHQUFHLFFBQVEsQ0FBQyxRQUFRLEdBQUcsR0FBRyxHQUFHLDRDQUF3QixDQUFDLElBQUksR0FBRyxVQUFVLENBQUM7UUFDNUYsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNJLCtCQUFhLEdBQXBCO1lBQ0ksd0RBQXdEO1lBQ3hELE9BQU8sSUFBSSxDQUFDLGVBQWUsRUFBRSxHQUFHLFVBQVUsQ0FBQztRQUMvQyxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ksaUNBQWUsR0FBdEI7WUFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLEVBQUUsR0FBRyxRQUFRLENBQUM7UUFDeEMsQ0FBQztRQUdEOzs7Ozs7V0FNRztRQUNJLDhCQUFZLEdBQW5CO1lBQ0ksMERBQTBEO1lBQzFELE9BQU8sT0FBTyxHQUFHLFFBQVEsQ0FBQyxRQUFRLEdBQUcsR0FBRyxHQUFHLDRDQUF3QixDQUFDLElBQUksR0FBRyxzQkFBc0IsQ0FBQztRQUN0RyxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ1Usa0NBQWdCLEdBQTdCOzs7Ozs7OzRC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QUMzQix1REFBcUMsQ0FBQTtJQUN6QyxDQUFDLEVBUEksY0FBYyxLQUFkLGNBQWMsUUFPbEI7SUFxQmlELHdDQUFjO0lBbkJoRTs7OztPQUlHO0lBQ0gsSUFBSyxnQkFTSjtJQVRELFdBQUssZ0JBQWdCO1FBQ2pCLHFFQUFrQixDQUFBO1FBQ2xCLHVFQUFtQixDQUFBO1FBQ25CLHFFQUFrQixDQUFBO1FBQ2xCLHVFQUFtQixDQUFBO1FBQ25CLDRFQUFxQixDQUFBO1FBQ3JCLHNFQUFrQixDQUFBO1FBQ2xCLDRFQUFxQixDQUFBO1FBQ3JCLGlFQUFlLENBQUE7SUFDbkIsQ0FBQyxFQVRJLGdCQUFnQixLQUFoQixnQkFBZ0IsUUFTcEI7SUFLaUUsNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVzdCBmcm9tIFwiLi9vcGNVYVJlc3RSZXN1bHRUeXBlc1wiO1xyXG5pbXBvcnQgeyBSZXN0U2VydmljZSwgUmVzdFNlcnZpY2VUeXBlLFJlc3RTZXJ2aWNlTW9kZSwgUmVzdFJlcXVlc3RJbmZvIH0gZnJvbSBcIi4vcmVzdFNlcnZpY2VcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb25maWd1cmF0aW9uIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9tYXBwQ29ja3BpdENvbmZpZ1wiO1xyXG5cclxuLyoqXHJcbiAqIEltcGxlbWVudHMgdGhlIHJlc3Qgc2VydmljZSBjYWxscyBmb3IgbWFwcCBDb2NrcGl0XHJcbiAqXHJcbiAqIEBjbGFzcyBPcGNVYVJlc3RTZXJ2aWNlc1xyXG4gKi9cclxuY2xhc3MgT3BjVWFSZXN0U2VydmljZXMge1xyXG5cclxuICAgIC8vIFNwZWNpZmllcyB0aGUgbWFwcCBDb2NrcGl0IG5hbWVzcGFjZVxyXG4gICAgc3RhdGljIHJlYWRvbmx5IG1hcHBDb2NrcGl0T3BjVWFOYW1lc3BhY2U6IHN0cmluZyA9IFwidXJuOkImUi9EaWFnbm9zaXMvbWFwcENvY2twaXRcIjtcclxuXHJcbiAgICAvLyBTcGVjaWZpZXMgdGhlIG1hcHAgQ29ja3BpdCBjb21wb25lbnRlIHJvb3Qgbm9kZSBpZFxyXG4gICAgc3RhdGljIHJlYWRvbmx5IG1hcHBDb2NrcGl0Um9vdE5vZGVJZDogc3RyaW5nID0gXCJpPTIxMDBcIjtcclxuXHJcbiAgICAvLyBTcGVjaWZpZXMgdGhlIGNvbXBvbmVudCBmb3IgcmVhZGluZyB0cmFjZSBkYXRhXHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgbWFwcENvY2twaXRUcmFjZURhdGFQcm92aWRlcklkOiBzdHJpbmcgPSBcInM9TmV3VHJhY2VSZWNvcmQuTWV0aG9kU2V0XCI7XHJcblxyXG4gICAgLy8gU3BlY2lmaWVzIHRoZSBkYXRhcG9pbnQgbmFtZSBiYXNlIGZvciByZWFkaW5nIHRyYWNlIGRhdGFcclxuICAgIHN0YXRpYyByZWFkb25seSBtYXBwQ29ja3BpdFRyYWNlRGF0YVBvaW50TmFtZUlkOiBzdHJpbmcgPSBcInM9TmV3VHJhY2VSZWNvcmQuUmVjb3JkZWREYXRhUG9pbnROYW1lXCI7XHJcblxyXG4gICAgLy8gU3BlY2lmaWVzIHRoZSB0cmdnZXIgdGltZSBuYW1lIGZvciByZWFkaW5nIHRyYWNlIGRhdGFcclxuICAgIHN0YXRpYyByZWFkb25seSBtYXBwQ29ja3BpdFRyYWNlVHJpZ2dlclRpbWU6IHN0cmluZyA9IFwicz1OZXdUcmFjZVJlY29yZC5UcmlnZ2VyVGltZVwiO1xyXG5cclxuICAgIHN0YXRpYyByZWFkb25seSBtYXBwQ29ja3BpdFRyYWNlRGF0YVBvaW50Q291bnQ6IG51bWJlciA9IDMyO1xyXG5cclxuICAgIC8vIFNwZWNpZmllcyB0aGUgY29tcG9uZW50IGZvciByZWFkaW5nIHRyYWNlIGRhdGFcclxuICAgIHN0YXRpYyByZWFkb25seSBtYXBwQ29ja3BpdFRyYWNlUmVhZERhdGFNZXRob2RJZDogc3RyaW5nID0gXCJzPU5ld1RyYWNlUmVjb3JkLkdldFJlY29yZGVkRGF0YUFycmF5XCI7XHJcblxyXG4gICAgLy8gc3BlY2lmaWVzIHRoZSByb290IG5vZGUgaWQgZm9yIGVudW0gZGVmaW5pdGlvbnNcclxuICAgIHN0YXRpYyByZWFkb25seSBtYXBwQ29ja3BpdEVudW1zSWQ6IHN0cmluZyA9IFwibnM9MDtpPTI5XCI7XHJcblxyXG4gICAgLy8gc3BlY2lmaWVzIHRoZSBtZXRhIGluZm8gbm9kZSBpZFxyXG4gICAgc3RhdGljIHJlYWRvbmx5IG1hcHBDb2NrcGl0TWV0YU5vZGVJZDpzdHJpbmcgPSBcIiRCck1ldGFJbmZvXCI7XHJcblxyXG4gICAgLy8gc3BlY2lmaWVzIHRoZSBuYW1lc3BhY2UgcHJlZml4IHN0cmluZ1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IG1hcHBDb2NrcGl0TmFtZXNwYWNlUHJlZml4OiBzdHJpbmcgPSBcIm5zPVwiO1xyXG5cclxuICAgIC8vIHNwZWNpZmllcyB0aGUgc2FtcGxpbmcgcmF0ZSBmb3IgbW9udGl0b3JpbmcgaXRlbXNcclxuICAgIHN0YXRpYyByZWFkb25seSBtb25pdG9yaW5nU2FtcGxpbmdJbnRlcnZhbDogbnVtYmVyID0gMTAwO1xyXG4gICAgXHJcbiAgICAvLyBzcGVjaWZpZXMgdGhlIHNlcnZpY2UgbW9kZVxyXG4gICAgc3RhdGljIG1vZGU6IFJlc3RTZXJ2aWNlTW9kZSA9IFJlc3RTZXJ2aWNlTW9kZS5FWEVDVVRFO1xyXG5cclxuICAgIC8vIHNwZWNpZmllcyB0aGUgb3BjIHVhIHJlc3Qgc2VydmljZXMgYWRkcmVzcyBhbiBzZXQgaXQgdG8gbG9jYWxob3N0LiBUaGlzIGlzIG5lY2Vzc2FyeSB0byBtYWtlIHN1cmUgdGhhdCB0aGUgcmVzdCBjb25uZWN0aW9uIHdvcmtzIHdpdGggTkFULlxyXG4gICAgc3RhdGljIG9wY3VhSXAgPSAnMTI3LjAuMC4xJztcclxuXHJcbiAgICAvLyBTcGVjaWZpZXMgdGhlIHJlc3Qgc2VydmljZSBlbmQgcG9pbnQgdXJsXHJcbiAgICBzdGF0aWMgZ2V0T3BjVWFSZXN0U2VydmljZUVuZFBvaW50VXJsKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuICdvcGMudGNwOi8vJyArIHRoaXMub3BjdWFJcCArICc6JyArIE1hcHBDb2NrcGl0Q29uZmlndXJhdGlvbi5vcGNVYVBvcnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZWFkcyBhY2Nlc3MgY29uZmlndXJhdGlvbiBkYXRhIGFuZCBzZXRzIHRoZSBiYXNlIHVybCBmb3IgdGhlIHJlc3Qgc2VydmljZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQG1lbWJlcm9mIE9wY1VhUmVzdFNlcnZpY2VzXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBnZXRCYXNlVXJsKCk6IHN0cmluZyB7XHJcbiAgICAgICAgIC8vIGdldCBwb3J0IGZvciBSZXN0U2VydmljZUJhc2VVcmwgZnJvbSBtYXBwQ29ja3BpdCBjb25maWdcclxuICAgICAgICByZXR1cm4gXCJodHRwOi8vXCIgKyBsb2NhdGlvbi5ob3N0bmFtZSArIFwiOlwiICsgTWFwcENvY2twaXRDb25maWd1cmF0aW9uLnBvcnQgKyBcIi9hcGkvMS4wXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSB1cmwgZm9yIHJlYWRpbmcgdGhlIG9wY3UgbG9jYWwgaXAgYWRkcmVzc1xyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgT3BjVWFSZXN0U2VydmljZXNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldE9wY1VhSXBVcmwoKTogc3RyaW5nIHtcclxuICAgICAgICAvLyBnZXQgcmVzb3VyY2Ugc3RyaW5nIGZvciByZWFkaW5nIHRoZSBvcGN1YSBpcCBhZGRyZXNzIFxyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE9wY1VhQmFzZVVybCgpICsgXCIvbG9jYWxpcFwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0cyB0aGUgYmFzZSB1cmwgZm9yIG9wYyB1YSBhY2Nlc3NcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIE9wY1VhUmVzdFNlcnZpY2VzXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBnZXRPcGNVYUJhc2VVcmwoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRCYXNlVXJsKCkgKyBcIi9vcGN1YVwiO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldHMgdGhlIGJhc2UgdXJsIGZvciB0aGUgd2ViIHNvY2tldFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAbWVtYmVyb2YgT3BjVWFSZXN0U2VydmljZXNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldFdzQmFzZVVybCgpOiBzdHJpbmcge1xyXG4gICAgICAgIC8vIGdldCBwb3J0IGZvciBSZXN0U2VydmljZUJhc2VVcmwgZnJvbSBtYXBwQ29ja3BpdCBjb25maWdcclxuICAgICAgICByZXR1cm4gXCJ3czovL1wiICsgbG9jYXRpb24uaG9zdG5hbWUgKyBcIjpcIiArIE1hcHBDb2NrcGl0Q29uZmlndXJhdGlvbi5wb3J0ICsgXCIvYXBpLzEuMC9wdXNoY2hhbm5lbFwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZHMgdGhlIGlwIGFkZHJlc3MgdG8gYmUgdXNlZCBmb3Igb3BjdWEgc2VydmljZXNcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxzdHJpbmc+fVxyXG4gICAgICogQG1lbWJlcm9mIE9wY1VhUmVzdFNlcnZpY2VzXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBhc3luYyByZWFkT3BjVWFMb2NhbElwKCk6UHJvbWlzZTxzdHJpbmc+IHtcclxuICAgICAgICB0cnkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHNlcnZpY2VVcmwgPSB0aGlzLmdldE9wY1VhSXBVcmwoKTtcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgUmVzdFNlcnZpY2UuY2FsbDxhbnk+KFJlc3RTZXJ2aWNlVHlwZS5HRVQsIHNlcnZpY2VVcmwpO1xyXG4gICAgICAgICAgICB0aGlzLm9wY3VhSXAgPSByZXN1bHQuaXA7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9wY3VhSXA7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcHJvdmlkZXMgYXV0aGVudGlmaWN0YWlvbiBmb3IgcmVzdCBzZXJ2aWNlIGFjY2Vzc1xyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPG51bWJlcj59XHJcbiAgICAgKiBAbWVtYmVyb2YgT3BjVWFSZXN0U2VydmljZXNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFzeW5jIGF1dGhlbnRpY2F0ZSgpOiBQcm9taXNlPG51bWJlcj4ge1xyXG4gICAgICAgIHRyeSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgc2VydmljZVVybCA9IE9wY1VhUmVzdFNlcnZpY2VzLmdldEJhc2VVcmwoKSArICcvYXV0aCc7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBhd2FpdCBSZXN0U2VydmljZS5jYWxsPGFueT4oUmVzdFNlcnZpY2VUeXBlLkdFVCwgc2VydmljZVVybCk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGFuZ2VzIGxvZ2luIHRvIHRoZSBzcGVjaWZpZWQgdXNlciB3aXRoXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNlc3Npb25JZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXNzd29yZFxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8bnVtYmVyPn1cclxuICAgICAqIEBtZW1iZXJvZiBPcGNVYVJlc3RTZXJ2aWNlc1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYXN5bmMgY2hhbmdlVXNlcihzZXNzaW9uSWQ6IG51bWJlciwgdXNlckluZm86IHt9KTogUHJvbWlzZTx7fT4ge1xyXG4gICAgICAgIHRyeSB7XHJcblxyXG4gICAgICAgICAgICAvL3sgdXNlcm5hbWU6IHVzZXIsIHBhc3N3b3JkOiBwYXNzd29yZCB9IFxyXG4gICAgICAgICAgICB2YXIgc2VydmljZURhdGEgPSB7IFwidXNlcklkZW50aXR5VG9rZW5cIjogdXNlckluZm8gfTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHNlcnZpY2VVcmwgPSBPcGNVYVJlc3RTZXJ2aWNlcy5nZXRPcGNVYUJhc2VVcmwoKSArICcvc2Vzc2lvbnMvJyArIHNlc3Npb25JZDtcclxuICAgICAgICAgICAgYXdhaXQgUmVzdFNlcnZpY2UuY2FsbChSZXN0U2VydmljZVR5cGUuUEFUQ0gsIHNlcnZpY2VVcmwsIHNlcnZpY2VEYXRhKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGFmdGVyIHN1Y2Nlc3NmdWxsIGxvZ2luIHdlIHJlYWQgdGhlIHVzZXJzIHJvbGVzXHJcbiAgICAgICAgICAgIGxldCB1c2VyUm9sZXMgPSBhd2FpdCBPcGNVYVJlc3RTZXJ2aWNlcy5nZXRVc2VyUm9sZXModXNlckluZm8pO1xyXG4gICAgICAgICAgICAvLyByZXR1cm4gdXNlciByb2xlcyBhcyBsb2dpbiAoY2hhbmdlIHVzZXIpIHJlc3VsdFxyXG4gICAgICAgICAgICByZXR1cm4gKDxhbnk+dXNlclJvbGVzKS5yb2xlcztcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkcyBhIHVzZXJzIHJvbGVzXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHt7fX0gdXNlckluZm9cclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHt9Pn1cclxuICAgICAqIEBtZW1iZXJvZiBPcGNVYVJlc3RTZXJ2aWNlc1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYXN5bmMgZ2V0VXNlclJvbGVzKHVzZXJJbmZvOiB7fSk6IFByb21pc2U8e30+IHtcclxuICAgICAgICB0cnkge1xyXG5cclxuICAgICAgICAgICAgbGV0IGhlYWRlcnMgPSBPcGNVYVJlc3RTZXJ2aWNlcy5jcmVhdGVVc2VyUm9sZUFjY2Vzc0hlYWRlcnModXNlckluZm8pO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgc2VydmljZVVybCA9IE9wY1VhUmVzdFNlcnZpY2VzLmdldEJhc2VVcmwoKSArICcvcmJhYy9teXJvbGVzJztcclxuICAgICAgICAgICAgbGV0IHVzZXJSb2xlcyA9IGF3YWl0IFJlc3RTZXJ2aWNlLmNhbGw8e30+KFJlc3RTZXJ2aWNlVHlwZS5HRVQsIHNlcnZpY2VVcmwsIG51bGwsIGhlYWRlcnMpO1xyXG4gICAgICAgICAgICByZXR1cm4gdXNlclJvbGVzO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgaGVhZGVycyBmb3IgYWNjZXNzaW5nIHVzZXIgcm9sZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHt7fX0gdXNlckluZm9cclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgT3BjVWFSZXN0U2VydmljZXNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgY3JlYXRlVXNlclJvbGVBY2Nlc3NIZWFkZXJzKHVzZXJJbmZvOiB7fSkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIFwiQXV0aG9yaXphdGlvblwiOiBcIkJhc2ljIFwiICsgYnRvYShPcGNVYVJlc3RTZXJ2aWNlcy5lbmNvZGVfdXRmOCgoPGFueT51c2VySW5mbykudXNlcm5hbWUpICsgXCI6XCIgKyBPcGNVYVJlc3RTZXJ2aWNlcy5lbmNvZGVfdXRmOCgoPGFueT51c2VySW5mbykucGFzc3dvcmQpKVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZW5jb2RlX3V0Zjgocykge1xyXG4gICAgICAgIHJldHVybiB1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQocykpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBuZXcgc2Vzc2lvblxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHN0cmluZz59IFRoZSBjcmVhdGVkIHNlc3Npb24gaWRcclxuICAgICAqIEBtZW1iZXJvZiBPcGNVYVJlc3RTZXJ2aWNlc1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYXN5bmMgY3JlYXRlU2Vzc2lvbigpOiBQcm9taXNlPG51bWJlcj4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHZhciBzZXJ2aWNlVXJsID0gT3BjVWFSZXN0U2VydmljZXMuZ2V0T3BjVWFCYXNlVXJsKCkgKyAnL3Nlc3Npb25zJztcclxuICAgICAgICAgICAgdmFyIHNlcnZpY2VEYXRhID0geyBcInVybFwiOiBPcGNVYVJlc3RTZXJ2aWNlcy5nZXRPcGNVYVJlc3RTZXJ2aWNlRW5kUG9pbnRVcmwoKSB9O1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gYXdhaXQgUmVzdFNlcnZpY2UuY2FsbDxhbnk+KFJlc3RTZXJ2aWNlVHlwZS5QT1NULCBzZXJ2aWNlVXJsLCBzZXJ2aWNlRGF0YSk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQuaWQ7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlbGV0ZXMgYSBzZXNzaW9uXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNlc3Npb25JZCBTcGVjaWZpZXMgdGhlIHNlc3Npb24gdG8gZGVsZXRlLlxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8bnVtYmVyPn1cclxuICAgICAqIEBtZW1iZXJvZiBPcGNVYVJlc3RTZXJ2aWNlc1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYXN5bmMgZGVsZXRlU2Vzc2lvbihzZXNzaW9uSWQ6IG51bWJlcik6IFByb21pc2U8bnVtYmVyPiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3Qgc2VydmljZVVybCA9IE9wY1VhUmVzdFNlcnZpY2VzLmdldE9wY1VhQmFzZVVybCgpICsgJy9zZXNzaW9ucy8nICsgc2Vzc2lvbklkO1xyXG4gICAgICAgICAgICBhd2FpdCBSZXN0U2VydmljZS5jYWxsKFJlc3RTZXJ2aWNlVHlwZS5ERUxFVEUsIHNlcnZpY2VVcmwpO1xyXG4gICAgICAgICAgICByZXR1cm4gc2Vzc2lvbklkO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY3JlYXRlcyBhIHN1YnNjcmlwdGlvbiBhcyBhIGNvbnRhaW5lciBmb3Igb3BjLXVhIGl0ZW1zIHRvIGJlIG1vbml0b3JlZCAob2JzZXJ2ZWQpXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNlc3Npb25JZFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtpbnRlcnZhbD0xMDBdXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtlbmFibGVkPXRydWVdXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxzdHJpbmc+fVxyXG4gICAgICogQG1lbWJlcm9mIE9wY1VhUmVzdFNlcnZpY2VzXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBhc3luYyBjcmVhdGVTdWJzY3JpcHRpb24oc2Vzc2lvbklkOiBudW1iZXIsIGludGVydmFsOiBudW1iZXIgPSAyMDAsIGVuYWJsZWQ6IGJvb2xlYW4gPSB0cnVlKTogUHJvbWlzZTxudW1iZXI+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvLyBkZWZpbmUgYmFlcyB1cmxcclxuICAgICAgICAgICAgdmFyIHNlcnZpY2VVcmwgPSBPcGNVYVJlc3RTZXJ2aWNlcy5nZXRPcGNVYUJhc2VVcmwoKSArICcvc2Vzc2lvbnMvJyArIHNlc3Npb25JZCArICcvc3Vic2NyaXB0aW9ucyc7XHJcblxyXG4gICAgICAgICAgICAvLyBkZWZpbmUgc3Vic2NyaXRpb24gc2V0dGluZ3NcclxuICAgICAgICAgICAgbGV0IHN1YnNjcmlwdGlvblNldHRpbmdzID0ge1xyXG4gICAgICAgICAgICAgICAgcHVibGlzaGluZ0ludGVydmFsOiBpbnRlcnZhbCxcclxuICAgICAgICAgICAgICAgIHB1Ymxpc2hpbmdFbmFibGVkOiBlbmFibGVkXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIC8vIGNhbGwgdGhlIHNlcnZpY2Ugd2l0aCB0aGUgc3BlY2lmaWVkIHBhcmFtZXRlcnMgICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIHNlcnZpY2VEYXRhID0gc3Vic2NyaXB0aW9uU2V0dGluZ3M7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBhd2FpdCBSZXN0U2VydmljZS5jYWxsPGFueT4oUmVzdFNlcnZpY2VUeXBlLlBPU1QsIHNlcnZpY2VVcmwsIHNlcnZpY2VEYXRhKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5zdWJzY3JpcHRpb25JZDtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGRlbGV0ZXMgYSBzdWJzY3JpcHRpb25cclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2Vzc2lvbklkXHJcbiAgICAgKiBAcGFyYW0geyp9IHN1YnNjcmlwdGlvbklkXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxzdHJpbmc+fVxyXG4gICAgICogQG1lbWJlcm9mIE9wY1VhUmVzdFNlcnZpY2VzXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBhc3luYyBkZWxldGVTdWJzY3JpcHRpb24oc2Vzc2lvbklkOiBudW1iZXIsIHN1YnNjcmlwdGlvbklkOiBudW1iZXIpOiBQcm9taXNlPG51bWJlcj4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHZhciBzZXJ2aWNlVXJsID0gT3BjVWFSZXN0U2VydmljZXMuZ2V0T3BjVWFCYXNlVXJsKCkgKyAnL3Nlc3Npb25zLycgKyBzZXNzaW9uSWQgKyAnL3N1YnNjcmlwdGlvbnMvJyArIHN1YnNjcmlwdGlvbklkO1xyXG4gICAgICAgICAgICB2YXIgc2VydmljZURhdGEgPSB7IFwidXJsXCI6IE9wY1VhUmVzdFNlcnZpY2VzLmdldE9wY1VhUmVzdFNlcnZpY2VFbmRQb2ludFVybCgpIH07XHJcbiAgICAgICAgICAgIGF3YWl0IFJlc3RTZXJ2aWNlLmNhbGw8YW55PihSZXN0U2VydmljZVR5cGUuREVMRVRFLCBzZXJ2aWNlVXJsLCBzZXJ2aWNlRGF0YSk7XHJcbiAgICAgICAgICAgIHJldHVybiBzdWJzY3JpcHRpb25JZDtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZSBhIG1vbml0b3JlZCBpdGVtXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNlc3Npb25JZCBzcGVjaWZpZXMgdGhlIHNlcnZpY2Ugc2Vzc2lvbiBpZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN1YnNjcmlwdGlvbklkIHNwZWNpZmllcyB0aGUgc3Vic2NyaXB0aW9uIGlkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbm9kZUlkIHNwZWNpZmllcyB0aGUgbm9kZSB0byBiZSBzdWJzY3JpYmVkXHJcbiAgICAgKiBAcGFyYW0ge09wY1VhQXR0cmlidXRlfSBzcGVjaWZpZXMgdGhlIGF0dHJpYnV0ZSB0byBiZSBzY3Vic2NyaWJlZFxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8c3RyaW5nPn1cclxuICAgICAqIEBtZW1iZXJvZiBPcGNVYVJlc3RTZXJ2aWNlc1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYXN5bmMgY3JlYXRlTW9uaXRvcmVkSXRlbShzZXNzaW9uSWQ6IG51bWJlciwgc3Vic2NyaXB0aW9uSWQ6IG51bWJlciwgbm9kZUlkOiBzdHJpbmcsIGl0ZW1JZDogbnVtYmVyLCBzYW1wbGluZ0ludGVydmFsOiBudW1iZXIsIGF0dHJpYnV0ZTogT3BjVWFBdHRyaWJ1dGUpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIGRlZmluZSBiYWVzIHVybFxyXG4gICAgICAgICAgICB2YXIgc2VydmljZVVybCA9IE9wY1VhUmVzdFNlcnZpY2VzLmdldE9wY1VhQmFzZVVybCgpICsgJy9zZXNzaW9ucy8nICsgc2Vzc2lvbklkICsgJy9zdWJzY3JpcHRpb25zLycgKyBzdWJzY3JpcHRpb25JZCArICcvbW9uaXRvcmVkSXRlbXMnO1xyXG5cclxuICAgICAgICAgICAgLy8gZGVmaW5lIG1vbml0b3IgaXRlbSBzZXR0aW5nc1xyXG4gICAgICAgICAgICBjb25zdCBtb25pdG9ySXRlbVNldHRpbmdzID0ge1xyXG4gICAgICAgICAgICAgICAgaXRlbVRvTW9uaXRvcjoge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGVJZDogbm9kZUlkLFxyXG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZTogYXR0cmlidXRlXHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIG1vbml0b3JpbmdQYXJhbWV0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2FtcGxpbmdJbnRlcnZhbDogc2FtcGxpbmdJbnRlcnZhbCxcclxuICAgICAgICAgICAgICAgICAgICBjbGllbnRIYW5kbGU6IGl0ZW1JZFxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAvLyBjYWxsIHRoZSBzZXJ2aWNlIHdpdGggdGhlIHNwZWNpZmllZCBwYXJhbWV0ZXJzICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBzZXJ2aWNlRGF0YSA9IG1vbml0b3JJdGVtU2V0dGluZ3M7XHJcblxyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gYXdhaXQgUmVzdFNlcnZpY2UuY2FsbDxhbnk+KFJlc3RTZXJ2aWNlVHlwZS5QT1NULCBzZXJ2aWNlVXJsLCBzZXJ2aWNlRGF0YSk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIGRlbGV0ZXMgYSBtb25pdG9yZWQgaXRlbVxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzZXNzaW9uSWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdWJzY3JpcHRpb25JZFxyXG4gICAgICogQHBhcmFtIHsqfSBtb25pdG9yZWRJdGVtSWRcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHN0cmluZz59XHJcbiAgICAgKiBAbWVtYmVyb2YgT3BjVWFSZXN0U2VydmljZXNcclxuICAgICAqL1xyXG4gICAgc3RhdGljICBkZWxldGVNb25pdG9yZWRJdGVtKHNlc3Npb25JZDogc3RyaW5nLCBzdWJzY3JpcHRpb25JZDogbnVtYmVyLCBtb25pdG9yZWRJdGVtSWQ6IHN0cmluZyk6IGFueSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gZGVmaW5lIGJhZXMgdXJsXHJcbiAgICAgICAgICAgIHZhciBzZXJ2aWNlVXJsID0gT3BjVWFSZXN0U2VydmljZXMuZ2V0T3BjVWFCYXNlVXJsKCkgKyAnL3Nlc3Npb25zLycgKyBzZXNzaW9uSWQgKyAnL3N1YnNjcmlwdGlvbnMvJyArIHN1YnNjcmlwdGlvbklkICsgJy9tb25pdG9yZWRJdGVtcy8nICsgbW9uaXRvcmVkSXRlbUlkO1xyXG5cclxuICAgICAgICAgICAgLy8gY2FsbCB0aGUgc2VydmljZSB3aXRoIHRoZSBzcGVjaWZpZWQgcGFyYW1ldGVycyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyB2YXIgcmVzdWx0ID0gT3BjVWFSZXN0U2VydmljZXMubW9kZSA9PSAgUmVzdFNlcnZpY2VNb2RlLkVYRUNVVEUgPyBcclxuICAgICAgICAgICAgLy8gICAgIGF3YWl0IFJlc3RTZXJ2aWNlLmNhbGw8YW55PihSZXN0U2VydmljZVR5cGUuREVMRVRFLCBzZXJ2aWNlVXJsKSA6IFxyXG4gICAgICAgICAgICAvLyAgICAgUmVzdFNlcnZpY2UuY3JlYXRlUmVxdWVzdChSZXN0U2VydmljZVR5cGUuREVMRVRFLCBzZXJ2aWNlVXJsKTsgO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBSZXN0U2VydmljZS5jcmVhdGVSZXF1ZXN0KFJlc3RTZXJ2aWNlVHlwZS5ERUxFVEUsIHNlcnZpY2VVcmwpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGlmKHJlc3VsdCA9PT0gdW5kZWZpbmVkKSAgXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiPz8/Pz8/XCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG5cclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogUmVhZHMgdGhlIG5hbWVzcGFjZSBpbmRleCBmb3IgbWFwcCBDb2NrcGl0IHNlcnZpY2VzIFxyXG4gICAgKlxyXG4gICAgKiBAc3RhdGljXHJcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBzZXNzaW9uSWRcclxuICAgICogQHJldHVybnMge1Byb21pc2U8bnVtYmVyPn0gVGhlIGluZGV4IG9mIHRoZSBuYW1lc3BhY2VcclxuICAgICogQG1lbWJlcm9mIE9wY1VhUmVzdFNlcnZpY2VzXHJcbiAgICAqL1xyXG4gICAgc3RhdGljIGFzeW5jIGdldE5hbWVzcGFjZUluZGV4KHNlc3Npb25JZDogbnVtYmVyKTogUHJvbWlzZTxudW1iZXI+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB2YXIgc2VydmljZVVybCA9IE9wY1VhUmVzdFNlcnZpY2VzLmdldE9wY1VhQmFzZVVybCgpICsgJy9zZXNzaW9ucy8nICsgc2Vzc2lvbklkICsgJy9uYW1lc3BhY2VzLycgKyBlbmNvZGVVUklDb21wb25lbnQoT3BjVWFSZXN0U2VydmljZXMubWFwcENvY2twaXRPcGNVYU5hbWVzcGFjZSk7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBhd2FpdCBSZXN0U2VydmljZS5jYWxsPGFueT4oUmVzdFNlcnZpY2VUeXBlLkdFVCwgc2VydmljZVVybCk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQuaW5kZXg7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEJyb3dzZXMgdGhlIGNoaWxkIG5vZGVzIG9mIHRoZSBzcGVjaWZpZWQgcGFyZW50IG5vZGVcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2Vzc2lvbklkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGFyZW50Tm9kZUlkXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxyXG4gICAgICogQG1lbWJlcm9mIE9wY1VhUmVzdFNlcnZpY2VzXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBhc3luYyBicm93c2VOb2RlcyhzZXNzaW9uSWQ6IG51bWJlciwgcGFyZW50Tm9kZUlkOiBzdHJpbmcpOiBQcm9taXNlPEFycmF5PFJlc3QuSW50ZXJmYWNlT3BjVWFSZXN0UmVzdWx0Tm9kZVJlZmVyZW5jZT4+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB2YXIgc2VydmljZVVybCA9IE9wY1VhUmVzdFNlcnZpY2VzLmdldE9wY1VhQmFzZVVybCgpICsgJy9zZXNzaW9ucy8nICsgc2Vzc2lvbklkICsgJy9ub2Rlcy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHBhcmVudE5vZGVJZCkgKyAnL3JlZmVyZW5jZXMnO1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gYXdhaXQgUmVzdFNlcnZpY2UuY2FsbDxSZXN0LkludGVyZmFjZU9wY1VhUmVzdFJlc3VsdFJlZmVyZW5jZXNWYWx1ZT4oUmVzdFNlcnZpY2VUeXBlLkdFVCwgc2VydmljZVVybCk7XHJcbiAgICAgICAgICAgIFxyXG5cdCAgICAvLyBSZW1vdmUgTmFtZXNwYWNlSW5kZXggZnJvbSBicm93c2VOYW1lXHJcbiAgICAgICAgICAgIHJlc3VsdC5yZWZlcmVuY2VzLmZvckVhY2gocmVmZXJlbmNlID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBzdGFydEluZGV4ID0gcmVmZXJlbmNlLmJyb3dzZU5hbWUuaW5kZXhPZignXCInLCAwKTtcclxuICAgICAgICAgICAgICAgIHN0YXJ0SW5kZXgrKztcclxuICAgICAgICAgICAgICAgIGxldCBlbmRJbmRleCA9IHJlZmVyZW5jZS5icm93c2VOYW1lLmluZGV4T2YoJ1wiJywgc3RhcnRJbmRleCk7XHJcbiAgICAgICAgICAgICAgICByZWZlcmVuY2UuYnJvd3NlTmFtZSA9IHJlZmVyZW5jZS5icm93c2VOYW1lLnN1YnN0cihzdGFydEluZGV4LCBlbmRJbmRleC1zdGFydEluZGV4KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0LnJlZmVyZW5jZXM7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBicm93c2VzIHRoZSBtZXRhIGluZm8gZm9yIGEgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNlc3Npb25JZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5vZGVJZFxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QXJyYXk8UmVzdC5JbnRlcmZhY2VPcGNVYVJlc3RSZXN1bHROb2RlUmVmZXJlbmNlPj59XHJcbiAgICAgKiBAbWVtYmVyb2YgT3BjVWFSZXN0U2VydmljZXNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFzeW5jIGJyb3dzZU5vZGVNZXRhSW5mbyhzZXNzaW9uSWQ6IG51bWJlciwgbm9kZUlkOiBzdHJpbmcpOiBQcm9taXNlPEFycmF5PFJlc3QuSW50ZXJmYWNlT3BjVWFSZXN0UmVzdWx0Tm9kZVJlZmVyZW5jZT58dW5kZWZpbmVkPiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbGV0IG1ldGFJbmZvUmVmZXJlbmNlczpBcnJheTxSZXN0LkludGVyZmFjZU9wY1VhUmVzdFJlc3VsdE5vZGVSZWZlcmVuY2U+fHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgICAgIC8vIHJlYWQgdGhlIGNoaWxkIG5vZGVzXHJcbiAgICAgICAgICAgIGxldCBjaGlsZE5vZGVzID0gYXdhaXQgT3BjVWFSZXN0U2VydmljZXMuYnJvd3NlTm9kZXMoc2Vzc2lvbklkLCBub2RlSWQpO1xyXG4gICAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgY2hpbGQgbm9kZXMgY29udGFpbiBhIG1ldGEgbm9kZVxyXG4gICAgICAgICAgICBsZXQgbWV0YU5vZGVzID0gY2hpbGROb2Rlcy5maWx0ZXIoKGNoaWxkTm9kZSk9PnsgcmV0dXJuIGNoaWxkTm9kZS5icm93c2VOYW1lID09PSAgT3BjVWFSZXN0U2VydmljZXMubWFwcENvY2twaXRNZXRhTm9kZUlkO30pXHJcbiAgICAgICAgICAgIGlmIChtZXRhTm9kZXMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBBZGQgdGhlIHN1YiBub2RlIGlkIGZvciBwYXJhbWV0ZXIuXHJcbiAgICAgICAgICAgICAgICBsZXQgbWV0YU5vZGUgPSBtZXRhTm9kZXNbMF07XHJcbiAgICAgICAgICAgICAgICAvLyBCcm93c2UgdGhlIG1ldGEgaW5mbyBub2Rlc1xyXG4gICAgICAgICAgICAgICAgbWV0YUluZm9SZWZlcmVuY2VzID0gYXdhaXQgT3BjVWFSZXN0U2VydmljZXMuYnJvd3NlTm9kZXMoc2Vzc2lvbklkLCBtZXRhTm9kZS5ub2RlSWQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1ldGFJbmZvUmVmZXJlbmNlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHJldHJpZXZlIHZhbGlkIG1ldGEgbm9kZXNcclxuICAgICAgICAgICAgICAgICAgICBtZXRhSW5mb1JlZmVyZW5jZXMgPSBtZXRhSW5mb1JlZmVyZW5jZXMuZmlsdGVyKChwYXJhbWV0ZXIpID0+IHsgcmV0dXJuIHBhcmFtZXRlci5ub2RlQ2xhc3MgPT09IFwiVmFyaWFibGVcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyByZWFkIHRoZSBtZXRhIGluZm8gdmFsdWVzXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtZXRhSW5mb1JlZmVyZW5jZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWV0YUluZm9SZWZlcmVuY2UgPSBtZXRhSW5mb1JlZmVyZW5jZXNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtZXRhSW5mb1ZhbHVlID0gYXdhaXQgT3BjVWFSZXN0U2VydmljZXMucmVhZE5vZGVBdHRyaWJ1dGUoc2Vzc2lvbklkLCBtZXRhSW5mb1JlZmVyZW5jZS5ub2RlSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAoPGFueT5tZXRhSW5mb1JlZmVyZW5jZSkudmFsdWUgPSBtZXRhSW5mb1ZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBtZXRhSW5mb1JlZmVyZW5jZXM7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQnJvd3NlcyB0aGUgcGFyYW1ldGVyIHNldCBvZiBhIG5vZGUgaWYgYW55LlxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzZXNzaW9uSWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBub2RlSWRcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEFycmF5PE9wY1VhTm9kZVJlZmVyZW5jZUludGVyZmFjZT4+fSBUaGUgcGFyZW1ldGVyIHJlZmVyZW5jZXNcclxuICAgICAqIEBtZW1iZXJvZiBPcGNVYVJlc3RTZXJ2aWNlc1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYXN5bmMgYnJvd3NlTm9kZVBhcmFtZXRlclNldChzZXNzaW9uSWQ6IG51bWJlciwgbm9kZUlkOiBzdHJpbmcpOiBQcm9taXNlPEFycmF5PFJlc3QuSW50ZXJmYWNlT3BjVWFSZXN0UmVzdWx0Tm9kZVJlZmVyZW5jZT4+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvLyBBZGQgdGhlIHN1YiBub2RlIGlkIGZvciBwYXJhbWV0ZXIuXHJcbiAgICAgICAgICAgIG5vZGVJZCArPSBcIi5QYXJhbWV0ZXJTZXRcIjtcclxuICAgICAgICAgICAgLy8gQnJvd3NlIHRoZSBwYXJhbWV0ZXIgc2V0IGFuZCBleHRyYWN0IHZhcmlhYmxlIHR5cGVzIG9ubHkuXHJcblxyXG4gICAgICAgICAgICB2YXIgcGFyYW1ldGVyUmVmZXJlbmNlcyA9IChhd2FpdCBPcGNVYVJlc3RTZXJ2aWNlcy5icm93c2VOb2RlcyhzZXNzaW9uSWQsIG5vZGVJZCkpO1xyXG4gICAgICAgICAgICB2YXIgdmFsdWVQYXJhbWV0ZXJSZWZlcmVuY2VzID0gcGFyYW1ldGVyUmVmZXJlbmNlcy5maWx0ZXIoKHBhcmFtZXRlcikgPT4geyByZXR1cm4gcGFyYW1ldGVyLm5vZGVDbGFzcyA9PT0gXCJWYXJpYWJsZVwiIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWVQYXJhbWV0ZXJSZWZlcmVuY2VzO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkcyB0aGUgc3BlY2lmaWVkIG5vZGUgYXR0cmlidXRlXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNlc3Npb25JZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5vZGVJZFxyXG4gICAgICogQHBhcmFtIHsqfSBhdHRyaWJ1dGVcclxuICAgICAqIEBwYXJhbSB7Kn0gT3BjVWFBdHRyaWJ1dGVcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XHJcbiAgICAgKiBAbWVtYmVyb2YgT3BjVWFSZXN0U2VydmljZXNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFzeW5jIHJlYWROb2RlQXR0cmlidXRlKHNlc3Npb25JZDogbnVtYmVyLCBub2RlSWQ6IHN0cmluZywgYXR0cmlidXRlOiBPcGNVYUF0dHJpYnV0ZSA9IE9wY1VhQXR0cmlidXRlLlZBTFVFKTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB2YXIgc2VydmljZVVybCA9IE9wY1VhUmVzdFNlcnZpY2VzLmdldE9wY1VhQmFzZVVybCgpICsgJy9zZXNzaW9ucy8nICsgc2Vzc2lvbklkICsgJy9ub2Rlcy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KG5vZGVJZCkgKyAnL2F0dHJpYnV0ZXMvJyArIGF0dHJpYnV0ZTtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IChhd2FpdCBSZXN0U2VydmljZS5jYWxsPFJlc3QuSW50ZXJmYWNlT3BjVWFSZXN0UmVzdWx0QXR0cmlidXRlVmFsdWU+KFJlc3RTZXJ2aWNlVHlwZS5HRVQsIHNlcnZpY2VVcmwpKS52YWx1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFdyaXRlcyB0aGUgbm9kZSBhdHRyaWJ1dGVcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2Vzc2lvbklkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbm9kZUlkXHJcbiAgICAgKiBAcGFyYW0ge09wY1VhQXR0cmlidXRlfSBbYXR0cmlidXRlPU9wY1VhQXR0cmlidXRlLlZBTFVFXVxyXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZVxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cclxuICAgICAqIEBtZW1iZXJvZiBPcGNVYVJlc3RTZXJ2aWNlc1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYXN5bmMgd3JpdGVOb2RlQXR0cmlidXRlKHNlc3Npb25JZDogbnVtYmVyLCBub2RlSWQ6IHN0cmluZywgYXR0cmlidXRlOiBPcGNVYUF0dHJpYnV0ZSA9IE9wY1VhQXR0cmlidXRlLlZBTFVFLCB2YWx1ZTogYW55KTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWVEYXRhID0gdmFsdWU7XHJcblxyXG4gICAgICAgICAgICBpZiAoYXR0cmlidXRlID09PSBPcGNVYUF0dHJpYnV0ZS5WQUxVRSkge1xyXG4gICAgICAgICAgICAgICAgdmFsdWVEYXRhID0geyBcInZhbHVlXCI6IHZhbHVlIH07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBzZXJ2aWNlVXJsID0gT3BjVWFSZXN0U2VydmljZXMuZ2V0T3BjVWFCYXNlVXJsKCkgKyAnL3Nlc3Npb25zLycgKyBzZXNzaW9uSWQgKyAnL25vZGVzLycgKyBlbmNvZGVVUklDb21wb25lbnQobm9kZUlkKSArICcvYXR0cmlidXRlcy8nICsgYXR0cmlidXRlO1xyXG4gICAgICAgICAgICBhd2FpdCBSZXN0U2VydmljZS5jYWxsPFJlc3QuSW50ZXJmYWNlT3BjVWFSZXN0UmVzdWx0QXR0cmlidXRlVmFsdWU+KFJlc3RTZXJ2aWNlVHlwZS5QVVQsIHNlcnZpY2VVcmwsIHZhbHVlRGF0YSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCcm93c2VzIHRoZSBtZXRob2Qgc2V0IG9mIGEgbm9kZSBpZiBhbnkuXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNlc3Npb25JZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5vZGVJZFxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QXJyYXk8T3BjVWFOb2RlUmVmZXJlbmNlSW50ZXJmYWNlPj59XHJcbiAgICAgKiBAbWVtYmVyb2YgT3BjVWFSZXN0U2VydmljZXNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFzeW5jIGJyb3dzZU5vZGVNZXRob2RTZXQoc2Vzc2lvbklkOiBudW1iZXIsIG5vZGVJZDogc3RyaW5nKTogUHJvbWlzZTxBcnJheTxSZXN0LkludGVyZmFjZU9wY1VhUmVzdFJlc3VsdE5vZGVSZWZlcmVuY2U+PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gQWRkIHRoZSBzdWIgbm9kZSBpZCBmb3IgbWV0aG9kcy5cclxuICAgICAgICAgICAgbm9kZUlkICs9IFwiLk1ldGhvZFNldFwiO1xyXG4gICAgICAgICAgICAvLyBCcm93c2UgdGhlIG1ldGhvZCBzZXQuXHJcbiAgICAgICAgICAgIHZhciBtZXRob2RSZWZlcmVuY2VzID0gKGF3YWl0IE9wY1VhUmVzdFNlcnZpY2VzLmJyb3dzZU5vZGVzKHNlc3Npb25JZCwgbm9kZUlkKSkuZmlsdGVyKChtZXRob2QpID0+IHsgcmV0dXJuIG1ldGhvZC5ub2RlQ2xhc3MgPT09IFwiTWV0aG9kXCIgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBtZXRob2RSZWZlcmVuY2VzO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWRzIHRoZSBpbnB1dCBwYXJhbWV0ZXJzIG9mIGEgbWV0aG9kXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNlc3Npb25JZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5vZGVJZFxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cclxuICAgICAqIEBtZW1iZXJvZiBPcGNVYVJlc3RTZXJ2aWNlc1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYXN5bmMgcmVhZE1ldGhvZFBhcmFtZXRlcnMoc2Vzc2lvbklkOiBudW1iZXIsIG5vZGVJZDogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvLyBBZGQgdGhlIHN1YiBub2RlIGlkIGZvciBtZXRob2QgcGFyYW1ldGVycy5cclxuICAgICAgICAgICAgbm9kZUlkICs9IFwiI0lucHV0QXJndW1lbnRzXCI7XHJcbiAgICAgICAgICAgIC8vIEJyb3dzZSB0aGUgaW5wdXQgYXJndW1lbnRzXHJcbiAgICAgICAgICAgIHZhciBpbnB1dEFyZ3VtZW50cyA9IChhd2FpdCBPcGNVYVJlc3RTZXJ2aWNlcy5yZWFkTm9kZUF0dHJpYnV0ZShzZXNzaW9uSWQsIG5vZGVJZCwgT3BjVWFBdHRyaWJ1dGUuVkFMVUUpKTtcclxuICAgICAgICAgICAgcmV0dXJuIGlucHV0QXJndW1lbnRzO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGFuZCBjYWxsIGEganNvbiBiYXRjaCByZXF1ZXN0XHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtKUXVlcnkuQWpheFNldHRpbmdzPGFueT5bXX0gcmVzdFJlcXVlc3RzXHJcbiAgICAgKiBAbWVtYmVyb2YgT3BjVWFSZXN0U2VydmljZXNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFzeW5jIGNhbGxCYXRjaFJlcXVlc3QocmVzdFJlcXVlc3RzOiBSZXN0UmVxdWVzdEluZm9bXSkge1xyXG4gICAgICAgIHJldHVybiBhd2FpdCBSZXN0U2VydmljZS5jYWxsQmF0Y2hSZXF1ZXN0PGFueT4odGhpcy5nZXRPcGNVYUJhc2VVcmwoKSAscmVzdFJlcXVlc3RzKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRXhlY3V0ZXMgdGhlIHNwZWNpZmllZCBtZXRob2QgXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHRlbXBsYXRlIFRfTUVUSE9EX1JFU1VMVFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNlc3Npb25JZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5vZGVJZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1ldGhvZElkXHJcbiAgICAgKiBAcGFyYW0geyp9IG1ldGhvZEFyZ3NcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFRfTUVUSE9EX1JFU1VMVD59XHJcbiAgICAgKiBAbWVtYmVyb2YgT3BjVWFSZXN0U2VydmljZXNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFzeW5jIGV4ZWN1dGVNZXRob2Q8VF9NRVRIT0RfUkVTVUxUPihzZXNzaW9uSWQ6IG51bWJlciwgbm9kZUlkOiBzdHJpbmcsIG1ldGhvZElkOiBzdHJpbmcsIG1ldGhvZEFyZ3M6IGFueSk6IFByb21pc2U8VF9NRVRIT0RfUkVTVUxUPiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmFyIHNlcnZpY2VVcmwgPSBPcGNVYVJlc3RTZXJ2aWNlcy5nZXRPcGNVYUJhc2VVcmwoKSArICcvc2Vzc2lvbnMvJyArIHNlc3Npb25JZCArICcvbm9kZXMvJyArIGVuY29kZVVSSUNvbXBvbmVudChub2RlSWQpICsgJy9tZXRob2RzLycgKyBlbmNvZGVVUklDb21wb25lbnQobWV0aG9kSWQpO1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gYXdhaXQgUmVzdFNlcnZpY2UuY2FsbDxhbnk+KFJlc3RTZXJ2aWNlVHlwZS5QT1NULCBzZXJ2aWNlVXJsLCBtZXRob2RBcmdzKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZpbHRlcnMgdGhlIG5vZGVzIHRvIGJlIGRpc3BsYXllZCBpbiBtYXBwIGNvY2twaXRcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PFJlc3QuSW50ZXJmYWNlT3BjVWFSZXN0UmVzdWx0Tm9kZVJlZmVyZW5jZT59IG9wY1VhTm9kZXNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtYXBwQ29ja3BpdE5hbWVzcGFjZVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBPcGNVYVJlc3RTZXJ2aWNlc1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZmlsdGVyTWFwcENvY2twaXROb2RlcyhvcGNVYU5vZGVzOiBBcnJheTxSZXN0LkludGVyZmFjZU9wY1VhUmVzdFJlc3VsdE5vZGVSZWZlcmVuY2U+LCBtYXBwQ29ja3BpdE5hbWVzcGFjZTogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIG9wY1VhTm9kZXMuZmlsdGVyKChub2RlUmVmZXJlbmNlKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBpc0NoaWxkTm9kZSA9IG5vZGVSZWZlcmVuY2UuaXNGb3J3YXJkID09PSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIG5vZGUgaXMgd2l0aGluIHRoZSBtYXBwIGNvY2twaXQgbmFtZXNwYWNlXHJcbiAgICAgICAgICAgIHZhciBpc01hcHBDb21wb25lbnQgPSAoPFN0cmluZz5ub2RlUmVmZXJlbmNlLnR5cGVEZWZpbml0aW9uKS5pbmRleE9mKG1hcHBDb2NrcGl0TmFtZXNwYWNlKSA+IC0xO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGlzQ2hpbGROb2RlICYmIGlzTWFwcENvbXBvbmVudDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4vKipcclxuICogRGVmaW5lcyBPcGNVYSBBdHRyaWJ1dGUgbmFtZXMuXHJcbiAqXHJcbiAqIEBlbnVtIHtudW1iZXJ9XHJcbiAqL1xyXG5lbnVtIE9wY1VhQXR0cmlidXRlIHtcclxuICAgIFZBTFVFID0gXCJWYWx1ZVwiLFxyXG4gICAgREFUQV9UWVBFID0gXCJEYXRhVHlwZVwiLFxyXG4gICAgQlJPV1NFX05BTUUgPSBcIkJyb3dzZU5hbWVcIixcclxuICAgIERJU1BMQVlfTkFNRSA9IFwiRGlzcGxheU5hbWVcIixcclxuICAgIERFU0NSSVBUSU9OID0gXCJEZXNjcmlwdGlvblwiLFxyXG4gICAgVVNFUl9BQ0NFU1NfTEVWRUwgPSBcIlVzZXJBY2Nlc3NMZXZlbFwiXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTcGVjaWZpZXMgYWNjZXNzIGxldmVscyAoIGFzIGJpdCBmbGFncyApIFxyXG4gKlxyXG4gKiBAZW51bSB7bnVtYmVyfVxyXG4gKi9cclxuZW51bSBPcGNVYUFjY2Vzc0xldmVsIHtcclxuICAgIEN1cnJlbnRSZWFkID0gMHgwMSxcclxuICAgIEN1cnJlbnRXcml0ZSA9IDB4MDIsXHJcbiAgICBIaXN0b3J5UmVhZCA9IDB4MDQsXHJcbiAgICBIaXN0b3J5V3JpdGUgPSAweDA4LFxyXG4gICAgU2VtYW50aWNDaGFuZ2UgPSAweDEwLFxyXG4gICAgU3RhdHVzV3JpdGUgPSAweDIwLFxyXG4gICAgVGltZXN0YW1wV3JpdGUgPSAweDQwLFxyXG4gICAgUmVzZXJ2ZWQgPSAweDgwLFxyXG59XHJcblxyXG5cclxuXHJcblxyXG5leHBvcnQgeyBPcGNVYVJlc3RTZXJ2aWNlcywgUmVzdCwgUmVzdFNlcnZpY2VNb2RlLE9wY1VhQXR0cmlidXRlLCBPcGNVYUFjY2Vzc0xldmVsIH07Il19