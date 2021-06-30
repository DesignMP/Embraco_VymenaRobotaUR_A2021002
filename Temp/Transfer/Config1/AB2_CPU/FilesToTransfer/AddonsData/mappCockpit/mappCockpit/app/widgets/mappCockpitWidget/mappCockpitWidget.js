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
define(["require", "exports", "../common/widgetBase", "../tabWidget/interfaces/tabWidgetInterface", "../common/viewTypeProvider", "../../framework/property", "../common/busyInformation", "../common/alertDialog", "../../common/persistence/persistDataController", "../../common/persistence/persistDataProvider", "./defaultComponentSettings"], function (require, exports, widgetBase_1, tabWidgetInterface_1, viewTypeProvider_1, property_1, busyInformation_1, alertDialog_1, persistDataController_1, persistDataProvider_1, defaultComponentSettings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MappCockpitWidget = /** @class */ (function (_super) {
        __extends(MappCockpitWidget, _super);
        function MappCockpitWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._sideBarWidgetActivatedHandler = function (sender, args) { return _this.onContentActivated(sender, args); };
            _this._componentOverviewOpenViewHandler = function (sender, args) { return _this.onComponentOverviewWidgetOpenView(sender, args); };
            _this._traceOverviewOpenViewHandler = function (sender, args) { return _this.onTraceOverviewWidgetOpenView(sender, args); };
            _this._mainModelConnectionChangedHandler = function (sender, connected) { return _this.connectionChanged(sender, connected); };
            return _this;
        }
        /**
         *
         *
         * @param {string} layoutContainerId
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.initialize = function (layoutContainerId) {
            _super.prototype.initialize.call(this, layoutContainerId);
        };
        /**
         * Creates the widget content and eventually subwidgets
         *
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.initialized = function () {
            var _this = this;
            _super.prototype.initialized.call(this);
            // create the start page
            this.createStartPageWidget();
            // connect the main data model
            this.dataModel = this.component.getSubComponent(defaultComponentSettings_1.DefaultComponentSettings.MappCockpitDataModelId);
            var mainDataModel = this.dataModel;
            var mainMappCockpitModel = mainDataModel.dataSource;
            // wait for successfull connection
            mainMappCockpitModel.eventModelConnectionChanged.attach(this._mainModelConnectionChangedHandler);
            // connect the main model
            mainMappCockpitModel.connect();
            this._mainNavigationWidget.selectTab("StartView", "Startpage", viewTypeProvider_1.ViewType.Overview);
            var persistDataController = new persistDataController_1.PersistDataController(persistDataProvider_1.PersistDataProvider.getInstance());
            // Load data from storage for startup
            (function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, persistDataController.connect()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, persistDataController.load()];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); })();
        };
        MappCockpitWidget.prototype.initializeComponent = function () {
            this.component.defaultSettingsDataId = defaultComponentSettings_1.DefaultComponentSettings.WidgetDefinitionId;
            this.component.disablePersisting();
        };
        /**
         * Returns the default component settings for this widget
         *
         * @returns {ComponentSettings|undefined)}
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.getDefaultComponentSettings = function () {
            return defaultComponentSettings_1.DefaultComponentSettings.getMappCockpitWidgetDefinition();
        };
        /**
         * Dispose this widget
         *
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.dispose = function () {
            if (this._mainNavigationWidget != undefined) {
                this._mainNavigationWidget.sideBarWidget.eventWidgetActivated.detach(this._sideBarWidgetActivatedHandler);
                this._mainNavigationWidget.dataModel.dispose();
                this._mainNavigationWidget.dispose();
            }
            if (this._traceOverviewWidget != undefined) {
                this._traceOverviewWidget.eventOpenView.detach(this._traceOverviewOpenViewHandler);
            }
            if (this._componentOverviewWidget != undefined) {
                this._componentOverviewWidget.eventOpenView.detach(this._componentOverviewOpenViewHandler);
            }
            var mainDataModel = this.dataModel;
            if (mainDataModel != undefined) {
                var mainMappCockpitModel = mainDataModel.dataSource;
                if (mainMappCockpitModel != undefined) {
                    mainMappCockpitModel.eventModelConnectionChanged.detach(this._mainModelConnectionChangedHandler);
                }
            }
            _super.prototype.dispose.call(this);
        };
        /**
         *
         *
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.createLayout = function () {
            this._mainNavigationWidget = this.component.getSubComponent(defaultComponentSettings_1.DefaultComponentSettings.MainNavigationWidgetId);
            if (this._mainNavigationWidget != undefined) {
                this._mainNavigationWidget.initialize(this.parentContentId);
                this._mainNavigationWidget.dataModel = this.dataModel;
                this._mainNavigationWidget.sideBarWidget.eventWidgetActivated.attach(this._sideBarWidgetActivatedHandler);
            }
            this.resize(window.innerWidth, window.innerHeight);
            // Init AlertBox
            new alertDialog_1.AlertDialog();
        };
        /**
         *
         *
         * @param {number} width
         * @param {number} height
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.resize = function (width, height) {
            this._actualWidth = width;
            this._actualHeight = height;
            if (this._mainNavigationWidget != undefined) {
                this._mainNavigationWidget.resize(width, height);
            }
        };
        /**
         * Load the style informations for the widget
         *
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.loadStyles = function () {
            _super.prototype.addStyle.call(this, "widgets/mappCockpitWidget/style/css/commonStyleVariables.css");
            _super.prototype.addStyle.call(this, "widgets/mappCockpitWidget/style/css/commonStyle.css");
            _super.prototype.addStyle.call(this, "widgets/mappCockpitWidget/style/css/defaultScrollbarStyle.css");
            _super.prototype.addStyle.call(this, "widgets/mappCockpitWidget/style/css/commonToolbarStyle.css");
            _super.prototype.addStyle.call(this, "widgets/mappCockpitWidget/style/css/alertBoxStyle.css");
            _super.prototype.addStyle.call(this, "widgets/mappCockpitWidget/style/css/dragDropStyle.css");
        };
        /**
         *
         *
         * @private
         * @param {*} sender
         * @param {*} args
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.onContentActivated = function (sender, args) {
            args.widget.activate();
        };
        MappCockpitWidget.prototype.connectionChanged = function (sender, connected) {
            if (connected) {
                this.onMainModelConnected(sender);
            }
            else {
                this.onMainModelDisconnected();
            }
        };
        /**
         * Called after the main model has been connected
         *
         * @private
         * @param {MappCockpitComponentDataModel} mainMappCockpitModel
         * @returns
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.onMainModelConnected = function (mainMappCockpitModel) {
            console.log("MappCockpitWidget.onMainModelConnected()");
            try {
                this.changeUserToAnonymous();
                var loginWidget = this.component.getSubComponent(defaultComponentSettings_1.DefaultComponentSettings.LoginWidgetId);
                if (loginWidget != undefined) {
                    loginWidget.loginInterface = { commandChangeUser: mainMappCockpitModel.commandChangeUser };
                    this._mainNavigationWidget.sideBarWidget.addWidget(loginWidget, "loginWidget", viewTypeProvider_1.ViewType.User, viewTypeProvider_1.ViewTypeProvider.getInstance().getIconByViewType(viewTypeProvider_1.ViewType.User));
                }
                this.createContentWidgets();
            }
            catch (error) {
                console.error(error);
            }
            this._mainNavigationWidget.selectTab("StartView", "Startpage", viewTypeProvider_1.ViewType.Overview);
        };
        /**
         * Called after the main model has been disconnected
         *
         * @private
         * @returns {*}
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.onMainModelDisconnected = function () {
            console.log("MappCockpitWidget.onMainModelDisconnected()");
            this.setBusyInformation(new busyInformation_1.BusyInformation("Connection to server is lost!<br/>&nbsp;Refresh page to reconnect.", busyInformation_1.ImageId.disconnectedImage));
            this.setBusy(true);
        };
        /**
         * Creates the content widgets
         *
         * @private
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.createContentWidgets = function () {
            this.createComponentOverviewWidget();
            this.createTraceOverviewWidget();
            this.createToolsOverviewWidget();
            this.createDummyWidget();
        };
        /**
         * Add the start page widget
         *
         * @private
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.createStartPageWidget = function () {
            var startPageWidget = this.component.getSubComponent(defaultComponentSettings_1.DefaultComponentSettings.StartPageWidgetId);
            if (startPageWidget != undefined) {
                this._mainNavigationWidget.addSideBarTab("StartView", "widgets/mappCockpitWidget/style/images/Areas/StartPageArea.svg");
                this._mainNavigationWidget.addWidget(startPageWidget, "Startpage", viewTypeProvider_1.ViewType.Overview, { parent: "StartView", widgetPosition: tabWidgetInterface_1.TabWidgetWidgetPositons.left });
            }
        };
        MappCockpitWidget.prototype.createDummyWidget = function () {
            var dummyWidget = this.component.getSubComponent(defaultComponentSettings_1.DefaultComponentSettings.DummyWidgetId);
            if (dummyWidget != undefined) {
                this._mainNavigationWidget.addSideBarTab("DummyView", "widgets/mappCockpitWidget/style/images/Areas/ToolsArea.svg");
                this._mainNavigationWidget.addWidget(dummyWidget, "DummyWidget", viewTypeProvider_1.ViewType.Overview, { parent: "DummyView", widgetPosition: tabWidgetInterface_1.TabWidgetWidgetPositons.left });
            }
        };
        /**
         * Add the tools overview widget
         *
         * @private
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.createToolsOverviewWidget = function () {
            var _this = this;
            var toolsOverviewWidget = this.component.getSubComponent(defaultComponentSettings_1.DefaultComponentSettings.ToolsOverviewWidgetId);
            if (toolsOverviewWidget != undefined) {
                this._mainNavigationWidget.addSideBarTab("ToolsView", "widgets/mappCockpitWidget/style/images/Areas/ToolsArea.svg");
                // read the available components
                if (this.dataModel.dataSource.components != undefined &&
                    this.dataModel.dataSource.components.length > 0) {
                    if (toolsOverviewWidget != undefined) {
                        this.createToolsOverviewContent(this.dataModel.dataSource.components, toolsOverviewWidget);
                    }
                }
                else {
                    this.dataModel.dataSource.componentsSource.read(function (components) {
                        if (toolsOverviewWidget != undefined) {
                            _this.createToolsOverviewContent(components, toolsOverviewWidget);
                        }
                    });
                }
            }
        };
        /**
         * Creates the content of the tools widget
         *
         * @private
         * @param {MappCockpitComponent[]} components
         * @param {Widgets.IComponentOverviewWidget} toolsOverviewWidget
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.createToolsOverviewContent = function (components, toolsOverviewWidget) {
            // create and initialize components link
            var componentsLink = property_1.Property.create([]);
            componentsLink.value = components;
            toolsOverviewWidget.components = componentsLink;
            // add overview widget
            this._mainNavigationWidget.addWidget(toolsOverviewWidget, "ToolsOverview", viewTypeProvider_1.ViewType.Overview, { parent: "ToolsView", widgetPosition: tabWidgetInterface_1.TabWidgetWidgetPositons.left });
        };
        /**
         * Add the component overview widget
         *
         * @private
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.createComponentOverviewWidget = function () {
            var _this = this;
            this._componentOverviewWidget = this.component.getSubComponent(defaultComponentSettings_1.DefaultComponentSettings.ComponentOverviewWidgetId);
            if (this._componentOverviewWidget != undefined) {
                this._mainNavigationWidget.addSideBarTab("ComponentsView", "widgets/mappCockpitWidget/style/images/Areas/ComponentArea.svg");
                // read the available user components
                this.dataModel.dataSource.userComponentsSource.read(function (userComponents) {
                    _this.createComponentOverviewContent(userComponents);
                });
            }
        };
        /**
         * Creates the content of the overview widget
         *
         * @private
         * @param {MappCockpitComponent[]} userComponents
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.createComponentOverviewContent = function (userComponents) {
            // create and initialize components link
            var componentsLink = property_1.Property.create([]);
            componentsLink.value = userComponents;
            if (this._componentOverviewWidget != undefined) {
                this._componentOverviewWidget.components = componentsLink;
                // add overview widget
                this._mainNavigationWidget.addWidget(this._componentOverviewWidget, "ComponentOverview", viewTypeProvider_1.ViewType.Overview, { parent: "ComponentsView", widgetPosition: tabWidgetInterface_1.TabWidgetWidgetPositons.left });
                this._componentOverviewWidget.eventOpenView.attach(this._componentOverviewOpenViewHandler);
            }
        };
        /**
         *
         *
         * @private
         * @param {*} sender
         * @param {EventOpenViewArgs} args
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.onComponentOverviewWidgetOpenView = function (sender, args) {
            this._mainNavigationWidget.addView("ComponentsView", args.component, args.viewType, true);
        };
        /**
         * Changes the user to anonymous
         *
         * @private
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.changeUserToAnonymous = function () {
            var mainDataModel = this.dataModel;
            var userInfo = { username: "Anonymous", password: "" };
            mainDataModel.dataSource.commandChangeUser.execute(userInfo, function (userRoles) {
                console.log("%o Logged in with roles: %o", userInfo.username, userRoles);
            }, function (error) {
                console.error("Could not log in: %o %o", userInfo.username, error);
            });
        };
        /**
         * creates the traceview widget
         *
         * @private
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.createTraceOverviewWidget = function () {
            var _this = this;
            this._traceOverviewWidget = this.component.getSubComponent(defaultComponentSettings_1.DefaultComponentSettings.TraceOverviewWidgetId);
            if (this._traceOverviewWidget != undefined) {
                this._mainNavigationWidget.addSideBarTab("TraceView", "widgets/mappCockpitWidget/style/images/Areas/TraceArea.svg");
                // initialize the trace provider
                this.dataModel.dataSource.traceProvider.initialize().then(function () {
                    var traceComponents = _this.dataModel.dataSource.traceProvider.traceComponents;
                    var traceComponentsLink = property_1.Property.create([]);
                    traceComponentsLink.value = traceComponents;
                    if (_this._traceOverviewWidget != undefined) {
                        _this._traceOverviewWidget.components = traceComponentsLink;
                        _this._mainNavigationWidget.addWidget(_this._traceOverviewWidget, "TraceOverview", viewTypeProvider_1.ViewType.Overview, { parent: "TraceView", widgetPosition: tabWidgetInterface_1.TabWidgetWidgetPositons.left });
                        _this._traceOverviewWidget.eventOpenView.attach(_this._traceOverviewOpenViewHandler);
                    }
                });
            }
        };
        /**
         *
         *
         * @private
         * @param {*} sender
         * @param {EventOpenViewArgs} args
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.onTraceOverviewWidgetOpenView = function (sender, args) {
            this._mainNavigationWidget.addView("TraceView", args.component, args.viewType, true);
        };
        return MappCockpitWidget;
    }(widgetBase_1.WidgetBase));
    exports.MappCockpitWidget = MappCockpitWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcENvY2twaXRXaWRnZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvbWFwcENvY2twaXRXaWRnZXQvbWFwcENvY2twaXRXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQXFCQTtRQUFnQyxxQ0FBVTtRQUExQztZQUFBLHFFQXVZQztZQWpZVyxvQ0FBOEIsR0FBRyxVQUFDLE1BQU0sRUFBQyxJQUFJLElBQUcsT0FBQSxLQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxFQUFwQyxDQUFvQyxDQUFDO1lBQ3JGLHVDQUFpQyxHQUFHLFVBQUMsTUFBTSxFQUFFLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxpQ0FBaUMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQXBELENBQW9ELENBQUE7WUFDMUcsbUNBQTZCLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLDZCQUE2QixDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsRUFBL0MsQ0FBK0MsQ0FBQztZQUVqRyx3Q0FBa0MsR0FBRyxVQUFDLE1BQU0sRUFBQyxTQUFTLElBQUssT0FBQSxLQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxFQUF6QyxDQUF5QyxDQUFDOztRQTZYakgsQ0FBQztRQTNYRzs7Ozs7V0FLRztRQUNILHNDQUFVLEdBQVYsVUFBVyxpQkFBeUI7WUFDaEMsaUJBQU0sVUFBVSxZQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDeEMsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSCx1Q0FBVyxHQUFYO1lBQUEsaUJBMEJDO1lBekJHLGlCQUFNLFdBQVcsV0FBRSxDQUFDO1lBRXBCLHdCQUF3QjtZQUN4QixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FB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b0IsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEtBQUksQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO3FCQUN0RjtnQkFDTCxDQUFDLENBQUMsQ0FBQzthQUNOO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSyx5REFBNkIsR0FBckMsVUFBc0MsTUFBTSxFQUFFLElBQXVCO1lBQ2pFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUN4RixDQUFDO1FBQ0wsd0JBQUM7SUFBRCxDQUFDLEFBdllELENBQWdDLHVCQUFVLEdBdVl6QztJQUVRLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFdpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL3dpZGdldEJhc2VcIjtcclxuXHJcbmltcG9ydCAqIGFzIERhdGFNb2RlbHMgZnJvbSAnLi4vLi4vbW9kZWxzL2RhdGFNb2RlbHMnO1xyXG5pbXBvcnQgeyBJTWFwcENvY2twaXRXaWRnZXQgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL21hcHBDb2NrcGl0V2lkZ2V0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFRhYldpZGdldFdpZGdldFBvc2l0b25zIH0gZnJvbSBcIi4uL3RhYldpZGdldC9pbnRlcmZhY2VzL3RhYldpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBFdmVudE9wZW5WaWV3QXJncyB9IGZyb20gXCIuLi9jb21tb24vZXZlbnRPcGVuVmlld0FyZ3NcIjtcclxuaW1wb3J0IHsgVmlld1R5cGUsIFZpZXdUeXBlUHJvdmlkZXIgfSBmcm9tIFwiLi4vY29tbW9uL3ZpZXdUeXBlUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgUHJvcGVydHkgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL3Byb3BlcnR5XCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9vbmxpbmUvbWFwcENvY2twaXRDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRUcmFjZUNvbXBvbmVudCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvZGlhZ25vc3RpY3MvdHJhY2UvbWFwcENvY2twaXRUcmFjZUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvb25saW5lL2NvbXBvbmVudHNEYXRhTW9kZWxcIjtcclxuaW1wb3J0IHsgQnVzeUluZm9ybWF0aW9uLCBJbWFnZUlkIH0gZnJvbSBcIi4uL2NvbW1vbi9idXN5SW5mb3JtYXRpb25cIjtcclxuaW1wb3J0IHsgQWxlcnREaWFsb2cgfSBmcm9tIFwiLi4vY29tbW9uL2FsZXJ0RGlhbG9nXCI7XHJcbmltcG9ydCB7IFBlcnNpc3REYXRhQ29udHJvbGxlciB9IGZyb20gXCIuLi8uLi9jb21tb24vcGVyc2lzdGVuY2UvcGVyc2lzdERhdGFDb250cm9sbGVyXCI7XHJcbmltcG9ydCB7IFBlcnNpc3REYXRhUHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3BlcnNpc3RlbmNlL3BlcnNpc3REYXRhUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgSUxvZ2luV2lkZ2V0LCBJQ29tcG9uZW50T3ZlcnZpZXdXaWRnZXQsIElNYWluTmF2aWdhdGlvbldpZGdldCwgSVRyYWNlT3ZlcnZpZXdXaWRnZXQsIElUb29sc092ZXJ2aWV3V2lkZ2V0IH0gZnJvbSBcIi4uLy4uL3dpZGdldHMvd2lkZ2V0c1wiO1xyXG5pbXBvcnQgeyBJV2lkZ2V0IH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL3dpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi9kZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50U2V0dGluZ3NcIjtcclxuXHJcblxyXG5jbGFzcyBNYXBwQ29ja3BpdFdpZGdldCBleHRlbmRzIFdpZGdldEJhc2UgaW1wbGVtZW50cyBJTWFwcENvY2twaXRXaWRnZXR7XHJcblxyXG4gICAgcHJpdmF0ZSBfbWFpbk5hdmlnYXRpb25XaWRnZXQhIDogSU1haW5OYXZpZ2F0aW9uV2lkZ2V0O1xyXG4gICAgcHJpdmF0ZSBfdHJhY2VPdmVydmlld1dpZGdldDogSVRyYWNlT3ZlcnZpZXdXaWRnZXR8dW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfY29tcG9uZW50T3ZlcnZpZXdXaWRnZXQ6IElDb21wb25lbnRPdmVydmlld1dpZGdldHx1bmRlZmluZWQ7XHJcbiAgICBcclxuICAgIHByaXZhdGUgX3NpZGVCYXJXaWRnZXRBY3RpdmF0ZWRIYW5kbGVyID0gKHNlbmRlcixhcmdzKT0+dGhpcy5vbkNvbnRlbnRBY3RpdmF0ZWQoc2VuZGVyLGFyZ3MpO1xyXG4gICAgcHJpdmF0ZSBfY29tcG9uZW50T3ZlcnZpZXdPcGVuVmlld0hhbmRsZXIgPSAoc2VuZGVyLCBhcmdzKSA9PiB0aGlzLm9uQ29tcG9uZW50T3ZlcnZpZXdXaWRnZXRPcGVuVmlldyhzZW5kZXIsIGFyZ3MpXHJcbiAgICBwcml2YXRlIF90cmFjZU92ZXJ2aWV3T3BlblZpZXdIYW5kbGVyID0gKHNlbmRlcixhcmdzKSA9PiB0aGlzLm9uVHJhY2VPdmVydmlld1dpZGdldE9wZW5WaWV3KHNlbmRlcixhcmdzKTtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfbWFpbk1vZGVsQ29ubmVjdGlvbkNoYW5nZWRIYW5kbGVyID0gKHNlbmRlcixjb25uZWN0ZWQpID0+IHRoaXMuY29ubmVjdGlvbkNoYW5nZWQoc2VuZGVyLCBjb25uZWN0ZWQpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGF5b3V0Q29udGFpbmVySWRcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBpbml0aWFsaXplKGxheW91dENvbnRhaW5lcklkOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlci5pbml0aWFsaXplKGxheW91dENvbnRhaW5lcklkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIHdpZGdldCBjb250ZW50IGFuZCBldmVudHVhbGx5IHN1YndpZGdldHNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRXaWRnZXRcclxuICAgICAqL1xyXG4gICAgaW5pdGlhbGl6ZWQoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZWQoKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBjcmVhdGUgdGhlIHN0YXJ0IHBhZ2VcclxuICAgICAgICB0aGlzLmNyZWF0ZVN0YXJ0UGFnZVdpZGdldCgpO1xyXG5cclxuICAgICAgICAvLyBjb25uZWN0IHRoZSBtYWluIGRhdGEgbW9kZWxcclxuICAgICAgICB0aGlzLmRhdGFNb2RlbCA9IHRoaXMuY29tcG9uZW50LmdldFN1YkNvbXBvbmVudChEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuTWFwcENvY2twaXREYXRhTW9kZWxJZCkgYXMgRGF0YU1vZGVscy5JTWFwcENvY2twaXREYXRhTW9kZWw7XHJcbiAgICAgICAgbGV0IG1haW5EYXRhTW9kZWwgPSB0aGlzLmRhdGFNb2RlbDtcclxuICAgICAgICBsZXQgbWFpbk1hcHBDb2NrcGl0TW9kZWwgPSBtYWluRGF0YU1vZGVsLmRhdGFTb3VyY2U7XHJcblxyXG4gICAgICAgIC8vIHdhaXQgZm9yIHN1Y2Nlc3NmdWxsIGNvbm5lY3Rpb25cclxuICAgICAgICBtYWluTWFwcENvY2twaXRNb2RlbC5ldmVudE1vZGVsQ29ubmVjdGlvbkNoYW5nZWQuYXR0YWNoKHRoaXMuX21haW5Nb2RlbENvbm5lY3Rpb25DaGFuZ2VkSGFuZGxlcilcclxuXHJcbiAgICAgICAgLy8gY29ubmVjdCB0aGUgbWFpbiBtb2RlbFxyXG4gICAgICAgIG1haW5NYXBwQ29ja3BpdE1vZGVsLmNvbm5lY3QoKTtcclxuXHJcbiAgICAgICAgdGhpcy5fbWFpbk5hdmlnYXRpb25XaWRnZXQuc2VsZWN0VGFiKFwiU3RhcnRWaWV3XCIsXCJTdGFydHBhZ2VcIiwgVmlld1R5cGUuT3ZlcnZpZXcpO1xyXG5cclxuICAgICAgICBsZXQgcGVyc2lzdERhdGFDb250cm9sbGVyID0gbmV3IFBlcnNpc3REYXRhQ29udHJvbGxlcihQZXJzaXN0RGF0YVByb3ZpZGVyLmdldEluc3RhbmNlKCkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIExvYWQgZGF0YSBmcm9tIHN0b3JhZ2UgZm9yIHN0YXJ0dXBcclxuICAgICAgICAoYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICBhd2FpdCBwZXJzaXN0RGF0YUNvbnRyb2xsZXIuY29ubmVjdCgpOyBcclxuICAgICAgICAgICAgYXdhaXQgcGVyc2lzdERhdGFDb250cm9sbGVyLmxvYWQoKTtcclxuICAgICAgICB9KSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRpYWxpemVDb21wb25lbnQoKXtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5kZWZhdWx0U2V0dGluZ3NEYXRhSWQgPSBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuV2lkZ2V0RGVmaW5pdGlvbklkO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmRpc2FibGVQZXJzaXN0aW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IGNvbXBvbmVudCBzZXR0aW5ncyBmb3IgdGhpcyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50U2V0dGluZ3N8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBnZXREZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MoKTogQ29tcG9uZW50U2V0dGluZ3N8dW5kZWZpbmVke1xyXG4gICAgICAgIHJldHVybiBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuZ2V0TWFwcENvY2twaXRXaWRnZXREZWZpbml0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNwb3NlIHRoaXMgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGRpc3Bvc2UoKSB7ICAgICAgICBcclxuICAgICAgICBpZih0aGlzLl9tYWluTmF2aWdhdGlvbldpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9tYWluTmF2aWdhdGlvbldpZGdldC5zaWRlQmFyV2lkZ2V0LmV2ZW50V2lkZ2V0QWN0aXZhdGVkLmRldGFjaCh0aGlzLl9zaWRlQmFyV2lkZ2V0QWN0aXZhdGVkSGFuZGxlcik7XHJcbiAgICAgICAgICAgIHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0LmRhdGFNb2RlbC5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0LmRpc3Bvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5fdHJhY2VPdmVydmlld1dpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl90cmFjZU92ZXJ2aWV3V2lkZ2V0LmV2ZW50T3BlblZpZXcuZGV0YWNoKHRoaXMuX3RyYWNlT3ZlcnZpZXdPcGVuVmlld0hhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLl9jb21wb25lbnRPdmVydmlld1dpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRPdmVydmlld1dpZGdldC5ldmVudE9wZW5WaWV3LmRldGFjaCh0aGlzLl9jb21wb25lbnRPdmVydmlld09wZW5WaWV3SGFuZGxlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbWFpbkRhdGFNb2RlbCA9ICg8RGF0YU1vZGVscy5JTWFwcENvY2twaXREYXRhTW9kZWw+dGhpcy5kYXRhTW9kZWwpO1xyXG4gICAgICAgIGlmKG1haW5EYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgbGV0IG1haW5NYXBwQ29ja3BpdE1vZGVsID0gbWFpbkRhdGFNb2RlbC5kYXRhU291cmNlO1xyXG4gICAgICAgICAgICBpZihtYWluTWFwcENvY2twaXRNb2RlbCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgbWFpbk1hcHBDb2NrcGl0TW9kZWwuZXZlbnRNb2RlbENvbm5lY3Rpb25DaGFuZ2VkLmRldGFjaCh0aGlzLl9tYWluTW9kZWxDb25uZWN0aW9uQ2hhbmdlZEhhbmRsZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZUxheW91dCgpIHtcclxuICAgICAgICB0aGlzLl9tYWluTmF2aWdhdGlvbldpZGdldCA9IHRoaXMuY29tcG9uZW50LmdldFN1YkNvbXBvbmVudChEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuTWFpbk5hdmlnYXRpb25XaWRnZXRJZCkgYXMgSU1haW5OYXZpZ2F0aW9uV2lkZ2V0O1xyXG4gICAgICAgIGlmKHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0LmluaXRpYWxpemUodGhpcy5wYXJlbnRDb250ZW50SWQpO1xyXG4gICAgICAgICAgICB0aGlzLl9tYWluTmF2aWdhdGlvbldpZGdldC5kYXRhTW9kZWwgPSAoPERhdGFNb2RlbHMuSU1hcHBDb2NrcGl0RGF0YU1vZGVsPnRoaXMuZGF0YU1vZGVsKTtcclxuICAgICAgICAgICAgdGhpcy5fbWFpbk5hdmlnYXRpb25XaWRnZXQuc2lkZUJhcldpZGdldC5ldmVudFdpZGdldEFjdGl2YXRlZC5hdHRhY2godGhpcy5fc2lkZUJhcldpZGdldEFjdGl2YXRlZEhhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlc2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcclxuXHJcbiAgICAgICAgLy8gSW5pdCBBbGVydEJveFxyXG4gICAgICAgIG5ldyBBbGVydERpYWxvZygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gd2lkdGhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFdpZGdldFxyXG4gICAgICovXHJcbiAgICByZXNpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuX2FjdHVhbFdpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5fYWN0dWFsSGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIGlmKHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0IS5yZXNpemUod2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZCB0aGUgc3R5bGUgaW5mb3JtYXRpb25zIGZvciB0aGUgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGxvYWRTdHlsZXMoKXtcclxuICAgICAgICBzdXBlci5hZGRTdHlsZShcIndpZGdldHMvbWFwcENvY2twaXRXaWRnZXQvc3R5bGUvY3NzL2NvbW1vblN0eWxlVmFyaWFibGVzLmNzc1wiKTtcclxuICAgICAgICBzdXBlci5hZGRTdHlsZShcIndpZGdldHMvbWFwcENvY2twaXRXaWRnZXQvc3R5bGUvY3NzL2NvbW1vblN0eWxlLmNzc1wiKTtcclxuICAgICAgICBzdXBlci5hZGRTdHlsZShcIndpZGdldHMvbWFwcENvY2twaXRXaWRnZXQvc3R5bGUvY3NzL2RlZmF1bHRTY3JvbGxiYXJTdHlsZS5jc3NcIik7XHJcbiAgICAgICAgc3VwZXIuYWRkU3R5bGUoXCJ3aWRnZXRzL21hcHBDb2NrcGl0V2lkZ2V0L3N0eWxlL2Nzcy9jb21tb25Ub29sYmFyU3R5bGUuY3NzXCIpO1xyXG4gICAgICAgIHN1cGVyLmFkZFN0eWxlKFwid2lkZ2V0cy9tYXBwQ29ja3BpdFdpZGdldC9zdHlsZS9jc3MvYWxlcnRCb3hTdHlsZS5jc3NcIik7XHJcbiAgICAgICAgc3VwZXIuYWRkU3R5bGUoXCJ3aWRnZXRzL21hcHBDb2NrcGl0V2lkZ2V0L3N0eWxlL2Nzcy9kcmFnRHJvcFN0eWxlLmNzc1wiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gc2VuZGVyXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uQ29udGVudEFjdGl2YXRlZChzZW5kZXIsIGFyZ3MpIHtcclxuICAgICAgICBhcmdzLndpZGdldC5hY3RpdmF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY29ubmVjdGlvbkNoYW5nZWQoc2VuZGVyOiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbCwgY29ubmVjdGVkOiBib29sZWFuKXtcclxuICAgICAgICBpZiAoY29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25NYWluTW9kZWxDb25uZWN0ZWQoc2VuZGVyKTsgICAgIFxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLm9uTWFpbk1vZGVsRGlzY29ubmVjdGVkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIGFmdGVyIHRoZSBtYWluIG1vZGVsIGhhcyBiZWVuIGNvbm5lY3RlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsfSBtYWluTWFwcENvY2twaXRNb2RlbFxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uTWFpbk1vZGVsQ29ubmVjdGVkKG1haW5NYXBwQ29ja3BpdE1vZGVsOiBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTWFwcENvY2twaXRXaWRnZXQub25NYWluTW9kZWxDb25uZWN0ZWQoKVwiKTtcclxuICAgICAgICBcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZVVzZXJUb0Fub255bW91cygpO1xyXG4gICAgICAgICAgICBsZXQgbG9naW5XaWRnZXQgPSB0aGlzLmNvbXBvbmVudC5nZXRTdWJDb21wb25lbnQoRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLkxvZ2luV2lkZ2V0SWQpIGFzIElMb2dpbldpZGdldDtcclxuICAgICAgICAgICAgaWYobG9naW5XaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGxvZ2luV2lkZ2V0LmxvZ2luSW50ZXJmYWNlID0geyBjb21tYW5kQ2hhbmdlVXNlcjogbWFpbk1hcHBDb2NrcGl0TW9kZWwuY29tbWFuZENoYW5nZVVzZXIgfTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0LnNpZGVCYXJXaWRnZXQuYWRkV2lkZ2V0KGxvZ2luV2lkZ2V0LCBcImxvZ2luV2lkZ2V0XCIsIFZpZXdUeXBlLlVzZXIsIFZpZXdUeXBlUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXRJY29uQnlWaWV3VHlwZShWaWV3VHlwZS5Vc2VyKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVDb250ZW50V2lkZ2V0cygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0LnNlbGVjdFRhYihcIlN0YXJ0Vmlld1wiLCBcIlN0YXJ0cGFnZVwiLCBWaWV3VHlwZS5PdmVydmlldyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgYWZ0ZXIgdGhlIG1haW4gbW9kZWwgaGFzIGJlZW4gZGlzY29ubmVjdGVkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25NYWluTW9kZWxEaXNjb25uZWN0ZWQoKTogYW55IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk1hcHBDb2NrcGl0V2lkZ2V0Lm9uTWFpbk1vZGVsRGlzY29ubmVjdGVkKClcIik7XHJcbiAgICAgICAgdGhpcy5zZXRCdXN5SW5mb3JtYXRpb24obmV3IEJ1c3lJbmZvcm1hdGlvbihcIkNvbm5lY3Rpb24gdG8gc2VydmVyIGlzIGxvc3QhPGJyLz4mbmJzcDtSZWZyZXNoIHBhZ2UgdG8gcmVjb25uZWN0LlwiLCBJbWFnZUlkLmRpc2Nvbm5lY3RlZEltYWdlKSk7XHJcbiAgICAgICAgdGhpcy5zZXRCdXN5KHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgY29udGVudCB3aWRnZXRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZUNvbnRlbnRXaWRnZXRzKCkge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlQ29tcG9uZW50T3ZlcnZpZXdXaWRnZXQoKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZVRyYWNlT3ZlcnZpZXdXaWRnZXQoKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZVRvb2xzT3ZlcnZpZXdXaWRnZXQoKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZUR1bW15V2lkZ2V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgdGhlIHN0YXJ0IHBhZ2Ugd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZVN0YXJ0UGFnZVdpZGdldCgpe1xyXG4gICAgICAgIGxldCBzdGFydFBhZ2VXaWRnZXQgPSB0aGlzLmNvbXBvbmVudC5nZXRTdWJDb21wb25lbnQoRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLlN0YXJ0UGFnZVdpZGdldElkKSBhcyBJV2lkZ2V0O1xyXG4gICAgICAgIGlmKHN0YXJ0UGFnZVdpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9tYWluTmF2aWdhdGlvbldpZGdldC5hZGRTaWRlQmFyVGFiKFwiU3RhcnRWaWV3XCIsIFwid2lkZ2V0cy9tYXBwQ29ja3BpdFdpZGdldC9zdHlsZS9pbWFnZXMvQXJlYXMvU3RhcnRQYWdlQXJlYS5zdmdcIik7XHJcbiAgICAgICAgICAgIHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0LmFkZFdpZGdldChzdGFydFBhZ2VXaWRnZXQsIFwiU3RhcnRwYWdlXCIsIFZpZXdUeXBlLk92ZXJ2aWV3LCB7cGFyZW50OiBcIlN0YXJ0Vmlld1wiLCB3aWRnZXRQb3NpdGlvbjogVGFiV2lkZ2V0V2lkZ2V0UG9zaXRvbnMubGVmdH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNyZWF0ZUR1bW15V2lkZ2V0KCl7XHJcbiAgICAgICAgbGV0IGR1bW15V2lkZ2V0ID0gdGhpcy5jb21wb25lbnQuZ2V0U3ViQ29tcG9uZW50KERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5EdW1teVdpZGdldElkKSBhcyBJV2lkZ2V0O1xyXG4gICAgICAgIGlmKGR1bW15V2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0LmFkZFNpZGVCYXJUYWIoXCJEdW1teVZpZXdcIiwgXCJ3aWRnZXRzL21hcHBDb2NrcGl0V2lkZ2V0L3N0eWxlL2ltYWdlcy9BcmVhcy9Ub29sc0FyZWEuc3ZnXCIpO1xyXG4gICAgICAgICAgICB0aGlzLl9tYWluTmF2aWdhdGlvbldpZGdldC5hZGRXaWRnZXQoZHVtbXlXaWRnZXQsIFwiRHVtbXlXaWRnZXRcIiwgVmlld1R5cGUuT3ZlcnZpZXcsIHtwYXJlbnQ6IFwiRHVtbXlWaWV3XCIsIHdpZGdldFBvc2l0aW9uOiBUYWJXaWRnZXRXaWRnZXRQb3NpdG9ucy5sZWZ0fSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIHRoZSB0b29scyBvdmVydmlldyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlVG9vbHNPdmVydmlld1dpZGdldCgpe1xyXG4gICAgICAgIGxldCB0b29sc092ZXJ2aWV3V2lkZ2V0ID0gdGhpcy5jb21wb25lbnQuZ2V0U3ViQ29tcG9uZW50KERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5Ub29sc092ZXJ2aWV3V2lkZ2V0SWQpIGFzIElUb29sc092ZXJ2aWV3V2lkZ2V0O1xyXG4gICAgICAgIGlmKHRvb2xzT3ZlcnZpZXdXaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fbWFpbk5hdmlnYXRpb25XaWRnZXQuYWRkU2lkZUJhclRhYihcIlRvb2xzVmlld1wiLCBcIndpZGdldHMvbWFwcENvY2twaXRXaWRnZXQvc3R5bGUvaW1hZ2VzL0FyZWFzL1Rvb2xzQXJlYS5zdmdcIik7XHJcbiAgICAgICAgICAgIC8vIHJlYWQgdGhlIGF2YWlsYWJsZSBjb21wb25lbnRzXHJcbiAgICAgICAgICAgIGlmKCg8RGF0YU1vZGVscy5JTWFwcENvY2twaXREYXRhTW9kZWw+dGhpcy5kYXRhTW9kZWwpLmRhdGFTb3VyY2UuY29tcG9uZW50cyAhPSB1bmRlZmluZWQgJiZcclxuICAgICAgICAgICAgICAgICg8RGF0YU1vZGVscy5JTWFwcENvY2twaXREYXRhTW9kZWw+dGhpcy5kYXRhTW9kZWwpLmRhdGFTb3VyY2UuY29tcG9uZW50cy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICAgICAgICBpZih0b29sc092ZXJ2aWV3V2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlVG9vbHNPdmVydmlld0NvbnRlbnQoKDxEYXRhTW9kZWxzLklNYXBwQ29ja3BpdERhdGFNb2RlbD50aGlzLmRhdGFNb2RlbCkuZGF0YVNvdXJjZS5jb21wb25lbnRzLCB0b29sc092ZXJ2aWV3V2lkZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICg8RGF0YU1vZGVscy5JTWFwcENvY2twaXREYXRhTW9kZWw+dGhpcy5kYXRhTW9kZWwpLmRhdGFTb3VyY2UuY29tcG9uZW50c1NvdXJjZS5yZWFkKChjb21wb25lbnRzKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRvb2xzT3ZlcnZpZXdXaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVUb29sc092ZXJ2aWV3Q29udGVudChjb21wb25lbnRzLCB0b29sc092ZXJ2aWV3V2lkZ2V0KTsgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgY29udGVudCBvZiB0aGUgdG9vbHMgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRbXX0gY29tcG9uZW50c1xyXG4gICAgICogQHBhcmFtIHtXaWRnZXRzLklDb21wb25lbnRPdmVydmlld1dpZGdldH0gdG9vbHNPdmVydmlld1dpZGdldFxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlVG9vbHNPdmVydmlld0NvbnRlbnQoY29tcG9uZW50czogTWFwcENvY2twaXRDb21wb25lbnRbXSwgdG9vbHNPdmVydmlld1dpZGdldDogSVRvb2xzT3ZlcnZpZXdXaWRnZXQpIHtcclxuICAgICAgICBcclxuICAgICAgICAvLyBjcmVhdGUgYW5kIGluaXRpYWxpemUgY29tcG9uZW50cyBsaW5rXHJcbiAgICAgICAgbGV0IGNvbXBvbmVudHNMaW5rOiBQcm9wZXJ0eTxBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudD4+ID0gUHJvcGVydHkuY3JlYXRlPEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50Pj4oW10pO1xyXG4gICAgICAgIGNvbXBvbmVudHNMaW5rLnZhbHVlID0gY29tcG9uZW50cztcclxuICAgICAgICB0b29sc092ZXJ2aWV3V2lkZ2V0LmNvbXBvbmVudHMgPSBjb21wb25lbnRzTGluaztcclxuXHJcbiAgICAgICAgLy8gYWRkIG92ZXJ2aWV3IHdpZGdldFxyXG4gICAgICAgIHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0LmFkZFdpZGdldCh0b29sc092ZXJ2aWV3V2lkZ2V0LCBcIlRvb2xzT3ZlcnZpZXdcIiwgVmlld1R5cGUuT3ZlcnZpZXcsIHtwYXJlbnQ6IFwiVG9vbHNWaWV3XCIsIHdpZGdldFBvc2l0aW9uOiBUYWJXaWRnZXRXaWRnZXRQb3NpdG9ucy5sZWZ0fSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgdGhlIGNvbXBvbmVudCBvdmVydmlldyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlQ29tcG9uZW50T3ZlcnZpZXdXaWRnZXQoKSB7XHJcbiAgICAgICAgdGhpcy5fY29tcG9uZW50T3ZlcnZpZXdXaWRnZXQgPSB0aGlzLmNvbXBvbmVudC5nZXRTdWJDb21wb25lbnQoRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLkNvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0SWQpIGFzIElDb21wb25lbnRPdmVydmlld1dpZGdldDtcclxuICAgICAgICBpZih0aGlzLl9jb21wb25lbnRPdmVydmlld1dpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9tYWluTmF2aWdhdGlvbldpZGdldC5hZGRTaWRlQmFyVGFiKFwiQ29tcG9uZW50c1ZpZXdcIiwgXCJ3aWRnZXRzL21hcHBDb2NrcGl0V2lkZ2V0L3N0eWxlL2ltYWdlcy9BcmVhcy9Db21wb25lbnRBcmVhLnN2Z1wiKTtcclxuICAgICAgICAgICAgLy8gcmVhZCB0aGUgYXZhaWxhYmxlIHVzZXIgY29tcG9uZW50c1xyXG4gICAgICAgICAgICAoPERhdGFNb2RlbHMuSU1hcHBDb2NrcGl0RGF0YU1vZGVsPnRoaXMuZGF0YU1vZGVsKS5kYXRhU291cmNlLnVzZXJDb21wb25lbnRzU291cmNlLnJlYWQoKHVzZXJDb21wb25lbnRzKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVDb21wb25lbnRPdmVydmlld0NvbnRlbnQodXNlckNvbXBvbmVudHMpOyAgXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBjb250ZW50IG9mIHRoZSBvdmVydmlldyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFtdfSB1c2VyQ29tcG9uZW50c1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlQ29tcG9uZW50T3ZlcnZpZXdDb250ZW50KHVzZXJDb21wb25lbnRzOiBNYXBwQ29ja3BpdENvbXBvbmVudFtdKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gY3JlYXRlIGFuZCBpbml0aWFsaXplIGNvbXBvbmVudHMgbGlua1xyXG4gICAgICAgIGxldCBjb21wb25lbnRzTGluazogUHJvcGVydHk8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnQ+PiA9IFByb3BlcnR5LmNyZWF0ZTxBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudD4+KFtdKTtcclxuICAgICAgICBjb21wb25lbnRzTGluay52YWx1ZSA9IHVzZXJDb21wb25lbnRzO1xyXG4gICAgICAgIGlmKCB0aGlzLl9jb21wb25lbnRPdmVydmlld1dpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRPdmVydmlld1dpZGdldC5jb21wb25lbnRzID0gY29tcG9uZW50c0xpbms7XHJcblxyXG4gICAgICAgICAgICAvLyBhZGQgb3ZlcnZpZXcgd2lkZ2V0XHJcbiAgICAgICAgICAgIHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0LmFkZFdpZGdldCh0aGlzLl9jb21wb25lbnRPdmVydmlld1dpZGdldCwgXCJDb21wb25lbnRPdmVydmlld1wiLCBWaWV3VHlwZS5PdmVydmlldywgeyBwYXJlbnQ6IFwiQ29tcG9uZW50c1ZpZXdcIiwgd2lkZ2V0UG9zaXRpb246IFRhYldpZGdldFdpZGdldFBvc2l0b25zLmxlZnQgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0LmV2ZW50T3BlblZpZXcuYXR0YWNoKHRoaXMuX2NvbXBvbmVudE92ZXJ2aWV3T3BlblZpZXdIYW5kbGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHtFdmVudE9wZW5WaWV3QXJnc30gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25Db21wb25lbnRPdmVydmlld1dpZGdldE9wZW5WaWV3KHNlbmRlciwgYXJnczogRXZlbnRPcGVuVmlld0FyZ3Mpe1xyXG5cclxuICAgICAgICB0aGlzLl9tYWluTmF2aWdhdGlvbldpZGdldC5hZGRWaWV3KFwiQ29tcG9uZW50c1ZpZXdcIiAsIGFyZ3MuY29tcG9uZW50LCBhcmdzLnZpZXdUeXBlLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoYW5nZXMgdGhlIHVzZXIgdG8gYW5vbnltb3VzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNoYW5nZVVzZXJUb0Fub255bW91cygpIHtcclxuICAgICAgICBsZXQgbWFpbkRhdGFNb2RlbCA9ICg8RGF0YU1vZGVscy5JTWFwcENvY2twaXREYXRhTW9kZWw+dGhpcy5kYXRhTW9kZWwpO1xyXG4gICAgICAgIGxldCB1c2VySW5mbyA9IHsgdXNlcm5hbWU6IFwiQW5vbnltb3VzXCIsIHBhc3N3b3JkOiBcIlwiIH07XHJcbiAgICAgICAgbWFpbkRhdGFNb2RlbC5kYXRhU291cmNlLmNvbW1hbmRDaGFuZ2VVc2VyLmV4ZWN1dGUodXNlckluZm8sICh1c2VyUm9sZXMpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCIlbyBMb2dnZWQgaW4gd2l0aCByb2xlczogJW9cIix1c2VySW5mby51c2VybmFtZSwgdXNlclJvbGVzKTtcclxuICAgICAgICB9LChlcnJvcik9PntcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkNvdWxkIG5vdCBsb2cgaW46ICVvICVvXCIsIHVzZXJJbmZvLnVzZXJuYW1lLCBlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjcmVhdGVzIHRoZSB0cmFjZXZpZXcgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZVRyYWNlT3ZlcnZpZXdXaWRnZXQoKSB7XHJcbiAgICAgICAgdGhpcy5fdHJhY2VPdmVydmlld1dpZGdldCA9IHRoaXMuY29tcG9uZW50LmdldFN1YkNvbXBvbmVudChEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuVHJhY2VPdmVydmlld1dpZGdldElkKSBhcyBJVHJhY2VPdmVydmlld1dpZGdldDtcclxuICAgICAgICBpZih0aGlzLl90cmFjZU92ZXJ2aWV3V2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0LmFkZFNpZGVCYXJUYWIoXCJUcmFjZVZpZXdcIiwgXCJ3aWRnZXRzL21hcHBDb2NrcGl0V2lkZ2V0L3N0eWxlL2ltYWdlcy9BcmVhcy9UcmFjZUFyZWEuc3ZnXCIpO1xyXG4gICAgICAgICAgICAvLyBpbml0aWFsaXplIHRoZSB0cmFjZSBwcm92aWRlclxyXG4gICAgICAgICAgICAoPERhdGFNb2RlbHMuSU1hcHBDb2NrcGl0RGF0YU1vZGVsPnRoaXMuZGF0YU1vZGVsKS5kYXRhU291cmNlLnRyYWNlUHJvdmlkZXIuaW5pdGlhbGl6ZSgpLnRoZW4oKCk9PntcclxuICAgICAgICAgICAgICAgIGxldCB0cmFjZUNvbXBvbmVudHMgPSAoPERhdGFNb2RlbHMuSU1hcHBDb2NrcGl0RGF0YU1vZGVsPnRoaXMuZGF0YU1vZGVsKS5kYXRhU291cmNlLnRyYWNlUHJvdmlkZXIudHJhY2VDb21wb25lbnRzO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBsZXQgdHJhY2VDb21wb25lbnRzTGluazogUHJvcGVydHk8QXJyYXk8TWFwcENvY2twaXRUcmFjZUNvbXBvbmVudD4+ID0gUHJvcGVydHkuY3JlYXRlPEFycmF5PE1hcHBDb2NrcGl0VHJhY2VDb21wb25lbnQ+PihbXSk7XHJcbiAgICAgICAgICAgICAgICB0cmFjZUNvbXBvbmVudHNMaW5rLnZhbHVlID0gdHJhY2VDb21wb25lbnRzO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5fdHJhY2VPdmVydmlld1dpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RyYWNlT3ZlcnZpZXdXaWRnZXQuY29tcG9uZW50cyA9IHRyYWNlQ29tcG9uZW50c0xpbms7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWFpbk5hdmlnYXRpb25XaWRnZXQuYWRkV2lkZ2V0KHRoaXMuX3RyYWNlT3ZlcnZpZXdXaWRnZXQsIFwiVHJhY2VPdmVydmlld1wiLCBWaWV3VHlwZS5PdmVydmlldywgeyBwYXJlbnQ6IFwiVHJhY2VWaWV3XCIsIHdpZGdldFBvc2l0aW9uOiBUYWJXaWRnZXRXaWRnZXRQb3NpdG9ucy5sZWZ0IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RyYWNlT3ZlcnZpZXdXaWRnZXQuZXZlbnRPcGVuVmlldy5hdHRhY2godGhpcy5fdHJhY2VPdmVydmlld09wZW5WaWV3SGFuZGxlcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gc2VuZGVyXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50T3BlblZpZXdBcmdzfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvblRyYWNlT3ZlcnZpZXdXaWRnZXRPcGVuVmlldyhzZW5kZXIsIGFyZ3M6IEV2ZW50T3BlblZpZXdBcmdzKXtcclxuICAgICAgICB0aGlzLl9tYWluTmF2aWdhdGlvbldpZGdldC5hZGRWaWV3KFwiVHJhY2VWaWV3XCIsIGFyZ3MuY29tcG9uZW50LCBhcmdzLnZpZXdUeXBlLCB0cnVlKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBNYXBwQ29ja3BpdFdpZGdldCB9OyJdfQ==