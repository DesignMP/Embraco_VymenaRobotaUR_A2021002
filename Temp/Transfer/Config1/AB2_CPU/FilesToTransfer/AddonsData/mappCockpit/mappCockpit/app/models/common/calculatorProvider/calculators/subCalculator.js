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
    var SubCalculator = /** @class */ (function (_super) {
        __extends(SubCalculator, _super);
        function SubCalculator() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.id = "sub";
            _this.displayName = "Subtraction a-b";
            _this.description = "Subtraction of one signals from another, a constant value from a signal or a signal from a constant value";
            _this.minuendName = "Minuend a";
            _this.subtrahendName = "Subtrahend b";
            return _this;
        }
        /**
         * Returns the default input data for this calculator
         *
         * @returns {(Array<CalculationDataNumber|CalculationDataPoints|CalculationDataNumberOrPoints>)}
         * @memberof SubCalculator
         */
        SubCalculator.prototype.getDefaultInputData = function () {
            var inputData = new Array();
            // add input params with default displaynames
            inputData.push(new calculationDataNumberOrPoints_1.CalculationDataNumberOrPoints(this.minuendName, 0, "The minuend", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            inputData.push(new calculationDataNumberOrPoints_1.CalculationDataNumberOrPoints(this.subtrahendName, 0, "The subtrahend", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            return inputData;
        };
        /**
         * Returns the default output data for this calculator
         *
         * @returns {Array<CalculationDataPoints>}
         * @memberof SubCalculator
         */
        SubCalculator.prototype.getDefaultOutputData = function () {
            var outputData = new Array();
            // add output params with default displaynames
            outputData.push(new calculationDataPoints_1.CalculationDataPoints("Output signal", "difference", new Array()));
            return outputData;
        };
        /**
         * Calculates difference for the given input data
         *
         * @param {Array<ICalculationData>} inputData
         * @returns {Array<ICalculationData>}
         * @memberof SubCalculator
         */
        SubCalculator.prototype.calculate = function (inputData) {
            this.clearErrors();
            var rawPoints = new Array();
            var outputData = new Array();
            outputData.push(new calculationDataPoints_1.CalculationDataPoints("Output signal", "difference", new Array()));
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
            // Check input data
            if (!this.isInputDataValid(inputNumber1, inputNumber2, inputSignalData1, inputSignalData2, this.minuendName, this.subtrahendName)) {
                return outputData;
            }
            // calculate new data
            rawPoints = this.calculateRawPoints(inputNumber1, inputNumber2, inputSignalData1, inputSignalData2);
            // Set new data to calculation ouput data
            outputData[0].setData(rawPoints);
            return outputData;
        };
        /**
         * Calculate output signal depending on input types
         *
         * @private
         * @param {*} inputNumber1
         * @param {*} inputNumber2
         * @param {*} inputSignalData1
         * @param {*} inputSignalData2
         * @returns {Array<IPoint>}
         * @memberof SubCalculator
         */
        SubCalculator.prototype.calculateRawPoints = function (inputNumber1, inputNumber2, inputSignalData1, inputSignalData2) {
            if (inputSignalData1 != undefined && inputSignalData2 != undefined) {
                return this.subTwoSignals(inputSignalData1, inputSignalData2);
            }
            else if (inputSignalData1 != undefined && inputNumber2 != undefined) {
                return this.subConstFromSignal(inputSignalData1, inputNumber2);
            }
            else if (inputNumber1 != undefined && inputSignalData2 != undefined) {
                return this.subSignalFromConst(inputNumber1, inputSignalData2);
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
         * @memberof SubCalculator
         */
        SubCalculator.prototype.subTwoSignals = function (inputSignal1, inputSignal2) {
            var points = new Array();
            if (inputSignal1.length == inputSignal2.length) { // Sub only signals with same sample count
                for (var i = 0; i < inputSignal1.length; i++) {
                    var newX = inputSignal1[i].x;
                    var newY = inputSignal1[i].y;
                    newY -= inputSignal2[i].y;
                    // check if signal two has same x value
                    if (inputSignal2[i].x == newX) {
                        points.push(new point_1.Point(newX, newY));
                    }
                    else {
                        // Sub of two different signals(different x values) currently not possible
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
         * @memberof SubCalculator
         */
        SubCalculator.prototype.subConstFromSignal = function (inputSignal, inputNumber) {
            var points = new Array();
            for (var i = 0; i < inputSignal.length; i++) {
                var x = inputSignal[i].x;
                var y = inputSignal[i].y - inputNumber;
                points.push(new point_1.Point(x, y));
            }
            return points;
        };
        /**
         * Calculates output signal when input is Constant and Signal
         *
         * @private
         * @param {number} inputNumber
         * @param {Array<IPoint>} inputSignal
         * @returns {Array<IPoint>}
         * @memberof SubCalculator
         */
        SubCalculator.prototype.subSignalFromConst = function (inputNumber, inputSignal) {
            var points = new Array();
            for (var i = 0; i < inputSignal.length; i++) {
                var x = inputSignal[i].x;
                var y = inputNumber - inputSignal[i].y;
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
         * @memberof SubCalculator
         */
        SubCalculator.prototype.prepareInputData = function (inputData) {
            inputData = _super.prototype.prepareInputData.call(this, inputData);
            inputData = calculatorHelper_1.CalculatorHelper.tryFilterMatchingSignalParts(inputData);
            return inputData;
        };
        return SubCalculator;
    }(calculatorBase_1.CalculatorBase));
    exports.SubCalculator = SubCalculator;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ViQ2FsY3VsYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRvcnMvc3ViQ2FsY3VsYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBV0E7UUFBbUMsaUNBQWM7UUFBakQ7WUFBQSxxRUE4TEM7WUE1TEcsUUFBRSxHQUFXLEtBQUssQ0FBQztZQUNuQixpQkFBVyxHQUFXLGlCQUFpQixDQUFDO1lBQ3hDLGlCQUFXLEdBQVcsMkdBQTJHLENBQUM7WUFFMUgsaUJBQVcsR0FBRyxXQUFXLENBQUM7WUFDMUIsb0JBQWMsR0FBRyxjQUFjLENBQUM7O1FBdUw1QyxDQUFDO1FBckxHOzs7OztXQUtHO1FBQ0ksMkNBQW1CLEdBQTFCO1lBQ0ksSUFBSSxTQUFTLEdBQUcsSUFBSSxLQUFLLEVBQTZFLENBQUM7WUFFdkcsNkNBQTZDO1lBQzdDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSw2REFBNkIsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxhQUFhLEVBQUUsSUFBSSx1REFBMEIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25JLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSw2REFBNkIsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLHVEQUEwQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFekksT0FBTyxTQUFTLENBQUM7UUFDckIsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0ksNENBQW9CLEdBQTNCO1lBQ0ksSUFBSSxVQUFVLEdBQUcsSUFBSSxLQUFLLEVBQXlCLENBQUM7WUFFcEQsOENBQThDO1lBQzlDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSw2Q0FBcUIs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Q3ZDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxhQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDaEM7WUFDRCxPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDSywwQ0FBa0IsR0FBMUIsVUFBMkIsV0FBbUIsRUFBRSxXQUEwQjtZQUN0RSxJQUFJLE1BQU0sR0FBRyxJQUFJLEtBQUssRUFBVSxDQUFDO1lBQ2pDLEtBQUksSUFBSSxDQUFDLEdBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUN0QyxJQUFJLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixJQUFJLENBQUMsR0FBRyxXQUFXLEdBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLGFBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNoQztZQUNELE9BQU8sTUFBTSxDQUFDO1FBQ2xCLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0ksd0NBQWdCLEdBQXZCLFVBQXdCLFNBQTJGO1lBRS9HLFNBQVMsR0FBRyxpQkFBTSxnQkFBZ0IsWUFBQyxTQUFTLENBQUMsQ0FBQztZQUM5QyxTQUFTLEdBQUcsbUNBQWdCLENBQUMsNEJBQTRCLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFckUsT0FBTyxTQUFTLENBQUM7UUFDckIsQ0FBQztRQUNMLG9CQUFDO0lBQUQsQ0FBQyxBQTlMRCxDQUFtQywrQkFBYyxHQThMaEQ7SUE5TFksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ2FsY3VsYXRvciB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2NhbGN1bGF0b3JJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSUNhbGN1bGF0aW9uRGF0YSB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2NhbGN1bGF0aW9uRGF0YUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9wb2ludEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuLi8uLi9wb2ludFwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFOdW1iZXIgfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhTnVtYmVyXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YVBvaW50cyB9IGZyb20gXCIuLi9jYWxjdWxhdGlvbkRhdGFQb2ludHNcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHMgfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHNcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm8gfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm9cIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRvckJhc2UgfSBmcm9tIFwiLi9jYWxjdWxhdG9yQmFzZVwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdG9ySGVscGVyIH0gZnJvbSBcIi4vY2FsY3VsYXRvckhlbHBlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFN1YkNhbGN1bGF0b3IgZXh0ZW5kcyBDYWxjdWxhdG9yQmFzZSBpbXBsZW1lbnRzIElDYWxjdWxhdG9ye1xyXG4gICAgXHJcbiAgICBpZDogc3RyaW5nID0gXCJzdWJcIjtcclxuICAgIGRpc3BsYXlOYW1lOiBzdHJpbmcgPSBcIlN1YnRyYWN0aW9uIGEtYlwiO1xyXG4gICAgZGVzY3JpcHRpb246IHN0cmluZyA9IFwiU3VidHJhY3Rpb24gb2Ygb25lIHNpZ25hbHMgZnJvbSBhbm90aGVyLCBhIGNvbnN0YW50IHZhbHVlIGZyb20gYSBzaWduYWwgb3IgYSBzaWduYWwgZnJvbSBhIGNvbnN0YW50IHZhbHVlXCI7XHJcbiAgICBcclxuICAgIHByaXZhdGUgbWludWVuZE5hbWUgPSBcIk1pbnVlbmQgYVwiO1xyXG4gICAgcHJpdmF0ZSBzdWJ0cmFoZW5kTmFtZSA9IFwiU3VidHJhaGVuZCBiXCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IGlucHV0IGRhdGEgZm9yIHRoaXMgY2FsY3VsYXRvclxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsoQXJyYXk8Q2FsY3VsYXRpb25EYXRhTnVtYmVyfENhbGN1bGF0aW9uRGF0YVBvaW50c3xDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cz4pfVxyXG4gICAgICogQG1lbWJlcm9mIFN1YkNhbGN1bGF0b3JcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldERlZmF1bHRJbnB1dERhdGEoKTogQXJyYXk8Q2FsY3VsYXRpb25EYXRhTnVtYmVyfENhbGN1bGF0aW9uRGF0YVBvaW50c3xDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cz57XHJcbiAgICAgICAgbGV0IGlucHV0RGF0YSA9IG5ldyBBcnJheTxDYWxjdWxhdGlvbkRhdGFOdW1iZXJ8Q2FsY3VsYXRpb25EYXRhUG9pbnRzfENhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzPigpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGFkZCBpbnB1dCBwYXJhbXMgd2l0aCBkZWZhdWx0IGRpc3BsYXluYW1lc1xyXG4gICAgICAgIGlucHV0RGF0YS5wdXNoKG5ldyBDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cyh0aGlzLm1pbnVlbmROYW1lLCAwLCBcIlRoZSBtaW51ZW5kXCIsIG5ldyBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mbyhmYWxzZSwgdHJ1ZSkpKTtcclxuICAgICAgICBpbnB1dERhdGEucHVzaChuZXcgQ2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHModGhpcy5zdWJ0cmFoZW5kTmFtZSwgMCwgXCJUaGUgc3VidHJhaGVuZFwiLCBuZXcgQ2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm8oZmFsc2UsIHRydWUpKSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGlucHV0RGF0YTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IG91dHB1dCBkYXRhIGZvciB0aGlzIGNhbGN1bGF0b3JcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPn1cclxuICAgICAqIEBtZW1iZXJvZiBTdWJDYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXREZWZhdWx0T3V0cHV0RGF0YSgpOiBBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+e1xyXG4gICAgICAgIGxldCBvdXRwdXREYXRhID0gbmV3IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz4oKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBhZGQgb3V0cHV0IHBhcmFtcyB3aXRoIGRlZmF1bHQgZGlzcGxheW5hbWVzXHJcbiAgICAgICAgb3V0cHV0RGF0YS5wdXNoKG5ldyBDYWxjdWxhdGlvbkRhdGFQb2ludHMoXCJPdXRwdXQgc2lnbmFsXCIsIFwiZGlmZmVyZW5jZVwiLCBuZXcgQXJyYXk8SVBvaW50PigpKSk7IFxyXG4gICAgICAgIHJldHVybiBvdXRwdXREYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsY3VsYXRlcyBkaWZmZXJlbmNlIGZvciB0aGUgZ2l2ZW4gaW5wdXQgZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SUNhbGN1bGF0aW9uRGF0YT59IGlucHV0RGF0YVxyXG4gICAgICogQHJldHVybnMge0FycmF5PElDYWxjdWxhdGlvbkRhdGE+fVxyXG4gICAgICogQG1lbWJlcm9mIFN1YkNhbGN1bGF0b3JcclxuICAgICAqL1xyXG4gICAgY2FsY3VsYXRlKGlucHV0RGF0YTogQXJyYXk8SUNhbGN1bGF0aW9uRGF0YT4pOiBBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+IHtcclxuICAgICAgICB0aGlzLmNsZWFyRXJyb3JzKCk7XHJcblxyXG4gICAgICAgIGxldCByYXdQb2ludHMgPSBuZXcgQXJyYXk8SVBvaW50PigpO1xyXG4gICAgICAgIGxldCBvdXRwdXREYXRhID0gbmV3IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz4oKTtcclxuICAgICAgICBvdXRwdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YVBvaW50cyhcIk91dHB1dCBzaWduYWxcIiwgXCJkaWZmZXJlbmNlXCIsIG5ldyBBcnJheTxJUG9pbnQ+KCkpKTsgXHJcbiAgICAgICAgb3V0cHV0RGF0YVswXS5zZXREYXRhKHJhd1BvaW50cyk7IC8vIFNldCBlbXB0eSByYXcgcG9pbnRzIGxpc3QgYnkgZGVmYXVsdFxyXG5cclxuICAgICAgICBsZXQgaW5wdXROdW1iZXIxID0gKGlucHV0RGF0YVswXSBhcyBDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cykuZ2V0RGF0YSgpO1xyXG4gICAgICAgIGxldCBpbnB1dE51bWJlcjIgPSAoaW5wdXREYXRhWzFdIGFzIENhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzKS5nZXREYXRhKCk7XHJcbiAgICAgICAgbGV0IGlucHV0U2lnbmFsRGF0YTE6IEFycmF5PElQb2ludD58dW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIGxldCBpbnB1dFNpZ25hbERhdGEyOiBBcnJheTxJUG9pbnQ+fHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuICAgICAgICBpZihpbnB1dE51bWJlcjEgaW5zdGFuY2VvZiBBcnJheSl7XHJcbiAgICAgICAgICAgIGlucHV0U2lnbmFsRGF0YTEgPSBpbnB1dE51bWJlcjE7XHJcbiAgICAgICAgICAgIGlucHV0TnVtYmVyMSA9IE5hTjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaW5wdXROdW1iZXIyIGluc3RhbmNlb2YgQXJyYXkpe1xyXG4gICAgICAgICAgICBpbnB1dFNpZ25hbERhdGEyID0gaW5wdXROdW1iZXIyO1xyXG4gICAgICAgICAgICBpbnB1dE51bWJlcjIgPSBOYU47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDaGVjayBpbnB1dCBkYXRhXHJcbiAgICAgICAgaWYoIXRoaXMuaXNJbnB1dERhdGFWYWxpZChpbnB1dE51bWJlcjEsIGlucHV0TnVtYmVyMiwgaW5wdXRTaWduYWxEYXRhMSwgaW5wdXRTaWduYWxEYXRhMix0aGlzLm1pbnVlbmROYW1lLCB0aGlzLnN1YnRyYWhlbmROYW1lKSl7XHJcbiAgICAgICAgICAgIHJldHVybiBvdXRwdXREYXRhO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBjYWxjdWxhdGUgbmV3IGRhdGFcclxuICAgICAgICByYXdQb2ludHMgPSB0aGlzLmNhbGN1bGF0ZVJhd1BvaW50cyhpbnB1dE51bWJlcjEsIGlucHV0TnVtYmVyMiwgaW5wdXRTaWduYWxEYXRhMSwgaW5wdXRTaWduYWxEYXRhMik7XHJcblxyXG4gICAgICAgIC8vIFNldCBuZXcgZGF0YSB0byBjYWxjdWxhdGlvbiBvdXB1dCBkYXRhXHJcbiAgICAgICAgb3V0cHV0RGF0YVswXS5zZXREYXRhKHJhd1BvaW50cyk7XHJcbiAgICAgICAgcmV0dXJuIG91dHB1dERhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxjdWxhdGUgb3V0cHV0IHNpZ25hbCBkZXBlbmRpbmcgb24gaW5wdXQgdHlwZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBpbnB1dE51bWJlcjFcclxuICAgICAqIEBwYXJhbSB7Kn0gaW5wdXROdW1iZXIyXHJcbiAgICAgKiBAcGFyYW0geyp9IGlucHV0U2lnbmFsRGF0YTFcclxuICAgICAqIEBwYXJhbSB7Kn0gaW5wdXRTaWduYWxEYXRhMlxyXG4gICAgICogQHJldHVybnMge0FycmF5PElQb2ludD59XHJcbiAgICAgKiBAbWVtYmVyb2YgU3ViQ2FsY3VsYXRvclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNhbGN1bGF0ZVJhd1BvaW50cyhpbnB1dE51bWJlcjEsIGlucHV0TnVtYmVyMiwgaW5wdXRTaWduYWxEYXRhMSwgaW5wdXRTaWduYWxEYXRhMikgOiBBcnJheTxJUG9pbnQ+e1xyXG4gICAgICAgIGlmKGlucHV0U2lnbmFsRGF0YTEgIT0gdW5kZWZpbmVkICYmIGlucHV0U2lnbmFsRGF0YTIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3ViVHdvU2lnbmFscyhpbnB1dFNpZ25hbERhdGExLCBpbnB1dFNpZ25hbERhdGEyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihpbnB1dFNpZ25hbERhdGExICE9IHVuZGVmaW5lZCAmJiBpbnB1dE51bWJlcjIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3ViQ29uc3RGcm9tU2lnbmFsKGlucHV0U2lnbmFsRGF0YTEsIGlucHV0TnVtYmVyMiBhcyBudW1iZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGlucHV0TnVtYmVyMSAhPSB1bmRlZmluZWQgJiYgaW5wdXRTaWduYWxEYXRhMiAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdWJTaWduYWxGcm9tQ29uc3QoaW5wdXROdW1iZXIxIGFzIG51bWJlciwgaW5wdXRTaWduYWxEYXRhMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgQXJyYXk8SVBvaW50PigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsY3VsYXRlcyBvdXRwdXQgc2lnbmFsIHdoZW4gaW5wdXQgaXMgU2lnbmFsIGFuZCBTaWduYWxcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxJUG9pbnQ+fSBpbnB1dFNpZ25hbDFcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SVBvaW50Pn0gaW5wdXRTaWduYWwyXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8SVBvaW50Pn1cclxuICAgICAqIEBtZW1iZXJvZiBTdWJDYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3ViVHdvU2lnbmFscyhpbnB1dFNpZ25hbDE6IEFycmF5PElQb2ludD4sIGlucHV0U2lnbmFsMjogQXJyYXk8SVBvaW50Pik6IEFycmF5PElQb2ludD57XHJcbiAgICAgICAgbGV0IHBvaW50cyA9IG5ldyBBcnJheTxJUG9pbnQ+KCk7XHJcbiAgICAgICAgaWYoaW5wdXRTaWduYWwxLmxlbmd0aCA9PSBpbnB1dFNpZ25hbDIubGVuZ3RoKXsgLy8gU3ViIG9ubHkgc2lnbmFscyB3aXRoIHNhbWUgc2FtcGxlIGNvdW50XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBpbnB1dFNpZ25hbDEubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld1ggPSBpbnB1dFNpZ25hbDFbaV0ueDtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdZID0gaW5wdXRTaWduYWwxW2ldLnk7XHJcbiAgICAgICAgICAgICAgICBuZXdZIC09IGlucHV0U2lnbmFsMltpXS55O1xyXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgc2lnbmFsIHR3byBoYXMgc2FtZSB4IHZhbHVlXHJcbiAgICAgICAgICAgICAgICBpZihpbnB1dFNpZ25hbDJbaV0ueCA9PSBuZXdYKXtcclxuICAgICAgICAgICAgICAgICAgICBwb2ludHMucHVzaChuZXcgUG9pbnQobmV3WCwgbmV3WSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAvLyBTdWIgb2YgdHdvIGRpZmZlcmVudCBzaWduYWxzKGRpZmZlcmVudCB4IHZhbHVlcykgY3VycmVudGx5IG5vdCBwb3NzaWJsZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkRXJyb3IoXCJDYWxjdWxhdGlvbiBFcnJvcjogVGhlIGlucHV0IHNpZ25hbHMgZG9uJ3QgaGF2ZSBlcXVhbCB4ICh0aW1lKSB2YWx1ZXMhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQXJyYXk8SVBvaW50PigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3IoXCJDYWxjdWxhdGlvbiBFcnJvcjogVGhlIGlucHV0IHNpZ25hbHMgZG9uJ3QgaGF2ZSB0aGUgc2FtZSBudW1iZXIgb2YgcG9pbnRzIVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBvaW50cztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxjdWxhdGVzIG91dHB1dCBzaWduYWwgd2hlbiBpbnB1dCBpcyBTaWduYWwgYW5kIENvbnN0YW50IFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElQb2ludD59IGlucHV0U2lnbmFsXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5wdXROdW1iZXJcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxJUG9pbnQ+fVxyXG4gICAgICogQG1lbWJlcm9mIFN1YkNhbGN1bGF0b3JcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdWJDb25zdEZyb21TaWduYWwoaW5wdXRTaWduYWw6IEFycmF5PElQb2ludD4sIGlucHV0TnVtYmVyOiBudW1iZXIpOiBBcnJheTxJUG9pbnQ+e1xyXG4gICAgICAgIGxldCBwb2ludHMgPSBuZXcgQXJyYXk8SVBvaW50PigpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9MDsgaSA8IGlucHV0U2lnbmFsLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IHggPSBpbnB1dFNpZ25hbFtpXS54O1xyXG4gICAgICAgICAgICBsZXQgeSA9IGlucHV0U2lnbmFsW2ldLnkgLSBpbnB1dE51bWJlcjtcclxuICAgICAgICAgICAgcG9pbnRzLnB1c2gobmV3IFBvaW50KHgsIHkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBvaW50cztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0ZXMgb3V0cHV0IHNpZ25hbCB3aGVuIGlucHV0IGlzIENvbnN0YW50IGFuZCBTaWduYWxcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGlucHV0TnVtYmVyXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElQb2ludD59IGlucHV0U2lnbmFsXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8SVBvaW50Pn1cclxuICAgICAqIEBtZW1iZXJvZiBTdWJDYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3ViU2lnbmFsRnJvbUNvbnN0KGlucHV0TnVtYmVyOiBudW1iZXIsIGlucHV0U2lnbmFsOiBBcnJheTxJUG9pbnQ+KTogQXJyYXk8SVBvaW50PntcclxuICAgICAgICBsZXQgcG9pbnRzID0gbmV3IEFycmF5PElQb2ludD4oKTtcclxuICAgICAgICBmb3IobGV0IGkgPTA7IGkgPCBpbnB1dFNpZ25hbC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCB4ID0gaW5wdXRTaWduYWxbaV0ueDtcclxuICAgICAgICAgICAgbGV0IHkgPSBpbnB1dE51bWJlci0gaW5wdXRTaWduYWxbaV0ueTtcclxuICAgICAgICAgICAgcG9pbnRzLnB1c2gobmV3IFBvaW50KHgsIHkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBvaW50cztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFBlcmZvcm1zIG9wdGlvbmFsIHByZXBlcmF0aW9uIG9mIGlucHV0IGRhdGEuXHJcbiAgICAgKiBGaWx0ZXJzIGlucHV0IHNpZ25hbHMgZm9yIG1hdGNoaW5nIHNpZ25hbCBwYXJ0cyAoc2FtcGxlcyB3aXRoIG1hdGNoaW5nIHRpbWVzdGFtcHMpLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7KEFycmF5PENhbGN1bGF0aW9uRGF0YU51bWJlcnxDYWxjdWxhdGlvbkRhdGFQb2ludHN8Q2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHM+KX0gaW5wdXREYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7KEFycmF5PENhbGN1bGF0aW9uRGF0YU51bWJlcnxDYWxjdWxhdGlvbkRhdGFQb2ludHN8Q2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHM+KX1cclxuICAgICAqIEBtZW1iZXJvZiBTdWJDYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBwcmVwYXJlSW5wdXREYXRhKGlucHV0RGF0YTogQXJyYXk8Q2FsY3VsYXRpb25EYXRhTnVtYmVyfENhbGN1bGF0aW9uRGF0YVBvaW50c3xDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cz4pOiBBcnJheTxDYWxjdWxhdGlvbkRhdGFOdW1iZXJ8Q2FsY3VsYXRpb25EYXRhUG9pbnRzfENhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzPiB7XHJcblxyXG4gICAgICAgIGlucHV0RGF0YSA9IHN1cGVyLnByZXBhcmVJbnB1dERhdGEoaW5wdXREYXRhKTtcclxuICAgICAgICBpbnB1dERhdGEgPSBDYWxjdWxhdG9ySGVscGVyLnRyeUZpbHRlck1hdGNoaW5nU2lnbmFsUGFydHMoaW5wdXREYXRhKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGlucHV0RGF0YTtcclxuICAgIH1cclxufSJdfQ==