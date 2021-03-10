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
    var CalculationDataPoints = /** @class */ (function (_super) {
        __extends(CalculationDataPoints, _super);
        function CalculationDataPoints(name, value, data, description, displayInfo) {
            if (description === void 0) { description = ""; }
            if (displayInfo === void 0) { displayInfo = undefined; }
            return _super.call(this, name, value, data, description, displayInfo) || this;
        }
        CalculationDataPoints.prototype.getData = function () {
            return _super.prototype.getData.call(this);
        };
        CalculationDataPoints.prototype.setData = function (data) {
            _super.prototype.setData.call(this, data);
        };
        return CalculationDataPoints;
    }(calculationData_1.CalculationData));
    exports.CalculationDataPoints = CalculationDataPoints;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsY3VsYXRpb25EYXRhUG9pbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdGlvbkRhdGFQb2ludHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUlBO1FBQTJDLHlDQUFlO1FBRXRELCtCQUFZLElBQVksRUFBRSxLQUFhLEVBQUUsSUFBbUIsRUFBQyxXQUF1QixFQUFFLFdBQTZEO1lBQXRGLDRCQUFBLEVBQUEsZ0JBQXVCO1lBQUUsNEJBQUEsRUFBQSx1QkFBNkQ7bUJBQy9JLGtCQUFNLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxXQUFXLENBQUM7UUFDdEQsQ0FBQztRQUVELHVDQUFPLEdBQVA7WUFDSSxPQUFPLGlCQUFNLE9BQU8sV0FBbUIsQ0FBQztRQUM1QyxDQUFDO1FBRUQsdUNBQU8sR0FBUCxVQUFRLElBQW1CO1lBQ3ZCLGlCQUFNLE9BQU8sWUFBQyxJQUFJLENBQUMsQ0FBQztRQUN4QixDQUFDO1FBQ0wsNEJBQUM7SUFBRCxDQUFDLEFBYkQsQ0FBMkMsaUNBQWUsR0FhekQ7SUFiWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGEgfSBmcm9tIFwiLi9jYWxjdWxhdGlvbkRhdGFcIjtcclxuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm8gfSBmcm9tIFwiLi9jYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mb1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENhbGN1bGF0aW9uRGF0YVBvaW50cyBleHRlbmRzIENhbGN1bGF0aW9uRGF0YXtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIGRhdGE6IEFycmF5PElQb2ludD4sZGVzY3JpcHRpb246c3RyaW5nID0gXCJcIiwgZGlzcGxheUluZm86IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvfHVuZGVmaW5lZCA9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgc3VwZXIobmFtZSwgdmFsdWUsIGRhdGEsIGRlc2NyaXB0aW9uLCBkaXNwbGF5SW5mbyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldERhdGEoKTogQXJyYXk8SVBvaW50PiB7XHJcbiAgICAgICAgcmV0dXJuIHN1cGVyLmdldERhdGEoKSBhcyBBcnJheTxJUG9pbnQ+O1xyXG4gICAgfVxyXG5cclxuICAgIHNldERhdGEoZGF0YTogQXJyYXk8SVBvaW50Pikge1xyXG4gICAgICAgIHN1cGVyLnNldERhdGEoZGF0YSk7XHJcbiAgICB9XHJcbn1cclxuIl19