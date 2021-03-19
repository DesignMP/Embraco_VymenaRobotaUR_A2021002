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
define(["require", "exports", "../../framework/property", "../../framework/command", "./mappCockpitComponentReflection", "../../common/numericHelper", "../../widgets/methodParameterListWidget/methodFilter"], function (require, exports, property_1, command_1, mappCockpitComponentReflection_1, numericHelper_1, methodFilter_1) {
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
            this.methods.forEach(function (method) {
                // currently the methods executable write is directly depending on the write access
                method.isExecutable.value = writeAccess;
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
                // respect write access for user components otherwise enable method execution
                isExecutableValue = MappCockpitComponent.isUserComponent(this.component) ? model.writeAccess : true;
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
        function MappCockpitStateParameter(name, parameters, expression, icon) {
            this._name = name;
            this._parameters = parameters;
            this._expression = expression;
            this._icon = icon;
        }
        Object.defineProperty(MappCockpitStateParameter.prototype, "parameters", {
            get: function () {
                return this._parameters;
            },
            enumerable: true,
            configurable: true
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcENvY2twaXRDb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9vbmxpbmUvbWFwcENvY2twaXRDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQVdBOzs7Ozs7OztPQVFHO0lBQ0g7UUF3Qkk7Ozs7OztXQU1HO1FBQ0gsa0NBQVksU0FBMEMsRUFBRSxJQUFZLEVBQUUsU0FBYztZQTNCcEYsd0JBQXdCO1lBQ3hCLDhCQUE4QjtZQUM5Qix3QkFBd0I7WUFDZCxXQUFNLEdBQW9DLEVBQUUsQ0FBQztZQVE3QyxpQkFBWSxHQUFrQixtQkFBUSxDQUFDLE1BQU0sQ0FBTSxFQUFFLENBQUMsQ0FBQztZQUVqRSx1QkFBdUI7WUFDZixpQkFBWSxHQUF1QixtQkFBUSxDQUFDLE1BQU0sQ0FBVSxLQUFLLENBQUMsQ0FBQztZQUUzRSxpREFBaUQ7WUFDekMsb0NBQStCLEdBQTRDLFNBQVMsQ0FBQztZQVd6RixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztZQUM1QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUNoQyxDQUFDO1FBU0Qsc0JBQVcsaURBQVc7WUFQdEI7Ozs7OztlQU1HO2lCQUNIO2dCQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztZQUM3QixDQUFDO2lCQUVELFVBQXVCLFdBQW1CO2dCQUN0QyxJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQztZQUNwQyxDQUFDOzs7V0FKQTtRQU1ELHNCQUFXLGdEQUFVO2lCQUFyQjtnQkFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDO1lBQ3RDLENBQUM7OztXQUFBO1FBRUQsc0JBQVcsMENBQUk7aUJBQWY7Z0JBQ0ks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QUFFLGdCQUFnQixDQUFDLENBQUM7YUFDNUg7WUFFRCxPQUFPLFNBQVMsQ0FBQztRQUNyQixDQUFDO1FBSUQ7Ozs7Ozs7V0FPRztRQUNLLHVFQUEyQixHQUFuQyxVQUFvQyxTQUFjO1lBQzlDLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsVUFBQyxRQUFRLElBQU8sT0FBTyxRQUFRLENBQUMsS0FBSyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RHLE9BQU8sZ0JBQWdCLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUMzRSxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0gsd0VBQTRCLEdBQTVCLFVBQTZCLGdCQUF3QjtZQUNqRCxJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFVBQUMsUUFBUSxJQUFPLE9BQU8sUUFBUSxDQUFDLFlBQVksS0FBSyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JILE9BQU8sZ0JBQWdCLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUMzRSxDQUFDO1FBR0wsd0NBQUM7SUFBRCxDQUFDLEFBbkhELElBbUhDO0lBR21KLDhFQUFpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0YURhdGEgfSBmcm9tIFwiLi9tYXBwQ29ja3BpdENvbXBvbmVudE1ldGFEYXRhXCI7XHJcbmltcG9ydCB7IFByb3BlcnR5IH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9wcm9wZXJ0eVwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbCB9IGZyb20gXCIuL2NvbXBvbmVudHNEYXRhTW9kZWxcIjtcclxuaW1wb3J0IHsgQ29tbWFuZCwgSUNvbW1hbmRFeGVjdXRpb25EZWxlZ2F0ZSB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvY29tbWFuZFwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm8gfSBmcm9tIFwiLi9tYXBwQ29ja3BpdENvbXBvbmVudFJlZmxlY3Rpb25cIjtcclxuaW1wb3J0IHsgTnVtZXJpY0hlbHBlciB9IGZyb20gXCIuLi8uLi9jb21tb24vbnVtZXJpY0hlbHBlclwiO1xyXG5pbXBvcnQgeyBJT2JzZXJ2ZXIgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2ludGVyZmFjZXMvb2JzZXJ2ZXJcIjtcclxuaW1wb3J0IHsgSVZhbHVlTGlzdEl0ZW0gfSBmcm9tIFwiLi4vLi4vY29tbW9uL2ludGVyZmFjZXMvdmFsdWVMaXN0SXRlbUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBleHByLCBwYXJhbSB9IGZyb20gXCJqcXVlcnlcIjtcclxuaW1wb3J0IHsgbWV0aG9kRmlsdGVyIH0gZnJvbSBcIi4uLy4uL3dpZGdldHMvbWV0aG9kUGFyYW1ldGVyTGlzdFdpZGdldC9tZXRob2RGaWx0ZXJcIjtcclxuXHJcbi8qKlxyXG4gKiBJbXBsZW1lbnRzIHRoZSBiYXNlIG1lbWViZXJzIGZvciBtYW5hZ2luZyBjb21wb25lbnQgbW9kZWwgbWVtYmVycy5cclxuICpcclxuICogQGNsYXNzIE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbVxyXG4vKipcclxuICpcclxuICpcclxuICogQGNsYXNzIE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbVxyXG4gKi9cclxuY2xhc3MgTWFwcENvY2twaXRDb21wb25lbnRJdGVtIHtcclxuXHJcbiAgICAvLyBIb2xkcyBhIHJlZmVyZW5jZSB0byB0aGUgdW5kZXJseWluZyBpdGVtXHJcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3JlZmVyZW5jZTogYW55O1xyXG4gICAgLy8gSG9sZHMgdGhlIGl0ZW1zIHZhbHVlXHJcbiAgICAvLyBwcm90ZWN0ZWQgX3ZhbHVlOiBhbnkgPSBcIlwiO1xyXG4gICAgLy8gaG9sZHMgc3ViaXRlbXMgaWYgYW55XHJcbiAgICBwcm90ZWN0ZWQgX2l0ZW1zOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW0+ID0gW107XHJcblxyXG4gICAgLy8gaG9sZHMgdGhlIGRpYXBsYXkgbmFtZVxyXG4gICAgcHJvdGVjdGVkIF9kaXNwbGF5TmFtZTogYW55O1xyXG5cclxuICAgIC8vIGhvbGRzIHRoZSBjb21wb25lbnQgcmVwcmVzZW50aW5nIHRoZSBvd25lciBvZiB0aGUgY29tcG9uZW50IGl0ZW1cclxuICAgIHByb3RlY3RlZCBfY29tcG9uZW50OiBNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW0gfCBudWxsO1xyXG5cclxuICAgIHByb3RlY3RlZCBfdmFsdWVTb3VyY2U6IFByb3BlcnR5PGFueT4gPSBQcm9wZXJ0eS5jcmVhdGU8YW55PihcIlwiKTtcclxuXHJcbiAgICAvLyBob2xkcyB0aGUgdXNlciByb2xlc1xyXG4gICAgcHJpdmF0ZSBfd3JpdGVBY2Nlc3M6IFByb3BlcnR5PGJvb2xlYW4+ID0gIFByb3BlcnR5LmNyZWF0ZTxib29sZWFuPihmYWxzZSk7XHJcblxyXG4gICAgLy8gc3BlY2lmaWVzIGEgcmVzcG9uc2UgZGVsYWdldCBmb3Igd3JpdGUgcmVxdWV0c1xyXG4gICAgcHJpdmF0ZSBfcmVmbGVjdGVkV3JpdGVSZXNwb25zZURlbGVnYXRlOiAoKHJlc3VsdERhdGE6IGFueSkgPT4gdm9pZCkgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW0uXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50SXRlbX0gY29tcG9uZW50XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gICAgICogQHBhcmFtIHsqfSByZWZlcmVuY2VcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW1cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoY29tcG9uZW50OiBNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW0gfCBudWxsLCBuYW1lOiBzdHJpbmcsIHJlZmVyZW5jZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fcmVmZXJlbmNlID0gcmVmZXJlbmNlO1xyXG4gICAgICAgIHRoaXMuX2Rpc3BsYXlOYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLl9jb21wb25lbnQgPSBjb21wb25lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBpdGVtcyBkaXNwbGF5IG5hbWUgXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGRpc3BsYXlOYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc3BsYXlOYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgZGlzcGxheU5hbWUoZGlzcGxheU5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2Rpc3BsYXlOYW1lID0gZGlzcGxheU5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBicm93c2VOYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlZmVyZW5jZS5icm93c2VOYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yZWZlcmVuY2UubmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvbXBvbmVudCgpOiBNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW0gfCBudWxsIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29tcG9uZW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgY3VycmVudCB1c2VyIHJvbGVzXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nW119XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCB3cml0ZUFjY2VzcygpIDogUHJvcGVydHk8Ym9vbGVhbj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl93cml0ZUFjY2VzcztcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBpdGVtcyBpZFxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBpZCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yZWZlcmVuY2Uubm9kZUlkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogc2V0cy9nZXRzIHRoZSBpdGVtcyB2YWx1ZSBvYmplY3RcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHsoTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJWYWx1ZXx1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgdmFsdWUoKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWVTb3VyY2UudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCB2YWx1ZSh2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fdmFsdWVTb3VyY2UudmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHZhbHVlU291cmNlKCk6IFByb3BlcnR5PGFueT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZVNvdXJjZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHZhbHVlU291cmNlKHZhbHVlU291cmNlOiBQcm9wZXJ0eTxhbnk+KSB7XHJcbiAgICAgICB0aGlzLl92YWx1ZVNvdXJjZSA9IHZhbHVlU291cmNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyBhIGRlbGVnYXRlIGZvciBvYnNlcnZpbmcgd3JpdGUgcmVzcG9uc2VzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IHJlZmxlY3RlZFdyaXRlUmVzcG9uc2VEZWxlZ2F0ZShyZWZsZWN0ZWRXcml0ZVJlc3BvbnNlRGVsZWdhdGU6KChyZWZsZWN0ZWRXcml0ZVJlc3BvbnNlVmFsdWU6YW55KT0+dm9pZCl8dW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5fcmVmbGVjdGVkV3JpdGVSZXNwb25zZURlbGVnYXRlID0gcmVmbGVjdGVkV3JpdGVSZXNwb25zZURlbGVnYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgZGVsZWdhdGUgZm9yIG9ic2VydmluZyB3cml0ZSByZXNwb21zZXNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRJdGVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgcmVmbGVjdGVkV3JpdGVSZXNwb25zZURlbGVnYXRlKCk6KChyZWZsZWN0ZWRXcml0ZVJlc3BvbnNlVmFsdWU6YW55KT0+dm9pZCl8dW5kZWZpbmVke1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yZWZsZWN0ZWRXcml0ZVJlc3BvbnNlRGVsZWdhdGU7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldHMgdGhlIHZhbHVlIGFzIGZvcm1hdHRlZCBzdHJpbmcgaWYgYXBwcm9waWF0ZVxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGRpc3BsYXlWYWx1ZSgpOiBTdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZVNvdXJjZS50b1N0cmluZygpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgc2V0IGRpc3BsYXlWYWx1ZShpbnB1dFZhbHVlOiBTdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl92YWx1ZVNvdXJjZS52YWx1ZSA9IGlucHV0VmFsdWU7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBnZXQgZGF0YVR5cGVJZCgpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yZWZlcmVuY2UuZGF0YVR5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXRzIHRoZSBzdWJpdGVtcyBpZiBhbnlcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW0+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGl0ZW1zKCk6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVtcztcclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIFRoZSBjbGFzcyByZXByZXNlbnRzIGEgY29tcG9uZW50IHRvIGJlIHVzZWQgd2l0aGluIG1hcHAgY29ja3BpdCBVSVxyXG4gKlxyXG4gKiBAY2xhc3MgTWFwcENvY2twaXRDb21wb25lbnRcclxuICovXHJcbmNsYXNzIE1hcHBDb2NrcGl0Q29tcG9uZW50IGV4dGVuZHMgTWFwcENvY2twaXRDb21wb25lbnRJdGVtIHtcclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSG9sZHMgdGhlIGNvbXBvbmVudCBtZXRob2RzXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHR5cGUge0FycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kPn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFxyXG4gICAgICovXHJcblxyXG4gICAgLy8gSG9sZHMgdGhlIGNvbXBvbmVudCBtZXRob2RzXHJcbiAgICBwcml2YXRlIF9tZXRob2RzOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZD4gPSBbXTtcclxuICAgIHByaXZhdGUgX3F1aWNrQ29tbWFuZHM6IEFycmF5PE1hcHBDb2NrcGl0UXVpY2tDb21tYW5kUGFyYW1ldGVyPiA9IFtdO1xyXG4gICAgcHJpdmF0ZSBfdXNlck1ldGhvZHM6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kPiA9IFtdO1xyXG5cclxuICAgIC8vIEhvbGRzIHRoZSBjb21wb25lbnQgcGFyYW1ldGVyc1xyXG4gICAgcHJpdmF0ZSBfcGFyYW1ldGVyczogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+ID0gW107XHJcbiAgICBwcml2YXRlIF93YXRjaGFibGVQYXJhbWV0ZXJzOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4gPSBbXTtcclxuICAgIHByaXZhdGUgX3dhdGNoYWJsZVN0YXRlUGFyYW1ldGVyczogQXJyYXk8TWFwcENvY2twaXRTdGF0ZVBhcmFtZXRlcj4gPSBbXTtcclxuICAgIHByaXZhdGUgX2NvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4gPSBbXTsgICAgXHJcbiAgICBwcml2YXRlIF9tZXNzYWdlUGFyYW1ldGVyczogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+ID0gW107XHJcbiAgICBcclxuXHJcbiAgICBwcml2YXRlIF9tZXRhRGF0YTogTWFwcENvY2twaXRDb21wb25lbnRNZXRhRGF0YXx1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF9wYXJhbWV0ZXJzU291cmNlOiBQcm9wZXJ0eTxBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4+ID0gUHJvcGVydHkuY3JlYXRlPEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPj4oW10sKGRhdGFMaW5rKT0+e3RoaXMucmVxdWVzdFJlYWRDb21wb25lbnRQYXJhbWV0ZXJzKGRhdGFMaW5rKTt9KTtcclxuICAgIHByaXZhdGUgX21lc3NhZ2VQYXJhbWV0ZXJzU291cmNlOiBQcm9wZXJ0eTxBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4+ID0gUHJvcGVydHkuY3JlYXRlPEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPj4oW10sKGRhdGFMaW5rKT0+e3RoaXMucmVxdWVzdFJlYWRDb21wb25lbnRQYXJhbWV0ZXJzKGRhdGFMaW5rKTt9KTtcclxuICAgIHByaXZhdGUgX3dhdGNoYWJsZVBhcmFtZXRlcnNTb3VyY2U6IFByb3BlcnR5PEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPj4gPSBQcm9wZXJ0eS5jcmVhdGU8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+PihbXSwoZGF0YUxpbmspPT57dGhpcy5yZXF1ZXN0UmVhZENvbXBvbmVudFBhcmFtZXRlcnMoZGF0YUxpbmspO30pO1xyXG4gICAgcHJpdmF0ZSBfY29uZmlndXJhdGlvblBhcmFtZXRlcnNTb3VyY2U6IFByb3BlcnR5PEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPj4gPSBQcm9wZXJ0eS5jcmVhdGU8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+PihbXSwoZGF0YUxpbmspPT57dGhpcy5yZXF1ZXN0UmVhZENvbXBvbmVudFBhcmFtZXRlcnMoZGF0YUxpbmspO30pO1xyXG4gICBcclxuICAgIHByaXZhdGUgX21ldGhvZHNTb3VyY2U6IFByb3BlcnR5PEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kPj4gPSBQcm9wZXJ0eS5jcmVhdGU8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRNZXRob2Q+PihbXSwoZGF0YUxpbmspPT57dGhpcy5yZXF1ZXN0UmVhZENvbXBvbmVudE1ldGhvZHMoZGF0YUxpbmspO30pO1xyXG4gICAgcHJpdmF0ZSBfY29tbWFuZENvbm5lY3QgPSBDb21tYW5kLmNyZWF0ZTxhbnksYW55Pih0aGlzLCB0aGlzLmV4ZWN1dGVDb21tYW5kQ29ubmVjdCgpKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIHNldHMvZ2V0cyB0aGUgcGFyYW1ldGVycyBvZiB0aGUgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgXHJcbiAgICBwdWJsaWMgZ2V0IGNvbW1hbmRDb25uZWN0Q29tcG9uZW50KCkgOiBDb21tYW5kPGFueSxhbnk+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29tbWFuZENvbm5lY3Q7XHJcbiAgICB9XHJcbiAgICBcclxuXHJcblxyXG4gICAgcHJpdmF0ZSBleGVjdXRlQ29tbWFuZENvbm5lY3QoKTogSUNvbW1hbmRFeGVjdXRpb25EZWxlZ2F0ZTxhbnksYW55PiB7XHJcbiAgICAgICAgcmV0dXJuIGFzeW5jIChjb21tYW5kUGFycyxjb21tYW5kUmVzcG9uc2UpID0+IHsgXHJcbiAgICAgICAgICAgIGxldCBtb2RlbCA9ICg8YW55PnRoaXMpLm1vZGVsIGFzIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG1vZGVsKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyByZWFkIHBhcmFtZXRlciBjb21wb25lbnQgc2V0XHJcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgbW9kZWwuYnJvd3NlQ29tcG9uZW50KHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBpbnRpdGlhbGx5IHVwZGF0ZSB0aGUgY29tcG9uZW50cyBhY2Nlc3MgcmlnaHRzXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVDb21wb25lbnRBY2Nlc3NSaWdodHMobW9kZWwpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyB3YXRjaCBhY2Nlc3MgcmlnaHQgY2hhbmdlc1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2JzZXJ2ZUNvbXBvbmVudEFjY2Vzc1JpZ2h0cyhtb2RlbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgZGF0YSBsaW5rXHJcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZFJlc3BvbnNlLmV4ZWN1dGVkKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb21tYW5kUmVzcG9uc2UucmVqZWN0ZWQoZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9ic2VydmVzIGNoYW5nZXMgb2YgdGhlIGFjY2VzcyByaWdodHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbH0gbWFpbk1vZGVsXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvYnNlcnZlQ29tcG9uZW50QWNjZXNzUmlnaHRzKG1haW5Nb2RlbDogTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWwpIHtcclxuICAgICAgICBtYWluTW9kZWwudXNlclJvbGVzLmNoYW5nZWQoKHVzZXJSb2xlcykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbXBvbmVudEFjY2Vzc1JpZ2h0cyhtYWluTW9kZWwpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgY29tcG9uZW50cnMgYWNjZXNzIHJpZ2h0c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsfSBtYWluTW9kZWxcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZUNvbXBvbmVudEFjY2Vzc1JpZ2h0cyhtYWluTW9kZWw6IE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsKSB7XHJcbiAgICAgICAgbGV0IHdyaXRlQWNjZXNzID0gbWFpbk1vZGVsLndyaXRlQWNjZXNzO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwidXNlciByb2xlcyBjaGFuZ2VkICVvIHdyaXRlIGFjY2VzcyA9JW9cIiwgbWFpbk1vZGVsLnVzZXJSb2xlcy52YWx1ZSwgd3JpdGVBY2Nlc3MpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlQ29tcG9uZW50TWVtYmVyQWNjZXNzUmlnaHRzKHdyaXRlQWNjZXNzKTtcclxuICAgICAgICB0aGlzLndyaXRlQWNjZXNzLnZhbHVlID0gd3JpdGVBY2Nlc3M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBhY2Nlc3MgcmlnaHRzIG9mIGNvbXBvbmVudCBtZW1iZXJzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSB3cml0ZUFjY2Vzc1xyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgdXBkYXRlQ29tcG9uZW50TWVtYmVyQWNjZXNzUmlnaHRzKHdyaXRlQWNjZXNzOiBib29sZWFuKTogYW55IHtcclxuICAgICAgIHRoaXMudXBkYXRlUGFyYW1ldGVyQWNjZXNzUmlnaHRzKHdyaXRlQWNjZXNzKTtcclxuICAgICAgIHRoaXMudXBkYXRlTWV0aG9kc0FjY2Vzc1JpZ2h0cyh3cml0ZUFjY2Vzcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBwYXJhbWV0ZXJzIGFjY2VzcyByaWdodHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlUGFyYW1ldGVyQWNjZXNzUmlnaHRzKHdyaXRlQWNjZXNzOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLmZvckVhY2goKHBhcmFtZXRlcikgPT4ge1xyXG4gICAgICAgICAgICAvLyByZXdyaXRlIHRoZSBwYXJhbWV0ZXJzIHdyaXRlIGFjY2VzcyBwcm9wZXJ0eSB3aXRoIGl0cyBvcmlnaW5hbCByYXcgdmFsdWUgdG8gZm9yY2UgdHJpZ2dlcmluZyB0aGUgY2hhbmdlZCBldmVudC4gVGhpcyBpcyBqdXN0IGEgd29ya2Fyb3VuZFxyXG4gICAgICAgICAgICAvLyB0byBmaXggdGhlIGxvZyBpbi9vdXQgcHJvYmxlbSBkaXNwbGF5aW5nIHdyb25nIHJlYWRvbmx5IHN0YXRlcy5cclxuICAgICAgICAgICAgLy8gdGhlIHdvcmthcm91bmQgaXMgaW50ZW5kZWQgdG8gYmUgcmVwbGFjZWQgYnkgcHJvcGVyIGJhdGNoIHJlZnJlc2ggcmVxdWVzdHMhXHJcbiAgICAgICAgICAgIHBhcmFtZXRlci5pc1dyaXRlYWJsZS52YWx1ZSA9ICg8YW55PnBhcmFtZXRlci5pc1dyaXRlYWJsZSkuX3ZhbHVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgbWV0aG9kcyBhY2Nlc3MgcmlnaHRzXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgdXBkYXRlTWV0aG9kc0FjY2Vzc1JpZ2h0cyh3cml0ZUFjY2VzczogYm9vbGVhbik6IGFueSB7XHJcbiAgICAgICAgdGhpcy5tZXRob2RzLmZvckVhY2goKG1ldGhvZCkgPT4ge1xyXG4gICAgICAgICAgICAvLyBjdXJyZW50bHkgdGhlIG1ldGhvZHMgZXhlY3V0YWJsZSB3cml0ZSBpcyBkaXJlY3RseSBkZXBlbmRpbmcgb24gdGhlIHdyaXRlIGFjY2Vzc1xyXG4gICAgICAgICAgICBtZXRob2QuaXNFeGVjdXRhYmxlLnZhbHVlID0gd3JpdGVBY2Nlc3M7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBzZXRzL2dldHMgdGhlIHBhcmFtZXRlcnMgb2YgdGhlIGNvbXBvbmVudFxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge0FycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBnZXQgbWV0aG9kcygpOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tZXRob2RzO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBtZXRob2RzKG1ldGhvZHM6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kPikge1xyXG4gICAgICAgIHRoaXMuX21ldGhvZHMgPSBtZXRob2RzO1xyXG4gICAgICAgIHRoaXMuX21ldGhvZHNTb3VyY2UudmFsdWUgPSB0aGlzLl9tZXRob2RzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBtZXRob2RzU291cmNlKCk6IFByb3BlcnR5PEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kPj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tZXRob2RzU291cmNlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBxdWlja0NvbW1hbmRzKCk6IEFycmF5PE1hcHBDb2NrcGl0UXVpY2tDb21tYW5kUGFyYW1ldGVyPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3F1aWNrQ29tbWFuZHM7XHJcbiAgICB9IFxyXG5cclxuICAgIHNldCBxdWlja0NvbW1hbmRzKHF1aWNrQ29tbWFuZHM6IEFycmF5PE1hcHBDb2NrcGl0UXVpY2tDb21tYW5kUGFyYW1ldGVyPikge1xyXG4gICAgICAgIHRoaXMuX3F1aWNrQ29tbWFuZHMgPSBxdWlja0NvbW1hbmRzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB1c2VyTWV0aG9kcygpOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl91c2VyTWV0aG9kcztcclxuICAgIH1cclxuXHJcbiAgICBzZXQgdXNlck1ldGhvZHMobWV0aG9kczogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRNZXRob2Q+KSB7XHJcbiAgICAgICAgdGhpcy5fdXNlck1ldGhvZHMgPSBtZXRob2RzO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIHNldHMvZ2V0cyB0aGUgcGFyYW1ldGVycyBvZiB0aGUgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIGdldCBwYXJhbWV0ZXJzKCk6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcmFtZXRlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHBhcmFtZXRlcnMocGFyYW1ldGVyczogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+KSB7XHJcbiAgICAgICAgdGhpcy5fcGFyYW1ldGVycyA9IHBhcmFtZXRlcnM7XHJcbiAgICAgICAgdGhpcy5fcGFyYW1ldGVyc1NvdXJjZS52YWx1ZSA9IHRoaXMuX3BhcmFtZXRlcnM7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGdldCB3YXRjaGFibGVQYXJhbWV0ZXJzKCk6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dhdGNoYWJsZVBhcmFtZXRlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHdhdGNoYWJsZVBhcmFtZXRlcnMocGFyYW1ldGVyczogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+KSB7XHJcbiAgICAgICAgdGhpcy5fd2F0Y2hhYmxlUGFyYW1ldGVycyA9IHBhcmFtZXRlcnM7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldCB3YXRjaGFibGVTdGF0ZVBhcmFtZXRlcnMoKTogQXJyYXk8TWFwcENvY2twaXRTdGF0ZVBhcmFtZXRlcj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl93YXRjaGFibGVTdGF0ZVBhcmFtZXRlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHdhdGNoYWJsZVN0YXRlUGFyYW1ldGVycyhwYXJhbWV0ZXJzOiBBcnJheTxNYXBwQ29ja3BpdFN0YXRlUGFyYW1ldGVyPikge1xyXG4gICAgICAgIHRoaXMuX3dhdGNoYWJsZVN0YXRlUGFyYW1ldGVycyA9IHBhcmFtZXRlcnM7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldCBtZXNzYWdlUGFyYW1ldGVycygpOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tZXNzYWdlUGFyYW1ldGVycztcclxuICAgIH1cclxuXHJcbiAgICBzZXQgbWVzc2FnZVBhcmFtZXRlcnMocGFyYW1ldGVyczogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+KSB7XHJcbiAgICAgICAgdGhpcy5fbWVzc2FnZVBhcmFtZXRlcnMgPSBwYXJhbWV0ZXJzO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXQgY29uZmlndXJhdGlvblBhcmFtZXRlcnMoKTogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlndXJhdGlvblBhcmFtZXRlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzKHBhcmFtZXRlcnM6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPikge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzID0gcGFyYW1ldGVycztcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHBhcmFtZXRlcnNTb3VyY2UoKTogUHJvcGVydHk8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcmFtZXRlcnNTb3VyY2U7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG1lc3NhZ2VQYXJhbWV0ZXJzU291cmNlKCk6IFByb3BlcnR5PEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPj4ge1xyXG4gICAgICAgIC8vIGZpbHRlciB0aGUgd2F0Y2hhYmxlcyBhbmQgdXBkYXRlIHRoZSB3YXRjaGFibGVzIHBhcmFtZXRlciBsaXN0XHJcbiAgICAgICAgdGhpcy5fbWVzc2FnZVBhcmFtZXRlcnNTb3VyY2UudmFsdWUgPSB0aGlzLl9tZXNzYWdlUGFyYW1ldGVycztcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWVzc2FnZVBhcmFtZXRlcnNTb3VyY2U7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHdhdGNoYWJsZVBhcmFtZXRlcnNTb3VyY2UoKTogUHJvcGVydHk8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+PiB7XHJcbiAgICAgICAgLy8gZmlsdGVyIHRoZSB3YXRjaGFibGVzIGFuZCB1cGRhdGUgdGhlIHdhdGNoYWJsZXMgcGFyYW1ldGVyIGxpc3RcclxuICAgICAgICB0aGlzLl93YXRjaGFibGVQYXJhbWV0ZXJzU291cmNlLnZhbHVlID0gdGhpcy5fd2F0Y2hhYmxlUGFyYW1ldGVycztcclxuICAgICAgICByZXR1cm4gdGhpcy5fd2F0Y2hhYmxlUGFyYW1ldGVyc1NvdXJjZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgZ2V0IGNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzU291cmNlKCk6IFByb3BlcnR5PEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPj4ge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzU291cmNlLnZhbHVlID0gdGhpcy5fY29uZmlndXJhdGlvblBhcmFtZXRlcnM7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzU291cmNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmVmcmVzaGVzIHRoZSBjb21wb25lbnRzIHBhcmFtZXRlciBsaXN0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7UHJvcGVydHk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXT59IGRhdGFMaW5rXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIHJlcXVlc3RSZWFkQ29tcG9uZW50UGFyYW1ldGVycyhkYXRhTGluazogUHJvcGVydHk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXT4pOiBQcm9taXNlPE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10+IHtcclxuICAgICAgICBsZXQgY29tcG9uZW50UGFyYW1ldGVyczpNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdID0gW107XHJcbiAgICAgICAgLy8gZ2V0IHRoZSBjb21wb25lbnRzIG1haW4gbW9kZWxcclxuICAgICAgICBsZXQgbW9kZWwgPSAoPGFueT50aGlzKS5tb2RlbCBhcyBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbDtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAobW9kZWwpe1xyXG4gICAgICAgICAgICAgICAgLy8gcmVhZCBwYXJhbWV0ZXIgY29tcG9uZW50IHNldFxyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50UGFyYW1ldGVycyA9IGF3YWl0IG1vZGVsLmJyb3dzZVBhcmFtZXRlcnModGhpcyk7XHJcbiAgICAgICAgICAgICAgICAvLyB1cGRhdGUgdGhlIGRhdGEgbGlua1xyXG4gICAgICAgICAgICAgICAgZGF0YUxpbmsucmVhZFJlcXVlc3RFeGVjdXRlZChjb21wb25lbnRQYXJhbWV0ZXJzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGRhdGFMaW5rLnJlYWRSZXF1ZXN0UmVqZWN0ZWQoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudFBhcmFtZXRlcnM7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVmcmVzaGVzIHRoZSBjb21wb25lbnRzIG1ldGhvZHNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1Byb3BlcnR5PE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kW10+fSBkYXRhTGlua1xyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyByZXF1ZXN0UmVhZENvbXBvbmVudE1ldGhvZHMoZGF0YUxpbms6IFByb3BlcnR5PE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kW10+KTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICBsZXQgY29tcG9uZW50TWV0aG9kczpNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFtdID0gW107XHJcbiAgICAgICAgLy8gZ2V0IHRoZSBjb21wb25lbnRzIG1haW4gbW9kZWxcclxuICAgICAgICBsZXQgbW9kZWwgPSAoPGFueT50aGlzKS5tb2RlbCBhcyBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbDtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAobW9kZWwpe1xyXG4gICAgICAgICAgICAgICAgLy8gcmVhZCBwYXJhbWV0ZXIgY29tcG9uZW50IHNldFxyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50TWV0aG9kcyA9IGF3YWl0IG1vZGVsLmJyb3dzZU1ldGhvZHModGhpcyk7XHJcbiAgICAgICAgICAgICAgICAvLyB1cGRhdGUgdGhlIGRhdGEgbGlua1xyXG4gICAgICAgICAgICAgICAgZGF0YUxpbmsucmVhZFJlcXVlc3RFeGVjdXRlZChjb21wb25lbnRNZXRob2RzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGRhdGFMaW5rLnJlYWRSZXF1ZXN0UmVqZWN0ZWQoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudE1ldGhvZHM7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqICBnZXRzIHRoZSBtZXRhIGRhdGEgb2YgYSBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBnZXQgbWV0YURhdGEoKTogTWFwcENvY2twaXRDb21wb25lbnRNZXRhRGF0YXx1bmRlZmluZWQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tZXRhRGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgbWV0YURhdGEobWV0YURhdGE6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0YURhdGF8dW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5fbWV0YURhdGEgPSBtZXRhRGF0YTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWdpc3RlcnMgb3IgbWFya3MgdGhlIGNvbXBvbmVudCBhcyB1c2VyIGNvbXBvbmVudFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnR9IGNvbXBvbmVudFxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHJlZ2lzdGVyVXNlckNvbXBvbmVudChjb21wb25lbnQ6IE1hcHBDb2NrcGl0Q29tcG9uZW50KTogdm9pZCB7XHJcbiAgICAgICAgKDxhbnk+Y29tcG9uZW50KS5pc1VzZXJDb21wb25lbnQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGV0ZXJtaW5lcyBpZiB0aGUgY29tcG9uZW50IGlzIGEgdXNlciBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50fSBjb21wb25lbnRcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBpc1VzZXJDb21wb25lbnQoY29tcG9uZW50OiBNYXBwQ29ja3BpdENvbXBvbmVudCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAoPGFueT5jb21wb25lbnQpLmlzVXNlckNvbXBvbmVudDtcclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcblxyXG59XHJcblxyXG4vKipcclxuICogVGhlIGNsYXNzIGltcGxlbWVudHMgbWV0aG9kIGFjY2Vzcy5cclxuICpcclxuICogQGNsYXNzIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kXHJcbiAqL1xyXG5jbGFzcyBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCBleHRlbmRzIE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbSB7XHJcblxyXG4gICAgLy8gSG9sZHMgdGhlIG1ldGhvZCBwYXJhbWV0ZXJzXHJcbiAgICBfaW5wdXRQYXJhbWV0ZXJzOiBBcnJheTxNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcj4gPSBbXTtcclxuICAgIF9pc0Jyb3dzZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8vIHNwZWNlZmllcyBpZiB0aGUgbWV0aG9kIGlzIGV4ZWN1dGFibGVcclxuICAgIHByb3RlY3RlZCBfaXNFeGVjdXRhYmxlOiBQcm9wZXJ0eTxib29sZWFuPiA9IFByb3BlcnR5LmNyZWF0ZTxib29sZWFuPihmYWxzZSx1bmRlZmluZWQsdW5kZWZpbmVkLCh2YWx1ZSk9PnRoaXMubWV0aG9kSXNFeGVjdXRhYmxlKHZhbHVlKSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBpbnB1dCBwYXJhbWV0ZXJzIG9mIHRoZSBtZXRob2RcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtBcnJheTxNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcj59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBpbnB1dFBhcmFtZXRlcnMoKTogQXJyYXk8TWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXI+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5wdXRQYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgaW5wdXRQYXJhbWV0ZXJzKHZhbHVlOiBBcnJheTxNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcj4pe1xyXG4gICAgICAgIHRoaXMuX2lucHV0UGFyYW1ldGVycyA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgaXNCcm93c2VkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pc0Jyb3dzZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBpc0Jyb3dzZWQoaXNCcm93c2VkOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5faXNCcm93c2VkID0gaXNCcm93c2VkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW52b2tlcyB0aGUgZXhlY3V0aW9uIG9mIHRoZSBjb21wb25lbnQgbWV0aG9kXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZH0gY29tcG9uZW50TWV0aG9kXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYXN5bmMgZXhlY3V0ZShjb21wb25lbnRNZXRob2Q6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kKTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICAvLyBnZXQgdGhlIG1ldGhvZHMgbW9kZWwgZnJvbSB0aGUgcGFyZW50IGNvbXBvbmVudFxyXG4gICAgICAgIGxldCBtb2RlbCA9ICg8YW55PmNvbXBvbmVudE1ldGhvZC5jb21wb25lbnQpLm1vZGVsIGFzIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsO1xyXG4gICAgICAgIGlmIChtb2RlbCAmJiBtb2RlbC5leGVjdXRlQ29tcG9uZW50TWV0aG9kKSB7XHJcbiAgICAgICAgICAgIC8vIGludm9rZSB0aGUgZXhlY3V0aW9uIG9mIHRoZSBtZXRob2RcclxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IG1vZGVsLmV4ZWN1dGVDb21wb25lbnRNZXRob2QoY29tcG9uZW50TWV0aG9kKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGaW5kcyBhIG1ldGhvZCBieSBuYW1lXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1ldGhvZE5hbWVcclxuICAgICAqIEBwYXJhbSB7KE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kW118dW5kZWZpbmVkKX0gY29tcG9uZW50TWV0aG9kc1xyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbaW5jbHVkZUludGVybmFscz10cnVlXVxyXG4gICAgICogQHJldHVybnMge01hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kfHVuZGVmaW5lZH1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZmluZChtZXRob2ROYW1lOnN0cmluZywgY29tcG9uZW50TWV0aG9kczogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RbXXx1bmRlZmluZWQsaW5jbHVkZUludGVybmFsczogYm9vbGVhbiA9IHRydWUpOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZHx1bmRlZmluZWQge1xyXG5cclxuICAgICAgICBsZXQgbWV0aG9kOk1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kfHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgaWYgKGNvbXBvbmVudE1ldGhvZHMpIHtcclxuICAgICAgICAgICAgbGV0IG1vZGVsID0gKDxhbnk+Y29tcG9uZW50TWV0aG9kc1swXS5jb21wb25lbnQpLm1vZGVsIGFzIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsO1xyXG4gICAgICAgICAgICBpZiAobW9kZWwpIHtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSBleGVjdXRhYmxlIG1ldGhvZHNcclxuICAgICAgICAgICAgICAgIGxldCBleGVjdXRhYmxlTWV0aG9kcyA9IGluY2x1ZGVJbnRlcm5hbHMgPyAoPGFueT5jb21wb25lbnRNZXRob2RzWzBdKS5jb21wb25lbnQubWV0aG9kcyA6IGNvbXBvbmVudE1ldGhvZHM7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIGxldCBtYXRjaGluZ01ldGhvZHMgPSBleGVjdXRhYmxlTWV0aG9kcy5maWx0ZXIoKG1ldGhvZCk9PnsgcmV0dXJuIG1ldGhvZC5icm93c2VOYW1lID09PSBtZXRob2ROYW1lIH0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoaW5nTWV0aG9kcy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjYWxsIHRoZSByZXF1ZXN0ZWQgbWV0aG9kXHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kID0gbWF0Y2hpbmdNZXRob2RzWzBdO1xyXG4gICAgICAgICAgICAgICAgfSAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbWV0aG9kO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBpZiB0aGUgbWV0aG9kIGlzIGV4ZWN1dGFibGVcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtQcm9wZXJ0eTxib29sZWFuPn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGlzRXhlY3V0YWJsZSgpOiBQcm9wZXJ0eTxib29sZWFuPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzRXhlY3V0YWJsZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXRlcm1pbmVzIGlmIHRoZSBtZXRoaWQgaXMgZXhlY3V0YWJsZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZXhlY3V0YWJsZVxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBtZXRob2RJc0V4ZWN1dGFibGUoZXhlY3V0YWJsZTogYm9vbGVhbik6IGFueSB7XHJcbiAgICAgICAgbGV0IGlzRXhlY3V0YWJsZVZhbHVlID0gZXhlY3V0YWJsZTtcclxuICAgICAgICBsZXQgbW9kZWwgPSAoPGFueT50aGlzLmNvbXBvbmVudCkubW9kZWwgYXMgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWw7XHJcbiAgICAgICAgaWYgKG1vZGVsICYmIHRoaXMuY29tcG9uZW50KSB7XHJcbiAgICAgICAgICAgIC8vIHJlc3BlY3Qgd3JpdGUgYWNjZXNzIGZvciB1c2VyIGNvbXBvbmVudHMgb3RoZXJ3aXNlIGVuYWJsZSBtZXRob2QgZXhlY3V0aW9uXHJcbiAgICAgICAgICAgIGlzRXhlY3V0YWJsZVZhbHVlID0gTWFwcENvY2twaXRDb21wb25lbnQuaXNVc2VyQ29tcG9uZW50KHRoaXMuY29tcG9uZW50IGFzIE1hcHBDb2NrcGl0Q29tcG9uZW50KSA/ICBtb2RlbC53cml0ZUFjY2VzcyA6IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpc0V4ZWN1dGFibGVWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIG1ldGhvZHMgaW5wdXQgcGFyYW1ldGVyc1xyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRNZXRob2R9IGNvbXBvbmVudE1ldGhvZFxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8TWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXJbXT59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFzeW5jIHVwZGF0ZUlucHV0UGFyYW1ldGVycyhjb21wb25lbnRNZXRob2Q6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kKTogUHJvbWlzZTxNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcltdPiB7XHJcbiAgICAgICAgLy8gZ2V0IHRoZSBtZXRob2RzIG1vZGVsIGZyb20gdGhlIHBhcmVudCBjb21wb25lbnRcclxuICAgICAgICBsZXQgbW9kZWwgPSAoPGFueT5jb21wb25lbnRNZXRob2QuY29tcG9uZW50KS5tb2RlbCBhcyBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbDtcclxuICAgICAgICBpZiAobW9kZWwgJiYgbW9kZWwuZXhlY3V0ZUNvbXBvbmVudE1ldGhvZCkge1xyXG4gICAgICAgICAgICAvLyBicm93c2UgaW5wdXQgcGFyYW1ldGVycyBpZiBub3QgeWV0IGRlZmluZWQuXHJcbiAgICAgICAgICAgIGlmIChjb21wb25lbnRNZXRob2QuaXNCcm93c2VkID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgbW9kZWwuYnJvd3NlTWV0aG9kSW5wdXRQYXJhbWV0ZXJzKGNvbXBvbmVudE1ldGhvZCk7XHJcbiAgICAgICAgICAgICAgICBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm8udXBkYXRlTWV0aG9kSW5wdXRQYXJhbWV0ZXJzKGNvbXBvbmVudE1ldGhvZCk7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb21wb25lbnRNZXRob2QuaW5wdXRQYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlIGZpbHRlciBzdGF0dXMgZm9yIGVhY2ggcGFyYW1ldGVyXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZH0gbWV0aG9kXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHVwZGF0ZUZpbHRlcihtZXRob2Q6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kKSB7XHJcbiAgICAgICAgbWV0aG9kLmlucHV0UGFyYW1ldGVycy5mb3JFYWNoKChwYXJhbWV0ZXIpID0+IHsgXHJcbiAgICAgICAgICAgIGlmIChwYXJhbWV0ZXIuZmlsdGVyLnBhcmFtZXRlclJlZiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcGFyYW1WYWx1ZSA9IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLmdldFZhbHVlRnJvbVBhcmFtZXRlclJlZihtZXRob2QsIHBhcmFtZXRlci5maWx0ZXIucGFyYW1ldGVyUmVmKTtcclxuICAgICAgICAgICAgICAgIGlmIChNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZC5pc1JlZlZhbHVlTWF0Y2hpbmcocGFyYW1WYWx1ZSwgcGFyYW1ldGVyLmZpbHRlci5wYXJhbWV0ZXJWYWx1ZXMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1ldGVyLmZpbHRlci5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlci5maWx0ZXIuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHZhbHVlIGZyb20gY29ubmVjdGVkIHBhcmFtZXRlclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kfSBtZXRob2RcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSByZWZlcmVuY2VcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0VmFsdWVGcm9tUGFyYW1ldGVyUmVmKG1ldGhvZDogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QsIHJlZmVyZW5jZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgdmFsdWUgPSAnJztcclxuICAgICAgICBtZXRob2QuaW5wdXRQYXJhbWV0ZXJzLmZvckVhY2goKHBhcmFtZXRlcikgPT4ge1xyXG4gICAgICAgICAgICBpZiAocGFyYW1ldGVyLm5hbWUgPT0gcmVmZXJlbmNlKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHBhcmFtZXRlci52YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiB0aGUgYWN0dWFsIHZhbHVlIGZyb20gdGhlIGNvbm5lY3RlZCBwYXJhbWV0ZXIgbWF0Y2hlcyB0aGUgdmFsdWUgZnJvbSB0aGUgbWV0YUNvbmZpZ3VyYXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXHJcbiAgICAgKiBAcGFyYW0geyhzdHJpbmdbXSB8IHVuZGVmaW5lZCl9IHBhcmFtZXRlclZhbHVlc1xyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgaXNSZWZWYWx1ZU1hdGNoaW5nKHZhbHVlOiBzdHJpbmcsIHBhcmFtZXRlclZhbHVlczogc3RyaW5nW10gfCB1bmRlZmluZWQpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgaXNWYWx1ZU1hdGNoaW5nID0gZmFsc2U7XHJcbiAgICAgICAgcGFyYW1ldGVyVmFsdWVzIS5mb3JFYWNoKChwYXJhbVZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBwYXJhbVZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBpc1ZhbHVlTWF0Y2hpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGlzVmFsdWVNYXRjaGluZztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEp1c3QgcmV0dXJuIGlucHV0IHBhcmFtZXRlcnMgd2l0aCBmaWx0ZXIgYWN0aXZlIHN0YXR1cyA9IGZhbHNlXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcltdfSBwYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJucyB7TWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXJbXX1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgdXBkYXRlSW5wdXRQYXJhbWV0ZXJzVmlzaWJpbGl0eShwYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcltdKTogTWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXJbXSB7XHJcbiAgICAgICAgbGV0IGlucHV0UGFyYW1ldGVycyA9IHBhcmFtZXRlcnMuZmlsdGVyKHBhcmFtZXRlciA9PiB7IHJldHVybiBwYXJhbWV0ZXIuZmlsdGVyLmFjdGl2ZSA9PT0gZmFsc2V9KTtcclxuICAgICAgICByZXR1cm4gaW5wdXRQYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcbmNsYXNzIE1hcHBDb2NrcGl0UGFyYW1ldGVyIGV4dGVuZHMgTWFwcENvY2twaXRDb21wb25lbnRJdGVtIHtcclxuXHJcblxyXG4gICAgLy8gSG9sZHMgdGhlIHBhcmFtZXRlcnMgdHlwZVxyXG4gICAgcHJvdGVjdGVkIF9kYXRhVHlwZTogTWFwcENvY2twaXRQYXJhbWV0ZXJEYXRhVHlwZSA9IG5ldyBNYXBwQ29ja3BpdFBhcmFtZXRlckRhdGFUeXBlKCk7XHJcbiAgICBwcm90ZWN0ZWQgX2VudW1SZWY6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bSA9IG5ldyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW0obnVsbCk7XHJcbiAgICBwcm90ZWN0ZWQgX2VuZ2luZWVyaW5nVW5pdDogc3RyaW5nID0gXCJcIjtcclxuICAgIHByb3RlY3RlZCBfaXNXcml0ZWFibGU6IFByb3BlcnR5PGJvb2xlYW4+ID0gUHJvcGVydHkuY3JlYXRlPGJvb2xlYW4+KGZhbHNlLHVuZGVmaW5lZCx1bmRlZmluZWQsKHZhbHVlKT0+dGhpcy5wYXJhbWV0ZXJJc1dyaXRhYmxlKHZhbHVlKSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBwYXJhbWV0ZXJzIHZhbHVlIG9iamVjdFxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUgeyhNYXBwQ29ja3BpdFBhcmFtZXRlckRhdGFUeXBlKX1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFBhcmFtZXRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGRhdGFUeXBlKCk6IE1hcHBDb2NrcGl0UGFyYW1ldGVyRGF0YVR5cGUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhVHlwZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGRhdGFUeXBlKGRhdGFUeXBlOiBNYXBwQ29ja3BpdFBhcmFtZXRlckRhdGFUeXBlKSB7XHJcbiAgICAgICAgdGhpcy5fZGF0YVR5cGUgPSBkYXRhVHlwZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGVuZ2luZWVyaW5nVW5pdCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9lbmdpbmVlcmluZ1VuaXQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBlbmdpbmVlcmluZ1VuaXQoZW5naW5lZXJpbmdVbml0OiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9lbmdpbmVlcmluZ1VuaXQgPSBlbmdpbmVlcmluZ1VuaXQ7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBnZXQgZW51bVR5cGUoKTogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZW51bVJlZjtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHNldCBlbnVtVHlwZShlbnVtUmVmOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW0pIHtcclxuICAgICAgICB0aGlzLl9lbnVtUmVmID0gZW51bVJlZjtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGdldCBpc1dyaXRlYWJsZSgpOiBQcm9wZXJ0eTxib29sZWFuPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzV3JpdGVhYmxlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIERldGVybWluZXMgaWYgdGhlIHByb3BlcnRpZXMgdmFsdWUgaXMgd3JpdGFibGUuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gdmFsdWVcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0UGFyYW1ldGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcGFyYW1ldGVySXNXcml0YWJsZSh3cml0YWJsZTogYm9vbGVhbik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCB3cml0YWJsZVZhbHVlID0gd3JpdGFibGU7XHJcbiAgICAgICAgbGV0IG1vZGVsID0gKDxhbnk+dGhpcy5jb21wb25lbnQpLm1vZGVsIGFzIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsO1xyXG4gICAgICAgIGlmIChtb2RlbCkge1xyXG4gICAgICAgICAgICB3cml0YWJsZVZhbHVlID0gd3JpdGFibGUgJiYgbW9kZWwud3JpdGVBY2Nlc3M7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB3cml0YWJsZVZhbHVlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGRpc3BsYXlWYWx1ZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlVG9TdHJpbmcodGhpcy5fdmFsdWVTb3VyY2UudmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgZGlzcGxheVZhbHVlKGlucHV0VmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBuZXdWYWx1ZSA9IHRoaXMudmFsdWVGcm9tU3RyaW5nKGlucHV0VmFsdWUpO1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSBuZXdWYWx1ZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk1hcHBDb2NrcGl0UGFyYW1ldGVyLnNldERpc3BsYXlWYWx1ZSAlbyBmb3IgJW9cIiwgdGhpcy52YWx1ZSwgaW5wdXRWYWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjb252ZXJ0cyB0aGUgcGFyYW1ldGVyIHZhbHVlIHRvIGEgZm9ybWF0dGVkIHN0cmluZ1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gX3ZhbHVlXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0UGFyYW1ldGVyXHJcbiAgICAgKi9cclxuICAgIHZhbHVlVG9TdHJpbmcoX3ZhbHVlOiBhbnkpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCB2YWx1ZVN0cmluZyA9XCJcIjtcclxuICAgICAgICAvLyBhdm9pZCBjb252ZXJ0aW5nIG51bGwgb3IgdW5kZWZpbmVkIHZhbHVlXHJcbiAgICAgICAgaWYgKHRoaXMuX3ZhbHVlU291cmNlLnZhbHVlICE9IG51bGwgJiYgdGhpcy5fdmFsdWVTb3VyY2UudmFsdWUgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHZhbHVlU3RyaW5nID0gdGhpcy5fdmFsdWVTb3VyY2UudmFsdWUudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgdmFsdWVTdHJpbmcgPSBOdW1lcmljSGVscGVyLmNvbnZlcnROdW1lcmljU3RyaW5nKHZhbHVlU3RyaW5nLCB0aGlzLmRhdGFUeXBlLm5hbWUpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5lbnVtVHlwZS5pc0RlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlU3RyaW5nID0gdGhpcy5lbnVtVHlwZS5nZXREaXNwbGF5VmFsdWUodGhpcy5fdmFsdWVTb3VyY2UudmFsdWUpO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2YWx1ZVN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNvbnZlcnRzIGEgcGFyYW1ldGVyIHZhbHVlIHN0cmluZyB0byBhIHZhbHVlIGFjY29yZGluZyB0byB0aGUgcGFyYW1ldGVycyBkYXRhIHR5cGVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW5wdXRWYWx1ZVxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRQYXJhbWV0ZXJcclxuICAgICAqL1xyXG4gICAgdmFsdWVGcm9tU3RyaW5nKGlucHV0VmFsdWU6IHN0cmluZyk6IGFueSB7XHJcblxyXG4gICAgICAgIC8vIHNldCBhbiBlbXB0eSBzdHJpbmcgZm9yIGFuIHVuZGVmaW5lZCBpbnB1dCB2YWx1ZVxyXG4gICAgICAgIGxldCB2YWx1ZSA9IGlucHV0VmFsdWUgIT09IHVuZGVmaW5lZCAmJiBpbnB1dFZhbHVlICE9PSBudWxsID8gaW5wdXRWYWx1ZSA6IFwiXCI7XHJcblxyXG4gICAgICAgIC8vIHJlcGxhY2UgdGhlIGVudW0gc3RyaW5nIGJ5IHRoZSB2YWx1ZSBpZiB0aGVyZSBpcyBvbmUgZGVmaW5lZC5cclxuICAgICAgICBpZiAodGhpcy5lbnVtVHlwZS5pc0RlZmluZWQpIHtcclxuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLmVudW1UeXBlLmdldFZhbHVlKGlucHV0VmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBUaGUgY2xhc3MgaW1wbGVtZW50cyBhIGNvbXBvbmVudCBwYXJhbWV0ZXJcclxuICpcclxuICogQGNsYXNzIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyXHJcbiAqL1xyXG5jbGFzcyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlciBleHRlbmRzIE1hcHBDb2NrcGl0UGFyYW1ldGVyIHtcclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IoY29tcG9uZW50OiBNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW0gfCBudWxsLCBuYW1lOiBzdHJpbmcsIHJlZmVyZW5jZTogYW55KSB7XHJcbiAgICAgICAgc3VwZXIoY29tcG9uZW50LG5hbWUscmVmZXJlbmNlKTtcclxuICAgICAgICB0aGlzLl92YWx1ZVNvdXJjZSA9IFByb3BlcnR5LmNyZWF0ZTxhbnk+KFwiXCIsdW5kZWZpbmVkLChkYXRhTGluayk9PiB0aGlzLnJlcXVlc3RXcml0ZVZhbHVlKGRhdGFMaW5rKSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogV3JpdGVzIHRoZSBjdXJyZW50IHBhcmFtZXRlciB2YWx1ZSB0byB0YXJnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJcclxuICAgICAqL1xyXG4gICAgd3JpdGUocmVmbGVjdGVkV3JpdGVSZXNwb25zZURlbGVnYXRlOigocmVzdWx0RGF0YTogYW55KT0+dm9pZCl8dW5kZWZpbmVkKXtcclxuXHJcbiAgICAgICAgLy8gY29ubmVjdCB0aGUgd3JpdGUgcmVzcG9uc2UgZGVsZWdhdGVcclxuICAgICAgICB0aGlzLnJlZmxlY3RlZFdyaXRlUmVzcG9uc2VEZWxlZ2F0ZSA9IHJlZmxlY3RlZFdyaXRlUmVzcG9uc2VEZWxlZ2F0ZTtcclxuXHJcbiAgICAgICAgLy8gZXhlY3V0ZSB3cml0aW5nIHRoZSBwYXJhbWV0ZXIgdmFsdWVcclxuICAgICAgICB0aGlzLnZhbHVlU291cmNlLndyaXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXcml0ZXMgdGhlIGRhdGEgbGlua3MgdmFsdWUgdG8gdGFyZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7UHJvcGVydHk8YW55Pn0gZGF0YUxpbmtcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIHJlcXVlc3RXcml0ZVZhbHVlKGRhdGFMaW5rOlByb3BlcnR5PGFueT4pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBsZXQgY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnQ7XHJcbiAgICAgICAgICAgIGlmIChjb21wb25lbnQgJiYgKDxhbnk+Y29tcG9uZW50KS5tb2RlbCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1vZGVsID0gKDxhbnk+Y29tcG9uZW50KS5tb2RlbCBhcyBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbDtcclxuICAgICAgICAgICAgICAgIGF3YWl0IG1vZGVsLndyaXRlQ29tcG9uZW50UGFyYW1ldGVyKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgZGF0YUxpbmsud3JpdGVSZXF1ZXN0RXhlY3V0ZWQobnVsbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBkYXRhTGluay53cml0ZVJlcXVlc3RSZWplY3RlZChlcnJvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYXRlcyB0aGUgb2JzZXJ2YXRpb24gb2YgcGFyYW1ldGVyIHZhbHVlIGNoYW5nZXNcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IHdhdGNoYWJsZVBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBvYnNlcnZlUGFyYW1ldGVyVmFsdWVDaGFuZ2VzKG9ic2VydmVyOiBJT2JzZXJ2ZXIsb2JzZXJ2YWJsZVBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pOiBhbnkge1xyXG4gICAgICAgIGlmIChvYnNlcnZhYmxlUGFyYW1ldGVycy5sZW5ndGggPiAwICYmIG9ic2VydmFibGVQYXJhbWV0ZXJzWzBdICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAvLyBnZXQgdGhlIHBhcmFtZXRlcnMgbW9kZWwgZnJvbSB0aGUgcGFyZW50IGNvbXBvbmVudFxyXG4gICAgICAgICAgICBsZXQgbW9kZWwgPSBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlci5nZXRNb2RlbChvYnNlcnZhYmxlUGFyYW1ldGVyc1swXSk7XHJcbiAgICAgICAgICAgIGlmIChtb2RlbCAmJiBtb2RlbC5vYnNlcnZlRGF0YU1vZGVsSXRlbXMpIHtcclxuICAgICAgICAgICAgICAgIC8vIGludm9rZSB0aGUgb2JzZXJ2YXRpb24gb24gdGhlIG1vZGVsXHJcbiAgICAgICAgICAgICAgICBtb2RlbC5vYnNlcnZlRGF0YU1vZGVsSXRlbXMob2JzZXJ2ZXIsIG9ic2VydmFibGVQYXJhbWV0ZXJzKTtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFjdGl2YXRlcyBtb2RlbCBpdGVtcyByZWdpc3RlcmVkIGZvciBvYnNlcnZhdGlvblxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7Kn0gb2JzZXJ2ZXJcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gb2JzZXJ2YWJsZVBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBhY3RpdmF0ZUNvbXBvbmVudE1vZGVsSXRlbXMob2JzZXJ2ZXI6IGFueSxvYnNlcnZhYmxlUGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSk6IGFueSB7XHJcbiAgICAgICAgLy9UT0RPOiBpbXBsZW1lbnQgbW9kZWwgaXRlbSBhY3RpdmF0aW9uIGhhbmRsaW5nXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVW5vYnNlcnZlcyBhbGwgb2JzZXJ2YWJsZXMgYXNzb2NpYXRlZCB3aXRoIHRoZSBvYnNlcnZlclxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7Kn0gb2JzZXJ2ZXJcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gb2JzZXJ2ZWRQYXJhbWV0ZXJzXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtzdXNwZW5kPXRydWVdIHN1c3BlbmRzIHRoZSBvYnNlcnZhdGlvbiBpZiB0cnVlIG90aGVyd2lzZSByZW1vdmVzIHRoZSB3aG9sZSBzdWJzY3JpcHRpb25cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlclxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgdW5vYnNlcnZlQ29tcG9uZW50TW9kZWxJdGVtcyhvYnNlcnZlcjogYW55LG9ic2VydmVkUGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSwgc3VzcGVuZDpib29sZWFuID0gdHJ1ZSkge1xyXG4gICAgICAgIGlmIChvYnNlcnZlZFBhcmFtZXRlcnMubGVuZ3RoID4gMCAmJiBvYnNlcnZlZFBhcmFtZXRlcnNbMF0gIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGxldCBtb2RlbCA9IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyLmdldE1vZGVsKG9ic2VydmVkUGFyYW1ldGVyc1swXSk7XHJcbiAgICAgICAgICAgIGlmIChtb2RlbCAmJiBtb2RlbC51bm9ic2VydmVDb21wb25lbnRNb2RlbEl0ZW1zKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBpbnZva2UgdGhlIHVub2JzZXJ2YXRpb24gb24gdGhlIG1vZGVsXHJcbiAgICAgICAgICAgICAgICBtb2RlbC51bm9ic2VydmVDb21wb25lbnRNb2RlbEl0ZW1zKG9ic2VydmVyLCBvYnNlcnZlZFBhcmFtZXRlcnMsc3VzcGVuZCk7XHJcbiAgICAgICAgICAgIH0gIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVhY3RpdmF0ZXMgbW9kZWwgaXRlbXMgcmVnaXN0ZXJlZCBmb3Igb2JzZXJ2YXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0geyp9IG9ic2VydmVyXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IG9ic2VydmVkUGFyYW1ldGVyc1xyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbc3VzcGVuZD10cnVlXVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBkZWFjdGl2YXRlQ29tcG9uZW50TW9kZWxJdGVtcyhvYnNlcnZlcjogYW55LG9ic2VydmVkUGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSwgc3VzcGVuZDpib29sZWFuID0gdHJ1ZSkge1xyXG4gICAgICAgIC8vVE9ETzogaW1wbGVtZW50IG1vZGVsIGl0ZW0gZGVhY3RpdmF0aW9uIGhhbmRsaW5nXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgcGFyYW1ldGVycyBtb2RlbFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IG9ic2VydmFibGVQYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIGdldE1vZGVsKGNvbXBvbmVudFBhcmFtZXRlcjogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIpIHtcclxuICAgICAgICBpZiAoIWNvbXBvbmVudFBhcmFtZXRlcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiY29tcG9uZW50UGFyYW1ldGVyIHVuZGVmaW5lZCAhXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWNvbXBvbmVudFBhcmFtZXRlci5jb21wb25lbnQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImNvbXBvbmVudFBhcmFtZXRlci5jb21wb25lbnQgdW5kZWZpbmVkICFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoPGFueT5jb21wb25lbnRQYXJhbWV0ZXIuY29tcG9uZW50KS5tb2RlbCBhcyBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbDtcclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG5jbGFzcyBNYXBwQ29ja3BpdFN0YXRlUGFyYW1ldGVyIHtcclxuXHJcbiAgICBwcml2YXRlIF9wYXJhbWV0ZXJzIDogc3RyaW5nW107XHJcbiAgICBwcml2YXRlIF9uYW1lIDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfZXhwcmVzc2lvbiA6IHN0cmluZztcclxuICAgIHByaXZhdGUgX2ljb247XHJcblxyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBwYXJhbWV0ZXJzOiBzdHJpbmdbXSwgZXhwcmVzc2lvbjogc3RyaW5nLCBpY29uKSB7XHJcbiAgICAgICAgdGhpcy5fbmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5fcGFyYW1ldGVycyA9IHBhcmFtZXRlcnM7XHJcbiAgICAgICAgdGhpcy5fZXhwcmVzc2lvbiA9IGV4cHJlc3Npb247XHJcbiAgICAgICAgdGhpcy5faWNvbiA9IGljb247XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBwYXJhbWV0ZXJzKCk6IHN0cmluZ1tde1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgZXhwcmVzc2lvbigpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9leHByZXNzaW9uO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgaWNvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faWNvbjtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIGltcGxlbWVudHMgYSBtZXRob2QgcGFyYW1ldGVyXHJcbiAqXHJcbiAqIEBjbGFzcyBNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlclxyXG4gKiBAZXh0ZW5kcyB7TWFwcENvY2twaXRQYXJhbWV0ZXJ9XHJcbiAqL1xyXG5jbGFzcyBNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlciBleHRlbmRzIE1hcHBDb2NrcGl0UGFyYW1ldGVyIHtcclxuXHJcbiAgICBwcml2YXRlIF9maWx0ZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY29tcG9uZW50OiBNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW0gfCBudWxsLCBuYW1lOiBzdHJpbmcsIHJlZmVyZW5jZTogYW55KSB7XHJcbiAgICAgICAgc3VwZXIoY29tcG9uZW50LCBuYW1lLCByZWZlcmVuY2UpO1xyXG4gICAgICAgIHRoaXMuX2ZpbHRlciA9IG5ldyBtZXRob2RGaWx0ZXIoKVxyXG4gICAgfVxyXG5cclxuICAgIGdldCBmaWx0ZXIoKTogbWV0aG9kRmlsdGVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZmlsdGVyO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBNYXBwQ29ja3BpdFF1aWNrQ29tbWFuZFBhcmFtZXRlciB7XHJcblxyXG4gICAgcHJpdmF0ZSBfbmFtZSA6IHN0cmluZztcclxuICAgIHByaXZhdGUgX3Rvb2x0aXAgOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF9pbWFnZU5hbWUgOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCB0b29sdGlwOiBzdHJpbmcsIGltYWdlTmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fbmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5fdG9vbHRpcCA9IHRvb2x0aXA7XHJcbiAgICAgICAgdGhpcy5faW1hZ2VOYW1lID0gaW1hZ2VOYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgdG9vbHRpcCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90b29sdGlwO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgaW1hZ2VOYW1lKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbWFnZU5hbWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBkZWZpbmVzIHRoZSBwYXJhbWV0ZXIgZGF0YSB0eXBlXHJcbiAqXHJcbiAqIEBjbGFzcyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckRhdGFUeXBlXHJcbiAqL1xyXG5jbGFzcyBNYXBwQ29ja3BpdFBhcmFtZXRlckRhdGFUeXBlIHtcclxuICAgIHByaXZhdGUgX2RhdGFUeXBlSWQgPSBcInVuZGVmaW5lZFwiO1xyXG4gICAgcHJpdmF0ZSBfZGF0YVR5cGVOYW1lID0gXCJ1bmRlZmluZWRcIjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihkYXRhVHlwZUlkOiBzdHJpbmcgPSBcInVuZGVmaW5lZFwiLCBkYXRhVHlwZU5hbWU6IHN0cmluZyA9IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICB0aGlzLl9kYXRhVHlwZUlkID0gZGF0YVR5cGVJZDtcclxuICAgICAgICB0aGlzLl9kYXRhVHlwZU5hbWUgPSBkYXRhVHlwZU5hbWU7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBnZXQgaWQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcywgdGhpcy5fZGF0YVR5cGVJZFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhVHlwZU5hbWVcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIGltcGxlbWVudHMgYSBzaW5nbGUgZW51bSB2YWx1ZSB3aXRoIHZhbHVlIGFuZCBzdHJpbmdcclxuICpcclxuICogQGNsYXNzIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bVZhbHVlXHJcbiAqL1xyXG5jbGFzcyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW1WYWx1ZSBpbXBsZW1lbnRzIElWYWx1ZUxpc3RJdGVtIHtcclxuICAgIF9kaXNwbGF5VmFsdWU6IHN0cmluZyA9IFwidW5kZWZpbmVkXCI7XHJcbiAgICBfdmFsdWU6IGFueSA9IG51bGw7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bVZhbHVlLlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRpc3BsYXlUZXh0XHJcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtVmFsdWVcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoZGlzcGxheVRleHQ6IHN0cmluZywgdmFsdWU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX2Rpc3BsYXlWYWx1ZSA9IGRpc3BsYXlUZXh0O1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXRzIHRoZSB2YWx1ZSBvZiB0aGUgZW51bVxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtVmFsdWVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCB2YWx1ZSgpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldHMgdGhlIHN0cmluZyBvZiB0aGUgZW51bSB2YWx1ZVxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW1WYWx1ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGRpc3BsYXlWYWx1ZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNwbGF5VmFsdWU7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4vKipcclxuICogaW1wbGVtZW50cyBhIHBhcmFtZXRlciBlbnVtIGhvbGRpbmcgYSBjb2xsZWN0aW9uIG9mIGVudW0gaXRlbXNcclxuICpcclxuICogQGNsYXNzIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bVxyXG4gKi9cclxuY2xhc3MgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtIHtcclxuXHJcbiAgICBwcml2YXRlIF9icm93c2VOYW1lOiBzdHJpbmcgPSBcIlwiO1xyXG5cclxuICAgIF9lbnVtVmFsdWVzUmVmZXJlbmNlOiBhbnk7XHJcblxyXG4gICAgcHJpdmF0ZSBfZW51bVZhbHVlcyE6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bVZhbHVlW107XHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGVudW1WYWx1ZXNSZWZlcmVuY2U6IGFueSA9IG51bGwpIHtcclxuICAgICAgICB0aGlzLl9lbnVtVmFsdWVzUmVmZXJlbmNlID0gZW51bVZhbHVlc1JlZmVyZW5jZTtcclxuICAgICAgICBpZiAodGhpcy5fZW51bVZhbHVlc1JlZmVyZW5jZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9icm93c2VOYW1lID0gdGhpcy5fZW51bVZhbHVlc1JlZmVyZW5jZS5icm93c2VOYW1lO1xyXG4gICAgICAgICAgICB0aGlzLl9lbnVtVmFsdWVzID0gdGhpcy5fZW51bVZhbHVlc1JlZmVyZW5jZS5lbnVtVmFsdWVzLm1hcCgoZW51bVZhbHVlUmVmKSA9PiB7IHJldHVybiBuZXcgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtVmFsdWUoZW51bVZhbHVlUmVmLmRpc3BsYXlOYW1lLnRleHQsIGVudW1WYWx1ZVJlZi52YWx1ZSk7IH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldHMgdGhlIGJyb3dzZSBuYW1lIG9mIHRoZSBlbnVtXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGJyb3dzZU5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZW51bVZhbHVlc1JlZmVyZW5jZS5icm93c2VOYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0cyB0aGUgY29sbGVjdGlvbiBvZiBlbnVtIGl0ZW1zXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtVmFsdWVbXX1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCB2YWx1ZXMoKTogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtVmFsdWVbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VudW1WYWx1ZXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBkZXRlcm1pbmVzIGlmIHRoZSBlbnVtIGlzIGRlZmluZWQgYW5kIGNvbnRhaW5zIHZhbHVlc1xyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgaXNEZWZpbmVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9lbnVtVmFsdWVzICYmIHRoaXMuX2VudW1WYWx1ZXMubGVuZ3RoID4gMDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXRzIGEgc3RyaW5nIG1hdGNoaW5nIHRoZSBzcGVjaWZpZWQgZW51bSB2YWx1ZSwgb3RoZXJ3aXNlIHJldHVybiB2YWx1ZSBzdHJpbmcgYXMgZGVmYXVsdC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW1cclxuICAgICAqL1xyXG4gICAgZ2V0RGlzcGxheVZhbHVlKGVudW1WYWx1ZTogYW55KTogc3RyaW5nIHtcclxuICAgICAgICAvLyBnZXQgYW4gZW51bSBpdGVtIG1hdGNoaW5nIHRoZSByZXF1ZXN0ZWQgdmFsdWVcclxuICAgICAgICBsZXQgbWF0Y2hpbmdFbnVtSXRlbSA9IHRoaXMuZmluZE1hdGNoaW5nRW51bUl0ZW1CeVZhbHVlKGVudW1WYWx1ZSk7XHJcblxyXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgdmFsdWUgc3RyaW5nIHRvIHRoZSBtYXRjaGluZyBvbmUgb3IgdXNlIHRoZSBkZWZhdWx0IHN0cmluZ1xyXG4gICAgICAgIGxldCBlbnVtVmFsdWVTdHJpbmcgPSBtYXRjaGluZ0VudW1JdGVtID8gbWF0Y2hpbmdFbnVtSXRlbS5kaXNwbGF5VmFsdWUgOiBlbnVtVmFsdWUudG9TdHJpbmcoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGVudW1WYWx1ZVN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlucHV0VmFsdWVcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bVxyXG4gICAgICovXHJcbiAgICBnZXRWYWx1ZShlbnVtRGlzcGxheVZhbHVlOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgICAgIGxldCBlbnVtVmFsdWUgPSBlbnVtRGlzcGxheVZhbHVlO1xyXG4gICAgICAgIC8vIGdldCBhbiBlbnVtIGl0ZW0gbWF0Y2hpbmcgdGhlIHJlcXVlc3RlZCBzdHJpbmdcclxuICAgICAgICBsZXQgbWF0Y2hpbmdFbnVtSXRlbSA9IHRoaXMuZmluZE1hdGNoaW5nRW51bUl0ZW1CeVN0cmluZyhlbnVtRGlzcGxheVZhbHVlKTtcclxuICAgICAgICBpZiAobWF0Y2hpbmdFbnVtSXRlbSkge1xyXG4gICAgICAgICAgICBlbnVtVmFsdWUgPSBtYXRjaGluZ0VudW1JdGVtLnZhbHVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW0uZ2V0VmFsdWU6IGNvdWxkIG5vdCBmaW5kIG1hdGNoaW5nIGVudW0gdmFsdWUgZm9yICVvXCIsIGVudW1EaXNwbGF5VmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGVudW1WYWx1ZTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZmluZCBhbiBlbnVtIGl0ZW0gd2l0aCBtYXRjaGluZyB2YWx1ZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGVudW1WYWx1ZVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW1cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBmaW5kTWF0Y2hpbmdFbnVtSXRlbUJ5VmFsdWUoZW51bVZhbHVlOiBhbnkpIHtcclxuICAgICAgICBsZXQgbWF0Y2hpbmdFbnVtSXRlbSA9IHRoaXMuX2VudW1WYWx1ZXMuZmlsdGVyKChlbnVtSXRlbSkgPT4geyByZXR1cm4gZW51bUl0ZW0udmFsdWUgPT0gZW51bVZhbHVlOyB9KTtcclxuICAgICAgICByZXR1cm4gbWF0Y2hpbmdFbnVtSXRlbS5sZW5ndGggPT09IDEgPyBtYXRjaGluZ0VudW1JdGVtWzBdIDogdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZmluZCBhbiBlbnVtIGl0ZW0gd2l0aCBtYXRjaGluZyBzdHJpbmdcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZW51bURpc3BsYXlWYWx1ZVxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtXHJcbiAgICAgKi9cclxuICAgIGZpbmRNYXRjaGluZ0VudW1JdGVtQnlTdHJpbmcoZW51bURpc3BsYXlWYWx1ZTogc3RyaW5nKTogYW55IHtcclxuICAgICAgICBsZXQgbWF0Y2hpbmdFbnVtSXRlbSA9IHRoaXMuX2VudW1WYWx1ZXMuZmlsdGVyKChlbnVtSXRlbSkgPT4geyByZXR1cm4gZW51bUl0ZW0uZGlzcGxheVZhbHVlID09PSBlbnVtRGlzcGxheVZhbHVlOyB9KTtcclxuICAgICAgICByZXR1cm4gbWF0Y2hpbmdFbnVtSXRlbS5sZW5ndGggPT09IDEgPyBtYXRjaGluZ0VudW1JdGVtWzBdIDogdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgICBNYXBwQ29ja3BpdENvbXBvbmVudCwgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIsIE1hcHBDb2NrcGl0U3RhdGVQYXJhbWV0ZXIsIE1hcHBDb2NrcGl0UXVpY2tDb21tYW5kUGFyYW1ldGVyLCBNYXBwQ29ja3BpdFBhcmFtZXRlckRhdGFUeXBlLCBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW0sIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bVZhbHVlLCBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCwgTWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXIsIE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbVxyXG59O1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuIl19