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
    var EndCursorDragCommand = /** @class */ (function (_super) {
        __extends(EndCursorDragCommand, _super);
        function EndCursorDragCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EndCursorDragCommand.prototype.onExecuteChartCommand = function (sender, args) {
            //TODO: get rid of typecast
            // (args.traceChart as ChartBase).refCursorsSetDragFlag(false);
        };
        return EndCursorDragCommand;
    }(chartCommandBase_1.ChartCommandBase));
    exports.EndCursorDragCommand = EndCursorDragCommand;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5kQ3Vyc29yRHJhZ0NvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY2hhcnRWaWV3V2lkZ2V0L3VzZXJJbnRlcmFjdGlvbi9jb21tYW5kcy9lbmRDdXJzb3JEcmFnQ29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBS0E7UUFBbUMsd0NBQWdCO1FBQW5EOztRQU1BLENBQUM7UUFKRyxvREFBcUIsR0FBckIsVUFBc0IsTUFBVyxFQUFFLElBQWtDO1lBQ2pFLDJCQUEyQjtZQUMzQiwrREFBK0Q7UUFDbkUsQ0FBQztRQUNMLDJCQUFDO0lBQUQsQ0FBQyxBQU5ELENBQW1DLG1DQUFnQixHQU1sRDtJQUVPLG9EQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYXJ0Q29tbWFuZEJhc2UgfSBmcm9tIFwiLi4vY2hhcnRDb21tYW5kQmFzZVwiO1xyXG5pbXBvcnQgeyBFdmVudEV4ZWN1dGVDaGFydENvbW1hbmRBcmdzfSBmcm9tIFwiLi4vdXNlckludGVyYWN0aW9uQ29udHJvbGxlclwiO1xyXG5pbXBvcnQgeyBDaGFydEJhc2UgfSBmcm9tIFwiLi4vLi4vQ2hhcnRCYXNlXCI7XHJcblxyXG5cclxuY2xhc3MgRW5kQ3Vyc29yRHJhZ0NvbW1hbmQgZXh0ZW5kcyBDaGFydENvbW1hbmRCYXNle1xyXG4gICAgXHJcbiAgICBvbkV4ZWN1dGVDaGFydENvbW1hbmQoc2VuZGVyOiBhbnksIGFyZ3M6IEV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZEFyZ3MpIHtcclxuICAgICAgICAvL1RPRE86IGdldCByaWQgb2YgdHlwZWNhc3RcclxuICAgICAgICAvLyAoYXJncy50cmFjZUNoYXJ0IGFzIENoYXJ0QmFzZSkucmVmQ3Vyc29yc1NldERyYWdGbGFnKGZhbHNlKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtFbmRDdXJzb3JEcmFnQ29tbWFuZH0iXX0=