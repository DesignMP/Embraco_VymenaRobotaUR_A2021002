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
define(["require", "exports", "../calculationDataNumberOrPoints", "../calculationDataPoints", "../calculationDataDisplayInfo", "./calculatorBase", "../calculationDataString", "../../../../libs/math/mathjs", "../mathjsWrapper", "../mathjsHtmlConverter", "./calculatorHelper"], function (require, exports, calculationDataNumberOrPoints_1, calculationDataPoints_1, calculationDataDisplayInfo_1, calculatorBase_1, calculationDataString_1, math, mathjsWrapper_1, mathjsHtmlConverter_1, calculatorHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StringMathjsCalculator = /** @class */ (function (_super) {
        __extends(StringMathjsCalculator, _super);
        function StringMathjsCalculator() {
            var _this = _super.call(this, "stringmathjs", "Math expression", "Calculates separated values and time as mathematical expression") || this;
            _this.inputStringYId = "CalculatingValues";
            _this.inputStringXId = "CalculatingTime";
            _this.inputSignalAId = "InputSignalOrNumberA";
            _this.inputSignalBId = "InputSignalOrNumberB";
            _this.inputSignalCId = "InputSignalOrNumberC";
            _this.inputSignalDId = "InputSignalOrNumberD";
            _this.inputSignalEId = "InputSignalOrNumberE";
            _this.inputStringYName = "Calculating values";
            _this.inputStringXName = "Calculating time";
            _this.inputSignalAName = "Input signal or number a";
            _this.inputSignalBName = "Input signal or number b";
            _this.inputSignalCName = "Input signal or number c";
            _this.inputSignalDName = "Input signal or number d";
            _this.inputSignalEName = "Input signal or number e";
            _this.outputId = "OutputSignal";
            _this.outputName = "Output signal";
            _this.outputValue = "math expression";
            _this.inputStringDescripion = "Mathematical expression expected";
            _this._mathJSLib = mathjsWrapper_1.MathjsWrapper.getInstance();
            return _this;
        }
        /**
         * Returns the default input data for this calculator
         *
         * @returns {Array<TCalculationData>}
         * @memberof StringMathjsCalculator
         */
        StringMathjsCalculator.prototype.getDefaultInputData = function () {
            var inputData = _super.prototype.getDefaultInputData.call(this);
            var stringInputData1 = new calculationDataString_1.CalculationDataString(this.inputStringYId, this.inputStringYName, this.inputStringDescripion, "Calculates mathematical formulas from the math.js library for the y values", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, false));
            stringInputData1.valueConverter = new mathjsHtmlConverter_1.MathjsHtmlConverter(this.inputStringDescripion); //converter to display value as html
            inputData.push(stringInputData1);
            var stringInputData2 = new calculationDataString_1.CalculationDataString(this.inputStringXId, this.inputStringXName, this.inputStringDescripion, "Calculates mathematical formulas from the math.js library for the x values", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, false));
            stringInputData2.valueConverter = new mathjsHtmlConverter_1.MathjsHtmlConverter(this.inputStringDescripion); //converter to display value as html
            inputData.push(stringInputData2);
            inputData.push(new calculationDataNumberOrPoints_1.CalculationDataNumberOrPoints(this.inputSignalAId, this.inputSignalAName, 0, "Input is a signal: a.value, a.time and a.sampleTime can be used for the calculation; Input is a number: a can be used for the calculation", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            inputData.push(new calculationDataNumberOrPoints_1.CalculationDataNumberOrPoints(this.inputSignalBId, this.inputSignalBName, 0, "Input is a Signal: b.value, b.time and b.sampleTime can be used for the calculation; Input is a number: b can be used for the calculation", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            inputData.push(new calculationDataNumberOrPoints_1.CalculationDataNumberOrPoints(this.inputSignalCId, this.inputSignalCName, 0, "Input is a Signal: c.value, c.time and c.sampleTime can be used for the calculation; Input is a number: c can be used for the calculation", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            inputData.push(new calculationDataNumberOrPoints_1.CalculationDataNumberOrPoints(this.inputSignalDId, this.inputSignalDName, 0, "Input is a Signal: d.value, d.time and d.sampleTime can be used for the calculation; Input is a number: d can be used for the calculation", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            inputData.push(new calculationDataNumberOrPoints_1.CalculationDataNumberOrPoints(this.inputSignalEId, this.inputSignalEName, 0, "Input is a Signal: e.value, e.time and e.sampleTime can be used for the calculation; Input is a number: e can be used for the calculation", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            return inputData;
        };
        /**
         * Returns the default output data for this calculator
         *
         * @returns {Array<CalculationDataPoints>}
         * @memberof stringMathjsCalculator
         */
        StringMathjsCalculator.prototype.getDefaultOutputData = function () {
            var outputData = new Array();
            // add output params with default displaynames
            outputData.push(new calculationDataPoints_1.CalculationDataPoints(this.outputId, this.outputName, this.outputValue, new Array()));
            return outputData;
        };
        StringMathjsCalculator.prototype.verifyCalculationInputData = function () {
            _super.prototype.verifyCalculationInputData.call(this);
            //retrieve calculation input data
            var calculationInputDataContainer = this.getCalculationInputDataContainer();
            var stringDataY = calculationInputDataContainer[0];
            var stringDataX = calculationInputDataContainer[1];
            if (stringDataY == undefined || !calculatorHelper_1.CalculatorHelper.calculationInputDataIsString(stringDataY.data)) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.MissingOrInvalidInput, [this.inputStringYName]);
            }
            if (stringDataX == undefined || !calculatorHelper_1.CalculatorHelper.calculationInputDataIsString(stringDataX.data)) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.MissingOrInvalidInput, [this.inputStringXName]);
            }
            for (var i = 2; i < calculationInputDataContainer.length; i++) {
                var calculationInputData = calculationInputDataContainer[i];
                if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsString(calculationInputData.data)) {
                    this.addErrorByType(calculatorBase_1.ErrorMessageType.MissingOrInvalidInput, [calculationInputData.name]);
                }
            }
            if (this.hasErrors()) {
                return;
            }
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsString(stringDataY.data) && stringDataY.data === this.inputStringDescripion) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.MissingOrInvalidInput, [this.inputStringYName]);
            }
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsString(stringDataX.data) && stringDataX.data === this.inputStringDescripion) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.MissingOrInvalidInput, [this.inputStringXName]);
            }
        };
        StringMathjsCalculator.prototype.executeAlgorithm = function () {
            _super.prototype.executeAlgorithm.call(this);
            //retrieve calculation input data and initialize result
            var calculationInputData = this.getCalculationInputDataContainer();
            var result = new Array();
            var stringDataY = calculationInputData[0];
            var stringDataX = calculationInputData[1];
            var signalData = new Array();
            for (var i = 2; i < calculationInputData.length; i++) {
                var data = calculationInputData[i].data;
                if (!calculatorHelper_1.CalculatorHelper.calculationInputDataIsString(data)) {
                    signalData.push(data);
                }
            }
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsString(stringDataY.data) && calculatorHelper_1.CalculatorHelper.calculationInputDataIsString(stringDataX.data)) {
                result = this.calculateString(stringDataY.data, stringDataX.data, signalData);
            }
            //add the result of the calculation to the calculationOutpuContainer
            this.addCalculationOutputData({
                data: result,
                value: this.outputValue,
                name: this.outputName,
                id: this.outputId
            });
        };
        /**
         * Calculate mathematical expressions with the given data
         *
         * @private
         * @param {string} stringDataY
         * @param {string} stringDataX
         * @param {Array<IPoint[] | number>} signalData
         * @returns {Array<IPoint>}
         * @memberof StringMathjsCalculator
         */
        StringMathjsCalculator.prototype.calculateString = function (stringDataY, stringDataX, signalData) {
            var output = new Array();
            //Receive the result of the calculation
            var resultX = this.evaluateString(stringDataX, signalData);
            var resultY = this.evaluateString(stringDataY, signalData);
            if (!this.hasErrors()) {
                output = calculatorHelper_1.CalculatorHelper.fromTwoNumberArrayToIPointArray(resultX, resultY);
                if (output.length === 0) {
                    this.addErrorByType(calculatorBase_1.ErrorMessageType.ArraysHaveDifferentLength, ["Calculating values and calculating time"]);
                }
            }
            return output;
        };
        StringMathjsCalculator.prototype.verifyCalculationOutputData = function () {
            var _this = this;
            _super.prototype.verifyCalculationOutputData.call(this);
            var calculationOutputDataContainer = this.getCalculationOutputDataContainer();
            calculationOutputDataContainer.forEach(function (calculationOutputData) {
                if (!calculatorHelper_1.CalculatorHelper.isStrictlyMonotonicallyIncreasingInTime(calculationOutputData.data)) {
                    _this.addErrorByType(calculatorBase_1.ErrorMessageType.NotStrictlyMonotonicallyIncreasingInTime, [calculationOutputData.name]);
                }
            });
        };
        /**
         * Calculate the string value with mathjs lib and match to the inputsignal or constant
         * @private
         * @param {string} str
         * @param {Array<IPoint[] | number>} signalData
         * @returns {number | Array<number>}
         * @memberof StringMathjsCalculator
         */
        StringMathjsCalculator.prototype.evaluateString = function (str, signalData) {
            var arrResult = new Array();
            try {
                var code = this._mathJSLib.limitedParse(str);
                var scope = {
                    a: this.getScopeObjectOrValue(signalData[0]),
                    b: this.getScopeObjectOrValue(signalData[1]),
                    c: this.getScopeObjectOrValue(signalData[2]),
                    d: this.getScopeObjectOrValue(signalData[3]),
                    e: this.getScopeObjectOrValue(signalData[4])
                };
                var compiledCode = code.compile();
                var result = compiledCode.evaluate(scope);
                arrResult = this.convertMathjsResultTypeToArray(result);
            }
            catch (error) {
                this.addError("Error in expression: " + str + "!\n" + error.name + ": " + error.message + "!");
            }
            return arrResult;
        };
        /**
        * Check the datatype of the evaluated mathjs result and convert it to an Number Array
        * Throws errors if they are not valid
        * @private
        * @param {any} result
        * @returns {Array<number>}
        * @memberof StringMathjsCalculator
        */
        StringMathjsCalculator.prototype.convertMathjsResultTypeToArray = function (result) {
            //get the matrix or array value from a multiline expression
            if (math.typeOf(result) == 'ResultSet') {
                if (!result.hasOwnProperty('entries')) {
                    this.mathjsResultTypeError('Result is a invalid ResultSet', 'The result of the expression is invalid');
                }
                result = result.entries[0];
            }
            //get the array from the matrix
            if (math.typeOf(result) == 'Matrix') {
                if (result._size.length != 1) {
                    this.mathjsResultTypeError('Result is a multidimensional matrix', 'The result of the expression is not allowed to be a multidimensional matrix');
                }
                result = result._data;
            }
            this.checkForInvalidDataType(result);
            return result;
        };
        /**
        * Check if the datatype of the evaluated mathjs result is valid
        * Throws errors if they are not valid
        * @private
        * @param {any} result
        * @memberof StringMathjsCalculator
        */
        StringMathjsCalculator.prototype.checkForInvalidDataType = function (result) {
            switch (math.typeOf(result)) {
                case 'undefined': this.mathjsResultTypeError('Result is undefined', 'The result of the expression is not allowed to be undefined');
                case 'number': this.mathjsResultTypeError('Result is a number', 'The result of the expression is not allowed to be a number');
                case 'boolean': this.mathjsResultTypeError('Result is a boolean', 'The result of the expression is not allowed to be a single boolean');
                case 'null': this.mathjsResultTypeError('Result is null', 'The result of the expression is not allowed to be null');
                case 'Array':
                    if (calculatorHelper_1.CalculatorHelper.arrayHasNaNOrInvinityValues(result)) {
                        this.mathjsResultTypeError('Result is an array with NaN or invinity values', 'The result of the expression is not allowed to be an array with NaN or invinity values');
                    }
                    break;
                default: this.mathjsResultTypeError('Result is invalid', 'The result of the expression is invalid');
            }
        };
        /**
         * Returns the suitable object for the scope
         * @private
         * @param {IPoint[] | number} signalData
         * @returns {any}
         * @memberof StringMathjsCalculator
         */
        StringMathjsCalculator.prototype.getScopeObjectOrValue = function (signalData) {
            //Scope for a number
            if (signalData != undefined && !Array.isArray(signalData)) {
                return signalData;
            }
            //Scope for a signal
            else if (signalData != undefined && Array.isArray(signalData)) {
                var splittedSignal = calculatorHelper_1.CalculatorHelper.fromIPointArrayToNumberArray(signalData);
                return {
                    value: splittedSignal.yArr,
                    time: splittedSignal.xArr,
                    sampleTime: calculatorHelper_1.CalculatorHelper.estimateSampleTime(signalData)
                };
            }
        };
        /**
         * method for generalize throw messages for invalid calculation results
         *
         * @private
         * @param {string} errorName
         * @param {string} errorMessage
         * @returns {never}
         * @memberof StringMathjsCalculator
         */
        StringMathjsCalculator.prototype.mathjsResultTypeError = function (errorName, errorMessage) {
            throw { name: errorName, data: errorMessage };
        };
        return StringMathjsCalculator;
    }(calculatorBase_1.CalculatorBase));
    exports.StringMathjsCalculator = StringMathjsCalculator;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nTWF0aGpzQ2FsY3VsYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRvcnMvc3RyaW5nTWF0aGpzQ2FsY3VsYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBYUE7UUFBNEMsMENBQWM7UUEwQnREO1lBQUEsWUFDSSxrQkFBTSxjQUFjLEVBQUUsaUJBQWlCLEVBQUUsaUVBQWlFLENBQUMsU0FFOUc7WUEzQk8sb0JBQWMsR0FBVyxtQkFBbUIsQ0FBQztZQUM3QyxvQkFBYyxHQUFXLGlCQUFpQixDQUFDO1lBQzNDLG9CQUFjLEdBQVcsc0JBQXNCLENBQUM7WUFDaEQsb0JBQWMsR0FBVyxzQkFBc0IsQ0FBQztZQUNoRCxvQkFBYyxHQUFXLHNCQUFzQixDQUFDO1lBQ2hELG9CQUFjLEdBQVcsc0JBQXNCLENBQUM7WUFDaEQsb0JBQWMsR0FBVyxzQkFBc0IsQ0FBQztZQUNoRCxzQkFBZ0IsR0FBVyxvQkFBb0IsQ0FBQztZQUNoRCxzQkFBZ0IsR0FBVyxrQkFBa0IsQ0FBQztZQUM5QyxzQkFBZ0IsR0FBVywwQkFBMEIsQ0FBQztZQUN0RCxzQkFBZ0IsR0FBVywwQkFBMEIsQ0FBQztZQUN0RCxzQkFBZ0IsR0FBVywwQkFBMEIsQ0FBQztZQUN0RCxzQkFBZ0IsR0FBVywwQkFBMEIsQ0FBQztZQUN0RCxzQkFBZ0IsR0FBVywwQkFBMEIsQ0FBQztZQUV0RCxjQUFRLEdBQVcsY0FBYyxDQUFDO1lBQ2xDLGdCQUFVLEdBQUcsZUFBZSxDQUFDO1lBQzdCLGlCQUFXLEdBQUcsaUJBQWlCLENBQUM7WUFHaEMsMkJBQXFCLEdBQVcsa0NBQWtDLENBQUM7WUFNdkUsS0FBSSxDQUFDLFVBQVUsR0FBRyw2QkFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDOztRQUNsRCxDQUFDO1FBQ0Q7Ozs7O1dBS0c7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VUFBVSxDQUFDLENBQUM7Z0JBQy9FLE9BQU87b0JBQ0gsS0FBSyxFQUFFLGNBQWMsQ0FBQyxJQUFJO29CQUMxQixJQUFJLEVBQUUsY0FBYyxDQUFDLElBQUk7b0JBQ3pCLFVBQVUsRUFBRSxtQ0FBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUM7aUJBQzlELENBQUM7YUFDTDtRQUNMLENBQUM7UUFHRDs7Ozs7Ozs7V0FRRztRQUNLLHNEQUFxQixHQUE3QixVQUE4QixTQUFpQixFQUFFLFlBQW9CO1lBQ2pFLE1BQU0sRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUMsQ0FBQztRQUNoRCxDQUFDO1FBQ0wsNkJBQUM7SUFBRCxDQUFDLEFBelNELENBQTRDLCtCQUFjLEdBeVN6RDtJQXpTWSx3REFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ2FsY3VsYXRvciB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2NhbGN1bGF0b3JJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHMgfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHNcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhUG9pbnRzIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YVBvaW50c1wiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mbyB9IGZyb20gXCIuLi9jYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mb1wiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdG9yQmFzZSwgRXJyb3JNZXNzYWdlVHlwZSB9IGZyb20gXCIuL2NhbGN1bGF0b3JCYXNlXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YVN0cmluZyB9IGZyb20gXCIuLi9jYWxjdWxhdGlvbkRhdGFTdHJpbmdcIjtcclxuaW1wb3J0ICogYXMgbWF0aCBmcm9tICBcIi4uLy4uLy4uLy4uL2xpYnMvbWF0aC9tYXRoanNcIlxyXG5pbXBvcnQgeyBNYXRoanNXcmFwcGVyIH0gZnJvbSBcIi4uL21hdGhqc1dyYXBwZXJcIjtcclxuaW1wb3J0IHsgTWF0aGpzSHRtbENvbnZlcnRlciB9IGZyb20gXCIuLi9tYXRoanNIdG1sQ29udmVydGVyXCI7XHJcbmltcG9ydCB7IFRDYWxjdWxhdGlvbkRhdGEgfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0b3JIZWxwZXIgfSBmcm9tIFwiLi9jYWxjdWxhdG9ySGVscGVyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU3RyaW5nTWF0aGpzQ2FsY3VsYXRvciBleHRlbmRzIENhbGN1bGF0b3JCYXNlIGltcGxlbWVudHMgSUNhbGN1bGF0b3J7XHJcbiAgIFxyXG4gICAgcHJpdmF0ZSBpbnB1dFN0cmluZ1lJZDogc3RyaW5nID0gXCJDYWxjdWxhdGluZ1ZhbHVlc1wiO1xyXG4gICAgcHJpdmF0ZSBpbnB1dFN0cmluZ1hJZDogc3RyaW5nID0gXCJDYWxjdWxhdGluZ1RpbWVcIjtcclxuICAgIHByaXZhdGUgaW5wdXRTaWduYWxBSWQ6IHN0cmluZyA9IFwiSW5wdXRTaWduYWxPck51bWJlckFcIjtcclxuICAgIHByaXZhdGUgaW5wdXRTaWduYWxCSWQ6IHN0cmluZyA9IFwiSW5wdXRTaWduYWxPck51bWJlckJcIjtcclxuICAgIHByaXZhdGUgaW5wdXRTaWduYWxDSWQ6IHN0cmluZyA9IFwiSW5wdXRTaWduYWxPck51bWJlckNcIjtcclxuICAgIHByaXZhdGUgaW5wdXRTaWduYWxESWQ6IHN0cmluZyA9IFwiSW5wdXRTaWduYWxPck51bWJlckRcIjtcclxuICAgIHByaXZhdGUgaW5wdXRTaWduYWxFSWQ6IHN0cmluZyA9IFwiSW5wdXRTaWduYWxPck51bWJlckVcIjtcclxuICAgIHByaXZhdGUgaW5wdXRTdHJpbmdZTmFtZTogc3RyaW5nID0gXCJDYWxjdWxhdGluZyB2YWx1ZXNcIjtcclxuICAgIHByaXZhdGUgaW5wdXRTdHJpbmdYTmFtZTogc3RyaW5nID0gXCJDYWxjdWxhdGluZyB0aW1lXCI7XHJcbiAgICBwcml2YXRlIGlucHV0U2lnbmFsQU5hbWU6IHN0cmluZyA9IFwiSW5wdXQgc2lnbmFsIG9yIG51bWJlciBhXCI7XHJcbiAgICBwcml2YXRlIGlucHV0U2lnbmFsQk5hbWU6IHN0cmluZyA9IFwiSW5wdXQgc2lnbmFsIG9yIG51bWJlciBiXCI7XHJcbiAgICBwcml2YXRlIGlucHV0U2lnbmFsQ05hbWU6IHN0cmluZyA9IFwiSW5wdXQgc2lnbmFsIG9yIG51bWJlciBjXCI7XHJcbiAgICBwcml2YXRlIGlucHV0U2lnbmFsRE5hbWU6IHN0cmluZyA9IFwiSW5wdXQgc2lnbmFsIG9yIG51bWJlciBkXCI7XHJcbiAgICBwcml2YXRlIGlucHV0U2lnbmFsRU5hbWU6IHN0cmluZyA9IFwiSW5wdXQgc2lnbmFsIG9yIG51bWJlciBlXCI7XHJcblxyXG4gICAgcHJpdmF0ZSBvdXRwdXRJZDogc3RyaW5nID0gXCJPdXRwdXRTaWduYWxcIjtcclxuICAgIHByaXZhdGUgb3V0cHV0TmFtZSA9IFwiT3V0cHV0IHNpZ25hbFwiO1xyXG4gICAgcHJpdmF0ZSBvdXRwdXRWYWx1ZSA9IFwibWF0aCBleHByZXNzaW9uXCI7XHJcbiAgICBcclxuXHJcbiAgICBwcml2YXRlIGlucHV0U3RyaW5nRGVzY3JpcGlvbjogc3RyaW5nID0gXCJNYXRoZW1hdGljYWwgZXhwcmVzc2lvbiBleHBlY3RlZFwiO1xyXG4gICAgXHJcbiAgICBwcml2YXRlIF9tYXRoSlNMaWI6IE1hdGhqc1dyYXBwZXI7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFwic3RyaW5nbWF0aGpzXCIsIFwiTWF0aCBleHByZXNzaW9uXCIsIFwiQ2FsY3VsYXRlcyBzZXBhcmF0ZWQgdmFsdWVzIGFuZCB0aW1lIGFzIG1hdGhlbWF0aWNhbCBleHByZXNzaW9uXCIpO1xyXG4gICAgICAgIHRoaXMuX21hdGhKU0xpYiA9IE1hdGhqc1dyYXBwZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBpbnB1dCBkYXRhIGZvciB0aGlzIGNhbGN1bGF0b3IgXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0FycmF5PFRDYWxjdWxhdGlvbkRhdGE+fVxyXG4gICAgICogQG1lbWJlcm9mIFN0cmluZ01hdGhqc0NhbGN1bGF0b3JcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldERlZmF1bHRJbnB1dERhdGEoKTogQXJyYXk8VENhbGN1bGF0aW9uRGF0YT57XHJcbiAgICAgICAgbGV0IGlucHV0RGF0YTogQXJyYXk8VENhbGN1bGF0aW9uRGF0YT4gPSBzdXBlci5nZXREZWZhdWx0SW5wdXREYXRhKCk7XHJcbiAgICAgICAgICBcclxuICAgICAgICBsZXQgc3RyaW5nSW5wdXREYXRhMSA9IG5ldyBDYWxjdWxhdGlvbkRhdGFTdHJpbmcodGhpcy5pbnB1dFN0cmluZ1lJZCwgdGhpcy5pbnB1dFN0cmluZ1lOYW1lLCB0aGlzLmlucHV0U3RyaW5nRGVzY3JpcGlvbiwgXCJDYWxjdWxhdGVzIG1hdGhlbWF0aWNhbCBmb3JtdWxhcyBmcm9tIHRoZSBtYXRoLmpzIGxpYnJhcnkgZm9yIHRoZSB5IHZhbHVlc1wiLCBuZXcgQ2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm8oZmFsc2UsIGZhbHNlKSk7XHJcbiAgICAgICAgc3RyaW5nSW5wdXREYXRhMS52YWx1ZUNvbnZlcnRlciA9IG5ldyBNYXRoanNIdG1sQ29udmVydGVyKHRoaXMuaW5wdXRTdHJpbmdEZXNjcmlwaW9uKTsgIC8vY29udmVydGVyIHRvIGRpc3BsYXkgdmFsdWUgYXMgaHRtbFxyXG4gICAgICAgIGlucHV0RGF0YS5wdXNoKHN0cmluZ0lucHV0RGF0YTEpO1xyXG4gICAgICAgIGxldCBzdHJpbmdJbnB1dERhdGEyID0gbmV3IENhbGN1bGF0aW9uRGF0YVN0cmluZyh0aGlzLmlucHV0U3RyaW5nWElkLCB0aGlzLmlucHV0U3RyaW5nWE5hbWUsIHRoaXMuaW5wdXRTdHJpbmdEZXNjcmlwaW9uLCBcIkNhbGN1bGF0ZXMgbWF0aGVtYXRpY2FsIGZvcm11bGFzIGZyb20gdGhlIG1hdGguanMgbGlicmFyeSBmb3IgdGhlIHggdmFsdWVzXCIsIG5ldyBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mbyhmYWxzZSwgZmFsc2UpKTtcclxuICAgICAgICBzdHJpbmdJbnB1dERhdGEyLnZhbHVlQ29udmVydGVyID0gbmV3IE1hdGhqc0h0bWxDb252ZXJ0ZXIodGhpcy5pbnB1dFN0cmluZ0Rlc2NyaXBpb24pOyAgLy9jb252ZXJ0ZXIgdG8gZGlzcGxheSB2YWx1ZSBhcyBodG1sXHJcbiAgICAgICAgaW5wdXREYXRhLnB1c2goc3RyaW5nSW5wdXREYXRhMik7XHJcblxyXG4gICAgICAgIGlucHV0RGF0YS5wdXNoKG5ldyBDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cyh0aGlzLmlucHV0U2lnbmFsQUlkLCB0aGlzLmlucHV0U2lnbmFsQU5hbWUsIDAsIFwiSW5wdXQgaXMgYSBzaWduYWw6IGEudmFsdWUsIGEudGltZSBhbmQgYS5zYW1wbGVUaW1lIGNhbiBiZSB1c2VkIGZvciB0aGUgY2FsY3VsYXRpb247IElucHV0IGlzIGEgbnVtYmVyOiBhIGNhbiBiZSB1c2VkIGZvciB0aGUgY2FsY3VsYXRpb25cIiwgbmV3IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvKGZhbHNlLCB0cnVlKSkpO1xyXG4gICAgICAgIGlucHV0RGF0YS5wdXNoKG5ldyBDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cyh0aGlzLmlucHV0U2lnbmFsQklkLCB0aGlzLmlucHV0U2lnbmFsQk5hbWUsIDAsIFwiSW5wdXQgaXMgYSBTaWduYWw6IGIudmFsdWUsIGIudGltZSBhbmQgYi5zYW1wbGVUaW1lIGNhbiBiZSB1c2VkIGZvciB0aGUgY2FsY3VsYXRpb247IElucHV0IGlzIGEgbnVtYmVyOiBiIGNhbiBiZSB1c2VkIGZvciB0aGUgY2FsY3VsYXRpb25cIiwgbmV3IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvKGZhbHNlLCB0cnVlKSkpO1xyXG4gICAgICAgIGlucHV0RGF0YS5wdXNoKG5ldyBDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cyh0aGlzLmlucHV0U2lnbmFsQ0lkLCB0aGlzLmlucHV0U2lnbmFsQ05hbWUsIDAsIFwiSW5wdXQgaXMgYSBTaWduYWw6IGMudmFsdWUsIGMudGltZSBhbmQgYy5zYW1wbGVUaW1lIGNhbiBiZSB1c2VkIGZvciB0aGUgY2FsY3VsYXRpb247IElucHV0IGlzIGEgbnVtYmVyOiBjIGNhbiBiZSB1c2VkIGZvciB0aGUgY2FsY3VsYXRpb25cIiwgbmV3IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvKGZhbHNlLCB0cnVlKSkpO1xyXG4gICAgICAgIGlucHV0RGF0YS5wdXNoKG5ldyBDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cyh0aGlzLmlucHV0U2lnbmFsRElkLCB0aGlzLmlucHV0U2lnbmFsRE5hbWUsIDAsIFwiSW5wdXQgaXMgYSBTaWduYWw6IGQudmFsdWUsIGQudGltZSBhbmQgZC5zYW1wbGVUaW1lIGNhbiBiZSB1c2VkIGZvciB0aGUgY2FsY3VsYXRpb247IElucHV0IGlzIGEgbnVtYmVyOiBkIGNhbiBiZSB1c2VkIGZvciB0aGUgY2FsY3VsYXRpb25cIiwgbmV3IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvKGZhbHNlLCB0cnVlKSkpO1xyXG4gICAgICAgIGlucHV0RGF0YS5wdXNoKG5ldyBDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cyh0aGlzLmlucHV0U2lnbmFsRUlkLCB0aGlzLmlucHV0U2lnbmFsRU5hbWUsIDAsIFwiSW5wdXQgaXMgYSBTaWduYWw6IGUudmFsdWUsIGUudGltZSBhbmQgZS5zYW1wbGVUaW1lIGNhbiBiZSB1c2VkIGZvciB0aGUgY2FsY3VsYXRpb247IElucHV0IGlzIGEgbnVtYmVyOiBlIGNhbiBiZSB1c2VkIGZvciB0aGUgY2FsY3VsYXRpb25cIiwgbmV3IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvKGZhbHNlLCB0cnVlKSkpO1xyXG5cclxuICAgICAgICByZXR1cm4gaW5wdXREYXRhO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgb3V0cHV0IGRhdGEgZm9yIHRoaXMgY2FsY3VsYXRvclxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+fVxyXG4gICAgICogQG1lbWJlcm9mIHN0cmluZ01hdGhqc0NhbGN1bGF0b3JcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldERlZmF1bHRPdXRwdXREYXRhKCk6IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz57XHJcbiAgICAgICBcclxuICAgICAgICBsZXQgb3V0cHV0RGF0YSA9IG5ldyBBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+KCk7XHJcblxyXG4gICAgICAgIC8vIGFkZCBvdXRwdXQgcGFyYW1zIHdpdGggZGVmYXVsdCBkaXNwbGF5bmFtZXNcclxuICAgICAgICBvdXRwdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YVBvaW50cyh0aGlzLm91dHB1dElkLCB0aGlzLm91dHB1dE5hbWUsIHRoaXMub3V0cHV0VmFsdWUsIG5ldyBBcnJheTxJUG9pbnQ+KCkpKTsgXHJcbiAgICAgICAgcmV0dXJuIG91dHB1dERhdGE7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByb3RlY3RlZCB2ZXJpZnlDYWxjdWxhdGlvbklucHV0RGF0YSgpIHtcclxuICAgICAgICBzdXBlci52ZXJpZnlDYWxjdWxhdGlvbklucHV0RGF0YSgpO1xyXG5cclxuICAgICAgICAvL3JldHJpZXZlIGNhbGN1bGF0aW9uIGlucHV0IGRhdGFcclxuICAgICAgICBsZXQgY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXIgPSB0aGlzLmdldENhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyKCk7XHJcblxyXG4gICAgICAgIGxldCBzdHJpbmdEYXRhWSA9IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyWzBdO1xyXG4gICAgICAgIGxldCBzdHJpbmdEYXRhWCA9IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyWzFdO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHN0cmluZ0RhdGFZID09IHVuZGVmaW5lZCB8fCAhQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU3RyaW5nKHN0cmluZ0RhdGFZLmRhdGEpKXtcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvckJ5VHlwZShFcnJvck1lc3NhZ2VUeXBlLk1pc3NpbmdPckludmFsaWRJbnB1dCwgW3RoaXMuaW5wdXRTdHJpbmdZTmFtZV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzdHJpbmdEYXRhWCA9PSB1bmRlZmluZWQgfHwgIUNhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc1N0cmluZyhzdHJpbmdEYXRhWC5kYXRhKSl7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JCeVR5cGUoRXJyb3JNZXNzYWdlVHlwZS5NaXNzaW5nT3JJbnZhbGlkSW5wdXQsIFt0aGlzLmlucHV0U3RyaW5nWE5hbWVdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDI7IGkgPCBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lci5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBjYWxjdWxhdGlvbklucHV0RGF0YSA9IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyW2ldO1xyXG4gICAgICAgICAgICBpZihDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNTdHJpbmcoY2FsY3VsYXRpb25JbnB1dERhdGEuZGF0YSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JCeVR5cGUoRXJyb3JNZXNzYWdlVHlwZS5NaXNzaW5nT3JJbnZhbGlkSW5wdXQsIFtjYWxjdWxhdGlvbklucHV0RGF0YS5uYW1lXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5oYXNFcnJvcnMoKSl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU3RyaW5nKHN0cmluZ0RhdGFZLmRhdGEpICYmIHN0cmluZ0RhdGFZLmRhdGEgPT09IHRoaXMuaW5wdXRTdHJpbmdEZXNjcmlwaW9uKXtcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvckJ5VHlwZShFcnJvck1lc3NhZ2VUeXBlLk1pc3NpbmdPckludmFsaWRJbnB1dCwgW3RoaXMuaW5wdXRTdHJpbmdZTmFtZV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNTdHJpbmcoc3RyaW5nRGF0YVguZGF0YSkgJiYgc3RyaW5nRGF0YVguZGF0YSA9PT0gdGhpcy5pbnB1dFN0cmluZ0Rlc2NyaXBpb24pe1xyXG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yQnlUeXBlKEVycm9yTWVzc2FnZVR5cGUuTWlzc2luZ09ySW52YWxpZElucHV0LCBbdGhpcy5pbnB1dFN0cmluZ1hOYW1lXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBleGVjdXRlQWxnb3JpdGhtKCkge1xyXG4gICAgICAgIHN1cGVyLmV4ZWN1dGVBbGdvcml0aG0oKVxyXG5cclxuICAgICAgICAvL3JldHJpZXZlIGNhbGN1bGF0aW9uIGlucHV0IGRhdGEgYW5kIGluaXRpYWxpemUgcmVzdWx0XHJcbiAgICAgICAgbGV0IGNhbGN1bGF0aW9uSW5wdXREYXRhID0gdGhpcy5nZXRDYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lcigpO1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBuZXcgQXJyYXk8SVBvaW50PigpO1xyXG5cclxuICAgICAgICBsZXQgc3RyaW5nRGF0YVkgPSBjYWxjdWxhdGlvbklucHV0RGF0YVswXTtcclxuICAgICAgICBsZXQgc3RyaW5nRGF0YVggPSBjYWxjdWxhdGlvbklucHV0RGF0YVsxXTtcclxuICAgICAgICBsZXQgc2lnbmFsRGF0YTogQXJyYXk8bnVtYmVyfEFycmF5PElQb2ludD4+ID0gbmV3IEFycmF5PG51bWJlcnxBcnJheTxJUG9pbnQ+PigpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMjsgaSA8IGNhbGN1bGF0aW9uSW5wdXREYXRhLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSBjYWxjdWxhdGlvbklucHV0RGF0YVtpXS5kYXRhO1xyXG4gICAgICAgICAgICBpZighQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU3RyaW5nKGRhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICBzaWduYWxEYXRhLnB1c2goZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgIGlmKENhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc1N0cmluZyhzdHJpbmdEYXRhWS5kYXRhKSAmJiBDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNTdHJpbmcoc3RyaW5nRGF0YVguZGF0YSkpIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5jYWxjdWxhdGVTdHJpbmcoc3RyaW5nRGF0YVkuZGF0YSwgc3RyaW5nRGF0YVguZGF0YSwgc2lnbmFsRGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLy9hZGQgdGhlIHJlc3VsdCBvZiB0aGUgY2FsY3VsYXRpb24gdG8gdGhlIGNhbGN1bGF0aW9uT3V0cHVDb250YWluZXJcclxuICAgICAgICB0aGlzLmFkZENhbGN1bGF0aW9uT3V0cHV0RGF0YSh7XHJcbiAgICAgICAgICAgIGRhdGE6IHJlc3VsdCxcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMub3V0cHV0VmFsdWUsXHJcbiAgICAgICAgICAgIG5hbWU6IHRoaXMub3V0cHV0TmFtZSxcclxuICAgICAgICAgICAgaWQ6IHRoaXMub3V0cHV0SWRcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsY3VsYXRlIG1hdGhlbWF0aWNhbCBleHByZXNzaW9ucyB3aXRoIHRoZSBnaXZlbiBkYXRhXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmdEYXRhWVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZ0RhdGFYXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElQb2ludFtdIHwgbnVtYmVyPn0gc2lnbmFsRGF0YVxyXG4gICAgICogQHJldHVybnMge0FycmF5PElQb2ludD59XHJcbiAgICAgKiBAbWVtYmVyb2YgU3RyaW5nTWF0aGpzQ2FsY3VsYXRvclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNhbGN1bGF0ZVN0cmluZyhzdHJpbmdEYXRhWTogc3RyaW5nLCBzdHJpbmdEYXRhWDogc3RyaW5nLCBzaWduYWxEYXRhOiBBcnJheTxJUG9pbnRbXSB8IG51bWJlcj4pOiBBcnJheTxJUG9pbnQ+e1xyXG4gICAgICAgXHJcbiAgICAgICAgbGV0IG91dHB1dCA9IG5ldyBBcnJheTxJUG9pbnQ+KCk7XHJcblxyXG4gICAgICAgIC8vUmVjZWl2ZSB0aGUgcmVzdWx0IG9mIHRoZSBjYWxjdWxhdGlvblxyXG4gICAgICAgIGxldCByZXN1bHRYOiBBcnJheTxudW1iZXI+ID0gdGhpcy5ldmFsdWF0ZVN0cmluZyhzdHJpbmdEYXRhWCwgc2lnbmFsRGF0YSk7XHJcbiAgICAgICAgbGV0IHJlc3VsdFk6IEFycmF5PG51bWJlcj4gPSB0aGlzLmV2YWx1YXRlU3RyaW5nKHN0cmluZ0RhdGFZLCBzaWduYWxEYXRhKTsgICBcclxuICAgICAgICBcclxuICAgICAgICBpZighdGhpcy5oYXNFcnJvcnMoKSl7XHJcbiAgICAgICAgICAgIG91dHB1dCA9IENhbGN1bGF0b3JIZWxwZXIuZnJvbVR3b051bWJlckFycmF5VG9JUG9pbnRBcnJheShyZXN1bHRYLCByZXN1bHRZKTtcclxuICAgICAgICAgICAgaWYob3V0cHV0Lmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRFcnJvckJ5VHlwZShFcnJvck1lc3NhZ2VUeXBlLkFycmF5c0hhdmVEaWZmZXJlbnRMZW5ndGgsIFtcIkNhbGN1bGF0aW5nIHZhbHVlcyBhbmQgY2FsY3VsYXRpbmcgdGltZVwiXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ICAgICAgICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBvdXRwdXQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByb3RlY3RlZCB2ZXJpZnlDYWxjdWxhdGlvbk91dHB1dERhdGEoKSB7IC8vVGhpcyBjYWxjdWxhdG9yIGFsbG93cyBmb3Igc2lnbmFsIGdlbmVyYXRpb24gYW5kIHJldHVybnMgYSBZVC1zaWduYWwuIFRoZXJlZm9yZSB0aGUgdGltZSBtdXN0IGJlIHN0cmljdGx5IG1vbm90b25pY2FsbHkgaW5jcmVhc2luZy5cclxuICAgICAgICBzdXBlci52ZXJpZnlDYWxjdWxhdGlvbk91dHB1dERhdGEoKTtcclxuXHJcbiAgICAgICAgbGV0IGNhbGN1bGF0aW9uT3V0cHV0RGF0YUNvbnRhaW5lciA9IHRoaXMuZ2V0Q2FsY3VsYXRpb25PdXRwdXREYXRhQ29udGFpbmVyKCk7XHJcblxyXG4gICAgICAgIGNhbGN1bGF0aW9uT3V0cHV0RGF0YUNvbnRhaW5lci5mb3JFYWNoKChjYWxjdWxhdGlvbk91dHB1dERhdGEpID0+IHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKCFDYWxjdWxhdG9ySGVscGVyLmlzU3RyaWN0bHlNb25vdG9uaWNhbGx5SW5jcmVhc2luZ0luVGltZShjYWxjdWxhdGlvbk91dHB1dERhdGEuZGF0YSkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEVycm9yQnlUeXBlKEVycm9yTWVzc2FnZVR5cGUuTm90U3RyaWN0bHlNb25vdG9uaWNhbGx5SW5jcmVhc2luZ0luVGltZSwgW2NhbGN1bGF0aW9uT3V0cHV0RGF0YS5uYW1lXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxjdWxhdGUgdGhlIHN0cmluZyB2YWx1ZSB3aXRoIG1hdGhqcyBsaWIgYW5kIG1hdGNoIHRvIHRoZSBpbnB1dHNpZ25hbCBvciBjb25zdGFudFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdHJcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SVBvaW50W10gfCBudW1iZXI+fSBzaWduYWxEYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyIHwgQXJyYXk8bnVtYmVyPn1cclxuICAgICAqIEBtZW1iZXJvZiBTdHJpbmdNYXRoanNDYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZXZhbHVhdGVTdHJpbmcoc3RyOiBzdHJpbmcsIHNpZ25hbERhdGE6IEFycmF5PElQb2ludFtdIHwgbnVtYmVyPik6IEFycmF5PG51bWJlcj4geyBcclxuICAgICAgICBcclxuICAgICAgICBsZXQgYXJyUmVzdWx0OiBBcnJheTxudW1iZXI+ID0gbmV3IEFycmF5PG51bWJlcj4oKTtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBjb2RlID0gdGhpcy5fbWF0aEpTTGliLmxpbWl0ZWRQYXJzZShzdHIpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHNjb3BlID0ge1xyXG4gICAgICAgICAgICAgICAgYTogdGhpcy5nZXRTY29wZU9iamVjdE9yVmFsdWUoc2lnbmFsRGF0YVswXSksIFxyXG4gICAgICAgICAgICAgICAgYjogdGhpcy5nZXRTY29wZU9iamVjdE9yVmFsdWUoc2lnbmFsRGF0YVsxXSksIFxyXG4gICAgICAgICAgICAgICAgYzogdGhpcy5nZXRTY29wZU9iamVjdE9yVmFsdWUoc2lnbmFsRGF0YVsyXSksIFxyXG4gICAgICAgICAgICAgICAgZDogdGhpcy5nZXRTY29wZU9iamVjdE9yVmFsdWUoc2lnbmFsRGF0YVszXSksIFxyXG4gICAgICAgICAgICAgICAgZTogdGhpcy5nZXRTY29wZU9iamVjdE9yVmFsdWUoc2lnbmFsRGF0YVs0XSkgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGNvbXBpbGVkQ29kZSA9IGNvZGUuY29tcGlsZSgpO1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gY29tcGlsZWRDb2RlLmV2YWx1YXRlKHNjb3BlKTtcclxuICAgICAgICAgICAgYXJyUmVzdWx0ID0gdGhpcy5jb252ZXJ0TWF0aGpzUmVzdWx0VHlwZVRvQXJyYXkocmVzdWx0KTsgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3IoXCJFcnJvciBpbiBleHByZXNzaW9uOiBcIiArIHN0ciArIFwiIVxcblwiICsgZXJyb3IubmFtZSArIFwiOiBcIiArIGVycm9yLm1lc3NhZ2UgKyBcIiFcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYXJyUmVzdWx0O1xyXG4gICAgfVxyXG4gXHJcbiAgICAgLyoqXHJcbiAgICAgKiBDaGVjayB0aGUgZGF0YXR5cGUgb2YgdGhlIGV2YWx1YXRlZCBtYXRoanMgcmVzdWx0IGFuZCBjb252ZXJ0IGl0IHRvIGFuIE51bWJlciBBcnJheVxyXG4gICAgICogVGhyb3dzIGVycm9ycyBpZiB0aGV5IGFyZSBub3QgdmFsaWRcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge2FueX0gcmVzdWx0XHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8bnVtYmVyPn1cclxuICAgICAqIEBtZW1iZXJvZiBTdHJpbmdNYXRoanNDYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29udmVydE1hdGhqc1Jlc3VsdFR5cGVUb0FycmF5KHJlc3VsdDogYW55KTogQXJyYXk8bnVtYmVyPiB7XHJcbiAgICAgICAgLy9nZXQgdGhlIG1hdHJpeCBvciBhcnJheSB2YWx1ZSBmcm9tIGEgbXVsdGlsaW5lIGV4cHJlc3Npb25cclxuICAgICAgICBpZihtYXRoLnR5cGVPZihyZXN1bHQpID09ICdSZXN1bHRTZXQnKSB7XHJcbiAgICAgICAgICAgIGlmKCFyZXN1bHQuaGFzT3duUHJvcGVydHkoJ2VudHJpZXMnKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXRoanNSZXN1bHRUeXBlRXJyb3IoJ1Jlc3VsdCBpcyBhIGludmFsaWQgUmVzdWx0U2V0JywgJ1RoZSByZXN1bHQgb2YgdGhlIGV4cHJlc3Npb24gaXMgaW52YWxpZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5lbnRyaWVzWzBdO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2dldCB0aGUgYXJyYXkgZnJvbSB0aGUgbWF0cml4XHJcbiAgICAgICAgaWYobWF0aC50eXBlT2YocmVzdWx0KSA9PSAnTWF0cml4Jykge1xyXG4gICAgICAgICAgICBpZihyZXN1bHQuX3NpemUubGVuZ3RoICE9IDEpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXRoanNSZXN1bHRUeXBlRXJyb3IoJ1Jlc3VsdCBpcyBhIG11bHRpZGltZW5zaW9uYWwgbWF0cml4JywgJ1RoZSByZXN1bHQgb2YgdGhlIGV4cHJlc3Npb24gaXMgbm90IGFsbG93ZWQgdG8gYmUgYSBtdWx0aWRpbWVuc2lvbmFsIG1hdHJpeCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5fZGF0YTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jaGVja0ZvckludmFsaWREYXRhVHlwZShyZXN1bHQpO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICAgLyoqXHJcbiAgICAgKiBDaGVjayBpZiB0aGUgZGF0YXR5cGUgb2YgdGhlIGV2YWx1YXRlZCBtYXRoanMgcmVzdWx0IGlzIHZhbGlkXHJcbiAgICAgKiBUaHJvd3MgZXJyb3JzIGlmIHRoZXkgYXJlIG5vdCB2YWxpZFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7YW55fSByZXN1bHRcclxuICAgICAqIEBtZW1iZXJvZiBTdHJpbmdNYXRoanNDYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2hlY2tGb3JJbnZhbGlkRGF0YVR5cGUocmVzdWx0OiBhbnkpe1xyXG4gICAgICAgIHN3aXRjaCAobWF0aC50eXBlT2YocmVzdWx0KSkge1xyXG4gICAgICAgICAgICBjYXNlICd1bmRlZmluZWQnOiB0aGlzLm1hdGhqc1Jlc3VsdFR5cGVFcnJvcignUmVzdWx0IGlzIHVuZGVmaW5lZCcsICdUaGUgcmVzdWx0IG9mIHRoZSBleHByZXNzaW9uIGlzIG5vdCBhbGxvd2VkIHRvIGJlIHVuZGVmaW5lZCcpO1xyXG4gICAgICAgICAgICBjYXNlICdudW1iZXInOiB0aGlzLm1hdGhqc1Jlc3VsdFR5cGVFcnJvcignUmVzdWx0IGlzIGEgbnVtYmVyJywgJ1RoZSByZXN1bHQgb2YgdGhlIGV4cHJlc3Npb24gaXMgbm90IGFsbG93ZWQgdG8gYmUgYSBudW1iZXInKTtcclxuICAgICAgICAgICAgY2FzZSAnYm9vbGVhbic6IHRoaXMubWF0aGpzUmVzdWx0VHlwZUVycm9yKCdSZXN1bHQgaXMgYSBib29sZWFuJywgJ1RoZSByZXN1bHQgb2YgdGhlIGV4cHJlc3Npb24gaXMgbm90IGFsbG93ZWQgdG8gYmUgYSBzaW5nbGUgYm9vbGVhbicpO1xyXG4gICAgICAgICAgICBjYXNlICdudWxsJzogdGhpcy5tYXRoanNSZXN1bHRUeXBlRXJyb3IoJ1Jlc3VsdCBpcyBudWxsJywgJ1RoZSByZXN1bHQgb2YgdGhlIGV4cHJlc3Npb24gaXMgbm90IGFsbG93ZWQgdG8gYmUgbnVsbCcpO1xyXG4gICAgICAgICAgICBjYXNlICdBcnJheSc6IGlmKENhbGN1bGF0b3JIZWxwZXIuYXJyYXlIYXNOYU5PckludmluaXR5VmFsdWVzKHJlc3VsdCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hdGhqc1Jlc3VsdFR5cGVFcnJvcignUmVzdWx0IGlzIGFuIGFycmF5IHdpdGggTmFOIG9yIGludmluaXR5IHZhbHVlcycsICdUaGUgcmVzdWx0IG9mIHRoZSBleHByZXNzaW9uIGlzIG5vdCBhbGxvd2VkIHRvIGJlIGFuIGFycmF5IHdpdGggTmFOIG9yIGludmluaXR5IHZhbHVlcycpO1xyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDogdGhpcy5tYXRoanNSZXN1bHRUeXBlRXJyb3IoJ1Jlc3VsdCBpcyBpbnZhbGlkJywgJ1RoZSByZXN1bHQgb2YgdGhlIGV4cHJlc3Npb24gaXMgaW52YWxpZCcpOyBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBzdWl0YWJsZSBvYmplY3QgZm9yIHRoZSBzY29wZVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SVBvaW50W10gfCBudW1iZXJ9IHNpZ25hbERhdGFcclxuICAgICAqIEByZXR1cm5zIHthbnl9XHJcbiAgICAgKiBAbWVtYmVyb2YgU3RyaW5nTWF0aGpzQ2FsY3VsYXRvclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFNjb3BlT2JqZWN0T3JWYWx1ZShzaWduYWxEYXRhOiBJUG9pbnRbXSB8IG51bWJlcik6IGFueSB7IFxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vU2NvcGUgZm9yIGEgbnVtYmVyXHJcbiAgICAgICAgaWYoc2lnbmFsRGF0YSAhPSB1bmRlZmluZWQgJiYgIUFycmF5LmlzQXJyYXkoc2lnbmFsRGF0YSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHNpZ25hbERhdGE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vU2NvcGUgZm9yIGEgc2lnbmFsXHJcbiAgICAgICAgZWxzZSBpZihzaWduYWxEYXRhICE9IHVuZGVmaW5lZCAmJiBBcnJheS5pc0FycmF5KHNpZ25hbERhdGEpKSB7XHJcbiAgICAgICAgICAgIGxldCBzcGxpdHRlZFNpZ25hbCA9IENhbGN1bGF0b3JIZWxwZXIuZnJvbUlQb2ludEFycmF5VG9OdW1iZXJBcnJheShzaWduYWxEYXRhKTtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBzcGxpdHRlZFNpZ25hbC55QXJyLFxyXG4gICAgICAgICAgICAgICAgdGltZTogc3BsaXR0ZWRTaWduYWwueEFycixcclxuICAgICAgICAgICAgICAgIHNhbXBsZVRpbWU6IENhbGN1bGF0b3JIZWxwZXIuZXN0aW1hdGVTYW1wbGVUaW1lKHNpZ25hbERhdGEpXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBtZXRob2QgZm9yIGdlbmVyYWxpemUgdGhyb3cgbWVzc2FnZXMgZm9yIGludmFsaWQgY2FsY3VsYXRpb24gcmVzdWx0c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXJyb3JOYW1lXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXJyb3JNZXNzYWdlXHJcbiAgICAgKiBAcmV0dXJucyB7bmV2ZXJ9IFxyXG4gICAgICogQG1lbWJlcm9mIFN0cmluZ01hdGhqc0NhbGN1bGF0b3JcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBtYXRoanNSZXN1bHRUeXBlRXJyb3IoZXJyb3JOYW1lOiBzdHJpbmcsIGVycm9yTWVzc2FnZTogc3RyaW5nKTogbmV2ZXIgeyAgICBcclxuICAgICAgICB0aHJvdyB7bmFtZTogZXJyb3JOYW1lLCBkYXRhOiBlcnJvck1lc3NhZ2V9O1xyXG4gICAgfVxyXG59XHJcblxyXG4iXX0=