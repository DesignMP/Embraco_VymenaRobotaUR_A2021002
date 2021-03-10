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
define(["require", "exports", "../common/treeGridToolbarBase", "../../common/directoryProvider"], function (require, exports, treeGridToolbarBase_1, directoryProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WatchablesGridToolbar = /** @class */ (function (_super) {
        __extends(WatchablesGridToolbar, _super);
        /**
         * Creates an instance of WatchablesGridToolbar.
         * @param {string} imageDirectory
         * @param {string} parentId
         * @memberof WatchablesGridToolbar
         */
        function WatchablesGridToolbar(parentId) {
            var _this = _super.call(this, parentId) || this;
            _this.toolbarIdEmpty = "Empty";
            _this.toolbarToolTipEmpty = " ";
            var imageDirectory = "../../../" + directoryProvider_1.DirectoryProvider.getWidgetsDirectory() + "watchablesWidget/style/images/toolbar/";
            // dummy toolbar button needed to show a toolbar
            _this.addToolbarButton(_this.toolbarIdEmpty, _this.toolbarToolTipEmpty, imageDirectory + "empty.svg");
            return _this;
        }
        WatchablesGridToolbar.prototype.disableDummyButton = function () {
            this.disableButton(this.toolbarIdEmpty, true);
        };
        return WatchablesGridToolbar;
    }(treeGridToolbarBase_1.TreeGridToolbarBase));
    exports.WatchablesGridToolbar = WatchablesGridToolbar;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2F0Y2hhYmxlc0dyaWRUb29sYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3dhdGNoYWJsZXNXaWRnZXQvd2F0Y2hhYmxlc0dyaWRUb29sYmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFHQTtRQUEyQyx5Q0FBbUI7UUFLMUQ7Ozs7O1dBS0c7UUFDSCwrQkFBWSxRQUFnQjtZQUE1QixZQUNJLGtCQUFNLFFBQVEsQ0FBQyxTQU1sQjtZQWhCZ0Isb0JBQWMsR0FBRSxPQUFPLENBQUM7WUFDeEIseUJBQW1CLEdBQUUsR0FBRyxDQUFDO1lBV3RDLElBQUksY0FBYyxHQUFHLFdBQVcsR0FBRyxxQ0FBaUIsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLHdDQUF3QyxDQUFDO1lBRXRILGdEQUFnRDtZQUNoRCxLQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSSxDQUFDLGNBQWMsRUFBRSxLQUFJLENBQUMsbUJBQW1CLEVBQUUsY0FBYyxHQUFHLFdBQVcsQ0FBQyxDQUFDOztRQUN2RyxDQUFDO1FBRUQsa0RBQWtCLEdBQWxCO1lBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xELENBQUM7UUFDTCw0QkFBQztJQUFELENBQUMsQUF2QkQsQ0FBMkMseUNBQW1CLEdBdUI3RDtJQXZCWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUcmVlR3JpZFRvb2xiYXJCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi90cmVlR3JpZFRvb2xiYXJCYXNlXCI7XHJcbmltcG9ydCB7IERpcmVjdG9yeVByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9kaXJlY3RvcnlQcm92aWRlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFdhdGNoYWJsZXNHcmlkVG9vbGJhciBleHRlbmRzIFRyZWVHcmlkVG9vbGJhckJhc2V7XHJcbiAgICAgICAgXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHRvb2xiYXJJZEVtcHR5ID1cIkVtcHR5XCI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHRvb2xiYXJUb29sVGlwRW1wdHkgPVwiIFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBXYXRjaGFibGVzR3JpZFRvb2xiYXIuXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW1hZ2VEaXJlY3RvcnlcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXJlbnRJZFxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRJZDogc3RyaW5nKXtcclxuICAgICAgICBzdXBlcihwYXJlbnRJZCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGltYWdlRGlyZWN0b3J5ID0gXCIuLi8uLi8uLi9cIiArIERpcmVjdG9yeVByb3ZpZGVyLmdldFdpZGdldHNEaXJlY3RvcnkoKSArIFwid2F0Y2hhYmxlc1dpZGdldC9zdHlsZS9pbWFnZXMvdG9vbGJhci9cIjtcclxuXHJcbiAgICAgICAgLy8gZHVtbXkgdG9vbGJhciBidXR0b24gbmVlZGVkIHRvIHNob3cgYSB0b29sYmFyXHJcbiAgICAgICAgdGhpcy5hZGRUb29sYmFyQnV0dG9uKHRoaXMudG9vbGJhcklkRW1wdHksIHRoaXMudG9vbGJhclRvb2xUaXBFbXB0eSwgaW1hZ2VEaXJlY3RvcnkgKyBcImVtcHR5LnN2Z1wiKTtcclxuICAgIH1cclxuXHJcbiAgICBkaXNhYmxlRHVtbXlCdXR0b24oKXtcclxuICAgICAgICB0aGlzLmRpc2FibGVCdXR0b24odGhpcy50b29sYmFySWRFbXB0eSwgdHJ1ZSk7XHJcbiAgICB9XHJcbn0iXX0=