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
define(["require", "exports", "../../framework/events", "./chartViewWidget", "../splitterWidget/splitterDefinition", "../../common/persistence/persistDataProvider", "../common/splitterComponentSettings"], function (require, exports, events_1, chartViewWidget_1, splitterDefinition_1, persistDataProvider_1, splitterComponentSettings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventChartViewContentSizeChanged = /** @class */ (function (_super) {
        __extends(EventChartViewContentSizeChanged, _super);
        function EventChartViewContentSizeChanged() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventChartViewContentSizeChanged;
    }(events_1.TypedEvent));
    ;
    var ChartViewLayoutManager = /** @class */ (function () {
        function ChartViewLayoutManager(chartViewWidget, component) {
            var _this = this;
            this.eventContentSizeChanged = new EventChartViewContentSizeChanged();
            this.chartSplitterParentContainerId = "ChartViewChartSplitterContainer"; // Container needed for scrollbar behavior (switch on/off)
            this.chartSplitterContainerId = "ChartViewChartSplitter";
            this.chartViewToolbarContainerId = "ChartViewToolbar";
            this._chartViewWidgetToolbarButtonClickedHandler = function (sender, args) { return _this.chartViewWidget.onEventToolbarButtonClicked(sender, args); };
            this.chartViewWidget = chartViewWidget;
            this._component = component;
        }
        /**
         * initialize layout or chartViewWidget
         *
         * @param {string} containerID
         * @memberof ChartViewLayoutManager
         */
        ChartViewLayoutManager.prototype.initializeChartViewLayout = function () {
            var context = undefined;
            if (this._component != undefined) {
                context = this._component.context;
            }
            this.chartViewtoolbar = this._component.addSubComponent("ChartViewToolbar", "ChartViewToolbar", "", context);
            this.addChartViewToolbarToView(this.chartViewtoolbar, this.chartViewWidget.view);
            this.chartViewtoolbar.initialize(this.chartViewToolbarContainerId);
            this.chartViewtoolbar.eventToolbarButtonClicked.attach(this._chartViewWidgetToolbarButtonClickedHandler);
            this.initializeChartSplitter(this.chartSplitterContainerId);
        };
        /**
         * Dispose the chart view layout manager
         *
         * @memberof ChartViewLayoutManager
         */
        ChartViewLayoutManager.prototype.dispose = function () {
            if (this.chartViewtoolbar != undefined) {
                this.chartViewtoolbar.eventToolbarButtonClicked.detach(this._chartViewWidgetToolbarButtonClickedHandler);
                this.chartViewtoolbar.dispose();
            }
            if (this.chartSplitter != undefined) {
                this.chartSplitter.dispose();
            }
        };
        /**
         * adds the toolbar to the view explicitly.
         *
         * @param {IView} view
         * @memberof ChartViewLayoutManager
         */
        ChartViewLayoutManager.prototype.addChartViewToolbarToView = function (chartViewToolbar, view) {
            if (view) {
                view.addWidget(chartViewToolbar);
            }
        };
        /**
         * add needed containers for chartView
         *
         * @param {*} containerID
         * @memberof ChartViewLayoutManager
         */
        ChartViewLayoutManager.prototype.addChartViewContainers = function (containerID) {
            this.addChartViewHeader(containerID);
            this.addChartViewToolbarContainer(containerID);
            this.addChartSplitterContainer(containerID);
        };
        /**
         * resize layout
         *
         * @param {number} width
         * @param {number} height
         * @memberof ChartViewLayoutManager
         */
        ChartViewLayoutManager.prototype.resize = function (width, height) {
            this.chartSplitter.resize(width, height);
        };
        ChartViewLayoutManager.prototype.addChartsTypeLayout = function (containerId) {
            $('#' + containerId).prepend('<div id="chartTypeLayout" style= "width:100%; height:100%; background-image: url(../../mappCockpit/app/widgets/chartViewWidget/style/images/johnB.jpg)"></div>');
        };
        /**
         *initialize chartSplitter
         *
         * @private
         * @param {string} containerID
         * @memberof ChartViewLayoutManager
         */
        ChartViewLayoutManager.prototype.initializeChartSplitter = function (containerID) {
            var defaultChartSplitterDefinitionId = "ChartSplitterDefinitionId";
            persistDataProvider_1.PersistDataProvider.getInstance().setDefaultDataWithId(defaultChartSplitterDefinitionId, ChartViewLayoutManager.getDefaultChartSplitterDefinition());
            this.chartSplitter = this._component.addSubComponent("SplitterWidget", containerID, defaultChartSplitterDefinitionId);
            this.chartSplitter.setDefaultComponentSettingsDataId(defaultChartSplitterDefinitionId);
            this.chartSplitter.initialize(containerID);
        };
        ChartViewLayoutManager.getDefaultChartSplitterDefinition = function () {
            var splitterComponentSettings = new splitterComponentSettings_1.SplitterComponentSettings(splitterDefinition_1.SplitterDefinition.orientationVertical, false);
            return splitterComponentSettings;
        };
        /**
         * Adds Chart Splitter Container
         *
         * @param {*} chartViewContainerId
         * @returns {string}
         * @memberof ChartViewLayoutManager
         */
        ChartViewLayoutManager.prototype.addChartSplitterContainer = function (chartViewContainerId) {
            var rect = $(chartViewContainerId)[0].getBoundingClientRect();
            var splitterHeight = $(window).height() - rect.top;
            var style = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML = '.splitterStyle { height: ' + splitterHeight + 'px }';
            document.getElementsByTagName('head')[0].appendChild(style);
            $(chartViewContainerId).append("<div style='overflow: hidden auto; flex: 1' class='content' id='" + this.chartSplitterParentContainerId + "'> </div>");
            $("#" + this.chartSplitterParentContainerId).append("<div style='overflow: hidden auto' class='content' id='" + this.chartSplitterContainerId + "'> </div>");
            return this.chartSplitterContainerId;
        };
        ChartViewLayoutManager.prototype.addChartViewHeader = function (chartViewContainerId) {
            // TODO: get header style from central place
            var headerHeight = 30;
            $(chartViewContainerId).append("<div class='widgetHeader' id='" + chartViewContainerId + "_header' style='height: " + headerHeight + "px'>Analysis</div>");
        };
        ChartViewLayoutManager.prototype.addChartViewToolbarContainer = function (chartViewContainerId) {
            $(chartViewContainerId).append("<div style='overflow: hidden;' class='content' id='" + this.chartViewToolbarContainerId + "'> " + "</div>");
            return this.chartViewToolbarContainerId;
        };
        /**
         * updateCharts by rereading series in all charts
         *      *
         * @param {Array<ITraceChart>} traceChartList
         * @memberof ChartViewLayoutManager
         */
        ChartViewLayoutManager.prototype.updateCharts = function (traceChartList) {
            for (var i = 0; i < traceChartList.length; i++) {
                traceChartList[i].setAvailableSeriesAsDataSource();
            }
        };
        /**
         * returns ZoomAxes for a given string, undefined if string does not equal any axis
         *
         * @param {string} zoomAxesString
         * @returns {(ZoomAxes|undefined)}
         * @memberof ChartViewLayoutManager
         */
        ChartViewLayoutManager.prototype.getZoomAxesFromString = function (zoomAxesString) {
            switch (zoomAxesString) {
                case "X":
                    return chartViewWidget_1.ZoomDirection.X;
                case "Y":
                    return chartViewWidget_1.ZoomDirection.Y;
                case "XY":
                    return chartViewWidget_1.ZoomDirection.XY;
                default:
                    return undefined;
            }
        };
        /**
         * Get height of pane from chartSplitter persisted pane
         *
         * @param {string} chartName
         * @returns {number}
         * @memberof SplitterWidget
         */
        ChartViewLayoutManager.prototype.getChartViewSplitterHeight = function (paneDefinitions, chartName) {
            for (var i = 0; i < paneDefinitions.length; i++) {
                if (paneDefinitions[i].paneData != undefined) {
                    if (paneDefinitions[i].paneData.data != undefined && paneDefinitions[i].componentDefinition.id == chartName) {
                        return paneDefinitions[i].paneData.data.size;
                    }
                }
            }
            //Return default size if there is no data available
            return 300;
        };
        return ChartViewLayoutManager;
    }());
    exports.ChartViewLayoutManager = ChartViewLayoutManager;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRWaWV3TGF5b3V0TWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jaGFydFZpZXdXaWRnZXQvY2hhcnRWaWV3TGF5b3V0TWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBaUJBO1FBQWdELG9EQUFzQjtRQUF0RTs7UUFBd0UsQ0FBQztRQUFELHVDQUFDO0lBQUQsQ0FBQyxBQUF6RSxDQUFnRCxtQkFBVSxHQUFlO0lBQUEsQ0FBQztJQUMxRTtRQWdCSSxnQ0FBWSxlQUFnQyxFQUFFLFNBQXdCO1lBQXRFLGlCQUdDO1lBYkQsNEJBQXVCLEdBQUcsSUFBSSxnQ0FBZ0MsRUFBRSxDQUFDO1lBRXhELG1DQUE4QixHQUFXLGlDQUFpQyxDQUFDLENBQUMsMERBQTBEO1lBQ3RJLDZCQUF3QixHQUFXLHdCQUF3QixDQUFDO1lBQzVELGdDQUEyQixHQUFXLGtCQUFrQixDQUFDO1lBSTFELGdEQUEyQyxHQUFHLFVBQUMsTUFBTSxFQUFDLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxlQUFlLENBQUMsMkJBQTJCLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxFQUE3RCxDQUE2RCxDQUFDO1lBR2pJLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQ2hDLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNILDBEQUF5QixHQUF6QjtZQUNJLElBQUksT0FBTyxHQUErQixTQUFTLENBQUM7WUFDcEQsSUFBRyxJQUFJLENBQUMsVUFBVSxJQUFJLFNBQVMsRUFBQztnQkFDNUIsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO2FBQ3JDO1lBQ0QsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxVQUFXLENBQUMsZUFBZSxDQUFDLGtCQUFrQixFQUFFLGtCQUFr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QW1EO1lBQ25ELE9BQU8sR0FBRyxDQUFDO1FBQ2YsQ0FBQztRQUNMLDZCQUFDO0lBQUQsQ0FBQyxBQXRNRCxJQXNNQztJQUNRLHdEQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFR5cGVkRXZlbnQgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2V2ZW50c1wiO1xyXG5pbXBvcnQgeyBJVHJhY2VDaGFydCB9IGZyb20gXCIuLi9jaGFydFdpZGdldC9pbnRlcmZhY2VzL3RyYWNlQ2hhcnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgWm9vbURpcmVjdGlvbn0gZnJvbSBcIi4vY2hhcnRWaWV3V2lkZ2V0XCI7XHJcbmltcG9ydCB7IENoYXJ0Vmlld1dpZGdldCB9IGZyb20gXCIuL2NoYXJ0Vmlld1dpZGdldFwiO1xyXG5pbXBvcnQgeyBJU3BsaXR0ZXJXaWRnZXQgfSBmcm9tIFwiLi4vc3BsaXR0ZXJXaWRnZXQvaW50ZXJmYWNlcy9zcGxpdHRlcldpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgKiBhcyBXaWRnZXRzIGZyb20gXCIuLi8uLi93aWRnZXRzL3dpZGdldHNcIjtcclxuaW1wb3J0IHsgSUNoYXJ0Vmlld1Rvb2xiYXIgfSBmcm9tIFwiLi90b29sYmFyL2ludGVyZmFjZXMvY2hhcnRWaWV3VG9vbGJhckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJVmlldyB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy92aWV3SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNwbGl0dGVyRGVmaW5pdGlvbiB9IGZyb20gXCIuLi9zcGxpdHRlcldpZGdldC9zcGxpdHRlckRlZmluaXRpb25cIjtcclxuaW1wb3J0IHsgUGVyc2lzdERhdGFQcm92aWRlciB9IGZyb20gXCIuLi8uLi9jb21tb24vcGVyc2lzdGVuY2UvcGVyc2lzdERhdGFQcm92aWRlclwiO1xyXG5cclxuaW1wb3J0IHsgU3BsaXR0ZXJDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuLi9jb21tb24vc3BsaXR0ZXJDb21wb25lbnRTZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRCYXNlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudEJhc2VcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50Q29udGV4dCB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnRDb250ZXh0XCI7XHJcbmltcG9ydCB7IFNwbGl0dGVyUGFuZURlZmluaXRpb24gfSBmcm9tIFwiLi4vc3BsaXR0ZXJXaWRnZXQvc3BsaXR0ZXJQYW5lRGVmaW5pdGlvblwiO1xyXG5cclxuY2xhc3MgRXZlbnRDaGFydFZpZXdDb250ZW50U2l6ZUNoYW5nZWQgIGV4dGVuZHMgVHlwZWRFdmVudDxudWxsLCBudWxsPnsgfTtcclxuY2xhc3MgQ2hhcnRWaWV3TGF5b3V0TWFuYWdlciB7XHJcblxyXG4gICAgY2hhcnRWaWV3V2lkZ2V0IDogQ2hhcnRWaWV3V2lkZ2V0O1xyXG4gICAgY2hhcnRTcGxpdHRlciEgOiBJU3BsaXR0ZXJXaWRnZXQ7XHJcbiAgICBjaGFydFZpZXd0b29sYmFyISA6IElDaGFydFZpZXdUb29sYmFyOyBcclxuXHJcbiAgICBldmVudENvbnRlbnRTaXplQ2hhbmdlZCA9IG5ldyBFdmVudENoYXJ0Vmlld0NvbnRlbnRTaXplQ2hhbmdlZCgpO1xyXG5cclxuICAgIHJlYWRvbmx5IGNoYXJ0U3BsaXR0ZXJQYXJlbnRDb250YWluZXJJZDogc3RyaW5nID0gXCJDaGFydFZpZXdDaGFydFNwbGl0dGVyQ29udGFpbmVyXCI7IC8vIENvbnRhaW5lciBuZWVkZWQgZm9yIHNjcm9sbGJhciBiZWhhdmlvciAoc3dpdGNoIG9uL29mZilcclxuICAgIHJlYWRvbmx5IGNoYXJ0U3BsaXR0ZXJDb250YWluZXJJZDogc3RyaW5nID0gXCJDaGFydFZpZXdDaGFydFNwbGl0dGVyXCI7XHJcbiAgICByZWFkb25seSBjaGFydFZpZXdUb29sYmFyQ29udGFpbmVySWQ6IHN0cmluZyA9IFwiQ2hhcnRWaWV3VG9vbGJhclwiO1xyXG5cclxuICAgIHByaXZhdGUgX2NvbXBvbmVudDogQ29tcG9uZW50QmFzZXx1bmRlZmluZWQ7XHJcblxyXG4gICAgcHJpdmF0ZSBfY2hhcnRWaWV3V2lkZ2V0VG9vbGJhckJ1dHRvbkNsaWNrZWRIYW5kbGVyID0gKHNlbmRlcixhcmdzKSA9PiB0aGlzLmNoYXJ0Vmlld1dpZGdldC5vbkV2ZW50VG9vbGJhckJ1dHRvbkNsaWNrZWQoc2VuZGVyLGFyZ3MpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNoYXJ0Vmlld1dpZGdldDogQ2hhcnRWaWV3V2lkZ2V0LCBjb21wb25lbnQ6IENvbXBvbmVudEJhc2Upe1xyXG4gICAgICAgIHRoaXMuY2hhcnRWaWV3V2lkZ2V0ID0gY2hhcnRWaWV3V2lkZ2V0O1xyXG4gICAgICAgIHRoaXMuX2NvbXBvbmVudCA9IGNvbXBvbmVudDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGluaXRpYWxpemUgbGF5b3V0IG9yIGNoYXJ0Vmlld1dpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb250YWluZXJJRFxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld0xheW91dE1hbmFnZXJcclxuICAgICAqL1xyXG4gICAgaW5pdGlhbGl6ZUNoYXJ0Vmlld0xheW91dCgpe1xyXG4gICAgICAgIGxldCBjb250ZXh0OiBDb21wb25lbnRDb250ZXh0fHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuICAgICAgICBpZih0aGlzLl9jb21wb25lbnQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgY29udGV4dCA9IHRoaXMuX2NvbXBvbmVudC5jb250ZXh0O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNoYXJ0Vmlld3Rvb2xiYXIgPSB0aGlzLl9jb21wb25lbnQhLmFkZFN1YkNvbXBvbmVudChcIkNoYXJ0Vmlld1Rvb2xiYXJcIiwgXCJDaGFydFZpZXdUb29sYmFyXCIsIFwiXCIsIGNvbnRleHQpIGFzIFdpZGdldHMuSUNoYXJ0Vmlld1Rvb2xiYXI7XHJcbiAgICAgICAgdGhpcy5hZGRDaGFydFZpZXdUb29sYmFyVG9WaWV3KCB0aGlzLmNoYXJ0Vmlld3Rvb2xiYXIsdGhpcy5jaGFydFZpZXdXaWRnZXQudmlldyk7XHJcbiAgICAgICAgdGhpcy5jaGFydFZpZXd0b29sYmFyLmluaXRpYWxpemUodGhpcy5jaGFydFZpZXdUb29sYmFyQ29udGFpbmVySWQpO1xyXG4gICAgICAgIHRoaXMuY2hhcnRWaWV3dG9vbGJhci5ldmVudFRvb2xiYXJCdXR0b25DbGlja2VkLmF0dGFjaCh0aGlzLl9jaGFydFZpZXdXaWRnZXRUb29sYmFyQnV0dG9uQ2xpY2tlZEhhbmRsZXIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZUNoYXJ0U3BsaXR0ZXIodGhpcy5jaGFydFNwbGl0dGVyQ29udGFpbmVySWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzcG9zZSB0aGUgY2hhcnQgdmlldyBsYXlvdXQgbWFuYWdlciBcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3TGF5b3V0TWFuYWdlclxyXG4gICAgICovXHJcbiAgICBkaXNwb3NlKCl7XHJcbiAgICAgICAgaWYodGhpcy5jaGFydFZpZXd0b29sYmFyICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcnRWaWV3dG9vbGJhci5ldmVudFRvb2xiYXJCdXR0b25DbGlja2VkLmRldGFjaCh0aGlzLl9jaGFydFZpZXdXaWRnZXRUb29sYmFyQnV0dG9uQ2xpY2tlZEhhbmRsZXIpO1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJ0Vmlld3Rvb2xiYXIuZGlzcG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmNoYXJ0U3BsaXR0ZXIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5jaGFydFNwbGl0dGVyLmRpc3Bvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBhZGRzIHRoZSB0b29sYmFyIHRvIHRoZSB2aWV3IGV4cGxpY2l0bHkuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJVmlld30gdmlld1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld0xheW91dE1hbmFnZXJcclxuICAgICAqL1xyXG4gICAgYWRkQ2hhcnRWaWV3VG9vbGJhclRvVmlldyhjaGFydFZpZXdUb29sYmFyOiBJQ2hhcnRWaWV3VG9vbGJhciwgdmlldzogSVZpZXd8dW5kZWZpbmVkKSB7XHJcbiAgICAgICAgaWYgKHZpZXcpIHtcclxuICAgICAgICAgICB2aWV3LmFkZFdpZGdldChjaGFydFZpZXdUb29sYmFyKTsgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYWRkIG5lZWRlZCBjb250YWluZXJzIGZvciBjaGFydFZpZXdcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IGNvbnRhaW5lcklEXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3TGF5b3V0TWFuYWdlclxyXG4gICAgICovXHJcbiAgICBhZGRDaGFydFZpZXdDb250YWluZXJzKGNvbnRhaW5lcklEKXtcclxuICAgICAgICB0aGlzLmFkZENoYXJ0Vmlld0hlYWRlcihjb250YWluZXJJRCk7XHJcbiAgICAgICAgdGhpcy5hZGRDaGFydFZpZXdUb29sYmFyQ29udGFpbmVyKGNvbnRhaW5lcklEKTtcclxuICAgICAgICB0aGlzLmFkZENoYXJ0U3BsaXR0ZXJDb250YWluZXIoY29udGFpbmVySUQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmVzaXplIGxheW91dFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodFxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld0xheW91dE1hbmFnZXJcclxuICAgICAqL1xyXG4gICAgcmVzaXplKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKXsgICBcclxuICAgICAgICB0aGlzLmNoYXJ0U3BsaXR0ZXIucmVzaXplKHdpZHRoLGhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkQ2hhcnRzVHlwZUxheW91dChjb250YWluZXJJZDogc3RyaW5nKXtcclxuICAgICAgICAkKCcjJyArIGNvbnRhaW5lcklkKS5wcmVwZW5kKCc8ZGl2IGlkPVwiY2hhcnRUeXBlTGF5b3V0XCIgc3R5bGU9IFwid2lkdGg6MTAwJTsgaGVpZ2h0OjEwMCU7IGJhY2tncm91bmQtaW1hZ2U6IHVybCguLi8uLi9tYXBwQ29ja3BpdC9hcHAvd2lkZ2V0cy9jaGFydFZpZXdXaWRnZXQvc3R5bGUvaW1hZ2VzL2pvaG5CLmpwZylcIj48L2Rpdj4nKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICppbml0aWFsaXplIGNoYXJ0U3BsaXR0ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbnRhaW5lcklEXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3TGF5b3V0TWFuYWdlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGluaXRpYWxpemVDaGFydFNwbGl0dGVyKGNvbnRhaW5lcklEOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgZGVmYXVsdENoYXJ0U3BsaXR0ZXJEZWZpbml0aW9uSWQgPSBcIkNoYXJ0U3BsaXR0ZXJEZWZpbml0aW9uSWRcIjtcclxuICAgICAgICBQZXJzaXN0RGF0YVByb3ZpZGVyLmdldEluc3RhbmNlKCkuc2V0RGVmYXVsdERhdGFXaXRoSWQoZGVmYXVsdENoYXJ0U3BsaXR0ZXJEZWZpbml0aW9uSWQsIENoYXJ0Vmlld0xheW91dE1hbmFnZXIuZ2V0RGVmYXVsdENoYXJ0U3BsaXR0ZXJEZWZpbml0aW9uKCkpO1xyXG5cclxuICAgICAgICB0aGlzLmNoYXJ0U3BsaXR0ZXIgPSB0aGlzLl9jb21wb25lbnQhLmFkZFN1YkNvbXBvbmVudChcIlNwbGl0dGVyV2lkZ2V0XCIsIGNvbnRhaW5lcklELCBkZWZhdWx0Q2hhcnRTcGxpdHRlckRlZmluaXRpb25JZCkgYXMgSVNwbGl0dGVyV2lkZ2V0OyBcclxuICAgICAgICB0aGlzLmNoYXJ0U3BsaXR0ZXIuc2V0RGVmYXVsdENvbXBvbmVudFNldHRpbmdzRGF0YUlkKGRlZmF1bHRDaGFydFNwbGl0dGVyRGVmaW5pdGlvbklkKTtcclxuICAgICAgICB0aGlzLmNoYXJ0U3BsaXR0ZXIuaW5pdGlhbGl6ZShjb250YWluZXJJRCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0RGVmYXVsdENoYXJ0U3BsaXR0ZXJEZWZpbml0aW9uKCkgOiBDb21wb25lbnRTZXR0aW5ncyB7XHJcbiAgICAgICAgbGV0IHNwbGl0dGVyQ29tcG9uZW50U2V0dGluZ3MgPSBuZXcgU3BsaXR0ZXJDb21wb25lbnRTZXR0aW5ncyhTcGxpdHRlckRlZmluaXRpb24ub3JpZW50YXRpb25WZXJ0aWNhbCwgZmFsc2UpO1xyXG4gICAgICAgIHJldHVybiBzcGxpdHRlckNvbXBvbmVudFNldHRpbmdzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBDaGFydCBTcGxpdHRlciBDb250YWluZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IGNoYXJ0Vmlld0NvbnRhaW5lcklkXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld0xheW91dE1hbmFnZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRDaGFydFNwbGl0dGVyQ29udGFpbmVyKGNoYXJ0Vmlld0NvbnRhaW5lcklkKTogc3RyaW5nIHtcclxuICAgICAgICB2YXIgcmVjdCA9ICQoY2hhcnRWaWV3Q29udGFpbmVySWQpWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIHZhciBzcGxpdHRlckhlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKSEgLSByZWN0LnRvcDtcclxuXHJcbiAgICAgICAgdmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcclxuICAgICAgICBzdHlsZS50eXBlID0gJ3RleHQvY3NzJztcclxuICAgICAgICBzdHlsZS5pbm5lckhUTUwgPSAnLnNwbGl0dGVyU3R5bGUgeyBoZWlnaHQ6ICcgKyBzcGxpdHRlckhlaWdodCArICdweCB9JztcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKHN0eWxlKTtcclxuXHJcbiAgICAgICAgJChjaGFydFZpZXdDb250YWluZXJJZCkuYXBwZW5kKFwiPGRpdiBzdHlsZT0nb3ZlcmZsb3c6IGhpZGRlbiBhdXRvOyBmbGV4OiAxJyBjbGFzcz0nY29udGVudCcgaWQ9J1wiICsgdGhpcy5jaGFydFNwbGl0dGVyUGFyZW50Q29udGFpbmVySWQgKyBcIic+IDwvZGl2PlwiKTtcclxuICAgICAgICAkKFwiI1wiICsgdGhpcy5jaGFydFNwbGl0dGVyUGFyZW50Q29udGFpbmVySWQpLmFwcGVuZChcIjxkaXYgc3R5bGU9J292ZXJmbG93OiBoaWRkZW4gYXV0bycgY2xhc3M9J2NvbnRlbnQnIGlkPSdcIiArIHRoaXMuY2hhcnRTcGxpdHRlckNvbnRhaW5lcklkICsgXCInPiA8L2Rpdj5cIik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhcnRTcGxpdHRlckNvbnRhaW5lcklkO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYWRkQ2hhcnRWaWV3SGVhZGVyKGNoYXJ0Vmlld0NvbnRhaW5lcklkOiBzdHJpbmcpe1xyXG4gICAgICAgIC8vIFRPRE86IGdldCBoZWFkZXIgc3R5bGUgZnJvbSBjZW50cmFsIHBsYWNlXHJcbiAgICAgICAgbGV0IGhlYWRlckhlaWdodCA9IDMwO1xyXG4gICAgICAgICQoY2hhcnRWaWV3Q29udGFpbmVySWQpLmFwcGVuZChcIjxkaXYgY2xhc3M9J3dpZGdldEhlYWRlcicgaWQ9J1wiKyBjaGFydFZpZXdDb250YWluZXJJZCArIFwiX2hlYWRlcicgc3R5bGU9J2hlaWdodDogXCIrIGhlYWRlckhlaWdodCArIFwicHgnPkFuYWx5c2lzPC9kaXY+XCIpXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhZGRDaGFydFZpZXdUb29sYmFyQ29udGFpbmVyKGNoYXJ0Vmlld0NvbnRhaW5lcklkOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgICQoY2hhcnRWaWV3Q29udGFpbmVySWQpLmFwcGVuZChcIjxkaXYgc3R5bGU9J292ZXJmbG93OiBoaWRkZW47JyBjbGFzcz0nY29udGVudCcgaWQ9J1wiICsgdGhpcy5jaGFydFZpZXdUb29sYmFyQ29udGFpbmVySWQgKyBcIic+IFwiICsgXCI8L2Rpdj5cIik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhcnRWaWV3VG9vbGJhckNvbnRhaW5lcklkO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIHVwZGF0ZUNoYXJ0cyBieSByZXJlYWRpbmcgc2VyaWVzIGluIGFsbCBjaGFydHNcclxuICAgICAqICAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxJVHJhY2VDaGFydD59IHRyYWNlQ2hhcnRMaXN0XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3TGF5b3V0TWFuYWdlclxyXG4gICAgICovXHJcbiAgICB1cGRhdGVDaGFydHModHJhY2VDaGFydExpc3Q6IEFycmF5PElUcmFjZUNoYXJ0Pikge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJhY2VDaGFydExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdHJhY2VDaGFydExpc3RbaV0uc2V0QXZhaWxhYmxlU2VyaWVzQXNEYXRhU291cmNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmV0dXJucyBab29tQXhlcyBmb3IgYSBnaXZlbiBzdHJpbmcsIHVuZGVmaW5lZCBpZiBzdHJpbmcgZG9lcyBub3QgZXF1YWwgYW55IGF4aXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gem9vbUF4ZXNTdHJpbmdcclxuICAgICAqIEByZXR1cm5zIHsoWm9vbUF4ZXN8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdMYXlvdXRNYW5hZ2VyXHJcbiAgICAgKi9cclxuICAgIGdldFpvb21BeGVzRnJvbVN0cmluZyh6b29tQXhlc1N0cmluZyA6IHN0cmluZyk6IFpvb21EaXJlY3Rpb258dW5kZWZpbmVke1xyXG4gICAgICAgIHN3aXRjaCh6b29tQXhlc1N0cmluZyl7XHJcbiAgICAgICAgICAgIGNhc2UgXCJYXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gWm9vbURpcmVjdGlvbi5YXHJcbiAgICAgICAgICAgIGNhc2UgXCJZXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gWm9vbURpcmVjdGlvbi5ZXHJcbiAgICAgICAgICAgIGNhc2UgXCJYWVwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFpvb21EaXJlY3Rpb24uWFlcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7ICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBoZWlnaHQgb2YgcGFuZSBmcm9tIGNoYXJ0U3BsaXR0ZXIgcGVyc2lzdGVkIHBhbmVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY2hhcnROYW1lXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRDaGFydFZpZXdTcGxpdHRlckhlaWdodChwYW5lRGVmaW5pdGlvbnM6IEFycmF5PFNwbGl0dGVyUGFuZURlZmluaXRpb24+LCBjaGFydE5hbWU6IHN0cmluZyk6IG51bWJlcntcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhbmVEZWZpbml0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAocGFuZURlZmluaXRpb25zW2ldLnBhbmVEYXRhICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhbmVEZWZpbml0aW9uc1tpXS5wYW5lRGF0YS5kYXRhICE9IHVuZGVmaW5lZCAmJiBwYW5lRGVmaW5pdGlvbnNbaV0uY29tcG9uZW50RGVmaW5pdGlvbi5pZCA9PSBjaGFydE5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFuZURlZmluaXRpb25zW2ldLnBhbmVEYXRhLmRhdGEuc2l6ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9SZXR1cm4gZGVmYXVsdCBzaXplIGlmIHRoZXJlIGlzIG5vIGRhdGEgYXZhaWxhYmxlXHJcbiAgICAgICAgcmV0dXJuIDMwMDtcclxuICAgIH1cclxufVxyXG5leHBvcnQgeyBDaGFydFZpZXdMYXlvdXRNYW5hZ2VyfTsiXX0=