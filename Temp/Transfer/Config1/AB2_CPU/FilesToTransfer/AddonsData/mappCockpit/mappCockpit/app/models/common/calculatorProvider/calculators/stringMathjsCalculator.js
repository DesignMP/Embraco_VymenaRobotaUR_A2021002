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
define(["require", "exports", "../../point", "../calculationDataNumberOrPoints", "../calculationDataPoints", "../calculationDataDisplayInfo", "./calculatorBase", "../calculationDataString", "../../../../libs/math/mathjs", "../mathjsWrapper", "../mathjsHtmlConverter", "./calculatorHelper"], function (require, exports, point_1, calculationDataNumberOrPoints_1, calculationDataPoints_1, calculationDataDisplayInfo_1, calculatorBase_1, calculationDataString_1, math, mathjsWrapper_1, mathjsHtmlConverter_1, calculatorHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StringMathjsCalculator = /** @class */ (function (_super) {
        __extends(StringMathjsCalculator, _super);
        function StringMathjsCalculator() {
            var _this = _super.call(this, "stringmathjs", "Math expression", "Calculates separated values and time as mathematical expression") || this;
            _this.inputStringYName = "Calculating values";
            _this.inputStringXName = "Calculating time";
            _this.inputSignalAName = "Input signal or number a";
            _this.inputSignalBName = "Input signal or number b";
            _this.inputSignalCName = "Input signal or number c";
            _this.inputSignalDName = "Input signal or number d";
            _this.inputSignalEName = "Input signal or number e";
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
            var stringInputData1 = new calculationDataString_1.CalculationDataString(this.inputStringYName, this.inputStringDescripion, "Calculates mathematical formulars from the math.js library for the y values", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, false));
            stringInputData1.valueConverter = new mathjsHtmlConverter_1.MathjsHtmlConverter(this.inputStringDescripion); //converter to display value as html
            inputData.push(stringInputData1);
            var stringInputData2 = new calculationDataString_1.CalculationDataString(this.inputStringXName, this.inputStringDescripion, "Calculates mathematical formulars from the math.js library for the x values", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, false));
            stringInputData2.valueConverter = new mathjsHtmlConverter_1.MathjsHtmlConverter(this.inputStringDescripion); //converter to display value as html
            inputData.push(stringInputData2);
            inputData.push(new calculationDataNumberOrPoints_1.CalculationDataNumberOrPoints(this.inputSignalAName, 0, "Input is a signal: a.value, a.time and a.sampleTime can be used for the calculation; Input is a number: a can be used for the calculation", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            inputData.push(new calculationDataNumberOrPoints_1.CalculationDataNumberOrPoints(this.inputSignalBName, 0, "Input is a Signal: b.value, b.time and b.sampleTime can be used for the calculation; Input is a number: b can be used for the calculation", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            inputData.push(new calculationDataNumberOrPoints_1.CalculationDataNumberOrPoints(this.inputSignalCName, 0, "Input is a Signal: c.value, c.time and c.sampleTime can be used for the calculation; Input is a number: c can be used for the calculation", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            inputData.push(new calculationDataNumberOrPoints_1.CalculationDataNumberOrPoints(this.inputSignalDName, 0, "Input is a Signal: d.value, d.time and d.sampleTime can be used for the calculation; Input is a number: d can be used for the calculation", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            inputData.push(new calculationDataNumberOrPoints_1.CalculationDataNumberOrPoints(this.inputSignalEName, 0, "Input is a Signal: e.value, e.time and e.sampleTime can be used for the calculation; Input is a number: e can be used for the calculation", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
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
            outputData.push(new calculationDataPoints_1.CalculationDataPoints(this.outputName, this.outputValue, new Array()));
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
            /**************************************************************************************************************************************************/
            //add the result of the calculation to the calculationOutpuContainer
            this.addCalculationOutputData({
                data: result,
                value: this.outputValue,
                name: this.outputName
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
            if (this.hasErrors()) {
                return output;
            }
            if (resultX === undefined) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.MissingOrInvalidInput, [this.inputStringXName]);
                return output;
            }
            if (resultY === undefined) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.MissingOrInvalidInput, [this.inputStringYName]);
                return output;
            }
            //Verify if the calculation is valid
            if (typeof (resultX) == "number") {
                this.addError("Calculation Error: " + this.inputStringXName + " is not allowed to be a number. It needs to be a signal!");
                return output;
            }
            if (typeof (resultY) == "number") {
                this.addError("Calculation Error: " + this.inputStringYName + " is not allowed to be a number. It needs to be a signal!");
                return output;
            }
            var resultXM;
            var resultYM;
            //check if input is a multiline expression
            var checkResultSetX;
            var checkResultSetY;
            if (resultX.hasOwnProperty('entries')) {
                checkResultSetX = resultX.entries[0];
            }
            if (resultY.hasOwnProperty('entries')) {
                checkResultSetY = resultY.entries[0];
            }
            try {
                if (Array.isArray(checkResultSetX)) {
                    resultXM = math.matrix(checkResultSetX);
                }
                else if (checkResultSetX !== undefined && Array.isArray(checkResultSetX._data)) {
                    resultXM = checkResultSetX;
                }
                else {
                    resultXM = math.matrix(resultX);
                }
            }
            catch (error) {
                this.addError("Error in expression: " + stringDataX + "!\n" + error.name + ": " + error.message + "!");
                return output;
            }
            try {
                if (Array.isArray(checkResultSetY)) {
                    resultYM = math.matrix(checkResultSetY);
                }
                else if (checkResultSetY !== undefined && Array.isArray(checkResultSetY._data)) {
                    resultYM = checkResultSetY;
                }
                else {
                    resultYM = math.matrix(resultY);
                }
            }
            catch (error) {
                this.addError("Error in expression: " + stringDataY + "!\n" + error.name + ": " + error.message + "!");
                return output;
            }
            //Verify if the calculationdata is valid
            if (!Array.isArray(resultXM._data)) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.MissingOrInvalidInput, [this.inputStringXName]);
            }
            if (calculatorHelper_1.CalculatorHelper.arrayHasNaNOrInvinityValues(resultXM._data)) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.ContainsNaNOrInfinity, [this.inputStringXName]);
                return output;
            }
            if (resultXM._size.length != 1) {
                this.addError("Error in expression: " + stringDataX + "!\nExpressions resulting a multidimensional signal are not supported!");
                return output;
            }
            if (!Array.isArray(resultYM._data)) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.MissingOrInvalidInput, [this.inputStringYName]);
            }
            if (calculatorHelper_1.CalculatorHelper.arrayHasNaNOrInvinityValues(resultYM._data)) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.ContainsNaNOrInfinity, [this.inputStringYName]);
                return output;
            }
            if (resultYM._size.length != 1) {
                this.addError("Error in expression: " + stringDataY + "!\nExpressions resulting a multidimensional signal are not supported!");
                return output;
            }
            output = this.fromTwoNumberArrayToIPointArray(resultXM._data, resultYM._data);
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
                return compiledCode.evaluate(scope);
            }
            catch (error) {
                this.addError("Error in expression: " + str + "!\n" + error.name + ": " + error.message + "!");
                return new Array();
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
            if (signalData != undefined && !Array.isArray(signalData)) {
                return signalData;
            }
            else if (signalData != undefined && Array.isArray(signalData)) {
                return {
                    value: this.fromIPointArrayToNumberArray(signalData, false),
                    time: this.fromIPointArrayToNumberArray(signalData, true),
                    sampleTime: calculatorHelper_1.CalculatorHelper.estimateSampleTime(signalData)
                };
            }
        };
        /**
        * Combining two Number Arrays same length to an Ipoint Array.
        * If the two Number Arrays don't have same size an empty Array gets returned
        *
        * @private
        * @param {Array<number>} arrX
        * @param {Array<number>} arrY
        * @returns {Array<IPoint>}
        * @memberof StringMathjsCalculator
        */
        StringMathjsCalculator.prototype.fromTwoNumberArrayToIPointArray = function (arrX, arrY) {
            var combinedSignal = new Array();
            if (arrX.length == arrY.length) {
                for (var i = 0; i < arrX.length; i++) {
                    var point = new point_1.Point(arrX[i], arrY[i]);
                    combinedSignal.push(point);
                }
            }
            else {
                this.addError("Calculation Error: Calculating values and calculating time need to have the same length!");
            }
            return combinedSignal;
        };
        /**
        * Returning either X(true) or Y(false) Values as Number Array
        *
        * @private
        * @param {Array<IPoint>} signalData
        * @param {boolean} isX  true returns x values and false return y values
        * @returns {Array<number>}  returns x or y values based on isX parameter
        * @memberof StringMathjsCalculator
        */
        StringMathjsCalculator.prototype.fromIPointArrayToNumberArray = function (signalData, isX) {
            var splittedSignal = new Array();
            for (var i = 0; i < signalData.length; i++) {
                if (isX) {
                    splittedSignal.push(signalData[i].x);
                }
                else {
                    splittedSignal.push(signalData[i].y);
                }
            }
            return splittedSignal;
        };
        return StringMathjsCalculator;
    }(calculatorBase_1.CalculatorBase));
    exports.StringMathjsCalculator = StringMathjsCalculator;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nTWF0aGpzQ2FsY3VsYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRvcnMvc3RyaW5nTWF0aGpzQ2FsY3VsYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBZ0JBO1FBQTRDLDBDQUFjO1FBaUJ0RDtZQUFBLFlBQ0ksa0JBQU0sY0FBYyxFQUFFLGlCQUFpQixFQUFFLGlFQUFpRSxDQUFDLFNBRTlHO1lBbEJPLHNCQUFnQixHQUFXLG9CQUFvQixDQUFDO1lBQ2hELHNCQUFnQixHQUFXLGtCQUFrQixDQUFDO1lBQzlDLHNCQUFnQixHQUFXLDBCQUEwQixDQUFDO1lBQ3RELHNCQUFnQixHQUFXLDBCQUEwQixDQUFDO1lBQ3RELHNCQUFnQixHQUFXLDBCQUEwQixDQUFDO1lBQ3RELHNCQUFnQixHQUFXLDBCQUEwQixDQUFDO1lBQ3RELHNCQUFnQixHQUFXLDBCQUEwQixDQUFDO1lBQ3RELGdCQUFVLEdBQUcsZUFBZSxDQUFDO1lBQzdCLGlCQUFXLEdBQUcsaUJBQWlCLENBQUM7WUFHaEMsMkJBQXFCLEdBQVcsa0NBQWtDLENBQUM7WUFNdkUsS0FBSSxDQUFDLFVBQVUsR0FBRyw2QkFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDOztRQUNsRCxDQUFDO1FBQ0Q7Ozs7O1dBS0c7UUFDSSxvREFBbUIsR0FBMUI7WUFDSSxJQUFJLFNBQVMsR0FBNEIsaUJBQU0sbUJBQW1CLFdBQUUsQ0FBQztZQUVyRSxJQUFJLGdCQUFnQixHQUFHLElBQUksNkNBQXFCLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxxQkFBcUIsRUFBRSw2RUFBNkUsRUFBRSxJQUFJLHVEQUEwQixDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2pPLGdCQUFnQixDQUFDLGNBQWMs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LElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3hDO3FCQUNJO29CQUNELGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUN4QzthQUNKO1lBRUQsT0FBTyxjQUFjLENBQUM7UUFDMUIsQ0FBQztRQUNMLDZCQUFDO0lBQUQsQ0FBQyxBQXBXRCxDQUE0QywrQkFBYyxHQW9XekQ7SUFwV1ksd0RBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUNhbGN1bGF0b3IgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9jYWxjdWxhdG9ySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElQb2ludCB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL3BvaW50SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4uLy4uL3BvaW50XCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YVBvaW50cyB9IGZyb20gXCIuLi9jYWxjdWxhdGlvbkRhdGFQb2ludHNcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm8gfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm9cIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRvckJhc2UsIEVycm9yTWVzc2FnZVR5cGUgfSBmcm9tIFwiLi9jYWxjdWxhdG9yQmFzZVwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFTdHJpbmcgfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhU3RyaW5nXCI7XHJcbmltcG9ydCAqIGFzIG1hdGggZnJvbSAgXCIuLi8uLi8uLi8uLi9saWJzL21hdGgvbWF0aGpzXCJcclxuaW1wb3J0IHsgTWF0aGpzV3JhcHBlciB9IGZyb20gXCIuLi9tYXRoanNXcmFwcGVyXCI7XHJcbmltcG9ydCB7IE1hdGhqc0h0bWxDb252ZXJ0ZXIgfSBmcm9tIFwiLi4vbWF0aGpzSHRtbENvbnZlcnRlclwiO1xyXG5pbXBvcnQgeyBUQ2FsY3VsYXRpb25EYXRhIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YVwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdG9ySGVscGVyIH0gZnJvbSBcIi4vY2FsY3VsYXRvckhlbHBlclwiO1xyXG5cclxudHlwZSBNYXRoanNNdWx0aWxpbmVJbnB1dFJldHVyblR5cGUgPSB7ZW50cmllczogQXJyYXk8bnVtYmVyPn07XHJcblxyXG5leHBvcnQgY2xhc3MgU3RyaW5nTWF0aGpzQ2FsY3VsYXRvciBleHRlbmRzIENhbGN1bGF0b3JCYXNlIGltcGxlbWVudHMgSUNhbGN1bGF0b3J7XHJcbiAgIFxyXG4gICAgcHJpdmF0ZSBpbnB1dFN0cmluZ1lOYW1lOiBzdHJpbmcgPSBcIkNhbGN1bGF0aW5nIHZhbHVlc1wiO1xyXG4gICAgcHJpdmF0ZSBpbnB1dFN0cmluZ1hOYW1lOiBzdHJpbmcgPSBcIkNhbGN1bGF0aW5nIHRpbWVcIjtcclxuICAgIHByaXZhdGUgaW5wdXRTaWduYWxBTmFtZTogc3RyaW5nID0gXCJJbnB1dCBzaWduYWwgb3IgbnVtYmVyIGFcIjtcclxuICAgIHByaXZhdGUgaW5wdXRTaWduYWxCTmFtZTogc3RyaW5nID0gXCJJbnB1dCBzaWduYWwgb3IgbnVtYmVyIGJcIjtcclxuICAgIHByaXZhdGUgaW5wdXRTaWduYWxDTmFtZTogc3RyaW5nID0gXCJJbnB1dCBzaWduYWwgb3IgbnVtYmVyIGNcIjtcclxuICAgIHByaXZhdGUgaW5wdXRTaWduYWxETmFtZTogc3RyaW5nID0gXCJJbnB1dCBzaWduYWwgb3IgbnVtYmVyIGRcIjtcclxuICAgIHByaXZhdGUgaW5wdXRTaWduYWxFTmFtZTogc3RyaW5nID0gXCJJbnB1dCBzaWduYWwgb3IgbnVtYmVyIGVcIjtcclxuICAgIHByaXZhdGUgb3V0cHV0TmFtZSA9IFwiT3V0cHV0IHNpZ25hbFwiO1xyXG4gICAgcHJpdmF0ZSBvdXRwdXRWYWx1ZSA9IFwibWF0aCBleHByZXNzaW9uXCI7XHJcbiAgICBcclxuXHJcbiAgICBwcml2YXRlIGlucHV0U3RyaW5nRGVzY3JpcGlvbjogc3RyaW5nID0gXCJNYXRoZW1hdGljYWwgZXhwcmVzc2lvbiBleHBlY3RlZFwiO1xyXG4gICAgXHJcbiAgICBwcml2YXRlIF9tYXRoSlNMaWI6IE1hdGhqc1dyYXBwZXI7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFwic3RyaW5nbWF0aGpzXCIsIFwiTWF0aCBleHByZXNzaW9uXCIsIFwiQ2FsY3VsYXRlcyBzZXBhcmF0ZWQgdmFsdWVzIGFuZCB0aW1lIGFzIG1hdGhlbWF0aWNhbCBleHByZXNzaW9uXCIpO1xyXG4gICAgICAgIHRoaXMuX21hdGhKU0xpYiA9IE1hdGhqc1dyYXBwZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBpbnB1dCBkYXRhIGZvciB0aGlzIGNhbGN1bGF0b3IgXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0FycmF5PFRDYWxjdWxhdGlvbkRhdGE+fVxyXG4gICAgICogQG1lbWJlcm9mIFN0cmluZ01hdGhqc0NhbGN1bGF0b3JcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldERlZmF1bHRJbnB1dERhdGEoKTogQXJyYXk8VENhbGN1bGF0aW9uRGF0YT57XHJcbiAgICAgICAgbGV0IGlucHV0RGF0YTogQXJyYXk8VENhbGN1bGF0aW9uRGF0YT4gPSBzdXBlci5nZXREZWZhdWx0SW5wdXREYXRhKCk7XHJcbiAgICAgICAgICBcclxuICAgICAgICBsZXQgc3RyaW5nSW5wdXREYXRhMSA9IG5ldyBDYWxjdWxhdGlvbkRhdGFTdHJpbmcodGhpcy5pbnB1dFN0cmluZ1lOYW1lLCB0aGlzLmlucHV0U3RyaW5nRGVzY3JpcGlvbiwgXCJDYWxjdWxhdGVzIG1hdGhlbWF0aWNhbCBmb3JtdWxhcnMgZnJvbSB0aGUgbWF0aC5qcyBsaWJyYXJ5IGZvciB0aGUgeSB2YWx1ZXNcIiwgbmV3IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvKGZhbHNlLCBmYWxzZSkpO1xyXG4gICAgICAgIHN0cmluZ0lucHV0RGF0YTEudmFsdWVDb252ZXJ0ZXIgPSBuZXcgTWF0aGpzSHRtbENvbnZlcnRlcih0aGlzLmlucHV0U3RyaW5nRGVzY3JpcGlvbik7ICAvL2NvbnZlcnRlciB0byBkaXNwbGF5IHZhbHVlIGFzIGh0bWxcclxuICAgICAgICBpbnB1dERhdGEucHVzaChzdHJpbmdJbnB1dERhdGExKTtcclxuICAgICAgICBsZXQgc3RyaW5nSW5wdXREYXRhMiA9IG5ldyBDYWxjdWxhdGlvbkRhdGFTdHJpbmcodGhpcy5pbnB1dFN0cmluZ1hOYW1lLCB0aGlzLmlucHV0U3RyaW5nRGVzY3JpcGlvbiwgXCJDYWxjdWxhdGVzIG1hdGhlbWF0aWNhbCBmb3JtdWxhcnMgZnJvbSB0aGUgbWF0aC5qcyBsaWJyYXJ5IGZvciB0aGUgeCB2YWx1ZXNcIiwgbmV3IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvKGZhbHNlLCBmYWxzZSkpO1xyXG4gICAgICAgIHN0cmluZ0lucHV0RGF0YTIudmFsdWVDb252ZXJ0ZXIgPSBuZXcgTWF0aGpzSHRtbENvbnZlcnRlcih0aGlzLmlucHV0U3RyaW5nRGVzY3JpcGlvbik7ICAvL2NvbnZlcnRlciB0byBkaXNwbGF5IHZhbHVlIGFzIGh0bWxcclxuICAgICAgICBpbnB1dERhdGEucHVzaChzdHJpbmdJbnB1dERhdGEyKTtcclxuXHJcbiAgICAgICAgaW5wdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzKHRoaXMuaW5wdXRTaWduYWxBTmFtZSwgMCwgXCJJbnB1dCBpcyBhIHNpZ25hbDogYS52YWx1ZSwgYS50aW1lIGFuZCBhLnNhbXBsZVRpbWUgY2FuIGJlIHVzZWQgZm9yIHRoZSBjYWxjdWxhdGlvbjsgSW5wdXQgaXMgYSBudW1iZXI6IGEgY2FuIGJlIHVzZWQgZm9yIHRoZSBjYWxjdWxhdGlvblwiLCBuZXcgQ2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm8oZmFsc2UsIHRydWUpKSk7XHJcbiAgICAgICAgaW5wdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzKHRoaXMuaW5wdXRTaWduYWxCTmFtZSwgMCwgXCJJbnB1dCBpcyBhIFNpZ25hbDogYi52YWx1ZSwgYi50aW1lIGFuZCBiLnNhbXBsZVRpbWUgY2FuIGJlIHVzZWQgZm9yIHRoZSBjYWxjdWxhdGlvbjsgSW5wdXQgaXMgYSBudW1iZXI6IGIgY2FuIGJlIHVzZWQgZm9yIHRoZSBjYWxjdWxhdGlvblwiLCBuZXcgQ2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm8oZmFsc2UsIHRydWUpKSk7XHJcbiAgICAgICAgaW5wdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzKHRoaXMuaW5wdXRTaWduYWxDTmFtZSwgMCwgXCJJbnB1dCBpcyBhIFNpZ25hbDogYy52YWx1ZSwgYy50aW1lIGFuZCBjLnNhbXBsZVRpbWUgY2FuIGJlIHVzZWQgZm9yIHRoZSBjYWxjdWxhdGlvbjsgSW5wdXQgaXMgYSBudW1iZXI6IGMgY2FuIGJlIHVzZWQgZm9yIHRoZSBjYWxjdWxhdGlvblwiLCBuZXcgQ2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm8oZmFsc2UsIHRydWUpKSk7XHJcbiAgICAgICAgaW5wdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzKHRoaXMuaW5wdXRTaWduYWxETmFtZSwgMCwgXCJJbnB1dCBpcyBhIFNpZ25hbDogZC52YWx1ZSwgZC50aW1lIGFuZCBkLnNhbXBsZVRpbWUgY2FuIGJlIHVzZWQgZm9yIHRoZSBjYWxjdWxhdGlvbjsgSW5wdXQgaXMgYSBudW1iZXI6IGQgY2FuIGJlIHVzZWQgZm9yIHRoZSBjYWxjdWxhdGlvblwiLCBuZXcgQ2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm8oZmFsc2UsIHRydWUpKSk7XHJcbiAgICAgICAgaW5wdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzKHRoaXMuaW5wdXRTaWduYWxFTmFtZSwgMCwgXCJJbnB1dCBpcyBhIFNpZ25hbDogZS52YWx1ZSwgZS50aW1lIGFuZCBlLnNhbXBsZVRpbWUgY2FuIGJlIHVzZWQgZm9yIHRoZSBjYWxjdWxhdGlvbjsgSW5wdXQgaXMgYSBudW1iZXI6IGUgY2FuIGJlIHVzZWQgZm9yIHRoZSBjYWxjdWxhdGlvblwiLCBuZXcgQ2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm8oZmFsc2UsIHRydWUpKSk7XHJcblxyXG4gICAgICAgIHJldHVybiBpbnB1dERhdGE7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBvdXRwdXQgZGF0YSBmb3IgdGhpcyBjYWxjdWxhdG9yXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0FycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz59XHJcbiAgICAgKiBAbWVtYmVyb2Ygc3RyaW5nTWF0aGpzQ2FsY3VsYXRvclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0RGVmYXVsdE91dHB1dERhdGEoKTogQXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPntcclxuICAgICAgIFxyXG4gICAgICAgIGxldCBvdXRwdXREYXRhID0gbmV3IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz4oKTtcclxuXHJcbiAgICAgICAgLy8gYWRkIG91dHB1dCBwYXJhbXMgd2l0aCBkZWZhdWx0IGRpc3BsYXluYW1lc1xyXG4gICAgICAgIG91dHB1dERhdGEucHVzaChuZXcgQ2FsY3VsYXRpb25EYXRhUG9pbnRzKHRoaXMub3V0cHV0TmFtZSwgdGhpcy5vdXRwdXRWYWx1ZSwgbmV3IEFycmF5PElQb2ludD4oKSkpOyBcclxuICAgICAgICByZXR1cm4gb3V0cHV0RGF0YTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJvdGVjdGVkIHZlcmlmeUNhbGN1bGF0aW9uSW5wdXREYXRhKCkge1xyXG4gICAgICAgIHN1cGVyLnZlcmlmeUNhbGN1bGF0aW9uSW5wdXREYXRhKCk7XHJcblxyXG4gICAgICAgIC8vcmV0cmlldmUgY2FsY3VsYXRpb24gaW5wdXQgZGF0YVxyXG4gICAgICAgIGxldCBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lciA9IHRoaXMuZ2V0Q2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXIoKTtcclxuXHJcbiAgICAgICAgbGV0IHN0cmluZ0RhdGFZID0gY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXJbMF07XHJcbiAgICAgICAgbGV0IHN0cmluZ0RhdGFYID0gY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXJbMV07XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoc3RyaW5nRGF0YVkgPT0gdW5kZWZpbmVkIHx8ICFDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNTdHJpbmcoc3RyaW5nRGF0YVkuZGF0YSkpe1xyXG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yQnlUeXBlKEVycm9yTWVzc2FnZVR5cGUuTWlzc2luZ09ySW52YWxpZElucHV0LCBbdGhpcy5pbnB1dFN0cmluZ1lOYW1lXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHN0cmluZ0RhdGFYID09IHVuZGVmaW5lZCB8fCAhQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU3RyaW5nKHN0cmluZ0RhdGFYLmRhdGEpKXtcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvckJ5VHlwZShFcnJvck1lc3NhZ2VUeXBlLk1pc3NpbmdPckludmFsaWRJbnB1dCwgW3RoaXMuaW5wdXRTdHJpbmdYTmFtZV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMjsgaSA8IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGNhbGN1bGF0aW9uSW5wdXREYXRhID0gY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXJbaV07XHJcbiAgICAgICAgICAgIGlmKENhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc1N0cmluZyhjYWxjdWxhdGlvbklucHV0RGF0YS5kYXRhKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRFcnJvckJ5VHlwZShFcnJvck1lc3NhZ2VUeXBlLk1pc3NpbmdPckludmFsaWRJbnB1dCwgW2NhbGN1bGF0aW9uSW5wdXREYXRhLm5hbWVdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmhhc0Vycm9ycygpKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNTdHJpbmcoc3RyaW5nRGF0YVkuZGF0YSkgJiYgc3RyaW5nRGF0YVkuZGF0YSA9PT0gdGhpcy5pbnB1dFN0cmluZ0Rlc2NyaXBpb24pe1xyXG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yQnlUeXBlKEVycm9yTWVzc2FnZVR5cGUuTWlzc2luZ09ySW52YWxpZElucHV0LCBbdGhpcy5pbnB1dFN0cmluZ1lOYW1lXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKENhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc1N0cmluZyhzdHJpbmdEYXRhWC5kYXRhKSAmJiBzdHJpbmdEYXRhWC5kYXRhID09PSB0aGlzLmlucHV0U3RyaW5nRGVzY3JpcGlvbil7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JCeVR5cGUoRXJyb3JNZXNzYWdlVHlwZS5NaXNzaW5nT3JJbnZhbGlkSW5wdXQsIFt0aGlzLmlucHV0U3RyaW5nWE5hbWVdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGV4ZWN1dGVBbGdvcml0aG0oKSB7XHJcbiAgICAgICAgc3VwZXIuZXhlY3V0ZUFsZ29yaXRobSgpXHJcblxyXG4gICAgICAgIC8vcmV0cmlldmUgY2FsY3VsYXRpb24gaW5wdXQgZGF0YSBhbmQgaW5pdGlhbGl6ZSByZXN1bHRcclxuICAgICAgICBsZXQgY2FsY3VsYXRpb25JbnB1dERhdGEgPSB0aGlzLmdldENhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyKCk7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBBcnJheTxJUG9pbnQ+KCk7XHJcblxyXG4gICAgICAgIGxldCBzdHJpbmdEYXRhWSA9IGNhbGN1bGF0aW9uSW5wdXREYXRhWzBdO1xyXG4gICAgICAgIGxldCBzdHJpbmdEYXRhWCA9IGNhbGN1bGF0aW9uSW5wdXREYXRhWzFdO1xyXG4gICAgICAgIGxldCBzaWduYWxEYXRhOiBBcnJheTxudW1iZXJ8QXJyYXk8SVBvaW50Pj4gPSBuZXcgQXJyYXk8bnVtYmVyfEFycmF5PElQb2ludD4+KCk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAyOyBpIDwgY2FsY3VsYXRpb25JbnB1dERhdGEubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IGNhbGN1bGF0aW9uSW5wdXREYXRhW2ldLmRhdGE7XHJcbiAgICAgICAgICAgIGlmKCFDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNTdHJpbmcoZGF0YSkpIHtcclxuICAgICAgICAgICAgICAgIHNpZ25hbERhdGEucHVzaChkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgaWYoQ2FsY3VsYXRvckhlbHBlci5jYWxjdWxhdGlvbklucHV0RGF0YUlzU3RyaW5nKHN0cmluZ0RhdGFZLmRhdGEpICYmIENhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc1N0cmluZyhzdHJpbmdEYXRhWC5kYXRhKSkge1xyXG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLmNhbGN1bGF0ZVN0cmluZyhzdHJpbmdEYXRhWS5kYXRhLCBzdHJpbmdEYXRhWC5kYXRhLCBzaWduYWxEYXRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbiAgICAgICAgLy9hZGQgdGhlIHJlc3VsdCBvZiB0aGUgY2FsY3VsYXRpb24gdG8gdGhlIGNhbGN1bGF0aW9uT3V0cHVDb250YWluZXJcclxuICAgICAgICB0aGlzLmFkZENhbGN1bGF0aW9uT3V0cHV0RGF0YSh7XHJcbiAgICAgICAgICAgIGRhdGE6IHJlc3VsdCxcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMub3V0cHV0VmFsdWUsXHJcbiAgICAgICAgICAgIG5hbWU6IHRoaXMub3V0cHV0TmFtZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxjdWxhdGUgbWF0aGVtYXRpY2FsIGV4cHJlc3Npb25zIHdpdGggdGhlIGdpdmVuIGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZ0RhdGFZXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nRGF0YVhcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SVBvaW50W10gfCBudW1iZXI+fSBzaWduYWxEYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8SVBvaW50Pn1cclxuICAgICAqIEBtZW1iZXJvZiBTdHJpbmdNYXRoanNDYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2FsY3VsYXRlU3RyaW5nKHN0cmluZ0RhdGFZOiBzdHJpbmcsIHN0cmluZ0RhdGFYOiBzdHJpbmcsIHNpZ25hbERhdGE6IEFycmF5PElQb2ludFtdIHwgbnVtYmVyPik6IEFycmF5PElQb2ludD57XHJcbiAgICAgICBcclxuICAgICAgICBsZXQgb3V0cHV0ID0gbmV3IEFycmF5PElQb2ludD4oKTtcclxuXHJcbiAgICAgICAgLy9SZWNlaXZlIHRoZSByZXN1bHQgb2YgdGhlIGNhbGN1bGF0aW9uXHJcbiAgICAgICAgbGV0IHJlc3VsdFggPSB0aGlzLmV2YWx1YXRlU3RyaW5nKHN0cmluZ0RhdGFYLCBzaWduYWxEYXRhKTtcclxuICAgICAgICBsZXQgcmVzdWx0WSA9IHRoaXMuZXZhbHVhdGVTdHJpbmcoc3RyaW5nRGF0YVksIHNpZ25hbERhdGEpOyAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuaGFzRXJyb3JzKCkpe1xyXG4gICAgICAgICAgICByZXR1cm4gb3V0cHV0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYocmVzdWx0WCA9PT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvckJ5VHlwZShFcnJvck1lc3NhZ2VUeXBlLk1pc3NpbmdPckludmFsaWRJbnB1dCwgW3RoaXMuaW5wdXRTdHJpbmdYTmFtZV0pO1xyXG4gICAgICAgICAgICByZXR1cm4gb3V0cHV0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihyZXN1bHRZID09PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yQnlUeXBlKEVycm9yTWVzc2FnZVR5cGUuTWlzc2luZ09ySW52YWxpZElucHV0LCBbdGhpcy5pbnB1dFN0cmluZ1lOYW1lXSk7XHJcbiAgICAgICAgICAgIHJldHVybiBvdXRwdXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vVmVyaWZ5IGlmIHRoZSBjYWxjdWxhdGlvbiBpcyB2YWxpZFxyXG4gICAgICAgIGlmKHR5cGVvZihyZXN1bHRYKSA9PSBcIm51bWJlclwiKXtcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvcihcIkNhbGN1bGF0aW9uIEVycm9yOiBcIiArIHRoaXMuaW5wdXRTdHJpbmdYTmFtZSArIFwiIGlzIG5vdCBhbGxvd2VkIHRvIGJlIGEgbnVtYmVyLiBJdCBuZWVkcyB0byBiZSBhIHNpZ25hbCFcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBvdXRwdXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHR5cGVvZihyZXN1bHRZKSA9PSBcIm51bWJlclwiKXtcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvcihcIkNhbGN1bGF0aW9uIEVycm9yOiBcIiArIHRoaXMuaW5wdXRTdHJpbmdZTmFtZSArIFwiIGlzIG5vdCBhbGxvd2VkIHRvIGJlIGEgbnVtYmVyLiBJdCBuZWVkcyB0byBiZSBhIHNpZ25hbCFcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBvdXRwdXQ7XHJcbiAgICAgICAgfSAgICAgIFxyXG4gICAgICAgXHJcbiAgICAgICAgbGV0IHJlc3VsdFhNOiBtYXRoLk1hdHJpeDtcclxuICAgICAgICBsZXQgcmVzdWx0WU06IG1hdGguTWF0cml4O1xyXG5cclxuICAgICAgICAvL2NoZWNrIGlmIGlucHV0IGlzIGEgbXVsdGlsaW5lIGV4cHJlc3Npb25cclxuICAgICAgICBsZXQgY2hlY2tSZXN1bHRTZXRYO1xyXG4gICAgICAgIGxldCBjaGVja1Jlc3VsdFNldFk7XHJcblxyXG4gICAgICAgIGlmKHJlc3VsdFguaGFzT3duUHJvcGVydHkoJ2VudHJpZXMnKSkge1xyXG4gICAgICAgICAgICBjaGVja1Jlc3VsdFNldFggPSByZXN1bHRYLmVudHJpZXNbMF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHJlc3VsdFkuaGFzT3duUHJvcGVydHkoJ2VudHJpZXMnKSkge1xyXG4gICAgICAgICAgICBjaGVja1Jlc3VsdFNldFkgPSByZXN1bHRZLmVudHJpZXNbMF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIGlmKEFycmF5LmlzQXJyYXkoY2hlY2tSZXN1bHRTZXRYKSl7XHJcbiAgICAgICAgICAgICAgICByZXN1bHRYTSA9IG1hdGgubWF0cml4KGNoZWNrUmVzdWx0U2V0WCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihjaGVja1Jlc3VsdFNldFggIT09IHVuZGVmaW5lZCAmJiBBcnJheS5pc0FycmF5KGNoZWNrUmVzdWx0U2V0WC5fZGF0YSkpe1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0WE0gPSBjaGVja1Jlc3VsdFNldFg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHJlc3VsdFhNID0gbWF0aC5tYXRyaXgocmVzdWx0WCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yKFwiRXJyb3IgaW4gZXhwcmVzc2lvbjogXCIgKyBzdHJpbmdEYXRhWCArIFwiIVxcblwiICsgZXJyb3IubmFtZSArIFwiOiBcIiArIGVycm9yLm1lc3NhZ2UgKyBcIiFcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBvdXRwdXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgICAgaWYoQXJyYXkuaXNBcnJheShjaGVja1Jlc3VsdFNldFkpKXtcclxuICAgICAgICAgICAgICAgIHJlc3VsdFlNID0gbWF0aC5tYXRyaXgoY2hlY2tSZXN1bHRTZXRZKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKGNoZWNrUmVzdWx0U2V0WSAhPT0gdW5kZWZpbmVkICYmIEFycmF5LmlzQXJyYXkoY2hlY2tSZXN1bHRTZXRZLl9kYXRhKSl7XHJcbiAgICAgICAgICAgICAgICByZXN1bHRZTSA9IGNoZWNrUmVzdWx0U2V0WTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0WU0gPSBtYXRoLm1hdHJpeChyZXN1bHRZKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3IoXCJFcnJvciBpbiBleHByZXNzaW9uOiBcIiArIHN0cmluZ0RhdGFZICsgXCIhXFxuXCIgKyBlcnJvci5uYW1lICsgXCI6IFwiICsgZXJyb3IubWVzc2FnZSArIFwiIVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIG91dHB1dDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vVmVyaWZ5IGlmIHRoZSBjYWxjdWxhdGlvbmRhdGEgaXMgdmFsaWRcclxuICAgICAgICBpZighQXJyYXkuaXNBcnJheShyZXN1bHRYTS5fZGF0YSkpe1xyXG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yQnlUeXBlKEVycm9yTWVzc2FnZVR5cGUuTWlzc2luZ09ySW52YWxpZElucHV0LCBbdGhpcy5pbnB1dFN0cmluZ1hOYW1lXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKENhbGN1bGF0b3JIZWxwZXIuYXJyYXlIYXNOYU5PckludmluaXR5VmFsdWVzKHJlc3VsdFhNLl9kYXRhKSl7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JCeVR5cGUoRXJyb3JNZXNzYWdlVHlwZS5Db250YWluc05hTk9ySW5maW5pdHksIFt0aGlzLmlucHV0U3RyaW5nWE5hbWVdKTtcclxuICAgICAgICAgICAgcmV0dXJuIG91dHB1dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYocmVzdWx0WE0uX3NpemUubGVuZ3RoICE9IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvcihcIkVycm9yIGluIGV4cHJlc3Npb246IFwiICsgc3RyaW5nRGF0YVggKyBcIiFcXG5FeHByZXNzaW9ucyByZXN1bHRpbmcgYSBtdWx0aWRpbWVuc2lvbmFsIHNpZ25hbCBhcmUgbm90IHN1cHBvcnRlZCFcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBvdXRwdXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCFBcnJheS5pc0FycmF5KHJlc3VsdFlNLl9kYXRhKSl7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JCeVR5cGUoRXJyb3JNZXNzYWdlVHlwZS5NaXNzaW5nT3JJbnZhbGlkSW5wdXQsIFt0aGlzLmlucHV0U3RyaW5nWU5hbWVdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoQ2FsY3VsYXRvckhlbHBlci5hcnJheUhhc05hTk9ySW52aW5pdHlWYWx1ZXMocmVzdWx0WU0uX2RhdGEpKXtcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvckJ5VHlwZShFcnJvck1lc3NhZ2VUeXBlLkNvbnRhaW5zTmFOT3JJbmZpbml0eSwgW3RoaXMuaW5wdXRTdHJpbmdZTmFtZV0pO1xyXG4gICAgICAgICAgICByZXR1cm4gb3V0cHV0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihyZXN1bHRZTS5fc2l6ZS5sZW5ndGggIT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yKFwiRXJyb3IgaW4gZXhwcmVzc2lvbjogXCIgKyBzdHJpbmdEYXRhWSArIFwiIVxcbkV4cHJlc3Npb25zIHJlc3VsdGluZyBhIG11bHRpZGltZW5zaW9uYWwgc2lnbmFsIGFyZSBub3Qgc3VwcG9ydGVkIVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIG91dHB1dDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG91dHB1dCA9IHRoaXMuZnJvbVR3b051bWJlckFycmF5VG9JUG9pbnRBcnJheShyZXN1bHRYTS5fZGF0YSwgcmVzdWx0WU0uX2RhdGEpO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIG91dHB1dDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJvdGVjdGVkIHZlcmlmeUNhbGN1bGF0aW9uT3V0cHV0RGF0YSgpIHsgLy9UaGlzIGNhbGN1bGF0b3IgYWxsb3dzIGZvciBzaWduYWwgZ2VuZXJhdGlvbiBhbmQgcmV0dXJucyBhIFlULXNpZ25hbC4gVGhlcmVmb3JlIHRoZSB0aW1lIG11c3QgYmUgc3RyaWN0bHkgbW9ub3RvbmljYWxseSBpbmNyZWFzaW5nLlxyXG4gICAgICAgIHN1cGVyLnZlcmlmeUNhbGN1bGF0aW9uT3V0cHV0RGF0YSgpO1xyXG5cclxuICAgICAgICBsZXQgY2FsY3VsYXRpb25PdXRwdXREYXRhQ29udGFpbmVyID0gdGhpcy5nZXRDYWxjdWxhdGlvbk91dHB1dERhdGFDb250YWluZXIoKTtcclxuXHJcbiAgICAgICAgY2FsY3VsYXRpb25PdXRwdXREYXRhQ29udGFpbmVyLmZvckVhY2goKGNhbGN1bGF0aW9uT3V0cHV0RGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYoIUNhbGN1bGF0b3JIZWxwZXIuaXNTdHJpY3RseU1vbm90b25pY2FsbHlJbmNyZWFzaW5nSW5UaW1lKGNhbGN1bGF0aW9uT3V0cHV0RGF0YS5kYXRhKSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JCeVR5cGUoRXJyb3JNZXNzYWdlVHlwZS5Ob3RTdHJpY3RseU1vbm90b25pY2FsbHlJbmNyZWFzaW5nSW5UaW1lLCBbY2FsY3VsYXRpb25PdXRwdXREYXRhLm5hbWVdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0ZSB0aGUgc3RyaW5nIHZhbHVlIHdpdGggbWF0aGpzIGxpYiBhbmQgbWF0Y2ggdG8gdGhlIGlucHV0c2lnbmFsIG9yIGNvbnN0YW50XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0clxyXG4gICAgICogQHBhcmFtIHtBcnJheTxJUG9pbnRbXSB8IG51bWJlcj59IHNpZ25hbERhdGFcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXIgfCBBcnJheTxudW1iZXI+fVxyXG4gICAgICogQG1lbWJlcm9mIFN0cmluZ01hdGhqc0NhbGN1bGF0b3JcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBldmFsdWF0ZVN0cmluZyhzdHI6IHN0cmluZywgc2lnbmFsRGF0YTogQXJyYXk8SVBvaW50W10gfCBudW1iZXI+KTogbnVtYmVyIHwgQXJyYXk8bnVtYmVyPiB8IE1hdGhqc011bHRpbGluZUlucHV0UmV0dXJuVHlwZXsgLy9yZXR1cm4gdHlwZXMgYXJlIGluY29ycmVjdC4gVE9ETzogc3dpdGNoIHRvIG1hdGhqcyByZXR1cm4gdHlwZXNcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBjb2RlID0gdGhpcy5fbWF0aEpTTGliLmxpbWl0ZWRQYXJzZShzdHIpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHNjb3BlID0ge1xyXG4gICAgICAgICAgICAgICAgYTogdGhpcy5nZXRTY29wZU9iamVjdE9yVmFsdWUoc2lnbmFsRGF0YVswXSksIFxyXG4gICAgICAgICAgICAgICAgYjogdGhpcy5nZXRTY29wZU9iamVjdE9yVmFsdWUoc2lnbmFsRGF0YVsxXSksIFxyXG4gICAgICAgICAgICAgICAgYzogdGhpcy5nZXRTY29wZU9iamVjdE9yVmFsdWUoc2lnbmFsRGF0YVsyXSksIFxyXG4gICAgICAgICAgICAgICAgZDogdGhpcy5nZXRTY29wZU9iamVjdE9yVmFsdWUoc2lnbmFsRGF0YVszXSksIFxyXG4gICAgICAgICAgICAgICAgZTogdGhpcy5nZXRTY29wZU9iamVjdE9yVmFsdWUoc2lnbmFsRGF0YVs0XSkgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGNvbXBpbGVkQ29kZSA9IGNvZGUuY29tcGlsZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gY29tcGlsZWRDb2RlLmV2YWx1YXRlKHNjb3BlKTsgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3IoXCJFcnJvciBpbiBleHByZXNzaW9uOiBcIiArIHN0ciArIFwiIVxcblwiICsgZXJyb3IubmFtZSArIFwiOiBcIiArIGVycm9yLm1lc3NhZ2UgKyBcIiFcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQXJyYXk8bnVtYmVyPigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHN1aXRhYmxlIG9iamVjdCBmb3IgdGhlIHNjb3BlXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtJUG9pbnRbXSB8IG51bWJlcn0gc2lnbmFsRGF0YVxyXG4gICAgICogQHJldHVybnMge2FueX1cclxuICAgICAqIEBtZW1iZXJvZiBTdHJpbmdNYXRoanNDYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0U2NvcGVPYmplY3RPclZhbHVlKHNpZ25hbERhdGE6IElQb2ludFtdIHwgbnVtYmVyKTogYW55IHsgXHJcbiAgICAgICAgaWYoc2lnbmFsRGF0YSAhPSB1bmRlZmluZWQgJiYgIUFycmF5LmlzQXJyYXkoc2lnbmFsRGF0YSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHNpZ25hbERhdGE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoc2lnbmFsRGF0YSAhPSB1bmRlZmluZWQgJiYgQXJyYXkuaXNBcnJheShzaWduYWxEYXRhKSkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuZnJvbUlQb2ludEFycmF5VG9OdW1iZXJBcnJheShzaWduYWxEYXRhLCBmYWxzZSksXHJcbiAgICAgICAgICAgICAgICB0aW1lOiB0aGlzLmZyb21JUG9pbnRBcnJheVRvTnVtYmVyQXJyYXkoc2lnbmFsRGF0YSwgdHJ1ZSksXHJcbiAgICAgICAgICAgICAgICBzYW1wbGVUaW1lOiBDYWxjdWxhdG9ySGVscGVyLmVzdGltYXRlU2FtcGxlVGltZShzaWduYWxEYXRhKVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgIC8qKlxyXG4gICAgICogQ29tYmluaW5nIHR3byBOdW1iZXIgQXJyYXlzIHNhbWUgbGVuZ3RoIHRvIGFuIElwb2ludCBBcnJheS5cclxuICAgICAqIElmIHRoZSB0d28gTnVtYmVyIEFycmF5cyBkb24ndCBoYXZlIHNhbWUgc2l6ZSBhbiBlbXB0eSBBcnJheSBnZXRzIHJldHVybmVkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gYXJyWFxyXG4gICAgICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBhcnJZXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8SVBvaW50Pn1cclxuICAgICAqIEBtZW1iZXJvZiBTdHJpbmdNYXRoanNDYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZnJvbVR3b051bWJlckFycmF5VG9JUG9pbnRBcnJheShhcnJYOiBBcnJheTxudW1iZXI+LCBhcnJZOiBBcnJheTxudW1iZXI+KTogQXJyYXk8SVBvaW50PnsgXHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGNvbWJpbmVkU2lnbmFsID0gbmV3IEFycmF5PElQb2ludD4oKTtcclxuXHJcbiAgICAgICAgaWYoYXJyWC5sZW5ndGggPT0gYXJyWS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGFyclgubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBwb2ludCA9IG5ldyBQb2ludChhcnJYW2ldLCBhcnJZW2ldKTtcclxuICAgICAgICAgICAgICAgIGNvbWJpbmVkU2lnbmFsLnB1c2gocG9pbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yKFwiQ2FsY3VsYXRpb24gRXJyb3I6IENhbGN1bGF0aW5nIHZhbHVlcyBhbmQgY2FsY3VsYXRpbmcgdGltZSBuZWVkIHRvIGhhdmUgdGhlIHNhbWUgbGVuZ3RoIVwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjb21iaW5lZFNpZ25hbDtcclxuICAgIH1cclxuXHJcbiAgICAgLyoqXHJcbiAgICAgKiBSZXR1cm5pbmcgZWl0aGVyIFgodHJ1ZSkgb3IgWShmYWxzZSkgVmFsdWVzIGFzIE51bWJlciBBcnJheVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElQb2ludD59IHNpZ25hbERhdGFcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNYICB0cnVlIHJldHVybnMgeCB2YWx1ZXMgYW5kIGZhbHNlIHJldHVybiB5IHZhbHVlc1xyXG4gICAgICogQHJldHVybnMge0FycmF5PG51bWJlcj59ICByZXR1cm5zIHggb3IgeSB2YWx1ZXMgYmFzZWQgb24gaXNYIHBhcmFtZXRlclxyXG4gICAgICogQG1lbWJlcm9mIFN0cmluZ01hdGhqc0NhbGN1bGF0b3JcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBmcm9tSVBvaW50QXJyYXlUb051bWJlckFycmF5KHNpZ25hbERhdGE6IEFycmF5PElQb2ludD4sIGlzWDogYm9vbGVhbik6IEFycmF5PG51bWJlcj57IFxyXG5cclxuICAgICAgICBsZXQgc3BsaXR0ZWRTaWduYWwgPSBuZXcgQXJyYXk8bnVtYmVyPigpO1xyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2lnbmFsRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZihpc1gpIHtcclxuICAgICAgICAgICAgICAgIHNwbGl0dGVkU2lnbmFsLnB1c2goc2lnbmFsRGF0YVtpXS54KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNwbGl0dGVkU2lnbmFsLnB1c2goc2lnbmFsRGF0YVtpXS55KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gc3BsaXR0ZWRTaWduYWw7XHJcbiAgICB9XHJcbn1cclxuXHJcbiJdfQ==