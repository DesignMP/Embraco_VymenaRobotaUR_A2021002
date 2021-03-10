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
    var CheckCursorHoveringCommand = /** @class */ (function (_super) {
        __extends(CheckCursorHoveringCommand, _super);
        function CheckCursorHoveringCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CheckCursorHoveringCommand.prototype.onExecuteChartCommand = function (sender, args) {
            //TODO: get rid of typecast
            if (args.traceChart != undefined) {
                this.chartViewChartManager.checkReferenceCursorsHovering(args.data.mousePoint, args.traceChart);
            }
        };
        return CheckCursorHoveringCommand;
    }(chartCommandBase_1.ChartCommandBase));
    exports.CheckCursorHoveringCommand = CheckCursorHoveringCommand;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3Vyc29ySG92ZXJpbmdDb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0Vmlld1dpZGdldC91c2VySW50ZXJhY3Rpb24vY29tbWFuZHMvY3Vyc29ySG92ZXJpbmdDb21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFJQTtRQUF5Qyw4Q0FBZ0I7UUFBekQ7O1FBUUEsQ0FBQztRQU5HLDBEQUFxQixHQUFyQixVQUFzQixNQUFXLEVBQUUsSUFBa0M7WUFDakUsMkJBQTJCO1lBQzNCLElBQUcsSUFBSSxDQUFDLFVBQVUsSUFBSSxTQUFTLEVBQUM7Z0JBQzVCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyw2QkFBNkIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDbkc7UUFDTCxDQUFDO1FBQ0wsaUNBQUM7SUFBRCxDQUFDLEFBUkQsQ0FBeUMsbUNBQWdCLEdBUXhEO0lBRU8sZ0VBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhcnRDb21tYW5kQmFzZSB9IGZyb20gXCIuLi9jaGFydENvbW1hbmRCYXNlXCI7XHJcbmltcG9ydCB7IEV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZEFyZ3N9IGZyb20gXCIuLi91c2VySW50ZXJhY3Rpb25Db250cm9sbGVyXCI7XHJcblxyXG5cclxuY2xhc3MgQ2hlY2tDdXJzb3JIb3ZlcmluZ0NvbW1hbmQgZXh0ZW5kcyBDaGFydENvbW1hbmRCYXNle1xyXG4gICAgXHJcbiAgICBvbkV4ZWN1dGVDaGFydENvbW1hbmQoc2VuZGVyOiBhbnksIGFyZ3M6IEV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZEFyZ3MpIHtcclxuICAgICAgICAvL1RPRE86IGdldCByaWQgb2YgdHlwZWNhc3RcclxuICAgICAgICBpZihhcmdzLnRyYWNlQ2hhcnQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5jaGFydFZpZXdDaGFydE1hbmFnZXIuY2hlY2tSZWZlcmVuY2VDdXJzb3JzSG92ZXJpbmcoYXJncy5kYXRhLm1vdXNlUG9pbnQsIGFyZ3MudHJhY2VDaGFydCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge0NoZWNrQ3Vyc29ySG92ZXJpbmdDb21tYW5kfSJdfQ==