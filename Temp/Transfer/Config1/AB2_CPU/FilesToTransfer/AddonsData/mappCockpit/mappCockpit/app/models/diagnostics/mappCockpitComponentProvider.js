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
define(["require", "exports", "../../communication/rest/opcUaRestServices", "../online/mappCockpitComponent", "../online/mappCockpitComponentReflection"], function (require, exports, opcUaRestServices_1, ModelItems, mappCockpitComponentReflection_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Implements component access services
     *
     * @class MappCockpitComponentProvider
     */
    var MappCockpitComponentProvider = /** @class */ (function () {
        function MappCockpitComponentProvider(diagnosticProvider) {
            this._diagnosticProvider = diagnosticProvider;
        }
        /**
         * Browses the available mapp cockpit components
         *
         * @private
         * @param {number} sessionId
         * @param {number} namespaceIndex
         * @param {MappCockpitComponentDataModel} mappCockpitComponentDataModel
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitComponentProvider.prototype.browseComponents = function () {
            return __awaiter(this, void 0, void 0, function () {
                var allComponents, filteredMappCockpitComponents, mappCockpitComponents;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.browseNodes(this._diagnosticProvider.sessionId, this._diagnosticProvider.namespace + ";" + opcUaRestServices_1.OpcUaRestServices.mappCockpitRootNodeId)];
                        case 1:
                            allComponents = (_a.sent());
                            filteredMappCockpitComponents = opcUaRestServices_1.OpcUaRestServices.filterMappCockpitNodes(allComponents, this._diagnosticProvider.namespace);
                            mappCockpitComponents = filteredMappCockpitComponents.map(function (mappCockpitComponentRef) {
                                return new ModelItems.MappCockpitComponent(null, mappCockpitComponentRef.displayName, mappCockpitComponentRef);
                            });
                            return [2 /*return*/, mappCockpitComponents];
                    }
                });
            });
        };
        /**
         * browses the available meta information for a component
         *
         * @param {ModelItems.MappCockpitComponent} mappCockpitComponent
         * @returns {Promise<ModelItems.MappCockpitComponentParameter[]>}
         * @memberof MappCockpitComponentProvider
         */
        MappCockpitComponentProvider.prototype.browseComponentMetaInfo = function (mappCockpitComponent) {
            return __awaiter(this, void 0, void 0, function () {
                var metaInfoReferences;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.browseNodeMetaInfo(this._diagnosticProvider.sessionId, mappCockpitComponent.id)];
                        case 1:
                            metaInfoReferences = _a.sent();
                            return [2 /*return*/, metaInfoReferences];
                    }
                });
            });
        };
        /**
         * Browses the parameters of a component
         *
         * @private
         * @param {MappCockpitComponent} mappCockpitComponent
         * @returns
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitComponentProvider.prototype.browseComponentParameters = function (mappCockpitComponent) {
            return __awaiter(this, void 0, void 0, function () {
                var componentParameterSet, componentParameters;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.browseNodeParameterSet(this._diagnosticProvider.sessionId, mappCockpitComponent.id)];
                        case 1:
                            componentParameterSet = _a.sent();
                            componentParameters = componentParameterSet.map(function (parameter) {
                                var componentParameters = new ModelItems.MappCockpitComponentParameter(mappCockpitComponent, parameter.displayName, parameter);
                                return componentParameters;
                            });
                            mappCockpitComponent.parameters = componentParameters;
                            return [2 /*return*/, mappCockpitComponent.parameters];
                    }
                });
            });
        };
        /**
         * updates parameter data types
         *
         * @param {any[]} parameters
         * @returns {Promise<any>}
         * @memberof MappCockpitComponentProvider
         */
        MappCockpitComponentProvider.prototype.updateParameterDataTypes = function (parameters) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: 
                        // read and update parameter data types
                        return [4 /*yield*/, this.readParameterDataTypes(parameters)];
                        case 1:
                            // read and update parameter data types
                            _a.sent();
                            // read and update parameter enums
                            this.readParameterEnums(parameters);
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * reads parameter data types
         *
         * @param {ModelItems.MappCockpitComponentParameter[]} mappCockpitComponentParameters
         * @memberof MappCockpitComponentProvider
         */
        MappCockpitComponentProvider.prototype.readParameterDataTypes = function (mappCockpitComponentParameters) {
            return __awaiter(this, void 0, void 0, function () {
                var readParameterDataTypeRequests;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            readParameterDataTypeRequests = [];
                            mappCockpitComponentParameters.forEach(function (componentParameter) { readParameterDataTypeRequests.push(_this.updateParameterDataType(componentParameter)); });
                            return [4 /*yield*/, Promise.all(readParameterDataTypeRequests)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Updates the
         *
         * @param {MappCockpitComponentParameter} componentParameter
         * @returns {Promise<any>}
         * @memberof MappCockpitComponentProvider
         */
        MappCockpitComponentProvider.prototype.updateParameterDataType = function (componentParameter) {
            return __awaiter(this, void 0, void 0, function () {
                var dataTypeRef;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.readComponentParameterDataType(componentParameter)];
                        case 1:
                            dataTypeRef = _a.sent();
                            componentParameter.dataType = dataTypeRef;
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * reads and updates the parameter enums for enum data types
         *
         * @param {ModelItems.MappCockpitComponentParameter[]} mappCockpitComponentParameters
         * @returns {Promise<any>}
         * @memberof MappCockpitComponentProvider
         */
        MappCockpitComponentProvider.prototype.readParameterEnums = function (mappCockpitComponentParameters) {
            mappCockpitComponentReflection_1.MappCockpitComponentParameterInfo.readParameterEnums(mappCockpitComponentParameters);
        };
        /**
         * reads and updates method parameter enums
         *
         * @param {ModelItems.MappCockpitComponentMethod[]} methods
         * @returns {*}
         * @memberof MappCockpitComponentProvider
         */
        MappCockpitComponentProvider.prototype.readMethodParameterEnums = function (methods) {
            var metaData = methods[0].component.metaData;
            for (var i = 0; i < methods.length; i++) {
                var method = methods[i];
                if (method.inputParameters.length > 0) {
                    mappCockpitComponentReflection_1.MappCockpitComponentMethodInfo.readMethodParameterEnums(method, metaData);
                }
            }
        };
        /**
         * reads the data type of a parameter
         *
         * @param {ModelItems.MappCockpitComponentParameter} componentParameter
         * @returns {Promise<any>}
         * @memberof MappCockpitComponentProvider
         */
        MappCockpitComponentProvider.prototype.readComponentParameterDataType = function (componentParameter) {
            return __awaiter(this, void 0, void 0, function () {
                var parameterDataTypeId, parameterDataTypeNodeId;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.readNodeAttribute(this._diagnosticProvider.sessionId, componentParameter.id, opcUaRestServices_1.OpcUaAttribute.DATA_TYPE)];
                        case 1:
                            parameterDataTypeId = _a.sent();
                            parameterDataTypeNodeId = parameterDataTypeId;
                            return [4 /*yield*/, this.readDataTypeInfo(parameterDataTypeNodeId)];
                        case 2: 
                        // var parameterDataTypeBrowseName = await OpcUaRestServices.readNodeAttribute(this._diagnosticProvider.sessionId, parameterDataTypeNodeId,OpcUaAttribute.BROWSE_NAME);
                        return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * reads data type info for the specified data type id
         *
         * @private
         * @param {*} parameterDataTypeNodeId
         * @returns
         * @memberof MappCockpitComponentProvider
         */
        MappCockpitComponentProvider.prototype.readDataTypeInfo = function (parameterDataTypeNodeId) {
            return __awaiter(this, void 0, void 0, function () {
                var parameterDataTypeDisplayName;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.readNodeAttribute(this._diagnosticProvider.sessionId, parameterDataTypeNodeId, opcUaRestServices_1.OpcUaAttribute.DISPLAY_NAME)];
                        case 1:
                            parameterDataTypeDisplayName = _a.sent();
                            // var parameterDataTypeDescr = await OpcUaRestServices.readNodeAttribute(this._diagnosticProvider.sessionId, parameterDataTypeNodeId,OpcUaAttribute.DESCRIPTION);
                            return [2 /*return*/, new ModelItems.MappCockpitParameterDataType(parameterDataTypeNodeId, parameterDataTypeDisplayName)];
                    }
                });
            });
        };
        /**
         * reads a parameters value and updates the parameters value if specified
         *
         * @param {ModelItems.MappCockpitComponentParameter} componentParameter
         * @param {boolean} [update=true] updates the parameters value if true
         * @returns
         * @memberof MappCockpitComponentProvider
         */
        MappCockpitComponentProvider.prototype.readComponentParameterValue = function (componentParameter, update) {
            if (update === void 0) { update = true; }
            return __awaiter(this, void 0, void 0, function () {
                var componentParameterValue;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.readNodeAttribute(this._diagnosticProvider.sessionId, componentParameter.id)];
                        case 1:
                            componentParameterValue = _a.sent();
                            // update the parameters value
                            if (update) {
                                componentParameter.value = componentParameterValue;
                            }
                            return [2 /*return*/, componentParameterValue];
                    }
                });
            });
        };
        /**
         * writes a parameter value
         *
         * @param {ModelItems.MappCockpitComponentParameter} componentParameter
         * @returns
         * @memberof MappCockpitComponentProvider
         */
        MappCockpitComponentProvider.prototype.writeComponentParameterValue = function (componentParameter) {
            return __awaiter(this, void 0, void 0, function () {
                var componentParameterValue;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.writeNodeAttribute(this._diagnosticProvider.sessionId, componentParameter.id, opcUaRestServices_1.OpcUaAttribute.VALUE, componentParameter.value)];
                        case 1:
                            componentParameterValue = _a.sent();
                            // verify if the parameter has been written siccessfully
                            this.verifyParameterWrite(componentParameter);
                            return [2 /*return*/, componentParameterValue];
                    }
                });
            });
        };
        /**
         * Verifies if the parameter has been successfully written by reading back the value after some delay time
         *
         * @private
         * @param {ModelItems.MappCockpitComponentParameter} componentParameter
         * @memberof MappCockpitComponentProvider
         */
        MappCockpitComponentProvider.prototype.verifyParameterWrite = function (componentParameter) {
            var _this = this;
            // delay reread for 2 times the monitoring sampling rate so that change notification could possibly be received
            setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                var reflectedParameterValue;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.readComponentParameterValue(componentParameter, false)];
                        case 1:
                            reflectedParameterValue = _a.sent();
                            // update/rewrite the parameter if its value differs from the reflected value.
                            if (reflectedParameterValue !== componentParameter.value) {
                                componentParameter.value = reflectedParameterValue;
                            }
                            // reflect the written value via the write response delegate
                            if (componentParameter.reflectedWriteResponseDelegate) {
                                componentParameter.reflectedWriteResponseDelegate(reflectedParameterValue);
                                // clear the response delegate after the response call to make sure that every write uses its own response callback
                                componentParameter.reflectedWriteResponseDelegate = undefined;
                            }
                            return [2 /*return*/];
                    }
                });
            }); }, opcUaRestServices_1.OpcUaRestServices.monitoringSamplingInterval * 2);
        };
        /**
         * Browses the methods of a component
         *
         * @private
         * @param {ModelItems.MappCockpitComponent} mappCockpitComponent
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitComponentProvider.prototype.browseComponentMethods = function (mappCockpitComponent) {
            return __awaiter(this, void 0, void 0, function () {
                var methodSet, componentMethods, i, componentMethod, mappCockpitComponentMethod;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.browseNodeMethodSet(this._diagnosticProvider.sessionId, mappCockpitComponent.id)];
                        case 1:
                            methodSet = _a.sent();
                            componentMethods = new Array();
                            for (i = 0; i < methodSet.length; i++) {
                                try {
                                    componentMethod = methodSet[i];
                                    mappCockpitComponentMethod = new ModelItems.MappCockpitComponentMethod(mappCockpitComponent, componentMethod.displayName, componentMethod);
                                    componentMethods.push(mappCockpitComponentMethod);
                                }
                                catch (error) {
                                    console.log(error);
                                }
                            }
                            mappCockpitComponent.methods = componentMethods;
                            return [2 /*return*/, mappCockpitComponent.methods];
                    }
                });
            });
        };
        /**
         * executes a component method
         *
         * @param {MappCockpitComponentMethod} mappCockpitComponentMethod
         * @returns {*}
         * @memberof MappCockpitComponentProvider
         */
        MappCockpitComponentProvider.prototype.executeComponentMethod = function (mappCockpitComponentMethod) {
            return __awaiter(this, void 0, void 0, function () {
                var methodResult, methodNodeId, methodArgs, i, inputParameter;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!mappCockpitComponentMethod.isExecutable.value) return [3 /*break*/, 2];
                            methodNodeId = mappCockpitComponentMethod.id.split(".")[0] + ".MethodSet";
                            methodArgs = {};
                            for (i = 0; i < mappCockpitComponentMethod.inputParameters.length; i++) {
                                inputParameter = mappCockpitComponentMethod.inputParameters[i];
                                methodArgs[inputParameter.name] = inputParameter.value;
                            }
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.executeMethod(this._diagnosticProvider.sessionId, methodNodeId, mappCockpitComponentMethod.id, methodArgs)];
                        case 1:
                            methodResult = _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            console.error("MappCockpitComponentProvider: method %o called though not executable!");
                            methodResult = undefined;
                            _a.label = 3;
                        case 3: return [2 /*return*/, methodResult];
                    }
                });
            });
        };
        /**
         * Browses the component method parameters
         *
         * @private
         * @param {ModelItems.MappCockpitComponent} mappCockpitComponent
         * @memberof MappCockpitDiagnosticProvider
         */
        MappCockpitComponentProvider.prototype.browseComponentMethodParameters = function (mappCockpitComponentMethods) {
            return __awaiter(this, void 0, void 0, function () {
                var methodInputParameterReadRequest, methodInputParameters;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            methodInputParameterReadRequest = [];
                            mappCockpitComponentMethods.forEach(function (mappCockpitComponentMethod) { methodInputParameterReadRequest.push(_this.readMethodInputParameters(mappCockpitComponentMethod)); });
                            return [4 /*yield*/, Promise.all(methodInputParameterReadRequest)];
                        case 1:
                            methodInputParameters = _a.sent();
                            return [2 /*return*/, methodInputParameters];
                    }
                });
            });
        };
        /**
         * Read input parameters for a component method
         *
         * @private
         * @param {MappCockpitComponentMethod} componentMethod
         * @returns {Promise<ModelItems.MappCockpitMethodParameter[]>}
         * @memberof MappCockpitComponentProvider
         */
        MappCockpitComponentProvider.prototype.readMethodInputParameters = function (componentMethod) {
            return __awaiter(this, void 0, void 0, function () {
                var inputParameters, componentMethodInputParameters, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // clear current input parameters
                            componentMethod.inputParameters = [];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.readMethodParameters(this._diagnosticProvider.sessionId, componentMethod.id)];
                        case 2:
                            inputParameters = _a.sent();
                            componentMethodInputParameters = inputParameters.map(function (inputParameter) { return new ModelItems.MappCockpitMethodParameter(componentMethod, inputParameter.name, inputParameter); });
                            // update the methods parameter list
                            componentMethod.inputParameters = componentMethodInputParameters;
                            return [3 /*break*/, 4];
                        case 3:
                            error_1 = _a.sent();
                            console.error("MappCockpitComponentProvider: Could not read method input parameters for %o ", componentMethod);
                            return [3 /*break*/, 4];
                        case 4: 
                        // return the methods input parameters
                        return [2 /*return*/, componentMethod.inputParameters];
                    }
                });
            });
        };
        /**
         * updates method parameter data types
         *
         * @param {MappCockpitComponentMethod[]} methods
         * @returns {*}
         * @memberof MappCockpitComponentProvider
         */
        MappCockpitComponentProvider.prototype.updateMethodParameterDataTypes = function (methods) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: 
                        // read and update method parameter data types
                        return [4 /*yield*/, this.readMethodParameterDataTypes(methods)];
                        case 1:
                            // read and update method parameter data types
                            _a.sent();
                            // read and update parameter enums
                            this.readMethodParameterEnums(methods);
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * reads and assigns method parameter data types
         *
         * @param {ModelItems.MappCockpitComponentMethod[]} methods
         * @returns {Promise<any>}
         * @memberof MappCockpitComponentProvider
         */
        MappCockpitComponentProvider.prototype.readMethodParameterDataTypes = function (methods) {
            return __awaiter(this, void 0, void 0, function () {
                var methodParameterDataTypesReadRequests;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            methodParameterDataTypesReadRequests = [];
                            // collect read requests for input parameter data types
                            methods.forEach(function (method) {
                                method.inputParameters.forEach(function (inputParameter) {
                                    methodParameterDataTypesReadRequests.push(_this.updateMethodParameterDataType(inputParameter));
                                });
                            });
                            // update the parameters data types
                            return [4 /*yield*/, Promise.all(methodParameterDataTypesReadRequests)];
                        case 1:
                            // update the parameters data types
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Updates the method input parameter s data type
         *
         * @private
         * @param {ModelItems.MappCockpitMethodParameter} inputParameter
         * @memberof MappCockpitComponentProvider
         */
        MappCockpitComponentProvider.prototype.updateMethodParameterDataType = function (inputParameter) {
            return __awaiter(this, void 0, void 0, function () {
                var dataTypeRef;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.readDataTypeInfo(inputParameter.dataTypeId)];
                        case 1:
                            dataTypeRef = _a.sent();
                            inputParameter.dataType = dataTypeRef;
                            return [2 /*return*/];
                    }
                });
            });
        };
        return MappCockpitComponentProvider;
    }());
    exports.MappCockpitComponentProvider = MappCockpitComponentProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcENvY2twaXRDb21wb25lbnRQcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2RpYWdub3N0aWNzL21hcHBDb2NrcGl0Q29tcG9uZW50UHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBTUE7Ozs7T0FJRztJQUNIO1FBVUksc0NBQVksa0JBQWlEO1lBQ3pELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxrQkFBa0IsQ0FBQztRQUNsRCxDQUFDO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDVSx1REFBZ0IsR0FBN0I7Ozs7O2dDQUd5QixxQkFBTSxxQ0FBaUIsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxxQ0FBaUIsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFBOzs0QkFBNUssYUFBYSxHQUFHLENBQUMsU0FBMkosQ0FBQzs0QkFDN0ssNkJBQTZCLEdBQUcscUNBQWlCLENBQUMsc0JBQXNCLENBQUMsYUFBYSxFQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsQ0FBQzs0QkFLM0gscUJBQXFCLEdBQXNDLDZCQUE2QixDQUFDLEdBQUcsQ0FBQyxVQUFDLHVCQUF1QjtnQ0FDckgsT0FBTyxJQUFJLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLEVBQUMsdUJBQXVCLENBQUMsV0FBVyxFQUFFLHVCQUF1QixDQUFDLENBQUE7NEJBQ2pILENBQUMsQ0FBQyxDQUFDOzRCQUVILHNCQUFPLHFCQUFxQixFQUFDOzs7O1NBQ2hDO1FBRUQ7Ozs7OztXQU1HO1FBQ1UsOERBQXVCLEdBQXBDLFVBQXFDLG9CQUFxRDs7Ozs7Z0NBRzdELHFCQUFNLHFDQUFpQixDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FB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Ozs7Z0NBQzNFLHFCQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEVBQUE7OzRCQUFwRSxXQUFXLEdBQUcsU0FBc0Q7NEJBQ3hFLGNBQWMsQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDOzs7OztTQUN6QztRQUNMLG1DQUFDO0lBQUQsQ0FBQyxBQTFYRCxJQTBYQztJQUdRLG9FQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9wY1VhUmVzdFNlcnZpY2VzLCBPcGNVYUF0dHJpYnV0ZSB9IGZyb20gJy4uLy4uL2NvbW11bmljYXRpb24vcmVzdC9vcGNVYVJlc3RTZXJ2aWNlcyc7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyIH0gZnJvbSAnLi9tYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlcic7XHJcbmltcG9ydCAqIGFzIE1vZGVsSXRlbXMgZnJvbSAnLi4vb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50JztcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvLCBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm8gfSBmcm9tICcuLi9vbmxpbmUvbWFwcENvY2twaXRDb21wb25lbnRSZWZsZWN0aW9uJztcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QsIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyIH0gZnJvbSAnLi4vb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50JztcclxuXHJcbi8qKlxyXG4gKiBJbXBsZW1lbnRzIGNvbXBvbmVudCBhY2Nlc3Mgc2VydmljZXNcclxuICpcclxuICogQGNsYXNzIE1hcHBDb2NrcGl0Q29tcG9uZW50UHJvdmlkZXJcclxuICovXHJcbmNsYXNzIE1hcHBDb2NrcGl0Q29tcG9uZW50UHJvdmlkZXIge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVmZXJlbmNlcyB0aGUgZGlhZ25vc3RpYyBwcm92aWRlclxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHtNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlcn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2RpYWdub3N0aWNQcm92aWRlcjogTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZGlhZ25vc3RpY1Byb3ZpZGVyOiBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlcikge1xyXG4gICAgICAgIHRoaXMuX2RpYWdub3N0aWNQcm92aWRlciA9IGRpYWdub3N0aWNQcm92aWRlcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEJyb3dzZXMgdGhlIGF2YWlsYWJsZSBtYXBwIGNvY2twaXQgY29tcG9uZW50c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2Vzc2lvbklkXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbmFtZXNwYWNlSW5kZXhcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWx9IG1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIGJyb3dzZUNvbXBvbmVudHMoKTogUHJvbWlzZTxNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50W10+IHtcclxuXHJcbiAgICAgICAgLy8gUmVhZCBjb21wb25lbnRzXHJcbiAgICAgICAgbGV0IGFsbENvbXBvbmVudHMgPSAoYXdhaXQgT3BjVWFSZXN0U2VydmljZXMuYnJvd3NlTm9kZXModGhpcy5fZGlhZ25vc3RpY1Byb3ZpZGVyLnNlc3Npb25JZCwgdGhpcy5fZGlhZ25vc3RpY1Byb3ZpZGVyLm5hbWVzcGFjZSArIFwiO1wiICsgT3BjVWFSZXN0U2VydmljZXMubWFwcENvY2twaXRSb290Tm9kZUlkKSk7XHJcbiAgICAgICAgdmFyIGZpbHRlcmVkTWFwcENvY2twaXRDb21wb25lbnRzID0gT3BjVWFSZXN0U2VydmljZXMuZmlsdGVyTWFwcENvY2twaXROb2RlcyhhbGxDb21wb25lbnRzLHRoaXMuX2RpYWdub3N0aWNQcm92aWRlci5uYW1lc3BhY2UpO1xyXG4gICAgICAgIFxyXG5cclxuXHJcbiAgICAgICAgLy8gQ29udmVydCB0aGUgcmVmZXJlbmNlcyB0byBtb2RlbCBpdGVtc1xyXG4gICAgICAgIGxldCBtYXBwQ29ja3BpdENvbXBvbmVudHM6IE1vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRbXSA9IGZpbHRlcmVkTWFwcENvY2twaXRDb21wb25lbnRzLm1hcCgobWFwcENvY2twaXRDb21wb25lbnRSZWYpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50KG51bGwsbWFwcENvY2twaXRDb21wb25lbnRSZWYuZGlzcGxheU5hbWUsIG1hcHBDb2NrcGl0Q29tcG9uZW50UmVmKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gbWFwcENvY2twaXRDb21wb25lbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYnJvd3NlcyB0aGUgYXZhaWxhYmxlIG1ldGEgaW5mb3JtYXRpb24gZm9yIGEgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50fSBtYXBwQ29ja3BpdENvbXBvbmVudFxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8TW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdPn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyBicm93c2VDb21wb25lbnRNZXRhSW5mbyhtYXBwQ29ja3BpdENvbXBvbmVudDogTW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudCkge1xyXG5cclxuICAgICAgICAvLyBSZWFkIGNvbXBvbmVudCBwYXJhbWV0ZXJzLlxyXG4gICAgICAgIHZhciBtZXRhSW5mb1JlZmVyZW5jZXMgPSBhd2FpdCBPcGNVYVJlc3RTZXJ2aWNlcy5icm93c2VOb2RlTWV0YUluZm8odGhpcy5fZGlhZ25vc3RpY1Byb3ZpZGVyLnNlc3Npb25JZCwgbWFwcENvY2twaXRDb21wb25lbnQuaWQpO1xyXG4gICAgICAgIHJldHVybiBtZXRhSW5mb1JlZmVyZW5jZXMgO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQnJvd3NlcyB0aGUgcGFyYW1ldGVycyBvZiBhIGNvbXBvbmVudFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50fSBtYXBwQ29ja3BpdENvbXBvbmVudFxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgYnJvd3NlQ29tcG9uZW50UGFyYW1ldGVycyhtYXBwQ29ja3BpdENvbXBvbmVudDogTW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudCk6IFByb21pc2U8TW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdPiB7XHJcblxyXG4gICAgICAgIC8vIFJlYWQgY29tcG9uZW50IHBhcmFtZXRlcnMuXHJcbiAgICAgICAgdmFyIGNvbXBvbmVudFBhcmFtZXRlclNldCA9IGF3YWl0IE9wY1VhUmVzdFNlcnZpY2VzLmJyb3dzZU5vZGVQYXJhbWV0ZXJTZXQodGhpcy5fZGlhZ25vc3RpY1Byb3ZpZGVyLnNlc3Npb25JZCwgbWFwcENvY2twaXRDb21wb25lbnQuaWQpO1xyXG4gICAgICAgIHZhciBjb21wb25lbnRQYXJhbWV0ZXJzOiBNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10gPSBjb21wb25lbnRQYXJhbWV0ZXJTZXQubWFwKChwYXJhbWV0ZXIpID0+IHtcclxuICAgICAgICAgICAgbGV0IGNvbXBvbmVudFBhcmFtZXRlcnMgPSBuZXcgTW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcihtYXBwQ29ja3BpdENvbXBvbmVudCxwYXJhbWV0ZXIuZGlzcGxheU5hbWUsIHBhcmFtZXRlcik7XHJcbiAgICAgICAgICAgIHJldHVybiBjb21wb25lbnRQYXJhbWV0ZXJzO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBtYXBwQ29ja3BpdENvbXBvbmVudC5wYXJhbWV0ZXJzID0gY29tcG9uZW50UGFyYW1ldGVycztcclxuXHJcbiAgICAgICAgcmV0dXJuICBtYXBwQ29ja3BpdENvbXBvbmVudC5wYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdXBkYXRlcyBwYXJhbWV0ZXIgZGF0YSB0eXBlc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7YW55W119IHBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBhc3luYyB1cGRhdGVQYXJhbWV0ZXJEYXRhVHlwZXMocGFyYW1ldGVyczogTW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdKTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICAvLyByZWFkIGFuZCB1cGRhdGUgcGFyYW1ldGVyIGRhdGEgdHlwZXNcclxuICAgICAgICBhd2FpdCB0aGlzLnJlYWRQYXJhbWV0ZXJEYXRhVHlwZXMocGFyYW1ldGVycyk7XHJcbiAgICAgICAgLy8gcmVhZCBhbmQgdXBkYXRlIHBhcmFtZXRlciBlbnVtc1xyXG4gICAgICAgIHRoaXMucmVhZFBhcmFtZXRlckVudW1zKHBhcmFtZXRlcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmVhZHMgcGFyYW1ldGVyIGRhdGEgdHlwZXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gbWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJzXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBhc3luYyByZWFkUGFyYW1ldGVyRGF0YVR5cGVzKG1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyczogTW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdKSB7XHJcbiAgICAgICAgbGV0IHJlYWRQYXJhbWV0ZXJEYXRhVHlwZVJlcXVlc3RzOlByb21pc2U8YW55PltdID0gW107XHJcbiAgICAgICAgbWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJzLmZvckVhY2goKGNvbXBvbmVudFBhcmFtZXRlcik9PnsgcmVhZFBhcmFtZXRlckRhdGFUeXBlUmVxdWVzdHMucHVzaCggdGhpcy51cGRhdGVQYXJhbWV0ZXJEYXRhVHlwZShjb21wb25lbnRQYXJhbWV0ZXIpKTt9KTtcclxuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChyZWFkUGFyYW1ldGVyRGF0YVR5cGVSZXF1ZXN0cyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyfSBjb21wb25lbnRQYXJhbWV0ZXJcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBhc3luYyB1cGRhdGVQYXJhbWV0ZXJEYXRhVHlwZShjb21wb25lbnRQYXJhbWV0ZXI6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyKTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICBsZXQgZGF0YVR5cGVSZWYgPSBhd2FpdCB0aGlzLnJlYWRDb21wb25lbnRQYXJhbWV0ZXJEYXRhVHlwZShjb21wb25lbnRQYXJhbWV0ZXIpO1xyXG4gICAgICAgIGNvbXBvbmVudFBhcmFtZXRlci5kYXRhVHlwZSA9IGRhdGFUeXBlUmVmO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmVhZHMgYW5kIHVwZGF0ZXMgdGhlIHBhcmFtZXRlciBlbnVtcyBmb3IgZW51bSBkYXRhIHR5cGVzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IG1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHJlYWRQYXJhbWV0ZXJFbnVtcyhtYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcnM6IE1vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSl7XHJcbiAgICAgICAgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvLnJlYWRQYXJhbWV0ZXJFbnVtcyhtYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmVhZHMgYW5kIHVwZGF0ZXMgbWV0aG9kIHBhcmFtZXRlciBlbnVtcyBcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RbXX0gbWV0aG9kc1xyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQcm92aWRlclxyXG4gICAgICovXHJcbiAgICByZWFkTWV0aG9kUGFyYW1ldGVyRW51bXMobWV0aG9kczogTW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFtdKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IG1ldGFEYXRhID0gKDxhbnk+bWV0aG9kc1swXS5jb21wb25lbnQpLm1ldGFEYXRhO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWV0aG9kcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBtZXRob2QgPSBtZXRob2RzW2ldO1xyXG4gICAgICAgICAgICBpZiAobWV0aG9kLmlucHV0UGFyYW1ldGVycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm8ucmVhZE1ldGhvZFBhcmFtZXRlckVudW1zKG1ldGhvZCwgbWV0YURhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmVhZHMgdGhlIGRhdGEgdHlwZSBvZiBhIHBhcmFtZXRlclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcn0gY29tcG9uZW50UGFyYW1ldGVyXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgYXN5bmMgcmVhZENvbXBvbmVudFBhcmFtZXRlckRhdGFUeXBlKGNvbXBvbmVudFBhcmFtZXRlcjogTW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcik6IFByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgIC8vIHJlYWQgdGhlIHBhcmFtZXRlcnMgZGF0YSB0eXBlIFxyXG4gICAgICAgIHZhciBwYXJhbWV0ZXJEYXRhVHlwZUlkID0gYXdhaXQgT3BjVWFSZXN0U2VydmljZXMucmVhZE5vZGVBdHRyaWJ1dGUodGhpcy5fZGlhZ25vc3RpY1Byb3ZpZGVyLnNlc3Npb25JZCwgY29tcG9uZW50UGFyYW1ldGVyLmlkLCBPcGNVYUF0dHJpYnV0ZS5EQVRBX1RZUEUpO1xyXG4gICAgICAgIHZhciBwYXJhbWV0ZXJEYXRhVHlwZU5vZGVJZCA9IHBhcmFtZXRlckRhdGFUeXBlSWQ7XHJcblxyXG4gICAgICAgIC8vIHZhciBwYXJhbWV0ZXJEYXRhVHlwZUJyb3dzZU5hbWUgPSBhd2FpdCBPcGNVYVJlc3RTZXJ2aWNlcy5yZWFkTm9kZUF0dHJpYnV0ZSh0aGlzLl9kaWFnbm9zdGljUHJvdmlkZXIuc2Vzc2lvbklkLCBwYXJhbWV0ZXJEYXRhVHlwZU5vZGVJZCxPcGNVYUF0dHJpYnV0ZS5CUk9XU0VfTkFNRSk7XHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucmVhZERhdGFUeXBlSW5mbyhwYXJhbWV0ZXJEYXRhVHlwZU5vZGVJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZWFkcyBkYXRhIHR5cGUgaW5mbyBmb3IgdGhlIHNwZWNpZmllZCBkYXRhIHR5cGUgaWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBwYXJhbWV0ZXJEYXRhVHlwZU5vZGVJZFxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgcmVhZERhdGFUeXBlSW5mbyhwYXJhbWV0ZXJEYXRhVHlwZU5vZGVJZDogYW55KSB7XHJcbiAgICAgICAgdmFyIHBhcmFtZXRlckRhdGFUeXBlRGlzcGxheU5hbWUgPSBhd2FpdCBPcGNVYVJlc3RTZXJ2aWNlcy5yZWFkTm9kZUF0dHJpYnV0ZSh0aGlzLl9kaWFnbm9zdGljUHJvdmlkZXIuc2Vzc2lvbklkLCBwYXJhbWV0ZXJEYXRhVHlwZU5vZGVJZCwgT3BjVWFBdHRyaWJ1dGUuRElTUExBWV9OQU1FKTtcclxuICAgICAgICAvLyB2YXIgcGFyYW1ldGVyRGF0YVR5cGVEZXNjciA9IGF3YWl0IE9wY1VhUmVzdFNlcnZpY2VzLnJlYWROb2RlQXR0cmlidXRlKHRoaXMuX2RpYWdub3N0aWNQcm92aWRlci5zZXNzaW9uSWQsIHBhcmFtZXRlckRhdGFUeXBlTm9kZUlkLE9wY1VhQXR0cmlidXRlLkRFU0NSSVBUSU9OKTtcclxuICAgICAgICByZXR1cm4gbmV3IE1vZGVsSXRlbXMuTWFwcENvY2twaXRQYXJhbWV0ZXJEYXRhVHlwZShwYXJhbWV0ZXJEYXRhVHlwZU5vZGVJZCwgcGFyYW1ldGVyRGF0YVR5cGVEaXNwbGF5TmFtZSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmVhZHMgYSBwYXJhbWV0ZXJzIHZhbHVlIGFuZCB1cGRhdGVzIHRoZSBwYXJhbWV0ZXJzIHZhbHVlIGlmIHNwZWNpZmllZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcn0gY29tcG9uZW50UGFyYW1ldGVyXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFt1cGRhdGU9dHJ1ZV0gdXBkYXRlcyB0aGUgcGFyYW1ldGVycyB2YWx1ZSBpZiB0cnVlXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIHJlYWRDb21wb25lbnRQYXJhbWV0ZXJWYWx1ZShjb21wb25lbnRQYXJhbWV0ZXI6IE1vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIsIHVwZGF0ZSA9IHRydWUpIHtcclxuICAgICAgICB2YXIgY29tcG9uZW50UGFyYW1ldGVyVmFsdWUgPSBhd2FpdCBPcGNVYVJlc3RTZXJ2aWNlcy5yZWFkTm9kZUF0dHJpYnV0ZSh0aGlzLl9kaWFnbm9zdGljUHJvdmlkZXIuc2Vzc2lvbklkLCBjb21wb25lbnRQYXJhbWV0ZXIuaWQpO1xyXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgcGFyYW1ldGVycyB2YWx1ZVxyXG4gICAgICAgIGlmICh1cGRhdGUpIHtcclxuICAgICAgICAgICAgY29tcG9uZW50UGFyYW1ldGVyLnZhbHVlID0gY29tcG9uZW50UGFyYW1ldGVyVmFsdWU7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb21wb25lbnRQYXJhbWV0ZXJWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHdyaXRlcyBhIHBhcmFtZXRlciB2YWx1ZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcn0gY29tcG9uZW50UGFyYW1ldGVyXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIHdyaXRlQ29tcG9uZW50UGFyYW1ldGVyVmFsdWUoY29tcG9uZW50UGFyYW1ldGVyOiBNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gd3JpdGUgdGhlIGNvbXBvbmVudCBwYXJhbWV0ZXIgdG8gdGhlIHRhcmdldFxyXG4gICAgICAgIHZhciBjb21wb25lbnRQYXJhbWV0ZXJWYWx1ZSA9IGF3YWl0IE9wY1VhUmVzdFNlcnZpY2VzLndyaXRlTm9kZUF0dHJpYnV0ZSh0aGlzLl9kaWFnbm9zdGljUHJvdmlkZXIuc2Vzc2lvbklkLCBjb21wb25lbnRQYXJhbWV0ZXIuaWQsIE9wY1VhQXR0cmlidXRlLlZBTFVFLCBjb21wb25lbnRQYXJhbWV0ZXIudmFsdWUpO1xyXG4gICAgICAgIC8vIHZlcmlmeSBpZiB0aGUgcGFyYW1ldGVyIGhhcyBiZWVuIHdyaXR0ZW4gc2ljY2Vzc2Z1bGx5XHJcbiAgICAgICAgdGhpcy52ZXJpZnlQYXJhbWV0ZXJXcml0ZShjb21wb25lbnRQYXJhbWV0ZXIpO1xyXG5cclxuICAgICAgICByZXR1cm4gY29tcG9uZW50UGFyYW1ldGVyVmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWZXJpZmllcyBpZiB0aGUgcGFyYW1ldGVyIGhhcyBiZWVuIHN1Y2Nlc3NmdWxseSB3cml0dGVuIGJ5IHJlYWRpbmcgYmFjayB0aGUgdmFsdWUgYWZ0ZXIgc29tZSBkZWxheSB0aW1lXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcn0gY29tcG9uZW50UGFyYW1ldGVyXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHZlcmlmeVBhcmFtZXRlcldyaXRlKGNvbXBvbmVudFBhcmFtZXRlcjogTW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcikge1xyXG5cclxuICAgICAgICAvLyBkZWxheSByZXJlYWQgZm9yIDIgdGltZXMgdGhlIG1vbml0b3Jpbmcgc2FtcGxpbmcgcmF0ZSBzbyB0aGF0IGNoYW5nZSBub3RpZmljYXRpb24gY291bGQgcG9zc2libHkgYmUgcmVjZWl2ZWRcclxuICAgICAgICBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgLy8gcmVhZCB0aGUgcGFyYW1ldGVyIHZhbHVlIGZyb20gdGhlIHRhcmdldFxyXG4gICAgICAgICAgICBsZXQgcmVmbGVjdGVkUGFyYW1ldGVyVmFsdWUgPSBhd2FpdCB0aGlzLnJlYWRDb21wb25lbnRQYXJhbWV0ZXJWYWx1ZShjb21wb25lbnRQYXJhbWV0ZXIsZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgLy8gdXBkYXRlL3Jld3JpdGUgdGhlIHBhcmFtZXRlciBpZiBpdHMgdmFsdWUgZGlmZmVycyBmcm9tIHRoZSByZWZsZWN0ZWQgdmFsdWUuXHJcbiAgICAgICAgICAgIGlmIChyZWZsZWN0ZWRQYXJhbWV0ZXJWYWx1ZSAhPT0gY29tcG9uZW50UGFyYW1ldGVyLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBjb21wb25lbnRQYXJhbWV0ZXIudmFsdWUgPSByZWZsZWN0ZWRQYXJhbWV0ZXJWYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gcmVmbGVjdCB0aGUgd3JpdHRlbiB2YWx1ZSB2aWEgdGhlIHdyaXRlIHJlc3BvbnNlIGRlbGVnYXRlXHJcbiAgICAgICAgICAgIGlmIChjb21wb25lbnRQYXJhbWV0ZXIucmVmbGVjdGVkV3JpdGVSZXNwb25zZURlbGVnYXRlKSB7XHJcbiAgICAgICAgICAgICAgICBjb21wb25lbnRQYXJhbWV0ZXIucmVmbGVjdGVkV3JpdGVSZXNwb25zZURlbGVnYXRlKHJlZmxlY3RlZFBhcmFtZXRlclZhbHVlKTtcclxuICAgICAgICAgICAgICAgIC8vIGNsZWFyIHRoZSByZXNwb25zZSBkZWxlZ2F0ZSBhZnRlciB0aGUgcmVzcG9uc2UgY2FsbCB0byBtYWtlIHN1cmUgdGhhdCBldmVyeSB3cml0ZSB1c2VzIGl0cyBvd24gcmVzcG9uc2UgY2FsbGJhY2tcclxuICAgICAgICAgICAgICAgIGNvbXBvbmVudFBhcmFtZXRlci5yZWZsZWN0ZWRXcml0ZVJlc3BvbnNlRGVsZWdhdGUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSwgT3BjVWFSZXN0U2VydmljZXMubW9uaXRvcmluZ1NhbXBsaW5nSW50ZXJ2YWwqMik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCcm93c2VzIHRoZSBtZXRob2RzIG9mIGEgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudH0gbWFwcENvY2twaXRDb21wb25lbnRcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgYnJvd3NlQ29tcG9uZW50TWV0aG9kcyhtYXBwQ29ja3BpdENvbXBvbmVudDogTW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudCkge1xyXG4gICAgICAgIHZhciBtZXRob2RTZXQgPSBhd2FpdCBPcGNVYVJlc3RTZXJ2aWNlcy5icm93c2VOb2RlTWV0aG9kU2V0KHRoaXMuX2RpYWdub3N0aWNQcm92aWRlci5zZXNzaW9uSWQsIG1hcHBDb2NrcGl0Q29tcG9uZW50LmlkKTtcclxuICAgICAgICBsZXQgY29tcG9uZW50TWV0aG9kcyA9IG5ldyBBcnJheTxNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kPigpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWV0aG9kU2V0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29tcG9uZW50TWV0aG9kID0gbWV0aG9kU2V0W2ldO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kID0gbmV3IE1vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QobWFwcENvY2twaXRDb21wb25lbnQsY29tcG9uZW50TWV0aG9kLmRpc3BsYXlOYW1lLCBjb21wb25lbnRNZXRob2QpO1xyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50TWV0aG9kcy5wdXNoKG1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBtYXBwQ29ja3BpdENvbXBvbmVudC5tZXRob2RzID0gY29tcG9uZW50TWV0aG9kcztcclxuICAgICAgICByZXR1cm4gbWFwcENvY2twaXRDb21wb25lbnQubWV0aG9kcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGV4ZWN1dGVzIGEgY29tcG9uZW50IG1ldGhvZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRNZXRob2R9IG1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIGV4ZWN1dGVDb21wb25lbnRNZXRob2QobWFwcENvY2twaXRDb21wb25lbnRNZXRob2Q6IE1vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIGxldCBtZXRob2RSZXN1bHQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKG1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLmlzRXhlY3V0YWJsZS52YWx1ZSkge1xyXG4gICAgICAgICAgICBsZXQgbWV0aG9kTm9kZUlkID0gbWFwcENvY2twaXRDb21wb25lbnRNZXRob2QuaWQuc3BsaXQoXCIuXCIpWzBdICsgXCIuTWV0aG9kU2V0XCI7XHJcblxyXG4gICAgICAgICAgICBsZXQgbWV0aG9kQXJncyA9IHt9O1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLmlucHV0UGFyYW1ldGVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW5wdXRQYXJhbWV0ZXIgPSBtYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZC5pbnB1dFBhcmFtZXRlcnNbaV07XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIG1ldGhvZEFyZ3NbaW5wdXRQYXJhbWV0ZXIubmFtZV0gPSBpbnB1dFBhcmFtZXRlci52YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgIG1ldGhvZFJlc3VsdCA9IGF3YWl0IE9wY1VhUmVzdFNlcnZpY2VzLmV4ZWN1dGVNZXRob2QodGhpcy5fZGlhZ25vc3RpY1Byb3ZpZGVyLnNlc3Npb25JZCwgbWV0aG9kTm9kZUlkLG1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLmlkLG1ldGhvZEFyZ3MpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiTWFwcENvY2twaXRDb21wb25lbnRQcm92aWRlcjogbWV0aG9kICVvIGNhbGxlZCB0aG91Z2ggbm90IGV4ZWN1dGFibGUhXCIpO1xyXG4gICAgICAgICAgICBtZXRob2RSZXN1bHQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbWV0aG9kUmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQnJvd3NlcyB0aGUgY29tcG9uZW50IG1ldGhvZCBwYXJhbWV0ZXJzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudH0gbWFwcENvY2twaXRDb21wb25lbnRcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgYnJvd3NlQ29tcG9uZW50TWV0aG9kUGFyYW1ldGVycyhtYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZHM6IEFycmF5PE1vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRNZXRob2Q+KTogUHJvbWlzZTxNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVyW10+IHtcclxuXHJcbiAgICAgICAgbGV0IG1ldGhvZElucHV0UGFyYW1ldGVyUmVhZFJlcXVlc3Q6IFByb21pc2U8YW55PltdID0gW107XHJcbiAgICAgICAgbWFwcENvY2twaXRDb21wb25lbnRNZXRob2RzLmZvckVhY2goKG1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kKT0+eyBtZXRob2RJbnB1dFBhcmFtZXRlclJlYWRSZXF1ZXN0LnB1c2godGhpcy5yZWFkTWV0aG9kSW5wdXRQYXJhbWV0ZXJzKG1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kKSk7fSk7XHJcbiAgICAgICAgbGV0IG1ldGhvZElucHV0UGFyYW1ldGVycyA9IGF3YWl0IFByb21pc2UuYWxsKG1ldGhvZElucHV0UGFyYW1ldGVyUmVhZFJlcXVlc3QpO1xyXG4gICAgICAgIHJldHVybiBtZXRob2RJbnB1dFBhcmFtZXRlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkIGlucHV0IHBhcmFtZXRlcnMgZm9yIGEgY29tcG9uZW50IG1ldGhvZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kfSBjb21wb25lbnRNZXRob2RcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPE1vZGVsSXRlbXMuTWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXJbXT59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIHJlYWRNZXRob2RJbnB1dFBhcmFtZXRlcnMoY29tcG9uZW50TWV0aG9kOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCk6IFByb21pc2U8TW9kZWxJdGVtcy5NYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcltdPiB7XHJcblxyXG4gICAgICAgIC8vIGNsZWFyIGN1cnJlbnQgaW5wdXQgcGFyYW1ldGVyc1xyXG4gICAgICAgIGNvbXBvbmVudE1ldGhvZC5pbnB1dFBhcmFtZXRlcnMgPSBbXTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvLyByZWFkIHRoZSBtZXRob2RzIGlucHV0IHBhcmFtZXRlcnNcclxuICAgICAgICAgICAgdmFyIGlucHV0UGFyYW1ldGVyczogQXJyYXk8YW55PiA9IGF3YWl0IE9wY1VhUmVzdFNlcnZpY2VzLnJlYWRNZXRob2RQYXJhbWV0ZXJzKHRoaXMuX2RpYWdub3N0aWNQcm92aWRlci5zZXNzaW9uSWQsIGNvbXBvbmVudE1ldGhvZC5pZCk7XHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZSB0aGUgbWV0aG9kIGlucHV0IHBhcmFtZXRlciBsc2l0XHJcbiAgICAgICAgICAgIGxldCBjb21wb25lbnRNZXRob2RJbnB1dFBhcmFtZXRlcnMgPSBpbnB1dFBhcmFtZXRlcnMubWFwKChpbnB1dFBhcmFtZXRlcikgPT4geyByZXR1cm4gbmV3IE1vZGVsSXRlbXMuTWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXIoY29tcG9uZW50TWV0aG9kLCBpbnB1dFBhcmFtZXRlci5uYW1lLCBpbnB1dFBhcmFtZXRlcikgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyB1cGRhdGUgdGhlIG1ldGhvZHMgcGFyYW1ldGVyIGxpc3RcclxuICAgICAgICAgICAgY29tcG9uZW50TWV0aG9kLmlucHV0UGFyYW1ldGVycyA9IGNvbXBvbmVudE1ldGhvZElucHV0UGFyYW1ldGVycztcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiTWFwcENvY2twaXRDb21wb25lbnRQcm92aWRlcjogQ291bGQgbm90IHJlYWQgbWV0aG9kIGlucHV0IHBhcmFtZXRlcnMgZm9yICVvIFwiLGNvbXBvbmVudE1ldGhvZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHJldHVybiB0aGUgbWV0aG9kcyBpbnB1dCBwYXJhbWV0ZXJzXHJcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudE1ldGhvZC5pbnB1dFBhcmFtZXRlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB1cGRhdGVzIG1ldGhvZCBwYXJhbWV0ZXIgZGF0YSB0eXBlc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRNZXRob2RbXX0gbWV0aG9kc1xyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBhc3luYyB1cGRhdGVNZXRob2RQYXJhbWV0ZXJEYXRhVHlwZXMobWV0aG9kczogTW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFtdKTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICAvLyByZWFkIGFuZCB1cGRhdGUgbWV0aG9kIHBhcmFtZXRlciBkYXRhIHR5cGVzXHJcbiAgICAgICAgYXdhaXQgdGhpcy5yZWFkTWV0aG9kUGFyYW1ldGVyRGF0YVR5cGVzKG1ldGhvZHMpO1xyXG5cclxuICAgICAgICAvLyByZWFkIGFuZCB1cGRhdGUgcGFyYW1ldGVyIGVudW1zXHJcbiAgICAgICAgdGhpcy5yZWFkTWV0aG9kUGFyYW1ldGVyRW51bXMobWV0aG9kcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZWFkcyBhbmQgYXNzaWducyBtZXRob2QgcGFyYW1ldGVyIGRhdGEgdHlwZXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RbXX0gbWV0aG9kc1xyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIHJlYWRNZXRob2RQYXJhbWV0ZXJEYXRhVHlwZXMobWV0aG9kczogTW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFtdKTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICBcclxuICAgICAgICAgbGV0IG1ldGhvZFBhcmFtZXRlckRhdGFUeXBlc1JlYWRSZXF1ZXN0czogUHJvbWlzZTxhbnk+W10gPSBbXTtcclxuICAgICAgICAvLyBjb2xsZWN0IHJlYWQgcmVxdWVzdHMgZm9yIGlucHV0IHBhcmFtZXRlciBkYXRhIHR5cGVzXHJcblxyXG4gICAgICAgIG1ldGhvZHMuZm9yRWFjaCgobWV0aG9kKT0+eyBcclxuICAgICAgICAgICAgbWV0aG9kLmlucHV0UGFyYW1ldGVycy5mb3JFYWNoKChpbnB1dFBhcmFtZXRlcik9PnsgXHJcbiAgICAgICAgICAgICAgICBtZXRob2RQYXJhbWV0ZXJEYXRhVHlwZXNSZWFkUmVxdWVzdHMucHVzaCh0aGlzLnVwZGF0ZU1ldGhvZFBhcmFtZXRlckRhdGFUeXBlKGlucHV0UGFyYW1ldGVyKSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgIC8vIHVwZGF0ZSB0aGUgcGFyYW1ldGVycyBkYXRhIHR5cGVzXHJcbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwobWV0aG9kUGFyYW1ldGVyRGF0YVR5cGVzUmVhZFJlcXVlc3RzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIG1ldGhvZCBpbnB1dCBwYXJhbWV0ZXIgcyBkYXRhIHR5cGVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVyfSBpbnB1dFBhcmFtZXRlclxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyB1cGRhdGVNZXRob2RQYXJhbWV0ZXJEYXRhVHlwZShpbnB1dFBhcmFtZXRlcjogTW9kZWxJdGVtcy5NYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcikge1xyXG4gICAgICAgIGxldCBkYXRhVHlwZVJlZiA9IGF3YWl0IHRoaXMucmVhZERhdGFUeXBlSW5mbyhpbnB1dFBhcmFtZXRlci5kYXRhVHlwZUlkKTtcclxuICAgICAgICBpbnB1dFBhcmFtZXRlci5kYXRhVHlwZSA9IGRhdGFUeXBlUmVmO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnRQcm92aWRlciB9O1xyXG5cclxuXHJcbiJdfQ==