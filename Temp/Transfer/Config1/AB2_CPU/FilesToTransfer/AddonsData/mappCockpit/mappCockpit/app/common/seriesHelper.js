define(["require", "exports", "../models/chartManagerDataModel/settingIds", "./persistence/settings", "./utilities/binSearch", "../models/chartManagerDataModel/seriesType"], function (require, exports, settingIds_1, settings_1, binSearch_1, seriesType_1) {
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
        /**
         * Returns all necessary settings to create a new serie
         *
         * @static
         * @param {ISignal} signal
         * @param {string} signalName
         * @param {string} color
         * @param {string} id
         * @param {SeriesType} type
         * @returns {ISettings}
         * @memberof SeriesHelper
         */
        SeriesHelper.createSerieSettings = function (signal, signalName, color, id, type) {
            var serieType = SeriesHelper.getSerieType(type);
            var settings = new settings_1.Settings(serieType);
            var signalDataSettings = signal.getSettings();
            var transferables = [signalDataSettings.data.rawPointsX.buffer, signalDataSettings.data.rawPointsY.buffer];
            settings.setValue(settingIds_1.SettingIds.SeriesId, id);
            settings.setValue(settingIds_1.SettingIds.SeriesName, signalName);
            settings.setValue(settingIds_1.SettingIds.SeriesColor, color);
            settings.setValue(settingIds_1.SettingIds.SeriesSignalData, signalDataSettings);
            settings.setValue("transferables", transferables);
            return settings;
        };
        SeriesHelper.getSerieType = function (type) {
            if (type == seriesType_1.SeriesType.timeSeries) {
                return "YTSeries";
            }
            else if (type == seriesType_1.SeriesType.xySeries) {
                return "XYSeries";
            }
            else {
                return "FFTSeries";
            }
        };
        return SeriesHelper;
    }());
    exports.SeriesHelper = SeriesHelper;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWVzSGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vc2VyaWVzSGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQTJHTyx3QkF4R2EseUJBQWEsQ0F3R2I7SUFwR3BCO1FBQUE7UUFrR0EsQ0FBQztRQWpHRzs7Ozs7Ozs7O1dBU0c7UUFDSSwyQ0FBOEIsR0FBckMsVUFBc0MsV0FBbUIsRUFBRSxlQUEyQixFQUFFLFVBQWlEO1lBQWpELDJCQUFBLEVBQUEsYUFBNEIseUJBQWEsQ0FBQyxPQUFPO1lBRXJJLElBQUksYUFBYSxHQUFhLEVBQUUsQ0FBQztZQUVqQyw2REFBNkQ7WUFDN0QsZUFBZSxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQU07Z0JBQzNCLElBQUksaUJBQWlCLEdBQUcscUJBQVMsQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBQyxVQUFVLENBQUMsQ0FBQztnQkFDOUUsSUFBRyxhQUFhLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUM7b0JBQ3RELGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztpQkFDakQ7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILGlGQUFpRjtZQUNqRixhQUFhLENBQUMsSUFBSSxDQUFDLFVBQUMsTUFBTSxFQUFFLE1BQU0sSUFBTyxPQUFPLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVwRSw4Q0FBOEM7WUFDOUMsSUFBSSxpQkFBaUIsR0FBRyxxQkFBUyxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsYUFBYSxFQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3JGLElBQUksWUFBWSxHQUFHLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQ3BELE9BQU8sWUFBWSxDQUFDO1FBQ3hCLENBQUM7UUFFRDs7Ozs7Ozs7Ozs7V0FXRztRQUNJLDJCQUFjLEdBQXJCLFVBQXNCLFdBQW1CLEVBQUUsTUFBZ0IsRUFBRSxVQUFrQztZQUFsQywyQkFBQSxFQUFBLGFBQWEseUJBQWEsQ0FBQyxPQUFPO1lBQzNGLE9BQU8scUJBQVMsQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBQyxVQUFVLENBQUMsQ0FBQztRQUNqRSxDQUFDO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDSSxzQkFBUyxHQUFoQixVQUFpQixTQUFpQixFQUFFLFVBQW9CO1lBQ3BELE9BQU8sVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUssU0FBUyxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLElBQUksVUFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEgsQ0FBQztRQUVEOzs7Ozs7Ozs7OztXQVdHO1FBQ0ksZ0NBQW1CLEdBQTFCLFVBQTJCLE1BQWUsRUFBRSxVQUFrQixFQUFFLEtBQWEsRUFBRSxFQUFVLEVBQUUsSUFBZ0I7WUFDdkcsSUFBSSxTQUFTLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoRCxJQUFJLFFBQVEsR0FBRyxJQUFJLG1CQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDdkMsSUFBSSxrQkFBa0IsR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDOUMsSUFBSSxhQUFhLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRTNHLFFBQVEsQ0FBQyxRQUFRLENBQUMsdUJBQVUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDM0MsUUFBUSxDQUFDLFFBQVEsQ0FBQyx1QkFBVSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUNyRCxRQUFRLENBQUMsUUFBUSxDQUFDLHVCQUFVLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2pELFFBQVEsQ0FBQyxRQUFRLENBQUMsdUJBQVUsQ0FBQyxnQkFBZ0IsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1lBQ25FLFFBQVEsQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQ2xELE9BQU8sUUFBUSxDQUFDO1FBQ3BCLENBQUM7UUFFTSx5QkFBWSxHQUFuQixVQUFvQixJQUFnQjtZQUNoQyxJQUFJLElBQUksSUFBSSx1QkFBVSxDQUFDLFVBQVUsRUFBRTtnQkFDL0IsT0FBTyxVQUFVLENBQUM7YUFDckI7aUJBQ0ksSUFBSSxJQUFJLElBQUksdUJBQVUsQ0FBQyxRQUFRLEVBQUU7Z0JBQ2xDLE9BQU8sVUFBVSxDQUFDO2FBQ3JCO2lCQUNJO2dCQUNELE9BQU8sV0FBVyxDQUFDO2FBQ3RCO1FBQ0wsQ0FBQztRQUNMLG1CQUFDO0lBQUQsQ0FBQyxBQWxHRCxJQWtHQztJQWxHWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNldHRpbmdJZHMgfSBmcm9tIFwiLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9zZXR0aW5nSWRzXCI7XHJcbmltcG9ydCB7IFNldHRpbmdzIH0gZnJvbSBcIi4vcGVyc2lzdGVuY2Uvc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgSVNpZ25hbCB9IGZyb20gXCIuLi9tb2RlbHMvY29tbW9uL2ludGVyZmFjZXMvc2lnbmFsSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEJpblNlYXJjaCwgQmluU2VhcmNoTW9kZSB9IGZyb20gXCIuL3V0aWxpdGllcy9iaW5TZWFyY2hcIjtcclxuaW1wb3J0IHsgU2VyaWVzVHlwZSB9IGZyb20gXCIuLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL3Nlcmllc1R5cGVcIjtcclxuaW1wb3J0IHsgSVNldHRpbmdzIH0gZnJvbSBcIi4vcGVyc2lzdGVuY2UvaW50ZXJmYWNlcy9zZXR0aW5nc0ludGVyZmFjZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNlcmllc0hlbHBlciB7XHJcbiAgICAvKipcclxuICAgICAqIHNlYXJjaGVzIGZvciB0aGUgbmV4dCBuZWFyZXN0IHRpbWVzdGFtcCBpbiBhbGwgc2VyaWVzLlxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzZWFyY2hWYWx1ZSB0aGUgdmFsdWUgdG8gYmUgc2VhcmNoZWQgZm9yLlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJbXVtdfSB2YWx1ZUNvbGxlY3Rpb24gYW4gYXJyYXkgb2YgYSB2YWx1ZSBhcnJheSBjb250YWluaW5nIHRoZSBwb3NzaWJsZSB2YWx1ZXMuXHJcbiAgICAgKiBAcGFyYW0ge0JpblNlYXJjaE1vZGV9IFtzZWFyY2hNb2RlPUJpblNlYXJjaE1vZGUuTkVBUkVTVF0gc3BlY2VmaWVzIHRoZSBzZWFyY2ggbW9kZSB0byBkZWNpZGUgaWYgdGhlIGJpZ2dlciwgc21hbGxlciBvciBuZWFyZXN0IHZhbHVlcyBzaG91ZCBiZSBwaWNrZWQuXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFNlcmllc0hlbHBlclxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZmluZE5lYXJlc3RWYWx1ZUZyb21Db2xsZWN0aW9uKHNlYXJjaFZhbHVlOiBudW1iZXIsIHZhbHVlQ29sbGVjdGlvbjogbnVtYmVyW11bXSwgc2VhcmNoTW9kZTogQmluU2VhcmNoTW9kZSA9IEJpblNlYXJjaE1vZGUuTkVBUkVTVCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBuZWFyZXN0VmFsdWVzOiBudW1iZXJbXSA9IFtdO1xyXG5cclxuICAgICAgICAvLyBmaW5kIGFuZCBjb2xsZWN0IHRoZSBuZWFyZXN0IHBvaW50cyB3aXRoaW4gYSBzaW5nbGUgc2VyaWVzXHJcbiAgICAgICAgdmFsdWVDb2xsZWN0aW9uLmZvckVhY2goKHZhbHVlcykgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbmVhcmVzdFZhbHVlSW5kZXggPSBCaW5TZWFyY2guZmluZE5lYXJlc3Qoc2VhcmNoVmFsdWUsIHZhbHVlcyxzZWFyY2hNb2RlKTtcclxuICAgICAgICAgICAgaWYobmVhcmVzdFZhbHVlcy5pbmRleE9mKHZhbHVlc1tuZWFyZXN0VmFsdWVJbmRleF0pID09IC0xKXtcclxuICAgICAgICAgICAgICAgIG5lYXJlc3RWYWx1ZXMucHVzaCh2YWx1ZXNbbmVhcmVzdFZhbHVlSW5kZXhdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBzb3J0IHRoZSBuZWFyZXN0IHNlcmllcyBwb2ludHMgb2YgbXVsdGlwbGUgc2VyaWVzIGJ5IHRoZWlyIHggdmFsdWUgKHRpbWVzdGFtcClcclxuICAgICAgICBuZWFyZXN0VmFsdWVzLnNvcnQoKHZhbHVlMSwgdmFsdWUyKSA9PiB7IHJldHVybiB2YWx1ZTEgLSB2YWx1ZTI7IH0pO1xyXG5cclxuICAgICAgICAvLyBnZXQgdGhlIG5lYXJlc3QgdmFsdWUgZnJvbSBhbGwgdmFsdWUgc2VyaWVzXHJcbiAgICAgICAgbGV0IG5lYXJlc3RWYWx1ZUluZGV4ID0gQmluU2VhcmNoLmZpbmROZWFyZXN0KHNlYXJjaFZhbHVlLCBuZWFyZXN0VmFsdWVzLHNlYXJjaE1vZGUpO1xyXG4gICAgICAgIGxldCBuZWFyZXN0VmFsdWUgPSBuZWFyZXN0VmFsdWVzW25lYXJlc3RWYWx1ZUluZGV4XTtcclxuICAgICAgICByZXR1cm4gbmVhcmVzdFZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogc3JlYWNoZXMgZm9yIHRoZSBuZWFyZXN0IHZhbHVlXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNlYXJjaFZhbHVlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcltdfSB2YWx1ZXNcclxuICAgICAqIEBwYXJhbSB7Kn0gW3NlYXJjaE1vZGU9QmluU2VhcmNoTW9kZS5ORUFSRVNUXVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtpRnJvbT0wXVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtpVG89MF1cclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVzSGVscGVyXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBpbmRleE9mTmVhcmVzdChzZWFyY2hWYWx1ZTogbnVtYmVyLCB2YWx1ZXM6IG51bWJlcltdLCBzZWFyY2hNb2RlID0gQmluU2VhcmNoTW9kZS5ORUFSRVNUKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gQmluU2VhcmNoLmZpbmROZWFyZXN0KHNlYXJjaFZhbHVlLCB2YWx1ZXMsc2VhcmNoTW9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgdGhlIHNwZWNpZmllZCB0aW1lc3RhbXAgaXMgd2l0aCB0aGUgYXZhaWxhYmxlIHZhbHVlc1xyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lc3RhbXBcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyW119IHRpbWVzdGFtcHNcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllc0hlbHBlclxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaXNJblJhbmdlKHRpbWVzdGFtcDogbnVtYmVyLCB0aW1lc3RhbXBzOiBudW1iZXJbXSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aW1lc3RhbXBzLmxlbmd0aCA+IDAgJiYgIHRpbWVzdGFtcCA+PSB0aW1lc3RhbXBzWzBdICYmIHRpbWVzdGFtcCA8PSB0aW1lc3RhbXBzW3RpbWVzdGFtcHMubGVuZ3RoLTFdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhbGwgbmVjZXNzYXJ5IHNldHRpbmdzIHRvIGNyZWF0ZSBhIG5ldyBzZXJpZVxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7SVNpZ25hbH0gc2lnbmFsXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2lnbmFsTmFtZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbG9yXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgICAqIEBwYXJhbSB7U2VyaWVzVHlwZX0gdHlwZVxyXG4gICAgICogQHJldHVybnMge0lTZXR0aW5nc31cclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZXNIZWxwZXJcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGNyZWF0ZVNlcmllU2V0dGluZ3Moc2lnbmFsOiBJU2lnbmFsLCBzaWduYWxOYW1lOiBzdHJpbmcsIGNvbG9yOiBzdHJpbmcsIGlkOiBzdHJpbmcsIHR5cGU6IFNlcmllc1R5cGUpOiBJU2V0dGluZ3Mge1xyXG4gICAgICAgIGxldCBzZXJpZVR5cGUgPSBTZXJpZXNIZWxwZXIuZ2V0U2VyaWVUeXBlKHR5cGUpO1xyXG4gICAgICAgIGxldCBzZXR0aW5ncyA9IG5ldyBTZXR0aW5ncyhzZXJpZVR5cGUpO1xyXG4gICAgICAgIGxldCBzaWduYWxEYXRhU2V0dGluZ3MgPSBzaWduYWwuZ2V0U2V0dGluZ3MoKTtcclxuICAgICAgICBsZXQgdHJhbnNmZXJhYmxlcyA9IFtzaWduYWxEYXRhU2V0dGluZ3MuZGF0YS5yYXdQb2ludHNYLmJ1ZmZlciwgc2lnbmFsRGF0YVNldHRpbmdzLmRhdGEucmF3UG9pbnRzWS5idWZmZXJdO1xyXG5cclxuICAgICAgICBzZXR0aW5ncy5zZXRWYWx1ZShTZXR0aW5nSWRzLlNlcmllc0lkLCBpZCk7XHJcbiAgICAgICAgc2V0dGluZ3Muc2V0VmFsdWUoU2V0dGluZ0lkcy5TZXJpZXNOYW1lLCBzaWduYWxOYW1lKTtcclxuICAgICAgICBzZXR0aW5ncy5zZXRWYWx1ZShTZXR0aW5nSWRzLlNlcmllc0NvbG9yLCBjb2xvcik7XHJcbiAgICAgICAgc2V0dGluZ3Muc2V0VmFsdWUoU2V0dGluZ0lkcy5TZXJpZXNTaWduYWxEYXRhLCBzaWduYWxEYXRhU2V0dGluZ3MpO1xyXG4gICAgICAgIHNldHRpbmdzLnNldFZhbHVlKFwidHJhbnNmZXJhYmxlc1wiLCB0cmFuc2ZlcmFibGVzKTtcclxuICAgICAgICByZXR1cm4gc2V0dGluZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldFNlcmllVHlwZSh0eXBlOiBTZXJpZXNUeXBlKTogc3RyaW5ne1xyXG4gICAgICAgIGlmICh0eXBlID09IFNlcmllc1R5cGUudGltZVNlcmllcykge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJZVFNlcmllc1wiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09IFNlcmllc1R5cGUueHlTZXJpZXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiWFlTZXJpZXNcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIkZGVFNlcmllc1wiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0e0JpblNlYXJjaE1vZGV9Il19