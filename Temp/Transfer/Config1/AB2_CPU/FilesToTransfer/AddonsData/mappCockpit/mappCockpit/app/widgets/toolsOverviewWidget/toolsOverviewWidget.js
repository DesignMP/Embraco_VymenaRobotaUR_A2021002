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
define(["require", "exports", "../common/overviewTreeGridWidgetBase", "../../framework/events", "../../framework/property", "../../models/online/mappCockpitComponent", "../../common/fileProvider", "../../common/directoryProvider", "../common/themeProvider"], function (require, exports, overviewTreeGridWidgetBase_1, events_1, property_1, mappCockpitComponent_1, fileProvider_1, directoryProvider_1, themeProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventOpenView = /** @class */ (function (_super) {
        __extends(EventOpenView, _super);
        function EventOpenView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventOpenView;
    }(events_1.TypedEvent));
    ;
    /**
     * implements the ToolsOverviewWidget
     *
     * @class ToolsOverviewWidget
     * @extends {OverviewTreeGridWidgetBase}
     * @implements {IToolsOverviewWidget}
     */
    var ToolsOverviewWidget = /** @class */ (function (_super) {
        __extends(ToolsOverviewWidget, _super);
        function ToolsOverviewWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.eventOpenView = new EventOpenView();
            _this._components = property_1.Property.create([]);
            _this._networkCommandTraceToolName = "Motion: Network Command Trace";
            _this._networkCommandTraceExportCommandName = "Export";
            _this._imageDirectory = "../../../" + directoryProvider_1.DirectoryProvider.getWidgetsDirectory() + "toolsOverviewWidget/style/images/";
            return _this;
        }
        ToolsOverviewWidget.prototype.getHeaderText = function () {
            return "Tools Overview";
        };
        Object.defineProperty(ToolsOverviewWidget.prototype, "components", {
            set: function (components) {
                var _this = this;
                this._components = components;
                this._mcAcpDrvComponent = this._components.value.filter(function (component) { return component.browseName == "McAcpDrv"; })[0];
                if (this._mcAcpDrvComponent == undefined) {
                    return;
                }
                this._mcAcpDrvComponent.commandConnectComponent.execute(null, function (result) {
                    var methods = _this._mcAcpDrvComponent.methods;
                    if (methods.length > 0) {
                        _this.onComponentMethodsUpdated(methods);
                    }
                });
            },
            enumerable: true,
            configurable: true
        });
        /**
         * The component methods have been updated.....
         *
         * @param {*} componentMethods
         * @returns {*}
         * @memberof ToolsOverviewWidget
         */
        ToolsOverviewWidget.prototype.onComponentMethodsUpdated = function (componentMethods) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this._createNwCmdTraceSnapshotMethod = componentMethods.filter(function (method) { return method.browseName == "CreateNwCmdTraceSnapshot"; })[0];
                            this._getNwCmdTraceData = componentMethods.filter(function (method) { return method.browseName == "GetNwCmdTraceData"; })[0];
                            if (!(this._getNwCmdTraceData != undefined)) return [3 /*break*/, 2];
                            // update the methods input parameters
                            return [4 /*yield*/, mappCockpitComponent_1.MappCockpitComponentMethod.updateInputParameters(this._getNwCmdTraceData)];
                        case 1:
                            // update the methods input parameters
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        ToolsOverviewWidget.prototype.activate = function () {
            this.updateToolsOverviewData();
        };
        ToolsOverviewWidget.prototype.updateToolsOverviewData = function () {
            var dataSource = new Array();
            // TODO: get tools from a tools provider
            var networkCommandTraceTool = { displayName: this._networkCommandTraceToolName };
            dataSource.push(networkCommandTraceTool);
            $(this.cssParentContentId).ejTreeGrid({
                dataSource: dataSource,
            });
        };
        ToolsOverviewWidget.prototype.getTreeGridColumnDefinition = function () {
            return {
                columns: [
                    { field: "displayName", headerText: ToolsOverviewWidget.columnName, width: "350" },
                    { field: "commandButtons", headerText: ToolsOverviewWidget.columnExecuteCommand },
                ],
            };
        };
        ToolsOverviewWidget.prototype.getCommandIdsFromItem = function (item) {
            // TODO get available commands from tools (this.dataModel.dataSource.tools) or some other datasource
            var availableViews = new Array();
            availableViews.push(this._networkCommandTraceExportCommandName);
            return availableViews;
        };
        ToolsOverviewWidget.prototype.getNameForCommandId = function (commandId) {
            if (commandId == this._networkCommandTraceExportCommandName) {
                return this._networkCommandTraceExportCommandName;
            }
            return "";
        };
        ToolsOverviewWidget.prototype.getIconForCommandId = function (commandId) {
            if (commandId == this._networkCommandTraceExportCommandName) {
                return themeProvider_1.ThemeProvider.getInstance().getThemedFilePath(this._imageDirectory + "export.svg");
            }
            return "";
        };
        ToolsOverviewWidget.prototype.click = function (item, commandId) {
            this.onExecuteToolCommand(item.displayName, commandId);
        };
        ToolsOverviewWidget.prototype.doubleClick = function (args) {
            if (args.columnName == ToolsOverviewWidget.columnName && args.model.selectedItem != undefined) {
                var defaultToolCommand = this._networkCommandTraceExportCommandName; // TODO get default command from tool (this.dataModel.dataSource.tools) or some other datasource
                this.onExecuteToolCommand(args.model.selectedItem.displayName, defaultToolCommand);
            }
        };
        ToolsOverviewWidget.prototype.onExecuteToolCommand = function (toolName, command) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.info("Command '" + command + "' from tool '" + toolName + "' executed!");
                            if (!(toolName == this._networkCommandTraceToolName)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.executeNetworkCommandTraceCommand(command)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        ToolsOverviewWidget.prototype.executeNetworkCommandTraceCommand = function (command) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(command == this._networkCommandTraceExportCommandName)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.exportNetworkCommandtrace()];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        ToolsOverviewWidget.prototype.exportNetworkCommandtrace = function () {
            return __awaiter(this, void 0, void 0, function () {
                var dataAvailable, ref;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(this._createNwCmdTraceSnapshotMethod != undefined && this._getNwCmdTraceData != undefined)) return [3 /*break*/, 5];
                            // create network command trace snapshot on target
                            return [4 /*yield*/, mappCockpitComponent_1.MappCockpitComponentMethod.execute(this._createNwCmdTraceSnapshotMethod)];
                        case 1:
                            // create network command trace snapshot on target
                            _a.sent();
                            return [4 /*yield*/, this.dataAvailable()];
                        case 2:
                            dataAvailable = _a.sent();
                            if (!dataAvailable) return [3 /*break*/, 4];
                            ref = { data: new Blob() };
                            return [4 /*yield*/, this.createNetworkCommandTraceData(ref)];
                        case 3:
                            _a.sent();
                            // download network command trace snapshot
                            fileProvider_1.FileProvider.downloadData("NwctSnapshot.bin", ref.data);
                            return [3 /*break*/, 5];
                        case 4:
                            console.error("No network command trace data available!");
                            _a.label = 5;
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        ToolsOverviewWidget.prototype.dataAvailable = function () {
            return __awaiter(this, void 0, void 0, function () {
                var i, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this._getNwCmdTraceData._inputParameters[0].value = 0;
                            this._getNwCmdTraceData._inputParameters[1].value = 10;
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < 20)) return [3 /*break*/, 5];
                            return [4 /*yield*/, mappCockpitComponent_1.MappCockpitComponentMethod.execute(this._getNwCmdTraceData)];
                        case 2:
                            result = _a.sent();
                            if (result.args != undefined) {
                                return [2 /*return*/, true];
                            }
                            return [4 /*yield*/, this.sleep(200)];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            i++;
                            return [3 /*break*/, 1];
                        case 5: return [2 /*return*/, false];
                    }
                });
            });
        };
        ToolsOverviewWidget.prototype.createNetworkCommandTraceData = function (ref) {
            return __awaiter(this, void 0, void 0, function () {
                var startOffset, maxBytes, result, data, i, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            startOffset = 0;
                            maxBytes = 1000;
                            this._getNwCmdTraceData._inputParameters[0].value = startOffset;
                            this._getNwCmdTraceData._inputParameters[1].value = maxBytes;
                            return [4 /*yield*/, mappCockpitComponent_1.MappCockpitComponentMethod.execute(this._getNwCmdTraceData)];
                        case 1:
                            result = _a.sent();
                            data = new Int8Array(result.args.DataLeft + 1000);
                            for (i = 0; i < result.args.Data.length; i++) {
                                data[startOffset + i] = result.args.Data[i];
                            }
                            startOffset += maxBytes;
                            _a.label = 2;
                        case 2:
                            if (!(result.args.DataLeft > 0)) return [3 /*break*/, 4];
                            this._getNwCmdTraceData._inputParameters[0].value = startOffset;
                            return [4 /*yield*/, mappCockpitComponent_1.MappCockpitComponentMethod.execute(this._getNwCmdTraceData)];
                        case 3:
                            result = _a.sent();
                            for (i = 0; i < result.args.Data.length; i++) {
                                data[startOffset + i] = result.args.Data[i];
                            }
                            startOffset += maxBytes;
                            return [3 /*break*/, 2];
                        case 4:
                            ref.data = new Blob([new Uint8Array(data)]);
                            return [2 /*return*/];
                    }
                });
            });
        };
        ToolsOverviewWidget.prototype.sleep = function (ms) {
            return new Promise(function (resolve) { return setTimeout(resolve, ms); });
        };
        ToolsOverviewWidget.columnName = "Name";
        ToolsOverviewWidget.columnExecuteCommand = "Shortcuts";
        return ToolsOverviewWidget;
    }(overviewTreeGridWidgetBase_1.OverviewTreeGridWidgetBase));
    exports.ToolsOverviewWidget = ToolsOverviewWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHNPdmVydmlld1dpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy90b29sc092ZXJ2aWV3V2lkZ2V0L3Rvb2xzT3ZlcnZpZXdXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQVVBO1FBQTRCLGlDQUFtQztRQUEvRDs7UUFBaUUsQ0FBQztRQUFELG9CQUFDO0lBQUQsQ0FBQyxBQUFsRSxDQUE0QixtQkFBVSxHQUE0QjtJQUFBLENBQUM7SUFFbkU7Ozs7OztPQU1HO0lBQ0g7UUFBa0MsdUNBQTBCO1FBQTVEO1lBQUEscUVBMkxDO1lBekxHLG1CQUFhLEdBQUcsSUFBSSxhQUFhLEVBQUUsQ0FBQztZQUs1QixpQkFBVyxHQUEyQyxtQkFBUSxDQUFDLE1BQU0sQ0FBOEIsRUFBRSxDQUFDLENBQUM7WUFPdkcsa0NBQTRCLEdBQUcsK0JBQStCLENBQUM7WUFDL0QsMkNBQXFDLEdBQUcsUUFBUSxDQUFDO1lBRWpELHFCQUFlLEdBQUcsV0FBVyxHQUFHLHFDQUFpQixDQUFDLG1CQUFtQixFQUFFLEdBQUcsbUNBQW1DLENBQUM7O1FBMEsxSCxDQUFDO1FBeEthLDJDQUFhLEdBQXZCO1lBQ0ksT0FBTyxnQkFBZ0IsQ0FBQztRQUM1QixDQUFDO1FBRUQsc0JBQVcsMkNBQVU7aUJBQXJCLFVBQXNCLFVBQWtEO2dCQUF4RSxpQkFhQztnQkFaRyxJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztnQkFFOUIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLFNBQVMsSUFBSyxPQUFPLFNBQVMsQ0FBQyxVQUFVLElBQUksVUFBVSxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RILElBQUcs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QUcsV0FBVyxDQUFDOzRCQUN2RCxxQkFBTSxpREFBMEIsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEVBQUE7OzRCQUExRSxNQUFNLEdBQUcsU0FBaUUsQ0FBQzs0QkFDM0UsS0FBUSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0NBQzFDLElBQUksQ0FBQyxXQUFXLEdBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7NkJBQzdDOzRCQUNELFdBQVcsSUFBSSxRQUFRLENBQUM7Ozs0QkFFNUIsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7U0FDL0M7UUFFTyxtQ0FBSyxHQUFiLFVBQWMsRUFBVTtZQUNwQixPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxJQUFLLE9BQUEsVUFBVSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsRUFBdkIsQ0FBdUIsQ0FBQyxDQUFDO1FBQzdELENBQUM7UUF0TGEsOEJBQVUsR0FBRyxNQUFNLENBQUM7UUFDcEIsd0NBQW9CLEdBQUcsV0FBVyxDQUFDO1FBc0xyRCwwQkFBQztLQUFBLEFBM0xELENBQWtDLHVEQUEwQixHQTJMM0Q7SUFFUSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJVG9vbHNPdmVydmlld1dpZGdldCB9IGZyb20gXCIuL2ludGVyZmFjZXMvdG9vbHNPdmVydmlld1dpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBPdmVydmlld1RyZWVHcmlkV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vb3ZlcnZpZXdUcmVlR3JpZFdpZGdldEJhc2VcIjtcclxuaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvZXZlbnRzXCI7XHJcbmltcG9ydCB7IEV2ZW50T3BlblZpZXdBcmdzIH0gZnJvbSBcIi4uL2NvbW1vbi9ldmVudE9wZW5WaWV3QXJnc1wiO1xyXG5pbXBvcnQgeyBQcm9wZXJ0eSB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvcHJvcGVydHlcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnQsIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kIH0gZnJvbSBcIi4uLy4uL21vZGVscy9vbmxpbmUvbWFwcENvY2twaXRDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgRmlsZVByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9maWxlUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgRGlyZWN0b3J5UHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2RpcmVjdG9yeVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IFRoZW1lUHJvdmlkZXIgfSBmcm9tIFwiLi4vY29tbW9uL3RoZW1lUHJvdmlkZXJcIjtcclxuXHJcbmNsYXNzIEV2ZW50T3BlblZpZXcgZXh0ZW5kcyBUeXBlZEV2ZW50PG51bGwsIEV2ZW50T3BlblZpZXdBcmdzPnsgfTtcclxuXHJcbi8qKlxyXG4gKiBpbXBsZW1lbnRzIHRoZSBUb29sc092ZXJ2aWV3V2lkZ2V0XHJcbiAqXHJcbiAqIEBjbGFzcyBUb29sc092ZXJ2aWV3V2lkZ2V0XHJcbiAqIEBleHRlbmRzIHtPdmVydmlld1RyZWVHcmlkV2lkZ2V0QmFzZX1cclxuICogQGltcGxlbWVudHMge0lUb29sc092ZXJ2aWV3V2lkZ2V0fVxyXG4gKi9cclxuY2xhc3MgVG9vbHNPdmVydmlld1dpZGdldCBleHRlbmRzIE92ZXJ2aWV3VHJlZUdyaWRXaWRnZXRCYXNlIGltcGxlbWVudHMgSVRvb2xzT3ZlcnZpZXdXaWRnZXQge1xyXG5cclxuICAgIGV2ZW50T3BlblZpZXcgPSBuZXcgRXZlbnRPcGVuVmlldygpO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY29sdW1uTmFtZSA9IFwiTmFtZVwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBjb2x1bW5FeGVjdXRlQ29tbWFuZCA9IFwiU2hvcnRjdXRzXCI7XHJcblxyXG4gICAgcHJpdmF0ZSBfY29tcG9uZW50czogIFByb3BlcnR5PEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50Pj4gPSBQcm9wZXJ0eS5jcmVhdGU8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnQ+PihbXSk7XHJcblxyXG4gICAgcHJpdmF0ZSBfbWNBY3BEcnZDb21wb25lbnQhOiBNYXBwQ29ja3BpdENvbXBvbmVudDtcclxuXHJcbiAgICBwcml2YXRlIF9jcmVhdGVOd0NtZFRyYWNlU25hcHNob3RNZXRob2QhOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZDtcclxuICAgIHByaXZhdGUgX2dldE53Q21kVHJhY2VEYXRhITogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2Q7XHJcblxyXG4gICAgcHJpdmF0ZSBfbmV0d29ya0NvbW1hbmRUcmFjZVRvb2xOYW1lID0gXCJNb3Rpb246IE5ldHdvcmsgQ29tbWFuZCBUcmFjZVwiO1xyXG4gICAgcHJpdmF0ZSBfbmV0d29ya0NvbW1hbmRUcmFjZUV4cG9ydENvbW1hbmROYW1lID0gXCJFeHBvcnRcIjtcclxuXHJcbiAgICBwcml2YXRlIF9pbWFnZURpcmVjdG9yeSA9IFwiLi4vLi4vLi4vXCIgKyBEaXJlY3RvcnlQcm92aWRlci5nZXRXaWRnZXRzRGlyZWN0b3J5KCkgKyBcInRvb2xzT3ZlcnZpZXdXaWRnZXQvc3R5bGUvaW1hZ2VzL1wiO1xyXG5cclxuICAgIHByb3RlY3RlZCBnZXRIZWFkZXJUZXh0KCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gXCJUb29scyBPdmVydmlld1wiO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgY29tcG9uZW50cyhjb21wb25lbnRzIDogUHJvcGVydHk8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnQ+Pikge1xyXG4gICAgICAgIHRoaXMuX2NvbXBvbmVudHMgPSBjb21wb25lbnRzO1xyXG5cclxuICAgICAgICB0aGlzLl9tY0FjcERydkNvbXBvbmVudCA9IHRoaXMuX2NvbXBvbmVudHMudmFsdWUuZmlsdGVyKGNvbXBvbmVudCA9PiB7cmV0dXJuIGNvbXBvbmVudC5icm93c2VOYW1lID09IFwiTWNBY3BEcnZcIjt9KVswXTtcclxuICAgICAgICBpZih0aGlzLl9tY0FjcERydkNvbXBvbmVudCA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX21jQWNwRHJ2Q29tcG9uZW50LmNvbW1hbmRDb25uZWN0Q29tcG9uZW50LmV4ZWN1dGUobnVsbCwocmVzdWx0KSA9PntcclxuICAgICAgICAgICAgbGV0IG1ldGhvZHMgPSB0aGlzLl9tY0FjcERydkNvbXBvbmVudC5tZXRob2RzO1xyXG4gICAgICAgICAgICBpZiAobWV0aG9kcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ29tcG9uZW50TWV0aG9kc1VwZGF0ZWQobWV0aG9kcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb21wb25lbnQgbWV0aG9kcyBoYXZlIGJlZW4gdXBkYXRlZC4uLi4uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBjb21wb25lbnRNZXRob2RzXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBUb29sc092ZXJ2aWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGFzeW5jIG9uQ29tcG9uZW50TWV0aG9kc1VwZGF0ZWQoY29tcG9uZW50TWV0aG9kczogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RbXSkge1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZU53Q21kVHJhY2VTbmFwc2hvdE1ldGhvZCA9IGNvbXBvbmVudE1ldGhvZHMuZmlsdGVyKG1ldGhvZCA9PiB7cmV0dXJuIG1ldGhvZC5icm93c2VOYW1lID09IFwiQ3JlYXRlTndDbWRUcmFjZVNuYXBzaG90XCJ9KVswXTtcclxuICAgICAgICB0aGlzLl9nZXROd0NtZFRyYWNlRGF0YSA9IGNvbXBvbmVudE1ldGhvZHMuZmlsdGVyKG1ldGhvZCA9PiB7cmV0dXJuIG1ldGhvZC5icm93c2VOYW1lID09IFwiR2V0TndDbWRUcmFjZURhdGFcIn0pWzBdO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuX2dldE53Q21kVHJhY2VEYXRhICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgbWV0aG9kcyBpbnB1dCBwYXJhbWV0ZXJzXHJcbiAgICAgICAgICAgIGF3YWl0IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLnVwZGF0ZUlucHV0UGFyYW1ldGVycyh0aGlzLl9nZXROd0NtZFRyYWNlRGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFjdGl2YXRlKCl7XHJcbiAgICAgICAgdGhpcy51cGRhdGVUb29sc092ZXJ2aWV3RGF0YSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlVG9vbHNPdmVydmlld0RhdGEoKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGRhdGFTb3VyY2UgPSBuZXcgQXJyYXkoKTsgICAgICAgIFxyXG5cclxuICAgICAgICAvLyBUT0RPOiBnZXQgdG9vbHMgZnJvbSBhIHRvb2xzIHByb3ZpZGVyXHJcbiAgICAgICAgbGV0IG5ldHdvcmtDb21tYW5kVHJhY2VUb29sID0geyBkaXNwbGF5TmFtZTogdGhpcy5fbmV0d29ya0NvbW1hbmRUcmFjZVRvb2xOYW1lfTtcclxuICAgICAgICBkYXRhU291cmNlLnB1c2gobmV0d29ya0NvbW1hbmRUcmFjZVRvb2wpO1xyXG5cclxuICAgICAgICAoPGFueT4kKHRoaXMuY3NzUGFyZW50Q29udGVudElkKSkuZWpUcmVlR3JpZCh7XHJcbiAgICAgICAgICAgIGRhdGFTb3VyY2U6IGRhdGFTb3VyY2UsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGdldFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbigpOiB7fXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjb2x1bW5zOiBbXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcImRpc3BsYXlOYW1lXCIsIGhlYWRlclRleHQ6IFRvb2xzT3ZlcnZpZXdXaWRnZXQuY29sdW1uTmFtZSwgd2lkdGg6IFwiMzUwXCIgfSxcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwiY29tbWFuZEJ1dHRvbnNcIiwgaGVhZGVyVGV4dDogVG9vbHNPdmVydmlld1dpZGdldC5jb2x1bW5FeGVjdXRlQ29tbWFuZCB9LFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGdldENvbW1hbmRJZHNGcm9tSXRlbShpdGVtKTogQXJyYXk8c3RyaW5nPntcclxuICAgICAgICAvLyBUT0RPIGdldCBhdmFpbGFibGUgY29tbWFuZHMgZnJvbSB0b29scyAodGhpcy5kYXRhTW9kZWwuZGF0YVNvdXJjZS50b29scykgb3Igc29tZSBvdGhlciBkYXRhc291cmNlXHJcbiAgICAgICAgbGV0IGF2YWlsYWJsZVZpZXdzID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgYXZhaWxhYmxlVmlld3MucHVzaCh0aGlzLl9uZXR3b3JrQ29tbWFuZFRyYWNlRXhwb3J0Q29tbWFuZE5hbWUpO1xyXG4gICAgICAgIHJldHVybiBhdmFpbGFibGVWaWV3cztcclxuICAgIH0gIFxyXG5cclxuICAgIHByb3RlY3RlZCBnZXROYW1lRm9yQ29tbWFuZElkKGNvbW1hbmRJZDogc3RyaW5nKTogc3RyaW5ne1xyXG4gICAgICAgIGlmKGNvbW1hbmRJZCA9PSB0aGlzLl9uZXR3b3JrQ29tbWFuZFRyYWNlRXhwb3J0Q29tbWFuZE5hbWUpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbmV0d29ya0NvbW1hbmRUcmFjZUV4cG9ydENvbW1hbmROYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZ2V0SWNvbkZvckNvbW1hbmRJZChjb21tYW5kSWQ6IHN0cmluZykgOiBzdHJpbmd7XHJcbiAgICAgICAgaWYoY29tbWFuZElkID09IHRoaXMuX25ldHdvcmtDb21tYW5kVHJhY2VFeHBvcnRDb21tYW5kTmFtZSl7XHJcbiAgICAgICAgICAgIHJldHVybiBUaGVtZVByb3ZpZGVyLmdldEluc3RhbmNlKCkuZ2V0VGhlbWVkRmlsZVBhdGgodGhpcy5faW1hZ2VEaXJlY3RvcnkgKyBcImV4cG9ydC5zdmdcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBjbGljayhpdGVtLCBjb21tYW5kSWQpe1xyXG4gICAgICAgIHRoaXMub25FeGVjdXRlVG9vbENvbW1hbmQoaXRlbS5kaXNwbGF5TmFtZSwgY29tbWFuZElkKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZG91YmxlQ2xpY2soYXJncyl7XHJcbiAgICAgICAgaWYoYXJncy5jb2x1bW5OYW1lID09IFRvb2xzT3ZlcnZpZXdXaWRnZXQuY29sdW1uTmFtZSAmJiBhcmdzLm1vZGVsLnNlbGVjdGVkSXRlbSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBsZXQgZGVmYXVsdFRvb2xDb21tYW5kID0gdGhpcy5fbmV0d29ya0NvbW1hbmRUcmFjZUV4cG9ydENvbW1hbmROYW1lOyAvLyBUT0RPIGdldCBkZWZhdWx0IGNvbW1hbmQgZnJvbSB0b29sICh0aGlzLmRhdGFNb2RlbC5kYXRhU291cmNlLnRvb2xzKSBvciBzb21lIG90aGVyIGRhdGFzb3VyY2VcclxuICAgICAgICAgICAgdGhpcy5vbkV4ZWN1dGVUb29sQ29tbWFuZChhcmdzLm1vZGVsLnNlbGVjdGVkSXRlbS5kaXNwbGF5TmFtZSwgZGVmYXVsdFRvb2xDb21tYW5kKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBvbkV4ZWN1dGVUb29sQ29tbWFuZCh0b29sTmFtZTpzdHJpbmcsIGNvbW1hbmQ6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnNvbGUuaW5mbyhcIkNvbW1hbmQgJ1wiICsgY29tbWFuZCArIFwiJyBmcm9tIHRvb2wgJ1wiICsgdG9vbE5hbWUgKyBcIicgZXhlY3V0ZWQhXCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRvb2xOYW1lID09IHRoaXMuX25ldHdvcmtDb21tYW5kVHJhY2VUb29sTmFtZSl7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZXhlY3V0ZU5ldHdvcmtDb21tYW5kVHJhY2VDb21tYW5kKGNvbW1hbmQpO1xyXG4gICAgICAgIH0gICBcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIGV4ZWN1dGVOZXR3b3JrQ29tbWFuZFRyYWNlQ29tbWFuZChjb21tYW5kOiBzdHJpbmcpe1xyXG4gICAgICAgIGlmKGNvbW1hbmQgPT0gdGhpcy5fbmV0d29ya0NvbW1hbmRUcmFjZUV4cG9ydENvbW1hbmROYW1lKXtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5leHBvcnROZXR3b3JrQ29tbWFuZHRyYWNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgZXhwb3J0TmV0d29ya0NvbW1hbmR0cmFjZSgpe1xyXG4gICAgICAgIGlmKHRoaXMuX2NyZWF0ZU53Q21kVHJhY2VTbmFwc2hvdE1ldGhvZCAhPSB1bmRlZmluZWQgJiYgdGhpcy5fZ2V0TndDbWRUcmFjZURhdGEgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gY3JlYXRlIG5ldHdvcmsgY29tbWFuZCB0cmFjZSBzbmFwc2hvdCBvbiB0YXJnZXRcclxuICAgICAgICAgICAgYXdhaXQgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QuZXhlY3V0ZSh0aGlzLl9jcmVhdGVOd0NtZFRyYWNlU25hcHNob3RNZXRob2QpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGRhdGFBdmFpbGFibGUgPSBhd2FpdCB0aGlzLmRhdGFBdmFpbGFibGUoKTtcclxuICAgICAgICAgICAgaWYoZGF0YUF2YWlsYWJsZSl7XHJcbiAgICAgICAgICAgICAgICAvLyBnZXQgbmV0d29yayBjb21tYW5kIHRyYWNlIHNuYXBzaG90IGZyb20gdGFyZ2V0XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVmID0ge2RhdGE6IG5ldyBCbG9iKCl9O1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5jcmVhdGVOZXR3b3JrQ29tbWFuZFRyYWNlRGF0YShyZWYpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGRvd25sb2FkIG5ldHdvcmsgY29tbWFuZCB0cmFjZSBzbmFwc2hvdFxyXG4gICAgICAgICAgICAgICAgRmlsZVByb3ZpZGVyLmRvd25sb2FkRGF0YShcIk53Y3RTbmFwc2hvdC5iaW5cIiwgcmVmLmRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiTm8gbmV0d29yayBjb21tYW5kIHRyYWNlIGRhdGEgYXZhaWxhYmxlIVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIGRhdGFBdmFpbGFibGUoKXtcclxuICAgICAgICB0aGlzLl9nZXROd0NtZFRyYWNlRGF0YS5faW5wdXRQYXJhbWV0ZXJzWzBdLnZhbHVlID0gMDtcclxuICAgICAgICB0aGlzLl9nZXROd0NtZFRyYWNlRGF0YS5faW5wdXRQYXJhbWV0ZXJzWzFdLnZhbHVlID0gMTA7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGkgPCAyMDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLmV4ZWN1dGUodGhpcy5fZ2V0TndDbWRUcmFjZURhdGEpO1xyXG4gICAgICAgICAgICBpZihyZXN1bHQuYXJncyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5zbGVlcCgyMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBjcmVhdGVOZXR3b3JrQ29tbWFuZFRyYWNlRGF0YShyZWY6IHtkYXRhOiBCbG9ifSl7XHJcbiAgICAgICAgbGV0IHN0YXJ0T2Zmc2V0OiBudW1iZXIgPSAwO1xyXG4gICAgICAgIGxldCBtYXhCeXRlczogbnVtYmVyID0gMTAwMDtcclxuXHJcbiAgICAgICAgdGhpcy5fZ2V0TndDbWRUcmFjZURhdGEuX2lucHV0UGFyYW1ldGVyc1swXS52YWx1ZSA9IHN0YXJ0T2Zmc2V0O1xyXG4gICAgICAgIHRoaXMuX2dldE53Q21kVHJhY2VEYXRhLl9pbnB1dFBhcmFtZXRlcnNbMV0udmFsdWUgPSBtYXhCeXRlcztcclxuICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QuZXhlY3V0ZSh0aGlzLl9nZXROd0NtZFRyYWNlRGF0YSk7XHJcbiAgICAgICAgbGV0IGRhdGE6IEludDhBcnJheSA9IG5ldyBJbnQ4QXJyYXkocmVzdWx0LmFyZ3MuRGF0YUxlZnQgKyAxMDAwKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaSA8IHJlc3VsdC5hcmdzLkRhdGEubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBkYXRhW3N0YXJ0T2Zmc2V0K2ldID0gcmVzdWx0LmFyZ3MuRGF0YVtpXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3RhcnRPZmZzZXQgKz0gbWF4Qnl0ZXM7XHJcbiAgICAgICAgd2hpbGUocmVzdWx0LmFyZ3MuRGF0YUxlZnQgPiAwKXtcclxuICAgICAgICAgICAgdGhpcy5fZ2V0TndDbWRUcmFjZURhdGEuX2lucHV0UGFyYW1ldGVyc1swXS52YWx1ZSA9IHN0YXJ0T2Zmc2V0O1xyXG4gICAgICAgICAgICByZXN1bHQgPSBhd2FpdCBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZC5leGVjdXRlKHRoaXMuX2dldE53Q21kVHJhY2VEYXRhKTtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGkgPCByZXN1bHQuYXJncy5EYXRhLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGRhdGFbc3RhcnRPZmZzZXQraV0gPSByZXN1bHQuYXJncy5EYXRhW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN0YXJ0T2Zmc2V0ICs9IG1heEJ5dGVzO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZWYuZGF0YSA9IG5ldyBCbG9iKFtuZXcgVWludDhBcnJheShkYXRhKV0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2xlZXAobXM6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBUb29sc092ZXJ2aWV3V2lkZ2V0IH07Il19