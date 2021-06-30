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
define(["require", "exports", "./seriesType", "../../widgets/common/states/cursorStates", "../../common/persistence/settings", "../common/calculatorProvider/calculationDataInfo", "./settingIds", "./baseSeries"], function (require, exports, seriesType_1, cursorStates_1, settings_1, calculationDataInfo_1, settingIds_1, baseSeries_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FFTSeries = /** @class */ (function (_super) {
        __extends(FFTSeries, _super);
        /**
         * Creates an instance of FFTSeries
         * @param {ISignal} signal
         * @param {string} name
         * @param {string} color
         * @param {ISeriesProvider} seriesProvider
         * @param {string} [uniqueId=""]
         * @memberof FFTSeries
         */
        function FFTSeries(signal, name, color, seriesProvider, uniqueId) {
            if (uniqueId === void 0) { uniqueId = ""; }
            var _this = _super.call(this, signal, name, color, cursorStates_1.CursorType.frequencyDomain, seriesProvider, uniqueId) || this;
            _this.type = seriesType_1.SeriesType.fftSeries;
            _this.rawPoints = _this.signal.rawPoints;
            _this.updateTimestamps();
            _this.getRange();
            return _this;
        }
        /**
         * Creates an instance of FFTSeries with the given settings
         *
         * @static
         * @param {ISettings} settings
         * @param {ISeriesProvider} seriesProvider
         * @returns {FFTSeries}
         * @memberof FFTSeries
         */
        FFTSeries.create = function (settings, seriesProvider) {
            // get info from persistingdata
            var settingsObj = settings_1.Settings.create(settings);
            var id = settingsObj.getValue(settingIds_1.SettingIds.SeriesId);
            var name = settingsObj.getValue(settingIds_1.SettingIds.SeriesName);
            var color = settingsObj.getValue(settingIds_1.SettingIds.SeriesColor);
            var signalData = settingsObj.getValue(settingIds_1.SettingIds.SeriesSignalData);
            // create signal with the given signalData
            var signal = this.createSignal(signalData);
            // create series with the given data
            var newYTSeries = new FFTSeries(signal, name, color, seriesProvider, id);
            // set calculation informations if available
            var calculationDataInfo = settingsObj.getValue(settingIds_1.SettingIds.SeriesCalculationData);
            if (calculationDataInfo != undefined) {
                newYTSeries.calculationDataInfo = new calculationDataInfo_1.CalculationDataInfo();
                newYTSeries.calculationDataInfo.setSettings(calculationDataInfo);
            }
            return newYTSeries;
        };
        /**
         * Returns the settings of the FFTSeries
         *
         * @returns {ISettings}
         * @memberof FFTSeries
         */
        FFTSeries.prototype.getSettings = function () {
            var settings = _super.prototype.getSettings.call(this);
            settings.type = "FFTSeries";
            return settings;
        };
        /**
         * Get max X value from a serie
         *
         * @protected
         * @returns {(number | undefined)}
         * @memberof FFTSeries
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
         * @memberof FFTSeries
         */
        FFTSeries.prototype.getMinX = function () {
            if (this.rawPoints.length > 0) {
                return this.rawPoints[0].x;
            }
            return undefined;
        };
        /**
         * Updates the timestamps baseon the available series
         *
         * @private
         * @memberof FFTSeries
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
         * @memberof FFTSeries
         */
        FFTSeries.prototype.clone = function () {
            var settings = this.getSettings();
            settings.setValue(settingIds_1.SettingIds.SeriesId, this._seriesProvider.getUniqueId());
            return this._seriesProvider.createSerie(settings);
        };
        return FFTSeries;
    }(baseSeries_1.BaseSeries));
    exports.FFTSeries = FFTSeries;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRkZUU2VyaWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL0ZGVFNlcmllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBV0E7UUFBK0IsNkJBQVU7UUFJckM7Ozs7Ozs7O1dBUUc7UUFDSCxtQkFBWSxNQUFlLEVBQUUsSUFBWSxFQUFFLEtBQWEsRUFBRSxjQUErQixFQUFFLFFBQXFCO1lBQXJCLHlCQUFBLEVBQUEsYUFBcUI7WUFBaEgsWUFDSSxrQkFBTSxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSx5QkFBVSxDQUFDLGVBQWUsRUFBRSxjQUFjLEVBQUUsUUFBUSxDQUFDLFNBSW5GO1lBaEJRLFVBQUksR0FBRyx1QkFBVSxDQUFDLFNBQVMsQ0FBQztZQWFqQyxLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO1lBQ3ZDLEtBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3hCLEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7UUFDcEIsQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ0ksZ0JBQU0sR0FBYixVQUFjLFFBQW1CLEVBQUUsY0FBK0I7WUFDOUQsK0JBQStCO1lBQy9CLElBQUksV0FBVyxHQUFHLG1CQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzVDLElBQUksRUFBRSxHQUFXLFdBQVcsQ0FBQyxRQUFRLENBQUMsdUJBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMzRCxJQUFJLElBQUksR0FBVyxXQUFXLENBQUMsUUFBUSxDQUFDLHVCQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDL0QsSUFBSSxLQUFLLEdBQVcsV0FBVyxDQUFDLFFBQVEsQ0FBQyx1QkFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ2pFLElBQUksVUFBVSxHQUF3QixXQUFXLENBQUMsUUFBUSxDQUFDLHVCQUFVLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUV4RiwwQ0FBMEM7WUFDMUMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUUzQyxvQ0FBb0M7WUFDcEMsSUFBSSxXQUFXLEdBQUcsSUFBSSxTQUFTLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRXpFLDRDQUE0QztZQUM1QyxJQUFJLG1CQUFtQixHQUF3QixXQUFXLENBQUMsUUFBUSxDQUFDLHVCQUFVLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUN0RyxJQUFHLG1CQUFtQixJQUFJLFNBQVMsRUFBQztnQkFDaEMsV0FBVyxDQUFDLG1CQUFtQixHQUFHLElBQUkseUNBQW1CLEVBQUUsQ0FBQztnQkFDNUQsV0FBVyxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2FBQ3BFO1lBRUQsT0FBTyxXQUFXLENBQUM7UUFDdkIsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gsK0JBQVcsR0FBWDtZQUNJLElBQUksUUFBUSxHQUFHLGlCQUFNLFdBQVcsV0FBRSxDQUFDO1lBQ25DLFFBQVEsQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDO1lBQzVCLE9BQU8sUUFBUSxDQUFDO1FBQ3BCLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDTywyQkFBTyxHQUFqQjtZQUNJLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUMzQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO2FBQ3JEO1lBQ0QsT0FBTyxTQUFTLENBQUM7UUFDckIsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNPLDJCQUFPLEdBQWpCO1lBQ0ksSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQzNCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDOUI7WUFDRCxPQUFPLFNBQVMsQ0FBQTtRQUNwQixDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDTyxvQ0FBZ0IsR0FBMUI7WUFDSSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDM0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFDLFFBQVEsSUFBTyxPQUFPLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMvRTtRQUNMLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNJLHlCQUFLLEdBQVo7WUFDSSxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDakMsUUFBcUIsQ0FBQyxRQUFRLENBQUMsdUJBQVUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1lBQ3pGLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFFLENBQUM7UUFDdkQsQ0FBQztRQUNMLGdCQUFDO0lBQUQsQ0FBQyxBQXBIRCxDQUErQix1QkFBVSxHQW9IeEM7SUFwSFksOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJU2lnbmFsIH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL3NpZ25hbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJU2VyaWVzUHJvdmlkZXIgfSBmcm9tIFwiLi4vY29tbW9uL3Nlcmllc1Byb3ZpZGVyL3Nlcmllc1Byb3ZpZGVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vcGVyc2lzdGVuY2UvaW50ZXJmYWNlcy9zZXR0aW5nc0ludGVyZmFjZVwiO1xyXG5cclxuaW1wb3J0IHsgU2VyaWVzVHlwZSB9IGZyb20gXCIuL3Nlcmllc1R5cGVcIjtcclxuaW1wb3J0IHsgQ3Vyc29yVHlwZSB9IGZyb20gXCIuLi8uLi93aWRnZXRzL2NvbW1vbi9zdGF0ZXMvY3Vyc29yU3RhdGVzXCI7XHJcbmltcG9ydCB7IFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFJbmZvIH0gZnJvbSBcIi4uL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRpb25EYXRhSW5mb1wiO1xyXG5pbXBvcnQgeyBTZXR0aW5nSWRzIH0gZnJvbSBcIi4vc2V0dGluZ0lkc1wiO1xyXG5pbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4vYmFzZVNlcmllc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEZGVFNlcmllcyBleHRlbmRzIEJhc2VTZXJpZXN7XHJcbiAgICBcclxuICAgIHJlYWRvbmx5IHR5cGUgPSBTZXJpZXNUeXBlLmZmdFNlcmllcztcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgRkZUU2VyaWVzXHJcbiAgICAgKiBAcGFyYW0ge0lTaWduYWx9IHNpZ25hbFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb2xvclxyXG4gICAgICogQHBhcmFtIHtJU2VyaWVzUHJvdmlkZXJ9IHNlcmllc1Byb3ZpZGVyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW3VuaXF1ZUlkPVwiXCJdXHJcbiAgICAgKiBAbWVtYmVyb2YgRkZUU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHNpZ25hbDogSVNpZ25hbCwgbmFtZTogc3RyaW5nLCBjb2xvcjogc3RyaW5nLCBzZXJpZXNQcm92aWRlcjogSVNlcmllc1Byb3ZpZGVyLCB1bmlxdWVJZDogc3RyaW5nID0gXCJcIikge1xyXG4gICAgICAgIHN1cGVyKHNpZ25hbCwgbmFtZSwgY29sb3IsIEN1cnNvclR5cGUuZnJlcXVlbmN5RG9tYWluLCBzZXJpZXNQcm92aWRlciwgdW5pcXVlSWQpO1xyXG4gICAgICAgIHRoaXMucmF3UG9pbnRzID0gdGhpcy5zaWduYWwucmF3UG9pbnRzO1xyXG4gICAgICAgIHRoaXMudXBkYXRlVGltZXN0YW1wcygpO1xyXG4gICAgICAgIHRoaXMuZ2V0UmFuZ2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgRkZUU2VyaWVzIHdpdGggdGhlIGdpdmVuIHNldHRpbmdzXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtJU2V0dGluZ3N9IHNldHRpbmdzXHJcbiAgICAgKiBAcGFyYW0ge0lTZXJpZXNQcm92aWRlcn0gc2VyaWVzUHJvdmlkZXJcclxuICAgICAqIEByZXR1cm5zIHtGRlRTZXJpZXN9XHJcbiAgICAgKiBAbWVtYmVyb2YgRkZUU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBjcmVhdGUoc2V0dGluZ3M6IElTZXR0aW5ncywgc2VyaWVzUHJvdmlkZXI6IElTZXJpZXNQcm92aWRlcik6IEZGVFNlcmllc3tcclxuICAgICAgICAvLyBnZXQgaW5mbyBmcm9tIHBlcnNpc3RpbmdkYXRhXHJcbiAgICAgICAgbGV0IHNldHRpbmdzT2JqID0gU2V0dGluZ3MuY3JlYXRlKHNldHRpbmdzKTtcclxuICAgICAgICBsZXQgaWQ6IHN0cmluZyA9IHNldHRpbmdzT2JqLmdldFZhbHVlKFNldHRpbmdJZHMuU2VyaWVzSWQpO1xyXG4gICAgICAgIGxldCBuYW1lOiBzdHJpbmcgPSBzZXR0aW5nc09iai5nZXRWYWx1ZShTZXR0aW5nSWRzLlNlcmllc05hbWUpO1xyXG4gICAgICAgIGxldCBjb2xvcjogc3RyaW5nID0gc2V0dGluZ3NPYmouZ2V0VmFsdWUoU2V0dGluZ0lkcy5TZXJpZXNDb2xvcik7XHJcbiAgICAgICAgbGV0IHNpZ25hbERhdGE6IElTZXR0aW5nc3x1bmRlZmluZWQgPSBzZXR0aW5nc09iai5nZXRWYWx1ZShTZXR0aW5nSWRzLlNlcmllc1NpZ25hbERhdGEpO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgc2lnbmFsIHdpdGggdGhlIGdpdmVuIHNpZ25hbERhdGFcclxuICAgICAgICBsZXQgc2lnbmFsID0gdGhpcy5jcmVhdGVTaWduYWwoc2lnbmFsRGF0YSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gY3JlYXRlIHNlcmllcyB3aXRoIHRoZSBnaXZlbiBkYXRhXHJcbiAgICAgICAgbGV0IG5ld1lUU2VyaWVzID0gbmV3IEZGVFNlcmllcyhzaWduYWwsIG5hbWUsIGNvbG9yLCBzZXJpZXNQcm92aWRlciwgaWQpO1xyXG5cclxuICAgICAgICAvLyBzZXQgY2FsY3VsYXRpb24gaW5mb3JtYXRpb25zIGlmIGF2YWlsYWJsZVxyXG4gICAgICAgIGxldCBjYWxjdWxhdGlvbkRhdGFJbmZvOiBJU2V0dGluZ3N8dW5kZWZpbmVkID0gc2V0dGluZ3NPYmouZ2V0VmFsdWUoU2V0dGluZ0lkcy5TZXJpZXNDYWxjdWxhdGlvbkRhdGEpO1xyXG4gICAgICAgIGlmKGNhbGN1bGF0aW9uRGF0YUluZm8gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgbmV3WVRTZXJpZXMuY2FsY3VsYXRpb25EYXRhSW5mbyA9IG5ldyBDYWxjdWxhdGlvbkRhdGFJbmZvKCk7XHJcbiAgICAgICAgICAgIG5ld1lUU2VyaWVzLmNhbGN1bGF0aW9uRGF0YUluZm8uc2V0U2V0dGluZ3MoY2FsY3VsYXRpb25EYXRhSW5mbyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbmV3WVRTZXJpZXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBzZXR0aW5ncyBvZiB0aGUgRkZUU2VyaWVzXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0lTZXR0aW5nc31cclxuICAgICAqIEBtZW1iZXJvZiBGRlRTZXJpZXNcclxuICAgICAqL1xyXG4gICAgZ2V0U2V0dGluZ3MoKTogSVNldHRpbmdze1xyXG4gICAgICAgIGxldCBzZXR0aW5ncyA9IHN1cGVyLmdldFNldHRpbmdzKCk7XHJcbiAgICAgICAgc2V0dGluZ3MudHlwZSA9IFwiRkZUU2VyaWVzXCI7XHJcbiAgICAgICAgcmV0dXJuIHNldHRpbmdzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IG1heCBYIHZhbHVlIGZyb20gYSBzZXJpZVxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEByZXR1cm5zIHsobnVtYmVyIHwgdW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBGRlRTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldE1heFgoKTogbnVtYmVyIHwgdW5kZWZpbmVke1xyXG4gICAgICAgIGlmICh0aGlzLnJhd1BvaW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJhd1BvaW50c1t0aGlzLnJhd1BvaW50cy5sZW5ndGggLSAxXS54XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgbWluIFggdmFsdWUgZnJvbSBhIHNlcmllXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHJldHVybnMgeyhudW1iZXIgfCB1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIEZGVFNlcmllc1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0TWluWCgpOiBudW1iZXIgfCB1bmRlZmluZWR7XHJcbiAgICAgICAgaWYgKHRoaXMucmF3UG9pbnRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmF3UG9pbnRzWzBdLng7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWRcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIHRpbWVzdGFtcHMgYmFzZW9uIHRoZSBhdmFpbGFibGUgc2VyaWVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBGRlRTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHVwZGF0ZVRpbWVzdGFtcHMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucmF3UG9pbnRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fdGltZXN0YW1wcyA9IHRoaXMucmF3UG9pbnRzLm1hcCgocmF3UG9pbnQpID0+IHsgcmV0dXJuIHJhd1BvaW50Lng7IH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENsb25lcyB0aGlzIHNlcmllXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0Jhc2VTZXJpZXN9XHJcbiAgICAgKiBAbWVtYmVyb2YgRkZUU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjbG9uZSgpOiBCYXNlU2VyaWVze1xyXG4gICAgICAgIGxldCBzZXR0aW5ncyA9IHRoaXMuZ2V0U2V0dGluZ3MoKTtcclxuICAgICAgICAoc2V0dGluZ3MgYXMgU2V0dGluZ3MpLnNldFZhbHVlKFNldHRpbmdJZHMuU2VyaWVzSWQsIHRoaXMuX3Nlcmllc1Byb3ZpZGVyLmdldFVuaXF1ZUlkKCkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZXJpZXNQcm92aWRlci5jcmVhdGVTZXJpZShzZXR0aW5ncykhO1xyXG4gICAgfVxyXG59Il19