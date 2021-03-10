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
define(["require", "exports", "../../common/treeGridToolbarBase", "../../../common/directoryProvider"], function (require, exports, treeGridToolbarBase_1, directoryProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TraceConfigTimingTreeGridToolbar = /** @class */ (function (_super) {
        __extends(TraceConfigTimingTreeGridToolbar, _super);
        /**
         * Creates an instance of TraceConfigTimingTreeGridToolbar.
         * @param {string} imageDirectory
         * @param {string} parentId
         * @memberof TraceConfigTimingTreeGridToolbar
         */
        function TraceConfigTimingTreeGridToolbar(parentId) {
            var _this = _super.call(this, parentId) || this;
            _this.toolbarIdEmpty = "Empty";
            _this.toolbarToolTipEmpty = " ";
            var imageDirectory = "../../../" + directoryProvider_1.DirectoryProvider.getWidgetsDirectory() + "traceConfigTimingWidget/style/images/toolbar/";
            // dummy toolbar button needed to show a toolbar
            _this.addToolbarButton(_this.toolbarIdEmpty, _this.toolbarToolTipEmpty, imageDirectory + "empty.svg");
            return _this;
        }
        TraceConfigTimingTreeGridToolbar.prototype.disableDummyButton = function () {
            this.disableButton(this.toolbarIdEmpty, true);
        };
        return TraceConfigTimingTreeGridToolbar;
    }(treeGridToolbarBase_1.TreeGridToolbarBase));
    exports.TraceConfigTimingTreeGridToolbar = TraceConfigTimingTreeGridToolbar;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VDb25maWdUaW1pbmdUcmVlR3JpZFRvb2xiYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvdHJhY2VDb25maWdUaW1pbmdXaWRnZXQvdmlldy90cmFjZUNvbmZpZ1RpbWluZ1RyZWVHcmlkVG9vbGJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBR0E7UUFBc0Qsb0RBQW1CO1FBS3JFOzs7OztXQUtHO1FBQ0gsMENBQVksUUFBZ0I7WUFBNUIsWUFDSSxrQkFBTSxRQUFRLENBQUMsU0FNbEI7WUFoQmdCLG9CQUFjLEdBQUUsT0FBTyxDQUFDO1lBQ3hCLHlCQUFtQixHQUFFLEdBQUcsQ0FBQztZQVd0QyxJQUFJLGNBQWMsR0FBRyxXQUFXLEdBQUcscUNBQWlCLENBQUMsbUJBQW1CLEVBQUUsR0FBRywrQ0FBK0MsQ0FBQztZQUU3SCxnREFBZ0Q7WUFDaEQsS0FBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUksQ0FBQyxjQUFjLEVBQUUsS0FBSSxDQUFDLG1CQUFtQixFQUFFLGNBQWMsR0FBRyxXQUFXLENBQUMsQ0FBQzs7UUFDdkcsQ0FBQztRQUVELDZEQUFrQixHQUFsQjtZQUNJLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsRCxDQUFDO1FBQ0wsdUNBQUM7SUFBRCxDQUFDLEFBdkJELENBQXNELHlDQUFtQixHQXVCeEU7SUF2QlksNEVBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHJlZUdyaWRUb29sYmFyQmFzZSB9IGZyb20gXCIuLi8uLi9jb21tb24vdHJlZUdyaWRUb29sYmFyQmFzZVwiO1xyXG5pbXBvcnQgeyBEaXJlY3RvcnlQcm92aWRlciB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vZGlyZWN0b3J5UHJvdmlkZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBUcmFjZUNvbmZpZ1RpbWluZ1RyZWVHcmlkVG9vbGJhciBleHRlbmRzIFRyZWVHcmlkVG9vbGJhckJhc2V7XHJcbiAgICBcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgdG9vbGJhcklkRW1wdHkgPVwiRW1wdHlcIjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgdG9vbGJhclRvb2xUaXBFbXB0eSA9XCIgXCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFRyYWNlQ29uZmlnVGltaW5nVHJlZUdyaWRUb29sYmFyLlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGltYWdlRGlyZWN0b3J5XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGFyZW50SWRcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ1RpbWluZ1RyZWVHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRJZDogc3RyaW5nKXtcclxuICAgICAgICBzdXBlcihwYXJlbnRJZCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGltYWdlRGlyZWN0b3J5ID0gXCIuLi8uLi8uLi9cIiArIERpcmVjdG9yeVByb3ZpZGVyLmdldFdpZGdldHNEaXJlY3RvcnkoKSArIFwidHJhY2VDb25maWdUaW1pbmdXaWRnZXQvc3R5bGUvaW1hZ2VzL3Rvb2xiYXIvXCI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZHVtbXkgdG9vbGJhciBidXR0b24gbmVlZGVkIHRvIHNob3cgYSB0b29sYmFyXHJcbiAgICAgICAgdGhpcy5hZGRUb29sYmFyQnV0dG9uKHRoaXMudG9vbGJhcklkRW1wdHksIHRoaXMudG9vbGJhclRvb2xUaXBFbXB0eSwgaW1hZ2VEaXJlY3RvcnkgKyBcImVtcHR5LnN2Z1wiKTtcclxuICAgIH1cclxuXHJcbiAgICBkaXNhYmxlRHVtbXlCdXR0b24oKXtcclxuICAgICAgICB0aGlzLmRpc2FibGVCdXR0b24odGhpcy50b29sYmFySWRFbXB0eSwgdHJ1ZSk7XHJcbiAgICB9XHJcbn0iXX0=