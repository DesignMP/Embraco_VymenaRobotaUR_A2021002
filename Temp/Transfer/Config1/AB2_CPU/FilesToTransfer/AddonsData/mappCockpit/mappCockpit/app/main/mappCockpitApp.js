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
define(["require", "exports", "../framework/events", "../common/directoryProvider", "../framework/appConsole", "../debug/diagnostics", "../common/mappCockpitConfig", "../common/componentFactory/componentFactory", "../common/componentFactory/componentDefinition", "../common/persistence/persistDataController"], function (require, exports, events_1, directoryProvider_1, appConsole_1, diagnostics_1, mappCockpitConfig_1, componentFactory_1, componentDefinition_1, persistDataController_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // Declares Event-AppInitialized
    var EventAppInitialized = /** @class */ (function (_super) {
        __extends(EventAppInitialized, _super);
        function EventAppInitialized() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventAppInitialized;
    }(events_1.TypedEvent));
    ;
    // Boot container definition
    var bootContentId = "mappCockpitContent";
    var mainPaneId = "mappCockpitMainPane";
    var bootContent = "<div id=" + bootContentId + ' style="overflow:hidden"></div>';
    /**
     * The class represents the application main class.
     *
     * @class MappCockpitApp
     */
    var MappCockpitApp = /** @class */ (function () {
        /**
         * Creates an instance of MappCockpitApp.
         * @memberof MappCockpitApp
         */
        function MappCockpitApp() {
            // Events
            this.eventAppInitialized = new EventAppInitialized();
        }
        /**
         * Creates an AppConsole instance
         *
         * @private
         * @memberof MappCockpitApp
         */
        MappCockpitApp.prototype.createAppConsole = function () {
            if (!MappCockpitApp.cxcoDebug) {
                // in release mode we override the standard console
                appConsole_1.AppConsole.create();
            }
            // ....otherwise the standard console keeps alive...
        };
        /**
         * Creates and initializes the mapp cockpit app.
         *
         * @memberof MappCockpitApp
         */
        MappCockpitApp.prototype.create = function () {
            var _this = this;
            var initCommands = window.location.search.substring(1);
            if (initCommands.indexOf("CLEAR") > -1 || initCommands.indexOf("clear") > -1) {
                var persistingDataController_1 = new persistDataController_1.PersistDataController(undefined);
                (function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, persistingDataController_1.clearDefaultStorage()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); })();
            }
            if (this.mode == "cxcoDbg") {
                this.loadApp();
            }
            else {
                if (initCommands.indexOf("DEBUG") > -1) {
                    var cxcoDbg = window.prompt("Enter debug password !");
                    if (cxcoDbg == "cxcoDbg") {
                        document.write(diagnostics_1.Diagnostics.DEBUG);
                    }
                    else {
                        this.createAppConsole();
                        this.loadApp();
                    }
                }
                else {
                    this.createAppConsole();
                    this.loadApp();
                }
            }
        };
        MappCockpitApp.prototype.loadApp = function () {
            this.attachUnloadHandler();
            this.loadAppConfiguration();
        };
        /**
         * Loads application configuration settings
         *
         * @memberof MappCockpitApp
         */
        MappCockpitApp.prototype.loadAppConfiguration = function () {
            var _this = this;
            var cfgFile = "../../../" + directoryProvider_1.DirectoryProvider.getAppDirectory() + "common/mappCockpitConfigSettings.json";
            $.getJSON(cfgFile, function (appCfg) { _this.onAppSettingsLoaded(appCfg); });
        };
        /**
         * Called after the app settings have been loaded
         *
         * @private
         * @param {*} appCfg
         * @memberof MappCockpitApp
         */
        MappCockpitApp.prototype.onAppSettingsLoaded = function (appCfg) {
            // load and update application settings
            mappCockpitConfig_1.MappCockpitConfiguration.initialize(appCfg);
            // boot the application
            this.loadBootContent();
        };
        /**
         * Loads the main content
         *
         * @private
         * @memberof MappCockpitApp
         */
        MappCockpitApp.prototype.loadBootContent = function () {
            var _this = this;
            // Get the page body
            var pageBody = $("body");
            // ... append the main content div
            var $bootContent = $(bootContent);
            $bootContent[0].style.height = (window.innerHeight).toString() + 'px';
            var uniqueResizeId = 123;
            $(window).resize(function (args) {
                $bootContent[0].style.height = (window.innerHeight).toString() + 'px';
                clearTimeout(uniqueResizeId);
                uniqueResizeId = setTimeout(function () { return _this.doneResizing(args); }, 500);
            });
            pageBody.append($bootContent);
            // Load the main content into the main div
            $bootContent.load("../../../" + directoryProvider_1.DirectoryProvider.getAppDirectory() + "layout/mappCockpitMain.html", function () { _this.onBootContentLoaded(pageBody); });
        };
        MappCockpitApp.prototype.doneResizing = function (args) {
            if (this._mappCockpitWidget != undefined) {
                this._mappCockpitWidget.resize(window.innerWidth, window.innerHeight);
            }
        };
        /**
         * Handler called after loading the main content file.
         *
         * @private
         * @param {JQuery} contentContainer
         * @memberof MappCockpitApp
         */
        MappCockpitApp.prototype.onBootContentLoaded = function (contentContainer) {
            return __awaiter(this, void 0, void 0, function () {
                var mainLayoutPane;
                var _this = this;
                return __generator(this, function (_a) {
                    mainLayoutPane = $("#" + mainPaneId);
                    // Check if the boot div exists 
                    if (mainLayoutPane.length) {
                        (function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.createMappCockpitWidget()];
                                case 1:
                                    _a.sent();
                                    this.onAppInitialized();
                                    return [2 /*return*/];
                            }
                        }); }); })();
                    }
                    return [2 /*return*/];
                });
            });
        };
        /**
         * creates the mapp cockpit widget
         *
         * @private
         * @memberof MappCockpitApp
         */
        MappCockpitApp.prototype.createMappCockpitWidget = function () {
            this._mappCockpitWidget = componentFactory_1.ComponentFactory.getInstance().create(new componentDefinition_1.ComponentDefinition("MappCockpitWidget", "MappCockpitWidget"), undefined);
            if (this._mappCockpitWidget != undefined) {
                this._mappCockpitWidget.initialize("mappCockpitMainPane");
                this._mappCockpitWidget.resize(window.innerWidth, window.innerHeight);
            }
        };
        /**
         * Notifies that the app has been initialized
         *
         * @private
         * @memberof MappCockpitApp
         */
        MappCockpitApp.prototype.onAppInitialized = function () {
            console.log("App Initialized");
            this.eventAppInitialized.raise(this, null);
        };
        /**
         *
         * attaches a handler for unloading mapp cockpit
         * @private
         * @memberof MappCockpitApp
         */
        MappCockpitApp.prototype.attachUnloadHandler = function () {
            var _this = this;
            window.onbeforeunload = function (e) { _this.handleUnload(e); };
        };
        /**
         * handles unloading mapp cockpit....releasing resources, disconnecting ...
         *
         * @param {BeforeUnloadEvent} e
         * @returns {*}
         * @memberof MappCockpitApp
         */
        MappCockpitApp.prototype.handleUnload = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (this._mappCockpitWidget != undefined) {
                        this._mappCockpitWidget.dataModel.dispose();
                        this._mappCockpitWidget.dispose();
                    }
                    console.log("MappCockpitApp: unloading ....");
                    return [2 /*return*/];
                });
            });
        };
        return MappCockpitApp;
    }());
    exports.MappCockpitApp = MappCockpitApp;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcENvY2twaXRBcHAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBwL21haW4vbWFwcENvY2twaXRBcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQVlBLGdDQUFnQztJQUNoQztRQUFrQyx1Q0FBZ0M7UUFBbEU7O1FBQW9FLENBQUM7UUFBRCwwQkFBQztJQUFELENBQUMsQUFBckUsQ0FBa0MsbUJBQVUsR0FBeUI7SUFBQSxDQUFDO0lBRXRFLDRCQUE0QjtJQUM1QixJQUFNLGFBQWEsR0FBRyxvQkFBb0IsQ0FBQztJQUMzQyxJQUFNLFVBQVUsR0FBRyxxQkFBcUIsQ0FBQztJQUN6QyxJQUFNLFdBQVcsR0FBRyxVQUFVLEdBQUcsYUFBYSxHQUFHLGlDQUFpQyxDQUFDO0lBRW5GOzs7O09BSUc7SUFDSDtRQU1JOzs7V0FHRztRQUNIO1lBUkEsU0FBUztZQUNULHdCQUFtQixHQUFHLElBQUksbUJBQW1CLEVBQUUsQ0FBQztRQVFoRCxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSyx5Q0FBZ0IsR0FBeEI7WUFDSSxJQUFJLENBQU8sY0FBZSxDQUFDLFNBQVMsRUFBRTtnQkFDbEMsbURBQW1EO2dCQUNuRCx1QkFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ3ZCO1lBQ0Qsb0RBQW9EO1FBQ3hELENBQUM7UUFFRDs7OztXQUlHO1FBQ0gsK0JBQU0sR0FBTjtZQUFBLGlCQTRCQztZQTNCRyxJQUFJLFlBQVksR0FBVyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0QsSUFBSSxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQzFFLElB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LENBQUMsQ0FBQzthQUN6RTtRQUNMLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNLLHlDQUFnQixHQUF4QjtZQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtZQUM5QixJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvQyxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSyw0Q0FBbUIsR0FBM0I7WUFBQSxpQkFFQztZQURHLE1BQU0sQ0FBQyxjQUFjLEdBQUcsVUFBQyxDQUFDLElBQU0sS0FBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1RCxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0cscUNBQVksR0FBbEIsVUFBbUIsQ0FBb0I7OztvQkFDbkMsSUFBSSxJQUFJLENBQUMsa0JBQWtCLElBQUksU0FBUyxFQUFFO3dCQUN0QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUM1QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLENBQUM7cUJBRXJDO29CQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLENBQUMsQ0FBQzs7OztTQUVqRDtRQUNMLHFCQUFDO0lBQUQsQ0FBQyxBQWxNRCxJQWtNQztJQUVRLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IENvbW1vbkxpYnMgPSByZXF1aXJlKCcuLi9saWJzL2NvbW1vbicpO1xyXG5pbXBvcnQgeyBUeXBlZEV2ZW50IH0gZnJvbSBcIi4uL2ZyYW1ld29yay9ldmVudHNcIjtcclxuXHJcbmltcG9ydCB7IERpcmVjdG9yeVByb3ZpZGVyIH0gZnJvbSBcIi4uL2NvbW1vbi9kaXJlY3RvcnlQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBBcHBDb25zb2xlIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9hcHBDb25zb2xlXCI7XHJcbmltcG9ydCB7IERpYWdub3N0aWNzIH0gZnJvbSBcIi4uL2RlYnVnL2RpYWdub3N0aWNzXCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29uZmlndXJhdGlvbiB9IGZyb20gXCIuLi9jb21tb24vbWFwcENvY2twaXRDb25maWdcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50RmFjdG9yeSB9IGZyb20gXCIuLi9jb21tb24vY29tcG9uZW50RmFjdG9yeS9jb21wb25lbnRGYWN0b3J5XCI7XHJcbmltcG9ydCB7IENvbXBvbmVudERlZmluaXRpb24gfSBmcm9tIFwiLi4vY29tbW9uL2NvbXBvbmVudEZhY3RvcnkvY29tcG9uZW50RGVmaW5pdGlvblwiO1xyXG5pbXBvcnQgeyBQZXJzaXN0RGF0YUNvbnRyb2xsZXIgfSBmcm9tIFwiLi4vY29tbW9uL3BlcnNpc3RlbmNlL3BlcnNpc3REYXRhQ29udHJvbGxlclwiO1xyXG5pbXBvcnQgeyBJV2lkZ2V0IH0gZnJvbSBcIi4uL3dpZGdldHMvY29tbW9uL2ludGVyZmFjZXMvd2lkZ2V0SW50ZXJmYWNlXCI7XHJcblxyXG4vLyBEZWNsYXJlcyBFdmVudC1BcHBJbml0aWFsaXplZFxyXG5jbGFzcyBFdmVudEFwcEluaXRpYWxpemVkIGV4dGVuZHMgVHlwZWRFdmVudDxNYXBwQ29ja3BpdEFwcCwgbnVsbD57IH07XHJcblxyXG4vLyBCb290IGNvbnRhaW5lciBkZWZpbml0aW9uXHJcbmNvbnN0IGJvb3RDb250ZW50SWQgPSBcIm1hcHBDb2NrcGl0Q29udGVudFwiO1xyXG5jb25zdCBtYWluUGFuZUlkID0gXCJtYXBwQ29ja3BpdE1haW5QYW5lXCI7XHJcbmNvbnN0IGJvb3RDb250ZW50ID0gXCI8ZGl2IGlkPVwiICsgYm9vdENvbnRlbnRJZCArICcgc3R5bGU9XCJvdmVyZmxvdzpoaWRkZW5cIj48L2Rpdj4nO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBjbGFzcyByZXByZXNlbnRzIHRoZSBhcHBsaWNhdGlvbiBtYWluIGNsYXNzLlxyXG4gKlxyXG4gKiBAY2xhc3MgTWFwcENvY2twaXRBcHBcclxuICovXHJcbmNsYXNzIE1hcHBDb2NrcGl0QXBwIHtcclxuXHJcbiAgICAvLyBFdmVudHNcclxuICAgIGV2ZW50QXBwSW5pdGlhbGl6ZWQgPSBuZXcgRXZlbnRBcHBJbml0aWFsaXplZCgpO1xyXG4gICAgcHJpdmF0ZSBfbWFwcENvY2twaXRXaWRnZXQ6IElXaWRnZXR8dW5kZWZpbmVkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBNYXBwQ29ja3BpdEFwcC5cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdEFwcFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gQXBwQ29uc29sZSBpbnN0YW5jZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRBcHBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVBcHBDb25zb2xlKCkge1xyXG4gICAgICAgIGlmICghKDxhbnk+TWFwcENvY2twaXRBcHApLmN4Y29EZWJ1Zykge1xyXG4gICAgICAgICAgICAvLyBpbiByZWxlYXNlIG1vZGUgd2Ugb3ZlcnJpZGUgdGhlIHN0YW5kYXJkIGNvbnNvbGVcclxuICAgICAgICAgICAgQXBwQ29uc29sZS5jcmVhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gLi4uLm90aGVyd2lzZSB0aGUgc3RhbmRhcmQgY29uc29sZSBrZWVwcyBhbGl2ZS4uLlxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbmQgaW5pdGlhbGl6ZXMgdGhlIG1hcHAgY29ja3BpdCBhcHAuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0QXBwXHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZSgpIHtcclxuICAgICAgICB2YXIgaW5pdENvbW1hbmRzOiBzdHJpbmcgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cmluZygxKTtcclxuICAgICAgICBpZiAoaW5pdENvbW1hbmRzLmluZGV4T2YoXCJDTEVBUlwiKSA+IC0xIHx8IGluaXRDb21tYW5kcy5pbmRleE9mKFwiY2xlYXJcIikgPiAtMSkge1xyXG4gICAgICAgICAgICBsZXQgcGVyc2lzdGluZ0RhdGFDb250cm9sbGVyID0gbmV3IFBlcnNpc3REYXRhQ29udHJvbGxlcih1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgKGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGF3YWl0IHBlcnNpc3RpbmdEYXRhQ29udHJvbGxlci5jbGVhckRlZmF1bHRTdG9yYWdlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKSgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCg8YW55PnRoaXMpLm1vZGUgPT0gXCJjeGNvRGJnXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkQXBwKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGluaXRDb21tYW5kcy5pbmRleE9mKFwiREVCVUdcIikgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGN4Y29EYmcgPSB3aW5kb3cucHJvbXB0KFwiRW50ZXIgZGVidWcgcGFzc3dvcmQgIVwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChjeGNvRGJnID09IFwiY3hjb0RiZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQud3JpdGUoRGlhZ25vc3RpY3MuREVCVUcpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUFwcENvbnNvbGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRBcHAoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlQXBwQ29uc29sZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkQXBwKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbG9hZEFwcCgpIHtcclxuICAgICAgICB0aGlzLmF0dGFjaFVubG9hZEhhbmRsZXIoKTtcclxuICAgICAgICB0aGlzLmxvYWRBcHBDb25maWd1cmF0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkcyBhcHBsaWNhdGlvbiBjb25maWd1cmF0aW9uIHNldHRpbmdzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0QXBwXHJcbiAgICAgKi9cclxuICAgIGxvYWRBcHBDb25maWd1cmF0aW9uKCkge1xyXG4gICAgICAgIGxldCBjZmdGaWxlID0gXCIuLi8uLi8uLi9cIiArIERpcmVjdG9yeVByb3ZpZGVyLmdldEFwcERpcmVjdG9yeSgpICsgXCJjb21tb24vbWFwcENvY2twaXRDb25maWdTZXR0aW5ncy5qc29uXCI7XHJcbiAgICAgICAgJC5nZXRKU09OKGNmZ0ZpbGUsIChhcHBDZmcpID0+IHsgdGhpcy5vbkFwcFNldHRpbmdzTG9hZGVkKGFwcENmZyk7IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIGFmdGVyIHRoZSBhcHAgc2V0dGluZ3MgaGF2ZSBiZWVuIGxvYWRlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGFwcENmZ1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0QXBwXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25BcHBTZXR0aW5nc0xvYWRlZChhcHBDZmc6IGFueSkge1xyXG5cclxuICAgICAgICAvLyBsb2FkIGFuZCB1cGRhdGUgYXBwbGljYXRpb24gc2V0dGluZ3NcclxuICAgICAgICBNYXBwQ29ja3BpdENvbmZpZ3VyYXRpb24uaW5pdGlhbGl6ZShhcHBDZmcpO1xyXG5cclxuICAgICAgICAvLyBib290IHRoZSBhcHBsaWNhdGlvblxyXG4gICAgICAgIHRoaXMubG9hZEJvb3RDb250ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkcyB0aGUgbWFpbiBjb250ZW50IFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRBcHBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBsb2FkQm9vdENvbnRlbnQoKSB7XHJcblxyXG4gICAgICAgIC8vIEdldCB0aGUgcGFnZSBib2R5XHJcbiAgICAgICAgdmFyIHBhZ2VCb2R5ID0gJChcImJvZHlcIik7XHJcbiAgICAgICAgLy8gLi4uIGFwcGVuZCB0aGUgbWFpbiBjb250ZW50IGRpdlxyXG4gICAgICAgIHZhciAkYm9vdENvbnRlbnQgPSAkKGJvb3RDb250ZW50KTtcclxuICAgICAgICAkYm9vdENvbnRlbnRbMF0uc3R5bGUuaGVpZ2h0ID0gKHdpbmRvdy5pbm5lckhlaWdodCEpLnRvU3RyaW5nKCkgKyAncHgnO1xyXG4gICAgICAgIHZhciB1bmlxdWVSZXNpemVJZCA9IDEyMztcclxuICAgICAgICAkKHdpbmRvdykucmVzaXplKChhcmdzKSA9PiB7XHJcbiAgICAgICAgICAgICRib290Q29udGVudFswXS5zdHlsZS5oZWlnaHQgPSAod2luZG93LmlubmVySGVpZ2h0ISkudG9TdHJpbmcoKSArICdweCc7XHJcblxyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodW5pcXVlUmVzaXplSWQpO1xyXG4gICAgICAgICAgICB1bmlxdWVSZXNpemVJZCA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5kb25lUmVzaXppbmcoYXJncyksIDUwMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcGFnZUJvZHkuYXBwZW5kKCRib290Q29udGVudCk7XHJcblxyXG4gICAgICAgIC8vIExvYWQgdGhlIG1haW4gY29udGVudCBpbnRvIHRoZSBtYWluIGRpdlxyXG4gICAgICAgICRib290Q29udGVudC5sb2FkKFwiLi4vLi4vLi4vXCIgKyBEaXJlY3RvcnlQcm92aWRlci5nZXRBcHBEaXJlY3RvcnkoKSArIFwibGF5b3V0L21hcHBDb2NrcGl0TWFpbi5odG1sXCIsICgpID0+IHsgdGhpcy5vbkJvb3RDb250ZW50TG9hZGVkKHBhZ2VCb2R5KTsgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkb25lUmVzaXppbmcoYXJncykge1xyXG4gICAgICAgIGlmICh0aGlzLl9tYXBwQ29ja3BpdFdpZGdldCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwcENvY2twaXRXaWRnZXQucmVzaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZXIgY2FsbGVkIGFmdGVyIGxvYWRpbmcgdGhlIG1haW4gY29udGVudCBmaWxlLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0pRdWVyeX0gY29udGVudENvbnRhaW5lclxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0QXBwXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgb25Cb290Q29udGVudExvYWRlZChjb250ZW50Q29udGFpbmVyOiBKUXVlcnkpIHtcclxuXHJcbiAgICAgICAgLy8gR2V0IHRoZSBtYWluIGRpdlxyXG4gICAgICAgIHZhciBtYWluTGF5b3V0UGFuZSA9ICQoXCIjXCIgKyBtYWluUGFuZUlkKTtcclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIGJvb3QgZGl2IGV4aXN0cyBcclxuICAgICAgICBpZiAobWFpbkxheW91dFBhbmUubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIChhc3luYyAoKSA9PiB7IGF3YWl0IHRoaXMuY3JlYXRlTWFwcENvY2twaXRXaWRnZXQoKTsgdGhpcy5vbkFwcEluaXRpYWxpemVkKCk7IH0pKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY3JlYXRlcyB0aGUgbWFwcCBjb2NrcGl0IHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRBcHBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVNYXBwQ29ja3BpdFdpZGdldCgpIHtcclxuICAgICAgICB0aGlzLl9tYXBwQ29ja3BpdFdpZGdldCA9IENvbXBvbmVudEZhY3RvcnkuZ2V0SW5zdGFuY2UoKS5jcmVhdGUobmV3IENvbXBvbmVudERlZmluaXRpb24oXCJNYXBwQ29ja3BpdFdpZGdldFwiLCBcIk1hcHBDb2NrcGl0V2lkZ2V0XCIpLCB1bmRlZmluZWQpIGFzIElXaWRnZXQ7XHJcbiAgICAgICAgaWYodGhpcy5fbWFwcENvY2twaXRXaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fbWFwcENvY2twaXRXaWRnZXQuaW5pdGlhbGl6ZShcIm1hcHBDb2NrcGl0TWFpblBhbmVcIik7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcHBDb2NrcGl0V2lkZ2V0LnJlc2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBOb3RpZmllcyB0aGF0IHRoZSBhcHAgaGFzIGJlZW4gaW5pdGlhbGl6ZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0QXBwXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25BcHBJbml0aWFsaXplZCgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkFwcCBJbml0aWFsaXplZFwiKVxyXG4gICAgICAgIHRoaXMuZXZlbnRBcHBJbml0aWFsaXplZC5yYWlzZSh0aGlzLCBudWxsKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBhdHRhY2hlcyBhIGhhbmRsZXIgZm9yIHVubG9hZGluZyBtYXBwIGNvY2twaXRcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRBcHBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhdHRhY2hVbmxvYWRIYW5kbGVyKCkge1xyXG4gICAgICAgIHdpbmRvdy5vbmJlZm9yZXVubG9hZCA9IChlKSA9PiB7dGhpcy5oYW5kbGVVbmxvYWQoZSk7IH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBoYW5kbGVzIHVubG9hZGluZyBtYXBwIGNvY2twaXQuLi4ucmVsZWFzaW5nIHJlc291cmNlcywgZGlzY29ubmVjdGluZyAuLi5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0JlZm9yZVVubG9hZEV2ZW50fSBlXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdEFwcFxyXG4gICAgICovXHJcbiAgICBhc3luYyBoYW5kbGVVbmxvYWQoZTogQmVmb3JlVW5sb2FkRXZlbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5fbWFwcENvY2twaXRXaWRnZXQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcHBDb2NrcGl0V2lkZ2V0LmRhdGFNb2RlbC5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcHBDb2NrcGl0V2lkZ2V0LmRpc3Bvc2UoKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTWFwcENvY2twaXRBcHA6IHVubG9hZGluZyAuLi4uXCIpO1xyXG4gICAgICBcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgTWFwcENvY2twaXRBcHAgfTtcclxuIl19