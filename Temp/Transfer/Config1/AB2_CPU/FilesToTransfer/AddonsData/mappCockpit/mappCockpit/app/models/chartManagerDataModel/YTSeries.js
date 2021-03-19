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
define(["require", "exports", "./baseSeries", "../../widgets/chartWidget/chartExtensions/chartDataOptimizer", "../../common/math/mathX", "./seriesType", "../../widgets/common/states/cursorStates", "../../common/persistence/settings", "../common/calculatorProvider/calculationDataInfo", "./baseSeriesSettingIds"], function (require, exports, baseSeries_1, chartDataOptimizer_1, mathX_1, seriesType_1, cursorStates_1, settings_1, calculationDataInfo_1, baseSeriesSettingIds_1) {
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
            var id = settingsObj.getValue(baseSeriesSettingIds_1.SettingIds.Id);
            var name = settingsObj.getValue(baseSeriesSettingIds_1.SettingIds.Name);
            var color = settingsObj.getValue(baseSeriesSettingIds_1.SettingIds.Color);
            var signalData = settingsObj.getValue(baseSeriesSettingIds_1.SettingIds.SignalData);
            // create signal with the given signalData
            var signal = this.createSignal(signalData);
            // create series with the given data
            var newYTSeries = new YTSeries(signal, name, color, seriesProvider, id);
            // set calculation informations if available
            var calculationDataInfo = settingsObj.getValue(baseSeriesSettingIds_1.SettingIds.CalculationData);
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
            return new YTSeries(this.signal.clone(), this.name, this.color, this._seriesProvider);
        };
        return YTSeries;
    }(baseSeries_1.BaseSeries));
    exports.YTSeries = YTSeries;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWVRTZXJpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvWVRTZXJpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQWFBO1FBQThCLDRCQUFVO1FBSXBDOzs7Ozs7OztXQVFHO1FBQ0gsa0JBQVksTUFBZSxFQUFFLElBQVksRUFBRSxLQUFhLEVBQUUsY0FBK0IsRUFBRSxRQUFxQjtZQUFyQix5QkFBQSxFQUFBLGFBQXFCO1lBQWhILFlBQ0ksa0JBQU0sTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUseUJBQVUsQ0FBQyxVQUFVLEVBQUUsY0FBYyxFQUFFLFFBQVEsQ0FBQyxTQUs5RTtZQWpCUSxVQUFJLEdBQUcsdUJBQVUsQ0FBQyxVQUFVLENBQUM7WUFhbEMsS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztZQUN2QyxLQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUN4QixLQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDaEIsS0FBSSxDQUFDLGNBQWMsQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7O1FBQ3hDLENBQUM7UUFFRDs7Ozs7Ozs7V0FRRztRQUNJLGVBQU0sR0FBYixVQUFjLFFBQW1CLEVBQUUsY0FBK0I7WUFDOUQsK0JBQStCO1lBQy9CLElBQUksV0FBVyxHQUFHLG1CQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzVDLElBQUksRUFBRSxHQUFXLFdBQVcsQ0FBQyxRQUFRLENBQUMsaUNBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNyRCxJQUFJLElBQUksR0FBVyxXQUFXLENBQUMsUUFBUSxDQUFDLGlDQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekQsSUFBSSxLQUFLLEdBQVcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxpQ0FB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QzlCO1lBQ0QsT0FBTyxTQUFTLENBQUE7UUFDcEIsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ08sbUNBQWdCLEdBQTFCO1lBQ0ksSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBQyxRQUFRLElBQU8sT0FBTyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDL0U7UUFDTCxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSSx3QkFBSyxHQUFaO1lBQ0ksT0FBTyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDMUYsQ0FBQztRQUNMLGVBQUM7SUFBRCxDQUFDLEFBNUlELENBQThCLHVCQUFVLEdBNEl2QztJQTVJWSw0QkFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElTaWduYWwgfSBmcm9tIFwiLi4vY29tbW9uL2ludGVyZmFjZXMvc2lnbmFsSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEJhc2VTZXJpZXN9IGZyb20gXCIuL2Jhc2VTZXJpZXNcIjtcclxuaW1wb3J0IHsgQ2hhcnRQb2ludCB9IGZyb20gXCIuLi8uLi93aWRnZXRzL2NoYXJ0V2lkZ2V0L2NoYXJ0RXh0ZW5zaW9ucy9jaGFydERhdGFPcHRpbWl6ZXJcIjtcclxuaW1wb3J0IHsgTWF0aFggfSBmcm9tIFwiLi4vLi4vY29tbW9uL21hdGgvbWF0aFhcIjtcclxuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb21tb24vaW50ZXJmYWNlcy9wb2ludEludGVyZmFjZVwiXHJcbmltcG9ydCB7IFNlcmllc1R5cGUgfSBmcm9tIFwiLi9zZXJpZXNUeXBlXCI7XHJcbmltcG9ydCB7IEN1cnNvclR5cGUgfSBmcm9tIFwiLi4vLi4vd2lkZ2V0cy9jb21tb24vc3RhdGVzL2N1cnNvclN0YXRlc1wiO1xyXG5pbXBvcnQgeyBJU2VyaWVzUHJvdmlkZXIgfSBmcm9tIFwiLi4vY29tbW9uL3Nlcmllc1Byb3ZpZGVyL3Nlcmllc1Byb3ZpZGVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vcGVyc2lzdGVuY2UvaW50ZXJmYWNlcy9zZXR0aW5nc0ludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vcGVyc2lzdGVuY2Uvc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhSW5mbyB9IGZyb20gXCIuLi9jb21tb24vY2FsY3VsYXRvclByb3ZpZGVyL2NhbGN1bGF0aW9uRGF0YUluZm9cIjtcclxuaW1wb3J0IHsgU2V0dGluZ0lkcyB9IGZyb20gXCIuL2Jhc2VTZXJpZXNTZXR0aW5nSWRzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgWVRTZXJpZXMgZXh0ZW5kcyBCYXNlU2VyaWVze1xyXG4gICBcclxuICAgIHJlYWRvbmx5IHR5cGUgPSBTZXJpZXNUeXBlLnRpbWVTZXJpZXM7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBZVFNlcmllc1xyXG4gICAgICogQHBhcmFtIHtJU2lnbmFsfSBzaWduYWxcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29sb3JcclxuICAgICAqIEBwYXJhbSB7SVNlcmllc1Byb3ZpZGVyfSBzZXJpZXNQcm92aWRlclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFt1bmlxdWVJZD1cIlwiXVxyXG4gICAgICogQG1lbWJlcm9mIFlUU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHNpZ25hbDogSVNpZ25hbCwgbmFtZTogc3RyaW5nLCBjb2xvcjogc3RyaW5nLCBzZXJpZXNQcm92aWRlcjogSVNlcmllc1Byb3ZpZGVyLCB1bmlxdWVJZDogc3RyaW5nID0gXCJcIikge1xyXG4gICAgICAgIHN1cGVyKHNpZ25hbCwgbmFtZSwgY29sb3IsIEN1cnNvclR5cGUudGltZURvbWFpbiwgc2VyaWVzUHJvdmlkZXIsIHVuaXF1ZUlkKTtcclxuICAgICAgICB0aGlzLnJhd1BvaW50cyA9IHRoaXMuc2lnbmFsLnJhd1BvaW50cztcclxuICAgICAgICB0aGlzLnVwZGF0ZVRpbWVzdGFtcHMoKTtcclxuICAgICAgICB0aGlzLmdldFJhbmdlKCk7XHJcbiAgICAgICAgdGhpcy5zaW1wbGlmeVNpZ25hbCh0aGlzLnJhd1BvaW50cyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFlUU2VyaWVzIHdpdGggdGhlIGdpdmVuIHNldHRpbmdzXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtJU2V0dGluZ3N9IHNldHRpbmdzXHJcbiAgICAgKiBAcGFyYW0ge0lTZXJpZXNQcm92aWRlcn0gc2VyaWVzUHJvdmlkZXJcclxuICAgICAqIEByZXR1cm5zIHtZVFNlcmllc31cclxuICAgICAqIEBtZW1iZXJvZiBZVFNlcmllc1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY3JlYXRlKHNldHRpbmdzOiBJU2V0dGluZ3MsIHNlcmllc1Byb3ZpZGVyOiBJU2VyaWVzUHJvdmlkZXIpOiBZVFNlcmllc3tcclxuICAgICAgICAvLyBnZXQgaW5mbyBmcm9tIHBlcnNpc3RpbmdkYXRhXHJcbiAgICAgICAgbGV0IHNldHRpbmdzT2JqID0gU2V0dGluZ3MuY3JlYXRlKHNldHRpbmdzKTtcclxuICAgICAgICBsZXQgaWQ6IHN0cmluZyA9IHNldHRpbmdzT2JqLmdldFZhbHVlKFNldHRpbmdJZHMuSWQpO1xyXG4gICAgICAgIGxldCBuYW1lOiBzdHJpbmcgPSBzZXR0aW5nc09iai5nZXRWYWx1ZShTZXR0aW5nSWRzLk5hbWUpO1xyXG4gICAgICAgIGxldCBjb2xvcjogc3RyaW5nID0gc2V0dGluZ3NPYmouZ2V0VmFsdWUoU2V0dGluZ0lkcy5Db2xvcik7XHJcbiAgICAgICAgbGV0IHNpZ25hbERhdGE6IElTZXR0aW5nc3x1bmRlZmluZWQgPSBzZXR0aW5nc09iai5nZXRWYWx1ZShTZXR0aW5nSWRzLlNpZ25hbERhdGEpO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgc2lnbmFsIHdpdGggdGhlIGdpdmVuIHNpZ25hbERhdGFcclxuICAgICAgICBsZXQgc2lnbmFsID0gdGhpcy5jcmVhdGVTaWduYWwoc2lnbmFsRGF0YSk7XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSBzZXJpZXMgd2l0aCB0aGUgZ2l2ZW4gZGF0YVxyXG4gICAgICAgIGxldCBuZXdZVFNlcmllcyA9IG5ldyBZVFNlcmllcyhzaWduYWwsIG5hbWUsIGNvbG9yLCBzZXJpZXNQcm92aWRlciwgaWQpO1xyXG5cclxuICAgICAgICAvLyBzZXQgY2FsY3VsYXRpb24gaW5mb3JtYXRpb25zIGlmIGF2YWlsYWJsZVxyXG4gICAgICAgIGxldCBjYWxjdWxhdGlvbkRhdGFJbmZvOiBJU2V0dGluZ3N8dW5kZWZpbmVkID0gc2V0dGluZ3NPYmouZ2V0VmFsdWUoU2V0dGluZ0lkcy5DYWxjdWxhdGlvbkRhdGEpO1xyXG4gICAgICAgIGlmKGNhbGN1bGF0aW9uRGF0YUluZm8gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgbmV3WVRTZXJpZXMuY2FsY3VsYXRpb25EYXRhSW5mbyA9IG5ldyBDYWxjdWxhdGlvbkRhdGFJbmZvKCk7XHJcbiAgICAgICAgICAgIG5ld1lUU2VyaWVzLmNhbGN1bGF0aW9uRGF0YUluZm8uc2V0U2V0dGluZ3MoY2FsY3VsYXRpb25EYXRhSW5mbyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXdZVFNlcmllcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICBSZXR1cm5zIHRoZSBzZXR0aW5ncyBvZiB0aGUgWVRTZXJpZXNcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7SVNldHRpbmdzfVxyXG4gICAgICogQG1lbWJlcm9mIFlUU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIGdldFNldHRpbmdzKCk6IElTZXR0aW5nc3tcclxuICAgICAgICBsZXQgc2V0dGluZ3MgPSBzdXBlci5nZXRTZXR0aW5ncygpO1xyXG4gICAgICAgIHNldHRpbmdzLnR5cGUgPSBcIllUU2VyaWVzXCI7XHJcbiAgICAgICAgcmV0dXJuIHNldHRpbmdzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2ltcGxpZmllcyBzZXJpZXMgZGF0YSBwb2ludHNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgWVRTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNpbXBsaWZ5U2lnbmFsKHNlcmllc1BvaW50czpJUG9pbnRbXSkge1xyXG5cclxuICAgICAgICAvLyByZXRyaWV2ZSB4IGFuZCB5IHZhbHVlc1xyXG4gICAgICAgIGNvbnN0IHhWYWx1ZXMgPSBzZXJpZXNQb2ludHMubWFwKChwb2ludCk9PnsgcmV0dXJuIHBvaW50Lng7fSk7XHJcbiAgICAgICAgbGV0IHlWYWx1ZXMgPSBzZXJpZXNQb2ludHMubWFwKChwb2ludCk9PnsgcmV0dXJuIHBvaW50Lnk7fSk7XHJcblxyXG4gICAgICAgIC8vIGdldCB0aGUgbWluIG1heCB2YWx1ZXNcclxuICAgICAgICBjb25zdCB4TWluID0gTWF0aFgubWluKHhWYWx1ZXMpO1xyXG4gICAgICAgIGNvbnN0IHhNYXggPSBNYXRoWC5tYXgoeFZhbHVlcyk7XHJcbiAgICAgICAgY29uc3QgeU1pbiA9IE1hdGhYLm1pbih5VmFsdWVzKTtcclxuICAgICAgICBjb25zdCB5TWF4ID0gTWF0aFgubWF4KHlWYWx1ZXMpO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgdGhlIHNpbXBsaWZpZWQgcG9pbnRzLiBGb3IgeXQgdGhleSBhcmUganVzdCB0aGUgbWluIG1heCBlZGdlIHBvaW50cyBmb3IgaW5pdGlhbGl6aW5nIHRoZSBjaGFydCBhcmVhLiBcclxuICAgICAgICBsZXQgcmVkdWNlZFNlcmllc1BvaW50czpDaGFydFBvaW50W10gPSBbXTtcclxuICAgICAgICByZWR1Y2VkU2VyaWVzUG9pbnRzLnB1c2gobmV3IENoYXJ0UG9pbnQoMCx0cnVlLHhNaW4seU1pbikpO1xyXG4gICAgICAgIHJlZHVjZWRTZXJpZXNQb2ludHMucHVzaChuZXcgQ2hhcnRQb2ludCgxLHRydWUseE1heCx5TWF4KSk7XHJcblxyXG4gICAgICAgIC8vIHVwZGF0ZSBzaW1wbGlmaWVkIHNlcmllcyB3aXRoIG1pbi9tYXggeXQgcG9pbnRzXHJcbiAgICAgICAgdGhpcy5kYXRhID0gIHJlZHVjZWRTZXJpZXNQb2ludHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgbWF4IFggdmFsdWUgZnJvbSBhIHNlcmllXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHJldHVybnMgeyhudW1iZXIgfCB1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIFlUU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXRNYXhYKCk6IG51bWJlciB8IHVuZGVmaW5lZHtcclxuICAgICAgICBpZiAodGhpcy5yYXdQb2ludHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yYXdQb2ludHNbdGhpcy5yYXdQb2ludHMubGVuZ3RoIC0gMV0ueFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IG1pbiBYIHZhbHVlIGZyb20gYSBzZXJpZVxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEByZXR1cm5zIHsobnVtYmVyIHwgdW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBZVFNlcmllc1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0TWluWCgpOiBudW1iZXIgfCB1bmRlZmluZWR7XHJcbiAgICAgICAgaWYgKHRoaXMucmF3UG9pbnRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmF3UG9pbnRzWzBdLng7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWRcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSB0aW1lc3RhbXBzIGJhc2VvbiB0aGUgYXZhaWxhYmxlIHNlcmllc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgWVRTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHVwZGF0ZVRpbWVzdGFtcHMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucmF3UG9pbnRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fdGltZXN0YW1wcyA9IHRoaXMucmF3UG9pbnRzLm1hcCgocmF3UG9pbnQpID0+IHsgcmV0dXJuIHJhd1BvaW50Lng7IH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENsb25lcyB0aGlzIHNlcmllXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0Jhc2VTZXJpZXN9XHJcbiAgICAgKiBAbWVtYmVyb2YgWVRTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNsb25lKCk6IFlUU2VyaWVze1xyXG4gICAgICAgIHJldHVybiBuZXcgWVRTZXJpZXModGhpcy5zaWduYWwuY2xvbmUoKSwgdGhpcy5uYW1lLCB0aGlzLmNvbG9yLCB0aGlzLl9zZXJpZXNQcm92aWRlcik7XHJcbiAgICB9XHJcbn0iXX0=