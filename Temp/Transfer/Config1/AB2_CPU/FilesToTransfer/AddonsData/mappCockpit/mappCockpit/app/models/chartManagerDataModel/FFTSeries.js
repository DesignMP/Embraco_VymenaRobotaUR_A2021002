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
define(["require", "exports", "./baseSeries", "./seriesType", "../../widgets/common/states/cursorStates"], function (require, exports, baseSeries_1, seriesType_1, cursorStates_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FFTSeries = /** @class */ (function (_super) {
        __extends(FFTSeries, _super);
        function FFTSeries(signal, name, color) {
            var _this = _super.call(this, signal, name, color, cursorStates_1.CursorType.frequencyDomain) || this;
            _this.type = seriesType_1.SeriesType.fftSeries;
            _this.rawPoints = _this.signal.rawPoints;
            _this.updateTimestamps();
            _this.getRange();
            return _this;
        }
        /**
         * Get max X value from a serie
         *
         * @protected
         * @returns {(number | undefined)}
         * @memberof YTSeries
         */
        FFTSeries.prototype.getMaxX = function () {
            if (this.rawPoints.length > 0) {
                return this.rawPoints[this.rawPoints.length - 1].x;
            }
            return undefined;
        };
        /**
         * Get min X value from a serie
         *
         * @protected
         * @returns {(number | undefined)}
         * @memberof YTSeries
         */
        FFTSeries.prototype.getMinX = function () {
            if (this.rawPoints.length > 0) {
                return this.rawPoints[0].x;
            }
            return undefined;
        };
        Object.defineProperty(FFTSeries.prototype, "timestamps", {
            /**
             * gets the timestamps available in the series
             *
             * @readonly
             * @type {Array<number>}
             * @memberof baseSeries
             */
            get: function () {
                return this._timestamps;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Updates the timestamps baseon the available series
         *
         * @private
         * @memberof BaseSeries
         */
        FFTSeries.prototype.updateTimestamps = function () {
            if (this.rawPoints.length > 0) {
                this._timestamps = this.rawPoints.map(function (rawPoint) { return rawPoint.x; });
            }
        };
        /**
         * Clones this serie
         *
         * @returns {BaseSeries}
         * @memberof YTSeries
         */
        FFTSeries.prototype.clone = function () {
            return new FFTSeries(this.signal.clone(), this.name, this.color);
        };
        return FFTSeries;
    }(baseSeries_1.BaseSeries));
    exports.FFTSeries = FFTSeries;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRkZUU2VyaWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL0ZGVFNlcmllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBS0E7UUFBK0IsNkJBQVU7UUFJckMsbUJBQVksTUFBZSxFQUFFLElBQVksRUFBRSxLQUFhO1lBQXhELFlBQ0ksa0JBQU0sTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUseUJBQVUsQ0FBQyxlQUFlLENBQUMsU0FJekQ7WUFQUSxVQUFJLEdBQUcsdUJBQVUsQ0FBQyxTQUFTLENBQUM7WUFJakMsS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztZQUN2QyxLQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUN4QixLQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7O1FBQ3BCLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDTywyQkFBTyxHQUFqQjtZQUNJLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUMzQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO2FBQ3JEO1lBQ0QsT0FBTyxTQUFTLENBQUM7UUFDckIsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNPLDJCQUFPLEdBQWpCO1lBQ0ksSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQzNCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDOUI7WUFDRCxPQUFPLFNBQVMsQ0FBQTtRQUNwQixDQUFDO1FBU0Qsc0JBQVcsaUNBQVU7WUFQckI7Ozs7OztlQU1HO2lCQUNIO2dCQUNJLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUM1QixDQUFDOzs7V0FBQTtRQUVEOzs7OztXQUtHO1FBQ08sb0NBQWdCLEdBQTFCO1lBQ0ksSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBQyxRQUFRLElBQU8sT0FBTyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDL0U7UUFDTCxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSSx5QkFBSyxHQUFaO1lBQ0ksT0FBTyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JFLENBQUM7UUFDTCxnQkFBQztJQUFELENBQUMsQUF2RUQsQ0FBK0IsdUJBQVUsR0F1RXhDO0lBdkVZLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVNpZ25hbCB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy9zaWduYWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQmFzZVNlcmllcyB9IGZyb20gXCIuL2Jhc2VTZXJpZXNcIjtcclxuaW1wb3J0IHsgU2VyaWVzVHlwZSB9IGZyb20gXCIuL3Nlcmllc1R5cGVcIjtcclxuaW1wb3J0IHsgQ3Vyc29yVHlwZSB9IGZyb20gXCIuLi8uLi93aWRnZXRzL2NvbW1vbi9zdGF0ZXMvY3Vyc29yU3RhdGVzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRkZUU2VyaWVzIGV4dGVuZHMgQmFzZVNlcmllc3tcclxuICAgIFxyXG4gICAgcmVhZG9ubHkgdHlwZSA9IFNlcmllc1R5cGUuZmZ0U2VyaWVzO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHNpZ25hbDogSVNpZ25hbCwgbmFtZTogc3RyaW5nLCBjb2xvcjogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIoc2lnbmFsLCBuYW1lLCBjb2xvciwgQ3Vyc29yVHlwZS5mcmVxdWVuY3lEb21haW4pO1xyXG4gICAgICAgIHRoaXMucmF3UG9pbnRzID0gdGhpcy5zaWduYWwucmF3UG9pbnRzO1xyXG4gICAgICAgIHRoaXMudXBkYXRlVGltZXN0YW1wcygpO1xyXG4gICAgICAgIHRoaXMuZ2V0UmFuZ2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBtYXggWCB2YWx1ZSBmcm9tIGEgc2VyaWVcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcmV0dXJucyB7KG51bWJlciB8IHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgWVRTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldE1heFgoKTogbnVtYmVyIHwgdW5kZWZpbmVke1xyXG4gICAgICAgIGlmICh0aGlzLnJhd1BvaW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJhd1BvaW50c1t0aGlzLnJhd1BvaW50cy5sZW5ndGggLSAxXS54XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgbWluIFggdmFsdWUgZnJvbSBhIHNlcmllXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHJldHVybnMgeyhudW1iZXIgfCB1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIFlUU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXRNaW5YKCk6IG51bWJlciB8IHVuZGVmaW5lZHtcclxuICAgICAgICBpZiAodGhpcy5yYXdQb2ludHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yYXdQb2ludHNbMF0ueDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIGdldHMgdGhlIHRpbWVzdGFtcHMgYXZhaWxhYmxlIGluIHRoZSBzZXJpZXNcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtBcnJheTxudW1iZXI+fVxyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCB0aW1lc3RhbXBzKCkgOiBBcnJheTxudW1iZXI+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdGltZXN0YW1wcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIHRpbWVzdGFtcHMgYmFzZW9uIHRoZSBhdmFpbGFibGUgc2VyaWVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBCYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCB1cGRhdGVUaW1lc3RhbXBzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnJhd1BvaW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RpbWVzdGFtcHMgPSB0aGlzLnJhd1BvaW50cy5tYXAoKHJhd1BvaW50KSA9PiB7IHJldHVybiByYXdQb2ludC54OyB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDbG9uZXMgdGhpcyBzZXJpZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtCYXNlU2VyaWVzfVxyXG4gICAgICogQG1lbWJlcm9mIFlUU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjbG9uZSgpOiBCYXNlU2VyaWVze1xyXG4gICAgICAgIHJldHVybiBuZXcgRkZUU2VyaWVzKHRoaXMuc2lnbmFsLmNsb25lKCksIHRoaXMubmFtZSwgdGhpcy5jb2xvcik7XHJcbiAgICB9XHJcbn0iXX0=