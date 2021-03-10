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
            //this.setCalculatorType(this.calculatorType.id);
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
        Object.defineProperty(SignalManagerCalculation.prototype, "type", {
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
        SignalManagerCalculation.prototype.setXValue = function (serieName) {
            var xSignal = this.calculatorType.getChilds()[0];
            xSignal.value = serieName;
        };
        SignalManagerCalculation.prototype.setYValue = function (serieName) {
            var ySignal = this.calculatorType.getChilds()[1];
            ySignal.value = serieName;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvc2lnbmFsTWFuYWdlckRhdGFNb2RlbC9zaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQWVBO1FBQThDLDRDQUFjO1FBbUd4RDs7OztXQUlHO1FBQ0gsa0NBQVksSUFBWTtZQUF4QixZQUNJLGtCQUFNLElBQUksQ0FBQyxTQVlkO1lBVkcsS0FBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLEdBQUcsd0JBQXdCLENBQUMsUUFBUSxDQUFDO1lBQ25ELHdCQUF3QixDQUFDLFFBQVEsRUFBRSxDQUFDO1lBRXBDLEtBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSx5QkFBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBRW5ELG1DQUFtQztZQUNuQyxLQUFJLENBQUMsY0FBYyxHQUFHLElBQUkseURBQTJCLENBQUMsV0FBVyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQ2xGLGlEQUFpRDtZQUVqRCxLQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSSxDQUFDLGNBQWMsRUFBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOztRQUNyRCxDQUFDO1FBM0dELHNCQUFXLCtDQUFTO2lCQUFwQjtnQkFDSSxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztnQkFDakQsSUFBRyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQztvQkFDckIsSUFBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLFNBQVMsRUFBQzt3QkFDaEMsT0FBTyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQztxQkFDN0M7aUJBQ0o7Z0JBQ0QsT0FBTyxLQUFLLENBQUM7WUFDakIsQ0FBQzs7O1dBQUE7UUFTRCxzQkFBVyxtREFBYTtZ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bW9uL2RhdGVUaW1lSGVscGVyXCI7XHJcbmltcG9ydCB7IElDYWxjdWxhdGlvbiB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy9jYWxjdWxhdGlvbkludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbiB9IGZyb20gXCIuLi9jb21tb24vY2FsY3VsYXRpb24vY2FsY3VsYXRpb25cIjtcclxuaW1wb3J0IHsgU2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlIH0gZnJvbSBcIi4vc2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlXCI7XHJcbmltcG9ydCB7IFNlcmllQ29udGFpbmVyIH0gZnJvbSBcIi4uL2NvbW1vbi9zaWduYWwvc2VyaWVDb250YWluZXJcIjtcclxuaW1wb3J0IHsgSVNlcmllTm9kZSB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy9zZXJpZU5vZGVJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uT3V0cHV0RGF0YSB9IGZyb20gXCIuL3NpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbk91dHB1dERhdGFcIjtcclxuaW1wb3J0IHsgQmFzZVNlcmllcyB9IGZyb20gXCIuLi9jaGFydE1hbmFnZXJEYXRhTW9kZWwvYmFzZVNlcmllc1wiO1xyXG5pbXBvcnQgeyBTZXJpZUdyb3VwIH0gZnJvbSBcIi4uL2NvbW1vbi9zaWduYWwvc2VyaWVHcm91cFwiO1xyXG5pbXBvcnQgeyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGEgfSBmcm9tIFwiLi9zaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGFcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhUG9pbnRzIH0gZnJvbSBcIi4uL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRpb25EYXRhUG9pbnRzXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzIH0gZnJvbSBcIi4uL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHNcIjtcclxuaW1wb3J0IHsgTm9kZVR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL3NpZ25hbC9zZXJpZU5vZGVcIjtcclxuaW1wb3J0IHsgU2VyaWVzVHlwZSB9IGZyb20gXCIuLi9jaGFydE1hbmFnZXJEYXRhTW9kZWwvc2VyaWVzVHlwZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbiBleHRlbmRzIFNlcmllQ29udGFpbmVye1xyXG4gICAgXHJcbiAgICBpZDogc3RyaW5nO1xyXG4gICAgICAgICAgICBcclxuICAgIHByaXZhdGUgc3RhdGljIHVuaXF1ZUlkOiBudW1iZXIgPSAwOyAvLyBUT0RPOiB1c2UgdW5pcXVlIGlkIFxyXG5cclxuICAgIHByaXZhdGUgX2NhbGN1bGF0aW9uOiBJQ2FsY3VsYXRpb247XHJcbiAgICBwcml2YXRlIGNhbGN1bGF0b3JUeXBlOiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRvclR5cGU7XHJcblxyXG5cclxuICAgIHB1YmxpYyBnZXQgdmFsaWROb2RlKCk6IGJvb2xlYW57XHJcbiAgICAgICAgbGV0IG91dHB1dERhdGEgPSB0aGlzLmdldE91dHB1dENhbGN1bGF0aW9uRGF0YSgpO1xyXG4gICAgICAgIGlmKG91dHB1dERhdGEubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIGlmKG91dHB1dERhdGFbMF0uc2VyaWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvdXRwdXREYXRhWzBdLnNlcmllLnJhd1BvaW50c1ZhbGlkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgb25seSB0aGUgdmlzaWJsZSBjaGlsZHMgKGUuZyB2aXNpYmxlIGNoaWxkcyBvbmx5IGF2YWlsYWJsZSBpbiBlZGl0IG1vZGUpXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7KElTZXJpZU5vZGVbXXx1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHZpc2libGVDaGlsZHMoKTogSVNlcmllTm9kZVtdfHVuZGVmaW5lZCB7XHJcbiAgICAgICAgbGV0IGRhdGFNb2RlbCA9IHRoaXMuZ2V0RGF0YU1vZGVsKCk7XHJcbiAgICAgICAgaWYoZGF0YU1vZGVsICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGlmKGRhdGFNb2RlbC5lZGl0TW9kZUFjdGl2ZSA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmNoaWxkcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuZ2V0T3V0cHV0Q2FsY3VsYXRpb25EYXRhKCk7IFxyXG4gICAgICAgIGlmKGRhdGEubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IG11bHRpIG91dHB1dCAsdXNlIG5vdCBvbmx5IHRoZSBmaXJzdCBvdXRwdXRcclxuICAgICAgICAgICAgcmV0dXJuIGRhdGFbMF0uc2VyaWUhLm5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuX25hbWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgbmFtZShuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHNlcmllKCk6IEJhc2VTZXJpZXN8dW5kZWZpbmVkIHtcclxuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuZ2V0T3V0cHV0Q2FsY3VsYXRpb25EYXRhKCk7IFxyXG4gICAgICAgIGlmKGRhdGEubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IG11bHRpIG91dHB1dCAsbm90IG9ubHkgdGhlIGZpcnN0IG91dHB1dFxyXG4gICAgICAgICAgIHJldHVybiBkYXRhWzBdLnNlcmllO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgc2VyaWUodmFsdWU6IEJhc2VTZXJpZXN8dW5kZWZpbmVkKSB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjb2xvcigpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5nZXRPdXRwdXRDYWxjdWxhdGlvbkRhdGEoKTsgXHJcbiAgICAgICAgaWYoZGF0YS5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgLy8gVE9ETzogbXVsdGkgb3V0cHV0ICxub3Qgb25seSB0aGUgZmlyc3Qgb3V0cHV0XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhWzBdLmNvbG9yO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgY29sb3IoY29sb3I6IHN0cmluZyB8IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5nZXRPdXRwdXRDYWxjdWxhdGlvbkRhdGEoKTsgXHJcbiAgICAgICAgaWYoZGF0YS5sZW5ndGggPiAwICYmIGNvbG9yICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IG11bHRpIG91dHB1dCAsbm90IG9ubHkgdGhlIGZpcnN0IG91dHB1dFxyXG4gICAgICAgICAgICBkYXRhWzBdLmNvbG9yID0gY29sb3I7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgc3RhcnRUcmlnZ2VyVGltZSgpOiBudW1iZXJ7XHJcbiAgICAgICAgbGV0IHNlcmllR3JvdXAgPSB0aGlzLmdldFNlcmllR3JvdXAoKTtcclxuICAgICAgICBpZihzZXJpZUdyb3VwICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiBzZXJpZUdyb3VwLnN0YXJ0VHJpZ2dlclRpbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAwOyAvLyBOb3Qgc3RhcnQgdHJpZ2dlciBhdmFpbGFibGVcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHN0YXJ0VHJpZ2dlclRpbWVGb3JtYXRlZCgpOiBzdHJpbmd7XHJcbiAgICAgICAgbGV0IHNlcmllR3JvdXAgPSB0aGlzLmdldFNlcmllR3JvdXAoKTtcclxuICAgICAgICBpZihzZXJpZUdyb3VwICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiBEYXRlVGltZUhlbHBlci5nZXREYXRlVGltZShzZXJpZUdyb3VwLnN0YXJ0VHJpZ2dlclRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJcIjsgLy8gTm90IHN0YXJ0IHRyaWdnZXIgaW5mbyBhdmFpbGFibGVcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uLlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKXtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuXHJcbiAgICAgICAgdGhpcy5pZCA9IG5hbWUgKyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb24udW5pcXVlSWQ7XHJcbiAgICAgICAgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uLnVuaXF1ZUlkKys7XHJcblxyXG4gICAgICAgIHRoaXMuX2NhbGN1bGF0aW9uID0gbmV3IENhbGN1bGF0aW9uKFwic2VsZWN0IHR5cGVcIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gSW5pdCA9PiBBZGQgVHlwZSBmb3IgY2FsY3VsYXRpb25cclxuICAgICAgICB0aGlzLmNhbGN1bGF0b3JUeXBlID0gbmV3IFNpZ25hbE1hbmFnZXJDYWxjdWxhdG9yVHlwZShcIkFsZ29yaXRobVwiLCBcInNlbGVjdCB0eXBlXCIpO1xyXG4gICAgICAgIC8vdGhpcy5zZXRDYWxjdWxhdG9yVHlwZSh0aGlzLmNhbGN1bGF0b3JUeXBlLmlkKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRTZXJpZUNvbnRhaW5lcih0aGlzLmNhbGN1bGF0b3JUeXBlICwgLTEpO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3Bvc2UoKXtcclxuICAgICAgICB0aGlzLmNhbGN1bGF0b3JUeXBlLmRpc3Bvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgYWxsIHJlZmVyZW5jZXMgdG8gdGhlIGdpdmVuIHNlcmllcyBmcm9tIHRoZSBjYWxjdWxhdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVcclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlbW92ZVJlZmVyZW5jZXNUb1NlcmllKHNlcmllOiBCYXNlU2VyaWVzKXtcclxuICAgICAgICB0aGlzLmNhbGN1bGF0b3JUeXBlLnJlbW92ZVJlZmVyZW5jZVRvU2VyaWUoc2VyaWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBnZXQgdHlwZSgpOiBOb2RlVHlwZXtcclxuICAgICAgICBsZXQgZGF0YU1vZGVsID0gdGhpcy5nZXREYXRhTW9kZWwoKTtcclxuICAgICAgICBpZihkYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgaWYoZGF0YU1vZGVsLmVkaXRNb2RlQWN0aXZlID09IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE5vZGVUeXBlLmNvbnRhaW5lcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gTm9kZVR5cGUuc2VyaWVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgY2FsY3VsYXRvciB0eXBlKGUuZy4gXCJhZGRcIiwgXCJzdWJcIiwgLi4uKVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjYWxjdWxhdG9yVHlwZUlkXHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRDYWxjdWxhdG9yVHlwZShjYWxjdWxhdG9yVHlwZUlkOiBzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMuY2FsY3VsYXRvclR5cGUudmFsdWUgPSBjYWxjdWxhdG9yVHlwZUlkO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gUmFpc2UgZGF0YSBjaGFuZ2VkIGV2ZW50XHJcbiAgICAgICAgdGhpcy5vbkRhdGFDaGFuZ2VkKHRoaXMsIDxhbnk+Y2FsY3VsYXRvclR5cGVJZCk7IC8vIFRPRE86IHVzZSBldmVudGFyZ3NcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0WFZhbHVlKHNlcmllTmFtZTogc3RyaW5nKXtcclxuICAgICAgICBsZXQgeFNpZ25hbCA9IHRoaXMuY2FsY3VsYXRvclR5cGUuZ2V0Q2hpbGRzKClbMF0gYXMgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhO1xyXG4gICAgICAgIHhTaWduYWwudmFsdWUgPSBzZXJpZU5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFlWYWx1ZShzZXJpZU5hbWU6IHN0cmluZyl7XHJcbiAgICAgICAgbGV0IHlTaWduYWwgPSB0aGlzLmNhbGN1bGF0b3JUeXBlLmdldENoaWxkcygpWzFdIGFzIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YTtcclxuICAgICAgICB5U2lnbmFsLnZhbHVlID0gc2VyaWVOYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRPdXRwdXRTaWduYWxOYW1lKG5hbWU6IHN0cmluZyl7XHJcbiAgICAgICAgbGV0IG91dHB1dERhdGFzID0gdGhpcy5nZXRPdXRwdXRDYWxjdWxhdGlvbkRhdGEoKTsgXHJcbiAgICAgICAgaWYob3V0cHV0RGF0YXMgIT0gdW5kZWZpbmVkICYmIG91dHB1dERhdGFzLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICBvdXRwdXREYXRhc1swXS52YWx1ZSA9IG5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIENsb25lcyB0aGUgY2FsY3VsYXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvblxyXG4gICAgICovXHJcbiAgICBjbG9uZSgpOiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb257XHJcbiAgICAgICAgLy8gQ2xvbmUgb2JqZWN0XHJcbiAgICAgICAgbGV0IGNsb25lZFNpZ25hbENhbGN1bGF0aW9uID0gbmV3IFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbih0aGlzLm5hbWUpO1xyXG4gICAgICAgIGNsb25lZFNpZ25hbENhbGN1bGF0aW9uLl9jYWxjdWxhdGlvbiA9IHRoaXMuX2NhbGN1bGF0aW9uO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIENsb25lIGNhbGN1bGF0b3IgdHlwZSBjaGlsZCBjb250YWluZXJcclxuICAgICAgICBjbG9uZWRTaWduYWxDYWxjdWxhdGlvbi5jaGlsZHMuc3BsaWNlKDAsMSk7IC8vIFRPRE86IEltcGxlbWVudCBSZW1vdmVTZXJpZUNvbnRhaW5lclxyXG4gICAgICAgIGxldCBjYWxjdWxhdG9yVHlwZSA9IHRoaXMuY2FsY3VsYXRvclR5cGUuY2xvbmUoKSBhcyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRvclR5cGU7XHJcbiAgICAgICAgY2xvbmVkU2lnbmFsQ2FsY3VsYXRpb24uY2FsY3VsYXRvclR5cGUgPSBjYWxjdWxhdG9yVHlwZTtcclxuICAgICAgICBjbG9uZWRTaWduYWxDYWxjdWxhdGlvbi5hZGRTZXJpZUNvbnRhaW5lcihjYWxjdWxhdG9yVHlwZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGNsb25lZFNpZ25hbENhbGN1bGF0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTmVlZGVkIHRvIHVwZGF0ZSB0aGUgaW5wdXQgc2VyaWVzIG9mIHRoaXMgY2FsY3VsYXRpb25zIHRvIHRoZSBuZXcgc2VyaWVzIG9mIHRoZSBuZXcgc2VyaWVHcm91cFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U2VyaWVHcm91cH0gc2VyaWVHcm91cFxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvblxyXG4gICAgICovXHJcbiAgICB1cGRhdGVJbnB1dERhdGEoc2VyaWVHcm91cDogU2VyaWVHcm91cCl7XHJcbiAgICAgICAgbGV0IGNhbGN1bGF0aW9uSW5wdXREYXRhcyA9IHRoaXMuZ2V0SW5wdXRDYWxjdWxhdGlvbkRhdGEoKTtcclxuICAgICAgICBmb3IobGV0IGo9MDsgaiA8IGNhbGN1bGF0aW9uSW5wdXREYXRhcy5sZW5ndGg7IGorKyl7XHJcbiAgICAgICAgICAgIGxldCBpbnB1dERhdGEgPSBjYWxjdWxhdGlvbklucHV0RGF0YXNbal07XHJcbiAgICAgICAgICAgIGlmKGlucHV0RGF0YS5zZXJpZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgLy8gZmluZCBzZXJpZSBpbiBuZXcgY2xvbmVkIHNlcmllIGdyb3VwIGJ5IG5hbWUgLi4uXHJcbiAgICAgICAgICAgICAgICBsZXQgZm91bmRTZXJpZSA9IHNlcmllR3JvdXAuZ2V0U2VyaWUoaW5wdXREYXRhLnNlcmllIS5uYW1lKTtcclxuICAgICAgICAgICAgICAgIGlmKGZvdW5kU2VyaWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyAuLi4gYW5kIHNldCB0aGUgbmV3IHNlcmllXHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXREYXRhLnNlcmllID0gZm91bmRTZXJpZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMob3IgcmVzZXRzKSBhIGZsYWcgYXQgYWxsIGlucHV0cyBvZiB0aGlzIGNhbGN1bGF0aW9uIHdoZXJlIGEgZHJvcCBvZiB0aGUgZ2l2ZW4gc2VyaWVzIHdvdWxkIGJlIHBvc3NpYmxlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBhY3RpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtCYXNlU2VyaWVzfSBzZXJpZXNcclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25cclxuICAgICAqL1xyXG4gICAgc2V0RHJvcExvY2F0aW9ucyhhY3RpdmF0ZTogYm9vbGVhbiwgc2VyaWVzOiBCYXNlU2VyaWVzKXtcclxuICAgICAgICBpZih0aGlzLnZpc2libGVDaGlsZHMgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgaWYodGhpcy52aXNpYmxlQ2hpbGRzIS5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICAgIGxldCBjYWxjdWxhdGlvblR5cGUgPSB0aGlzLnZpc2libGVDaGlsZHNbMF0gYXMgU2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlO1xyXG4gICAgICAgICAgICAgICAgY2FsY3VsYXRpb25UeXBlLnZpc2libGVDaGlsZHMhLmZvckVhY2goY2FsY3VsYXRpb25EYXRhPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGNhbGN1bGF0aW9uRGF0YSBpbnN0YW5jZW9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNTZXJpZXNEcm9wQWxsb3dlZEF0Q3VycmVudElucHV0SXRlbShjYWxjdWxhdGlvbkRhdGEsIHNlcmllcykgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdGlvbkRhdGEuZHJvcFBvc3NpYmxlID0gYWN0aXZhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHRcdFx0XHRcdFx0XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiBhIGRyb3Agb2YgYSBzZXJpZXMgaXMgcG9zc2libGUgZm9yIHRoZSBnaXZlbiBjYWxjdWxhdGlvbiBpbnB1dFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge1NpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YX0gaW5wdXRJdGVtXHJcbiAgICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNlcmllXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpc1Nlcmllc0Ryb3BBbGxvd2VkQXRDdXJyZW50SW5wdXRJdGVtKGlucHV0SXRlbTogU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhLCBzZXJpZTogQmFzZVNlcmllcyk6IGJvb2xlYW57XHJcblx0XHQvLyBJdCBpcyBub3QgYWxsb3dlZCB0byB1c2UgeHkgb3IgZmZ0IHNlcmllcyBhcyBpbnB1dCBcclxuXHRcdGlmKHNlcmllLnR5cGUgPT0gU2VyaWVzVHlwZS54eVNlcmllcyB8fCBzZXJpZS50eXBlID09IFNlcmllc1R5cGUuZmZ0U2VyaWVzKXtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBJdCBpcyBub3QgYWxsb3dlZCB0byB1c2UgZmZ0IHNlcmllcyBhcyBpbnB1dCBmb3IgRkZUIGNhbGN1bGF0aW9uXHJcbiAgICAgICAgLy8gaWYoaW5wdXRJdGVtLnBhcmVudCBpbnN0YW5jZW9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdG9yVHlwZSl7XHJcbiAgICAgICAgLy8gICAgIGlmKGlucHV0SXRlbS5wYXJlbnQudmFsdWUgPT0gJ0ZGVCcgJiYgc2VyaWUudHlwZSA9PSBTZXJpZXNUeXBlLmZmdFNlcmllcykge1xyXG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfVxyXG5cdFx0Ly8gU2VyaWVzIGNhbiBvbmx5IGJlIGRyb3BwZWQgYXQgYW4gaW5wdXQgd2hlcmUgc2VyaWUoZGF0YXBvaW50cykgYXJlIGFsbG93ZWRcclxuXHRcdGlmKCEoaW5wdXRJdGVtLmNhbGN1bGF0aW9uRGF0YSBpbnN0YW5jZW9mIENhbGN1bGF0aW9uRGF0YVBvaW50cykgJiYgIShpbnB1dEl0ZW0uY2FsY3VsYXRpb25EYXRhIGluc3RhbmNlb2YgQ2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHMpKXtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0bGV0IG91dHB1dFNlcmllc09mQ2FsY3VsYXRpb24gPSBpbnB1dEl0ZW0ucGFyZW50IS5nZXRTZXJpZXMoKTtcclxuXHRcdGlmKG91dHB1dFNlcmllc09mQ2FsY3VsYXRpb24uaW5kZXhPZihzZXJpZSkgPT0gLTEpeyAvLyBPdXRwdXRTZXJpZXMgb2YgdGhpcyBjYWxjdWxhdGlvbiBhcmUgbm90IGFsbG93ZWQgZm9yIHRoaXMgY2FsY3VsYXRpb24gYXMgaW5wdXQoY2lyY3VsYXIgcmVmZXJlbmNlKVxyXG5cdFx0XHRpZihpbnB1dEl0ZW0uZ2V0U2VyaWVHcm91cCgpID09IHNlcmllLnBhcmVudCl7IC8vIENoZWNrIGZvciBzYW1lIHNlcmllIGdyb3VwXHJcblx0XHRcdFx0aWYoaW5wdXRJdGVtLnBhcmVudCBpbnN0YW5jZW9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdG9yVHlwZSl7XHJcblx0XHRcdFx0XHRpZihpbnB1dEl0ZW0ucGFyZW50IS5jeWNsZUZvdW5kKHNlcmllLm5hbWUpID09IGZhbHNlKXsgLy8gY2hlY2sgZm9yIGN5Y2xlXHJcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYWxsIGNhbGN1bGF0aW9uIGlucHV0IGRhdGFzXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0FycmF5PFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YT59XHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRJbnB1dENhbGN1bGF0aW9uRGF0YSgpOiBBcnJheTxTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGE+e1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNhbGN1bGF0b3JUeXBlLmdldElucHV0Q2FsY3VsYXRpb25EYXRhKCk7XHJcbiAgICB9ICAgIFxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYWxsIGNhbGN1bGF0aW9uIG91dHB1dCBkYXRhc1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25PdXRwdXREYXRhPn1cclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldE91dHB1dENhbGN1bGF0aW9uRGF0YSgpOiBBcnJheTxTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25PdXRwdXREYXRhPntcclxuICAgICAgICBsZXQgb3V0cHV0RGF0YSA9IHRoaXMuY2FsY3VsYXRvclR5cGUuZ2V0Rmlyc3RPdXRwdXRDYWxjdWxhdGlvbkRhdGEoKTtcclxuICAgICAgICBpZihvdXRwdXREYXRhICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiBbb3V0cHV0RGF0YV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgQXJyYXk8U2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uT3V0cHV0RGF0YT4oKTtcclxuICAgIH1cclxufSJdfQ==