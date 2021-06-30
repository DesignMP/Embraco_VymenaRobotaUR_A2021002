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
define(["require", "exports", "../../common/widgetBase", "../../common/themeProvider", "../../../common/directoryProvider", "../../../framework/events", "../../common/states/cursorStates", "../../common/states/chartViewToolbarStates", "../chartViewWidget", "./defaultComponentSettings"], function (require, exports, widgetBase_1, themeProvider_1, directoryProvider_1, events_1, cursorStates_1, chartViewToolbarStates_1, chartViewWidget_1, defaultComponentSettings_1) {
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
            // holds the current cursor states values. We initialize the member for default. The effective initialization takes place when the external shared instance
            // of the cursor states is created and reflected through the curorStates setter!
            _this._cursorStates = new cursorStates_1.CursorStates();
            _this.eventToolbarButtonClicked = new EventToolbarButtonClicked();
            return _this;
        }
        /**
         * Dispose the chart view toolbar
         *
         * @memberof ChartViewToolbar
         */
        ChartViewToolbar.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            var toolbar = this.getToolbarInstance();
            if (toolbar != undefined) {
                toolbar.destroy();
            }
        };
        ChartViewToolbar.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            this.toolbarButtonGroup1.push(ChartViewToolbarButtonId.RefCursor1);
            this.toolbarButtonGroup1.push(ChartViewToolbarButtonId.RefCursor2);
            this.toolbarButtonGroup3.push(ChartViewToolbarButtonId.Panning);
            this.toolbarButtonGroup3.push(ChartViewToolbarButtonId.BoxZoom);
            this.toolbarButtonGroup2.push(ChartViewToolbarButtonId.ZoomX);
            this.toolbarButtonGroup2.push(ChartViewToolbarButtonId.ZoomXY);
            this.toolbarButtonGroup2.push(ChartViewToolbarButtonId.ZoomY);
            this.observeChartViewToolStateChange();
            this.observeChartViewZoomDirectionStateChange();
        };
        ChartViewToolbar.prototype.initializeComponent = function () {
            this.component.defaultSettingsDataId = defaultComponentSettings_1.DefaultComponentSettings.WidgetDefinitionId;
        };
        Object.defineProperty(ChartViewToolbar.prototype, "cursorsStates", {
            /**
             * Gets the cursors states
             *
             * @protected
             * @type {CursorStates}
             * @memberof ChartViewToolbar
             */
            get: function () {
                return this._cursorStates;
            },
            /**
             * Sets the cursors states. The method is called automatically whenever a cursor state has been changed externally.
             *
             * @protected
             * @memberof ChartViewToolbar
             */
            set: function (cursorStates) {
                // update the backup field
                this._cursorStates = cursorStates;
                this.updateOnCursorStatesChanges(cursorStates);
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
        ChartViewToolbar.prototype.updateCursorStates = function (cursorStates) {
            // BINDINGSOURCE: dispatches the method call to bound targets
        };
        ChartViewToolbar.prototype.observeChartViewToolStateChange = function () {
            var _this = this;
            this.states.observe(this, chartViewToolbarStates_1.ChartViewToolState, function (modifiedItem, item) {
                _this.updateOnChartViewToolStateChange(modifiedItem);
            }, "ChartViewToolState");
        };
        ChartViewToolbar.prototype.observeChartViewZoomDirectionStateChange = function () {
            var _this = this;
            this.states.observe(this, chartViewToolbarStates_1.ChartViewZoomDirectionState, function (modifiedItem, item) {
                _this.updateOnChartViewZoomDirectionStateChange(modifiedItem);
            }, "ChartViewZoomDirectionState");
        };
        /**
         * Returns the default component settings for this widget
         *
         * @returns {(ComponentSettings|undefined)}
         * @memberof ChartViewToolbar
         */
        ChartViewToolbar.prototype.getDefaultComponentSettings = function () {
            return defaultComponentSettings_1.DefaultComponentSettings.getChartViewToolbarDefinition();
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
            var toolbarInstance = this.getToolbarInstance();
            if (toolbarInstance != undefined) {
                toolbarInstance.selectItemByID(ChartViewToolbarButtonId.RefCursor1);
                toolbarInstance.selectItemByID(ChartViewToolbarButtonId.ZoomXY);
            }
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
            var toolbarInstance = this.getToolbarInstance();
            if (toolbarInstance != undefined) {
                for (var i = 0; i < toolbarGroup.length; i++) {
                    toolbarInstance.deselectItemByID(toolbarGroup[i]);
                }
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
                    this.cursorsStates.setSelected(0, true);
                    break;
                case ChartViewToolbarButtonId.RefCursor2:
                    toolstate.selectedTool = chartViewToolbarStates_1.ChartViewToolStateEnum.CURSORS;
                    this.cursorsStates.setSelected(1, true);
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
            this.updateCursorStates(this.cursorsStates);
            this.states.update(this, chartViewToolbarStates_1.ChartViewToolState, toolstate, "ChartViewToolState");
            this.states.update(this, chartViewToolbarStates_1.ChartViewZoomDirectionState, zoomDirectionState, "ChartViewZoomDirectionState");
        };
        /**
         * highlight one of the cursor button as the selected one
         *
         * @private
         * @param {*} index
         * @memberof ChartViewToolbar
         */
        ChartViewToolbar.prototype.setCursorButtonSelected = function (index) {
            var toolbarInstance = this.getToolbarInstance();
            if (toolbarInstance != undefined) {
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
            }
        };
        ChartViewToolbar.prototype.setChartViewToolSelected = function (chartViewToolState) {
            var toolbarInstance = this.getToolbarInstance();
            if (toolbarInstance != undefined) {
                this.deselectToolbarGroup(this.toolbarButtonGroup3);
                switch (chartViewToolState) {
                    case chartViewToolbarStates_1.ChartViewToolStateEnum.PANNING:
                        toolbarInstance.selectItemByID(ChartViewToolbarButtonId.Panning);
                        break;
                    case chartViewToolbarStates_1.ChartViewToolStateEnum.BOXZOOM:
                        toolbarInstance.selectItemByID(ChartViewToolbarButtonId.BoxZoom);
                        break;
                }
            }
        };
        ChartViewToolbar.prototype.getToolbarInstance = function () {
            var instance = undefined;
            try {
                instance = $(this.cssParentContentId).ejToolbar("instance");
            }
            catch (e) {
                console.error("ToolbarInstance not available");
            }
            return instance;
        };
        ChartViewToolbar.prototype.setZoomDirectionButtonSelected = function (chartViewZoomDirectionState) {
            var toolbarInstance = this.getToolbarInstance();
            if (toolbarInstance != undefined) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRWaWV3VG9vbGJhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jaGFydFZpZXdXaWRnZXQvdG9vbGJhci9jaGFydFZpZXdUb29sYmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFXQTs7OztPQUlHO0lBQ0gsSUFBSyx3QkFVSjtJQVZELFdBQUssd0JBQXdCO1FBQ3pCLHFEQUF5QixDQUFBO1FBQ3pCLHFEQUF5QixDQUFBO1FBQ3pCLCtDQUFtQixDQUFBO1FBQ25CLCtDQUFtQixDQUFBO1FBQ25CLDJDQUFlLENBQUE7UUFDZiwyQ0FBZSxDQUFBO1FBQ2YsNkNBQWlCLENBQUE7UUFDakIsbURBQXVCLENBQUE7UUFDdkIsbURBQXVCLENBQUE7SUFDM0IsQ0FBQyxFQVZJLHdCQUF3QixLQUF4Qix3QkFBd0IsUUFVNUI7SUErV3lCLDREQUF3QjtJQTNXbEQ7UUFBd0MsNkNBQTREO1FBQXBHOztRQUFzRyxDQUFDO1FBQUQsZ0NBQUM7SUFBRCxDQUFDLEFBQXZHLENBQXdDLG1CQUFVLEdBQXFEO0lBMlduRCw4REFBeUI7SUEzVzBCLENBQUM7SUFHeEc7UUFJSSx1Q0FBWSxjQUFtQixFQUFFLFdBQW1CO1lBRnBELGdCQUFXLEdBQVksQ0FBQyxDQUFDO1lBR3JCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1lBQy9CLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBQ3pDLENBQUM7UUFFTCxvQ0FBQztJQUFELENBQUMsQUFURCxJQVNDO0lBRUQ7Ozs7OztPQU1HO0lBQ0g7UUFBK0Isb0NBQVU7UUFjckM7WUFBQSxZQUNJLGlCQUFPLFNBR1Y7WUFiRCx5QkFBbUIsR0FBZ0MsRUFBRSxDQUFDO1lBQ3RELHlCQUFtQixHQUFnQyxFQUFFLENBQUM7WUFDdEQseUJBQW1CLEdBQWdDLEVBQUUsQ0FBQztZQUd0RCwySkFBMko7WUFDM0osZ0ZB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QkFBOEIsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDdEUsQ0FBQztRQUNMLHVCQUFDO0lBQUQsQ0FBQyxBQXBWRCxDQUErQix1QkFBVSxHQW9WeEM7SUFFTyw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ2hhcnRWaWV3VG9vbGJhciB9IGZyb20gXCIuL2ludGVyZmFjZXMvY2hhcnRWaWV3VG9vbGJhckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBXaWRnZXRCYXNlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi93aWRnZXRCYXNlXCI7XHJcbmltcG9ydCB7IFRoZW1lUHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3RoZW1lUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgRGlyZWN0b3J5UHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2RpcmVjdG9yeVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IFR5cGVkRXZlbnQgfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL2V2ZW50c1wiO1xyXG5pbXBvcnQgeyBDdXJzb3JTdGF0ZXMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3N0YXRlcy9jdXJzb3JTdGF0ZXNcIjtcclxuaW1wb3J0IHsgQ2hhcnRWaWV3VG9vbFN0YXRlLCBDaGFydFZpZXdUb29sU3RhdGVFbnVtLCBDaGFydFZpZXdab29tRGlyZWN0aW9uU3RhdGUgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3N0YXRlcy9jaGFydFZpZXdUb29sYmFyU3RhdGVzXCI7XHJcbmltcG9ydCB7IFpvb21EaXJlY3Rpb24gfSBmcm9tIFwiLi4vY2hhcnRWaWV3V2lkZ2V0XCI7XHJcbmltcG9ydCB7IERlZmF1bHRDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuL2RlZmF1bHRDb21wb25lbnRTZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnRTZXR0aW5nc1wiO1xyXG5cclxuLyoqXHJcbiAqIEVudW0gb2YgQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkc1xyXG4gKlxyXG4gKiBAZW51bSB7bnVtYmVyfVxyXG4gKi9cclxuZW51bSBDaGFydFZpZXdUb29sYmFyQnV0dG9uSWR7XHJcbiAgICBSZWZDdXJzb3IxID0gXCJSZWZDdXJzb3IxXCIsXHJcbiAgICBSZWZDdXJzb3IyID0gXCJSZWZDdXJzb3IyXCIsXHJcbiAgICBQYW5uaW5nID0gXCJQYW5uaW5nXCIsXHJcbiAgICBCb3hab29tID0gXCJCb3hab29tXCIsXHJcbiAgICBab29tWCA9IFwiWm9vbVhcIixcclxuICAgIFpvb21ZID0gXCJab29tWVwiLFxyXG4gICAgWm9vbVhZID0gXCJab29tWFlcIixcclxuICAgIFJlc2V0Wm9vbSA9IFwiUmVzZXRab29tXCIsXHJcbiAgICBBdXRvU2NhbGUgPSBcIkF1dG9TY2FsZVwiXHJcbn1cclxuXHJcblxyXG5cclxuY2xhc3MgRXZlbnRUb29sYmFyQnV0dG9uQ2xpY2tlZCBleHRlbmRzIFR5cGVkRXZlbnQgPENoYXJ0Vmlld1Rvb2xiYXIsIEV2ZW50VG9vbGJhckJ1dHRvbkNsaWNrZWRBcmdzPiB7fTtcclxuXHJcblxyXG5jbGFzcyBFdmVudFRvb2xiYXJCdXR0b25DbGlja2VkQXJncyB7XHJcbiAgICBzZWxlY3RlZEJ1dHRvbjogYW55O1xyXG4gICAgZ3JvdXBOdW1iZXIgOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHNlbGVjdGVkQnV0dG9uOiBhbnksIGdyb3VwTnVtYmVyOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmdyb3VwTnVtYmVyID0gZ3JvdXBOdW1iZXI7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEJ1dHRvbiA9IHNlbGVjdGVkQnV0dG9uO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqVG9vbGJhciBmb3IgQ2hhcnRWaWV3V2lkZ2V0XHJcbiAqXHJcbiAqIEBjbGFzcyBDaGFydFZpZXdUb29sYmFyXHJcbiAqIEBleHRlbmRzIHtXaWRnZXRCYXNlfVxyXG4gKiBAaW1wbGVtZW50cyB7SUNoYXJ0Vmlld1Rvb2xiYXJ9XHJcbiAqL1xyXG5jbGFzcyBDaGFydFZpZXdUb29sYmFyIGV4dGVuZHMgV2lkZ2V0QmFzZSBpbXBsZW1lbnRzIElDaGFydFZpZXdUb29sYmFyIHtcclxuICAgIFxyXG4gICAgZXZlbnRUb29sYmFyQnV0dG9uQ2xpY2tlZDogRXZlbnRUb29sYmFyQnV0dG9uQ2xpY2tlZDtcclxuXHJcbiAgICBcclxuICAgIHRvb2xiYXJCdXR0b25Hcm91cDEgOiBDaGFydFZpZXdUb29sYmFyQnV0dG9uSWRbXSA9IFtdO1xyXG4gICAgdG9vbGJhckJ1dHRvbkdyb3VwMiA6IENoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZFtdID0gW107XHJcbiAgICB0b29sYmFyQnV0dG9uR3JvdXAzIDogQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkW10gPSBbXTtcclxuXHJcblxyXG4gICAgLy8gaG9sZHMgdGhlIGN1cnJlbnQgY3Vyc29yIHN0YXRlcyB2YWx1ZXMuIFdlIGluaXRpYWxpemUgdGhlIG1lbWJlciBmb3IgZGVmYXVsdC4gVGhlIGVmZmVjdGl2ZSBpbml0aWFsaXphdGlvbiB0YWtlcyBwbGFjZSB3aGVuIHRoZSBleHRlcm5hbCBzaGFyZWQgaW5zdGFuY2VcclxuICAgIC8vIG9mIHRoZSBjdXJzb3Igc3RhdGVzIGlzIGNyZWF0ZWQgYW5kIHJlZmxlY3RlZCB0aHJvdWdoIHRoZSBjdXJvclN0YXRlcyBzZXR0ZXIhXHJcbiAgICBwcm90ZWN0ZWQgX2N1cnNvclN0YXRlczogQ3Vyc29yU3RhdGVzID0gbmV3IEN1cnNvclN0YXRlcygpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLmV2ZW50VG9vbGJhckJ1dHRvbkNsaWNrZWQgPSBuZXcgRXZlbnRUb29sYmFyQnV0dG9uQ2xpY2tlZCgpO1xyXG4gICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNwb3NlIHRoZSBjaGFydCB2aWV3IHRvb2xiYXJcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3VG9vbGJhclxyXG4gICAgICovXHJcbiAgICBkaXNwb3NlKCl7XHJcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xyXG5cclxuICAgICAgICBsZXQgdG9vbGJhciA9IHRoaXMuZ2V0VG9vbGJhckluc3RhbmNlKCk7XHJcbiAgICAgICAgaWYodG9vbGJhciAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0b29sYmFyLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZWQoKXtcclxuICAgICAgICBzdXBlci5pbml0aWFsaXplZCgpO1xyXG5cclxuICAgICAgICB0aGlzLnRvb2xiYXJCdXR0b25Hcm91cDEucHVzaChDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuUmVmQ3Vyc29yMSlcclxuICAgICAgICB0aGlzLnRvb2xiYXJCdXR0b25Hcm91cDEucHVzaChDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuUmVmQ3Vyc29yMilcclxuICAgICAgICB0aGlzLnRvb2xiYXJCdXR0b25Hcm91cDMucHVzaChDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuUGFubmluZylcclxuICAgICAgICB0aGlzLnRvb2xiYXJCdXR0b25Hcm91cDMucHVzaChDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuQm94Wm9vbSlcclxuXHJcbiAgICAgICAgdGhpcy50b29sYmFyQnV0dG9uR3JvdXAyLnB1c2goQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkLlpvb21YKVxyXG4gICAgICAgIHRoaXMudG9vbGJhckJ1dHRvbkdyb3VwMi5wdXNoKENoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZC5ab29tWFkpXHJcbiAgICAgICAgdGhpcy50b29sYmFyQnV0dG9uR3JvdXAyLnB1c2goQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkLlpvb21ZKVxyXG5cclxuICAgICAgICB0aGlzLm9ic2VydmVDaGFydFZpZXdUb29sU3RhdGVDaGFuZ2UoKTtcclxuICAgICAgICB0aGlzLm9ic2VydmVDaGFydFZpZXdab29tRGlyZWN0aW9uU3RhdGVDaGFuZ2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0aWFsaXplQ29tcG9uZW50KCl7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZGVmYXVsdFNldHRpbmdzRGF0YUlkID0gRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLldpZGdldERlZmluaXRpb25JZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGN1cnNvcnMgc3RhdGVzXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHR5cGUge0N1cnNvclN0YXRlc31cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXQgY3Vyc29yc1N0YXRlcygpIDogQ3Vyc29yU3RhdGVzIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY3Vyc29yU3RhdGVzO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBjdXJzb3JzIHN0YXRlcy4gVGhlIG1ldGhvZCBpcyBjYWxsZWQgYXV0b21hdGljYWxseSB3aGVuZXZlciBhIGN1cnNvciBzdGF0ZSBoYXMgYmVlbiBjaGFuZ2VkIGV4dGVybmFsbHkuIFxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBzZXQgY3Vyc29yc1N0YXRlcyhjdXJzb3JTdGF0ZXMgOiBDdXJzb3JTdGF0ZXMpIHtcclxuICAgICAgICBcclxuICAgICAgICAvLyB1cGRhdGUgdGhlIGJhY2t1cCBmaWVsZFxyXG4gICAgICAgIHRoaXMuX2N1cnNvclN0YXRlcyA9IGN1cnNvclN0YXRlcztcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVPbkN1cnNvclN0YXRlc0NoYW5nZXMoY3Vyc29yU3RhdGVzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGN1cnNvciBzdGF0ZXMuXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHBhcmFtIHtDdXJzb3JTdGF0ZXN9IGN1cnNvclN0YXRlc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgdXBkYXRlQ3Vyc29yU3RhdGVzKGN1cnNvclN0YXRlczpDdXJzb3JTdGF0ZXMpe1xyXG4gICAgICAgIC8vIEJJTkRJTkdTT1VSQ0U6IGRpc3BhdGNoZXMgdGhlIG1ldGhvZCBjYWxsIHRvIGJvdW5kIHRhcmdldHNcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9ic2VydmVDaGFydFZpZXdUb29sU3RhdGVDaGFuZ2UoKXtcclxuICAgICAgICB0aGlzLnN0YXRlcy5vYnNlcnZlKHRoaXMsQ2hhcnRWaWV3VG9vbFN0YXRlLCAobW9kaWZpZWRJdGVtIDogQ2hhcnRWaWV3VG9vbFN0YXRlLCBpdGVtOiBDaGFydFZpZXdUb29sU3RhdGUpPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU9uQ2hhcnRWaWV3VG9vbFN0YXRlQ2hhbmdlKG1vZGlmaWVkSXRlbSlcclxuICAgICAgICB9LFwiQ2hhcnRWaWV3VG9vbFN0YXRlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb2JzZXJ2ZUNoYXJ0Vmlld1pvb21EaXJlY3Rpb25TdGF0ZUNoYW5nZSgpe1xyXG4gICAgICAgIHRoaXMuc3RhdGVzLm9ic2VydmUodGhpcyxDaGFydFZpZXdab29tRGlyZWN0aW9uU3RhdGUsIChtb2RpZmllZEl0ZW0gOiBDaGFydFZpZXdab29tRGlyZWN0aW9uU3RhdGUsIGl0ZW06IENoYXJ0Vmlld1pvb21EaXJlY3Rpb25TdGF0ZSk9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlT25DaGFydFZpZXdab29tRGlyZWN0aW9uU3RhdGVDaGFuZ2UobW9kaWZpZWRJdGVtKVxyXG4gICAgICAgIH0sXCJDaGFydFZpZXdab29tRGlyZWN0aW9uU3RhdGVcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IGNvbXBvbmVudCBzZXR0aW5ncyBmb3IgdGhpcyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7KENvbXBvbmVudFNldHRpbmdzfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3VG9vbGJhclxyXG4gICAgICovXHJcbiAgICBnZXREZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MoKTogQ29tcG9uZW50U2V0dGluZ3N8dW5kZWZpbmVke1xyXG4gICAgICAgIHJldHVybiBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuZ2V0Q2hhcnRWaWV3VG9vbGJhckRlZmluaXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZSB0aGUgQ2hhcnRWaWV3VG9vbGJhcnMgTGF5b3V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld1Rvb2xiYXJcclxuICAgICAqL1xyXG4gICAgY3JlYXRlTGF5b3V0KCl7XHJcbiAgICAgICAgdGhpcy5hZGRMYXlvdXREaXZzKCk7XHJcbiAgICAgICAgJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCkuZWpUb29sYmFyKHtcclxuICAgICAgICAgICAgIHdpZHRoOiBcIjEwMCVcIixcclxuICAgICAgICAgICAgIGVuYWJsZVNlcGFyYXRvcjogdHJ1ZSxcclxuICAgICAgICAgICAgIGhlaWdodDogMzMsXHJcbiAgICAgICAgICAgICBjbGljazogKGFyZ3MpID0+IHRoaXMub25DaGFydFZpZXdUb29sYmFyQ2xpY2soYXJncy5jdXJyZW50VGFyZ2V0LmlkKVxyXG4gXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCB0b29sYmFySW5zdGFuY2UgPSB0aGlzLmdldFRvb2xiYXJJbnN0YW5jZSgpO1xyXG4gICAgICAgIGlmKHRvb2xiYXJJbnN0YW5jZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0b29sYmFySW5zdGFuY2Uuc2VsZWN0SXRlbUJ5SUQoQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkLlJlZkN1cnNvcjEpO1xyXG4gICAgICAgICAgICB0b29sYmFySW5zdGFuY2Uuc2VsZWN0SXRlbUJ5SUQoQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkLlpvb21YWSk7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBhZGQgdGhlIG5lZWRlZCBodG1sIGNvZGUgZm9yIHRoZSB0b29sYmFyXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkTGF5b3V0RGl2cygpe1xyXG4gICAgICAgICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpLmFwcGVuZChcclxuICAgICAgICAgICAgXCI8dWw+IFwiICsgXHJcbiAgICAgICAgICAgIFwiPGxpIGlkPSdcIitDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuUmVmQ3Vyc29yMSsgXCInIHN0eWxlPSdiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyB0aGlzLmdldEltYWdlUGF0aChcImN1cnNvcjEuc3ZnXCIpICsgXCIpOyBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0OyBwYWRkaW5nOiAwcHg7IG1hcmdpbjogMHB4OyBiYWNrZ3JvdW5kLXNpemU6IDI0cHggMjRweDsgaGVpZ2h0OiAzMHB4OyB3aWR0aDogMzBweDsgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyIGNlbnRlcjsnIHRpdGxlPSdDdXJzb3IgMSc+IDwvbGk+XCIgKyBcclxuICAgICAgICAgICAgXCI8bGkgaWQ9J1wiK0NoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZC5SZWZDdXJzb3IyKyBcIicgc3R5bGU9J2JhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIHRoaXMuZ2V0SW1hZ2VQYXRoKFwiY3Vyc29yMi5zdmdcIikgKyBcIik7IGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7IHBhZGRpbmc6IDBweDsgbWFyZ2luOiAwcHg7IGJhY2tncm91bmQtc2l6ZTogMjRweCAyNHB4OyBoZWlnaHQ6IDMwcHg7IHdpZHRoOiAzMHB4OyBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyOycgdGl0bGU9J0N1cnNvciAyJz4gPC9saT5cIiArXHJcbiAgICAgICAgICAgIFwiPC91bD5cIiArXHJcblxyXG4gICAgICAgICAgICBcIjx1bD4gXCIgKyBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFwiPGxpIGlkPSdcIitDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuUGFubmluZysgXCInIHN0eWxlPSdiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyB0aGlzLmdldEltYWdlUGF0aChcInBhbm5pbmcuc3ZnXCIpICsgXCIpOyBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0OyBwYWRkaW5nOiAwcHg7IG1hcmdpbjogMHB4OyBiYWNrZ3JvdW5kLXNpemU6IDI0cHggMjRweDsgaGVpZ2h0OiAzMHB4OyB3aWR0aDogMzBweDsgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyIGNlbnRlcjsnIHRpdGxlPSdQYW5uaW5nJz4gPC9saT5cIiArXHJcbiAgICAgICAgICAgIFwiPGxpIGlkPSdcIitDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuQm94Wm9vbSsgXCInIHN0eWxlPSdiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyB0aGlzLmdldEltYWdlUGF0aChcImJveF96b29tLnN2Z1wiKSArIFwiKTsgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDsgcGFkZGluZzogMHB4OyBtYXJnaW46IDBweDsgYmFja2dyb3VuZC1zaXplOiAyNHB4IDI0cHg7IGhlaWdodDogMzBweDsgd2lkdGg6IDMwcHg7IGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlciBjZW50ZXI7JyB0aXRsZT0nQm94Wm9vbSc+IDwvbGk+XCIgK1xyXG5cclxuICAgICAgICAgICAgXCI8L3VsPlwiICtcclxuXHJcbiAgICAgICAgICAgIFwiPHVsPiBcIiArXHJcbiAgICAgICAgICAgIFwiPGxpIGlkPSdcIitDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuWm9vbVhZK1wiJyBzdHlsZT0nYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgdGhpcy5nZXRJbWFnZVBhdGgoXCJ6b29tWFkuc3ZnXCIpICsgXCIpOyBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0OyBwYWRkaW5nOiAwcHg7IG1hcmdpbjogMHB4OyBiYWNrZ3JvdW5kLXNpemU6IDI0cHggMjRweDsgaGVpZ2h0OiAzMHB4OyB3aWR0aDogMzBweDsgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyIGNlbnRlcjsnIHRpdGxlPSdab29tIFhZICc+IDwvbGk+XCIgK1xyXG4gICAgICAgICAgICBcIjxsaSBpZD0nXCIrQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkLlpvb21YKyBcIicgc3R5bGU9J2JhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIHRoaXMuZ2V0SW1hZ2VQYXRoKFwiem9vbVguc3ZnXCIpICsgXCIpOyBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0OyBwYWRkaW5nOiAwcHg7IG1hcmdpbjogMHB4OyBiYWNrZ3JvdW5kLXNpemU6IDI0cHggMjRweDsgaGVpZ2h0OiAzMHB4OyB3aWR0aDogMzBweDsgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyIGNlbnRlcjsnIHRpdGxlPSdab29tIFgnPiA8L2xpPlwiICtcclxuICAgICAgICAgICAgXCI8bGkgaWQ9J1wiK0NoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZC5ab29tWSsgXCInIHN0eWxlPSdiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyB0aGlzLmdldEltYWdlUGF0aChcInpvb21ZLnN2Z1wiKSArIFwiKTsgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDsgcGFkZGluZzogMHB4OyBtYXJnaW46IDBweDsgYmFja2dyb3VuZC1zaXplOiAyNHB4IDI0cHg7IGhlaWdodDogMzBweDsgd2lkdGg6IDMwcHg7IGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlciBjZW50ZXI7JyB0aXRsZT0nWm9vbSBZJz4gPC9saT5cIiArXHJcbiAgICAgICAgICAgIFwiPC91bD5cIiArXHJcblxyXG4gICAgICAgICAgICBcIjx1bD4gXCIgKyBcclxuICAgICAgICAgICAgXCI8bGkgaWQ9J1wiK0NoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZC5BdXRvU2NhbGUrXCInIHN0eWxlPSdiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyB0aGlzLmdldEltYWdlUGF0aChcInpvb21fYXV0b3NjYWxlLnN2Z1wiKSArIFwiKTsgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDsgcGFkZGluZzogMHB4OyBtYXJnaW46IDBweDsgYmFja2dyb3VuZC1zaXplOiAyNHB4IDI0cHg7IGhlaWdodDogMzBweDsgd2lkdGg6IDMwcHg7IGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlciBjZW50ZXI7JyB0aXRsZT0nQXV0byBTY2FsZSc+IDwvbGk+XCIgK1xyXG4gICAgICAgICAgICBcIjxsaSBpZD0nXCIrQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkLlJlc2V0Wm9vbStcIicgc3R5bGU9J2JhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIHRoaXMuZ2V0SW1hZ2VQYXRoKFwiem9vbV9yZXNldF9hbGwuc3ZnXCIpICsgXCIpOyBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0OyBwYWRkaW5nOiAwcHg7IG1hcmdpbjogMHB4OyBiYWNrZ3JvdW5kLXNpemU6IDI0cHggMjRweDsgaGVpZ2h0OiAzMHB4OyB3aWR0aDogMzBweDsgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyIGNlbnRlcjsnIHRpdGxlPSdSZXNldCBBbGwnPiA8L2xpPlwiICtcclxuICAgICAgICAgICAgXCI8L3VsPlwiXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJldHVybiB0aGUgUGF0aCBvZiBhbiBpbWFnZSBieSBpdHMgbmFtZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW1hZ2VOYW1lXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld1Rvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRJbWFnZVBhdGgoaW1hZ2VOYW1lOiBzdHJpbmcpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIFRoZW1lUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXRUaGVtZWRGaWxlUGF0aChcIi4uLy4uL1wiICsgRGlyZWN0b3J5UHJvdmlkZXIuZ2V0V2lkZ2V0c0RpcmVjdG9yeSgpICsgXCJjaGFydFZpZXdXaWRnZXQvc3R5bGUvaW1hZ2VzL3Rvb2xiYXIvXCIgKyBpbWFnZU5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogIGRlc2VsZWN0IGFsbCB0b29sYmFyIGl0ZW1zIGFuZCByZW1vdmUgaGlnaGxpZ2h0aW5nXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZGVzZWxlY3RUb29sYmFyR3JvdXAodG9vbGJhckdyb3VwOiBDaGFydFZpZXdUb29sYmFyQnV0dG9uSWRbXSl7XHJcbiAgICAgICAgbGV0IHRvb2xiYXJJbnN0YW5jZSA9IHRoaXMuZ2V0VG9vbGJhckluc3RhbmNlKCk7XHJcbiAgICAgICAgaWYodG9vbGJhckluc3RhbmNlICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0b29sYmFyR3JvdXAubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgICAgICB0b29sYmFySW5zdGFuY2UuZGVzZWxlY3RJdGVtQnlJRCh0b29sYmFyR3JvdXBbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmVhY3Qgb24gYSBtb3VzZSBjbGljayBvbiBvbmUgb2YgdGhlIHRvb2xiYXJzIGJ1dHRvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtDaGFydFZpZXdUb29sYmFyQnV0dG9uSWR9IGJ1dHRvbklEXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3VG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uQ2hhcnRWaWV3VG9vbGJhckNsaWNrKGJ1dHRvbklEIDogQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkKXtcclxuXHJcbiAgICAgIFxyXG5cclxuICAgICAgICBsZXQgdG9vbHN0YXRlIDogQ2hhcnRWaWV3VG9vbFN0YXRlID0gdGhpcy5zdGF0ZXMucmVhZChDaGFydFZpZXdUb29sU3RhdGUsXCJDaGFydFZpZXdUb29sU3RhdGVcIik7XHJcblxyXG4gICAgICAgIGxldCB6b29tRGlyZWN0aW9uU3RhdGUgOiBDaGFydFZpZXdab29tRGlyZWN0aW9uU3RhdGUgPSB0aGlzLnN0YXRlcy5yZWFkKENoYXJ0Vmlld1pvb21EaXJlY3Rpb25TdGF0ZSxcIkNoYXJ0Vmlld1pvb21EaXJlY3Rpb25TdGF0ZVwiKTtcclxuXHJcbiAgICAgICAgc3dpdGNoIChidXR0b25JRCl7XHJcbiAgICAgICAgICAgIGNhc2UgQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkLkJveFpvb206XHJcbiAgICAgICAgICAgICAgICB0b29sc3RhdGUuc2VsZWN0ZWRUb29sID0gQ2hhcnRWaWV3VG9vbFN0YXRlRW51bS5CT1haT09NO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkLlBhbm5pbmc6XHJcbiAgICAgICAgICAgICAgICB0b29sc3RhdGUuc2VsZWN0ZWRUb29sID0gQ2hhcnRWaWV3VG9vbFN0YXRlRW51bS5QQU5OSU5HO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkLlJlZkN1cnNvcjE6XHJcbiAgICAgICAgICAgICAgICB0b29sc3RhdGUuc2VsZWN0ZWRUb29sID0gQ2hhcnRWaWV3VG9vbFN0YXRlRW51bS5DVVJTT1JTO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJzb3JzU3RhdGVzLnNldFNlbGVjdGVkKDAsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkLlJlZkN1cnNvcjI6XHJcbiAgICAgICAgICAgICAgICB0b29sc3RhdGUuc2VsZWN0ZWRUb29sID0gQ2hhcnRWaWV3VG9vbFN0YXRlRW51bS5DVVJTT1JTO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJzb3JzU3RhdGVzLnNldFNlbGVjdGVkKDEsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkLlpvb21YOlxyXG4gICAgICAgICAgICAgICAgem9vbURpcmVjdGlvblN0YXRlLnpvb21EaXJlY3Rpb24gPSBab29tRGlyZWN0aW9uLlg7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuWm9vbVk6XHJcbiAgICAgICAgICAgICAgICB6b29tRGlyZWN0aW9uU3RhdGUuem9vbURpcmVjdGlvbiA9IFpvb21EaXJlY3Rpb24uWTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIENoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZC5ab29tWFk6XHJcbiAgICAgICAgICAgICAgICB6b29tRGlyZWN0aW9uU3RhdGUuem9vbURpcmVjdGlvbiA9IFpvb21EaXJlY3Rpb24uWFk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkLkF1dG9TY2FsZTpcclxuICAgICAgICAgICAgICAgIC8vVE9ETzogcmVtb3ZlIEV2ZW50IGFuZCBmaW5kIHNvbHV0aW9uIHZpYSBzdGF0ZXNcclxuICAgICAgICAgICAgICAgIGxldCBldmVudFRvb2xiYXJCdXR0b25DbGlja2VkQXJnczogRXZlbnRUb29sYmFyQnV0dG9uQ2xpY2tlZEFyZ3MgPSBuZXcgRXZlbnRUb29sYmFyQnV0dG9uQ2xpY2tlZEFyZ3MoMCwgMylcclxuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRUb29sYmFyQnV0dG9uQ2xpY2tlZC5yYWlzZSh0aGlzLCBldmVudFRvb2xiYXJCdXR0b25DbGlja2VkQXJncyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuUmVzZXRab29tOlxyXG4gICAgICAgICAgICAgICAgLy9UT0RPOiByZW1vdmUgRXZlbnQgYW5kIGZpbmQgc29sdXRpb24gdmlhIHN0YXRlc1xyXG4gICAgICAgICAgICAgICAgbGV0IGV2ZW50VG9vbGJhckJ1dHRvbkNsaWNrZWRBcmdzMjogRXZlbnRUb29sYmFyQnV0dG9uQ2xpY2tlZEFyZ3MgPSBuZXcgRXZlbnRUb29sYmFyQnV0dG9uQ2xpY2tlZEFyZ3MoMCwgNClcclxuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRUb29sYmFyQnV0dG9uQ2xpY2tlZC5yYWlzZSh0aGlzLCBldmVudFRvb2xiYXJCdXR0b25DbGlja2VkQXJnczIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnVwZGF0ZUN1cnNvclN0YXRlcyh0aGlzLmN1cnNvcnNTdGF0ZXMpO1xyXG5cclxuICAgICAgICB0aGlzLnN0YXRlcy51cGRhdGUodGhpcyxDaGFydFZpZXdUb29sU3RhdGUsIHRvb2xzdGF0ZSxcIkNoYXJ0Vmlld1Rvb2xTdGF0ZVwiKTtcclxuICAgICAgICB0aGlzLnN0YXRlcy51cGRhdGUodGhpcyxDaGFydFZpZXdab29tRGlyZWN0aW9uU3RhdGUsIHpvb21EaXJlY3Rpb25TdGF0ZSxcIkNoYXJ0Vmlld1pvb21EaXJlY3Rpb25TdGF0ZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGhpZ2hsaWdodCBvbmUgb2YgdGhlIGN1cnNvciBidXR0b24gYXMgdGhlIHNlbGVjdGVkIG9uZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGluZGV4XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3VG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldEN1cnNvckJ1dHRvblNlbGVjdGVkKGluZGV4KXtcclxuICAgICAgICBsZXQgdG9vbGJhckluc3RhbmNlID0gdGhpcy5nZXRUb29sYmFySW5zdGFuY2UoKTtcclxuICAgICAgICBpZih0b29sYmFySW5zdGFuY2UgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgY29uc3QgZmlyc3RGcmVxQ3Vyc29yID0gMjtcclxuICAgICAgICAgICAgY29uc3Qgc2Vjb25kRnJlcUN1cnNvciA9IDM7XHJcbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RUb29sYmFyR3JvdXAodGhpcy50b29sYmFyQnV0dG9uR3JvdXAxKTtcclxuICAgICAgICAgICAgaWYoaW5kZXggPCA0ICYmIHRvb2xiYXJJbnN0YW5jZS5zZWxlY3RJdGVtQnlJRCl7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT0gc2Vjb25kRnJlcUN1cnNvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGluZGV4ID09IGZpcnN0RnJlcUN1cnNvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRvb2xiYXJJbnN0YW5jZS5zZWxlY3RJdGVtQnlJRCh0aGlzLnRvb2xiYXJCdXR0b25Hcm91cDFbaW5kZXhdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldENoYXJ0Vmlld1Rvb2xTZWxlY3RlZChjaGFydFZpZXdUb29sU3RhdGUgOiBDaGFydFZpZXdUb29sU3RhdGVFbnVtKXtcclxuICAgICAgICBsZXQgdG9vbGJhckluc3RhbmNlID0gdGhpcy5nZXRUb29sYmFySW5zdGFuY2UoKTtcclxuICAgICAgICBpZih0b29sYmFySW5zdGFuY2UgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5kZXNlbGVjdFRvb2xiYXJHcm91cCh0aGlzLnRvb2xiYXJCdXR0b25Hcm91cDMpO1xyXG5cclxuICAgICAgICAgICAgc3dpdGNoIChjaGFydFZpZXdUb29sU3RhdGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgQ2hhcnRWaWV3VG9vbFN0YXRlRW51bS5QQU5OSU5HOlxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2xiYXJJbnN0YW5jZS5zZWxlY3RJdGVtQnlJRChDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuUGFubmluZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSBDaGFydFZpZXdUb29sU3RhdGVFbnVtLkJPWFpPT006XHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbGJhckluc3RhbmNlLnNlbGVjdEl0ZW1CeUlEKENoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZC5Cb3hab29tKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFRvb2xiYXJJbnN0YW5jZSgpOiBlai5Ub29sYmFyfHVuZGVmaW5lZHtcclxuICAgICAgICBsZXQgaW5zdGFuY2UgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICBpbnN0YW5jZSA9ICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpLmVqVG9vbGJhcihcImluc3RhbmNlXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaChlKXtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlRvb2xiYXJJbnN0YW5jZSBub3QgYXZhaWxhYmxlXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRab29tRGlyZWN0aW9uQnV0dG9uU2VsZWN0ZWQoY2hhcnRWaWV3Wm9vbURpcmVjdGlvblN0YXRlOiBab29tRGlyZWN0aW9uKSB7XHJcbiAgICAgICAgbGV0IHRvb2xiYXJJbnN0YW5jZSA9IHRoaXMuZ2V0VG9vbGJhckluc3RhbmNlKCk7XHJcbiAgICAgICAgaWYodG9vbGJhckluc3RhbmNlICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RUb29sYmFyR3JvdXAodGhpcy50b29sYmFyQnV0dG9uR3JvdXAyKTtcclxuXHJcbiAgICAgICAgICAgIHN3aXRjaCAoY2hhcnRWaWV3Wm9vbURpcmVjdGlvblN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgWm9vbURpcmVjdGlvbi5YOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9vbGJhckluc3RhbmNlLnNlbGVjdEl0ZW1CeUlEKENoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZC5ab29tWCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgWm9vbURpcmVjdGlvbi5ZOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9vbGJhckluc3RhbmNlLnNlbGVjdEl0ZW1CeUlEKENoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZC5ab29tWSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgWm9vbURpcmVjdGlvbi5YWTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvb2xiYXJJbnN0YW5jZS5zZWxlY3RJdGVtQnlJRChDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuWm9vbVhZKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICBcclxuICAgIHByaXZhdGUgdXBkYXRlT25DdXJzb3JTdGF0ZXNDaGFuZ2VzKG1vZGlmaWVkU3RhdGVzIDogQ3Vyc29yU3RhdGVzKSB7XHJcbiAgICAgICAgdGhpcy5zZXRDdXJzb3JCdXR0b25TZWxlY3RlZChtb2RpZmllZFN0YXRlcy5nZXRTZWxlY3RlZEN1cnNvckluZGV4KCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlT25DaGFydFZpZXdUb29sU3RhdGVDaGFuZ2UobW9kaWZpZWRTdGF0ZXM6IENoYXJ0Vmlld1Rvb2xTdGF0ZSl7XHJcbiAgICAgICAgdGhpcy5zZXRDaGFydFZpZXdUb29sU2VsZWN0ZWQobW9kaWZpZWRTdGF0ZXMuc2VsZWN0ZWRUb29sKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZU9uQ2hhcnRWaWV3Wm9vbURpcmVjdGlvblN0YXRlQ2hhbmdlKG1vZGlmaWVkU3RhdGVzOiBDaGFydFZpZXdab29tRGlyZWN0aW9uU3RhdGUpe1xyXG4gICAgICAgIHRoaXMuc2V0Wm9vbURpcmVjdGlvbkJ1dHRvblNlbGVjdGVkKG1vZGlmaWVkU3RhdGVzLnpvb21EaXJlY3Rpb24pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge0NoYXJ0Vmlld1Rvb2xiYXIsIENoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZCwgRXZlbnRUb29sYmFyQnV0dG9uQ2xpY2tlZH0iXX0=