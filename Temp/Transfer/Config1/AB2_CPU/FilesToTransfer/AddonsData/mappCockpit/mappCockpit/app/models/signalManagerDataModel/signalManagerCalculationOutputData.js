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
define(["require", "exports", "../common/signal/serieNode", "./eventSignalManagerDataChangedArgs", "../common/signal/signal", "../../common/colorHelper", "../common/calculatorProvider/calculationDataNumber", "../chartManagerDataModel/YTSeries", "../chartManagerDataModel/XYSeries", "../chartManagerDataModel/FFTSeries", "../common/seriesProvider/seriesProvider", "../chartManagerDataModel/seriesType"], function (require, exports, serieNode_1, eventSignalManagerDataChangedArgs_1, signal_1, colorHelper_1, calculationDataNumber_1, YTSeries_1, XYSeries_1, FFTSeries_1, seriesProvider_1, seriesType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SignalManagerCalculationOutputData = /** @class */ (function (_super) {
        __extends(SignalManagerCalculationOutputData, _super);
        /**
         * Creates an instance of SignalManagerCalculationOutputData.
         * @param {TCalculationData} calculationData
         * @param {boolean} isInput
         * @memberof SignalManagerCalculationOutputData
         */
        function SignalManagerCalculationOutputData(calculationData) {
            var _this = _super.call(this, "", undefined) || this;
            _this.onlyValuesFromListAreAllowed = false;
            _this.dropPossible = false;
            _this.calculationData = calculationData;
            var uniqueOutputValue = _this.calculationData.value + " " + seriesProvider_1.SeriesProvider.getInstance().getUniqueCalculationId();
            //let uniqueOutputValue = this.getUniqueOutputValue(this.calculationData.value); // TODO: check for other signal names only valid if calculation is already appended to signal group
            var signal = new signal_1.Signal(uniqueOutputValue, new Array());
            if (calculationData.type === seriesType_1.SeriesType.xySeries) {
                _this.serie = new XYSeries_1.XYSeries(signal, signal.name, colorHelper_1.ColorHelper.getColor(), seriesProvider_1.SeriesProvider.getInstance());
            }
            else if (calculationData.type === seriesType_1.SeriesType.fftSeries) {
                _this.serie = new FFTSeries_1.FFTSeries(signal, signal.name, colorHelper_1.ColorHelper.getColor(), seriesProvider_1.SeriesProvider.getInstance());
            }
            else {
                _this.serie = new YTSeries_1.YTSeries(signal, signal.name, colorHelper_1.ColorHelper.getColor(), seriesProvider_1.SeriesProvider.getInstance());
            }
            _this.serie.isCalculated = true;
            _this._value = uniqueOutputValue;
            _this.canDelete = false;
            return _this;
        }
        Object.defineProperty(SignalManagerCalculationOutputData.prototype, "values", {
            get: function () {
                return undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculationOutputData.prototype, "minValue", {
            get: function () {
                return undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculationOutputData.prototype, "maxValue", {
            get: function () {
                return undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculationOutputData.prototype, "dataTypeName", {
            get: function () {
                if (this.calculationData instanceof calculationDataNumber_1.CalculationDataNumber) {
                    return "Float";
                }
                else {
                    return "String";
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculationOutputData.prototype, "parent", {
            get: function () {
                return this._parent;
            },
            set: function (value) {
                this._parent = value;
                if (this._parent != undefined && this.serie != undefined) {
                    this.serie.parent = this.getSerieGroup();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculationOutputData.prototype, "name", {
            get: function () {
                var dataModel = this.getDataModel();
                if (dataModel != undefined) {
                    if (dataModel.editModeActive == true) {
                        return this.calculationData.getDisplayName(); // Show the display name of input/output parameter in edit mode
                    }
                }
                return this.value; // Show only the value 
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculationOutputData.prototype, "description", {
            get: function () {
                return this.calculationData.description;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculationOutputData.prototype, "color", {
            get: function () {
                if (this.serie != undefined) {
                    return this.serie.color;
                }
                return "";
            },
            set: function (value) {
                if (this.serie != undefined) {
                    this.serie.color = value;
                }
                this.onDataChanged(this, new eventSignalManagerDataChangedArgs_1.EventSignalManagerDataChangedArgs(eventSignalManagerDataChangedArgs_1.SignalManagerAction.colorChanged, value));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculationOutputData.prototype, "value", {
            get: function () {
                if (this.serie != undefined) {
                    return this.serie.name;
                }
                return this._value;
            },
            set: function (value) {
                var oldValue = this._value;
                this._value = value;
                if (this.serie != undefined) {
                    this.serie.name = value;
                }
                this.onDataChanged(this, new eventSignalManagerDataChangedArgs_1.EventSignalManagerDataChangedArgs(eventSignalManagerDataChangedArgs_1.SignalManagerAction.valueChanged, value, oldValue));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculationOutputData.prototype, "nodeType", {
            get: function () {
                return serieNode_1.NodeType.calculationOutputParam;
            },
            enumerable: true,
            configurable: true
        });
        return SignalManagerCalculationOutputData;
    }(serieNode_1.SerieNode));
    exports.SignalManagerCalculationOutputData = SignalManagerCalculationOutputData;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uT3V0cHV0RGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvc2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uT3V0cHV0RGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBZ0JBO1FBQXdELHNEQUFTO1FBd0Y3RDs7Ozs7V0FLRztRQUNILDRDQUFZLGVBQWlDO1lBQTdDLFlBQ0ksa0JBQU0sRUFBRSxFQUFFLFNBQVMsQ0FBQyxTQWlCdkI7WUE5R0Qsa0NBQTRCLEdBQVksS0FBSyxDQUFDO1lBQzlDLGtCQUFZLEdBQVksS0FBSyxDQUFDO1lBNkYxQixLQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztZQUN2QyxJQUFJLGlCQUFpQixHQUFHLEtBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRywrQkFBYyxDQUFDLFdBQVcsRUFBRSxDQUFDLHNCQUFzQixFQUFFLENBQUM7WUFDakgsb0xBQW9MO1lBQ3BMLElBQUksTUFBTSxHQUFHLElBQUksZUFBTSxDQUFDLGlCQUFpQixFQUFHLElBQUksS0FBSyxFQUFVLENBQUMsQ0FBQztZQUNqRSxJQUFJLGVBQWUsQ0FBQyxJQUFJLEtBQUssdUJBQVUsQ0FBQyxRQUFRLEVBQUM7Z0JBQzdDLEtBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxtQkFBUSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLHlCQUFXLENBQUMsUUFBUSxFQUFFLEVBQUUsK0JBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO2FBQ3hHO2lCQUNJLElBQUksZUFBZSxDQUFDLElBQUksS0FBSyx1QkFBVSxDQUFDLFNBQVMsRUFBQztnQkFDbkQsS0FBSSxDQUFDLEtBQUssR0FBRyxJQUFJLHFCQUFTLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FB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aUJBQzFCO2dCQUNELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUN2QixDQUFDO2lCQUVELFVBQWlCLEtBQWE7Z0JBQzFCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2dCQUNwQixJQUFHLElBQUksQ0FBQyxLQUFLLElBQUksU0FBUyxFQUFDO29CQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7aUJBQzNCO2dCQUVELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLElBQUkscUVBQWlDLENBQUMsdURBQW1CLENBQUMsWUFBWSxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3ZILENBQUM7OztXQVZBO1FBWUQsc0JBQWMsd0RBQVE7aUJBQXRCO2dCQUNJLE9BQU8sb0JBQVEsQ0FBQyxzQkFBc0IsQ0FBQztZQUMzQyxDQUFDOzs7V0FBQTtRQTZDTCx5Q0FBQztJQUFELENBQUMsQUFuSUQsQ0FBd0QscUJBQVMsR0FtSWhFO0lBbklZLGdGQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElQb2ludCB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy9wb2ludEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTZXJpZU5vZGUsIE5vZGVUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi9zaWduYWwvc2VyaWVOb2RlXCI7XHJcbmltcG9ydCB7IFNpZ25hbE1hbmFnZXJBY3Rpb24sIEV2ZW50U2lnbmFsTWFuYWdlckRhdGFDaGFuZ2VkQXJncyB9IGZyb20gXCIuL2V2ZW50U2lnbmFsTWFuYWdlckRhdGFDaGFuZ2VkQXJnc1wiO1xyXG5pbXBvcnQgeyBTaWduYWwgfSBmcm9tIFwiLi4vY29tbW9uL3NpZ25hbC9zaWduYWxcIjtcclxuaW1wb3J0IHsgQ29sb3JIZWxwZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbG9ySGVscGVyXCI7XHJcbmltcG9ydCB7IElTZXJpZUNvbnRhaW5lciB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy9zZXJpZUNvbnRhaW5lckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFOdW1iZXIgfSBmcm9tIFwiLi4vY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdGlvbkRhdGFOdW1iZXJcIjtcclxuaW1wb3J0IHsgSUNlbGxJbmZvIH0gZnJvbSBcIi4uLy4uL3dpZGdldHMvY29tbW9uL2ludGVyZmFjZXMvY2VsbEluZm9JbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVZhbHVlTGlzdEl0ZW0gfSBmcm9tIFwiLi4vLi4vY29tbW9uL2ludGVyZmFjZXMvdmFsdWVMaXN0SXRlbUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBZVFNlcmllcyB9IGZyb20gXCIuLi9jaGFydE1hbmFnZXJEYXRhTW9kZWwvWVRTZXJpZXNcIjtcclxuaW1wb3J0IHsgWFlTZXJpZXMgfSBmcm9tIFwiLi4vY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL1hZU2VyaWVzXCI7XHJcbmltcG9ydCB7IEZGVFNlcmllcyB9IGZyb20gXCIuLi9jaGFydE1hbmFnZXJEYXRhTW9kZWwvRkZUU2VyaWVzXCI7XHJcbmltcG9ydCB7IFNlcmllc1Byb3ZpZGVyIH0gZnJvbSBcIi4uL2NvbW1vbi9zZXJpZXNQcm92aWRlci9zZXJpZXNQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBUQ2FsY3VsYXRpb25EYXRhIH0gZnJvbSBcIi4uL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRpb25EYXRhXCI7XHJcbmltcG9ydCB7IFNlcmllc1R5cGUgfSBmcm9tIFwiLi4vY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL3Nlcmllc1R5cGVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25PdXRwdXREYXRhIGV4dGVuZHMgU2VyaWVOb2RlIGltcGxlbWVudHMgSUNlbGxJbmZve1xyXG4gICAgY2FsY3VsYXRpb25EYXRhOiBUQ2FsY3VsYXRpb25EYXRhO1xyXG4gICAgb25seVZhbHVlc0Zyb21MaXN0QXJlQWxsb3dlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgZHJvcFBvc3NpYmxlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgcHJpdmF0ZSBfdmFsdWU6IHN0cmluZztcclxuXHJcbiAgICBwdWJsaWMgZ2V0IHZhbHVlcygpOiBBcnJheTxJVmFsdWVMaXN0SXRlbT58dW5kZWZpbmVkIHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgbWluVmFsdWUoKTogbnVtYmVyfHVuZGVmaW5lZHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgZ2V0IG1heFZhbHVlKCk6IG51bWJlcnx1bmRlZmluZWR7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGRhdGFUeXBlTmFtZSgpOiBzdHJpbmd7XHJcbiAgICAgICAgaWYodGhpcy5jYWxjdWxhdGlvbkRhdGEgaW5zdGFuY2VvZiBDYWxjdWxhdGlvbkRhdGFOdW1iZXIpe1xyXG4gICAgICAgICAgICByZXR1cm4gXCJGbG9hdFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gXCJTdHJpbmdcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBwYXJlbnQoKTogSVNlcmllQ29udGFpbmVyIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGFyZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgcGFyZW50KHZhbHVlOiBJU2VyaWVDb250YWluZXIgfCB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLl9wYXJlbnQgPSB2YWx1ZTtcclxuICAgICAgICBpZih0aGlzLl9wYXJlbnQgIT0gdW5kZWZpbmVkICYmIHRoaXMuc2VyaWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5zZXJpZS5wYXJlbnQgPSB0aGlzLmdldFNlcmllR3JvdXAoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBuYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IGRhdGFNb2RlbCA9IHRoaXMuZ2V0RGF0YU1vZGVsKCk7XHJcbiAgICAgICAgaWYoZGF0YU1vZGVsICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGlmKGRhdGFNb2RlbC5lZGl0TW9kZUFjdGl2ZSA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNhbGN1bGF0aW9uRGF0YS5nZXREaXNwbGF5TmFtZSgpOyAvLyBTaG93IHRoZSBkaXNwbGF5IG5hbWUgb2YgaW5wdXQvb3V0cHV0IHBhcmFtZXRlciBpbiBlZGl0IG1vZGVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTsgIC8vIFNob3cgb25seSB0aGUgdmFsdWUgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBkZXNjcmlwdGlvbigpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNhbGN1bGF0aW9uRGF0YS5kZXNjcmlwdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvbG9yKCk6IHN0cmluZ3tcclxuICAgICAgICBpZih0aGlzLnNlcmllICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlcmllLmNvbG9yO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGNvbG9yKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICBpZih0aGlzLnNlcmllICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2VyaWUuY29sb3IgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5vbkRhdGFDaGFuZ2VkKHRoaXMsIG5ldyBFdmVudFNpZ25hbE1hbmFnZXJEYXRhQ2hhbmdlZEFyZ3MoU2lnbmFsTWFuYWdlckFjdGlvbi5jb2xvckNoYW5nZWQsIHZhbHVlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCB2YWx1ZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmKHRoaXMuc2VyaWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VyaWUubmFtZTsgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgb2xkVmFsdWUgPSB0aGlzLl92YWx1ZTtcclxuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIGlmKHRoaXMuc2VyaWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5zZXJpZS5uYW1lID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm9uRGF0YUNoYW5nZWQodGhpcywgbmV3IEV2ZW50U2lnbmFsTWFuYWdlckRhdGFDaGFuZ2VkQXJncyhTaWduYWxNYW5hZ2VyQWN0aW9uLnZhbHVlQ2hhbmdlZCwgdmFsdWUsIG9sZFZhbHVlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGdldCBub2RlVHlwZSgpOiBOb2RlVHlwZXtcclxuICAgICAgICByZXR1cm4gTm9kZVR5cGUuY2FsY3VsYXRpb25PdXRwdXRQYXJhbTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbk91dHB1dERhdGEuXHJcbiAgICAgKiBAcGFyYW0ge1RDYWxjdWxhdGlvbkRhdGF9IGNhbGN1bGF0aW9uRGF0YVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBpc0lucHV0XHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uT3V0cHV0RGF0YVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihjYWxjdWxhdGlvbkRhdGE6IFRDYWxjdWxhdGlvbkRhdGEpe1xyXG4gICAgICAgIHN1cGVyKFwiXCIsIHVuZGVmaW5lZCk7XHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdGlvbkRhdGEgPSBjYWxjdWxhdGlvbkRhdGE7XHJcbiAgICAgICAgbGV0IHVuaXF1ZU91dHB1dFZhbHVlID0gdGhpcy5jYWxjdWxhdGlvbkRhdGEudmFsdWUgKyBcIiBcIiArIFNlcmllc1Byb3ZpZGVyLmdldEluc3RhbmNlKCkuZ2V0VW5pcXVlQ2FsY3VsYXRpb25JZCgpO1xyXG4gICAgICAgIC8vbGV0IHVuaXF1ZU91dHB1dFZhbHVlID0gdGhpcy5nZXRVbmlxdWVPdXRwdXRWYWx1ZSh0aGlzLmNhbGN1bGF0aW9uRGF0YS52YWx1ZSk7IC8vIFRPRE86IGNoZWNrIGZvciBvdGhlciBzaWduYWwgbmFtZXMgb25seSB2YWxpZCBpZiBjYWxjdWxhdGlvbiBpcyBhbHJlYWR5IGFwcGVuZGVkIHRvIHNpZ25hbCBncm91cFxyXG4gICAgICAgIGxldCBzaWduYWwgPSBuZXcgU2lnbmFsKHVuaXF1ZU91dHB1dFZhbHVlLCAgbmV3IEFycmF5PElQb2ludD4oKSk7XHJcbiAgICAgICAgaWYgKGNhbGN1bGF0aW9uRGF0YS50eXBlID09PSBTZXJpZXNUeXBlLnh5U2VyaWVzKXsgXHJcbiAgICAgICAgICAgIHRoaXMuc2VyaWUgPSBuZXcgWFlTZXJpZXMoc2lnbmFsLCBzaWduYWwubmFtZSwgQ29sb3JIZWxwZXIuZ2V0Q29sb3IoKSwgU2VyaWVzUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGNhbGN1bGF0aW9uRGF0YS50eXBlID09PSBTZXJpZXNUeXBlLmZmdFNlcmllcyl7IFxyXG4gICAgICAgICAgICB0aGlzLnNlcmllID0gbmV3IEZGVFNlcmllcyhzaWduYWwsIHNpZ25hbC5uYW1lLCBDb2xvckhlbHBlci5nZXRDb2xvcigpLCBTZXJpZXNQcm92aWRlci5nZXRJbnN0YW5jZSgpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VyaWUgPSBuZXcgWVRTZXJpZXMoc2lnbmFsLCBzaWduYWwubmFtZSwgQ29sb3JIZWxwZXIuZ2V0Q29sb3IoKSwgU2VyaWVzUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2VyaWUuaXNDYWxjdWxhdGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl92YWx1ZSA9IHVuaXF1ZU91dHB1dFZhbHVlO1xyXG4gICAgICAgIHRoaXMuY2FuRGVsZXRlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLypwcml2YXRlIGdldFVuaXF1ZU91dHB1dFZhbHVlKGRlZmF1bHRWYWx1ZTogc3RyaW5nLCBpZDogbnVtYmVyID0gMCk6IHN0cmluZ3tcclxuICAgICAgICBsZXQgc2lnbmFscyA9IHRoaXMuZ2V0U2lnbmFsU2VsZWN0aW9ucygpO1xyXG4gICAgICAgIGxldCBzaWduYWxOYW1lQWxyZWFkeUluVXNlID0gZmFsc2U7XHJcbiAgICAgICAgc2lnbmFscy5mb3JFYWNoKHNpZ25hbCA9PiB7XHJcbiAgICAgICAgICAgIGlmKHNpZ25hbC5kaXNwbGF5VmFsdWUgPT0gZGVmYXVsdFZhbHVlKXtcclxuICAgICAgICAgICAgICAgIHNpZ25hbE5hbWVBbHJlYWR5SW5Vc2UgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYoc2lnbmFsTmFtZUFscmVhZHlJblVzZSA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGlkID0gaWQrKztcclxuICAgICAgICAgICAgbGV0IG5ld05hbWUgPSBkZWZhdWx0VmFsdWUgKyBcIiBcIiArIGlkLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFVuaXF1ZU91dHB1dFZhbHVlKG5ld05hbWUsIGlkKTtcclxuICAgICAgICB9XHJcbiAgICB9Ki9cclxufVxyXG4iXX0=