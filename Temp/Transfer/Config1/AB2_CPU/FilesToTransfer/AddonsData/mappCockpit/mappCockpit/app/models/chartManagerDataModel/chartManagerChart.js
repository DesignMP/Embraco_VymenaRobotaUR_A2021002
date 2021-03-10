define(["require", "exports", "./scale"], function (require, exports, scale_1) {
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
            this.dropPossible = false;
            this.draggedOver = false;
            this.expandState = true;
            this.isGroup = true;
            this.nextUniqueScaleId = 1;
            this.name = name;
            this.chartType = type;
            this.additionalInfo = this.getAdditionalInfo();
            this.description = "";
            this.childs = new Array();
            this.isDisabled = false;
        }
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
                seriesInChart = seriesInChart + yAxis.hasSeries(series);
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
        ChartManagerChart.prototype.hasExactSerie = function (serie) {
            for (var i = 0; i < this.childs.length; i++) {
                var yAxis = this.childs[i];
                if (yAxis.hasExactSerie(serie)) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRNYW5hZ2VyQ2hhcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvY2hhcnRNYW5hZ2VyQ2hhcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBS0EsSUFBWSxTQUlYO0lBSkQsV0FBWSxTQUFTO1FBQ2pCLCtDQUFPLENBQUE7UUFDUCwrQ0FBTyxDQUFBO1FBQ1AsaURBQVEsQ0FBQTtJQUNaLENBQUMsRUFKVyxTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQUlwQjtJQUVEO1FBY0k7Ozs7O1dBS0c7UUFDSCwyQkFBWSxJQUFZLEVBQUUsSUFBZTtZQWJ6QyxpQkFBWSxHQUFZLEtBQUssQ0FBQztZQUM5QixnQkFBVyxHQUFZLEtBQUssQ0FBQztZQUM3QixnQkFBVyxHQUFZLElBQUksQ0FBQztZQUM1QixZQUFPLEdBQVksSUFBSSxDQUFDO1lBRWhCLHNCQUFpQixHQUFVLENBQUMsQ0FBQztZQVNqQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNqQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUN0QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQy9DLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQVMsQ0FBQztZQUNqQyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUU1QixDQUFDO1FBRU0sNENBQWdCLEdBQXZCLFVBQXdCLFNBQWlDLEVBQUUsSUFBWSxFQUFFLElBQVk7WUFDakYsb0JBQW9CO1lBQ3BCLElBQUksTUFBTSxHQUFHLElBQUksYUFBSyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN4QyxNQUFNLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUN4QixN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U0FBUyxDQUFDLE9BQU87b0JBQ2xCLEtBQUssR0FBRyxJQUFJLENBQUM7b0JBQ2IsTUFBTTtnQkFDVixLQUFLLFNBQVMsQ0FBQyxRQUFRO29CQUNuQixLQUFLLEdBQUcsS0FBSyxDQUFDO29CQUNkLE1BQU07YUFDYjtZQUNELE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNILHVDQUFXLEdBQVgsVUFBWSxRQUFpQjtZQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQztRQUMvQixDQUFDO1FBRUQsd0NBQVksR0FBWjtZQUNJLElBQUksTUFBTSxHQUFHLElBQUksS0FBSyxFQUFjLENBQUM7WUFDckMsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUN2QyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7b0JBQ3hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNoQzthQUNKO1lBQ0QsT0FBTyxNQUFNLENBQUM7UUFDbEIsQ0FBQztRQUNMLHdCQUFDO0lBQUQsQ0FBQyxBQTFVRCxJQTBVQztJQTFVWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ2hhcnRNYW5hZ2VyQ2hhcnQgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL2NoYXJ0TWFuYWdlckNoYXJ0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEJhc2VTZXJpZXMgfSBmcm9tIFwiLi9iYXNlU2VyaWVzXCI7XHJcbmltcG9ydCB7IFNjYWxlIH0gZnJvbSBcIi4vc2NhbGVcIjtcclxuaW1wb3J0IHsgSUNoYXJ0TWFuYWdlckRhdGFNb2RlbCB9IGZyb20gXCIuLi9kYXRhTW9kZWxzXCI7XHJcblxyXG5leHBvcnQgZW51bSBDaGFydFR5cGV7XHJcbiAgICBZVENoYXJ0LFxyXG4gICAgWFlDaGFydCxcclxuICAgIEZGVENoYXJ0XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDaGFydE1hbmFnZXJDaGFydCBpbXBsZW1lbnRzIElDaGFydE1hbmFnZXJDaGFydHtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIGFkZGl0aW9uYWxJbmZvOiBzdHJpbmc7XHJcbiAgICBjaGFydFR5cGU6IENoYXJ0VHlwZTtcclxuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgICBjaGlsZHM6IFNjYWxlW107XHJcbiAgICBpc0Rpc2FibGVkOiBib29sZWFuO1xyXG4gICAgZHJvcFBvc3NpYmxlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBkcmFnZ2VkT3ZlcjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgZXhwYW5kU3RhdGU6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgaXNHcm91cDogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgcHJpdmF0ZSBuZXh0VW5pcXVlU2NhbGVJZDpudW1iZXIgPSAxO1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQ2hhcnRNYW5hZ2VyQ2hhcnQuXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gICAgICogQHBhcmFtIHtDaGFydFR5cGV9IHR5cGVcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJDaGFydFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHR5cGU6IENoYXJ0VHlwZSl7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLmNoYXJ0VHlwZSA9IHR5cGU7XHJcbiAgICAgICAgdGhpcy5hZGRpdGlvbmFsSW5mbyA9IHRoaXMuZ2V0QWRkaXRpb25hbEluZm8oKTtcclxuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gXCJcIjtcclxuICAgICAgICB0aGlzLmNoaWxkcyA9IG5ldyBBcnJheTxTY2FsZT4oKTtcclxuICAgICAgICB0aGlzLmlzRGlzYWJsZWQgPSBmYWxzZTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZERlZmF1bHRZU2NhbGUoZGF0YU1vZGVsOiBJQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsLCBtaW5YOiBudW1iZXIsIG1heFg6IG51bWJlcil7XHJcbiAgICAgICAgLy8gYWRkIGRlZmF1bHQgeUF4aXNcclxuICAgICAgICBsZXQgeVNjYWxlID0gbmV3IFNjYWxlKFwiU2NhbGVfMVwiLCB0aGlzKTtcclxuICAgICAgICB5U2NhbGUubWluWFZhbHVlID0gbWluWDtcclxuICAgICAgICB5U2NhbGUubWF4WFZhbHVlID0gbWF4WDtcclxuICAgICAgICAvL2RhdGFNb2RlbC5hZGRZU2NhbGUodGhpcywgeVNjYWxlKTtcclxuICAgICAgICB0aGlzLmFkZFlTY2FsZSh5U2NhbGUpO1xyXG4gICAgICAgIHlTY2FsZS5ldmVudERhdGFDaGFuZ2VkLmF0dGFjaChkYXRhTW9kZWwuX3NjYWxlRGF0YUNoYW5nZWRIYW5kbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGljb24gZGVmaW5pdGlvbiBmb3IgdGhpcyBjaGFydCBvYmplY3RcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyQ2hhcnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBpY29uRGVmaW5pdGlvbigpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBpY29uRGVmaW5pdGlvbiA9IFwiXCI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGNsYXNzTmFtZXMgPSBcImUtdHJlZWdyaWRjb2xsYXBzZSB0cmVlZ3JpZGNvbGxhcHNlXCI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gQWRkIGNvbGxhcHNlL2V4cGFuZCBpY29uIFxyXG4gICAgICAgIGlmKHRoaXMuZXhwYW5kU3RhdGUgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZXMgKz0gXCJlLXRyZWVncmlkZXhwYW5kIHRyZWVncmlkZXhwYW5kXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGljb25EZWZpbml0aW9uICs9IGA8ZGl2IGNsYXNzPSdgICsgY2xhc3NOYW1lcyArIGAnPjwvZGl2PmA7XHJcbiAgICAgICAgcmV0dXJuIGljb25EZWZpbml0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIHNlcmllIHRvIHRoZSBnaXZlbiBzY2FsZSBpbiB0aGlzIGNoYXJ0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxCYXNlU2VyaWVzPn0gc2VyaWVzXHJcbiAgICAgKiBAcGFyYW0ge1NjYWxlfSBzY2FsZVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlckNoYXJ0XHJcbiAgICAgKi9cclxuICAgIGFkZFNlcmllcyhzZXJpZXM6IEFycmF5PEJhc2VTZXJpZXM+LCBzY2FsZSA6IFNjYWxlKXtcclxuICAgICAgICBpZiAoc2NhbGUgIT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHNjYWxlLmFkZFNlcmllcyhzZXJpZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgdGhlIHNlcmllIGZyb20gdGhpcyBjaGFydCh3aWxsIGJlIHJlbW92ZWQgZnJvbSBjaGlsZCA9PiBZQXhpcylcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNlcmllXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJDaGFydFxyXG4gICAgICovXHJcbiAgICByZW1vdmVTZXJpZShzZXJpZTogQmFzZVNlcmllcyk6IGJvb2xlYW57XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IHlBeGlzID0gdGhpcy5jaGlsZHNbaV07XHJcbiAgICAgICAgICAgIGlmICh5QXhpcy5yZW1vdmVTZXJpZShzZXJpZSkpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjYW5TZXJpZXNCZURyb3BwZWQoc2VyaWVzOiBBcnJheTxCYXNlU2VyaWVzPiwgc2VyaWVDaGFydFR5cGU6IENoYXJ0VHlwZSwgc2FtZUdyb3VwOiBib29sZWFuKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHNlcmllQ2hhcnRUeXBlID09IHRoaXMuY2hhcnRUeXBlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChzZXJpZXMubGVuZ3RoID09IDIgJiYgc2FtZUdyb3VwICYmIHRoaXMuY2hhcnRUeXBlID09IENoYXJ0VHlwZS5YWUNoYXJ0ICYmIHNlcmllQ2hhcnRUeXBlICE9IENoYXJ0VHlwZS5GRlRDaGFydCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoc2VyaWVDaGFydFR5cGUgPT0gQ2hhcnRUeXBlLllUQ2hhcnQgJiYgdGhpcy5jaGFydFR5cGUgPT0gQ2hhcnRUeXBlLkZGVENoYXJ0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgaXQgaXMgcG9zc2libGUgdG8gYWRkIGFuIG90aGVyIGF4aXMoY3VycmVudCBsaW1pdCBpcyAyIHlBeGlzKVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlckNoYXJ0XHJcbiAgICAgKi9cclxuICAgIGNhbkFkZFlBeGlzKCk6IGJvb2xlYW57XHJcbiAgICAgICAgbGV0IG1heFlBeGlzQ291bnQ6IG51bWJlciA9IDI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5jaGFydFR5cGUgPT0gQ2hhcnRUeXBlLlhZQ2hhcnQpIHtcclxuICAgICAgICAgICAgbWF4WUF4aXNDb3VudCA9IDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLmNoaWxkcy5sZW5ndGggPCBtYXhZQXhpc0NvdW50KXtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBmYWxzZSBpZiB0aGVyZSBpcyBvbmx5IG9uZSB5QXhpcyBhdmFpbGFibGVcclxuICAgICAqIFRoZXJlIG11c3QgYWx3YXlzIGJlIG9uZSB5QXhpcyBhdmFpbGFibGU7IHRoZSBsYXN0IHlBeGlzIG1heSBub3QgYmUgZGVsZXRlZFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJDaGFydFxyXG4gICAgICovXHJcbiAgICBjYW5SZW1vdmVZQXhpcygpOiBib29sZWFue1xyXG4gICAgICAgIGxldCBtaW5ZQXhpc0NvdW50OiBudW1iZXIgPSAxO1xyXG4gICAgICAgIGlmKHRoaXMuY2hpbGRzLmxlbmd0aCA8PSBtaW5ZQXhpc0NvdW50KXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBuZXcgeUF4aXMgdG8gdGhlIGNoYXJ0XHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgYWRkZWQgZWxzZSBmYWxzZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U2NhbGV9IHlBeGlzXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJDaGFydFxyXG4gICAgICovXHJcbiAgICBhZGRZU2NhbGUoeUF4aXM6IFNjYWxlKTogYm9vbGVhbntcclxuICAgICAgICBpZih0aGlzLmNhbkFkZFlBeGlzKCkgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAvLyBOb3QgcG9zc2libGUgdG8gYWRkIG1vcmUgeUF4aXMobGltaXQgcmVhY2hlZClcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNoaWxkcy5wdXNoKHlBeGlzKTtcclxuICAgICAgICB0aGlzLm5leHRVbmlxdWVTY2FsZUlkKys7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIGEgeUF4aXMgZnJvbSB0aGUgY2hhcnRcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiByZW1vdmVkLCBlbHNlIGZhbHNlLVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U2NhbGV9IHlBeGlzXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJDaGFydFxyXG4gICAgICovXHJcbiAgICByZW1vdmVZQXhpcyh5QXhpczogU2NhbGUpOiBib29sZWFue1xyXG4gICAgICAgIGlmKHRoaXMuY2FuUmVtb3ZlWUF4aXMoKSA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgIC8vIFRoZXJlIG11c3QgYWx3YXlzIGJlIG9uZSB5QXhpcyBhdmFpbGFibGU7IHRoZSBsYXN0IHlBeGlzIG1heSBub3QgYmUgZGVsZXRlZFxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBpbmRleCA9IC0xO1xyXG4gICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCB0aGlzLmNoaWxkcy5sZW5ndGg7IGorKyl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuY2hpbGRzW2pdID09IHlBeGlzKXtcclxuICAgICAgICAgICAgICAgIGluZGV4ID0gajtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hpbGRzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBuYW1lIG9mIHRoZSBuZXh0IHNjYWxlLCB3aGljaCBpcyBjdXJyZW50bHkgbm90IGluIHRoaXMgY2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlckNoYXJ0XHJcbiAgICAgKi9cclxuICAgIGdldE5leHRZQXhpc0lkKCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gXCJTY2FsZV9cIiArIHRoaXMubmV4dFVuaXF1ZVNjYWxlSWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIHNlcmllIG9yIGl0cyBvbmx5IGNoaWxkIChGRlQpIGlzIGluIHRoZSBjaGFydCwgZWxzZSBmYWxzZSBcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PEJhc2VTZXJpZXM+fSBzZXJpZVxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyQ2hhcnRcclxuICAgICAqL1xyXG4gICAgaGFzU2VyaWVzKHNlcmllczogQXJyYXk8QmFzZVNlcmllcz4pOiBib29sZWFue1xyXG4gICAgICAgIGxldCBzZXJpZXNJbkNoYXJ0OiBudW1iZXIgPSAwO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCB5QXhpcyA9IHRoaXMuY2hpbGRzW2ldO1xyXG4gICAgICAgICAgICAvL251bWJlciBvZiBkcm9wcGVkIHNlcmllcyB0aGF0IGFyZSBhbHJlYWR5IGluIHRoZSBjaGFydCBcclxuICAgICAgICAgICAgc2VyaWVzSW5DaGFydCA9IHNlcmllc0luQ2hhcnQgKyB5QXhpcy5oYXNTZXJpZXMoc2VyaWVzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHNlcmllc0luQ2hhcnQgPT0gc2VyaWVzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIHNlcmllIGlzIGluIHRoZSBjaGFydCwgZWxzZSBmYWxzZSBcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNlcmllXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlckNoYXJ0XHJcbiAgICAgKi9cclxuICAgIGhhc0V4YWN0U2VyaWUoc2VyaWU6IEJhc2VTZXJpZXMpOiBib29sZWFuIHtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgeUF4aXMgPSB0aGlzLmNoaWxkc1tpXTtcclxuICAgICAgICAgICAgaWYgKHlBeGlzLmhhc0V4YWN0U2VyaWUoc2VyaWUpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB5QXhpcyBvYmplY3QgZm9yIHRoZSBnaXZlbiB5QXhpcyBuYW1lXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHlBeGlzSWRcclxuICAgICAqIEByZXR1cm5zIHsoU2NhbGV8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJDaGFydFxyXG4gICAgICovXHJcbiAgICBnZXRZU2NhbGUoeUF4aXNJZDogc3RyaW5nKTogU2NhbGV8dW5kZWZpbmVke1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuY2hpbGRzW2ldLmlkID09IHlBeGlzSWQpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2hpbGRzW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB5QXhpcyBvYmplY3QgZm9yIHRoZSBnaXZlbiBzZXJpZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVcclxuICAgICAqIEByZXR1cm5zIHsoU2NhbGV8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJDaGFydFxyXG4gICAgICovXHJcbiAgICBnZXRZQXhpc0ZvclNlcmllKHNlcmllIDogQmFzZVNlcmllcyk6IFNjYWxlfHVuZGVmaW5lZHtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgdGhpcy5jaGlsZHNbaV0uY2hpbGRzLmxlbmd0aDsgaisrKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuY2hpbGRzW2ldLmNoaWxkc1tqXSA9PSBzZXJpZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2hpbGRzW2ldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBpZCBvZiB0aGUgZmlyc3QgeUF4aXMgXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJDaGFydFxyXG4gICAgICovXHJcbiAgICBnZXREZWZhdWx0WUF4aXNJZCgpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hpbGRzWzBdLmlkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhbGwgY2hpbGRzIG9mIHRoaXMgY2hhcnQoZS5nLiB5QXhpcylcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlckNoYXJ0XHJcbiAgICAgKi9cclxuICAgIGdldENoaWxkcygpIHtcclxuICAgICAgICBsZXQgeUF4aXM6IFNjYWxlW10gPSBbXTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICB5QXhpcy5wdXNoKHRoaXMuY2hpbGRzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHlBeGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBzb21lIGFkZGl0aW9uYWwgaW5mb3Mgd2hpY2ggd291bGQgYmUgc2hvd24gaW4gdGhlIHNlY29uZCBjb2x1bW4gaW4gdGhlIGNoYXJ0bWFuYWdlclxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyQ2hhcnRcclxuICAgICAqL1xyXG4gICAgZ2V0QWRkaXRpb25hbEluZm8oKSB7XHJcbiAgICAgICAgbGV0IHZhbHVlO1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5jaGFydFR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBDaGFydFR5cGUuWFlDaGFydDpcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gJ1hZJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIENoYXJ0VHlwZS5ZVENoYXJ0OlxyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSAnWVQnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQ2hhcnRUeXBlLkZGVENoYXJ0OlxyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSAnRkZUJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBjaGFydCBkaXNhYmxlZCBvciBlbmFibGVkXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBkaXNhYmxlZFxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlckNoYXJ0XHJcbiAgICAgKi9cclxuICAgIHNldERpc2FibGVkKGRpc2FibGVkOiBib29sZWFuKXtcclxuICAgICAgICB0aGlzLmlzRGlzYWJsZWQgPSBkaXNhYmxlZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRBbGxTZXJpZXMoKTogQXJyYXk8QmFzZVNlcmllcz57XHJcbiAgICAgICAgbGV0IHNlcmllcyA9IG5ldyBBcnJheTxCYXNlU2VyaWVzPigpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCB5QXhpcyA9IHRoaXMuY2hpbGRzW2ldO1xyXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgeUF4aXMuY2hpbGRzLmxlbmd0aDsgaisrKXtcclxuICAgICAgICAgICAgICAgIHNlcmllcy5wdXNoKHlBeGlzLmNoaWxkc1tqXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNlcmllcztcclxuICAgIH1cclxufSJdfQ==