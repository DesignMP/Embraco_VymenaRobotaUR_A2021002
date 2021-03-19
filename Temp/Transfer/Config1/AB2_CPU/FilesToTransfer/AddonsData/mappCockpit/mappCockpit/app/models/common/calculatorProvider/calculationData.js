define(["require", "exports", "../../chartManagerDataModel/seriesType"], function (require, exports, seriesType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CalculationData = /** @class */ (function () {
        function CalculationData(name, value, data, description, displayInfo) {
            if (description === void 0) { description = ""; }
            if (displayInfo === void 0) { displayInfo = undefined; }
            this._type = seriesType_1.SeriesType.timeSeries;
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
        CalculationData.prototype.create = function (data) {
            var newObject = new CalculationData("", "", data);
            return newObject;
        };
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
        /**
         * Gets displayvalue to rawvalue if an value list exists.
         * Gets convererted string if value converter exists.
         *
         * @param {string} newValue
         * @returns {string}
         * @memberof CalculationData
         */
        CalculationData.prototype.getDisplayValue = function (newValue) {
            var retValue = newValue;
            if (this.values != undefined) {
                // Return displayValue instead of id if found in available values list
                this.values.forEach(function (value) {
                    if (newValue == value.value) {
                        retValue = value.displayValue;
                    }
                });
            }
            else if (this.valueConverter != undefined) {
                retValue = this.getValueFromRawValue(newValue);
            }
            return retValue;
        };
        /**
         * Gets rawvalue to displayvalue if an value list exists.
         *
         * @private
         * @param {string} value
         * @returns {string}
         * @memberof CalculationData
         */
        CalculationData.prototype.getRawValueToDisplayValue = function (value) {
            var rawValue = value;
            if (this.values != undefined) {
                // Set raw value instead of display value if found in available values list
                this.values.forEach(function (value) {
                    if (rawValue == value.displayValue) {
                        rawValue = value.value;
                    }
                });
            }
            return rawValue;
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
        Object.defineProperty(CalculationData.prototype, "valueConverter", {
            get: function () {
                return this._valueConverter;
            },
            set: function (valueConverterInjection) {
                this._valueConverter = valueConverterInjection;
            },
            enumerable: true,
            configurable: true
        });
        CalculationData.prototype.getValueFromRawValue = function (rawValue) {
            if (this.valueConverter != undefined) {
                return this.valueConverter.getValueFromRawValue(rawValue);
            }
            return rawValue;
        };
        return CalculationData;
    }());
    exports.CalculationData = CalculationData;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsY3VsYXRpb25EYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdGlvbkRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBZUE7UUFhSSx5QkFBWSxJQUFZLEVBQUUsS0FBYSxFQUFFLElBQW1DLEVBQUUsV0FBdUIsRUFBRSxXQUE2RDtZQUF0Riw0QkFBQSxFQUFBLGdCQUF1QjtZQUFFLDRCQUFBLEVBQUEsdUJBQTZEO1lBRjVKLFVBQUssR0FBMkIsdUJBQVUsQ0FBQyxVQUFVLENBQUM7WUFHMUQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDbEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDcEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDbEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7WUFDL0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLEtBQUssRUFBVSxDQUFDO1lBRXJDLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1lBQy9CLElBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSyxTQUFTLEVBQUM7Z0JBQzlCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7YUFDekM7UUFDTCxDQUFDO1FBRUQsZ0NBQU0sR0FBTixVQUFPLElBQVM7WUFDWixJQUFJLFNBQVMsR0FBRyxJQUFJLGVBQWUsQ0FBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hELE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFFRCxzQkFBSSxrQ0FBSztpQkFBVDtnQkFDSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDdkIsQ0FBQztpQkFFRCxVQUFVLEtBQWE7Z0JBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLENBQUM7OztXQUpBO1FBTUQsc0JBQUksaUNBQUk7aUJBQVI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3RCLENBQUM7aUJBRUQsVUFBUyxLQUE2QjtnQkFDbEMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDdkIsQ0FBQzs7O1dBSkE7UUFNRCx3Q0FBYyxHQUFkO1lBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RCLENBQUM7UUFHRDs7Ozs7OztXQU9HO1FBQ0kseUNBQWUsR0FBdEIsVUFBdUIsUUFBZ0I7WUFDbkMsSUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDO1lBQ3hCLElBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxTQUFTLEVBQUM7Z0JBQ3hCLHNFQUFzRTtnQkFDdEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLO29CQUNyQixJQUFHLFFBQVEsSUFBSSxLQUFLLENBQUMsS0FBSyxFQUFDO3dCQUN2QixRQUFRLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQztxQkFDakM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7YUFDTjtpQkFDSSxJQUFHLElBQUksQ0FBQyxjQUFjLElBQUksU0FBUyxFQUFDO2dCQUNyQyxRQUFRLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ2xEO1lBQ0QsT0FBTyxRQUFRLENBQUM7UUFDcEIsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSSxtREFBeUIsR0FBaEMsVUFBaUMsS0FBYTtZQUMxQyxJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDckIsSUFBRyxJQUFJLENBQUMsTUFBTSxJQUFJLFNBQVMsRUFBQztnQkFDeEIsMkVBQTJFO2dCQUMzRSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUs7b0JBQ3JCLElBQUcsUUFBUSxJQUFJLEtBQUssQ0FBQyxZQUFZLEVBQUM7d0JBQzlCLFFBQVEsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO3FCQUMxQjtnQkFDTCxDQUFDLENBQUMsQ0FBQzthQUNOO1lBQ0QsT0FBTyxRQUFRLENBQUM7UUFDcEIsQ0FBQztRQUVELHFDQUFXLEdBQVg7WUFDSSxPQUFPLEVBQUUsQ0FBQztRQUNkLENBQUM7UUFFRCxpQ0FBTyxHQUFQO1lBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RCLENBQUM7UUFFRCxpQ0FBTyxHQUFQLFVBQVEsSUFBbUM7WUFDdkMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDdEIsQ0FBQztRQUVELHNCQUFJLDJDQUFjO2lCQUlsQjtnQkFDSSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7WUFDaEMsQ0FBQztpQkFORCxVQUFtQix1QkFBa0Q7Z0JBQ2pFLElBQUksQ0FBQyxlQUFlLEdBQUcsdUJBQXVCLENBQUM7WUFDbkQsQ0FBQzs7O1dBQUE7UUFNTyw4Q0FBb0IsR0FBNUIsVUFBNkIsUUFBZTtZQUN4QyxJQUFHLElBQUksQ0FBQyxjQUFjLElBQUksU0FBUyxFQUFDO2dCQUNoQyxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDN0Q7WUFDRCxPQUFPLFFBQVEsQ0FBQztRQUNwQixDQUFDO1FBQ0wsc0JBQUM7SUFBRCxDQUFDLEFBM0hELElBMkhDO0lBM0hZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUNhbGN1bGF0aW9uRGF0YSB9IGZyb20gXCIuL2ludGVyZmFjZXMvY2FsY3VsYXRpb25EYXRhSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElQb2ludCB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3BvaW50SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvIH0gZnJvbSBcIi4vY2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm9cIjtcclxuaW1wb3J0IHsgSVZhbHVlTGlzdEl0ZW0gfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2ludGVyZmFjZXMvdmFsdWVMaXN0SXRlbUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTZXJpZXNUeXBlIH0gZnJvbSBcIi4uLy4uL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9zZXJpZXNUeXBlXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YU51bWJlciB9IGZyb20gXCIuL2NhbGN1bGF0aW9uRGF0YU51bWJlclwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cyB9IGZyb20gXCIuL2NhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YVBvaW50cyB9IGZyb20gXCIuL2NhbGN1bGF0aW9uRGF0YVBvaW50c1wiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFTdHJpbmcgfSBmcm9tIFwiLi9jYWxjdWxhdGlvbkRhdGFTdHJpbmdcIjtcclxuaW1wb3J0IHsgSVZhbHVlQ29udmVydGVyIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy92YWx1ZUNvbnZlcnRlckludGVyZmFjZVwiO1xyXG5cclxuXHJcbi8vIGRlY2xhcmVzIGEgZGF0YSB0eXBlIGRlZmluaXRpb25cclxuZXhwb3J0IHR5cGUgVENhbGN1bGF0aW9uRGF0YSA9IENhbGN1bGF0aW9uRGF0YU51bWJlcnxDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50c3xDYWxjdWxhdGlvbkRhdGFQb2ludHN8Q2FsY3VsYXRpb25EYXRhU3RyaW5nO1xyXG5cclxuZXhwb3J0IGNsYXNzIENhbGN1bGF0aW9uRGF0YSBpbXBsZW1lbnRzIElDYWxjdWxhdGlvbkRhdGF7XHJcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gICAgdmFsdWVzOiBBcnJheTxJVmFsdWVMaXN0SXRlbT58dW5kZWZpbmVkO1xyXG4gICAgZGlzcGxheUluZm86IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvfHVuZGVmaW5lZDtcclxuICAgIGVycm9ySW5mbzogQXJyYXk8c3RyaW5nPjtcclxuXHJcbiAgICBwcml2YXRlIF92YWx1ZUNvbnZlcnRlcjogSVZhbHVlQ29udmVydGVyfHVuZGVmaW5lZDtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfbmFtZTogc3RyaW5nXHJcbiAgICBwcml2YXRlIF92YWx1ZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfZGF0YTogbnVtYmVyfCBzdHJpbmd8IEFycmF5PElQb2ludD47XHJcbiAgICBwcml2YXRlIF90eXBlOiBTZXJpZXNUeXBlIHwgdW5kZWZpbmVkID0gU2VyaWVzVHlwZS50aW1lU2VyaWVzO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZywgZGF0YTogbnVtYmVyfCBzdHJpbmd8IEFycmF5PElQb2ludD4sIGRlc2NyaXB0aW9uOnN0cmluZyA9IFwiXCIsIGRpc3BsYXlJbmZvOiBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mb3x1bmRlZmluZWQgPSB1bmRlZmluZWQpe1xyXG4gICAgICAgIHRoaXMuX25hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xyXG4gICAgICAgIHRoaXMuZXJyb3JJbmZvID0gbmV3IEFycmF5PHN0cmluZz4oKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmRpc3BsYXlJbmZvID0gZGlzcGxheUluZm87XHJcbiAgICAgICAgaWYodGhpcy5kaXNwbGF5SW5mbyAgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZXMgPSB0aGlzLmRpc3BsYXlJbmZvLnZhbHVlcztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlKGRhdGE6IGFueSk6IENhbGN1bGF0aW9uRGF0YXtcclxuICAgICAgICBsZXQgbmV3T2JqZWN0ID0gbmV3IENhbGN1bGF0aW9uRGF0YShcIlwiLFwiXCIsZGF0YSk7XHJcbiAgICAgICAgcmV0dXJuIG5ld09iamVjdDsgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHZhbHVlKCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHZhbHVlKHZhbHVlOiBzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHR5cGUoKTogU2VyaWVzVHlwZSB8IHVuZGVmaW5lZHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdHlwZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgdHlwZSh2YWx1ZTogU2VyaWVzVHlwZSB8IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgdGhpcy5fdHlwZSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldERpc3BsYXlOYW1lKCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIGRpc3BsYXl2YWx1ZSB0byByYXd2YWx1ZSBpZiBhbiB2YWx1ZSBsaXN0IGV4aXN0cy5cclxuICAgICAqIEdldHMgY29udmVyZXJ0ZWQgc3RyaW5nIGlmIHZhbHVlIGNvbnZlcnRlciBleGlzdHMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5ld1ZhbHVlXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0aW9uRGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0RGlzcGxheVZhbHVlKG5ld1ZhbHVlOiBzdHJpbmcpOiBzdHJpbmd7XHJcbiAgICAgICAgbGV0IHJldFZhbHVlID0gbmV3VmFsdWU7XHJcbiAgICAgICAgaWYodGhpcy52YWx1ZXMgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gUmV0dXJuIGRpc3BsYXlWYWx1ZSBpbnN0ZWFkIG9mIGlkIGlmIGZvdW5kIGluIGF2YWlsYWJsZSB2YWx1ZXMgbGlzdFxyXG4gICAgICAgICAgICB0aGlzLnZhbHVlcy5mb3JFYWNoKHZhbHVlID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKG5ld1ZhbHVlID09IHZhbHVlLnZhbHVlKXtcclxuICAgICAgICAgICAgICAgICAgICByZXRWYWx1ZSA9IHZhbHVlLmRpc3BsYXlWYWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy52YWx1ZUNvbnZlcnRlciAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXRWYWx1ZSA9IHRoaXMuZ2V0VmFsdWVGcm9tUmF3VmFsdWUobmV3VmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmV0VmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHJhd3ZhbHVlIHRvIGRpc3BsYXl2YWx1ZSBpZiBhbiB2YWx1ZSBsaXN0IGV4aXN0cy5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0aW9uRGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0UmF3VmFsdWVUb0Rpc3BsYXlWYWx1ZSh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgcmF3VmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICBpZih0aGlzLnZhbHVlcyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAvLyBTZXQgcmF3IHZhbHVlIGluc3RlYWQgb2YgZGlzcGxheSB2YWx1ZSBpZiBmb3VuZCBpbiBhdmFpbGFibGUgdmFsdWVzIGxpc3RcclxuICAgICAgICAgICAgdGhpcy52YWx1ZXMuZm9yRWFjaCh2YWx1ZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihyYXdWYWx1ZSA9PSB2YWx1ZS5kaXNwbGF5VmFsdWUpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJhd1ZhbHVlID0gdmFsdWUudmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmF3VmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SWNvblBhdGgoKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXREYXRhKCk6IG51bWJlcnwgc3RyaW5nfCBBcnJheTxJUG9pbnQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBzZXREYXRhKGRhdGE6IG51bWJlcnwgc3RyaW5nfCBBcnJheTxJUG9pbnQ+KSB7XHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IGRhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHZhbHVlQ29udmVydGVyKHZhbHVlQ29udmVydGVySW5qZWN0aW9uOiBJVmFsdWVDb252ZXJ0ZXJ8dW5kZWZpbmVkKXtcclxuICAgICAgICB0aGlzLl92YWx1ZUNvbnZlcnRlciA9IHZhbHVlQ29udmVydGVySW5qZWN0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB2YWx1ZUNvbnZlcnRlcigpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZUNvbnZlcnRlcjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFZhbHVlRnJvbVJhd1ZhbHVlKHJhd1ZhbHVlOnN0cmluZyk6IHN0cmluZ3tcclxuICAgICAgICBpZih0aGlzLnZhbHVlQ29udmVydGVyICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlQ29udmVydGVyLmdldFZhbHVlRnJvbVJhd1ZhbHVlKHJhd1ZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJhd1ZhbHVlO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==