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
define(["require", "exports", "../../point", "../calculationDataPoints", "../calculationDataNumberOrPoints", "../calculationDataDisplayInfo", "./calculatorBase", "./calculatorHelper"], function (require, exports, point_1, calculationDataPoints_1, calculationDataNumberOrPoints_1, calculationDataDisplayInfo_1, calculatorBase_1, calculatorHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AddCalculator = /** @class */ (function (_super) {
        __extends(AddCalculator, _super);
        /**
         * Creates an instance of AddCalculator.
         * @memberof AddCalculator
         */
        function AddCalculator() {
            var _this = _super.call(this) || this;
            _this.id = "add";
            _this.displayName = "Addition a+b";
            _this.description = "Addition of two signals or one signal with a constant value";
            _this.summand1Name = "Summand a";
            _this.summand2Name = "Summand b";
            return _this;
        }
        /**
         * Returns the default input data for this calculator
         *
         * @returns {(Array<CalculationDataNumber|CalculationDataPoints|CalculationDataNumberOrPoints>)}
         * @memberof AddCalculator
         */
        AddCalculator.prototype.getDefaultInputData = function () {
            var inputData = new Array();
            // add input params with default displaynames
            inputData.push(new calculationDataNumberOrPoints_1.CalculationDataNumberOrPoints(this.summand1Name, 0, "The first summand", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            inputData.push(new calculationDataNumberOrPoints_1.CalculationDataNumberOrPoints(this.summand2Name, 0, "The second summand", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            return inputData;
        };
        /**
         * Returns the default output data for this calculator
         *
         * @returns {Array<CalculationDataPoints>}
         * @memberof AddCalculator
         */
        AddCalculator.prototype.getDefaultOutputData = function () {
            var outputData = new Array();
            // add output params with default displaynames
            outputData.push(new calculationDataPoints_1.CalculationDataPoints("Output signal", "sum", new Array()));
            return outputData;
        };
        /**
        * Calculates the sum for the given input data
        *
        * @param {Array<ICalculationData>} inputData
        * @returns {Array<CalculationDataPoints>}
        * @memberof AddCalculator
        */
        AddCalculator.prototype.calculate = function (inputData) {
            this.clearErrors();
            var rawPoints = new Array();
            var outputData = new Array();
            outputData.push(new calculationDataPoints_1.CalculationDataPoints("Output signal", "sum", new Array()));
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
            if (!this.isInputDataValid(inputNumber1, inputNumber2, inputSignalData1, inputSignalData2, this.summand1Name, this.summand2Name)) {
                return outputData;
            }
            // calculate new data
            rawPoints = this.calculateRawPoints(inputNumber1, inputNumber2, inputSignalData1, inputSignalData2);
            // Set new data to calculation ouput data
            outputData[0].setData(rawPoints);
            return outputData;
        };
        /**
         * Calculates output signal depending on type of inputs
         *
         * @private
         * @param {*} inputNumber1
         * @param {*} inputNumber2
         * @param {(Array<IPoint>|undefined)} inputSignalData1
         * @param {(Array<IPoint>|undefined)} inputSignalData2
         * @returns {Array<IPoint>}
         * @memberof AddCalculator
         */
        AddCalculator.prototype.calculateRawPoints = function (inputNumber1, inputNumber2, inputSignalData1, inputSignalData2) {
            if (inputSignalData1 != undefined && inputSignalData2 != undefined) {
                return this.addTwoSignals(inputSignalData1, inputSignalData2);
            }
            else if (inputSignalData1 != undefined && inputNumber2 != undefined) {
                return this.addConstToSignal(inputSignalData1, inputNumber2);
            }
            else if (inputNumber1 != undefined && inputSignalData2 != undefined) {
                return this.addConstToSignal(inputSignalData2, inputNumber1);
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
         * @memberof AddCalculator
         */
        AddCalculator.prototype.addTwoSignals = function (inputSignal1, inputSignal2) {
            var points = new Array();
            if (inputSignal1.length == inputSignal2.length) { // Add only signals with same sample count
                for (var i = 0; i < inputSignal1.length; i++) {
                    var newX = inputSignal1[i].x;
                    var newY = inputSignal1[i].y;
                    newY += inputSignal2[i].y;
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
         * Calculates output signal when input is Constant and Signal
         *
         * @private
         * @param {Array<IPoint>} inputSignal
         * @param {number} inputNumber
         * @returns {Array<IPoint>}
         * @memberof AddCalculator
         */
        AddCalculator.prototype.addConstToSignal = function (inputSignal, inputNumber) {
            var points = new Array();
            for (var i = 0; i < inputSignal.length; i++) {
                var x = inputSignal[i].x;
                var y = inputSignal[i].y + inputNumber;
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
         * @memberof AddCalculator
         */
        AddCalculator.prototype.prepareInputData = function (inputData) {
            inputData = _super.prototype.prepareInputData.call(this, inputData);
            inputData = calculatorHelper_1.CalculatorHelper.tryFilterMatchingSignalParts(inputData);
            return inputData;
        };
        return AddCalculator;
    }(calculatorBase_1.CalculatorBase));
    exports.AddCalculator = AddCalculator;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkQ2FsY3VsYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRvcnMvYWRkQ2FsY3VsYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBV0E7UUFBbUMsaUNBQWM7UUFvQzdDOzs7V0FHRztRQUNIO1lBQUEsWUFDSSxpQkFBTyxTQUNWO1lBeENELFFBQUUsR0FBVyxLQUFLLENBQUM7WUFDbkIsaUJBQVcsR0FBVyxjQUFjLENBQUM7WUFDckMsaUJBQVcsR0FBVyw2REFBNkQsQ0FBQztZQUU1RSxrQkFBWSxHQUFHLFdBQVcsQ0FBQztZQUMzQixrQkFBWSxHQUFHLFdBQVcsQ0FBQzs7UUFtQ25DLENBQUM7UUFqQ0Q7Ozs7O1dBS0c7UUFDSSwyQ0FBbUIsR0FBMUI7WUFDSSxJQUFJLFNBQVMsR0FBRyxJQUFJLEtBQUssRUFBNkUsQ0FBQztZQUN2Ryw2Q0FBNkM7WUFDN0MsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLDZEQUE2QixDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxFQUFFLG1CQUFtQixFQUFFLElBQUksdURBQTBCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxSSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksNkRBQTZCLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLEVBQUUsb0JBQW9CLEVBQUUsSUFBSSx1REFBMEIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNJLE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNJLDRDQUFvQixHQUEzQjtZQUNJLElBQUksVUFBVSxHQUFHLElBQUksS0FBSyxFQUF5QixDQUFDO1lBQ3BELDhDQUE4QztZQUM5QyxVQUFVLENBQUMs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QUFDLEdBQUcsV0FBVyxDQUFDO2dCQUN2QyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksYUFBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2hDO1lBQ0QsT0FBTyxNQUFNLENBQUM7UUFDbEIsQ0FBQztRQUdEOzs7Ozs7O1dBT0c7UUFDSSx3Q0FBZ0IsR0FBdkIsVUFBd0IsU0FBMkY7WUFFL0csU0FBUyxHQUFHLGlCQUFNLGdCQUFnQixZQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzlDLFNBQVMsR0FBRyxtQ0FBZ0IsQ0FBQyw0QkFBNEIsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUVyRSxPQUFPLFNBQVMsQ0FBQztRQUNyQixDQUFDO1FBQ0wsb0JBQUM7SUFBRCxDQUFDLEFBakxELENBQW1DLCtCQUFjLEdBaUxoRDtJQWpMWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDYWxjdWxhdG9yIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvY2FsY3VsYXRvckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJQ2FsY3VsYXRpb25EYXRhIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvY2FsY3VsYXRpb25EYXRhSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElQb2ludCB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL3BvaW50SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4uLy4uL3BvaW50XCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YU51bWJlciB9IGZyb20gXCIuLi9jYWxjdWxhdGlvbkRhdGFOdW1iZXJcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhUG9pbnRzIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YVBvaW50c1wiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cyB9IGZyb20gXCIuLi9jYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50c1wiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mbyB9IGZyb20gXCIuLi9jYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mb1wiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdG9yQmFzZSB9IGZyb20gXCIuL2NhbGN1bGF0b3JCYXNlXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0b3JIZWxwZXIgfSBmcm9tIFwiLi9jYWxjdWxhdG9ySGVscGVyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQWRkQ2FsY3VsYXRvciBleHRlbmRzIENhbGN1bGF0b3JCYXNlIGltcGxlbWVudHMgSUNhbGN1bGF0b3J7XHJcbiAgICBcclxuICAgIGlkOiBzdHJpbmcgPSBcImFkZFwiO1xyXG4gICAgZGlzcGxheU5hbWU6IHN0cmluZyA9IFwiQWRkaXRpb24gYStiXCI7XHJcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nID0gXCJBZGRpdGlvbiBvZiB0d28gc2lnbmFscyBvciBvbmUgc2lnbmFsIHdpdGggYSBjb25zdGFudCB2YWx1ZVwiO1xyXG5cclxuICAgIHByaXZhdGUgc3VtbWFuZDFOYW1lID0gXCJTdW1tYW5kIGFcIjtcclxuICAgIHByaXZhdGUgc3VtbWFuZDJOYW1lID0gXCJTdW1tYW5kIGJcIjtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IGlucHV0IGRhdGEgZm9yIHRoaXMgY2FsY3VsYXRvclxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsoQXJyYXk8Q2FsY3VsYXRpb25EYXRhTnVtYmVyfENhbGN1bGF0aW9uRGF0YVBvaW50c3xDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cz4pfVxyXG4gICAgICogQG1lbWJlcm9mIEFkZENhbGN1bGF0b3JcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldERlZmF1bHRJbnB1dERhdGEoKTogQXJyYXk8Q2FsY3VsYXRpb25EYXRhTnVtYmVyfENhbGN1bGF0aW9uRGF0YVBvaW50c3xDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cz57XHJcbiAgICAgICAgbGV0IGlucHV0RGF0YSA9IG5ldyBBcnJheTxDYWxjdWxhdGlvbkRhdGFOdW1iZXJ8Q2FsY3VsYXRpb25EYXRhUG9pbnRzfENhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzPigpO1xyXG4gICAgICAgIC8vIGFkZCBpbnB1dCBwYXJhbXMgd2l0aCBkZWZhdWx0IGRpc3BsYXluYW1lc1xyXG4gICAgICAgIGlucHV0RGF0YS5wdXNoKG5ldyBDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cyh0aGlzLnN1bW1hbmQxTmFtZSwgMCwgXCJUaGUgZmlyc3Qgc3VtbWFuZFwiLCBuZXcgQ2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm8oZmFsc2UsIHRydWUpKSk7XHJcbiAgICAgICAgaW5wdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzKHRoaXMuc3VtbWFuZDJOYW1lLCAwLCBcIlRoZSBzZWNvbmQgc3VtbWFuZFwiLCBuZXcgQ2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm8oZmFsc2UsIHRydWUpKSk7XHJcbiAgICAgICAgcmV0dXJuIGlucHV0RGF0YTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IG91dHB1dCBkYXRhIGZvciB0aGlzIGNhbGN1bGF0b3JcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPn1cclxuICAgICAqIEBtZW1iZXJvZiBBZGRDYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXREZWZhdWx0T3V0cHV0RGF0YSgpOiBBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+e1xyXG4gICAgICAgIGxldCBvdXRwdXREYXRhID0gbmV3IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz4oKTtcclxuICAgICAgICAvLyBhZGQgb3V0cHV0IHBhcmFtcyB3aXRoIGRlZmF1bHQgZGlzcGxheW5hbWVzXHJcbiAgICAgICAgb3V0cHV0RGF0YS5wdXNoKG5ldyBDYWxjdWxhdGlvbkRhdGFQb2ludHMoXCJPdXRwdXQgc2lnbmFsXCIsIFwic3VtXCIsIG5ldyBBcnJheTxJUG9pbnQ+KCkpKTsgXHJcbiAgICAgICAgcmV0dXJuIG91dHB1dERhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEFkZENhbGN1bGF0b3IuXHJcbiAgICAgKiBAbWVtYmVyb2YgQWRkQ2FsY3VsYXRvclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgIC8qKlxyXG4gICAgICogQ2FsY3VsYXRlcyB0aGUgc3VtIGZvciB0aGUgZ2l2ZW4gaW5wdXQgZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SUNhbGN1bGF0aW9uRGF0YT59IGlucHV0RGF0YVxyXG4gICAgICogQHJldHVybnMge0FycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz59XHJcbiAgICAgKiBAbWVtYmVyb2YgQWRkQ2FsY3VsYXRvclxyXG4gICAgICovXHJcbiAgICBjYWxjdWxhdGUoaW5wdXREYXRhOiBBcnJheTxJQ2FsY3VsYXRpb25EYXRhPik6IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz4ge1xyXG4gICAgICAgIHRoaXMuY2xlYXJFcnJvcnMoKTtcclxuXHJcbiAgICAgICAgbGV0IHJhd1BvaW50cyA9IG5ldyBBcnJheTxJUG9pbnQ+KCk7XHJcbiAgICAgICAgbGV0IG91dHB1dERhdGEgPSBuZXcgQXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPigpO1xyXG4gICAgICAgIG91dHB1dERhdGEucHVzaChuZXcgQ2FsY3VsYXRpb25EYXRhUG9pbnRzKFwiT3V0cHV0IHNpZ25hbFwiLCBcInN1bVwiLCBuZXcgQXJyYXk8SVBvaW50PigpKSk7IFxyXG4gICAgICAgIG91dHB1dERhdGFbMF0uc2V0RGF0YShyYXdQb2ludHMpOyAvLyBTZXQgZW1wdHkgcmF3IHBvaW50cyBsaXN0IGJ5IGRlZmF1bHRcclxuXHJcbiAgICAgICAgbGV0IGlucHV0TnVtYmVyMSA9IChpbnB1dERhdGFbMF0gYXMgQ2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHMpLmdldERhdGEoKTtcclxuICAgICAgICBsZXQgaW5wdXROdW1iZXIyID0gKGlucHV0RGF0YVsxXSBhcyBDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cykuZ2V0RGF0YSgpO1xyXG4gICAgICAgIGxldCBpbnB1dFNpZ25hbERhdGExOiBBcnJheTxJUG9pbnQ+fHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuICAgICAgICBsZXQgaW5wdXRTaWduYWxEYXRhMjogQXJyYXk8SVBvaW50Pnx1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgaWYoaW5wdXROdW1iZXIxIGluc3RhbmNlb2YgQXJyYXkpe1xyXG4gICAgICAgICAgICBpbnB1dFNpZ25hbERhdGExID0gaW5wdXROdW1iZXIxO1xyXG4gICAgICAgICAgICBpbnB1dE51bWJlcjEgPSBOYU47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGlucHV0TnVtYmVyMiBpbnN0YW5jZW9mIEFycmF5KXtcclxuICAgICAgICAgICAgaW5wdXRTaWduYWxEYXRhMiA9IGlucHV0TnVtYmVyMjtcclxuICAgICAgICAgICAgaW5wdXROdW1iZXIyID0gTmFOO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBDaGVjayBmb3IgdmFsaWQgaW5wdXQgZGF0YVxyXG4gICAgICAgIGlmKCF0aGlzLmlzSW5wdXREYXRhVmFsaWQoaW5wdXROdW1iZXIxLCBpbnB1dE51bWJlcjIsIGlucHV0U2lnbmFsRGF0YTEsIGlucHV0U2lnbmFsRGF0YTIsIHRoaXMuc3VtbWFuZDFOYW1lLCB0aGlzLnN1bW1hbmQyTmFtZSkpe1xyXG4gICAgICAgICAgICByZXR1cm4gb3V0cHV0RGF0YTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gY2FsY3VsYXRlIG5ldyBkYXRhXHJcbiAgICAgICAgcmF3UG9pbnRzID0gdGhpcy5jYWxjdWxhdGVSYXdQb2ludHMoaW5wdXROdW1iZXIxLCBpbnB1dE51bWJlcjIsIGlucHV0U2lnbmFsRGF0YTEsIGlucHV0U2lnbmFsRGF0YTIpO1xyXG5cclxuICAgICAgICAvLyBTZXQgbmV3IGRhdGEgdG8gY2FsY3VsYXRpb24gb3VwdXQgZGF0YVxyXG4gICAgICAgIG91dHB1dERhdGFbMF0uc2V0RGF0YShyYXdQb2ludHMpO1xyXG4gICAgICAgIHJldHVybiBvdXRwdXREYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsY3VsYXRlcyBvdXRwdXQgc2lnbmFsIGRlcGVuZGluZyBvbiB0eXBlIG9mIGlucHV0c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGlucHV0TnVtYmVyMVxyXG4gICAgICogQHBhcmFtIHsqfSBpbnB1dE51bWJlcjJcclxuICAgICAqIEBwYXJhbSB7KEFycmF5PElQb2ludD58dW5kZWZpbmVkKX0gaW5wdXRTaWduYWxEYXRhMVxyXG4gICAgICogQHBhcmFtIHsoQXJyYXk8SVBvaW50Pnx1bmRlZmluZWQpfSBpbnB1dFNpZ25hbERhdGEyXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8SVBvaW50Pn1cclxuICAgICAqIEBtZW1iZXJvZiBBZGRDYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2FsY3VsYXRlUmF3UG9pbnRzKGlucHV0TnVtYmVyMSwgaW5wdXROdW1iZXIyLCBpbnB1dFNpZ25hbERhdGExOiBBcnJheTxJUG9pbnQ+fHVuZGVmaW5lZCwgaW5wdXRTaWduYWxEYXRhMjogQXJyYXk8SVBvaW50Pnx1bmRlZmluZWQpIDogQXJyYXk8SVBvaW50PntcclxuICAgICAgICAgICAgaWYoaW5wdXRTaWduYWxEYXRhMSAhPSB1bmRlZmluZWQgJiYgaW5wdXRTaWduYWxEYXRhMiAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hZGRUd29TaWduYWxzKGlucHV0U2lnbmFsRGF0YTEsIGlucHV0U2lnbmFsRGF0YTIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGlucHV0U2lnbmFsRGF0YTEgIT0gdW5kZWZpbmVkICYmIGlucHV0TnVtYmVyMiAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hZGRDb25zdFRvU2lnbmFsKGlucHV0U2lnbmFsRGF0YTEsIGlucHV0TnVtYmVyMiBhcyBudW1iZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGlucHV0TnVtYmVyMSAhPSB1bmRlZmluZWQgJiYgaW5wdXRTaWduYWxEYXRhMiAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hZGRDb25zdFRvU2lnbmFsKGlucHV0U2lnbmFsRGF0YTIsIGlucHV0TnVtYmVyMSBhcyBudW1iZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IEFycmF5PElQb2ludD4oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0ZXMgb3V0cHV0IHNpZ25hbCB3aGVuIGlucHV0IGlzIFNpZ25hbCBhbmQgU2lnbmFsXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SVBvaW50Pn0gaW5wdXRTaWduYWwxXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElQb2ludD59IGlucHV0U2lnbmFsMlxyXG4gICAgICogQHJldHVybnMge0FycmF5PElQb2ludD59XHJcbiAgICAgKiBAbWVtYmVyb2YgQWRkQ2FsY3VsYXRvclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZFR3b1NpZ25hbHMoaW5wdXRTaWduYWwxOiBBcnJheTxJUG9pbnQ+LCBpbnB1dFNpZ25hbDI6IEFycmF5PElQb2ludD4pOiBBcnJheTxJUG9pbnQ+e1xyXG4gICAgICAgIGxldCBwb2ludHMgPSBuZXcgQXJyYXk8SVBvaW50PigpO1xyXG4gICAgICAgIGlmKGlucHV0U2lnbmFsMS5sZW5ndGggPT0gaW5wdXRTaWduYWwyLmxlbmd0aCl7IC8vIEFkZCBvbmx5IHNpZ25hbHMgd2l0aCBzYW1lIHNhbXBsZSBjb3VudFxyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgaW5wdXRTaWduYWwxLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdYID0gaW5wdXRTaWduYWwxW2ldLng7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3WSA9IGlucHV0U2lnbmFsMVtpXS55O1xyXG4gICAgICAgICAgICAgICAgbmV3WSArPSBpbnB1dFNpZ25hbDJbaV0ueTtcclxuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGlmIHNpZ25hbCB0d28gaGFzIHNhbWUgeCB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgaWYoaW5wdXRTaWduYWwyW2ldLnggPT0gbmV3WCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRzLnB1c2gobmV3IFBvaW50KG5ld1gsIG5ld1kpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQWRkIG9mIHR3byBkaWZmZXJlbnQgc2lnbmFscyhkaWZmZXJlbnQgeCB2YWx1ZXMpIGN1cnJlbnRseSBub3QgcG9zc2libGVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEVycm9yKFwiQ2FsY3VsYXRpb24gRXJyb3I6IFRoZSBpbnB1dCBzaWduYWxzIGRvbid0IGhhdmUgZXF1YWwgeCAodGltZSkgdmFsdWVzIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEFycmF5PElQb2ludD4oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yKFwiQ2FsY3VsYXRpb24gRXJyb3I6IFRoZSBpbnB1dCBzaWduYWxzIGRvbid0IGhhdmUgdGhlIHNhbWUgbnVtYmVyIG9mIHBvaW50cyFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwb2ludHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxjdWxhdGVzIG91dHB1dCBzaWduYWwgd2hlbiBpbnB1dCBpcyBDb25zdGFudCBhbmQgU2lnbmFsXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SVBvaW50Pn0gaW5wdXRTaWduYWxcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbnB1dE51bWJlclxyXG4gICAgICogQHJldHVybnMge0FycmF5PElQb2ludD59XHJcbiAgICAgKiBAbWVtYmVyb2YgQWRkQ2FsY3VsYXRvclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZENvbnN0VG9TaWduYWwoaW5wdXRTaWduYWw6IEFycmF5PElQb2ludD4sIGlucHV0TnVtYmVyOiBudW1iZXIpOiBBcnJheTxJUG9pbnQ+e1xyXG4gICAgICAgIGxldCBwb2ludHMgPSBuZXcgQXJyYXk8SVBvaW50PigpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9MDsgaSA8IGlucHV0U2lnbmFsLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IHggPSBpbnB1dFNpZ25hbFtpXS54O1xyXG4gICAgICAgICAgICBsZXQgeSA9IGlucHV0U2lnbmFsW2ldLnkgKyBpbnB1dE51bWJlcjtcclxuICAgICAgICAgICAgcG9pbnRzLnB1c2gobmV3IFBvaW50KHgsIHkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBvaW50cztcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQZXJmb3JtcyBvcHRpb25hbCBwcmVwZXJhdGlvbiBvZiBpbnB1dCBkYXRhLlxyXG4gICAgICogRmlsdGVycyBpbnB1dCBzaWduYWxzIGZvciBtYXRjaGluZyBzaWduYWwgcGFydHMgKHNhbXBsZXMgd2l0aCBtYXRjaGluZyB0aW1lc3RhbXBzKS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyhBcnJheTxDYWxjdWxhdGlvbkRhdGFOdW1iZXJ8Q2FsY3VsYXRpb25EYXRhUG9pbnRzfENhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzPil9IGlucHV0RGF0YVxyXG4gICAgICogQHJldHVybnMgeyhBcnJheTxDYWxjdWxhdGlvbkRhdGFOdW1iZXJ8Q2FsY3VsYXRpb25EYXRhUG9pbnRzfENhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzPil9XHJcbiAgICAgKiBAbWVtYmVyb2YgQWRkQ2FsY3VsYXRvclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcHJlcGFyZUlucHV0RGF0YShpbnB1dERhdGE6IEFycmF5PENhbGN1bGF0aW9uRGF0YU51bWJlcnxDYWxjdWxhdGlvbkRhdGFQb2ludHN8Q2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHM+KTogQXJyYXk8Q2FsY3VsYXRpb25EYXRhTnVtYmVyfENhbGN1bGF0aW9uRGF0YVBvaW50c3xDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cz4ge1xyXG5cclxuICAgICAgICBpbnB1dERhdGEgPSBzdXBlci5wcmVwYXJlSW5wdXREYXRhKGlucHV0RGF0YSk7XHJcbiAgICAgICAgaW5wdXREYXRhID0gQ2FsY3VsYXRvckhlbHBlci50cnlGaWx0ZXJNYXRjaGluZ1NpZ25hbFBhcnRzKGlucHV0RGF0YSk7XHJcblxyXG4gICAgICAgIHJldHVybiBpbnB1dERhdGE7XHJcbiAgICB9XHJcbn0iXX0=