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
define(["require", "exports", "../common/signal/serieNode", "./eventSignalManagerDataChangedArgs", "../common/calculatorProvider/calculationDataNumber", "./signalManagerCalculatorType", "./signalManagerCalculationOutputData", "../chartManagerDataModel/seriesType", "../common/calculatorProvider/calculationDataNumberOrPoints", "../common/calculatorProvider/calculationDataString", "../common/calculatorProvider/calculationDataPoints"], function (require, exports, serieNode_1, eventSignalManagerDataChangedArgs_1, calculationDataNumber_1, signalManagerCalculatorType_1, signalManagerCalculationOutputData_1, seriesType_1, calculationDataNumberOrPoints_1, calculationDataString_1, calculationDataPoints_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SignalManagerCalculationInputData = /** @class */ (function (_super) {
        __extends(SignalManagerCalculationInputData, _super);
        /**
         * Creates an instance of SignalManagerCalculationInputData.
         * @param {TCalculationData} calculationData
         * @param {boolean} isInput
         * @memberof SignalManagerCalculationInputData
         */
        function SignalManagerCalculationInputData(calculationData) {
            var _this = _super.call(this, "", undefined) || this;
            _this.onlyValuesFromListAreAllowed = false;
            _this.dropPossible = false;
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
        /**
         * Returns the value of the calculation input written in the cell (rowdata)
         * Added for html
         * @type {string}
         * @memberof SignalManagerCalculationInputData
         */
        SignalManagerCalculationInputData.prototype.getRawValue = function () {
            return this._value;
        };
        Object.defineProperty(SignalManagerCalculationInputData.prototype, "value", {
            /**
             * Returns the value of this calculation input
             *
             * @type {string}
             * @memberof SignalManagerCalculationInputData
             */
            get: function () {
                return this.calculationData.getDisplayValue(this._value);
            },
            /**
             * Sets the value of this calculation input
             *
             * @memberof SignalManagerCalculationInputData
             */
            set: function (value) {
                var oldValue = this._value;
                this._value = this.calculationData.getRawValueToDisplayValue(value);
                this.onDataChanged(this, new eventSignalManagerDataChangedArgs_1.EventSignalManagerDataChangedArgs(eventSignalManagerDataChangedArgs_1.SignalManagerAction.valueChanged, value, oldValue));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculationInputData.prototype, "nodeType", {
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
         * Sets the value of the signalCalculationData to the calculation data (NOT FOR serie names in signal calculation data; only for strings, numerics, ...)
         * Resets an old serie to undefined if it was used before in this SignalManagerCalculation data.
         *
         * @private
         * @param {SignalManagerCalculationInputData} signalCalculationData
         * @param {CalculationData} calculationData
         * @memberof SignalManagerCalculatorType
         */
        SignalManagerCalculationInputData.prototype.setSignalCalculationValueToCalculationData = function (calculationData) {
            calculationData.value = this.getRawValue();
            if (calculationData instanceof calculationDataNumber_1.CalculationDataNumber || calculationData instanceof calculationDataNumberOrPoints_1.CalculationDataNumberOrPoints) {
                calculationData.setData(parseFloat(calculationData.value)); // Set available number data
            }
            else if (calculationData instanceof calculationDataString_1.CalculationDataString) {
                calculationData.setData(calculationData.value); // Set available string data
            }
            else if (calculationData instanceof calculationDataPoints_1.CalculationDataPoints) {
                calculationData.setData(new Array()); // No signal data available, set empty points
            }
            // Remove current used serie from calculationData
            this.serie = undefined;
        };
        SignalManagerCalculationInputData.prototype.setSignalCalculationValueToCalculationDataWithSerieData = function (serie, calculationData) {
            calculationData.value = this.value;
            calculationData.type = serie.type;
            if (calculationData instanceof calculationDataPoints_1.CalculationDataPoints || calculationData instanceof calculationDataNumberOrPoints_1.CalculationDataNumberOrPoints) {
                calculationData.setData(serie.rawPoints);
            }
            // Add current used signal to calculationData
            this.serie = serie;
        };
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
         * Returns a list(with displayValue and value) of all series from the parent serie group
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvc2lnbmFsTWFuYWdlckRhdGFNb2RlbC9zaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQWdCQTtRQUF1RCxxREFBUztRQTBNNUQ7Ozs7O1dBS0c7UUFDSCwyQ0FBWSxlQUFpQztZQUE3QyxZQUNJLGtCQUFNLEVBQUUsRUFBRSxTQUFTLENBQUMsU0FPdkI7WUF0TkQsa0NBQTRCLEdBQVksS0FBSyxDQUFDO1lBQzlDLGtCQUFZLEdBQVksS0FBSyxDQUFDO1lBK00xQixLQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztZQUN2QyxJQUFHLEtBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxJQUFJLFNBQVMsRUFBQztnQkFDN0MsS0FBSSxDQUFDLDRCQUE0QixHQUFHLEtBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLDRCQUE0QixDQUFDO2FBQ3JHO1lBQ0QsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQztZQUN6QyxLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQzs7UUFDM0IsQ0FBQztRQTFNRCxzQkFBVyxxREFBTTtZQVBqQjs7Ozs7O2VBTUc7aUJBQ0g7Z0JBQ0ksSUFBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sSUFBSSxTQUFTLEVBQUM7b0JBQ3hDLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUM7aUJBQ3RDO3FCQUNJLElBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLElBQUksU0FBUyxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLGNBQWMsSUFBSSxJQUFJLEVBQUM7b0JBQzdHLE9BQU8sSUFBSSxDQUFDLGtC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QUFXLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQXVDLENBQUMsQ0FBQztxQkFDM0U7aUJBQ0o7YUFDSjtZQUNELE9BQU8sV0FBVyxDQUFDO1FBQ3ZCLENBQUM7UUFFTCx3Q0FBQztJQUFELENBQUMsQUFuU0QsQ0FBdUQscUJBQVMsR0FtUy9EO0lBblNZLDhFQUFpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNlcmllTm9kZSwgTm9kZVR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL3NpZ25hbC9zZXJpZU5vZGVcIjtcclxuaW1wb3J0IHsgU2lnbmFsTWFuYWdlckFjdGlvbiwgRXZlbnRTaWduYWxNYW5hZ2VyRGF0YUNoYW5nZWRBcmdzIH0gZnJvbSBcIi4vZXZlbnRTaWduYWxNYW5hZ2VyRGF0YUNoYW5nZWRBcmdzXCI7XHJcbmltcG9ydCB7IElTZXJpZUNvbnRhaW5lciB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy9zZXJpZUNvbnRhaW5lckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFOdW1iZXIgfSBmcm9tIFwiLi4vY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdGlvbkRhdGFOdW1iZXJcIjtcclxuaW1wb3J0IHsgSUNlbGxJbmZvIH0gZnJvbSBcIi4uLy4uL3dpZGdldHMvY29tbW9uL2ludGVyZmFjZXMvY2VsbEluZm9JbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVZhbHVlTGlzdEl0ZW0gfSBmcm9tIFwiLi4vLi4vY29tbW9uL2ludGVyZmFjZXMvdmFsdWVMaXN0SXRlbUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRvclR5cGUgfSBmcm9tIFwiLi9zaWduYWxNYW5hZ2VyQ2FsY3VsYXRvclR5cGVcIjtcclxuaW1wb3J0IHsgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uT3V0cHV0RGF0YSB9IGZyb20gXCIuL3NpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbk91dHB1dERhdGFcIjtcclxuaW1wb3J0IHsgU2VyaWVzVHlwZSB9IGZyb20gXCIuLi9jaGFydE1hbmFnZXJEYXRhTW9kZWwvc2VyaWVzVHlwZVwiO1xyXG5pbXBvcnQgeyBUQ2FsY3VsYXRpb25EYXRhLCBDYWxjdWxhdGlvbkRhdGEgfSBmcm9tIFwiLi4vY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdGlvbkRhdGFcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHMgfSBmcm9tIFwiLi4vY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50c1wiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFTdHJpbmcgfSBmcm9tIFwiLi4vY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdGlvbkRhdGFTdHJpbmdcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhUG9pbnRzIH0gZnJvbSBcIi4uL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRpb25EYXRhUG9pbnRzXCI7XHJcbmltcG9ydCB7IElQb2ludCB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy9wb2ludEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4uL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9iYXNlU2VyaWVzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhIGV4dGVuZHMgU2VyaWVOb2RlIGltcGxlbWVudHMgSUNlbGxJbmZve1xyXG4gICAgY2FsY3VsYXRpb25EYXRhOiBUQ2FsY3VsYXRpb25EYXRhO1xyXG4gICAgb25seVZhbHVlc0Zyb21MaXN0QXJlQWxsb3dlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgZHJvcFBvc3NpYmxlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgcHJpdmF0ZSBfdmFsdWU6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSBsaXN0IHdpdGggYXZhaWxhYmxlIHZhbHVlcyBmb3IgdGhpcyBjYWxjdWxhdGlvbiBpbnB1dFxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUgeyhBcnJheTxJVmFsdWVMaXN0SXRlbT58dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCB2YWx1ZXMoKTogQXJyYXk8SVZhbHVlTGlzdEl0ZW0+fHVuZGVmaW5lZCB7XHJcbiAgICAgICAgaWYodGhpcy5jYWxjdWxhdGlvbkRhdGEudmFsdWVzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNhbGN1bGF0aW9uRGF0YS52YWx1ZXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5jYWxjdWxhdGlvbkRhdGEuZGlzcGxheUluZm8gIT0gdW5kZWZpbmVkICYmIHRoaXMuY2FsY3VsYXRpb25EYXRhLmRpc3BsYXlJbmZvLnNob3dTaWduYWxMaXN0ID09IHRydWUpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRTZXJpZVNlbGVjdGlvbnMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkYXRhdHlwZSBvZiB0aGlzIGNhbGN1bGF0aW9uIGlucHV0XHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGRhdGFUeXBlTmFtZSgpOiBzdHJpbmd7XHJcbiAgICAgICAgaWYodGhpcy5jYWxjdWxhdGlvbkRhdGEgaW5zdGFuY2VvZiBDYWxjdWxhdGlvbkRhdGFOdW1iZXIpe1xyXG4gICAgICAgICAgICByZXR1cm4gXCJGbG9hdFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gXCJTdHJpbmdcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBtaW5WYWx1ZSgpOiBudW1iZXJ8dW5kZWZpbmVke1xyXG4gICAgICAgIGlmKHRoaXMuY2FsY3VsYXRpb25EYXRhLmRpc3BsYXlJbmZvICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNhbGN1bGF0aW9uRGF0YS5kaXNwbGF5SW5mby5taW5WYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGdldCBtYXhWYWx1ZSgpOiBudW1iZXJ8dW5kZWZpbmVke1xyXG4gICAgICAgIGlmKHRoaXMuY2FsY3VsYXRpb25EYXRhLmRpc3BsYXlJbmZvICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNhbGN1bGF0aW9uRGF0YS5kaXNwbGF5SW5mby5tYXhWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHBhcmVudCBvZiB0aGlzIGNhbGN1bGF0aW9uIGlucHV0IFxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHsoSVNlcmllQ29udGFpbmVyIHwgdW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBwYXJlbnQoKTogSVNlcmllQ29udGFpbmVyIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGFyZW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgcGFyZW50IG9mIHRoaXMgY2FsY3VsYXRpb24gaW5wdXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgcGFyZW50KHZhbHVlOiBJU2VyaWVDb250YWluZXIgfCB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLl9wYXJlbnQgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIG5hbWUgb2YgdGhpcyBjYWxjdWxhdGlvbiBpbnB1dFxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBuYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IGRhdGFNb2RlbCA9IHRoaXMuZ2V0RGF0YU1vZGVsKCk7XHJcbiAgICAgICAgaWYoZGF0YU1vZGVsICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGlmKGRhdGFNb2RlbC5lZGl0TW9kZUFjdGl2ZSA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNhbGN1bGF0aW9uRGF0YS5nZXREaXNwbGF5TmFtZSgpOyAvLyBTaG93IHRoZSBkaXNwbGF5IG5hbWUgb2YgaW5wdXQvb3V0cHV0IHBhcmFtZXRlciBpbiBlZGl0IG1vZGVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTsgIC8vIFNob3cgb25seSB0aGUgdmFsdWUgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZXNjcmlwdGlvbiBvZiB0aGlzIGNhbGN1bGF0aW9uIGlucHV0XHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGRlc2NyaXB0aW9uKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FsY3VsYXRpb25EYXRhLmRlc2NyaXB0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgY29sb3Igb2YgdGhpcyBjYWxjdWxhdGlvbiBpbnB1dCA9PiBjdXJyZW50bHkgbm8gY29sb3IgbmVlZGVkIGZvciBpbnB1dHNcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGNvbG9yKCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGNvbG9yIG9mIHRoaXMgY2FsY3VsYXRpb24gaW5wdXQgPT4gY3VycmVudGx5IG5vIGNvbG9yIG5lZWRlZCBmb3IgaW5wdXRzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IGNvbG9yKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICBpZih0aGlzLnNlcmllICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2VyaWUuY29sb3IgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5vbkRhdGFDaGFuZ2VkKHRoaXMsIG5ldyBFdmVudFNpZ25hbE1hbmFnZXJEYXRhQ2hhbmdlZEFyZ3MoU2lnbmFsTWFuYWdlckFjdGlvbi5jb2xvckNoYW5nZWQsIHZhbHVlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGUgY2FsY3VsYXRpb24gaW5wdXQgd3JpdHRlbiBpbiB0aGUgY2VsbCAocm93ZGF0YSlcclxuICAgICAqIEFkZGVkIGZvciBodG1sXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0UmF3VmFsdWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdmFsdWUgb2YgdGhpcyBjYWxjdWxhdGlvbiBpbnB1dCBcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHZhbHVlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FsY3VsYXRpb25EYXRhLmdldERpc3BsYXlWYWx1ZSh0aGlzLl92YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSB2YWx1ZSBvZiB0aGlzIGNhbGN1bGF0aW9uIGlucHV0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IHZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgb2xkVmFsdWUgPSB0aGlzLl92YWx1ZTtcclxuICAgICAgICB0aGlzLl92YWx1ZSA9IHRoaXMuY2FsY3VsYXRpb25EYXRhLmdldFJhd1ZhbHVlVG9EaXNwbGF5VmFsdWUodmFsdWUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMub25EYXRhQ2hhbmdlZCh0aGlzLCBuZXcgRXZlbnRTaWduYWxNYW5hZ2VyRGF0YUNoYW5nZWRBcmdzKFNpZ25hbE1hbmFnZXJBY3Rpb24udmFsdWVDaGFuZ2VkLCB2YWx1ZSwgb2xkVmFsdWUpKTtcclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHlwZSBvZiB0aGlzIGNhbGN1bGF0aW9uIGlucHV0XHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0IG5vZGVUeXBlKCk6IE5vZGVUeXBle1xyXG4gICAgICAgIHJldHVybiBOb2RlVHlwZS5jYWxjdWxhdGlvbklucHV0UGFyYW07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSB2YWx1ZSBvZiB0aGUgc2lnbmFsQ2FsY3VsYXRpb25EYXRhIHRvIHRoZSBjYWxjdWxhdGlvbiBkYXRhIChOT1QgRk9SIHNlcmllIG5hbWVzIGluIHNpZ25hbCBjYWxjdWxhdGlvbiBkYXRhOyBvbmx5IGZvciBzdHJpbmdzLCBudW1lcmljcywgLi4uKVxyXG4gICAgICogUmVzZXRzIGFuIG9sZCBzZXJpZSB0byB1bmRlZmluZWQgaWYgaXQgd2FzIHVzZWQgYmVmb3JlIGluIHRoaXMgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uIGRhdGEuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7U2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhfSBzaWduYWxDYWxjdWxhdGlvbkRhdGFcclxuICAgICAqIEBwYXJhbSB7Q2FsY3VsYXRpb25EYXRhfSBjYWxjdWxhdGlvbkRhdGFcclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRvclR5cGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFNpZ25hbENhbGN1bGF0aW9uVmFsdWVUb0NhbGN1bGF0aW9uRGF0YShjYWxjdWxhdGlvbkRhdGE6IENhbGN1bGF0aW9uRGF0YSl7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY2FsY3VsYXRpb25EYXRhLnZhbHVlID0gdGhpcy5nZXRSYXdWYWx1ZSgpO1xyXG4gICAgICAgIGlmKGNhbGN1bGF0aW9uRGF0YSBpbnN0YW5jZW9mIENhbGN1bGF0aW9uRGF0YU51bWJlciB8fCBjYWxjdWxhdGlvbkRhdGEgaW5zdGFuY2VvZiBDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cykge1xyXG4gICAgICAgICAgICBjYWxjdWxhdGlvbkRhdGEuc2V0RGF0YShwYXJzZUZsb2F0KGNhbGN1bGF0aW9uRGF0YS52YWx1ZSkpOyAvLyBTZXQgYXZhaWxhYmxlIG51bWJlciBkYXRhXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGNhbGN1bGF0aW9uRGF0YSBpbnN0YW5jZW9mIENhbGN1bGF0aW9uRGF0YVN0cmluZyl7XHJcbiAgICAgICAgICAgIGNhbGN1bGF0aW9uRGF0YS5zZXREYXRhKGNhbGN1bGF0aW9uRGF0YS52YWx1ZSk7ICAgLy8gU2V0IGF2YWlsYWJsZSBzdHJpbmcgZGF0YVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjYWxjdWxhdGlvbkRhdGEgaW5zdGFuY2VvZiBDYWxjdWxhdGlvbkRhdGFQb2ludHMpe1xyXG4gICAgICAgICAgICBjYWxjdWxhdGlvbkRhdGEuc2V0RGF0YShuZXcgQXJyYXk8SVBvaW50PigpKTsgICAvLyBObyBzaWduYWwgZGF0YSBhdmFpbGFibGUsIHNldCBlbXB0eSBwb2ludHNcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gUmVtb3ZlIGN1cnJlbnQgdXNlZCBzZXJpZSBmcm9tIGNhbGN1bGF0aW9uRGF0YVxyXG4gICAgICAgIHRoaXMuc2VyaWUgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFNpZ25hbENhbGN1bGF0aW9uVmFsdWVUb0NhbGN1bGF0aW9uRGF0YVdpdGhTZXJpZURhdGEoc2VyaWU6IEJhc2VTZXJpZXMsIGNhbGN1bGF0aW9uRGF0YTogVENhbGN1bGF0aW9uRGF0YSl7XHJcbiAgICAgICAgY2FsY3VsYXRpb25EYXRhLnZhbHVlID0gdGhpcy52YWx1ZTtcclxuICAgICAgICBjYWxjdWxhdGlvbkRhdGEudHlwZSA9IHNlcmllLnR5cGU7XHJcbiAgICAgICAgaWYoY2FsY3VsYXRpb25EYXRhIGluc3RhbmNlb2YgQ2FsY3VsYXRpb25EYXRhUG9pbnRzIHx8IGNhbGN1bGF0aW9uRGF0YSBpbnN0YW5jZW9mIENhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzKXtcclxuICAgICAgICAgICAgY2FsY3VsYXRpb25EYXRhLnNldERhdGEoc2VyaWUucmF3UG9pbnRzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQWRkIGN1cnJlbnQgdXNlZCBzaWduYWwgdG8gY2FsY3VsYXRpb25EYXRhXHJcbiAgICAgICAgdGhpcy5zZXJpZSA9IHNlcmllO1xyXG4gICAgfSBcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YS5cclxuICAgICAqIEBwYXJhbSB7VENhbGN1bGF0aW9uRGF0YX0gY2FsY3VsYXRpb25EYXRhXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzSW5wdXRcclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGFcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoY2FsY3VsYXRpb25EYXRhOiBUQ2FsY3VsYXRpb25EYXRhKXtcclxuICAgICAgICBzdXBlcihcIlwiLCB1bmRlZmluZWQpO1xyXG4gICAgICAgIHRoaXMuY2FsY3VsYXRpb25EYXRhID0gY2FsY3VsYXRpb25EYXRhO1xyXG4gICAgICAgIGlmKHRoaXMuY2FsY3VsYXRpb25EYXRhLmRpc3BsYXlJbmZvICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMub25seVZhbHVlc0Zyb21MaXN0QXJlQWxsb3dlZCA9IHRoaXMuY2FsY3VsYXRpb25EYXRhLmRpc3BsYXlJbmZvLm9ubHlWYWx1ZXNGcm9tTGlzdEFyZUFsbG93ZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdGhpcy5jYWxjdWxhdGlvbkRhdGEudmFsdWU7XHJcbiAgICAgICAgdGhpcy5jYW5EZWxldGUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYWxsIGEgbGlzdChkaXNwbGF5VmFsdWUsIHZhbHVlKSBvZiB0aGUgc2VyaWVzIHdoaWNoIGFyZSBhdmFpbGFibGUgYXQgdGhlIHBhcmVudCBzZXJpZSBncm91cCwgb3V0cHV0IHNlcmllcyBvZiB0aGUgY3VycmVudCBjYWxjdWxhdGlvbiB3aWxsIGJlIHJlbW92ZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge0FycmF5PGFueT59XHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0U2VyaWVTZWxlY3Rpb25zKCk6IEFycmF5PGFueT57XHJcbiAgICAgICAgLy8gZ2V0IGFsbCBhdmFpbGFibGUgc2VyaWVzIGZyb20gcGFyZW50IHNlcmllR3JvdXBcclxuICAgICAgICBsZXQgc2VyaWVTZWxlY3Rpb25zID0gdGhpcy5nZXRBbGxTZXJpZXNGcm9tUGFyZW50U2VyaWVHcm91cCgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFJlbW92ZSBvd24gb3V0cHV0IHNlcmllcyBmcm9tIHRoaXMgY2FsY3VsYXRpb25cclxuICAgICAgICBsZXQgb3V0cHV0U2VyaWVEYXRhID0gdGhpcy5nZXRPdXRwdXREYXRhc09mUGFyZW50KClbMF07Ly8gVE9ETzogbXVsdGkgb3V0cHV0XHJcbiAgICAgICAgaWYob3V0cHV0U2VyaWVEYXRhICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGlmKG91dHB1dFNlcmllRGF0YS5zZXJpZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGkgPCBzZXJpZVNlbGVjdGlvbnMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlcmllU2VsZWN0aW9uc1tpXS52YWx1ZSA9PSBvdXRwdXRTZXJpZURhdGEuc2VyaWUubmFtZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcmllU2VsZWN0aW9ucy5zcGxpY2UoaSwxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaS0tOyAgICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJlbW92ZSBzZXJpZXMgd2hpY2ggcmVzdWx0cyBpbiBhIGN5Y2xlIG9mIGNhbGN1bGF0aW9uc1xyXG4gICAgICAgIGlmKHRoaXMucGFyZW50IGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlKXtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGkgPCBzZXJpZVNlbGVjdGlvbnMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5wYXJlbnQhLmN5Y2xlRm91bmQoc2VyaWVTZWxlY3Rpb25zW2ldLnZhbHVlKSA9PSB0cnVlKXsgLy8gY2hlY2sgZm9yIGN5Y2xlXHJcbiAgICAgICAgICAgICAgICAgICAgc2VyaWVTZWxlY3Rpb25zLnNwbGljZShpLDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGktLTsgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzZXJpZVNlbGVjdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgbGlzdCh3aXRoIGRpc3BsYXlWYWx1ZSBhbmQgdmFsdWUpIG9mIGFsbCBzZXJpZXMgZnJvbSB0aGUgcGFyZW50IHNlcmllIGdyb3VwXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxhbnk+fVxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldEFsbFNlcmllc0Zyb21QYXJlbnRTZXJpZUdyb3VwKCk6IEFycmF5PGFueT57XHJcbiAgICAgICAgbGV0IHNlcmllU2VsZWN0aW9ucyA9IG5ldyBBcnJheTxhbnk+KCk7XHJcbiAgICAgICAgbGV0IHNlcmllR3JvdXAgPSB0aGlzLmdldFNlcmllR3JvdXAoKTtcclxuICAgICAgICBpZihzZXJpZUdyb3VwICE9IHVuZGVmaW5lZCl7IC8vIElzIGEgc2VyaWUgZ3JvdXAgYXZhaWxhYmxlXHJcbiAgICAgICAgICAgIGxldCBzZXJpZXMgPSBzZXJpZUdyb3VwLmdldFNlcmllcygpO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaSA8IHNlcmllcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAvLyBTbyBmYXIsIG9ubHkgYWxsb3dlZCB0byB1c2UgeXQgc2VyaWVzIGFzIGlucHV0IFxyXG5cdFx0ICAgICAgICBpZihzZXJpZXNbaV0udHlwZSA9PSBTZXJpZXNUeXBlLnRpbWVTZXJpZXMpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzZXJpZU5hbWUgPSBzZXJpZXNbaV0ubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICBzZXJpZVNlbGVjdGlvbnMucHVzaCh7ZGlzcGxheVZhbHVlOiBzZXJpZU5hbWUsIHZhbHVlOiBzZXJpZU5hbWV9KTtcclxuXHRcdCAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZXJpZVNlbGVjdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRPdXRwdXREYXRhc09mUGFyZW50KCk6IEFycmF5PFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbk91dHB1dERhdGE+e1xyXG4gICAgICAgIGxldCBvdXRwdXREYXRhcyA9IG5ldyBBcnJheTxTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25PdXRwdXREYXRhPigpO1xyXG4gICAgICAgIGlmKHRoaXMuX3BhcmVudCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBsZXQgcGFyZW50Q2hpbGRzID0gdGhpcy5fcGFyZW50LmdldENoaWxkcygpO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaSA8IHBhcmVudENoaWxkcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBpZihwYXJlbnRDaGlsZHNbaV0gaW5zdGFuY2VvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25PdXRwdXREYXRhKXtcclxuICAgICAgICAgICAgICAgICAgICBvdXRwdXREYXRhcy5wdXNoKHBhcmVudENoaWxkc1tpXSBhcyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25PdXRwdXREYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb3V0cHV0RGF0YXM7XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG4iXX0=