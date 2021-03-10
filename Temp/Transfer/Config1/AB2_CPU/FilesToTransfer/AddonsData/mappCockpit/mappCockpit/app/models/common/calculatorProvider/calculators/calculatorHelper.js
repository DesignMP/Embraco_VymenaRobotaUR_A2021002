define(["require", "exports", "../calculationDataPoints"], function (require, exports, calculationDataPoints_1) {
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
         * @param {(Array<CalculationDataNumber|CalculationDataPoints|CalculationDataNumberOrPoints>)} inputData
         * @returns {(Array<CalculationDataNumber|CalculationDataPoints|CalculationDataNumberOrPoints>)}
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
         * @param {Array<IPoint>} input1
         * @param {Array<IPoint>} input2
         * @returns {MatchingSignalParts} Matching signal parts based on timestamp.
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
        return CalculatorHelper;
    }());
    exports.CalculatorHelper = CalculatorHelper;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsY3VsYXRvckhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRvcnMvY2FsY3VsYXRvckhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFTQTs7OztPQUlHO0lBQ0g7UUFHSTs7OztXQUlHO1FBQ0g7UUFBdUIsQ0FBQztRQUFBLENBQUM7UUFHekI7Ozs7Ozs7V0FPRztRQUNXLDZDQUE0QixHQUExQyxVQUEyQyxTQUE0RjtZQUVuSSxJQUFJLFVBQVUsR0FBRyxTQUFTLENBQUM7WUFFM0IsSUFBSSxNQUFNLEdBQXFCLFNBQVMsQ0FBQyxDQUFDLENBQW1DLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDeEYsSUFBSSxNQUFNLEdBQXFCLFNBQVMsQ0FBQyxDQUFDLENBQW1DLENBQUMsT0FBTyxFQUFFLENBQUM7WUFFeEYsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO21CQUMzQyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRSxFQUFFLHlFQUF5RTtnQkFFeEgsSUFBSSxhQUFhLEdBQTRCO29CQUN6QyxXQUFXLEVBQUUsTUFBTTtvQkFDbkIsV0FBVyxFQUFFLE1BQU07aUJBQ3RCLENBQUM7Z0JBRUYsYUFBYSxHQUFHLGdCQUFnQixDQUFDLDRCQUE0QixDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUU3RSxnR0FBZ0c7Z0JBQ2hHLElBQUksV0FBVyxHQUFHLElBQUksNkNBQXFCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUUsQ0FBQztnQkFDL0ssSUFBSSxXQUFXLEdBQUcsSUFBSSw2Q0FBcUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxFQUFFLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxhQUFhLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBRSxDQUFDO2dCQUUvSyxVQUFVLEdBQUcsSUFBSSxLQUFLLEVBQTZFLENBQUM7Z0JBRXBHLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQzdCLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDaEM7WUFFRCxPQUFPLFVBQVUsQ0FBQztRQUN0QixDQUFDO1FBRUQ7Ozs7Ozs7OztXQVNHO1FBQ1ksNkNBQTRCLEdBQTNDLFVBQTRDLEtBQThCO1lBRXRFLElBQUksY0FBYyxHQUE0QjtnQkFDMUMsV0FBVyxFQUFFLElBQUksS0FBSyxFQUFVO2dCQUNoQyxXQUFXLEVBQUUsSUFBSSxLQUFLLEVBQVU7YUFDbkMsQ0FBQztZQUVGLElBQUksQ0FBQyxHQUFTLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMsR0FBUyxDQUFDLENBQUM7WUFFaEIsNkVBQTZFO1lBQzdFLHFFQUFxRTtZQUNyRSxPQUFPLENBQUMsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQU0sSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUU7Z0JBRWpFLElBQUksS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQ2pELENBQUMsRUFBRSxDQUFDO2lCQUNQO3FCQUFNLElBQUksS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQ3hELENBQUMsRUFBRSxDQUFDO2lCQUNQO3FCQUFNO29CQUNILGNBQWMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdEQsY0FBYyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN0RCxDQUFDLEVBQUUsQ0FBQztvQkFDSixDQUFDLEVBQUUsQ0FBQztpQkFDUDthQUNKO1lBR0QsT0FBTyxjQUFjLENBQUM7UUFDMUIsQ0FBQztRQUNMLHVCQUFDO0lBQUQsQ0FBQyxBQXhGRCxJQXdGQztJQUVRLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElQb2ludCB9IGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHMgfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHNcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhTnVtYmVyIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YU51bWJlclwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFQb2ludHMgfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhUG9pbnRzXCI7XHJcblxyXG4vL1R5cGUgYWxpYXMgdG8gcHJvdmlkZSBhIG5hbWUgZm9yIHN0cnVjdHVyZSByZXR1cm5lIGJ5IGdhdGhlclNhbXBsZXNXaXRoU2FtZVRpbWVzdGFtcFxyXG50eXBlIFR3b1BvaW50QXJyYXlzQ29udGFpbmVyID0geyBwb2ludEFycmF5MTogQXJyYXk8SVBvaW50PiwgcG9pbnRBcnJheTI6IEFycmF5PElQb2ludD59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBIZWxwZXIgY2xhc3MgZm9yIGNhbGN1bGF0b3IgdG8gcHJvdmlkZSBjb21tb24gZnVuY3Rpb25hbGl0aWVzIG9ubHkgdXNlZCBpbiBzb21lIGNhbGN1bGF0b3JzLlxyXG4gKlxyXG4gKiBAY2xhc3MgQ2FsY3VsYXRvckhlbHBlclxyXG4gKi9cclxuY2xhc3MgQ2FsY3VsYXRvckhlbHBlciB7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29uc3RydWN0b3Igc2V0IHRvIHByaXZhdGUgYXMgSGVscGVyIGNsYXNzIHNob3VsZCBvbmx5IHByb3ZpZGUgc3RhdGljIGhlbHBlciBmdW5jdGlvbnMuXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIENhbGN1bGF0b3JIZWxwZXIuXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRvckhlbHBlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge307XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmlsdGVycyB0d28gaW5wdXQgc2lnbmFscyBmb3IgbWF0Y2hpbmcgc2lnbmFsIHBhcnRzLlxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7KEFycmF5PENhbGN1bGF0aW9uRGF0YU51bWJlcnxDYWxjdWxhdGlvbkRhdGFQb2ludHN8Q2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHM+KX0gaW5wdXREYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7KEFycmF5PENhbGN1bGF0aW9uRGF0YU51bWJlcnxDYWxjdWxhdGlvbkRhdGFQb2ludHN8Q2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHM+KX1cclxuICAgICAqIEBtZW1iZXJvZiBDYWxjdWxhdG9ySGVscGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgdHJ5RmlsdGVyTWF0Y2hpbmdTaWduYWxQYXJ0cyhpbnB1dERhdGE6ICBBcnJheTxDYWxjdWxhdGlvbkRhdGFOdW1iZXJ8Q2FsY3VsYXRpb25EYXRhUG9pbnRzfENhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzPik6ICBBcnJheTxDYWxjdWxhdGlvbkRhdGFOdW1iZXJ8Q2FsY3VsYXRpb25EYXRhUG9pbnRzfENhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzPiB7XHJcblxyXG4gICAgICAgIGxldCBvdXRwdXREYXRhID0gaW5wdXREYXRhO1xyXG5cclxuICAgICAgICBsZXQgaW5wdXQxOiBudW1iZXJ8SVBvaW50W10gPSAoaW5wdXREYXRhWzBdIGFzIENhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzKS5nZXREYXRhKCk7XHJcbiAgICAgICAgbGV0IGlucHV0MjogbnVtYmVyfElQb2ludFtdID0gKGlucHV0RGF0YVsxXSBhcyBDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cykuZ2V0RGF0YSgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKCBBcnJheS5pc0FycmF5KGlucHV0MSkgJiYgQXJyYXkuaXNBcnJheShpbnB1dDIpIFxyXG4gICAgICAgICAgICAmJiBpbnB1dDEubGVuZ3RoID49IDIgJiYgaW5wdXQyLmxlbmd0aCA+PSAyKSB7IC8vIG9ubHkgZmlsdGVyIGZvciBtYXRjaGluZyBzaWduYWwgcGFydHMgaWYgYm90aCBpbnB1dHMgYXJlIHZhbGlkIHNpZ25hbHNcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBkYXRhQ29udGFpbmVyOiBUd29Qb2ludEFycmF5c0NvbnRhaW5lciA9IHtcclxuICAgICAgICAgICAgICAgIHBvaW50QXJyYXkxOiBpbnB1dDEsXHJcbiAgICAgICAgICAgICAgICBwb2ludEFycmF5MjogaW5wdXQyXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBkYXRhQ29udGFpbmVyID0gQ2FsY3VsYXRvckhlbHBlci5maWx0ZXJNYXRjaGluZ1BvaW50c0J5WHZhbHVlKGRhdGFDb250YWluZXIpO1xyXG5cclxuICAgICAgICAgICAgLy9jcmVhdGUgbmV3IGNhbGN1bGF0aW9uIGRhdGEgcG9pbnRzIHdpdGggZmlsdGVyZWQgc2lnbmFscyB0byBjdXQgdGhlIGNvbm5lY3Rpb24gd2l0aCBpbnB1dCBkYXRhXHJcbiAgICAgICAgICAgIGxldCBkYXRhUG9pbnRzMSA9IG5ldyBDYWxjdWxhdGlvbkRhdGFQb2ludHMoaW5wdXREYXRhWzBdLmdldERpc3BsYXlOYW1lKCksIGlucHV0RGF0YVswXS52YWx1ZSwgZGF0YUNvbnRhaW5lci5wb2ludEFycmF5MSwgaW5wdXREYXRhWzBdLmRlc2NyaXB0aW9uLCBpbnB1dERhdGFbMF0uZGlzcGxheUluZm8gKTtcclxuICAgICAgICAgICAgbGV0IGRhdGFQb2ludHMyID0gbmV3IENhbGN1bGF0aW9uRGF0YVBvaW50cyhpbnB1dERhdGFbMV0uZ2V0RGlzcGxheU5hbWUoKSwgaW5wdXREYXRhWzFdLnZhbHVlLCBkYXRhQ29udGFpbmVyLnBvaW50QXJyYXkyLCBpbnB1dERhdGFbMV0uZGVzY3JpcHRpb24sIGlucHV0RGF0YVsxXS5kaXNwbGF5SW5mbyApO1xyXG5cclxuICAgICAgICAgICAgb3V0cHV0RGF0YSA9IG5ldyBBcnJheTxDYWxjdWxhdGlvbkRhdGFOdW1iZXJ8Q2FsY3VsYXRpb25EYXRhUG9pbnRzfENhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzPigpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgb3V0cHV0RGF0YS5wdXNoKGRhdGFQb2ludHMxKTtcclxuICAgICAgICAgICAgb3V0cHV0RGF0YS5wdXNoKGRhdGFQb2ludHMyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIG91dHB1dERhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHYXRoZXJzIFNhbXBsZXMgb2Ygc2FtZSB0aW1lc3RhbXAgZnJvbSB0d28gc2lnbmFscy5cclxuICAgICAqIFVzZWQgdG8gZmlsdGVyIHR3byBzaWduYWxzIGZvciBvbmx5IHRoZSBtYXRjaGluZyBwYXJ0cyBvZiB0aGUgc2lnbmFsIChieSB0aW1lc3RhbXApLlxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SVBvaW50Pn0gaW5wdXQxIFxyXG4gICAgICogQHBhcmFtIHtBcnJheTxJUG9pbnQ+fSBpbnB1dDJcclxuICAgICAqIEByZXR1cm5zIHtNYXRjaGluZ1NpZ25hbFBhcnRzfSBNYXRjaGluZyBzaWduYWwgcGFydHMgYmFzZWQgb24gdGltZXN0YW1wLlxyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0b3JIZWxwZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZmlsdGVyTWF0Y2hpbmdQb2ludHNCeVh2YWx1ZShpbnB1dDogVHdvUG9pbnRBcnJheXNDb250YWluZXIpOiBUd29Qb2ludEFycmF5c0NvbnRhaW5lciB7XHJcblxyXG4gICAgICAgIGxldCBnYXRoZXJlZFBvaW50czogVHdvUG9pbnRBcnJheXNDb250YWluZXIgPSB7XHJcbiAgICAgICAgICAgIHBvaW50QXJyYXkxOiBuZXcgQXJyYXk8SVBvaW50PigpLFxyXG4gICAgICAgICAgICBwb2ludEFycmF5MjogbmV3IEFycmF5PElQb2ludD4oKVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxldCBpOiBudW1iZXI9MDtcclxuICAgICAgICBsZXQgajogbnVtYmVyPTA7XHJcblxyXG4gICAgICAgIC8vZXh0cmFjdCBzYW1wbGVzIHdpdGggbWF0Y2hpbmcgdGltZXN0YW1wcyBieSBpdGVyYXRpbmcgYm90aCBzaWduYWxzIGF0IG9uY2UuXHJcbiAgICAgICAgLy93b3JzdCBjYXNlIGl0ZXJhdGlvbiBhbW91bnQgaXMgbGVuZ3RoIG9mIGlucHV0MSArIGxlbmd0aCBvZiBpbnB1dDIuXHJcbiAgICAgICAgd2hpbGUgKGkgPCBpbnB1dC5wb2ludEFycmF5MS5sZW5ndGggJiYgaiA8IGlucHV0LnBvaW50QXJyYXkyLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKGlucHV0LnBvaW50QXJyYXkxW2ldLnggPCBpbnB1dC5wb2ludEFycmF5MltqXS54KSB7XHJcbiAgICAgICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5wdXQucG9pbnRBcnJheTFbaV0ueCA+IGlucHV0LnBvaW50QXJyYXkyW2pdLngpIHtcclxuICAgICAgICAgICAgICAgIGorKztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGdhdGhlcmVkUG9pbnRzLnBvaW50QXJyYXkxLnB1c2goaW5wdXQucG9pbnRBcnJheTFbaV0pO1xyXG4gICAgICAgICAgICAgICAgZ2F0aGVyZWRQb2ludHMucG9pbnRBcnJheTIucHVzaChpbnB1dC5wb2ludEFycmF5MltqXSk7XHJcbiAgICAgICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgICAgICBqKys7ICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICByZXR1cm4gZ2F0aGVyZWRQb2ludHM7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IENhbGN1bGF0b3JIZWxwZXIgfTsiXX0=