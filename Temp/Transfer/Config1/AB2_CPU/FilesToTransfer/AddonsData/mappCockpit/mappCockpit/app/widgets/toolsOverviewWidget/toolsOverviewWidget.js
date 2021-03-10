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
     * @extends {WidgetBase}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHNPdmVydmlld1dpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy90b29sc092ZXJ2aWV3V2lkZ2V0L3Rvb2xzT3ZlcnZpZXdXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQVVBO1FBQTRCLGlDQUFtQztRQUEvRDs7UUFBaUUsQ0FBQztRQUFELG9CQUFDO0lBQUQsQ0FBQyxBQUFsRSxDQUE0QixtQkFBVSxHQUE0QjtJQUFBLENBQUM7SUFFbkU7Ozs7O09BS0c7SUFDSDtRQUFrQyx1Q0FBMEI7UUFBNUQ7WUFBQSxxRUEyTEM7WUF6TEcsbUJBQWEsR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDO1lBSzVCLGlCQUFXLEdBQTJDLG1CQUFRLENBQUMsTUFBTSxDQUE4QixFQUFFLENBQUMsQ0FBQztZQU92RyxrQ0FBNEIsR0FBRywrQkFBK0IsQ0FBQztZQUMvRCwyQ0FBcUMsR0FBRyxRQUFRLENBQUM7WUFFakQscUJBQWUsR0FBRyxXQUFXLEdBQUcscUNBQWlCLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxtQ0FBbUMsQ0FBQzs7UUEwSzFILENBQUM7UUF4S2EsMkNBQWEsR0FBdkI7WUFDSSxPQUFPLGdCQUFnQixDQUFDO1FBQzVCLENBQUM7UUFFRCxzQkFBVywyQ0FBVTtpQkFBckIsVUFBc0IsVUFBa0Q7Z0JBQXhFLGlCQWFDO2dCQVpHLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO2dCQUU5QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsU0FBUyxJQUFLLE9BQU8sU0FBUyxDQUFDLFVBQVUsSUFBSSxVQUFVLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEgsSUFBRyxJ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RyxXQUFXLENBQUM7NEJBQ3ZELHFCQUFNLGlEQUEwQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsRUFBQTs7NEJBQTFFLE1BQU0sR0FBRyxTQUFpRSxDQUFDOzRCQUMzRSxLQUFRLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztnQ0FDMUMsSUFBSSxDQUFDLFdBQVcsR0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzs2QkFDN0M7NEJBQ0QsV0FBVyxJQUFJLFFBQVEsQ0FBQzs7OzRCQUU1QixHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7OztTQUMvQztRQUVPLG1DQUFLLEdBQWIsVUFBYyxFQUFVO1lBQ3BCLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLElBQUssT0FBQSxVQUFVLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxFQUF2QixDQUF1QixDQUFDLENBQUM7UUFDN0QsQ0FBQztRQXRMYSw4QkFBVSxHQUFHLE1BQU0sQ0FBQztRQUNwQix3Q0FBb0IsR0FBRyxXQUFXLENBQUM7UUFzTHJELDBCQUFDO0tBQUEsQUEzTEQsQ0FBa0MsdURBQTBCLEdBMkwzRDtJQUVRLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElUb29sc092ZXJ2aWV3V2lkZ2V0IH0gZnJvbSBcIi4vaW50ZXJmYWNlcy90b29sc092ZXJ2aWV3V2lkZ2V0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IE92ZXJ2aWV3VHJlZUdyaWRXaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi9vdmVydmlld1RyZWVHcmlkV2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBUeXBlZEV2ZW50IH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9ldmVudHNcIjtcclxuaW1wb3J0IHsgRXZlbnRPcGVuVmlld0FyZ3MgfSBmcm9tIFwiLi4vY29tbW9uL2V2ZW50T3BlblZpZXdBcmdzXCI7XHJcbmltcG9ydCB7IFByb3BlcnR5IH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9wcm9wZXJ0eVwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudCwgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBGaWxlUHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2ZpbGVQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBEaXJlY3RvcnlQcm92aWRlciB9IGZyb20gXCIuLi8uLi9jb21tb24vZGlyZWN0b3J5UHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgVGhlbWVQcm92aWRlciB9IGZyb20gXCIuLi9jb21tb24vdGhlbWVQcm92aWRlclwiO1xyXG5cclxuY2xhc3MgRXZlbnRPcGVuVmlldyBleHRlbmRzIFR5cGVkRXZlbnQ8bnVsbCwgRXZlbnRPcGVuVmlld0FyZ3M+eyB9O1xyXG5cclxuLyoqXHJcbiAqIGltcGxlbWVudHMgdGhlIFRvb2xzT3ZlcnZpZXdXaWRnZXRcclxuICpcclxuICogQGNsYXNzIFRvb2xzT3ZlcnZpZXdXaWRnZXRcclxuICogQGV4dGVuZHMge1dpZGdldEJhc2V9XHJcbiAqL1xyXG5jbGFzcyBUb29sc092ZXJ2aWV3V2lkZ2V0IGV4dGVuZHMgT3ZlcnZpZXdUcmVlR3JpZFdpZGdldEJhc2UgaW1wbGVtZW50cyBJVG9vbHNPdmVydmlld1dpZGdldCB7XHJcblxyXG4gICAgZXZlbnRPcGVuVmlldyA9IG5ldyBFdmVudE9wZW5WaWV3KCk7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBjb2x1bW5OYW1lID0gXCJOYW1lXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIGNvbHVtbkV4ZWN1dGVDb21tYW5kID0gXCJTaG9ydGN1dHNcIjtcclxuXHJcbiAgICBwcml2YXRlIF9jb21wb25lbnRzOiAgUHJvcGVydHk8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnQ+PiA9IFByb3BlcnR5LmNyZWF0ZTxBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudD4+KFtdKTtcclxuXHJcbiAgICBwcml2YXRlIF9tY0FjcERydkNvbXBvbmVudCE6IE1hcHBDb2NrcGl0Q29tcG9uZW50O1xyXG5cclxuICAgIHByaXZhdGUgX2NyZWF0ZU53Q21kVHJhY2VTbmFwc2hvdE1ldGhvZCE6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kO1xyXG4gICAgcHJpdmF0ZSBfZ2V0TndDbWRUcmFjZURhdGEhOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZDtcclxuXHJcbiAgICBwcml2YXRlIF9uZXR3b3JrQ29tbWFuZFRyYWNlVG9vbE5hbWUgPSBcIk1vdGlvbjogTmV0d29yayBDb21tYW5kIFRyYWNlXCI7XHJcbiAgICBwcml2YXRlIF9uZXR3b3JrQ29tbWFuZFRyYWNlRXhwb3J0Q29tbWFuZE5hbWUgPSBcIkV4cG9ydFwiO1xyXG5cclxuICAgIHByaXZhdGUgX2ltYWdlRGlyZWN0b3J5ID0gXCIuLi8uLi8uLi9cIiArIERpcmVjdG9yeVByb3ZpZGVyLmdldFdpZGdldHNEaXJlY3RvcnkoKSArIFwidG9vbHNPdmVydmlld1dpZGdldC9zdHlsZS9pbWFnZXMvXCI7XHJcblxyXG4gICAgcHJvdGVjdGVkIGdldEhlYWRlclRleHQoKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiBcIlRvb2xzIE92ZXJ2aWV3XCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBjb21wb25lbnRzKGNvbXBvbmVudHMgOiBQcm9wZXJ0eTxBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudD4+KSB7XHJcbiAgICAgICAgdGhpcy5fY29tcG9uZW50cyA9IGNvbXBvbmVudHM7XHJcblxyXG4gICAgICAgIHRoaXMuX21jQWNwRHJ2Q29tcG9uZW50ID0gdGhpcy5fY29tcG9uZW50cy52YWx1ZS5maWx0ZXIoY29tcG9uZW50ID0+IHtyZXR1cm4gY29tcG9uZW50LmJyb3dzZU5hbWUgPT0gXCJNY0FjcERydlwiO30pWzBdO1xyXG4gICAgICAgIGlmKHRoaXMuX21jQWNwRHJ2Q29tcG9uZW50ID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbWNBY3BEcnZDb21wb25lbnQuY29tbWFuZENvbm5lY3RDb21wb25lbnQuZXhlY3V0ZShudWxsLChyZXN1bHQpID0+e1xyXG4gICAgICAgICAgICBsZXQgbWV0aG9kcyA9IHRoaXMuX21jQWNwRHJ2Q29tcG9uZW50Lm1ldGhvZHM7XHJcbiAgICAgICAgICAgIGlmIChtZXRob2RzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25Db21wb25lbnRNZXRob2RzVXBkYXRlZChtZXRob2RzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbXBvbmVudCBtZXRob2RzIGhhdmUgYmVlbiB1cGRhdGVkLi4uLi5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IGNvbXBvbmVudE1ldGhvZHNcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIFRvb2xzT3ZlcnZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgYXN5bmMgb25Db21wb25lbnRNZXRob2RzVXBkYXRlZChjb21wb25lbnRNZXRob2RzOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFtdKSB7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlTndDbWRUcmFjZVNuYXBzaG90TWV0aG9kID0gY29tcG9uZW50TWV0aG9kcy5maWx0ZXIobWV0aG9kID0+IHtyZXR1cm4gbWV0aG9kLmJyb3dzZU5hbWUgPT0gXCJDcmVhdGVOd0NtZFRyYWNlU25hcHNob3RcIn0pWzBdO1xyXG4gICAgICAgIHRoaXMuX2dldE53Q21kVHJhY2VEYXRhID0gY29tcG9uZW50TWV0aG9kcy5maWx0ZXIobWV0aG9kID0+IHtyZXR1cm4gbWV0aG9kLmJyb3dzZU5hbWUgPT0gXCJHZXROd0NtZFRyYWNlRGF0YVwifSlbMF07XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5fZ2V0TndDbWRUcmFjZURhdGEgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSBtZXRob2RzIGlucHV0IHBhcmFtZXRlcnNcclxuICAgICAgICAgICAgYXdhaXQgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QudXBkYXRlSW5wdXRQYXJhbWV0ZXJzKHRoaXMuX2dldE53Q21kVHJhY2VEYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYWN0aXZhdGUoKXtcclxuICAgICAgICB0aGlzLnVwZGF0ZVRvb2xzT3ZlcnZpZXdEYXRhKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVUb29sc092ZXJ2aWV3RGF0YSgpIHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgZGF0YVNvdXJjZSA9IG5ldyBBcnJheSgpOyAgICAgICAgXHJcblxyXG4gICAgICAgIC8vIFRPRE86IGdldCB0b29scyBmcm9tIGEgdG9vbHMgcHJvdmlkZXJcclxuICAgICAgICBsZXQgbmV0d29ya0NvbW1hbmRUcmFjZVRvb2wgPSB7IGRpc3BsYXlOYW1lOiB0aGlzLl9uZXR3b3JrQ29tbWFuZFRyYWNlVG9vbE5hbWV9O1xyXG4gICAgICAgIGRhdGFTb3VyY2UucHVzaChuZXR3b3JrQ29tbWFuZFRyYWNlVG9vbCk7XHJcblxyXG4gICAgICAgICg8YW55PiQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpKS5lalRyZWVHcmlkKHtcclxuICAgICAgICAgICAgZGF0YVNvdXJjZTogZGF0YVNvdXJjZSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCk6IHt9e1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNvbHVtbnM6IFtcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwiZGlzcGxheU5hbWVcIiwgaGVhZGVyVGV4dDogVG9vbHNPdmVydmlld1dpZGdldC5jb2x1bW5OYW1lLCB3aWR0aDogXCIzNTBcIiB9LFxyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJjb21tYW5kQnV0dG9uc1wiLCBoZWFkZXJUZXh0OiBUb29sc092ZXJ2aWV3V2lkZ2V0LmNvbHVtbkV4ZWN1dGVDb21tYW5kIH0sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZ2V0Q29tbWFuZElkc0Zyb21JdGVtKGl0ZW0pOiBBcnJheTxzdHJpbmc+e1xyXG4gICAgICAgIC8vIFRPRE8gZ2V0IGF2YWlsYWJsZSBjb21tYW5kcyBmcm9tIHRvb2xzICh0aGlzLmRhdGFNb2RlbC5kYXRhU291cmNlLnRvb2xzKSBvciBzb21lIG90aGVyIGRhdGFzb3VyY2VcclxuICAgICAgICBsZXQgYXZhaWxhYmxlVmlld3MgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICBhdmFpbGFibGVWaWV3cy5wdXNoKHRoaXMuX25ldHdvcmtDb21tYW5kVHJhY2VFeHBvcnRDb21tYW5kTmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIGF2YWlsYWJsZVZpZXdzO1xyXG4gICAgfSAgXHJcblxyXG4gICAgcHJvdGVjdGVkIGdldE5hbWVGb3JDb21tYW5kSWQoY29tbWFuZElkOiBzdHJpbmcpOiBzdHJpbmd7XHJcbiAgICAgICAgaWYoY29tbWFuZElkID09IHRoaXMuX25ldHdvcmtDb21tYW5kVHJhY2VFeHBvcnRDb21tYW5kTmFtZSl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9uZXR3b3JrQ29tbWFuZFRyYWNlRXhwb3J0Q29tbWFuZE5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBnZXRJY29uRm9yQ29tbWFuZElkKGNvbW1hbmRJZDogc3RyaW5nKSA6IHN0cmluZ3tcclxuICAgICAgICBpZihjb21tYW5kSWQgPT0gdGhpcy5fbmV0d29ya0NvbW1hbmRUcmFjZUV4cG9ydENvbW1hbmROYW1lKXtcclxuICAgICAgICAgICAgcmV0dXJuIFRoZW1lUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXRUaGVtZWRGaWxlUGF0aCh0aGlzLl9pbWFnZURpcmVjdG9yeSArIFwiZXhwb3J0LnN2Z1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGNsaWNrKGl0ZW0sIGNvbW1hbmRJZCl7XHJcbiAgICAgICAgdGhpcy5vbkV4ZWN1dGVUb29sQ29tbWFuZChpdGVtLmRpc3BsYXlOYW1lLCBjb21tYW5kSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBkb3VibGVDbGljayhhcmdzKXtcclxuICAgICAgICBpZihhcmdzLmNvbHVtbk5hbWUgPT0gVG9vbHNPdmVydmlld1dpZGdldC5jb2x1bW5OYW1lICYmIGFyZ3MubW9kZWwuc2VsZWN0ZWRJdGVtICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGxldCBkZWZhdWx0VG9vbENvbW1hbmQgPSB0aGlzLl9uZXR3b3JrQ29tbWFuZFRyYWNlRXhwb3J0Q29tbWFuZE5hbWU7IC8vIFRPRE8gZ2V0IGRlZmF1bHQgY29tbWFuZCBmcm9tIHRvb2wgKHRoaXMuZGF0YU1vZGVsLmRhdGFTb3VyY2UudG9vbHMpIG9yIHNvbWUgb3RoZXIgZGF0YXNvdXJjZVxyXG4gICAgICAgICAgICB0aGlzLm9uRXhlY3V0ZVRvb2xDb21tYW5kKGFyZ3MubW9kZWwuc2VsZWN0ZWRJdGVtLmRpc3BsYXlOYW1lLCBkZWZhdWx0VG9vbENvbW1hbmQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIG9uRXhlY3V0ZVRvb2xDb21tYW5kKHRvb2xOYW1lOnN0cmluZywgY29tbWFuZDogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc29sZS5pbmZvKFwiQ29tbWFuZCAnXCIgKyBjb21tYW5kICsgXCInIGZyb20gdG9vbCAnXCIgKyB0b29sTmFtZSArIFwiJyBleGVjdXRlZCFcIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodG9vbE5hbWUgPT0gdGhpcy5fbmV0d29ya0NvbW1hbmRUcmFjZVRvb2xOYW1lKXtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5leGVjdXRlTmV0d29ya0NvbW1hbmRUcmFjZUNvbW1hbmQoY29tbWFuZCk7XHJcbiAgICAgICAgfSAgIFxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgZXhlY3V0ZU5ldHdvcmtDb21tYW5kVHJhY2VDb21tYW5kKGNvbW1hbmQ6IHN0cmluZyl7XHJcbiAgICAgICAgaWYoY29tbWFuZCA9PSB0aGlzLl9uZXR3b3JrQ29tbWFuZFRyYWNlRXhwb3J0Q29tbWFuZE5hbWUpe1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmV4cG9ydE5ldHdvcmtDb21tYW5kdHJhY2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBleHBvcnROZXR3b3JrQ29tbWFuZHRyYWNlKCl7XHJcbiAgICAgICAgaWYodGhpcy5fY3JlYXRlTndDbWRUcmFjZVNuYXBzaG90TWV0aG9kICE9IHVuZGVmaW5lZCAmJiB0aGlzLl9nZXROd0NtZFRyYWNlRGF0YSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBjcmVhdGUgbmV0d29yayBjb21tYW5kIHRyYWNlIHNuYXBzaG90IG9uIHRhcmdldFxyXG4gICAgICAgICAgICBhd2FpdCBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZC5leGVjdXRlKHRoaXMuX2NyZWF0ZU53Q21kVHJhY2VTbmFwc2hvdE1ldGhvZCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgZGF0YUF2YWlsYWJsZSA9IGF3YWl0IHRoaXMuZGF0YUF2YWlsYWJsZSgpO1xyXG4gICAgICAgICAgICBpZihkYXRhQXZhaWxhYmxlKXtcclxuICAgICAgICAgICAgICAgIC8vIGdldCBuZXR3b3JrIGNvbW1hbmQgdHJhY2Ugc25hcHNob3QgZnJvbSB0YXJnZXRcclxuICAgICAgICAgICAgICAgIGxldCByZWYgPSB7ZGF0YTogbmV3IEJsb2IoKX07XHJcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmNyZWF0ZU5ldHdvcmtDb21tYW5kVHJhY2VEYXRhKHJlZik7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gZG93bmxvYWQgbmV0d29yayBjb21tYW5kIHRyYWNlIHNuYXBzaG90XHJcbiAgICAgICAgICAgICAgICBGaWxlUHJvdmlkZXIuZG93bmxvYWREYXRhKFwiTndjdFNuYXBzaG90LmJpblwiLCByZWYuZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJObyBuZXR3b3JrIGNvbW1hbmQgdHJhY2UgZGF0YSBhdmFpbGFibGUhXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgZGF0YUF2YWlsYWJsZSgpe1xyXG4gICAgICAgIHRoaXMuX2dldE53Q21kVHJhY2VEYXRhLl9pbnB1dFBhcmFtZXRlcnNbMF0udmFsdWUgPSAwO1xyXG4gICAgICAgIHRoaXMuX2dldE53Q21kVHJhY2VEYXRhLl9pbnB1dFBhcmFtZXRlcnNbMV0udmFsdWUgPSAxMDtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaSA8IDIwOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QuZXhlY3V0ZSh0aGlzLl9nZXROd0NtZFRyYWNlRGF0YSk7XHJcbiAgICAgICAgICAgIGlmKHJlc3VsdC5hcmdzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnNsZWVwKDIwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIGNyZWF0ZU5ldHdvcmtDb21tYW5kVHJhY2VEYXRhKHJlZjoge2RhdGE6IEJsb2J9KXtcclxuICAgICAgICBsZXQgc3RhcnRPZmZzZXQ6IG51bWJlciA9IDA7XHJcbiAgICAgICAgbGV0IG1heEJ5dGVzOiBudW1iZXIgPSAxMDAwO1xyXG5cclxuICAgICAgICB0aGlzLl9nZXROd0NtZFRyYWNlRGF0YS5faW5wdXRQYXJhbWV0ZXJzWzBdLnZhbHVlID0gc3RhcnRPZmZzZXQ7XHJcbiAgICAgICAgdGhpcy5fZ2V0TndDbWRUcmFjZURhdGEuX2lucHV0UGFyYW1ldGVyc1sxXS52YWx1ZSA9IG1heEJ5dGVzO1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZC5leGVjdXRlKHRoaXMuX2dldE53Q21kVHJhY2VEYXRhKTtcclxuICAgICAgICBsZXQgZGF0YTogSW50OEFycmF5ID0gbmV3IEludDhBcnJheShyZXN1bHQuYXJncy5EYXRhTGVmdCArIDEwMDApO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpIDwgcmVzdWx0LmFyZ3MuRGF0YS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGRhdGFbc3RhcnRPZmZzZXQraV0gPSByZXN1bHQuYXJncy5EYXRhW2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdGFydE9mZnNldCArPSBtYXhCeXRlcztcclxuICAgICAgICB3aGlsZShyZXN1bHQuYXJncy5EYXRhTGVmdCA+IDApe1xyXG4gICAgICAgICAgICB0aGlzLl9nZXROd0NtZFRyYWNlRGF0YS5faW5wdXRQYXJhbWV0ZXJzWzBdLnZhbHVlID0gc3RhcnRPZmZzZXQ7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IGF3YWl0IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLmV4ZWN1dGUodGhpcy5fZ2V0TndDbWRUcmFjZURhdGEpO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaSA8IHJlc3VsdC5hcmdzLkRhdGEubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgZGF0YVtzdGFydE9mZnNldCtpXSA9IHJlc3VsdC5hcmdzLkRhdGFbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3RhcnRPZmZzZXQgKz0gbWF4Qnl0ZXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlZi5kYXRhID0gbmV3IEJsb2IoW25ldyBVaW50OEFycmF5KGRhdGEpXSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzbGVlcChtczogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IFRvb2xzT3ZlcnZpZXdXaWRnZXQgfTsiXX0=