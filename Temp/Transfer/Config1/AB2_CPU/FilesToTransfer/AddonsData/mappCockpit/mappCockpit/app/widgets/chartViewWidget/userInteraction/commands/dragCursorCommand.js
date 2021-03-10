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
    var DragCursorCommand = /** @class */ (function (_super) {
        __extends(DragCursorCommand, _super);
        function DragCursorCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DragCursorCommand.prototype.onExecuteChartCommand = function (sender, args) {
            if (args.traceChart != null) {
                this.chartViewChartManager.dragCursorAlongLine(args.traceChart, args.data.movementX, args.data.movementY);
            }
        };
        return DragCursorCommand;
    }(chartCommandBase_1.ChartCommandBase));
    exports.DragCursorCommand = DragCursorCommand;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZ0N1cnNvckNvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY2hhcnRWaWV3V2lkZ2V0L3VzZXJJbnRlcmFjdGlvbi9jb21tYW5kcy9kcmFnQ3Vyc29yQ29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBSUE7UUFBZ0MscUNBQWdCO1FBQWhEOztRQU9BLENBQUM7UUFMRyxpREFBcUIsR0FBckIsVUFBc0IsTUFBVyxFQUFFLElBQWtDO1lBQ2pFLElBQUcsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLEVBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDN0c7UUFDTCxDQUFDO1FBQ0wsd0JBQUM7SUFBRCxDQUFDLEFBUEQsQ0FBZ0MsbUNBQWdCLEdBTy9DO0lBRVEsOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhcnRDb21tYW5kQmFzZSB9IGZyb20gXCIuLi9jaGFydENvbW1hbmRCYXNlXCI7XHJcbmltcG9ydCB7IEV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZEFyZ3MgfSBmcm9tIFwiLi4vdXNlckludGVyYWN0aW9uQ29udHJvbGxlclwiO1xyXG5pbXBvcnQgeyBDaGFydEJhc2UgfSBmcm9tIFwiLi4vLi4vQ2hhcnRCYXNlXCI7XHJcblxyXG5jbGFzcyBEcmFnQ3Vyc29yQ29tbWFuZCBleHRlbmRzIENoYXJ0Q29tbWFuZEJhc2V7XHJcbiAgICBcclxuICAgIG9uRXhlY3V0ZUNoYXJ0Q29tbWFuZChzZW5kZXI6IGFueSwgYXJnczogRXZlbnRFeGVjdXRlQ2hhcnRDb21tYW5kQXJncykge1xyXG4gICAgICAgIGlmKGFyZ3MudHJhY2VDaGFydCAhPSBudWxsKXtcclxuICAgICAgICAgICAgdGhpcy5jaGFydFZpZXdDaGFydE1hbmFnZXIuZHJhZ0N1cnNvckFsb25nTGluZShhcmdzLnRyYWNlQ2hhcnQsIGFyZ3MuZGF0YS5tb3ZlbWVudFgsIGFyZ3MuZGF0YS5tb3ZlbWVudFkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgRHJhZ0N1cnNvckNvbW1hbmQgfSJdfQ==