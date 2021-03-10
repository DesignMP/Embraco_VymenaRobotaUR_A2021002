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
define(["require", "exports", "../chartCommandBase", "../../helpers/chartZoomCalculations", "../../../../models/chartManagerDataModel/chartManagerChart", "../../../../core/interfaces/components/ui/chart/chartInterface"], function (require, exports, chartCommandBase_1, chartZoomCalculations_1, chartManagerChart_1, chartInterface_1) {
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
                    var distance = Number(newRange[1].toPrecision(11)) - Number(newRange[0].toPrecision(11));
                    if (distance > 1e-12) {
                        if (axis.getAxisOrientation() == chartInterface_1.AxisOrientation.horizontal) {
                            //(chart as ChartBase).setRangeX(newRange[0], newRange[1])
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9vbUNoYXJ0Q29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jaGFydFZpZXdXaWRnZXQvdXNlckludGVyYWN0aW9uL2NvbW1hbmRzL3pvb21DaGFydENvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVVBO1FBQStCLG9DQUFnQjtRQUEvQzs7UUE4Q0EsQ0FBQztRQTVDRyxnREFBcUIsR0FBckIsVUFBc0IsTUFBVyxFQUFFLElBQWtDO1lBQ2pFLElBQUksS0FBSyxHQUF1QixJQUFJLENBQUMsVUFBVSxDQUFDO1lBRWhELElBQUcsS0FBSyxJQUFJLElBQUksRUFBQztnQkFFYixJQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUM7b0JBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztpQkFDbEc7Z0JBRUQsSUFBSSxjQUFjLEdBQUcsSUFBSSw2Q0FBcUIsRUFBRSxDQUFDO2dCQUNqRCxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO29CQUMxQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQWUsQ0FBQztvQkFFM0MsSUFBSSxRQUFRLEdBQUcsY0FBYyxDQUFDLHVCQUF1QixDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUV2SSwrRUFBK0U7b0JBQy9FLElBQUksUUFBUSxHQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDeEYsSUFBRyxRQUFRLEdBQUcsS0FBSyxFQUFDO3dCQUNoQixJQUFHLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLGdDQUFlLENBQUMsVUFBVSxFQUFDOzRCQUN2RCwwREFBMEQ7NEJBQzFELElBQUksS0FBSyxHQUFJLEtBQW1CLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQzs0QkFDdkUsSUFBRyxLQUFLLElBQUksU0FBUyxFQUFDO2dDQUNqQixLQUFtQixDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUM7NkJBQ3ZIO3lCQUNKOzZCQUNHOzRCQUNBLElBQUksS0FBSyxHQUFJLEtBQW1CLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7NEJBQ3JFLElBQUcsS0FBSyxJQUFJLFNBQVMsRUFBQztnQ0FDakIsS0FBbUIsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NkJBQ3pHO3lCQUNKO3FCQUNKO2lCQUVKO2dCQUVELDBFQUEwRTtnQkFDMUUsSUFBSSxLQUFLLENBQUMsSUFBSSxJQUFJLDZCQUFTLENBQUMsT0FBTyxFQUFFO29CQUNqQyxJQUFJLENBQUMscUJBQXFCLENBQUMsWUFBWSxFQUFFLENBQUM7aUJBQzdDO3FCQUNJO29CQUNELEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztpQkFDdkI7YUFDSjtRQUNMLENBQUM7UUFDTCx1QkFBQztJQUFELENBQUMsQUE5Q0QsQ0FBK0IsbUNBQWdCLEdBOEM5QztJQUVPLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYXJ0Q29tbWFuZEJhc2UgfSBmcm9tIFwiLi4vY2hhcnRDb21tYW5kQmFzZVwiO1xyXG5pbXBvcnQgeyBFdmVudEV4ZWN1dGVDaGFydENvbW1hbmRBcmdzfSBmcm9tIFwiLi4vdXNlckludGVyYWN0aW9uQ29udHJvbGxlclwiO1xyXG5pbXBvcnQgeyBDaGFydFpvb21DYWxjdWxhdGlvbnMgfSBmcm9tIFwiLi4vLi4vaGVscGVycy9jaGFydFpvb21DYWxjdWxhdGlvbnNcIjtcclxuaW1wb3J0IHsgQ2hhcnRCYXNlIH0gZnJvbSBcIi4uLy4uL0NoYXJ0QmFzZVwiO1xyXG5pbXBvcnQgeyBDaGFydFR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9jaGFydE1hbmFnZXJDaGFydFwiO1xyXG5pbXBvcnQgeyBJVHJhY2VDaGFydCB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL3RyYWNlQ2hhcnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSUNoYXJ0QXhpcyB9IGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL2ludGVyZmFjZXMvY29tcG9uZW50cy91aS9jaGFydC9DaGFydEF4aXNJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQXhpc09yaWVudGF0aW9uIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvaW50ZXJmYWNlcy9jb21wb25lbnRzL3VpL2NoYXJ0L2NoYXJ0SW50ZXJmYWNlXCI7XHJcblxyXG5cclxuY2xhc3MgWm9vbUNoYXJ0Q29tbWFuZCBleHRlbmRzIENoYXJ0Q29tbWFuZEJhc2V7XHJcbiAgICBcclxuICAgIG9uRXhlY3V0ZUNoYXJ0Q29tbWFuZChzZW5kZXI6IGFueSwgYXJnczogRXZlbnRFeGVjdXRlQ2hhcnRDb21tYW5kQXJncykge1xyXG4gICAgICAgIGxldCBjaGFydDogSVRyYWNlQ2hhcnQgfCBudWxsID0gYXJncy50cmFjZUNoYXJ0O1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKGNoYXJ0ICE9IG51bGwpe1xyXG5cclxuICAgICAgICAgICAgaWYoYXJncy5kYXRhLmF4ZXMubGVuZ3RoID09IDApe1xyXG4gICAgICAgICAgICAgICAgYXJncy5kYXRhLmF4ZXMgPSB0aGlzLmNoYXJ0Vmlld0NoYXJ0TWFuYWdlci5nZXRab29tQXhlc0luQ2hhcnQoY2hhcnQsIGFyZ3MuZGF0YS56b29tRGlyZWN0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IHpvb21DYWxjdWxhdG9yID0gbmV3IENoYXJ0Wm9vbUNhbGN1bGF0aW9ucygpO1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgYXJncy5kYXRhLmF4ZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IGF4aXMgPSBhcmdzLmRhdGEuYXhlc1tpXSBhcyBJQ2hhcnRBeGlzO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBuZXdSYW5nZSA9IHpvb21DYWxjdWxhdG9yLmNhbGN1bGF0ZUF4aXNab29tUmFuZ2VzKGNoYXJ0LCBheGlzLCBhcmdzLmRhdGEuem9vbVN0ZXAsIGFyZ3MuZGF0YS5tb3VzZVBvaW50LngsIGFyZ3MuZGF0YS5tb3VzZVBvaW50LnkpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvL2xpbWl0IHRoZSBheGlzIHJhbmdlIHRvIFByZWNpc2lvbiAxMSB0byBwcmV2ZW50IHN5bmNmdXNpb24gY2hhcnQgZnJvbSBmYWlsaW5nXHJcbiAgICAgICAgICAgICAgICBsZXQgZGlzdGFuY2UgPU51bWJlcihuZXdSYW5nZVsxXS50b1ByZWNpc2lvbigxMSkpIC0gTnVtYmVyKG5ld1JhbmdlWzBdLnRvUHJlY2lzaW9uKDExKSk7XHJcbiAgICAgICAgICAgICAgICBpZihkaXN0YW5jZSA+IDFlLTEyKXtcclxuICAgICAgICAgICAgICAgICAgICBpZihheGlzLmdldEF4aXNPcmllbnRhdGlvbigpID09IEF4aXNPcmllbnRhdGlvbi5ob3Jpem9udGFsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8oY2hhcnQgYXMgQ2hhcnRCYXNlKS5zZXRSYW5nZVgobmV3UmFuZ2VbMF0sIG5ld1JhbmdlWzFdKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2NhbGUgPSAoY2hhcnQgYXMgQ2hhcnRCYXNlKS5nZXRTY2FsZUJ5U2NhbGVJZChjaGFydC5zY2FsZXNbaV0uaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzY2FsZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNoYXJ0IGFzIENoYXJ0QmFzZSkuc2V0U2NhbGVSYW5nZShzY2FsZSwgbmV3UmFuZ2VbMF0sIG5ld1JhbmdlWzFdLCBzY2FsZS5taW5ZVmFsdWUsIHNjYWxlLm1heFlWYWx1ZSwgXCJob3Jpem9udGFsXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzY2FsZSA9IChjaGFydCBhcyBDaGFydEJhc2UpLmdldFNjYWxlQnlTY2FsZUlkKGF4aXMuZ2V0QXhpc0lEKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzY2FsZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNoYXJ0IGFzIENoYXJ0QmFzZSkuc2V0U2NhbGVSYW5nZShzY2FsZSwgc2NhbGUubWluWFZhbHVlLCBzY2FsZS5tYXhYVmFsdWUsIG5ld1JhbmdlWzBdLCBuZXdSYW5nZVsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9Xb3JrYXJvdW5kITogUmVkcmF3IGNoYXJ0cyBleGNlcHQgWFkgb3IganVzdCB0aGUgWFkgY2hhcnQgd2UgYXJlIHpvb21pbmdcclxuICAgICAgICAgICAgaWYgKGNoYXJ0LnR5cGUgIT0gQ2hhcnRUeXBlLlhZQ2hhcnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhcnRWaWV3Q2hhcnRNYW5hZ2VyLnJlZHJhd0NoYXJ0cygpOyAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNoYXJ0LnJlZHJhd0NoYXJ0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7Wm9vbUNoYXJ0Q29tbWFuZH0iXX0=