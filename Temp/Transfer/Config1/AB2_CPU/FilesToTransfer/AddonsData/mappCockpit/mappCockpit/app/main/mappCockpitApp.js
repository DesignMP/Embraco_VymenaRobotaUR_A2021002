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
define(["require", "exports", "../framework/events", "../models/dataModels", "../common/directoryProvider", "../framework/appConsole", "../debug/diagnostics", "../common/mappCockpitConfig", "../common/componentFactory/componentFactory", "../common/componentFactory/componentDefinition", "../common/persistence/persistDataController"], function (require, exports, events_1, DataModels, directoryProvider_1, appConsole_1, diagnostics_1, mappCockpitConfig_1, componentFactory_1, componentDefinition_1, persistDataController_1) {
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
            var initCommands = window.location.search.substring(1);
            if (initCommands.indexOf("CLEAR") > -1 || initCommands.indexOf("clear") > -1) {
                var persistingDataController = new persistDataController_1.PersistDataController(undefined);
                persistingDataController.clearDefaultStorage();
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
            this._mappCockpitWidget = componentFactory_1.ComponentFactory.getInstance().create(new componentDefinition_1.ComponentDefinition("MappCockpitWidget", "MappCockpitWidget"));
            if (this._mappCockpitWidget != undefined) {
                this._mappCockpitWidget.dataModel = mappCockpitDataModel;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcENvY2twaXRBcHAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBwL21haW4vbWFwcENvY2twaXRBcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWFBLGdDQUFnQztJQUNoQztRQUFrQyx1Q0FBZ0M7UUFBbEU7O1FBQW9FLENBQUM7UUFBRCwwQkFBQztJQUFELENBQUMsQUFBckUsQ0FBa0MsbUJBQVUsR0FBeUI7SUFBQSxDQUFDO0lBRXRFLDRCQUE0QjtJQUM1QixJQUFNLGFBQWEsR0FBRyxvQkFBb0IsQ0FBQztJQUMzQyxJQUFNLFVBQVUsR0FBRyxxQkFBcUIsQ0FBQztJQUN6QyxJQUFNLFdBQVcsR0FBRyxVQUFVLEdBQUcsYUFBYSxHQUFHLGlDQUFpQyxDQUFDO0lBRW5GOzs7O09BSUc7SUFDSDtRQU1JOzs7V0FHRztRQUNIO1lBUkEsU0FBUztZQUNULHdCQUFtQixHQUFHLElBQUksbUJBQW1CLEVBQUUsQ0FBQztRQVFoRCxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSyx5Q0FBZ0IsR0FBeEI7WUFDSSxJQUFJLENBQU8sY0FBZSxDQUFDLFNBQVMsRUFBRTtnQkFDbEMsbURBQW1EO2dCQUNuRCx1QkFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ3ZCO1lBQ0Qsb0RBQW9EO1FBQ3hELENBQUM7UUFFRDs7OztXQUlHO1FBQ0gsK0JBQU0sR0FBTjtZQUNJLElBQUksWUFBWSxHQUFXLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvRCxJQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBQztnQkFDeEUsSUFBSSx3QkFBd0IsR0FB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LENBQUMsQ0FBQzthQUN6RTtRQUNMLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNLLHlDQUFnQixHQUF4QjtZQUNJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQy9DLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNLLDRDQUFtQixHQUEzQjtZQUFBLGlCQUVDO1lBREcsTUFBTSxDQUFDLGNBQWMsR0FBRyxVQUFDLENBQUMsSUFBTyxLQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdELENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSCxxQ0FBWSxHQUFaLFVBQWEsQ0FBb0I7WUFDN0IsSUFBRyxJQUFJLENBQUMsa0JBQWtCLElBQUksU0FBUyxFQUFDO2dCQUNwQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUM1QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDckM7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7UUFDbEQsQ0FBQztRQUNMLHFCQUFDO0lBQUQsQ0FBQyxBQWpNRCxJQWlNQztJQUVRLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IENvbW1vbkxpYnMgPSByZXF1aXJlKCcuLi9saWJzL2NvbW1vbicpO1xyXG5pbXBvcnQgeyBUeXBlZEV2ZW50IH0gZnJvbSBcIi4uL2ZyYW1ld29yay9ldmVudHNcIjtcclxuXHJcbmltcG9ydCAqIGFzIERhdGFNb2RlbHMgZnJvbSAnLi4vbW9kZWxzL2RhdGFNb2RlbHMnO1xyXG5pbXBvcnQgeyBEaXJlY3RvcnlQcm92aWRlciB9IGZyb20gXCIuLi9jb21tb24vZGlyZWN0b3J5UHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgQXBwQ29uc29sZSB9IGZyb20gXCIuLi9mcmFtZXdvcmsvYXBwQ29uc29sZVwiO1xyXG5pbXBvcnQgeyBEaWFnbm9zdGljcyB9IGZyb20gXCIuLi9kZWJ1Zy9kaWFnbm9zdGljc1wiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbmZpZ3VyYXRpb24gfSBmcm9tIFwiLi4vY29tbW9uL21hcHBDb2NrcGl0Q29uZmlnXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudEZhY3RvcnkgfSBmcm9tIFwiLi4vY29tbW9uL2NvbXBvbmVudEZhY3RvcnkvY29tcG9uZW50RmFjdG9yeVwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnREZWZpbml0aW9uIH0gZnJvbSBcIi4uL2NvbW1vbi9jb21wb25lbnRGYWN0b3J5L2NvbXBvbmVudERlZmluaXRpb25cIjtcclxuaW1wb3J0IHsgUGVyc2lzdERhdGFDb250cm9sbGVyIH0gZnJvbSBcIi4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9wZXJzaXN0RGF0YUNvbnRyb2xsZXJcIjtcclxuaW1wb3J0IHsgSU1hcHBDb2NrcGl0V2lkZ2V0IH0gZnJvbSBcIi4uL3dpZGdldHMvd2lkZ2V0c1wiO1xyXG5cclxuLy8gRGVjbGFyZXMgRXZlbnQtQXBwSW5pdGlhbGl6ZWRcclxuY2xhc3MgRXZlbnRBcHBJbml0aWFsaXplZCBleHRlbmRzIFR5cGVkRXZlbnQ8TWFwcENvY2twaXRBcHAsIG51bGw+eyB9O1xyXG5cclxuLy8gQm9vdCBjb250YWluZXIgZGVmaW5pdGlvblxyXG5jb25zdCBib290Q29udGVudElkID0gXCJtYXBwQ29ja3BpdENvbnRlbnRcIjtcclxuY29uc3QgbWFpblBhbmVJZCA9IFwibWFwcENvY2twaXRNYWluUGFuZVwiO1xyXG5jb25zdCBib290Q29udGVudCA9IFwiPGRpdiBpZD1cIiArIGJvb3RDb250ZW50SWQgKyAnIHN0eWxlPVwib3ZlcmZsb3c6aGlkZGVuXCI+PC9kaXY+JztcclxuXHJcbi8qKlxyXG4gKiBUaGUgY2xhc3MgcmVwcmVzZW50cyB0aGUgYXBwbGljYXRpb24gbWFpbiBjbGFzcy5cclxuICpcclxuICogQGNsYXNzIE1hcHBDb2NrcGl0QXBwXHJcbiAqL1xyXG5jbGFzcyBNYXBwQ29ja3BpdEFwcCB7XHJcblxyXG4gICAgLy8gRXZlbnRzXHJcbiAgICBldmVudEFwcEluaXRpYWxpemVkID0gbmV3IEV2ZW50QXBwSW5pdGlhbGl6ZWQoKTtcclxuICAgIHByaXZhdGUgX21hcHBDb2NrcGl0V2lkZ2V0OiBJTWFwcENvY2twaXRXaWRnZXR8dW5kZWZpbmVkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBNYXBwQ29ja3BpdEFwcC5cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdEFwcFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gQXBwQ29uc29sZSBpbnN0YW5jZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRBcHBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVBcHBDb25zb2xlKCkge1xyXG4gICAgICAgIGlmICghKDxhbnk+TWFwcENvY2twaXRBcHApLmN4Y29EZWJ1Zykge1xyXG4gICAgICAgICAgICAvLyBpbiByZWxlYXNlIG1vZGUgd2Ugb3ZlcnJpZGUgdGhlIHN0YW5kYXJkIGNvbnNvbGVcclxuICAgICAgICAgICAgQXBwQ29uc29sZS5jcmVhdGUoKTsgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gLi4uLm90aGVyd2lzZSB0aGUgc3RhbmRhcmQgY29uc29sZSBrZWVwcyBhbGl2ZS4uLlxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbmQgaW5pdGlhbGl6ZXMgdGhlIG1hcHAgY29ja3BpdCBhcHAuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0QXBwXHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZSgpOiB2b2lkIHtcclxuICAgICAgICB2YXIgaW5pdENvbW1hbmRzOiBzdHJpbmcgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cmluZygxKTtcclxuICAgICAgICBpZihpbml0Q29tbWFuZHMuaW5kZXhPZihcIkNMRUFSXCIpID4gLTEgfHwgaW5pdENvbW1hbmRzLmluZGV4T2YoXCJjbGVhclwiKSA+IC0xKXsgXHJcbiAgICAgICAgICAgIGxldCBwZXJzaXN0aW5nRGF0YUNvbnRyb2xsZXIgPSBuZXcgUGVyc2lzdERhdGFDb250cm9sbGVyKHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgIHBlcnNpc3RpbmdEYXRhQ29udHJvbGxlci5jbGVhckRlZmF1bHRTdG9yYWdlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICgoPGFueT50aGlzKS5tb2RlID09IFwiY3hjb0RiZ1wiKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEFwcCgpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpZiAoaW5pdENvbW1hbmRzLmluZGV4T2YoXCJERUJVR1wiKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY3hjb0RiZyA9IHdpbmRvdy5wcm9tcHQoXCJFbnRlciBkZWJ1ZyBwYXNzd29yZCAhXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGN4Y29EYmcgPT0gXCJjeGNvRGJnXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC53cml0ZShEaWFnbm9zdGljcy5ERUJVRyk7ICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlQXBwQ29uc29sZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZEFwcCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVBcHBDb25zb2xlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRBcHAoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsb2FkQXBwKCkge1xyXG4gICAgICAgIHRoaXMuYXR0YWNoVW5sb2FkSGFuZGxlcigpO1xyXG4gICAgICAgIHRoaXMubG9hZEFwcENvbmZpZ3VyYXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWRzIGFwcGxpY2F0aW9uIGNvbmZpZ3VyYXRpb24gc2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRBcHBcclxuICAgICAqL1xyXG4gICAgbG9hZEFwcENvbmZpZ3VyYXRpb24oKSB7XHJcbiAgICAgICAgbGV0IGNmZ0ZpbGUgPSBcIi4uLy4uLy4uL1wiICsgRGlyZWN0b3J5UHJvdmlkZXIuZ2V0QXBwRGlyZWN0b3J5KCkgKyBcImNvbW1vbi9tYXBwQ29ja3BpdENvbmZpZ1NldHRpbmdzLmpzb25cIjtcclxuICAgICAgICAkLmdldEpTT04oIGNmZ0ZpbGUsIChhcHBDZmcpID0+IHsgdGhpcy5vbkFwcFNldHRpbmdzTG9hZGVkKGFwcENmZyk7IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIGFmdGVyIHRoZSBhcHAgc2V0dGluZ3MgaGF2ZSBiZWVuIGxvYWRlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGFwcENmZ1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0QXBwXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25BcHBTZXR0aW5nc0xvYWRlZChhcHBDZmc6IGFueSkge1xyXG5cclxuICAgICAgICAvLyBsb2FkIGFuZCB1cGRhdGUgYXBwbGljYXRpb24gc2V0dGluZ3NcclxuICAgICAgICBNYXBwQ29ja3BpdENvbmZpZ3VyYXRpb24uaW5pdGlhbGl6ZShhcHBDZmcpO1xyXG5cclxuICAgICAgICAvLyBib290IHRoZSBhcHBsaWNhdGlvblxyXG4gICAgICAgIHRoaXMubG9hZEJvb3RDb250ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkcyB0aGUgbWFpbiBjb250ZW50IFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRBcHBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBsb2FkQm9vdENvbnRlbnQoKSB7XHJcblxyXG4gICAgICAgIC8vIEdldCB0aGUgcGFnZSBib2R5XHJcbiAgICAgICAgdmFyIHBhZ2VCb2R5ID0gJChcImJvZHlcIik7XHJcbiAgICAgICAgLy8gLi4uIGFwcGVuZCB0aGUgbWFpbiBjb250ZW50IGRpdlxyXG4gICAgICAgIHZhciAkYm9vdENvbnRlbnQgPSAkKGJvb3RDb250ZW50KTtcclxuICAgICAgICAkYm9vdENvbnRlbnRbMF0uc3R5bGUuaGVpZ2h0ID0gKHdpbmRvdy5pbm5lckhlaWdodCEpLnRvU3RyaW5nKCkgKyAncHgnO1xyXG4gICAgICAgIHZhciB1bmlxdWVSZXNpemVJZCA9IDEyMztcclxuICAgICAgICAkKHdpbmRvdykucmVzaXplKChhcmdzKSA9PiB7XHJcbiAgICAgICAgICAgICRib290Q29udGVudFswXS5zdHlsZS5oZWlnaHQgPSAod2luZG93LmlubmVySGVpZ2h0ISkudG9TdHJpbmcoKSArICdweCc7XHJcblxyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodW5pcXVlUmVzaXplSWQpO1xyXG4gICAgICAgICAgICB1bmlxdWVSZXNpemVJZCA9IHNldFRpbWVvdXQoKCk9PnRoaXMuZG9uZVJlc2l6aW5nKGFyZ3MpLCA1MDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHBhZ2VCb2R5LmFwcGVuZCgkYm9vdENvbnRlbnQpO1xyXG4gICAgICAgXHJcbiAgICAgICAgLy8gTG9hZCB0aGUgbWFpbiBjb250ZW50IGludG8gdGhlIG1haW4gZGl2XHJcbiAgICAgICAgJGJvb3RDb250ZW50LmxvYWQoXCIuLi8uLi8uLi9cIiArIERpcmVjdG9yeVByb3ZpZGVyLmdldEFwcERpcmVjdG9yeSgpICsgXCJsYXlvdXQvbWFwcENvY2twaXRNYWluLmh0bWxcIiwgKCkgPT4geyB0aGlzLm9uQm9vdENvbnRlbnRMb2FkZWQocGFnZUJvZHkpOyB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRvbmVSZXNpemluZyhhcmdzKSB7XHJcbiAgICAgICAgaWYodGhpcy5fbWFwcENvY2twaXRXaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fbWFwcENvY2twaXRXaWRnZXQucmVzaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZXIgY2FsbGVkIGFmdGVyIGxvYWRpbmcgdGhlIG1haW4gY29udGVudCBmaWxlLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0pRdWVyeX0gY29udGVudENvbnRhaW5lclxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0QXBwXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgb25Cb290Q29udGVudExvYWRlZChjb250ZW50Q29udGFpbmVyOiBKUXVlcnkpIHtcclxuXHJcbiAgICAgICAgLy8gR2V0IHRoZSBtYWluIGRpdlxyXG4gICAgICAgIHZhciBtYWluTGF5b3V0UGFuZSA9ICQoXCIjXCIgKyBtYWluUGFuZUlkKTtcclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIGJvb3QgZGl2IGV4aXN0cyBcclxuICAgICAgICBpZiAobWFpbkxheW91dFBhbmUubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU1hcHBDb2NrcGl0V2lkZ2V0KCk7XHJcbiAgICAgICAgICAgIHRoaXMub25BcHBJbml0aWFsaXplZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZXMgdGhlIG1hcHAgY29ja3BpdCB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0QXBwXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlTWFwcENvY2twaXRXaWRnZXQoKSB7XHJcblxyXG4gICAgICAgIHZhciBtYXBwQ29ja3BpdERhdGFNb2RlbCA9IERhdGFNb2RlbHMuTWFwcENvY2twaXREYXRhTW9kZWwuY3JlYXRlKCk7XHJcbiAgICAgICAgbWFwcENvY2twaXREYXRhTW9kZWwuaW5pdGlhbGl6ZSgpO1xyXG5cclxuICAgICAgICB0aGlzLl9tYXBwQ29ja3BpdFdpZGdldCA9IENvbXBvbmVudEZhY3RvcnkuZ2V0SW5zdGFuY2UoKS5jcmVhdGUobmV3IENvbXBvbmVudERlZmluaXRpb24oXCJNYXBwQ29ja3BpdFdpZGdldFwiLCBcIk1hcHBDb2NrcGl0V2lkZ2V0XCIpKSBhcyBJTWFwcENvY2twaXRXaWRnZXQ7XHJcbiAgICAgICAgaWYodGhpcy5fbWFwcENvY2twaXRXaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fbWFwcENvY2twaXRXaWRnZXQuZGF0YU1vZGVsID0gbWFwcENvY2twaXREYXRhTW9kZWw7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcHBDb2NrcGl0V2lkZ2V0LmluaXRpYWxpemUoXCJtYXBwQ29ja3BpdE1haW5QYW5lXCIpO1xyXG4gICAgICAgICAgICB0aGlzLl9tYXBwQ29ja3BpdFdpZGdldC5yZXNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTm90aWZpZXMgdGhhdCB0aGUgYXBwIGhhcyBiZWVuIGluaXRpYWxpemVkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdEFwcFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uQXBwSW5pdGlhbGl6ZWQoKSB7XHJcbiAgICAgICAgdGhpcy5ldmVudEFwcEluaXRpYWxpemVkLnJhaXNlKHRoaXMsIG51bGwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIGF0dGFjaGVzIGEgaGFuZGxlciBmb3IgdW5sb2FkaW5nIG1hcHAgY29ja3BpdFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdEFwcFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGF0dGFjaFVubG9hZEhhbmRsZXIoKSB7XHJcbiAgICAgICAgd2luZG93Lm9uYmVmb3JldW5sb2FkID0gKGUpID0+IHsgdGhpcy5oYW5kbGVVbmxvYWQoZSk7IH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBoYW5kbGVzIHVubG9hZGluZyBtYXBwIGNvY2twaXQuLi4ucmVsZWFzaW5nIHJlc291cmNlcywgZGlzY29ubmVjdGluZyAuLi5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0JlZm9yZVVubG9hZEV2ZW50fSBlXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdEFwcFxyXG4gICAgICovXHJcbiAgICBoYW5kbGVVbmxvYWQoZTogQmVmb3JlVW5sb2FkRXZlbnQpOiBhbnkge1xyXG4gICAgICAgIGlmKHRoaXMuX21hcHBDb2NrcGl0V2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcHBDb2NrcGl0V2lkZ2V0LmRhdGFNb2RlbC5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcHBDb2NrcGl0V2lkZ2V0LmRpc3Bvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJNYXBwQ29ja3BpdEFwcDogdW5sb2FkaW5nIC4uLi5cIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IE1hcHBDb2NrcGl0QXBwIH07XHJcbiJdfQ==