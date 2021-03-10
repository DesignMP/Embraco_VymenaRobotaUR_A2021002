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
define(["require", "exports", "../../../framework/state", "../../chartViewWidget/chartViewWidget"], function (require, exports, state_1, chartViewWidget_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ChartViewToolStateEnum;
    (function (ChartViewToolStateEnum) {
        ChartViewToolStateEnum[ChartViewToolStateEnum["CURSORS"] = 0] = "CURSORS";
        ChartViewToolStateEnum[ChartViewToolStateEnum["PANNING"] = 1] = "PANNING";
        ChartViewToolStateEnum[ChartViewToolStateEnum["BOXZOOM"] = 2] = "BOXZOOM";
    })(ChartViewToolStateEnum = exports.ChartViewToolStateEnum || (exports.ChartViewToolStateEnum = {}));
    /**
     *
     * @singleton
     * @export
     * @class ChartViewToolState
     */
    var ChartViewToolState = /** @class */ (function (_super) {
        __extends(ChartViewToolState, _super);
        function ChartViewToolState() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.selectedTool = ChartViewToolStateEnum.CURSORS;
            return _this;
        }
        return ChartViewToolState;
    }(state_1.State));
    exports.ChartViewToolState = ChartViewToolState;
    var ChartViewZoomDirectionState = /** @class */ (function () {
        function ChartViewZoomDirectionState() {
            this.zoomDirection = chartViewWidget_1.ZoomDirection.XY;
        }
        return ChartViewZoomDirectionState;
    }());
    exports.ChartViewZoomDirectionState = ChartViewZoomDirectionState;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRWaWV3VG9vbGJhclN0YXRlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jb21tb24vc3RhdGVzL2NoYXJ0Vmlld1Rvb2xiYXJTdGF0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUdBLElBQVksc0JBS1g7SUFMRCxXQUFZLHNCQUFzQjtRQUM5Qix5RUFBTyxDQUFBO1FBQ1AseUVBQU8sQ0FBQTtRQUNQLHlFQUFPLENBQUE7SUFFWCxDQUFDLEVBTFcsc0JBQXNCLEdBQXRCLDhCQUFzQixLQUF0Qiw4QkFBc0IsUUFLakM7SUFFRDs7Ozs7T0FLRztJQUNIO1FBQXdDLHNDQUFLO1FBQTdDO1lBQUEscUVBRUM7WUFERyxrQkFBWSxHQUEyQixzQkFBc0IsQ0FBQyxPQUFPLENBQUM7O1FBQzFFLENBQUM7UUFBRCx5QkFBQztJQUFELENBQUMsQUFGRCxDQUF3QyxhQUFLLEdBRTVDO0lBRlksZ0RBQWtCO0lBSy9CO1FBQUE7WUFDSSxrQkFBYSxHQUFrQiwrQkFBYSxDQUFDLEVBQUUsQ0FBQztRQUNwRCxDQUFDO1FBQUQsa0NBQUM7SUFBRCxDQUFDLEFBRkQsSUFFQztJQUZZLGtFQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0YXRlIH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9zdGF0ZVwiO1xyXG5pbXBvcnQgeyBab29tRGlyZWN0aW9uIH0gZnJvbSBcIi4uLy4uL2NoYXJ0Vmlld1dpZGdldC9jaGFydFZpZXdXaWRnZXRcIjtcclxuXHJcbmV4cG9ydCBlbnVtIENoYXJ0Vmlld1Rvb2xTdGF0ZUVudW17XHJcbiAgICBDVVJTT1JTLFxyXG4gICAgUEFOTklORyxcclxuICAgIEJPWFpPT00sXHJcbiAgICBcclxufVxyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEBzaW5nbGV0b25cclxuICogQGV4cG9ydFxyXG4gKiBAY2xhc3MgQ2hhcnRWaWV3VG9vbFN0YXRlXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ2hhcnRWaWV3VG9vbFN0YXRlIGV4dGVuZHMgU3RhdGV7XHJcbiAgICBzZWxlY3RlZFRvb2w6IENoYXJ0Vmlld1Rvb2xTdGF0ZUVudW0gPSBDaGFydFZpZXdUb29sU3RhdGVFbnVtLkNVUlNPUlM7ICBcclxufVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBDaGFydFZpZXdab29tRGlyZWN0aW9uU3RhdGV7XHJcbiAgICB6b29tRGlyZWN0aW9uOiBab29tRGlyZWN0aW9uID0gWm9vbURpcmVjdGlvbi5YWTtcclxufSJdfQ==