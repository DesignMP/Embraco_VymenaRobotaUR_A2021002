define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CalculationDataInfo = /** @class */ (function () {
        function CalculationDataInfo(inputData, type) {
            this.inputSeries = [];
            this._inputData = inputData;
            this._type = type;
        }
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
        return CalculationDataInfo;
    }());
    exports.CalculationDataInfo = CalculationDataInfo;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsY3VsYXRpb25EYXRhSW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRpb25EYXRhSW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFLQTtRQU1JLDZCQUFZLFNBQXVDLEVBQUUsSUFBWTtZQUoxRCxnQkFBVyxHQUFzQixFQUFFLENBQUM7WUFLdkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7WUFDNUIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDdEIsQ0FBQztRQUVELHNCQUFJLHFDQUFJO2lCQUFSO2dCQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztZQUN0QixDQUFDO2lCQUVELFVBQVMsSUFBWTtnQkFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDdEIsQ0FBQzs7O1dBSkE7UUFNRCxzQkFBSSwwQ0FBUztpQkFBYjtnQkFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDM0IsQ0FBQztpQkFFRCxVQUFjLFNBQXVDO2dCQUNqRCxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztZQUNoQyxDQUFDOzs7V0FKQTtRQUtMLDBCQUFDO0lBQUQsQ0FBQyxBQTFCRCxJQTBCQztJQTFCWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFQb2ludHMgfSBmcm9tIFwiLi9jYWxjdWxhdGlvbkRhdGFQb2ludHNcIjtcclxuaW1wb3J0IHsgQmFzZVNlcmllcyB9IGZyb20gXCIuLi8uLi9jaGFydE1hbmFnZXJEYXRhTW9kZWwvYmFzZVNlcmllc1wiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFOdW1iZXIgfSBmcm9tIFwiLi9jYWxjdWxhdGlvbkRhdGFOdW1iZXJcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHMgfSBmcm9tIFwiLi9jYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50c1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENhbGN1bGF0aW9uRGF0YUluZm97XHJcblxyXG4gICAgcHVibGljIGlucHV0U2VyaWVzOiBBcnJheTxCYXNlU2VyaWVzPiA9IFtdO1xyXG4gICAgcHJpdmF0ZSBfdHlwZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfaW5wdXREYXRhOiBBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGlucHV0RGF0YTogQXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPiwgdHlwZTogc3RyaW5nKXtcclxuICAgICAgICB0aGlzLl9pbnB1dERhdGEgPSBpbnB1dERhdGE7XHJcbiAgICAgICAgdGhpcy5fdHlwZSA9IHR5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHR5cGUoKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90eXBlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCB0eXBlKHR5cGU6IHN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5fdHlwZSA9IHR5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGlucHV0RGF0YSgpOiBBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+e1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnB1dERhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGlucHV0RGF0YShpbnB1dERhdGE6IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz4pe1xyXG4gICAgICAgIHRoaXMuX2lucHV0RGF0YSA9IGlucHV0RGF0YTtcclxuICAgIH1cclxufVxyXG4iXX0=