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
define(["require", "exports", "../common/widgetBase", "../../widgets/widgets", "../tabWidget/interfaces/tabWidgetInterface", "../common/viewTypeProvider", "../../framework/property", "../common/busyInformation", "../common/alertDialog", "../common/imageProvider"], function (require, exports, widgetBase_1, Widgets, tabWidgetInterface_1, viewTypeProvider_1, property_1, busyInformation_1, alertDialog_1, imageProvider_1) {
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
            this._mainNavigationWidget = Widgets.MainNavigationWidget.create();
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
        MappCockpitWidget.prototype.createWidgets = function () {
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
                this._loginWidget = Widgets.LoginWidget.create();
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
        };
        /**
         *
         *
         * @private
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.createStartPageWidget = function () {
            this._mainNavigationWidget.addSideBarTab("StartView", "widgets/mappCockpitWidget/style/images/Areas/StartPageArea.svg");
            var startPageWidget = Widgets.StartPageWidget.create();
            this._mainNavigationWidget.addWidget(startPageWidget, "Startpage", viewTypeProvider_1.ViewType.Overview, { parent: "StartView", widgetPosition: tabWidgetInterface_1.TabWidgetWidgetPositons.left });
        };
        /**
         *
         *
         * @private
         * @memberof MappCockpitWidget
         */
        MappCockpitWidget.prototype.createToolsOverviewWidget = function () {
            var _this = this;
            this._mainNavigationWidget.addSideBarTab("ToolsView", "widgets/mappCockpitWidget/style/images/Areas/ToolsArea.svg");
            var toolsOverviewWidget = Widgets.ToolsOverviewWidget.create();
            // read the available components
            if (this.dataModel.dataSource.components != undefined &&
                this.dataModel.dataSource.components.length > 0) {
                this.createToolsOverviewContent(this.dataModel.dataSource.components, toolsOverviewWidget);
            }
            else {
                this.dataModel.dataSource.componentsSource.read(function (components) {
                    _this.createToolsOverviewContent(components, toolsOverviewWidget);
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
            this._componentOverviewWidget = Widgets.ComponentOverviewWidget.create();
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
            this._traceOverviewWidget = Widgets.TraceOverviewWidget.create();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcENvY2twaXRXaWRnZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvbWFwcENvY2twaXRXaWRnZXQvbWFwcENvY2twaXRXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQWlCQTtRQUFnQyxxQ0FBVTtRQUExQztZQUFBLHFFQStWQztZQXhWVyxvQ0FBOEIsR0FBRyxVQUFDLE1BQU0sRUFBQyxJQUFJLElBQUcsT0FBQSxLQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxFQUFwQyxDQUFvQyxDQUFDO1lBQ3JGLHVDQUFpQyxHQUFHLFVBQUMsTUFBTSxFQUFFLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxpQ0FBaUMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQXBELENBQW9ELENBQUE7WUFDMUcsbUNBQTZCLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLDZCQUE2QixDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsRUFBL0MsQ0FBK0MsQ0FBQztZQUVqRyx3Q0FBa0MsR0FBRyxVQUFDLE1BQU0sRUFBQyxTQUFTLElBQUssT0FBQSxLQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxFQUF6QyxDQUF5QyxDQUFDOztRQW9WakgsQ0FBQztRQWxWRzs7Ozs7V0FLRztRQUNILHNDQUFVLEdBQVYsVUFBVyxpQkFBeUI7WUFDaEMsaUJBQU0sVUFBVSxZQUFDLGlCQUFpQixDQUFDLENBQUM7WUFFcEMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUMsV0FBVyxFQUFFLDJCQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFakYsbURBQW1EO1lBQ25ELDZCQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDaEMsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSCxt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LENBQUMsZUFBZSxDQUFDO2dCQUVsSCxJQUFJLG1CQUFtQixHQUErQyxtQkFBUSxDQUFDLE1BQU0sQ0FBbUMsRUFBRSxDQUFDLENBQUM7Z0JBQzVILG1CQUFtQixDQUFDLEtBQUssR0FBRyxlQUFlLENBQUM7Z0JBRTVDLElBQUcsS0FBSSxDQUFDLG9CQUFvQixJQUFJLFNBQVMsRUFBQztvQkFDdEMsS0FBSSxDQUFDLG9CQUFvQixDQUFDLFVBQVUsR0FBRyxtQkFBbUIsQ0FBQztvQkFFM0QsS0FBSSxDQUFDLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxLQUFJLENBQUMsb0JBQW9CLEVBQUUsZUFBZSxFQUFFLDJCQUFRLENBQUMsUUFBUSxFQUFFLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUUsNENBQXVCLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztvQkFDM0ssS0FBSSxDQUFDLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLDZCQUE2QixDQUFDLENBQUM7aUJBQ3RGO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNLLHlEQUE2QixHQUFyQyxVQUFzQyxNQUFNLEVBQUUsSUFBdUI7WUFDakUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQ3hGLENBQUM7UUFDTCx3QkFBQztJQUFELENBQUMsQUEvVkQsQ0FBZ0MsdUJBQVUsR0ErVnpDO0lBRVEsOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vd2lkZ2V0QmFzZVwiO1xyXG5cclxuaW1wb3J0ICogYXMgV2lkZ2V0cyBmcm9tIFwiLi4vLi4vd2lkZ2V0cy93aWRnZXRzXCI7XHJcbmltcG9ydCAqIGFzIERhdGFNb2RlbHMgZnJvbSAnLi4vLi4vbW9kZWxzL2RhdGFNb2RlbHMnO1xyXG5pbXBvcnQgeyBJTWFwcENvY2twaXRXaWRnZXQgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL21hcHBDb2NrcGl0V2lkZ2V0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFRhYldpZGdldFdpZGdldFBvc2l0b25zIH0gZnJvbSBcIi4uL3RhYldpZGdldC9pbnRlcmZhY2VzL3RhYldpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBFdmVudE9wZW5WaWV3QXJncyB9IGZyb20gXCIuLi9jb21tb24vZXZlbnRPcGVuVmlld0FyZ3NcIjtcclxuaW1wb3J0IHsgVmlld1R5cGUsIFZpZXdUeXBlUHJvdmlkZXIgfSBmcm9tIFwiLi4vY29tbW9uL3ZpZXdUeXBlUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgUHJvcGVydHkgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL3Byb3BlcnR5XCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9vbmxpbmUvbWFwcENvY2twaXRDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRUcmFjZUNvbXBvbmVudCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvZGlhZ25vc3RpY3MvdHJhY2UvbWFwcENvY2twaXRUcmFjZUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvb25saW5lL2NvbXBvbmVudHNEYXRhTW9kZWxcIjtcclxuaW1wb3J0IHsgQnVzeUluZm9ybWF0aW9uLCBJbWFnZUlkIH0gZnJvbSBcIi4uL2NvbW1vbi9idXN5SW5mb3JtYXRpb25cIjtcclxuaW1wb3J0IHsgQWxlcnREaWFsb2cgfSBmcm9tIFwiLi4vY29tbW9uL2FsZXJ0RGlhbG9nXCI7XHJcbmltcG9ydCB7IEltYWdlUHJvdmlkZXIgfSBmcm9tIFwiLi4vY29tbW9uL2ltYWdlUHJvdmlkZXJcIjtcclxuXHJcblxyXG5jbGFzcyBNYXBwQ29ja3BpdFdpZGdldCBleHRlbmRzIFdpZGdldEJhc2UgaW1wbGVtZW50cyBJTWFwcENvY2twaXRXaWRnZXR7XHJcblxyXG4gICAgcHJpdmF0ZSBfbWFpbk5hdmlnYXRpb25XaWRnZXQhIDogV2lkZ2V0cy5JTWFpbk5hdmlnYXRpb25XaWRnZXQ7XHJcbiAgICBwcml2YXRlIF90cmFjZU92ZXJ2aWV3V2lkZ2V0OiBXaWRnZXRzLklUcmFjZU92ZXJ2aWV3V2lkZ2V0fHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX2NvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0OiBXaWRnZXRzLklDb21wb25lbnRPdmVydmlld1dpZGdldHx1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF9sb2dpbldpZGdldCEgOiBXaWRnZXRzLklMb2dpbldpZGdldDtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfc2lkZUJhcldpZGdldEFjdGl2YXRlZEhhbmRsZXIgPSAoc2VuZGVyLGFyZ3MpPT50aGlzLm9uQ29udGVudEFjdGl2YXRlZChzZW5kZXIsYXJncyk7XHJcbiAgICBwcml2YXRlIF9jb21wb25lbnRPdmVydmlld09wZW5WaWV3SGFuZGxlciA9IChzZW5kZXIsIGFyZ3MpID0+IHRoaXMub25Db21wb25lbnRPdmVydmlld1dpZGdldE9wZW5WaWV3KHNlbmRlciwgYXJncylcclxuICAgIHByaXZhdGUgX3RyYWNlT3ZlcnZpZXdPcGVuVmlld0hhbmRsZXIgPSAoc2VuZGVyLGFyZ3MpID0+IHRoaXMub25UcmFjZU92ZXJ2aWV3V2lkZ2V0T3BlblZpZXcoc2VuZGVyLGFyZ3MpO1xyXG4gICAgXHJcbiAgICBwcml2YXRlIF9tYWluTW9kZWxDb25uZWN0aW9uQ2hhbmdlZEhhbmRsZXIgPSAoc2VuZGVyLGNvbm5lY3RlZCkgPT4gdGhpcy5jb25uZWN0aW9uQ2hhbmdlZChzZW5kZXIsIGNvbm5lY3RlZCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYXlvdXRDb250YWluZXJJZFxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQ6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQpO1xyXG5cclxuICAgICAgICB0aGlzLl9tYWluTmF2aWdhdGlvbldpZGdldC5zZWxlY3RUYWIoXCJTdGFydFZpZXdcIixcIlN0YXJ0cGFnZVwiLCBWaWV3VHlwZS5PdmVydmlldyk7XHJcblxyXG4gICAgICAgIC8vIENhbGwgZ2V0SW5zdGFuY2UgdG8gaW5pdGlhbGl6ZSB0aGUgSW1hZ2VQcm92aWRlclxyXG4gICAgICAgIEltYWdlUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc3Bvc2UgdGhpcyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRXaWRnZXRcclxuICAgICAqL1xyXG4gICAgZGlzcG9zZSgpIHtcclxuICAgICAgICBpZih0aGlzLl9tYWluTmF2aWdhdGlvbldpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9tYWluTmF2aWdhdGlvbldpZGdldC5zaWRlQmFyV2lkZ2V0LmV2ZW50V2lkZ2V0QWN0aXZhdGVkLmRldGFjaCh0aGlzLl9zaWRlQmFyV2lkZ2V0QWN0aXZhdGVkSGFuZGxlcik7XHJcbiAgICAgICAgICAgIHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0LmRhdGFNb2RlbC5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0LmRpc3Bvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5fdHJhY2VPdmVydmlld1dpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl90cmFjZU92ZXJ2aWV3V2lkZ2V0LmV2ZW50T3BlblZpZXcuZGV0YWNoKHRoaXMuX3RyYWNlT3ZlcnZpZXdPcGVuVmlld0hhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLl9jb21wb25lbnRPdmVydmlld1dpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRPdmVydmlld1dpZGdldC5ldmVudE9wZW5WaWV3LmRldGFjaCh0aGlzLl9jb21wb25lbnRPdmVydmlld09wZW5WaWV3SGFuZGxlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBtYWluRGF0YU1vZGVsID0gKDxEYXRhTW9kZWxzLklNYXBwQ29ja3BpdERhdGFNb2RlbD50aGlzLmRhdGFNb2RlbCk7XHJcbiAgICAgICAgaWYobWFpbkRhdGFNb2RlbCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBsZXQgbWFpbk1hcHBDb2NrcGl0TW9kZWwgPSBtYWluRGF0YU1vZGVsLmRhdGFTb3VyY2U7XHJcbiAgICAgICAgICAgIGlmKG1haW5NYXBwQ29ja3BpdE1vZGVsICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBtYWluTWFwcENvY2twaXRNb2RlbC5ldmVudE1vZGVsQ29ubmVjdGlvbkNoYW5nZWQuZGV0YWNoKHRoaXMuX21haW5Nb2RlbENvbm5lY3Rpb25DaGFuZ2VkSGFuZGxlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRXaWRnZXRcclxuICAgICAqL1xyXG4gICAgY3JlYXRlTGF5b3V0KCkge1xyXG4gICAgICAgIHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0ID0gV2lkZ2V0cy5NYWluTmF2aWdhdGlvbldpZGdldC5jcmVhdGUoKSBhcyBXaWRnZXRzLklNYWluTmF2aWdhdGlvbldpZGdldDtcclxuICAgICAgICB0aGlzLl9tYWluTmF2aWdhdGlvbldpZGdldC5pbml0aWFsaXplKHRoaXMucGFyZW50Q29udGVudElkKTtcclxuICAgICAgICB0aGlzLl9tYWluTmF2aWdhdGlvbldpZGdldC5kYXRhTW9kZWwgPSAoPERhdGFNb2RlbHMuSU1hcHBDb2NrcGl0RGF0YU1vZGVsPnRoaXMuZGF0YU1vZGVsKTtcclxuICAgICAgICB0aGlzLl9tYWluTmF2aWdhdGlvbldpZGdldC5zaWRlQmFyV2lkZ2V0LmV2ZW50V2lkZ2V0QWN0aXZhdGVkLmF0dGFjaCh0aGlzLl9zaWRlQmFyV2lkZ2V0QWN0aXZhdGVkSGFuZGxlcik7XHJcbiAgICAgICAgdGhpcy5yZXNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XHJcblxyXG5cclxuICAgICAgICAvLyBJbml0IEFsZXJ0Qm94XHJcbiAgICAgICAgbmV3IEFsZXJ0RGlhbG9nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodFxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHJlc2l6ZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcil7XHJcbiAgICAgICAgdGhpcy5fYWN0dWFsV2lkdGggPSB3aWR0aDtcclxuICAgICAgICB0aGlzLl9hY3R1YWxIZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgaWYodGhpcy5fbWFpbk5hdmlnYXRpb25XaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fbWFpbk5hdmlnYXRpb25XaWRnZXQhLnJlc2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkIHRoZSBzdHlsZSBpbmZvcm1hdGlvbnMgZm9yIHRoZSB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRXaWRnZXRcclxuICAgICAqL1xyXG4gICAgbG9hZFN0eWxlcygpe1xyXG4gICAgICAgIHN1cGVyLmFkZFN0eWxlKFwid2lkZ2V0cy9tYXBwQ29ja3BpdFdpZGdldC9zdHlsZS9jc3MvY29tbW9uU3R5bGVWYXJpYWJsZXMuY3NzXCIpO1xyXG4gICAgICAgIHN1cGVyLmFkZFN0eWxlKFwid2lkZ2V0cy9tYXBwQ29ja3BpdFdpZGdldC9zdHlsZS9jc3MvY29tbW9uU3R5bGUuY3NzXCIpO1xyXG4gICAgICAgIHN1cGVyLmFkZFN0eWxlKFwid2lkZ2V0cy9tYXBwQ29ja3BpdFdpZGdldC9zdHlsZS9jc3MvZGVmYXVsdFNjcm9sbGJhclN0eWxlLmNzc1wiKTtcclxuICAgICAgICBzdXBlci5hZGRTdHlsZShcIndpZGdldHMvbWFwcENvY2twaXRXaWRnZXQvc3R5bGUvY3NzL2NvbW1vblRvb2xiYXJTdHlsZS5jc3NcIik7XHJcbiAgICAgICAgc3VwZXIuYWRkU3R5bGUoXCJ3aWRnZXRzL21hcHBDb2NrcGl0V2lkZ2V0L3N0eWxlL2Nzcy9hbGVydEJveFN0eWxlLmNzc1wiKTtcclxuICAgICAgICBzdXBlci5hZGRTdHlsZShcIndpZGdldHMvbWFwcENvY2twaXRXaWRnZXQvc3R5bGUvY3NzL2RyYWdEcm9wU3R5bGUuY3NzXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25Db250ZW50QWN0aXZhdGVkKHNlbmRlciwgYXJncykge1xyXG4gICAgICAgIGFyZ3Mud2lkZ2V0LmFjdGl2YXRlKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgd2lkZ2V0IGNvbnRlbnQgYW5kIGV2ZW50dWFsbHkgc3Vid2lkZ2V0c1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBjcmVhdGVXaWRnZXRzKCk6IHZvaWQge1xyXG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgc3RhcnQgcGFnZVxyXG4gICAgICAgIHRoaXMuY3JlYXRlU3RhcnRQYWdlV2lkZ2V0KCk7XHJcblxyXG4gICAgICAgIC8vIGNvbm5lY3QgdGhlIG1haW4gZGF0YSBtb2RlbFxyXG4gICAgICAgIGxldCBtYWluRGF0YU1vZGVsID0gKDxEYXRhTW9kZWxzLklNYXBwQ29ja3BpdERhdGFNb2RlbD50aGlzLmRhdGFNb2RlbCk7XHJcbiAgICAgICAgbGV0IG1haW5NYXBwQ29ja3BpdE1vZGVsID0gbWFpbkRhdGFNb2RlbC5kYXRhU291cmNlO1xyXG5cclxuICAgICAgICAvLyB3YWl0IGZvciBzdWNjZXNzZnVsbCBjb25uZWN0aW9uXHJcbiAgICAgICAgbWFpbk1hcHBDb2NrcGl0TW9kZWwuZXZlbnRNb2RlbENvbm5lY3Rpb25DaGFuZ2VkLmF0dGFjaCh0aGlzLl9tYWluTW9kZWxDb25uZWN0aW9uQ2hhbmdlZEhhbmRsZXIpXHJcblxyXG4gICAgICAgIC8vIGNvbm5lY3QgdGhlIG1haW4gbW9kZWxcclxuICAgICAgICBtYWluTWFwcENvY2twaXRNb2RlbC5jb25uZWN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjb25uZWN0aW9uQ2hhbmdlZChzZW5kZXI6IE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsLCBjb25uZWN0ZWQ6IGJvb2xlYW4pe1xyXG4gICAgICAgIGlmIChjb25uZWN0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5vbk1haW5Nb2RlbENvbm5lY3RlZChzZW5kZXIpOyAgICAgXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMub25NYWluTW9kZWxEaXNjb25uZWN0ZWQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgYWZ0ZXIgdGhlIG1haW4gbW9kZWwgaGFzIGJlZW4gY29ubmVjdGVkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWx9IG1haW5NYXBwQ29ja3BpdE1vZGVsXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25NYWluTW9kZWxDb25uZWN0ZWQobWFpbk1hcHBDb2NrcGl0TW9kZWw6IE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJNYXBwQ29ja3BpdFdpZGdldC5vbk1haW5Nb2RlbENvbm5lY3RlZCgpXCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlVXNlclRvQW5vbnltb3VzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2xvZ2luV2lkZ2V0ID0gV2lkZ2V0cy5Mb2dpbldpZGdldC5jcmVhdGUoKTtcclxuICAgICAgICAgICAgdGhpcy5fbG9naW5XaWRnZXQubG9naW5JbnRlcmZhY2UgPSB7IGNvbW1hbmRDaGFuZ2VVc2VyOiBtYWluTWFwcENvY2twaXRNb2RlbC5jb21tYW5kQ2hhbmdlVXNlciB9O1xyXG4gICAgICAgICAgICB0aGlzLl9tYWluTmF2aWdhdGlvbldpZGdldC5zaWRlQmFyV2lkZ2V0LmFkZFdpZGdldCh0aGlzLl9sb2dpbldpZGdldCwgXCJsb2dpbldpZGdldFwiLCBWaWV3VHlwZS5Vc2VyLCBWaWV3VHlwZVByb3ZpZGVyLmdldEluc3RhbmNlKCkuZ2V0SWNvbkJ5Vmlld1R5cGUoVmlld1R5cGUuVXNlcikpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUNvbnRlbnRXaWRnZXRzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbWFpbk5hdmlnYXRpb25XaWRnZXQuc2VsZWN0VGFiKFwiU3RhcnRWaWV3XCIsIFwiU3RhcnRwYWdlXCIsIFZpZXdUeXBlLk92ZXJ2aWV3KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCBhZnRlciB0aGUgbWFpbiBtb2RlbCBoYXMgYmVlbiBkaXNjb25uZWN0ZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbk1haW5Nb2RlbERpc2Nvbm5lY3RlZCgpOiBhbnkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTWFwcENvY2twaXRXaWRnZXQub25NYWluTW9kZWxEaXNjb25uZWN0ZWQoKVwiKTtcclxuICAgICAgICB0aGlzLnNldEJ1c3lJbmZvcm1hdGlvbihuZXcgQnVzeUluZm9ybWF0aW9uKFwiQ29ubmVjdGlvbiB0byBzZXJ2ZXIgaXMgbG9zdCE8YnIvPiZuYnNwO1JlZnJlc2ggcGFnZSB0byByZWNvbm5lY3QuXCIsIEltYWdlSWQuZGlzY29ubmVjdGVkSW1hZ2UpKTtcclxuICAgICAgICB0aGlzLnNldEJ1c3kodHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBjb250ZW50IHdpZGdldHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlQ29udGVudFdpZGdldHMoKSB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVDb21wb25lbnRPdmVydmlld1dpZGdldCgpO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlVHJhY2VPdmVydmlld1dpZGdldCgpO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlVG9vbHNPdmVydmlld1dpZGdldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlU3RhcnRQYWdlV2lkZ2V0KCl7XHJcblxyXG4gICAgICAgIHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0LmFkZFNpZGVCYXJUYWIoXCJTdGFydFZpZXdcIiwgXCJ3aWRnZXRzL21hcHBDb2NrcGl0V2lkZ2V0L3N0eWxlL2ltYWdlcy9BcmVhcy9TdGFydFBhZ2VBcmVhLnN2Z1wiKTtcclxuXHJcbiAgICAgICAgdmFyIHN0YXJ0UGFnZVdpZGdldCA9IFdpZGdldHMuU3RhcnRQYWdlV2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgIHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0LmFkZFdpZGdldChzdGFydFBhZ2VXaWRnZXQsIFwiU3RhcnRwYWdlXCIsIFZpZXdUeXBlLk92ZXJ2aWV3LCB7cGFyZW50OiBcIlN0YXJ0Vmlld1wiLCB3aWRnZXRQb3NpdGlvbjogVGFiV2lkZ2V0V2lkZ2V0UG9zaXRvbnMubGVmdH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlVG9vbHNPdmVydmlld1dpZGdldCgpe1xyXG4gICAgICAgIHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0LmFkZFNpZGVCYXJUYWIoXCJUb29sc1ZpZXdcIiwgXCJ3aWRnZXRzL21hcHBDb2NrcGl0V2lkZ2V0L3N0eWxlL2ltYWdlcy9BcmVhcy9Ub29sc0FyZWEuc3ZnXCIpO1xyXG4gICAgICAgXHJcbiAgICAgICAgdmFyIHRvb2xzT3ZlcnZpZXdXaWRnZXQgPSBXaWRnZXRzLlRvb2xzT3ZlcnZpZXdXaWRnZXQuY3JlYXRlKCk7XHJcblxyXG4gICAgICAgIC8vIHJlYWQgdGhlIGF2YWlsYWJsZSBjb21wb25lbnRzXHJcbiAgICAgICAgaWYoKDxEYXRhTW9kZWxzLklNYXBwQ29ja3BpdERhdGFNb2RlbD50aGlzLmRhdGFNb2RlbCkuZGF0YVNvdXJjZS5jb21wb25lbnRzICE9IHVuZGVmaW5lZCAmJlxyXG4gICAgICAgICAgICAoPERhdGFNb2RlbHMuSU1hcHBDb2NrcGl0RGF0YU1vZGVsPnRoaXMuZGF0YU1vZGVsKS5kYXRhU291cmNlLmNvbXBvbmVudHMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVRvb2xzT3ZlcnZpZXdDb250ZW50KCg8RGF0YU1vZGVscy5JTWFwcENvY2twaXREYXRhTW9kZWw+dGhpcy5kYXRhTW9kZWwpLmRhdGFTb3VyY2UuY29tcG9uZW50cywgdG9vbHNPdmVydmlld1dpZGdldCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICg8RGF0YU1vZGVscy5JTWFwcENvY2twaXREYXRhTW9kZWw+dGhpcy5kYXRhTW9kZWwpLmRhdGFTb3VyY2UuY29tcG9uZW50c1NvdXJjZS5yZWFkKChjb21wb25lbnRzKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVUb29sc092ZXJ2aWV3Q29udGVudChjb21wb25lbnRzLCB0b29sc092ZXJ2aWV3V2lkZ2V0KTsgIFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBjb250ZW50IG9mIHRoZSB0b29scyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFtdfSBjb21wb25lbnRzXHJcbiAgICAgKiBAcGFyYW0ge1dpZGdldHMuSUNvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0fSB0b29sc092ZXJ2aWV3V2lkZ2V0XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVUb29sc092ZXJ2aWV3Q29udGVudChjb21wb25lbnRzOiBNYXBwQ29ja3BpdENvbXBvbmVudFtdLCB0b29sc092ZXJ2aWV3V2lkZ2V0OiBXaWRnZXRzLklDb21wb25lbnRPdmVydmlld1dpZGdldCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGNyZWF0ZSBhbmQgaW5pdGlhbGl6ZSBjb21wb25lbnRzIGxpbmtcclxuICAgICAgICBsZXQgY29tcG9uZW50c0xpbms6IFByb3BlcnR5PEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50Pj4gPSBQcm9wZXJ0eS5jcmVhdGU8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnQ+PihbXSk7XHJcbiAgICAgICAgY29tcG9uZW50c0xpbmsudmFsdWUgPSBjb21wb25lbnRzO1xyXG4gICAgICAgIHRvb2xzT3ZlcnZpZXdXaWRnZXQuY29tcG9uZW50cyA9IGNvbXBvbmVudHNMaW5rO1xyXG5cclxuICAgICAgICAvLyBhZGQgb3ZlcnZpZXcgd2lkZ2V0XHJcbiAgICAgICAgdGhpcy5fbWFpbk5hdmlnYXRpb25XaWRnZXQuYWRkV2lkZ2V0KHRvb2xzT3ZlcnZpZXdXaWRnZXQsIFwiVG9vbHNPdmVydmlld1wiLCBWaWV3VHlwZS5PdmVydmlldywge3BhcmVudDogXCJUb29sc1ZpZXdcIiwgd2lkZ2V0UG9zaXRpb246IFRhYldpZGdldFdpZGdldFBvc2l0b25zLmxlZnR9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZUNvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0KCkge1xyXG4gICAgICAgIHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0LmFkZFNpZGVCYXJUYWIoXCJDb21wb25lbnRzVmlld1wiLCBcIndpZGdldHMvbWFwcENvY2twaXRXaWRnZXQvc3R5bGUvaW1hZ2VzL0FyZWFzL0NvbXBvbmVudEFyZWEuc3ZnXCIpO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgdGhlIG92ZXJ2aWV3IHdpZGdldFxyXG4gICAgICAgIHRoaXMuX2NvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0ID0gV2lkZ2V0cy5Db21wb25lbnRPdmVydmlld1dpZGdldC5jcmVhdGUoKTtcclxuXHJcbiAgICAgICAgLy8gcmVhZCB0aGUgYXZhaWxhYmxlIHVzZXIgY29tcG9uZW50c1xyXG4gICAgICAgICg8RGF0YU1vZGVscy5JTWFwcENvY2twaXREYXRhTW9kZWw+dGhpcy5kYXRhTW9kZWwpLmRhdGFTb3VyY2UudXNlckNvbXBvbmVudHNTb3VyY2UucmVhZCgodXNlckNvbXBvbmVudHMpPT57XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQ29tcG9uZW50T3ZlcnZpZXdDb250ZW50KHVzZXJDb21wb25lbnRzKTsgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgY29udGVudCBvZiB0aGUgb3ZlcnZpZXcgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRbXX0gdXNlckNvbXBvbmVudHNcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZUNvbXBvbmVudE92ZXJ2aWV3Q29udGVudCh1c2VyQ29tcG9uZW50czogTWFwcENvY2twaXRDb21wb25lbnRbXSkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGNyZWF0ZSBhbmQgaW5pdGlhbGl6ZSBjb21wb25lbnRzIGxpbmtcclxuICAgICAgICBsZXQgY29tcG9uZW50c0xpbms6IFByb3BlcnR5PEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50Pj4gPSBQcm9wZXJ0eS5jcmVhdGU8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnQ+PihbXSk7XHJcbiAgICAgICAgY29tcG9uZW50c0xpbmsudmFsdWUgPSB1c2VyQ29tcG9uZW50cztcclxuICAgICAgICBpZiggdGhpcy5fY29tcG9uZW50T3ZlcnZpZXdXaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50T3ZlcnZpZXdXaWRnZXQuY29tcG9uZW50cyA9IGNvbXBvbmVudHNMaW5rO1xyXG5cclxuICAgICAgICAgICAgLy8gYWRkIG92ZXJ2aWV3IHdpZGdldFxyXG4gICAgICAgICAgICB0aGlzLl9tYWluTmF2aWdhdGlvbldpZGdldC5hZGRXaWRnZXQodGhpcy5fY29tcG9uZW50T3ZlcnZpZXdXaWRnZXQsIFwiQ29tcG9uZW50T3ZlcnZpZXdcIiwgVmlld1R5cGUuT3ZlcnZpZXcsIHsgcGFyZW50OiBcIkNvbXBvbmVudHNWaWV3XCIsIHdpZGdldFBvc2l0aW9uOiBUYWJXaWRnZXRXaWRnZXRQb3NpdG9ucy5sZWZ0IH0pO1xyXG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRPdmVydmlld1dpZGdldC5ldmVudE9wZW5WaWV3LmF0dGFjaCh0aGlzLl9jb21wb25lbnRPdmVydmlld09wZW5WaWV3SGFuZGxlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7RXZlbnRPcGVuVmlld0FyZ3N9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uQ29tcG9uZW50T3ZlcnZpZXdXaWRnZXRPcGVuVmlldyhzZW5kZXIsIGFyZ3M6IEV2ZW50T3BlblZpZXdBcmdzKXtcclxuXHJcbiAgICAgICAgdGhpcy5fbWFpbk5hdmlnYXRpb25XaWRnZXQuYWRkVmlldyhcIkNvbXBvbmVudHNWaWV3XCIgLCBhcmdzLmNvbXBvbmVudCwgYXJncy52aWV3VHlwZSwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGFuZ2VzIHRoZSB1c2VyIHRvIGFub255bW91c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjaGFuZ2VVc2VyVG9Bbm9ueW1vdXMoKSB7XHJcbiAgICAgICAgbGV0IG1haW5EYXRhTW9kZWwgPSAoPERhdGFNb2RlbHMuSU1hcHBDb2NrcGl0RGF0YU1vZGVsPnRoaXMuZGF0YU1vZGVsKTtcclxuICAgICAgICBsZXQgdXNlckluZm8gPSB7IHVzZXJuYW1lOiBcIkFub255bW91c1wiLCBwYXNzd29yZDogXCJcIiB9O1xyXG4gICAgICAgIG1haW5EYXRhTW9kZWwuZGF0YVNvdXJjZS5jb21tYW5kQ2hhbmdlVXNlci5leGVjdXRlKHVzZXJJbmZvLCAodXNlclJvbGVzKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiJW8gTG9nZ2VkIGluIHdpdGggcm9sZXM6ICVvXCIsdXNlckluZm8udXNlcm5hbWUsIHVzZXJSb2xlcyk7XHJcbiAgICAgICAgfSwoZXJyb3IpPT57XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDb3VsZCBub3QgbG9nIGluOiAlbyAlb1wiLCB1c2VySW5mby51c2VybmFtZSwgZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY3JlYXRlcyB0aGUgdHJhY2V2aWV3IHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVUcmFjZU92ZXJ2aWV3V2lkZ2V0KCkge1xyXG4gICAgICAgIHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0LmFkZFNpZGVCYXJUYWIoXCJUcmFjZVZpZXdcIiwgXCJ3aWRnZXRzL21hcHBDb2NrcGl0V2lkZ2V0L3N0eWxlL2ltYWdlcy9BcmVhcy9UcmFjZUFyZWEuc3ZnXCIpO1xyXG5cclxuICAgICAgICB0aGlzLl90cmFjZU92ZXJ2aWV3V2lkZ2V0ID0gV2lkZ2V0cy5UcmFjZU92ZXJ2aWV3V2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgICAvLyBpbml0aWFsaXplIHRoZSB0cmFjZSBwcm92aWRlclxyXG4gICAgICAgICg8RGF0YU1vZGVscy5JTWFwcENvY2twaXREYXRhTW9kZWw+dGhpcy5kYXRhTW9kZWwpLmRhdGFTb3VyY2UudHJhY2VQcm92aWRlci5pbml0aWFsaXplKCkudGhlbigoKT0+e1xyXG4gICAgICAgICAgICBsZXQgdHJhY2VDb21wb25lbnRzID0gKDxEYXRhTW9kZWxzLklNYXBwQ29ja3BpdERhdGFNb2RlbD50aGlzLmRhdGFNb2RlbCkuZGF0YVNvdXJjZS50cmFjZVByb3ZpZGVyLnRyYWNlQ29tcG9uZW50cztcclxuIFxyXG4gICAgICAgICAgICBsZXQgdHJhY2VDb21wb25lbnRzTGluazogUHJvcGVydHk8QXJyYXk8TWFwcENvY2twaXRUcmFjZUNvbXBvbmVudD4+ID0gUHJvcGVydHkuY3JlYXRlPEFycmF5PE1hcHBDb2NrcGl0VHJhY2VDb21wb25lbnQ+PihbXSk7XHJcbiAgICAgICAgICAgIHRyYWNlQ29tcG9uZW50c0xpbmsudmFsdWUgPSB0cmFjZUNvbXBvbmVudHM7XHJcbiAgICAgXHJcbiAgICAgICAgICAgIGlmKHRoaXMuX3RyYWNlT3ZlcnZpZXdXaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RyYWNlT3ZlcnZpZXdXaWRnZXQuY29tcG9uZW50cyA9IHRyYWNlQ29tcG9uZW50c0xpbms7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuX21haW5OYXZpZ2F0aW9uV2lkZ2V0LmFkZFdpZGdldCh0aGlzLl90cmFjZU92ZXJ2aWV3V2lkZ2V0LCBcIlRyYWNlT3ZlcnZpZXdcIiwgVmlld1R5cGUuT3ZlcnZpZXcsIHsgcGFyZW50OiBcIlRyYWNlVmlld1wiLCB3aWRnZXRQb3NpdGlvbjogVGFiV2lkZ2V0V2lkZ2V0UG9zaXRvbnMubGVmdCB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RyYWNlT3ZlcnZpZXdXaWRnZXQuZXZlbnRPcGVuVmlldy5hdHRhY2godGhpcy5fdHJhY2VPdmVydmlld09wZW5WaWV3SGFuZGxlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gc2VuZGVyXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50T3BlblZpZXdBcmdzfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvblRyYWNlT3ZlcnZpZXdXaWRnZXRPcGVuVmlldyhzZW5kZXIsIGFyZ3M6IEV2ZW50T3BlblZpZXdBcmdzKXtcclxuICAgICAgICB0aGlzLl9tYWluTmF2aWdhdGlvbldpZGdldC5hZGRWaWV3KFwiVHJhY2VWaWV3XCIsIGFyZ3MuY29tcG9uZW50LCBhcmdzLnZpZXdUeXBlLCB0cnVlKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBNYXBwQ29ja3BpdFdpZGdldCB9OyJdfQ==