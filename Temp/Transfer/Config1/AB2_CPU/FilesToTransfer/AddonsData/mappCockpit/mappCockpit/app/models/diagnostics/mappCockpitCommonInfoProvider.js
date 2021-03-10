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
define(["require", "exports", "../../communication/rest/opcUaRestServices", "../online/mappCockpitComponent", "../online/mappCockpitComponentMetaData", "../online/mappCockpitComponentReflection"], function (require, exports, opcUaRestServices_1, mappCockpitComponent_1, mappCockpitComponentMetaData_1, mappCockpitComponentReflection_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MappCockpitCommonInfoProvider = /** @class */ (function () {
        /**
         * creates an instance of MappCockpitCommonInfoProvider.
         * @memberof MappCockpitCommonInfoProvider
         */
        function MappCockpitCommonInfoProvider() {
            // holds the currently acive session id
            this._sessionId = -1;
            // holds the mapp cockpit nmespace index
            this._namespaceIndex = -1;
            // holds enum type definitions
            this._enumTypeDefinitions = [];
        }
        /**
         * gets a singleton instance of MappCockpitCommonInfoProvider
         *
         * @readonly
         * @type {MappCockpitCommonInfoProvider}
         * @memberof MappCockpitCommonInfoProvider
         */
        MappCockpitCommonInfoProvider.getInstance = function () {
            this._instance = this._instance ? this._instance : new MappCockpitCommonInfoProvider();
            return this._instance;
        };
        /**
         * initializes the info provider and populates it with commonly needed data
         *
         * @param {number} sessionId
         * @param {number} namespaceIndex
         * @returns {*}
         * @memberof MappCockpitCommonInfoProvider
         */
        MappCockpitCommonInfoProvider.prototype.initialize = function (sessionId, namespaceIndex) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this._sessionId = sessionId;
                            this._namespaceIndex = namespaceIndex;
                            // browse available enum type definitions
                            return [4 /*yield*/, this.readEnumTypeDefinitions()];
                        case 1:
                            // browse available enum type definitions
                            _a.sent();
                            console.log("MappCockpitCommonInfoProvider.readEnumTypeDefinitions %o", this._enumTypeDefinitions);
                            return [2 /*return*/];
                    }
                });
            });
        };
        MappCockpitCommonInfoProvider.prototype.readComponentMetaInfo = function (component) {
            return __awaiter(this, void 0, void 0, function () {
                var componentMetaReferences, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.browseNodeMetaInfo(this._sessionId, component.id)];
                        case 1:
                            componentMetaReferences = _a.sent();
                            if (componentMetaReferences) {
                                component.metaData = this.parseComponentMetaData(componentMetaReferences);
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Parses the components meta data
         *
         * @private
         * @param {InterfaceOpcUaRestResultNodeReference[]} metaInfoReferences
         * @returns
         * @memberof MappCockpitCommonInfoProvider
         */
        MappCockpitCommonInfoProvider.prototype.parseComponentMetaData = function (metaInfoReferences) {
            var metaData = {};
            try {
                metaInfoReferences.forEach(function (metaInfoReference) {
                    metaData[metaInfoReference.browseName] = JSON.parse(metaInfoReference.value);
                });
            }
            catch (e) {
                throw new Error("MappCockpitComponentDataModel.browseMetaData: could not parse meta data: " + e.message);
            }
            return metaData;
        };
        /**
         * Initializes the meta dat with specific sections
         *
         * @static
         * @param {MappCockpitComponentMetaData} metaData
         * @returns {*}
         * @memberof MappCockpitCommonInfoProvider
         */
        MappCockpitCommonInfoProvider.initializeMetaData = function (metaData) {
            // create and populate the parameters group
            metaData["Parameters"] = {};
            metaData["Parameters"]["Watchable"] = mappCockpitComponentReflection_1.MappCockpitComponentParameterInfo.readWatchableParameters(metaData);
            metaData["Parameters"]["Message"] = mappCockpitComponentReflection_1.MappCockpitComponentParameterInfo.readMessageParameters(metaData);
            metaData["Parameters"]["Configuration"] = mappCockpitComponentReflection_1.MappCockpitComponentParameterInfo.readConfigurationParameters(metaData);
            // create and populate the methods group
            metaData["Methods"] = {};
            metaData["Methods"]["Executable"] = mappCockpitComponentReflection_1.MappCockpitComponentMethodInfo.readExecutableMethods(metaData);
        };
        Object.defineProperty(MappCockpitCommonInfoProvider.prototype, "enumTypeDefinitions", {
            /**
             * gets the available enum type definitions
             *
             * @readonly
             * @type {Array<MappCockpitComponentParameterEnum>}
             * @memberof MappCockpitCommonInfoProvider
             */
            get: function () {
                return this._enumTypeDefinitions;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * reads and updates enum type definitions
         *
         * @private
         * @memberof MappCockpitCommonInfoProvider
         */
        MappCockpitCommonInfoProvider.prototype.readEnumTypeDefinitions = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = this;
                            return [4 /*yield*/, this.browseEnumTypeDefinitions(this._sessionId, this._namespaceIndex)];
                        case 1:
                            _a._enumTypeDefinitions = _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * reads enum definitions
         *
         * @private
         * @returns
         * @memberof MappCockpitCommonInfoProvider
         */
        MappCockpitCommonInfoProvider.prototype.browseEnumTypeDefinitions = function (sessionId, namespaceIndex) {
            return __awaiter(this, void 0, void 0, function () {
                var enums, allOpcUaEnums, opcUaEnums, readEnudDefinitionsRequests, i, opcUaEnum, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            enums = [];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 5]);
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.browseNodes(sessionId, opcUaRestServices_1.OpcUaRestServices.mappCockpitEnumsId)];
                        case 2:
                            allOpcUaEnums = _a.sent();
                            opcUaEnums = allOpcUaEnums.filter(function (opcUaEnum) {
                                return opcUaEnum.nodeId.indexOf(opcUaRestServices_1.OpcUaRestServices.mappCockpitNamespacePrefix + namespaceIndex) > -1;
                            });
                            readEnudDefinitionsRequests = [];
                            // collect enum def read requests
                            for (i = 0; i < opcUaEnums.length; i++) {
                                opcUaEnum = opcUaEnums[i];
                                // read the enum values as json
                                readEnudDefinitionsRequests.push(this.browseEnumValuesJson(sessionId, opcUaEnum));
                                // read the enum values as model reference
                                readEnudDefinitionsRequests.push(this.browseEnumValues(sessionId, opcUaEnum));
                            }
                            return [4 /*yield*/, Promise.all(readEnudDefinitionsRequests)];
                        case 3:
                            _a.sent();
                            enums = opcUaEnums.map(function (opcUaEnumsRef) { return new mappCockpitComponent_1.MappCockpitComponentParameterEnum(opcUaEnumsRef); });
                            return [3 /*break*/, 5];
                        case 4:
                            error_2 = _a.sent();
                            throw error_2;
                        case 5: return [2 /*return*/, enums];
                    }
                });
            });
        };
        /**
         * reads enum definitions for parameters
         *
         * @param {*} metaInfo
         * @returns an object with enum definitions with the parameter name as key
         * @memberof MappCockpitCommonInfoProvider
         */
        MappCockpitCommonInfoProvider.prototype.readEnumParameterDefinitions = function (componentParameters, metaInfo) {
            var enumParameters = {};
            // get the target model enum types
            var opcUaEnumTypes = MappCockpitCommonInfoProvider.getInstance().enumTypeDefinitions;
            // get the meta parameter infos
            var metaParameterInfo = MappCockpitCommonInfoProvider.readEnumMetaInfo(metaInfo);
            if (metaParameterInfo != undefined) {
                // get possible enum type meta items
                enumParameters = this.readEnumDefinitionsFromMetaInfo(metaParameterInfo, opcUaEnumTypes);
            }
            else {
                // without meta info we try to use the target model definitions.
                enumParameters = this.readEnumDefinitionFromTargetModel(componentParameters, opcUaEnumTypes);
            }
            return enumParameters;
        };
        /**
         * Reads the enum parameter meta info
         *
         * @private
         * @param {*} metaInfo
         * @returns
         * @memberof MappCockpitCommonInfoProvider
         */
        MappCockpitCommonInfoProvider.readEnumMetaInfo = function (metaInfo) {
            var metaParameterInfo;
            if (metaInfo) {
                // If no MetaConfigConfigProps are available only use watchables
                if (metaInfo.MetaConfigConfigProps != undefined) {
                    metaParameterInfo = metaInfo.MetaConfigConfigProps.ConfigurationStructure.Childs;
                    metaParameterInfo = metaParameterInfo.concat(metaInfo.MetaConfigWatchables.WatchablesStructure.Childs);
                }
                else {
                    if (metaInfo.MetaConfigWatchables != undefined) {
                        metaParameterInfo = metaInfo.MetaConfigWatchables.WatchablesStructure.Childs;
                    }
                }
            }
            return metaParameterInfo;
        };
        /**
         * Reads the available enum type definitions from the meta info
         *
         * @private
         * @param {*} metaParameterInfo
         * @param {MappCockpitComponentParameterEnum[]} opcUaEnumTypes
         * @returns {*}
         * @memberof MappCockpitCommonInfoProvider
         */
        MappCockpitCommonInfoProvider.prototype.readEnumDefinitionsFromMetaInfo = function (metaParameterInfo, opcUaEnumTypes) {
            var enumParameters = {};
            var metaParameterUsingEnums = MappCockpitCommonInfoProvider.readEnumMetaDefinitions(metaParameterInfo);
            metaParameterUsingEnums.forEach(function (enumParameterMetaItem) {
                var enumTypeRef = enumParameterMetaItem.TypeDef.EnumTypeRef;
                var matchingOpcUaEnumTypes = opcUaEnumTypes.filter(function (opcUaEnumType) { return opcUaEnumType.browseName === enumTypeRef; });
                if (matchingOpcUaEnumTypes.length === 1) {
                    // save the matching enum type info for the parameter name
                    enumParameters[enumParameterMetaItem.Ref] = matchingOpcUaEnumTypes[0];
                }
                else {
                    console.error("MappCockpitComponentParameterInfo - No enum type found for %o %o", enumTypeRef, enumParameterMetaItem);
                }
            });
            return enumParameters;
        };
        /**
         * Reads the enum definitions contained in the meta data
         *
         * @static
         * @param {*} metaParameterInfo
         * @returns
         * @memberof MappCockpitCommonInfoProvider
         */
        MappCockpitCommonInfoProvider.readEnumMetaDefinitions = function (metaParameterInfo) {
            var typeDefinitions = mappCockpitComponentMetaData_1.MappCockpitComponentMetaData.filterMetaItems(metaParameterInfo, ["Parameter", "Watchable", "Group"], function (metaItemGroupOrParameter) { return metaItemGroupOrParameter.hasOwnProperty("TypeDef"); });
            var enumTypeDefinitions = typeDefinitions.filter(function (typeDefinition) { return typeDefinition.TypeDef.hasOwnProperty("EnumTypeRef"); });
            return enumTypeDefinitions;
        };
        /**
         * reads the available enum type defintions from the target model
         *
         * @private
         * @param {MappCockpitComponentParameter[]} componentParameters
         * @param {MappCockpitComponentParameterEnum[]} opcUaEnumTypes
         * @returns {*}
         * @memberof MappCockpitCommonInfoProvider
         */
        MappCockpitCommonInfoProvider.prototype.readEnumDefinitionFromTargetModel = function (componentParameters, opcUaEnumTypes) {
            var enumParameters = {};
            componentParameters.forEach(function (componentParameter) {
                var matchingOpcUaEnumTypes = opcUaEnumTypes.filter(function (opcUaEnumType) { return opcUaEnumType.browseName === componentParameter.dataType.name; });
                if (matchingOpcUaEnumTypes.length === 1) {
                    enumParameters[componentParameter.browseName] = matchingOpcUaEnumTypes[0];
                }
            });
            return enumParameters;
        };
        /**
         * reads enum type definitions for method parameters
         *
         * @param {MappCockpitComponentMethod} method
         * @param {*} metaInfo
         * @returns
         * @memberof MappCockpitCommonInfoProvider
         */
        MappCockpitCommonInfoProvider.prototype.readMetaEnumMethodParameterDefinitions = function (method, metaInfo) {
            var enumParameters = {};
            var opcUaEnumTypes = MappCockpitCommonInfoProvider.getInstance().enumTypeDefinitions;
            if (metaInfo == undefined)
                return enumParameters;
            // get the meta parameter infos
            if (metaInfo.MetaConfigCommands == undefined)
                return enumParameters;
            var metaMethodParameterInfo = metaInfo.MetaConfigCommands.CommandsStructure.Childs;
            if (metaMethodParameterInfo) {
                // get the command meta info
                var metaCommandInfo = mappCockpitComponentMetaData_1.MappCockpitComponentMetaData.filterMetaItems(metaMethodParameterInfo, ["Command"], function (command) { return command.Ref === method.browseName; });
                // get the commands parameter info
                var metaParameterUsingEnums = mappCockpitComponentMetaData_1.MappCockpitComponentMetaData.filterMetaItems(metaCommandInfo, ["Parameter"], function (metaItemGroupOrParameter) { return metaItemGroupOrParameter.hasOwnProperty("TypeDef"); });
                var _loop_1 = function (i) {
                    var enumParameterMetaItem = metaParameterUsingEnums[i];
                    var enumTypeRef = enumParameterMetaItem.TypeDef.EnumTypeRef;
                    var matchingOpcUaEnumTypes = opcUaEnumTypes.filter(function (opcUaEnumType) { return opcUaEnumType.browseName === enumTypeRef; });
                    if (matchingOpcUaEnumTypes.length > 0) {
                        // save the matching enum type info for the parameter name
                        enumParameters[enumParameterMetaItem.Ref] = matchingOpcUaEnumTypes[0];
                    }
                    else {
                        console.error("MappCockpitMethodParameterInfo - No enum type found for %o %o", enumTypeRef, enumParameterMetaItem);
                    }
                };
                // find and collect matching opcua enum type refs
                for (var i = 0; i < metaParameterUsingEnums.length; i++) {
                    _loop_1(i);
                }
            }
            return enumParameters;
        };
        /**
         * browses the enum values a sjson (for older targets)
         *
         * @private
         * @static
         * @param {number} sessionId
         * @param {*} opcUaEnum
         * @memberof MappCockpitCommonInfoProvider
         */
        MappCockpitCommonInfoProvider.prototype.browseEnumValuesJson = function (sessionId, opcUaEnum) {
            return __awaiter(this, void 0, void 0, function () {
                var enumValuesJsonString, enumValuesJson, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.readNodeAttribute(sessionId, opcUaEnum.nodeId, opcUaRestServices_1.OpcUaAttribute.DESCRIPTION)];
                        case 1:
                            enumValuesJsonString = _a.sent();
                            enumValuesJson = JSON.parse(enumValuesJsonString).enumValues.map(function (enumValueItem) { return { displayName: { locale: "", text: enumValueItem.text }, value: enumValueItem.value }; });
                            opcUaEnum.enumValuesJson = enumValuesJson;
                            return [3 /*break*/, 3];
                        case 2:
                            error_3 = _a.sent();
                            throw error_3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * browses the opc ua enum node for its value definitions
         *
         * @private
         * @static
         * @param {number} sessionId
         * @param {*} opcUaEnum
         * @returns
         * @memberof MappCockpitCommonInfoProvider
         */
        MappCockpitCommonInfoProvider.prototype.browseEnumValues = function (sessionId, opcUaEnum) {
            return __awaiter(this, void 0, void 0, function () {
                var enumValuesRef, enumValuesNodes, enumValues, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            enumValuesRef = undefined;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 5, , 6]);
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.browseNodes(sessionId, opcUaEnum.nodeId)];
                        case 2:
                            enumValuesNodes = _a.sent();
                            if (!enumValuesNodes) return [3 /*break*/, 4];
                            enumValues = enumValuesNodes.filter(function (enumValuesNode) { return enumValuesNode.browseName === "EnumValues" || enumValuesNode.browseName === "EnumStrings"; });
                            if (!(enumValues && enumValues.length > 0)) return [3 /*break*/, 4];
                            return [4 /*yield*/, opcUaRestServices_1.OpcUaRestServices.readNodeAttribute(sessionId, enumValues[0].nodeId, opcUaRestServices_1.OpcUaAttribute.VALUE)];
                        case 3:
                            enumValuesRef = _a.sent();
                            _a.label = 4;
                        case 4: return [3 /*break*/, 6];
                        case 5:
                            error_4 = _a.sent();
                            throw error_4;
                        case 6:
                            opcUaEnum.enumValues = enumValuesRef;
                            return [2 /*return*/];
                    }
                });
            });
        };
        return MappCockpitCommonInfoProvider;
    }());
    exports.MappCockpitCommonInfoProvider = MappCockpitCommonInfoProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcENvY2twaXRDb21tb25JbmZvUHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9kaWFnbm9zdGljcy9tYXBwQ29ja3BpdENvbW1vbkluZm9Qcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFPQTtRQWVJOzs7V0FHRztRQUNIO1lBakJBLHVDQUF1QztZQUMvQixlQUFVLEdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDaEMsd0NBQXdDO1lBQ2hDLG9CQUFlLEdBQVcsQ0FBQyxDQUFDLENBQUM7WUFFckMsOEJBQThCO1lBQ3RCLHlCQUFvQixHQUFVLEVBQUUsQ0FBQztRQWF6QyxDQUFDO1FBR0Q7Ozs7OztXQU1HO1FBQ1cseUNBQVcsR0FBekI7WUFFSSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksNkJBQTZCLEVBQUUsQ0FBQztZQUV2RixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDMUIsQ0FBQztRQUdEOzs7Ozs7O1dBT0c7UUFDRyxrREFBVSxHQUFoQixVQUFpQixTQUFpQixFQUFFLGNBQXNCOzs7Ozs0QkFFdEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7NEJBQzVCLElBQUksQ0FBQyxlQUFlLEdBQUcsY0FBYyxDQUFDOzRCQUd0Qyx5Q0FBeUM7NEJBQ3pDLHFCQUFNLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxFQUFBOzs0QkFEcEMseUNBQXlDOzRCQUN6QyxTQUFvQyxDQUFDOzRCQUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLDBEQUEwRCxFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDOzs7OztTQUd0RztRQUdLLDZEQUFxQixHQUEzQixVQUE0QixTQUErQjs7Ozs7Ozs0QkFFckIscUJBQU0scUNBQWlCLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUE7OzRCQUFuRyx1QkFBdUIsR0FBRyxTQUF5RTs0QkFDdkcsSUFBSSx1QkFBdUIsRUFBRztnQ0FDMUIsU0FBUyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsdUJBQXVCLENBQUMsQ0FBQzs2QkFDN0U7Ozs7Ozs7OztTQUlSO1FBRUQ7Ozs7Ozs7V0FPRztRQUNLLDhEQUFzQixHQUE5QixVQUErQixrQkFBMkQ7WUFDdEYsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDO1lBRWxCLElBQUk7Z0JBQ0Esa0JBQWtCLENBQUMsT0FBTyxDQUFDLFVBQUMsaUJBQXNCO29CQUM5QyxRQUFRLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDakYsQ0FBQyxDQUFDLENBQUM7YUFDTjtZQUNELE9BQU8sQ0FBQyxFQUFFO2dCQUNOLE1BQU0sSUFBSSxLQUFLLENBQUMsMkVBQTJFLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzVHO1lBQ0QsT0FBTyxRQUFRLENBQUM7UUFDcEIsQ0FBQztRQUdEOzs7Ozs7O1dBT0c7UUFDSSxnREFBa0IsR0FBekIsVUFBMEIsUUFBc0M7WUFFNUQsMkNBQTJDO1lBQzNDLFFBQVEsQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDNUIsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxHQUFHLGtFQUFpQyxDQUFDLHVCQUF1QixDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzFHLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxrRUFBaUMsQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN0RyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsZUFBZSxDQUFDLEdBQUcsa0VBQWlDLENBQUMsMkJBQTJCLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFbEgsd0NBQXdDO1lBQ3hDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDekIsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxHQUFHLCtEQUE4QixDQUFDLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXZHLENBQUM7UUFVRCxzQkFBVyw4REFBbUI7WUFQOUI7Ozs7OztlQU1HO2lCQUNIO2dCQUNJLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDO1lBQ3JDLENBQUM7OztXQUFBO1FBR0Q7Ozs7O1dBS0c7UUFDVywrREFBdUIsR0FBckM7Ozs7Ozs0QkFDSSxLQUFBLElBQUksQ0FBQTs0QkFBd0IscUJBQU0sSUFBSSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFBOzs0QkFBdkcsR0FBSyxvQkFBb0IsR0FBRyxTQUEyRSxDQUFDOzs7OztTQUMzRztRQUVEOzs7Ozs7V0FNRztRQUNXLGlFQUF5QixHQUF2QyxVQUF3QyxTQUFpQixFQUFFLGNBQWM7Ozs7Ozs0QkFDakUsS0FBSyxHQUFVLEVBQUUsQ0FBQzs7Ozs0QkFJRSxxQkFBTSxxQ0FBaUIsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLHFDQUFpQixDQUFDLGtCQUFrQixDQUFDLEVBQUE7OzRCQUFwRyxhQUFhLEdBQUcsU0FBb0Y7NEJBR3BHLFVBQVUsR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDLFVBQUMsU0FBUztnQ0FDNUMsT0FBTyxTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxxQ0FBaUIsQ0FBQywwQkFBMEIsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs0QkFDeEcsQ0FBQyxDQUFDLENBQUM7NEJBRUMsMkJBQTJCLEdBQW1CLEVBQUUsQ0FBQzs0QkFDckQsaUNBQWlDOzRCQUNqQyxLQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0NBQ2xDLFNBQVMsR0FBUSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBRXJDLCtCQUErQjtnQ0FDL0IsMkJBQTJCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztnQ0FDbEYsMENBQTBDO2dDQUMxQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDOzZCQUNqRjs0QkFFRCxxQkFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDLEVBQUE7OzRCQUE5QyxTQUE4QyxDQUFDOzRCQUkvQyxLQUFLLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxVQUFDLGFBQWEsSUFBTyxPQUFPLElBQUksd0RBQWlDLENBQUMsYUFBYSxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs0QkFFM0csTUFBTSxPQUFLLENBQUM7Z0NBR2hCLHNCQUFPLEtBQUssRUFBQzs7OztTQUNoQjtRQUVEOzs7Ozs7V0FNRztRQUNILG9FQUE0QixHQUE1QixVQUE2QixtQkFBb0QsRUFBRSxRQUFhO1lBQzVGLElBQUksY0FBYyxHQUFHLEVBQUUsQ0FBQztZQUN4QixrQ0FBa0M7WUFDbEMsSUFBSSxjQUFjLEdBQUcsNkJBQTZCLENBQUMsV0FBVyxFQUFFLENBQUMsbUJBQW1CLENBQUM7WUFDckYsK0JBQStCO1lBQy9CLElBQUksaUJBQWlCLEdBQUcsNkJBQTZCLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDakYsSUFBSSxpQkFBaUIsSUFBSSxTQUFTLEVBQUU7Z0JBQ2hDLG9DQUFvQztnQkFDcEMsY0FBYyxHQUFHLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxpQkFBaUIsRUFBRSxjQUFjLENBQUMsQ0FBQzthQUM1RjtpQkFBTTtnQkFDSCxnRUFBZ0U7Z0JBQ2hFLGNBQWMsR0FBRyxJQUFJLENBQUMsaUNBQWlDLENBQUMsbUJBQW1CLEVBQUUsY0FBYyxDQUFDLENBQUM7YUFDaEc7WUFDRCxPQUFPLGNBQWMsQ0FBQztRQUMxQixDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNJLDhDQUFnQixHQUF2QixVQUF3QixRQUFhO1lBQ2pDLElBQUksaUJBQWlCLENBQUM7WUFDdEIsSUFBSSxRQUFRLEVBQUU7Z0JBQ1YsZ0VBQWdFO2dCQUNoRSxJQUFJLFFBQVEsQ0FBQyxxQkFBcUIsSUFBSSxTQUFTLEVBQUU7b0JBQzdDLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUM7b0JBQ2pGLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQzFHO3FCQUNJO29CQUNELElBQUksUUFBUSxDQUFDLG9CQUFvQixJQUFJLFNBQVMsRUFBRTt3QkFDNUMsaUJBQWlCLEdBQUcsUUFBUSxDQUFDLG9CQUFvQixDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQztxQkFDaEY7aUJBQ0o7YUFDSjtZQUVELE9BQU8saUJBQWlCLENBQUM7UUFDN0IsQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ0ssdUVBQStCLEdBQXZDLFVBQXdDLGlCQUFzQixFQUFFLGNBQW1EO1lBQy9HLElBQUksY0FBYyxHQUFHLEVBQUUsQ0FBQztZQUN4QixJQUFJLHVCQUF1QixHQUFHLDZCQUE2QixDQUFDLHVCQUF1QixDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDdkcsdUJBQXVCLENBQUMsT0FBTyxDQUFDLFVBQUMscUJBQXFCO2dCQUNsRCxJQUFJLFdBQVcsR0FBRyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO2dCQUM1RCxJQUFJLHNCQUFzQixHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUMsVUFBQyxhQUFhLElBQU8sT0FBTyxhQUFhLENBQUMsVUFBVSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1SCxJQUFJLHNCQUFzQixDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7b0JBQ3JDLDBEQUEwRDtvQkFDMUQsY0FBYyxDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxHQUFHLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUN6RTtxQkFDSTtvQkFDRCxPQUFPLENBQUMsS0FBSyxDQUFDLGtFQUFrRSxFQUFFLFdBQVcsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO2lCQUN6SDtZQUNMLENBQUMsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxjQUFjLENBQUM7UUFDMUIsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSSxxREFBdUIsR0FBOUIsVUFBK0IsaUJBQXNCO1lBQ2pELElBQUksZUFBZSxHQUFJLDJEQUE0QixDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLFdBQVcsRUFBRSxXQUFXLEVBQUUsT0FBTyxDQUFDLEVBQUUsVUFBQyx3QkFBd0IsSUFBTyxPQUFPLHdCQUF3QixDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFOLElBQUksbUJBQW1CLEdBQUcsZUFBZSxDQUFDLE1BQU0sQ0FBQyxVQUFDLGNBQWMsSUFBSyxPQUFPLGNBQWMsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFBLENBQUEsQ0FBQyxDQUFDLENBQUM7WUFDbkksT0FBTyxtQkFBbUIsQ0FBQztRQUMvQixDQUFDO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDSyx5RUFBaUMsR0FBekMsVUFBMEMsbUJBQW9ELEVBQUUsY0FBbUQ7WUFDL0ksSUFBSSxjQUFjLEdBQUcsRUFBRSxDQUFDO1lBQ3hCLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxVQUFDLGtCQUFrQjtnQkFDM0MsSUFBSSxzQkFBc0IsR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDLFVBQUMsYUFBYSxJQUFPLE9BQU8sYUFBYSxDQUFDLFVBQVUsS0FBSyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pKLElBQUksc0JBQXNCLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtvQkFDckMsY0FBYyxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxHQUFHLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUM3RTtZQUNMLENBQUMsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxjQUFjLENBQUM7UUFDMUIsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSCw4RUFBc0MsR0FBdEMsVUFBdUMsTUFBa0MsRUFBRSxRQUFhO1lBQ3BGLElBQUksY0FBYyxHQUFHLEVBQUUsQ0FBQztZQUV4QixJQUFJLGNBQWMsR0FBRyw2QkFBNkIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztZQUVyRixJQUFJLFFBQVEsSUFBSSxTQUFTO2dCQUNyQixPQUFPLGNBQWMsQ0FBQztZQUUxQiwrQkFBK0I7WUFDL0IsSUFBSSxRQUFRLENBQUMsa0JBQWtCLElBQUksU0FBUztnQkFDeEMsT0FBTyxjQUFjLENBQUM7WUFFMUIsSUFBSSx1QkFBdUIsR0FBRyxRQUFRLENBQUMsa0JBQWtCLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDO1lBQ25GLElBQUksdUJBQXVCLEVBQUU7Z0JBRXpCLDRCQUE0QjtnQkFDNUIsSUFBSSxlQUFlLEdBQUcsMkRBQTRCLENBQUMsZUFBZSxDQUFDLHVCQUF1QixFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsVUFBQyxPQUFPLElBQU8sT0FBTyxPQUFPLENBQUMsR0FBRyxLQUFLLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFckssa0NBQWtDO2dCQUNsQyxJQUFJLHVCQUF1QixHQUFHLDJEQUE0QixDQUFDLGVBQWUsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRSxVQUFDLHdCQUF3QixJQUFPLE9BQU8sd0JBQXdCLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0NBR2hNLENBQUM7b0JBQ04sSUFBTSxxQkFBcUIsR0FBRyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFekQsSUFBSSxXQUFXLEdBQUcscUJBQXFCLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztvQkFDNUQsSUFBSSxzQkFBc0IsR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDLFVBQUMsYUFBYSxJQUFPLE9BQU8sYUFBYSxDQUFDLFVBQVUsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDNUgsSUFBSSxzQkFBc0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO3dCQUNuQywwREFBMEQ7d0JBQzFELGNBQWMsQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsR0FBRyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDekU7eUJBQ0k7d0JBQ0QsT0FBTyxDQUFDLEtBQUssQ0FBQywrREFBK0QsRUFBRSxXQUFXLEVBQUUscUJBQXFCLENBQUMsQ0FBQztxQkFDdEg7O2dCQVpMLGlEQUFpRDtnQkFDakQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLHVCQUF1QixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUU7NEJBQTlDLENBQUM7aUJBWVQ7YUFDSjtZQUNELE9BQU8sY0FBYyxDQUFDO1FBQzFCLENBQUM7UUFHRDs7Ozs7Ozs7V0FRRztRQUNXLDREQUFvQixHQUFsQyxVQUFtQyxTQUFpQixFQUFFLFNBQWM7Ozs7Ozs7NEJBRWpDLHFCQUFNLHFDQUFpQixDQUFDLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsTUFBTSxFQUFFLGtDQUFjLENBQUMsV0FBVyxDQUFDLEVBQUE7OzRCQUF6SCxvQkFBb0IsR0FBRyxTQUFrRzs0QkFDekgsY0FBYyxHQUFVLElBQUksQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFVBQUMsYUFBYSxJQUFPLE9BQU8sRUFBRSxXQUFXLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNqTSxTQUFTLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQzs7Ozs0QkFFMUMsTUFBTSxPQUFLLENBQUM7Ozs7O1NBRW5CO1FBRUQ7Ozs7Ozs7OztXQVNHO1FBQ1csd0RBQWdCLEdBQTlCLFVBQStCLFNBQWlCLEVBQUUsU0FBYzs7Ozs7OzRCQUN4RCxhQUFhLEdBQUcsU0FBUyxDQUFDOzs7OzRCQUVKLHFCQUFNLHFDQUFpQixDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFBOzs0QkFBbEYsZUFBZSxHQUFHLFNBQWdFO2lDQUNsRixlQUFlLEVBQWYsd0JBQWU7NEJBQ1gsVUFBVSxHQUFHLGVBQWUsQ0FBQyxNQUFNLENBQUMsVUFBQyxjQUFjLElBQU8sT0FBYSxjQUFlLENBQUMsVUFBVSxLQUFLLFlBQVksSUFBVSxjQUFlLENBQUMsVUFBVSxLQUFLLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lDQUM3SyxDQUFBLFVBQVUsSUFBSSxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQSxFQUFuQyx3QkFBbUM7NEJBQ25CLHFCQUFNLHFDQUFpQixDQUFDLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLGtDQUFjLENBQUMsS0FBSyxDQUFDLEVBQUE7OzRCQUFoSCxhQUFhLEdBQUcsU0FBZ0csQ0FBQzs7Ozs7NEJBSXpILE1BQU0sT0FBSyxDQUFDOzs0QkFFaEIsU0FBUyxDQUFDLFVBQVUsR0FBRyxhQUFhLENBQUM7Ozs7O1NBQ3hDO1FBQ0wsb0NBQUM7SUFBRCxDQUFDLEFBL1hELElBK1hDO0lBR1Esc0VBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3BjVWFSZXN0U2VydmljZXMsIE9wY1VhQXR0cmlidXRlIH0gZnJvbSBcIi4uLy4uL2NvbW11bmljYXRpb24vcmVzdC9vcGNVYVJlc3RTZXJ2aWNlc1wiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW0sIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLCBNYXBwQ29ja3BpdENvbXBvbmVudCwgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIgfSBmcm9tIFwiLi4vb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50XCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0YURhdGEgfSBmcm9tIFwiLi4vb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50TWV0YURhdGFcIjtcclxuaW1wb3J0IHsgSW50ZXJmYWNlT3BjVWFSZXN0UmVzdWx0Tm9kZVJlZmVyZW5jZSB9IGZyb20gXCIuLi8uLi9jb21tdW5pY2F0aW9uL3Jlc3Qvb3BjVWFSZXN0UmVzdWx0VHlwZXNcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJJbmZvLCBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm8gfSBmcm9tIFwiLi4vb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50UmVmbGVjdGlvblwiO1xyXG5cclxuXHJcbmNsYXNzIE1hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyIHtcclxuXHJcbiAgICAvLyBob2xkcyB0aGUgY3VycmVudGx5IGFjaXZlIHNlc3Npb24gaWRcclxuICAgIHByaXZhdGUgX3Nlc3Npb25JZDogbnVtYmVyID0gLTE7XHJcbiAgICAvLyBob2xkcyB0aGUgbWFwcCBjb2NrcGl0IG5tZXNwYWNlIGluZGV4XHJcbiAgICBwcml2YXRlIF9uYW1lc3BhY2VJbmRleDogbnVtYmVyID0gLTE7XHJcblxyXG4gICAgLy8gaG9sZHMgZW51bSB0eXBlIGRlZmluaXRpb25zXHJcbiAgICBwcml2YXRlIF9lbnVtVHlwZURlZmluaXRpb25zOiBhbnlbXSA9IFtdO1xyXG5cclxuICAgIC8vIGhvbGRzIGFuIGluc3RhbmNlIG9mIHRoaXMgY2xhc3NcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogTWFwcENvY2twaXRDb21tb25JbmZvUHJvdmlkZXI7XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgTWFwcENvY2twaXRDb21tb25JbmZvUHJvdmlkZXIuXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21tb25JbmZvUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0cyBhIHNpbmdsZXRvbiBpbnN0YW5jZSBvZiBNYXBwQ29ja3BpdENvbW1vbkluZm9Qcm92aWRlclxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge01hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogTWFwcENvY2twaXRDb21tb25JbmZvUHJvdmlkZXIge1xyXG5cclxuICAgICAgICB0aGlzLl9pbnN0YW5jZSA9IHRoaXMuX2luc3RhbmNlID8gdGhpcy5faW5zdGFuY2UgOiBuZXcgTWFwcENvY2twaXRDb21tb25JbmZvUHJvdmlkZXIoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIGluaXRpYWxpemVzIHRoZSBpbmZvIHByb3ZpZGVyIGFuZCBwb3B1bGF0ZXMgaXQgd2l0aCBjb21tb25seSBuZWVkZWQgZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzZXNzaW9uSWRcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBuYW1lc3BhY2VJbmRleFxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21tb25JbmZvUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgYXN5bmMgaW5pdGlhbGl6ZShzZXNzaW9uSWQ6IG51bWJlciwgbmFtZXNwYWNlSW5kZXg6IG51bWJlcik6IFByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgIHRoaXMuX3Nlc3Npb25JZCA9IHNlc3Npb25JZDtcclxuICAgICAgICB0aGlzLl9uYW1lc3BhY2VJbmRleCA9IG5hbWVzcGFjZUluZGV4O1xyXG5cclxuXHJcbiAgICAgICAgLy8gYnJvd3NlIGF2YWlsYWJsZSBlbnVtIHR5cGUgZGVmaW5pdGlvbnNcclxuICAgICAgICBhd2FpdCB0aGlzLnJlYWRFbnVtVHlwZURlZmluaXRpb25zKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJNYXBwQ29ja3BpdENvbW1vbkluZm9Qcm92aWRlci5yZWFkRW51bVR5cGVEZWZpbml0aW9ucyAlb1wiLCB0aGlzLl9lbnVtVHlwZURlZmluaXRpb25zKTtcclxuXHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBhc3luYyByZWFkQ29tcG9uZW50TWV0YUluZm8oY29tcG9uZW50OiBNYXBwQ29ja3BpdENvbXBvbmVudCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCBjb21wb25lbnRNZXRhUmVmZXJlbmNlcyA9IGF3YWl0IE9wY1VhUmVzdFNlcnZpY2VzLmJyb3dzZU5vZGVNZXRhSW5mbyh0aGlzLl9zZXNzaW9uSWQsIGNvbXBvbmVudC5pZCk7XHJcbiAgICAgICAgICAgIGlmIChjb21wb25lbnRNZXRhUmVmZXJlbmNlcyApIHtcclxuICAgICAgICAgICAgICAgIGNvbXBvbmVudC5tZXRhRGF0YSA9IHRoaXMucGFyc2VDb21wb25lbnRNZXRhRGF0YShjb21wb25lbnRNZXRhUmVmZXJlbmNlcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQYXJzZXMgdGhlIGNvbXBvbmVudHMgbWV0YSBkYXRhXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SW50ZXJmYWNlT3BjVWFSZXN0UmVzdWx0Tm9kZVJlZmVyZW5jZVtdfSBtZXRhSW5mb1JlZmVyZW5jZXNcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21tb25JbmZvUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBwYXJzZUNvbXBvbmVudE1ldGFEYXRhKG1ldGFJbmZvUmVmZXJlbmNlczogSW50ZXJmYWNlT3BjVWFSZXN0UmVzdWx0Tm9kZVJlZmVyZW5jZVtdKSB7XHJcbiAgICAgICAgbGV0IG1ldGFEYXRhID0ge307XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIG1ldGFJbmZvUmVmZXJlbmNlcy5mb3JFYWNoKChtZXRhSW5mb1JlZmVyZW5jZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBtZXRhRGF0YVttZXRhSW5mb1JlZmVyZW5jZS5icm93c2VOYW1lXSA9IEpTT04ucGFyc2UobWV0YUluZm9SZWZlcmVuY2UudmFsdWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWwuYnJvd3NlTWV0YURhdGE6IGNvdWxkIG5vdCBwYXJzZSBtZXRhIGRhdGE6IFwiICsgZS5tZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1ldGFEYXRhO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemVzIHRoZSBtZXRhIGRhdCB3aXRoIHNwZWNpZmljIHNlY3Rpb25zXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudE1ldGFEYXRhfSBtZXRhRGF0YVxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21tb25JbmZvUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGluaXRpYWxpemVNZXRhRGF0YShtZXRhRGF0YTogTWFwcENvY2twaXRDb21wb25lbnRNZXRhRGF0YSk6IGFueSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gY3JlYXRlIGFuZCBwb3B1bGF0ZSB0aGUgcGFyYW1ldGVycyBncm91cFxyXG4gICAgICAgIG1ldGFEYXRhW1wiUGFyYW1ldGVyc1wiXSA9IHt9O1xyXG4gICAgICAgIG1ldGFEYXRhW1wiUGFyYW1ldGVyc1wiXVtcIldhdGNoYWJsZVwiXSA9IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mby5yZWFkV2F0Y2hhYmxlUGFyYW1ldGVycyhtZXRhRGF0YSk7XHJcbiAgICAgICAgbWV0YURhdGFbXCJQYXJhbWV0ZXJzXCJdW1wiTWVzc2FnZVwiXSA9IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVySW5mby5yZWFkTWVzc2FnZVBhcmFtZXRlcnMobWV0YURhdGEpO1xyXG4gICAgICAgIG1ldGFEYXRhW1wiUGFyYW1ldGVyc1wiXVtcIkNvbmZpZ3VyYXRpb25cIl0gPSBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm8ucmVhZENvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzKG1ldGFEYXRhKTtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIGFuZCBwb3B1bGF0ZSB0aGUgbWV0aG9kcyBncm91cFxyXG4gICAgICAgIG1ldGFEYXRhW1wiTWV0aG9kc1wiXSA9IHt9O1xyXG4gICAgICAgIG1ldGFEYXRhW1wiTWV0aG9kc1wiXVtcIkV4ZWN1dGFibGVcIl0gPSBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm8ucmVhZEV4ZWN1dGFibGVNZXRob2RzKG1ldGFEYXRhKTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0cyB0aGUgYXZhaWxhYmxlIGVudW0gdHlwZSBkZWZpbml0aW9uc1xyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge0FycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bT59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21tb25JbmZvUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBlbnVtVHlwZURlZmluaXRpb25zKCk6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9lbnVtVHlwZURlZmluaXRpb25zO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlYWRzIGFuZCB1cGRhdGVzIGVudW0gdHlwZSBkZWZpbml0aW9uc1xyXG4gICAgICogXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgcmVhZEVudW1UeXBlRGVmaW5pdGlvbnMoKSB7XHJcbiAgICAgICAgdGhpcy5fZW51bVR5cGVEZWZpbml0aW9ucyA9IGF3YWl0IHRoaXMuYnJvd3NlRW51bVR5cGVEZWZpbml0aW9ucyh0aGlzLl9zZXNzaW9uSWQsIHRoaXMuX25hbWVzcGFjZUluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlYWRzIGVudW0gZGVmaW5pdGlvbnMgXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21tb25JbmZvUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBicm93c2VFbnVtVHlwZURlZmluaXRpb25zKHNlc3Npb25JZDogbnVtYmVyLCBuYW1lc3BhY2VJbmRleCkge1xyXG4gICAgICAgIGxldCBlbnVtczogYW55W10gPSBbXTtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gZ2V0IGFsbCBhdmFpbGFibGUgZW51bSBub2Rlc1xyXG4gICAgICAgICAgICBsZXQgYWxsT3BjVWFFbnVtcyA9IGF3YWl0IE9wY1VhUmVzdFNlcnZpY2VzLmJyb3dzZU5vZGVzKHNlc3Npb25JZCwgT3BjVWFSZXN0U2VydmljZXMubWFwcENvY2twaXRFbnVtc0lkKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHJldHJpZXZlIGVudW1zIG9mIG1hcHAgQ29ja3BpdCBuYW1lc3BhY2Ugb25seVxyXG4gICAgICAgICAgICBsZXQgb3BjVWFFbnVtcyA9IGFsbE9wY1VhRW51bXMuZmlsdGVyKChvcGNVYUVudW0pID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvcGNVYUVudW0ubm9kZUlkLmluZGV4T2YoT3BjVWFSZXN0U2VydmljZXMubWFwcENvY2twaXROYW1lc3BhY2VQcmVmaXggKyBuYW1lc3BhY2VJbmRleCkgPiAtMTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgcmVhZEVudWREZWZpbml0aW9uc1JlcXVlc3RzIDpQcm9taXNlPGFueT5bXSA9IFtdO1xyXG4gICAgICAgICAgICAvLyBjb2xsZWN0IGVudW0gZGVmIHJlYWQgcmVxdWVzdHNcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcGNVYUVudW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvcGNVYUVudW06IGFueSA9IG9wY1VhRW51bXNbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gcmVhZCB0aGUgZW51bSB2YWx1ZXMgYXMganNvblxyXG4gICAgICAgICAgICAgICAgcmVhZEVudWREZWZpbml0aW9uc1JlcXVlc3RzLnB1c2godGhpcy5icm93c2VFbnVtVmFsdWVzSnNvbihzZXNzaW9uSWQsIG9wY1VhRW51bSkpO1xyXG4gICAgICAgICAgICAgICAgLy8gcmVhZCB0aGUgZW51bSB2YWx1ZXMgYXMgbW9kZWwgcmVmZXJlbmNlXHJcbiAgICAgICAgICAgICAgICByZWFkRW51ZERlZmluaXRpb25zUmVxdWVzdHMucHVzaCh0aGlzLmJyb3dzZUVudW1WYWx1ZXMoc2Vzc2lvbklkLCBvcGNVYUVudW0pKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwocmVhZEVudWREZWZpbml0aW9uc1JlcXVlc3RzKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgZW51bXMgPSBvcGNVYUVudW1zLm1hcCgob3BjVWFFbnVtc1JlZikgPT4geyByZXR1cm4gbmV3IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bShvcGNVYUVudW1zUmVmKSB9KTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBlbnVtcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlYWRzIGVudW0gZGVmaW5pdGlvbnMgZm9yIHBhcmFtZXRlcnNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IG1ldGFJbmZvXHJcbiAgICAgKiBAcmV0dXJucyBhbiBvYmplY3Qgd2l0aCBlbnVtIGRlZmluaXRpb25zIHdpdGggdGhlIHBhcmFtZXRlciBuYW1lIGFzIGtleVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHJlYWRFbnVtUGFyYW1ldGVyRGVmaW5pdGlvbnMoY29tcG9uZW50UGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSwgbWV0YUluZm86IGFueSkge1xyXG4gICAgICAgIGxldCBlbnVtUGFyYW1ldGVycyA9IHt9O1xyXG4gICAgICAgIC8vIGdldCB0aGUgdGFyZ2V0IG1vZGVsIGVudW0gdHlwZXNcclxuICAgICAgICBsZXQgb3BjVWFFbnVtVHlwZXMgPSBNYXBwQ29ja3BpdENvbW1vbkluZm9Qcm92aWRlci5nZXRJbnN0YW5jZSgpLmVudW1UeXBlRGVmaW5pdGlvbnM7XHJcbiAgICAgICAgLy8gZ2V0IHRoZSBtZXRhIHBhcmFtZXRlciBpbmZvc1xyXG4gICAgICAgIGxldCBtZXRhUGFyYW1ldGVySW5mbyA9IE1hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyLnJlYWRFbnVtTWV0YUluZm8obWV0YUluZm8pO1xyXG4gICAgICAgIGlmIChtZXRhUGFyYW1ldGVySW5mbyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgLy8gZ2V0IHBvc3NpYmxlIGVudW0gdHlwZSBtZXRhIGl0ZW1zXHJcbiAgICAgICAgICAgIGVudW1QYXJhbWV0ZXJzID0gdGhpcy5yZWFkRW51bURlZmluaXRpb25zRnJvbU1ldGFJbmZvKG1ldGFQYXJhbWV0ZXJJbmZvLCBvcGNVYUVudW1UeXBlcyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gd2l0aG91dCBtZXRhIGluZm8gd2UgdHJ5IHRvIHVzZSB0aGUgdGFyZ2V0IG1vZGVsIGRlZmluaXRpb25zLlxyXG4gICAgICAgICAgICBlbnVtUGFyYW1ldGVycyA9IHRoaXMucmVhZEVudW1EZWZpbml0aW9uRnJvbVRhcmdldE1vZGVsKGNvbXBvbmVudFBhcmFtZXRlcnMsIG9wY1VhRW51bVR5cGVzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGVudW1QYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZHMgdGhlIGVudW0gcGFyYW1ldGVyIG1ldGEgaW5mb1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IG1ldGFJbmZvXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyByZWFkRW51bU1ldGFJbmZvKG1ldGFJbmZvOiBhbnkpIHtcclxuICAgICAgICBsZXQgbWV0YVBhcmFtZXRlckluZm87XHJcbiAgICAgICAgaWYgKG1ldGFJbmZvKSB7XHJcbiAgICAgICAgICAgIC8vIElmIG5vIE1ldGFDb25maWdDb25maWdQcm9wcyBhcmUgYXZhaWxhYmxlIG9ubHkgdXNlIHdhdGNoYWJsZXNcclxuICAgICAgICAgICAgaWYgKG1ldGFJbmZvLk1ldGFDb25maWdDb25maWdQcm9wcyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIG1ldGFQYXJhbWV0ZXJJbmZvID0gbWV0YUluZm8uTWV0YUNvbmZpZ0NvbmZpZ1Byb3BzLkNvbmZpZ3VyYXRpb25TdHJ1Y3R1cmUuQ2hpbGRzO1xyXG4gICAgICAgICAgICAgICAgbWV0YVBhcmFtZXRlckluZm8gPSBtZXRhUGFyYW1ldGVySW5mby5jb25jYXQobWV0YUluZm8uTWV0YUNvbmZpZ1dhdGNoYWJsZXMuV2F0Y2hhYmxlc1N0cnVjdHVyZS5DaGlsZHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKG1ldGFJbmZvLk1ldGFDb25maWdXYXRjaGFibGVzICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1ldGFQYXJhbWV0ZXJJbmZvID0gbWV0YUluZm8uTWV0YUNvbmZpZ1dhdGNoYWJsZXMuV2F0Y2hhYmxlc1N0cnVjdHVyZS5DaGlsZHM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBtZXRhUGFyYW1ldGVySW5mbztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWRzIHRoZSBhdmFpbGFibGUgZW51bSB0eXBlIGRlZmluaXRpb25zIGZyb20gdGhlIG1ldGEgaW5mb1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IG1ldGFQYXJhbWV0ZXJJbmZvXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyRW51bVtdfSBvcGNVYUVudW1UeXBlc1xyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21tb25JbmZvUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWFkRW51bURlZmluaXRpb25zRnJvbU1ldGFJbmZvKG1ldGFQYXJhbWV0ZXJJbmZvOiBhbnksIG9wY1VhRW51bVR5cGVzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW1bXSk6IGFueSB7XHJcbiAgICAgICAgbGV0IGVudW1QYXJhbWV0ZXJzID0ge307XHJcbiAgICAgICAgbGV0IG1ldGFQYXJhbWV0ZXJVc2luZ0VudW1zID0gTWFwcENvY2twaXRDb21tb25JbmZvUHJvdmlkZXIucmVhZEVudW1NZXRhRGVmaW5pdGlvbnMobWV0YVBhcmFtZXRlckluZm8pO1xyXG4gICAgICAgIG1ldGFQYXJhbWV0ZXJVc2luZ0VudW1zLmZvckVhY2goKGVudW1QYXJhbWV0ZXJNZXRhSXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZW51bVR5cGVSZWYgPSBlbnVtUGFyYW1ldGVyTWV0YUl0ZW0uVHlwZURlZi5FbnVtVHlwZVJlZjtcclxuICAgICAgICAgICAgbGV0IG1hdGNoaW5nT3BjVWFFbnVtVHlwZXMgPSBvcGNVYUVudW1UeXBlcy5maWx0ZXIoKG9wY1VhRW51bVR5cGUpID0+IHsgcmV0dXJuIG9wY1VhRW51bVR5cGUuYnJvd3NlTmFtZSA9PT0gZW51bVR5cGVSZWY7IH0pO1xyXG4gICAgICAgICAgICBpZiAobWF0Y2hpbmdPcGNVYUVudW1UeXBlcy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIC8vIHNhdmUgdGhlIG1hdGNoaW5nIGVudW0gdHlwZSBpbmZvIGZvciB0aGUgcGFyYW1ldGVyIG5hbWVcclxuICAgICAgICAgICAgICAgIGVudW1QYXJhbWV0ZXJzW2VudW1QYXJhbWV0ZXJNZXRhSXRlbS5SZWZdID0gbWF0Y2hpbmdPcGNVYUVudW1UeXBlc1swXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckluZm8gLSBObyBlbnVtIHR5cGUgZm91bmQgZm9yICVvICVvXCIsIGVudW1UeXBlUmVmLCBlbnVtUGFyYW1ldGVyTWV0YUl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGVudW1QYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZHMgdGhlIGVudW0gZGVmaW5pdGlvbnMgY29udGFpbmVkIGluIHRoZSBtZXRhIGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0geyp9IG1ldGFQYXJhbWV0ZXJJbmZvXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyByZWFkRW51bU1ldGFEZWZpbml0aW9ucyhtZXRhUGFyYW1ldGVySW5mbzogYW55KSB7XHJcbiAgICAgICAgbGV0IHR5cGVEZWZpbml0aW9ucyA9ICBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGFEYXRhLmZpbHRlck1ldGFJdGVtcyhtZXRhUGFyYW1ldGVySW5mbywgW1wiUGFyYW1ldGVyXCIsIFwiV2F0Y2hhYmxlXCIsIFwiR3JvdXBcIl0sIChtZXRhSXRlbUdyb3VwT3JQYXJhbWV0ZXIpID0+IHsgcmV0dXJuIG1ldGFJdGVtR3JvdXBPclBhcmFtZXRlci5oYXNPd25Qcm9wZXJ0eShcIlR5cGVEZWZcIik7IH0pO1xyXG4gICAgICAgIGxldCBlbnVtVHlwZURlZmluaXRpb25zID0gdHlwZURlZmluaXRpb25zLmZpbHRlcigodHlwZURlZmluaXRpb24pPT4ge3JldHVybiB0eXBlRGVmaW5pdGlvbi5UeXBlRGVmLmhhc093blByb3BlcnR5KFwiRW51bVR5cGVSZWZcIil9KTtcclxuICAgICAgICByZXR1cm4gZW51bVR5cGVEZWZpbml0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlYWRzIHRoZSBhdmFpbGFibGUgZW51bSB0eXBlIGRlZmludGlvbnMgZnJvbSB0aGUgdGFyZ2V0IG1vZGVsXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gY29tcG9uZW50UGFyYW1ldGVyc1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW1bXX0gb3BjVWFFbnVtVHlwZXNcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVhZEVudW1EZWZpbml0aW9uRnJvbVRhcmdldE1vZGVsKGNvbXBvbmVudFBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10sIG9wY1VhRW51bVR5cGVzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlckVudW1bXSk6IGFueSB7XHJcbiAgICAgICAgbGV0IGVudW1QYXJhbWV0ZXJzID0ge307XHJcbiAgICAgICAgY29tcG9uZW50UGFyYW1ldGVycy5mb3JFYWNoKChjb21wb25lbnRQYXJhbWV0ZXIpID0+IHtcclxuICAgICAgICAgICAgbGV0IG1hdGNoaW5nT3BjVWFFbnVtVHlwZXMgPSBvcGNVYUVudW1UeXBlcy5maWx0ZXIoKG9wY1VhRW51bVR5cGUpID0+IHsgcmV0dXJuIG9wY1VhRW51bVR5cGUuYnJvd3NlTmFtZSA9PT0gY29tcG9uZW50UGFyYW1ldGVyLmRhdGFUeXBlLm5hbWU7IH0pO1xyXG4gICAgICAgICAgICBpZiAobWF0Y2hpbmdPcGNVYUVudW1UeXBlcy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIGVudW1QYXJhbWV0ZXJzW2NvbXBvbmVudFBhcmFtZXRlci5icm93c2VOYW1lXSA9IG1hdGNoaW5nT3BjVWFFbnVtVHlwZXNbMF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZW51bVBhcmFtZXRlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFxyXG4gICAgICogcmVhZHMgZW51bSB0eXBlIGRlZmluaXRpb25zIGZvciBtZXRob2QgcGFyYW1ldGVyc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRNZXRob2R9IG1ldGhvZFxyXG4gICAgICogQHBhcmFtIHsqfSBtZXRhSW5mb1xyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdENvbW1vbkluZm9Qcm92aWRlclxyXG4gICAgICovXHJcbiAgICByZWFkTWV0YUVudW1NZXRob2RQYXJhbWV0ZXJEZWZpbml0aW9ucyhtZXRob2Q6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLCBtZXRhSW5mbzogYW55KSB7XHJcbiAgICAgICAgbGV0IGVudW1QYXJhbWV0ZXJzID0ge307XHJcblxyXG4gICAgICAgIGxldCBvcGNVYUVudW1UeXBlcyA9IE1hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyLmdldEluc3RhbmNlKCkuZW51bVR5cGVEZWZpbml0aW9ucztcclxuXHJcbiAgICAgICAgaWYgKG1ldGFJbmZvID09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgcmV0dXJuIGVudW1QYXJhbWV0ZXJzO1xyXG5cclxuICAgICAgICAvLyBnZXQgdGhlIG1ldGEgcGFyYW1ldGVyIGluZm9zXHJcbiAgICAgICAgaWYgKG1ldGFJbmZvLk1ldGFDb25maWdDb21tYW5kcyA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHJldHVybiBlbnVtUGFyYW1ldGVycztcclxuXHJcbiAgICAgICAgbGV0IG1ldGFNZXRob2RQYXJhbWV0ZXJJbmZvID0gbWV0YUluZm8uTWV0YUNvbmZpZ0NvbW1hbmRzLkNvbW1hbmRzU3RydWN0dXJlLkNoaWxkcztcclxuICAgICAgICBpZiAobWV0YU1ldGhvZFBhcmFtZXRlckluZm8pIHtcclxuXHJcbiAgICAgICAgICAgIC8vIGdldCB0aGUgY29tbWFuZCBtZXRhIGluZm9cclxuICAgICAgICAgICAgbGV0IG1ldGFDb21tYW5kSW5mbyA9IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0YURhdGEuZmlsdGVyTWV0YUl0ZW1zKG1ldGFNZXRob2RQYXJhbWV0ZXJJbmZvLCBbXCJDb21tYW5kXCJdLCAoY29tbWFuZCkgPT4geyByZXR1cm4gY29tbWFuZC5SZWYgPT09IG1ldGhvZC5icm93c2VOYW1lOyB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIGdldCB0aGUgY29tbWFuZHMgcGFyYW1ldGVyIGluZm9cclxuICAgICAgICAgICAgbGV0IG1ldGFQYXJhbWV0ZXJVc2luZ0VudW1zID0gTWFwcENvY2twaXRDb21wb25lbnRNZXRhRGF0YS5maWx0ZXJNZXRhSXRlbXMobWV0YUNvbW1hbmRJbmZvLCBbXCJQYXJhbWV0ZXJcIl0sIChtZXRhSXRlbUdyb3VwT3JQYXJhbWV0ZXIpID0+IHsgcmV0dXJuIG1ldGFJdGVtR3JvdXBPclBhcmFtZXRlci5oYXNPd25Qcm9wZXJ0eShcIlR5cGVEZWZcIik7IH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gZmluZCBhbmQgY29sbGVjdCBtYXRjaGluZyBvcGN1YSBlbnVtIHR5cGUgcmVmc1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1ldGFQYXJhbWV0ZXJVc2luZ0VudW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbnVtUGFyYW1ldGVyTWV0YUl0ZW0gPSBtZXRhUGFyYW1ldGVyVXNpbmdFbnVtc1tpXTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZW51bVR5cGVSZWYgPSBlbnVtUGFyYW1ldGVyTWV0YUl0ZW0uVHlwZURlZi5FbnVtVHlwZVJlZjtcclxuICAgICAgICAgICAgICAgIGxldCBtYXRjaGluZ09wY1VhRW51bVR5cGVzID0gb3BjVWFFbnVtVHlwZXMuZmlsdGVyKChvcGNVYUVudW1UeXBlKSA9PiB7IHJldHVybiBvcGNVYUVudW1UeXBlLmJyb3dzZU5hbWUgPT09IGVudW1UeXBlUmVmOyB9KTtcclxuICAgICAgICAgICAgICAgIGlmIChtYXRjaGluZ09wY1VhRW51bVR5cGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBzYXZlIHRoZSBtYXRjaGluZyBlbnVtIHR5cGUgaW5mbyBmb3IgdGhlIHBhcmFtZXRlciBuYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgZW51bVBhcmFtZXRlcnNbZW51bVBhcmFtZXRlck1ldGFJdGVtLlJlZl0gPSBtYXRjaGluZ09wY1VhRW51bVR5cGVzWzBdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIk1hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVySW5mbyAtIE5vIGVudW0gdHlwZSBmb3VuZCBmb3IgJW8gJW9cIiwgZW51bVR5cGVSZWYsIGVudW1QYXJhbWV0ZXJNZXRhSXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGVudW1QYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIGJyb3dzZXMgdGhlIGVudW0gdmFsdWVzIGEgc2pzb24gKGZvciBvbGRlciB0YXJnZXRzKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2Vzc2lvbklkXHJcbiAgICAgKiBAcGFyYW0geyp9IG9wY1VhRW51bVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgYnJvd3NlRW51bVZhbHVlc0pzb24oc2Vzc2lvbklkOiBudW1iZXIsIG9wY1VhRW51bTogYW55KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbGV0IGVudW1WYWx1ZXNKc29uU3RyaW5nID0gYXdhaXQgT3BjVWFSZXN0U2VydmljZXMucmVhZE5vZGVBdHRyaWJ1dGUoc2Vzc2lvbklkLCBvcGNVYUVudW0ubm9kZUlkLCBPcGNVYUF0dHJpYnV0ZS5ERVNDUklQVElPTik7XHJcbiAgICAgICAgICAgIGxldCBlbnVtVmFsdWVzSnNvbjogYW55W10gPSBKU09OLnBhcnNlKGVudW1WYWx1ZXNKc29uU3RyaW5nKS5lbnVtVmFsdWVzLm1hcCgoZW51bVZhbHVlSXRlbSkgPT4geyByZXR1cm4geyBkaXNwbGF5TmFtZTogeyBsb2NhbGU6IFwiXCIsIHRleHQ6IGVudW1WYWx1ZUl0ZW0udGV4dCB9LCB2YWx1ZTogZW51bVZhbHVlSXRlbS52YWx1ZSB9IH0pO1xyXG4gICAgICAgICAgICBvcGNVYUVudW0uZW51bVZhbHVlc0pzb24gPSBlbnVtVmFsdWVzSnNvbjtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBicm93c2VzIHRoZSBvcGMgdWEgZW51bSBub2RlIGZvciBpdHMgdmFsdWUgZGVmaW5pdGlvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNlc3Npb25JZFxyXG4gICAgICogQHBhcmFtIHsqfSBvcGNVYUVudW1cclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRDb21tb25JbmZvUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBicm93c2VFbnVtVmFsdWVzKHNlc3Npb25JZDogbnVtYmVyLCBvcGNVYUVudW06IGFueSkge1xyXG4gICAgICAgIGxldCBlbnVtVmFsdWVzUmVmID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCBlbnVtVmFsdWVzTm9kZXMgPSBhd2FpdCBPcGNVYVJlc3RTZXJ2aWNlcy5icm93c2VOb2RlcyhzZXNzaW9uSWQsIG9wY1VhRW51bS5ub2RlSWQpO1xyXG4gICAgICAgICAgICBpZiAoZW51bVZhbHVlc05vZGVzKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZW51bVZhbHVlcyA9IGVudW1WYWx1ZXNOb2Rlcy5maWx0ZXIoKGVudW1WYWx1ZXNOb2RlKSA9PiB7IHJldHVybiAoPGFueT5lbnVtVmFsdWVzTm9kZSkuYnJvd3NlTmFtZSA9PT0gXCJFbnVtVmFsdWVzXCIgfHwgKDxhbnk+ZW51bVZhbHVlc05vZGUpLmJyb3dzZU5hbWUgPT09IFwiRW51bVN0cmluZ3NcIjsgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZW51bVZhbHVlcyAmJiBlbnVtVmFsdWVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBlbnVtVmFsdWVzUmVmID0gYXdhaXQgT3BjVWFSZXN0U2VydmljZXMucmVhZE5vZGVBdHRyaWJ1dGUoc2Vzc2lvbklkLCBlbnVtVmFsdWVzWzBdLm5vZGVJZCwgT3BjVWFBdHRyaWJ1dGUuVkFMVUUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG9wY1VhRW51bS5lbnVtVmFsdWVzID0gZW51bVZhbHVlc1JlZjtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCB7IE1hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyIH0iXX0=