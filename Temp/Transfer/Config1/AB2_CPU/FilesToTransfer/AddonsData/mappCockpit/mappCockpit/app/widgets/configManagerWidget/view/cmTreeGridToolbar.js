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
define(["require", "exports", "../../../models/online/mappCockpitComponent", "../../common/treeGridToolbarBase", "../../../common/directoryProvider"], function (require, exports, mappCockpitComponent_1, treeGridToolbarBase_1, directoryProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CmTreeGridToolbar = /** @class */ (function (_super) {
        __extends(CmTreeGridToolbar, _super);
        /**
         * Creates an instance of CmTreeGridToolbar.
         * @param {string} imageDirectory
         * @param {string} parentId
         * @memberof CmTreeGridToolbar
         */
        function CmTreeGridToolbar(parentId) {
            var _this = _super.call(this, parentId) || this;
            _this._toolbarIdSaveParameters = "Save";
            _this._toolbarToolTipSaveParameters = "Save parameters";
            var imageDirectory = "../../../" + directoryProvider_1.DirectoryProvider.getWidgetsDirectory() + "configManagerWidget/style/images/toolbar/";
            _this.addToolbarButton(_this._toolbarIdSaveParameters, _this._toolbarToolTipSaveParameters, imageDirectory + "save.svg");
            _this.addCollapseButton();
            _this.addExpandButton();
            return _this;
        }
        /**
         * Reacts on toolbar click
         *
         * @param {*} args
         * @param {MappCockpitComponentMethod} saveParametersMethod
         * @memberof CmTreeGridToolbar
         */
        CmTreeGridToolbar.prototype.toolbarClick = function (args, saveParametersMethod) {
            _super.prototype.toolbarClickBase.call(this, args);
            var clickedToolbarId = this.getClickedToolbarId(args.itemName, args.model.toolbarSettings);
            if (clickedToolbarId == this._toolbarIdSaveParameters) {
                args.cancel = true;
                if (saveParametersMethod != undefined) {
                    if (saveParametersMethod.isExecutable != undefined) {
                        if (saveParametersMethod.isExecutable.value == true) {
                            mappCockpitComponent_1.MappCockpitComponentMethod.execute(saveParametersMethod);
                        }
                    }
                }
            }
        };
        CmTreeGridToolbar.prototype.disableSaveButton = function (disable) {
            this.disableButton(this._toolbarIdSaveParameters, disable);
        };
        return CmTreeGridToolbar;
    }(treeGridToolbarBase_1.TreeGridToolbarBase));
    exports.CmTreeGridToolbar = CmTreeGridToolbar;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY21UcmVlR3JpZFRvb2xiYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY29uZmlnTWFuYWdlcldpZGdldC92aWV3L2NtVHJlZUdyaWRUb29sYmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFJQTtRQUF1QyxxQ0FBbUI7UUFLdEQ7Ozs7O1dBS0c7UUFDSCwyQkFBWSxRQUFnQjtZQUE1QixZQUNJLGtCQUFNLFFBQVEsQ0FBQyxTQVFsQjtZQWxCZ0IsOEJBQXdCLEdBQUUsTUFBTSxDQUFDO1lBQ2pDLG1DQUE2QixHQUFFLGlCQUFpQixDQUFDO1lBVzlELElBQUksY0FBYyxHQUFHLFdBQVcsR0FBRyxxQ0FBaUIsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLDJDQUEyQyxDQUFDO1lBRXpILEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFJLENBQUMsd0JBQXdCLEVBQUUsS0FBSSxDQUFDLDZCQUE2QixFQUFFLGNBQWMsR0FBRyxVQUFVLENBQUMsQ0FBQztZQUV0SCxLQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUN6QixLQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7O1FBQzNCLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSSx3Q0FBWSxHQUFuQixVQUFvQixJQUFJLEVBQUUsb0JBQWdEO1lBQ3RFLGlCQUFNLGdCQUFnQixZQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdCLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUMzRixJQUFJLGdCQUFnQixJQUFJLElBQUksQ0FBQyx3QkFBd0IsRUFBRTtnQkFDbkQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBQ25CLElBQUcsb0JBQW9CLElBQUksU0FBUyxFQUFDO29CQUNqQyxJQUFHLG9CQUFvQixDQUFDLFlBQVksSUFBSSxTQUFTLEVBQUM7d0JBQzlDLElBQUcsb0JBQW9CLENBQUMsWUFBWSxDQUFDLEtBQUssSUFBSSxJQUFJLEVBQUM7NEJBQy9DLGlEQUEwQixDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO3lCQUM1RDtxQkFDSjtpQkFDSjthQUNKO1FBQ0wsQ0FBQztRQUVNLDZDQUFpQixHQUF4QixVQUF5QixPQUFnQjtZQUNyQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMvRCxDQUFDO1FBQ0wsd0JBQUM7SUFBRCxDQUFDLEFBL0NELENBQXVDLHlDQUFtQixHQStDekQ7SUEvQ1ksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBUcmVlR3JpZFRvb2xiYXJCYXNlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi90cmVlR3JpZFRvb2xiYXJCYXNlXCI7XHJcbmltcG9ydCB7IERpcmVjdG9yeVByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9kaXJlY3RvcnlQcm92aWRlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENtVHJlZUdyaWRUb29sYmFyIGV4dGVuZHMgVHJlZUdyaWRUb29sYmFyQmFzZXtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfdG9vbGJhcklkU2F2ZVBhcmFtZXRlcnMgPVwiU2F2ZVwiO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfdG9vbGJhclRvb2xUaXBTYXZlUGFyYW1ldGVycyA9XCJTYXZlIHBhcmFtZXRlcnNcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQ21UcmVlR3JpZFRvb2xiYXIuXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW1hZ2VEaXJlY3RvcnlcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXJlbnRJZFxyXG4gICAgICogQG1lbWJlcm9mIENtVHJlZUdyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHBhcmVudElkOiBzdHJpbmcpe1xyXG4gICAgICAgIHN1cGVyKHBhcmVudElkKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgaW1hZ2VEaXJlY3RvcnkgPSBcIi4uLy4uLy4uL1wiICsgRGlyZWN0b3J5UHJvdmlkZXIuZ2V0V2lkZ2V0c0RpcmVjdG9yeSgpICsgXCJjb25maWdNYW5hZ2VyV2lkZ2V0L3N0eWxlL2ltYWdlcy90b29sYmFyL1wiO1xyXG5cclxuICAgICAgICB0aGlzLmFkZFRvb2xiYXJCdXR0b24odGhpcy5fdG9vbGJhcklkU2F2ZVBhcmFtZXRlcnMsIHRoaXMuX3Rvb2xiYXJUb29sVGlwU2F2ZVBhcmFtZXRlcnMsIGltYWdlRGlyZWN0b3J5ICsgXCJzYXZlLnN2Z1wiKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRDb2xsYXBzZUJ1dHRvbigpO1xyXG4gICAgICAgIHRoaXMuYWRkRXhwYW5kQnV0dG9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFjdHMgb24gdG9vbGJhciBjbGlja1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZH0gc2F2ZVBhcmFtZXRlcnNNZXRob2RcclxuICAgICAqIEBtZW1iZXJvZiBDbVRyZWVHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdG9vbGJhckNsaWNrKGFyZ3MsIHNhdmVQYXJhbWV0ZXJzTWV0aG9kOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCl7XHJcbiAgICAgICAgc3VwZXIudG9vbGJhckNsaWNrQmFzZShhcmdzKTtcclxuICAgICAgICB2YXIgY2xpY2tlZFRvb2xiYXJJZCA9IHRoaXMuZ2V0Q2xpY2tlZFRvb2xiYXJJZChhcmdzLml0ZW1OYW1lLCBhcmdzLm1vZGVsLnRvb2xiYXJTZXR0aW5ncyk7XHJcbiAgICAgICAgaWYgKGNsaWNrZWRUb29sYmFySWQgPT0gdGhpcy5fdG9vbGJhcklkU2F2ZVBhcmFtZXRlcnMpIHtcclxuICAgICAgICAgICAgYXJncy5jYW5jZWwgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZihzYXZlUGFyYW1ldGVyc01ldGhvZCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgaWYoc2F2ZVBhcmFtZXRlcnNNZXRob2QuaXNFeGVjdXRhYmxlICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc2F2ZVBhcmFtZXRlcnNNZXRob2QuaXNFeGVjdXRhYmxlLnZhbHVlID09IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZC5leGVjdXRlKHNhdmVQYXJhbWV0ZXJzTWV0aG9kKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpc2FibGVTYXZlQnV0dG9uKGRpc2FibGU6IGJvb2xlYW4pe1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZUJ1dHRvbih0aGlzLl90b29sYmFySWRTYXZlUGFyYW1ldGVycywgZGlzYWJsZSk7XHJcbiAgICB9XHJcbn0iXX0=