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
define(["require", "exports", "../../models/chartManagerDataModel/seriesType", "../../common/componentBase/componentWithoutSettingsBase", "./defaultComponentSettingsSeriesIconProvider"], function (require, exports, seriesType_1, componentWithoutSettingsBase_1, defaultComponentSettingsSeriesIconProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SeriesIconProvider = /** @class */ (function (_super) {
        __extends(SeriesIconProvider, _super);
        function SeriesIconProvider() {
            return _super !== null && _super.apply(this, arguments) || this;
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
        SeriesIconProvider.prototype.initializeComponent = function () {
            _super.prototype.initializeComponent.call(this);
            this.component.defaultSettingsDataId = defaultComponentSettingsSeriesIconProvider_1.DefaultComponentSettingsSeriesIconProvider.ProviderDefinitionId;
        };
        SeriesIconProvider.prototype.initialize = function () {
            this.component.loadComponentSettings();
            var settings = this.component.getComponentSettings();
            if (settings != undefined) {
                this.setComponentSettings(settings);
            }
        };
        /**
         * Disposes the series icon provider
         *
         * @memberof SeriesIconProvider
         */
        SeriesIconProvider.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        /**
         * Returns the default component settings for this provider
         *
         * @returns {(ComponentSettings|undefined)}
         * @memberof SeriesIconProvider
         */
        SeriesIconProvider.prototype.getDefaultComponentSettings = function () {
            return defaultComponentSettingsSeriesIconProvider_1.DefaultComponentSettingsSeriesIconProvider.getSeriesIconProviderDefinition();
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
                iconDefinition += this.getSeriesMainIcon(this.getSvgPath("timeSeries"), serie.color);
            }
            else if (serie.type == seriesType_1.SeriesType.xySeries) {
                iconDefinition += this.getSeriesMainIcon(this.getSvgPath("xySeries"), serie.color);
            }
            else if (serie.type == seriesType_1.SeriesType.fftSeries) {
                iconDefinition += this.getSeriesMainIcon(this.getSvgPath("fftSeries"), serie.color);
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
                iconDefinition += '<img class="treeGridRowIcon" src="' + this.getSvgPath("autoUpdatedOverlay") + '" />';
            }
            if (serie.rawPointsValid == false) {
                //Set exclamation overlay for invalid series
                var tooltipText = "The data is invalid!"; // Default tooltiptext in case of invalid data
                var errorText = serie.getErrorText();
                if (errorText != "") {
                    tooltipText = errorText; // Use error info text for tooltip text
                }
                iconDefinition += "<img title=\"" + tooltipText + "\" class=\"treeGridRowIcon\" src=\"" + this.getSvgPath("exclamationOverlay") + "\" />";
            }
            return iconDefinition;
        };
        /**
         * Get filepath for svg
         *
         * @param {string} svgName
         * @returns {string}
         * @memberof SeriesIconProvider
         */
        SeriesIconProvider.prototype.getSvgPath = function (svgName) {
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
            var imageProvider = this.component.getSubComponent(defaultComponentSettingsSeriesIconProvider_1.DefaultComponentSettingsSeriesIconProvider.ImageProviderId);
            if (imageProvider != undefined) {
                var imageData = imageProvider.getImage(path);
                if (imageData != undefined) {
                    return imageData.replace("stroke:#76bea6", "stroke:" + color);
                }
            }
            return "";
        };
        return SeriesIconProvider;
    }(componentWithoutSettingsBase_1.ComponentWithoutSettingsBase));
    exports.SeriesIconProvider = SeriesIconProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWVzSWNvblByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NvbW1vbi9zZXJpZXNJY29uUHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVFBO1FBQXdDLHNDQUE0QjtRQUFwRTs7UUFzSkEsQ0FBQztRQWpKRzs7Ozs7O1dBTUc7UUFDVyw4QkFBVyxHQUF6QjtZQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxrQkFBa0IsRUFBRSxDQUFDO1lBQzVFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMxQixDQUFDO1FBRU0sZ0RBQW1CLEdBQTFCO1lBQ0ksaUJBQU0sbUJBQW1CLFdBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsU0FBUyxDQUFDLHFCQUFxQixHQUFHLHVGQUEwQyxDQUFDLG9CQUFvQixDQUFDO1FBQzNHLENBQUM7UUFFRCx1Q0FBVSxHQUFWO1lBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQ3ZDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztZQUNyRCxJQUFHLFFBQVEsSUFBSSxTQUFTLEVBQUM7Z0JBQ3JCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUN2QztRQUNMLENBQUM7UUFFRDs7OztXQUlHO1FBQ0gsb0NBQU8sR0FBUDtZQUNJLGlCQUFNLE9BQU8sV0FBRSxDQUFDO1FBQ3BCLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNILHdEQUEyQixHQUEzQjtZQUNJLE9BQU8sdUZBQTBDLENBQUMsK0JBQStCLEVBQUUsQ0FBQztRQUN4RixDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0gsb0NBQU8sR0FBUCxVQUFR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QyxDQUFDO2lCQUNqRTthQUNKO1lBQ0QsT0FBTyxFQUFFLENBQUM7UUFDZCxDQUFDO1FBQ0wseUJBQUM7SUFBRCxDQUFDLEFBdEpELENBQXdDLDJEQUE0QixHQXNKbkU7SUF0SlksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZVNlcmllcyB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2Jhc2VTZXJpZXNcIjtcclxuaW1wb3J0IHsgU2VyaWVzVHlwZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL3Nlcmllc1R5cGVcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50V2l0aG91dFNldHRpbmdzQmFzZSB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnRXaXRob3V0U2V0dGluZ3NCYXNlXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCB7IERlZmF1bHRDb21wb25lbnRTZXR0aW5nc1Nlcmllc0ljb25Qcm92aWRlciB9IGZyb20gXCIuL2RlZmF1bHRDb21wb25lbnRTZXR0aW5nc1Nlcmllc0ljb25Qcm92aWRlclwiO1xyXG5pbXBvcnQgeyBJSW1hZ2VQcm92aWRlciB9IGZyb20gXCIuL2ludGVyZmFjZXMvaW1hZ2VQcm92aWRlckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJU2VyaWVzSWNvblByb3ZpZGVyIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9zZXJpZXNJY29uUHJvdmlkZXJJbnRlcmZhY2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTZXJpZXNJY29uUHJvdmlkZXIgZXh0ZW5kcyBDb21wb25lbnRXaXRob3V0U2V0dGluZ3NCYXNlIGltcGxlbWVudHMgSVNlcmllc0ljb25Qcm92aWRlcntcclxuXHJcbiAgICAvLyBob2xkcyBhbiBpbnN0YW5jZSBvZiB0aGlzIGNsYXNzXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IFNlcmllc0ljb25Qcm92aWRlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldHMgYSBzaW5nbGV0b24gaW5zdGFuY2Ugb2YgU2VyaWVzSWNvblByb3ZpZGVyXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7U2VyaWVzSWNvblByb3ZpZGVyfVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllc0ljb25Qcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IFNlcmllc0ljb25Qcm92aWRlciB7XHJcbiAgICAgICAgdGhpcy5faW5zdGFuY2UgPSB0aGlzLl9pbnN0YW5jZSA/IHRoaXMuX2luc3RhbmNlIDogbmV3IFNlcmllc0ljb25Qcm92aWRlcigpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGluaXRpYWxpemVDb21wb25lbnQoKXtcclxuICAgICAgICBzdXBlci5pbml0aWFsaXplQ29tcG9uZW50KCk7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZGVmYXVsdFNldHRpbmdzRGF0YUlkID0gRGVmYXVsdENvbXBvbmVudFNldHRpbmdzU2VyaWVzSWNvblByb3ZpZGVyLlByb3ZpZGVyRGVmaW5pdGlvbklkO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRpYWxpemUoKXtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5sb2FkQ29tcG9uZW50U2V0dGluZ3MoKTtcclxuICAgICAgICBsZXQgc2V0dGluZ3MgPSB0aGlzLmNvbXBvbmVudC5nZXRDb21wb25lbnRTZXR0aW5ncygpO1xyXG4gICAgICAgIGlmKHNldHRpbmdzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Q29tcG9uZW50U2V0dGluZ3Moc2V0dGluZ3MpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc3Bvc2VzIHRoZSBzZXJpZXMgaWNvbiBwcm92aWRlclxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZXNJY29uUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgZGlzcG9zZSgpe1xyXG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgY29tcG9uZW50IHNldHRpbmdzIGZvciB0aGlzIHByb3ZpZGVyXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyhDb21wb25lbnRTZXR0aW5nc3x1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllc0ljb25Qcm92aWRlclxyXG4gICAgICovXHJcbiAgICBnZXREZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MoKTogQ29tcG9uZW50U2V0dGluZ3N8dW5kZWZpbmVke1xyXG4gICAgICAgIHJldHVybiBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NTZXJpZXNJY29uUHJvdmlkZXIuZ2V0U2VyaWVzSWNvblByb3ZpZGVyRGVmaW5pdGlvbigpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgaHRtbCBpbmZvcm1hdGlvbihlLmcgaW1nLCBzdmcsIC4uLikgd2l0aCB0aGUgaWNvbnMgZm9yIGEgc2VyaWVzKG1haW4gaWNvbiArIG92ZXJsYXlzKVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVzSWNvblByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIGdldEljb24oc2VyaWU6IEJhc2VTZXJpZXMpOiBzdHJpbmd7XHJcbiAgICAgICAgbGV0IGljb25EZWZpbml0aW9uID0gdGhpcy5nZXRCYXNlSWNvbkRlZmluaXRpb24oc2VyaWUpO1xyXG4gICAgICAgIGljb25EZWZpbml0aW9uICs9IHRoaXMuZ2V0T3ZlcmxheUljb25EZWZpbml0aW9uKHNlcmllKTtcclxuICAgICAgICByZXR1cm4gaWNvbkRlZmluaXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGh0bWwgaW5mb3JtYXRpb24oZS5nIGltZywgc3ZnLCAuLi4pIHdpdGggdGhlIGJhc2UgaWNvbnMgZm9yIGEgc2VyaWVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVzSWNvblByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0QmFzZUljb25EZWZpbml0aW9uKHNlcmllOiBCYXNlU2VyaWVzKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgaWNvbkRlZmluaXRpb24gPSBcIlwiO1xyXG5cclxuICAgICAgICAvLyBTZXQgbWFpbiBpY29uXHJcbiAgICAgICAgaWYoc2VyaWUudHlwZSA9PSBTZXJpZXNUeXBlLnRpbWVTZXJpZXMpe1xyXG4gICAgICAgICAgICBpY29uRGVmaW5pdGlvbiArPSB0aGlzLmdldFNlcmllc01haW5JY29uKHRoaXMuZ2V0U3ZnUGF0aChcInRpbWVTZXJpZXNcIiksIHNlcmllLmNvbG9yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihzZXJpZS50eXBlID09IFNlcmllc1R5cGUueHlTZXJpZXMpe1xyXG4gICAgICAgICAgICBpY29uRGVmaW5pdGlvbiArPSB0aGlzLmdldFNlcmllc01haW5JY29uKHRoaXMuZ2V0U3ZnUGF0aChcInh5U2VyaWVzXCIpLCBzZXJpZS5jb2xvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoc2VyaWUudHlwZSA9PSBTZXJpZXNUeXBlLmZmdFNlcmllcyl7XHJcbiAgICAgICAgICAgIGljb25EZWZpbml0aW9uICs9IHRoaXMuZ2V0U2VyaWVzTWFpbkljb24odGhpcy5nZXRTdmdQYXRoKFwiZmZ0U2VyaWVzXCIpLCBzZXJpZS5jb2xvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gaWNvbkRlZmluaXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlJldHVybnMgaHRtbCBpbmZvcm1hdGlvbihlLmcgaW1nLCBzdmcsIC4uLikgd2l0aCB0aGUgb3ZlcmxheSBpY29ucyBmb3IgYSBzZXJpZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtCYXNlU2VyaWVzfSBzZXJpZVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZXNJY29uUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRPdmVybGF5SWNvbkRlZmluaXRpb24oc2VyaWU6IEJhc2VTZXJpZXMpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBpY29uRGVmaW5pdGlvbiA9IFwiXCI7ICAgIFxyXG4gICAgICAgIGlmKHNlcmllLmlzQ2FsY3VsYXRlZCA9PSB0cnVlKXtcclxuICAgICAgICAgICAgLy8gU2V0IGNhbGN1bGF0aW9uIG92ZXJsYXlcclxuICAgICAgICAgICAgLy9pY29uRGVmaW5pdGlvbiArPSAnPGltZyBjbGFzcz1cInRyZWVHcmlkUm93SWNvblwiIHNyYz1cIicgKyBTZXJpZXNJY29uUHJvdmlkZXIuZ2V0U3ZnUGF0aChcImNhbGN1bGF0aW9uT3ZlcmxheVwiKSArICdcIiAvPic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgaWYoc2VyaWUuaXNBdXRvVXBkYXRlZCA9PSB0cnVlKXtcclxuICAgICAgICAgICAgLy8gU2V0IGF1dG8gdXBkYXRlIG92ZXJsYXkgXHJcbiAgICAgICAgICAgIGljb25EZWZpbml0aW9uICs9ICc8aW1nIGNsYXNzPVwidHJlZUdyaWRSb3dJY29uXCIgc3JjPVwiJyArIHRoaXMuZ2V0U3ZnUGF0aChcImF1dG9VcGRhdGVkT3ZlcmxheVwiKSArICdcIiAvPic7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihzZXJpZS5yYXdQb2ludHNWYWxpZCA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgIC8vU2V0IGV4Y2xhbWF0aW9uIG92ZXJsYXkgZm9yIGludmFsaWQgc2VyaWVzXHJcbiAgICAgICAgICAgIGxldCB0b29sdGlwVGV4dCA9IFwiVGhlIGRhdGEgaXMgaW52YWxpZCFcIjsgLy8gRGVmYXVsdCB0b29sdGlwdGV4dCBpbiBjYXNlIG9mIGludmFsaWQgZGF0YVxyXG4gICAgICAgICAgICBsZXQgZXJyb3JUZXh0ID0gc2VyaWUuZ2V0RXJyb3JUZXh0KCk7XHJcbiAgICAgICAgICAgIGlmKGVycm9yVGV4dCAhPSBcIlwiKXtcclxuICAgICAgICAgICAgICAgIHRvb2x0aXBUZXh0ID0gZXJyb3JUZXh0OyAvLyBVc2UgZXJyb3IgaW5mbyB0ZXh0IGZvciB0b29sdGlwIHRleHRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpY29uRGVmaW5pdGlvbiArPSBgPGltZyB0aXRsZT1cImArIHRvb2x0aXBUZXh0ICtgXCIgY2xhc3M9XCJ0cmVlR3JpZFJvd0ljb25cIiBzcmM9XCJgICsgdGhpcy5nZXRTdmdQYXRoKFwiZXhjbGFtYXRpb25PdmVybGF5XCIpICsgYFwiIC8+YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGljb25EZWZpbml0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IGZpbGVwYXRoIGZvciBzdmcgXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN2Z05hbWVcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVzSWNvblByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRTdmdQYXRoKHN2Z05hbWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy90cmVlL1wiICsgc3ZnTmFtZSArIFwiLnN2Z1wiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSBtYWluIHNlcmllcyBpY29uIChlLmcuIHRpbWVTZXJpZXMsIHh5U2VyaWVzLCBmZnRTZXJpZXMsIC4uLilcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb2xvclxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZXNJY29uUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRTZXJpZXNNYWluSWNvbihwYXRoOiBzdHJpbmcsIGNvbG9yOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBpbWFnZVByb3ZpZGVyID0gdGhpcy5jb21wb25lbnQuZ2V0U3ViQ29tcG9uZW50KERlZmF1bHRDb21wb25lbnRTZXR0aW5nc1Nlcmllc0ljb25Qcm92aWRlci5JbWFnZVByb3ZpZGVySWQpIGFzIElJbWFnZVByb3ZpZGVyO1xyXG4gICAgICAgIGlmKGltYWdlUHJvdmlkZXIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgbGV0IGltYWdlRGF0YSA9IGltYWdlUHJvdmlkZXIuZ2V0SW1hZ2UocGF0aCk7XHJcblxyXG4gICAgICAgICAgICBpZihpbWFnZURhdGEgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpbWFnZURhdGEucmVwbGFjZShcInN0cm9rZTojNzZiZWE2XCIsIFwic3Ryb2tlOlwiICsgY29sb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG59Il19