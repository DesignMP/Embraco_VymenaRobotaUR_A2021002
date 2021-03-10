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
    var PanChartCommand = /** @class */ (function (_super) {
        __extends(PanChartCommand, _super);
        function PanChartCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PanChartCommand.prototype.onExecuteChartCommand = function (sender, args) {
            if (args.traceChart != undefined) {
                this.chartViewChartManager.doPanning(args.traceChart, args.data.args.mousePoint.x, args.data.args.mousePoint.y);
            }
        };
        return PanChartCommand;
    }(chartCommandBase_1.ChartCommandBase));
    exports.PanChartCommand = PanChartCommand;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFuQ2hhcnRDb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0Vmlld1dpZGdldC91c2VySW50ZXJhY3Rpb24vY29tbWFuZHMvcGFuQ2hhcnRDb21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFJQTtRQUE4QixtQ0FBZ0I7UUFBOUM7O1FBT0EsQ0FBQztRQUxHLCtDQUFxQixHQUFyQixVQUFzQixNQUFXLEVBQUUsSUFBa0M7WUFDakUsSUFBRyxJQUFJLENBQUMsVUFBVSxJQUFJLFNBQVMsRUFBQztnQkFDNUIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ25IO1FBQ0wsQ0FBQztRQUNMLHNCQUFDO0lBQUQsQ0FBQyxBQVBELENBQThCLG1DQUFnQixHQU83QztJQUVPLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhcnRDb21tYW5kQmFzZSB9IGZyb20gXCIuLi9jaGFydENvbW1hbmRCYXNlXCI7XHJcbmltcG9ydCB7IEV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZEFyZ3N9IGZyb20gXCIuLi91c2VySW50ZXJhY3Rpb25Db250cm9sbGVyXCI7XHJcblxyXG5cclxuY2xhc3MgUGFuQ2hhcnRDb21tYW5kIGV4dGVuZHMgQ2hhcnRDb21tYW5kQmFzZXtcclxuICAgIFxyXG4gICAgb25FeGVjdXRlQ2hhcnRDb21tYW5kKHNlbmRlcjogYW55LCBhcmdzOiBFdmVudEV4ZWN1dGVDaGFydENvbW1hbmRBcmdzKSB7XHJcbiAgICAgICAgaWYoYXJncy50cmFjZUNoYXJ0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcnRWaWV3Q2hhcnRNYW5hZ2VyLmRvUGFubmluZyhhcmdzLnRyYWNlQ2hhcnQsIGFyZ3MuZGF0YS5hcmdzLm1vdXNlUG9pbnQueCwgYXJncy5kYXRhLmFyZ3MubW91c2VQb2ludC55KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7UGFuQ2hhcnRDb21tYW5kfSJdfQ==