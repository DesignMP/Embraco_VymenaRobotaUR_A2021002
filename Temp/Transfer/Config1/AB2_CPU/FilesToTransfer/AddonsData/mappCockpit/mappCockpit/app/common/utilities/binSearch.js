define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BinSearchMode;
    (function (BinSearchMode) {
        BinSearchMode[BinSearchMode["NEAREST"] = 0] = "NEAREST";
        BinSearchMode[BinSearchMode["PREVIOUSLOWER"] = 1] = "PREVIOUSLOWER";
        BinSearchMode[BinSearchMode["LOWERBOUND"] = 2] = "LOWERBOUND";
        BinSearchMode[BinSearchMode["NEXTUPPER"] = 3] = "NEXTUPPER";
        BinSearchMode[BinSearchMode["UPPERBOUND"] = 4] = "UPPERBOUND";
    })(BinSearchMode = exports.BinSearchMode || (exports.BinSearchMode = {}));
    /**
     * implements binary search.
     *
     * @export
     * @class BinSearch
     */
    var BinSearch = /** @class */ (function () {
        function BinSearch() {
        }
        BinSearch.findNearest = function (value, data, searchMode, iFrom, iTo) {
            if (searchMode === void 0) { searchMode = BinSearchMode.NEAREST; }
            if (iFrom === void 0) { iFrom = 0; }
            if (iTo === void 0) { iTo = 0; }
            var OUT_OF_RANGE = -1;
            if (data.length > 1) {
                // initialize start index
                if (iFrom === 0 && iTo === 0) {
                    iTo = data.length - 1;
                }
                // check if value is outside the range and return the matching limit value
                if (value < data[iFrom])
                    return iFrom;
                else if (value > data[iTo])
                    return iTo;
                if (iTo - iFrom > 1) {
                    // split and select range containing the value
                    return BinSearch.splitRange(iFrom, iTo, value, data, searchMode);
                }
                else {
                    // we now reached the last step and need to select the best matching value depending on the search mode
                    return BinSearch.selectNearestValue(iFrom, iTo, value, data, searchMode);
                }
            }
            else if (data.length === 1) {
                return 0;
            }
            else {
                return OUT_OF_RANGE;
            }
        };
        /**
         * splits the available range and selects the one containing the value
         *
         * @private
         * @static
         * @param {number} iFrom
         * @param {number} iTo
         * @param {number} value
         * @param {number[]} data
         * @param {BinSearchMode} searchMode
         * @returns
         * @memberof BinSearch
         */
        BinSearch.splitRange = function (iFrom, iTo, value, data, searchMode) {
            // calculate the middle index
            var iMiddle = Math.floor((iFrom + iTo) / 2);
            // continue searching the upper range
            if (value > data[iMiddle]) {
                // continue searching within the upper range
                return this.findNearest(value, data, searchMode, iMiddle, iTo);
            }
            else {
                // continue seearching the lower range
                return this.findNearest(value, data, searchMode, iFrom, iMiddle);
            }
        };
        /**
         * determines the nearest value. The picked value depends on the search mode.
         *
         * @private
         * @static
         * @param {number} iFrom
         * @param {BinSearchMode} searchMode
         * @param {number} value
         * @param {number[]} data
         * @param {number} iTo
         * @returns
         * @memberof BinSearch
         */
        BinSearch.selectNearestValue = function (iFrom, iTo, value, data, searchMode) {
            var foundIndex = iFrom;
            switch (searchMode) {
                case BinSearchMode.NEAREST:
                    // select the nearest index
                    foundIndex = Math.abs(value - data[iFrom]) <= Math.abs(value - data[iTo]) ? iFrom : iTo;
                    break;
                case BinSearchMode.PREVIOUSLOWER:
                    // select the next smaller smaller possible value
                    foundIndex = value > data[iFrom] ? iFrom : iFrom > 0 ? iFrom - 1 : iFrom;
                    break;
                case BinSearchMode.LOWERBOUND:
                    // select the next smaller smaller possible value
                    foundIndex = value < data[iTo] ? iFrom : iTo;
                    break;
                case BinSearchMode.NEXTUPPER:
                    // select the next greater possible value
                    foundIndex = value < data[iTo] ? iTo : iTo + 1 < data.length ? iTo + 1 : iTo;
                    break;
                case BinSearchMode.UPPERBOUND:
                    // select the next greater possible value
                    foundIndex = value > data[iFrom] ? iTo : iFrom;
                    break;
            }
            return foundIndex;
        };
        return BinSearch;
    }());
    exports.BinSearch = BinSearch;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluU2VhcmNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vdXRpbGl0aWVzL2JpblNlYXJjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFDQSxJQUFZLGFBTVg7SUFORCxXQUFZLGFBQWE7UUFDckIsdURBQU8sQ0FBQTtRQUNQLG1FQUFhLENBQUE7UUFDYiw2REFBVSxDQUFBO1FBQ1YsMkRBQVMsQ0FBQTtRQUNULDZEQUFVLENBQUE7SUFDZCxDQUFDLEVBTlcsYUFBYSxHQUFiLHFCQUFhLEtBQWIscUJBQWEsUUFNeEI7SUFFRDs7Ozs7T0FLRztJQUNIO1FBQUE7UUEyR0EsQ0FBQztRQTFHVSxxQkFBVyxHQUFsQixVQUFtQixLQUFhLEVBQUUsSUFBYyxFQUFFLFVBQWtDLEVBQUUsS0FBaUIsRUFBRSxHQUFlO1lBQXRFLDJCQUFBLEVBQUEsYUFBYSxhQUFhLENBQUMsT0FBTztZQUFFLHNCQUFBLEVBQUEsU0FBaUI7WUFBRSxvQkFBQSxFQUFBLE9BQWU7WUFFcEgsSUFBTSxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFFeEIsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFFakIseUJBQXlCO2dCQUN6QixJQUFJLEtBQUssS0FBSyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsRUFBRTtvQkFDMUIsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2lCQUN6QjtnQkFFRCwwRUFBMEU7Z0JBQzFFLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7b0JBQ25CLE9BQU8sS0FBSyxDQUFDO3FCQUNaLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7b0JBQ3RCLE9BQU8sR0FBRyxDQUFDO2dCQUVmLElBQUksR0FBRyxHQUFHLEtBQUssR0FBRyxDQUFDLEVBQUU7b0JBQ2pCLDhDQUE4QztvQkFDOUMsT0FBTyxTQUFTLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztpQkFFcEU7cUJBQU07b0JBQ0gsdUdBQXVHO29CQUN2RyxPQUFPLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7aUJBQzVFO2FBR0o7aUJBQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDMUIsT0FBTyxDQUFDLENBQUM7YUFDWjtpQkFBTTtnQkFDSCxPQUFPLFlBQVksQ0FBQzthQUN2QjtRQUtMLENBQUM7UUFFRDs7Ozs7Ozs7Ozs7O1dBWUc7UUFDWSxvQkFBVSxHQUF6QixVQUEwQixLQUFhLEVBQUUsR0FBVyxFQUFFLEtBQWEsRUFBRSxJQUFjLEVBQUUsVUFBeUI7WUFFMUcsNkJBQTZCO1lBQzdCLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFFOUMscUNBQXFDO1lBQ3JDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDdkIsNENBQTRDO2dCQUM1QyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ2xFO2lCQUNJO2dCQUNELHNDQUFzQztnQkFDdEMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQzthQUNwRTtRQUNMLENBQUM7UUFFRDs7Ozs7Ozs7Ozs7O1dBWUc7UUFDWSw0QkFBa0IsR0FBakMsVUFBa0MsS0FBYSxFQUFFLEdBQVcsRUFBRSxLQUFhLEVBQUUsSUFBYyxFQUFFLFVBQXlCO1lBQ2xILElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQztZQUN2QixRQUFRLFVBQVUsRUFBRTtnQkFDaEIsS0FBSyxhQUFhLENBQUMsT0FBTztvQkFDdEIsMkJBQTJCO29CQUMzQixVQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO29CQUN4RixNQUFNO2dCQUNWLEtBQUssYUFBYSxDQUFDLGFBQWE7b0JBQzVCLGlEQUFpRDtvQkFDakQsVUFBVSxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO29CQUN6RSxNQUFNO2dCQUNWLEtBQUssYUFBYSxDQUFDLFVBQVU7b0JBQ3pCLGlEQUFpRDtvQkFDakQsVUFBVSxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO29CQUM3QyxNQUFNO2dCQUNWLEtBQUssYUFBYSxDQUFDLFNBQVM7b0JBQ3hCLHlDQUF5QztvQkFDekMsVUFBVSxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7b0JBQzdFLE1BQU07Z0JBQ1YsS0FBSyxhQUFhLENBQUMsVUFBVTtvQkFDekIseUNBQXlDO29CQUN6QyxVQUFVLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7b0JBQy9DLE1BQU07YUFDYjtZQUNELE9BQU8sVUFBVSxDQUFDO1FBQ3RCLENBQUM7UUFDTCxnQkFBQztJQUFELENBQUMsQUEzR0QsSUEyR0M7SUEzR1ksOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuZXhwb3J0IGVudW0gQmluU2VhcmNoTW9kZSB7XHJcbiAgICBORUFSRVNULFxyXG4gICAgUFJFVklPVVNMT1dFUixcclxuICAgIExPV0VSQk9VTkQsXHJcbiAgICBORVhUVVBQRVIsXHJcbiAgICBVUFBFUkJPVU5EXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBpbXBsZW1lbnRzIGJpbmFyeSBzZWFyY2guXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIEJpblNlYXJjaFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEJpblNlYXJjaCB7XHJcbiAgICBzdGF0aWMgZmluZE5lYXJlc3QodmFsdWU6IG51bWJlciwgZGF0YTogbnVtYmVyW10sIHNlYXJjaE1vZGUgPSBCaW5TZWFyY2hNb2RlLk5FQVJFU1QsIGlGcm9tOiBudW1iZXIgPSAwLCBpVG86IG51bWJlciA9IDApOiBudW1iZXIge1xyXG5cclxuICAgICAgICBjb25zdCBPVVRfT0ZfUkFOR0UgPSAtMTtcclxuXHJcbiAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMSkge1xyXG5cclxuICAgICAgICAgICAgLy8gaW5pdGlhbGl6ZSBzdGFydCBpbmRleFxyXG4gICAgICAgICAgICBpZiAoaUZyb20gPT09IDAgJiYgaVRvID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBpVG8gPSBkYXRhLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHZhbHVlIGlzIG91dHNpZGUgdGhlIHJhbmdlIGFuZCByZXR1cm4gdGhlIG1hdGNoaW5nIGxpbWl0IHZhbHVlXHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA8IGRhdGFbaUZyb21dKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlGcm9tO1xyXG4gICAgICAgICAgICBlbHNlIGlmICh2YWx1ZSA+IGRhdGFbaVRvXSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBpVG87XHJcblxyXG4gICAgICAgICAgICBpZiAoaVRvIC0gaUZyb20gPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBzcGxpdCBhbmQgc2VsZWN0IHJhbmdlIGNvbnRhaW5pbmcgdGhlIHZhbHVlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gQmluU2VhcmNoLnNwbGl0UmFuZ2UoaUZyb20sIGlUbywgdmFsdWUsIGRhdGEsIHNlYXJjaE1vZGUpO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIHdlIG5vdyByZWFjaGVkIHRoZSBsYXN0IHN0ZXAgYW5kIG5lZWQgdG8gc2VsZWN0IHRoZSBiZXN0IG1hdGNoaW5nIHZhbHVlIGRlcGVuZGluZyBvbiB0aGUgc2VhcmNoIG1vZGVcclxuICAgICAgICAgICAgICAgIHJldHVybiBCaW5TZWFyY2guc2VsZWN0TmVhcmVzdFZhbHVlKGlGcm9tLCBpVG8sIHZhbHVlLCBkYXRhLCBzZWFyY2hNb2RlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgfSBlbHNlIGlmIChkYXRhLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gT1VUX09GX1JBTkdFO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBzcGxpdHMgdGhlIGF2YWlsYWJsZSByYW5nZSBhbmQgc2VsZWN0cyB0aGUgb25lIGNvbnRhaW5pbmcgdGhlIHZhbHVlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpRnJvbVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGlUb1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcltdfSBkYXRhXHJcbiAgICAgKiBAcGFyYW0ge0JpblNlYXJjaE1vZGV9IHNlYXJjaE1vZGVcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluU2VhcmNoXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIHNwbGl0UmFuZ2UoaUZyb206IG51bWJlciwgaVRvOiBudW1iZXIsIHZhbHVlOiBudW1iZXIsIGRhdGE6IG51bWJlcltdLCBzZWFyY2hNb2RlOiBCaW5TZWFyY2hNb2RlKSB7XHJcblxyXG4gICAgICAgIC8vIGNhbGN1bGF0ZSB0aGUgbWlkZGxlIGluZGV4XHJcbiAgICAgICAgY29uc3QgaU1pZGRsZSA9IE1hdGguZmxvb3IoKGlGcm9tICsgaVRvKSAvIDIpO1xyXG5cclxuICAgICAgICAvLyBjb250aW51ZSBzZWFyY2hpbmcgdGhlIHVwcGVyIHJhbmdlXHJcbiAgICAgICAgaWYgKHZhbHVlID4gZGF0YVtpTWlkZGxlXSkge1xyXG4gICAgICAgICAgICAvLyBjb250aW51ZSBzZWFyY2hpbmcgd2l0aGluIHRoZSB1cHBlciByYW5nZVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maW5kTmVhcmVzdCh2YWx1ZSwgZGF0YSwgc2VhcmNoTW9kZSwgaU1pZGRsZSwgaVRvKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnRpbnVlIHNlZWFyY2hpbmcgdGhlIGxvd2VyIHJhbmdlXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbmROZWFyZXN0KHZhbHVlLCBkYXRhLCBzZWFyY2hNb2RlLCBpRnJvbSwgaU1pZGRsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZGV0ZXJtaW5lcyB0aGUgbmVhcmVzdCB2YWx1ZS4gVGhlIHBpY2tlZCB2YWx1ZSBkZXBlbmRzIG9uIHRoZSBzZWFyY2ggbW9kZS4gXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpRnJvbVxyXG4gICAgICogQHBhcmFtIHtCaW5TZWFyY2hNb2RlfSBzZWFyY2hNb2RlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdmFsdWVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyW119IGRhdGFcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpVG9cclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluU2VhcmNoXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIHNlbGVjdE5lYXJlc3RWYWx1ZShpRnJvbTogbnVtYmVyLCBpVG86IG51bWJlciwgdmFsdWU6IG51bWJlciwgZGF0YTogbnVtYmVyW10sIHNlYXJjaE1vZGU6IEJpblNlYXJjaE1vZGUpIHtcclxuICAgICAgICBsZXQgZm91bmRJbmRleCA9IGlGcm9tO1xyXG4gICAgICAgIHN3aXRjaCAoc2VhcmNoTW9kZSkge1xyXG4gICAgICAgICAgICBjYXNlIEJpblNlYXJjaE1vZGUuTkVBUkVTVDpcclxuICAgICAgICAgICAgICAgIC8vIHNlbGVjdCB0aGUgbmVhcmVzdCBpbmRleFxyXG4gICAgICAgICAgICAgICAgZm91bmRJbmRleCA9IE1hdGguYWJzKHZhbHVlIC0gZGF0YVtpRnJvbV0pIDw9IE1hdGguYWJzKHZhbHVlIC0gZGF0YVtpVG9dKSA/IGlGcm9tIDogaVRvO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQmluU2VhcmNoTW9kZS5QUkVWSU9VU0xPV0VSOlxyXG4gICAgICAgICAgICAgICAgLy8gc2VsZWN0IHRoZSBuZXh0IHNtYWxsZXIgc21hbGxlciBwb3NzaWJsZSB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgZm91bmRJbmRleCA9IHZhbHVlID4gZGF0YVtpRnJvbV0gPyBpRnJvbSA6IGlGcm9tID4gMCA/IGlGcm9tIC0gMSA6IGlGcm9tO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQmluU2VhcmNoTW9kZS5MT1dFUkJPVU5EOlxyXG4gICAgICAgICAgICAgICAgLy8gc2VsZWN0IHRoZSBuZXh0IHNtYWxsZXIgc21hbGxlciBwb3NzaWJsZSB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgZm91bmRJbmRleCA9IHZhbHVlIDwgZGF0YVtpVG9dID8gaUZyb20gOiBpVG87XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBCaW5TZWFyY2hNb2RlLk5FWFRVUFBFUjpcclxuICAgICAgICAgICAgICAgIC8vIHNlbGVjdCB0aGUgbmV4dCBncmVhdGVyIHBvc3NpYmxlIHZhbHVlXHJcbiAgICAgICAgICAgICAgICBmb3VuZEluZGV4ID0gdmFsdWUgPCBkYXRhW2lUb10gPyBpVG8gOiBpVG8gKyAxIDwgZGF0YS5sZW5ndGggPyBpVG8gKyAxIDogaVRvO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQmluU2VhcmNoTW9kZS5VUFBFUkJPVU5EOlxyXG4gICAgICAgICAgICAgICAgLy8gc2VsZWN0IHRoZSBuZXh0IGdyZWF0ZXIgcG9zc2libGUgdmFsdWVcclxuICAgICAgICAgICAgICAgIGZvdW5kSW5kZXggPSB2YWx1ZSA+IGRhdGFbaUZyb21dID8gaVRvIDogaUZyb207XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZvdW5kSW5kZXg7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG4iXX0=