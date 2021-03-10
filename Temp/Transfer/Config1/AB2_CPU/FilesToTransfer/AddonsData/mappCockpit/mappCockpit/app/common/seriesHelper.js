define(["require", "exports", "./utilities/binSearch"], function (require, exports, binSearch_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BinSearchMode = binSearch_1.BinSearchMode;
    var SeriesHelper = /** @class */ (function () {
        function SeriesHelper() {
        }
        /**
         * searches for the next nearest timestamp in all series.
         *
         * @static
         * @param {number} searchValue the value to be searched for.
         * @param {number[][]} valueCollection an array of a value array containing the possible values.
         * @param {BinSearchMode} [searchMode=BinSearchMode.NEAREST] specefies the search mode to decide if the bigger, smaller or nearest values shoud be picked.
         * @returns
         * @memberof SeriesHelper
         */
        SeriesHelper.findNearestValueFromCollection = function (searchValue, valueCollection, searchMode) {
            if (searchMode === void 0) { searchMode = binSearch_1.BinSearchMode.NEAREST; }
            var nearestValues = [];
            // find and collect the nearest points within a single series
            valueCollection.forEach(function (values) {
                var nearestValueIndex = binSearch_1.BinSearch.findNearest(searchValue, values, searchMode);
                if (nearestValues.indexOf(values[nearestValueIndex]) == -1) {
                    nearestValues.push(values[nearestValueIndex]);
                }
            });
            // sort the nearest series points of multiple series by their x value (timestamp)
            nearestValues.sort(function (value1, value2) { return value1 - value2; });
            // get the nearest value from all value series
            var nearestValueIndex = binSearch_1.BinSearch.findNearest(searchValue, nearestValues, searchMode);
            var nearestValue = nearestValues[nearestValueIndex];
            return nearestValue;
        };
        /**
         * sreaches for the nearest value
         *
         * @static
         * @param {number} searchValue
         * @param {number[]} values
         * @param {*} [searchMode=BinSearchMode.NEAREST]
         * @param {number} [iFrom=0]
         * @param {number} [iTo=0]
         * @returns {number}
         * @memberof SeriesHelper
         */
        SeriesHelper.indexOfNearest = function (searchValue, values, searchMode) {
            if (searchMode === void 0) { searchMode = binSearch_1.BinSearchMode.NEAREST; }
            return binSearch_1.BinSearch.findNearest(searchValue, values, searchMode);
        };
        /**
         * Checks if the specified timestamp is with the available values
         *
         * @static
         * @param {number} timestamp
         * @param {number[]} timestamps
         * @returns {boolean}
         * @memberof SeriesHelper
         */
        SeriesHelper.isInRange = function (timestamp, timestamps) {
            return timestamps.length > 0 && timestamp >= timestamps[0] && timestamp <= timestamps[timestamps.length - 1];
        };
        return SeriesHelper;
    }());
    exports.SeriesHelper = SeriesHelper;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWVzSGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vc2VyaWVzSGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQWdFTyx3QkFoRWEseUJBQWEsQ0FnRWI7SUE5RHBCO1FBQUE7UUE0REEsQ0FBQztRQTNERzs7Ozs7Ozs7O1dBU0c7UUFDSSwyQ0FBOEIsR0FBckMsVUFBc0MsV0FBbUIsRUFBRSxlQUEyQixFQUFFLFVBQWlEO1lBQWpELDJCQUFBLEVBQUEsYUFBNEIseUJBQWEsQ0FBQyxPQUFPO1lBRXJJLElBQUksYUFBYSxHQUFhLEVBQUUsQ0FBQztZQUVqQyw2REFBNkQ7WUFDN0QsZUFBZSxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQU07Z0JBQzNCLElBQUksaUJBQWlCLEdBQUcscUJBQVMsQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBQyxVQUFVLENBQUMsQ0FBQztnQkFDOUUsSUFBRyxhQUFhLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUM7b0JBQ3RELGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztpQkFDakQ7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILGlGQUFpRjtZQUNqRixhQUFhLENBQUMsSUFBSSxDQUFDLFVBQUMsTUFBTSxFQUFFLE1BQU0sSUFBTyxPQUFPLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVwRSw4Q0FBOEM7WUFDOUMsSUFBSSxpQkFBaUIsR0FBRyxxQkFBUyxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsYUFBYSxFQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3JGLElBQUksWUFBWSxHQUFHLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQ3BELE9BQU8sWUFBWSxDQUFDO1FBQ3hCLENBQUM7UUFFRDs7Ozs7Ozs7Ozs7V0FXRztRQUNJLDJCQUFjLEdBQXJCLFVBQXNCLFdBQW1CLEVBQUUsTUFBZ0IsRUFBRSxVQUFrQztZQUFsQywyQkFBQSxFQUFBLGFBQWEseUJBQWEsQ0FBQyxPQUFPO1lBQzNGLE9BQU8scUJBQVMsQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBQyxVQUFVLENBQUMsQ0FBQztRQUNqRSxDQUFDO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDSSxzQkFBUyxHQUFoQixVQUFpQixTQUFpQixFQUFFLFVBQW9CO1lBQ3BELE9BQU8sVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUssU0FBUyxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLElBQUksVUFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEgsQ0FBQztRQUNMLG1CQUFDO0lBQUQsQ0FBQyxBQTVERCxJQTREQztJQTVEWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJpblNlYXJjaCwgQmluU2VhcmNoTW9kZSB9IGZyb20gXCIuL3V0aWxpdGllcy9iaW5TZWFyY2hcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTZXJpZXNIZWxwZXIge1xyXG4gICAgLyoqXHJcbiAgICAgKiBzZWFyY2hlcyBmb3IgdGhlIG5leHQgbmVhcmVzdCB0aW1lc3RhbXAgaW4gYWxsIHNlcmllcy5cclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2VhcmNoVmFsdWUgdGhlIHZhbHVlIHRvIGJlIHNlYXJjaGVkIGZvci5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyW11bXX0gdmFsdWVDb2xsZWN0aW9uIGFuIGFycmF5IG9mIGEgdmFsdWUgYXJyYXkgY29udGFpbmluZyB0aGUgcG9zc2libGUgdmFsdWVzLlxyXG4gICAgICogQHBhcmFtIHtCaW5TZWFyY2hNb2RlfSBbc2VhcmNoTW9kZT1CaW5TZWFyY2hNb2RlLk5FQVJFU1RdIHNwZWNlZmllcyB0aGUgc2VhcmNoIG1vZGUgdG8gZGVjaWRlIGlmIHRoZSBiaWdnZXIsIHNtYWxsZXIgb3IgbmVhcmVzdCB2YWx1ZXMgc2hvdWQgYmUgcGlja2VkLlxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZXNIZWxwZXJcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGZpbmROZWFyZXN0VmFsdWVGcm9tQ29sbGVjdGlvbihzZWFyY2hWYWx1ZTogbnVtYmVyLCB2YWx1ZUNvbGxlY3Rpb246IG51bWJlcltdW10sIHNlYXJjaE1vZGU6IEJpblNlYXJjaE1vZGUgPSBCaW5TZWFyY2hNb2RlLk5FQVJFU1QpIHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgbmVhcmVzdFZhbHVlczogbnVtYmVyW10gPSBbXTtcclxuXHJcbiAgICAgICAgLy8gZmluZCBhbmQgY29sbGVjdCB0aGUgbmVhcmVzdCBwb2ludHMgd2l0aGluIGEgc2luZ2xlIHNlcmllc1xyXG4gICAgICAgIHZhbHVlQ29sbGVjdGlvbi5mb3JFYWNoKCh2YWx1ZXMpID0+IHtcclxuICAgICAgICAgICAgbGV0IG5lYXJlc3RWYWx1ZUluZGV4ID0gQmluU2VhcmNoLmZpbmROZWFyZXN0KHNlYXJjaFZhbHVlLCB2YWx1ZXMsc2VhcmNoTW9kZSk7XHJcbiAgICAgICAgICAgIGlmKG5lYXJlc3RWYWx1ZXMuaW5kZXhPZih2YWx1ZXNbbmVhcmVzdFZhbHVlSW5kZXhdKSA9PSAtMSl7XHJcbiAgICAgICAgICAgICAgICBuZWFyZXN0VmFsdWVzLnB1c2godmFsdWVzW25lYXJlc3RWYWx1ZUluZGV4XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gc29ydCB0aGUgbmVhcmVzdCBzZXJpZXMgcG9pbnRzIG9mIG11bHRpcGxlIHNlcmllcyBieSB0aGVpciB4IHZhbHVlICh0aW1lc3RhbXApXHJcbiAgICAgICAgbmVhcmVzdFZhbHVlcy5zb3J0KCh2YWx1ZTEsIHZhbHVlMikgPT4geyByZXR1cm4gdmFsdWUxIC0gdmFsdWUyOyB9KTtcclxuXHJcbiAgICAgICAgLy8gZ2V0IHRoZSBuZWFyZXN0IHZhbHVlIGZyb20gYWxsIHZhbHVlIHNlcmllc1xyXG4gICAgICAgIGxldCBuZWFyZXN0VmFsdWVJbmRleCA9IEJpblNlYXJjaC5maW5kTmVhcmVzdChzZWFyY2hWYWx1ZSwgbmVhcmVzdFZhbHVlcyxzZWFyY2hNb2RlKTtcclxuICAgICAgICBsZXQgbmVhcmVzdFZhbHVlID0gbmVhcmVzdFZhbHVlc1tuZWFyZXN0VmFsdWVJbmRleF07XHJcbiAgICAgICAgcmV0dXJuIG5lYXJlc3RWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHNyZWFjaGVzIGZvciB0aGUgbmVhcmVzdCB2YWx1ZVxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzZWFyY2hWYWx1ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJbXX0gdmFsdWVzXHJcbiAgICAgKiBAcGFyYW0geyp9IFtzZWFyY2hNb2RlPUJpblNlYXJjaE1vZGUuTkVBUkVTVF1cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbaUZyb209MF1cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbaVRvPTBdXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllc0hlbHBlclxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaW5kZXhPZk5lYXJlc3Qoc2VhcmNoVmFsdWU6IG51bWJlciwgdmFsdWVzOiBudW1iZXJbXSwgc2VhcmNoTW9kZSA9IEJpblNlYXJjaE1vZGUuTkVBUkVTVCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIEJpblNlYXJjaC5maW5kTmVhcmVzdChzZWFyY2hWYWx1ZSwgdmFsdWVzLHNlYXJjaE1vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIHRoZSBzcGVjaWZpZWQgdGltZXN0YW1wIGlzIHdpdGggdGhlIGF2YWlsYWJsZSB2YWx1ZXNcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdGltZXN0YW1wXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcltdfSB0aW1lc3RhbXBzXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZXNIZWxwZXJcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGlzSW5SYW5nZSh0aW1lc3RhbXA6IG51bWJlciwgdGltZXN0YW1wczogbnVtYmVyW10pOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGltZXN0YW1wcy5sZW5ndGggPiAwICYmICB0aW1lc3RhbXAgPj0gdGltZXN0YW1wc1swXSAmJiB0aW1lc3RhbXAgPD0gdGltZXN0YW1wc1t0aW1lc3RhbXBzLmxlbmd0aC0xXTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0e0JpblNlYXJjaE1vZGV9Il19