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
define(["require", "exports", "../common/widgetBase", "./helpers/chartRangeHelper", "../../framework/events", "./userInteraction/userInteractionController", "../../models/common/point", "../common/states/cursorStates", "./cursor/CursorPositionInfo", "./chartViewSerie", "../../common/seriesHelper", "./chartWrapper/SFChartWrapper", "../../core/interfaces/components/ui/chart/chartInterface", "../../models/chartManagerDataModel/eventScaleDataChangedArgs"], function (require, exports, widgetBase_1, chartRangeHelper_1, events_1, userInteractionController_1, point_1, cursorStates_1, CursorPositionInfo_1, chartViewSerie_1, seriesHelper_1, SFChartWrapper_1, chartInterface_1, eventScaleDataChangedArgs_1) {
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
    var ChartBase = /** @class */ (function (_super) {
        __extends(ChartBase, _super);
        function ChartBase(chartManager, name, scale) {
            var _this = _super.call(this) || this;
            _this.widgetName = "";
            _this.textMeasurementCanvasId = "textMeasurementCanvas";
            _this.series = [];
            _this.hoveredSeries = [];
            _this.scales = [];
            //private keyEventsPlaced = false;
            _this.cursorStatesId = "CursorStates";
            _this.cursorHoverDistance = 8;
            _this.draggedSeriesIndex = 0;
            _this.axisBounds = [];
            _this.xAxisWidth = 0;
            _this.yAxisAlignmentOffset = 0;
            _this.flaggedForResize = false;
            _this.widgetName = name;
            _this.chartManager = chartManager;
            _this.scales.push(scale);
            _this.eventUserChartInteraction = new EventUserChartInteraction();
            return _this;
        }
        /**
         * Destroy object
         *
         * @memberof ChartBase
         */
        ChartBase.prototype.dispose = function () {
            var chartObj = $(this.cssParentContentId).data("ejChart");
            chartObj.destroy();
            _super.prototype.dispose.call(this);
        };
        /**
         *
         *
         * @param {string} containerId
         * @memberof ChartBase
         */
        ChartBase.prototype.initialize = function (containerId) {
            var _this = this;
            this.parentContentId = containerId;
            var newChart = new SFChartWrapper_1.SFChartWrapper(this.cssParentContentId, this.scales[0], this.primaryXAxisName);
            newChart.eventAxisRangeChanged.attach(function (sender, args) { return _this.onAxisRangeChanged(sender, args); });
            newChart.eventMouseAction.attach(function (sender, args) { return _this.onMouseAction(sender, args); });
            newChart.eventMouseWheel.attach(function (sender, args) { return _this.onChartMouseWheel(sender, args); });
            this.chartInstance = newChart._SFChart;
            this.chart = newChart;
            this.setBoxZoom(false);
            this.setAvailableSeriesAsDataSource();
            //WE want to keep this for cursor movement later on
            // this.addKeyRelatedEvents();
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
                            this.chartManager.redrawCharts();
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
         * This method must be run after the entire initialisation process is done
         * the derived classes needs the ChartBase init function to be called first
         * but the cursors are added in the separate derived classes and we cannot
         * observe state changes until everything is in place. Therefore the
         * Observed states are outside.
         *
         * @memberof ChartBase
         */
        ChartBase.prototype.observeStates = function () {
            var _this = this;
            this.states.observe(cursorStates_1.CursorStates, function (modifiedState, oldState) {
                _this.updateCursorStatesWithNewModifiedStates(modifiedState);
            }, this.cursorStatesId);
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
                var cursorState = this.states.read(cursorStates_1.CursorStates, this.cursorStatesId);
                var index = cursorState.getHoveredCursorIndex();
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
         * THis method is called by the InteractionStrategies when a cursor
         * is being dragged.
         *
         * @memberof ChartBase
         */
        ChartBase.prototype.dragCursorAlongLine = function (mouseX, mouseY) {
            this.dragCursor(mouseX, mouseY);
        };
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
            var cursorsStates = this.states.read(cursorStates_1.CursorStates, this.cursorStatesId);
            cursorsStates.setLastCursorTypeSelected(cursorStates_1.CursorType.timeDomain);
            var hoveredCursorIndex = cursorsStates.getHoveredCursorIndex();
            if (hoveredCursorIndex != -1) { // Set selected cursor when hovered cursor was found
                cursorsStates.setSelected(hoveredCursorIndex, true);
            }
            else {
                cursorsStates.setSelected(cursorsStates.getSelectedCursorIndex(), true);
            }
            this.updateSelectedCursor(cursorsStates, x, y);
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
            this.states.update(cursorStates_1.CursorStates, cursorsStates, this.cursorStatesId);
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
        ChartBase.prototype.dragCursor = function (x, y) {
            if (!this.series.length) {
                return;
            }
            var cursorsStates = this.states.read(cursorStates_1.CursorStates, this.cursorStatesId);
            if (this.hoveredSeries.length != 0) {
                var point = this.getChartCoordinateFromPixel(this.primaryXAxisName, this.scales[0].id, x, y);
                var nearestTimestampFromSingleSeries = this.getTimestampInSeries(point, this.hoveredSeries);
                cursorsStates.setPosition(cursorsStates.getSelectedCursorIndex(), nearestTimestampFromSingleSeries);
            }
            this.states.update(cursorStates_1.CursorStates, cursorsStates, this.cursorStatesId);
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
                var cursorStates = this.states.read(cursorStates_1.CursorStates, this.cursorStatesId);
                var chartArea = this.chart.getChartArea();
                var actualMousePoint = new point_1.Point(mousePoint.x - chartArea.x, mousePoint.y - chartArea.y);
                var closestCursorPosition = this.cursorHandler.getClosestCursorPositionToPoint(actualMousePoint);
                if (closestCursorPosition != undefined) {
                    var distanceToCursor = closestCursorPosition.additionalInformation["distance"];
                    this.hoveredSeries = [];
                    var closestCursorIndex = void 0;
                    if (distanceToCursor < this.cursorHoverDistance) {
                        closestCursorPosition.additionalInformation["highlight"] = true;
                        closestCursorIndex = closestCursorPosition.additionalInformation["cursorIndex"];
                        this.hoveredSeries = closestCursorPosition.additionalInformation["series"];
                    }
                    cursorStates = this.updateHoveringStatesInCursors(cursorStates, closestCursorIndex);
                    this.states.update(cursorStates_1.CursorStates, cursorStates, this.cursorStatesId);
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
        /*private getSeriesIndexFromCursor(cursor : MainCursorWidget) : number{
            let currentCursorHandler : SerieCursor|undefined;
            
            /*for(let cursorHandler of this.cursorHandler.serieCursors){
                if(cursorHandler.cursors.indexOf(cursor) != -1){
                    currentCursorHandler = cursorHandler
                }
            }*/ /*

        if(currentCursorHandler != undefined){
            for(let i = 0;  i < this.series.length ; i++){
                if(currentCursorHandler.serie == this.series[i].serie){
                    return i;
                }
            }
        }
        return -1;
    }*/
        /**
         * Internal method to calculate the state which is to be updated in the
         * states to be HOVERING. This method will also reset the correct states
         * to it's previous values if non of the cursors are hovering. This methods
         * should be able to move into the CursorStates class one day hopefully.
         * Hence extracted in it's own method.
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
        ChartBase.prototype.addSeriesToChart = function (series, yScale) {
            for (var i = 0; i < series.length; i++) {
                if (series[i].rawPointsValid == true) {
                    var chartSeries = new chartViewSerie_1.ChartViewSerie(series[i], yScale);
                    this.series.push(chartSeries);
                }
            }
        };
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
            this.chartManager.redrawCharts();
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
         *
         *
         * @private
         * @memberof ChartBase
         */
        /*private addKeyRelatedEvents () {
            if (!this.keyEventsPlaced) {
                this.moveCursorWithKey = this.moveCursorWithKey.bind(this);
                this.removeKeyRelatedEvents = this.removeKeyRelatedEvents.bind(this)
                document.addEventListener('keydown', this.moveCursorWithKey, true);
                document.addEventListener('click', this.removeKeyRelatedEvents, true);
                this.chartInstance.chartContainer.off('click');
                this.keyEventsPlaced = true;
            }
        };*/
        /**
         *
         *
         * @private
         * @param {*} e
         * @memberof ChartBase
         */
        /*private removeKeyRelatedEvents (e) {
            let targetId = (e.target.id === '') ? e.target.parentElement.id : e.target.id;
    
            if (targetId != this.parentContentId &&
                !targetId.includes('ursor1') &&
                !targetId.includes('ursor2') &&
                !targetId.includes('RefCursor') &&
                !targetId.includes('CursorInfo_main_Move')) {
                document.removeEventListener('keydown', this.moveCursorWithKey, true);
                document.removeEventListener('click', this.removeKeyRelatedEvents, true);
                this.chartInstance.chartContainer.on('click', this.addKeyRelatedEvents.bind(this));
                this.keyEventsPlaced = false;
                for (let cursor of this.cursorHandlers) {
                    cursor.deselectCursors();
                }
            }
        }*/
        /**
         * Move cursor with key
         *
         * @private
         * @param {*} e
         * @memberof ChartBase
         */
        ChartBase.prototype.moveCursorWithKey = function (e) {
            var moveAdd = 0.0;
            if (e.keyCode === 37 || e.keyCode === 39) {
                e.preventDefault();
                e.stopImmediatePropagation();
                moveAdd = (e.keyCode === 37) ? -0.01 : 0.01;
                moveAdd *= (e.ctrlKey) ? 10 : 1;
            }
            if (moveAdd !== 0.0) {
                this.placeReferenceCursorFromKey(moveAdd);
            }
        };
        ;
        /**
         *
         *
         * @private
         * @param {number} moveAdd
         * @memberof ChartBase
         */
        ChartBase.prototype.placeReferenceCursorFromKey = function (moveAdd) {
            // let index = this.getActiveCursor();
            // let dataPoint = this.getCursorPosition(index)
            // dataPoint._x += moveAdd;
            // if(dataPoint != undefined){
            //     if(dataPoint.x != undefined){
            //         this.chartManager.synchronizeCursorsPosition(dataPoint, index);
            //     }
            //     else{console.log("undefined")};
            // }
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
                //calculate the cursor position for the lead cursor
                var leadCursorChartPoint = this.calculateLeadCursorChartPoint(timestamp, this.series);
                var leadCursorPixelPosition = void 0;
                var leadCursorTimestamp = void 0;
                var cursorPositions = [];
                if (leadCursorChartPoint != undefined) {
                    leadCursorPixelPosition = this.getPixelsFromChartPoint(leadCursorChartPoint.x, leadCursorChartPoint.y, this.primaryYAxisName);
                    leadCursorTimestamp = this.getTimestampInSeries(leadCursorChartPoint, this.series);
                    //calculate the cursor positions for all series
                    cursorPositions = [];
                    for (var seriesIndex = 0; seriesIndex < this.series.length; seriesIndex++) {
                        if (leadCursorTimestamp >= this.series[seriesIndex].serie.timestamps[0] && leadCursorTimestamp <= this.series[seriesIndex].serie.timestamps[this.series[seriesIndex].serie.timestamps.length - 1]) {
                            var cursorPoint = this.getCursorPoint(leadCursorTimestamp, seriesIndex);
                            var scaleId = this.getScaleIDForSeries(this.series[seriesIndex].serie);
                            var cursorPosition = this.getPixelsFromChartPoint(cursorPoint.x, cursorPoint.y, scaleId);
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
                if (this.scales[i].hasExactSerie(series)) {
                    return this.scales[i].id;
                }
            }
            return "";
        };
        /**
         *calculate the lead cursor chart point
         *
         * @private
         * @param {*} timestamp
         * @param {ChartViewSerie[]} series
         * @returns
         * @memberof ChartBase
         */
        ChartBase.prototype.calculateLeadCursorChartPoint = function (timestamp, series) {
            var leadCursorPoint;
            var minDistancePointToCursor;
            //calculate lead cursor position from the available series
            for (var seriesIndex = 0; seriesIndex < series.length; seriesIndex++) {
                var cursorPoint = this.getCursorPoint(timestamp, seriesIndex);
                if (timestamp >= this.series[seriesIndex].serie.timestamps[0] && timestamp <= this.series[seriesIndex].serie.timestamps[this.series[seriesIndex].serie.timestamps.length - 1]) {
                    if (minDistancePointToCursor == undefined || Math.abs(cursorPoint.x - timestamp) < minDistancePointToCursor) {
                        minDistancePointToCursor = Math.abs(cursorPoint.x - timestamp);
                        leadCursorPoint = cursorPoint;
                    }
                }
            }
            return leadCursorPoint;
        };
        ChartBase.prototype.getScaleByScaleId = function (scaleId) {
            for (var i = 0; i < this.scales.length; i++) {
                if (scaleId == this.scales[i].id) {
                    return this.scales[i];
                }
            }
        };
        ChartBase.prototype.resetYScalesChartZoom = function () {
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
            var axis = this.chart.getAxis(this.primaryXAxisName);
            if (axis != undefined) {
                axis.setAxisRange({ min: newMinX, max: newMaxX });
            }
        };
        /**
         * Sets the range of this chart for the given axis and min/max values
         *
         * @private
         * @param {string} axisName
         * @param {*} axis
         * @param {number} minValue
         * @param {number} maxValue
         * @memberof ChartBase
         */
        ChartBase.prototype.setScaleRange = function (scale, minXValue, maxXValue, minYValue, maxYValue, orientation, setAxisRange) {
            if (setAxisRange === void 0) { setAxisRange = true; }
            var triggerChangedEvenet = false;
            if (scale.minXValue != minXValue || scale.maxXValue != maxXValue) {
                triggerChangedEvenet = true;
            }
            scale.minYValue = minYValue;
            scale.maxYValue = maxYValue;
            scale.minXValue = minXValue;
            scale.maxXValue = maxXValue;
            if (triggerChangedEvenet) {
                var args = new eventScaleDataChangedArgs_1.EventScaleDataChangedArgs(eventScaleDataChangedArgs_1.ScaleAction.rangeChanged, { scale: scale });
                scale.eventDataChanged.raise(scale, args);
            }
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
         *
         *
         * @private
         * @param {CursorStates} modifiedState
         * @memberof ChartBase
         */
        ChartBase.prototype.updateCursorStatesWithNewModifiedStates = function (modifiedState) {
            this.cursorStates = modifiedState;
            var serieCursorType = this.getSerieCursorType();
            var cursorTimeStates = modifiedState.getTimeStates();
            var cursorFreqStates = modifiedState.getFrequencyStates();
            if (serieCursorType == cursorStates_1.CursorType.timeDomain) {
                this.updateCursorStates(cursorTimeStates);
            }
            else if (serieCursorType == cursorStates_1.CursorType.frequencyDomain) {
                this.updateCursorStates(cursorFreqStates);
            }
        };
        ChartBase.prototype.updateCursorStates = function (cursorStates) {
            for (var index = 0; index < cursorStates.length; index++) {
                this.setCursorState(index, cursorStates[index]);
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
         * @param {number} index
         * @param {ICursorState} cursorState
         * @memberof ChartBase
         */
        ChartBase.prototype.setCursorState = function (index, cursorState) {
            /*for (let cursorHandler of this.cursorHandler.serieCursors) {
                cursorHandler.setCursorState(index, cursorState);
            }*/
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
            var _this = this;
            var store = this.states.read(cursorStates_1.CursorStates, "CursorStates");
            var chartArea = this.chart.getChartArea();
            /*for (let cursor of this.cursorHandler.serieCursors) {
                cursor.drawCursors(chartArea.x, chartArea.y, chartArea.height, chartArea.width, store.getActive(store.getSelectedCursorIndex()) == true);
            }*/
            this.states.refresh(cursorStates_1.CursorStates, function (modifiedState) { _this.updateCursorStatesWithNewModifiedStates(modifiedState); }, this.cursorStatesId);
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
                var timePercentage = 1 - ((chartY - startY) / range);
                var chartArea = this.chart.getChartArea();
                return chartArea.y + chartArea.height * timePercentage;
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
            var closestYAxisValueNumber = Number(closestYAxisValueToClick.toFixed(14).toString());
            var closestXAxisValueNumber = Number(closestXAxisValueToClick.toFixed(14).toString());
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
        ChartBase.prototype.updateChartRangeX = function () {
            var chartRangeHelper = new chartRangeHelper_1.ChartRangeHelper();
            var xAxisMinValue = this.getTotalMinX(this.chartManager.traceChartList);
            var xAxisMaxValue = this.getTotalMaxX(this.chartManager.traceChartList);
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
        ChartBase.prototype.getCursorPoint = function (timestamp, seriesIndex) { return new point_1.Point(timestamp, 0); };
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
        return ChartBase;
    }(widgetBase_1.WidgetBase));
    exports.ChartBase = ChartBase;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hhcnRCYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0Vmlld1dpZGdldC9DaGFydEJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQXdCQSxJQUFLLGVBT0o7SUFQRCxXQUFLLGVBQWU7UUFDaEIseURBQU0sQ0FBQTtRQUNOLHlEQUFNLENBQUE7UUFDTixxREFBSSxDQUFBO1FBQ0osaUVBQVUsQ0FBQTtRQUNWLGlFQUFVLENBQUE7UUFDViwyREFBTyxDQUFBO0lBQ1gsQ0FBQyxFQVBJLGVBQWUsS0FBZixlQUFlLFFBT25CO0lBNnlDNkUsMENBQWU7SUEzeUM3RixJQUFLLGdCQUlKO0lBSkQsV0FBSyxnQkFBZ0I7UUFDakIscUVBQVcsQ0FBQTtRQUNYLHlFQUFhLENBQUE7UUFDYiw2REFBTyxDQUFBO0lBQ1gsQ0FBQyxFQUpJLGdCQUFnQixLQUFoQixnQkFBZ0IsUUFJcEI7SUF1eUM4Riw0Q0FBZ0I7SUFyeUMvRztRQUlJLGdDQUFZLGVBQWdDLEVBQUUsSUFBVTtZQUNwRCxJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztZQUN2QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNyQixDQUFDO1FBQ0wsNkJBQUM7SUFBRCxDQUFDLEFBUkQsSUFRQztJQTZ4Q2dILHdEQUFzQjtJQTN4Q3ZJO1FBQXdDLDZDQUFxRDtRQUE3Rjs7UUFBK0YsQ0FBQztRQUFELGdDQUFDO0lBQUQsQ0FBQyxBQUFoRyxDQUF3QyxtQkFBVSxHQUE4QztJQTJ4QzVFLDhEQUF5QjtJQTN4Q21ELENBQUM7SUFFakc7UUFJSSx1Q0FBWSxvQkFBcUMsRUFBRSxjQUFvQjtZQUNuRSxJQUFJLENBQUMsb0JBQW9CLEdBQUcsb0JBQW9CLENBQUM7WUFDakQsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7UUFDekMsQ0FBQztRQUNMLG9DQUFDO0lBQUQsQ0FB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VHJhY2VDaGFydCB9IGZyb20gXCJpbnRlcmZhY2VzL3RyYWNlQ2hhcnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ2hhcnRWaWV3Q2hhcnRNYW5hZ2VyIH0gZnJvbSBcIi4vY2hhcnRWaWV3Q2hhcnRNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFpvb21EaXJlY3Rpb24gfSBmcm9tIFwiLi9jaGFydFZpZXdXaWRnZXRcIjtcclxuaW1wb3J0IHsgV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vd2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBDaGFydFJhbmdlSGVscGVyIH0gZnJvbSBcIi4vaGVscGVycy9jaGFydFJhbmdlSGVscGVyXCI7XHJcbmltcG9ydCB7IFR5cGVkRXZlbnQgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2V2ZW50c1wiO1xyXG5pbXBvcnQgeyBNb3VzZUFjdGlvblR5cGUgfSBmcm9tIFwiLi91c2VySW50ZXJhY3Rpb24vdXNlckludGVyYWN0aW9uQ29udHJvbGxlclwiO1xyXG5pbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvYmFzZVNlcmllc1wiO1xyXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL3BvaW50XCI7XHJcbmltcG9ydCB7IEN1cnNvclN0YXRlcywgQ3Vyc29yVHlwZSB9IGZyb20gXCIuLi9jb21tb24vc3RhdGVzL2N1cnNvclN0YXRlc1wiO1xyXG5pbXBvcnQgeyBDdXJzb3JIYW5kbGVyIH0gZnJvbSBcIi4vY3Vyc29yL0N1cnNvckhhbmRsZXJcIjtcclxuaW1wb3J0IHsgQ3Vyc29yUG9zaXRpb24gYXMgQ3Vyc29yUG9zaXRpb25JbmZvIH0gZnJvbSBcIi4vY3Vyc29yL0N1cnNvclBvc2l0aW9uSW5mb1wiO1xyXG5pbXBvcnQgeyBTY2FsZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL3NjYWxlXCI7XHJcbmltcG9ydCB7IENoYXJ0Vmlld1NlcmllIH0gZnJvbSBcIi4vY2hhcnRWaWV3U2VyaWVcIjtcclxuaW1wb3J0IHsgU2VyaWVzSGVscGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJpZXNIZWxwZXJcIjtcclxuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb21tb24vaW50ZXJmYWNlcy9wb2ludEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJQ3Vyc29yU3RhdGUgfSBmcm9tIFwiLi4vY29tbW9uL2ludGVyZmFjZXMvY3Vyc29yU3RhdGVJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU0ZDaGFydFdyYXBwZXIgfSBmcm9tIFwiLi9jaGFydFdyYXBwZXIvU0ZDaGFydFdyYXBwZXJcIjtcclxuaW1wb3J0IHsgSUNoYXJ0LCBFdmVudEF4aXNSYW5nZUNoYW5nZWRBcmdzLCBBeGlzT3JpZW50YXRpb24sIEV2ZW50TW91c2VBcmdzLCBFdmVudE1vdXNlV2hlZWxBcmdzLCBBeGlzUG9zaXRpb259IGZyb20gXCIuLi8uLi9jb3JlL2ludGVyZmFjZXMvY29tcG9uZW50cy91aS9jaGFydC9jaGFydEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBBeGlzQm91bmRzIH0gZnJvbSBcIi4uLy4uL2NvcmUvdHlwZXMvQXhpc0JvdW5kc1wiO1xyXG5pbXBvcnQge0lDaGFydEF4aXMgfSBmcm9tIFwiLi4vLi4vY29yZS9pbnRlcmZhY2VzL2NvbXBvbmVudHMvdWkvY2hhcnQvQ2hhcnRBeGlzSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEV2ZW50U2NhbGVEYXRhQ2hhbmdlZEFyZ3MsIFNjYWxlQWN0aW9uIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvZXZlbnRTY2FsZURhdGFDaGFuZ2VkQXJnc1wiO1xyXG5cclxuXHJcbmVudW0gQ2hhcnRPYmplY3RUeXBle1xyXG4gICAgY3Vyc29yLFxyXG4gICAgc2VyaWVzLFxyXG4gICAgYXhpcyxcclxuICAgIGNoYXJ0U3BhY2UsXHJcbiAgICBlbXB0eVNwYWNlLFxyXG4gICAgaW52YWxpZCAgICBcclxufVxyXG5cclxuZW51bSBEcm9wTG9jYXRpb25UeXBle1xyXG4gICAgYWRkTmV3U2NhbGUsXHJcbiAgICBhc3NpZ25Ub1NjYWxlLFxyXG4gICAgaW52YWxpZFxyXG59XHJcblxyXG5jbGFzcyBDaGFydE9iamVjdEluZm9ybWF0aW9ue1xyXG4gICAgY2hhcnRPYmplY3RUeXBlOiBDaGFydE9iamVjdFR5cGU7XHJcbiAgICBhcmdzIDogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNoYXJ0T2JqZWN0VHlwZTogQ2hhcnRPYmplY3RUeXBlLCBhcmdzIDogYW55KXtcclxuICAgICAgICB0aGlzLmNoYXJ0T2JqZWN0VHlwZSA9IGNoYXJ0T2JqZWN0VHlwZTtcclxuICAgICAgICB0aGlzLmFyZ3MgPSBhcmdzO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBFdmVudFVzZXJDaGFydEludGVyYWN0aW9uIGV4dGVuZHMgVHlwZWRFdmVudCA8Q2hhcnRCYXNlLCBFdmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncz4ge307XHJcblxyXG5jbGFzcyBFdmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncyB7XHJcbiAgICBjaGFydEludGVyYWN0aW9uVHlwZTogTW91c2VBY3Rpb25UeXBlO1xyXG4gICAgZXZlbnRBcmd1bWVudHMgOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY2hhcnRJbnRlcmFjdGlvblR5cGU6IE1vdXNlQWN0aW9uVHlwZSwgZXZlbnRBcmd1bWVudHMgOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmNoYXJ0SW50ZXJhY3Rpb25UeXBlID0gY2hhcnRJbnRlcmFjdGlvblR5cGU7XHJcbiAgICAgICAgdGhpcy5ldmVudEFyZ3VtZW50cyA9IGV2ZW50QXJndW1lbnRzO1xyXG4gICAgfVxyXG59XHJcblxyXG5hYnN0cmFjdCBjbGFzcyBDaGFydEJhc2UgZXh0ZW5kcyBXaWRnZXRCYXNlIGltcGxlbWVudHMgSVRyYWNlQ2hhcnQge1xyXG5cclxuICAgIHB1YmxpYyBldmVudFVzZXJDaGFydEludGVyYWN0aW9uIDogRXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbjtcclxuXHJcbiAgICB0eXBlO1xyXG4gICAgY3Vyc29yVHlwZTtcclxuICAgIHdpZGdldE5hbWU6IHN0cmluZyA9IFwiXCI7XHJcbiAgICB0ZXh0TWVhc3VyZW1lbnRDYW52YXNJZDogc3RyaW5nID0gXCJ0ZXh0TWVhc3VyZW1lbnRDYW52YXNcIlxyXG4gICAgXHJcbiAgICBjaGFydEluc3RhbmNlLy8gIDogZWouZGF0YXZpc3VhbGl6YXRpb24uQ2hhcnQ7XHJcbiAgICBjaGFydCEgOiBJQ2hhcnQ7XHJcblxyXG4gICAgc2VyaWVzOiBBcnJheTxDaGFydFZpZXdTZXJpZT4gPSBbXTtcclxuICAgIGhvdmVyZWRTZXJpZXMgOiBDaGFydFZpZXdTZXJpZVtdID0gW107XHJcbiAgICBzY2FsZXM6IEFycmF5PFNjYWxlPiA9IFtdO1xyXG5cclxuICAgIGNoYXJ0TWFuYWdlcjogQ2hhcnRWaWV3Q2hhcnRNYW5hZ2VyO1xyXG5cclxuICAgIC8vcHJpdmF0ZSBrZXlFdmVudHNQbGFjZWQgPSBmYWxzZTtcclxuICAgIHByb3RlY3RlZCByZWFkb25seSBjdXJzb3JTdGF0ZXNJZCA9IFwiQ3Vyc29yU3RhdGVzXCI7XHJcbiAgICBwcm90ZWN0ZWQgY3Vyc29yU3RhdGVzOiBDdXJzb3JTdGF0ZXN8dW5kZWZpbmVkO1xyXG5cclxuICAgIGFic3RyYWN0IGN1cnNvckhhbmRsZXI6IEN1cnNvckhhbmRsZXJ8dW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBjdXJzb3JIb3ZlckRpc3RhbmNlOiBudW1iZXIgPSA4O1xyXG4gICAgcHJvdGVjdGVkIGRyYWdnZWRTZXJpZXNJbmRleDogbnVtYmVyID0gMDtcclxuXHJcbiAgICBhYnN0cmFjdCBwcmltYXJ5WEF4aXNOYW1lOiBzdHJpbmc7XHJcbiAgICBhYnN0cmFjdCBwcmltYXJ5WUF4aXNOYW1lOiBzdHJpbmc7XHJcbiAgICBwcm90ZWN0ZWQgYXhpc0JvdW5kczogQXhpc0JvdW5kc1tdID0gW107XHJcblxyXG4gICAgcHVibGljIHhBeGlzV2lkdGggOiBudW1iZXIgPSAwXHJcblxyXG4gXHJcbiAgICB5QXhpc0FsaWdubWVudE9mZnNldDogbnVtYmVyID0gMDtcclxuICAgIGZsYWdnZWRGb3JSZXNpemU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihjaGFydE1hbmFnZXI6IENoYXJ0Vmlld0NoYXJ0TWFuYWdlciwgbmFtZTogc3RyaW5nLCBzY2FsZTogU2NhbGUpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMud2lkZ2V0TmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5jaGFydE1hbmFnZXIgPSBjaGFydE1hbmFnZXI7XHJcbiAgICAgICAgdGhpcy5zY2FsZXMucHVzaChzY2FsZSk7XHJcblxyXG4gICAgICAgIHRoaXMuZXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbiA9IG5ldyBFdmVudFVzZXJDaGFydEludGVyYWN0aW9uKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVzdHJveSBvYmplY3RcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkaXNwb3NlKCl7XHJcbiAgICAgICAgbGV0IGNoYXJ0T2JqID0gJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCkuZGF0YShcImVqQ2hhcnRcIik7XHJcbiAgICAgICAgY2hhcnRPYmouZGVzdHJveSgpO1xyXG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb250YWluZXJJZFxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaW5pdGlhbGl6ZShjb250YWluZXJJZDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5wYXJlbnRDb250ZW50SWQgPSBjb250YWluZXJJZDtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIGxldCBuZXdDaGFydCA9IG5ldyBTRkNoYXJ0V3JhcHBlcih0aGlzLmNzc1BhcmVudENvbnRlbnRJZCwgdGhpcy5zY2FsZXNbMF0sIHRoaXMucHJpbWFyeVhBeGlzTmFtZSk7XHJcbiAgICAgICAgbmV3Q2hhcnQuZXZlbnRBeGlzUmFuZ2VDaGFuZ2VkLmF0dGFjaCgoc2VuZGVyLCBhcmdzKSA9PiB0aGlzLm9uQXhpc1JhbmdlQ2hhbmdlZChzZW5kZXIsIGFyZ3MpKTtcclxuICAgICAgICBuZXdDaGFydC5ldmVudE1vdXNlQWN0aW9uLmF0dGFjaCgoc2VuZGVyLGFyZ3MpID0+IHRoaXMub25Nb3VzZUFjdGlvbihzZW5kZXIsIGFyZ3MpKTtcclxuICAgICAgICBuZXdDaGFydC5ldmVudE1vdXNlV2hlZWwuYXR0YWNoKChzZW5kZXIsYXJncykgPT4gdGhpcy5vbkNoYXJ0TW91c2VXaGVlbChzZW5kZXIsIGFyZ3MpKTtcclxuXHJcbiAgICAgICAgdGhpcy5jaGFydEluc3RhbmNlID0gbmV3Q2hhcnQuX1NGQ2hhcnQ7XHJcbiAgICAgICAgdGhpcy5jaGFydCA9IG5ld0NoYXJ0O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuc2V0Qm94Wm9vbShmYWxzZSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0QXZhaWxhYmxlU2VyaWVzQXNEYXRhU291cmNlKCk7XHJcblxyXG5cclxuICAgICAgICAvL1dFIHdhbnQgdG8ga2VlcCB0aGlzIGZvciBjdXJzb3IgbW92ZW1lbnQgbGF0ZXIgb25cclxuICAgICAgICAvLyB0aGlzLmFkZEtleVJlbGF0ZWRFdmVudHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQXhpc1JhbmdlQ2hhbmdlZChzZW5kZXI6IElDaGFydEF4aXMsIGFyZ3MgOiBFdmVudEF4aXNSYW5nZUNoYW5nZWRBcmdzKXtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgYXJncy5heGlzSURzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IHNjYWxlOiBTY2FsZXx1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIC8vV29ya2Fyb3VuZCB1bnRpbCBYLUF4aXMgaGFuZGxpbmcgaXMgaW1wbGVtZW50ZWQgY29ycmVjdFxyXG4gICAgICAgICAgICBpZihhcmdzLmF4aXNJRHNbaV0gIT0gdGhpcy5wcmltYXJ5WEF4aXNOYW1lKXtcclxuICAgICAgICAgICAgICAgIHNjYWxlPSB0aGlzLmdldFNjYWxlQnlTY2FsZUlkKGFyZ3MuYXhpc0lEc1tpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHNjYWxlID0gdGhpcy5zY2FsZXNbMF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoc2NhbGUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGxldCBheGlzOiBJQ2hhcnRBeGlzID0gc2VuZGVyO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJhbmdlID0gYXhpcy5nZXRBeGlzUmFuZ2UoKTtcclxuICAgICAgICAgICAgICAgIGlmKGF4aXMuZ2V0QXhpc09yaWVudGF0aW9uKCkgPT0gQXhpc09yaWVudGF0aW9uLmhvcml6b250YWwpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U2NhbGVSYW5nZShzY2FsZSwgcmFuZ2UubWluLCByYW5nZS5tYXgsIHNjYWxlLm1pbllWYWx1ZSwgc2NhbGUubWF4WVZhbHVlLCBcIlwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYXJncy5zeW5jQXhpcyA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFydE1hbmFnZXIucmVkcmF3Q2hhcnRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFNjYWxlUmFuZ2Uoc2NhbGUsIHNjYWxlLm1pblhWYWx1ZSwgc2NhbGUubWF4WFZhbHVlLCByYW5nZS5taW4sIHJhbmdlLm1heCwgXCJcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihhcmdzLmZvcmNlUmVkcmF3ID09IHRydWUpe1xyXG4gICAgICAgICAgICB0aGlzLnJlZHJhd0NoYXJ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBtZXRob2QgbXVzdCBiZSBydW4gYWZ0ZXIgdGhlIGVudGlyZSBpbml0aWFsaXNhdGlvbiBwcm9jZXNzIGlzIGRvbmVcclxuICAgICAqIHRoZSBkZXJpdmVkIGNsYXNzZXMgbmVlZHMgdGhlIENoYXJ0QmFzZSBpbml0IGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCBmaXJzdFxyXG4gICAgICogYnV0IHRoZSBjdXJzb3JzIGFyZSBhZGRlZCBpbiB0aGUgc2VwYXJhdGUgZGVyaXZlZCBjbGFzc2VzIGFuZCB3ZSBjYW5ub3RcclxuICAgICAqIG9ic2VydmUgc3RhdGUgY2hhbmdlcyB1bnRpbCBldmVyeXRoaW5nIGlzIGluIHBsYWNlLiBUaGVyZWZvcmUgdGhlIFxyXG4gICAgICogT2JzZXJ2ZWQgc3RhdGVzIGFyZSBvdXRzaWRlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIG9ic2VydmVTdGF0ZXMgKCkge1xyXG4gICAgICAgIHRoaXMuc3RhdGVzLm9ic2VydmUoQ3Vyc29yU3RhdGVzLCAobW9kaWZpZWRTdGF0ZTogQ3Vyc29yU3RhdGVzLCBvbGRTdGF0ZTogQ3Vyc29yU3RhdGVzKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ3Vyc29yU3RhdGVzV2l0aE5ld01vZGlmaWVkU3RhdGVzKG1vZGlmaWVkU3RhdGUpO1xyXG4gICAgICAgIH0sIHRoaXMuY3Vyc29yU3RhdGVzSWQpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtb3VzZVhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtb3VzZVlcclxuICAgICAqIEByZXR1cm5zIHtDaGFydE9iamVjdEluZm9ybWF0aW9ufVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0Q2hhcnRPYmplY3RVbmRlck1vdXNlKG1vdXNlWDogbnVtYmVyLCBtb3VzZVk6IG51bWJlcikgOiBDaGFydE9iamVjdEluZm9ybWF0aW9ue1xyXG4gICAgICAgIHRoaXMuY2FsY3VsYXRlQ2hhcnREaW1lbnNpb25zKCk7XHJcbiAgICAgICAgaWYodGhpcy5tb3VzZUlzSW5DaGFydEJvdW5kcyhtb3VzZVgsIG1vdXNlWSkpe1xyXG4gICAgICAgICAgICBsZXQgY3Vyc29yU3RhdGU6IEN1cnNvclN0YXRlcyA9IHRoaXMuc3RhdGVzLnJlYWQoQ3Vyc29yU3RhdGVzLCB0aGlzLmN1cnNvclN0YXRlc0lkKTtcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gY3Vyc29yU3RhdGUuZ2V0SG92ZXJlZEN1cnNvckluZGV4KCk7XHJcbiAgICAgICAgICAgIGlmKGluZGV4ICE9PSAtMSl7XHJcbiAgICAgICAgICAgICAgICAvL1RPRE86IG1pZ2h0IGJlIGJldHRlciB0byB1c2UgY3Vyc29yIGluc3RhbmNlIGluc3RlYWQgb2YgaW5kZXhcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ2hhcnRPYmplY3RJbmZvcm1hdGlvbihDaGFydE9iamVjdFR5cGUuY3Vyc29yLCB7Y3Vyc29ySW5kZXg6IGluZGV4fSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBDaGFydE9iamVjdEluZm9ybWF0aW9uKENoYXJ0T2JqZWN0VHlwZS5jaGFydFNwYWNlLCB7fSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuYXhpc0JvdW5kcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKChtb3VzZVggLSB0aGlzLmF4aXNCb3VuZHNbaV0ueCkgPCAodGhpcy5heGlzQm91bmRzW2ldLndpZHRoKSAmJiBtb3VzZVggPiB0aGlzLmF4aXNCb3VuZHNbaV0ueCl7XHJcbiAgICAgICAgICAgICAgICBpZigobW91c2VZIC0gdGhpcy5heGlzQm91bmRzW2ldLnkpIDwgKHRoaXMuYXhpc0JvdW5kc1tpXS5oZWlnaHQpICYmIG1vdXNlWSA+IHRoaXMuYXhpc0JvdW5kc1tpXS55KXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYXhpcyA9IHRoaXMuY2hhcnQuZ2V0QXhpcyh0aGlzLmF4aXNCb3VuZHNbaV0uYXhpcy5uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENoYXJ0T2JqZWN0SW5mb3JtYXRpb24oQ2hhcnRPYmplY3RUeXBlLmF4aXMsIHtheGlzOiBheGlzfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgQ2hhcnRPYmplY3RJbmZvcm1hdGlvbihDaGFydE9iamVjdFR5cGUuZW1wdHlTcGFjZSwge30pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY2FsY3VsYXRlQ2hhcnREaW1lbnNpb25zKCl7XHJcbiAgICAgICAgdGhpcy5heGlzQm91bmRzID0gW107XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuc2NhbGVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGF4aXMgPSB0aGlzLmNoYXJ0LmdldEF4aXModGhpcy5zY2FsZXNbaV0uaWQpO1xyXG4gICAgICAgICAgICBpZihheGlzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF4aXNCb3VuZHMucHVzaChheGlzLmdldEF4aXNCb3VuZHMoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGF4aXMgPSB0aGlzLmNoYXJ0LmdldEF4aXModGhpcy5wcmltYXJ5WEF4aXNOYW1lKTtcclxuICAgICAgICBpZihheGlzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuYXhpc0JvdW5kcy5wdXNoKGF4aXMuZ2V0QXhpc0JvdW5kcygpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIG9uTW91c2VBY3Rpb24oc2VuZGVyLCBhcmdzOiBFdmVudE1vdXNlQXJncyl7XHJcbiAgICAgICAgc3dpdGNoIChhcmdzLm1vdXNlQWN0aW9uVHlwZSl7XHJcbiAgICAgICAgICAgIGNhc2UgIE1vdXNlQWN0aW9uVHlwZS5tb3VzZURvd24gOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2hhcnRNb3VzZURvd24oc2VuZGVyLCBhcmdzKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgIE1vdXNlQWN0aW9uVHlwZS5tb3VzZVVwIDoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkNoYXJ0TW91c2VVcChzZW5kZXIsIGFyZ3MpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIGNhc2UgIE1vdXNlQWN0aW9uVHlwZS5tb3VzZU1vdmUgOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2hhcnRNb3VzZU1vdmUoc2VuZGVyLCBhcmdzKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uQ2hhcnRNb3VzZURvd24oc2VuZGVyLCBhcmdzIDogRXZlbnRNb3VzZUFyZ3Mpe1xyXG4gICAgICAgIGFyZ3Mub2JqZWN0VW5kZXJNb3VzZSA9IHRoaXMuZ2V0Q2hhcnRPYmplY3RVbmRlck1vdXNlKGFyZ3MubW91c2VQb2ludC54LCBhcmdzLm1vdXNlUG9pbnQueSk7XHJcbiAgICAgICAgbGV0IGV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb25BcmdzOiBFdmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncztcclxuICAgICAgICBldmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncyA9IG5ldyBFdmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncyhNb3VzZUFjdGlvblR5cGUubW91c2VEb3duLCBhcmdzKTtcclxuICAgICAgICB0aGlzLmV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb24ucmFpc2UodGhpcywgZXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbkFyZ3MpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbkNoYXJ0TW91c2VVcChzZW5kZXIsIGFyZ3M6IEV2ZW50TW91c2VBcmdzKXtcclxuICAgICAgICBhcmdzLm9iamVjdFVuZGVyTW91c2UgPSB0aGlzLmdldENoYXJ0T2JqZWN0VW5kZXJNb3VzZShhcmdzLm1vdXNlUG9pbnQueCwgYXJncy5tb3VzZVBvaW50LnkpO1xyXG4gICAgICAgIGxldCBldmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJnczogRXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbkFyZ3M7XHJcbiAgICAgICAgZXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbkFyZ3MgPSBuZXcgRXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbkFyZ3MoTW91c2VBY3Rpb25UeXBlLm1vdXNlVXAsIGFyZ3MpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbi5yYWlzZSh0aGlzLCBldmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncyk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uQ2hhcnRNb3VzZU1vdmUoc2VuZGVyLCBhcmdzOiBFdmVudE1vdXNlQXJncyl7XHJcbiAgICAgICAgbGV0IGNoYXJ0T2JqZWN0VW5kZXJNb3VzZSA6IENoYXJ0T2JqZWN0SW5mb3JtYXRpb24gPSB0aGlzLmdldENoYXJ0T2JqZWN0VW5kZXJNb3VzZShhcmdzLm1vdXNlUG9pbnQueCwgYXJncy5tb3VzZVBvaW50LnkpO1xyXG4gICAgICAgIGFyZ3Mub2JqZWN0VW5kZXJNb3VzZSA9IGNoYXJ0T2JqZWN0VW5kZXJNb3VzZTtcclxuICAgICAgICBsZXQgZXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbkFyZ3M6IEV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb25BcmdzO1xyXG4gICAgICAgIGV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb25BcmdzID0gbmV3IEV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb25BcmdzKE1vdXNlQWN0aW9uVHlwZS5tb3VzZU1vdmUsIGFyZ3MpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbi5yYWlzZSh0aGlzLCBldmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncylcclxuICAgICAgICBcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVEhpcyBtZXRob2QgaXMgY2FsbGVkIGJ5IHRoZSBJbnRlcmFjdGlvblN0cmF0ZWdpZXMgd2hlbiBhIGN1cnNvclxyXG4gICAgICogaXMgYmVpbmcgZHJhZ2dlZC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkcmFnQ3Vyc29yQWxvbmdMaW5lKG1vdXNlWCwgbW91c2VZKSB7XHJcbiAgICAgICAgdGhpcy5kcmFnQ3Vyc29yKG1vdXNlWCwgbW91c2VZKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgbWV0aG9kIGlzIGNhbGxlZCBieSB0aGUgSW50ZXJhY3Rpb25TdHJhdGV0Z2llcyB3aGVuIGEgY2xpY2sgaW4gdGhlXHJcbiAgICAgKiBjaGFydCBoYXMgYmVlbiBtYWRlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldEN1cnNvck9uUG9pbnRlclBvc2l0aW9uKG1vdXNlUG9pbnQgOiBJUG9pbnQpe1xyXG4gICAgICAgIHRoaXMuc2V0Q3Vyc29yKG1vdXNlUG9pbnQueCwgbW91c2VQb2ludC55KTtcclxuICAgICAgICB0aGlzLmNoZWNrQ3Vyc29yc0hvdmVyaW5nKG1vdXNlUG9pbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW50ZXJuYWwgbWV0aG9kIGZvciBhY3R1YWxseSBtb3ZpbmcgdGhlIGN1cnNvcnMuIE92ZXJ3cml0dGVuIGluIEZGVENoYXJ0LnRzXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5XHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgc2V0Q3Vyc29yKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnNlcmllcy5sZW5ndGgpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBjdXJzb3JzU3RhdGVzOiBDdXJzb3JTdGF0ZXMgPSB0aGlzLnN0YXRlcy5yZWFkKEN1cnNvclN0YXRlcywgdGhpcy5jdXJzb3JTdGF0ZXNJZCk7XHJcbiAgICAgICAgY3Vyc29yc1N0YXRlcy5zZXRMYXN0Q3Vyc29yVHlwZVNlbGVjdGVkKEN1cnNvclR5cGUudGltZURvbWFpbik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGhvdmVyZWRDdXJzb3JJbmRleCA9IGN1cnNvcnNTdGF0ZXMuZ2V0SG92ZXJlZEN1cnNvckluZGV4KCk7XHJcbiAgICAgICAgaWYgKGhvdmVyZWRDdXJzb3JJbmRleCAhPSAtMSkgeyAvLyBTZXQgc2VsZWN0ZWQgY3Vyc29yIHdoZW4gaG92ZXJlZCBjdXJzb3Igd2FzIGZvdW5kXHJcbiAgICAgICAgICAgIGN1cnNvcnNTdGF0ZXMuc2V0U2VsZWN0ZWQoaG92ZXJlZEN1cnNvckluZGV4LCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGN1cnNvcnNTdGF0ZXMuc2V0U2VsZWN0ZWQoY3Vyc29yc1N0YXRlcy5nZXRTZWxlY3RlZEN1cnNvckluZGV4KCksIHRydWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVTZWxlY3RlZEN1cnNvcihjdXJzb3JzU3RhdGVzLCB4LCB5KTtcclxuICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUGFzcyB0aGUgeCBhbmQgeSBwb3NpdGlvbiBvbiB0aGUgcHJvcGVydHkgYW5kIHRoaXMgbWV0aG9kIHdpbGwgZmlndXJlIG91dCB3aGVyZSB0b1xyXG4gICAgICogcGxhY2UgdGhlIGN1cnNvcnMgYW5kIHVwZGF0ZSB0aGUgc3RhdGVzIGFjY29yZGluZ2x5XHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHBhcmFtIHtDdXJzb3JTdGF0ZXN9IGN1cnNvcnNTdGF0ZXNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB4XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgdXBkYXRlU2VsZWN0ZWRDdXJzb3IoY3Vyc29yc1N0YXRlczogQ3Vyc29yU3RhdGVzLCB4OiBudW1iZXIsIHk6IG51bWJlcil7XHJcbiAgICAgICAgbGV0IHBvaW50ID0gdGhpcy5nZXRDaGFydENvb3JkaW5hdGVGcm9tUGl4ZWwodGhpcy5wcmltYXJ5WEF4aXNOYW1lLCB0aGlzLnNjYWxlc1swXS5pZCwgeCwgeSk7XHJcbiAgICAgICAgbGV0IG5lYXJlc3RUaW1lc3RhbXBGcm9tQWxsU2VyaWVzID0gdGhpcy5nZXRUaW1lc3RhbXBJblNlcmllcyhwb2ludCwgdGhpcy5zZXJpZXMpO1xyXG5cclxuICAgICAgICBjdXJzb3JzU3RhdGVzLnNldEFjdGl2ZShjdXJzb3JzU3RhdGVzLmdldFNlbGVjdGVkQ3Vyc29ySW5kZXgoKSwgdHJ1ZSk7XHJcbiAgICAgICAgY3Vyc29yc1N0YXRlcy5zZXRQb3NpdGlvbihjdXJzb3JzU3RhdGVzLmdldFNlbGVjdGVkQ3Vyc29ySW5kZXgoKSwgbmVhcmVzdFRpbWVzdGFtcEZyb21BbGxTZXJpZXMpO1xyXG4gICAgICAgIGN1cnNvcnNTdGF0ZXMuc2V0SG92ZXJlZChjdXJzb3JzU3RhdGVzLmdldFNlbGVjdGVkQ3Vyc29ySW5kZXgoKSwgdGhpcy5nZXRTZXJpZUN1cnNvclR5cGUoKSwgZmFsc2UpO1xyXG5cclxuICAgICAgICB0aGlzLnN0YXRlcy51cGRhdGUoQ3Vyc29yU3RhdGVzLCBjdXJzb3JzU3RhdGVzLCB0aGlzLmN1cnNvclN0YXRlc0lkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEludGVybmFsIG1ldGhvZCBmb3IgYWN0dWFsbHkgbW92aW5nIHRoZSBjdXJzb3JzLiBQYXNzIHRoZSB4IGFuZCB5XHJcbiAgICAgKiBwb3NpdGlvbiBvbiB0aGUgcHJvcGVydHkgYW5kIHRoaXMgbWV0aG9kIHdpbGwgZmlndXJlIG91dCB3aGVyZSB0b1xyXG4gICAgICogcGxhY2UgdGhlIGN1cnNvcnMgYW5kIHVwZGF0ZSB0aGUgc3RhdGVzIGFjY29yZGluZ2x5XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB4XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkcmFnQ3Vyc29yICh4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gICAgICAgIGlmICghdGhpcy5zZXJpZXMubGVuZ3RoKXtcclxuICAgICAgICAgICAgcmV0dXJuOyBcclxuICAgICAgICB9IFxyXG5cclxuICAgICAgICBsZXQgY3Vyc29yc1N0YXRlczogQ3Vyc29yU3RhdGVzID0gdGhpcy5zdGF0ZXMucmVhZChDdXJzb3JTdGF0ZXMsIHRoaXMuY3Vyc29yU3RhdGVzSWQpO1xyXG5cclxuICAgICAgICBpZih0aGlzLmhvdmVyZWRTZXJpZXMubGVuZ3RoICE9IDApe1xyXG4gICAgICAgICAgICBsZXQgcG9pbnQgPSB0aGlzLmdldENoYXJ0Q29vcmRpbmF0ZUZyb21QaXhlbCh0aGlzLnByaW1hcnlYQXhpc05hbWUsIHRoaXMuc2NhbGVzWzBdLmlkLCB4LCB5KTtcclxuICAgICAgICAgICAgbGV0IG5lYXJlc3RUaW1lc3RhbXBGcm9tU2luZ2xlU2VyaWVzID0gdGhpcy5nZXRUaW1lc3RhbXBJblNlcmllcyhwb2ludCwgdGhpcy5ob3ZlcmVkU2VyaWVzKTtcclxuXHJcbiAgICAgICAgICAgIGN1cnNvcnNTdGF0ZXMuc2V0UG9zaXRpb24oY3Vyc29yc1N0YXRlcy5nZXRTZWxlY3RlZEN1cnNvckluZGV4KCksIG5lYXJlc3RUaW1lc3RhbXBGcm9tU2luZ2xlU2VyaWVzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc3RhdGVzLnVwZGF0ZShDdXJzb3JTdGF0ZXMsIGN1cnNvcnNTdGF0ZXMsIHRoaXMuY3Vyc29yU3RhdGVzSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBtZXRob2QgaXMgY2FsbGVkIGJ5IHRoZSB1c2VySW50ZXJhY3Rpb24gc3RyYWdldGd5IHdoZW5ldmVyXHJcbiAgICAgKiB0aGUgbW91c2UgaXMgbW92ZWQgYWNyb3NzIGEgY2hhcnQuIElmIHRoZSBtb3VzZSBpcyBhYm92ZSBhIGN1cnNvclxyXG4gICAgICogdGhpcyBjdXJzb3IgdXBkYXRlcyBpdCdzIG93biBzdGF0ZSB0byBIT1ZFUklORyBhbmQgb25jZSBpdCBpcyBub1xyXG4gICAgICogbG9uZ2VyIGJlbG93IHRoZSBtb3VzZSBpdCB3aWxsIHJlc2V0IHRvIGl0J3MgcHJldmlvdXMgc3RhdGUgaWYgdGhlXHJcbiAgICAgKiBjdXJzb3Igd2FzIHNlbGVjdGVkIG9yIGl0IHdpbGwgYmUgc2V0IHRvIERFU0VMQ1RFRCBpZiBpdCB3YXNuJ3QuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2hlY2tDdXJzb3JzSG92ZXJpbmcobW91c2VQb2ludDogSVBvaW50KXtcclxuICAgICAgICBpZih0aGlzLmN1cnNvckhhbmRsZXIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgbGV0IGN1cnNvclN0YXRlczogQ3Vyc29yU3RhdGVzID0gdGhpcy5zdGF0ZXMucmVhZChDdXJzb3JTdGF0ZXMsIHRoaXMuY3Vyc29yU3RhdGVzSWQpO1xyXG4gICAgICAgICAgICBsZXQgY2hhcnRBcmVhID0gdGhpcy5jaGFydC5nZXRDaGFydEFyZWEoKTtcclxuICAgICAgICAgICAgbGV0IGFjdHVhbE1vdXNlUG9pbnQgPSBuZXcgUG9pbnQobW91c2VQb2ludC54IC0gY2hhcnRBcmVhLngsIG1vdXNlUG9pbnQueSAtIGNoYXJ0QXJlYS55KTtcclxuXHJcbiAgICAgICAgICAgIGxldCBjbG9zZXN0Q3Vyc29yUG9zaXRpb24gOiBDdXJzb3JQb3NpdGlvbkluZm8gPSB0aGlzLmN1cnNvckhhbmRsZXIuZ2V0Q2xvc2VzdEN1cnNvclBvc2l0aW9uVG9Qb2ludChhY3R1YWxNb3VzZVBvaW50KVxyXG4gICAgICAgICAgICBpZihjbG9zZXN0Q3Vyc29yUG9zaXRpb24gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGxldCBkaXN0YW5jZVRvQ3Vyc29yID0gY2xvc2VzdEN1cnNvclBvc2l0aW9uLmFkZGl0aW9uYWxJbmZvcm1hdGlvbltcImRpc3RhbmNlXCJdO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLmhvdmVyZWRTZXJpZXMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgY2xvc2VzdEN1cnNvckluZGV4O1xyXG4gICAgICAgICAgICAgICAgaWYoZGlzdGFuY2VUb0N1cnNvciA8IHRoaXMuY3Vyc29ySG92ZXJEaXN0YW5jZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VzdEN1cnNvclBvc2l0aW9uLmFkZGl0aW9uYWxJbmZvcm1hdGlvbltcImhpZ2hsaWdodFwiXSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VzdEN1cnNvckluZGV4ID0gY2xvc2VzdEN1cnNvclBvc2l0aW9uLmFkZGl0aW9uYWxJbmZvcm1hdGlvbltcImN1cnNvckluZGV4XCJdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaG92ZXJlZFNlcmllcyA9IGNsb3Nlc3RDdXJzb3JQb3NpdGlvbi5hZGRpdGlvbmFsSW5mb3JtYXRpb25bXCJzZXJpZXNcIl07IFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY3Vyc29yU3RhdGVzID0gdGhpcy51cGRhdGVIb3ZlcmluZ1N0YXRlc0luQ3Vyc29ycyhjdXJzb3JTdGF0ZXMsIGNsb3Nlc3RDdXJzb3JJbmRleCk7ICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVzLnVwZGF0ZShDdXJzb3JTdGF0ZXMsIGN1cnNvclN0YXRlcywgdGhpcy5jdXJzb3JTdGF0ZXNJZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRTZXJpZUN1cnNvclR5cGUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2VyaWVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VyaWVzWzBdLnNlcmllLmN1cnNvclR5cGU7XHJcbiAgICAgICAgfSBcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKnByaXZhdGUgZ2V0U2VyaWVzSW5kZXhGcm9tQ3Vyc29yKGN1cnNvciA6IE1haW5DdXJzb3JXaWRnZXQpIDogbnVtYmVye1xyXG4gICAgICAgIGxldCBjdXJyZW50Q3Vyc29ySGFuZGxlciA6IFNlcmllQ3Vyc29yfHVuZGVmaW5lZDtcclxuICAgICAgICBcclxuICAgICAgICAvKmZvcihsZXQgY3Vyc29ySGFuZGxlciBvZiB0aGlzLmN1cnNvckhhbmRsZXIuc2VyaWVDdXJzb3JzKXtcclxuICAgICAgICAgICAgaWYoY3Vyc29ySGFuZGxlci5jdXJzb3JzLmluZGV4T2YoY3Vyc29yKSAhPSAtMSl7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50Q3Vyc29ySGFuZGxlciA9IGN1cnNvckhhbmRsZXJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0qLy8qXHJcblxyXG4gICAgICAgIGlmKGN1cnJlbnRDdXJzb3JIYW5kbGVyICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7ICBpIDwgdGhpcy5zZXJpZXMubGVuZ3RoIDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGlmKGN1cnJlbnRDdXJzb3JIYW5kbGVyLnNlcmllID09IHRoaXMuc2VyaWVzW2ldLnNlcmllKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfSovXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbnRlcm5hbCBtZXRob2QgdG8gY2FsY3VsYXRlIHRoZSBzdGF0ZSB3aGljaCBpcyB0byBiZSB1cGRhdGVkIGluIHRoZVxyXG4gICAgICogc3RhdGVzIHRvIGJlIEhPVkVSSU5HLiBUaGlzIG1ldGhvZCB3aWxsIGFsc28gcmVzZXQgdGhlIGNvcnJlY3Qgc3RhdGVzXHJcbiAgICAgKiB0byBpdCdzIHByZXZpb3VzIHZhbHVlcyBpZiBub24gb2YgdGhlIGN1cnNvcnMgYXJlIGhvdmVyaW5nLiBUaGlzIG1ldGhvZHNcclxuICAgICAqIHNob3VsZCBiZSBhYmxlIHRvIG1vdmUgaW50byB0aGUgQ3Vyc29yU3RhdGVzIGNsYXNzIG9uZSBkYXkgaG9wZWZ1bGx5LlxyXG4gICAgICogSGVuY2UgZXh0cmFjdGVkIGluIGl0J3Mgb3duIG1ldGhvZC5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtDdXJzb3JTdGF0ZXN9IGN1cnNvclN0YXRlc1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGNsb3Nlc3RJbmRleFxyXG4gICAgICogQHJldHVybnMge0N1cnNvclN0YXRlc31cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVIb3ZlcmluZ1N0YXRlc0luQ3Vyc29ycyAoY3Vyc29yU3RhdGVzOiBDdXJzb3JTdGF0ZXMsIGNsb3Nlc3RJbmRleDogbnVtYmVyfHVuZGVmaW5lZCkgOiBDdXJzb3JTdGF0ZXMge1xyXG4gICAgICAgIGlmIChjbG9zZXN0SW5kZXggIT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIEluZGV4IG9mIGN1cnNvciBmb3VuZCA9PiBzZXQgaG92ZXJlZCBmbGFnXHJcbiAgICAgICAgICAgIGN1cnNvclN0YXRlcy5zZXRIb3ZlcmVkKGNsb3Nlc3RJbmRleCwgdGhpcy5nZXRTZXJpZUN1cnNvclR5cGUoKSwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIC8vIE5vIGluZGV4IG9mIGN1cnNvciBmb3VuZCA9PiByZXNldCBhbGwgaG92ZXJlZCBmbGFncyBvZiBhbGwgY3Vyc29yc1xyXG4gICAgICAgICAgICBjdXJzb3JTdGF0ZXMuc2V0SG92ZXJlZCgtMSwgdGhpcy5nZXRTZXJpZUN1cnNvclR5cGUoKSwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY3Vyc29yU3RhdGVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsY3VsYXRlIHpvb20gb24gbW91c2V3aGVlbCBhY3Rpb25cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIG9uQ2hhcnRNb3VzZVdoZWVsKHNlbmRlciwgYXJncyA6IEV2ZW50TW91c2VXaGVlbEFyZ3Mpe1xyXG4gICAgICAgIGFyZ3Mub2JqZWN0VW5kZXJNb3VzZSA9IHRoaXMuZ2V0Q2hhcnRPYmplY3RVbmRlck1vdXNlKGFyZ3MubW91c2VQb2ludC54LCBhcmdzLm1vdXNlUG9pbnQueSk7XHJcbiAgICAgICAgbGV0IGV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb25BcmdzOiBFdmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncztcclxuICAgICAgICBldmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncyA9IG5ldyBFdmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncyhNb3VzZUFjdGlvblR5cGUubW91c2VXaGVlbCwgYXJncyk7XHJcbiAgICAgICAgdGhpcy5ldmVudFVzZXJDaGFydEludGVyYWN0aW9uLnJhaXNlKHRoaXMsIGV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb25BcmdzKTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IGlmIG1vdXNlIGlzIGluc2lkZSBjaGFydCBib3VuZHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBtb3VzZVhcclxuICAgICAqIEBwYXJhbSB7Kn0gbW91c2VZXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBtb3VzZUlzSW5DaGFydEJvdW5kcyhtb3VzZVgsIG1vdXNlWSkgOiBib29sZWFue1xyXG4gICAgICAgIGxldCBpc0luQm91bmRzID0gdHJ1ZTtcclxuICAgICAgICBsZXQgY2hhcnRBcmVhID0gdGhpcy5jaGFydC5nZXRDaGFydEFyZWEoKTtcclxuICAgICAgICBpZihtb3VzZVggPCBjaGFydEFyZWEueCB8fCBtb3VzZVggPiAoY2hhcnRBcmVhLnggKyBjaGFydEFyZWEud2lkdGgpICApe1xyXG4gICAgICAgICAgICBpc0luQm91bmRzID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKG1vdXNlWSA8IGNoYXJ0QXJlYS55IHx8IG1vdXNlWSA+IChjaGFydEFyZWEueSArIGNoYXJ0QXJlYS5oZWlnaHQpICApe1xyXG4gICAgICAgICAgICBpc0luQm91bmRzID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpc0luQm91bmRzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVzaXplIGNoYXJ0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSB3aWR0aFxyXG4gICAgICogQHBhcmFtIHsqfSBoZWlnaHRcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlc2l6ZSh3aWR0aCwgaGVpZ2h0KXtcclxuICAgICAgICB0aGlzLnJlc2l6ZUNoYXJ0KGhlaWdodCwgd2lkdGgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVzaXplIENoYXJ0IG9ubHkgaWYgbmVlZGVkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gd2lkdGhcclxuICAgICAqIEBwYXJhbSB7Kn0gaGVpZ2h0XHJcbiAgICAgKiBAcGFyYW0geyp9IHdpZHRoXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVzaXplQ2hhcnQoaGVpZ2h0LCB3aWR0aCkge1xyXG4gICAgICAgIGlmKHRoaXMuZmxhZ2dlZEZvclJlc2l6ZSB8fCB0aGlzLl9hY3R1YWxIZWlnaHQgIT0gaGVpZ2h0IHx8IHRoaXMuX2FjdHVhbFdpZHRoICE9IHdpZHRoKXtcclxuICAgICAgICAgICAgdGhpcy5fYWN0dWFsSGVpZ2h0ID0gaGVpZ2h0LCB0aGlzLl9hY3R1YWxXaWR0aCA9IHdpZHRoO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHdpZHRoID0gd2lkdGggLSB0aGlzLnlBeGlzQWxpZ25tZW50T2Zmc2V0O1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJ0LnJlc2l6ZShoZWlnaHQsIHdpZHRoKTtcclxuICAgICAgICAgICAgdGhpcy5yZWRyYXdDaGFydCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlZHJhd3MgY2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWRyYXdDaGFydCgpIHtcclxuICAgICAgICB0aGlzLmNoYXJ0LnJlZHJhdygpO1xyXG4gICAgICAgIGlmKHRoaXMuY3Vyc29ySGFuZGxlciAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmN1cnNvckhhbmRsZXIudXBkYXRlQ2hhcnRBcmVhKHRoaXMuY2hhcnQuZ2V0Q2hhcnRBcmVhKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlcG9zaXRpb25DdXJzb3JzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgZ2l2ZW4gc2VyaWUgaW50byBhIGNoYXJ0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxCYXNlU2VyaWVzPn0gc2VyaWVzXHJcbiAgICAgKiBAcGFyYW0ge1NjYWxlfSBzY2FsZVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkU2VyaWVzVG9DaGFydChzZXJpZXM6IEFycmF5PEJhc2VTZXJpZXM+LCB5U2NhbGU6IFNjYWxlKXtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNlcmllcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmIChzZXJpZXNbaV0ucmF3UG9pbnRzVmFsaWQgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNoYXJ0U2VyaWVzID0gbmV3IENoYXJ0Vmlld1NlcmllKHNlcmllc1tpXSwgeVNjYWxlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VyaWVzLnB1c2goY2hhcnRTZXJpZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlIGEgZ2l2ZW4gc2VyaWUgZnJvbSB0ZWggY2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNlcmllXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCByZW1vdmVTZXJpZUZyb21DaGFydChzZXJpZTogQmFzZVNlcmllc3xDaGFydFZpZXdTZXJpZSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHNlcmllXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgc2VyaWVJbkNoYXJ0KHNlcmllKSB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuc2VyaWVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VyaWVzW2ldLmlkID09IHNlcmllLmlkKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRab29tQXhlcyh6b29tQXhlczogWm9vbURpcmVjdGlvbil7XHJcbiAgICAgICAgdGhpcy5jaGFydC5zZXRab29tRGlyZWN0aW9uKHpvb21BeGVzKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRQYW5uaW5nKGVuYWJsZTogYm9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5jaGFydC5lbmFibGVQYW5uaW5nKGVuYWJsZSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFBhbm5pbmcgb3BlcmF0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBwYWdlWFxyXG4gICAgICogQHBhcmFtIHsqfSBwYWdlWVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZG9QYW5uaW5nKHBhZ2VYLCBwYWdlWSl7XHJcbiAgICAgICAgdGhpcy5jaGFydC5kb1Bhbm5pbmcocGFnZVgsIHBhZ2VZKTtcclxuICAgICAgICB0aGlzLmNoYXJ0TWFuYWdlci5yZWRyYXdDaGFydHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXRQYW5uaW5nQ29vcmRzKCl7XHJcbiAgICAgICAgLy9UT0RPOiB0aGlzIGlzIGEgb25seSB3b3JrYXJvdW5kLCBuZWVkcyB0byBiZSBmaXhlZCBcclxuICAgICAgICAodGhpcy5jaGFydCBhcyBTRkNoYXJ0V3JhcHBlcikucHJldlBhbm5pbmdDb29yZHMgPSB7J3gnOiB1bmRlZmluZWQsICd5JzogdW5kZWZpbmVkfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEVuYWJsZXMgYm94IHpvb21pbmdcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGVuYWJsZVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0Qm94Wm9vbShlbmFibGU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLmNoYXJ0LmVuYWJsZUJveFpvb20oZW5hYmxlKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICAvKnByaXZhdGUgYWRkS2V5UmVsYXRlZEV2ZW50cyAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmtleUV2ZW50c1BsYWNlZCkge1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVDdXJzb3JXaXRoS2V5ID0gdGhpcy5tb3ZlQ3Vyc29yV2l0aEtleS5iaW5kKHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUtleVJlbGF0ZWRFdmVudHMgPSB0aGlzLnJlbW92ZUtleVJlbGF0ZWRFdmVudHMuYmluZCh0aGlzKVxyXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5tb3ZlQ3Vyc29yV2l0aEtleSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5yZW1vdmVLZXlSZWxhdGVkRXZlbnRzLCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5jaGFydEluc3RhbmNlLmNoYXJ0Q29udGFpbmVyLm9mZignY2xpY2snKTtcclxuICAgICAgICAgICAgdGhpcy5rZXlFdmVudHNQbGFjZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH07Ki9cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gZVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICAvKnByaXZhdGUgcmVtb3ZlS2V5UmVsYXRlZEV2ZW50cyAoZSkge1xyXG4gICAgICAgIGxldCB0YXJnZXRJZCA9IChlLnRhcmdldC5pZCA9PT0gJycpID8gZS50YXJnZXQucGFyZW50RWxlbWVudC5pZCA6IGUudGFyZ2V0LmlkO1xyXG5cclxuICAgICAgICBpZiAodGFyZ2V0SWQgIT0gdGhpcy5wYXJlbnRDb250ZW50SWQgJiYgXHJcbiAgICAgICAgICAgICF0YXJnZXRJZC5pbmNsdWRlcygndXJzb3IxJykgJiYgXHJcbiAgICAgICAgICAgICF0YXJnZXRJZC5pbmNsdWRlcygndXJzb3IyJykgJiYgXHJcbiAgICAgICAgICAgICF0YXJnZXRJZC5pbmNsdWRlcygnUmVmQ3Vyc29yJykgJiYgXHJcbiAgICAgICAgICAgICF0YXJnZXRJZC5pbmNsdWRlcygnQ3Vyc29ySW5mb19tYWluX01vdmUnKSkge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5tb3ZlQ3Vyc29yV2l0aEtleSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5yZW1vdmVLZXlSZWxhdGVkRXZlbnRzLCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5jaGFydEluc3RhbmNlLmNoYXJ0Q29udGFpbmVyLm9uKCdjbGljaycsIHRoaXMuYWRkS2V5UmVsYXRlZEV2ZW50cy5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgdGhpcy5rZXlFdmVudHNQbGFjZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgZm9yIChsZXQgY3Vyc29yIG9mIHRoaXMuY3Vyc29ySGFuZGxlcnMpIHtcclxuICAgICAgICAgICAgICAgIGN1cnNvci5kZXNlbGVjdEN1cnNvcnMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0qL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTW92ZSBjdXJzb3Igd2l0aCBrZXlcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbW92ZUN1cnNvcldpdGhLZXkgKGUpIHtcclxuICAgICAgICB2YXIgbW92ZUFkZCA9IDAuMDtcclxuXHJcbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMzcgfHwgZS5rZXlDb2RlID09PSAzOSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIG1vdmVBZGQgPSAoZS5rZXlDb2RlID09PSAzNykgPyAtMC4wMSA6IDAuMDE7XHJcbiAgICAgICAgICAgIG1vdmVBZGQgKj0gKGUuY3RybEtleSkgPyAxMCA6IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChtb3ZlQWRkICE9PSAwLjApIHtcclxuICAgICAgICAgICAgdGhpcy5wbGFjZVJlZmVyZW5jZUN1cnNvckZyb21LZXkobW92ZUFkZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbW92ZUFkZFxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHBsYWNlUmVmZXJlbmNlQ3Vyc29yRnJvbUtleShtb3ZlQWRkOiBudW1iZXIpe1xyXG4gICAgICAgIC8vIGxldCBpbmRleCA9IHRoaXMuZ2V0QWN0aXZlQ3Vyc29yKCk7XHJcbiAgICAgICAgLy8gbGV0IGRhdGFQb2ludCA9IHRoaXMuZ2V0Q3Vyc29yUG9zaXRpb24oaW5kZXgpXHJcbiAgICAgICAgLy8gZGF0YVBvaW50Ll94ICs9IG1vdmVBZGQ7XHJcbiAgICAgICAgLy8gaWYoZGF0YVBvaW50ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgLy8gICAgIGlmKGRhdGFQb2ludC54ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmNoYXJ0TWFuYWdlci5zeW5jaHJvbml6ZUN1cnNvcnNQb3NpdGlvbihkYXRhUG9pbnQsIGluZGV4KTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vICAgICBlbHNle2NvbnNvbGUubG9nKFwidW5kZWZpbmVkXCIpfTtcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKkRyYXcgdGhlIGN1cnNvciBkZWZpbmVkIGJ5IGl0cyBpbmRleCBmb3IgYSBnaXZlbiB0aW1lc3RhbXBcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWVzdGFtcFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGN1cnNvckluZGV4XHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGhvdmVyZWRcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2VsZWN0ZWRcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBkcmF3Q3Vyc29yKHRpbWVzdGFtcDogbnVtYmVyLCBjdXJzb3JJbmRleDogbnVtYmVyLCBob3ZlcmVkOiBib29sZWFuLCBzZWxlY3RlZDogYm9vbGVhbikge1xyXG4gICAgICAgIGlmKHRoaXMuY3Vyc29ySGFuZGxlciAhPSB1bmRlZmluZWQpe1xyXG5cclxuICAgICAgICAgICAgLy9jYWxjdWxhdGUgdGhlIGN1cnNvciBwb3NpdGlvbiBmb3IgdGhlIGxlYWQgY3Vyc29yXHJcbiAgICAgICAgICAgIGxldCBsZWFkQ3Vyc29yQ2hhcnRQb2ludCA9IHRoaXMuY2FsY3VsYXRlTGVhZEN1cnNvckNoYXJ0UG9pbnQodGltZXN0YW1wLCB0aGlzLnNlcmllcyk7XHJcbiAgICAgICAgICAgIGxldCBsZWFkQ3Vyc29yUGl4ZWxQb3NpdGlvbjtcclxuICAgICAgICAgICAgbGV0IGxlYWRDdXJzb3JUaW1lc3RhbXA7XHJcblxyXG4gICAgICAgICAgICBsZXQgY3Vyc29yUG9zaXRpb25zIDogQ3Vyc29yUG9zaXRpb25JbmZvW10gPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGlmKGxlYWRDdXJzb3JDaGFydFBvaW50ICE9IHVuZGVmaW5lZCl7XHJcblxyXG4gICAgICAgICAgICAgICAgbGVhZEN1cnNvclBpeGVsUG9zaXRpb24gPSB0aGlzLmdldFBpeGVsc0Zyb21DaGFydFBvaW50KGxlYWRDdXJzb3JDaGFydFBvaW50LngsIGxlYWRDdXJzb3JDaGFydFBvaW50LnksIHRoaXMucHJpbWFyeVlBeGlzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICBsZWFkQ3Vyc29yVGltZXN0YW1wID0gdGhpcy5nZXRUaW1lc3RhbXBJblNlcmllcyhsZWFkQ3Vyc29yQ2hhcnRQb2ludCwgdGhpcy5zZXJpZXMpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vY2FsY3VsYXRlIHRoZSBjdXJzb3IgcG9zaXRpb25zIGZvciBhbGwgc2VyaWVzXHJcbiAgICAgICAgICAgICAgICBjdXJzb3JQb3NpdGlvbnMgPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgc2VyaWVzSW5kZXggPSAwIDsgc2VyaWVzSW5kZXggPCB0aGlzLnNlcmllcy5sZW5ndGg7IHNlcmllc0luZGV4Kyspe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihsZWFkQ3Vyc29yVGltZXN0YW1wID49IHRoaXMuc2VyaWVzW3Nlcmllc0luZGV4XS5zZXJpZS50aW1lc3RhbXBzWzBdICYmIGxlYWRDdXJzb3JUaW1lc3RhbXAgPD0gdGhpcy5zZXJpZXNbc2VyaWVzSW5kZXhdLnNlcmllLnRpbWVzdGFtcHNbdGhpcy5zZXJpZXNbc2VyaWVzSW5kZXhdLnNlcmllLnRpbWVzdGFtcHMubGVuZ3RoLTFdKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnNvclBvaW50ID0gdGhpcy5nZXRDdXJzb3JQb2ludChsZWFkQ3Vyc29yVGltZXN0YW1wLHNlcmllc0luZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNjYWxlSWQgPSB0aGlzLmdldFNjYWxlSURGb3JTZXJpZXModGhpcy5zZXJpZXNbc2VyaWVzSW5kZXhdLnNlcmllKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnNvclBvc2l0aW9uID0gdGhpcy5nZXRQaXhlbHNGcm9tQ2hhcnRQb2ludChjdXJzb3JQb2ludC54LCBjdXJzb3JQb2ludC55LCBzY2FsZUlkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vc2V0IGhpZ2hsaWdodCB0byB0cnVlIGlmIGN1cnNvciBpcyBob3ZlcmVkIGFuZCBpZiBpdHMgc2VyaWVzIGlzIGN1cnJlbnRseSBzZWxlY3RlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaGlnaGxpZ2h0Q3Vyc29yID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuaG92ZXJlZFNlcmllcy5pbmRleE9mKHRoaXMuc2VyaWVzW3Nlcmllc0luZGV4XSApICE9IC0xICYmIGhvdmVyZWQgJiYgKHRoaXMuc2VyaWVzLmxlbmd0aCAhPSB0aGlzLmhvdmVyZWRTZXJpZXMubGVuZ3RoIHx8IHRoaXMuaG92ZXJlZFNlcmllcy5sZW5ndGggPT0gMSkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlnaGxpZ2h0Q3Vyc29yID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3JQb3NpdGlvbnMucHVzaChuZXcgQ3Vyc29yUG9zaXRpb25JbmZvKGN1cnNvclBvc2l0aW9uLCB7c2VsZWN0ZWQ6IHNlbGVjdGVkLCBob3ZlcmVkOiBob3ZlcmVkLCBoaWdobGlnaHQ6IGhpZ2hsaWdodEN1cnNvciwgc2VyaWVzOiBbdGhpcy5zZXJpZXNbc2VyaWVzSW5kZXhdXSwgY3Vyc29ySW5kZXg6IGN1cnNvckluZGV4fSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBsZWFkQ3Vyc29yUG9zaXRpb24gPSBuZXcgQ3Vyc29yUG9zaXRpb25JbmZvKGxlYWRDdXJzb3JQaXhlbFBvc2l0aW9uLCB7c2VsZWN0ZWQ6IHNlbGVjdGVkLCBob3ZlcmVkOiBob3ZlcmVkLCBzZXJpZXM6IHRoaXMuc2VyaWVzLCBjdXJzb3JJbmRleDogY3Vyc29ySW5kZXh9KTtcclxuICAgICAgICAgICAgdGhpcy5jdXJzb3JIYW5kbGVyLmRyYXdDdXJzb3IobGVhZEN1cnNvclBvc2l0aW9uLGN1cnNvclBvc2l0aW9ucywgY3Vyc29ySW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgZ2V0U2NhbGVJREZvclNlcmllcyhzZXJpZXM6IEJhc2VTZXJpZXMpIDogc3RyaW5ne1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnNjYWxlcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2NhbGVzW2ldLmhhc0V4YWN0U2VyaWUoc2VyaWVzKSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zY2FsZXNbaV0uaWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICpjYWxjdWxhdGUgdGhlIGxlYWQgY3Vyc29yIGNoYXJ0IHBvaW50XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gdGltZXN0YW1wXHJcbiAgICAgKiBAcGFyYW0ge0NoYXJ0Vmlld1NlcmllW119IHNlcmllc1xyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVMZWFkQ3Vyc29yQ2hhcnRQb2ludCh0aW1lc3RhbXAsIHNlcmllcyA6IENoYXJ0Vmlld1NlcmllW10pe1xyXG4gICAgICAgIGxldCBsZWFkQ3Vyc29yUG9pbnQ7XHJcbiAgICAgICAgbGV0IG1pbkRpc3RhbmNlUG9pbnRUb0N1cnNvcjtcclxuXHJcbiAgICAgICAgLy9jYWxjdWxhdGUgbGVhZCBjdXJzb3IgcG9zaXRpb24gZnJvbSB0aGUgYXZhaWxhYmxlIHNlcmllc1xyXG4gICAgICAgIGZvcihsZXQgc2VyaWVzSW5kZXggPSAwOyBzZXJpZXNJbmRleCA8IHNlcmllcy5sZW5ndGg7IHNlcmllc0luZGV4Kyspe1xyXG4gICAgICAgICAgICBsZXQgY3Vyc29yUG9pbnQgPSB0aGlzLmdldEN1cnNvclBvaW50KHRpbWVzdGFtcCxzZXJpZXNJbmRleCk7XHJcbiAgICAgICAgICAgIGlmKHRpbWVzdGFtcCA+PSB0aGlzLnNlcmllc1tzZXJpZXNJbmRleF0uc2VyaWUudGltZXN0YW1wc1swXSAmJiB0aW1lc3RhbXAgPD0gdGhpcy5zZXJpZXNbc2VyaWVzSW5kZXhdLnNlcmllLnRpbWVzdGFtcHNbdGhpcy5zZXJpZXNbc2VyaWVzSW5kZXhdLnNlcmllLnRpbWVzdGFtcHMubGVuZ3RoLTFdKXtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihtaW5EaXN0YW5jZVBvaW50VG9DdXJzb3IgPT0gdW5kZWZpbmVkIHx8IE1hdGguYWJzKGN1cnNvclBvaW50LnggLSB0aW1lc3RhbXApIDwgbWluRGlzdGFuY2VQb2ludFRvQ3Vyc29yKXtcclxuICAgICAgICAgICAgICAgICAgICBtaW5EaXN0YW5jZVBvaW50VG9DdXJzb3IgPSBNYXRoLmFicyhjdXJzb3JQb2ludC54IC0gdGltZXN0YW1wKTtcclxuICAgICAgICAgICAgICAgICAgICBsZWFkQ3Vyc29yUG9pbnQgPSBjdXJzb3JQb2ludDtcclxuICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxlYWRDdXJzb3JQb2ludDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0U2NhbGVCeVNjYWxlSWQoc2NhbGVJZCkgOiBTY2FsZXx1bmRlZmluZWR7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuc2NhbGVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYoc2NhbGVJZCA9PSB0aGlzLnNjYWxlc1tpXS5pZCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zY2FsZXNbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0WVNjYWxlc0NoYXJ0Wm9vbSgpe1xyXG4gICAgICAgIGxldCBzY2FsZXMgPSB0aGlzLmdldFlTY2FsZXMoKTtcclxuICAgICAgICBsZXQgY2hhcnRNaW5ZUGl4ZWwgOiBudW1iZXJ8dW5kZWZpbmVkO1xyXG4gICAgICAgIGxldCBjaGFydE1heFlQaXhlbCA6IG51bWJlcnx1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgIGZvciAobGV0IHNjYWxlIG9mIHNjYWxlcyl7XHJcbiAgICAgICAgICAgIGxldCBzZXJpZXNNaW5ZID0gdGhpcy5nZXRTZXJpZXNNaW5ZRm9yU2NhbGUoc2NhbGUpO1xyXG4gICAgICAgICAgICBsZXQgc2VyaWVzTWF4WSA9IHRoaXMuZ2V0U2VyaWVzTWF4WUZvclNjYWxlKHNjYWxlKTtcclxuXHJcbiAgICAgICAgICAgIGlmKHNlcmllc01pblkgIT0gdW5kZWZpbmVkICYmIHNlcmllc01heFkgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGxldCBheGlzTWluWVBpeGVsID0gdGhpcy5jYWxjdWxhdGVQaXhlbFkoc2NhbGUuaWQsIHNlcmllc01pblkpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGF4aXNNYXhZUGl4ZWwgPSB0aGlzLmNhbGN1bGF0ZVBpeGVsWShzY2FsZS5pZCwgc2VyaWVzTWF4WSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoY2hhcnRNaW5ZUGl4ZWwgPT0gdW5kZWZpbmVkIHx8IGF4aXNNaW5ZUGl4ZWwgPiBjaGFydE1pbllQaXhlbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hhcnRNaW5ZUGl4ZWwgPSBheGlzTWluWVBpeGVsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoY2hhcnRNYXhZUGl4ZWwgPT0gdW5kZWZpbmVkIHx8IGF4aXNNYXhZUGl4ZWwgPCBjaGFydE1heFlQaXhlbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hhcnRNYXhZUGl4ZWwgPSBheGlzTWF4WVBpeGVsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihjaGFydE1pbllQaXhlbCAhPSB1bmRlZmluZWQgJiYgY2hhcnRNYXhZUGl4ZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgZm9yIChsZXQgc2NhbGUgb2Ygc2NhbGVzKXtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdBeGlzTWluVmFsdWUgPSB0aGlzLmdldENoYXJ0Q29vcmRpbmF0ZUZyb21QaXhlbCh0aGlzLnByaW1hcnlYQXhpc05hbWUsIHNjYWxlLmlkLCAwLCBjaGFydE1pbllQaXhlbCkueTtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdBeGlzTWF4VmFsdWUgPSB0aGlzLmdldENoYXJ0Q29vcmRpbmF0ZUZyb21QaXhlbCh0aGlzLnByaW1hcnlYQXhpc05hbWUsIHNjYWxlLmlkLCAwLCBjaGFydE1heFlQaXhlbCkueTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVJhbmdlWShzY2FsZSxuZXdBeGlzTWluVmFsdWUsIG5ld0F4aXNNYXhWYWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHJhbmdlIGZvciBYIEF4aXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbmV3TWluWFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG5ld01heFhcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFJhbmdlWChuZXdNaW5YOiBudW1iZXIsIG5ld01heFg6IG51bWJlcil7XHJcbiAgICAgICAgdGhpcy5zY2FsZXNbMF0ubWluWFZhbHVlID0gbmV3TWluWDtcclxuICAgICAgICB0aGlzLnNjYWxlc1swXS5tYXhYVmFsdWUgPSBuZXdNYXhYO1xyXG5cclxuICAgICAgICBsZXQgYXhpcyA9IHRoaXMuY2hhcnQuZ2V0QXhpcyh0aGlzLnByaW1hcnlYQXhpc05hbWUpO1xyXG4gICAgICAgIGlmKCBheGlzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGF4aXMuc2V0QXhpc1JhbmdlKHttaW46IG5ld01pblgsIG1heDogbmV3TWF4WH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgcmFuZ2Ugb2YgdGhpcyBjaGFydCBmb3IgdGhlIGdpdmVuIGF4aXMgYW5kIG1pbi9tYXggdmFsdWVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBheGlzTmFtZVxyXG4gICAgICogQHBhcmFtIHsqfSBheGlzXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbWluVmFsdWVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtYXhWYWx1ZVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0U2NhbGVSYW5nZShzY2FsZTogU2NhbGUsIG1pblhWYWx1ZTogbnVtYmVyLCBtYXhYVmFsdWU6IG51bWJlciwgbWluWVZhbHVlOiBudW1iZXIsIG1heFlWYWx1ZTogbnVtYmVyLCBvcmllbnRhdGlvbj86IHN0cmluZywgc2V0QXhpc1JhbmdlID0gdHJ1ZSl7XHJcbiAgICAgICAgbGV0IHRyaWdnZXJDaGFuZ2VkRXZlbmV0ID0gZmFsc2U7XHJcbiAgICAgICAgaWYoc2NhbGUubWluWFZhbHVlICE9IG1pblhWYWx1ZSB8fHNjYWxlLm1heFhWYWx1ZSAhPSBtYXhYVmFsdWUpe1xyXG4gICAgICAgICAgICB0cmlnZ2VyQ2hhbmdlZEV2ZW5ldCA9IHRydWU7XHJcbiAgICAgICAgfSAgICBcclxuICAgICAgICBzY2FsZS5taW5ZVmFsdWUgPSBtaW5ZVmFsdWU7XHJcbiAgICAgICAgc2NhbGUubWF4WVZhbHVlID0gbWF4WVZhbHVlO1xyXG5cclxuICAgICAgICBzY2FsZS5taW5YVmFsdWUgPSBtaW5YVmFsdWU7XHJcbiAgICAgICAgc2NhbGUubWF4WFZhbHVlID0gbWF4WFZhbHVlO1xyXG5cclxuICAgICAgICBpZih0cmlnZ2VyQ2hhbmdlZEV2ZW5ldCl7XHJcbiAgICAgICAgICAgIGxldCBhcmdzID0gbmV3IEV2ZW50U2NhbGVEYXRhQ2hhbmdlZEFyZ3MoU2NhbGVBY3Rpb24ucmFuZ2VDaGFuZ2VkLCB7c2NhbGU6IHNjYWxlfSk7XHJcbiAgICAgICAgICAgIHNjYWxlLmV2ZW50RGF0YUNoYW5nZWQucmFpc2Uoc2NhbGUsYXJncyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihzZXRBeGlzUmFuZ2Upe1xyXG4gICAgICAgICAgICBsZXQgYXhpcyA9IHRoaXMuY2hhcnQuZ2V0QXhpcyhzY2FsZS5pZCk7XHJcbiAgICAgICAgICAgIGlmKGF4aXMgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGF4aXMuc2V0QXhpc1JhbmdlKHttaW46IHNjYWxlLm1pbllWYWx1ZSwgbWF4OiBzY2FsZS5tYXhZVmFsdWV9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGUgWSByYW5nZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge1NjYWxlfSBzY2FsZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHlBeGlzTWF4VmFsdWVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5QXhpc01pblZhbHVlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB1cGRhdGVSYW5nZVkoc2NhbGU6IFNjYWxlLCB5QXhpc01pblZhbHVlOiBudW1iZXIsIHlBeGlzTWF4VmFsdWU6IG51bWJlcil7XHJcbiAgICAgICAgbGV0IGNoYXJ0UmFuZ2VIZWxwZXIgPSBuZXcgQ2hhcnRSYW5nZUhlbHBlcjtcclxuICAgIFxyXG4gICAgICAgIGlmKCFpc05hTih5QXhpc01heFZhbHVlKSB8fCAhaXNOYU4oeUF4aXNNaW5WYWx1ZSkpe1xyXG5cclxuICAgICAgICAgICAgeUF4aXNNYXhWYWx1ZSA9IE51bWJlcih5QXhpc01heFZhbHVlLnRvUHJlY2lzaW9uKDE0KSk7XHJcbiAgICAgICAgICAgIHlBeGlzTWluVmFsdWUgPSBOdW1iZXIoeUF4aXNNaW5WYWx1ZS50b1ByZWNpc2lvbigxNCkpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHlBeGlzUmFuZ2UgPSB5QXhpc01heFZhbHVlIC0geUF4aXNNaW5WYWx1ZTtcclxuICAgICAgICAgICAgbGV0IHlBeGlzT2Zmc2V0O1xyXG4gICAgICAgICAgICBpZih5QXhpc1JhbmdlID09IDApe1xyXG4gICAgICAgICAgICAgICAgLy9pZiByYW5nZSBpcyB6ZXJvLCB3ZSBoYXZlIHRvIGNhbGN1bGF0ZSBhbiBhcmJpdHJhcnkgb2Zmc2V0IHRvIGRpc3BsYXkgdGhlIHkgYXhpcyBjb3JyZWN0bHlcclxuICAgICAgICAgICAgICAgIHlBeGlzT2Zmc2V0ID0gY2hhcnRSYW5nZUhlbHBlci5nZXRBeGlzT2Zmc2V0Rm9yU3RyYWlnaHRMaW5lcyh5QXhpc01pblZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgbGV0IGF4aXMgPSB0aGlzLmNoYXJ0LmdldEF4aXMoc2NhbGUuaWQpO1xyXG4gICAgICAgICAgICAgICAgaWYoYXhpcyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwaXhlbFJhbmdlID0gYXhpcy5nZXRBeGlzUmFuZ2VJblBpeGVsKClcclxuICAgICAgICAgICAgICAgICAgICB5QXhpc09mZnNldCA9IGNoYXJ0UmFuZ2VIZWxwZXIuZ2V0QXhpc09mZnNldCh5QXhpc1JhbmdlLChwaXhlbFJhbmdlLm1heCAtIHBpeGVsUmFuZ2UubWluKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHlBeGlzTWF4VmFsdWUgKz0geUF4aXNPZmZzZXQ7XHJcbiAgICAgICAgICAgIHlBeGlzTWluVmFsdWUgLT0geUF4aXNPZmZzZXQ7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB5QXhpc1JhbmdlID0geUF4aXNNYXhWYWx1ZSEgLSB5QXhpc01pblZhbHVlIVxyXG4gICAgICAgICAgICB0aGlzLnNldFNjYWxlUmFuZ2Uoc2NhbGUsIHNjYWxlLm1pblhWYWx1ZSwgc2NhbGUubWF4WFZhbHVlLCB5QXhpc01pblZhbHVlLCB5QXhpc01heFZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgbWluIFkgdmFsdWUgZnJvbSBhbGwgdGhlIHNlcmllcyBpbiB0aGUgY2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtTY2FsZX0gc2NhbGVcclxuICAgICAqIEByZXR1cm5zIHsobnVtYmVyfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRTZXJpZXNNaW5ZRm9yU2NhbGUoc2NhbGU6IFNjYWxlKSA6IG51bWJlcnx1bmRlZmluZWR7XHJcbiAgICAgICAgbGV0IG1pblk6IG51bWJlcnx1bmRlZmluZWQgPSB1bmRlZmluZWRcclxuICAgIFxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzY2FsZS5jaGlsZHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZiAobWluWSA9PSB1bmRlZmluZWQgfHwgc2NhbGUuY2hpbGRzW2ldLm1pblkhIDwgbWluWSl7XHJcbiAgICAgICAgICAgICAgICBtaW5ZID0gc2NhbGUuY2hpbGRzW2ldLm1pblk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1pblk7ICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgbWF4IFkgdmFsdWUgZnJvbSBhbGwgdGhlIHNlcmllcyBvbiB0aGUgYXhpc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge1NjYWxlfSBzY2FsZVxyXG4gICAgICogQHJldHVybnMgeyhudW1iZXJ8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFNlcmllc01heFlGb3JTY2FsZShzY2FsZTogU2NhbGUpOiBudW1iZXJ8dW5kZWZpbmVke1xyXG4gICAgICAgIGxldCBtYXhZOiBudW1iZXIgfCB1bmRlZmluZWQgPSB1bmRlZmluZWRcclxuICAgIFxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzY2FsZS5jaGlsZHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZiAobWF4WSA9PSB1bmRlZmluZWQgfHwgc2NhbGUuY2hpbGRzW2ldLm1heFkhID4gbWF4WSl7XHJcbiAgICAgICAgICAgICAgICBtYXhZID0gc2NhbGUuY2hpbGRzW2ldLm1heFk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1heFk7ICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0N1cnNvclN0YXRlc30gbW9kaWZpZWRTdGF0ZVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZUN1cnNvclN0YXRlc1dpdGhOZXdNb2RpZmllZFN0YXRlcyAobW9kaWZpZWRTdGF0ZTogQ3Vyc29yU3RhdGVzKSB7XHJcbiAgICAgICAgdGhpcy5jdXJzb3JTdGF0ZXMgPSBtb2RpZmllZFN0YXRlO1xyXG4gICAgICAgIGxldCBzZXJpZUN1cnNvclR5cGUgPSB0aGlzLmdldFNlcmllQ3Vyc29yVHlwZSgpO1xyXG4gICAgICAgIGxldCBjdXJzb3JUaW1lU3RhdGVzID0gbW9kaWZpZWRTdGF0ZS5nZXRUaW1lU3RhdGVzKCk7XHJcbiAgICAgICAgbGV0IGN1cnNvckZyZXFTdGF0ZXMgPSBtb2RpZmllZFN0YXRlLmdldEZyZXF1ZW5jeVN0YXRlcygpO1xyXG5cclxuICAgICAgICBpZiAoc2VyaWVDdXJzb3JUeXBlID09IEN1cnNvclR5cGUudGltZURvbWFpbikge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUN1cnNvclN0YXRlcyhjdXJzb3JUaW1lU3RhdGVzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoc2VyaWVDdXJzb3JUeXBlID09IEN1cnNvclR5cGUuZnJlcXVlbmN5RG9tYWluKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ3Vyc29yU3RhdGVzKGN1cnNvckZyZXFTdGF0ZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSB1cGRhdGVDdXJzb3JTdGF0ZXMgKGN1cnNvclN0YXRlczogSUN1cnNvclN0YXRlW10pIHtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgY3Vyc29yU3RhdGVzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICB0aGlzLnNldEN1cnNvclN0YXRlKGluZGV4LCBjdXJzb3JTdGF0ZXNbaW5kZXhdKTtcclxuICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSBjdXJzb3JzIG9ubHkgaWYgdGhleSBoYXZlIGEgdmFsaWQgcG9zaXRpb25cclxuICAgICAgICAgICAgbGV0IHBvc2l0aW9uID0gY3Vyc29yU3RhdGVzW2luZGV4XS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgaWYgKHBvc2l0aW9uICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3Q3Vyc29yKHBvc2l0aW9uLCBpbmRleCwgY3Vyc29yU3RhdGVzW2luZGV4XS5ob3ZlcmVkLCBjdXJzb3JTdGF0ZXNbaW5kZXhdLnNlbGVjdGVkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxyXG4gICAgICogQHBhcmFtIHtJQ3Vyc29yU3RhdGV9IGN1cnNvclN0YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0Q3Vyc29yU3RhdGUoaW5kZXg6IG51bWJlciwgY3Vyc29yU3RhdGU6IElDdXJzb3JTdGF0ZSkge1xyXG4gICAgICAgIC8qZm9yIChsZXQgY3Vyc29ySGFuZGxlciBvZiB0aGlzLmN1cnNvckhhbmRsZXIuc2VyaWVDdXJzb3JzKSB7XHJcbiAgICAgICAgICAgIGN1cnNvckhhbmRsZXIuc2V0Q3Vyc29yU3RhdGUoaW5kZXgsIGN1cnNvclN0YXRlKTtcclxuICAgICAgICB9Ki9cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0TWluWEF4aXNWYWx1ZSAoKSAge1xyXG4gICAgICAgIGxldCBheGlzID0gdGhpcy5jaGFydC5nZXRBeGlzKHRoaXMucHJpbWFyeVhBeGlzTmFtZSk7XHJcbiAgICAgICAgaWYoYXhpcyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gYXhpcy5nZXRBeGlzUmFuZ2UoKS5taW5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldE1heFhBeGlzVmFsdWUgKCkge1xyXG4gICAgICAgIGxldCBheGlzID0gdGhpcy5jaGFydC5nZXRBeGlzKHRoaXMucHJpbWFyeVhBeGlzTmFtZSk7XHJcbiAgICAgICAgaWYoYXhpcyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gYXhpcy5nZXRBeGlzUmFuZ2UoKS5tYXhcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHlcclxuICAgICAqIEByZXR1cm5zIHt7IHg6IG51bWJlciwgeTogbnVtYmVyfX1cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRQaXhlbHNGcm9tQ2hhcnRQb2ludCAoeDogbnVtYmVyLCB5OiBudW1iZXIsIHNjYWxlSUQ6IHN0cmluZyk6IHsgeDogbnVtYmVyLCB5OiBudW1iZXJ9IHtcclxuICAgICAgICBsZXQgY2hhcnRBcmVhID0gdGhpcy5jaGFydC5nZXRDaGFydEFyZWEoKTtcclxuICAgICAgICByZXR1cm4geyB4OiB0aGlzLmNhbGN1bGF0ZVBpeGVsWCh4KSAtIGNoYXJ0QXJlYS54LCB5OiB0aGlzLmNhbGN1bGF0ZVBpeGVsWShzY2FsZUlELCB5KSAtIGNoYXJ0QXJlYS55fTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFdlIHJlcG9zaXRpb24gdGhlIGN1cnNvcnMgYXN3ZWxsIHdoZW4gd2UgdXBkYXRlIHRoZSBjaGFydFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCByZXBvc2l0aW9uQ3Vyc29ycygpIHtcclxuICAgICAgICBsZXQgc3RvcmU6IEN1cnNvclN0YXRlcyA9IHRoaXMuc3RhdGVzLnJlYWQoQ3Vyc29yU3RhdGVzLFwiQ3Vyc29yU3RhdGVzXCIpO1xyXG4gICAgICAgIGxldCBjaGFydEFyZWEgPSB0aGlzLmNoYXJ0LmdldENoYXJ0QXJlYSgpO1xyXG5cclxuICAgICAgICAvKmZvciAobGV0IGN1cnNvciBvZiB0aGlzLmN1cnNvckhhbmRsZXIuc2VyaWVDdXJzb3JzKSB7XHJcbiAgICAgICAgICAgIGN1cnNvci5kcmF3Q3Vyc29ycyhjaGFydEFyZWEueCwgY2hhcnRBcmVhLnksIGNoYXJ0QXJlYS5oZWlnaHQsIGNoYXJ0QXJlYS53aWR0aCwgc3RvcmUuZ2V0QWN0aXZlKHN0b3JlLmdldFNlbGVjdGVkQ3Vyc29ySW5kZXgoKSkgPT0gdHJ1ZSk7XHJcbiAgICAgICAgfSovXHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5zdGF0ZXMucmVmcmVzaDxDdXJzb3JTdGF0ZXM+KEN1cnNvclN0YXRlcywobW9kaWZpZWRTdGF0ZSkgPT57dGhpcy51cGRhdGVDdXJzb3JTdGF0ZXNXaXRoTmV3TW9kaWZpZWRTdGF0ZXMobW9kaWZpZWRTdGF0ZSk7fSwgdGhpcy5jdXJzb3JTdGF0ZXNJZCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGNoYXJ0WFxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVQaXhlbFggKGNoYXJ0WDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgbWluWCA9IHRoaXMuZ2V0TWluWEF4aXNWYWx1ZSgpO1xyXG4gICAgICAgIGxldCBtYXhYID0gdGhpcy5nZXRNYXhYQXhpc1ZhbHVlKCk7IFxyXG5cclxuICAgICAgICBpZihtYXhYICE9IHVuZGVmaW5lZCAmJiBtaW5YICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGxldCByYW5nZSA9IChtYXhYIC0gbWluWClcclxuICAgICAgICAgICAgbGV0IHN0YXJ0WCA9IG1pblg7IFxyXG4gICAgICAgICAgICBsZXQgYWN0dWFsUmFuZ2UgPSByYW5nZTtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aW1lUGVyY2VudGFnZSA9IChjaGFydFggLSBzdGFydFgpIC8gYWN0dWFsUmFuZ2U7XHJcblxyXG4gICAgICAgICAgICBsZXQgY2hhcnRBcmVhID0gdGhpcy5jaGFydC5nZXRDaGFydEFyZWEoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNoYXJ0QXJlYS54ICsgY2hhcnRBcmVhLndpZHRoICogdGltZVBlcmNlbnRhZ2VcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9IFxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjaGFydFlcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2FsY3VsYXRlUGl4ZWxZIChzY2FsZUlEOiBzdHJpbmcsIGNoYXJ0WTogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgYXhpcyA9IHRoaXMuY2hhcnQuZ2V0QXhpcyhzY2FsZUlEKTtcclxuICAgICAgICBpZihheGlzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGxldCBheGlzUmFuZ2UgPSBheGlzLmdldEF4aXNSYW5nZSgpXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgcmFuZ2U7XHJcbiAgICAgICAgICAgIGlmKGF4aXNSYW5nZS5kZWx0YSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgcmFuZ2UgPSBheGlzUmFuZ2UuZGVsdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHJhbmdlID0gYXhpc1JhbmdlLm1heCAtIGF4aXNSYW5nZS5taW47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBzdGFydFkgPSBheGlzUmFuZ2UubWluO1xyXG4gICAgICAgICAgICBsZXQgdGltZVBlcmNlbnRhZ2UgPSAxIC0gKChjaGFydFkgLSBzdGFydFkpIC8gcmFuZ2UpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGNoYXJ0QXJlYSA9IHRoaXMuY2hhcnQuZ2V0Q2hhcnRBcmVhKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBjaGFydEFyZWEueSArIGNoYXJ0QXJlYS5oZWlnaHQgKiB0aW1lUGVyY2VudGFnZVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9IFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlIGRyb3AgbG9jYXRpb25zIGZyb20gdGhlIGNoYXJ0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVtb3ZlU2VyaWVEcm9wTG9jYXRpb25zKCl7XHJcbiAgICAgICAgZm9yKGxldCBheGlzQm91bmQgb2YgdGhpcy5heGlzQm91bmRzKXtcclxuICAgICAgICAgICAgJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCsnX2F4aXNEcm9wWm9uZScrYXhpc0JvdW5kLmF4aXMubmFtZSkucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQrJ19heGlzRHJvcFpvbmUnK1wiX2NoYXJ0QXJlYVwiKS5yZW1vdmUoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgbnVtYmVyIG9mIHkgYXhlcyBpbnNpZGUgYSBjaGFydFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXROdW1iZXJPZllTY2FsZXMoKSA6IG51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5zY2FsZXMubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IGFsbCB5IGF4ZXMgZnJvbSBhIGNoYXJ0XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge1NjYWxlW119XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRZU2NhbGVzKCkgOiBTY2FsZVtde1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNjYWxlcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHBpeGVsQ29vcmRpbmF0ZVhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBwaXhlbENvb3JkaW5hdGVZXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFhZQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldENoYXJ0Q29vcmRpbmF0ZUZyb21QaXhlbChzY2FsZUlEWDogc3RyaW5nLCBzY2FsZUlEWTogc3RyaW5nLHBpeGVsQ29vcmRpbmF0ZVggOiBudW1iZXIsIHBpeGVsQ29vcmRpbmF0ZVkgOiBudW1iZXIpIDogUG9pbnR7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGNoYXJ0QXJlYSA9IHRoaXMuY2hhcnQuZ2V0Q2hhcnRBcmVhKCk7XHJcbiAgICAgICAgbGV0IHhBeGlzID0gdGhpcy5jaGFydC5nZXRBeGlzKHNjYWxlSURYKTtcclxuICAgICAgICBsZXQgeUF4aXMgPSB0aGlzLmNoYXJ0LmdldEF4aXMoc2NhbGVJRFkpO1xyXG4gICAgICAgIGxldCB5QXhpc1JhbmdlID0geUF4aXMhLmdldEF4aXNSYW5nZSgpO1xyXG4gICAgICAgIGxldCB4QXhpc1JhbmdlID0geEF4aXMhLmdldEF4aXNSYW5nZSgpO1xyXG5cclxuICAgICAgICAvLyBYIEF4aXM6IFxyXG4gICAgICAgIGxldCByZWxhdGl2ZVBpeGVsQ29vcmRpbmF0ZVggPSBCaWcocGl4ZWxDb29yZGluYXRlWCkubWludXMoQmlnKGNoYXJ0QXJlYS54KSk7XHJcbiAgICAgICAgbGV0IGNoYXJ0QXhpc1hSYW5nZSA9IEJpZyh4QXhpc1JhbmdlLm1heCkubWludXMoQmlnKHhBeGlzUmFuZ2UubWluKSk7XHJcblxyXG4gICAgICAgIGxldCBjaGFydENvb3JkaW5hdGVQZXJQaXhlbCA9IGNoYXJ0QXhpc1hSYW5nZS5kaXYoQmlnKGNoYXJ0QXJlYS53aWR0aCkpO1xyXG4gICAgICAgIGxldCBjbG9zZXN0WEF4aXNWYWx1ZVRvQ2xpY2sgPSBCaWcoeEF4aXNSYW5nZS5taW4pLnBsdXMoKHJlbGF0aXZlUGl4ZWxDb29yZGluYXRlWC50aW1lcyhjaGFydENvb3JkaW5hdGVQZXJQaXhlbCkpKTtcclxuXHJcbiAgICAgICAgLy8gWSBBeGlzOiBcclxuICAgICAgICBsZXQgcmVsYXRpdmVQaXhlbENvb3JkaW5hdGVZID0gQmlnKHBpeGVsQ29vcmRpbmF0ZVkpLm1pbnVzKEJpZyhjaGFydEFyZWEueSkpO1xyXG4gICAgICAgIGxldCBjaGFydEF4aXNZUmFuZ2UgPSBCaWcoeUF4aXNSYW5nZS5tYXgpLm1pbnVzKEJpZyh5QXhpc1JhbmdlLm1pbikpO1xyXG5cclxuICAgICAgICBjaGFydENvb3JkaW5hdGVQZXJQaXhlbCA9IGNoYXJ0QXhpc1lSYW5nZS5kaXYoQmlnKGNoYXJ0QXJlYS5oZWlnaHQpKTtcclxuICAgICAgICBsZXQgY2xvc2VzdFlBeGlzVmFsdWVUb0NsaWNrID0gIEJpZyh5QXhpc1JhbmdlLm1pbikucGx1cyhjaGFydEF4aXNZUmFuZ2UubWludXMocmVsYXRpdmVQaXhlbENvb3JkaW5hdGVZLnRpbWVzKGNoYXJ0Q29vcmRpbmF0ZVBlclBpeGVsKSkpXHJcblxyXG5cclxuICAgICAgICBsZXQgY2xvc2VzdFlBeGlzVmFsdWVOdW1iZXIgPSBOdW1iZXIoY2xvc2VzdFlBeGlzVmFsdWVUb0NsaWNrLnRvRml4ZWQoMTQpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIGxldCBjbG9zZXN0WEF4aXNWYWx1ZU51bWJlciA9IE51bWJlcihjbG9zZXN0WEF4aXNWYWx1ZVRvQ2xpY2sudG9GaXhlZCgxNCkudG9TdHJpbmcoKSk7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUG9pbnQoY2xvc2VzdFhBeGlzVmFsdWVOdW1iZXIsIGNsb3Nlc3RZQXhpc1ZhbHVlTnVtYmVyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldHMgYSBzZXJpZXMgcG9pbnQgaW4gY2hhcnQgY29vcmRpbmF0ZXMgZm9yIHRoZSBzcGVjZWZpZWQgdGltZXN0YW1wXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWVzdGFtcFxyXG4gICAgICogQHJldHVybnMge1BvaW50fVxyXG4gICAgICogQG1lbWJlcm9mIFlUQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldFNlcmllc1BvaW50RnJvbVRpbWVzdGFtcCh0aW1lc3RhbXA6IG51bWJlcik6IFBvaW50IHtcclxuXHJcbiAgICAgICAgLy8gd2UgcHJvdmlkZSB5ID09IDAgaWYgd2UgYXJlIG5vdCBhYmxlIHRvIGZpbmQgbWF0Y2hpbmcgcG9pbnRzXHJcbiAgICAgICAgbGV0IHNlcmllc1BvaW50ID0gbmV3IFBvaW50KHRpbWVzdGFtcCwgMCk7XHJcblxyXG4gICAgICAgIC8vIHNraXAgc2VhcmNoaW5nIGlmIHRoZSBzZXJpZXMgaW5kZXggaXMgb3V0IG9mIHJhbmdlXHJcbiAgICAgICAgaWYgKHRoaXMuc2VyaWVzLmxlbmd0aCA9PSAwICkgcmV0dXJuIHNlcmllc1BvaW50O1xyXG5cclxuICAgICAgICAvLyBmaW5kIGEgbWF0Y2hpbmcgc2VyaWVzIHBvaW50IHJlbGF0ZWQgdG8gdGhlIHRpbWVzdGFtcFxyXG4gICAgICAgIHNlcmllc1BvaW50ID0gdGhpcy5maW5kTmVhcmVzdFBvaW50SW5BbGxTZXJpZXModGltZXN0YW1wKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHNlcmllc1BvaW50O1xyXG4gICAgfVxyXG4gIFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VhcmNoZXMgZm9yIHRoZSBuZWFyZXN0IHBvaW50IHJlbGF0ZWQgdG8gdGhlIHRpbWVzdGFtcCBpbiBhbGwgc2VyaWVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lc3RhbXBcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZmluZE5lYXJlc3RQb2ludEluQWxsU2VyaWVzKHRpbWVzdGFtcDogbnVtYmVyKTogUG9pbnQgeyAgICAgICBcclxuXHJcbiAgICAgICAgLy8gY29sbGVjdCB0aGUgbmVhcmVzdCBwb2ludHMgZnJvbSBldmVyeSBzZXJpZXNcclxuICAgICAgICBsZXQgbmVhcmVzdFNlcmllc1BvaW50czogSVBvaW50W10gPSB0aGlzLnNlcmllcy5tYXAoKHNpbmdsZVNlcmllcyk9PiB7IHJldHVybiBzaW5nbGVTZXJpZXMuc2VyaWUucG9pbnRGcm9tVGltZXN0YW1wKHRpbWVzdGFtcCl9KTtcclxuXHJcbiAgICAgICAgLy8gc29ydCB0aGUgbmVhcmVzdCBwb2ludHMgYnkgdGhlaXIgdGltZXN0YW1wIHZhbHVlXHJcbiAgICAgICAgbmVhcmVzdFNlcmllc1BvaW50cy5zb3J0KCh2YWx1ZTEsIHZhbHVlMikgPT4geyByZXR1cm4gdmFsdWUxLnggLSB2YWx1ZTIueDsgfSk7XHJcblxyXG4gICAgICAgIC8vIGdldCB0aGUgdGltZXN0YW1wIHZhbHVlc1xyXG4gICAgICAgIGxldCBuZWFyZXN0U2VyaWVzVGltZXN0YW1wczogbnVtYmVyW10gPSBuZWFyZXN0U2VyaWVzUG9pbnRzLm1hcCgoc2VyaWVzUG9pbnQpPT57IHJldHVybiBzZXJpZXNQb2ludC54fSk7XHJcblxyXG4gICAgICAgIC8vIGZpbmQgdGhlIG5lYXJlc3QgcG9pbnQgZnJvbSBhbGwgc2VyaWVzLiBUaGUgZm91bmQgaW5kZXggcmVmZXJzIHRvIHRoZSBuZWFyZXN0IHNlcmllcyAhXHJcbiAgICAgICAgbGV0IG5lYXJlc3RTZXJpZXNJbmRleCA9IFNlcmllc0hlbHBlci5pbmRleE9mTmVhcmVzdCh0aW1lc3RhbXAsIG5lYXJlc3RTZXJpZXNUaW1lc3RhbXBzKTtcclxuXHJcbiAgICAgICAgLy8gZ2V0IHRoZSBuZWFyZXN0IHBvaW50IGZyb20gdGhlIHNlcmllc1xyXG4gICAgICAgIGxldCBzZXJpZXNQb2ludEZyb21UaW1lU3RhbXAgPSBuZWFyZXN0U2VyaWVzUG9pbnRzW25lYXJlc3RTZXJpZXNJbmRleF07XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSBhIHBvaW50IGluc3RhbmNlIHdpdGggYSBtYXRjaGluZyB0aW1lc3RhbXBcclxuICAgICAgICBsZXQgc2VyaWVzUG9pbnQgPSBzZXJpZXNQb2ludEZyb21UaW1lU3RhbXAgPyBuZXcgUG9pbnQoc2VyaWVzUG9pbnRGcm9tVGltZVN0YW1wLngsIHNlcmllc1BvaW50RnJvbVRpbWVTdGFtcC55KSA6IG5ldyBQb2ludCh0aW1lc3RhbXAsIDApO1xyXG5cclxuICAgICAgICByZXR1cm4gc2VyaWVzUG9pbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIHByb3BlcnR5IGNvbnRhaW5pbmcgZGF0YSB0byBiZSBkcmF3blxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNlcmllXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYXhpc0lEXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzaWNDaGFydFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlVHJhY2VEYXRhU2VyaWVzKHNlcmllOiBCYXNlU2VyaWVzLCBheGlzSUQ6IHN0cmluZyk6IHt9IHtcclxuICAgICAgICBsZXQgcHJvcGVydGllcyA9IHtcclxuICAgICAgICAgICAgbmFtZTogc2VyaWUuaWQsXHJcbiAgICAgICAgICAgIHR5cGU6ICdsaW5lJyxcclxuICAgICAgICAgICAgZGF0YVNvdXJjZTogc2VyaWUuZGF0YSxcclxuICAgICAgICAgICAgeE5hbWU6IFwieFwiLFxyXG4gICAgICAgICAgICB5TmFtZTogXCJ5XCIsXHJcbiAgICAgICAgICAgIGZpbGw6IHNlcmllLmNvbG9yLFxyXG4gICAgICAgICAgICB5QXhpc05hbWU6IGF4aXNJRCxcclxuICAgICAgICAgICAgX3lBeGlzTmFtZTogYXhpc0lELFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBwcm9wZXJ0aWVzO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBPdmVybG9hZCBtZXRob2RzIGluIGRlcml2ZWQgY2hhcnQgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXHJcbiAgICBcclxuICAgIHB1YmxpYyByZW1vdmVZU2NhbGVGcm9tQ2hhcnQoeVNjYWxlOiBTY2FsZSl7fTtcclxuXHJcbiAgICBwdWJsaWMgb25TeW5jaHJvbml6ZVNjYWxlUmFuZ2Uoc2NhbGUgOiBTY2FsZSwgbWluOm51bWJlciwgbWF4Om51bWJlcikge31cclxuXHJcbiAgICBwdWJsaWMgc2V0QXZhaWxhYmxlU2VyaWVzQXNEYXRhU291cmNlKCl7fVxyXG5cclxuICAgIGFic3RyYWN0IGdldFRvdGFsTWF4WCh0cmFjZUNoYXJ0OiBJVHJhY2VDaGFydFtdKTogbnVtYmVyfHVuZGVmaW5lZDtcclxuICAgIGFic3RyYWN0IGdldFRvdGFsTWluWCh0cmFjZUNoYXJ0OiBJVHJhY2VDaGFydFtdKSA6IG51bWJlcnx1bmRlZmluZWQ7XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZUNoYXJ0UmFuZ2VYKCkge1xyXG4gICAgICAgIGxldCBjaGFydFJhbmdlSGVscGVyID0gbmV3IENoYXJ0UmFuZ2VIZWxwZXIoKVxyXG5cclxuICAgICAgICBsZXQgeEF4aXNNaW5WYWx1ZSA9IHRoaXMuZ2V0VG90YWxNaW5YKHRoaXMuY2hhcnRNYW5hZ2VyLnRyYWNlQ2hhcnRMaXN0KTtcclxuICAgICAgICBsZXQgeEF4aXNNYXhWYWx1ZSA9IHRoaXMuZ2V0VG90YWxNYXhYKHRoaXMuY2hhcnRNYW5hZ2VyLnRyYWNlQ2hhcnRMaXN0KTtcclxuXHJcbiAgICAgICAgaWYoeEF4aXNNYXhWYWx1ZSAhPSB1bmRlZmluZWQgJiYgeEF4aXNNaW5WYWx1ZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBsZXQgeEF4aXNTZWdtZW50UmFuZ2UgPSB4QXhpc01heFZhbHVlIC0geEF4aXNNaW5WYWx1ZTtcclxuICAgICAgICAgICAgbGV0IHhBeGlzT2Zmc2V0O1xyXG4gICAgICAgICAgICBpZih4QXhpc1NlZ21lbnRSYW5nZSA9PSAwKXtcclxuICAgICAgICAgICAgICAgIHhBeGlzT2Zmc2V0ID0gY2hhcnRSYW5nZUhlbHBlci5nZXRBeGlzT2Zmc2V0Rm9yU3RyYWlnaHRMaW5lcyh0aGlzLnNlcmllc1swXS5yYXdQb2ludHNbMF0ueCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGxldCBheGlzID0gdGhpcy5jaGFydC5nZXRBeGlzKHRoaXMucHJpbWFyeVhBeGlzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICBpZihheGlzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGF4aXNQaXhlbFJhbmdlID0gYXhpcy5nZXRBeGlzUmFuZ2VJblBpeGVsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgeEF4aXNPZmZzZXQgPSBjaGFydFJhbmdlSGVscGVyLmdldEF4aXNPZmZzZXQoeEF4aXNTZWdtZW50UmFuZ2UsIChheGlzUGl4ZWxSYW5nZS5tYXggLSBheGlzUGl4ZWxSYW5nZS5taW4pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB4QXhpc01heFZhbHVlISArPSB4QXhpc09mZnNldDtcclxuICAgICAgICAgICAgeEF4aXNNaW5WYWx1ZSEgLT0geEF4aXNPZmZzZXQ7XHJcbiAgICAgICAgICAgIHhBeGlzU2VnbWVudFJhbmdlID0geEF4aXNNYXhWYWx1ZSAtIHhBeGlzTWluVmFsdWU7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNldFJhbmdlWCh4QXhpc01pblZhbHVlLCB4QXhpc01heFZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgZ2V0VGltZXN0YW1wSW5TZXJpZXMocDogUG9pbnQsIHNlcmllcyA6IENoYXJ0Vmlld1NlcmllW10pOiBudW1iZXIgeyByZXR1cm4gcC54OyB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGdldEN1cnNvclBvaW50KHRpbWVzdGFtcDogbnVtYmVyLHNlcmllc0luZGV4Om51bWJlcik6SVBvaW50IHsgcmV0dXJuIG5ldyBQb2ludCh0aW1lc3RhbXAsMCk7fVxyXG5cclxuICAgIHB1YmxpYyBhZGRTZXJpZURyb3BMb2NhdGlvbnMoc2VyaWU6IEFycmF5PEJhc2VTZXJpZXM+LCBjaGFydE1hbmFnZXJDaGFydCl7fTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgYWRkRHJvcExvY2F0aW9ucyAoc2VyaWU6IEJhc2VTZXJpZXMpe307XHJcblxyXG4gICAgcHVibGljIGdldERyb3BMb2NhdGlvblR5cGUoY3VycmVudFRhcmdldDogYW55KTogRHJvcExvY2F0aW9uVHlwZXsgcmV0dXJuIERyb3BMb2NhdGlvblR5cGUuaW52YWxpZDsgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRZU2NhbGUoc2NhbGUgOiBTY2FsZSwgcG9zaXRpb246IEF4aXNQb3NpdGlvbil7fVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVEcm9wcGFibGVBcmVhcyhjdXJyZW50VGFyZ2V0KSB7fTtcclxuXHJcbiAgICBwdWJsaWMgcmVzZXRIaWdobGlnaHRpbmcoKXt9O1xyXG59XHJcblxyXG5leHBvcnQgeyBDaGFydEJhc2UsIEV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb24sIEV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb25BcmdzLCBDaGFydE9iamVjdFR5cGUsIERyb3BMb2NhdGlvblR5cGUsIENoYXJ0T2JqZWN0SW5mb3JtYXRpb259O1xyXG5cclxuIl19