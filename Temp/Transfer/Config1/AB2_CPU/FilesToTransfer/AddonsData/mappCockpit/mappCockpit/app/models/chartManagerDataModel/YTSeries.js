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
define(["require", "exports", "../../widgets/chartWidget/chartExtensions/chartDataOptimizer", "../../common/math/mathX", "./seriesType", "../../widgets/common/states/cursorStates", "../../common/persistence/settings", "../common/calculatorProvider/calculationDataInfo", "./settingIds", "./baseSeries"], function (require, exports, chartDataOptimizer_1, mathX_1, seriesType_1, cursorStates_1, settings_1, calculationDataInfo_1, settingIds_1, baseSeries_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var YTSeries = /** @class */ (function (_super) {
        __extends(YTSeries, _super);
        /**
         * Creates an instance of YTSeries
         * @param {ISignal} signal
         * @param {string} name
         * @param {string} color
         * @param {ISeriesProvider} seriesProvider
         * @param {string} [uniqueId=""]
         * @memberof YTSeries
         */
        function YTSeries(signal, name, color, seriesProvider, uniqueId) {
            if (uniqueId === void 0) { uniqueId = ""; }
            var _this = _super.call(this, signal, name, color, cursorStates_1.CursorType.timeDomain, seriesProvider, uniqueId) || this;
            _this.type = seriesType_1.SeriesType.timeSeries;
            _this.rawPoints = _this.signal.rawPoints;
            _this.updateTimestamps();
            _this.getRange();
            _this.simplifySignal(_this.rawPoints);
            return _this;
        }
        /**
         * Creates an instance of YTSeries with the given settings
         *
         * @static
         * @param {ISettings} settings
         * @param {ISeriesProvider} seriesProvider
         * @returns {YTSeries}
         * @memberof YTSeries
         */
        YTSeries.create = function (settings, seriesProvider) {
            // get info from persistingdata
            var settingsObj = settings_1.Settings.create(settings);
            var id = settingsObj.getValue(settingIds_1.SettingIds.SeriesId);
            var name = settingsObj.getValue(settingIds_1.SettingIds.SeriesName);
            var color = settingsObj.getValue(settingIds_1.SettingIds.SeriesColor);
            var signalData = settingsObj.getValue(settingIds_1.SettingIds.SeriesSignalData);
            // create signal with the given signalData
            var signal = this.createSignal(signalData);
            // create series with the given data
            var newYTSeries = new YTSeries(signal, name, color, seriesProvider, id);
            // set calculation informations if available
            var calculationDataInfo = settingsObj.getValue(settingIds_1.SettingIds.SeriesCalculationData);
            if (calculationDataInfo != undefined) {
                newYTSeries.calculationDataInfo = new calculationDataInfo_1.CalculationDataInfo();
                newYTSeries.calculationDataInfo.setSettings(calculationDataInfo);
            }
            return newYTSeries;
        };
        /**
         *  Returns the settings of the YTSeries
         *
         * @returns {ISettings}
         * @memberof YTSeries
         */
        YTSeries.prototype.getSettings = function () {
            var settings = _super.prototype.getSettings.call(this);
            settings.type = "YTSeries";
            return settings;
        };
        /**
         * Simplifies series data points
         *
         * @memberof YTSeries
         */
        YTSeries.prototype.simplifySignal = function (seriesPoints) {
            // retrieve x and y values
            var xValues = seriesPoints.map(function (point) { return point.x; });
            var yValues = seriesPoints.map(function (point) { return point.y; });
            // get the min max values
            var xMin = mathX_1.MathX.min(xValues);
            var xMax = mathX_1.MathX.max(xValues);
            var yMin = mathX_1.MathX.min(yValues);
            var yMax = mathX_1.MathX.max(yValues);
            // create the simplified points. For yt they are just the min max edge points for initializing the chart area. 
            var reducedSeriesPoints = [];
            reducedSeriesPoints.push(new chartDataOptimizer_1.ChartPoint(0, true, xMin, yMin));
            reducedSeriesPoints.push(new chartDataOptimizer_1.ChartPoint(1, true, xMax, yMax));
            // update simplified series with min/max yt points
            this.data = reducedSeriesPoints;
        };
        /**
         * Get max X value from a serie
         *
         * @protected
         * @returns {(number | undefined)}
         * @memberof YTSeries
         */
        YTSeries.prototype.getMaxX = function () {
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
        YTSeries.prototype.getMinX = function () {
            if (this.rawPoints.length > 0) {
                return this.rawPoints[0].x;
            }
            return undefined;
        };
        /**
         * Updates the timestamps baseon the available series
         *
         * @private
         * @memberof YTSeries
         */
        YTSeries.prototype.updateTimestamps = function () {
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
        YTSeries.prototype.clone = function () {
            var settings = this.getSettings();
            settings.setValue(settingIds_1.SettingIds.SeriesId, this._seriesProvider.getUniqueId());
            return this._seriesProvider.createSerie(settings);
        };
        return YTSeries;
    }(baseSeries_1.BaseSeries));
    exports.YTSeries = YTSeries;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWVRTZXJpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvWVRTZXJpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQWNBO1FBQThCLDRCQUFVO1FBSXBDOzs7Ozs7OztXQVFHO1FBQ0gsa0JBQVksTUFBZSxFQUFFLElBQVksRUFBRSxLQUFhLEVBQUUsY0FBK0IsRUFBRSxRQUFxQjtZQUFyQix5QkFBQSxFQUFBLGFBQXFCO1lBQWhILFlBQ0ksa0JBQU0sTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUseUJBQVUsQ0FBQyxVQUFVLEVBQUUsY0FBYyxFQUFFLFFBQVEsQ0FBQyxTQUs5RTtZQWpCUSxVQUFJLEdBQUcsdUJBQVUsQ0FBQyxVQUFVLENBQUM7WUFhbEMsS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztZQUN2QyxLQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUN4QixLQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDaEIsS0FBSSxDQUFDLGNBQWMsQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7O1FBQ3hDLENBQUM7UUFFRDs7Ozs7Ozs7V0FRRztRQUNJLGVBQU0sR0FBYixVQUFjLFFBQW1CLEVBQUUsY0FBK0I7WUFDOUQsK0JBQStCO1lBQy9CLElBQUksV0FBVyxHQUFHLG1CQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzVDLElBQUksRUFBRSxHQUFXLFdBQVcsQ0FBQyxRQUFRLENBQUMsdUJBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMzRCxJQUFJLElBQUksR0FBVyxXQUFXLENBQUMsUUFBUSxDQUFDLHVCQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDL0QsSUFBSSxLQUFLLEdBQVcsV0FBVyxDQUFDLFFBQVEsQ0FBQyx1QkFB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QzthQUM5QjtZQUNELE9BQU8sU0FBUyxDQUFBO1FBQ3BCLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNPLG1DQUFnQixHQUExQjtZQUNJLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUMzQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQUMsUUFBUSxJQUFPLE9BQU8sUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQy9FO1FBQ0wsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0ksd0JBQUssR0FBWjtZQUNJLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNqQyxRQUFxQixDQUFDLFFBQVEsQ0FBQyx1QkFBVSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7WUFDekYsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUUsQ0FBQztRQUN2RCxDQUFDO1FBQ0wsZUFBQztJQUFELENBQUMsQUE5SUQsQ0FBOEIsdUJBQVUsR0E4SXZDO0lBOUlZLDRCQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVNpZ25hbCB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy9zaWduYWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVNlcmllc1Byb3ZpZGVyIH0gZnJvbSBcIi4uL2NvbW1vbi9zZXJpZXNQcm92aWRlci9zZXJpZXNQcm92aWRlckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJU2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3BlcnNpc3RlbmNlL2ludGVyZmFjZXMvc2V0dGluZ3NJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb21tb24vaW50ZXJmYWNlcy9wb2ludEludGVyZmFjZVwiXHJcblxyXG5pbXBvcnQgeyBDaGFydFBvaW50IH0gZnJvbSBcIi4uLy4uL3dpZGdldHMvY2hhcnRXaWRnZXQvY2hhcnRFeHRlbnNpb25zL2NoYXJ0RGF0YU9wdGltaXplclwiO1xyXG5pbXBvcnQgeyBNYXRoWCB9IGZyb20gXCIuLi8uLi9jb21tb24vbWF0aC9tYXRoWFwiO1xyXG5pbXBvcnQgeyBTZXJpZXNUeXBlIH0gZnJvbSBcIi4vc2VyaWVzVHlwZVwiO1xyXG5pbXBvcnQgeyBDdXJzb3JUeXBlIH0gZnJvbSBcIi4uLy4uL3dpZGdldHMvY29tbW9uL3N0YXRlcy9jdXJzb3JTdGF0ZXNcIjtcclxuaW1wb3J0IHsgU2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3BlcnNpc3RlbmNlL3NldHRpbmdzXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YUluZm8gfSBmcm9tIFwiLi4vY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdGlvbkRhdGFJbmZvXCI7XHJcbmltcG9ydCB7IFNldHRpbmdJZHMgfSBmcm9tIFwiLi9zZXR0aW5nSWRzXCI7XHJcbmltcG9ydCB7IEJhc2VTZXJpZXN9IGZyb20gXCIuL2Jhc2VTZXJpZXNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBZVFNlcmllcyBleHRlbmRzIEJhc2VTZXJpZXN7XHJcbiAgIFxyXG4gICAgcmVhZG9ubHkgdHlwZSA9IFNlcmllc1R5cGUudGltZVNlcmllcztcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFlUU2VyaWVzXHJcbiAgICAgKiBAcGFyYW0ge0lTaWduYWx9IHNpZ25hbFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb2xvclxyXG4gICAgICogQHBhcmFtIHtJU2VyaWVzUHJvdmlkZXJ9IHNlcmllc1Byb3ZpZGVyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW3VuaXF1ZUlkPVwiXCJdXHJcbiAgICAgKiBAbWVtYmVyb2YgWVRTZXJpZXNcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Ioc2lnbmFsOiBJU2lnbmFsLCBuYW1lOiBzdHJpbmcsIGNvbG9yOiBzdHJpbmcsIHNlcmllc1Byb3ZpZGVyOiBJU2VyaWVzUHJvdmlkZXIsIHVuaXF1ZUlkOiBzdHJpbmcgPSBcIlwiKSB7XHJcbiAgICAgICAgc3VwZXIoc2lnbmFsLCBuYW1lLCBjb2xvciwgQ3Vyc29yVHlwZS50aW1lRG9tYWluLCBzZXJpZXNQcm92aWRlciwgdW5pcXVlSWQpO1xyXG4gICAgICAgIHRoaXMucmF3UG9pbnRzID0gdGhpcy5zaWduYWwucmF3UG9pbnRzO1xyXG4gICAgICAgIHRoaXMudXBkYXRlVGltZXN0YW1wcygpO1xyXG4gICAgICAgIHRoaXMuZ2V0UmFuZ2UoKTtcclxuICAgICAgICB0aGlzLnNpbXBsaWZ5U2lnbmFsKHRoaXMucmF3UG9pbnRzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgWVRTZXJpZXMgd2l0aCB0aGUgZ2l2ZW4gc2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge0lTZXR0aW5nc30gc2V0dGluZ3NcclxuICAgICAqIEBwYXJhbSB7SVNlcmllc1Byb3ZpZGVyfSBzZXJpZXNQcm92aWRlclxyXG4gICAgICogQHJldHVybnMge1lUU2VyaWVzfVxyXG4gICAgICogQG1lbWJlcm9mIFlUU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBjcmVhdGUoc2V0dGluZ3M6IElTZXR0aW5ncywgc2VyaWVzUHJvdmlkZXI6IElTZXJpZXNQcm92aWRlcik6IFlUU2VyaWVze1xyXG4gICAgICAgIC8vIGdldCBpbmZvIGZyb20gcGVyc2lzdGluZ2RhdGFcclxuICAgICAgICBsZXQgc2V0dGluZ3NPYmogPSBTZXR0aW5ncy5jcmVhdGUoc2V0dGluZ3MpO1xyXG4gICAgICAgIGxldCBpZDogc3RyaW5nID0gc2V0dGluZ3NPYmouZ2V0VmFsdWUoU2V0dGluZ0lkcy5TZXJpZXNJZCk7XHJcbiAgICAgICAgbGV0IG5hbWU6IHN0cmluZyA9IHNldHRpbmdzT2JqLmdldFZhbHVlKFNldHRpbmdJZHMuU2VyaWVzTmFtZSk7XHJcbiAgICAgICAgbGV0IGNvbG9yOiBzdHJpbmcgPSBzZXR0aW5nc09iai5nZXRWYWx1ZShTZXR0aW5nSWRzLlNlcmllc0NvbG9yKTtcclxuICAgICAgICBsZXQgc2lnbmFsRGF0YTogSVNldHRpbmdzfHVuZGVmaW5lZCA9IHNldHRpbmdzT2JqLmdldFZhbHVlKFNldHRpbmdJZHMuU2VyaWVzU2lnbmFsRGF0YSk7XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSBzaWduYWwgd2l0aCB0aGUgZ2l2ZW4gc2lnbmFsRGF0YVxyXG4gICAgICAgIGxldCBzaWduYWwgPSB0aGlzLmNyZWF0ZVNpZ25hbChzaWduYWxEYXRhKTtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIHNlcmllcyB3aXRoIHRoZSBnaXZlbiBkYXRhXHJcbiAgICAgICAgbGV0IG5ld1lUU2VyaWVzID0gbmV3IFlUU2VyaWVzKHNpZ25hbCwgbmFtZSwgY29sb3IsIHNlcmllc1Byb3ZpZGVyLCBpZCk7XHJcblxyXG4gICAgICAgIC8vIHNldCBjYWxjdWxhdGlvbiBpbmZvcm1hdGlvbnMgaWYgYXZhaWxhYmxlXHJcbiAgICAgICAgbGV0IGNhbGN1bGF0aW9uRGF0YUluZm86IElTZXR0aW5nc3x1bmRlZmluZWQgPSBzZXR0aW5nc09iai5nZXRWYWx1ZShTZXR0aW5nSWRzLlNlcmllc0NhbGN1bGF0aW9uRGF0YSk7XHJcbiAgICAgICAgaWYoY2FsY3VsYXRpb25EYXRhSW5mbyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBuZXdZVFNlcmllcy5jYWxjdWxhdGlvbkRhdGFJbmZvID0gbmV3IENhbGN1bGF0aW9uRGF0YUluZm8oKTtcclxuICAgICAgICAgICAgbmV3WVRTZXJpZXMuY2FsY3VsYXRpb25EYXRhSW5mby5zZXRTZXR0aW5ncyhjYWxjdWxhdGlvbkRhdGFJbmZvKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ld1lUU2VyaWVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogIFJldHVybnMgdGhlIHNldHRpbmdzIG9mIHRoZSBZVFNlcmllc1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtJU2V0dGluZ3N9XHJcbiAgICAgKiBAbWVtYmVyb2YgWVRTZXJpZXNcclxuICAgICAqL1xyXG4gICAgZ2V0U2V0dGluZ3MoKTogSVNldHRpbmdze1xyXG4gICAgICAgIGxldCBzZXR0aW5ncyA9IHN1cGVyLmdldFNldHRpbmdzKCk7XHJcbiAgICAgICAgc2V0dGluZ3MudHlwZSA9IFwiWVRTZXJpZXNcIjtcclxuICAgICAgICByZXR1cm4gc2V0dGluZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTaW1wbGlmaWVzIHNlcmllcyBkYXRhIHBvaW50c1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBZVFNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2ltcGxpZnlTaWduYWwoc2VyaWVzUG9pbnRzOklQb2ludFtdKSB7XHJcblxyXG4gICAgICAgIC8vIHJldHJpZXZlIHggYW5kIHkgdmFsdWVzXHJcbiAgICAgICAgY29uc3QgeFZhbHVlcyA9IHNlcmllc1BvaW50cy5tYXAoKHBvaW50KT0+eyByZXR1cm4gcG9pbnQueDt9KTtcclxuICAgICAgICBsZXQgeVZhbHVlcyA9IHNlcmllc1BvaW50cy5tYXAoKHBvaW50KT0+eyByZXR1cm4gcG9pbnQueTt9KTtcclxuXHJcbiAgICAgICAgLy8gZ2V0IHRoZSBtaW4gbWF4IHZhbHVlc1xyXG4gICAgICAgIGNvbnN0IHhNaW4gPSBNYXRoWC5taW4oeFZhbHVlcyk7XHJcbiAgICAgICAgY29uc3QgeE1heCA9IE1hdGhYLm1heCh4VmFsdWVzKTtcclxuICAgICAgICBjb25zdCB5TWluID0gTWF0aFgubWluKHlWYWx1ZXMpO1xyXG4gICAgICAgIGNvbnN0IHlNYXggPSBNYXRoWC5tYXgoeVZhbHVlcyk7XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgc2ltcGxpZmllZCBwb2ludHMuIEZvciB5dCB0aGV5IGFyZSBqdXN0IHRoZSBtaW4gbWF4IGVkZ2UgcG9pbnRzIGZvciBpbml0aWFsaXppbmcgdGhlIGNoYXJ0IGFyZWEuIFxyXG4gICAgICAgIGxldCByZWR1Y2VkU2VyaWVzUG9pbnRzOkNoYXJ0UG9pbnRbXSA9IFtdO1xyXG4gICAgICAgIHJlZHVjZWRTZXJpZXNQb2ludHMucHVzaChuZXcgQ2hhcnRQb2ludCgwLHRydWUseE1pbix5TWluKSk7XHJcbiAgICAgICAgcmVkdWNlZFNlcmllc1BvaW50cy5wdXNoKG5ldyBDaGFydFBvaW50KDEsdHJ1ZSx4TWF4LHlNYXgpKTtcclxuXHJcbiAgICAgICAgLy8gdXBkYXRlIHNpbXBsaWZpZWQgc2VyaWVzIHdpdGggbWluL21heCB5dCBwb2ludHNcclxuICAgICAgICB0aGlzLmRhdGEgPSAgcmVkdWNlZFNlcmllc1BvaW50cztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBtYXggWCB2YWx1ZSBmcm9tIGEgc2VyaWVcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcmV0dXJucyB7KG51bWJlciB8IHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgWVRTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldE1heFgoKTogbnVtYmVyIHwgdW5kZWZpbmVke1xyXG4gICAgICAgIGlmICh0aGlzLnJhd1BvaW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJhd1BvaW50c1t0aGlzLnJhd1BvaW50cy5sZW5ndGggLSAxXS54XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgbWluIFggdmFsdWUgZnJvbSBhIHNlcmllXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHJldHVybnMgeyhudW1iZXIgfCB1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIFlUU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXRNaW5YKCk6IG51bWJlciB8IHVuZGVmaW5lZHtcclxuICAgICAgICBpZiAodGhpcy5yYXdQb2ludHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yYXdQb2ludHNbMF0ueDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIHRpbWVzdGFtcHMgYmFzZW9uIHRoZSBhdmFpbGFibGUgc2VyaWVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBZVFNlcmllc1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgdXBkYXRlVGltZXN0YW1wcygpIHtcclxuICAgICAgICBpZiAodGhpcy5yYXdQb2ludHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl90aW1lc3RhbXBzID0gdGhpcy5yYXdQb2ludHMubWFwKChyYXdQb2ludCkgPT4geyByZXR1cm4gcmF3UG9pbnQueDsgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2xvbmVzIHRoaXMgc2VyaWVcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7QmFzZVNlcmllc31cclxuICAgICAqIEBtZW1iZXJvZiBZVFNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2xvbmUoKTogQmFzZVNlcmllc3tcclxuICAgICAgICBsZXQgc2V0dGluZ3MgPSB0aGlzLmdldFNldHRpbmdzKCk7XHJcbiAgICAgICAgKHNldHRpbmdzIGFzIFNldHRpbmdzKS5zZXRWYWx1ZShTZXR0aW5nSWRzLlNlcmllc0lkLCB0aGlzLl9zZXJpZXNQcm92aWRlci5nZXRVbmlxdWVJZCgpKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VyaWVzUHJvdmlkZXIuY3JlYXRlU2VyaWUoc2V0dGluZ3MpITtcclxuICAgIH1cclxufSJdfQ==