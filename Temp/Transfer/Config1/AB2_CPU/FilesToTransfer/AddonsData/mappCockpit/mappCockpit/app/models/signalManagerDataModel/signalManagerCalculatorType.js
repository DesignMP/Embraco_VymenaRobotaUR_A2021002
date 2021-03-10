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
define(["require", "exports", "../common/calculatorProvider/calculatorProvider", "../common/signal/serieContainer", "../common/calculatorProvider/calculationData", "../common/calculatorProvider/calculationDataPoints", "../common/calculatorProvider/calculationDataNumber", "../common/calculatorProvider/calculationDataNumberOrPoints", "./signalManagerCalculationInputData", "./signalManagerCalculationOutputData", "../chartManagerDataModel/eventSerieDataChangedArgs", "./signalManagerCalculation", "../chartManagerDataModel/YTSeries", "../chartManagerDataModel/FFTSeries", "../chartManagerDataModel/seriesType"], function (require, exports, calculatorProvider_1, serieContainer_1, calculationData_1, calculationDataPoints_1, calculationDataNumber_1, calculationDataNumberOrPoints_1, signalManagerCalculationInputData_1, signalManagerCalculationOutputData_1, eventSerieDataChangedArgs_1, signalManagerCalculation_1, YTSeries_1, FFTSeries_1, seriesType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SignalManagerCalculatorType = /** @class */ (function (_super) {
        __extends(SignalManagerCalculatorType, _super);
        /**
         * Creates an instance of SignalManagerCalculatorType
         * @param {string} name
         * @param {string} value
         * @memberof SignalManagerCalculatorType
         */
        function SignalManagerCalculatorType(name, value) {
            var _this = _super.call(this, name, "", true) || this;
            _this._inputDataChangedHandler = function (sender, args) { return _this.onInputDataValueChanged(sender, args); };
            _this._inputSerieDataChangedHandler = function (sender, args) { return _this.onSerieDataChanged(sender, args); };
            _this._outputDataChangedHandler = function (sender, args) { return _this.onOutputDataValueChanged(sender, args); };
            _this.dataTypeName = "String";
            _this._value = value;
            _this.canDelete = false;
            _this._values = _this.getAvailableCalculators();
            _this._onlyValuesFromListAreAllowed = true;
            return _this;
        }
        Object.defineProperty(SignalManagerCalculatorType.prototype, "values", {
            get: function () {
                return this._values;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculatorType.prototype, "onlyValuesFromListAreAllowed", {
            get: function () {
                return this._onlyValuesFromListAreAllowed;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculatorType.prototype, "minValue", {
            get: function () {
                return undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculatorType.prototype, "maxValue", {
            get: function () {
                return undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculatorType.prototype, "name", {
            /**
             * Returns the name of this calculator type
             *
             * @readonly
             * @type {string}
             * @memberof SignalManagerCalculatorType
             */
            get: function () {
                var dataModel = this.getDataModel();
                if (dataModel != undefined) {
                    if (dataModel.editModeActive == true) {
                        return this._name; // Show the name of calculator type in the edit mode (e.g. Algorithm)
                    }
                }
                return this.value; // Show only the value (e.g. "Add")
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculatorType.prototype, "parent", {
            /**
             * Returns the parent of this calculator type
             *
             * @type {(ISerieContainer | undefined)}
             * @memberof SignalManagerCalculatorType
             */
            get: function () {
                return this._parent;
            },
            /**
             * Sets the parent of this calculator type
             *
             * @memberof SignalManagerCalculatorType
             */
            set: function (value) {
                this._parent = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Remove reference to serie from this calculation
         *
         * @param {BaseSeries} serie
         * @memberof SignalManagerCalculatorType
         */
        SignalManagerCalculatorType.prototype.removeReferenceToSerie = function (serie) {
            var calcDatas = this.getCalculationDatasCorrespondingToSignalName(serie);
            calcDatas.forEach(function (calculationData) {
                calculationData.value = "";
                var defaultData = new Array();
                calculationData.calculationData.setData(defaultData);
            });
        };
        Object.defineProperty(SignalManagerCalculatorType.prototype, "displayValue", {
            // needed for CellTypeEditor
            get: function () {
                return this._value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerCalculatorType.prototype, "value", {
            /**
             * Returns the value of this calculator type
             *
             * @type {string}
             * @memberof SignalManagerCalculatorType
             */
            get: function () {
                return this._value;
            },
            /**
             * Sets the value of this calculator type
             *
             * @memberof SignalManagerCalculatorType
             */
            set: function (value) {
                if (this._value != value) {
                    this._value = value;
                    // TODO: get calculator id (from displayValue)
                    this._calculator = calculatorProvider_1.CalculatorProvider.getInstance().getCalculator(value); // TODO: check id/name/value
                    this.updateChildsByCalculatorType();
                    // Calculate with default values to get error infos which data i not available
                    this.calculate();
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Attach to the events of the input and output data
         *
         * @private
         * @memberof SignalManagerCalculatorType
         */
        SignalManagerCalculatorType.prototype.attachEvents = function () {
            for (var i = 0; i < this.childs.length; i++) {
                if (this.childs[i] instanceof signalManagerCalculationInputData_1.SignalManagerCalculationInputData) {
                    this.childs[i].eventDataChanged.attach(this._inputDataChangedHandler);
                    this.childs[i].eventSerieDataChanged.attach(this._inputSerieDataChangedHandler);
                }
                else if (this.childs[i] instanceof signalManagerCalculationOutputData_1.SignalManagerCalculationOutputData) {
                    this.childs[i].eventDataChanged.attach(this._outputDataChangedHandler);
                }
            }
        };
        /**
         * Detach events from the input and output data
         *
         * @private
         * @memberof SignalManagerCalculatorType
         */
        SignalManagerCalculatorType.prototype.detachEvents = function () {
            for (var i = 0; i < this.childs.length; i++) {
                if (this.childs[i] instanceof signalManagerCalculationInputData_1.SignalManagerCalculationInputData) {
                    this.childs[i].eventDataChanged.detach(this._inputDataChangedHandler);
                    this.childs[i].eventSerieDataChanged.detach(this._inputSerieDataChangedHandler);
                }
                else if (this.childs[i] instanceof signalManagerCalculationOutputData_1.SignalManagerCalculationOutputData) {
                    this.childs[i].eventDataChanged.detach(this._outputDataChangedHandler);
                }
            }
        };
        SignalManagerCalculatorType.prototype.updateChildsByCalculatorType = function () {
            // Detach events of current childs
            this.detachEvents();
            // Clear current childs
            this.clear();
            if (this._calculator == undefined) {
                return;
            }
            // Add input data for calculation
            var defaultInputData = this._calculator.getDefaultInputData();
            for (var i = 0; i < defaultInputData.length; i++) {
                var inputData = new signalManagerCalculationInputData_1.SignalManagerCalculationInputData(defaultInputData[i]);
                this.addSerieNode(inputData);
            }
            // Add ouput data for calculation
            var defaultOutputData = this._calculator.getDefaultOutputData();
            for (var i = 0; i < defaultOutputData.length; i++) {
                var outputData = new signalManagerCalculationOutputData_1.SignalManagerCalculationOutputData(defaultOutputData[i]);
                this.addSerieNode(outputData);
            }
            // Attach events to the new childs
            this.attachEvents();
        };
        Object.defineProperty(SignalManagerCalculatorType.prototype, "description", {
            /**
             * Returns the description of the calculator type
             *
             * @readonly
             * @type {string}
             * @memberof SignalManagerCalculatorType
             */
            get: function () {
                if (this._calculator != undefined) {
                    return this._calculator.description;
                }
                return "";
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Dispose the SignalManagerCalculatorType
         *
         * @memberof SignalManagerCalculatorType
         */
        SignalManagerCalculatorType.prototype.dispose = function () {
            // Detach events
            this.detachEvents();
            _super.prototype.dispose.call(this);
        };
        /**
         * Clones the SignalManagerCalculatorType object with all childs
         *
         * @returns {SignalManagerCalculatorType}
         * @memberof SignalManagerCalculatorType
         */
        SignalManagerCalculatorType.prototype.clone = function () {
            // Clone object
            var clone = new SignalManagerCalculatorType(this._name, "");
            if (this._calculator != undefined) {
                clone.value = this.value; // Set current used calculator from original
            }
            // Set input data 
            var originalInputDatas = this.getInputCalculationData();
            var clonedInputDatas = clone.getInputCalculationData();
            for (var i = 0; i < originalInputDatas.length; i++) {
                // Set data from original to cloned objct
                var originalInputData = originalInputDatas[i];
                clonedInputDatas[i].value = originalInputData.value;
                if (originalInputData.serie != undefined) {
                    clonedInputDatas[i].serie = originalInputData.serie.clone();
                }
                clonedInputDatas[i].calculationData.setData(originalInputData.calculationData.getData());
            }
            // Set output data
            var originalOutputData = this.getFirstOutputCalculationData(); // TODO: multioutput
            var clonedOutputData = clone.getFirstOutputCalculationData(); // TODO: multioutput
            if (originalOutputData != undefined && clonedOutputData != undefined) {
                clonedOutputData.value = originalOutputData.value;
            }
            clone.calculate();
            return clone;
        };
        /**
         * Returns a list with available calculators displayValue and id
         *
         * @private
         * @returns {any[]}
         * @memberof SignalManagerCalculatorType
         */
        SignalManagerCalculatorType.prototype.getAvailableCalculators = function () {
            var possibleTypes = new Array();
            var calculators = calculatorProvider_1.CalculatorProvider.getInstance().calculators;
            for (var i = 0; i < calculators.length; i++) {
                possibleTypes.push({ displayValue: calculators[i].displayName, value: calculators[i].id });
            }
            return possibleTypes;
        };
        SignalManagerCalculatorType.prototype.getSerie = function (serieName) {
            if (serieName != undefined) {
                var serieGroup = this.getSerieGroup();
                if (serieGroup != undefined) {
                    return serieGroup.getSerie(serieName);
                }
            }
            return undefined;
        };
        SignalManagerCalculatorType.prototype.onInputDataValueChanged = function (sender, args) {
            if (sender instanceof signalManagerCalculationInputData_1.SignalManagerCalculationInputData) {
                var signalCalculationData = sender;
                var calculationData = signalCalculationData.calculationData;
                if (calculationData instanceof calculationData_1.CalculationData) {
                    // Check if old input data was a signal(name)
                    var oldSerie = this.getSerie(calculationData.value);
                    if (oldSerie != undefined) {
                        // Remove current used signal from calculationData
                        signalCalculationData.serie = undefined;
                    }
                    // Check if new input data is a signal(name)
                    var serie = this.getSerie(signalCalculationData.value); // get the signal group and look for signal with given name in it
                    if (serie != undefined) {
                        if (this.cycleFound(signalCalculationData.value, "", true) == false) {
                            calculationData.value = signalCalculationData.value;
                            calculationData.type = serie.type;
                            if (calculationData instanceof calculationDataPoints_1.CalculationDataPoints || calculationData instanceof calculationDataNumberOrPoints_1.CalculationDataNumberOrPoints) {
                                calculationData.setData(serie.rawPoints);
                            }
                            // Add current used signal to calculationData
                            signalCalculationData.serie = serie;
                        }
                        else {
                            //  Cycle found use old input data
                            signalCalculationData.value = calculationData.value; // TODO: Show MessageBox
                        }
                    }
                    else {
                        calculationData.type = undefined;
                        this.setSignalCalculationValueToCalculationData(signalCalculationData, calculationData);
                    }
                    this.calculate();
                }
            }
        };
        /**
         * Sets the value of the signalCalculationData to the calculation data (NOT FOR serie names in signal calculation data; only for strings, numerics, ...)
         * Resets an old serie to undefined if it was used before in this SignalManagerCalculation data.
         *
         * @private
         * @param {SignalManagerCalculationInputData} signalCalculationData
         * @param {CalculationData} calculationData
         * @memberof SignalManagerCalculatorType
         */
        SignalManagerCalculatorType.prototype.setSignalCalculationValueToCalculationData = function (signalCalculationData, calculationData) {
            calculationData.value = signalCalculationData.value;
            if (calculationData instanceof calculationDataNumber_1.CalculationDataNumber || calculationData instanceof calculationDataNumberOrPoints_1.CalculationDataNumberOrPoints) {
                calculationData.setData(parseFloat(signalCalculationData.value));
            }
            else if (calculationData instanceof calculationDataPoints_1.CalculationDataPoints) {
                calculationData.setData(new Array()); // No signal data available, set empty points
            }
            // Remove current used serie from calculationData
            signalCalculationData.serie = undefined;
        };
        /**
         * Check if the signal name, which will be used for input of this calculation depends on the output of this calculation
         *
         * @param {string} inputSignalName
         * @param {string} [ouputSignalName=""]
         * @returns {boolean}
         * @memberof SignalManagerCalculatorType
         */
        SignalManagerCalculatorType.prototype.cycleFound = function (inputSignalName, ouputSignalName, showMessage) {
            if (ouputSignalName === void 0) { ouputSignalName = ""; }
            if (showMessage === void 0) { showMessage = false; }
            // get serieNode where it is defined(calculation output or normal signal)
            var serieNode = this.getSerieGroup().getSerieNode(inputSignalName);
            if (serieNode == undefined) {
                return false; // No signal node found => no cycle
            }
            if (!(serieNode instanceof signalManagerCalculation_1.SignalManagerCalculation)) {
                return false; // No calculated signal => no cycle
            }
            if (ouputSignalName == "") {
                //Workaround: Fixed for creation of FFT with D&D. Input data should be added after calculator has been created.
                var firstOutputData = this.getFirstOutputCalculationData();
                if (firstOutputData != undefined) {
                    ouputSignalName = firstOutputData.value;
                }
            }
            if (this.foundCircularReference(serieNode, ouputSignalName, showMessage)) {
                return true;
            }
            return false;
        };
        SignalManagerCalculatorType.prototype.foundCircularReference = function (calculationNode, ouputSignalName, showMessage) {
            if (ouputSignalName === void 0) { ouputSignalName = ""; }
            // get input signals of calculation
            // TODO: refactor a little
            if (calculationNode.getChilds()[0] instanceof SignalManagerCalculatorType) {
                var calculatorType = calculationNode.getChilds()[0];
                var inputSerieNodes = calculatorType.getInputCalculationData();
                for (var i = 0; i < inputSerieNodes.length; i++) {
                    if (inputSerieNodes[i].value == ouputSignalName) { // TODO: multi output
                        if (showMessage == true) {
                            alert("Circular reference found!");
                        }
                        return true; // input references to output of current calculation => cycle found
                    }
                    else {
                        var childSerieNode = inputSerieNodes[i].getSerieGroup().getSerieNode(inputSerieNodes[i].value);
                        if (childSerieNode != undefined) {
                            var cycleFound = inputSerieNodes[i].parent.cycleFound(inputSerieNodes[i].value, ouputSignalName, showMessage);
                            if (cycleFound == true) {
                                if (showMessage == true) {
                                    alert("Circular reference found!");
                                }
                                return true;
                            }
                        }
                    }
                }
            }
            return false;
        };
        SignalManagerCalculatorType.prototype.onSerieDataChanged = function (sender, args) {
            var serie = sender;
            var correspondingCalculationDatas = this.getCalculationDatasCorrespondingToSignalName(serie);
            if (args.action == eventSerieDataChangedArgs_1.SerieAction.dataPointsChanged) {
                correspondingCalculationDatas.forEach(function (calcData) {
                    calcData.calculationData.setData(args.data); // Sets the actual data points to the calculation input data
                });
                this.calculate();
            }
            else if (args.action == eventSerieDataChangedArgs_1.SerieAction.rename) {
                correspondingCalculationDatas.forEach(function (calcData) {
                    calcData.value = serie.name;
                });
            }
        };
        SignalManagerCalculatorType.prototype.getCalculationDatasCorrespondingToSignalName = function (serie) {
            var calcDatas = new Array();
            for (var i = 0; i < this.childs.length; i++) {
                var signalCalculationData = (this.childs[i]);
                if (signalCalculationData.serie == serie) {
                    calcDatas.push(this.childs[i]);
                }
            }
            return calcDatas;
        };
        /**
         * Calculates with the current input data and updates the outputdata
         *
         * @memberof SignalManagerCalculatorType
         */
        SignalManagerCalculatorType.prototype.calculate = function () {
            // Calculate with actual input data
            var inputData = new Array();
            var calculationOutputData = new Array();
            var inputCalculationData;
            var modifiedInputData = inputData;
            if (this._calculator != undefined) {
                // Start calculation with actual input data
                inputCalculationData = this.getInputCalculationData();
                inputCalculationData.forEach(function (inputCalculationData) {
                    inputData.push(inputCalculationData.calculationData);
                });
                modifiedInputData = this._calculator.prepareInputData(inputData); //prepares input data for each calculator
                calculationOutputData = this._calculator.calculate(modifiedInputData);
            }
            // Update outputdata TODO: multi output ,not only the first one
            var outputData = this.getFirstOutputCalculationData();
            if (outputData != undefined && outputData.serie != undefined) {
                if (this._calculator != undefined) {
                    var errors = this._calculator.getErrors();
                    if (errors.length > 0) {
                        outputData.serie.errorInfo = errors;
                    }
                }
                outputData.serie.updateCalculationDataInfo(modifiedInputData, this.value, this.getInputCalculationData());
                outputData.serie.updatePoints(calculationOutputData[0].getData());
                //Workaround: FFT exception, update color and name
                if (outputData.serie instanceof FFTSeries_1.FFTSeries && inputCalculationData[0].serie != undefined && inputCalculationData[0].serie.rawPointsValid) {
                    outputData.color = inputCalculationData[0].serie.color;
                    outputData.value = 'FFT(' + inputCalculationData[0].serie.name + ') ' + outputData.uniqueId;
                }
            }
        };
        SignalManagerCalculatorType.prototype.changeOutputSerieType = function (outputData, type) {
            var color = outputData.serie.color;
            var name = outputData.serie.name;
            if (type == seriesType_1.SeriesType.timeSeries) {
                outputData.serie = (new YTSeries_1.YTSeries(outputData.serie.signal, name, color));
            }
            else if (type == seriesType_1.SeriesType.fftSeries) {
                outputData.serie = (new FFTSeries_1.FFTSeries(outputData.serie.signal, name, color));
            }
        };
        /**
         * Returns all calculation input datas
         *
         * @returns {Array<SignalManagerCalculationInputData>}
         * @memberof SignalManagerCalculatorType
         */
        SignalManagerCalculatorType.prototype.getInputCalculationData = function () {
            var inputData = new Array();
            var calculationTypeChilds = this.childs;
            for (var i = 0; i < calculationTypeChilds.length; i++) {
                var signalCalculationData = calculationTypeChilds[i];
                if (signalCalculationData instanceof signalManagerCalculationInputData_1.SignalManagerCalculationInputData) {
                    inputData.push(signalCalculationData);
                }
            }
            return inputData;
        };
        /**
         * Returns the first calculation output data
         *
         * @returns {(SignalManagerCalculationOutputData|undefined)}
         * @memberof SignalManagerCalculatorType
         */
        SignalManagerCalculatorType.prototype.getFirstOutputCalculationData = function () {
            var calculationTypeChilds = this.childs;
            for (var i = 0; i < calculationTypeChilds.length; i++) {
                var calculationData = calculationTypeChilds[i];
                if (calculationData instanceof signalManagerCalculationOutputData_1.SignalManagerCalculationOutputData) {
                    return calculationData;
                }
            }
            return undefined;
        };
        /**
         * Returns a series fro the given name from this calculator type node (e.g. output series of calculations)
         *
         * @param {string} [serieName=""] if serieName = "" all series wil be returned
         * @returns {Array<ISerieNode>}
         * @memberof SignalManagerCalculatorType
         */
        SignalManagerCalculatorType.prototype.getSerieNodes = function (serieName) {
            if (serieName === void 0) { serieName = ""; }
            var serieNodes = new Array();
            for (var i = 0; i < this.childs.length; i++) {
                var child = this.childs[i];
                if (child instanceof signalManagerCalculationOutputData_1.SignalManagerCalculationOutputData) { // Is only a signal in case of outputdata
                    if (serieName == "" || child.value == serieName) {
                        serieNodes.push(child);
                    }
                }
                else if (child instanceof serieContainer_1.SerieContainer) {
                    serieNodes = serieNodes.concat(child.getSerieNodes(serieName));
                }
            }
            return serieNodes;
        };
        SignalManagerCalculatorType.prototype.onOutputDataValueChanged = function (sender, args) {
            var serieGroup = this.getSerieGroup();
            if (serieGroup != undefined) {
                var serieNode = this.getSerieGroup().getSerieNodes(args.data);
                if (serieNode.length > 1) { // Signal with given name already available => set signal name to the used name before
                    var signalCalculationData = sender;
                    signalCalculationData.value = args.oldData;
                    //let calculationData = signalCalculationData.calculationData
                    //calculationData.value = args.oldData; 
                    // TODO: Show MessageBox
                    return;
                }
            }
            this.onDataChanged(sender, args);
        };
        return SignalManagerCalculatorType;
    }(serieContainer_1.SerieContainer));
    exports.SignalManagerCalculatorType = SignalManagerCalculatorType;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvc2lnbmFsTWFuYWdlckRhdGFNb2RlbC9zaWduYWxNYW5hZ2VyQ2FsY3VsYXRvclR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQXFCQTtRQUFpRCwrQ0FBYztRQWlNM0Q7Ozs7O1dBS0c7UUFDSCxxQ0FBWSxJQUFZLEVBQUUsS0FBYTtZQUF2QyxZQUNJLGtCQUFNLElBQUksRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLFNBS3ZCO1lBdk1NLDhCQUF3QixHQUFHLFVBQUMsTUFBTSxFQUFFLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQTFDLENBQTBDLENBQUM7WUFDeEYsbUNBQTZCLEdBQUcsVUFBQyxNQUFNLEVBQUUsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBckMsQ0FBcUMsQ0FBQztZQUN4RiwrQkFBeUIsR0FBRyxVQUFDLE1BQU0sRUFBRSxJQUFJLElBQUssT0FBQSxLQUFJLENBQUMsd0JBQXdCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUEzQyxDQUEyQyxDQUFDO1lBWWxHLGtCQUFZLEdBQVcsUUFBUSxDQUFDO1lBcUw1QixLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNwQixLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN2QixLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1lBQzlDLEtBQUksQ0FBQyw2QkFBNkIsR0FBRyxJQUFJLENBQUM7O1FBQzdDLENBQUM7UUFsTUYsc0JBQVcsK0NBQU07aUJBQWpCO2dCQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztZ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QUFHLElBQUksQ0FBQyxhQUFhLEVBQUcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMvRCxJQUFHLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDLEVBQUUsc0ZBQXNGO29CQUM1RyxJQUFJLHFCQUFxQixHQUF1QyxNQUFNLENBQUM7b0JBQ3ZFLHFCQUFxQixDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO29CQUMzQyw2REFBNkQ7b0JBQzdELHdDQUF3QztvQkFDeEMsd0JBQXdCO29CQUN4QixPQUFPO2lCQUNWO2FBQ0o7WUFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyQyxDQUFDO1FBRUwsa0NBQUM7SUFBRCxDQUFDLEFBN2lCRCxDQUFpRCwrQkFBYyxHQTZpQjlEO0lBN2lCWSxrRUFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDYWxjdWxhdG9yUHJvdmlkZXIgfSBmcm9tIFwiLi4vY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdG9yUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgSUNhbGN1bGF0b3IgfSBmcm9tIFwiLi4vY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9pbnRlcmZhY2VzL2NhbGN1bGF0b3JJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU2VyaWVDb250YWluZXIgfSBmcm9tIFwiLi4vY29tbW9uL3NpZ25hbC9zZXJpZUNvbnRhaW5lclwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGEgfSBmcm9tIFwiLi4vY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdGlvbkRhdGFcIjtcclxuaW1wb3J0IHsgSVNlcmllTm9kZSB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy9zZXJpZU5vZGVJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVNlcmllQ29udGFpbmVyIH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL3NlcmllQ29udGFpbmVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YVBvaW50cyB9IGZyb20gXCIuLi9jb21tb24vY2FsY3VsYXRvclByb3ZpZGVyL2NhbGN1bGF0aW9uRGF0YVBvaW50c1wiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFOdW1iZXIgfSBmcm9tIFwiLi4vY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdGlvbkRhdGFOdW1iZXJcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHMgfSBmcm9tIFwiLi4vY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50c1wiO1xyXG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tIFwiLi4vY29tbW9uL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSUNlbGxJbmZvIH0gZnJvbSBcIi4uLy4uL3dpZGdldHMvY29tbW9uL2ludGVyZmFjZXMvY2VsbEluZm9JbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVZhbHVlTGlzdEl0ZW0gfSBmcm9tIFwiLi4vLi4vY29tbW9uL2ludGVyZmFjZXMvdmFsdWVMaXN0SXRlbUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4uL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9iYXNlU2VyaWVzXCI7XHJcbmltcG9ydCB7IFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YSB9IGZyb20gXCIuL3NpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YVwiO1xyXG5pbXBvcnQgeyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25PdXRwdXREYXRhIH0gZnJvbSBcIi4vc2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uT3V0cHV0RGF0YVwiO1xyXG5pbXBvcnQgeyBFdmVudFNlcmllRGF0YUNoYW5nZWRBcmdzLCBTZXJpZUFjdGlvbiB9IGZyb20gXCIuLi9jaGFydE1hbmFnZXJEYXRhTW9kZWwvZXZlbnRTZXJpZURhdGFDaGFuZ2VkQXJnc1wiO1xyXG5pbXBvcnQgeyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb24gfSBmcm9tIFwiLi9zaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25cIjtcclxuaW1wb3J0IHsgWVRTZXJpZXMgfSBmcm9tIFwiLi4vY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL1lUU2VyaWVzXCI7XHJcbmltcG9ydCB7IEZGVFNlcmllcyB9IGZyb20gXCIuLi9jaGFydE1hbmFnZXJEYXRhTW9kZWwvRkZUU2VyaWVzXCI7XHJcbmltcG9ydCB7IFNlcmllc1R5cGUgfSBmcm9tIFwiLi4vY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL3Nlcmllc1R5cGVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRvclR5cGUgZXh0ZW5kcyBTZXJpZUNvbnRhaW5lciBpbXBsZW1lbnRzIElDZWxsSW5mb3tcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfdmFsdWU6IHN0cmluZztcclxuXHJcbiAgICBwcml2YXRlIF9jYWxjdWxhdG9yOiBJQ2FsY3VsYXRvcnx1bmRlZmluZWQ7XHJcblxyXG4gICAgcHJpdmF0ZSBfaW5wdXREYXRhQ2hhbmdlZEhhbmRsZXIgPSAoc2VuZGVyLCBhcmdzKSA9PiB0aGlzLm9uSW5wdXREYXRhVmFsdWVDaGFuZ2VkKHNlbmRlciwgYXJncyk7XHJcbiAgICBwcml2YXRlIF9pbnB1dFNlcmllRGF0YUNoYW5nZWRIYW5kbGVyID0gKHNlbmRlciwgYXJncykgPT4gdGhpcy5vblNlcmllRGF0YUNoYW5nZWQoc2VuZGVyLCBhcmdzKTtcclxuICAgIHByaXZhdGUgX291dHB1dERhdGFDaGFuZ2VkSGFuZGxlciA9IChzZW5kZXIsIGFyZ3MpID0+IHRoaXMub25PdXRwdXREYXRhVmFsdWVDaGFuZ2VkKHNlbmRlciwgYXJncyk7XHJcblxyXG4gICAgcHJpdmF0ZSBfdmFsdWVzOiBBcnJheTxJVmFsdWVMaXN0SXRlbT47XHJcbiAgICBwdWJsaWMgZ2V0IHZhbHVlcygpOiBBcnJheTxJVmFsdWVMaXN0SXRlbT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfb25seVZhbHVlc0Zyb21MaXN0QXJlQWxsb3dlZDogYm9vbGVhbjtcclxuICAgIHB1YmxpYyBnZXQgb25seVZhbHVlc0Zyb21MaXN0QXJlQWxsb3dlZCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fb25seVZhbHVlc0Zyb21MaXN0QXJlQWxsb3dlZDtcclxuICAgIH1cclxuXHJcbiAgICBkYXRhVHlwZU5hbWU6IHN0cmluZyA9IFwiU3RyaW5nXCI7XHJcblxyXG4gICAgcHVibGljIGdldCBtaW5WYWx1ZSgpOiBudW1iZXJ8dW5kZWZpbmVke1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBnZXQgbWF4VmFsdWUoKTogbnVtYmVyfHVuZGVmaW5lZHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgbmFtZSBvZiB0aGlzIGNhbGN1bGF0b3IgdHlwZVxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRvclR5cGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBuYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IGRhdGFNb2RlbCA9IHRoaXMuZ2V0RGF0YU1vZGVsKCk7XHJcbiAgICAgICAgaWYoZGF0YU1vZGVsICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGlmKGRhdGFNb2RlbC5lZGl0TW9kZUFjdGl2ZSA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9uYW1lITsgLy8gU2hvdyB0aGUgbmFtZSBvZiBjYWxjdWxhdG9yIHR5cGUgaW4gdGhlIGVkaXQgbW9kZSAoZS5nLiBBbGdvcml0aG0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7IC8vIFNob3cgb25seSB0aGUgdmFsdWUgKGUuZy4gXCJBZGRcIilcclxuICAgIH0gICAgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBwYXJlbnQgb2YgdGhpcyBjYWxjdWxhdG9yIHR5cGVcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7KElTZXJpZUNvbnRhaW5lciB8IHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgcGFyZW50KCk6IElTZXJpZUNvbnRhaW5lciB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcmVudDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBwYXJlbnQgb2YgdGhpcyBjYWxjdWxhdG9yIHR5cGVcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgcGFyZW50KHZhbHVlOiBJU2VyaWVDb250YWluZXIgfCB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLl9wYXJlbnQgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZSByZWZlcmVuY2UgdG8gc2VyaWUgZnJvbSB0aGlzIGNhbGN1bGF0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtCYXNlU2VyaWVzfSBzZXJpZVxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdG9yVHlwZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVtb3ZlUmVmZXJlbmNlVG9TZXJpZShzZXJpZTogQmFzZVNlcmllcyl7XHJcbiAgICAgICAgbGV0IGNhbGNEYXRhcyA9IHRoaXMuZ2V0Q2FsY3VsYXRpb25EYXRhc0NvcnJlc3BvbmRpbmdUb1NpZ25hbE5hbWUoc2VyaWUpO1xyXG4gICAgICAgIGNhbGNEYXRhcy5mb3JFYWNoKGNhbGN1bGF0aW9uRGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGNhbGN1bGF0aW9uRGF0YS52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIGxldCBkZWZhdWx0RGF0YSA9IG5ldyBBcnJheTxJUG9pbnQ+KCk7XHJcbiAgICAgICAgICAgIGNhbGN1bGF0aW9uRGF0YS5jYWxjdWxhdGlvbkRhdGEuc2V0RGF0YSg8YW55PmRlZmF1bHREYXRhKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBuZWVkZWQgZm9yIENlbGxUeXBlRWRpdG9yXHJcbiAgICBwdWJsaWMgZ2V0IGRpc3BsYXlWYWx1ZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHZhbHVlIG9mIHRoaXMgY2FsY3VsYXRvciB0eXBlXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRvclR5cGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCB2YWx1ZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHZhbHVlIG9mIHRoaXMgY2FsY3VsYXRvciB0eXBlXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdG9yVHlwZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IHZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICBpZih0aGlzLl92YWx1ZSAhPSB2YWx1ZSl7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IGdldCBjYWxjdWxhdG9yIGlkIChmcm9tIGRpc3BsYXlWYWx1ZSlcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuX2NhbGN1bGF0b3IgPSBDYWxjdWxhdG9yUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXRDYWxjdWxhdG9yKHZhbHVlKTsgLy8gVE9ETzogY2hlY2sgaWQvbmFtZS92YWx1ZVxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNoaWxkc0J5Q2FsY3VsYXRvclR5cGUoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIENhbGN1bGF0ZSB3aXRoIGRlZmF1bHQgdmFsdWVzIHRvIGdldCBlcnJvciBpbmZvcyB3aGljaCBkYXRhIGkgbm90IGF2YWlsYWJsZVxyXG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZSgpOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEF0dGFjaCB0byB0aGUgZXZlbnRzIG9mIHRoZSBpbnB1dCBhbmQgb3V0cHV0IGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdG9yVHlwZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGF0dGFjaEV2ZW50cygpe1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpIDwgdGhpcy5jaGlsZHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZih0aGlzLmNoaWxkc1tpXSBpbnN0YW5jZW9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoaWxkc1tpXS5ldmVudERhdGFDaGFuZ2VkLmF0dGFjaCh0aGlzLl9pbnB1dERhdGFDaGFuZ2VkSGFuZGxlcik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoaWxkc1tpXS5ldmVudFNlcmllRGF0YUNoYW5nZWQuYXR0YWNoKHRoaXMuX2lucHV0U2VyaWVEYXRhQ2hhbmdlZEhhbmRsZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5jaGlsZHNbaV0gaW5zdGFuY2VvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25PdXRwdXREYXRhKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRzW2ldLmV2ZW50RGF0YUNoYW5nZWQuYXR0YWNoKHRoaXMuX291dHB1dERhdGFDaGFuZ2VkSGFuZGxlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXRhY2ggZXZlbnRzIGZyb20gdGhlIGlucHV0IGFuZCBvdXRwdXQgZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZGV0YWNoRXZlbnRzKCl7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGkgPCB0aGlzLmNoaWxkcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuY2hpbGRzW2ldIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRzW2ldLmV2ZW50RGF0YUNoYW5nZWQuZGV0YWNoKHRoaXMuX2lucHV0RGF0YUNoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRzW2ldLmV2ZW50U2VyaWVEYXRhQ2hhbmdlZC5kZXRhY2godGhpcy5faW5wdXRTZXJpZURhdGFDaGFuZ2VkSGFuZGxlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLmNoaWxkc1tpXSBpbnN0YW5jZW9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbk91dHB1dERhdGEpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGlsZHNbaV0uZXZlbnREYXRhQ2hhbmdlZC5kZXRhY2godGhpcy5fb3V0cHV0RGF0YUNoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZUNoaWxkc0J5Q2FsY3VsYXRvclR5cGUoKXtcclxuICAgICAgICAvLyBEZXRhY2ggZXZlbnRzIG9mIGN1cnJlbnQgY2hpbGRzXHJcbiAgICAgICAgdGhpcy5kZXRhY2hFdmVudHMoKTtcclxuXHJcbiAgICAgICAgLy8gQ2xlYXIgY3VycmVudCBjaGlsZHNcclxuICAgICAgICB0aGlzLmNsZWFyKCk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuX2NhbGN1bGF0b3IgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBBZGQgaW5wdXQgZGF0YSBmb3IgY2FsY3VsYXRpb25cclxuICAgICAgICBsZXQgZGVmYXVsdElucHV0RGF0YSA9IHRoaXMuX2NhbGN1bGF0b3IhLmdldERlZmF1bHRJbnB1dERhdGEoKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaSA8IGRlZmF1bHRJbnB1dERhdGEubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgaW5wdXREYXRhID0gbmV3IFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YShkZWZhdWx0SW5wdXREYXRhW2ldKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRTZXJpZU5vZGUoaW5wdXREYXRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEFkZCBvdXB1dCBkYXRhIGZvciBjYWxjdWxhdGlvblxyXG4gICAgICAgIGxldCBkZWZhdWx0T3V0cHV0RGF0YSA9IHRoaXMuX2NhbGN1bGF0b3IhLmdldERlZmF1bHRPdXRwdXREYXRhKCk7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGkgPCBkZWZhdWx0T3V0cHV0RGF0YS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBvdXRwdXREYXRhID0gbmV3IFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbk91dHB1dERhdGEoZGVmYXVsdE91dHB1dERhdGFbaV0pO1xyXG4gICAgICAgICAgICB0aGlzLmFkZFNlcmllTm9kZShvdXRwdXREYXRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEF0dGFjaCBldmVudHMgdG8gdGhlIG5ldyBjaGlsZHNcclxuICAgICAgICB0aGlzLmF0dGFjaEV2ZW50cygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGVzY3JpcHRpb24gb2YgdGhlIGNhbGN1bGF0b3IgdHlwZVxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRvclR5cGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBkZXNjcmlwdGlvbigpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmKHRoaXMuX2NhbGN1bGF0b3IgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NhbGN1bGF0b3IuZGVzY3JpcHRpb247XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRvclR5cGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRvclR5cGVcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKXtcclxuICAgICAgICBzdXBlcihuYW1lLCBcIlwiLCB0cnVlKTtcclxuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuY2FuRGVsZXRlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fdmFsdWVzID0gdGhpcy5nZXRBdmFpbGFibGVDYWxjdWxhdG9ycygpO1xyXG4gICAgICAgIHRoaXMuX29ubHlWYWx1ZXNGcm9tTGlzdEFyZUFsbG93ZWQgPSB0cnVlO1xyXG4gICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc3Bvc2UgdGhlIFNpZ25hbE1hbmFnZXJDYWxjdWxhdG9yVHlwZVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRvclR5cGVcclxuICAgICAqL1xyXG4gICAgZGlzcG9zZSgpe1xyXG4gICAgICAgICAvLyBEZXRhY2ggZXZlbnRzXHJcbiAgICAgICAgIHRoaXMuZGV0YWNoRXZlbnRzKCk7XHJcbiAgICAgICAgIFxyXG4gICAgICAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDbG9uZXMgdGhlIFNpZ25hbE1hbmFnZXJDYWxjdWxhdG9yVHlwZSBvYmplY3Qgd2l0aCBhbGwgY2hpbGRzXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge1NpZ25hbE1hbmFnZXJDYWxjdWxhdG9yVHlwZX1cclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRvclR5cGVcclxuICAgICAqL1xyXG4gICAgY2xvbmUoKTogU2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlIHtcclxuICAgICAgICAvLyBDbG9uZSBvYmplY3RcclxuICAgICAgICBsZXQgY2xvbmUgPSBuZXcgU2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlKHRoaXMuX25hbWUhLCBcIlwiKTtcclxuICAgICAgICBpZih0aGlzLl9jYWxjdWxhdG9yICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGNsb25lLnZhbHVlID0gdGhpcy52YWx1ZTsgLy8gU2V0IGN1cnJlbnQgdXNlZCBjYWxjdWxhdG9yIGZyb20gb3JpZ2luYWxcclxuICAgICAgICB9XHJcbiAgICAgICBcclxuICAgICAgICAvLyBTZXQgaW5wdXQgZGF0YSBcclxuICAgICAgICBsZXQgb3JpZ2luYWxJbnB1dERhdGFzID0gdGhpcy5nZXRJbnB1dENhbGN1bGF0aW9uRGF0YSgpO1xyXG4gICAgICAgIGxldCBjbG9uZWRJbnB1dERhdGFzID0gY2xvbmUuZ2V0SW5wdXRDYWxjdWxhdGlvbkRhdGEoKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaSA8IG9yaWdpbmFsSW5wdXREYXRhcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIC8vIFNldCBkYXRhIGZyb20gb3JpZ2luYWwgdG8gY2xvbmVkIG9iamN0XHJcbiAgICAgICAgICAgIGxldCBvcmlnaW5hbElucHV0RGF0YSA9IG9yaWdpbmFsSW5wdXREYXRhc1tpXTtcclxuICAgICAgICAgICAgY2xvbmVkSW5wdXREYXRhc1tpXS52YWx1ZSA9IG9yaWdpbmFsSW5wdXREYXRhLnZhbHVlO1xyXG4gICAgICAgICAgICBpZihvcmlnaW5hbElucHV0RGF0YS5zZXJpZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgY2xvbmVkSW5wdXREYXRhc1tpXS5zZXJpZSA9IG9yaWdpbmFsSW5wdXREYXRhLnNlcmllLmNsb25lKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2xvbmVkSW5wdXREYXRhc1tpXS5jYWxjdWxhdGlvbkRhdGEuc2V0RGF0YSg8YW55Pm9yaWdpbmFsSW5wdXREYXRhLmNhbGN1bGF0aW9uRGF0YS5nZXREYXRhKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBTZXQgb3V0cHV0IGRhdGFcclxuICAgICAgICBsZXQgb3JpZ2luYWxPdXRwdXREYXRhID0gdGhpcy5nZXRGaXJzdE91dHB1dENhbGN1bGF0aW9uRGF0YSgpOyAvLyBUT0RPOiBtdWx0aW91dHB1dFxyXG4gICAgICAgIGxldCBjbG9uZWRPdXRwdXREYXRhID0gY2xvbmUuZ2V0Rmlyc3RPdXRwdXRDYWxjdWxhdGlvbkRhdGEoKTsgLy8gVE9ETzogbXVsdGlvdXRwdXRcclxuICAgICAgICBpZihvcmlnaW5hbE91dHB1dERhdGEgIT0gdW5kZWZpbmVkICYmIGNsb25lZE91dHB1dERhdGEgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgY2xvbmVkT3V0cHV0RGF0YS52YWx1ZSA9IG9yaWdpbmFsT3V0cHV0RGF0YS52YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2xvbmUuY2FsY3VsYXRlKCk7XHJcbiAgICAgICAgcmV0dXJuIGNsb25lO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhIGxpc3Qgd2l0aCBhdmFpbGFibGUgY2FsY3VsYXRvcnMgZGlzcGxheVZhbHVlIGFuZCBpZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7YW55W119XHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0QXZhaWxhYmxlQ2FsY3VsYXRvcnMoKTogYW55W117XHJcbiAgICAgICAgbGV0IHBvc3NpYmxlVHlwZXMgPSBuZXcgQXJyYXk8YW55PigpO1xyXG4gICAgICAgIGxldCBjYWxjdWxhdG9ycyA9IENhbGN1bGF0b3JQcm92aWRlci5nZXRJbnN0YW5jZSgpLmNhbGN1bGF0b3JzO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpIDwgY2FsY3VsYXRvcnMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBwb3NzaWJsZVR5cGVzLnB1c2goe2Rpc3BsYXlWYWx1ZTogY2FsY3VsYXRvcnNbaV0uZGlzcGxheU5hbWUsIHZhbHVlOiBjYWxjdWxhdG9yc1tpXS5pZH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwb3NzaWJsZVR5cGVzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0U2VyaWUoc2VyaWVOYW1lOiBzdHJpbmd8dW5kZWZpbmVkKTogQmFzZVNlcmllc3x1bmRlZmluZWR7XHJcbiAgICAgICAgaWYoc2VyaWVOYW1lICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGxldCBzZXJpZUdyb3VwID0gdGhpcy5nZXRTZXJpZUdyb3VwKCk7XHJcbiAgICAgICAgICAgIGlmKHNlcmllR3JvdXAgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzZXJpZUdyb3VwLmdldFNlcmllKHNlcmllTmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uSW5wdXREYXRhVmFsdWVDaGFuZ2VkKHNlbmRlcjogSVNlcmllTm9kZSwgYXJncyl7XHJcbiAgICAgICAgaWYoc2VuZGVyIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhKXtcclxuICAgICAgICAgICAgbGV0IHNpZ25hbENhbGN1bGF0aW9uRGF0YTogU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhID0gc2VuZGVyO1xyXG4gICAgICAgICAgICBsZXQgY2FsY3VsYXRpb25EYXRhID0gc2lnbmFsQ2FsY3VsYXRpb25EYXRhLmNhbGN1bGF0aW9uRGF0YVxyXG4gICAgICAgICAgICBpZihjYWxjdWxhdGlvbkRhdGEgaW5zdGFuY2VvZiBDYWxjdWxhdGlvbkRhdGEpe1xyXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgb2xkIGlucHV0IGRhdGEgd2FzIGEgc2lnbmFsKG5hbWUpXHJcbiAgICAgICAgICAgICAgICBsZXQgb2xkU2VyaWUgPSB0aGlzLmdldFNlcmllKGNhbGN1bGF0aW9uRGF0YS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBpZihvbGRTZXJpZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBjdXJyZW50IHVzZWQgc2lnbmFsIGZyb20gY2FsY3VsYXRpb25EYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgc2lnbmFsQ2FsY3VsYXRpb25EYXRhLnNlcmllID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiBuZXcgaW5wdXQgZGF0YSBpcyBhIHNpZ25hbChuYW1lKVxyXG4gICAgICAgICAgICAgICAgbGV0IHNlcmllID0gdGhpcy5nZXRTZXJpZShzaWduYWxDYWxjdWxhdGlvbkRhdGEudmFsdWUpOyAvLyBnZXQgdGhlIHNpZ25hbCBncm91cCBhbmQgbG9vayBmb3Igc2lnbmFsIHdpdGggZ2l2ZW4gbmFtZSBpbiBpdFxyXG4gICAgICAgICAgICAgICAgaWYoc2VyaWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmN5Y2xlRm91bmQoc2lnbmFsQ2FsY3VsYXRpb25EYXRhLnZhbHVlLCBcIlwiLCB0cnVlKSA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGN1bGF0aW9uRGF0YS52YWx1ZSA9IHNpZ25hbENhbGN1bGF0aW9uRGF0YS52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsY3VsYXRpb25EYXRhLnR5cGUgPSBzZXJpZS50eXBlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihjYWxjdWxhdGlvbkRhdGEgaW5zdGFuY2VvZiBDYWxjdWxhdGlvbkRhdGFQb2ludHMgfHwgY2FsY3VsYXRpb25EYXRhIGluc3RhbmNlb2YgQ2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHMpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsY3VsYXRpb25EYXRhLnNldERhdGEoc2VyaWUucmF3UG9pbnRzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBZGQgY3VycmVudCB1c2VkIHNpZ25hbCB0byBjYWxjdWxhdGlvbkRhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmFsQ2FsY3VsYXRpb25EYXRhLnNlcmllID0gc2VyaWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICBDeWNsZSBmb3VuZCB1c2Ugb2xkIGlucHV0IGRhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmFsQ2FsY3VsYXRpb25EYXRhLnZhbHVlID0gY2FsY3VsYXRpb25EYXRhLnZhbHVlOyAvLyBUT0RPOiBTaG93IE1lc3NhZ2VCb3hcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGN1bGF0aW9uRGF0YS50eXBlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTaWduYWxDYWxjdWxhdGlvblZhbHVlVG9DYWxjdWxhdGlvbkRhdGEoc2lnbmFsQ2FsY3VsYXRpb25EYXRhLGNhbGN1bGF0aW9uRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSB2YWx1ZSBvZiB0aGUgc2lnbmFsQ2FsY3VsYXRpb25EYXRhIHRvIHRoZSBjYWxjdWxhdGlvbiBkYXRhIChOT1QgRk9SIHNlcmllIG5hbWVzIGluIHNpZ25hbCBjYWxjdWxhdGlvbiBkYXRhOyBvbmx5IGZvciBzdHJpbmdzLCBudW1lcmljcywgLi4uKVxyXG4gICAgICogUmVzZXRzIGFuIG9sZCBzZXJpZSB0byB1bmRlZmluZWQgaWYgaXQgd2FzIHVzZWQgYmVmb3JlIGluIHRoaXMgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uIGRhdGEuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7U2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhfSBzaWduYWxDYWxjdWxhdGlvbkRhdGFcclxuICAgICAqIEBwYXJhbSB7Q2FsY3VsYXRpb25EYXRhfSBjYWxjdWxhdGlvbkRhdGFcclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRvclR5cGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRTaWduYWxDYWxjdWxhdGlvblZhbHVlVG9DYWxjdWxhdGlvbkRhdGEoc2lnbmFsQ2FsY3VsYXRpb25EYXRhOiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGEsIGNhbGN1bGF0aW9uRGF0YTogQ2FsY3VsYXRpb25EYXRhKXtcclxuICAgICAgICBjYWxjdWxhdGlvbkRhdGEudmFsdWUgPSBzaWduYWxDYWxjdWxhdGlvbkRhdGEudmFsdWU7XHJcbiAgICAgICAgaWYoY2FsY3VsYXRpb25EYXRhIGluc3RhbmNlb2YgQ2FsY3VsYXRpb25EYXRhTnVtYmVyIHx8IGNhbGN1bGF0aW9uRGF0YSBpbnN0YW5jZW9mIENhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzKSB7XHJcbiAgICAgICAgICAgIGNhbGN1bGF0aW9uRGF0YS5zZXREYXRhKHBhcnNlRmxvYXQoc2lnbmFsQ2FsY3VsYXRpb25EYXRhLnZhbHVlKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGNhbGN1bGF0aW9uRGF0YSBpbnN0YW5jZW9mIENhbGN1bGF0aW9uRGF0YVBvaW50cyl7XHJcbiAgICAgICAgICAgIGNhbGN1bGF0aW9uRGF0YS5zZXREYXRhKG5ldyBBcnJheTxJUG9pbnQ+KCkpOyAgIC8vIE5vIHNpZ25hbCBkYXRhIGF2YWlsYWJsZSwgc2V0IGVtcHR5IHBvaW50c1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBSZW1vdmUgY3VycmVudCB1c2VkIHNlcmllIGZyb20gY2FsY3VsYXRpb25EYXRhXHJcbiAgICAgICAgc2lnbmFsQ2FsY3VsYXRpb25EYXRhLnNlcmllID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgaWYgdGhlIHNpZ25hbCBuYW1lLCB3aGljaCB3aWxsIGJlIHVzZWQgZm9yIGlucHV0IG9mIHRoaXMgY2FsY3VsYXRpb24gZGVwZW5kcyBvbiB0aGUgb3V0cHV0IG9mIHRoaXMgY2FsY3VsYXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW5wdXRTaWduYWxOYW1lXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW291cHV0U2lnbmFsTmFtZT1cIlwiXVxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlXHJcbiAgICAgKi9cclxuICAgIGN5Y2xlRm91bmQoaW5wdXRTaWduYWxOYW1lOiBzdHJpbmcsIG91cHV0U2lnbmFsTmFtZTogc3RyaW5nID0gXCJcIiwgc2hvd01lc3NhZ2U6IGJvb2xlYW4gPSBmYWxzZSk6IGJvb2xlYW57XHJcbiAgICAgICAgLy8gZ2V0IHNlcmllTm9kZSB3aGVyZSBpdCBpcyBkZWZpbmVkKGNhbGN1bGF0aW9uIG91dHB1dCBvciBub3JtYWwgc2lnbmFsKVxyXG4gICAgICAgIGxldCBzZXJpZU5vZGUgPSB0aGlzLmdldFNlcmllR3JvdXAoKSEuZ2V0U2VyaWVOb2RlKGlucHV0U2lnbmFsTmFtZSk7XHJcbiAgICAgICAgaWYoc2VyaWVOb2RlID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTsgLy8gTm8gc2lnbmFsIG5vZGUgZm91bmQgPT4gbm8gY3ljbGVcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIShzZXJpZU5vZGUgaW5zdGFuY2VvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb24pKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBObyBjYWxjdWxhdGVkIHNpZ25hbCA9PiBubyBjeWNsZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYob3VwdXRTaWduYWxOYW1lID09IFwiXCIpe1xyXG4gICAgICAgICAgICAvL1dvcmthcm91bmQ6IEZpeGVkIGZvciBjcmVhdGlvbiBvZiBGRlQgd2l0aCBEJkQuIElucHV0IGRhdGEgc2hvdWxkIGJlIGFkZGVkIGFmdGVyIGNhbGN1bGF0b3IgaGFzIGJlZW4gY3JlYXRlZC5cclxuICAgICAgICAgICAgbGV0IGZpcnN0T3V0cHV0RGF0YSA9IHRoaXMuZ2V0Rmlyc3RPdXRwdXRDYWxjdWxhdGlvbkRhdGEoKTtcclxuICAgICAgICAgICAgaWYoZmlyc3RPdXRwdXREYXRhICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBvdXB1dFNpZ25hbE5hbWUgPSBmaXJzdE91dHB1dERhdGEudmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMuZm91bmRDaXJjdWxhclJlZmVyZW5jZShzZXJpZU5vZGUsIG91cHV0U2lnbmFsTmFtZSwgc2hvd01lc3NhZ2UpKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGZvdW5kQ2lyY3VsYXJSZWZlcmVuY2UoY2FsY3VsYXRpb25Ob2RlOiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb24sIG91cHV0U2lnbmFsTmFtZTogc3RyaW5nID0gXCJcIiwgc2hvd01lc3NhZ2U6IGJvb2xlYW4pOiBib29sZWFue1xyXG4gICAgICAgIC8vIGdldCBpbnB1dCBzaWduYWxzIG9mIGNhbGN1bGF0aW9uXHJcbiAgICAgICAgLy8gVE9ETzogcmVmYWN0b3IgYSBsaXR0bGVcclxuICAgICAgICBpZihjYWxjdWxhdGlvbk5vZGUuZ2V0Q2hpbGRzKClbMF0gaW5zdGFuY2VvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRvclR5cGUpe1xyXG4gICAgICAgICAgICBsZXQgY2FsY3VsYXRvclR5cGUgPSBjYWxjdWxhdGlvbk5vZGUuZ2V0Q2hpbGRzKClbMF0gYXMgU2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlO1xyXG4gICAgICAgICAgICBsZXQgaW5wdXRTZXJpZU5vZGVzID0gY2FsY3VsYXRvclR5cGUuZ2V0SW5wdXRDYWxjdWxhdGlvbkRhdGEoKTtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGkgPCBpbnB1dFNlcmllTm9kZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgaWYoaW5wdXRTZXJpZU5vZGVzW2ldLnZhbHVlID09IG91cHV0U2lnbmFsTmFtZSl7Ly8gVE9ETzogbXVsdGkgb3V0cHV0XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc2hvd01lc3NhZ2UgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiQ2lyY3VsYXIgcmVmZXJlbmNlIGZvdW5kIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7IC8vIGlucHV0IHJlZmVyZW5jZXMgdG8gb3V0cHV0IG9mIGN1cnJlbnQgY2FsY3VsYXRpb24gPT4gY3ljbGUgZm91bmRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkU2VyaWVOb2RlID0gaW5wdXRTZXJpZU5vZGVzW2ldLmdldFNlcmllR3JvdXAoKSEuZ2V0U2VyaWVOb2RlKGlucHV0U2VyaWVOb2Rlc1tpXS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY2hpbGRTZXJpZU5vZGUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGN5Y2xlRm91bmQgPSAoaW5wdXRTZXJpZU5vZGVzW2ldLnBhcmVudCEgYXMgU2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlKS5jeWNsZUZvdW5kKGlucHV0U2VyaWVOb2Rlc1tpXS52YWx1ZSwgb3VwdXRTaWduYWxOYW1lLCBzaG93TWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGN5Y2xlRm91bmQgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzaG93TWVzc2FnZSA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIkNpcmN1bGFyIHJlZmVyZW5jZSBmb3VuZCFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uU2VyaWVEYXRhQ2hhbmdlZChzZW5kZXI6IEJhc2VTZXJpZXMsIGFyZ3M6IEV2ZW50U2VyaWVEYXRhQ2hhbmdlZEFyZ3Mpe1xyXG4gICAgICAgIGxldCBzZXJpZSA9IHNlbmRlcjtcclxuICAgICAgICBsZXQgY29ycmVzcG9uZGluZ0NhbGN1bGF0aW9uRGF0YXMgPSB0aGlzLmdldENhbGN1bGF0aW9uRGF0YXNDb3JyZXNwb25kaW5nVG9TaWduYWxOYW1lKHNlcmllKTtcclxuICAgICAgICBpZihhcmdzLmFjdGlvbiA9PSBTZXJpZUFjdGlvbi5kYXRhUG9pbnRzQ2hhbmdlZCl7XHJcbiAgICAgICAgICAgIGNvcnJlc3BvbmRpbmdDYWxjdWxhdGlvbkRhdGFzLmZvckVhY2goKGNhbGNEYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjYWxjRGF0YS5jYWxjdWxhdGlvbkRhdGEuc2V0RGF0YSg8YW55PmFyZ3MuZGF0YSk7IC8vIFNldHMgdGhlIGFjdHVhbCBkYXRhIHBvaW50cyB0byB0aGUgY2FsY3VsYXRpb24gaW5wdXQgZGF0YVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGFyZ3MuYWN0aW9uID09IFNlcmllQWN0aW9uLnJlbmFtZSl7XHJcbiAgICAgICAgICAgIGNvcnJlc3BvbmRpbmdDYWxjdWxhdGlvbkRhdGFzLmZvckVhY2goKGNhbGNEYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjYWxjRGF0YS52YWx1ZSA9IHNlcmllLm5hbWU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldENhbGN1bGF0aW9uRGF0YXNDb3JyZXNwb25kaW5nVG9TaWduYWxOYW1lKHNlcmllOiBCYXNlU2VyaWVzKTogQXJyYXk8YW55PntcclxuICAgICAgICBsZXQgY2FsY0RhdGFzID0gbmV3IEFycmF5PGFueT4oKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaSA8IHRoaXMuY2hpbGRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IHNpZ25hbENhbGN1bGF0aW9uRGF0YSA9ICh0aGlzLmNoaWxkc1tpXSk7XHJcbiAgICAgICAgICAgIGlmKHNpZ25hbENhbGN1bGF0aW9uRGF0YS5zZXJpZSA9PSBzZXJpZSl7XHJcbiAgICAgICAgICAgICAgICBjYWxjRGF0YXMucHVzaCh0aGlzLmNoaWxkc1tpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNhbGNEYXRhcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0ZXMgd2l0aCB0aGUgY3VycmVudCBpbnB1dCBkYXRhIGFuZCB1cGRhdGVzIHRoZSBvdXRwdXRkYXRhXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdG9yVHlwZVxyXG4gICAgICovXHJcbiAgICBjYWxjdWxhdGUoKXtcclxuICAgICAgICAvLyBDYWxjdWxhdGUgd2l0aCBhY3R1YWwgaW5wdXQgZGF0YVxyXG4gICAgICAgIGxldCBpbnB1dERhdGEgPSBuZXcgQXJyYXk8Q2FsY3VsYXRpb25EYXRhTnVtYmVyfENhbGN1bGF0aW9uRGF0YVBvaW50c3xDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cz4oKTtcclxuICAgICAgICBsZXQgY2FsY3VsYXRpb25PdXRwdXREYXRhID0gbmV3IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz4oKTtcclxuICAgICAgICBsZXQgaW5wdXRDYWxjdWxhdGlvbkRhdGE7XHJcbiAgICAgICAgbGV0IG1vZGlmaWVkSW5wdXREYXRhOiBBcnJheTxDYWxjdWxhdGlvbkRhdGFOdW1iZXIgfCBDYWxjdWxhdGlvbkRhdGFQb2ludHMgfCBDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cz4gPSBpbnB1dERhdGE7XHJcbiAgICAgICAgaWYodGhpcy5fY2FsY3VsYXRvciAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAvLyBTdGFydCBjYWxjdWxhdGlvbiB3aXRoIGFjdHVhbCBpbnB1dCBkYXRhXHJcbiAgICAgICAgICAgIGlucHV0Q2FsY3VsYXRpb25EYXRhID0gIHRoaXMuZ2V0SW5wdXRDYWxjdWxhdGlvbkRhdGEoKTtcclxuICAgICAgICAgICAgaW5wdXRDYWxjdWxhdGlvbkRhdGEuZm9yRWFjaChpbnB1dENhbGN1bGF0aW9uRGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dERhdGEucHVzaChpbnB1dENhbGN1bGF0aW9uRGF0YS5jYWxjdWxhdGlvbkRhdGEpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG1vZGlmaWVkSW5wdXREYXRhID0gdGhpcy5fY2FsY3VsYXRvci5wcmVwYXJlSW5wdXREYXRhKGlucHV0RGF0YSk7IC8vcHJlcGFyZXMgaW5wdXQgZGF0YSBmb3IgZWFjaCBjYWxjdWxhdG9yXHJcbiAgICAgICAgICAgIGNhbGN1bGF0aW9uT3V0cHV0RGF0YSA9IHRoaXMuX2NhbGN1bGF0b3IuY2FsY3VsYXRlKG1vZGlmaWVkSW5wdXREYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gVXBkYXRlIG91dHB1dGRhdGEgVE9ETzogbXVsdGkgb3V0cHV0ICxub3Qgb25seSB0aGUgZmlyc3Qgb25lXHJcbiAgICAgICAgbGV0IG91dHB1dERhdGEgPSB0aGlzLmdldEZpcnN0T3V0cHV0Q2FsY3VsYXRpb25EYXRhKCk7XHJcbiAgICAgICAgaWYob3V0cHV0RGF0YSAhPSB1bmRlZmluZWQgJiYgb3V0cHV0RGF0YS5zZXJpZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBpZih0aGlzLl9jYWxjdWxhdG9yICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgZXJyb3JzID0gdGhpcy5fY2FsY3VsYXRvci5nZXRFcnJvcnMoKTtcclxuICAgICAgICAgICAgICAgIGlmKGVycm9ycy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICAgICAgICBvdXRwdXREYXRhLnNlcmllLmVycm9ySW5mbyA9IGVycm9ycztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgb3V0cHV0RGF0YS5zZXJpZS51cGRhdGVDYWxjdWxhdGlvbkRhdGFJbmZvKG1vZGlmaWVkSW5wdXREYXRhLCB0aGlzLnZhbHVlLCB0aGlzLmdldElucHV0Q2FsY3VsYXRpb25EYXRhKCkpXHJcbiAgICAgICAgICAgIG91dHB1dERhdGEuc2VyaWUudXBkYXRlUG9pbnRzKGNhbGN1bGF0aW9uT3V0cHV0RGF0YVswXS5nZXREYXRhKCkpO1xyXG5cclxuICAgICAgICAgICAgLy9Xb3JrYXJvdW5kOiBGRlQgZXhjZXB0aW9uLCB1cGRhdGUgY29sb3IgYW5kIG5hbWVcclxuICAgICAgICAgICAgaWYob3V0cHV0RGF0YS5zZXJpZSBpbnN0YW5jZW9mIEZGVFNlcmllcyAmJiBpbnB1dENhbGN1bGF0aW9uRGF0YVswXS5zZXJpZSAhPSB1bmRlZmluZWQgJiYgaW5wdXRDYWxjdWxhdGlvbkRhdGFbMF0uc2VyaWUucmF3UG9pbnRzVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgIG91dHB1dERhdGEuY29sb3IgPSBpbnB1dENhbGN1bGF0aW9uRGF0YVswXS5zZXJpZS5jb2xvcjtcclxuICAgICAgICAgICAgICAgIG91dHB1dERhdGEudmFsdWUgPSAnRkZUKCcgKyBpbnB1dENhbGN1bGF0aW9uRGF0YVswXS5zZXJpZS5uYW1lICsgJykgJyArIG91dHB1dERhdGEudW5pcXVlSWQ7ICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2hhbmdlT3V0cHV0U2VyaWVUeXBlKG91dHB1dERhdGEsIHR5cGUpIHtcclxuICAgICAgICBsZXQgY29sb3IgPSBvdXRwdXREYXRhLnNlcmllLmNvbG9yO1xyXG4gICAgICAgIGxldCBuYW1lID0gb3V0cHV0RGF0YS5zZXJpZS5uYW1lO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh0eXBlID09IFNlcmllc1R5cGUudGltZVNlcmllcykge1xyXG4gICAgICAgICAgICBvdXRwdXREYXRhLnNlcmllID0gKG5ldyBZVFNlcmllcyhvdXRwdXREYXRhLnNlcmllLnNpZ25hbCwgbmFtZSwgY29sb3IpKTtcclxuICAgICAgICB9IGVsc2UgaWYodHlwZSA9PSBTZXJpZXNUeXBlLmZmdFNlcmllcykge1xyXG4gICAgICAgICAgICBvdXRwdXREYXRhLnNlcmllID0gKG5ldyBGRlRTZXJpZXMob3V0cHV0RGF0YS5zZXJpZS5zaWduYWwsIG5hbWUsIGNvbG9yKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhbGwgY2FsY3VsYXRpb24gaW5wdXQgZGF0YXNcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8U2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhPn1cclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRvclR5cGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldElucHV0Q2FsY3VsYXRpb25EYXRhKCk6IEFycmF5PFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YT57XHJcbiAgICAgICAgbGV0IGlucHV0RGF0YSA9IG5ldyBBcnJheTxTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGE+KCk7XHJcbiAgICAgICAgbGV0IGNhbGN1bGF0aW9uVHlwZUNoaWxkcyA9IHRoaXMuY2hpbGRzO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpIDwgY2FsY3VsYXRpb25UeXBlQ2hpbGRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IHNpZ25hbENhbGN1bGF0aW9uRGF0YSA9IGNhbGN1bGF0aW9uVHlwZUNoaWxkc1tpXTtcclxuICAgICAgICAgICAgaWYoc2lnbmFsQ2FsY3VsYXRpb25EYXRhIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhKXtcclxuICAgICAgICAgICAgICAgIGlucHV0RGF0YS5wdXNoKHNpZ25hbENhbGN1bGF0aW9uRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGlucHV0RGF0YTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGZpcnN0IGNhbGN1bGF0aW9uIG91dHB1dCBkYXRhXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyhTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25PdXRwdXREYXRhfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRGaXJzdE91dHB1dENhbGN1bGF0aW9uRGF0YSgpOiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25PdXRwdXREYXRhfHVuZGVmaW5lZHtcclxuICAgICAgICBsZXQgY2FsY3VsYXRpb25UeXBlQ2hpbGRzID0gdGhpcy5jaGlsZHM7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGkgPCBjYWxjdWxhdGlvblR5cGVDaGlsZHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgY2FsY3VsYXRpb25EYXRhID0gY2FsY3VsYXRpb25UeXBlQ2hpbGRzW2ldO1xyXG4gICAgICAgICAgICBpZihjYWxjdWxhdGlvbkRhdGEgaW5zdGFuY2VvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25PdXRwdXREYXRhKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjYWxjdWxhdGlvbkRhdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSBzZXJpZXMgZnJvIHRoZSBnaXZlbiBuYW1lIGZyb20gdGhpcyBjYWxjdWxhdG9yIHR5cGUgbm9kZSAoZS5nLiBvdXRwdXQgc2VyaWVzIG9mIGNhbGN1bGF0aW9ucylcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW3NlcmllTmFtZT1cIlwiXSBpZiBzZXJpZU5hbWUgPSBcIlwiIGFsbCBzZXJpZXMgd2lsIGJlIHJldHVybmVkXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8SVNlcmllTm9kZT59XHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlXHJcbiAgICAgKi9cclxuICAgIGdldFNlcmllTm9kZXMoc2VyaWVOYW1lOiBzdHJpbmcgPSBcIlwiKTogQXJyYXk8SVNlcmllTm9kZT57XHJcbiAgICAgICAgbGV0IHNlcmllTm9kZXMgPSBuZXcgQXJyYXk8SVNlcmllTm9kZT4oKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaSA8IHRoaXMuY2hpbGRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5jaGlsZHNbaV07XHJcbiAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uT3V0cHV0RGF0YSl7IC8vIElzIG9ubHkgYSBzaWduYWwgaW4gY2FzZSBvZiBvdXRwdXRkYXRhXHJcbiAgICAgICAgICAgICAgICBpZiggc2VyaWVOYW1lID09IFwiXCIgfHwgY2hpbGQudmFsdWUgPT0gc2VyaWVOYW1lKXtcclxuICAgICAgICAgICAgICAgICAgICBzZXJpZU5vZGVzLnB1c2goY2hpbGQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYoY2hpbGQgaW5zdGFuY2VvZiBTZXJpZUNvbnRhaW5lcil7XHJcbiAgICAgICAgICAgICAgICBzZXJpZU5vZGVzID0gc2VyaWVOb2Rlcy5jb25jYXQoY2hpbGQuZ2V0U2VyaWVOb2RlcyhzZXJpZU5hbWUpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2VyaWVOb2RlcztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uT3V0cHV0RGF0YVZhbHVlQ2hhbmdlZChzZW5kZXIsIGFyZ3Mpe1xyXG4gICAgICAgIGxldCBzZXJpZUdyb3VwID0gdGhpcy5nZXRTZXJpZUdyb3VwKCk7XHJcbiAgICAgICAgaWYoc2VyaWVHcm91cCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBsZXQgc2VyaWVOb2RlID0gdGhpcy5nZXRTZXJpZUdyb3VwKCkhLmdldFNlcmllTm9kZXMoYXJncy5kYXRhKTtcclxuICAgICAgICAgICAgaWYoc2VyaWVOb2RlLmxlbmd0aCA+IDEpeyAvLyBTaWduYWwgd2l0aCBnaXZlbiBuYW1lIGFscmVhZHkgYXZhaWxhYmxlID0+IHNldCBzaWduYWwgbmFtZSB0byB0aGUgdXNlZCBuYW1lIGJlZm9yZVxyXG4gICAgICAgICAgICAgICAgbGV0IHNpZ25hbENhbGN1bGF0aW9uRGF0YTogU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uT3V0cHV0RGF0YSA9IHNlbmRlcjtcclxuICAgICAgICAgICAgICAgIHNpZ25hbENhbGN1bGF0aW9uRGF0YS52YWx1ZSA9IGFyZ3Mub2xkRGF0YTtcclxuICAgICAgICAgICAgICAgIC8vbGV0IGNhbGN1bGF0aW9uRGF0YSA9IHNpZ25hbENhbGN1bGF0aW9uRGF0YS5jYWxjdWxhdGlvbkRhdGFcclxuICAgICAgICAgICAgICAgIC8vY2FsY3VsYXRpb25EYXRhLnZhbHVlID0gYXJncy5vbGREYXRhOyBcclxuICAgICAgICAgICAgICAgIC8vIFRPRE86IFNob3cgTWVzc2FnZUJveFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMub25EYXRhQ2hhbmdlZChzZW5kZXIsIGFyZ3MpO1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuIl19