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
    var MulCalculator = /** @class */ (function (_super) {
        __extends(MulCalculator, _super);
        function MulCalculator() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.id = "multiplication";
            _this.displayName = "Multiplication a*b";
            _this.description = "Multiplies a signal by another signal or a constant value";
            _this.multiplicandName = "Multiplicand a";
            _this.multiplierName = "Multiplier b";
            return _this;
        }
        /**
         * Returns the default input data for this calculator
         *
         * @returns {(Array<CalculationDataNumber|CalculationDataPoints|CalculationDataNumberOrPoints>)}
         * @memberof MulCalculator
         */
        MulCalculator.prototype.getDefaultInputData = function () {
            var inputData = new Array();
            // add input params with default displaynames
            inputData.push(new calculationDataNumberOrPoints_1.CalculationDataNumberOrPoints(this.multiplicandName, 0, "The multiplicand", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            inputData.push(new calculationDataNumberOrPoints_1.CalculationDataNumberOrPoints(this.multiplierName, 0, "The multiplier", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            return inputData;
        };
        /**
         * Returns the default output data for this calculator
         *
         * @returns {Array<CalculationDataPoints>}
         * @memberof MulCalculator
         */
        MulCalculator.prototype.getDefaultOutputData = function () {
            var outputData = new Array();
            // add output params with default displaynames
            outputData.push(new calculationDataPoints_1.CalculationDataPoints("Output signal", "product", new Array()));
            return outputData;
        };
        /**
         * Calculates the product for the given input data
         *
         * @param {Array<ICalculationData>} inputData
         * @returns {Array<CalculationDataPoints>}
         * @memberof MulCalculator
         */
        MulCalculator.prototype.calculate = function (inputData) {
            this.clearErrors();
            var rawPoints = new Array();
            var outputData = new Array();
            outputData.push(new calculationDataPoints_1.CalculationDataPoints("Output signal", "product", new Array()));
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
            if (!this.isInputDataValid(inputNumber1, inputNumber2, inputSignalData1, inputSignalData2, this.multiplicandName, this.multiplierName)) {
                return outputData;
            }
            // Return if errors occurred
            if (this.getErrors().length > 0) {
                return outputData;
            }
            // calculate new data
            rawPoints = this.calculateRawPoints(inputNumber1, inputNumber2, inputSignalData1, inputSignalData2);
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
         * @memberof MulCalculator
         */
        MulCalculator.prototype.calculateRawPoints = function (inputNumber1, inputNumber2, inputSignalData1, inputSignalData2) {
            if (inputSignalData1 != undefined && inputSignalData2 != undefined) {
                return this.mulTwoSignals(inputSignalData1, inputSignalData2);
            }
            else if (inputSignalData1 != undefined && inputNumber2 != undefined) {
                return this.mulConstToSignal(inputSignalData1, inputNumber2);
            }
            else if (inputNumber1 != undefined && inputSignalData2 != undefined) {
                return this.mulConstToSignal(inputSignalData2, inputNumber1);
            }
            return new Array();
        };
        /**
         * Calculates output signal when input is Signal and Signal
         *
         * @private
         * @param {Array<IPoint>} inputSignal1
         * @param {Array<IPoint>} inputSignal2
         * @returns {Array<IPoint>}
         * @memberof MulCalculator
         */
        MulCalculator.prototype.mulTwoSignals = function (inputSignal1, inputSignal2) {
            var points = new Array();
            if (inputSignal1.length == inputSignal2.length) { // Add only signals with same sample count
                for (var i = 0; i < inputSignal1.length; i++) {
                    var newX = inputSignal1[i].x;
                    var newY = inputSignal1[i].y * inputSignal2[i].y;
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
         * Calculates output signal when input is Signal and Constant
         *
         * @private
         * @param {Array<IPoint>} inputSignal
         * @param {number} inputNumber
         * @returns {Array<IPoint>}
         * @memberof MulCalculator
         */
        MulCalculator.prototype.mulConstToSignal = function (inputSignal, inputNumber) {
            var points = new Array();
            for (var i = 0; i < inputSignal.length; i++) {
                var x = inputSignal[i].x;
                var y = inputSignal[i].y * inputNumber;
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
         * @memberof MulCalculator
         */
        MulCalculator.prototype.prepareInputData = function (inputData) {
            inputData = _super.prototype.prepareInputData.call(this, inputData);
            inputData = calculatorHelper_1.CalculatorHelper.tryFilterMatchingSignalParts(inputData);
            return inputData;
        };
        return MulCalculator;
    }(calculatorBase_1.CalculatorBase));
    exports.MulCalculator = MulCalculator;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsQ2FsY3VsYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRvcnMvbXVsQ2FsY3VsYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBV0E7UUFBbUMsaUNBQWM7UUFBakQ7WUFBQSxxRUEyS0M7WUF6S0csUUFBRSxHQUFXLGdCQUFnQixDQUFDO1lBQzlCLGlCQUFXLEdBQVcsb0JBQW9CLENBQUM7WUFDM0MsaUJBQVcsR0FBVywyREFBMkQsQ0FBQztZQUUxRSxzQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztZQUNwQyxvQkFBYyxHQUFHLGNBQWMsQ0FBQzs7UUFvSzVDLENBQUM7UUFsS0c7Ozs7O1dBS0c7UUFDSSwyQ0FBbUIsR0FBMUI7WUFDSSxJQUFJLFNBQVMsR0FBRyxJQUFJLEtBQUssRUFBNkUsQ0FBQztZQUN2Ryw2Q0FBNkM7WUFDN0MsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLDZEQUE2QixDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSx1REFBMEIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdJLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSw2REFBNkIsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLHVEQUEwQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekksT0FBTyxTQUFTLENBQUM7UUFDckIsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0ksNENBQW9CLEdBQTNCO1lBQ0ksSUFBSSxVQUFVLEdBQUcsSUFBSSxLQUFLLEVBQXlCLENBQUM7WUFDcEQsOENBQThDO1lBQzlDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFB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QyxDQUFDO2dCQUN6QixJQUFJLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQztnQkFDdkMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLGFBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNoQztZQUNELE9BQU8sTUFBTSxDQUFDO1FBQ2xCLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0ksd0NBQWdCLEdBQXZCLFVBQXdCLFNBQTJGO1lBRS9HLFNBQVMsR0FBRyxpQkFBTSxnQkFBZ0IsWUFBQyxTQUFTLENBQUMsQ0FBQztZQUM5QyxTQUFTLEdBQUcsbUNBQWdCLENBQUMsNEJBQTRCLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFckUsT0FBTyxTQUFTLENBQUM7UUFDckIsQ0FBQztRQUNMLG9CQUFDO0lBQUQsQ0FBQyxBQTNLRCxDQUFtQywrQkFBYyxHQTJLaEQ7SUEzS1ksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ2FsY3VsYXRvciB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2NhbGN1bGF0b3JJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSUNhbGN1bGF0aW9uRGF0YSB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2NhbGN1bGF0aW9uRGF0YUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9wb2ludEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuLi8uLi9wb2ludFwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFOdW1iZXIgfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhTnVtYmVyXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YVBvaW50cyB9IGZyb20gXCIuLi9jYWxjdWxhdGlvbkRhdGFQb2ludHNcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm8gfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm9cIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRvckJhc2UgfSBmcm9tIFwiLi9jYWxjdWxhdG9yQmFzZVwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cyB9IGZyb20gXCIuLi9jYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50c1wiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdG9ySGVscGVyIH0gZnJvbSBcIi4vY2FsY3VsYXRvckhlbHBlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE11bENhbGN1bGF0b3IgZXh0ZW5kcyBDYWxjdWxhdG9yQmFzZSBpbXBsZW1lbnRzIElDYWxjdWxhdG9ye1xyXG4gICAgXHJcbiAgICBpZDogc3RyaW5nID0gXCJtdWx0aXBsaWNhdGlvblwiO1xyXG4gICAgZGlzcGxheU5hbWU6IHN0cmluZyA9IFwiTXVsdGlwbGljYXRpb24gYSpiXCI7XHJcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nID0gXCJNdWx0aXBsaWVzIGEgc2lnbmFsIGJ5IGFub3RoZXIgc2lnbmFsIG9yIGEgY29uc3RhbnQgdmFsdWVcIjtcclxuXHJcbiAgICBwcml2YXRlIG11bHRpcGxpY2FuZE5hbWUgPSBcIk11bHRpcGxpY2FuZCBhXCI7XHJcbiAgICBwcml2YXRlIG11bHRpcGxpZXJOYW1lID0gXCJNdWx0aXBsaWVyIGJcIjtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IGlucHV0IGRhdGEgZm9yIHRoaXMgY2FsY3VsYXRvclxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsoQXJyYXk8Q2FsY3VsYXRpb25EYXRhTnVtYmVyfENhbGN1bGF0aW9uRGF0YVBvaW50c3xDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cz4pfVxyXG4gICAgICogQG1lbWJlcm9mIE11bENhbGN1bGF0b3JcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldERlZmF1bHRJbnB1dERhdGEoKTogQXJyYXk8Q2FsY3VsYXRpb25EYXRhTnVtYmVyfENhbGN1bGF0aW9uRGF0YVBvaW50c3xDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cz57XHJcbiAgICAgICAgbGV0IGlucHV0RGF0YSA9IG5ldyBBcnJheTxDYWxjdWxhdGlvbkRhdGFOdW1iZXJ8Q2FsY3VsYXRpb25EYXRhUG9pbnRzfENhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzPigpO1xyXG4gICAgICAgIC8vIGFkZCBpbnB1dCBwYXJhbXMgd2l0aCBkZWZhdWx0IGRpc3BsYXluYW1lc1xyXG4gICAgICAgIGlucHV0RGF0YS5wdXNoKG5ldyBDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cyh0aGlzLm11bHRpcGxpY2FuZE5hbWUsIDAsIFwiVGhlIG11bHRpcGxpY2FuZFwiLCBuZXcgQ2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm8oZmFsc2UsIHRydWUpKSk7XHJcbiAgICAgICAgaW5wdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzKHRoaXMubXVsdGlwbGllck5hbWUsIDAsIFwiVGhlIG11bHRpcGxpZXJcIiwgbmV3IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvKGZhbHNlLCB0cnVlKSkpO1xyXG4gICAgICAgIHJldHVybiBpbnB1dERhdGE7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBvdXRwdXQgZGF0YSBmb3IgdGhpcyBjYWxjdWxhdG9yXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0FycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz59XHJcbiAgICAgKiBAbWVtYmVyb2YgTXVsQ2FsY3VsYXRvclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0RGVmYXVsdE91dHB1dERhdGEoKTogQXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPntcclxuICAgICAgICBsZXQgb3V0cHV0RGF0YSA9IG5ldyBBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+KCk7XHJcbiAgICAgICAgLy8gYWRkIG91dHB1dCBwYXJhbXMgd2l0aCBkZWZhdWx0IGRpc3BsYXluYW1lc1xyXG4gICAgICAgIG91dHB1dERhdGEucHVzaChuZXcgQ2FsY3VsYXRpb25EYXRhUG9pbnRzKFwiT3V0cHV0IHNpZ25hbFwiLCBcInByb2R1Y3RcIiwgbmV3IEFycmF5PElQb2ludD4oKSkpOyBcclxuICAgICAgICByZXR1cm4gb3V0cHV0RGF0YTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0ZXMgdGhlIHByb2R1Y3QgZm9yIHRoZSBnaXZlbiBpbnB1dCBkYXRhXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxJQ2FsY3VsYXRpb25EYXRhPn0gaW5wdXREYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPn1cclxuICAgICAqIEBtZW1iZXJvZiBNdWxDYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIGNhbGN1bGF0ZShpbnB1dERhdGE6IEFycmF5PElDYWxjdWxhdGlvbkRhdGE+KTogQXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPiB7XHJcbiAgICAgICAgdGhpcy5jbGVhckVycm9ycygpO1xyXG5cclxuICAgICAgICBsZXQgcmF3UG9pbnRzID0gbmV3IEFycmF5PElQb2ludD4oKTtcclxuICAgICAgICBsZXQgb3V0cHV0RGF0YSA9IG5ldyBBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+KCk7XHJcbiAgICAgICAgb3V0cHV0RGF0YS5wdXNoKG5ldyBDYWxjdWxhdGlvbkRhdGFQb2ludHMoXCJPdXRwdXQgc2lnbmFsXCIsIFwicHJvZHVjdFwiLCBuZXcgQXJyYXk8SVBvaW50PigpKSk7IFxyXG4gICAgICAgIG91dHB1dERhdGFbMF0uc2V0RGF0YShyYXdQb2ludHMpOyAvLyBTZXQgZW1wdHkgcmF3IHBvaW50cyBsaXN0IGJ5IGRlZmF1bHRcclxuXHJcbiAgICAgICAgbGV0IGlucHV0TnVtYmVyMSA9IChpbnB1dERhdGFbMF0gYXMgQ2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHMpLmdldERhdGEoKTtcclxuICAgICAgICBsZXQgaW5wdXROdW1iZXIyID0gKGlucHV0RGF0YVsxXSBhcyBDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cykuZ2V0RGF0YSgpO1xyXG4gICAgICAgIGxldCBpbnB1dFNpZ25hbERhdGExOiBBcnJheTxJUG9pbnQ+fHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuICAgICAgICBsZXQgaW5wdXRTaWduYWxEYXRhMjogQXJyYXk8SVBvaW50Pnx1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgaWYoaW5wdXROdW1iZXIxIGluc3RhbmNlb2YgQXJyYXkpe1xyXG4gICAgICAgICAgICBpbnB1dFNpZ25hbERhdGExID0gaW5wdXROdW1iZXIxO1xyXG4gICAgICAgICAgICBpbnB1dE51bWJlcjEgPSBOYU47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGlucHV0TnVtYmVyMiBpbnN0YW5jZW9mIEFycmF5KXtcclxuICAgICAgICAgICAgaW5wdXRTaWduYWxEYXRhMiA9IGlucHV0TnVtYmVyMjtcclxuICAgICAgICAgICAgaW5wdXROdW1iZXIyID0gTmFOO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBDaGVjayBmb3IgdmFsaWQgaW5wdXQgZGF0YVxyXG4gICAgICAgIGlmKCF0aGlzLmlzSW5wdXREYXRhVmFsaWQoaW5wdXROdW1iZXIxLCBpbnB1dE51bWJlcjIsIGlucHV0U2lnbmFsRGF0YTEsIGlucHV0U2lnbmFsRGF0YTIsIHRoaXMubXVsdGlwbGljYW5kTmFtZSwgdGhpcy5tdWx0aXBsaWVyTmFtZSkpe1xyXG4gICAgICAgICAgICByZXR1cm4gb3V0cHV0RGF0YTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJldHVybiBpZiBlcnJvcnMgb2NjdXJyZWRcclxuICAgICAgICBpZih0aGlzLmdldEVycm9ycygpLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICByZXR1cm4gb3V0cHV0RGF0YTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGNhbGN1bGF0ZSBuZXcgZGF0YVxyXG4gICAgICAgIHJhd1BvaW50cyA9IHRoaXMuY2FsY3VsYXRlUmF3UG9pbnRzKGlucHV0TnVtYmVyMSwgaW5wdXROdW1iZXIyLCBpbnB1dFNpZ25hbERhdGExLCBpbnB1dFNpZ25hbERhdGEyKTtcclxuICAgICAgICBcclxuICAgICAgICBvdXRwdXREYXRhWzBdLnNldERhdGEocmF3UG9pbnRzKTtcclxuICAgICAgICByZXR1cm4gb3V0cHV0RGF0YTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0ZSBvdXRwdXQgc2lnbmFsIGRlcGVuZGluZyBvbiBpbnB1dCB0eXBlc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGlucHV0TnVtYmVyMVxyXG4gICAgICogQHBhcmFtIHsqfSBpbnB1dE51bWJlcjJcclxuICAgICAqIEBwYXJhbSB7KEFycmF5PElQb2ludD58dW5kZWZpbmVkKX0gaW5wdXRTaWduYWxEYXRhMVxyXG4gICAgICogQHBhcmFtIHsoQXJyYXk8SVBvaW50Pnx1bmRlZmluZWQpfSBpbnB1dFNpZ25hbERhdGEyXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8SVBvaW50Pn1cclxuICAgICAqIEBtZW1iZXJvZiBNdWxDYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2FsY3VsYXRlUmF3UG9pbnRzKGlucHV0TnVtYmVyMSwgaW5wdXROdW1iZXIyLCBpbnB1dFNpZ25hbERhdGExOiBBcnJheTxJUG9pbnQ+fHVuZGVmaW5lZCwgaW5wdXRTaWduYWxEYXRhMjogQXJyYXk8SVBvaW50Pnx1bmRlZmluZWQpIDogQXJyYXk8SVBvaW50PntcclxuICAgICAgICBpZihpbnB1dFNpZ25hbERhdGExICE9IHVuZGVmaW5lZCAmJiBpbnB1dFNpZ25hbERhdGEyICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm11bFR3b1NpZ25hbHMoaW5wdXRTaWduYWxEYXRhMSwgaW5wdXRTaWduYWxEYXRhMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoaW5wdXRTaWduYWxEYXRhMSAhPSB1bmRlZmluZWQgJiYgaW5wdXROdW1iZXIyICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm11bENvbnN0VG9TaWduYWwoaW5wdXRTaWduYWxEYXRhMSwgaW5wdXROdW1iZXIyIGFzIG51bWJlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoaW5wdXROdW1iZXIxICE9IHVuZGVmaW5lZCAmJiBpbnB1dFNpZ25hbERhdGEyICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm11bENvbnN0VG9TaWduYWwoaW5wdXRTaWduYWxEYXRhMiwgaW5wdXROdW1iZXIxIGFzIG51bWJlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgQXJyYXk8SVBvaW50PigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsY3VsYXRlcyBvdXRwdXQgc2lnbmFsIHdoZW4gaW5wdXQgaXMgU2lnbmFsIGFuZCBTaWduYWxcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxJUG9pbnQ+fSBpbnB1dFNpZ25hbDFcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SVBvaW50Pn0gaW5wdXRTaWduYWwyXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8SVBvaW50Pn1cclxuICAgICAqIEBtZW1iZXJvZiBNdWxDYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbXVsVHdvU2lnbmFscyhpbnB1dFNpZ25hbDE6IEFycmF5PElQb2ludD4sIGlucHV0U2lnbmFsMjogQXJyYXk8SVBvaW50Pik6IEFycmF5PElQb2ludD57XHJcbiAgICAgICAgbGV0IHBvaW50cyA9IG5ldyBBcnJheTxJUG9pbnQ+KCk7XHJcbiAgICAgICAgaWYoaW5wdXRTaWduYWwxLmxlbmd0aCA9PSBpbnB1dFNpZ25hbDIubGVuZ3RoKXsgLy8gQWRkIG9ubHkgc2lnbmFscyB3aXRoIHNhbWUgc2FtcGxlIGNvdW50XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBpbnB1dFNpZ25hbDEubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld1ggPSBpbnB1dFNpZ25hbDFbaV0ueDtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdZID0gaW5wdXRTaWduYWwxW2ldLnkgKiBpbnB1dFNpZ25hbDJbaV0ueTtcclxuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGlmIHNpZ25hbCB0d28gaGFzIHNhbWUgeCB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgaWYoaW5wdXRTaWduYWwyW2ldLnggPT0gbmV3WCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRzLnB1c2gobmV3IFBvaW50KG5ld1gsIG5ld1kpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQWRkIG9mIHR3byBkaWZmZXJlbnQgc2lnbmFscyhkaWZmZXJlbnQgeCB2YWx1ZXMpIGN1cnJlbnRseSBub3QgcG9zc2libGVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEVycm9yKFwiQ2FsY3VsYXRpb24gRXJyb3I6IFRoZSBpbnB1dCBzaWduYWxzIGRvbid0IGhhdmUgZXF1YWwgeCAodGltZSkgdmFsdWVzIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEFycmF5PElQb2ludD4oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yKFwiQ2FsY3VsYXRpb24gRXJyb3I6IFRoZSBpbnB1dCBzaWduYWxzIGRvbid0IGhhdmUgdGhlIHNhbWUgbnVtYmVyIG9mIHBvaW50cyFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwb2ludHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxjdWxhdGVzIG91dHB1dCBzaWduYWwgd2hlbiBpbnB1dCBpcyBTaWduYWwgYW5kIENvbnN0YW50XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SVBvaW50Pn0gaW5wdXRTaWduYWxcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbnB1dE51bWJlclxyXG4gICAgICogQHJldHVybnMge0FycmF5PElQb2ludD59XHJcbiAgICAgKiBAbWVtYmVyb2YgTXVsQ2FsY3VsYXRvclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG11bENvbnN0VG9TaWduYWwoaW5wdXRTaWduYWw6IEFycmF5PElQb2ludD4sIGlucHV0TnVtYmVyOiBudW1iZXIpOiBBcnJheTxJUG9pbnQ+e1xyXG4gICAgICAgIGxldCBwb2ludHMgPSBuZXcgQXJyYXk8SVBvaW50PigpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9MDsgaSA8IGlucHV0U2lnbmFsLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IHggPSBpbnB1dFNpZ25hbFtpXS54O1xyXG4gICAgICAgICAgICBsZXQgeSA9IGlucHV0U2lnbmFsW2ldLnkgKiBpbnB1dE51bWJlcjtcclxuICAgICAgICAgICAgcG9pbnRzLnB1c2gobmV3IFBvaW50KHgsIHkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBvaW50cztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFBlcmZvcm1zIG9wdGlvbmFsIHByZXBlcmF0aW9uIG9mIGlucHV0IGRhdGEuXHJcbiAgICAgKiBGaWx0ZXJzIGlucHV0IHNpZ25hbHMgZm9yIG1hdGNoaW5nIHNpZ25hbCBwYXJ0cyAoc2FtcGxlcyB3aXRoIG1hdGNoaW5nIHRpbWVzdGFtcHMpLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7KEFycmF5PENhbGN1bGF0aW9uRGF0YU51bWJlcnxDYWxjdWxhdGlvbkRhdGFQb2ludHN8Q2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHM+KX0gaW5wdXREYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7KEFycmF5PENhbGN1bGF0aW9uRGF0YU51bWJlcnxDYWxjdWxhdGlvbkRhdGFQb2ludHN8Q2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHM+KX1cclxuICAgICAqIEBtZW1iZXJvZiBNdWxDYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBwcmVwYXJlSW5wdXREYXRhKGlucHV0RGF0YTogQXJyYXk8Q2FsY3VsYXRpb25EYXRhTnVtYmVyfENhbGN1bGF0aW9uRGF0YVBvaW50c3xDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cz4pOiBBcnJheTxDYWxjdWxhdGlvbkRhdGFOdW1iZXJ8Q2FsY3VsYXRpb25EYXRhUG9pbnRzfENhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzPiB7XHJcblxyXG4gICAgICAgIGlucHV0RGF0YSA9IHN1cGVyLnByZXBhcmVJbnB1dERhdGEoaW5wdXREYXRhKTtcclxuICAgICAgICBpbnB1dERhdGEgPSBDYWxjdWxhdG9ySGVscGVyLnRyeUZpbHRlck1hdGNoaW5nU2lnbmFsUGFydHMoaW5wdXREYXRhKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGlucHV0RGF0YTtcclxuICAgIH1cclxufSJdfQ==