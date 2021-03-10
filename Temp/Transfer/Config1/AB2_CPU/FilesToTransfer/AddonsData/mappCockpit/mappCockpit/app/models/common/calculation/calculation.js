define(["require", "exports", "../calculatorProvider/calculatorProvider"], function (require, exports, calculatorProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Calculation = /** @class */ (function () {
        function Calculation(calculatorId) {
            this.setCalculatorType(calculatorId);
        }
        Calculation.prototype.setCalculatorType = function (calculatorId) {
            this.calculator = calculatorProvider_1.CalculatorProvider.getInstance().getCalculator(calculatorId);
            if (this.calculator == undefined) {
                this.inputData = new Array();
                this.outputData = new Array();
            }
            else {
                this.inputData = this.calculator.getDefaultInputData();
                this.outputData = this.calculator.getDefaultOutputData();
            }
        };
        Calculation.prototype.calculate = function () {
            if (this.calculator != undefined) {
                // Start calculation with current input data
                var results = this.calculator.calculate(this.inputData);
                for (var i = 0; i < results.length; i++) {
                    // Set output data
                    this.outputData[i].setData(results[i].getData());
                }
            }
        };
        return Calculation;
    }());
    exports.Calculation = Calculation;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsY3VsYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9jb21tb24vY2FsY3VsYXRpb24vY2FsY3VsYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBT0E7UUFPSSxxQkFBWSxZQUFvQjtZQUM1QixJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDekMsQ0FBQztRQUVELHVDQUFpQixHQUFqQixVQUFrQixZQUFvQjtZQUNsQyxJQUFJLENBQUMsVUFBVSxHQUFHLHVDQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMvRSxJQUFHLElBQUksQ0FBQyxVQUFVLElBQUksU0FBUyxFQUFDO2dCQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksS0FBSyxFQUE2RSxDQUFDO2dCQUN4RyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksS0FBSyxFQUF5QixDQUFDO2FBQ3hEO2lCQUNHO2dCQUNBLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2dCQUN2RCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsb0JBQW9CLEVBQUUsQ0FBQzthQUM1RDtRQUNMLENBQUM7UUFFRCwrQkFBUyxHQUFUO1lBQ0ksSUFBRyxJQUFJLENBQUMsVUFBVSxJQUFJLFNBQVMsRUFBQztnQkFDNUIsNENBQTRDO2dCQUM1QyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3hELEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO29CQUNuQyxrQkFBa0I7b0JBQ2xCLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO2lCQUNwRDthQUNKO1FBQ0wsQ0FBQztRQUNMLGtCQUFDO0lBQUQsQ0FBQyxBQWpDRCxJQWlDQztJQWpDWSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDYWxjdWxhdGlvbiB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2NhbGN1bGF0aW9uSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElDYWxjdWxhdG9yIH0gZnJvbSBcIi4uL2NhbGN1bGF0b3JQcm92aWRlci9pbnRlcmZhY2VzL2NhbGN1bGF0b3JJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRvclByb3ZpZGVyIH0gZnJvbSBcIi4uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdG9yUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhTnVtYmVyIH0gZnJvbSBcIi4uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdGlvbkRhdGFOdW1iZXJcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhUG9pbnRzIH0gZnJvbSBcIi4uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdGlvbkRhdGFQb2ludHNcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHMgfSBmcm9tIFwiLi4vY2FsY3VsYXRvclByb3ZpZGVyL2NhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2FsY3VsYXRpb24gaW1wbGVtZW50cyBJQ2FsY3VsYXRpb257XHJcblxyXG4gICAgY2FsY3VsYXRvcjogSUNhbGN1bGF0b3J8dW5kZWZpbmVkO1xyXG5cclxuICAgIGlucHV0RGF0YSE6IEFycmF5PENhbGN1bGF0aW9uRGF0YU51bWJlcnxDYWxjdWxhdGlvbkRhdGFQb2ludHN8Q2FsY3VsYXRpb25EYXRhTnVtYmVyT3JQb2ludHM+O1xyXG4gICAgb3V0cHV0RGF0YSE6IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz47XHJcblxyXG4gICAgY29uc3RydWN0b3IoY2FsY3VsYXRvcklkOiBzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMuc2V0Q2FsY3VsYXRvclR5cGUoY2FsY3VsYXRvcklkKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRDYWxjdWxhdG9yVHlwZShjYWxjdWxhdG9ySWQ6IHN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdG9yID0gQ2FsY3VsYXRvclByb3ZpZGVyLmdldEluc3RhbmNlKCkuZ2V0Q2FsY3VsYXRvcihjYWxjdWxhdG9ySWQpO1xyXG4gICAgICAgIGlmKHRoaXMuY2FsY3VsYXRvciA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmlucHV0RGF0YSA9IG5ldyBBcnJheTxDYWxjdWxhdGlvbkRhdGFOdW1iZXJ8Q2FsY3VsYXRpb25EYXRhUG9pbnRzfENhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzPigpO1xyXG4gICAgICAgICAgICB0aGlzLm91dHB1dERhdGEgPSBuZXcgQXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLmlucHV0RGF0YSA9IHRoaXMuY2FsY3VsYXRvci5nZXREZWZhdWx0SW5wdXREYXRhKCk7XHJcbiAgICAgICAgICAgIHRoaXMub3V0cHV0RGF0YSA9IHRoaXMuY2FsY3VsYXRvci5nZXREZWZhdWx0T3V0cHV0RGF0YSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjYWxjdWxhdGUoKSB7XHJcbiAgICAgICAgaWYodGhpcy5jYWxjdWxhdG9yICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIFN0YXJ0IGNhbGN1bGF0aW9uIHdpdGggY3VycmVudCBpbnB1dCBkYXRhXHJcbiAgICAgICAgICAgIGxldCByZXN1bHRzID0gdGhpcy5jYWxjdWxhdG9yLmNhbGN1bGF0ZSh0aGlzLmlucHV0RGF0YSk7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCByZXN1bHRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIC8vIFNldCBvdXRwdXQgZGF0YVxyXG4gICAgICAgICAgICAgICAgdGhpcy5vdXRwdXREYXRhW2ldLnNldERhdGEocmVzdWx0c1tpXS5nZXREYXRhKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19