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
    var CalculationDataNumber = /** @class */ (function (_super) {
        __extends(CalculationDataNumber, _super);
        function CalculationDataNumber(name, value, description, displayInfo) {
            if (description === void 0) { description = ""; }
            if (displayInfo === void 0) { displayInfo = undefined; }
            return _super.call(this, name, value.toString(), value, description, displayInfo) || this;
        }
        CalculationDataNumber.prototype.getData = function () {
            return _super.prototype.getData.call(this);
        };
        CalculationDataNumber.prototype.setData = function (data) {
            _super.prototype.setData.call(this, data);
        };
        return CalculationDataNumber;
    }(calculationData_1.CalculationData));
    exports.CalculationDataNumber = CalculationDataNumber;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsY3VsYXRpb25EYXRhTnVtYmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdGlvbkRhdGFOdW1iZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUdBO1FBQTJDLHlDQUFlO1FBRXRELCtCQUFZLElBQVksRUFBRSxLQUFhLEVBQUUsV0FBdUIsRUFBRSxXQUE2RDtZQUF0Riw0QkFBQSxFQUFBLGdCQUF1QjtZQUFFLDRCQUFBLEVBQUEsdUJBQTZEO21CQUMzSCxrQkFBTSxJQUFJLEVBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsV0FBVyxDQUFDO1FBQ2xFLENBQUM7UUFFRCx1Q0FBTyxHQUFQO1lBQ0ksT0FBTyxpQkFBTSxPQUFPLFdBQVksQ0FBQztRQUNyQyxDQUFDO1FBRUQsdUNBQU8sR0FBUCxVQUFRLElBQVk7WUFDaEIsaUJBQU0sT0FBTyxZQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hCLENBQUM7UUFDTCw0QkFBQztJQUFELENBQUMsQUFiRCxDQUEyQyxpQ0FBZSxHQWF6RDtJQWJZLHNEQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENhbGN1bGF0aW9uRGF0YSB9IGZyb20gXCIuL2NhbGN1bGF0aW9uRGF0YVwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mbyB9IGZyb20gXCIuL2NhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2FsY3VsYXRpb25EYXRhTnVtYmVyIGV4dGVuZHMgQ2FsY3VsYXRpb25EYXRhe1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgdmFsdWU6IG51bWJlciwgZGVzY3JpcHRpb246c3RyaW5nID0gXCJcIiwgZGlzcGxheUluZm86IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvfHVuZGVmaW5lZCA9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgc3VwZXIobmFtZSwgdmFsdWUudG9TdHJpbmcoKSwgdmFsdWUsIGRlc2NyaXB0aW9uLCBkaXNwbGF5SW5mbyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldERhdGEoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gc3VwZXIuZ2V0RGF0YSgpIGFzIG51bWJlcjtcclxuICAgIH1cclxuXHJcbiAgICBzZXREYXRhKGRhdGE6IG51bWJlcikge1xyXG4gICAgICAgIHN1cGVyLnNldERhdGEoZGF0YSk7XHJcbiAgICB9XHJcbn1cclxuIl19