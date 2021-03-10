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
define(["require", "exports", "../common/signal/serieNode", "./eventSignalManagerDataChangedArgs", "../common/calculatorProvider/calculationDataNumber", "./signalManagerCalculatorType", "./signalManagerCalculationOutputData", "../chartManagerDataModel/seriesType"], function (require, exports, serieNode_1, eventSignalManagerDataChangedArgs_1, calculationDataNumber_1, signalManagerCalculatorType_1, signalManagerCalculationOutputData_1, seriesType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SignalManagerCalculationInputData = /** @class */ (function (_super) {
        __extends(SignalManagerCalculationInputData, _super);
        /**
         * Creates an instance of SignalManagerCalculationInputData.
         * @param {(CalculationDataNumber|CalculationDataPoints|CalculationDataNumberOrPoints)} calculationData
         * @param {boolean} isInput
         * @memberof SignalManagerCalculationInputData
         */
        function SignalManagerCalculationInputData(calculationData) {
            var _this = _super.call(this, "", undefined) || this;
            _this.onlyValuesFromListAreAllowed = false;
            _this.dropPossible = false;
            _this.draggedOver = false;
            _this.calculationData = calculationData;
            if (_this.calculationData.displayInfo != undefined) {
                _this.onlyValuesFromListAreAllowed = _this.calculationData.displayInfo.onlyValuesFromListAreAllowed;
            }
            _this._value = _this.calculationData.value;
            _this.canDelete = false;
            return _this;
        }
        Object.defineProperty(SignalManagerCalculationInputData.prototype, "values", {
            /**
             * Returns a list with available values for this calculation input
             *
             * @readonly
             * @type {(Array<IValueListItem>|undefined)}
             * @memberof SignalManagerCalculationInputData
             */
            get: function () {
                if (this.calculationData.values != undefined) {
                    return this.calculationData.values;
                }
                else if (this.calculationData.displayInfo != undefined && this.calculationData.displayInfo.showSignalList == true) {
                    return this.getSerieSelections();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculationInputData.prototype, "dataTypeName", {
            /**
             * Returns the datatype of this calculation input
             *
             * @readonly
             * @type {string}
             * @memberof SignalManagerCalculationInputData
             */
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
        Object.defineProperty(SignalManagerCalculationInputData.prototype, "minValue", {
            get: function () {
                if (this.calculationData.displayInfo != undefined) {
                    return this.calculationData.displayInfo.minValue;
                }
                return undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculationInputData.prototype, "maxValue", {
            get: function () {
                if (this.calculationData.displayInfo != undefined) {
                    return this.calculationData.displayInfo.maxValue;
                }
                return undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculationInputData.prototype, "parent", {
            /**
             * Returns the parent of this calculation input
             *
             * @type {(ISerieContainer | undefined)}
             * @memberof SignalManagerCalculationInputData
             */
            get: function () {
                return this._parent;
            },
            /**
             * Sets the parent of this calculation input
             *
             * @memberof SignalManagerCalculationInputData
             */
            set: function (value) {
                this._parent = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculationInputData.prototype, "name", {
            /**
             * Returns the name of this calculation input
             *
             * @readonly
             * @type {string}
             * @memberof SignalManagerCalculationInputData
             */
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
        Object.defineProperty(SignalManagerCalculationInputData.prototype, "description", {
            /**
             * Returns the description of this calculation input
             *
             * @readonly
             * @type {string}
             * @memberof SignalManagerCalculationInputData
             */
            get: function () {
                return this.calculationData.description;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculationInputData.prototype, "color", {
            /**
             * Returns the color of this calculation input => currently no color needed for inputs
             *
             * @type {string}
             * @memberof SignalManagerCalculationInputData
             */
            get: function () {
                return "";
            },
            /**
             * Sets the color of this calculation input => currently no color needed for inputs
             *
             * @memberof SignalManagerCalculationInputData
             */
            set: function (value) {
                if (this.serie != undefined) {
                    this.serie.color = value;
                }
                this.onDataChanged(this, new eventSignalManagerDataChangedArgs_1.EventSignalManagerDataChangedArgs(eventSignalManagerDataChangedArgs_1.SignalManagerAction.colorChanged, value));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculationInputData.prototype, "value", {
            /**
             * Returns the value of this calculation input
             *
             * @type {string}
             * @memberof SignalManagerCalculationInputData
             */
            get: function () {
                return this._value;
            },
            /**
             * Sets the value of this calculation input
             *
             * @memberof SignalManagerCalculationInputData
             */
            set: function (value) {
                var oldValue = this._value;
                this._value = value;
                this.onDataChanged(this, new eventSignalManagerDataChangedArgs_1.EventSignalManagerDataChangedArgs(eventSignalManagerDataChangedArgs_1.SignalManagerAction.valueChanged, value, oldValue));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculationInputData.prototype, "type", {
            /**
             * Returns the type of this calculation input
             *
             * @readonly
             * @protected
             * @type {string}
             * @memberof SignalManagerCalculationInputData
             */
            get: function () {
                return serieNode_1.NodeType.calculationInputParam;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Returns all a list(displayValue, value) of the series which are available at the parent serie group, output series of the current calculation will be removed
         *
         * @private
         * @returns {Array<any>}
         * @memberof SignalManagerCalculationInputData
         */
        SignalManagerCalculationInputData.prototype.getSerieSelections = function () {
            // get all available series from parent serieGroup
            var serieSelections = this.getAllSeriesFromParentSerieGroup();
            // Remove own output series from this calculation
            var outputSerieData = this.getOutputDatasOfParent()[0]; // TODO: multi output
            if (outputSerieData != undefined) {
                if (outputSerieData.serie != undefined) {
                    for (var i = 0; i < serieSelections.length; i++) {
                        if (serieSelections[i].value == outputSerieData.serie.name) {
                            serieSelections.splice(i, 1);
                            i--;
                        }
                    }
                }
            }
            // Remove series which results in a cycle of calculations
            if (this.parent instanceof signalManagerCalculatorType_1.SignalManagerCalculatorType) {
                for (var i = 0; i < serieSelections.length; i++) {
                    if (this.parent.cycleFound(serieSelections[i].value) == true) { // check for cycle
                        serieSelections.splice(i, 1);
                        i--;
                    }
                }
            }
            return serieSelections;
        };
        /**
         * Retruns a list(with displayValue and value) of all series from the parent serie group
         *
         * @private
         * @returns {Array<any>}
         * @memberof SignalManagerCalculationInputData
         */
        SignalManagerCalculationInputData.prototype.getAllSeriesFromParentSerieGroup = function () {
            var serieSelections = new Array();
            var serieGroup = this.getSerieGroup();
            if (serieGroup != undefined) { // Is a serie group available
                var series = serieGroup.getSeries();
                for (var i = 0; i < series.length; i++) {
                    // So far, only allowed to use yt series as input 
                    if (series[i].type == seriesType_1.SeriesType.timeSeries) {
                        var serieName = series[i].name;
                        serieSelections.push({ displayValue: serieName, value: serieName });
                    }
                }
            }
            return serieSelections;
        };
        SignalManagerCalculationInputData.prototype.getOutputDatasOfParent = function () {
            var outputDatas = new Array();
            if (this._parent != undefined) {
                var parentChilds = this._parent.getChilds();
                for (var i = 0; i < parentChilds.length; i++) {
                    if (parentChilds[i] instanceof signalManagerCalculationOutputData_1.SignalManagerCalculationOutputData) {
                        outputDatas.push(parentChilds[i]);
                    }
                }
            }
            return outputDatas;
        };
        return SignalManagerCalculationInputData;
    }(serieNode_1.SerieNode));
    exports.SignalManagerCalculationInputData = SignalManagerCalculationInputData;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvc2lnbmFsTWFuYWdlckRhdGFNb2RlbC9zaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVlBO1FBQXVELHFEQUFTO1FBNEo1RDs7Ozs7V0FLRztRQUNILDJDQUFZLGVBQTBGO1lBQXRHLFlBQ0ksa0JBQU0sRUFBRSxFQUFFLFNBQVMsQ0FBQyxTQU92QjtZQXhLRCxrQ0FBNEIsR0FBWSxLQUFLLENBQUM7WUFDOUMsa0JBQVksR0FBWSxLQUFLLENBQUM7WUFDOUIsaUJBQVcsR0FBWSxLQUFLLENBQUM7WUFnS3pCLEtBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO1lBQ3ZDLElBQUcsS0FBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLElBQUksU0FBUyxFQUFDO2dCQUM3QyxLQUFJLENBQUMsNEJBQTRCLEdBQUcsS0FBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsNEJBQTRCLENBQUM7YUFDckc7WUFDRCxLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDO1lBQ3pDLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDOztRQUMzQixDQUFDO1FBM0pELHNCQUFXLHFEQUFNO1lBUGpCOzs7Ozs7ZUFNRztpQkFDSDtnQkFDSSxJQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxJQUFJLFNBQVMsRUFBQztvQkFDeEMsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQztpQkFDdEM7cUJBQ0ksSUFBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsY0FBYyxJQUFJLElBQUksRUFB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QUFDLENBQUMsQ0FBdUMsQ0FBQyxDQUFDO3FCQUMzRTtpQkFDSjthQUNKO1lBQ0QsT0FBTyxXQUFXLENBQUM7UUFDdkIsQ0FBQztRQUVMLHdDQUFDO0lBQUQsQ0FBQyxBQXJQRCxDQUF1RCxxQkFBUyxHQXFQL0Q7SUFyUFksOEVBQWlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2VyaWVOb2RlLCBOb2RlVHlwZSB9IGZyb20gXCIuLi9jb21tb24vc2lnbmFsL3NlcmllTm9kZVwiO1xyXG5pbXBvcnQgeyBTaWduYWxNYW5hZ2VyQWN0aW9uLCBFdmVudFNpZ25hbE1hbmFnZXJEYXRhQ2hhbmdlZEFyZ3MgfSBmcm9tIFwiLi9ldmVudFNpZ25hbE1hbmFnZXJEYXRhQ2hhbmdlZEFyZ3NcIjtcclxuaW1wb3J0IHsgSVNlcmllQ29udGFpbmVyIH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL3NlcmllQ29udGFpbmVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YU51bWJlciB9IGZyb20gXCIuLi9jb21tb24vY2FsY3VsYXRvclByb3ZpZGVyL2NhbGN1bGF0aW9uRGF0YU51bWJlclwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFQb2ludHMgfSBmcm9tIFwiLi4vY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdGlvbkRhdGFQb2ludHNcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHMgfSBmcm9tIFwiLi4vY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50c1wiO1xyXG5pbXBvcnQgeyBJQ2VsbEluZm8gfSBmcm9tIFwiLi4vLi4vd2lkZ2V0cy9jb21tb24vaW50ZXJmYWNlcy9jZWxsSW5mb0ludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJVmFsdWVMaXN0SXRlbSB9IGZyb20gXCIuLi8uLi9jb21tb24vaW50ZXJmYWNlcy92YWx1ZUxpc3RJdGVtSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNpZ25hbE1hbmFnZXJDYWxjdWxhdG9yVHlwZSB9IGZyb20gXCIuL3NpZ25hbE1hbmFnZXJDYWxjdWxhdG9yVHlwZVwiO1xyXG5pbXBvcnQgeyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25PdXRwdXREYXRhIH0gZnJvbSBcIi4vc2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uT3V0cHV0RGF0YVwiO1xyXG5pbXBvcnQgeyBTZXJpZXNUeXBlIH0gZnJvbSBcIi4uL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9zZXJpZXNUeXBlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhIGV4dGVuZHMgU2VyaWVOb2RlIGltcGxlbWVudHMgSUNlbGxJbmZve1xyXG4gICAgY2FsY3VsYXRpb25EYXRhOiBDYWxjdWxhdGlvbkRhdGFOdW1iZXJ8Q2FsY3VsYXRpb25EYXRhUG9pbnRzfENhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzO1xyXG4gICAgb25seVZhbHVlc0Zyb21MaXN0QXJlQWxsb3dlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgZHJvcFBvc3NpYmxlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBkcmFnZ2VkT3ZlcjogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIHByaXZhdGUgX3ZhbHVlOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgbGlzdCB3aXRoIGF2YWlsYWJsZSB2YWx1ZXMgZm9yIHRoaXMgY2FsY3VsYXRpb24gaW5wdXRcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHsoQXJyYXk8SVZhbHVlTGlzdEl0ZW0+fHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgdmFsdWVzKCk6IEFycmF5PElWYWx1ZUxpc3RJdGVtPnx1bmRlZmluZWQge1xyXG4gICAgICAgIGlmKHRoaXMuY2FsY3VsYXRpb25EYXRhLnZhbHVlcyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jYWxjdWxhdGlvbkRhdGEudmFsdWVzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRoaXMuY2FsY3VsYXRpb25EYXRhLmRpc3BsYXlJbmZvICE9IHVuZGVmaW5lZCAmJiB0aGlzLmNhbGN1bGF0aW9uRGF0YS5kaXNwbGF5SW5mby5zaG93U2lnbmFsTGlzdCA9PSB0cnVlKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U2VyaWVTZWxlY3Rpb25zKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGF0YXR5cGUgb2YgdGhpcyBjYWxjdWxhdGlvbiBpbnB1dFxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBkYXRhVHlwZU5hbWUoKTogc3RyaW5ne1xyXG4gICAgICAgIGlmKHRoaXMuY2FsY3VsYXRpb25EYXRhIGluc3RhbmNlb2YgQ2FsY3VsYXRpb25EYXRhTnVtYmVyKXtcclxuICAgICAgICAgICAgcmV0dXJuIFwiRmxvYXRcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIFwiU3RyaW5nXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgbWluVmFsdWUoKTogbnVtYmVyfHVuZGVmaW5lZHtcclxuICAgICAgICBpZih0aGlzLmNhbGN1bGF0aW9uRGF0YS5kaXNwbGF5SW5mbyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jYWxjdWxhdGlvbkRhdGEuZGlzcGxheUluZm8ubWluVmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBnZXQgbWF4VmFsdWUoKTogbnVtYmVyfHVuZGVmaW5lZHtcclxuICAgICAgICBpZih0aGlzLmNhbGN1bGF0aW9uRGF0YS5kaXNwbGF5SW5mbyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jYWxjdWxhdGlvbkRhdGEuZGlzcGxheUluZm8ubWF4VmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBwYXJlbnQgb2YgdGhpcyBjYWxjdWxhdGlvbiBpbnB1dCBcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7KElTZXJpZUNvbnRhaW5lciB8IHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgcGFyZW50KCk6IElTZXJpZUNvbnRhaW5lciB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcmVudDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHBhcmVudCBvZiB0aGlzIGNhbGN1bGF0aW9uIGlucHV0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IHBhcmVudCh2YWx1ZTogSVNlcmllQ29udGFpbmVyIHwgdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5fcGFyZW50ID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBuYW1lIG9mIHRoaXMgY2FsY3VsYXRpb24gaW5wdXRcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBkYXRhTW9kZWwgPSB0aGlzLmdldERhdGFNb2RlbCgpO1xyXG4gICAgICAgIGlmKGRhdGFNb2RlbCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBpZihkYXRhTW9kZWwuZWRpdE1vZGVBY3RpdmUgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jYWxjdWxhdGlvbkRhdGEuZ2V0RGlzcGxheU5hbWUoKTsgLy8gU2hvdyB0aGUgZGlzcGxheSBuYW1lIG9mIGlucHV0L291dHB1dCBwYXJhbWV0ZXIgaW4gZWRpdCBtb2RlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7ICAvLyBTaG93IG9ubHkgdGhlIHZhbHVlIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGVzY3JpcHRpb24gb2YgdGhpcyBjYWxjdWxhdGlvbiBpbnB1dFxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBkZXNjcmlwdGlvbigpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNhbGN1bGF0aW9uRGF0YS5kZXNjcmlwdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGNvbG9yIG9mIHRoaXMgY2FsY3VsYXRpb24gaW5wdXQgPT4gY3VycmVudGx5IG5vIGNvbG9yIG5lZWRlZCBmb3IgaW5wdXRzXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBjb2xvcigpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBjb2xvciBvZiB0aGlzIGNhbGN1bGF0aW9uIGlucHV0ID0+IGN1cnJlbnRseSBubyBjb2xvciBuZWVkZWQgZm9yIGlucHV0c1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBjb2xvcih2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYodGhpcy5zZXJpZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLnNlcmllLmNvbG9yID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMub25EYXRhQ2hhbmdlZCh0aGlzLCBuZXcgRXZlbnRTaWduYWxNYW5hZ2VyRGF0YUNoYW5nZWRBcmdzKFNpZ25hbE1hbmFnZXJBY3Rpb24uY29sb3JDaGFuZ2VkLCB2YWx1ZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdmFsdWUgb2YgdGhpcyBjYWxjdWxhdGlvbiBpbnB1dCBcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHZhbHVlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgdmFsdWUgb2YgdGhpcyBjYWxjdWxhdGlvbiBpbnB1dFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCB2YWx1ZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IG9sZFZhbHVlID0gdGhpcy5fdmFsdWU7XHJcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLm9uRGF0YUNoYW5nZWQodGhpcywgbmV3IEV2ZW50U2lnbmFsTWFuYWdlckRhdGFDaGFuZ2VkQXJncyhTaWduYWxNYW5hZ2VyQWN0aW9uLnZhbHVlQ2hhbmdlZCwgdmFsdWUsIG9sZFZhbHVlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0eXBlIG9mIHRoaXMgY2FsY3VsYXRpb24gaW5wdXRcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXQgdHlwZSgpOiBOb2RlVHlwZXtcclxuICAgICAgICByZXR1cm4gTm9kZVR5cGUuY2FsY3VsYXRpb25JbnB1dFBhcmFtO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhLlxyXG4gICAgICogQHBhcmFtIHsoQ2FsY3VsYXRpb25EYXRhTnVtYmVyfENhbGN1bGF0aW9uRGF0YVBvaW50c3xDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cyl9IGNhbGN1bGF0aW9uRGF0YVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBpc0lucHV0XHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGNhbGN1bGF0aW9uRGF0YTogQ2FsY3VsYXRpb25EYXRhTnVtYmVyfENhbGN1bGF0aW9uRGF0YVBvaW50c3xDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cyl7XHJcbiAgICAgICAgc3VwZXIoXCJcIiwgdW5kZWZpbmVkKTtcclxuICAgICAgICB0aGlzLmNhbGN1bGF0aW9uRGF0YSA9IGNhbGN1bGF0aW9uRGF0YTtcclxuICAgICAgICBpZih0aGlzLmNhbGN1bGF0aW9uRGF0YS5kaXNwbGF5SW5mbyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLm9ubHlWYWx1ZXNGcm9tTGlzdEFyZUFsbG93ZWQgPSB0aGlzLmNhbGN1bGF0aW9uRGF0YS5kaXNwbGF5SW5mby5vbmx5VmFsdWVzRnJvbUxpc3RBcmVBbGxvd2VkO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl92YWx1ZSA9IHRoaXMuY2FsY3VsYXRpb25EYXRhLnZhbHVlO1xyXG4gICAgICAgIHRoaXMuY2FuRGVsZXRlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGFsbCBhIGxpc3QoZGlzcGxheVZhbHVlLCB2YWx1ZSkgb2YgdGhlIHNlcmllcyB3aGljaCBhcmUgYXZhaWxhYmxlIGF0IHRoZSBwYXJlbnQgc2VyaWUgZ3JvdXAsIG91dHB1dCBzZXJpZXMgb2YgdGhlIGN1cnJlbnQgY2FsY3VsYXRpb24gd2lsbCBiZSByZW1vdmVkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxhbnk+fVxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFNlcmllU2VsZWN0aW9ucygpOiBBcnJheTxhbnk+e1xyXG4gICAgICAgIC8vIGdldCBhbGwgYXZhaWxhYmxlIHNlcmllcyBmcm9tIHBhcmVudCBzZXJpZUdyb3VwXHJcbiAgICAgICAgbGV0IHNlcmllU2VsZWN0aW9ucyA9IHRoaXMuZ2V0QWxsU2VyaWVzRnJvbVBhcmVudFNlcmllR3JvdXAoKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBSZW1vdmUgb3duIG91dHB1dCBzZXJpZXMgZnJvbSB0aGlzIGNhbGN1bGF0aW9uXHJcbiAgICAgICAgbGV0IG91dHB1dFNlcmllRGF0YSA9IHRoaXMuZ2V0T3V0cHV0RGF0YXNPZlBhcmVudCgpWzBdOy8vIFRPRE86IG11bHRpIG91dHB1dFxyXG4gICAgICAgIGlmKG91dHB1dFNlcmllRGF0YSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBpZihvdXRwdXRTZXJpZURhdGEuc2VyaWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpIDwgc2VyaWVTZWxlY3Rpb25zLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBpZihzZXJpZVNlbGVjdGlvbnNbaV0udmFsdWUgPT0gb3V0cHV0U2VyaWVEYXRhLnNlcmllLm5hbWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJpZVNlbGVjdGlvbnMuc3BsaWNlKGksMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGktLTsgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZW1vdmUgc2VyaWVzIHdoaWNoIHJlc3VsdHMgaW4gYSBjeWNsZSBvZiBjYWxjdWxhdGlvbnNcclxuICAgICAgICBpZih0aGlzLnBhcmVudCBpbnN0YW5jZW9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdG9yVHlwZSl7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpIDwgc2VyaWVTZWxlY3Rpb25zLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMucGFyZW50IS5jeWNsZUZvdW5kKHNlcmllU2VsZWN0aW9uc1tpXS52YWx1ZSkgPT0gdHJ1ZSl7IC8vIGNoZWNrIGZvciBjeWNsZVxyXG4gICAgICAgICAgICAgICAgICAgIHNlcmllU2VsZWN0aW9ucy5zcGxpY2UoaSwxKTtcclxuICAgICAgICAgICAgICAgICAgICBpLS07ICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc2VyaWVTZWxlY3Rpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0cnVucyBhIGxpc3Qod2l0aCBkaXNwbGF5VmFsdWUgYW5kIHZhbHVlKSBvZiBhbGwgc2VyaWVzIGZyb20gdGhlIHBhcmVudCBzZXJpZSBncm91cFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8YW55Pn1cclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGFcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRBbGxTZXJpZXNGcm9tUGFyZW50U2VyaWVHcm91cCgpOiBBcnJheTxhbnk+e1xyXG4gICAgICAgIGxldCBzZXJpZVNlbGVjdGlvbnMgPSBuZXcgQXJyYXk8YW55PigpO1xyXG4gICAgICAgIGxldCBzZXJpZUdyb3VwID0gdGhpcy5nZXRTZXJpZUdyb3VwKCk7XHJcbiAgICAgICAgaWYoc2VyaWVHcm91cCAhPSB1bmRlZmluZWQpeyAvLyBJcyBhIHNlcmllIGdyb3VwIGF2YWlsYWJsZVxyXG4gICAgICAgICAgICBsZXQgc2VyaWVzID0gc2VyaWVHcm91cC5nZXRTZXJpZXMoKTtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGkgPCBzZXJpZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgLy8gU28gZmFyLCBvbmx5IGFsbG93ZWQgdG8gdXNlIHl0IHNlcmllcyBhcyBpbnB1dCBcclxuXHRcdCAgICAgICAgaWYoc2VyaWVzW2ldLnR5cGUgPT0gU2VyaWVzVHlwZS50aW1lU2VyaWVzKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc2VyaWVOYW1lID0gc2VyaWVzW2ldLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VyaWVTZWxlY3Rpb25zLnB1c2goe2Rpc3BsYXlWYWx1ZTogc2VyaWVOYW1lLCB2YWx1ZTogc2VyaWVOYW1lfSk7XHJcblx0XHQgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2VyaWVTZWxlY3Rpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0T3V0cHV0RGF0YXNPZlBhcmVudCgpOiBBcnJheTxTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25PdXRwdXREYXRhPntcclxuICAgICAgICBsZXQgb3V0cHV0RGF0YXMgPSBuZXcgQXJyYXk8U2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uT3V0cHV0RGF0YT4oKTtcclxuICAgICAgICBpZih0aGlzLl9wYXJlbnQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgbGV0IHBhcmVudENoaWxkcyA9IHRoaXMuX3BhcmVudC5nZXRDaGlsZHMoKTtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGkgPCBwYXJlbnRDaGlsZHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgaWYocGFyZW50Q2hpbGRzW2ldIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uT3V0cHV0RGF0YSl7XHJcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0RGF0YXMucHVzaChwYXJlbnRDaGlsZHNbaV0gYXMgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uT3V0cHV0RGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG91dHB1dERhdGFzO1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuIl19