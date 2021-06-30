define(["require", "exports", "../../chartManagerDataModel/seriesType"], function (require, exports, seriesType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CalculationData = /** @class */ (function () {
        /**
         * Creates an instance of CalculationData
         * @param {string} id the id of the calculation data
         * @param {string} name the displayname of the calculation data
         * @param {string} value the displayValue of this calculation data
         * @param {(number| string| Array<IPoint>)} data the data(e.g. datapoints) of this calculation data
         * @param {string} [description=""]
         * @param {(CalculationDataDisplayInfo|undefined)} [displayInfo=undefined]
         * @memberof CalculationData
         */
        function CalculationData(id, name, value, data, description, displayInfo) {
            if (description === void 0) { description = ""; }
            if (displayInfo === void 0) { displayInfo = undefined; }
            this._type = seriesType_1.SeriesType.timeSeries;
            this.id = id;
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
            var newObject = new CalculationData("", "", "", data);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsY3VsYXRpb25EYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdGlvbkRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBZUE7UUFjSTs7Ozs7Ozs7O1dBU0c7UUFDSCx5QkFBWSxFQUFVLEVBQUUsSUFBWSxFQUFFLEtBQWEsRUFBRSxJQUFtQyxFQUFFLFdBQXVCLEVBQUUsV0FBNkQ7WUFBdEYsNEJBQUEsRUFBQSxnQkFBdUI7WUFBRSw0QkFBQSxFQUFBLHVCQUE2RDtZQVp4SyxVQUFLLEdBQTJCLHVCQUFVLENBQUMsVUFBVSxDQUFDO1lBYTFELElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1lBQ2IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDbEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDcEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDbEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7WUFDL0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLEtBQUssRUFBVSxDQUFDO1lBRXJDLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1lBQy9CLElBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSyxTQUFTLEVBQUM7Z0JBQzlCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7YUFDekM7UUFDTCxDQUFDO1FBRUQsZ0NBQU0sR0FBTixVQUFPLElBQVM7WUFDWixJQUFJLFNBQVMsR0FBRyxJQUFJLGVBQWUsQ0FBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxJQUFJLENBQUMsQ0FBQztZQUNuRCxPQUFPLFNBQVMsQ0FBQztRQUNyQixDQUFDO1FBRUQsc0JBQUksa0NBQUs7aUJBQVQ7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ3ZCLENBQUM7aUJBRUQsVUFBVSxLQUFhO2dCQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUN4QixDQUFDOzs7V0FKQTtRQU1ELHNCQUFJLGlDQUFJO2lCQUFSO2dCQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztZQUN0QixDQUFDO2lCQUVELFVBQVMsS0FBNkI7Z0JBQ2xDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLENBQUM7OztXQUpBO1FBTUQsd0NBQWMsR0FBZDtZQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN0QixDQUFDO1FBR0Q7Ozs7Ozs7V0FPRztRQUNJLHlDQUFlLEdBQXRCLFVBQXVCLFFBQWdCO1lBQ25DLElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQztZQUN4QixJQUFHLElBQUksQ0FBQyxNQUFNLElBQUksU0FBUyxFQUFDO2dCQUN4QixzRUFBc0U7Z0JBQ3RFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSztvQkFDckIsSUFBRyxRQUFRLElBQUksS0FBSyxDQUFDLEtBQUssRUFBQzt3QkFDdkIsUUFBUSxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUM7cUJBQ2pDO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2FBQ047aUJBQ0ksSUFBRyxJQUFJLENBQUMsY0FBYyxJQUFJLFNBQVMsRUFBQztnQkFDckMsUUFBUSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNsRDtZQUNELE9BQU8sUUFBUSxDQUFDO1FBQ3BCLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0ksbURBQXlCLEdBQWhDLFVBQWlDLEtBQWE7WUFDMUMsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLElBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxTQUFTLEVBQUM7Z0JBQ3hCLDJFQUEyRTtnQkFDM0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLO29CQUNyQixJQUFHLFFBQVEsSUFBSSxLQUFLLENBQUMsWUFBWSxFQUFDO3dCQUM5QixRQUFRLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztxQkFDMUI7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7YUFDTjtZQUNELE9BQU8sUUFBUSxDQUFDO1FBQ3BCLENBQUM7UUFFRCxxQ0FBVyxHQUFYO1lBQ0ksT0FBTyxFQUFFLENBQUM7UUFDZCxDQUFDO1FBRUQsaUNBQU8sR0FBUDtZQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN0QixDQUFDO1FBRUQsaUNBQU8sR0FBUCxVQUFRLElBQW1DO1lBQ3ZDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLENBQUM7UUFFRCxzQkFBSSwyQ0FBYztpQkFJbEI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO1lBQ2hDLENBQUM7aUJBTkQsVUFBbUIsdUJBQWtEO2dCQUNqRSxJQUFJLENBQUMsZUFBZSxHQUFHLHVCQUF1QixDQUFDO1lBQ25ELENBQUM7OztXQUFBO1FBTU8sOENBQW9CLEdBQTVCLFVBQTZCLFFBQWU7WUFDeEMsSUFBRyxJQUFJLENBQUMsY0FBYyxJQUFJLFNBQVMsRUFBQztnQkFDaEMsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzdEO1lBQ0QsT0FBTyxRQUFRLENBQUM7UUFDcEIsQ0FBQztRQUNMLHNCQUFDO0lBQUQsQ0FBQyxBQXZJRCxJQXVJQztJQXZJWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDYWxjdWxhdGlvbkRhdGEgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL2NhbGN1bGF0aW9uRGF0YUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9wb2ludEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mbyB9IGZyb20gXCIuL2NhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvXCI7XHJcbmltcG9ydCB7IElWYWx1ZUxpc3RJdGVtIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9pbnRlcmZhY2VzL3ZhbHVlTGlzdEl0ZW1JbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU2VyaWVzVHlwZSB9IGZyb20gXCIuLi8uLi9jaGFydE1hbmFnZXJEYXRhTW9kZWwvc2VyaWVzVHlwZVwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFOdW1iZXIgfSBmcm9tIFwiLi9jYWxjdWxhdGlvbkRhdGFOdW1iZXJcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHMgfSBmcm9tIFwiLi9jYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50c1wiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFQb2ludHMgfSBmcm9tIFwiLi9jYWxjdWxhdGlvbkRhdGFQb2ludHNcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhU3RyaW5nIH0gZnJvbSBcIi4vY2FsY3VsYXRpb25EYXRhU3RyaW5nXCI7XHJcbmltcG9ydCB7IElWYWx1ZUNvbnZlcnRlciB9IGZyb20gXCIuL2ludGVyZmFjZXMvdmFsdWVDb252ZXJ0ZXJJbnRlcmZhY2VcIjtcclxuXHJcblxyXG4vLyBkZWNsYXJlcyBhIGRhdGEgdHlwZSBkZWZpbml0aW9uXHJcbmV4cG9ydCB0eXBlIFRDYWxjdWxhdGlvbkRhdGEgPSBDYWxjdWxhdGlvbkRhdGFOdW1iZXJ8Q2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHN8Q2FsY3VsYXRpb25EYXRhUG9pbnRzfENhbGN1bGF0aW9uRGF0YVN0cmluZztcclxuXHJcbmV4cG9ydCBjbGFzcyBDYWxjdWxhdGlvbkRhdGEgaW1wbGVtZW50cyBJQ2FsY3VsYXRpb25EYXRhe1xyXG4gICAgaWQ6IHN0cmluZztcclxuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgICB2YWx1ZXM6IEFycmF5PElWYWx1ZUxpc3RJdGVtPnx1bmRlZmluZWQ7XHJcbiAgICBkaXNwbGF5SW5mbzogQ2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm98dW5kZWZpbmVkO1xyXG4gICAgZXJyb3JJbmZvOiBBcnJheTxzdHJpbmc+O1xyXG5cclxuICAgIHByaXZhdGUgX3ZhbHVlQ29udmVydGVyOiBJVmFsdWVDb252ZXJ0ZXJ8dW5kZWZpbmVkO1xyXG4gICAgXHJcbiAgICBwcml2YXRlIF9uYW1lOiBzdHJpbmdcclxuICAgIHByaXZhdGUgX3ZhbHVlOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF9kYXRhOiBudW1iZXJ8IHN0cmluZ3wgQXJyYXk8SVBvaW50PjtcclxuICAgIHByaXZhdGUgX3R5cGU6IFNlcmllc1R5cGUgfCB1bmRlZmluZWQgPSBTZXJpZXNUeXBlLnRpbWVTZXJpZXM7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIENhbGN1bGF0aW9uRGF0YVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkIHRoZSBpZCBvZiB0aGUgY2FsY3VsYXRpb24gZGF0YVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgdGhlIGRpc3BsYXluYW1lIG9mIHRoZSBjYWxjdWxhdGlvbiBkYXRhXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgdGhlIGRpc3BsYXlWYWx1ZSBvZiB0aGlzIGNhbGN1bGF0aW9uIGRhdGFcclxuICAgICAqIEBwYXJhbSB7KG51bWJlcnwgc3RyaW5nfCBBcnJheTxJUG9pbnQ+KX0gZGF0YSB0aGUgZGF0YShlLmcuIGRhdGFwb2ludHMpIG9mIHRoaXMgY2FsY3VsYXRpb24gZGF0YVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtkZXNjcmlwdGlvbj1cIlwiXVxyXG4gICAgICogQHBhcmFtIHsoQ2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm98dW5kZWZpbmVkKX0gW2Rpc3BsYXlJbmZvPXVuZGVmaW5lZF1cclxuICAgICAqIEBtZW1iZXJvZiBDYWxjdWxhdGlvbkRhdGFcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoaWQ6IHN0cmluZywgbmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBkYXRhOiBudW1iZXJ8IHN0cmluZ3wgQXJyYXk8SVBvaW50PiwgZGVzY3JpcHRpb246c3RyaW5nID0gXCJcIiwgZGlzcGxheUluZm86IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvfHVuZGVmaW5lZCA9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgICAgIHRoaXMuX25hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xyXG4gICAgICAgIHRoaXMuZXJyb3JJbmZvID0gbmV3IEFycmF5PHN0cmluZz4oKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmRpc3BsYXlJbmZvID0gZGlzcGxheUluZm87XHJcbiAgICAgICAgaWYodGhpcy5kaXNwbGF5SW5mbyAgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZXMgPSB0aGlzLmRpc3BsYXlJbmZvLnZhbHVlcztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlKGRhdGE6IGFueSk6IENhbGN1bGF0aW9uRGF0YXtcclxuICAgICAgICBsZXQgbmV3T2JqZWN0ID0gbmV3IENhbGN1bGF0aW9uRGF0YShcIlwiLFwiXCIsXCJcIixkYXRhKTtcclxuICAgICAgICByZXR1cm4gbmV3T2JqZWN0OyBcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdmFsdWUoKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgdmFsdWUodmFsdWU6IHN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdHlwZSgpOiBTZXJpZXNUeXBlIHwgdW5kZWZpbmVke1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90eXBlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCB0eXBlKHZhbHVlOiBTZXJpZXNUeXBlIHwgdW5kZWZpbmVkKXtcclxuICAgICAgICB0aGlzLl90eXBlID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RGlzcGxheU5hbWUoKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgZGlzcGxheXZhbHVlIHRvIHJhd3ZhbHVlIGlmIGFuIHZhbHVlIGxpc3QgZXhpc3RzLlxyXG4gICAgICogR2V0cyBjb252ZXJlcnRlZCBzdHJpbmcgaWYgdmFsdWUgY29udmVydGVyIGV4aXN0cy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmV3VmFsdWVcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRpb25EYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXREaXNwbGF5VmFsdWUobmV3VmFsdWU6IHN0cmluZyk6IHN0cmluZ3tcclxuICAgICAgICBsZXQgcmV0VmFsdWUgPSBuZXdWYWx1ZTtcclxuICAgICAgICBpZih0aGlzLnZhbHVlcyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAvLyBSZXR1cm4gZGlzcGxheVZhbHVlIGluc3RlYWQgb2YgaWQgaWYgZm91bmQgaW4gYXZhaWxhYmxlIHZhbHVlcyBsaXN0XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWVzLmZvckVhY2godmFsdWUgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYobmV3VmFsdWUgPT0gdmFsdWUudmFsdWUpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldFZhbHVlID0gdmFsdWUuZGlzcGxheVZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLnZhbHVlQ29udmVydGVyICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldFZhbHVlID0gdGhpcy5nZXRWYWx1ZUZyb21SYXdWYWx1ZShuZXdWYWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXRWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgcmF3dmFsdWUgdG8gZGlzcGxheXZhbHVlIGlmIGFuIHZhbHVlIGxpc3QgZXhpc3RzLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRpb25EYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRSYXdWYWx1ZVRvRGlzcGxheVZhbHVlKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCByYXdWYWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIGlmKHRoaXMudmFsdWVzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIFNldCByYXcgdmFsdWUgaW5zdGVhZCBvZiBkaXNwbGF5IHZhbHVlIGlmIGZvdW5kIGluIGF2YWlsYWJsZSB2YWx1ZXMgbGlzdFxyXG4gICAgICAgICAgICB0aGlzLnZhbHVlcy5mb3JFYWNoKHZhbHVlID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKHJhd1ZhbHVlID09IHZhbHVlLmRpc3BsYXlWYWx1ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmF3VmFsdWUgPSB2YWx1ZS52YWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByYXdWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRJY29uUGF0aCgpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldERhdGEoKTogbnVtYmVyfCBzdHJpbmd8IEFycmF5PElQb2ludD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHNldERhdGEoZGF0YTogbnVtYmVyfCBzdHJpbmd8IEFycmF5PElQb2ludD4pIHtcclxuICAgICAgICB0aGlzLl9kYXRhID0gZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgdmFsdWVDb252ZXJ0ZXIodmFsdWVDb252ZXJ0ZXJJbmplY3Rpb246IElWYWx1ZUNvbnZlcnRlcnx1bmRlZmluZWQpe1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlQ29udmVydGVyID0gdmFsdWVDb252ZXJ0ZXJJbmplY3Rpb247XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHZhbHVlQ29udmVydGVyKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlQ29udmVydGVyO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0VmFsdWVGcm9tUmF3VmFsdWUocmF3VmFsdWU6c3RyaW5nKTogc3RyaW5ne1xyXG4gICAgICAgIGlmKHRoaXMudmFsdWVDb252ZXJ0ZXIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVDb252ZXJ0ZXIuZ2V0VmFsdWVGcm9tUmF3VmFsdWUocmF3VmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmF3VmFsdWU7XHJcbiAgICB9XHJcbn1cclxuIl19