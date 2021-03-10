define(["require", "exports", "./cursorSignalDescriptor"], function (require, exports, cursorSignalDescriptor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * implements the base class for the various types of cursor signals
     *
     * @export
     * @class CursorSignal
     */
    var CursorSignal = /** @class */ (function () {
        function CursorSignal(serie) {
            // holds an object with informations describig the cursor signal
            this._cursorSignalDescriptor = new cursorSignalDescriptor_1.CursorSignalDescriptor();
            this._serie = serie;
        }
        Object.defineProperty(CursorSignal.prototype, "serie", {
            /**
             * provides the serie
             *
             * @readonly
             * @type {BaseSeries}
             * @memberof CursorSignal
             */
            get: function () {
                return this._serie;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CursorSignal.prototype, "name", {
            /**
             * provides the serie name
             *
             * @readonly
             * @type {string}
             * @memberof CursorSignal
             */
            get: function () {
                return this._serie.name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CursorSignal.prototype, "value", {
            /**
             * provides additional descriptive info
             *
             * @readonly
             * @type {string}
             * @memberof CursorSignal
             */
            get: function () {
                return this._serie.additionalInfo;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CursorSignal.prototype, "visible", {
            /**
             * cursor signals are visible by default
             *
             * @readonly
             * @type {string}
             * @memberof CursorSignal
             */
            get: function () {
                return "true";
            },
            enumerable: true,
            configurable: true
        });
        /**
         * This method is used by the DynamicCursorSignalTemplate to get hold
         * of all available cursor information available to the YTChart
         *
         * @returns {Array<CursorDisplayInfoClass>}
         * @memberof CursorSignal
         */
        CursorSignal.prototype.getAllCursorInfo = function () {
            return [];
        };
        Object.defineProperty(CursorSignal.prototype, "cursorInfos", {
            /**
             * provides the current cursor infos
             *
             * @readonly
             * @type {Array<CursorInfo>}
             * @memberof CursorSignal
             */
            get: function () {
                return this._cursorSignalDescriptor.cursorInfos;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * dummy method for updating cursor values
         *
         * @param {IPoint} cursorData1
         * @param {IPoint} cursorData2
         * @param {number} time1
         * @param {number} time2
         * @memberof CursorSignal
         */
        CursorSignal.prototype.updateValues = function (cursorData1, cursorData2, time1, time2) {
        };
        /**
     * Clears all the cursor value informations
     *
     * @memberof CursorSignal
     */
        CursorSignal.prototype.clearValues = function () {
            this.cursorInfos.forEach(function (cursorInfo) {
                cursorInfo.value = "";
            });
        };
        return CursorSignal;
    }());
    exports.CursorSignal = CursorSignal;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3Vyc29yU2lnbmFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2N1cnNvckluZm9XaWRnZXQvbW9kZWwvY3Vyc29yU2lnbmFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQU1BOzs7OztPQUtHO0lBQ0g7UUFPSSxzQkFBWSxLQUFpQjtZQUw3QixnRUFBZ0U7WUFDdEQsNEJBQXVCLEdBQTJCLElBQUksK0NBQXNCLEVBQUUsQ0FBQztZQUtyRixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN4QixDQUFDO1FBVUQsc0JBQUksK0JBQUs7WUFQVDs7Ozs7O2VBTUc7aUJBQ0g7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ3ZCLENBQUM7OztXQUFBO1FBU0Qsc0JBQUksOEJBQUk7WUFQUjs7Ozs7O2VBTUc7aUJBQ0g7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUM1QixDQUFDOzs7V0FBQTtRQVNELHNCQUFJLCtCQUFLO1lBUFQ7Ozs7OztlQU1HO2lCQUNIO2dCQUNJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUM7WUFDdEMsQ0FBQzs7O1dBQUE7UUFVRCxzQkFBSSxpQ0FBTztZQVBYOzs7Ozs7ZUFNRztpQkFDSDtnQkFDSSxPQUFPLE1BQU0sQ0FBQztZQUNsQixDQUFDOzs7V0FBQTtRQUVEOzs7Ozs7V0FNRztRQUNJLHVDQUFnQixHQUF2QjtZQUNJLE9BQU8sRUFBRSxDQUFDO1FBQ2QsQ0FBQztRQVVELHNCQUFJLHFDQUFXO1lBUGY7Ozs7OztlQU1HO2lCQUNIO2dCQUNJLE9BQU8sSUFBSSxDQUFDLHVCQUF1QixDQUFDLFdBQVcsQ0FBQztZQUNwRCxDQUFDOzs7V0FBQTtRQUVEOzs7Ozs7OztXQVFHO1FBQ0ksbUNBQVksR0FBbkIsVUFBb0IsV0FBNkIsRUFBRSxXQUE2QixFQUFFLEtBQXVCLEVBQUUsS0FBdUI7UUFDbEksQ0FBQztRQUVEOzs7O09BSUQ7UUFDUSxrQ0FBVyxHQUFsQjtZQUNJLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFVBQUEsVUFBVTtnQkFDL0IsVUFBVSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7WUFDMUIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBR0wsbUJBQUM7SUFBRCxDQUFDLEFBeEdELElBd0dDO0lBeEdZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ3Vyc29yRGlzcGxheUluZm9DbGFzcyB9IGZyb20gXCIuL2R5bmFtaWNDdXJzb3JTaWduYWxUZW1wbGF0ZVwiO1xyXG5pbXBvcnQgeyBDdXJzb3JTaWduYWxEZXNjcmlwdG9yIH0gZnJvbSBcIi4vY3Vyc29yU2lnbmFsRGVzY3JpcHRvclwiO1xyXG5pbXBvcnQgeyBDdXJzb3JJbmZvIH0gZnJvbSBcIi4vY3Vyc29ySW5mb1wiO1xyXG5pbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvYmFzZVNlcmllc1wiO1xyXG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2NvbW1vbi9pbnRlcmZhY2VzL3BvaW50SW50ZXJmYWNlXCI7XHJcblxyXG4vKipcclxuICogaW1wbGVtZW50cyB0aGUgYmFzZSBjbGFzcyBmb3IgdGhlIHZhcmlvdXMgdHlwZXMgb2YgY3Vyc29yIHNpZ25hbHMgXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIEN1cnNvclNpZ25hbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEN1cnNvclNpZ25hbCB7XHJcblxyXG4gICAgLy8gaG9sZHMgYW4gb2JqZWN0IHdpdGggaW5mb3JtYXRpb25zIGRlc2NyaWJpZyB0aGUgY3Vyc29yIHNpZ25hbFxyXG4gICAgcHJvdGVjdGVkIF9jdXJzb3JTaWduYWxEZXNjcmlwdG9yOiBDdXJzb3JTaWduYWxEZXNjcmlwdG9yID0gbmV3IEN1cnNvclNpZ25hbERlc2NyaXB0b3IoKTtcclxuICAgIC8vIGhvbGRzIHRoZSBzZXJpZXMgYXR0YWNoZWQgdG8gdGhlIGN1cnNvciBzaWduYWxcclxuICAgIHByb3RlY3RlZCBfc2VyaWU6IEJhc2VTZXJpZXM7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc2VyaWU6IEJhc2VTZXJpZXMpIHtcclxuICAgICAgICB0aGlzLl9zZXJpZSA9IHNlcmllO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIHByb3ZpZGVzIHRoZSBzZXJpZVxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge0Jhc2VTZXJpZXN9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU2lnbmFsXHJcbiAgICAgKi9cclxuICAgIGdldCBzZXJpZSgpOiBCYXNlU2VyaWVzIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VyaWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBwcm92aWRlcyB0aGUgc2VyaWUgbmFtZVxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTaWduYWxcclxuICAgICAqL1xyXG4gICAgZ2V0IG5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VyaWUubmFtZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHByb3ZpZGVzIGFkZGl0aW9uYWwgZGVzY3JpcHRpdmUgaW5mb1xyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTaWduYWxcclxuICAgICAqL1xyXG4gICAgZ2V0IHZhbHVlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlcmllLmFkZGl0aW9uYWxJbmZvO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBjdXJzb3Igc2lnbmFscyBhcmUgdmlzaWJsZSBieSBkZWZhdWx0XHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclNpZ25hbFxyXG4gICAgICovXHJcbiAgICBnZXQgdmlzaWJsZSgpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIFwidHJ1ZVwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBtZXRob2QgaXMgdXNlZCBieSB0aGUgRHluYW1pY0N1cnNvclNpZ25hbFRlbXBsYXRlIHRvIGdldCBob2xkXHJcbiAgICAgKiBvZiBhbGwgYXZhaWxhYmxlIGN1cnNvciBpbmZvcm1hdGlvbiBhdmFpbGFibGUgdG8gdGhlIFlUQ2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8Q3Vyc29yRGlzcGxheUluZm9DbGFzcz59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU2lnbmFsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRBbGxDdXJzb3JJbmZvKCk6IEFycmF5PEN1cnNvckRpc3BsYXlJbmZvQ2xhc3M+IHtcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcHJvdmlkZXMgdGhlIGN1cnJlbnQgY3Vyc29yIGluZm9zXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7QXJyYXk8Q3Vyc29ySW5mbz59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU2lnbmFsXHJcbiAgICAgKi9cclxuICAgIGdldCBjdXJzb3JJbmZvcygpOiBBcnJheTxDdXJzb3JJbmZvPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnNvclNpZ25hbERlc2NyaXB0b3IuY3Vyc29ySW5mb3M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBkdW1teSBtZXRob2QgZm9yIHVwZGF0aW5nIGN1cnNvciB2YWx1ZXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lQb2ludH0gY3Vyc29yRGF0YTFcclxuICAgICAqIEBwYXJhbSB7SVBvaW50fSBjdXJzb3JEYXRhMlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWUxXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdGltZTJcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTaWduYWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIHVwZGF0ZVZhbHVlcyhjdXJzb3JEYXRhMTogSVBvaW50fHVuZGVmaW5lZCwgY3Vyc29yRGF0YTI6IElQb2ludHx1bmRlZmluZWQsIHRpbWUxOiBudW1iZXJ8dW5kZWZpbmVkLCB0aW1lMjogbnVtYmVyfHVuZGVmaW5lZCkge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gKiBDbGVhcnMgYWxsIHRoZSBjdXJzb3IgdmFsdWUgaW5mb3JtYXRpb25zXHJcbiAqXHJcbiAqIEBtZW1iZXJvZiBDdXJzb3JTaWduYWxcclxuICovXHJcbiAgICBwdWJsaWMgY2xlYXJWYWx1ZXMoKSB7XHJcbiAgICAgICAgdGhpcy5jdXJzb3JJbmZvcy5mb3JFYWNoKGN1cnNvckluZm8gPT4ge1xyXG4gICAgICAgICAgICBjdXJzb3JJbmZvLnZhbHVlID0gXCJcIjtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG59Il19