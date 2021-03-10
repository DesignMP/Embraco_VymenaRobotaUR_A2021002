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
    var TraceConfigTriggerTreeGridToolbar = /** @class */ (function (_super) {
        __extends(TraceConfigTriggerTreeGridToolbar, _super);
        /**
         * Creates an instance of TraceConfigTriggerTreeGridToolbar.
         * @param {string} imageDirectory
         * @param {string} parentId
         * @memberof TraceConfigTriggerTreeGridToolbar
         */
        function TraceConfigTriggerTreeGridToolbar(parentId) {
            var _this = _super.call(this, parentId) || this;
            _this._toolbarIdAdd = "Add";
            _this._toolbarTooltipAdd = "Adds a new start trigger";
            _this.toolbarIdSelect = "Select";
            _this.toolbarToolTipSelect = "Select a trigger datapoint";
            _this.toolbarIdDelete = "Delete";
            _this.toolbarToolTipDelete = "Delete start trigger";
            var imageDirectory = "../../../" + directoryProvider_1.DirectoryProvider.getWidgetsDirectory() + "traceConfigTriggerWidget/style/images/toolbar/";
            _this.addToolbarButton(_this._toolbarIdAdd, _this._toolbarTooltipAdd, imageDirectory + "add.svg");
            _this.addToolbarButton(_this.toolbarIdSelect, _this.toolbarToolTipSelect, imageDirectory + "select.svg");
            _this.addToolbarButton(_this.toolbarIdDelete, _this.toolbarToolTipDelete, imageDirectory + "delete.svg");
            return _this;
        }
        /**
         * Reacts on toolbar click
         *
         * @param {*} args
         * @param {*} triggerWidget
         * @memberof TraceConfigTriggerTreeGridToolbar
         */
        TraceConfigTriggerTreeGridToolbar.prototype.toolbarClick = function (args, triggerWidget) {
            var clickedToolbarId = this.getClickedToolbarId(args.itemName, args.model.toolbarSettings);
            if (clickedToolbarId == this._toolbarIdAdd) {
                args.cancel = true;
                triggerWidget.addStartTrigger();
            }
            else if (clickedToolbarId == this.toolbarIdSelect) {
                args.cancel = true;
                triggerWidget.openDatapointDialog();
            }
            else if (clickedToolbarId == this.toolbarIdDelete) {
                args.cancel = true;
                triggerWidget.deleteStartTriggers(args.model.selectedItems);
            }
        };
        TraceConfigTriggerTreeGridToolbar.prototype.disableAddButton = function (disable) {
            this.disableButton(this._toolbarIdAdd, disable);
        };
        TraceConfigTriggerTreeGridToolbar.prototype.disableRemoveButton = function (disable) {
            this.disableButton(this.toolbarIdDelete, disable);
        };
        TraceConfigTriggerTreeGridToolbar.prototype.disableSelectTriggerDataPointButton = function (disable) {
            this.disableButton(this.toolbarIdSelect, disable);
        };
        return TraceConfigTriggerTreeGridToolbar;
    }(treeGridToolbarBase_1.TreeGridToolbarBase));
    exports.TraceConfigTriggerTreeGridToolbar = TraceConfigTriggerTreeGridToolbar;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VDb25maWdUcmlnZ2VyVHJlZUdyaWRUb29sYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RyYWNlQ29uZmlnVHJpZ2dlcldpZGdldC92aWV3L3RyYWNlQ29uZmlnVHJpZ2dlclRyZWVHcmlkVG9vbGJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBR0E7UUFBdUQscURBQW1CO1FBWXRFOzs7OztXQUtHO1FBQ0gsMkNBQVksUUFBZ0I7WUFBNUIsWUFDSSxrQkFBTSxRQUFRLENBQUMsU0FPbEI7WUF4QmdCLG1CQUFhLEdBQUUsS0FBSyxDQUFDO1lBQ3JCLHdCQUFrQixHQUFFLDBCQUEwQixDQUFDO1lBRS9DLHFCQUFlLEdBQUUsUUFBUSxDQUFDO1lBQzFCLDBCQUFvQixHQUFFLDRCQUE0QixDQUFDO1lBRW5ELHFCQUFlLEdBQUUsUUFBUSxDQUFDO1lBQzFCLDBCQUFvQixHQUFFLHNCQUFzQixDQUFDO1lBWTFELElBQUksY0FBYyxHQUFHLFdBQVcsR0FBRyxxQ0FBaUIsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLGdEQUFnRCxDQUFDO1lBRTlILEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFJLENBQUMsYUFBYSxFQUFFLEtBQUksQ0FBQyxrQkFBa0IsRUFBRSxjQUFjLEdBQUcsU0FBUyxDQUFDLENBQUM7WUFDL0YsS0FBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUksQ0FBQyxlQUFlLEVBQUUsS0FBSSxDQUFDLG9CQUFvQixFQUFFLGNBQWMsR0FBRyxZQUFZLENBQUMsQ0FBQztZQUN0RyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSSxDQUFDLGVBQWUsRUFBRSxLQUFJLENBQUMsb0JBQW9CLEVBQUUsY0FBYyxHQUFHLFlBQVksQ0FBQyxDQUFDOztRQUMxRyxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ksd0RBQVksR0FBbkIsVUFBcUIsSUFBSSxFQUFFLGFBQWE7WUFFcEMsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQzNGLElBQUksZ0JBQWdCLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtnQkFDeEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBQ25CLGFBQWEsQ0FBQyxlQUFlLEVBQUUsQ0FBQzthQUNuQztpQkFDSSxJQUFJLGdCQUFnQixJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7Z0JBQy9DLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUNuQixhQUFhLENBQUMsbUJBQW1CLEVBQUUsQ0FBQzthQUN2QztpQkFDSSxJQUFJLGdCQUFnQixJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7Z0JBQy9DLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUNuQixhQUFhLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUMvRDtRQUNMLENBQUM7UUFFTSw0REFBZ0IsR0FBdkIsVUFBd0IsT0FBZ0I7WUFDcEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3BELENBQUM7UUFFTSwrREFBbUIsR0FBMUIsVUFBMkIsT0FBZ0I7WUFDdkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3RELENBQUM7UUFFTSwrRUFBbUMsR0FBMUMsVUFBMkMsT0FBZ0I7WUFDdkQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3RELENBQUM7UUFDTCx3Q0FBQztJQUFELENBQUMsQUEvREQsQ0FBdUQseUNBQW1CLEdBK0R6RTtJQS9EWSw4RUFBaUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUcmVlR3JpZFRvb2xiYXJCYXNlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi90cmVlR3JpZFRvb2xiYXJCYXNlXCI7XHJcbmltcG9ydCB7IERpcmVjdG9yeVByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9kaXJlY3RvcnlQcm92aWRlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRyYWNlQ29uZmlnVHJpZ2dlclRyZWVHcmlkVG9vbGJhciBleHRlbmRzIFRyZWVHcmlkVG9vbGJhckJhc2V7XHJcbiAgICBcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3Rvb2xiYXJJZEFkZCA9XCJBZGRcIjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3Rvb2xiYXJUb29sdGlwQWRkID1cIkFkZHMgYSBuZXcgc3RhcnQgdHJpZ2dlclwiO1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgdG9vbGJhcklkU2VsZWN0ID1cIlNlbGVjdFwiO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSB0b29sYmFyVG9vbFRpcFNlbGVjdCA9XCJTZWxlY3QgYSB0cmlnZ2VyIGRhdGFwb2ludFwiO1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgdG9vbGJhcklkRGVsZXRlID1cIkRlbGV0ZVwiO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSB0b29sYmFyVG9vbFRpcERlbGV0ZSA9XCJEZWxldGUgc3RhcnQgdHJpZ2dlclwiO1xyXG4gICAgICAgIFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBUcmFjZUNvbmZpZ1RyaWdnZXJUcmVlR3JpZFRvb2xiYXIuXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW1hZ2VEaXJlY3RvcnlcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXJlbnRJZFxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVHJpZ2dlclRyZWVHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRJZDogc3RyaW5nKXtcclxuICAgICAgICBzdXBlcihwYXJlbnRJZCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGltYWdlRGlyZWN0b3J5ID0gXCIuLi8uLi8uLi9cIiArIERpcmVjdG9yeVByb3ZpZGVyLmdldFdpZGdldHNEaXJlY3RvcnkoKSArIFwidHJhY2VDb25maWdUcmlnZ2VyV2lkZ2V0L3N0eWxlL2ltYWdlcy90b29sYmFyL1wiO1xyXG5cclxuICAgICAgICB0aGlzLmFkZFRvb2xiYXJCdXR0b24odGhpcy5fdG9vbGJhcklkQWRkLCB0aGlzLl90b29sYmFyVG9vbHRpcEFkZCwgaW1hZ2VEaXJlY3RvcnkgKyBcImFkZC5zdmdcIik7XHJcbiAgICAgICAgdGhpcy5hZGRUb29sYmFyQnV0dG9uKHRoaXMudG9vbGJhcklkU2VsZWN0LCB0aGlzLnRvb2xiYXJUb29sVGlwU2VsZWN0LCBpbWFnZURpcmVjdG9yeSArIFwic2VsZWN0LnN2Z1wiKTtcclxuICAgICAgICB0aGlzLmFkZFRvb2xiYXJCdXR0b24odGhpcy50b29sYmFySWREZWxldGUsIHRoaXMudG9vbGJhclRvb2xUaXBEZWxldGUsIGltYWdlRGlyZWN0b3J5ICsgXCJkZWxldGUuc3ZnXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhY3RzIG9uIHRvb2xiYXIgY2xpY2tcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBwYXJhbSB7Kn0gdHJpZ2dlcldpZGdldFxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlnVHJpZ2dlclRyZWVHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdG9vbGJhckNsaWNrIChhcmdzLCB0cmlnZ2VyV2lkZ2V0KXtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgY2xpY2tlZFRvb2xiYXJJZCA9IHRoaXMuZ2V0Q2xpY2tlZFRvb2xiYXJJZChhcmdzLml0ZW1OYW1lLCBhcmdzLm1vZGVsLnRvb2xiYXJTZXR0aW5ncyk7XHJcbiAgICAgICAgaWYgKGNsaWNrZWRUb29sYmFySWQgPT0gdGhpcy5fdG9vbGJhcklkQWRkKSB7XHJcbiAgICAgICAgICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuICAgICAgICAgICAgdHJpZ2dlcldpZGdldC5hZGRTdGFydFRyaWdnZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY2xpY2tlZFRvb2xiYXJJZCA9PSB0aGlzLnRvb2xiYXJJZFNlbGVjdCkge1xyXG4gICAgICAgICAgICBhcmdzLmNhbmNlbCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRyaWdnZXJXaWRnZXQub3BlbkRhdGFwb2ludERpYWxvZygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjbGlja2VkVG9vbGJhcklkID09IHRoaXMudG9vbGJhcklkRGVsZXRlKSB7XHJcbiAgICAgICAgICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuICAgICAgICAgICAgdHJpZ2dlcldpZGdldC5kZWxldGVTdGFydFRyaWdnZXJzKGFyZ3MubW9kZWwuc2VsZWN0ZWRJdGVtcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNhYmxlQWRkQnV0dG9uKGRpc2FibGU6IGJvb2xlYW4pe1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZUJ1dHRvbih0aGlzLl90b29sYmFySWRBZGQsIGRpc2FibGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNhYmxlUmVtb3ZlQnV0dG9uKGRpc2FibGU6IGJvb2xlYW4pe1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZUJ1dHRvbih0aGlzLnRvb2xiYXJJZERlbGV0ZSwgZGlzYWJsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpc2FibGVTZWxlY3RUcmlnZ2VyRGF0YVBvaW50QnV0dG9uKGRpc2FibGU6IGJvb2xlYW4pe1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZUJ1dHRvbih0aGlzLnRvb2xiYXJJZFNlbGVjdCwgZGlzYWJsZSk7XHJcbiAgICB9XHJcbn0iXX0=