var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
define(["require", "exports", "../../../core/interfaces/components/ui/chart/chartInterface", "./SFChartAxis", "../helpers/chartLabelFormater", "../../../models/common/point", "../../chartViewWidget/chartViewWidget", "../userInteraction/userInteractionController", "../ChartBase", "../helpers/chartRangeHelper"], function (require, exports, chartInterface_1, SFChartAxis_1, chartLabelFormater_1, point_1, chartViewWidget_1, userInteractionController_1, ChartBase_1, chartRangeHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var spaceChartRightHandSide = 15;
    var SFChartWrapper = /** @class */ (function () {
        function SFChartWrapper(containerId, defaultScale, nameScaleX) {
            this.prevPanningCoords = {
                'x': undefined,
                'y': undefined
            };
            this._SFChart = this.initializeSFChart(containerId, defaultScale, nameScaleX);
            this.addTextMeasurementCanvas();
            this.eventAxisRangeChanged = new chartInterface_1.EventAxisRangeChanged();
            this.eventMouseAction = new chartInterface_1.EventMouseAction();
            this.eventMouseWheel = new chartInterface_1.EventMouseWheel();
            this.addEventListenersToChart();
        }
        /**
         * Initialization of Syncfusion chart
         *
         * @private
         * @memberof ChartBase
         */
        SFChartWrapper.prototype.initializeSFChart = function (containerId, defaultScale, nameScaleX) {
            var chartSettings = {};
            chartSettings = __assign(__assign(__assign(__assign({ enableCanvasRendering: true }, this.getSFChartSeriesSettings()), this.getSFChartScaleSettings(defaultScale, nameScaleX)), { zooming: { enable: true, enableMouseWheel: false, type: "XY", enableScrollbar: false, toolbarItems: [""] }, crosshair: { visible: false, type: 'crosshair', line: { color: "black" } }, legend: { visible: false, enableScrollbar: false } }), this.getSFChartEventHandlers());
            $(containerId).ejChart(chartSettings);
            var SFChartInstance = $(containerId).ejChart("instance"); // as ej.datavisualization.Chart;
            SFChartInstance.maxLabelWidth = 55;
            return SFChartInstance;
        };
        /**
        *
        *
        * @private
        * @returns {{}}
        * @memberof ChartBase
        */
        SFChartWrapper.prototype.getSFChartSeriesSettings = function () {
            return {
                series: [{
                        name: 'Series1',
                        type: 'line',
                        xName: "x",
                        yName: "y",
                    },
                    {
                        type: 'line',
                        xName: "x",
                        yName: "y",
                        yAxisName: "yAxis1",
                    }],
            };
        };
        /**
      *
      *
      * @private
      * @returns {{}}
      * @memberof ChartBase
      */
        SFChartWrapper.prototype.getSFChartScaleSettings = function (defaultScale, nameScaleX) {
            return {
                primaryXAxis: {
                    name: nameScaleX,
                    crosshairLabel: { visible: true, trackballTooltipSettings: { border: { width: 10 } } },
                    labelFormat: 'n3',
                    labelPlacement: 'onticks',
                    scrollbarSettings: {
                        visible: false,
                        canResize: false,
                    },
                    labelIntersectAction: "Hide",
                    range: { min: defaultScale.minXValue, max: defaultScale.maxXValue }
                },
                primaryYAxis: {
                    name: defaultScale.id,
                    crosshairLabel: { visible: true },
                    enableAutoIntervalOnZooming: true,
                    labelFormat: "n3",
                    maximumLabelWidth: 60,
                    labelIntersectAction: "Hide",
                    range: { min: defaultScale.minYValue, max: defaultScale.maxYValue }
                },
            };
        };
        /**
        *
        *
        * @private
        * @returns {{}}
        * @memberof ChartBase
        */
        SFChartWrapper.prototype.getSFChartEventHandlers = function () {
            var _this = this;
            return {
                zoomed: function (args) { _this.onChartZoomed(args); },
                axesLabelRendering: function (args) { _this.onAxesLabelRendering(args); },
            };
        };
        /**
        *
        *
        * @private
        * @memberof ChartBase
        */
        SFChartWrapper.prototype.addEventListenersToChart = function () {
            var _this = this;
            this._SFChart._on(this._SFChart.element, "mousewheel", function (args) { return _this.onChartMouseWheel(args); });
            this._SFChart._on(this._SFChart.element, "mousedown", function (args) { return _this.onChartMouseDown(args); });
            this._SFChart._on(this._SFChart.element, "mouseup", function (args) { return _this.onChartMouseUp(args); });
            this._SFChart._on(this._SFChart.element, "mousemove", function (args) { return _this.onChartMouseMove(args); });
        };
        SFChartWrapper.prototype.onChartMouseDown = function (args) {
            var chartObjectUnderMouse = this.getChartObjectUnderMouse(this._SFChart.mousemoveX, this._SFChart.mousemoveY);
            if (chartObjectUnderMouse.args.axis != undefined) {
                this.mouseDownAxis = chartObjectUnderMouse.args.axis.name;
            }
            var mouseDownArgs = new chartInterface_1.EventMouseArgs(userInteractionController_1.MouseActionType.mouseDown, new point_1.Point(this._SFChart.mousemoveX, this._SFChart.mousemoveY), args.objectUnderMouse);
            this.eventMouseAction.raise(this, mouseDownArgs);
        };
        SFChartWrapper.prototype.onChartMouseUp = function (args) {
            this.mouseDownAxis = undefined;
            var mouseUpArgs = new chartInterface_1.EventMouseArgs(userInteractionController_1.MouseActionType.mouseUp, new point_1.Point(this._SFChart.mousemoveX, this._SFChart.mousemoveY), args.objectUnderMouse);
            this.eventMouseAction.raise(this, mouseUpArgs);
        };
        SFChartWrapper.prototype.onChartMouseMove = function (args) {
            /*if(this.mouseDownAxis != undefined){
                this._SFChart.activePanningAxes = [this.getChartAxisByName(this.mouseDownAxis)]
                this.doPanning(this._SFChart.mousemoveX, this._SFChart.mousemoveY);
                this.redraw();
            }*/
            var mouseMoveArgs = new chartInterface_1.EventMouseArgs(userInteractionController_1.MouseActionType.mouseMove, new point_1.Point(this._SFChart.mousemoveX, this._SFChart.mousemoveY), args.objectUnderMouse);
            this.eventMouseAction.raise(this, mouseMoveArgs);
        };
        SFChartWrapper.prototype.onChartMouseWheel = function (args) {
            var mouseWheelArgs = new chartInterface_1.EventMouseWheelArgs(new point_1.Point(this._SFChart.mousemoveX, this._SFChart.mousemoveY), args.objectUnderMouse, args.originalEvent.wheelDelta);
            this.eventMouseWheel.raise(this, mouseWheelArgs);
        };
        /**
      * Sets scale ranges after boxZoom accordingy to zooming position and factor; sets zp and zf to 0/1
      *
      * @protected
      * @param {*} args
      * @memberof ChartBase
      */
        SFChartWrapper.prototype.onChartZoomed = function (args) {
            //let yScales = this.getYScales();
            var chartAxes = args.model._axes;
            var xAxisZoomCanceled = false;
            for (var _i = 0, chartAxes_1 = chartAxes; _i < chartAxes_1.length; _i++) {
                var currentChartAxis = chartAxes_1[_i];
                var minVal = currentChartAxis.visibleRange.min;
                var maxVal = currentChartAxis.visibleRange.max;
                //limit the axis range to Precision 11 to prevent syncfusion chart from failing
                if (maxVal.toPrecision(11) - minVal.toPrecision(11) > chartRangeHelper_1.SF_axisResolution) {
                    var axis_1 = this.getAxis(currentChartAxis.name);
                    if (axis_1 != undefined) {
                        axis_1.setAxisRange({ min: minVal, max: maxVal }, false, false);
                    }
                }
                else {
                    if (currentChartAxis.orientation == "horizontal") {
                        xAxisZoomCanceled = true;
                    }
                }
                currentChartAxis.zoomPosition = 0;
                currentChartAxis.zoomFactor = 1;
            }
            var axis = this.getAxis(chartAxes[0].name);
            if (axis != undefined && xAxisZoomCanceled == false) {
                axis.setAxisRange(axis.getAxisRange(), false, true);
            }
            this._SFChart.zoomed = false;
        };
        SFChartWrapper.prototype.redraw = function () {
            this._SFChart.redraw();
        };
        SFChartWrapper.prototype.resize = function (height, width) {
            this._SFChart.option("size", { height: String(height), width: String(width - spaceChartRightHandSide) });
        };
        /**
       * Sets zoomAxes
       *
       * @param {ZoomDirection} zoomAxes
       * @memberof ChartBase
       */
        SFChartWrapper.prototype.setZoomDirection = function (zoomAxes) {
            this._SFChart.model.zooming.type = chartViewWidget_1.ZoomDirection[zoomAxes];
        };
        /**
        * Enables box zooming
        *
        * @param {boolean} enable
        * @memberof ChartBase
        */
        SFChartWrapper.prototype.enableBoxZoom = function (enable) {
            this._SFChart.model.zooming.enable = enable;
        };
        /**
         * Enables panning
         *
         * @param {boolean} enable
         * @memberof ChartBase
         */
        SFChartWrapper.prototype.enablePanning = function (enable) {
            this._SFChart.panning = enable;
        };
        SFChartWrapper.prototype.setPanningAxes = function (axes) {
            this._SFChart.activePanningAxes = axes;
        };
        /**
         * Adds an invisible Canvas which is used to measure label width
         *
         * @private
         * @memberof ChartBase
         */
        SFChartWrapper.prototype.addTextMeasurementCanvas = function () {
            var id = this._SFChart.chartContainer[0].id;
            var t = $("#" + id);
            t.append('<canvas id="' + id + '_' + "textMaesurementCanvas" + '" style="z-index: -5; position:absolute"> </canvas>');
        };
        /**
       *
       *
       * @private
       * @param {*} args
       * @memberof ChartBase
       */
        SFChartWrapper.prototype.onAxesLabelRendering = function (args) {
            if (this._SFChart != undefined) {
                var id = this._SFChart.chartContainer[0].id;
                var textMaesurementCanvas = document.getElementById(id + '_' + "textMaesurementCanvas");
                if (textMaesurementCanvas) {
                    var context = textMaesurementCanvas.getContext("2d");
                    var number = args.data.label["Value"];
                    var interval = args.data.axis.visibleRange.interval;
                    if (args.data.axis.orientation == "horizontal") {
                        // XAxis(time)
                        args.data.label["Text"] = chartLabelFormater_1.ChartLabelFormater.getXAxisLabelText(number, context, interval);
                    }
                    else {
                        // YAxis
                        args.data.label["Text"] = chartLabelFormater_1.ChartLabelFormater.getYAxisLabelText(number, context, interval);
                    }
                }
            }
        };
        SFChartWrapper.prototype.getChartArea = function () {
            return { x: this._SFChart.canvasX, y: this._SFChart.canvasY, width: this._SFChart.canvasWidth, height: this._SFChart.canvasHeight };
        };
        SFChartWrapper.prototype.setChartArea = function (chartArea) {
            this._SFChart.model.margin.left = chartArea.x - 71;
            this._SFChart.model.margin.top = chartArea.y - 10;
            var numbrOfYAxis = this._SFChart.model._axes.length - 2;
            this._SFChart.model.margin.right = this._SFChart.model.width - (chartArea.x + chartArea.width) - 10 - (numbrOfYAxis * 71);
            this._SFChart.model.margin.bottom = this._SFChart.model.height - ((chartArea.y) + chartArea.height) - 31;
        };
        SFChartWrapper.prototype.getAxis = function (axisID) {
            var axis = this.getChartAxisByName(axisID);
            if (axis != undefined) {
                return new SFChartAxis_1.SFChartAxis(axis, this.eventAxisRangeChanged, this);
            }
            else {
                return undefined;
            }
        };
        /**
        * Get axis with a given name
        *
        * @param {string} axisName
        * @returns {*}
        * @memberof ChartBase
        */
        SFChartWrapper.prototype.getChartAxisByName = function (axisName) {
            var axes = this._SFChart.model._axes;
            for (var i = 0; i < axes.length; i++) {
                if (axes[i].name == axisName) {
                    return axes[i];
                }
            }
        };
        SFChartWrapper.prototype.doPanning = function (pageX, pageY) {
            if (this.prevPanningCoords.x != undefined) {
                var oDelta = void 0;
                oDelta = {
                    'x': this.prevPanningCoords.x - pageX,
                    'y': this.prevPanningCoords.y - pageY
                };
                this.prevPanningCoords = {
                    'x': pageX,
                    'y': pageY
                };
                for (var i = 0; i < this._SFChart.activePanningAxes.length; i++) {
                    var axis = this.getChartAxisByName(this._SFChart.activePanningAxes[i].getAxisID());
                    for (var j = 0; j < this._SFChart.model._axes.length; j++) {
                        if (axis.name == this._SFChart.model._axes[j].name) {
                            axis = this._SFChart.model._axes[j];
                        }
                    }
                    var delta = void 0;
                    if (axis.orientation == "horizontal") {
                        delta = ((Big(axis.visibleRange.max).minus(Big(axis.visibleRange.min))).div(Big(axis.width))).times(Big(oDelta.x));
                        var deltaNmbr = Number(delta.toString());
                        if (axis != undefined) {
                            this.getAxis(axis.name).setAxisRange({ min: axis.visibleRange.min + deltaNmbr, max: axis.visibleRange.max + deltaNmbr });
                        }
                    }
                    else {
                        if (axis != undefined) {
                            delta = ((Big(axis.visibleRange.max).minus(Big(axis.visibleRange.min))).div(Big(axis.height))).times(Big(oDelta.y));
                            var deltaNmbr = Number(delta.toString());
                            deltaNmbr = deltaNmbr * -1;
                            this.getAxis(axis.name).setAxisRange({ min: axis.visibleRange.min + deltaNmbr, max: axis.visibleRange.max + deltaNmbr });
                        }
                    }
                }
            }
            else {
                this.prevPanningCoords = {
                    'x': pageX,
                    'y': pageY
                };
            }
        };
        SFChartWrapper.prototype.addYAxis = function (axisName, axisMin, axisMax, position) {
            var currentAxes = this._SFChart.option("axes");
            var opposedPosition = false;
            if (position == chartInterface_1.AxisPosition.right) {
                opposedPosition = true;
                ;
            }
            currentAxes.push({
                name: axisName,
                opposedPosition: opposedPosition,
                majorGridLines: { visible: false },
                range: { min: axisMin, max: axisMax },
                orientation: "vertical"
            });
            this._SFChart.option("axes", currentAxes);
            if (this._SFChart.model.axes.length == 1) {
                this._SFChart.model.margin.right = 10;
            }
        };
        SFChartWrapper.prototype.removeYAxis = function (axisName) {
            //TODO: Update so it works for more than 2 axis
            var index;
            for (var i = 0; i < this._SFChart.model.axes.length; i++) {
                if (this._SFChart.model.axes[i].name === axisName) {
                    index = i;
                    break;
                }
            }
            if (index > -1) {
                this._SFChart.model.axes.splice(index, 1);
            }
            else if (this._SFChart.model.axes.length > 0) {
                this._SFChart.model.primaryYAxis = this._SFChart.model.axes[0];
                this._SFChart.model.primaryYAxis.majorGridLines.visible = true;
                this._SFChart.model.primaryYAxis.opposedPosition = false;
                this._SFChart.model.axes = [];
            }
            if (this._SFChart.model.axes.length == 0) {
                this._SFChart.model.margin.right = 10;
            }
        };
        SFChartWrapper.prototype.setYAxisOffset = function (numberOfAxes) {
            if (numberOfAxes > 0) {
                this._SFChart.model.margin.right = 10 + (71 * numberOfAxes);
            }
            else {
                this._SFChart.model.margin.right = 10;
            }
        };
        SFChartWrapper.prototype.getChartObjectUnderMouse = function (mouseX, mouseY) {
            var chartObjectUnderMouse = new ChartBase_1.ChartObjectInformation(ChartBase_1.ChartObjectType.emptySpace, {});
            var axisBounds = Array();
            for (var i = 0; i < this._SFChart.model._axes.length; i++) {
                axisBounds.push(this.getAxis(this._SFChart.model._axes[i].name).getAxisBounds());
            }
            for (var i = 0; i < axisBounds.length; i++) {
                if ((mouseX - axisBounds[i].x) < (axisBounds[i].width) && mouseX > axisBounds[i].x) {
                    if ((mouseY - axisBounds[i].y) < (axisBounds[i].height) && mouseY > axisBounds[i].y) {
                        chartObjectUnderMouse = new ChartBase_1.ChartObjectInformation(ChartBase_1.ChartObjectType.axis, { axis: axisBounds[i].axis });
                    }
                }
            }
            return chartObjectUnderMouse;
        };
        return SFChartWrapper;
    }());
    exports.SFChartWrapper = SFChartWrapper;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZDaGFydFdyYXBwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY2hhcnRXaWRnZXQvY2hhcnRXcmFwcGVyL1NGQ2hhcnRXcmFwcGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBY0EsSUFBTSx1QkFBdUIsR0FBVyxFQUFFLENBQUM7SUFHM0M7UUFjSSx3QkFBWSxXQUFtQixFQUFFLFlBQW9CLEVBQUUsVUFBa0I7WUFMbEUsc0JBQWlCLEdBQUc7Z0JBQ3ZCLEdBQUcsRUFBRSxTQUFTO2dCQUNkLEdBQUcsRUFBRSxTQUFTO2FBQ2pCLENBQUE7WUFHRyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQzlFLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1lBRWhDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLHNDQUFxQixFQUFFLENBQUM7WUFDekQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksaUNBQWdCLEVBQUUsQ0FBQztZQUMvQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksZ0NBQWUsRUFBRSxDQUFDO1lBRzdDLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1FBQ3BDLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNLLDBDQUFpQixHQUF6QixVQUEwQixXQUFtQixFQUFFLFlBQW9CLEVBQUUsVUFBa0I7WUFFbkYsSUFBSSxhQUFhLEdBQUcsRUFBRSxDQUFBO1lBQ3RCLGFBQWEseUNBQ1QscUJBQXFCLEVBQUUsSUFBSSxJQUV4QixJQUFJLENBQUMsd0JBQXdCLEVBQUUsR0FDL0IsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsS0FFekQsT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxL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QUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUM7b0JBQzlFLElBQUcsQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLE1BQU0sR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDO3dCQUMvRSxxQkFBcUIsR0FBRyxJQUFJLGtDQUFzQixDQUFDLDJCQUFlLENBQUMsSUFBSSxFQUFFLEVBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDO3FCQUN4RztpQkFDSjthQUNKO1lBRUQsT0FBTyxxQkFBcUIsQ0FBQztRQUNqQyxDQUFDO1FBRUwscUJBQUM7SUFBRCxDQUFDLEFBbmVELElBbWVDO0lBRU8sd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTY2FsZSB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL3NjYWxlXCI7XHJcbmltcG9ydCB7IElDaGFydCwgRXZlbnRBeGlzUmFuZ2VDaGFuZ2VkLCBFdmVudE1vdXNlQWN0aW9uLCBFdmVudE1vdXNlQXJncywgRXZlbnRNb3VzZVdoZWVsLCBFdmVudE1vdXNlV2hlZWxBcmdzLCBBeGlzUG9zaXRpb259IGZyb20gXCIuLi8uLi8uLi9jb3JlL2ludGVyZmFjZXMvY29tcG9uZW50cy91aS9jaGFydC9jaGFydEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBBeGlzQm91bmRzIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvdHlwZXMvQXhpc0JvdW5kc1wiO1xyXG5pbXBvcnQgeyBJQ2hhcnRBeGlzIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvaW50ZXJmYWNlcy9jb21wb25lbnRzL3VpL2NoYXJ0L0NoYXJ0QXhpc0ludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTRkNoYXJ0QXhpcyB9IGZyb20gXCIuL1NGQ2hhcnRBeGlzXCI7XHJcbmltcG9ydCB7IFJlY3RhbmdsZSB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3R5cGVzL1JlY3RhbmdsZVwiO1xyXG5pbXBvcnQgeyBDaGFydExhYmVsRm9ybWF0ZXIgfSBmcm9tIFwiLi4vaGVscGVycy9jaGFydExhYmVsRm9ybWF0ZXJcIjtcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2NvbW1vbi9wb2ludFwiO1xyXG5pbXBvcnQgeyBab29tRGlyZWN0aW9uIH0gZnJvbSBcIi4uLy4uL2NoYXJ0Vmlld1dpZGdldC9jaGFydFZpZXdXaWRnZXRcIlxyXG5pbXBvcnQgeyBNb3VzZUFjdGlvblR5cGUgfSBmcm9tIFwiLi4vdXNlckludGVyYWN0aW9uL3VzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXJcIjtcclxuaW1wb3J0IHsgQ2hhcnRPYmplY3RJbmZvcm1hdGlvbiwgQ2hhcnRPYmplY3RUeXBlIH0gZnJvbSBcIi4uL0NoYXJ0QmFzZVwiO1xyXG5pbXBvcnQgeyBTRl9heGlzUmVzb2x1dGlvbiB9IGZyb20gXCIuLi9oZWxwZXJzL2NoYXJ0UmFuZ2VIZWxwZXJcIjtcclxuXHJcblxyXG5jb25zdCBzcGFjZUNoYXJ0UmlnaHRIYW5kU2lkZTogbnVtYmVyID0gMTU7XHJcblxyXG5cclxuY2xhc3MgU0ZDaGFydFdyYXBwZXIgaW1wbGVtZW50cyBJQ2hhcnR7XHJcbiAgICBfU0ZDaGFydC8vOiBlai5kYXRhdmlzdWFsaXphdGlvbi5DaGFydDtcclxuICAgIGV2ZW50QXhpc1JhbmdlQ2hhbmdlZCA6IEV2ZW50QXhpc1JhbmdlQ2hhbmdlZDtcclxuICAgIGV2ZW50TW91c2VBY3Rpb24gOiBFdmVudE1vdXNlQWN0aW9uO1xyXG4gICAgZXZlbnRNb3VzZVdoZWVsOiBFdmVudE1vdXNlV2hlZWw7XHJcblxyXG5cclxuICAgIHByaXZhdGUgbW91c2VEb3duQXhpcztcclxuXHJcbiAgICBwdWJsaWMgcHJldlBhbm5pbmdDb29yZHMgPSB7XHJcbiAgICAgICAgJ3gnOiB1bmRlZmluZWQsXHJcbiAgICAgICAgJ3knOiB1bmRlZmluZWRcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXJJZDogc3RyaW5nLCBkZWZhdWx0U2NhbGUgOiBTY2FsZSwgbmFtZVNjYWxlWDogc3RyaW5nKXtcclxuICAgICAgICB0aGlzLl9TRkNoYXJ0ID0gdGhpcy5pbml0aWFsaXplU0ZDaGFydChjb250YWluZXJJZCwgZGVmYXVsdFNjYWxlLCBuYW1lU2NhbGVYKTtcclxuICAgICAgICB0aGlzLmFkZFRleHRNZWFzdXJlbWVudENhbnZhcygpO1xyXG5cclxuICAgICAgICB0aGlzLmV2ZW50QXhpc1JhbmdlQ2hhbmdlZCA9IG5ldyBFdmVudEF4aXNSYW5nZUNoYW5nZWQoKTtcclxuICAgICAgICB0aGlzLmV2ZW50TW91c2VBY3Rpb24gPSBuZXcgRXZlbnRNb3VzZUFjdGlvbigpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRNb3VzZVdoZWVsID0gbmV3IEV2ZW50TW91c2VXaGVlbCgpO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyc1RvQ2hhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemF0aW9uIG9mIFN5bmNmdXNpb24gY2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGluaXRpYWxpemVTRkNoYXJ0KGNvbnRhaW5lcklkOiBzdHJpbmcsIGRlZmF1bHRTY2FsZSA6IFNjYWxlLCBuYW1lU2NhbGVYOiBzdHJpbmcpIDogZWouZGF0YXZpc3VhbGl6YXRpb24uQ2hhcnR7XHJcblxyXG4gICAgICAgIGxldCBjaGFydFNldHRpbmdzID0ge31cclxuICAgICAgICBjaGFydFNldHRpbmdzID0ge1xyXG4gICAgICAgICAgICBlbmFibGVDYW52YXNSZW5kZXJpbmc6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAuLi50aGlzLmdldFNGQ2hhcnRTZXJpZXNTZXR0aW5ncygpLFxyXG4gICAgICAgICAgICAuLi50aGlzLmdldFNGQ2hhcnRTY2FsZVNldHRpbmdzKGRlZmF1bHRTY2FsZSwgbmFtZVNjYWxlWCksXHJcblxyXG4gICAgICAgICAgICB6b29taW5nOiB7IGVuYWJsZTogdHJ1ZSwgZW5hYmxlTW91c2VXaGVlbDogZmFsc2UsIHR5cGU6IFwiWFlcIiwgZW5hYmxlU2Nyb2xsYmFyOiBmYWxzZSwgdG9vbGJhckl0ZW1zOiBbXCJcIl0gfSxcclxuICAgICAgICAgICAgY3Jvc3NoYWlyOiB7IHZpc2libGU6IGZhbHNlLCB0eXBlOiAnY3Jvc3NoYWlyJywgbGluZTogeyBjb2xvcjogXCJibGFja1wiIH0gfSxcclxuICAgICAgICAgICAgbGVnZW5kOiB7IHZpc2libGU6IGZhbHNlLCBlbmFibGVTY3JvbGxiYXIgOiBmYWxzZX0sXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAuLi50aGlzLmdldFNGQ2hhcnRFdmVudEhhbmRsZXJzKCksXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJChjb250YWluZXJJZCkuZWpDaGFydChjaGFydFNldHRpbmdzKTtcclxuICAgICAgICBsZXQgU0ZDaGFydEluc3RhbmNlID0gJChjb250YWluZXJJZCkuZWpDaGFydChcImluc3RhbmNlXCIpLy8gYXMgZWouZGF0YXZpc3VhbGl6YXRpb24uQ2hhcnQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgU0ZDaGFydEluc3RhbmNlLm1heExhYmVsV2lkdGggPSA1NTtcclxuXHJcblxyXG4gICAgICAgIHJldHVybiBTRkNoYXJ0SW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFNGQ2hhcnRTZXJpZXNTZXR0aW5ncygpIDoge317XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc2VyaWVzOiBbe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ1NlcmllczEnLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2xpbmUnLFxyXG4gICAgICAgICAgICAgICAgeE5hbWU6IFwieFwiLFxyXG4gICAgICAgICAgICAgICAgeU5hbWU6IFwieVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnbGluZScsXHJcbiAgICAgICAgICAgICAgICB4TmFtZTogXCJ4XCIsXHJcbiAgICAgICAgICAgICAgICB5TmFtZTogXCJ5XCIsXHJcbiAgICAgICAgICAgICAgICB5QXhpc05hbWU6IFwieUF4aXMxXCIsXHJcbiAgICAgICAgICAgIH1dLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0U0ZDaGFydFNjYWxlU2V0dGluZ3MoZGVmYXVsdFNjYWxlIDogU2NhbGUsIG5hbWVTY2FsZVg6IHN0cmluZykgOiB7fXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBwcmltYXJ5WEF4aXM6IHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IG5hbWVTY2FsZVgsXHJcbiAgICAgICAgICAgICAgICBjcm9zc2hhaXJMYWJlbDogeyB2aXNpYmxlOiB0cnVlLCB0cmFja2JhbGxUb29sdGlwU2V0dGluZ3M6IHsgYm9yZGVyOiB7IHdpZHRoOiAxMCB9IH0gfSxcclxuICAgICAgICAgICAgICAgIGxhYmVsRm9ybWF0OiAnbjMnLFxyXG4gICAgICAgICAgICAgICAgbGFiZWxQbGFjZW1lbnQ6ICdvbnRpY2tzJyxcclxuICAgICAgICAgICAgICAgIHNjcm9sbGJhclNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FuUmVzaXplOiBmYWxzZSwgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGxhYmVsSW50ZXJzZWN0QWN0aW9uIDogXCJIaWRlXCIsXHJcbiAgICAgICAgICAgICAgICByYW5nZToge21pbjogZGVmYXVsdFNjYWxlLm1pblhWYWx1ZSwgbWF4OiBkZWZhdWx0U2NhbGUubWF4WFZhbHVlfVxyXG5cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcHJpbWFyeVlBeGlzOiB7XHJcbiAgICAgICAgICAgICAgICBuYW1lIDogZGVmYXVsdFNjYWxlLmlkLFxyXG4gICAgICAgICAgICAgICAgY3Jvc3NoYWlyTGFiZWw6IHsgdmlzaWJsZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlQXV0b0ludGVydmFsT25ab29taW5nOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgbGFiZWxGb3JtYXQ6IFwibjNcIixcclxuICAgICAgICAgICAgICAgIG1heGltdW1MYWJlbFdpZHRoIDogNjAsXHJcbiAgICAgICAgICAgICAgICBsYWJlbEludGVyc2VjdEFjdGlvbiA6IFwiSGlkZVwiLFxyXG4gICAgICAgICAgICAgICAgcmFuZ2U6IHttaW46IGRlZmF1bHRTY2FsZS5taW5ZVmFsdWUsIG1heDogZGVmYXVsdFNjYWxlLm1heFlWYWx1ZX1cclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGUgXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0U0ZDaGFydEV2ZW50SGFuZGxlcnMoKSA6IHt9e1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHpvb21lZDogKGFyZ3MpID0+IHt0aGlzLm9uQ2hhcnRab29tZWQoYXJncyl9LFxyXG4gICAgICAgICAgICBheGVzTGFiZWxSZW5kZXJpbmc6IChhcmdzKSA9PiB7dGhpcy5vbkF4ZXNMYWJlbFJlbmRlcmluZyhhcmdzKX0sXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRFdmVudExpc3RlbmVyc1RvQ2hhcnQoKXtcclxuICAgICAgICB0aGlzLl9TRkNoYXJ0Ll9vbih0aGlzLl9TRkNoYXJ0LmVsZW1lbnQsIFwibW91c2V3aGVlbFwiLCAoYXJncykgPT4gdGhpcy5vbkNoYXJ0TW91c2VXaGVlbChhcmdzKSk7XHJcbiAgICAgICAgdGhpcy5fU0ZDaGFydC5fb24odGhpcy5fU0ZDaGFydC5lbGVtZW50LCBcIm1vdXNlZG93blwiLCAoYXJncykgPT4gdGhpcy5vbkNoYXJ0TW91c2VEb3duKGFyZ3MpKTtcclxuICAgICAgICB0aGlzLl9TRkNoYXJ0Ll9vbih0aGlzLl9TRkNoYXJ0LmVsZW1lbnQsIFwibW91c2V1cFwiLCAoYXJncykgPT4gdGhpcy5vbkNoYXJ0TW91c2VVcChhcmdzKSk7XHJcbiAgICAgICAgdGhpcy5fU0ZDaGFydC5fb24odGhpcy5fU0ZDaGFydC5lbGVtZW50LCBcIm1vdXNlbW92ZVwiLCAoYXJncykgPT4gdGhpcy5vbkNoYXJ0TW91c2VNb3ZlKGFyZ3MpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQ2hhcnRNb3VzZURvd24oYXJncyl7XHJcbiAgICAgICAgbGV0IGNoYXJ0T2JqZWN0VW5kZXJNb3VzZSA9IHRoaXMuZ2V0Q2hhcnRPYmplY3RVbmRlck1vdXNlKHRoaXMuX1NGQ2hhcnQubW91c2Vtb3ZlWCwgdGhpcy5fU0ZDaGFydC5tb3VzZW1vdmVZKTtcclxuICAgICAgICBpZihjaGFydE9iamVjdFVuZGVyTW91c2UuYXJncy5heGlzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMubW91c2VEb3duQXhpcyA9IGNoYXJ0T2JqZWN0VW5kZXJNb3VzZS5hcmdzLmF4aXMubmFtZTsgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBtb3VzZURvd25BcmdzIDogRXZlbnRNb3VzZUFyZ3MgPSBuZXcgRXZlbnRNb3VzZUFyZ3MoTW91c2VBY3Rpb25UeXBlLm1vdXNlRG93biwgbmV3IFBvaW50KHRoaXMuX1NGQ2hhcnQubW91c2Vtb3ZlWCwgdGhpcy5fU0ZDaGFydC5tb3VzZW1vdmVZKSwgYXJncy5vYmplY3RVbmRlck1vdXNlKVxyXG4gICAgICAgIHRoaXMuZXZlbnRNb3VzZUFjdGlvbi5yYWlzZSh0aGlzLCBtb3VzZURvd25BcmdzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQ2hhcnRNb3VzZVVwKGFyZ3Mpe1xyXG4gICAgICAgIHRoaXMubW91c2VEb3duQXhpcyA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgbGV0IG1vdXNlVXBBcmdzIDogRXZlbnRNb3VzZUFyZ3MgPSBuZXcgRXZlbnRNb3VzZUFyZ3MoTW91c2VBY3Rpb25UeXBlLm1vdXNlVXAsIG5ldyBQb2ludCh0aGlzLl9TRkNoYXJ0Lm1vdXNlbW92ZVgsIHRoaXMuX1NGQ2hhcnQubW91c2Vtb3ZlWSksIGFyZ3Mub2JqZWN0VW5kZXJNb3VzZSlcclxuICAgICAgICB0aGlzLmV2ZW50TW91c2VBY3Rpb24ucmFpc2UodGhpcywgbW91c2VVcEFyZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DaGFydE1vdXNlTW92ZShhcmdzKXtcclxuICAgICAgICAvKmlmKHRoaXMubW91c2VEb3duQXhpcyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9TRkNoYXJ0LmFjdGl2ZVBhbm5pbmdBeGVzID0gW3RoaXMuZ2V0Q2hhcnRBeGlzQnlOYW1lKHRoaXMubW91c2VEb3duQXhpcyldXHJcbiAgICAgICAgICAgIHRoaXMuZG9QYW5uaW5nKHRoaXMuX1NGQ2hhcnQubW91c2Vtb3ZlWCwgdGhpcy5fU0ZDaGFydC5tb3VzZW1vdmVZKTtcclxuICAgICAgICAgICAgdGhpcy5yZWRyYXcoKTtcclxuICAgICAgICB9Ki9cclxuICAgICAgXHJcblxyXG4gICAgICAgIGxldCBtb3VzZU1vdmVBcmdzIDogRXZlbnRNb3VzZUFyZ3MgPSBuZXcgRXZlbnRNb3VzZUFyZ3MoTW91c2VBY3Rpb25UeXBlLm1vdXNlTW92ZSwgbmV3IFBvaW50KHRoaXMuX1NGQ2hhcnQubW91c2Vtb3ZlWCwgdGhpcy5fU0ZDaGFydC5tb3VzZW1vdmVZKSwgYXJncy5vYmplY3RVbmRlck1vdXNlKVxyXG4gICAgICAgIHRoaXMuZXZlbnRNb3VzZUFjdGlvbi5yYWlzZSh0aGlzLCBtb3VzZU1vdmVBcmdzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQ2hhcnRNb3VzZVdoZWVsKGFyZ3Mpe1xyXG4gICAgICAgIGxldCBtb3VzZVdoZWVsQXJncyA6IEV2ZW50TW91c2VXaGVlbEFyZ3MgPSBuZXcgRXZlbnRNb3VzZVdoZWVsQXJncyhuZXcgUG9pbnQodGhpcy5fU0ZDaGFydC5tb3VzZW1vdmVYLCB0aGlzLl9TRkNoYXJ0Lm1vdXNlbW92ZVkpLCBhcmdzLm9iamVjdFVuZGVyTW91c2UsIGFyZ3Mub3JpZ2luYWxFdmVudC53aGVlbERlbHRhKVxyXG4gICAgICAgIHRoaXMuZXZlbnRNb3VzZVdoZWVsLnJhaXNlKHRoaXMsIG1vdXNlV2hlZWxBcmdzKTtcclxuICAgIH1cclxuXHJcbiAgICAgICAvKipcclxuICAgICAqIFNldHMgc2NhbGUgcmFuZ2VzIGFmdGVyIGJveFpvb20gYWNjb3JkaW5neSB0byB6b29taW5nIHBvc2l0aW9uIGFuZCBmYWN0b3I7IHNldHMgenAgYW5kIHpmIHRvIDAvMVxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgb25DaGFydFpvb21lZChhcmdzKSB7XHJcbiAgICAgICAgLy9sZXQgeVNjYWxlcyA9IHRoaXMuZ2V0WVNjYWxlcygpO1xyXG4gICAgICAgIGxldCBjaGFydEF4ZXMgOiBhbnlbXSA9IGFyZ3MubW9kZWwuX2F4ZXM7XHJcbiAgICAgICAgbGV0IHhBeGlzWm9vbUNhbmNlbGVkID0gZmFsc2U7XHJcbiAgICAgIFxyXG4gICAgICAgIGZvcihsZXQgY3VycmVudENoYXJ0QXhpcyBvZiBjaGFydEF4ZXMpe1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IG1pblZhbCA9ICBjdXJyZW50Q2hhcnRBeGlzLnZpc2libGVSYW5nZS5taW47XHJcbiAgICAgICAgICAgIGxldCBtYXhWYWwgPSAgY3VycmVudENoYXJ0QXhpcy52aXNpYmxlUmFuZ2UubWF4O1xyXG5cclxuICAgICAgICAgICAgLy9saW1pdCB0aGUgYXhpcyByYW5nZSB0byBQcmVjaXNpb24gMTEgdG8gcHJldmVudCBzeW5jZnVzaW9uIGNoYXJ0IGZyb20gZmFpbGluZ1xyXG4gICAgICAgICAgICBpZihtYXhWYWwudG9QcmVjaXNpb24oMTEpIC0gbWluVmFsLnRvUHJlY2lzaW9uKDExKSA+IFNGX2F4aXNSZXNvbHV0aW9uKXtcclxuICAgICAgICAgICAgICAgIGxldCBheGlzID0gdGhpcy5nZXRBeGlzKGN1cnJlbnRDaGFydEF4aXMubmFtZSk7XHJcbiAgICAgICAgICAgICAgICBpZihheGlzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF4aXMuc2V0QXhpc1JhbmdlKHttaW46IG1pblZhbCwgbWF4OiBtYXhWYWx9LGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGlmKGN1cnJlbnRDaGFydEF4aXMub3JpZW50YXRpb24gPT0gXCJob3Jpem9udGFsXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHhBeGlzWm9vbUNhbmNlbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY3VycmVudENoYXJ0QXhpcy56b29tUG9zaXRpb24gPSAwO1xyXG4gICAgICAgICAgICBjdXJyZW50Q2hhcnRBeGlzLnpvb21GYWN0b3IgPSAxO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBheGlzID0gdGhpcy5nZXRBeGlzKGNoYXJ0QXhlc1swXS5uYW1lKTtcclxuICAgICAgICBpZihheGlzICE9IHVuZGVmaW5lZCAmJiB4QXhpc1pvb21DYW5jZWxlZCA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgIGF4aXMuc2V0QXhpc1JhbmdlKGF4aXMuZ2V0QXhpc1JhbmdlKCksIGZhbHNlLCB0cnVlKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBcclxuXHJcbiAgICAgICAgdGhpcy5fU0ZDaGFydC56b29tZWQgPSBmYWxzZTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmVkcmF3KCl7XHJcbiAgICAgICAgdGhpcy5fU0ZDaGFydC5yZWRyYXcoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcmVzaXplKGhlaWdodDogbnVtYmVyLCB3aWR0aDogbnVtYmVyKXtcclxuICAgICAgICB0aGlzLl9TRkNoYXJ0Lm9wdGlvbihcInNpemVcIiwge2hlaWdodDogU3RyaW5nKGhlaWdodCksIHdpZHRoOiBTdHJpbmcod2lkdGggLSBzcGFjZUNoYXJ0UmlnaHRIYW5kU2lkZSl9KTtcclxuICAgIH1cclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICogU2V0cyB6b29tQXhlc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Wm9vbURpcmVjdGlvbn0gem9vbUF4ZXNcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFpvb21EaXJlY3Rpb24oem9vbUF4ZXM6IFpvb21EaXJlY3Rpb24pIHtcclxuICAgICAgICB0aGlzLl9TRkNoYXJ0Lm1vZGVsLnpvb21pbmcudHlwZSA9ICBab29tRGlyZWN0aW9uW3pvb21BeGVzXTtcclxuICAgIH1cclxuXHJcbiAgICAgLyoqXHJcbiAgICAgKiBFbmFibGVzIGJveCB6b29taW5nXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBlbmFibGVcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGVuYWJsZUJveFpvb20oZW5hYmxlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fU0ZDaGFydC5tb2RlbC56b29taW5nLmVuYWJsZSA9IGVuYWJsZTtcclxuICAgIH1cclxuIFxyXG4gICAgIC8qKlxyXG4gICAgICAqIEVuYWJsZXMgcGFubmluZ1xyXG4gICAgICAqXHJcbiAgICAgICogQHBhcmFtIHtib29sZWFufSBlbmFibGVcclxuICAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgICovXHJcbiAgICAgcHVibGljIGVuYWJsZVBhbm5pbmcoZW5hYmxlOiBib29sZWFuKSB7XHJcbiAgICAgICAgIHRoaXMuX1NGQ2hhcnQucGFubmluZyA9IGVuYWJsZTtcclxuICAgICB9XHJcblxyXG5cclxuICAgICBwdWJsaWMgc2V0UGFubmluZ0F4ZXMoYXhlcyA6IElDaGFydEF4aXNbXSl7XHJcbiAgICAgICAgdGhpcy5fU0ZDaGFydC5hY3RpdmVQYW5uaW5nQXhlcyA9IGF4ZXM7IFxyXG4gICAgIH1cclxuIFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhbiBpbnZpc2libGUgQ2FudmFzIHdoaWNoIGlzIHVzZWQgdG8gbWVhc3VyZSBsYWJlbCB3aWR0aFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkVGV4dE1lYXN1cmVtZW50Q2FudmFzKCl7XHJcbiAgICAgICAgbGV0IGlkID0gdGhpcy5fU0ZDaGFydC5jaGFydENvbnRhaW5lclswXS5pZDtcclxuICAgICAgICBsZXQgdCA9ICQoXCIjXCIraWQpOyBcclxuICAgICAgICB0LmFwcGVuZCgnPGNhbnZhcyBpZD1cIicraWQrJ18nK1widGV4dE1hZXN1cmVtZW50Q2FudmFzXCIrJ1wiIHN0eWxlPVwiei1pbmRleDogLTU7IHBvc2l0aW9uOmFic29sdXRlXCI+IDwvY2FudmFzPicpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25BeGVzTGFiZWxSZW5kZXJpbmcoYXJncyl7XHJcbiAgICAgICAgaWYodGhpcy5fU0ZDaGFydCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBsZXQgaWQgPSB0aGlzLl9TRkNoYXJ0LmNoYXJ0Q29udGFpbmVyWzBdLmlkO1xyXG4gICAgICAgICAgICBsZXQgdGV4dE1hZXN1cmVtZW50Q2FudmFzID0gPEhUTUxDYW52YXNFbGVtZW50PiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCsnXycrXCJ0ZXh0TWFlc3VyZW1lbnRDYW52YXNcIik7XHJcbiAgICAgICAgICAgIGlmKHRleHRNYWVzdXJlbWVudENhbnZhcyl7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCBjb250ZXh0ID0gdGV4dE1hZXN1cmVtZW50Q2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgICAgICAgICAgICAgIGxldCBudW1iZXIgPSBhcmdzLmRhdGEubGFiZWxbXCJWYWx1ZVwiXTtcclxuICAgICAgICAgICAgICAgIGxldCBpbnRlcnZhbCA9YXJncy5kYXRhLmF4aXMudmlzaWJsZVJhbmdlLmludGVydmFsO1xyXG4gICAgICAgICAgICAgICAgaWYoYXJncy5kYXRhLmF4aXMub3JpZW50YXRpb24gPT0gXCJob3Jpem9udGFsXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFhBeGlzKHRpbWUpXHJcbiAgICAgICAgICAgICAgICAgICAgYXJncy5kYXRhLmxhYmVsW1wiVGV4dFwiXSA9IENoYXJ0TGFiZWxGb3JtYXRlci5nZXRYQXhpc0xhYmVsVGV4dChudW1iZXIsIGNvbnRleHQsIGludGVydmFsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gWUF4aXNcclxuICAgICAgICAgICAgICAgICAgICBhcmdzLmRhdGEubGFiZWxbXCJUZXh0XCJdID0gQ2hhcnRMYWJlbEZvcm1hdGVyLmdldFlBeGlzTGFiZWxUZXh0KG51bWJlciwgY29udGV4dCwgaW50ZXJ2YWwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldENoYXJ0QXJlYSgpIDogUmVjdGFuZ2xle1xyXG4gICAgICAgIHJldHVybiAge3g6IHRoaXMuX1NGQ2hhcnQuY2FudmFzWCwgeTogdGhpcy5fU0ZDaGFydC5jYW52YXNZLCB3aWR0aDogdGhpcy5fU0ZDaGFydC5jYW52YXNXaWR0aCwgaGVpZ2h0OiB0aGlzLl9TRkNoYXJ0LmNhbnZhc0hlaWdodH07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Q2hhcnRBcmVhKGNoYXJ0QXJlYTogUmVjdGFuZ2xlKXtcclxuICAgICAgICB0aGlzLl9TRkNoYXJ0Lm1vZGVsLm1hcmdpbi5sZWZ0ID0gY2hhcnRBcmVhLnggLSA3MTtcclxuICAgICAgICB0aGlzLl9TRkNoYXJ0Lm1vZGVsLm1hcmdpbi50b3AgPSBjaGFydEFyZWEueSAtIDEwO1xyXG5cclxuICAgICAgICBsZXQgbnVtYnJPZllBeGlzID0gdGhpcy5fU0ZDaGFydC5tb2RlbC5fYXhlcy5sZW5ndGggLSAyXHJcblxyXG4gICAgICAgIHRoaXMuX1NGQ2hhcnQubW9kZWwubWFyZ2luLnJpZ2h0ID0gdGhpcy5fU0ZDaGFydC5tb2RlbC53aWR0aCAtIChjaGFydEFyZWEueCArIGNoYXJ0QXJlYS53aWR0aCkgLSAxMCAtIChudW1ick9mWUF4aXMgKiA3MSkgO1xyXG4gICAgICAgIHRoaXMuX1NGQ2hhcnQubW9kZWwubWFyZ2luLmJvdHRvbSA9IHRoaXMuX1NGQ2hhcnQubW9kZWwuaGVpZ2h0IC0gKChjaGFydEFyZWEueSkgKyBjaGFydEFyZWEuaGVpZ2h0KSAtIDMxO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXRBeGlzKGF4aXNJRCkgOiBTRkNoYXJ0QXhpc3x1bmRlZmluZWR7XHJcbiAgICAgICAgbGV0IGF4aXMgPSB0aGlzLmdldENoYXJ0QXhpc0J5TmFtZShheGlzSUQpXHJcbiAgICAgICAgaWYoYXhpcyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFNGQ2hhcnRBeGlzKGF4aXMsIHRoaXMuZXZlbnRBeGlzUmFuZ2VDaGFuZ2VkLCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgICAvKipcclxuICAgICAqIEdldCBheGlzIHdpdGggYSBnaXZlbiBuYW1lXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGF4aXNOYW1lXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRDaGFydEF4aXNCeU5hbWUoYXhpc05hbWUgOiBzdHJpbmcpIDogYW55e1xyXG4gICAgICAgIGxldCBheGVzID0gdGhpcy5fU0ZDaGFydC5tb2RlbC5fYXhlcztcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgYXhlcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKGF4ZXNbaV0ubmFtZSA9PSBheGlzTmFtZSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYXhlc1tpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBkb1Bhbm5pbmcocGFnZVgsIHBhZ2VZKXtcclxuICAgICBcclxuXHJcbiAgICAgICAgaWYodGhpcy5wcmV2UGFubmluZ0Nvb3Jkcy54ICE9IHVuZGVmaW5lZCl7IFxyXG4gICAgICAgICAgICBsZXQgb0RlbHRhO1xyXG4gICAgICAgICAgICBvRGVsdGEgPSB7XHJcbiAgICAgICAgICAgICAgICAneCc6ICB0aGlzLnByZXZQYW5uaW5nQ29vcmRzLnghIC0gcGFnZVgsXHJcbiAgICAgICAgICAgICAgICAneSc6ICB0aGlzLnByZXZQYW5uaW5nQ29vcmRzLnkhIC0gcGFnZVlcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucHJldlBhbm5pbmdDb29yZHMgPSB7XHJcbiAgICAgICAgICAgICAgICAneCc6IHBhZ2VYLFxyXG4gICAgICAgICAgICAgICAgJ3knOiBwYWdlWVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5fU0ZDaGFydC5hY3RpdmVQYW5uaW5nQXhlcy5sZW5ndGggOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBsZXQgYXhpcyA9IHRoaXMuZ2V0Q2hhcnRBeGlzQnlOYW1lKHRoaXMuX1NGQ2hhcnQuYWN0aXZlUGFubmluZ0F4ZXNbaV0uZ2V0QXhpc0lEKCkpO1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IHRoaXMuX1NGQ2hhcnQubW9kZWwuX2F4ZXMubGVuZ3RoOyBqKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGF4aXMubmFtZSA9PSB0aGlzLl9TRkNoYXJ0Lm1vZGVsLl9heGVzW2pdLm5hbWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBheGlzID0gdGhpcy5fU0ZDaGFydC5tb2RlbC5fYXhlc1tqXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCBkZWx0YTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihheGlzLm9yaWVudGF0aW9uID09IFwiaG9yaXpvbnRhbFwiKXtcclxuICAgICAgICAgICAgICAgICAgICBkZWx0YSA9ICgoQmlnKGF4aXMudmlzaWJsZVJhbmdlLm1heCkubWludXMoQmlnKGF4aXMudmlzaWJsZVJhbmdlLm1pbikpKS5kaXYoQmlnKGF4aXMud2lkdGgpKSkudGltZXMoQmlnKG9EZWx0YS54KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRlbHRhTm1iciA9IE51bWJlcihkZWx0YS50b1N0cmluZygpKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGF4aXMgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRBeGlzKGF4aXMubmFtZSkhLnNldEF4aXNSYW5nZSh7bWluOiBheGlzLnZpc2libGVSYW5nZS5taW4gKyBkZWx0YU5tYnIsIG1heDogYXhpcy52aXNpYmxlUmFuZ2UubWF4ICsgZGVsdGFObWJyfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYXhpcyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWx0YSA9ICgoQmlnKGF4aXMudmlzaWJsZVJhbmdlLm1heCkubWludXMoQmlnKGF4aXMudmlzaWJsZVJhbmdlLm1pbikpKS5kaXYoQmlnKGF4aXMuaGVpZ2h0KSkpLnRpbWVzKEJpZyhvRGVsdGEueSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRlbHRhTm1iciA9IE51bWJlcihkZWx0YS50b1N0cmluZygpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWx0YU5tYnIgPSBkZWx0YU5tYnIgKiAtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRBeGlzKGF4aXMubmFtZSkhLnNldEF4aXNSYW5nZSh7bWluOiBheGlzLnZpc2libGVSYW5nZS5taW4gKyBkZWx0YU5tYnIsIG1heDogYXhpcy52aXNpYmxlUmFuZ2UubWF4ICsgZGVsdGFObWJyfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5wcmV2UGFubmluZ0Nvb3JkcyA9IHtcclxuICAgICAgICAgICAgICAgICd4JzogcGFnZVgsXHJcbiAgICAgICAgICAgICAgICAneSc6IHBhZ2VZXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBhZGRZQXhpcyhheGlzTmFtZTogc3RyaW5nLCBheGlzTWluOiBudW1iZXIsIGF4aXNNYXg6bnVtYmVyLCBwb3NpdGlvbiA6IEF4aXNQb3NpdGlvbil7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRBeGVzID0gIHRoaXMuX1NGQ2hhcnQub3B0aW9uKFwiYXhlc1wiKTtcclxuICAgICAgICBsZXQgb3Bwb3NlZFBvc2l0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgaWYocG9zaXRpb24gPT0gQXhpc1Bvc2l0aW9uLnJpZ2h0KXtcclxuICAgICAgICAgICAgb3Bwb3NlZFBvc2l0aW9uID0gdHJ1ZTs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgXHJcbiAgICAgICAgY3VycmVudEF4ZXMucHVzaCh7XHJcbiAgICAgICAgICAgIG5hbWU6IGF4aXNOYW1lLFxyXG4gICAgICAgICAgICBvcHBvc2VkUG9zaXRpb246IG9wcG9zZWRQb3NpdGlvbixcclxuICAgICAgICAgICAgbWFqb3JHcmlkTGluZXM6IHsgdmlzaWJsZTogZmFsc2UgfSxcclxuICAgICAgICAgICAgcmFuZ2U6IHttaW46IGF4aXNNaW4sIG1heDogYXhpc01heH0sXHJcbiAgICAgICAgICAgIG9yaWVudGF0aW9uOiBcInZlcnRpY2FsXCJcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9TRkNoYXJ0Lm9wdGlvbihcImF4ZXNcIiwgY3VycmVudEF4ZXMpO1xyXG5cclxuICAgICAgICBpZih0aGlzLl9TRkNoYXJ0Lm1vZGVsLmF4ZXMubGVuZ3RoID09IDEpe1xyXG4gICAgICAgICAgICB0aGlzLl9TRkNoYXJ0Lm1vZGVsLm1hcmdpbi5yaWdodCA9IDEwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZVlBeGlzKGF4aXNOYW1lIDogc3RyaW5nKXtcclxuICAgICAgICAvL1RPRE86IFVwZGF0ZSBzbyBpdCB3b3JrcyBmb3IgbW9yZSB0aGFuIDIgYXhpc1xyXG4gICAgICAgIGxldCBpbmRleDtcclxuICAgICAgICBcclxuICAgICAgICBmb3IgKGxldCBpPTA7IGkgPCB0aGlzLl9TRkNoYXJ0Lm1vZGVsLmF4ZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZih0aGlzLl9TRkNoYXJ0Lm1vZGVsLmF4ZXNbaV0ubmFtZSA9PT0gYXhpc05hbWUpe1xyXG4gICAgICAgICAgICAgICAgaW5kZXggPSBpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpe1xyXG4gICAgICAgICAgICB0aGlzLl9TRkNoYXJ0Lm1vZGVsLmF4ZXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9IFxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX1NGQ2hhcnQubW9kZWwuYXhlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX1NGQ2hhcnQubW9kZWwucHJpbWFyeVlBeGlzID0gdGhpcy5fU0ZDaGFydC5tb2RlbC5heGVzWzBdO1xyXG4gICAgICAgICAgICB0aGlzLl9TRkNoYXJ0Lm1vZGVsLnByaW1hcnlZQXhpcy5tYWpvckdyaWRMaW5lcy52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fU0ZDaGFydC5tb2RlbC5wcmltYXJ5WUF4aXMub3Bwb3NlZFBvc2l0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX1NGQ2hhcnQubW9kZWwuYXhlcyA9IFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5fU0ZDaGFydC5tb2RlbC5heGVzLmxlbmd0aCA9PSAwKXtcclxuICAgICAgICAgICAgdGhpcy5fU0ZDaGFydC5tb2RlbC5tYXJnaW4ucmlnaHQgPSAxMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHNldFlBeGlzT2Zmc2V0KG51bWJlck9mQXhlczogbnVtYmVyKXtcclxuICAgICAgICBpZihudW1iZXJPZkF4ZXMgPiAwKXtcclxuICAgICAgICAgICAgdGhpcy5fU0ZDaGFydC5tb2RlbC5tYXJnaW4ucmlnaHQgPSAxMCArICg3MSAqIG51bWJlck9mQXhlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX1NGQ2hhcnQubW9kZWwubWFyZ2luLnJpZ2h0ID0gMTA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0Q2hhcnRPYmplY3RVbmRlck1vdXNlKG1vdXNlWDogbnVtYmVyLCBtb3VzZVk6IG51bWJlcikgOiBDaGFydE9iamVjdEluZm9ybWF0aW9ue1xyXG4gICAgICAgIGxldCBjaGFydE9iamVjdFVuZGVyTW91c2UgPSBuZXcgQ2hhcnRPYmplY3RJbmZvcm1hdGlvbihDaGFydE9iamVjdFR5cGUuZW1wdHlTcGFjZSwge30pO1xyXG4gICAgXHJcbiAgICAgICAgbGV0IGF4aXNCb3VuZHMgPSBBcnJheTxBeGlzQm91bmRzPigpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLl9TRkNoYXJ0Lm1vZGVsLl9heGVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgYXhpc0JvdW5kcy5wdXNoKHRoaXMuZ2V0QXhpcyh0aGlzLl9TRkNoYXJ0Lm1vZGVsLl9heGVzW2ldLm5hbWUpIS5nZXRBeGlzQm91bmRzKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgIFxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBheGlzQm91bmRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYoKG1vdXNlWCAtIGF4aXNCb3VuZHNbaV0ueCkgPCAoYXhpc0JvdW5kc1tpXS53aWR0aCkgJiYgbW91c2VYID4gYXhpc0JvdW5kc1tpXS54KXtcclxuICAgICAgICAgICAgICAgIGlmKChtb3VzZVkgLSBheGlzQm91bmRzW2ldLnkpIDwgKGF4aXNCb3VuZHNbaV0uaGVpZ2h0KSAmJiBtb3VzZVkgPiBheGlzQm91bmRzW2ldLnkpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNoYXJ0T2JqZWN0VW5kZXJNb3VzZSA9IG5ldyBDaGFydE9iamVjdEluZm9ybWF0aW9uKENoYXJ0T2JqZWN0VHlwZS5heGlzLCB7YXhpczogYXhpc0JvdW5kc1tpXS5heGlzfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjaGFydE9iamVjdFVuZGVyTW91c2U7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQge1NGQ2hhcnRXcmFwcGVyfSJdfQ==