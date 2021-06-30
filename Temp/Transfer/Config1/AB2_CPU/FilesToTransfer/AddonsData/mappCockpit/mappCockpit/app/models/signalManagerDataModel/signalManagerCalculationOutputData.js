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
define(["require", "exports", "../common/signal/serieNode", "./eventSignalManagerDataChangedArgs", "../common/signal/signal", "../common/calculatorProvider/calculationDataNumber", "../../common/seriesHelper", "../../common/colorHelper"], function (require, exports, serieNode_1, eventSignalManagerDataChangedArgs_1, signal_1, calculationDataNumber_1, seriesHelper_1, colorHelper_1) {
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
        function SignalManagerCalculationOutputData(calculationData, seriesProvider) {
            var _this = _super.call(this, "", undefined) || this;
            _this.onlyValuesFromListAreAllowed = false;
            _this.dropPossible = false;
            _this.calculationData = calculationData;
            // generate unique calculation output name
            var uniqueOutputName = _this.calculationData.value + " " + seriesProvider.getUniqueCalculationId();
            if (calculationData.type != undefined) {
                var signal = new signal_1.Signal(uniqueOutputName, new Array());
                var settings = seriesHelper_1.SeriesHelper.createSerieSettings(signal, signal.name, colorHelper_1.ColorHelper.getColor(), seriesProvider.getUniqueId(), calculationData.type);
                _this.serie = seriesProvider.createSerie(settings);
                _this.serie.isCalculated = true;
            }
            _this._value = uniqueOutputName;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uT3V0cHV0RGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvc2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uT3V0cHV0RGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBY0E7UUFBd0Qsc0RBQVM7UUF3RjdEOzs7OztXQUtHO1FBQ0gsNENBQVksZUFBaUMsRUFBRSxjQUErQjtZQUE5RSxZQUNJLGtCQUFNLEVBQUUsRUFBRSxTQUFTLENBQUMsU0FZdkI7WUF6R0Qsa0NBQTRCLEdBQVksS0FBSyxDQUFDO1lBQzlDLGtCQUFZLEdBQVksS0FBSyxDQUFDO1lBNkYxQixLQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztZQUN2QywwQ0FBMEM7WUFDMUMsSUFBSSxnQkFBZ0IsR0FBRyxLQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsY0FBYyxDQUFDLHNCQUFzQixFQUFFLENBQUM7WUFDbEcsSUFBRyxlQUFlLENBQUMsSUFBSSxJQUFJLFNBQVMsRUFBQztnQkFDakMsSUFBSSxNQUFNLEdBQUcsSUFBSSxlQUFNLENBQUMsZ0JBQWdCLEVBQUcsSUFBSSxLQUFLLEVBQVUsQ0FBQyxDQUFDO2dCQUNoRSxJQUFJLFFBQVEsR0FBRywyQkFBWSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLHlCQUFXLENBQUMsUUFBUSxFQUFFLEVBQUUsY0FBYyxDQUFDLFdBQVcsRUFBRSxFQUFFLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDaEosS0FBSSxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBRSxDQUFDO2dCQUNuRCxLQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7YUFDbEM7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Q0FBQyxJQUFJLEVBQUUsSUFBSSxxRUFBaUMsQ0FBQyx1REFBbUIsQ0FBQyxZQUFZLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDdkgsQ0FBQzs7O1dBVkE7UUFZRCxzQkFBVyx3REFBUTtpQkFBbkI7Z0JBQ0ksT0FBTyxvQkFBUSxDQUFDLHNCQUFzQixDQUFDO1lBQzNDLENBQUM7OztXQUFBO1FBc0JMLHlDQUFDO0lBQUQsQ0FBQyxBQTVHRCxDQUF3RCxxQkFBUyxHQTRHaEU7SUE1R1ksZ0ZBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVBvaW50IH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL3BvaW50SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElDZWxsSW5mbyB9IGZyb20gXCIuLi8uLi93aWRnZXRzL2NvbW1vbi9pbnRlcmZhY2VzL2NlbGxJbmZvSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElWYWx1ZUxpc3RJdGVtIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9pbnRlcmZhY2VzL3ZhbHVlTGlzdEl0ZW1JbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVNlcmllQ29udGFpbmVyIH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL3NlcmllQ29udGFpbmVySW50ZXJmYWNlXCI7XHJcblxyXG5pbXBvcnQgeyBTZXJpZU5vZGUsIE5vZGVUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi9zaWduYWwvc2VyaWVOb2RlXCI7XHJcbmltcG9ydCB7IFNpZ25hbE1hbmFnZXJBY3Rpb24sIEV2ZW50U2lnbmFsTWFuYWdlckRhdGFDaGFuZ2VkQXJncyB9IGZyb20gXCIuL2V2ZW50U2lnbmFsTWFuYWdlckRhdGFDaGFuZ2VkQXJnc1wiO1xyXG5pbXBvcnQgeyBTaWduYWwgfSBmcm9tIFwiLi4vY29tbW9uL3NpZ25hbC9zaWduYWxcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhTnVtYmVyIH0gZnJvbSBcIi4uL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRpb25EYXRhTnVtYmVyXCI7XHJcbmltcG9ydCB7IFRDYWxjdWxhdGlvbkRhdGEgfSBmcm9tIFwiLi4vY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdGlvbkRhdGFcIjtcclxuaW1wb3J0IHsgSVNlcmllc1Byb3ZpZGVyIH0gZnJvbSBcIi4uL2NvbW1vbi9zZXJpZXNQcm92aWRlci9zZXJpZXNQcm92aWRlckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTZXJpZXNIZWxwZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3Nlcmllc0hlbHBlclwiO1xyXG5pbXBvcnQgeyBDb2xvckhlbHBlciB9IGZyb20gXCIuLi8uLi9jb21tb24vY29sb3JIZWxwZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25PdXRwdXREYXRhIGV4dGVuZHMgU2VyaWVOb2RlIGltcGxlbWVudHMgSUNlbGxJbmZve1xyXG4gICAgY2FsY3VsYXRpb25EYXRhOiBUQ2FsY3VsYXRpb25EYXRhO1xyXG4gICAgb25seVZhbHVlc0Zyb21MaXN0QXJlQWxsb3dlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgZHJvcFBvc3NpYmxlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgcHJpdmF0ZSBfdmFsdWU6IHN0cmluZztcclxuXHJcbiAgICBwdWJsaWMgZ2V0IHZhbHVlcygpOiBBcnJheTxJVmFsdWVMaXN0SXRlbT58dW5kZWZpbmVkIHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgbWluVmFsdWUoKTogbnVtYmVyfHVuZGVmaW5lZHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgZ2V0IG1heFZhbHVlKCk6IG51bWJlcnx1bmRlZmluZWR7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGRhdGFUeXBlTmFtZSgpOiBzdHJpbmd7XHJcbiAgICAgICAgaWYodGhpcy5jYWxjdWxhdGlvbkRhdGEgaW5zdGFuY2VvZiBDYWxjdWxhdGlvbkRhdGFOdW1iZXIpe1xyXG4gICAgICAgICAgICByZXR1cm4gXCJGbG9hdFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gXCJTdHJpbmdcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBwYXJlbnQoKTogSVNlcmllQ29udGFpbmVyIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGFyZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgcGFyZW50KHZhbHVlOiBJU2VyaWVDb250YWluZXIgfCB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLl9wYXJlbnQgPSB2YWx1ZTtcclxuICAgICAgICBpZih0aGlzLl9wYXJlbnQgIT0gdW5kZWZpbmVkICYmIHRoaXMuc2VyaWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5zZXJpZS5wYXJlbnQgPSB0aGlzLmdldFNlcmllR3JvdXAoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBuYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IGRhdGFNb2RlbCA9IHRoaXMuZ2V0RGF0YU1vZGVsKCk7XHJcbiAgICAgICAgaWYoZGF0YU1vZGVsICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGlmKGRhdGFNb2RlbC5lZGl0TW9kZUFjdGl2ZSA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNhbGN1bGF0aW9uRGF0YS5nZXREaXNwbGF5TmFtZSgpOyAvLyBTaG93IHRoZSBkaXNwbGF5IG5hbWUgb2YgaW5wdXQvb3V0cHV0IHBhcmFtZXRlciBpbiBlZGl0IG1vZGVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTsgIC8vIFNob3cgb25seSB0aGUgdmFsdWUgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBkZXNjcmlwdGlvbigpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNhbGN1bGF0aW9uRGF0YS5kZXNjcmlwdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvbG9yKCk6IHN0cmluZ3tcclxuICAgICAgICBpZih0aGlzLnNlcmllICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlcmllLmNvbG9yO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGNvbG9yKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICBpZih0aGlzLnNlcmllICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2VyaWUuY29sb3IgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5vbkRhdGFDaGFuZ2VkKHRoaXMsIG5ldyBFdmVudFNpZ25hbE1hbmFnZXJEYXRhQ2hhbmdlZEFyZ3MoU2lnbmFsTWFuYWdlckFjdGlvbi5jb2xvckNoYW5nZWQsIHZhbHVlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCB2YWx1ZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmKHRoaXMuc2VyaWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VyaWUubmFtZTsgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgb2xkVmFsdWUgPSB0aGlzLl92YWx1ZTtcclxuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIGlmKHRoaXMuc2VyaWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5zZXJpZS5uYW1lID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm9uRGF0YUNoYW5nZWQodGhpcywgbmV3IEV2ZW50U2lnbmFsTWFuYWdlckRhdGFDaGFuZ2VkQXJncyhTaWduYWxNYW5hZ2VyQWN0aW9uLnZhbHVlQ2hhbmdlZCwgdmFsdWUsIG9sZFZhbHVlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBub2RlVHlwZSgpOiBOb2RlVHlwZXtcclxuICAgICAgICByZXR1cm4gTm9kZVR5cGUuY2FsY3VsYXRpb25PdXRwdXRQYXJhbTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbk91dHB1dERhdGEuXHJcbiAgICAgKiBAcGFyYW0ge1RDYWxjdWxhdGlvbkRhdGF9IGNhbGN1bGF0aW9uRGF0YVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBpc0lucHV0XHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uT3V0cHV0RGF0YVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihjYWxjdWxhdGlvbkRhdGE6IFRDYWxjdWxhdGlvbkRhdGEsIHNlcmllc1Byb3ZpZGVyOiBJU2VyaWVzUHJvdmlkZXIpe1xyXG4gICAgICAgIHN1cGVyKFwiXCIsIHVuZGVmaW5lZCk7XHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdGlvbkRhdGEgPSBjYWxjdWxhdGlvbkRhdGE7XHJcbiAgICAgICAgLy8gZ2VuZXJhdGUgdW5pcXVlIGNhbGN1bGF0aW9uIG91dHB1dCBuYW1lXHJcbiAgICAgICAgbGV0IHVuaXF1ZU91dHB1dE5hbWUgPSB0aGlzLmNhbGN1bGF0aW9uRGF0YS52YWx1ZSArIFwiIFwiICsgc2VyaWVzUHJvdmlkZXIuZ2V0VW5pcXVlQ2FsY3VsYXRpb25JZCgpO1xyXG4gICAgICAgIGlmKGNhbGN1bGF0aW9uRGF0YS50eXBlICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGxldCBzaWduYWwgPSBuZXcgU2lnbmFsKHVuaXF1ZU91dHB1dE5hbWUsICBuZXcgQXJyYXk8SVBvaW50PigpKTtcclxuICAgICAgICAgICAgbGV0IHNldHRpbmdzID0gU2VyaWVzSGVscGVyLmNyZWF0ZVNlcmllU2V0dGluZ3Moc2lnbmFsLCBzaWduYWwubmFtZSwgQ29sb3JIZWxwZXIuZ2V0Q29sb3IoKSwgc2VyaWVzUHJvdmlkZXIuZ2V0VW5pcXVlSWQoKSwgY2FsY3VsYXRpb25EYXRhLnR5cGUpXHJcbiAgICAgICAgICAgIHRoaXMuc2VyaWUgPSBzZXJpZXNQcm92aWRlci5jcmVhdGVTZXJpZShzZXR0aW5ncykhO1xyXG4gICAgICAgICAgICB0aGlzLnNlcmllLmlzQ2FsY3VsYXRlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdW5pcXVlT3V0cHV0TmFtZTtcclxuICAgICAgICB0aGlzLmNhbkRlbGV0ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==