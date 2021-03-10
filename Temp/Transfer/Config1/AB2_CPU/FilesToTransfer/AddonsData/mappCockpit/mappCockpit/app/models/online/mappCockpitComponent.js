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
define(["require", "exports", "../../framework/property", "../../framework/command", "./mappCockpitComponentReflection", "../../common/numericHelper"], function (require, exports, property_1, command_1, mappCockpitComponentReflection_1, numericHelper_1) {
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
            _this._userMethods = [];
            // Holds the component parameters
            _this._parameters = [];
            _this._watchableParameters = [];
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
                            if (!(componentMethod.inputParameters.length === 0)) return [3 /*break*/, 2];
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
    /**
     * implements a method parameter
     *
     * @class MappCockpitMethodParameter
     * @extends {MappCockpitParameter}
     */
    var MappCockpitMethodParameter = /** @class */ (function (_super) {
        __extends(MappCockpitMethodParameter, _super);
        function MappCockpitMethodParameter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MappCockpitMethodParameter;
    }(MappCockpitParameter));
    exports.MappCockpitMethodParameter = MappCockpitMethodParameter;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcENvY2twaXRDb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9vbmxpbmUvbWFwcENvY2twaXRDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQVNBOzs7Ozs7OztPQVFHO0lBQ0g7UUF3Qkk7Ozs7OztXQU1HO1FBQ0gsa0NBQVksU0FBMEMsRUFBRSxJQUFZLEVBQUUsU0FBYztZQTNCcEYsd0JBQXdCO1lBQ3hCLDhCQUE4QjtZQUM5Qix3QkFBd0I7WUFDZCxXQUFNLEdBQW9DLEVBQUUsQ0FBQztZQVE3QyxpQkFBWSxHQUFrQixtQkFBUSxDQUFDLE1BQU0sQ0FBTSxFQUFFLENBQUMsQ0FBQztZQUVqRSx1QkFBdUI7WUFDZixpQkFBWSxHQUF1QixtQkFBUSxDQUFDLE1BQU0sQ0FBVSxLQUFLLENBQUMsQ0FBQztZQUUzRSxpREFBaUQ7WUFDekMsb0NBQStCLEdBQTRDLFNBQVMsQ0FBQztZQVd6RixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztZQUM1QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUNoQyxDQUFDO1FBU0Qsc0JBQVcsaURBQVc7WUFQdEI7Ozs7OztlQU1HO2lCQUNIO2dCQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztZQUM3QixDQUFDO2lCQUVELFVBQXVCLFdBQW1CO2dCQUN0QyxJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQztZQUNwQyxDQUFDOzs7V0FKQTtRQU1ELHNCQUFXLGdEQUFVO2lCQUFyQjtnQkFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDO1lBQ3RDLENBQUM7OztXQUFBO1FBRUQsc0JBQVcsMENBQUk7aUJBQWY7Z0JBQ0ks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QUFDO1lBQ3RHLE9BQU8sZ0JBQWdCLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUMzRSxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0gsd0VBQTRCLEdBQTVCLFVBQTZCLGdCQUF3QjtZQUNqRCxJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFVBQUMsUUFBUSxJQUFPLE9BQU8sUUFBUSxDQUFDLFlBQVksS0FBSyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JILE9BQU8sZ0JBQWdCLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUMzRSxDQUFDO1FBR0wsd0NBQUM7SUFBRCxDQUFDLEFBbkhELElBbUhDO0lBR3NGLDhFQUFpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0YURhdGEgfSBmcm9tIFwiLi9tYXBwQ29ja3BpdENvbXBvbmVudE1ldGFEYXRhXCI7XHJcbmltcG9ydCB7IFByb3BlcnR5IH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9wcm9wZXJ0eVwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbCB9IGZyb20gXCIuL2NvbXBvbmVudHNEYXRhTW9kZWxcIjtcclxuaW1wb3J0IHsgQ29tbWFuZCwgSUNvbW1hbmRFeGVjdXRpb25EZWxlZ2F0ZSB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvY29tbWFuZFwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm8gfSBmcm9tIFwiLi9tYXBwQ29ja3BpdENvbXBvbmVudFJlZmxlY3Rpb25cIjtcclxuaW1wb3J0IHsgTnVtZXJpY0hlbHBlciB9IGZyb20gXCIuLi8uLi9jb21tb24vbnVtZXJpY0hlbHBlclwiO1xyXG5pbXBvcnQgeyBJT2JzZXJ2ZXIgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2ludGVyZmFjZXMvb2JzZXJ2ZXJcIjtcclxuaW1wb3J0IHsgSVZhbHVlTGlzdEl0ZW0gfSBmcm9tIFwiLi4vLi4vY29tbW9uL2ludGVyZmFjZXMvdmFsdWVMaXN0SXRlbUludGVyZmFjZVwiO1xyXG5cclxuLyoqXHJcbiAqIEltcGxlbWVudHMgdGhlIGJhc2UgbWVtZWJlcnMgZm9yIG1hbmFnaW5nIGNvbXBvbmVudCBtb2RlbCBtZW1iZXJzLlxyXG4gKlxyXG4gKiBAY2xhc3MgTWFwcENvY2twaXRDb21wb25lbnRJdGVtXHJcbi8qKlxyXG4gKlxyXG4gKlxyXG4gKiBAY2xhc3MgTWFwcENvY2twaXRDb21wb25lbnRJdGVtXHJcbiAqL1xyXG5jbGFzcyBNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW0ge1xyXG5cclxuICAgIC8vIEhvbGRzIGEgcmVmZXJlbmNlIHRvIHRoZSB1bmRlcmx5aW5nIGl0ZW1cclxuICAgIHByb3RlY3RlZCByZWFkb25seSBfcmVmZXJlbmNlOiBhbnk7XHJcbiAgICAvLyBIb2xkcyB0aGUgaXRlbXMgdmFsdWVcclxuICAgIC8vIHByb3RlY3RlZCBfdmFsdWU6IGFueSA9IFwiXCI7XHJcbiAgICAvLyBob2xkcyBzdWJpdGVtcyBpZiBhbnlcclxuICAgIHByb3RlY3RlZCBfaXRlbXM6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbT4gPSBbXTtcclxuXHJcbiAgICAvLyBob2xkcyB0aGUgZGlhcGxheSBuYW1lXHJcbiAgICBwcm90ZWN0ZWQgX2Rpc3BsYXlOYW1lOiBhbnk7XHJcblxyXG4gICAgLy8gaG9sZHMgdGhlIGNvbXBvbmVudCByZXByZXNlbnRpbmcgdGhlIG93bmVyIG9mIHRoZSBjb21wb25lbnQgaXRlbVxyXG4gICAgcHJvdGVjdGVkIF9jb21wb25lbnQ6IE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbSB8IG51bGw7XHJcblxyXG4gICAgcHJvdGVjdGVkIF92YWx1ZVNvdXJjZTogUHJvcGVydHk8YW55PiA9IFByb3BlcnR5LmNyZWF0ZTxhbnk+KFwiXCIpO1xyXG5cclxuICAgIC8vIGhvbGRzIHRoZSB1c2VyIHJvbGVzXHJcbiAgICBwcml2YXRlIF93cml0ZUFjY2VzczogUHJvcGVydHk8Ym9vbGVhbj4gPSAgUHJvcGVydHkuY3JlYXRlPGJvb2xlYW4+KGZhbHNlKTtcclxuXHJcbiAgICAvLyBzcGVjaWZpZXMgYSByZXNwb25zZSBkZWxhZ2V0IGZvciB3cml0ZSByZXF1ZXRzXHJcbiAgICBwcml2YXRlIF9yZWZsZWN0ZWRXcml0ZVJlc3BvbnNlRGVsZWdhdGU6ICgocmVzdWx0RGF0YTogYW55KSA9PiB2b2lkKSB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjcmVhdGVzIGFuIGluc3RhbmNlIG9mIE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbS5cclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRJdGVtfSBjb21wb25lbnRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAgICAgKiBAcGFyYW0geyp9IHJlZmVyZW5jZVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihjb21wb25lbnQ6IE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbSB8IG51bGwsIG5hbWU6IHN0cmluZywgcmVmZXJlbmNlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9yZWZlcmVuY2UgPSByZWZlcmVuY2U7XHJcbiAgICAgICAgdGhpcy5fZGlzcGxheU5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuX2NvbXBvbmVudCA9IGNvbXBvbmVudDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGl0ZW1zIGRpc3BsYXkgbmFtZSBcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRJdGVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgZGlzcGxheU5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGlzcGxheU5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBkaXNwbGF5TmFtZShkaXNwbGF5TmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fZGlzcGxheU5hbWUgPSBkaXNwbGF5TmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGJyb3dzZU5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmVmZXJlbmNlLmJyb3dzZU5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBuYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlZmVyZW5jZS5uYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY29tcG9uZW50KCk6IE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbSB8IG51bGwge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb21wb25lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBjdXJyZW50IHVzZXIgcm9sZXNcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtzdHJpbmdbXX1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHdyaXRlQWNjZXNzKCkgOiBQcm9wZXJ0eTxib29sZWFuPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dyaXRlQWNjZXNzO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGl0ZW1zIGlkXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGlkKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlZmVyZW5jZS5ub2RlSWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBzZXRzL2dldHMgdGhlIGl0ZW1zIHZhbHVlIG9iamVjdFxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUgeyhNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlclZhbHVlfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCB2YWx1ZSgpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZVNvdXJjZS52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHZhbHVlKHZhbHVlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLl92YWx1ZVNvdXJjZS52YWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgdmFsdWVTb3VyY2UoKTogUHJvcGVydHk8YW55PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlU291cmNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgdmFsdWVTb3VyY2UodmFsdWVTb3VyY2U6IFByb3BlcnR5PGFueT4pIHtcclxuICAgICAgIHRoaXMuX3ZhbHVlU291cmNlID0gdmFsdWVTb3VyY2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIGEgZGVsZWdhdGUgZm9yIG9ic2VydmluZyB3cml0ZSByZXNwb25zZXNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRJdGVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgcmVmbGVjdGVkV3JpdGVSZXNwb25zZURlbGVnYXRlKHJlZmxlY3RlZFdyaXRlUmVzcG9uc2VEZWxlZ2F0ZTooKHJlZmxlY3RlZFdyaXRlUmVzcG9uc2VWYWx1ZTphbnkpPT52b2lkKXx1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLl9yZWZsZWN0ZWRXcml0ZVJlc3BvbnNlRGVsZWdhdGUgPSByZWZsZWN0ZWRXcml0ZVJlc3BvbnNlRGVsZWdhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBkZWxlZ2F0ZSBmb3Igb2JzZXJ2aW5nIHdyaXRlIHJlc3BvbXNlc1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCByZWZsZWN0ZWRXcml0ZVJlc3BvbnNlRGVsZWdhdGUoKTooKHJlZmxlY3RlZFdyaXRlUmVzcG9uc2VWYWx1ZTphbnkpPT52b2lkKXx1bmRlZmluZWR7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlZmxlY3RlZFdyaXRlUmVzcG9uc2VEZWxlZ2F0ZTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0cyB0aGUgdmFsdWUgYXMgZm9ybWF0dGVkIHN0cmluZyBpZiBhcHByb3BpYXRlXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRJdGVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgZGlzcGxheVZhbHVlKCk6IFN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlU291cmNlLnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBzZXQgZGlzcGxheVZhbHVlKGlucHV0VmFsdWU6IFN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlU291cmNlLnZhbHVlID0gaW5wdXRWYWx1ZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGdldCBkYXRhVHlwZUlkKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlZmVyZW5jZS5kYXRhVHlwZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldHMgdGhlIHN1Yml0ZW1zIGlmIGFueVxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge0FycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbT59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRJdGVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgaXRlbXMoKTogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRJdGVtPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zO1xyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXHJcblxyXG4vKipcclxuICogVGhlIGNsYXNzIHJlcHJlc2VudHMgYSBjb21wb25lbnQgdG8gYmUgdXNlZCB3aXRoaW4gbWFwcCBjb2NrcGl0IFVJXHJcbiAqXHJcbiAqIEBjbGFzcyBNYXBwQ29ja3BpdENvbXBvbmVudFxyXG4gKi9cclxuY2xhc3MgTWFwcENvY2twaXRDb21wb25lbnQgZXh0ZW5kcyBNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW0ge1xyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIb2xkcyB0aGUgY29tcG9uZW50IG1ldGhvZHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAdHlwZSB7QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRNZXRob2Q+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50XHJcbiAgICAgKi9cclxuXHJcbiAgICAvLyBIb2xkcyB0aGUgY29tcG9uZW50IG1ldGhvZHNcclxuICAgIHByaXZhdGUgX21ldGhvZHM6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kPiA9IFtdO1xyXG4gICAgcHJpdmF0ZSBfdXNlck1ldGhvZHM6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kPiA9IFtdO1xyXG5cclxuICAgIC8vIEhvbGRzIHRoZSBjb21wb25lbnQgcGFyYW1ldGVyc1xyXG4gICAgcHJpdmF0ZSBfcGFyYW1ldGVyczogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+ID0gW107XHJcbiAgICBwcml2YXRlIF93YXRjaGFibGVQYXJhbWV0ZXJzOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4gPSBbXTtcclxuICAgIHByaXZhdGUgX2NvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4gPSBbXTsgICAgXHJcbiAgICBwcml2YXRlIF9tZXNzYWdlUGFyYW1ldGVyczogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+ID0gW107XHJcbiAgICBcclxuXHJcbiAgICBwcml2YXRlIF9tZXRhRGF0YTogTWFwcENvY2twaXRDb21wb25lbnRNZXRhRGF0YXx1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF9wYXJhbWV0ZXJzU291cmNlOiBQcm9wZXJ0eTxBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4+ID0gUHJvcGVydHkuY3JlYXRlPEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPj4oW10sKGRhdGFMaW5rKT0+e3RoaXMucmVxdWVzdFJlYWRDb21wb25lbnRQYXJhbWV0ZXJzKGRhdGFMaW5rKTt9KTtcclxuICAgIHByaXZhdGUgX21lc3NhZ2VQYXJhbWV0ZXJzU291cmNlOiBQcm9wZXJ0eTxBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4+ID0gUHJvcGVydHkuY3JlYXRlPEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPj4oW10sKGRhdGFMaW5rKT0+e3RoaXMucmVxdWVzdFJlYWRDb21wb25lbnRQYXJhbWV0ZXJzKGRhdGFMaW5rKTt9KTtcclxuICAgIHByaXZhdGUgX3dhdGNoYWJsZVBhcmFtZXRlcnNTb3VyY2U6IFByb3BlcnR5PEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPj4gPSBQcm9wZXJ0eS5jcmVhdGU8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+PihbXSwoZGF0YUxpbmspPT57dGhpcy5yZXF1ZXN0UmVhZENvbXBvbmVudFBhcmFtZXRlcnMoZGF0YUxpbmspO30pO1xyXG4gICAgcHJpdmF0ZSBfY29uZmlndXJhdGlvblBhcmFtZXRlcnNTb3VyY2U6IFByb3BlcnR5PEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPj4gPSBQcm9wZXJ0eS5jcmVhdGU8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+PihbXSwoZGF0YUxpbmspPT57dGhpcy5yZXF1ZXN0UmVhZENvbXBvbmVudFBhcmFtZXRlcnMoZGF0YUxpbmspO30pO1xyXG4gICBcclxuICAgIHByaXZhdGUgX21ldGhvZHNTb3VyY2U6IFByb3BlcnR5PEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kPj4gPSBQcm9wZXJ0eS5jcmVhdGU8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRNZXRob2Q+PihbXSwoZGF0YUxpbmspPT57dGhpcy5yZXF1ZXN0UmVhZENvbXBvbmVudE1ldGhvZHMoZGF0YUxpbmspO30pO1xyXG4gICAgcHJpdmF0ZSBfY29tbWFuZENvbm5lY3QgPSBDb21tYW5kLmNyZWF0ZTxhbnksYW55Pih0aGlzLCB0aGlzLmV4ZWN1dGVDb21tYW5kQ29ubmVjdCgpKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIHNldHMvZ2V0cyB0aGUgcGFyYW1ldGVycyBvZiB0aGUgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgXHJcbiAgICBwdWJsaWMgZ2V0IGNvbW1hbmRDb25uZWN0Q29tcG9uZW50KCkgOiBDb21tYW5kPGFueSxhbnk+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29tbWFuZENvbm5lY3Q7XHJcbiAgICB9XHJcbiAgICBcclxuXHJcblxyXG4gICAgcHJpdmF0ZSBleGVjdXRlQ29tbWFuZENvbm5lY3QoKTogSUNvbW1hbmRFeGVjdXRpb25EZWxlZ2F0ZTxhbnksYW55PiB7XHJcbiAgICAgICAgcmV0dXJuIGFzeW5jIChjb21tYW5kUGFycyxjb21tYW5kUmVzcG9uc2UpID0+IHsgXHJcbiAgICAgICAgICAgIGxldCBtb2RlbCA9ICg8YW55PnRoaXMpLm1vZGVsIGFzIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG1vZGVsKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyByZWFkIHBhcmFtZXRlciBjb21wb25lbnQgc2V0XHJcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgbW9kZWwuYnJvd3NlQ29tcG9uZW50KHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBpbnRpdGlhbGx5IHVwZGF0ZSB0aGUgY29tcG9uZW50cyBhY2Nlc3MgcmlnaHRzXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVDb21wb25lbnRBY2Nlc3NSaWdodHMobW9kZWwpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyB3YXRjaCBhY2Nlc3MgcmlnaHQgY2hhbmdlc1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2JzZXJ2ZUNvbXBvbmVudEFjY2Vzc1JpZ2h0cyhtb2RlbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgZGF0YSBsaW5rXHJcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZFJlc3BvbnNlLmV4ZWN1dGVkKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb21tYW5kUmVzcG9uc2UucmVqZWN0ZWQoZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9ic2VydmVzIGNoYW5nZXMgb2YgdGhlIGFjY2VzcyByaWdodHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbH0gbWFpbk1vZGVsXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvYnNlcnZlQ29tcG9uZW50QWNjZXNzUmlnaHRzKG1haW5Nb2RlbDogTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWwpIHtcclxuICAgICAgICBtYWluTW9kZWwudXNlclJvbGVzLmNoYW5nZWQoKHVzZXJSb2xlcykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbXBvbmVudEFjY2Vzc1JpZ2h0cyhtYWluTW9kZWwpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgY29tcG9uZW50cnMgYWNjZXNzIHJpZ2h0c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsfSBtYWluTW9kZWxcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZUNvbXBvbmVudEFjY2Vzc1JpZ2h0cyhtYWluTW9kZWw6IE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsKSB7XHJcbiAgICAgICAgbGV0IHdyaXRlQWNjZXNzID0gbWFpbk1vZGVsLndyaXRlQWNjZXNzO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwidXNlciByb2xlcyBjaGFuZ2VkICVvIHdyaXRlIGFjY2VzcyA9JW9cIiwgbWFpbk1vZGVsLnVzZXJSb2xlcy52YWx1ZSwgd3JpdGVBY2Nlc3MpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlQ29tcG9uZW50TWVtYmVyQWNjZXNzUmlnaHRzKHdyaXRlQWNjZXNzKTtcclxuICAgICAgICB0aGlzLndyaXRlQWNjZXNzLnZhbHVlID0gd3JpdGVBY2Nlc3M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBhY2Nlc3MgcmlnaHRzIG9mIGNvbXBvbmVudCBtZW1iZXJzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSB3cml0ZUFjY2Vzc1xyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgdXBkYXRlQ29tcG9uZW50TWVtYmVyQWNjZXNzUmlnaHRzKHdyaXRlQWNjZXNzOiBib29sZWFuKTogYW55IHtcclxuICAgICAgIHRoaXMudXBkYXRlUGFyYW1ldGVyQWNjZXNzUmlnaHRzKHdyaXRlQWNjZXNzKTtcclxuICAgICAgIHRoaXMudXBkYXRlTWV0aG9kc0FjY2Vzc1JpZ2h0cyh3cml0ZUFjY2Vzcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBwYXJhbWV0ZXJzIGFjY2VzcyByaWdodHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlUGFyYW1ldGVyQWNjZXNzUmlnaHRzKHdyaXRlQWNjZXNzOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLmZvckVhY2goKHBhcmFtZXRlcikgPT4ge1xyXG4gICAgICAgICAgICAvLyByZXdyaXRlIHRoZSBwYXJhbWV0ZXJzIHdyaXRlIGFjY2VzcyBwcm9wZXJ0eSB3aXRoIGl0cyBvcmlnaW5hbCByYXcgdmFsdWUgdG8gZm9yY2UgdHJpZ2dlcmluZyB0aGUgY2hhbmdlZCBldmVudC4gVGhpcyBpcyBqdXN0IGEgd29ya2Fyb3VuZFxyXG4gICAgICAgICAgICAvLyB0byBmaXggdGhlIGxvZyBpbi9vdXQgcHJvYmxlbSBkaXNwbGF5aW5nIHdyb25nIHJlYWRvbmx5IHN0YXRlcy5cclxuICAgICAgICAgICAgLy8gdGhlIHdvcmthcm91bmQgaXMgaW50ZW5kZWQgdG8gYmUgcmVwbGFjZWQgYnkgcHJvcGVyIGJhdGNoIHJlZnJlc2ggcmVxdWVzdHMhXHJcbiAgICAgICAgICAgIHBhcmFtZXRlci5pc1dyaXRlYWJsZS52YWx1ZSA9ICg8YW55PnBhcmFtZXRlci5pc1dyaXRlYWJsZSkuX3ZhbHVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgbWV0aG9kcyBhY2Nlc3MgcmlnaHRzXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgdXBkYXRlTWV0aG9kc0FjY2Vzc1JpZ2h0cyh3cml0ZUFjY2VzczogYm9vbGVhbik6IGFueSB7XHJcbiAgICAgICAgdGhpcy5tZXRob2RzLmZvckVhY2goKG1ldGhvZCkgPT4ge1xyXG4gICAgICAgICAgICAvLyBjdXJyZW50bHkgdGhlIG1ldGhvZHMgZXhlY3V0YWJsZSB3cml0ZSBpcyBkaXJlY3RseSBkZXBlbmRpbmcgb24gdGhlIHdyaXRlIGFjY2Vzc1xyXG4gICAgICAgICAgICBtZXRob2QuaXNFeGVjdXRhYmxlLnZhbHVlID0gd3JpdGVBY2Nlc3M7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBzZXRzL2dldHMgdGhlIHBhcmFtZXRlcnMgb2YgdGhlIGNvbXBvbmVudFxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge0FycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBnZXQgbWV0aG9kcygpOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tZXRob2RzO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBtZXRob2RzKG1ldGhvZHM6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kPikge1xyXG4gICAgICAgIHRoaXMuX21ldGhvZHMgPSBtZXRob2RzO1xyXG4gICAgICAgIHRoaXMuX21ldGhvZHNTb3VyY2UudmFsdWUgPSB0aGlzLl9tZXRob2RzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBtZXRob2RzU291cmNlKCk6IFByb3BlcnR5PEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kPj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tZXRob2RzU291cmNlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB1c2VyTWV0aG9kcygpOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl91c2VyTWV0aG9kcztcclxuICAgIH1cclxuXHJcbiAgICBzZXQgdXNlck1ldGhvZHMobWV0aG9kczogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRNZXRob2Q+KSB7XHJcbiAgICAgICAgdGhpcy5fdXNlck1ldGhvZHMgPSBtZXRob2RzO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIHNldHMvZ2V0cyB0aGUgcGFyYW1ldGVycyBvZiB0aGUgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIGdldCBwYXJhbWV0ZXJzKCk6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcmFtZXRlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHBhcmFtZXRlcnMocGFyYW1ldGVyczogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+KSB7XHJcbiAgICAgICAgdGhpcy5fcGFyYW1ldGVycyA9IHBhcmFtZXRlcnM7XHJcbiAgICAgICAgdGhpcy5fcGFyYW1ldGVyc1NvdXJjZS52YWx1ZSA9IHRoaXMuX3BhcmFtZXRlcnM7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGdldCB3YXRjaGFibGVQYXJhbWV0ZXJzKCk6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dhdGNoYWJsZVBhcmFtZXRlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHdhdGNoYWJsZVBhcmFtZXRlcnMocGFyYW1ldGVyczogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+KSB7XHJcbiAgICAgICAgdGhpcy5fd2F0Y2hhYmxlUGFyYW1ldGVycyA9IHBhcmFtZXRlcnM7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldCBtZXNzYWdlUGFyYW1ldGVycygpOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tZXNzYWdlUGFyYW1ldGVycztcclxuICAgIH1cclxuXHJcbiAgICBzZXQgbWVzc2FnZVBhcmFtZXRlcnMocGFyYW1ldGVyczogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+KSB7XHJcbiAgICAgICAgdGhpcy5fbWVzc2FnZVBhcmFtZXRlcnMgPSBwYXJhbWV0ZXJzO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgZ2V0IGNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzKCk6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBjb25maWd1cmF0aW9uUGFyYW1ldGVycyhwYXJhbWV0ZXJzOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4pIHtcclxuICAgICAgICB0aGlzLl9jb25maWd1cmF0aW9uUGFyYW1ldGVycyA9IHBhcmFtZXRlcnM7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBnZXQgcGFyYW1ldGVyc1NvdXJjZSgpOiBQcm9wZXJ0eTxBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGFyYW1ldGVyc1NvdXJjZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbWVzc2FnZVBhcmFtZXRlcnNTb3VyY2UoKTogUHJvcGVydHk8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+PiB7XHJcbiAgICAgICAgLy8gZmlsdGVyIHRoZSB3YXRjaGFibGVzIGFuZCB1cGRhdGUgdGhlIHdhdGNoYWJsZXMgcGFyYW1ldGVyIGxpc3RcclxuICAgICAgICB0aGlzLl9tZXNzYWdlUGFyYW1ldGVyc1NvdXJjZS52YWx1ZSA9IHRoaXMuX21lc3NhZ2VQYXJhbWV0ZXJzO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tZXNzYWdlUGFyYW1ldGVyc1NvdXJjZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgd2F0Y2hhYmxlUGFyYW1ldGVyc1NvdXJjZSgpOiBQcm9wZXJ0eTxBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4+IHtcclxuICAgICAgICAvLyBmaWx0ZXIgdGhlIHdhdGNoYWJsZXMgYW5kIHVwZGF0ZSB0aGUgd2F0Y2hhYmxlcyBwYXJhbWV0ZXIgbGlzdFxyXG4gICAgICAgIHRoaXMuX3dhdGNoYWJsZVBhcmFtZXRlcnNTb3VyY2UudmFsdWUgPSB0aGlzLl93YXRjaGFibGVQYXJhbWV0ZXJzO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl93YXRjaGFibGVQYXJhbWV0ZXJzU291cmNlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBnZXQgY29uZmlndXJhdGlvblBhcmFtZXRlcnNTb3VyY2UoKTogUHJvcGVydHk8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+PiB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlndXJhdGlvblBhcmFtZXRlcnNTb3VyY2UudmFsdWUgPSB0aGlzLl9jb25maWd1cmF0aW9uUGFyYW1ldGVycztcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlndXJhdGlvblBhcmFtZXRlcnNTb3VyY2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZWZyZXNoZXMgdGhlIGNvbXBvbmVudHMgcGFyYW1ldGVyIGxpc3RcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtQcm9wZXJ0eTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdPn0gZGF0YUxpbmtcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgcmVxdWVzdFJlYWRDb21wb25lbnRQYXJhbWV0ZXJzKGRhdGFMaW5rOiBQcm9wZXJ0eTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdPik6IFByb21pc2U8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXT4ge1xyXG4gICAgICAgIGxldCBjb21wb25lbnRQYXJhbWV0ZXJzOk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10gPSBbXTtcclxuICAgICAgICAvLyBnZXQgdGhlIGNvbXBvbmVudHMgbWFpbiBtb2RlbFxyXG4gICAgICAgIGxldCBtb2RlbCA9ICg8YW55PnRoaXMpLm1vZGVsIGFzIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChtb2RlbCl7XHJcbiAgICAgICAgICAgICAgICAvLyByZWFkIHBhcmFtZXRlciBjb21wb25lbnQgc2V0XHJcbiAgICAgICAgICAgICAgICBjb21wb25lbnRQYXJhbWV0ZXJzID0gYXdhaXQgbW9kZWwuYnJvd3NlUGFyYW1ldGVycyh0aGlzKTtcclxuICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgZGF0YSBsaW5rXHJcbiAgICAgICAgICAgICAgICBkYXRhTGluay5yZWFkUmVxdWVzdEV4ZWN1dGVkKGNvbXBvbmVudFBhcmFtZXRlcnMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgZGF0YUxpbmsucmVhZFJlcXVlc3RSZWplY3RlZChlcnJvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY29tcG9uZW50UGFyYW1ldGVycztcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWZyZXNoZXMgdGhlIGNvbXBvbmVudHMgbWV0aG9kc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7UHJvcGVydHk8TWFwcENvY2twaXRDb21wb25lbnRNZXRob2RbXT59IGRhdGFMaW5rXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIHJlcXVlc3RSZWFkQ29tcG9uZW50TWV0aG9kcyhkYXRhTGluazogUHJvcGVydHk8TWFwcENvY2twaXRDb21wb25lbnRNZXRob2RbXT4pOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIGxldCBjb21wb25lbnRNZXRob2RzOk1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kW10gPSBbXTtcclxuICAgICAgICAvLyBnZXQgdGhlIGNvbXBvbmVudHMgbWFpbiBtb2RlbFxyXG4gICAgICAgIGxldCBtb2RlbCA9ICg8YW55PnRoaXMpLm1vZGVsIGFzIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChtb2RlbCl7XHJcbiAgICAgICAgICAgICAgICAvLyByZWFkIHBhcmFtZXRlciBjb21wb25lbnQgc2V0XHJcbiAgICAgICAgICAgICAgICBjb21wb25lbnRNZXRob2RzID0gYXdhaXQgbW9kZWwuYnJvd3NlTWV0aG9kcyh0aGlzKTtcclxuICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgZGF0YSBsaW5rXHJcbiAgICAgICAgICAgICAgICBkYXRhTGluay5yZWFkUmVxdWVzdEV4ZWN1dGVkKGNvbXBvbmVudE1ldGhvZHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgZGF0YUxpbmsucmVhZFJlcXVlc3RSZWplY3RlZChlcnJvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY29tcG9uZW50TWV0aG9kcztcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogIGdldHMgdGhlIG1ldGEgZGF0YSBvZiBhIGNvbXBvbmVudFxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIGdldCBtZXRhRGF0YSgpOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGFEYXRhfHVuZGVmaW5lZCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21ldGFEYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBtZXRhRGF0YShtZXRhRGF0YTogTWFwcENvY2twaXRDb21wb25lbnRNZXRhRGF0YXx1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLl9tZXRhRGF0YSA9IG1ldGFEYXRhO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlZ2lzdGVycyBvciBtYXJrcyB0aGUgY29tcG9uZW50IGFzIHVzZXIgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudH0gY29tcG9uZW50XHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgcmVnaXN0ZXJVc2VyQ29tcG9uZW50KGNvbXBvbmVudDogTWFwcENvY2twaXRDb21wb25lbnQpOiB2b2lkIHtcclxuICAgICAgICAoPGFueT5jb21wb25lbnQpLmlzVXNlckNvbXBvbmVudCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXRlcm1pbmVzIGlmIHRoZSBjb21wb25lbnQgaXMgYSB1c2VyIGNvbXBvbmVudFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnR9IGNvbXBvbmVudFxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGlzVXNlckNvbXBvbmVudChjb21wb25lbnQ6IE1hcHBDb2NrcGl0Q29tcG9uZW50KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICg8YW55PmNvbXBvbmVudCkuaXNVc2VyQ29tcG9uZW50O1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGUgY2xhc3MgaW1wbGVtZW50cyBtZXRob2QgYWNjZXNzLlxyXG4gKlxyXG4gKiBAY2xhc3MgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RcclxuICovXHJcbmNsYXNzIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kIGV4dGVuZHMgTWFwcENvY2twaXRDb21wb25lbnRJdGVtIHtcclxuXHJcblxyXG5cclxuICAgIC8vIEhvbGRzIHRoZSBtZXRob2QgcGFyYW1ldGVyc1xyXG4gICAgX2lucHV0UGFyYW1ldGVyczogQXJyYXk8TWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXI+ID0gW107XHJcbiAgICAvLyBzcGVjZWZpZXMgaWYgdGhlIG1ldGhvZCBpcyBleGVjdXRhYmxlXHJcbiAgICBwcm90ZWN0ZWQgX2lzRXhlY3V0YWJsZTogUHJvcGVydHk8Ym9vbGVhbj4gPSBQcm9wZXJ0eS5jcmVhdGU8Ym9vbGVhbj4oZmFsc2UsdW5kZWZpbmVkLHVuZGVmaW5lZCwodmFsdWUpPT50aGlzLm1ldGhvZElzRXhlY3V0YWJsZSh2YWx1ZSkpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgaW5wdXQgcGFyYW1ldGVycyBvZiB0aGUgbWV0aG9kXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7QXJyYXk8TWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXI+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgaW5wdXRQYXJhbWV0ZXJzKCk6IEFycmF5PE1hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVyPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lucHV0UGFyYW1ldGVycztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEludm9rZXMgdGhlIGV4ZWN1dGlvbiBvZiB0aGUgY29tcG9uZW50IG1ldGhvZFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRNZXRob2R9IGNvbXBvbmVudE1ldGhvZFxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFzeW5jIGV4ZWN1dGUoY29tcG9uZW50TWV0aG9kOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgLy8gZ2V0IHRoZSBtZXRob2RzIG1vZGVsIGZyb20gdGhlIHBhcmVudCBjb21wb25lbnRcclxuICAgICAgICBsZXQgbW9kZWwgPSAoPGFueT5jb21wb25lbnRNZXRob2QuY29tcG9uZW50KS5tb2RlbCBhcyBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbDtcclxuICAgICAgICBpZiAobW9kZWwgJiYgbW9kZWwuZXhlY3V0ZUNvbXBvbmVudE1ldGhvZCkge1xyXG4gICAgICAgICAgICAvLyBpbnZva2UgdGhlIGV4ZWN1dGlvbiBvZiB0aGUgbWV0aG9kXHJcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBtb2RlbC5leGVjdXRlQ29tcG9uZW50TWV0aG9kKGNvbXBvbmVudE1ldGhvZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmluZHMgYSBtZXRob2QgYnkgbmFtZVxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2ROYW1lXHJcbiAgICAgKiBAcGFyYW0geyhNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFtdfHVuZGVmaW5lZCl9IGNvbXBvbmVudE1ldGhvZHNcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2luY2x1ZGVJbnRlcm5hbHM9dHJ1ZV1cclxuICAgICAqIEByZXR1cm5zIHtNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZHx1bmRlZmluZWR9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGZpbmQobWV0aG9kTmFtZTpzdHJpbmcsIGNvbXBvbmVudE1ldGhvZHM6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kW118dW5kZWZpbmVkLGluY2x1ZGVJbnRlcm5hbHM6IGJvb2xlYW4gPSB0cnVlKTogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2R8dW5kZWZpbmVkIHtcclxuXHJcbiAgICAgICAgbGV0IG1ldGhvZDpNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZHx1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgIGlmIChjb21wb25lbnRNZXRob2RzKSB7XHJcbiAgICAgICAgICAgIGxldCBtb2RlbCA9ICg8YW55PmNvbXBvbmVudE1ldGhvZHNbMF0uY29tcG9uZW50KS5tb2RlbCBhcyBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbDtcclxuICAgICAgICAgICAgaWYgKG1vZGVsKSB7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIC8vIGdldCB0aGUgZXhlY3V0YWJsZSBtZXRob2RzXHJcbiAgICAgICAgICAgICAgICBsZXQgZXhlY3V0YWJsZU1ldGhvZHMgPSBpbmNsdWRlSW50ZXJuYWxzID8gKDxhbnk+Y29tcG9uZW50TWV0aG9kc1swXSkuY29tcG9uZW50Lm1ldGhvZHMgOiBjb21wb25lbnRNZXRob2RzO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBsZXQgbWF0Y2hpbmdNZXRob2RzID0gZXhlY3V0YWJsZU1ldGhvZHMuZmlsdGVyKChtZXRob2QpPT57IHJldHVybiBtZXRob2QuYnJvd3NlTmFtZSA9PT0gbWV0aG9kTmFtZSB9KTtcclxuICAgICAgICAgICAgICAgIGlmIChtYXRjaGluZ01ldGhvZHMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY2FsbCB0aGUgcmVxdWVzdGVkIG1ldGhvZFxyXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZCA9IG1hdGNoaW5nTWV0aG9kc1swXTtcclxuICAgICAgICAgICAgICAgIH0gICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG1ldGhvZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgaWYgdGhlIG1ldGhvZCBpcyBleGVjdXRhYmxlXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7UHJvcGVydHk8Ym9vbGVhbj59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBpc0V4ZWN1dGFibGUoKTogUHJvcGVydHk8Ym9vbGVhbj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pc0V4ZWN1dGFibGU7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGV0ZXJtaW5lcyBpZiB0aGUgbWV0aGlkIGlzIGV4ZWN1dGFibGVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGV4ZWN1dGFibGVcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbWV0aG9kSXNFeGVjdXRhYmxlKGV4ZWN1dGFibGU6IGJvb2xlYW4pOiBhbnkge1xyXG4gICAgICAgIGxldCBpc0V4ZWN1dGFibGVWYWx1ZSA9IGV4ZWN1dGFibGU7XHJcbiAgICAgICAgbGV0IG1vZGVsID0gKDxhbnk+dGhpcy5jb21wb25lbnQpLm1vZGVsIGFzIE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsO1xyXG4gICAgICAgIGlmIChtb2RlbCAmJiB0aGlzLmNvbXBvbmVudCkge1xyXG4gICAgICAgICAgICAvLyByZXNwZWN0IHdyaXRlIGFjY2VzcyBmb3IgdXNlciBjb21wb25lbnRzIG90aGVyd2lzZSBlbmFibGUgbWV0aG9kIGV4ZWN1dGlvblxyXG4gICAgICAgICAgICBpc0V4ZWN1dGFibGVWYWx1ZSA9IE1hcHBDb2NrcGl0Q29tcG9uZW50LmlzVXNlckNvbXBvbmVudCh0aGlzLmNvbXBvbmVudCBhcyBNYXBwQ29ja3BpdENvbXBvbmVudCkgPyAgbW9kZWwud3JpdGVBY2Nlc3MgOiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaXNFeGVjdXRhYmxlVmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBtZXRob2RzIGlucHV0IHBhcmFtZXRlcnNcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kfSBjb21wb25lbnRNZXRob2RcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPE1hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVyW10+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBhc3luYyB1cGRhdGVJbnB1dFBhcmFtZXRlcnMoY29tcG9uZW50TWV0aG9kOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCk6IFByb21pc2U8TWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXJbXT4ge1xyXG4gICAgICAgIC8vIGdldCB0aGUgbWV0aG9kcyBtb2RlbCBmcm9tIHRoZSBwYXJlbnQgY29tcG9uZW50XHJcbiAgICAgICAgbGV0IG1vZGVsID0gKDxhbnk+Y29tcG9uZW50TWV0aG9kLmNvbXBvbmVudCkubW9kZWwgYXMgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWw7XHJcbiAgICAgICAgaWYgKG1vZGVsICYmIG1vZGVsLmV4ZWN1dGVDb21wb25lbnRNZXRob2QpIHtcclxuICAgICAgICAgICAgLy8gYnJvd3NlIGlucHV0IHBhcmFtZXRlcnMgaWYgbm90IHlldCBkZWZpbmVkLlxyXG4gICAgICAgICAgICAvL1RPRE86IG9wdGltaXplIC0gYXZvaWQgcmVicm93c2luZyBhbHJlYWQgYnJvd3NlZCBidXQgZW1wdHkgaW5wdXQgcGFyYW1ldGVyc1xyXG4gICAgICAgICAgICBpZiAoY29tcG9uZW50TWV0aG9kLmlucHV0UGFyYW1ldGVycy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGF3YWl0IG1vZGVsLmJyb3dzZU1ldGhvZElucHV0UGFyYW1ldGVycyhjb21wb25lbnRNZXRob2QpO1xyXG4gICAgICAgICAgICAgICAgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvLnVwZGF0ZU1ldGhvZElucHV0UGFyYW1ldGVycyhjb21wb25lbnRNZXRob2QpOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudE1ldGhvZC5pbnB1dFBhcmFtZXRlcnM7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cclxuY2xhc3MgTWFwcENvY2twaXRQYXJhbWV0ZXIgZXh0ZW5kcyBNYXBwQ29ja3BpdENvbXBvbmVudEl0ZW0ge1xyXG5cclxuXHJcbiAgICAvLyBIb2xkcyB0aGUgcGFyYW1ldGVycyB0eXBlXHJcbiAgICBwcm90ZWN0ZWQgX2RhdGFUeXBlOiBNYXBwQ29ja3BpdFBhcmFtZXRlckRhdGFUeXBlID0gbmV3IE1hcHBDb2NrcGl0UGFyYW1ldGVyRGF0YVR5cGUoKTtcclxuICAgIHByb3RlY3RlZCBfZW51bVJlZjogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtID0gbmV3IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bShudWxsKTtcclxuICAgIHByb3RlY3RlZCBfZW5naW5lZXJpbmdVbml0OiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHJvdGVjdGVkIF9pc1dyaXRlYWJsZTogUHJvcGVydHk8Ym9vbGVhbj4gPSBQcm9wZXJ0eS5jcmVhdGU8Ym9vbGVhbj4oZmFsc2UsdW5kZWZpbmVkLHVuZGVmaW5lZCwodmFsdWUpPT50aGlzLnBhcmFtZXRlcklzV3JpdGFibGUodmFsdWUpKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHBhcmFtZXRlcnMgdmFsdWUgb2JqZWN0XHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7KE1hcHBDb2NrcGl0UGFyYW1ldGVyRGF0YVR5cGUpfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0UGFyYW1ldGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgZGF0YVR5cGUoKTogTWFwcENvY2twaXRQYXJhbWV0ZXJEYXRhVHlwZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFUeXBlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgZGF0YVR5cGUoZGF0YVR5cGU6IE1hcHBDb2NrcGl0UGFyYW1ldGVyRGF0YVR5cGUpIHtcclxuICAgICAgICB0aGlzLl9kYXRhVHlwZSA9IGRhdGFUeXBlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgZW5naW5lZXJpbmdVbml0KCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VuZ2luZWVyaW5nVW5pdDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGVuZ2luZWVyaW5nVW5pdChlbmdpbmVlcmluZ1VuaXQ6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2VuZ2luZWVyaW5nVW5pdCA9IGVuZ2luZWVyaW5nVW5pdDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGdldCBlbnVtVHlwZSgpOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW0ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9lbnVtUmVmO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgc2V0IGVudW1UeXBlKGVudW1SZWY6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bSkge1xyXG4gICAgICAgIHRoaXMuX2VudW1SZWYgPSBlbnVtUmVmO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGlzV3JpdGVhYmxlKCk6IFByb3BlcnR5PGJvb2xlYW4+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faXNXcml0ZWFibGU7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGV0ZXJtaW5lcyBpZiB0aGUgcHJvcGVydGllcyB2YWx1ZSBpcyB3cml0YWJsZS5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSB2YWx1ZVxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRQYXJhbWV0ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBwYXJhbWV0ZXJJc1dyaXRhYmxlKHdyaXRhYmxlOiBib29sZWFuKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IHdyaXRhYmxlVmFsdWUgPSB3cml0YWJsZTtcclxuICAgICAgICBsZXQgbW9kZWwgPSAoPGFueT50aGlzLmNvbXBvbmVudCkubW9kZWwgYXMgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWw7XHJcbiAgICAgICAgaWYgKG1vZGVsKSB7XHJcbiAgICAgICAgICAgIHdyaXRhYmxlVmFsdWUgPSB3cml0YWJsZSAmJiBtb2RlbC53cml0ZUFjY2VzcztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHdyaXRhYmxlVmFsdWU7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBnZXQgZGlzcGxheVZhbHVlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVUb1N0cmluZyh0aGlzLl92YWx1ZVNvdXJjZS52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBkaXNwbGF5VmFsdWUoaW5wdXRWYWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IG5ld1ZhbHVlID0gdGhpcy52YWx1ZUZyb21TdHJpbmcoaW5wdXRWYWx1ZSk7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IG5ld1ZhbHVlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTWFwcENvY2twaXRQYXJhbWV0ZXIuc2V0RGlzcGxheVZhbHVlICVvIGZvciAlb1wiLCB0aGlzLnZhbHVlLCBpbnB1dFZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNvbnZlcnRzIHRoZSBwYXJhbWV0ZXIgdmFsdWUgdG8gYSBmb3JtYXR0ZWQgc3RyaW5nXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBfdmFsdWVcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRQYXJhbWV0ZXJcclxuICAgICAqL1xyXG4gICAgdmFsdWVUb1N0cmluZyhfdmFsdWU6IGFueSk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IHZhbHVlU3RyaW5nID1cIlwiO1xyXG4gICAgICAgIC8vIGF2b2lkIGNvbnZlcnRpbmcgbnVsbCBvciB1bmRlZmluZWQgdmFsdWVcclxuICAgICAgICBpZiAodGhpcy5fdmFsdWVTb3VyY2UudmFsdWUgIT0gbnVsbCAmJiB0aGlzLl92YWx1ZVNvdXJjZS52YWx1ZSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdmFsdWVTdHJpbmcgPSB0aGlzLl92YWx1ZVNvdXJjZS52YWx1ZS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICB2YWx1ZVN0cmluZyA9IE51bWVyaWNIZWxwZXIuY29udmVydE51bWVyaWNTdHJpbmcodmFsdWVTdHJpbmcsIHRoaXMuZGF0YVR5cGUubmFtZSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmVudW1UeXBlLmlzRGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdmFsdWVTdHJpbmcgPSB0aGlzLmVudW1UeXBlLmdldERpc3BsYXlWYWx1ZSh0aGlzLl92YWx1ZVNvdXJjZS52YWx1ZSk7XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlU3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY29udmVydHMgYSBwYXJhbWV0ZXIgdmFsdWUgc3RyaW5nIHRvIGEgdmFsdWUgYWNjb3JkaW5nIHRvIHRoZSBwYXJhbWV0ZXJzIGRhdGEgdHlwZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbnB1dFZhbHVlXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFBhcmFtZXRlclxyXG4gICAgICovXHJcbiAgICB2YWx1ZUZyb21TdHJpbmcoaW5wdXRWYWx1ZTogc3RyaW5nKTogYW55IHtcclxuXHJcbiAgICAgICAgLy8gc2V0IGFuIGVtcHR5IHN0cmluZyBmb3IgYW4gdW5kZWZpbmVkIGlucHV0IHZhbHVlXHJcbiAgICAgICAgbGV0IHZhbHVlID0gaW5wdXRWYWx1ZSAhPT0gdW5kZWZpbmVkICYmIGlucHV0VmFsdWUgIT09IG51bGwgPyBpbnB1dFZhbHVlIDogXCJcIjtcclxuXHJcbiAgICAgICAgLy8gcmVwbGFjZSB0aGUgZW51bSBzdHJpbmcgYnkgdGhlIHZhbHVlIGlmIHRoZXJlIGlzIG9uZSBkZWZpbmVkLlxyXG4gICAgICAgIGlmICh0aGlzLmVudW1UeXBlLmlzRGVmaW5lZCkge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IHRoaXMuZW51bVR5cGUuZ2V0VmFsdWUoaW5wdXRWYWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIFRoZSBjbGFzcyBpbXBsZW1lbnRzIGEgY29tcG9uZW50IHBhcmFtZXRlclxyXG4gKlxyXG4gKiBAY2xhc3MgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJcclxuICovXHJcbmNsYXNzIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyIGV4dGVuZHMgTWFwcENvY2twaXRQYXJhbWV0ZXIge1xyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb21wb25lbnQ6IE1hcHBDb2NrcGl0Q29tcG9uZW50SXRlbSB8IG51bGwsIG5hbWU6IHN0cmluZywgcmVmZXJlbmNlOiBhbnkpIHtcclxuICAgICAgICBzdXBlcihjb21wb25lbnQsbmFtZSxyZWZlcmVuY2UpO1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlU291cmNlID0gUHJvcGVydHkuY3JlYXRlPGFueT4oXCJcIix1bmRlZmluZWQsKGRhdGFMaW5rKT0+IHRoaXMucmVxdWVzdFdyaXRlVmFsdWUoZGF0YUxpbmspKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFdyaXRlcyB0aGUgY3VycmVudCBwYXJhbWV0ZXIgdmFsdWUgdG8gdGFyZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyXHJcbiAgICAgKi9cclxuICAgIHdyaXRlKHJlZmxlY3RlZFdyaXRlUmVzcG9uc2VEZWxlZ2F0ZTooKHJlc3VsdERhdGE6IGFueSk9PnZvaWQpfHVuZGVmaW5lZCl7XHJcblxyXG4gICAgICAgIC8vIGNvbm5lY3QgdGhlIHdyaXRlIHJlc3BvbnNlIGRlbGVnYXRlXHJcbiAgICAgICAgdGhpcy5yZWZsZWN0ZWRXcml0ZVJlc3BvbnNlRGVsZWdhdGUgPSByZWZsZWN0ZWRXcml0ZVJlc3BvbnNlRGVsZWdhdGU7XHJcblxyXG4gICAgICAgIC8vIGV4ZWN1dGUgd3JpdGluZyB0aGUgcGFyYW1ldGVyIHZhbHVlXHJcbiAgICAgICAgdGhpcy52YWx1ZVNvdXJjZS53cml0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogV3JpdGVzIHRoZSBkYXRhIGxpbmtzIHZhbHVlIHRvIHRhcmdldFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge1Byb3BlcnR5PGFueT59IGRhdGFMaW5rXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyByZXF1ZXN0V3JpdGVWYWx1ZShkYXRhTGluazpQcm9wZXJ0eTxhbnk+KTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbGV0IGNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50O1xyXG4gICAgICAgICAgICBpZiAoY29tcG9uZW50ICYmICg8YW55PmNvbXBvbmVudCkubW9kZWwpIHtcclxuICAgICAgICAgICAgICAgIHZhciBtb2RlbCA9ICg8YW55PmNvbXBvbmVudCkubW9kZWwgYXMgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWw7XHJcbiAgICAgICAgICAgICAgICBhd2FpdCBtb2RlbC53cml0ZUNvbXBvbmVudFBhcmFtZXRlcih0aGlzKTtcclxuICAgICAgICAgICAgICAgIGRhdGFMaW5rLndyaXRlUmVxdWVzdEV4ZWN1dGVkKG51bGwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgZGF0YUxpbmsud3JpdGVSZXF1ZXN0UmVqZWN0ZWQoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWF0ZXMgdGhlIG9ic2VydmF0aW9uIG9mIHBhcmFtZXRlciB2YWx1ZSBjaGFuZ2VzXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSB3YXRjaGFibGVQYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlclxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgb2JzZXJ2ZVBhcmFtZXRlclZhbHVlQ2hhbmdlcyhvYnNlcnZlcjogSU9ic2VydmVyLG9ic2VydmFibGVQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdKTogYW55IHtcclxuICAgICAgICBpZiAob2JzZXJ2YWJsZVBhcmFtZXRlcnMubGVuZ3RoID4gMCAmJiBvYnNlcnZhYmxlUGFyYW1ldGVyc1swXSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgLy8gZ2V0IHRoZSBwYXJhbWV0ZXJzIG1vZGVsIGZyb20gdGhlIHBhcmVudCBjb21wb25lbnRcclxuICAgICAgICAgICAgbGV0IG1vZGVsID0gTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIuZ2V0TW9kZWwob2JzZXJ2YWJsZVBhcmFtZXRlcnNbMF0pO1xyXG4gICAgICAgICAgICBpZiAobW9kZWwgJiYgbW9kZWwub2JzZXJ2ZURhdGFNb2RlbEl0ZW1zKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBpbnZva2UgdGhlIG9ic2VydmF0aW9uIG9uIHRoZSBtb2RlbFxyXG4gICAgICAgICAgICAgICAgbW9kZWwub2JzZXJ2ZURhdGFNb2RlbEl0ZW1zKG9ic2VydmVyLCBvYnNlcnZhYmxlUGFyYW1ldGVycyk7XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBY3RpdmF0ZXMgbW9kZWwgaXRlbXMgcmVnaXN0ZXJlZCBmb3Igb2JzZXJ2YXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0geyp9IG9ic2VydmVyXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IG9ic2VydmFibGVQYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlclxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYWN0aXZhdGVDb21wb25lbnRNb2RlbEl0ZW1zKG9ic2VydmVyOiBhbnksb2JzZXJ2YWJsZVBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pOiBhbnkge1xyXG4gICAgICAgIC8vVE9ETzogaW1wbGVtZW50IG1vZGVsIGl0ZW0gYWN0aXZhdGlvbiBoYW5kbGluZ1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVub2JzZXJ2ZXMgYWxsIG9ic2VydmFibGVzIGFzc29jaWF0ZWQgd2l0aCB0aGUgb2JzZXJ2ZXJcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0geyp9IG9ic2VydmVyXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IG9ic2VydmVkUGFyYW1ldGVyc1xyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbc3VzcGVuZD10cnVlXSBzdXNwZW5kcyB0aGUgb2JzZXJ2YXRpb24gaWYgdHJ1ZSBvdGhlcndpc2UgcmVtb3ZlcyB0aGUgd2hvbGUgc3Vic2NyaXB0aW9uXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHVub2JzZXJ2ZUNvbXBvbmVudE1vZGVsSXRlbXMob2JzZXJ2ZXI6IGFueSxvYnNlcnZlZFBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10sIHN1c3BlbmQ6Ym9vbGVhbiA9IHRydWUpIHtcclxuICAgICAgICBpZiAob2JzZXJ2ZWRQYXJhbWV0ZXJzLmxlbmd0aCA+IDAgJiYgb2JzZXJ2ZWRQYXJhbWV0ZXJzWzBdICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBsZXQgbW9kZWwgPSBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlci5nZXRNb2RlbChvYnNlcnZlZFBhcmFtZXRlcnNbMF0pO1xyXG4gICAgICAgICAgICBpZiAobW9kZWwgJiYgbW9kZWwudW5vYnNlcnZlQ29tcG9uZW50TW9kZWxJdGVtcykge1xyXG4gICAgICAgICAgICAgICAgLy8gaW52b2tlIHRoZSB1bm9ic2VydmF0aW9uIG9uIHRoZSBtb2RlbFxyXG4gICAgICAgICAgICAgICAgbW9kZWwudW5vYnNlcnZlQ29tcG9uZW50TW9kZWxJdGVtcyhvYnNlcnZlciwgb2JzZXJ2ZWRQYXJhbWV0ZXJzLHN1c3BlbmQpO1xyXG4gICAgICAgICAgICB9ICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlYWN0aXZhdGVzIG1vZGVsIGl0ZW1zIHJlZ2lzdGVyZWQgZm9yIG9ic2VydmF0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHsqfSBvYnNlcnZlclxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSBvYnNlcnZlZFBhcmFtZXRlcnNcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW3N1c3BlbmQ9dHJ1ZV1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlclxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZGVhY3RpdmF0ZUNvbXBvbmVudE1vZGVsSXRlbXMob2JzZXJ2ZXI6IGFueSxvYnNlcnZlZFBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10sIHN1c3BlbmQ6Ym9vbGVhbiA9IHRydWUpIHtcclxuICAgICAgICAvL1RPRE86IGltcGxlbWVudCBtb2RlbCBpdGVtIGRlYWN0aXZhdGlvbiBoYW5kbGluZ1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHBhcmFtZXRlcnMgbW9kZWxcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSBvYnNlcnZhYmxlUGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZXRNb2RlbChjb21wb25lbnRQYXJhbWV0ZXI6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyKSB7XHJcbiAgICAgICAgaWYgKCFjb21wb25lbnRQYXJhbWV0ZXIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImNvbXBvbmVudFBhcmFtZXRlciB1bmRlZmluZWQgIVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFjb21wb25lbnRQYXJhbWV0ZXIuY29tcG9uZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJjb21wb25lbnRQYXJhbWV0ZXIuY29tcG9uZW50IHVuZGVmaW5lZCAhXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKDxhbnk+Y29tcG9uZW50UGFyYW1ldGVyLmNvbXBvbmVudCkubW9kZWwgYXMgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWw7XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIGltcGxlbWVudHMgYSBtZXRob2QgcGFyYW1ldGVyXHJcbiAqXHJcbiAqIEBjbGFzcyBNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlclxyXG4gKiBAZXh0ZW5kcyB7TWFwcENvY2twaXRQYXJhbWV0ZXJ9XHJcbiAqL1xyXG5jbGFzcyBNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlciBleHRlbmRzIE1hcHBDb2NrcGl0UGFyYW1ldGVyIHtcclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBkZWZpbmVzIHRoZSBwYXJhbWV0ZXIgZGF0YSB0eXBlXHJcbiAqXHJcbiAqIEBjbGFzcyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckRhdGFUeXBlXHJcbiAqL1xyXG5jbGFzcyBNYXBwQ29ja3BpdFBhcmFtZXRlckRhdGFUeXBlIHtcclxuICAgIHByaXZhdGUgX2RhdGFUeXBlSWQgPSBcInVuZGVmaW5lZFwiO1xyXG4gICAgcHJpdmF0ZSBfZGF0YVR5cGVOYW1lID0gXCJ1bmRlZmluZWRcIjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihkYXRhVHlwZUlkOiBzdHJpbmcgPSBcInVuZGVmaW5lZFwiLCBkYXRhVHlwZU5hbWU6IHN0cmluZyA9IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICB0aGlzLl9kYXRhVHlwZUlkID0gZGF0YVR5cGVJZDtcclxuICAgICAgICB0aGlzLl9kYXRhVHlwZU5hbWUgPSBkYXRhVHlwZU5hbWU7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBnZXQgaWQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcywgdGhpcy5fZGF0YVR5cGVJZFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhVHlwZU5hbWVcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIGltcGxlbWVudHMgYSBzaW5nbGUgZW51bSB2YWx1ZSB3aXRoIHZhbHVlIGFuZCBzdHJpbmdcclxuICpcclxuICogQGNsYXNzIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bVZhbHVlXHJcbiAqL1xyXG5jbGFzcyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW1WYWx1ZSBpbXBsZW1lbnRzIElWYWx1ZUxpc3RJdGVtIHtcclxuICAgIF9kaXNwbGF5VmFsdWU6IHN0cmluZyA9IFwidW5kZWZpbmVkXCI7XHJcbiAgICBfdmFsdWU6IGFueSA9IG51bGw7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bVZhbHVlLlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRpc3BsYXlUZXh0XHJcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtVmFsdWVcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoZGlzcGxheVRleHQ6IHN0cmluZywgdmFsdWU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX2Rpc3BsYXlWYWx1ZSA9IGRpc3BsYXlUZXh0O1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXRzIHRoZSB2YWx1ZSBvZiB0aGUgZW51bVxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtVmFsdWVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCB2YWx1ZSgpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldHMgdGhlIHN0cmluZyBvZiB0aGUgZW51bSB2YWx1ZVxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW1WYWx1ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGRpc3BsYXlWYWx1ZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNwbGF5VmFsdWU7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4vKipcclxuICogaW1wbGVtZW50cyBhIHBhcmFtZXRlciBlbnVtIGhvbGRpbmcgYSBjb2xsZWN0aW9uIG9mIGVudW0gaXRlbXNcclxuICpcclxuICogQGNsYXNzIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bVxyXG4gKi9cclxuY2xhc3MgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtIHtcclxuXHJcbiAgICBwcml2YXRlIF9icm93c2VOYW1lOiBzdHJpbmcgPSBcIlwiO1xyXG5cclxuICAgIF9lbnVtVmFsdWVzUmVmZXJlbmNlOiBhbnk7XHJcblxyXG4gICAgcHJpdmF0ZSBfZW51bVZhbHVlcyE6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bVZhbHVlW107XHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGVudW1WYWx1ZXNSZWZlcmVuY2U6IGFueSA9IG51bGwpIHtcclxuICAgICAgICB0aGlzLl9lbnVtVmFsdWVzUmVmZXJlbmNlID0gZW51bVZhbHVlc1JlZmVyZW5jZTtcclxuICAgICAgICBpZiAodGhpcy5fZW51bVZhbHVlc1JlZmVyZW5jZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9icm93c2VOYW1lID0gdGhpcy5fZW51bVZhbHVlc1JlZmVyZW5jZS5icm93c2VOYW1lO1xyXG4gICAgICAgICAgICB0aGlzLl9lbnVtVmFsdWVzID0gdGhpcy5fZW51bVZhbHVlc1JlZmVyZW5jZS5lbnVtVmFsdWVzLm1hcCgoZW51bVZhbHVlUmVmKSA9PiB7IHJldHVybiBuZXcgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtVmFsdWUoZW51bVZhbHVlUmVmLmRpc3BsYXlOYW1lLnRleHQsIGVudW1WYWx1ZVJlZi52YWx1ZSk7IH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldHMgdGhlIGJyb3dzZSBuYW1lIG9mIHRoZSBlbnVtXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGJyb3dzZU5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZW51bVZhbHVlc1JlZmVyZW5jZS5icm93c2VOYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0cyB0aGUgY29sbGVjdGlvbiBvZiBlbnVtIGl0ZW1zXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtVmFsdWVbXX1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCB2YWx1ZXMoKTogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtVmFsdWVbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VudW1WYWx1ZXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBkZXRlcm1pbmVzIGlmIHRoZSBlbnVtIGlzIGRlZmluZWQgYW5kIGNvbnRhaW5zIHZhbHVlc1xyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgaXNEZWZpbmVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9lbnVtVmFsdWVzICYmIHRoaXMuX2VudW1WYWx1ZXMubGVuZ3RoID4gMDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXRzIGEgc3RyaW5nIG1hdGNoaW5nIHRoZSBzcGVjaWZpZWQgZW51bSB2YWx1ZSwgb3RoZXJ3aXNlIHJldHVybiB2YWx1ZSBzdHJpbmcgYXMgZGVmYXVsdC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW1cclxuICAgICAqL1xyXG4gICAgZ2V0RGlzcGxheVZhbHVlKGVudW1WYWx1ZTogYW55KTogc3RyaW5nIHtcclxuICAgICAgICAvLyBnZXQgYW4gZW51bSBpdGVtIG1hdGNoaW5nIHRoZSByZXF1ZXN0ZWQgdmFsdWVcclxuICAgICAgICBsZXQgbWF0Y2hpbmdFbnVtSXRlbSA9IHRoaXMuZmluZE1hdGNoaW5nRW51bUl0ZW1CeVZhbHVlKGVudW1WYWx1ZSk7XHJcblxyXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgdmFsdWUgc3RyaW5nIHRvIHRoZSBtYXRjaGluZyBvbmUgb3IgdXNlIHRoZSBkZWZhdWx0IHN0cmluZ1xyXG4gICAgICAgIGxldCBlbnVtVmFsdWVTdHJpbmcgPSBtYXRjaGluZ0VudW1JdGVtID8gbWF0Y2hpbmdFbnVtSXRlbS5kaXNwbGF5VmFsdWUgOiBlbnVtVmFsdWUudG9TdHJpbmcoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGVudW1WYWx1ZVN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlucHV0VmFsdWVcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bVxyXG4gICAgICovXHJcbiAgICBnZXRWYWx1ZShlbnVtRGlzcGxheVZhbHVlOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgICAgIGxldCBlbnVtVmFsdWUgPSBlbnVtRGlzcGxheVZhbHVlO1xyXG4gICAgICAgIC8vIGdldCBhbiBlbnVtIGl0ZW0gbWF0Y2hpbmcgdGhlIHJlcXVlc3RlZCBzdHJpbmdcclxuICAgICAgICBsZXQgbWF0Y2hpbmdFbnVtSXRlbSA9IHRoaXMuZmluZE1hdGNoaW5nRW51bUl0ZW1CeVN0cmluZyhlbnVtRGlzcGxheVZhbHVlKTtcclxuICAgICAgICBpZiAobWF0Y2hpbmdFbnVtSXRlbSkge1xyXG4gICAgICAgICAgICBlbnVtVmFsdWUgPSBtYXRjaGluZ0VudW1JdGVtLnZhbHVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW0uZ2V0VmFsdWU6IGNvdWxkIG5vdCBmaW5kIG1hdGNoaW5nIGVudW0gdmFsdWUgZm9yICVvXCIsIGVudW1EaXNwbGF5VmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGVudW1WYWx1ZTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZmluZCBhbiBlbnVtIGl0ZW0gd2l0aCBtYXRjaGluZyB2YWx1ZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGVudW1WYWx1ZVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW1cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBmaW5kTWF0Y2hpbmdFbnVtSXRlbUJ5VmFsdWUoZW51bVZhbHVlOiBhbnkpIHtcclxuICAgICAgICBsZXQgbWF0Y2hpbmdFbnVtSXRlbSA9IHRoaXMuX2VudW1WYWx1ZXMuZmlsdGVyKChlbnVtSXRlbSkgPT4geyByZXR1cm4gZW51bUl0ZW0udmFsdWUgPT0gZW51bVZhbHVlOyB9KTtcclxuICAgICAgICByZXR1cm4gbWF0Y2hpbmdFbnVtSXRlbS5sZW5ndGggPT09IDEgPyBtYXRjaGluZ0VudW1JdGVtWzBdIDogdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZmluZCBhbiBlbnVtIGl0ZW0gd2l0aCBtYXRjaGluZyBzdHJpbmdcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZW51bURpc3BsYXlWYWx1ZVxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtXHJcbiAgICAgKi9cclxuICAgIGZpbmRNYXRjaGluZ0VudW1JdGVtQnlTdHJpbmcoZW51bURpc3BsYXlWYWx1ZTogc3RyaW5nKTogYW55IHtcclxuICAgICAgICBsZXQgbWF0Y2hpbmdFbnVtSXRlbSA9IHRoaXMuX2VudW1WYWx1ZXMuZmlsdGVyKChlbnVtSXRlbSkgPT4geyByZXR1cm4gZW51bUl0ZW0uZGlzcGxheVZhbHVlID09PSBlbnVtRGlzcGxheVZhbHVlOyB9KTtcclxuICAgICAgICByZXR1cm4gbWF0Y2hpbmdFbnVtSXRlbS5sZW5ndGggPT09IDEgPyBtYXRjaGluZ0VudW1JdGVtWzBdIDogdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgICBNYXBwQ29ja3BpdENvbXBvbmVudCwgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIsIE1hcHBDb2NrcGl0UGFyYW1ldGVyRGF0YVR5cGUsIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bSwgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJFbnVtVmFsdWUsIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLCBNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlciwgTWFwcENvY2twaXRDb21wb25lbnRJdGVtLFxyXG5cclxufTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiJdfQ==