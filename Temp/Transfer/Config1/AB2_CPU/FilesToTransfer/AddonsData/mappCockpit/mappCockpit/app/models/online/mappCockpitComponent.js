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
define(["require", "exports", "../../libs/math/mathjs", "../../framework/property", "../../framework/command", "./mappCockpitComponentReflection", "../../common/numericHelper", "../../widgets/methodParameterListWidget/methodFilter"], function (require, exports, math, property_1, command_1, mappCockpitComponentReflection_1, numericHelper_1, methodFilter_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Implements the base memebers for managing component model members.
     *
     * @class MappCockpitComponentItem
    /**
     *
     *
     * @class MappCockpitComponentItem
     */
    var MappCockpitComponentItem = /** @class */ (function () {
        /**
         * creates an instance of MappCockpitComponentItem.
         * @param {MappCockpitComponentItem} component
         * @param {string} name
         * @param {*} reference
         * @memberof MappCockpitComponentItem
         */
        function MappCockpitComponentItem(component, name, reference) {
            // Holds the items value
            // protected _value: any = "";
            // holds subitems if any
            this._items = [];
            this._valueSource = property_1.Property.create("");
            // holds the user roles
            this._writeAccess = property_1.Property.create(false);
            // specifies a response delaget for write requets
            this._reflectedWriteResponseDelegate = undefined;
            this._reference = reference;
            this._displayName = name;
            this._component = component;
        }
        Object.defineProperty(MappCockpitComponentItem.prototype, "displayName", {
            /**
             * Returns the items display name
             *
             * @readonly
             * @type {string}
             * @memberof MappCockpitComponentItem
             */
            get: function () {
                return this._displayName;
            },
            set: function (displayName) {
                this._displayName = displayName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentItem.prototype, "browseName", {
            get: function () {
                return this._reference.browseName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentItem.prototype, "name", {
            get: function () {
                return this._reference.name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentItem.prototype, "component", {
            get: function () {
                return this._component;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentItem.prototype, "writeAccess", {
            /**
             * Gets the current user roles
             *
             * @readonly
             * @type {string[]}
             * @memberof MappCockpitComponentDataModel
             */
            get: function () {
                return this._writeAccess;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentItem.prototype, "id", {
            /**
             * Returns the items id
             *
             * @readonly
             * @type {string}
             * @memberof MappCockpitComponentItem
             */
            get: function () {
                return this._reference.nodeId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentItem.prototype, "value", {
            /**
             * sets/gets the items value object
             *
             * @readonly
             * @type {(MappCockpitComponentParameterValue|undefined)}
             * @memberof MappCockpitComponentParameter
             */
            get: function () {
                return this._valueSource.value;
            },
            set: function (value) {
                this._valueSource.value = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentItem.prototype, "valueSource", {
            get: function () {
                return this._valueSource;
            },
            set: function (valueSource) {
                this._valueSource = valueSource;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentItem.prototype, "reflectedWriteResponseDelegate", {
            /**
             * Gets the delegate for observing write respomses
             *
             * @memberof MappCockpitComponentItem
             */
            get: function () {
                return this._reflectedWriteResponseDelegate;
            },
            /**
             * Sets a delegate for observing write responses
             *
             * @memberof MappCockpitComponentItem
             */
            set: function (reflectedWriteResponseDelegate) {
                this._reflectedWriteResponseDelegate = reflectedWriteResponseDelegate;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentItem.prototype, "displayValue", {
            /**
             * gets the value as formatted string if appropiate
             *
             * @type {*}
             * @memberof MappCockpitComponentItem
             */
            get: function () {
                return this._valueSource.toString();
            },
            set: function (inputValue) {
                this._valueSource.value = inputValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentItem.prototype, "dataTypeId", {
            get: function () {
                return this._reference.dataType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentItem.prototype, "items", {
            /**
             * gets the subitems if any
             *
             * @readonly
             * @type {Array<MappCockpitComponentItem>}
             * @memberof MappCockpitComponentItem
             */
            get: function () {
                return this._items;
            },
            enumerable: true,
            configurable: true
        });
        return MappCockpitComponentItem;
    }());
    exports.MappCockpitComponentItem = MappCockpitComponentItem;
    /**
     * The class represents a component to be used within mapp cockpit UI
     *
     * @class MappCockpitComponent
     */
    var MappCockpitComponent = /** @class */ (function (_super) {
        __extends(MappCockpitComponent, _super);
        function MappCockpitComponent() {
            /**
             * Holds the component methods
             *
             * @protected
             * @type {Array<MappCockpitComponentMethod>}
             * @memberof MappCockpitComponent
             */
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // Holds the component methods
            _this._methods = [];
            _this._quickCommands = [];
            _this._userMethods = [];
            // Holds the component parameters
            _this._parameters = [];
            _this._watchableParameters = [];
            _this._watchableStateParameters = [];
            _this._configurationParameters = [];
            _this._messageParameters = [];
            _this._metaData = undefined;
            _this._parametersSource = property_1.Property.create([], function (dataLink) { _this.requestReadComponentParameters(dataLink); });
            _this._messageParametersSource = property_1.Property.create([], function (dataLink) { _this.requestReadComponentParameters(dataLink); });
            _this._watchableParametersSource = property_1.Property.create([], function (dataLink) { _this.requestReadComponentParameters(dataLink); });
            _this._configurationParametersSource = property_1.Property.create([], function (dataLink) { _this.requestReadComponentParameters(dataLink); });
            _this._methodsSource = property_1.Property.create([], function (dataLink) { _this.requestReadComponentMethods(dataLink); });
            _this._commandConnect = command_1.Command.create(_this, _this.executeCommandConnect());
            return _this;
        }
        Object.defineProperty(MappCockpitComponent.prototype, "commandConnectComponent", {
            /**
             * sets/gets the parameters of the component
             *
             * @readonly
             * @type {Array<MappCockpitComponentParameter>}
             * @memberof MappCockpitComponent
             */
            get: function () {
                return this._commandConnect;
            },
            enumerable: true,
            configurable: true
        });
        MappCockpitComponent.prototype.executeCommandConnect = function () {
            var _this = this;
            return function (commandPars, commandResponse) { return __awaiter(_this, void 0, void 0, function () {
                var model, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            model = this.model;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 5]);
                            if (!model) return [3 /*break*/, 3];
                            // read parameter component set
                            return [4 /*yield*/, model.browseComponent(this)];
                        case 2:
                            // read parameter component set
                            _a.sent();
                            // intitially update the components access rights
                            this.updateComponentAccessRights(model);
                            // watch access right changes
                            this.observeComponentAccessRights(model);
                            // update the data link
                            commandResponse.executed();
                            _a.label = 3;
                        case 3: return [3 /*break*/, 5];
                        case 4:
                            error_1 = _a.sent();
                            commandResponse.rejected(error_1);
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            }); };
        };
        /**
         * Observes changes of the access rights
         *
         * @private
         * @param {MappCockpitComponentDataModel} mainModel
         * @memberof MappCockpitComponent
         */
        MappCockpitComponent.prototype.observeComponentAccessRights = function (mainModel) {
            var _this = this;
            mainModel.userRoles.changed(function (userRoles) {
                _this.updateComponentAccessRights(mainModel);
            });
        };
        /**
         * Updates the componentrs access rights
         *
         * @private
         * @param {MappCockpitComponentDataModel} mainModel
         * @memberof MappCockpitComponent
         */
        MappCockpitComponent.prototype.updateComponentAccessRights = function (mainModel) {
            var writeAccess = mainModel.writeAccess;
            console.log("user roles changed %o write access =%o", mainModel.userRoles.value, writeAccess);
            this.updateComponentMemberAccessRights(writeAccess);
            this.writeAccess.value = writeAccess;
        };
        /**
         * Updates the access rights of component members
         *
         * @param {boolean} writeAccess
         * @returns {*}
         * @memberof MappCockpitComponent
         */
        MappCockpitComponent.prototype.updateComponentMemberAccessRights = function (writeAccess) {
            this.updateParameterAccessRights(writeAccess);
            this.updateMethodsAccessRights(writeAccess);
        };
        /**
         * Updates the parameters access rights
         *
         * @private
         * @memberof MappCockpitComponent
         */
        MappCockpitComponent.prototype.updateParameterAccessRights = function (writeAccess) {
            this.parameters.forEach(function (parameter) {
                // rewrite the parameters write access property with its original raw value to force triggering the changed event. This is just a workaround
                // to fix the log in/out problem displaying wrong readonly states.
                // the workaround is intended to be replaced by proper batch refresh requests!
                parameter.isWriteable.value = parameter.isWriteable._value;
            });
        };
        /**
         * Updates the methods access rights
         *
         * @returns {*}
         * @memberof MappCockpitComponent
         */
        MappCockpitComponent.prototype.updateMethodsAccessRights = function (writeAccess) {
            var _this = this;
            this.methods.forEach(function (method) {
                method.isExecutable.value = (writeAccess && method.expression) ? method.getEnabledState(_this.watchableParameters) : writeAccess;
            });
        };
        Object.defineProperty(MappCockpitComponent.prototype, "methods", {
            /**
             * sets/gets the parameters of the component
             *
             * @readonly
             * @type {Array<MappCockpitComponentParameter>}
             * @memberof MappCockpitComponent
             */
            get: function () {
                return this._methods;
            },
            set: function (methods) {
                this._methods = methods;
                this._methodsSource.value = this._methods;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponent.prototype, "methodsSource", {
            get: function () {
                return this._methodsSource;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponent.prototype, "quickCommands", {
            get: function () {
                return this._quickCommands;
            },
            set: function (quickCommands) {
                this._quickCommands = quickCommands;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponent.prototype, "userMethods", {
            get: function () {
                return this._userMethods;
            },
            set: function (methods) {
                this._userMethods = methods;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponent.prototype, "parameters", {
            /**
             * sets/gets the parameters of the component
             *
             * @readonly
             * @type {Array<MappCockpitComponentParameter>}
             * @memberof MappCockpitComponent
             */
            get: function () {
                return this._parameters;
            },
            set: function (parameters) {
                this._parameters = parameters;
                this._parametersSource.value = this._parameters;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponent.prototype, "watchableParameters", {
            get: function () {
                return this._watchableParameters;
            },
            set: function (parameters) {
                this._watchableParameters = parameters;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponent.prototype, "watchableStateParameters", {
            get: function () {
                return this._watchableStateParameters;
            },
            set: function (parameters) {
                this._watchableStateParameters = parameters;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponent.prototype, "messageParameters", {
            get: function () {
                return this._messageParameters;
            },
            set: function (parameters) {
                this._messageParameters = parameters;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponent.prototype, "configurationParameters", {
            get: function () {
                return this._configurationParameters;
            },
            set: function (parameters) {
                this._configurationParameters = parameters;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponent.prototype, "parametersSource", {
            get: function () {
                return this._parametersSource;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponent.prototype, "messageParametersSource", {
            get: function () {
                // filter the watchables and update the watchables parameter list
                this._messageParametersSource.value = this._messageParameters;
                return this._messageParametersSource;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponent.prototype, "watchableParametersSource", {
            get: function () {
                // filter the watchables and update the watchables parameter list
                this._watchableParametersSource.value = this._watchableParameters;
                return this._watchableParametersSource;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponent.prototype, "configurationParametersSource", {
            get: function () {
                this._configurationParametersSource.value = this._configurationParameters;
                return this._configurationParametersSource;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * refreshes the components parameter list
         *
         * @private
         * @param {Property<MappCockpitComponentParameter[]>} dataLink
         * @returns {*}
         * @memberof MappCockpitComponent
         */
        MappCockpitComponent.prototype.requestReadComponentParameters = function (dataLink) {
            return __awaiter(this, void 0, void 0, function () {
                var componentParameters, model, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            componentParameters = [];
                            model = this.model;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 5]);
                            if (!model) return [3 /*break*/, 3];
                            return [4 /*yield*/, model.browseParameters(this)];
                        case 2:
                            // read parameter component set
                            componentParameters = _a.sent();
                            // update the data link
                            dataLink.readRequestExecuted(componentParameters);
                            _a.label = 3;
                        case 3: return [3 /*break*/, 5];
                        case 4:
                            error_2 = _a.sent();
                            dataLink.readRequestRejected(error_2);
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/, componentParameters];
                    }
                });
            });
        };
        /**
         * Refreshes the components methods
         *
         * @param {Property<MappCockpitComponentMethod[]>} dataLink
         * @returns {*}
         * @memberof MappCockpitComponent
         */
        MappCockpitComponent.prototype.requestReadComponentMethods = function (dataLink) {
            return __awaiter(this, void 0, void 0, function () {
                var componentMethods, model, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            componentMethods = [];
                            model = this.model;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 5]);
                            if (!model) return [3 /*break*/, 3];
                            return [4 /*yield*/, model.browseMethods(this)];
                        case 2:
                            // read parameter component set
                            componentMethods = _a.sent();
                            // update the data link
                            dataLink.readRequestExecuted(componentMethods);
                            _a.label = 3;
                        case 3: return [3 /*break*/, 5];
                        case 4:
                            error_3 = _a.sent();
                            dataLink.readRequestRejected(error_3);
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/, componentMethods];
                    }
                });
            });
        };
        Object.defineProperty(MappCockpitComponent.prototype, "metaData", {
            /**
             *  gets the meta data of a component
             *
             * @type {*}
             * @memberof MappCockpitComponent
             */
            get: function () {
                return this._metaData;
            },
            set: function (metaData) {
                this._metaData = metaData;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Registers or marks the component as user component
         *
         * @static
         * @param {MappCockpitComponent} component
         * @returns {*}
         * @memberof MappCockpitComponent
         */
        MappCockpitComponent.registerUserComponent = function (component) {
            component.isUserComponent = true;
        };
        /**
         * Determines if the component is a user component
         *
         * @static
         * @param {MappCockpitComponent} component
         * @returns {boolean}
         * @memberof MappCockpitComponent
         */
        MappCockpitComponent.isUserComponent = function (component) {
            return component.isUserComponent;
        };
        return MappCockpitComponent;
    }(MappCockpitComponentItem));
    exports.MappCockpitComponent = MappCockpitComponent;
    /**
     * The class implements method access.
     *
     * @class MappCockpitComponentMethod
     */
    var MappCockpitComponentMethod = /** @class */ (function (_super) {
        __extends(MappCockpitComponentMethod, _super);
        function MappCockpitComponentMethod() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // Holds the method parameters
            _this._inputParameters = [];
            _this._isBrowsed = false;
            // specefies if the method is executable
            _this._isExecutable = property_1.Property.create(false, undefined, undefined, function (value) { return _this.methodIsExecutable(value); });
            return _this;
        }
        Object.defineProperty(MappCockpitComponentMethod.prototype, "inputParameters", {
            /**
             * Returns the input parameters of the method
             *
             * @readonly
             * @type {Array<MappCockpitMethodParameter>}
             * @memberof MappCockpitComponentMethod
             */
            get: function () {
                return this._inputParameters;
            },
            set: function (value) {
                this._inputParameters = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentMethod.prototype, "isBrowsed", {
            get: function () {
                return this._isBrowsed;
            },
            set: function (isBrowsed) {
                this._isBrowsed = isBrowsed;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Invokes the execution of the component method
         *
         * @static
         * @param {MappCockpitComponentMethod} componentMethod
         * @returns {*}
         * @memberof MappCockpitComponentMethod
         */
        MappCockpitComponentMethod.execute = function (componentMethod) {
            return __awaiter(this, void 0, void 0, function () {
                var model;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            model = componentMethod.component.model;
                            if (!(model && model.executeComponentMethod)) return [3 /*break*/, 2];
                            return [4 /*yield*/, model.executeComponentMethod(componentMethod)];
                        case 1: 
                        // invoke the execution of the method
                        return [2 /*return*/, _a.sent()];
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Finds a method by name
         *
         * @static
         * @param {string} methodName
         * @param {(MappCockpitComponentMethod[]|undefined)} componentMethods
         * @param {boolean} [includeInternals=true]
         * @returns {MappCockpitComponentMethod|undefined}
         * @memberof MappCockpitComponentMethod
         */
        MappCockpitComponentMethod.find = function (methodName, componentMethods, includeInternals) {
            if (includeInternals === void 0) { includeInternals = true; }
            var method = undefined;
            if (componentMethods) {
                var model = componentMethods[0].component.model;
                if (model) {
                    // get the executable methods
                    var executableMethods = includeInternals ? componentMethods[0].component.methods : componentMethods;
                    var matchingMethods = executableMethods.filter(function (method) { return method.browseName === methodName; });
                    if (matchingMethods.length === 1) {
                        // call the requested method
                        method = matchingMethods[0];
                    }
                }
            }
            return method;
        };
        Object.defineProperty(MappCockpitComponentMethod.prototype, "expression", {
            get: function () {
                return this._expression;
            },
            set: function (expression) {
                this._expression = expression;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Gets enabled state according to method expression at initialization or when user has been changed.
         *
         * @param {MappCockpitComponentParameter[]} watchableParameters
         * @returns {boolean}
         * @memberof MappCockpitComponentMethod
         */
        MappCockpitComponentMethod.prototype.getEnabledState = function (watchableParameters) {
            var _this = this;
            var expression = this.expression;
            var watchablesInitialized = true;
            watchableParameters.forEach(function (watchable) {
                if (_this.expression.includes(watchable.browseName) && watchablesInitialized) {
                    if (watchable.value != "") {
                        expression = expression.replace(new RegExp(watchable.browseName, 'g'), watchable.value);
                    }
                    // If watchable.value is not yet defined, we initialized expression to true
                    else {
                        watchablesInitialized = false;
                        expression = "true";
                    }
                }
            });
            return math.evaluate(expression);
        };
        Object.defineProperty(MappCockpitComponentMethod.prototype, "isExecutable", {
            /**
             * Gets if the method is executable
             *
             * @readonly
             * @type {Property<boolean>}
             * @memberof MappCockpitComponentMethod
             */
            get: function () {
                return this._isExecutable;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Determines if the methid is executable
         *
         * @param {boolean} executable
         * @returns {*}
         * @memberof MappCockpitComponentMethod
         */
        MappCockpitComponentMethod.prototype.methodIsExecutable = function (executable) {
            var isExecutableValue = executable;
            var model = this.component.model;
            if (model && this.component) {
                // enable method execution for non user components
                isExecutableValue = MappCockpitComponent.isUserComponent(this.component) ? isExecutableValue : true;
            }
            return isExecutableValue;
        };
        /**
         * Updates the methods input parameters
         *
         * @static
         * @param {MappCockpitComponentMethod} componentMethod
         * @returns {Promise<MappCockpitMethodParameter[]>}
         * @memberof MappCockpitComponentMethod
         */
        MappCockpitComponentMethod.updateInputParameters = function (componentMethod) {
            return __awaiter(this, void 0, void 0, function () {
                var model;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            model = componentMethod.component.model;
                            if (!(model && model.executeComponentMethod)) return [3 /*break*/, 2];
                            if (!(componentMethod.isBrowsed === false)) return [3 /*break*/, 2];
                            return [4 /*yield*/, model.browseMethodInputParameters(componentMethod)];
                        case 1:
                            _a.sent();
                            mappCockpitComponentReflection_1.MappCockpitComponentMethodInfo.updateMethodInputParameters(componentMethod);
                            _a.label = 2;
                        case 2: return [2 /*return*/, componentMethod.inputParameters];
                    }
                });
            });
        };
        /**
         * Update filter status for each parameter
         *
         * @static
         * @param {MappCockpitComponentMethod} method
         * @memberof MappCockpitComponentMethod
         */
        MappCockpitComponentMethod.updateFilter = function (method) {
            method.inputParameters.forEach(function (parameter) {
                if (parameter.filter.parameterRef !== undefined) {
                    var paramValue = MappCockpitComponentMethod.getValueFromParameterRef(method, parameter.filter.parameterRef);
                    if (MappCockpitComponentMethod.isRefValueMatching(paramValue, parameter.filter.parameterValues)) {
                        parameter.filter.active = false;
                    }
                    else {
                        parameter.filter.active = true;
                    }
                }
            });
        };
        /**
         * Get value from connected parameter
         *
         * @private
         * @static
         * @param {MappCockpitComponentMethod} method
         * @param {string} reference
         * @returns {string}
         * @memberof MappCockpitComponentMethod
         */
        MappCockpitComponentMethod.getValueFromParameterRef = function (method, reference) {
            var value = '';
            method.inputParameters.forEach(function (parameter) {
                if (parameter.name == reference) {
                    value = parameter.value;
                }
            });
            return value;
        };
        /**
         * Checks if the actual value from the connected parameter matches the value from the metaConfiguration
         *
         * @private
         * @static
         * @param {string} value
         * @param {(string[] | undefined)} parameterValues
         * @returns {boolean}
         * @memberof MappCockpitComponentMethod
         */
        MappCockpitComponentMethod.isRefValueMatching = function (value, parameterValues) {
            var isValueMatching = false;
            parameterValues.forEach(function (paramValue) {
                if (value == paramValue) {
                    isValueMatching = true;
                }
            });
            return isValueMatching;
        };
        /**
         * Just return input parameters with filter active status = false
         *
         * @static
         * @param {MappCockpitMethodParameter[]} parameters
         * @returns {MappCockpitMethodParameter[]}
         * @memberof MappCockpitComponentMethod
         */
        MappCockpitComponentMethod.updateInputParametersVisibility = function (parameters) {
            var inputParameters = parameters.filter(function (parameter) { return parameter.filter.active === false; });
            return inputParameters;
        };
        return MappCockpitComponentMethod;
    }(MappCockpitComponentItem));
    exports.MappCockpitComponentMethod = MappCockpitComponentMethod;
    var MappCockpitParameter = /** @class */ (function (_super) {
        __extends(MappCockpitParameter, _super);
        function MappCockpitParameter() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // Holds the parameters type
            _this._dataType = new MappCockpitParameterDataType();
            _this._enumRef = new MappCockpitComponentParameterEnum(null);
            _this._engineeringUnit = "";
            _this._isWriteable = property_1.Property.create(false, undefined, undefined, function (value) { return _this.parameterIsWritable(value); });
            return _this;
        }
        Object.defineProperty(MappCockpitParameter.prototype, "dataType", {
            /**
             * Returns the parameters value object
             *
             * @readonly
             * @type {(MappCockpitParameterDataType)}
             * @memberof MappCockpitParameter
             */
            get: function () {
                return this._dataType;
            },
            set: function (dataType) {
                this._dataType = dataType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitParameter.prototype, "engineeringUnit", {
            get: function () {
                return this._engineeringUnit;
            },
            set: function (engineeringUnit) {
                this._engineeringUnit = engineeringUnit;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitParameter.prototype, "enumType", {
            get: function () {
                return this._enumRef;
            },
            set: function (enumRef) {
                this._enumRef = enumRef;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitParameter.prototype, "isWriteable", {
            get: function () {
                return this._isWriteable;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Determines if the properties value is writable.
         *
         * @private
         * @param {boolean} value
         * @returns {boolean}
         * @memberof MappCockpitParameter
         */
        MappCockpitParameter.prototype.parameterIsWritable = function (writable) {
            var writableValue = writable;
            var model = this.component.model;
            if (model) {
                writableValue = writable && model.writeAccess;
            }
            return writableValue;
        };
        Object.defineProperty(MappCockpitParameter.prototype, "displayValue", {
            get: function () {
                return this.valueToString(this._valueSource.value);
            },
            set: function (inputValue) {
                var newValue = this.valueFromString(inputValue);
                this.value = newValue;
                console.log("MappCockpitParameter.setDisplayValue %o for %o", this.value, inputValue);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * converts the parameter value to a formatted string
         *
         * @param {*} _value
         * @returns {string}
         * @memberof MappCockpitParameter
         */
        MappCockpitParameter.prototype.valueToString = function (_value) {
            var valueString = "";
            // avoid converting null or undefined value
            if (this._valueSource.value != null && this._valueSource.value != undefined) {
                valueString = this._valueSource.value.toString();
                valueString = numericHelper_1.NumericHelper.convertNumericString(valueString, this.dataType.name);
                if (this.enumType.isDefined) {
                    valueString = this.enumType.getDisplayValue(this._valueSource.value);
                }
            }
            return valueString;
        };
        /**
         * converts a parameter value string to a value according to the parameters data type
         *
         * @param {string} inputValue
         * @returns {*}
         * @memberof MappCockpitParameter
         */
        MappCockpitParameter.prototype.valueFromString = function (inputValue) {
            // set an empty string for an undefined input value
            var value = inputValue !== undefined && inputValue !== null ? inputValue : "";
            // replace the enum string by the value if there is one defined.
            if (this.enumType.isDefined) {
                value = this.enumType.getValue(inputValue);
            }
            return value;
        };
        return MappCockpitParameter;
    }(MappCockpitComponentItem));
    /**
     * The class implements a component parameter
     *
     * @class MappCockpitComponentParameter
     */
    var MappCockpitComponentParameter = /** @class */ (function (_super) {
        __extends(MappCockpitComponentParameter, _super);
        function MappCockpitComponentParameter(component, name, reference) {
            var _this = _super.call(this, component, name, reference) || this;
            _this._valueSource = property_1.Property.create("", undefined, function (dataLink) { return _this.requestWriteValue(dataLink); });
            return _this;
        }
        /**
         * Writes the current parameter value to target
         *
         * @memberof MappCockpitComponentParameter
         */
        MappCockpitComponentParameter.prototype.write = function (reflectedWriteResponseDelegate) {
            // connect the write response delegate
            this.reflectedWriteResponseDelegate = reflectedWriteResponseDelegate;
            // execute writing the parameter value
            this.valueSource.write();
        };
        /**
         * Writes the data links value to target
         *
         * @private
         * @param {Property<any>} dataLink
         * @memberof MappCockpitComponentParameter
         */
        MappCockpitComponentParameter.prototype.requestWriteValue = function (dataLink) {
            return __awaiter(this, void 0, void 0, function () {
                var component, model, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            component = this.component;
                            if (!(component && component.model)) return [3 /*break*/, 2];
                            model = component.model;
                            return [4 /*yield*/, model.writeComponentParameter(this)];
                        case 1:
                            _a.sent();
                            dataLink.writeRequestExecuted(null);
                            _a.label = 2;
                        case 2: return [3 /*break*/, 4];
                        case 3:
                            error_4 = _a.sent();
                            dataLink.writeRequestRejected(error_4);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Initiates the observation of parameter value changes
         *
         * @static
         * @param {MappCockpitComponentParameter[]} watchableParameters
         * @returns {*}
         * @memberof MappCockpitComponentParameter
         */
        MappCockpitComponentParameter.observeParameterValueChanges = function (observer, observableParameters) {
            if (observableParameters.length > 0 && observableParameters[0] != undefined) {
                // get the parameters model from the parent component
                var model = MappCockpitComponentParameter.getModel(observableParameters[0]);
                if (model && model.observeDataModelItems) {
                    // invoke the observation on the model
                    model.observeDataModelItems(observer, observableParameters);
                }
            }
        };
        /**
         * Activates model items registered for observation
         *
         * @static
         * @param {*} observer
         * @param {MappCockpitComponentParameter[]} observableParameters
         * @returns {*}
         * @memberof MappCockpitComponentParameter
         */
        MappCockpitComponentParameter.activateComponentModelItems = function (observer, observableParameters) {
            //TODO: implement model item activation handling
        };
        /**
         * Unobserves all observables associated with the observer
         *
         * @static
         * @param {*} observer
         * @param {MappCockpitComponentParameter[]} observedParameters
         * @param {boolean} [suspend=true] suspends the observation if true otherwise removes the whole subscription
         * @memberof MappCockpitComponentParameter
         */
        MappCockpitComponentParameter.unobserveComponentModelItems = function (observer, observedParameters, suspend) {
            if (suspend === void 0) { suspend = true; }
            if (observedParameters.length > 0 && observedParameters[0] != undefined) {
                var model = MappCockpitComponentParameter.getModel(observedParameters[0]);
                if (model && model.unobserveComponentModelItems) {
                    // invoke the unobservation on the model
                    model.unobserveComponentModelItems(observer, observedParameters, suspend);
                }
            }
        };
        /**
         * Deactivates model items registered for observation
         *
         * @static
         * @param {*} observer
         * @param {MappCockpitComponentParameter[]} observedParameters
         * @param {boolean} [suspend=true]
         * @memberof MappCockpitComponentParameter
         */
        MappCockpitComponentParameter.deactivateComponentModelItems = function (observer, observedParameters, suspend) {
            if (suspend === void 0) { suspend = true; }
            //TODO: implement model item deactivation handling
        };
        /**
         * Gets the parameters model
         *
         * @private
         * @static
         * @param {MappCockpitComponentParameter[]} observableParameters
         * @returns
         * @memberof MappCockpitComponentParameter
         */
        MappCockpitComponentParameter.getModel = function (componentParameter) {
            if (!componentParameter) {
                console.error("componentParameter undefined !");
            }
            if (!componentParameter.component) {
                console.error("componentParameter.component undefined !");
            }
            return componentParameter.component.model;
        };
        return MappCockpitComponentParameter;
    }(MappCockpitParameter));
    exports.MappCockpitComponentParameter = MappCockpitComponentParameter;
    var MappCockpitStateParameter = /** @class */ (function () {
        function MappCockpitStateParameter(name, expression, icon) {
            this._name = name;
            this._expression = expression;
            this._icon = icon;
        }
        Object.defineProperty(MappCockpitStateParameter.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitStateParameter.prototype, "expression", {
            get: function () {
                return this._expression;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitStateParameter.prototype, "icon", {
            get: function () {
                return this._icon;
            },
            enumerable: true,
            configurable: true
        });
        return MappCockpitStateParameter;
    }());
    exports.MappCockpitStateParameter = MappCockpitStateParameter;
    /**
     * implements a method parameter
     *
     * @class MappCockpitMethodParameter
     * @extends {MappCockpitParameter}
     */
    var MappCockpitMethodParameter = /** @class */ (function (_super) {
        __extends(MappCockpitMethodParameter, _super);
        function MappCockpitMethodParameter(component, name, reference) {
            var _this = _super.call(this, component, name, reference) || this;
            _this._filter = new methodFilter_1.methodFilter();
            return _this;
        }
        Object.defineProperty(MappCockpitMethodParameter.prototype, "filter", {
            get: function () {
                return this._filter;
            },
            enumerable: true,
            configurable: true
        });
        return MappCockpitMethodParameter;
    }(MappCockpitParameter));
    exports.MappCockpitMethodParameter = MappCockpitMethodParameter;
    var MappCockpitQuickCommandParameter = /** @class */ (function () {
        function MappCockpitQuickCommandParameter(name, tooltip, imageName) {
            this._name = name;
            this._tooltip = tooltip;
            this._imageName = imageName;
        }
        Object.defineProperty(MappCockpitQuickCommandParameter.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitQuickCommandParameter.prototype, "tooltip", {
            get: function () {
                return this._tooltip;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitQuickCommandParameter.prototype, "imageName", {
            get: function () {
                return this._imageName;
            },
            enumerable: true,
            configurable: true
        });
        return MappCockpitQuickCommandParameter;
    }());
    exports.MappCockpitQuickCommandParameter = MappCockpitQuickCommandParameter;
    /**
     * defines the parameter data type
     *
     * @class MappCockpitComponentParameterDataType
     */
    var MappCockpitParameterDataType = /** @class */ (function () {
        function MappCockpitParameterDataType(dataTypeId, dataTypeName) {
            if (dataTypeId === void 0) { dataTypeId = "undefined"; }
            if (dataTypeName === void 0) { dataTypeName = "undefined"; }
            this._dataTypeId = "undefined";
            this._dataTypeName = "undefined";
            this._dataTypeId = dataTypeId;
            this._dataTypeName = dataTypeName;
        }
        Object.defineProperty(MappCockpitParameterDataType.prototype, "id", {
            get: function () {
                return this, this._dataTypeId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitParameterDataType.prototype, "name", {
            get: function () {
                return this._dataTypeName;
            },
            enumerable: true,
            configurable: true
        });
        return MappCockpitParameterDataType;
    }());
    exports.MappCockpitParameterDataType = MappCockpitParameterDataType;
    /**
     * implements a single enum value with value and string
     *
     * @class MappCockpitComponentParameterEnumValue
     */
    var MappCockpitComponentParameterEnumValue = /** @class */ (function () {
        /**
         * Creates an instance of MappCockpitComponentParameterEnumValue.
         * @param {string} displayText
         * @param {*} value
         * @memberof MappCockpitComponentParameterEnumValue
         */
        function MappCockpitComponentParameterEnumValue(displayText, value) {
            this._displayValue = "undefined";
            this._value = null;
            this._displayValue = displayText;
            this._value = value;
        }
        Object.defineProperty(MappCockpitComponentParameterEnumValue.prototype, "value", {
            /**
             * gets the value of the enum
             *
             * @readonly
             * @type {*}
             * @memberof MappCockpitComponentParameterEnumValue
             */
            get: function () {
                return this._value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentParameterEnumValue.prototype, "displayValue", {
            /**
             * gets the string of the enum value
             *
             * @readonly
             * @type {string}
             * @memberof MappCockpitComponentParameterEnumValue
             */
            get: function () {
                return this._displayValue;
            },
            enumerable: true,
            configurable: true
        });
        return MappCockpitComponentParameterEnumValue;
    }());
    exports.MappCockpitComponentParameterEnumValue = MappCockpitComponentParameterEnumValue;
    /**
     * implements a parameter enum holding a collection of enum items
     *
     * @class MappCockpitComponentParameterEnum
     */
    var MappCockpitComponentParameterEnum = /** @class */ (function () {
        function MappCockpitComponentParameterEnum(enumValuesReference) {
            if (enumValuesReference === void 0) { enumValuesReference = null; }
            this._browseName = "";
            this._enumValuesReference = enumValuesReference;
            if (this._enumValuesReference) {
                this._browseName = this._enumValuesReference.browseName;
                this._enumValues = this._enumValuesReference.enumValues.map(function (enumValueRef) { return new MappCockpitComponentParameterEnumValue(enumValueRef.displayName.text, enumValueRef.value); });
            }
        }
        Object.defineProperty(MappCockpitComponentParameterEnum.prototype, "browseName", {
            /**
             * gets the browse name of the enum
             *
             * @readonly
             * @type {string}
             * @memberof MappCockpitComponentParameterEnum
             */
            get: function () {
                return this._enumValuesReference.browseName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentParameterEnum.prototype, "values", {
            /**
             * gets the collection of enum items
             *
             * @readonly
             * @type {MappCockpitComponentParameterEnumValue[]}
             * @memberof MappCockpitComponentParameterEnum
             */
            get: function () {
                return this._enumValues;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitComponentParameterEnum.prototype, "isDefined", {
            /**
             * determines if the enum is defined and contains values
             *
             * @readonly
             * @type {boolean}
             * @memberof MappCockpitComponentParameterEnum
             */
            get: function () {
                return this._enumValues && this._enumValues.length > 0;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * gets a string matching the specified enum value, otherwise return value string as default.
         *
         * @returns {*}
         * @memberof MappCockpitComponentParameterEnum
         */
        MappCockpitComponentParameterEnum.prototype.getDisplayValue = function (enumValue) {
            // get an enum item matching the requested value
            var matchingEnumItem = this.findMatchingEnumItemByValue(enumValue);
            // update the value string to the matching one or use the default string
            var enumValueString = matchingEnumItem ? matchingEnumItem.displayValue : enumValue.toString();
            return enumValueString;
        };
        /**
         *
         *
         * @param {string} inputValue
         * @returns {*}
         * @memberof MappCockpitComponentParameterEnum
         */
        MappCockpitComponentParameterEnum.prototype.getValue = function (enumDisplayValue) {
            var enumValue = enumDisplayValue;
            // get an enum item matching the requested string
            var matchingEnumItem = this.findMatchingEnumItemByString(enumDisplayValue);
            if (matchingEnumItem) {
                enumValue = matchingEnumItem.value;
            }
            else {
                console.error("MappCockpitComponentParameterEnum.getValue: could not find matching enum value for %o", enumDisplayValue);
            }
            return enumValue;
        };
        /**
         * find an enum item with matching value
         *
         * @private
         * @param {*} enumValue
         * @returns
         * @memberof MappCockpitComponentParameterEnum
         */
        MappCockpitComponentParameterEnum.prototype.findMatchingEnumItemByValue = function (enumValue) {
            var matchingEnumItem = this._enumValues.filter(function (enumItem) { return enumItem.value == enumValue; });
            return matchingEnumItem.length === 1 ? matchingEnumItem[0] : undefined;
        };
        /**
         * find an enum item with matching string
         *
         * @param {string} enumDisplayValue
         * @returns {*}
         * @memberof MappCockpitComponentParameterEnum
         */
        MappCockpitComponentParameterEnum.prototype.findMatchingEnumItemByString = function (enumDisplayValue) {
            var matchingEnumItem = this._enumValues.filter(function (enumItem) { return enumItem.displayValue === enumDisplayValue; });
            return matchingEnumItem.length === 1 ? matchingEnumItem[0] : undefined;
        };
        return MappCockpitComponentParameterEnum;
    }());
    exports.MappCockpitComponentParameterEnum = MappCockpitComponentParameterEnum;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcENvY2twaXRDb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9vbmxpbmUvbWFwcENvY2twaXRDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQVlBOzs7Ozs7OztPQVFHO0lBQ0g7UUF3Qkk7Ozs7OztXQU1HO1FBQ0gsa0NBQVksU0FBMEMsRUFBRSxJQUFZLEVBQUUsU0FBYztZQTNCcEYsd0JBQXdCO1lBQ3hCLDhCQUE4QjtZQUM5Qix3QkFBd0I7WUFDZCxXQUFNLEdBQW9DLEVBQUUsQ0FBQztZQVE3QyxpQkFBWSxHQUFrQixtQkFBUSxDQUFDLE1BQU0sQ0FBTSxFQUFFLENBQUMsQ0FBQztZQUVqRSx1QkFBdUI7WUFDZixpQkFBWSxHQUF1QixtQkFBUSxDQUFDLE1BQU0sQ0FBVSxLQUFLLENBQUMsQ0FBQztZQUUzRSxpREFBaUQ7WUFDekMsb0NBQStCLEdBQTRDLFNBQVMsQ0FBQztZQVd6RixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztZQUM1QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUNoQyxDQUFDO1FBU0Qsc0JBQVcsaURBQVc7WUFQdEI7Ozs7OztlQU1HO2lCQUNIO2dCQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztZQUM3QixDQUFDO2lCQUVELFVBQXVCLFdBQW1CO2dCQUN0QyxJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQztZQUNwQyxDQUFDOzs7V0FKQTtRQU1ELHNCQUFXLGdEQUFVO2lCQUFyQjtnQkFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDO1lBQ3RDLENBQUM7OztXQUFBO1FBRUQsc0JBQVcsMENBQUk7aUJBQWY7Z0JBQ0ks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QUFDLENBQUMsQ0FBQztZQUN0RyxPQUFPLGdCQUFnQixDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDM0UsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNILHdFQUE0QixHQUE1QixVQUE2QixnQkFBd0I7WUFDakQsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxVQUFDLFFBQVEsSUFBTyxPQUFPLFFBQVEsQ0FBQyxZQUFZLEtBQUssZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNySCxPQUFPLGdCQUFnQixDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDM0UsQ0FBQztRQUdMLHdDQUFDO0lBQUQsQ0FBQyxBQW5IRCxJQW1IQztJQUdtSiw4RUFBaUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBtYXRoIGZyb20gXCIuLi8uLi9saWJzL21hdGgvbWF0aGpzXCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0YURhdGEgfSBmcm9tIFwiLi9tYXBwQ29ja3BpdENvbXBvbmVudE1ldGFEYXRhXCI7XHJcbmltcG9ydCB7IFByb3BlcnR5IH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9wcm9wZXJ0eVwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbCB9IGZyb20gXCIuL2NvbXBvbmVudHNEYXRhTW9kZWxcIjtcclxuaW1wb3J0IHsgQ29tbWFuZCwgSUNvbW1hbmRFeGVjdXRpb25EZWxlZ2F0ZSB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvY29tbWFuZFwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm8gfSBmcm9tIFwiLi9tYXBwQ29ja3BpdENvbXBvbmVudFJlZmxlY3Rpb25cIjtcclxuaW1wb3J0IHsgTnVtZXJpY0hlbHBlciB9IGZyb20gXCIuLi8uLi9jb21tb24vbnVtZXJpY0hlbHBlclwiO1xyXG5pbXBvcnQgeyBJT2JzZXJ2ZXIgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2ludGVyZmFjZXMvb2JzZXJ2ZXJcIjtcclxuaW1wb3J0IHsgSVZhbHVlTGlzdEl0ZW0gfSBmcm9tIFwiLi4vLi4vY29tbW9uL2ludGVyZmFjZXMvdmFsdWVMaXN0SXRlbUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBleHByLCBwYXJhbSB9IGZyb20gXCJqcXVlcnlcIjtcclxuaW1wb3J0IHsgbWV0aG9kRmlsdGVyIH0gZnJvbSBcIi4uLy4uL3dpZGdldHMvbWV0aG9kUGFyYW1ldGVyTGlzdFdpZGdldC9tZXRob2RGaWx0ZXJcIjtcclxuXHJcbi8qKlxyXG4gKiBJbXBsZW1lbnRzIHRoZSBiYXNlIG1lbWViZXJzIGZvciBtYW5hZ2luZyBjb21wb25lbnQgbW9kZWwgbWVtYmVycy5cclxuICpcclxuICogQGNsYXNzIE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbVxyXG4vKipcclxuICpcclxuICpcclxuICogQGNsYXNzIE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbVxyXG4gKi9cclxuY2xhc3MgTWFwcENvY2twaXRDb21wb25lbnRJdGVtIHtcclxuXHJcbiAgICAvLyBIb2xkcyBhIHJlZmVyZW5jZSB0byB0aGUgdW5kZXJseWluZyBpdGVtXHJcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3JlZmVyZW5jZTogYW55O1xyXG4gICAgLy8gSG9sZHMgdGhlIGl0ZW1zIHZhbHVlXHJcbiAgICAvLyBwcm90ZWN0ZWQgX3ZhbHVlOiBhbnkgPSBcIlwiO1xyXG4gICAgLy8gaG9sZHMgc3ViaXRlbXMgaWYgYW55XHJcbiAgICBwcm90ZWN0ZWQgX2l0ZW1zOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW0+ID0gW107XHJcblxyXG4gICAgLy8gaG9sZHMgdGhlIGRpYXBsYXkgbmFtZVxyXG4gICAgcHJvdGVjdGVkIF9kaXNwbGF5TmFtZTogYW55O1xyXG5cclxuICAgIC8vIGhvbGRzIHRoZSBjb21wb25lbnQgcmVwcmVzZW50aW5nIHRoZSBvd25lciBvZiB0aGUgY29tcG9uZW50IGl0ZW1cclxuICAgIHByb3RlY3RlZCBfY29tcG9uZW50OiBNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW0gfCBudWxsO1xyXG5cclxuICAgIHByb3RlY3RlZCBfdmFsdWVTb3VyY2U6IFByb3BlcnR5PGFueT4gPSBQcm9wZXJ0eS5jcmVhdGU8YW55PihcIlwiKTtcclxuXHJcbiAgICAvLyBob2xkcyB0aGUgdXNlciByb2xlc1xyXG4gICAgcHJpdmF0ZSBfd3JpdGVBY2Nlc3M6IFByb3BlcnR5PGJvb2xlYW4+ID0gIFByb3BlcnR5LmNyZWF0ZTxib29sZWFuPihmYWxzZSk7XHJcblxyXG4gICAgLy8gc3BlY2lmaWVzIGEgcmVzcG9uc2UgZGVsYWdldCBmb3Igd3JpdGUgcmVxdWV0c1xyXG4gICAgcHJpdmF0ZSBfcmVmbGVjdGVkV3JpdGVSZXNwb25zZURlbGVnYXRlOiAoKHJlc3VsdERhdGE6IGFueSkgPT4gdm9pZCkgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW0uXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50SXRlbX0gY29tcG9uZW50XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gICAgICogQHBhcmFtIHsqfSByZWZlcmVuY2VcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW1cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoY29tcG9uZW50OiBNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW0gfCBudWxsLCBuYW1lOiBzdHJpbmcsIHJlZmVyZW5jZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fcmVmZXJlbmNlID0gcmVmZXJlbmNlO1xyXG4gICAgICAgIHRoaXMuX2Rpc3BsYXlOYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLl9jb21wb25lbnQgPSBjb21wb25lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBpdGVtcyBkaXNwbGF5IG5hbWUgXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGRpc3BsYXlOYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc3BsYXlOYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgZGlzcGxheU5hbWUoZGlzcGxheU5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2Rpc3BsYXlOYW1lID0gZGlzcGxheU5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBicm93c2VOYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlZmVyZW5jZS5icm93c2VOYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yZWZlcmVuY2UubmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvbXBvbmVudCgpOiBNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW0gfCBudWxsIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29tcG9uZW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgY3VycmVudCB1c2VyIHJvbGVzXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nW119XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCB3cml0ZUFjY2VzcygpIDogUHJvcGVydHk8Ym9vbGVhbj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl93cml0ZUFjY2VzcztcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBpdGVtcyBpZFxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBpZCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yZWZlcmVuY2Uubm9kZUlkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogc2V0cy9nZXRzIHRoZSBpdGVtcyB2YWx1ZSBvYmplY3RcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHsoTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJWYWx1ZXx1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgdmFsdWUoKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWVTb3VyY2UudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCB2YWx1ZSh2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fdmFsdWVTb3VyY2UudmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHZhbHVlU291cmNlKCk6IFByb3BlcnR5PGFueT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZVNvdXJjZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHZhbHVlU291cmNlKHZhbHVlU291cmNlOiBQcm9wZXJ0eTxhbnk+KSB7XHJcbiAgICAgICB0aGlzLl92YWx1ZVNvdXJjZSA9IHZhbHVlU291cmNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyBhIGRlbGVnYXRlIGZvciBvYnNlcnZpbmcgd3JpdGUgcmVzcG9uc2VzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IHJlZmxlY3RlZFdyaXRlUmVzcG9uc2VEZWxlZ2F0ZShyZWZsZWN0ZWRXcml0ZVJlc3BvbnNlRGVsZWdhdGU6KChyZWZsZWN0ZWRXcml0ZVJlc3BvbnNlVmFsdWU6YW55KT0+dm9pZCl8dW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5fcmVmbGVjdGVkV3JpdGVSZXNwb25zZURlbGVnYXRlID0gcmVmbGVjdGVkV3JpdGVSZXNwb25zZURlbGVnYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgZGVsZWdhdGUgZm9yIG9ic2VydmluZyB3cml0ZSByZXNwb21zZXNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRJdGVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgcmVmbGVjdGVkV3JpdGVSZXNwb25zZURlbGVnYXRlKCk6KChyZWZsZWN0ZWRXcml0ZVJlc3BvbnNlVmFsdWU6YW55KT0+dm9pZCl8dW5kZWZpbmVke1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yZWZsZWN0ZWRXcml0ZVJlc3BvbnNlRGVsZWdhdGU7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldHMgdGhlIHZhbHVlIGFzIGZvcm1hdHRlZCBzdHJpbmcgaWYgYXBwcm9waWF0ZVxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGRpc3BsYXlWYWx1ZSgpOiBTdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZVNvdXJjZS50b1N0cmluZygpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgc2V0IGRpc3BsYXlWYWx1ZShpbnB1dFZhbHVlOiBTdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl92YWx1ZVNvdXJjZS52YWx1ZSA9IGlucHV0VmFsdWU7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBnZXQgZGF0YVR5cGVJZCgpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yZWZlcmVuY2UuZGF0YVR5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXRzIHRoZSBzdWJpdGVtcyBpZiBhbnlcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW0+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGl0ZW1zKCk6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVtcztcclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIFRoZSBjbGFzcyByZXByZXNlbnRzIGEgY29tcG9uZW50IHRvIGJlIHVzZWQgd2l0aGluIG1hcHAgY29ja3BpdCBVSVxyXG4gKlxyXG4gKiBAY2xhc3MgTWFwcENvY2twaXRDb21wb25lbnRcclxuICovXHJcbmNsYXNzIE1hcHBDb2NrcGl0Q29tcG9uZW50IGV4dGVuZHMgTWFwcENvY2twaXRDb21wb25lbnRJdGVtIHtcclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSG9sZHMgdGhlIGNvbXBvbmVudCBtZXRob2RzXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHR5cGUge0FycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kPn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFxyXG4gICAgICovXHJcblxyXG4gICAgLy8gSG9sZHMgdGhlIGNvbXBvbmVudCBtZXRob2RzXHJcbiAgICBwcml2YXRlIF9tZXRob2RzOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZD4gPSBbXTtcclxuICAgIHByaXZhdGUgX3F1aWNrQ29tbWFuZHM6IEFycmF5PE1hcHBDb2NrcGl0UXVpY2tDb21tYW5kUGFyYW1ldGVyPiA9IFtdO1xyXG4gICAgcHJpdmF0ZSBfdXNlck1ldGhvZHM6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kPiA9IFtdO1xyXG5cclxuICAgIC8vIEhvbGRzIHRoZSBjb21wb25lbnQgcGFyYW1ldGVyc1xyXG4gICAgcHJpdmF0ZSBfcGFyYW1ldGVyczogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+ID0gW107XHJcbiAgICBwcml2YXRlIF93YXRjaGFibGVQYXJhbWV0ZXJzOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4gPSBbXTtcclxuICAgIHByaXZhdGUgX3dhdGNoYWJsZVN0YXRlUGFyYW1ldGVyczogQXJyYXk8TWFwcENvY2twaXRTdGF0ZVBhcmFtZXRlcj4gPSBbXTtcclxuICAgIHByaXZhdGUgX2NvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4gPSBbXTsgICAgXHJcbiAgICBwcml2YXRlIF9tZXNzYWdlUGFyYW1ldGVyczogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+ID0gW107XHJcbiAgICBcclxuXHJcbiAgICBwcml2YXRlIF9tZXRhRGF0YTogTWFwcENvY2twaXRDb21wb25lbnRNZXRhRGF0YXx1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF9wYXJhbWV0ZXJzU291cmNlOiBQcm9wZXJ0eTxBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4+ID0gUHJvcGVydHkuY3JlYXRlPEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPj4oW10sKGRhdGFMaW5rKT0+e3RoaXMucmVxdWVzdFJlYWRDb21wb25lbnRQYXJhbWV0ZXJzKGRhdGFMaW5rKTt9KTtcclxuICAgIHByaXZhdGUgX21lc3NhZ2VQYXJhbWV0ZXJzU291cmNlOiBQcm9wZXJ0eTxBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4+ID0gUHJvcGVydHkuY3JlYXRlPEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPj4oW10sKGRhdGFMaW5rKT0+e3RoaXMucmVxdWVzdFJlYWRDb21wb25lbnRQYXJhbWV0ZXJzKGRhdGFMaW5rKTt9KTtcclxuICAgIHByaXZhdGUgX3dhdGNoYWJsZVBhcmFtZXRlcnNTb3VyY2U6IFByb3BlcnR5PEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPj4gPSBQcm9wZXJ0eS5jcmVhdGU8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+PihbXSwoZGF0YUxpbmspPT57dGhpcy5yZXF1ZXN0UmVhZENvbXBvbmVudFBhcmFtZXRlcnMoZGF0YUxpbmspO30pO1xyXG4gICAgcHJpdmF0ZSBfY29uZmlndXJhdGlvblBhcmFtZXRlcnNTb3VyY2U6IFByb3BlcnR5PEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPj4gPSBQcm9wZXJ0eS5jcmVhdGU8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+PihbXSwoZGF0YUxpbmspPT57dGhpcy5yZXF1ZXN0UmVhZENvbXBvbmVudFBhcmFtZXRlcnMoZGF0YUxpbmspO30pO1xyXG4gICBcclxuICAgIHByaXZhdGUgX21ldGhvZHNTb3VyY2U6IFByb3BlcnR5PEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kPj4gPSBQcm9wZXJ0eS5jcmVhdGU8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRNZXRob2Q+PihbXSwoZGF0YUxpbmspPT57dGhpcy5yZXF1ZXN0UmVhZENvbXBvbmVudE1ldGhvZHMoZGF0YUxpbmspO30pO1xyXG4gICAgcHJpdmF0ZSBfY29tbWFuZENvbm5lY3QgPSBDb21tYW5kLmNyZWF0ZTxhbnksYW55Pih0aGlzLCB0aGlzLmV4ZWN1dGVDb21tYW5kQ29ubmVjdCgpKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIHNldHMvZ2V0cyB0aGUgcGFyYW1ldGVycyBvZiB0aGUgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgXHJcbiAgICBwdWJsaWMgZ2V0IGNvbW1hbmRDb25uZWN0Q29tcG9uZW50KCkgOiBDb21tYW5kPGFueSxhbnk+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29tbWFuZENvbm5lY3Q7XHJcbiAgICB9XHJcbiAgICBcclxuXHJcblxyXG4gICAgcHJpdmF0ZSBleGVjdXRlQ29tbWFuZENvbm5lY3QoKTogSUNvbW1hbmRFeGVjdXRpb25EZWxlZ2F0ZTxhbnksYW55PiB7XHJcbiAgICAgICAgcmV0dXJuIGFzeW5jIChjb21tYW5kUGFycyxjb21tYW5kUmVzcG9uc2UpID0+IHsgXHJcbiAgICAgICAgICAgIGxldCBtb2RlbCA9ICg8YW55PnRoaXMpLm1vZGVsIGFzIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG1vZGVsKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyByZWFkIHBhcmFtZXRlciBjb21wb25lbnQgc2V0XHJcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgbW9kZWwuYnJvd3NlQ29tcG9uZW50KHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBpbnRpdGlhbGx5IHVwZGF0ZSB0aGUgY29tcG9uZW50cyBhY2Nlc3MgcmlnaHRzXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVDb21wb25lbnRBY2Nlc3NSaWdodHMobW9kZWwpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyB3YXRjaCBhY2Nlc3MgcmlnaHQgY2hhbmdlc1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2JzZXJ2ZUNvbXBvbmVudEFjY2Vzc1JpZ2h0cyhtb2RlbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgZGF0YSBsaW5rXHJcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZFJlc3BvbnNlLmV4ZWN1dGVkKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb21tYW5kUmVzcG9uc2UucmVqZWN0ZWQoZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9ic2VydmVzIGNoYW5nZXMgb2YgdGhlIGFjY2VzcyByaWdodHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbH0gbWFpbk1vZGVsXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvYnNlcnZlQ29tcG9uZW50QWNjZXNzUmlnaHRzKG1haW5Nb2RlbDogTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWwpIHtcclxuICAgICAgICBtYWluTW9kZWwudXNlclJvbGVzLmNoYW5nZWQoKHVzZXJSb2xlcykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbXBvbmVudEFjY2Vzc1JpZ2h0cyhtYWluTW9kZWwpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgY29tcG9uZW50cnMgYWNjZXNzIHJpZ2h0c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsfSBtYWluTW9kZWxcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZUNvbXBvbmVudEFjY2Vzc1JpZ2h0cyhtYWluTW9kZWw6IE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsKSB7XHJcbiAgICAgICAgbGV0IHdyaXRlQWNjZXNzID0gbWFpbk1vZGVsLndyaXRlQWNjZXNzO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwidXNlciByb2xlcyBjaGFuZ2VkICVvIHdyaXRlIGFjY2VzcyA9JW9cIiwgbWFpbk1vZGVsLnVzZXJSb2xlcy52YWx1ZSwgd3JpdGVBY2Nlc3MpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlQ29tcG9uZW50TWVtYmVyQWNjZXNzUmlnaHRzKHdyaXRlQWNjZXNzKTtcclxuICAgICAgICB0aGlzLndyaXRlQWNjZXNzLnZhbHVlID0gd3JpdGVBY2Nlc3M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBhY2Nlc3MgcmlnaHRzIG9mIGNvbXBvbmVudCBtZW1iZXJzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSB3cml0ZUFjY2Vzc1xyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgdXBkYXRlQ29tcG9uZW50TWVtYmVyQWNjZXNzUmlnaHRzKHdyaXRlQWNjZXNzOiBib29sZWFuKTogYW55IHtcclxuICAgICAgIHRoaXMudXBkYXRlUGFyYW1ldGVyQWNjZXNzUmlnaHRzKHdyaXRlQWNjZXNzKTtcclxuICAgICAgIHRoaXMudXBkYXRlTWV0aG9kc0FjY2Vzc1JpZ2h0cyh3cml0ZUFjY2Vzcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBwYXJhbWV0ZXJzIGFjY2VzcyByaWdodHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlUGFyYW1ldGVyQWNjZXNzUmlnaHRzKHdyaXRlQWNjZXNzOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLmZvckVhY2goKHBhcmFtZXRlcikgPT4ge1xyXG4gICAgICAgICAgICAvLyByZXdyaXRlIHRoZSBwYXJhbWV0ZXJzIHdyaXRlIGFjY2VzcyBwcm9wZXJ0eSB3aXRoIGl0cyBvcmlnaW5hbCByYXcgdmFsdWUgdG8gZm9yY2UgdHJpZ2dlcmluZyB0aGUgY2hhbmdlZCBldmVudC4gVGhpcyBpcyBqdXN0IGEgd29ya2Fyb3VuZFxyXG4gICAgICAgICAgICAvLyB0byBmaXggdGhlIGxvZyBpbi9vdXQgcHJvYmxlbSBkaXNwbGF5aW5nIHdyb25nIHJlYWRvbmx5IHN0YXRlcy5cclxuICAgICAgICAgICAgLy8gdGhlIHdvcmthcm91bmQgaXMgaW50ZW5kZWQgdG8gYmUgcmVwbGFjZWQgYnkgcHJvcGVyIGJhdGNoIHJlZnJlc2ggcmVxdWVzdHMhXHJcbiAgICAgICAgICAgIHBhcmFtZXRlci5pc1dyaXRlYWJsZS52YWx1ZSA9ICg8YW55PnBhcmFtZXRlci5pc1dyaXRlYWJsZSkuX3ZhbHVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgbWV0aG9kcyBhY2Nlc3MgcmlnaHRzXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgdXBkYXRlTWV0aG9kc0FjY2Vzc1JpZ2h0cyh3cml0ZUFjY2VzczogYm9vbGVhbik6IGFueSB7XHJcbiAgICAgICAgdGhpcy5tZXRob2RzLmZvckVhY2goKG1ldGhvZCkgPT4ge1xyXG4gICAgICAgICAgICBtZXRob2QuaXNFeGVjdXRhYmxlLnZhbHVlID0gKHdyaXRlQWNjZXNzICYmIG1ldGhvZC5leHByZXNzaW9uKSA/IG1ldGhvZC5nZXRFbmFibGVkU3RhdGUodGhpcy53YXRjaGFibGVQYXJhbWV0ZXJzKSA6IHdyaXRlQWNjZXNzO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogc2V0cy9nZXRzIHRoZSBwYXJhbWV0ZXJzIG9mIHRoZSBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgZ2V0IG1ldGhvZHMoKTogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRNZXRob2Q+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWV0aG9kcztcclxuICAgIH1cclxuXHJcbiAgICBzZXQgbWV0aG9kcyhtZXRob2RzOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZD4pIHtcclxuICAgICAgICB0aGlzLl9tZXRob2RzID0gbWV0aG9kcztcclxuICAgICAgICB0aGlzLl9tZXRob2RzU291cmNlLnZhbHVlID0gdGhpcy5fbWV0aG9kcztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbWV0aG9kc1NvdXJjZSgpOiBQcm9wZXJ0eTxBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZD4+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWV0aG9kc1NvdXJjZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcXVpY2tDb21tYW5kcygpOiBBcnJheTxNYXBwQ29ja3BpdFF1aWNrQ29tbWFuZFBhcmFtZXRlcj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9xdWlja0NvbW1hbmRzO1xyXG4gICAgfSBcclxuXHJcbiAgICBzZXQgcXVpY2tDb21tYW5kcyhxdWlja0NvbW1hbmRzOiBBcnJheTxNYXBwQ29ja3BpdFF1aWNrQ29tbWFuZFBhcmFtZXRlcj4pIHtcclxuICAgICAgICB0aGlzLl9xdWlja0NvbW1hbmRzID0gcXVpY2tDb21tYW5kcztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdXNlck1ldGhvZHMoKTogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRNZXRob2Q+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdXNlck1ldGhvZHM7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHVzZXJNZXRob2RzKG1ldGhvZHM6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kPikge1xyXG4gICAgICAgIHRoaXMuX3VzZXJNZXRob2RzID0gbWV0aG9kcztcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBzZXRzL2dldHMgdGhlIHBhcmFtZXRlcnMgb2YgdGhlIGNvbXBvbmVudFxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge0FycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBnZXQgcGFyYW1ldGVycygpOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBwYXJhbWV0ZXJzKHBhcmFtZXRlcnM6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPikge1xyXG4gICAgICAgIHRoaXMuX3BhcmFtZXRlcnMgPSBwYXJhbWV0ZXJzO1xyXG4gICAgICAgIHRoaXMuX3BhcmFtZXRlcnNTb3VyY2UudmFsdWUgPSB0aGlzLl9wYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBnZXQgd2F0Y2hhYmxlUGFyYW1ldGVycygpOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl93YXRjaGFibGVQYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCB3YXRjaGFibGVQYXJhbWV0ZXJzKHBhcmFtZXRlcnM6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPikge1xyXG4gICAgICAgIHRoaXMuX3dhdGNoYWJsZVBhcmFtZXRlcnMgPSBwYXJhbWV0ZXJzO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXQgd2F0Y2hhYmxlU3RhdGVQYXJhbWV0ZXJzKCk6IEFycmF5PE1hcHBDb2NrcGl0U3RhdGVQYXJhbWV0ZXI+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fd2F0Y2hhYmxlU3RhdGVQYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCB3YXRjaGFibGVTdGF0ZVBhcmFtZXRlcnMocGFyYW1ldGVyczogQXJyYXk8TWFwcENvY2twaXRTdGF0ZVBhcmFtZXRlcj4pIHtcclxuICAgICAgICB0aGlzLl93YXRjaGFibGVTdGF0ZVBhcmFtZXRlcnMgPSBwYXJhbWV0ZXJzO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXQgbWVzc2FnZVBhcmFtZXRlcnMoKTogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWVzc2FnZVBhcmFtZXRlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IG1lc3NhZ2VQYXJhbWV0ZXJzKHBhcmFtZXRlcnM6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPikge1xyXG4gICAgICAgIHRoaXMuX21lc3NhZ2VQYXJhbWV0ZXJzID0gcGFyYW1ldGVycztcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzKCk6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBjb25maWd1cmF0aW9uUGFyYW1ldGVycyhwYXJhbWV0ZXJzOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4pIHtcclxuICAgICAgICB0aGlzLl9jb25maWd1cmF0aW9uUGFyYW1ldGVycyA9IHBhcmFtZXRlcnM7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldCBwYXJhbWV0ZXJzU291cmNlKCk6IFByb3BlcnR5PEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJhbWV0ZXJzU291cmNlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBtZXNzYWdlUGFyYW1ldGVyc1NvdXJjZSgpOiBQcm9wZXJ0eTxBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4+IHtcclxuICAgICAgICAvLyBmaWx0ZXIgdGhlIHdhdGNoYWJsZXMgYW5kIHVwZGF0ZSB0aGUgd2F0Y2hhYmxlcyBwYXJhbWV0ZXIgbGlzdFxyXG4gICAgICAgIHRoaXMuX21lc3NhZ2VQYXJhbWV0ZXJzU291cmNlLnZhbHVlID0gdGhpcy5fbWVzc2FnZVBhcmFtZXRlcnM7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lc3NhZ2VQYXJhbWV0ZXJzU291cmNlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB3YXRjaGFibGVQYXJhbWV0ZXJzU291cmNlKCk6IFByb3BlcnR5PEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPj4ge1xyXG4gICAgICAgIC8vIGZpbHRlciB0aGUgd2F0Y2hhYmxlcyBhbmQgdXBkYXRlIHRoZSB3YXRjaGFibGVzIHBhcmFtZXRlciBsaXN0XHJcbiAgICAgICAgdGhpcy5fd2F0Y2hhYmxlUGFyYW1ldGVyc1NvdXJjZS52YWx1ZSA9IHRoaXMuX3dhdGNoYWJsZVBhcmFtZXRlcnM7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dhdGNoYWJsZVBhcmFtZXRlcnNTb3VyY2U7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGdldCBjb25maWd1cmF0aW9uUGFyYW1ldGVyc1NvdXJjZSgpOiBQcm9wZXJ0eTxBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4+IHtcclxuICAgICAgICB0aGlzLl9jb25maWd1cmF0aW9uUGFyYW1ldGVyc1NvdXJjZS52YWx1ZSA9IHRoaXMuX2NvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWd1cmF0aW9uUGFyYW1ldGVyc1NvdXJjZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlZnJlc2hlcyB0aGUgY29tcG9uZW50cyBwYXJhbWV0ZXIgbGlzdFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge1Byb3BlcnR5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10+fSBkYXRhTGlua1xyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyByZXF1ZXN0UmVhZENvbXBvbmVudFBhcmFtZXRlcnMoZGF0YUxpbms6IFByb3BlcnR5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10+KTogUHJvbWlzZTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdPiB7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudFBhcmFtZXRlcnM6TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSA9IFtdO1xyXG4gICAgICAgIC8vIGdldCB0aGUgY29tcG9uZW50cyBtYWluIG1vZGVsXHJcbiAgICAgICAgbGV0IG1vZGVsID0gKDxhbnk+dGhpcykubW9kZWwgYXMgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWw7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKG1vZGVsKXtcclxuICAgICAgICAgICAgICAgIC8vIHJlYWQgcGFyYW1ldGVyIGNvbXBvbmVudCBzZXRcclxuICAgICAgICAgICAgICAgIGNvbXBvbmVudFBhcmFtZXRlcnMgPSBhd2FpdCBtb2RlbC5icm93c2VQYXJhbWV0ZXJzKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSBkYXRhIGxpbmtcclxuICAgICAgICAgICAgICAgIGRhdGFMaW5rLnJlYWRSZXF1ZXN0RXhlY3V0ZWQoY29tcG9uZW50UGFyYW1ldGVycyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBkYXRhTGluay5yZWFkUmVxdWVzdFJlamVjdGVkKGVycm9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjb21wb25lbnRQYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlZnJlc2hlcyB0aGUgY29tcG9uZW50cyBtZXRob2RzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtQcm9wZXJ0eTxNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFtdPn0gZGF0YUxpbmtcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgcmVxdWVzdFJlYWRDb21wb25lbnRNZXRob2RzKGRhdGFMaW5rOiBQcm9wZXJ0eTxNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFtdPik6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudE1ldGhvZHM6TWFwcENvY2twaXRDb21wb25lbnRNZXRob2RbXSA9IFtdO1xyXG4gICAgICAgIC8vIGdldCB0aGUgY29tcG9uZW50cyBtYWluIG1vZGVsXHJcbiAgICAgICAgbGV0IG1vZGVsID0gKDxhbnk+dGhpcykubW9kZWwgYXMgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWw7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKG1vZGVsKXtcclxuICAgICAgICAgICAgICAgIC8vIHJlYWQgcGFyYW1ldGVyIGNvbXBvbmVudCBzZXRcclxuICAgICAgICAgICAgICAgIGNvbXBvbmVudE1ldGhvZHMgPSBhd2FpdCBtb2RlbC5icm93c2VNZXRob2RzKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSBkYXRhIGxpbmtcclxuICAgICAgICAgICAgICAgIGRhdGFMaW5rLnJlYWRSZXF1ZXN0RXhlY3V0ZWQoY29tcG9uZW50TWV0aG9kcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBkYXRhTGluay5yZWFkUmVxdWVzdFJlamVjdGVkKGVycm9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjb21wb25lbnRNZXRob2RzO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAgZ2V0cyB0aGUgbWV0YSBkYXRhIG9mIGEgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgZ2V0IG1ldGFEYXRhKCk6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0YURhdGF8dW5kZWZpbmVkIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWV0YURhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IG1ldGFEYXRhKG1ldGFEYXRhOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGFEYXRhfHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuX21ldGFEYXRhID0gbWV0YURhdGE7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVnaXN0ZXJzIG9yIG1hcmtzIHRoZSBjb21wb25lbnQgYXMgdXNlciBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50fSBjb21wb25lbnRcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyByZWdpc3RlclVzZXJDb21wb25lbnQoY29tcG9uZW50OiBNYXBwQ29ja3BpdENvbXBvbmVudCk6IHZvaWQge1xyXG4gICAgICAgICg8YW55PmNvbXBvbmVudCkuaXNVc2VyQ29tcG9uZW50ID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERldGVybWluZXMgaWYgdGhlIGNvbXBvbmVudCBpcyBhIHVzZXIgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudH0gY29tcG9uZW50XHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaXNVc2VyQ29tcG9uZW50KGNvbXBvbmVudDogTWFwcENvY2twaXRDb21wb25lbnQpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gKDxhbnk+Y29tcG9uZW50KS5pc1VzZXJDb21wb25lbnQ7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIFRoZSBjbGFzcyBpbXBsZW1lbnRzIG1ldGhvZCBhY2Nlc3MuXHJcbiAqXHJcbiAqIEBjbGFzcyBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFxyXG4gKi9cclxuY2xhc3MgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QgZXh0ZW5kcyBNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW0ge1xyXG5cclxuICAgIC8vIEhvbGRzIHRoZSBtZXRob2QgcGFyYW1ldGVyc1xyXG4gICAgX2lucHV0UGFyYW1ldGVyczogQXJyYXk8TWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXI+ID0gW107XHJcbiAgICBfaXNCcm93c2VkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBfZXhwcmVzc2lvbjogc3RyaW5nIHwgdW5kZWZpbmVkO1xyXG4gICAgLy8gc3BlY2VmaWVzIGlmIHRoZSBtZXRob2QgaXMgZXhlY3V0YWJsZVxyXG4gICAgcHJvdGVjdGVkIF9pc0V4ZWN1dGFibGU6IFByb3BlcnR5PGJvb2xlYW4+ID0gUHJvcGVydHkuY3JlYXRlPGJvb2xlYW4+KGZhbHNlLHVuZGVmaW5lZCx1bmRlZmluZWQsKHZhbHVlKT0+dGhpcy5tZXRob2RJc0V4ZWN1dGFibGUodmFsdWUpKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGlucHV0IHBhcmFtZXRlcnMgb2YgdGhlIG1ldGhvZFxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge0FycmF5PE1hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVyPn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGlucHV0UGFyYW1ldGVycygpOiBBcnJheTxNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnB1dFBhcmFtZXRlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBpbnB1dFBhcmFtZXRlcnModmFsdWU6IEFycmF5PE1hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVyPil7XHJcbiAgICAgICAgdGhpcy5faW5wdXRQYXJhbWV0ZXJzID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBpc0Jyb3dzZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzQnJvd3NlZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGlzQnJvd3NlZChpc0Jyb3dzZWQ6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl9pc0Jyb3dzZWQgPSBpc0Jyb3dzZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbnZva2VzIHRoZSBleGVjdXRpb24gb2YgdGhlIGNvbXBvbmVudCBtZXRob2RcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kfSBjb21wb25lbnRNZXRob2RcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBhc3luYyBleGVjdXRlKGNvbXBvbmVudE1ldGhvZDogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIC8vIGdldCB0aGUgbWV0aG9kcyBtb2RlbCBmcm9tIHRoZSBwYXJlbnQgY29tcG9uZW50XHJcbiAgICAgICAgbGV0IG1vZGVsID0gKDxhbnk+Y29tcG9uZW50TWV0aG9kLmNvbXBvbmVudCkubW9kZWwgYXMgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWw7XHJcbiAgICAgICAgaWYgKG1vZGVsICYmIG1vZGVsLmV4ZWN1dGVDb21wb25lbnRNZXRob2QpIHtcclxuICAgICAgICAgICAgLy8gaW52b2tlIHRoZSBleGVjdXRpb24gb2YgdGhlIG1ldGhvZFxyXG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgbW9kZWwuZXhlY3V0ZUNvbXBvbmVudE1ldGhvZChjb21wb25lbnRNZXRob2QpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZpbmRzIGEgbWV0aG9kIGJ5IG5hbWVcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWV0aG9kTmFtZVxyXG4gICAgICogQHBhcmFtIHsoTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RbXXx1bmRlZmluZWQpfSBjb21wb25lbnRNZXRob2RzXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtpbmNsdWRlSW50ZXJuYWxzPXRydWVdXHJcbiAgICAgKiBAcmV0dXJucyB7TWFwcENvY2twaXRDb21wb25lbnRNZXRob2R8dW5kZWZpbmVkfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBmaW5kKG1ldGhvZE5hbWU6c3RyaW5nLCBjb21wb25lbnRNZXRob2RzOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFtdfHVuZGVmaW5lZCxpbmNsdWRlSW50ZXJuYWxzOiBib29sZWFuID0gdHJ1ZSk6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kfHVuZGVmaW5lZCB7XHJcblxyXG4gICAgICAgIGxldCBtZXRob2Q6TWFwcENvY2twaXRDb21wb25lbnRNZXRob2R8dW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICBpZiAoY29tcG9uZW50TWV0aG9kcykge1xyXG4gICAgICAgICAgICBsZXQgbW9kZWwgPSAoPGFueT5jb21wb25lbnRNZXRob2RzWzBdLmNvbXBvbmVudCkubW9kZWwgYXMgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWw7XHJcbiAgICAgICAgICAgIGlmIChtb2RlbCkge1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIGV4ZWN1dGFibGUgbWV0aG9kc1xyXG4gICAgICAgICAgICAgICAgbGV0IGV4ZWN1dGFibGVNZXRob2RzID0gaW5jbHVkZUludGVybmFscyA/ICg8YW55PmNvbXBvbmVudE1ldGhvZHNbMF0pLmNvbXBvbmVudC5tZXRob2RzIDogY29tcG9uZW50TWV0aG9kcztcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgbGV0IG1hdGNoaW5nTWV0aG9kcyA9IGV4ZWN1dGFibGVNZXRob2RzLmZpbHRlcigobWV0aG9kKT0+eyByZXR1cm4gbWV0aG9kLmJyb3dzZU5hbWUgPT09IG1ldGhvZE5hbWUgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hpbmdNZXRob2RzLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNhbGwgdGhlIHJlcXVlc3RlZCBtZXRob2RcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2QgPSBtYXRjaGluZ01ldGhvZHNbMF07XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBtZXRob2Q7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBleHByZXNzaW9uKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V4cHJlc3Npb247XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBleHByZXNzaW9uKGV4cHJlc3Npb246IHN0cmluZyB8IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuX2V4cHJlc3Npb24gPSBleHByZXNzaW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBlbmFibGVkIHN0YXRlIGFjY29yZGluZyB0byBtZXRob2QgZXhwcmVzc2lvbiBhdCBpbml0aWFsaXphdGlvbiBvciB3aGVuIHVzZXIgaGFzIGJlZW4gY2hhbmdlZC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IHdhdGNoYWJsZVBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRFbmFibGVkU3RhdGUod2F0Y2hhYmxlUGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSk6IGJvb2xlYW57XHJcbiAgICAgICAgbGV0IGV4cHJlc3Npb24gPSB0aGlzLmV4cHJlc3Npb247XHJcbiAgICAgICAgbGV0IHdhdGNoYWJsZXNJbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICAgICAgd2F0Y2hhYmxlUGFyYW1ldGVycy5mb3JFYWNoKCh3YXRjaGFibGUpPT57XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmV4cHJlc3Npb24hLmluY2x1ZGVzKHdhdGNoYWJsZS5icm93c2VOYW1lKSAmJiB3YXRjaGFibGVzSW5pdGlhbGl6ZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh3YXRjaGFibGUudmFsdWUgIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb24gPSBleHByZXNzaW9uIS5yZXBsYWNlKG5ldyBSZWdFeHAod2F0Y2hhYmxlLmJyb3dzZU5hbWUsICdnJyksIHdhdGNoYWJsZS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBJZiB3YXRjaGFibGUudmFsdWUgaXMgbm90IHlldCBkZWZpbmVkLCB3ZSBpbml0aWFsaXplZCBleHByZXNzaW9uIHRvIHRydWVcclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHdhdGNoYWJsZXNJbml0aWFsaXplZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb24gPSBcInRydWVcIjtcclxuICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gbWF0aC5ldmFsdWF0ZShleHByZXNzaW9uKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgaWYgdGhlIG1ldGhvZCBpcyBleGVjdXRhYmxlXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7UHJvcGVydHk8Ym9vbGVhbj59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBpc0V4ZWN1dGFibGUoKTogUHJvcGVydHk8Ym9vbGVhbj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pc0V4ZWN1dGFibGU7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGV0ZXJtaW5lcyBpZiB0aGUgbWV0aGlkIGlzIGV4ZWN1dGFibGVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGV4ZWN1dGFibGVcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbWV0aG9kSXNFeGVjdXRhYmxlKGV4ZWN1dGFibGU6IGJvb2xlYW4pOiBhbnkge1xyXG4gICAgICAgIGxldCBpc0V4ZWN1dGFibGVWYWx1ZSA9IGV4ZWN1dGFibGU7XHJcbiAgICAgICAgbGV0IG1vZGVsID0gKDxhbnk+dGhpcy5jb21wb25lbnQpLm1vZGVsIGFzIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsO1xyXG4gICAgICAgIGlmIChtb2RlbCAmJiB0aGlzLmNvbXBvbmVudCkge1xyXG4gICAgICAgICAgICAvLyBlbmFibGUgbWV0aG9kIGV4ZWN1dGlvbiBmb3Igbm9uIHVzZXIgY29tcG9uZW50c1xyXG4gICAgICAgICAgICBpc0V4ZWN1dGFibGVWYWx1ZSA9IE1hcHBDb2NrcGl0Q29tcG9uZW50LmlzVXNlckNvbXBvbmVudCh0aGlzLmNvbXBvbmVudCBhcyBNYXBwQ29ja3BpdENvbXBvbmVudCkgPyAgaXNFeGVjdXRhYmxlVmFsdWUgOiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaXNFeGVjdXRhYmxlVmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBtZXRob2RzIGlucHV0IHBhcmFtZXRlcnNcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kfSBjb21wb25lbnRNZXRob2RcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPE1hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVyW10+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBhc3luYyB1cGRhdGVJbnB1dFBhcmFtZXRlcnMoY29tcG9uZW50TWV0aG9kOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCk6IFByb21pc2U8TWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXJbXT4ge1xyXG4gICAgICAgIC8vIGdldCB0aGUgbWV0aG9kcyBtb2RlbCBmcm9tIHRoZSBwYXJlbnQgY29tcG9uZW50XHJcbiAgICAgICAgbGV0IG1vZGVsID0gKDxhbnk+Y29tcG9uZW50TWV0aG9kLmNvbXBvbmVudCkubW9kZWwgYXMgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWw7XHJcbiAgICAgICAgaWYgKG1vZGVsICYmIG1vZGVsLmV4ZWN1dGVDb21wb25lbnRNZXRob2QpIHtcclxuICAgICAgICAgICAgLy8gYnJvd3NlIGlucHV0IHBhcmFtZXRlcnMgaWYgbm90IHlldCBkZWZpbmVkLlxyXG4gICAgICAgICAgICBpZiAoY29tcG9uZW50TWV0aG9kLmlzQnJvd3NlZCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIGF3YWl0IG1vZGVsLmJyb3dzZU1ldGhvZElucHV0UGFyYW1ldGVycyhjb21wb25lbnRNZXRob2QpO1xyXG4gICAgICAgICAgICAgICAgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvLnVwZGF0ZU1ldGhvZElucHV0UGFyYW1ldGVycyhjb21wb25lbnRNZXRob2QpOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29tcG9uZW50TWV0aG9kLmlucHV0UGFyYW1ldGVycztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZSBmaWx0ZXIgc3RhdHVzIGZvciBlYWNoIHBhcmFtZXRlclxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRNZXRob2R9IG1ldGhvZFxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyB1cGRhdGVGaWx0ZXIobWV0aG9kOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCkge1xyXG4gICAgICAgIG1ldGhvZC5pbnB1dFBhcmFtZXRlcnMuZm9yRWFjaCgocGFyYW1ldGVyKSA9PiB7IFxyXG4gICAgICAgICAgICBpZiAocGFyYW1ldGVyLmZpbHRlci5wYXJhbWV0ZXJSZWYgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBhcmFtVmFsdWUgPSBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZC5nZXRWYWx1ZUZyb21QYXJhbWV0ZXJSZWYobWV0aG9kLCBwYXJhbWV0ZXIuZmlsdGVyLnBhcmFtZXRlclJlZik7XHJcbiAgICAgICAgICAgICAgICBpZiAoTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QuaXNSZWZWYWx1ZU1hdGNoaW5nKHBhcmFtVmFsdWUsIHBhcmFtZXRlci5maWx0ZXIucGFyYW1ldGVyVmFsdWVzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlci5maWx0ZXIuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbWV0ZXIuZmlsdGVyLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB2YWx1ZSBmcm9tIGNvbm5lY3RlZCBwYXJhbWV0ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZH0gbWV0aG9kXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmVmZXJlbmNlXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIGdldFZhbHVlRnJvbVBhcmFtZXRlclJlZihtZXRob2Q6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLCByZWZlcmVuY2U6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IHZhbHVlID0gJyc7XHJcbiAgICAgICAgbWV0aG9kLmlucHV0UGFyYW1ldGVycy5mb3JFYWNoKChwYXJhbWV0ZXIpID0+IHtcclxuICAgICAgICAgICAgaWYgKHBhcmFtZXRlci5uYW1lID09IHJlZmVyZW5jZSkge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBwYXJhbWV0ZXIudmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgdGhlIGFjdHVhbCB2YWx1ZSBmcm9tIHRoZSBjb25uZWN0ZWQgcGFyYW1ldGVyIG1hdGNoZXMgdGhlIHZhbHVlIGZyb20gdGhlIG1ldGFDb25maWd1cmF0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxyXG4gICAgICogQHBhcmFtIHsoc3RyaW5nW10gfCB1bmRlZmluZWQpfSBwYXJhbWV0ZXJWYWx1ZXNcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIGlzUmVmVmFsdWVNYXRjaGluZyh2YWx1ZTogc3RyaW5nLCBwYXJhbWV0ZXJWYWx1ZXM6IHN0cmluZ1tdIHwgdW5kZWZpbmVkKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGlzVmFsdWVNYXRjaGluZyA9IGZhbHNlO1xyXG4gICAgICAgIHBhcmFtZXRlclZhbHVlcyEuZm9yRWFjaCgocGFyYW1WYWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUgPT0gcGFyYW1WYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaXNWYWx1ZU1hdGNoaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBpc1ZhbHVlTWF0Y2hpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBKdXN0IHJldHVybiBpbnB1dCBwYXJhbWV0ZXJzIHdpdGggZmlsdGVyIGFjdGl2ZSBzdGF0dXMgPSBmYWxzZVxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXJbXX0gcGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybnMge01hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVyW119XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHVwZGF0ZUlucHV0UGFyYW1ldGVyc1Zpc2liaWxpdHkocGFyYW1ldGVyczogTWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXJbXSk6IE1hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVyW10ge1xyXG4gICAgICAgIGxldCBpbnB1dFBhcmFtZXRlcnMgPSBwYXJhbWV0ZXJzLmZpbHRlcihwYXJhbWV0ZXIgPT4geyByZXR1cm4gcGFyYW1ldGVyLmZpbHRlci5hY3RpdmUgPT09IGZhbHNlfSk7XHJcbiAgICAgICAgcmV0dXJuIGlucHV0UGFyYW1ldGVycztcclxuICAgIH1cclxuXHJcbn1cclxuXHJcblxyXG5jbGFzcyBNYXBwQ29ja3BpdFBhcmFtZXRlciBleHRlbmRzIE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbSB7XHJcblxyXG5cclxuICAgIC8vIEhvbGRzIHRoZSBwYXJhbWV0ZXJzIHR5cGVcclxuICAgIHByb3RlY3RlZCBfZGF0YVR5cGU6IE1hcHBDb2NrcGl0UGFyYW1ldGVyRGF0YVR5cGUgPSBuZXcgTWFwcENvY2twaXRQYXJhbWV0ZXJEYXRhVHlwZSgpO1xyXG4gICAgcHJvdGVjdGVkIF9lbnVtUmVmOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW0gPSBuZXcgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtKG51bGwpO1xyXG4gICAgcHJvdGVjdGVkIF9lbmdpbmVlcmluZ1VuaXQ6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwcm90ZWN0ZWQgX2lzV3JpdGVhYmxlOiBQcm9wZXJ0eTxib29sZWFuPiA9IFByb3BlcnR5LmNyZWF0ZTxib29sZWFuPihmYWxzZSx1bmRlZmluZWQsdW5kZWZpbmVkLCh2YWx1ZSk9PnRoaXMucGFyYW1ldGVySXNXcml0YWJsZSh2YWx1ZSkpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgcGFyYW1ldGVycyB2YWx1ZSBvYmplY3RcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHsoTWFwcENvY2twaXRQYXJhbWV0ZXJEYXRhVHlwZSl9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRQYXJhbWV0ZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBkYXRhVHlwZSgpOiBNYXBwQ29ja3BpdFBhcmFtZXRlckRhdGFUeXBlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YVR5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBkYXRhVHlwZShkYXRhVHlwZTogTWFwcENvY2twaXRQYXJhbWV0ZXJEYXRhVHlwZSkge1xyXG4gICAgICAgIHRoaXMuX2RhdGFUeXBlID0gZGF0YVR5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBlbmdpbmVlcmluZ1VuaXQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZW5naW5lZXJpbmdVbml0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgZW5naW5lZXJpbmdVbml0KGVuZ2luZWVyaW5nVW5pdDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fZW5naW5lZXJpbmdVbml0ID0gZW5naW5lZXJpbmdVbml0O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGVudW1UeXBlKCk6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VudW1SZWY7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBzZXQgZW51bVR5cGUoZW51bVJlZjogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtKSB7XHJcbiAgICAgICAgdGhpcy5fZW51bVJlZiA9IGVudW1SZWY7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBnZXQgaXNXcml0ZWFibGUoKTogUHJvcGVydHk8Ym9vbGVhbj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pc1dyaXRlYWJsZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXRlcm1pbmVzIGlmIHRoZSBwcm9wZXJ0aWVzIHZhbHVlIGlzIHdyaXRhYmxlLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHZhbHVlXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFBhcmFtZXRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHBhcmFtZXRlcklzV3JpdGFibGUod3JpdGFibGU6IGJvb2xlYW4pOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgd3JpdGFibGVWYWx1ZSA9IHdyaXRhYmxlO1xyXG4gICAgICAgIGxldCBtb2RlbCA9ICg8YW55PnRoaXMuY29tcG9uZW50KS5tb2RlbCBhcyBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbDtcclxuICAgICAgICBpZiAobW9kZWwpIHtcclxuICAgICAgICAgICAgd3JpdGFibGVWYWx1ZSA9IHdyaXRhYmxlICYmIG1vZGVsLndyaXRlQWNjZXNzO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gd3JpdGFibGVWYWx1ZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGdldCBkaXNwbGF5VmFsdWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZVRvU3RyaW5nKHRoaXMuX3ZhbHVlU291cmNlLnZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGRpc3BsYXlWYWx1ZShpbnB1dFZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgbmV3VmFsdWUgPSB0aGlzLnZhbHVlRnJvbVN0cmluZyhpbnB1dFZhbHVlKTtcclxuICAgICAgICB0aGlzLnZhbHVlID0gbmV3VmFsdWU7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJNYXBwQ29ja3BpdFBhcmFtZXRlci5zZXREaXNwbGF5VmFsdWUgJW8gZm9yICVvXCIsIHRoaXMudmFsdWUsIGlucHV0VmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY29udmVydHMgdGhlIHBhcmFtZXRlciB2YWx1ZSB0byBhIGZvcm1hdHRlZCBzdHJpbmdcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IF92YWx1ZVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFBhcmFtZXRlclxyXG4gICAgICovXHJcbiAgICB2YWx1ZVRvU3RyaW5nKF92YWx1ZTogYW55KTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgdmFsdWVTdHJpbmcgPVwiXCI7XHJcbiAgICAgICAgLy8gYXZvaWQgY29udmVydGluZyBudWxsIG9yIHVuZGVmaW5lZCB2YWx1ZVxyXG4gICAgICAgIGlmICh0aGlzLl92YWx1ZVNvdXJjZS52YWx1ZSAhPSBudWxsICYmIHRoaXMuX3ZhbHVlU291cmNlLnZhbHVlICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB2YWx1ZVN0cmluZyA9IHRoaXMuX3ZhbHVlU291cmNlLnZhbHVlLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIHZhbHVlU3RyaW5nID0gTnVtZXJpY0hlbHBlci5jb252ZXJ0TnVtZXJpY1N0cmluZyh2YWx1ZVN0cmluZywgdGhpcy5kYXRhVHlwZS5uYW1lKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZW51bVR5cGUuaXNEZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZVN0cmluZyA9IHRoaXMuZW51bVR5cGUuZ2V0RGlzcGxheVZhbHVlKHRoaXMuX3ZhbHVlU291cmNlLnZhbHVlKTtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdmFsdWVTdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjb252ZXJ0cyBhIHBhcmFtZXRlciB2YWx1ZSBzdHJpbmcgdG8gYSB2YWx1ZSBhY2NvcmRpbmcgdG8gdGhlIHBhcmFtZXRlcnMgZGF0YSB0eXBlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlucHV0VmFsdWVcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0UGFyYW1ldGVyXHJcbiAgICAgKi9cclxuICAgIHZhbHVlRnJvbVN0cmluZyhpbnB1dFZhbHVlOiBzdHJpbmcpOiBhbnkge1xyXG5cclxuICAgICAgICAvLyBzZXQgYW4gZW1wdHkgc3RyaW5nIGZvciBhbiB1bmRlZmluZWQgaW5wdXQgdmFsdWVcclxuICAgICAgICBsZXQgdmFsdWUgPSBpbnB1dFZhbHVlICE9PSB1bmRlZmluZWQgJiYgaW5wdXRWYWx1ZSAhPT0gbnVsbCA/IGlucHV0VmFsdWUgOiBcIlwiO1xyXG5cclxuICAgICAgICAvLyByZXBsYWNlIHRoZSBlbnVtIHN0cmluZyBieSB0aGUgdmFsdWUgaWYgdGhlcmUgaXMgb25lIGRlZmluZWQuXHJcbiAgICAgICAgaWYgKHRoaXMuZW51bVR5cGUuaXNEZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gdGhpcy5lbnVtVHlwZS5nZXRWYWx1ZShpbnB1dFZhbHVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcblxyXG4vKipcclxuICogVGhlIGNsYXNzIGltcGxlbWVudHMgYSBjb21wb25lbnQgcGFyYW1ldGVyXHJcbiAqXHJcbiAqIEBjbGFzcyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlclxyXG4gKi9cclxuY2xhc3MgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIgZXh0ZW5kcyBNYXBwQ29ja3BpdFBhcmFtZXRlciB7XHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbXBvbmVudDogTWFwcENvY2twaXRDb21wb25lbnRJdGVtIHwgbnVsbCwgbmFtZTogc3RyaW5nLCByZWZlcmVuY2U6IGFueSkge1xyXG4gICAgICAgIHN1cGVyKGNvbXBvbmVudCxuYW1lLHJlZmVyZW5jZSk7XHJcbiAgICAgICAgdGhpcy5fdmFsdWVTb3VyY2UgPSBQcm9wZXJ0eS5jcmVhdGU8YW55PihcIlwiLHVuZGVmaW5lZCwoZGF0YUxpbmspPT4gdGhpcy5yZXF1ZXN0V3JpdGVWYWx1ZShkYXRhTGluaykpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFdyaXRlcyB0aGUgY3VycmVudCBwYXJhbWV0ZXIgdmFsdWUgdG8gdGFyZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyXHJcbiAgICAgKi9cclxuICAgIHdyaXRlKHJlZmxlY3RlZFdyaXRlUmVzcG9uc2VEZWxlZ2F0ZTooKHJlc3VsdERhdGE6IGFueSk9PnZvaWQpfHVuZGVmaW5lZCl7XHJcblxyXG4gICAgICAgIC8vIGNvbm5lY3QgdGhlIHdyaXRlIHJlc3BvbnNlIGRlbGVnYXRlXHJcbiAgICAgICAgdGhpcy5yZWZsZWN0ZWRXcml0ZVJlc3BvbnNlRGVsZWdhdGUgPSByZWZsZWN0ZWRXcml0ZVJlc3BvbnNlRGVsZWdhdGU7XHJcblxyXG4gICAgICAgIC8vIGV4ZWN1dGUgd3JpdGluZyB0aGUgcGFyYW1ldGVyIHZhbHVlXHJcbiAgICAgICAgdGhpcy52YWx1ZVNvdXJjZS53cml0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogV3JpdGVzIHRoZSBkYXRhIGxpbmtzIHZhbHVlIHRvIHRhcmdldFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge1Byb3BlcnR5PGFueT59IGRhdGFMaW5rXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyByZXF1ZXN0V3JpdGVWYWx1ZShkYXRhTGluazpQcm9wZXJ0eTxhbnk+KTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbGV0IGNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50O1xyXG4gICAgICAgICAgICBpZiAoY29tcG9uZW50ICYmICg8YW55PmNvbXBvbmVudCkubW9kZWwpIHtcclxuICAgICAgICAgICAgICAgIHZhciBtb2RlbCA9ICg8YW55PmNvbXBvbmVudCkubW9kZWwgYXMgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWw7XHJcbiAgICAgICAgICAgICAgICBhd2FpdCBtb2RlbC53cml0ZUNvbXBvbmVudFBhcmFtZXRlcih0aGlzKTtcclxuICAgICAgICAgICAgICAgIGRhdGFMaW5rLndyaXRlUmVxdWVzdEV4ZWN1dGVkKG51bGwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgZGF0YUxpbmsud3JpdGVSZXF1ZXN0UmVqZWN0ZWQoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWF0ZXMgdGhlIG9ic2VydmF0aW9uIG9mIHBhcmFtZXRlciB2YWx1ZSBjaGFuZ2VzXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSB3YXRjaGFibGVQYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlclxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgb2JzZXJ2ZVBhcmFtZXRlclZhbHVlQ2hhbmdlcyhvYnNlcnZlcjogSU9ic2VydmVyLG9ic2VydmFibGVQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdKTogYW55IHtcclxuICAgICAgICBpZiAob2JzZXJ2YWJsZVBhcmFtZXRlcnMubGVuZ3RoID4gMCAmJiBvYnNlcnZhYmxlUGFyYW1ldGVyc1swXSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgLy8gZ2V0IHRoZSBwYXJhbWV0ZXJzIG1vZGVsIGZyb20gdGhlIHBhcmVudCBjb21wb25lbnRcclxuICAgICAgICAgICAgbGV0IG1vZGVsID0gTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIuZ2V0TW9kZWwob2JzZXJ2YWJsZVBhcmFtZXRlcnNbMF0pO1xyXG4gICAgICAgICAgICBpZiAobW9kZWwgJiYgbW9kZWwub2JzZXJ2ZURhdGFNb2RlbEl0ZW1zKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBpbnZva2UgdGhlIG9ic2VydmF0aW9uIG9uIHRoZSBtb2RlbFxyXG4gICAgICAgICAgICAgICAgbW9kZWwub2JzZXJ2ZURhdGFNb2RlbEl0ZW1zKG9ic2VydmVyLCBvYnNlcnZhYmxlUGFyYW1ldGVycyk7XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBY3RpdmF0ZXMgbW9kZWwgaXRlbXMgcmVnaXN0ZXJlZCBmb3Igb2JzZXJ2YXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0geyp9IG9ic2VydmVyXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IG9ic2VydmFibGVQYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlclxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYWN0aXZhdGVDb21wb25lbnRNb2RlbEl0ZW1zKG9ic2VydmVyOiBhbnksb2JzZXJ2YWJsZVBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pOiBhbnkge1xyXG4gICAgICAgIC8vVE9ETzogaW1wbGVtZW50IG1vZGVsIGl0ZW0gYWN0aXZhdGlvbiBoYW5kbGluZ1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVub2JzZXJ2ZXMgYWxsIG9ic2VydmFibGVzIGFzc29jaWF0ZWQgd2l0aCB0aGUgb2JzZXJ2ZXJcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0geyp9IG9ic2VydmVyXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IG9ic2VydmVkUGFyYW1ldGVyc1xyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbc3VzcGVuZD10cnVlXSBzdXNwZW5kcyB0aGUgb2JzZXJ2YXRpb24gaWYgdHJ1ZSBvdGhlcndpc2UgcmVtb3ZlcyB0aGUgd2hvbGUgc3Vic2NyaXB0aW9uXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHVub2JzZXJ2ZUNvbXBvbmVudE1vZGVsSXRlbXMob2JzZXJ2ZXI6IGFueSxvYnNlcnZlZFBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10sIHN1c3BlbmQ6Ym9vbGVhbiA9IHRydWUpIHtcclxuICAgICAgICBpZiAob2JzZXJ2ZWRQYXJhbWV0ZXJzLmxlbmd0aCA+IDAgJiYgb2JzZXJ2ZWRQYXJhbWV0ZXJzWzBdICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBsZXQgbW9kZWwgPSBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlci5nZXRNb2RlbChvYnNlcnZlZFBhcmFtZXRlcnNbMF0pO1xyXG4gICAgICAgICAgICBpZiAobW9kZWwgJiYgbW9kZWwudW5vYnNlcnZlQ29tcG9uZW50TW9kZWxJdGVtcykge1xyXG4gICAgICAgICAgICAgICAgLy8gaW52b2tlIHRoZSB1bm9ic2VydmF0aW9uIG9uIHRoZSBtb2RlbFxyXG4gICAgICAgICAgICAgICAgbW9kZWwudW5vYnNlcnZlQ29tcG9uZW50TW9kZWxJdGVtcyhvYnNlcnZlciwgb2JzZXJ2ZWRQYXJhbWV0ZXJzLHN1c3BlbmQpO1xyXG4gICAgICAgICAgICB9ICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlYWN0aXZhdGVzIG1vZGVsIGl0ZW1zIHJlZ2lzdGVyZWQgZm9yIG9ic2VydmF0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHsqfSBvYnNlcnZlclxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSBvYnNlcnZlZFBhcmFtZXRlcnNcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW3N1c3BlbmQ9dHJ1ZV1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlclxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZGVhY3RpdmF0ZUNvbXBvbmVudE1vZGVsSXRlbXMob2JzZXJ2ZXI6IGFueSxvYnNlcnZlZFBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10sIHN1c3BlbmQ6Ym9vbGVhbiA9IHRydWUpIHtcclxuICAgICAgICAvL1RPRE86IGltcGxlbWVudCBtb2RlbCBpdGVtIGRlYWN0aXZhdGlvbiBoYW5kbGluZ1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHBhcmFtZXRlcnMgbW9kZWxcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSBvYnNlcnZhYmxlUGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZXRNb2RlbChjb21wb25lbnRQYXJhbWV0ZXI6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyKSB7XHJcbiAgICAgICAgaWYgKCFjb21wb25lbnRQYXJhbWV0ZXIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImNvbXBvbmVudFBhcmFtZXRlciB1bmRlZmluZWQgIVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFjb21wb25lbnRQYXJhbWV0ZXIuY29tcG9uZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJjb21wb25lbnRQYXJhbWV0ZXIuY29tcG9uZW50IHVuZGVmaW5lZCAhXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKDxhbnk+Y29tcG9uZW50UGFyYW1ldGVyLmNvbXBvbmVudCkubW9kZWwgYXMgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWw7XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG5cclxuY2xhc3MgTWFwcENvY2twaXRTdGF0ZVBhcmFtZXRlciB7XHJcblxyXG4gICAgcHJpdmF0ZSBfbmFtZSA6IHN0cmluZztcclxuICAgIHByaXZhdGUgX2V4cHJlc3Npb24gOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF9pY29uO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgZXhwcmVzc2lvbjogc3RyaW5nLCBpY29uKSB7XHJcbiAgICAgICAgdGhpcy5fbmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5fZXhwcmVzc2lvbiA9IGV4cHJlc3Npb247XHJcbiAgICAgICAgdGhpcy5faWNvbiA9IGljb247XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBuYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBleHByZXNzaW9uKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V4cHJlc3Npb247XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBpY29uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pY29uO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogaW1wbGVtZW50cyBhIG1ldGhvZCBwYXJhbWV0ZXJcclxuICpcclxuICogQGNsYXNzIE1hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVyXHJcbiAqIEBleHRlbmRzIHtNYXBwQ29ja3BpdFBhcmFtZXRlcn1cclxuICovXHJcbmNsYXNzIE1hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVyIGV4dGVuZHMgTWFwcENvY2twaXRQYXJhbWV0ZXIge1xyXG5cclxuICAgIHByaXZhdGUgX2ZpbHRlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb21wb25lbnQ6IE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbSB8IG51bGwsIG5hbWU6IHN0cmluZywgcmVmZXJlbmNlOiBhbnkpIHtcclxuICAgICAgICBzdXBlcihjb21wb25lbnQsIG5hbWUsIHJlZmVyZW5jZSk7XHJcbiAgICAgICAgdGhpcy5fZmlsdGVyID0gbmV3IG1ldGhvZEZpbHRlcigpXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGZpbHRlcigpOiBtZXRob2RGaWx0ZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9maWx0ZXI7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIE1hcHBDb2NrcGl0UXVpY2tDb21tYW5kUGFyYW1ldGVyIHtcclxuXHJcbiAgICBwcml2YXRlIF9uYW1lIDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfdG9vbHRpcCA6IHN0cmluZztcclxuICAgIHByaXZhdGUgX2ltYWdlTmFtZSA6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHRvb2x0aXA6IHN0cmluZywgaW1hZ2VOYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLl90b29sdGlwID0gdG9vbHRpcDtcclxuICAgICAgICB0aGlzLl9pbWFnZU5hbWUgPSBpbWFnZU5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBuYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCB0b29sdGlwKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Rvb2x0aXA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBpbWFnZU5hbWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ltYWdlTmFtZTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIGRlZmluZXMgdGhlIHBhcmFtZXRlciBkYXRhIHR5cGVcclxuICpcclxuICogQGNsYXNzIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRGF0YVR5cGVcclxuICovXHJcbmNsYXNzIE1hcHBDb2NrcGl0UGFyYW1ldGVyRGF0YVR5cGUge1xyXG4gICAgcHJpdmF0ZSBfZGF0YVR5cGVJZCA9IFwidW5kZWZpbmVkXCI7XHJcbiAgICBwcml2YXRlIF9kYXRhVHlwZU5hbWUgPSBcInVuZGVmaW5lZFwiO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGRhdGFUeXBlSWQ6IHN0cmluZyA9IFwidW5kZWZpbmVkXCIsIGRhdGFUeXBlTmFtZTogc3RyaW5nID0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgIHRoaXMuX2RhdGFUeXBlSWQgPSBkYXRhVHlwZUlkO1xyXG4gICAgICAgIHRoaXMuX2RhdGFUeXBlTmFtZSA9IGRhdGFUeXBlTmFtZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGdldCBpZCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLCB0aGlzLl9kYXRhVHlwZUlkXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBuYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFUeXBlTmFtZVxyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogaW1wbGVtZW50cyBhIHNpbmdsZSBlbnVtIHZhbHVlIHdpdGggdmFsdWUgYW5kIHN0cmluZ1xyXG4gKlxyXG4gKiBAY2xhc3MgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtVmFsdWVcclxuICovXHJcbmNsYXNzIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bVZhbHVlIGltcGxlbWVudHMgSVZhbHVlTGlzdEl0ZW0ge1xyXG4gICAgX2Rpc3BsYXlWYWx1ZTogc3RyaW5nID0gXCJ1bmRlZmluZWRcIjtcclxuICAgIF92YWx1ZTogYW55ID0gbnVsbDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtVmFsdWUuXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGlzcGxheVRleHRcclxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWVcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW1WYWx1ZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihkaXNwbGF5VGV4dDogc3RyaW5nLCB2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fZGlzcGxheVZhbHVlID0gZGlzcGxheVRleHQ7XHJcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldHMgdGhlIHZhbHVlIG9mIHRoZSBlbnVtXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW1WYWx1ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHZhbHVlKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0cyB0aGUgc3RyaW5nIG9mIHRoZSBlbnVtIHZhbHVlXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bVZhbHVlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgZGlzcGxheVZhbHVlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc3BsYXlWYWx1ZTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBpbXBsZW1lbnRzIGEgcGFyYW1ldGVyIGVudW0gaG9sZGluZyBhIGNvbGxlY3Rpb24gb2YgZW51bSBpdGVtc1xyXG4gKlxyXG4gKiBAY2xhc3MgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtXHJcbiAqL1xyXG5jbGFzcyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW0ge1xyXG5cclxuICAgIHByaXZhdGUgX2Jyb3dzZU5hbWU6IHN0cmluZyA9IFwiXCI7XHJcblxyXG4gICAgX2VudW1WYWx1ZXNSZWZlcmVuY2U6IGFueTtcclxuXHJcbiAgICBwcml2YXRlIF9lbnVtVmFsdWVzITogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtVmFsdWVbXTtcclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IoZW51bVZhbHVlc1JlZmVyZW5jZTogYW55ID0gbnVsbCkge1xyXG4gICAgICAgIHRoaXMuX2VudW1WYWx1ZXNSZWZlcmVuY2UgPSBlbnVtVmFsdWVzUmVmZXJlbmNlO1xyXG4gICAgICAgIGlmICh0aGlzLl9lbnVtVmFsdWVzUmVmZXJlbmNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Jyb3dzZU5hbWUgPSB0aGlzLl9lbnVtVmFsdWVzUmVmZXJlbmNlLmJyb3dzZU5hbWU7XHJcbiAgICAgICAgICAgIHRoaXMuX2VudW1WYWx1ZXMgPSB0aGlzLl9lbnVtVmFsdWVzUmVmZXJlbmNlLmVudW1WYWx1ZXMubWFwKChlbnVtVmFsdWVSZWYpID0+IHsgcmV0dXJuIG5ldyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW1WYWx1ZShlbnVtVmFsdWVSZWYuZGlzcGxheU5hbWUudGV4dCwgZW51bVZhbHVlUmVmLnZhbHVlKTsgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0cyB0aGUgYnJvd3NlIG5hbWUgb2YgdGhlIGVudW1cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgYnJvd3NlTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9lbnVtVmFsdWVzUmVmZXJlbmNlLmJyb3dzZU5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXRzIHRoZSBjb2xsZWN0aW9uIG9mIGVudW0gaXRlbXNcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW1WYWx1ZVtdfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHZhbHVlcygpOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW1WYWx1ZVtdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZW51bVZhbHVlcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGRldGVybWluZXMgaWYgdGhlIGVudW0gaXMgZGVmaW5lZCBhbmQgY29udGFpbnMgdmFsdWVzXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBpc0RlZmluZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VudW1WYWx1ZXMgJiYgdGhpcy5fZW51bVZhbHVlcy5sZW5ndGggPiAwO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldHMgYSBzdHJpbmcgbWF0Y2hpbmcgdGhlIHNwZWNpZmllZCBlbnVtIHZhbHVlLCBvdGhlcndpc2UgcmV0dXJuIHZhbHVlIHN0cmluZyBhcyBkZWZhdWx0LlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bVxyXG4gICAgICovXHJcbiAgICBnZXREaXNwbGF5VmFsdWUoZW51bVZhbHVlOiBhbnkpOiBzdHJpbmcge1xyXG4gICAgICAgIC8vIGdldCBhbiBlbnVtIGl0ZW0gbWF0Y2hpbmcgdGhlIHJlcXVlc3RlZCB2YWx1ZVxyXG4gICAgICAgIGxldCBtYXRjaGluZ0VudW1JdGVtID0gdGhpcy5maW5kTWF0Y2hpbmdFbnVtSXRlbUJ5VmFsdWUoZW51bVZhbHVlKTtcclxuXHJcbiAgICAgICAgLy8gdXBkYXRlIHRoZSB2YWx1ZSBzdHJpbmcgdG8gdGhlIG1hdGNoaW5nIG9uZSBvciB1c2UgdGhlIGRlZmF1bHQgc3RyaW5nXHJcbiAgICAgICAgbGV0IGVudW1WYWx1ZVN0cmluZyA9IG1hdGNoaW5nRW51bUl0ZW0gPyBtYXRjaGluZ0VudW1JdGVtLmRpc3BsYXlWYWx1ZSA6IGVudW1WYWx1ZS50b1N0cmluZygpO1xyXG5cclxuICAgICAgICByZXR1cm4gZW51bVZhbHVlU3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW5wdXRWYWx1ZVxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtXHJcbiAgICAgKi9cclxuICAgIGdldFZhbHVlKGVudW1EaXNwbGF5VmFsdWU6IHN0cmluZyk6IGFueSB7XHJcbiAgICAgICAgbGV0IGVudW1WYWx1ZSA9IGVudW1EaXNwbGF5VmFsdWU7XHJcbiAgICAgICAgLy8gZ2V0IGFuIGVudW0gaXRlbSBtYXRjaGluZyB0aGUgcmVxdWVzdGVkIHN0cmluZ1xyXG4gICAgICAgIGxldCBtYXRjaGluZ0VudW1JdGVtID0gdGhpcy5maW5kTWF0Y2hpbmdFbnVtSXRlbUJ5U3RyaW5nKGVudW1EaXNwbGF5VmFsdWUpO1xyXG4gICAgICAgIGlmIChtYXRjaGluZ0VudW1JdGVtKSB7XHJcbiAgICAgICAgICAgIGVudW1WYWx1ZSA9IG1hdGNoaW5nRW51bUl0ZW0udmFsdWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bS5nZXRWYWx1ZTogY291bGQgbm90IGZpbmQgbWF0Y2hpbmcgZW51bSB2YWx1ZSBmb3IgJW9cIiwgZW51bURpc3BsYXlWYWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZW51bVZhbHVlO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBmaW5kIGFuIGVudW0gaXRlbSB3aXRoIG1hdGNoaW5nIHZhbHVlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gZW51bVZhbHVlXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGZpbmRNYXRjaGluZ0VudW1JdGVtQnlWYWx1ZShlbnVtVmFsdWU6IGFueSkge1xyXG4gICAgICAgIGxldCBtYXRjaGluZ0VudW1JdGVtID0gdGhpcy5fZW51bVZhbHVlcy5maWx0ZXIoKGVudW1JdGVtKSA9PiB7IHJldHVybiBlbnVtSXRlbS52YWx1ZSA9PSBlbnVtVmFsdWU7IH0pO1xyXG4gICAgICAgIHJldHVybiBtYXRjaGluZ0VudW1JdGVtLmxlbmd0aCA9PT0gMSA/IG1hdGNoaW5nRW51bUl0ZW1bMF0gOiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBmaW5kIGFuIGVudW0gaXRlbSB3aXRoIG1hdGNoaW5nIHN0cmluZ1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBlbnVtRGlzcGxheVZhbHVlXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW1cclxuICAgICAqL1xyXG4gICAgZmluZE1hdGNoaW5nRW51bUl0ZW1CeVN0cmluZyhlbnVtRGlzcGxheVZhbHVlOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgICAgIGxldCBtYXRjaGluZ0VudW1JdGVtID0gdGhpcy5fZW51bVZhbHVlcy5maWx0ZXIoKGVudW1JdGVtKSA9PiB7IHJldHVybiBlbnVtSXRlbS5kaXNwbGF5VmFsdWUgPT09IGVudW1EaXNwbGF5VmFsdWU7IH0pO1xyXG4gICAgICAgIHJldHVybiBtYXRjaGluZ0VudW1JdGVtLmxlbmd0aCA9PT0gMSA/IG1hdGNoaW5nRW51bUl0ZW1bMF0gOiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG5cclxuZXhwb3J0IHtcclxuICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50LCBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlciwgTWFwcENvY2twaXRTdGF0ZVBhcmFtZXRlciwgTWFwcENvY2twaXRRdWlja0NvbW1hbmRQYXJhbWV0ZXIsIE1hcHBDb2NrcGl0UGFyYW1ldGVyRGF0YVR5cGUsIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bSwgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtVmFsdWUsIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLCBNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlciwgTWFwcENvY2twaXRDb21wb25lbnRJdGVtXHJcbn07XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4iXX0=