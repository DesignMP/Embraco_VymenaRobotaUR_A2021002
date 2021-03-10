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
    var TooglePanningCommand = /** @class */ (function (_super) {
        __extends(TooglePanningCommand, _super);
        function TooglePanningCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TooglePanningCommand.prototype.onExecuteChartCommand = function (sender, args) {
            this.chartViewChartManager.setPanning(args.data.panningEnabled);
        };
        return TooglePanningCommand;
    }(chartCommandBase_1.ChartCommandBase));
    exports.TooglePanningCommand = TooglePanningCommand;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vZ2xlUGFubmluZ0NvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY2hhcnRWaWV3V2lkZ2V0L3VzZXJJbnRlcmFjdGlvbi9jb21tYW5kcy90b29nbGVQYW5uaW5nQ29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBSUE7UUFBbUMsd0NBQWdCO1FBQW5EOztRQUtBLENBQUM7UUFIRyxvREFBcUIsR0FBckIsVUFBc0IsTUFBVyxFQUFFLElBQWtDO1lBQ2pFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNwRSxDQUFDO1FBQ0wsMkJBQUM7SUFBRCxDQUFDLEFBTEQsQ0FBbUMsbUNBQWdCLEdBS2xEO0lBRU8sb0RBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhcnRDb21tYW5kQmFzZSB9IGZyb20gXCIuLi9jaGFydENvbW1hbmRCYXNlXCI7XHJcbmltcG9ydCB7IEV2ZW50RXhlY3V0ZUNoYXJ0Q29tbWFuZEFyZ3MsIENoYXJ0Q29tbWFuZFR5cGUgfSBmcm9tIFwiLi4vdXNlckludGVyYWN0aW9uQ29udHJvbGxlclwiO1xyXG5cclxuXHJcbmNsYXNzIFRvb2dsZVBhbm5pbmdDb21tYW5kIGV4dGVuZHMgQ2hhcnRDb21tYW5kQmFzZXtcclxuICAgIFxyXG4gICAgb25FeGVjdXRlQ2hhcnRDb21tYW5kKHNlbmRlcjogYW55LCBhcmdzOiBFdmVudEV4ZWN1dGVDaGFydENvbW1hbmRBcmdzKSB7XHJcbiAgICAgICAgdGhpcy5jaGFydFZpZXdDaGFydE1hbmFnZXIuc2V0UGFubmluZyhhcmdzLmRhdGEucGFubmluZ0VuYWJsZWQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge1Rvb2dsZVBhbm5pbmdDb21tYW5kfSJdfQ==