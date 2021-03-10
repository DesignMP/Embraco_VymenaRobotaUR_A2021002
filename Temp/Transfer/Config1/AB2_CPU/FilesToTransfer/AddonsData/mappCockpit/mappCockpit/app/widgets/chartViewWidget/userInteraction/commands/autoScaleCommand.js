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
    var AutoScaleCommand = /** @class */ (function (_super) {
        __extends(AutoScaleCommand, _super);
        function AutoScaleCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AutoScaleCommand.prototype.onExecuteChartCommand = function (sender, args) {
            this.chartViewChartManager.autoScale();
        };
        return AutoScaleCommand;
    }(chartCommandBase_1.ChartCommandBase));
    exports.AutoScaleCommand = AutoScaleCommand;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b1NjYWxlQ29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jaGFydFZpZXdXaWRnZXQvdXNlckludGVyYWN0aW9uL2NvbW1hbmRzL2F1dG9TY2FsZUNvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUlBO1FBQStCLG9DQUFnQjtRQUEvQzs7UUFLQSxDQUFDO1FBSEcsZ0RBQXFCLEdBQXJCLFVBQXNCLE1BQVcsRUFBRSxJQUFrQztZQUNqRSxJQUFJLENBQUMscUJBQXFCLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDM0MsQ0FBQztRQUNMLHVCQUFDO0lBQUQsQ0FBQyxBQUxELENBQStCLG1DQUFnQixHQUs5QztJQUVPLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYXJ0Q29tbWFuZEJhc2UgfSBmcm9tIFwiLi4vY2hhcnRDb21tYW5kQmFzZVwiO1xyXG5pbXBvcnQgeyBFdmVudEV4ZWN1dGVDaGFydENvbW1hbmRBcmdzfSBmcm9tIFwiLi4vdXNlckludGVyYWN0aW9uQ29udHJvbGxlclwiO1xyXG5cclxuXHJcbmNsYXNzIEF1dG9TY2FsZUNvbW1hbmQgZXh0ZW5kcyBDaGFydENvbW1hbmRCYXNle1xyXG4gICAgXHJcbiAgICBvbkV4ZWN1dGVDaGFydENvbW1hbmQoc2VuZGVyOiBhbnksIGFyZ3M6IEV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZEFyZ3MpIHtcclxuICAgICAgICB0aGlzLmNoYXJ0Vmlld0NoYXJ0TWFuYWdlci5hdXRvU2NhbGUoKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtBdXRvU2NhbGVDb21tYW5kfSJdfQ==