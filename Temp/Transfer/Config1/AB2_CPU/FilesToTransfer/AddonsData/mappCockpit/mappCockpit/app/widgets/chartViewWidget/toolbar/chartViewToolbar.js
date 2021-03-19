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
define(["require", "exports", "../../common/widgetBase", "../../common/themeProvider", "../../../common/directoryProvider", "../../../framework/events", "../../common/states/cursorStates", "../../common/states/chartViewToolbarStates", "../chartViewWidget", "./defaultPersistingDefinitions"], function (require, exports, widgetBase_1, themeProvider_1, directoryProvider_1, events_1, cursorStates_1, chartViewToolbarStates_1, chartViewWidget_1, defaultPersistingDefinitions_1) {
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
        ChartViewToolbar.prototype.initialize = function (layoutContainerId) {
            _super.prototype.initialize.call(this, layoutContainerId);
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
            this.component.defaultSettingsDataId = defaultPersistingDefinitions_1.DefaultComponentSettings.WidgetDefinitionId;
            this.component.disablePersisting();
        };
        ChartViewToolbar.prototype.getComponentSettings = function () {
            this.component.setSetting("toolbarSettings", this.getToolbarSettings());
            return _super.prototype.getComponentSettings.call(this);
        };
        ChartViewToolbar.prototype.setComponentSettings = function (data) {
            if (data != undefined) {
                _super.prototype.setComponentSettings.call(this, data);
                this.setToolbarSettings(this.component.getSetting("toolbarSettings"));
            }
        };
        ChartViewToolbar.prototype.getToolbarSettings = function () {
            var toolbarInstance = this.getToolbarInstance();
            // TODO: get toolbar selections
        };
        ChartViewToolbar.prototype.setToolbarSettings = function (data) {
            var toolbarInstance = this.getToolbarInstance();
            // TODO: Set toolbarselections
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
         * @returns {*}
         * @memberof ChartViewToolbar
         */
        ChartViewToolbar.prototype.getDefaultComponentSettings = function () {
            return defaultPersistingDefinitions_1.DefaultComponentSettings.getChartViewToolbarDefinition();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRWaWV3VG9vbGJhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jaGFydFZpZXdXaWRnZXQvdG9vbGJhci9jaGFydFZpZXdUb29sYmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFXQTs7OztPQUlHO0lBQ0gsSUFBSyx3QkFVSjtJQVZELFdBQUssd0JBQXdCO1FBQ3pCLHFEQUF5QixDQUFBO1FBQ3pCLHFEQUF5QixDQUFBO1FBQ3pCLCtDQUFtQixDQUFBO1FBQ25CLCtDQUFtQixDQUFBO1FBQ25CLDJDQUFlLENBQUE7UUFDZiwyQ0FBZSxDQUFBO1FBQ2YsNkNBQWlCLENBQUE7UUFDakIsbURBQXVCLENBQUE7UUFDdkIsbURBQXVCLENBQUE7SUFDM0IsQ0FBQyxFQVZJLHdCQUF3QixLQUF4Qix3QkFBd0IsUUFVNUI7SUFzWXlCLDREQUF3QjtJQWxZbEQ7UUFBd0MsNkNBQTREO1FBQXBHOztRQUFzRyxDQUFDO1FBQUQsZ0NBQUM7SUFBRCxDQUFDLEFBQXZHLENBQXdDLG1CQUFVLEdBQXFEO0lBa1luRCw4REFBeUI7SUFsWTBCLENBQUM7SUFHeEc7UUFJSSx1Q0FBWSxjQUFtQixFQUFFLFdBQW1CO1lBRnBELGdCQUFXLEdBQVksQ0FBQyxDQUFDO1lBR3JCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1lBQy9CLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBQ3pDLENBQUM7UUFFTCxvQ0FBQztJQUFELENBQUMsQUFURCxJQVNDO0lBRUQ7Ozs7OztPQU1HO0lBQ0g7UUFBK0Isb0NBQVU7UUFjckM7WUFBQSxZQUNJLGlCQUFPLFNBR1Y7WUFiRCx5QkFBbUIsR0FBZ0MsRUFBRSxDQUFDO1lBQ3RELHlCQUFtQixHQUFnQyxFQUFFLENBQUM7WUFDdEQseUJBQW1CLEdBQWdDLEVBQUUsQ0FBQztZQUd0RCwySkFBMko7WUFDM0osZ0ZB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QUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7Z0JBRXBELFFBQVEsMkJBQTJCLEVBQUU7b0JBQ3pCLEtBQUssK0JBQWEsQ0FBQyxDQUFDO3dCQUNoQixlQUFlLENBQUMsY0FBYyxDQUFDLHdCQUF3QixDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUMvRCxNQUFNO29CQUVWLEtBQUssK0JBQWEsQ0FBQyxDQUFDO3dCQUNoQixlQUFlLENBQUMsY0FBYyxDQUFDLHdCQUF3QixDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUMvRCxNQUFNO29CQUVWLEtBQUssK0JBQWEsQ0FBQyxFQUFFO3dCQUNqQixlQUFlLENBQUMsY0FBYyxDQUFDLHdCQUF3QixDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUNoRSxNQUFNO2lCQUNyQjthQUNKO1FBQ0wsQ0FBQztRQUdPLHNEQUEyQixHQUFuQyxVQUFvQyxjQUE2QjtZQUM3RCxJQUFJLENBQUMsdUJBQXVCLENBQUMsY0FBYyxDQUFDLHNCQUFzQixFQUFFLENBQUMsQ0FBQztRQUMxRSxDQUFDO1FBRU8sMkRBQWdDLEdBQXhDLFVBQXlDLGNBQWtDO1lBQ3ZFLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDL0QsQ0FBQztRQUVPLG9FQUF5QyxHQUFqRCxVQUFrRCxjQUEyQztZQUN6RixJQUFJLENBQUMsOEJBQThCLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3RFLENBQUM7UUFDTCx1QkFBQztJQUFELENBQUMsQUEzV0QsQ0FBK0IsdUJBQVUsR0EyV3hDO0lBRU8sNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUNoYXJ0Vmlld1Rvb2xiYXIgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL2NoYXJ0Vmlld1Rvb2xiYXJJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi8uLi9jb21tb24vd2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBUaGVtZVByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi90aGVtZVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IERpcmVjdG9yeVByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9kaXJlY3RvcnlQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBUeXBlZEV2ZW50IH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9ldmVudHNcIjtcclxuaW1wb3J0IHsgQ3Vyc29yU3RhdGVzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zdGF0ZXMvY3Vyc29yU3RhdGVzXCI7XHJcbmltcG9ydCB7IENoYXJ0Vmlld1Rvb2xTdGF0ZSwgQ2hhcnRWaWV3VG9vbFN0YXRlRW51bSwgQ2hhcnRWaWV3Wm9vbURpcmVjdGlvblN0YXRlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zdGF0ZXMvY2hhcnRWaWV3VG9vbGJhclN0YXRlc1wiO1xyXG5pbXBvcnQgeyBab29tRGlyZWN0aW9uIH0gZnJvbSBcIi4uL2NoYXJ0Vmlld1dpZGdldFwiO1xyXG5pbXBvcnQgeyBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi9kZWZhdWx0UGVyc2lzdGluZ0RlZmluaXRpb25zXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcblxyXG4vKipcclxuICogRW51bSBvZiBDaGFydFZpZXdUb29sYmFyQnV0dG9uSWRzXHJcbiAqXHJcbiAqIEBlbnVtIHtudW1iZXJ9XHJcbiAqL1xyXG5lbnVtIENoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZHtcclxuICAgIFJlZkN1cnNvcjEgPSBcIlJlZkN1cnNvcjFcIixcclxuICAgIFJlZkN1cnNvcjIgPSBcIlJlZkN1cnNvcjJcIixcclxuICAgIFBhbm5pbmcgPSBcIlBhbm5pbmdcIixcclxuICAgIEJveFpvb20gPSBcIkJveFpvb21cIixcclxuICAgIFpvb21YID0gXCJab29tWFwiLFxyXG4gICAgWm9vbVkgPSBcIlpvb21ZXCIsXHJcbiAgICBab29tWFkgPSBcIlpvb21YWVwiLFxyXG4gICAgUmVzZXRab29tID0gXCJSZXNldFpvb21cIixcclxuICAgIEF1dG9TY2FsZSA9IFwiQXV0b1NjYWxlXCJcclxufVxyXG5cclxuXHJcblxyXG5jbGFzcyBFdmVudFRvb2xiYXJCdXR0b25DbGlja2VkIGV4dGVuZHMgVHlwZWRFdmVudCA8Q2hhcnRWaWV3VG9vbGJhciwgRXZlbnRUb29sYmFyQnV0dG9uQ2xpY2tlZEFyZ3M+IHt9O1xyXG5cclxuXHJcbmNsYXNzIEV2ZW50VG9vbGJhckJ1dHRvbkNsaWNrZWRBcmdzIHtcclxuICAgIHNlbGVjdGVkQnV0dG9uOiBhbnk7XHJcbiAgICBncm91cE51bWJlciA6IG51bWJlciA9IDA7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc2VsZWN0ZWRCdXR0b246IGFueSwgZ3JvdXBOdW1iZXI6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuZ3JvdXBOdW1iZXIgPSBncm91cE51bWJlcjtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkQnV0dG9uID0gc2VsZWN0ZWRCdXR0b247XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4vKipcclxuICpUb29sYmFyIGZvciBDaGFydFZpZXdXaWRnZXRcclxuICpcclxuICogQGNsYXNzIENoYXJ0Vmlld1Rvb2xiYXJcclxuICogQGV4dGVuZHMge1dpZGdldEJhc2V9XHJcbiAqIEBpbXBsZW1lbnRzIHtJQ2hhcnRWaWV3VG9vbGJhcn1cclxuICovXHJcbmNsYXNzIENoYXJ0Vmlld1Rvb2xiYXIgZXh0ZW5kcyBXaWRnZXRCYXNlIGltcGxlbWVudHMgSUNoYXJ0Vmlld1Rvb2xiYXIge1xyXG4gICAgXHJcbiAgICBldmVudFRvb2xiYXJCdXR0b25DbGlja2VkOiBFdmVudFRvb2xiYXJCdXR0b25DbGlja2VkO1xyXG5cclxuICAgIFxyXG4gICAgdG9vbGJhckJ1dHRvbkdyb3VwMSA6IENoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZFtdID0gW107XHJcbiAgICB0b29sYmFyQnV0dG9uR3JvdXAyIDogQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkW10gPSBbXTtcclxuICAgIHRvb2xiYXJCdXR0b25Hcm91cDMgOiBDaGFydFZpZXdUb29sYmFyQnV0dG9uSWRbXSA9IFtdO1xyXG5cclxuXHJcbiAgICAvLyBob2xkcyB0aGUgY3VycmVudCBjdXJzb3Igc3RhdGVzIHZhbHVlcy4gV2UgaW5pdGlhbGl6ZSB0aGUgbWVtYmVyIGZvciBkZWZhdWx0LiBUaGUgZWZmZWN0aXZlIGluaXRpYWxpemF0aW9uIHRha2VzIHBsYWNlIHdoZW4gdGhlIGV4dGVybmFsIHNoYXJlZCBpbnN0YW5jZVxyXG4gICAgLy8gb2YgdGhlIGN1cnNvciBzdGF0ZXMgaXMgY3JlYXRlZCBhbmQgcmVmbGVjdGVkIHRocm91Z2ggdGhlIGN1cm9yU3RhdGVzIHNldHRlciFcclxuICAgIHByb3RlY3RlZCBfY3Vyc29yU3RhdGVzOiBDdXJzb3JTdGF0ZXMgPSBuZXcgQ3Vyc29yU3RhdGVzKCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRUb29sYmFyQnV0dG9uQ2xpY2tlZCA9IG5ldyBFdmVudFRvb2xiYXJCdXR0b25DbGlja2VkKCk7XHJcbiAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc3Bvc2UgdGhlIGNoYXJ0IHZpZXcgdG9vbGJhclxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIGRpc3Bvc2UoKXtcclxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XHJcblxyXG4gICAgICAgIGxldCB0b29sYmFyID0gdGhpcy5nZXRUb29sYmFySW5zdGFuY2UoKTtcclxuICAgICAgICBpZih0b29sYmFyICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRvb2xiYXIuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbml0aWFsaXplKGxheW91dENvbnRhaW5lcklkOiBzdHJpbmcpe1xyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQpO1xyXG5cclxuICAgICAgICB0aGlzLnRvb2xiYXJCdXR0b25Hcm91cDEucHVzaChDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuUmVmQ3Vyc29yMSlcclxuICAgICAgICB0aGlzLnRvb2xiYXJCdXR0b25Hcm91cDEucHVzaChDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuUmVmQ3Vyc29yMilcclxuICAgICAgICB0aGlzLnRvb2xiYXJCdXR0b25Hcm91cDMucHVzaChDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuUGFubmluZylcclxuICAgICAgICB0aGlzLnRvb2xiYXJCdXR0b25Hcm91cDMucHVzaChDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuQm94Wm9vbSlcclxuXHJcbiAgICAgICAgdGhpcy50b29sYmFyQnV0dG9uR3JvdXAyLnB1c2goQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkLlpvb21YKVxyXG4gICAgICAgIHRoaXMudG9vbGJhckJ1dHRvbkdyb3VwMi5wdXNoKENoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZC5ab29tWFkpXHJcbiAgICAgICAgdGhpcy50b29sYmFyQnV0dG9uR3JvdXAyLnB1c2goQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkLlpvb21ZKVxyXG5cclxuICAgICAgICB0aGlzLm9ic2VydmVDaGFydFZpZXdUb29sU3RhdGVDaGFuZ2UoKTtcclxuICAgICAgICB0aGlzLm9ic2VydmVDaGFydFZpZXdab29tRGlyZWN0aW9uU3RhdGVDaGFuZ2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0aWFsaXplQ29tcG9uZW50KCl7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZGVmYXVsdFNldHRpbmdzRGF0YUlkID0gRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLldpZGdldERlZmluaXRpb25JZDtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5kaXNhYmxlUGVyc2lzdGluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRDb21wb25lbnRTZXR0aW5ncygpOiBDb21wb25lbnRTZXR0aW5nc3tcclxuXHRcdHRoaXMuY29tcG9uZW50LnNldFNldHRpbmcoXCJ0b29sYmFyU2V0dGluZ3NcIiwgdGhpcy5nZXRUb29sYmFyU2V0dGluZ3MoKSk7XHJcblx0XHRyZXR1cm4gc3VwZXIuZ2V0Q29tcG9uZW50U2V0dGluZ3MoKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXRDb21wb25lbnRTZXR0aW5ncyhkYXRhOiBDb21wb25lbnRTZXR0aW5ncykge1xyXG5cdFx0aWYoZGF0YSAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHRzdXBlci5zZXRDb21wb25lbnRTZXR0aW5ncyhkYXRhKTtcdFx0XHJcblx0XHRcdHRoaXMuc2V0VG9vbGJhclNldHRpbmdzKHRoaXMuY29tcG9uZW50LmdldFNldHRpbmcoXCJ0b29sYmFyU2V0dGluZ3NcIikpO1xyXG5cdFx0fVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIGdldFRvb2xiYXJTZXR0aW5ncygpOiBhbnl7XHJcbiAgICAgICAgbGV0IHRvb2xiYXJJbnN0YW5jZSA9IHRoaXMuZ2V0VG9vbGJhckluc3RhbmNlKCk7XHJcbiAgICAgICAgLy8gVE9ETzogZ2V0IHRvb2xiYXIgc2VsZWN0aW9uc1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0VG9vbGJhclNldHRpbmdzKGRhdGE6IGFueSl7XHJcbiAgICAgICAgbGV0IHRvb2xiYXJJbnN0YW5jZSA9IHRoaXMuZ2V0VG9vbGJhckluc3RhbmNlKCk7XHJcbiAgICAgICAgLy8gVE9ETzogU2V0IHRvb2xiYXJzZWxlY3Rpb25zXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBjdXJzb3JzIHN0YXRlc1xyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEB0eXBlIHtDdXJzb3JTdGF0ZXN9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3VG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0IGN1cnNvcnNTdGF0ZXMoKSA6IEN1cnNvclN0YXRlcyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnNvclN0YXRlcztcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgY3Vyc29ycyBzdGF0ZXMuIFRoZSBtZXRob2QgaXMgY2FsbGVkIGF1dG9tYXRpY2FsbHkgd2hlbmV2ZXIgYSBjdXJzb3Igc3RhdGUgaGFzIGJlZW4gY2hhbmdlZCBleHRlcm5hbGx5LiBcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3VG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgc2V0IGN1cnNvcnNTdGF0ZXMoY3Vyc29yU3RhdGVzIDogQ3Vyc29yU3RhdGVzKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gdXBkYXRlIHRoZSBiYWNrdXAgZmllbGRcclxuICAgICAgICB0aGlzLl9jdXJzb3JTdGF0ZXMgPSBjdXJzb3JTdGF0ZXM7XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlT25DdXJzb3JTdGF0ZXNDaGFuZ2VzKGN1cnNvclN0YXRlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBjdXJzb3Igc3RhdGVzLlxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBwYXJhbSB7Q3Vyc29yU3RhdGVzfSBjdXJzb3JTdGF0ZXNcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHVwZGF0ZUN1cnNvclN0YXRlcyhjdXJzb3JTdGF0ZXM6Q3Vyc29yU3RhdGVzKXtcclxuICAgICAgICAvLyBCSU5ESU5HU09VUkNFOiBkaXNwYXRjaGVzIHRoZSBtZXRob2QgY2FsbCB0byBib3VuZCB0YXJnZXRzXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvYnNlcnZlQ2hhcnRWaWV3VG9vbFN0YXRlQ2hhbmdlKCl7XHJcbiAgICAgICAgdGhpcy5zdGF0ZXMub2JzZXJ2ZSh0aGlzLENoYXJ0Vmlld1Rvb2xTdGF0ZSwgKG1vZGlmaWVkSXRlbSA6IENoYXJ0Vmlld1Rvb2xTdGF0ZSwgaXRlbTogQ2hhcnRWaWV3VG9vbFN0YXRlKT0+IHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVPbkNoYXJ0Vmlld1Rvb2xTdGF0ZUNoYW5nZShtb2RpZmllZEl0ZW0pXHJcbiAgICAgICAgfSxcIkNoYXJ0Vmlld1Rvb2xTdGF0ZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9ic2VydmVDaGFydFZpZXdab29tRGlyZWN0aW9uU3RhdGVDaGFuZ2UoKXtcclxuICAgICAgICB0aGlzLnN0YXRlcy5vYnNlcnZlKHRoaXMsQ2hhcnRWaWV3Wm9vbURpcmVjdGlvblN0YXRlLCAobW9kaWZpZWRJdGVtIDogQ2hhcnRWaWV3Wm9vbURpcmVjdGlvblN0YXRlLCBpdGVtOiBDaGFydFZpZXdab29tRGlyZWN0aW9uU3RhdGUpPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU9uQ2hhcnRWaWV3Wm9vbURpcmVjdGlvblN0YXRlQ2hhbmdlKG1vZGlmaWVkSXRlbSlcclxuICAgICAgICB9LFwiQ2hhcnRWaWV3Wm9vbURpcmVjdGlvblN0YXRlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBjb21wb25lbnQgc2V0dGluZ3MgZm9yIHRoaXMgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3VG9vbGJhclxyXG4gICAgICovXHJcbiAgICBnZXREZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MoKTogQ29tcG9uZW50U2V0dGluZ3N7XHJcbiAgICAgICAgcmV0dXJuIERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5nZXRDaGFydFZpZXdUb29sYmFyRGVmaW5pdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY3JlYXRlIHRoZSBDaGFydFZpZXdUb29sYmFycyBMYXlvdXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3VG9vbGJhclxyXG4gICAgICovXHJcbiAgICBjcmVhdGVMYXlvdXQoKXtcclxuICAgICAgICB0aGlzLmFkZExheW91dERpdnMoKTtcclxuICAgICAgICAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKS5lalRvb2xiYXIoe1xyXG4gICAgICAgICAgICAgd2lkdGg6IFwiMTAwJVwiLFxyXG4gICAgICAgICAgICAgZW5hYmxlU2VwYXJhdG9yOiB0cnVlLFxyXG4gICAgICAgICAgICAgaGVpZ2h0OiAzMyxcclxuICAgICAgICAgICAgIGNsaWNrOiAoYXJncykgPT4gdGhpcy5vbkNoYXJ0Vmlld1Rvb2xiYXJDbGljayhhcmdzLmN1cnJlbnRUYXJnZXQuaWQpXHJcbiBcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IHRvb2xiYXJJbnN0YW5jZSA9IHRoaXMuZ2V0VG9vbGJhckluc3RhbmNlKCk7XHJcbiAgICAgICAgaWYodG9vbGJhckluc3RhbmNlICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRvb2xiYXJJbnN0YW5jZS5zZWxlY3RJdGVtQnlJRChDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuUmVmQ3Vyc29yMSk7XHJcbiAgICAgICAgICAgIHRvb2xiYXJJbnN0YW5jZS5zZWxlY3RJdGVtQnlJRChDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuWm9vbVhZKTtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGFkZCB0aGUgbmVlZGVkIGh0bWwgY29kZSBmb3IgdGhlIHRvb2xiYXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld1Rvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRMYXlvdXREaXZzKCl7XHJcbiAgICAgICAgJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCkuYXBwZW5kKFxyXG4gICAgICAgICAgICBcIjx1bD4gXCIgKyBcclxuICAgICAgICAgICAgXCI8bGkgaWQ9J1wiK0NoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZC5SZWZDdXJzb3IxKyBcIicgc3R5bGU9J2JhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIHRoaXMuZ2V0SW1hZ2VQYXRoKFwiY3Vyc29yMS5zdmdcIikgKyBcIik7IGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7IHBhZGRpbmc6IDBweDsgbWFyZ2luOiAwcHg7IGJhY2tncm91bmQtc2l6ZTogMjRweCAyNHB4OyBoZWlnaHQ6IDMwcHg7IHdpZHRoOiAzMHB4OyBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyOycgdGl0bGU9J0N1cnNvciAxJz4gPC9saT5cIiArIFxyXG4gICAgICAgICAgICBcIjxsaSBpZD0nXCIrQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkLlJlZkN1cnNvcjIrIFwiJyBzdHlsZT0nYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgdGhpcy5nZXRJbWFnZVBhdGgoXCJjdXJzb3IyLnN2Z1wiKSArIFwiKTsgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDsgcGFkZGluZzogMHB4OyBtYXJnaW46IDBweDsgYmFja2dyb3VuZC1zaXplOiAyNHB4IDI0cHg7IGhlaWdodDogMzBweDsgd2lkdGg6IDMwcHg7IGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlciBjZW50ZXI7JyB0aXRsZT0nQ3Vyc29yIDInPiA8L2xpPlwiICtcclxuICAgICAgICAgICAgXCI8L3VsPlwiICtcclxuXHJcbiAgICAgICAgICAgIFwiPHVsPiBcIiArIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgXCI8bGkgaWQ9J1wiK0NoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZC5QYW5uaW5nKyBcIicgc3R5bGU9J2JhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIHRoaXMuZ2V0SW1hZ2VQYXRoKFwicGFubmluZy5zdmdcIikgKyBcIik7IGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7IHBhZGRpbmc6IDBweDsgbWFyZ2luOiAwcHg7IGJhY2tncm91bmQtc2l6ZTogMjRweCAyNHB4OyBoZWlnaHQ6IDMwcHg7IHdpZHRoOiAzMHB4OyBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyOycgdGl0bGU9J1Bhbm5pbmcnPiA8L2xpPlwiICtcclxuICAgICAgICAgICAgXCI8bGkgaWQ9J1wiK0NoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZC5Cb3hab29tKyBcIicgc3R5bGU9J2JhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIHRoaXMuZ2V0SW1hZ2VQYXRoKFwiYm94X3pvb20uc3ZnXCIpICsgXCIpOyBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0OyBwYWRkaW5nOiAwcHg7IG1hcmdpbjogMHB4OyBiYWNrZ3JvdW5kLXNpemU6IDI0cHggMjRweDsgaGVpZ2h0OiAzMHB4OyB3aWR0aDogMzBweDsgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyIGNlbnRlcjsnIHRpdGxlPSdCb3hab29tJz4gPC9saT5cIiArXHJcblxyXG4gICAgICAgICAgICBcIjwvdWw+XCIgK1xyXG5cclxuICAgICAgICAgICAgXCI8dWw+IFwiICtcclxuICAgICAgICAgICAgXCI8bGkgaWQ9J1wiK0NoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZC5ab29tWFkrXCInIHN0eWxlPSdiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyB0aGlzLmdldEltYWdlUGF0aChcInpvb21YWS5zdmdcIikgKyBcIik7IGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7IHBhZGRpbmc6IDBweDsgbWFyZ2luOiAwcHg7IGJhY2tncm91bmQtc2l6ZTogMjRweCAyNHB4OyBoZWlnaHQ6IDMwcHg7IHdpZHRoOiAzMHB4OyBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyOycgdGl0bGU9J1pvb20gWFkgJz4gPC9saT5cIiArXHJcbiAgICAgICAgICAgIFwiPGxpIGlkPSdcIitDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuWm9vbVgrIFwiJyBzdHlsZT0nYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgdGhpcy5nZXRJbWFnZVBhdGgoXCJ6b29tWC5zdmdcIikgKyBcIik7IGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7IHBhZGRpbmc6IDBweDsgbWFyZ2luOiAwcHg7IGJhY2tncm91bmQtc2l6ZTogMjRweCAyNHB4OyBoZWlnaHQ6IDMwcHg7IHdpZHRoOiAzMHB4OyBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyOycgdGl0bGU9J1pvb20gWCc+IDwvbGk+XCIgK1xyXG4gICAgICAgICAgICBcIjxsaSBpZD0nXCIrQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkLlpvb21ZKyBcIicgc3R5bGU9J2JhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIHRoaXMuZ2V0SW1hZ2VQYXRoKFwiem9vbVkuc3ZnXCIpICsgXCIpOyBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0OyBwYWRkaW5nOiAwcHg7IG1hcmdpbjogMHB4OyBiYWNrZ3JvdW5kLXNpemU6IDI0cHggMjRweDsgaGVpZ2h0OiAzMHB4OyB3aWR0aDogMzBweDsgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyIGNlbnRlcjsnIHRpdGxlPSdab29tIFknPiA8L2xpPlwiICtcclxuICAgICAgICAgICAgXCI8L3VsPlwiICtcclxuXHJcbiAgICAgICAgICAgIFwiPHVsPiBcIiArIFxyXG4gICAgICAgICAgICBcIjxsaSBpZD0nXCIrQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkLkF1dG9TY2FsZStcIicgc3R5bGU9J2JhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIHRoaXMuZ2V0SW1hZ2VQYXRoKFwiem9vbV9hdXRvc2NhbGUuc3ZnXCIpICsgXCIpOyBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0OyBwYWRkaW5nOiAwcHg7IG1hcmdpbjogMHB4OyBiYWNrZ3JvdW5kLXNpemU6IDI0cHggMjRweDsgaGVpZ2h0OiAzMHB4OyB3aWR0aDogMzBweDsgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyIGNlbnRlcjsnIHRpdGxlPSdBdXRvIFNjYWxlJz4gPC9saT5cIiArXHJcbiAgICAgICAgICAgIFwiPGxpIGlkPSdcIitDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuUmVzZXRab29tK1wiJyBzdHlsZT0nYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgdGhpcy5nZXRJbWFnZVBhdGgoXCJ6b29tX3Jlc2V0X2FsbC5zdmdcIikgKyBcIik7IGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7IHBhZGRpbmc6IDBweDsgbWFyZ2luOiAwcHg7IGJhY2tncm91bmQtc2l6ZTogMjRweCAyNHB4OyBoZWlnaHQ6IDMwcHg7IHdpZHRoOiAzMHB4OyBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyOycgdGl0bGU9J1Jlc2V0IEFsbCc+IDwvbGk+XCIgK1xyXG4gICAgICAgICAgICBcIjwvdWw+XCJcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmV0dXJuIHRoZSBQYXRoIG9mIGFuIGltYWdlIGJ5IGl0cyBuYW1lXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbWFnZU5hbWVcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3VG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldEltYWdlUGF0aChpbWFnZU5hbWU6IHN0cmluZyk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gVGhlbWVQcm92aWRlci5nZXRJbnN0YW5jZSgpLmdldFRoZW1lZEZpbGVQYXRoKFwiLi4vLi4vXCIgKyBEaXJlY3RvcnlQcm92aWRlci5nZXRXaWRnZXRzRGlyZWN0b3J5KCkgKyBcImNoYXJ0Vmlld1dpZGdldC9zdHlsZS9pbWFnZXMvdG9vbGJhci9cIiArIGltYWdlTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAgZGVzZWxlY3QgYWxsIHRvb2xiYXIgaXRlbXMgYW5kIHJlbW92ZSBoaWdobGlnaHRpbmdcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0Vmlld1Rvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkZXNlbGVjdFRvb2xiYXJHcm91cCh0b29sYmFyR3JvdXA6IENoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZFtdKXtcclxuICAgICAgICBsZXQgdG9vbGJhckluc3RhbmNlID0gdGhpcy5nZXRUb29sYmFySW5zdGFuY2UoKTtcclxuICAgICAgICBpZih0b29sYmFySW5zdGFuY2UgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRvb2xiYXJHcm91cC5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgICAgIHRvb2xiYXJJbnN0YW5jZS5kZXNlbGVjdEl0ZW1CeUlEKHRvb2xiYXJHcm91cFtpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZWFjdCBvbiBhIG1vdXNlIGNsaWNrIG9uIG9uZSBvZiB0aGUgdG9vbGJhcnMgYnV0dG9uc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0NoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZH0gYnV0dG9uSURcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25DaGFydFZpZXdUb29sYmFyQ2xpY2soYnV0dG9uSUQgOiBDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQpe1xyXG5cclxuICAgICAgXHJcblxyXG4gICAgICAgIGxldCB0b29sc3RhdGUgOiBDaGFydFZpZXdUb29sU3RhdGUgPSB0aGlzLnN0YXRlcy5yZWFkKENoYXJ0Vmlld1Rvb2xTdGF0ZSxcIkNoYXJ0Vmlld1Rvb2xTdGF0ZVwiKTtcclxuXHJcbiAgICAgICAgbGV0IHpvb21EaXJlY3Rpb25TdGF0ZSA6IENoYXJ0Vmlld1pvb21EaXJlY3Rpb25TdGF0ZSA9IHRoaXMuc3RhdGVzLnJlYWQoQ2hhcnRWaWV3Wm9vbURpcmVjdGlvblN0YXRlLFwiQ2hhcnRWaWV3Wm9vbURpcmVjdGlvblN0YXRlXCIpO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKGJ1dHRvbklEKXtcclxuICAgICAgICAgICAgY2FzZSBDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuQm94Wm9vbTpcclxuICAgICAgICAgICAgICAgIHRvb2xzdGF0ZS5zZWxlY3RlZFRvb2wgPSBDaGFydFZpZXdUb29sU3RhdGVFbnVtLkJPWFpPT007XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuUGFubmluZzpcclxuICAgICAgICAgICAgICAgIHRvb2xzdGF0ZS5zZWxlY3RlZFRvb2wgPSBDaGFydFZpZXdUb29sU3RhdGVFbnVtLlBBTk5JTkc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuUmVmQ3Vyc29yMTpcclxuICAgICAgICAgICAgICAgIHRvb2xzdGF0ZS5zZWxlY3RlZFRvb2wgPSBDaGFydFZpZXdUb29sU3RhdGVFbnVtLkNVUlNPUlM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnNvcnNTdGF0ZXMuc2V0U2VsZWN0ZWQoMCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuUmVmQ3Vyc29yMjpcclxuICAgICAgICAgICAgICAgIHRvb2xzdGF0ZS5zZWxlY3RlZFRvb2wgPSBDaGFydFZpZXdUb29sU3RhdGVFbnVtLkNVUlNPUlM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnNvcnNTdGF0ZXMuc2V0U2VsZWN0ZWQoMSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuWm9vbVg6XHJcbiAgICAgICAgICAgICAgICB6b29tRGlyZWN0aW9uU3RhdGUuem9vbURpcmVjdGlvbiA9IFpvb21EaXJlY3Rpb24uWDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIENoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZC5ab29tWTpcclxuICAgICAgICAgICAgICAgIHpvb21EaXJlY3Rpb25TdGF0ZS56b29tRGlyZWN0aW9uID0gWm9vbURpcmVjdGlvbi5ZO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkLlpvb21YWTpcclxuICAgICAgICAgICAgICAgIHpvb21EaXJlY3Rpb25TdGF0ZS56b29tRGlyZWN0aW9uID0gWm9vbURpcmVjdGlvbi5YWTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSBDaGFydFZpZXdUb29sYmFyQnV0dG9uSWQuQXV0b1NjYWxlOlxyXG4gICAgICAgICAgICAgICAgLy9UT0RPOiByZW1vdmUgRXZlbnQgYW5kIGZpbmQgc29sdXRpb24gdmlhIHN0YXRlc1xyXG4gICAgICAgICAgICAgICAgbGV0IGV2ZW50VG9vbGJhckJ1dHRvbkNsaWNrZWRBcmdzOiBFdmVudFRvb2xiYXJCdXR0b25DbGlja2VkQXJncyA9IG5ldyBFdmVudFRvb2xiYXJCdXR0b25DbGlja2VkQXJncygwLCAzKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5ldmVudFRvb2xiYXJCdXR0b25DbGlja2VkLnJhaXNlKHRoaXMsIGV2ZW50VG9vbGJhckJ1dHRvbkNsaWNrZWRBcmdzKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIENoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZC5SZXNldFpvb206XHJcbiAgICAgICAgICAgICAgICAvL1RPRE86IHJlbW92ZSBFdmVudCBhbmQgZmluZCBzb2x1dGlvbiB2aWEgc3RhdGVzXHJcbiAgICAgICAgICAgICAgICBsZXQgZXZlbnRUb29sYmFyQnV0dG9uQ2xpY2tlZEFyZ3MyOiBFdmVudFRvb2xiYXJCdXR0b25DbGlja2VkQXJncyA9IG5ldyBFdmVudFRvb2xiYXJCdXR0b25DbGlja2VkQXJncygwLCA0KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5ldmVudFRvb2xiYXJCdXR0b25DbGlja2VkLnJhaXNlKHRoaXMsIGV2ZW50VG9vbGJhckJ1dHRvbkNsaWNrZWRBcmdzMik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMudXBkYXRlQ3Vyc29yU3RhdGVzKHRoaXMuY3Vyc29yc1N0YXRlcyk7XHJcblxyXG4gICAgICAgIHRoaXMuc3RhdGVzLnVwZGF0ZSh0aGlzLENoYXJ0Vmlld1Rvb2xTdGF0ZSwgdG9vbHN0YXRlLFwiQ2hhcnRWaWV3VG9vbFN0YXRlXCIpO1xyXG4gICAgICAgIHRoaXMuc3RhdGVzLnVwZGF0ZSh0aGlzLENoYXJ0Vmlld1pvb21EaXJlY3Rpb25TdGF0ZSwgem9vbURpcmVjdGlvblN0YXRlLFwiQ2hhcnRWaWV3Wm9vbURpcmVjdGlvblN0YXRlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogaGlnaGxpZ2h0IG9uZSBvZiB0aGUgY3Vyc29yIGJ1dHRvbiBhcyB0aGUgc2VsZWN0ZWQgb25lXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gaW5kZXhcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydFZpZXdUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0Q3Vyc29yQnV0dG9uU2VsZWN0ZWQoaW5kZXgpe1xyXG4gICAgICAgIGxldCB0b29sYmFySW5zdGFuY2UgPSB0aGlzLmdldFRvb2xiYXJJbnN0YW5jZSgpO1xyXG4gICAgICAgIGlmKHRvb2xiYXJJbnN0YW5jZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBjb25zdCBmaXJzdEZyZXFDdXJzb3IgPSAyO1xyXG4gICAgICAgICAgICBjb25zdCBzZWNvbmRGcmVxQ3Vyc29yID0gMztcclxuICAgICAgICAgICAgdGhpcy5kZXNlbGVjdFRvb2xiYXJHcm91cCh0aGlzLnRvb2xiYXJCdXR0b25Hcm91cDEpO1xyXG4gICAgICAgICAgICBpZihpbmRleCA8IDQgJiYgdG9vbGJhckluc3RhbmNlLnNlbGVjdEl0ZW1CeUlEKXtcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PSBzZWNvbmRGcmVxQ3Vyc29yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaW5kZXggPT0gZmlyc3RGcmVxQ3Vyc29yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdG9vbGJhckluc3RhbmNlLnNlbGVjdEl0ZW1CeUlEKHRoaXMudG9vbGJhckJ1dHRvbkdyb3VwMVtpbmRleF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0Q2hhcnRWaWV3VG9vbFNlbGVjdGVkKGNoYXJ0Vmlld1Rvb2xTdGF0ZSA6IENoYXJ0Vmlld1Rvb2xTdGF0ZUVudW0pe1xyXG4gICAgICAgIGxldCB0b29sYmFySW5zdGFuY2UgPSB0aGlzLmdldFRvb2xiYXJJbnN0YW5jZSgpO1xyXG4gICAgICAgIGlmKHRvb2xiYXJJbnN0YW5jZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmRlc2VsZWN0VG9vbGJhckdyb3VwKHRoaXMudG9vbGJhckJ1dHRvbkdyb3VwMyk7XHJcblxyXG4gICAgICAgICAgICBzd2l0Y2ggKGNoYXJ0Vmlld1Rvb2xTdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBDaGFydFZpZXdUb29sU3RhdGVFbnVtLlBBTk5JTkc6XHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbGJhckluc3RhbmNlLnNlbGVjdEl0ZW1CeUlEKENoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZC5QYW5uaW5nKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlIENoYXJ0Vmlld1Rvb2xTdGF0ZUVudW0uQk9YWk9PTTpcclxuICAgICAgICAgICAgICAgICAgICB0b29sYmFySW5zdGFuY2Uuc2VsZWN0SXRlbUJ5SUQoQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkLkJveFpvb20pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0VG9vbGJhckluc3RhbmNlKCk6IGVqLlRvb2xiYXJ8dW5kZWZpbmVke1xyXG4gICAgICAgIGxldCBpbnN0YW5jZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIGluc3RhbmNlID0gJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCkuZWpUb29sYmFyKFwiaW5zdGFuY2VcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoKGUpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVG9vbGJhckluc3RhbmNlIG5vdCBhdmFpbGFibGVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFpvb21EaXJlY3Rpb25CdXR0b25TZWxlY3RlZChjaGFydFZpZXdab29tRGlyZWN0aW9uU3RhdGU6IFpvb21EaXJlY3Rpb24pIHtcclxuICAgICAgICBsZXQgdG9vbGJhckluc3RhbmNlID0gdGhpcy5nZXRUb29sYmFySW5zdGFuY2UoKTtcclxuICAgICAgICBpZih0b29sYmFySW5zdGFuY2UgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5kZXNlbGVjdFRvb2xiYXJHcm91cCh0aGlzLnRvb2xiYXJCdXR0b25Hcm91cDIpO1xyXG5cclxuICAgICAgICAgICAgc3dpdGNoIChjaGFydFZpZXdab29tRGlyZWN0aW9uU3RhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBab29tRGlyZWN0aW9uLlg6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b29sYmFySW5zdGFuY2Uuc2VsZWN0SXRlbUJ5SUQoQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkLlpvb21YKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBab29tRGlyZWN0aW9uLlk6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b29sYmFySW5zdGFuY2Uuc2VsZWN0SXRlbUJ5SUQoQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkLlpvb21ZKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBab29tRGlyZWN0aW9uLlhZOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9vbGJhckluc3RhbmNlLnNlbGVjdEl0ZW1CeUlEKENoYXJ0Vmlld1Rvb2xiYXJCdXR0b25JZC5ab29tWFkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gIFxyXG4gICAgcHJpdmF0ZSB1cGRhdGVPbkN1cnNvclN0YXRlc0NoYW5nZXMobW9kaWZpZWRTdGF0ZXMgOiBDdXJzb3JTdGF0ZXMpIHtcclxuICAgICAgICB0aGlzLnNldEN1cnNvckJ1dHRvblNlbGVjdGVkKG1vZGlmaWVkU3RhdGVzLmdldFNlbGVjdGVkQ3Vyc29ySW5kZXgoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVPbkNoYXJ0Vmlld1Rvb2xTdGF0ZUNoYW5nZShtb2RpZmllZFN0YXRlczogQ2hhcnRWaWV3VG9vbFN0YXRlKXtcclxuICAgICAgICB0aGlzLnNldENoYXJ0Vmlld1Rvb2xTZWxlY3RlZChtb2RpZmllZFN0YXRlcy5zZWxlY3RlZFRvb2wpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlT25DaGFydFZpZXdab29tRGlyZWN0aW9uU3RhdGVDaGFuZ2UobW9kaWZpZWRTdGF0ZXM6IENoYXJ0Vmlld1pvb21EaXJlY3Rpb25TdGF0ZSl7XHJcbiAgICAgICAgdGhpcy5zZXRab29tRGlyZWN0aW9uQnV0dG9uU2VsZWN0ZWQobW9kaWZpZWRTdGF0ZXMuem9vbURpcmVjdGlvbik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7Q2hhcnRWaWV3VG9vbGJhciwgQ2hhcnRWaWV3VG9vbGJhckJ1dHRvbklkLCBFdmVudFRvb2xiYXJCdXR0b25DbGlja2VkfSJdfQ==