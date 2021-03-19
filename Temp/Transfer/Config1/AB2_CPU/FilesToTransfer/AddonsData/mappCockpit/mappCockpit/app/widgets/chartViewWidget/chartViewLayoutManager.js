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
define(["require", "exports", "../../framework/events", "./chartViewWidget", "../splitterWidget/splitterDefinition", "../../common/componentFactory/componentFactory", "../../common/componentFactory/componentDefinition", "../../common/persistence/persistDataProvider", "../common/splitterWidgetData"], function (require, exports, events_1, chartViewWidget_1, splitterDefinition_1, componentFactory_1, componentDefinition_1, persistDataProvider_1, splitterWidgetData_1) {
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
        function ChartViewLayoutManager(chartViewWidget) {
            var _this = this;
            this.eventContentSizeChanged = new EventChartViewContentSizeChanged();
            this.chartSplitterParentContainerId = "ChartViewChartSplitterContainer"; // Container needed for scrollbar behavior (switch on/off)
            this.chartSplitterContainerId = "ChartViewChartSplitter";
            this.chartViewToolbarContainerId = "ChartViewToolbar";
            this._chartViewWidgetToolbarButtonClickedHandler = function (sender, args) { return _this.chartViewWidget.onEventToolbarButtonClicked(sender, args); };
            this.chartViewWidget = chartViewWidget;
        }
        /**
         * initialize layout or chartViewWidget
         *
         * @param {string} containerID
         * @param {Array<ITraceChart>} traceChartList
         * @memberof ChartViewLayoutManager
         */
        ChartViewLayoutManager.prototype.initializeChartViewLayout = function (traceChartList) {
            this.chartViewtoolbar = componentFactory_1.ComponentFactory.getInstance().create(new componentDefinition_1.ComponentDefinition("ChartViewToolbar", "ChartViewToolbar"));
            this.addChartViewToolbarToView(this.chartViewtoolbar, this.chartViewWidget.view);
            this.chartViewtoolbar.initialize(this.chartViewToolbarContainerId);
            this.chartViewtoolbar.eventToolbarButtonClicked.attach(this._chartViewWidgetToolbarButtonClickedHandler);
            this.initializeChartSplitter(this.chartSplitterContainerId, traceChartList);
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
         * @param {Array<ITraceChart>} traceChartList
         * @memberof ChartViewLayoutManager
         */
        ChartViewLayoutManager.prototype.initializeChartSplitter = function (containerID, traceChartList) {
            var defaultChartSplitterDefinitionId = "ChartSplitterDefinitionId";
            persistDataProvider_1.PersistDataProvider.getInstance().setDefaultDataWithId(defaultChartSplitterDefinitionId, ChartViewLayoutManager.getDefaultChartSplitterDefinition());
            this.chartSplitter = componentFactory_1.ComponentFactory.getInstance().create(new componentDefinition_1.ComponentDefinition("SplitterWidget", containerID, defaultChartSplitterDefinitionId));
            this.chartSplitter.setDefaultComponentSettingsDataId(defaultChartSplitterDefinitionId);
            this.chartSplitter.component.disablePersisting();
            this.chartSplitter.initialize(containerID);
        };
        ChartViewLayoutManager.getDefaultChartSplitterDefinition = function () {
            var splitterComponentSettings = new splitterWidgetData_1.SplitterWidgetData(splitterDefinition_1.SplitterDefinition.orientationVertical, false);
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
        return ChartViewLayoutManager;
    }());
    exports.ChartViewLayoutManager = ChartViewLayoutManager;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRWaWV3TGF5b3V0TWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jaGFydFZpZXdXaWRnZXQvY2hhcnRWaWV3TGF5b3V0TWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBZUE7UUFBZ0Qsb0RBQXNCO1FBQXRFOztRQUF3RSxDQUFDO1FBQUQsdUNBQUM7SUFBRCxDQUFDLEFBQXpFLENBQWdELG1CQUFVLEdBQWU7SUFBQSxDQUFDO0lBQzFFO1FBY0ksZ0NBQVksZUFBZ0M7WUFBNUMsaUJBRUM7WUFWRCw0QkFBdUIsR0FBRyxJQUFJLGdDQUFnQyxFQUFFLENBQUM7WUFFeEQsbUNBQThCLEdBQVcsaUNBQWlDLENBQUMsQ0FBQywwREFBMEQ7WUFDdEksNkJBQXdCLEdBQVcsd0JBQXdCLENBQUM7WUFDNUQsZ0NBQTJCLEdBQVcsa0JBQWtCLENBQUM7WUFFMUQsZ0RBQTJDLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLGVBQWUsQ0FBQywyQkFBMkIsQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLEVBQTdELENBQTZELENBQUM7WUFHakksSUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7UUFDM0MsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNILDBEQUF5QixHQUF6QixVQUEwQixjQUFrQztZQUN4RCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsbUNBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUkseUNBQW1CLENBQUMsa0JBQWtCLEVBQUUsa0JBQWtCLENBQUMsQ0FBOEIsQ0FBQztZQUM1SixJQUFJLENBQUMseUJBQXlCLENBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakYsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUs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RUQ7Ozs7O1dBS0c7UUFDSCw2Q0FBWSxHQUFaLFVBQWEsY0FBa0M7WUFDM0MsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzVDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyw4QkFBOEIsRUFBRSxDQUFDO2FBQ3REO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNILHNEQUFxQixHQUFyQixVQUFzQixjQUF1QjtZQUN6QyxRQUFPLGNBQWMsRUFBQztnQkFDbEIsS0FBSyxHQUFHO29CQUNKLE9BQU8sK0JBQWEsQ0FBQyxDQUFDLENBQUE7Z0JBQzFCLEtBQUssR0FBRztvQkFDSixPQUFPLCtCQUFhLENBQUMsQ0FBQyxDQUFBO2dCQUMxQixLQUFLLElBQUk7b0JBQ0wsT0FBTywrQkFBYSxDQUFDLEVBQUUsQ0FBQTtnQkFDM0I7b0JBQ0ksT0FBTyxTQUFTLENBQUM7YUFDeEI7UUFDTCxDQUFDO1FBQ0wsNkJBQUM7SUFBRCxDQUFDLEFBOUtELElBOEtDO0lBQ1Esd0RBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvZXZlbnRzXCI7XHJcbmltcG9ydCB7IElUcmFjZUNoYXJ0IH0gZnJvbSBcIi4uL2NoYXJ0V2lkZ2V0L2ludGVyZmFjZXMvdHJhY2VDaGFydEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBab29tRGlyZWN0aW9ufSBmcm9tIFwiLi9jaGFydFZpZXdXaWRnZXRcIjtcclxuaW1wb3J0IHsgQ2hhcnRWaWV3V2lkZ2V0IH0gZnJvbSBcIi4vY2hhcnRWaWV3V2lkZ2V0XCI7XHJcbmltcG9ydCB7IElTcGxpdHRlcldpZGdldCB9IGZyb20gXCIuLi9zcGxpdHRlcldpZGdldC9pbnRlcmZhY2VzL3NwbGl0dGVyV2lkZ2V0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCAqIGFzIFdpZGdldHMgZnJvbSBcIi4uLy4uL3dpZGdldHMvd2lkZ2V0c1wiO1xyXG5pbXBvcnQgeyBJQ2hhcnRWaWV3VG9vbGJhciB9IGZyb20gXCIuL3Rvb2xiYXIvaW50ZXJmYWNlcy9jaGFydFZpZXdUb29sYmFySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElWaWV3IH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL3ZpZXdJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU3BsaXR0ZXJEZWZpbml0aW9uIH0gZnJvbSBcIi4uL3NwbGl0dGVyV2lkZ2V0L3NwbGl0dGVyRGVmaW5pdGlvblwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRGYWN0b3J5IH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRGYWN0b3J5L2NvbXBvbmVudEZhY3RvcnlcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50RGVmaW5pdGlvbiB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50RmFjdG9yeS9jb21wb25lbnREZWZpbml0aW9uXCI7XHJcbmltcG9ydCB7IFBlcnNpc3REYXRhUHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3BlcnNpc3RlbmNlL3BlcnNpc3REYXRhUHJvdmlkZXJcIjtcclxuXHJcbmltcG9ydCB7IFNwbGl0dGVyV2lkZ2V0RGF0YSB9IGZyb20gXCIuLi9jb21tb24vc3BsaXR0ZXJXaWRnZXREYXRhXCI7XHJcblxyXG5jbGFzcyBFdmVudENoYXJ0Vmlld0NvbnRlbnRTaXplQ2hhbmdlZCAgZXh0ZW5kcyBUeXBlZEV2ZW50PG51bGwsIG51bGw+eyB9O1xyXG5jbGFzcyBDaGFydFZpZXdMYXlvdXRNYW5hZ2VyIHtcclxuXHJcbiAgICBjaGFydFZpZXdXaWRnZXQgOiBDaGFydFZpZXdXaWRnZXQ7XHJcbiAgICBjaGFydFNwbGl0dGVyISA6IElTcGxpdHRlcldpZGdldDtcclxuICAgIGNoYXJ0Vmlld3Rvb2xiYXIhIDogSUNoYXJ0Vmlld1Rvb2xiYXI7IFxyXG5cclxuICAgIGV2ZW50Q29udGVudFNpemVDaGFuZ2VkID0gbmV3IEV2ZW50Q2hhcnRWaWV3Q29udGVudFNpemVDaGFuZ2VkKCk7XHJcblxyXG4gICAgcmVhZG9ubHkgY2hhcnRTcGxpdHRlclBhcmVudENvbnRhaW5lcklkOiBzdHJpbmcgPSBcIkNoYXJ0Vmlld0NoYXJ0U3BsaXR0ZXJDb250YWluZXJcIjsgLy8gQ29udGFpbmVyIG5lZWRlZCBmb3Igc2Nyb2xsYmFyIGJlaGF2aW9yIChzd2l0Y2ggb24vb2ZmKVxyXG4gICAgcmVhZG9ubHkgY2hhcnRTcGxpdHRlckNvbnRhaW5lcklkOiBzdHJpbmcgPSBcIkNoYXJ0Vmlld0NoYXJ0U3BsaXR0ZXJcIjtcclxuICAgIHJlYWRvbmx5IGNoYXJ0Vmlld1Rvb2xiYXJDb250YWluZXJJZDogc3RyaW5nID0gXCJDaGFydFZpZXdUb29sYmFyXCI7XHJcblxyXG4gICAgcHJpdmF0ZSBfY2hhcnRWaWV3V2lkZ2V0VG9vbGJhckJ1dHRvbkNsaWNrZWRIYW5kbGVyID0gKHNlbmRlcixhcmdzKSA9PiB0aGlzLmNoYXJ0Vmlld1dpZGdldC5vbkV2ZW50VG9vbGJhckJ1dHRvbkNsaWNrZWQoc2VuZGVyLGFyZ3MpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNoYXJ0Vmlld1dpZGdldDogQ2hhcnRWaWV3V2lkZ2V0KXtcclxuICAgICAgICB0aGlzLmNoYXJ0Vmlld1dpZGdldCA9IGNoYXJ0Vmlld1dpZGdldDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGluaXRpYWxpemUgbGF5b3V0IG9yIGNoYXJ0Vmlld1dpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb250YWluZXJJRFxyXG4gICAgICogQHBhcmFtIHtBcnJheTxJVHJhY2VDaGFydD59IHRyYWNlQ2hhcnRMaXN0XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3TGF5b3V0TWFuYWdlclxyXG4gICAgICovXHJcbiAgICBpbml0aWFsaXplQ2hhcnRWaWV3TGF5b3V0KHRyYWNlQ2hhcnRMaXN0OiBBcnJheTxJVHJhY2VDaGFydD4pe1xyXG4gICAgICAgIHRoaXMuY2hhcnRWaWV3dG9vbGJhciA9IENvbXBvbmVudEZhY3RvcnkuZ2V0SW5zdGFuY2UoKS5jcmVhdGUobmV3IENvbXBvbmVudERlZmluaXRpb24oXCJDaGFydFZpZXdUb29sYmFyXCIsIFwiQ2hhcnRWaWV3VG9vbGJhclwiKSkgYXMgV2lkZ2V0cy5JQ2hhcnRWaWV3VG9vbGJhcjtcclxuICAgICAgICB0aGlzLmFkZENoYXJ0Vmlld1Rvb2xiYXJUb1ZpZXcoIHRoaXMuY2hhcnRWaWV3dG9vbGJhcix0aGlzLmNoYXJ0Vmlld1dpZGdldC52aWV3KTtcclxuICAgICAgICB0aGlzLmNoYXJ0Vmlld3Rvb2xiYXIuaW5pdGlhbGl6ZSh0aGlzLmNoYXJ0Vmlld1Rvb2xiYXJDb250YWluZXJJZCk7XHJcbiAgICAgICAgdGhpcy5jaGFydFZpZXd0b29sYmFyLmV2ZW50VG9vbGJhckJ1dHRvbkNsaWNrZWQuYXR0YWNoKHRoaXMuX2NoYXJ0Vmlld1dpZGdldFRvb2xiYXJCdXR0b25DbGlja2VkSGFuZGxlcik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5pbml0aWFsaXplQ2hhcnRTcGxpdHRlcih0aGlzLmNoYXJ0U3BsaXR0ZXJDb250YWluZXJJZCwgdHJhY2VDaGFydExpc3QpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzcG9zZSB0aGUgY2hhcnQgdmlldyBsYXlvdXQgbWFuYWdlciBcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3TGF5b3V0TWFuYWdlclxyXG4gICAgICovXHJcbiAgICBkaXNwb3NlKCl7XHJcbiAgICAgICAgaWYodGhpcy5jaGFydFZpZXd0b29sYmFyICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcnRWaWV3dG9vbGJhci5ldmVudFRvb2xiYXJCdXR0b25DbGlja2VkLmRldGFjaCh0aGlzLl9jaGFydFZpZXdXaWRnZXRUb29sYmFyQnV0dG9uQ2xpY2tlZEhhbmRsZXIpO1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJ0Vmlld3Rvb2xiYXIuZGlzcG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmNoYXJ0U3BsaXR0ZXIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5jaGFydFNwbGl0dGVyLmRpc3Bvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBhZGRzIHRoZSB0b29sYmFyIHRvIHRoZSB2aWV3IGV4cGxpY2l0bHkuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJVmlld30gdmlld1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld0xheW91dE1hbmFnZXJcclxuICAgICAqL1xyXG4gICAgYWRkQ2hhcnRWaWV3VG9vbGJhclRvVmlldyhjaGFydFZpZXdUb29sYmFyOiBJQ2hhcnRWaWV3VG9vbGJhciwgdmlldzogSVZpZXd8dW5kZWZpbmVkKSB7XHJcbiAgICAgICAgaWYgKHZpZXcpIHtcclxuICAgICAgICAgICB2aWV3LmFkZFdpZGdldChjaGFydFZpZXdUb29sYmFyKTsgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYWRkIG5lZWRlZCBjb250YWluZXJzIGZvciBjaGFydFZpZXdcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IGNvbnRhaW5lcklEXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3TGF5b3V0TWFuYWdlclxyXG4gICAgICovXHJcbiAgICBhZGRDaGFydFZpZXdDb250YWluZXJzKGNvbnRhaW5lcklEKXtcclxuICAgICAgICB0aGlzLmFkZENoYXJ0Vmlld0hlYWRlcihjb250YWluZXJJRCk7XHJcbiAgICAgICAgdGhpcy5hZGRDaGFydFZpZXdUb29sYmFyQ29udGFpbmVyKGNvbnRhaW5lcklEKTtcclxuICAgICAgICB0aGlzLmFkZENoYXJ0U3BsaXR0ZXJDb250YWluZXIoY29udGFpbmVySUQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmVzaXplIGxheW91dFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodFxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld0xheW91dE1hbmFnZXJcclxuICAgICAqL1xyXG4gICAgcmVzaXplKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKXsgICBcclxuICAgICAgICB0aGlzLmNoYXJ0U3BsaXR0ZXIucmVzaXplKHdpZHRoLGhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkQ2hhcnRzVHlwZUxheW91dChjb250YWluZXJJZDogc3RyaW5nKXtcclxuICAgICAgICAkKCcjJyArIGNvbnRhaW5lcklkKS5wcmVwZW5kKCc8ZGl2IGlkPVwiY2hhcnRUeXBlTGF5b3V0XCIgc3R5bGU9IFwid2lkdGg6MTAwJTsgaGVpZ2h0OjEwMCU7IGJhY2tncm91bmQtaW1hZ2U6IHVybCguLi8uLi9tYXBwQ29ja3BpdC9hcHAvd2lkZ2V0cy9jaGFydFZpZXdXaWRnZXQvc3R5bGUvaW1hZ2VzL2pvaG5CLmpwZylcIj48L2Rpdj4nKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICppbml0aWFsaXplIGNoYXJ0U3BsaXR0ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbnRhaW5lcklEXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElUcmFjZUNoYXJ0Pn0gdHJhY2VDaGFydExpc3RcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdMYXlvdXRNYW5hZ2VyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaW5pdGlhbGl6ZUNoYXJ0U3BsaXR0ZXIoY29udGFpbmVySUQ6IHN0cmluZywgdHJhY2VDaGFydExpc3Q6IEFycmF5PElUcmFjZUNoYXJ0Pikge1xyXG4gICAgICAgIGxldCBkZWZhdWx0Q2hhcnRTcGxpdHRlckRlZmluaXRpb25JZCA9IFwiQ2hhcnRTcGxpdHRlckRlZmluaXRpb25JZFwiO1xyXG4gICAgICAgIFBlcnNpc3REYXRhUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5zZXREZWZhdWx0RGF0YVdpdGhJZChkZWZhdWx0Q2hhcnRTcGxpdHRlckRlZmluaXRpb25JZCwgQ2hhcnRWaWV3TGF5b3V0TWFuYWdlci5nZXREZWZhdWx0Q2hhcnRTcGxpdHRlckRlZmluaXRpb24oKSk7XHJcblxyXG4gICAgICAgIHRoaXMuY2hhcnRTcGxpdHRlciA9IENvbXBvbmVudEZhY3RvcnkuZ2V0SW5zdGFuY2UoKS5jcmVhdGUobmV3IENvbXBvbmVudERlZmluaXRpb24oXCJTcGxpdHRlcldpZGdldFwiLCBjb250YWluZXJJRCwgZGVmYXVsdENoYXJ0U3BsaXR0ZXJEZWZpbml0aW9uSWQpKSBhcyBJU3BsaXR0ZXJXaWRnZXQ7IFxyXG4gICAgICAgIHRoaXMuY2hhcnRTcGxpdHRlci5zZXREZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NEYXRhSWQoZGVmYXVsdENoYXJ0U3BsaXR0ZXJEZWZpbml0aW9uSWQpO1xyXG4gICAgICAgIHRoaXMuY2hhcnRTcGxpdHRlci5jb21wb25lbnQuZGlzYWJsZVBlcnNpc3RpbmcoKTtcclxuICAgICAgICB0aGlzLmNoYXJ0U3BsaXR0ZXIuaW5pdGlhbGl6ZShjb250YWluZXJJRCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0RGVmYXVsdENoYXJ0U3BsaXR0ZXJEZWZpbml0aW9uKCkgOiBhbnkge1xyXG4gICAgICAgIGxldCBzcGxpdHRlckNvbXBvbmVudFNldHRpbmdzID0gbmV3IFNwbGl0dGVyV2lkZ2V0RGF0YShTcGxpdHRlckRlZmluaXRpb24ub3JpZW50YXRpb25WZXJ0aWNhbCwgZmFsc2UpO1xyXG4gICAgICAgIHJldHVybiBzcGxpdHRlckNvbXBvbmVudFNldHRpbmdzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBDaGFydCBTcGxpdHRlciBDb250YWluZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IGNoYXJ0Vmlld0NvbnRhaW5lcklkXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld0xheW91dE1hbmFnZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRDaGFydFNwbGl0dGVyQ29udGFpbmVyKGNoYXJ0Vmlld0NvbnRhaW5lcklkKTogc3RyaW5nIHtcclxuICAgICAgICB2YXIgcmVjdCA9ICQoY2hhcnRWaWV3Q29udGFpbmVySWQpWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIHZhciBzcGxpdHRlckhlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKSEgLSByZWN0LnRvcDtcclxuXHJcbiAgICAgICAgdmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcclxuICAgICAgICBzdHlsZS50eXBlID0gJ3RleHQvY3NzJztcclxuICAgICAgICBzdHlsZS5pbm5lckhUTUwgPSAnLnNwbGl0dGVyU3R5bGUgeyBoZWlnaHQ6ICcgKyBzcGxpdHRlckhlaWdodCArICdweCB9JztcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKHN0eWxlKTtcclxuXHJcbiAgICAgICAgJChjaGFydFZpZXdDb250YWluZXJJZCkuYXBwZW5kKFwiPGRpdiBzdHlsZT0nb3ZlcmZsb3c6IGhpZGRlbiBhdXRvOyBmbGV4OiAxJyBjbGFzcz0nY29udGVudCcgaWQ9J1wiICsgdGhpcy5jaGFydFNwbGl0dGVyUGFyZW50Q29udGFpbmVySWQgKyBcIic+IDwvZGl2PlwiKTtcclxuICAgICAgICAkKFwiI1wiICsgdGhpcy5jaGFydFNwbGl0dGVyUGFyZW50Q29udGFpbmVySWQpLmFwcGVuZChcIjxkaXYgc3R5bGU9J292ZXJmbG93OiBoaWRkZW4gYXV0bycgY2xhc3M9J2NvbnRlbnQnIGlkPSdcIiArIHRoaXMuY2hhcnRTcGxpdHRlckNvbnRhaW5lcklkICsgXCInPiA8L2Rpdj5cIik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhcnRTcGxpdHRlckNvbnRhaW5lcklkO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYWRkQ2hhcnRWaWV3SGVhZGVyKGNoYXJ0Vmlld0NvbnRhaW5lcklkOiBzdHJpbmcpe1xyXG4gICAgICAgIC8vIFRPRE86IGdldCBoZWFkZXIgc3R5bGUgZnJvbSBjZW50cmFsIHBsYWNlXHJcbiAgICAgICAgbGV0IGhlYWRlckhlaWdodCA9IDMwO1xyXG4gICAgICAgICQoY2hhcnRWaWV3Q29udGFpbmVySWQpLmFwcGVuZChcIjxkaXYgY2xhc3M9J3dpZGdldEhlYWRlcicgaWQ9J1wiKyBjaGFydFZpZXdDb250YWluZXJJZCArIFwiX2hlYWRlcicgc3R5bGU9J2hlaWdodDogXCIrIGhlYWRlckhlaWdodCArIFwicHgnPkFuYWx5c2lzPC9kaXY+XCIpXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhZGRDaGFydFZpZXdUb29sYmFyQ29udGFpbmVyKGNoYXJ0Vmlld0NvbnRhaW5lcklkOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgICQoY2hhcnRWaWV3Q29udGFpbmVySWQpLmFwcGVuZChcIjxkaXYgc3R5bGU9J292ZXJmbG93OiBoaWRkZW47JyBjbGFzcz0nY29udGVudCcgaWQ9J1wiICsgdGhpcy5jaGFydFZpZXdUb29sYmFyQ29udGFpbmVySWQgKyBcIic+IFwiICsgXCI8L2Rpdj5cIik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhcnRWaWV3VG9vbGJhckNvbnRhaW5lcklkO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIHVwZGF0ZUNoYXJ0cyBieSByZXJlYWRpbmcgc2VyaWVzIGluIGFsbCBjaGFydHNcclxuICAgICAqICAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxJVHJhY2VDaGFydD59IHRyYWNlQ2hhcnRMaXN0XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3TGF5b3V0TWFuYWdlclxyXG4gICAgICovXHJcbiAgICB1cGRhdGVDaGFydHModHJhY2VDaGFydExpc3Q6IEFycmF5PElUcmFjZUNoYXJ0Pikge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJhY2VDaGFydExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdHJhY2VDaGFydExpc3RbaV0uc2V0QXZhaWxhYmxlU2VyaWVzQXNEYXRhU291cmNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmV0dXJucyBab29tQXhlcyBmb3IgYSBnaXZlbiBzdHJpbmcsIHVuZGVmaW5lZCBpZiBzdHJpbmcgZG9lcyBub3QgZXF1YWwgYW55IGF4aXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gem9vbUF4ZXNTdHJpbmdcclxuICAgICAqIEByZXR1cm5zIHsoWm9vbUF4ZXN8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdMYXlvdXRNYW5hZ2VyXHJcbiAgICAgKi9cclxuICAgIGdldFpvb21BeGVzRnJvbVN0cmluZyh6b29tQXhlc1N0cmluZyA6IHN0cmluZyk6IFpvb21EaXJlY3Rpb258dW5kZWZpbmVke1xyXG4gICAgICAgIHN3aXRjaCh6b29tQXhlc1N0cmluZyl7XHJcbiAgICAgICAgICAgIGNhc2UgXCJYXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gWm9vbURpcmVjdGlvbi5YXHJcbiAgICAgICAgICAgIGNhc2UgXCJZXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gWm9vbURpcmVjdGlvbi5ZXHJcbiAgICAgICAgICAgIGNhc2UgXCJYWVwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFpvb21EaXJlY3Rpb24uWFlcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7ICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnQgeyBDaGFydFZpZXdMYXlvdXRNYW5hZ2VyfTsiXX0=