define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ChartRangeHelper = /** @class */ (function () {
        function ChartRangeHelper() {
        }
        ChartRangeHelper.prototype.resetChartRangesX = function (traceChartList) {
            if (traceChartList[0] != undefined) {
                for (var i = 0; i < traceChartList.length; i++) {
                    traceChartList[i].updateChartRangeX();
                }
            }
        };
        ChartRangeHelper.prototype.updateChartRangesY = function (traceChartList) {
            for (var i = 0; i < traceChartList.length; i++) {
                var yAxes = traceChartList[i].getYScales();
                for (var j = 0; j < yAxes.length; j++) {
                    var axisMinValue = traceChartList[i].getSeriesMinYForScale(yAxes[j]);
                    var axisMaxValue = traceChartList[i].getSeriesMaxYForScale(yAxes[j]);
                    if (axisMinValue != undefined && axisMaxValue != undefined) {
                        traceChartList[i].updateRangeY(yAxes[j], axisMinValue, axisMaxValue);
                    }
                }
            }
        };
        ChartRangeHelper.prototype.getAxisOffset = function (axisRange, axisPixelRange) {
            var offset = 0;
            offset = (axisRange / axisPixelRange) * 10;
            return offset;
        };
        ChartRangeHelper.prototype.getAxisOffsetForStraightLines = function (lineValue) {
            if (lineValue == 0) {
                return 1;
            }
            return Math.abs(lineValue) * 0.1;
        };
        return ChartRangeHelper;
    }());
    exports.ChartRangeHelper = ChartRangeHelper;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRSYW5nZUhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jaGFydFZpZXdXaWRnZXQvaGVscGVycy9jaGFydFJhbmdlSGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUdBO1FBQUE7UUF5Q0EsQ0FBQztRQXRDRyw0Q0FBaUIsR0FBakIsVUFBa0IsY0FBNkI7WUFDM0MsSUFBSSxjQUFjLENBQUMsQ0FBQyxDQUFDLElBQUksU0FBUyxFQUFFO2dCQUNoQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDNUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixFQUFFLENBQUM7aUJBQ3pDO2FBQ0o7UUFDTCxDQUFDO1FBRUQsNkNBQWtCLEdBQWxCLFVBQW1CLGNBQThCO1lBQzdDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUM1QyxJQUFJLEtBQUssR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQzNDLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO29CQUNqQyxJQUFJLFlBQVksR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3JFLElBQUksWUFBWSxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFckUsSUFBRyxZQUFZLElBQUksU0FBUyxJQUFJLFlBQVksSUFBSSxTQUFTLEVBQUM7d0JBQ3RELGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQztxQkFDeEU7aUJBQ0o7YUFDSjtRQUVMLENBQUM7UUFFRCx3Q0FBYSxHQUFiLFVBQWMsU0FBaUIsRUFBRSxjQUFzQjtZQUNuRCxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDZixNQUFNLEdBQUcsQ0FBQyxTQUFTLEdBQUcsY0FBYyxDQUFDLEdBQUcsRUFBRSxDQUFBO1lBRTFDLE9BQU8sTUFBTSxDQUFDO1FBQ2xCLENBQUM7UUFFRCx3REFBNkIsR0FBN0IsVUFBOEIsU0FBaUI7WUFDM0MsSUFBRyxTQUFTLElBQUksQ0FBQyxFQUFDO2dCQUNkLE9BQU8sQ0FBQyxDQUFBO2FBQ1g7WUFDRCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3JDLENBQUM7UUFHTCx1QkFBQztJQUFELENBQUMsQUF6Q0QsSUF5Q0M7SUFFTyw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJVHJhY2VDaGFydCB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3RyYWNlQ2hhcnRJbnRlcmZhY2VcIjtcclxuXHJcblxyXG5jbGFzcyBDaGFydFJhbmdlSGVscGVye1xyXG5cclxuXHJcbiAgICByZXNldENoYXJ0UmFuZ2VzWCh0cmFjZUNoYXJ0TGlzdDogSVRyYWNlQ2hhcnRbXSl7XHJcbiAgICAgICAgaWYgKHRyYWNlQ2hhcnRMaXN0WzBdICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRyYWNlQ2hhcnRMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0cmFjZUNoYXJ0TGlzdFtpXS51cGRhdGVDaGFydFJhbmdlWCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUNoYXJ0UmFuZ2VzWSh0cmFjZUNoYXJ0TGlzdCA6IElUcmFjZUNoYXJ0W10pe1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJhY2VDaGFydExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHlBeGVzID0gdHJhY2VDaGFydExpc3RbaV0uZ2V0WVNjYWxlcygpO1xyXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgeUF4ZXMubGVuZ3RoOyBqKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IGF4aXNNaW5WYWx1ZSA9IHRyYWNlQ2hhcnRMaXN0W2ldLmdldFNlcmllc01pbllGb3JTY2FsZSh5QXhlc1tqXSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgYXhpc01heFZhbHVlID0gdHJhY2VDaGFydExpc3RbaV0uZ2V0U2VyaWVzTWF4WUZvclNjYWxlKHlBeGVzW2pdKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihheGlzTWluVmFsdWUgIT0gdW5kZWZpbmVkICYmIGF4aXNNYXhWYWx1ZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRyYWNlQ2hhcnRMaXN0W2ldLnVwZGF0ZVJhbmdlWSh5QXhlc1tqXSwgYXhpc01pblZhbHVlLCBheGlzTWF4VmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXRBeGlzT2Zmc2V0KGF4aXNSYW5nZTogbnVtYmVyLCBheGlzUGl4ZWxSYW5nZTogbnVtYmVyKSA6IG51bWJlcntcclxuICAgICAgICBsZXQgb2Zmc2V0ID0gMDtcclxuICAgICAgICBvZmZzZXQgPSAoYXhpc1JhbmdlIC8gYXhpc1BpeGVsUmFuZ2UpICogMTBcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gb2Zmc2V0O1xyXG4gICAgfVxyXG5cclxuICAgIGdldEF4aXNPZmZzZXRGb3JTdHJhaWdodExpbmVzKGxpbmVWYWx1ZTogbnVtYmVyKTogbnVtYmVye1xyXG4gICAgICAgIGlmKGxpbmVWYWx1ZSA9PSAwKXtcclxuICAgICAgICAgICAgcmV0dXJuIDFcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIE1hdGguYWJzKGxpbmVWYWx1ZSkgKiAwLjE7XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG5cclxuZXhwb3J0IHtDaGFydFJhbmdlSGVscGVyfTsiXX0=