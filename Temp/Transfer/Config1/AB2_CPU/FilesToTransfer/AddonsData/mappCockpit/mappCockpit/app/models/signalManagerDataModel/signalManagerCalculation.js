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
define(["require", "exports", "../../common/dateTimeHelper", "../common/calculation/calculation", "./signalManagerCalculatorType", "../common/signal/serieContainer", "./signalManagerCalculationInputData", "../common/calculatorProvider/calculationDataPoints", "../common/calculatorProvider/calculationDataNumberOrPoints", "../common/signal/serieNode", "../chartManagerDataModel/seriesType", "../common/calculatorProvider/calculatorProvider"], function (require, exports, dateTimeHelper_1, calculation_1, signalManagerCalculatorType_1, serieContainer_1, signalManagerCalculationInputData_1, calculationDataPoints_1, calculationDataNumberOrPoints_1, serieNode_1, seriesType_1, calculatorProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SignalManagerCalculation = /** @class */ (function (_super) {
        __extends(SignalManagerCalculation, _super);
        /**
         * Creates an instance of SignalManagerCalculation.
         * @param {string} name
         * @memberof SignalManagerCalculation
         */
        function SignalManagerCalculation(name, seriesProvider) {
            var _this = _super.call(this, name) || this;
            _this._seriesProvider = seriesProvider;
            _this.id = name + SignalManagerCalculation.uniqueId;
            SignalManagerCalculation.uniqueId++;
            _this._calculation = new calculation_1.Calculation("select type");
            // Init => Add Type for calculation
            _this._calculatorType = new signalManagerCalculatorType_1.SignalManagerCalculatorType("Algorithm", "select type", _this._seriesProvider);
            _this.addSerieContainer(_this._calculatorType, -1);
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
            this._calculatorType.dispose();
            _super.prototype.dispose.call(this);
        };
        /**
         * Removes all references to the given series from the calculation
         *
         * @param {BaseSeries} serie
         * @memberof SignalManagerCalculation
         */
        SignalManagerCalculation.prototype.removeReferencesToSerie = function (serie) {
            this._calculatorType.removeReferenceToSerie(serie);
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
            this._calculatorType.calculate();
        };
        /**
         * Sets the calculator type(e.g. "add", "sub", ...)
         *
         * @param {string} calculatorTypeId
         * @memberof SignalManagerCalculation
         */
        SignalManagerCalculation.prototype.setCalculatorTypeById = function (calculatorTypeId) {
            var displayName = calculatorProvider_1.CalculatorProvider.getInstance().convertIdToDisplayName(calculatorTypeId);
            this._calculatorType.value = displayName; // TODO: Don't use displayname => use id
            // Raise data changed event
            this.onDataChanged(this, displayName); // TODO: use eventargs
        };
        /**
           *  Sets the given value to the inputparameter with given id
           *
           * @param {number} index
           * @param {string} value
           * @memberof SignalManagerCalculation
           */
        SignalManagerCalculation.prototype.setInputValueById = function (id, value) {
            var inputData = this._calculatorType.getInputCalculationDataById(id);
            if (inputData != undefined) {
                inputData.value = value;
            }
            else {
                console.error("Value can't be set to current id! => " + id);
            }
        };
        /**
         * Sets the signal name of the calculation ouptut
         *
         * @param {string} name
         * @memberof SignalManagerCalculation
         */
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
            var clonedSignalCalculation = new SignalManagerCalculation(this.name, this._seriesProvider);
            clonedSignalCalculation._calculation = this._calculation;
            // Clone calculator type child container
            clonedSignalCalculation.childs.splice(0, 1); // TODO: Implement RemoveSerieContainer
            var calculatorType = this._calculatorType.clone();
            clonedSignalCalculation._calculatorType = calculatorType;
            clonedSignalCalculation.addSerieContainer(calculatorType);
            return clonedSignalCalculation;
        };
        /**
         * Needed to update the input series of this calculations to the new series of the new serieGroup
         *
         * @param {SerieGroup} serieGroup
         * @returns {Array<string>} serie ids which are not needed any more as input series(should be removed from series provider)
         * @memberof SignalManagerCalculation
         */
        SignalManagerCalculation.prototype.updateInputData = function (serieGroup) {
            var listOfSeriesIdsToRemove = new Array();
            var calculationInputDatas = this.getInputCalculationData();
            for (var j = 0; j < calculationInputDatas.length; j++) {
                var inputData = calculationInputDatas[j];
                if (inputData.serie != undefined) {
                    // find serie in new cloned serie group by name ...
                    var foundSerie = serieGroup.getSerie(inputData.serie.name);
                    if (foundSerie != undefined) {
                        // Save id of clone serie object which one can be removed after updating all input Series
                        if (listOfSeriesIdsToRemove.includes(inputData.serie.id) == false) {
                            listOfSeriesIdsToRemove.push(inputData.serie.id);
                        }
                        // ... and set the new serie
                        inputData.serie = foundSerie;
                    }
                }
            }
            return listOfSeriesIdsToRemove;
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
            return this._calculatorType.getInputCalculationData();
        };
        /**
         * Returns all calculation output datas
         *
         * @returns {Array<SignalManagerCalculationOutputData>}
         * @memberof SignalManagerCalculation
         */
        SignalManagerCalculation.prototype.getOutputCalculationData = function () {
            var outputData = this._calculatorType.getFirstOutputCalculationData();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvc2lnbmFsTWFuYWdlckRhdGFNb2RlbC9zaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQWlCQTtRQUE4Qyw0Q0FBYztRQW1HeEQ7Ozs7V0FJRztRQUNILGtDQUFZLElBQVksRUFBRSxjQUErQjtZQUF6RCxZQUNJLGtCQUFNLElBQUksQ0FBQyxTQVdkO1lBVEcsS0FBSSxDQUFDLGVBQWUsR0FBRyxjQUFjLENBQUM7WUFDdEMsS0FBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLEdBQUcsd0JBQXdCLENBQUMsUUFBUSxDQUFDO1lBQ25ELHdCQUF3QixDQUFDLFFBQVEsRUFBRSxDQUFDO1lBRXBDLEtBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSx5QkFBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBRW5ELG1DQUFtQztZQUNuQyxLQUFJLENBQUMsZUFBZSxHQUFHLElBQUkseURBQTJCLENBQUMsV0FBVyxFQUFFLGFBQWEsRUFBRSxLQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDekcsS0FBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUksQ0FBQyxlQUFlLEVBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7UUFDdEQsQ0FBQztRQTFHRCxzQkFBVywrQ0FBUztpQkFBcEI7Z0JBQ0ksSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7Z0JBQ2pELElBQUcsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUM7b0JBQ3JCLElBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxTQUFTLEVBQUM7d0JBQ2hDLE9BQU8sVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUM7cUJBQzdDO2lCQUNKO2dC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Q0QsT0FBTyxLQUFLLENBQUM7UUFDZCxDQUFDO1FBRUU7Ozs7O1dBS0c7UUFDSSwwREFBdUIsR0FBOUI7WUFDSSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztRQUMxRCxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSSwyREFBd0IsR0FBL0I7WUFDSSxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLDZCQUE2QixFQUFFLENBQUM7WUFDdEUsSUFBRyxVQUFVLElBQUksU0FBUyxFQUFDO2dCQUN2QixPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDdkI7WUFDRCxPQUFPLElBQUksS0FBSyxFQUFzQyxDQUFDO1FBQzNELENBQUM7UUE1VGMsaUNBQVEsR0FBVyxDQUFDLENBQUMsQ0FBQyx1QkFBdUI7UUE2VGhFLCtCQUFDO0tBQUEsQUFqVUQsQ0FBOEMsK0JBQWMsR0FpVTNEO0lBalVZLDREQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERhdGVUaW1lSGVscGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9kYXRlVGltZUhlbHBlclwiO1xyXG5pbXBvcnQgeyBJQ2FsY3VsYXRpb24gfSBmcm9tIFwiLi4vY29tbW9uL2ludGVyZmFjZXMvY2FsY3VsYXRpb25JbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb24gfSBmcm9tIFwiLi4vY29tbW9uL2NhbGN1bGF0aW9uL2NhbGN1bGF0aW9uXCI7XHJcbmltcG9ydCB7IFNpZ25hbE1hbmFnZXJDYWxjdWxhdG9yVHlwZSB9IGZyb20gXCIuL3NpZ25hbE1hbmFnZXJDYWxjdWxhdG9yVHlwZVwiO1xyXG5pbXBvcnQgeyBTZXJpZUNvbnRhaW5lciB9IGZyb20gXCIuLi9jb21tb24vc2lnbmFsL3NlcmllQ29udGFpbmVyXCI7XHJcbmltcG9ydCB7IElTZXJpZU5vZGUgfSBmcm9tIFwiLi4vY29tbW9uL2ludGVyZmFjZXMvc2VyaWVOb2RlSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbk91dHB1dERhdGEgfSBmcm9tIFwiLi9zaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25PdXRwdXREYXRhXCI7XHJcbmltcG9ydCB7IEJhc2VTZXJpZXMgfSBmcm9tIFwiLi4vY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2Jhc2VTZXJpZXNcIjtcclxuaW1wb3J0IHsgU2VyaWVHcm91cCB9IGZyb20gXCIuLi9jb21tb24vc2lnbmFsL3NlcmllR3JvdXBcIjtcclxuaW1wb3J0IHsgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhIH0gZnJvbSBcIi4vc2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YVBvaW50cyB9IGZyb20gXCIuLi9jb21tb24vY2FsY3VsYXRvclByb3ZpZGVyL2NhbGN1bGF0aW9uRGF0YVBvaW50c1wiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cyB9IGZyb20gXCIuLi9jb21tb24vY2FsY3VsYXRvclByb3ZpZGVyL2NhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzXCI7XHJcbmltcG9ydCB7IE5vZGVUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi9zaWduYWwvc2VyaWVOb2RlXCI7XHJcbmltcG9ydCB7IFNlcmllc1R5cGUgfSBmcm9tIFwiLi4vY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL3Nlcmllc1R5cGVcIjtcclxuaW1wb3J0IHsgSVNlcmllc1Byb3ZpZGVyIH0gZnJvbSBcIi4uL2NvbW1vbi9zZXJpZXNQcm92aWRlci9zZXJpZXNQcm92aWRlckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdG9yUHJvdmlkZXIgfSBmcm9tIFwiLi4vY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdG9yUHJvdmlkZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb24gZXh0ZW5kcyBTZXJpZUNvbnRhaW5lcntcclxuICAgIFxyXG4gICAgaWQ6IHN0cmluZztcclxuICAgICAgICAgICAgXHJcbiAgICBwcml2YXRlIHN0YXRpYyB1bmlxdWVJZDogbnVtYmVyID0gMDsgLy8gVE9ETzogdXNlIHVuaXF1ZSBpZCBcclxuXHJcbiAgICBwcml2YXRlIF9jYWxjdWxhdGlvbjogSUNhbGN1bGF0aW9uO1xyXG4gICAgcHJpdmF0ZSBfY2FsY3VsYXRvclR5cGU6IFNpZ25hbE1hbmFnZXJDYWxjdWxhdG9yVHlwZTtcclxuICAgIHByaXZhdGUgX3Nlcmllc1Byb3ZpZGVyOiBJU2VyaWVzUHJvdmlkZXI7XHJcblxyXG4gICAgcHVibGljIGdldCB2YWxpZE5vZGUoKTogYm9vbGVhbntcclxuICAgICAgICBsZXQgb3V0cHV0RGF0YSA9IHRoaXMuZ2V0T3V0cHV0Q2FsY3VsYXRpb25EYXRhKCk7XHJcbiAgICAgICAgaWYob3V0cHV0RGF0YS5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgaWYob3V0cHV0RGF0YVswXS5zZXJpZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG91dHB1dERhdGFbMF0uc2VyaWUucmF3UG9pbnRzVmFsaWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBvbmx5IHRoZSB2aXNpYmxlIGNoaWxkcyAoZS5nIHZpc2libGUgY2hpbGRzIG9ubHkgYXZhaWxhYmxlIGluIGVkaXQgbW9kZSlcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHsoSVNlcmllTm9kZVtdfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgdmlzaWJsZUNoaWxkcygpOiBJU2VyaWVOb2RlW118dW5kZWZpbmVkIHtcclxuICAgICAgICBsZXQgZGF0YU1vZGVsID0gdGhpcy5nZXREYXRhTW9kZWwoKTtcclxuICAgICAgICBpZihkYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgaWYoZGF0YU1vZGVsLmVkaXRNb2RlQWN0aXZlID09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hpbGRzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5nZXRPdXRwdXRDYWxjdWxhdGlvbkRhdGEoKTsgXHJcbiAgICAgICAgaWYoZGF0YS5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgLy8gVE9ETzogbXVsdGkgb3V0cHV0ICx1c2Ugbm90IG9ubHkgdGhlIGZpcnN0IG91dHB1dFxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YVswXS5zZXJpZSEubmFtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5fbmFtZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBuYW1lKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX25hbWUgPSBuYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgc2VyaWUoKTogQmFzZVNlcmllc3x1bmRlZmluZWQge1xyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5nZXRPdXRwdXRDYWxjdWxhdGlvbkRhdGEoKTsgXHJcbiAgICAgICAgaWYoZGF0YS5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgLy8gVE9ETzogbXVsdGkgb3V0cHV0ICxub3Qgb25seSB0aGUgZmlyc3Qgb3V0cHV0XHJcbiAgICAgICAgICAgcmV0dXJuIGRhdGFbMF0uc2VyaWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBzZXJpZSh2YWx1ZTogQmFzZVNlcmllc3x1bmRlZmluZWQpIHtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvbG9yKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmdldE91dHB1dENhbGN1bGF0aW9uRGF0YSgpOyBcclxuICAgICAgICBpZihkYXRhLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAvLyBUT0RPOiBtdWx0aSBvdXRwdXQgLG5vdCBvbmx5IHRoZSBmaXJzdCBvdXRwdXRcclxuICAgICAgICAgICAgcmV0dXJuIGRhdGFbMF0uY29sb3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBjb2xvcihjb2xvcjogc3RyaW5nIHwgdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmdldE91dHB1dENhbGN1bGF0aW9uRGF0YSgpOyBcclxuICAgICAgICBpZihkYXRhLmxlbmd0aCA+IDAgJiYgY29sb3IgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gVE9ETzogbXVsdGkgb3V0cHV0ICxub3Qgb25seSB0aGUgZmlyc3Qgb3V0cHV0XHJcbiAgICAgICAgICAgIGRhdGFbMF0uY29sb3IgPSBjb2xvcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBzdGFydFRyaWdnZXJUaW1lKCk6IG51bWJlcntcclxuICAgICAgICBsZXQgc2VyaWVHcm91cCA9IHRoaXMuZ2V0U2VyaWVHcm91cCgpO1xyXG4gICAgICAgIGlmKHNlcmllR3JvdXAgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIHNlcmllR3JvdXAuc3RhcnRUcmlnZ2VyVGltZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDA7IC8vIE5vdCBzdGFydCB0cmlnZ2VyIGF2YWlsYWJsZVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgc3RhcnRUcmlnZ2VyVGltZUZvcm1hdGVkKCk6IHN0cmluZ3tcclxuICAgICAgICBsZXQgc2VyaWVHcm91cCA9IHRoaXMuZ2V0U2VyaWVHcm91cCgpO1xyXG4gICAgICAgIGlmKHNlcmllR3JvdXAgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIERhdGVUaW1lSGVscGVyLmdldERhdGVUaW1lKHNlcmllR3JvdXAuc3RhcnRUcmlnZ2VyVGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcIlwiOyAvLyBOb3Qgc3RhcnQgdHJpZ2dlciBpbmZvIGF2YWlsYWJsZVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb24uXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvblxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHNlcmllc1Byb3ZpZGVyOiBJU2VyaWVzUHJvdmlkZXIpe1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG5cclxuICAgICAgICB0aGlzLl9zZXJpZXNQcm92aWRlciA9IHNlcmllc1Byb3ZpZGVyO1xyXG4gICAgICAgIHRoaXMuaWQgPSBuYW1lICsgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uLnVuaXF1ZUlkO1xyXG4gICAgICAgIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbi51bmlxdWVJZCsrO1xyXG5cclxuICAgICAgICB0aGlzLl9jYWxjdWxhdGlvbiA9IG5ldyBDYWxjdWxhdGlvbihcInNlbGVjdCB0eXBlXCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIEluaXQgPT4gQWRkIFR5cGUgZm9yIGNhbGN1bGF0aW9uXHJcbiAgICAgICAgdGhpcy5fY2FsY3VsYXRvclR5cGUgPSBuZXcgU2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlKFwiQWxnb3JpdGhtXCIsIFwic2VsZWN0IHR5cGVcIiwgdGhpcy5fc2VyaWVzUHJvdmlkZXIpO1xyXG4gICAgICAgIHRoaXMuYWRkU2VyaWVDb250YWluZXIodGhpcy5fY2FsY3VsYXRvclR5cGUgLCAtMSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzcG9zZSgpe1xyXG4gICAgICAgIHRoaXMuX2NhbGN1bGF0b3JUeXBlLmRpc3Bvc2UoKTtcclxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIGFsbCByZWZlcmVuY2VzIHRvIHRoZSBnaXZlbiBzZXJpZXMgZnJvbSB0aGUgY2FsY3VsYXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNlcmllXHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZW1vdmVSZWZlcmVuY2VzVG9TZXJpZShzZXJpZTogQmFzZVNlcmllcyl7XHJcbiAgICAgICAgdGhpcy5fY2FsY3VsYXRvclR5cGUucmVtb3ZlUmVmZXJlbmNlVG9TZXJpZShzZXJpZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBub2RlVHlwZSgpOiBOb2RlVHlwZXtcclxuICAgICAgICBsZXQgZGF0YU1vZGVsID0gdGhpcy5nZXREYXRhTW9kZWwoKTtcclxuICAgICAgICBpZihkYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgaWYoZGF0YU1vZGVsLmVkaXRNb2RlQWN0aXZlID09IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE5vZGVUeXBlLmNvbnRhaW5lcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gTm9kZVR5cGUuc2VyaWVzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjYWxjdWxhdGUoKXtcclxuICAgICAgICB0aGlzLl9jYWxjdWxhdG9yVHlwZS5jYWxjdWxhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGNhbGN1bGF0b3IgdHlwZShlLmcuIFwiYWRkXCIsIFwic3ViXCIsIC4uLilcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY2FsY3VsYXRvclR5cGVJZFxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0Q2FsY3VsYXRvclR5cGVCeUlkKGNhbGN1bGF0b3JUeXBlSWQ6IHN0cmluZyl7XHJcbiAgICAgICAgbGV0IGRpc3BsYXlOYW1lID0gQ2FsY3VsYXRvclByb3ZpZGVyLmdldEluc3RhbmNlKCkuY29udmVydElkVG9EaXNwbGF5TmFtZShjYWxjdWxhdG9yVHlwZUlkKTtcclxuICAgICAgICB0aGlzLl9jYWxjdWxhdG9yVHlwZS52YWx1ZSA9IGRpc3BsYXlOYW1lOyAvLyBUT0RPOiBEb24ndCB1c2UgZGlzcGxheW5hbWUgPT4gdXNlIGlkXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAvLyBSYWlzZSBkYXRhIGNoYW5nZWQgZXZlbnRcclxuICAgICAgICB0aGlzLm9uRGF0YUNoYW5nZWQodGhpcywgPGFueT5kaXNwbGF5TmFtZSk7IC8vIFRPRE86IHVzZSBldmVudGFyZ3NcclxuICAgIH1cclxuICAgIFxyXG4gIC8qKlxyXG4gICAgICogIFNldHMgdGhlIGdpdmVuIHZhbHVlIHRvIHRoZSBpbnB1dHBhcmFtZXRlciB3aXRoIGdpdmVuIGlkXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldElucHV0VmFsdWVCeUlkKGlkOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgaW5wdXREYXRhID0gdGhpcy5fY2FsY3VsYXRvclR5cGUuZ2V0SW5wdXRDYWxjdWxhdGlvbkRhdGFCeUlkKGlkKTtcclxuICAgICAgICBpZihpbnB1dERhdGEgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgaW5wdXREYXRhLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJWYWx1ZSBjYW4ndCBiZSBzZXQgdG8gY3VycmVudCBpZCEgPT4gXCIgKyBpZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSAgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBzaWduYWwgbmFtZSBvZiB0aGUgY2FsY3VsYXRpb24gb3VwdHV0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldE91dHB1dFNpZ25hbE5hbWUobmFtZTogc3RyaW5nKXtcclxuICAgICAgICBsZXQgb3V0cHV0RGF0YXMgPSB0aGlzLmdldE91dHB1dENhbGN1bGF0aW9uRGF0YSgpOyBcclxuICAgICAgICBpZihvdXRwdXREYXRhcyAhPSB1bmRlZmluZWQgJiYgb3V0cHV0RGF0YXMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIG91dHB1dERhdGFzWzBdLnZhbHVlID0gbmFtZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQ2xvbmVzIHRoZSBjYWxjdWxhdGlvblxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uXHJcbiAgICAgKi9cclxuICAgIGNsb25lKCk6IFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbntcclxuICAgICAgICAvLyBDbG9uZSBvYmplY3RcclxuICAgICAgICBsZXQgY2xvbmVkU2lnbmFsQ2FsY3VsYXRpb24gPSBuZXcgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uKHRoaXMubmFtZSwgdGhpcy5fc2VyaWVzUHJvdmlkZXIpO1xyXG4gICAgICAgIGNsb25lZFNpZ25hbENhbGN1bGF0aW9uLl9jYWxjdWxhdGlvbiA9IHRoaXMuX2NhbGN1bGF0aW9uO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIENsb25lIGNhbGN1bGF0b3IgdHlwZSBjaGlsZCBjb250YWluZXJcclxuICAgICAgICBjbG9uZWRTaWduYWxDYWxjdWxhdGlvbi5jaGlsZHMuc3BsaWNlKDAsMSk7IC8vIFRPRE86IEltcGxlbWVudCBSZW1vdmVTZXJpZUNvbnRhaW5lclxyXG4gICAgICAgIGxldCBjYWxjdWxhdG9yVHlwZSA9IHRoaXMuX2NhbGN1bGF0b3JUeXBlLmNsb25lKCkgYXMgU2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlO1xyXG4gICAgICAgIGNsb25lZFNpZ25hbENhbGN1bGF0aW9uLl9jYWxjdWxhdG9yVHlwZSA9IGNhbGN1bGF0b3JUeXBlO1xyXG4gICAgICAgIGNsb25lZFNpZ25hbENhbGN1bGF0aW9uLmFkZFNlcmllQ29udGFpbmVyKGNhbGN1bGF0b3JUeXBlKTtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gY2xvbmVkU2lnbmFsQ2FsY3VsYXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBOZWVkZWQgdG8gdXBkYXRlIHRoZSBpbnB1dCBzZXJpZXMgb2YgdGhpcyBjYWxjdWxhdGlvbnMgdG8gdGhlIG5ldyBzZXJpZXMgb2YgdGhlIG5ldyBzZXJpZUdyb3VwXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTZXJpZUdyb3VwfSBzZXJpZUdyb3VwXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8c3RyaW5nPn0gc2VyaWUgaWRzIHdoaWNoIGFyZSBub3QgbmVlZGVkIGFueSBtb3JlIGFzIGlucHV0IHNlcmllcyhzaG91bGQgYmUgcmVtb3ZlZCBmcm9tIHNlcmllcyBwcm92aWRlcilcclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25cclxuICAgICAqL1xyXG4gICAgdXBkYXRlSW5wdXREYXRhKHNlcmllR3JvdXA6IFNlcmllR3JvdXApOiBBcnJheTxzdHJpbmc+e1xyXG4gICAgICAgIGxldCBsaXN0T2ZTZXJpZXNJZHNUb1JlbW92ZTogQXJyYXk8c3RyaW5nPiA9IG5ldyBBcnJheTxzdHJpbmc+KCk7XHJcbiAgICAgICAgbGV0IGNhbGN1bGF0aW9uSW5wdXREYXRhcyA9IHRoaXMuZ2V0SW5wdXRDYWxjdWxhdGlvbkRhdGEoKTtcclxuICAgICAgICBmb3IobGV0IGo9MDsgaiA8IGNhbGN1bGF0aW9uSW5wdXREYXRhcy5sZW5ndGg7IGorKyl7XHJcbiAgICAgICAgICAgIGxldCBpbnB1dERhdGEgPSBjYWxjdWxhdGlvbklucHV0RGF0YXNbal07XHJcbiAgICAgICAgICAgIGlmKGlucHV0RGF0YS5zZXJpZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgLy8gZmluZCBzZXJpZSBpbiBuZXcgY2xvbmVkIHNlcmllIGdyb3VwIGJ5IG5hbWUgLi4uXHJcbiAgICAgICAgICAgICAgICBsZXQgZm91bmRTZXJpZSA9IHNlcmllR3JvdXAuZ2V0U2VyaWUoaW5wdXREYXRhLnNlcmllLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgaWYoZm91bmRTZXJpZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFNhdmUgaWQgb2YgY2xvbmUgc2VyaWUgb2JqZWN0IHdoaWNoIG9uZSBjYW4gYmUgcmVtb3ZlZCBhZnRlciB1cGRhdGluZyBhbGwgaW5wdXQgU2VyaWVzXHJcbiAgICAgICAgICAgICAgICAgICAgaWYobGlzdE9mU2VyaWVzSWRzVG9SZW1vdmUuaW5jbHVkZXMoaW5wdXREYXRhLnNlcmllLmlkKSA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RPZlNlcmllc0lkc1RvUmVtb3ZlLnB1c2goaW5wdXREYXRhLnNlcmllLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gLi4uIGFuZCBzZXQgdGhlIG5ldyBzZXJpZVxyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0RGF0YS5zZXJpZSA9IGZvdW5kU2VyaWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxpc3RPZlNlcmllc0lkc1RvUmVtb3ZlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyhvciByZXNldHMpIGEgZmxhZyBhdCBhbGwgaW5wdXRzIG9mIHRoaXMgY2FsY3VsYXRpb24gd2hlcmUgYSBkcm9wIG9mIHRoZSBnaXZlbiBzZXJpZXMgd291bGQgYmUgcG9zc2libGVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGFjdGl2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNlcmllc1xyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvblxyXG4gICAgICovXHJcbiAgICBzZXREcm9wTG9jYXRpb25zKGFjdGl2YXRlOiBib29sZWFuLCBzZXJpZXM6IEJhc2VTZXJpZXMpe1xyXG4gICAgICAgIGlmKHRoaXMudmlzaWJsZUNoaWxkcyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBpZih0aGlzLnZpc2libGVDaGlsZHMhLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAgICAgbGV0IGNhbGN1bGF0aW9uVHlwZSA9IHRoaXMudmlzaWJsZUNoaWxkc1swXSBhcyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRvclR5cGU7XHJcbiAgICAgICAgICAgICAgICBjYWxjdWxhdGlvblR5cGUudmlzaWJsZUNoaWxkcyEuZm9yRWFjaChjYWxjdWxhdGlvbkRhdGE9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY2FsY3VsYXRpb25EYXRhIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5pc1Nlcmllc0Ryb3BBbGxvd2VkQXRDdXJyZW50SW5wdXRJdGVtKGNhbGN1bGF0aW9uRGF0YSwgc2VyaWVzKSA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGN1bGF0aW9uRGF0YS5kcm9wUG9zc2libGUgPSBhY3RpdmF0ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cdFx0XHRcdFx0XHRcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIGEgZHJvcCBvZiBhIHNlcmllcyBpcyBwb3NzaWJsZSBmb3IgdGhlIGdpdmVuIGNhbGN1bGF0aW9uIGlucHV0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7U2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhfSBpbnB1dEl0ZW1cclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvblxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGlzU2VyaWVzRHJvcEFsbG93ZWRBdEN1cnJlbnRJbnB1dEl0ZW0oaW5wdXRJdGVtOiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGEsIHNlcmllOiBCYXNlU2VyaWVzKTogYm9vbGVhbntcclxuXHRcdC8vIEl0IGlzIG5vdCBhbGxvd2VkIHRvIHVzZSB4eSBvciBmZnQgc2VyaWVzIGFzIGlucHV0IFxyXG5cdFx0aWYoc2VyaWUudHlwZSA9PSBTZXJpZXNUeXBlLnh5U2VyaWVzIHx8IHNlcmllLnR5cGUgPT0gU2VyaWVzVHlwZS5mZnRTZXJpZXMpe1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEl0IGlzIG5vdCBhbGxvd2VkIHRvIHVzZSBmZnQgc2VyaWVzIGFzIGlucHV0IGZvciBGRlQgY2FsY3VsYXRpb25cclxuICAgICAgICAvLyBpZihpbnB1dEl0ZW0ucGFyZW50IGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlKXtcclxuICAgICAgICAvLyAgICAgaWYoaW5wdXRJdGVtLnBhcmVudC52YWx1ZSA9PSAnRkZUJyAmJiBzZXJpZS50eXBlID09IFNlcmllc1R5cGUuZmZ0U2VyaWVzKSB7XHJcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9XHJcblx0XHQvLyBTZXJpZXMgY2FuIG9ubHkgYmUgZHJvcHBlZCBhdCBhbiBpbnB1dCB3aGVyZSBzZXJpZShkYXRhcG9pbnRzKSBhcmUgYWxsb3dlZFxyXG5cdFx0aWYoIShpbnB1dEl0ZW0uY2FsY3VsYXRpb25EYXRhIGluc3RhbmNlb2YgQ2FsY3VsYXRpb25EYXRhUG9pbnRzKSAmJiAhKGlucHV0SXRlbS5jYWxjdWxhdGlvbkRhdGEgaW5zdGFuY2VvZiBDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cykpe1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRsZXQgb3V0cHV0U2VyaWVzT2ZDYWxjdWxhdGlvbiA9IGlucHV0SXRlbS5wYXJlbnQhLmdldFNlcmllcygpO1xyXG5cdFx0aWYob3V0cHV0U2VyaWVzT2ZDYWxjdWxhdGlvbi5pbmRleE9mKHNlcmllKSA9PSAtMSl7IC8vIE91dHB1dFNlcmllcyBvZiB0aGlzIGNhbGN1bGF0aW9uIGFyZSBub3QgYWxsb3dlZCBmb3IgdGhpcyBjYWxjdWxhdGlvbiBhcyBpbnB1dChjaXJjdWxhciByZWZlcmVuY2UpXHJcblx0XHRcdGlmKGlucHV0SXRlbS5nZXRTZXJpZUdyb3VwKCkgPT0gc2VyaWUucGFyZW50KXsgLy8gQ2hlY2sgZm9yIHNhbWUgc2VyaWUgZ3JvdXBcclxuXHRcdFx0XHRpZihpbnB1dEl0ZW0ucGFyZW50IGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlKXtcclxuXHRcdFx0XHRcdGlmKGlucHV0SXRlbS5wYXJlbnQhLmN5Y2xlRm91bmQoc2VyaWUubmFtZSkgPT0gZmFsc2UpeyAvLyBjaGVjayBmb3IgY3ljbGVcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhbGwgY2FsY3VsYXRpb24gaW5wdXQgZGF0YXNcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8U2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhPn1cclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldElucHV0Q2FsY3VsYXRpb25EYXRhKCk6IEFycmF5PFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YT57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhbGN1bGF0b3JUeXBlLmdldElucHV0Q2FsY3VsYXRpb25EYXRhKCk7XHJcbiAgICB9ICAgIFxyXG4gICBcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhbGwgY2FsY3VsYXRpb24gb3V0cHV0IGRhdGFzXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0FycmF5PFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbk91dHB1dERhdGE+fVxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0T3V0cHV0Q2FsY3VsYXRpb25EYXRhKCk6IEFycmF5PFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbk91dHB1dERhdGE+e1xyXG4gICAgICAgIGxldCBvdXRwdXREYXRhID0gdGhpcy5fY2FsY3VsYXRvclR5cGUuZ2V0Rmlyc3RPdXRwdXRDYWxjdWxhdGlvbkRhdGEoKTtcclxuICAgICAgICBpZihvdXRwdXREYXRhICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiBbb3V0cHV0RGF0YV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgQXJyYXk8U2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uT3V0cHV0RGF0YT4oKTtcclxuICAgIH1cclxufSJdfQ==