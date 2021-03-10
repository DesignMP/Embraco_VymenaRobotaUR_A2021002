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
define(["require", "exports", "../../framework/events", "./chartViewWidget", "../../widgets/widgets"], function (require, exports, events_1, chartViewWidget_1, Widgets) {
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
            this.chartViewtoolbar = Widgets.ChartViewToolbar.create();
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
            this.chartSplitter = Widgets.SplitterWidget.create();
            this.chartSplitter.setOrientation(true);
            this.chartSplitter.setResponsive(false);
            this.chartSplitter.initialize(containerID);
            this.chartSplitter.recalculateLayout();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRWaWV3TGF5b3V0TWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jaGFydFZpZXdXaWRnZXQvY2hhcnRWaWV3TGF5b3V0TWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBU0E7UUFBZ0Qsb0RBQXNCO1FBQXRFOztRQUF3RSxDQUFDO1FBQUQsdUNBQUM7SUFBRCxDQUFDLEFBQXpFLENBQWdELG1CQUFVLEdBQWU7SUFBQSxDQUFDO0lBQzFFO1FBY0ksZ0NBQVksZUFBZ0M7WUFBNUMsaUJBRUM7WUFWRCw0QkFBdUIsR0FBRyxJQUFJLGdDQUFnQyxFQUFFLENBQUM7WUFFeEQsbUNBQThCLEdBQVcsaUNBQWlDLENBQUMsQ0FBQywwREFBMEQ7WUFDdEksNkJBQXdCLEdBQVcsd0JBQXdCLENBQUM7WUFDNUQsZ0NBQTJCLEdBQVcsa0JBQWtCLENBQUM7WUFFMUQsZ0RBQTJDLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLGVBQWUsQ0FBQywyQkFBMkIsQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLEVBQTdELENBQTZELENBQUM7WUFHakksSUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7UUFDM0MsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNILDBEQUF5QixHQUF6QixVQUEwQixjQUFrQztZQUN4RCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBK0IsQ0FBQztZQUN2RixJQUFJLENBQUMseUJBQXlCLENBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakYsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsMkJBQTJCLENBQUMsQ0FBQztZQUNuRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMseUJBQXlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDO1lBRXpHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDaEYsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSCx3Q0FBTyxHQUFQO1lBQ0ksSUFBRyxJQUFJLENBQUMsZ0JBQWdCLElBQUksU0FBUyxFQUFDO2dCQUNsQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMseUJBQXlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDO2dCQUN6RyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDbkM7UUFDTCxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSCwwREFBeUIsR0FBekIsVUFBMEIsZ0JBQW1DLEVBQUUsSUFBcUI7WUFDaEYsSUFBSSxJQUFJLEVBQUU7Z0JBQ1AsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2FBQ25DO1FBQ0wsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gsdURBQXNCLEdBQXRCLFVBQXVCLFdBQVc7WUFDOUIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMseUJBQXlCLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDaEQsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNILHVDQUFNLEdBQU4sVUFBTyxLQUFhLEVBQUUsTUFBYztZQUNoQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUMsQ0FBQztRQUVELG9EQUFtQixHQUFuQixVQUFvQixXQUFtQjtZQUNuQyxDQUFDLENBQUMsR0FBRyxHQUFHLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxnS0FBZ0ssQ0FBQyxDQUFBO1FBQ2xNLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0ssd0RBQXVCLEdBQS9CLFVBQWdDLFdBQW1CLEVBQUUsY0FBa0M7WUFDbkYsSUFBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBNkIsQ0FBQztZQUNoRixJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsYUFBYSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFFM0MsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLDBEQUF5QixHQUFqQyxVQUFrQyxvQkFBb0I7WUFDbEQsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUM5RCxJQUFJLGNBQWMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxFQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUVwRCxJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzVDLEtBQUssQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDO1lBQ3hCLEtBQUssQ0FBQyxTQUFTLEdBQUcsMkJBQTJCLEdBQUcsY0FBYyxHQUFHLE1BQU0sQ0FBQztZQUN4RSxRQUFRLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRTVELENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxrRUFBa0UsR0FBRyxJQUFJLENBQUMsOEJBQThCLEdBQUcsV0FBVyxDQUFDLENBQUM7WUFDdkosQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsOEJBQThCLENBQUMsQ0FBQyxNQUFNLENBQUMseURBQXlELEdBQUcsSUFBSSxDQUFDLHdCQUF3QixHQUFHLFdBQVcsQ0FBQyxDQUFDO1lBQzdKLE9BQU8sSUFBSSxDQUFDLHdCQUF3QixDQUFDO1FBQ3pDLENBQUM7UUFFTyxtREFBa0IsR0FBMUIsVUFBMkIsb0JBQTRCO1lBQ25ELDRDQUE0QztZQUM1QyxJQUFJLFlBQVksR0FBRyxFQUFFLENBQUM7WUFDdEIsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUMsTUFBTSxDQUFDLGdDQUFnQyxHQUFFLG9CQUFvQixHQUFHLDBCQUEwQixHQUFFLFlBQVksR0FBRyxvQkFBb0IsQ0FBQyxDQUFBO1FBQzVKLENBQUM7UUFFTyw2REFBNEIsR0FBcEMsVUFBcUMsb0JBQTRCO1lBQzdELENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxxREFBcUQsR0FBRyxJQUFJLENBQUMsMkJBQTJCLEdBQUcsS0FBSyxHQUFHLFFBQVEsQ0FBQyxDQUFDO1lBQzVJLE9BQU8sSUFBSSxDQUFDLDJCQUEyQixDQUFDO1FBQzVDLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNILDZDQUFZLEdBQVosVUFBYSxjQUFrQztZQUMzQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDNUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLDhCQUE4QixFQUFFLENBQUM7YUFDdEQ7UUFDTCxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0gsc0RBQXFCLEdBQXJCLFVBQXNCLGNBQXVCO1lBQ3pDLFFBQU8sY0FBYyxFQUFDO2dCQUNsQixLQUFLLEdBQUc7b0JBQ0osT0FBTywrQkFBYSxDQUFDLENBQUMsQ0FBQTtnQkFDMUIsS0FBSyxHQUFHO29CQUNKLE9BQU8sK0JBQWEsQ0FBQyxDQUFDLENBQUE7Z0JBQzFCLEtBQUssSUFBSTtvQkFDTCxPQUFPLCtCQUFhLENBQUMsRUFBRSxDQUFBO2dCQUMzQjtvQkFDSSxPQUFPLFNBQVMsQ0FBQzthQUN4QjtRQUNMLENBQUM7UUFDTCw2QkFBQztJQUFELENBQUMsQUFyS0QsSUFxS0M7SUFDUSx3REFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUeXBlZEV2ZW50IH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9ldmVudHNcIjtcclxuaW1wb3J0IHsgSVRyYWNlQ2hhcnQgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL3RyYWNlQ2hhcnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgWm9vbURpcmVjdGlvbn0gZnJvbSBcIi4vY2hhcnRWaWV3V2lkZ2V0XCI7XHJcbmltcG9ydCB7IENoYXJ0Vmlld1dpZGdldCB9IGZyb20gXCIuL2NoYXJ0Vmlld1dpZGdldFwiO1xyXG5pbXBvcnQgeyBJU3BsaXR0ZXJXaWRnZXQgfSBmcm9tIFwiLi4vc3BsaXR0ZXJXaWRnZXQvaW50ZXJmYWNlcy9zcGxpdHRlcldpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgKiBhcyBXaWRnZXRzIGZyb20gXCIuLi8uLi93aWRnZXRzL3dpZGdldHNcIjtcclxuaW1wb3J0IHsgSUNoYXJ0Vmlld1Rvb2xiYXIgfSBmcm9tIFwiLi90b29sYmFyL2ludGVyZmFjZXMvY2hhcnRWaWV3VG9vbGJhckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJVmlldyB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy92aWV3SW50ZXJmYWNlXCI7XHJcblxyXG5jbGFzcyBFdmVudENoYXJ0Vmlld0NvbnRlbnRTaXplQ2hhbmdlZCAgZXh0ZW5kcyBUeXBlZEV2ZW50PG51bGwsIG51bGw+eyB9O1xyXG5jbGFzcyBDaGFydFZpZXdMYXlvdXRNYW5hZ2VyIHtcclxuXHJcbiAgICBjaGFydFZpZXdXaWRnZXQgOiBDaGFydFZpZXdXaWRnZXQ7XHJcbiAgICBjaGFydFNwbGl0dGVyISA6IElTcGxpdHRlcldpZGdldDtcclxuICAgIGNoYXJ0Vmlld3Rvb2xiYXIhIDogSUNoYXJ0Vmlld1Rvb2xiYXI7IFxyXG5cclxuICAgIGV2ZW50Q29udGVudFNpemVDaGFuZ2VkID0gbmV3IEV2ZW50Q2hhcnRWaWV3Q29udGVudFNpemVDaGFuZ2VkKCk7XHJcblxyXG4gICAgcmVhZG9ubHkgY2hhcnRTcGxpdHRlclBhcmVudENvbnRhaW5lcklkOiBzdHJpbmcgPSBcIkNoYXJ0Vmlld0NoYXJ0U3BsaXR0ZXJDb250YWluZXJcIjsgLy8gQ29udGFpbmVyIG5lZWRlZCBmb3Igc2Nyb2xsYmFyIGJlaGF2aW9yIChzd2l0Y2ggb24vb2ZmKVxyXG4gICAgcmVhZG9ubHkgY2hhcnRTcGxpdHRlckNvbnRhaW5lcklkOiBzdHJpbmcgPSBcIkNoYXJ0Vmlld0NoYXJ0U3BsaXR0ZXJcIjtcclxuICAgIHJlYWRvbmx5IGNoYXJ0Vmlld1Rvb2xiYXJDb250YWluZXJJZDogc3RyaW5nID0gXCJDaGFydFZpZXdUb29sYmFyXCI7XHJcblxyXG4gICAgcHJpdmF0ZSBfY2hhcnRWaWV3V2lkZ2V0VG9vbGJhckJ1dHRvbkNsaWNrZWRIYW5kbGVyID0gKHNlbmRlcixhcmdzKSA9PiB0aGlzLmNoYXJ0Vmlld1dpZGdldC5vbkV2ZW50VG9vbGJhckJ1dHRvbkNsaWNrZWQoc2VuZGVyLGFyZ3MpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNoYXJ0Vmlld1dpZGdldDogQ2hhcnRWaWV3V2lkZ2V0KXtcclxuICAgICAgICB0aGlzLmNoYXJ0Vmlld1dpZGdldCA9IGNoYXJ0Vmlld1dpZGdldDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGluaXRpYWxpemUgbGF5b3V0IG9yIGNoYXJ0Vmlld1dpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb250YWluZXJJRFxyXG4gICAgICogQHBhcmFtIHtBcnJheTxJVHJhY2VDaGFydD59IHRyYWNlQ2hhcnRMaXN0XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3TGF5b3V0TWFuYWdlclxyXG4gICAgICovXHJcbiAgICBpbml0aWFsaXplQ2hhcnRWaWV3TGF5b3V0KHRyYWNlQ2hhcnRMaXN0OiBBcnJheTxJVHJhY2VDaGFydD4pe1xyXG4gICAgICAgIHRoaXMuY2hhcnRWaWV3dG9vbGJhciA9IFdpZGdldHMuQ2hhcnRWaWV3VG9vbGJhci5jcmVhdGUoKSBhcyBXaWRnZXRzLklDaGFydFZpZXdUb29sYmFyO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hhcnRWaWV3VG9vbGJhclRvVmlldyggdGhpcy5jaGFydFZpZXd0b29sYmFyLHRoaXMuY2hhcnRWaWV3V2lkZ2V0LnZpZXcpO1xyXG4gICAgICAgIHRoaXMuY2hhcnRWaWV3dG9vbGJhci5pbml0aWFsaXplKHRoaXMuY2hhcnRWaWV3VG9vbGJhckNvbnRhaW5lcklkKTtcclxuICAgICAgICB0aGlzLmNoYXJ0Vmlld3Rvb2xiYXIuZXZlbnRUb29sYmFyQnV0dG9uQ2xpY2tlZC5hdHRhY2godGhpcy5fY2hhcnRWaWV3V2lkZ2V0VG9vbGJhckJ1dHRvbkNsaWNrZWRIYW5kbGVyKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmluaXRpYWxpemVDaGFydFNwbGl0dGVyKHRoaXMuY2hhcnRTcGxpdHRlckNvbnRhaW5lcklkLCB0cmFjZUNoYXJ0TGlzdCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNwb3NlIHRoZSBjaGFydCB2aWV3IGxheW91dCBtYW5hZ2VyIFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdMYXlvdXRNYW5hZ2VyXHJcbiAgICAgKi9cclxuICAgIGRpc3Bvc2UoKXtcclxuICAgICAgICBpZih0aGlzLmNoYXJ0Vmlld3Rvb2xiYXIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5jaGFydFZpZXd0b29sYmFyLmV2ZW50VG9vbGJhckJ1dHRvbkNsaWNrZWQuZGV0YWNoKHRoaXMuX2NoYXJ0Vmlld1dpZGdldFRvb2xiYXJCdXR0b25DbGlja2VkSGFuZGxlcik7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcnRWaWV3dG9vbGJhci5kaXNwb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYWRkcyB0aGUgdG9vbGJhciB0byB0aGUgdmlldyBleHBsaWNpdGx5LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SVZpZXd9IHZpZXdcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdMYXlvdXRNYW5hZ2VyXHJcbiAgICAgKi9cclxuICAgIGFkZENoYXJ0Vmlld1Rvb2xiYXJUb1ZpZXcoY2hhcnRWaWV3VG9vbGJhcjogSUNoYXJ0Vmlld1Rvb2xiYXIsIHZpZXc6IElWaWV3fHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGlmICh2aWV3KSB7XHJcbiAgICAgICAgICAgdmlldy5hZGRXaWRnZXQoY2hhcnRWaWV3VG9vbGJhcik7IFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGFkZCBuZWVkZWQgY29udGFpbmVycyBmb3IgY2hhcnRWaWV3XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBjb250YWluZXJJRFxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld0xheW91dE1hbmFnZXJcclxuICAgICAqL1xyXG4gICAgYWRkQ2hhcnRWaWV3Q29udGFpbmVycyhjb250YWluZXJJRCl7XHJcbiAgICAgICAgdGhpcy5hZGRDaGFydFZpZXdIZWFkZXIoY29udGFpbmVySUQpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hhcnRWaWV3VG9vbGJhckNvbnRhaW5lcihjb250YWluZXJJRCk7XHJcbiAgICAgICAgdGhpcy5hZGRDaGFydFNwbGl0dGVyQ29udGFpbmVyKGNvbnRhaW5lcklEKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlc2l6ZSBsYXlvdXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gd2lkdGhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdMYXlvdXRNYW5hZ2VyXHJcbiAgICAgKi9cclxuICAgIHJlc2l6ZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcil7ICAgXHJcbiAgICAgICAgdGhpcy5jaGFydFNwbGl0dGVyLnJlc2l6ZSh3aWR0aCxoZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZENoYXJ0c1R5cGVMYXlvdXQoY29udGFpbmVySWQ6IHN0cmluZyl7XHJcbiAgICAgICAgJCgnIycgKyBjb250YWluZXJJZCkucHJlcGVuZCgnPGRpdiBpZD1cImNoYXJ0VHlwZUxheW91dFwiIHN0eWxlPSBcIndpZHRoOjEwMCU7IGhlaWdodDoxMDAlOyBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoLi4vLi4vbWFwcENvY2twaXQvYXBwL3dpZGdldHMvY2hhcnRWaWV3V2lkZ2V0L3N0eWxlL2ltYWdlcy9qb2huQi5qcGcpXCI+PC9kaXY+JylcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqaW5pdGlhbGl6ZSBjaGFydFNwbGl0dGVyXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb250YWluZXJJRFxyXG4gICAgICogQHBhcmFtIHtBcnJheTxJVHJhY2VDaGFydD59IHRyYWNlQ2hhcnRMaXN0XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3TGF5b3V0TWFuYWdlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGluaXRpYWxpemVDaGFydFNwbGl0dGVyKGNvbnRhaW5lcklEOiBzdHJpbmcsIHRyYWNlQ2hhcnRMaXN0OiBBcnJheTxJVHJhY2VDaGFydD4pIHtcclxuICAgICAgICB0aGlzLmNoYXJ0U3BsaXR0ZXIgPSBXaWRnZXRzLlNwbGl0dGVyV2lkZ2V0LmNyZWF0ZSgpIGFzIFdpZGdldHMuSVNwbGl0dGVyV2lkZ2V0O1xyXG4gICAgICAgIHRoaXMuY2hhcnRTcGxpdHRlci5zZXRPcmllbnRhdGlvbih0cnVlKTtcclxuICAgICAgICB0aGlzLmNoYXJ0U3BsaXR0ZXIuc2V0UmVzcG9uc2l2ZShmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5jaGFydFNwbGl0dGVyLmluaXRpYWxpemUoY29udGFpbmVySUQpO1xyXG4gICAgICAgIHRoaXMuY2hhcnRTcGxpdHRlci5yZWNhbGN1bGF0ZUxheW91dCgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgQ2hhcnQgU3BsaXR0ZXIgQ29udGFpbmVyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBjaGFydFZpZXdDb250YWluZXJJZFxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdMYXlvdXRNYW5hZ2VyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkQ2hhcnRTcGxpdHRlckNvbnRhaW5lcihjaGFydFZpZXdDb250YWluZXJJZCk6IHN0cmluZyB7XHJcbiAgICAgICAgdmFyIHJlY3QgPSAkKGNoYXJ0Vmlld0NvbnRhaW5lcklkKVswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICB2YXIgc3BsaXR0ZXJIZWlnaHQgPSAkKHdpbmRvdykuaGVpZ2h0KCkhIC0gcmVjdC50b3A7XHJcblxyXG4gICAgICAgIHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XHJcbiAgICAgICAgc3R5bGUudHlwZSA9ICd0ZXh0L2Nzcyc7XHJcbiAgICAgICAgc3R5bGUuaW5uZXJIVE1MID0gJy5zcGxpdHRlclN0eWxlIHsgaGVpZ2h0OiAnICsgc3BsaXR0ZXJIZWlnaHQgKyAncHggfSc7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChzdHlsZSk7XHJcblxyXG4gICAgICAgICQoY2hhcnRWaWV3Q29udGFpbmVySWQpLmFwcGVuZChcIjxkaXYgc3R5bGU9J292ZXJmbG93OiBoaWRkZW4gYXV0bzsgZmxleDogMScgY2xhc3M9J2NvbnRlbnQnIGlkPSdcIiArIHRoaXMuY2hhcnRTcGxpdHRlclBhcmVudENvbnRhaW5lcklkICsgXCInPiA8L2Rpdj5cIik7XHJcbiAgICAgICAgJChcIiNcIiArIHRoaXMuY2hhcnRTcGxpdHRlclBhcmVudENvbnRhaW5lcklkKS5hcHBlbmQoXCI8ZGl2IHN0eWxlPSdvdmVyZmxvdzogaGlkZGVuIGF1dG8nIGNsYXNzPSdjb250ZW50JyBpZD0nXCIgKyB0aGlzLmNoYXJ0U3BsaXR0ZXJDb250YWluZXJJZCArIFwiJz4gPC9kaXY+XCIpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNoYXJ0U3BsaXR0ZXJDb250YWluZXJJZDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFkZENoYXJ0Vmlld0hlYWRlcihjaGFydFZpZXdDb250YWluZXJJZDogc3RyaW5nKXtcclxuICAgICAgICAvLyBUT0RPOiBnZXQgaGVhZGVyIHN0eWxlIGZyb20gY2VudHJhbCBwbGFjZVxyXG4gICAgICAgIGxldCBoZWFkZXJIZWlnaHQgPSAzMDtcclxuICAgICAgICAkKGNoYXJ0Vmlld0NvbnRhaW5lcklkKS5hcHBlbmQoXCI8ZGl2IGNsYXNzPSd3aWRnZXRIZWFkZXInIGlkPSdcIisgY2hhcnRWaWV3Q29udGFpbmVySWQgKyBcIl9oZWFkZXInIHN0eWxlPSdoZWlnaHQ6IFwiKyBoZWFkZXJIZWlnaHQgKyBcInB4Jz5BbmFseXNpczwvZGl2PlwiKVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYWRkQ2hhcnRWaWV3VG9vbGJhckNvbnRhaW5lcihjaGFydFZpZXdDb250YWluZXJJZDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICAkKGNoYXJ0Vmlld0NvbnRhaW5lcklkKS5hcHBlbmQoXCI8ZGl2IHN0eWxlPSdvdmVyZmxvdzogaGlkZGVuOycgY2xhc3M9J2NvbnRlbnQnIGlkPSdcIiArIHRoaXMuY2hhcnRWaWV3VG9vbGJhckNvbnRhaW5lcklkICsgXCInPiBcIiArIFwiPC9kaXY+XCIpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNoYXJ0Vmlld1Rvb2xiYXJDb250YWluZXJJZDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiB1cGRhdGVDaGFydHMgYnkgcmVyZWFkaW5nIHNlcmllcyBpbiBhbGwgY2hhcnRzXHJcbiAgICAgKiAgICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SVRyYWNlQ2hhcnQ+fSB0cmFjZUNoYXJ0TGlzdFxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld0xheW91dE1hbmFnZXJcclxuICAgICAqL1xyXG4gICAgdXBkYXRlQ2hhcnRzKHRyYWNlQ2hhcnRMaXN0OiBBcnJheTxJVHJhY2VDaGFydD4pIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRyYWNlQ2hhcnRMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRyYWNlQ2hhcnRMaXN0W2ldLnNldEF2YWlsYWJsZVNlcmllc0FzRGF0YVNvdXJjZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJldHVybnMgWm9vbUF4ZXMgZm9yIGEgZ2l2ZW4gc3RyaW5nLCB1bmRlZmluZWQgaWYgc3RyaW5nIGRvZXMgbm90IGVxdWFsIGFueSBheGlzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHpvb21BeGVzU3RyaW5nXHJcbiAgICAgKiBAcmV0dXJucyB7KFpvb21BeGVzfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3TGF5b3V0TWFuYWdlclxyXG4gICAgICovXHJcbiAgICBnZXRab29tQXhlc0Zyb21TdHJpbmcoem9vbUF4ZXNTdHJpbmcgOiBzdHJpbmcpOiBab29tRGlyZWN0aW9ufHVuZGVmaW5lZHtcclxuICAgICAgICBzd2l0Y2goem9vbUF4ZXNTdHJpbmcpe1xyXG4gICAgICAgICAgICBjYXNlIFwiWFwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFpvb21EaXJlY3Rpb24uWFxyXG4gICAgICAgICAgICBjYXNlIFwiWVwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFpvb21EaXJlY3Rpb24uWVxyXG4gICAgICAgICAgICBjYXNlIFwiWFlcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBab29tRGlyZWN0aW9uLlhZXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkOyAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IHsgQ2hhcnRWaWV3TGF5b3V0TWFuYWdlcn07Il19