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
define(["require", "exports", "../../common/math/lineReductionAlgorithm/rdp", "../../common/math/mathX", "../../widgets/chartWidget/chartExtensions/chartDataOptimizer", "./seriesType", "../../widgets/common/states/cursorStates", "../../common/persistence/settings", "../common/calculatorProvider/calculationDataInfo", "./settingIds", "./baseSeries"], function (require, exports, rdp_1, mathX_1, chartDataOptimizer_1, seriesType_1, cursorStates_1, settings_1, calculationDataInfo_1, settingIds_1, baseSeries_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var XYSeries = /** @class */ (function (_super) {
        __extends(XYSeries, _super);
        /**
         * Creates an instance of XYSeries
         * @param {ISignal} signal
         * @param {string} name
         * @param {string} color
         * @param {ISeriesProvider} seriesProvider
         * @param {string} [uniqueId=""]
         * @memberof XYSeries
         */
        function XYSeries(signal, name, color, seriesProvider, uniqueId) {
            if (uniqueId === void 0) { uniqueId = ""; }
            var _this = _super.call(this, signal, name, color, cursorStates_1.CursorType.timeDomain, seriesProvider, uniqueId) || this;
            _this.type = seriesType_1.SeriesType.xySeries;
            _this.rawPoints = _this.signal.rawPoints;
            _this.updateTimestamps();
            _this.getRange();
            _this.simplifySignal(_this.rawPoints);
            return _this;
        }
        /**
         * Creates an instance of XYSeries with the given settings
         *
         * @static
         * @param {ISettings} settings
         * @param {ISeriesProvider} seriesProvider
         * @returns {XYSeries}
         * @memberof XYSeries
         */
        XYSeries.create = function (settings, seriesProvider) {
            // get info from persistingdata
            var settingsObj = settings_1.Settings.create(settings);
            var id = settingsObj.getValue(settingIds_1.SettingIds.SeriesId);
            var name = settingsObj.getValue(settingIds_1.SettingIds.SeriesName);
            var color = settingsObj.getValue(settingIds_1.SettingIds.SeriesColor);
            var signalData = settingsObj.getValue(settingIds_1.SettingIds.SeriesSignalData);
            // create signal with the given signalData
            var signal = this.createSignal(signalData);
            // create series with the given data
            var newXYSeries = new XYSeries(signal, name, color, seriesProvider, id);
            // set calculation informations if available
            var calculationDataInfo = settingsObj.getValue(settingIds_1.SettingIds.SeriesCalculationData);
            if (calculationDataInfo != undefined) {
                newXYSeries.calculationDataInfo = new calculationDataInfo_1.CalculationDataInfo();
                newXYSeries.calculationDataInfo.setSettings(calculationDataInfo);
            }
            return newXYSeries;
        };
        /**
         * Returns the settings of the XYSeries
         *
         * @returns {ISettings}
         * @memberof XYSeries
         */
        XYSeries.prototype.getSettings = function () {
            var settings = _super.prototype.getSettings.call(this);
            settings.type = "XYSeries";
            return settings;
        };
        /**
         * Calculates an initial line simplification
         *
         * @param {IPoint[]} seriesPoints
         * @memberof XYSeries
         */
        XYSeries.prototype.simplifySignal = function (seriesPoints) {
            var lineOptimization = new rdp_1.RDP();
            var xValues = seriesPoints.map(function (point) { return point.x; });
            var yValues = seriesPoints.map(function (point) { return point.y; });
            var xMin = mathX_1.MathX.min(xValues);
            var xMax = mathX_1.MathX.max(xValues);
            var yMin = mathX_1.MathX.min(yValues);
            var yMax = mathX_1.MathX.max(yValues);
            // calculate series ranges
            var xRange = xMax - xMin;
            var yRange = yMax - yMin;
            // calculate unit per pixel ratios
            var xRatio = xRange / 10000;
            var yRatio = yRange / 10000;
            // the units/pixel ratio must not be 0 
            xRatio = xRatio > 0 ? xRatio : Number.MIN_VALUE;
            yRatio = yRatio > 0 ? yRatio : Number.MIN_VALUE;
            // set required simplification precision
            var precision = 1;
            // create chart points from the raw points
            var rawPoints = seriesPoints.map(function (point, i) { return new chartDataOptimizer_1.ChartPoint(i, true, point.x, point.y); });
            // calculate the reduced point set
            var reducedSeriesPoints = lineOptimization.simplify(rawPoints, precision, xRatio, yRatio, true);
            // update simplified series view points and reduction ratios
            this.data = reducedSeriesPoints;
            this.data.pixelRatioX = xRatio;
            this.data.pixelRatioY = yRatio;
        };
        /**
         * Get max X value from a serie
         *
         * @protected
         * @returns {(number | undefined)}
         * @memberof XYSeries
         */
        XYSeries.prototype.getMaxX = function () {
            var maxX;
            if (this.rawPoints.length > 0) {
                for (var i = 0; i < this.rawPoints.length; i++) {
                    if (maxX == undefined || this.rawPoints[i].x > maxX) {
                        maxX = this.rawPoints[i].x;
                    }
                }
            }
            return maxX;
        };
        /**
         * Get min X value from a serie
         *
         * @protected
         * @returns {(number | undefined)}
         * @memberof XYSeries
         */
        XYSeries.prototype.getMinX = function () {
            var minX;
            if (this.rawPoints.length > 0) {
                for (var i = 0; i < this.rawPoints.length; i++) {
                    if (minX == undefined || this.rawPoints[i].x < minX) {
                        minX = this.rawPoints[i].x;
                    }
                }
            }
            return minX;
        };
        /**
         * Clones this serie
         *
         * @returns {BaseSeries}
         * @memberof XYSeries
         */
        XYSeries.prototype.clone = function () {
            var settings = this.getSettings();
            settings.setValue(settingIds_1.SettingIds.SeriesId, this._seriesProvider.getUniqueId());
            return this._seriesProvider.createSerie(settings);
        };
        /**
         * Updates the timestamps baseon the available series
         *
         * @private
         * @memberof XYSeries
         */
        XYSeries.prototype.updateTimestamps = function () {
            if (this.calculationDataInfo != undefined) {
                if (this.calculationDataInfo.inputData.length > 0) {
                    // we use the x values from the input 0 as the timestamps source
                    this._timestamps = this.calculationDataInfo.inputData[0].getData().map(function (inputDataPoint) { return inputDataPoint.x; });
                }
            }
        };
        /**
         * Called whenever the seris data has changed
         *
         * @private
         * @param {IPoint[]} data
         * @memberof XYSeries
         */
        XYSeries.prototype.onSerieDataChanged = function (seriesData) {
            if (seriesData && seriesData.length > 0) {
                this.simplifySignal(seriesData);
            }
        };
        return XYSeries;
    }(baseSeries_1.BaseSeries));
    exports.XYSeries = XYSeries;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWFlTZXJpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvWFlTZXJpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQWVBO1FBQThCLDRCQUFVO1FBSXBDOzs7Ozs7OztXQVFHO1FBQ0gsa0JBQVksTUFBZSxFQUFFLElBQVksRUFBRSxLQUFhLEVBQUUsY0FBK0IsRUFBRSxRQUFxQjtZQUFyQix5QkFBQSxFQUFBLGFBQXFCO1lBQWhILFlBQ0ksa0JBQU0sTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUseUJBQVUsQ0FBQyxVQUFVLEVBQUUsY0FBYyxFQUFFLFFBQVEsQ0FBQyxTQUs5RTtZQWpCRCxVQUFJLEdBQUcsdUJBQVUsQ0FBQyxRQUFRLENBQUM7WUFhdkIsS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztZQUN2QyxLQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUN4QixLQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDaEIsS0FBSSxDQUFDLGNBQWMsQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7O1FBQ3hDLENBQUM7UUFFRDs7Ozs7Ozs7V0FRRztRQUNJLGVBQU0sR0FBYixVQUFjLFFBQW1CLEVBQUUsY0FBK0I7WUFDOUQsK0JBQStCO1lBQy9CLElBQUksV0FBVyxHQUFHLG1CQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzVDLElBQUksRUFBRSxHQUFXLFdBQVcsQ0FBQyxRQUFRLENBQUMsdUJBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMzRCxJQUFJLElBQUksR0FBVyxXQUFXLENBQUMsUUFBUSxDQUFDLHVCQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDL0QsSUFBSSxLQUFLLEdBQVcsV0FBVyxDQUFDLFFBQVEsQ0FBQyx1QkFB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LDRCQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVNpZ25hbCB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy9zaWduYWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVNlcmllc1Byb3ZpZGVyIH0gZnJvbSBcIi4uL2NvbW1vbi9zZXJpZXNQcm92aWRlci9zZXJpZXNQcm92aWRlckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJU2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3BlcnNpc3RlbmNlL2ludGVyZmFjZXMvc2V0dGluZ3NJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL3BvaW50SW50ZXJmYWNlXCI7XHJcblxyXG5pbXBvcnQgeyBSRFAgfSBmcm9tIFwiLi4vLi4vY29tbW9uL21hdGgvbGluZVJlZHVjdGlvbkFsZ29yaXRobS9yZHBcIjtcclxuaW1wb3J0IHsgTWF0aFggfSBmcm9tIFwiLi4vLi4vY29tbW9uL21hdGgvbWF0aFhcIjtcclxuaW1wb3J0IHsgQ2hhcnRQb2ludCB9IGZyb20gXCIuLi8uLi93aWRnZXRzL2NoYXJ0V2lkZ2V0L2NoYXJ0RXh0ZW5zaW9ucy9jaGFydERhdGFPcHRpbWl6ZXJcIjtcclxuaW1wb3J0IHsgU2VyaWVzVHlwZSB9IGZyb20gXCIuL3Nlcmllc1R5cGVcIjtcclxuaW1wb3J0IHsgQ3Vyc29yVHlwZSB9IGZyb20gXCIuLi8uLi93aWRnZXRzL2NvbW1vbi9zdGF0ZXMvY3Vyc29yU3RhdGVzXCI7XHJcbmltcG9ydCB7IFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFJbmZvIH0gZnJvbSBcIi4uL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRpb25EYXRhSW5mb1wiO1xyXG5pbXBvcnQgeyBTZXR0aW5nSWRzIH0gZnJvbSBcIi4vc2V0dGluZ0lkc1wiO1xyXG5pbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4vYmFzZVNlcmllc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFhZU2VyaWVzIGV4dGVuZHMgQmFzZVNlcmllc3tcclxuICAgIFxyXG4gICAgdHlwZSA9IFNlcmllc1R5cGUueHlTZXJpZXM7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFhZU2VyaWVzXHJcbiAgICAgKiBAcGFyYW0ge0lTaWduYWx9IHNpZ25hbFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb2xvclxyXG4gICAgICogQHBhcmFtIHtJU2VyaWVzUHJvdmlkZXJ9IHNlcmllc1Byb3ZpZGVyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW3VuaXF1ZUlkPVwiXCJdXHJcbiAgICAgKiBAbWVtYmVyb2YgWFlTZXJpZXNcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Ioc2lnbmFsOiBJU2lnbmFsLCBuYW1lOiBzdHJpbmcsIGNvbG9yOiBzdHJpbmcsIHNlcmllc1Byb3ZpZGVyOiBJU2VyaWVzUHJvdmlkZXIsIHVuaXF1ZUlkOiBzdHJpbmcgPSBcIlwiKSB7XHJcbiAgICAgICAgc3VwZXIoc2lnbmFsLCBuYW1lLCBjb2xvciwgQ3Vyc29yVHlwZS50aW1lRG9tYWluLCBzZXJpZXNQcm92aWRlciwgdW5pcXVlSWQpO1xyXG4gICAgICAgIHRoaXMucmF3UG9pbnRzID0gdGhpcy5zaWduYWwucmF3UG9pbnRzO1xyXG4gICAgICAgIHRoaXMudXBkYXRlVGltZXN0YW1wcygpO1xyXG4gICAgICAgIHRoaXMuZ2V0UmFuZ2UoKTtcclxuICAgICAgICB0aGlzLnNpbXBsaWZ5U2lnbmFsKHRoaXMucmF3UG9pbnRzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgWFlTZXJpZXMgd2l0aCB0aGUgZ2l2ZW4gc2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge0lTZXR0aW5nc30gc2V0dGluZ3NcclxuICAgICAqIEBwYXJhbSB7SVNlcmllc1Byb3ZpZGVyfSBzZXJpZXNQcm92aWRlclxyXG4gICAgICogQHJldHVybnMge1hZU2VyaWVzfVxyXG4gICAgICogQG1lbWJlcm9mIFhZU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBjcmVhdGUoc2V0dGluZ3M6IElTZXR0aW5ncywgc2VyaWVzUHJvdmlkZXI6IElTZXJpZXNQcm92aWRlcik6IFhZU2VyaWVze1xyXG4gICAgICAgIC8vIGdldCBpbmZvIGZyb20gcGVyc2lzdGluZ2RhdGFcclxuICAgICAgICBsZXQgc2V0dGluZ3NPYmogPSBTZXR0aW5ncy5jcmVhdGUoc2V0dGluZ3MpO1xyXG4gICAgICAgIGxldCBpZDogc3RyaW5nID0gc2V0dGluZ3NPYmouZ2V0VmFsdWUoU2V0dGluZ0lkcy5TZXJpZXNJZCk7XHJcbiAgICAgICAgbGV0IG5hbWU6IHN0cmluZyA9IHNldHRpbmdzT2JqLmdldFZhbHVlKFNldHRpbmdJZHMuU2VyaWVzTmFtZSk7XHJcbiAgICAgICAgbGV0IGNvbG9yOiBzdHJpbmcgPSBzZXR0aW5nc09iai5nZXRWYWx1ZShTZXR0aW5nSWRzLlNlcmllc0NvbG9yKTtcclxuICAgICAgICBsZXQgc2lnbmFsRGF0YTogSVNldHRpbmdzfHVuZGVmaW5lZCA9IHNldHRpbmdzT2JqLmdldFZhbHVlKFNldHRpbmdJZHMuU2VyaWVzU2lnbmFsRGF0YSk7XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSBzaWduYWwgd2l0aCB0aGUgZ2l2ZW4gc2lnbmFsRGF0YVxyXG4gICAgICAgIGxldCBzaWduYWwgPSB0aGlzLmNyZWF0ZVNpZ25hbChzaWduYWxEYXRhKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBjcmVhdGUgc2VyaWVzIHdpdGggdGhlIGdpdmVuIGRhdGFcclxuICAgICAgICBsZXQgbmV3WFlTZXJpZXMgPSBuZXcgWFlTZXJpZXMoc2lnbmFsLCBuYW1lLCBjb2xvciwgc2VyaWVzUHJvdmlkZXIsIGlkKTtcclxuXHJcbiAgICAgICAgLy8gc2V0IGNhbGN1bGF0aW9uIGluZm9ybWF0aW9ucyBpZiBhdmFpbGFibGVcclxuICAgICAgICBsZXQgY2FsY3VsYXRpb25EYXRhSW5mbzogSVNldHRpbmdzfHVuZGVmaW5lZCA9IHNldHRpbmdzT2JqLmdldFZhbHVlKFNldHRpbmdJZHMuU2VyaWVzQ2FsY3VsYXRpb25EYXRhKTtcclxuICAgICAgICBpZihjYWxjdWxhdGlvbkRhdGFJbmZvICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIG5ld1hZU2VyaWVzLmNhbGN1bGF0aW9uRGF0YUluZm8gPSBuZXcgQ2FsY3VsYXRpb25EYXRhSW5mbygpO1xyXG4gICAgICAgICAgICBuZXdYWVNlcmllcy5jYWxjdWxhdGlvbkRhdGFJbmZvLnNldFNldHRpbmdzKGNhbGN1bGF0aW9uRGF0YUluZm8pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3WFlTZXJpZXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBzZXR0aW5ncyBvZiB0aGUgWFlTZXJpZXNcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7SVNldHRpbmdzfVxyXG4gICAgICogQG1lbWJlcm9mIFhZU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIGdldFNldHRpbmdzKCk6IElTZXR0aW5nc3tcclxuICAgICAgICBsZXQgc2V0dGluZ3MgPSBzdXBlci5nZXRTZXR0aW5ncygpO1xyXG4gICAgICAgIHNldHRpbmdzLnR5cGUgPSBcIlhZU2VyaWVzXCI7XHJcbiAgICAgICAgcmV0dXJuIHNldHRpbmdzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsY3VsYXRlcyBhbiBpbml0aWFsIGxpbmUgc2ltcGxpZmljYXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lQb2ludFtdfSBzZXJpZXNQb2ludHNcclxuICAgICAqIEBtZW1iZXJvZiBYWVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2ltcGxpZnlTaWduYWwoc2VyaWVzUG9pbnRzOklQb2ludFtdKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IGxpbmVPcHRpbWl6YXRpb24gPSBuZXcgUkRQKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IHhWYWx1ZXMgPSBzZXJpZXNQb2ludHMubWFwKChwb2ludCk9PnsgcmV0dXJuIHBvaW50Lng7fSk7XHJcbiAgICAgICAgbGV0IHlWYWx1ZXMgPSBzZXJpZXNQb2ludHMubWFwKChwb2ludCk9PnsgcmV0dXJuIHBvaW50Lnk7fSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHhNaW4gPSBNYXRoWC5taW4oeFZhbHVlcyk7XHJcbiAgICAgICAgY29uc3QgeE1heCA9IE1hdGhYLm1heCh4VmFsdWVzKTtcclxuICAgICAgICBjb25zdCB5TWluID0gTWF0aFgubWluKHlWYWx1ZXMpO1xyXG4gICAgICAgIGNvbnN0IHlNYXggPSBNYXRoWC5tYXgoeVZhbHVlcyk7XHJcblxyXG4gICAgICAgIC8vIGNhbGN1bGF0ZSBzZXJpZXMgcmFuZ2VzXHJcbiAgICAgICAgY29uc3QgeFJhbmdlID0geE1heC14TWluO1xyXG4gICAgICAgIGNvbnN0IHlSYW5nZSA9IHlNYXgteU1pbjtcclxuICAgICAgICAvLyBjYWxjdWxhdGUgdW5pdCBwZXIgcGl4ZWwgcmF0aW9zXHJcbiAgICAgICAgbGV0IHhSYXRpbyA9IHhSYW5nZS8xMDAwMCA7ICAgXHJcbiAgICAgICAgbGV0IHlSYXRpbyA9IHlSYW5nZS8xMDAwMCA7ICBcclxuXHJcbiAgICAgICAgLy8gdGhlIHVuaXRzL3BpeGVsIHJhdGlvIG11c3Qgbm90IGJlIDAgXHJcbiAgICAgICAgeFJhdGlvID0geFJhdGlvID4gMCA/IHhSYXRpbzogTnVtYmVyLk1JTl9WQUxVRSA7ICAgXHJcbiAgICAgICAgeVJhdGlvID0geVJhdGlvID4gMCA/IHlSYXRpbzogTnVtYmVyLk1JTl9WQUxVRSA7ICBcclxuICAgICAgICAvLyBzZXQgcmVxdWlyZWQgc2ltcGxpZmljYXRpb24gcHJlY2lzaW9uXHJcbiAgICAgICAgY29uc3QgcHJlY2lzaW9uID0gMTtcclxuIFxyXG4gICAgICAgIC8vIGNyZWF0ZSBjaGFydCBwb2ludHMgZnJvbSB0aGUgcmF3IHBvaW50c1xyXG4gICAgICAgIGxldCByYXdQb2ludHMgPSAgc2VyaWVzUG9pbnRzLm1hcCgocG9pbnQsaSk9PnsgcmV0dXJuIG5ldyBDaGFydFBvaW50KGksdHJ1ZSwgcG9pbnQueCwgcG9pbnQueSk7IH0pO1xyXG4gICAgICAgIC8vIGNhbGN1bGF0ZSB0aGUgcmVkdWNlZCBwb2ludCBzZXRcclxuICAgICAgICBsZXQgcmVkdWNlZFNlcmllc1BvaW50cyA9IGxpbmVPcHRpbWl6YXRpb24uc2ltcGxpZnkocmF3UG9pbnRzLHByZWNpc2lvbiwgeFJhdGlvLHlSYXRpbywgdHJ1ZSk7XHJcblxyXG4gICAgICAgIC8vIHVwZGF0ZSBzaW1wbGlmaWVkIHNlcmllcyB2aWV3IHBvaW50cyBhbmQgcmVkdWN0aW9uIHJhdGlvc1xyXG4gICAgICAgIHRoaXMuZGF0YSA9ICByZWR1Y2VkU2VyaWVzUG9pbnRzO1xyXG4gICAgICAgICg8YW55PnRoaXMuZGF0YSkucGl4ZWxSYXRpb1ggPSB4UmF0aW87XHJcbiAgICAgICAgKDxhbnk+dGhpcy5kYXRhKS5waXhlbFJhdGlvWSA9IHlSYXRpbztcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgbWF4IFggdmFsdWUgZnJvbSBhIHNlcmllXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHJldHVybnMgeyhudW1iZXIgfCB1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIFhZU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXRNYXhYKCk6IG51bWJlciB8IHVuZGVmaW5lZHtcclxuICAgICAgICBsZXQgbWF4WDtcclxuICAgICAgICBpZiAodGhpcy5yYXdQb2ludHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5yYXdQb2ludHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgaWYobWF4WCA9PSB1bmRlZmluZWQgfHwgdGhpcy5yYXdQb2ludHNbaV0ueCA+IG1heFggKXtcclxuICAgICAgICAgICAgICAgICAgICBtYXhYID0gdGhpcy5yYXdQb2ludHNbaV0ueFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtYXhYO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IG1pbiBYIHZhbHVlIGZyb20gYSBzZXJpZVxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEByZXR1cm5zIHsobnVtYmVyIHwgdW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBYWVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0TWluWCgpOiBudW1iZXIgfCB1bmRlZmluZWR7XHJcbiAgICAgICAgbGV0IG1pblg7XHJcbiAgICAgICAgaWYgKHRoaXMucmF3UG9pbnRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMucmF3UG9pbnRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGlmKG1pblggPT0gdW5kZWZpbmVkIHx8IHRoaXMucmF3UG9pbnRzW2ldLnggPCBtaW5YICl7XHJcbiAgICAgICAgICAgICAgICAgICAgbWluWCA9IHRoaXMucmF3UG9pbnRzW2ldLnhcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWluWDtcclxuICAgIH1cclxuXHJcbiAgICAvKiogXHJcbiAgICAgKiBDbG9uZXMgdGhpcyBzZXJpZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtCYXNlU2VyaWVzfVxyXG4gICAgICogQG1lbWJlcm9mIFhZU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjbG9uZSgpOiBCYXNlU2VyaWVze1xyXG4gICAgICAgIGxldCBzZXR0aW5ncyA9IHRoaXMuZ2V0U2V0dGluZ3MoKTtcclxuICAgICAgICAoc2V0dGluZ3MgYXMgU2V0dGluZ3MpLnNldFZhbHVlKFNldHRpbmdJZHMuU2VyaWVzSWQsIHRoaXMuX3Nlcmllc1Byb3ZpZGVyLmdldFVuaXF1ZUlkKCkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZXJpZXNQcm92aWRlci5jcmVhdGVTZXJpZShzZXR0aW5ncykhO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgdGltZXN0YW1wcyBiYXNlb24gdGhlIGF2YWlsYWJsZSBzZXJpZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFhZU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB1cGRhdGVUaW1lc3RhbXBzKCkge1xyXG4gICAgICAgIGlmKHRoaXMuY2FsY3VsYXRpb25EYXRhSW5mbyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jYWxjdWxhdGlvbkRhdGFJbmZvLmlucHV0RGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyB3ZSB1c2UgdGhlIHggdmFsdWVzIGZyb20gdGhlIGlucHV0IDAgYXMgdGhlIHRpbWVzdGFtcHMgc291cmNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLl90aW1lc3RhbXBzID0gdGhpcy5jYWxjdWxhdGlvbkRhdGFJbmZvLmlucHV0RGF0YVswXS5nZXREYXRhKCkubWFwKChpbnB1dERhdGFQb2ludCk9PnsgcmV0dXJuIGlucHV0RGF0YVBvaW50Lnh9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgd2hlbmV2ZXIgdGhlIHNlcmlzIGRhdGEgaGFzIGNoYW5nZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtJUG9pbnRbXX0gZGF0YVxyXG4gICAgICogQG1lbWJlcm9mIFhZU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBvblNlcmllRGF0YUNoYW5nZWQoIHNlcmllc0RhdGE6IElQb2ludFtdKSB7XHJcbiAgICAgICAgaWYoc2VyaWVzRGF0YSAmJiBzZXJpZXNEYXRhLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICB0aGlzLnNpbXBsaWZ5U2lnbmFsKHNlcmllc0RhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxufSJdfQ==