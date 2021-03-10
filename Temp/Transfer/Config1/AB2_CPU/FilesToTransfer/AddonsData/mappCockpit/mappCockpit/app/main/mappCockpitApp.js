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
define(["require", "exports", "../framework/events", "../widgets/widgets", "../models/dataModels", "../common/directoryProvider", "../framework/appConsole", "../debug/diagnostics", "../common/mappCockpitConfig"], function (require, exports, events_1, Widgets, DataModels, directoryProvider_1, appConsole_1, diagnostics_1, mappCockpitConfig_1) {
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
            if (this.mode == "cxcoDbg") {
                this.loadApp();
            }
            else {
                var initCommands = window.location.search.substring(1);
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
                return __generator(this, function (_a) {
                    mainLayoutPane = $("#" + mainPaneId);
                    // Check if the boot div exists 
                    if (mainLayoutPane.length) {
                        this.createMappCockpitWidget();
                        this.onAppInitialized();
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
            var mappCockpitDataModel = DataModels.MappCockpitDataModel.create();
            mappCockpitDataModel.initialize();
            this._mappCockpitWidget = Widgets.MappCockpitWidget.create();
            this._mappCockpitWidget.dataModel = mappCockpitDataModel;
            this._mappCockpitWidget.initialize("mappCockpitMainPane");
            this._mappCockpitWidget.resize(window.innerWidth, window.innerHeight);
        };
        /**
         * Notifies that the app has been initialized
         *
         * @private
         * @memberof MappCockpitApp
         */
        MappCockpitApp.prototype.onAppInitialized = function () {
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
            if (this._mappCockpitWidget != undefined) {
                this._mappCockpitWidget.dataModel.dispose();
                this._mappCockpitWidget.dispose();
            }
            console.log("MappCockpitApp: unloading ....");
        };
        return MappCockpitApp;
    }());
    exports.MappCockpitApp = MappCockpitApp;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcENvY2twaXRBcHAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBwL21haW4vbWFwcENvY2twaXRBcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQVVBLGdDQUFnQztJQUNoQztRQUFrQyx1Q0FBZ0M7UUFBbEU7O1FBQW9FLENBQUM7UUFBRCwwQkFBQztJQUFELENBQUMsQUFBckUsQ0FBa0MsbUJBQVUsR0FBeUI7SUFBQSxDQUFDO0lBRXRFLDRCQUE0QjtJQUM1QixJQUFNLGFBQWEsR0FBRyxvQkFBb0IsQ0FBQztJQUMzQyxJQUFNLFVBQVUsR0FBRyxxQkFBcUIsQ0FBQztJQUN6QyxJQUFNLFdBQVcsR0FBRyxVQUFVLEdBQUcsYUFBYSxHQUFHLGlDQUFpQyxDQUFDO0lBRW5GOzs7O09BSUc7SUFDSDtRQU1JOzs7V0FHRztRQUNIO1lBUkEsU0FBUztZQUNULHdCQUFtQixHQUFHLElBQUksbUJBQW1CLEVBQUUsQ0FBQztRQVFoRCxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSyx5Q0FBZ0IsR0FBeEI7WUFDSSxJQUFJLENBQU8sY0FBZSxDQUFDLFNBQVMsRUFBRTtnQkFDbEMsbURBQW1EO2dCQUNuRCx1QkFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ3ZCO1lBQ0Qsb0RBQW9EO1FBQ3hELENBQUM7UUFFRDs7OztXQUlHO1FBQ0gsK0JBQU0sR0FBTjtZQUVJLElBQVUsSUFBSyxDQUFDLElBQUksSUFBSSxTQUFTLEVBQUU7Z0JBQy9CLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUNsQjtpQkFBSTtnQkFDRCxJQUFJLFlBQVksR0FBVyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9ELElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxD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YSxDQUFvQjtZQUM3QixJQUFHLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxTQUFTLEVBQUM7Z0JBQ3BDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQzVDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUNyQztZQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztRQUNsRCxDQUFDO1FBQ0wscUJBQUM7SUFBRCxDQUFDLEFBNUxELElBNExDO0lBRVEsd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgQ29tbW9uTGlicyA9IHJlcXVpcmUoJy4uL2xpYnMvY29tbW9uJyk7XHJcbmltcG9ydCB7IFR5cGVkRXZlbnQgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2V2ZW50c1wiO1xyXG5cclxuaW1wb3J0ICogYXMgV2lkZ2V0cyBmcm9tIFwiLi4vd2lkZ2V0cy93aWRnZXRzXCI7XHJcbmltcG9ydCAqIGFzIERhdGFNb2RlbHMgZnJvbSAnLi4vbW9kZWxzL2RhdGFNb2RlbHMnO1xyXG5pbXBvcnQgeyBEaXJlY3RvcnlQcm92aWRlciB9IGZyb20gXCIuLi9jb21tb24vZGlyZWN0b3J5UHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgQXBwQ29uc29sZSB9IGZyb20gXCIuLi9mcmFtZXdvcmsvYXBwQ29uc29sZVwiO1xyXG5pbXBvcnQge0RpYWdub3N0aWNzfSBmcm9tIFwiLi4vZGVidWcvZGlhZ25vc3RpY3NcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb25maWd1cmF0aW9uIH0gZnJvbSBcIi4uL2NvbW1vbi9tYXBwQ29ja3BpdENvbmZpZ1wiO1xyXG5cclxuLy8gRGVjbGFyZXMgRXZlbnQtQXBwSW5pdGlhbGl6ZWRcclxuY2xhc3MgRXZlbnRBcHBJbml0aWFsaXplZCBleHRlbmRzIFR5cGVkRXZlbnQ8TWFwcENvY2twaXRBcHAsIG51bGw+eyB9O1xyXG5cclxuLy8gQm9vdCBjb250YWluZXIgZGVmaW5pdGlvblxyXG5jb25zdCBib290Q29udGVudElkID0gXCJtYXBwQ29ja3BpdENvbnRlbnRcIjtcclxuY29uc3QgbWFpblBhbmVJZCA9IFwibWFwcENvY2twaXRNYWluUGFuZVwiO1xyXG5jb25zdCBib290Q29udGVudCA9IFwiPGRpdiBpZD1cIiArIGJvb3RDb250ZW50SWQgKyAnIHN0eWxlPVwib3ZlcmZsb3c6aGlkZGVuXCI+PC9kaXY+JztcclxuXHJcbi8qKlxyXG4gKiBUaGUgY2xhc3MgcmVwcmVzZW50cyB0aGUgYXBwbGljYXRpb24gbWFpbiBjbGFzcy5cclxuICpcclxuICogQGNsYXNzIE1hcHBDb2NrcGl0QXBwXHJcbiAqL1xyXG5jbGFzcyBNYXBwQ29ja3BpdEFwcCB7XHJcblxyXG4gICAgLy8gRXZlbnRzXHJcbiAgICBldmVudEFwcEluaXRpYWxpemVkID0gbmV3IEV2ZW50QXBwSW5pdGlhbGl6ZWQoKTtcclxuICAgIHByaXZhdGUgX21hcHBDb2NrcGl0V2lkZ2V0OiBXaWRnZXRzLklNYXBwQ29ja3BpdFdpZGdldHx1bmRlZmluZWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIE1hcHBDb2NrcGl0QXBwLlxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0QXBwXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBBcHBDb25zb2xlIGluc3RhbmNlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdEFwcFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZUFwcENvbnNvbGUoKSB7XHJcbiAgICAgICAgaWYgKCEoPGFueT5NYXBwQ29ja3BpdEFwcCkuY3hjb0RlYnVnKSB7XHJcbiAgICAgICAgICAgIC8vIGluIHJlbGVhc2UgbW9kZSB3ZSBvdmVycmlkZSB0aGUgc3RhbmRhcmQgY29uc29sZVxyXG4gICAgICAgICAgICBBcHBDb25zb2xlLmNyZWF0ZSgpOyAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyAuLi4ub3RoZXJ3aXNlIHRoZSBzdGFuZGFyZCBjb25zb2xlIGtlZXBzIGFsaXZlLi4uXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuZCBpbml0aWFsaXplcyB0aGUgbWFwcCBjb2NrcGl0IGFwcC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRBcHBcclxuICAgICAqL1xyXG4gICAgY3JlYXRlKCk6IHZvaWQge1xyXG5cclxuICAgICAgICBpZiAoKDxhbnk+dGhpcykubW9kZSA9PSBcImN4Y29EYmdcIikge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRBcHAoKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdmFyIGluaXRDb21tYW5kczogc3RyaW5nID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHJpbmcoMSk7XHJcbiAgICAgICAgICAgIGlmIChpbml0Q29tbWFuZHMuaW5kZXhPZihcIkRFQlVHXCIpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjeGNvRGJnID0gd2luZG93LnByb21wdChcIkVudGVyIGRlYnVnIHBhc3N3b3JkICFcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3hjb0RiZyA9PSBcImN4Y29EYmdcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LndyaXRlKERpYWdub3N0aWNzLkRFQlVHKTsgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVBcHBDb25zb2xlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkQXBwKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUFwcENvbnNvbGUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZEFwcCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxvYWRBcHAoKSB7XHJcbiAgICAgICAgdGhpcy5hdHRhY2hVbmxvYWRIYW5kbGVyKCk7XHJcbiAgICAgICAgdGhpcy5sb2FkQXBwQ29uZmlndXJhdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZHMgYXBwbGljYXRpb24gY29uZmlndXJhdGlvbiBzZXR0aW5nc1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdEFwcFxyXG4gICAgICovXHJcbiAgICBsb2FkQXBwQ29uZmlndXJhdGlvbigpIHtcclxuICAgICAgICBsZXQgY2ZnRmlsZSA9IFwiLi4vLi4vLi4vXCIgKyBEaXJlY3RvcnlQcm92aWRlci5nZXRBcHBEaXJlY3RvcnkoKSArIFwiY29tbW9uL21hcHBDb2NrcGl0Q29uZmlnU2V0dGluZ3MuanNvblwiO1xyXG4gICAgICAgICQuZ2V0SlNPTiggY2ZnRmlsZSwgKGFwcENmZykgPT4geyB0aGlzLm9uQXBwU2V0dGluZ3NMb2FkZWQoYXBwQ2ZnKTsgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgYWZ0ZXIgdGhlIGFwcCBzZXR0aW5ncyBoYXZlIGJlZW4gbG9hZGVkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gYXBwQ2ZnXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRBcHBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbkFwcFNldHRpbmdzTG9hZGVkKGFwcENmZzogYW55KSB7XHJcblxyXG4gICAgICAgIC8vIGxvYWQgYW5kIHVwZGF0ZSBhcHBsaWNhdGlvbiBzZXR0aW5nc1xyXG4gICAgICAgIE1hcHBDb2NrcGl0Q29uZmlndXJhdGlvbi5pbml0aWFsaXplKGFwcENmZyk7XHJcblxyXG4gICAgICAgIC8vIGJvb3QgdGhlIGFwcGxpY2F0aW9uXHJcbiAgICAgICAgdGhpcy5sb2FkQm9vdENvbnRlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWRzIHRoZSBtYWluIGNvbnRlbnQgXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdEFwcFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGxvYWRCb290Q29udGVudCgpIHtcclxuXHJcbiAgICAgICAgLy8gR2V0IHRoZSBwYWdlIGJvZHlcclxuICAgICAgICB2YXIgcGFnZUJvZHkgPSAkKFwiYm9keVwiKTtcclxuICAgICAgICAvLyAuLi4gYXBwZW5kIHRoZSBtYWluIGNvbnRlbnQgZGl2XHJcbiAgICAgICAgdmFyICRib290Q29udGVudCA9ICQoYm9vdENvbnRlbnQpO1xyXG4gICAgICAgICRib290Q29udGVudFswXS5zdHlsZS5oZWlnaHQgPSAod2luZG93LmlubmVySGVpZ2h0ISkudG9TdHJpbmcoKSArICdweCc7XHJcbiAgICAgICAgdmFyIHVuaXF1ZVJlc2l6ZUlkID0gMTIzO1xyXG4gICAgICAgICQod2luZG93KS5yZXNpemUoKGFyZ3MpID0+IHtcclxuICAgICAgICAgICAgJGJvb3RDb250ZW50WzBdLnN0eWxlLmhlaWdodCA9ICh3aW5kb3cuaW5uZXJIZWlnaHQhKS50b1N0cmluZygpICsgJ3B4JztcclxuXHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh1bmlxdWVSZXNpemVJZCk7XHJcbiAgICAgICAgICAgIHVuaXF1ZVJlc2l6ZUlkID0gc2V0VGltZW91dCgoKT0+dGhpcy5kb25lUmVzaXppbmcoYXJncyksIDUwMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcGFnZUJvZHkuYXBwZW5kKCRib290Q29udGVudCk7XHJcbiAgICAgICBcclxuICAgICAgICAvLyBMb2FkIHRoZSBtYWluIGNvbnRlbnQgaW50byB0aGUgbWFpbiBkaXZcclxuICAgICAgICAkYm9vdENvbnRlbnQubG9hZChcIi4uLy4uLy4uL1wiICsgRGlyZWN0b3J5UHJvdmlkZXIuZ2V0QXBwRGlyZWN0b3J5KCkgKyBcImxheW91dC9tYXBwQ29ja3BpdE1haW4uaHRtbFwiLCAoKSA9PiB7IHRoaXMub25Cb290Q29udGVudExvYWRlZChwYWdlQm9keSk7IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZG9uZVJlc2l6aW5nKGFyZ3MpIHtcclxuICAgICAgICBpZih0aGlzLl9tYXBwQ29ja3BpdFdpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9tYXBwQ29ja3BpdFdpZGdldC5yZXNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlciBjYWxsZWQgYWZ0ZXIgbG9hZGluZyB0aGUgbWFpbiBjb250ZW50IGZpbGUuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SlF1ZXJ5fSBjb250ZW50Q29udGFpbmVyXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRBcHBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBvbkJvb3RDb250ZW50TG9hZGVkKGNvbnRlbnRDb250YWluZXI6IEpRdWVyeSkge1xyXG5cclxuICAgICAgICAvLyBHZXQgdGhlIG1haW4gZGl2XHJcbiAgICAgICAgdmFyIG1haW5MYXlvdXRQYW5lID0gJChcIiNcIiArIG1haW5QYW5lSWQpO1xyXG5cclxuICAgICAgICAvLyBDaGVjayBpZiB0aGUgYm9vdCBkaXYgZXhpc3RzIFxyXG4gICAgICAgIGlmIChtYWluTGF5b3V0UGFuZS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTWFwcENvY2twaXRXaWRnZXQoKTtcclxuICAgICAgICAgICAgdGhpcy5vbkFwcEluaXRpYWxpemVkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY3JlYXRlcyB0aGUgbWFwcCBjb2NrcGl0IHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRBcHBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVNYXBwQ29ja3BpdFdpZGdldCgpIHtcclxuXHJcbiAgICAgICAgdmFyIG1hcHBDb2NrcGl0RGF0YU1vZGVsID0gRGF0YU1vZGVscy5NYXBwQ29ja3BpdERhdGFNb2RlbC5jcmVhdGUoKTtcclxuICAgICAgICBtYXBwQ29ja3BpdERhdGFNb2RlbC5pbml0aWFsaXplKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX21hcHBDb2NrcGl0V2lkZ2V0ID0gV2lkZ2V0cy5NYXBwQ29ja3BpdFdpZGdldC5jcmVhdGUoKTtcclxuICAgICAgICB0aGlzLl9tYXBwQ29ja3BpdFdpZGdldC5kYXRhTW9kZWwgPSBtYXBwQ29ja3BpdERhdGFNb2RlbDtcclxuICAgICAgICB0aGlzLl9tYXBwQ29ja3BpdFdpZGdldC5pbml0aWFsaXplKFwibWFwcENvY2twaXRNYWluUGFuZVwiKTtcclxuICAgICAgICB0aGlzLl9tYXBwQ29ja3BpdFdpZGdldC5yZXNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBOb3RpZmllcyB0aGF0IHRoZSBhcHAgaGFzIGJlZW4gaW5pdGlhbGl6ZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0QXBwXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25BcHBJbml0aWFsaXplZCgpIHtcclxuICAgICAgICB0aGlzLmV2ZW50QXBwSW5pdGlhbGl6ZWQucmFpc2UodGhpcywgbnVsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogYXR0YWNoZXMgYSBoYW5kbGVyIGZvciB1bmxvYWRpbmcgbWFwcCBjb2NrcGl0XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0QXBwXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXR0YWNoVW5sb2FkSGFuZGxlcigpIHtcclxuICAgICAgICB3aW5kb3cub25iZWZvcmV1bmxvYWQgPSAoZSkgPT4geyB0aGlzLmhhbmRsZVVubG9hZChlKTsgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGhhbmRsZXMgdW5sb2FkaW5nIG1hcHAgY29ja3BpdC4uLi5yZWxlYXNpbmcgcmVzb3VyY2VzLCBkaXNjb25uZWN0aW5nIC4uLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QmVmb3JlVW5sb2FkRXZlbnR9IGVcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0QXBwXHJcbiAgICAgKi9cclxuICAgIGhhbmRsZVVubG9hZChlOiBCZWZvcmVVbmxvYWRFdmVudCk6IGFueSB7XHJcbiAgICAgICAgaWYodGhpcy5fbWFwcENvY2twaXRXaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fbWFwcENvY2twaXRXaWRnZXQuZGF0YU1vZGVsLmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgdGhpcy5fbWFwcENvY2twaXRXaWRnZXQuZGlzcG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhcIk1hcHBDb2NrcGl0QXBwOiB1bmxvYWRpbmcgLi4uLlwiKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgTWFwcENvY2twaXRBcHAgfTtcclxuIl19