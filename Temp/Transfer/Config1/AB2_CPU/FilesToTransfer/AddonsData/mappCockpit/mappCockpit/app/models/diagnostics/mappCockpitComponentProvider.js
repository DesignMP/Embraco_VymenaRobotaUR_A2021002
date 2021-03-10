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
                var inputParameters, i, inputParameter;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // clear existing parameters
                            componentMethod.inputParameters.splice(0, componentMethod.inputParameters.length);
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.readMethodParameters(this._diagnosticProvider.sessionId, componentMethod.id)];
                        case 1:
                            inputParameters = _a.sent();
                            for (i = 0; i < inputParameters.length; i++) {
                                inputParameter = inputParameters[i];
                                // update the component methods input parameters
                                componentMethod.inputParameters.push(new ModelItems.MappCockpitMethodParameter(componentMethod, inputParameter.name, inputParameter));
                            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcENvY2twaXRDb21wb25lbnRQcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2RpYWdub3N0aWNzL21hcHBDb2NrcGl0Q29tcG9uZW50UHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBTUE7Ozs7T0FJRztJQUNIO1FBVUksc0NBQVksa0JBQWlEO1lBQ3pELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxrQkFBa0IsQ0FBQztRQUNsRCxDQUFDO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDVSx1REFBZ0IsR0FBN0I7Ozs7O2dDQUd5QixxQkFBTSxxQ0FBaUIsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxxQ0FBaUIsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFBOzs0QkFBNUssYUFBYSxHQUFHLENBQUMsU0FBMkosQ0FBQzs0QkFDN0ssNkJBQTZCLEdBQUcscUNBQWlCLENBQUMsc0JBQXNCLENBQUMsYUFBYSxFQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsQ0FBQzs0QkFLM0gscUJBQXFCLEdBQXNDLDZCQUE2QixDQUFDLEdBQUcsQ0FBQyxVQUFDLHVCQUF1QjtnQ0FDckgsT0FBTyxJQUFJLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLEVBQUMsdUJBQXVCLENBQUMsV0FBVyxFQUFFLHVCQUF1QixDQUFDLENBQUE7NEJBQ2pILENBQUMsQ0FBQyxDQUFDOzRCQUVILHNCQUFPLHFCQUFxQixFQUFDOzs7O1NBQ2hDO1FBRUQ7Ozs7OztXQU1HO1FBQ1UsOERBQXVCLEdBQXBDLFVBQXFDLG9CQUFxRDs7Ozs7Z0NBRzdELHFCQUFNLHFDQUFpQixDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FB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R0FBM0MsVUFBNEMsY0FBcUQ7Ozs7O2dDQUMzRSxxQkFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxFQUFBOzs0QkFBcEUsV0FBVyxHQUFHLFNBQXNEOzRCQUN4RSxjQUFjLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQzs7Ozs7U0FDekM7UUFDTCxtQ0FBQztJQUFELENBQUMsQUFuWEQsSUFtWEM7SUFHUSxvRUFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPcGNVYVJlc3RTZXJ2aWNlcywgT3BjVWFBdHRyaWJ1dGUgfSBmcm9tICcuLi8uLi9jb21tdW5pY2F0aW9uL3Jlc3Qvb3BjVWFSZXN0U2VydmljZXMnO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlciB9IGZyb20gJy4vbWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXInO1xyXG5pbXBvcnQgKiBhcyBNb2RlbEl0ZW1zIGZyb20gJy4uL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudCc7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mbywgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvIH0gZnJvbSAnLi4vb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50UmVmbGVjdGlvbic7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLCBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlciB9IGZyb20gJy4uL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudCc7XHJcblxyXG4vKipcclxuICogSW1wbGVtZW50cyBjb21wb25lbnQgYWNjZXNzIHNlcnZpY2VzXHJcbiAqXHJcbiAqIEBjbGFzcyBNYXBwQ29ja3BpdENvbXBvbmVudFByb3ZpZGVyXHJcbiAqL1xyXG5jbGFzcyBNYXBwQ29ja3BpdENvbXBvbmVudFByb3ZpZGVyIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlZmVyZW5jZXMgdGhlIGRpYWdub3N0aWMgcHJvdmlkZXJcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7TWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9kaWFnbm9zdGljUHJvdmlkZXI6IE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGRpYWdub3N0aWNQcm92aWRlcjogTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXIpIHtcclxuICAgICAgICB0aGlzLl9kaWFnbm9zdGljUHJvdmlkZXIgPSBkaWFnbm9zdGljUHJvdmlkZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCcm93c2VzIHRoZSBhdmFpbGFibGUgbWFwcCBjb2NrcGl0IGNvbXBvbmVudHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNlc3Npb25JZFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG5hbWVzcGFjZUluZGV4XHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsfSBtYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbFxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyBicm93c2VDb21wb25lbnRzKCk6IFByb21pc2U8TW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudFtdPiB7XHJcblxyXG4gICAgICAgIC8vIFJlYWQgY29tcG9uZW50c1xyXG4gICAgICAgIGxldCBhbGxDb21wb25lbnRzID0gKGF3YWl0IE9wY1VhUmVzdFNlcnZpY2VzLmJyb3dzZU5vZGVzKHRoaXMuX2RpYWdub3N0aWNQcm92aWRlci5zZXNzaW9uSWQsIHRoaXMuX2RpYWdub3N0aWNQcm92aWRlci5uYW1lc3BhY2UgKyBcIjtcIiArIE9wY1VhUmVzdFNlcnZpY2VzLm1hcHBDb2NrcGl0Um9vdE5vZGVJZCkpO1xyXG4gICAgICAgIHZhciBmaWx0ZXJlZE1hcHBDb2NrcGl0Q29tcG9uZW50cyA9IE9wY1VhUmVzdFNlcnZpY2VzLmZpbHRlck1hcHBDb2NrcGl0Tm9kZXMoYWxsQ29tcG9uZW50cyx0aGlzLl9kaWFnbm9zdGljUHJvdmlkZXIubmFtZXNwYWNlKTtcclxuICAgICAgICBcclxuXHJcblxyXG4gICAgICAgIC8vIENvbnZlcnQgdGhlIHJlZmVyZW5jZXMgdG8gbW9kZWwgaXRlbXNcclxuICAgICAgICBsZXQgbWFwcENvY2twaXRDb21wb25lbnRzOiBNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50W10gPSBmaWx0ZXJlZE1hcHBDb2NrcGl0Q29tcG9uZW50cy5tYXAoKG1hcHBDb2NrcGl0Q29tcG9uZW50UmVmKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgTW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudChudWxsLG1hcHBDb2NrcGl0Q29tcG9uZW50UmVmLmRpc3BsYXlOYW1lLCBtYXBwQ29ja3BpdENvbXBvbmVudFJlZilcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG1hcHBDb2NrcGl0Q29tcG9uZW50cztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGJyb3dzZXMgdGhlIGF2YWlsYWJsZSBtZXRhIGluZm9ybWF0aW9uIGZvciBhIGNvbXBvbmVudFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudH0gbWFwcENvY2twaXRDb21wb25lbnRcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPE1vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXT59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgYnJvd3NlQ29tcG9uZW50TWV0YUluZm8obWFwcENvY2twaXRDb21wb25lbnQ6IE1vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnQpIHtcclxuXHJcbiAgICAgICAgLy8gUmVhZCBjb21wb25lbnQgcGFyYW1ldGVycy5cclxuICAgICAgICB2YXIgbWV0YUluZm9SZWZlcmVuY2VzID0gYXdhaXQgT3BjVWFSZXN0U2VydmljZXMuYnJvd3NlTm9kZU1ldGFJbmZvKHRoaXMuX2RpYWdub3N0aWNQcm92aWRlci5zZXNzaW9uSWQsIG1hcHBDb2NrcGl0Q29tcG9uZW50LmlkKTtcclxuICAgICAgICByZXR1cm4gbWV0YUluZm9SZWZlcmVuY2VzIDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEJyb3dzZXMgdGhlIHBhcmFtZXRlcnMgb2YgYSBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudH0gbWFwcENvY2twaXRDb21wb25lbnRcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIGJyb3dzZUNvbXBvbmVudFBhcmFtZXRlcnMobWFwcENvY2twaXRDb21wb25lbnQ6IE1vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnQpOiBQcm9taXNlPE1vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXT4ge1xyXG5cclxuICAgICAgICAvLyBSZWFkIGNvbXBvbmVudCBwYXJhbWV0ZXJzLlxyXG4gICAgICAgIHZhciBjb21wb25lbnRQYXJhbWV0ZXJTZXQgPSBhd2FpdCBPcGNVYVJlc3RTZXJ2aWNlcy5icm93c2VOb2RlUGFyYW1ldGVyU2V0KHRoaXMuX2RpYWdub3N0aWNQcm92aWRlci5zZXNzaW9uSWQsIG1hcHBDb2NrcGl0Q29tcG9uZW50LmlkKTtcclxuICAgICAgICB2YXIgY29tcG9uZW50UGFyYW1ldGVyczogTW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdID0gY29tcG9uZW50UGFyYW1ldGVyU2V0Lm1hcCgocGFyYW1ldGVyKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjb21wb25lbnRQYXJhbWV0ZXJzID0gbmV3IE1vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIobWFwcENvY2twaXRDb21wb25lbnQscGFyYW1ldGVyLmRpc3BsYXlOYW1lLCBwYXJhbWV0ZXIpO1xyXG4gICAgICAgICAgICByZXR1cm4gY29tcG9uZW50UGFyYW1ldGVycztcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbWFwcENvY2twaXRDb21wb25lbnQucGFyYW1ldGVycyA9IGNvbXBvbmVudFBhcmFtZXRlcnM7XHJcblxyXG4gICAgICAgIHJldHVybiAgbWFwcENvY2twaXRDb21wb25lbnQucGFyYW1ldGVycztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHVwZGF0ZXMgcGFyYW1ldGVyIGRhdGEgdHlwZXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge2FueVtdfSBwYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgYXN5bmMgdXBkYXRlUGFyYW1ldGVyRGF0YVR5cGVzKHBhcmFtZXRlcnM6IE1vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgLy8gcmVhZCBhbmQgdXBkYXRlIHBhcmFtZXRlciBkYXRhIHR5cGVzXHJcbiAgICAgICAgYXdhaXQgdGhpcy5yZWFkUGFyYW1ldGVyRGF0YVR5cGVzKHBhcmFtZXRlcnMpO1xyXG4gICAgICAgIC8vIHJlYWQgYW5kIHVwZGF0ZSBwYXJhbWV0ZXIgZW51bXNcclxuICAgICAgICB0aGlzLnJlYWRQYXJhbWV0ZXJFbnVtcyhwYXJhbWV0ZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlYWRzIHBhcmFtZXRlciBkYXRhIHR5cGVzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IG1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyc1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgYXN5bmMgcmVhZFBhcmFtZXRlckRhdGFUeXBlcyhtYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcnM6IE1vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSkge1xyXG4gICAgICAgIGxldCByZWFkUGFyYW1ldGVyRGF0YVR5cGVSZXF1ZXN0czpQcm9taXNlPGFueT5bXSA9IFtdO1xyXG4gICAgICAgIG1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVycy5mb3JFYWNoKChjb21wb25lbnRQYXJhbWV0ZXIpPT57IHJlYWRQYXJhbWV0ZXJEYXRhVHlwZVJlcXVlc3RzLnB1c2goIHRoaXMudXBkYXRlUGFyYW1ldGVyRGF0YVR5cGUoY29tcG9uZW50UGFyYW1ldGVyKSk7fSk7XHJcbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwocmVhZFBhcmFtZXRlckRhdGFUeXBlUmVxdWVzdHMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcn0gY29tcG9uZW50UGFyYW1ldGVyXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgYXN5bmMgdXBkYXRlUGFyYW1ldGVyRGF0YVR5cGUoY29tcG9uZW50UGFyYW1ldGVyOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcik6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgbGV0IGRhdGFUeXBlUmVmID0gYXdhaXQgdGhpcy5yZWFkQ29tcG9uZW50UGFyYW1ldGVyRGF0YVR5cGUoY29tcG9uZW50UGFyYW1ldGVyKTtcclxuICAgICAgICBjb21wb25lbnRQYXJhbWV0ZXIuZGF0YVR5cGUgPSBkYXRhVHlwZVJlZjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlYWRzIGFuZCB1cGRhdGVzIHRoZSBwYXJhbWV0ZXIgZW51bXMgZm9yIGVudW0gZGF0YSB0eXBlc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSBtYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQcm92aWRlclxyXG4gICAgICovXHJcbiAgICByZWFkUGFyYW1ldGVyRW51bXMobWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJzOiBNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pe1xyXG4gICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mby5yZWFkUGFyYW1ldGVyRW51bXMobWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlYWRzIGFuZCB1cGRhdGVzIG1ldGhvZCBwYXJhbWV0ZXIgZW51bXMgXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kW119IG1ldGhvZHNcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcmVhZE1ldGhvZFBhcmFtZXRlckVudW1zKG1ldGhvZHM6IE1vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RbXSk6IHZvaWQge1xyXG4gICAgICAgIGxldCBtZXRhRGF0YSA9ICg8YW55Pm1ldGhvZHNbMF0uY29tcG9uZW50KS5tZXRhRGF0YTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1ldGhvZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgbWV0aG9kID0gbWV0aG9kc1tpXTtcclxuICAgICAgICAgICAgaWYgKG1ldGhvZC5pbnB1dFBhcmFtZXRlcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvLnJlYWRNZXRob2RQYXJhbWV0ZXJFbnVtcyhtZXRob2QsIG1ldGFEYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlYWRzIHRoZSBkYXRhIHR5cGUgb2YgYSBwYXJhbWV0ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJ9IGNvbXBvbmVudFBhcmFtZXRlclxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIHJlYWRDb21wb25lbnRQYXJhbWV0ZXJEYXRhVHlwZShjb21wb25lbnRQYXJhbWV0ZXI6IE1vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIpOiBQcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAvLyByZWFkIHRoZSBwYXJhbWV0ZXJzIGRhdGEgdHlwZSBcclxuICAgICAgICB2YXIgcGFyYW1ldGVyRGF0YVR5cGVJZCA9IGF3YWl0IE9wY1VhUmVzdFNlcnZpY2VzLnJlYWROb2RlQXR0cmlidXRlKHRoaXMuX2RpYWdub3N0aWNQcm92aWRlci5zZXNzaW9uSWQsIGNvbXBvbmVudFBhcmFtZXRlci5pZCwgT3BjVWFBdHRyaWJ1dGUuREFUQV9UWVBFKTtcclxuICAgICAgICB2YXIgcGFyYW1ldGVyRGF0YVR5cGVOb2RlSWQgPSBwYXJhbWV0ZXJEYXRhVHlwZUlkO1xyXG5cclxuICAgICAgICAvLyB2YXIgcGFyYW1ldGVyRGF0YVR5cGVCcm93c2VOYW1lID0gYXdhaXQgT3BjVWFSZXN0U2VydmljZXMucmVhZE5vZGVBdHRyaWJ1dGUodGhpcy5fZGlhZ25vc3RpY1Byb3ZpZGVyLnNlc3Npb25JZCwgcGFyYW1ldGVyRGF0YVR5cGVOb2RlSWQsT3BjVWFBdHRyaWJ1dGUuQlJPV1NFX05BTUUpO1xyXG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnJlYWREYXRhVHlwZUluZm8ocGFyYW1ldGVyRGF0YVR5cGVOb2RlSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmVhZHMgZGF0YSB0eXBlIGluZm8gZm9yIHRoZSBzcGVjaWZpZWQgZGF0YSB0eXBlIGlkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gcGFyYW1ldGVyRGF0YVR5cGVOb2RlSWRcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIHJlYWREYXRhVHlwZUluZm8ocGFyYW1ldGVyRGF0YVR5cGVOb2RlSWQ6IGFueSkge1xyXG4gICAgICAgIHZhciBwYXJhbWV0ZXJEYXRhVHlwZURpc3BsYXlOYW1lID0gYXdhaXQgT3BjVWFSZXN0U2VydmljZXMucmVhZE5vZGVBdHRyaWJ1dGUodGhpcy5fZGlhZ25vc3RpY1Byb3ZpZGVyLnNlc3Npb25JZCwgcGFyYW1ldGVyRGF0YVR5cGVOb2RlSWQsIE9wY1VhQXR0cmlidXRlLkRJU1BMQVlfTkFNRSk7XHJcbiAgICAgICAgLy8gdmFyIHBhcmFtZXRlckRhdGFUeXBlRGVzY3IgPSBhd2FpdCBPcGNVYVJlc3RTZXJ2aWNlcy5yZWFkTm9kZUF0dHJpYnV0ZSh0aGlzLl9kaWFnbm9zdGljUHJvdmlkZXIuc2Vzc2lvbklkLCBwYXJhbWV0ZXJEYXRhVHlwZU5vZGVJZCxPcGNVYUF0dHJpYnV0ZS5ERVNDUklQVElPTik7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0UGFyYW1ldGVyRGF0YVR5cGUocGFyYW1ldGVyRGF0YVR5cGVOb2RlSWQsIHBhcmFtZXRlckRhdGFUeXBlRGlzcGxheU5hbWUpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlYWRzIGEgcGFyYW1ldGVycyB2YWx1ZSBhbmQgdXBkYXRlcyB0aGUgcGFyYW1ldGVycyB2YWx1ZSBpZiBzcGVjaWZpZWRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJ9IGNvbXBvbmVudFBhcmFtZXRlclxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbdXBkYXRlPXRydWVdIHVwZGF0ZXMgdGhlIHBhcmFtZXRlcnMgdmFsdWUgaWYgdHJ1ZVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyByZWFkQ29tcG9uZW50UGFyYW1ldGVyVmFsdWUoY29tcG9uZW50UGFyYW1ldGVyOiBNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyLCB1cGRhdGUgPSB0cnVlKSB7XHJcbiAgICAgICAgdmFyIGNvbXBvbmVudFBhcmFtZXRlclZhbHVlID0gYXdhaXQgT3BjVWFSZXN0U2VydmljZXMucmVhZE5vZGVBdHRyaWJ1dGUodGhpcy5fZGlhZ25vc3RpY1Byb3ZpZGVyLnNlc3Npb25JZCwgY29tcG9uZW50UGFyYW1ldGVyLmlkKTtcclxuICAgICAgICAvLyB1cGRhdGUgdGhlIHBhcmFtZXRlcnMgdmFsdWVcclxuICAgICAgICBpZiAodXBkYXRlKSB7XHJcbiAgICAgICAgICAgIGNvbXBvbmVudFBhcmFtZXRlci52YWx1ZSA9IGNvbXBvbmVudFBhcmFtZXRlclZhbHVlOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29tcG9uZW50UGFyYW1ldGVyVmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB3cml0ZXMgYSBwYXJhbWV0ZXIgdmFsdWVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJ9IGNvbXBvbmVudFBhcmFtZXRlclxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyB3cml0ZUNvbXBvbmVudFBhcmFtZXRlclZhbHVlKGNvbXBvbmVudFBhcmFtZXRlcjogTW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcikge1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHdyaXRlIHRoZSBjb21wb25lbnQgcGFyYW1ldGVyIHRvIHRoZSB0YXJnZXRcclxuICAgICAgICB2YXIgY29tcG9uZW50UGFyYW1ldGVyVmFsdWUgPSBhd2FpdCBPcGNVYVJlc3RTZXJ2aWNlcy53cml0ZU5vZGVBdHRyaWJ1dGUodGhpcy5fZGlhZ25vc3RpY1Byb3ZpZGVyLnNlc3Npb25JZCwgY29tcG9uZW50UGFyYW1ldGVyLmlkLCBPcGNVYUF0dHJpYnV0ZS5WQUxVRSwgY29tcG9uZW50UGFyYW1ldGVyLnZhbHVlKTtcclxuICAgICAgICAvLyB2ZXJpZnkgaWYgdGhlIHBhcmFtZXRlciBoYXMgYmVlbiB3cml0dGVuIHNpY2Nlc3NmdWxseVxyXG4gICAgICAgIHRoaXMudmVyaWZ5UGFyYW1ldGVyV3JpdGUoY29tcG9uZW50UGFyYW1ldGVyKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudFBhcmFtZXRlclZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVmVyaWZpZXMgaWYgdGhlIHBhcmFtZXRlciBoYXMgYmVlbiBzdWNjZXNzZnVsbHkgd3JpdHRlbiBieSByZWFkaW5nIGJhY2sgdGhlIHZhbHVlIGFmdGVyIHNvbWUgZGVsYXkgdGltZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJ9IGNvbXBvbmVudFBhcmFtZXRlclxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB2ZXJpZnlQYXJhbWV0ZXJXcml0ZShjb21wb25lbnRQYXJhbWV0ZXI6IE1vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIpIHtcclxuXHJcbiAgICAgICAgLy8gZGVsYXkgcmVyZWFkIGZvciAyIHRpbWVzIHRoZSBtb25pdG9yaW5nIHNhbXBsaW5nIHJhdGUgc28gdGhhdCBjaGFuZ2Ugbm90aWZpY2F0aW9uIGNvdWxkIHBvc3NpYmx5IGJlIHJlY2VpdmVkXHJcbiAgICAgICAgc2V0VGltZW91dChhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIHJlYWQgdGhlIHBhcmFtZXRlciB2YWx1ZSBmcm9tIHRoZSB0YXJnZXRcclxuICAgICAgICAgICAgbGV0IHJlZmxlY3RlZFBhcmFtZXRlclZhbHVlID0gYXdhaXQgdGhpcy5yZWFkQ29tcG9uZW50UGFyYW1ldGVyVmFsdWUoY29tcG9uZW50UGFyYW1ldGVyLGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHVwZGF0ZS9yZXdyaXRlIHRoZSBwYXJhbWV0ZXIgaWYgaXRzIHZhbHVlIGRpZmZlcnMgZnJvbSB0aGUgcmVmbGVjdGVkIHZhbHVlLlxyXG4gICAgICAgICAgICBpZiAocmVmbGVjdGVkUGFyYW1ldGVyVmFsdWUgIT09IGNvbXBvbmVudFBhcmFtZXRlci52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50UGFyYW1ldGVyLnZhbHVlID0gcmVmbGVjdGVkUGFyYW1ldGVyVmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIHJlZmxlY3QgdGhlIHdyaXR0ZW4gdmFsdWUgdmlhIHRoZSB3cml0ZSByZXNwb25zZSBkZWxlZ2F0ZVxyXG4gICAgICAgICAgICBpZiAoY29tcG9uZW50UGFyYW1ldGVyLnJlZmxlY3RlZFdyaXRlUmVzcG9uc2VEZWxlZ2F0ZSkge1xyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50UGFyYW1ldGVyLnJlZmxlY3RlZFdyaXRlUmVzcG9uc2VEZWxlZ2F0ZShyZWZsZWN0ZWRQYXJhbWV0ZXJWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAvLyBjbGVhciB0aGUgcmVzcG9uc2UgZGVsZWdhdGUgYWZ0ZXIgdGhlIHJlc3BvbnNlIGNhbGwgdG8gbWFrZSBzdXJlIHRoYXQgZXZlcnkgd3JpdGUgdXNlcyBpdHMgb3duIHJlc3BvbnNlIGNhbGxiYWNrXHJcbiAgICAgICAgICAgICAgICBjb21wb25lbnRQYXJhbWV0ZXIucmVmbGVjdGVkV3JpdGVSZXNwb25zZURlbGVnYXRlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sIE9wY1VhUmVzdFNlcnZpY2VzLm1vbml0b3JpbmdTYW1wbGluZ0ludGVydmFsKjIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQnJvd3NlcyB0aGUgbWV0aG9kcyBvZiBhIGNvbXBvbmVudFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnR9IG1hcHBDb2NrcGl0Q29tcG9uZW50XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIGJyb3dzZUNvbXBvbmVudE1ldGhvZHMobWFwcENvY2twaXRDb21wb25lbnQ6IE1vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnQpIHtcclxuICAgICAgICB2YXIgbWV0aG9kU2V0ID0gYXdhaXQgT3BjVWFSZXN0U2VydmljZXMuYnJvd3NlTm9kZU1ldGhvZFNldCh0aGlzLl9kaWFnbm9zdGljUHJvdmlkZXIuc2Vzc2lvbklkLCBtYXBwQ29ja3BpdENvbXBvbmVudC5pZCk7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudE1ldGhvZHMgPSBuZXcgQXJyYXk8TW9kZWxJdGVtcy5NYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZD4oKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1ldGhvZFNldC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvbXBvbmVudE1ldGhvZCA9IG1ldGhvZFNldFtpXTtcclxuICAgICAgICAgICAgICAgIGxldCBtYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCA9IG5ldyBNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kKG1hcHBDb2NrcGl0Q29tcG9uZW50LGNvbXBvbmVudE1ldGhvZC5kaXNwbGF5TmFtZSwgY29tcG9uZW50TWV0aG9kKTtcclxuICAgICAgICAgICAgICAgIGNvbXBvbmVudE1ldGhvZHMucHVzaChtYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbWFwcENvY2twaXRDb21wb25lbnQubWV0aG9kcyA9IGNvbXBvbmVudE1ldGhvZHM7XHJcbiAgICAgICAgcmV0dXJuIG1hcHBDb2NrcGl0Q29tcG9uZW50Lm1ldGhvZHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBleGVjdXRlcyBhIGNvbXBvbmVudCBtZXRob2RcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kfSBtYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBhc3luYyBleGVjdXRlQ29tcG9uZW50TWV0aG9kKG1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kOiBNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kKTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICBsZXQgbWV0aG9kUmVzdWx0O1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChtYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZC5pc0V4ZWN1dGFibGUudmFsdWUpIHtcclxuICAgICAgICAgICAgbGV0IG1ldGhvZE5vZGVJZCA9IG1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLmlkLnNwbGl0KFwiLlwiKVswXSArIFwiLk1ldGhvZFNldFwiO1xyXG5cclxuICAgICAgICAgICAgbGV0IG1ldGhvZEFyZ3MgPSB7fTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZC5pbnB1dFBhcmFtZXRlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlucHV0UGFyYW1ldGVyID0gbWFwcENvY2twaXRDb21wb25lbnRNZXRob2QuaW5wdXRQYXJhbWV0ZXJzW2ldO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBtZXRob2RBcmdzW2lucHV0UGFyYW1ldGVyLm5hbWVdID0gaW5wdXRQYXJhbWV0ZXIudmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICBtZXRob2RSZXN1bHQgPSBhd2FpdCBPcGNVYVJlc3RTZXJ2aWNlcy5leGVjdXRlTWV0aG9kKHRoaXMuX2RpYWdub3N0aWNQcm92aWRlci5zZXNzaW9uSWQsIG1ldGhvZE5vZGVJZCxtYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZC5pZCxtZXRob2RBcmdzKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIk1hcHBDb2NrcGl0Q29tcG9uZW50UHJvdmlkZXI6IG1ldGhvZCAlbyBjYWxsZWQgdGhvdWdoIG5vdCBleGVjdXRhYmxlIVwiKTtcclxuICAgICAgICAgICAgbWV0aG9kUmVzdWx0ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG1ldGhvZFJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEJyb3dzZXMgdGhlIGNvbXBvbmVudCBtZXRob2QgcGFyYW1ldGVyc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnR9IG1hcHBDb2NrcGl0Q29tcG9uZW50XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIGJyb3dzZUNvbXBvbmVudE1ldGhvZFBhcmFtZXRlcnMobWFwcENvY2twaXRDb21wb25lbnRNZXRob2RzOiBBcnJheTxNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kPik6IFByb21pc2U8TW9kZWxJdGVtcy5NYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcltdPiB7XHJcblxyXG4gICAgICAgIGxldCBtZXRob2RJbnB1dFBhcmFtZXRlclJlYWRSZXF1ZXN0OiBQcm9taXNlPGFueT5bXSA9IFtdO1xyXG4gICAgICAgIG1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kcy5mb3JFYWNoKChtYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCk9PnsgbWV0aG9kSW5wdXRQYXJhbWV0ZXJSZWFkUmVxdWVzdC5wdXNoKHRoaXMucmVhZE1ldGhvZElucHV0UGFyYW1ldGVycyhtYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCkpO30pO1xyXG4gICAgICAgIGxldCBtZXRob2RJbnB1dFBhcmFtZXRlcnMgPSBhd2FpdCBQcm9taXNlLmFsbChtZXRob2RJbnB1dFBhcmFtZXRlclJlYWRSZXF1ZXN0KTtcclxuICAgICAgICByZXR1cm4gbWV0aG9kSW5wdXRQYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZCBpbnB1dCBwYXJhbWV0ZXJzIGZvciBhIGNvbXBvbmVudCBtZXRob2RcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZH0gY29tcG9uZW50TWV0aG9kXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVyW10+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyByZWFkTWV0aG9kSW5wdXRQYXJhbWV0ZXJzKGNvbXBvbmVudE1ldGhvZDogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QpOiBQcm9taXNlPE1vZGVsSXRlbXMuTWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXJbXT4ge1xyXG4gICAgICAgIC8vIGNsZWFyIGV4aXN0aW5nIHBhcmFtZXRlcnNcclxuICAgICAgICBjb21wb25lbnRNZXRob2QuaW5wdXRQYXJhbWV0ZXJzLnNwbGljZSgwLGNvbXBvbmVudE1ldGhvZC5pbnB1dFBhcmFtZXRlcnMubGVuZ3RoKTtcclxuICAgICAgICB2YXIgaW5wdXRQYXJhbWV0ZXJzID0gYXdhaXQgT3BjVWFSZXN0U2VydmljZXMucmVhZE1ldGhvZFBhcmFtZXRlcnModGhpcy5fZGlhZ25vc3RpY1Byb3ZpZGVyLnNlc3Npb25JZCwgY29tcG9uZW50TWV0aG9kLmlkKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlucHV0UGFyYW1ldGVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgaW5wdXRQYXJhbWV0ZXIgPSBpbnB1dFBhcmFtZXRlcnNbaV07XHJcbiAgICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgY29tcG9uZW50IG1ldGhvZHMgaW5wdXQgcGFyYW1ldGVyc1xyXG4gICAgICAgICAgICBjb21wb25lbnRNZXRob2QuaW5wdXRQYXJhbWV0ZXJzLnB1c2gobmV3IE1vZGVsSXRlbXMuTWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXIoY29tcG9uZW50TWV0aG9kLGlucHV0UGFyYW1ldGVyLm5hbWUsIGlucHV0UGFyYW1ldGVyKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb21wb25lbnRNZXRob2QuaW5wdXRQYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdXBkYXRlcyBtZXRob2QgcGFyYW1ldGVyIGRhdGEgdHlwZXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kW119IG1ldGhvZHNcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tcG9uZW50UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgYXN5bmMgdXBkYXRlTWV0aG9kUGFyYW1ldGVyRGF0YVR5cGVzKG1ldGhvZHM6IE1vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RbXSk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgLy8gcmVhZCBhbmQgdXBkYXRlIG1ldGhvZCBwYXJhbWV0ZXIgZGF0YSB0eXBlc1xyXG4gICAgICAgIGF3YWl0IHRoaXMucmVhZE1ldGhvZFBhcmFtZXRlckRhdGFUeXBlcyhtZXRob2RzKTtcclxuXHJcbiAgICAgICAgLy8gcmVhZCBhbmQgdXBkYXRlIHBhcmFtZXRlciBlbnVtc1xyXG4gICAgICAgIHRoaXMucmVhZE1ldGhvZFBhcmFtZXRlckVudW1zKG1ldGhvZHMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmVhZHMgYW5kIGFzc2lnbnMgbWV0aG9kIHBhcmFtZXRlciBkYXRhIHR5cGVzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNb2RlbEl0ZW1zLk1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kW119IG1ldGhvZHNcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21wb25lbnRQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBhc3luYyByZWFkTWV0aG9kUGFyYW1ldGVyRGF0YVR5cGVzKG1ldGhvZHM6IE1vZGVsSXRlbXMuTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RbXSk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgIGxldCBtZXRob2RQYXJhbWV0ZXJEYXRhVHlwZXNSZWFkUmVxdWVzdHM6IFByb21pc2U8YW55PltdID0gW107XHJcbiAgICAgICAgLy8gY29sbGVjdCByZWFkIHJlcXVlc3RzIGZvciBpbnB1dCBwYXJhbWV0ZXIgZGF0YSB0eXBlc1xyXG5cclxuICAgICAgICBtZXRob2RzLmZvckVhY2goKG1ldGhvZCk9PnsgXHJcbiAgICAgICAgICAgIG1ldGhvZC5pbnB1dFBhcmFtZXRlcnMuZm9yRWFjaCgoaW5wdXRQYXJhbWV0ZXIpPT57IFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kUGFyYW1ldGVyRGF0YVR5cGVzUmVhZFJlcXVlc3RzLnB1c2godGhpcy51cGRhdGVNZXRob2RQYXJhbWV0ZXJEYXRhVHlwZShpbnB1dFBhcmFtZXRlcikpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICAvLyB1cGRhdGUgdGhlIHBhcmFtZXRlcnMgZGF0YSB0eXBlc1xyXG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKG1ldGhvZFBhcmFtZXRlckRhdGFUeXBlc1JlYWRSZXF1ZXN0cyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBtZXRob2QgaW5wdXQgcGFyYW1ldGVyIHMgZGF0YSB0eXBlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TW9kZWxJdGVtcy5NYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcn0gaW5wdXRQYXJhbWV0ZXJcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbXBvbmVudFByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgdXBkYXRlTWV0aG9kUGFyYW1ldGVyRGF0YVR5cGUoaW5wdXRQYXJhbWV0ZXI6IE1vZGVsSXRlbXMuTWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXIpIHtcclxuICAgICAgICBsZXQgZGF0YVR5cGVSZWYgPSBhd2FpdCB0aGlzLnJlYWREYXRhVHlwZUluZm8oaW5wdXRQYXJhbWV0ZXIuZGF0YVR5cGVJZCk7XHJcbiAgICAgICAgaW5wdXRQYXJhbWV0ZXIuZGF0YVR5cGUgPSBkYXRhVHlwZVJlZjtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50UHJvdmlkZXIgfTtcclxuXHJcblxyXG4iXX0=