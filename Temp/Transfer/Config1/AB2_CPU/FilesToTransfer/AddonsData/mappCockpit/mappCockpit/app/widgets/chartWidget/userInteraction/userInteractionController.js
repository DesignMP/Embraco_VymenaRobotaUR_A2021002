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
define(["require", "exports", "../../../framework/events", "./strategies/charStrategyInterface", "./strategies/cursorStrategy", "./strategies/chartPanningStrategy", "../../chartViewWidget/chartViewWidget", "./strategies/chartBoxZoomStrategy", "./strategies/cursorDragStrategy", "../ChartBase", "../../common/states/chartViewToolbarStates", "./strategies/axisPanningStrategy"], function (require, exports, events_1, charStrategyInterface_1, cursorStrategy_1, chartPanningStrategy_1, chartViewWidget_1, chartBoxZoomStrategy_1, cursorDragStrategy_1, ChartBase_1, chartViewToolbarStates_1, axisPanningStrategy_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventExecuteChartCommand = /** @class */ (function (_super) {
        __extends(EventExecuteChartCommand, _super);
        function EventExecuteChartCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventExecuteChartCommand;
    }(events_1.TypedEvent));
    exports.EventExecuteChartCommand = EventExecuteChartCommand;
    ;
    /**
     * Commands that can be used within the charts
     *
     * @enum {number}
     */
    var ChartCommandType;
    (function (ChartCommandType) {
        ChartCommandType[ChartCommandType["setCursorOnPointerPosition"] = 0] = "setCursorOnPointerPosition";
        ChartCommandType[ChartCommandType["resetZoom"] = 1] = "resetZoom";
        ChartCommandType[ChartCommandType["selectCursor"] = 2] = "selectCursor";
        ChartCommandType[ChartCommandType["checkCursorHovering"] = 3] = "checkCursorHovering";
        ChartCommandType[ChartCommandType["dragCursor"] = 4] = "dragCursor";
        ChartCommandType[ChartCommandType["endCursorDrag"] = 5] = "endCursorDrag";
        ChartCommandType[ChartCommandType["panChart"] = 6] = "panChart";
        ChartCommandType[ChartCommandType["toggleBoxZoom"] = 7] = "toggleBoxZoom";
        ChartCommandType[ChartCommandType["togglePanning"] = 8] = "togglePanning";
        ChartCommandType[ChartCommandType["selectZoomAxis"] = 9] = "selectZoomAxis";
        ChartCommandType[ChartCommandType["selectPanningAxes"] = 10] = "selectPanningAxes";
        ChartCommandType[ChartCommandType["zoomChart"] = 11] = "zoomChart";
        ChartCommandType[ChartCommandType["autoScale"] = 12] = "autoScale";
        ChartCommandType[ChartCommandType["resetDragPosition"] = 13] = "resetDragPosition";
        ChartCommandType[ChartCommandType["resetCursorHovering"] = 14] = "resetCursorHovering";
    })(ChartCommandType || (ChartCommandType = {}));
    exports.ChartCommandType = ChartCommandType;
    /**
     * ChartInteractionType
     *
     * @enum {number}
     */
    var MouseActionType;
    (function (MouseActionType) {
        MouseActionType[MouseActionType["mouseDown"] = 0] = "mouseDown";
        MouseActionType[MouseActionType["mouseUp"] = 1] = "mouseUp";
        MouseActionType[MouseActionType["mouseMove"] = 2] = "mouseMove";
        MouseActionType[MouseActionType["mouseWheel"] = 3] = "mouseWheel";
    })(MouseActionType || (MouseActionType = {}));
    exports.MouseActionType = MouseActionType;
    /**
     * ChartMouseState
     *
     * @enum {number}
     */
    var ChartMouseState;
    (function (ChartMouseState) {
        ChartMouseState[ChartMouseState["mouseUp"] = 0] = "mouseUp";
        ChartMouseState[ChartMouseState["mouseDown"] = 1] = "mouseDown";
        ChartMouseState[ChartMouseState["dragging"] = 2] = "dragging";
    })(ChartMouseState || (ChartMouseState = {}));
    /**
     * Arguments for EventExecuteChartCommand
     *
     * @class EventExecuteChartCommandArgs
     */
    var EventExecuteChartCommandArgs = /** @class */ (function () {
        function EventExecuteChartCommandArgs(caller, commandType, traceChart, data) {
            if (data === void 0) { data = {}; }
            this.caller = caller;
            this.commandType = commandType;
            this.traceChart = traceChart;
            this.data = data;
        }
        return EventExecuteChartCommandArgs;
    }());
    exports.EventExecuteChartCommandArgs = EventExecuteChartCommandArgs;
    /**
     * UserInteractionController
     *
     * @class UserInteractionController
     * @implements {IUserInteractionController}
     */
    var UserInteractionController = /** @class */ (function () {
        function UserInteractionController(states) {
            var _this = this;
            this.mouseDownPosition = [];
            this.zoomStep = 1.2;
            this.zoomDirection = chartViewWidget_1.ZoomDirection.XY;
            this.eventExecuteChartCommand = new EventExecuteChartCommand();
            this.mouseState = ChartMouseState.mouseUp;
            this.activeStrategies = [];
            this.selectCursor(1);
            this._states = states;
            this._states.observe(this, chartViewToolbarStates_1.ChartViewToolState, function (modifiedState, oldState) {
                _this.updateOnChartViewToolStateChange(modifiedState);
            }, "ChartViewToolState");
            this._states.observe(this, chartViewToolbarStates_1.ChartViewZoomDirectionState, function (modifiedState, oldState) {
                _this.updateOnChartViewZoomDirectionChange(modifiedState);
            }, "ChartViewZoomDirectionState");
            $(document).mouseup(function () { return _this.onMouseUpOutsideOfChart(); });
            $(document).mousemove(function (e) { return _this.onMouseMoveOutsideOfChart(e); });
        }
        UserInteractionController.prototype.updateOnChartViewToolStateChange = function (modifiedState) {
            switch (modifiedState.selectedTool) {
                case chartViewToolbarStates_1.ChartViewToolStateEnum.CURSORS: {
                    this.selectCursor(1);
                    break;
                }
                case chartViewToolbarStates_1.ChartViewToolStateEnum.PANNING:
                    this.setPanning();
                    break;
                case chartViewToolbarStates_1.ChartViewToolStateEnum.BOXZOOM:
                    this.setBoxZoom();
                    break;
            }
        };
        UserInteractionController.prototype.updateOnChartViewZoomDirectionChange = function (modifiedState) {
            switch (modifiedState.zoomDirection) {
                case chartViewWidget_1.ZoomDirection.X:
                    this.eventExecuteChartCommand.raise(this, new EventExecuteChartCommandArgs(this, ChartCommandType.selectZoomAxis, null, { zoomAxes: chartViewWidget_1.ZoomDirection.X }));
                    this.zoomDirection = chartViewWidget_1.ZoomDirection.X;
                    break;
                case chartViewWidget_1.ZoomDirection.Y:
                    this.eventExecuteChartCommand.raise(this, new EventExecuteChartCommandArgs(this, ChartCommandType.selectZoomAxis, null, { zoomAxes: chartViewWidget_1.ZoomDirection.Y }));
                    this.zoomDirection = chartViewWidget_1.ZoomDirection.Y;
                    break;
                case chartViewWidget_1.ZoomDirection.XY:
                    this.eventExecuteChartCommand.raise(this, new EventExecuteChartCommandArgs(this, ChartCommandType.selectZoomAxis, null, { zoomAxes: chartViewWidget_1.ZoomDirection.XY }));
                    this.zoomDirection = chartViewWidget_1.ZoomDirection.XY;
                    break;
            }
        };
        /**
         * method called when the user interacts with charts
         *
         * @param {MouseActionType} chartInteractionType
         * @param {ITraceChart} sender chart in which interaction happened
         * @param {*} args
         * @memberof UserInteractionController
         */
        UserInteractionController.prototype.onChartInteraction = function (chartInteractionType, sender, args) {
            switch (chartInteractionType) {
                case (MouseActionType.mouseDown):
                    this.onChartMouseDown(sender, args);
                    break;
                case (MouseActionType.mouseUp):
                    this.onChartMouseUp(sender, args);
                    break;
                case (MouseActionType.mouseMove):
                    this.onChartMouseMove(sender, args);
                    break;
                case (MouseActionType.mouseWheel):
                    this.onChartMouseWheel(sender, args);
                    break;
            }
        };
        /**
         *method called on mouse down event
         *
         * @private
         * @param {ITraceChart} sender chart in which mouseDown happened
         * @param {*} args
         * @memberof UserInteractionController
         */
        UserInteractionController.prototype.onChartMouseDown = function (sender, args) {
            this.mouseState = ChartMouseState.mouseDown;
            this.mouseDownPosition = [args.mousePoint.x, args.mousePoint.y];
            for (var i = 0; i < this.activeStrategies.length; i++) {
                args.objectUnderMouse = this.activeStrategies[i].onMouseDown(sender, args.objectUnderMouse, args.mousePoint);
            }
        };
        /**
         *method called on mouse up event
         *
         * @private
         * @param {ITraceChart} sender chart in which mouseUp happened
         * @param {*} args
         * @memberof UserInteractionController
         */
        UserInteractionController.prototype.onChartMouseUp = function (sender, args) {
            if (this.mouseDownPosition[0] != args.mousePoint.x || this.mouseDownPosition[1] != args.mousePoint.y) {
                for (var i = 0; i < this.activeStrategies.length; i++) {
                    this.activeStrategies[i].onDragEnd(sender, args.objectUnderMouse);
                }
            }
            else {
                for (var i = 0; i < this.activeStrategies.length; i++) {
                    this.activeStrategies[i].onClick(sender, args.objectUnderMouse, args.mousePoint);
                }
            }
            this.mouseState = ChartMouseState.mouseUp;
            this.mouseDownPosition = [];
        };
        UserInteractionController.prototype.onMouseUpOutsideOfChart = function () {
            if (this.mouseState == ChartMouseState.dragging) {
                for (var i = 0; i < this.activeStrategies.length; i++) {
                    this.activeStrategies[i].onDragEnd(undefined, new ChartBase_1.ChartObjectInformation(ChartBase_1.ChartObjectType.invalid, {}));
                }
            }
            this.mouseState = ChartMouseState.mouseUp;
            this.mouseDownPosition = [];
            this.eventExecuteChartCommand.raise(this, new EventExecuteChartCommandArgs(this, ChartCommandType.resetDragPosition, null, {}));
        };
        UserInteractionController.prototype.onMouseMoveOutsideOfChart = function (e) {
            this.eventExecuteChartCommand.raise(this, new EventExecuteChartCommandArgs(this, ChartCommandType.resetCursorHovering, null, { e: e }));
        };
        /**
         *method called on mouse move event
         *
         * @private
         * @param {ITraceChart} sender chart in which mouseDown happened
         * @param {*} args
         * @memberof UserInteractionController
         */
        UserInteractionController.prototype.onChartMouseMove = function (sender, args) {
            if (this.mouseState == ChartMouseState.mouseUp) {
                this.mouseHover(sender, args);
            }
            else {
                this.mouseDrag(sender, args);
            }
        };
        /**
         *method called when mouse is hovering above chart
         *
         * @private
         * @param {*} sender chart in which hover happened
         * @param {*} args
         * @memberof UserInteractionController
         */
        UserInteractionController.prototype.mouseHover = function (sender, args) {
            for (var i = 0; i < this.activeStrategies.length; i++) {
                this.activeStrategies[i].onMouseHover(sender, args.objectUnderMouse, args.mousePoint);
            }
        };
        /**
         *method called when mouse is draged on chart
         *
         * @private
         * @param {*} sender chart in which drag happened
         * @param {*} args
         * @memberof UserInteractionController
         */
        UserInteractionController.prototype.mouseDrag = function (sender, args) {
            this.mouseState = ChartMouseState.dragging;
            var activeStrategy = this.getActiveDragStrategy();
            if (activeStrategy != undefined) {
                activeStrategy.onDrag(sender, args);
            }
            else {
                for (var i = 0; i < this.activeStrategies.length; i++) {
                    this.activeStrategies[i].onDrag(sender, args);
                    if (this.activeStrategies[i].dragIsActive == true) {
                        break;
                    }
                }
            }
        };
        /**
         * checks if any drag operation is active and return corresponding strategy
         *
         * @private
         * @returns IChartInteractionStrategy | undefined
         * @memberof UserInteractionController
         */
        UserInteractionController.prototype.getActiveDragStrategy = function () {
            for (var i = 0; i < this.activeStrategies.length; i++) {
                if (this.activeStrategies[i].dragIsActive == true) {
                    return this.activeStrategies[i];
                }
            }
            return undefined;
        };
        /**
         *method called when mouse wheel changes
         *
         * @private
         * @param {ITraceChart} sender
         * @param {*} args
         * @memberof UserInteractionController
         */
        UserInteractionController.prototype.onChartMouseWheel = function (sender, args) {
            var zoomStep = this.zoomStep;
            if (args.wheelDelta > 0) {
                zoomStep = 1 / this.zoomStep;
            }
            if (args.objectUnderMouse.chartObjectType != ChartBase_1.ChartObjectType.emptySpace) {
                var axes = new Array();
                if (args.objectUnderMouse.chartObjectType == ChartBase_1.ChartObjectType.axis) {
                    axes.push(sender.chart.getAxis(args.objectUnderMouse.args.axis.getAxisID()));
                }
                this.eventExecuteChartCommand.raise(this, new EventExecuteChartCommandArgs(this, ChartCommandType.zoomChart, sender, { mousePoint: args.mousePoint, zoomStep: zoomStep, zoomDirection: this.zoomDirection, axes: axes }));
            }
        };
        /**
         * method called when the chartViewToolbar is clicked
         *
         * @param {IChartViewToolbar} sender
         * @param {*} args
         * @memberof UserInteractionController
         */
        UserInteractionController.prototype.onToolbarClick = function (sender, args) {
            //TODO: remove this method and use state updates instead
            if (args.groupNumber == 3) {
                this.eventExecuteChartCommand.raise(this, new EventExecuteChartCommandArgs(this, ChartCommandType.autoScale, null));
            }
            if (args.groupNumber == 4) {
                this.eventExecuteChartCommand.raise(this, new EventExecuteChartCommandArgs(this, ChartCommandType.resetZoom, null));
            }
        };
        /**
         *method used to execute a chart command
         *
         * @param {EventExecuteChartCommandArgs} executeChartCommandArgs
         * @memberof UserInteractionController
         */
        UserInteractionController.prototype.executeCommand = function (executeChartCommandArgs) {
            this.eventExecuteChartCommand.raise(this, executeChartCommandArgs);
        };
        /**
         * method to choose one of the cursors as active tool by index
         *
         * @param {number} cursorIndex
         * @memberof UserInteractionController
         */
        UserInteractionController.prototype.selectCursor = function (cursorIndex) {
            //let commandArguments = new EventExecuteChartCommandArgs(this,ChartCommandType.selectCursor, null, {cursorIndex : cursorIndex});
            //this.executeCommand(commandArguments);
            var commandArguments = new EventExecuteChartCommandArgs(this, ChartCommandType.toggleBoxZoom, null, { enabled: false });
            this.executeCommand(commandArguments);
            commandArguments = new EventExecuteChartCommandArgs(this, ChartCommandType.togglePanning, null, { enabled: false });
            this.executeCommand(commandArguments);
            this.clearActiveStrategies();
            this.activeStrategies.push(new axisPanningStrategy_1.AxisPanningStrategy(this));
            this.activeStrategies.push(new cursorStrategy_1.CursorInteractionStrategy(this, cursorIndex));
            this.activeStrategies.push(new cursorDragStrategy_1.CursorDragStrategy(this, cursorIndex));
        };
        /**
         * method to set panning as active tool
         *
         * @private
         * @memberof UserInteractionController
         */
        UserInteractionController.prototype.setPanning = function () {
            //this.removeStrategyFromList(ChartPanningStrategy);
            //this.removeStrategyFromList(ChartBoxZoomStrategy);
            //this.activeStrategies.unshift(new ChartPanningStrategy(this));
            this.clearActiveStrategies();
            this.activeStrategies.push(new axisPanningStrategy_1.AxisPanningStrategy(this));
            this.activeStrategies.push(new chartPanningStrategy_1.ChartPanningStrategy(this));
            this.activeStrategies.push(new cursorDragStrategy_1.CursorDragStrategy(this, 0));
            this.eventExecuteChartCommand.raise(this, new EventExecuteChartCommandArgs(this, ChartCommandType.toggleBoxZoom, null, { boxZoomEnabled: false }));
            this.eventExecuteChartCommand.raise(this, new EventExecuteChartCommandArgs(this, ChartCommandType.togglePanning, null, { panningEnabled: false }));
        };
        /**
         *method to set box zoom as active tool
         *
         * @private
         * @memberof UserInteractionController
         */
        UserInteractionController.prototype.setBoxZoom = function () {
            //this.removeStrategyFromList(ChartPanningStrategy);
            //this.removeStrategyFromList(ChartBoxZoomStrategy);
            this.clearActiveStrategies();
            this.activeStrategies.push(new axisPanningStrategy_1.AxisPanningStrategy(this));
            this.activeStrategies.unshift(new chartBoxZoomStrategy_1.ChartBoxZoomStrategy(this));
            this.activeStrategies.push(new cursorDragStrategy_1.CursorDragStrategy(this, 0));
            this.eventExecuteChartCommand.raise(this, new EventExecuteChartCommandArgs(this, ChartCommandType.toggleBoxZoom, null, { boxZoomEnabled: true }));
            this.eventExecuteChartCommand.raise(this, new EventExecuteChartCommandArgs(this, ChartCommandType.togglePanning, null, { panningEnabled: false }));
        };
        /**
         *removes all active strategys that are in place
         *
         * @private
         * @memberof UserInteractionController
         */
        UserInteractionController.prototype.clearActiveStrategies = function () {
            this.activeStrategies = [];
            this.activeStrategies.push(new charStrategyInterface_1.ChartIdleStrategy(this));
        };
        return UserInteractionController;
    }());
    exports.UserInteractionController = UserInteractionController;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlckludGVyYWN0aW9uQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jaGFydFdpZGdldC91c2VySW50ZXJhY3Rpb24vdXNlckludGVyYWN0aW9uQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBaUJBO1FBQXVDLDRDQUFxRTtRQUE1Rzs7UUFBOEcsQ0FBQztRQUFELCtCQUFDO0lBQUQsQ0FBQyxBQUEvRyxDQUF1QyxtQkFBVSxHQUE4RDtJQXVhNUUsNERBQXdCO0lBdmFvRCxDQUFDO0lBRWhIOzs7O09BSUc7SUFDSCxJQUFLLGdCQWdCSjtJQWhCRCxXQUFLLGdCQUFnQjtRQUNqQixtR0FBMEIsQ0FBQTtRQUMxQixpRUFBUyxDQUFBO1FBQ1QsdUVBQVksQ0FBQTtRQUNaLHFGQUFtQixDQUFBO1FBQ25CLG1FQUFVLENBQUE7UUFDVix5RUFBYSxDQUFBO1FBQ2IsK0RBQVEsQ0FBQTtRQUNSLHlFQUFhLENBQUE7UUFDYix5RUFBYSxDQUFBO1FBQ2IsMkVBQWMsQ0FBQTtRQUNkLGtGQUFpQixDQUFBO1FBQ2pCLGtFQUFTLENBQUE7UUFDVCxrRUFBUyxDQUFBO1FBQ1Qsa0ZBQWlCLENBQUE7UUFDakIsc0ZBQW1CLENBQUE7SUFDdkIsQ0FBQyxFQWhCSSxnQkFBZ0IsS0FBaEIsZ0JBQWdCLFFBZ0JwQjtJQWdaMEYsNENBQWdCO0lBOVkzRzs7OztPQUlHO0lBQ0gsSUFBSyxlQUtKO0lBTEQsV0FBSyxlQUFlO1FBQ2hCLCtEQUFTLENBQUE7UUFDVCwyREFBTyxDQUFBO1FBQ1AsK0RBQVMsQ0FBQTtRQUNULGlFQUFVLENBQUE7SUFDZCxDQUFDLEVBTEksZUFBZSxLQUFmLGVBQWUsUUFLbkI7SUFvWTRHLDBDQUFlO0lBbFk1SDs7OztPQUlHO0lBQ0gsSUFBSyxlQUlKO0lBSkQsV0FBSyxlQUFlO1FBQ2hCLDJEQUFPLENBQUE7UUFDUCwrREFBUyxDQUFBO1FBQ1QsNkRBQVEsQ0FBQTtJQUNaLENBQUMsRUFKSSxlQUFlLEtBQWYsZUFBZSxRQUluQjtJQUVEOzs7O09BSUc7SUFDSDtRQU1JLHNDQUFZLE1BQVcsRUFBRSxXQUE2QixFQUFFLFVBQTRCLEVBQUMsSUFBWTtZQUFaLHFCQUFBLEVBQUEsU0FBWTtZQUM3RixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUNyQixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztZQUMvQixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztZQUM3QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNyQixDQUFDO1FBRUwsbUNBQUM7SUFBRCxDQUFDLEFBYkQsSUFhQztJQXFXNEQsb0VBQTRCO0lBcFd6Rjs7Ozs7T0FLRztJQUNIO1FBZ0JJLG1DQUFZLE1BQWE7WUFBekIsaUJBbUJDO1lBOUJPLHNCQUFpQixHQUFhLEVBQUUsQ0FBQztZQUtqQyxhQUFRLEdBQVcsR0FBRyxDQUFDO1lBQ3ZCLGtCQUFhLEdBQW1CLCtCQUFhLENBQUMsRUFBRSxDQUFDO1lBTXJELElBQUksQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLHdCQUF3QixFQUFFLENBQUM7WUFFL0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxlQUFlLENBQUMsT0FBTyxDQUFBO1lBQ3pDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7WUFFM0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVyQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztZQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUMsMkNBQWtCLEVBQUUsVUFBQyxhQUFrQyxFQUFFLFFBQVE7Z0JBQ3ZGLEtBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUN6RCxDQUFDLEVBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUV4QixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUMsb0RBQTJCLEVBQUUsVUFBQyxhQUEyQyxFQUFFLFFBQVE7Z0JBQ3pHLEtBQUksQ0FBQyxvQ0FBb0MsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUM3RCxDQUFDLEVBQUMsNkJBQTZCLENBQUMsQ0FBQztZQUVqQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsdUJBQXVCLEVBQUUsRUFBOUIsQ0FBOEIsQ0FBQyxDQUFDO1lBQzFELENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxLQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQyxDQUFDLEVBQWpDLENBQWlDLENBQUMsQ0FBQztRQUNwRSxDQUFDO1FBRU8sb0VBQWdDLEdBQXhDLFVBQXlDLGFBQWtDO1lBQ3ZFLFFBQU8sYUFBYSxDQUFDLFlBQVksRUFBQztnQkFDOUIsS0FBSywrQ0FBc0IsQ0FBQyxPQUFPLENBQUMsQ0FBQTtvQkFDaEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDckIsTUFBTTtpQkFDVDtnQkFDRCxLQUFLLCtDQUFzQixDQUFDLE9BQU87b0JBQy9CLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDbEIsTUFBTTtnQkFDVixLQUFLLCtDQUFzQixDQUFDLE9BQU87b0JBQy9CLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDbEIsTUFBTTthQUNiO1FBQ0wsQ0FBQztRQUVPLHdFQUFvQyxHQUE1QyxVQUE2QyxhQUEwQztZQUNuRixRQUFPLGFBQWEsQ0FBQyxhQUFhLEVBQUM7Z0JBQy9CLEtBQUssK0JBQWEsQ0FBQyxDQUFDO29CQUNoQixJQUFJLENBQUMsd0JBQXdCLENBQUMsS0FBSyxDQUFDLElBQUksRUFBQyxJQUFJLDRCQUE0QixDQUFDLElBQUksRUFBRSxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsSUFBSSxFQUFFLEVBQUMsUUFBUSxFQUFFLCtCQUFhLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNySixJQUFJLENBQUMsYUFBYSxHQUFHLCtCQUFhLENBQUMsQ0FBQyxDQUFDO29CQUNyQyxNQUFNO2dCQUNWLEtBQUssK0JBQWEsQ0FBQyxDQUFDO29CQUNoQixJQUFJLENBQUMsd0JBQXdCLENBQUMsS0FBSyxDQUFDLElBQUksRUFBQyxJQUFJLDRCQUE0QixDQUFDLElBQUksRUFBRSxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsSUFBSSxFQUFFLEVBQUMsUUFBUSxFQUFFLCtCQUFhLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNySixJQUFJLENBQUMsYUFBYSxHQUFHLCtCQUFhLENBQUMsQ0FBQyxDQUFDO29CQUNyQyxNQUFNO2dCQUNWLEtBQUssK0JBQWEsQ0FBQyxFQUFFO29CQUNqQixJQUFJLENBQUMsd0JBQXdCLENBQUMsS0FBSyxDQUFDLElBQUksRUFBQyxJQUFJLDRCQUE0QixDQUFDLElBQUksRUFBRSxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsSUFBSSxFQUFFLEVBQUMsUUFBUSxFQUFFLCtCQUFhLENBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN0SixJQUFJLENBQUMsYUFBYSxHQUFHLCtCQUFhLENBQUMsRUFBRSxDQUFDO29CQUN0QyxNQUFNO2FBQ2I7UUFDTCxDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNJLHNEQUFrQixHQUF6QixVQUEwQixvQkFBcUMsRUFBRSxNQUFtQixFQUFFLElBQVM7WUFDM0YsUUFBUSxvQkFBb0IsRUFBQztnQkFDekIsS0FBSyxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUM7b0JBQzVCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUE7b0JBQ25DLE1BQU07Z0JBQ1YsS0FBSyxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUM7b0JBQzFCLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFBO29CQUNqQyxNQUFNO2dCQUNWLEtBQUssQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDO29CQUM1QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFBO29CQUNuQyxNQUFNO2dCQUNWLEtBQUssQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDO29CQUM3QixJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFBO29CQUNwQyxNQUFNO2FBQ2I7UUFDTCxDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNLLG9EQUFnQixHQUF4QixVQUF5QixNQUFtQixFQUFFLElBQXFCO1lBQy9ELElBQUksQ0FBQyxVQUFVLEdBQUcsZUFBZSxDQUFDLFNBQVMsQ0FBQztZQUM1QyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hFLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUNqRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUNoSDtRQUNMLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0ssa0RBQWMsR0FBdEIsVUFBdUIsTUFBbUIsRUFBRSxJQUFJO1lBQzVDLElBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBQztnQkFDaEcsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7b0JBQ2pELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2lCQUNyRTthQUNKO2lCQUNHO2dCQUNBLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO29CQUNqRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2lCQUNwRjthQUNKO1lBQ0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxlQUFlLENBQUMsT0FBTyxDQUFDO1lBQzFDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUM7UUFDaEMsQ0FBQztRQUVPLDJEQUF1QixHQUEvQjtZQUNJLElBQUcsSUFBSSxDQUFDLFVBQVUsSUFBSSxlQUFlLENBQUMsUUFBUSxFQUFDO2dCQUMzQyxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztvQkFDakQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxTQUFtQyxFQUFFLElBQUksa0NBQXNCLENBQUMsMkJBQWUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDcEk7YUFDSjtZQUVELElBQUksQ0FBQyxVQUFVLEdBQUcsZUFBZSxDQUFDLE9BQU8sQ0FBQztZQUMxQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO1lBRTVCLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFDLElBQUksNEJBQTRCLENBQUMsSUFBSSxFQUFFLGdCQUFnQixDQUFDLGlCQUFpQixFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ25JLENBQUM7UUFFTyw2REFBeUIsR0FBakMsVUFBa0MsQ0FBQztZQUMvQixJQUFJLENBQUMsd0JBQXdCLENBQUMsS0FBSyxDQUFDLElBQUksRUFBQyxJQUFJLDRCQUE0QixDQUFDLElBQUksRUFBRSxnQkFBZ0IsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsRUFBQyxDQUFDLEdBQUEsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUN0SSxDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNLLG9EQUFnQixHQUF4QixVQUF5QixNQUFtQixFQUFFLElBQUk7WUFDOUMsSUFBRyxJQUFJLENBQUMsVUFBVSxJQUFJLGVBQWUsQ0FBQyxPQUFPLEVBQUM7Z0JBQzFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2hDO2lCQUNHO2dCQUNBLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxDQUFDO2FBQy9CO1FBQ0wsQ0FBQztRQUdEOzs7Ozs7O1dBT0c7UUFDSyw4Q0FBVSxHQUFsQixVQUFtQixNQUFNLEVBQUUsSUFBSTtZQUMzQixLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztnQkFDakQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUN6RjtRQUNMLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0ssNkNBQVMsR0FBakIsVUFBa0IsTUFBTSxFQUFFLElBQUk7WUFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxlQUFlLENBQUMsUUFBUSxDQUFDO1lBRTNDLElBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQ2xELElBQUksY0FBYyxJQUFJLFNBQVMsRUFBQztnQkFDNUIsY0FBYyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDdkM7aUJBQ0c7Z0JBQ0EsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7b0JBQ2pELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUM5QyxJQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLElBQUksSUFBSSxFQUFDO3dCQUM3QyxNQUFNO3FCQUNUO2lCQUNKO2FBQ0o7UUFDTCxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0sseURBQXFCLEdBQTdCO1lBQ0ksS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQ2pELElBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksSUFBSSxJQUFJLEVBQUM7b0JBQzdDLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNuQzthQUNKO1lBQ0QsT0FBTyxTQUFTLENBQUM7UUFDckIsQ0FBQztRQUlEOzs7Ozs7O1dBT0c7UUFDSyxxREFBaUIsR0FBekIsVUFBMEIsTUFBbUIsRUFBRSxJQUFJO1lBQy9DLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDN0IsSUFBSSxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsRUFBRTtnQkFDckIsUUFBUSxHQUFHLENBQUMsR0FBQyxJQUFJLENBQUMsUUFBUSxDQUFBO2FBQzdCO1lBRUQsSUFBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxJQUFJLDJCQUFlLENBQUMsVUFBVSxFQUFDO2dCQUNuRSxJQUFJLElBQUksR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO2dCQUV2QixJQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLElBQUksMkJBQWUsQ0FBQyxJQUFJLEVBQUM7b0JBQzdELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUNoRjtnQkFFRCxJQUFJLENBQUMsd0JBQXdCLENBQUMsS0FBSyxDQUFDLElBQUksRUFBQyxJQUFJLDRCQUE0QixDQUFDLElBQUksRUFBRSxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLEVBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzFOO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNJLGtEQUFjLEdBQXJCLFVBQXNCLE1BQXlCLEVBQUUsSUFBSTtZQUVqRCx3REFBd0Q7WUFDeEQsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsRUFBQztnQkFDdEIsSUFBSSxDQUFDLHdCQUF3QixDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUMsSUFBSSw0QkFBNEIsQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7YUFDdEg7WUFDRCxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxFQUFDO2dCQUN0QixJQUFJLENBQUMsd0JBQXdCLENBQUMsS0FBSyxDQUFDLElBQUksRUFBQyxJQUFJLDRCQUE0QixDQUFDLElBQUksRUFBRSxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUN0SDtRQUNMLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNJLGtEQUFjLEdBQXJCLFVBQXNCLHVCQUFxRDtZQUN2RSxJQUFJLENBQUMsd0JBQXdCLENBQUMsS0FBSyxDQUFDLElBQUksRUFBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBQ3RFLENBQUM7UUFDRDs7Ozs7V0FLRztRQUNJLGdEQUFZLEdBQW5CLFVBQW9CLFdBQW9CO1lBQ3BDLGlJQUFpSTtZQUNqSSx3Q0FBd0M7WUFDeEMsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLDRCQUE0QixDQUFDLElBQUksRUFBRSxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsSUFBSSxFQUFFLEVBQUMsT0FBTyxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7WUFDdEgsSUFBSSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3RDLGdCQUFnQixHQUFHLElBQUksNEJBQTRCLENBQUMsSUFBSSxFQUFFLGdCQUFnQixDQUFDLGFBQWEsRUFBRSxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztZQUNsSCxJQUFJLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFFdEMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFFN0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLHlDQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDMUQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLDBDQUF5QixDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQzdFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSx1Q0FBa0IsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUMxRSxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSyw4Q0FBVSxHQUFsQjtZQUNJLG9EQUFvRDtZQUNwRCxvREFBb0Q7WUFDcEQsZ0VBQWdFO1lBQ2hFLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBRTdCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSx5Q0FBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzFELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSwyQ0FBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzNELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSx1Q0FBa0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUU1RCxJQUFJLENBQUMsd0JBQXdCLENBQUMsS0FBSyxDQUFDLElBQUksRUFBQyxJQUFJLDRCQUE0QixDQUFDLElBQUksRUFBRSxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsSUFBSSxFQUFFLEVBQUMsY0FBYyxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUMsQ0FBQztZQUNoSixJQUFJLENBQUMsd0JBQXdCLENBQUMsS0FBSyxDQUFDLElBQUksRUFBQyxJQUFJLDRCQUE0QixDQUFDLElBQUksRUFBRSxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsSUFBSSxFQUFFLEVBQUMsY0FBYyxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUMsQ0FBQztRQUNwSixDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSyw4Q0FBVSxHQUFsQjtZQUNJLG9EQUFvRDtZQUNwRCxvREFBb0Q7WUFDcEQsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFFN0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLHlDQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDMUQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxJQUFJLDJDQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDOUQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLHVDQUFrQixDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRzVELElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFDLElBQUksNEJBQTRCLENBQUMsSUFBSSxFQUFFLGdCQUFnQixDQUFDLGFBQWEsRUFBRSxJQUFJLEVBQUUsRUFBQyxjQUFjLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9JLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFDLElBQUksNEJBQTRCLENBQUMsSUFBSSxFQUFFLGdCQUFnQixDQUFDLGFBQWEsRUFBRSxJQUFJLEVBQUUsRUFBQyxjQUFjLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BKLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNLLHlEQUFxQixHQUE3QjtZQUNJLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLHlDQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDNUQsQ0FBQztRQUNMLGdDQUFDO0lBQUQsQ0FBQyxBQTVWRCxJQTRWQztJQUVPLDhEQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElUcmFjZUNoYXJ0IH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvdHJhY2VDaGFydEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJVXNlckludGVyYWN0aW9uQ29udHJvbGxlcn0gZnJvbSBcIi4vaW50ZXJmYWNlcy9jb250cm9sbGVySW50ZXJmYWNlXCJcclxuaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvZXZlbnRzXCI7XHJcbmltcG9ydCB7IElDaGFydFZpZXdUb29sYmFyIH0gZnJvbSBcIi4uLy4uL2NoYXJ0Vmlld1dpZGdldC90b29sYmFyL2ludGVyZmFjZXMvY2hhcnRWaWV3VG9vbGJhckludGVyZmFjZVwiXHJcbmltcG9ydCB7IElDaGFydEludGVyYWN0aW9uU3RyYXRlZ3ksIENoYXJ0SWRsZVN0cmF0ZWd5IH0gZnJvbSBcIi4vc3RyYXRlZ2llcy9jaGFyU3RyYXRlZ3lJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ3Vyc29ySW50ZXJhY3Rpb25TdHJhdGVneSB9IGZyb20gXCIuL3N0cmF0ZWdpZXMvY3Vyc29yU3RyYXRlZ3lcIjtcclxuaW1wb3J0IHsgQ2hhcnRQYW5uaW5nU3RyYXRlZ3kgfSBmcm9tIFwiLi9zdHJhdGVnaWVzL2NoYXJ0UGFubmluZ1N0cmF0ZWd5XCI7XHJcbmltcG9ydCB7IFpvb21EaXJlY3Rpb259IGZyb20gXCIuLi8uLi9jaGFydFZpZXdXaWRnZXQvY2hhcnRWaWV3V2lkZ2V0XCI7XHJcbmltcG9ydCB7IENoYXJ0Qm94Wm9vbVN0cmF0ZWd5IH0gZnJvbSBcIi4vc3RyYXRlZ2llcy9jaGFydEJveFpvb21TdHJhdGVneVwiO1xyXG5pbXBvcnQgeyBDdXJzb3JEcmFnU3RyYXRlZ3kgfSBmcm9tIFwiLi9zdHJhdGVnaWVzL2N1cnNvckRyYWdTdHJhdGVneVwiO1xyXG5pbXBvcnQgeyBDaGFydE9iamVjdFR5cGUsIENoYXJ0T2JqZWN0SW5mb3JtYXRpb24gfSBmcm9tIFwiLi4vQ2hhcnRCYXNlXCI7XHJcbmltcG9ydCB7IENoYXJ0Vmlld1Rvb2xTdGF0ZSwgQ2hhcnRWaWV3VG9vbFN0YXRlRW51bSwgQ2hhcnRWaWV3Wm9vbURpcmVjdGlvblN0YXRlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zdGF0ZXMvY2hhcnRWaWV3VG9vbGJhclN0YXRlc1wiO1xyXG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvc3RvcmVcIjtcclxuaW1wb3J0IHsgQXhpc1Bhbm5pbmdTdHJhdGVneSB9IGZyb20gXCIuL3N0cmF0ZWdpZXMvYXhpc1Bhbm5pbmdTdHJhdGVneVwiO1xyXG5pbXBvcnQgeyBFdmVudE1vdXNlQXJncyB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2ludGVyZmFjZXMvY29tcG9uZW50cy91aS9jaGFydC9jaGFydEludGVyZmFjZVwiO1xyXG5cclxuXHJcbmNsYXNzIEV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZCBleHRlbmRzIFR5cGVkRXZlbnQgPElVc2VySW50ZXJhY3Rpb25Db250cm9sbGVyLCBFdmVudEV4ZWN1dGVDaGFydENvbW1hbmRBcmdzPiB7fTtcclxuXHJcbi8qKlxyXG4gKiBDb21tYW5kcyB0aGF0IGNhbiBiZSB1c2VkIHdpdGhpbiB0aGUgY2hhcnRzXHJcbiAqXHJcbiAqIEBlbnVtIHtudW1iZXJ9XHJcbiAqL1xyXG5lbnVtIENoYXJ0Q29tbWFuZFR5cGUge1xyXG4gICAgc2V0Q3Vyc29yT25Qb2ludGVyUG9zaXRpb24sXHJcbiAgICByZXNldFpvb20sXHJcbiAgICBzZWxlY3RDdXJzb3IsXHJcbiAgICBjaGVja0N1cnNvckhvdmVyaW5nLFxyXG4gICAgZHJhZ0N1cnNvcixcclxuICAgIGVuZEN1cnNvckRyYWcsXHJcbiAgICBwYW5DaGFydCxcclxuICAgIHRvZ2dsZUJveFpvb20sXHJcbiAgICB0b2dnbGVQYW5uaW5nLFxyXG4gICAgc2VsZWN0Wm9vbUF4aXMsXHJcbiAgICBzZWxlY3RQYW5uaW5nQXhlcyxcclxuICAgIHpvb21DaGFydCxcclxuICAgIGF1dG9TY2FsZSxcclxuICAgIHJlc2V0RHJhZ1Bvc2l0aW9uLFxyXG4gICAgcmVzZXRDdXJzb3JIb3ZlcmluZ1xyXG59XHJcblxyXG4vKipcclxuICogQ2hhcnRJbnRlcmFjdGlvblR5cGVcclxuICpcclxuICogQGVudW0ge251bWJlcn1cclxuICovXHJcbmVudW0gTW91c2VBY3Rpb25UeXBlIHtcclxuICAgIG1vdXNlRG93bixcclxuICAgIG1vdXNlVXAsXHJcbiAgICBtb3VzZU1vdmUsXHJcbiAgICBtb3VzZVdoZWVsXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDaGFydE1vdXNlU3RhdGVcclxuICpcclxuICogQGVudW0ge251bWJlcn1cclxuICovXHJcbmVudW0gQ2hhcnRNb3VzZVN0YXRle1xyXG4gICAgbW91c2VVcCxcclxuICAgIG1vdXNlRG93bixcclxuICAgIGRyYWdnaW5nLFxyXG59XHJcblxyXG4vKipcclxuICogQXJndW1lbnRzIGZvciBFdmVudEV4ZWN1dGVDaGFydENvbW1hbmRcclxuICpcclxuICogQGNsYXNzIEV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZEFyZ3NcclxuICovXHJcbmNsYXNzIEV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZEFyZ3Mge1xyXG4gICAgY29tbWFuZFR5cGU6IENoYXJ0Q29tbWFuZFR5cGU7XHJcbiAgICBjYWxsZXI6IGFueTtcclxuICAgIHRyYWNlQ2hhcnQ6IElUcmFjZUNoYXJ0fG51bGw7XHJcbiAgICBkYXRhOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY2FsbGVyOiBhbnksIGNvbW1hbmRUeXBlOiBDaGFydENvbW1hbmRUeXBlLCB0cmFjZUNoYXJ0OiBJVHJhY2VDaGFydHxudWxsLGRhdGE6IGFueT17fSkge1xyXG4gICAgICAgIHRoaXMuY2FsbGVyID0gY2FsbGVyO1xyXG4gICAgICAgIHRoaXMuY29tbWFuZFR5cGUgPSBjb21tYW5kVHlwZTtcclxuICAgICAgICB0aGlzLnRyYWNlQ2hhcnQgPSB0cmFjZUNoYXJ0O1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICB9XHJcblxyXG59XHJcbi8qKlxyXG4gKiBVc2VySW50ZXJhY3Rpb25Db250cm9sbGVyXHJcbiAqXHJcbiAqIEBjbGFzcyBVc2VySW50ZXJhY3Rpb25Db250cm9sbGVyXHJcbiAqIEBpbXBsZW1lbnRzIHtJVXNlckludGVyYWN0aW9uQ29udHJvbGxlcn1cclxuICovXHJcbmNsYXNzIFVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXIgaW1wbGVtZW50cyBJVXNlckludGVyYWN0aW9uQ29udHJvbGxlcntcclxuXHJcbiAgICBldmVudEV4ZWN1dGVDaGFydENvbW1hbmQ6IEV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZDtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBtb3VzZVN0YXRlOiBDaGFydE1vdXNlU3RhdGU7XHJcbiAgICBwcml2YXRlIG1vdXNlRG93blBvc2l0aW9uOiBudW1iZXJbXSA9IFtdO1xyXG5cclxuXHJcbiAgICBwcml2YXRlIGFjdGl2ZVN0cmF0ZWdpZXM6IElDaGFydEludGVyYWN0aW9uU3RyYXRlZ3lbXTtcclxuXHJcbiAgICBwcml2YXRlIHpvb21TdGVwIDogbnVtYmVyPSAxLjI7XHJcbiAgICBwcml2YXRlIHpvb21EaXJlY3Rpb24gOiBab29tRGlyZWN0aW9uID0gWm9vbURpcmVjdGlvbi5YWTtcclxuXHJcbiAgICBwcml2YXRlIF9zdGF0ZXM6IFN0b3JlO1xyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzdGF0ZXM6IFN0b3JlKXtcclxuICAgICAgICB0aGlzLmV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZCA9IG5ldyBFdmVudEV4ZWN1dGVDaGFydENvbW1hbmQoKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLm1vdXNlU3RhdGUgPSBDaGFydE1vdXNlU3RhdGUubW91c2VVcFxyXG4gICAgICAgIHRoaXMuYWN0aXZlU3RyYXRlZ2llcyA9IFtdO1xyXG5cclxuICAgICAgICB0aGlzLnNlbGVjdEN1cnNvcigxKTtcclxuXHJcbiAgICAgICAgdGhpcy5fc3RhdGVzID0gc3RhdGVzO1xyXG4gICAgICAgIHRoaXMuX3N0YXRlcy5vYnNlcnZlKHRoaXMsQ2hhcnRWaWV3VG9vbFN0YXRlLCAobW9kaWZpZWRTdGF0ZSA6IENoYXJ0Vmlld1Rvb2xTdGF0ZSwgb2xkU3RhdGUpPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU9uQ2hhcnRWaWV3VG9vbFN0YXRlQ2hhbmdlKG1vZGlmaWVkU3RhdGUpO1xyXG4gICAgICAgIH0sXCJDaGFydFZpZXdUb29sU3RhdGVcIik7XHJcblxyXG4gICAgICAgIHRoaXMuX3N0YXRlcy5vYnNlcnZlKHRoaXMsQ2hhcnRWaWV3Wm9vbURpcmVjdGlvblN0YXRlLCAobW9kaWZpZWRTdGF0ZSA6IENoYXJ0Vmlld1pvb21EaXJlY3Rpb25TdGF0ZSwgb2xkU3RhdGUpPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU9uQ2hhcnRWaWV3Wm9vbURpcmVjdGlvbkNoYW5nZShtb2RpZmllZFN0YXRlKTtcclxuICAgICAgICB9LFwiQ2hhcnRWaWV3Wm9vbURpcmVjdGlvblN0YXRlXCIpO1xyXG5cclxuICAgICAgICAkKGRvY3VtZW50KS5tb3VzZXVwKCgpID0+IHRoaXMub25Nb3VzZVVwT3V0c2lkZU9mQ2hhcnQoKSk7XHJcbiAgICAgICAgJChkb2N1bWVudCkubW91c2Vtb3ZlKChlKSA9PiB0aGlzLm9uTW91c2VNb3ZlT3V0c2lkZU9mQ2hhcnQoZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlT25DaGFydFZpZXdUb29sU3RhdGVDaGFuZ2UobW9kaWZpZWRTdGF0ZSA6IENoYXJ0Vmlld1Rvb2xTdGF0ZSl7XHJcbiAgICAgICAgc3dpdGNoKG1vZGlmaWVkU3RhdGUuc2VsZWN0ZWRUb29sKXtcclxuICAgICAgICAgICAgY2FzZSBDaGFydFZpZXdUb29sU3RhdGVFbnVtLkNVUlNPUlM6e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RDdXJzb3IoMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIENoYXJ0Vmlld1Rvb2xTdGF0ZUVudW0uUEFOTklORzpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0UGFubmluZygpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQ2hhcnRWaWV3VG9vbFN0YXRlRW51bS5CT1haT09NOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRCb3hab29tKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVPbkNoYXJ0Vmlld1pvb21EaXJlY3Rpb25DaGFuZ2UobW9kaWZpZWRTdGF0ZTogQ2hhcnRWaWV3Wm9vbURpcmVjdGlvblN0YXRlKXtcclxuICAgICAgICBzd2l0Y2gobW9kaWZpZWRTdGF0ZS56b29tRGlyZWN0aW9uKXtcclxuICAgICAgICAgICAgY2FzZSBab29tRGlyZWN0aW9uLlg6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZC5yYWlzZSh0aGlzLG5ldyBFdmVudEV4ZWN1dGVDaGFydENvbW1hbmRBcmdzKHRoaXMsIENoYXJ0Q29tbWFuZFR5cGUuc2VsZWN0Wm9vbUF4aXMsIG51bGwsIHt6b29tQXhlczogWm9vbURpcmVjdGlvbi5YfSkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy56b29tRGlyZWN0aW9uID0gWm9vbURpcmVjdGlvbi5YO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgWm9vbURpcmVjdGlvbi5ZOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5ldmVudEV4ZWN1dGVDaGFydENvbW1hbmQucmFpc2UodGhpcyxuZXcgRXZlbnRFeGVjdXRlQ2hhcnRDb21tYW5kQXJncyh0aGlzLCBDaGFydENvbW1hbmRUeXBlLnNlbGVjdFpvb21BeGlzLCBudWxsLCB7em9vbUF4ZXM6IFpvb21EaXJlY3Rpb24uWX0pKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuem9vbURpcmVjdGlvbiA9IFpvb21EaXJlY3Rpb24uWTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFpvb21EaXJlY3Rpb24uWFk6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZC5yYWlzZSh0aGlzLG5ldyBFdmVudEV4ZWN1dGVDaGFydENvbW1hbmRBcmdzKHRoaXMsIENoYXJ0Q29tbWFuZFR5cGUuc2VsZWN0Wm9vbUF4aXMsIG51bGwsIHt6b29tQXhlczogWm9vbURpcmVjdGlvbi5YWX0pKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuem9vbURpcmVjdGlvbiA9IFpvb21EaXJlY3Rpb24uWFk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBtZXRob2QgY2FsbGVkIHdoZW4gdGhlIHVzZXIgaW50ZXJhY3RzIHdpdGggY2hhcnRzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNb3VzZUFjdGlvblR5cGV9IGNoYXJ0SW50ZXJhY3Rpb25UeXBlXHJcbiAgICAgKiBAcGFyYW0ge0lUcmFjZUNoYXJ0fSBzZW5kZXIgY2hhcnQgaW4gd2hpY2ggaW50ZXJhY3Rpb24gaGFwcGVuZWRcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIFVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIG9uQ2hhcnRJbnRlcmFjdGlvbihjaGFydEludGVyYWN0aW9uVHlwZTogTW91c2VBY3Rpb25UeXBlLCBzZW5kZXI6IElUcmFjZUNoYXJ0LCBhcmdzIDphbnkpe1xyXG4gICAgICAgIHN3aXRjaCAoY2hhcnRJbnRlcmFjdGlvblR5cGUpe1xyXG4gICAgICAgICAgICBjYXNlIChNb3VzZUFjdGlvblR5cGUubW91c2VEb3duKSA6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2hhcnRNb3VzZURvd24oc2VuZGVyLCBhcmdzKVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgKE1vdXNlQWN0aW9uVHlwZS5tb3VzZVVwKSA6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2hhcnRNb3VzZVVwKHNlbmRlciwgYXJncylcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIChNb3VzZUFjdGlvblR5cGUubW91c2VNb3ZlKSA6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2hhcnRNb3VzZU1vdmUoc2VuZGVyLCBhcmdzKVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7ICBcclxuICAgICAgICAgICAgY2FzZSAoTW91c2VBY3Rpb25UeXBlLm1vdXNlV2hlZWwpIDpcclxuICAgICAgICAgICAgICAgIHRoaXMub25DaGFydE1vdXNlV2hlZWwoc2VuZGVyLCBhcmdzKVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7ICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKm1ldGhvZCBjYWxsZWQgb24gbW91c2UgZG93biBldmVudFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0lUcmFjZUNoYXJ0fSBzZW5kZXIgY2hhcnQgaW4gd2hpY2ggbW91c2VEb3duIGhhcHBlbmVkXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBVc2VySW50ZXJhY3Rpb25Db250cm9sbGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25DaGFydE1vdXNlRG93bihzZW5kZXI6IElUcmFjZUNoYXJ0LCBhcmdzIDogRXZlbnRNb3VzZUFyZ3Mpe1xyXG4gICAgICAgIHRoaXMubW91c2VTdGF0ZSA9IENoYXJ0TW91c2VTdGF0ZS5tb3VzZURvd247XHJcbiAgICAgICAgdGhpcy5tb3VzZURvd25Qb3NpdGlvbiA9IFthcmdzLm1vdXNlUG9pbnQueCwgYXJncy5tb3VzZVBvaW50LnldO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmFjdGl2ZVN0cmF0ZWdpZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBhcmdzLm9iamVjdFVuZGVyTW91c2UgPSB0aGlzLmFjdGl2ZVN0cmF0ZWdpZXNbaV0ub25Nb3VzZURvd24oc2VuZGVyLCBhcmdzLm9iamVjdFVuZGVyTW91c2UsIGFyZ3MubW91c2VQb2ludCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICptZXRob2QgY2FsbGVkIG9uIG1vdXNlIHVwIGV2ZW50XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SVRyYWNlQ2hhcnR9IHNlbmRlciBjaGFydCBpbiB3aGljaCBtb3VzZVVwIGhhcHBlbmVkXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBVc2VySW50ZXJhY3Rpb25Db250cm9sbGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25DaGFydE1vdXNlVXAoc2VuZGVyOiBJVHJhY2VDaGFydCwgYXJncyl7XHJcbiAgICAgICAgaWYodGhpcy5tb3VzZURvd25Qb3NpdGlvblswXSAhPSBhcmdzLm1vdXNlUG9pbnQueCB8fCB0aGlzLm1vdXNlRG93blBvc2l0aW9uWzFdICE9IGFyZ3MubW91c2VQb2ludC55KXtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuYWN0aXZlU3RyYXRlZ2llcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZVN0cmF0ZWdpZXNbaV0ub25EcmFnRW5kKHNlbmRlciwgYXJncy5vYmplY3RVbmRlck1vdXNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5hY3RpdmVTdHJhdGVnaWVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlU3RyYXRlZ2llc1tpXS5vbkNsaWNrKHNlbmRlciwgYXJncy5vYmplY3RVbmRlck1vdXNlLCBhcmdzLm1vdXNlUG9pbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubW91c2VTdGF0ZSA9IENoYXJ0TW91c2VTdGF0ZS5tb3VzZVVwO1xyXG4gICAgICAgIHRoaXMubW91c2VEb3duUG9zaXRpb24gPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uTW91c2VVcE91dHNpZGVPZkNoYXJ0KCl7XHJcbiAgICAgICAgaWYodGhpcy5tb3VzZVN0YXRlID09IENoYXJ0TW91c2VTdGF0ZS5kcmFnZ2luZyl7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmFjdGl2ZVN0cmF0ZWdpZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVTdHJhdGVnaWVzW2ldLm9uRHJhZ0VuZCh1bmRlZmluZWQgYXMgdW5rbm93biBhcyBJVHJhY2VDaGFydCwgbmV3IENoYXJ0T2JqZWN0SW5mb3JtYXRpb24oQ2hhcnRPYmplY3RUeXBlLmludmFsaWQsIHt9KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5tb3VzZVN0YXRlID0gQ2hhcnRNb3VzZVN0YXRlLm1vdXNlVXA7XHJcbiAgICAgICAgdGhpcy5tb3VzZURvd25Qb3NpdGlvbiA9IFtdO1xyXG5cclxuICAgICAgICB0aGlzLmV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZC5yYWlzZSh0aGlzLG5ldyBFdmVudEV4ZWN1dGVDaGFydENvbW1hbmRBcmdzKHRoaXMsIENoYXJ0Q29tbWFuZFR5cGUucmVzZXREcmFnUG9zaXRpb24sIG51bGwgLHt9KSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbk1vdXNlTW92ZU91dHNpZGVPZkNoYXJ0KGUpIHtcclxuICAgICAgICB0aGlzLmV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZC5yYWlzZSh0aGlzLG5ldyBFdmVudEV4ZWN1dGVDaGFydENvbW1hbmRBcmdzKHRoaXMsIENoYXJ0Q29tbWFuZFR5cGUucmVzZXRDdXJzb3JIb3ZlcmluZywgbnVsbCAse2V9KSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKm1ldGhvZCBjYWxsZWQgb24gbW91c2UgbW92ZSBldmVudFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0lUcmFjZUNoYXJ0fSBzZW5kZXIgY2hhcnQgaW4gd2hpY2ggbW91c2VEb3duIGhhcHBlbmVkXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBVc2VySW50ZXJhY3Rpb25Db250cm9sbGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25DaGFydE1vdXNlTW92ZShzZW5kZXI6IElUcmFjZUNoYXJ0LCBhcmdzKXtcclxuICAgICAgICBpZih0aGlzLm1vdXNlU3RhdGUgPT0gQ2hhcnRNb3VzZVN0YXRlLm1vdXNlVXApe1xyXG4gICAgICAgICAgICB0aGlzLm1vdXNlSG92ZXIoc2VuZGVyLGFyZ3MpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLm1vdXNlRHJhZyhzZW5kZXIsYXJncyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqbWV0aG9kIGNhbGxlZCB3aGVuIG1vdXNlIGlzIGhvdmVyaW5nIGFib3ZlIGNoYXJ0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gc2VuZGVyIGNoYXJ0IGluIHdoaWNoIGhvdmVyIGhhcHBlbmVkXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBVc2VySW50ZXJhY3Rpb25Db250cm9sbGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbW91c2VIb3ZlcihzZW5kZXIsIGFyZ3Mpe1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmFjdGl2ZVN0cmF0ZWdpZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZVN0cmF0ZWdpZXNbaV0ub25Nb3VzZUhvdmVyKHNlbmRlciwgYXJncy5vYmplY3RVbmRlck1vdXNlLCBhcmdzLm1vdXNlUG9pbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqbWV0aG9kIGNhbGxlZCB3aGVuIG1vdXNlIGlzIGRyYWdlZCBvbiBjaGFydFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHNlbmRlciBjaGFydCBpbiB3aGljaCBkcmFnIGhhcHBlbmVkXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBVc2VySW50ZXJhY3Rpb25Db250cm9sbGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbW91c2VEcmFnKHNlbmRlciwgYXJncyl7XHJcbiAgICAgICAgdGhpcy5tb3VzZVN0YXRlID0gQ2hhcnRNb3VzZVN0YXRlLmRyYWdnaW5nO1xyXG5cclxuICAgICAgICBsZXQgYWN0aXZlU3RyYXRlZ3kgPSB0aGlzLmdldEFjdGl2ZURyYWdTdHJhdGVneSgpO1xyXG4gICAgICAgIGlmKCBhY3RpdmVTdHJhdGVneSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBhY3RpdmVTdHJhdGVneS5vbkRyYWcoc2VuZGVyLCBhcmdzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuYWN0aXZlU3RyYXRlZ2llcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZVN0cmF0ZWdpZXNbaV0ub25EcmFnKHNlbmRlciwgYXJncyk7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmFjdGl2ZVN0cmF0ZWdpZXNbaV0uZHJhZ0lzQWN0aXZlID09IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY2hlY2tzIGlmIGFueSBkcmFnIG9wZXJhdGlvbiBpcyBhY3RpdmUgYW5kIHJldHVybiBjb3JyZXNwb25kaW5nIHN0cmF0ZWd5XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIElDaGFydEludGVyYWN0aW9uU3RyYXRlZ3kgfCB1bmRlZmluZWRcclxuICAgICAqIEBtZW1iZXJvZiBVc2VySW50ZXJhY3Rpb25Db250cm9sbGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0QWN0aXZlRHJhZ1N0cmF0ZWd5KCkgOiBJQ2hhcnRJbnRlcmFjdGlvblN0cmF0ZWd5fHVuZGVmaW5lZCB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuYWN0aXZlU3RyYXRlZ2llcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuYWN0aXZlU3RyYXRlZ2llc1tpXS5kcmFnSXNBY3RpdmUgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5hY3RpdmVTdHJhdGVnaWVzW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKm1ldGhvZCBjYWxsZWQgd2hlbiBtb3VzZSB3aGVlbCBjaGFuZ2VzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SVRyYWNlQ2hhcnR9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgVXNlckludGVyYWN0aW9uQ29udHJvbGxlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uQ2hhcnRNb3VzZVdoZWVsKHNlbmRlcjogSVRyYWNlQ2hhcnQsIGFyZ3Mpe1xyXG4gICAgICAgIGxldCB6b29tU3RlcCA9IHRoaXMuem9vbVN0ZXA7ICAgIFxyXG4gICAgICAgIGlmIChhcmdzLndoZWVsRGVsdGEgPiAwKSB7XHJcbiAgICAgICAgICAgIHpvb21TdGVwID0gMS90aGlzLnpvb21TdGVwXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihhcmdzLm9iamVjdFVuZGVyTW91c2UuY2hhcnRPYmplY3RUeXBlICE9IENoYXJ0T2JqZWN0VHlwZS5lbXB0eVNwYWNlKXsgICAgICBcclxuICAgICAgICAgICAgbGV0IGF4ZXMgPSBuZXcgQXJyYXkoKTtcclxuXHJcbiAgICAgICAgICAgIGlmKGFyZ3Mub2JqZWN0VW5kZXJNb3VzZS5jaGFydE9iamVjdFR5cGUgPT0gQ2hhcnRPYmplY3RUeXBlLmF4aXMpe1xyXG4gICAgICAgICAgICAgICAgYXhlcy5wdXNoKHNlbmRlci5jaGFydC5nZXRBeGlzKGFyZ3Mub2JqZWN0VW5kZXJNb3VzZS5hcmdzLmF4aXMuZ2V0QXhpc0lEKCkpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5ldmVudEV4ZWN1dGVDaGFydENvbW1hbmQucmFpc2UodGhpcyxuZXcgRXZlbnRFeGVjdXRlQ2hhcnRDb21tYW5kQXJncyh0aGlzLCBDaGFydENvbW1hbmRUeXBlLnpvb21DaGFydCwgc2VuZGVyICx7bW91c2VQb2ludDogYXJncy5tb3VzZVBvaW50LCB6b29tU3RlcDogem9vbVN0ZXAsIHpvb21EaXJlY3Rpb246IHRoaXMuem9vbURpcmVjdGlvbiwgYXhlczogYXhlc30pKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBtZXRob2QgY2FsbGVkIHdoZW4gdGhlIGNoYXJ0Vmlld1Rvb2xiYXIgaXMgY2xpY2tlZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SUNoYXJ0Vmlld1Rvb2xiYXJ9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgVXNlckludGVyYWN0aW9uQ29udHJvbGxlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb25Ub29sYmFyQ2xpY2soc2VuZGVyOiBJQ2hhcnRWaWV3VG9vbGJhciwgYXJncyl7XHJcblxyXG4gICAgICAgIC8vVE9ETzogcmVtb3ZlIHRoaXMgbWV0aG9kIGFuZCB1c2Ugc3RhdGUgdXBkYXRlcyBpbnN0ZWFkXHJcbiAgICAgICAgaWYgKGFyZ3MuZ3JvdXBOdW1iZXIgPT0gMyl7XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRFeGVjdXRlQ2hhcnRDb21tYW5kLnJhaXNlKHRoaXMsbmV3IEV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZEFyZ3ModGhpcywgQ2hhcnRDb21tYW5kVHlwZS5hdXRvU2NhbGUsIG51bGwpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGFyZ3MuZ3JvdXBOdW1iZXIgPT0gNCl7XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRFeGVjdXRlQ2hhcnRDb21tYW5kLnJhaXNlKHRoaXMsbmV3IEV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZEFyZ3ModGhpcywgQ2hhcnRDb21tYW5kVHlwZS5yZXNldFpvb20sIG51bGwpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKm1ldGhvZCB1c2VkIHRvIGV4ZWN1dGUgYSBjaGFydCBjb21tYW5kXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtFdmVudEV4ZWN1dGVDaGFydENvbW1hbmRBcmdzfSBleGVjdXRlQ2hhcnRDb21tYW5kQXJnc1xyXG4gICAgICogQG1lbWJlcm9mIFVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGV4ZWN1dGVDb21tYW5kKGV4ZWN1dGVDaGFydENvbW1hbmRBcmdzOiBFdmVudEV4ZWN1dGVDaGFydENvbW1hbmRBcmdzKXtcclxuICAgICAgICB0aGlzLmV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZC5yYWlzZSh0aGlzLGV4ZWN1dGVDaGFydENvbW1hbmRBcmdzKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogbWV0aG9kIHRvIGNob29zZSBvbmUgb2YgdGhlIGN1cnNvcnMgYXMgYWN0aXZlIHRvb2wgYnkgaW5kZXhcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY3Vyc29ySW5kZXhcclxuICAgICAqIEBtZW1iZXJvZiBVc2VySW50ZXJhY3Rpb25Db250cm9sbGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZWxlY3RDdXJzb3IoY3Vyc29ySW5kZXggOiBudW1iZXIpe1xyXG4gICAgICAgIC8vbGV0IGNvbW1hbmRBcmd1bWVudHMgPSBuZXcgRXZlbnRFeGVjdXRlQ2hhcnRDb21tYW5kQXJncyh0aGlzLENoYXJ0Q29tbWFuZFR5cGUuc2VsZWN0Q3Vyc29yLCBudWxsLCB7Y3Vyc29ySW5kZXggOiBjdXJzb3JJbmRleH0pO1xyXG4gICAgICAgIC8vdGhpcy5leGVjdXRlQ29tbWFuZChjb21tYW5kQXJndW1lbnRzKTtcclxuICAgICAgICBsZXQgY29tbWFuZEFyZ3VtZW50cyA9IG5ldyBFdmVudEV4ZWN1dGVDaGFydENvbW1hbmRBcmdzKHRoaXMsIENoYXJ0Q29tbWFuZFR5cGUudG9nZ2xlQm94Wm9vbSwgbnVsbCwge2VuYWJsZWQ6IGZhbHNlfSk7XHJcbiAgICAgICAgdGhpcy5leGVjdXRlQ29tbWFuZChjb21tYW5kQXJndW1lbnRzKTtcclxuICAgICAgICBjb21tYW5kQXJndW1lbnRzID0gbmV3IEV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZEFyZ3ModGhpcywgQ2hhcnRDb21tYW5kVHlwZS50b2dnbGVQYW5uaW5nLCBudWxsLCB7ZW5hYmxlZDogZmFsc2V9KTtcclxuICAgICAgICB0aGlzLmV4ZWN1dGVDb21tYW5kKGNvbW1hbmRBcmd1bWVudHMpO1xyXG5cclxuICAgICAgICB0aGlzLmNsZWFyQWN0aXZlU3RyYXRlZ2llcygpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuYWN0aXZlU3RyYXRlZ2llcy5wdXNoKG5ldyBBeGlzUGFubmluZ1N0cmF0ZWd5KHRoaXMpKTtcclxuICAgICAgICB0aGlzLmFjdGl2ZVN0cmF0ZWdpZXMucHVzaChuZXcgQ3Vyc29ySW50ZXJhY3Rpb25TdHJhdGVneSh0aGlzLCBjdXJzb3JJbmRleCkpO1xyXG4gICAgICAgIHRoaXMuYWN0aXZlU3RyYXRlZ2llcy5wdXNoKG5ldyBDdXJzb3JEcmFnU3RyYXRlZ3kodGhpcywgY3Vyc29ySW5kZXgpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIG1ldGhvZCB0byBzZXQgcGFubmluZyBhcyBhY3RpdmUgdG9vbFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVXNlckludGVyYWN0aW9uQ29udHJvbGxlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldFBhbm5pbmcoKXtcclxuICAgICAgICAvL3RoaXMucmVtb3ZlU3RyYXRlZ3lGcm9tTGlzdChDaGFydFBhbm5pbmdTdHJhdGVneSk7XHJcbiAgICAgICAgLy90aGlzLnJlbW92ZVN0cmF0ZWd5RnJvbUxpc3QoQ2hhcnRCb3hab29tU3RyYXRlZ3kpO1xyXG4gICAgICAgIC8vdGhpcy5hY3RpdmVTdHJhdGVnaWVzLnVuc2hpZnQobmV3IENoYXJ0UGFubmluZ1N0cmF0ZWd5KHRoaXMpKTtcclxuICAgICAgICB0aGlzLmNsZWFyQWN0aXZlU3RyYXRlZ2llcygpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuYWN0aXZlU3RyYXRlZ2llcy5wdXNoKG5ldyBBeGlzUGFubmluZ1N0cmF0ZWd5KHRoaXMpKTtcclxuICAgICAgICB0aGlzLmFjdGl2ZVN0cmF0ZWdpZXMucHVzaChuZXcgQ2hhcnRQYW5uaW5nU3RyYXRlZ3kodGhpcykpO1xyXG4gICAgICAgIHRoaXMuYWN0aXZlU3RyYXRlZ2llcy5wdXNoKG5ldyBDdXJzb3JEcmFnU3RyYXRlZ3kodGhpcywgMCkpO1xyXG5cclxuICAgICAgICB0aGlzLmV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZC5yYWlzZSh0aGlzLG5ldyBFdmVudEV4ZWN1dGVDaGFydENvbW1hbmRBcmdzKHRoaXMsIENoYXJ0Q29tbWFuZFR5cGUudG9nZ2xlQm94Wm9vbSwgbnVsbCwge2JveFpvb21FbmFibGVkOiBmYWxzZX0pKTtcclxuICAgICAgICB0aGlzLmV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZC5yYWlzZSh0aGlzLG5ldyBFdmVudEV4ZWN1dGVDaGFydENvbW1hbmRBcmdzKHRoaXMsIENoYXJ0Q29tbWFuZFR5cGUudG9nZ2xlUGFubmluZywgbnVsbCwge3Bhbm5pbmdFbmFibGVkOiBmYWxzZX0pKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqbWV0aG9kIHRvIHNldCBib3ggem9vbSBhcyBhY3RpdmUgdG9vbFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVXNlckludGVyYWN0aW9uQ29udHJvbGxlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldEJveFpvb20oKXtcclxuICAgICAgICAvL3RoaXMucmVtb3ZlU3RyYXRlZ3lGcm9tTGlzdChDaGFydFBhbm5pbmdTdHJhdGVneSk7XHJcbiAgICAgICAgLy90aGlzLnJlbW92ZVN0cmF0ZWd5RnJvbUxpc3QoQ2hhcnRCb3hab29tU3RyYXRlZ3kpO1xyXG4gICAgICAgIHRoaXMuY2xlYXJBY3RpdmVTdHJhdGVnaWVzKCk7XHJcblxyXG4gICAgICAgIHRoaXMuYWN0aXZlU3RyYXRlZ2llcy5wdXNoKG5ldyBBeGlzUGFubmluZ1N0cmF0ZWd5KHRoaXMpKTtcclxuICAgICAgICB0aGlzLmFjdGl2ZVN0cmF0ZWdpZXMudW5zaGlmdChuZXcgQ2hhcnRCb3hab29tU3RyYXRlZ3kodGhpcykpO1xyXG4gICAgICAgIHRoaXMuYWN0aXZlU3RyYXRlZ2llcy5wdXNoKG5ldyBDdXJzb3JEcmFnU3RyYXRlZ3kodGhpcywgMCkpO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5ldmVudEV4ZWN1dGVDaGFydENvbW1hbmQucmFpc2UodGhpcyxuZXcgRXZlbnRFeGVjdXRlQ2hhcnRDb21tYW5kQXJncyh0aGlzLCBDaGFydENvbW1hbmRUeXBlLnRvZ2dsZUJveFpvb20sIG51bGwsIHtib3hab29tRW5hYmxlZDogdHJ1ZX0pKTtcclxuICAgICAgICB0aGlzLmV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZC5yYWlzZSh0aGlzLG5ldyBFdmVudEV4ZWN1dGVDaGFydENvbW1hbmRBcmdzKHRoaXMsIENoYXJ0Q29tbWFuZFR5cGUudG9nZ2xlUGFubmluZywgbnVsbCwge3Bhbm5pbmdFbmFibGVkOiBmYWxzZX0pKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqcmVtb3ZlcyBhbGwgYWN0aXZlIHN0cmF0ZWd5cyB0aGF0IGFyZSBpbiBwbGFjZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVXNlckludGVyYWN0aW9uQ29udHJvbGxlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNsZWFyQWN0aXZlU3RyYXRlZ2llcygpe1xyXG4gICAgICAgIHRoaXMuYWN0aXZlU3RyYXRlZ2llcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuYWN0aXZlU3RyYXRlZ2llcy5wdXNoKG5ldyBDaGFydElkbGVTdHJhdGVneSh0aGlzKSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7VXNlckludGVyYWN0aW9uQ29udHJvbGxlciwgRXZlbnRFeGVjdXRlQ2hhcnRDb21tYW5kLCBFdmVudEV4ZWN1dGVDaGFydENvbW1hbmRBcmdzLCBDaGFydENvbW1hbmRUeXBlLCBNb3VzZUFjdGlvblR5cGV9Il19