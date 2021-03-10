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
define(["require", "exports", "../../common/widgetBase", "../../common/themeProvider", "../../../common/directoryProvider", "../../../framework/events", "../../common/states/cursorStates", "../../common/states/chartViewToolbarStates", "../chartViewWidget"], function (require, exports, widgetBase_1, themeProvider_1, directoryProvider_1, events_1, cursorStates_1, chartViewToolbarStates_1, chartViewWidget_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Enum of ChartViewToolbarButtonIds
     *
     * @enum {number}
     */
    var ChartViewToolbarButtonId;
    (function (ChartViewToolbarButtonId) {
        ChartViewToolbarButtonId["RefCursor1"] = "RefCursor1";
        ChartViewToolbarButtonId["RefCursor2"] = "RefCursor2";
        ChartViewToolbarButtonId["Panning"] = "Panning";
        ChartViewToolbarButtonId["BoxZoom"] = "BoxZoom";
        ChartViewToolbarButtonId["ZoomX"] = "ZoomX";
        ChartViewToolbarButtonId["ZoomY"] = "ZoomY";
        ChartViewToolbarButtonId["ZoomXY"] = "ZoomXY";
        ChartViewToolbarButtonId["ResetZoom"] = "ResetZoom";
        ChartViewToolbarButtonId["AutoScale"] = "AutoScale";
    })(ChartViewToolbarButtonId || (ChartViewToolbarButtonId = {}));
    exports.ChartViewToolbarButtonId = ChartViewToolbarButtonId;
    var EventToolbarButtonClicked = /** @class */ (function (_super) {
        __extends(EventToolbarButtonClicked, _super);
        function EventToolbarButtonClicked() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventToolbarButtonClicked;
    }(events_1.TypedEvent));
    exports.EventToolbarButtonClicked = EventToolbarButtonClicked;
    ;
    var EventToolbarButtonClickedArgs = /** @class */ (function () {
        function EventToolbarButtonClickedArgs(selectedButton, groupNumber) {
            this.groupNumber = 0;
            this.groupNumber = groupNumber;
            this.selectedButton = selectedButton;
        }
        return EventToolbarButtonClickedArgs;
    }());
    /**
     *Toolbar for ChartViewWidget
     *
     * @class ChartViewToolbar
     * @extends {WidgetBase}
     * @implements {IChartViewToolbar}
     */
    var ChartViewToolbar = /** @class */ (function (_super) {
        __extends(ChartViewToolbar, _super);
        function ChartViewToolbar() {
            var _this = _super.call(this) || this;
            _this.toolbarButtonGroup1 = [];
            _this.toolbarButtonGroup2 = [];
            _this.toolbarButtonGroup3 = [];
            _this.cursorStatesId = "CursorStates";
            _this.eventToolbarButtonClicked = new EventToolbarButtonClicked();
            return _this;
        }
        /**
         * Dispose the chart view toolbar
         *
         * @memberof ChartViewToolbar
         */
        ChartViewToolbar.prototype.dispose = function () {
            var toolbar = $(this.cssParentContentId).data("ejToolbar");
            if (toolbar != undefined) {
                toolbar.destroy();
            }
            _super.prototype.dispose.call(this);
        };
        ChartViewToolbar.prototype.initialize = function (layoutContainerId) {
            _super.prototype.initialize.call(this, layoutContainerId);
            this.toolbarButtonGroup1.push(ChartViewToolbarButtonId.RefCursor1);
            this.toolbarButtonGroup1.push(ChartViewToolbarButtonId.RefCursor2);
            this.toolbarButtonGroup3.push(ChartViewToolbarButtonId.Panning);
            this.toolbarButtonGroup3.push(ChartViewToolbarButtonId.BoxZoom);
            this.toolbarButtonGroup2.push(ChartViewToolbarButtonId.ZoomX);
            this.toolbarButtonGroup2.push(ChartViewToolbarButtonId.ZoomXY);
            this.toolbarButtonGroup2.push(ChartViewToolbarButtonId.ZoomY);
            this.observeCursorStatesChange();
            this.observeChartViewToolStateChange();
            this.observeChartViewZoomDirectionStateChange();
        };
        /**
         * observes the cursor state for changes
         *
         * @private
         * @memberof ChartViewToolbar
         */
        ChartViewToolbar.prototype.observeCursorStatesChange = function () {
            var _this = this;
            this.states.observe(cursorStates_1.CursorStates, function (modifiedItem, item) {
                _this.updateOnCursorStatesChanges(modifiedItem);
            }, this.cursorStatesId);
        };
        ChartViewToolbar.prototype.observeChartViewToolStateChange = function () {
            var _this = this;
            this.states.observe(chartViewToolbarStates_1.ChartViewToolState, function (modifiedItem, item) {
                _this.updateOnChartViewToolStateChange(modifiedItem);
            }, "ChartViewToolState");
        };
        ChartViewToolbar.prototype.observeChartViewZoomDirectionStateChange = function () {
            var _this = this;
            this.states.observe(chartViewToolbarStates_1.ChartViewZoomDirectionState, function (modifiedItem, item) {
                _this.updateOnChartViewZoomDirectionStateChange(modifiedItem);
            }, "ChartViewZoomDirectionState");
        };
        /**
         * create the ChartViewToolbars Layout
         *
         * @memberof ChartViewToolbar
         */
        ChartViewToolbar.prototype.createLayout = function () {
            var _this = this;
            this.addLayoutDivs();
            $(this.cssParentContentId).ejToolbar({
                width: "100%",
                enableSeparator: true,
                height: 33,
                click: function (args) { return _this.onChartViewToolbarClick(args.currentTarget.id); }
            });
            var toolbarInstance = $(this.cssParentContentId).ejToolbar("instance");
            toolbarInstance.selectItemByID(ChartViewToolbarButtonId.RefCursor1);
            toolbarInstance.selectItemByID(ChartViewToolbarButtonId.ZoomXY);
        };
        /**
         * add the needed html code for the toolbar
         *
         * @private
         * @memberof ChartViewToolbar
         */
        ChartViewToolbar.prototype.addLayoutDivs = function () {
            $(this.cssParentContentId).append("<ul> " +
                "<li id='" + ChartViewToolbarButtonId.RefCursor1 + "' style='background-image: url(" + this.getImagePath("cursor1.svg") + "); background-repeat: no-repeat; padding: 0px; margin: 0px; background-size: 24px 24px; height: 30px; width: 30px; background-position: center center;' title='Cursor 1'> </li>" +
                "<li id='" + ChartViewToolbarButtonId.RefCursor2 + "' style='background-image: url(" + this.getImagePath("cursor2.svg") + "); background-repeat: no-repeat; padding: 0px; margin: 0px; background-size: 24px 24px; height: 30px; width: 30px; background-position: center center;' title='Cursor 2'> </li>" +
                "</ul>" +
                "<ul> " +
                "<li id='" + ChartViewToolbarButtonId.Panning + "' style='background-image: url(" + this.getImagePath("panning.svg") + "); background-repeat: no-repeat; padding: 0px; margin: 0px; background-size: 24px 24px; height: 30px; width: 30px; background-position: center center;' title='Panning'> </li>" +
                "<li id='" + ChartViewToolbarButtonId.BoxZoom + "' style='background-image: url(" + this.getImagePath("box_zoom.svg") + "); background-repeat: no-repeat; padding: 0px; margin: 0px; background-size: 24px 24px; height: 30px; width: 30px; background-position: center center;' title='BoxZoom'> </li>" +
                "</ul>" +
                "<ul> " +
                "<li id='" + ChartViewToolbarButtonId.ZoomXY + "' style='background-image: url(" + this.getImagePath("zoomXY.svg") + "); background-repeat: no-repeat; padding: 0px; margin: 0px; background-size: 24px 24px; height: 30px; width: 30px; background-position: center center;' title='Zoom XY '> </li>" +
                "<li id='" + ChartViewToolbarButtonId.ZoomX + "' style='background-image: url(" + this.getImagePath("zoomX.svg") + "); background-repeat: no-repeat; padding: 0px; margin: 0px; background-size: 24px 24px; height: 30px; width: 30px; background-position: center center;' title='Zoom X'> </li>" +
                "<li id='" + ChartViewToolbarButtonId.ZoomY + "' style='background-image: url(" + this.getImagePath("zoomY.svg") + "); background-repeat: no-repeat; padding: 0px; margin: 0px; background-size: 24px 24px; height: 30px; width: 30px; background-position: center center;' title='Zoom Y'> </li>" +
                "</ul>" +
                "<ul> " +
                "<li id='" + ChartViewToolbarButtonId.AutoScale + "' style='background-image: url(" + this.getImagePath("zoom_autoscale.svg") + "); background-repeat: no-repeat; padding: 0px; margin: 0px; background-size: 24px 24px; height: 30px; width: 30px; background-position: center center;' title='Auto Scale'> </li>" +
                "<li id='" + ChartViewToolbarButtonId.ResetZoom + "' style='background-image: url(" + this.getImagePath("zoom_reset_all.svg") + "); background-repeat: no-repeat; padding: 0px; margin: 0px; background-size: 24px 24px; height: 30px; width: 30px; background-position: center center;' title='Reset All'> </li>" +
                "</ul>");
        };
        /**
         * return the Path of an image by its name
         *
         * @private
         * @param {string} imageName
         * @returns {string}
         * @memberof ChartViewToolbar
         */
        ChartViewToolbar.prototype.getImagePath = function (imageName) {
            return themeProvider_1.ThemeProvider.getInstance().getThemedFilePath("../../" + directoryProvider_1.DirectoryProvider.getWidgetsDirectory() + "chartViewWidget/style/images/toolbar/" + imageName);
        };
        /**
         *  deselect all toolbar items and remove highlighting
         *
         * @private
         * @memberof ChartViewToolbar
         */
        ChartViewToolbar.prototype.deselectToolbarGroup = function (toolbarGroup) {
            var toolbarInstance = $(this.cssParentContentId).ejToolbar("instance");
            for (var i = 0; i < toolbarGroup.length; i++) {
                toolbarInstance.deselectItemByID(toolbarGroup[i]);
            }
        };
        /**
         * react on a mouse click on one of the toolbars buttons
         *
         * @private
         * @param {ChartViewToolbarButtonId} buttonID
         * @memberof ChartViewToolbar
         */
        ChartViewToolbar.prototype.onChartViewToolbarClick = function (buttonID) {
            var toolstate = this.states.read(chartViewToolbarStates_1.ChartViewToolState, "ChartViewToolState");
            var cursorState = this.states.read(cursorStates_1.CursorStates, this.cursorStatesId);
            var zoomDirectionState = this.states.read(chartViewToolbarStates_1.ChartViewZoomDirectionState, "ChartViewZoomDirectionState");
            switch (buttonID) {
                case ChartViewToolbarButtonId.BoxZoom:
                    toolstate.selectedTool = chartViewToolbarStates_1.ChartViewToolStateEnum.BOXZOOM;
                    break;
                case ChartViewToolbarButtonId.Panning:
                    toolstate.selectedTool = chartViewToolbarStates_1.ChartViewToolStateEnum.PANNING;
                    break;
                case ChartViewToolbarButtonId.RefCursor1:
                    toolstate.selectedTool = chartViewToolbarStates_1.ChartViewToolStateEnum.CURSORS;
                    cursorState.setSelected(0, true);
                    break;
                case ChartViewToolbarButtonId.RefCursor2:
                    toolstate.selectedTool = chartViewToolbarStates_1.ChartViewToolStateEnum.CURSORS;
                    cursorState.setSelected(1, true);
                    break;
                case ChartViewToolbarButtonId.ZoomX:
                    zoomDirectionState.zoomDirection = chartViewWidget_1.ZoomDirection.X;
                    break;
                case ChartViewToolbarButtonId.ZoomY:
                    zoomDirectionState.zoomDirection = chartViewWidget_1.ZoomDirection.Y;
                    break;
                case ChartViewToolbarButtonId.ZoomXY:
                    zoomDirectionState.zoomDirection = chartViewWidget_1.ZoomDirection.XY;
                    break;
                case ChartViewToolbarButtonId.AutoScale:
                    //TODO: remove Event and find solution via states
                    var eventToolbarButtonClickedArgs = new EventToolbarButtonClickedArgs(0, 3);
                    this.eventToolbarButtonClicked.raise(this, eventToolbarButtonClickedArgs);
                    break;
                case ChartViewToolbarButtonId.ResetZoom:
                    //TODO: remove Event and find solution via states
                    var eventToolbarButtonClickedArgs2 = new EventToolbarButtonClickedArgs(0, 4);
                    this.eventToolbarButtonClicked.raise(this, eventToolbarButtonClickedArgs2);
                    break;
            }
            this.states.update(cursorStates_1.CursorStates, cursorState, this.cursorStatesId);
            this.states.update(chartViewToolbarStates_1.ChartViewToolState, toolstate, "ChartViewToolState");
            this.states.update(chartViewToolbarStates_1.ChartViewZoomDirectionState, zoomDirectionState, "ChartViewZoomDirectionState");
        };
        /**
         * highlight one of the cursor button as the selected one
         *
         * @private
         * @param {*} index
         * @memberof ChartViewToolbar
         */
        ChartViewToolbar.prototype.setCursorButtonSelected = function (index) {
            var toolbarInstance = $(this.cssParentContentId).ejToolbar("instance");
            var firstFreqCursor = 2;
            var secondFreqCursor = 3;
            this.deselectToolbarGroup(this.toolbarButtonGroup1);
            if (index < 4 && toolbarInstance.selectItemByID) {
                if (index == secondFreqCursor) {
                    index = 1;
                }
                else if (index == firstFreqCursor) {
                    index = 0;
                }
                toolbarInstance.selectItemByID(this.toolbarButtonGroup1[index]);
            }
        };
        ChartViewToolbar.prototype.setChartViewToolSelected = function (chartViewToolState) {
            var toolbarInstance = $(this.cssParentContentId).ejToolbar("instance");
            this.deselectToolbarGroup(this.toolbarButtonGroup3);
            switch (chartViewToolState) {
                case chartViewToolbarStates_1.ChartViewToolStateEnum.PANNING:
                    toolbarInstance.selectItemByID(ChartViewToolbarButtonId.Panning);
                    break;
                case chartViewToolbarStates_1.ChartViewToolStateEnum.BOXZOOM:
                    toolbarInstance.selectItemByID(ChartViewToolbarButtonId.BoxZoom);
                    break;
            }
        };
        ChartViewToolbar.prototype.setZoomDirectionButtonSelected = function (chartViewZoomDirectionState) {
            var toolbarInstance = $(this.cssParentContentId).ejToolbar("instance");
            this.deselectToolbarGroup(this.toolbarButtonGroup2);
            switch (chartViewZoomDirectionState) {
                case chartViewWidget_1.ZoomDirection.X:
                    toolbarInstance.selectItemByID(ChartViewToolbarButtonId.ZoomX);
                    break;
                case chartViewWidget_1.ZoomDirection.Y:
                    toolbarInstance.selectItemByID(ChartViewToolbarButtonId.ZoomY);
                    break;
                case chartViewWidget_1.ZoomDirection.XY:
                    toolbarInstance.selectItemByID(ChartViewToolbarButtonId.ZoomXY);
                    break;
            }
        };
        ChartViewToolbar.prototype.updateOnCursorStatesChanges = function (modifiedStates) {
            this.setCursorButtonSelected(modifiedStates.getSelectedCursorIndex());
        };
        ChartViewToolbar.prototype.updateOnChartViewToolStateChange = function (modifiedStates) {
            this.setChartViewToolSelected(modifiedStates.selectedTool);
        };
        ChartViewToolbar.prototype.updateOnChartViewZoomDirectionStateChange = function (modifiedStates) {
            this.setZoomDirectionButtonSelected(modifiedStates.zoomDirection);
        };
        return ChartViewToolbar;
    }(widgetBase_1.WidgetBase));
    exports.ChartViewToolbar = ChartViewToolbar;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRWaWV3VG9vbGJhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jaGFydFZpZXdXaWRnZXQvdG9vbGJhci9jaGFydFZpZXdUb29sYmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFTQTs7OztPQUlHO0lBQ0gsSUFBSyx3QkFVSjtJQVZELFdBQUssd0JBQXdCO1FBQ3pCLHFEQUF5QixDQUFBO1FBQ3pCLHFEQUF5QixDQUFBO1FBQ3pCLCtDQUFtQixDQUFBO1FBQ25CLCtDQUFtQixDQUFBO1FBQ25CLDJDQUFlLENBQUE7UUFDZiwyQ0FBZSxDQUFBO1FBQ2YsNkNBQWlCLENBQUE7UUFDakIsbURBQXVCLENBQUE7UUFDdkIsbURBQXVCLENBQUE7SUFDM0IsQ0FBQyxFQVZJLHdCQUF3QixLQUF4Qix3QkFBd0IsUUFVNUI7SUFrVHlCLDREQUF3QjtJQTlTbEQ7UUFBd0MsNkNBQTREO1FBQXBHOztRQUFzRyxDQUFDO1FBQUQsZ0NBQUM7SUFBRCxDQUFDLEFBQXZHLENBQXdDLG1CQUFVLEdBQXFEO0lBOFNuRCw4REFBeUI7SUE5UzBCLENBQUM7SUFHeEc7UUFJSSx1Q0FBWSxjQUFtQixFQUFFLFdBQW1CO1lBRnBELGdCQUFXLEdBQVksQ0FBQyxDQUFDO1lBR3JCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1lBQy9CLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBQ3pDLENBQUM7UUFFTCxvQ0FBQztJQUFELENBQUMsQUFURCxJQVNDO0lBRUQ7Ozs7OztPQU1HO0lBQ0g7UUFBK0Isb0NBQVU7UUFXckM7WUFBQSxZQUNJLGlCQUFPLFNBR1Y7WUFWRCx5QkFBbUIsR0FBZ0MsRUFBRSxDQUFDO1lBQ3RELHlCQUFtQixHQUFnQyxFQUFFLENBQUM7WUFDdEQseUJBQW1CLEdBQWdDLEVBQUUsQ0FBQztZQUVyQyxvQkFBYyxHQUFHLGNBQWMsQ0FBQztZQUk3QyxLQUFJLENBQUMseUJBQXlCLEdBQUcsSUFBSSx5QkFBeUIsRUFBRSxDQUFDOztRQUVyRSxDQUFDO1FBRUQ7Ozs7V0FJRztRQUNILGtDQUFPLEdBQVA7WUFDSSxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzNELElBQUcsT0FBTyxJQUFJLFNBQVMsRUFBQztnQkFDcEIsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ3JCO1lBQ0QsaUJBQU0sT0FBTyxXQUFFLENBQUM7UUFDcEIsQ0FBQztRQUVELHFDQUFVLEdBQVYsVUFBVyxpQkFBeUI7WUFDaEMsaUJBQU0sVUFBVSxZQUFDLGlCQUFpQixDQUFDLENBQUM7WUFFcEMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxVQUFVLENBQUMsQ0FBQTtZQUNsRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLFVBQVUsQ0FBQyxDQUFBO1lBQ2xFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsT0FBTyxDQUFDLENBQUE7WUFDL0QsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUUvRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQzdELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDOUQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUU3RCxJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQztZQUNqQyxJQUFJLENBQUMsK0JBQStCLEVBQUUsQ0FBQztZQUN2QyxJQUFJLENBQUMsd0NBQXdDLEVBQUUsQ0FBQztRQUNwRCxDQUFDO1FBR0Q7Ozs7O1dBS0c7UUFDSyxvREFBeUIsR0FBakM7WUFBQSxpQkFJQztZQUhHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLDJCQUFZLEVBQUUsVUFBQyxZQUEwQixFQUFFLElBQWtCO2dCQUM3RSxLQUFJLENBQUMsMkJBQTJCLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDbkQsQ0FBQyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM1QixDQUFDO1FBRU8sMERBQStCLEdBQXZDO1lBQUEsaUJBSUM7WUFIRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQywyQ0FBa0IsRUFBRSxVQUFDLFlBQWlDLEVBQUUsSUFBd0I7Z0JBQ2hHLEtBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxZQUFZLENBQUMsQ0FBQTtZQUN2RCxDQUFDLEVBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUM1QixDQUFDO1FBRU8sbUVBQXdDLEdBQWhEO1lBQUEsaUJBSUM7WUFIRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxvREFBMkIsRUFBRSxVQUFDLFlBQTBDLEVBQUUsSUFBaUM7Z0JBQzNILEtBQUksQ0FBQyx5Q0FBeUMsQ0FBQyxZQUFZLENBQUMsQ0FBQTtZQUNoRSxDQUFDLEVBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUNyQyxDQUFDO1FBRUQ7Ozs7V0FJRztRQUNILHVDQUFZLEdBQVo7WUFBQSxpQkFlQztZQWRHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUNyQixDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsU0FBUyxDQUFDO2dCQUNoQyxLQUFLLEVBQUUsTUFBTTtnQkFDYixlQUFlLEVBQUUsSUFBSTtnQkFDckIsTUFBTSxFQUFFLEVBQUU7Z0JBQ1YsS0FBSyxFQUFFLFVBQUMsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLEVBQW5ELENBQW1EO2FBRXhFLENBQUMsQ0FBQztZQUVILElBQUksZUFBZSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFdkUsZUFBZSxDQUFDLGNBQWMsQ0FBQyx3QkFBd0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNwRSxlQUFlLENBQUMsY0FBYyxDQUFDLHdCQUF3QixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXBFLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNLLHdDQUFhLEdBQXJCO1lBQ0ksQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLE1BQU0sQ0FDN0IsT0FBTztnQkFDUCxVQUFVLEdBQUMsd0JBQXdCLENBQUMsVUFBVSxHQUFFLGlDQUFpQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLEdBQUcsaUxBQWlMO2dCQUN4UyxVQUFVLEdBQUMsd0JBQXdCLENBQUMsVUFBVSxHQUFFLGlDQUFpQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLEdBQUcsaUxBQWlMO2dCQUN4UyxPQUFPO2dCQUVQLE9BQU87Z0JBRVAsVUFBVSxHQUFDLHdCQUF3QixDQUFDLE9BQU8sR0FBRSxpQ0FBaUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxHQUFHLGdMQUFnTDtnQkFDcFMsVUFBVSxHQUFDLHdCQUF3QixDQUFDLE9BQU8sR0FBRSxpQ0FBaUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxHQUFHLGdMQUFnTDtnQkFFclMsT0FBTztnQkFFUCxPQUFPO2dCQUNQLFVBQVUsR0FBQyx3QkFBd0IsQ0FBQyxNQUFNLEdBQUMsaUNBQWlDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsR0FBRyxpTEFBaUw7Z0JBQ2xTLFVBQVUsR0FBQyx3QkFBd0IsQ0FBQyxLQUFLLEdBQUUsaUNBQWlDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsR0FBRywrS0FBK0s7Z0JBQy9SLFVBQVUsR0FBQyx3QkFBd0IsQ0FBQyxLQUFLLEdBQUUsaUNBQWlDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsR0FBRywrS0FBK0s7Z0JBQy9SLE9BQU87Z0JBRVAsT0FBTztnQkFDUCxVQUFVLEdBQUMsd0JBQXdCLENBQUMsU0FBUyxHQUFDLGlDQUFpQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsb0JBQW9CLENBQUMsR0FBRyxtTEFBbUw7Z0JBQy9TLFVBQVUsR0FBQyx3QkFBd0IsQ0FBQyxTQUFTLEdBQUMsaUNBQWlDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLGtMQUFrTDtnQkFDOVMsT0FBTyxDQUNWLENBQUM7UUFDTixDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNLLHVDQUFZLEdBQXBCLFVBQXFCLFNBQWlCO1lBQ2xDLE9BQU8sNkJBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEdBQUcscUNBQWlCLENBQUMsbUJBQW1CLEVBQUUsR0FBRyx1Q0FBdUMsR0FBRyxTQUFTLENBQUMsQ0FBQztRQUNuSyxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSywrQ0FBb0IsR0FBNUIsVUFBNkIsWUFBd0M7WUFDakUsSUFBSSxlQUFlLEdBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN4RSxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsWUFBWSxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFBQztnQkFDdkMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3JEO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLGtEQUF1QixHQUEvQixVQUFnQyxRQUFtQztZQUkvRCxJQUFJLFNBQVMsR0FBd0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsMkNBQWtCLEVBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUMvRixJQUFJLFdBQVcsR0FBa0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsMkJBQVksRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDckYsSUFBSSxrQkFBa0IsR0FBaUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0RBQTJCLEVBQUMsNkJBQTZCLENBQUMsQ0FBQztZQUVuSSxRQUFRLFFBQVEsRUFBQztnQkFDYixLQUFLLHdCQUF3QixDQUFDLE9BQU87b0JBQ2pDLFNBQVMsQ0FBQyxZQUFZLEdBQUcsK0NBQXNCLENBQUMsT0FBTyxDQUFDO29CQUN4RCxNQUFNO2dCQUNWLEtBQUssd0JBQXdCLENBQUMsT0FBTztvQkFDakMsU0FBUyxDQUFDLFlBQVksR0FBRywrQ0FBc0IsQ0FBQyxPQUFPLENBQUM7b0JBQ3hELE1BQU07Z0JBQ1YsS0FBSyx3QkFBd0IsQ0FBQyxVQUFVO29CQUNwQyxTQUFTLENBQUMsWUFBWSxHQUFHLCtDQUFzQixDQUFDLE9BQU8sQ0FBQztvQkFDeEQsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQ2pDLE1BQU07Z0JBQ1YsS0FBSyx3QkFBd0IsQ0FBQyxVQUFVO29CQUNwQyxTQUFTLENBQUMsWUFBWSxHQUFHLCtDQUFzQixDQUFDLE9BQU8sQ0FBQztvQkFDeEQsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQ2pDLE1BQU07Z0JBQ1YsS0FBSyx3QkFBd0IsQ0FBQyxLQUFLO29CQUMvQixrQkFBa0IsQ0FBQyxhQUFhLEdBQUcsK0JBQWEsQ0FBQyxDQUFDLENBQUM7b0JBQ25ELE1BQU07Z0JBQ1YsS0FBSyx3QkFBd0IsQ0FBQyxLQUFLO29CQUMvQixrQkFBa0IsQ0FBQyxhQUFhLEdBQUcsK0JBQWEsQ0FBQyxDQUFDLENBQUM7b0JBQ25ELE1BQU07Z0JBQ1YsS0FBSyx3QkFBd0IsQ0FBQyxNQUFNO29CQUNoQyxrQkFBa0IsQ0FBQyxhQUFhLEdBQUcsK0JBQWEsQ0FBQyxFQUFFLENBQUM7b0JBQ3BELE1BQU07Z0JBRVYsS0FBSyx3QkFBd0IsQ0FBQyxTQUFTO29CQUNuQyxpREFBaUQ7b0JBQ2pELElBQUksNkJBQTZCLEdBQWtDLElBQUksNkJBQTZCLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO29CQUMxRyxJQUFJLENBQUMseUJBQXlCLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSw2QkFBNkIsQ0FBQyxDQUFDO29CQUMxRSxNQUFNO2dCQUNWLEtBQUssd0JBQXdCLENBQUMsU0FBUztvQkFDbkMsaURBQWlEO29CQUNqRCxJQUFJLDhCQUE4QixHQUFrQyxJQUFJLDZCQUE2QixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtvQkFDM0csSUFBSSxDQUFDLHlCQUF5QixDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsOEJBQThCLENBQUMsQ0FBQztvQkFDM0UsTUFBTTthQUNiO1lBR0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsMkJBQVksRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ25FLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLDJDQUFrQixFQUFFLFNBQVMsRUFBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQ3ZFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLG9EQUEyQixFQUFFLGtCQUFrQixFQUFDLDZCQUE2QixDQUFDLENBQUM7UUFDdEcsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLGtEQUF1QixHQUEvQixVQUFnQyxLQUFLO1lBQ2pDLElBQUksZUFBZSxHQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDeEUsSUFBTSxlQUFlLEdBQUcsQ0FBQyxDQUFDO1lBQzFCLElBQU0sZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUNwRCxJQUFHLEtBQUssR0FBRyxDQUFDLElBQUksZUFBZSxDQUFDLGNBQWMsRUFBQztnQkFDM0MsSUFBSSxLQUFLLElBQUksZ0JBQWdCLEVBQUU7b0JBQzNCLEtBQUssR0FBRyxDQUFDLENBQUM7aUJBQ2I7cUJBQ0ksSUFBSSxLQUFLLElBQUksZUFBZSxFQUFFO29CQUMvQixLQUFLLEdBQUcsQ0FBQyxDQUFDO2lCQUNiO2dCQUNELGVBQWUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFDbkU7UUFDTCxDQUFDO1FBRU8sbURBQXdCLEdBQWhDLFVBQWlDLGtCQUEyQztZQUN4RSxJQUFJLGVBQWUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3ZFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUVwRCxRQUFRLGtCQUFrQixFQUFFO2dCQUN4QixLQUFLLCtDQUFzQixDQUFDLE9BQU87b0JBQy9CLGVBQWUsQ0FBQyxjQUFjLENBQUMsd0JBQXdCLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ2pFLE1BQU07Z0JBRVYsS0FBSywrQ0FBc0IsQ0FBQyxPQUFPO29CQUMvQixlQUFlLENBQUMsY0FBYyxDQUFDLHdCQUF3QixDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUNqRSxNQUFNO2FBQ2I7UUFDTCxDQUFDO1FBRU8seURBQThCLEdBQXRDLFVBQXVDLDJCQUEwQztZQUM3RSxJQUFJLGVBQWUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3ZFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUVwRCxRQUFRLDJCQUEyQixFQUFFO2dCQUN6QixLQUFLLCtCQUFhLENBQUMsQ0FBQztvQkFDaEIsZUFBZSxDQUFDLGNBQWMsQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDL0QsTUFBTTtnQkFFVixLQUFLLCtCQUFhLENBQUMsQ0FBQztvQkFDaEIsZUFBZSxDQUFDLGNBQWMsQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDL0QsTUFBTTtnQkFFVixLQUFLLCtCQUFhLENBQUMsRUFBRTtvQkFDakIsZUFBZSxDQUFDLGNBQWMsQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDaEUsTUFBTTthQUNyQjtRQUNMLENBQUM7UUFHTyxzREFBMkIsR0FBbkMsVUFBb0MsY0FBNkI7WUFDN0QsSUFBSSxDQUFDLHVCQUF1QixDQUFDLGNBQWMsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLENBQUM7UUFDMUUsQ0FBQztRQUVPLDJEQUFnQyxHQUF4QyxVQUF5QyxjQUFrQztZQUN2RSxJQUFJLENBQUMsd0JBQXdCLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQy9ELENBQUM7UUFFTyxvRUFBeUMsR0FBakQsVUFBa0QsY0FBMkM7WUFDekYsSUFBSSxDQUFDLDhCQUE4QixDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN0RSxDQUFDO1FBQ0wsdUJBQUM7SUFBRCxDQUFDLEFBdlJELENBQStCLHVCQUFVLEdBdVJ4QztJQUVPLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDaGFydFZpZXdUb29sYmFyIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9jaGFydFZpZXdUb29sYmFySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFdpZGdldEJhc2UgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3dpZGdldEJhc2VcIjtcclxuaW1wb3J0IHsgVGhlbWVQcm92aWRlciB9IGZyb20gXCIuLi8uLi9jb21tb24vdGhlbWVQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBEaXJlY3RvcnlQcm92aWRlciB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vZGlyZWN0b3J5UHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvZXZlbnRzXCI7XHJcbmltcG9ydCB7IEN1cnNvclN0YXRlcyB9IGZyb20gXCIuLi8uLi9jb21tb24vc3RhdGVzL2N1cnNvclN0YXRlc1wiO1xyXG5pbXBvcnQgeyBDaGFydFZpZXdUb29sU3RhdGUsIENoYXJ0Vmlld1Rvb2xTdGF0ZUVudW0sIENoYXJ0Vmlld1pvb21EaXJlY3Rpb25TdGF0ZSB9IGZyb20gXCIuLi8uLi9jb21tb24vc3RhdGVzL2NoYXJ0Vmlld1Rvb2xiYXJTdGF0ZXNcIjtcclxuaW1wb3J0IHsgWm9vbURpcmVjdGlvbiB9IGZyb20gXCIuLi9jaGFydFZpZXdXaWRnZXRcIjtcclxuXHJcbi8qKlxyXG4gKiBFbnVtIG9mIENoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZHNcclxuICpcclxuICogQGVudW0ge251bWJlcn1cclxuICovXHJcbmVudW0gQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklke1xyXG4gICAgUmVmQ3Vyc29yMSA9IFwiUmVmQ3Vyc29yMVwiLFxyXG4gICAgUmVmQ3Vyc29yMiA9IFwiUmVmQ3Vyc29yMlwiLFxyXG4gICAgUGFubmluZyA9IFwiUGFubmluZ1wiLFxyXG4gICAgQm94Wm9vbSA9IFwiQm94Wm9vbVwiLFxyXG4gICAgWm9vbVggPSBcIlpvb21YXCIsXHJcbiAgICBab29tWSA9IFwiWm9vbVlcIixcclxuICAgIFpvb21YWSA9IFwiWm9vbVhZXCIsXHJcbiAgICBSZXNldFpvb20gPSBcIlJlc2V0Wm9vbVwiLFxyXG4gICAgQXV0b1NjYWxlID0gXCJBdXRvU2NhbGVcIlxyXG59XHJcblxyXG5cclxuXHJcbmNsYXNzIEV2ZW50VG9vbGJhckJ1dHRvbkNsaWNrZWQgZXh0ZW5kcyBUeXBlZEV2ZW50IDxDaGFydFZpZXdUb29sYmFyLCBFdmVudFRvb2xiYXJCdXR0b25DbGlja2VkQXJncz4ge307XHJcblxyXG5cclxuY2xhc3MgRXZlbnRUb29sYmFyQnV0dG9uQ2xpY2tlZEFyZ3Mge1xyXG4gICAgc2VsZWN0ZWRCdXR0b246IGFueTtcclxuICAgIGdyb3VwTnVtYmVyIDogbnVtYmVyID0gMDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzZWxlY3RlZEJ1dHRvbjogYW55LCBncm91cE51bWJlcjogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5ncm91cE51bWJlciA9IGdyb3VwTnVtYmVyO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRCdXR0b24gPSBzZWxlY3RlZEJ1dHRvbjtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKlRvb2xiYXIgZm9yIENoYXJ0Vmlld1dpZGdldFxyXG4gKlxyXG4gKiBAY2xhc3MgQ2hhcnRWaWV3VG9vbGJhclxyXG4gKiBAZXh0ZW5kcyB7V2lkZ2V0QmFzZX1cclxuICogQGltcGxlbWVudHMge0lDaGFydFZpZXdUb29sYmFyfVxyXG4gKi9cclxuY2xhc3MgQ2hhcnRWaWV3VG9vbGJhciBleHRlbmRzIFdpZGdldEJhc2UgaW1wbGVtZW50cyBJQ2hhcnRWaWV3VG9vbGJhciB7XHJcbiAgICBcclxuICAgIGV2ZW50VG9vbGJhckJ1dHRvbkNsaWNrZWQ6IEV2ZW50VG9vbGJhckJ1dHRvbkNsaWNrZWQ7XHJcblxyXG4gICAgXHJcbiAgICB0b29sYmFyQnV0dG9uR3JvdXAxIDogQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkW10gPSBbXTtcclxuICAgIHRvb2xiYXJCdXR0b25Hcm91cDIgOiBDaGFydFZpZXdUb29sYmFyQnV0dG9uSWRbXSA9IFtdO1xyXG4gICAgdG9vbGJhckJ1dHRvbkdyb3VwMyA6IENoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZFtdID0gW107XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBjdXJzb3JTdGF0ZXNJZCA9IFwiQ3Vyc29yU3RhdGVzXCI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRUb29sYmFyQnV0dG9uQ2xpY2tlZCA9IG5ldyBFdmVudFRvb2xiYXJCdXR0b25DbGlja2VkKCk7XHJcbiAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc3Bvc2UgdGhlIGNoYXJ0IHZpZXcgdG9vbGJhclxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIGRpc3Bvc2UoKXtcclxuICAgICAgICBsZXQgdG9vbGJhciA9ICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpLmRhdGEoXCJlalRvb2xiYXJcIik7XHJcbiAgICAgICAgaWYodG9vbGJhciAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0b29sYmFyLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQ6IHN0cmluZyl7XHJcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZShsYXlvdXRDb250YWluZXJJZCk7XHJcblxyXG4gICAgICAgIHRoaXMudG9vbGJhckJ1dHRvbkdyb3VwMS5wdXNoKENoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZC5SZWZDdXJzb3IxKVxyXG4gICAgICAgIHRoaXMudG9vbGJhckJ1dHRvbkdyb3VwMS5wdXNoKENoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZC5SZWZDdXJzb3IyKVxyXG4gICAgICAgIHRoaXMudG9vbGJhckJ1dHRvbkdyb3VwMy5wdXNoKENoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZC5QYW5uaW5nKVxyXG4gICAgICAgIHRoaXMudG9vbGJhckJ1dHRvbkdyb3VwMy5wdXNoKENoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZC5Cb3hab29tKVxyXG5cclxuICAgICAgICB0aGlzLnRvb2xiYXJCdXR0b25Hcm91cDIucHVzaChDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuWm9vbVgpXHJcbiAgICAgICAgdGhpcy50b29sYmFyQnV0dG9uR3JvdXAyLnB1c2goQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkLlpvb21YWSlcclxuICAgICAgICB0aGlzLnRvb2xiYXJCdXR0b25Hcm91cDIucHVzaChDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuWm9vbVkpXHJcblxyXG4gICAgICAgIHRoaXMub2JzZXJ2ZUN1cnNvclN0YXRlc0NoYW5nZSgpO1xyXG4gICAgICAgIHRoaXMub2JzZXJ2ZUNoYXJ0Vmlld1Rvb2xTdGF0ZUNoYW5nZSgpO1xyXG4gICAgICAgIHRoaXMub2JzZXJ2ZUNoYXJ0Vmlld1pvb21EaXJlY3Rpb25TdGF0ZUNoYW5nZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBvYnNlcnZlcyB0aGUgY3Vyc29yIHN0YXRlIGZvciBjaGFuZ2VzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb2JzZXJ2ZUN1cnNvclN0YXRlc0NoYW5nZSgpIHtcclxuICAgICAgICB0aGlzLnN0YXRlcy5vYnNlcnZlKEN1cnNvclN0YXRlcywgKG1vZGlmaWVkSXRlbTogQ3Vyc29yU3RhdGVzLCBpdGVtOiBDdXJzb3JTdGF0ZXMpID0+IHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVPbkN1cnNvclN0YXRlc0NoYW5nZXMobW9kaWZpZWRJdGVtKTtcclxuICAgICAgICB9LCB0aGlzLmN1cnNvclN0YXRlc0lkKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9ic2VydmVDaGFydFZpZXdUb29sU3RhdGVDaGFuZ2UoKXtcclxuICAgICAgICB0aGlzLnN0YXRlcy5vYnNlcnZlKENoYXJ0Vmlld1Rvb2xTdGF0ZSwgKG1vZGlmaWVkSXRlbSA6IENoYXJ0Vmlld1Rvb2xTdGF0ZSwgaXRlbTogQ2hhcnRWaWV3VG9vbFN0YXRlKT0+IHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVPbkNoYXJ0Vmlld1Rvb2xTdGF0ZUNoYW5nZShtb2RpZmllZEl0ZW0pXHJcbiAgICAgICAgfSxcIkNoYXJ0Vmlld1Rvb2xTdGF0ZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9ic2VydmVDaGFydFZpZXdab29tRGlyZWN0aW9uU3RhdGVDaGFuZ2UoKXtcclxuICAgICAgICB0aGlzLnN0YXRlcy5vYnNlcnZlKENoYXJ0Vmlld1pvb21EaXJlY3Rpb25TdGF0ZSwgKG1vZGlmaWVkSXRlbSA6IENoYXJ0Vmlld1pvb21EaXJlY3Rpb25TdGF0ZSwgaXRlbTogQ2hhcnRWaWV3Wm9vbURpcmVjdGlvblN0YXRlKT0+IHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVPbkNoYXJ0Vmlld1pvb21EaXJlY3Rpb25TdGF0ZUNoYW5nZShtb2RpZmllZEl0ZW0pXHJcbiAgICAgICAgfSxcIkNoYXJ0Vmlld1pvb21EaXJlY3Rpb25TdGF0ZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZSB0aGUgQ2hhcnRWaWV3VG9vbGJhcnMgTGF5b3V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld1Rvb2xiYXJcclxuICAgICAqL1xyXG4gICAgY3JlYXRlTGF5b3V0KCl7XHJcbiAgICAgICAgdGhpcy5hZGRMYXlvdXREaXZzKCk7XHJcbiAgICAgICAgJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCkuZWpUb29sYmFyKHtcclxuICAgICAgICAgICAgIHdpZHRoOiBcIjEwMCVcIixcclxuICAgICAgICAgICAgIGVuYWJsZVNlcGFyYXRvcjogdHJ1ZSxcclxuICAgICAgICAgICAgIGhlaWdodDogMzMsXHJcbiAgICAgICAgICAgICBjbGljazogKGFyZ3MpID0+IHRoaXMub25DaGFydFZpZXdUb29sYmFyQ2xpY2soYXJncy5jdXJyZW50VGFyZ2V0LmlkKVxyXG4gXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCB0b29sYmFySW5zdGFuY2UgPSAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKS5lalRvb2xiYXIoXCJpbnN0YW5jZVwiKTtcclxuXHJcbiAgICAgICAgdG9vbGJhckluc3RhbmNlLnNlbGVjdEl0ZW1CeUlEKENoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZC5SZWZDdXJzb3IxKTtcclxuICAgICAgICB0b29sYmFySW5zdGFuY2Uuc2VsZWN0SXRlbUJ5SUQoQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkLlpvb21YWSk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBhZGQgdGhlIG5lZWRlZCBodG1sIGNvZGUgZm9yIHRoZSB0b29sYmFyXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkTGF5b3V0RGl2cygpe1xyXG4gICAgICAgICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpLmFwcGVuZChcclxuICAgICAgICAgICAgXCI8dWw+IFwiICsgXHJcbiAgICAgICAgICAgIFwiPGxpIGlkPSdcIitDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuUmVmQ3Vyc29yMSsgXCInIHN0eWxlPSdiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyB0aGlzLmdldEltYWdlUGF0aChcImN1cnNvcjEuc3ZnXCIpICsgXCIpOyBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0OyBwYWRkaW5nOiAwcHg7IG1hcmdpbjogMHB4OyBiYWNrZ3JvdW5kLXNpemU6IDI0cHggMjRweDsgaGVpZ2h0OiAzMHB4OyB3aWR0aDogMzBweDsgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyIGNlbnRlcjsnIHRpdGxlPSdDdXJzb3IgMSc+IDwvbGk+XCIgKyBcclxuICAgICAgICAgICAgXCI8bGkgaWQ9J1wiK0NoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZC5SZWZDdXJzb3IyKyBcIicgc3R5bGU9J2JhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIHRoaXMuZ2V0SW1hZ2VQYXRoKFwiY3Vyc29yMi5zdmdcIikgKyBcIik7IGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7IHBhZGRpbmc6IDBweDsgbWFyZ2luOiAwcHg7IGJhY2tncm91bmQtc2l6ZTogMjRweCAyNHB4OyBoZWlnaHQ6IDMwcHg7IHdpZHRoOiAzMHB4OyBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyOycgdGl0bGU9J0N1cnNvciAyJz4gPC9saT5cIiArXHJcbiAgICAgICAgICAgIFwiPC91bD5cIiArXHJcblxyXG4gICAgICAgICAgICBcIjx1bD4gXCIgKyBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFwiPGxpIGlkPSdcIitDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuUGFubmluZysgXCInIHN0eWxlPSdiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyB0aGlzLmdldEltYWdlUGF0aChcInBhbm5pbmcuc3ZnXCIpICsgXCIpOyBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0OyBwYWRkaW5nOiAwcHg7IG1hcmdpbjogMHB4OyBiYWNrZ3JvdW5kLXNpemU6IDI0cHggMjRweDsgaGVpZ2h0OiAzMHB4OyB3aWR0aDogMzBweDsgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyIGNlbnRlcjsnIHRpdGxlPSdQYW5uaW5nJz4gPC9saT5cIiArXHJcbiAgICAgICAgICAgIFwiPGxpIGlkPSdcIitDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuQm94Wm9vbSsgXCInIHN0eWxlPSdiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyB0aGlzLmdldEltYWdlUGF0aChcImJveF96b29tLnN2Z1wiKSArIFwiKTsgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDsgcGFkZGluZzogMHB4OyBtYXJnaW46IDBweDsgYmFja2dyb3VuZC1zaXplOiAyNHB4IDI0cHg7IGhlaWdodDogMzBweDsgd2lkdGg6IDMwcHg7IGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlciBjZW50ZXI7JyB0aXRsZT0nQm94Wm9vbSc+IDwvbGk+XCIgK1xyXG5cclxuICAgICAgICAgICAgXCI8L3VsPlwiICtcclxuXHJcbiAgICAgICAgICAgIFwiPHVsPiBcIiArXHJcbiAgICAgICAgICAgIFwiPGxpIGlkPSdcIitDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuWm9vbVhZK1wiJyBzdHlsZT0nYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgdGhpcy5nZXRJbWFnZVBhdGgoXCJ6b29tWFkuc3ZnXCIpICsgXCIpOyBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0OyBwYWRkaW5nOiAwcHg7IG1hcmdpbjogMHB4OyBiYWNrZ3JvdW5kLXNpemU6IDI0cHggMjRweDsgaGVpZ2h0OiAzMHB4OyB3aWR0aDogMzBweDsgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyIGNlbnRlcjsnIHRpdGxlPSdab29tIFhZICc+IDwvbGk+XCIgK1xyXG4gICAgICAgICAgICBcIjxsaSBpZD0nXCIrQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkLlpvb21YKyBcIicgc3R5bGU9J2JhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIHRoaXMuZ2V0SW1hZ2VQYXRoKFwiem9vbVguc3ZnXCIpICsgXCIpOyBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0OyBwYWRkaW5nOiAwcHg7IG1hcmdpbjogMHB4OyBiYWNrZ3JvdW5kLXNpemU6IDI0cHggMjRweDsgaGVpZ2h0OiAzMHB4OyB3aWR0aDogMzBweDsgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyIGNlbnRlcjsnIHRpdGxlPSdab29tIFgnPiA8L2xpPlwiICtcclxuICAgICAgICAgICAgXCI8bGkgaWQ9J1wiK0NoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZC5ab29tWSsgXCInIHN0eWxlPSdiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyB0aGlzLmdldEltYWdlUGF0aChcInpvb21ZLnN2Z1wiKSArIFwiKTsgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDsgcGFkZGluZzogMHB4OyBtYXJnaW46IDBweDsgYmFja2dyb3VuZC1zaXplOiAyNHB4IDI0cHg7IGhlaWdodDogMzBweDsgd2lkdGg6IDMwcHg7IGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlciBjZW50ZXI7JyB0aXRsZT0nWm9vbSBZJz4gPC9saT5cIiArXHJcbiAgICAgICAgICAgIFwiPC91bD5cIiArXHJcblxyXG4gICAgICAgICAgICBcIjx1bD4gXCIgKyBcclxuICAgICAgICAgICAgXCI8bGkgaWQ9J1wiK0NoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZC5BdXRvU2NhbGUrXCInIHN0eWxlPSdiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyB0aGlzLmdldEltYWdlUGF0aChcInpvb21fYXV0b3NjYWxlLnN2Z1wiKSArIFwiKTsgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDsgcGFkZGluZzogMHB4OyBtYXJnaW46IDBweDsgYmFja2dyb3VuZC1zaXplOiAyNHB4IDI0cHg7IGhlaWdodDogMzBweDsgd2lkdGg6IDMwcHg7IGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlciBjZW50ZXI7JyB0aXRsZT0nQXV0byBTY2FsZSc+IDwvbGk+XCIgK1xyXG4gICAgICAgICAgICBcIjxsaSBpZD0nXCIrQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkLlJlc2V0Wm9vbStcIicgc3R5bGU9J2JhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIHRoaXMuZ2V0SW1hZ2VQYXRoKFwiem9vbV9yZXNldF9hbGwuc3ZnXCIpICsgXCIpOyBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0OyBwYWRkaW5nOiAwcHg7IG1hcmdpbjogMHB4OyBiYWNrZ3JvdW5kLXNpemU6IDI0cHggMjRweDsgaGVpZ2h0OiAzMHB4OyB3aWR0aDogMzBweDsgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyIGNlbnRlcjsnIHRpdGxlPSdSZXNldCBBbGwnPiA8L2xpPlwiICtcclxuICAgICAgICAgICAgXCI8L3VsPlwiXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJldHVybiB0aGUgUGF0aCBvZiBhbiBpbWFnZSBieSBpdHMgbmFtZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW1hZ2VOYW1lXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld1Rvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRJbWFnZVBhdGgoaW1hZ2VOYW1lOiBzdHJpbmcpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIFRoZW1lUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXRUaGVtZWRGaWxlUGF0aChcIi4uLy4uL1wiICsgRGlyZWN0b3J5UHJvdmlkZXIuZ2V0V2lkZ2V0c0RpcmVjdG9yeSgpICsgXCJjaGFydFZpZXdXaWRnZXQvc3R5bGUvaW1hZ2VzL3Rvb2xiYXIvXCIgKyBpbWFnZU5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogIGRlc2VsZWN0IGFsbCB0b29sYmFyIGl0ZW1zIGFuZCByZW1vdmUgaGlnaGxpZ2h0aW5nXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZGVzZWxlY3RUb29sYmFyR3JvdXAodG9vbGJhckdyb3VwOiBDaGFydFZpZXdUb29sYmFyQnV0dG9uSWRbXSl7XHJcbiAgICAgICAgbGV0IHRvb2xiYXJJbnN0YW5jZSA9ICAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKS5lalRvb2xiYXIoXCJpbnN0YW5jZVwiKTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdG9vbGJhckdyb3VwLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICB0b29sYmFySW5zdGFuY2UuZGVzZWxlY3RJdGVtQnlJRCh0b29sYmFyR3JvdXBbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlYWN0IG9uIGEgbW91c2UgY2xpY2sgb24gb25lIG9mIHRoZSB0b29sYmFycyBidXR0b25zXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Q2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkfSBidXR0b25JRFxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld1Rvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbkNoYXJ0Vmlld1Rvb2xiYXJDbGljayhidXR0b25JRCA6IENoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZCl7XHJcblxyXG4gICAgICBcclxuXHJcbiAgICAgICAgbGV0IHRvb2xzdGF0ZSA6IENoYXJ0Vmlld1Rvb2xTdGF0ZSA9IHRoaXMuc3RhdGVzLnJlYWQoQ2hhcnRWaWV3VG9vbFN0YXRlLFwiQ2hhcnRWaWV3VG9vbFN0YXRlXCIpO1xyXG4gICAgICAgIGxldCBjdXJzb3JTdGF0ZSA6IEN1cnNvclN0YXRlcyA9IHRoaXMuc3RhdGVzLnJlYWQoQ3Vyc29yU3RhdGVzLCB0aGlzLmN1cnNvclN0YXRlc0lkKTtcclxuICAgICAgICBsZXQgem9vbURpcmVjdGlvblN0YXRlIDogQ2hhcnRWaWV3Wm9vbURpcmVjdGlvblN0YXRlID0gdGhpcy5zdGF0ZXMucmVhZChDaGFydFZpZXdab29tRGlyZWN0aW9uU3RhdGUsXCJDaGFydFZpZXdab29tRGlyZWN0aW9uU3RhdGVcIik7XHJcblxyXG4gICAgICAgIHN3aXRjaCAoYnV0dG9uSUQpe1xyXG4gICAgICAgICAgICBjYXNlIENoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZC5Cb3hab29tOlxyXG4gICAgICAgICAgICAgICAgdG9vbHN0YXRlLnNlbGVjdGVkVG9vbCA9IENoYXJ0Vmlld1Rvb2xTdGF0ZUVudW0uQk9YWk9PTTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIENoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZC5QYW5uaW5nOlxyXG4gICAgICAgICAgICAgICAgdG9vbHN0YXRlLnNlbGVjdGVkVG9vbCA9IENoYXJ0Vmlld1Rvb2xTdGF0ZUVudW0uUEFOTklORztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIENoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZC5SZWZDdXJzb3IxOlxyXG4gICAgICAgICAgICAgICAgdG9vbHN0YXRlLnNlbGVjdGVkVG9vbCA9IENoYXJ0Vmlld1Rvb2xTdGF0ZUVudW0uQ1VSU09SUztcclxuICAgICAgICAgICAgICAgIGN1cnNvclN0YXRlLnNldFNlbGVjdGVkKDAsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkLlJlZkN1cnNvcjI6XHJcbiAgICAgICAgICAgICAgICB0b29sc3RhdGUuc2VsZWN0ZWRUb29sID0gQ2hhcnRWaWV3VG9vbFN0YXRlRW51bS5DVVJTT1JTO1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yU3RhdGUuc2V0U2VsZWN0ZWQoMSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuWm9vbVg6XHJcbiAgICAgICAgICAgICAgICB6b29tRGlyZWN0aW9uU3RhdGUuem9vbURpcmVjdGlvbiA9IFpvb21EaXJlY3Rpb24uWDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIENoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZC5ab29tWTpcclxuICAgICAgICAgICAgICAgIHpvb21EaXJlY3Rpb25TdGF0ZS56b29tRGlyZWN0aW9uID0gWm9vbURpcmVjdGlvbi5ZO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkLlpvb21YWTpcclxuICAgICAgICAgICAgICAgIHpvb21EaXJlY3Rpb25TdGF0ZS56b29tRGlyZWN0aW9uID0gWm9vbURpcmVjdGlvbi5YWTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSBDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuQXV0b1NjYWxlOlxyXG4gICAgICAgICAgICAgICAgLy9UT0RPOiByZW1vdmUgRXZlbnQgYW5kIGZpbmQgc29sdXRpb24gdmlhIHN0YXRlc1xyXG4gICAgICAgICAgICAgICAgbGV0IGV2ZW50VG9vbGJhckJ1dHRvbkNsaWNrZWRBcmdzOiBFdmVudFRvb2xiYXJCdXR0b25DbGlja2VkQXJncyA9IG5ldyBFdmVudFRvb2xiYXJCdXR0b25DbGlja2VkQXJncygwLCAzKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5ldmVudFRvb2xiYXJCdXR0b25DbGlja2VkLnJhaXNlKHRoaXMsIGV2ZW50VG9vbGJhckJ1dHRvbkNsaWNrZWRBcmdzKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIENoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZC5SZXNldFpvb206XHJcbiAgICAgICAgICAgICAgICAvL1RPRE86IHJlbW92ZSBFdmVudCBhbmQgZmluZCBzb2x1dGlvbiB2aWEgc3RhdGVzXHJcbiAgICAgICAgICAgICAgICBsZXQgZXZlbnRUb29sYmFyQnV0dG9uQ2xpY2tlZEFyZ3MyOiBFdmVudFRvb2xiYXJCdXR0b25DbGlja2VkQXJncyA9IG5ldyBFdmVudFRvb2xiYXJCdXR0b25DbGlja2VkQXJncygwLCA0KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5ldmVudFRvb2xiYXJCdXR0b25DbGlja2VkLnJhaXNlKHRoaXMsIGV2ZW50VG9vbGJhckJ1dHRvbkNsaWNrZWRBcmdzMik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuc3RhdGVzLnVwZGF0ZShDdXJzb3JTdGF0ZXMsIGN1cnNvclN0YXRlLCB0aGlzLmN1cnNvclN0YXRlc0lkKTtcclxuICAgICAgICB0aGlzLnN0YXRlcy51cGRhdGUoQ2hhcnRWaWV3VG9vbFN0YXRlLCB0b29sc3RhdGUsXCJDaGFydFZpZXdUb29sU3RhdGVcIik7XHJcbiAgICAgICAgdGhpcy5zdGF0ZXMudXBkYXRlKENoYXJ0Vmlld1pvb21EaXJlY3Rpb25TdGF0ZSwgem9vbURpcmVjdGlvblN0YXRlLFwiQ2hhcnRWaWV3Wm9vbURpcmVjdGlvblN0YXRlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogaGlnaGxpZ2h0IG9uZSBvZiB0aGUgY3Vyc29yIGJ1dHRvbiBhcyB0aGUgc2VsZWN0ZWQgb25lXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gaW5kZXhcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0Q3Vyc29yQnV0dG9uU2VsZWN0ZWQoaW5kZXgpe1xyXG4gICAgICAgIGxldCB0b29sYmFySW5zdGFuY2UgPSAgJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCkuZWpUb29sYmFyKFwiaW5zdGFuY2VcIik7XHJcbiAgICAgICAgY29uc3QgZmlyc3RGcmVxQ3Vyc29yID0gMjtcclxuICAgICAgICBjb25zdCBzZWNvbmRGcmVxQ3Vyc29yID0gMztcclxuICAgICAgICB0aGlzLmRlc2VsZWN0VG9vbGJhckdyb3VwKHRoaXMudG9vbGJhckJ1dHRvbkdyb3VwMSk7XHJcbiAgICAgICAgaWYoaW5kZXggPCA0ICYmIHRvb2xiYXJJbnN0YW5jZS5zZWxlY3RJdGVtQnlJRCl7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA9PSBzZWNvbmRGcmVxQ3Vyc29yKSB7XHJcbiAgICAgICAgICAgICAgICBpbmRleCA9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoaW5kZXggPT0gZmlyc3RGcmVxQ3Vyc29yKSB7XHJcbiAgICAgICAgICAgICAgICBpbmRleCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdG9vbGJhckluc3RhbmNlLnNlbGVjdEl0ZW1CeUlEKHRoaXMudG9vbGJhckJ1dHRvbkdyb3VwMVtpbmRleF0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldENoYXJ0Vmlld1Rvb2xTZWxlY3RlZChjaGFydFZpZXdUb29sU3RhdGUgOiBDaGFydFZpZXdUb29sU3RhdGVFbnVtKXtcclxuICAgICAgICBsZXQgdG9vbGJhckluc3RhbmNlID0gJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCkuZWpUb29sYmFyKFwiaW5zdGFuY2VcIik7XHJcbiAgICAgICAgdGhpcy5kZXNlbGVjdFRvb2xiYXJHcm91cCh0aGlzLnRvb2xiYXJCdXR0b25Hcm91cDMpO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKGNoYXJ0Vmlld1Rvb2xTdGF0ZSkge1xyXG4gICAgICAgICAgICBjYXNlIENoYXJ0Vmlld1Rvb2xTdGF0ZUVudW0uUEFOTklORzpcclxuICAgICAgICAgICAgICAgIHRvb2xiYXJJbnN0YW5jZS5zZWxlY3RJdGVtQnlJRChDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuUGFubmluZyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgQ2hhcnRWaWV3VG9vbFN0YXRlRW51bS5CT1haT09NOlxyXG4gICAgICAgICAgICAgICAgdG9vbGJhckluc3RhbmNlLnNlbGVjdEl0ZW1CeUlEKENoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZC5Cb3hab29tKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFpvb21EaXJlY3Rpb25CdXR0b25TZWxlY3RlZChjaGFydFZpZXdab29tRGlyZWN0aW9uU3RhdGU6IFpvb21EaXJlY3Rpb24pIHtcclxuICAgICAgICBsZXQgdG9vbGJhckluc3RhbmNlID0gJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCkuZWpUb29sYmFyKFwiaW5zdGFuY2VcIik7XHJcbiAgICAgICAgdGhpcy5kZXNlbGVjdFRvb2xiYXJHcm91cCh0aGlzLnRvb2xiYXJCdXR0b25Hcm91cDIpO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKGNoYXJ0Vmlld1pvb21EaXJlY3Rpb25TdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgWm9vbURpcmVjdGlvbi5YOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sYmFySW5zdGFuY2Uuc2VsZWN0SXRlbUJ5SUQoQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkLlpvb21YKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBab29tRGlyZWN0aW9uLlk6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvb2xiYXJJbnN0YW5jZS5zZWxlY3RJdGVtQnlJRChDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuWm9vbVkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFpvb21EaXJlY3Rpb24uWFk6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvb2xiYXJJbnN0YW5jZS5zZWxlY3RJdGVtQnlJRChDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuWm9vbVhZKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICBcclxuICAgIHByaXZhdGUgdXBkYXRlT25DdXJzb3JTdGF0ZXNDaGFuZ2VzKG1vZGlmaWVkU3RhdGVzIDogQ3Vyc29yU3RhdGVzKSB7XHJcbiAgICAgICAgdGhpcy5zZXRDdXJzb3JCdXR0b25TZWxlY3RlZChtb2RpZmllZFN0YXRlcy5nZXRTZWxlY3RlZEN1cnNvckluZGV4KCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlT25DaGFydFZpZXdUb29sU3RhdGVDaGFuZ2UobW9kaWZpZWRTdGF0ZXM6IENoYXJ0Vmlld1Rvb2xTdGF0ZSl7XHJcbiAgICAgICAgdGhpcy5zZXRDaGFydFZpZXdUb29sU2VsZWN0ZWQobW9kaWZpZWRTdGF0ZXMuc2VsZWN0ZWRUb29sKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZU9uQ2hhcnRWaWV3Wm9vbURpcmVjdGlvblN0YXRlQ2hhbmdlKG1vZGlmaWVkU3RhdGVzOiBDaGFydFZpZXdab29tRGlyZWN0aW9uU3RhdGUpe1xyXG4gICAgICAgIHRoaXMuc2V0Wm9vbURpcmVjdGlvbkJ1dHRvblNlbGVjdGVkKG1vZGlmaWVkU3RhdGVzLnpvb21EaXJlY3Rpb24pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge0NoYXJ0Vmlld1Rvb2xiYXIsIENoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZCwgRXZlbnRUb29sYmFyQnV0dG9uQ2xpY2tlZH0iXX0=