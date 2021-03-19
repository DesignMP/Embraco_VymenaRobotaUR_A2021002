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
define(["require", "exports", "./baseSeries", "../../common/math/lineReductionAlgorithm/rdp", "../../common/math/mathX", "../../widgets/chartWidget/chartExtensions/chartDataOptimizer", "./seriesType", "../../widgets/common/states/cursorStates", "../../common/persistence/settings", "../common/calculatorProvider/calculationDataInfo", "./baseSeriesSettingIds"], function (require, exports, baseSeries_1, rdp_1, mathX_1, chartDataOptimizer_1, seriesType_1, cursorStates_1, settings_1, calculationDataInfo_1, baseSeriesSettingIds_1) {
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
            var id = settingsObj.getValue(baseSeriesSettingIds_1.SettingIds.Id);
            var name = settingsObj.getValue(baseSeriesSettingIds_1.SettingIds.Name);
            var color = settingsObj.getValue(baseSeriesSettingIds_1.SettingIds.Color);
            var signalData = settingsObj.getValue(baseSeriesSettingIds_1.SettingIds.SignalData);
            // create signal with the given signalData
            var signal = this.createSignal(signalData);
            // create series with the given data
            var newYTSeries = new XYSeries(signal, name, color, seriesProvider, id);
            // set calculation informations if available
            var calculationDataInfo = settingsObj.getValue(baseSeriesSettingIds_1.SettingIds.CalculationData);
            if (calculationDataInfo != undefined) {
                newYTSeries.calculationDataInfo = new calculationDataInfo_1.CalculationDataInfo();
                newYTSeries.calculationDataInfo.setSettings(calculationDataInfo);
            }
            return newYTSeries;
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
            return new XYSeries(this.signal.clone(), this.name, this.color, this._seriesProvider);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWFlTZXJpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvWFlTZXJpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQWNBO1FBQThCLDRCQUFVO1FBSXBDOzs7Ozs7OztXQVFHO1FBQ0gsa0JBQVksTUFBZSxFQUFFLElBQVksRUFBRSxLQUFhLEVBQUUsY0FBK0IsRUFBRSxRQUFxQjtZQUFyQix5QkFBQSxFQUFBLGFBQXFCO1lBQWhILFlBQ0ksa0JBQU0sTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUseUJBQVUsQ0FBQyxVQUFVLEVBQUUsY0FBYyxFQUFFLFFBQVEsQ0FBQyxTQUs5RTtZQWpCRCxVQUFJLEdBQUcsdUJBQVUsQ0FBQyxRQUFRLENBQUM7WUFhdkIsS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztZQUN2QyxLQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUN4QixLQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDaEIsS0FBSSxDQUFDLGNBQWMsQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7O1FBQ3hDLENBQUM7UUFFRDs7Ozs7Ozs7V0FRRztRQUNJLGVBQU0sR0FBYixVQUFjLFFBQW1CLEVBQUUsY0FBK0I7WUFDOUQsK0JBQStCO1lBQy9CLElBQUksV0FBVyxHQUFHLG1CQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzVDLElBQUksRUFBRSxHQUFXLFdBQVcsQ0FBQyxRQUFRLENBQUMsaUNBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNyRCxJQUFJLElBQUksR0FBVyxXQUFXLENBQUMsUUFBUSxDQUFDLGlDQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekQsSUFBSSxLQUFLLEdBQVcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxpQ0FB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ZmFjZXMvc2lnbmFsSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEJhc2VTZXJpZXMgfSBmcm9tIFwiLi9iYXNlU2VyaWVzXCI7XHJcbmltcG9ydCB7IElQb2ludCB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy9wb2ludEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBSRFAgfSBmcm9tIFwiLi4vLi4vY29tbW9uL21hdGgvbGluZVJlZHVjdGlvbkFsZ29yaXRobS9yZHBcIjtcclxuaW1wb3J0IHsgTWF0aFggfSBmcm9tIFwiLi4vLi4vY29tbW9uL21hdGgvbWF0aFhcIjtcclxuaW1wb3J0IHsgQ2hhcnRQb2ludCB9IGZyb20gXCIuLi8uLi93aWRnZXRzL2NoYXJ0V2lkZ2V0L2NoYXJ0RXh0ZW5zaW9ucy9jaGFydERhdGFPcHRpbWl6ZXJcIjtcclxuaW1wb3J0IHsgU2VyaWVzVHlwZSB9IGZyb20gXCIuL3Nlcmllc1R5cGVcIjtcclxuaW1wb3J0IHsgQ3Vyc29yVHlwZSB9IGZyb20gXCIuLi8uLi93aWRnZXRzL2NvbW1vbi9zdGF0ZXMvY3Vyc29yU3RhdGVzXCI7XHJcbmltcG9ydCB7IElTZXJpZXNQcm92aWRlciB9IGZyb20gXCIuLi9jb21tb24vc2VyaWVzUHJvdmlkZXIvc2VyaWVzUHJvdmlkZXJJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9pbnRlcmZhY2VzL3NldHRpbmdzSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFJbmZvIH0gZnJvbSBcIi4uL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRpb25EYXRhSW5mb1wiO1xyXG5pbXBvcnQgeyBTZXR0aW5nSWRzIH0gZnJvbSBcIi4vYmFzZVNlcmllc1NldHRpbmdJZHNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBYWVNlcmllcyBleHRlbmRzIEJhc2VTZXJpZXN7XHJcbiAgICBcclxuICAgIHR5cGUgPSBTZXJpZXNUeXBlLnh5U2VyaWVzO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBYWVNlcmllc1xyXG4gICAgICogQHBhcmFtIHtJU2lnbmFsfSBzaWduYWxcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29sb3JcclxuICAgICAqIEBwYXJhbSB7SVNlcmllc1Byb3ZpZGVyfSBzZXJpZXNQcm92aWRlclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFt1bmlxdWVJZD1cIlwiXVxyXG4gICAgICogQG1lbWJlcm9mIFhZU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHNpZ25hbDogSVNpZ25hbCwgbmFtZTogc3RyaW5nLCBjb2xvcjogc3RyaW5nLCBzZXJpZXNQcm92aWRlcjogSVNlcmllc1Byb3ZpZGVyLCB1bmlxdWVJZDogc3RyaW5nID0gXCJcIikge1xyXG4gICAgICAgIHN1cGVyKHNpZ25hbCwgbmFtZSwgY29sb3IsIEN1cnNvclR5cGUudGltZURvbWFpbiwgc2VyaWVzUHJvdmlkZXIsIHVuaXF1ZUlkKTtcclxuICAgICAgICB0aGlzLnJhd1BvaW50cyA9IHRoaXMuc2lnbmFsLnJhd1BvaW50cztcclxuICAgICAgICB0aGlzLnVwZGF0ZVRpbWVzdGFtcHMoKTtcclxuICAgICAgICB0aGlzLmdldFJhbmdlKCk7XHJcbiAgICAgICAgdGhpcy5zaW1wbGlmeVNpZ25hbCh0aGlzLnJhd1BvaW50cyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFhZU2VyaWVzIHdpdGggdGhlIGdpdmVuIHNldHRpbmdzXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtJU2V0dGluZ3N9IHNldHRpbmdzXHJcbiAgICAgKiBAcGFyYW0ge0lTZXJpZXNQcm92aWRlcn0gc2VyaWVzUHJvdmlkZXJcclxuICAgICAqIEByZXR1cm5zIHtYWVNlcmllc31cclxuICAgICAqIEBtZW1iZXJvZiBYWVNlcmllc1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY3JlYXRlKHNldHRpbmdzOiBJU2V0dGluZ3MsIHNlcmllc1Byb3ZpZGVyOiBJU2VyaWVzUHJvdmlkZXIpOiBYWVNlcmllc3tcclxuICAgICAgICAvLyBnZXQgaW5mbyBmcm9tIHBlcnNpc3RpbmdkYXRhXHJcbiAgICAgICAgbGV0IHNldHRpbmdzT2JqID0gU2V0dGluZ3MuY3JlYXRlKHNldHRpbmdzKTtcclxuICAgICAgICBsZXQgaWQ6IHN0cmluZyA9IHNldHRpbmdzT2JqLmdldFZhbHVlKFNldHRpbmdJZHMuSWQpO1xyXG4gICAgICAgIGxldCBuYW1lOiBzdHJpbmcgPSBzZXR0aW5nc09iai5nZXRWYWx1ZShTZXR0aW5nSWRzLk5hbWUpO1xyXG4gICAgICAgIGxldCBjb2xvcjogc3RyaW5nID0gc2V0dGluZ3NPYmouZ2V0VmFsdWUoU2V0dGluZ0lkcy5Db2xvcik7XHJcbiAgICAgICAgbGV0IHNpZ25hbERhdGE6IElTZXR0aW5nc3x1bmRlZmluZWQgPSBzZXR0aW5nc09iai5nZXRWYWx1ZShTZXR0aW5nSWRzLlNpZ25hbERhdGEpO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgc2lnbmFsIHdpdGggdGhlIGdpdmVuIHNpZ25hbERhdGFcclxuICAgICAgICBsZXQgc2lnbmFsID0gdGhpcy5jcmVhdGVTaWduYWwoc2lnbmFsRGF0YSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gY3JlYXRlIHNlcmllcyB3aXRoIHRoZSBnaXZlbiBkYXRhXHJcbiAgICAgICAgbGV0IG5ld1lUU2VyaWVzID0gbmV3IFhZU2VyaWVzKHNpZ25hbCwgbmFtZSwgY29sb3IsIHNlcmllc1Byb3ZpZGVyLCBpZCk7XHJcblxyXG4gICAgICAgIC8vIHNldCBjYWxjdWxhdGlvbiBpbmZvcm1hdGlvbnMgaWYgYXZhaWxhYmxlXHJcbiAgICAgICAgbGV0IGNhbGN1bGF0aW9uRGF0YUluZm86IElTZXR0aW5nc3x1bmRlZmluZWQgPSBzZXR0aW5nc09iai5nZXRWYWx1ZShTZXR0aW5nSWRzLkNhbGN1bGF0aW9uRGF0YSk7XHJcbiAgICAgICAgaWYoY2FsY3VsYXRpb25EYXRhSW5mbyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBuZXdZVFNlcmllcy5jYWxjdWxhdGlvbkRhdGFJbmZvID0gbmV3IENhbGN1bGF0aW9uRGF0YUluZm8oKTtcclxuICAgICAgICAgICAgbmV3WVRTZXJpZXMuY2FsY3VsYXRpb25EYXRhSW5mby5zZXRTZXR0aW5ncyhjYWxjdWxhdGlvbkRhdGFJbmZvKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ld1lUU2VyaWVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgc2V0dGluZ3Mgb2YgdGhlIFhZU2VyaWVzXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0lTZXR0aW5nc31cclxuICAgICAqIEBtZW1iZXJvZiBYWVNlcmllc1xyXG4gICAgICovXHJcbiAgICBnZXRTZXR0aW5ncygpOiBJU2V0dGluZ3N7XHJcbiAgICAgICAgbGV0IHNldHRpbmdzID0gc3VwZXIuZ2V0U2V0dGluZ3MoKTtcclxuICAgICAgICBzZXR0aW5ncy50eXBlID0gXCJYWVNlcmllc1wiO1xyXG4gICAgICAgIHJldHVybiBzZXR0aW5ncztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0ZXMgYW4gaW5pdGlhbCBsaW5lIHNpbXBsaWZpY2F0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJUG9pbnRbXX0gc2VyaWVzUG9pbnRzXHJcbiAgICAgKiBAbWVtYmVyb2YgWFlTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNpbXBsaWZ5U2lnbmFsKHNlcmllc1BvaW50czpJUG9pbnRbXSkge1xyXG5cclxuICAgICAgICBjb25zdCBsaW5lT3B0aW1pemF0aW9uID0gbmV3IFJEUCgpO1xyXG5cclxuICAgICAgICBjb25zdCB4VmFsdWVzID0gc2VyaWVzUG9pbnRzLm1hcCgocG9pbnQpPT57IHJldHVybiBwb2ludC54O30pO1xyXG4gICAgICAgIGxldCB5VmFsdWVzID0gc2VyaWVzUG9pbnRzLm1hcCgocG9pbnQpPT57IHJldHVybiBwb2ludC55O30pO1xyXG5cclxuICAgICAgICBjb25zdCB4TWluID0gTWF0aFgubWluKHhWYWx1ZXMpO1xyXG4gICAgICAgIGNvbnN0IHhNYXggPSBNYXRoWC5tYXgoeFZhbHVlcyk7XHJcbiAgICAgICAgY29uc3QgeU1pbiA9IE1hdGhYLm1pbih5VmFsdWVzKTtcclxuICAgICAgICBjb25zdCB5TWF4ID0gTWF0aFgubWF4KHlWYWx1ZXMpO1xyXG5cclxuICAgICAgICAvLyBjYWxjdWxhdGUgc2VyaWVzIHJhbmdlc1xyXG4gICAgICAgIGNvbnN0IHhSYW5nZSA9IHhNYXgteE1pbjtcclxuICAgICAgICBjb25zdCB5UmFuZ2UgPSB5TWF4LXlNaW47XHJcbiAgICAgICAgLy8gY2FsY3VsYXRlIHVuaXQgcGVyIHBpeGVsIHJhdGlvc1xyXG4gICAgICAgIGxldCB4UmF0aW8gPSB4UmFuZ2UvMTAwMDAgOyAgIFxyXG4gICAgICAgIGxldCB5UmF0aW8gPSB5UmFuZ2UvMTAwMDAgOyAgXHJcblxyXG4gICAgICAgIC8vIHRoZSB1bml0cy9waXhlbCByYXRpbyBtdXN0IG5vdCBiZSAwIFxyXG4gICAgICAgIHhSYXRpbyA9IHhSYXRpbyA+IDAgPyB4UmF0aW86IE51bWJlci5NSU5fVkFMVUUgOyAgIFxyXG4gICAgICAgIHlSYXRpbyA9IHlSYXRpbyA+IDAgPyB5UmF0aW86IE51bWJlci5NSU5fVkFMVUUgOyAgXHJcbiAgICAgICAgLy8gc2V0IHJlcXVpcmVkIHNpbXBsaWZpY2F0aW9uIHByZWNpc2lvblxyXG4gICAgICAgIGNvbnN0IHByZWNpc2lvbiA9IDE7XHJcbiBcclxuICAgICAgICAvLyBjcmVhdGUgY2hhcnQgcG9pbnRzIGZyb20gdGhlIHJhdyBwb2ludHNcclxuICAgICAgICBsZXQgcmF3UG9pbnRzID0gIHNlcmllc1BvaW50cy5tYXAoKHBvaW50LGkpPT57IHJldHVybiBuZXcgQ2hhcnRQb2ludChpLHRydWUsIHBvaW50LngsIHBvaW50LnkpOyB9KTtcclxuICAgICAgICAvLyBjYWxjdWxhdGUgdGhlIHJlZHVjZWQgcG9pbnQgc2V0XHJcbiAgICAgICAgbGV0IHJlZHVjZWRTZXJpZXNQb2ludHMgPSBsaW5lT3B0aW1pemF0aW9uLnNpbXBsaWZ5KHJhd1BvaW50cyxwcmVjaXNpb24sIHhSYXRpbyx5UmF0aW8sIHRydWUpO1xyXG5cclxuICAgICAgICAvLyB1cGRhdGUgc2ltcGxpZmllZCBzZXJpZXMgdmlldyBwb2ludHMgYW5kIHJlZHVjdGlvbiByYXRpb3NcclxuICAgICAgICB0aGlzLmRhdGEgPSAgcmVkdWNlZFNlcmllc1BvaW50cztcclxuICAgICAgICAoPGFueT50aGlzLmRhdGEpLnBpeGVsUmF0aW9YID0geFJhdGlvO1xyXG4gICAgICAgICg8YW55PnRoaXMuZGF0YSkucGl4ZWxSYXRpb1kgPSB5UmF0aW87XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IG1heCBYIHZhbHVlIGZyb20gYSBzZXJpZVxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEByZXR1cm5zIHsobnVtYmVyIHwgdW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBYWVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0TWF4WCgpOiBudW1iZXIgfCB1bmRlZmluZWR7XHJcbiAgICAgICAgbGV0IG1heFg7XHJcbiAgICAgICAgaWYgKHRoaXMucmF3UG9pbnRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMucmF3UG9pbnRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGlmKG1heFggPT0gdW5kZWZpbmVkIHx8IHRoaXMucmF3UG9pbnRzW2ldLnggPiBtYXhYICl7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF4WCA9IHRoaXMucmF3UG9pbnRzW2ldLnhcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWF4WDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBtaW4gWCB2YWx1ZSBmcm9tIGEgc2VyaWVcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcmV0dXJucyB7KG51bWJlciB8IHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgWFlTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldE1pblgoKTogbnVtYmVyIHwgdW5kZWZpbmVke1xyXG4gICAgICAgIGxldCBtaW5YO1xyXG4gICAgICAgIGlmICh0aGlzLnJhd1BvaW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnJhd1BvaW50cy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBpZihtaW5YID09IHVuZGVmaW5lZCB8fCB0aGlzLnJhd1BvaW50c1tpXS54IDwgbWluWCApe1xyXG4gICAgICAgICAgICAgICAgICAgIG1pblggPSB0aGlzLnJhd1BvaW50c1tpXS54XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1pblg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFxyXG4gICAgICogQ2xvbmVzIHRoaXMgc2VyaWVcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7QmFzZVNlcmllc31cclxuICAgICAqIEBtZW1iZXJvZiBYWVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2xvbmUoKTogWFlTZXJpZXN7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBYWVNlcmllcyh0aGlzLnNpZ25hbC5jbG9uZSgpLCB0aGlzLm5hbWUsIHRoaXMuY29sb3IsIHRoaXMuX3Nlcmllc1Byb3ZpZGVyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIHRpbWVzdGFtcHMgYmFzZW9uIHRoZSBhdmFpbGFibGUgc2VyaWVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBYWVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXBkYXRlVGltZXN0YW1wcygpIHtcclxuICAgICAgICBpZih0aGlzLmNhbGN1bGF0aW9uRGF0YUluZm8gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2FsY3VsYXRpb25EYXRhSW5mby5pbnB1dERhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgLy8gd2UgdXNlIHRoZSB4IHZhbHVlcyBmcm9tIHRoZSBpbnB1dCAwIGFzIHRoZSB0aW1lc3RhbXBzIHNvdXJjZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fdGltZXN0YW1wcyA9IHRoaXMuY2FsY3VsYXRpb25EYXRhSW5mby5pbnB1dERhdGFbMF0uZ2V0RGF0YSgpLm1hcCgoaW5wdXREYXRhUG9pbnQpPT57IHJldHVybiBpbnB1dERhdGFQb2ludC54fSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIHdoZW5ldmVyIHRoZSBzZXJpcyBkYXRhIGhhcyBjaGFuZ2VkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SVBvaW50W119IGRhdGFcclxuICAgICAqIEBtZW1iZXJvZiBYWVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgb25TZXJpZURhdGFDaGFuZ2VkKCBzZXJpZXNEYXRhOiBJUG9pbnRbXSkge1xyXG4gICAgICAgIGlmKHNlcmllc0RhdGEgJiYgc2VyaWVzRGF0YS5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgdGhpcy5zaW1wbGlmeVNpZ25hbChzZXJpZXNEYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbn0iXX0=