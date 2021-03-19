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
define(["require", "exports", "../../common/dateTimeHelper", "../common/calculation/calculation", "./signalManagerCalculatorType", "../common/signal/serieContainer", "./signalManagerCalculationInputData", "../common/calculatorProvider/calculationDataPoints", "../common/calculatorProvider/calculationDataNumberOrPoints", "../common/signal/serieNode", "../chartManagerDataModel/seriesType"], function (require, exports, dateTimeHelper_1, calculation_1, signalManagerCalculatorType_1, serieContainer_1, signalManagerCalculationInputData_1, calculationDataPoints_1, calculationDataNumberOrPoints_1, serieNode_1, seriesType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SignalManagerCalculation = /** @class */ (function (_super) {
        __extends(SignalManagerCalculation, _super);
        /**
         * Creates an instance of SignalManagerCalculation.
         * @param {string} name
         * @memberof SignalManagerCalculation
         */
        function SignalManagerCalculation(name) {
            var _this = _super.call(this, name) || this;
            _this.id = name + SignalManagerCalculation.uniqueId;
            SignalManagerCalculation.uniqueId++;
            _this._calculation = new calculation_1.Calculation("select type");
            // Init => Add Type for calculation
            _this.calculatorType = new signalManagerCalculatorType_1.SignalManagerCalculatorType("Algorithm", "select type");
            _this.addSerieContainer(_this.calculatorType, -1);
            return _this;
        }
        Object.defineProperty(SignalManagerCalculation.prototype, "validNode", {
            get: function () {
                var outputData = this.getOutputCalculationData();
                if (outputData.length > 0) {
                    if (outputData[0].serie != undefined) {
                        return outputData[0].serie.rawPointsValid;
                    }
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculation.prototype, "visibleChilds", {
            /**
             * Returns only the visible childs (e.g visible childs only available in edit mode)
             *
             * @readonly
             * @type {(ISerieNode[]|undefined)}
             * @memberof SignalManagerCalculation
             */
            get: function () {
                var dataModel = this.getDataModel();
                if (dataModel != undefined) {
                    if (dataModel.editModeActive == false) {
                        return undefined;
                    }
                }
                return this.childs;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculation.prototype, "name", {
            get: function () {
                var data = this.getOutputCalculationData();
                if (data.length > 0) {
                    // TODO: multi output ,use not only the first output
                    return data[0].serie.name;
                }
                if (this._name != undefined) {
                    return this._name;
                }
                return "";
            },
            set: function (name) {
                this._name = name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculation.prototype, "serie", {
            get: function () {
                var data = this.getOutputCalculationData();
                if (data.length > 0) {
                    // TODO: multi output ,not only the first output
                    return data[0].serie;
                }
                return undefined;
            },
            set: function (value) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculation.prototype, "color", {
            get: function () {
                var data = this.getOutputCalculationData();
                if (data.length > 0) {
                    // TODO: multi output ,not only the first output
                    return data[0].color;
                }
                return undefined;
            },
            set: function (color) {
                var data = this.getOutputCalculationData();
                if (data.length > 0 && color != undefined) {
                    // TODO: multi output ,not only the first output
                    data[0].color = color;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculation.prototype, "startTriggerTime", {
            get: function () {
                var serieGroup = this.getSerieGroup();
                if (serieGroup != undefined) {
                    return serieGroup.startTriggerTime;
                }
                return 0; // Not start trigger available
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculation.prototype, "startTriggerTimeFormated", {
            get: function () {
                var serieGroup = this.getSerieGroup();
                if (serieGroup != undefined) {
                    return dateTimeHelper_1.DateTimeHelper.getDateTime(serieGroup.startTriggerTime);
                }
                return ""; // Not start trigger info available
            },
            enumerable: true,
            configurable: true
        });
        SignalManagerCalculation.prototype.dispose = function () {
            this.calculatorType.dispose();
            _super.prototype.dispose.call(this);
        };
        /**
         * Removes all references to the given series from the calculation
         *
         * @param {BaseSeries} serie
         * @memberof SignalManagerCalculation
         */
        SignalManagerCalculation.prototype.removeReferencesToSerie = function (serie) {
            this.calculatorType.removeReferenceToSerie(serie);
        };
        Object.defineProperty(SignalManagerCalculation.prototype, "nodeType", {
            get: function () {
                var dataModel = this.getDataModel();
                if (dataModel != undefined) {
                    if (dataModel.editModeActive == true) {
                        return serieNode_1.NodeType.container;
                    }
                }
                return serieNode_1.NodeType.series;
            },
            enumerable: true,
            configurable: true
        });
        SignalManagerCalculation.prototype.calculate = function () {
            this.calculatorType.calculate();
        };
        /**
         * Sets the calculator type(e.g. "add", "sub", ...)
         *
         * @param {string} calculatorTypeId
         * @memberof SignalManagerCalculation
         */
        SignalManagerCalculation.prototype.setCalculatorType = function (calculatorTypeId) {
            this.calculatorType.value = calculatorTypeId;
            // Raise data changed event
            this.onDataChanged(this, calculatorTypeId); // TODO: use eventargs
        };
        /**
         * Sets the given value to the inputparameter with given index(TODO: should be changed to id of input parameter instead of index)
         *
         * @param {number} index
         * @param {*} value
         * @memberof SignalManagerCalculation
         */
        SignalManagerCalculation.prototype.setValue = function (index, value) {
            var inputData = this.calculatorType.getInputCalculationData()[index];
            inputData.value = value;
        };
        SignalManagerCalculation.prototype.setOutputSignalName = function (name) {
            var outputDatas = this.getOutputCalculationData();
            if (outputDatas != undefined && outputDatas.length > 0) {
                outputDatas[0].value = name;
            }
        };
        /**
         * Clones the calculation
         *
         * @returns
         * @memberof SignalManagerCalculation
         */
        SignalManagerCalculation.prototype.clone = function () {
            // Clone object
            var clonedSignalCalculation = new SignalManagerCalculation(this.name);
            clonedSignalCalculation._calculation = this._calculation;
            // Clone calculator type child container
            clonedSignalCalculation.childs.splice(0, 1); // TODO: Implement RemoveSerieContainer
            var calculatorType = this.calculatorType.clone();
            clonedSignalCalculation.calculatorType = calculatorType;
            clonedSignalCalculation.addSerieContainer(calculatorType);
            return clonedSignalCalculation;
        };
        /**
         * Needed to update the input series of this calculations to the new series of the new serieGroup
         *
         * @param {SerieGroup} serieGroup
         * @memberof SignalManagerCalculation
         */
        SignalManagerCalculation.prototype.updateInputData = function (serieGroup) {
            var calculationInputDatas = this.getInputCalculationData();
            for (var j = 0; j < calculationInputDatas.length; j++) {
                var inputData = calculationInputDatas[j];
                if (inputData.serie != undefined) {
                    // find serie in new cloned serie group by name ...
                    var foundSerie = serieGroup.getSerie(inputData.serie.name);
                    if (foundSerie != undefined) {
                        // ... and set the new serie
                        inputData.serie = foundSerie;
                    }
                }
            }
        };
        /**
         * Sets(or resets) a flag at all inputs of this calculation where a drop of the given series would be possible
         *
         * @param {boolean} activate
         * @param {BaseSeries} series
         * @memberof SignalManagerCalculation
         */
        SignalManagerCalculation.prototype.setDropLocations = function (activate, series) {
            var _this = this;
            if (this.visibleChilds != undefined) {
                if (this.visibleChilds.length > 0) {
                    var calculationType = this.visibleChilds[0];
                    calculationType.visibleChilds.forEach(function (calculationData) {
                        if (calculationData instanceof signalManagerCalculationInputData_1.SignalManagerCalculationInputData) {
                            if (_this.isSeriesDropAllowedAtCurrentInputItem(calculationData, series) == true) {
                                calculationData.dropPossible = activate;
                            }
                        }
                    });
                }
            }
        };
        /**
         * Checks if a drop of a series is possible for the given calculation input
         *
         * @private
         * @param {SignalManagerCalculationInputData} inputItem
         * @param {BaseSeries} serie
         * @returns {boolean}
         * @memberof SignalManagerCalculation
         */
        SignalManagerCalculation.prototype.isSeriesDropAllowedAtCurrentInputItem = function (inputItem, serie) {
            // It is not allowed to use xy or fft series as input 
            if (serie.type == seriesType_1.SeriesType.xySeries || serie.type == seriesType_1.SeriesType.fftSeries) {
                return false;
            }
            // It is not allowed to use fft series as input for FFT calculation
            // if(inputItem.parent instanceof SignalManagerCalculatorType){
            //     if(inputItem.parent.value == 'FFT' && serie.type == SeriesType.fftSeries) {
            //         return false;
            //     }
            // }
            // Series can only be dropped at an input where serie(datapoints) are allowed
            if (!(inputItem.calculationData instanceof calculationDataPoints_1.CalculationDataPoints) && !(inputItem.calculationData instanceof calculationDataNumberOrPoints_1.CalculationDataNumberOrPoints)) {
                return false;
            }
            var outputSeriesOfCalculation = inputItem.parent.getSeries();
            if (outputSeriesOfCalculation.indexOf(serie) == -1) { // OutputSeries of this calculation are not allowed for this calculation as input(circular reference)
                if (inputItem.getSerieGroup() == serie.parent) { // Check for same serie group
                    if (inputItem.parent instanceof signalManagerCalculatorType_1.SignalManagerCalculatorType) {
                        if (inputItem.parent.cycleFound(serie.name) == false) { // check for cycle
                            return true;
                        }
                    }
                }
            }
            return false;
        };
        /**
         * Returns all calculation input datas
         *
         * @returns {Array<SignalManagerCalculationInputData>}
         * @memberof SignalManagerCalculation
         */
        SignalManagerCalculation.prototype.getInputCalculationData = function () {
            return this.calculatorType.getInputCalculationData();
        };
        /**
         * Returns all calculation output datas
         *
         * @returns {Array<SignalManagerCalculationOutputData>}
         * @memberof SignalManagerCalculation
         */
        SignalManagerCalculation.prototype.getOutputCalculationData = function () {
            var outputData = this.calculatorType.getFirstOutputCalculationData();
            if (outputData != undefined) {
                return [outputData];
            }
            return new Array();
        };
        SignalManagerCalculation.uniqueId = 0; // TODO: use unique id 
        return SignalManagerCalculation;
    }(serieContainer_1.SerieContainer));
    exports.SignalManagerCalculation = SignalManagerCalculation;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvc2lnbmFsTWFuYWdlckRhdGFNb2RlbC9zaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQWVBO1FBQThDLDRDQUFjO1FBbUd4RDs7OztXQUlHO1FBQ0gsa0NBQVksSUFBWTtZQUF4QixZQUNJLGtCQUFNLElBQUksQ0FBQyxTQVVkO1lBUkcsS0FBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLEdBQUcsd0JBQXdCLENBQUMsUUFBUSxDQUFDO1lBQ25ELHdCQUF3QixDQUFDLFFBQVEsRUFBRSxDQUFDO1lBRXBDLEtBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSx5QkFBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBRW5ELG1DQUFtQztZQUNuQyxLQUFJLENBQUMsY0FBYyxHQUFHLElBQUkseURBQTJCLENBQUMsV0FBVyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQ2xGLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFJLENBQUMsY0FBYyxFQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7O1FBQ3JELENBQUM7UUF6R0Qsc0JBQVcsK0NBQVM7aUJBQXBCO2dCQUNJLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO2dCQUNqRCxJQUFHLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDO29CQUNyQixJQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksU0FBUyxFQUFDO3dCQUNoQyxPQUFPLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDO3FCQUM3QztpQkFDSjtnQkFDRCxPQUFPLEtBQUssQ0FBQztZQUNqQixDQUFDOzs7V0FBQTtRQVNELHNCQUFXLG1EQUFhO1lBUHhCOzs7Ozs7ZUFN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YjtZQUNELElBQUkseUJBQXlCLEdBQUcsU0FBUyxDQUFDLE1BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUM5RCxJQUFHLHlCQUF5QixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxFQUFFLHFHQUFxRztnQkFDeEosSUFBRyxTQUFTLENBQUMsYUFBYSxFQUFFLElBQUksS0FBSyxDQUFDLE1BQU0sRUFBQyxFQUFFLDZCQUE2QjtvQkFDM0UsSUFBRyxTQUFTLENBQUMsTUFBTSxZQUFZLHlEQUEyQixFQUFDO3dCQUMxRCxJQUFHLFNBQVMsQ0FBQyxNQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLEVBQUMsRUFBRSxrQkFBa0I7NEJBQ3hFLE9BQU8sSUFBSSxDQUFDO3lCQUNaO3FCQUNEO2lCQUNEO2FBQ0Q7WUFDRCxPQUFPLEtBQUssQ0FBQztRQUNkLENBQUM7UUFFRTs7Ozs7V0FLRztRQUNJLDBEQUF1QixHQUE5QjtZQUNJLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1FBQ3pELENBQUM7UUFFRDs7Ozs7V0FLRztRQUNJLDJEQUF3QixHQUEvQjtZQUNJLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsNkJBQTZCLEVBQUUsQ0FBQztZQUNyRSxJQUFHLFVBQVUsSUFBSSxTQUFTLEVBQUM7Z0JBQ3ZCLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUN2QjtZQUNELE9BQU8sSUFBSSxLQUFLLEVBQXNDLENBQUM7UUFDM0QsQ0FBQztRQXhTYyxpQ0FBUSxHQUFXLENBQUMsQ0FBQyxDQUFDLHVCQUF1QjtRQXlTaEUsK0JBQUM7S0FBQSxBQTdTRCxDQUE4QywrQkFBYyxHQTZTM0Q7SUE3U1ksNERBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGF0ZVRpbWVIZWxwZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2RhdGVUaW1lSGVscGVyXCI7XHJcbmltcG9ydCB7IElDYWxjdWxhdGlvbiB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy9jYWxjdWxhdGlvbkludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbiB9IGZyb20gXCIuLi9jb21tb24vY2FsY3VsYXRpb24vY2FsY3VsYXRpb25cIjtcclxuaW1wb3J0IHsgU2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlIH0gZnJvbSBcIi4vc2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlXCI7XHJcbmltcG9ydCB7IFNlcmllQ29udGFpbmVyIH0gZnJvbSBcIi4uL2NvbW1vbi9zaWduYWwvc2VyaWVDb250YWluZXJcIjtcclxuaW1wb3J0IHsgSVNlcmllTm9kZSB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy9zZXJpZU5vZGVJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uT3V0cHV0RGF0YSB9IGZyb20gXCIuL3NpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbk91dHB1dERhdGFcIjtcclxuaW1wb3J0IHsgQmFzZVNlcmllcyB9IGZyb20gXCIuLi9jaGFydE1hbmFnZXJEYXRhTW9kZWwvYmFzZVNlcmllc1wiO1xyXG5pbXBvcnQgeyBTZXJpZUdyb3VwIH0gZnJvbSBcIi4uL2NvbW1vbi9zaWduYWwvc2VyaWVHcm91cFwiO1xyXG5pbXBvcnQgeyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGEgfSBmcm9tIFwiLi9zaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGFcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhUG9pbnRzIH0gZnJvbSBcIi4uL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRpb25EYXRhUG9pbnRzXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzIH0gZnJvbSBcIi4uL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHNcIjtcclxuaW1wb3J0IHsgTm9kZVR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL3NpZ25hbC9zZXJpZU5vZGVcIjtcclxuaW1wb3J0IHsgU2VyaWVzVHlwZSB9IGZyb20gXCIuLi9jaGFydE1hbmFnZXJEYXRhTW9kZWwvc2VyaWVzVHlwZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbiBleHRlbmRzIFNlcmllQ29udGFpbmVye1xyXG4gICAgXHJcbiAgICBpZDogc3RyaW5nO1xyXG4gICAgICAgICAgICBcclxuICAgIHByaXZhdGUgc3RhdGljIHVuaXF1ZUlkOiBudW1iZXIgPSAwOyAvLyBUT0RPOiB1c2UgdW5pcXVlIGlkIFxyXG5cclxuICAgIHByaXZhdGUgX2NhbGN1bGF0aW9uOiBJQ2FsY3VsYXRpb247XHJcbiAgICBwcml2YXRlIGNhbGN1bGF0b3JUeXBlOiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRvclR5cGU7XHJcblxyXG5cclxuICAgIHB1YmxpYyBnZXQgdmFsaWROb2RlKCk6IGJvb2xlYW57XHJcbiAgICAgICAgbGV0IG91dHB1dERhdGEgPSB0aGlzLmdldE91dHB1dENhbGN1bGF0aW9uRGF0YSgpO1xyXG4gICAgICAgIGlmKG91dHB1dERhdGEubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIGlmKG91dHB1dERhdGFbMF0uc2VyaWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvdXRwdXREYXRhWzBdLnNlcmllLnJhd1BvaW50c1ZhbGlkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgb25seSB0aGUgdmlzaWJsZSBjaGlsZHMgKGUuZyB2aXNpYmxlIGNoaWxkcyBvbmx5IGF2YWlsYWJsZSBpbiBlZGl0IG1vZGUpXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7KElTZXJpZU5vZGVbXXx1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHZpc2libGVDaGlsZHMoKTogSVNlcmllTm9kZVtdfHVuZGVmaW5lZCB7XHJcbiAgICAgICAgbGV0IGRhdGFNb2RlbCA9IHRoaXMuZ2V0RGF0YU1vZGVsKCk7XHJcbiAgICAgICAgaWYoZGF0YU1vZGVsICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGlmKGRhdGFNb2RlbC5lZGl0TW9kZUFjdGl2ZSA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmNoaWxkcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuZ2V0T3V0cHV0Q2FsY3VsYXRpb25EYXRhKCk7IFxyXG4gICAgICAgIGlmKGRhdGEubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IG11bHRpIG91dHB1dCAsdXNlIG5vdCBvbmx5IHRoZSBmaXJzdCBvdXRwdXRcclxuICAgICAgICAgICAgcmV0dXJuIGRhdGFbMF0uc2VyaWUhLm5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuX25hbWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgbmFtZShuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHNlcmllKCk6IEJhc2VTZXJpZXN8dW5kZWZpbmVkIHtcclxuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuZ2V0T3V0cHV0Q2FsY3VsYXRpb25EYXRhKCk7IFxyXG4gICAgICAgIGlmKGRhdGEubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IG11bHRpIG91dHB1dCAsbm90IG9ubHkgdGhlIGZpcnN0IG91dHB1dFxyXG4gICAgICAgICAgIHJldHVybiBkYXRhWzBdLnNlcmllO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgc2VyaWUodmFsdWU6IEJhc2VTZXJpZXN8dW5kZWZpbmVkKSB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjb2xvcigpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5nZXRPdXRwdXRDYWxjdWxhdGlvbkRhdGEoKTsgXHJcbiAgICAgICAgaWYoZGF0YS5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgLy8gVE9ETzogbXVsdGkgb3V0cHV0ICxub3Qgb25seSB0aGUgZmlyc3Qgb3V0cHV0XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhWzBdLmNvbG9yO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgY29sb3IoY29sb3I6IHN0cmluZyB8IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5nZXRPdXRwdXRDYWxjdWxhdGlvbkRhdGEoKTsgXHJcbiAgICAgICAgaWYoZGF0YS5sZW5ndGggPiAwICYmIGNvbG9yICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IG11bHRpIG91dHB1dCAsbm90IG9ubHkgdGhlIGZpcnN0IG91dHB1dFxyXG4gICAgICAgICAgICBkYXRhWzBdLmNvbG9yID0gY29sb3I7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgc3RhcnRUcmlnZ2VyVGltZSgpOiBudW1iZXJ7XHJcbiAgICAgICAgbGV0IHNlcmllR3JvdXAgPSB0aGlzLmdldFNlcmllR3JvdXAoKTtcclxuICAgICAgICBpZihzZXJpZUdyb3VwICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiBzZXJpZUdyb3VwLnN0YXJ0VHJpZ2dlclRpbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAwOyAvLyBOb3Qgc3RhcnQgdHJpZ2dlciBhdmFpbGFibGVcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHN0YXJ0VHJpZ2dlclRpbWVGb3JtYXRlZCgpOiBzdHJpbmd7XHJcbiAgICAgICAgbGV0IHNlcmllR3JvdXAgPSB0aGlzLmdldFNlcmllR3JvdXAoKTtcclxuICAgICAgICBpZihzZXJpZUdyb3VwICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiBEYXRlVGltZUhlbHBlci5nZXREYXRlVGltZShzZXJpZUdyb3VwLnN0YXJ0VHJpZ2dlclRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJcIjsgLy8gTm90IHN0YXJ0IHRyaWdnZXIgaW5mbyBhdmFpbGFibGVcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uLlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKXtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuXHJcbiAgICAgICAgdGhpcy5pZCA9IG5hbWUgKyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb24udW5pcXVlSWQ7XHJcbiAgICAgICAgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uLnVuaXF1ZUlkKys7XHJcblxyXG4gICAgICAgIHRoaXMuX2NhbGN1bGF0aW9uID0gbmV3IENhbGN1bGF0aW9uKFwic2VsZWN0IHR5cGVcIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gSW5pdCA9PiBBZGQgVHlwZSBmb3IgY2FsY3VsYXRpb25cclxuICAgICAgICB0aGlzLmNhbGN1bGF0b3JUeXBlID0gbmV3IFNpZ25hbE1hbmFnZXJDYWxjdWxhdG9yVHlwZShcIkFsZ29yaXRobVwiLCBcInNlbGVjdCB0eXBlXCIpO1xyXG4gICAgICAgIHRoaXMuYWRkU2VyaWVDb250YWluZXIodGhpcy5jYWxjdWxhdG9yVHlwZSAsIC0xKTtcclxuICAgIH1cclxuXHJcbiAgICBkaXNwb3NlKCl7XHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdG9yVHlwZS5kaXNwb3NlKCk7XHJcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyBhbGwgcmVmZXJlbmNlcyB0byB0aGUgZ2l2ZW4gc2VyaWVzIGZyb20gdGhlIGNhbGN1bGF0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtCYXNlU2VyaWVzfSBzZXJpZVxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVtb3ZlUmVmZXJlbmNlc1RvU2VyaWUoc2VyaWU6IEJhc2VTZXJpZXMpe1xyXG4gICAgICAgIHRoaXMuY2FsY3VsYXRvclR5cGUucmVtb3ZlUmVmZXJlbmNlVG9TZXJpZShzZXJpZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGdldCBub2RlVHlwZSgpOiBOb2RlVHlwZXtcclxuICAgICAgICBsZXQgZGF0YU1vZGVsID0gdGhpcy5nZXREYXRhTW9kZWwoKTtcclxuICAgICAgICBpZihkYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgaWYoZGF0YU1vZGVsLmVkaXRNb2RlQWN0aXZlID09IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE5vZGVUeXBlLmNvbnRhaW5lcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gTm9kZVR5cGUuc2VyaWVzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjYWxjdWxhdGUoKXtcclxuICAgICAgICB0aGlzLmNhbGN1bGF0b3JUeXBlLmNhbGN1bGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgY2FsY3VsYXRvciB0eXBlKGUuZy4gXCJhZGRcIiwgXCJzdWJcIiwgLi4uKVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjYWxjdWxhdG9yVHlwZUlkXHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRDYWxjdWxhdG9yVHlwZShjYWxjdWxhdG9yVHlwZUlkOiBzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMuY2FsY3VsYXRvclR5cGUudmFsdWUgPSBjYWxjdWxhdG9yVHlwZUlkO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gUmFpc2UgZGF0YSBjaGFuZ2VkIGV2ZW50XHJcbiAgICAgICAgdGhpcy5vbkRhdGFDaGFuZ2VkKHRoaXMsIDxhbnk+Y2FsY3VsYXRvclR5cGVJZCk7IC8vIFRPRE86IHVzZSBldmVudGFyZ3NcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBnaXZlbiB2YWx1ZSB0byB0aGUgaW5wdXRwYXJhbWV0ZXIgd2l0aCBnaXZlbiBpbmRleChUT0RPOiBzaG91bGQgYmUgY2hhbmdlZCB0byBpZCBvZiBpbnB1dCBwYXJhbWV0ZXIgaW5zdGVhZCBvZiBpbmRleClcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXhcclxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWVcclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFZhbHVlKGluZGV4OiBudW1iZXIsIHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgaW5wdXREYXRhID0gdGhpcy5jYWxjdWxhdG9yVHlwZS5nZXRJbnB1dENhbGN1bGF0aW9uRGF0YSgpW2luZGV4XTtcclxuICAgICAgICBpbnB1dERhdGEudmFsdWUgPSB2YWx1ZTtcclxuICAgIH0gICAgXHJcblxyXG4gICAgcHVibGljIHNldE91dHB1dFNpZ25hbE5hbWUobmFtZTogc3RyaW5nKXtcclxuICAgICAgICBsZXQgb3V0cHV0RGF0YXMgPSB0aGlzLmdldE91dHB1dENhbGN1bGF0aW9uRGF0YSgpOyBcclxuICAgICAgICBpZihvdXRwdXREYXRhcyAhPSB1bmRlZmluZWQgJiYgb3V0cHV0RGF0YXMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIG91dHB1dERhdGFzWzBdLnZhbHVlID0gbmFtZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQ2xvbmVzIHRoZSBjYWxjdWxhdGlvblxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uXHJcbiAgICAgKi9cclxuICAgIGNsb25lKCk6IFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbntcclxuICAgICAgICAvLyBDbG9uZSBvYmplY3RcclxuICAgICAgICBsZXQgY2xvbmVkU2lnbmFsQ2FsY3VsYXRpb24gPSBuZXcgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uKHRoaXMubmFtZSk7XHJcbiAgICAgICAgY2xvbmVkU2lnbmFsQ2FsY3VsYXRpb24uX2NhbGN1bGF0aW9uID0gdGhpcy5fY2FsY3VsYXRpb247XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gQ2xvbmUgY2FsY3VsYXRvciB0eXBlIGNoaWxkIGNvbnRhaW5lclxyXG4gICAgICAgIGNsb25lZFNpZ25hbENhbGN1bGF0aW9uLmNoaWxkcy5zcGxpY2UoMCwxKTsgLy8gVE9ETzogSW1wbGVtZW50IFJlbW92ZVNlcmllQ29udGFpbmVyXHJcbiAgICAgICAgbGV0IGNhbGN1bGF0b3JUeXBlID0gdGhpcy5jYWxjdWxhdG9yVHlwZS5jbG9uZSgpIGFzIFNpZ25hbE1hbmFnZXJDYWxjdWxhdG9yVHlwZTtcclxuICAgICAgICBjbG9uZWRTaWduYWxDYWxjdWxhdGlvbi5jYWxjdWxhdG9yVHlwZSA9IGNhbGN1bGF0b3JUeXBlO1xyXG4gICAgICAgIGNsb25lZFNpZ25hbENhbGN1bGF0aW9uLmFkZFNlcmllQ29udGFpbmVyKGNhbGN1bGF0b3JUeXBlKTtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gY2xvbmVkU2lnbmFsQ2FsY3VsYXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBOZWVkZWQgdG8gdXBkYXRlIHRoZSBpbnB1dCBzZXJpZXMgb2YgdGhpcyBjYWxjdWxhdGlvbnMgdG8gdGhlIG5ldyBzZXJpZXMgb2YgdGhlIG5ldyBzZXJpZUdyb3VwXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTZXJpZUdyb3VwfSBzZXJpZUdyb3VwXHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZUlucHV0RGF0YShzZXJpZUdyb3VwOiBTZXJpZUdyb3VwKXtcclxuICAgICAgICBsZXQgY2FsY3VsYXRpb25JbnB1dERhdGFzID0gdGhpcy5nZXRJbnB1dENhbGN1bGF0aW9uRGF0YSgpO1xyXG4gICAgICAgIGZvcihsZXQgaj0wOyBqIDwgY2FsY3VsYXRpb25JbnB1dERhdGFzLmxlbmd0aDsgaisrKXtcclxuICAgICAgICAgICAgbGV0IGlucHV0RGF0YSA9IGNhbGN1bGF0aW9uSW5wdXREYXRhc1tqXTtcclxuICAgICAgICAgICAgaWYoaW5wdXREYXRhLnNlcmllICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAvLyBmaW5kIHNlcmllIGluIG5ldyBjbG9uZWQgc2VyaWUgZ3JvdXAgYnkgbmFtZSAuLi5cclxuICAgICAgICAgICAgICAgIGxldCBmb3VuZFNlcmllID0gc2VyaWVHcm91cC5nZXRTZXJpZShpbnB1dERhdGEuc2VyaWUhLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgaWYoZm91bmRTZXJpZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIC4uLiBhbmQgc2V0IHRoZSBuZXcgc2VyaWVcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dERhdGEuc2VyaWUgPSBmb3VuZFNlcmllO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyhvciByZXNldHMpIGEgZmxhZyBhdCBhbGwgaW5wdXRzIG9mIHRoaXMgY2FsY3VsYXRpb24gd2hlcmUgYSBkcm9wIG9mIHRoZSBnaXZlbiBzZXJpZXMgd291bGQgYmUgcG9zc2libGVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGFjdGl2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNlcmllc1xyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvblxyXG4gICAgICovXHJcbiAgICBzZXREcm9wTG9jYXRpb25zKGFjdGl2YXRlOiBib29sZWFuLCBzZXJpZXM6IEJhc2VTZXJpZXMpe1xyXG4gICAgICAgIGlmKHRoaXMudmlzaWJsZUNoaWxkcyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBpZih0aGlzLnZpc2libGVDaGlsZHMhLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAgICAgbGV0IGNhbGN1bGF0aW9uVHlwZSA9IHRoaXMudmlzaWJsZUNoaWxkc1swXSBhcyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRvclR5cGU7XHJcbiAgICAgICAgICAgICAgICBjYWxjdWxhdGlvblR5cGUudmlzaWJsZUNoaWxkcyEuZm9yRWFjaChjYWxjdWxhdGlvbkRhdGE9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY2FsY3VsYXRpb25EYXRhIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5pc1Nlcmllc0Ryb3BBbGxvd2VkQXRDdXJyZW50SW5wdXRJdGVtKGNhbGN1bGF0aW9uRGF0YSwgc2VyaWVzKSA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGN1bGF0aW9uRGF0YS5kcm9wUG9zc2libGUgPSBhY3RpdmF0ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cdFx0XHRcdFx0XHRcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIGEgZHJvcCBvZiBhIHNlcmllcyBpcyBwb3NzaWJsZSBmb3IgdGhlIGdpdmVuIGNhbGN1bGF0aW9uIGlucHV0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7U2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhfSBpbnB1dEl0ZW1cclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvblxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGlzU2VyaWVzRHJvcEFsbG93ZWRBdEN1cnJlbnRJbnB1dEl0ZW0oaW5wdXRJdGVtOiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGEsIHNlcmllOiBCYXNlU2VyaWVzKTogYm9vbGVhbntcclxuXHRcdC8vIEl0IGlzIG5vdCBhbGxvd2VkIHRvIHVzZSB4eSBvciBmZnQgc2VyaWVzIGFzIGlucHV0IFxyXG5cdFx0aWYoc2VyaWUudHlwZSA9PSBTZXJpZXNUeXBlLnh5U2VyaWVzIHx8IHNlcmllLnR5cGUgPT0gU2VyaWVzVHlwZS5mZnRTZXJpZXMpe1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEl0IGlzIG5vdCBhbGxvd2VkIHRvIHVzZSBmZnQgc2VyaWVzIGFzIGlucHV0IGZvciBGRlQgY2FsY3VsYXRpb25cclxuICAgICAgICAvLyBpZihpbnB1dEl0ZW0ucGFyZW50IGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlKXtcclxuICAgICAgICAvLyAgICAgaWYoaW5wdXRJdGVtLnBhcmVudC52YWx1ZSA9PSAnRkZUJyAmJiBzZXJpZS50eXBlID09IFNlcmllc1R5cGUuZmZ0U2VyaWVzKSB7XHJcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9XHJcblx0XHQvLyBTZXJpZXMgY2FuIG9ubHkgYmUgZHJvcHBlZCBhdCBhbiBpbnB1dCB3aGVyZSBzZXJpZShkYXRhcG9pbnRzKSBhcmUgYWxsb3dlZFxyXG5cdFx0aWYoIShpbnB1dEl0ZW0uY2FsY3VsYXRpb25EYXRhIGluc3RhbmNlb2YgQ2FsY3VsYXRpb25EYXRhUG9pbnRzKSAmJiAhKGlucHV0SXRlbS5jYWxjdWxhdGlvbkRhdGEgaW5zdGFuY2VvZiBDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cykpe1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRsZXQgb3V0cHV0U2VyaWVzT2ZDYWxjdWxhdGlvbiA9IGlucHV0SXRlbS5wYXJlbnQhLmdldFNlcmllcygpO1xyXG5cdFx0aWYob3V0cHV0U2VyaWVzT2ZDYWxjdWxhdGlvbi5pbmRleE9mKHNlcmllKSA9PSAtMSl7IC8vIE91dHB1dFNlcmllcyBvZiB0aGlzIGNhbGN1bGF0aW9uIGFyZSBub3QgYWxsb3dlZCBmb3IgdGhpcyBjYWxjdWxhdGlvbiBhcyBpbnB1dChjaXJjdWxhciByZWZlcmVuY2UpXHJcblx0XHRcdGlmKGlucHV0SXRlbS5nZXRTZXJpZUdyb3VwKCkgPT0gc2VyaWUucGFyZW50KXsgLy8gQ2hlY2sgZm9yIHNhbWUgc2VyaWUgZ3JvdXBcclxuXHRcdFx0XHRpZihpbnB1dEl0ZW0ucGFyZW50IGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlKXtcclxuXHRcdFx0XHRcdGlmKGlucHV0SXRlbS5wYXJlbnQhLmN5Y2xlRm91bmQoc2VyaWUubmFtZSkgPT0gZmFsc2UpeyAvLyBjaGVjayBmb3IgY3ljbGVcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhbGwgY2FsY3VsYXRpb24gaW5wdXQgZGF0YXNcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8U2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhPn1cclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldElucHV0Q2FsY3VsYXRpb25EYXRhKCk6IEFycmF5PFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YT57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FsY3VsYXRvclR5cGUuZ2V0SW5wdXRDYWxjdWxhdGlvbkRhdGEoKTtcclxuICAgIH0gICAgXHJcbiAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGFsbCBjYWxjdWxhdGlvbiBvdXRwdXQgZGF0YXNcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8U2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uT3V0cHV0RGF0YT59XHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRPdXRwdXRDYWxjdWxhdGlvbkRhdGEoKTogQXJyYXk8U2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uT3V0cHV0RGF0YT57XHJcbiAgICAgICAgbGV0IG91dHB1dERhdGEgPSB0aGlzLmNhbGN1bGF0b3JUeXBlLmdldEZpcnN0T3V0cHV0Q2FsY3VsYXRpb25EYXRhKCk7XHJcbiAgICAgICAgaWYob3V0cHV0RGF0YSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gW291dHB1dERhdGFdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IEFycmF5PFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbk91dHB1dERhdGE+KCk7XHJcbiAgICB9XHJcbn0iXX0=