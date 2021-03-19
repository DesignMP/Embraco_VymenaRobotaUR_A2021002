define(["require", "exports", "./scale", "../../common/persistence/settings"], function (require, exports, scale_1, settings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ChartType;
    (function (ChartType) {
        ChartType[ChartType["YTChart"] = 0] = "YTChart";
        ChartType[ChartType["XYChart"] = 1] = "XYChart";
        ChartType[ChartType["FFTChart"] = 2] = "FFTChart";
    })(ChartType = exports.ChartType || (exports.ChartType = {}));
    var ChartManagerChart = /** @class */ (function () {
        /**
         * Creates an instance of ChartManagerChart.
         * @param {string} name
         * @param {ChartType} type
         * @memberof ChartManagerChart
         */
        function ChartManagerChart(name, type) {
            if (type === void 0) { type = ChartType.YTChart; }
            this.dropPossible = false;
            this.expandState = true;
            this.isGroup = true;
            this.nextUniqueScaleId = 1;
            this.name = name;
            this.chartType = type;
            this.description = "";
            this.childs = new Array();
            this.isDisabled = false;
        }
        Object.defineProperty(ChartManagerChart.prototype, "additionalInfo", {
            get: function () {
                switch (this.chartType) {
                    case ChartType.XYChart:
                        return 'XY';
                    case ChartType.YTChart:
                        return 'YT';
                    case ChartType.FFTChart:
                        return 'FFT';
                }
                return "";
            },
            enumerable: true,
            configurable: true
        });
        ChartManagerChart.prototype.getSettings = function () {
            var scales = this.getChilds();
            var scaleExport = new Array();
            scales.forEach(function (scale) {
                scaleExport.push(scale.getSettings());
            });
            var settings = new settings_1.Settings("Chart");
            settings.setValue("name", this.name);
            settings.setValue("type", this.chartType);
            settings.setValue("scales", scaleExport);
            return settings;
        };
        ChartManagerChart.prototype.setSettings = function (settings) {
            var settingsObj = settings_1.Settings.create(settings);
            this.name = settingsObj.getValue("name");
            this.chartType = settingsObj.getValue("type");
        };
        ChartManagerChart.prototype.addDefaultYScale = function (dataModel, minX, maxX) {
            // add default yAxis
            var yScale = new scale_1.Scale("Scale_1", this);
            yScale.minXValue = minX;
            yScale.maxXValue = maxX;
            //dataModel.addYScale(this, yScale);
            this.addYScale(yScale);
            yScale.eventDataChanged.attach(dataModel._scaleDataChangedHandler);
        };
        Object.defineProperty(ChartManagerChart.prototype, "iconDefinition", {
            /**
             * Returns the icon definition for this chart object
             *
             * @readonly
             * @type {string}
             * @memberof ChartManagerChart
             */
            get: function () {
                var iconDefinition = "";
                var classNames = "e-treegridcollapse treegridcollapse";
                // Add collapse/expand icon 
                if (this.expandState == true) {
                    classNames += "e-treegridexpand treegridexpand";
                }
                iconDefinition += "<div class='" + classNames + "'></div>";
                return iconDefinition;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Adds a serie to the given scale in this chart
         *
         * @param {Array<BaseSeries>} series
         * @param {Scale} scale
         * @memberof ChartManagerChart
         */
        ChartManagerChart.prototype.addSeries = function (series, scale) {
            if (scale !== undefined) {
                scale.addSeries(series);
            }
        };
        /**
         * Removes the serie from this chart(will be removed from child => YAxis)
         *
         * @param {BaseSeries} serie
         * @returns {boolean}
         * @memberof ChartManagerChart
         */
        ChartManagerChart.prototype.removeSerie = function (serie) {
            for (var i = 0; i < this.childs.length; i++) {
                var yAxis = this.childs[i];
                if (yAxis.removeSerie(serie)) {
                    return true;
                }
            }
            return false;
        };
        ChartManagerChart.prototype.canSeriesBeDropped = function (series, serieChartType, sameGroup) {
            if (serieChartType == this.chartType) {
                return true;
            }
            else if (series.length == 2 && sameGroup && this.chartType == ChartType.XYChart && serieChartType != ChartType.FFTChart) {
                return true;
            }
            else if (serieChartType == ChartType.YTChart && this.chartType == ChartType.FFTChart) {
                return true;
            }
            return false;
        };
        /**
         * Returns true if it is possible to add an other axis(current limit is 2 yAxis)
         *
         * @returns {boolean}
         * @memberof ChartManagerChart
         */
        ChartManagerChart.prototype.canAddYAxis = function () {
            var maxYAxisCount = 2;
            if (this.chartType == ChartType.XYChart) {
                maxYAxisCount = 1;
            }
            if (this.childs.length < maxYAxisCount) {
                return true;
            }
            return false;
        };
        /**
         * Returns false if there is only one yAxis available
         * There must always be one yAxis available; the last yAxis may not be deleted
         *
         * @memberof ChartManagerChart
         */
        ChartManagerChart.prototype.canRemoveYAxis = function () {
            var minYAxisCount = 1;
            if (this.childs.length <= minYAxisCount) {
                return false;
            }
            return true;
        };
        /**
         * Adds a new yAxis to the chart
         * Returns true if added else false
         *
         * @param {Scale} yAxis
         * @returns {boolean}
         * @memberof ChartManagerChart
         */
        ChartManagerChart.prototype.addYScale = function (yAxis) {
            if (this.canAddYAxis() == false) {
                // Not possible to add more yAxis(limit reached)
                return false;
            }
            this.childs.push(yAxis);
            this.nextUniqueScaleId++;
            return true;
        };
        /**
         * Removes a yAxis from the chart
         * Returns true if removed, else false-
         *
         * @param {Scale} yAxis
         * @returns {boolean}
         * @memberof ChartManagerChart
         */
        ChartManagerChart.prototype.removeYAxis = function (yAxis) {
            if (this.canRemoveYAxis() == false) {
                // There must always be one yAxis available; the last yAxis may not be deleted
                return false;
            }
            var index = -1;
            for (var j = 0; j < this.childs.length; j++) {
                if (this.childs[j] == yAxis) {
                    index = j;
                    break;
                }
            }
            if (index > -1) {
                this.childs.splice(index, 1);
                return true;
            }
            return false;
        };
        /**
         * Returns the name of the next scale, which is currently not in this chart
         *
         * @returns {string}
         * @memberof ChartManagerChart
         */
        ChartManagerChart.prototype.getNextYAxisId = function () {
            return "Scale_" + this.nextUniqueScaleId;
        };
        /**
         * Returns true if the given serie or its only child (FFT) is in the chart, else false
         *
         * @param {Array<BaseSeries>} serie
         * @returns {boolean}
         * @memberof ChartManagerChart
         */
        ChartManagerChart.prototype.hasSeries = function (series) {
            var seriesInChart = 0;
            for (var i = 0; i < this.childs.length; i++) {
                var yAxis = this.childs[i];
                //number of dropped series that are already in the chart 
                seriesInChart = seriesInChart + yAxis.numberOfMatchingSeries(series);
            }
            if (seriesInChart == series.length) {
                return true;
            }
            else {
                return false;
            }
        };
        /**
         * Returns true if the given serie is in the chart, else false
         *
         * @param {BaseSeries} serie
         * @returns
         * @memberof ChartManagerChart
         */
        ChartManagerChart.prototype.hasSerie = function (serie) {
            for (var i = 0; i < this.childs.length; i++) {
                var yAxis = this.childs[i];
                if (yAxis.hasSerie(serie)) {
                    return true;
                }
            }
            return false;
        };
        /**
         * Returns the yAxis object for the given yAxis name
         *
         * @param {string} yAxisId
         * @returns {(Scale|undefined)}
         * @memberof ChartManagerChart
         */
        ChartManagerChart.prototype.getYScale = function (yAxisId) {
            for (var i = 0; i < this.childs.length; i++) {
                if (this.childs[i].id == yAxisId) {
                    return this.childs[i];
                }
            }
            return undefined;
        };
        /**
         * Returns the yAxis object for the given serie
         *
         * @param {BaseSeries} serie
         * @returns {(Scale|undefined)}
         * @memberof ChartManagerChart
         */
        ChartManagerChart.prototype.getYAxisForSerie = function (serie) {
            for (var i = 0; i < this.childs.length; i++) {
                for (var j = 0; j < this.childs[i].childs.length; j++) {
                    if (this.childs[i].childs[j] == serie) {
                        return this.childs[i];
                    }
                }
            }
            return undefined;
        };
        /**
         * Returns the id of the first yAxis
         *
         * @returns {string}
         * @memberof ChartManagerChart
         */
        ChartManagerChart.prototype.getDefaultYAxisId = function () {
            return this.childs[0].id;
        };
        /**
         * Returns all childs of this chart(e.g. yAxis)
         *
         * @returns
         * @memberof ChartManagerChart
         */
        ChartManagerChart.prototype.getChilds = function () {
            var yAxis = [];
            for (var i = 0; i < this.childs.length; i++) {
                yAxis.push(this.childs[i]);
            }
            return yAxis;
        };
        /**
         * Returns some additional infos which would be shown in the second column in the chartmanager
         *
         * @returns
         * @memberof ChartManagerChart
         */
        ChartManagerChart.prototype.getAdditionalInfo = function () {
            var value;
            switch (this.chartType) {
                case ChartType.XYChart:
                    value = 'XY';
                    break;
                case ChartType.YTChart:
                    value = 'YT';
                    break;
                case ChartType.FFTChart:
                    value = 'FFT';
                    break;
            }
            return value;
        };
        /**
         * Sets the chart disabled or enabled
         *
         * @param {boolean} disabled
         * @memberof ChartManagerChart
         */
        ChartManagerChart.prototype.setDisabled = function (disabled) {
            this.isDisabled = disabled;
        };
        ChartManagerChart.prototype.getAllSeries = function () {
            var series = new Array();
            for (var i = 0; i < this.childs.length; i++) {
                var yAxis = this.childs[i];
                for (var j = 0; j < yAxis.childs.length; j++) {
                    series.push(yAxis.childs[j]);
                }
            }
            return series;
        };
        return ChartManagerChart;
    }());
    exports.ChartManagerChart = ChartManagerChart;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRNYW5hZ2VyQ2hhcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvY2hhcnRNYW5hZ2VyQ2hhcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBT0EsSUFBWSxTQUlYO0lBSkQsV0FBWSxTQUFTO1FBQ2pCLCtDQUFPLENBQUE7UUFDUCwrQ0FBTyxDQUFBO1FBQ1AsaURBQVEsQ0FBQTtJQUNaLENBQUMsRUFKVyxTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQUlwQjtJQUVEO1FBd0JJOzs7OztXQUtHO1FBQ0gsMkJBQVksSUFBWSxFQUFFLElBQW1DO1lBQW5DLHFCQUFBLEVBQUEsT0FBa0IsU0FBUyxDQUFDLE9BQU87WUF4QjdELGlCQUFZLEdBQVksS0FBSyxDQUFDO1lBQzlCLGdCQUFXLEdBQVksSUFBSSxDQUFDO1lBQzVCLFlBQU8sR0FBWSxJQUFJLENBQUM7WUFjaEIsc0JBQWlCLEdBQVUsQ0FBQyxDQUFDO1lBU2pDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQVMsQ0FBQztZQUNqQyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUM1QixDQUFDO1FBMUJELHNCQUFXLDZDQUFjO2lCQUF6QjtnQkFDSSxRQUFRLElBQUksQ0FBQyxTQUFTLEVBQUU7b0JBQ3BCLEtBQUssU0FBUyxDQUFDLE9BQU87d0JBQ2xCLE9BQU8sSUFBSSxDQUFDO29CQUNoQixLQUFLLFNBQVMsQ0FBQyxPQUFPO3dCQUNsQixPQUFPLElBQUksQ0FBQztvQkFDaEIsS0FBSyxTQUFTLENBQUMsUUFBUTt3QkFDbkIsT0FBTyxLQUFLLENBQUM7aUJB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LFNBQVMsQ0FBQyxPQUFPO29CQUNsQixLQUFLLEdBQUcsSUFBSSxDQUFDO29CQUNiLE1BQU07Z0JBQ1YsS0FBSyxTQUFTLENBQUMsUUFBUTtvQkFDbkIsS0FBSyxHQUFHLEtBQUssQ0FBQztvQkFDZCxNQUFNO2FBQ2I7WUFDRCxPQUFPLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSCx1Q0FBVyxHQUFYLFVBQVksUUFBaUI7WUFDekIsSUFBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUM7UUFDL0IsQ0FBQztRQUVELHdDQUFZLEdBQVo7WUFDSSxJQUFJLE1BQU0sR0FBRyxJQUFJLEtBQUssRUFBYyxDQUFDO1lBQ3JDLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztnQkFDdkMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0IsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO29CQUN4QyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDaEM7YUFDSjtZQUNELE9BQU8sTUFBTSxDQUFDO1FBQ2xCLENBQUM7UUFDTCx3QkFBQztJQUFELENBQUMsQUF0V0QsSUFzV0M7SUF0V1ksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUNoYXJ0TWFuYWdlckNoYXJ0IH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9jaGFydE1hbmFnZXJDaGFydEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4vYmFzZVNlcmllc1wiO1xyXG5pbXBvcnQgeyBTY2FsZSB9IGZyb20gXCIuL3NjYWxlXCI7XHJcbmltcG9ydCB7IElDaGFydE1hbmFnZXJEYXRhTW9kZWwgfSBmcm9tIFwiLi4vZGF0YU1vZGVsc1wiO1xyXG5pbXBvcnQgeyBJU2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3BlcnNpc3RlbmNlL2ludGVyZmFjZXMvc2V0dGluZ3NJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3BlcnNpc3RlbmNlL3NldHRpbmdzXCI7XHJcblxyXG5leHBvcnQgZW51bSBDaGFydFR5cGV7XHJcbiAgICBZVENoYXJ0LFxyXG4gICAgWFlDaGFydCxcclxuICAgIEZGVENoYXJ0XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDaGFydE1hbmFnZXJDaGFydCBpbXBsZW1lbnRzIElDaGFydE1hbmFnZXJDaGFydHtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIGNoYXJ0VHlwZTogQ2hhcnRUeXBlO1xyXG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcclxuICAgIGNoaWxkczogU2NhbGVbXTtcclxuICAgIGlzRGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgICBkcm9wUG9zc2libGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGV4cGFuZFN0YXRlOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIGlzR3JvdXA6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgYWRkaXRpb25hbEluZm8oKTogc3RyaW5nIHtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuY2hhcnRUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgQ2hhcnRUeXBlLlhZQ2hhcnQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ1hZJztcclxuICAgICAgICAgICAgY2FzZSBDaGFydFR5cGUuWVRDaGFydDpcclxuICAgICAgICAgICAgICAgIHJldHVybiAnWVQnO1xyXG4gICAgICAgICAgICBjYXNlIENoYXJ0VHlwZS5GRlRDaGFydDpcclxuICAgICAgICAgICAgICAgIHJldHVybiAnRkZUJztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBuZXh0VW5pcXVlU2NhbGVJZDpudW1iZXIgPSAxO1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQ2hhcnRNYW5hZ2VyQ2hhcnQuXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gICAgICogQHBhcmFtIHtDaGFydFR5cGV9IHR5cGVcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJDaGFydFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHR5cGU6IENoYXJ0VHlwZSA9IENoYXJ0VHlwZS5ZVENoYXJ0KXtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuY2hhcnRUeXBlID0gdHlwZTtcclxuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gXCJcIjtcclxuICAgICAgICB0aGlzLmNoaWxkcyA9IG5ldyBBcnJheTxTY2FsZT4oKTtcclxuICAgICAgICB0aGlzLmlzRGlzYWJsZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTZXR0aW5ncygpOiBJU2V0dGluZ3N7XHJcbiAgICAgICAgbGV0IHNjYWxlcyA9IHRoaXMuZ2V0Q2hpbGRzKCk7XHJcbiAgICAgICAgbGV0IHNjYWxlRXhwb3J0ID0gbmV3IEFycmF5PElTZXR0aW5ncz4oKTtcclxuICAgICAgICBzY2FsZXMuZm9yRWFjaChzY2FsZSA9PntcclxuICAgICAgICAgICAgc2NhbGVFeHBvcnQucHVzaChzY2FsZS5nZXRTZXR0aW5ncygpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgc2V0dGluZ3MgPSBuZXcgU2V0dGluZ3MoXCJDaGFydFwiKTtcclxuICAgICAgICBzZXR0aW5ncy5zZXRWYWx1ZShcIm5hbWVcIiwgdGhpcy5uYW1lKTtcclxuICAgICAgICBzZXR0aW5ncy5zZXRWYWx1ZShcInR5cGVcIiwgdGhpcy5jaGFydFR5cGUpO1xyXG4gICAgICAgIHNldHRpbmdzLnNldFZhbHVlKFwic2NhbGVzXCIsIHNjYWxlRXhwb3J0KTtcclxuICAgICAgICByZXR1cm4gc2V0dGluZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U2V0dGluZ3Moc2V0dGluZ3M6IElTZXR0aW5ncyl7XHJcbiAgICAgICAgbGV0IHNldHRpbmdzT2JqID0gU2V0dGluZ3MuY3JlYXRlKHNldHRpbmdzKTtcclxuICAgICAgICB0aGlzLm5hbWUgPSBzZXR0aW5nc09iai5nZXRWYWx1ZShcIm5hbWVcIik7XHJcbiAgICAgICAgdGhpcy5jaGFydFR5cGUgPSBzZXR0aW5nc09iai5nZXRWYWx1ZShcInR5cGVcIik7ICAgICAgICBcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGFkZERlZmF1bHRZU2NhbGUoZGF0YU1vZGVsOiBJQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsLCBtaW5YOiBudW1iZXIsIG1heFg6IG51bWJlcil7XHJcbiAgICAgICAgLy8gYWRkIGRlZmF1bHQgeUF4aXNcclxuICAgICAgICBsZXQgeVNjYWxlID0gbmV3IFNjYWxlKFwiU2NhbGVfMVwiLCB0aGlzKTtcclxuICAgICAgICB5U2NhbGUubWluWFZhbHVlID0gbWluWDtcclxuICAgICAgICB5U2NhbGUubWF4WFZhbHVlID0gbWF4WDtcclxuICAgICAgICAvL2RhdGFNb2RlbC5hZGRZU2NhbGUodGhpcywgeVNjYWxlKTtcclxuICAgICAgICB0aGlzLmFkZFlTY2FsZSh5U2NhbGUpO1xyXG4gICAgICAgIHlTY2FsZS5ldmVudERhdGFDaGFuZ2VkLmF0dGFjaChkYXRhTW9kZWwuX3NjYWxlRGF0YUNoYW5nZWRIYW5kbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGljb24gZGVmaW5pdGlvbiBmb3IgdGhpcyBjaGFydCBvYmplY3RcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBpY29uRGVmaW5pdGlvbigpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBpY29uRGVmaW5pdGlvbiA9IFwiXCI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGNsYXNzTmFtZXMgPSBcImUtdHJlZWdyaWRjb2xsYXBzZSB0cmVlZ3JpZGNvbGxhcHNlXCI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gQWRkIGNvbGxhcHNlL2V4cGFuZCBpY29uIFxyXG4gICAgICAgIGlmKHRoaXMuZXhwYW5kU3RhdGUgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZXMgKz0gXCJlLXRyZWVncmlkZXhwYW5kIHRyZWVncmlkZXhwYW5kXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGljb25EZWZpbml0aW9uICs9IGA8ZGl2IGNsYXNzPSdgICsgY2xhc3NOYW1lcyArIGAnPjwvZGl2PmA7XHJcbiAgICAgICAgcmV0dXJuIGljb25EZWZpbml0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIHNlcmllIHRvIHRoZSBnaXZlbiBzY2FsZSBpbiB0aGlzIGNoYXJ0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxCYXNlU2VyaWVzPn0gc2VyaWVzXHJcbiAgICAgKiBAcGFyYW0ge1NjYWxlfSBzY2FsZVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlckNoYXJ0XHJcbiAgICAgKi9cclxuICAgIGFkZFNlcmllcyhzZXJpZXM6IEFycmF5PEJhc2VTZXJpZXM+LCBzY2FsZSA6IFNjYWxlKXtcclxuICAgICAgICBpZiAoc2NhbGUgIT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHNjYWxlLmFkZFNlcmllcyhzZXJpZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgdGhlIHNlcmllIGZyb20gdGhpcyBjaGFydCh3aWxsIGJlIHJlbW92ZWQgZnJvbSBjaGlsZCA9PiBZQXhpcylcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNlcmllXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJDaGFydFxyXG4gICAgICovXHJcbiAgICByZW1vdmVTZXJpZShzZXJpZTogQmFzZVNlcmllcyk6IGJvb2xlYW57XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IHlBeGlzID0gdGhpcy5jaGlsZHNbaV07XHJcbiAgICAgICAgICAgIGlmICh5QXhpcy5yZW1vdmVTZXJpZShzZXJpZSkpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjYW5TZXJpZXNCZURyb3BwZWQoc2VyaWVzOiBBcnJheTxCYXNlU2VyaWVzPiwgc2VyaWVDaGFydFR5cGU6IENoYXJ0VHlwZSwgc2FtZUdyb3VwOiBib29sZWFuKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHNlcmllQ2hhcnRUeXBlID09IHRoaXMuY2hhcnRUeXBlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChzZXJpZXMubGVuZ3RoID09IDIgJiYgc2FtZUdyb3VwICYmIHRoaXMuY2hhcnRUeXBlID09IENoYXJ0VHlwZS5YWUNoYXJ0ICYmIHNlcmllQ2hhcnRUeXBlICE9IENoYXJ0VHlwZS5GRlRDaGFydCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoc2VyaWVDaGFydFR5cGUgPT0gQ2hhcnRUeXBlLllUQ2hhcnQgJiYgdGhpcy5jaGFydFR5cGUgPT0gQ2hhcnRUeXBlLkZGVENoYXJ0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgaXQgaXMgcG9zc2libGUgdG8gYWRkIGFuIG90aGVyIGF4aXMoY3VycmVudCBsaW1pdCBpcyAyIHlBeGlzKVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlckNoYXJ0XHJcbiAgICAgKi9cclxuICAgIGNhbkFkZFlBeGlzKCk6IGJvb2xlYW57XHJcbiAgICAgICAgbGV0IG1heFlBeGlzQ291bnQ6IG51bWJlciA9IDI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5jaGFydFR5cGUgPT0gQ2hhcnRUeXBlLlhZQ2hhcnQpIHtcclxuICAgICAgICAgICAgbWF4WUF4aXNDb3VudCA9IDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLmNoaWxkcy5sZW5ndGggPCBtYXhZQXhpc0NvdW50KXtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBmYWxzZSBpZiB0aGVyZSBpcyBvbmx5IG9uZSB5QXhpcyBhdmFpbGFibGVcclxuICAgICAqIFRoZXJlIG11c3QgYWx3YXlzIGJlIG9uZSB5QXhpcyBhdmFpbGFibGU7IHRoZSBsYXN0IHlBeGlzIG1heSBub3QgYmUgZGVsZXRlZFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJDaGFydFxyXG4gICAgICovXHJcbiAgICBjYW5SZW1vdmVZQXhpcygpOiBib29sZWFue1xyXG4gICAgICAgIGxldCBtaW5ZQXhpc0NvdW50OiBudW1iZXIgPSAxO1xyXG4gICAgICAgIGlmKHRoaXMuY2hpbGRzLmxlbmd0aCA8PSBtaW5ZQXhpc0NvdW50KXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBuZXcgeUF4aXMgdG8gdGhlIGNoYXJ0XHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgYWRkZWQgZWxzZSBmYWxzZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U2NhbGV9IHlBeGlzXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJDaGFydFxyXG4gICAgICovXHJcbiAgICBhZGRZU2NhbGUoeUF4aXM6IFNjYWxlKTogYm9vbGVhbntcclxuICAgICAgICBpZih0aGlzLmNhbkFkZFlBeGlzKCkgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAvLyBOb3QgcG9zc2libGUgdG8gYWRkIG1vcmUgeUF4aXMobGltaXQgcmVhY2hlZClcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNoaWxkcy5wdXNoKHlBeGlzKTtcclxuICAgICAgICB0aGlzLm5leHRVbmlxdWVTY2FsZUlkKys7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIGEgeUF4aXMgZnJvbSB0aGUgY2hhcnRcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiByZW1vdmVkLCBlbHNlIGZhbHNlLVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U2NhbGV9IHlBeGlzXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJDaGFydFxyXG4gICAgICovXHJcbiAgICByZW1vdmVZQXhpcyh5QXhpczogU2NhbGUpOiBib29sZWFue1xyXG4gICAgICAgIGlmKHRoaXMuY2FuUmVtb3ZlWUF4aXMoKSA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgIC8vIFRoZXJlIG11c3QgYWx3YXlzIGJlIG9uZSB5QXhpcyBhdmFpbGFibGU7IHRoZSBsYXN0IHlBeGlzIG1heSBub3QgYmUgZGVsZXRlZFxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBpbmRleCA9IC0xO1xyXG4gICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCB0aGlzLmNoaWxkcy5sZW5ndGg7IGorKyl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuY2hpbGRzW2pdID09IHlBeGlzKXtcclxuICAgICAgICAgICAgICAgIGluZGV4ID0gajtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hpbGRzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBuYW1lIG9mIHRoZSBuZXh0IHNjYWxlLCB3aGljaCBpcyBjdXJyZW50bHkgbm90IGluIHRoaXMgY2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlckNoYXJ0XHJcbiAgICAgKi9cclxuICAgIGdldE5leHRZQXhpc0lkKCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gXCJTY2FsZV9cIiArIHRoaXMubmV4dFVuaXF1ZVNjYWxlSWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIHNlcmllIG9yIGl0cyBvbmx5IGNoaWxkIChGRlQpIGlzIGluIHRoZSBjaGFydCwgZWxzZSBmYWxzZSBcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PEJhc2VTZXJpZXM+fSBzZXJpZVxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyQ2hhcnRcclxuICAgICAqL1xyXG4gICAgaGFzU2VyaWVzKHNlcmllczogQXJyYXk8QmFzZVNlcmllcz4pOiBib29sZWFue1xyXG4gICAgICAgIGxldCBzZXJpZXNJbkNoYXJ0OiBudW1iZXIgPSAwO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCB5QXhpcyA9IHRoaXMuY2hpbGRzW2ldO1xyXG4gICAgICAgICAgICAvL251bWJlciBvZiBkcm9wcGVkIHNlcmllcyB0aGF0IGFyZSBhbHJlYWR5IGluIHRoZSBjaGFydCBcclxuICAgICAgICAgICAgc2VyaWVzSW5DaGFydCA9IHNlcmllc0luQ2hhcnQgKyB5QXhpcy5udW1iZXJPZk1hdGNoaW5nU2VyaWVzKHNlcmllcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzZXJpZXNJbkNoYXJ0ID09IHNlcmllcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBzZXJpZSBpcyBpbiB0aGUgY2hhcnQsIGVsc2UgZmFsc2UgXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtCYXNlU2VyaWVzfSBzZXJpZVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJDaGFydFxyXG4gICAgICovXHJcbiAgICBoYXNTZXJpZShzZXJpZTogQmFzZVNlcmllcyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCB5QXhpcyA9IHRoaXMuY2hpbGRzW2ldO1xyXG4gICAgICAgICAgICBpZiAoeUF4aXMuaGFzU2VyaWUoc2VyaWUpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB5QXhpcyBvYmplY3QgZm9yIHRoZSBnaXZlbiB5QXhpcyBuYW1lXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHlBeGlzSWRcclxuICAgICAqIEByZXR1cm5zIHsoU2NhbGV8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJDaGFydFxyXG4gICAgICovXHJcbiAgICBnZXRZU2NhbGUoeUF4aXNJZDogc3RyaW5nKTogU2NhbGV8dW5kZWZpbmVke1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuY2hpbGRzW2ldLmlkID09IHlBeGlzSWQpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2hpbGRzW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB5QXhpcyBvYmplY3QgZm9yIHRoZSBnaXZlbiBzZXJpZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVcclxuICAgICAqIEByZXR1cm5zIHsoU2NhbGV8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJDaGFydFxyXG4gICAgICovXHJcbiAgICBnZXRZQXhpc0ZvclNlcmllKHNlcmllIDogQmFzZVNlcmllcyk6IFNjYWxlfHVuZGVmaW5lZHtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgdGhpcy5jaGlsZHNbaV0uY2hpbGRzLmxlbmd0aDsgaisrKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuY2hpbGRzW2ldLmNoaWxkc1tqXSA9PSBzZXJpZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2hpbGRzW2ldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBpZCBvZiB0aGUgZmlyc3QgeUF4aXMgXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJDaGFydFxyXG4gICAgICovXHJcbiAgICBnZXREZWZhdWx0WUF4aXNJZCgpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hpbGRzWzBdLmlkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhbGwgY2hpbGRzIG9mIHRoaXMgY2hhcnQoZS5nLiB5QXhpcylcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlckNoYXJ0XHJcbiAgICAgKi9cclxuICAgIGdldENoaWxkcygpIHtcclxuICAgICAgICBsZXQgeUF4aXM6IFNjYWxlW10gPSBbXTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICB5QXhpcy5wdXNoKHRoaXMuY2hpbGRzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHlBeGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBzb21lIGFkZGl0aW9uYWwgaW5mb3Mgd2hpY2ggd291bGQgYmUgc2hvd24gaW4gdGhlIHNlY29uZCBjb2x1bW4gaW4gdGhlIGNoYXJ0bWFuYWdlclxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyQ2hhcnRcclxuICAgICAqL1xyXG4gICAgZ2V0QWRkaXRpb25hbEluZm8oKSB7XHJcbiAgICAgICAgbGV0IHZhbHVlO1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5jaGFydFR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBDaGFydFR5cGUuWFlDaGFydDpcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gJ1hZJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIENoYXJ0VHlwZS5ZVENoYXJ0OlxyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSAnWVQnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQ2hhcnRUeXBlLkZGVENoYXJ0OlxyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSAnRkZUJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBjaGFydCBkaXNhYmxlZCBvciBlbmFibGVkXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBkaXNhYmxlZFxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlckNoYXJ0XHJcbiAgICAgKi9cclxuICAgIHNldERpc2FibGVkKGRpc2FibGVkOiBib29sZWFuKXtcclxuICAgICAgICB0aGlzLmlzRGlzYWJsZWQgPSBkaXNhYmxlZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRBbGxTZXJpZXMoKTogQXJyYXk8QmFzZVNlcmllcz57XHJcbiAgICAgICAgbGV0IHNlcmllcyA9IG5ldyBBcnJheTxCYXNlU2VyaWVzPigpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCB5QXhpcyA9IHRoaXMuY2hpbGRzW2ldO1xyXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgeUF4aXMuY2hpbGRzLmxlbmd0aDsgaisrKXtcclxuICAgICAgICAgICAgICAgIHNlcmllcy5wdXNoKHlBeGlzLmNoaWxkc1tqXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNlcmllcztcclxuICAgIH1cclxufSJdfQ==