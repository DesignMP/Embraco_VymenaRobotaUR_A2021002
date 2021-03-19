define(["require", "exports", "../../../common/persistence/settings", "./calculationDataInfoSettingIds"], function (require, exports, settings_1, calculationDataInfoSettingIds_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CalculationDataInfo = /** @class */ (function () {
        function CalculationDataInfo(uniqueId) {
            if (uniqueId === void 0) { uniqueId = ""; }
            this.inputSeriesIds = [];
            this._uniqueId = uniqueId;
            this._inputData = [];
            this._inputDataValues = [];
            this._type = "";
        }
        Object.defineProperty(CalculationDataInfo.prototype, "uniqueId", {
            get: function () {
                return this._uniqueId;
            },
            enumerable: true,
            configurable: true
        });
        CalculationDataInfo.prototype.getSettings = function () {
            var settings = new settings_1.Settings("CalculationDataInfo");
            settings.setValue(calculationDataInfoSettingIds_1.SettingIds.Type, this.type);
            settings.setValue(calculationDataInfoSettingIds_1.SettingIds.InputDataValues, this.inputDataValues);
            settings.setValue(calculationDataInfoSettingIds_1.SettingIds.UniqueId, this.uniqueId);
            return settings;
        };
        CalculationDataInfo.prototype.setSettings = function (settings) {
            var settingsObj = settings_1.Settings.create(settings);
            this.type = settingsObj.getValue(calculationDataInfoSettingIds_1.SettingIds.Type);
            this.inputDataValues = settingsObj.getValue(calculationDataInfoSettingIds_1.SettingIds.InputDataValues);
            this._uniqueId = settingsObj.getValue(calculationDataInfoSettingIds_1.SettingIds.UniqueId);
        };
        Object.defineProperty(CalculationDataInfo.prototype, "type", {
            get: function () {
                return this._type;
            },
            set: function (type) {
                this._type = type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CalculationDataInfo.prototype, "inputData", {
            get: function () {
                return this._inputData;
            },
            set: function (inputData) {
                this._inputData = inputData;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CalculationDataInfo.prototype, "inputDataValues", {
            get: function () {
                return this._inputDataValues;
            },
            set: function (value) {
                this._inputDataValues = value;
            },
            enumerable: true,
            configurable: true
        });
        return CalculationDataInfo;
    }());
    exports.CalculationDataInfo = CalculationDataInfo;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsY3VsYXRpb25EYXRhSW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRpb25EYXRhSW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFNQTtRQXFDSSw2QkFBWSxRQUFtQjtZQUFuQix5QkFBQSxFQUFBLGFBQW1CO1lBN0J4QixtQkFBYyxHQUE0QixFQUFFLENBQUM7WUE4QmhELElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1lBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDcEIsQ0FBQztRQXRDRCxzQkFBVyx5Q0FBUTtpQkFBbkI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQzFCLENBQUM7OztXQUFBO1FBc0NELHlDQUFXLEdBQVg7WUFDSSxJQUFJLFFBQVEsR0FBRyxJQUFJLG1CQUFRLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUNuRCxRQUFRLENBQUMsUUFBUSxDQUFDLDBDQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QyxRQUFRLENBQUMsUUFBUSxDQUFDLDBDQUFVLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUNwRSxRQUFRLENBQUMsUUFBUSxDQUFDLDBDQUFVLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN0RCxPQUFPLFFBQVEsQ0FBQztRQUNwQixDQUFDO1FBRUQseUNBQVcsR0FBWCxVQUFZLFFBQW1CO1lBQzNCLElBQUksV0FBVyxHQUFHLG1CQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQywwQ0FBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xELElBQUksQ0FBQyxlQUFlLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQywwQ0FBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ3hFLElBQUksQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQywwQ0FBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9ELENBQUM7UUFFRCxzQkFBSSxxQ0FBSTtpQkFBUjtnQkFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDdEIsQ0FBQztpQkFFRCxVQUFTLElBQVk7Z0JBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLENBQUM7OztXQUpBO1FBTUQsc0JBQUksMENBQVM7aUJBQWI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQzNCLENBQUM7aUJBRUQsVUFBYyxTQUF1QztnQkFDakQsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7WUFDaEMsQ0FBQzs7O1dBSkE7UUFNRCxzQkFBSSxnREFBZTtpQkFBbkI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7WUFDakMsQ0FBQztpQkFDRCxVQUFvQixLQUFvQjtnQkFDcEMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztZQUNsQyxDQUFDOzs7V0FIQTtRQUlMLDBCQUFDO0lBQUQsQ0FBQyxBQWpGRCxJQWlGQztJQWpGWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFQb2ludHMgfSBmcm9tIFwiLi9jYWxjdWxhdGlvbkRhdGFQb2ludHNcIjtcclxuaW1wb3J0IHsgSVNldHRpbmdzT2JqZWN0IH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9pbnRlcmZhY2VzL3NldHRpbmdzT2JqZWN0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBJU2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BlcnNpc3RlbmNlL2ludGVyZmFjZXMvc2V0dGluZ3NJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU2V0dGluZ0lkcyB9IGZyb20gXCIuL2NhbGN1bGF0aW9uRGF0YUluZm9TZXR0aW5nSWRzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2FsY3VsYXRpb25EYXRhSW5mbyBpbXBsZW1lbnRzIElTZXR0aW5nc09iamVjdHtcclxuXHJcbiAgICBwcml2YXRlIF91bmlxdWVJZDogc3RyaW5nO1xyXG4gICAgXHJcbiAgICBwdWJsaWMgZ2V0IHVuaXF1ZUlkKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VuaXF1ZUlkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbnB1dFNlcmllc0lkczogQXJyYXk8c3RyaW5nfHVuZGVmaW5lZD4gPSBbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0b3IgdHlwZSBpZChlLmcuIGFkZCwgY29zLCAuLi4pXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRpb25EYXRhSW5mb1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF90eXBlOiBzdHJpbmc7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmVhbGx5IHVzZWQgaW5wdXQgZGF0YSBvZiB0aGUgaW5wdXQgc2lnbmFsIChjb3VsZCBiZSBvbmx5IGEgcGFydCBvZiB0aGUgb3JpZ2luYWwgc2lnbmFsIGRhdGEpXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEB0eXBlIHtBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+fVxyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0aW9uRGF0YUluZm9cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfaW5wdXREYXRhOiBBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5wdXQgZGF0YSB2YWx1ZSAob25seSB0aGUgbmFtZXMgb2YgdGhlIGlucHV0IGRhdGE7IGUuZy4gc2lnbmFsbmFtZSwgZmlsdGVyIG9yZGVyIG51bWJlciwgLi4uKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAdHlwZSB7QXJyYXk8c3RyaW5nPn1cclxuICAgICAqIEBtZW1iZXJvZiBDYWxjdWxhdGlvbkRhdGFJbmZvXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2lucHV0RGF0YVZhbHVlczogQXJyYXk8c3RyaW5nPjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih1bmlxdWVJZDogc3RyaW5nPVwiXCIpe1xyXG4gICAgICAgIHRoaXMuX3VuaXF1ZUlkID0gdW5pcXVlSWQ7XHJcbiAgICAgICAgdGhpcy5faW5wdXREYXRhID0gW107XHJcbiAgICAgICAgdGhpcy5faW5wdXREYXRhVmFsdWVzID0gW107XHJcbiAgICAgICAgdGhpcy5fdHlwZSA9IFwiXCI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldFNldHRpbmdzKCk6IElTZXR0aW5ncyB7XHJcbiAgICAgICAgbGV0IHNldHRpbmdzID0gbmV3IFNldHRpbmdzKFwiQ2FsY3VsYXRpb25EYXRhSW5mb1wiKTtcclxuICAgICAgICBzZXR0aW5ncy5zZXRWYWx1ZShTZXR0aW5nSWRzLlR5cGUsIHRoaXMudHlwZSk7XHJcbiAgICAgICAgc2V0dGluZ3Muc2V0VmFsdWUoU2V0dGluZ0lkcy5JbnB1dERhdGFWYWx1ZXMsIHRoaXMuaW5wdXREYXRhVmFsdWVzKTtcclxuICAgICAgICBzZXR0aW5ncy5zZXRWYWx1ZShTZXR0aW5nSWRzLlVuaXF1ZUlkLCB0aGlzLnVuaXF1ZUlkKTtcclxuICAgICAgICByZXR1cm4gc2V0dGluZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U2V0dGluZ3Moc2V0dGluZ3M6IElTZXR0aW5ncykge1xyXG4gICAgICAgIGxldCBzZXR0aW5nc09iaiA9IFNldHRpbmdzLmNyZWF0ZShzZXR0aW5ncyk7XHJcbiAgICAgICAgdGhpcy50eXBlID0gc2V0dGluZ3NPYmouZ2V0VmFsdWUoU2V0dGluZ0lkcy5UeXBlKTtcclxuICAgICAgICB0aGlzLmlucHV0RGF0YVZhbHVlcyA9IHNldHRpbmdzT2JqLmdldFZhbHVlKFNldHRpbmdJZHMuSW5wdXREYXRhVmFsdWVzKTtcclxuICAgICAgICB0aGlzLl91bmlxdWVJZCA9IHNldHRpbmdzT2JqLmdldFZhbHVlKFNldHRpbmdJZHMuVW5pcXVlSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB0eXBlKCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gdGhpcy5fdHlwZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgdHlwZSh0eXBlOiBzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMuX3R5cGUgPSB0eXBlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpbnB1dERhdGEoKTogQXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPntcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5wdXREYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBpbnB1dERhdGEoaW5wdXREYXRhOiBBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+KXtcclxuICAgICAgICB0aGlzLl9pbnB1dERhdGEgPSBpbnB1dERhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGlucHV0RGF0YVZhbHVlcygpOiBBcnJheTxzdHJpbmc+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5wdXREYXRhVmFsdWVzO1xyXG4gICAgfVxyXG4gICAgc2V0IGlucHV0RGF0YVZhbHVlcyh2YWx1ZTogQXJyYXk8c3RyaW5nPikge1xyXG4gICAgICAgIHRoaXMuX2lucHV0RGF0YVZhbHVlcyA9IHZhbHVlO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==