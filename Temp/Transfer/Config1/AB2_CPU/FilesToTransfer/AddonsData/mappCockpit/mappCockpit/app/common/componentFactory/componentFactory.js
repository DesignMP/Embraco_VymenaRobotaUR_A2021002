define(["require", "exports", "../../widgets/cursorInfoWidget/model/cursorSignalsDataModel", "../../models/common/seriesProvider/seriesProvider", "../../widgets/widgets", "../../models/dataModels", "../componentBase/componentBase", "../../widgets/common/imageProvider", "../../widgets/common/commonLayoutProvider", "../../widgets/common/seriesIconProvider", "../textProvider/textProvider"], function (require, exports, cursorSignalsDataModel_1, seriesProvider_1, Widgets, DataModels, componentBase_1, imageProvider_1, commonLayoutProvider_1, seriesIconProvider_1, textProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ComponentFactory = /** @class */ (function () {
        function ComponentFactory() {
            this._componentInstances = new Map();
        }
        ComponentFactory.getInstance = function () {
            if (this._instance == undefined) {
                this._instance = new ComponentFactory();
            }
            return this._instance;
        };
        ComponentFactory.prototype.create = function (componentDefinition, context) {
            if (context === void 0) { context = undefined; }
            /* tslint:disable:max-func-body-length */ // disabled due to switch case
            var instance = undefined;
            var doInitialization = false;
            switch (componentDefinition.type) {
                case "e":
                    console.error(componentDefinition);
                    break;
                /////////////////
                // Create widgets
                case "MappCockpitWidget":
                    instance = Widgets.MappCockpitWidget.create();
                    break;
                case "WatchablesWidget":
                    instance = Widgets.WatchablesWidget.create();
                    break;
                case "MethodsWidget":
                    instance = Widgets.MethodsWidget.create();
                    break;
                case "ConfigManagerWidget":
                    instance = Widgets.ConfigManagerWidget.create();
                    break;
                case "SignalManagerWidget":
                    instance = Widgets.SignalManagerWidget.create();
                    break;
                case "ChartManagerWidget":
                    instance = Widgets.ChartManagerWidget.create();
                    break;
                case "TraceViewWidget":
                    instance = Widgets.TraceViewWidget.create();
                    break;
                case "ChartViewWidget":
                    instance = Widgets.ChartViewWidget.create();
                    break;
                case "MessagesWidget":
                    instance = Widgets.MessagesWidget.create();
                    break;
                case "SplitterWidget":
                    instance = Widgets.SplitterWidget.create();
                    break;
                case "ComponentViewWidget":
                    instance = Widgets.ComponentViewWidget.create();
                    break;
                case "MethodListWidget":
                    instance = Widgets.MethodListWidget.create();
                    break;
                case "MethodParameterListWidget":
                    instance = Widgets.MethodParameterListWidget.create();
                    break;
                case "SideBarWidget":
                    instance = Widgets.SideBarWidget.create();
                    break;
                case "TabWidget":
                    instance = Widgets.TabWidget.create();
                    break;
                case "StartPageWidget":
                    instance = Widgets.StartPageWidget.create();
                    break;
                case "ComponentOverviewWidget":
                    instance = Widgets.ComponentOverviewWidget.create();
                    break;
                case "TraceOverviewWidget":
                    instance = Widgets.TraceOverviewWidget.create();
                    break;
                case "TraceConfigurationViewWidget":
                    instance = Widgets.TraceConfigurationViewWidget.create();
                    break;
                case "TraceControlWidget":
                    instance = Widgets.TraceControlWidget.create();
                    break;
                case "TraceConfigurationWidget":
                    instance = Widgets.TraceConfigurationWidget.create();
                    break;
                case "TraceConfigTimingWidget":
                    instance = Widgets.TraceConfigTimingWidget.create();
                    break;
                case "TraceConfigTriggerWidget":
                    instance = Widgets.TraceConfigTriggerWidget.create();
                    break;
                case "TraceConfigDatapointsWidget":
                    instance = Widgets.TraceConfigDatapointsWidget.create();
                    break;
                case "MainNavigationWidget":
                    instance = Widgets.MainNavigationWidget.create();
                    break;
                case "LoginWidget":
                    instance = Widgets.LoginWidget.create();
                    break;
                case "CursorInfoWidget":
                    instance = Widgets.CursorInfoWidget.create();
                    break;
                case "ToolsOverviewWidget":
                    instance = Widgets.ToolsOverviewWidget.create();
                    break;
                case "ChartViewToolbar":
                    instance = Widgets.ChartViewToolbar.create();
                    break;
                case "ChartBase":
                    // Implement creation of chartBase(widget) in the component factory(type must be set by defaultSettingsId => fft, xy, yt, ...)
                    //instance = Widgets.ChartBaseWidget.create();
                    break;
                case "DummyWidget":
                    instance = Widgets.DummyWidget.create();
                    break;
                ////////////////////
                // Create datamodels
                case "MappCockpitDataModel":
                    instance = DataModels.MappCockpitDataModel.create();
                    doInitialization = true;
                    break;
                case "TabWidgetDataModel":
                    instance = DataModels.TabWidgetDataModel.create();
                    doInitialization = true;
                    break;
                case "ConfigManagerDataModel":
                    instance = DataModels.ConfigManagerDataModel.create();
                    doInitialization = true;
                    break;
                case "SignalManagerDataModel":
                    instance = DataModels.SignalManagerDataModel.create();
                    doInitialization = true;
                    break;
                case "ChartManagerDataModel":
                    // TODO: create a mechanism which works for all instanceTypes => CommponentConnectionLayer
                    if (this._componentInstances.has(componentDefinition.id)) {
                        instance = this._componentInstances.get(componentDefinition.id);
                    }
                    else {
                        instance = DataModels.ChartManagerDataModel.create();
                        this.createComponentAndInitializeInstance(componentDefinition, context, instance);
                    }
                    return instance;
                    break;
                case "CursorSignalsDataModel":
                    instance = new cursorSignalsDataModel_1.CursorSignalsDataModel();
                    doInitialization = true;
                    break;
                ////////////////////
                // Create providers
                case "SeriesProvider":
                    if (this._componentInstances.has(componentDefinition.id)) {
                        instance = this._componentInstances.get(componentDefinition.id);
                    }
                    else {
                        instance = seriesProvider_1.SeriesProvider.getInstance();
                        this.createComponentAndInitializeInstance(componentDefinition, context, instance);
                    }
                    return instance;
                    break;
                case "SeriesIconProvider":
                    instance = seriesIconProvider_1.SeriesIconProvider.getInstance();
                    doInitialization = true;
                    break;
                case "ImageProvider":
                    instance = imageProvider_1.ImageProvider.getInstance();
                    break;
                case "CommonLayoutProvider":
                    instance = commonLayoutProvider_1.CommonLayoutProvider.getInstance();
                    doInitialization = true;
                    break;
                case "TextProvider":
                    if (this._componentInstances.has(componentDefinition.id)) {
                        instance = this._componentInstances.get(componentDefinition.id);
                    }
                    else {
                        instance = new textProvider_1.TextProvider();
                        this.createComponentAndInitializeInstance(componentDefinition, context, instance);
                    }
                    return instance;
                    break;
                default:
                    console.error("Unkown type used for instance factory: " + componentDefinition.type);
                    break;
            }
            if (instance != undefined) {
                this.createComponent(instance, componentDefinition, context);
                if (doInitialization == true) {
                    // Does the initialization of the instance(datamodel,...) => widgets will be initialized later at the add of a widget to a splitter widget
                    instance.initialize();
                }
            }
            return instance;
            /* tslint:enable:max-func-body-length */
        };
        ComponentFactory.prototype.createComponentAndInitializeInstance = function (componentDefinition, context, instance) {
            if (context === void 0) { context = undefined; }
            this._componentInstances.set(componentDefinition.id, instance);
            this.createComponent(instance, componentDefinition, context);
            instance.initialize();
        };
        ComponentFactory.prototype.disposeComponent = function (id) {
            if (this._componentInstances.has(id)) {
                var instance = this._componentInstances.get(id);
                if (instance != undefined) {
                    instance.dispose();
                    this._componentInstances.delete(id);
                }
            }
        };
        /**
         * Creates an initializes the component object for the given instance(widget, datamodel, provider, ...)
         *
         * @private
         * @param {IComponent} instance
         * @param {ComponentDefinition} componentDefinition
         * @param {*} context
         * @memberof ComponentFactory
         */
        ComponentFactory.prototype.createComponent = function (instance, componentDefinition, context) {
            instance.component = new componentBase_1.ComponentBase(this, instance);
            instance.component.initialize();
            if (context != undefined) {
                instance.component.context = context;
            }
            instance.component.setDefinition(componentDefinition);
        };
        return ComponentFactory;
    }());
    exports.ComponentFactory = ComponentFactory;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50RmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL2NvbXBvbmVudEZhY3RvcnkvY29tcG9uZW50RmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFlQTtRQUFBO1lBRVksd0JBQW1CLEdBQUcsSUFBSSxHQUFHLEVBQXNCLENBQUM7UUEwT2hFLENBQUM7UUF0T2lCLDRCQUFXLEdBQXpCO1lBQ0ksSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFJLFNBQVMsRUFBQztnQkFDM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLGdCQUFnQixFQUFFLENBQUM7YUFDM0M7WUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDMUIsQ0FBQztRQUVNLGlDQUFNLEdBQWIsVUFBYyxtQkFBd0MsRUFBRSxPQUErQztZQUEvQyx3QkFBQSxFQUFBLG1CQUErQztZQUNuRyx5Q0FBeUMsQ0FBQyw4QkFBOEI7WUFDeEUsSUFBSSxRQUFRLEdBQXlCLFNBQVMsQ0FBQztZQUMvQyxJQUFJLGdCQUFnQixHQUFHLEtBQUssQ0FBQztZQUM3QixRQUFPLG1CQUFtQixDQUFDLElBQUksRUFBQztnQkFDNUIsS0FBSyxHQUFHO29CQUNKLE9BQU8sQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztvQkFDbkMsTUFBTTtnQkFDVixpQkFBaUI7Z0JBQ2pCLGlCQUFpQjtnQkFDakIsS0FBSyxtQkFBbUI7b0JBQ3BCLFFBQVEsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQzlDLE1BQU07Z0JBQ1YsS0FBSyxrQkFBa0I7b0JBQ25CLFFBQVEsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQzdDLE1BQU07Z0JBQ1YsS0FBSyxlQUFlO29CQUNoQixRQUFRLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FB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LEFBNU9ELElBNE9DO0lBNU9ZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDb21wb25lbnRGYWN0b3J5IH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9jb21wb25lbnRGYWN0b3J5SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElDb21wb25lbnQgfSBmcm9tIFwiLi4vY29tcG9uZW50QmFzZS9pbnRlcmZhY2VzL2NvbXBvbmVudEludGVyZmFjZVwiO1xyXG5cclxuaW1wb3J0IHsgQ3Vyc29yU2lnbmFsc0RhdGFNb2RlbCB9IGZyb20gXCIuLi8uLi93aWRnZXRzL2N1cnNvckluZm9XaWRnZXQvbW9kZWwvY3Vyc29yU2lnbmFsc0RhdGFNb2RlbFwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnREZWZpbml0aW9uIH0gZnJvbSBcIi4vY29tcG9uZW50RGVmaW5pdGlvblwiO1xyXG5pbXBvcnQgeyBTZXJpZXNQcm92aWRlciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL3Nlcmllc1Byb3ZpZGVyL3Nlcmllc1Byb3ZpZGVyXCI7XHJcbmltcG9ydCAqIGFzIFdpZGdldHMgZnJvbSBcIi4uLy4uL3dpZGdldHMvd2lkZ2V0c1wiO1xyXG5pbXBvcnQgKiBhcyBEYXRhTW9kZWxzIGZyb20gXCIuLi8uLi9tb2RlbHMvZGF0YU1vZGVsc1wiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRCYXNlIH0gZnJvbSBcIi4uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50QmFzZVwiO1xyXG5pbXBvcnQgeyBJbWFnZVByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uL3dpZGdldHMvY29tbW9uL2ltYWdlUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgQ29tbW9uTGF5b3V0UHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vd2lkZ2V0cy9jb21tb24vY29tbW9uTGF5b3V0UHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgU2VyaWVzSWNvblByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uL3dpZGdldHMvY29tbW9uL3Nlcmllc0ljb25Qcm92aWRlclwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRDb250ZXh0IH0gZnJvbSBcIi4uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50Q29udGV4dFwiO1xyXG5pbXBvcnQgeyBUZXh0UHJvdmlkZXIgfSBmcm9tIFwiLi4vdGV4dFByb3ZpZGVyL3RleHRQcm92aWRlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbXBvbmVudEZhY3RvcnkgaW1wbGVtZW50cyBJQ29tcG9uZW50RmFjdG9yeXtcclxuXHJcbiAgICBwcml2YXRlIF9jb21wb25lbnRJbnN0YW5jZXMgPSBuZXcgTWFwPHN0cmluZywgSUNvbXBvbmVudD4oKTtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IElDb21wb25lbnRGYWN0b3J5O1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogSUNvbXBvbmVudEZhY3Rvcnl7XHJcbiAgICAgICAgaWYodGhpcy5faW5zdGFuY2UgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UgPSBuZXcgQ29tcG9uZW50RmFjdG9yeSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNyZWF0ZShjb21wb25lbnREZWZpbml0aW9uOiBDb21wb25lbnREZWZpbml0aW9uLCBjb250ZXh0OiBDb21wb25lbnRDb250ZXh0fHVuZGVmaW5lZCA9IHVuZGVmaW5lZCk6IElDb21wb25lbnR8dW5kZWZpbmVke1xyXG4gICAgICAgIC8qIHRzbGludDpkaXNhYmxlOm1heC1mdW5jLWJvZHktbGVuZ3RoICovIC8vIGRpc2FibGVkIGR1ZSB0byBzd2l0Y2ggY2FzZVxyXG4gICAgICAgIGxldCBpbnN0YW5jZTogSUNvbXBvbmVudHx1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgbGV0IGRvSW5pdGlhbGl6YXRpb24gPSBmYWxzZTtcclxuICAgICAgICBzd2l0Y2goY29tcG9uZW50RGVmaW5pdGlvbi50eXBlKXtcclxuICAgICAgICAgICAgY2FzZSBcImVcIjpcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoY29tcG9uZW50RGVmaW5pdGlvbik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIHdpZGdldHNcclxuICAgICAgICAgICAgY2FzZSBcIk1hcHBDb2NrcGl0V2lkZ2V0XCI6XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IFdpZGdldHMuTWFwcENvY2twaXRXaWRnZXQuY3JlYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIldhdGNoYWJsZXNXaWRnZXRcIjpcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlID0gV2lkZ2V0cy5XYXRjaGFibGVzV2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJNZXRob2RzV2lkZ2V0XCI6XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IFdpZGdldHMuTWV0aG9kc1dpZGdldC5jcmVhdGUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiQ29uZmlnTWFuYWdlcldpZGdldFwiOlxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBXaWRnZXRzLkNvbmZpZ01hbmFnZXJXaWRnZXQuY3JlYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIlNpZ25hbE1hbmFnZXJXaWRnZXRcIjpcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlID0gV2lkZ2V0cy5TaWduYWxNYW5hZ2VyV2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJDaGFydE1hbmFnZXJXaWRnZXRcIjpcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlID0gV2lkZ2V0cy5DaGFydE1hbmFnZXJXaWRnZXQuY3JlYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIlRyYWNlVmlld1dpZGdldFwiOlxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBXaWRnZXRzLlRyYWNlVmlld1dpZGdldC5jcmVhdGUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiQ2hhcnRWaWV3V2lkZ2V0XCI6XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IFdpZGdldHMuQ2hhcnRWaWV3V2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJNZXNzYWdlc1dpZGdldFwiOlxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBXaWRnZXRzLk1lc3NhZ2VzV2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJTcGxpdHRlcldpZGdldFwiOlxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBXaWRnZXRzLlNwbGl0dGVyV2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJDb21wb25lbnRWaWV3V2lkZ2V0XCI6XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IFdpZGdldHMuQ29tcG9uZW50Vmlld1dpZGdldC5jcmVhdGUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiTWV0aG9kTGlzdFdpZGdldFwiOlxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBXaWRnZXRzLk1ldGhvZExpc3RXaWRnZXQuY3JlYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIk1ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXRcIjpcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlID0gV2lkZ2V0cy5NZXRob2RQYXJhbWV0ZXJMaXN0V2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJTaWRlQmFyV2lkZ2V0XCI6XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IFdpZGdldHMuU2lkZUJhcldpZGdldC5jcmVhdGUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiVGFiV2lkZ2V0XCI6XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IFdpZGdldHMuVGFiV2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJTdGFydFBhZ2VXaWRnZXRcIjpcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlID0gV2lkZ2V0cy5TdGFydFBhZ2VXaWRnZXQuY3JlYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIkNvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0XCI6XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IFdpZGdldHMuQ29tcG9uZW50T3ZlcnZpZXdXaWRnZXQuY3JlYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIlRyYWNlT3ZlcnZpZXdXaWRnZXRcIjpcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlID0gV2lkZ2V0cy5UcmFjZU92ZXJ2aWV3V2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJUcmFjZUNvbmZpZ3VyYXRpb25WaWV3V2lkZ2V0XCI6XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IFdpZGdldHMuVHJhY2VDb25maWd1cmF0aW9uVmlld1dpZGdldC5jcmVhdGUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiVHJhY2VDb250cm9sV2lkZ2V0XCI6XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IFdpZGdldHMuVHJhY2VDb250cm9sV2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJUcmFjZUNvbmZpZ3VyYXRpb25XaWRnZXRcIjpcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlID0gV2lkZ2V0cy5UcmFjZUNvbmZpZ3VyYXRpb25XaWRnZXQuY3JlYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIlRyYWNlQ29uZmlnVGltaW5nV2lkZ2V0XCI6XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IFdpZGdldHMuVHJhY2VDb25maWdUaW1pbmdXaWRnZXQuY3JlYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIlRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldFwiOlxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBXaWRnZXRzLlRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldC5jcmVhdGUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiVHJhY2VDb25maWdEYXRhcG9pbnRzV2lkZ2V0XCI6XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IFdpZGdldHMuVHJhY2VDb25maWdEYXRhcG9pbnRzV2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJNYWluTmF2aWdhdGlvbldpZGdldFwiOlxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBXaWRnZXRzLk1haW5OYXZpZ2F0aW9uV2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJMb2dpbldpZGdldFwiOlxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBXaWRnZXRzLkxvZ2luV2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJDdXJzb3JJbmZvV2lkZ2V0XCI6XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IFdpZGdldHMuQ3Vyc29ySW5mb1dpZGdldC5jcmVhdGUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiVG9vbHNPdmVydmlld1dpZGdldFwiOlxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBXaWRnZXRzLlRvb2xzT3ZlcnZpZXdXaWRnZXQuY3JlYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIkNoYXJ0Vmlld1Rvb2xiYXJcIjpcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlID0gV2lkZ2V0cy5DaGFydFZpZXdUb29sYmFyLmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJDaGFydEJhc2VcIjpcclxuICAgICAgICAgICAgICAgIC8vIEltcGxlbWVudCBjcmVhdGlvbiBvZiBjaGFydEJhc2Uod2lkZ2V0KSBpbiB0aGUgY29tcG9uZW50IGZhY3RvcnkodHlwZSBtdXN0IGJlIHNldCBieSBkZWZhdWx0U2V0dGluZ3NJZCA9PiBmZnQsIHh5LCB5dCwgLi4uKVxyXG4gICAgICAgICAgICAgICAgLy9pbnN0YW5jZSA9IFdpZGdldHMuQ2hhcnRCYXNlV2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJEdW1teVdpZGdldFwiOlxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBXaWRnZXRzLkR1bW15V2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgICAgICAvLyBDcmVhdGUgZGF0YW1vZGVsc1xyXG4gICAgICAgICAgICBjYXNlIFwiTWFwcENvY2twaXREYXRhTW9kZWxcIjogXHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IERhdGFNb2RlbHMuTWFwcENvY2twaXREYXRhTW9kZWwuY3JlYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBkb0luaXRpYWxpemF0aW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiVGFiV2lkZ2V0RGF0YU1vZGVsXCI6IFxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBEYXRhTW9kZWxzLlRhYldpZGdldERhdGFNb2RlbC5jcmVhdGUoKTtcclxuICAgICAgICAgICAgICAgIGRvSW5pdGlhbGl6YXRpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJDb25maWdNYW5hZ2VyRGF0YU1vZGVsXCI6XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IERhdGFNb2RlbHMuQ29uZmlnTWFuYWdlckRhdGFNb2RlbC5jcmVhdGUoKTtcclxuICAgICAgICAgICAgICAgIGRvSW5pdGlhbGl6YXRpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJTaWduYWxNYW5hZ2VyRGF0YU1vZGVsXCI6XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IERhdGFNb2RlbHMuU2lnbmFsTWFuYWdlckRhdGFNb2RlbC5jcmVhdGUoKTtcclxuICAgICAgICAgICAgICAgIGRvSW5pdGlhbGl6YXRpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJDaGFydE1hbmFnZXJEYXRhTW9kZWxcIjpcclxuICAgICAgICAgICAgICAgIC8vIFRPRE86IGNyZWF0ZSBhIG1lY2hhbmlzbSB3aGljaCB3b3JrcyBmb3IgYWxsIGluc3RhbmNlVHlwZXMgPT4gQ29tbXBvbmVudENvbm5lY3Rpb25MYXllclxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5fY29tcG9uZW50SW5zdGFuY2VzLmhhcyhjb21wb25lbnREZWZpbml0aW9uLmlkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGluc3RhbmNlID0gdGhpcy5fY29tcG9uZW50SW5zdGFuY2VzLmdldChjb21wb25lbnREZWZpbml0aW9uLmlkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBEYXRhTW9kZWxzLkNoYXJ0TWFuYWdlckRhdGFNb2RlbC5jcmVhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUNvbXBvbmVudEFuZEluaXRpYWxpemVJbnN0YW5jZShjb21wb25lbnREZWZpbml0aW9uLCBjb250ZXh0LCBpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHJldHVybiBpbnN0YW5jZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiQ3Vyc29yU2lnbmFsc0RhdGFNb2RlbFwiOlxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBuZXcgQ3Vyc29yU2lnbmFsc0RhdGFNb2RlbCgpO1xyXG4gICAgICAgICAgICAgICAgZG9Jbml0aWFsaXphdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBwcm92aWRlcnNcclxuICAgICAgICAgICAgY2FzZSBcIlNlcmllc1Byb3ZpZGVyXCI6XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLl9jb21wb25lbnRJbnN0YW5jZXMuaGFzKGNvbXBvbmVudERlZmluaXRpb24uaWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2UgPSB0aGlzLl9jb21wb25lbnRJbnN0YW5jZXMuZ2V0KGNvbXBvbmVudERlZmluaXRpb24uaWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IFNlcmllc1Byb3ZpZGVyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVDb21wb25lbnRBbmRJbml0aWFsaXplSW5zdGFuY2UoY29tcG9uZW50RGVmaW5pdGlvbiwgY29udGV4dCwgaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5zdGFuY2U7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIlNlcmllc0ljb25Qcm92aWRlclwiOlxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBTZXJpZXNJY29uUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICAgICAgICAgIGRvSW5pdGlhbGl6YXRpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJJbWFnZVByb3ZpZGVyXCI6XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IEltYWdlUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiQ29tbW9uTGF5b3V0UHJvdmlkZXJcIjpcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlID0gQ29tbW9uTGF5b3V0UHJvdmlkZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICAgICAgICAgIGRvSW5pdGlhbGl6YXRpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJUZXh0UHJvdmlkZXJcIjpcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuX2NvbXBvbmVudEluc3RhbmNlcy5oYXMoY29tcG9uZW50RGVmaW5pdGlvbi5pZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IHRoaXMuX2NvbXBvbmVudEluc3RhbmNlcy5nZXQoY29tcG9uZW50RGVmaW5pdGlvbi5pZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGluc3RhbmNlID0gbmV3IFRleHRQcm92aWRlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlQ29tcG9uZW50QW5kSW5pdGlhbGl6ZUluc3RhbmNlKGNvbXBvbmVudERlZmluaXRpb24sIGNvbnRleHQsIGluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBpbnN0YW5jZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlVua293biB0eXBlIHVzZWQgZm9yIGluc3RhbmNlIGZhY3Rvcnk6IFwiICsgY29tcG9uZW50RGVmaW5pdGlvbi50eXBlKVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihpbnN0YW5jZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUNvbXBvbmVudChpbnN0YW5jZSwgY29tcG9uZW50RGVmaW5pdGlvbiwgY29udGV4dCk7XHJcbiAgICAgICAgICAgIGlmKGRvSW5pdGlhbGl6YXRpb24gPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICAvLyBEb2VzIHRoZSBpbml0aWFsaXphdGlvbiBvZiB0aGUgaW5zdGFuY2UoZGF0YW1vZGVsLC4uLikgPT4gd2lkZ2V0cyB3aWxsIGJlIGluaXRpYWxpemVkIGxhdGVyIGF0IHRoZSBhZGQgb2YgYSB3aWRnZXQgdG8gYSBzcGxpdHRlciB3aWRnZXRcclxuICAgICAgICAgICAgICAgICg8YW55Pmluc3RhbmNlKS5pbml0aWFsaXplKCk7ICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaW5zdGFuY2U7XHJcbiAgICAgICAgLyogdHNsaW50OmVuYWJsZTptYXgtZnVuYy1ib2R5LWxlbmd0aCAqL1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3JlYXRlQ29tcG9uZW50QW5kSW5pdGlhbGl6ZUluc3RhbmNlKGNvbXBvbmVudERlZmluaXRpb246IENvbXBvbmVudERlZmluaXRpb24sIGNvbnRleHQ6IENvbXBvbmVudENvbnRleHR8dW5kZWZpbmVkID0gdW5kZWZpbmVkLCBpbnN0YW5jZTogYW55LCApe1xyXG4gICAgICAgIHRoaXMuX2NvbXBvbmVudEluc3RhbmNlcy5zZXQoY29tcG9uZW50RGVmaW5pdGlvbi5pZCwgaW5zdGFuY2UpO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlQ29tcG9uZW50KGluc3RhbmNlLCBjb21wb25lbnREZWZpbml0aW9uLCBjb250ZXh0KTtcclxuICAgICAgICAoPGFueT5pbnN0YW5jZSkuaW5pdGlhbGl6ZSgpOyAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpc3Bvc2VDb21wb25lbnQoaWQ6IHN0cmluZyl7XHJcbiAgICAgICAgaWYodGhpcy5fY29tcG9uZW50SW5zdGFuY2VzLmhhcyhpZCkpIHtcclxuICAgICAgICAgICAgbGV0IGluc3RhbmNlID0gdGhpcy5fY29tcG9uZW50SW5zdGFuY2VzLmdldChpZCk7XHJcbiAgICAgICAgICAgIGlmKGluc3RhbmNlICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZS5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jb21wb25lbnRJbnN0YW5jZXMuZGVsZXRlKGlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5pdGlhbGl6ZXMgdGhlIGNvbXBvbmVudCBvYmplY3QgZm9yIHRoZSBnaXZlbiBpbnN0YW5jZSh3aWRnZXQsIGRhdGFtb2RlbCwgcHJvdmlkZXIsIC4uLilcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtJQ29tcG9uZW50fSBpbnN0YW5jZVxyXG4gICAgICogQHBhcmFtIHtDb21wb25lbnREZWZpbml0aW9ufSBjb21wb25lbnREZWZpbml0aW9uXHJcbiAgICAgKiBAcGFyYW0geyp9IGNvbnRleHRcclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRGYWN0b3J5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlQ29tcG9uZW50KGluc3RhbmNlOiBJQ29tcG9uZW50LCBjb21wb25lbnREZWZpbml0aW9uOiBDb21wb25lbnREZWZpbml0aW9uLCBjb250ZXh0OiBDb21wb25lbnRDb250ZXh0fHVuZGVmaW5lZCl7XHJcbiAgICAgICAgaW5zdGFuY2UuY29tcG9uZW50ID0gbmV3IENvbXBvbmVudEJhc2UodGhpcywgaW5zdGFuY2UpO1xyXG4gICAgICAgIGluc3RhbmNlLmNvbXBvbmVudC5pbml0aWFsaXplKCk7XHJcbiAgICAgICAgaWYoY29udGV4dCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBpbnN0YW5jZS5jb21wb25lbnQuY29udGV4dCA9IGNvbnRleHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGluc3RhbmNlLmNvbXBvbmVudC5zZXREZWZpbml0aW9uKGNvbXBvbmVudERlZmluaXRpb24pO1xyXG4gICAgfVxyXG59Il19