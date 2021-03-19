define(["require", "exports", "../../widgets/widgets", "../../models/dataModels", "../../models/common/seriesProvider/seriesProvider"], function (require, exports, Widgets, DataModels, seriesProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ComponentFactory = /** @class */ (function () {
        function ComponentFactory() {
        }
        ComponentFactory.getInstance = function () {
            if (this._instance == undefined) {
                this._instance = new ComponentFactory();
            }
            return this._instance;
        };
        ComponentFactory.prototype.create = function (componentDefinition) {
            var instance = undefined;
            switch (componentDefinition.type) {
                case "e":
                    console.error(componentDefinition);
                    break;
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
                /*case "DummyWidget":
                    instance = Widgets.DummyWidget.create();
                    break;*/
                // Create datamodels
                case "SignalManagerDataModel":
                    instance = DataModels.SignalManagerDataModel.create();
                    break;
                case "ChartManagerDataModel":
                    // TODO: create a mechanism which works for all instanceTypes => CommponentConnectionLayer
                    if (ComponentFactory._chartManagerInstance == undefined) {
                        // Create instance
                        ComponentFactory._chartManagerInstance = DataModels.ChartManagerDataModel.create();
                        // Id needed for initialization to load correct persisting data
                        ComponentFactory._chartManagerInstance.component.setDefinition(componentDefinition);
                        // Initialize the datamodel
                        ComponentFactory._chartManagerInstance.initialize();
                    }
                    instance = ComponentFactory._chartManagerInstance;
                    break;
                case "SeriesProvider":
                    instance = seriesProvider_1.SeriesProvider.getInstance();
                    break;
                default:
                    console.error("Unkown type used for instance factory: " + componentDefinition.type);
                    break;
            }
            if (instance != undefined) {
                instance.component.setDefinition(componentDefinition);
            }
            return instance;
        };
        ComponentFactory._chartManagerInstance = undefined;
        return ComponentFactory;
    }());
    exports.ComponentFactory = ComponentFactory;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50RmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL2NvbXBvbmVudEZhY3RvcnkvY29tcG9uZW50RmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFRQTtRQUFBO1FBZ0pBLENBQUM7UUExSWlCLDRCQUFXLEdBQXpCO1lBQ0ksSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFJLFNBQVMsRUFBQztnQkFDM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLGdCQUFnQixFQUFFLENBQUM7YUFDM0M7WUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDMUIsQ0FBQztRQUVNLGlDQUFNLEdBQWIsVUFBYyxtQkFBd0M7WUFDbEQsSUFBSSxRQUFRLEdBQXlCLFNBQVMsQ0FBQztZQUMvQyxRQUFPLG1CQUFtQixDQUFDLElBQUksRUFBQztnQkFDNUIsS0FBSyxHQUFHO29CQUNKLE9BQU8sQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztvQkFDbkMsTUFBTTtnQkFDVixpQkFBaUI7Z0JBQ2pCLEtBQUssbUJBQW1CO29CQUNwQixRQUFRLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUM5QyxNQUFNO2dCQUNWLEtBQUssa0JBQWtCO29CQUNuQixRQUFRLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUM3QyxNQUFNO2dCQUNWLEtBQUssZUFBZTtvQkFDaEIsUUFBUSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQzFDLE1BQU07Z0JBQ1YsS0FBSyxxQkFBcUI7b0JBQ3RCLFFBQVEsR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQ2hELE1BQU07Z0JBQ1YsS0FBSyxxQkFBcUI7b0JBQ3RCLFFBQVEsR0FBRyxPQUFPLENBQUMsbUJB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QkFDbkYsTUFBTTthQUNiO1lBQ0QsSUFBRyxRQUFRLElBQUksU0FBUyxFQUFDO2dCQUNyQixRQUFRLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2FBQ3pEO1lBQ0QsT0FBTyxRQUFRLENBQUM7UUFDcEIsQ0FBQztRQTdJYyxzQ0FBcUIsR0FBeUIsU0FBUyxDQUFDO1FBOEkzRSx1QkFBQztLQUFBLEFBaEpELElBZ0pDO0lBaEpZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFdpZGdldHMgZnJvbSBcIi4uLy4uL3dpZGdldHMvd2lkZ2V0c1wiO1xyXG5pbXBvcnQgKiBhcyBEYXRhTW9kZWxzIGZyb20gXCIuLi8uLi9tb2RlbHMvZGF0YU1vZGVsc1wiO1xyXG5pbXBvcnQgeyBDb21wb25lbnREZWZpbml0aW9uIH0gZnJvbSBcIi4vY29tcG9uZW50RGVmaW5pdGlvblwiO1xyXG5pbXBvcnQgeyBTZXJpZXNQcm92aWRlciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL3Nlcmllc1Byb3ZpZGVyL3Nlcmllc1Byb3ZpZGVyXCI7XHJcbmltcG9ydCB7IElDb21wb25lbnRGYWN0b3J5IGFzIElDb21wb25lbnRGYWN0b3J5IH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9jb21wb25lbnRGYWN0b3J5SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElDb21wb25lbnQgfSBmcm9tIFwiLi4vY29tcG9uZW50QmFzZS9pbnRlcmZhY2VzL2NvbXBvbmVudEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJRGF0YU1vZGVsIH0gZnJvbSBcIi4uLy4uL21vZGVscy9kYXRhTW9kZWxJbnRlcmZhY2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDb21wb25lbnRGYWN0b3J5IGltcGxlbWVudHMgSUNvbXBvbmVudEZhY3Rvcnl7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2NoYXJ0TWFuYWdlckluc3RhbmNlOiBJRGF0YU1vZGVsfHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IElDb21wb25lbnRGYWN0b3J5O1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogSUNvbXBvbmVudEZhY3Rvcnl7XHJcbiAgICAgICAgaWYodGhpcy5faW5zdGFuY2UgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UgPSBuZXcgQ29tcG9uZW50RmFjdG9yeSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNyZWF0ZShjb21wb25lbnREZWZpbml0aW9uOiBDb21wb25lbnREZWZpbml0aW9uKTogSUNvbXBvbmVudHx1bmRlZmluZWR7XHJcbiAgICAgICAgbGV0IGluc3RhbmNlOiBJQ29tcG9uZW50fHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuICAgICAgICBzd2l0Y2goY29tcG9uZW50RGVmaW5pdGlvbi50eXBlKXtcclxuICAgICAgICAgICAgY2FzZSBcImVcIjpcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoY29tcG9uZW50RGVmaW5pdGlvbik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgLy8gQ3JlYXRlIHdpZGdldHNcclxuICAgICAgICAgICAgY2FzZSBcIk1hcHBDb2NrcGl0V2lkZ2V0XCI6XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IFdpZGdldHMuTWFwcENvY2twaXRXaWRnZXQuY3JlYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIldhdGNoYWJsZXNXaWRnZXRcIjpcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlID0gV2lkZ2V0cy5XYXRjaGFibGVzV2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJNZXRob2RzV2lkZ2V0XCI6XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IFdpZGdldHMuTWV0aG9kc1dpZGdldC5jcmVhdGUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiQ29uZmlnTWFuYWdlcldpZGdldFwiOlxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBXaWRnZXRzLkNvbmZpZ01hbmFnZXJXaWRnZXQuY3JlYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIlNpZ25hbE1hbmFnZXJXaWRnZXRcIjpcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlID0gV2lkZ2V0cy5TaWduYWxNYW5hZ2VyV2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJDaGFydE1hbmFnZXJXaWRnZXRcIjpcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlID0gV2lkZ2V0cy5DaGFydE1hbmFnZXJXaWRnZXQuY3JlYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIlRyYWNlVmlld1dpZGdldFwiOlxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBXaWRnZXRzLlRyYWNlVmlld1dpZGdldC5jcmVhdGUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiQ2hhcnRWaWV3V2lkZ2V0XCI6XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IFdpZGdldHMuQ2hhcnRWaWV3V2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJNZXNzYWdlc1dpZGdldFwiOlxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBXaWRnZXRzLk1lc3NhZ2VzV2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJTcGxpdHRlcldpZGdldFwiOlxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBXaWRnZXRzLlNwbGl0dGVyV2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJDb21wb25lbnRWaWV3V2lkZ2V0XCI6XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IFdpZGdldHMuQ29tcG9uZW50Vmlld1dpZGdldC5jcmVhdGUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiTWV0aG9kTGlzdFdpZGdldFwiOlxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBXaWRnZXRzLk1ldGhvZExpc3RXaWRnZXQuY3JlYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIk1ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXRcIjpcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlID0gV2lkZ2V0cy5NZXRob2RQYXJhbWV0ZXJMaXN0V2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJTaWRlQmFyV2lkZ2V0XCI6XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IFdpZGdldHMuU2lkZUJhcldpZGdldC5jcmVhdGUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiVGFiV2lkZ2V0XCI6XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IFdpZGdldHMuVGFiV2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJTdGFydFBhZ2VXaWRnZXRcIjpcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlID0gV2lkZ2V0cy5TdGFydFBhZ2VXaWRnZXQuY3JlYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIkNvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0XCI6XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IFdpZGdldHMuQ29tcG9uZW50T3ZlcnZpZXdXaWRnZXQuY3JlYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIlRyYWNlT3ZlcnZpZXdXaWRnZXRcIjpcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlID0gV2lkZ2V0cy5UcmFjZU92ZXJ2aWV3V2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJUcmFjZUNvbmZpZ3VyYXRpb25WaWV3V2lkZ2V0XCI6XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IFdpZGdldHMuVHJhY2VDb25maWd1cmF0aW9uVmlld1dpZGdldC5jcmVhdGUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiVHJhY2VDb250cm9sV2lkZ2V0XCI6XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IFdpZGdldHMuVHJhY2VDb250cm9sV2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJUcmFjZUNvbmZpZ3VyYXRpb25XaWRnZXRcIjpcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlID0gV2lkZ2V0cy5UcmFjZUNvbmZpZ3VyYXRpb25XaWRnZXQuY3JlYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIlRyYWNlQ29uZmlnVGltaW5nV2lkZ2V0XCI6XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IFdpZGdldHMuVHJhY2VDb25maWdUaW1pbmdXaWRnZXQuY3JlYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIlRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldFwiOlxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBXaWRnZXRzLlRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldC5jcmVhdGUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiVHJhY2VDb25maWdEYXRhcG9pbnRzV2lkZ2V0XCI6XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IFdpZGdldHMuVHJhY2VDb25maWdEYXRhcG9pbnRzV2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJNYWluTmF2aWdhdGlvbldpZGdldFwiOlxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBXaWRnZXRzLk1haW5OYXZpZ2F0aW9uV2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJMb2dpbldpZGdldFwiOlxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBXaWRnZXRzLkxvZ2luV2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJDdXJzb3JJbmZvV2lkZ2V0XCI6XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IFdpZGdldHMuQ3Vyc29ySW5mb1dpZGdldC5jcmVhdGUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiVG9vbHNPdmVydmlld1dpZGdldFwiOlxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBXaWRnZXRzLlRvb2xzT3ZlcnZpZXdXaWRnZXQuY3JlYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIkNoYXJ0Vmlld1Rvb2xiYXJcIjpcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlID0gV2lkZ2V0cy5DaGFydFZpZXdUb29sYmFyLmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJDaGFydEJhc2VcIjpcclxuICAgICAgICAgICAgICAgIC8vIEltcGxlbWVudCBjcmVhdGlvbiBvZiBjaGFydEJhc2Uod2lkZ2V0KSBpbiB0aGUgY29tcG9uZW50IGZhY3RvcnkodHlwZSBtdXN0IGJlIHNldCBieSBkZWZhdWx0U2V0dGluZ3NJZCA9PiBmZnQsIHh5LCB5dCwgLi4uKVxyXG4gICAgICAgICAgICAgICAgLy9pbnN0YW5jZSA9IFdpZGdldHMuQ2hhcnRCYXNlV2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvKmNhc2UgXCJEdW1teVdpZGdldFwiOlxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBXaWRnZXRzLkR1bW15V2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7Ki9cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGRhdGFtb2RlbHNcclxuICAgICAgICAgICAgY2FzZSBcIlNpZ25hbE1hbmFnZXJEYXRhTW9kZWxcIjpcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlID0gRGF0YU1vZGVscy5TaWduYWxNYW5hZ2VyRGF0YU1vZGVsLmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJDaGFydE1hbmFnZXJEYXRhTW9kZWxcIjpcclxuICAgICAgICAgICAgICAgIC8vIFRPRE86IGNyZWF0ZSBhIG1lY2hhbmlzbSB3aGljaCB3b3JrcyBmb3IgYWxsIGluc3RhbmNlVHlwZXMgPT4gQ29tbXBvbmVudENvbm5lY3Rpb25MYXllclxyXG4gICAgICAgICAgICAgICAgaWYoQ29tcG9uZW50RmFjdG9yeS5fY2hhcnRNYW5hZ2VySW5zdGFuY2UgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ3JlYXRlIGluc3RhbmNlXHJcbiAgICAgICAgICAgICAgICAgICAgQ29tcG9uZW50RmFjdG9yeS5fY2hhcnRNYW5hZ2VySW5zdGFuY2UgPSBEYXRhTW9kZWxzLkNoYXJ0TWFuYWdlckRhdGFNb2RlbC5jcmVhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBJZCBuZWVkZWQgZm9yIGluaXRpYWxpemF0aW9uIHRvIGxvYWQgY29ycmVjdCBwZXJzaXN0aW5nIGRhdGFcclxuICAgICAgICAgICAgICAgICAgICBDb21wb25lbnRGYWN0b3J5Ll9jaGFydE1hbmFnZXJJbnN0YW5jZS5jb21wb25lbnQuc2V0RGVmaW5pdGlvbihjb21wb25lbnREZWZpbml0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvLyBJbml0aWFsaXplIHRoZSBkYXRhbW9kZWxcclxuICAgICAgICAgICAgICAgICAgICBDb21wb25lbnRGYWN0b3J5Ll9jaGFydE1hbmFnZXJJbnN0YW5jZS5pbml0aWFsaXplKCk7ICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IENvbXBvbmVudEZhY3RvcnkuX2NoYXJ0TWFuYWdlckluc3RhbmNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJTZXJpZXNQcm92aWRlclwiOlxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBTZXJpZXNQcm92aWRlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVW5rb3duIHR5cGUgdXNlZCBmb3IgaW5zdGFuY2UgZmFjdG9yeTogXCIgKyBjb21wb25lbnREZWZpbml0aW9uLnR5cGUpXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaW5zdGFuY2UgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgaW5zdGFuY2UuY29tcG9uZW50LnNldERlZmluaXRpb24oY29tcG9uZW50RGVmaW5pdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpbnN0YW5jZTtcclxuICAgIH1cclxufSJdfQ==