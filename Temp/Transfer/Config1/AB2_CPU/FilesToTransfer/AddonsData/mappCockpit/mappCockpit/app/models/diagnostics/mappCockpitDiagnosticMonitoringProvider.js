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
define(["require", "exports", "../../communication/rest/opcUaWebSocket", "../../communication/rest/opcUaRestServices", "../../framework/events", "../../framework/interfaces/observer"], function (require, exports, opcUaWebSocket_1, opcUaRestServices_1, events_1, observer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventObservedItemsChanged = /** @class */ (function (_super) {
        __extends(EventObservedItemsChanged, _super);
        function EventObservedItemsChanged() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventObservedItemsChanged;
    }(events_1.TypedEvent));
    ;
    var EventObservedSubscriptionItemsChanged = /** @class */ (function (_super) {
        __extends(EventObservedSubscriptionItemsChanged, _super);
        function EventObservedSubscriptionItemsChanged() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventObservedSubscriptionItemsChanged;
    }(events_1.TypedEvent));
    ;
    var EventObservedItemsChangedArgs = /** @class */ (function () {
        function EventObservedItemsChangedArgs(observer, subscription, changedItems) {
            this._observer = observer;
            this._monitoringSubscription = subscription;
            this._changedMonitoredItems = changedItems;
        }
        Object.defineProperty(EventObservedItemsChangedArgs.prototype, "observer", {
            get: function () {
                return this._observer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EventObservedItemsChangedArgs.prototype, "subscription", {
            get: function () {
                return this._monitoringSubscription;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EventObservedItemsChangedArgs.prototype, "changedItems", {
            get: function () {
                return this._changedMonitoredItems;
            },
            enumerable: true,
            configurable: true
        });
        return EventObservedItemsChangedArgs;
    }());
    exports.EventObservedItemsChangedArgs = EventObservedItemsChangedArgs;
    ;
    /**
     * implements observation and monitoring of diagnostic elements
     *
     * @class MappCockpitDiagnosticMonitoringProvider
     */
    var MappCockpitDiagnosticMonitoringProvider = /** @class */ (function () {
        /**
         *Creates an instance of MappCockpitDiagnosticMonitoringProvider.
         * @param {MappCockpitDiagnosticProvider} diagnosticProvider
         * @memberof MappCockpitDiagnosticMonitoringProvider
         */
        function MappCockpitDiagnosticMonitoringProvider(diagnosticProvider) {
            var _this = this;
            this._opcUaWebSocketHandler = function (sender, eventArgs) { _this.handleOpcUaEvent(eventArgs); };
            this._observedItemsChangedHandler = function (sender, eventArgs) { _this.eventObservedItemsChanged.raise(_this, eventArgs); };
            this._diagnosticProvider = diagnosticProvider;
            this._monitoringSubscriptions = new MonitoringSubscriptionCollection();
            this.eventObservedItemsChanged = new EventObservedItemsChanged();
        }
        /**
         * creates a connection for listening to events from opc-ua
         *
         * @private
         * @memberof MappCockpitDiagnosticMonitoringProvider
         */
        MappCockpitDiagnosticMonitoringProvider.prototype.createOpcUaSocket = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this._opcUaWebSocket = opcUaWebSocket_1.OpcUaWebSocket.create();
                            this._opcUaWebSocket.eventOpcUaWebSocket.attach(this._opcUaWebSocketHandler);
                            return [4 /*yield*/, this._opcUaWebSocket.connect()];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * activates observing parameter changes.
         *
         * @param {*} observer
         * @param {number} sessionId
         * @param {MappCockpitComponentItem[]} componentParameters
         * @returns {Promise<void>}
         * @memberof MappCockpitDiagnosticMonitoringProvider
         */
        MappCockpitDiagnosticMonitoringProvider.prototype.observeComponentModelItems = function (observer, sessionId, componentParameters) {
            return __awaiter(this, void 0, void 0, function () {
                var subscription, _a, error_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 6, , 7]);
                            if (!(this.findSubscriptionForObserver(observer, sessionId) != null)) return [3 /*break*/, 1];
                            _a = this.findSubscriptionForObserver(observer, sessionId);
                            return [3 /*break*/, 3];
                        case 1: return [4 /*yield*/, MonitoringSubscription.create(observer, sessionId)];
                        case 2:
                            _a = _b.sent();
                            _b.label = 3;
                        case 3:
                            subscription = _a;
                            if (!subscription) return [3 /*break*/, 5];
                            // attach items changed event and forward it through the provider
                            subscription.eventObservedItemsChanged.attach(this._observedItemsChangedHandler);
                            // add the new subscription to the subscription collection
                            this._monitoringSubscriptions.add(subscription);
                            // create the items to monitor
                            return [4 /*yield*/, subscription.createMonitoredItems(componentParameters)];
                        case 4:
                            // create the items to monitor
                            _b.sent();
                            console.log("MappCockpitDiagnosticMonitoringProvider:created subscription: %o %o %o", observer, subscription.id, this._monitoringSubscriptions);
                            _b.label = 5;
                        case 5: return [3 /*break*/, 7];
                        case 6:
                            error_1 = _b.sent();
                            return [3 /*break*/, 7];
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Gets the subscription for the observer.
         *
         * @private
         * @param {*} observer
         * @param {number} sessionId
         * @returns
         * @memberof MappCockpitDiagnosticMonitoringProvider
         */
        MappCockpitDiagnosticMonitoringProvider.prototype.findSubscriptionForObserver = function (observer, sessionId) {
            // find a subscription for this observer.
            var existingSubscription = this._monitoringSubscriptions.items.filter(function (subscription) { return subscription.observer == observer; });
            // check if a subscription for this observer already exists.
            if (existingSubscription.length === 1) {
                // return the existing subscription ...
                return existingSubscription[0];
            }
            else {
                return null;
            }
        };
        /**
         * Unobserves the passed items.
         *
         * @param {*} observer
         * @param {number} sessionId
         * @param {MappCockpitComponentItem[]} observedItems
         * @param {boolean} suspend
         * @memberof MappCockpitDiagnosticMonitoringProvider
         */
        MappCockpitDiagnosticMonitoringProvider.prototype.unobserveComponentModelItems = function (observer, sessionId, observedItems, suspend) {
            return __awaiter(this, void 0, void 0, function () {
                var subscription, _a, deletedSubscriptionId;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!(this.findSubscriptionForObserver(observer, sessionId) != null)) return [3 /*break*/, 1];
                            _a = this.findSubscriptionForObserver(observer, sessionId);
                            return [3 /*break*/, 3];
                        case 1: return [4 /*yield*/, MonitoringSubscription.create(observer, sessionId)];
                        case 2:
                            _a = _b.sent();
                            _b.label = 3;
                        case 3:
                            subscription = _a;
                            if (!subscription) return [3 /*break*/, 5];
                            subscription.eventObservedItemsChanged.detach(this._observedItemsChangedHandler);
                            return [4 /*yield*/, this.deleteSubscription(sessionId, subscription)];
                        case 4:
                            deletedSubscriptionId = _b.sent();
                            console.log("MappCockpitDiagnosticMonitoringProvider.unobserveComponentModelItems - observer:%o, subscriptionId:%o", subscription.observer, deletedSubscriptionId);
                            _b.label = 5;
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Deletes a subscription with its monitored items.
         *
         * @private
         * @param {number} sessionId
         * @param {MonitoringSubscription} subscription
         * @returns {Promise<number>}
         * @memberof MappCockpitDiagnosticMonitoringProvider
         */
        MappCockpitDiagnosticMonitoringProvider.prototype.deleteSubscription = function (sessionId, subscription) {
            return __awaiter(this, void 0, void 0, function () {
                var deletedSubscriptionId, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            deletedSubscriptionId = -1;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, MonitoringSubscription.delete(sessionId, subscription.id)];
                        case 2:
                            // delete the subscription on the target
                            deletedSubscriptionId = _a.sent();
                            // remove the subscription instance from the list
                            this._monitoringSubscriptions.remove(subscription);
                            return [3 /*break*/, 4];
                        case 3:
                            error_2 = _a.sent();
                            console.error(error_2);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/, deletedSubscriptionId];
                    }
                });
            });
        };
        /**
         * handles opc-ua events
         *
         * @param {OpcUaWebSocketEventArgs} eventArgs
         * @returns {*}
         * @memberof MappCockpitDiagnosticMonitoringProvider
         */
        MappCockpitDiagnosticMonitoringProvider.prototype.handleOpcUaEvent = function (eventArgs) {
            switch (eventArgs.type) {
                case opcUaWebSocket_1.SockeEventType.MESSAGE:
                    this.processOpcUaDataChanged(eventArgs.data);
                    break;
                default:
                    break;
            }
        };
        /**
         * receives the data changed and distributes it to consumers
         *
         * @private
         * @param {IOpcUaDataChanged} opcUaDataChangedInfo
         * @memberof MappCockpitDiagnosticMonitoringProvider
         */
        MappCockpitDiagnosticMonitoringProvider.prototype.processOpcUaDataChanged = function (opcUaDataChangedInfo) {
            var modifiedSubscription = this._monitoringSubscriptions.findById(opcUaDataChangedInfo.subscriptionId);
            if (modifiedSubscription) {
                modifiedSubscription.processItemChanges(opcUaDataChangedInfo);
            }
        };
        /**
         * closes the monitoring provider and all its connections
         *
         * @returns {*}
         * @memberof MappCockpitDiagnosticMonitoringProvider
         */
        MappCockpitDiagnosticMonitoringProvider.prototype.close = function () {
            if (this._opcUaWebSocket) {
                this._opcUaWebSocket.eventOpcUaWebSocket.detach(this._opcUaWebSocketHandler);
                this._opcUaWebSocket.close();
            }
        };
        return MappCockpitDiagnosticMonitoringProvider;
    }());
    exports.MappCockpitDiagnosticMonitoringProvider = MappCockpitDiagnosticMonitoringProvider;
    /**
     * the class holds and manages subscriptions.
     *
     * @class MonitoringSubscriptionSet
     */
    var MonitoringSubscriptionCollection = /** @class */ (function () {
        /**
         *Creates an instance of MonitoringSubscriptionCollection.
         * @memberof MonitoringSubscriptionCollection
         */
        function MonitoringSubscriptionCollection() {
            // the subscription instances are stored with id as key on a simple object
            this._subscriptions = {};
        }
        /**
         * adds a new subcription
         *
         * @param {MonitoringSubscription} subscription
         * @memberof MonitoringSubscriptionCollection
         */
        MonitoringSubscriptionCollection.prototype.add = function (subscription) {
            // store the subscription by id
            this._subscriptions[subscription.id] = subscription;
        };
        /**
         * removes the given subscription
         *
         * @param {MonitoringSubscription} subscription
         * @memberof MonitoringSubscriptionCollection
         */
        MonitoringSubscriptionCollection.prototype.remove = function (subscription) {
            delete this._subscriptions[subscription.id];
        };
        /**
         * returns the subscription with the requested id
         *
         * @param {number} subscriptionId
         * @memberof MonitoringSubscriptionCollection
         */
        MonitoringSubscriptionCollection.prototype.findById = function (subscriptionId) {
            // retrieve the available subscription
            var subscription = this._subscriptions[subscriptionId];
            return subscription;
        };
        Object.defineProperty(MonitoringSubscriptionCollection.prototype, "items", {
            /**
             * gets the available subscriptions
             *
             * @readonly
             * @type {Array<MonitoringSubscription>}
             * @memberof MonitoringSubscriptionCollection
             */
            get: function () {
                var _this = this;
                return Object.keys(this._subscriptions).map(function (key) { return _this._subscriptions[key]; });
            },
            enumerable: true,
            configurable: true
        });
        return MonitoringSubscriptionCollection;
    }());
    /**
     * implements managing a set of monitoring items in a subscription
     *
     * @class MonitoringSubscription
     */
    var MonitoringSubscription = /** @class */ (function () {
        /**
         * Creates an instance of MonitoringSubscription.
         * @param {*} observer
         * @param {*} sessionId
         * @param {number} subscriptionId
         * @memberof MonitoringSubscription
         */
        function MonitoringSubscription(observer, sessionId, subscriptionId) {
            // holds the subscription id
            this._subscriptionId = -1;
            // holds a collection of items to be monitored
            this._monitoringItems = {};
            this._subscriptionObserver = observer;
            this._sessionId = sessionId;
            this._subscriptionId = subscriptionId;
            this._monitoringItems = {};
            this.eventObservedItemsChanged = new EventObservedSubscriptionItemsChanged();
        }
        Object.defineProperty(MonitoringSubscription.prototype, "id", {
            /**
             * returns the subscription id
             *
             * @readonly
             * @memberof MonitoringSubscription
             */
            get: function () {
                return this._subscriptionId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MonitoringSubscription.prototype, "observer", {
            /**
             * returns the observer interrested in change notifications
             *
             * @readonly
             * @type {*}
             * @memberof MonitoringSubscription
             */
            get: function () {
                return this._subscriptionObserver;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * returns the monitored item with the specefied id
         *
         * @param {*} clientId
         * @returns {MappCockpitComponentParameter}
         * @memberof MonitoringSubscription
         */
        MonitoringSubscription.prototype.getMonitoredItemById = function (clientId) {
            return this._monitoringItems[clientId];
        };
        /**
         * creates a new monitoring subscription.
         *
         * @static
         * @param {*} observer
         * @param {number} sessionId
         * @returns {Promise<MonitoringSubscription>}
         * @memberof MonitoringSubscription
         */
        MonitoringSubscription.create = function (observer, sessionId) {
            return __awaiter(this, void 0, void 0, function () {
                var subscriptionId;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.createSubscription(sessionId)];
                        case 1:
                            subscriptionId = _a.sent();
                            return [2 /*return*/, new MonitoringSubscription(observer, sessionId, subscriptionId)];
                    }
                });
            });
        };
        /**
         * Deletes the specified subscription
         *
         * @static
         * @param {number} sessionId
         * @param {number} subscriptionId
         * @returns {Promise<number>}
         * @memberof MonitoringSubscription
         */
        MonitoringSubscription.delete = function (sessionId, subscriptionId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.deleteSubscription(sessionId, subscriptionId)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * creates a set of items to be monitored
         *
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @returns {Promise<any>}
         * @memberof MonitoringSubscription
         */
        MonitoringSubscription.prototype.createMonitoredItems = function (componentParameters) {
            return __awaiter(this, void 0, void 0, function () {
                var clientId, createMonitoredItemRequests, monitoredItems_1, i, parameter, monitorItem, newMonitoredItemRequest, createMonitoredItemsResult, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 7, , 8]);
                            clientId = 0;
                            createMonitoredItemRequests = [];
                            monitoredItems_1 = [];
                            // create a monitored item for every parameter.
                            // begin batch mode
                            opcUaRestServices_1.OpcUaRestServices.mode = opcUaRestServices_1.RestServiceMode.BATCH;
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < componentParameters.length)) return [3 /*break*/, 5];
                            parameter = componentParameters[i];
                            monitorItem = this.addMonitoringItem(parameter, opcUaRestServices_1.OpcUaAttribute.VALUE, clientId);
                            monitoredItems_1.push(monitorItem);
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.createMonitoredItem(this._sessionId, this._subscriptionId, parameter.id, clientId, opcUaRestServices_1.OpcUaRestServices.monitoringSamplingInterval, opcUaRestServices_1.OpcUaAttribute.VALUE)];
                        case 2:
                            newMonitoredItemRequest = _a.sent();
                            createMonitoredItemRequests.push(newMonitoredItemRequest);
                            clientId++;
                            monitorItem = this.addMonitoringItem(parameter, opcUaRestServices_1.OpcUaAttribute.USER_ACCESS_LEVEL, clientId);
                            monitoredItems_1.push(monitorItem);
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.createMonitoredItem(this._sessionId, this._subscriptionId, parameter.id, clientId, opcUaRestServices_1.OpcUaRestServices.monitoringSamplingInterval, opcUaRestServices_1.OpcUaAttribute.USER_ACCESS_LEVEL)];
                        case 3:
                            newMonitoredItemRequest = _a.sent();
                            createMonitoredItemRequests.push(newMonitoredItemRequest);
                            clientId++;
                            _a.label = 4;
                        case 4:
                            i++;
                            return [3 /*break*/, 1];
                        case 5:
                            // end batch mode
                            opcUaRestServices_1.OpcUaRestServices.mode = opcUaRestServices_1.RestServiceMode.EXECUTE;
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.callBatchRequest(createMonitoredItemRequests)];
                        case 6:
                            createMonitoredItemsResult = _a.sent();
                            createMonitoredItemsResult.responses.forEach(function (createdMonitoredItem) {
                                // set the item id for the created monitor item
                                monitoredItems_1[createdMonitoredItem.id].id = createdMonitoredItem.body.monitoredItemId;
                            });
                            return [3 /*break*/, 8];
                        case 7:
                            error_3 = _a.sent();
                            console.error(error_3);
                            return [3 /*break*/, 8];
                        case 8:
                            console.log("MonitoringSubscription:createMonitoredItems: %o", this._monitoringItems);
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Clears all monitored items for this subscription
         *
         * @memberof MonitoringSubscription
         */
        MonitoringSubscription.prototype.clearMonitoredItems = function () {
            return __awaiter(this, void 0, void 0, function () {
                var deleteMonitoredItemRequests, i, monitoreItem, deleteMonitoredItemRequest, i, error_4, error_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 5, , 6]);
                            if (!Object.keys(this._monitoringItems)) return [3 /*break*/, 4];
                            deleteMonitoredItemRequests = [];
                            // begin batch mode
                            opcUaRestServices_1.OpcUaRestServices.mode = opcUaRestServices_1.RestServiceMode.BATCH;
                            for (i = 0; i < Object.keys(this._monitoringItems).length; i++) {
                                monitoreItem = this._monitoringItems[i];
                                try {
                                    deleteMonitoredItemRequest = opcUaRestServices_1.OpcUaRestServices.deleteMonitoredItem(this._sessionId, this._subscriptionId, monitoreItem.id);
                                    deleteMonitoredItemRequests.push(deleteMonitoredItemRequest);
                                }
                                catch (error) {
                                    console.error("Subscription: Could not delete monitored item %o %o", monitoreItem.id, this.id);
                                }
                                // this.removeMonitoringItem(i);  
                            }
                            // end batch mode
                            opcUaRestServices_1.OpcUaRestServices.mode = opcUaRestServices_1.RestServiceMode.EXECUTE;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.callBatchRequest(deleteMonitoredItemRequests)];
                        case 2:
                            _a.sent();
                            for (i = 0; i < Object.keys(this._monitoringItems).length; i++) {
                                // this.removeMonitoringItem(i);  
                            }
                            return [3 /*break*/, 4];
                        case 3:
                            error_4 = _a.sent();
                            console.error(error_4);
                            return [3 /*break*/, 4];
                        case 4: return [3 /*break*/, 6];
                        case 5:
                            error_5 = _a.sent();
                            throw error_5;
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * adds a new monitoring item.
         *
         * @private
         * @param {MappCockpitComponentItem} parameter
         * @param {OpcUaAttribute} monitoringAttribute
         * @param {number} clientId
         * @returns {MonitoringSubscriptionItem}
         * @memberof MonitoringSubscription
         */
        MonitoringSubscription.prototype.addMonitoringItem = function (parameter, monitoringAttribute, clientId) {
            var monitorItem = MonitoringSubscriptionItem.create(parameter, monitoringAttribute, clientId);
            this._monitoringItems[clientId] = monitorItem;
            return monitorItem;
        };
        /**
         * Removes a monitored item
         *
         * @private
         * @param {number} clientId
         * @memberof MonitoringSubscription
         */
        MonitoringSubscription.prototype.removeMonitoringItem = function (clientId) {
            delete this._monitoringItems[clientId];
        };
        /**
         * handles the processing of item changes
         *
         * @param {IOpcUaDataChanged} opcUaDataChangedInfo
         * @returns {*}
         * @memberof MonitoringSubscription
         */
        MonitoringSubscription.prototype.processItemChanges = function (opcUaDataChangedInfo) {
            var _this = this;
            var changedObservables = new Array();
            opcUaDataChangedInfo.DataNotifications.forEach(function (dataNotification) {
                // get the item to change
                var monitorItem = _this.getMonitoredItemById(dataNotification.clientHandle);
                if (monitorItem) {
                    // update the items value
                    monitorItem.changeValue(dataNotification.value);
                    // add it to the modified observables list
                    changedObservables.push(new observer_1.Observable(monitorItem.monitoringObject, monitorItem.monitoringProperty));
                }
                else {
                    throw new Error('MappCockpitDiagnosticMonitoringProvider.processOpcUaDataChanged: Could not find monitored item ' + JSON.stringify(dataNotification));
                }
            });
            this.onMonitorItemsChanged(this, changedObservables);
        };
        /**
         * notifies from updateing observed items
         *
         * @param {MonitoringSubscription} changedSubscription
         * @param {Observable[]} changedObservables
         * @returns {*}
         * @memberof MonitoringSubscription
         */
        MonitoringSubscription.prototype.onMonitorItemsChanged = function (changedSubscription, changedObservables) {
            var changedEventArgs = new EventObservedItemsChangedArgs(changedSubscription.observer, changedSubscription, changedObservables);
            this.eventObservedItemsChanged.raise(this, changedEventArgs);
            this.notifyObserverFromChanges(changedSubscription.observer, changedObservables);
        };
        /**
         * notifies the observer from changes if the observer implements the notification interface
         *
         * @private
         * @param {IObserver} observer
         * @param {Observables[]} changedObservables
         * @memberof MonitoringSubscription
         */
        MonitoringSubscription.prototype.notifyObserverFromChanges = function (observer, changedObservables) {
            if (observer.onObservablesChanged) {
                observer.onObservablesChanged(changedObservables);
            }
        };
        return MonitoringSubscription;
    }());
    /**
     * The class holds information about the subsripted item
     *
     * @class MonitoringSubscriptionItem
     */
    var MonitoringSubscriptionItem = /** @class */ (function () {
        /**
         * Creates an instance of MonitoringSubscriptionItem.
         * @param {*} monitoringObject
         * @param {string} monitoringProperty
         * @memberof MonitoringSubscriptionItem
         */
        function MonitoringSubscriptionItem(monitoringObject, monitoringProperty) {
            // holds the item instance
            this._monitorItemInstance = undefined;
            // holds the property name of the item to watch
            this._monitoringProperty = "";
            // holds the monitor item id
            this._id = "";
            this._monitorItemInstance = monitoringObject;
            this._monitoringProperty = monitoringProperty;
        }
        Object.defineProperty(MonitoringSubscriptionItem.prototype, "monitoringObject", {
            get: function () {
                return this._monitorItemInstance;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MonitoringSubscriptionItem.prototype, "monitoringProperty", {
            get: function () {
                return this._monitoringProperty;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MonitoringSubscriptionItem.prototype, "id", {
            get: function () {
                return this._id;
            },
            set: function (id) {
                this._id = id;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * creates and initializes a new monitoring item
         *
         * @static
         * @param {MappCockpitComponentItem} monitoringObject
         * @param {string} monitoringProperty
         * @param {number} clientId
         * @returns {MonitoringSubscriptionItem}
         * @memberof MonitoringSubscriptionItem
         */
        MonitoringSubscriptionItem.create = function (monitoringObject, monitoringProperty, clientId) {
            return new MonitoringSubscriptionItem(monitoringObject, monitoringProperty);
        };
        /**
         * Updates the specified item property with the new value
         *
         * @param {*} newMonitoredItemValue
         * @returns {*}
         * @memberof MonitoringSubscriptionItem
         */
        MonitoringSubscriptionItem.prototype.changeValue = function (newMonitoredItemValue) {
            switch (this.monitoringProperty) {
                case "Value":
                    // set object value
                    this.monitoringObject.value = newMonitoredItemValue;
                    break;
                case "UserAccessLevel":
                    // set writeable attribute according to the access level
                    var newWriteableState = (newMonitoredItemValue & opcUaRestServices_1.OpcUaAccessLevel.CurrentWrite) == opcUaRestServices_1.OpcUaAccessLevel.CurrentWrite;
                    this.monitoringObject.isWriteable.value = newWriteableState;
                    console.log("MonitoringSubscriptionItem - updated writeable %o %o", this.monitoringObject.browseName + ".isWriteable = ", this.monitoringObject.isWriteable);
                    break;
                default:
                    break;
            }
        };
        return MonitoringSubscriptionItem;
    }());
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcENvY2twaXREaWFnbm9zdGljTW9uaXRvcmluZ1Byb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvZGlhZ25vc3RpY3MvbWFwcENvY2twaXREaWFnbm9zdGljTW9uaXRvcmluZ1Byb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFTQTtRQUF3Qyw2Q0FBa0Y7UUFBMUg7O1FBQTRILENBQUM7UUFBRCxnQ0FBQztJQUFELENBQUMsQUFBN0gsQ0FBd0MsbUJBQVUsR0FBMkU7SUFBQSxDQUFDO0lBQzlIO1FBQW9ELHlEQUFpRTtRQUFySDs7UUFBdUgsQ0FBQztRQUFELDRDQUFDO0lBQUQsQ0FBQyxBQUF4SCxDQUFvRCxtQkFBVSxHQUEwRDtJQUFBLENBQUM7SUFFekg7UUFNSSx1Q0FBWSxRQUFhLEVBQUUsWUFBb0MsRUFBRSxZQUFnQjtZQUM3RSxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztZQUMxQixJQUFJLENBQUMsdUJBQXVCLEdBQUcsWUFBWSxDQUFDO1lBQzVDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxZQUFZLENBQUM7UUFDL0MsQ0FBQztRQUVELHNCQUFXLG1EQUFRO2lCQUFuQjtnQkFDSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUE7WUFDekIsQ0FBQzs7O1dBQUE7UUFFRCxzQkFBVyx1REFBWTtpQkFBdkI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsdUJBQXVCLENBQUE7WUFDdkMsQ0FBQzs7O1dBQUE7UUFFRCxzQkFBVyx1REFBWTtpQkFBdkI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsc0JBQXNCLENBQUE7WUFDdEMsQ0FBQzs7O1dBQUE7UUFDTCxvQ0FBQztJQUFELENBQUMsQUF2QkQsSUF1QkM7SUF3bEJpRCxzRUFBNkI7SUF4bEI5RSxDQUFDO0lBRUY7Ozs7T0FJ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QUFHLHFCQUFxQixDQUFDO29CQUNwRCxNQUFNO2dCQUNWLEtBQUssaUJBQWlCO29CQUNsQix3REFBd0Q7b0JBQ3hELElBQUksaUJBQWlCLEdBQUcsQ0FBQyxxQkFBcUIsR0FBRyxvQ0FBZ0IsQ0FBQyxZQUFZLENBQUMsSUFBSSxvQ0FBZ0IsQ0FBQyxZQUFZLENBQUM7b0JBQ2pILElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsS0FBSyxHQUFHLGlCQUFpQixDQUFDO29CQUM1RCxPQUFPLENBQUMsR0FBRyxDQUFDLHNEQUFzRCxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEdBQUcsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUM3SixNQUFNO2dCQUNWO29CQUNJLE1BQU07YUFDYjtRQUNMLENBQUM7UUFDTCxpQ0FBQztJQUFELENBQUMsQUF6RUQsSUF5RUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlciB9IGZyb20gXCIuL21hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyXCI7XHJcbmltcG9ydCB7IE9wY1VhV2ViU29ja2V0LCBPcGNVYVdlYlNvY2tldEV2ZW50QXJncywgU29ja2VFdmVudFR5cGUsIElPcGNVYURhdGFDaGFuZ2VkIH0gZnJvbSAnLi4vLi4vY29tbXVuaWNhdGlvbi9yZXN0L29wY1VhV2ViU29ja2V0JztcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnRJdGVtIH0gZnJvbSBcIi4uL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBPcGNVYVJlc3RTZXJ2aWNlcywgT3BjVWFBdHRyaWJ1dGUsIE9wY1VhQWNjZXNzTGV2ZWwsIFJlc3RTZXJ2aWNlTW9kZSB9IGZyb20gXCIuLi8uLi9jb21tdW5pY2F0aW9uL3Jlc3Qvb3BjVWFSZXN0U2VydmljZXNcIjtcclxuaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvZXZlbnRzXCI7XHJcbmltcG9ydCB7IFJlc3RSZXF1ZXN0SW5mbyB9IGZyb20gXCIuLi8uLi9jb21tdW5pY2F0aW9uL3Jlc3QvcmVzdFNlcnZpY2VcIjtcclxuaW1wb3J0IHsgSU9ic2VydmVyLCBPYnNlcnZhYmxlIH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9pbnRlcmZhY2VzL29ic2VydmVyXCI7XHJcblxyXG5cclxuY2xhc3MgRXZlbnRPYnNlcnZlZEl0ZW1zQ2hhbmdlZCBleHRlbmRzIFR5cGVkRXZlbnQ8TWFwcENvY2twaXREaWFnbm9zdGljTW9uaXRvcmluZ1Byb3ZpZGVyLCBFdmVudE9ic2VydmVkSXRlbXNDaGFuZ2VkQXJncz57IH07XHJcbmNsYXNzIEV2ZW50T2JzZXJ2ZWRTdWJzY3JpcHRpb25JdGVtc0NoYW5nZWQgZXh0ZW5kcyBUeXBlZEV2ZW50PE1vbml0b3JpbmdTdWJzY3JpcHRpb24sIEV2ZW50T2JzZXJ2ZWRJdGVtc0NoYW5nZWRBcmdzPnsgfTtcclxuXHJcbmNsYXNzIEV2ZW50T2JzZXJ2ZWRJdGVtc0NoYW5nZWRBcmdzIHtcclxuXHJcbiAgICBwcml2YXRlIF9vYnNlcnZlcjogYW55O1xyXG4gICAgcHJpdmF0ZSBfbW9uaXRvcmluZ1N1YnNjcmlwdGlvbjogTW9uaXRvcmluZ1N1YnNjcmlwdGlvbjtcclxuICAgIHByaXZhdGUgX2NoYW5nZWRNb25pdG9yZWRJdGVtcztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihvYnNlcnZlcjogYW55LCBzdWJzY3JpcHRpb246IE1vbml0b3JpbmdTdWJzY3JpcHRpb24sIGNoYW5nZWRJdGVtczogW10pIHtcclxuICAgICAgICB0aGlzLl9vYnNlcnZlciA9IG9ic2VydmVyO1xyXG4gICAgICAgIHRoaXMuX21vbml0b3JpbmdTdWJzY3JpcHRpb24gPSBzdWJzY3JpcHRpb247XHJcbiAgICAgICAgdGhpcy5fY2hhbmdlZE1vbml0b3JlZEl0ZW1zID0gY2hhbmdlZEl0ZW1zO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgb2JzZXJ2ZXIoKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fb2JzZXJ2ZXJcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHN1YnNjcmlwdGlvbigpOiBNb25pdG9yaW5nU3Vic2NyaXB0aW9uIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbW9uaXRvcmluZ1N1YnNjcmlwdGlvblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY2hhbmdlZEl0ZW1zKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NoYW5nZWRNb25pdG9yZWRJdGVtc1xyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIGltcGxlbWVudHMgb2JzZXJ2YXRpb24gYW5kIG1vbml0b3Jpbmcgb2YgZGlhZ25vc3RpYyBlbGVtZW50c1xyXG4gKlxyXG4gKiBAY2xhc3MgTWFwcENvY2twaXREaWFnbm9zdGljTW9uaXRvcmluZ1Byb3ZpZGVyXHJcbiAqL1xyXG5jbGFzcyBNYXBwQ29ja3BpdERpYWdub3N0aWNNb25pdG9yaW5nUHJvdmlkZXIge1xyXG5cclxuICAgIC8vIGhvbGRzIGEgcmVmZXJlbmNlIHRvIHRoZSBkaWFnbm9zdGljIHByb3ZpZGVyXHJcbiAgICBwcml2YXRlIF9kaWFnbm9zdGljUHJvdmlkZXI6IE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyO1xyXG5cclxuICAgIC8vIGhvbGRzIHN1YnNjcmlwdGlvbnNcclxuICAgIHByaXZhdGUgX21vbml0b3JpbmdTdWJzY3JpcHRpb25zOiBNb25pdG9yaW5nU3Vic2NyaXB0aW9uQ29sbGVjdGlvbjtcclxuXHJcbiAgICAvLyBob2xkcyBhIHdlYiBzb2NrZXQgaW5zdGFuY2VcclxuICAgIHByaXZhdGUgX29wY1VhV2ViU29ja2V0ITogT3BjVWFXZWJTb2NrZXQ7XHJcblxyXG4gICAgLy8gZGVjbGFyZXMgdGhlIG9ic2VydmVhYmxlIGNoYW5nZWQgZXZlbnRcclxuICAgIHB1YmxpYyBldmVudE9ic2VydmVkSXRlbXNDaGFuZ2VkOiBFdmVudE9ic2VydmVkSXRlbXNDaGFuZ2VkO1xyXG5cclxuICAgIHByaXZhdGUgX29wY1VhV2ViU29ja2V0SGFuZGxlciA9IChzZW5kZXIsIGV2ZW50QXJncykgPT4geyB0aGlzLmhhbmRsZU9wY1VhRXZlbnQoZXZlbnRBcmdzKTsgfTtcclxuXHJcbiAgICBwcml2YXRlIF9vYnNlcnZlZEl0ZW1zQ2hhbmdlZEhhbmRsZXIgPSAoc2VuZGVyLCBldmVudEFyZ3MpID0+IHsgdGhpcy5ldmVudE9ic2VydmVkSXRlbXNDaGFuZ2VkLnJhaXNlKHRoaXMsIGV2ZW50QXJncyk7IH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKkNyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgTWFwcENvY2twaXREaWFnbm9zdGljTW9uaXRvcmluZ1Byb3ZpZGVyLlxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlcn0gZGlhZ25vc3RpY1Byb3ZpZGVyXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXREaWFnbm9zdGljTW9uaXRvcmluZ1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGRpYWdub3N0aWNQcm92aWRlcjogTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXIpIHtcclxuICAgICAgICB0aGlzLl9kaWFnbm9zdGljUHJvdmlkZXIgPSBkaWFnbm9zdGljUHJvdmlkZXI7XHJcbiAgICAgICAgdGhpcy5fbW9uaXRvcmluZ1N1YnNjcmlwdGlvbnMgPSBuZXcgTW9uaXRvcmluZ1N1YnNjcmlwdGlvbkNvbGxlY3Rpb24oKTtcclxuXHJcbiAgICAgICAgdGhpcy5ldmVudE9ic2VydmVkSXRlbXNDaGFuZ2VkID0gbmV3IEV2ZW50T2JzZXJ2ZWRJdGVtc0NoYW5nZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZXMgYSBjb25uZWN0aW9uIGZvciBsaXN0ZW5pbmcgdG8gZXZlbnRzIGZyb20gb3BjLXVhXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdERpYWdub3N0aWNNb25pdG9yaW5nUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgYXN5bmMgY3JlYXRlT3BjVWFTb2NrZXQoKSB7XHJcbiAgICAgICAgdGhpcy5fb3BjVWFXZWJTb2NrZXQgPSBPcGNVYVdlYlNvY2tldC5jcmVhdGUoKTtcclxuICAgICAgICB0aGlzLl9vcGNVYVdlYlNvY2tldC5ldmVudE9wY1VhV2ViU29ja2V0LmF0dGFjaCh0aGlzLl9vcGNVYVdlYlNvY2tldEhhbmRsZXIpO1xyXG5cclxuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5fb3BjVWFXZWJTb2NrZXQuY29ubmVjdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYWN0aXZhdGVzIG9ic2VydmluZyBwYXJhbWV0ZXIgY2hhbmdlcy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IG9ic2VydmVyXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2Vzc2lvbklkXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50SXRlbVtdfSBjb21wb25lbnRQYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdERpYWdub3N0aWNNb25pdG9yaW5nUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgYXN5bmMgb2JzZXJ2ZUNvbXBvbmVudE1vZGVsSXRlbXMob2JzZXJ2ZXI6IGFueSwgc2Vzc2lvbklkOiBudW1iZXIsIGNvbXBvbmVudFBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbVtdKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gZ2V0IHRoZSBzdWJzY3JpcHRpb24gZm9yIHRoZSBvYnNlcnZlciBvciBjcmVhdGUgYSBuZXcgb25lXHJcbiAgICAgICAgICAgIGxldCBzdWJzY3JpcHRpb24gPSB0aGlzLmZpbmRTdWJzY3JpcHRpb25Gb3JPYnNlcnZlcihvYnNlcnZlciwgc2Vzc2lvbklkKSAhPSBudWxsID8gdGhpcy5maW5kU3Vic2NyaXB0aW9uRm9yT2JzZXJ2ZXIob2JzZXJ2ZXIsIHNlc3Npb25JZCkgOiBhd2FpdCBNb25pdG9yaW5nU3Vic2NyaXB0aW9uLmNyZWF0ZShvYnNlcnZlciwgc2Vzc2lvbklkKTtcclxuICAgICAgICAgICAgaWYgKHN1YnNjcmlwdGlvbikge1xyXG4gICAgICAgICAgICAgICAgLy8gYXR0YWNoIGl0ZW1zIGNoYW5nZWQgZXZlbnQgYW5kIGZvcndhcmQgaXQgdGhyb3VnaCB0aGUgcHJvdmlkZXJcclxuICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbi5ldmVudE9ic2VydmVkSXRlbXNDaGFuZ2VkLmF0dGFjaCh0aGlzLl9vYnNlcnZlZEl0ZW1zQ2hhbmdlZEhhbmRsZXIpO1xyXG4gICAgICAgICAgICAgICAgLy8gYWRkIHRoZSBuZXcgc3Vic2NyaXB0aW9uIHRvIHRoZSBzdWJzY3JpcHRpb24gY29sbGVjdGlvblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbW9uaXRvcmluZ1N1YnNjcmlwdGlvbnMuYWRkKHN1YnNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgICAvLyBjcmVhdGUgdGhlIGl0ZW1zIHRvIG1vbml0b3JcclxuICAgICAgICAgICAgICAgIGF3YWl0IHN1YnNjcmlwdGlvbi5jcmVhdGVNb25pdG9yZWRJdGVtcyhjb21wb25lbnRQYXJhbWV0ZXJzKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk1hcHBDb2NrcGl0RGlhZ25vc3RpY01vbml0b3JpbmdQcm92aWRlcjpjcmVhdGVkIHN1YnNjcmlwdGlvbjogJW8gJW8gJW9cIixvYnNlcnZlciwgc3Vic2NyaXB0aW9uLmlkLCB0aGlzLl9tb25pdG9yaW5nU3Vic2NyaXB0aW9ucyk7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgc3Vic2NyaXB0aW9uIGZvciB0aGUgb2JzZXJ2ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gb2JzZXJ2ZXJcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzZXNzaW9uSWRcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXREaWFnbm9zdGljTW9uaXRvcmluZ1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZmluZFN1YnNjcmlwdGlvbkZvck9ic2VydmVyKG9ic2VydmVyOiBhbnksIHNlc3Npb25JZDogbnVtYmVyKTogTW9uaXRvcmluZ1N1YnNjcmlwdGlvbnxudWxsIHtcclxuICAgICAgICAvLyBmaW5kIGEgc3Vic2NyaXB0aW9uIGZvciB0aGlzIG9ic2VydmVyLlxyXG4gICAgICAgIGxldCBleGlzdGluZ1N1YnNjcmlwdGlvbiA9ICB0aGlzLl9tb25pdG9yaW5nU3Vic2NyaXB0aW9ucy5pdGVtcy5maWx0ZXIoKHN1YnNjcmlwdGlvbik9PnsgcmV0dXJuIHN1YnNjcmlwdGlvbi5vYnNlcnZlciA9PSBvYnNlcnZlcn0pO1xyXG4gICAgICAgIC8vIGNoZWNrIGlmIGEgc3Vic2NyaXB0aW9uIGZvciB0aGlzIG9ic2VydmVyIGFscmVhZHkgZXhpc3RzLlxyXG4gICAgICAgIGlmIChleGlzdGluZ1N1YnNjcmlwdGlvbi5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgLy8gcmV0dXJuIHRoZSBleGlzdGluZyBzdWJzY3JpcHRpb24gLi4uXHJcbiAgICAgICAgICAgcmV0dXJuIGV4aXN0aW5nU3Vic2NyaXB0aW9uWzBdO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVbm9ic2VydmVzIHRoZSBwYXNzZWQgaXRlbXMuIFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gb2JzZXJ2ZXJcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzZXNzaW9uSWRcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRJdGVtW119IG9ic2VydmVkSXRlbXNcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gc3VzcGVuZFxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0RGlhZ25vc3RpY01vbml0b3JpbmdQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBhc3luYyB1bm9ic2VydmVDb21wb25lbnRNb2RlbEl0ZW1zKG9ic2VydmVyOiBhbnksIHNlc3Npb25JZDogbnVtYmVyLCBvYnNlcnZlZEl0ZW1zOiBNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW1bXSwgc3VzcGVuZDpib29sZWFuKSB7XHJcbiAgICAgICAgbGV0IHN1YnNjcmlwdGlvbiA9IHRoaXMuZmluZFN1YnNjcmlwdGlvbkZvck9ic2VydmVyKG9ic2VydmVyLCBzZXNzaW9uSWQpICE9IG51bGwgPyB0aGlzLmZpbmRTdWJzY3JpcHRpb25Gb3JPYnNlcnZlcihvYnNlcnZlciwgc2Vzc2lvbklkKSA6IGF3YWl0IE1vbml0b3JpbmdTdWJzY3JpcHRpb24uY3JlYXRlKG9ic2VydmVyLCBzZXNzaW9uSWQpO1xyXG4gICAgICAgIGlmIChzdWJzY3JpcHRpb24pe1xyXG4gICAgICAgICAgICBzdWJzY3JpcHRpb24uZXZlbnRPYnNlcnZlZEl0ZW1zQ2hhbmdlZC5kZXRhY2godGhpcy5fb2JzZXJ2ZWRJdGVtc0NoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICAgICAgbGV0IGRlbGV0ZWRTdWJzY3JpcHRpb25JZCA9IGF3YWl0IHRoaXMuZGVsZXRlU3Vic2NyaXB0aW9uKHNlc3Npb25JZCxzdWJzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk1hcHBDb2NrcGl0RGlhZ25vc3RpY01vbml0b3JpbmdQcm92aWRlci51bm9ic2VydmVDb21wb25lbnRNb2RlbEl0ZW1zIC0gb2JzZXJ2ZXI6JW8sIHN1YnNjcmlwdGlvbklkOiVvXCIsc3Vic2NyaXB0aW9uLm9ic2VydmVyLGRlbGV0ZWRTdWJzY3JpcHRpb25JZCApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlbGV0ZXMgYSBzdWJzY3JpcHRpb24gd2l0aCBpdHMgbW9uaXRvcmVkIGl0ZW1zLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2Vzc2lvbklkXHJcbiAgICAgKiBAcGFyYW0ge01vbml0b3JpbmdTdWJzY3JpcHRpb259IHN1YnNjcmlwdGlvblxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8bnVtYmVyPn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdERpYWdub3N0aWNNb25pdG9yaW5nUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBkZWxldGVTdWJzY3JpcHRpb24oc2Vzc2lvbklkOiBudW1iZXIsIHN1YnNjcmlwdGlvbjogTW9uaXRvcmluZ1N1YnNjcmlwdGlvbik6IFByb21pc2U8bnVtYmVyPiB7XHJcbiAgICAgICAgbGV0IGRlbGV0ZWRTdWJzY3JpcHRpb25JZCA9IC0xO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIGRlbGV0ZSB0aGUgc3Vic2NyaXB0aW9uIG9uIHRoZSB0YXJnZXRcclxuICAgICAgICAgICAgZGVsZXRlZFN1YnNjcmlwdGlvbklkID0gYXdhaXQgTW9uaXRvcmluZ1N1YnNjcmlwdGlvbi5kZWxldGUoc2Vzc2lvbklkLCBzdWJzY3JpcHRpb24uaWQpO1xyXG4gICAgICAgICAgICAvLyByZW1vdmUgdGhlIHN1YnNjcmlwdGlvbiBpbnN0YW5jZSBmcm9tIHRoZSBsaXN0XHJcbiAgICAgICAgICAgIHRoaXMuX21vbml0b3JpbmdTdWJzY3JpcHRpb25zLnJlbW92ZShzdWJzY3JpcHRpb24pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZGVsZXRlZFN1YnNjcmlwdGlvbklkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogaGFuZGxlcyBvcGMtdWEgZXZlbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPcGNVYVdlYlNvY2tldEV2ZW50QXJnc30gZXZlbnRBcmdzXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdERpYWdub3N0aWNNb25pdG9yaW5nUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgaGFuZGxlT3BjVWFFdmVudChldmVudEFyZ3M6IE9wY1VhV2ViU29ja2V0RXZlbnRBcmdzKTogdm9pZCB7XHJcbiAgICAgICAgc3dpdGNoIChldmVudEFyZ3MudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIFNvY2tlRXZlbnRUeXBlLk1FU1NBR0U6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NPcGNVYURhdGFDaGFuZ2VkKGV2ZW50QXJncy5kYXRhKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlY2VpdmVzIHRoZSBkYXRhIGNoYW5nZWQgYW5kIGRpc3RyaWJ1dGVzIGl0IHRvIGNvbnN1bWVyc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0lPcGNVYURhdGFDaGFuZ2VkfSBvcGNVYURhdGFDaGFuZ2VkSW5mb1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0RGlhZ25vc3RpY01vbml0b3JpbmdQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHByb2Nlc3NPcGNVYURhdGFDaGFuZ2VkKG9wY1VhRGF0YUNoYW5nZWRJbmZvOiBJT3BjVWFEYXRhQ2hhbmdlZCkge1xyXG5cclxuICAgICAgICBsZXQgbW9kaWZpZWRTdWJzY3JpcHRpb24gPSB0aGlzLl9tb25pdG9yaW5nU3Vic2NyaXB0aW9ucy5maW5kQnlJZChvcGNVYURhdGFDaGFuZ2VkSW5mby5zdWJzY3JpcHRpb25JZCk7XHJcblxyXG4gICAgICAgIGlmIChtb2RpZmllZFN1YnNjcmlwdGlvbikge1xyXG4gICAgICAgICAgICBtb2RpZmllZFN1YnNjcmlwdGlvbi5wcm9jZXNzSXRlbUNoYW5nZXMob3BjVWFEYXRhQ2hhbmdlZEluZm8pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNsb3NlcyB0aGUgbW9uaXRvcmluZyBwcm92aWRlciBhbmQgYWxsIGl0cyBjb25uZWN0aW9uc1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0RGlhZ25vc3RpY01vbml0b3JpbmdQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBjbG9zZSgpOiBhbnkge1xyXG4gICAgICAgIGlmICh0aGlzLl9vcGNVYVdlYlNvY2tldCkge1xyXG4gICAgICAgICAgICB0aGlzLl9vcGNVYVdlYlNvY2tldC5ldmVudE9wY1VhV2ViU29ja2V0LmRldGFjaCh0aGlzLl9vcGNVYVdlYlNvY2tldEhhbmRsZXIpO1xyXG4gICAgICAgICAgICB0aGlzLl9vcGNVYVdlYlNvY2tldC5jbG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIHRoZSBjbGFzcyBob2xkcyBhbmQgbWFuYWdlcyBzdWJzY3JpcHRpb25zLlxyXG4gKlxyXG4gKiBAY2xhc3MgTW9uaXRvcmluZ1N1YnNjcmlwdGlvblNldFxyXG4gKi9cclxuY2xhc3MgTW9uaXRvcmluZ1N1YnNjcmlwdGlvbkNvbGxlY3Rpb24ge1xyXG5cclxuICAgIC8vIGhvbGRzIHRoZSBzdWJzY3JpcHRpb25zXHJcbiAgICBwcml2YXRlIF9zdWJzY3JpcHRpb25zO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICpDcmVhdGVzIGFuIGluc3RhbmNlIG9mIE1vbml0b3JpbmdTdWJzY3JpcHRpb25Db2xsZWN0aW9uLlxyXG4gICAgICogQG1lbWJlcm9mIE1vbml0b3JpbmdTdWJzY3JpcHRpb25Db2xsZWN0aW9uXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIC8vIHRoZSBzdWJzY3JpcHRpb24gaW5zdGFuY2VzIGFyZSBzdG9yZWQgd2l0aCBpZCBhcyBrZXkgb24gYSBzaW1wbGUgb2JqZWN0XHJcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9ucyA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYWRkcyBhIG5ldyBzdWJjcmlwdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TW9uaXRvcmluZ1N1YnNjcmlwdGlvbn0gc3Vic2NyaXB0aW9uXHJcbiAgICAgKiBAbWVtYmVyb2YgTW9uaXRvcmluZ1N1YnNjcmlwdGlvbkNvbGxlY3Rpb25cclxuICAgICAqL1xyXG4gICAgYWRkKHN1YnNjcmlwdGlvbjogTW9uaXRvcmluZ1N1YnNjcmlwdGlvbikge1xyXG4gICAgICAgIC8vIHN0b3JlIHRoZSBzdWJzY3JpcHRpb24gYnkgaWRcclxuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb25zW3N1YnNjcmlwdGlvbi5pZF0gPSBzdWJzY3JpcHRpb247XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZW1vdmVzIHRoZSBnaXZlbiBzdWJzY3JpcHRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01vbml0b3JpbmdTdWJzY3JpcHRpb259IHN1YnNjcmlwdGlvblxyXG4gICAgICogQG1lbWJlcm9mIE1vbml0b3JpbmdTdWJzY3JpcHRpb25Db2xsZWN0aW9uXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZShzdWJzY3JpcHRpb246IE1vbml0b3JpbmdTdWJzY3JpcHRpb24pIHtcclxuICAgICAgICBkZWxldGUgdGhpcy5fc3Vic2NyaXB0aW9uc1tzdWJzY3JpcHRpb24uaWRdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmV0dXJucyB0aGUgc3Vic2NyaXB0aW9uIHdpdGggdGhlIHJlcXVlc3RlZCBpZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzdWJzY3JpcHRpb25JZFxyXG4gICAgICogQG1lbWJlcm9mIE1vbml0b3JpbmdTdWJzY3JpcHRpb25Db2xsZWN0aW9uXHJcbiAgICAgKi9cclxuICAgIGZpbmRCeUlkKHN1YnNjcmlwdGlvbklkOiBudW1iZXIpOiBNb25pdG9yaW5nU3Vic2NyaXB0aW9uIHtcclxuICAgICAgICAvLyByZXRyaWV2ZSB0aGUgYXZhaWxhYmxlIHN1YnNjcmlwdGlvblxyXG4gICAgICAgIGxldCBzdWJzY3JpcHRpb246IE1vbml0b3JpbmdTdWJzY3JpcHRpb24gPSB0aGlzLl9zdWJzY3JpcHRpb25zW3N1YnNjcmlwdGlvbklkXTtcclxuICAgICAgICByZXR1cm4gc3Vic2NyaXB0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0cyB0aGUgYXZhaWxhYmxlIHN1YnNjcmlwdGlvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtBcnJheTxNb25pdG9yaW5nU3Vic2NyaXB0aW9uPn1cclxuICAgICAqIEBtZW1iZXJvZiBNb25pdG9yaW5nU3Vic2NyaXB0aW9uQ29sbGVjdGlvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGl0ZW1zKCk6IEFycmF5PE1vbml0b3JpbmdTdWJzY3JpcHRpb24+IHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5fc3Vic2NyaXB0aW9ucykubWFwKChrZXkpID0+IHsgcmV0dXJuIHRoaXMuX3N1YnNjcmlwdGlvbnNba2V5XSB9KTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIGltcGxlbWVudHMgbWFuYWdpbmcgYSBzZXQgb2YgbW9uaXRvcmluZyBpdGVtcyBpbiBhIHN1YnNjcmlwdGlvblxyXG4gKlxyXG4gKiBAY2xhc3MgTW9uaXRvcmluZ1N1YnNjcmlwdGlvblxyXG4gKi9cclxuY2xhc3MgTW9uaXRvcmluZ1N1YnNjcmlwdGlvbiB7XHJcblxyXG4gICAgLy8gaG9sZHMgdGhlIHN1YnNjcmlwdGlvbiBpZFxyXG4gICAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uSWQgPSAtMTtcclxuICAgIC8vIGhvbGRzIHRoZSBzZXNzaW9uIGlkXHJcbiAgICBwcml2YXRlIF9zZXNzaW9uSWQ6IGFueTtcclxuICAgIC8vIGhvbGRzIGEgY29sbGVjdGlvbiBvZiBpdGVtcyB0byBiZSBtb25pdG9yZWRcclxuICAgIHByaXZhdGUgX21vbml0b3JpbmdJdGVtczphbnkgPSB7fTtcclxuICAgIC8vIGhvbGRzIGEgcmVmZXJlbmNlIHRvIHRoZSBvYnNlcnZlciBpbnRlcnJlc3RlZCBpbiBzdWJzY3JpcHRpb24gYW5kIGl0ZW0gY2hhbmdlc1xyXG4gICAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uT2JzZXJ2ZXI6IGFueTtcclxuICAgIC8vIGRlY2xhcmVzIHRoZSBvYnNlcnZlYWJsZSBjaGFuZ2VkIGV2ZW50XHJcbiAgICBwdWJsaWMgZXZlbnRPYnNlcnZlZEl0ZW1zQ2hhbmdlZDogRXZlbnRPYnNlcnZlZFN1YnNjcmlwdGlvbkl0ZW1zQ2hhbmdlZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgTW9uaXRvcmluZ1N1YnNjcmlwdGlvbi5cclxuICAgICAqIEBwYXJhbSB7Kn0gb2JzZXJ2ZXJcclxuICAgICAqIEBwYXJhbSB7Kn0gc2Vzc2lvbklkXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc3Vic2NyaXB0aW9uSWRcclxuICAgICAqIEBtZW1iZXJvZiBNb25pdG9yaW5nU3Vic2NyaXB0aW9uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29uc3RydWN0b3Iob2JzZXJ2ZXI6IGFueSwgc2Vzc2lvbklkLCBzdWJzY3JpcHRpb25JZDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uT2JzZXJ2ZXIgPSBvYnNlcnZlcjtcclxuICAgICAgICB0aGlzLl9zZXNzaW9uSWQgPSBzZXNzaW9uSWQ7XHJcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uSWQgPSBzdWJzY3JpcHRpb25JZDtcclxuICAgICAgICB0aGlzLl9tb25pdG9yaW5nSXRlbXMgPSB7fTtcclxuXHJcbiAgICAgICAgdGhpcy5ldmVudE9ic2VydmVkSXRlbXNDaGFuZ2VkID0gbmV3IEV2ZW50T2JzZXJ2ZWRTdWJzY3JpcHRpb25JdGVtc0NoYW5nZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJldHVybnMgdGhlIHN1YnNjcmlwdGlvbiBpZFxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQG1lbWJlcm9mIE1vbml0b3JpbmdTdWJzY3JpcHRpb25cclxuICAgICAqL1xyXG4gICAgZ2V0IGlkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdWJzY3JpcHRpb25JZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJldHVybnMgdGhlIG9ic2VydmVyIGludGVycmVzdGVkIGluIGNoYW5nZSBub3RpZmljYXRpb25zXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNb25pdG9yaW5nU3Vic2NyaXB0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgb2JzZXJ2ZXIoKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3Vic2NyaXB0aW9uT2JzZXJ2ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZXR1cm5zIHRoZSBtb25pdG9yZWQgaXRlbSB3aXRoIHRoZSBzcGVjZWZpZWQgaWRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IGNsaWVudElkXHJcbiAgICAgKiBAcmV0dXJucyB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgTW9uaXRvcmluZ1N1YnNjcmlwdGlvblxyXG4gICAgICovXHJcbiAgICBnZXRNb25pdG9yZWRJdGVtQnlJZChjbGllbnRJZCk6IE1vbml0b3JpbmdTdWJzY3JpcHRpb25JdGVtIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbW9uaXRvcmluZ0l0ZW1zW2NsaWVudElkXTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZXMgYSBuZXcgbW9uaXRvcmluZyBzdWJzY3JpcHRpb24uXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHsqfSBvYnNlcnZlclxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNlc3Npb25JZFxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8TW9uaXRvcmluZ1N1YnNjcmlwdGlvbj59XHJcbiAgICAgKiBAbWVtYmVyb2YgTW9uaXRvcmluZ1N1YnNjcmlwdGlvblxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYXN5bmMgY3JlYXRlKG9ic2VydmVyOiBhbnksIHNlc3Npb25JZDogbnVtYmVyKTogUHJvbWlzZTxNb25pdG9yaW5nU3Vic2NyaXB0aW9uPiB7XHJcbiAgICAgICAgbGV0IHN1YnNjcmlwdGlvbklkID0gYXdhaXQgT3BjVWFSZXN0U2VydmljZXMuY3JlYXRlU3Vic2NyaXB0aW9uKHNlc3Npb25JZCk7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBNb25pdG9yaW5nU3Vic2NyaXB0aW9uKG9ic2VydmVyLCBzZXNzaW9uSWQsIHN1YnNjcmlwdGlvbklkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlbGV0ZXMgdGhlIHNwZWNpZmllZCBzdWJzY3JpcHRpb25cclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2Vzc2lvbklkXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc3Vic2NyaXB0aW9uSWRcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPG51bWJlcj59XHJcbiAgICAgKiBAbWVtYmVyb2YgTW9uaXRvcmluZ1N1YnNjcmlwdGlvblxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYXN5bmMgZGVsZXRlKHNlc3Npb25JZDogbnVtYmVyLCBzdWJzY3JpcHRpb25JZDogbnVtYmVyKTogUHJvbWlzZTxudW1iZXI+IHtcclxuICAgICAgICByZXR1cm4gYXdhaXQgT3BjVWFSZXN0U2VydmljZXMuZGVsZXRlU3Vic2NyaXB0aW9uKHNlc3Npb25JZCwgc3Vic2NyaXB0aW9uSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY3JlYXRlcyBhIHNldCBvZiBpdGVtcyB0byBiZSBtb25pdG9yZWRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IGNvbXBvbmVudFBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XHJcbiAgICAgKiBAbWVtYmVyb2YgTW9uaXRvcmluZ1N1YnNjcmlwdGlvblxyXG4gICAgICovXHJcbiAgICBhc3luYyBjcmVhdGVNb25pdG9yZWRJdGVtcyhjb21wb25lbnRQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW1bXSk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuXHJcbiAgICAgICAgICAgIGxldCBjbGllbnRJZDpudW1iZXIgPSAwO1xyXG4gICAgICAgICAgICBsZXQgY3JlYXRlTW9uaXRvcmVkSXRlbVJlcXVlc3RzOiBSZXN0UmVxdWVzdEluZm9bXSA9IFtdO1xyXG4gICAgICAgICAgICBsZXQgbW9uaXRvcmVkSXRlbXM6IE1vbml0b3JpbmdTdWJzY3JpcHRpb25JdGVtW10gPSBbXTtcclxuICAgICAgICAgICAgLy8gY3JlYXRlIGEgbW9uaXRvcmVkIGl0ZW0gZm9yIGV2ZXJ5IHBhcmFtZXRlci5cclxuXHJcbiAgICAgICAgICAgIC8vIGJlZ2luIGJhdGNoIG1vZGVcclxuICAgICAgICAgICAgT3BjVWFSZXN0U2VydmljZXMubW9kZSA9IFJlc3RTZXJ2aWNlTW9kZS5CQVRDSDtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29tcG9uZW50UGFyYW1ldGVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBjb25zdCBwYXJhbWV0ZXIgPSBjb21wb25lbnRQYXJhbWV0ZXJzW2ldO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBsZXQgbW9uaXRvckl0ZW0gPSB0aGlzLmFkZE1vbml0b3JpbmdJdGVtKHBhcmFtZXRlciwgT3BjVWFBdHRyaWJ1dGUuVkFMVUUsY2xpZW50SWQpO1xyXG4gICAgICAgICAgICAgICAgbW9uaXRvcmVkSXRlbXMucHVzaChtb25pdG9ySXRlbSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3TW9uaXRvcmVkSXRlbVJlcXVlc3QgPSBhd2FpdCBPcGNVYVJlc3RTZXJ2aWNlcy5jcmVhdGVNb25pdG9yZWRJdGVtKHRoaXMuX3Nlc3Npb25JZCwgdGhpcy5fc3Vic2NyaXB0aW9uSWQsIHBhcmFtZXRlci5pZCwgY2xpZW50SWQsIE9wY1VhUmVzdFNlcnZpY2VzLm1vbml0b3JpbmdTYW1wbGluZ0ludGVydmFsLCBPcGNVYUF0dHJpYnV0ZS5WQUxVRSk7XHJcbiAgICAgICAgICAgICAgICBjcmVhdGVNb25pdG9yZWRJdGVtUmVxdWVzdHMucHVzaChuZXdNb25pdG9yZWRJdGVtUmVxdWVzdCk7XHJcbiAgICAgICAgICAgICAgICBjbGllbnRJZCsrO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBtb25pdG9ySXRlbSA9IHRoaXMuYWRkTW9uaXRvcmluZ0l0ZW0ocGFyYW1ldGVyLCBPcGNVYUF0dHJpYnV0ZS5VU0VSX0FDQ0VTU19MRVZFTCxjbGllbnRJZCk7XHJcbiAgICAgICAgICAgICAgICBtb25pdG9yZWRJdGVtcy5wdXNoKG1vbml0b3JJdGVtKTtcclxuICAgICAgICAgICAgICAgIG5ld01vbml0b3JlZEl0ZW1SZXF1ZXN0ID0gYXdhaXQgT3BjVWFSZXN0U2VydmljZXMuY3JlYXRlTW9uaXRvcmVkSXRlbSh0aGlzLl9zZXNzaW9uSWQsIHRoaXMuX3N1YnNjcmlwdGlvbklkLCBwYXJhbWV0ZXIuaWQsIGNsaWVudElkLCBPcGNVYVJlc3RTZXJ2aWNlcy5tb25pdG9yaW5nU2FtcGxpbmdJbnRlcnZhbCwgT3BjVWFBdHRyaWJ1dGUuVVNFUl9BQ0NFU1NfTEVWRUwpO1xyXG4gICAgICAgICAgICAgICAgY3JlYXRlTW9uaXRvcmVkSXRlbVJlcXVlc3RzLnB1c2gobmV3TW9uaXRvcmVkSXRlbVJlcXVlc3QpO1xyXG4gICAgICAgICAgICAgICAgY2xpZW50SWQrKztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gZW5kIGJhdGNoIG1vZGVcclxuICAgICAgICAgICAgT3BjVWFSZXN0U2VydmljZXMubW9kZSA9IFJlc3RTZXJ2aWNlTW9kZS5FWEVDVVRFO1xyXG5cclxuICAgICAgICAgICAgICBsZXQgY3JlYXRlTW9uaXRvcmVkSXRlbXNSZXN1bHQgPSBhd2FpdCBPcGNVYVJlc3RTZXJ2aWNlcy5jYWxsQmF0Y2hSZXF1ZXN0KGNyZWF0ZU1vbml0b3JlZEl0ZW1SZXF1ZXN0cyk7ICAgXHJcblxyXG4gICAgICAgICAgICAgIGNyZWF0ZU1vbml0b3JlZEl0ZW1zUmVzdWx0LnJlc3BvbnNlcy5mb3JFYWNoKGNyZWF0ZWRNb25pdG9yZWRJdGVtID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIHNldCB0aGUgaXRlbSBpZCBmb3IgdGhlIGNyZWF0ZWQgbW9uaXRvciBpdGVtXHJcbiAgICAgICAgICAgICAgICBtb25pdG9yZWRJdGVtc1tjcmVhdGVkTW9uaXRvcmVkSXRlbS5pZF0uaWQgPSBjcmVhdGVkTW9uaXRvcmVkSXRlbS5ib2R5Lm1vbml0b3JlZEl0ZW1JZDtcclxuICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk1vbml0b3JpbmdTdWJzY3JpcHRpb246Y3JlYXRlTW9uaXRvcmVkSXRlbXM6ICVvXCIsIHRoaXMuX21vbml0b3JpbmdJdGVtcylcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENsZWFycyBhbGwgbW9uaXRvcmVkIGl0ZW1zIGZvciB0aGlzIHN1YnNjcmlwdGlvblxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNb25pdG9yaW5nU3Vic2NyaXB0aW9uXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIGNsZWFyTW9uaXRvcmVkSXRlbXMoKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKCBPYmplY3Qua2V5cyh0aGlzLl9tb25pdG9yaW5nSXRlbXMpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGVsZXRlTW9uaXRvcmVkSXRlbVJlcXVlc3RzOiBhbnlbXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGJlZ2luIGJhdGNoIG1vZGVcclxuICAgICAgICAgICAgICAgIE9wY1VhUmVzdFNlcnZpY2VzLm1vZGUgPSBSZXN0U2VydmljZU1vZGUuQkFUQ0g7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBPYmplY3Qua2V5cyh0aGlzLl9tb25pdG9yaW5nSXRlbXMpLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbW9uaXRvcmVJdGVtID0gdGhpcy5fbW9uaXRvcmluZ0l0ZW1zW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkZWxldGVNb25pdG9yZWRJdGVtUmVxdWVzdCA9ICBPcGNVYVJlc3RTZXJ2aWNlcy5kZWxldGVNb25pdG9yZWRJdGVtKHRoaXMuX3Nlc3Npb25JZCwgdGhpcy5fc3Vic2NyaXB0aW9uSWQsIG1vbml0b3JlSXRlbS5pZCk7ICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZU1vbml0b3JlZEl0ZW1SZXF1ZXN0cy5wdXNoKGRlbGV0ZU1vbml0b3JlZEl0ZW1SZXF1ZXN0KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiU3Vic2NyaXB0aW9uOiBDb3VsZCBub3QgZGVsZXRlIG1vbml0b3JlZCBpdGVtICVvICVvXCIsbW9uaXRvcmVJdGVtLmlkLHRoaXMuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnJlbW92ZU1vbml0b3JpbmdJdGVtKGkpOyAgXHJcbiAgICAgICAgICAgICAgICB9ICBcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBlbmQgYmF0Y2ggbW9kZVxyXG4gICAgICAgICAgICAgICAgT3BjVWFSZXN0U2VydmljZXMubW9kZSA9IFJlc3RTZXJ2aWNlTW9kZS5FWEVDVVRFO1xyXG5cclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgT3BjVWFSZXN0U2VydmljZXMuY2FsbEJhdGNoUmVxdWVzdChkZWxldGVNb25pdG9yZWRJdGVtUmVxdWVzdHMpOyAgIFxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgT2JqZWN0LmtleXModGhpcy5fbW9uaXRvcmluZ0l0ZW1zKS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnJlbW92ZU1vbml0b3JpbmdJdGVtKGkpOyAgXHJcbiAgICAgICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBhZGRzIGEgbmV3IG1vbml0b3JpbmcgaXRlbS5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW19IHBhcmFtZXRlclxyXG4gICAgICogQHBhcmFtIHtPcGNVYUF0dHJpYnV0ZX0gbW9uaXRvcmluZ0F0dHJpYnV0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGNsaWVudElkXHJcbiAgICAgKiBAcmV0dXJucyB7TW9uaXRvcmluZ1N1YnNjcmlwdGlvbkl0ZW19XHJcbiAgICAgKiBAbWVtYmVyb2YgTW9uaXRvcmluZ1N1YnNjcmlwdGlvblxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZE1vbml0b3JpbmdJdGVtKHBhcmFtZXRlcjogTWFwcENvY2twaXRDb21wb25lbnRJdGVtLCBtb25pdG9yaW5nQXR0cmlidXRlOiBPcGNVYUF0dHJpYnV0ZSwgY2xpZW50SWQ6bnVtYmVyKTpNb25pdG9yaW5nU3Vic2NyaXB0aW9uSXRlbSB7XHJcbiAgICAgICAgbGV0IG1vbml0b3JJdGVtID0gTW9uaXRvcmluZ1N1YnNjcmlwdGlvbkl0ZW0uY3JlYXRlKHBhcmFtZXRlciwgbW9uaXRvcmluZ0F0dHJpYnV0ZSxjbGllbnRJZCk7XHJcbiAgICAgICAgdGhpcy5fbW9uaXRvcmluZ0l0ZW1zW2NsaWVudElkXSA9IG1vbml0b3JJdGVtO1xyXG4gICAgICAgIHJldHVybiBtb25pdG9ySXRlbTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIGEgbW9uaXRvcmVkIGl0ZW1cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGNsaWVudElkXHJcbiAgICAgKiBAbWVtYmVyb2YgTW9uaXRvcmluZ1N1YnNjcmlwdGlvblxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlbW92ZU1vbml0b3JpbmdJdGVtKGNsaWVudElkOiBudW1iZXIpe1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLl9tb25pdG9yaW5nSXRlbXNbY2xpZW50SWRdOyAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBoYW5kbGVzIHRoZSBwcm9jZXNzaW5nIG9mIGl0ZW0gY2hhbmdlc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SU9wY1VhRGF0YUNoYW5nZWR9IG9wY1VhRGF0YUNoYW5nZWRJbmZvXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNb25pdG9yaW5nU3Vic2NyaXB0aW9uXHJcbiAgICAgKi9cclxuICAgIHByb2Nlc3NJdGVtQ2hhbmdlcyhvcGNVYURhdGFDaGFuZ2VkSW5mbzogSU9wY1VhRGF0YUNoYW5nZWQpOiBhbnkge1xyXG4gICAgICAgIGxldCBjaGFuZ2VkT2JzZXJ2YWJsZXMgPSBuZXcgQXJyYXk8T2JzZXJ2YWJsZT4oKTtcclxuICAgICAgICBvcGNVYURhdGFDaGFuZ2VkSW5mby5EYXRhTm90aWZpY2F0aW9ucy5mb3JFYWNoKGRhdGFOb3RpZmljYXRpb24gPT4ge1xyXG4gICAgICAgICAgICAvLyBnZXQgdGhlIGl0ZW0gdG8gY2hhbmdlXHJcbiAgICAgICAgICAgIGxldCBtb25pdG9ySXRlbSA9IHRoaXMuZ2V0TW9uaXRvcmVkSXRlbUJ5SWQoZGF0YU5vdGlmaWNhdGlvbi5jbGllbnRIYW5kbGUpO1xyXG4gICAgICAgICAgICBpZiAobW9uaXRvckl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgaXRlbXMgdmFsdWVcclxuICAgICAgICAgICAgICAgIG1vbml0b3JJdGVtLmNoYW5nZVZhbHVlKGRhdGFOb3RpZmljYXRpb24udmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgLy8gYWRkIGl0IHRvIHRoZSBtb2RpZmllZCBvYnNlcnZhYmxlcyBsaXN0XHJcbiAgICAgICAgICAgICAgICBjaGFuZ2VkT2JzZXJ2YWJsZXMucHVzaChuZXcgT2JzZXJ2YWJsZShtb25pdG9ySXRlbS5tb25pdG9yaW5nT2JqZWN0LG1vbml0b3JJdGVtLm1vbml0b3JpbmdQcm9wZXJ0eSkpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNYXBwQ29ja3BpdERpYWdub3N0aWNNb25pdG9yaW5nUHJvdmlkZXIucHJvY2Vzc09wY1VhRGF0YUNoYW5nZWQ6IENvdWxkIG5vdCBmaW5kIG1vbml0b3JlZCBpdGVtICcgKyBKU09OLnN0cmluZ2lmeShkYXRhTm90aWZpY2F0aW9uKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLm9uTW9uaXRvckl0ZW1zQ2hhbmdlZCh0aGlzLCBjaGFuZ2VkT2JzZXJ2YWJsZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbm90aWZpZXMgZnJvbSB1cGRhdGVpbmcgb2JzZXJ2ZWQgaXRlbXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01vbml0b3JpbmdTdWJzY3JpcHRpb259IGNoYW5nZWRTdWJzY3JpcHRpb25cclxuICAgICAqIEBwYXJhbSB7T2JzZXJ2YWJsZVtdfSBjaGFuZ2VkT2JzZXJ2YWJsZXNcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1vbml0b3JpbmdTdWJzY3JpcHRpb25cclxuICAgICAqL1xyXG4gICAgb25Nb25pdG9ySXRlbXNDaGFuZ2VkKGNoYW5nZWRTdWJzY3JpcHRpb246IE1vbml0b3JpbmdTdWJzY3JpcHRpb24sIGNoYW5nZWRPYnNlcnZhYmxlczogT2JzZXJ2YWJsZVtdKTogYW55IHtcclxuICAgICAgICBsZXQgY2hhbmdlZEV2ZW50QXJncyA9IG5ldyBFdmVudE9ic2VydmVkSXRlbXNDaGFuZ2VkQXJncyhjaGFuZ2VkU3Vic2NyaXB0aW9uLm9ic2VydmVyLCBjaGFuZ2VkU3Vic2NyaXB0aW9uLCBjaGFuZ2VkT2JzZXJ2YWJsZXMgYXMgW10pO1xyXG4gICAgICAgIHRoaXMuZXZlbnRPYnNlcnZlZEl0ZW1zQ2hhbmdlZC5yYWlzZSh0aGlzLCBjaGFuZ2VkRXZlbnRBcmdzKTtcclxuICAgICAgICB0aGlzLm5vdGlmeU9ic2VydmVyRnJvbUNoYW5nZXMoY2hhbmdlZFN1YnNjcmlwdGlvbi5vYnNlcnZlcixjaGFuZ2VkT2JzZXJ2YWJsZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbm90aWZpZXMgdGhlIG9ic2VydmVyIGZyb20gY2hhbmdlcyBpZiB0aGUgb2JzZXJ2ZXIgaW1wbGVtZW50cyB0aGUgbm90aWZpY2F0aW9uIGludGVyZmFjZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0lPYnNlcnZlcn0gb2JzZXJ2ZXJcclxuICAgICAqIEBwYXJhbSB7T2JzZXJ2YWJsZXNbXX0gY2hhbmdlZE9ic2VydmFibGVzXHJcbiAgICAgKiBAbWVtYmVyb2YgTW9uaXRvcmluZ1N1YnNjcmlwdGlvblxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG5vdGlmeU9ic2VydmVyRnJvbUNoYW5nZXMob2JzZXJ2ZXI6IElPYnNlcnZlciwgY2hhbmdlZE9ic2VydmFibGVzOiBPYnNlcnZhYmxlW10pIHtcclxuICAgICAgICBpZihvYnNlcnZlci5vbk9ic2VydmFibGVzQ2hhbmdlZCl7XHJcbiAgICAgICAgICAgIG9ic2VydmVyLm9uT2JzZXJ2YWJsZXNDaGFuZ2VkKGNoYW5nZWRPYnNlcnZhYmxlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogVGhlIGNsYXNzIGhvbGRzIGluZm9ybWF0aW9uIGFib3V0IHRoZSBzdWJzcmlwdGVkIGl0ZW1cclxuICpcclxuICogQGNsYXNzIE1vbml0b3JpbmdTdWJzY3JpcHRpb25JdGVtXHJcbiAqL1xyXG5jbGFzcyBNb25pdG9yaW5nU3Vic2NyaXB0aW9uSXRlbSB7XHJcblxyXG4gICAgLy8gaG9sZHMgdGhlIGl0ZW0gaW5zdGFuY2VcclxuICAgIHByaXZhdGUgX21vbml0b3JJdGVtSW5zdGFuY2U6IGFueSA9IHVuZGVmaW5lZDtcclxuICAgIC8vIGhvbGRzIHRoZSBwcm9wZXJ0eSBuYW1lIG9mIHRoZSBpdGVtIHRvIHdhdGNoXHJcbiAgICBwcml2YXRlIF9tb25pdG9yaW5nUHJvcGVydHk6IGFueSA9IFwiXCI7XHJcbiAgICAvLyBob2xkcyB0aGUgbW9uaXRvciBpdGVtIGlkXHJcbiAgICBwcml2YXRlIF9pZDogc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgTW9uaXRvcmluZ1N1YnNjcmlwdGlvbkl0ZW0uXHJcbiAgICAgKiBAcGFyYW0geyp9IG1vbml0b3JpbmdPYmplY3RcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtb25pdG9yaW5nUHJvcGVydHlcclxuICAgICAqIEBtZW1iZXJvZiBNb25pdG9yaW5nU3Vic2NyaXB0aW9uSXRlbVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihtb25pdG9yaW5nT2JqZWN0OiBhbnksIG1vbml0b3JpbmdQcm9wZXJ0eTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fbW9uaXRvckl0ZW1JbnN0YW5jZSA9IG1vbml0b3JpbmdPYmplY3Q7XHJcbiAgICAgICAgdGhpcy5fbW9uaXRvcmluZ1Byb3BlcnR5ID0gbW9uaXRvcmluZ1Byb3BlcnR5O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgbW9uaXRvcmluZ09iamVjdCgpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tb25pdG9ySXRlbUluc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgbW9uaXRvcmluZ1Byb3BlcnR5KCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21vbml0b3JpbmdQcm9wZXJ0eTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGlkKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgaWQoaWQ6c3RyaW5nKXtcclxuICAgICAgICB0aGlzLl9pZCA9IGlkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY3JlYXRlcyBhbmQgaW5pdGlhbGl6ZXMgYSBuZXcgbW9uaXRvcmluZyBpdGVtXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW19IG1vbml0b3JpbmdPYmplY3RcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtb25pdG9yaW5nUHJvcGVydHlcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjbGllbnRJZFxyXG4gICAgICogQHJldHVybnMge01vbml0b3JpbmdTdWJzY3JpcHRpb25JdGVtfVxyXG4gICAgICogQG1lbWJlcm9mIE1vbml0b3JpbmdTdWJzY3JpcHRpb25JdGVtXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBjcmVhdGUobW9uaXRvcmluZ09iamVjdDogTWFwcENvY2twaXRDb21wb25lbnRJdGVtLCBtb25pdG9yaW5nUHJvcGVydHk6IHN0cmluZywgY2xpZW50SWQ6bnVtYmVyKTogTW9uaXRvcmluZ1N1YnNjcmlwdGlvbkl0ZW0ge1xyXG4gICAgICAgIHJldHVybiBuZXcgTW9uaXRvcmluZ1N1YnNjcmlwdGlvbkl0ZW0obW9uaXRvcmluZ09iamVjdCwgbW9uaXRvcmluZ1Byb3BlcnR5KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIHNwZWNpZmllZCBpdGVtIHByb3BlcnR5IHdpdGggdGhlIG5ldyB2YWx1ZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gbmV3TW9uaXRvcmVkSXRlbVZhbHVlXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNb25pdG9yaW5nU3Vic2NyaXB0aW9uSXRlbVxyXG4gICAgICovXHJcbiAgICBjaGFuZ2VWYWx1ZShuZXdNb25pdG9yZWRJdGVtVmFsdWU6IGFueSk6IGFueSB7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLm1vbml0b3JpbmdQcm9wZXJ0eSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiVmFsdWVcIjpcclxuICAgICAgICAgICAgICAgIC8vIHNldCBvYmplY3QgdmFsdWVcclxuICAgICAgICAgICAgICAgIHRoaXMubW9uaXRvcmluZ09iamVjdC52YWx1ZSA9IG5ld01vbml0b3JlZEl0ZW1WYWx1ZTsgXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIlVzZXJBY2Nlc3NMZXZlbFwiOlxyXG4gICAgICAgICAgICAgICAgLy8gc2V0IHdyaXRlYWJsZSBhdHRyaWJ1dGUgYWNjb3JkaW5nIHRvIHRoZSBhY2Nlc3MgbGV2ZWxcclxuICAgICAgICAgICAgICAgIGxldCBuZXdXcml0ZWFibGVTdGF0ZSA9IChuZXdNb25pdG9yZWRJdGVtVmFsdWUgJiBPcGNVYUFjY2Vzc0xldmVsLkN1cnJlbnRXcml0ZSkgPT0gT3BjVWFBY2Nlc3NMZXZlbC5DdXJyZW50V3JpdGU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vbml0b3JpbmdPYmplY3QuaXNXcml0ZWFibGUudmFsdWUgPSBuZXdXcml0ZWFibGVTdGF0ZTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTW9uaXRvcmluZ1N1YnNjcmlwdGlvbkl0ZW0gLSB1cGRhdGVkIHdyaXRlYWJsZSAlbyAlb1wiLCB0aGlzLm1vbml0b3JpbmdPYmplY3QuYnJvd3NlTmFtZSArIFwiLmlzV3JpdGVhYmxlID0gXCIsIHRoaXMubW9uaXRvcmluZ09iamVjdC5pc1dyaXRlYWJsZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgTWFwcENvY2twaXREaWFnbm9zdGljTW9uaXRvcmluZ1Byb3ZpZGVyLCBFdmVudE9ic2VydmVkSXRlbXNDaGFuZ2VkQXJncyB9OyJdfQ==