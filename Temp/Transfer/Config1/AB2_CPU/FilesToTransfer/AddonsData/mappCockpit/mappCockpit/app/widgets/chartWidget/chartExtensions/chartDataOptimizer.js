define(["require", "exports", "../../../common/math/lineReductionAlgorithm/rdp", "../../../common/math/mathX"], function (require, exports, rdp_1, mathX_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Implements and optimizations for chart signal data
     *
     * @class ChartDataOptimizer
     */
    var ChartDataOptimizer = /** @class */ (function () {
        /**
         * Creates an instance of class ChartDataOptimizer
         * @param {IChartSeriesProvider} seriesProvider
         * @memberof ChartDataOptimizer
         */
        function ChartDataOptimizer(seriesProvider) {
            this._seriesProvider = seriesProvider;
            this.rdp = new rdp_1.RDP();
        }
        /**
        * The default method just passes the points originally
        *
        * @param {*} chartSeries
        * @param {*} chartInstance
        * @returns
        * @memberof ChartDataOptimizer
        */
        ChartDataOptimizer.prototype.trimSeriesForChartBounds = function (chartSeries, chartInstance) {
            var seriesName = chartSeries.name;
            var serie = this._seriesProvider.series.filter(function (serie) {
                //console.log(serie.id, seriesName);
                return serie.id === seriesName; //
            });
            var optimizedSeriesPoints = [];
            if (serie.length === 1) {
                var signalPoints = serie[0].rawPoints;
                for (var i = 0; i < signalPoints.length; i++) {
                    optimizedSeriesPoints.push(new ChartPoint(i, true, signalPoints[i].x, signalPoints[i].y));
                }
            }
            return optimizedSeriesPoints;
        };
        /**
        * Trims and optimizes the trace data to fit in the destination range and ui area.
        *
        * @param {*} chartSeries
        * @param {*} chartInstance
        * @returns
        * @memberof ChartDataOptimizer
        */
        ChartDataOptimizer.prototype.trimSeriesForChartBoundsXY = function (chartSeries, chartInstance) {
            return this.trimSeriesForChartBounds2D(chartSeries, chartInstance);
        };
        ChartDataOptimizer.prototype.trimSeriesForChartBoundsYt = function (chartSeries, chartInstance) {
            var canvasBounds = {
                x: chartInstance.canvasX,
                y: chartInstance.canvasY,
                width: chartInstance.canvasWidth,
                height: chartInstance.canvasHeight,
            };
            var seriesBounds = {
                xMin: chartSeries.xAxis.visibleRange.min,
                xMax: chartSeries.xAxis.visibleRange.max,
                xDelta: chartSeries.xAxis.visibleRange.delta,
                yMin: chartSeries.yAxis.visibleRange.min,
                yMax: chartSeries.yAxis.visibleRange.max,
                yDelta: chartSeries.yAxis.visibleRange.delta,
            };
            var seriesName = chartSeries.name;
            var series = this.getSeries(seriesName);
            var optimizedSeriesPoints = [];
            if (series) {
                // we use the display points for further line optimization processing
                var signalPoints = this.getDisplayPoints(series);
                // find the lower range index
                var iVisibleMin = this.findNearestIndex(signalPoints, chartSeries.xAxis.visibleRange.min, 0, signalPoints.length - 1);
                // adjust to the first min point outside the min axis range 
                while (signalPoints[iVisibleMin].x >= chartSeries.xAxis.visibleRange.min && iVisibleMin > 0) {
                    iVisibleMin--;
                }
                // find the upper range index
                var iVisibleMax = this.findNearestIndex(signalPoints, chartSeries.xAxis.visibleRange.max, 0, signalPoints.length - 1);
                // adjust to the first max point outside the max axis range 
                while (signalPoints[iVisibleMax].x <= chartSeries.xAxis.visibleRange.max && iVisibleMax < signalPoints.length - 1) {
                    iVisibleMax++;
                }
                // get points reduced and optimized for the visible bounds
                optimizedSeriesPoints = this.retriveReducedPointsWithinBounds(signalPoints, canvasBounds, seriesBounds, iVisibleMin, iVisibleMax);
            }
            return optimizedSeriesPoints;
        };
        /**
         * Creates point instances to be used for displaying based on the rawpoints.
         *
         * @private
         * @param {ChartViewSerie} series
         * @memberof ChartDataOptimizer
         */
        ChartDataOptimizer.prototype.getDisplayPoints = function (series) {
            // get the underlying series
            var effectiveSeries = series.serie;
            // create the display points if not yet defined
            if (!effectiveSeries.displayPoints) {
                effectiveSeries.displayPoints = effectiveSeries.rawPoints.map(function (rawPoint, index) { return new ChartPoint(index, true, rawPoint.x, rawPoint.y); });
            }
            return effectiveSeries.displayPoints ? effectiveSeries.displayPoints : [];
        };
        /**
         * Retrieves the requested series
         *
         * @private
         * @param {*} seriesName
         * @returns
         * @memberof ChartDataOptimizer
         */
        ChartDataOptimizer.prototype.getSeries = function (seriesName) {
            var seriesByName = this._seriesProvider.series.filter(function (serie) {
                return serie.id === seriesName;
            });
            return seriesByName.length == 1 ? seriesByName[0] : null;
        };
        /**
       * Finds the item nearest to the specified value
       *
       * @memberof ChartDataOptimizer
       */
        ChartDataOptimizer.prototype.findNearestIndex = function (array, value, iFirst, iLast) {
            // calculate the middle index
            var iMiddle = Math.floor((iFirst + iLast) / 2);
            // if the value matches, we have found the correct index
            if (value == array[iMiddle].x)
                return iMiddle;
            // if the the last possible index is reached, the index with the nearest index is selected
            if (iLast - 1 === iFirst)
                return Math.abs(array[iFirst].x - value) > Math.abs(array[iLast].x - value) ? iLast : iFirst;
            // if the value is greater continue on the higher remaining section
            if (value > array[iMiddle].x)
                return this.findNearestIndex(array, value, iMiddle, iLast);
            // if the value is greater continue on the lower remaining section
            if (value < array[iMiddle].x)
                return this.findNearestIndex(array, value, iFirst, iMiddle);
        };
        /**
     * Optimizes the pointts with respect to the visible area
     *
     * @param {*} points
     * @param {*} canvasBounds
     * @param {*} seriesBounds
     * @returns {*}
     * @memberof ChartDataOptimizer
     */
        ChartDataOptimizer.prototype.retriveReducedPointsWithinBounds = function (points, canvasBounds, seriesBounds, iMin, iMax) {
            var optimizedPoints = [];
            var visiblePointsCount = iMax - iMin;
            // If the points count is under the area pixel width there is no need to optimize.....
            if ((visiblePointsCount) < canvasBounds.width) {
                // ... so we just convert the visble points to chart points
                optimizedPoints = this.getChartPoints(points, iMin, iMax);
            }
            else {
                // ... otherwise we optimze the points to a reduced but still usefull amount.
                optimizedPoints = this.getReducedChartPointsWithinBounds(canvasBounds, seriesBounds, points, iMin, iMax);
            }
            return optimizedPoints;
        };
        /**
      *  Gets the chart points for the specefied range
      *
      * @private
      * @param {*} canvasBounds
      * @param {*} seriesBounds
      * @param {*} points
      * @param {*} iMin
      * @param {*} iMax
      * @param {any[]} pixelPoints
      * @returns
      * @memberof ChartDataOptimizer
      */
        ChartDataOptimizer.prototype.getChartPoints = function (points, iMin, iMax) {
            return points.filter(function (point, i) { return i >= iMin && i <= iMax; });
        };
        /**
         * Reduces the points to a useful count with respect to the visible area
         *
         * @private
         * @param {*} canvasBounds
         * @param {*} seriesBounds
         * @param {*} points
         * @param {*} iMin
         * @param {*} iMax
         * @param {any[]} pixelPoints
         * @returns
         * @memberof ChartDataOptimizer
         */
        ChartDataOptimizer.prototype.getReducedChartPointsWithinBounds = function (canvasBounds, seriesBounds, points, iMin, iMax) {
            // create the pixel point array
            // the width needs to be converted to integer because in the case of active browser zoom the width is passed as float value !
            var canvasWidth = Math.ceil(canvasBounds.width);
            var pixelPoints = new Array(canvasWidth);
            // create a set for receiving the visible points to avoid duplicates
            var optimizedPoints = new Set();
            var xScale = canvasBounds.width / seriesBounds.xDelta;
            if (points.length > 1) {
                for (var iVisiblePoint = iMin; iVisiblePoint <= iMax; iVisiblePoint++) {
                    this.reducePixelPoints(points[iVisiblePoint], seriesBounds, xScale, iVisiblePoint, pixelPoints);
                }
                for (var i = 0; i < pixelPoints.length; i++) {
                    var pixelPoint = pixelPoints[i];
                    if (pixelPoint !== undefined) {
                        this.addPixelSubPoints(pixelPoint, i, optimizedPoints);
                    }
                }
            }
            return Array.from(optimizedPoints);
        };
        /**
       * Adds additional points for marking min and max values within a segment
       *
       * @private
       * @param {*} pixelPoint
       * @param {number} i
       * @param {ChartPoint[]} optimizedPoints
       * @memberof ChartDataOptimizer
       */
        ChartDataOptimizer.prototype.addPixelSubPoints = function (pixelPoint, i, optimizedPoints) {
            // add the first pixel point
            this.addOptimizedPoint(optimizedPoints, i, pixelPoint.firstPoint);
            // add min max points
            if (pixelPoint.yMinPoint.index <= pixelPoint.yMaxPoint.index) {
                this.addOptimizedPoint(optimizedPoints, i, pixelPoint.yMinPoint);
                this.addOptimizedPoint(optimizedPoints, i, pixelPoint.yMaxPoint);
            }
            else {
                this.addOptimizedPoint(optimizedPoints, i, pixelPoint.yMaxPoint);
                this.addOptimizedPoint(optimizedPoints, i, pixelPoint.yMinPoint);
            }
            // add the last point
            this.addOptimizedPoint(optimizedPoints, i, pixelPoint.lastPoint);
        };
        /**
         * Creates and adds a chart point
         *
         * @private
         * @param {ChartPoint[]} optimizedPoints
         * @param {number} i
         * @param {*} pixelPoint
         * @memberof ChartDataOptimizer
         */
        ChartDataOptimizer.prototype.addOptimizedPoint = function (optimizedPoints, i, pixelPoint) {
            optimizedPoints.add(pixelPoint);
        };
        /**
         * Finds the maximum within an array
         *
         * @param {*} values
         * @returns
         * @memberof ChartDataOptimizer
         */
        ChartDataOptimizer.prototype.findMaximum = function (values) {
            var max = values[0];
            for (var i = 0; i < values.length; i++) {
                var value = values[i];
                max = value > max ? value : max;
            }
            return max;
        };
        /**
       * Reduces the pixel points respecting the point density on pixels
       *
       * @private
       * @param {*} visiblePoint
       * @param {*} seriesBounds
       * @param {number} xScale
       * @param {*} iVisiblePoint
       * @param {any[]} pixelPoints
       * @memberof ChartDataOptimizer
       */
        ChartDataOptimizer.prototype.reducePixelPoints = function (visiblePoint, seriesBounds, xScale, iVisiblePoint, pixelPoints) {
            // calculate the pixel offset to axis min
            var xOffset = (visiblePoint.x - seriesBounds.xMin) * (xScale);
            // get the pixel index
            var iPixel = Math.round(xOffset);
            visiblePoint.index = iVisiblePoint;
            this.addPointsForXPixel(pixelPoints, visiblePoint, iPixel);
        };
        /**
         * Adds a point for a corrsponding pixel location
         *
         * @private
         * @param {any[]} pixelPoints
         * @param {number} iPixel
         * @param {*} signalPoint
         * @memberof ChartDataOptimizer
         */
        ChartDataOptimizer.prototype.addPointsForXPixel = function (pixelPoints, signalPoint, iPixel) {
            if (!pixelPoints[iPixel]) {
                // define the first point for this pixel
                pixelPoints[iPixel] = {};
                // initialize the last point as default
                pixelPoints[iPixel].firstPoint = signalPoint;
                pixelPoints[iPixel].lastPoint = signalPoint;
                pixelPoints[iPixel].yMaxPoint = signalPoint;
                pixelPoints[iPixel].yMinPoint = signalPoint;
            }
            else {
                // update the last point for following values on the same pixel
                pixelPoints[iPixel].lastPoint = signalPoint;
                // update min,max
                if (signalPoint.y > pixelPoints[iPixel].yMaxPoint.y) {
                    // update the point containing yMax
                    pixelPoints[iPixel].yMaxPoint = signalPoint;
                }
                if (signalPoint.y < pixelPoints[iPixel].yMinPoint.y) {
                    // update the point containing yMin
                    pixelPoints[iPixel].yMinPoint = signalPoint;
                }
            }
        };
        /**
         * Trims or optimizes series point to be display within a 2D chart
         *
         * @param {*} chartSeries
         * @param {*} chartInstance
         * @returns
         * @memberof ChartDataOptimizer
         */
        ChartDataOptimizer.prototype.trimSeriesForChartBounds2D = function (chartSeries, chartInstance) {
            // the chart points to be calculated
            var chartPoints = [];
            // get the canvas bounds in pixel
            var canvasBounds = this.getChartAreaBoundsInPixel(chartInstance);
            // get the chart area bounds
            var chartAreaBounds = this.getChartAreaBounds(chartSeries);
            // get the series with a matching name
            var dataSeries = this.getSeriesData(chartSeries);
            if (dataSeries) {
                // get the original unmodified points 
                var rawPoints = dataSeries.rawPoints;
                // get the initially simplified data
                var viewPointsData = dataSeries.data;
                // retrieve the points to be displayed       
                var viewSeriesPoints = viewPointsData;
                console.time("calculate reduced chart points");
                // retrieve the visible segment points
                chartPoints = this.retrieveVisibleLineSegmentPoints(viewSeriesPoints, chartAreaBounds);
                // get raw points count covered by the visible segments
                var rawVisiblePointsCount = chartPoints.length > 0 ? chartPoints[chartPoints.length - 1].index - chartPoints[0].index + 1 : 0;
                if (rawVisiblePointsCount > 0) {
                    // calculate the current chart units/pixel
                    var kXUnitsPerPixel = chartAreaBounds.xDelta / canvasBounds.width;
                    var kYUnitsPerPixel = chartAreaBounds.yDelta / canvasBounds.height;
                    // if the current coordinate to pixel ratio falls below the initial ration we need to recalculate the simplified points for the current given view port
                    // to get the best matching approximated simplified line. 
                    if (this.isDetailZoomLevel(viewPointsData, kXUnitsPerPixel, kYUnitsPerPixel)) {
                        // retrieve the points with the precision for requested zoom level 
                        chartPoints = this.retrieveDetailedChartPoints(chartPoints, rawPoints, chartAreaBounds, kXUnitsPerPixel, kYUnitsPerPixel);
                    }
                }
                console.timeEnd("calculate reduced chart points");
                console.log("optimized points: %o", chartPoints.length);
            }
            var optimizedPoints = chartPoints.map(function (point, i) { return new ChartPoint(point.index, point.visible, point.x, point.y); });
            return optimizedPoints;
        };
        /**
         * Gets
         *
         * @private
         * @param {*} chartSeries
         * @returns
         * @memberof ChartDataOptimizer
         */
        ChartDataOptimizer.prototype.getSeriesData = function (chartSeries) {
            var chartViewSeries = this._seriesProvider.series.find(function (series) { return series.id === chartSeries.name; });
            var dataSeries = chartViewSeries ? chartViewSeries.serie : undefined;
            return dataSeries;
        };
        /**
         * Retrieves the data points necessary to satisfy the specified chart bounds and zoom ratio.
         *
         * @private
         * @param {SeriesPoint[]} chartPoints
         * @param {IPoint[]} rawPoints
         * @param {{ xMin: any; xMax: any; xDelta: any; yMin: any; yMax: any; yDelta: any; }} chartAreaBounds
         * @param {number} currentChartPixelRatioX
         * @param {number} currentChartPixelRationY
         * @returns
         * @memberof ChartDataOptimizer
         */
        ChartDataOptimizer.prototype.retrieveDetailedChartPoints = function (chartPoints, rawPoints, chartAreaBounds, currentChartPixelRatioX, currentChartPixelRationY) {
            var lastRawIndex = chartPoints[chartPoints.length - 1].index;
            var firstVisibleRawPointIndex = chartPoints[0].index;
            var lastVisibleRawPointIndex = lastRawIndex < rawPoints.length ? lastRawIndex + 1 : rawPoints.length;
            // retrieve the raw points covered by the visible segments
            var rawVisiblePoints = rawPoints.slice(firstVisibleRawPointIndex, lastVisibleRawPointIndex);
            // update point indices
            this.updateVisibilityIndices(rawVisiblePoints);
            // retrieve the visible line segment points
            chartPoints = this.retrieveVisibleLineSegmentPoints(rawVisiblePoints, chartAreaBounds);
            // if the numbert of chart points is still too high, we need to further simplify the data points
            if (chartPoints.length > 1000) {
                // simplify the remaining visible points according the specified precision and ratio
                chartPoints = this.rdp.simplify(rawVisiblePoints, 0.25, currentChartPixelRatioX, currentChartPixelRationY, false);
                // update point indices
                this.updateVisibilityIndices(chartPoints);
                // retrieve the visible segment points
                chartPoints = this.retrieveVisibleLineSegmentPoints(chartPoints, chartAreaBounds);
            }
            return chartPoints;
        };
        /**
         *
         *
         * @private
         * @param {*} viewPointsData
         * @param {number} currentChartPixelRatioX
         * @param {number} currentChartPixelRationY
         * @returns
         * @memberof ChartDataOptimizer
         */
        ChartDataOptimizer.prototype.isDetailZoomLevel = function (viewPointsData, currentChartPixelRatioX, currentChartPixelRationY) {
            return currentChartPixelRatioX < viewPointsData.pixelRatioX || currentChartPixelRationY < viewPointsData.pixelRatioY;
        };
        /**
         * Updates the indices of the points
         *
         * @private
         * @param {IPoint[]} reducedVisiblePoints
         * @memberof ChartDataOptimizer
         */
        ChartDataOptimizer.prototype.updateVisibilityIndices = function (points) {
            var seriesPoints = points;
            seriesPoints.forEach(function (point, index) { point.index = index; });
        };
        /**
         * Gets the chart area bounds in pixel
         *
         * @private
         * @param {*} chartInstance
         * @returns {{x:number,y:number,width:number,height:number}}
         * @memberof ChartDataOptimizer
         */
        ChartDataOptimizer.prototype.getChartAreaBoundsInPixel = function (chartInstance) {
            return {
                x: chartInstance.canvasX,
                y: chartInstance.canvasY,
                width: chartInstance.canvasWidth,
                height: chartInstance.canvasHeight,
            };
        };
        /**
         * Gets the visible chart area bounds in coordinate units
         *
         * @private
         * @param {*} chartSeries
         * @returns
         * @memberof ChartDataOptimizer
         */
        ChartDataOptimizer.prototype.getChartAreaBounds = function (chartSeries) {
            var chartAreaBounds = {
                xMin: chartSeries.xAxis.range.min,
                xMax: chartSeries.xAxis.range.max,
                xDelta: chartSeries.xAxis.range.delta,
                yMin: chartSeries.yAxis.range.min,
                yMax: chartSeries.yAxis.range.max,
                yDelta: chartSeries.yAxis.range.delta,
            };
            return chartAreaBounds;
        };
        /**
         * Determines if a line intersects a rectangle
         *
         * @param {IPoint} p1
         * @param {IPoint} p2
         * @param {Bounds} bounds
         * @returns
         * @memberof ChartDataOptimizer
         */
        ChartDataOptimizer.prototype.lineIntersectsRectangle = function (p1, p2, bounds) {
            // exclude non intersecting lines
            if ((p1.x < bounds.xMin && p2.x < bounds.xMin) || (p1.y < bounds.yMin && p2.y < bounds.yMin) || (p1.x > bounds.xMax && p2.x > bounds.xMax) || (p1.y > bounds.yMax && p2.y > bounds.yMax))
                return false;
            if (this.rectangleContainsPoint(p1, bounds) || this.rectangleContainsPoint(p2, bounds)) {
                return true;
            }
            try {
                // calculate dy/dx
                var k = (p2.y - p1.y) / (p2.x - p1.x);
                // check if line intersects left border
                var yIntersect = p1.y + k * (bounds.xMin - p1.x);
                if (yIntersect >= bounds.yMin && yIntersect <= bounds.yMax)
                    return true;
                // check if line intersects right border
                yIntersect = p1.y + k * (bounds.xMax - p1.x);
                if (yIntersect >= bounds.yMin && yIntersect <= bounds.yMax)
                    return true;
                // check if line intersects bottom border
                var xIntersec = p1.x + (bounds.yMin - p1.y) / k;
                if (xIntersec >= bounds.xMin && xIntersec <= bounds.xMax)
                    return true;
                // check if line intersects top border
                xIntersec = p1.x + (bounds.yMax - p1.y) / k;
                if (xIntersec >= bounds.xMin && xIntersec <= bounds.xMax)
                    return true;
            }
            catch (error) {
                console.error("lineIntersectsRectangle");
            }
            return false;
        };
        /**
         * Retrieves the line segment points for segments intersecting the specified bounds. The methods adds, if necessary invisible line segments by adding invisible helkper points.
         *
         * @private
         * @param {IPoint[]} points
         * @param {Bounds} bounds
         * @returns
         * @memberof ChartDataOptimizer
         */
        ChartDataOptimizer.prototype.retrieveVisibleLineSegmentPoints = function (points, bounds) {
            if (points.length < 2)
                return points;
            // the available point as series points
            var seriesPoints = points;
            // create the result segment points array
            var lineSegmentPoints = [];
            // holds the last added end point.
            var lastEndPoint = null;
            for (var i = 1; i < seriesPoints.length; i++) {
                var pStart = seriesPoints[i - 1];
                var pEnd = seriesPoints[i];
                // check if the line intersects the specified bounds
                if (this.lineIntersectsRectangle(pStart, pEnd, bounds)) {
                    if (!lastEndPoint) {
                        // at the very beginning we need to add the first start point
                        pStart.visible = true;
                        lineSegmentPoints.push(pStart);
                    }
                    else {
                        // now we continue the line ....
                        // if the line is interrupted ( start and previous end index is not the same), we need to add an invisible helper point to create an invisible segment.
                        // additionally we need to add the start point of the next visible line segment.
                        if (pStart.index != lastEndPoint.index) {
                            // create an invisible helper point
                            var invisibleSegmenStartPoint = Object.create(lastEndPoint);
                            invisibleSegmenStartPoint.visible = false;
                            // add the invisible helper point
                            lineSegmentPoints.push(invisibleSegmenStartPoint);
                            // add the start point of next visible line segment. This is where the line segment is to be continued.
                            pStart.visible = true;
                            lineSegmentPoints.push(pStart);
                        }
                    }
                    // just add the next visible end point
                    pEnd.visible = true;
                    lineSegmentPoints.push(pEnd);
                    lastEndPoint = pEnd;
                }
            }
            return lineSegmentPoints;
        };
        ChartDataOptimizer.prototype.rectangleContainsPoint = function (point, bounds) {
            var xMinDiff = point.x - bounds.xMin;
            var xMaxDiff = bounds.xMax - point.x;
            var yMinDiff = point.y - bounds.yMin;
            var yMaxDiff = bounds.yMax - point.y;
            var xWithinRange = xMinDiff >= 0 && xMaxDiff >= 0;
            var yWithinRange = yMinDiff >= 0 && yMaxDiff >= 0;
            // const xWithinRange = point.x >= bounds.xMin && point.x <= bounds.xMax;
            // const yWithinRange = point.y >= bounds.yMin && point.y <= bounds.yMax;
            var rectanglesContainsPoint = xWithinRange && yWithinRange;
            return rectanglesContainsPoint;
        };
        /**
         * Attaches a series to the chart optimizer. The method in fact just calculates and updates the series bounds.
         *
         * @param {BaseSeries} serie
         * @returns
         * @memberof ChartDataOptimizer
         */
        ChartDataOptimizer.prototype.attachSeries = function (serie) {
            if (serie.rawPoints.length > 1) {
                var signalPoints = serie.rawPoints;
                var xValues = signalPoints.map(function (point) { return point.x; });
                var yValues = signalPoints.map(function (point) { return point.y; });
                var xMin = mathX_1.MathX.min(xValues);
                var xMax = mathX_1.MathX.max(xValues);
                var yMin = mathX_1.MathX.min(yValues);
                var yMax = mathX_1.MathX.max(yValues);
                // update the series bounds
                serie.bounds = { xMin: xMin, xMax: xMax, yMin: yMin, yMax: yMax, width: (xMax - xMin), height: (yMax - yMin) };
                this.clearSeriesDisplayPoints(serie);
            }
            return serie;
        };
        /**
         * Clears eventually existing display points.
         *
         * @private
         * @param {BaseSeries} serie
         * @memberof ChartDataOptimizer
         */
        ChartDataOptimizer.prototype.clearSeriesDisplayPoints = function (serie) {
            serie.displayPoints = null;
        };
        return ChartDataOptimizer;
    }());
    exports.ChartDataOptimizer = ChartDataOptimizer;
    /**
     * Implements the chart point class
     *
     * @class ChartPoint
     */
    var ChartPoint = /** @class */ (function () {
        function ChartPoint(index, visible, x, y) {
            this.index = index;
            this.x = x;
            this.y = y;
            this.xValue = x;
            this.YValues = [y];
            this.visible = visible;
        }
        return ChartPoint;
    }());
    exports.ChartPoint = ChartPoint;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnREYXRhT3B0aW1pemVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0V2lkZ2V0L2NoYXJ0RXh0ZW5zaW9ucy9jaGFydERhdGFPcHRpbWl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBVUE7Ozs7T0FJRztJQUNIO1FBT0k7Ozs7V0FJRztRQUNILDRCQUFZLGNBQW9DO1lBQzVDLElBQUksQ0FBQyxlQUFlLEdBQUcsY0FBYyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxTQUFHLEVBQUUsQ0FBQztRQUN6QixDQUFDO1FBR0Q7Ozs7Ozs7VUFPRTtRQUNGLHFEQUF3QixHQUF4QixVQUF5QixXQUFXLEVBQUUsYUFBYTtZQUUvQyxJQUFJLFVBQVUsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDO1lBQ2xDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFDLEtBQUs7Z0JBQ2pELG9DQUFvQztnQkFDcEMsT0FBTyxLQUFLLENBQUMsRUFBRSxLQUFLLFVBQVUsQ0FBQyxDQUFBLEVBQUU7WUFDckMsQ0FBQyxDQUFDLENBQUM7WUFHSCxJQUFJLHFCQUFxQixHQUFpQixFQUFFLENBQUM7WUFFN0MsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDcEIsSUFBSSxZQUFZLEdBQVMsS0FBSyxDQUFDLENBQUMsQ0FBRSxDQUFDLFNBQVMsQ0FBQztnQkFFN0MsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQzFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLFVBQVUsQ0FBQyxDQUFDLEVBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsWUFBWSxDQUFD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QUM7WUFDWCxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDM0IsQ0FBQztRQUNMLGlCQUFDO0lBQUQsQ0FBQyxBQWpCRCxJQWlCQztJQWpCWSxnQ0FBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElQb2ludCB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY29tbW9uL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQmFzZVNlcmllcyB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2Jhc2VTZXJpZXNcIjtcclxuaW1wb3J0IHsgUkRQIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9tYXRoL2xpbmVSZWR1Y3Rpb25BbGdvcml0aG0vcmRwXCI7XHJcbmltcG9ydCB7IENoYXJ0Vmlld1NlcmllIH0gZnJvbSBcIi4uL2NoYXJ0Vmlld1NlcmllXCI7XHJcbmltcG9ydCB7IE1hdGhYIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9tYXRoL21hdGhYXCI7XHJcblxyXG5cclxudHlwZSBCb3VuZHMgPSB7IHhNaW46IG51bWJlcjsgeE1heDogbnVtYmVyOyB5TWluOiBudW1iZXI7IHlNYXg6IG51bWJlcn07IFxyXG50eXBlIFNlcmllc1BvaW50ID0gSVBvaW50ICYgeyB2aXNpYmxlOmJvb2xlYW4sIGluZGV4fTtcclxuXHJcbi8qKlxyXG4gKiBJbXBsZW1lbnRzIGFuZCBvcHRpbWl6YXRpb25zIGZvciBjaGFydCBzaWduYWwgZGF0YVxyXG4gKlxyXG4gKiBAY2xhc3MgQ2hhcnREYXRhT3B0aW1pemVyXHJcbiAqL1xyXG5jbGFzcyBDaGFydERhdGFPcHRpbWl6ZXIge1xyXG5cclxuICAgIC8vIGhvbGRzIHRoZSBjaGFydCBzaWduYWxzIHNvdXJjZVxyXG4gICAgcHJpdmF0ZSBfc2VyaWVzUHJvdmlkZXI6IElDaGFydFNlcmllc1Byb3ZpZGVyO1xyXG4gICAgcHJpdmF0ZSByZHA6IFJEUDtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIGNsYXNzIENoYXJ0RGF0YU9wdGltaXplclxyXG4gICAgICogQHBhcmFtIHtJQ2hhcnRTZXJpZXNQcm92aWRlcn0gc2VyaWVzUHJvdmlkZXJcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydERhdGFPcHRpbWl6ZXJcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Ioc2VyaWVzUHJvdmlkZXI6IElDaGFydFNlcmllc1Byb3ZpZGVyKSB7XHJcbiAgICAgICAgdGhpcy5fc2VyaWVzUHJvdmlkZXIgPSBzZXJpZXNQcm92aWRlcjtcclxuICAgICAgICB0aGlzLnJkcCA9IG5ldyBSRFAoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIFRoZSBkZWZhdWx0IG1ldGhvZCBqdXN0IHBhc3NlcyB0aGUgcG9pbnRzIG9yaWdpbmFsbHlcclxuICAgICpcclxuICAgICogQHBhcmFtIHsqfSBjaGFydFNlcmllc1xyXG4gICAgKiBAcGFyYW0geyp9IGNoYXJ0SW5zdGFuY2VcclxuICAgICogQHJldHVybnNcclxuICAgICogQG1lbWJlcm9mIENoYXJ0RGF0YU9wdGltaXplclxyXG4gICAgKi9cclxuICAgIHRyaW1TZXJpZXNGb3JDaGFydEJvdW5kcyhjaGFydFNlcmllcywgY2hhcnRJbnN0YW5jZSk6IElQb2ludFtdIHtcclxuXHJcbiAgICAgICAgbGV0IHNlcmllc05hbWUgPSBjaGFydFNlcmllcy5uYW1lO1xyXG4gICAgICAgIGxldCBzZXJpZSA9IHRoaXMuX3Nlcmllc1Byb3ZpZGVyLnNlcmllcy5maWx0ZXIoKHNlcmllKSA9PiB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coc2VyaWUuaWQsIHNlcmllc05hbWUpO1xyXG4gICAgICAgICAgICByZXR1cm4gc2VyaWUuaWQgPT09IHNlcmllc05hbWU7Ly9cclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIGxldCBvcHRpbWl6ZWRTZXJpZXNQb2ludHM6IENoYXJ0UG9pbnRbXSA9IFtdO1xyXG5cclxuICAgICAgICBpZiAoc2VyaWUubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgIGxldCBzaWduYWxQb2ludHMgPSAoPGFueT5zZXJpZVswXSkucmF3UG9pbnRzO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaWduYWxQb2ludHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIG9wdGltaXplZFNlcmllc1BvaW50cy5wdXNoKG5ldyBDaGFydFBvaW50KGksdHJ1ZSwgc2lnbmFsUG9pbnRzW2ldLngsIHNpZ25hbFBvaW50c1tpXS55KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9wdGltaXplZFNlcmllc1BvaW50cztcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIFRyaW1zIGFuZCBvcHRpbWl6ZXMgdGhlIHRyYWNlIGRhdGEgdG8gZml0IGluIHRoZSBkZXN0aW5hdGlvbiByYW5nZSBhbmQgdWkgYXJlYS5cclxuICAgICpcclxuICAgICogQHBhcmFtIHsqfSBjaGFydFNlcmllc1xyXG4gICAgKiBAcGFyYW0geyp9IGNoYXJ0SW5zdGFuY2VcclxuICAgICogQHJldHVybnNcclxuICAgICogQG1lbWJlcm9mIENoYXJ0RGF0YU9wdGltaXplclxyXG4gICAgKi9cclxuICAgIHRyaW1TZXJpZXNGb3JDaGFydEJvdW5kc1hZKGNoYXJ0U2VyaWVzLCBjaGFydEluc3RhbmNlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHJpbVNlcmllc0ZvckNoYXJ0Qm91bmRzMkQoY2hhcnRTZXJpZXMsIGNoYXJ0SW5zdGFuY2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHRyaW1TZXJpZXNGb3JDaGFydEJvdW5kc1l0KGNoYXJ0U2VyaWVzLCBjaGFydEluc3RhbmNlKSB7XHJcblxyXG4gICAgICAgIGxldCBjYW52YXNCb3VuZHMgPSB7XHJcbiAgICAgICAgICAgIHg6IGNoYXJ0SW5zdGFuY2UuY2FudmFzWCxcclxuICAgICAgICAgICAgeTogY2hhcnRJbnN0YW5jZS5jYW52YXNZLFxyXG4gICAgICAgICAgICB3aWR0aDogY2hhcnRJbnN0YW5jZS5jYW52YXNXaWR0aCxcclxuICAgICAgICAgICAgaGVpZ2h0OiBjaGFydEluc3RhbmNlLmNhbnZhc0hlaWdodCxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsZXQgc2VyaWVzQm91bmRzID0ge1xyXG4gICAgICAgICAgICB4TWluOiBjaGFydFNlcmllcy54QXhpcy52aXNpYmxlUmFuZ2UubWluLFxyXG4gICAgICAgICAgICB4TWF4OiBjaGFydFNlcmllcy54QXhpcy52aXNpYmxlUmFuZ2UubWF4LFxyXG4gICAgICAgICAgICB4RGVsdGE6IGNoYXJ0U2VyaWVzLnhBeGlzLnZpc2libGVSYW5nZS5kZWx0YSxcclxuXHJcbiAgICAgICAgICAgIHlNaW46IGNoYXJ0U2VyaWVzLnlBeGlzLnZpc2libGVSYW5nZS5taW4sXHJcbiAgICAgICAgICAgIHlNYXg6IGNoYXJ0U2VyaWVzLnlBeGlzLnZpc2libGVSYW5nZS5tYXgsXHJcbiAgICAgICAgICAgIHlEZWx0YTogY2hhcnRTZXJpZXMueUF4aXMudmlzaWJsZVJhbmdlLmRlbHRhLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxldCBzZXJpZXNOYW1lID0gY2hhcnRTZXJpZXMubmFtZTtcclxuICAgICAgICBsZXQgc2VyaWVzID0gdGhpcy5nZXRTZXJpZXMoc2VyaWVzTmFtZSk7XHJcblxyXG5cclxuICAgICAgICBsZXQgb3B0aW1pemVkU2VyaWVzUG9pbnRzOiBDaGFydFBvaW50W10gPSBbXTtcclxuXHJcbiAgICAgICAgaWYgKHNlcmllcykge1xyXG4gIFxyXG4gICAgICAgICAgICAvLyB3ZSB1c2UgdGhlIGRpc3BsYXkgcG9pbnRzIGZvciBmdXJ0aGVyIGxpbmUgb3B0aW1pemF0aW9uIHByb2Nlc3NpbmdcclxuICAgICAgICAgICAgbGV0IHNpZ25hbFBvaW50cyA9IHRoaXMuZ2V0RGlzcGxheVBvaW50cyhzZXJpZXMpIGFzIElQb2ludFtdO1xyXG5cclxuICAgICAgICAgICAgLy8gZmluZCB0aGUgbG93ZXIgcmFuZ2UgaW5kZXhcclxuICAgICAgICAgICAgbGV0IGlWaXNpYmxlTWluID0gdGhpcy5maW5kTmVhcmVzdEluZGV4KHNpZ25hbFBvaW50cywgY2hhcnRTZXJpZXMueEF4aXMudmlzaWJsZVJhbmdlLm1pbiwgMCwgc2lnbmFsUG9pbnRzLmxlbmd0aCAtIDEpO1xyXG4gICAgICAgICAgICAvLyBhZGp1c3QgdG8gdGhlIGZpcnN0IG1pbiBwb2ludCBvdXRzaWRlIHRoZSBtaW4gYXhpcyByYW5nZSBcclxuICAgICAgICAgICAgd2hpbGUgKHNpZ25hbFBvaW50c1tpVmlzaWJsZU1pbl0ueCA+PSBjaGFydFNlcmllcy54QXhpcy52aXNpYmxlUmFuZ2UubWluICYmIGlWaXNpYmxlTWluID4gMCkge1xyXG4gICAgICAgICAgICAgICAgaVZpc2libGVNaW4tLTsgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBmaW5kIHRoZSB1cHBlciByYW5nZSBpbmRleFxyXG4gICAgICAgICAgICBsZXQgaVZpc2libGVNYXggPSB0aGlzLmZpbmROZWFyZXN0SW5kZXgoc2lnbmFsUG9pbnRzLCBjaGFydFNlcmllcy54QXhpcy52aXNpYmxlUmFuZ2UubWF4LCAwLCBzaWduYWxQb2ludHMubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgICAgIC8vIGFkanVzdCB0byB0aGUgZmlyc3QgbWF4IHBvaW50IG91dHNpZGUgdGhlIG1heCBheGlzIHJhbmdlIFxyXG4gICAgICAgICAgICB3aGlsZSAoc2lnbmFsUG9pbnRzW2lWaXNpYmxlTWF4XS54IDw9IGNoYXJ0U2VyaWVzLnhBeGlzLnZpc2libGVSYW5nZS5tYXggJiYgaVZpc2libGVNYXggPCBzaWduYWxQb2ludHMubGVuZ3RoLTEpIHtcclxuICAgICAgICAgICAgICAgIGlWaXNpYmxlTWF4Kys7ICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gZ2V0IHBvaW50cyByZWR1Y2VkIGFuZCBvcHRpbWl6ZWQgZm9yIHRoZSB2aXNpYmxlIGJvdW5kc1xyXG4gICAgICAgICAgICBvcHRpbWl6ZWRTZXJpZXNQb2ludHMgPSB0aGlzLnJldHJpdmVSZWR1Y2VkUG9pbnRzV2l0aGluQm91bmRzKHNpZ25hbFBvaW50cywgY2FudmFzQm91bmRzLCBzZXJpZXNCb3VuZHMsIGlWaXNpYmxlTWluLCBpVmlzaWJsZU1heCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gb3B0aW1pemVkU2VyaWVzUG9pbnRzO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgcG9pbnQgaW5zdGFuY2VzIHRvIGJlIHVzZWQgZm9yIGRpc3BsYXlpbmcgYmFzZWQgb24gdGhlIHJhd3BvaW50cy5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtDaGFydFZpZXdTZXJpZX0gc2VyaWVzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnREYXRhT3B0aW1pemVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0RGlzcGxheVBvaW50cyhzZXJpZXM6IENoYXJ0Vmlld1NlcmllKTogSVBvaW50W10ge1xyXG5cclxuICAgICAgICAvLyBnZXQgdGhlIHVuZGVybHlpbmcgc2VyaWVzXHJcbiAgICAgICAgbGV0IGVmZmVjdGl2ZVNlcmllcyA9ICg8YW55PnNlcmllcykuc2VyaWU7XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgZGlzcGxheSBwb2ludHMgaWYgbm90IHlldCBkZWZpbmVkXHJcbiAgICAgICAgaWYgKCFlZmZlY3RpdmVTZXJpZXMuZGlzcGxheVBvaW50cykge1xyXG4gICAgICAgICAgICBlZmZlY3RpdmVTZXJpZXMuZGlzcGxheVBvaW50cyA9IGVmZmVjdGl2ZVNlcmllcy5yYXdQb2ludHMubWFwKChyYXdQb2ludCwgaW5kZXgpID0+IHsgcmV0dXJuIG5ldyBDaGFydFBvaW50KGluZGV4LCB0cnVlLCByYXdQb2ludC54LCByYXdQb2ludC55KTsgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlZmZlY3RpdmVTZXJpZXMuZGlzcGxheVBvaW50cyA/IGVmZmVjdGl2ZVNlcmllcy5kaXNwbGF5UG9pbnRzIDpbXTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHJpZXZlcyB0aGUgcmVxdWVzdGVkIHNlcmllc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHNlcmllc05hbWVcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnREYXRhT3B0aW1pemVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0U2VyaWVzKHNlcmllc05hbWU6IGFueSkge1xyXG4gICAgICAgIGxldCBzZXJpZXNCeU5hbWUgPSB0aGlzLl9zZXJpZXNQcm92aWRlci5zZXJpZXMuZmlsdGVyKChzZXJpZSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gc2VyaWUuaWQgPT09IHNlcmllc05hbWU7XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICByZXR1cm4gIHNlcmllc0J5TmFtZS5sZW5ndGggPT0gMSA/IHNlcmllc0J5TmFtZVswXTogbnVsbDtcclxuICAgIFxyXG4gICAgfVxyXG5cclxuICAgICAgLyoqXHJcbiAgICAgKiBGaW5kcyB0aGUgaXRlbSBuZWFyZXN0IHRvIHRoZSBzcGVjaWZpZWQgdmFsdWVcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnREYXRhT3B0aW1pemVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZmluZE5lYXJlc3RJbmRleChhcnJheSwgdmFsdWUsIGlGaXJzdCwgaUxhc3Q6IG51bWJlcikge1xyXG5cclxuICAgICAgICAvLyBjYWxjdWxhdGUgdGhlIG1pZGRsZSBpbmRleFxyXG4gICAgICAgIGNvbnN0IGlNaWRkbGUgPSBNYXRoLmZsb29yKChpRmlyc3QgKyBpTGFzdCkgLyAyKTtcclxuXHJcbiAgICAgICAgLy8gaWYgdGhlIHZhbHVlIG1hdGNoZXMsIHdlIGhhdmUgZm91bmQgdGhlIGNvcnJlY3QgaW5kZXhcclxuICAgICAgICBpZiAodmFsdWUgPT0gYXJyYXlbaU1pZGRsZV0ueCkgcmV0dXJuIGlNaWRkbGU7XHJcblxyXG4gICAgICAgIC8vIGlmIHRoZSB0aGUgbGFzdCBwb3NzaWJsZSBpbmRleCBpcyByZWFjaGVkLCB0aGUgaW5kZXggd2l0aCB0aGUgbmVhcmVzdCBpbmRleCBpcyBzZWxlY3RlZFxyXG4gICAgICAgIGlmIChpTGFzdCAtIDEgPT09IGlGaXJzdCkgcmV0dXJuIE1hdGguYWJzKGFycmF5W2lGaXJzdF0ueCAtIHZhbHVlKSA+IE1hdGguYWJzKGFycmF5W2lMYXN0XS54IC0gdmFsdWUpID8gaUxhc3QgOiBpRmlyc3Q7XHJcblxyXG4gICAgICAgIC8vIGlmIHRoZSB2YWx1ZSBpcyBncmVhdGVyIGNvbnRpbnVlIG9uIHRoZSBoaWdoZXIgcmVtYWluaW5nIHNlY3Rpb25cclxuICAgICAgICBpZiAodmFsdWUgPiBhcnJheVtpTWlkZGxlXS54KSByZXR1cm4gdGhpcy5maW5kTmVhcmVzdEluZGV4KGFycmF5LCB2YWx1ZSwgaU1pZGRsZSwgaUxhc3QpO1xyXG5cclxuICAgICAgICAvLyBpZiB0aGUgdmFsdWUgaXMgZ3JlYXRlciBjb250aW51ZSBvbiB0aGUgbG93ZXIgcmVtYWluaW5nIHNlY3Rpb25cclxuICAgICAgICBpZiAodmFsdWUgPCBhcnJheVtpTWlkZGxlXS54KSByZXR1cm4gdGhpcy5maW5kTmVhcmVzdEluZGV4KGFycmF5LCB2YWx1ZSwgaUZpcnN0LCBpTWlkZGxlKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICogT3B0aW1pemVzIHRoZSBwb2ludHRzIHdpdGggcmVzcGVjdCB0byB0aGUgdmlzaWJsZSBhcmVhXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBwb2ludHNcclxuICAgICAqIEBwYXJhbSB7Kn0gY2FudmFzQm91bmRzXHJcbiAgICAgKiBAcGFyYW0geyp9IHNlcmllc0JvdW5kc1xyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnREYXRhT3B0aW1pemVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmV0cml2ZVJlZHVjZWRQb2ludHNXaXRoaW5Cb3VuZHMocG9pbnRzLCBjYW52YXNCb3VuZHMsIHNlcmllc0JvdW5kcywgaU1pbiwgaU1heCk6IGFueSB7XHJcblxyXG4gICAgICAgIGxldCBvcHRpbWl6ZWRQb2ludHM6IENoYXJ0UG9pbnRbXSA9IFtdO1xyXG5cclxuICAgICAgICBsZXQgdmlzaWJsZVBvaW50c0NvdW50ID0gaU1heCAtIGlNaW47XHJcblxyXG4gICAgICAgIC8vIElmIHRoZSBwb2ludHMgY291bnQgaXMgdW5kZXIgdGhlIGFyZWEgcGl4ZWwgd2lkdGggdGhlcmUgaXMgbm8gbmVlZCB0byBvcHRpbWl6ZS4uLi4uXHJcbiAgICAgICAgaWYgKCh2aXNpYmxlUG9pbnRzQ291bnQpIDwgY2FudmFzQm91bmRzLndpZHRoKSB7XHJcbiAgICAgICAgICAgIC8vIC4uLiBzbyB3ZSBqdXN0IGNvbnZlcnQgdGhlIHZpc2JsZSBwb2ludHMgdG8gY2hhcnQgcG9pbnRzXHJcbiAgICAgICAgICAgIG9wdGltaXplZFBvaW50cyA9IHRoaXMuZ2V0Q2hhcnRQb2ludHMocG9pbnRzLCBpTWluLCBpTWF4KTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgLy8gLi4uIG90aGVyd2lzZSB3ZSBvcHRpbXplIHRoZSBwb2ludHMgdG8gYSByZWR1Y2VkIGJ1dCBzdGlsbCB1c2VmdWxsIGFtb3VudC5cclxuICAgICAgICAgICAgb3B0aW1pemVkUG9pbnRzID0gdGhpcy5nZXRSZWR1Y2VkQ2hhcnRQb2ludHNXaXRoaW5Cb3VuZHMoY2FudmFzQm91bmRzLCBzZXJpZXNCb3VuZHMsIHBvaW50cywgaU1pbiwgaU1heCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gb3B0aW1pemVkUG9pbnRzO1xyXG4gICAgfVxyXG5cclxuICAgICAgIC8qKlxyXG4gICAgICogIEdldHMgdGhlIGNoYXJ0IHBvaW50cyBmb3IgdGhlIHNwZWNlZmllZCByYW5nZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGNhbnZhc0JvdW5kc1xyXG4gICAgICogQHBhcmFtIHsqfSBzZXJpZXNCb3VuZHNcclxuICAgICAqIEBwYXJhbSB7Kn0gcG9pbnRzXHJcbiAgICAgKiBAcGFyYW0geyp9IGlNaW5cclxuICAgICAqIEBwYXJhbSB7Kn0gaU1heFxyXG4gICAgICogQHBhcmFtIHthbnlbXX0gcGl4ZWxQb2ludHNcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnREYXRhT3B0aW1pemVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0Q2hhcnRQb2ludHMocG9pbnRzOiBDaGFydFBvaW50W10sIGlNaW46IG51bWJlciwgaU1heDogbnVtYmVyKSB7XHJcbiAgICAgICAgIHJldHVybiBwb2ludHMuZmlsdGVyKChwb2ludCxpKT0+eyByZXR1cm4gaSA+PSBpTWluICYmIGkgPD0gaU1heCB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWR1Y2VzIHRoZSBwb2ludHMgdG8gYSB1c2VmdWwgY291bnQgd2l0aCByZXNwZWN0IHRvIHRoZSB2aXNpYmxlIGFyZWFcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBjYW52YXNCb3VuZHNcclxuICAgICAqIEBwYXJhbSB7Kn0gc2VyaWVzQm91bmRzXHJcbiAgICAgKiBAcGFyYW0geyp9IHBvaW50c1xyXG4gICAgICogQHBhcmFtIHsqfSBpTWluXHJcbiAgICAgKiBAcGFyYW0geyp9IGlNYXhcclxuICAgICAqIEBwYXJhbSB7YW55W119IHBpeGVsUG9pbnRzXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0RGF0YU9wdGltaXplclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFJlZHVjZWRDaGFydFBvaW50c1dpdGhpbkJvdW5kcyhjYW52YXNCb3VuZHM6IGFueSwgc2VyaWVzQm91bmRzOiBhbnksIHBvaW50czogQ2hhcnRQb2ludFtdLCBpTWluOiBudW1iZXIsIGlNYXg6IG51bWJlcikgOkNoYXJ0UG9pbnRbXXtcclxuICAgICAgICBcclxuICAgICAgICAvLyBjcmVhdGUgdGhlIHBpeGVsIHBvaW50IGFycmF5XHJcbiAgICAgICAgLy8gdGhlIHdpZHRoIG5lZWRzIHRvIGJlIGNvbnZlcnRlZCB0byBpbnRlZ2VyIGJlY2F1c2UgaW4gdGhlIGNhc2Ugb2YgYWN0aXZlIGJyb3dzZXIgem9vbSB0aGUgd2lkdGggaXMgcGFzc2VkIGFzIGZsb2F0IHZhbHVlICFcclxuICAgICAgICBsZXQgY2FudmFzV2lkdGggPSBNYXRoLmNlaWwoY2FudmFzQm91bmRzLndpZHRoKTtcclxuICAgICAgICB2YXIgcGl4ZWxQb2ludHMgPSBuZXcgQXJyYXkoY2FudmFzV2lkdGgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGNyZWF0ZSBhIHNldCBmb3IgcmVjZWl2aW5nIHRoZSB2aXNpYmxlIHBvaW50cyB0byBhdm9pZCBkdXBsaWNhdGVzXHJcbiAgICAgICAgbGV0IG9wdGltaXplZFBvaW50czogU2V0PENoYXJ0UG9pbnQ+ID0gbmV3IFNldDxDaGFydFBvaW50PigpO1xyXG5cclxuICAgICAgICBsZXQgeFNjYWxlID0gY2FudmFzQm91bmRzLndpZHRoIC8gc2VyaWVzQm91bmRzLnhEZWx0YTtcclxuICAgICAgICBpZiAocG9pbnRzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaVZpc2libGVQb2ludCA9IGlNaW47IGlWaXNpYmxlUG9pbnQgPD0gaU1heDsgaVZpc2libGVQb2ludCsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZHVjZVBpeGVsUG9pbnRzKHBvaW50c1tpVmlzaWJsZVBvaW50XSwgc2VyaWVzQm91bmRzLCB4U2NhbGUsIGlWaXNpYmxlUG9pbnQsIHBpeGVsUG9pbnRzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBpeGVsUG9pbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwaXhlbFBvaW50ID0gcGl4ZWxQb2ludHNbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAocGl4ZWxQb2ludCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRQaXhlbFN1YlBvaW50cyhwaXhlbFBvaW50LCBpLCBvcHRpbWl6ZWRQb2ludHMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKG9wdGltaXplZFBvaW50cyk7XHJcbiAgICB9XHJcblxyXG4gICAgICAvKipcclxuICAgICAqIEFkZHMgYWRkaXRpb25hbCBwb2ludHMgZm9yIG1hcmtpbmcgbWluIGFuZCBtYXggdmFsdWVzIHdpdGhpbiBhIHNlZ21lbnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBwaXhlbFBvaW50XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaVxyXG4gICAgICogQHBhcmFtIHtDaGFydFBvaW50W119IG9wdGltaXplZFBvaW50c1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0RGF0YU9wdGltaXplclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZFBpeGVsU3ViUG9pbnRzKHBpeGVsUG9pbnQ6IGFueSwgaTogbnVtYmVyLCBvcHRpbWl6ZWRQb2ludHM6IFNldDxDaGFydFBvaW50Pikge1xyXG5cclxuICAgICAgICAvLyBhZGQgdGhlIGZpcnN0IHBpeGVsIHBvaW50XHJcbiAgICAgICAgdGhpcy5hZGRPcHRpbWl6ZWRQb2ludChvcHRpbWl6ZWRQb2ludHMsIGksIHBpeGVsUG9pbnQuZmlyc3RQb2ludCk7XHJcbiAgICAgICAgLy8gYWRkIG1pbiBtYXggcG9pbnRzXHJcbiAgICAgICAgaWYgKHBpeGVsUG9pbnQueU1pblBvaW50LmluZGV4IDw9IHBpeGVsUG9pbnQueU1heFBvaW50LmluZGV4KSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkT3B0aW1pemVkUG9pbnQob3B0aW1pemVkUG9pbnRzLCBpLCBwaXhlbFBvaW50LnlNaW5Qb2ludCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkT3B0aW1pemVkUG9pbnQob3B0aW1pemVkUG9pbnRzLCBpLCBwaXhlbFBvaW50LnlNYXhQb2ludCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmFkZE9wdGltaXplZFBvaW50KG9wdGltaXplZFBvaW50cywgaSwgcGl4ZWxQb2ludC55TWF4UG9pbnQpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZE9wdGltaXplZFBvaW50KG9wdGltaXplZFBvaW50cywgaSwgcGl4ZWxQb2ludC55TWluUG9pbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBhZGQgdGhlIGxhc3QgcG9pbnRcclxuICAgICAgICB0aGlzLmFkZE9wdGltaXplZFBvaW50KG9wdGltaXplZFBvaW50cywgaSwgcGl4ZWxQb2ludC5sYXN0UG9pbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbmQgYWRkcyBhIGNoYXJ0IHBvaW50XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Q2hhcnRQb2ludFtdfSBvcHRpbWl6ZWRQb2ludHNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpXHJcbiAgICAgKiBAcGFyYW0geyp9IHBpeGVsUG9pbnRcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydERhdGFPcHRpbWl6ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRPcHRpbWl6ZWRQb2ludChvcHRpbWl6ZWRQb2ludHM6U2V0PENoYXJ0UG9pbnQ+LCBpOiBudW1iZXIsIHBpeGVsUG9pbnQ6IGFueSkge1xyXG5cclxuICAgICAgICBvcHRpbWl6ZWRQb2ludHMuYWRkKHBpeGVsUG9pbnQpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZpbmRzIHRoZSBtYXhpbXVtIHdpdGhpbiBhbiBhcnJheVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWVzXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0RGF0YU9wdGltaXplclxyXG4gICAgICovXHJcbiAgICBmaW5kTWF4aW11bSh2YWx1ZXMpIHtcclxuICAgICAgICBsZXQgbWF4ID0gdmFsdWVzWzBdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdmFsdWVzW2ldO1xyXG4gICAgICAgICAgICBtYXggPSB2YWx1ZSA+IG1heCA/IHZhbHVlIDogbWF4O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWF4O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICogUmVkdWNlcyB0aGUgcGl4ZWwgcG9pbnRzIHJlc3BlY3RpbmcgdGhlIHBvaW50IGRlbnNpdHkgb24gcGl4ZWxzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gdmlzaWJsZVBvaW50XHJcbiAgICAgKiBAcGFyYW0geyp9IHNlcmllc0JvdW5kc1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHhTY2FsZVxyXG4gICAgICogQHBhcmFtIHsqfSBpVmlzaWJsZVBvaW50XHJcbiAgICAgKiBAcGFyYW0ge2FueVtdfSBwaXhlbFBvaW50c1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0RGF0YU9wdGltaXplclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlZHVjZVBpeGVsUG9pbnRzKHZpc2libGVQb2ludDogYW55LCBzZXJpZXNCb3VuZHM6IGFueSwgeFNjYWxlOiBudW1iZXIsIGlWaXNpYmxlUG9pbnQ6IGFueSwgcGl4ZWxQb2ludHM6IGFueVtdKSB7XHJcbiAgICAgICAgLy8gY2FsY3VsYXRlIHRoZSBwaXhlbCBvZmZzZXQgdG8gYXhpcyBtaW5cclxuICAgICAgICBsZXQgeE9mZnNldCA9ICh2aXNpYmxlUG9pbnQueCAtIHNlcmllc0JvdW5kcy54TWluKSAqICh4U2NhbGUpO1xyXG4gICAgICAgIC8vIGdldCB0aGUgcGl4ZWwgaW5kZXhcclxuICAgICAgICBsZXQgaVBpeGVsID0gTWF0aC5yb3VuZCh4T2Zmc2V0KTtcclxuICAgICAgICB2aXNpYmxlUG9pbnQuaW5kZXggPSBpVmlzaWJsZVBvaW50O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuYWRkUG9pbnRzRm9yWFBpeGVsKHBpeGVsUG9pbnRzLCB2aXNpYmxlUG9pbnQsIGlQaXhlbCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIHBvaW50IGZvciBhIGNvcnJzcG9uZGluZyBwaXhlbCBsb2NhdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge2FueVtdfSBwaXhlbFBvaW50c1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGlQaXhlbFxyXG4gICAgICogQHBhcmFtIHsqfSBzaWduYWxQb2ludFxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0RGF0YU9wdGltaXplclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZFBvaW50c0ZvclhQaXhlbChwaXhlbFBvaW50czogYW55W10sIHNpZ25hbFBvaW50OiBhbnksIGlQaXhlbDogbnVtYmVyKSB7XHJcblxyXG4gICAgICAgIGlmICghcGl4ZWxQb2ludHNbaVBpeGVsXSkge1xyXG4gICAgICAgICAgICAvLyBkZWZpbmUgdGhlIGZpcnN0IHBvaW50IGZvciB0aGlzIHBpeGVsXHJcbiAgICAgICAgICAgIHBpeGVsUG9pbnRzW2lQaXhlbF0gPSB7fTtcclxuICAgICAgICAgICAgLy8gaW5pdGlhbGl6ZSB0aGUgbGFzdCBwb2ludCBhcyBkZWZhdWx0XHJcbiAgICAgICAgICAgIHBpeGVsUG9pbnRzW2lQaXhlbF0uZmlyc3RQb2ludCA9IHNpZ25hbFBvaW50O1xyXG4gICAgICAgICAgICBwaXhlbFBvaW50c1tpUGl4ZWxdLmxhc3RQb2ludCA9IHNpZ25hbFBvaW50O1xyXG4gICAgICAgICAgICBwaXhlbFBvaW50c1tpUGl4ZWxdLnlNYXhQb2ludCA9IHNpZ25hbFBvaW50O1xyXG4gICAgICAgICAgICBwaXhlbFBvaW50c1tpUGl4ZWxdLnlNaW5Qb2ludCA9IHNpZ25hbFBvaW50O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgbGFzdCBwb2ludCBmb3IgZm9sbG93aW5nIHZhbHVlcyBvbiB0aGUgc2FtZSBwaXhlbFxyXG4gICAgICAgICAgICBwaXhlbFBvaW50c1tpUGl4ZWxdLmxhc3RQb2ludCA9IHNpZ25hbFBvaW50O1xyXG5cclxuICAgICAgICAgICAgLy8gdXBkYXRlIG1pbixtYXhcclxuICAgICAgICAgICAgaWYgKHNpZ25hbFBvaW50LnkgPiBwaXhlbFBvaW50c1tpUGl4ZWxdLnlNYXhQb2ludC55KSB7XHJcbiAgICAgICAgICAgICAgICAvLyB1cGRhdGUgdGhlIHBvaW50IGNvbnRhaW5pbmcgeU1heFxyXG4gICAgICAgICAgICAgICAgcGl4ZWxQb2ludHNbaVBpeGVsXS55TWF4UG9pbnQgPSBzaWduYWxQb2ludDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHNpZ25hbFBvaW50LnkgPCBwaXhlbFBvaW50c1tpUGl4ZWxdLnlNaW5Qb2ludC55KSB7XHJcbiAgICAgICAgICAgICAgICAvLyB1cGRhdGUgdGhlIHBvaW50IGNvbnRhaW5pbmcgeU1pblxyXG4gICAgICAgICAgICAgICAgcGl4ZWxQb2ludHNbaVBpeGVsXS55TWluUG9pbnQgPSBzaWduYWxQb2ludDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUcmltcyBvciBvcHRpbWl6ZXMgc2VyaWVzIHBvaW50IHRvIGJlIGRpc3BsYXkgd2l0aGluIGEgMkQgY2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IGNoYXJ0U2VyaWVzXHJcbiAgICAgKiBAcGFyYW0geyp9IGNoYXJ0SW5zdGFuY2VcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnREYXRhT3B0aW1pemVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdHJpbVNlcmllc0ZvckNoYXJ0Qm91bmRzMkQoY2hhcnRTZXJpZXMsIGNoYXJ0SW5zdGFuY2UpIHtcclxuXHJcbiAgICAgICAgLy8gdGhlIGNoYXJ0IHBvaW50cyB0byBiZSBjYWxjdWxhdGVkXHJcbiAgICAgICAgbGV0IGNoYXJ0UG9pbnRzOiBTZXJpZXNQb2ludFtdID0gW107XHJcbiAgICAgICAgLy8gZ2V0IHRoZSBjYW52YXMgYm91bmRzIGluIHBpeGVsXHJcbiAgICAgICAgbGV0IGNhbnZhc0JvdW5kcyA9IHRoaXMuZ2V0Q2hhcnRBcmVhQm91bmRzSW5QaXhlbChjaGFydEluc3RhbmNlKTtcclxuICAgICAgICAvLyBnZXQgdGhlIGNoYXJ0IGFyZWEgYm91bmRzXHJcbiAgICAgICAgbGV0IGNoYXJ0QXJlYUJvdW5kcyA9IHRoaXMuZ2V0Q2hhcnRBcmVhQm91bmRzKGNoYXJ0U2VyaWVzKTtcclxuXHJcbiAgICAgICAgLy8gZ2V0IHRoZSBzZXJpZXMgd2l0aCBhIG1hdGNoaW5nIG5hbWVcclxuICAgICAgICBsZXQgZGF0YVNlcmllcyA9IHRoaXMuZ2V0U2VyaWVzRGF0YShjaGFydFNlcmllcyk7XHJcblxyXG4gICAgICAgIGlmIChkYXRhU2VyaWVzKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBnZXQgdGhlIG9yaWdpbmFsIHVubW9kaWZpZWQgcG9pbnRzIFxyXG4gICAgICAgICAgICBsZXQgcmF3UG9pbnRzOiBJUG9pbnRbXSA9IGRhdGFTZXJpZXMucmF3UG9pbnRzO1xyXG4gICAgICAgICAgICAvLyBnZXQgdGhlIGluaXRpYWxseSBzaW1wbGlmaWVkIGRhdGFcclxuICAgICAgICAgICAgbGV0IHZpZXdQb2ludHNEYXRhID0gKDxhbnk+ZGF0YVNlcmllcykuZGF0YTtcclxuICAgICAgICAgICAgLy8gcmV0cmlldmUgdGhlIHBvaW50cyB0byBiZSBkaXNwbGF5ZWQgICAgICAgXHJcbiAgICAgICAgICAgIGxldCB2aWV3U2VyaWVzUG9pbnRzID0gdmlld1BvaW50c0RhdGEgYXMgSVBvaW50W107XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLnRpbWUoXCJjYWxjdWxhdGUgcmVkdWNlZCBjaGFydCBwb2ludHNcIik7XHJcblxyXG4gICAgICAgICAgICAvLyByZXRyaWV2ZSB0aGUgdmlzaWJsZSBzZWdtZW50IHBvaW50c1xyXG4gICAgICAgICAgICBjaGFydFBvaW50cyA9IHRoaXMucmV0cmlldmVWaXNpYmxlTGluZVNlZ21lbnRQb2ludHModmlld1Nlcmllc1BvaW50cywgY2hhcnRBcmVhQm91bmRzKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGdldCByYXcgcG9pbnRzIGNvdW50IGNvdmVyZWQgYnkgdGhlIHZpc2libGUgc2VnbWVudHNcclxuICAgICAgICAgICAgbGV0IHJhd1Zpc2libGVQb2ludHNDb3VudCA9IGNoYXJ0UG9pbnRzLmxlbmd0aCA+IDAgPyBjaGFydFBvaW50c1tjaGFydFBvaW50cy5sZW5ndGggLSAxXS5pbmRleCAtIGNoYXJ0UG9pbnRzWzBdLmluZGV4ICsgMSA6IDA7XHJcbiAgICAgICAgICAgIGlmIChyYXdWaXNpYmxlUG9pbnRzQ291bnQgPiAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gY2FsY3VsYXRlIHRoZSBjdXJyZW50IGNoYXJ0IHVuaXRzL3BpeGVsXHJcbiAgICAgICAgICAgICAgICBjb25zdCBrWFVuaXRzUGVyUGl4ZWwgPSBjaGFydEFyZWFCb3VuZHMueERlbHRhIC8gY2FudmFzQm91bmRzLndpZHRoO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qga1lVbml0c1BlclBpeGVsID0gY2hhcnRBcmVhQm91bmRzLnlEZWx0YSAvIGNhbnZhc0JvdW5kcy5oZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlIGN1cnJlbnQgY29vcmRpbmF0ZSB0byBwaXhlbCByYXRpbyBmYWxscyBiZWxvdyB0aGUgaW5pdGlhbCByYXRpb24gd2UgbmVlZCB0byByZWNhbGN1bGF0ZSB0aGUgc2ltcGxpZmllZCBwb2ludHMgZm9yIHRoZSBjdXJyZW50IGdpdmVuIHZpZXcgcG9ydFxyXG4gICAgICAgICAgICAgICAgLy8gdG8gZ2V0IHRoZSBiZXN0IG1hdGNoaW5nIGFwcHJveGltYXRlZCBzaW1wbGlmaWVkIGxpbmUuIFxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNEZXRhaWxab29tTGV2ZWwodmlld1BvaW50c0RhdGEsa1hVbml0c1BlclBpeGVsLGtZVW5pdHNQZXJQaXhlbCkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcmV0cmlldmUgdGhlIHBvaW50cyB3aXRoIHRoZSBwcmVjaXNpb24gZm9yIHJlcXVlc3RlZCB6b29tIGxldmVsIFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYXJ0UG9pbnRzID0gdGhpcy5yZXRyaWV2ZURldGFpbGVkQ2hhcnRQb2ludHMoY2hhcnRQb2ludHMsIHJhd1BvaW50cywgY2hhcnRBcmVhQm91bmRzLCBrWFVuaXRzUGVyUGl4ZWwsIGtZVW5pdHNQZXJQaXhlbCk7IFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLnRpbWVFbmQoXCJjYWxjdWxhdGUgcmVkdWNlZCBjaGFydCBwb2ludHNcIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib3B0aW1pemVkIHBvaW50czogJW9cIiwgY2hhcnRQb2ludHMubGVuZ3RoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG9wdGltaXplZFBvaW50cyA9IGNoYXJ0UG9pbnRzLm1hcCgocG9pbnQsIGkpID0+IHsgcmV0dXJuIG5ldyBDaGFydFBvaW50KHBvaW50LmluZGV4LHBvaW50LnZpc2libGUsIHBvaW50LngsIHBvaW50LnkpOyB9KTtcclxuICAgICAgICByZXR1cm4gb3B0aW1pemVkUG9pbnRzO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gY2hhcnRTZXJpZXNcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnREYXRhT3B0aW1pemVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0U2VyaWVzRGF0YShjaGFydFNlcmllczogYW55KSB7XHJcbiAgICAgICAgbGV0IGNoYXJ0Vmlld1NlcmllczogQ2hhcnRWaWV3U2VyaWUgfCB1bmRlZmluZWQgPSB0aGlzLl9zZXJpZXNQcm92aWRlci5zZXJpZXMuZmluZCgoc2VyaWVzKSA9PiB7IHJldHVybiBzZXJpZXMuaWQgPT09IGNoYXJ0U2VyaWVzLm5hbWU7IH0pO1xyXG4gICAgICAgIGxldCBkYXRhU2VyaWVzID0gY2hhcnRWaWV3U2VyaWVzID8gY2hhcnRWaWV3U2VyaWVzLnNlcmllIDogdW5kZWZpbmVkO1xyXG4gICAgICAgIHJldHVybiBkYXRhU2VyaWVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0cmlldmVzIHRoZSBkYXRhIHBvaW50cyBuZWNlc3NhcnkgdG8gc2F0aXNmeSB0aGUgc3BlY2lmaWVkIGNoYXJ0IGJvdW5kcyBhbmQgem9vbSByYXRpby4gXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7U2VyaWVzUG9pbnRbXX0gY2hhcnRQb2ludHNcclxuICAgICAqIEBwYXJhbSB7SVBvaW50W119IHJhd1BvaW50c1xyXG4gICAgICogQHBhcmFtIHt7IHhNaW46IGFueTsgeE1heDogYW55OyB4RGVsdGE6IGFueTsgeU1pbjogYW55OyB5TWF4OiBhbnk7IHlEZWx0YTogYW55OyB9fSBjaGFydEFyZWFCb3VuZHNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjdXJyZW50Q2hhcnRQaXhlbFJhdGlvWFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGN1cnJlbnRDaGFydFBpeGVsUmF0aW9uWVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydERhdGFPcHRpbWl6ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZXRyaWV2ZURldGFpbGVkQ2hhcnRQb2ludHMoY2hhcnRQb2ludHM6IFNlcmllc1BvaW50W10sIHJhd1BvaW50czogSVBvaW50W10sIGNoYXJ0QXJlYUJvdW5kczogeyB4TWluOiBhbnk7IHhNYXg6IGFueTsgeERlbHRhOiBhbnk7IHlNaW46IGFueTsgeU1heDogYW55OyB5RGVsdGE6IGFueTsgfSwgY3VycmVudENoYXJ0UGl4ZWxSYXRpb1g6IG51bWJlciwgY3VycmVudENoYXJ0UGl4ZWxSYXRpb25ZOiBudW1iZXIpIHtcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBsYXN0UmF3SW5kZXggPSBjaGFydFBvaW50c1tjaGFydFBvaW50cy5sZW5ndGggLSAxXS5pbmRleDtcclxuICAgICAgICBjb25zdCBmaXJzdFZpc2libGVSYXdQb2ludEluZGV4ID0gY2hhcnRQb2ludHNbMF0uaW5kZXg7XHJcbiAgICAgICAgY29uc3QgbGFzdFZpc2libGVSYXdQb2ludEluZGV4ID0gbGFzdFJhd0luZGV4IDwgcmF3UG9pbnRzLmxlbmd0aCA/IGxhc3RSYXdJbmRleCArIDEgOiByYXdQb2ludHMubGVuZ3RoO1xyXG5cclxuICAgICAgICAvLyByZXRyaWV2ZSB0aGUgcmF3IHBvaW50cyBjb3ZlcmVkIGJ5IHRoZSB2aXNpYmxlIHNlZ21lbnRzXHJcbiAgICAgICAgbGV0IHJhd1Zpc2libGVQb2ludHMgPSByYXdQb2ludHMuc2xpY2UoZmlyc3RWaXNpYmxlUmF3UG9pbnRJbmRleCwgbGFzdFZpc2libGVSYXdQb2ludEluZGV4KTtcclxuICAgICAgICBcclxuICAgICAgICAvLyB1cGRhdGUgcG9pbnQgaW5kaWNlc1xyXG4gICAgICAgIHRoaXMudXBkYXRlVmlzaWJpbGl0eUluZGljZXMocmF3VmlzaWJsZVBvaW50cyk7XHJcblxyXG4gICAgICAgIC8vIHJldHJpZXZlIHRoZSB2aXNpYmxlIGxpbmUgc2VnbWVudCBwb2ludHNcclxuICAgICAgICBjaGFydFBvaW50cyA9IHRoaXMucmV0cmlldmVWaXNpYmxlTGluZVNlZ21lbnRQb2ludHMocmF3VmlzaWJsZVBvaW50cywgY2hhcnRBcmVhQm91bmRzKTtcclxuXHJcbiAgICAgICAgLy8gaWYgdGhlIG51bWJlcnQgb2YgY2hhcnQgcG9pbnRzIGlzIHN0aWxsIHRvbyBoaWdoLCB3ZSBuZWVkIHRvIGZ1cnRoZXIgc2ltcGxpZnkgdGhlIGRhdGEgcG9pbnRzXHJcbiAgICAgICAgaWYgKGNoYXJ0UG9pbnRzLmxlbmd0aCA+IDEwMDApIHtcclxuXHJcbiAgICAgICAgICAgIC8vIHNpbXBsaWZ5IHRoZSByZW1haW5pbmcgdmlzaWJsZSBwb2ludHMgYWNjb3JkaW5nIHRoZSBzcGVjaWZpZWQgcHJlY2lzaW9uIGFuZCByYXRpb1xyXG4gICAgICAgICAgICBjaGFydFBvaW50cyA9IHRoaXMucmRwLnNpbXBsaWZ5KHJhd1Zpc2libGVQb2ludHMsIDAuMjUsIGN1cnJlbnRDaGFydFBpeGVsUmF0aW9YLCBjdXJyZW50Q2hhcnRQaXhlbFJhdGlvblksIGZhbHNlKSBhcyBTZXJpZXNQb2ludFtdO1xyXG5cclxuICAgICAgICAgICAgLy8gdXBkYXRlIHBvaW50IGluZGljZXNcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVWaXNpYmlsaXR5SW5kaWNlcyhjaGFydFBvaW50cyk7XHJcblxyXG4gICAgICAgICAgICAvLyByZXRyaWV2ZSB0aGUgdmlzaWJsZSBzZWdtZW50IHBvaW50c1xyXG4gICAgICAgICAgICBjaGFydFBvaW50cyA9IHRoaXMucmV0cmlldmVWaXNpYmxlTGluZVNlZ21lbnRQb2ludHMoY2hhcnRQb2ludHMsIGNoYXJ0QXJlYUJvdW5kcyk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNoYXJ0UG9pbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gdmlld1BvaW50c0RhdGFcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjdXJyZW50Q2hhcnRQaXhlbFJhdGlvWFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGN1cnJlbnRDaGFydFBpeGVsUmF0aW9uWVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydERhdGFPcHRpbWl6ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpc0RldGFpbFpvb21MZXZlbCh2aWV3UG9pbnRzRGF0YTogYW55LCBjdXJyZW50Q2hhcnRQaXhlbFJhdGlvWDogbnVtYmVyLCBjdXJyZW50Q2hhcnRQaXhlbFJhdGlvblk6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50Q2hhcnRQaXhlbFJhdGlvWCA8IHZpZXdQb2ludHNEYXRhLnBpeGVsUmF0aW9YIHx8IGN1cnJlbnRDaGFydFBpeGVsUmF0aW9uWSA8IHZpZXdQb2ludHNEYXRhLnBpeGVsUmF0aW9ZO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGluZGljZXMgb2YgdGhlIHBvaW50c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0lQb2ludFtdfSByZWR1Y2VkVmlzaWJsZVBvaW50c1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0RGF0YU9wdGltaXplclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZVZpc2liaWxpdHlJbmRpY2VzKHBvaW50czogSVBvaW50W10pIHtcclxuICAgICAgICBsZXQgc2VyaWVzUG9pbnRzID0gcG9pbnRzIGFzIFNlcmllc1BvaW50W107XHJcbiAgICAgICAgc2VyaWVzUG9pbnRzLmZvckVhY2goKHBvaW50LGluZGV4KSA9PiB7IHBvaW50LmluZGV4ID0gaW5kZXg7IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgY2hhcnQgYXJlYSBib3VuZHMgaW4gcGl4ZWxcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBjaGFydEluc3RhbmNlXHJcbiAgICAgKiBAcmV0dXJucyB7e3g6bnVtYmVyLHk6bnVtYmVyLHdpZHRoOm51bWJlcixoZWlnaHQ6bnVtYmVyfX1cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydERhdGFPcHRpbWl6ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRDaGFydEFyZWFCb3VuZHNJblBpeGVsKGNoYXJ0SW5zdGFuY2U6IGFueSk6IHsgeDogbnVtYmVyLCB5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyIH0ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHg6IGNoYXJ0SW5zdGFuY2UuY2FudmFzWCxcclxuICAgICAgICAgICAgeTogY2hhcnRJbnN0YW5jZS5jYW52YXNZLFxyXG4gICAgICAgICAgICB3aWR0aDogY2hhcnRJbnN0YW5jZS5jYW52YXNXaWR0aCxcclxuICAgICAgICAgICAgaGVpZ2h0OiBjaGFydEluc3RhbmNlLmNhbnZhc0hlaWdodCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgdmlzaWJsZSBjaGFydCBhcmVhIGJvdW5kcyBpbiBjb29yZGluYXRlIHVuaXRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gY2hhcnRTZXJpZXNcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnREYXRhT3B0aW1pemVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0Q2hhcnRBcmVhQm91bmRzKGNoYXJ0U2VyaWVzOiBhbnkpIHtcclxuXHJcbiAgICAgICAgbGV0IGNoYXJ0QXJlYUJvdW5kcyA9IHtcclxuICAgICAgICAgICAgeE1pbjogY2hhcnRTZXJpZXMueEF4aXMucmFuZ2UubWluLFxyXG4gICAgICAgICAgICB4TWF4OiBjaGFydFNlcmllcy54QXhpcy5yYW5nZS5tYXgsXHJcbiAgICAgICAgICAgIHhEZWx0YTogY2hhcnRTZXJpZXMueEF4aXMucmFuZ2UuZGVsdGEsXHJcbiAgICAgICAgICAgIHlNaW46IGNoYXJ0U2VyaWVzLnlBeGlzLnJhbmdlLm1pbixcclxuICAgICAgICAgICAgeU1heDogY2hhcnRTZXJpZXMueUF4aXMucmFuZ2UubWF4LFxyXG4gICAgICAgICAgICB5RGVsdGE6IGNoYXJ0U2VyaWVzLnlBeGlzLnJhbmdlLmRlbHRhLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIGNoYXJ0QXJlYUJvdW5kcztcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXRlcm1pbmVzIGlmIGEgbGluZSBpbnRlcnNlY3RzIGEgcmVjdGFuZ2xlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJUG9pbnR9IHAxXHJcbiAgICAgKiBAcGFyYW0ge0lQb2ludH0gcDJcclxuICAgICAqIEBwYXJhbSB7Qm91bmRzfSBib3VuZHNcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnREYXRhT3B0aW1pemVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBsaW5lSW50ZXJzZWN0c1JlY3RhbmdsZShwMTogSVBvaW50LCBwMjogSVBvaW50LCBib3VuZHM6IEJvdW5kcykge1xyXG5cclxuICAgICAgICAvLyBleGNsdWRlIG5vbiBpbnRlcnNlY3RpbmcgbGluZXNcclxuICAgICAgICBpZiAoKHAxLnggPCBib3VuZHMueE1pbiAmJiBwMi54IDwgYm91bmRzLnhNaW4pIHx8IChwMS55IDwgYm91bmRzLnlNaW4gJiYgcDIueSA8IGJvdW5kcy55TWluKSB8fCAocDEueCA+IGJvdW5kcy54TWF4ICYmIHAyLnggPiBib3VuZHMueE1heCkgfHwgKHAxLnkgPiBib3VuZHMueU1heCAmJiBwMi55ID4gYm91bmRzLnlNYXgpKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG5cclxuICAgICAgICBpZiAodGhpcy5yZWN0YW5nbGVDb250YWluc1BvaW50KHAxLGJvdW5kcykgfHwgdGhpcy5yZWN0YW5nbGVDb250YWluc1BvaW50KHAyLGJvdW5kcykpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvLyBjYWxjdWxhdGUgZHkvZHhcclxuICAgICAgICAgICAgbGV0IGsgPSAocDIueSAtIHAxLnkpIC8gKHAyLnggLSBwMS54KTtcclxuXHJcbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIGxpbmUgaW50ZXJzZWN0cyBsZWZ0IGJvcmRlclxyXG4gICAgICAgICAgICBsZXQgeUludGVyc2VjdCA9IHAxLnkgKyBrICogKGJvdW5kcy54TWluIC0gcDEueCk7XHJcbiAgICAgICAgICAgIGlmICh5SW50ZXJzZWN0ID49IGJvdW5kcy55TWluICYmIHlJbnRlcnNlY3QgPD0gYm91bmRzLnlNYXgpIHJldHVybiB0cnVlO1xyXG5cclxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgbGluZSBpbnRlcnNlY3RzIHJpZ2h0IGJvcmRlclxyXG4gICAgICAgICAgICB5SW50ZXJzZWN0ID0gcDEueSArIGsgKiAoYm91bmRzLnhNYXggLSBwMS54KTtcclxuICAgICAgICAgICAgaWYgKHlJbnRlcnNlY3QgPj0gYm91bmRzLnlNaW4gJiYgeUludGVyc2VjdCA8PSBib3VuZHMueU1heCkgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgICAgICAgICAvLyBjaGVjayBpZiBsaW5lIGludGVyc2VjdHMgYm90dG9tIGJvcmRlclxyXG4gICAgICAgICAgICBsZXQgeEludGVyc2VjID0gcDEueCArIChib3VuZHMueU1pbiAtIHAxLnkpIC8gaztcclxuICAgICAgICAgICAgaWYgKHhJbnRlcnNlYyA+PSBib3VuZHMueE1pbiAmJiB4SW50ZXJzZWMgPD0gYm91bmRzLnhNYXgpIHJldHVybiB0cnVlO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIGxpbmUgaW50ZXJzZWN0cyB0b3AgYm9yZGVyXHJcbiAgICAgICAgICAgIHhJbnRlcnNlYyA9IHAxLnggKyAoYm91bmRzLnlNYXggLSBwMS55KSAvIGs7XHJcbiAgICAgICAgICAgIGlmICh4SW50ZXJzZWMgPj0gYm91bmRzLnhNaW4gJiYgeEludGVyc2VjIDw9IGJvdW5kcy54TWF4KSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwibGluZUludGVyc2VjdHNSZWN0YW5nbGVcIik7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHJpZXZlcyB0aGUgbGluZSBzZWdtZW50IHBvaW50cyBmb3Igc2VnbWVudHMgaW50ZXJzZWN0aW5nIHRoZSBzcGVjaWZpZWQgYm91bmRzLiBUaGUgbWV0aG9kcyBhZGRzLCBpZiBuZWNlc3NhcnkgaW52aXNpYmxlIGxpbmUgc2VnbWVudHMgYnkgYWRkaW5nIGludmlzaWJsZSBoZWxrcGVyIHBvaW50cy5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtJUG9pbnRbXX0gcG9pbnRzXHJcbiAgICAgKiBAcGFyYW0ge0JvdW5kc30gYm91bmRzXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0RGF0YU9wdGltaXplclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJldHJpZXZlVmlzaWJsZUxpbmVTZWdtZW50UG9pbnRzKHBvaW50czogSVBvaW50W10gLCBib3VuZHM6IEJvdW5kcyk6U2VyaWVzUG9pbnRbXSB7XHJcblxyXG4gICAgICAgIGlmIChwb2ludHMubGVuZ3RoIDwgMikgcmV0dXJuIHBvaW50cyBhcyBTZXJpZXNQb2ludFtdO1xyXG5cclxuICAgICAgICAvLyB0aGUgYXZhaWxhYmxlIHBvaW50IGFzIHNlcmllcyBwb2ludHNcclxuICAgICAgICBsZXQgc2VyaWVzUG9pbnRzID0gcG9pbnRzIGFzIFNlcmllc1BvaW50W107XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgcmVzdWx0IHNlZ21lbnQgcG9pbnRzIGFycmF5XHJcbiAgICAgICAgbGV0IGxpbmVTZWdtZW50UG9pbnRzOiBTZXJpZXNQb2ludFtdID0gW107XHJcblxyXG5cclxuICAgICAgICAvLyBob2xkcyB0aGUgbGFzdCBhZGRlZCBlbmQgcG9pbnQuXHJcbiAgICAgICAgbGV0IGxhc3RFbmRQb2ludDpTZXJpZXNQb2ludHxudWxsID0gbnVsbDtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBzZXJpZXNQb2ludHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgcFN0YXJ0ID0gc2VyaWVzUG9pbnRzW2kgLSAxXTtcclxuICAgICAgICAgICAgY29uc3QgcEVuZCA9IHNlcmllc1BvaW50c1tpXTtcclxuXHJcbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSBsaW5lIGludGVyc2VjdHMgdGhlIHNwZWNpZmllZCBib3VuZHNcclxuICAgICAgICAgICAgaWYgKHRoaXMubGluZUludGVyc2VjdHNSZWN0YW5nbGUocFN0YXJ0LCBwRW5kLCBib3VuZHMpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFsYXN0RW5kUG9pbnQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYXQgdGhlIHZlcnkgYmVnaW5uaW5nIHdlIG5lZWQgdG8gYWRkIHRoZSBmaXJzdCBzdGFydCBwb2ludFxyXG4gICAgICAgICAgICAgICAgICAgIHBTdGFydC52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBsaW5lU2VnbWVudFBvaW50cy5wdXNoKHBTdGFydCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbm93IHdlIGNvbnRpbnVlIHRoZSBsaW5lIC4uLi5cclxuICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGUgbGluZSBpcyBpbnRlcnJ1cHRlZCAoIHN0YXJ0IGFuZCBwcmV2aW91cyBlbmQgaW5kZXggaXMgbm90IHRoZSBzYW1lKSwgd2UgbmVlZCB0byBhZGQgYW4gaW52aXNpYmxlIGhlbHBlciBwb2ludCB0byBjcmVhdGUgYW4gaW52aXNpYmxlIHNlZ21lbnQuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYWRkaXRpb25hbGx5IHdlIG5lZWQgdG8gYWRkIHRoZSBzdGFydCBwb2ludCBvZiB0aGUgbmV4dCB2aXNpYmxlIGxpbmUgc2VnbWVudC5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocFN0YXJ0LmluZGV4ICE9IGxhc3RFbmRQb2ludC5pbmRleCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY3JlYXRlIGFuIGludmlzaWJsZSBoZWxwZXIgcG9pbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGludmlzaWJsZVNlZ21lblN0YXJ0UG9pbnQgPSBPYmplY3QuY3JlYXRlKGxhc3RFbmRQb2ludCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludmlzaWJsZVNlZ21lblN0YXJ0UG9pbnQudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhZGQgdGhlIGludmlzaWJsZSBoZWxwZXIgcG9pbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGluZVNlZ21lbnRQb2ludHMucHVzaChpbnZpc2libGVTZWdtZW5TdGFydFBvaW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFkZCB0aGUgc3RhcnQgcG9pbnQgb2YgbmV4dCB2aXNpYmxlIGxpbmUgc2VnbWVudC4gVGhpcyBpcyB3aGVyZSB0aGUgbGluZSBzZWdtZW50IGlzIHRvIGJlIGNvbnRpbnVlZC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcFN0YXJ0LnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lU2VnbWVudFBvaW50cy5wdXNoKHBTdGFydCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBqdXN0IGFkZCB0aGUgbmV4dCB2aXNpYmxlIGVuZCBwb2ludFxyXG4gICAgICAgICAgICAgICAgcEVuZC52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGxpbmVTZWdtZW50UG9pbnRzLnB1c2gocEVuZCk7XHJcbiAgICAgICAgICAgICAgICBsYXN0RW5kUG9pbnQgPSBwRW5kO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBsaW5lU2VnbWVudFBvaW50cztcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSByZWN0YW5nbGVDb250YWluc1BvaW50KHBvaW50OiBJUG9pbnQsIGJvdW5kczogeyB4TWluOiBudW1iZXI7IHhNYXg6IG51bWJlcjsgeU1pbjogbnVtYmVyOyB5TWF4OiBudW1iZXI7IH0pIHtcclxuXHJcbiAgICAgICAgY29uc3QgeE1pbkRpZmYgPSBwb2ludC54IC0gYm91bmRzLnhNaW47XHJcbiAgICAgICAgY29uc3QgeE1heERpZmYgPSBib3VuZHMueE1heCAtIHBvaW50Lng7XHJcbiAgICAgICAgY29uc3QgeU1pbkRpZmYgPSBwb2ludC55IC0gYm91bmRzLnlNaW47XHJcbiAgICAgICAgY29uc3QgeU1heERpZmYgPSBib3VuZHMueU1heCAtIHBvaW50Lnk7XHJcblxyXG4gICAgICAgIGNvbnN0IHhXaXRoaW5SYW5nZSA9IHhNaW5EaWZmID49IDAgJiYgeE1heERpZmYgPj0gMDtcclxuICAgICAgICBjb25zdCB5V2l0aGluUmFuZ2UgPSB5TWluRGlmZiA+PSAwICYmIHlNYXhEaWZmID49IDA7XHJcblxyXG5cclxuICAgICAgICAvLyBjb25zdCB4V2l0aGluUmFuZ2UgPSBwb2ludC54ID49IGJvdW5kcy54TWluICYmIHBvaW50LnggPD0gYm91bmRzLnhNYXg7XHJcbiAgICAgICAgLy8gY29uc3QgeVdpdGhpblJhbmdlID0gcG9pbnQueSA+PSBib3VuZHMueU1pbiAmJiBwb2ludC55IDw9IGJvdW5kcy55TWF4O1xyXG5cclxuICAgICAgICBsZXQgcmVjdGFuZ2xlc0NvbnRhaW5zUG9pbnQgPSB4V2l0aGluUmFuZ2UgJiYgeVdpdGhpblJhbmdlO1xyXG5cclxuICAgICAgICByZXR1cm4gcmVjdGFuZ2xlc0NvbnRhaW5zUG9pbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBdHRhY2hlcyBhIHNlcmllcyB0byB0aGUgY2hhcnQgb3B0aW1pemVyLiBUaGUgbWV0aG9kIGluIGZhY3QganVzdCBjYWxjdWxhdGVzIGFuZCB1cGRhdGVzIHRoZSBzZXJpZXMgYm91bmRzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnREYXRhT3B0aW1pemVyXHJcbiAgICAgKi9cclxuICAgIGF0dGFjaFNlcmllcyhzZXJpZTogQmFzZVNlcmllcykge1xyXG5cclxuICAgICAgICBpZiAoc2VyaWUucmF3UG9pbnRzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgbGV0IHNpZ25hbFBvaW50czogSVBvaW50W10gPSBzZXJpZS5yYXdQb2ludHM7XHJcblxyXG4gICAgICAgICAgICBsZXQgeFZhbHVlcyA9IHNpZ25hbFBvaW50cy5tYXAoKHBvaW50KSA9PiB7IHJldHVybiBwb2ludC54IH0pO1xyXG4gICAgICAgICAgICBsZXQgeVZhbHVlcyA9IHNpZ25hbFBvaW50cy5tYXAoKHBvaW50KSA9PiB7IHJldHVybiBwb2ludC55IH0pO1xyXG5cclxuICAgICAgICAgICAgbGV0IHhNaW4gPSBNYXRoWC5taW4oeFZhbHVlcyk7XHJcbiAgICAgICAgICAgIGxldCB4TWF4ID0gTWF0aFgubWF4KHhWYWx1ZXMpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHlNaW4gPSBNYXRoWC5taW4oeVZhbHVlcyk7XHJcbiAgICAgICAgICAgIGxldCB5TWF4ID0gTWF0aFgubWF4KHlWYWx1ZXMpO1xyXG4gICAgXHJcblxyXG4gICAgICAgICAgICAvLyB1cGRhdGUgdGhlIHNlcmllcyBib3VuZHNcclxuICAgICAgICAgICAgKDxhbnk+c2VyaWUpLmJvdW5kcyA9IHsgeE1pbjogeE1pbiwgeE1heDogeE1heCwgeU1pbjogeU1pbiwgeU1heDogeU1heCwgd2lkdGg6ICh4TWF4IC0geE1pbiksIGhlaWdodDogKHlNYXggLSB5TWluKSB9O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jbGVhclNlcmllc0Rpc3BsYXlQb2ludHMoc2VyaWUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2VyaWU7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2xlYXJzIGV2ZW50dWFsbHkgZXhpc3RpbmcgZGlzcGxheSBwb2ludHMuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydERhdGFPcHRpbWl6ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjbGVhclNlcmllc0Rpc3BsYXlQb2ludHMoc2VyaWU6IEJhc2VTZXJpZXMpIHtcclxuICAgICAgICAoPGFueT5zZXJpZSkuZGlzcGxheVBvaW50cyA9IG51bGw7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEZWNsYXJlcyB0aGUgdHJhY2UgZGF0YSBzb3VyY2UgaW50ZXJmYWNlXHJcbiAqXHJcbiAqIEBpbnRlcmZhY2UgSUNoYXJ0U2VyaWVzUHJvdmlkZXJcclxuICovXHJcbmludGVyZmFjZSBJQ2hhcnRTZXJpZXNQcm92aWRlciB7XHJcbiAgICBzZXJpZXM6IEFycmF5PENoYXJ0Vmlld1NlcmllPjtcclxufVxyXG5cclxuLyoqXHJcbiAqIEltcGxlbWVudHMgdGhlIGNoYXJ0IHBvaW50IGNsYXNzXHJcbiAqXHJcbiAqIEBjbGFzcyBDaGFydFBvaW50XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ2hhcnRQb2ludCB7XHJcblxyXG4gICAgaW5kZXg6IG51bWJlcjtcclxuICAgIHg6IG51bWJlcjtcclxuICAgIHhWYWx1ZTogbnVtYmVyO1xyXG4gICAgeTogbnVtYmVyO1xyXG4gICAgWVZhbHVlczogbnVtYmVyW107XHJcbiAgICB2aXNpYmxlOmJvb2xlYW47XHJcblxyXG4gICAgY29uc3RydWN0b3IoaW5kZXgsIHZpc2libGUsIHgsIHkpIHtcclxuICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMueFZhbHVlID0geDtcclxuICAgICAgICB0aGlzLllWYWx1ZXMgPSBbeV07XHJcbiAgICAgICAgdGhpcy52aXNpYmxlID0gdmlzaWJsZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgQ2hhcnREYXRhT3B0aW1pemVyLCBJQ2hhcnRTZXJpZXNQcm92aWRlciB9OyJdfQ==