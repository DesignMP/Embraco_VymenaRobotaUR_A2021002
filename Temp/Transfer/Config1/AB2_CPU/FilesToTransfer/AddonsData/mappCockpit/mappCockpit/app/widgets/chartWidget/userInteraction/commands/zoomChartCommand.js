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
define(["require", "exports", "../chartCommandBase", "../../helpers/chartZoomCalculations", "../../../../models/chartManagerDataModel/chartManagerChart", "../../../../core/interfaces/components/ui/chart/chartInterface", "../../helpers/chartRangeHelper"], function (require, exports, chartCommandBase_1, chartZoomCalculations_1, chartManagerChart_1, chartInterface_1, chartRangeHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ZoomChartCommand = /** @class */ (function (_super) {
        __extends(ZoomChartCommand, _super);
        function ZoomChartCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ZoomChartCommand.prototype.onExecuteChartCommand = function (sender, args) {
            var chart = args.traceChart;
            if (chart != null) {
                if (args.data.axes.length == 0) {
                    args.data.axes = this.chartViewChartManager.getZoomAxesInChart(chart, args.data.zoomDirection);
                }
                var zoomCalculator = new chartZoomCalculations_1.ChartZoomCalculations();
                for (var i = 0; i < args.data.axes.length; i++) {
                    var axis = args.data.axes[i];
                    var newRange = zoomCalculator.calculateAxisZoomRanges(chart, axis, args.data.zoomStep, args.data.mousePoint.x, args.data.mousePoint.y);
                    //limit the axis range to Precision 11 to prevent syncfusion chart from failing
                    var distance = newRange[1] - newRange[0];
                    if (distance > chartRangeHelper_1.SF_axisResolution) {
                        if (axis.getAxisOrientation() == chartInterface_1.AxisOrientation.horizontal) {
                            var scale = chart.getScaleByScaleId(chart.scales[i].id);
                            if (scale != undefined) {
                                chart.setScaleRange(scale, newRange[0], newRange[1], scale.minYValue, scale.maxYValue, "horizontal");
                            }
                        }
                        else {
                            var scale = chart.getScaleByScaleId(axis.getAxisID());
                            if (scale != undefined) {
                                chart.setScaleRange(scale, scale.minXValue, scale.maxXValue, newRange[0], newRange[1]);
                            }
                        }
                    }
                }
                //Workaround!: Redraw charts except XY or just the XY chart we are zooming
                if (chart.type != chartManagerChart_1.ChartType.XYChart) {
                    this.chartViewChartManager.redrawCharts();
                }
                else {
                    chart.redrawChart();
                }
            }
        };
        return ZoomChartCommand;
    }(chartCommandBase_1.ChartCommandBase));
    exports.ZoomChartCommand = ZoomChartCommand;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9vbUNoYXJ0Q29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jaGFydFdpZGdldC91c2VySW50ZXJhY3Rpb24vY29tbWFuZHMvem9vbUNoYXJ0Q29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBV0E7UUFBK0Isb0NBQWdCO1FBQS9DOztRQTZDQSxDQUFDO1FBM0NHLGdEQUFxQixHQUFyQixVQUFzQixNQUFXLEVBQUUsSUFBa0M7WUFDakUsSUFBSSxLQUFLLEdBQXVCLElBQUksQ0FBQyxVQUFVLENBQUM7WUFFaEQsSUFBRyxLQUFLLElBQUksSUFBSSxFQUFDO2dCQUViLElBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBQztvQkFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2lCQUNsRztnQkFFRCxJQUFJLGNBQWMsR0FBRyxJQUFJLDZDQUFxQixFQUFFLENBQUM7Z0JBQ2pELEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7b0JBQzFDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBZSxDQUFDO29CQUUzQyxJQUFJLFFBQVEsR0FBRyxjQUFjLENBQUMsdUJBQXVCLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBRXZJLCtFQUErRTtvQkFDL0UsSUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDekMsSUFBRyxRQUFRLEdBQUcsb0NBQWlCLEVBQUM7d0JBQzVCLElBQUcsSUFBSSxDQUFDLGtCQUFrQixFQUFFLElBQUksZ0NBQWUsQ0FBQyxVQUFVLEVBQUM7NEJBQ3ZELElBQUksS0FBSyxHQUFJLEtBQW1CLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQzs0QkFDdkUsSUFBRyxLQUFLLElBQUksU0FBUyxFQUFDO2dDQUNqQixLQUFtQixDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUM7NkJBQ3ZIO3lCQUNKOzZCQUNHOzRCQUNBLElBQUksS0FBSyxHQUFJLEtBQW1CLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7NEJBQ3JFLElBQUcsS0FBSyxJQUFJLFNBQVMsRUFBQztnQ0FDakIsS0FBbUIsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NkJBQ3pHO3lCQUNKO3FCQUNKO2lCQUVKO2dCQUVELDBFQUEwRTtnQkFDMUUsSUFBSSxLQUFLLENBQUMsSUFBSSxJQUFJLDZCQUFTLENBQUMsT0FBTyxFQUFFO29CQUNqQyxJQUFJLENBQUMscUJBQXFCLENBQUMsWUFBWSxFQUFFLENBQUM7aUJBQzdDO3FCQUNJO29CQUNELEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztpQkFDdkI7YUFDSjtRQUNMLENBQUM7UUFDTCx1QkFBQztJQUFELENBQUMsQUE3Q0QsQ0FBK0IsbUNBQWdCLEdBNkM5QztJQUVPLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYXJ0Q29tbWFuZEJhc2UgfSBmcm9tIFwiLi4vY2hhcnRDb21tYW5kQmFzZVwiO1xyXG5pbXBvcnQgeyBFdmVudEV4ZWN1dGVDaGFydENvbW1hbmRBcmdzfSBmcm9tIFwiLi4vdXNlckludGVyYWN0aW9uQ29udHJvbGxlclwiO1xyXG5pbXBvcnQgeyBDaGFydFpvb21DYWxjdWxhdGlvbnMgfSBmcm9tIFwiLi4vLi4vaGVscGVycy9jaGFydFpvb21DYWxjdWxhdGlvbnNcIjtcclxuaW1wb3J0IHsgQ2hhcnRCYXNlIH0gZnJvbSBcIi4uLy4uL0NoYXJ0QmFzZVwiO1xyXG5pbXBvcnQgeyBDaGFydFR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9jaGFydE1hbmFnZXJDaGFydFwiO1xyXG5pbXBvcnQgeyBJVHJhY2VDaGFydCB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL3RyYWNlQ2hhcnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSUNoYXJ0QXhpcyB9IGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL2ludGVyZmFjZXMvY29tcG9uZW50cy91aS9jaGFydC9DaGFydEF4aXNJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQXhpc09yaWVudGF0aW9uIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvaW50ZXJmYWNlcy9jb21wb25lbnRzL3VpL2NoYXJ0L2NoYXJ0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNGX2F4aXNSZXNvbHV0aW9uIH0gZnJvbSBcIi4uLy4uL2hlbHBlcnMvY2hhcnRSYW5nZUhlbHBlclwiO1xyXG5cclxuXHJcbmNsYXNzIFpvb21DaGFydENvbW1hbmQgZXh0ZW5kcyBDaGFydENvbW1hbmRCYXNle1xyXG4gICAgXHJcbiAgICBvbkV4ZWN1dGVDaGFydENvbW1hbmQoc2VuZGVyOiBhbnksIGFyZ3M6IEV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZEFyZ3MpIHtcclxuICAgICAgICBsZXQgY2hhcnQ6IElUcmFjZUNoYXJ0IHwgbnVsbCA9IGFyZ3MudHJhY2VDaGFydDtcclxuICAgICAgICBcclxuICAgICAgICBpZihjaGFydCAhPSBudWxsKXtcclxuXHJcbiAgICAgICAgICAgIGlmKGFyZ3MuZGF0YS5heGVzLmxlbmd0aCA9PSAwKXtcclxuICAgICAgICAgICAgICAgIGFyZ3MuZGF0YS5heGVzID0gdGhpcy5jaGFydFZpZXdDaGFydE1hbmFnZXIuZ2V0Wm9vbUF4ZXNJbkNoYXJ0KGNoYXJ0LCBhcmdzLmRhdGEuem9vbURpcmVjdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCB6b29tQ2FsY3VsYXRvciA9IG5ldyBDaGFydFpvb21DYWxjdWxhdGlvbnMoKTtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGFyZ3MuZGF0YS5heGVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBheGlzID0gYXJncy5kYXRhLmF4ZXNbaV0gYXMgSUNoYXJ0QXhpcztcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3UmFuZ2UgPSB6b29tQ2FsY3VsYXRvci5jYWxjdWxhdGVBeGlzWm9vbVJhbmdlcyhjaGFydCwgYXhpcywgYXJncy5kYXRhLnpvb21TdGVwLCBhcmdzLmRhdGEubW91c2VQb2ludC54LCBhcmdzLmRhdGEubW91c2VQb2ludC55KTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy9saW1pdCB0aGUgYXhpcyByYW5nZSB0byBQcmVjaXNpb24gMTEgdG8gcHJldmVudCBzeW5jZnVzaW9uIGNoYXJ0IGZyb20gZmFpbGluZ1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpc3RhbmNlID0gbmV3UmFuZ2VbMV0gLSBuZXdSYW5nZVswXTtcclxuICAgICAgICAgICAgICAgIGlmKGRpc3RhbmNlID4gU0ZfYXhpc1Jlc29sdXRpb24pe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGF4aXMuZ2V0QXhpc09yaWVudGF0aW9uKCkgPT0gQXhpc09yaWVudGF0aW9uLmhvcml6b250YWwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2NhbGUgPSAoY2hhcnQgYXMgQ2hhcnRCYXNlKS5nZXRTY2FsZUJ5U2NhbGVJZChjaGFydC5zY2FsZXNbaV0uaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzY2FsZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNoYXJ0IGFzIENoYXJ0QmFzZSkuc2V0U2NhbGVSYW5nZShzY2FsZSwgbmV3UmFuZ2VbMF0sIG5ld1JhbmdlWzFdLCBzY2FsZS5taW5ZVmFsdWUsIHNjYWxlLm1heFlWYWx1ZSwgXCJob3Jpem9udGFsXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzY2FsZSA9IChjaGFydCBhcyBDaGFydEJhc2UpLmdldFNjYWxlQnlTY2FsZUlkKGF4aXMuZ2V0QXhpc0lEKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzY2FsZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNoYXJ0IGFzIENoYXJ0QmFzZSkuc2V0U2NhbGVSYW5nZShzY2FsZSwgc2NhbGUubWluWFZhbHVlLCBzY2FsZS5tYXhYVmFsdWUsIG5ld1JhbmdlWzBdLCBuZXdSYW5nZVsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9Xb3JrYXJvdW5kITogUmVkcmF3IGNoYXJ0cyBleGNlcHQgWFkgb3IganVzdCB0aGUgWFkgY2hhcnQgd2UgYXJlIHpvb21pbmdcclxuICAgICAgICAgICAgaWYgKGNoYXJ0LnR5cGUgIT0gQ2hhcnRUeXBlLlhZQ2hhcnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhcnRWaWV3Q2hhcnRNYW5hZ2VyLnJlZHJhd0NoYXJ0cygpOyAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNoYXJ0LnJlZHJhd0NoYXJ0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7Wm9vbUNoYXJ0Q29tbWFuZH0iXX0=