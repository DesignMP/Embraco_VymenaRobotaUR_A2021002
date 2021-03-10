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
    var SelectPanningAxesCommand = /** @class */ (function (_super) {
        __extends(SelectPanningAxesCommand, _super);
        function SelectPanningAxesCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SelectPanningAxesCommand.prototype.onExecuteChartCommand = function (sender, args) {
            this.chartViewChartManager.setPanningAxes([args.data.zoomAxes]);
        };
        return SelectPanningAxesCommand;
    }(chartCommandBase_1.ChartCommandBase));
    exports.SelectPanningAxesCommand = SelectPanningAxesCommand;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0UGFubmluZ0F4ZXNDb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0Vmlld1dpZGdldC91c2VySW50ZXJhY3Rpb24vY29tbWFuZHMvc2VsZWN0UGFubmluZ0F4ZXNDb21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFJQTtRQUF1Qyw0Q0FBZ0I7UUFBdkQ7O1FBS0EsQ0FBQztRQUhHLHdEQUFxQixHQUFyQixVQUFzQixNQUFXLEVBQUUsSUFBa0M7WUFDakUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNwRSxDQUFDO1FBQ0wsK0JBQUM7SUFBRCxDQUFDLEFBTEQsQ0FBdUMsbUNBQWdCLEdBS3REO0lBRU8sNERBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhcnRDb21tYW5kQmFzZSB9IGZyb20gXCIuLi9jaGFydENvbW1hbmRCYXNlXCI7XHJcbmltcG9ydCB7IEV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZEFyZ3N9IGZyb20gXCIuLi91c2VySW50ZXJhY3Rpb25Db250cm9sbGVyXCI7XHJcblxyXG5cclxuY2xhc3MgU2VsZWN0UGFubmluZ0F4ZXNDb21tYW5kIGV4dGVuZHMgQ2hhcnRDb21tYW5kQmFzZXtcclxuICAgIFxyXG4gICAgb25FeGVjdXRlQ2hhcnRDb21tYW5kKHNlbmRlcjogYW55LCBhcmdzOiBFdmVudEV4ZWN1dGVDaGFydENvbW1hbmRBcmdzKSB7XHJcbiAgICAgICAgdGhpcy5jaGFydFZpZXdDaGFydE1hbmFnZXIuc2V0UGFubmluZ0F4ZXMoW2FyZ3MuZGF0YS56b29tQXhlc10pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge1NlbGVjdFBhbm5pbmdBeGVzQ29tbWFuZH0iXX0=