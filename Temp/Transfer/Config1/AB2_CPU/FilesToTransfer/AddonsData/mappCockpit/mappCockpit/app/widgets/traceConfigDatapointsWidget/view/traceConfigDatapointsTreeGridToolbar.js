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
define(["require", "exports", "../../../models/diagnostics/trace/traceDataPoint", "../../common/treeGridToolbarBase", "../../../common/directoryProvider"], function (require, exports, traceDataPoint_1, treeGridToolbarBase_1, directoryProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TraceConfigDatapointsTreeGridToolbar = /** @class */ (function (_super) {
        __extends(TraceConfigDatapointsTreeGridToolbar, _super);
        /**
         * Creates an instance of TraceConfigDatapointsTreeGridToolbar.
         * @param {string} imageDirectory
         * @param {string} parentId
         * @memberof TraceConfigDatapointsTreeGridToolbar
         */
        function TraceConfigDatapointsTreeGridToolbar(parentId) {
            var _this = _super.call(this, parentId) || this;
            _this._toolbarIdAdd = "Add";
            _this._toolbarTooltipAdd = "Adds a datapoint";
            _this._toolbarIdAddEmptyLine = "AddEmptyLine";
            _this._toolbarTooltipAddEmptyLine = "Adds an empty line";
            _this._toolbarIdRemoveLine = "RemoveLine";
            _this._toolbarTooltipRemoveLine = "Removes the selected line";
            var imageDirectory = "../../../" + directoryProvider_1.DirectoryProvider.getWidgetsDirectory() + "traceConfigDatapointsWidget/style/images/toolbar/";
            _this.addToolbarButton(_this._toolbarIdAdd, _this._toolbarTooltipAdd, imageDirectory + "add.svg");
            _this.addToolbarButton(_this._toolbarIdAddEmptyLine, _this._toolbarTooltipAddEmptyLine, imageDirectory + "addEmptyLine.svg");
            _this.addToolbarButton(_this._toolbarIdRemoveLine, _this._toolbarTooltipRemoveLine, imageDirectory + "removeLine.svg");
            return _this;
        }
        /**
         * Reacts on toolbar click
         *
         * @param {*} args
         * @param {*} dataPointWidget
         * @param {*} treeGridObj
         * @memberof TraceConfigDatapointsTreeGridToolbar
         */
        TraceConfigDatapointsTreeGridToolbar.prototype.toolbarClick = function (args, dataPointWidget, treeGridObj) {
            var clickedToolbarId = this.getClickedToolbarId(args.itemName, args.model.toolbarSettings);
            if (clickedToolbarId == this._toolbarIdAdd) {
                args.cancel = true;
                dataPointWidget.openDatapointDialog();
            }
            else if (clickedToolbarId == this._toolbarIdAddEmptyLine) {
                args.cancel = true;
                dataPointWidget.dataModel.addDatapoint(args.model.selectedRowIndex, traceDataPoint_1.TraceDataPoint.createSimpleDataPoint(""));
            }
            else if (clickedToolbarId == this._toolbarIdRemoveLine) {
                args.cancel = true;
                this.deleteSelectedDataPoint(args.model, dataPointWidget.dataModel, treeGridObj);
            }
        };
        TraceConfigDatapointsTreeGridToolbar.prototype.initToolbarStates = function () {
            // Disable buttons at startup
            this.disableAddButton(true);
            this.disableAddEmptyButton(true);
            this.disableRemoveButton(true);
        };
        TraceConfigDatapointsTreeGridToolbar.prototype.disableAddButton = function (disable) {
            this.disableButton(this._toolbarIdAdd, disable);
        };
        TraceConfigDatapointsTreeGridToolbar.prototype.disableAddEmptyButton = function (disable) {
            this.disableButton(this._toolbarIdAddEmptyLine, disable);
        };
        TraceConfigDatapointsTreeGridToolbar.prototype.disableRemoveButton = function (disable) {
            this.disableButton(this._toolbarIdRemoveLine, disable);
        };
        TraceConfigDatapointsTreeGridToolbar.prototype.deleteSelectedDataPoint = function (model, dataPointsDataModel, treeGridObj) {
            var indexList = new Array();
            for (var i = model.selectedItems.length - 1; i >= 0; i--) {
                indexList.push(model.selectedItems[i].index);
            }
            if (indexList.length > 0) {
                dataPointsDataModel.removeDatapoints(indexList);
                var newSelectionIndex = indexList[indexList.length - 1];
                if (newSelectionIndex >= model.parentRecords.length) {
                    newSelectionIndex = model.parentRecords.length - 1;
                }
                treeGridObj.option("selectedRowIndex", newSelectionIndex, true);
            }
        };
        return TraceConfigDatapointsTreeGridToolbar;
    }(treeGridToolbarBase_1.TreeGridToolbarBase));
    exports.TraceConfigDatapointsTreeGridToolbar = TraceConfigDatapointsTreeGridToolbar;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VDb25maWdEYXRhcG9pbnRzVHJlZUdyaWRUb29sYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldC92aWV3L3RyYWNlQ29uZmlnRGF0YXBvaW50c1RyZWVHcmlkVG9vbGJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBSUE7UUFBMEQsd0RBQW1CO1FBV3pFOzs7OztXQUtHO1FBQ0gsOENBQVksUUFBZ0I7WUFBNUIsWUFDSSxrQkFBTSxRQUFRLENBQUMsU0FPbEI7WUF2QmdCLG1CQUFhLEdBQUUsS0FBSyxDQUFDO1lBQ3JCLHdCQUFrQixHQUFFLGtCQUFrQixDQUFDO1lBRXZDLDRCQUFzQixHQUFFLGNBQWMsQ0FBQztZQUN2QyxpQ0FBMkIsR0FBRSxvQkFBb0IsQ0FBQztZQUVsRCwwQkFBb0IsR0FBRSxZQUFZLENBQUM7WUFDbkMsK0JBQXlCLEdBQUUsMkJBQTJCLENBQUM7WUFXcEUsSUFBSSxjQUFjLEdBQUcsV0FBVyxHQUFHLHFDQUFpQixDQUFDLG1CQUFtQixFQUFFLEdBQUcsbURBQW1ELENBQUM7WUFFakksS0FBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUksQ0FBQyxhQUFhLEVBQUUsS0FBSSxDQUFDLGtCQUFrQixFQUFFLGNBQWMsR0FBRyxTQUFTLENBQUMsQ0FBQztZQUMvRixLQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSSxDQUFDLHNCQUFzQixFQUFFLEtBQUksQ0FBQywyQkFBMkIsRUFBRSxjQUFjLEdBQUcsa0JBQWtCLENBQUMsQ0FBQztZQUMxSCxLQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSSxDQUFDLG9CQUFvQixFQUFFLEtBQUksQ0FBQyx5QkFBeUIsRUFBRSxjQUFjLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQzs7UUFDeEgsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSSwyREFBWSxH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Rlksb0ZBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHJhY2VEYXRhUG9pbnQgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2RpYWdub3N0aWNzL3RyYWNlL3RyYWNlRGF0YVBvaW50XCI7XHJcbmltcG9ydCB7IFRyZWVHcmlkVG9vbGJhckJhc2UgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3RyZWVHcmlkVG9vbGJhckJhc2VcIjtcclxuaW1wb3J0IHsgRGlyZWN0b3J5UHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2RpcmVjdG9yeVByb3ZpZGVyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVHJhY2VDb25maWdEYXRhcG9pbnRzVHJlZUdyaWRUb29sYmFyIGV4dGVuZHMgVHJlZUdyaWRUb29sYmFyQmFzZXtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfdG9vbGJhcklkQWRkID1cIkFkZFwiO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfdG9vbGJhclRvb2x0aXBBZGQgPVwiQWRkcyBhIGRhdGFwb2ludFwiO1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3Rvb2xiYXJJZEFkZEVtcHR5TGluZSA9XCJBZGRFbXB0eUxpbmVcIjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3Rvb2xiYXJUb29sdGlwQWRkRW1wdHlMaW5lID1cIkFkZHMgYW4gZW1wdHkgbGluZVwiO1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3Rvb2xiYXJJZFJlbW92ZUxpbmUgPVwiUmVtb3ZlTGluZVwiO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfdG9vbGJhclRvb2x0aXBSZW1vdmVMaW5lID1cIlJlbW92ZXMgdGhlIHNlbGVjdGVkIGxpbmVcIjtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFRyYWNlQ29uZmlnRGF0YXBvaW50c1RyZWVHcmlkVG9vbGJhci5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbWFnZURpcmVjdG9yeVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhcmVudElkXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWdEYXRhcG9pbnRzVHJlZUdyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHBhcmVudElkOiBzdHJpbmcpe1xyXG4gICAgICAgIHN1cGVyKHBhcmVudElkKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgaW1hZ2VEaXJlY3RvcnkgPSBcIi4uLy4uLy4uL1wiICsgRGlyZWN0b3J5UHJvdmlkZXIuZ2V0V2lkZ2V0c0RpcmVjdG9yeSgpICsgXCJ0cmFjZUNvbmZpZ0RhdGFwb2ludHNXaWRnZXQvc3R5bGUvaW1hZ2VzL3Rvb2xiYXIvXCI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5hZGRUb29sYmFyQnV0dG9uKHRoaXMuX3Rvb2xiYXJJZEFkZCwgdGhpcy5fdG9vbGJhclRvb2x0aXBBZGQsIGltYWdlRGlyZWN0b3J5ICsgXCJhZGQuc3ZnXCIpO1xyXG4gICAgICAgIHRoaXMuYWRkVG9vbGJhckJ1dHRvbih0aGlzLl90b29sYmFySWRBZGRFbXB0eUxpbmUsIHRoaXMuX3Rvb2xiYXJUb29sdGlwQWRkRW1wdHlMaW5lLCBpbWFnZURpcmVjdG9yeSArIFwiYWRkRW1wdHlMaW5lLnN2Z1wiKTtcclxuICAgICAgICB0aGlzLmFkZFRvb2xiYXJCdXR0b24odGhpcy5fdG9vbGJhcklkUmVtb3ZlTGluZSwgdGhpcy5fdG9vbGJhclRvb2x0aXBSZW1vdmVMaW5lLCBpbWFnZURpcmVjdG9yeSArIFwicmVtb3ZlTGluZS5zdmdcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFjdHMgb24gdG9vbGJhciBjbGlja1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQHBhcmFtIHsqfSBkYXRhUG9pbnRXaWRnZXRcclxuICAgICAqIEBwYXJhbSB7Kn0gdHJlZUdyaWRPYmpcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ0RhdGFwb2ludHNUcmVlR3JpZFRvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHRvb2xiYXJDbGljayAoYXJncywgZGF0YVBvaW50V2lkZ2V0LCB0cmVlR3JpZE9iail7XHJcbiAgICAgICAgdmFyIGNsaWNrZWRUb29sYmFySWQgPSB0aGlzLmdldENsaWNrZWRUb29sYmFySWQoYXJncy5pdGVtTmFtZSwgYXJncy5tb2RlbC50b29sYmFyU2V0dGluZ3MpO1xyXG4gICAgICAgIGlmIChjbGlja2VkVG9vbGJhcklkID09IHRoaXMuX3Rvb2xiYXJJZEFkZCkge1xyXG4gICAgICAgICAgICBhcmdzLmNhbmNlbCA9IHRydWU7XHJcbiAgICAgICAgICAgIGRhdGFQb2ludFdpZGdldC5vcGVuRGF0YXBvaW50RGlhbG9nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGNsaWNrZWRUb29sYmFySWQgPT0gdGhpcy5fdG9vbGJhcklkQWRkRW1wdHlMaW5lKSB7XHJcbiAgICAgICAgICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuICAgICAgICAgICAgZGF0YVBvaW50V2lkZ2V0LmRhdGFNb2RlbC5hZGREYXRhcG9pbnQoYXJncy5tb2RlbC5zZWxlY3RlZFJvd0luZGV4LCBUcmFjZURhdGFQb2ludC5jcmVhdGVTaW1wbGVEYXRhUG9pbnQoXCJcIikpO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgZWxzZSBpZiAoY2xpY2tlZFRvb2xiYXJJZCA9PSB0aGlzLl90b29sYmFySWRSZW1vdmVMaW5lKSB7XHJcbiAgICAgICAgICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5kZWxldGVTZWxlY3RlZERhdGFQb2ludChhcmdzLm1vZGVsLCBkYXRhUG9pbnRXaWRnZXQuZGF0YU1vZGVsLCB0cmVlR3JpZE9iaik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgaW5pdFRvb2xiYXJTdGF0ZXMoKXtcclxuICAgICAgICAvLyBEaXNhYmxlIGJ1dHRvbnMgYXQgc3RhcnR1cFxyXG4gICAgICAgIHRoaXMuZGlzYWJsZUFkZEJ1dHRvbih0cnVlKTtcclxuICAgICAgICB0aGlzLmRpc2FibGVBZGRFbXB0eUJ1dHRvbih0cnVlKTtcclxuICAgICAgICB0aGlzLmRpc2FibGVSZW1vdmVCdXR0b24odHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpc2FibGVBZGRCdXR0b24oZGlzYWJsZTogYm9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlQnV0dG9uKHRoaXMuX3Rvb2xiYXJJZEFkZCwgZGlzYWJsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpc2FibGVBZGRFbXB0eUJ1dHRvbihkaXNhYmxlOiBib29sZWFuKXtcclxuICAgICAgICB0aGlzLmRpc2FibGVCdXR0b24odGhpcy5fdG9vbGJhcklkQWRkRW1wdHlMaW5lLCBkaXNhYmxlKTtcclxuICAgIH1cclxuICAgXHJcbiAgICBwdWJsaWMgZGlzYWJsZVJlbW92ZUJ1dHRvbihkaXNhYmxlOiBib29sZWFuKXtcclxuICAgICAgICB0aGlzLmRpc2FibGVCdXR0b24odGhpcy5fdG9vbGJhcklkUmVtb3ZlTGluZSwgZGlzYWJsZSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByaXZhdGUgZGVsZXRlU2VsZWN0ZWREYXRhUG9pbnQobW9kZWwsIGRhdGFQb2ludHNEYXRhTW9kZWwsIHRyZWVHcmlkT2JqKXtcclxuICAgICAgICBsZXQgaW5kZXhMaXN0ID0gbmV3IEFycmF5PG51bWJlcj4oKTtcclxuICAgICAgICBmb3IobGV0IGkgPSBtb2RlbC5zZWxlY3RlZEl0ZW1zLmxlbmd0aC0xOyBpID49IDA7IGktLSl7XHJcbiAgICAgICAgICAgIGluZGV4TGlzdC5wdXNoKG1vZGVsLnNlbGVjdGVkSXRlbXNbaV0uaW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihpbmRleExpc3QubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIGRhdGFQb2ludHNEYXRhTW9kZWwucmVtb3ZlRGF0YXBvaW50cyhpbmRleExpc3QpO1xyXG4gICAgICAgICAgICBsZXQgbmV3U2VsZWN0aW9uSW5kZXggPSBpbmRleExpc3RbaW5kZXhMaXN0Lmxlbmd0aC0xXTtcclxuICAgICAgICAgICAgaWYobmV3U2VsZWN0aW9uSW5kZXggPj0gbW9kZWwucGFyZW50UmVjb3Jkcy5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgbmV3U2VsZWN0aW9uSW5kZXggPSBtb2RlbC5wYXJlbnRSZWNvcmRzLmxlbmd0aC0xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRyZWVHcmlkT2JqLm9wdGlvbihcInNlbGVjdGVkUm93SW5kZXhcIiwgbmV3U2VsZWN0aW9uSW5kZXgsIHRydWUpOyBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=