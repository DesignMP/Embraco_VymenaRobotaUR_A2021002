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
define(["require", "exports", "../common/signal/serieNode", "./eventSignalManagerDataChangedArgs", "../common/signal/signal", "../../common/colorHelper", "../common/calculatorProvider/calculationDataNumber", "../chartManagerDataModel/YTSeries", "../chartManagerDataModel/XYSeries", "../chartManagerDataModel/FFTSeries"], function (require, exports, serieNode_1, eventSignalManagerDataChangedArgs_1, signal_1, colorHelper_1, calculationDataNumber_1, YTSeries_1, XYSeries_1, FFTSeries_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SignalManagerCalculationOutputData = /** @class */ (function (_super) {
        __extends(SignalManagerCalculationOutputData, _super);
        /**
         * Creates an instance of SignalManagerCalculationOutputData.
         * @param {(CalculationDataNumber|CalculationDataPoints|CalculationDataNumberOrPoints)} calculationData
         * @param {boolean} isInput
         * @memberof SignalManagerCalculationOutputData
         */
        function SignalManagerCalculationOutputData(calculationData) {
            var _this = _super.call(this, "", undefined) || this;
            _this.onlyValuesFromListAreAllowed = false;
            _this.dropPossible = false;
            _this.uniqueId = '0';
            _this.calculationData = calculationData;
            _this.uniqueId = SignalManagerCalculationOutputData.getUniqueId();
            var uniqueOutputValue = _this.calculationData.value + " " + _this.uniqueId;
            //let uniqueOutputValue = this.getUniqueOutputValue(this.calculationData.value); // TODO: check for other signal names only valid if calculation is already appended to signal group
            var signal = new signal_1.Signal(uniqueOutputValue, new Array());
            if (calculationData.value === 'xySignal') { //TODO: change. Actually is a workaround
                _this.serie = new XYSeries_1.XYSeries(signal, signal.name, colorHelper_1.ColorHelper.getColor());
            }
            else if (calculationData.value === 'spectral lines') {
                _this.serie = new FFTSeries_1.FFTSeries(signal, signal.name, colorHelper_1.ColorHelper.getColor());
            }
            else {
                _this.serie = new YTSeries_1.YTSeries(signal, signal.name, colorHelper_1.ColorHelper.getColor());
            }
            _this.serie.isCalculated = true;
            _this._value = uniqueOutputValue;
            _this.canDelete = false;
            return _this;
        }
        SignalManagerCalculationOutputData.getUniqueId = function () {
            // TODO: Find unique output param name/value
            this._uniqueId++;
            return this._uniqueId.toString();
        };
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
        Object.defineProperty(SignalManagerCalculationOutputData.prototype, "type", {
            get: function () {
                return serieNode_1.NodeType.calculationOutputParam;
            },
            enumerable: true,
            configurable: true
        });
        SignalManagerCalculationOutputData._uniqueId = 0;
        return SignalManagerCalculationOutputData;
    }(serieNode_1.SerieNode));
    exports.SignalManagerCalculationOutputData = SignalManagerCalculationOutputData;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uT3V0cHV0RGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvc2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uT3V0cHV0RGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBZ0JBO1FBQXdELHNEQUFTO1FBaUc3RDs7Ozs7V0FLRztRQUNILDRDQUFZLGVBQTBGO1lBQXRHLFlBQ0ksa0JBQU0sRUFBRSxFQUFFLFNBQVMsQ0FBQyxTQWtCdkI7WUF4SEQsa0NBQTRCLEdBQVksS0FBSyxDQUFDO1lBQzlDLGtCQUFZLEdBQVksS0FBSyxDQUFDO1lBQzlCLGNBQVEsR0FBVyxHQUFHLENBQUM7WUFxR25CLEtBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO1lBQ3ZDLEtBQUksQ0FBQyxRQUFRLEdBQUcsa0NBQWtDLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDakUsSUFBSSxpQkFBaUIsR0FBRyxLQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBQztZQUN6RSxvTEFBb0w7WUFDcEwsSUFBSSxNQUFNLEdBQUcsSUFBSSxlQUFNLENBQUMsaUJBQWlCLEVBQUcsSUFBSSxLQUFLLEVBQVUsQ0FBQyxDQUFDO1lBQ2pFLElBQUksZUFBZSxDQUFDLEtBQUssS0FBSyxVQUFVLEVBQUMsRUFBRSx3Q0FBd0M7Z0JBQy9FLEtBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxtQkFBUSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLHlCQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQzthQUMxRTtpQkFDSSxJQUFJLGVBQWUsQ0FBQyxLQUFLLEtBQUssZ0JBQWdCLEVBQUM7Z0JBQ2hELEtBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxxQkFBUyxD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QWhCO2dCQUNJLElBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxTQUFTLEVBQUM7b0JBQ3ZCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7aUJBQzFCO2dCQUNELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUN2QixDQUFDO2lCQUVELFVBQWlCLEtBQWE7Z0JBQzFCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2dCQUNwQixJQUFHLElBQUksQ0FBQyxLQUFLLElBQUksU0FBUyxFQUFDO29CQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7aUJBQzNCO2dCQUVELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLElBQUkscUVBQWlDLENBQUMsdURBQW1CLENBQUMsWUFBWSxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3ZILENBQUM7OztXQVZBO1FBWUQsc0JBQWMsb0RBQUk7aUJBQWxCO2dCQUNJLE9BQU8sb0JBQVEsQ0FBQyxzQkFBc0IsQ0FBQztZQUMzQyxDQUFDOzs7V0FBQTtRQXZGYyw0Q0FBUyxHQUFHLENBQUMsQ0FBQztRQXFJakMseUNBQUM7S0FBQSxBQTdJRCxDQUF3RCxxQkFBUyxHQTZJaEU7SUE3SVksZ0ZBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVNlcmllTm9kZSB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy9zZXJpZU5vZGVJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL3BvaW50SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNlcmllTm9kZSwgTm9kZVR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL3NpZ25hbC9zZXJpZU5vZGVcIjtcclxuaW1wb3J0IHsgU2lnbmFsTWFuYWdlckFjdGlvbiwgRXZlbnRTaWduYWxNYW5hZ2VyRGF0YUNoYW5nZWRBcmdzIH0gZnJvbSBcIi4vZXZlbnRTaWduYWxNYW5hZ2VyRGF0YUNoYW5nZWRBcmdzXCI7XHJcbmltcG9ydCB7IFNpZ25hbCB9IGZyb20gXCIuLi9jb21tb24vc2lnbmFsL3NpZ25hbFwiO1xyXG5pbXBvcnQgeyBDb2xvckhlbHBlciB9IGZyb20gXCIuLi8uLi9jb21tb24vY29sb3JIZWxwZXJcIjtcclxuaW1wb3J0IHsgSVNlcmllQ29udGFpbmVyIH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL3NlcmllQ29udGFpbmVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YU51bWJlciB9IGZyb20gXCIuLi9jb21tb24vY2FsY3VsYXRvclByb3ZpZGVyL2NhbGN1bGF0aW9uRGF0YU51bWJlclwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFQb2ludHMgfSBmcm9tIFwiLi4vY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdGlvbkRhdGFQb2ludHNcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHMgfSBmcm9tIFwiLi4vY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50c1wiO1xyXG5pbXBvcnQgeyBJQ2VsbEluZm8gfSBmcm9tIFwiLi4vLi4vd2lkZ2V0cy9jb21tb24vaW50ZXJmYWNlcy9jZWxsSW5mb0ludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJVmFsdWVMaXN0SXRlbSB9IGZyb20gXCIuLi8uLi9jb21tb24vaW50ZXJmYWNlcy92YWx1ZUxpc3RJdGVtSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFlUU2VyaWVzIH0gZnJvbSBcIi4uL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9ZVFNlcmllc1wiO1xyXG5pbXBvcnQgeyBYWVNlcmllcyB9IGZyb20gXCIuLi9jaGFydE1hbmFnZXJEYXRhTW9kZWwvWFlTZXJpZXNcIjtcclxuaW1wb3J0IHsgRkZUU2VyaWVzIH0gZnJvbSBcIi4uL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9GRlRTZXJpZXNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25PdXRwdXREYXRhIGV4dGVuZHMgU2VyaWVOb2RlIGltcGxlbWVudHMgSUNlbGxJbmZve1xyXG4gICAgY2FsY3VsYXRpb25EYXRhOiBDYWxjdWxhdGlvbkRhdGFOdW1iZXJ8Q2FsY3VsYXRpb25EYXRhUG9pbnRzfENhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzO1xyXG4gICAgb25seVZhbHVlc0Zyb21MaXN0QXJlQWxsb3dlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgZHJvcFBvc3NpYmxlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICB1bmlxdWVJZDogc3RyaW5nID0gJzAnO1xyXG5cclxuICAgIHByaXZhdGUgX3ZhbHVlOiBzdHJpbmc7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX3VuaXF1ZUlkID0gMDtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZXRVbmlxdWVJZCgpOiBzdHJpbmd7XHJcbiAgICAgICAgLy8gVE9ETzogRmluZCB1bmlxdWUgb3V0cHV0IHBhcmFtIG5hbWUvdmFsdWVcclxuICAgICAgICB0aGlzLl91bmlxdWVJZCsrO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl91bmlxdWVJZC50b1N0cmluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgdmFsdWVzKCk6IEFycmF5PElWYWx1ZUxpc3RJdGVtPnx1bmRlZmluZWQge1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBtaW5WYWx1ZSgpOiBudW1iZXJ8dW5kZWZpbmVke1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBnZXQgbWF4VmFsdWUoKTogbnVtYmVyfHVuZGVmaW5lZHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgZGF0YVR5cGVOYW1lKCk6IHN0cmluZ3tcclxuICAgICAgICBpZih0aGlzLmNhbGN1bGF0aW9uRGF0YSBpbnN0YW5jZW9mIENhbGN1bGF0aW9uRGF0YU51bWJlcil7XHJcbiAgICAgICAgICAgIHJldHVybiBcIkZsb2F0XCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiBcIlN0cmluZ1wiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHBhcmVudCgpOiBJU2VyaWVDb250YWluZXIgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBwYXJlbnQodmFsdWU6IElTZXJpZUNvbnRhaW5lciB8IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuX3BhcmVudCA9IHZhbHVlO1xyXG4gICAgICAgIGlmKHRoaXMuX3BhcmVudCAhPSB1bmRlZmluZWQgJiYgdGhpcy5zZXJpZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLnNlcmllLnBhcmVudCA9IHRoaXMuZ2V0U2VyaWVHcm91cCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgZGF0YU1vZGVsID0gdGhpcy5nZXREYXRhTW9kZWwoKTtcclxuICAgICAgICBpZihkYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgaWYoZGF0YU1vZGVsLmVkaXRNb2RlQWN0aXZlID09IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FsY3VsYXRpb25EYXRhLmdldERpc3BsYXlOYW1lKCk7IC8vIFNob3cgdGhlIGRpc3BsYXkgbmFtZSBvZiBpbnB1dC9vdXRwdXQgcGFyYW1ldGVyIGluIGVkaXQgbW9kZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlOyAgLy8gU2hvdyBvbmx5IHRoZSB2YWx1ZSBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGRlc2NyaXB0aW9uKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FsY3VsYXRpb25EYXRhLmRlc2NyaXB0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY29sb3IoKTogc3RyaW5ne1xyXG4gICAgICAgIGlmKHRoaXMuc2VyaWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VyaWUuY29sb3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgY29sb3IodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIGlmKHRoaXMuc2VyaWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5zZXJpZS5jb2xvciA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm9uRGF0YUNoYW5nZWQodGhpcywgbmV3IEV2ZW50U2lnbmFsTWFuYWdlckRhdGFDaGFuZ2VkQXJncyhTaWduYWxNYW5hZ2VyQWN0aW9uLmNvbG9yQ2hhbmdlZCwgdmFsdWUpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHZhbHVlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYodGhpcy5zZXJpZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZXJpZS5uYW1lOyBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgdmFsdWUodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBvbGRWYWx1ZSA9IHRoaXMuX3ZhbHVlO1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgaWYodGhpcy5zZXJpZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLnNlcmllLm5hbWUgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMub25EYXRhQ2hhbmdlZCh0aGlzLCBuZXcgRXZlbnRTaWduYWxNYW5hZ2VyRGF0YUNoYW5nZWRBcmdzKFNpZ25hbE1hbmFnZXJBY3Rpb24udmFsdWVDaGFuZ2VkLCB2YWx1ZSwgb2xkVmFsdWUpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZ2V0IHR5cGUoKTogTm9kZVR5cGV7XHJcbiAgICAgICAgcmV0dXJuIE5vZGVUeXBlLmNhbGN1bGF0aW9uT3V0cHV0UGFyYW07XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25PdXRwdXREYXRhLlxyXG4gICAgICogQHBhcmFtIHsoQ2FsY3VsYXRpb25EYXRhTnVtYmVyfENhbGN1bGF0aW9uRGF0YVBvaW50c3xDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cyl9IGNhbGN1bGF0aW9uRGF0YVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBpc0lucHV0XHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uT3V0cHV0RGF0YVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihjYWxjdWxhdGlvbkRhdGE6IENhbGN1bGF0aW9uRGF0YU51bWJlcnxDYWxjdWxhdGlvbkRhdGFQb2ludHN8Q2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHMpe1xyXG4gICAgICAgIHN1cGVyKFwiXCIsIHVuZGVmaW5lZCk7XHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdGlvbkRhdGEgPSBjYWxjdWxhdGlvbkRhdGE7XHJcbiAgICAgICAgdGhpcy51bmlxdWVJZCA9IFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbk91dHB1dERhdGEuZ2V0VW5pcXVlSWQoKTtcclxuICAgICAgICBsZXQgdW5pcXVlT3V0cHV0VmFsdWUgPSB0aGlzLmNhbGN1bGF0aW9uRGF0YS52YWx1ZSArIFwiIFwiICsgdGhpcy51bmlxdWVJZDtcclxuICAgICAgICAvL2xldCB1bmlxdWVPdXRwdXRWYWx1ZSA9IHRoaXMuZ2V0VW5pcXVlT3V0cHV0VmFsdWUodGhpcy5jYWxjdWxhdGlvbkRhdGEudmFsdWUpOyAvLyBUT0RPOiBjaGVjayBmb3Igb3RoZXIgc2lnbmFsIG5hbWVzIG9ubHkgdmFsaWQgaWYgY2FsY3VsYXRpb24gaXMgYWxyZWFkeSBhcHBlbmRlZCB0byBzaWduYWwgZ3JvdXBcclxuICAgICAgICBsZXQgc2lnbmFsID0gbmV3IFNpZ25hbCh1bmlxdWVPdXRwdXRWYWx1ZSwgIG5ldyBBcnJheTxJUG9pbnQ+KCkpO1xyXG4gICAgICAgIGlmIChjYWxjdWxhdGlvbkRhdGEudmFsdWUgPT09ICd4eVNpZ25hbCcpeyAvL1RPRE86IGNoYW5nZS4gQWN0dWFsbHkgaXMgYSB3b3JrYXJvdW5kXHJcbiAgICAgICAgICAgIHRoaXMuc2VyaWUgPSBuZXcgWFlTZXJpZXMoc2lnbmFsLCBzaWduYWwubmFtZSwgQ29sb3JIZWxwZXIuZ2V0Q29sb3IoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGNhbGN1bGF0aW9uRGF0YS52YWx1ZSA9PT0gJ3NwZWN0cmFsIGxpbmVzJyl7XHJcbiAgICAgICAgICAgIHRoaXMuc2VyaWUgPSBuZXcgRkZUU2VyaWVzKHNpZ25hbCwgc2lnbmFsLm5hbWUsIENvbG9ySGVscGVyLmdldENvbG9yKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZXJpZSA9IG5ldyBZVFNlcmllcyhzaWduYWwsIHNpZ25hbC5uYW1lLCBDb2xvckhlbHBlci5nZXRDb2xvcigpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXJpZS5pc0NhbGN1bGF0ZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdW5pcXVlT3V0cHV0VmFsdWU7XHJcbiAgICAgICAgdGhpcy5jYW5EZWxldGUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKnByaXZhdGUgZ2V0VW5pcXVlT3V0cHV0VmFsdWUoZGVmYXVsdFZhbHVlOiBzdHJpbmcsIGlkOiBudW1iZXIgPSAwKTogc3RyaW5ne1xyXG4gICAgICAgIGxldCBzaWduYWxzID0gdGhpcy5nZXRTaWduYWxTZWxlY3Rpb25zKCk7XHJcbiAgICAgICAgbGV0IHNpZ25hbE5hbWVBbHJlYWR5SW5Vc2UgPSBmYWxzZTtcclxuICAgICAgICBzaWduYWxzLmZvckVhY2goc2lnbmFsID0+IHtcclxuICAgICAgICAgICAgaWYoc2lnbmFsLmRpc3BsYXlWYWx1ZSA9PSBkZWZhdWx0VmFsdWUpe1xyXG4gICAgICAgICAgICAgICAgc2lnbmFsTmFtZUFscmVhZHlJblVzZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZihzaWduYWxOYW1lQWxyZWFkeUluVXNlID09IGZhbHNlKXtcclxuICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgaWQgPSBpZCsrO1xyXG4gICAgICAgICAgICBsZXQgbmV3TmFtZSA9IGRlZmF1bHRWYWx1ZSArIFwiIFwiICsgaWQudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VW5pcXVlT3V0cHV0VmFsdWUobmV3TmFtZSwgaWQpO1xyXG4gICAgICAgIH1cclxuICAgIH0qL1xyXG59XHJcbiJdfQ==