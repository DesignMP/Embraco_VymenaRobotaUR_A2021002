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
    var ResetDragPositionCommand = /** @class */ (function (_super) {
        __extends(ResetDragPositionCommand, _super);
        function ResetDragPositionCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ResetDragPositionCommand.prototype.onExecuteChartCommand = function (sender, args) {
            this.chartViewChartManager.resetPanningCoords();
        };
        return ResetDragPositionCommand;
    }(chartCommandBase_1.ChartCommandBase));
    exports.ResetDragPositionCommand = ResetDragPositionCommand;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzZXREcmFnUG9zaXRpb25Db21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0Vmlld1dpZGdldC91c2VySW50ZXJhY3Rpb24vY29tbWFuZHMvcmVzZXREcmFnUG9zaXRpb25Db21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFHQTtRQUF1Qyw0Q0FBZ0I7UUFBdkQ7O1FBTUEsQ0FBQztRQUpHLHdEQUFxQixHQUFyQixVQUFzQixNQUFXLEVBQUUsSUFBa0M7WUFDakUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFFcEQsQ0FBQztRQUNMLCtCQUFDO0lBQUQsQ0FBQyxBQU5ELENBQXVDLG1DQUFnQixHQU10RDtJQUVPLDREQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYXJ0Q29tbWFuZEJhc2UgfSBmcm9tIFwiLi4vY2hhcnRDb21tYW5kQmFzZVwiO1xyXG5pbXBvcnQgeyBFdmVudEV4ZWN1dGVDaGFydENvbW1hbmRBcmdzfSBmcm9tIFwiLi4vdXNlckludGVyYWN0aW9uQ29udHJvbGxlclwiO1xyXG5cclxuY2xhc3MgUmVzZXREcmFnUG9zaXRpb25Db21tYW5kIGV4dGVuZHMgQ2hhcnRDb21tYW5kQmFzZXtcclxuICAgIFxyXG4gICAgb25FeGVjdXRlQ2hhcnRDb21tYW5kKHNlbmRlcjogYW55LCBhcmdzOiBFdmVudEV4ZWN1dGVDaGFydENvbW1hbmRBcmdzKSB7XHJcbiAgICAgICAgdGhpcy5jaGFydFZpZXdDaGFydE1hbmFnZXIucmVzZXRQYW5uaW5nQ29vcmRzKCk7XHJcbiAgICAgIFxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge1Jlc2V0RHJhZ1Bvc2l0aW9uQ29tbWFuZH0iXX0=