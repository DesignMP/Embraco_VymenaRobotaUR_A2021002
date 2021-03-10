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
    var SetCursorOnPointerPositionCommand = /** @class */ (function (_super) {
        __extends(SetCursorOnPointerPositionCommand, _super);
        function SetCursorOnPointerPositionCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SetCursorOnPointerPositionCommand.prototype.onExecuteChartCommand = function (sender, args) {
            if (args.traceChart != null) {
                this.chartViewChartManager.setCursorOnPointerPosition(args.traceChart, args.data.mousePoint);
            }
        };
        return SetCursorOnPointerPositionCommand;
    }(chartCommandBase_1.ChartCommandBase));
    exports.SetCursorOnPointerPositionCommand = SetCursorOnPointerPositionCommand;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0Q3Vyc29yQ29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jaGFydFZpZXdXaWRnZXQvdXNlckludGVyYWN0aW9uL2NvbW1hbmRzL3NldEN1cnNvckNvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUlBO1FBQWdELHFEQUFnQjtRQUFoRTs7UUFRQSxDQUFDO1FBTEcsaUVBQXFCLEdBQXJCLFVBQXNCLE1BQVcsRUFBRSxJQUFrQztZQUNqRSxJQUFHLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxFQUFDO2dCQUN2QixJQUFJLENBQUMscUJBQXFCLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ2hHO1FBQ0wsQ0FBQztRQUNMLHdDQUFDO0lBQUQsQ0FBQyxBQVJELENBQWdELG1DQUFnQixHQVEvRDtJQUVPLDhFQUFpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYXJ0Q29tbWFuZEJhc2UgfSBmcm9tIFwiLi4vY2hhcnRDb21tYW5kQmFzZVwiO1xyXG5pbXBvcnQgeyBFdmVudEV4ZWN1dGVDaGFydENvbW1hbmRBcmdzLCBDaGFydENvbW1hbmRUeXBlIH0gZnJvbSBcIi4uL3VzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXJcIjtcclxuXHJcblxyXG5jbGFzcyBTZXRDdXJzb3JPblBvaW50ZXJQb3NpdGlvbkNvbW1hbmQgZXh0ZW5kcyBDaGFydENvbW1hbmRCYXNle1xyXG4gICAgXHJcbiAgIFxyXG4gICAgb25FeGVjdXRlQ2hhcnRDb21tYW5kKHNlbmRlcjogYW55LCBhcmdzOiBFdmVudEV4ZWN1dGVDaGFydENvbW1hbmRBcmdzKSB7XHJcbiAgICAgICAgaWYoYXJncy50cmFjZUNoYXJ0ICE9IG51bGwpe1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJ0Vmlld0NoYXJ0TWFuYWdlci5zZXRDdXJzb3JPblBvaW50ZXJQb3NpdGlvbihhcmdzLnRyYWNlQ2hhcnQsIGFyZ3MuZGF0YS5tb3VzZVBvaW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7U2V0Q3Vyc29yT25Qb2ludGVyUG9zaXRpb25Db21tYW5kfSJdfQ==