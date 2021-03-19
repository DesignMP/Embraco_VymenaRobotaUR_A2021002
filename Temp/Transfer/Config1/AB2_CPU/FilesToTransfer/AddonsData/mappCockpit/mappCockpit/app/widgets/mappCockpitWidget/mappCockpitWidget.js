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
define(["require", "exports", "../common/widgetBase", "../tabWidget/interfaces/tabWidgetInterface", "../common/viewTypeProvider", "../../framework/property", "../common/busyInformation", "../common/alertDialog", "../common/imageProvider", "../../common/persistence/persistDataController", "../../common/persistence/persistDataProvider", "../../common/componentFactory/componentFactory", "../../common/componentFactory/componentDefinition"], function (require, exports, widgetBase_1, tabWidgetInterface_1, viewTypeProvider_1, property_1, busyInformation_1, alertDialog_1, imageProvider_1, persistDataController_1, persistDataProvider_1, componentFactory_1, componentDefinition_1) {
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
            this._mainNavigationWidget.selectTab("StartView", "Startpage", viewTypeProvider_1.ViewType.Overview);
            // Call getInstance to initialize the ImageProvider
            imageProvider_1.ImageProvider.getInstance();
            var persistDataController = new persistDataController_1.PersistDataController(persistDataProvider_1.PersistDataProvider.getInstance());
            // Load data from storage for startup
            //persistDataController.load();
        };
        MappCockpitWidget.prototype.initializeComponent = function () {
            this.component.disablePersisting();
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
            this._mainNavigationWidget = componentFactory_1.ComponentFactory.getInstance().create(new componentDefinition_1.ComponentDefinition("MainNavigationWidget", "MainNavigationWidget"));
            this._mainNavigationWidget.initialize(this.parentContentId);
            this._mainNavigationWidget.dataModel = this.dataModel;
            this._mainNavigationWidget.sideBarWidget.eventWidgetActivated.attach(this._sideBarWidgetActivatedHandler);
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
        /**
         * Creates the widget content and eventually subwidgets
         *
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.initialized = function () {
            // create the start page
            this.createStartPageWidget();
            // connect the main data model
            var mainDataModel = this.dataModel;
            var mainMappCockpitModel = mainDataModel.dataSource;
            // wait for successfull connection
            mainMappCockpitModel.eventModelConnectionChanged.attach(this._mainModelConnectionChangedHandler);
            // connect the main model
            mainMappCockpitModel.connect();
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
                this._loginWidget = componentFactory_1.ComponentFactory.getInstance().create(new componentDefinition_1.ComponentDefinition("LoginWidget", "LoginWidget"));
                this._loginWidget.loginInterface = { commandChangeUser: mainMappCockpitModel.commandChangeUser };
                this._mainNavigationWidget.sideBarWidget.addWidget(this._loginWidget, "loginWidget", viewTypeProvider_1.ViewType.User, viewTypeProvider_1.ViewTypeProvider.getInstance().getIconByViewType(viewTypeProvider_1.ViewType.User));
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
            //this.createDummyWidget();
        };
        /**
         *
         *
         * @private
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.createStartPageWidget = function () {
            this._mainNavigationWidget.addSideBarTab("StartView", "widgets/mappCockpitWidget/style/images/Areas/StartPageArea.svg");
            this._startPageWidget = componentFactory_1.ComponentFactory.getInstance().create(new componentDefinition_1.ComponentDefinition("StartPageWidget", "StartPageWidget"));
            if (this._startPageWidget != undefined) {
                this._mainNavigationWidget.addWidget(this._startPageWidget, "Startpage", viewTypeProvider_1.ViewType.Overview, { parent: "StartView", widgetPosition: tabWidgetInterface_1.TabWidgetWidgetPositons.left });
            }
        };
        /*
            private createDummyWidget(){
                this._mainNavigationWidget.addSideBarTab("DummyView", "widgets/mappCockpitWidget/style/images/Areas/ToolsArea.svg");
        
                this._dummyWidget = ComponentFactory.getInstance().create(new ComponentDefinition("DummyWidget", "DummyWidgetId",));
                if(this._dummyWidget != undefined){
                    this._mainNavigationWidget.addWidget(this._dummyWidget, "DummyWidget", ViewType.Overview, {parent: "DummyView", widgetPosition: TabWidgetWidgetPositons.left});
                }
            }*/
        /**
         *
         *
         * @private
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.createToolsOverviewWidget = function () {
            var _this = this;
            this._mainNavigationWidget.addSideBarTab("ToolsView", "widgets/mappCockpitWidget/style/images/Areas/ToolsArea.svg");
            this._toolsOverviewWidget = componentFactory_1.ComponentFactory.getInstance().create(new componentDefinition_1.ComponentDefinition("ToolsOverviewWidget", "ToolsOverviewWidget"));
            // read the available components
            if (this.dataModel.dataSource.components != undefined &&
                this.dataModel.dataSource.components.length > 0) {
                if (this._toolsOverviewWidget != undefined) {
                    this.createToolsOverviewContent(this.dataModel.dataSource.components, this._toolsOverviewWidget);
                }
            }
            else {
                this.dataModel.dataSource.componentsSource.read(function (components) {
                    if (_this._toolsOverviewWidget != undefined) {
                        _this.createToolsOverviewContent(components, _this._toolsOverviewWidget);
                    }
                });
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
         *
         *
         * @private
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.createComponentOverviewWidget = function () {
            var _this = this;
            this._mainNavigationWidget.addSideBarTab("ComponentsView", "widgets/mappCockpitWidget/style/images/Areas/ComponentArea.svg");
            // create the overview widget
            this._componentOverviewWidget = componentFactory_1.ComponentFactory.getInstance().create(new componentDefinition_1.ComponentDefinition("ComponentOverviewWidget", "ComponentOverviewWidget"));
            // read the available user components
            this.dataModel.dataSource.userComponentsSource.read(function (userComponents) {
                _this.createComponentOverviewContent(userComponents);
            });
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
            this._mainNavigationWidget.addSideBarTab("TraceView", "widgets/mappCockpitWidget/style/images/Areas/TraceArea.svg");
            this._traceOverviewWidget = componentFactory_1.ComponentFactory.getInstance().create(new componentDefinition_1.ComponentDefinition("TraceOverviewWidget", "TraceOverviewWidget"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcENvY2twaXRXaWRnZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvbWFwcENvY2twaXRXaWRnZXQvbWFwcENvY2twaXRXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQXNCQTtRQUFnQyxxQ0FBVTtRQUExQztZQUFBLHFFQTRYQztZQWxYVyxvQ0FBOEIsR0FBRyxVQUFDLE1BQU0sRUFBQyxJQUFJLElBQUcsT0FBQSxLQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxFQUFwQyxDQUFvQyxDQUFDO1lBQ3JGLHVDQUFpQyxHQUFHLFVBQUMsTUFBTSxFQUFFLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxpQ0FBaUMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQXBELENBQW9ELENBQUE7WUFDMUcsbUNBQTZCLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLDZCQUE2QixDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsRUFBL0MsQ0FBK0MsQ0FBQztZQUVqRyx3Q0FBa0MsR0FBRyxVQUFDLE1BQU0sRUFBQyxTQUFTLElBQUssT0FBQSxLQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxFQUF6QyxDQUF5QyxDQUFDOztRQThXakgsQ0FBQztRQTVXRzs7Ozs7V0FLRztRQUNILHNDQUFVLEdBQVYsVUFBVyxpQkFBeUI7WUFDaEMsaUJBQU0sVUFBVSxZQUFDLGlCQUFpQixDQUFDLENBQUM7WUFFcEMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUMsV0FBVyxFQUFFLDJCQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFakYsbURBQW1EO1lBQ25ELDZCQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7WUFFNUIsSUFBSSxxQkFBcUIsR0FBRyxJQUFJLDZD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QUFHLG1CQUFtQixDQUFDO29CQUUzRCxLQUFJLENBQUMscUJBQXFCLENBQUMsU0FBUyxDQUFDLEtBQUksQ0FBQyxvQkFBb0IsRUFBRSxlQUFlLEVBQUUsMkJBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBRSw0Q0FBdUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO29CQUMzSyxLQUFJLENBQUMsb0JBQW9CLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxLQUFJLENBQUMsNkJBQTZCLENBQUMsQ0FBQztpQkFDdEY7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0sseURBQTZCLEdBQXJDLFVBQXNDLE1BQU0sRUFBRSxJQUF1QjtZQUNqRSxJQUFJLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDeEYsQ0FBQztRQUNMLHdCQUFDO0lBQUQsQ0FBQyxBQTVYRCxDQUFnQyx1QkFBVSxHQTRYekM7SUFFUSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBXaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi93aWRnZXRCYXNlXCI7XHJcblxyXG5pbXBvcnQgKiBhcyBEYXRhTW9kZWxzIGZyb20gJy4uLy4uL21vZGVscy9kYXRhTW9kZWxzJztcclxuaW1wb3J0IHsgSU1hcHBDb2NrcGl0V2lkZ2V0IH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9tYXBwQ29ja3BpdFdpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUYWJXaWRnZXRXaWRnZXRQb3NpdG9ucyB9IGZyb20gXCIuLi90YWJXaWRnZXQvaW50ZXJmYWNlcy90YWJXaWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgRXZlbnRPcGVuVmlld0FyZ3MgfSBmcm9tIFwiLi4vY29tbW9uL2V2ZW50T3BlblZpZXdBcmdzXCI7XHJcbmltcG9ydCB7IFZpZXdUeXBlLCBWaWV3VHlwZVByb3ZpZGVyIH0gZnJvbSBcIi4uL2NvbW1vbi92aWV3VHlwZVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IFByb3BlcnR5IH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9wcm9wZXJ0eVwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50XCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0VHJhY2VDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2RpYWdub3N0aWNzL3RyYWNlL21hcHBDb2NrcGl0VHJhY2VDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWwgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL29ubGluZS9jb21wb25lbnRzRGF0YU1vZGVsXCI7XHJcbmltcG9ydCB7IEJ1c3lJbmZvcm1hdGlvbiwgSW1hZ2VJZCB9IGZyb20gXCIuLi9jb21tb24vYnVzeUluZm9ybWF0aW9uXCI7XHJcbmltcG9ydCB7IEFsZXJ0RGlhbG9nIH0gZnJvbSBcIi4uL2NvbW1vbi9hbGVydERpYWxvZ1wiO1xyXG5pbXBvcnQgeyBJbWFnZVByb3ZpZGVyIH0gZnJvbSBcIi4uL2NvbW1vbi9pbWFnZVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IFBlcnNpc3REYXRhQ29udHJvbGxlciB9IGZyb20gXCIuLi8uLi9jb21tb24vcGVyc2lzdGVuY2UvcGVyc2lzdERhdGFDb250cm9sbGVyXCI7XHJcbmltcG9ydCB7IFBlcnNpc3REYXRhUHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3BlcnNpc3RlbmNlL3BlcnNpc3REYXRhUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50RmFjdG9yeSB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50RmFjdG9yeS9jb21wb25lbnRGYWN0b3J5XCI7XHJcbmltcG9ydCB7IENvbXBvbmVudERlZmluaXRpb24gfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEZhY3RvcnkvY29tcG9uZW50RGVmaW5pdGlvblwiO1xyXG5pbXBvcnQgeyBJTG9naW5XaWRnZXQsIElDb21wb25lbnRPdmVydmlld1dpZGdldCwgSU1haW5OYXZpZ2F0aW9uV2lkZ2V0LCBJVHJhY2VPdmVydmlld1dpZGdldCwgSVRvb2xzT3ZlcnZpZXdXaWRnZXQgfSBmcm9tIFwiLi4vLi4vd2lkZ2V0cy93aWRnZXRzXCI7XHJcbmltcG9ydCB7IElXaWRnZXQgfSBmcm9tIFwiLi4vY29tbW9uL2ludGVyZmFjZXMvd2lkZ2V0SW50ZXJmYWNlXCI7XHJcblxyXG5cclxuY2xhc3MgTWFwcENvY2twaXRXaWRnZXQgZXh0ZW5kcyBXaWRnZXRCYXNlIGltcGxlbWVudHMgSU1hcHBDb2NrcGl0V2lkZ2V0e1xyXG5cclxuICAgIHByaXZhdGUgX21haW5OYXZpZ2F0aW9uV2lkZ2V0ISA6IElNYWluTmF2aWdhdGlvbldpZGdldDtcclxuICAgIHByaXZhdGUgX3N0YXJ0UGFnZVdpZGdldDogSVdpZGdldHx1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF90cmFjZU92ZXJ2aWV3V2lkZ2V0OiBJVHJhY2VPdmVydmlld1dpZGdldHx1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF9jb21wb25lbnRPdmVydmlld1dpZGdldDogSUNvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0fHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX3Rvb2xzT3ZlcnZpZXdXaWRnZXQ6IElUb29sc092ZXJ2aWV3V2lkZ2V0fHVuZGVmaW5lZDtcclxuICAgIC8vcHJpdmF0ZSBfZHVtbXlXaWRnZXQ6IFdpZGdldHMuSUR1bW15V2lkZ2V0fHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX2xvZ2luV2lkZ2V0ISA6IElMb2dpbldpZGdldDtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfc2lkZUJhcldpZGdldEFjdGl2YXRlZEhhbmRsZXIgPSAoc2VuZGVyLGFyZ3MpPT50aGlzLm9uQ29udGVudEFjdGl2YXRlZChzZW5kZXIsYXJncyk7XHJcbiAgICBwcml2YXRlIF9jb21wb25lbnRPdmVydmlld09wZW5WaWV3SGFuZGxlciA9IChzZW5kZXIsIGFyZ3MpID0+IHRoaXMub25Db21wb25lbnRPdmVydmlld1dpZGdldE9wZW5WaWV3KHNlbmRlciwgYXJncylcclxuICAgIHByaXZhdGUgX3RyYWNlT3ZlcnZpZXdPcGVuVmlld0hhbmRsZXIgPSAoc2VuZGVyLGFyZ3MpID0+IHRoaXMub25UcmFjZU92ZXJ2aWV3V2lkZ2V0T3BlblZpZXcoc2VuZGVyLGFyZ3MpO1xyXG4gICAgXHJcbiAgICBwcml2YXRlIF9tYWluTW9kZWxDb25uZWN0aW9uQ2hhbmdlZEhhbmRsZXIgPSAoc2VuZGVyLGNvbm5lY3RlZCkgPT4gdGhpcy5jb25uZWN0aW9uQ2hhbmdlZChzZW5kZXIsIGNvbm5lY3RlZCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYXlvdXRDb250YWluZXJJZFxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQ6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQpO1xyXG5cclxuICAgICAgICB0aGlzLl9tYWluTmF2aWdhdGlvbldpZGdldC5zZWxlY3RUYWIoXCJTdGFydFZpZXdcIixcIlN0YXJ0cGFnZVwiLCBWaWV3VHlwZS5PdmVydmlldyk7XHJcblxyXG4gICAgICAgIC8vIENhbGwgZ2V0SW5zdGFuY2UgdG8gaW5pdGlhbGl6ZSB0aGUgSW1hZ2VQcm92aWRlclxyXG4gICAgICAgIEltYWdlUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKTtcclxuXHJcbiAgICAgICAgbGV0IHBlcnNpc3REYXRhQ29udHJvbGxlciA9IG5ldyBQZXJzaXN0RGF0YUNvbnRyb2xsZXIoUGVyc2lzdERhdGFQcm92aWRlci5nZXRJbnN0YW5jZSgpKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBMb2FkIGRhdGEgZnJvbSBzdG9yYWdlIGZvciBzdGFydHVwXHJcbiAgICAgICAgLy9wZXJzaXN0RGF0YUNvbnRyb2xsZXIubG9hZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRpYWxpemVDb21wb25lbnQoKXtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5kaXNhYmxlUGVyc2lzdGluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzcG9zZSB0aGlzIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBkaXNwb3NlKCkgeyAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5fbWFpbk5hdmlnYXRpb25XaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fbWFpbk5hdmlnYXRpb25XaWRnZXQuc2lkZUJhcldpZGdldC5ldmVudFdpZGdldEFjdGl2YXRlZC5kZXRhY2godGhpcy5fc2lkZUJhcldpZGdldEFjdGl2YXRlZEhhbmRsZXIpO1xyXG4gICAgICAgICAgICB0aGlzLl9tYWluTmF2aWdhdGlvbldpZGdldC5kYXRhTW9kZWwuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9tYWluTmF2aWdhdGlvbldpZGdldC5kaXNwb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuX3RyYWNlT3ZlcnZpZXdXaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fdHJhY2VPdmVydmlld1dpZGdldC5ldmVudE9wZW5WaWV3LmRldGFjaCh0aGlzLl90cmFjZU92ZXJ2aWV3T3BlblZpZXdIYW5kbGVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5fY29tcG9uZW50T3ZlcnZpZXdXaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50T3ZlcnZpZXdXaWRnZXQuZXZlbnRPcGVuVmlldy5kZXRhY2godGhpcy5fY29tcG9uZW50T3ZlcnZpZXdPcGVuVmlld0hhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG1haW5EYXRhTW9kZWwgPSAoPERhdGFNb2RlbHMuSU1hcHBDb2NrcGl0RGF0YU1vZGVsPnRoaXMuZGF0YU1vZGVsKTtcclxuICAgICAgICBpZihtYWluRGF0YU1vZGVsICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGxldCBtYWluTWFwcENvY2twaXRNb2RlbCA9IG1haW5EYXRhTW9kZWwuZGF0YVNvdXJjZTtcclxuICAgICAgICAgICAgaWYobWFpbk1hcHBDb2NrcGl0TW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIG1haW5NYXBwQ29ja3BpdE1vZGVsLmV2ZW50TW9kZWxDb25uZWN0aW9uQ2hhbmdlZC5kZXRhY2godGhpcy5fbWFpbk1vZGVsQ29ubmVjdGlvbkNoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBjcmVhdGVMYXlvdXQoKSB7XHJcbiAgICAgICAgdGhpcy5fbWFpbk5hdmlnYXRpb25XaWRnZXQgPSBDb21wb25lbnRGYWN0b3J5LmdldEluc3RhbmNlKCkuY3JlYXRlKG5ldyBDb21wb25lbnREZWZpbml0aW9uKFwiTWFpbk5hdmlnYXRpb25XaWRnZXRcIiwgXCJNYWluTmF2aWdhdGlvbldpZGdldFwiKSkgYXMgSU1haW5OYXZpZ2F0aW9uV2lkZ2V0O1xyXG4gICAgICAgIHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0LmluaXRpYWxpemUodGhpcy5wYXJlbnRDb250ZW50SWQpO1xyXG4gICAgICAgIHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0LmRhdGFNb2RlbCA9ICg8RGF0YU1vZGVscy5JTWFwcENvY2twaXREYXRhTW9kZWw+dGhpcy5kYXRhTW9kZWwpO1xyXG4gICAgICAgIHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0LnNpZGVCYXJXaWRnZXQuZXZlbnRXaWRnZXRBY3RpdmF0ZWQuYXR0YWNoKHRoaXMuX3NpZGVCYXJXaWRnZXRBY3RpdmF0ZWRIYW5kbGVyKTtcclxuICAgICAgICB0aGlzLnJlc2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcclxuXHJcbiAgICAgICAgLy8gSW5pdCBBbGVydEJveFxyXG4gICAgICAgIG5ldyBBbGVydERpYWxvZygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gd2lkdGhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFdpZGdldFxyXG4gICAgICovXHJcbiAgICByZXNpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuX2FjdHVhbFdpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5fYWN0dWFsSGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIGlmKHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0IS5yZXNpemUod2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZCB0aGUgc3R5bGUgaW5mb3JtYXRpb25zIGZvciB0aGUgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGxvYWRTdHlsZXMoKXtcclxuICAgICAgICBzdXBlci5hZGRTdHlsZShcIndpZGdldHMvbWFwcENvY2twaXRXaWRnZXQvc3R5bGUvY3NzL2NvbW1vblN0eWxlVmFyaWFibGVzLmNzc1wiKTtcclxuICAgICAgICBzdXBlci5hZGRTdHlsZShcIndpZGdldHMvbWFwcENvY2twaXRXaWRnZXQvc3R5bGUvY3NzL2NvbW1vblN0eWxlLmNzc1wiKTtcclxuICAgICAgICBzdXBlci5hZGRTdHlsZShcIndpZGdldHMvbWFwcENvY2twaXRXaWRnZXQvc3R5bGUvY3NzL2RlZmF1bHRTY3JvbGxiYXJTdHlsZS5jc3NcIik7XHJcbiAgICAgICAgc3VwZXIuYWRkU3R5bGUoXCJ3aWRnZXRzL21hcHBDb2NrcGl0V2lkZ2V0L3N0eWxlL2Nzcy9jb21tb25Ub29sYmFyU3R5bGUuY3NzXCIpO1xyXG4gICAgICAgIHN1cGVyLmFkZFN0eWxlKFwid2lkZ2V0cy9tYXBwQ29ja3BpdFdpZGdldC9zdHlsZS9jc3MvYWxlcnRCb3hTdHlsZS5jc3NcIik7XHJcbiAgICAgICAgc3VwZXIuYWRkU3R5bGUoXCJ3aWRnZXRzL21hcHBDb2NrcGl0V2lkZ2V0L3N0eWxlL2Nzcy9kcmFnRHJvcFN0eWxlLmNzc1wiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gc2VuZGVyXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uQ29udGVudEFjdGl2YXRlZChzZW5kZXIsIGFyZ3MpIHtcclxuICAgICAgICBhcmdzLndpZGdldC5hY3RpdmF0ZSgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIHdpZGdldCBjb250ZW50IGFuZCBldmVudHVhbGx5IHN1YndpZGdldHNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRXaWRnZXRcclxuICAgICAqL1xyXG4gICAgaW5pdGlhbGl6ZWQoKTogdm9pZCB7XHJcbiAgICAgICAgLy8gY3JlYXRlIHRoZSBzdGFydCBwYWdlXHJcbiAgICAgICAgdGhpcy5jcmVhdGVTdGFydFBhZ2VXaWRnZXQoKTtcclxuXHJcbiAgICAgICAgLy8gY29ubmVjdCB0aGUgbWFpbiBkYXRhIG1vZGVsXHJcbiAgICAgICAgbGV0IG1haW5EYXRhTW9kZWwgPSAoPERhdGFNb2RlbHMuSU1hcHBDb2NrcGl0RGF0YU1vZGVsPnRoaXMuZGF0YU1vZGVsKTtcclxuICAgICAgICBsZXQgbWFpbk1hcHBDb2NrcGl0TW9kZWwgPSBtYWluRGF0YU1vZGVsLmRhdGFTb3VyY2U7XHJcblxyXG4gICAgICAgIC8vIHdhaXQgZm9yIHN1Y2Nlc3NmdWxsIGNvbm5lY3Rpb25cclxuICAgICAgICBtYWluTWFwcENvY2twaXRNb2RlbC5ldmVudE1vZGVsQ29ubmVjdGlvbkNoYW5nZWQuYXR0YWNoKHRoaXMuX21haW5Nb2RlbENvbm5lY3Rpb25DaGFuZ2VkSGFuZGxlcilcclxuXHJcbiAgICAgICAgLy8gY29ubmVjdCB0aGUgbWFpbiBtb2RlbFxyXG4gICAgICAgIG1haW5NYXBwQ29ja3BpdE1vZGVsLmNvbm5lY3QoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNvbm5lY3Rpb25DaGFuZ2VkKHNlbmRlcjogTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWwsIGNvbm5lY3RlZDogYm9vbGVhbil7XHJcbiAgICAgICAgaWYgKGNvbm5lY3RlZCkge1xyXG4gICAgICAgICAgICB0aGlzLm9uTWFpbk1vZGVsQ29ubmVjdGVkKHNlbmRlcik7ICAgICBcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5vbk1haW5Nb2RlbERpc2Nvbm5lY3RlZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCBhZnRlciB0aGUgbWFpbiBtb2RlbCBoYXMgYmVlbiBjb25uZWN0ZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbH0gbWFpbk1hcHBDb2NrcGl0TW9kZWxcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbk1haW5Nb2RlbENvbm5lY3RlZChtYWluTWFwcENvY2twaXRNb2RlbDogTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWwpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk1hcHBDb2NrcGl0V2lkZ2V0Lm9uTWFpbk1vZGVsQ29ubmVjdGVkKClcIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VVc2VyVG9Bbm9ueW1vdXMoKTtcclxuICAgICAgICAgICAgdGhpcy5fbG9naW5XaWRnZXQgPSBDb21wb25lbnRGYWN0b3J5LmdldEluc3RhbmNlKCkuY3JlYXRlKG5ldyBDb21wb25lbnREZWZpbml0aW9uKFwiTG9naW5XaWRnZXRcIiwgXCJMb2dpbldpZGdldFwiKSkgYXMgSUxvZ2luV2lkZ2V0O1xyXG4gICAgICAgICAgICB0aGlzLl9sb2dpbldpZGdldC5sb2dpbkludGVyZmFjZSA9IHsgY29tbWFuZENoYW5nZVVzZXI6IG1haW5NYXBwQ29ja3BpdE1vZGVsLmNvbW1hbmRDaGFuZ2VVc2VyIH07XHJcbiAgICAgICAgICAgIHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0LnNpZGVCYXJXaWRnZXQuYWRkV2lkZ2V0KHRoaXMuX2xvZ2luV2lkZ2V0LCBcImxvZ2luV2lkZ2V0XCIsIFZpZXdUeXBlLlVzZXIsIFZpZXdUeXBlUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXRJY29uQnlWaWV3VHlwZShWaWV3VHlwZS5Vc2VyKSk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQ29udGVudFdpZGdldHMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9tYWluTmF2aWdhdGlvbldpZGdldC5zZWxlY3RUYWIoXCJTdGFydFZpZXdcIiwgXCJTdGFydHBhZ2VcIiwgVmlld1R5cGUuT3ZlcnZpZXcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIGFmdGVyIHRoZSBtYWluIG1vZGVsIGhhcyBiZWVuIGRpc2Nvbm5lY3RlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uTWFpbk1vZGVsRGlzY29ubmVjdGVkKCk6IGFueSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJNYXBwQ29ja3BpdFdpZGdldC5vbk1haW5Nb2RlbERpc2Nvbm5lY3RlZCgpXCIpO1xyXG4gICAgICAgIHRoaXMuc2V0QnVzeUluZm9ybWF0aW9uKG5ldyBCdXN5SW5mb3JtYXRpb24oXCJDb25uZWN0aW9uIHRvIHNlcnZlciBpcyBsb3N0ITxici8+Jm5ic3A7UmVmcmVzaCBwYWdlIHRvIHJlY29ubmVjdC5cIiwgSW1hZ2VJZC5kaXNjb25uZWN0ZWRJbWFnZSkpO1xyXG4gICAgICAgIHRoaXMuc2V0QnVzeSh0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIGNvbnRlbnQgd2lkZ2V0c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVDb250ZW50V2lkZ2V0cygpIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZUNvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0KCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVUcmFjZU92ZXJ2aWV3V2lkZ2V0KCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVUb29sc092ZXJ2aWV3V2lkZ2V0KCk7XHJcblxyXG4gICAgICAgIC8vdGhpcy5jcmVhdGVEdW1teVdpZGdldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlU3RhcnRQYWdlV2lkZ2V0KCl7XHJcblxyXG4gICAgICAgIHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0LmFkZFNpZGVCYXJUYWIoXCJTdGFydFZpZXdcIiwgXCJ3aWRnZXRzL21hcHBDb2NrcGl0V2lkZ2V0L3N0eWxlL2ltYWdlcy9BcmVhcy9TdGFydFBhZ2VBcmVhLnN2Z1wiKTtcclxuXHJcbiAgICAgICAgdGhpcy5fc3RhcnRQYWdlV2lkZ2V0ID0gQ29tcG9uZW50RmFjdG9yeS5nZXRJbnN0YW5jZSgpLmNyZWF0ZShuZXcgQ29tcG9uZW50RGVmaW5pdGlvbihcIlN0YXJ0UGFnZVdpZGdldFwiLCBcIlN0YXJ0UGFnZVdpZGdldFwiKSkgYXMgSVdpZGdldDtcclxuICAgICAgICBpZih0aGlzLl9zdGFydFBhZ2VXaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fbWFpbk5hdmlnYXRpb25XaWRnZXQuYWRkV2lkZ2V0KHRoaXMuX3N0YXJ0UGFnZVdpZGdldCwgXCJTdGFydHBhZ2VcIiwgVmlld1R5cGUuT3ZlcnZpZXcsIHtwYXJlbnQ6IFwiU3RhcnRWaWV3XCIsIHdpZGdldFBvc2l0aW9uOiBUYWJXaWRnZXRXaWRnZXRQb3NpdG9ucy5sZWZ0fSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4vKlxyXG4gICAgcHJpdmF0ZSBjcmVhdGVEdW1teVdpZGdldCgpe1xyXG4gICAgICAgIHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0LmFkZFNpZGVCYXJUYWIoXCJEdW1teVZpZXdcIiwgXCJ3aWRnZXRzL21hcHBDb2NrcGl0V2lkZ2V0L3N0eWxlL2ltYWdlcy9BcmVhcy9Ub29sc0FyZWEuc3ZnXCIpO1xyXG5cclxuICAgICAgICB0aGlzLl9kdW1teVdpZGdldCA9IENvbXBvbmVudEZhY3RvcnkuZ2V0SW5zdGFuY2UoKS5jcmVhdGUobmV3IENvbXBvbmVudERlZmluaXRpb24oXCJEdW1teVdpZGdldFwiLCBcIkR1bW15V2lkZ2V0SWRcIiwpKTtcclxuICAgICAgICBpZih0aGlzLl9kdW1teVdpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9tYWluTmF2aWdhdGlvbldpZGdldC5hZGRXaWRnZXQodGhpcy5fZHVtbXlXaWRnZXQsIFwiRHVtbXlXaWRnZXRcIiwgVmlld1R5cGUuT3ZlcnZpZXcsIHtwYXJlbnQ6IFwiRHVtbXlWaWV3XCIsIHdpZGdldFBvc2l0aW9uOiBUYWJXaWRnZXRXaWRnZXRQb3NpdG9ucy5sZWZ0fSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSovXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVUb29sc092ZXJ2aWV3V2lkZ2V0KCl7XHJcbiAgICAgICAgdGhpcy5fbWFpbk5hdmlnYXRpb25XaWRnZXQuYWRkU2lkZUJhclRhYihcIlRvb2xzVmlld1wiLCBcIndpZGdldHMvbWFwcENvY2twaXRXaWRnZXQvc3R5bGUvaW1hZ2VzL0FyZWFzL1Rvb2xzQXJlYS5zdmdcIik7XHJcbiAgICAgICBcclxuICAgICAgICB0aGlzLl90b29sc092ZXJ2aWV3V2lkZ2V0ID0gQ29tcG9uZW50RmFjdG9yeS5nZXRJbnN0YW5jZSgpLmNyZWF0ZShuZXcgQ29tcG9uZW50RGVmaW5pdGlvbihcIlRvb2xzT3ZlcnZpZXdXaWRnZXRcIiwgXCJUb29sc092ZXJ2aWV3V2lkZ2V0XCIpKSBhcyBJVG9vbHNPdmVydmlld1dpZGdldDtcclxuXHJcbiAgICAgICAgLy8gcmVhZCB0aGUgYXZhaWxhYmxlIGNvbXBvbmVudHNcclxuICAgICAgICBpZigoPERhdGFNb2RlbHMuSU1hcHBDb2NrcGl0RGF0YU1vZGVsPnRoaXMuZGF0YU1vZGVsKS5kYXRhU291cmNlLmNvbXBvbmVudHMgIT0gdW5kZWZpbmVkICYmXHJcbiAgICAgICAgICAgICg8RGF0YU1vZGVscy5JTWFwcENvY2twaXREYXRhTW9kZWw+dGhpcy5kYXRhTW9kZWwpLmRhdGFTb3VyY2UuY29tcG9uZW50cy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuX3Rvb2xzT3ZlcnZpZXdXaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVRvb2xzT3ZlcnZpZXdDb250ZW50KCg8RGF0YU1vZGVscy5JTWFwcENvY2twaXREYXRhTW9kZWw+dGhpcy5kYXRhTW9kZWwpLmRhdGFTb3VyY2UuY29tcG9uZW50cywgdGhpcy5fdG9vbHNPdmVydmlld1dpZGdldCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICg8RGF0YU1vZGVscy5JTWFwcENvY2twaXREYXRhTW9kZWw+dGhpcy5kYXRhTW9kZWwpLmRhdGFTb3VyY2UuY29tcG9uZW50c1NvdXJjZS5yZWFkKChjb21wb25lbnRzKT0+e1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5fdG9vbHNPdmVydmlld1dpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlVG9vbHNPdmVydmlld0NvbnRlbnQoY29tcG9uZW50cywgdGhpcy5fdG9vbHNPdmVydmlld1dpZGdldCk7ICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgY29udGVudCBvZiB0aGUgdG9vbHMgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRbXX0gY29tcG9uZW50c1xyXG4gICAgICogQHBhcmFtIHtXaWRnZXRzLklDb21wb25lbnRPdmVydmlld1dpZGdldH0gdG9vbHNPdmVydmlld1dpZGdldFxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlVG9vbHNPdmVydmlld0NvbnRlbnQoY29tcG9uZW50czogTWFwcENvY2twaXRDb21wb25lbnRbXSwgdG9vbHNPdmVydmlld1dpZGdldDogSVRvb2xzT3ZlcnZpZXdXaWRnZXQpIHtcclxuICAgICAgICBcclxuICAgICAgICAvLyBjcmVhdGUgYW5kIGluaXRpYWxpemUgY29tcG9uZW50cyBsaW5rXHJcbiAgICAgICAgbGV0IGNvbXBvbmVudHNMaW5rOiBQcm9wZXJ0eTxBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudD4+ID0gUHJvcGVydHkuY3JlYXRlPEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50Pj4oW10pO1xyXG4gICAgICAgIGNvbXBvbmVudHNMaW5rLnZhbHVlID0gY29tcG9uZW50cztcclxuICAgICAgICB0b29sc092ZXJ2aWV3V2lkZ2V0LmNvbXBvbmVudHMgPSBjb21wb25lbnRzTGluaztcclxuXHJcbiAgICAgICAgLy8gYWRkIG92ZXJ2aWV3IHdpZGdldFxyXG4gICAgICAgIHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0LmFkZFdpZGdldCh0b29sc092ZXJ2aWV3V2lkZ2V0LCBcIlRvb2xzT3ZlcnZpZXdcIiwgVmlld1R5cGUuT3ZlcnZpZXcsIHtwYXJlbnQ6IFwiVG9vbHNWaWV3XCIsIHdpZGdldFBvc2l0aW9uOiBUYWJXaWRnZXRXaWRnZXRQb3NpdG9ucy5sZWZ0fSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVDb21wb25lbnRPdmVydmlld1dpZGdldCgpIHtcclxuICAgICAgICB0aGlzLl9tYWluTmF2aWdhdGlvbldpZGdldC5hZGRTaWRlQmFyVGFiKFwiQ29tcG9uZW50c1ZpZXdcIiwgXCJ3aWRnZXRzL21hcHBDb2NrcGl0V2lkZ2V0L3N0eWxlL2ltYWdlcy9BcmVhcy9Db21wb25lbnRBcmVhLnN2Z1wiKTtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIHRoZSBvdmVydmlldyB3aWRnZXRcclxuICAgICAgICB0aGlzLl9jb21wb25lbnRPdmVydmlld1dpZGdldCA9IENvbXBvbmVudEZhY3RvcnkuZ2V0SW5zdGFuY2UoKS5jcmVhdGUobmV3IENvbXBvbmVudERlZmluaXRpb24oXCJDb21wb25lbnRPdmVydmlld1dpZGdldFwiLCBcIkNvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0XCIpKSBhcyBJQ29tcG9uZW50T3ZlcnZpZXdXaWRnZXQ7XHJcblxyXG4gICAgICAgIC8vIHJlYWQgdGhlIGF2YWlsYWJsZSB1c2VyIGNvbXBvbmVudHNcclxuICAgICAgICAoPERhdGFNb2RlbHMuSU1hcHBDb2NrcGl0RGF0YU1vZGVsPnRoaXMuZGF0YU1vZGVsKS5kYXRhU291cmNlLnVzZXJDb21wb25lbnRzU291cmNlLnJlYWQoKHVzZXJDb21wb25lbnRzKT0+e1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUNvbXBvbmVudE92ZXJ2aWV3Q29udGVudCh1c2VyQ29tcG9uZW50cyk7ICBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIGNvbnRlbnQgb2YgdGhlIG92ZXJ2aWV3IHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50W119IHVzZXJDb21wb25lbnRzXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVDb21wb25lbnRPdmVydmlld0NvbnRlbnQodXNlckNvbXBvbmVudHM6IE1hcHBDb2NrcGl0Q29tcG9uZW50W10pIHtcclxuICAgICAgICBcclxuICAgICAgICAvLyBjcmVhdGUgYW5kIGluaXRpYWxpemUgY29tcG9uZW50cyBsaW5rXHJcbiAgICAgICAgbGV0IGNvbXBvbmVudHNMaW5rOiBQcm9wZXJ0eTxBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudD4+ID0gUHJvcGVydHkuY3JlYXRlPEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50Pj4oW10pO1xyXG4gICAgICAgIGNvbXBvbmVudHNMaW5rLnZhbHVlID0gdXNlckNvbXBvbmVudHM7XHJcbiAgICAgICAgaWYoIHRoaXMuX2NvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0LmNvbXBvbmVudHMgPSBjb21wb25lbnRzTGluaztcclxuXHJcbiAgICAgICAgICAgIC8vIGFkZCBvdmVydmlldyB3aWRnZXRcclxuICAgICAgICAgICAgdGhpcy5fbWFpbk5hdmlnYXRpb25XaWRnZXQuYWRkV2lkZ2V0KHRoaXMuX2NvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0LCBcIkNvbXBvbmVudE92ZXJ2aWV3XCIsIFZpZXdUeXBlLk92ZXJ2aWV3LCB7IHBhcmVudDogXCJDb21wb25lbnRzVmlld1wiLCB3aWRnZXRQb3NpdGlvbjogVGFiV2lkZ2V0V2lkZ2V0UG9zaXRvbnMubGVmdCB9KTtcclxuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50T3ZlcnZpZXdXaWRnZXQuZXZlbnRPcGVuVmlldy5hdHRhY2godGhpcy5fY29tcG9uZW50T3ZlcnZpZXdPcGVuVmlld0hhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gc2VuZGVyXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50T3BlblZpZXdBcmdzfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbkNvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0T3BlblZpZXcoc2VuZGVyLCBhcmdzOiBFdmVudE9wZW5WaWV3QXJncyl7XHJcblxyXG4gICAgICAgIHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0LmFkZFZpZXcoXCJDb21wb25lbnRzVmlld1wiICwgYXJncy5jb21wb25lbnQsIGFyZ3Mudmlld1R5cGUsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hhbmdlcyB0aGUgdXNlciB0byBhbm9ueW1vdXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2hhbmdlVXNlclRvQW5vbnltb3VzKCkge1xyXG4gICAgICAgIGxldCBtYWluRGF0YU1vZGVsID0gKDxEYXRhTW9kZWxzLklNYXBwQ29ja3BpdERhdGFNb2RlbD50aGlzLmRhdGFNb2RlbCk7XHJcbiAgICAgICAgbGV0IHVzZXJJbmZvID0geyB1c2VybmFtZTogXCJBbm9ueW1vdXNcIiwgcGFzc3dvcmQ6IFwiXCIgfTtcclxuICAgICAgICBtYWluRGF0YU1vZGVsLmRhdGFTb3VyY2UuY29tbWFuZENoYW5nZVVzZXIuZXhlY3V0ZSh1c2VySW5mbywgKHVzZXJSb2xlcykgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIiVvIExvZ2dlZCBpbiB3aXRoIHJvbGVzOiAlb1wiLHVzZXJJbmZvLnVzZXJuYW1lLCB1c2VyUm9sZXMpO1xyXG4gICAgICAgIH0sKGVycm9yKT0+e1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ291bGQgbm90IGxvZyBpbjogJW8gJW9cIiwgdXNlckluZm8udXNlcm5hbWUsIGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZXMgdGhlIHRyYWNldmlldyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlVHJhY2VPdmVydmlld1dpZGdldCgpIHtcclxuICAgICAgICB0aGlzLl9tYWluTmF2aWdhdGlvbldpZGdldC5hZGRTaWRlQmFyVGFiKFwiVHJhY2VWaWV3XCIsIFwid2lkZ2V0cy9tYXBwQ29ja3BpdFdpZGdldC9zdHlsZS9pbWFnZXMvQXJlYXMvVHJhY2VBcmVhLnN2Z1wiKTtcclxuXHJcbiAgICAgICAgdGhpcy5fdHJhY2VPdmVydmlld1dpZGdldCA9IENvbXBvbmVudEZhY3RvcnkuZ2V0SW5zdGFuY2UoKS5jcmVhdGUobmV3IENvbXBvbmVudERlZmluaXRpb24oXCJUcmFjZU92ZXJ2aWV3V2lkZ2V0XCIsIFwiVHJhY2VPdmVydmlld1dpZGdldFwiKSkgYXMgSVRyYWNlT3ZlcnZpZXdXaWRnZXQ7XHJcbiAgICAgICAgIC8vIGluaXRpYWxpemUgdGhlIHRyYWNlIHByb3ZpZGVyXHJcbiAgICAgICAgKDxEYXRhTW9kZWxzLklNYXBwQ29ja3BpdERhdGFNb2RlbD50aGlzLmRhdGFNb2RlbCkuZGF0YVNvdXJjZS50cmFjZVByb3ZpZGVyLmluaXRpYWxpemUoKS50aGVuKCgpPT57XHJcbiAgICAgICAgICAgIGxldCB0cmFjZUNvbXBvbmVudHMgPSAoPERhdGFNb2RlbHMuSU1hcHBDb2NrcGl0RGF0YU1vZGVsPnRoaXMuZGF0YU1vZGVsKS5kYXRhU291cmNlLnRyYWNlUHJvdmlkZXIudHJhY2VDb21wb25lbnRzO1xyXG4gXHJcbiAgICAgICAgICAgIGxldCB0cmFjZUNvbXBvbmVudHNMaW5rOiBQcm9wZXJ0eTxBcnJheTxNYXBwQ29ja3BpdFRyYWNlQ29tcG9uZW50Pj4gPSBQcm9wZXJ0eS5jcmVhdGU8QXJyYXk8TWFwcENvY2twaXRUcmFjZUNvbXBvbmVudD4+KFtdKTtcclxuICAgICAgICAgICAgdHJhY2VDb21wb25lbnRzTGluay52YWx1ZSA9IHRyYWNlQ29tcG9uZW50cztcclxuICAgICBcclxuICAgICAgICAgICAgaWYodGhpcy5fdHJhY2VPdmVydmlld1dpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdHJhY2VPdmVydmlld1dpZGdldC5jb21wb25lbnRzID0gdHJhY2VDb21wb25lbnRzTGluaztcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbWFpbk5hdmlnYXRpb25XaWRnZXQuYWRkV2lkZ2V0KHRoaXMuX3RyYWNlT3ZlcnZpZXdXaWRnZXQsIFwiVHJhY2VPdmVydmlld1wiLCBWaWV3VHlwZS5PdmVydmlldywgeyBwYXJlbnQ6IFwiVHJhY2VWaWV3XCIsIHdpZGdldFBvc2l0aW9uOiBUYWJXaWRnZXRXaWRnZXRQb3NpdG9ucy5sZWZ0IH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdHJhY2VPdmVydmlld1dpZGdldC5ldmVudE9wZW5WaWV3LmF0dGFjaCh0aGlzLl90cmFjZU92ZXJ2aWV3T3BlblZpZXdIYW5kbGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7RXZlbnRPcGVuVmlld0FyZ3N9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uVHJhY2VPdmVydmlld1dpZGdldE9wZW5WaWV3KHNlbmRlciwgYXJnczogRXZlbnRPcGVuVmlld0FyZ3Mpe1xyXG4gICAgICAgIHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0LmFkZFZpZXcoXCJUcmFjZVZpZXdcIiwgYXJncy5jb21wb25lbnQsIGFyZ3Mudmlld1R5cGUsIHRydWUpXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IE1hcHBDb2NrcGl0V2lkZ2V0IH07Il19