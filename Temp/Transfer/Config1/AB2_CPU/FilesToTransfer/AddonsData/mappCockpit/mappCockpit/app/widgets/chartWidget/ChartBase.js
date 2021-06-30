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
define(["require", "exports", "../../core/interfaces/components/ui/chart/chartInterface", "../common/widgetBase", "./helpers/chartRangeHelper", "../../framework/events", "./userInteraction/userInteractionController", "../../models/common/point", "../common/states/cursorStates", "./cursor/CursorPositionInfo", "./chartViewSerie", "../../common/seriesHelper", "./chartWrapper/SFChartWrapper", "../../models/chartManagerDataModel/eventScaleDataChangedArgs", "./defaultComponentSettings", "../../common/componentBase/componentBase", "../../common/componentFactory/componentFactory"], function (require, exports, chartInterface_1, widgetBase_1, chartRangeHelper_1, events_1, userInteractionController_1, point_1, cursorStates_1, CursorPositionInfo_1, chartViewSerie_1, seriesHelper_1, SFChartWrapper_1, eventScaleDataChangedArgs_1, defaultComponentSettings_1, componentBase_1, componentFactory_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ChartObjectType;
    (function (ChartObjectType) {
        ChartObjectType[ChartObjectType["cursor"] = 0] = "cursor";
        ChartObjectType[ChartObjectType["series"] = 1] = "series";
        ChartObjectType[ChartObjectType["axis"] = 2] = "axis";
        ChartObjectType[ChartObjectType["chartSpace"] = 3] = "chartSpace";
        ChartObjectType[ChartObjectType["emptySpace"] = 4] = "emptySpace";
        ChartObjectType[ChartObjectType["invalid"] = 5] = "invalid";
    })(ChartObjectType || (ChartObjectType = {}));
    exports.ChartObjectType = ChartObjectType;
    var DropLocationType;
    (function (DropLocationType) {
        DropLocationType[DropLocationType["addNewScale"] = 0] = "addNewScale";
        DropLocationType[DropLocationType["assignToScale"] = 1] = "assignToScale";
        DropLocationType[DropLocationType["invalid"] = 2] = "invalid";
    })(DropLocationType || (DropLocationType = {}));
    exports.DropLocationType = DropLocationType;
    var ChartObjectInformation = /** @class */ (function () {
        function ChartObjectInformation(chartObjectType, args) {
            this.chartObjectType = chartObjectType;
            this.args = args;
        }
        return ChartObjectInformation;
    }());
    exports.ChartObjectInformation = ChartObjectInformation;
    var EventUserChartInteraction = /** @class */ (function (_super) {
        __extends(EventUserChartInteraction, _super);
        function EventUserChartInteraction() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventUserChartInteraction;
    }(events_1.TypedEvent));
    exports.EventUserChartInteraction = EventUserChartInteraction;
    ;
    var EventUserChartInteractionArgs = /** @class */ (function () {
        function EventUserChartInteractionArgs(chartInteractionType, eventArguments) {
            this.chartInteractionType = chartInteractionType;
            this.eventArguments = eventArguments;
        }
        return EventUserChartInteractionArgs;
    }());
    exports.EventUserChartInteractionArgs = EventUserChartInteractionArgs;
    var EventRedrawAllCharts = /** @class */ (function (_super) {
        __extends(EventRedrawAllCharts, _super);
        function EventRedrawAllCharts() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventRedrawAllCharts;
    }(events_1.TypedEvent));
    exports.EventRedrawAllCharts = EventRedrawAllCharts;
    ;
    var EventRedrawAllChartsArgs = /** @class */ (function () {
        function EventRedrawAllChartsArgs(chartType) {
            this.chartType = chartType;
        }
        return EventRedrawAllChartsArgs;
    }());
    exports.EventRedrawAllChartsArgs = EventRedrawAllChartsArgs;
    var ChartBase = /** @class */ (function (_super) {
        __extends(ChartBase, _super);
        function ChartBase(parentView, name, scale) {
            var _this = _super.call(this) || this;
            _this.widgetName = "";
            _this.textMeasurementCanvasId = "textMeasurementCanvas";
            _this.series = [];
            _this.hoveredSeries = [];
            _this.scales = [];
            //private keyEventsPlaced = false;
            // holds the current cursor states values. We initialize the member for default. The effective initialization takes place when the external shared instance
            // of the cursor states is created and reflected through the curorStates setter!
            _this._cursorStates = new cursorStates_1.CursorStates();
            _this.cursorHoverDistance = 8;
            _this.draggedSeriesIndex = 0;
            _this.axisBounds = [];
            _this.xAxisWidth = 0;
            _this.yAxisAlignmentOffset = 0;
            _this.flaggedForResize = false;
            if (_this.component == undefined) {
                // TODO: component should be set by component factory when charts can be created with component factory
                _this.component = new componentBase_1.ComponentBase(componentFactory_1.ComponentFactory.getInstance(), _this);
                _this.initializeComponent();
                _this.component.addDefaultComponentSettings();
            }
            _this.component.type = "ChartBase"; // TODO: Remove when chartbase(xychart, fftchart, ytchart) will be created with the component factory
            _this.component.id = name;
            _this.parentView = parentView;
            _this.widgetName = name;
            _this.scales.push(scale);
            _this.eventUserChartInteraction = new EventUserChartInteraction();
            _this.eventRedrawAllCharts = new EventRedrawAllCharts();
            return _this;
        }
        /**
         * Destroy object
         *
         * @memberof ChartBase
         */
        ChartBase.prototype.dispose = function () {
            // TODO: Dispose of CursorStates must be done globaly
            this.cursorsStates.dispose();
            var chartObj = $(this.cssParentContentId).data("ejChart");
            if (chartObj != undefined) {
                chartObj.destroy();
            }
            else {
                // TODO: dispose of this widget is called from splitter and also from the chartViewChartManager
                //console.warn("Dispose of chartObj(== undefined) not possible!");
            }
            _super.prototype.dispose.call(this);
        };
        ChartBase.prototype.initialized = function () {
            var _this = this;
            _super.prototype.initialized.call(this);
            var newChart = new SFChartWrapper_1.SFChartWrapper(this.cssParentContentId, this.scales[0], this.primaryXAxisName);
            newChart.eventAxisRangeChanged.attach(function (sender, args) { return _this.onAxisRangeChanged(sender, args); });
            newChart.eventMouseAction.attach(function (sender, args) { return _this.onMouseAction(sender, args); });
            newChart.eventMouseWheel.attach(function (sender, args) { return _this.onChartMouseWheel(sender, args); });
            this.chartInstance = newChart._SFChart;
            this.chart = newChart;
            this.setBoxZoom(false);
            //WE want to keep this for cursor movement later on
            // this.addKeyRelatedEvents();
        };
        ChartBase.prototype.initializeComponent = function () {
            this.component.defaultSettingsDataId = defaultComponentSettings_1.DefaultComponentSettings.WidgetDefinitionId;
            this.component.disablePersisting();
        };
        /**
         * Returns the default component settings for this widget
         *
         * @returns {(ComponentSettings|undefined)}
         * @memberof ChartBase
         */
        ChartBase.prototype.getDefaultComponentSettings = function () {
            return defaultComponentSettings_1.DefaultComponentSettings.getChartBaseDefinition();
        };
        Object.defineProperty(ChartBase.prototype, "cursorsStates", {
            /**
             * Gets the cursors states
             *
             * @protected
             * @type {TCursorStates}
             * @memberof ChartBase
             */
            get: function () {
                return this._cursorStates;
            },
            /**
             * Sets the cursors states. The method is called automatically whenever a cursor state has been changed externally.
             *
             * @protected
             * @memberof ChartBase
             */
            set: function (cursorStates) {
                // update the backup field
                this._cursorStates = cursorStates;
                this.updateUICursors(cursorStates);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Updates the cursor states.
         *
         * @protected
         * @param {CursorStates} cursorStates
         * @memberof ChartBase
         */
        ChartBase.prototype.updateCursorStates = function (cursorStates) {
            // BINDINGSOURCE: dispatches the method call to bound targets
        };
        ChartBase.prototype.onAxisRangeChanged = function (sender, args) {
            for (var i = 0; i < args.axisIDs.length; i++) {
                var scale = void 0;
                //Workaround until X-Axis handling is implemented correct
                if (args.axisIDs[i] != this.primaryXAxisName) {
                    scale = this.getScaleByScaleId(args.axisIDs[i]);
                }
                else {
                    scale = this.scales[0];
                }
                if (scale != undefined) {
                    var axis = sender;
                    var range = axis.getAxisRange();
                    if (axis.getAxisOrientation() == chartInterface_1.AxisOrientation.horizontal) {
                        this.setScaleRange(scale, range.min, range.max, scale.minYValue, scale.maxYValue, "", false);
                        if (args.syncAxis == true) {
                            this.eventRedrawAllCharts.raise(this, new EventRedrawAllChartsArgs(this.type));
                        }
                    }
                    else {
                        this.setScaleRange(scale, scale.minXValue, scale.maxXValue, range.min, range.max, "", false);
                    }
                }
            }
            if (args.forceRedraw == true) {
                this.redrawChart();
            }
        };
        /**
         *
         *
         * @param {number} mouseX
         * @param {number} mouseY
         * @returns {ChartObjectInformation}
         * @memberof ChartBase
         */
        ChartBase.prototype.getChartObjectUnderMouse = function (mouseX, mouseY) {
            this.calculateChartDimensions();
            if (this.mouseIsInChartBounds(mouseX, mouseY)) {
                var index = this.cursorsStates.getHoveredCursorIndex();
                if (index !== -1) {
                    //TODO: might be better to use cursor instance instead of index
                    return new ChartObjectInformation(ChartObjectType.cursor, { cursorIndex: index });
                }
                return new ChartObjectInformation(ChartObjectType.chartSpace, {});
            }
            for (var i = 0; i < this.axisBounds.length; i++) {
                if ((mouseX - this.axisBounds[i].x) < (this.axisBounds[i].width) && mouseX > this.axisBounds[i].x) {
                    if ((mouseY - this.axisBounds[i].y) < (this.axisBounds[i].height) && mouseY > this.axisBounds[i].y) {
                        var axis = this.chart.getAxis(this.axisBounds[i].axis.name);
                        return new ChartObjectInformation(ChartObjectType.axis, { axis: axis });
                    }
                }
            }
            return new ChartObjectInformation(ChartObjectType.emptySpace, {});
        };
        /**
         *
         *
         * @private
         * @memberof ChartBase
         */
        ChartBase.prototype.calculateChartDimensions = function () {
            this.axisBounds = [];
            for (var i = 0; i < this.scales.length; i++) {
                var axis_1 = this.chart.getAxis(this.scales[i].id);
                if (axis_1 != undefined) {
                    this.axisBounds.push(axis_1.getAxisBounds());
                }
            }
            var axis = this.chart.getAxis(this.primaryXAxisName);
            if (axis != undefined) {
                this.axisBounds.push(axis.getAxisBounds());
            }
        };
        ChartBase.prototype.onMouseAction = function (sender, args) {
            switch (args.mouseActionType) {
                case userInteractionController_1.MouseActionType.mouseDown: {
                    this.onChartMouseDown(sender, args);
                    break;
                }
                case userInteractionController_1.MouseActionType.mouseUp: {
                    this.onChartMouseUp(sender, args);
                    break;
                }
                case userInteractionController_1.MouseActionType.mouseMove: {
                    this.onChartMouseMove(sender, args);
                    break;
                }
            }
        };
        /**
         *
         *
         * @private
         * @param {*} args
         * @memberof ChartBase
         */
        ChartBase.prototype.onChartMouseDown = function (sender, args) {
            args.objectUnderMouse = this.getChartObjectUnderMouse(args.mousePoint.x, args.mousePoint.y);
            var eventUserChartInteractionArgs;
            eventUserChartInteractionArgs = new EventUserChartInteractionArgs(userInteractionController_1.MouseActionType.mouseDown, args);
            this.eventUserChartInteraction.raise(this, eventUserChartInteractionArgs);
        };
        ;
        /**
         *
         *
         * @private
         * @param {*} args
         * @memberof ChartBase
         */
        ChartBase.prototype.onChartMouseUp = function (sender, args) {
            args.objectUnderMouse = this.getChartObjectUnderMouse(args.mousePoint.x, args.mousePoint.y);
            var eventUserChartInteractionArgs;
            eventUserChartInteractionArgs = new EventUserChartInteractionArgs(userInteractionController_1.MouseActionType.mouseUp, args);
            this.eventUserChartInteraction.raise(this, eventUserChartInteractionArgs);
        };
        ;
        /**
         *
         *
         * @private
         * @param {*} args
         * @memberof ChartBase
         */
        ChartBase.prototype.onChartMouseMove = function (sender, args) {
            var chartObjectUnderMouse = this.getChartObjectUnderMouse(args.mousePoint.x, args.mousePoint.y);
            args.objectUnderMouse = chartObjectUnderMouse;
            var eventUserChartInteractionArgs;
            eventUserChartInteractionArgs = new EventUserChartInteractionArgs(userInteractionController_1.MouseActionType.mouseMove, args);
            this.eventUserChartInteraction.raise(this, eventUserChartInteractionArgs);
        };
        ;
        /**
         * This method is called by the InteractionStratetgies when a click in the
         * chart has been made.
         *
         * @memberof ChartBase
         */
        ChartBase.prototype.setCursorOnPointerPosition = function (mousePoint) {
            this.setCursor(mousePoint.x, mousePoint.y);
            this.checkCursorsHovering(mousePoint);
        };
        /**
         * Internal method for actually moving the cursors. Overwritten in FFTChart.ts
         *
         * @protected
         * @param {number} x
         * @param {number} y
         * @returns
         * @memberof ChartBase
         */
        ChartBase.prototype.setCursor = function (x, y) {
            if (!this.series.length) {
                return;
            }
            this.cursorsStates.setLastCursorTypeSelected(cursorStates_1.CursorType.timeDomain);
            var hoveredCursorIndex = this.cursorsStates.getHoveredCursorIndex();
            if (hoveredCursorIndex != -1) { // Set selected cursor when hovered cursor was found
                this.cursorsStates.setSelected(hoveredCursorIndex, true);
            }
            else {
                this.cursorsStates.setSelected(this.cursorsStates.getSelectedCursorIndex(), true);
            }
            this.updateSelectedCursor(this.cursorsStates, x, y);
        };
        /**
         * Pass the x and y position on the property and this method will figure out where to
         * place the cursors and update the states accordingly
         *
         * @protected
         * @param {CursorStates} cursorsStates
         * @param {number} x
         * @param {number} y
         * @memberof ChartBase
         */
        ChartBase.prototype.updateSelectedCursor = function (cursorsStates, x, y) {
            var point = this.getChartCoordinateFromPixel(this.primaryXAxisName, this.scales[0].id, x, y);
            var nearestTimestampFromAllSeries = this.getTimestampInSeries(point, this.series);
            cursorsStates.setActive(cursorsStates.getSelectedCursorIndex(), true);
            cursorsStates.setPosition(cursorsStates.getSelectedCursorIndex(), nearestTimestampFromAllSeries);
            cursorsStates.setHovered(cursorsStates.getSelectedCursorIndex(), this.getSerieCursorType(), false);
            this.updateCursorStates(cursorsStates);
        };
        /**
         * Internal method for actually moving the cursors. Pass the x and y
         * position on the property and this method will figure out where to
         * place the cursors and update the states accordingly
         *
         * @private
         * @param {number} x
         * @param {number} y
         * @returns
         * @memberof ChartBase
         */
        ChartBase.prototype.dragCursorAlongLine = function (x, y) {
            if (!this.series.length) {
                return;
            }
            if (this.hoveredSeries.length != 0) {
                var point = this.getChartCoordinateFromPixel(this.primaryXAxisName, this.scales[0].id, x, y);
                var nearestTimestampFromSingleSeries = this.getTimestampInSeries(point, this.hoveredSeries);
                this.cursorsStates.setPosition(this.cursorsStates.getSelectedCursorIndex(), nearestTimestampFromSingleSeries);
            }
            this.updateCursorStates(this.cursorsStates);
        };
        /**
         * This method is called by the userInteraction stragetgy whenever
         * the mouse is moved across a chart. If the mouse is above a cursor
         * this cursor updates it's own state to HOVERING and once it is no
         * longer below the mouse it will reset to it's previous state if the
         * cursor was selected or it will be set to DESELCTED if it wasn't.
         *
         * @memberof ChartBase
         */
        ChartBase.prototype.checkCursorsHovering = function (mousePoint) {
            if (this.cursorHandler != undefined) {
                var chartArea = this.chart.getChartArea();
                var actualMousePoint = new point_1.Point(mousePoint.x - chartArea.x, mousePoint.y - chartArea.y);
                var selectedCursorIndex = this.cursorsStates.getSelectedCursorIndex();
                var closestCursorPosition = this.cursorHandler.getClosestCursorPositionToPoint(actualMousePoint, selectedCursorIndex);
                if (closestCursorPosition != undefined) {
                    var distanceToCursor = closestCursorPosition.additionalInformation["distance"];
                    this.hoveredSeries = [];
                    var closestCursorIndex = void 0;
                    if (distanceToCursor < this.cursorHoverDistance) {
                        closestCursorPosition.additionalInformation["highlight"] = true;
                        closestCursorIndex = closestCursorPosition.additionalInformation["cursorIndex"];
                        this.hoveredSeries = closestCursorPosition.additionalInformation["series"];
                    }
                    //let newCursorState = ObjectX.clone<CursorStates>(CursorStates.constructor, this.cursorsStates);
                    //newCursorState = this.updateHoveringStatesInCursors(newCursorState, closestCursorIndex);     
                    //this.updateCursorStates(newCursorState);
                    this.cursorsStates = this.updateHoveringStatesInCursors(this.cursorsStates, closestCursorIndex);
                    this.updateCursorStates(this.cursorsStates);
                }
            }
        };
        ChartBase.prototype.getSerieCursorType = function () {
            if (this.series.length > 0) {
                return this.series[0].serie.cursorType;
            }
            else {
                return undefined;
            }
        };
        /**
         * Reset cursor states with the given cursor type
         *
         * @param {CursorType} cursorType
         * @memberof ChartBase
         */
        ChartBase.prototype.resetCursorStates = function (cursorType) {
            this.cursorsStates.resetCursorStates(cursorType);
        };
        /**
         * Reset hovering of all cursors when mouse is outside of the charts
         *
         * @memberof ChartBase
         */
        ChartBase.prototype.resetCursorsHovered = function () {
            var hoveredCursor = this.cursorsStates.getHoveredCursorIndex();
            //If any cursor is hovered, reset all
            if (hoveredCursor !== -1) {
                this.cursorsStates = this.updateHoveringStatesInCursors(this.cursorsStates, undefined);
                this.updateCursorStates(this.cursorsStates);
            }
        };
        /**
         * Internal method to calculate the state which is to be updated in the
         * states to be HOVERING. This method will also reset the correct states
         * to it's previous values if non of the cursors are hovering.
         *
         * @private
         * @param {CursorStates} cursorStates
         * @param {number} closestIndex
         * @returns {CursorStates}
         * @memberof ChartBase
         */
        ChartBase.prototype.updateHoveringStatesInCursors = function (cursorStates, closestIndex) {
            if (closestIndex !== undefined) {
                // Index of cursor found => set hovered flag
                cursorStates.setHovered(closestIndex, this.getSerieCursorType(), true);
            }
            else {
                // No index of cursor found => reset all hovered flags of all cursors
                cursorStates.setHovered(-1, this.getSerieCursorType(), false);
            }
            return cursorStates;
        };
        /**
         * Calculate zoom on mousewheel action
         *
         * @param {*} args
         * @memberof ChartBase
         */
        ChartBase.prototype.onChartMouseWheel = function (sender, args) {
            args.objectUnderMouse = this.getChartObjectUnderMouse(args.mousePoint.x, args.mousePoint.y);
            var eventUserChartInteractionArgs;
            eventUserChartInteractionArgs = new EventUserChartInteractionArgs(userInteractionController_1.MouseActionType.mouseWheel, args);
            this.eventUserChartInteraction.raise(this, eventUserChartInteractionArgs);
        };
        ;
        /**
         * Get if mouse is inside chart bounds
         *
         * @private
         * @param {*} mouseX
         * @param {*} mouseY
         * @returns {boolean}
         * @memberof ChartBase
         */
        ChartBase.prototype.mouseIsInChartBounds = function (mouseX, mouseY) {
            var isInBounds = true;
            var chartArea = this.chart.getChartArea();
            if (mouseX < chartArea.x || mouseX > (chartArea.x + chartArea.width)) {
                isInBounds = false;
            }
            if (mouseY < chartArea.y || mouseY > (chartArea.y + chartArea.height)) {
                isInBounds = false;
            }
            return isInBounds;
        };
        /**
         * Resize chart
         *
         * @param {*} width
         * @param {*} height
         * @memberof ChartBase
         */
        ChartBase.prototype.resize = function (width, height) {
            this.resizeChart(height, width);
        };
        /**
         * Resize Chart only if needed
         *
         * @private
         * @param {*} width
         * @param {*} height
         * @param {*} width
         * @memberof ChartBase
         */
        ChartBase.prototype.resizeChart = function (height, width) {
            if (this.flaggedForResize || this._actualHeight != height || this._actualWidth != width) {
                this._actualHeight = height, this._actualWidth = width;
                width = width - this.yAxisAlignmentOffset;
                this.chart.resize(height, width);
                this.redrawChart();
            }
        };
        /**
         * Redraws chart
         *
         * @param {boolean}
         * @memberof ChartBase
         */
        ChartBase.prototype.redrawChart = function () {
            this.chart.redraw();
            if (this.cursorHandler != undefined) {
                this.cursorHandler.updateChartArea(this.chart.getChartArea());
            }
            this.repositionCursors();
        };
        /**
         * Adds a given serie into a chart
         *
         * @param {Array<BaseSeries>} series
         * @param {Scale} scale
         * @memberof ChartBase
         */
        ChartBase.prototype.addSeriesToChart = function (series, yScale, updateRangeX) {
            for (var i = 0; i < series.length; i++) {
                if (series[i].rawPointsValid == true && this.series.map(function (e) { return e.serie; }).indexOf(series[i]) == -1) {
                    var chartSeries = new chartViewSerie_1.ChartViewSerie(series[i], yScale);
                    this.series.push(chartSeries);
                }
            }
        };
        /**
         * Remove a given serie from the chart
         *
         * @param {BaseSeries} serie
         * @param {boolean} resetCursorStates
         * @memberof ChartBase
         */
        ChartBase.prototype.removeSerieFromChart = function (serie, resetCursorStates) {
            var index = this.serieInChart(serie);
            var cursorType = this.getSerieCursorType();
            if (index > -1) {
                this.series.splice(index, 1);
            }
            this.setAvailableSeriesAsDataSource();
            //Reset cursor states if there are no more series in the chartView with the corresponding cursor type
            if (resetCursorStates) {
                this.resetCursorStates(cursorType);
            }
            //redraw cursors
            var states = this.getUsedCursorStates();
            for (var i = 0; i < states.length; i++) {
                var timestamp = states[i].position;
                this.drawCursor(timestamp, i, states[i].hovered, states[i].selected);
            }
        };
        ;
        /**
         *
         *
         * @private
         * @param {*} serie
         * @returns
         * @memberof ChartBase
         */
        ChartBase.prototype.serieInChart = function (serie) {
            for (var i = 0; i < this.series.length; i++) {
                if (this.series[i].id == serie.id) {
                    return i;
                }
            }
            return -1;
        };
        ChartBase.prototype.setZoomAxes = function (zoomAxes) {
            this.chart.setZoomDirection(zoomAxes);
        };
        ChartBase.prototype.setPanning = function (enable) {
            this.chart.enablePanning(enable);
        };
        /**
         * Panning operation
         *
         * @param {*} pageX
         * @param {*} pageY
         * @memberof ChartBase
         */
        ChartBase.prototype.doPanning = function (pageX, pageY) {
            this.chart.doPanning(pageX, pageY);
            //this.chartManager.redrawCharts();
            this.eventRedrawAllCharts.raise(this, new EventRedrawAllChartsArgs(this.type));
        };
        ChartBase.prototype.resetPanningCoords = function () {
            //TODO: this is a only workaround, needs to be fixed 
            this.chart.prevPanningCoords = { 'x': undefined, 'y': undefined };
        };
        /**
         * Enables box zooming
         *
         * @param {boolean} enable
         * @memberof ChartBase
         */
        ChartBase.prototype.setBoxZoom = function (enable) {
            this.chart.enableBoxZoom(enable);
        };
        /**
         *Draw the cursor defined by its index for a given timestamp
         *
         * @private
         * @param {number} timestamp
         * @param {number} cursorIndex
         * @param {boolean} hovered
         * @param {boolean} selected
         * @returns
         * @memberof ChartBase
         */
        ChartBase.prototype.drawCursor = function (timestamp, cursorIndex, hovered, selected) {
            if (this.cursorHandler != undefined) {
                var leadCursorPixelPosition = void 0;
                var leadCursorTimestamp = void 0;
                //the cursorPosition for each serie is stored in an array
                var cursorPositions = [];
                //if the given timestamp is outside of the series bounds, the cursor must not be drawn at all
                var cursorOutOfSeriesBounds = true;
                for (var seriesIndex = 0; seriesIndex < this.series.length; seriesIndex++) {
                    if (timestamp >= this.series[seriesIndex].serie.timestamps[0] && timestamp <= this.series[seriesIndex].serie.timestamps[this.series[seriesIndex].serie.timestamps.length - 1]) {
                        cursorOutOfSeriesBounds = false;
                    }
                }
                if (cursorOutOfSeriesBounds == false) {
                    //leadCursorPosition has to be converted to pixels to be drawn
                    leadCursorPixelPosition = this.getPixelsFromChartPoint(timestamp, 0, this.primaryYAxisName);
                    //leadCursorTimestamp is needed to calculate the cursor positions for the other series (might be different from the timestamp argument)
                    leadCursorTimestamp = timestamp; //this.getTimestampInSeries(leadCursorChartPoint, allSeries);
                    //the cursor positions are calculated for each series to draw the squares for the timestamp indicator
                    cursorPositions = [];
                    for (var seriesIndex = 0; seriesIndex < this.series.length; seriesIndex++) {
                        //only draw the cursor for a series when it is within the series bounds of that chart
                        if (leadCursorTimestamp >= this.series[seriesIndex].serie.timestamps[0] && leadCursorTimestamp <= this.series[seriesIndex].serie.timestamps[this.series[seriesIndex].serie.timestamps.length - 1]) {
                            var cursorChartPoint = this.getCursorPoint(timestamp, this.series, seriesIndex);
                            var scaleId = this.getScaleIDForSeries(this.series[seriesIndex].serie);
                            var cursorPosition = this.getPixelsFromChartPoint(cursorChartPoint.x, cursorChartPoint.y, scaleId);
                            //set highlight to true if cursor is hovered and if its series is currently selected
                            var highlightCursor = false;
                            if (this.hoveredSeries.indexOf(this.series[seriesIndex]) != -1 && hovered && (this.series.length != this.hoveredSeries.length || this.hoveredSeries.length == 1)) {
                                highlightCursor = true;
                            }
                            cursorPositions.push(new CursorPositionInfo_1.CursorPosition(cursorPosition, { selected: selected, hovered: hovered, highlight: highlightCursor, series: [this.series[seriesIndex]], cursorIndex: cursorIndex }));
                        }
                    }
                }
                var leadCursorPosition = new CursorPositionInfo_1.CursorPosition(leadCursorPixelPosition, { selected: selected, hovered: hovered, series: this.series, cursorIndex: cursorIndex });
                this.cursorHandler.drawCursor(leadCursorPosition, cursorPositions, cursorIndex);
            }
        };
        ChartBase.prototype.getScaleIDForSeries = function (series) {
            for (var i = 0; i < this.scales.length; i++) {
                if (this.scales[i].hasSerie(series)) {
                    return this.scales[i].id;
                }
            }
            return "";
        };
        ChartBase.prototype.getScaleByScaleId = function (scaleId) {
            for (var i = 0; i < this.scales.length; i++) {
                if (scaleId == this.scales[i].id) {
                    return this.scales[i];
                }
            }
        };
        ChartBase.prototype.autoScaleYScales = function () {
            var scales = this.getYScales();
            var chartMinYPixel;
            var chartMaxYPixel;
            for (var _i = 0, scales_1 = scales; _i < scales_1.length; _i++) {
                var scale = scales_1[_i];
                var seriesMinY = this.getSeriesMinYForScale(scale);
                var seriesMaxY = this.getSeriesMaxYForScale(scale);
                if (seriesMinY != undefined && seriesMaxY != undefined) {
                    var axisMinYPixel = this.calculatePixelY(scale.id, seriesMinY);
                    var axisMaxYPixel = this.calculatePixelY(scale.id, seriesMaxY);
                    if (chartMinYPixel == undefined || axisMinYPixel > chartMinYPixel) {
                        chartMinYPixel = axisMinYPixel;
                    }
                    if (chartMaxYPixel == undefined || axisMaxYPixel < chartMaxYPixel) {
                        chartMaxYPixel = axisMaxYPixel;
                    }
                }
            }
            if (chartMinYPixel != undefined && chartMaxYPixel != undefined) {
                for (var _a = 0, scales_2 = scales; _a < scales_2.length; _a++) {
                    var scale = scales_2[_a];
                    var newAxisMinValue = this.getChartCoordinateFromPixel(this.primaryXAxisName, scale.id, 0, chartMinYPixel).y;
                    var newAxisMaxValue = this.getChartCoordinateFromPixel(this.primaryXAxisName, scale.id, 0, chartMaxYPixel).y;
                    this.updateRangeY(scale, newAxisMinValue, newAxisMaxValue);
                }
            }
        };
        /**
         * Sets the range for X Axis
         *
         * @param {number} newMinX
         * @param {number} newMaxX
         * @memberof ChartBase
         */
        ChartBase.prototype.setRangeX = function (newMinX, newMaxX) {
            this.scales[0].minXValue = newMinX;
            this.scales[0].maxXValue = newMaxX;
            //Trigger event so axis range can be persisted when 'AutoScale' or 'Reset All'  
            var args = new eventScaleDataChangedArgs_1.EventScaleDataChangedArgs(eventScaleDataChangedArgs_1.ScaleAction.xRangeChanged, { scale: this.scales[0] });
            this.scales[0].eventDataChanged.raise(this.scales[0], args);
            var axis = this.chart.getAxis(this.primaryXAxisName);
            if (axis != undefined) {
                axis.setAxisRange({ min: newMinX, max: newMaxX });
            }
        };
        /**
         *  Sets the range of this chart for the given axis and min/max values
         *
         *
         * @param {Scale} scale
         * @param {number} minXValue
         * @param {number} maxXValue
         * @param {number} minYValue
         * @param {number} maxYValue
         * @param {boolean} [setAxisRange=true]
         * @memberof ChartBase
         */
        ChartBase.prototype.setScaleRange = function (scale, minXValue, maxXValue, minYValue, maxYValue, orientation, setAxisRange) {
            if (setAxisRange === void 0) { setAxisRange = true; }
            scale.setScaleRange(minXValue, maxXValue, minYValue, maxYValue);
            if (setAxisRange) {
                var axis = this.chart.getAxis(scale.id);
                if (axis != undefined) {
                    axis.setAxisRange({ min: scale.minYValue, max: scale.maxYValue });
                }
            }
        };
        /**
         * Update Y range
         *
         * @private
         * @param {Scale} scale
         * @param {number} yAxisMaxValue
         * @param {number} yAxisMinValue
         * @memberof ChartBase
         */
        ChartBase.prototype.updateRangeY = function (scale, yAxisMinValue, yAxisMaxValue) {
            var chartRangeHelper = new chartRangeHelper_1.ChartRangeHelper;
            if (!isNaN(yAxisMaxValue) || !isNaN(yAxisMinValue)) {
                yAxisMaxValue = Number(yAxisMaxValue.toPrecision(14));
                yAxisMinValue = Number(yAxisMinValue.toPrecision(14));
                var yAxisRange = yAxisMaxValue - yAxisMinValue;
                var yAxisOffset = void 0;
                if (yAxisRange == 0) {
                    //if range is zero, we have to calculate an arbitrary offset to display the y axis correctly
                    yAxisOffset = chartRangeHelper.getAxisOffsetForStraightLines(yAxisMinValue);
                }
                else {
                    var axis = this.chart.getAxis(scale.id);
                    if (axis != undefined) {
                        var pixelRange = axis.getAxisRangeInPixel();
                        yAxisOffset = chartRangeHelper.getAxisOffset(yAxisRange, (pixelRange.max - pixelRange.min));
                    }
                }
                yAxisMaxValue += yAxisOffset;
                yAxisMinValue -= yAxisOffset;
                yAxisRange = yAxisMaxValue - yAxisMinValue;
                this.setScaleRange(scale, scale.minXValue, scale.maxXValue, yAxisMinValue, yAxisMaxValue);
            }
        };
        /**
         * Get min Y value from all the series in the chart
         *
         * @private
         * @param {Scale} scale
         * @returns {(number|undefined)}
         * @memberof ChartBase
         */
        ChartBase.prototype.getSeriesMinYForScale = function (scale) {
            var minY = undefined;
            for (var i = 0; i < scale.childs.length; i++) {
                if (minY == undefined || scale.childs[i].minY < minY) {
                    minY = scale.childs[i].minY;
                }
            }
            return minY;
        };
        /**
         * Get max Y value from all the series on the axis
         *
         * @private
         * @param {Scale} scale
         * @returns {(number|undefined)}
         * @memberof ChartBase
         */
        ChartBase.prototype.getSeriesMaxYForScale = function (scale) {
            var maxY = undefined;
            for (var i = 0; i < scale.childs.length; i++) {
                if (maxY == undefined || scale.childs[i].maxY > maxY) {
                    maxY = scale.childs[i].maxY;
                }
            }
            return maxY;
        };
        /**
         * Updates the available ui cursors according to the current state in response to a state change.
         *
         * @private
         * @param {CursorStates} modifiedState
         * @memberof ChartBase
         */
        ChartBase.prototype.updateUICursors = function (modifiedState) {
            try {
                var serieCursorType = this.getSerieCursorType();
                var cursorTimeStates = modifiedState.getTimeStates();
                var cursorFreqStates = modifiedState.getFrequencyStates();
                if (serieCursorType == cursorStates_1.CursorType.timeDomain) {
                    this.updateCursorLoations(cursorTimeStates);
                }
                else if (serieCursorType == cursorStates_1.CursorType.frequencyDomain) {
                    this.updateCursorLoations(cursorFreqStates);
                }
            }
            catch (error) {
                // the try catch block fixes an incorrect sequence when closing and reopening the analysis view as a workaround until
                // the binding connections will be cleaned up correctly.
                console.warn("ChartBase.updateUICursors: cursors could not be updated because of exception %o", error);
            }
        };
        ChartBase.prototype.updateCursorLoations = function (cursorStates) {
            for (var index = 0; index < cursorStates.length; index++) {
                // this.setCursorState(index, cursorStates[index]);
                // update the cursors only if they have a valid position
                var position = cursorStates[index].position;
                if (position != undefined) {
                    this.drawCursor(position, index, cursorStates[index].hovered, cursorStates[index].selected);
                }
            }
        };
        /**
         *
         *
         * @private
         * @returns
         * @memberof ChartBase
         */
        ChartBase.prototype.getMinXAxisValue = function () {
            var axis = this.chart.getAxis(this.primaryXAxisName);
            if (axis != undefined) {
                return axis.getAxisRange().min;
            }
        };
        /**
         *
         *
         * @private
         * @returns
         * @memberof ChartBase
         */
        ChartBase.prototype.getMaxXAxisValue = function () {
            var axis = this.chart.getAxis(this.primaryXAxisName);
            if (axis != undefined) {
                return axis.getAxisRange().max;
            }
        };
        /**
         *
         *
         * @private
         * @param {number} x
         * @param {number} y
         * @returns {{ x: number, y: number}}
         * @memberof ChartBase
         */
        ChartBase.prototype.getPixelsFromChartPoint = function (x, y, scaleID) {
            var chartArea = this.chart.getChartArea();
            return { x: this.calculatePixelX(x) - chartArea.x, y: this.calculatePixelY(scaleID, y) - chartArea.y };
        };
        /**
         * We reposition the cursors aswell when we update the chart
         *
         * @private
         * @memberof ChartBase
         */
        ChartBase.prototype.repositionCursors = function () {
            // Force updating the cursors states which in response updates the cursor ui ....
            this.updateCursorStates(this.cursorsStates);
        };
        /**
         *
         *
         * @private
         * @param {number} chartX
         * @returns
         * @memberof ChartBase
         */
        ChartBase.prototype.calculatePixelX = function (chartX) {
            var minX = this.getMinXAxisValue();
            var maxX = this.getMaxXAxisValue();
            if (maxX != undefined && minX != undefined) {
                var range = (maxX - minX);
                var startX = minX;
                var actualRange = range;
                var timePercentage = (chartX - startX) / actualRange;
                var chartArea = this.chart.getChartArea();
                return chartArea.x + chartArea.width * timePercentage;
            }
            return 0;
        };
        /**
         *
         *
         * @private
         * @param {number} chartY
         * @returns
         * @memberof ChartBase
         */
        ChartBase.prototype.calculatePixelY = function (scaleID, chartY) {
            var axis = this.chart.getAxis(scaleID);
            if (axis != undefined) {
                var axisRange = axis.getAxisRange();
                var range = void 0;
                if (axisRange.delta != undefined) {
                    range = axisRange.delta;
                }
                else {
                    range = axisRange.max - axisRange.min;
                }
                var startY = axisRange.min;
                var valuePercentage = 1 - ((chartY - startY) / range);
                var chartArea = this.chart.getChartArea();
                return chartArea.y + chartArea.height * valuePercentage;
            }
            return 0;
        };
        /**
         * Remove drop locations from the chart
         *
         * @memberof ChartBase
         */
        ChartBase.prototype.removeSerieDropLocations = function () {
            for (var _i = 0, _a = this.axisBounds; _i < _a.length; _i++) {
                var axisBound = _a[_i];
                $(this.cssParentContentId + '_axisDropZone' + axisBound.axis.name).remove();
            }
            $(this.cssParentContentId + '_axisDropZone' + "_chartArea").remove();
        };
        /**
         * Get number of y axes inside a chart
         *
         * @returns {number}
         * @memberof ChartBase
         */
        ChartBase.prototype.getNumberOfYScales = function () {
            return this.scales.length;
        };
        /**
         * Get all y axes from a chart
         *
         * @returns {Scale[]}
         * @memberof ChartBase
         */
        ChartBase.prototype.getYScales = function () {
            return this.scales;
        };
        /**
         *
         *
         * @protected
         * @param {number} pixelCoordinateX
         * @param {number} pixelCoordinateY
         * @returns
         * @memberof XYChart
         */
        ChartBase.prototype.getChartCoordinateFromPixel = function (scaleIDX, scaleIDY, pixelCoordinateX, pixelCoordinateY) {
            var chartArea = this.chart.getChartArea();
            var xAxis = this.chart.getAxis(scaleIDX);
            var yAxis = this.chart.getAxis(scaleIDY);
            var yAxisRange = yAxis.getAxisRange();
            var xAxisRange = xAxis.getAxisRange();
            // X Axis: 
            var relativePixelCoordinateX = Big(pixelCoordinateX).minus(Big(chartArea.x));
            var chartAxisXRange = Big(xAxisRange.max).minus(Big(xAxisRange.min));
            var chartCoordinatePerPixel = chartAxisXRange.div(Big(chartArea.width));
            var closestXAxisValueToClick = Big(xAxisRange.min).plus((relativePixelCoordinateX.times(chartCoordinatePerPixel)));
            // Y Axis: 
            var relativePixelCoordinateY = Big(pixelCoordinateY).minus(Big(chartArea.y));
            var chartAxisYRange = Big(yAxisRange.max).minus(Big(yAxisRange.min));
            chartCoordinatePerPixel = chartAxisYRange.div(Big(chartArea.height));
            var closestYAxisValueToClick = Big(yAxisRange.min).plus(chartAxisYRange.minus(relativePixelCoordinateY.times(chartCoordinatePerPixel)));
            var closestYAxisValueNumber = Number(closestYAxisValueToClick.toFixed(14));
            var closestXAxisValueNumber = Number(closestXAxisValueToClick.toFixed(14));
            return new point_1.Point(closestXAxisValueNumber, closestYAxisValueNumber);
        };
        /**
         * gets a series point in chart coordinates for the specefied timestamp
         *
         * @protected
         * @param {number} timestamp
         * @returns {Point}
         * @memberof YTChart
         */
        ChartBase.prototype.getSeriesPointFromTimestamp = function (timestamp) {
            // we provide y == 0 if we are not able to find matching points
            var seriesPoint = new point_1.Point(timestamp, 0);
            // skip searching if the series index is out of range
            if (this.series.length == 0)
                return seriesPoint;
            // find a matching series point related to the timestamp
            seriesPoint = this.findNearestPointInAllSeries(timestamp);
            return seriesPoint;
        };
        /**
         * Searches for the nearest point related to the timestamp in all series
         *
         * @private
         * @param {number} timestamp
         * @returns
         * @memberof ChartBase
         */
        ChartBase.prototype.findNearestPointInAllSeries = function (timestamp) {
            // collect the nearest points from every series
            var nearestSeriesPoints = this.series.map(function (singleSeries) { return singleSeries.serie.pointFromTimestamp(timestamp); });
            // sort the nearest points by their timestamp value
            nearestSeriesPoints.sort(function (value1, value2) { return value1.x - value2.x; });
            // get the timestamp values
            var nearestSeriesTimestamps = nearestSeriesPoints.map(function (seriesPoint) { return seriesPoint.x; });
            // find the nearest point from all series. The found index refers to the nearest series !
            var nearestSeriesIndex = seriesHelper_1.SeriesHelper.indexOfNearest(timestamp, nearestSeriesTimestamps);
            // get the nearest point from the series
            var seriesPointFromTimeStamp = nearestSeriesPoints[nearestSeriesIndex];
            // create a point instance with a matching timestamp
            var seriesPoint = seriesPointFromTimeStamp ? new point_1.Point(seriesPointFromTimeStamp.x, seriesPointFromTimeStamp.y) : new point_1.Point(timestamp, 0);
            return seriesPoint;
        };
        /**
     * Create property containing data to be drawn
     *
     * @private
     * @param {BaseSeries} serie
     * @param {string} axisID
     * @returns {{}}
     * @memberof BasicChart
     */
        ChartBase.prototype.createTraceDataSeries = function (serie, axisID) {
            var properties = {
                name: serie.id,
                type: 'line',
                dataSource: serie.data,
                xName: "x",
                yName: "y",
                fill: serie.color,
                yAxisName: axisID,
                _yAxisName: axisID,
            };
            return properties;
        };
        // --------------------------------------------------- Overload methods in derived chart --------------------------------------------------- //
        ChartBase.prototype.removeYScaleFromChart = function (yScale) { };
        ;
        ChartBase.prototype.onSynchronizeScaleRange = function (scale, min, max) { };
        ChartBase.prototype.setAvailableSeriesAsDataSource = function () { };
        ChartBase.prototype.updateChartRangeX = function (xAxisMinValue, xAxisMaxValue) {
            var chartRangeHelper = new chartRangeHelper_1.ChartRangeHelper();
            if (xAxisMaxValue != undefined && xAxisMinValue != undefined) {
                var xAxisSegmentRange = xAxisMaxValue - xAxisMinValue;
                var xAxisOffset = void 0;
                if (xAxisSegmentRange == 0) {
                    xAxisOffset = chartRangeHelper.getAxisOffsetForStraightLines(this.series[0].rawPoints[0].x);
                }
                else {
                    var axis = this.chart.getAxis(this.primaryXAxisName);
                    if (axis != undefined) {
                        var axisPixelRange = axis.getAxisRangeInPixel();
                        xAxisOffset = chartRangeHelper.getAxisOffset(xAxisSegmentRange, (axisPixelRange.max - axisPixelRange.min));
                    }
                }
                xAxisMaxValue += xAxisOffset;
                xAxisMinValue -= xAxisOffset;
                xAxisSegmentRange = xAxisMaxValue - xAxisMinValue;
                this.setRangeX(xAxisMinValue, xAxisMaxValue);
            }
        };
        ChartBase.prototype.getTimestampInSeries = function (p, series) { return p.x; };
        ChartBase.prototype.getCursorPoint = function (timestamp, series, seriesIndex) { return { x: timestamp, y: 0, timestamp: timestamp }; };
        ChartBase.prototype.addSerieDropLocations = function (serie, chartManagerChart) { };
        ;
        ChartBase.prototype.addDropLocations = function (serie) { };
        ;
        ChartBase.prototype.getDropLocationType = function (currentTarget) { return DropLocationType.invalid; };
        ChartBase.prototype.addYScale = function (scale, position) { };
        ChartBase.prototype.updateDroppableAreas = function (currentTarget) { };
        ;
        ChartBase.prototype.resetHighlighting = function () { };
        ;
        ChartBase.prototype.getUsedCursorStates = function () { return []; };
        ;
        return ChartBase;
    }(widgetBase_1.WidgetBase));
    exports.ChartBase = ChartBase;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hhcnRCYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0V2lkZ2V0L0NoYXJ0QmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBa0NBLElBQUssZUFPSjtJQVBELFdBQUssZUFBZTtRQUNoQix5REFBTSxDQUFBO1FBQ04seURBQU0sQ0FBQTtRQUNOLHFEQUFJLENBQUE7UUFDSixpRUFBVSxDQUFBO1FBQ1YsaUVBQVUsQ0FBQTtRQUNWLDJEQUFPLENBQUE7SUFDWCxDQUFDLEVBUEksZUFBZSxLQUFmLGVBQWUsUUFPbkI7SUF5dkM2SCwwQ0FBZTtJQXZ2QzdJLElBQUssZ0JBSUo7SUFKRCxXQUFLLGdCQUFnQjtRQUNqQixxRUFBVyxDQUFBO1FBQ1gseUVBQWEsQ0FBQTtRQUNiLDZEQUFPLENBQUE7SUFDWCxDQUFDLEVBSkksZ0JBQWdCLEtBQWhCLGdCQUFnQixRQUlwQjtJQW12QzhJLDRDQUFnQjtJQWp2Qy9KO1FBSUksZ0NBQVksZUFBZ0MsRUFBRSxJQUFVO1lBQ3BELElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLENBQUM7UUFDTCw2QkFBQztJQUFELENBQUMsQUFSRCxJQVFDO0lBeXVDZ0ssd0RBQXNCO0lBdnVDdkw7UUFBd0MsNkNBQXFEO1FBQTdGOztRQUErRixDQUFDO1FBQUQsZ0NBQUM7SUFBRCxDQUFDLEFBQWhHLENBQXdDLG1CQUFVLEdBQThDO0lBdXVDNUIsOERBQXlCO0lBdnVDRyxDQUFDO0lBQ2pHO1FBSUksdUNBQVksb0JBQXFDLEVBQUUsY0FBb0I7WUFDbkUsSUFBSSxDQUFDLG9CQUFvQixHQUFHLG9CQUFvQixDQUFDO1lBQ2pELElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBQ3pDLENBQUM7UUFDTCxvQ0FBQztJQUFELENBQUMsQUFS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QUFpQixJQUFFLENBQUM7UUFBQSxDQUFDO1FBRTFDLHVDQUFtQixHQUExQixVQUEyQixhQUFrQixJQUFxQixPQUFPLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFFN0YsNkJBQVMsR0FBaEIsVUFBaUIsS0FBYSxFQUFFLFFBQXNCLElBQUUsQ0FBQztRQUVsRCx3Q0FBb0IsR0FBM0IsVUFBNEIsYUFBYSxJQUFHLENBQUM7UUFBQSxDQUFDO1FBRXZDLHFDQUFpQixHQUF4QixjQUEyQixDQUFDO1FBQUEsQ0FBQztRQUVuQix1Q0FBbUIsR0FBN0IsY0FBdUQsT0FBTyxFQUFFLENBQUEsQ0FBQSxDQUFDO1FBQUEsQ0FBQztRQUN0RSxnQkFBQztJQUFELENBQUMsQUFqdENELENBQWlDLHVCQUFVLEdBaXRDMUM7SUFFUSw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElUcmFjZUNoYXJ0IH0gZnJvbSBcIi4vaW50ZXJmYWNlcy90cmFjZUNoYXJ0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElDaGFydEF4aXMgfSBmcm9tIFwiLi4vLi4vY29yZS9pbnRlcmZhY2VzL2NvbXBvbmVudHMvdWkvY2hhcnQvQ2hhcnRBeGlzSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElQb2ludCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSUN1cnNvclN0YXRlIH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL2N1cnNvclN0YXRlSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElWaWV3IH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL3ZpZXdJbnRlcmZhY2VcIjtcclxuXHJcbmltcG9ydCB7IElDaGFydCwgRXZlbnRBeGlzUmFuZ2VDaGFuZ2VkQXJncywgQXhpc09yaWVudGF0aW9uLCBFdmVudE1vdXNlQXJncywgRXZlbnRNb3VzZVdoZWVsQXJncywgQXhpc1Bvc2l0aW9ufSBmcm9tIFwiLi4vLi4vY29yZS9pbnRlcmZhY2VzL2NvbXBvbmVudHMvdWkvY2hhcnQvY2hhcnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ2hhcnRWaWV3V2lkZ2V0LCBab29tRGlyZWN0aW9uIH0gZnJvbSBcIi4uL2NoYXJ0Vmlld1dpZGdldC9jaGFydFZpZXdXaWRnZXRcIjtcclxuaW1wb3J0IHsgV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vd2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBDaGFydFJhbmdlSGVscGVyIH0gZnJvbSBcIi4vaGVscGVycy9jaGFydFJhbmdlSGVscGVyXCI7XHJcbmltcG9ydCB7IFR5cGVkRXZlbnQgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2V2ZW50c1wiO1xyXG5pbXBvcnQgeyBNb3VzZUFjdGlvblR5cGUgfSBmcm9tIFwiLi91c2VySW50ZXJhY3Rpb24vdXNlckludGVyYWN0aW9uQ29udHJvbGxlclwiO1xyXG5pbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvYmFzZVNlcmllc1wiO1xyXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL3BvaW50XCI7XHJcbmltcG9ydCB7IEN1cnNvclN0YXRlcywgQ3Vyc29yVHlwZSB9IGZyb20gXCIuLi9jb21tb24vc3RhdGVzL2N1cnNvclN0YXRlc1wiO1xyXG5pbXBvcnQgeyBDdXJzb3JIYW5kbGVyIH0gZnJvbSBcIi4vY3Vyc29yL0N1cnNvckhhbmRsZXJcIjtcclxuaW1wb3J0IHsgQ3Vyc29yUG9zaXRpb24gYXMgQ3Vyc29yUG9zaXRpb25JbmZvIH0gZnJvbSBcIi4vY3Vyc29yL0N1cnNvclBvc2l0aW9uSW5mb1wiO1xyXG5pbXBvcnQgeyBTY2FsZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL3NjYWxlXCI7XHJcbmltcG9ydCB7IENoYXJ0Vmlld1NlcmllIH0gZnJvbSBcIi4vY2hhcnRWaWV3U2VyaWVcIjtcclxuaW1wb3J0IHsgU2VyaWVzSGVscGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJpZXNIZWxwZXJcIjtcclxuaW1wb3J0IHsgU0ZDaGFydFdyYXBwZXIgfSBmcm9tIFwiLi9jaGFydFdyYXBwZXIvU0ZDaGFydFdyYXBwZXJcIjtcclxuaW1wb3J0IHsgQXhpc0JvdW5kcyB9IGZyb20gXCIuLi8uLi9jb3JlL3R5cGVzL0F4aXNCb3VuZHNcIjtcclxuaW1wb3J0IHsgRXZlbnRTY2FsZURhdGFDaGFuZ2VkQXJncywgU2NhbGVBY3Rpb24gfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9ldmVudFNjYWxlRGF0YUNoYW5nZWRBcmdzXCI7XHJcbmltcG9ydCB7IERlZmF1bHRDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuL2RlZmF1bHRDb21wb25lbnRTZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnRTZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRCYXNlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudEJhc2VcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50RmFjdG9yeSB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50RmFjdG9yeS9jb21wb25lbnRGYWN0b3J5XCI7XHJcbmltcG9ydCB7IENoYXJ0VHlwZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2NoYXJ0TWFuYWdlckNoYXJ0XCI7XHJcbmltcG9ydCB7IFRyYWNlVmlld1dpZGdldCB9IGZyb20gXCIuLi90cmFjZVZpZXdXaWRnZXQvdHJhY2VWaWV3V2lkZ2V0XCI7XHJcbmltcG9ydCB7IENoYXJ0Vmlld0NoYXJ0TWFuYWdlciB9IGZyb20gXCIuLi9jaGFydFZpZXdXaWRnZXQvY2hhcnRWaWV3Q2hhcnRNYW5hZ2VyXCI7XHJcblxyXG5cclxuZXhwb3J0IHR5cGUgVGltZVBvaW50ID0gSVBvaW50ICYge3RpbWVzdGFtcDogbnVtYmVyfTtcclxuXHJcbmVudW0gQ2hhcnRPYmplY3RUeXBle1xyXG4gICAgY3Vyc29yLFxyXG4gICAgc2VyaWVzLFxyXG4gICAgYXhpcyxcclxuICAgIGNoYXJ0U3BhY2UsXHJcbiAgICBlbXB0eVNwYWNlLFxyXG4gICAgaW52YWxpZCAgICBcclxufVxyXG5cclxuZW51bSBEcm9wTG9jYXRpb25UeXBle1xyXG4gICAgYWRkTmV3U2NhbGUsXHJcbiAgICBhc3NpZ25Ub1NjYWxlLFxyXG4gICAgaW52YWxpZFxyXG59XHJcblxyXG5jbGFzcyBDaGFydE9iamVjdEluZm9ybWF0aW9ue1xyXG4gICAgY2hhcnRPYmplY3RUeXBlOiBDaGFydE9iamVjdFR5cGU7XHJcbiAgICBhcmdzIDogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNoYXJ0T2JqZWN0VHlwZTogQ2hhcnRPYmplY3RUeXBlLCBhcmdzIDogYW55KXtcclxuICAgICAgICB0aGlzLmNoYXJ0T2JqZWN0VHlwZSA9IGNoYXJ0T2JqZWN0VHlwZTtcclxuICAgICAgICB0aGlzLmFyZ3MgPSBhcmdzO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBFdmVudFVzZXJDaGFydEludGVyYWN0aW9uIGV4dGVuZHMgVHlwZWRFdmVudCA8Q2hhcnRCYXNlLCBFdmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncz4ge307XHJcbmNsYXNzIEV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb25BcmdzIHtcclxuICAgIGNoYXJ0SW50ZXJhY3Rpb25UeXBlOiBNb3VzZUFjdGlvblR5cGU7XHJcbiAgICBldmVudEFyZ3VtZW50cyA6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihjaGFydEludGVyYWN0aW9uVHlwZTogTW91c2VBY3Rpb25UeXBlLCBldmVudEFyZ3VtZW50cyA6IGFueSkge1xyXG4gICAgICAgIHRoaXMuY2hhcnRJbnRlcmFjdGlvblR5cGUgPSBjaGFydEludGVyYWN0aW9uVHlwZTtcclxuICAgICAgICB0aGlzLmV2ZW50QXJndW1lbnRzID0gZXZlbnRBcmd1bWVudHM7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEV2ZW50UmVkcmF3QWxsQ2hhcnRzIGV4dGVuZHMgVHlwZWRFdmVudDxDaGFydEJhc2UsIEV2ZW50UmVkcmF3QWxsQ2hhcnRzQXJncz4ge307XHJcbmNsYXNzIEV2ZW50UmVkcmF3QWxsQ2hhcnRzQXJncyB7ICAgIFxyXG4gICAgY2hhcnRUeXBlIDogQ2hhcnRUeXBlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yIChjaGFydFR5cGUgOiBDaGFydFR5cGUpe1xyXG4gICAgICAgIHRoaXMuY2hhcnRUeXBlID0gY2hhcnRUeXBlO1xyXG4gICAgfVxyXG59XHJcblxyXG5hYnN0cmFjdCBjbGFzcyBDaGFydEJhc2UgZXh0ZW5kcyBXaWRnZXRCYXNlIGltcGxlbWVudHMgSVRyYWNlQ2hhcnQge1xyXG5cclxuICAgIHB1YmxpYyBldmVudFVzZXJDaGFydEludGVyYWN0aW9uIDogRXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbjtcclxuICAgIHB1YmxpYyBldmVudFJlZHJhd0FsbENoYXJ0cyA6IEV2ZW50UmVkcmF3QWxsQ2hhcnRzO1xyXG4gICAgXHJcbiAgICB0eXBlO1xyXG4gICAgY3Vyc29yVHlwZTtcclxuICAgIHdpZGdldE5hbWU6IHN0cmluZyA9IFwiXCI7XHJcbiAgICB0ZXh0TWVhc3VyZW1lbnRDYW52YXNJZDogc3RyaW5nID0gXCJ0ZXh0TWVhc3VyZW1lbnRDYW52YXNcIlxyXG4gICAgXHJcbiAgICBjaGFydEluc3RhbmNlLy8gIDogZWouZGF0YXZpc3VhbGl6YXRpb24uQ2hhcnQ7XHJcbiAgICBjaGFydCEgOiBJQ2hhcnQ7XHJcblxyXG4gICAgc2VyaWVzOiBBcnJheTxDaGFydFZpZXdTZXJpZT4gPSBbXTtcclxuICAgIGhvdmVyZWRTZXJpZXMgOiBDaGFydFZpZXdTZXJpZVtdID0gW107XHJcbiAgICBzY2FsZXM6IEFycmF5PFNjYWxlPiA9IFtdO1xyXG5cclxuICAgIHBhcmVudFZpZXc6IElWaWV3O1xyXG4gICAgXHJcbiAgICAvL3ByaXZhdGUga2V5RXZlbnRzUGxhY2VkID0gZmFsc2U7XHJcblxyXG4gICAgLy8gaG9sZHMgdGhlIGN1cnJlbnQgY3Vyc29yIHN0YXRlcyB2YWx1ZXMuIFdlIGluaXRpYWxpemUgdGhlIG1lbWJlciBmb3IgZGVmYXVsdC4gVGhlIGVmZmVjdGl2ZSBpbml0aWFsaXphdGlvbiB0YWtlcyBwbGFjZSB3aGVuIHRoZSBleHRlcm5hbCBzaGFyZWQgaW5zdGFuY2VcclxuICAgIC8vIG9mIHRoZSBjdXJzb3Igc3RhdGVzIGlzIGNyZWF0ZWQgYW5kIHJlZmxlY3RlZCB0aHJvdWdoIHRoZSBjdXJvclN0YXRlcyBzZXR0ZXIhXHJcbiAgICBwcm90ZWN0ZWQgX2N1cnNvclN0YXRlczogQ3Vyc29yU3RhdGVzID0gbmV3IEN1cnNvclN0YXRlcygpO1xyXG5cclxuICAgIGFic3RyYWN0IGN1cnNvckhhbmRsZXI6IEN1cnNvckhhbmRsZXJ8dW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBjdXJzb3JIb3ZlckRpc3RhbmNlOiBudW1iZXIgPSA4O1xyXG4gICAgcHJvdGVjdGVkIGRyYWdnZWRTZXJpZXNJbmRleDogbnVtYmVyID0gMDtcclxuXHJcbiAgICBhYnN0cmFjdCBwcmltYXJ5WEF4aXNOYW1lOiBzdHJpbmc7XHJcbiAgICBhYnN0cmFjdCBwcmltYXJ5WUF4aXNOYW1lOiBzdHJpbmc7XHJcbiAgICBwcm90ZWN0ZWQgYXhpc0JvdW5kczogQXhpc0JvdW5kc1tdID0gW107XHJcblxyXG4gICAgcHVibGljIHhBeGlzV2lkdGggOiBudW1iZXIgPSAwXHJcbiAgICBcclxuICAgIHlBeGlzQWxpZ25tZW50T2Zmc2V0OiBudW1iZXIgPSAwO1xyXG4gICAgZmxhZ2dlZEZvclJlc2l6ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRWaWV3IDogSVZpZXcsIG5hbWU6IHN0cmluZywgc2NhbGU6IFNjYWxlKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBpZih0aGlzLmNvbXBvbmVudCA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAvLyBUT0RPOiBjb21wb25lbnQgc2hvdWxkIGJlIHNldCBieSBjb21wb25lbnQgZmFjdG9yeSB3aGVuIGNoYXJ0cyBjYW4gYmUgY3JlYXRlZCB3aXRoIGNvbXBvbmVudCBmYWN0b3J5XHJcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50ID0gbmV3IENvbXBvbmVudEJhc2UoQ29tcG9uZW50RmFjdG9yeS5nZXRJbnN0YW5jZSgpLCB0aGlzKTsgXHJcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZUNvbXBvbmVudCgpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5hZGREZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQudHlwZSA9IFwiQ2hhcnRCYXNlXCI7IC8vIFRPRE86IFJlbW92ZSB3aGVuIGNoYXJ0YmFzZSh4eWNoYXJ0LCBmZnRjaGFydCwgeXRjaGFydCkgd2lsbCBiZSBjcmVhdGVkIHdpdGggdGhlIGNvbXBvbmVudCBmYWN0b3J5XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuaWQgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMucGFyZW50VmlldyA9IHBhcmVudFZpZXc7XHJcbiAgICAgICAgdGhpcy53aWRnZXROYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLnNjYWxlcy5wdXNoKHNjYWxlKTtcclxuXHJcbiAgICAgICAgdGhpcy5ldmVudFVzZXJDaGFydEludGVyYWN0aW9uID0gbmV3IEV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb24oKTtcclxuICAgICAgICB0aGlzLmV2ZW50UmVkcmF3QWxsQ2hhcnRzID0gbmV3IEV2ZW50UmVkcmF3QWxsQ2hhcnRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXN0cm95IG9iamVjdFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRpc3Bvc2UoKXtcclxuICAgICAgICAvLyBUT0RPOiBEaXNwb3NlIG9mIEN1cnNvclN0YXRlcyBtdXN0IGJlIGRvbmUgZ2xvYmFseVxyXG4gICAgICAgIHRoaXMuY3Vyc29yc1N0YXRlcy5kaXNwb3NlKCk7XHJcbiAgICAgICAgbGV0IGNoYXJ0T2JqID0gJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCkuZGF0YShcImVqQ2hhcnRcIik7XHJcbiAgICAgICAgaWYoY2hhcnRPYmogIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgY2hhcnRPYmouZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAvLyBUT0RPOiBkaXNwb3NlIG9mIHRoaXMgd2lkZ2V0IGlzIGNhbGxlZCBmcm9tIHNwbGl0dGVyIGFuZCBhbHNvIGZyb20gdGhlIGNoYXJ0Vmlld0NoYXJ0TWFuYWdlclxyXG4gICAgICAgICAgICAvL2NvbnNvbGUud2FybihcIkRpc3Bvc2Ugb2YgY2hhcnRPYmooPT0gdW5kZWZpbmVkKSBub3QgcG9zc2libGUhXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGluaXRpYWxpemVkKCl7XHJcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZWQoKTtcclxuXHJcbiAgICAgICAgbGV0IG5ld0NoYXJ0ID0gbmV3IFNGQ2hhcnRXcmFwcGVyKHRoaXMuY3NzUGFyZW50Q29udGVudElkLCB0aGlzLnNjYWxlc1swXSwgdGhpcy5wcmltYXJ5WEF4aXNOYW1lKTtcclxuICAgICAgICBuZXdDaGFydC5ldmVudEF4aXNSYW5nZUNoYW5nZWQuYXR0YWNoKChzZW5kZXIsIGFyZ3MpID0+IHRoaXMub25BeGlzUmFuZ2VDaGFuZ2VkKHNlbmRlciwgYXJncykpO1xyXG4gICAgICAgIG5ld0NoYXJ0LmV2ZW50TW91c2VBY3Rpb24uYXR0YWNoKChzZW5kZXIsYXJncykgPT4gdGhpcy5vbk1vdXNlQWN0aW9uKHNlbmRlciwgYXJncykpO1xyXG4gICAgICAgIG5ld0NoYXJ0LmV2ZW50TW91c2VXaGVlbC5hdHRhY2goKHNlbmRlcixhcmdzKSA9PiB0aGlzLm9uQ2hhcnRNb3VzZVdoZWVsKHNlbmRlciwgYXJncykpO1xyXG5cclxuICAgICAgICB0aGlzLmNoYXJ0SW5zdGFuY2UgPSBuZXdDaGFydC5fU0ZDaGFydDtcclxuICAgICAgICB0aGlzLmNoYXJ0ID0gbmV3Q2hhcnQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5zZXRCb3hab29tKGZhbHNlKTtcclxuXHJcbiAgICAgICAgLy9XRSB3YW50IHRvIGtlZXAgdGhpcyBmb3IgY3Vyc29yIG1vdmVtZW50IGxhdGVyIG9uXHJcbiAgICAgICAgLy8gdGhpcy5hZGRLZXlSZWxhdGVkRXZlbnRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZUNvbXBvbmVudCgpe1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmRlZmF1bHRTZXR0aW5nc0RhdGFJZCA9IERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5XaWRnZXREZWZpbml0aW9uSWQ7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZGlzYWJsZVBlcnNpc3RpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgY29tcG9uZW50IHNldHRpbmdzIGZvciB0aGlzIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsoQ29tcG9uZW50U2V0dGluZ3N8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgZ2V0RGVmYXVsdENvbXBvbmVudFNldHRpbmdzKCk6IENvbXBvbmVudFNldHRpbmdzfHVuZGVmaW5lZHtcclxuICAgICAgICByZXR1cm4gRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLmdldENoYXJ0QmFzZURlZmluaXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGN1cnNvcnMgc3RhdGVzXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHR5cGUge1RDdXJzb3JTdGF0ZXN9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXQgY3Vyc29yc1N0YXRlcygpIDogQ3Vyc29yU3RhdGVzIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY3Vyc29yU3RhdGVzO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBjdXJzb3JzIHN0YXRlcy4gVGhlIG1ldGhvZCBpcyBjYWxsZWQgYXV0b21hdGljYWxseSB3aGVuZXZlciBhIGN1cnNvciBzdGF0ZSBoYXMgYmVlbiBjaGFuZ2VkIGV4dGVybmFsbHkuIFxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHNldCBjdXJzb3JzU3RhdGVzKGN1cnNvclN0YXRlcyA6IEN1cnNvclN0YXRlcykge1xyXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgYmFja3VwIGZpZWxkXHJcbiAgICAgICAgdGhpcy5fY3Vyc29yU3RhdGVzID0gY3Vyc29yU3RhdGVzO1xyXG4gICAgXHJcbiAgICAgICAgdGhpcy51cGRhdGVVSUN1cnNvcnMoY3Vyc29yU3RhdGVzKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGN1cnNvciBzdGF0ZXMuXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHBhcmFtIHtDdXJzb3JTdGF0ZXN9IGN1cnNvclN0YXRlc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgdXBkYXRlQ3Vyc29yU3RhdGVzKGN1cnNvclN0YXRlczpDdXJzb3JTdGF0ZXMpe1xyXG4gICAgICAgIC8vIEJJTkRJTkdTT1VSQ0U6IGRpc3BhdGNoZXMgdGhlIG1ldGhvZCBjYWxsIHRvIGJvdW5kIHRhcmdldHNcclxuICAgIH1cclxuICBcclxuXHJcbiAgICBwcml2YXRlIG9uQXhpc1JhbmdlQ2hhbmdlZChzZW5kZXI6IElDaGFydEF4aXMsIGFyZ3MgOiBFdmVudEF4aXNSYW5nZUNoYW5nZWRBcmdzKXtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgYXJncy5heGlzSURzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IHNjYWxlOiBTY2FsZXx1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIC8vV29ya2Fyb3VuZCB1bnRpbCBYLUF4aXMgaGFuZGxpbmcgaXMgaW1wbGVtZW50ZWQgY29ycmVjdFxyXG4gICAgICAgICAgICBpZihhcmdzLmF4aXNJRHNbaV0gIT0gdGhpcy5wcmltYXJ5WEF4aXNOYW1lKXtcclxuICAgICAgICAgICAgICAgIHNjYWxlPSB0aGlzLmdldFNjYWxlQnlTY2FsZUlkKGFyZ3MuYXhpc0lEc1tpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHNjYWxlID0gdGhpcy5zY2FsZXNbMF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoc2NhbGUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGxldCBheGlzOiBJQ2hhcnRBeGlzID0gc2VuZGVyO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJhbmdlID0gYXhpcy5nZXRBeGlzUmFuZ2UoKTtcclxuICAgICAgICAgICAgICAgIGlmKGF4aXMuZ2V0QXhpc09yaWVudGF0aW9uKCkgPT0gQXhpc09yaWVudGF0aW9uLmhvcml6b250YWwpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U2NhbGVSYW5nZShzY2FsZSwgcmFuZ2UubWluLCByYW5nZS5tYXgsIHNjYWxlLm1pbllWYWx1ZSwgc2NhbGUubWF4WVZhbHVlLCBcIlwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYXJncy5zeW5jQXhpcyA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudFJlZHJhd0FsbENoYXJ0cy5yYWlzZSh0aGlzLCBuZXcgRXZlbnRSZWRyYXdBbGxDaGFydHNBcmdzKHRoaXMudHlwZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTY2FsZVJhbmdlKHNjYWxlLCBzY2FsZS5taW5YVmFsdWUsIHNjYWxlLm1heFhWYWx1ZSwgcmFuZ2UubWluLCByYW5nZS5tYXgsIFwiXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoYXJncy5mb3JjZVJlZHJhdyA9PSB0cnVlKXtcclxuICAgICAgICAgICAgdGhpcy5yZWRyYXdDaGFydCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0gICAgICBcclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1vdXNlWFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1vdXNlWVxyXG4gICAgICogQHJldHVybnMge0NoYXJ0T2JqZWN0SW5mb3JtYXRpb259XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRDaGFydE9iamVjdFVuZGVyTW91c2UobW91c2VYOiBudW1iZXIsIG1vdXNlWTogbnVtYmVyKSA6IENoYXJ0T2JqZWN0SW5mb3JtYXRpb257XHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVDaGFydERpbWVuc2lvbnMoKTtcclxuICAgICAgICBpZih0aGlzLm1vdXNlSXNJbkNoYXJ0Qm91bmRzKG1vdXNlWCwgbW91c2VZKSl7XHJcblxyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmN1cnNvcnNTdGF0ZXMuZ2V0SG92ZXJlZEN1cnNvckluZGV4KCk7XHJcbiAgICAgICAgICAgIGlmKGluZGV4ICE9PSAtMSl7XHJcbiAgICAgICAgICAgICAgICAvL1RPRE86IG1pZ2h0IGJlIGJldHRlciB0byB1c2UgY3Vyc29yIGluc3RhbmNlIGluc3RlYWQgb2YgaW5kZXhcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ2hhcnRPYmplY3RJbmZvcm1hdGlvbihDaGFydE9iamVjdFR5cGUuY3Vyc29yLCB7Y3Vyc29ySW5kZXg6IGluZGV4fSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBDaGFydE9iamVjdEluZm9ybWF0aW9uKENoYXJ0T2JqZWN0VHlwZS5jaGFydFNwYWNlLCB7fSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuYXhpc0JvdW5kcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKChtb3VzZVggLSB0aGlzLmF4aXNCb3VuZHNbaV0ueCkgPCAodGhpcy5heGlzQm91bmRzW2ldLndpZHRoKSAmJiBtb3VzZVggPiB0aGlzLmF4aXNCb3VuZHNbaV0ueCl7XHJcbiAgICAgICAgICAgICAgICBpZigobW91c2VZIC0gdGhpcy5heGlzQm91bmRzW2ldLnkpIDwgKHRoaXMuYXhpc0JvdW5kc1tpXS5oZWlnaHQpICYmIG1vdXNlWSA+IHRoaXMuYXhpc0JvdW5kc1tpXS55KXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYXhpcyA9IHRoaXMuY2hhcnQuZ2V0QXhpcyh0aGlzLmF4aXNCb3VuZHNbaV0uYXhpcy5uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENoYXJ0T2JqZWN0SW5mb3JtYXRpb24oQ2hhcnRPYmplY3RUeXBlLmF4aXMsIHtheGlzOiBheGlzfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgQ2hhcnRPYmplY3RJbmZvcm1hdGlvbihDaGFydE9iamVjdFR5cGUuZW1wdHlTcGFjZSwge30pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY2FsY3VsYXRlQ2hhcnREaW1lbnNpb25zKCl7XHJcbiAgICAgICAgdGhpcy5heGlzQm91bmRzID0gW107XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuc2NhbGVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGF4aXMgPSB0aGlzLmNoYXJ0LmdldEF4aXModGhpcy5zY2FsZXNbaV0uaWQpO1xyXG4gICAgICAgICAgICBpZihheGlzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF4aXNCb3VuZHMucHVzaChheGlzLmdldEF4aXNCb3VuZHMoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGF4aXMgPSB0aGlzLmNoYXJ0LmdldEF4aXModGhpcy5wcmltYXJ5WEF4aXNOYW1lKTtcclxuICAgICAgICBpZihheGlzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuYXhpc0JvdW5kcy5wdXNoKGF4aXMuZ2V0QXhpc0JvdW5kcygpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIG9uTW91c2VBY3Rpb24oc2VuZGVyLCBhcmdzOiBFdmVudE1vdXNlQXJncyl7XHJcbiAgICAgICAgc3dpdGNoIChhcmdzLm1vdXNlQWN0aW9uVHlwZSl7XHJcbiAgICAgICAgICAgIGNhc2UgIE1vdXNlQWN0aW9uVHlwZS5tb3VzZURvd24gOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2hhcnRNb3VzZURvd24oc2VuZGVyLCBhcmdzKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgIE1vdXNlQWN0aW9uVHlwZS5tb3VzZVVwIDoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkNoYXJ0TW91c2VVcChzZW5kZXIsIGFyZ3MpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIGNhc2UgIE1vdXNlQWN0aW9uVHlwZS5tb3VzZU1vdmUgOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2hhcnRNb3VzZU1vdmUoc2VuZGVyLCBhcmdzKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uQ2hhcnRNb3VzZURvd24oc2VuZGVyLCBhcmdzIDogRXZlbnRNb3VzZUFyZ3Mpe1xyXG4gICAgICAgIGFyZ3Mub2JqZWN0VW5kZXJNb3VzZSA9IHRoaXMuZ2V0Q2hhcnRPYmplY3RVbmRlck1vdXNlKGFyZ3MubW91c2VQb2ludC54LCBhcmdzLm1vdXNlUG9pbnQueSk7XHJcbiAgICAgICAgbGV0IGV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb25BcmdzOiBFdmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncztcclxuICAgICAgICBldmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncyA9IG5ldyBFdmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncyhNb3VzZUFjdGlvblR5cGUubW91c2VEb3duLCBhcmdzKTtcclxuICAgICAgICB0aGlzLmV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb24ucmFpc2UodGhpcywgZXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbkFyZ3MpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbkNoYXJ0TW91c2VVcChzZW5kZXIsIGFyZ3M6IEV2ZW50TW91c2VBcmdzKXtcclxuICAgICAgICBhcmdzLm9iamVjdFVuZGVyTW91c2UgPSB0aGlzLmdldENoYXJ0T2JqZWN0VW5kZXJNb3VzZShhcmdzLm1vdXNlUG9pbnQueCwgYXJncy5tb3VzZVBvaW50LnkpO1xyXG4gICAgICAgIGxldCBldmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJnczogRXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbkFyZ3M7XHJcbiAgICAgICAgZXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbkFyZ3MgPSBuZXcgRXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbkFyZ3MoTW91c2VBY3Rpb25UeXBlLm1vdXNlVXAsIGFyZ3MpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbi5yYWlzZSh0aGlzLCBldmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncyk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uQ2hhcnRNb3VzZU1vdmUoc2VuZGVyLCBhcmdzOiBFdmVudE1vdXNlQXJncyl7XHJcbiAgICAgICAgbGV0IGNoYXJ0T2JqZWN0VW5kZXJNb3VzZSA6IENoYXJ0T2JqZWN0SW5mb3JtYXRpb24gPSB0aGlzLmdldENoYXJ0T2JqZWN0VW5kZXJNb3VzZShhcmdzLm1vdXNlUG9pbnQueCwgYXJncy5tb3VzZVBvaW50LnkpO1xyXG4gICAgICAgIGFyZ3Mub2JqZWN0VW5kZXJNb3VzZSA9IGNoYXJ0T2JqZWN0VW5kZXJNb3VzZTtcclxuICAgICAgICBsZXQgZXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbkFyZ3M6IEV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb25BcmdzO1xyXG4gICAgICAgIGV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb25BcmdzID0gbmV3IEV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb25BcmdzKE1vdXNlQWN0aW9uVHlwZS5tb3VzZU1vdmUsIGFyZ3MpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbi5yYWlzZSh0aGlzLCBldmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncylcclxuICAgICAgICBcclxuICAgIH07XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgbWV0aG9kIGlzIGNhbGxlZCBieSB0aGUgSW50ZXJhY3Rpb25TdHJhdGV0Z2llcyB3aGVuIGEgY2xpY2sgaW4gdGhlXHJcbiAgICAgKiBjaGFydCBoYXMgYmVlbiBtYWRlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldEN1cnNvck9uUG9pbnRlclBvc2l0aW9uKG1vdXNlUG9pbnQgOiBJUG9pbnQpe1xyXG4gICAgICAgIHRoaXMuc2V0Q3Vyc29yKG1vdXNlUG9pbnQueCwgbW91c2VQb2ludC55KTtcclxuICAgICAgICB0aGlzLmNoZWNrQ3Vyc29yc0hvdmVyaW5nKG1vdXNlUG9pbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW50ZXJuYWwgbWV0aG9kIGZvciBhY3R1YWxseSBtb3ZpbmcgdGhlIGN1cnNvcnMuIE92ZXJ3cml0dGVuIGluIEZGVENoYXJ0LnRzXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5XHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgc2V0Q3Vyc29yKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnNlcmllcy5sZW5ndGgpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmN1cnNvcnNTdGF0ZXMuc2V0TGFzdEN1cnNvclR5cGVTZWxlY3RlZChDdXJzb3JUeXBlLnRpbWVEb21haW4pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBob3ZlcmVkQ3Vyc29ySW5kZXggPSAgdGhpcy5jdXJzb3JzU3RhdGVzLmdldEhvdmVyZWRDdXJzb3JJbmRleCgpO1xyXG4gICAgICAgIGlmIChob3ZlcmVkQ3Vyc29ySW5kZXggIT0gLTEpIHsgLy8gU2V0IHNlbGVjdGVkIGN1cnNvciB3aGVuIGhvdmVyZWQgY3Vyc29yIHdhcyBmb3VuZFxyXG4gICAgICAgICAgICB0aGlzLmN1cnNvcnNTdGF0ZXMuc2V0U2VsZWN0ZWQoaG92ZXJlZEN1cnNvckluZGV4LCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3Vyc29yc1N0YXRlcy5zZXRTZWxlY3RlZCggdGhpcy5jdXJzb3JzU3RhdGVzLmdldFNlbGVjdGVkQ3Vyc29ySW5kZXgoKSwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZVNlbGVjdGVkQ3Vyc29yKHRoaXMuY3Vyc29yc1N0YXRlcywgeCwgeSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQYXNzIHRoZSB4IGFuZCB5IHBvc2l0aW9uIG9uIHRoZSBwcm9wZXJ0eSBhbmQgdGhpcyBtZXRob2Qgd2lsbCBmaWd1cmUgb3V0IHdoZXJlIHRvXHJcbiAgICAgKiBwbGFjZSB0aGUgY3Vyc29ycyBhbmQgdXBkYXRlIHRoZSBzdGF0ZXMgYWNjb3JkaW5nbHlcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcGFyYW0ge0N1cnNvclN0YXRlc30gY3Vyc29yc1N0YXRlc1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCB1cGRhdGVTZWxlY3RlZEN1cnNvcihjdXJzb3JzU3RhdGVzOiBDdXJzb3JTdGF0ZXMsIHg6IG51bWJlciwgeTogbnVtYmVyKXtcclxuICAgICAgICBsZXQgcG9pbnQgPSB0aGlzLmdldENoYXJ0Q29vcmRpbmF0ZUZyb21QaXhlbCh0aGlzLnByaW1hcnlYQXhpc05hbWUsIHRoaXMuc2NhbGVzWzBdLmlkLCB4LCB5KTtcclxuICAgICAgICBsZXQgbmVhcmVzdFRpbWVzdGFtcEZyb21BbGxTZXJpZXMgPSB0aGlzLmdldFRpbWVzdGFtcEluU2VyaWVzKHBvaW50LCB0aGlzLnNlcmllcyk7XHJcblxyXG4gICAgICAgIGN1cnNvcnNTdGF0ZXMuc2V0QWN0aXZlKGN1cnNvcnNTdGF0ZXMuZ2V0U2VsZWN0ZWRDdXJzb3JJbmRleCgpLCB0cnVlKTtcclxuICAgICAgICBjdXJzb3JzU3RhdGVzLnNldFBvc2l0aW9uKGN1cnNvcnNTdGF0ZXMuZ2V0U2VsZWN0ZWRDdXJzb3JJbmRleCgpLCBuZWFyZXN0VGltZXN0YW1wRnJvbUFsbFNlcmllcyk7XHJcbiAgICAgICAgY3Vyc29yc1N0YXRlcy5zZXRIb3ZlcmVkKGN1cnNvcnNTdGF0ZXMuZ2V0U2VsZWN0ZWRDdXJzb3JJbmRleCgpLCB0aGlzLmdldFNlcmllQ3Vyc29yVHlwZSgpLCBmYWxzZSk7XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlQ3Vyc29yU3RhdGVzKGN1cnNvcnNTdGF0ZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW50ZXJuYWwgbWV0aG9kIGZvciBhY3R1YWxseSBtb3ZpbmcgdGhlIGN1cnNvcnMuIFBhc3MgdGhlIHggYW5kIHlcclxuICAgICAqIHBvc2l0aW9uIG9uIHRoZSBwcm9wZXJ0eSBhbmQgdGhpcyBtZXRob2Qgd2lsbCBmaWd1cmUgb3V0IHdoZXJlIHRvXHJcbiAgICAgKiBwbGFjZSB0aGUgY3Vyc29ycyBhbmQgdXBkYXRlIHRoZSBzdGF0ZXMgYWNjb3JkaW5nbHlcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5XHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZHJhZ0N1cnNvckFsb25nTGluZSAoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcclxuICAgICAgICBpZiAoIXRoaXMuc2VyaWVzLmxlbmd0aCl7XHJcbiAgICAgICAgICAgIHJldHVybjsgXHJcbiAgICAgICAgfSBcclxuXHJcbiAgICAgICAgaWYodGhpcy5ob3ZlcmVkU2VyaWVzLmxlbmd0aCAhPSAwKXtcclxuICAgICAgICAgICAgbGV0IHBvaW50ID0gdGhpcy5nZXRDaGFydENvb3JkaW5hdGVGcm9tUGl4ZWwodGhpcy5wcmltYXJ5WEF4aXNOYW1lLCB0aGlzLnNjYWxlc1swXS5pZCwgeCwgeSk7XHJcbiAgICAgICAgICAgIGxldCBuZWFyZXN0VGltZXN0YW1wRnJvbVNpbmdsZVNlcmllcyA9IHRoaXMuZ2V0VGltZXN0YW1wSW5TZXJpZXMocG9pbnQsIHRoaXMuaG92ZXJlZFNlcmllcyk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmN1cnNvcnNTdGF0ZXMuc2V0UG9zaXRpb24odGhpcy5jdXJzb3JzU3RhdGVzLmdldFNlbGVjdGVkQ3Vyc29ySW5kZXgoKSwgbmVhcmVzdFRpbWVzdGFtcEZyb21TaW5nbGVTZXJpZXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVDdXJzb3JTdGF0ZXModGhpcy5jdXJzb3JzU3RhdGVzKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIG1ldGhvZCBpcyBjYWxsZWQgYnkgdGhlIHVzZXJJbnRlcmFjdGlvbiBzdHJhZ2V0Z3kgd2hlbmV2ZXJcclxuICAgICAqIHRoZSBtb3VzZSBpcyBtb3ZlZCBhY3Jvc3MgYSBjaGFydC4gSWYgdGhlIG1vdXNlIGlzIGFib3ZlIGEgY3Vyc29yXHJcbiAgICAgKiB0aGlzIGN1cnNvciB1cGRhdGVzIGl0J3Mgb3duIHN0YXRlIHRvIEhPVkVSSU5HIGFuZCBvbmNlIGl0IGlzIG5vXHJcbiAgICAgKiBsb25nZXIgYmVsb3cgdGhlIG1vdXNlIGl0IHdpbGwgcmVzZXQgdG8gaXQncyBwcmV2aW91cyBzdGF0ZSBpZiB0aGVcclxuICAgICAqIGN1cnNvciB3YXMgc2VsZWN0ZWQgb3IgaXQgd2lsbCBiZSBzZXQgdG8gREVTRUxDVEVEIGlmIGl0IHdhc24ndC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjaGVja0N1cnNvcnNIb3ZlcmluZyhtb3VzZVBvaW50OiBJUG9pbnQpe1xyXG4gICAgICAgIGlmKHRoaXMuY3Vyc29ySGFuZGxlciAhPSB1bmRlZmluZWQpe1xyXG5cclxuICAgICAgICAgICAgbGV0IGNoYXJ0QXJlYSA9IHRoaXMuY2hhcnQuZ2V0Q2hhcnRBcmVhKCk7XHJcbiAgICAgICAgICAgIGxldCBhY3R1YWxNb3VzZVBvaW50ID0gbmV3IFBvaW50KG1vdXNlUG9pbnQueCAtIGNoYXJ0QXJlYS54LCBtb3VzZVBvaW50LnkgLSBjaGFydEFyZWEueSk7XHJcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZEN1cnNvckluZGV4ID0gdGhpcy5jdXJzb3JzU3RhdGVzLmdldFNlbGVjdGVkQ3Vyc29ySW5kZXgoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBjbG9zZXN0Q3Vyc29yUG9zaXRpb24gOiBDdXJzb3JQb3NpdGlvbkluZm8gPSB0aGlzLmN1cnNvckhhbmRsZXIuZ2V0Q2xvc2VzdEN1cnNvclBvc2l0aW9uVG9Qb2ludChhY3R1YWxNb3VzZVBvaW50LCBzZWxlY3RlZEN1cnNvckluZGV4KVxyXG4gICAgICAgICAgICBpZihjbG9zZXN0Q3Vyc29yUG9zaXRpb24gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGxldCBkaXN0YW5jZVRvQ3Vyc29yID0gY2xvc2VzdEN1cnNvclBvc2l0aW9uLmFkZGl0aW9uYWxJbmZvcm1hdGlvbltcImRpc3RhbmNlXCJdO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLmhvdmVyZWRTZXJpZXMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgY2xvc2VzdEN1cnNvckluZGV4O1xyXG4gICAgICAgICAgICAgICAgaWYoZGlzdGFuY2VUb0N1cnNvciA8IHRoaXMuY3Vyc29ySG92ZXJEaXN0YW5jZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VzdEN1cnNvclBvc2l0aW9uLmFkZGl0aW9uYWxJbmZvcm1hdGlvbltcImhpZ2hsaWdodFwiXSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VzdEN1cnNvckluZGV4ID0gY2xvc2VzdEN1cnNvclBvc2l0aW9uLmFkZGl0aW9uYWxJbmZvcm1hdGlvbltcImN1cnNvckluZGV4XCJdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaG92ZXJlZFNlcmllcyA9IGNsb3Nlc3RDdXJzb3JQb3NpdGlvbi5hZGRpdGlvbmFsSW5mb3JtYXRpb25bXCJzZXJpZXNcIl07IFxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vbGV0IG5ld0N1cnNvclN0YXRlID0gT2JqZWN0WC5jbG9uZTxDdXJzb3JTdGF0ZXM+KEN1cnNvclN0YXRlcy5jb25zdHJ1Y3RvciwgdGhpcy5jdXJzb3JzU3RhdGVzKTtcclxuICAgICAgICAgICAgICAgIC8vbmV3Q3Vyc29yU3RhdGUgPSB0aGlzLnVwZGF0ZUhvdmVyaW5nU3RhdGVzSW5DdXJzb3JzKG5ld0N1cnNvclN0YXRlLCBjbG9zZXN0Q3Vyc29ySW5kZXgpOyAgICAgXHJcbiAgICAgICAgICAgICAgICAvL3RoaXMudXBkYXRlQ3Vyc29yU3RhdGVzKG5ld0N1cnNvclN0YXRlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3Vyc29yc1N0YXRlcyA9IHRoaXMudXBkYXRlSG92ZXJpbmdTdGF0ZXNJbkN1cnNvcnModGhpcy5jdXJzb3JzU3RhdGVzLCBjbG9zZXN0Q3Vyc29ySW5kZXgpOyAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUN1cnNvclN0YXRlcyh0aGlzLmN1cnNvcnNTdGF0ZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRTZXJpZUN1cnNvclR5cGUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2VyaWVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VyaWVzWzBdLnNlcmllLmN1cnNvclR5cGU7XHJcbiAgICAgICAgfSBcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlc2V0IGN1cnNvciBzdGF0ZXMgd2l0aCB0aGUgZ2l2ZW4gY3Vyc29yIHR5cGVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0N1cnNvclR5cGV9IGN1cnNvclR5cGVcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlc2V0Q3Vyc29yU3RhdGVzKGN1cnNvclR5cGU6IEN1cnNvclR5cGUpIHtcclxuICAgICAgICB0aGlzLmN1cnNvcnNTdGF0ZXMucmVzZXRDdXJzb3JTdGF0ZXMoY3Vyc29yVHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNldCBob3ZlcmluZyBvZiBhbGwgY3Vyc29ycyB3aGVuIG1vdXNlIGlzIG91dHNpZGUgb2YgdGhlIGNoYXJ0c1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlc2V0Q3Vyc29yc0hvdmVyZWQoKSB7XHJcbiAgICAgICAgbGV0IGhvdmVyZWRDdXJzb3IgPSB0aGlzLmN1cnNvcnNTdGF0ZXMuZ2V0SG92ZXJlZEN1cnNvckluZGV4KCk7XHJcbiAgICAgICAgLy9JZiBhbnkgY3Vyc29yIGlzIGhvdmVyZWQsIHJlc2V0IGFsbFxyXG4gICAgICAgIGlmIChob3ZlcmVkQ3Vyc29yICE9PSAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnNvcnNTdGF0ZXMgPSB0aGlzLnVwZGF0ZUhvdmVyaW5nU3RhdGVzSW5DdXJzb3JzKHRoaXMuY3Vyc29yc1N0YXRlcywgdW5kZWZpbmVkKTsgICAgIFxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUN1cnNvclN0YXRlcyh0aGlzLmN1cnNvcnNTdGF0ZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEludGVybmFsIG1ldGhvZCB0byBjYWxjdWxhdGUgdGhlIHN0YXRlIHdoaWNoIGlzIHRvIGJlIHVwZGF0ZWQgaW4gdGhlXHJcbiAgICAgKiBzdGF0ZXMgdG8gYmUgSE9WRVJJTkcuIFRoaXMgbWV0aG9kIHdpbGwgYWxzbyByZXNldCB0aGUgY29ycmVjdCBzdGF0ZXNcclxuICAgICAqIHRvIGl0J3MgcHJldmlvdXMgdmFsdWVzIGlmIG5vbiBvZiB0aGUgY3Vyc29ycyBhcmUgaG92ZXJpbmcuIFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0N1cnNvclN0YXRlc30gY3Vyc29yU3RhdGVzXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY2xvc2VzdEluZGV4XHJcbiAgICAgKiBAcmV0dXJucyB7Q3Vyc29yU3RhdGVzfVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZUhvdmVyaW5nU3RhdGVzSW5DdXJzb3JzIChjdXJzb3JTdGF0ZXM6IEN1cnNvclN0YXRlcywgY2xvc2VzdEluZGV4OiBudW1iZXJ8dW5kZWZpbmVkKSA6IEN1cnNvclN0YXRlcyB7XHJcbiAgICAgICAgaWYgKGNsb3Nlc3RJbmRleCAhPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gSW5kZXggb2YgY3Vyc29yIGZvdW5kID0+IHNldCBob3ZlcmVkIGZsYWdcclxuICAgICAgICAgICAgY3Vyc29yU3RhdGVzLnNldEhvdmVyZWQoY2xvc2VzdEluZGV4LCB0aGlzLmdldFNlcmllQ3Vyc29yVHlwZSgpLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgLy8gTm8gaW5kZXggb2YgY3Vyc29yIGZvdW5kID0+IHJlc2V0IGFsbCBob3ZlcmVkIGZsYWdzIG9mIGFsbCBjdXJzb3JzXHJcbiAgICAgICAgICAgIGN1cnNvclN0YXRlcy5zZXRIb3ZlcmVkKC0xLCB0aGlzLmdldFNlcmllQ3Vyc29yVHlwZSgpLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjdXJzb3JTdGF0ZXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxjdWxhdGUgem9vbSBvbiBtb3VzZXdoZWVsIGFjdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgb25DaGFydE1vdXNlV2hlZWwoc2VuZGVyLCBhcmdzIDogRXZlbnRNb3VzZVdoZWVsQXJncyl7XHJcbiAgICAgICAgYXJncy5vYmplY3RVbmRlck1vdXNlID0gdGhpcy5nZXRDaGFydE9iamVjdFVuZGVyTW91c2UoYXJncy5tb3VzZVBvaW50LngsIGFyZ3MubW91c2VQb2ludC55KTtcclxuICAgICAgICBsZXQgZXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbkFyZ3M6IEV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb25BcmdzO1xyXG4gICAgICAgIGV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb25BcmdzID0gbmV3IEV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb25BcmdzKE1vdXNlQWN0aW9uVHlwZS5tb3VzZVdoZWVsLCBhcmdzKTtcclxuICAgICAgICB0aGlzLmV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb24ucmFpc2UodGhpcywgZXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbkFyZ3MpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgaWYgbW91c2UgaXMgaW5zaWRlIGNoYXJ0IGJvdW5kc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IG1vdXNlWFxyXG4gICAgICogQHBhcmFtIHsqfSBtb3VzZVlcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG1vdXNlSXNJbkNoYXJ0Qm91bmRzKG1vdXNlWCwgbW91c2VZKSA6IGJvb2xlYW57XHJcbiAgICAgICAgbGV0IGlzSW5Cb3VuZHMgPSB0cnVlO1xyXG4gICAgICAgIGxldCBjaGFydEFyZWEgPSB0aGlzLmNoYXJ0LmdldENoYXJ0QXJlYSgpO1xyXG4gICAgICAgIGlmKG1vdXNlWCA8IGNoYXJ0QXJlYS54IHx8IG1vdXNlWCA+IChjaGFydEFyZWEueCArIGNoYXJ0QXJlYS53aWR0aCkgICl7XHJcbiAgICAgICAgICAgIGlzSW5Cb3VuZHMgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYobW91c2VZIDwgY2hhcnRBcmVhLnkgfHwgbW91c2VZID4gKGNoYXJ0QXJlYS55ICsgY2hhcnRBcmVhLmhlaWdodCkgICl7XHJcbiAgICAgICAgICAgIGlzSW5Cb3VuZHMgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGlzSW5Cb3VuZHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNpemUgY2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IHdpZHRoXHJcbiAgICAgKiBAcGFyYW0geyp9IGhlaWdodFxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVzaXplKHdpZHRoLCBoZWlnaHQpe1xyXG4gICAgICAgIHRoaXMucmVzaXplQ2hhcnQoaGVpZ2h0LCB3aWR0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNpemUgQ2hhcnQgb25seSBpZiBuZWVkZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSB3aWR0aFxyXG4gICAgICogQHBhcmFtIHsqfSBoZWlnaHRcclxuICAgICAqIEBwYXJhbSB7Kn0gd2lkdGhcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZXNpemVDaGFydChoZWlnaHQsIHdpZHRoKSB7XHJcbiAgICAgICAgaWYodGhpcy5mbGFnZ2VkRm9yUmVzaXplIHx8IHRoaXMuX2FjdHVhbEhlaWdodCAhPSBoZWlnaHQgfHwgdGhpcy5fYWN0dWFsV2lkdGggIT0gd2lkdGgpe1xyXG4gICAgICAgICAgICB0aGlzLl9hY3R1YWxIZWlnaHQgPSBoZWlnaHQsIHRoaXMuX2FjdHVhbFdpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgd2lkdGggPSB3aWR0aCAtIHRoaXMueUF4aXNBbGlnbm1lbnRPZmZzZXQ7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcnQucmVzaXplKGhlaWdodCwgd2lkdGgpO1xyXG4gICAgICAgICAgICB0aGlzLnJlZHJhd0NoYXJ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVkcmF3cyBjaGFydFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlZHJhd0NoYXJ0KCkge1xyXG4gICAgICAgIHRoaXMuY2hhcnQucmVkcmF3KCk7XHJcbiAgICAgICAgaWYodGhpcy5jdXJzb3JIYW5kbGVyICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuY3Vyc29ySGFuZGxlci51cGRhdGVDaGFydEFyZWEodGhpcy5jaGFydC5nZXRDaGFydEFyZWEoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVwb3NpdGlvbkN1cnNvcnMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBnaXZlbiBzZXJpZSBpbnRvIGEgY2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PEJhc2VTZXJpZXM+fSBzZXJpZXNcclxuICAgICAqIEBwYXJhbSB7U2NhbGV9IHNjYWxlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGRTZXJpZXNUb0NoYXJ0KHNlcmllczogQXJyYXk8QmFzZVNlcmllcz4sIHlTY2FsZTogU2NhbGUsIHVwZGF0ZVJhbmdlWDogYm9vbGVhbil7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZXJpZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZiAoc2VyaWVzW2ldLnJhd1BvaW50c1ZhbGlkID09IHRydWUgJiYgdGhpcy5zZXJpZXMubWFwKGUgPT4gZS5zZXJpZSkuaW5kZXhPZihzZXJpZXNbaV0pID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2hhcnRTZXJpZXMgPSBuZXcgQ2hhcnRWaWV3U2VyaWUoc2VyaWVzW2ldLCB5U2NhbGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXJpZXMucHVzaChjaGFydFNlcmllcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmUgYSBnaXZlbiBzZXJpZSBmcm9tIHRoZSBjaGFydFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gcmVzZXRDdXJzb3JTdGF0ZXNcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlbW92ZVNlcmllRnJvbUNoYXJ0KHNlcmllOiBCYXNlU2VyaWVzfENoYXJ0Vmlld1NlcmllLCByZXNldEN1cnNvclN0YXRlczogYm9vbGVhbikge1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5zZXJpZUluQ2hhcnQoc2VyaWUpO1xyXG4gICAgICAgIGxldCBjdXJzb3JUeXBlID0gdGhpcy5nZXRTZXJpZUN1cnNvclR5cGUoKTtcclxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLnNlcmllcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZXRBdmFpbGFibGVTZXJpZXNBc0RhdGFTb3VyY2UoKTtcclxuXHJcbiAgICAgICAgLy9SZXNldCBjdXJzb3Igc3RhdGVzIGlmIHRoZXJlIGFyZSBubyBtb3JlIHNlcmllcyBpbiB0aGUgY2hhcnRWaWV3IHdpdGggdGhlIGNvcnJlc3BvbmRpbmcgY3Vyc29yIHR5cGVcclxuICAgICAgICBpZiAocmVzZXRDdXJzb3JTdGF0ZXMpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXNldEN1cnNvclN0YXRlcyhjdXJzb3JUeXBlISk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3JlZHJhdyBjdXJzb3JzXHJcbiAgICAgICAgbGV0IHN0YXRlcyA9IHRoaXMuZ2V0VXNlZEN1cnNvclN0YXRlcygpO1xyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc3RhdGVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IHRpbWVzdGFtcCA9IHN0YXRlc1tpXS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgdGhpcy5kcmF3Q3Vyc29yKHRpbWVzdGFtcCEsIGksIHN0YXRlc1tpXS5ob3ZlcmVkLCBzdGF0ZXNbaV0uc2VsZWN0ZWQpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHNlcmllXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgc2VyaWVJbkNoYXJ0KHNlcmllKSB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuc2VyaWVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VyaWVzW2ldLmlkID09IHNlcmllLmlkKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRab29tQXhlcyh6b29tQXhlczogWm9vbURpcmVjdGlvbil7XHJcbiAgICAgICAgdGhpcy5jaGFydC5zZXRab29tRGlyZWN0aW9uKHpvb21BeGVzKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRQYW5uaW5nKGVuYWJsZTogYm9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5jaGFydC5lbmFibGVQYW5uaW5nKGVuYWJsZSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFBhbm5pbmcgb3BlcmF0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBwYWdlWFxyXG4gICAgICogQHBhcmFtIHsqfSBwYWdlWVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZG9QYW5uaW5nKHBhZ2VYLCBwYWdlWSl7XHJcbiAgICAgICAgdGhpcy5jaGFydC5kb1Bhbm5pbmcocGFnZVgsIHBhZ2VZKTtcclxuICAgICAgICAvL3RoaXMuY2hhcnRNYW5hZ2VyLnJlZHJhd0NoYXJ0cygpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWRyYXdBbGxDaGFydHMucmFpc2UodGhpcywgbmV3IEV2ZW50UmVkcmF3QWxsQ2hhcnRzQXJncyh0aGlzLnR5cGUpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXRQYW5uaW5nQ29vcmRzKCl7XHJcbiAgICAgICAgLy9UT0RPOiB0aGlzIGlzIGEgb25seSB3b3JrYXJvdW5kLCBuZWVkcyB0byBiZSBmaXhlZCBcclxuICAgICAgICAodGhpcy5jaGFydCBhcyBTRkNoYXJ0V3JhcHBlcikucHJldlBhbm5pbmdDb29yZHMgPSB7J3gnOiB1bmRlZmluZWQsICd5JzogdW5kZWZpbmVkfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEVuYWJsZXMgYm94IHpvb21pbmdcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGVuYWJsZVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0Qm94Wm9vbShlbmFibGU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLmNoYXJ0LmVuYWJsZUJveFpvb20oZW5hYmxlKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpEcmF3IHRoZSBjdXJzb3IgZGVmaW5lZCBieSBpdHMgaW5kZXggZm9yIGEgZ2l2ZW4gdGltZXN0YW1wXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lc3RhbXBcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjdXJzb3JJbmRleFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBob3ZlcmVkXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHNlbGVjdGVkXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZHJhd0N1cnNvcih0aW1lc3RhbXA6IG51bWJlciwgY3Vyc29ySW5kZXg6IG51bWJlciwgaG92ZXJlZDogYm9vbGVhbiwgc2VsZWN0ZWQ6IGJvb2xlYW4pIHtcclxuICAgICAgICBpZih0aGlzLmN1cnNvckhhbmRsZXIgIT0gdW5kZWZpbmVkKXtcclxuXHJcbiAgICAgICAgICAgIGxldCBsZWFkQ3Vyc29yUGl4ZWxQb3NpdGlvbjtcclxuICAgICAgICAgICAgbGV0IGxlYWRDdXJzb3JUaW1lc3RhbXA7XHJcblxyXG4gICAgICAgICAgICAvL3RoZSBjdXJzb3JQb3NpdGlvbiBmb3IgZWFjaCBzZXJpZSBpcyBzdG9yZWQgaW4gYW4gYXJyYXlcclxuICAgICAgICAgICAgbGV0IGN1cnNvclBvc2l0aW9ucyA6IEN1cnNvclBvc2l0aW9uSW5mb1tdID0gW107XHJcblxyXG4gICAgICAgICAgICAvL2lmIHRoZSBnaXZlbiB0aW1lc3RhbXAgaXMgb3V0c2lkZSBvZiB0aGUgc2VyaWVzIGJvdW5kcywgdGhlIGN1cnNvciBtdXN0IG5vdCBiZSBkcmF3biBhdCBhbGxcclxuICAgICAgICAgICAgbGV0IGN1cnNvck91dE9mU2VyaWVzQm91bmRzID0gdHJ1ZTtcclxuICAgICAgICAgICAgZm9yKGxldCBzZXJpZXNJbmRleCA9IDAgOyBzZXJpZXNJbmRleCA8IHRoaXMuc2VyaWVzLmxlbmd0aDsgc2VyaWVzSW5kZXgrKyl7XHJcbiAgICAgICAgICAgICAgICBpZih0aW1lc3RhbXAgPj0gdGhpcy5zZXJpZXNbc2VyaWVzSW5kZXhdLnNlcmllLnRpbWVzdGFtcHNbMF0gJiYgdGltZXN0YW1wIDw9IHRoaXMuc2VyaWVzW3Nlcmllc0luZGV4XS5zZXJpZS50aW1lc3RhbXBzW3RoaXMuc2VyaWVzW3Nlcmllc0luZGV4XS5zZXJpZS50aW1lc3RhbXBzLmxlbmd0aC0xXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29yT3V0T2ZTZXJpZXNCb3VuZHMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihjdXJzb3JPdXRPZlNlcmllc0JvdW5kcyA9PSBmYWxzZSl7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9sZWFkQ3Vyc29yUG9zaXRpb24gaGFzIHRvIGJlIGNvbnZlcnRlZCB0byBwaXhlbHMgdG8gYmUgZHJhd25cclxuICAgICAgICAgICAgICAgIGxlYWRDdXJzb3JQaXhlbFBvc2l0aW9uID0gdGhpcy5nZXRQaXhlbHNGcm9tQ2hhcnRQb2ludCh0aW1lc3RhbXAsIDAsIHRoaXMucHJpbWFyeVlBeGlzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vbGVhZEN1cnNvclRpbWVzdGFtcCBpcyBuZWVkZWQgdG8gY2FsY3VsYXRlIHRoZSBjdXJzb3IgcG9zaXRpb25zIGZvciB0aGUgb3RoZXIgc2VyaWVzIChtaWdodCBiZSBkaWZmZXJlbnQgZnJvbSB0aGUgdGltZXN0YW1wIGFyZ3VtZW50KVxyXG4gICAgICAgICAgICAgICAgbGVhZEN1cnNvclRpbWVzdGFtcCA9IHRpbWVzdGFtcC8vdGhpcy5nZXRUaW1lc3RhbXBJblNlcmllcyhsZWFkQ3Vyc29yQ2hhcnRQb2ludCwgYWxsU2VyaWVzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL3RoZSBjdXJzb3IgcG9zaXRpb25zIGFyZSBjYWxjdWxhdGVkIGZvciBlYWNoIHNlcmllcyB0byBkcmF3IHRoZSBzcXVhcmVzIGZvciB0aGUgdGltZXN0YW1wIGluZGljYXRvclxyXG4gICAgICAgICAgICAgICAgY3Vyc29yUG9zaXRpb25zID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IHNlcmllc0luZGV4ID0gMCA7IHNlcmllc0luZGV4IDwgdGhpcy5zZXJpZXMubGVuZ3RoOyBzZXJpZXNJbmRleCsrKXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9vbmx5IGRyYXcgdGhlIGN1cnNvciBmb3IgYSBzZXJpZXMgd2hlbiBpdCBpcyB3aXRoaW4gdGhlIHNlcmllcyBib3VuZHMgb2YgdGhhdCBjaGFydFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGxlYWRDdXJzb3JUaW1lc3RhbXAgPj0gdGhpcy5zZXJpZXNbc2VyaWVzSW5kZXhdLnNlcmllLnRpbWVzdGFtcHNbMF0gJiYgbGVhZEN1cnNvclRpbWVzdGFtcCA8PSB0aGlzLnNlcmllc1tzZXJpZXNJbmRleF0uc2VyaWUudGltZXN0YW1wc1t0aGlzLnNlcmllc1tzZXJpZXNJbmRleF0uc2VyaWUudGltZXN0YW1wcy5sZW5ndGgtMV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY3Vyc29yQ2hhcnRQb2ludCA9IHRoaXMuZ2V0Q3Vyc29yUG9pbnQodGltZXN0YW1wLCB0aGlzLnNlcmllcywgc2VyaWVzSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2NhbGVJZCA9IHRoaXMuZ2V0U2NhbGVJREZvclNlcmllcyh0aGlzLnNlcmllc1tzZXJpZXNJbmRleF0uc2VyaWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY3Vyc29yUG9zaXRpb24gPSB0aGlzLmdldFBpeGVsc0Zyb21DaGFydFBvaW50KGN1cnNvckNoYXJ0UG9pbnQueCwgY3Vyc29yQ2hhcnRQb2ludC55LCBzY2FsZUlkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vc2V0IGhpZ2hsaWdodCB0byB0cnVlIGlmIGN1cnNvciBpcyBob3ZlcmVkIGFuZCBpZiBpdHMgc2VyaWVzIGlzIGN1cnJlbnRseSBzZWxlY3RlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaGlnaGxpZ2h0Q3Vyc29yID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuaG92ZXJlZFNlcmllcy5pbmRleE9mKHRoaXMuc2VyaWVzW3Nlcmllc0luZGV4XSApICE9IC0xICYmIGhvdmVyZWQgJiYgKHRoaXMuc2VyaWVzLmxlbmd0aCAhPSB0aGlzLmhvdmVyZWRTZXJpZXMubGVuZ3RoIHx8IHRoaXMuaG92ZXJlZFNlcmllcy5sZW5ndGggPT0gMSkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlnaGxpZ2h0Q3Vyc29yID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3JQb3NpdGlvbnMucHVzaChuZXcgQ3Vyc29yUG9zaXRpb25JbmZvKGN1cnNvclBvc2l0aW9uLCB7c2VsZWN0ZWQ6IHNlbGVjdGVkLCBob3ZlcmVkOiBob3ZlcmVkLCBoaWdobGlnaHQ6IGhpZ2hsaWdodEN1cnNvciwgc2VyaWVzOiBbdGhpcy5zZXJpZXNbc2VyaWVzSW5kZXhdXSwgY3Vyc29ySW5kZXg6IGN1cnNvckluZGV4fSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBsZWFkQ3Vyc29yUG9zaXRpb24gPSBuZXcgQ3Vyc29yUG9zaXRpb25JbmZvKGxlYWRDdXJzb3JQaXhlbFBvc2l0aW9uLCB7c2VsZWN0ZWQ6IHNlbGVjdGVkLCBob3ZlcmVkOiBob3ZlcmVkLCBzZXJpZXM6IHRoaXMuc2VyaWVzLCBjdXJzb3JJbmRleDogY3Vyc29ySW5kZXh9KTtcclxuICAgICAgICAgICAgdGhpcy5jdXJzb3JIYW5kbGVyLmRyYXdDdXJzb3IobGVhZEN1cnNvclBvc2l0aW9uLGN1cnNvclBvc2l0aW9ucywgY3Vyc29ySW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgZ2V0U2NhbGVJREZvclNlcmllcyhzZXJpZXM6IEJhc2VTZXJpZXMpIDogc3RyaW5ne1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnNjYWxlcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2NhbGVzW2ldLmhhc1NlcmllKHNlcmllcykpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2NhbGVzW2ldLmlkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRTY2FsZUJ5U2NhbGVJZChzY2FsZUlkKSA6IFNjYWxlfHVuZGVmaW5lZHtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5zY2FsZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZihzY2FsZUlkID09IHRoaXMuc2NhbGVzW2ldLmlkKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNjYWxlc1tpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXV0b1NjYWxlWVNjYWxlcygpe1xyXG4gICAgICAgIGxldCBzY2FsZXMgPSB0aGlzLmdldFlTY2FsZXMoKTtcclxuICAgICAgICBsZXQgY2hhcnRNaW5ZUGl4ZWwgOiBudW1iZXJ8dW5kZWZpbmVkO1xyXG4gICAgICAgIGxldCBjaGFydE1heFlQaXhlbCA6IG51bWJlcnx1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgIGZvciAobGV0IHNjYWxlIG9mIHNjYWxlcyl7XHJcbiAgICAgICAgICAgIGxldCBzZXJpZXNNaW5ZID0gdGhpcy5nZXRTZXJpZXNNaW5ZRm9yU2NhbGUoc2NhbGUpO1xyXG4gICAgICAgICAgICBsZXQgc2VyaWVzTWF4WSA9IHRoaXMuZ2V0U2VyaWVzTWF4WUZvclNjYWxlKHNjYWxlKTtcclxuXHJcbiAgICAgICAgICAgIGlmKHNlcmllc01pblkgIT0gdW5kZWZpbmVkICYmIHNlcmllc01heFkgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGxldCBheGlzTWluWVBpeGVsID0gdGhpcy5jYWxjdWxhdGVQaXhlbFkoc2NhbGUuaWQsIHNlcmllc01pblkpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGF4aXNNYXhZUGl4ZWwgPSB0aGlzLmNhbGN1bGF0ZVBpeGVsWShzY2FsZS5pZCwgc2VyaWVzTWF4WSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoY2hhcnRNaW5ZUGl4ZWwgPT0gdW5kZWZpbmVkIHx8IGF4aXNNaW5ZUGl4ZWwgPiBjaGFydE1pbllQaXhlbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hhcnRNaW5ZUGl4ZWwgPSBheGlzTWluWVBpeGVsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoY2hhcnRNYXhZUGl4ZWwgPT0gdW5kZWZpbmVkIHx8IGF4aXNNYXhZUGl4ZWwgPCBjaGFydE1heFlQaXhlbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hhcnRNYXhZUGl4ZWwgPSBheGlzTWF4WVBpeGVsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihjaGFydE1pbllQaXhlbCAhPSB1bmRlZmluZWQgJiYgY2hhcnRNYXhZUGl4ZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgZm9yIChsZXQgc2NhbGUgb2Ygc2NhbGVzKXtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdBeGlzTWluVmFsdWUgPSB0aGlzLmdldENoYXJ0Q29vcmRpbmF0ZUZyb21QaXhlbCh0aGlzLnByaW1hcnlYQXhpc05hbWUsIHNjYWxlLmlkLCAwLCBjaGFydE1pbllQaXhlbCkueTtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdBeGlzTWF4VmFsdWUgPSB0aGlzLmdldENoYXJ0Q29vcmRpbmF0ZUZyb21QaXhlbCh0aGlzLnByaW1hcnlYQXhpc05hbWUsIHNjYWxlLmlkLCAwLCBjaGFydE1heFlQaXhlbCkueTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVJhbmdlWShzY2FsZSxuZXdBeGlzTWluVmFsdWUsIG5ld0F4aXNNYXhWYWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHJhbmdlIGZvciBYIEF4aXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbmV3TWluWFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG5ld01heFhcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFJhbmdlWChuZXdNaW5YOiBudW1iZXIsIG5ld01heFg6IG51bWJlcil7XHJcbiAgICAgICAgdGhpcy5zY2FsZXNbMF0ubWluWFZhbHVlID0gbmV3TWluWDtcclxuICAgICAgICB0aGlzLnNjYWxlc1swXS5tYXhYVmFsdWUgPSBuZXdNYXhYO1xyXG5cclxuICAgICAgICAvL1RyaWdnZXIgZXZlbnQgc28gYXhpcyByYW5nZSBjYW4gYmUgcGVyc2lzdGVkIHdoZW4gJ0F1dG9TY2FsZScgb3IgJ1Jlc2V0IEFsbCcgIFxyXG4gICAgICAgIGxldCBhcmdzID0gbmV3IEV2ZW50U2NhbGVEYXRhQ2hhbmdlZEFyZ3MoU2NhbGVBY3Rpb24ueFJhbmdlQ2hhbmdlZCwge3NjYWxlOiB0aGlzLnNjYWxlc1swXX0pO1xyXG4gICAgICAgIHRoaXMuc2NhbGVzWzBdLmV2ZW50RGF0YUNoYW5nZWQucmFpc2UodGhpcy5zY2FsZXNbMF0sYXJncyk7XHJcblxyXG4gICAgICAgIGxldCBheGlzID0gdGhpcy5jaGFydC5nZXRBeGlzKHRoaXMucHJpbWFyeVhBeGlzTmFtZSk7XHJcbiAgICAgICAgaWYoIGF4aXMgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgYXhpcy5zZXRBeGlzUmFuZ2Uoe21pbjogbmV3TWluWCwgbWF4OiBuZXdNYXhYfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAgU2V0cyB0aGUgcmFuZ2Ugb2YgdGhpcyBjaGFydCBmb3IgdGhlIGdpdmVuIGF4aXMgYW5kIG1pbi9tYXggdmFsdWVzXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U2NhbGV9IHNjYWxlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbWluWFZhbHVlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbWF4WFZhbHVlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbWluWVZhbHVlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbWF4WVZhbHVlXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtzZXRBeGlzUmFuZ2U9dHJ1ZV1cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFNjYWxlUmFuZ2Uoc2NhbGU6IFNjYWxlLCBtaW5YVmFsdWU6IG51bWJlciwgbWF4WFZhbHVlOiBudW1iZXIsIG1pbllWYWx1ZTogbnVtYmVyLCBtYXhZVmFsdWU6IG51bWJlciwgb3JpZW50YXRpb24/OiBzdHJpbmcsIHNldEF4aXNSYW5nZSA9IHRydWUpIHtcclxuICAgICAgICBzY2FsZS5zZXRTY2FsZVJhbmdlKG1pblhWYWx1ZSwgbWF4WFZhbHVlLCBtaW5ZVmFsdWUsIG1heFlWYWx1ZSk7XHJcblxyXG4gICAgICAgIGlmIChzZXRBeGlzUmFuZ2UpIHtcclxuICAgICAgICAgICAgbGV0IGF4aXMgPSB0aGlzLmNoYXJ0LmdldEF4aXMoc2NhbGUuaWQpO1xyXG4gICAgICAgICAgICBpZiAoYXhpcyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGF4aXMuc2V0QXhpc1JhbmdlKHsgbWluOiBzY2FsZS5taW5ZVmFsdWUsIG1heDogc2NhbGUubWF4WVZhbHVlIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlIFkgcmFuZ2VcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtTY2FsZX0gc2NhbGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5QXhpc01heFZhbHVlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geUF4aXNNaW5WYWx1ZVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXBkYXRlUmFuZ2VZKHNjYWxlOiBTY2FsZSwgeUF4aXNNaW5WYWx1ZTogbnVtYmVyLCB5QXhpc01heFZhbHVlOiBudW1iZXIpe1xyXG4gICAgICAgIGxldCBjaGFydFJhbmdlSGVscGVyID0gbmV3IENoYXJ0UmFuZ2VIZWxwZXI7XHJcbiAgICBcclxuICAgICAgICBpZighaXNOYU4oeUF4aXNNYXhWYWx1ZSkgfHwgIWlzTmFOKHlBeGlzTWluVmFsdWUpKXtcclxuXHJcbiAgICAgICAgICAgIHlBeGlzTWF4VmFsdWUgPSBOdW1iZXIoeUF4aXNNYXhWYWx1ZS50b1ByZWNpc2lvbigxNCkpO1xyXG4gICAgICAgICAgICB5QXhpc01pblZhbHVlID0gTnVtYmVyKHlBeGlzTWluVmFsdWUudG9QcmVjaXNpb24oMTQpKTtcclxuXHJcbiAgICAgICAgICAgIGxldCB5QXhpc1JhbmdlID0geUF4aXNNYXhWYWx1ZSAtIHlBeGlzTWluVmFsdWU7XHJcbiAgICAgICAgICAgIGxldCB5QXhpc09mZnNldDtcclxuICAgICAgICAgICAgaWYoeUF4aXNSYW5nZSA9PSAwKXtcclxuICAgICAgICAgICAgICAgIC8vaWYgcmFuZ2UgaXMgemVybywgd2UgaGF2ZSB0byBjYWxjdWxhdGUgYW4gYXJiaXRyYXJ5IG9mZnNldCB0byBkaXNwbGF5IHRoZSB5IGF4aXMgY29ycmVjdGx5XHJcbiAgICAgICAgICAgICAgICB5QXhpc09mZnNldCA9IGNoYXJ0UmFuZ2VIZWxwZXIuZ2V0QXhpc09mZnNldEZvclN0cmFpZ2h0TGluZXMoeUF4aXNNaW5WYWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGxldCBheGlzID0gdGhpcy5jaGFydC5nZXRBeGlzKHNjYWxlLmlkKTtcclxuICAgICAgICAgICAgICAgIGlmKGF4aXMgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcGl4ZWxSYW5nZSA9IGF4aXMuZ2V0QXhpc1JhbmdlSW5QaXhlbCgpXHJcbiAgICAgICAgICAgICAgICAgICAgeUF4aXNPZmZzZXQgPSBjaGFydFJhbmdlSGVscGVyLmdldEF4aXNPZmZzZXQoeUF4aXNSYW5nZSwocGl4ZWxSYW5nZS5tYXggLSBwaXhlbFJhbmdlLm1pbikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB5QXhpc01heFZhbHVlICs9IHlBeGlzT2Zmc2V0O1xyXG4gICAgICAgICAgICB5QXhpc01pblZhbHVlIC09IHlBeGlzT2Zmc2V0O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgeUF4aXNSYW5nZSA9IHlBeGlzTWF4VmFsdWUhIC0geUF4aXNNaW5WYWx1ZSFcclxuICAgICAgICAgICAgdGhpcy5zZXRTY2FsZVJhbmdlKHNjYWxlLCBzY2FsZS5taW5YVmFsdWUsIHNjYWxlLm1heFhWYWx1ZSwgeUF4aXNNaW5WYWx1ZSwgeUF4aXNNYXhWYWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IG1pbiBZIHZhbHVlIGZyb20gYWxsIHRoZSBzZXJpZXMgaW4gdGhlIGNoYXJ0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7U2NhbGV9IHNjYWxlXHJcbiAgICAgKiBAcmV0dXJucyB7KG51bWJlcnx1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0U2VyaWVzTWluWUZvclNjYWxlKHNjYWxlOiBTY2FsZSkgOiBudW1iZXJ8dW5kZWZpbmVke1xyXG4gICAgICAgIGxldCBtaW5ZOiBudW1iZXJ8dW5kZWZpbmVkID0gdW5kZWZpbmVkXHJcbiAgICBcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2NhbGUuY2hpbGRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYgKG1pblkgPT0gdW5kZWZpbmVkIHx8IHNjYWxlLmNoaWxkc1tpXS5taW5ZISA8IG1pblkpe1xyXG4gICAgICAgICAgICAgICAgbWluWSA9IHNjYWxlLmNoaWxkc1tpXS5taW5ZO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtaW5ZOyAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IG1heCBZIHZhbHVlIGZyb20gYWxsIHRoZSBzZXJpZXMgb24gdGhlIGF4aXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtTY2FsZX0gc2NhbGVcclxuICAgICAqIEByZXR1cm5zIHsobnVtYmVyfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRTZXJpZXNNYXhZRm9yU2NhbGUoc2NhbGU6IFNjYWxlKTogbnVtYmVyfHVuZGVmaW5lZHtcclxuICAgICAgICBsZXQgbWF4WTogbnVtYmVyIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkXHJcbiAgICBcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2NhbGUuY2hpbGRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYgKG1heFkgPT0gdW5kZWZpbmVkIHx8IHNjYWxlLmNoaWxkc1tpXS5tYXhZISA+IG1heFkpe1xyXG4gICAgICAgICAgICAgICAgbWF4WSA9IHNjYWxlLmNoaWxkc1tpXS5tYXhZO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtYXhZOyAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgYXZhaWxhYmxlIHVpIGN1cnNvcnMgYWNjb3JkaW5nIHRvIHRoZSBjdXJyZW50IHN0YXRlIGluIHJlc3BvbnNlIHRvIGEgc3RhdGUgY2hhbmdlLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0N1cnNvclN0YXRlc30gbW9kaWZpZWRTdGF0ZVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZVVJQ3Vyc29ycyAobW9kaWZpZWRTdGF0ZTogQ3Vyc29yU3RhdGVzKSB7XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCBzZXJpZUN1cnNvclR5cGUgPSB0aGlzLmdldFNlcmllQ3Vyc29yVHlwZSgpO1xyXG4gICAgICAgICAgICBsZXQgY3Vyc29yVGltZVN0YXRlcyA9IG1vZGlmaWVkU3RhdGUuZ2V0VGltZVN0YXRlcygpO1xyXG4gICAgICAgICAgICBsZXQgY3Vyc29yRnJlcVN0YXRlcyA9IG1vZGlmaWVkU3RhdGUuZ2V0RnJlcXVlbmN5U3RhdGVzKCk7XHJcbiAgICBcclxuICAgICAgICAgICAgaWYgKHNlcmllQ3Vyc29yVHlwZSA9PSBDdXJzb3JUeXBlLnRpbWVEb21haW4pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQ3Vyc29yTG9hdGlvbnMoY3Vyc29yVGltZVN0YXRlcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoc2VyaWVDdXJzb3JUeXBlID09IEN1cnNvclR5cGUuZnJlcXVlbmN5RG9tYWluKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUN1cnNvckxvYXRpb25zKGN1cnNvckZyZXFTdGF0ZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgLy8gdGhlIHRyeSBjYXRjaCBibG9jayBmaXhlcyBhbiBpbmNvcnJlY3Qgc2VxdWVuY2Ugd2hlbiBjbG9zaW5nIGFuZCByZW9wZW5pbmcgdGhlIGFuYWx5c2lzIHZpZXcgYXMgYSB3b3JrYXJvdW5kIHVudGlsXHJcbiAgICAgICAgICAgIC8vIHRoZSBiaW5kaW5nIGNvbm5lY3Rpb25zIHdpbGwgYmUgY2xlYW5lZCB1cCBjb3JyZWN0bHkuXHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkNoYXJ0QmFzZS51cGRhdGVVSUN1cnNvcnM6IGN1cnNvcnMgY291bGQgbm90IGJlIHVwZGF0ZWQgYmVjYXVzZSBvZiBleGNlcHRpb24gJW9cIixlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIHVwZGF0ZUN1cnNvckxvYXRpb25zIChjdXJzb3JTdGF0ZXM6IElDdXJzb3JTdGF0ZVtdKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGN1cnNvclN0YXRlcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgLy8gdGhpcy5zZXRDdXJzb3JTdGF0ZShpbmRleCwgY3Vyc29yU3RhdGVzW2luZGV4XSk7XHJcbiAgICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgY3Vyc29ycyBvbmx5IGlmIHRoZXkgaGF2ZSBhIHZhbGlkIHBvc2l0aW9uXHJcbiAgICAgICAgICAgIGxldCBwb3NpdGlvbiA9IGN1cnNvclN0YXRlc1tpbmRleF0ucG9zaXRpb247XHJcbiAgICAgICAgICAgIGlmIChwb3NpdGlvbiAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd0N1cnNvcihwb3NpdGlvbiwgaW5kZXgsIGN1cnNvclN0YXRlc1tpbmRleF0uaG92ZXJlZCwgY3Vyc29yU3RhdGVzW2luZGV4XS5zZWxlY3RlZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldE1pblhBeGlzVmFsdWUgKCkgIHtcclxuICAgICAgICBsZXQgYXhpcyA9IHRoaXMuY2hhcnQuZ2V0QXhpcyh0aGlzLnByaW1hcnlYQXhpc05hbWUpO1xyXG4gICAgICAgIGlmKGF4aXMgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIGF4aXMuZ2V0QXhpc1JhbmdlKCkubWluXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRNYXhYQXhpc1ZhbHVlICgpIHtcclxuICAgICAgICBsZXQgYXhpcyA9IHRoaXMuY2hhcnQuZ2V0QXhpcyh0aGlzLnByaW1hcnlYQXhpc05hbWUpO1xyXG4gICAgICAgIGlmKGF4aXMgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIGF4aXMuZ2V0QXhpc1JhbmdlKCkubWF4XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5XHJcbiAgICAgKiBAcmV0dXJucyB7eyB4OiBudW1iZXIsIHk6IG51bWJlcn19XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0UGl4ZWxzRnJvbUNoYXJ0UG9pbnQgKHg6IG51bWJlciwgeTogbnVtYmVyLCBzY2FsZUlEOiBzdHJpbmcpOiB7IHg6IG51bWJlciwgeTogbnVtYmVyfSB7XHJcbiAgICAgICAgbGV0IGNoYXJ0QXJlYSA9IHRoaXMuY2hhcnQuZ2V0Q2hhcnRBcmVhKCk7XHJcbiAgICAgICAgcmV0dXJuIHsgeDogdGhpcy5jYWxjdWxhdGVQaXhlbFgoeCkgLSBjaGFydEFyZWEueCwgeTogdGhpcy5jYWxjdWxhdGVQaXhlbFkoc2NhbGVJRCwgeSkgLSBjaGFydEFyZWEueX07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXZSByZXBvc2l0aW9uIHRoZSBjdXJzb3JzIGFzd2VsbCB3aGVuIHdlIHVwZGF0ZSB0aGUgY2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgcmVwb3NpdGlvbkN1cnNvcnMoKSB7XHJcbiAgICAgICAgLy8gRm9yY2UgdXBkYXRpbmcgdGhlIGN1cnNvcnMgc3RhdGVzIHdoaWNoIGluIHJlc3BvbnNlIHVwZGF0ZXMgdGhlIGN1cnNvciB1aSAuLi4uXHJcbiAgICAgICAgdGhpcy51cGRhdGVDdXJzb3JTdGF0ZXModGhpcy5jdXJzb3JzU3RhdGVzKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY2hhcnRYXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNhbGN1bGF0ZVBpeGVsWCAoY2hhcnRYOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBtaW5YID0gdGhpcy5nZXRNaW5YQXhpc1ZhbHVlKCk7XHJcbiAgICAgICAgbGV0IG1heFggPSB0aGlzLmdldE1heFhBeGlzVmFsdWUoKTsgXHJcblxyXG4gICAgICAgIGlmKG1heFggIT0gdW5kZWZpbmVkICYmIG1pblggIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgbGV0IHJhbmdlID0gKG1heFggLSBtaW5YKVxyXG4gICAgICAgICAgICBsZXQgc3RhcnRYID0gbWluWDsgXHJcbiAgICAgICAgICAgIGxldCBhY3R1YWxSYW5nZSA9IHJhbmdlO1xyXG5cclxuICAgICAgICAgICAgbGV0IHRpbWVQZXJjZW50YWdlID0gKGNoYXJ0WCAtIHN0YXJ0WCkgLyBhY3R1YWxSYW5nZTtcclxuXHJcbiAgICAgICAgICAgIGxldCBjaGFydEFyZWEgPSB0aGlzLmNoYXJ0LmdldENoYXJ0QXJlYSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gY2hhcnRBcmVhLnggKyBjaGFydEFyZWEud2lkdGggKiB0aW1lUGVyY2VudGFnZVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH0gXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGNoYXJ0WVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVQaXhlbFkgKHNjYWxlSUQ6IHN0cmluZywgY2hhcnRZOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBheGlzID0gdGhpcy5jaGFydC5nZXRBeGlzKHNjYWxlSUQpO1xyXG4gICAgICAgIGlmKGF4aXMgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgbGV0IGF4aXNSYW5nZSA9IGF4aXMuZ2V0QXhpc1JhbmdlKClcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCByYW5nZTtcclxuICAgICAgICAgICAgaWYoYXhpc1JhbmdlLmRlbHRhICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICByYW5nZSA9IGF4aXNSYW5nZS5kZWx0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgcmFuZ2UgPSBheGlzUmFuZ2UubWF4IC0gYXhpc1JhbmdlLm1pbjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IHN0YXJ0WSA9IGF4aXNSYW5nZS5taW47XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZVBlcmNlbnRhZ2UgPSAxIC0gKChjaGFydFkgLSBzdGFydFkpIC8gcmFuZ2UpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGNoYXJ0QXJlYSA9IHRoaXMuY2hhcnQuZ2V0Q2hhcnRBcmVhKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBjaGFydEFyZWEueSArIGNoYXJ0QXJlYS5oZWlnaHQgKiB2YWx1ZVBlcmNlbnRhZ2VcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfSBcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZSBkcm9wIGxvY2F0aW9ucyBmcm9tIHRoZSBjaGFydFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlbW92ZVNlcmllRHJvcExvY2F0aW9ucygpe1xyXG4gICAgICAgIGZvcihsZXQgYXhpc0JvdW5kIG9mIHRoaXMuYXhpc0JvdW5kcyl7XHJcbiAgICAgICAgICAgICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQrJ19heGlzRHJvcFpvbmUnK2F4aXNCb3VuZC5heGlzLm5hbWUpLnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKydfYXhpc0Ryb3Bab25lJytcIl9jaGFydEFyZWFcIikucmVtb3ZlKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IG51bWJlciBvZiB5IGF4ZXMgaW5zaWRlIGEgY2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0TnVtYmVyT2ZZU2NhbGVzKCkgOiBudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NhbGVzLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBhbGwgeSBheGVzIGZyb20gYSBjaGFydFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtTY2FsZVtdfVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0WVNjYWxlcygpIDogU2NhbGVbXXtcclxuICAgICAgICByZXR1cm4gdGhpcy5zY2FsZXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBwaXhlbENvb3JkaW5hdGVYXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcGl4ZWxDb29yZGluYXRlWVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBYWUNoYXJ0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRDaGFydENvb3JkaW5hdGVGcm9tUGl4ZWwoc2NhbGVJRFg6IHN0cmluZywgc2NhbGVJRFk6IHN0cmluZyxwaXhlbENvb3JkaW5hdGVYIDogbnVtYmVyLCBwaXhlbENvb3JkaW5hdGVZIDogbnVtYmVyKSA6IFBvaW50e1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBjaGFydEFyZWEgPSB0aGlzLmNoYXJ0LmdldENoYXJ0QXJlYSgpO1xyXG4gICAgICAgIGxldCB4QXhpcyA9IHRoaXMuY2hhcnQuZ2V0QXhpcyhzY2FsZUlEWCk7XHJcbiAgICAgICAgbGV0IHlBeGlzID0gdGhpcy5jaGFydC5nZXRBeGlzKHNjYWxlSURZKTtcclxuICAgICAgICBsZXQgeUF4aXNSYW5nZSA9IHlBeGlzIS5nZXRBeGlzUmFuZ2UoKTtcclxuICAgICAgICBsZXQgeEF4aXNSYW5nZSA9IHhBeGlzIS5nZXRBeGlzUmFuZ2UoKTtcclxuXHJcbiAgICAgICAgLy8gWCBBeGlzOiBcclxuICAgICAgICBsZXQgcmVsYXRpdmVQaXhlbENvb3JkaW5hdGVYID0gQmlnKHBpeGVsQ29vcmRpbmF0ZVgpLm1pbnVzKEJpZyhjaGFydEFyZWEueCkpO1xyXG4gICAgICAgIGxldCBjaGFydEF4aXNYUmFuZ2UgPSBCaWcoeEF4aXNSYW5nZS5tYXgpLm1pbnVzKEJpZyh4QXhpc1JhbmdlLm1pbikpO1xyXG5cclxuICAgICAgICBsZXQgY2hhcnRDb29yZGluYXRlUGVyUGl4ZWwgPSBjaGFydEF4aXNYUmFuZ2UuZGl2KEJpZyhjaGFydEFyZWEud2lkdGgpKTtcclxuICAgICAgICBsZXQgY2xvc2VzdFhBeGlzVmFsdWVUb0NsaWNrID0gQmlnKHhBeGlzUmFuZ2UubWluKS5wbHVzKChyZWxhdGl2ZVBpeGVsQ29vcmRpbmF0ZVgudGltZXMoY2hhcnRDb29yZGluYXRlUGVyUGl4ZWwpKSk7XHJcblxyXG4gICAgICAgIC8vIFkgQXhpczogXHJcbiAgICAgICAgbGV0IHJlbGF0aXZlUGl4ZWxDb29yZGluYXRlWSA9IEJpZyhwaXhlbENvb3JkaW5hdGVZKS5taW51cyhCaWcoY2hhcnRBcmVhLnkpKTtcclxuICAgICAgICBsZXQgY2hhcnRBeGlzWVJhbmdlID0gQmlnKHlBeGlzUmFuZ2UubWF4KS5taW51cyhCaWcoeUF4aXNSYW5nZS5taW4pKTtcclxuXHJcbiAgICAgICAgY2hhcnRDb29yZGluYXRlUGVyUGl4ZWwgPSBjaGFydEF4aXNZUmFuZ2UuZGl2KEJpZyhjaGFydEFyZWEuaGVpZ2h0KSk7XHJcbiAgICAgICAgbGV0IGNsb3Nlc3RZQXhpc1ZhbHVlVG9DbGljayA9ICBCaWcoeUF4aXNSYW5nZS5taW4pLnBsdXMoY2hhcnRBeGlzWVJhbmdlLm1pbnVzKHJlbGF0aXZlUGl4ZWxDb29yZGluYXRlWS50aW1lcyhjaGFydENvb3JkaW5hdGVQZXJQaXhlbCkpKVxyXG5cclxuXHJcbiAgICAgICAgbGV0IGNsb3Nlc3RZQXhpc1ZhbHVlTnVtYmVyID0gTnVtYmVyKGNsb3Nlc3RZQXhpc1ZhbHVlVG9DbGljay50b0ZpeGVkKDE0KSk7XHJcbiAgICAgICAgbGV0IGNsb3Nlc3RYQXhpc1ZhbHVlTnVtYmVyID0gTnVtYmVyKGNsb3Nlc3RYQXhpc1ZhbHVlVG9DbGljay50b0ZpeGVkKDE0KSk7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUG9pbnQoY2xvc2VzdFhBeGlzVmFsdWVOdW1iZXIsIGNsb3Nlc3RZQXhpc1ZhbHVlTnVtYmVyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldHMgYSBzZXJpZXMgcG9pbnQgaW4gY2hhcnQgY29vcmRpbmF0ZXMgZm9yIHRoZSBzcGVjZWZpZWQgdGltZXN0YW1wXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWVzdGFtcFxyXG4gICAgICogQHJldHVybnMge1BvaW50fVxyXG4gICAgICogQG1lbWJlcm9mIFlUQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldFNlcmllc1BvaW50RnJvbVRpbWVzdGFtcCh0aW1lc3RhbXA6IG51bWJlcik6IFBvaW50IHtcclxuXHJcbiAgICAgICAgLy8gd2UgcHJvdmlkZSB5ID09IDAgaWYgd2UgYXJlIG5vdCBhYmxlIHRvIGZpbmQgbWF0Y2hpbmcgcG9pbnRzXHJcbiAgICAgICAgbGV0IHNlcmllc1BvaW50ID0gbmV3IFBvaW50KHRpbWVzdGFtcCwgMCk7XHJcblxyXG4gICAgICAgIC8vIHNraXAgc2VhcmNoaW5nIGlmIHRoZSBzZXJpZXMgaW5kZXggaXMgb3V0IG9mIHJhbmdlXHJcbiAgICAgICAgaWYgKHRoaXMuc2VyaWVzLmxlbmd0aCA9PSAwICkgcmV0dXJuIHNlcmllc1BvaW50O1xyXG5cclxuICAgICAgICAvLyBmaW5kIGEgbWF0Y2hpbmcgc2VyaWVzIHBvaW50IHJlbGF0ZWQgdG8gdGhlIHRpbWVzdGFtcFxyXG4gICAgICAgIHNlcmllc1BvaW50ID0gdGhpcy5maW5kTmVhcmVzdFBvaW50SW5BbGxTZXJpZXModGltZXN0YW1wKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHNlcmllc1BvaW50O1xyXG4gICAgfVxyXG4gIFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VhcmNoZXMgZm9yIHRoZSBuZWFyZXN0IHBvaW50IHJlbGF0ZWQgdG8gdGhlIHRpbWVzdGFtcCBpbiBhbGwgc2VyaWVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lc3RhbXBcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZmluZE5lYXJlc3RQb2ludEluQWxsU2VyaWVzKHRpbWVzdGFtcDogbnVtYmVyKTogUG9pbnQgeyAgICAgICBcclxuXHJcbiAgICAgICAgLy8gY29sbGVjdCB0aGUgbmVhcmVzdCBwb2ludHMgZnJvbSBldmVyeSBzZXJpZXNcclxuICAgICAgICBsZXQgbmVhcmVzdFNlcmllc1BvaW50czogSVBvaW50W10gPSB0aGlzLnNlcmllcy5tYXAoKHNpbmdsZVNlcmllcyk9PiB7IHJldHVybiBzaW5nbGVTZXJpZXMuc2VyaWUucG9pbnRGcm9tVGltZXN0YW1wKHRpbWVzdGFtcCl9KTtcclxuXHJcbiAgICAgICAgLy8gc29ydCB0aGUgbmVhcmVzdCBwb2ludHMgYnkgdGhlaXIgdGltZXN0YW1wIHZhbHVlXHJcbiAgICAgICAgbmVhcmVzdFNlcmllc1BvaW50cy5zb3J0KCh2YWx1ZTEsIHZhbHVlMikgPT4geyByZXR1cm4gdmFsdWUxLnggLSB2YWx1ZTIueDsgfSk7XHJcblxyXG4gICAgICAgIC8vIGdldCB0aGUgdGltZXN0YW1wIHZhbHVlc1xyXG4gICAgICAgIGxldCBuZWFyZXN0U2VyaWVzVGltZXN0YW1wczogbnVtYmVyW10gPSBuZWFyZXN0U2VyaWVzUG9pbnRzLm1hcCgoc2VyaWVzUG9pbnQpPT57IHJldHVybiBzZXJpZXNQb2ludC54fSk7XHJcblxyXG4gICAgICAgIC8vIGZpbmQgdGhlIG5lYXJlc3QgcG9pbnQgZnJvbSBhbGwgc2VyaWVzLiBUaGUgZm91bmQgaW5kZXggcmVmZXJzIHRvIHRoZSBuZWFyZXN0IHNlcmllcyAhXHJcbiAgICAgICAgbGV0IG5lYXJlc3RTZXJpZXNJbmRleCA9IFNlcmllc0hlbHBlci5pbmRleE9mTmVhcmVzdCh0aW1lc3RhbXAsIG5lYXJlc3RTZXJpZXNUaW1lc3RhbXBzKTtcclxuXHJcbiAgICAgICAgLy8gZ2V0IHRoZSBuZWFyZXN0IHBvaW50IGZyb20gdGhlIHNlcmllc1xyXG4gICAgICAgIGxldCBzZXJpZXNQb2ludEZyb21UaW1lU3RhbXAgPSBuZWFyZXN0U2VyaWVzUG9pbnRzW25lYXJlc3RTZXJpZXNJbmRleF07XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSBhIHBvaW50IGluc3RhbmNlIHdpdGggYSBtYXRjaGluZyB0aW1lc3RhbXBcclxuICAgICAgICBsZXQgc2VyaWVzUG9pbnQgPSBzZXJpZXNQb2ludEZyb21UaW1lU3RhbXAgPyBuZXcgUG9pbnQoc2VyaWVzUG9pbnRGcm9tVGltZVN0YW1wLngsIHNlcmllc1BvaW50RnJvbVRpbWVTdGFtcC55KSA6IG5ldyBQb2ludCh0aW1lc3RhbXAsIDApO1xyXG5cclxuICAgICAgICByZXR1cm4gc2VyaWVzUG9pbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIHByb3BlcnR5IGNvbnRhaW5pbmcgZGF0YSB0byBiZSBkcmF3blxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNlcmllXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYXhpc0lEXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzaWNDaGFydFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlVHJhY2VEYXRhU2VyaWVzKHNlcmllOiBCYXNlU2VyaWVzLCBheGlzSUQ6IHN0cmluZyk6IHt9IHtcclxuICAgICAgICBsZXQgcHJvcGVydGllcyA9IHtcclxuICAgICAgICAgICAgbmFtZTogc2VyaWUuaWQsXHJcbiAgICAgICAgICAgIHR5cGU6ICdsaW5lJyxcclxuICAgICAgICAgICAgZGF0YVNvdXJjZTogc2VyaWUuZGF0YSxcclxuICAgICAgICAgICAgeE5hbWU6IFwieFwiLFxyXG4gICAgICAgICAgICB5TmFtZTogXCJ5XCIsXHJcbiAgICAgICAgICAgIGZpbGw6IHNlcmllLmNvbG9yLFxyXG4gICAgICAgICAgICB5QXhpc05hbWU6IGF4aXNJRCxcclxuICAgICAgICAgICAgX3lBeGlzTmFtZTogYXhpc0lELFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBwcm9wZXJ0aWVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBPdmVybG9hZCBtZXRob2RzIGluIGRlcml2ZWQgY2hhcnQgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXHJcbiAgICBcclxuICAgIHB1YmxpYyByZW1vdmVZU2NhbGVGcm9tQ2hhcnQoeVNjYWxlOiBTY2FsZSl7fTtcclxuXHJcbiAgICBwdWJsaWMgb25TeW5jaHJvbml6ZVNjYWxlUmFuZ2Uoc2NhbGUgOiBTY2FsZSwgbWluOm51bWJlciwgbWF4Om51bWJlcikge31cclxuXHJcbiAgICBwdWJsaWMgc2V0QXZhaWxhYmxlU2VyaWVzQXNEYXRhU291cmNlKCl7fVxyXG5cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlQ2hhcnRSYW5nZVgoeEF4aXNNaW5WYWx1ZTogbnVtYmVyLCB4QXhpc01heFZhbHVlOiBudW1iZXIgKSB7XHJcbiAgICAgICAgbGV0IGNoYXJ0UmFuZ2VIZWxwZXIgPSBuZXcgQ2hhcnRSYW5nZUhlbHBlcigpXHJcblxyXG5cclxuICAgICAgICBpZih4QXhpc01heFZhbHVlICE9IHVuZGVmaW5lZCAmJiB4QXhpc01pblZhbHVlICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGxldCB4QXhpc1NlZ21lbnRSYW5nZSA9IHhBeGlzTWF4VmFsdWUgLSB4QXhpc01pblZhbHVlO1xyXG4gICAgICAgICAgICBsZXQgeEF4aXNPZmZzZXQ7XHJcbiAgICAgICAgICAgIGlmKHhBeGlzU2VnbWVudFJhbmdlID09IDApe1xyXG4gICAgICAgICAgICAgICAgeEF4aXNPZmZzZXQgPSBjaGFydFJhbmdlSGVscGVyLmdldEF4aXNPZmZzZXRGb3JTdHJhaWdodExpbmVzKHRoaXMuc2VyaWVzWzBdLnJhd1BvaW50c1swXS54KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgbGV0IGF4aXMgPSB0aGlzLmNoYXJ0LmdldEF4aXModGhpcy5wcmltYXJ5WEF4aXNOYW1lKTtcclxuICAgICAgICAgICAgICAgIGlmKGF4aXMgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYXhpc1BpeGVsUmFuZ2UgPSBheGlzLmdldEF4aXNSYW5nZUluUGl4ZWwoKTtcclxuICAgICAgICAgICAgICAgICAgICB4QXhpc09mZnNldCA9IGNoYXJ0UmFuZ2VIZWxwZXIuZ2V0QXhpc09mZnNldCh4QXhpc1NlZ21lbnRSYW5nZSwgKGF4aXNQaXhlbFJhbmdlLm1heCAtIGF4aXNQaXhlbFJhbmdlLm1pbikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHhBeGlzTWF4VmFsdWUhICs9IHhBeGlzT2Zmc2V0O1xyXG4gICAgICAgICAgICB4QXhpc01pblZhbHVlISAtPSB4QXhpc09mZnNldDtcclxuICAgICAgICAgICAgeEF4aXNTZWdtZW50UmFuZ2UgPSB4QXhpc01heFZhbHVlIC0geEF4aXNNaW5WYWx1ZTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0UmFuZ2VYKHhBeGlzTWluVmFsdWUsIHhBeGlzTWF4VmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBnZXRUaW1lc3RhbXBJblNlcmllcyhwOiBQb2ludCwgc2VyaWVzIDogQ2hhcnRWaWV3U2VyaWVbXSk6IG51bWJlciB7IHJldHVybiBwLng7IH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZ2V0Q3Vyc29yUG9pbnQodGltZXN0YW1wOiBudW1iZXIsc2VyaWVzOiBDaGFydFZpZXdTZXJpZVtdLCBzZXJpZXNJbmRleDpudW1iZXIpOiBUaW1lUG9pbnQgeyByZXR1cm4ge3g6IHRpbWVzdGFtcCx5OiAwLCB0aW1lc3RhbXA6IHRpbWVzdGFtcH07fVxyXG5cclxuICAgIHB1YmxpYyBhZGRTZXJpZURyb3BMb2NhdGlvbnMoc2VyaWU6IEFycmF5PEJhc2VTZXJpZXM+LCBjaGFydE1hbmFnZXJDaGFydCl7fTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgYWRkRHJvcExvY2F0aW9ucyAoc2VyaWU6IEJhc2VTZXJpZXMpe307XHJcblxyXG4gICAgcHVibGljIGdldERyb3BMb2NhdGlvblR5cGUoY3VycmVudFRhcmdldDogYW55KTogRHJvcExvY2F0aW9uVHlwZXsgcmV0dXJuIERyb3BMb2NhdGlvblR5cGUuaW52YWxpZDsgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRZU2NhbGUoc2NhbGUgOiBTY2FsZSwgcG9zaXRpb246IEF4aXNQb3NpdGlvbil7fVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVEcm9wcGFibGVBcmVhcyhjdXJyZW50VGFyZ2V0KSB7fTtcclxuXHJcbiAgICBwdWJsaWMgcmVzZXRIaWdobGlnaHRpbmcoKXt9O1xyXG5cclxuICAgIHByb3RlY3RlZCBnZXRVc2VkQ3Vyc29yU3RhdGVzKCk6IEFycmF5PElDdXJzb3JTdGF0ZT4geyByZXR1cm4gW119O1xyXG59XHJcblxyXG5leHBvcnQgeyBDaGFydEJhc2UsIEV2ZW50UmVkcmF3QWxsQ2hhcnRzLCBFdmVudFJlZHJhd0FsbENoYXJ0c0FyZ3MsIEV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb24sIEV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb25BcmdzLCBDaGFydE9iamVjdFR5cGUsIERyb3BMb2NhdGlvblR5cGUsIENoYXJ0T2JqZWN0SW5mb3JtYXRpb259O1xyXG5cclxuIl19