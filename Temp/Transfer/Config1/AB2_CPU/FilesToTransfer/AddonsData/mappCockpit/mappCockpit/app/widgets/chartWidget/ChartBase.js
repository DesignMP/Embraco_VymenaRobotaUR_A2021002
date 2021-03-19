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
define(["require", "exports", "../common/widgetBase", "./helpers/chartRangeHelper", "../../framework/events", "./userInteraction/userInteractionController", "../../models/common/point", "../common/states/cursorStates", "./cursor/CursorPositionInfo", "./chartViewSerie", "../../common/seriesHelper", "./chartWrapper/SFChartWrapper", "../../core/interfaces/components/ui/chart/chartInterface", "../../models/chartManagerDataModel/eventScaleDataChangedArgs", "./defaultComponentSettings"], function (require, exports, widgetBase_1, chartRangeHelper_1, events_1, userInteractionController_1, point_1, cursorStates_1, CursorPositionInfo_1, chartViewSerie_1, seriesHelper_1, SFChartWrapper_1, chartInterface_1, eventScaleDataChangedArgs_1, defaultComponentSettings_1) {
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
        function EventRedrawAllChartsArgs() {
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
            _this.component.type = "ChartBase"; // TODO: Remove when chartbase(xychart, fftchart, ytchart) will be created with the component factory
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
            this._cursorStates.dispose();
            var chartObj = $(this.cssParentContentId).data("ejChart");
            if (chartObj != undefined) {
                chartObj.destroy();
            }
            else {
                // TODO: dispose of this widget is called from splitter and also from the chartViewChartManager
                console.warn("Dispose of chartObj(== undefined) not possible!");
            }
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
            _super.prototype.initialize.call(this, containerId);
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
         * @returns {*}
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
                            this.eventRedrawAllCharts.raise(this, new EventRedrawAllChartsArgs());
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
            console.log("updateSelctedCursor " + nearestTimestampFromAllSeries);
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
                var selectedCursorIndex = this._cursorStates.getSelectedCursorIndex();
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
                    var oldCursorStates = this.cursorsStates;
                    this.cursorsStates = this.updateHoveringStatesInCursors(this.cursorsStates, closestCursorIndex);
                    if (oldCursorStates.getHoveredCursorIndex() != this.cursorsStates.getHoveredCursorIndex()) {
                        this.updateCursorStates(this.cursorsStates);
                    }
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
            //this.chartManager.redrawCharts();
            this.eventRedrawAllCharts.raise(this, new EventRedrawAllChartsArgs());
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
                            var cursorChartPoint = this.getCursorPoint(leadCursorTimestamp, timestamp, seriesIndex);
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
                if (series[seriesIndex].serie.rawPointsValid) {
                    var cursorPoint = this.getCursorPoint(timestamp, timestamp, seriesIndex);
                    //check if timestamp is within series 
                    if (timestamp >= this.series[seriesIndex].serie.timestamps[0] && timestamp <= this.series[seriesIndex].serie.timestamps[this.series[seriesIndex].serie.timestamps.length - 1]) {
                        if (minDistancePointToCursor == undefined || Math.abs(cursorPoint.timestamp - timestamp) < minDistancePointToCursor) {
                            minDistancePointToCursor = Math.abs(cursorPoint.timestamp - timestamp);
                            leadCursorPoint = cursorPoint;
                        }
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
        ChartBase.prototype.getCursorPoint = function (leadCursorTimeStamp, timestamp, seriesIndex) { return { x: timestamp, y: 0, timestamp: timestamp }; };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hhcnRCYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0V2lkZ2V0L0NoYXJ0QmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBNEJBLElBQUssZUFPSjtJQVBELFdBQUssZUFBZTtRQUNoQix5REFBTSxDQUFBO1FBQ04seURBQU0sQ0FBQTtRQUNOLHFEQUFJLENBQUE7UUFDSixpRUFBVSxDQUFBO1FBQ1YsaUVBQVUsQ0FBQTtRQUNWLDJEQUFPLENBQUE7SUFDWCxDQUFDLEVBUEksZUFBZSxLQUFmLGVBQWUsUUFPbkI7SUErekM2SCwwQ0FBZTtJQTd6QzdJLElBQUssZ0JBSUo7SUFKRCxXQUFLLGdCQUFnQjtRQUNqQixxRUFBVyxDQUFBO1FBQ1gseUVBQWEsQ0FBQTtRQUNiLDZEQUFPLENBQUE7SUFDWCxDQUFDLEVBSkksZ0JBQWdCLEtBQWhCLGdCQUFnQixRQUlwQjtJQXl6QzhJLDRDQUFnQjtJQXZ6Qy9KO1FBSUksZ0NBQVksZUFBZ0MsRUFBRSxJQUFVO1lBQ3BELElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLENBQUM7UUFDTCw2QkFBQztJQUFELENBQUMsQUFSRCxJQVFDO0lBK3lDZ0ssd0RBQXNCO0lBN3lDdkw7UUFBd0MsNkNBQXFEO1FBQTdGOztRQUErRixDQUFDO1FBQUQsZ0NBQUM7SUFBRCxDQUFDLEFBQWhHLENBQXdDLG1CQUFVLEdBQThDO0lBNnlDNUIsOERBQXlCO0lBN3lDRyxDQUFDO0lBQ2pHO1FBSUksdUNBQVksb0JBQXFDLEVBQUUsY0FBb0I7WUFDbkUsSUFBSSxDQUFDLG9CQUFvQixHQUFHLG9CQUFvQixDQUFDO1lBQ2pELElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBQ3pDLENBQUM7UUFDTCxvQ0FBQztJQUFELENBQUMsQUFS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LENBQUM7UUFFMUMsdUNBQW1CLEdBQTFCLFVBQTJCLGFBQWtCLElBQXFCLE9BQU8sZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUU3Riw2QkFBUyxHQUFoQixVQUFpQixLQUFhLEVBQUUsUUFBc0IsSUFBRSxDQUFDO1FBRWxELHdDQUFvQixHQUEzQixVQUE0QixhQUFhLElBQUcsQ0FBQztRQUFBLENBQUM7UUFFdkMscUNBQWlCLEdBQXhCLGNBQTJCLENBQUM7UUFBQSxDQUFDO1FBQ2pDLGdCQUFDO0lBQUQsQ0FBQyxBQTN4Q0QsQ0FBaUMsdUJBQVUsR0EyeEMxQztJQUVRLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVRyYWNlQ2hhcnQgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL3RyYWNlQ2hhcnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgWm9vbURpcmVjdGlvbiB9IGZyb20gXCIuLi9jaGFydFZpZXdXaWRnZXQvY2hhcnRWaWV3V2lkZ2V0XCI7XHJcbmltcG9ydCB7IFdpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL3dpZGdldEJhc2VcIjtcclxuaW1wb3J0IHsgQ2hhcnRSYW5nZUhlbHBlciB9IGZyb20gXCIuL2hlbHBlcnMvY2hhcnRSYW5nZUhlbHBlclwiO1xyXG5pbXBvcnQgeyBUeXBlZEV2ZW50IH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9ldmVudHNcIjtcclxuaW1wb3J0IHsgTW91c2VBY3Rpb25UeXBlIH0gZnJvbSBcIi4vdXNlckludGVyYWN0aW9uL3VzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXJcIjtcclxuaW1wb3J0IHsgQmFzZVNlcmllcyB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2Jhc2VTZXJpZXNcIjtcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbW1vbi9wb2ludFwiO1xyXG5pbXBvcnQgeyBDdXJzb3JTdGF0ZXMsIEN1cnNvclR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL3N0YXRlcy9jdXJzb3JTdGF0ZXNcIjtcclxuaW1wb3J0IHsgQ3Vyc29ySGFuZGxlciB9IGZyb20gXCIuL2N1cnNvci9DdXJzb3JIYW5kbGVyXCI7XHJcbmltcG9ydCB7IEN1cnNvclBvc2l0aW9uIGFzIEN1cnNvclBvc2l0aW9uSW5mbyB9IGZyb20gXCIuL2N1cnNvci9DdXJzb3JQb3NpdGlvbkluZm9cIjtcclxuaW1wb3J0IHsgU2NhbGUgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9zY2FsZVwiO1xyXG5pbXBvcnQgeyBDaGFydFZpZXdTZXJpZSB9IGZyb20gXCIuL2NoYXJ0Vmlld1NlcmllXCI7XHJcbmltcG9ydCB7IFNlcmllc0hlbHBlciB9IGZyb20gXCIuLi8uLi9jb21tb24vc2VyaWVzSGVscGVyXCI7XHJcbmltcG9ydCB7IElQb2ludCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSUN1cnNvclN0YXRlIH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL2N1cnNvclN0YXRlSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNGQ2hhcnRXcmFwcGVyIH0gZnJvbSBcIi4vY2hhcnRXcmFwcGVyL1NGQ2hhcnRXcmFwcGVyXCI7XHJcbmltcG9ydCB7IElDaGFydCwgRXZlbnRBeGlzUmFuZ2VDaGFuZ2VkQXJncywgQXhpc09yaWVudGF0aW9uLCBFdmVudE1vdXNlQXJncywgRXZlbnRNb3VzZVdoZWVsQXJncywgQXhpc1Bvc2l0aW9ufSBmcm9tIFwiLi4vLi4vY29yZS9pbnRlcmZhY2VzL2NvbXBvbmVudHMvdWkvY2hhcnQvY2hhcnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQXhpc0JvdW5kcyB9IGZyb20gXCIuLi8uLi9jb3JlL3R5cGVzL0F4aXNCb3VuZHNcIjtcclxuaW1wb3J0IHtJQ2hhcnRBeGlzIH0gZnJvbSBcIi4uLy4uL2NvcmUvaW50ZXJmYWNlcy9jb21wb25lbnRzL3VpL2NoYXJ0L0NoYXJ0QXhpc0ludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBFdmVudFNjYWxlRGF0YUNoYW5nZWRBcmdzLCBTY2FsZUFjdGlvbiB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2V2ZW50U2NhbGVEYXRhQ2hhbmdlZEFyZ3NcIjtcclxuaW1wb3J0IHsgRGVmYXVsdENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4vZGVmYXVsdENvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCB7IElWaWV3IH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL3ZpZXdJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50U2V0dGluZ3NcIjtcclxuXHJcblxyXG5leHBvcnQgdHlwZSBUaW1lUG9pbnQgPSBJUG9pbnQgJiB7dGltZXN0YW1wOiBudW1iZXJ9O1xyXG5cclxuZW51bSBDaGFydE9iamVjdFR5cGV7XHJcbiAgICBjdXJzb3IsXHJcbiAgICBzZXJpZXMsXHJcbiAgICBheGlzLFxyXG4gICAgY2hhcnRTcGFjZSxcclxuICAgIGVtcHR5U3BhY2UsXHJcbiAgICBpbnZhbGlkICAgIFxyXG59XHJcblxyXG5lbnVtIERyb3BMb2NhdGlvblR5cGV7XHJcbiAgICBhZGROZXdTY2FsZSxcclxuICAgIGFzc2lnblRvU2NhbGUsXHJcbiAgICBpbnZhbGlkXHJcbn1cclxuXHJcbmNsYXNzIENoYXJ0T2JqZWN0SW5mb3JtYXRpb257XHJcbiAgICBjaGFydE9iamVjdFR5cGU6IENoYXJ0T2JqZWN0VHlwZTtcclxuICAgIGFyZ3MgOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY2hhcnRPYmplY3RUeXBlOiBDaGFydE9iamVjdFR5cGUsIGFyZ3MgOiBhbnkpe1xyXG4gICAgICAgIHRoaXMuY2hhcnRPYmplY3RUeXBlID0gY2hhcnRPYmplY3RUeXBlO1xyXG4gICAgICAgIHRoaXMuYXJncyA9IGFyZ3M7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb24gZXh0ZW5kcyBUeXBlZEV2ZW50IDxDaGFydEJhc2UsIEV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb25BcmdzPiB7fTtcclxuY2xhc3MgRXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbkFyZ3Mge1xyXG4gICAgY2hhcnRJbnRlcmFjdGlvblR5cGU6IE1vdXNlQWN0aW9uVHlwZTtcclxuICAgIGV2ZW50QXJndW1lbnRzIDogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNoYXJ0SW50ZXJhY3Rpb25UeXBlOiBNb3VzZUFjdGlvblR5cGUsIGV2ZW50QXJndW1lbnRzIDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5jaGFydEludGVyYWN0aW9uVHlwZSA9IGNoYXJ0SW50ZXJhY3Rpb25UeXBlO1xyXG4gICAgICAgIHRoaXMuZXZlbnRBcmd1bWVudHMgPSBldmVudEFyZ3VtZW50cztcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgRXZlbnRSZWRyYXdBbGxDaGFydHMgZXh0ZW5kcyBUeXBlZEV2ZW50PENoYXJ0QmFzZSwgRXZlbnRSZWRyYXdBbGxDaGFydHNBcmdzPiB7fTtcclxuY2xhc3MgRXZlbnRSZWRyYXdBbGxDaGFydHNBcmdzIHtcclxuIFxyXG59XHJcblxyXG5hYnN0cmFjdCBjbGFzcyBDaGFydEJhc2UgZXh0ZW5kcyBXaWRnZXRCYXNlIGltcGxlbWVudHMgSVRyYWNlQ2hhcnQge1xyXG5cclxuICAgIHB1YmxpYyBldmVudFVzZXJDaGFydEludGVyYWN0aW9uIDogRXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbjtcclxuICAgIHB1YmxpYyBldmVudFJlZHJhd0FsbENoYXJ0cyA6IEV2ZW50UmVkcmF3QWxsQ2hhcnRzO1xyXG5cclxuICAgIHR5cGU7XHJcbiAgICBjdXJzb3JUeXBlO1xyXG4gICAgd2lkZ2V0TmFtZTogc3RyaW5nID0gXCJcIjtcclxuICAgIHRleHRNZWFzdXJlbWVudENhbnZhc0lkOiBzdHJpbmcgPSBcInRleHRNZWFzdXJlbWVudENhbnZhc1wiXHJcbiAgICBcclxuICAgIGNoYXJ0SW5zdGFuY2UvLyAgOiBlai5kYXRhdmlzdWFsaXphdGlvbi5DaGFydDtcclxuICAgIGNoYXJ0ISA6IElDaGFydDtcclxuXHJcbiAgICBzZXJpZXM6IEFycmF5PENoYXJ0Vmlld1NlcmllPiA9IFtdO1xyXG4gICAgaG92ZXJlZFNlcmllcyA6IENoYXJ0Vmlld1NlcmllW10gPSBbXTtcclxuICAgIHNjYWxlczogQXJyYXk8U2NhbGU+ID0gW107XHJcblxyXG4gICAgcGFyZW50VmlldzogSVZpZXc7XHJcbiAgICBcclxuXHJcbiAgICAvL3ByaXZhdGUga2V5RXZlbnRzUGxhY2VkID0gZmFsc2U7XHJcblxyXG4gICAgLy8gaG9sZHMgdGhlIGN1cnJlbnQgY3Vyc29yIHN0YXRlcyB2YWx1ZXMuIFdlIGluaXRpYWxpemUgdGhlIG1lbWJlciBmb3IgZGVmYXVsdC4gVGhlIGVmZmVjdGl2ZSBpbml0aWFsaXphdGlvbiB0YWtlcyBwbGFjZSB3aGVuIHRoZSBleHRlcm5hbCBzaGFyZWQgaW5zdGFuY2VcclxuICAgIC8vIG9mIHRoZSBjdXJzb3Igc3RhdGVzIGlzIGNyZWF0ZWQgYW5kIHJlZmxlY3RlZCB0aHJvdWdoIHRoZSBjdXJvclN0YXRlcyBzZXR0ZXIhXHJcbiAgICBwcm90ZWN0ZWQgX2N1cnNvclN0YXRlczogQ3Vyc29yU3RhdGVzID0gbmV3IEN1cnNvclN0YXRlcygpO1xyXG5cclxuICAgIGFic3RyYWN0IGN1cnNvckhhbmRsZXI6IEN1cnNvckhhbmRsZXJ8dW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBjdXJzb3JIb3ZlckRpc3RhbmNlOiBudW1iZXIgPSA4O1xyXG4gICAgcHJvdGVjdGVkIGRyYWdnZWRTZXJpZXNJbmRleDogbnVtYmVyID0gMDtcclxuXHJcbiAgICBhYnN0cmFjdCBwcmltYXJ5WEF4aXNOYW1lOiBzdHJpbmc7XHJcbiAgICBhYnN0cmFjdCBwcmltYXJ5WUF4aXNOYW1lOiBzdHJpbmc7XHJcbiAgICBwcm90ZWN0ZWQgYXhpc0JvdW5kczogQXhpc0JvdW5kc1tdID0gW107XHJcblxyXG4gICAgcHVibGljIHhBeGlzV2lkdGggOiBudW1iZXIgPSAwXHJcblxyXG4gXHJcbiAgICB5QXhpc0FsaWdubWVudE9mZnNldDogbnVtYmVyID0gMDtcclxuICAgIGZsYWdnZWRGb3JSZXNpemU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IocGFyZW50VmlldyA6IElWaWV3LCBuYW1lOiBzdHJpbmcsIHNjYWxlOiBTY2FsZSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQudHlwZSA9IFwiQ2hhcnRCYXNlXCI7IC8vIFRPRE86IFJlbW92ZSB3aGVuIGNoYXJ0YmFzZSh4eWNoYXJ0LCBmZnRjaGFydCwgeXRjaGFydCkgd2lsbCBiZSBjcmVhdGVkIHdpdGggdGhlIGNvbXBvbmVudCBmYWN0b3J5XHJcbiAgICAgICAgdGhpcy5wYXJlbnRWaWV3ID0gcGFyZW50VmlldztcclxuICAgICAgICB0aGlzLndpZGdldE5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuc2NhbGVzLnB1c2goc2NhbGUpO1xyXG5cclxuICAgICAgICB0aGlzLmV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb24gPSBuZXcgRXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbigpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWRyYXdBbGxDaGFydHMgPSBuZXcgRXZlbnRSZWRyYXdBbGxDaGFydHMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlc3Ryb3kgb2JqZWN0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpe1xyXG4gICAgICAgIC8vIFRPRE86IERpc3Bvc2Ugb2YgQ3Vyc29yU3RhdGVzIG11c3QgYmUgZG9uZSBnbG9iYWx5XHJcbiAgICAgICAgdGhpcy5fY3Vyc29yU3RhdGVzLmRpc3Bvc2UoKTtcclxuICAgICAgICBsZXQgY2hhcnRPYmogPSAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKS5kYXRhKFwiZWpDaGFydFwiKTtcclxuICAgICAgICBpZihjaGFydE9iaiAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBjaGFydE9iai5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IGRpc3Bvc2Ugb2YgdGhpcyB3aWRnZXQgaXMgY2FsbGVkIGZyb20gc3BsaXR0ZXIgYW5kIGFsc28gZnJvbSB0aGUgY2hhcnRWaWV3Q2hhcnRNYW5hZ2VyXHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkRpc3Bvc2Ugb2YgY2hhcnRPYmooPT0gdW5kZWZpbmVkKSBub3QgcG9zc2libGUhXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29udGFpbmVySWRcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGluaXRpYWxpemUoY29udGFpbmVySWQ6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemUoY29udGFpbmVySWQpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgbGV0IG5ld0NoYXJ0ID0gbmV3IFNGQ2hhcnRXcmFwcGVyKHRoaXMuY3NzUGFyZW50Q29udGVudElkLCB0aGlzLnNjYWxlc1swXSwgdGhpcy5wcmltYXJ5WEF4aXNOYW1lKTtcclxuICAgICAgICBuZXdDaGFydC5ldmVudEF4aXNSYW5nZUNoYW5nZWQuYXR0YWNoKChzZW5kZXIsIGFyZ3MpID0+IHRoaXMub25BeGlzUmFuZ2VDaGFuZ2VkKHNlbmRlciwgYXJncykpO1xyXG4gICAgICAgIG5ld0NoYXJ0LmV2ZW50TW91c2VBY3Rpb24uYXR0YWNoKChzZW5kZXIsYXJncykgPT4gdGhpcy5vbk1vdXNlQWN0aW9uKHNlbmRlciwgYXJncykpO1xyXG4gICAgICAgIG5ld0NoYXJ0LmV2ZW50TW91c2VXaGVlbC5hdHRhY2goKHNlbmRlcixhcmdzKSA9PiB0aGlzLm9uQ2hhcnRNb3VzZVdoZWVsKHNlbmRlciwgYXJncykpO1xyXG5cclxuICAgICAgICB0aGlzLmNoYXJ0SW5zdGFuY2UgPSBuZXdDaGFydC5fU0ZDaGFydDtcclxuICAgICAgICB0aGlzLmNoYXJ0ID0gbmV3Q2hhcnQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5zZXRCb3hab29tKGZhbHNlKTtcclxuXHJcbiAgICAgICAgLy9XRSB3YW50IHRvIGtlZXAgdGhpcyBmb3IgY3Vyc29yIG1vdmVtZW50IGxhdGVyIG9uXHJcbiAgICAgICAgLy8gdGhpcy5hZGRLZXlSZWxhdGVkRXZlbnRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZUNvbXBvbmVudCgpe1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmRlZmF1bHRTZXR0aW5nc0RhdGFJZCA9IERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5XaWRnZXREZWZpbml0aW9uSWQ7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZGlzYWJsZVBlcnNpc3RpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgY29tcG9uZW50IHNldHRpbmdzIGZvciB0aGlzIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBnZXREZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MoKTogQ29tcG9uZW50U2V0dGluZ3N7XHJcbiAgICAgICAgcmV0dXJuIERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5nZXRDaGFydEJhc2VEZWZpbml0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBjdXJzb3JzIHN0YXRlc1xyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEB0eXBlIHtUQ3Vyc29yU3RhdGVzfVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0IGN1cnNvcnNTdGF0ZXMoKSA6IEN1cnNvclN0YXRlcyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnNvclN0YXRlcztcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgY3Vyc29ycyBzdGF0ZXMuIFRoZSBtZXRob2QgaXMgY2FsbGVkIGF1dG9tYXRpY2FsbHkgd2hlbmV2ZXIgYSBjdXJzb3Igc3RhdGUgaGFzIGJlZW4gY2hhbmdlZCBleHRlcm5hbGx5LiBcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBzZXQgY3Vyc29yc1N0YXRlcyhjdXJzb3JTdGF0ZXMgOiBDdXJzb3JTdGF0ZXMpIHtcclxuICAgICAgICBcclxuICAgICAgICAvLyB1cGRhdGUgdGhlIGJhY2t1cCBmaWVsZFxyXG4gICAgICAgIHRoaXMuX2N1cnNvclN0YXRlcyA9IGN1cnNvclN0YXRlcztcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVVSUN1cnNvcnMoY3Vyc29yU3RhdGVzKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGN1cnNvciBzdGF0ZXMuXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHBhcmFtIHtDdXJzb3JTdGF0ZXN9IGN1cnNvclN0YXRlc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgdXBkYXRlQ3Vyc29yU3RhdGVzKGN1cnNvclN0YXRlczpDdXJzb3JTdGF0ZXMpe1xyXG4gICAgICAgIC8vIEJJTkRJTkdTT1VSQ0U6IGRpc3BhdGNoZXMgdGhlIG1ldGhvZCBjYWxsIHRvIGJvdW5kIHRhcmdldHNcclxuICAgIH1cclxuICBcclxuXHJcbiAgICBwcml2YXRlIG9uQXhpc1JhbmdlQ2hhbmdlZChzZW5kZXI6IElDaGFydEF4aXMsIGFyZ3MgOiBFdmVudEF4aXNSYW5nZUNoYW5nZWRBcmdzKXtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgYXJncy5heGlzSURzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IHNjYWxlOiBTY2FsZXx1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIC8vV29ya2Fyb3VuZCB1bnRpbCBYLUF4aXMgaGFuZGxpbmcgaXMgaW1wbGVtZW50ZWQgY29ycmVjdFxyXG4gICAgICAgICAgICBpZihhcmdzLmF4aXNJRHNbaV0gIT0gdGhpcy5wcmltYXJ5WEF4aXNOYW1lKXtcclxuICAgICAgICAgICAgICAgIHNjYWxlPSB0aGlzLmdldFNjYWxlQnlTY2FsZUlkKGFyZ3MuYXhpc0lEc1tpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHNjYWxlID0gdGhpcy5zY2FsZXNbMF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoc2NhbGUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGxldCBheGlzOiBJQ2hhcnRBeGlzID0gc2VuZGVyO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJhbmdlID0gYXhpcy5nZXRBeGlzUmFuZ2UoKTtcclxuICAgICAgICAgICAgICAgIGlmKGF4aXMuZ2V0QXhpc09yaWVudGF0aW9uKCkgPT0gQXhpc09yaWVudGF0aW9uLmhvcml6b250YWwpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U2NhbGVSYW5nZShzY2FsZSwgcmFuZ2UubWluLCByYW5nZS5tYXgsIHNjYWxlLm1pbllWYWx1ZSwgc2NhbGUubWF4WVZhbHVlLCBcIlwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYXJncy5zeW5jQXhpcyA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudFJlZHJhd0FsbENoYXJ0cy5yYWlzZSh0aGlzLCBuZXcgRXZlbnRSZWRyYXdBbGxDaGFydHNBcmdzKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTY2FsZVJhbmdlKHNjYWxlLCBzY2FsZS5taW5YVmFsdWUsIHNjYWxlLm1heFhWYWx1ZSwgcmFuZ2UubWluLCByYW5nZS5tYXgsIFwiXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoYXJncy5mb3JjZVJlZHJhdyA9PSB0cnVlKXtcclxuICAgICAgICAgICAgdGhpcy5yZWRyYXdDaGFydCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1vdXNlWFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1vdXNlWVxyXG4gICAgICogQHJldHVybnMge0NoYXJ0T2JqZWN0SW5mb3JtYXRpb259XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRDaGFydE9iamVjdFVuZGVyTW91c2UobW91c2VYOiBudW1iZXIsIG1vdXNlWTogbnVtYmVyKSA6IENoYXJ0T2JqZWN0SW5mb3JtYXRpb257XHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVDaGFydERpbWVuc2lvbnMoKTtcclxuICAgICAgICBpZih0aGlzLm1vdXNlSXNJbkNoYXJ0Qm91bmRzKG1vdXNlWCwgbW91c2VZKSl7XHJcblxyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmN1cnNvcnNTdGF0ZXMuZ2V0SG92ZXJlZEN1cnNvckluZGV4KCk7XHJcbiAgICAgICAgICAgIGlmKGluZGV4ICE9PSAtMSl7XHJcbiAgICAgICAgICAgICAgICAvL1RPRE86IG1pZ2h0IGJlIGJldHRlciB0byB1c2UgY3Vyc29yIGluc3RhbmNlIGluc3RlYWQgb2YgaW5kZXhcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ2hhcnRPYmplY3RJbmZvcm1hdGlvbihDaGFydE9iamVjdFR5cGUuY3Vyc29yLCB7Y3Vyc29ySW5kZXg6IGluZGV4fSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBDaGFydE9iamVjdEluZm9ybWF0aW9uKENoYXJ0T2JqZWN0VHlwZS5jaGFydFNwYWNlLCB7fSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuYXhpc0JvdW5kcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKChtb3VzZVggLSB0aGlzLmF4aXNCb3VuZHNbaV0ueCkgPCAodGhpcy5heGlzQm91bmRzW2ldLndpZHRoKSAmJiBtb3VzZVggPiB0aGlzLmF4aXNCb3VuZHNbaV0ueCl7XHJcbiAgICAgICAgICAgICAgICBpZigobW91c2VZIC0gdGhpcy5heGlzQm91bmRzW2ldLnkpIDwgKHRoaXMuYXhpc0JvdW5kc1tpXS5oZWlnaHQpICYmIG1vdXNlWSA+IHRoaXMuYXhpc0JvdW5kc1tpXS55KXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYXhpcyA9IHRoaXMuY2hhcnQuZ2V0QXhpcyh0aGlzLmF4aXNCb3VuZHNbaV0uYXhpcy5uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENoYXJ0T2JqZWN0SW5mb3JtYXRpb24oQ2hhcnRPYmplY3RUeXBlLmF4aXMsIHtheGlzOiBheGlzfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgQ2hhcnRPYmplY3RJbmZvcm1hdGlvbihDaGFydE9iamVjdFR5cGUuZW1wdHlTcGFjZSwge30pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY2FsY3VsYXRlQ2hhcnREaW1lbnNpb25zKCl7XHJcbiAgICAgICAgdGhpcy5heGlzQm91bmRzID0gW107XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuc2NhbGVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGF4aXMgPSB0aGlzLmNoYXJ0LmdldEF4aXModGhpcy5zY2FsZXNbaV0uaWQpO1xyXG4gICAgICAgICAgICBpZihheGlzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF4aXNCb3VuZHMucHVzaChheGlzLmdldEF4aXNCb3VuZHMoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGF4aXMgPSB0aGlzLmNoYXJ0LmdldEF4aXModGhpcy5wcmltYXJ5WEF4aXNOYW1lKTtcclxuICAgICAgICBpZihheGlzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuYXhpc0JvdW5kcy5wdXNoKGF4aXMuZ2V0QXhpc0JvdW5kcygpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIG9uTW91c2VBY3Rpb24oc2VuZGVyLCBhcmdzOiBFdmVudE1vdXNlQXJncyl7XHJcbiAgICAgICAgc3dpdGNoIChhcmdzLm1vdXNlQWN0aW9uVHlwZSl7XHJcbiAgICAgICAgICAgIGNhc2UgIE1vdXNlQWN0aW9uVHlwZS5tb3VzZURvd24gOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2hhcnRNb3VzZURvd24oc2VuZGVyLCBhcmdzKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgIE1vdXNlQWN0aW9uVHlwZS5tb3VzZVVwIDoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkNoYXJ0TW91c2VVcChzZW5kZXIsIGFyZ3MpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIGNhc2UgIE1vdXNlQWN0aW9uVHlwZS5tb3VzZU1vdmUgOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2hhcnRNb3VzZU1vdmUoc2VuZGVyLCBhcmdzKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uQ2hhcnRNb3VzZURvd24oc2VuZGVyLCBhcmdzIDogRXZlbnRNb3VzZUFyZ3Mpe1xyXG4gICAgICAgIGFyZ3Mub2JqZWN0VW5kZXJNb3VzZSA9IHRoaXMuZ2V0Q2hhcnRPYmplY3RVbmRlck1vdXNlKGFyZ3MubW91c2VQb2ludC54LCBhcmdzLm1vdXNlUG9pbnQueSk7XHJcbiAgICAgICAgbGV0IGV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb25BcmdzOiBFdmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncztcclxuICAgICAgICBldmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncyA9IG5ldyBFdmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncyhNb3VzZUFjdGlvblR5cGUubW91c2VEb3duLCBhcmdzKTtcclxuICAgICAgICB0aGlzLmV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb24ucmFpc2UodGhpcywgZXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbkFyZ3MpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbkNoYXJ0TW91c2VVcChzZW5kZXIsIGFyZ3M6IEV2ZW50TW91c2VBcmdzKXtcclxuICAgICAgICBhcmdzLm9iamVjdFVuZGVyTW91c2UgPSB0aGlzLmdldENoYXJ0T2JqZWN0VW5kZXJNb3VzZShhcmdzLm1vdXNlUG9pbnQueCwgYXJncy5tb3VzZVBvaW50LnkpO1xyXG4gICAgICAgIGxldCBldmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJnczogRXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbkFyZ3M7XHJcbiAgICAgICAgZXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbkFyZ3MgPSBuZXcgRXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbkFyZ3MoTW91c2VBY3Rpb25UeXBlLm1vdXNlVXAsIGFyZ3MpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbi5yYWlzZSh0aGlzLCBldmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncyk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uQ2hhcnRNb3VzZU1vdmUoc2VuZGVyLCBhcmdzOiBFdmVudE1vdXNlQXJncyl7XHJcbiAgICAgICAgbGV0IGNoYXJ0T2JqZWN0VW5kZXJNb3VzZSA6IENoYXJ0T2JqZWN0SW5mb3JtYXRpb24gPSB0aGlzLmdldENoYXJ0T2JqZWN0VW5kZXJNb3VzZShhcmdzLm1vdXNlUG9pbnQueCwgYXJncy5tb3VzZVBvaW50LnkpO1xyXG4gICAgICAgIGFyZ3Mub2JqZWN0VW5kZXJNb3VzZSA9IGNoYXJ0T2JqZWN0VW5kZXJNb3VzZTtcclxuICAgICAgICBsZXQgZXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbkFyZ3M6IEV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb25BcmdzO1xyXG4gICAgICAgIGV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb25BcmdzID0gbmV3IEV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb25BcmdzKE1vdXNlQWN0aW9uVHlwZS5tb3VzZU1vdmUsIGFyZ3MpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbi5yYWlzZSh0aGlzLCBldmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncylcclxuICAgICAgICBcclxuICAgIH07XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgbWV0aG9kIGlzIGNhbGxlZCBieSB0aGUgSW50ZXJhY3Rpb25TdHJhdGV0Z2llcyB3aGVuIGEgY2xpY2sgaW4gdGhlXHJcbiAgICAgKiBjaGFydCBoYXMgYmVlbiBtYWRlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldEN1cnNvck9uUG9pbnRlclBvc2l0aW9uKG1vdXNlUG9pbnQgOiBJUG9pbnQpe1xyXG4gICAgICAgIHRoaXMuc2V0Q3Vyc29yKG1vdXNlUG9pbnQueCwgbW91c2VQb2ludC55KTtcclxuICAgICAgICB0aGlzLmNoZWNrQ3Vyc29yc0hvdmVyaW5nKG1vdXNlUG9pbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW50ZXJuYWwgbWV0aG9kIGZvciBhY3R1YWxseSBtb3ZpbmcgdGhlIGN1cnNvcnMuIE92ZXJ3cml0dGVuIGluIEZGVENoYXJ0LnRzXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5XHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgc2V0Q3Vyc29yKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnNlcmllcy5sZW5ndGgpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmN1cnNvcnNTdGF0ZXMuc2V0TGFzdEN1cnNvclR5cGVTZWxlY3RlZChDdXJzb3JUeXBlLnRpbWVEb21haW4pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBob3ZlcmVkQ3Vyc29ySW5kZXggPSAgdGhpcy5jdXJzb3JzU3RhdGVzLmdldEhvdmVyZWRDdXJzb3JJbmRleCgpO1xyXG4gICAgICAgIGlmIChob3ZlcmVkQ3Vyc29ySW5kZXggIT0gLTEpIHsgLy8gU2V0IHNlbGVjdGVkIGN1cnNvciB3aGVuIGhvdmVyZWQgY3Vyc29yIHdhcyBmb3VuZFxyXG4gICAgICAgICAgICB0aGlzLmN1cnNvcnNTdGF0ZXMuc2V0U2VsZWN0ZWQoaG92ZXJlZEN1cnNvckluZGV4LCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3Vyc29yc1N0YXRlcy5zZXRTZWxlY3RlZCggdGhpcy5jdXJzb3JzU3RhdGVzLmdldFNlbGVjdGVkQ3Vyc29ySW5kZXgoKSwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZVNlbGVjdGVkQ3Vyc29yKHRoaXMuY3Vyc29yc1N0YXRlcywgeCwgeSk7XHJcbiAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFBhc3MgdGhlIHggYW5kIHkgcG9zaXRpb24gb24gdGhlIHByb3BlcnR5IGFuZCB0aGlzIG1ldGhvZCB3aWxsIGZpZ3VyZSBvdXQgd2hlcmUgdG9cclxuICAgICAqIHBsYWNlIHRoZSBjdXJzb3JzIGFuZCB1cGRhdGUgdGhlIHN0YXRlcyBhY2NvcmRpbmdseVxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBwYXJhbSB7Q3Vyc29yU3RhdGVzfSBjdXJzb3JzU3RhdGVzXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHlcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHVwZGF0ZVNlbGVjdGVkQ3Vyc29yKGN1cnNvcnNTdGF0ZXM6IEN1cnNvclN0YXRlcywgeDogbnVtYmVyLCB5OiBudW1iZXIpe1xyXG4gICAgICAgIGxldCBwb2ludCA9IHRoaXMuZ2V0Q2hhcnRDb29yZGluYXRlRnJvbVBpeGVsKHRoaXMucHJpbWFyeVhBeGlzTmFtZSwgdGhpcy5zY2FsZXNbMF0uaWQsIHgsIHkpO1xyXG4gICAgICAgIGxldCBuZWFyZXN0VGltZXN0YW1wRnJvbUFsbFNlcmllcyA9IHRoaXMuZ2V0VGltZXN0YW1wSW5TZXJpZXMocG9pbnQsIHRoaXMuc2VyaWVzKTtcclxuXHJcbiAgICAgICAgY3Vyc29yc1N0YXRlcy5zZXRBY3RpdmUoY3Vyc29yc1N0YXRlcy5nZXRTZWxlY3RlZEN1cnNvckluZGV4KCksIHRydWUpO1xyXG4gICAgICAgIGN1cnNvcnNTdGF0ZXMuc2V0UG9zaXRpb24oY3Vyc29yc1N0YXRlcy5nZXRTZWxlY3RlZEN1cnNvckluZGV4KCksIG5lYXJlc3RUaW1lc3RhbXBGcm9tQWxsU2VyaWVzKTtcclxuICAgICAgICBjdXJzb3JzU3RhdGVzLnNldEhvdmVyZWQoY3Vyc29yc1N0YXRlcy5nZXRTZWxlY3RlZEN1cnNvckluZGV4KCksIHRoaXMuZ2V0U2VyaWVDdXJzb3JUeXBlKCksIGZhbHNlKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ1cGRhdGVTZWxjdGVkQ3Vyc29yIFwiICsgbmVhcmVzdFRpbWVzdGFtcEZyb21BbGxTZXJpZXMpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlQ3Vyc29yU3RhdGVzKGN1cnNvcnNTdGF0ZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW50ZXJuYWwgbWV0aG9kIGZvciBhY3R1YWxseSBtb3ZpbmcgdGhlIGN1cnNvcnMuIFBhc3MgdGhlIHggYW5kIHlcclxuICAgICAqIHBvc2l0aW9uIG9uIHRoZSBwcm9wZXJ0eSBhbmQgdGhpcyBtZXRob2Qgd2lsbCBmaWd1cmUgb3V0IHdoZXJlIHRvXHJcbiAgICAgKiBwbGFjZSB0aGUgY3Vyc29ycyBhbmQgdXBkYXRlIHRoZSBzdGF0ZXMgYWNjb3JkaW5nbHlcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5XHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZHJhZ0N1cnNvckFsb25nTGluZSAoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcclxuICAgICAgICBpZiAoIXRoaXMuc2VyaWVzLmxlbmd0aCl7XHJcbiAgICAgICAgICAgIHJldHVybjsgXHJcbiAgICAgICAgfSBcclxuXHJcbiAgICAgICAgaWYodGhpcy5ob3ZlcmVkU2VyaWVzLmxlbmd0aCAhPSAwKXtcclxuICAgICAgICAgICAgbGV0IHBvaW50ID0gdGhpcy5nZXRDaGFydENvb3JkaW5hdGVGcm9tUGl4ZWwodGhpcy5wcmltYXJ5WEF4aXNOYW1lLCB0aGlzLnNjYWxlc1swXS5pZCwgeCwgeSk7XHJcbiAgICAgICAgICAgIGxldCBuZWFyZXN0VGltZXN0YW1wRnJvbVNpbmdsZVNlcmllcyA9IHRoaXMuZ2V0VGltZXN0YW1wSW5TZXJpZXMocG9pbnQsIHRoaXMuaG92ZXJlZFNlcmllcyk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmN1cnNvcnNTdGF0ZXMuc2V0UG9zaXRpb24odGhpcy5jdXJzb3JzU3RhdGVzLmdldFNlbGVjdGVkQ3Vyc29ySW5kZXgoKSwgbmVhcmVzdFRpbWVzdGFtcEZyb21TaW5nbGVTZXJpZXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVDdXJzb3JTdGF0ZXModGhpcy5jdXJzb3JzU3RhdGVzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgbWV0aG9kIGlzIGNhbGxlZCBieSB0aGUgdXNlckludGVyYWN0aW9uIHN0cmFnZXRneSB3aGVuZXZlclxyXG4gICAgICogdGhlIG1vdXNlIGlzIG1vdmVkIGFjcm9zcyBhIGNoYXJ0LiBJZiB0aGUgbW91c2UgaXMgYWJvdmUgYSBjdXJzb3JcclxuICAgICAqIHRoaXMgY3Vyc29yIHVwZGF0ZXMgaXQncyBvd24gc3RhdGUgdG8gSE9WRVJJTkcgYW5kIG9uY2UgaXQgaXMgbm9cclxuICAgICAqIGxvbmdlciBiZWxvdyB0aGUgbW91c2UgaXQgd2lsbCByZXNldCB0byBpdCdzIHByZXZpb3VzIHN0YXRlIGlmIHRoZVxyXG4gICAgICogY3Vyc29yIHdhcyBzZWxlY3RlZCBvciBpdCB3aWxsIGJlIHNldCB0byBERVNFTENURUQgaWYgaXQgd2Fzbid0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNoZWNrQ3Vyc29yc0hvdmVyaW5nKG1vdXNlUG9pbnQ6IElQb2ludCl7XHJcbiAgICAgICAgaWYodGhpcy5jdXJzb3JIYW5kbGVyICE9IHVuZGVmaW5lZCl7XHJcblxyXG4gICAgICAgICAgICBsZXQgY2hhcnRBcmVhID0gdGhpcy5jaGFydC5nZXRDaGFydEFyZWEoKTtcclxuICAgICAgICAgICAgbGV0IGFjdHVhbE1vdXNlUG9pbnQgPSBuZXcgUG9pbnQobW91c2VQb2ludC54IC0gY2hhcnRBcmVhLngsIG1vdXNlUG9pbnQueSAtIGNoYXJ0QXJlYS55KTtcclxuICAgICAgICAgICAgbGV0IHNlbGVjdGVkQ3Vyc29ySW5kZXggPSB0aGlzLl9jdXJzb3JTdGF0ZXMuZ2V0U2VsZWN0ZWRDdXJzb3JJbmRleCgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGNsb3Nlc3RDdXJzb3JQb3NpdGlvbiA6IEN1cnNvclBvc2l0aW9uSW5mbyA9IHRoaXMuY3Vyc29ySGFuZGxlci5nZXRDbG9zZXN0Q3Vyc29yUG9zaXRpb25Ub1BvaW50KGFjdHVhbE1vdXNlUG9pbnQsIHNlbGVjdGVkQ3Vyc29ySW5kZXgpXHJcbiAgICAgICAgICAgIGlmKGNsb3Nlc3RDdXJzb3JQb3NpdGlvbiAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpc3RhbmNlVG9DdXJzb3IgPSBjbG9zZXN0Q3Vyc29yUG9zaXRpb24uYWRkaXRpb25hbEluZm9ybWF0aW9uW1wiZGlzdGFuY2VcIl07XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuaG92ZXJlZFNlcmllcyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBjbG9zZXN0Q3Vyc29ySW5kZXg7XHJcbiAgICAgICAgICAgICAgICBpZihkaXN0YW5jZVRvQ3Vyc29yIDwgdGhpcy5jdXJzb3JIb3ZlckRpc3RhbmNlKXtcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZXN0Q3Vyc29yUG9zaXRpb24uYWRkaXRpb25hbEluZm9ybWF0aW9uW1wiaGlnaGxpZ2h0XCJdID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZXN0Q3Vyc29ySW5kZXggPSBjbG9zZXN0Q3Vyc29yUG9zaXRpb24uYWRkaXRpb25hbEluZm9ybWF0aW9uW1wiY3Vyc29ySW5kZXhcIl07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ob3ZlcmVkU2VyaWVzID0gY2xvc2VzdEN1cnNvclBvc2l0aW9uLmFkZGl0aW9uYWxJbmZvcm1hdGlvbltcInNlcmllc1wiXTsgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgb2xkQ3Vyc29yU3RhdGVzID0gdGhpcy5jdXJzb3JzU3RhdGVzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJzb3JzU3RhdGVzID0gdGhpcy51cGRhdGVIb3ZlcmluZ1N0YXRlc0luQ3Vyc29ycyh0aGlzLmN1cnNvcnNTdGF0ZXMsIGNsb3Nlc3RDdXJzb3JJbmRleCk7ICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICBpZihvbGRDdXJzb3JTdGF0ZXMuZ2V0SG92ZXJlZEN1cnNvckluZGV4KCkgIT0gdGhpcy5jdXJzb3JzU3RhdGVzLmdldEhvdmVyZWRDdXJzb3JJbmRleCgpKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUN1cnNvclN0YXRlcyh0aGlzLmN1cnNvcnNTdGF0ZXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0U2VyaWVDdXJzb3JUeXBlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNlcmllcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlcmllc1swXS5zZXJpZS5jdXJzb3JUeXBlO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWRcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbnRlcm5hbCBtZXRob2QgdG8gY2FsY3VsYXRlIHRoZSBzdGF0ZSB3aGljaCBpcyB0byBiZSB1cGRhdGVkIGluIHRoZVxyXG4gICAgICogc3RhdGVzIHRvIGJlIEhPVkVSSU5HLiBUaGlzIG1ldGhvZCB3aWxsIGFsc28gcmVzZXQgdGhlIGNvcnJlY3Qgc3RhdGVzXHJcbiAgICAgKiB0byBpdCdzIHByZXZpb3VzIHZhbHVlcyBpZiBub24gb2YgdGhlIGN1cnNvcnMgYXJlIGhvdmVyaW5nLiBUaGlzIG1ldGhvZHNcclxuICAgICAqIHNob3VsZCBiZSBhYmxlIHRvIG1vdmUgaW50byB0aGUgQ3Vyc29yU3RhdGVzIGNsYXNzIG9uZSBkYXkgaG9wZWZ1bGx5LlxyXG4gICAgICogSGVuY2UgZXh0cmFjdGVkIGluIGl0J3Mgb3duIG1ldGhvZC5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtDdXJzb3JTdGF0ZXN9IGN1cnNvclN0YXRlc1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGNsb3Nlc3RJbmRleFxyXG4gICAgICogQHJldHVybnMge0N1cnNvclN0YXRlc31cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVIb3ZlcmluZ1N0YXRlc0luQ3Vyc29ycyAoY3Vyc29yU3RhdGVzOiBDdXJzb3JTdGF0ZXMsIGNsb3Nlc3RJbmRleDogbnVtYmVyfHVuZGVmaW5lZCkgOiBDdXJzb3JTdGF0ZXMge1xyXG4gICAgICAgIGlmIChjbG9zZXN0SW5kZXggIT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIEluZGV4IG9mIGN1cnNvciBmb3VuZCA9PiBzZXQgaG92ZXJlZCBmbGFnXHJcbiAgICAgICAgICAgIGN1cnNvclN0YXRlcy5zZXRIb3ZlcmVkKGNsb3Nlc3RJbmRleCwgdGhpcy5nZXRTZXJpZUN1cnNvclR5cGUoKSwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIC8vIE5vIGluZGV4IG9mIGN1cnNvciBmb3VuZCA9PiByZXNldCBhbGwgaG92ZXJlZCBmbGFncyBvZiBhbGwgY3Vyc29yc1xyXG4gICAgICAgICAgICBjdXJzb3JTdGF0ZXMuc2V0SG92ZXJlZCgtMSwgdGhpcy5nZXRTZXJpZUN1cnNvclR5cGUoKSwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY3Vyc29yU3RhdGVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsY3VsYXRlIHpvb20gb24gbW91c2V3aGVlbCBhY3Rpb25cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIG9uQ2hhcnRNb3VzZVdoZWVsKHNlbmRlciwgYXJncyA6IEV2ZW50TW91c2VXaGVlbEFyZ3Mpe1xyXG4gICAgICAgIGFyZ3Mub2JqZWN0VW5kZXJNb3VzZSA9IHRoaXMuZ2V0Q2hhcnRPYmplY3RVbmRlck1vdXNlKGFyZ3MubW91c2VQb2ludC54LCBhcmdzLm1vdXNlUG9pbnQueSk7XHJcbiAgICAgICAgbGV0IGV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb25BcmdzOiBFdmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncztcclxuICAgICAgICBldmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncyA9IG5ldyBFdmVudFVzZXJDaGFydEludGVyYWN0aW9uQXJncyhNb3VzZUFjdGlvblR5cGUubW91c2VXaGVlbCwgYXJncyk7XHJcbiAgICAgICAgdGhpcy5ldmVudFVzZXJDaGFydEludGVyYWN0aW9uLnJhaXNlKHRoaXMsIGV2ZW50VXNlckNoYXJ0SW50ZXJhY3Rpb25BcmdzKTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IGlmIG1vdXNlIGlzIGluc2lkZSBjaGFydCBib3VuZHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBtb3VzZVhcclxuICAgICAqIEBwYXJhbSB7Kn0gbW91c2VZXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBtb3VzZUlzSW5DaGFydEJvdW5kcyhtb3VzZVgsIG1vdXNlWSkgOiBib29sZWFue1xyXG4gICAgICAgIGxldCBpc0luQm91bmRzID0gdHJ1ZTtcclxuICAgICAgICBsZXQgY2hhcnRBcmVhID0gdGhpcy5jaGFydC5nZXRDaGFydEFyZWEoKTtcclxuICAgICAgICBpZihtb3VzZVggPCBjaGFydEFyZWEueCB8fCBtb3VzZVggPiAoY2hhcnRBcmVhLnggKyBjaGFydEFyZWEud2lkdGgpICApe1xyXG4gICAgICAgICAgICBpc0luQm91bmRzID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKG1vdXNlWSA8IGNoYXJ0QXJlYS55IHx8IG1vdXNlWSA+IChjaGFydEFyZWEueSArIGNoYXJ0QXJlYS5oZWlnaHQpICApe1xyXG4gICAgICAgICAgICBpc0luQm91bmRzID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpc0luQm91bmRzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVzaXplIGNoYXJ0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSB3aWR0aFxyXG4gICAgICogQHBhcmFtIHsqfSBoZWlnaHRcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlc2l6ZSh3aWR0aCwgaGVpZ2h0KXtcclxuICAgICAgICB0aGlzLnJlc2l6ZUNoYXJ0KGhlaWdodCwgd2lkdGgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVzaXplIENoYXJ0IG9ubHkgaWYgbmVlZGVkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gd2lkdGhcclxuICAgICAqIEBwYXJhbSB7Kn0gaGVpZ2h0XHJcbiAgICAgKiBAcGFyYW0geyp9IHdpZHRoXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVzaXplQ2hhcnQoaGVpZ2h0LCB3aWR0aCkge1xyXG4gICAgICAgIGlmKHRoaXMuZmxhZ2dlZEZvclJlc2l6ZSB8fCB0aGlzLl9hY3R1YWxIZWlnaHQgIT0gaGVpZ2h0IHx8IHRoaXMuX2FjdHVhbFdpZHRoICE9IHdpZHRoKXtcclxuICAgICAgICAgICAgdGhpcy5fYWN0dWFsSGVpZ2h0ID0gaGVpZ2h0LCB0aGlzLl9hY3R1YWxXaWR0aCA9IHdpZHRoO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHdpZHRoID0gd2lkdGggLSB0aGlzLnlBeGlzQWxpZ25tZW50T2Zmc2V0O1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJ0LnJlc2l6ZShoZWlnaHQsIHdpZHRoKTtcclxuICAgICAgICAgICAgdGhpcy5yZWRyYXdDaGFydCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlZHJhd3MgY2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWRyYXdDaGFydCgpIHtcclxuICAgICAgICB0aGlzLmNoYXJ0LnJlZHJhdygpO1xyXG4gICAgICAgIGlmKHRoaXMuY3Vyc29ySGFuZGxlciAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmN1cnNvckhhbmRsZXIudXBkYXRlQ2hhcnRBcmVhKHRoaXMuY2hhcnQuZ2V0Q2hhcnRBcmVhKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlcG9zaXRpb25DdXJzb3JzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgZ2l2ZW4gc2VyaWUgaW50byBhIGNoYXJ0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxCYXNlU2VyaWVzPn0gc2VyaWVzXHJcbiAgICAgKiBAcGFyYW0ge1NjYWxlfSBzY2FsZVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkU2VyaWVzVG9DaGFydChzZXJpZXM6IEFycmF5PEJhc2VTZXJpZXM+LCB5U2NhbGU6IFNjYWxlKXtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNlcmllcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmIChzZXJpZXNbaV0ucmF3UG9pbnRzVmFsaWQgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNoYXJ0U2VyaWVzID0gbmV3IENoYXJ0Vmlld1NlcmllKHNlcmllc1tpXSwgeVNjYWxlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VyaWVzLnB1c2goY2hhcnRTZXJpZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlIGEgZ2l2ZW4gc2VyaWUgZnJvbSB0ZWggY2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNlcmllXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCByZW1vdmVTZXJpZUZyb21DaGFydChzZXJpZTogQmFzZVNlcmllc3xDaGFydFZpZXdTZXJpZSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHNlcmllXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgc2VyaWVJbkNoYXJ0KHNlcmllKSB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuc2VyaWVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VyaWVzW2ldLmlkID09IHNlcmllLmlkKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRab29tQXhlcyh6b29tQXhlczogWm9vbURpcmVjdGlvbil7XHJcbiAgICAgICAgdGhpcy5jaGFydC5zZXRab29tRGlyZWN0aW9uKHpvb21BeGVzKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRQYW5uaW5nKGVuYWJsZTogYm9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5jaGFydC5lbmFibGVQYW5uaW5nKGVuYWJsZSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFBhbm5pbmcgb3BlcmF0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBwYWdlWFxyXG4gICAgICogQHBhcmFtIHsqfSBwYWdlWVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZG9QYW5uaW5nKHBhZ2VYLCBwYWdlWSl7XHJcbiAgICAgICAgdGhpcy5jaGFydC5kb1Bhbm5pbmcocGFnZVgsIHBhZ2VZKTtcclxuICAgICAgICAvL3RoaXMuY2hhcnRNYW5hZ2VyLnJlZHJhd0NoYXJ0cygpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWRyYXdBbGxDaGFydHMucmFpc2UodGhpcywgbmV3IEV2ZW50UmVkcmF3QWxsQ2hhcnRzQXJncygpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXRQYW5uaW5nQ29vcmRzKCl7XHJcbiAgICAgICAgLy9UT0RPOiB0aGlzIGlzIGEgb25seSB3b3JrYXJvdW5kLCBuZWVkcyB0byBiZSBmaXhlZCBcclxuICAgICAgICAodGhpcy5jaGFydCBhcyBTRkNoYXJ0V3JhcHBlcikucHJldlBhbm5pbmdDb29yZHMgPSB7J3gnOiB1bmRlZmluZWQsICd5JzogdW5kZWZpbmVkfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEVuYWJsZXMgYm94IHpvb21pbmdcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGVuYWJsZVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0Qm94Wm9vbShlbmFibGU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLmNoYXJ0LmVuYWJsZUJveFpvb20oZW5hYmxlKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICAvKnByaXZhdGUgYWRkS2V5UmVsYXRlZEV2ZW50cyAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmtleUV2ZW50c1BsYWNlZCkge1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVDdXJzb3JXaXRoS2V5ID0gdGhpcy5tb3ZlQ3Vyc29yV2l0aEtleS5iaW5kKHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUtleVJlbGF0ZWRFdmVudHMgPSB0aGlzLnJlbW92ZUtleVJlbGF0ZWRFdmVudHMuYmluZCh0aGlzKVxyXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5tb3ZlQ3Vyc29yV2l0aEtleSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5yZW1vdmVLZXlSZWxhdGVkRXZlbnRzLCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5jaGFydEluc3RhbmNlLmNoYXJ0Q29udGFpbmVyLm9mZignY2xpY2snKTtcclxuICAgICAgICAgICAgdGhpcy5rZXlFdmVudHNQbGFjZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH07Ki9cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gZVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICAvKnByaXZhdGUgcmVtb3ZlS2V5UmVsYXRlZEV2ZW50cyAoZSkge1xyXG4gICAgICAgIGxldCB0YXJnZXRJZCA9IChlLnRhcmdldC5pZCA9PT0gJycpID8gZS50YXJnZXQucGFyZW50RWxlbWVudC5pZCA6IGUudGFyZ2V0LmlkO1xyXG5cclxuICAgICAgICBpZiAodGFyZ2V0SWQgIT0gdGhpcy5wYXJlbnRDb250ZW50SWQgJiYgXHJcbiAgICAgICAgICAgICF0YXJnZXRJZC5pbmNsdWRlcygndXJzb3IxJykgJiYgXHJcbiAgICAgICAgICAgICF0YXJnZXRJZC5pbmNsdWRlcygndXJzb3IyJykgJiYgXHJcbiAgICAgICAgICAgICF0YXJnZXRJZC5pbmNsdWRlcygnUmVmQ3Vyc29yJykgJiYgXHJcbiAgICAgICAgICAgICF0YXJnZXRJZC5pbmNsdWRlcygnQ3Vyc29ySW5mb19tYWluX01vdmUnKSkge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5tb3ZlQ3Vyc29yV2l0aEtleSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5yZW1vdmVLZXlSZWxhdGVkRXZlbnRzLCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5jaGFydEluc3RhbmNlLmNoYXJ0Q29udGFpbmVyLm9uKCdjbGljaycsIHRoaXMuYWRkS2V5UmVsYXRlZEV2ZW50cy5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgdGhpcy5rZXlFdmVudHNQbGFjZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgZm9yIChsZXQgY3Vyc29yIG9mIHRoaXMuY3Vyc29ySGFuZGxlcnMpIHtcclxuICAgICAgICAgICAgICAgIGN1cnNvci5kZXNlbGVjdEN1cnNvcnMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0qL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTW92ZSBjdXJzb3Igd2l0aCBrZXlcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbW92ZUN1cnNvcldpdGhLZXkgKGUpIHtcclxuICAgICAgICB2YXIgbW92ZUFkZCA9IDAuMDtcclxuXHJcbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMzcgfHwgZS5rZXlDb2RlID09PSAzOSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIG1vdmVBZGQgPSAoZS5rZXlDb2RlID09PSAzNykgPyAtMC4wMSA6IDAuMDE7XHJcbiAgICAgICAgICAgIG1vdmVBZGQgKj0gKGUuY3RybEtleSkgPyAxMCA6IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChtb3ZlQWRkICE9PSAwLjApIHtcclxuICAgICAgICAgICAgdGhpcy5wbGFjZVJlZmVyZW5jZUN1cnNvckZyb21LZXkobW92ZUFkZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbW92ZUFkZFxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHBsYWNlUmVmZXJlbmNlQ3Vyc29yRnJvbUtleShtb3ZlQWRkOiBudW1iZXIpe1xyXG4gICAgICAgIC8vIGxldCBpbmRleCA9IHRoaXMuZ2V0QWN0aXZlQ3Vyc29yKCk7XHJcbiAgICAgICAgLy8gbGV0IGRhdGFQb2ludCA9IHRoaXMuZ2V0Q3Vyc29yUG9zaXRpb24oaW5kZXgpXHJcbiAgICAgICAgLy8gZGF0YVBvaW50Ll94ICs9IG1vdmVBZGQ7XHJcbiAgICAgICAgLy8gaWYoZGF0YVBvaW50ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgLy8gICAgIGlmKGRhdGFQb2ludC54ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmNoYXJ0TWFuYWdlci5zeW5jaHJvbml6ZUN1cnNvcnNQb3NpdGlvbihkYXRhUG9pbnQsIGluZGV4KTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vICAgICBlbHNle2NvbnNvbGUubG9nKFwidW5kZWZpbmVkXCIpfTtcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKkRyYXcgdGhlIGN1cnNvciBkZWZpbmVkIGJ5IGl0cyBpbmRleCBmb3IgYSBnaXZlbiB0aW1lc3RhbXBcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWVzdGFtcFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGN1cnNvckluZGV4XHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGhvdmVyZWRcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2VsZWN0ZWRcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBkcmF3Q3Vyc29yKHRpbWVzdGFtcDogbnVtYmVyLCBjdXJzb3JJbmRleDogbnVtYmVyLCBob3ZlcmVkOiBib29sZWFuLCBzZWxlY3RlZDogYm9vbGVhbikge1xyXG4gICAgICAgIGlmKHRoaXMuY3Vyc29ySGFuZGxlciAhPSB1bmRlZmluZWQpe1xyXG5cclxuICAgICAgICAgICAgLy9jYWxjdWxhdGUgdGhlIGN1cnNvciBwb3NpdGlvbiBmb3IgdGhlIGxlYWQgY3Vyc29yXHJcbiAgICAgICAgICAgIGxldCBsZWFkQ3Vyc29yQ2hhcnRQb2ludCA9IHRoaXMuY2FsY3VsYXRlTGVhZEN1cnNvckNoYXJ0UG9pbnQodGltZXN0YW1wLCB0aGlzLnNlcmllcyk7XHJcbiAgICAgICAgICAgIGxldCBsZWFkQ3Vyc29yUGl4ZWxQb3NpdGlvbjtcclxuICAgICAgICAgICAgbGV0IGxlYWRDdXJzb3JUaW1lc3RhbXA7XHJcblxyXG4gICAgICAgICAgICBsZXQgY3Vyc29yUG9zaXRpb25zIDogQ3Vyc29yUG9zaXRpb25JbmZvW10gPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGlmKGxlYWRDdXJzb3JDaGFydFBvaW50ICE9IHVuZGVmaW5lZCl7XHJcblxyXG4gICAgICAgICAgICAgICAgbGVhZEN1cnNvclBpeGVsUG9zaXRpb24gPSB0aGlzLmdldFBpeGVsc0Zyb21DaGFydFBvaW50KGxlYWRDdXJzb3JDaGFydFBvaW50LngsIGxlYWRDdXJzb3JDaGFydFBvaW50LnksIHRoaXMucHJpbWFyeVlBeGlzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICBsZWFkQ3Vyc29yVGltZXN0YW1wID0gdGhpcy5nZXRUaW1lc3RhbXBJblNlcmllcyhsZWFkQ3Vyc29yQ2hhcnRQb2ludCwgdGhpcy5zZXJpZXMpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vY2FsY3VsYXRlIHRoZSBjdXJzb3IgcG9zaXRpb25zIGZvciBhbGwgc2VyaWVzXHJcbiAgICAgICAgICAgICAgICBjdXJzb3JQb3NpdGlvbnMgPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgc2VyaWVzSW5kZXggPSAwIDsgc2VyaWVzSW5kZXggPCB0aGlzLnNlcmllcy5sZW5ndGg7IHNlcmllc0luZGV4Kyspe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihsZWFkQ3Vyc29yVGltZXN0YW1wID49IHRoaXMuc2VyaWVzW3Nlcmllc0luZGV4XS5zZXJpZS50aW1lc3RhbXBzWzBdICYmIGxlYWRDdXJzb3JUaW1lc3RhbXAgPD0gdGhpcy5zZXJpZXNbc2VyaWVzSW5kZXhdLnNlcmllLnRpbWVzdGFtcHNbdGhpcy5zZXJpZXNbc2VyaWVzSW5kZXhdLnNlcmllLnRpbWVzdGFtcHMubGVuZ3RoLTFdKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnNvckNoYXJ0UG9pbnQgPSB0aGlzLmdldEN1cnNvclBvaW50KGxlYWRDdXJzb3JUaW1lc3RhbXAsIHRpbWVzdGFtcCwgc2VyaWVzSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2NhbGVJZCA9IHRoaXMuZ2V0U2NhbGVJREZvclNlcmllcyh0aGlzLnNlcmllc1tzZXJpZXNJbmRleF0uc2VyaWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY3Vyc29yUG9zaXRpb24gPSB0aGlzLmdldFBpeGVsc0Zyb21DaGFydFBvaW50KGN1cnNvckNoYXJ0UG9pbnQueCwgY3Vyc29yQ2hhcnRQb2ludC55LCBzY2FsZUlkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vc2V0IGhpZ2hsaWdodCB0byB0cnVlIGlmIGN1cnNvciBpcyBob3ZlcmVkIGFuZCBpZiBpdHMgc2VyaWVzIGlzIGN1cnJlbnRseSBzZWxlY3RlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaGlnaGxpZ2h0Q3Vyc29yID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuaG92ZXJlZFNlcmllcy5pbmRleE9mKHRoaXMuc2VyaWVzW3Nlcmllc0luZGV4XSApICE9IC0xICYmIGhvdmVyZWQgJiYgKHRoaXMuc2VyaWVzLmxlbmd0aCAhPSB0aGlzLmhvdmVyZWRTZXJpZXMubGVuZ3RoIHx8IHRoaXMuaG92ZXJlZFNlcmllcy5sZW5ndGggPT0gMSkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlnaGxpZ2h0Q3Vyc29yID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3JQb3NpdGlvbnMucHVzaChuZXcgQ3Vyc29yUG9zaXRpb25JbmZvKGN1cnNvclBvc2l0aW9uLCB7c2VsZWN0ZWQ6IHNlbGVjdGVkLCBob3ZlcmVkOiBob3ZlcmVkLCBoaWdobGlnaHQ6IGhpZ2hsaWdodEN1cnNvciwgc2VyaWVzOiBbdGhpcy5zZXJpZXNbc2VyaWVzSW5kZXhdXSwgY3Vyc29ySW5kZXg6IGN1cnNvckluZGV4fSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBsZWFkQ3Vyc29yUG9zaXRpb24gPSBuZXcgQ3Vyc29yUG9zaXRpb25JbmZvKGxlYWRDdXJzb3JQaXhlbFBvc2l0aW9uLCB7c2VsZWN0ZWQ6IHNlbGVjdGVkLCBob3ZlcmVkOiBob3ZlcmVkLCBzZXJpZXM6IHRoaXMuc2VyaWVzLCBjdXJzb3JJbmRleDogY3Vyc29ySW5kZXh9KTtcclxuICAgICAgICAgICAgdGhpcy5jdXJzb3JIYW5kbGVyLmRyYXdDdXJzb3IobGVhZEN1cnNvclBvc2l0aW9uLGN1cnNvclBvc2l0aW9ucywgY3Vyc29ySW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgZ2V0U2NhbGVJREZvclNlcmllcyhzZXJpZXM6IEJhc2VTZXJpZXMpIDogc3RyaW5ne1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnNjYWxlcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2NhbGVzW2ldLmhhc1NlcmllKHNlcmllcykpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2NhbGVzW2ldLmlkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqY2FsY3VsYXRlIHRoZSBsZWFkIGN1cnNvciBjaGFydCBwb2ludFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHRpbWVzdGFtcFxyXG4gICAgICogQHBhcmFtIHtDaGFydFZpZXdTZXJpZVtdfSBzZXJpZXNcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2FsY3VsYXRlTGVhZEN1cnNvckNoYXJ0UG9pbnQodGltZXN0YW1wLCBzZXJpZXMgOiBDaGFydFZpZXdTZXJpZVtdKXtcclxuICAgICAgICBsZXQgbGVhZEN1cnNvclBvaW50O1xyXG4gICAgICAgIGxldCBtaW5EaXN0YW5jZVBvaW50VG9DdXJzb3I7XHJcblxyXG4gICAgICAgIC8vY2FsY3VsYXRlIGxlYWQgY3Vyc29yIHBvc2l0aW9uIGZyb20gdGhlIGF2YWlsYWJsZSBzZXJpZXNcclxuICAgICAgICBmb3IobGV0IHNlcmllc0luZGV4ID0gMDsgc2VyaWVzSW5kZXggPCBzZXJpZXMubGVuZ3RoOyBzZXJpZXNJbmRleCsrKXtcclxuICAgICAgICAgICAgaWYoc2VyaWVzW3Nlcmllc0luZGV4XS5zZXJpZS5yYXdQb2ludHNWYWxpZCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgY3Vyc29yUG9pbnQgPSB0aGlzLmdldEN1cnNvclBvaW50KHRpbWVzdGFtcCwgdGltZXN0YW1wLCBzZXJpZXNJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAvL2NoZWNrIGlmIHRpbWVzdGFtcCBpcyB3aXRoaW4gc2VyaWVzIFxyXG4gICAgICAgICAgICAgICAgaWYodGltZXN0YW1wID49IHRoaXMuc2VyaWVzW3Nlcmllc0luZGV4XS5zZXJpZS50aW1lc3RhbXBzWzBdICYmIHRpbWVzdGFtcCA8PSB0aGlzLnNlcmllc1tzZXJpZXNJbmRleF0uc2VyaWUudGltZXN0YW1wc1t0aGlzLnNlcmllc1tzZXJpZXNJbmRleF0uc2VyaWUudGltZXN0YW1wcy5sZW5ndGgtMV0pe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihtaW5EaXN0YW5jZVBvaW50VG9DdXJzb3IgPT0gdW5kZWZpbmVkIHx8IE1hdGguYWJzKGN1cnNvclBvaW50LnRpbWVzdGFtcC0gdGltZXN0YW1wKSA8IG1pbkRpc3RhbmNlUG9pbnRUb0N1cnNvcil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbkRpc3RhbmNlUG9pbnRUb0N1cnNvciA9IE1hdGguYWJzKGN1cnNvclBvaW50LnRpbWVzdGFtcCAtIHRpbWVzdGFtcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlYWRDdXJzb3JQb2ludCA9IGN1cnNvclBvaW50O1xyXG4gICAgICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxlYWRDdXJzb3JQb2ludDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0U2NhbGVCeVNjYWxlSWQoc2NhbGVJZCkgOiBTY2FsZXx1bmRlZmluZWR7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuc2NhbGVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYoc2NhbGVJZCA9PSB0aGlzLnNjYWxlc1tpXS5pZCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zY2FsZXNbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGF1dG9TY2FsZVlTY2FsZXMoKXtcclxuICAgICAgICBsZXQgc2NhbGVzID0gdGhpcy5nZXRZU2NhbGVzKCk7XHJcbiAgICAgICAgbGV0IGNoYXJ0TWluWVBpeGVsIDogbnVtYmVyfHVuZGVmaW5lZDtcclxuICAgICAgICBsZXQgY2hhcnRNYXhZUGl4ZWwgOiBudW1iZXJ8dW5kZWZpbmVkO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBzY2FsZSBvZiBzY2FsZXMpe1xyXG4gICAgICAgICAgICBsZXQgc2VyaWVzTWluWSA9IHRoaXMuZ2V0U2VyaWVzTWluWUZvclNjYWxlKHNjYWxlKTtcclxuICAgICAgICAgICAgbGV0IHNlcmllc01heFkgPSB0aGlzLmdldFNlcmllc01heFlGb3JTY2FsZShzY2FsZSk7XHJcblxyXG4gICAgICAgICAgICBpZihzZXJpZXNNaW5ZICE9IHVuZGVmaW5lZCAmJiBzZXJpZXNNYXhZICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgYXhpc01pbllQaXhlbCA9IHRoaXMuY2FsY3VsYXRlUGl4ZWxZKHNjYWxlLmlkLCBzZXJpZXNNaW5ZKTtcclxuICAgICAgICAgICAgICAgIGxldCBheGlzTWF4WVBpeGVsID0gdGhpcy5jYWxjdWxhdGVQaXhlbFkoc2NhbGUuaWQsIHNlcmllc01heFkpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGNoYXJ0TWluWVBpeGVsID09IHVuZGVmaW5lZCB8fCBheGlzTWluWVBpeGVsID4gY2hhcnRNaW5ZUGl4ZWwpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNoYXJ0TWluWVBpeGVsID0gYXhpc01pbllQaXhlbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKGNoYXJ0TWF4WVBpeGVsID09IHVuZGVmaW5lZCB8fCBheGlzTWF4WVBpeGVsIDwgY2hhcnRNYXhZUGl4ZWwpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNoYXJ0TWF4WVBpeGVsID0gYXhpc01heFlQaXhlbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoY2hhcnRNaW5ZUGl4ZWwgIT0gdW5kZWZpbmVkICYmIGNoYXJ0TWF4WVBpeGVsICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHNjYWxlIG9mIHNjYWxlcyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3QXhpc01pblZhbHVlID0gdGhpcy5nZXRDaGFydENvb3JkaW5hdGVGcm9tUGl4ZWwodGhpcy5wcmltYXJ5WEF4aXNOYW1lLCBzY2FsZS5pZCwgMCwgY2hhcnRNaW5ZUGl4ZWwpLnk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3QXhpc01heFZhbHVlID0gdGhpcy5nZXRDaGFydENvb3JkaW5hdGVGcm9tUGl4ZWwodGhpcy5wcmltYXJ5WEF4aXNOYW1lLCBzY2FsZS5pZCwgMCwgY2hhcnRNYXhZUGl4ZWwpLnk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVSYW5nZVkoc2NhbGUsbmV3QXhpc01pblZhbHVlLCBuZXdBeGlzTWF4VmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSByYW5nZSBmb3IgWCBBeGlzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG5ld01pblhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBuZXdNYXhYXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRSYW5nZVgobmV3TWluWDogbnVtYmVyLCBuZXdNYXhYOiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuc2NhbGVzWzBdLm1pblhWYWx1ZSA9IG5ld01pblg7XHJcbiAgICAgICAgdGhpcy5zY2FsZXNbMF0ubWF4WFZhbHVlID0gbmV3TWF4WDtcclxuXHJcbiAgICAgICAgbGV0IGF4aXMgPSB0aGlzLmNoYXJ0LmdldEF4aXModGhpcy5wcmltYXJ5WEF4aXNOYW1lKTtcclxuICAgICAgICBpZiggYXhpcyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBheGlzLnNldEF4aXNSYW5nZSh7bWluOiBuZXdNaW5YLCBtYXg6IG5ld01heFh9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHJhbmdlIG9mIHRoaXMgY2hhcnQgZm9yIHRoZSBnaXZlbiBheGlzIGFuZCBtaW4vbWF4IHZhbHVlc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYXhpc05hbWVcclxuICAgICAqIEBwYXJhbSB7Kn0gYXhpc1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1pblZhbHVlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbWF4VmFsdWVcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFNjYWxlUmFuZ2Uoc2NhbGU6IFNjYWxlLCBtaW5YVmFsdWU6IG51bWJlciwgbWF4WFZhbHVlOiBudW1iZXIsIG1pbllWYWx1ZTogbnVtYmVyLCBtYXhZVmFsdWU6IG51bWJlciwgb3JpZW50YXRpb24/OiBzdHJpbmcsIHNldEF4aXNSYW5nZSA9IHRydWUpe1xyXG4gICAgICAgIGxldCB0cmlnZ2VyQ2hhbmdlZEV2ZW5ldCA9IGZhbHNlO1xyXG4gICAgICAgIGlmKHNjYWxlLm1pblhWYWx1ZSAhPSBtaW5YVmFsdWUgfHxzY2FsZS5tYXhYVmFsdWUgIT0gbWF4WFZhbHVlKXtcclxuICAgICAgICAgICAgdHJpZ2dlckNoYW5nZWRFdmVuZXQgPSB0cnVlO1xyXG4gICAgICAgIH0gICAgXHJcbiAgICAgICAgc2NhbGUubWluWVZhbHVlID0gbWluWVZhbHVlO1xyXG4gICAgICAgIHNjYWxlLm1heFlWYWx1ZSA9IG1heFlWYWx1ZTtcclxuXHJcbiAgICAgICAgc2NhbGUubWluWFZhbHVlID0gbWluWFZhbHVlO1xyXG4gICAgICAgIHNjYWxlLm1heFhWYWx1ZSA9IG1heFhWYWx1ZTtcclxuXHJcbiAgICAgICAgaWYodHJpZ2dlckNoYW5nZWRFdmVuZXQpe1xyXG4gICAgICAgICAgICBsZXQgYXJncyA9IG5ldyBFdmVudFNjYWxlRGF0YUNoYW5nZWRBcmdzKFNjYWxlQWN0aW9uLnJhbmdlQ2hhbmdlZCwge3NjYWxlOiBzY2FsZX0pO1xyXG4gICAgICAgICAgICBzY2FsZS5ldmVudERhdGFDaGFuZ2VkLnJhaXNlKHNjYWxlLGFyZ3MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoc2V0QXhpc1JhbmdlKXtcclxuICAgICAgICAgICAgbGV0IGF4aXMgPSB0aGlzLmNoYXJ0LmdldEF4aXMoc2NhbGUuaWQpO1xyXG4gICAgICAgICAgICBpZihheGlzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBheGlzLnNldEF4aXNSYW5nZSh7bWluOiBzY2FsZS5taW5ZVmFsdWUsIG1heDogc2NhbGUubWF4WVZhbHVlfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlIFkgcmFuZ2VcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtTY2FsZX0gc2NhbGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5QXhpc01heFZhbHVlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geUF4aXNNaW5WYWx1ZVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXBkYXRlUmFuZ2VZKHNjYWxlOiBTY2FsZSwgeUF4aXNNaW5WYWx1ZTogbnVtYmVyLCB5QXhpc01heFZhbHVlOiBudW1iZXIpe1xyXG4gICAgICAgIGxldCBjaGFydFJhbmdlSGVscGVyID0gbmV3IENoYXJ0UmFuZ2VIZWxwZXI7XHJcbiAgICBcclxuICAgICAgICBpZighaXNOYU4oeUF4aXNNYXhWYWx1ZSkgfHwgIWlzTmFOKHlBeGlzTWluVmFsdWUpKXtcclxuXHJcbiAgICAgICAgICAgIHlBeGlzTWF4VmFsdWUgPSBOdW1iZXIoeUF4aXNNYXhWYWx1ZS50b1ByZWNpc2lvbigxNCkpO1xyXG4gICAgICAgICAgICB5QXhpc01pblZhbHVlID0gTnVtYmVyKHlBeGlzTWluVmFsdWUudG9QcmVjaXNpb24oMTQpKTtcclxuXHJcbiAgICAgICAgICAgIGxldCB5QXhpc1JhbmdlID0geUF4aXNNYXhWYWx1ZSAtIHlBeGlzTWluVmFsdWU7XHJcbiAgICAgICAgICAgIGxldCB5QXhpc09mZnNldDtcclxuICAgICAgICAgICAgaWYoeUF4aXNSYW5nZSA9PSAwKXtcclxuICAgICAgICAgICAgICAgIC8vaWYgcmFuZ2UgaXMgemVybywgd2UgaGF2ZSB0byBjYWxjdWxhdGUgYW4gYXJiaXRyYXJ5IG9mZnNldCB0byBkaXNwbGF5IHRoZSB5IGF4aXMgY29ycmVjdGx5XHJcbiAgICAgICAgICAgICAgICB5QXhpc09mZnNldCA9IGNoYXJ0UmFuZ2VIZWxwZXIuZ2V0QXhpc09mZnNldEZvclN0cmFpZ2h0TGluZXMoeUF4aXNNaW5WYWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGxldCBheGlzID0gdGhpcy5jaGFydC5nZXRBeGlzKHNjYWxlLmlkKTtcclxuICAgICAgICAgICAgICAgIGlmKGF4aXMgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcGl4ZWxSYW5nZSA9IGF4aXMuZ2V0QXhpc1JhbmdlSW5QaXhlbCgpXHJcbiAgICAgICAgICAgICAgICAgICAgeUF4aXNPZmZzZXQgPSBjaGFydFJhbmdlSGVscGVyLmdldEF4aXNPZmZzZXQoeUF4aXNSYW5nZSwocGl4ZWxSYW5nZS5tYXggLSBwaXhlbFJhbmdlLm1pbikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB5QXhpc01heFZhbHVlICs9IHlBeGlzT2Zmc2V0O1xyXG4gICAgICAgICAgICB5QXhpc01pblZhbHVlIC09IHlBeGlzT2Zmc2V0O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgeUF4aXNSYW5nZSA9IHlBeGlzTWF4VmFsdWUhIC0geUF4aXNNaW5WYWx1ZSFcclxuICAgICAgICAgICAgdGhpcy5zZXRTY2FsZVJhbmdlKHNjYWxlLCBzY2FsZS5taW5YVmFsdWUsIHNjYWxlLm1heFhWYWx1ZSwgeUF4aXNNaW5WYWx1ZSwgeUF4aXNNYXhWYWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IG1pbiBZIHZhbHVlIGZyb20gYWxsIHRoZSBzZXJpZXMgaW4gdGhlIGNoYXJ0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7U2NhbGV9IHNjYWxlXHJcbiAgICAgKiBAcmV0dXJucyB7KG51bWJlcnx1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0U2VyaWVzTWluWUZvclNjYWxlKHNjYWxlOiBTY2FsZSkgOiBudW1iZXJ8dW5kZWZpbmVke1xyXG4gICAgICAgIGxldCBtaW5ZOiBudW1iZXJ8dW5kZWZpbmVkID0gdW5kZWZpbmVkXHJcbiAgICBcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2NhbGUuY2hpbGRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYgKG1pblkgPT0gdW5kZWZpbmVkIHx8IHNjYWxlLmNoaWxkc1tpXS5taW5ZISA8IG1pblkpe1xyXG4gICAgICAgICAgICAgICAgbWluWSA9IHNjYWxlLmNoaWxkc1tpXS5taW5ZO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtaW5ZOyAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IG1heCBZIHZhbHVlIGZyb20gYWxsIHRoZSBzZXJpZXMgb24gdGhlIGF4aXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtTY2FsZX0gc2NhbGVcclxuICAgICAqIEByZXR1cm5zIHsobnVtYmVyfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRTZXJpZXNNYXhZRm9yU2NhbGUoc2NhbGU6IFNjYWxlKTogbnVtYmVyfHVuZGVmaW5lZHtcclxuICAgICAgICBsZXQgbWF4WTogbnVtYmVyIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkXHJcbiAgICBcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2NhbGUuY2hpbGRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYgKG1heFkgPT0gdW5kZWZpbmVkIHx8IHNjYWxlLmNoaWxkc1tpXS5tYXhZISA+IG1heFkpe1xyXG4gICAgICAgICAgICAgICAgbWF4WSA9IHNjYWxlLmNoaWxkc1tpXS5tYXhZO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtYXhZOyAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgYXZhaWxhYmxlIHVpIGN1cnNvcnMgYWNjb3JkaW5nIHRvIHRoZSBjdXJyZW50IHN0YXRlIGluIHJlc3BvbnNlIHRvIGEgc3RhdGUgY2hhbmdlLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0N1cnNvclN0YXRlc30gbW9kaWZpZWRTdGF0ZVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZVVJQ3Vyc29ycyAobW9kaWZpZWRTdGF0ZTogQ3Vyc29yU3RhdGVzKSB7XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCBzZXJpZUN1cnNvclR5cGUgPSB0aGlzLmdldFNlcmllQ3Vyc29yVHlwZSgpO1xyXG4gICAgICAgICAgICBsZXQgY3Vyc29yVGltZVN0YXRlcyA9IG1vZGlmaWVkU3RhdGUuZ2V0VGltZVN0YXRlcygpO1xyXG4gICAgICAgICAgICBsZXQgY3Vyc29yRnJlcVN0YXRlcyA9IG1vZGlmaWVkU3RhdGUuZ2V0RnJlcXVlbmN5U3RhdGVzKCk7XHJcbiAgICBcclxuICAgICAgICAgICAgaWYgKHNlcmllQ3Vyc29yVHlwZSA9PSBDdXJzb3JUeXBlLnRpbWVEb21haW4pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQ3Vyc29yTG9hdGlvbnMoY3Vyc29yVGltZVN0YXRlcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoc2VyaWVDdXJzb3JUeXBlID09IEN1cnNvclR5cGUuZnJlcXVlbmN5RG9tYWluKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUN1cnNvckxvYXRpb25zKGN1cnNvckZyZXFTdGF0ZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgLy8gdGhlIHRyeSBjYXRjaCBibG9jayBmaXhlcyBhbiBpbmNvcnJlY3Qgc2VxdWVuY2Ugd2hlbiBjbG9zaW5nIGFuZCByZW9wZW5pbmcgdGhlIGFuYWx5c2lzIHZpZXcgYXMgYSB3b3JrYXJvdW5kIHVudGlsXHJcbiAgICAgICAgICAgIC8vIHRoZSBiaW5kaW5nIGNvbm5lY3Rpb25zIHdpbGwgYmUgY2xlYW5lZCB1cCBjb3JyZWN0bHkuXHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkNoYXJ0QmFzZS51cGRhdGVVSUN1cnNvcnM6IGN1cnNvcnMgY291bGQgbm90IGJlIHVwZGF0ZWQgYmVjYXVzZSBvZiBleGNlcHRpb24gJW9cIixlcnJvcik7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByaXZhdGUgdXBkYXRlQ3Vyc29yTG9hdGlvbnMgKGN1cnNvclN0YXRlczogSUN1cnNvclN0YXRlW10pIHtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgY3Vyc29yU3RhdGVzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAvLyB0aGlzLnNldEN1cnNvclN0YXRlKGluZGV4LCBjdXJzb3JTdGF0ZXNbaW5kZXhdKTtcclxuICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSBjdXJzb3JzIG9ubHkgaWYgdGhleSBoYXZlIGEgdmFsaWQgcG9zaXRpb25cclxuICAgICAgICAgICAgbGV0IHBvc2l0aW9uID0gY3Vyc29yU3RhdGVzW2luZGV4XS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgaWYgKHBvc2l0aW9uICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3Q3Vyc29yKHBvc2l0aW9uLCBpbmRleCwgY3Vyc29yU3RhdGVzW2luZGV4XS5ob3ZlcmVkLCBjdXJzb3JTdGF0ZXNbaW5kZXhdLnNlbGVjdGVkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0TWluWEF4aXNWYWx1ZSAoKSAge1xyXG4gICAgICAgIGxldCBheGlzID0gdGhpcy5jaGFydC5nZXRBeGlzKHRoaXMucHJpbWFyeVhBeGlzTmFtZSk7XHJcbiAgICAgICAgaWYoYXhpcyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gYXhpcy5nZXRBeGlzUmFuZ2UoKS5taW5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldE1heFhBeGlzVmFsdWUgKCkge1xyXG4gICAgICAgIGxldCBheGlzID0gdGhpcy5jaGFydC5nZXRBeGlzKHRoaXMucHJpbWFyeVhBeGlzTmFtZSk7XHJcbiAgICAgICAgaWYoYXhpcyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gYXhpcy5nZXRBeGlzUmFuZ2UoKS5tYXhcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHlcclxuICAgICAqIEByZXR1cm5zIHt7IHg6IG51bWJlciwgeTogbnVtYmVyfX1cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRQaXhlbHNGcm9tQ2hhcnRQb2ludCAoeDogbnVtYmVyLCB5OiBudW1iZXIsIHNjYWxlSUQ6IHN0cmluZyk6IHsgeDogbnVtYmVyLCB5OiBudW1iZXJ9IHtcclxuICAgICAgICBsZXQgY2hhcnRBcmVhID0gdGhpcy5jaGFydC5nZXRDaGFydEFyZWEoKTtcclxuICAgICAgICByZXR1cm4geyB4OiB0aGlzLmNhbGN1bGF0ZVBpeGVsWCh4KSAtIGNoYXJ0QXJlYS54LCB5OiB0aGlzLmNhbGN1bGF0ZVBpeGVsWShzY2FsZUlELCB5KSAtIGNoYXJ0QXJlYS55fTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFdlIHJlcG9zaXRpb24gdGhlIGN1cnNvcnMgYXN3ZWxsIHdoZW4gd2UgdXBkYXRlIHRoZSBjaGFydFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCByZXBvc2l0aW9uQ3Vyc29ycygpIHtcclxuICAgICAgICAvLyBGb3JjZSB1cGRhdGluZyB0aGUgY3Vyc29ycyBzdGF0ZXMgd2hpY2ggaW4gcmVzcG9uc2UgdXBkYXRlcyB0aGUgY3Vyc29yIHVpIC4uLi5cclxuICAgICAgICB0aGlzLnVwZGF0ZUN1cnNvclN0YXRlcyh0aGlzLmN1cnNvcnNTdGF0ZXMpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjaGFydFhcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2FsY3VsYXRlUGl4ZWxYIChjaGFydFg6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IG1pblggPSB0aGlzLmdldE1pblhBeGlzVmFsdWUoKTtcclxuICAgICAgICBsZXQgbWF4WCA9IHRoaXMuZ2V0TWF4WEF4aXNWYWx1ZSgpOyBcclxuXHJcbiAgICAgICAgaWYobWF4WCAhPSB1bmRlZmluZWQgJiYgbWluWCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBsZXQgcmFuZ2UgPSAobWF4WCAtIG1pblgpXHJcbiAgICAgICAgICAgIGxldCBzdGFydFggPSBtaW5YOyBcclxuICAgICAgICAgICAgbGV0IGFjdHVhbFJhbmdlID0gcmFuZ2U7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGltZVBlcmNlbnRhZ2UgPSAoY2hhcnRYIC0gc3RhcnRYKSAvIGFjdHVhbFJhbmdlO1xyXG5cclxuICAgICAgICAgICAgbGV0IGNoYXJ0QXJlYSA9IHRoaXMuY2hhcnQuZ2V0Q2hhcnRBcmVhKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBjaGFydEFyZWEueCArIGNoYXJ0QXJlYS53aWR0aCAqIHRpbWVQZXJjZW50YWdlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfSBcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY2hhcnRZXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNhbGN1bGF0ZVBpeGVsWSAoc2NhbGVJRDogc3RyaW5nLCBjaGFydFk6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IGF4aXMgPSB0aGlzLmNoYXJ0LmdldEF4aXMoc2NhbGVJRCk7XHJcbiAgICAgICAgaWYoYXhpcyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBsZXQgYXhpc1JhbmdlID0gYXhpcy5nZXRBeGlzUmFuZ2UoKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IHJhbmdlO1xyXG4gICAgICAgICAgICBpZihheGlzUmFuZ2UuZGVsdGEgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHJhbmdlID0gYXhpc1JhbmdlLmRlbHRhO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICByYW5nZSA9IGF4aXNSYW5nZS5tYXggLSBheGlzUmFuZ2UubWluO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgc3RhcnRZID0gYXhpc1JhbmdlLm1pbjtcclxuICAgICAgICAgICAgbGV0IHZhbHVlUGVyY2VudGFnZSA9IDEgLSAoKGNoYXJ0WSAtIHN0YXJ0WSkgLyByYW5nZSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgY2hhcnRBcmVhID0gdGhpcy5jaGFydC5nZXRDaGFydEFyZWEoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNoYXJ0QXJlYS55ICsgY2hhcnRBcmVhLmhlaWdodCAqIHZhbHVlUGVyY2VudGFnZVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9IFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlIGRyb3AgbG9jYXRpb25zIGZyb20gdGhlIGNoYXJ0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVtb3ZlU2VyaWVEcm9wTG9jYXRpb25zKCl7XHJcbiAgICAgICAgZm9yKGxldCBheGlzQm91bmQgb2YgdGhpcy5heGlzQm91bmRzKXtcclxuICAgICAgICAgICAgJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCsnX2F4aXNEcm9wWm9uZScrYXhpc0JvdW5kLmF4aXMubmFtZSkucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQrJ19heGlzRHJvcFpvbmUnK1wiX2NoYXJ0QXJlYVwiKS5yZW1vdmUoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgbnVtYmVyIG9mIHkgYXhlcyBpbnNpZGUgYSBjaGFydFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXROdW1iZXJPZllTY2FsZXMoKSA6IG51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5zY2FsZXMubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IGFsbCB5IGF4ZXMgZnJvbSBhIGNoYXJ0XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge1NjYWxlW119XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRZU2NhbGVzKCkgOiBTY2FsZVtde1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNjYWxlcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHBpeGVsQ29vcmRpbmF0ZVhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBwaXhlbENvb3JkaW5hdGVZXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFhZQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldENoYXJ0Q29vcmRpbmF0ZUZyb21QaXhlbChzY2FsZUlEWDogc3RyaW5nLCBzY2FsZUlEWTogc3RyaW5nLHBpeGVsQ29vcmRpbmF0ZVggOiBudW1iZXIsIHBpeGVsQ29vcmRpbmF0ZVkgOiBudW1iZXIpIDogUG9pbnR7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGNoYXJ0QXJlYSA9IHRoaXMuY2hhcnQuZ2V0Q2hhcnRBcmVhKCk7XHJcbiAgICAgICAgbGV0IHhBeGlzID0gdGhpcy5jaGFydC5nZXRBeGlzKHNjYWxlSURYKTtcclxuICAgICAgICBsZXQgeUF4aXMgPSB0aGlzLmNoYXJ0LmdldEF4aXMoc2NhbGVJRFkpO1xyXG4gICAgICAgIGxldCB5QXhpc1JhbmdlID0geUF4aXMhLmdldEF4aXNSYW5nZSgpO1xyXG4gICAgICAgIGxldCB4QXhpc1JhbmdlID0geEF4aXMhLmdldEF4aXNSYW5nZSgpO1xyXG5cclxuICAgICAgICAvLyBYIEF4aXM6IFxyXG4gICAgICAgIGxldCByZWxhdGl2ZVBpeGVsQ29vcmRpbmF0ZVggPSBCaWcocGl4ZWxDb29yZGluYXRlWCkubWludXMoQmlnKGNoYXJ0QXJlYS54KSk7XHJcbiAgICAgICAgbGV0IGNoYXJ0QXhpc1hSYW5nZSA9IEJpZyh4QXhpc1JhbmdlLm1heCkubWludXMoQmlnKHhBeGlzUmFuZ2UubWluKSk7XHJcblxyXG4gICAgICAgIGxldCBjaGFydENvb3JkaW5hdGVQZXJQaXhlbCA9IGNoYXJ0QXhpc1hSYW5nZS5kaXYoQmlnKGNoYXJ0QXJlYS53aWR0aCkpO1xyXG4gICAgICAgIGxldCBjbG9zZXN0WEF4aXNWYWx1ZVRvQ2xpY2sgPSBCaWcoeEF4aXNSYW5nZS5taW4pLnBsdXMoKHJlbGF0aXZlUGl4ZWxDb29yZGluYXRlWC50aW1lcyhjaGFydENvb3JkaW5hdGVQZXJQaXhlbCkpKTtcclxuXHJcbiAgICAgICAgLy8gWSBBeGlzOiBcclxuICAgICAgICBsZXQgcmVsYXRpdmVQaXhlbENvb3JkaW5hdGVZID0gQmlnKHBpeGVsQ29vcmRpbmF0ZVkpLm1pbnVzKEJpZyhjaGFydEFyZWEueSkpO1xyXG4gICAgICAgIGxldCBjaGFydEF4aXNZUmFuZ2UgPSBCaWcoeUF4aXNSYW5nZS5tYXgpLm1pbnVzKEJpZyh5QXhpc1JhbmdlLm1pbikpO1xyXG5cclxuICAgICAgICBjaGFydENvb3JkaW5hdGVQZXJQaXhlbCA9IGNoYXJ0QXhpc1lSYW5nZS5kaXYoQmlnKGNoYXJ0QXJlYS5oZWlnaHQpKTtcclxuICAgICAgICBsZXQgY2xvc2VzdFlBeGlzVmFsdWVUb0NsaWNrID0gIEJpZyh5QXhpc1JhbmdlLm1pbikucGx1cyhjaGFydEF4aXNZUmFuZ2UubWludXMocmVsYXRpdmVQaXhlbENvb3JkaW5hdGVZLnRpbWVzKGNoYXJ0Q29vcmRpbmF0ZVBlclBpeGVsKSkpXHJcblxyXG5cclxuICAgICAgICBsZXQgY2xvc2VzdFlBeGlzVmFsdWVOdW1iZXIgPSBOdW1iZXIoY2xvc2VzdFlBeGlzVmFsdWVUb0NsaWNrLnRvRml4ZWQoMTQpKTtcclxuICAgICAgICBsZXQgY2xvc2VzdFhBeGlzVmFsdWVOdW1iZXIgPSBOdW1iZXIoY2xvc2VzdFhBeGlzVmFsdWVUb0NsaWNrLnRvRml4ZWQoMTQpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQb2ludChjbG9zZXN0WEF4aXNWYWx1ZU51bWJlciwgY2xvc2VzdFlBeGlzVmFsdWVOdW1iZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0cyBhIHNlcmllcyBwb2ludCBpbiBjaGFydCBjb29yZGluYXRlcyBmb3IgdGhlIHNwZWNlZmllZCB0aW1lc3RhbXBcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdGltZXN0YW1wXHJcbiAgICAgKiBAcmV0dXJucyB7UG9pbnR9XHJcbiAgICAgKiBAbWVtYmVyb2YgWVRDaGFydFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0U2VyaWVzUG9pbnRGcm9tVGltZXN0YW1wKHRpbWVzdGFtcDogbnVtYmVyKTogUG9pbnQge1xyXG5cclxuICAgICAgICAvLyB3ZSBwcm92aWRlIHkgPT0gMCBpZiB3ZSBhcmUgbm90IGFibGUgdG8gZmluZCBtYXRjaGluZyBwb2ludHNcclxuICAgICAgICBsZXQgc2VyaWVzUG9pbnQgPSBuZXcgUG9pbnQodGltZXN0YW1wLCAwKTtcclxuXHJcbiAgICAgICAgLy8gc2tpcCBzZWFyY2hpbmcgaWYgdGhlIHNlcmllcyBpbmRleCBpcyBvdXQgb2YgcmFuZ2VcclxuICAgICAgICBpZiAodGhpcy5zZXJpZXMubGVuZ3RoID09IDAgKSByZXR1cm4gc2VyaWVzUG9pbnQ7XHJcblxyXG4gICAgICAgIC8vIGZpbmQgYSBtYXRjaGluZyBzZXJpZXMgcG9pbnQgcmVsYXRlZCB0byB0aGUgdGltZXN0YW1wXHJcbiAgICAgICAgc2VyaWVzUG9pbnQgPSB0aGlzLmZpbmROZWFyZXN0UG9pbnRJbkFsbFNlcmllcyh0aW1lc3RhbXApO1xyXG5cclxuICAgICAgICByZXR1cm4gc2VyaWVzUG9pbnQ7XHJcbiAgICB9XHJcbiAgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZWFyY2hlcyBmb3IgdGhlIG5lYXJlc3QgcG9pbnQgcmVsYXRlZCB0byB0aGUgdGltZXN0YW1wIGluIGFsbCBzZXJpZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWVzdGFtcFxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBmaW5kTmVhcmVzdFBvaW50SW5BbGxTZXJpZXModGltZXN0YW1wOiBudW1iZXIpOiBQb2ludCB7ICAgICAgIFxyXG5cclxuICAgICAgICAvLyBjb2xsZWN0IHRoZSBuZWFyZXN0IHBvaW50cyBmcm9tIGV2ZXJ5IHNlcmllc1xyXG4gICAgICAgIGxldCBuZWFyZXN0U2VyaWVzUG9pbnRzOiBJUG9pbnRbXSA9IHRoaXMuc2VyaWVzLm1hcCgoc2luZ2xlU2VyaWVzKT0+IHsgcmV0dXJuIHNpbmdsZVNlcmllcy5zZXJpZS5wb2ludEZyb21UaW1lc3RhbXAodGltZXN0YW1wKX0pO1xyXG5cclxuICAgICAgICAvLyBzb3J0IHRoZSBuZWFyZXN0IHBvaW50cyBieSB0aGVpciB0aW1lc3RhbXAgdmFsdWVcclxuICAgICAgICBuZWFyZXN0U2VyaWVzUG9pbnRzLnNvcnQoKHZhbHVlMSwgdmFsdWUyKSA9PiB7IHJldHVybiB2YWx1ZTEueCAtIHZhbHVlMi54OyB9KTtcclxuXHJcbiAgICAgICAgLy8gZ2V0IHRoZSB0aW1lc3RhbXAgdmFsdWVzXHJcbiAgICAgICAgbGV0IG5lYXJlc3RTZXJpZXNUaW1lc3RhbXBzOiBudW1iZXJbXSA9IG5lYXJlc3RTZXJpZXNQb2ludHMubWFwKChzZXJpZXNQb2ludCk9PnsgcmV0dXJuIHNlcmllc1BvaW50Lnh9KTtcclxuXHJcbiAgICAgICAgLy8gZmluZCB0aGUgbmVhcmVzdCBwb2ludCBmcm9tIGFsbCBzZXJpZXMuIFRoZSBmb3VuZCBpbmRleCByZWZlcnMgdG8gdGhlIG5lYXJlc3Qgc2VyaWVzICFcclxuICAgICAgICBsZXQgbmVhcmVzdFNlcmllc0luZGV4ID0gU2VyaWVzSGVscGVyLmluZGV4T2ZOZWFyZXN0KHRpbWVzdGFtcCwgbmVhcmVzdFNlcmllc1RpbWVzdGFtcHMpO1xyXG5cclxuICAgICAgICAvLyBnZXQgdGhlIG5lYXJlc3QgcG9pbnQgZnJvbSB0aGUgc2VyaWVzXHJcbiAgICAgICAgbGV0IHNlcmllc1BvaW50RnJvbVRpbWVTdGFtcCA9IG5lYXJlc3RTZXJpZXNQb2ludHNbbmVhcmVzdFNlcmllc0luZGV4XTtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIGEgcG9pbnQgaW5zdGFuY2Ugd2l0aCBhIG1hdGNoaW5nIHRpbWVzdGFtcFxyXG4gICAgICAgIGxldCBzZXJpZXNQb2ludCA9IHNlcmllc1BvaW50RnJvbVRpbWVTdGFtcCA/IG5ldyBQb2ludChzZXJpZXNQb2ludEZyb21UaW1lU3RhbXAueCwgc2VyaWVzUG9pbnRGcm9tVGltZVN0YW1wLnkpIDogbmV3IFBvaW50KHRpbWVzdGFtcCwgMCk7XHJcblxyXG4gICAgICAgIHJldHVybiBzZXJpZXNQb2ludDtcclxuICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgcHJvcGVydHkgY29udGFpbmluZyBkYXRhIHRvIGJlIGRyYXduXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBheGlzSURcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBCYXNpY0NoYXJ0XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBjcmVhdGVUcmFjZURhdGFTZXJpZXMoc2VyaWU6IEJhc2VTZXJpZXMsIGF4aXNJRDogc3RyaW5nKToge30ge1xyXG4gICAgICAgIGxldCBwcm9wZXJ0aWVzID0ge1xyXG4gICAgICAgICAgICBuYW1lOiBzZXJpZS5pZCxcclxuICAgICAgICAgICAgdHlwZTogJ2xpbmUnLFxyXG4gICAgICAgICAgICBkYXRhU291cmNlOiBzZXJpZS5kYXRhLFxyXG4gICAgICAgICAgICB4TmFtZTogXCJ4XCIsXHJcbiAgICAgICAgICAgIHlOYW1lOiBcInlcIixcclxuICAgICAgICAgICAgZmlsbDogc2VyaWUuY29sb3IsXHJcbiAgICAgICAgICAgIHlBeGlzTmFtZTogYXhpc0lELFxyXG4gICAgICAgICAgICBfeUF4aXNOYW1lOiBheGlzSUQsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHByb3BlcnRpZXM7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIE92ZXJsb2FkIG1ldGhvZHMgaW4gZGVyaXZlZCBjaGFydCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cclxuICAgIFxyXG4gICAgcHVibGljIHJlbW92ZVlTY2FsZUZyb21DaGFydCh5U2NhbGU6IFNjYWxlKXt9O1xyXG5cclxuICAgIHB1YmxpYyBvblN5bmNocm9uaXplU2NhbGVSYW5nZShzY2FsZSA6IFNjYWxlLCBtaW46bnVtYmVyLCBtYXg6bnVtYmVyKSB7fVxyXG5cclxuICAgIHB1YmxpYyBzZXRBdmFpbGFibGVTZXJpZXNBc0RhdGFTb3VyY2UoKXt9XHJcblxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVDaGFydFJhbmdlWCh4QXhpc01pblZhbHVlOiBudW1iZXIsIHhBeGlzTWF4VmFsdWU6IG51bWJlciApIHtcclxuICAgICAgICBsZXQgY2hhcnRSYW5nZUhlbHBlciA9IG5ldyBDaGFydFJhbmdlSGVscGVyKClcclxuXHJcblxyXG4gICAgICAgIGlmKHhBeGlzTWF4VmFsdWUgIT0gdW5kZWZpbmVkICYmIHhBeGlzTWluVmFsdWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgbGV0IHhBeGlzU2VnbWVudFJhbmdlID0geEF4aXNNYXhWYWx1ZSAtIHhBeGlzTWluVmFsdWU7XHJcbiAgICAgICAgICAgIGxldCB4QXhpc09mZnNldDtcclxuICAgICAgICAgICAgaWYoeEF4aXNTZWdtZW50UmFuZ2UgPT0gMCl7XHJcbiAgICAgICAgICAgICAgICB4QXhpc09mZnNldCA9IGNoYXJ0UmFuZ2VIZWxwZXIuZ2V0QXhpc09mZnNldEZvclN0cmFpZ2h0TGluZXModGhpcy5zZXJpZXNbMF0ucmF3UG9pbnRzWzBdLngpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBsZXQgYXhpcyA9IHRoaXMuY2hhcnQuZ2V0QXhpcyh0aGlzLnByaW1hcnlYQXhpc05hbWUpO1xyXG4gICAgICAgICAgICAgICAgaWYoYXhpcyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBheGlzUGl4ZWxSYW5nZSA9IGF4aXMuZ2V0QXhpc1JhbmdlSW5QaXhlbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHhBeGlzT2Zmc2V0ID0gY2hhcnRSYW5nZUhlbHBlci5nZXRBeGlzT2Zmc2V0KHhBeGlzU2VnbWVudFJhbmdlLCAoYXhpc1BpeGVsUmFuZ2UubWF4IC0gYXhpc1BpeGVsUmFuZ2UubWluKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICAgICAgeEF4aXNNYXhWYWx1ZSEgKz0geEF4aXNPZmZzZXQ7XHJcbiAgICAgICAgICAgIHhBeGlzTWluVmFsdWUhIC09IHhBeGlzT2Zmc2V0O1xyXG4gICAgICAgICAgICB4QXhpc1NlZ21lbnRSYW5nZSA9IHhBeGlzTWF4VmFsdWUgLSB4QXhpc01pblZhbHVlO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXRSYW5nZVgoeEF4aXNNaW5WYWx1ZSwgeEF4aXNNYXhWYWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGdldFRpbWVzdGFtcEluU2VyaWVzKHA6IFBvaW50LCBzZXJpZXMgOiBDaGFydFZpZXdTZXJpZVtdKTogbnVtYmVyIHsgcmV0dXJuIHAueDsgfVxyXG5cclxuICAgIHByb3RlY3RlZCBnZXRDdXJzb3JQb2ludChsZWFkQ3Vyc29yVGltZVN0YW1wOiBudW1iZXIsIHRpbWVzdGFtcDogbnVtYmVyLHNlcmllc0luZGV4Om51bWJlcik6IFRpbWVQb2ludCB7IHJldHVybiB7eDogdGltZXN0YW1wLHk6IDAsIHRpbWVzdGFtcDogdGltZXN0YW1wfTt9XHJcblxyXG4gICAgcHVibGljIGFkZFNlcmllRHJvcExvY2F0aW9ucyhzZXJpZTogQXJyYXk8QmFzZVNlcmllcz4sIGNoYXJ0TWFuYWdlckNoYXJ0KXt9O1xyXG5cclxuICAgIHByb3RlY3RlZCBhZGREcm9wTG9jYXRpb25zIChzZXJpZTogQmFzZVNlcmllcyl7fTtcclxuXHJcbiAgICBwdWJsaWMgZ2V0RHJvcExvY2F0aW9uVHlwZShjdXJyZW50VGFyZ2V0OiBhbnkpOiBEcm9wTG9jYXRpb25UeXBleyByZXR1cm4gRHJvcExvY2F0aW9uVHlwZS5pbnZhbGlkOyB9XHJcblxyXG4gICAgcHVibGljIGFkZFlTY2FsZShzY2FsZSA6IFNjYWxlLCBwb3NpdGlvbjogQXhpc1Bvc2l0aW9uKXt9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZURyb3BwYWJsZUFyZWFzKGN1cnJlbnRUYXJnZXQpIHt9O1xyXG5cclxuICAgIHB1YmxpYyByZXNldEhpZ2hsaWdodGluZygpe307XHJcbn1cclxuXHJcbmV4cG9ydCB7IENoYXJ0QmFzZSwgRXZlbnRSZWRyYXdBbGxDaGFydHMsIEV2ZW50UmVkcmF3QWxsQ2hhcnRzQXJncywgRXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbiwgRXZlbnRVc2VyQ2hhcnRJbnRlcmFjdGlvbkFyZ3MsIENoYXJ0T2JqZWN0VHlwZSwgRHJvcExvY2F0aW9uVHlwZSwgQ2hhcnRPYmplY3RJbmZvcm1hdGlvbn07XHJcblxyXG4iXX0=