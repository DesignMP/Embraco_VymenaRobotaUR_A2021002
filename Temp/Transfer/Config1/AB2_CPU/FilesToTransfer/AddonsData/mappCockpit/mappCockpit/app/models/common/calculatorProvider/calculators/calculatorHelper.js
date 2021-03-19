define(["require", "exports", "../calculationDataPoints", "../../../../common/math/mathX"], function (require, exports, calculationDataPoints_1, mathX_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Helper class for calculator to provide common functionalities only used in some calculators.
     *
     * @class CalculatorHelper
     */
    var CalculatorHelper = /** @class */ (function () {
        /**
         * Constructor set to private as Helper class should only provide static helper functions.
         * Creates an instance of CalculatorHelper.
         * @memberof CalculatorHelper
         */
        function CalculatorHelper() {
        }
        ;
        /**
         * Filters two input signals for matching signal parts.
         *
         * @static
         * @param {(Array<TCalculationData>)} inputData
         * @returns {(Array<TCalculationData>)}
         * @memberof CalculatorHelper
         */
        CalculatorHelper.tryFilterMatchingSignalParts = function (inputData) {
            var outputData = inputData;
            var input1 = inputData[0].getData();
            var input2 = inputData[1].getData();
            if (Array.isArray(input1) && Array.isArray(input2)
                && input1.length >= 2 && input2.length >= 2) { // only filter for matching signal parts if both inputs are valid signals
                var dataContainer = {
                    pointArray1: input1,
                    pointArray2: input2
                };
                dataContainer = CalculatorHelper.filterMatchingPointsByXvalue(dataContainer);
                //create new calculation data points with filtered signals to cut the connection with input data
                var dataPoints1 = new calculationDataPoints_1.CalculationDataPoints(inputData[0].getDisplayName(), inputData[0].value, dataContainer.pointArray1, inputData[0].description, inputData[0].displayInfo);
                var dataPoints2 = new calculationDataPoints_1.CalculationDataPoints(inputData[1].getDisplayName(), inputData[1].value, dataContainer.pointArray2, inputData[1].description, inputData[1].displayInfo);
                outputData = new Array();
                outputData.push(dataPoints1);
                outputData.push(dataPoints2);
            }
            return outputData;
        };
        /**
         * Gathers Samples of same timestamp from two signals.
         * Used to filter two signals for only the matching parts of the signal (by timestamp).
         *
         * @static
         * @param {TwoPointArraysContainer} input
         * @returns {TwoPointArraysContainer} Matching signal parts based on timestamp.
         * @memberof CalculatorHelper
         */
        CalculatorHelper.filterMatchingPointsByXvalue = function (input) {
            var gatheredPoints = {
                pointArray1: new Array(),
                pointArray2: new Array()
            };
            var i = 0;
            var j = 0;
            //extract samples with matching timestamps by iterating both signals at once.
            //worst case iteration amount is length of input1 + length of input2.
            while (i < input.pointArray1.length && j < input.pointArray2.length) {
                if (input.pointArray1[i].x < input.pointArray2[j].x) {
                    i++;
                }
                else if (input.pointArray1[i].x > input.pointArray2[j].x) {
                    j++;
                }
                else {
                    gatheredPoints.pointArray1.push(input.pointArray1[i]);
                    gatheredPoints.pointArray2.push(input.pointArray2[j]);
                    i++;
                    j++;
                }
            }
            return gatheredPoints;
        };
        /**
         * Estimates the sample time to remove jitterbased on median and rounding.
         *
         * @static
         * @param {Array<IPoint>} signalData
         * @returns {number}
         * @memberof CalculatorHelper
         */
        CalculatorHelper.estimateSampleTime = function (signalData) {
            var sampleTime = this.getMedianOfSampleTime(signalData);
            sampleTime = this.roundSampleTime(sampleTime);
            return sampleTime;
        };
        /**
         * Calculates the median of the sampletimes
         *
         * @private
         * @static
         * @param {Array<IPoint>} signalData
         * @returns {number}
         * @memberof CalculatorHelper
         */
        CalculatorHelper.getMedianOfSampleTime = function (signalData) {
            var sampleTimes = new Array();
            for (var i = 0; i < signalData.length - 1; i++) {
                var sampleTime_1 = signalData[i + 1].x - signalData[i].x;
                sampleTimes.push(sampleTime_1);
            }
            var sampleTime = mathX_1.MathX.median(sampleTimes);
            return sampleTime;
        };
        /**
         * Rounds the sampletime
         *
         * @private
         * @static
         * @param {number} sampleTime
         * @returns
         * @memberof CalculatorHelper
         */
        CalculatorHelper.roundSampleTime = function (sampleTime) {
            sampleTime = sampleTime * 20000;
            sampleTime = Math.round(sampleTime);
            sampleTime = sampleTime / 20000;
            return sampleTime;
        };
        /**
         * Checks whether the Y values of a signal contain a non-finite/NaN value.
         *
         * @static
         * @param {Array<IPoint>} signal Signal to be checked.
         * @returns {boolean} Returns true if NaN or +/- Infinity is contained.
         * @memberof CalculatorHelper
         */
        CalculatorHelper.containsNaNOrInfinityInYvalue = function (signal) {
            var containsNaNOrInfinity = false;
            for (var i = 0; i < signal.length && !containsNaNOrInfinity; i++) {
                if (Number.isNaN(signal[i].y) || !Number.isFinite(signal[i].y)) {
                    containsNaNOrInfinity = true;
                }
            }
            return containsNaNOrInfinity;
        };
        /**
         * Returning true if array has NaN or infinity values
         *
         * @public
         * @static
         * @param {Array<number>} signalData
         * @returns {boolean}
         * @memberof StringMathjsCalculator
         */
        CalculatorHelper.arrayHasNaNOrInvinityValues = function (signalData) {
            for (var i = 0; i < signalData.length; i++) {
                if (isNaN(signalData[i]) || !isFinite(signalData[i])) {
                    return true;
                }
            }
            return false;
        };
        /**
         * Checks whether the signal has at least length of minimum
         *
         * @static
         * @param {Array<IPoint>} signal
         * @param {number} [minimum=2] The default minimum is 2.
         * @returns {boolean} Returns true if the signal length is equal or longer than minimum
         * @memberof CalculatorHelper
         */
        CalculatorHelper.isSignalLongerThanMinimum = function (signal, minimum) {
            if (minimum === void 0) { minimum = 2; }
            return signal.length >= minimum;
        };
        /**
         * Checks whether the given CalculationInputData is a signal.
         *
         * @static
         * @param {(Array<IPoint> | number | string)} calculationInputData
         * @returns {calculationInputData is Array<IPoint>}
         * @memberof CalculatorHelper
         */
        CalculatorHelper.calculationInputDataIsSignal = function (calculationInputData) {
            var isSignal = false;
            if (Array.isArray(calculationInputData)) {
                isSignal = true;
            }
            return isSignal;
        };
        /**
         * Checks whether the given CalculationInputData is a number.
         *
         * @static
         * @param {(Array<IPoint> | number | string)} calculationInputData
         * @returns {calculationInputData is number}
         * @memberof CalculatorHelper
         */
        CalculatorHelper.calculationInputDataIsNumber = function (calculationInputData) {
            var isNumber = false;
            if (typeof calculationInputData === "number") {
                isNumber = true;
            }
            return isNumber;
        };
        /**
         * Checks whether the given CalculationInputData is a string.
         *
         * @static
         * @param {(Array<IPoint> | number | string)} calculationInputData
         * @returns {calculationInputData is string}
         * @memberof CalculatorHelper
         */
        CalculatorHelper.calculationInputDataIsString = function (calculationInputData) {
            var isString = false;
            if (typeof calculationInputData === "string") {
                isString = true;
            }
            return isString;
        };
        /**
         * Validates a signal if it has at least two points and only valid (finite, non-NaN) Y values contained.
         *
         * @private
         * @static
         * @param {IPoint[]} signal
         * @returns {boolean} Returns true if signal is valid.
         * @memberof CalculatorHelper
         */
        CalculatorHelper.isValidSignal = function (signal) {
            var isValid = false;
            if (CalculatorHelper.isSignalLongerThanMinimum(signal) && !this.containsNaNOrInfinityInYvalue(signal)) {
                isValid = true;
            }
            return isValid;
        };
        /**
         * Validates a number if it is finite and non-NaN
         *
         * @private
         * @static
         * @param {number} num
         * @returns {boolean} Returns true if number is valid.
         * @memberof CalculatorHelper
         */
        CalculatorHelper.isValidNumber = function (num) {
            var isValid = false;
            if (!Number.isNaN(num) && Number.isFinite(num)) {
                isValid = true;
            }
            return isValid;
        };
        /**
         *
         * Returns the amount of 0 of Y-values in an IPoint Array
         *
         * @public
         * @static
         * @param {Array<IPoint>} arr
         * @returns {number}
         * @memberof CalculatorHelper
         */
        CalculatorHelper.amountOfZerosInIPointArrayInYValues = function (arr) {
            var cnt = 0;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].y == 0) {
                    ++cnt;
                }
            }
            return cnt;
        };
        /**
         * Return true when the Y values of an IPoint Array contain a floating type number
         *
         * @public
         * @static
         * @param {Array<IPoint>} inputSignal
         * @returns {boolean}
         * @memberof calculatorHelper
         */
        CalculatorHelper.iPointArrayHasFloatInYValues = function (inputSignal) {
            for (var i = 0; i < inputSignal.length; i++) {
                if (!Number.isSafeInteger(inputSignal[i].y)) {
                    return true;
                }
            }
            return false;
        };
        /**
         * Returns true, when the x values of the IPoint array are strictly monotonically increasing (each value is geater than the previous one).
         *
         * @static
         * @param {Array<IPoint>} inputSignal
         * @returns {boolean}
         * @memberof CalculatorHelper
         */
        CalculatorHelper.isStrictlyMonotonicallyIncreasingInTime = function (inputSignal) {
            return inputSignal.every(function (currentPoint, index, data) {
                return (index !== 0) ? (currentPoint.x > data[index - 1].x) : true;
            });
        };
        return CalculatorHelper;
    }());
    exports.CalculatorHelper = CalculatorHelper;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsY3VsYXRvckhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRvcnMvY2FsY3VsYXRvckhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFTQTs7OztPQUlHO0lBQ0g7UUFHSTs7OztXQUlHO1FBQ0g7UUFBdUIsQ0FBQztRQUFBLENBQUM7UUFHekI7Ozs7Ozs7V0FPRztRQUNXLDZDQUE0QixHQUExQyxVQUEyQyxTQUFtQztZQUUxRSxJQUFJLFVBQVUsR0FBRyxTQUFTLENBQUM7WUFFM0IsSUFBSSxNQUFNLEdBQTRCLFNBQVMsQ0FBQyxDQUFDLENBQXFCLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDakYsSUFBSSxNQUFNLEdBQTRCLFNBQVMsQ0FBQyxDQUFDLENBQXFCLENBQUMsT0FBTyxFQUFFLENBQUM7WUFFakYsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO21CQUMzQyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRSxFQUFFLHlFQUF5RTtnQkFFeEgsSUFBSSxhQUFhLEdBQTRCO29CQUN6QyxXQUFXLEVBQUUsTUFBTTtvQkFDbkIsV0FBVyxFQUFFLE1BQU07aUJBQ3RCLENBQUM7Z0JBRUYsYUFBYSxHQUFHLGdCQUFnQixDQUFDLDRCQUE0QixDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUU3RSxnR0FBZ0c7Z0JBQ2hHLElBQUksV0FBVyxHQUFHLElBQUksNkNBQXFCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMs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SyxDQUFDLFVBQUMsWUFBWSxFQUFFLEtBQUssRUFBRSxJQUFJO2dCQUMzQyxPQUFPLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ3JFLENBQUMsQ0FBQyxDQUFDO1FBQ1gsQ0FBQztRQUNMLHVCQUFDO0lBQUQsQ0FBQyxBQTNWRCxJQTJWQztJQUVRLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElQb2ludCB9IGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhUG9pbnRzIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YVBvaW50c1wiO1xyXG5pbXBvcnQgeyBNYXRoWCB9IGZyb20gXCIuLi8uLi8uLi8uLi9jb21tb24vbWF0aC9tYXRoWFwiO1xyXG5pbXBvcnQgeyBUQ2FsY3VsYXRpb25EYXRhLCBDYWxjdWxhdGlvbkRhdGEgfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhXCI7XHJcblxyXG4vL1R5cGUgYWxpYXMgdG8gcHJvdmlkZSBhIG5hbWUgZm9yIHN0cnVjdHVyZSByZXR1cm5lIGJ5IGdhdGhlclNhbXBsZXNXaXRoU2FtZVRpbWVzdGFtcFxyXG50eXBlIFR3b1BvaW50QXJyYXlzQ29udGFpbmVyID0geyBwb2ludEFycmF5MTogQXJyYXk8SVBvaW50PiwgcG9pbnRBcnJheTI6IEFycmF5PElQb2ludD59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBIZWxwZXIgY2xhc3MgZm9yIGNhbGN1bGF0b3IgdG8gcHJvdmlkZSBjb21tb24gZnVuY3Rpb25hbGl0aWVzIG9ubHkgdXNlZCBpbiBzb21lIGNhbGN1bGF0b3JzLlxyXG4gKlxyXG4gKiBAY2xhc3MgQ2FsY3VsYXRvckhlbHBlclxyXG4gKi9cclxuY2xhc3MgQ2FsY3VsYXRvckhlbHBlciB7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29uc3RydWN0b3Igc2V0IHRvIHByaXZhdGUgYXMgSGVscGVyIGNsYXNzIHNob3VsZCBvbmx5IHByb3ZpZGUgc3RhdGljIGhlbHBlciBmdW5jdGlvbnMuXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIENhbGN1bGF0b3JIZWxwZXIuXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRvckhlbHBlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge307XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmlsdGVycyB0d28gaW5wdXQgc2lnbmFscyBmb3IgbWF0Y2hpbmcgc2lnbmFsIHBhcnRzLlxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7KEFycmF5PFRDYWxjdWxhdGlvbkRhdGE+KX0gaW5wdXREYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7KEFycmF5PFRDYWxjdWxhdGlvbkRhdGE+KX1cclxuICAgICAqIEBtZW1iZXJvZiBDYWxjdWxhdG9ySGVscGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgdHJ5RmlsdGVyTWF0Y2hpbmdTaWduYWxQYXJ0cyhpbnB1dERhdGE6ICBBcnJheTxUQ2FsY3VsYXRpb25EYXRhPik6ICBBcnJheTxUQ2FsY3VsYXRpb25EYXRhPiB7XHJcblxyXG4gICAgICAgIGxldCBvdXRwdXREYXRhID0gaW5wdXREYXRhO1xyXG5cclxuICAgICAgICBsZXQgaW5wdXQxOiBzdHJpbmd8bnVtYmVyfElQb2ludFtdID0gKGlucHV0RGF0YVswXSBhcyBDYWxjdWxhdGlvbkRhdGEpLmdldERhdGEoKTtcclxuICAgICAgICBsZXQgaW5wdXQyOiBzdHJpbmd8bnVtYmVyfElQb2ludFtdID0gKGlucHV0RGF0YVsxXSBhcyBDYWxjdWxhdGlvbkRhdGEpLmdldERhdGEoKTtcclxuICAgICAgICBcclxuICAgICAgICBpZiggQXJyYXkuaXNBcnJheShpbnB1dDEpICYmIEFycmF5LmlzQXJyYXkoaW5wdXQyKSBcclxuICAgICAgICAgICAgJiYgaW5wdXQxLmxlbmd0aCA+PSAyICYmIGlucHV0Mi5sZW5ndGggPj0gMikgeyAvLyBvbmx5IGZpbHRlciBmb3IgbWF0Y2hpbmcgc2lnbmFsIHBhcnRzIGlmIGJvdGggaW5wdXRzIGFyZSB2YWxpZCBzaWduYWxzXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgZGF0YUNvbnRhaW5lcjogVHdvUG9pbnRBcnJheXNDb250YWluZXIgPSB7XHJcbiAgICAgICAgICAgICAgICBwb2ludEFycmF5MTogaW5wdXQxLFxyXG4gICAgICAgICAgICAgICAgcG9pbnRBcnJheTI6IGlucHV0MlxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgZGF0YUNvbnRhaW5lciA9IENhbGN1bGF0b3JIZWxwZXIuZmlsdGVyTWF0Y2hpbmdQb2ludHNCeVh2YWx1ZShkYXRhQ29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgICAgIC8vY3JlYXRlIG5ldyBjYWxjdWxhdGlvbiBkYXRhIHBvaW50cyB3aXRoIGZpbHRlcmVkIHNpZ25hbHMgdG8gY3V0IHRoZSBjb25uZWN0aW9uIHdpdGggaW5wdXQgZGF0YVxyXG4gICAgICAgICAgICBsZXQgZGF0YVBvaW50czEgPSBuZXcgQ2FsY3VsYXRpb25EYXRhUG9pbnRzKGlucHV0RGF0YVswXS5nZXREaXNwbGF5TmFtZSgpLCBpbnB1dERhdGFbMF0udmFsdWUsIGRhdGFDb250YWluZXIucG9pbnRBcnJheTEsIGlucHV0RGF0YVswXS5kZXNjcmlwdGlvbiwgaW5wdXREYXRhWzBdLmRpc3BsYXlJbmZvICk7XHJcbiAgICAgICAgICAgIGxldCBkYXRhUG9pbnRzMiA9IG5ldyBDYWxjdWxhdGlvbkRhdGFQb2ludHMoaW5wdXREYXRhWzFdLmdldERpc3BsYXlOYW1lKCksIGlucHV0RGF0YVsxXS52YWx1ZSwgZGF0YUNvbnRhaW5lci5wb2ludEFycmF5MiwgaW5wdXREYXRhWzFdLmRlc2NyaXB0aW9uLCBpbnB1dERhdGFbMV0uZGlzcGxheUluZm8gKTtcclxuXHJcbiAgICAgICAgICAgIG91dHB1dERhdGEgPSBuZXcgQXJyYXk8VENhbGN1bGF0aW9uRGF0YT4oKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG91dHB1dERhdGEucHVzaChkYXRhUG9pbnRzMSk7XHJcbiAgICAgICAgICAgIG91dHB1dERhdGEucHVzaChkYXRhUG9pbnRzMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBvdXRwdXREYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2F0aGVycyBTYW1wbGVzIG9mIHNhbWUgdGltZXN0YW1wIGZyb20gdHdvIHNpZ25hbHMuXHJcbiAgICAgKiBVc2VkIHRvIGZpbHRlciB0d28gc2lnbmFscyBmb3Igb25seSB0aGUgbWF0Y2hpbmcgcGFydHMgb2YgdGhlIHNpZ25hbCAoYnkgdGltZXN0YW1wKS5cclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge1R3b1BvaW50QXJyYXlzQ29udGFpbmVyfSBpbnB1dFxyXG4gICAgICogQHJldHVybnMge1R3b1BvaW50QXJyYXlzQ29udGFpbmVyfSBNYXRjaGluZyBzaWduYWwgcGFydHMgYmFzZWQgb24gdGltZXN0YW1wLlxyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0b3JIZWxwZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBmaWx0ZXJNYXRjaGluZ1BvaW50c0J5WHZhbHVlKGlucHV0OiBUd29Qb2ludEFycmF5c0NvbnRhaW5lcik6IFR3b1BvaW50QXJyYXlzQ29udGFpbmVyIHtcclxuXHJcbiAgICAgICAgbGV0IGdhdGhlcmVkUG9pbnRzOiBUd29Qb2ludEFycmF5c0NvbnRhaW5lciA9IHtcclxuICAgICAgICAgICAgcG9pbnRBcnJheTE6IG5ldyBBcnJheTxJUG9pbnQ+KCksXHJcbiAgICAgICAgICAgIHBvaW50QXJyYXkyOiBuZXcgQXJyYXk8SVBvaW50PigpXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGV0IGk6IG51bWJlcj0wO1xyXG4gICAgICAgIGxldCBqOiBudW1iZXI9MDtcclxuXHJcbiAgICAgICAgLy9leHRyYWN0IHNhbXBsZXMgd2l0aCBtYXRjaGluZyB0aW1lc3RhbXBzIGJ5IGl0ZXJhdGluZyBib3RoIHNpZ25hbHMgYXQgb25jZS5cclxuICAgICAgICAvL3dvcnN0IGNhc2UgaXRlcmF0aW9uIGFtb3VudCBpcyBsZW5ndGggb2YgaW5wdXQxICsgbGVuZ3RoIG9mIGlucHV0Mi5cclxuICAgICAgICB3aGlsZSAoaSA8IGlucHV0LnBvaW50QXJyYXkxLmxlbmd0aCAmJiBqIDwgaW5wdXQucG9pbnRBcnJheTIubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoaW5wdXQucG9pbnRBcnJheTFbaV0ueCA8IGlucHV0LnBvaW50QXJyYXkyW2pdLngpIHtcclxuICAgICAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpbnB1dC5wb2ludEFycmF5MVtpXS54ID4gaW5wdXQucG9pbnRBcnJheTJbal0ueCkge1xyXG4gICAgICAgICAgICAgICAgaisrO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZ2F0aGVyZWRQb2ludHMucG9pbnRBcnJheTEucHVzaChpbnB1dC5wb2ludEFycmF5MVtpXSk7XHJcbiAgICAgICAgICAgICAgICBnYXRoZXJlZFBvaW50cy5wb2ludEFycmF5Mi5wdXNoKGlucHV0LnBvaW50QXJyYXkyW2pdKTtcclxuICAgICAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgICAgIGorKzsgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHJldHVybiBnYXRoZXJlZFBvaW50cztcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRXN0aW1hdGVzIHRoZSBzYW1wbGUgdGltZSB0byByZW1vdmUgaml0dGVyYmFzZWQgb24gbWVkaWFuIGFuZCByb3VuZGluZy5cclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElQb2ludD59IHNpZ25hbERhdGFcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRvckhlbHBlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGVzdGltYXRlU2FtcGxlVGltZShzaWduYWxEYXRhOiBBcnJheTxJUG9pbnQ+KTogbnVtYmVyeyAgICAgICAgXHJcbiAgICAgICAgbGV0IHNhbXBsZVRpbWUgPSB0aGlzLmdldE1lZGlhbk9mU2FtcGxlVGltZShzaWduYWxEYXRhKTtcclxuICAgICAgICBzYW1wbGVUaW1lID0gdGhpcy5yb3VuZFNhbXBsZVRpbWUoc2FtcGxlVGltZSk7XHJcbiAgICAgICAgcmV0dXJuIHNhbXBsZVRpbWU7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsY3VsYXRlcyB0aGUgbWVkaWFuIG9mIHRoZSBzYW1wbGV0aW1lc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElQb2ludD59IHNpZ25hbERhdGFcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRvckhlbHBlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZXRNZWRpYW5PZlNhbXBsZVRpbWUoc2lnbmFsRGF0YTogQXJyYXk8SVBvaW50Pik6bnVtYmVye1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBzYW1wbGVUaW1lcyA6IEFycmF5PG51bWJlcj49IG5ldyBBcnJheTxudW1iZXI+KCk7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8c2lnbmFsRGF0YS5sZW5ndGgtMTsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IHNhbXBsZVRpbWUgPSBzaWduYWxEYXRhW2krMV0ueCAtIHNpZ25hbERhdGFbaV0ueDtcclxuICAgICAgICAgICAgc2FtcGxlVGltZXMucHVzaChzYW1wbGVUaW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzYW1wbGVUaW1lID0gTWF0aFgubWVkaWFuKHNhbXBsZVRpbWVzKTsgICAgIFxyXG5cclxuICAgICAgICByZXR1cm4gc2FtcGxlVGltZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSb3VuZHMgdGhlIHNhbXBsZXRpbWVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNhbXBsZVRpbWVcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRvckhlbHBlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyByb3VuZFNhbXBsZVRpbWUoc2FtcGxlVGltZSA6IG51bWJlcil7XHJcbiAgICAgICAgc2FtcGxlVGltZSA9IHNhbXBsZVRpbWUqMjAwMDA7XHJcbiAgICAgICAgc2FtcGxlVGltZSA9IE1hdGgucm91bmQoc2FtcGxlVGltZSk7XHJcbiAgICAgICAgc2FtcGxlVGltZSA9IHNhbXBsZVRpbWUvMjAwMDA7XHJcbiAgICAgICAgcmV0dXJuIHNhbXBsZVRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgWSB2YWx1ZXMgb2YgYSBzaWduYWwgY29udGFpbiBhIG5vbi1maW5pdGUvTmFOIHZhbHVlLlxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SVBvaW50Pn0gc2lnbmFsIFNpZ25hbCB0byBiZSBjaGVja2VkLlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiBOYU4gb3IgKy8tIEluZmluaXR5IGlzIGNvbnRhaW5lZC5cclxuICAgICAqIEBtZW1iZXJvZiBDYWxjdWxhdG9ySGVscGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY29udGFpbnNOYU5PckluZmluaXR5SW5ZdmFsdWUoc2lnbmFsOiBBcnJheTxJUG9pbnQ+KSA6IGJvb2xlYW4ge1xyXG5cclxuICAgICAgICBsZXQgY29udGFpbnNOYU5PckluZmluaXR5OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzaWduYWwubGVuZ3RoICYmICFjb250YWluc05hTk9ySW5maW5pdHk7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgaWYoTnVtYmVyLmlzTmFOKHNpZ25hbFtpXS55KSB8fCAhTnVtYmVyLmlzRmluaXRlKHNpZ25hbFtpXS55KSkge1xyXG4gICAgICAgICAgICAgICAgY29udGFpbnNOYU5PckluZmluaXR5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5zTmFOT3JJbmZpbml0eTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybmluZyB0cnVlIGlmIGFycmF5IGhhcyBOYU4gb3IgaW5maW5pdHkgdmFsdWVzXHJcbiAgICAgKlxyXG4gICAgICogQHB1YmxpY1xyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBzaWduYWxEYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBTdHJpbmdNYXRoanNDYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgYXJyYXlIYXNOYU5PckludmluaXR5VmFsdWVzKHNpZ25hbERhdGE6IEFycmF5PG51bWJlcj4pOiBib29sZWFuIHsgXHJcblxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzaWduYWxEYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKGlzTmFOKHNpZ25hbERhdGFbaV0pIHx8ICFpc0Zpbml0ZShzaWduYWxEYXRhW2ldKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIHNpZ25hbCBoYXMgYXQgbGVhc3QgbGVuZ3RoIG9mIG1pbmltdW1cclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElQb2ludD59IHNpZ25hbFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFttaW5pbXVtPTJdIFRoZSBkZWZhdWx0IG1pbmltdW0gaXMgMi5cclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhlIHNpZ25hbCBsZW5ndGggaXMgZXF1YWwgb3IgbG9uZ2VyIHRoYW4gbWluaW11bVxyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0b3JIZWxwZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBpc1NpZ25hbExvbmdlclRoYW5NaW5pbXVtKHNpZ25hbDogQXJyYXk8SVBvaW50PiwgbWluaW11bTogbnVtYmVyID0gMik6IGJvb2xlYW4ge1xyXG5cclxuICAgICAgICByZXR1cm4gc2lnbmFsLmxlbmd0aCA+PSBtaW5pbXVtO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIENhbGN1bGF0aW9uSW5wdXREYXRhIGlzIGEgc2lnbmFsLlxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7KEFycmF5PElQb2ludD4gfCBudW1iZXIgfCBzdHJpbmcpfSBjYWxjdWxhdGlvbklucHV0RGF0YVxyXG4gICAgICogQHJldHVybnMge2NhbGN1bGF0aW9uSW5wdXREYXRhIGlzIEFycmF5PElQb2ludD59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRvckhlbHBlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNhbGN1bGF0aW9uSW5wdXREYXRhSXNTaWduYWwoY2FsY3VsYXRpb25JbnB1dERhdGE6IEFycmF5PElQb2ludD4gfCBudW1iZXIgfCBzdHJpbmcpOiBjYWxjdWxhdGlvbklucHV0RGF0YSBpcyBBcnJheTxJUG9pbnQ+IHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgaXNTaWduYWwgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgaWYoQXJyYXkuaXNBcnJheShjYWxjdWxhdGlvbklucHV0RGF0YSkpe1xyXG4gICAgICAgICAgICBpc1NpZ25hbCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBpc1NpZ25hbDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIENhbGN1bGF0aW9uSW5wdXREYXRhIGlzIGEgbnVtYmVyLlxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7KEFycmF5PElQb2ludD4gfCBudW1iZXIgfCBzdHJpbmcpfSBjYWxjdWxhdGlvbklucHV0RGF0YVxyXG4gICAgICogQHJldHVybnMge2NhbGN1bGF0aW9uSW5wdXREYXRhIGlzIG51bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBDYWxjdWxhdG9ySGVscGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY2FsY3VsYXRpb25JbnB1dERhdGFJc051bWJlcihjYWxjdWxhdGlvbklucHV0RGF0YTogQXJyYXk8SVBvaW50PiB8IG51bWJlciB8IHN0cmluZyk6IGNhbGN1bGF0aW9uSW5wdXREYXRhIGlzIG51bWJlciB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGlzTnVtYmVyID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGlmKHR5cGVvZiBjYWxjdWxhdGlvbklucHV0RGF0YSA9PT0gXCJudW1iZXJcIil7XHJcbiAgICAgICAgICAgIGlzTnVtYmVyID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGlzTnVtYmVyO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gQ2FsY3VsYXRpb25JbnB1dERhdGEgaXMgYSBzdHJpbmcuXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHsoQXJyYXk8SVBvaW50PiB8IG51bWJlciB8IHN0cmluZyl9IGNhbGN1bGF0aW9uSW5wdXREYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7Y2FsY3VsYXRpb25JbnB1dERhdGEgaXMgc3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0b3JIZWxwZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBjYWxjdWxhdGlvbklucHV0RGF0YUlzU3RyaW5nKGNhbGN1bGF0aW9uSW5wdXREYXRhOiBBcnJheTxJUG9pbnQ+IHwgbnVtYmVyIHwgc3RyaW5nKTogY2FsY3VsYXRpb25JbnB1dERhdGEgaXMgc3RyaW5nIHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgaXNTdHJpbmcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgaWYodHlwZW9mIGNhbGN1bGF0aW9uSW5wdXREYXRhID09PSBcInN0cmluZ1wiKXtcclxuICAgICAgICAgICAgaXNTdHJpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gaXNTdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWYWxpZGF0ZXMgYSBzaWduYWwgaWYgaXQgaGFzIGF0IGxlYXN0IHR3byBwb2ludHMgYW5kIG9ubHkgdmFsaWQgKGZpbml0ZSwgbm9uLU5hTikgWSB2YWx1ZXMgY29udGFpbmVkLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge0lQb2ludFtdfSBzaWduYWxcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgc2lnbmFsIGlzIHZhbGlkLlxyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0b3JIZWxwZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBpc1ZhbGlkU2lnbmFsKHNpZ25hbDogSVBvaW50W10pOiBib29sZWFuIHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgaXNWYWxpZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICBpZihDYWxjdWxhdG9ySGVscGVyLmlzU2lnbmFsTG9uZ2VyVGhhbk1pbmltdW0oc2lnbmFsKSAmJiAhdGhpcy5jb250YWluc05hTk9ySW5maW5pdHlJbll2YWx1ZShzaWduYWwpKSB7XHJcbiAgICAgICAgICAgIGlzVmFsaWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGlzVmFsaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWYWxpZGF0ZXMgYSBudW1iZXIgaWYgaXQgaXMgZmluaXRlIGFuZCBub24tTmFOXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBudW1cclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgbnVtYmVyIGlzIHZhbGlkLlxyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0b3JIZWxwZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBpc1ZhbGlkTnVtYmVyKG51bTogbnVtYmVyKTogYm9vbGVhbiB7XHJcblxyXG4gICAgICAgIGxldCBpc1ZhbGlkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGlmKCFOdW1iZXIuaXNOYU4obnVtKSAmJiBOdW1iZXIuaXNGaW5pdGUobnVtKSkge1xyXG4gICAgICAgICAgICBpc1ZhbGlkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBpc1ZhbGlkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBhbW91bnQgb2YgMCBvZiBZLXZhbHVlcyBpbiBhbiBJUG9pbnQgQXJyYXlcclxuICAgICAqIFxyXG4gICAgICogQHB1YmxpY1xyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtBcnJheTxJUG9pbnQ+fSBhcnIgXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBcclxuICAgICAqIEBtZW1iZXJvZiBDYWxjdWxhdG9ySGVscGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgYW1vdW50T2ZaZXJvc0luSVBvaW50QXJyYXlJbllWYWx1ZXMoYXJyOiBBcnJheTxJUG9pbnQ+KTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgY250OiBudW1iZXIgPSAwO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYoYXJyW2ldLnkgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgKytjbnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNudDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybiB0cnVlIHdoZW4gdGhlIFkgdmFsdWVzIG9mIGFuIElQb2ludCBBcnJheSBjb250YWluIGEgZmxvYXRpbmcgdHlwZSBudW1iZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHVibGljXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElQb2ludD59IGlucHV0U2lnbmFsXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBjYWxjdWxhdG9ySGVscGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgaVBvaW50QXJyYXlIYXNGbG9hdEluWVZhbHVlcyhpbnB1dFNpZ25hbDogQXJyYXk8SVBvaW50PikgOiBib29sZWFuIHtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgaW5wdXRTaWduYWwubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYoIU51bWJlci5pc1NhZmVJbnRlZ2VyKGlucHV0U2lnbmFsW2ldLnkpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlLCB3aGVuIHRoZSB4IHZhbHVlcyBvZiB0aGUgSVBvaW50IGFycmF5IGFyZSBzdHJpY3RseSBtb25vdG9uaWNhbGx5IGluY3JlYXNpbmcgKGVhY2ggdmFsdWUgaXMgZ2VhdGVyIHRoYW4gdGhlIHByZXZpb3VzIG9uZSkuXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtBcnJheTxJUG9pbnQ+fSBpbnB1dFNpZ25hbFxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRvckhlbHBlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGlzU3RyaWN0bHlNb25vdG9uaWNhbGx5SW5jcmVhc2luZ0luVGltZShpbnB1dFNpZ25hbDogQXJyYXk8SVBvaW50Pik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBpbnB1dFNpZ25hbC5ldmVyeSgoY3VycmVudFBvaW50LCBpbmRleCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChpbmRleCAhPT0gMCkgPyAoY3VycmVudFBvaW50LnggPiBkYXRhW2luZGV4LTFdLngpIDogdHJ1ZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IENhbGN1bGF0b3JIZWxwZXIgfTsiXX0=