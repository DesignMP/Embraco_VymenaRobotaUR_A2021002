define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CursorSignalDescriptor = /** @class */ (function () {
        function CursorSignalDescriptor() {
            this._cursorInfoIds = [];
            this._cursorInfos = [];
            this.visibleInfoIds = [];
        }
        CursorSignalDescriptor.prototype.getAllCursorInfo = function () {
            return this._cursorInfoIds;
        };
        Object.defineProperty(CursorSignalDescriptor.prototype, "cursorInfos", {
            get: function () {
                return this._cursorInfos;
            },
            enumerable: true,
            configurable: true
        });
        return CursorSignalDescriptor;
    }());
    exports.CursorSignalDescriptor = CursorSignalDescriptor;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3Vyc29yU2lnbmFsRGVzY3JpcHRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jdXJzb3JJbmZvV2lkZ2V0L21vZGVsL2N1cnNvclNpZ25hbERlc2NyaXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBR0E7UUFBQTtZQUVjLG1CQUFjLEdBQWtDLEVBQUUsQ0FBQztZQUVuRCxpQkFBWSxHQUFzQixFQUFFLENBQUM7WUFDckMsbUJBQWMsR0FBa0IsRUFBRSxDQUFDO1FBVWpELENBQUM7UUFQVSxpREFBZ0IsR0FBdkI7WUFDSSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDL0IsQ0FBQztRQUVELHNCQUFJLCtDQUFXO2lCQUFmO2dCQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztZQUM3QixDQUFDOzs7V0FBQTtRQUNMLDZCQUFDO0lBQUQsQ0FBQyxBQWZELElBZUM7SUFmWSx3REFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDdXJzb3JJbmZvIH0gZnJvbSBcIi4vY3Vyc29ySW5mb1wiO1xyXG5pbXBvcnQgeyBDdXJzb3JEaXNwbGF5SW5mb0NsYXNzIH0gZnJvbSBcIi4vZHluYW1pY0N1cnNvclNpZ25hbFRlbXBsYXRlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ3Vyc29yU2lnbmFsRGVzY3JpcHRvcntcclxuXHJcbiAgICBwcm90ZWN0ZWQgX2N1cnNvckluZm9JZHM6IEFycmF5PEN1cnNvckRpc3BsYXlJbmZvQ2xhc3M+ID0gW107XHJcblxyXG4gICAgcHJvdGVjdGVkIF9jdXJzb3JJbmZvczogQXJyYXk8Q3Vyc29ySW5mbz4gPSBbXTtcclxuICAgIHByb3RlY3RlZCB2aXNpYmxlSW5mb0lkczogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0QWxsQ3Vyc29ySW5mbyAoKTogQXJyYXk8Q3Vyc29yRGlzcGxheUluZm9DbGFzcz4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJzb3JJbmZvSWRzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjdXJzb3JJbmZvcygpOiBBcnJheTxDdXJzb3JJbmZvPntcclxuICAgICAgICByZXR1cm4gdGhpcy5fY3Vyc29ySW5mb3M7XHJcbiAgICB9XHJcbn0iXX0=