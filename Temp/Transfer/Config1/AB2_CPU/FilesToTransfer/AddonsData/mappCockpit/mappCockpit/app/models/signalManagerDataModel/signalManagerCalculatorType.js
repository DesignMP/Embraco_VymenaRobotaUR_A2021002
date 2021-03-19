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
define(["require", "exports", "../common/calculatorProvider/calculatorProvider", "../common/signal/serieContainer", "../common/calculatorProvider/calculationDataPoints", "./signalManagerCalculationInputData", "./signalManagerCalculationOutputData", "../chartManagerDataModel/eventSerieDataChangedArgs", "./signalManagerCalculation"], function (require, exports, calculatorProvider_1, serieContainer_1, calculationDataPoints_1, signalManagerCalculationInputData_1, signalManagerCalculationOutputData_1, eventSerieDataChangedArgs_1, signalManagerCalculation_1) {
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
                var _this = this;
                if (this._value != value) {
                    this._value = value;
                    var id_1 = this._value;
                    // get calculator id (from displayValue)
                    this._values.forEach(function (element) {
                        if (element.displayValue == _this._value) {
                            id_1 = element.value;
                        }
                    });
                    this._calculator = calculatorProvider_1.CalculatorProvider.getInstance().getCalculator(id_1);
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
                //let newData: string | number| Array<IPoint> = originalInputData.calculationData.getData();
                //clonedInputDatas[i].calculationData.setData(newData);
                // TODO: Use public methods to set data to clone; problems with datatypes !!!
                clonedInputDatas[i].calculationData._data = originalInputData.calculationData._data;
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
            if (args.data == args.oldData) {
                // Nothing has changed
                return;
            }
            if (sender instanceof signalManagerCalculationInputData_1.SignalManagerCalculationInputData) {
                var signalCalculationInputData = sender;
                var calculationData = signalCalculationInputData.calculationData;
                // Check if old input data was a signal(name)
                var oldSerie = this.getSerie(calculationData.value);
                if (oldSerie != undefined) {
                    // Remove current used signal from calculationData
                    signalCalculationInputData.serie = undefined;
                }
                // Check if new input data is a signal(name)
                var serie = this.getSerie(signalCalculationInputData.getRawValue()); // get the signal group and look for signal with given name in it
                if (serie != undefined) {
                    if (this.cycleFound(signalCalculationInputData.value, "", true) == false) {
                        signalCalculationInputData.setSignalCalculationValueToCalculationDataWithSerieData(serie, calculationData);
                    }
                    else {
                        //  Cycle found use old input data
                        signalCalculationInputData.value = calculationData.value; // TODO: Show MessageBox
                    }
                }
                else {
                    calculationData.type = undefined;
                    signalCalculationInputData.setSignalCalculationValueToCalculationData(calculationData);
                }
                this.calculate();
            }
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
            var actuallyUsedInputData = inputData;
            if (this._calculator != undefined) {
                // Start calculation with actual input data
                inputCalculationData = this.getInputCalculationData();
                inputCalculationData.forEach(function (inputCalculationData) {
                    inputData.push(inputCalculationData.calculationData);
                });
                calculationOutputData = this._calculator.calculate(inputData);
                actuallyUsedInputData = this._calculator.getActualInputData();
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
                outputData.serie.updateCalculationDataInfo(actuallyUsedInputData, this.value, this.getInputCalculationData());
                if (calculationOutputData[0] instanceof calculationDataPoints_1.CalculationDataPoints) {
                    outputData.serie.updatePoints(calculationOutputData[0].getData());
                }
                else {
                    console.error("New calculation output data available. New implementation needed! Only DataPoints supported currently.");
                }
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
         * Returns a series for the given name from this calculator type node (e.g. output series of calculations)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvc2lnbmFsTWFuYWdlckRhdGFNb2RlbC9zaWduYWxNYW5hZ2VyQ2FsY3VsYXRvclR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQWlCQTtRQUFpRCwrQ0FBYztRQXVNM0Q7Ozs7O1dBS0c7UUFDSCxxQ0FBWSxJQUFZLEVBQUUsS0FBYTtZQUF2QyxZQUNJLGtCQUFNLElBQUksRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLFNBS3ZCO1lBN01NLDhCQUF3QixHQUFHLFVBQUMsTUFBTSxFQUFFLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQTFDLENBQTBDLENBQUM7WUFDeEYsbUNBQTZCLEdBQUcsVUFBQyxNQUFNLEVBQUUsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBckMsQ0FBcUMsQ0FBQztZQUN4RiwrQkFBeUIsR0FBRyxVQUFDLE1BQU0sRUFBRSxJQUFJLElBQUssT0FBQSxLQUFJLENBQUMsd0JBQXdCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUEzQyxDQUEyQyxDQUFDO1lBWWxHLGtCQUFZLEdBQVcsUUFBUSxDQUFDO1lBMkw1QixLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNwQixLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN2QixLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1lBQzlDLEtBQUksQ0FBQyw2QkFBNkIsR0FBRyxJQUFJLENBQUM7O1FBQzdDLENBQUM7UUF4TUYsc0JBQVcsK0NBQU07aUJBQWpCO2dCQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUN4QixDQUFDOzs7V0FBQTtRQUdELHNCQUFXLHFFQUE0QjtpQkFBdkM7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsNkJBQTZCLENBQUM7WUFDOUMsQ0FBQzs7O1dBQUE7UUFJRCxzQkFBVyxpREFBUTtpQkFBbkI7Z0JBQ0ksT0FBTyxTQUFTLENBQUM7WUFDckIsQ0FBQzs7O1dBQUE7UUFFRCxzQkFBVyxpREFBUTtpQkFBbkI7Z0JBQ0ksT0FBTyxTQUFTLENBQUM7WUFDckIsQ0FBQzs7O1dBQUE7UUFTRCxzQkFBVyw2Q0FBSTtZQVBmOzs7Ozs7ZUFNRztpQkFDSDtnQkFDSSxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQ3BDLElBQUcsU0FBUyxJQUFJLFNBQVMsRUFBQztvQkFDdEIsSUFBRyxTQUFTLENBQUMsY0FBYyxJQUFJLElBQUksRUFBQzt3QkFDaEMsT0FBTyxJQUFJLENBQUMsS0FBTSxDQUFDLENBQUMscUVBQXFFO3FCQUM1RjtpQkFDSjtnQkFDRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxtQ0FBbUM7WUFDMUQsQ0FBQzs7O1dBQUE7UUFRRCxzQkFBVywrQ0FBTTtZQU5qQjs7Ozs7ZUFLRztpQkFDSDtnQkFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDeEIsQ0FBQztZQUVEOzs7O2VBSUc7aUJBQ0gsVUFBa0IsS0FBa0M7Z0JBQ2hELElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3pCLENBQUM7OztXQVRBO1FBV0Q7Ozs7O1dBS0c7UUFDSSw0REFBc0IsR0FBN0IsVUFBOEIsS0FBaUI7WUFDM0MsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLDRDQUE0QyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3pFLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQSxlQUFlO2dCQUM3QixlQUFlLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztnQkFDM0IsSUFBSSxXQUFXLEdBQUcsSUFBSSxLQUFLLEVBQVUsQ0FBQztnQkFDdEMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQU0sV0FBVyxDQUFDLENBQUM7WUFDOUQsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBR0Qsc0JBQVcscURBQVk7WUFEdkIsNEJBQTRCO2lCQUM1QjtnQkFDSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDdkIsQ0FBQzs7O1dBQUE7UUFRRCxzQkFBVyw4Q0FBSztZQU5oQjs7Ozs7ZUFLRztpQkFDSDtnQkFDSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDdkIsQ0FBQztZQUVEOzs7O2VBSUc7aUJBQ0gsVUFBaUIsS0FBYTtnQkFBOUIsaUJBaUJDO2dCQWhCRyxJQUFHLElBQUksQ0FBQyxNQUFNLElBQUksS0FBSyxFQUFDO29CQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztvQkFDcEIsSUFBSSxJQUFFLEdBQVcsSUFBSSxDQUFDLE1BQU0sQ0FBQztvQkFDN0Isd0NBQXdDO29CQUN4QyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFBLE9BQU87d0JBQ3hCLElBQUcsT0FBTyxDQUFDLFlBQVksSUFBSSxLQUFJLENBQUMsTUFBTSxFQUFDOzRCQUNuQyxJQUFFLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQzt5QkFDdEI7b0JBQ0wsQ0FBQyxDQUFDLENBQUM7b0JBRUgsSUFBSSxDQUFDLFdBQVcsR0FBRyx1Q0FBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBRSxDQUFDLENBQUM7b0JBQ3RFLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxDQUFDO29CQUVwQyw4RUFBOEU7b0JBQzlFLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztpQkFDcEI7WUFDTCxDQUFDOzs7V0F4QkE7UUEwQkQ7Ozs7O1dBS0c7UUFDSyxrREFBWSxHQUFwQjtZQUNJLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztnQkFDckMsSUFBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxZQUFZLHFFQUFpQyxFQUFDO29CQUMzRCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQztvQkFDdEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLENBQUM7aUJBQ25GO3FCQUNJLElBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsWUFBWSx1RUFBa0MsRUFBQztvQkFDakUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLENBQUM7aUJBQzFFO2FBQ0o7UUFDTCxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSyxrREFBWSxHQUFwQjtZQUNJLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztnQkFDckMsSUFBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxZQUFZLHFFQUFpQyxFQUFDO29CQUMzRCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQztvQkFDdEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLENBQUM7aUJBQ25GO3FCQUNJLElBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsWUFBWSx1RUFBa0MsRUFBQztvQkFDakUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLENBQUM7aUJBQzFFO2FBQ0o7UUFDTCxDQUFDO1FBRU8sa0VBQTRCLEdBQXBDO1lBQ0ksa0NBQWtDO1lBQ2xDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUVwQix1QkFBdUI7WUFDdkIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBRWIsSUFBRyxJQUFJLENBQUMsV0FBVyxJQUFJLFNBQVMsRUFBQztnQkFDN0IsT0FBTzthQUNWO1lBRUQsaUNBQWlDO1lBQ2pDLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFdBQVksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1lBQy9ELEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQzFDLElBQUksU0FBUyxHQUFHLElBQUkscUVBQWlDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0UsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUNoQztZQUVELGlDQUFpQztZQUNqQyxJQUFJLGlCQUFpQixHQUFHLElBQUksQ0FBQyxXQUFZLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztZQUNqRSxLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUMzQyxJQUFJLFVBQVUsR0FBRyxJQUFJLHVFQUFrQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzlFLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDakM7WUFFRCxrQ0FBa0M7WUFDbEMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3hCLENBQUM7UUFTRCxzQkFBVyxvREFBVztZQVB0Qjs7Ozs7O2VBTUc7aUJBQ0g7Z0JBQ0ksSUFBRyxJQUFJLENBQUMsV0FBVyxJQUFJLFNBQVMsRUFBQztvQkFDN0IsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQztpQkFDdkM7Z0JBQ0QsT0FBTyxFQUFFLENBQUM7WUFDZCxDQUFDOzs7V0FBQTtRQWdCRDs7OztXQUlHO1FBQ0gsNkNBQU8sR0FBUDtZQUNLLGdCQUFnQjtZQUNoQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFFcEIsaUJBQU0sT0FBTyxXQUFFLENBQUM7UUFDckIsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gsMkNBQUssR0FBTDtZQUNJLGVBQWU7WUFDZixJQUFJLEtBQUssR0FBRyxJQUFJLDJCQUEyQixDQUFDLElBQUksQ0FBQyxLQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDN0QsSUFBRyxJQUFJLENBQUMsV0FBVyxJQUFJLFNBQVMsRUFBQztnQkFDN0IsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsNENBQTRDO2FBQ3pFO1lBRUQsa0JBQWtCO1lBQ2xCLElBQUksa0JBQWtCLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7WUFDeEQsSUFBSSxnQkFBZ0IsR0FBRyxLQUFLLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztZQUN2RCxLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsa0JBQWtCLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUM1Qyx5Q0FBeUM7Z0JBQ3pDLElBQUksaUJBQWlCLEdBQUcsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzlDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLENBQUM7Z0JBQ3BELElBQUcsaUJBQWlCLENBQUMsS0FBSyxJQUFJLFNBQVMsRUFBQztvQkFDcEMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztpQkFDL0Q7Z0JBQ0QsNEZBQTRGO2dCQUM1Rix1REFBdUQ7Z0JBQ3ZELDZFQUE2RTtnQkFDdkUsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBZ0IsQ0FBQyxLQUFLLEdBQVMsaUJBQWlCLENBQUMsZUFBZ0IsQ0FBQyxLQUFLLENBQUM7YUFDckc7WUFFRCxrQkFBa0I7WUFDbEIsSUFBSSxrQkFBa0IsR0FBRyxJQUFJLENBQUMsNkJBQTZCLEVBQUUsQ0FBQyxDQUFDLG9CQUFvQjtZQUNuRixJQUFJLGdCQUFnQixHQUFHLEtBQUssQ0FBQyw2QkFBNkIsRUFBRSxDQUFDLENBQUMsb0JBQW9CO1lBQ2xGLElBQUcsa0JBQWtCLElBQUksU0FBUyxJQUFJLGdCQUFnQixJQUFJLFNBQVMsRUFBQztnQkFDaEUsZ0JBQWdCLENBQUMsS0FBSyxHQUFHLGtCQUFrQixDQUFDLEtBQUssQ0FBQzthQUNyRDtZQUNELEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNsQixPQUFPLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ssNkRBQXVCLEdBQS9CO1lBQ0ksSUFBSSxhQUFhLEdBQUcsSUFBSSxLQUFLLEVBQU8sQ0FBQztZQUNyQyxJQUFJLFdBQVcsR0FBRyx1Q0FBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUM7WUFDL0QsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQ3JDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBQyxZQUFZLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBQyxDQUFDLENBQUE7YUFDM0Y7WUFDRCxPQUFPLGFBQWEsQ0FBQztRQUN6QixDQUFDO1FBRU8sOENBQVEsR0FBaEIsVUFBaUIsU0FBMkI7WUFDeEMsSUFBRyxTQUFTLElBQUksU0FBUyxFQUFDO2dCQUN0QixJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ3RDLElBQUcsVUFBVSxJQUFJLFNBQVMsRUFBQztvQkFDdkIsT0FBTyxVQUFVLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2lCQUN6QzthQUNKO1lBQ0QsT0FBTyxTQUFTLENBQUM7UUFDckIsQ0FBQztRQUVPLDZEQUF1QixHQUEvQixVQUFnQyxNQUFrQixFQUFFLElBQXVDO1lBQ3ZGLElBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFDO2dCQUN6QixzQkFBc0I7Z0JBQ3RCLE9BQU87YUFDVjtZQUNELElBQUcsTUFBTSxZQUFZLHFFQUFpQyxFQUFDO2dCQUNuRCxJQUFJLDBCQUEwQixHQUFzQyxNQUFNLENBQUM7Z0JBQzNFLElBQUksZUFBZSxHQUFHLDBCQUEwQixDQUFDLGVBQWUsQ0FBQztnQkFFakUsNkNBQTZDO2dCQUM3QyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDcEQsSUFBRyxRQUFRLElBQUksU0FBUyxFQUFDO29CQUNyQixrREFBa0Q7b0JBQ2xELDBCQUEwQixDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7aUJBQ2hEO2dCQUVELDRDQUE0QztnQkFDNUMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQywwQkFBMEIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsaUVBQWlFO2dCQUN0SSxJQUFHLEtBQUssSUFBSSxTQUFTLEVBQUM7b0JBQ2xCLElBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQywwQkFBMEIsQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxJQUFJLEtBQUssRUFBQzt3QkFDcEUsMEJBQTBCLENBQUMsdURBQXVELENBQUMsS0FBSyxFQUFFLGVBQWUsQ0FBQyxDQUFDO3FCQUM5Rzt5QkFDRzt3QkFDQSxrQ0FBa0M7d0JBQ2xDLDBCQUEwQixDQUFDLEtBQUssR0FBRyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsd0JBQXdCO3FCQUNyRjtpQkFDSjtxQkFDRztvQkFDQSxlQUFlLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztvQkFDakMsMEJBQTBCLENBQUMsMENBQTBDLENBQUMsZUFBZSxDQUFDLENBQUM7aUJBQzFGO2dCQUNELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUNwQjtRQUNMLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0gsZ0RBQVUsR0FBVixVQUFXLGVBQXVCLEVBQUUsZUFBNEIsRUFBRSxXQUE0QjtZQUExRCxnQ0FBQSxFQUFBLG9CQUE0QjtZQUFFLDRCQUFBLEVBQUEsbUJBQTRCO1lBQzFGLHlFQUF5RTtZQUN6RSxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFHLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ3BFLElBQUcsU0FBUyxJQUFJLFNBQVMsRUFBQztnQkFDdEIsT0FBTyxLQUFLLENBQUMsQ0FBQyxtQ0FBbUM7YUFDcEQ7WUFDRCxJQUFHLENBQUMsQ0FBQyxTQUFTLFlBQVksbURBQXdCLENBQUMsRUFBQztnQkFDaEQsT0FBTyxLQUFLLENBQUMsQ0FBQyxtQ0FBbUM7YUFDcEQ7WUFFRCxJQUFHLGVBQWUsSUFBSSxFQUFFLEVBQUM7Z0JBQ3JCLCtHQUErRztnQkFDL0csSUFBSSxlQUFlLEdBQUcsSUFBSSxDQUFDLDZCQUE2QixFQUFFLENBQUM7Z0JBQzNELElBQUcsZUFBZSxJQUFJLFNBQVMsRUFBQztvQkFDNUIsZUFBZSxHQUFHLGVBQWUsQ0FBQyxLQUFLLENBQUM7aUJBQzNDO2FBQ0o7WUFFRCxJQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTLEVBQUUsZUFBZSxFQUFFLFdBQVcsQ0FBQyxFQUFDO2dCQUNwRSxPQUFPLElBQUksQ0FBQzthQUNmO1lBQ0QsT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUVPLDREQUFzQixHQUE5QixVQUErQixlQUF5QyxFQUFFLGVBQTRCLEVBQUUsV0FBb0I7WUFBbEQsZ0NBQUEsRUFBQSxvQkFBNEI7WUFDbEcsbUNBQW1DO1lBQ25DLDBCQUEwQjtZQUMxQixJQUFHLGVBQWUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBWSwyQkFBMkIsRUFBQztnQkFDckUsSUFBSSxjQUFjLEdBQUcsZUFBZSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBZ0MsQ0FBQztnQkFDbkYsSUFBSSxlQUFlLEdBQUcsY0FBYyxDQUFDLHVCQUF1QixFQUFFLENBQUM7Z0JBQy9ELEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxlQUFlLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO29CQUN6QyxJQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksZUFBZSxFQUFDLEVBQUMscUJBQXFCO3dCQUNqRSxJQUFHLFdBQVcsSUFBSSxJQUFJLEVBQUM7NEJBQ25CLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO3lCQUN0Qzt3QkFDRCxPQUFPLElBQUksQ0FBQyxDQUFDLG1FQUFtRTtxQkFDbkY7eUJBQ0c7d0JBQ0EsSUFBSSxjQUFjLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsRUFBRyxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ2hHLElBQUcsY0FBYyxJQUFJLFNBQVMsRUFBQzs0QkFDM0IsSUFBSSxVQUFVLEdBQUksZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQXVDLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsZUFBZSxFQUFFLFdBQVcsQ0FBQyxDQUFDOzRCQUNoSixJQUFHLFVBQVUsSUFBSSxJQUFJLEVBQUM7Z0NBQ2xCLElBQUcsV0FBVyxJQUFJLElBQUksRUFBQztvQ0FDbkIsS0FBSyxDQUFDLDJCQUEyQixDQUFDLENBQUM7aUNBQ3RDO2dDQUNELE9BQU8sSUFBSSxDQUFDOzZCQUNmO3lCQUNKO3FCQUNKO2lCQUNKO2FBQ0o7WUFDRCxPQUFPLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBRVMsd0RBQWtCLEdBQTVCLFVBQTZCLE1BQWtCLEVBQUUsSUFBK0I7WUFDNUUsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDO1lBQ25CLElBQUksNkJBQTZCLEdBQUcsSUFBSSxDQUFDLDRDQUE0QyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzdGLElBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSx1Q0FBVyxDQUFDLGlCQUFpQixFQUFDO2dCQUM1Qyw2QkFBNkIsQ0FBQyxPQUFPLENBQUMsVUFBQyxRQUFRO29CQUMzQyxRQUFRLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBTSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyw0REFBNEQ7Z0JBQ2xILENBQUMsQ0FBQyxDQUFDO2dCQUVILElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUNwQjtpQkFDSSxJQUFHLElBQUksQ0FBQyxNQUFNLElBQUksdUNBQVcsQ0FBQyxNQUFNLEVBQUM7Z0JBQ3RDLDZCQUE2QixDQUFDLE9BQU8sQ0FBQyxVQUFDLFFBQVE7b0JBQzNDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztnQkFDaEMsQ0FBQyxDQUFDLENBQUM7YUFDTjtRQUNMLENBQUM7UUFFTyxrRkFBNEMsR0FBcEQsVUFBcUQsS0FBaUI7WUFDbEUsSUFBSSxTQUFTLEdBQUcsSUFBSSxLQUFLLEVBQU8sQ0FBQztZQUNqQyxLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQ3JDLElBQUkscUJBQXFCLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdDLElBQUcscUJBQXFCLENBQUMsS0FBSyxJQUFJLEtBQUssRUFBQztvQkFDcEMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ2xDO2FBQ0o7WUFDRCxPQUFPLFNBQVMsQ0FBQztRQUNyQixDQUFDO1FBRUQ7Ozs7V0FJRztRQUNILCtDQUFTLEdBQVQ7WUFDSSxtQ0FBbUM7WUFDbkMsSUFBSSxTQUFTLEdBQUcsSUFBSSxLQUFLLEVBQW9CLENBQUM7WUFDOUMsSUFBSSxxQkFBcUIsR0FBRyxJQUFJLEtBQUssRUFBb0IsQ0FBQztZQUMxRCxJQUFJLG9CQUFvQixDQUFDO1lBQ3pCLElBQUkscUJBQXFCLEdBQUcsU0FBUyxDQUFDO1lBRXRDLElBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxTQUFTLEVBQUM7Z0JBQzdCLDJDQUEyQztnQkFDM0Msb0JBQW9CLEdBQUksSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7Z0JBQ3ZELG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxVQUFBLG9CQUFvQjtvQkFDN0MsU0FBUyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDekQsQ0FBQyxDQUFDLENBQUM7Z0JBRUgscUJBQXFCLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzlELHFCQUFxQixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsa0JBQWtCLEVBQUUsQ0FBQzthQUNqRTtZQUNELCtEQUErRDtZQUMvRCxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsNkJBQTZCLEVBQUUsQ0FBQztZQUN0RCxJQUFHLFVBQVUsSUFBSSxTQUFTLElBQUksVUFBVSxDQUFDLEtBQUssSUFBSSxTQUFTLEVBQUM7Z0JBQ3hELElBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxTQUFTLEVBQUM7b0JBQzdCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLENBQUM7b0JBQzFDLElBQUcsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUM7d0JBQ2pCLFVBQVUsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztxQkFDdkM7aUJBQ0o7Z0JBRUQsVUFBVSxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLENBQUE7Z0JBQzdHLElBQUcscUJBQXFCLENBQUMsQ0FBQyxDQUFDLFlBQVksNkNBQXFCLEVBQUM7b0JBQ3pELFVBQVUsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFFLHFCQUFxQixDQUFDLENBQUMsQ0FBMkIsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO2lCQUNoRztxQkFDRztvQkFDQSxPQUFPLENBQUMsS0FBSyxDQUFDLHdHQUF3RyxDQUFDLENBQUM7aUJBQzNIO2FBQ0o7UUFDTCxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSSw2REFBdUIsR0FBOUI7WUFDSSxJQUFJLFNBQVMsR0FBRyxJQUFJLEtBQUssRUFBcUMsQ0FBQztZQUMvRCxJQUFJLHFCQUFxQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDeEMsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLHFCQUFxQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztnQkFDL0MsSUFBSSxxQkFBcUIsR0FBRyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckQsSUFBRyxxQkFBcUIsWUFBWSxxRUFBaUMsRUFBQztvQkFDbEUsU0FBUyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO2lCQUN6QzthQUNKO1lBQ0QsT0FBTyxTQUFTLENBQUM7UUFDckIsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0ksbUVBQTZCLEdBQXBDO1lBQ0ksSUFBSSxxQkFBcUIsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ3hDLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxxQkFBcUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQy9DLElBQUksZUFBZSxHQUFHLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMvQyxJQUFHLGVBQWUsWUFBWSx1RUFBa0MsRUFBQztvQkFDN0QsT0FBTyxlQUFlLENBQUM7aUJBQzFCO2FBQ0o7WUFDRCxPQUFPLFNBQVMsQ0FBQztRQUNyQixDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0gsbURBQWEsR0FBYixVQUFjLFNBQXNCO1lBQXRCLDBCQUFBLEVBQUEsY0FBc0I7WUFDaEMsSUFBSSxVQUFVLEdBQUcsSUFBSSxLQUFLLEVBQWMsQ0FBQztZQUN6QyxLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQ3JDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLElBQUcsS0FBSyxZQUFZLHVFQUFrQyxFQUFDLEVBQUUseUNBQXlDO29CQUM5RixJQUFJLFNBQVMsSUFBSSxFQUFFLElBQUksS0FBSyxDQUFDLEtBQUssSUFBSSxTQUFTLEVBQUM7d0JBQzVDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQzFCO2lCQUNKO3FCQUNJLElBQUcsS0FBSyxZQUFZLCtCQUFjLEVBQUM7b0JBQ3BDLFVBQVUsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztpQkFDbEU7YUFDSjtZQUNELE9BQU8sVUFBVSxDQUFDO1FBQ3RCLENBQUM7UUFFTyw4REFBd0IsR0FBaEMsVUFBaUMsTUFBTSxFQUFFLElBQUk7WUFDekMsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3RDLElBQUcsVUFBVSxJQUFJLFNBQVMsRUFBQztnQkFDdkIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQy9ELElBQUcsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUMsRUFBRSxzRkFBc0Y7b0JBQzVHLElBQUkscUJBQXFCLEdBQXVDLE1BQU0sQ0FBQztvQkFDdkUscUJBQXFCLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7b0JBQzNDLDZEQUE2RDtvQkFDN0Qsd0NBQXdDO29CQUN4Qyx3QkFBd0I7b0JBQ3hCLE9BQU87aUJBQ1Y7YUFDSjtZQUNELElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JDLENBQUM7UUFFTCxrQ0FBQztJQUFELENBQUMsQUFuaEJELENBQWlELCtCQUFjLEdBbWhCOUQ7SUFuaEJZLGtFQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENhbGN1bGF0b3JQcm92aWRlciB9IGZyb20gXCIuLi9jb21tb24vY2FsY3VsYXRvclByb3ZpZGVyL2NhbGN1bGF0b3JQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBJQ2FsY3VsYXRvciB9IGZyb20gXCIuLi9jb21tb24vY2FsY3VsYXRvclByb3ZpZGVyL2ludGVyZmFjZXMvY2FsY3VsYXRvckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTZXJpZUNvbnRhaW5lciB9IGZyb20gXCIuLi9jb21tb24vc2lnbmFsL3NlcmllQ29udGFpbmVyXCI7XHJcbmltcG9ydCB7IFRDYWxjdWxhdGlvbkRhdGEgfSBmcm9tIFwiLi4vY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdGlvbkRhdGFcIjtcclxuaW1wb3J0IHsgSVNlcmllTm9kZSB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy9zZXJpZU5vZGVJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVNlcmllQ29udGFpbmVyIH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL3NlcmllQ29udGFpbmVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YVBvaW50cyB9IGZyb20gXCIuLi9jb21tb24vY2FsY3VsYXRvclByb3ZpZGVyL2NhbGN1bGF0aW9uRGF0YVBvaW50c1wiO1xyXG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tIFwiLi4vY29tbW9uL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSUNlbGxJbmZvIH0gZnJvbSBcIi4uLy4uL3dpZGdldHMvY29tbW9uL2ludGVyZmFjZXMvY2VsbEluZm9JbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVZhbHVlTGlzdEl0ZW0gfSBmcm9tIFwiLi4vLi4vY29tbW9uL2ludGVyZmFjZXMvdmFsdWVMaXN0SXRlbUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4uL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9iYXNlU2VyaWVzXCI7XHJcbmltcG9ydCB7IFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YSB9IGZyb20gXCIuL3NpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YVwiO1xyXG5pbXBvcnQgeyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25PdXRwdXREYXRhIH0gZnJvbSBcIi4vc2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uT3V0cHV0RGF0YVwiO1xyXG5pbXBvcnQgeyBFdmVudFNlcmllRGF0YUNoYW5nZWRBcmdzLCBTZXJpZUFjdGlvbiB9IGZyb20gXCIuLi9jaGFydE1hbmFnZXJEYXRhTW9kZWwvZXZlbnRTZXJpZURhdGFDaGFuZ2VkQXJnc1wiO1xyXG5pbXBvcnQgeyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb24gfSBmcm9tIFwiLi9zaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25cIjtcclxuaW1wb3J0IHsgRXZlbnRTaWduYWxNYW5hZ2VyRGF0YUNoYW5nZWRBcmdzIH0gZnJvbSBcIi4vZXZlbnRTaWduYWxNYW5hZ2VyRGF0YUNoYW5nZWRBcmdzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlIGV4dGVuZHMgU2VyaWVDb250YWluZXIgaW1wbGVtZW50cyBJQ2VsbEluZm97XHJcbiAgICBcclxuICAgIHByaXZhdGUgX3ZhbHVlOiBzdHJpbmc7XHJcblxyXG4gICAgcHJpdmF0ZSBfY2FsY3VsYXRvcjogSUNhbGN1bGF0b3J8dW5kZWZpbmVkO1xyXG5cclxuICAgIHByaXZhdGUgX2lucHV0RGF0YUNoYW5nZWRIYW5kbGVyID0gKHNlbmRlciwgYXJncykgPT4gdGhpcy5vbklucHV0RGF0YVZhbHVlQ2hhbmdlZChzZW5kZXIsIGFyZ3MpO1xyXG4gICAgcHJpdmF0ZSBfaW5wdXRTZXJpZURhdGFDaGFuZ2VkSGFuZGxlciA9IChzZW5kZXIsIGFyZ3MpID0+IHRoaXMub25TZXJpZURhdGFDaGFuZ2VkKHNlbmRlciwgYXJncyk7XHJcbiAgICBwcml2YXRlIF9vdXRwdXREYXRhQ2hhbmdlZEhhbmRsZXIgPSAoc2VuZGVyLCBhcmdzKSA9PiB0aGlzLm9uT3V0cHV0RGF0YVZhbHVlQ2hhbmdlZChzZW5kZXIsIGFyZ3MpO1xyXG5cclxuICAgIHByaXZhdGUgX3ZhbHVlczogQXJyYXk8SVZhbHVlTGlzdEl0ZW0+O1xyXG4gICAgcHVibGljIGdldCB2YWx1ZXMoKTogQXJyYXk8SVZhbHVlTGlzdEl0ZW0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWVzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX29ubHlWYWx1ZXNGcm9tTGlzdEFyZUFsbG93ZWQ6IGJvb2xlYW47XHJcbiAgICBwdWJsaWMgZ2V0IG9ubHlWYWx1ZXNGcm9tTGlzdEFyZUFsbG93ZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX29ubHlWYWx1ZXNGcm9tTGlzdEFyZUFsbG93ZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZGF0YVR5cGVOYW1lOiBzdHJpbmcgPSBcIlN0cmluZ1wiO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgbWluVmFsdWUoKTogbnVtYmVyfHVuZGVmaW5lZHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgZ2V0IG1heFZhbHVlKCk6IG51bWJlcnx1bmRlZmluZWR7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIG5hbWUgb2YgdGhpcyBjYWxjdWxhdG9yIHR5cGVcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBkYXRhTW9kZWwgPSB0aGlzLmdldERhdGFNb2RlbCgpO1xyXG4gICAgICAgIGlmKGRhdGFNb2RlbCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBpZihkYXRhTW9kZWwuZWRpdE1vZGVBY3RpdmUgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbmFtZSE7IC8vIFNob3cgdGhlIG5hbWUgb2YgY2FsY3VsYXRvciB0eXBlIGluIHRoZSBlZGl0IG1vZGUgKGUuZy4gQWxnb3JpdGhtKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlOyAvLyBTaG93IG9ubHkgdGhlIHZhbHVlIChlLmcuIFwiQWRkXCIpXHJcbiAgICB9ICAgIFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgcGFyZW50IG9mIHRoaXMgY2FsY3VsYXRvciB0eXBlXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUgeyhJU2VyaWVDb250YWluZXIgfCB1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdG9yVHlwZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHBhcmVudCgpOiBJU2VyaWVDb250YWluZXIgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJlbnQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgcGFyZW50IG9mIHRoaXMgY2FsY3VsYXRvciB0eXBlXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdG9yVHlwZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IHBhcmVudCh2YWx1ZTogSVNlcmllQ29udGFpbmVyIHwgdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5fcGFyZW50ID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmUgcmVmZXJlbmNlIHRvIHNlcmllIGZyb20gdGhpcyBjYWxjdWxhdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVcclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRvclR5cGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlbW92ZVJlZmVyZW5jZVRvU2VyaWUoc2VyaWU6IEJhc2VTZXJpZXMpe1xyXG4gICAgICAgIGxldCBjYWxjRGF0YXMgPSB0aGlzLmdldENhbGN1bGF0aW9uRGF0YXNDb3JyZXNwb25kaW5nVG9TaWduYWxOYW1lKHNlcmllKTtcclxuICAgICAgICBjYWxjRGF0YXMuZm9yRWFjaChjYWxjdWxhdGlvbkRhdGEgPT4ge1xyXG4gICAgICAgICAgICBjYWxjdWxhdGlvbkRhdGEudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgICBsZXQgZGVmYXVsdERhdGEgPSBuZXcgQXJyYXk8SVBvaW50PigpO1xyXG4gICAgICAgICAgICBjYWxjdWxhdGlvbkRhdGEuY2FsY3VsYXRpb25EYXRhLnNldERhdGEoPGFueT5kZWZhdWx0RGF0YSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gbmVlZGVkIGZvciBDZWxsVHlwZUVkaXRvclxyXG4gICAgcHVibGljIGdldCBkaXNwbGF5VmFsdWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGlzIGNhbGN1bGF0b3IgdHlwZVxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgdmFsdWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSB2YWx1ZSBvZiB0aGlzIGNhbGN1bGF0b3IgdHlwZVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRvclR5cGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCB2YWx1ZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYodGhpcy5fdmFsdWUgIT0gdmFsdWUpe1xyXG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICBsZXQgaWQ6IHN0cmluZyA9IHRoaXMuX3ZhbHVlO1xyXG4gICAgICAgICAgICAvLyBnZXQgY2FsY3VsYXRvciBpZCAoZnJvbSBkaXNwbGF5VmFsdWUpXHJcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlcy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYoZWxlbWVudC5kaXNwbGF5VmFsdWUgPT0gdGhpcy5fdmFsdWUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlkID0gZWxlbWVudC52YWx1ZTtcclxuICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5fY2FsY3VsYXRvciA9IENhbGN1bGF0b3JQcm92aWRlci5nZXRJbnN0YW5jZSgpLmdldENhbGN1bGF0b3IoaWQpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNoaWxkc0J5Q2FsY3VsYXRvclR5cGUoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIENhbGN1bGF0ZSB3aXRoIGRlZmF1bHQgdmFsdWVzIHRvIGdldCBlcnJvciBpbmZvcyB3aGljaCBkYXRhIGkgbm90IGF2YWlsYWJsZVxyXG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZSgpOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEF0dGFjaCB0byB0aGUgZXZlbnRzIG9mIHRoZSBpbnB1dCBhbmQgb3V0cHV0IGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdG9yVHlwZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGF0dGFjaEV2ZW50cygpe1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpIDwgdGhpcy5jaGlsZHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZih0aGlzLmNoaWxkc1tpXSBpbnN0YW5jZW9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoaWxkc1tpXS5ldmVudERhdGFDaGFuZ2VkLmF0dGFjaCh0aGlzLl9pbnB1dERhdGFDaGFuZ2VkSGFuZGxlcik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoaWxkc1tpXS5ldmVudFNlcmllRGF0YUNoYW5nZWQuYXR0YWNoKHRoaXMuX2lucHV0U2VyaWVEYXRhQ2hhbmdlZEhhbmRsZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5jaGlsZHNbaV0gaW5zdGFuY2VvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25PdXRwdXREYXRhKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRzW2ldLmV2ZW50RGF0YUNoYW5nZWQuYXR0YWNoKHRoaXMuX291dHB1dERhdGFDaGFuZ2VkSGFuZGxlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXRhY2ggZXZlbnRzIGZyb20gdGhlIGlucHV0IGFuZCBvdXRwdXQgZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZGV0YWNoRXZlbnRzKCl7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGkgPCB0aGlzLmNoaWxkcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuY2hpbGRzW2ldIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRzW2ldLmV2ZW50RGF0YUNoYW5nZWQuZGV0YWNoKHRoaXMuX2lucHV0RGF0YUNoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRzW2ldLmV2ZW50U2VyaWVEYXRhQ2hhbmdlZC5kZXRhY2godGhpcy5faW5wdXRTZXJpZURhdGFDaGFuZ2VkSGFuZGxlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLmNoaWxkc1tpXSBpbnN0YW5jZW9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbk91dHB1dERhdGEpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGlsZHNbaV0uZXZlbnREYXRhQ2hhbmdlZC5kZXRhY2godGhpcy5fb3V0cHV0RGF0YUNoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZUNoaWxkc0J5Q2FsY3VsYXRvclR5cGUoKXtcclxuICAgICAgICAvLyBEZXRhY2ggZXZlbnRzIG9mIGN1cnJlbnQgY2hpbGRzXHJcbiAgICAgICAgdGhpcy5kZXRhY2hFdmVudHMoKTtcclxuXHJcbiAgICAgICAgLy8gQ2xlYXIgY3VycmVudCBjaGlsZHNcclxuICAgICAgICB0aGlzLmNsZWFyKCk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuX2NhbGN1bGF0b3IgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBBZGQgaW5wdXQgZGF0YSBmb3IgY2FsY3VsYXRpb25cclxuICAgICAgICBsZXQgZGVmYXVsdElucHV0RGF0YSA9IHRoaXMuX2NhbGN1bGF0b3IhLmdldERlZmF1bHRJbnB1dERhdGEoKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaSA8IGRlZmF1bHRJbnB1dERhdGEubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgaW5wdXREYXRhID0gbmV3IFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YShkZWZhdWx0SW5wdXREYXRhW2ldKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRTZXJpZU5vZGUoaW5wdXREYXRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEFkZCBvdXB1dCBkYXRhIGZvciBjYWxjdWxhdGlvblxyXG4gICAgICAgIGxldCBkZWZhdWx0T3V0cHV0RGF0YSA9IHRoaXMuX2NhbGN1bGF0b3IhLmdldERlZmF1bHRPdXRwdXREYXRhKCk7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGkgPCBkZWZhdWx0T3V0cHV0RGF0YS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBvdXRwdXREYXRhID0gbmV3IFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbk91dHB1dERhdGEoZGVmYXVsdE91dHB1dERhdGFbaV0pO1xyXG4gICAgICAgICAgICB0aGlzLmFkZFNlcmllTm9kZShvdXRwdXREYXRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEF0dGFjaCBldmVudHMgdG8gdGhlIG5ldyBjaGlsZHNcclxuICAgICAgICB0aGlzLmF0dGFjaEV2ZW50cygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGVzY3JpcHRpb24gb2YgdGhlIGNhbGN1bGF0b3IgdHlwZVxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRvclR5cGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBkZXNjcmlwdGlvbigpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmKHRoaXMuX2NhbGN1bGF0b3IgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NhbGN1bGF0b3IuZGVzY3JpcHRpb247XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRvclR5cGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRvclR5cGVcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKXtcclxuICAgICAgICBzdXBlcihuYW1lLCBcIlwiLCB0cnVlKTtcclxuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuY2FuRGVsZXRlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fdmFsdWVzID0gdGhpcy5nZXRBdmFpbGFibGVDYWxjdWxhdG9ycygpO1xyXG4gICAgICAgIHRoaXMuX29ubHlWYWx1ZXNGcm9tTGlzdEFyZUFsbG93ZWQgPSB0cnVlO1xyXG4gICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc3Bvc2UgdGhlIFNpZ25hbE1hbmFnZXJDYWxjdWxhdG9yVHlwZVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRvclR5cGVcclxuICAgICAqL1xyXG4gICAgZGlzcG9zZSgpe1xyXG4gICAgICAgICAvLyBEZXRhY2ggZXZlbnRzXHJcbiAgICAgICAgIHRoaXMuZGV0YWNoRXZlbnRzKCk7XHJcbiAgICAgICAgIFxyXG4gICAgICAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDbG9uZXMgdGhlIFNpZ25hbE1hbmFnZXJDYWxjdWxhdG9yVHlwZSBvYmplY3Qgd2l0aCBhbGwgY2hpbGRzXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge1NpZ25hbE1hbmFnZXJDYWxjdWxhdG9yVHlwZX1cclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRvclR5cGVcclxuICAgICAqL1xyXG4gICAgY2xvbmUoKTogU2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlIHtcclxuICAgICAgICAvLyBDbG9uZSBvYmplY3RcclxuICAgICAgICBsZXQgY2xvbmUgPSBuZXcgU2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlKHRoaXMuX25hbWUhLCBcIlwiKTtcclxuICAgICAgICBpZih0aGlzLl9jYWxjdWxhdG9yICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGNsb25lLnZhbHVlID0gdGhpcy52YWx1ZTsgLy8gU2V0IGN1cnJlbnQgdXNlZCBjYWxjdWxhdG9yIGZyb20gb3JpZ2luYWxcclxuICAgICAgICB9XHJcbiAgICAgICBcclxuICAgICAgICAvLyBTZXQgaW5wdXQgZGF0YSBcclxuICAgICAgICBsZXQgb3JpZ2luYWxJbnB1dERhdGFzID0gdGhpcy5nZXRJbnB1dENhbGN1bGF0aW9uRGF0YSgpO1xyXG4gICAgICAgIGxldCBjbG9uZWRJbnB1dERhdGFzID0gY2xvbmUuZ2V0SW5wdXRDYWxjdWxhdGlvbkRhdGEoKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaSA8IG9yaWdpbmFsSW5wdXREYXRhcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIC8vIFNldCBkYXRhIGZyb20gb3JpZ2luYWwgdG8gY2xvbmVkIG9iamN0XHJcbiAgICAgICAgICAgIGxldCBvcmlnaW5hbElucHV0RGF0YSA9IG9yaWdpbmFsSW5wdXREYXRhc1tpXTtcclxuICAgICAgICAgICAgY2xvbmVkSW5wdXREYXRhc1tpXS52YWx1ZSA9IG9yaWdpbmFsSW5wdXREYXRhLnZhbHVlO1xyXG4gICAgICAgICAgICBpZihvcmlnaW5hbElucHV0RGF0YS5zZXJpZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgY2xvbmVkSW5wdXREYXRhc1tpXS5zZXJpZSA9IG9yaWdpbmFsSW5wdXREYXRhLnNlcmllLmNsb25lKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9sZXQgbmV3RGF0YTogc3RyaW5nIHwgbnVtYmVyfCBBcnJheTxJUG9pbnQ+ID0gb3JpZ2luYWxJbnB1dERhdGEuY2FsY3VsYXRpb25EYXRhLmdldERhdGEoKTtcclxuICAgICAgICAgICAgLy9jbG9uZWRJbnB1dERhdGFzW2ldLmNhbGN1bGF0aW9uRGF0YS5zZXREYXRhKG5ld0RhdGEpO1xyXG4gICAgICAgICAgICAvLyBUT0RPOiBVc2UgcHVibGljIG1ldGhvZHMgdG8gc2V0IGRhdGEgdG8gY2xvbmU7IHByb2JsZW1zIHdpdGggZGF0YXR5cGVzICEhIVxyXG4gICAgICAgICAgICAoPGFueT5jbG9uZWRJbnB1dERhdGFzW2ldLmNhbGN1bGF0aW9uRGF0YSkuX2RhdGEgPSAoPGFueT5vcmlnaW5hbElucHV0RGF0YS5jYWxjdWxhdGlvbkRhdGEpLl9kYXRhO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBTZXQgb3V0cHV0IGRhdGFcclxuICAgICAgICBsZXQgb3JpZ2luYWxPdXRwdXREYXRhID0gdGhpcy5nZXRGaXJzdE91dHB1dENhbGN1bGF0aW9uRGF0YSgpOyAvLyBUT0RPOiBtdWx0aW91dHB1dFxyXG4gICAgICAgIGxldCBjbG9uZWRPdXRwdXREYXRhID0gY2xvbmUuZ2V0Rmlyc3RPdXRwdXRDYWxjdWxhdGlvbkRhdGEoKTsgLy8gVE9ETzogbXVsdGlvdXRwdXRcclxuICAgICAgICBpZihvcmlnaW5hbE91dHB1dERhdGEgIT0gdW5kZWZpbmVkICYmIGNsb25lZE91dHB1dERhdGEgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgY2xvbmVkT3V0cHV0RGF0YS52YWx1ZSA9IG9yaWdpbmFsT3V0cHV0RGF0YS52YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2xvbmUuY2FsY3VsYXRlKCk7XHJcbiAgICAgICAgcmV0dXJuIGNsb25lO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhIGxpc3Qgd2l0aCBhdmFpbGFibGUgY2FsY3VsYXRvcnMgZGlzcGxheVZhbHVlIGFuZCBpZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7YW55W119XHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0QXZhaWxhYmxlQ2FsY3VsYXRvcnMoKTogYW55W117XHJcbiAgICAgICAgbGV0IHBvc3NpYmxlVHlwZXMgPSBuZXcgQXJyYXk8YW55PigpO1xyXG4gICAgICAgIGxldCBjYWxjdWxhdG9ycyA9IENhbGN1bGF0b3JQcm92aWRlci5nZXRJbnN0YW5jZSgpLmNhbGN1bGF0b3JzO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpIDwgY2FsY3VsYXRvcnMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBwb3NzaWJsZVR5cGVzLnB1c2goe2Rpc3BsYXlWYWx1ZTogY2FsY3VsYXRvcnNbaV0uZGlzcGxheU5hbWUsIHZhbHVlOiBjYWxjdWxhdG9yc1tpXS5pZH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwb3NzaWJsZVR5cGVzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0U2VyaWUoc2VyaWVOYW1lOiBzdHJpbmd8dW5kZWZpbmVkKTogQmFzZVNlcmllc3x1bmRlZmluZWR7XHJcbiAgICAgICAgaWYoc2VyaWVOYW1lICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGxldCBzZXJpZUdyb3VwID0gdGhpcy5nZXRTZXJpZUdyb3VwKCk7XHJcbiAgICAgICAgICAgIGlmKHNlcmllR3JvdXAgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzZXJpZUdyb3VwLmdldFNlcmllKHNlcmllTmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uSW5wdXREYXRhVmFsdWVDaGFuZ2VkKHNlbmRlcjogSVNlcmllTm9kZSwgYXJnczogRXZlbnRTaWduYWxNYW5hZ2VyRGF0YUNoYW5nZWRBcmdzKXtcclxuICAgICAgICBpZihhcmdzLmRhdGEgPT0gYXJncy5vbGREYXRhKXtcclxuICAgICAgICAgICAgLy8gTm90aGluZyBoYXMgY2hhbmdlZFxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHNlbmRlciBpbnN0YW5jZW9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YSl7XHJcbiAgICAgICAgICAgIGxldCBzaWduYWxDYWxjdWxhdGlvbklucHV0RGF0YTogU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhID0gc2VuZGVyO1xyXG4gICAgICAgICAgICBsZXQgY2FsY3VsYXRpb25EYXRhID0gc2lnbmFsQ2FsY3VsYXRpb25JbnB1dERhdGEuY2FsY3VsYXRpb25EYXRhO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgb2xkIGlucHV0IGRhdGEgd2FzIGEgc2lnbmFsKG5hbWUpXHJcbiAgICAgICAgICAgIGxldCBvbGRTZXJpZSA9IHRoaXMuZ2V0U2VyaWUoY2FsY3VsYXRpb25EYXRhLnZhbHVlKTtcclxuICAgICAgICAgICAgaWYob2xkU2VyaWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBjdXJyZW50IHVzZWQgc2lnbmFsIGZyb20gY2FsY3VsYXRpb25EYXRhXHJcbiAgICAgICAgICAgICAgICBzaWduYWxDYWxjdWxhdGlvbklucHV0RGF0YS5zZXJpZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIG5ldyBpbnB1dCBkYXRhIGlzIGEgc2lnbmFsKG5hbWUpXHJcbiAgICAgICAgICAgIGxldCBzZXJpZSA9IHRoaXMuZ2V0U2VyaWUoc2lnbmFsQ2FsY3VsYXRpb25JbnB1dERhdGEuZ2V0UmF3VmFsdWUoKSk7IC8vIGdldCB0aGUgc2lnbmFsIGdyb3VwIGFuZCBsb29rIGZvciBzaWduYWwgd2l0aCBnaXZlbiBuYW1lIGluIGl0XHJcbiAgICAgICAgICAgIGlmKHNlcmllICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmN5Y2xlRm91bmQoc2lnbmFsQ2FsY3VsYXRpb25JbnB1dERhdGEudmFsdWUsIFwiXCIsIHRydWUpID09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgICAgICBzaWduYWxDYWxjdWxhdGlvbklucHV0RGF0YS5zZXRTaWduYWxDYWxjdWxhdGlvblZhbHVlVG9DYWxjdWxhdGlvbkRhdGFXaXRoU2VyaWVEYXRhKHNlcmllLCBjYWxjdWxhdGlvbkRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgQ3ljbGUgZm91bmQgdXNlIG9sZCBpbnB1dCBkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgc2lnbmFsQ2FsY3VsYXRpb25JbnB1dERhdGEudmFsdWUgPSBjYWxjdWxhdGlvbkRhdGEudmFsdWU7IC8vIFRPRE86IFNob3cgTWVzc2FnZUJveFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBjYWxjdWxhdGlvbkRhdGEudHlwZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIHNpZ25hbENhbGN1bGF0aW9uSW5wdXREYXRhLnNldFNpZ25hbENhbGN1bGF0aW9uVmFsdWVUb0NhbGN1bGF0aW9uRGF0YShjYWxjdWxhdGlvbkRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlKCk7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVjayBpZiB0aGUgc2lnbmFsIG5hbWUsIHdoaWNoIHdpbGwgYmUgdXNlZCBmb3IgaW5wdXQgb2YgdGhpcyBjYWxjdWxhdGlvbiBkZXBlbmRzIG9uIHRoZSBvdXRwdXQgb2YgdGhpcyBjYWxjdWxhdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbnB1dFNpZ25hbE5hbWVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3VwdXRTaWduYWxOYW1lPVwiXCJdXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRvclR5cGVcclxuICAgICAqL1xyXG4gICAgY3ljbGVGb3VuZChpbnB1dFNpZ25hbE5hbWU6IHN0cmluZywgb3VwdXRTaWduYWxOYW1lOiBzdHJpbmcgPSBcIlwiLCBzaG93TWVzc2FnZTogYm9vbGVhbiA9IGZhbHNlKTogYm9vbGVhbntcclxuICAgICAgICAvLyBnZXQgc2VyaWVOb2RlIHdoZXJlIGl0IGlzIGRlZmluZWQoY2FsY3VsYXRpb24gb3V0cHV0IG9yIG5vcm1hbCBzaWduYWwpXHJcbiAgICAgICAgbGV0IHNlcmllTm9kZSA9IHRoaXMuZ2V0U2VyaWVHcm91cCgpIS5nZXRTZXJpZU5vZGUoaW5wdXRTaWduYWxOYW1lKTtcclxuICAgICAgICBpZihzZXJpZU5vZGUgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBObyBzaWduYWwgbm9kZSBmb3VuZCA9PiBubyBjeWNsZVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZighKHNlcmllTm9kZSBpbnN0YW5jZW9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbikpe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7IC8vIE5vIGNhbGN1bGF0ZWQgc2lnbmFsID0+IG5vIGN5Y2xlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihvdXB1dFNpZ25hbE5hbWUgPT0gXCJcIil7XHJcbiAgICAgICAgICAgIC8vV29ya2Fyb3VuZDogRml4ZWQgZm9yIGNyZWF0aW9uIG9mIEZGVCB3aXRoIEQmRC4gSW5wdXQgZGF0YSBzaG91bGQgYmUgYWRkZWQgYWZ0ZXIgY2FsY3VsYXRvciBoYXMgYmVlbiBjcmVhdGVkLlxyXG4gICAgICAgICAgICBsZXQgZmlyc3RPdXRwdXREYXRhID0gdGhpcy5nZXRGaXJzdE91dHB1dENhbGN1bGF0aW9uRGF0YSgpO1xyXG4gICAgICAgICAgICBpZihmaXJzdE91dHB1dERhdGEgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIG91cHV0U2lnbmFsTmFtZSA9IGZpcnN0T3V0cHV0RGF0YS52YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5mb3VuZENpcmN1bGFyUmVmZXJlbmNlKHNlcmllTm9kZSwgb3VwdXRTaWduYWxOYW1lLCBzaG93TWVzc2FnZSkpe1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZm91bmRDaXJjdWxhclJlZmVyZW5jZShjYWxjdWxhdGlvbk5vZGU6IFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbiwgb3VwdXRTaWduYWxOYW1lOiBzdHJpbmcgPSBcIlwiLCBzaG93TWVzc2FnZTogYm9vbGVhbik6IGJvb2xlYW57XHJcbiAgICAgICAgLy8gZ2V0IGlucHV0IHNpZ25hbHMgb2YgY2FsY3VsYXRpb25cclxuICAgICAgICAvLyBUT0RPOiByZWZhY3RvciBhIGxpdHRsZVxyXG4gICAgICAgIGlmKGNhbGN1bGF0aW9uTm9kZS5nZXRDaGlsZHMoKVswXSBpbnN0YW5jZW9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdG9yVHlwZSl7XHJcbiAgICAgICAgICAgIGxldCBjYWxjdWxhdG9yVHlwZSA9IGNhbGN1bGF0aW9uTm9kZS5nZXRDaGlsZHMoKVswXSBhcyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRvclR5cGU7XHJcbiAgICAgICAgICAgIGxldCBpbnB1dFNlcmllTm9kZXMgPSBjYWxjdWxhdG9yVHlwZS5nZXRJbnB1dENhbGN1bGF0aW9uRGF0YSgpO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaSA8IGlucHV0U2VyaWVOb2Rlcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBpZihpbnB1dFNlcmllTm9kZXNbaV0udmFsdWUgPT0gb3VwdXRTaWduYWxOYW1lKXsvLyBUT0RPOiBtdWx0aSBvdXRwdXRcclxuICAgICAgICAgICAgICAgICAgICBpZihzaG93TWVzc2FnZSA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJDaXJjdWxhciByZWZlcmVuY2UgZm91bmQhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTsgLy8gaW5wdXQgcmVmZXJlbmNlcyB0byBvdXRwdXQgb2YgY3VycmVudCBjYWxjdWxhdGlvbiA9PiBjeWNsZSBmb3VuZFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGRTZXJpZU5vZGUgPSBpbnB1dFNlcmllTm9kZXNbaV0uZ2V0U2VyaWVHcm91cCgpIS5nZXRTZXJpZU5vZGUoaW5wdXRTZXJpZU5vZGVzW2ldLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihjaGlsZFNlcmllTm9kZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY3ljbGVGb3VuZCA9IChpbnB1dFNlcmllTm9kZXNbaV0ucGFyZW50ISBhcyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRvclR5cGUpLmN5Y2xlRm91bmQoaW5wdXRTZXJpZU5vZGVzW2ldLnZhbHVlLCBvdXB1dFNpZ25hbE5hbWUsIHNob3dNZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY3ljbGVGb3VuZCA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNob3dNZXNzYWdlID09IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiQ2lyY3VsYXIgcmVmZXJlbmNlIGZvdW5kIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25TZXJpZURhdGFDaGFuZ2VkKHNlbmRlcjogQmFzZVNlcmllcywgYXJnczogRXZlbnRTZXJpZURhdGFDaGFuZ2VkQXJncyl7XHJcbiAgICAgICAgbGV0IHNlcmllID0gc2VuZGVyO1xyXG4gICAgICAgIGxldCBjb3JyZXNwb25kaW5nQ2FsY3VsYXRpb25EYXRhcyA9IHRoaXMuZ2V0Q2FsY3VsYXRpb25EYXRhc0NvcnJlc3BvbmRpbmdUb1NpZ25hbE5hbWUoc2VyaWUpO1xyXG4gICAgICAgIGlmKGFyZ3MuYWN0aW9uID09IFNlcmllQWN0aW9uLmRhdGFQb2ludHNDaGFuZ2VkKXtcclxuICAgICAgICAgICAgY29ycmVzcG9uZGluZ0NhbGN1bGF0aW9uRGF0YXMuZm9yRWFjaCgoY2FsY0RhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgIGNhbGNEYXRhLmNhbGN1bGF0aW9uRGF0YS5zZXREYXRhKDxhbnk+YXJncy5kYXRhKTsgLy8gU2V0cyB0aGUgYWN0dWFsIGRhdGEgcG9pbnRzIHRvIHRoZSBjYWxjdWxhdGlvbiBpbnB1dCBkYXRhXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoYXJncy5hY3Rpb24gPT0gU2VyaWVBY3Rpb24ucmVuYW1lKXtcclxuICAgICAgICAgICAgY29ycmVzcG9uZGluZ0NhbGN1bGF0aW9uRGF0YXMuZm9yRWFjaCgoY2FsY0RhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgIGNhbGNEYXRhLnZhbHVlID0gc2VyaWUubmFtZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0Q2FsY3VsYXRpb25EYXRhc0NvcnJlc3BvbmRpbmdUb1NpZ25hbE5hbWUoc2VyaWU6IEJhc2VTZXJpZXMpOiBBcnJheTxhbnk+e1xyXG4gICAgICAgIGxldCBjYWxjRGF0YXMgPSBuZXcgQXJyYXk8YW55PigpO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpIDwgdGhpcy5jaGlsZHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgc2lnbmFsQ2FsY3VsYXRpb25EYXRhID0gKHRoaXMuY2hpbGRzW2ldKTtcclxuICAgICAgICAgICAgaWYoc2lnbmFsQ2FsY3VsYXRpb25EYXRhLnNlcmllID09IHNlcmllKXtcclxuICAgICAgICAgICAgICAgIGNhbGNEYXRhcy5wdXNoKHRoaXMuY2hpbGRzW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2FsY0RhdGFzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsY3VsYXRlcyB3aXRoIHRoZSBjdXJyZW50IGlucHV0IGRhdGEgYW5kIHVwZGF0ZXMgdGhlIG91dHB1dGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlXHJcbiAgICAgKi9cclxuICAgIGNhbGN1bGF0ZSgpe1xyXG4gICAgICAgIC8vIENhbGN1bGF0ZSB3aXRoIGFjdHVhbCBpbnB1dCBkYXRhXHJcbiAgICAgICAgbGV0IGlucHV0RGF0YSA9IG5ldyBBcnJheTxUQ2FsY3VsYXRpb25EYXRhPigpO1xyXG4gICAgICAgIGxldCBjYWxjdWxhdGlvbk91dHB1dERhdGEgPSBuZXcgQXJyYXk8VENhbGN1bGF0aW9uRGF0YT4oKTtcclxuICAgICAgICBsZXQgaW5wdXRDYWxjdWxhdGlvbkRhdGE7XHJcbiAgICAgICAgbGV0IGFjdHVhbGx5VXNlZElucHV0RGF0YSA9IGlucHV0RGF0YTtcclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLl9jYWxjdWxhdG9yICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIFN0YXJ0IGNhbGN1bGF0aW9uIHdpdGggYWN0dWFsIGlucHV0IGRhdGFcclxuICAgICAgICAgICAgaW5wdXRDYWxjdWxhdGlvbkRhdGEgPSAgdGhpcy5nZXRJbnB1dENhbGN1bGF0aW9uRGF0YSgpO1xyXG4gICAgICAgICAgICBpbnB1dENhbGN1bGF0aW9uRGF0YS5mb3JFYWNoKGlucHV0Q2FsY3VsYXRpb25EYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIGlucHV0RGF0YS5wdXNoKGlucHV0Q2FsY3VsYXRpb25EYXRhLmNhbGN1bGF0aW9uRGF0YSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY2FsY3VsYXRpb25PdXRwdXREYXRhID0gdGhpcy5fY2FsY3VsYXRvci5jYWxjdWxhdGUoaW5wdXREYXRhKTtcclxuICAgICAgICAgICAgYWN0dWFsbHlVc2VkSW5wdXREYXRhID0gdGhpcy5fY2FsY3VsYXRvci5nZXRBY3R1YWxJbnB1dERhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gVXBkYXRlIG91dHB1dGRhdGEgVE9ETzogbXVsdGkgb3V0cHV0ICxub3Qgb25seSB0aGUgZmlyc3Qgb25lXHJcbiAgICAgICAgbGV0IG91dHB1dERhdGEgPSB0aGlzLmdldEZpcnN0T3V0cHV0Q2FsY3VsYXRpb25EYXRhKCk7XHJcbiAgICAgICAgaWYob3V0cHV0RGF0YSAhPSB1bmRlZmluZWQgJiYgb3V0cHV0RGF0YS5zZXJpZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBpZih0aGlzLl9jYWxjdWxhdG9yICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgZXJyb3JzID0gdGhpcy5fY2FsY3VsYXRvci5nZXRFcnJvcnMoKTtcclxuICAgICAgICAgICAgICAgIGlmKGVycm9ycy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICAgICAgICBvdXRwdXREYXRhLnNlcmllLmVycm9ySW5mbyA9IGVycm9ycztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgb3V0cHV0RGF0YS5zZXJpZS51cGRhdGVDYWxjdWxhdGlvbkRhdGFJbmZvKGFjdHVhbGx5VXNlZElucHV0RGF0YSwgdGhpcy52YWx1ZSwgdGhpcy5nZXRJbnB1dENhbGN1bGF0aW9uRGF0YSgpKVxyXG4gICAgICAgICAgICBpZihjYWxjdWxhdGlvbk91dHB1dERhdGFbMF0gaW5zdGFuY2VvZiBDYWxjdWxhdGlvbkRhdGFQb2ludHMpe1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0RGF0YS5zZXJpZS51cGRhdGVQb2ludHMoKGNhbGN1bGF0aW9uT3V0cHV0RGF0YVswXSBhcyBDYWxjdWxhdGlvbkRhdGFQb2ludHMpLmdldERhdGEoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJOZXcgY2FsY3VsYXRpb24gb3V0cHV0IGRhdGEgYXZhaWxhYmxlLiBOZXcgaW1wbGVtZW50YXRpb24gbmVlZGVkISBPbmx5IERhdGFQb2ludHMgc3VwcG9ydGVkIGN1cnJlbnRseS5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGFsbCBjYWxjdWxhdGlvbiBpbnB1dCBkYXRhc1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGE+fVxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdG9yVHlwZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0SW5wdXRDYWxjdWxhdGlvbkRhdGEoKTogQXJyYXk8U2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhPntcclxuICAgICAgICBsZXQgaW5wdXREYXRhID0gbmV3IEFycmF5PFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YT4oKTtcclxuICAgICAgICBsZXQgY2FsY3VsYXRpb25UeXBlQ2hpbGRzID0gdGhpcy5jaGlsZHM7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGkgPCBjYWxjdWxhdGlvblR5cGVDaGlsZHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgc2lnbmFsQ2FsY3VsYXRpb25EYXRhID0gY2FsY3VsYXRpb25UeXBlQ2hpbGRzW2ldO1xyXG4gICAgICAgICAgICBpZihzaWduYWxDYWxjdWxhdGlvbkRhdGEgaW5zdGFuY2VvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGEpe1xyXG4gICAgICAgICAgICAgICAgaW5wdXREYXRhLnB1c2goc2lnbmFsQ2FsY3VsYXRpb25EYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaW5wdXREYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZmlyc3QgY2FsY3VsYXRpb24gb3V0cHV0IGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7KFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbk91dHB1dERhdGF8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRvclR5cGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEZpcnN0T3V0cHV0Q2FsY3VsYXRpb25EYXRhKCk6IFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbk91dHB1dERhdGF8dW5kZWZpbmVke1xyXG4gICAgICAgIGxldCBjYWxjdWxhdGlvblR5cGVDaGlsZHMgPSB0aGlzLmNoaWxkcztcclxuICAgICAgICBmb3IobGV0IGk9MDsgaSA8IGNhbGN1bGF0aW9uVHlwZUNoaWxkcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBjYWxjdWxhdGlvbkRhdGEgPSBjYWxjdWxhdGlvblR5cGVDaGlsZHNbaV07XHJcbiAgICAgICAgICAgIGlmKGNhbGN1bGF0aW9uRGF0YSBpbnN0YW5jZW9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbk91dHB1dERhdGEpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhbGN1bGF0aW9uRGF0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhIHNlcmllcyBmb3IgdGhlIGdpdmVuIG5hbWUgZnJvbSB0aGlzIGNhbGN1bGF0b3IgdHlwZSBub2RlIChlLmcuIG91dHB1dCBzZXJpZXMgb2YgY2FsY3VsYXRpb25zKVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbc2VyaWVOYW1lPVwiXCJdIGlmIHNlcmllTmFtZSA9IFwiXCIgYWxsIHNlcmllcyB3aWwgYmUgcmV0dXJuZWRcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxJU2VyaWVOb2RlPn1cclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRvclR5cGVcclxuICAgICAqL1xyXG4gICAgZ2V0U2VyaWVOb2RlcyhzZXJpZU5hbWU6IHN0cmluZyA9IFwiXCIpOiBBcnJheTxJU2VyaWVOb2RlPntcclxuICAgICAgICBsZXQgc2VyaWVOb2RlcyA9IG5ldyBBcnJheTxJU2VyaWVOb2RlPigpO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpIDwgdGhpcy5jaGlsZHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkc1tpXTtcclxuICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25PdXRwdXREYXRhKXsgLy8gSXMgb25seSBhIHNpZ25hbCBpbiBjYXNlIG9mIG91dHB1dGRhdGFcclxuICAgICAgICAgICAgICAgIGlmKCBzZXJpZU5hbWUgPT0gXCJcIiB8fCBjaGlsZC52YWx1ZSA9PSBzZXJpZU5hbWUpe1xyXG4gICAgICAgICAgICAgICAgICAgIHNlcmllTm9kZXMucHVzaChjaGlsZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihjaGlsZCBpbnN0YW5jZW9mIFNlcmllQ29udGFpbmVyKXtcclxuICAgICAgICAgICAgICAgIHNlcmllTm9kZXMgPSBzZXJpZU5vZGVzLmNvbmNhdChjaGlsZC5nZXRTZXJpZU5vZGVzKHNlcmllTmFtZSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZXJpZU5vZGVzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25PdXRwdXREYXRhVmFsdWVDaGFuZ2VkKHNlbmRlciwgYXJncyl7XHJcbiAgICAgICAgbGV0IHNlcmllR3JvdXAgPSB0aGlzLmdldFNlcmllR3JvdXAoKTtcclxuICAgICAgICBpZihzZXJpZUdyb3VwICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGxldCBzZXJpZU5vZGUgPSB0aGlzLmdldFNlcmllR3JvdXAoKSEuZ2V0U2VyaWVOb2RlcyhhcmdzLmRhdGEpO1xyXG4gICAgICAgICAgICBpZihzZXJpZU5vZGUubGVuZ3RoID4gMSl7IC8vIFNpZ25hbCB3aXRoIGdpdmVuIG5hbWUgYWxyZWFkeSBhdmFpbGFibGUgPT4gc2V0IHNpZ25hbCBuYW1lIHRvIHRoZSB1c2VkIG5hbWUgYmVmb3JlXHJcbiAgICAgICAgICAgICAgICBsZXQgc2lnbmFsQ2FsY3VsYXRpb25EYXRhOiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25PdXRwdXREYXRhID0gc2VuZGVyO1xyXG4gICAgICAgICAgICAgICAgc2lnbmFsQ2FsY3VsYXRpb25EYXRhLnZhbHVlID0gYXJncy5vbGREYXRhO1xyXG4gICAgICAgICAgICAgICAgLy9sZXQgY2FsY3VsYXRpb25EYXRhID0gc2lnbmFsQ2FsY3VsYXRpb25EYXRhLmNhbGN1bGF0aW9uRGF0YVxyXG4gICAgICAgICAgICAgICAgLy9jYWxjdWxhdGlvbkRhdGEudmFsdWUgPSBhcmdzLm9sZERhdGE7IFxyXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogU2hvdyBNZXNzYWdlQm94XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5vbkRhdGFDaGFuZ2VkKHNlbmRlciwgYXJncyk7XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG4iXX0=