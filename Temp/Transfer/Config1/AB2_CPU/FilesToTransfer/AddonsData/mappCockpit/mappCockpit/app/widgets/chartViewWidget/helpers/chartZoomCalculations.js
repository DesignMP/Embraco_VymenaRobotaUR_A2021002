define(["require", "exports", "../../../core/interfaces/components/ui/chart/chartInterface"], function (require, exports, chartInterface_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ChartZoomCalculations = /** @class */ (function () {
        function ChartZoomCalculations() {
        }
        ChartZoomCalculations.prototype.calculateAxisZoomRanges = function (traceChart, chartAxisY, zoomStep, mouseX, mouseY) {
            var axisMin = Big(chartAxisY.getAxisRange().min);
            var axisMax = Big(chartAxisY.getAxisRange().max);
            var axisRange = axisMax.minus(axisMin);
            var chartCoordinate = traceChart.getChartCoordinateFromPixel(traceChart.primaryXAxisName, chartAxisY.getAxisID(), mouseX, mouseY);
            var axisValue;
            if (chartAxisY.getAxisOrientation() == chartInterface_1.AxisOrientation.horizontal) {
                axisValue = Big(chartCoordinate.x);
            }
            else {
                axisValue = Big(chartCoordinate.y);
            }
            if (axisValue != undefined) {
                var axisValuePercentage = (axisValue.minus(axisMin)).div(axisRange);
                var newAxisRange = axisRange.times(zoomStep);
                var newAxisMin = Big(axisValue.minus(newAxisRange.times(axisValuePercentage)));
                var newAxisMax = newAxisMin.plus(newAxisRange);
                var newAxisMinNumber = Number(newAxisMin.toString());
                var newAxisMaxNumber = Number(newAxisMax.toString());
                return [newAxisMinNumber, newAxisMaxNumber];
            }
            else {
                console.error("axis value not defined");
                var newAxisMinNumber = Number(axisMin.toString());
                var newAxisMaxNumber = Number(axisMax.toString());
                return [newAxisMinNumber, newAxisMaxNumber];
            }
        };
        return ChartZoomCalculations;
    }());
    exports.ChartZoomCalculations = ChartZoomCalculations;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRab29tQ2FsY3VsYXRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0Vmlld1dpZGdldC9oZWxwZXJzL2NoYXJ0Wm9vbUNhbGN1bGF0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFHQTtRQUFBO1FBNkNBLENBQUM7UUEzQ0csdURBQXVCLEdBQXZCLFVBQXdCLFVBQXdCLEVBQUUsVUFBdUIsRUFBRSxRQUFpQixFQUFFLE1BQU0sRUFBRSxNQUFNO1lBR3hHLElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakQsSUFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqRCxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRXZDLElBQUksZUFBZSxHQUFHLFVBQVUsQ0FBQywyQkFBMkIsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLEVBQUUsVUFBVSxDQUFDLFNBQVMsRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztZQUVsSSxJQUFJLFNBQVMsQ0FBQztZQUNkLElBQUcsVUFBVSxDQUFDLGtCQUFrQixFQUFFLElBQUksZ0NBQWUsQ0FBQyxVQUFVLEVBQUM7Z0JBQzdELFNBQVMsR0FBRyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3RDO2lCQUNHO2dCQUNBLFNBQVMsR0FBRyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3RDO1lBRUQsSUFBRyxTQUFTLElBQUksU0FBUyxFQUFDO2dCQUN0QixJQUFJLG1CQUFtQixHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDcEUsSUFBSSxZQUFZLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFFN0MsSUFBSSxVQUFVLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0UsSUFBSSxVQUFVLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFFL0MsSUFBSSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7Z0JBQ3JELElBQUksZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2dCQUVyRCxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQzthQUMvQztpQkFFRztnQkFDQSxPQUFPLENBQUMsS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUM7Z0JBRXhDLElBQUksZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2dCQUNsRCxJQUFJLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDbEQsT0FBTyxDQUFDLGdCQUFnQixFQUFDLGdCQUFnQixDQUFDLENBQUM7YUFDOUM7UUFFTCxDQUFDO1FBS0wsNEJBQUM7SUFBRCxDQUFDLEFBN0NELElBNkNDO0lBRU8sc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVRyYWNlQ2hhcnQgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy90cmFjZUNoYXJ0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElDaGFydEF4aXMgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9pbnRlcmZhY2VzL2NvbXBvbmVudHMvdWkvY2hhcnQvQ2hhcnRBeGlzSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEF4aXNPcmllbnRhdGlvbiB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2ludGVyZmFjZXMvY29tcG9uZW50cy91aS9jaGFydC9jaGFydEludGVyZmFjZVwiO1xyXG5jbGFzcyBDaGFydFpvb21DYWxjdWxhdGlvbnN7XHJcblxyXG4gICAgY2FsY3VsYXRlQXhpc1pvb21SYW5nZXModHJhY2VDaGFydCA6IElUcmFjZUNoYXJ0LCBjaGFydEF4aXNZIDogSUNoYXJ0QXhpcywgem9vbVN0ZXAgOiBudW1iZXIsIG1vdXNlWCwgbW91c2VZKXtcclxuXHJcbiAgICAgXHJcbiAgICAgICAgbGV0IGF4aXNNaW4gPSBCaWcoY2hhcnRBeGlzWS5nZXRBeGlzUmFuZ2UoKS5taW4pO1xyXG4gICAgICAgIGxldCBheGlzTWF4ID0gQmlnKGNoYXJ0QXhpc1kuZ2V0QXhpc1JhbmdlKCkubWF4KTtcclxuICAgICAgICBsZXQgYXhpc1JhbmdlID0gYXhpc01heC5taW51cyhheGlzTWluKTtcclxuXHJcbiAgICAgICAgbGV0IGNoYXJ0Q29vcmRpbmF0ZSA9IHRyYWNlQ2hhcnQuZ2V0Q2hhcnRDb29yZGluYXRlRnJvbVBpeGVsKHRyYWNlQ2hhcnQucHJpbWFyeVhBeGlzTmFtZSwgY2hhcnRBeGlzWS5nZXRBeGlzSUQoKSwgbW91c2VYLCBtb3VzZVkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBheGlzVmFsdWU7IFxyXG4gICAgICAgIGlmKGNoYXJ0QXhpc1kuZ2V0QXhpc09yaWVudGF0aW9uKCkgPT0gQXhpc09yaWVudGF0aW9uLmhvcml6b250YWwpe1xyXG4gICAgICAgICAgICBheGlzVmFsdWUgPSBCaWcoY2hhcnRDb29yZGluYXRlLngpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBheGlzVmFsdWUgPSBCaWcoY2hhcnRDb29yZGluYXRlLnkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoYXhpc1ZhbHVlICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGxldCBheGlzVmFsdWVQZXJjZW50YWdlID0gKGF4aXNWYWx1ZS5taW51cyhheGlzTWluKSkuZGl2KGF4aXNSYW5nZSk7XHJcbiAgICAgICAgICAgIGxldCBuZXdBeGlzUmFuZ2UgPSBheGlzUmFuZ2UudGltZXMoem9vbVN0ZXApO1xyXG5cclxuICAgICAgICAgICAgbGV0IG5ld0F4aXNNaW4gPSBCaWcoYXhpc1ZhbHVlLm1pbnVzKG5ld0F4aXNSYW5nZS50aW1lcyhheGlzVmFsdWVQZXJjZW50YWdlKSkpO1xyXG4gICAgICAgICAgICBsZXQgbmV3QXhpc01heCA9IG5ld0F4aXNNaW4ucGx1cyhuZXdBeGlzUmFuZ2UpO1xyXG5cclxuICAgICAgICAgICAgbGV0IG5ld0F4aXNNaW5OdW1iZXIgPSBOdW1iZXIobmV3QXhpc01pbi50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgbGV0IG5ld0F4aXNNYXhOdW1iZXIgPSBOdW1iZXIobmV3QXhpc01heC50b1N0cmluZygpKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBbbmV3QXhpc01pbk51bWJlciwgbmV3QXhpc01heE51bWJlcl07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiYXhpcyB2YWx1ZSBub3QgZGVmaW5lZFwiKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBuZXdBeGlzTWluTnVtYmVyID0gTnVtYmVyKGF4aXNNaW4udG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgIGxldCBuZXdBeGlzTWF4TnVtYmVyID0gTnVtYmVyKGF4aXNNYXgudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgIHJldHVybiBbbmV3QXhpc01pbk51bWJlcixuZXdBeGlzTWF4TnVtYmVyXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxufVxyXG5cclxuZXhwb3J0IHtDaGFydFpvb21DYWxjdWxhdGlvbnN9Il19