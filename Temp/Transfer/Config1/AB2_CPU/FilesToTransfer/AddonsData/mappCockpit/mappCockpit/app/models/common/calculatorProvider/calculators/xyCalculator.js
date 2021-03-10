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
define(["require", "exports", "../../point", "../calculationDataPoints", "../calculationDataDisplayInfo", "./calculatorBase", "./calculatorHelper"], function (require, exports, point_1, calculationDataPoints_1, calculationDataDisplayInfo_1, calculatorBase_1, calculatorHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var XYCalculator = /** @class */ (function (_super) {
        __extends(XYCalculator, _super);
        function XYCalculator() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.id = "xy";
            _this.displayName = "XY";
            _this.description = "Creates an XY signal";
            _this.xInputSignalName = "X signal";
            _this.yInputSignalName = "Y signal";
            return _this;
        }
        /**
         * Returns the default input data for this calculator
         *
         * @returns {(Array<CalculationDataNumber|CalculationDataPoints|CalculationDataNumberOrPoints>)}
         * @memberof XYCalculator
         */
        XYCalculator.prototype.getDefaultInputData = function () {
            var inputData = new Array();
            // add input params with default displaynames
            inputData.push(new calculationDataPoints_1.CalculationDataPoints(this.xInputSignalName, "", new Array(), "X signal", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            inputData.push(new calculationDataPoints_1.CalculationDataPoints(this.yInputSignalName, "", new Array(), "Y signal", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            return inputData;
        };
        /**
         * Returns the default output data for this calculator
         *
         * @returns {Array<CalculationDataPoints>}
         * @memberof XYCalculator
         */
        XYCalculator.prototype.getDefaultOutputData = function () {
            var outputData = new Array();
            // add output params with default displaynames
            outputData.push(new calculationDataPoints_1.CalculationDataPoints("Output signal", "xySignal", new Array()));
            return outputData;
        };
        /**
         * Calculates the output value for the given input data
         *
         * @param {Array<ICalculationData>} inputData
         * @returns {Array<CalculationDataPoints>}
         * @memberof XYCalculator
         */
        XYCalculator.prototype.calculate = function (inputData) {
            this.clearErrors();
            var rawPoints = new Array();
            var outputData = new Array();
            outputData.push(new calculationDataPoints_1.CalculationDataPoints("Output signal", "xySignal", new Array()));
            outputData[0].setData(rawPoints); // Set empty raw points list by default
            var inputSignalData1 = inputData[0].getData();
            var inputSignalData2 = inputData[1].getData();
            // Check input data
            if (this.isInputXYDataValid(inputSignalData1, inputSignalData2) == false) {
                return outputData;
            }
            // calculate new data
            rawPoints = this.calculateRawPoints(inputSignalData1, inputSignalData2);
            // Set new data to calculation ouput data
            outputData[0].setData(rawPoints);
            return outputData;
        };
        /**
         * Checks if input data is valid
         *
         * @private
         * @param {Array<IPoint>} inputSignalData1
         * @param {Array<IPoint>} inputSignalData2
         * @returns {boolean}
         * @memberof XYCalculator
         */
        XYCalculator.prototype.isInputXYDataValid = function (inputSignalData1, inputSignalData2) {
            if (inputSignalData1 == undefined || inputSignalData1.length < 2) { // A minimum of two points is needed){
                this.addErrorByType(calculatorBase_1.ErroMessageType.MissingOrInvalidInput, [this.xInputSignalName]);
            }
            if (inputSignalData2 == undefined || inputSignalData2.length < 2) { // A minimum of two points is needed){
                this.addErrorByType(calculatorBase_1.ErroMessageType.MissingOrInvalidInput, [this.yInputSignalName]);
            }
            if (this.getErrors().length > 0) {
                return false;
            }
            return true;
        };
        /**
         * Returns output value
         *
         * @private
         * @param {*} inputSignalData1
         * @param {*} inputSignalData2
         * @returns {Array<IPoint>}
         * @memberof XYCalculator
         */
        XYCalculator.prototype.calculateRawPoints = function (inputSignalData1, inputSignalData2) {
            if (inputSignalData1 != undefined && inputSignalData2 != undefined) {
                return this.addTwoSignals(inputSignalData1, inputSignalData2);
            }
            return new Array();
        };
        /**
         * Calculates output value
         *
         * @private
         * @param {Array<IPoint>} inputSignal1
         * @param {Array<IPoint>} inputSignal2
         * @returns {Array<IPoint>}
         * @memberof XYCalculator
         */
        XYCalculator.prototype.addTwoSignals = function (inputSignal1, inputSignal2) {
            var points = new Array();
            if (inputSignal1.length == inputSignal2.length) { // Add only signals with same sample count
                for (var i = 0; i < inputSignal1.length; i++) {
                    var newX = inputSignal1[i].y;
                    var newY = inputSignal2[i].y;
                    // check if signal two has same x value
                    if (inputSignal1[i].x == inputSignal2[i].x) {
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
         * Performs optional preperation of input data.
         * Filters input signals for matching signal parts (samples with matching timestamps).
         *
         * @param {(Array<CalculationDataNumber|CalculationDataPoints|CalculationDataNumberOrPoints>)} inputData
         * @returns {(Array<CalculationDataNumber|CalculationDataPoints|CalculationDataNumberOrPoints>)}
         * @memberof XYCalculator
         */
        XYCalculator.prototype.prepareInputData = function (inputData) {
            inputData = _super.prototype.prepareInputData.call(this, inputData);
            inputData = calculatorHelper_1.CalculatorHelper.tryFilterMatchingSignalParts(inputData);
            return inputData;
        };
        return XYCalculator;
    }(calculatorBase_1.CalculatorBase));
    exports.XYCalculator = XYCalculator;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieHlDYWxjdWxhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdG9ycy94eUNhbGN1bGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVdBO1FBQWtDLGdDQUFjO1FBQWhEO1lBQUEscUVBMEpDO1lBeEpHLFFBQUUsR0FBVyxJQUFJLENBQUM7WUFDbEIsaUJBQVcsR0FBVyxJQUFJLENBQUM7WUFDM0IsaUJBQVcsR0FBVyxzQkFBc0IsQ0FBQztZQUVyQyxzQkFBZ0IsR0FBRyxVQUFVLENBQUM7WUFDOUIsc0JBQWdCLEdBQUcsVUFBVSxDQUFDOztRQW1KMUMsQ0FBQztRQWpKRzs7Ozs7V0FLRztRQUNJLDBDQUFtQixHQUExQjtZQUNJLElBQUksU0FBUyxHQUFHLElBQUksS0FBSyxFQUE2RSxDQUFDO1lBQ3ZHLDZDQUE2QztZQUM3QyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksNkNBQXFCLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsRUFBRSxJQUFJLEtBQUssRUFBVSxFQUFDLFVBQVUsRUFBRSxJQUFJLHVEQUEwQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEosU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLDZDQUFxQixDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLEVBQUUsSUFBSSxLQUFLLEVBQVUsRUFBQyxVQUFVLEVBQUUsSUFBSSx1REFBMEIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xKLE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNJLDJDQUFvQixHQUEzQjtZQUNJLElBQUksVUFBVSxHQUFHLElBQUksS0FBSyxFQUF5QixDQUFDO1lBQ3BELDhDQUE4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QUFDLEdBQUcsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztvQkFDeEMsSUFBSSxJQUFJLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDN0IsSUFBSSxJQUFJLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDN0IsdUNBQXVDO29CQUN2QyxJQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQzt3QkFDdEMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLGFBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztxQkFDdEM7eUJBQ0c7d0JBQ0EsMEVBQTBFO3dCQUMxRSxJQUFJLENBQUMsUUFBUSxDQUFDLHdFQUF3RSxDQUFDLENBQUM7d0JBQ3hGLE9BQU8sSUFBSSxLQUFLLEVBQVUsQ0FBQztxQkFDOUI7aUJBQ0o7YUFDSjtpQkFDRztnQkFDQSxJQUFJLENBQUMsUUFBUSxDQUFDLDRFQUE0RSxDQUFDLENBQUM7YUFDL0Y7WUFDRCxPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNJLHVDQUFnQixHQUF2QixVQUF3QixTQUEyRjtZQUUvRyxTQUFTLEdBQUcsaUJBQU0sZ0JBQWdCLFlBQUMsU0FBUyxDQUFDLENBQUM7WUFDOUMsU0FBUyxHQUFHLG1DQUFnQixDQUFDLDRCQUE0QixDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRXJFLE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFDTCxtQkFBQztJQUFELENBQUMsQUExSkQsQ0FBa0MsK0JBQWMsR0EwSi9DO0lBMUpZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUNhbGN1bGF0b3IgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9jYWxjdWxhdG9ySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElDYWxjdWxhdGlvbkRhdGEgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9jYWxjdWxhdGlvbkRhdGFJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi4vLi4vcG9pbnRcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhTnVtYmVyIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YU51bWJlclwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFQb2ludHMgfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhUG9pbnRzXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0b3JCYXNlLCBFcnJvTWVzc2FnZVR5cGUgfSBmcm9tIFwiLi9jYWxjdWxhdG9yQmFzZVwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdG9ySGVscGVyIH0gZnJvbSBcIi4vY2FsY3VsYXRvckhlbHBlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFhZQ2FsY3VsYXRvciBleHRlbmRzIENhbGN1bGF0b3JCYXNlIGltcGxlbWVudHMgSUNhbGN1bGF0b3J7XHJcbiAgICBcclxuICAgIGlkOiBzdHJpbmcgPSBcInh5XCI7XHJcbiAgICBkaXNwbGF5TmFtZTogc3RyaW5nID0gXCJYWVwiO1xyXG4gICAgZGVzY3JpcHRpb246IHN0cmluZyA9IFwiQ3JlYXRlcyBhbiBYWSBzaWduYWxcIjtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSB4SW5wdXRTaWduYWxOYW1lID0gXCJYIHNpZ25hbFwiO1xyXG4gICAgcHJpdmF0ZSB5SW5wdXRTaWduYWxOYW1lID0gXCJZIHNpZ25hbFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBpbnB1dCBkYXRhIGZvciB0aGlzIGNhbGN1bGF0b3JcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7KEFycmF5PENhbGN1bGF0aW9uRGF0YU51bWJlcnxDYWxjdWxhdGlvbkRhdGFQb2ludHN8Q2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHM+KX1cclxuICAgICAqIEBtZW1iZXJvZiBYWUNhbGN1bGF0b3JcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldERlZmF1bHRJbnB1dERhdGEoKTogQXJyYXk8Q2FsY3VsYXRpb25EYXRhTnVtYmVyfENhbGN1bGF0aW9uRGF0YVBvaW50c3xDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cz57XHJcbiAgICAgICAgbGV0IGlucHV0RGF0YSA9IG5ldyBBcnJheTxDYWxjdWxhdGlvbkRhdGFOdW1iZXJ8Q2FsY3VsYXRpb25EYXRhUG9pbnRzfENhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzPigpO1xyXG4gICAgICAgIC8vIGFkZCBpbnB1dCBwYXJhbXMgd2l0aCBkZWZhdWx0IGRpc3BsYXluYW1lc1xyXG4gICAgICAgIGlucHV0RGF0YS5wdXNoKG5ldyBDYWxjdWxhdGlvbkRhdGFQb2ludHModGhpcy54SW5wdXRTaWduYWxOYW1lLCBcIlwiLCBuZXcgQXJyYXk8SVBvaW50PigpLFwiWCBzaWduYWxcIiwgbmV3IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvKGZhbHNlLCB0cnVlKSkpO1xyXG4gICAgICAgIGlucHV0RGF0YS5wdXNoKG5ldyBDYWxjdWxhdGlvbkRhdGFQb2ludHModGhpcy55SW5wdXRTaWduYWxOYW1lLCBcIlwiLCBuZXcgQXJyYXk8SVBvaW50PigpLFwiWSBzaWduYWxcIiwgbmV3IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvKGZhbHNlLCB0cnVlKSkpO1xyXG4gICAgICAgIHJldHVybiBpbnB1dERhdGE7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBvdXRwdXQgZGF0YSBmb3IgdGhpcyBjYWxjdWxhdG9yXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0FycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz59XHJcbiAgICAgKiBAbWVtYmVyb2YgWFlDYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXREZWZhdWx0T3V0cHV0RGF0YSgpOiBBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+e1xyXG4gICAgICAgIGxldCBvdXRwdXREYXRhID0gbmV3IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz4oKTtcclxuICAgICAgICAvLyBhZGQgb3V0cHV0IHBhcmFtcyB3aXRoIGRlZmF1bHQgZGlzcGxheW5hbWVzXHJcbiAgICAgICAgb3V0cHV0RGF0YS5wdXNoKG5ldyBDYWxjdWxhdGlvbkRhdGFQb2ludHMoXCJPdXRwdXQgc2lnbmFsXCIsIFwieHlTaWduYWxcIiwgbmV3IEFycmF5PElQb2ludD4oKSkpOyBcclxuICAgICAgICByZXR1cm4gb3V0cHV0RGF0YTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0ZXMgdGhlIG91dHB1dCB2YWx1ZSBmb3IgdGhlIGdpdmVuIGlucHV0IGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElDYWxjdWxhdGlvbkRhdGE+fSBpbnB1dERhdGFcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+fVxyXG4gICAgICogQG1lbWJlcm9mIFhZQ2FsY3VsYXRvclxyXG4gICAgICovXHJcbiAgICBjYWxjdWxhdGUoaW5wdXREYXRhOiBBcnJheTxJQ2FsY3VsYXRpb25EYXRhPik6IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz4ge1xyXG4gICAgICAgIHRoaXMuY2xlYXJFcnJvcnMoKTtcclxuXHJcbiAgICAgICAgbGV0IHJhd1BvaW50cyA9IG5ldyBBcnJheTxJUG9pbnQ+KCk7XHJcbiAgICAgICAgbGV0IG91dHB1dERhdGEgPSBuZXcgQXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPigpO1xyXG4gICAgICAgIG91dHB1dERhdGEucHVzaChuZXcgQ2FsY3VsYXRpb25EYXRhUG9pbnRzKFwiT3V0cHV0IHNpZ25hbFwiLCBcInh5U2lnbmFsXCIsIG5ldyBBcnJheTxJUG9pbnQ+KCkpKTsgXHJcbiAgICAgICAgb3V0cHV0RGF0YVswXS5zZXREYXRhKHJhd1BvaW50cyk7IC8vIFNldCBlbXB0eSByYXcgcG9pbnRzIGxpc3QgYnkgZGVmYXVsdFxyXG5cclxuICAgICAgICBsZXQgaW5wdXRTaWduYWxEYXRhMSA9IChpbnB1dERhdGFbMF0gYXMgQ2FsY3VsYXRpb25EYXRhUG9pbnRzKS5nZXREYXRhKCk7XHJcbiAgICAgICAgbGV0IGlucHV0U2lnbmFsRGF0YTIgPSAoaW5wdXREYXRhWzFdIGFzIENhbGN1bGF0aW9uRGF0YVBvaW50cykuZ2V0RGF0YSgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIENoZWNrIGlucHV0IGRhdGFcclxuICAgICAgICBpZih0aGlzLmlzSW5wdXRYWURhdGFWYWxpZChpbnB1dFNpZ25hbERhdGExLCBpbnB1dFNpZ25hbERhdGEyKSA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgIHJldHVybiBvdXRwdXREYXRhO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBjYWxjdWxhdGUgbmV3IGRhdGFcclxuICAgICAgICByYXdQb2ludHMgPSB0aGlzLmNhbGN1bGF0ZVJhd1BvaW50cyhpbnB1dFNpZ25hbERhdGExLCBpbnB1dFNpZ25hbERhdGEyKTtcclxuXHJcbiAgICAgICAgLy8gU2V0IG5ldyBkYXRhIHRvIGNhbGN1bGF0aW9uIG91cHV0IGRhdGFcclxuICAgICAgICBvdXRwdXREYXRhWzBdLnNldERhdGEocmF3UG9pbnRzKTtcclxuICAgICAgICByZXR1cm4gb3V0cHV0RGF0YTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiBpbnB1dCBkYXRhIGlzIHZhbGlkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SVBvaW50Pn0gaW5wdXRTaWduYWxEYXRhMVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxJUG9pbnQ+fSBpbnB1dFNpZ25hbERhdGEyXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBYWUNhbGN1bGF0b3JcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpc0lucHV0WFlEYXRhVmFsaWQoaW5wdXRTaWduYWxEYXRhMTogQXJyYXk8SVBvaW50PiwgaW5wdXRTaWduYWxEYXRhMjogQXJyYXk8SVBvaW50Pik6IGJvb2xlYW57XHJcbiAgICAgICAgaWYoaW5wdXRTaWduYWxEYXRhMSA9PSB1bmRlZmluZWQgfHwgaW5wdXRTaWduYWxEYXRhMS5sZW5ndGggPCAyKXsgLy8gQSBtaW5pbXVtIG9mIHR3byBwb2ludHMgaXMgbmVlZGVkKXtcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvckJ5VHlwZShFcnJvTWVzc2FnZVR5cGUuTWlzc2luZ09ySW52YWxpZElucHV0LCBbdGhpcy54SW5wdXRTaWduYWxOYW1lXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGlucHV0U2lnbmFsRGF0YTIgPT0gdW5kZWZpbmVkIHx8IGlucHV0U2lnbmFsRGF0YTIubGVuZ3RoIDwgMil7IC8vIEEgbWluaW11bSBvZiB0d28gcG9pbnRzIGlzIG5lZWRlZCl7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JCeVR5cGUoRXJyb01lc3NhZ2VUeXBlLk1pc3NpbmdPckludmFsaWRJbnB1dCwgW3RoaXMueUlucHV0U2lnbmFsTmFtZV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5nZXRFcnJvcnMoKS5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIG91dHB1dCB2YWx1ZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGlucHV0U2lnbmFsRGF0YTFcclxuICAgICAqIEBwYXJhbSB7Kn0gaW5wdXRTaWduYWxEYXRhMlxyXG4gICAgICogQHJldHVybnMge0FycmF5PElQb2ludD59XHJcbiAgICAgKiBAbWVtYmVyb2YgWFlDYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2FsY3VsYXRlUmF3UG9pbnRzKGlucHV0U2lnbmFsRGF0YTEsIGlucHV0U2lnbmFsRGF0YTIpIDogQXJyYXk8SVBvaW50PntcclxuICAgICAgICBpZihpbnB1dFNpZ25hbERhdGExICE9IHVuZGVmaW5lZCAmJiBpbnB1dFNpZ25hbERhdGEyICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFkZFR3b1NpZ25hbHMoaW5wdXRTaWduYWxEYXRhMSwgaW5wdXRTaWduYWxEYXRhMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgQXJyYXk8SVBvaW50PigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsY3VsYXRlcyBvdXRwdXQgdmFsdWVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxJUG9pbnQ+fSBpbnB1dFNpZ25hbDFcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SVBvaW50Pn0gaW5wdXRTaWduYWwyXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8SVBvaW50Pn1cclxuICAgICAqIEBtZW1iZXJvZiBYWUNhbGN1bGF0b3JcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRUd29TaWduYWxzKGlucHV0U2lnbmFsMTogQXJyYXk8SVBvaW50PiwgaW5wdXRTaWduYWwyOiBBcnJheTxJUG9pbnQ+KTogQXJyYXk8SVBvaW50PntcclxuICAgICAgICBsZXQgcG9pbnRzID0gbmV3IEFycmF5PElQb2ludD4oKTtcclxuICAgICAgICBpZihpbnB1dFNpZ25hbDEubGVuZ3RoID09IGlucHV0U2lnbmFsMi5sZW5ndGgpeyAvLyBBZGQgb25seSBzaWduYWxzIHdpdGggc2FtZSBzYW1wbGUgY291bnRcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGlucHV0U2lnbmFsMS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3WCA9IGlucHV0U2lnbmFsMVtpXS55O1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld1kgPSBpbnB1dFNpZ25hbDJbaV0ueTtcclxuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGlmIHNpZ25hbCB0d28gaGFzIHNhbWUgeCB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgaWYoaW5wdXRTaWduYWwxW2ldLnggPT0gaW5wdXRTaWduYWwyW2ldLngpe1xyXG4gICAgICAgICAgICAgICAgICAgIHBvaW50cy5wdXNoKG5ldyBQb2ludChuZXdYLCBuZXdZKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEFkZCBvZiB0d28gZGlmZmVyZW50IHNpZ25hbHMoZGlmZmVyZW50IHggdmFsdWVzKSBjdXJyZW50bHkgbm90IHBvc3NpYmxlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRFcnJvcihcIkNhbGN1bGF0aW9uIEVycm9yOiBUaGUgaW5wdXQgc2lnbmFscyBkb24ndCBoYXZlIGVxdWFsIHggKHRpbWUpIHZhbHVlcyFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBBcnJheTxJUG9pbnQ+KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvcihcIkNhbGN1bGF0aW9uIEVycm9yOiBUaGUgaW5wdXQgc2lnbmFscyBkb24ndCBoYXZlIHRoZSBzYW1lIG51bWJlciBvZiBwb2ludHMhXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcG9pbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUGVyZm9ybXMgb3B0aW9uYWwgcHJlcGVyYXRpb24gb2YgaW5wdXQgZGF0YS5cclxuICAgICAqIEZpbHRlcnMgaW5wdXQgc2lnbmFscyBmb3IgbWF0Y2hpbmcgc2lnbmFsIHBhcnRzIChzYW1wbGVzIHdpdGggbWF0Y2hpbmcgdGltZXN0YW1wcykuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsoQXJyYXk8Q2FsY3VsYXRpb25EYXRhTnVtYmVyfENhbGN1bGF0aW9uRGF0YVBvaW50c3xDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cz4pfSBpbnB1dERhdGFcclxuICAgICAqIEByZXR1cm5zIHsoQXJyYXk8Q2FsY3VsYXRpb25EYXRhTnVtYmVyfENhbGN1bGF0aW9uRGF0YVBvaW50c3xDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cz4pfVxyXG4gICAgICogQG1lbWJlcm9mIFhZQ2FsY3VsYXRvclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcHJlcGFyZUlucHV0RGF0YShpbnB1dERhdGE6IEFycmF5PENhbGN1bGF0aW9uRGF0YU51bWJlcnxDYWxjdWxhdGlvbkRhdGFQb2ludHN8Q2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHM+KTogQXJyYXk8Q2FsY3VsYXRpb25EYXRhTnVtYmVyfENhbGN1bGF0aW9uRGF0YVBvaW50c3xDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cz4ge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlucHV0RGF0YSA9IHN1cGVyLnByZXBhcmVJbnB1dERhdGEoaW5wdXREYXRhKTtcclxuICAgICAgICBpbnB1dERhdGEgPSBDYWxjdWxhdG9ySGVscGVyLnRyeUZpbHRlck1hdGNoaW5nU2lnbmFsUGFydHMoaW5wdXREYXRhKTtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gaW5wdXREYXRhO1xyXG4gICAgfVxyXG59Il19