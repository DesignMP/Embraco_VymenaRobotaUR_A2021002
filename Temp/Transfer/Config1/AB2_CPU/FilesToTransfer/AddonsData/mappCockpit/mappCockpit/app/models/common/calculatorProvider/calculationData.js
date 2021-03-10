define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CalculationData = /** @class */ (function () {
        function CalculationData(name, value, data, description, displayInfo) {
            if (description === void 0) { description = ""; }
            if (displayInfo === void 0) { displayInfo = undefined; }
            this._name = name;
            this._value = value;
            this._data = data;
            this.description = description;
            this.errorInfo = new Array();
            this.displayInfo = displayInfo;
            if (this.displayInfo != undefined) {
                this.values = this.displayInfo.values;
            }
        }
        Object.defineProperty(CalculationData.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (value) {
                this._value = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CalculationData.prototype, "type", {
            get: function () {
                return this._type;
            },
            set: function (value) {
                this._type = value;
            },
            enumerable: true,
            configurable: true
        });
        CalculationData.prototype.getDisplayName = function () {
            return this._name;
        };
        CalculationData.prototype.getIconPath = function () {
            return "";
        };
        CalculationData.prototype.getData = function () {
            return this._data;
        };
        CalculationData.prototype.setData = function (data) {
            this._data = data;
        };
        return CalculationData;
    }());
    exports.CalculationData = CalculationData;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsY3VsYXRpb25EYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdGlvbkRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBTUE7UUFXSSx5QkFBWSxJQUFZLEVBQUUsS0FBYSxFQUFFLElBQW1DLEVBQUUsV0FBdUIsRUFBRSxXQUE2RDtZQUF0Riw0QkFBQSxFQUFBLGdCQUF1QjtZQUFFLDRCQUFBLEVBQUEsdUJBQTZEO1lBQ2hLLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1lBQy9CLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxLQUFLLEVBQVUsQ0FBQztZQUVyQyxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztZQUMvQixJQUFHLElBQUksQ0FBQyxXQUFXLElBQUssU0FBUyxFQUFDO2dCQUM5QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO2FBQ3pDO1FBQ0wsQ0FBQztRQUVELHNCQUFJLGtDQUFLO2lCQUFUO2dCQUNJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUN2QixDQUFDO2lCQUVELFVBQVUsS0FBYTtnQkFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDeEIsQ0FBQzs7O1dBSkE7UUFNRCxzQkFBSSxpQ0FBSTtpQkFBUjtnQkFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDdEIsQ0FBQztpQkFFRCxVQUFTLEtBQTZCO2dCQUNsQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUN2QixDQUFDOzs7V0FKQTtRQU1ELHdDQUFjLEdBQWQ7WUFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDdEIsQ0FBQztRQUVELHFDQUFXLEdBQVg7WUFDSSxPQUFPLEVBQUUsQ0FBQztRQUNkLENBQUM7UUFFRCxpQ0FBTyxHQUFQO1lBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RCLENBQUM7UUFFRCxpQ0FBTyxHQUFQLFVBQVEsSUFBbUM7WUFDdkMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDdEIsQ0FBQztRQUNMLHNCQUFDO0lBQUQsQ0FBQyxBQXZERCxJQXVEQztJQXZEWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDYWxjdWxhdGlvbkRhdGEgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL2NhbGN1bGF0aW9uRGF0YUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9wb2ludEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mbyB9IGZyb20gXCIuL2NhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvXCI7XHJcbmltcG9ydCB7IElWYWx1ZUxpc3RJdGVtIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9pbnRlcmZhY2VzL3ZhbHVlTGlzdEl0ZW1JbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU2VyaWVzVHlwZSB9IGZyb20gXCIuLi8uLi9jaGFydE1hbmFnZXJEYXRhTW9kZWwvc2VyaWVzVHlwZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENhbGN1bGF0aW9uRGF0YSBpbXBsZW1lbnRzIElDYWxjdWxhdGlvbkRhdGF7XHJcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gICAgdmFsdWVzOiBBcnJheTxJVmFsdWVMaXN0SXRlbT58dW5kZWZpbmVkO1xyXG4gICAgZGlzcGxheUluZm86IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvfHVuZGVmaW5lZDtcclxuICAgIGVycm9ySW5mbzogQXJyYXk8c3RyaW5nPjtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfbmFtZTogc3RyaW5nXHJcbiAgICBwcml2YXRlIF92YWx1ZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfZGF0YTogbnVtYmVyfCBzdHJpbmd8IEFycmF5PElQb2ludD47XHJcbiAgICBwcml2YXRlIF90eXBlOiBTZXJpZXNUeXBlIHwgdW5kZWZpbmVkO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZywgZGF0YTogbnVtYmVyfCBzdHJpbmd8IEFycmF5PElQb2ludD4sIGRlc2NyaXB0aW9uOnN0cmluZyA9IFwiXCIsIGRpc3BsYXlJbmZvOiBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mb3x1bmRlZmluZWQgPSB1bmRlZmluZWQpe1xyXG4gICAgICAgIHRoaXMuX25hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xyXG4gICAgICAgIHRoaXMuZXJyb3JJbmZvID0gbmV3IEFycmF5PHN0cmluZz4oKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmRpc3BsYXlJbmZvID0gZGlzcGxheUluZm87XHJcbiAgICAgICAgaWYodGhpcy5kaXNwbGF5SW5mbyAgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZXMgPSB0aGlzLmRpc3BsYXlJbmZvLnZhbHVlcztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHZhbHVlKCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHZhbHVlKHZhbHVlOiBzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHR5cGUoKTogU2VyaWVzVHlwZSB8IHVuZGVmaW5lZHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdHlwZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgdHlwZSh2YWx1ZTogU2VyaWVzVHlwZSB8IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgdGhpcy5fdHlwZSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldERpc3BsYXlOYW1lKCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRJY29uUGF0aCgpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldERhdGEoKTogbnVtYmVyfCBzdHJpbmd8IEFycmF5PElQb2ludD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHNldERhdGEoZGF0YTogbnVtYmVyfCBzdHJpbmd8IEFycmF5PElQb2ludD4pIHtcclxuICAgICAgICB0aGlzLl9kYXRhID0gZGF0YTtcclxuICAgIH1cclxufVxyXG4iXX0=