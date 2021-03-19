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
define(["require", "exports", "./baseSeries", "./seriesType", "../../widgets/common/states/cursorStates", "../../common/persistence/settings", "../common/calculatorProvider/calculationDataInfo", "./baseSeriesSettingIds"], function (require, exports, baseSeries_1, seriesType_1, cursorStates_1, settings_1, calculationDataInfo_1, baseSeriesSettingIds_1) {
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
            var id = settingsObj.getValue(baseSeriesSettingIds_1.SettingIds.Id);
            var name = settingsObj.getValue(baseSeriesSettingIds_1.SettingIds.Name);
            var color = settingsObj.getValue(baseSeriesSettingIds_1.SettingIds.Color);
            var signalData = settingsObj.getValue(baseSeriesSettingIds_1.SettingIds.SignalData);
            // create signal with the given signalData
            var signal = this.createSignal(signalData);
            // create series with the given data
            var newYTSeries = new FFTSeries(signal, name, color, seriesProvider, id);
            // set calculation informations if available
            var calculationDataInfo = settingsObj.getValue(baseSeriesSettingIds_1.SettingIds.CalculationData);
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
            return new FFTSeries(this.signal.clone(), this.name, this.color, this._seriesProvider);
        };
        return FFTSeries;
    }(baseSeries_1.BaseSeries));
    exports.FFTSeries = FFTSeries;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRkZUU2VyaWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL0ZGVFNlcmllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBVUE7UUFBK0IsNkJBQVU7UUFJckM7Ozs7Ozs7O1dBUUc7UUFDSCxtQkFBWSxNQUFlLEVBQUUsSUFBWSxFQUFFLEtBQWEsRUFBRSxjQUErQixFQUFFLFFBQXFCO1lBQXJCLHlCQUFBLEVBQUEsYUFBcUI7WUFBaEgsWUFDSSxrQkFBTSxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSx5QkFBVSxDQUFDLGVBQWUsRUFBRSxjQUFjLEVBQUUsUUFBUSxDQUFDLFNBSW5GO1lBaEJRLFVBQUksR0FBRyx1QkFBVSxDQUFDLFNBQVMsQ0FBQztZQWFqQyxLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO1lBQ3ZDLEtBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3hCLEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7UUFDcEIsQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ0ksZ0JBQU0sR0FBYixVQUFjLFFBQW1CLEVBQUUsY0FBK0I7WUFDOUQsK0JBQStCO1lBQy9CLElBQUksV0FBVyxHQUFHLG1CQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzVDLElBQUksRUFBRSxHQUFXLFdBQVcsQ0FBQyxRQUFRLENBQUMsaUNBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNyRCxJQUFJLElBQUksR0FBVyxXQUFXLENBQUMsUUFBUSxDQUFDLGlDQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekQsSUFBSSxLQUFLLEdBQVcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxpQ0FBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzNELElBQUksVUFBVSxHQUF3QixXQUFXLENBQUMsUUFBUSxDQUFDLGlDQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFbEYsMENBQTBDO1lBQzFDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFM0Msb0NBQW9DO1lBQ3BDLElBQUksV0FBVyxHQUFHLElBQUksU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUV6RSw0Q0FBNEM7WUFDNUMsSUFBSSxtQkFBbUIsR0FBd0IsV0FBVyxDQUFDLFFBQVEsQ0FBQyxpQ0FBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ2hHLElBQUcsbUJBQW1CLElBQUksU0FBUyxFQUFDO2dCQUNoQyxXQUFXLENBQUMsbUJBQW1CLEdBQUcsSUFBSSx5Q0FBbUIsRUFBRSxDQUFDO2dCQUM1RCxXQUFXLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDLG1CQUFtQixDQUFDLENBQUM7YUFDcEU7WUFFRCxPQUFPLFdBQVcsQ0FBQztRQUN2QixDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSCwrQkFBVyxHQUFYO1lBQ0ksSUFBSSxRQUFRLEdBQUcsaUJBQU0sV0FBVyxXQUFFLENBQUM7WUFDbkMsUUFBUSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUM7WUFDNUIsT0FBTyxRQUFRLENBQUM7UUFDcEIsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNPLDJCQUFPLEdBQWpCO1lBQ0ksSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQzNCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7YUFDckQ7WUFDRCxPQUFPLFNBQVMsQ0FBQztRQUNyQixDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ08sMkJBQU8sR0FBakI7WUFDSSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDM0IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM5QjtZQUNELE9BQU8sU0FBUyxDQUFBO1FBQ3BCLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNPLG9DQUFnQixHQUExQjtZQUNJLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUMzQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQUMsUUFBUSxJQUFPLE9BQU8sUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQy9FO1FBQ0wsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0kseUJBQUssR0FBWjtZQUNJLE9BQU8sSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzNGLENBQUM7UUFDTCxnQkFBQztJQUFELENBQUMsQUFsSEQsQ0FBK0IsdUJBQVUsR0FrSHhDO0lBbEhZLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVNpZ25hbCB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy9zaWduYWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQmFzZVNlcmllcyB9IGZyb20gXCIuL2Jhc2VTZXJpZXNcIjtcclxuaW1wb3J0IHsgU2VyaWVzVHlwZSB9IGZyb20gXCIuL3Nlcmllc1R5cGVcIjtcclxuaW1wb3J0IHsgQ3Vyc29yVHlwZSB9IGZyb20gXCIuLi8uLi93aWRnZXRzL2NvbW1vbi9zdGF0ZXMvY3Vyc29yU3RhdGVzXCI7XHJcbmltcG9ydCB7IElTZXJpZXNQcm92aWRlciB9IGZyb20gXCIuLi9jb21tb24vc2VyaWVzUHJvdmlkZXIvc2VyaWVzUHJvdmlkZXJJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9pbnRlcmZhY2VzL3NldHRpbmdzSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFJbmZvIH0gZnJvbSBcIi4uL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRpb25EYXRhSW5mb1wiO1xyXG5pbXBvcnQgeyBTZXR0aW5nSWRzIH0gZnJvbSBcIi4vYmFzZVNlcmllc1NldHRpbmdJZHNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBGRlRTZXJpZXMgZXh0ZW5kcyBCYXNlU2VyaWVze1xyXG4gICAgXHJcbiAgICByZWFkb25seSB0eXBlID0gU2VyaWVzVHlwZS5mZnRTZXJpZXM7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEZGVFNlcmllc1xyXG4gICAgICogQHBhcmFtIHtJU2lnbmFsfSBzaWduYWxcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29sb3JcclxuICAgICAqIEBwYXJhbSB7SVNlcmllc1Byb3ZpZGVyfSBzZXJpZXNQcm92aWRlclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFt1bmlxdWVJZD1cIlwiXVxyXG4gICAgICogQG1lbWJlcm9mIEZGVFNlcmllc1xyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihzaWduYWw6IElTaWduYWwsIG5hbWU6IHN0cmluZywgY29sb3I6IHN0cmluZywgc2VyaWVzUHJvdmlkZXI6IElTZXJpZXNQcm92aWRlciwgdW5pcXVlSWQ6IHN0cmluZyA9IFwiXCIpIHtcclxuICAgICAgICBzdXBlcihzaWduYWwsIG5hbWUsIGNvbG9yLCBDdXJzb3JUeXBlLmZyZXF1ZW5jeURvbWFpbiwgc2VyaWVzUHJvdmlkZXIsIHVuaXF1ZUlkKTtcclxuICAgICAgICB0aGlzLnJhd1BvaW50cyA9IHRoaXMuc2lnbmFsLnJhd1BvaW50cztcclxuICAgICAgICB0aGlzLnVwZGF0ZVRpbWVzdGFtcHMoKTtcclxuICAgICAgICB0aGlzLmdldFJhbmdlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEZGVFNlcmllcyB3aXRoIHRoZSBnaXZlbiBzZXR0aW5nc1xyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7SVNldHRpbmdzfSBzZXR0aW5nc1xyXG4gICAgICogQHBhcmFtIHtJU2VyaWVzUHJvdmlkZXJ9IHNlcmllc1Byb3ZpZGVyXHJcbiAgICAgKiBAcmV0dXJucyB7RkZUU2VyaWVzfVxyXG4gICAgICogQG1lbWJlcm9mIEZGVFNlcmllc1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY3JlYXRlKHNldHRpbmdzOiBJU2V0dGluZ3MsIHNlcmllc1Byb3ZpZGVyOiBJU2VyaWVzUHJvdmlkZXIpOiBGRlRTZXJpZXN7XHJcbiAgICAgICAgLy8gZ2V0IGluZm8gZnJvbSBwZXJzaXN0aW5nZGF0YVxyXG4gICAgICAgIGxldCBzZXR0aW5nc09iaiA9IFNldHRpbmdzLmNyZWF0ZShzZXR0aW5ncyk7XHJcbiAgICAgICAgbGV0IGlkOiBzdHJpbmcgPSBzZXR0aW5nc09iai5nZXRWYWx1ZShTZXR0aW5nSWRzLklkKTtcclxuICAgICAgICBsZXQgbmFtZTogc3RyaW5nID0gc2V0dGluZ3NPYmouZ2V0VmFsdWUoU2V0dGluZ0lkcy5OYW1lKTtcclxuICAgICAgICBsZXQgY29sb3I6IHN0cmluZyA9IHNldHRpbmdzT2JqLmdldFZhbHVlKFNldHRpbmdJZHMuQ29sb3IpO1xyXG4gICAgICAgIGxldCBzaWduYWxEYXRhOiBJU2V0dGluZ3N8dW5kZWZpbmVkID0gc2V0dGluZ3NPYmouZ2V0VmFsdWUoU2V0dGluZ0lkcy5TaWduYWxEYXRhKTtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIHNpZ25hbCB3aXRoIHRoZSBnaXZlbiBzaWduYWxEYXRhXHJcbiAgICAgICAgbGV0IHNpZ25hbCA9IHRoaXMuY3JlYXRlU2lnbmFsKHNpZ25hbERhdGEpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGNyZWF0ZSBzZXJpZXMgd2l0aCB0aGUgZ2l2ZW4gZGF0YVxyXG4gICAgICAgIGxldCBuZXdZVFNlcmllcyA9IG5ldyBGRlRTZXJpZXMoc2lnbmFsLCBuYW1lLCBjb2xvciwgc2VyaWVzUHJvdmlkZXIsIGlkKTtcclxuXHJcbiAgICAgICAgLy8gc2V0IGNhbGN1bGF0aW9uIGluZm9ybWF0aW9ucyBpZiBhdmFpbGFibGVcclxuICAgICAgICBsZXQgY2FsY3VsYXRpb25EYXRhSW5mbzogSVNldHRpbmdzfHVuZGVmaW5lZCA9IHNldHRpbmdzT2JqLmdldFZhbHVlKFNldHRpbmdJZHMuQ2FsY3VsYXRpb25EYXRhKTtcclxuICAgICAgICBpZihjYWxjdWxhdGlvbkRhdGFJbmZvICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIG5ld1lUU2VyaWVzLmNhbGN1bGF0aW9uRGF0YUluZm8gPSBuZXcgQ2FsY3VsYXRpb25EYXRhSW5mbygpO1xyXG4gICAgICAgICAgICBuZXdZVFNlcmllcy5jYWxjdWxhdGlvbkRhdGFJbmZvLnNldFNldHRpbmdzKGNhbGN1bGF0aW9uRGF0YUluZm8pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ld1lUU2VyaWVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgc2V0dGluZ3Mgb2YgdGhlIEZGVFNlcmllc1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtJU2V0dGluZ3N9XHJcbiAgICAgKiBAbWVtYmVyb2YgRkZUU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIGdldFNldHRpbmdzKCk6IElTZXR0aW5nc3tcclxuICAgICAgICBsZXQgc2V0dGluZ3MgPSBzdXBlci5nZXRTZXR0aW5ncygpO1xyXG4gICAgICAgIHNldHRpbmdzLnR5cGUgPSBcIkZGVFNlcmllc1wiO1xyXG4gICAgICAgIHJldHVybiBzZXR0aW5ncztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBtYXggWCB2YWx1ZSBmcm9tIGEgc2VyaWVcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcmV0dXJucyB7KG51bWJlciB8IHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgRkZUU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXRNYXhYKCk6IG51bWJlciB8IHVuZGVmaW5lZHtcclxuICAgICAgICBpZiAodGhpcy5yYXdQb2ludHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yYXdQb2ludHNbdGhpcy5yYXdQb2ludHMubGVuZ3RoIC0gMV0ueFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IG1pbiBYIHZhbHVlIGZyb20gYSBzZXJpZVxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEByZXR1cm5zIHsobnVtYmVyIHwgdW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBGRlRTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldE1pblgoKTogbnVtYmVyIHwgdW5kZWZpbmVke1xyXG4gICAgICAgIGlmICh0aGlzLnJhd1BvaW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJhd1BvaW50c1swXS54O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSB0aW1lc3RhbXBzIGJhc2VvbiB0aGUgYXZhaWxhYmxlIHNlcmllc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgRkZUU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCB1cGRhdGVUaW1lc3RhbXBzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnJhd1BvaW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RpbWVzdGFtcHMgPSB0aGlzLnJhd1BvaW50cy5tYXAoKHJhd1BvaW50KSA9PiB7IHJldHVybiByYXdQb2ludC54OyB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDbG9uZXMgdGhpcyBzZXJpZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtCYXNlU2VyaWVzfVxyXG4gICAgICogQG1lbWJlcm9mIEZGVFNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2xvbmUoKTogRkZUU2VyaWVze1xyXG4gICAgICAgIHJldHVybiBuZXcgRkZUU2VyaWVzKHRoaXMuc2lnbmFsLmNsb25lKCksIHRoaXMubmFtZSwgdGhpcy5jb2xvciwgdGhpcy5fc2VyaWVzUHJvdmlkZXIpO1xyXG4gICAgfVxyXG59Il19