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
define(["require", "exports", "../../common/treeGridToolbarBase", "../interfaces/cursorInfoWidgetInterface", "../../../common/directoryProvider"], function (require, exports, treeGridToolbarBase_1, cursorInfoWidgetInterface_1, directoryProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CursorInfoTreeGridToolbar = /** @class */ (function (_super) {
        __extends(CursorInfoTreeGridToolbar, _super);
        /**
         * Creates an instance of CursorInfoTreeGridToolbar.
         * @param {string} parentId
         * @memberof CursorInfoTreeGridToolbar
         */
        function CursorInfoTreeGridToolbar(parentId) {
            var _this = _super.call(this, parentId) || this;
            _this._toolbarIdCursor1 = "Cursor1";
            _this._toolbarToolTipCursor1 = "Selects the first cursor";
            _this._toolbarIdCursor2 = "Cursor2";
            _this._toolbarToolTipCursor2 = "Selects the second cursor";
            //private readonly _toolbarIdMoveExtendedLeft ="MoveExtendedLeft";
            //private readonly _toolbarToolTipMoveExtendedLeft ="Moves the selected cursor to the left(extended)";
            _this._toolbarIdMoveLeft = "MoveLeft";
            _this._toolbarToolTipMoveLeft = "Moves the selected cursor to the left";
            _this._toolbarIdMoveRight = "MoveRight";
            _this._toolbarToolTipMoveRight = "Moves the selected cursor to the right";
            //private readonly _toolbarIdMoveExtendedRight ="MoveExtendedRight";
            //private readonly _toolbarToolTipMoveExtendedRight ="Moves the selected cursor to the right(extended)";
            _this._toolbarIdCursorInfoSelector = "ToogleFilter";
            _this._toolbarToolTipCursorInfoSelector = "Choose cursor informations for the selected signals";
            _this._selectedCursorIndex = -1;
            _this.cursorInfoSelectionIsActive = false;
            var imageDirectory = "../../../" + directoryProvider_1.DirectoryProvider.getWidgetsDirectory() + "cursorInfoWidget/style/images/toolbar/";
            _this.addToolbarButton(_this._toolbarIdCursor1, _this._toolbarToolTipCursor1, imageDirectory + "cursor1.svg");
            _this.addToolbarButton(_this._toolbarIdCursor2, _this._toolbarToolTipCursor2, imageDirectory + "cursor2.svg");
            //this.addToolbarButton(this._toolbarIdMoveExtendedLeft, this._toolbarToolTipMoveExtendedLeft, imageDirectory + "moveExtendedLeft.svg");
            _this.addToolbarButton(_this._toolbarIdMoveLeft, _this._toolbarToolTipMoveLeft, imageDirectory + "moveLeft.svg");
            _this.addToolbarButton(_this._toolbarIdMoveRight, _this._toolbarToolTipMoveRight, imageDirectory + "moveRight.svg");
            //this.addToolbarButton(this._toolbarIdMoveExtendedRight, this._toolbarToolTipMoveExtendedRight, imageDirectory + "moveExtendedRight.svg");
            _this.addCollapseButton();
            _this.addExpandButton();
            _this.addToolbarButton(_this._toolbarIdCursorInfoSelector, _this._toolbarToolTipCursorInfoSelector, imageDirectory + "toggleVisibility.svg", treeGridToolbarBase_1.ToolbarButtonAlignment.Right);
            return _this;
        }
        /**
         * Reacts on toolbar click
         *
         * @param {*} args
         * @param {ICursorInfoWidget} widget
         * @memberof CursorInfoTreeGridToolbar
         */
        CursorInfoTreeGridToolbar.prototype.toolbarClick = function (args, widget) {
            _super.prototype.toolbarClickBase.call(this, args);
            var clickedToolbarId = this.getClickedToolbarId(args.itemName, args.model.toolbarSettings);
            if (clickedToolbarId == this._toolbarIdCursor1) {
                widget.onReferenceCursorSelected(0);
                args.cancel = true;
            }
            else if (clickedToolbarId == this._toolbarIdCursor2) {
                widget.onReferenceCursorSelected(1);
                args.cancel = true;
            }
            /*else if (clickedToolbarId == this._toolbarIdMoveExtendedLeft) {
                widget.onMoveCursor(this._selectedCursorIndex, CursorAction.moveLeftExtended);
                args.cancel = true;
            }*/
            else if (clickedToolbarId == this._toolbarIdMoveLeft) {
                widget.onMoveCursor(this._selectedCursorIndex, cursorInfoWidgetInterface_1.CursorMovement.Left);
                args.cancel = true;
            }
            else if (clickedToolbarId == this._toolbarIdMoveRight) {
                widget.onMoveCursor(this._selectedCursorIndex, cursorInfoWidgetInterface_1.CursorMovement.Right);
                args.cancel = true;
            }
            /*else if (clickedToolbarId == this._toolbarIdMoveExtendedRight) {
                widget.onMoveCursor(this._selectedCursorIndex, CursorAction.moveRightExtended);
                args.cancel = true;
            }*/
            else if (clickedToolbarId == this._toolbarIdCursorInfoSelector) {
                widget.activateCursorInfoSelectorView(!this.cursorInfoSelectionIsActive);
                args.cancel = true;
            }
        };
        /**
         * Shows the correct toolbar buttons for the current view
         *
         * @param {boolean} activate
         * @memberof CursorInfoTreeGridToolbar
         */
        CursorInfoTreeGridToolbar.prototype.activateCursorInfoSelectorView = function (activate) {
            this.cursorInfoSelectionIsActive = activate;
            this.activateButton(this._toolbarIdCursorInfoSelector, activate);
            this.hideButton(this._toolbarIdCursor1, activate);
            this.hideButton(this._toolbarIdCursor2, activate);
            this.hideButton(this._toolbarIdMoveLeft, activate);
            this.hideButton(this._toolbarIdMoveRight, activate);
            this.hideCollapseButton(activate);
            this.hideExpandButton(activate);
        };
        /**
         * Sets the styles of all the toolbar buttons
         *
         * @memberof CursorInfoTreeGridToolbar
        */
        CursorInfoTreeGridToolbar.prototype.setStyleForToolbarIcons = function () {
            _super.prototype.setStyleForToolbarIcons.call(this);
        };
        /**
         * Initializes the toolbar stats
         *
         * @memberof CursorInfoTreeGridToolbar
         */
        CursorInfoTreeGridToolbar.prototype.initToolbarStates = function () {
            // Disable buttons at startup
            this.disableButton(this._toolbarIdMoveLeft, true);
            this.disableButton(this._toolbarIdMoveRight, true);
            this.disableButton(this._toolbarIdCursorInfoSelector, true);
        };
        /**
         * Disables the button for the activation of the cursor info selector view
         *
         * @param {boolean} disable
         * @memberof CursorInfoTreeGridToolbar
         */
        CursorInfoTreeGridToolbar.prototype.disableCursorInfoSelectorButton = function (disable) {
            this.disableButton(this._toolbarIdCursorInfoSelector, disable);
        };
        /**
         * Updates the toolbar buttons (enable only if a cursor is defined)
         *
         * @param {CursorStates} cursorStates
         * @memberof CursorInfoTreeGridToolbar
         */
        CursorInfoTreeGridToolbar.prototype.updateButtonStates = function (cursorStates) {
            // Set selected cursor index
            var selectedCursorIndex = cursorStates.getSelectedCursorIndex();
            this._selectedCursorIndex = selectedCursorIndex;
            // Activate/Deactivate cursor buttons for current selected cursor
            this.activateCursorButton(selectedCursorIndex);
            // Activate/Deactivate cursor move buttons
            this.activateMoveButtons(cursorStates, selectedCursorIndex);
        };
        /**
         * Sets the active cursor index
         * The cursor button for the given index will be set activated(other deactivated)
         *
         *
         * @private
         * @param {number} index
         * @memberof CursorInfoTreeGridToolbar
         */
        CursorInfoTreeGridToolbar.prototype.activateCursorButton = function (index) {
            // Activate or deactivate ref cursor 1 or 2 button
            if (index == 0) {
                this.activateButton(this._toolbarIdCursor1, true);
                this.activateButton(this._toolbarIdCursor2, false);
            }
            else if (index == 1) {
                this.activateButton(this._toolbarIdCursor2, true);
                this.activateButton(this._toolbarIdCursor1, false);
            }
            else {
                this.activateButton(this._toolbarIdCursor2, false);
                this.activateButton(this._toolbarIdCursor1, false);
            }
        };
        /**
         * Sets the move buttons active or inactive for the given selected cursor index
         *
         * @private
         * @param {CursorStates} cursorStates
         * @param {number} selectedCursorIndex
         * @memberof CursorInfoTreeGridToolbar
         */
        CursorInfoTreeGridToolbar.prototype.activateMoveButtons = function (cursorStates, selectedCursorIndex) {
            var selectedCursorIsActive = false;
            if (selectedCursorIndex != -1) {
                if (cursorStates.getActive(selectedCursorIndex) == true) {
                    selectedCursorIsActive = true;
                }
            }
            if (selectedCursorIsActive) {
                this.enableMoveButtons(true);
            }
            else {
                this.enableMoveButtons(false);
            }
        };
        /**
         * Enables the buttons for the cursor move operations
         *
         * @private
         * @param {boolean} enable
         * @memberof CursorInfoTreeGridToolbar
         */
        CursorInfoTreeGridToolbar.prototype.enableMoveButtons = function (enable) {
            this.disableButton(this._toolbarIdMoveLeft, !enable);
            this.disableButton(this._toolbarIdMoveRight, !enable);
        };
        return CursorInfoTreeGridToolbar;
    }(treeGridToolbarBase_1.TreeGridToolbarBase));
    exports.CursorInfoTreeGridToolbar = CursorInfoTreeGridToolbar;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3Vyc29ySW5mb1RyZWVHcmlkVG9vbGJhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jdXJzb3JJbmZvV2lkZ2V0L3ZpZXcvY3Vyc29ySW5mb1RyZWVHcmlkVG9vbGJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBS0E7UUFBK0MsNkNBQW1CO1FBMkI5RDs7OztXQUlHO1FBQ0gsbUNBQVksUUFBZ0I7WUFBNUIsWUFDSSxrQkFBTSxRQUFRLENBQUMsU0FlbEI7WUE5Q2dCLHVCQUFpQixHQUFFLFNBQVMsQ0FBQztZQUM3Qiw0QkFBc0IsR0FBRSwwQkFBMEIsQ0FBQztZQUVuRCx1QkFBaUIsR0FBRSxTQUFTLENBQUM7WUFDN0IsNEJBQXNCLEdBQUUsMkJBQTJCLENBQUM7WUFFckUsa0VBQWtFO1lBQ2xFLHNHQUFzRztZQUVyRix3QkFBa0IsR0FBRSxVQUFVLENBQUM7WUFDL0IsNkJBQXVCLEdBQUUsdUNBQXVDLENBQUM7WUFFakUseUJBQW1CLEdBQUUsV0FBVyxDQUFDO1lBQ2pDLDhCQUF3QixHQUFFLHdDQUF3QyxDQUFDO1lBRXBGLG9FQUFvRTtZQUNwRSx3R0FBd0c7WUFFdkYsa0NBQTRCLEdBQUUsY0FBYyxDQUFDO1lBQzdDLHVDQUFpQyxHQUFFLHFEQUFxRCxDQUFDO1lBRWxHLDBCQUFvQixHQUFXLENBQUMsQ0FBQyxDQUFDO1lBRW5DLGlDQUEyQixHQUFZLEtBQUssQ0FBQztZQVVoRCxJQUFJLGNBQWMsR0FBRyxXQUFXLEdBQUcscUNBQWlCLENBQUMsbUJBQW1CLEVBQUUsR0FBRyx3Q0FBd0MsQ0FBQztZQUV0SCxLQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSSxDQUFDLGlCQUFpQixFQUFFLEtBQUksQ0FBQyxzQkFBc0IsRUFBRSxjQUFjLEdBQUcsYUFBYSxDQUFDLENBQUM7WUFDM0csS0FBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUksQ0FBQyxp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QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3JELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUQsQ0FBQztRQUNMLGdDQUFDO0lBQUQsQ0FBQyxBQXZORCxDQUErQyx5Q0FBbUIsR0F1TmpFO0lBdk5ZLDhEQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRyZWVHcmlkVG9vbGJhckJhc2UsIFRvb2xiYXJCdXR0b25BbGlnbm1lbnQgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3RyZWVHcmlkVG9vbGJhckJhc2VcIjtcclxuaW1wb3J0IHsgSUN1cnNvckluZm9XaWRnZXQsQ3Vyc29yTW92ZW1lbnQgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9jdXJzb3JJbmZvV2lkZ2V0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IERpcmVjdG9yeVByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9kaXJlY3RvcnlQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBDdXJzb3JTdGF0ZXMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3N0YXRlcy9jdXJzb3JTdGF0ZXNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDdXJzb3JJbmZvVHJlZUdyaWRUb29sYmFyIGV4dGVuZHMgVHJlZUdyaWRUb29sYmFyQmFzZXtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfdG9vbGJhcklkQ3Vyc29yMSA9XCJDdXJzb3IxXCI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF90b29sYmFyVG9vbFRpcEN1cnNvcjEgPVwiU2VsZWN0cyB0aGUgZmlyc3QgY3Vyc29yXCI7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfdG9vbGJhcklkQ3Vyc29yMiA9XCJDdXJzb3IyXCI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF90b29sYmFyVG9vbFRpcEN1cnNvcjIgPVwiU2VsZWN0cyB0aGUgc2Vjb25kIGN1cnNvclwiO1xyXG5cclxuICAgIC8vcHJpdmF0ZSByZWFkb25seSBfdG9vbGJhcklkTW92ZUV4dGVuZGVkTGVmdCA9XCJNb3ZlRXh0ZW5kZWRMZWZ0XCI7XHJcbiAgICAvL3ByaXZhdGUgcmVhZG9ubHkgX3Rvb2xiYXJUb29sVGlwTW92ZUV4dGVuZGVkTGVmdCA9XCJNb3ZlcyB0aGUgc2VsZWN0ZWQgY3Vyc29yIHRvIHRoZSBsZWZ0KGV4dGVuZGVkKVwiO1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3Rvb2xiYXJJZE1vdmVMZWZ0ID1cIk1vdmVMZWZ0XCI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF90b29sYmFyVG9vbFRpcE1vdmVMZWZ0ID1cIk1vdmVzIHRoZSBzZWxlY3RlZCBjdXJzb3IgdG8gdGhlIGxlZnRcIjtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF90b29sYmFySWRNb3ZlUmlnaHQgPVwiTW92ZVJpZ2h0XCI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF90b29sYmFyVG9vbFRpcE1vdmVSaWdodCA9XCJNb3ZlcyB0aGUgc2VsZWN0ZWQgY3Vyc29yIHRvIHRoZSByaWdodFwiO1xyXG5cclxuICAgIC8vcHJpdmF0ZSByZWFkb25seSBfdG9vbGJhcklkTW92ZUV4dGVuZGVkUmlnaHQgPVwiTW92ZUV4dGVuZGVkUmlnaHRcIjtcclxuICAgIC8vcHJpdmF0ZSByZWFkb25seSBfdG9vbGJhclRvb2xUaXBNb3ZlRXh0ZW5kZWRSaWdodCA9XCJNb3ZlcyB0aGUgc2VsZWN0ZWQgY3Vyc29yIHRvIHRoZSByaWdodChleHRlbmRlZClcIjtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF90b29sYmFySWRDdXJzb3JJbmZvU2VsZWN0b3IgPVwiVG9vZ2xlRmlsdGVyXCI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF90b29sYmFyVG9vbFRpcEN1cnNvckluZm9TZWxlY3RvciA9XCJDaG9vc2UgY3Vyc29yIGluZm9ybWF0aW9ucyBmb3IgdGhlIHNlbGVjdGVkIHNpZ25hbHNcIjtcclxuXHJcbiAgICBwcml2YXRlIF9zZWxlY3RlZEN1cnNvckluZGV4OiBudW1iZXIgPSAtMTtcclxuXHJcbiAgICBwdWJsaWMgY3Vyc29ySW5mb1NlbGVjdGlvbklzQWN0aXZlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEN1cnNvckluZm9UcmVlR3JpZFRvb2xiYXIuXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGFyZW50SWRcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvVHJlZUdyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHBhcmVudElkOiBzdHJpbmcpe1xyXG4gICAgICAgIHN1cGVyKHBhcmVudElkKTtcclxuXHJcbiAgICAgICAgbGV0IGltYWdlRGlyZWN0b3J5ID0gXCIuLi8uLi8uLi9cIiArIERpcmVjdG9yeVByb3ZpZGVyLmdldFdpZGdldHNEaXJlY3RvcnkoKSArIFwiY3Vyc29ySW5mb1dpZGdldC9zdHlsZS9pbWFnZXMvdG9vbGJhci9cIjtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmFkZFRvb2xiYXJCdXR0b24odGhpcy5fdG9vbGJhcklkQ3Vyc29yMSwgdGhpcy5fdG9vbGJhclRvb2xUaXBDdXJzb3IxLCBpbWFnZURpcmVjdG9yeSArIFwiY3Vyc29yMS5zdmdcIik7XHJcbiAgICAgICAgdGhpcy5hZGRUb29sYmFyQnV0dG9uKHRoaXMuX3Rvb2xiYXJJZEN1cnNvcjIsIHRoaXMuX3Rvb2xiYXJUb29sVGlwQ3Vyc29yMiwgaW1hZ2VEaXJlY3RvcnkgKyBcImN1cnNvcjIuc3ZnXCIpO1xyXG4gICAgICAgIC8vdGhpcy5hZGRUb29sYmFyQnV0dG9uKHRoaXMuX3Rvb2xiYXJJZE1vdmVFeHRlbmRlZExlZnQsIHRoaXMuX3Rvb2xiYXJUb29sVGlwTW92ZUV4dGVuZGVkTGVmdCwgaW1hZ2VEaXJlY3RvcnkgKyBcIm1vdmVFeHRlbmRlZExlZnQuc3ZnXCIpO1xyXG4gICAgICAgIHRoaXMuYWRkVG9vbGJhckJ1dHRvbih0aGlzLl90b29sYmFySWRNb3ZlTGVmdCwgdGhpcy5fdG9vbGJhclRvb2xUaXBNb3ZlTGVmdCwgaW1hZ2VEaXJlY3RvcnkgKyBcIm1vdmVMZWZ0LnN2Z1wiKTtcclxuICAgICAgICB0aGlzLmFkZFRvb2xiYXJCdXR0b24odGhpcy5fdG9vbGJhcklkTW92ZVJpZ2h0LCB0aGlzLl90b29sYmFyVG9vbFRpcE1vdmVSaWdodCwgaW1hZ2VEaXJlY3RvcnkgKyBcIm1vdmVSaWdodC5zdmdcIik7XHJcbiAgICAgICAgLy90aGlzLmFkZFRvb2xiYXJCdXR0b24odGhpcy5fdG9vbGJhcklkTW92ZUV4dGVuZGVkUmlnaHQsIHRoaXMuX3Rvb2xiYXJUb29sVGlwTW92ZUV4dGVuZGVkUmlnaHQsIGltYWdlRGlyZWN0b3J5ICsgXCJtb3ZlRXh0ZW5kZWRSaWdodC5zdmdcIik7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkQ29sbGFwc2VCdXR0b24oKTtcclxuICAgICAgICB0aGlzLmFkZEV4cGFuZEJ1dHRvbigpO1xyXG5cclxuICAgICAgICB0aGlzLmFkZFRvb2xiYXJCdXR0b24odGhpcy5fdG9vbGJhcklkQ3Vyc29ySW5mb1NlbGVjdG9yLCB0aGlzLl90b29sYmFyVG9vbFRpcEN1cnNvckluZm9TZWxlY3RvciwgaW1hZ2VEaXJlY3RvcnkgKyBcInRvZ2dsZVZpc2liaWxpdHkuc3ZnXCIsIFRvb2xiYXJCdXR0b25BbGlnbm1lbnQuUmlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhY3RzIG9uIHRvb2xiYXIgY2xpY2tcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBwYXJhbSB7SUN1cnNvckluZm9XaWRnZXR9IHdpZGdldFxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9UcmVlR3JpZFRvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHRvb2xiYXJDbGljayAoYXJncywgd2lkZ2V0OiBJQ3Vyc29ySW5mb1dpZGdldCl7XHJcbiAgICAgICAgc3VwZXIudG9vbGJhckNsaWNrQmFzZShhcmdzKTtcclxuICAgICAgICB2YXIgY2xpY2tlZFRvb2xiYXJJZCA9IHRoaXMuZ2V0Q2xpY2tlZFRvb2xiYXJJZChhcmdzLml0ZW1OYW1lLCBhcmdzLm1vZGVsLnRvb2xiYXJTZXR0aW5ncyk7XHJcbiAgICAgICAgaWYgKGNsaWNrZWRUb29sYmFySWQgPT0gdGhpcy5fdG9vbGJhcklkQ3Vyc29yMSkge1xyXG4gICAgICAgICAgICB3aWRnZXQub25SZWZlcmVuY2VDdXJzb3JTZWxlY3RlZCgwKTtcclxuICAgICAgICAgICAgYXJncy5jYW5jZWwgPSB0cnVlOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjbGlja2VkVG9vbGJhcklkID09IHRoaXMuX3Rvb2xiYXJJZEN1cnNvcjIpIHtcclxuICAgICAgICAgICAgd2lkZ2V0Lm9uUmVmZXJlbmNlQ3Vyc29yU2VsZWN0ZWQoMSk7XHJcbiAgICAgICAgICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyplbHNlIGlmIChjbGlja2VkVG9vbGJhcklkID09IHRoaXMuX3Rvb2xiYXJJZE1vdmVFeHRlbmRlZExlZnQpIHtcclxuICAgICAgICAgICAgd2lkZ2V0Lm9uTW92ZUN1cnNvcih0aGlzLl9zZWxlY3RlZEN1cnNvckluZGV4LCBDdXJzb3JBY3Rpb24ubW92ZUxlZnRFeHRlbmRlZCk7XHJcbiAgICAgICAgICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuICAgICAgICB9Ki9cclxuICAgICAgICBlbHNlIGlmIChjbGlja2VkVG9vbGJhcklkID09IHRoaXMuX3Rvb2xiYXJJZE1vdmVMZWZ0KSB7XHJcbiAgICAgICAgICAgIHdpZGdldC5vbk1vdmVDdXJzb3IodGhpcy5fc2VsZWN0ZWRDdXJzb3JJbmRleCwgQ3Vyc29yTW92ZW1lbnQuTGVmdCk7XHJcbiAgICAgICAgICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY2xpY2tlZFRvb2xiYXJJZCA9PSB0aGlzLl90b29sYmFySWRNb3ZlUmlnaHQpIHtcclxuICAgICAgICAgICAgd2lkZ2V0Lm9uTW92ZUN1cnNvcih0aGlzLl9zZWxlY3RlZEN1cnNvckluZGV4LCBDdXJzb3JNb3ZlbWVudC5SaWdodCk7XHJcbiAgICAgICAgICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyplbHNlIGlmIChjbGlja2VkVG9vbGJhcklkID09IHRoaXMuX3Rvb2xiYXJJZE1vdmVFeHRlbmRlZFJpZ2h0KSB7XHJcbiAgICAgICAgICAgIHdpZGdldC5vbk1vdmVDdXJzb3IodGhpcy5fc2VsZWN0ZWRDdXJzb3JJbmRleCwgQ3Vyc29yQWN0aW9uLm1vdmVSaWdodEV4dGVuZGVkKTtcclxuICAgICAgICAgICAgYXJncy5jYW5jZWwgPSB0cnVlO1xyXG4gICAgICAgIH0qL1xyXG4gICAgICAgIGVsc2UgaWYgKGNsaWNrZWRUb29sYmFySWQgPT0gdGhpcy5fdG9vbGJhcklkQ3Vyc29ySW5mb1NlbGVjdG9yKSB7XHJcbiAgICAgICAgICAgIHdpZGdldC5hY3RpdmF0ZUN1cnNvckluZm9TZWxlY3RvclZpZXcoIXRoaXMuY3Vyc29ySW5mb1NlbGVjdGlvbklzQWN0aXZlKTtcclxuICAgICAgICAgICAgYXJncy5jYW5jZWwgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNob3dzIHRoZSBjb3JyZWN0IHRvb2xiYXIgYnV0dG9ucyBmb3IgdGhlIGN1cnJlbnQgdmlld1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gYWN0aXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvVHJlZUdyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhY3RpdmF0ZUN1cnNvckluZm9TZWxlY3RvclZpZXcoYWN0aXZhdGU6IGJvb2xlYW4pe1xyXG4gICAgICAgIHRoaXMuY3Vyc29ySW5mb1NlbGVjdGlvbklzQWN0aXZlID0gYWN0aXZhdGU7XHJcbiAgICAgICAgdGhpcy5hY3RpdmF0ZUJ1dHRvbih0aGlzLl90b29sYmFySWRDdXJzb3JJbmZvU2VsZWN0b3IsIGFjdGl2YXRlKVxyXG4gICAgICAgIHRoaXMuaGlkZUJ1dHRvbih0aGlzLl90b29sYmFySWRDdXJzb3IxLCBhY3RpdmF0ZSk7XHJcbiAgICAgICAgdGhpcy5oaWRlQnV0dG9uKHRoaXMuX3Rvb2xiYXJJZEN1cnNvcjIsIGFjdGl2YXRlKTtcclxuICAgICAgICB0aGlzLmhpZGVCdXR0b24odGhpcy5fdG9vbGJhcklkTW92ZUxlZnQsIGFjdGl2YXRlKTtcclxuICAgICAgICB0aGlzLmhpZGVCdXR0b24odGhpcy5fdG9vbGJhcklkTW92ZVJpZ2h0LCBhY3RpdmF0ZSk7XHJcbiAgICAgICAgdGhpcy5oaWRlQ29sbGFwc2VCdXR0b24oYWN0aXZhdGUpO1xyXG4gICAgICAgIHRoaXMuaGlkZUV4cGFuZEJ1dHRvbihhY3RpdmF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBzdHlsZXMgb2YgYWxsIHRoZSB0b29sYmFyIGJ1dHRvbnNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1RyZWVHcmlkVG9vbGJhclxyXG4gICAgKi9cclxuICAgIHB1YmxpYyBzZXRTdHlsZUZvclRvb2xiYXJJY29ucygpIHtcclxuICAgICAgICBzdXBlci5zZXRTdHlsZUZvclRvb2xiYXJJY29ucygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6ZXMgdGhlIHRvb2xiYXIgc3RhdHNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1RyZWVHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaW5pdFRvb2xiYXJTdGF0ZXMoKXtcclxuICAgICAgICAvLyBEaXNhYmxlIGJ1dHRvbnMgYXQgc3RhcnR1cFxyXG4gICAgICAgIHRoaXMuZGlzYWJsZUJ1dHRvbih0aGlzLl90b29sYmFySWRNb3ZlTGVmdCwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlQnV0dG9uKHRoaXMuX3Rvb2xiYXJJZE1vdmVSaWdodCwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlQnV0dG9uKHRoaXMuX3Rvb2xiYXJJZEN1cnNvckluZm9TZWxlY3RvciwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNhYmxlcyB0aGUgYnV0dG9uIGZvciB0aGUgYWN0aXZhdGlvbiBvZiB0aGUgY3Vyc29yIGluZm8gc2VsZWN0b3Igdmlld1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZGlzYWJsZVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9UcmVlR3JpZFRvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRpc2FibGVDdXJzb3JJbmZvU2VsZWN0b3JCdXR0b24oZGlzYWJsZTogYm9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlQnV0dG9uKHRoaXMuX3Rvb2xiYXJJZEN1cnNvckluZm9TZWxlY3RvciwgZGlzYWJsZSk7XHJcbiAgICB9XHJcbiAgXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIHRvb2xiYXIgYnV0dG9ucyAoZW5hYmxlIG9ubHkgaWYgYSBjdXJzb3IgaXMgZGVmaW5lZClcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0N1cnNvclN0YXRlc30gY3Vyc29yU3RhdGVzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1RyZWVHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXBkYXRlQnV0dG9uU3RhdGVzKGN1cnNvclN0YXRlczogQ3Vyc29yU3RhdGVzKXtcclxuICAgICAgICAvLyBTZXQgc2VsZWN0ZWQgY3Vyc29yIGluZGV4XHJcbiAgICAgICAgbGV0IHNlbGVjdGVkQ3Vyc29ySW5kZXggPSBjdXJzb3JTdGF0ZXMuZ2V0U2VsZWN0ZWRDdXJzb3JJbmRleCgpO1xyXG4gICAgICAgIHRoaXMuX3NlbGVjdGVkQ3Vyc29ySW5kZXggPSBzZWxlY3RlZEN1cnNvckluZGV4O1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIEFjdGl2YXRlL0RlYWN0aXZhdGUgY3Vyc29yIGJ1dHRvbnMgZm9yIGN1cnJlbnQgc2VsZWN0ZWQgY3Vyc29yXHJcbiAgICAgICAgdGhpcy5hY3RpdmF0ZUN1cnNvckJ1dHRvbihzZWxlY3RlZEN1cnNvckluZGV4KTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBBY3RpdmF0ZS9EZWFjdGl2YXRlIGN1cnNvciBtb3ZlIGJ1dHRvbnNcclxuICAgICAgICB0aGlzLmFjdGl2YXRlTW92ZUJ1dHRvbnMoY3Vyc29yU3RhdGVzLCBzZWxlY3RlZEN1cnNvckluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGFjdGl2ZSBjdXJzb3IgaW5kZXhcclxuICAgICAqIFRoZSBjdXJzb3IgYnV0dG9uIGZvciB0aGUgZ2l2ZW4gaW5kZXggd2lsbCBiZSBzZXQgYWN0aXZhdGVkKG90aGVyIGRlYWN0aXZhdGVkKVxyXG4gICAgICogXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9UcmVlR3JpZFRvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhY3RpdmF0ZUN1cnNvckJ1dHRvbihpbmRleDogbnVtYmVyKXtcclxuICAgICAgICAvLyBBY3RpdmF0ZSBvciBkZWFjdGl2YXRlIHJlZiBjdXJzb3IgMSBvciAyIGJ1dHRvblxyXG4gICAgICAgIGlmKGluZGV4ID09IDApe1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2YXRlQnV0dG9uKHRoaXMuX3Rvb2xiYXJJZEN1cnNvcjEsIHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2YXRlQnV0dG9uKHRoaXMuX3Rvb2xiYXJJZEN1cnNvcjIsIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihpbmRleCA9PSAxKXtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZUJ1dHRvbih0aGlzLl90b29sYmFySWRDdXJzb3IyLCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZUJ1dHRvbih0aGlzLl90b29sYmFySWRDdXJzb3IxLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZhdGVCdXR0b24odGhpcy5fdG9vbGJhcklkQ3Vyc29yMiwgZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2YXRlQnV0dG9uKHRoaXMuX3Rvb2xiYXJJZEN1cnNvcjEsIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBtb3ZlIGJ1dHRvbnMgYWN0aXZlIG9yIGluYWN0aXZlIGZvciB0aGUgZ2l2ZW4gc2VsZWN0ZWQgY3Vyc29yIGluZGV4XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Q3Vyc29yU3RhdGVzfSBjdXJzb3JTdGF0ZXNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzZWxlY3RlZEN1cnNvckluZGV4XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1RyZWVHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFjdGl2YXRlTW92ZUJ1dHRvbnMoY3Vyc29yU3RhdGVzOiBDdXJzb3JTdGF0ZXMsIHNlbGVjdGVkQ3Vyc29ySW5kZXg6IG51bWJlcil7XHJcbiAgICAgICAgbGV0IHNlbGVjdGVkQ3Vyc29ySXNBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBpZihzZWxlY3RlZEN1cnNvckluZGV4ICE9IC0xKXtcclxuICAgICAgICAgICAgaWYoY3Vyc29yU3RhdGVzLmdldEFjdGl2ZShzZWxlY3RlZEN1cnNvckluZGV4KSA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ3Vyc29ySXNBY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHNlbGVjdGVkQ3Vyc29ySXNBY3RpdmUpe1xyXG4gICAgICAgICAgICB0aGlzLmVuYWJsZU1vdmVCdXR0b25zKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLmVuYWJsZU1vdmVCdXR0b25zKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFbmFibGVzIHRoZSBidXR0b25zIGZvciB0aGUgY3Vyc29yIG1vdmUgb3BlcmF0aW9uc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGVuYWJsZVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9UcmVlR3JpZFRvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBlbmFibGVNb3ZlQnV0dG9ucyhlbmFibGU6IGJvb2xlYW4pe1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZUJ1dHRvbih0aGlzLl90b29sYmFySWRNb3ZlTGVmdCwgIWVuYWJsZSk7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlQnV0dG9uKHRoaXMuX3Rvb2xiYXJJZE1vdmVSaWdodCwgIWVuYWJsZSk7XHJcbiAgICB9XHJcbn0iXX0=