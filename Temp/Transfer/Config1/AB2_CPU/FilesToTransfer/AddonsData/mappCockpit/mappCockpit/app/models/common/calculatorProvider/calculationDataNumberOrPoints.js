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
define(["require", "exports", "./calculationData"], function (require, exports, calculationData_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CalculationDataNumberOrPoints = /** @class */ (function (_super) {
        __extends(CalculationDataNumberOrPoints, _super);
        function CalculationDataNumberOrPoints(name, value, description, displayInfo) {
            if (description === void 0) { description = ""; }
            if (displayInfo === void 0) { displayInfo = undefined; }
            return _super.call(this, name, value.toString(), value, description, displayInfo) || this;
        }
        CalculationDataNumberOrPoints.prototype.getData = function () {
            return _super.prototype.getData.call(this);
        };
        CalculationDataNumberOrPoints.prototype.setData = function (data) {
            _super.prototype.setData.call(this, data);
        };
        return CalculationDataNumberOrPoints;
    }(calculationData_1.CalculationData));
    exports.CalculationDataNumberOrPoints = CalculationDataNumberOrPoints;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9jb21tb24vY2FsY3VsYXRvclByb3ZpZGVyL2NhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFJQTtRQUFtRCxpREFBZTtRQUU5RCx1Q0FBWSxJQUFZLEVBQUUsS0FBYSxFQUFFLFdBQXVCLEVBQUUsV0FBNkQ7WUFBdEYsNEJBQUEsRUFBQSxnQkFBdUI7WUFBRSw0QkFBQSxFQUFBLHVCQUE2RDttQkFDM0gsa0JBQU0sSUFBSSxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLFdBQVcsQ0FBQztRQUNsRSxDQUFDO1FBRUQsK0NBQU8sR0FBUDtZQUNJLE9BQU8saUJBQU0sT0FBTyxXQUEwQixDQUFDO1FBQ25ELENBQUM7UUFFRCwrQ0FBTyxHQUFQLFVBQVEsSUFBMEI7WUFDOUIsaUJBQU0sT0FBTyxZQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hCLENBQUM7UUFDTCxvQ0FBQztJQUFELENBQUMsQUFiRCxDQUFtRCxpQ0FBZSxHQWFqRTtJQWJZLHNFQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENhbGN1bGF0aW9uRGF0YSB9IGZyb20gXCIuL2NhbGN1bGF0aW9uRGF0YVwiO1xyXG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9wb2ludEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mbyB9IGZyb20gXCIuL2NhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHMgZXh0ZW5kcyBDYWxjdWxhdGlvbkRhdGF7XHJcblxyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCB2YWx1ZTogbnVtYmVyLCBkZXNjcmlwdGlvbjpzdHJpbmcgPSBcIlwiLCBkaXNwbGF5SW5mbzogQ2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm98dW5kZWZpbmVkID0gdW5kZWZpbmVkKXtcclxuICAgICAgICBzdXBlcihuYW1lLCB2YWx1ZS50b1N0cmluZygpLCB2YWx1ZSwgZGVzY3JpcHRpb24sIGRpc3BsYXlJbmZvKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0RGF0YSgpOiBudW1iZXJ8QXJyYXk8SVBvaW50PiB7XHJcbiAgICAgICAgcmV0dXJuIHN1cGVyLmdldERhdGEoKSBhcyBudW1iZXJ8QXJyYXk8SVBvaW50PjtcclxuICAgIH1cclxuXHJcbiAgICBzZXREYXRhKGRhdGE6IG51bWJlcnxBcnJheTxJUG9pbnQ+KSB7XHJcbiAgICAgICAgc3VwZXIuc2V0RGF0YShkYXRhKTtcclxuICAgIH1cclxufVxyXG4iXX0=