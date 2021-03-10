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
define(["require", "exports", "../../../core/interfaces/components/ui/chart/chartInterface", "./SFChartAxis", "../helpers/chartLabelFormater", "../../../models/common/point", "../chartViewWidget", "../userInteraction/userInteractionController", "../ChartBase"], function (require, exports, chartInterface_1, SFChartAxis_1, chartLabelFormater_1, point_1, chartViewWidget_1, userInteractionController_1, ChartBase_1) {
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
                if (maxVal.toPrecision(11) - minVal.toPrecision(11) > 1e-12) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZDaGFydFdyYXBwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY2hhcnRWaWV3V2lkZ2V0L2NoYXJ0V3JhcHBlci9TRkNoYXJ0V3JhcHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQWFBLElBQU0sdUJBQXVCLEdBQVcsRUFBRSxDQUFDO0lBRzNDO1FBY0ksd0JBQVksV0FBbUIsRUFBRSxZQUFvQixFQUFFLFVBQWtCO1lBTGxFLHNCQUFpQixHQUFHO2dCQUN2QixHQUFHLEVBQUUsU0FBUztnQkFDZCxHQUFHLEVBQUUsU0FBUzthQUNqQixDQUFBO1lBR0csSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQztZQUM5RSxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztZQUVoQyxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxzQ0FBcUIsRUFBRSxDQUFDO1lBQ3pELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLGlDQUFnQixFQUFFLENBQUM7WUFDL0MsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLGdDQUFlLEVBQUUsQ0FBQztZQUc3QyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztRQUNwQyxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSywwQ0FBaUIsR0FBekIsVUFBMEIsV0FBbUIsRUFBRSxZQUFvQixFQUFFLFVBQWtCO1lBRW5GLElBQUksYUFBYSxHQUFHLEVBQUUsQ0FBQTtZQUN0QixhQUFhLHlDQUNULHFCQUFxQixFQUFFLElBQUksSUFFeEIsSUFBSSxDQUFDLHdCQUF3QixFQUFFLEdBQy9CLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLEtBRXpELE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVB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LEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQztvQkFDOUUsSUFBRyxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksTUFBTSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUM7d0JBQy9FLHFCQUFxQixHQUFHLElBQUksa0NBQXNCLENBQUMsMkJBQWUsQ0FBQyxJQUFJLEVBQUUsRUFBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBQyxDQUFDLENBQUM7cUJBQ3hHO2lCQUNKO2FBQ0o7WUFFRCxPQUFPLHFCQUFxQixDQUFDO1FBQ2pDLENBQUM7UUFFTCxxQkFBQztJQUFELENBQUMsQUFuZUQsSUFtZUM7SUFFTyx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNjYWxlIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvc2NhbGVcIjtcclxuaW1wb3J0IHsgSUNoYXJ0LCBFdmVudEF4aXNSYW5nZUNoYW5nZWQsIEV2ZW50TW91c2VBY3Rpb24sIEV2ZW50TW91c2VBcmdzLCBFdmVudE1vdXNlV2hlZWwsIEV2ZW50TW91c2VXaGVlbEFyZ3MsIEF4aXNQb3NpdGlvbn0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvaW50ZXJmYWNlcy9jb21wb25lbnRzL3VpL2NoYXJ0L2NoYXJ0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEF4aXNCb3VuZHMgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS90eXBlcy9BeGlzQm91bmRzXCI7XHJcbmltcG9ydCB7IElDaGFydEF4aXMgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9pbnRlcmZhY2VzL2NvbXBvbmVudHMvdWkvY2hhcnQvQ2hhcnRBeGlzSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNGQ2hhcnRBeGlzIH0gZnJvbSBcIi4vU0ZDaGFydEF4aXNcIjtcclxuaW1wb3J0IHsgUmVjdGFuZ2xlIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvdHlwZXMvUmVjdGFuZ2xlXCI7XHJcbmltcG9ydCB7IENoYXJ0TGFiZWxGb3JtYXRlciB9IGZyb20gXCIuLi9oZWxwZXJzL2NoYXJ0TGFiZWxGb3JtYXRlclwiO1xyXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY29tbW9uL3BvaW50XCI7XHJcbmltcG9ydCB7IFpvb21EaXJlY3Rpb24gfSBmcm9tIFwiLi4vY2hhcnRWaWV3V2lkZ2V0XCI7XHJcbmltcG9ydCB7IE1vdXNlQWN0aW9uVHlwZSB9IGZyb20gXCIuLi91c2VySW50ZXJhY3Rpb24vdXNlckludGVyYWN0aW9uQ29udHJvbGxlclwiO1xyXG5pbXBvcnQgeyBDaGFydE9iamVjdEluZm9ybWF0aW9uLCBDaGFydE9iamVjdFR5cGUgfSBmcm9tIFwiLi4vQ2hhcnRCYXNlXCI7XHJcblxyXG5cclxuY29uc3Qgc3BhY2VDaGFydFJpZ2h0SGFuZFNpZGU6IG51bWJlciA9IDE1O1xyXG5cclxuXHJcbmNsYXNzIFNGQ2hhcnRXcmFwcGVyIGltcGxlbWVudHMgSUNoYXJ0e1xyXG4gICAgX1NGQ2hhcnQvLzogZWouZGF0YXZpc3VhbGl6YXRpb24uQ2hhcnQ7XHJcbiAgICBldmVudEF4aXNSYW5nZUNoYW5nZWQgOiBFdmVudEF4aXNSYW5nZUNoYW5nZWQ7XHJcbiAgICBldmVudE1vdXNlQWN0aW9uIDogRXZlbnRNb3VzZUFjdGlvbjtcclxuICAgIGV2ZW50TW91c2VXaGVlbDogRXZlbnRNb3VzZVdoZWVsO1xyXG5cclxuXHJcbiAgICBwcml2YXRlIG1vdXNlRG93bkF4aXM7XHJcblxyXG4gICAgcHVibGljIHByZXZQYW5uaW5nQ29vcmRzID0ge1xyXG4gICAgICAgICd4JzogdW5kZWZpbmVkLFxyXG4gICAgICAgICd5JzogdW5kZWZpbmVkXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoY29udGFpbmVySWQ6IHN0cmluZywgZGVmYXVsdFNjYWxlIDogU2NhbGUsIG5hbWVTY2FsZVg6IHN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5fU0ZDaGFydCA9IHRoaXMuaW5pdGlhbGl6ZVNGQ2hhcnQoY29udGFpbmVySWQsIGRlZmF1bHRTY2FsZSwgbmFtZVNjYWxlWCk7XHJcbiAgICAgICAgdGhpcy5hZGRUZXh0TWVhc3VyZW1lbnRDYW52YXMoKTtcclxuXHJcbiAgICAgICAgdGhpcy5ldmVudEF4aXNSYW5nZUNoYW5nZWQgPSBuZXcgRXZlbnRBeGlzUmFuZ2VDaGFuZ2VkKCk7XHJcbiAgICAgICAgdGhpcy5ldmVudE1vdXNlQWN0aW9uID0gbmV3IEV2ZW50TW91c2VBY3Rpb24oKTtcclxuICAgICAgICB0aGlzLmV2ZW50TW91c2VXaGVlbCA9IG5ldyBFdmVudE1vdXNlV2hlZWwoKTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnNUb0NoYXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXphdGlvbiBvZiBTeW5jZnVzaW9uIGNoYXJ0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbml0aWFsaXplU0ZDaGFydChjb250YWluZXJJZDogc3RyaW5nLCBkZWZhdWx0U2NhbGUgOiBTY2FsZSwgbmFtZVNjYWxlWDogc3RyaW5nKSA6IGVqLmRhdGF2aXN1YWxpemF0aW9uLkNoYXJ0e1xyXG5cclxuICAgICAgICBsZXQgY2hhcnRTZXR0aW5ncyA9IHt9XHJcbiAgICAgICAgY2hhcnRTZXR0aW5ncyA9IHtcclxuICAgICAgICAgICAgZW5hYmxlQ2FudmFzUmVuZGVyaW5nOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgLi4udGhpcy5nZXRTRkNoYXJ0U2VyaWVzU2V0dGluZ3MoKSxcclxuICAgICAgICAgICAgLi4udGhpcy5nZXRTRkNoYXJ0U2NhbGVTZXR0aW5ncyhkZWZhdWx0U2NhbGUsIG5hbWVTY2FsZVgpLFxyXG5cclxuICAgICAgICAgICAgem9vbWluZzogeyBlbmFibGU6IHRydWUsIGVuYWJsZU1vdXNlV2hlZWw6IGZhbHNlLCB0eXBlOiBcIlhZXCIsIGVuYWJsZVNjcm9sbGJhcjogZmFsc2UsIHRvb2xiYXJJdGVtczogW1wiXCJdIH0sXHJcbiAgICAgICAgICAgIGNyb3NzaGFpcjogeyB2aXNpYmxlOiBmYWxzZSwgdHlwZTogJ2Nyb3NzaGFpcicsIGxpbmU6IHsgY29sb3I6IFwiYmxhY2tcIiB9IH0sXHJcbiAgICAgICAgICAgIGxlZ2VuZDogeyB2aXNpYmxlOiBmYWxzZSwgZW5hYmxlU2Nyb2xsYmFyIDogZmFsc2V9LFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLi4udGhpcy5nZXRTRkNoYXJ0RXZlbnRIYW5kbGVycygpLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICQoY29udGFpbmVySWQpLmVqQ2hhcnQoY2hhcnRTZXR0aW5ncyk7XHJcbiAgICAgICAgbGV0IFNGQ2hhcnRJbnN0YW5jZSA9ICQoY29udGFpbmVySWQpLmVqQ2hhcnQoXCJpbnN0YW5jZVwiKS8vIGFzIGVqLmRhdGF2aXN1YWxpemF0aW9uLkNoYXJ0O1xyXG4gICAgICAgIFxyXG4gICAgICAgIFNGQ2hhcnRJbnN0YW5jZS5tYXhMYWJlbFdpZHRoID0gNTU7XHJcblxyXG5cclxuICAgICAgICByZXR1cm4gU0ZDaGFydEluc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRTRkNoYXJ0U2VyaWVzU2V0dGluZ3MoKSA6IHt9e1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHNlcmllczogW3tcclxuICAgICAgICAgICAgICAgIG5hbWU6ICdTZXJpZXMxJyxcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdsaW5lJyxcclxuICAgICAgICAgICAgICAgIHhOYW1lOiBcInhcIixcclxuICAgICAgICAgICAgICAgIHlOYW1lOiBcInlcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2xpbmUnLFxyXG4gICAgICAgICAgICAgICAgeE5hbWU6IFwieFwiLFxyXG4gICAgICAgICAgICAgICAgeU5hbWU6IFwieVwiLFxyXG4gICAgICAgICAgICAgICAgeUF4aXNOYW1lOiBcInlBeGlzMVwiLFxyXG4gICAgICAgICAgICB9XSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFNGQ2hhcnRTY2FsZVNldHRpbmdzKGRlZmF1bHRTY2FsZSA6IFNjYWxlLCBuYW1lU2NhbGVYOiBzdHJpbmcpIDoge317XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcHJpbWFyeVhBeGlzOiB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBuYW1lU2NhbGVYLFxyXG4gICAgICAgICAgICAgICAgY3Jvc3NoYWlyTGFiZWw6IHsgdmlzaWJsZTogdHJ1ZSwgdHJhY2tiYWxsVG9vbHRpcFNldHRpbmdzOiB7IGJvcmRlcjogeyB3aWR0aDogMTAgfSB9IH0sXHJcbiAgICAgICAgICAgICAgICBsYWJlbEZvcm1hdDogJ24zJyxcclxuICAgICAgICAgICAgICAgIGxhYmVsUGxhY2VtZW50OiAnb250aWNrcycsXHJcbiAgICAgICAgICAgICAgICBzY3JvbGxiYXJTZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhblJlc2l6ZTogZmFsc2UsICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBsYWJlbEludGVyc2VjdEFjdGlvbiA6IFwiSGlkZVwiLFxyXG4gICAgICAgICAgICAgICAgcmFuZ2U6IHttaW46IGRlZmF1bHRTY2FsZS5taW5YVmFsdWUsIG1heDogZGVmYXVsdFNjYWxlLm1heFhWYWx1ZX1cclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHByaW1hcnlZQXhpczoge1xyXG4gICAgICAgICAgICAgICAgbmFtZSA6IGRlZmF1bHRTY2FsZS5pZCxcclxuICAgICAgICAgICAgICAgIGNyb3NzaGFpckxhYmVsOiB7IHZpc2libGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIGVuYWJsZUF1dG9JbnRlcnZhbE9uWm9vbWluZzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGxhYmVsRm9ybWF0OiBcIm4zXCIsXHJcbiAgICAgICAgICAgICAgICBtYXhpbXVtTGFiZWxXaWR0aCA6IDYwLFxyXG4gICAgICAgICAgICAgICAgbGFiZWxJbnRlcnNlY3RBY3Rpb24gOiBcIkhpZGVcIixcclxuICAgICAgICAgICAgICAgIHJhbmdlOiB7bWluOiBkZWZhdWx0U2NhbGUubWluWVZhbHVlLCBtYXg6IGRlZmF1bHRTY2FsZS5tYXhZVmFsdWV9XHJcblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlIFxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFNGQ2hhcnRFdmVudEhhbmRsZXJzKCkgOiB7fXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB6b29tZWQ6IChhcmdzKSA9PiB7dGhpcy5vbkNoYXJ0Wm9vbWVkKGFyZ3MpfSxcclxuICAgICAgICAgICAgYXhlc0xhYmVsUmVuZGVyaW5nOiAoYXJncykgPT4ge3RoaXMub25BeGVzTGFiZWxSZW5kZXJpbmcoYXJncyl9LFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkRXZlbnRMaXN0ZW5lcnNUb0NoYXJ0KCl7XHJcbiAgICAgICAgdGhpcy5fU0ZDaGFydC5fb24odGhpcy5fU0ZDaGFydC5lbGVtZW50LCBcIm1vdXNld2hlZWxcIiwgKGFyZ3MpID0+IHRoaXMub25DaGFydE1vdXNlV2hlZWwoYXJncykpO1xyXG4gICAgICAgIHRoaXMuX1NGQ2hhcnQuX29uKHRoaXMuX1NGQ2hhcnQuZWxlbWVudCwgXCJtb3VzZWRvd25cIiwgKGFyZ3MpID0+IHRoaXMub25DaGFydE1vdXNlRG93bihhcmdzKSk7XHJcbiAgICAgICAgdGhpcy5fU0ZDaGFydC5fb24odGhpcy5fU0ZDaGFydC5lbGVtZW50LCBcIm1vdXNldXBcIiwgKGFyZ3MpID0+IHRoaXMub25DaGFydE1vdXNlVXAoYXJncykpO1xyXG4gICAgICAgIHRoaXMuX1NGQ2hhcnQuX29uKHRoaXMuX1NGQ2hhcnQuZWxlbWVudCwgXCJtb3VzZW1vdmVcIiwgKGFyZ3MpID0+IHRoaXMub25DaGFydE1vdXNlTW92ZShhcmdzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNoYXJ0TW91c2VEb3duKGFyZ3Mpe1xyXG4gICAgICAgIGxldCBjaGFydE9iamVjdFVuZGVyTW91c2UgPSB0aGlzLmdldENoYXJ0T2JqZWN0VW5kZXJNb3VzZSh0aGlzLl9TRkNoYXJ0Lm1vdXNlbW92ZVgsIHRoaXMuX1NGQ2hhcnQubW91c2Vtb3ZlWSk7XHJcbiAgICAgICAgaWYoY2hhcnRPYmplY3RVbmRlck1vdXNlLmFyZ3MuYXhpcyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLm1vdXNlRG93bkF4aXMgPSBjaGFydE9iamVjdFVuZGVyTW91c2UuYXJncy5heGlzLm5hbWU7IFxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbW91c2VEb3duQXJncyA6IEV2ZW50TW91c2VBcmdzID0gbmV3IEV2ZW50TW91c2VBcmdzKE1vdXNlQWN0aW9uVHlwZS5tb3VzZURvd24sIG5ldyBQb2ludCh0aGlzLl9TRkNoYXJ0Lm1vdXNlbW92ZVgsIHRoaXMuX1NGQ2hhcnQubW91c2Vtb3ZlWSksIGFyZ3Mub2JqZWN0VW5kZXJNb3VzZSlcclxuICAgICAgICB0aGlzLmV2ZW50TW91c2VBY3Rpb24ucmFpc2UodGhpcywgbW91c2VEb3duQXJncyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNoYXJ0TW91c2VVcChhcmdzKXtcclxuICAgICAgICB0aGlzLm1vdXNlRG93bkF4aXMgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgIGxldCBtb3VzZVVwQXJncyA6IEV2ZW50TW91c2VBcmdzID0gbmV3IEV2ZW50TW91c2VBcmdzKE1vdXNlQWN0aW9uVHlwZS5tb3VzZVVwLCBuZXcgUG9pbnQodGhpcy5fU0ZDaGFydC5tb3VzZW1vdmVYLCB0aGlzLl9TRkNoYXJ0Lm1vdXNlbW92ZVkpLCBhcmdzLm9iamVjdFVuZGVyTW91c2UpXHJcbiAgICAgICAgdGhpcy5ldmVudE1vdXNlQWN0aW9uLnJhaXNlKHRoaXMsIG1vdXNlVXBBcmdzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQ2hhcnRNb3VzZU1vdmUoYXJncyl7XHJcbiAgICAgICAgLyppZih0aGlzLm1vdXNlRG93bkF4aXMgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fU0ZDaGFydC5hY3RpdmVQYW5uaW5nQXhlcyA9IFt0aGlzLmdldENoYXJ0QXhpc0J5TmFtZSh0aGlzLm1vdXNlRG93bkF4aXMpXVxyXG4gICAgICAgICAgICB0aGlzLmRvUGFubmluZyh0aGlzLl9TRkNoYXJ0Lm1vdXNlbW92ZVgsIHRoaXMuX1NGQ2hhcnQubW91c2Vtb3ZlWSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVkcmF3KCk7XHJcbiAgICAgICAgfSovXHJcbiAgICAgIFxyXG5cclxuICAgICAgICBsZXQgbW91c2VNb3ZlQXJncyA6IEV2ZW50TW91c2VBcmdzID0gbmV3IEV2ZW50TW91c2VBcmdzKE1vdXNlQWN0aW9uVHlwZS5tb3VzZU1vdmUsIG5ldyBQb2ludCh0aGlzLl9TRkNoYXJ0Lm1vdXNlbW92ZVgsIHRoaXMuX1NGQ2hhcnQubW91c2Vtb3ZlWSksIGFyZ3Mub2JqZWN0VW5kZXJNb3VzZSlcclxuICAgICAgICB0aGlzLmV2ZW50TW91c2VBY3Rpb24ucmFpc2UodGhpcywgbW91c2VNb3ZlQXJncyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNoYXJ0TW91c2VXaGVlbChhcmdzKXtcclxuICAgICAgICBsZXQgbW91c2VXaGVlbEFyZ3MgOiBFdmVudE1vdXNlV2hlZWxBcmdzID0gbmV3IEV2ZW50TW91c2VXaGVlbEFyZ3MobmV3IFBvaW50KHRoaXMuX1NGQ2hhcnQubW91c2Vtb3ZlWCwgdGhpcy5fU0ZDaGFydC5tb3VzZW1vdmVZKSwgYXJncy5vYmplY3RVbmRlck1vdXNlLCBhcmdzLm9yaWdpbmFsRXZlbnQud2hlZWxEZWx0YSlcclxuICAgICAgICB0aGlzLmV2ZW50TW91c2VXaGVlbC5yYWlzZSh0aGlzLCBtb3VzZVdoZWVsQXJncyk7XHJcbiAgICB9XHJcblxyXG4gICAgICAgLyoqXHJcbiAgICAgKiBTZXRzIHNjYWxlIHJhbmdlcyBhZnRlciBib3hab29tIGFjY29yZGluZ3kgdG8gem9vbWluZyBwb3NpdGlvbiBhbmQgZmFjdG9yOyBzZXRzIHpwIGFuZCB6ZiB0byAwLzFcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIG9uQ2hhcnRab29tZWQoYXJncykge1xyXG4gICAgICAgIC8vbGV0IHlTY2FsZXMgPSB0aGlzLmdldFlTY2FsZXMoKTtcclxuICAgICAgICBsZXQgY2hhcnRBeGVzIDogYW55W10gPSBhcmdzLm1vZGVsLl9heGVzO1xyXG4gICAgICAgIGxldCB4QXhpc1pvb21DYW5jZWxlZCA9IGZhbHNlO1xyXG4gICAgICBcclxuICAgICAgICBmb3IobGV0IGN1cnJlbnRDaGFydEF4aXMgb2YgY2hhcnRBeGVzKXtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBtaW5WYWwgPSAgY3VycmVudENoYXJ0QXhpcy52aXNpYmxlUmFuZ2UubWluO1xyXG4gICAgICAgICAgICBsZXQgbWF4VmFsID0gIGN1cnJlbnRDaGFydEF4aXMudmlzaWJsZVJhbmdlLm1heDtcclxuXHJcbiAgICAgICAgICAgIC8vbGltaXQgdGhlIGF4aXMgcmFuZ2UgdG8gUHJlY2lzaW9uIDExIHRvIHByZXZlbnQgc3luY2Z1c2lvbiBjaGFydCBmcm9tIGZhaWxpbmdcclxuICAgICAgICAgICAgaWYobWF4VmFsLnRvUHJlY2lzaW9uKDExKSAtIG1pblZhbC50b1ByZWNpc2lvbigxMSkgPiAxZS0xMil7XHJcbiAgICAgICAgICAgICAgICBsZXQgYXhpcyA9IHRoaXMuZ2V0QXhpcyhjdXJyZW50Q2hhcnRBeGlzLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgaWYoYXhpcyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBheGlzLnNldEF4aXNSYW5nZSh7bWluOiBtaW5WYWwsIG1heDogbWF4VmFsfSxmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZihjdXJyZW50Q2hhcnRBeGlzLm9yaWVudGF0aW9uID09IFwiaG9yaXpvbnRhbFwiKXtcclxuICAgICAgICAgICAgICAgICAgICB4QXhpc1pvb21DYW5jZWxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGN1cnJlbnRDaGFydEF4aXMuem9vbVBvc2l0aW9uID0gMDtcclxuICAgICAgICAgICAgY3VycmVudENoYXJ0QXhpcy56b29tRmFjdG9yID0gMTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYXhpcyA9IHRoaXMuZ2V0QXhpcyhjaGFydEF4ZXNbMF0ubmFtZSk7XHJcbiAgICAgICAgaWYoYXhpcyAhPSB1bmRlZmluZWQgJiYgeEF4aXNab29tQ2FuY2VsZWQgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICBheGlzLnNldEF4aXNSYW5nZShheGlzLmdldEF4aXNSYW5nZSgpLCBmYWxzZSwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIHRoaXMuX1NGQ2hhcnQuem9vbWVkID0gZmFsc2U7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJlZHJhdygpe1xyXG4gICAgICAgIHRoaXMuX1NGQ2hhcnQucmVkcmF3KCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHJlc2l6ZShoZWlnaHQ6IG51bWJlciwgd2lkdGg6IG51bWJlcil7XHJcbiAgICAgICAgdGhpcy5fU0ZDaGFydC5vcHRpb24oXCJzaXplXCIsIHtoZWlnaHQ6IFN0cmluZyhoZWlnaHQpLCB3aWR0aDogU3RyaW5nKHdpZHRoIC0gc3BhY2VDaGFydFJpZ2h0SGFuZFNpZGUpfSk7XHJcbiAgICB9XHJcblxyXG4gICAgICAvKipcclxuICAgICAqIFNldHMgem9vbUF4ZXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1pvb21EaXJlY3Rpb259IHpvb21BeGVzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRab29tRGlyZWN0aW9uKHpvb21BeGVzOiBab29tRGlyZWN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5fU0ZDaGFydC5tb2RlbC56b29taW5nLnR5cGUgPSAgWm9vbURpcmVjdGlvblt6b29tQXhlc107XHJcbiAgICB9XHJcblxyXG4gICAgIC8qKlxyXG4gICAgICogRW5hYmxlcyBib3ggem9vbWluZ1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZW5hYmxlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBlbmFibGVCb3hab29tKGVuYWJsZTogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuX1NGQ2hhcnQubW9kZWwuem9vbWluZy5lbmFibGUgPSBlbmFibGU7XHJcbiAgICB9XHJcbiBcclxuICAgICAvKipcclxuICAgICAgKiBFbmFibGVzIHBhbm5pbmdcclxuICAgICAgKlxyXG4gICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZW5hYmxlXHJcbiAgICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICAqL1xyXG4gICAgIHB1YmxpYyBlbmFibGVQYW5uaW5nKGVuYWJsZTogYm9vbGVhbikge1xyXG4gICAgICAgICB0aGlzLl9TRkNoYXJ0LnBhbm5pbmcgPSBlbmFibGU7XHJcbiAgICAgfVxyXG5cclxuXHJcbiAgICAgcHVibGljIHNldFBhbm5pbmdBeGVzKGF4ZXMgOiBJQ2hhcnRBeGlzW10pe1xyXG4gICAgICAgIHRoaXMuX1NGQ2hhcnQuYWN0aXZlUGFubmluZ0F4ZXMgPSBheGVzOyBcclxuICAgICB9XHJcbiBcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYW4gaW52aXNpYmxlIENhbnZhcyB3aGljaCBpcyB1c2VkIHRvIG1lYXN1cmUgbGFiZWwgd2lkdGhcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZFRleHRNZWFzdXJlbWVudENhbnZhcygpe1xyXG4gICAgICAgIGxldCBpZCA9IHRoaXMuX1NGQ2hhcnQuY2hhcnRDb250YWluZXJbMF0uaWQ7XHJcbiAgICAgICAgbGV0IHQgPSAkKFwiI1wiK2lkKTsgXHJcbiAgICAgICAgdC5hcHBlbmQoJzxjYW52YXMgaWQ9XCInK2lkKydfJytcInRleHRNYWVzdXJlbWVudENhbnZhc1wiKydcIiBzdHlsZT1cInotaW5kZXg6IC01OyBwb3NpdGlvbjphYnNvbHV0ZVwiPiA8L2NhbnZhcz4nKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uQXhlc0xhYmVsUmVuZGVyaW5nKGFyZ3Mpe1xyXG4gICAgICAgIGlmKHRoaXMuX1NGQ2hhcnQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgbGV0IGlkID0gdGhpcy5fU0ZDaGFydC5jaGFydENvbnRhaW5lclswXS5pZDtcclxuICAgICAgICAgICAgbGV0IHRleHRNYWVzdXJlbWVudENhbnZhcyA9IDxIVE1MQ2FudmFzRWxlbWVudD4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQrJ18nK1widGV4dE1hZXN1cmVtZW50Q2FudmFzXCIpO1xyXG4gICAgICAgICAgICBpZih0ZXh0TWFlc3VyZW1lbnRDYW52YXMpe1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBsZXQgY29udGV4dCA9IHRleHRNYWVzdXJlbWVudENhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgICAgICAgICBsZXQgbnVtYmVyID0gYXJncy5kYXRhLmxhYmVsW1wiVmFsdWVcIl07XHJcbiAgICAgICAgICAgICAgICBsZXQgaW50ZXJ2YWwgPWFyZ3MuZGF0YS5heGlzLnZpc2libGVSYW5nZS5pbnRlcnZhbDtcclxuICAgICAgICAgICAgICAgIGlmKGFyZ3MuZGF0YS5heGlzLm9yaWVudGF0aW9uID09IFwiaG9yaXpvbnRhbFwiKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyBYQXhpcyh0aW1lKVxyXG4gICAgICAgICAgICAgICAgICAgIGFyZ3MuZGF0YS5sYWJlbFtcIlRleHRcIl0gPSBDaGFydExhYmVsRm9ybWF0ZXIuZ2V0WEF4aXNMYWJlbFRleHQobnVtYmVyLCBjb250ZXh0LCBpbnRlcnZhbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFlBeGlzXHJcbiAgICAgICAgICAgICAgICAgICAgYXJncy5kYXRhLmxhYmVsW1wiVGV4dFwiXSA9IENoYXJ0TGFiZWxGb3JtYXRlci5nZXRZQXhpc0xhYmVsVGV4dChudW1iZXIsIGNvbnRleHQsIGludGVydmFsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRDaGFydEFyZWEoKSA6IFJlY3RhbmdsZXtcclxuICAgICAgICByZXR1cm4gIHt4OiB0aGlzLl9TRkNoYXJ0LmNhbnZhc1gsIHk6IHRoaXMuX1NGQ2hhcnQuY2FudmFzWSwgd2lkdGg6IHRoaXMuX1NGQ2hhcnQuY2FudmFzV2lkdGgsIGhlaWdodDogdGhpcy5fU0ZDaGFydC5jYW52YXNIZWlnaHR9O1xyXG4gICAgfVxyXG5cclxuICAgIHNldENoYXJ0QXJlYShjaGFydEFyZWE6IFJlY3RhbmdsZSl7XHJcbiAgICAgICAgdGhpcy5fU0ZDaGFydC5tb2RlbC5tYXJnaW4ubGVmdCA9IGNoYXJ0QXJlYS54IC0gNzE7XHJcbiAgICAgICAgdGhpcy5fU0ZDaGFydC5tb2RlbC5tYXJnaW4udG9wID0gY2hhcnRBcmVhLnkgLSAxMDtcclxuXHJcbiAgICAgICAgbGV0IG51bWJyT2ZZQXhpcyA9IHRoaXMuX1NGQ2hhcnQubW9kZWwuX2F4ZXMubGVuZ3RoIC0gMlxyXG5cclxuICAgICAgICB0aGlzLl9TRkNoYXJ0Lm1vZGVsLm1hcmdpbi5yaWdodCA9IHRoaXMuX1NGQ2hhcnQubW9kZWwud2lkdGggLSAoY2hhcnRBcmVhLnggKyBjaGFydEFyZWEud2lkdGgpIC0gMTAgLSAobnVtYnJPZllBeGlzICogNzEpIDtcclxuICAgICAgICB0aGlzLl9TRkNoYXJ0Lm1vZGVsLm1hcmdpbi5ib3R0b20gPSB0aGlzLl9TRkNoYXJ0Lm1vZGVsLmhlaWdodCAtICgoY2hhcnRBcmVhLnkpICsgY2hhcnRBcmVhLmhlaWdodCkgLSAzMTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QXhpcyhheGlzSUQpIDogU0ZDaGFydEF4aXN8dW5kZWZpbmVke1xyXG4gICAgICAgIGxldCBheGlzID0gdGhpcy5nZXRDaGFydEF4aXNCeU5hbWUoYXhpc0lEKVxyXG4gICAgICAgIGlmKGF4aXMgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBTRkNoYXJ0QXhpcyhheGlzLCB0aGlzLmV2ZW50QXhpc1JhbmdlQ2hhbmdlZCwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAgLyoqXHJcbiAgICAgKiBHZXQgYXhpcyB3aXRoIGEgZ2l2ZW4gbmFtZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBheGlzTmFtZVxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0Q2hhcnRBeGlzQnlOYW1lKGF4aXNOYW1lIDogc3RyaW5nKSA6IGFueXtcclxuICAgICAgICBsZXQgYXhlcyA9IHRoaXMuX1NGQ2hhcnQubW9kZWwuX2F4ZXM7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGF4ZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZihheGVzW2ldLm5hbWUgPT0gYXhpc05hbWUpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGF4ZXNbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZG9QYW5uaW5nKHBhZ2VYLCBwYWdlWSl7XHJcbiAgICAgXHJcblxyXG4gICAgICAgIGlmKHRoaXMucHJldlBhbm5pbmdDb29yZHMueCAhPSB1bmRlZmluZWQpeyBcclxuICAgICAgICAgICAgbGV0IG9EZWx0YTtcclxuICAgICAgICAgICAgb0RlbHRhID0ge1xyXG4gICAgICAgICAgICAgICAgJ3gnOiAgdGhpcy5wcmV2UGFubmluZ0Nvb3Jkcy54ISAtIHBhZ2VYLFxyXG4gICAgICAgICAgICAgICAgJ3knOiAgdGhpcy5wcmV2UGFubmluZ0Nvb3Jkcy55ISAtIHBhZ2VZXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB0aGlzLnByZXZQYW5uaW5nQ29vcmRzID0ge1xyXG4gICAgICAgICAgICAgICAgJ3gnOiBwYWdlWCxcclxuICAgICAgICAgICAgICAgICd5JzogcGFnZVlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuX1NGQ2hhcnQuYWN0aXZlUGFubmluZ0F4ZXMubGVuZ3RoIDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgbGV0IGF4aXMgPSB0aGlzLmdldENoYXJ0QXhpc0J5TmFtZSh0aGlzLl9TRkNoYXJ0LmFjdGl2ZVBhbm5pbmdBeGVzW2ldLmdldEF4aXNJRCgpKTtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCB0aGlzLl9TRkNoYXJ0Lm1vZGVsLl9heGVzLmxlbmd0aDsgaisrKXtcclxuICAgICAgICAgICAgICAgICAgICBpZihheGlzLm5hbWUgPT0gdGhpcy5fU0ZDaGFydC5tb2RlbC5fYXhlc1tqXS5uYW1lKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXhpcyA9IHRoaXMuX1NGQ2hhcnQubW9kZWwuX2F4ZXNbal07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBsZXQgZGVsdGE7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoYXhpcy5vcmllbnRhdGlvbiA9PSBcImhvcml6b250YWxcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsdGEgPSAoKEJpZyhheGlzLnZpc2libGVSYW5nZS5tYXgpLm1pbnVzKEJpZyhheGlzLnZpc2libGVSYW5nZS5taW4pKSkuZGl2KEJpZyhheGlzLndpZHRoKSkpLnRpbWVzKEJpZyhvRGVsdGEueCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkZWx0YU5tYnIgPSBOdW1iZXIoZGVsdGEudG9TdHJpbmcoKSlcclxuICAgICAgICAgICAgICAgICAgICBpZihheGlzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0QXhpcyhheGlzLm5hbWUpIS5zZXRBeGlzUmFuZ2Uoe21pbjogYXhpcy52aXNpYmxlUmFuZ2UubWluICsgZGVsdGFObWJyLCBtYXg6IGF4aXMudmlzaWJsZVJhbmdlLm1heCArIGRlbHRhTm1icn0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGF4aXMgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsdGEgPSAoKEJpZyhheGlzLnZpc2libGVSYW5nZS5tYXgpLm1pbnVzKEJpZyhheGlzLnZpc2libGVSYW5nZS5taW4pKSkuZGl2KEJpZyhheGlzLmhlaWdodCkpKS50aW1lcyhCaWcob0RlbHRhLnkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkZWx0YU5tYnIgPSBOdW1iZXIoZGVsdGEudG9TdHJpbmcoKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsdGFObWJyID0gZGVsdGFObWJyICogLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0QXhpcyhheGlzLm5hbWUpIS5zZXRBeGlzUmFuZ2Uoe21pbjogYXhpcy52aXNpYmxlUmFuZ2UubWluICsgZGVsdGFObWJyLCBtYXg6IGF4aXMudmlzaWJsZVJhbmdlLm1heCArIGRlbHRhTm1icn0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMucHJldlBhbm5pbmdDb29yZHMgPSB7XHJcbiAgICAgICAgICAgICAgICAneCc6IHBhZ2VYLFxyXG4gICAgICAgICAgICAgICAgJ3knOiBwYWdlWVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgYWRkWUF4aXMoYXhpc05hbWU6IHN0cmluZywgYXhpc01pbjogbnVtYmVyLCBheGlzTWF4Om51bWJlciwgcG9zaXRpb24gOiBBeGlzUG9zaXRpb24pe1xyXG4gICAgICAgIGxldCBjdXJyZW50QXhlcyA9ICB0aGlzLl9TRkNoYXJ0Lm9wdGlvbihcImF4ZXNcIik7XHJcbiAgICAgICAgbGV0IG9wcG9zZWRQb3NpdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgIGlmKHBvc2l0aW9uID09IEF4aXNQb3NpdGlvbi5yaWdodCl7XHJcbiAgICAgICAgICAgIG9wcG9zZWRQb3NpdGlvbiA9IHRydWU7O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIFxyXG4gICAgICAgIGN1cnJlbnRBeGVzLnB1c2goe1xyXG4gICAgICAgICAgICBuYW1lOiBheGlzTmFtZSxcclxuICAgICAgICAgICAgb3Bwb3NlZFBvc2l0aW9uOiBvcHBvc2VkUG9zaXRpb24sXHJcbiAgICAgICAgICAgIG1ham9yR3JpZExpbmVzOiB7IHZpc2libGU6IGZhbHNlIH0sXHJcbiAgICAgICAgICAgIHJhbmdlOiB7bWluOiBheGlzTWluLCBtYXg6IGF4aXNNYXh9LFxyXG4gICAgICAgICAgICBvcmllbnRhdGlvbjogXCJ2ZXJ0aWNhbFwiXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fU0ZDaGFydC5vcHRpb24oXCJheGVzXCIsIGN1cnJlbnRBeGVzKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5fU0ZDaGFydC5tb2RlbC5heGVzLmxlbmd0aCA9PSAxKXtcclxuICAgICAgICAgICAgdGhpcy5fU0ZDaGFydC5tb2RlbC5tYXJnaW4ucmlnaHQgPSAxMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmVZQXhpcyhheGlzTmFtZSA6IHN0cmluZyl7XHJcbiAgICAgICAgLy9UT0RPOiBVcGRhdGUgc28gaXQgd29ya3MgZm9yIG1vcmUgdGhhbiAyIGF4aXNcclxuICAgICAgICBsZXQgaW5kZXg7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yIChsZXQgaT0wOyBpIDwgdGhpcy5fU0ZDaGFydC5tb2RlbC5heGVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYodGhpcy5fU0ZDaGFydC5tb2RlbC5heGVzW2ldLm5hbWUgPT09IGF4aXNOYW1lKXtcclxuICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpbmRleCA+IC0xKXtcclxuICAgICAgICAgICAgdGhpcy5fU0ZDaGFydC5tb2RlbC5heGVzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfSBcclxuICAgICAgICBlbHNlIGlmICh0aGlzLl9TRkNoYXJ0Lm1vZGVsLmF4ZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9TRkNoYXJ0Lm1vZGVsLnByaW1hcnlZQXhpcyA9IHRoaXMuX1NGQ2hhcnQubW9kZWwuYXhlc1swXTtcclxuICAgICAgICAgICAgdGhpcy5fU0ZDaGFydC5tb2RlbC5wcmltYXJ5WUF4aXMubWFqb3JHcmlkTGluZXMudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX1NGQ2hhcnQubW9kZWwucHJpbWFyeVlBeGlzLm9wcG9zZWRQb3NpdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9TRkNoYXJ0Lm1vZGVsLmF4ZXMgPSBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMuX1NGQ2hhcnQubW9kZWwuYXhlcy5sZW5ndGggPT0gMCl7XHJcbiAgICAgICAgICAgIHRoaXMuX1NGQ2hhcnQubW9kZWwubWFyZ2luLnJpZ2h0ID0gMTA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBzZXRZQXhpc09mZnNldChudW1iZXJPZkF4ZXM6IG51bWJlcil7XHJcbiAgICAgICAgaWYobnVtYmVyT2ZBeGVzID4gMCl7XHJcbiAgICAgICAgICAgIHRoaXMuX1NGQ2hhcnQubW9kZWwubWFyZ2luLnJpZ2h0ID0gMTAgKyAoNzEgKiBudW1iZXJPZkF4ZXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLl9TRkNoYXJ0Lm1vZGVsLm1hcmdpbi5yaWdodCA9IDEwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGdldENoYXJ0T2JqZWN0VW5kZXJNb3VzZShtb3VzZVg6IG51bWJlciwgbW91c2VZOiBudW1iZXIpIDogQ2hhcnRPYmplY3RJbmZvcm1hdGlvbntcclxuICAgICAgICBsZXQgY2hhcnRPYmplY3RVbmRlck1vdXNlID0gbmV3IENoYXJ0T2JqZWN0SW5mb3JtYXRpb24oQ2hhcnRPYmplY3RUeXBlLmVtcHR5U3BhY2UsIHt9KTtcclxuICAgIFxyXG4gICAgICAgIGxldCBheGlzQm91bmRzID0gQXJyYXk8QXhpc0JvdW5kcz4oKTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5fU0ZDaGFydC5tb2RlbC5fYXhlcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGF4aXNCb3VuZHMucHVzaCh0aGlzLmdldEF4aXModGhpcy5fU0ZDaGFydC5tb2RlbC5fYXhlc1tpXS5uYW1lKSEuZ2V0QXhpc0JvdW5kcygpKTtcclxuICAgICAgICB9XHJcbiAgICAgICBcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgYXhpc0JvdW5kcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKChtb3VzZVggLSBheGlzQm91bmRzW2ldLngpIDwgKGF4aXNCb3VuZHNbaV0ud2lkdGgpICYmIG1vdXNlWCA+IGF4aXNCb3VuZHNbaV0ueCl7XHJcbiAgICAgICAgICAgICAgICBpZigobW91c2VZIC0gYXhpc0JvdW5kc1tpXS55KSA8IChheGlzQm91bmRzW2ldLmhlaWdodCkgJiYgbW91c2VZID4gYXhpc0JvdW5kc1tpXS55KXtcclxuICAgICAgICAgICAgICAgICAgICBjaGFydE9iamVjdFVuZGVyTW91c2UgPSBuZXcgQ2hhcnRPYmplY3RJbmZvcm1hdGlvbihDaGFydE9iamVjdFR5cGUuYXhpcywge2F4aXM6IGF4aXNCb3VuZHNbaV0uYXhpc30pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY2hhcnRPYmplY3RVbmRlck1vdXNlO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IHtTRkNoYXJ0V3JhcHBlcn0iXX0=