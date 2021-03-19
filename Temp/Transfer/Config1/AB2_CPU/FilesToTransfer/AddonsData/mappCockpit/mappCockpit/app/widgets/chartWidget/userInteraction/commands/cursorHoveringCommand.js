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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3Vyc29ySG92ZXJpbmdDb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0V2lkZ2V0L3VzZXJJbnRlcmFjdGlvbi9jb21tYW5kcy9jdXJzb3JIb3ZlcmluZ0NvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUlBO1FBQXlDLDhDQUFnQjtRQUF6RDs7UUFRQSxDQUFDO1FBTkcsMERBQXFCLEdBQXJCLFVBQXNCLE1BQVcsRUFBRSxJQUFrQztZQUNqRSwyQkFBMkI7WUFDM0IsSUFBRyxJQUFJLENBQUMsVUFBVSxJQUFJLFNBQVMsRUFBQztnQkFDNUIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLDZCQUE2QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUNuRztRQUNMLENBQUM7UUFDTCxpQ0FBQztJQUFELENBQUMsQUFSRCxDQUF5QyxtQ0FBZ0IsR0FReEQ7SUFFTyxnRUFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFydENvbW1hbmRCYXNlIH0gZnJvbSBcIi4uL2NoYXJ0Q29tbWFuZEJhc2VcIjtcclxuaW1wb3J0IHsgRXZlbnRFeGVjdXRlQ2hhcnRDb21tYW5kQXJnc30gZnJvbSBcIi4uL3VzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXJcIjtcclxuXHJcblxyXG5jbGFzcyBDaGVja0N1cnNvckhvdmVyaW5nQ29tbWFuZCBleHRlbmRzIENoYXJ0Q29tbWFuZEJhc2V7XHJcbiAgICBcclxuICAgIG9uRXhlY3V0ZUNoYXJ0Q29tbWFuZChzZW5kZXI6IGFueSwgYXJnczogRXZlbnRFeGVjdXRlQ2hhcnRDb21tYW5kQXJncykge1xyXG4gICAgICAgIC8vVE9ETzogZ2V0IHJpZCBvZiB0eXBlY2FzdFxyXG4gICAgICAgIGlmKGFyZ3MudHJhY2VDaGFydCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJ0Vmlld0NoYXJ0TWFuYWdlci5jaGVja1JlZmVyZW5jZUN1cnNvcnNIb3ZlcmluZyhhcmdzLmRhdGEubW91c2VQb2ludCwgYXJncy50cmFjZUNoYXJ0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7Q2hlY2tDdXJzb3JIb3ZlcmluZ0NvbW1hbmR9Il19