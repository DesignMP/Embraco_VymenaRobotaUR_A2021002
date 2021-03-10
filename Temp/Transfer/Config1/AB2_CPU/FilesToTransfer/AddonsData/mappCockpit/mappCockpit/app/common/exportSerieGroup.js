define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ExportSerieGroup = /** @class */ (function () {
        /**
         * Creates an instance of ExportSerieGroup.
         * @param {string} name
         * @param {number} startTriggerTime
         * @memberof SerieGroup
         */
        function ExportSerieGroup(name, startTriggerTime, serie) {
            this.series = new Array();
            this.name = name;
            this.startTriggerTime = startTriggerTime;
            this.series.push(serie);
        }
        ExportSerieGroup.prototype.addSerie = function (serie) {
            this.series.push(serie);
        };
        return ExportSerieGroup;
    }());
    exports.ExportSerieGroup = ExportSerieGroup;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0U2VyaWVHcm91cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL2V4cG9ydFNlcmllR3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBRUE7UUFPSTs7Ozs7V0FLRztRQUNILDBCQUFZLElBQVksRUFBRSxnQkFBd0IsRUFBRSxLQUFpQjtZQVByRSxXQUFNLEdBQXNCLElBQUksS0FBSyxFQUFjLENBQUM7WUFRaEQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDakIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO1lBQ3pDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVCLENBQUM7UUFFRCxtQ0FBUSxHQUFSLFVBQVMsS0FBaUI7WUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUIsQ0FBQztRQUVMLHVCQUFDO0lBQUQsQ0FBQyxBQXZCRCxJQXVCQztJQXZCWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvYmFzZVNlcmllc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEV4cG9ydFNlcmllR3JvdXAge1xyXG4gICAgXHJcbiAgICAvL3ByaXZhdGUgcmVhZG9ubHkgc3RhcnRUcmlnZ2VyVGltZTogbnVtYmVyO1xyXG5cclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIHN0YXJ0VHJpZ2dlclRpbWU6IG51bWJlcjtcclxuICAgIHNlcmllczogQXJyYXk8QmFzZVNlcmllcz4gPSBuZXcgQXJyYXk8QmFzZVNlcmllcz4oKTtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBFeHBvcnRTZXJpZUdyb3VwLlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydFRyaWdnZXJUaW1lXHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVHcm91cFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHN0YXJ0VHJpZ2dlclRpbWU6IG51bWJlciwgc2VyaWU6IEJhc2VTZXJpZXMpe1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5zdGFydFRyaWdnZXJUaW1lID0gc3RhcnRUcmlnZ2VyVGltZTtcclxuICAgICAgICB0aGlzLnNlcmllcy5wdXNoKHNlcmllKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRTZXJpZShzZXJpZTogQmFzZVNlcmllcyl7XHJcbiAgICAgICAgdGhpcy5zZXJpZXMucHVzaChzZXJpZSk7XHJcbiAgICB9XHJcblxyXG59Il19