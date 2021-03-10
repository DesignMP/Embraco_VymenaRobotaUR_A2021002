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
define(["require", "exports", "../chartCommandBase"], function (require, exports, chartCommandBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ToogleBoxZoomCommand = /** @class */ (function (_super) {
        __extends(ToogleBoxZoomCommand, _super);
        function ToogleBoxZoomCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ToogleBoxZoomCommand.prototype.onExecuteChartCommand = function (sender, args) {
            this.chartViewChartManager.setBoxZoom(args.data.boxZoomEnabled);
        };
        return ToogleBoxZoomCommand;
    }(chartCommandBase_1.ChartCommandBase));
    exports.ToogleBoxZoomCommand = ToogleBoxZoomCommand;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vZ2xlQm94Wm9vbUNvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY2hhcnRWaWV3V2lkZ2V0L3VzZXJJbnRlcmFjdGlvbi9jb21tYW5kcy90b29nbGVCb3hab29tQ29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBSUE7UUFBbUMsd0NBQWdCO1FBQW5EOztRQUtBLENBQUM7UUFIRyxvREFBcUIsR0FBckIsVUFBc0IsTUFBVyxFQUFFLElBQWtDO1lBQ2pFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNwRSxDQUFDO1FBQ0wsMkJBQUM7SUFBRCxDQUFDLEFBTEQsQ0FBbUMsbUNBQWdCLEdBS2xEO0lBRU8sb0RBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhcnRDb21tYW5kQmFzZSB9IGZyb20gXCIuLi9jaGFydENvbW1hbmRCYXNlXCI7XHJcbmltcG9ydCB7IEV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZEFyZ3N9IGZyb20gXCIuLi91c2VySW50ZXJhY3Rpb25Db250cm9sbGVyXCI7XHJcblxyXG5cclxuY2xhc3MgVG9vZ2xlQm94Wm9vbUNvbW1hbmQgZXh0ZW5kcyBDaGFydENvbW1hbmRCYXNle1xyXG4gICAgXHJcbiAgICBvbkV4ZWN1dGVDaGFydENvbW1hbmQoc2VuZGVyOiBhbnksIGFyZ3M6IEV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZEFyZ3MpIHtcclxuICAgICAgICB0aGlzLmNoYXJ0Vmlld0NoYXJ0TWFuYWdlci5zZXRCb3hab29tKGFyZ3MuZGF0YS5ib3hab29tRW5hYmxlZCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7VG9vZ2xlQm94Wm9vbUNvbW1hbmR9Il19