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
    var SelectZoomAxesCommand = /** @class */ (function (_super) {
        __extends(SelectZoomAxesCommand, _super);
        function SelectZoomAxesCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SelectZoomAxesCommand.prototype.onExecuteChartCommand = function (sender, args) {
            this.chartViewChartManager.setChartZoomAxes(args.data.zoomAxes);
        };
        return SelectZoomAxesCommand;
    }(chartCommandBase_1.ChartCommandBase));
    exports.SelectZoomAxesCommand = SelectZoomAxesCommand;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0Wm9vbUF4ZXNDb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0Vmlld1dpZGdldC91c2VySW50ZXJhY3Rpb24vY29tbWFuZHMvc2VsZWN0Wm9vbUF4ZXNDb21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFJQTtRQUFvQyx5Q0FBZ0I7UUFBcEQ7O1FBS0EsQ0FBQztRQUhHLHFEQUFxQixHQUFyQixVQUFzQixNQUFXLEVBQUUsSUFBa0M7WUFDakUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEUsQ0FBQztRQUNMLDRCQUFDO0lBQUQsQ0FBQyxBQUxELENBQW9DLG1DQUFnQixHQUtuRDtJQUVPLHNEQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYXJ0Q29tbWFuZEJhc2UgfSBmcm9tIFwiLi4vY2hhcnRDb21tYW5kQmFzZVwiO1xyXG5pbXBvcnQgeyBFdmVudEV4ZWN1dGVDaGFydENvbW1hbmRBcmdzfSBmcm9tIFwiLi4vdXNlckludGVyYWN0aW9uQ29udHJvbGxlclwiO1xyXG5cclxuXHJcbmNsYXNzIFNlbGVjdFpvb21BeGVzQ29tbWFuZCBleHRlbmRzIENoYXJ0Q29tbWFuZEJhc2V7XHJcbiAgICBcclxuICAgIG9uRXhlY3V0ZUNoYXJ0Q29tbWFuZChzZW5kZXI6IGFueSwgYXJnczogRXZlbnRFeGVjdXRlQ2hhcnRDb21tYW5kQXJncykge1xyXG4gICAgICAgIHRoaXMuY2hhcnRWaWV3Q2hhcnRNYW5hZ2VyLnNldENoYXJ0Wm9vbUF4ZXMoYXJncy5kYXRhLnpvb21BeGVzKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtTZWxlY3Rab29tQXhlc0NvbW1hbmR9Il19