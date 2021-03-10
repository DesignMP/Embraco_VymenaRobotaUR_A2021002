define(["require", "exports", "./imageProvider", "../../models/chartManagerDataModel/seriesType"], function (require, exports, imageProvider_1, seriesType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SeriesIconProvider = /** @class */ (function () {
        function SeriesIconProvider() {
        }
        /**
         * gets a singleton instance of SeriesIconProvider
         *
         * @readonly
         * @type {SeriesIconProvider}
         * @memberof SeriesIconProvider
         */
        SeriesIconProvider.getInstance = function () {
            this._instance = this._instance ? this._instance : new SeriesIconProvider();
            return this._instance;
        };
        /**
         * Returns html information(e.g img, svg, ...) with the icons for a series(main icon + overlays)
         *
         * @param {BaseSeries} serie
         * @returns {string}
         * @memberof SeriesIconProvider
         */
        SeriesIconProvider.prototype.getIcon = function (serie) {
            var iconDefinition = this.getBaseIconDefinition(serie);
            iconDefinition += this.getOverlayIconDefinition(serie);
            return iconDefinition;
        };
        /**
         * Returns html information(e.g img, svg, ...) with the base icons for a series
         *
         * @private
         * @param {BaseSeries} serie
         * @returns {string}
         * @memberof SeriesIconProvider
         */
        SeriesIconProvider.prototype.getBaseIconDefinition = function (serie) {
            var iconDefinition = "";
            // Set main icon
            if (serie.type == seriesType_1.SeriesType.timeSeries) {
                iconDefinition += this.getSeriesMainIcon(SeriesIconProvider.getSvgPath("timeSeries"), serie.color);
            }
            else if (serie.type == seriesType_1.SeriesType.xySeries) {
                iconDefinition += this.getSeriesMainIcon(SeriesIconProvider.getSvgPath("xySeries"), serie.color);
            }
            else if (serie.type == seriesType_1.SeriesType.fftSeries) {
                iconDefinition += this.getSeriesMainIcon(SeriesIconProvider.getSvgPath("fftSeries"), serie.color);
            }
            return iconDefinition;
        };
        /**
         *Returns html information(e.g img, svg, ...) with the overlay icons for a series
         *
         * @private
         * @param {BaseSeries} serie
         * @returns {string}
         * @memberof SeriesIconProvider
         */
        SeriesIconProvider.prototype.getOverlayIconDefinition = function (serie) {
            var iconDefinition = "";
            if (serie.isCalculated == true) {
                // Set calculation overlay
                //iconDefinition += '<img class="treeGridRowIcon" src="' + SeriesIconProvider.getSvgPath("calculationOverlay") + '" />';
            }
            if (serie.isAutoUpdated == true) {
                // Set auto update overlay 
                iconDefinition += '<img class="treeGridRowIcon" src="' + SeriesIconProvider.getSvgPath("autoUpdatedOverlay") + '" />';
            }
            if (serie.rawPointsValid == false) {
                //Set exclamation overlay for invalid series
                var tooltipText = "The data is invalid!"; // Default tooltiptext in case of invalid data
                var errorText = SeriesIconProvider.getTextFromErrorInfos(serie.errorInfo);
                if (errorText != "") {
                    tooltipText = errorText; // Use error info text for tooltip text
                }
                iconDefinition += "<img title=\"" + tooltipText + "\" class=\"treeGridRowIcon\" src=\"" + SeriesIconProvider.getSvgPath("exclamationOverlay") + "\" />";
            }
            return iconDefinition;
        };
        SeriesIconProvider.getTextFromErrorInfos = function (errorInfo) {
            var formatedText = "";
            if (errorInfo != undefined) {
                if (errorInfo.length > 0) {
                    formatedText = "";
                    errorInfo.forEach(function (error) {
                        formatedText += error + "\r\n";
                    });
                }
            }
            return formatedText;
        };
        /**
         * Get filepath for svg
         *
         * @private
         * @param {string} svgName
         * @returns {string}
         * @memberof SeriesIconProvider
         */
        SeriesIconProvider.getSvgPath = function (svgName) {
            return "../app/widgets/common/style/images/tree/" + svgName + ".svg";
        };
        /**
         * Get the main series icon (e.g. timeSeries, xySeries, fftSeries, ...)
         *
         * @private
         * @param {string} type
         * @param {string} color
         * @returns {string}
         * @memberof SeriesIconProvider
         */
        SeriesIconProvider.prototype.getSeriesMainIcon = function (path, color) {
            var imageData = imageProvider_1.ImageProvider.getInstance().getImage(path);
            if (imageData != undefined) {
                return imageData.replace("stroke:#76bea6", "stroke:" + color);
            }
            return "";
        };
        return SeriesIconProvider;
    }());
    exports.SeriesIconProvider = SeriesIconProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWVzSWNvblByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NvbW1vbi9zZXJpZXNJY29uUHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBSUE7UUFBQTtRQW1JQSxDQUFDO1FBOUhHOzs7Ozs7V0FNRztRQUNXLDhCQUFXLEdBQXpCO1lBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLGtCQUFrQixFQUFFLENBQUM7WUFDNUUsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzFCLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSCxvQ0FBTyxHQUFQLFVBQVEsS0FBaUI7WUFDckIsSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRXZELGNBQWMsSUFBSSxJQUFJLENBQUMsd0JBQXdCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFdkQsT0FBTyxjQUFjLENBQUM7UUFDMUIsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSyxrREFBcUIsR0FBN0IsVUFBOEIsS0FBaUI7WUFDM0MsSUFBSSxjQUFjLEdBQUcsRUFBRSxDQUFDO1lBRXhCLGdCQUFnQjtZQUNoQixJQUFHLEtBQUssQ0FBQyxJQUFJLElBQUksdUJBQVUsQ0FBQyxVQUFVLEVBQUM7Z0JBQ25DLGNBQWMsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN0RztpQkFDSSxJQUFHLEtBQUssQ0FBQyxJQUFJLElBQUksdUJBQVUsQ0FBQyxRQUFRLEVBQUM7Z0JBQ3RDLGNBQWMsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNwRztpQkFDSSxJQUFHLEtBQUssQ0FBQyxJQUFJLElBQUksdUJBQVUsQ0FBQyxTQUFTLEVBQUM7Z0JBQ3ZDLGNBQWMsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNyRztZQUVELE9BQU8sY0FBYyxDQUFDO1FBQzFCLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0sscURBQXdCLEdBQWhDLFVBQWlDLEtBQWlCO1lBQzlDLElBQUksY0FBYyxHQUFHLEVBQUUsQ0FBQztZQUN4QixJQUFHLEtBQUssQ0FBQyxZQUFZLElBQUksSUFBSSxFQUFDO2dCQUMxQiwwQkFBMEI7Z0JBQzFCLHdIQUF3SDthQUMzSDtZQUVELElBQUcsS0FBSyxDQUFDLGFBQWEsSUFBSSxJQUFJLEVBQUM7Z0JBQzNCLDJCQUEyQjtnQkFDM0IsY0FBYyxJQUFJLG9DQUFvQyxHQUFHLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLE1BQU0sQ0FBQzthQUN6SDtZQUVELElBQUcsS0FBSyxDQUFDLGNBQWMsSUFBSSxLQUFLLEVBQUM7Z0JBQzdCLDRDQUE0QztnQkFDNUMsSUFBSSxXQUFXLEdBQUcsc0JBQXNCLENBQUMsQ0FBQyw4Q0FBOEM7Z0JBQ3hGLElBQUksU0FBUyxHQUFHLGtCQUFrQixDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDMUUsSUFBRyxTQUFTLElBQUksRUFBRSxFQUFDO29CQUNmLFdBQVcsR0FBRyxTQUFTLENBQUMsQ0FBQyx1Q0FBdUM7aUJBQ25FO2dCQUNELGNBQWMsSUFBSSxlQUFjLEdBQUUsV0FBVyxHQUFFLHFDQUFpQyxHQUFHLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLE9BQU0sQ0FBQzthQUNuSjtZQUNELE9BQU8sY0FBYyxDQUFDO1FBQzFCLENBQUM7UUFFYSx3Q0FBcUIsR0FBbkMsVUFBb0MsU0FBd0I7WUFDeEQsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDO1lBQ3RCLElBQUcsU0FBUyxJQUFJLFNBQVMsRUFBQztnQkFDdEIsSUFBRyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQztvQkFDcEIsWUFBWSxHQUFHLEVBQUUsQ0FBQztvQkFDbEIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUs7d0JBQ25CLFlBQVksSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDO29CQUNuQyxDQUFDLENBQUMsQ0FBQTtpQkFFTDthQUNKO1lBQ0QsT0FBTyxZQUFZLENBQUM7UUFDeEIsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDVyw2QkFBVSxHQUF4QixVQUF5QixPQUFlO1lBQ3BDLE9BQU8sMENBQTBDLEdBQUcsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUN6RSxDQUFDO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDSyw4Q0FBaUIsR0FBekIsVUFBMEIsSUFBWSxFQUFFLEtBQWE7WUFDakQsSUFBSSxTQUFTLEdBQUcsNkJBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0QsSUFBRyxTQUFTLElBQUksU0FBUyxFQUFDO2dCQUN0QixPQUFPLFNBQVMsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsU0FBUyxHQUFHLEtBQUssQ0FBQyxDQUFDO2FBQ2pFO1lBQ0QsT0FBTyxFQUFFLENBQUM7UUFDZCxDQUFDO1FBQ0wseUJBQUM7SUFBRCxDQUFDLEFBbklELElBbUlDO0lBbklZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VTZXJpZXMgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9iYXNlU2VyaWVzXCI7XHJcbmltcG9ydCB7IEltYWdlUHJvdmlkZXIgfSBmcm9tIFwiLi9pbWFnZVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IFNlcmllc1R5cGUgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9zZXJpZXNUeXBlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU2VyaWVzSWNvblByb3ZpZGVye1xyXG5cclxuICAgIC8vIGhvbGRzIGFuIGluc3RhbmNlIG9mIHRoaXMgY2xhc3NcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogU2VyaWVzSWNvblByb3ZpZGVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0cyBhIHNpbmdsZXRvbiBpbnN0YW5jZSBvZiBTZXJpZXNJY29uUHJvdmlkZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtTZXJpZXNJY29uUHJvdmlkZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVzSWNvblByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogU2VyaWVzSWNvblByb3ZpZGVyIHtcclxuICAgICAgICB0aGlzLl9pbnN0YW5jZSA9IHRoaXMuX2luc3RhbmNlID8gdGhpcy5faW5zdGFuY2UgOiBuZXcgU2VyaWVzSWNvblByb3ZpZGVyKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgaHRtbCBpbmZvcm1hdGlvbihlLmcgaW1nLCBzdmcsIC4uLikgd2l0aCB0aGUgaWNvbnMgZm9yIGEgc2VyaWVzKG1haW4gaWNvbiArIG92ZXJsYXlzKVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVzSWNvblByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIGdldEljb24oc2VyaWU6IEJhc2VTZXJpZXMpOiBzdHJpbmd7XHJcbiAgICAgICAgbGV0IGljb25EZWZpbml0aW9uID0gdGhpcy5nZXRCYXNlSWNvbkRlZmluaXRpb24oc2VyaWUpO1xyXG5cclxuICAgICAgICBpY29uRGVmaW5pdGlvbiArPSB0aGlzLmdldE92ZXJsYXlJY29uRGVmaW5pdGlvbihzZXJpZSk7XHJcbiAgXHJcbiAgICAgICAgcmV0dXJuIGljb25EZWZpbml0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBodG1sIGluZm9ybWF0aW9uKGUuZyBpbWcsIHN2ZywgLi4uKSB3aXRoIHRoZSBiYXNlIGljb25zIGZvciBhIHNlcmllc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNlcmllXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllc0ljb25Qcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldEJhc2VJY29uRGVmaW5pdGlvbihzZXJpZTogQmFzZVNlcmllcyk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IGljb25EZWZpbml0aW9uID0gXCJcIjtcclxuXHJcbiAgICAgICAgLy8gU2V0IG1haW4gaWNvblxyXG4gICAgICAgIGlmKHNlcmllLnR5cGUgPT0gU2VyaWVzVHlwZS50aW1lU2VyaWVzKXtcclxuICAgICAgICAgICAgaWNvbkRlZmluaXRpb24gKz0gdGhpcy5nZXRTZXJpZXNNYWluSWNvbihTZXJpZXNJY29uUHJvdmlkZXIuZ2V0U3ZnUGF0aChcInRpbWVTZXJpZXNcIiksIHNlcmllLmNvbG9yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihzZXJpZS50eXBlID09IFNlcmllc1R5cGUueHlTZXJpZXMpe1xyXG4gICAgICAgICAgICBpY29uRGVmaW5pdGlvbiArPSB0aGlzLmdldFNlcmllc01haW5JY29uKFNlcmllc0ljb25Qcm92aWRlci5nZXRTdmdQYXRoKFwieHlTZXJpZXNcIiksIHNlcmllLmNvbG9yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihzZXJpZS50eXBlID09IFNlcmllc1R5cGUuZmZ0U2VyaWVzKXtcclxuICAgICAgICAgICAgaWNvbkRlZmluaXRpb24gKz0gdGhpcy5nZXRTZXJpZXNNYWluSWNvbihTZXJpZXNJY29uUHJvdmlkZXIuZ2V0U3ZnUGF0aChcImZmdFNlcmllc1wiKSwgc2VyaWUuY29sb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGljb25EZWZpbml0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpSZXR1cm5zIGh0bWwgaW5mb3JtYXRpb24oZS5nIGltZywgc3ZnLCAuLi4pIHdpdGggdGhlIG92ZXJsYXkgaWNvbnMgZm9yIGEgc2VyaWVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVzSWNvblByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0T3ZlcmxheUljb25EZWZpbml0aW9uKHNlcmllOiBCYXNlU2VyaWVzKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgaWNvbkRlZmluaXRpb24gPSBcIlwiOyAgICBcclxuICAgICAgICBpZihzZXJpZS5pc0NhbGN1bGF0ZWQgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIC8vIFNldCBjYWxjdWxhdGlvbiBvdmVybGF5XHJcbiAgICAgICAgICAgIC8vaWNvbkRlZmluaXRpb24gKz0gJzxpbWcgY2xhc3M9XCJ0cmVlR3JpZFJvd0ljb25cIiBzcmM9XCInICsgU2VyaWVzSWNvblByb3ZpZGVyLmdldFN2Z1BhdGgoXCJjYWxjdWxhdGlvbk92ZXJsYXlcIikgKyAnXCIgLz4nO1xyXG4gICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIGlmKHNlcmllLmlzQXV0b1VwZGF0ZWQgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIC8vIFNldCBhdXRvIHVwZGF0ZSBvdmVybGF5IFxyXG4gICAgICAgICAgICBpY29uRGVmaW5pdGlvbiArPSAnPGltZyBjbGFzcz1cInRyZWVHcmlkUm93SWNvblwiIHNyYz1cIicgKyBTZXJpZXNJY29uUHJvdmlkZXIuZ2V0U3ZnUGF0aChcImF1dG9VcGRhdGVkT3ZlcmxheVwiKSArICdcIiAvPic7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihzZXJpZS5yYXdQb2ludHNWYWxpZCA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgIC8vU2V0IGV4Y2xhbWF0aW9uIG92ZXJsYXkgZm9yIGludmFsaWQgc2VyaWVzXHJcbiAgICAgICAgICAgIGxldCB0b29sdGlwVGV4dCA9IFwiVGhlIGRhdGEgaXMgaW52YWxpZCFcIjsgLy8gRGVmYXVsdCB0b29sdGlwdGV4dCBpbiBjYXNlIG9mIGludmFsaWQgZGF0YVxyXG4gICAgICAgICAgICBsZXQgZXJyb3JUZXh0ID0gU2VyaWVzSWNvblByb3ZpZGVyLmdldFRleHRGcm9tRXJyb3JJbmZvcyhzZXJpZS5lcnJvckluZm8pO1xyXG4gICAgICAgICAgICBpZihlcnJvclRleHQgIT0gXCJcIil7XHJcbiAgICAgICAgICAgICAgICB0b29sdGlwVGV4dCA9IGVycm9yVGV4dDsgLy8gVXNlIGVycm9yIGluZm8gdGV4dCBmb3IgdG9vbHRpcCB0ZXh0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWNvbkRlZmluaXRpb24gKz0gYDxpbWcgdGl0bGU9XCJgKyB0b29sdGlwVGV4dCArYFwiIGNsYXNzPVwidHJlZUdyaWRSb3dJY29uXCIgc3JjPVwiYCArIFNlcmllc0ljb25Qcm92aWRlci5nZXRTdmdQYXRoKFwiZXhjbGFtYXRpb25PdmVybGF5XCIpICsgYFwiIC8+YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGljb25EZWZpbml0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0VGV4dEZyb21FcnJvckluZm9zKGVycm9ySW5mbzogQXJyYXk8c3RyaW5nPil7XHJcbiAgICAgICAgbGV0IGZvcm1hdGVkVGV4dCA9IFwiXCI7XHJcbiAgICAgICAgaWYoZXJyb3JJbmZvICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGlmKGVycm9ySW5mby5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICAgIGZvcm1hdGVkVGV4dCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBlcnJvckluZm8uZm9yRWFjaChlcnJvciA9PntcclxuICAgICAgICAgICAgICAgICAgICBmb3JtYXRlZFRleHQgKz0gZXJyb3IgKyBcIlxcclxcblwiO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmb3JtYXRlZFRleHQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogR2V0IGZpbGVwYXRoIGZvciBzdmcgXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdmdOYW1lXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllc0ljb25Qcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFN2Z1BhdGgoc3ZnTmFtZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCIuLi9hcHAvd2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL3RyZWUvXCIgKyBzdmdOYW1lICsgXCIuc3ZnXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIG1haW4gc2VyaWVzIGljb24gKGUuZy4gdGltZVNlcmllcywgeHlTZXJpZXMsIGZmdFNlcmllcywgLi4uKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbG9yXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllc0ljb25Qcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFNlcmllc01haW5JY29uKHBhdGg6IHN0cmluZywgY29sb3I6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IGltYWdlRGF0YSA9IEltYWdlUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXRJbWFnZShwYXRoKTtcclxuICAgICAgICBpZihpbWFnZURhdGEgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIGltYWdlRGF0YS5yZXBsYWNlKFwic3Ryb2tlOiM3NmJlYTZcIiwgXCJzdHJva2U6XCIgKyBjb2xvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG59Il19