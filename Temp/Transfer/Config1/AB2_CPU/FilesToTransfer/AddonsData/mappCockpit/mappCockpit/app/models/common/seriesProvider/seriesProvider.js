define(["require", "exports", "../../chartManagerDataModel/YTSeries", "../../chartManagerDataModel/FFTSeries", "../../chartManagerDataModel/XYSeries", "../../../common/componentBase/componentBase"], function (require, exports, YTSeries_1, FFTSeries_1, XYSeries_1, componentBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SeriesProvider = /** @class */ (function () {
        /**
         * Creates an instance of SeriesProvider
         * @memberof SeriesProvider
         */
        function SeriesProvider() {
            this._series = new Map();
            this._settingsId = "series";
            this.component = new componentBase_1.ComponentBase(undefined, this);
            this.initializeComponent();
        }
        /**
         * gets a singleton instance of SeriesProvider
         *
         * @readonly
         * @type {ISeriesProvider}
         * @memberof SeriesProvider
         */
        SeriesProvider.getInstance = function () {
            this._instance = this._instance ? this._instance : new SeriesProvider();
            return this._instance;
        };
        /**
         * Disposes the SeriesProvider
         *
         * @memberof SeriesProvider
         */
        SeriesProvider.prototype.dispose = function () {
            this.component.saveComponentSettings();
            this._series.clear();
            SeriesProvider._instance = undefined;
        };
        /**
         * Clears all the data of the SeriesProvider
         *
         * @memberof SeriesProvider
         */
        SeriesProvider.prototype.clear = function () {
            this._series.clear();
        };
        /**
         * Returns the current ComponentSettings
         *
         * @returns {ComponentSettings}
         * @memberof SeriesProvider
         */
        SeriesProvider.prototype.getComponentSettings = function () {
            // Remove Singleton to have the possibility to use more SerieProviders in parallel(for different Trace analyses)
            var series = new Array();
            this._series.forEach(function (serie) {
                series.push(serie.getSettings());
            });
            this.component.setSetting(this._settingsId, series);
            return this.component.getComponentSettings();
        };
        /**
         * Sets the given ComponentSettings
         *
         * @param {(ComponentSettings|undefined)} settings
         * @returns
         * @memberof SeriesProvider
         */
        SeriesProvider.prototype.setComponentSettings = function (settings) {
            var _this = this;
            this.clear();
            this.component.setComponentSettings(settings);
            if (settings == undefined) {
                return;
            }
            var series = this.component.getSetting(this._settingsId);
            series.forEach(function (serie) {
                var newSerie = _this.createSerie(serie);
                if (newSerie != undefined) {
                    _this._series.set(newSerie.id, newSerie);
                }
                else {
                    console.error("Serie with the following type could not be created: " + serie.type);
                }
            });
        };
        /**
         * Initializes the component of this SeriesProvider (e.g. load component settings if found)
         *
         * @memberof SeriesProvider
         */
        SeriesProvider.prototype.initializeComponent = function () {
            this.component.id = "SeriesProvider";
            this.component.type = "SeriesProvider";
            this.component.disablePersisting();
            this.component.loadComponentSettings();
        };
        /**
         * Returns a unique id for a new serie
         *
         * @returns {string}
         * @memberof SeriesProvider
         */
        SeriesProvider.prototype.getUniqueId = function () {
            for (var i = 0; i < Number.MAX_SAFE_INTEGER; i++) {
                var id = i.toString();
                if (this._series.has(id) == false) {
                    return id;
                }
            }
            console.error("No unique id for serie available!");
            return "";
        };
        /**
         * Returns a unique id for a new calculation
         *
         * @returns {string}
         * @memberof SeriesProvider
         */
        SeriesProvider.prototype.getUniqueCalculationId = function () {
            var usedIds = new Array();
            this._series.forEach(function (serie) {
                if (serie.calculationDataInfo != undefined) {
                    usedIds.push(serie.calculationDataInfo.uniqueId);
                }
            });
            for (var i = 1; i < Number.MAX_SAFE_INTEGER; i++) {
                var id = i.toString();
                if (usedIds.includes(id) == false) {
                    return id;
                }
            }
            console.error("No unique calculation id for serie available!");
            return "";
        };
        /**
         * Adds the given serie with the id of the serie to the SeriesProvider
         *
         * @param {BaseSeries} serie
         * @memberof SeriesProvider
         */
        SeriesProvider.prototype.add = function (serie) {
            if (this._series.has(serie.id) == true) {
                console.error("Serie with the given id already in serie provider! => id: " + serie.id);
            }
            this._series.set(serie.id, serie);
        };
        /**
         * Removes the serie with the given id from the SeriesProvider
         *
         * @param {string} id
         * @memberof SeriesProvider
         */
        SeriesProvider.prototype.remove = function (id) {
            this._series.delete(id);
        };
        /**
         * Returns the serie for the given id
         *
         * @param {(string|undefined)} id
         * @returns {(BaseSeries|undefined)}
         * @memberof SeriesProvider
         */
        SeriesProvider.prototype.get = function (id) {
            if (id == undefined) {
                return undefined;
            }
            return this._series.get(id);
        };
        /**
         * Creates a serie for the given settings
         *
         * @private
         * @param {ISettings} settings
         * @returns {(BaseSeries|undefined)}
         * @memberof SeriesProvider
         */
        SeriesProvider.prototype.createSerie = function (settings) {
            // TODO: Handle with settings object factory
            if (settings.type == "YTSeries") {
                return YTSeries_1.YTSeries.create(settings, this);
            }
            else if (settings.type == "FFTSeries") {
                return FFTSeries_1.FFTSeries.create(settings, this);
            }
            else if (settings.type == "XYSeries") {
                return XYSeries_1.XYSeries.create(settings, this);
            }
            return undefined;
        };
        return SeriesProvider;
    }());
    exports.SeriesProvider = SeriesProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWVzUHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9jb21tb24vc2VyaWVzUHJvdmlkZXIvc2VyaWVzUHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBYUE7UUF3Qkk7OztXQUdHO1FBQ0g7WUExQlEsWUFBTyxHQUE0QixJQUFJLEdBQUcsRUFBRSxDQUFDO1lBRXBDLGdCQUFXLEdBQUcsUUFBUSxDQUFDO1lBa0JqQyxjQUFTLEdBQWtCLElBQUksNkJBQWEsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFPakUsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDL0IsQ0FBQztRQXJCRDs7Ozs7O1dBTUc7UUFDVywwQkFBVyxHQUF6QjtZQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxjQUFjLEVBQUUsQ0FBQztZQUV4RSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDMUIsQ0FBQztRQVlEOzs7O1dBSUc7UUFDSSxnQ0FBTyxHQUFkO1lBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDckIsY0FBYyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDekMsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSSw4QkFBSyxHQUFaO1lBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN6QixDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSSw2Q0FBb0IsR0FBM0I7WUFDSSxnSEFBZ0g7WUFDaEgsSUFBSSxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQWEsQ0FBQztZQUVwQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxV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LElBQUcsUUFBUSxDQUFDLElBQUksSUFBSSxVQUFVLEVBQUM7Z0JBQ2hDLE9BQU8sbUJBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQzFDO1lBQ0QsT0FBTyxTQUFTLENBQUM7UUFDckIsQ0FBQztRQUNMLHFCQUFDO0lBQUQsQ0FBQyxBQTdNRCxJQTZNQztJQTdNWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VTZXJpZXMgfSBmcm9tIFwiLi4vLi4vY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2Jhc2VTZXJpZXNcIjtcclxuaW1wb3J0IHsgU2VyaWVzVHlwZSB9IGZyb20gXCIuLi8uLi9jaGFydE1hbmFnZXJEYXRhTW9kZWwvc2VyaWVzVHlwZVwiO1xyXG5pbXBvcnQgeyBZVFNlcmllcyB9IGZyb20gXCIuLi8uLi9jaGFydE1hbmFnZXJEYXRhTW9kZWwvWVRTZXJpZXNcIjtcclxuaW1wb3J0IHsgRkZUU2VyaWVzIH0gZnJvbSBcIi4uLy4uL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9GRlRTZXJpZXNcIjtcclxuaW1wb3J0IHsgSVNlcmllc1Byb3ZpZGVyIH0gZnJvbSBcIi4vc2VyaWVzUHJvdmlkZXJJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgWFlTZXJpZXMgfSBmcm9tIFwiLi4vLi4vY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL1hZU2VyaWVzXCI7XHJcblxyXG5pbXBvcnQgeyBDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnRTZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRCYXNlIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudEJhc2VcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhSW5mbyB9IGZyb20gXCIuLi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRpb25EYXRhSW5mb1wiO1xyXG5pbXBvcnQgeyBJU2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BlcnNpc3RlbmNlL2ludGVyZmFjZXMvc2V0dGluZ3NJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BlcnNpc3RlbmNlL3NldHRpbmdzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU2VyaWVzUHJvdmlkZXIgaW1wbGVtZW50cyBJU2VyaWVzUHJvdmlkZXJ7XHJcbiAgIFxyXG4gICAgcHJpdmF0ZSBfc2VyaWVzOiBNYXA8c3RyaW5nLCBCYXNlU2VyaWVzPiA9IG5ldyBNYXAoKTtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9zZXR0aW5nc0lkID0gXCJzZXJpZXNcIjtcclxuICAgIFxyXG4gICAgLy8gaG9sZHMgYW4gaW5zdGFuY2Ugb2YgdGhpcyBjbGFzc1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBTZXJpZXNQcm92aWRlcnx1bmRlZmluZWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXRzIGEgc2luZ2xldG9uIGluc3RhbmNlIG9mIFNlcmllc1Byb3ZpZGVyXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7SVNlcmllc1Byb3ZpZGVyfVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllc1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogSVNlcmllc1Byb3ZpZGVyIHtcclxuICAgICAgICB0aGlzLl9pbnN0YW5jZSA9IHRoaXMuX2luc3RhbmNlID8gdGhpcy5faW5zdGFuY2UgOiBuZXcgU2VyaWVzUHJvdmlkZXIoKTtcclxuIFxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY29tcG9uZW50OiBDb21wb25lbnRCYXNlID0gbmV3IENvbXBvbmVudEJhc2UodW5kZWZpbmVkLCB0aGlzKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgU2VyaWVzUHJvdmlkZXJcclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZXNQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdGhpcy5pbml0aWFsaXplQ29tcG9uZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNwb3NlcyB0aGUgU2VyaWVzUHJvdmlkZXJcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVzUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRpc3Bvc2UoKXtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5zYXZlQ29tcG9uZW50U2V0dGluZ3MoKTtcclxuICAgICAgICB0aGlzLl9zZXJpZXMuY2xlYXIoKTtcclxuICAgICAgICBTZXJpZXNQcm92aWRlci5faW5zdGFuY2UgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDbGVhcnMgYWxsIHRoZSBkYXRhIG9mIHRoZSBTZXJpZXNQcm92aWRlclxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZXNQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2xlYXIoKXtcclxuICAgICAgICB0aGlzLl9zZXJpZXMuY2xlYXIoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBjdXJyZW50IENvbXBvbmVudFNldHRpbmdzXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudFNldHRpbmdzfVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllc1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRDb21wb25lbnRTZXR0aW5ncygpOiBDb21wb25lbnRTZXR0aW5ncyB7XHJcbiAgICAgICAgLy8gUmVtb3ZlIFNpbmdsZXRvbiB0byBoYXZlIHRoZSBwb3NzaWJpbGl0eSB0byB1c2UgbW9yZSBTZXJpZVByb3ZpZGVycyBpbiBwYXJhbGxlbChmb3IgZGlmZmVyZW50IFRyYWNlIGFuYWx5c2VzKVxyXG4gICAgICAgIGxldCBzZXJpZXMgPSBuZXcgQXJyYXk8SVNldHRpbmdzPigpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX3Nlcmllcy5mb3JFYWNoKChzZXJpZSkgPT4ge1xyXG4gICAgICAgICAgICBzZXJpZXMucHVzaChzZXJpZS5nZXRTZXR0aW5ncygpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5zZXRTZXR0aW5nKHRoaXMuX3NldHRpbmdzSWQsIHNlcmllcyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcG9uZW50LmdldENvbXBvbmVudFNldHRpbmdzKCk7XHJcbiAgICB9XHJcbiAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBnaXZlbiBDb21wb25lbnRTZXR0aW5nc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7KENvbXBvbmVudFNldHRpbmdzfHVuZGVmaW5lZCl9IHNldHRpbmdzXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFNlcmllc1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRDb21wb25lbnRTZXR0aW5ncyhzZXR0aW5nczogQ29tcG9uZW50U2V0dGluZ3N8dW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LnNldENvbXBvbmVudFNldHRpbmdzKHNldHRpbmdzKTtcclxuICAgICAgICBpZihzZXR0aW5ncyA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzZXJpZXM6IEFycmF5PElTZXR0aW5ncz4gPSB0aGlzLmNvbXBvbmVudC5nZXRTZXR0aW5nKHRoaXMuX3NldHRpbmdzSWQpO1xyXG4gICAgICAgIHNlcmllcy5mb3JFYWNoKHNlcmllID0+IHtcclxuICAgICAgICAgICAgbGV0IG5ld1NlcmllID0gdGhpcy5jcmVhdGVTZXJpZShzZXJpZSk7XHJcbiAgICAgICAgICAgIGlmKG5ld1NlcmllICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXJpZXMuc2V0KG5ld1NlcmllLmlkLCBuZXdTZXJpZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJTZXJpZSB3aXRoIHRoZSBmb2xsb3dpbmcgdHlwZSBjb3VsZCBub3QgYmUgY3JlYXRlZDogXCIgKyBzZXJpZS50eXBlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6ZXMgdGhlIGNvbXBvbmVudCBvZiB0aGlzIFNlcmllc1Byb3ZpZGVyIChlLmcuIGxvYWQgY29tcG9uZW50IHNldHRpbmdzIGlmIGZvdW5kKVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZXNQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaW5pdGlhbGl6ZUNvbXBvbmVudCgpe1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmlkID0gXCJTZXJpZXNQcm92aWRlclwiO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LnR5cGUgPSBcIlNlcmllc1Byb3ZpZGVyXCI7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZGlzYWJsZVBlcnNpc3RpbmcoKTtcclxuXHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQubG9hZENvbXBvbmVudFNldHRpbmdzKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhIHVuaXF1ZSBpZCBmb3IgYSBuZXcgc2VyaWVcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllc1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRVbmlxdWVJZCgpOiBzdHJpbmd7XHJcbiAgICAgICAgZm9yKGxldCBpID0wOyBpIDwgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVI7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBpZCA9IGkudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgaWYodGhpcy5fc2VyaWVzLmhhcyhpZCkgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJObyB1bmlxdWUgaWQgZm9yIHNlcmllIGF2YWlsYWJsZSFcIilcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSB1bmlxdWUgaWQgZm9yIGEgbmV3IGNhbGN1bGF0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZXNQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0VW5pcXVlQ2FsY3VsYXRpb25JZCgpOiBzdHJpbmd7XHJcbiAgICAgICAgbGV0IHVzZWRJZHMgPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xyXG4gICAgICAgIHRoaXMuX3Nlcmllcy5mb3JFYWNoKChzZXJpZSkgPT4ge1xyXG4gICAgICAgICAgICBpZihzZXJpZS5jYWxjdWxhdGlvbkRhdGFJbmZvICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICB1c2VkSWRzLnB1c2goc2VyaWUuY2FsY3VsYXRpb25EYXRhSW5mby51bmlxdWVJZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBmb3IobGV0IGkgPTE7IGkgPCBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUjsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGlkID0gaS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICBpZih1c2VkSWRzLmluY2x1ZGVzKGlkKSA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIk5vIHVuaXF1ZSBjYWxjdWxhdGlvbiBpZCBmb3Igc2VyaWUgYXZhaWxhYmxlIVwiKVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyB0aGUgZ2l2ZW4gc2VyaWUgd2l0aCB0aGUgaWQgb2YgdGhlIHNlcmllIHRvIHRoZSBTZXJpZXNQcm92aWRlclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVcclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZXNQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkKHNlcmllOiBCYXNlU2VyaWVzKXtcclxuICAgICAgICBpZih0aGlzLl9zZXJpZXMuaGFzKHNlcmllLmlkKSA9PSB0cnVlKXtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlNlcmllIHdpdGggdGhlIGdpdmVuIGlkIGFscmVhZHkgaW4gc2VyaWUgcHJvdmlkZXIhID0+IGlkOiBcIiArIHNlcmllLmlkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc2VyaWVzLnNldChzZXJpZS5pZCwgc2VyaWUpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgdGhlIHNlcmllIHdpdGggdGhlIGdpdmVuIGlkIGZyb20gdGhlIFNlcmllc1Byb3ZpZGVyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVzUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlbW92ZShpZDogc3RyaW5nKXtcclxuICAgICAgICB0aGlzLl9zZXJpZXMuZGVsZXRlKGlkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHNlcmllIGZvciB0aGUgZ2l2ZW4gaWRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyhzdHJpbmd8dW5kZWZpbmVkKX0gaWRcclxuICAgICAqIEByZXR1cm5zIHsoQmFzZVNlcmllc3x1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllc1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQoaWQ6IHN0cmluZ3x1bmRlZmluZWQpOiBCYXNlU2VyaWVzfHVuZGVmaW5lZHtcclxuICAgICAgICBpZihpZCA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VyaWVzLmdldChpZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgc2VyaWUgZm9yIHRoZSBnaXZlbiBzZXR0aW5nc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0lTZXR0aW5nc30gc2V0dGluZ3NcclxuICAgICAqIEByZXR1cm5zIHsoQmFzZVNlcmllc3x1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllc1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlU2VyaWUoc2V0dGluZ3M6IElTZXR0aW5ncyk6IEJhc2VTZXJpZXN8dW5kZWZpbmVke1xyXG4gICAgICAgIC8vIFRPRE86IEhhbmRsZSB3aXRoIHNldHRpbmdzIG9iamVjdCBmYWN0b3J5XHJcbiAgICAgICAgaWYoc2V0dGluZ3MudHlwZSA9PSBcIllUU2VyaWVzXCIpe1xyXG4gICAgICAgICAgICByZXR1cm4gWVRTZXJpZXMuY3JlYXRlKHNldHRpbmdzLCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihzZXR0aW5ncy50eXBlID09IFwiRkZUU2VyaWVzXCIpe1xyXG4gICAgICAgICAgICByZXR1cm4gRkZUU2VyaWVzLmNyZWF0ZShzZXR0aW5ncywgdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoc2V0dGluZ3MudHlwZSA9PSBcIlhZU2VyaWVzXCIpe1xyXG4gICAgICAgICAgICByZXR1cm4gWFlTZXJpZXMuY3JlYXRlKHNldHRpbmdzLCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxufSJdfQ==