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
define(["require", "exports", "../../point", "../calculationDataPoints", "../calculationDataDisplayInfo", "./calculatorBase", "../calculationDataNumberOrPoints", "./calculatorHelper"], function (require, exports, point_1, calculationDataPoints_1, calculationDataDisplayInfo_1, calculatorBase_1, calculationDataNumberOrPoints_1, calculatorHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MinCalculator = /** @class */ (function (_super) {
        __extends(MinCalculator, _super);
        function MinCalculator() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.id = "min";
            _this.displayName = "Min (a,b)";
            _this.description = "Minimum value between two signals or one signal and one constant";
            _this.inputSignalName1 = "Input signal/constant a";
            _this.inputSignalName2 = "Input signal/constant b";
            return _this;
        }
        /**
         * Returns the default input data for this calculator
         *
         * @returns {(Array<CalculationDataNumber|CalculationDataPoints|CalculationDataNumberOrPoints>)}
         * @memberof MinCalculator
         */
        MinCalculator.prototype.getDefaultInputData = function () {
            var inputData = new Array();
            // add input params with default displaynames
            inputData.push(new calculationDataNumberOrPoints_1.CalculationDataNumberOrPoints(this.inputSignalName1, 0, "Signal or constant a", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            inputData.push(new calculationDataNumberOrPoints_1.CalculationDataNumberOrPoints(this.inputSignalName2, 0, "Signal or constant b", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            return inputData;
        };
        /**
         * Returns the default output data for this calculator
         *
         * @returns {Array<CalculationDataPoints>}
         * @memberof MinCalculator
         */
        MinCalculator.prototype.getDefaultOutputData = function () {
            var outputData = new Array();
            // add output params with default displaynames
            outputData.push(new calculationDataPoints_1.CalculationDataPoints("Output signal", "min", new Array()));
            return outputData;
        };
        /**
         * Calculates output data for the given inputs
         *
         * @param {Array<ICalculationData>} inputData
         * @returns {Array<CalculationDataPoints>}
         * @memberof MinCalculator
         */
        MinCalculator.prototype.calculate = function (inputData) {
            this.clearErrors();
            var rawPoints = new Array();
            var outputData = new Array();
            outputData.push(new calculationDataPoints_1.CalculationDataPoints("Output signal", "min", new Array()));
            outputData[0].setData(rawPoints); // Set empty raw points list by default
            var inputNumber1 = inputData[0].getData();
            var inputNumber2 = inputData[1].getData();
            var inputSignalData1 = undefined;
            var inputSignalData2 = undefined;
            if (inputNumber1 instanceof Array) {
                inputSignalData1 = inputNumber1;
                inputNumber1 = NaN;
            }
            if (inputNumber2 instanceof Array) {
                inputSignalData2 = inputNumber2;
                inputNumber2 = NaN;
            }
            // Check for valid input data
            if (!this.isInputDataValid(inputNumber1, inputNumber2, inputSignalData1, inputSignalData2, this.inputSignalName1, this.inputSignalName2)) {
                return outputData;
            }
            // Return if errors occurred
            if (this.getErrors().length > 0) {
                return outputData;
            }
            // calculate new data
            rawPoints = this.calculateRawPoints(inputNumber1, inputNumber2, inputSignalData1, inputSignalData2);
            // Set new outputdata
            outputData[0].setData(rawPoints);
            return outputData;
        };
        /**
         * Calculate output signal depending on input types
         *
         * @private
         * @param {*} inputNumber1
         * @param {*} inputNumber2
         * @param {(Array<IPoint>|undefined)} inputSignalData1
         * @param {(Array<IPoint>|undefined)} inputSignalData2
         * @returns {Array<IPoint>}
         * @memberof MinCalculator
         */
        MinCalculator.prototype.calculateRawPoints = function (inputNumber1, inputNumber2, inputSignalData1, inputSignalData2) {
            if (inputSignalData1 != undefined && inputSignalData2 != undefined) {
                return this.minTwoSignals(inputSignalData1, inputSignalData2);
            }
            else if (inputSignalData1 != undefined && inputNumber2 != undefined) {
                return this.minConstToSignal(inputSignalData1, inputNumber2);
            }
            else if (inputNumber1 != undefined && inputSignalData2 != undefined) {
                return this.minConstToSignal(inputSignalData2, inputNumber1);
            }
            return new Array();
        };
        /**
         * Calculates output signal when input is Signal + Signal
         *
         * @private
         * @param {Array<IPoint>} inputSignal1
         * @param {Array<IPoint>} inputSignal2
         * @returns {Array<IPoint>}
         * @memberof MinCalculator
         */
        MinCalculator.prototype.minTwoSignals = function (inputSignal1, inputSignal2) {
            var points = new Array();
            if (inputSignal1.length == inputSignal2.length) { // Add only signals with same sample count
                for (var i = 0; i < inputSignal1.length; i++) {
                    var newX = inputSignal1[i].x;
                    var newY = inputSignal1[i].y;
                    if (newY > inputSignal2[i].y) {
                        newY = inputSignal2[i].y;
                    }
                    // check if signal two has same x value
                    if (inputSignal2[i].x == newX) {
                        points.push(new point_1.Point(newX, newY));
                    }
                    else {
                        // Add of two different signals(different x values) currently not possible
                        this.addError("Calculation Error: The input signals don't have equal x (time) values!");
                        return new Array();
                    }
                }
            }
            else {
                this.addError("Calculation Error: The input signals don't have the same number of points!");
            }
            return points;
        };
        /**
         * Calculates output signal when input is Signal + Constant
         *
         * @private
         * @param {Array<IPoint>} inputSignal
         * @param {number} inputNumber
         * @returns {Array<IPoint>}
         * @memberof MinCalculator
         */
        MinCalculator.prototype.minConstToSignal = function (inputSignal, inputNumber) {
            var points = new Array();
            for (var i = 0; i < inputSignal.length; i++) {
                var x = inputSignal[i].x;
                var y = inputSignal[i].y;
                if (y > inputNumber) {
                    y = inputNumber;
                }
                points.push(new point_1.Point(x, y));
            }
            return points;
        };
        /**
         * Performs optional preperation of input data.
         * Filters input signals for matching signal parts (samples with matching timestamps).
         *
         * @param {(Array<CalculationDataNumber|CalculationDataPoints|CalculationDataNumberOrPoints>)} inputData
         * @returns {(Array<CalculationDataNumber|CalculationDataPoints|CalculationDataNumberOrPoints>)}
         * @memberof MinCalculator
         */
        MinCalculator.prototype.prepareInputData = function (inputData) {
            inputData = _super.prototype.prepareInputData.call(this, inputData);
            inputData = calculatorHelper_1.CalculatorHelper.tryFilterMatchingSignalParts(inputData);
            return inputData;
        };
        return MinCalculator;
    }(calculatorBase_1.CalculatorBase));
    exports.MinCalculator = MinCalculator;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluQ2FsY3VsYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRvcnMvbWluQ2FsY3VsYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBV0E7UUFBbUMsaUNBQWM7UUFBakQ7WUFBQSxxRUFpTEM7WUEvS0csUUFBRSxHQUFXLEtBQUssQ0FBQztZQUNuQixpQkFBVyxHQUFXLFdBQVcsQ0FBQztZQUNsQyxpQkFBVyxHQUFXLGtFQUFrRSxDQUFDO1lBRWpGLHNCQUFnQixHQUFVLHlCQUF5QixDQUFDO1lBQ3BELHNCQUFnQixHQUFVLHlCQUF5QixDQUFDOztRQTBLaEUsQ0FBQztRQXhLRzs7Ozs7V0FLRztRQUNJLDJDQUFtQixHQUExQjtZQUNJLElBQUksU0FBUyxHQUFHLElBQUksS0FBSyxFQUE2RSxDQUFDO1lBQ3ZHLDZDQUE2QztZQUM3QyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksNkRBQTZCLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsRUFBRSxzQkFBc0IsRUFBRSxJQUFJLHVEQUEwQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakosU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLDZEQUE2QixDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLEVBQUUsc0JBQXNCLEVBQUUsSUFBSSx1REFBMEIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pKLE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNJLDRDQUFvQixHQUEzQjtZQUNJLElBQUksVUFBVSxHQUFHLElBQUksS0FBSyxFQUF5QixDQUFDO1lBQ3BELDhDQUE4QztZQUM5QyxVQUFVLENBQUMsSUFBSSxDQUFDLElB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LENBQUMsR0FBRyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUN0QyxJQUFJLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixJQUFJLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixJQUFJLENBQUMsR0FBRyxXQUFXLEVBQUU7b0JBQ2pCLENBQUMsR0FBRyxXQUFXLENBQUM7aUJBQ25CO2dCQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxhQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDaEM7WUFDRCxPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNJLHdDQUFnQixHQUF2QixVQUF3QixTQUEyRjtZQUUvRyxTQUFTLEdBQUcsaUJBQU0sZ0JBQWdCLFlBQUMsU0FBUyxDQUFDLENBQUM7WUFDOUMsU0FBUyxHQUFHLG1DQUFnQixDQUFDLDRCQUE0QixDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRXJFLE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFDTCxvQkFBQztJQUFELENBQUMsQUFqTEQsQ0FBbUMsK0JBQWMsR0FpTGhEO0lBakxZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUNhbGN1bGF0b3IgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9jYWxjdWxhdG9ySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElDYWxjdWxhdGlvbkRhdGEgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9jYWxjdWxhdGlvbkRhdGFJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi4vLi4vcG9pbnRcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhTnVtYmVyIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YU51bWJlclwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFQb2ludHMgfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhUG9pbnRzXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0b3JCYXNlIH0gZnJvbSBcIi4vY2FsY3VsYXRvckJhc2VcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHMgfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHNcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRvckhlbHBlciB9IGZyb20gXCIuL2NhbGN1bGF0b3JIZWxwZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBNaW5DYWxjdWxhdG9yIGV4dGVuZHMgQ2FsY3VsYXRvckJhc2UgaW1wbGVtZW50cyBJQ2FsY3VsYXRvcntcclxuICAgIFxyXG4gICAgaWQ6IHN0cmluZyA9IFwibWluXCI7XHJcbiAgICBkaXNwbGF5TmFtZTogc3RyaW5nID0gXCJNaW4gKGEsYilcIjtcclxuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmcgPSBcIk1pbmltdW0gdmFsdWUgYmV0d2VlbiB0d28gc2lnbmFscyBvciBvbmUgc2lnbmFsIGFuZCBvbmUgY29uc3RhbnRcIjtcclxuXHJcbiAgICBwcml2YXRlIGlucHV0U2lnbmFsTmFtZTE6c3RyaW5nID0gXCJJbnB1dCBzaWduYWwvY29uc3RhbnQgYVwiO1xyXG4gICAgcHJpdmF0ZSBpbnB1dFNpZ25hbE5hbWUyOnN0cmluZyA9IFwiSW5wdXQgc2lnbmFsL2NvbnN0YW50IGJcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgaW5wdXQgZGF0YSBmb3IgdGhpcyBjYWxjdWxhdG9yXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyhBcnJheTxDYWxjdWxhdGlvbkRhdGFOdW1iZXJ8Q2FsY3VsYXRpb25EYXRhUG9pbnRzfENhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzPil9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWluQ2FsY3VsYXRvclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0RGVmYXVsdElucHV0RGF0YSgpOiBBcnJheTxDYWxjdWxhdGlvbkRhdGFOdW1iZXJ8Q2FsY3VsYXRpb25EYXRhUG9pbnRzfENhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzPntcclxuICAgICAgICBsZXQgaW5wdXREYXRhID0gbmV3IEFycmF5PENhbGN1bGF0aW9uRGF0YU51bWJlcnxDYWxjdWxhdGlvbkRhdGFQb2ludHN8Q2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHM+KCk7XHJcbiAgICAgICAgLy8gYWRkIGlucHV0IHBhcmFtcyB3aXRoIGRlZmF1bHQgZGlzcGxheW5hbWVzXHJcbiAgICAgICAgaW5wdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzKHRoaXMuaW5wdXRTaWduYWxOYW1lMSwgMCwgXCJTaWduYWwgb3IgY29uc3RhbnQgYVwiLCBuZXcgQ2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm8oZmFsc2UsIHRydWUpKSk7XHJcbiAgICAgICAgaW5wdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzKHRoaXMuaW5wdXRTaWduYWxOYW1lMiwgMCwgXCJTaWduYWwgb3IgY29uc3RhbnQgYlwiLCBuZXcgQ2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm8oZmFsc2UsIHRydWUpKSk7XHJcbiAgICAgICAgcmV0dXJuIGlucHV0RGF0YTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IG91dHB1dCBkYXRhIGZvciB0aGlzIGNhbGN1bGF0b3JcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPn1cclxuICAgICAqIEBtZW1iZXJvZiBNaW5DYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXREZWZhdWx0T3V0cHV0RGF0YSgpOiBBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+e1xyXG4gICAgICAgIGxldCBvdXRwdXREYXRhID0gbmV3IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz4oKTtcclxuICAgICAgICAvLyBhZGQgb3V0cHV0IHBhcmFtcyB3aXRoIGRlZmF1bHQgZGlzcGxheW5hbWVzXHJcbiAgICAgICAgb3V0cHV0RGF0YS5wdXNoKG5ldyBDYWxjdWxhdGlvbkRhdGFQb2ludHMoXCJPdXRwdXQgc2lnbmFsXCIsIFwibWluXCIsIG5ldyBBcnJheTxJUG9pbnQ+KCkpKTsgXHJcbiAgICAgICAgcmV0dXJuIG91dHB1dERhdGE7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsY3VsYXRlcyBvdXRwdXQgZGF0YSBmb3IgdGhlIGdpdmVuIGlucHV0c1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SUNhbGN1bGF0aW9uRGF0YT59IGlucHV0RGF0YVxyXG4gICAgICogQHJldHVybnMge0FycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWluQ2FsY3VsYXRvclxyXG4gICAgICovXHJcbiAgICBjYWxjdWxhdGUoaW5wdXREYXRhOiBBcnJheTxJQ2FsY3VsYXRpb25EYXRhPik6IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz4ge1xyXG4gICAgICAgIHRoaXMuY2xlYXJFcnJvcnMoKTtcclxuXHJcbiAgICAgICAgbGV0IHJhd1BvaW50cyA9IG5ldyBBcnJheTxJUG9pbnQ+KCk7XHJcbiAgICAgICAgbGV0IG91dHB1dERhdGEgPSBuZXcgQXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPigpO1xyXG4gICAgICAgIG91dHB1dERhdGEucHVzaChuZXcgQ2FsY3VsYXRpb25EYXRhUG9pbnRzKFwiT3V0cHV0IHNpZ25hbFwiLCBcIm1pblwiLCBuZXcgQXJyYXk8SVBvaW50PigpKSk7IFxyXG4gICAgICAgIG91dHB1dERhdGFbMF0uc2V0RGF0YShyYXdQb2ludHMpOyAvLyBTZXQgZW1wdHkgcmF3IHBvaW50cyBsaXN0IGJ5IGRlZmF1bHRcclxuXHJcbiAgICAgICAgbGV0IGlucHV0TnVtYmVyMSA9IChpbnB1dERhdGFbMF0gYXMgQ2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHMpLmdldERhdGEoKTtcclxuICAgICAgICBsZXQgaW5wdXROdW1iZXIyID0gKGlucHV0RGF0YVsxXSBhcyBDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cykuZ2V0RGF0YSgpO1xyXG4gICAgICAgIGxldCBpbnB1dFNpZ25hbERhdGExOiBBcnJheTxJUG9pbnQ+fHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuICAgICAgICBsZXQgaW5wdXRTaWduYWxEYXRhMjogQXJyYXk8SVBvaW50Pnx1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgaWYoaW5wdXROdW1iZXIxIGluc3RhbmNlb2YgQXJyYXkpe1xyXG4gICAgICAgICAgICBpbnB1dFNpZ25hbERhdGExID0gaW5wdXROdW1iZXIxO1xyXG4gICAgICAgICAgICBpbnB1dE51bWJlcjEgPSBOYU47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGlucHV0TnVtYmVyMiBpbnN0YW5jZW9mIEFycmF5KXtcclxuICAgICAgICAgICAgaW5wdXRTaWduYWxEYXRhMiA9IGlucHV0TnVtYmVyMjtcclxuICAgICAgICAgICAgaW5wdXROdW1iZXIyID0gTmFOO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBDaGVjayBmb3IgdmFsaWQgaW5wdXQgZGF0YVxyXG4gICAgICAgIGlmKCF0aGlzLmlzSW5wdXREYXRhVmFsaWQoaW5wdXROdW1iZXIxLCBpbnB1dE51bWJlcjIsIGlucHV0U2lnbmFsRGF0YTEsIGlucHV0U2lnbmFsRGF0YTIsIHRoaXMuaW5wdXRTaWduYWxOYW1lMSwgdGhpcy5pbnB1dFNpZ25hbE5hbWUyKSl7XHJcbiAgICAgICAgICAgIHJldHVybiBvdXRwdXREYXRhO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmV0dXJuIGlmIGVycm9ycyBvY2N1cnJlZFxyXG4gICAgICAgIGlmKHRoaXMuZ2V0RXJyb3JzKCkubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIHJldHVybiBvdXRwdXREYXRhO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjYWxjdWxhdGUgbmV3IGRhdGFcclxuICAgICAgICByYXdQb2ludHMgPSB0aGlzLmNhbGN1bGF0ZVJhd1BvaW50cyhpbnB1dE51bWJlcjEsIGlucHV0TnVtYmVyMiwgaW5wdXRTaWduYWxEYXRhMSwgaW5wdXRTaWduYWxEYXRhMik7XHJcblxyXG4gICAgICAgIC8vIFNldCBuZXcgb3V0cHV0ZGF0YVxyXG4gICAgICAgIG91dHB1dERhdGFbMF0uc2V0RGF0YShyYXdQb2ludHMpO1xyXG4gICAgICAgIHJldHVybiBvdXRwdXREYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsY3VsYXRlIG91dHB1dCBzaWduYWwgZGVwZW5kaW5nIG9uIGlucHV0IHR5cGVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gaW5wdXROdW1iZXIxXHJcbiAgICAgKiBAcGFyYW0geyp9IGlucHV0TnVtYmVyMlxyXG4gICAgICogQHBhcmFtIHsoQXJyYXk8SVBvaW50Pnx1bmRlZmluZWQpfSBpbnB1dFNpZ25hbERhdGExXHJcbiAgICAgKiBAcGFyYW0geyhBcnJheTxJUG9pbnQ+fHVuZGVmaW5lZCl9IGlucHV0U2lnbmFsRGF0YTJcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxJUG9pbnQ+fVxyXG4gICAgICogQG1lbWJlcm9mIE1pbkNhbGN1bGF0b3JcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVSYXdQb2ludHMoaW5wdXROdW1iZXIxLCBpbnB1dE51bWJlcjIsIGlucHV0U2lnbmFsRGF0YTE6IEFycmF5PElQb2ludD58dW5kZWZpbmVkLCBpbnB1dFNpZ25hbERhdGEyOiBBcnJheTxJUG9pbnQ+fHVuZGVmaW5lZCkgOiBBcnJheTxJUG9pbnQ+e1xyXG4gICAgICAgIGlmKGlucHV0U2lnbmFsRGF0YTEgIT0gdW5kZWZpbmVkICYmIGlucHV0U2lnbmFsRGF0YTIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWluVHdvU2lnbmFscyhpbnB1dFNpZ25hbERhdGExLCBpbnB1dFNpZ25hbERhdGEyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihpbnB1dFNpZ25hbERhdGExICE9IHVuZGVmaW5lZCAmJiBpbnB1dE51bWJlcjIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWluQ29uc3RUb1NpZ25hbChpbnB1dFNpZ25hbERhdGExLCBpbnB1dE51bWJlcjIgYXMgbnVtYmVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihpbnB1dE51bWJlcjEgIT0gdW5kZWZpbmVkICYmIGlucHV0U2lnbmFsRGF0YTIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWluQ29uc3RUb1NpZ25hbChpbnB1dFNpZ25hbERhdGEyLCBpbnB1dE51bWJlcjEgYXMgbnVtYmVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBBcnJheTxJUG9pbnQ+KCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0ZXMgb3V0cHV0IHNpZ25hbCB3aGVuIGlucHV0IGlzIFNpZ25hbCArIFNpZ25hbFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElQb2ludD59IGlucHV0U2lnbmFsMVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxJUG9pbnQ+fSBpbnB1dFNpZ25hbDJcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxJUG9pbnQ+fVxyXG4gICAgICogQG1lbWJlcm9mIE1pbkNhbGN1bGF0b3JcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBtaW5Ud29TaWduYWxzKGlucHV0U2lnbmFsMTogQXJyYXk8SVBvaW50PiwgaW5wdXRTaWduYWwyOiBBcnJheTxJUG9pbnQ+KTogQXJyYXk8SVBvaW50PntcclxuICAgICAgICBsZXQgcG9pbnRzID0gbmV3IEFycmF5PElQb2ludD4oKTtcclxuICAgICAgICBpZihpbnB1dFNpZ25hbDEubGVuZ3RoID09IGlucHV0U2lnbmFsMi5sZW5ndGgpeyAvLyBBZGQgb25seSBzaWduYWxzIHdpdGggc2FtZSBzYW1wbGUgY291bnRcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGlucHV0U2lnbmFsMS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3WCA9IGlucHV0U2lnbmFsMVtpXS54O1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld1kgPSBpbnB1dFNpZ25hbDFbaV0ueTtcclxuICAgICAgICAgICAgICAgIGlmIChuZXdZID4gaW5wdXRTaWduYWwyW2ldLnkpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXdZID0gaW5wdXRTaWduYWwyW2ldLnk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiBzaWduYWwgdHdvIGhhcyBzYW1lIHggdmFsdWVcclxuICAgICAgICAgICAgICAgIGlmKGlucHV0U2lnbmFsMltpXS54ID09IG5ld1gpe1xyXG4gICAgICAgICAgICAgICAgICAgIHBvaW50cy5wdXNoKG5ldyBQb2ludChuZXdYLCBuZXdZKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEFkZCBvZiB0d28gZGlmZmVyZW50IHNpZ25hbHMoZGlmZmVyZW50IHggdmFsdWVzKSBjdXJyZW50bHkgbm90IHBvc3NpYmxlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRFcnJvcihcIkNhbGN1bGF0aW9uIEVycm9yOiBUaGUgaW5wdXQgc2lnbmFscyBkb24ndCBoYXZlIGVxdWFsIHggKHRpbWUpIHZhbHVlcyFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBBcnJheTxJUG9pbnQ+KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvcihcIkNhbGN1bGF0aW9uIEVycm9yOiBUaGUgaW5wdXQgc2lnbmFscyBkb24ndCBoYXZlIHRoZSBzYW1lIG51bWJlciBvZiBwb2ludHMhXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcG9pbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsY3VsYXRlcyBvdXRwdXQgc2lnbmFsIHdoZW4gaW5wdXQgaXMgU2lnbmFsICsgQ29uc3RhbnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxJUG9pbnQ+fSBpbnB1dFNpZ25hbFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGlucHV0TnVtYmVyXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8SVBvaW50Pn1cclxuICAgICAqIEBtZW1iZXJvZiBNaW5DYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbWluQ29uc3RUb1NpZ25hbChpbnB1dFNpZ25hbDogQXJyYXk8SVBvaW50PiwgaW5wdXROdW1iZXI6IG51bWJlcik6IEFycmF5PElQb2ludD57XHJcbiAgICAgICAgbGV0IHBvaW50cyA9IG5ldyBBcnJheTxJUG9pbnQ+KCk7XHJcbiAgICAgICAgZm9yKGxldCBpID0wOyBpIDwgaW5wdXRTaWduYWwubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgeCA9IGlucHV0U2lnbmFsW2ldLng7XHJcbiAgICAgICAgICAgIGxldCB5ID0gaW5wdXRTaWduYWxbaV0ueTtcclxuICAgICAgICAgICAgaWYgKHkgPiBpbnB1dE51bWJlcikge1xyXG4gICAgICAgICAgICAgICAgeSA9IGlucHV0TnVtYmVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHBvaW50cy5wdXNoKG5ldyBQb2ludCh4LCB5KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwb2ludHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQZXJmb3JtcyBvcHRpb25hbCBwcmVwZXJhdGlvbiBvZiBpbnB1dCBkYXRhLlxyXG4gICAgICogRmlsdGVycyBpbnB1dCBzaWduYWxzIGZvciBtYXRjaGluZyBzaWduYWwgcGFydHMgKHNhbXBsZXMgd2l0aCBtYXRjaGluZyB0aW1lc3RhbXBzKS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyhBcnJheTxDYWxjdWxhdGlvbkRhdGFOdW1iZXJ8Q2FsY3VsYXRpb25EYXRhUG9pbnRzfENhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzPil9IGlucHV0RGF0YVxyXG4gICAgICogQHJldHVybnMgeyhBcnJheTxDYWxjdWxhdGlvbkRhdGFOdW1iZXJ8Q2FsY3VsYXRpb25EYXRhUG9pbnRzfENhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzPil9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWluQ2FsY3VsYXRvclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcHJlcGFyZUlucHV0RGF0YShpbnB1dERhdGE6IEFycmF5PENhbGN1bGF0aW9uRGF0YU51bWJlcnxDYWxjdWxhdGlvbkRhdGFQb2ludHN8Q2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHM+KTogQXJyYXk8Q2FsY3VsYXRpb25EYXRhTnVtYmVyfENhbGN1bGF0aW9uRGF0YVBvaW50c3xDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cz4ge1xyXG5cclxuICAgICAgICBpbnB1dERhdGEgPSBzdXBlci5wcmVwYXJlSW5wdXREYXRhKGlucHV0RGF0YSk7XHJcbiAgICAgICAgaW5wdXREYXRhID0gQ2FsY3VsYXRvckhlbHBlci50cnlGaWx0ZXJNYXRjaGluZ1NpZ25hbFBhcnRzKGlucHV0RGF0YSk7XHJcblxyXG4gICAgICAgIHJldHVybiBpbnB1dERhdGE7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuXHJcbiJdfQ==