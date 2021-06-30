define(["require", "exports", "../../../common/componentBase/componentBase", "../../chartManagerDataModel/YTSeries", "../../chartManagerDataModel/FFTSeries", "../../chartManagerDataModel/XYSeries", "./defaultComponentSettings", "../../../common/persistence/persistDataProvider", "../../chartManagerDataModel/settingIds"], function (require, exports, componentBase_1, YTSeries_1, FFTSeries_1, XYSeries_1, defaultComponentSettings_1, persistDataProvider_1, settingIds_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SeriesProvider = /** @class */ (function () {
        /**
         * Creates an instance of SeriesProvider
         * @memberof SeriesProvider
         */
        function SeriesProvider() {
            var _this = this;
            this._serieDataChangedHandler = function (sender, args) { return _this.onSerieDataChanged(sender, args); };
            this._series = new Map();
            this._settingSeriesIds = "seriesIds";
            this._settingSeries = "series";
            this.component = new componentBase_1.ComponentBase(undefined, this);
            // TODO: create initialize method(but call only once in component factory)
            //this.initializeComponent();
        }
        /**
         * gets a singleton instance of SeriesProvider
         * (TODO: Remove Singleton to have the possibility to use more SerieProviders in parallel(for different Trace analyses))
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
         * Returns the default ComponentSettings
         *
         * @returns {(ComponentSettings|undefined)}
         * @memberof SeriesProvider
         */
        SeriesProvider.prototype.getDefaultComponentSettings = function () {
            return defaultComponentSettings_1.DefaultComponentSettings.getSeriesProviderDefinition();
        };
        /**
         * Returns the current ComponentSettings
         *
         * @returns {ComponentSettings}
         * @memberof SeriesProvider
         */
        SeriesProvider.prototype.getComponentSettings = function (onlyModified) {
            var series = new Array();
            this._series.forEach(function (serie) {
                series.push(serie.persistID);
            });
            if (onlyModified == false) {
                var seriesObjects_1 = new Array();
                // Only list of series should be exported, not the serie data
                this._series.forEach(function (serie) {
                    seriesObjects_1.push(serie.getSettings());
                });
                this.component.setSetting(this._settingSeries, seriesObjects_1);
            }
            else {
                this.component.setSetting(this._settingSeries, undefined);
            }
            this.component.setSetting(this._settingSeriesIds, series);
            return this.component.getComponentSettings(onlyModified);
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
            var seriesSettingsObjects = this.component.getSetting(this._settingSeries);
            if (seriesSettingsObjects != undefined) {
                // if series informations are available add to persisting data
                seriesSettingsObjects.forEach(function (seriesSettingsObject) {
                    persistDataProvider_1.PersistDataProvider.getInstance().setDataWithId(_this.getSeriesPersistingId(seriesSettingsObject.data[settingIds_1.SettingIds.SeriesId]), seriesSettingsObject);
                });
                // Clear internal series list because the list will be created with the series list info from the given settings
                this.clear();
            }
            var seriesIds = this.component.getSetting(this._settingSeriesIds);
            if (seriesIds != undefined) {
                seriesIds.forEach(function (serieID) {
                    var serie = persistDataProvider_1.PersistDataProvider.getInstance().getDataWithId(serieID);
                    //Workaround for import problem with mce files where series are not stored seperatly
                    var newSerie;
                    if (serie == undefined) {
                        newSerie = _this.createSerie(serieID);
                    }
                    else {
                        newSerie = _this.createSerie(serie);
                    }
                    if (newSerie != undefined) {
                        _this._series.set(newSerie.id, newSerie);
                    }
                    else {
                        console.error("Serie with the following id could not be created: " + serieID);
                    }
                });
            }
        };
        /**
         * Returns the serie id which should be used for persisting a serie object
         *
         * @public
         * @param {string} serieID
         * @returns {string}
         * @memberof SeriesProvider
         */
        SeriesProvider.prototype.getSeriesPersistingId = function (serieID) {
            return SeriesProvider.getSeriesPersistingIdForComponent(serieID, this.component.id);
        };
        /**
         * Returns the serie id which should be used for persisting or export/import a serie object for the given component id
         *
         * @static
         * @param {string} serieID
         * @param {string} componentID
         * @returns {string}
         * @memberof SeriesProvider
         */
        SeriesProvider.getSeriesPersistingIdForComponent = function (serieID, componentID) {
            return componentID + "_series_" + serieID;
        };
        /**
         * Initializes the component of this SeriesProvider (e.g. load component settings if found)
         *
         * @memberof SeriesProvider
         */
        SeriesProvider.prototype.initializeComponent = function () {
            this.component.id = "SeriesProvider";
            this.component.type = "SeriesProvider";
            this.component.defaultSettingsDataId = defaultComponentSettings_1.DefaultComponentSettings.SeriesProviderDefinitionId;
        };
        SeriesProvider.prototype.initialize = function () {
            this.component.loadComponentSettings();
            var settings = this.component.getComponentSettings();
            if (settings != undefined) {
                this.setComponentSettings(settings);
            }
        };
        SeriesProvider.prototype.initialized = function () {
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
         * Returns html information(e.g img, svg, ...) with the icons for a series(main icon + overlays)
         *
         * @param {BaseSeries} series
         * @returns {string}
         * @memberof SeriesProvider
         */
        SeriesProvider.prototype.getIcon = function (series) {
            var seriesIconProvider = this.component.getSubComponent(defaultComponentSettings_1.DefaultComponentSettings.SeriesIconProviderId);
            if (seriesIconProvider != undefined) {
                return seriesIconProvider.getIcon(series);
            }
            return "";
        };
        SeriesProvider.prototype.getSpecificIcon = function (svgName) {
            var seriesIconProvider = this.component.getSubComponent(defaultComponentSettings_1.DefaultComponentSettings.SeriesIconProviderId);
            if (seriesIconProvider != undefined) {
                return seriesIconProvider.getSvgPath(svgName);
            }
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
            persistDataProvider_1.PersistDataProvider.getInstance().setDataWithId(serie.persistID, serie.getSettings());
            persistDataProvider_1.PersistDataProvider.getInstance().setDataWithId(this.component.id, this.getComponentSettings(true));
            serie.eventDataChanged.attach(this._serieDataChangedHandler);
        };
        /**
         * Updates the data of an existing serie
         *
         * @param {BaseSeries} serie
         * @memberof SeriesProvider
         */
        SeriesProvider.prototype.onSerieDataChanged = function (serie, args) {
            if (this._series != undefined && this._series.has(serie.id) == false) {
                console.error("Serie with the given id is not set in the series provider! => id: " + serie.id);
            }
            this._series.set(serie.id, serie);
            persistDataProvider_1.PersistDataProvider.getInstance().setDataWithId(serie.persistID, serie.getSettings());
        };
        /**
         * Removes the serie with the given id from the SeriesProvider
         *
         * @param {string} id
         * @memberof SeriesProvider
         */
        SeriesProvider.prototype.remove = function (id, disposeSeries) {
            if (disposeSeries === void 0) { disposeSeries = true; }
            persistDataProvider_1.PersistDataProvider.getInstance().setDataWithId(this.getSeriesPersistingId(id), undefined);
            if (disposeSeries) {
                var series = this._series.get(id);
                if (series != undefined) {
                    series.eventDataChanged.detach(this._serieDataChangedHandler);
                    series.dispose();
                }
            }
            this._series.delete(id);
            persistDataProvider_1.PersistDataProvider.getInstance().setDataWithId(this.component.id, this.getComponentSettings(true));
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
         * @param {ISettings} settings
         * @returns {(BaseSeries|undefined)}
         * @memberof SeriesProvider
         */
        SeriesProvider.prototype.createSerie = function (settings) {
            // TODO: Handle with settings object factory
            var serie;
            if (settings.type == "YTSeries") {
                serie = YTSeries_1.YTSeries.create(settings, this);
            }
            else if (settings.type == "FFTSeries") {
                serie = FFTSeries_1.FFTSeries.create(settings, this);
            }
            else if (settings.type == "XYSeries") {
                serie = XYSeries_1.XYSeries.create(settings, this);
            }
            if (serie != undefined) {
                this.add(serie);
            }
            return serie;
        };
        return SeriesProvider;
    }());
    exports.SeriesProvider = SeriesProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWVzUHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9jb21tb24vc2VyaWVzUHJvdmlkZXIvc2VyaWVzUHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBY0E7UUEwQkk7OztXQUdHO1FBQ0g7WUFBQSxpQkFHQztZQS9CTyw2QkFBd0IsR0FBRyxVQUFDLE1BQU0sRUFBRSxJQUFJLElBQUssT0FBQSxLQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFyQyxDQUFxQyxDQUFDO1lBQ25GLFlBQU8sR0FBNEIsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUVwQyxzQkFBaUIsR0FBRyxXQUFXLENBQUM7WUFDaEMsbUJBQWMsR0FBRyxRQUFRLENBQUM7WUFrQnBDLGNBQVMsR0FBa0IsSUFBSSw2QkFBYSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQU9qRSwwRUFBMEU7WUFDMUUsNkJBQTZCO1FBQ2pDLENBQUM7UUF0QkQ7Ozs7Ozs7V0FPRztRQUNXLDBCQUFXLEdBQXpCO1lBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLGNBQWMsRUFBRSxDQUFDO1lBQ3hFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMxQixDQUFDO1FBYUQ7Ozs7V0FJRztRQUNJLGdDQUFPLEdBQWQ7WUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3JCLGNBQWMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQ3pDLENBQUM7UUFFRDs7OztXQUlHO1FBQ0ksOEJBQUssR0FBWjtZQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDekIsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0ksb0RBQTJC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ZXJzaXN0ZW5jZS9pbnRlcmZhY2VzL3NldHRpbmdzSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElTZXJpZXNQcm92aWRlciB9IGZyb20gXCIuL3Nlcmllc1Byb3ZpZGVySW50ZXJmYWNlXCI7XHJcblxyXG5pbXBvcnQgeyBDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnRTZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRCYXNlIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudEJhc2VcIjtcclxuaW1wb3J0IHsgWVRTZXJpZXMgfSBmcm9tIFwiLi4vLi4vY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL1lUU2VyaWVzXCI7XHJcbmltcG9ydCB7IEZGVFNlcmllcyB9IGZyb20gXCIuLi8uLi9jaGFydE1hbmFnZXJEYXRhTW9kZWwvRkZUU2VyaWVzXCI7XHJcbmltcG9ydCB7IFhZU2VyaWVzIH0gZnJvbSBcIi4uLy4uL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9YWVNlcmllc1wiO1xyXG5pbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4uLy4uL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9iYXNlU2VyaWVzXCI7XHJcbmltcG9ydCB7IERlZmF1bHRDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuL2RlZmF1bHRDb21wb25lbnRTZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBJU2VyaWVzSWNvblByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uLy4uL3dpZGdldHMvY29tbW9uL2ludGVyZmFjZXMvc2VyaWVzSWNvblByb3ZpZGVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFBlcnNpc3REYXRhUHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BlcnNpc3RlbmNlL3BlcnNpc3REYXRhUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgU2V0dGluZ0lkcyB9IGZyb20gXCIuLi8uLi9jaGFydE1hbmFnZXJEYXRhTW9kZWwvc2V0dGluZ0lkc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNlcmllc1Byb3ZpZGVyIGltcGxlbWVudHMgSVNlcmllc1Byb3ZpZGVye1xyXG4gICBcclxuICAgIHByaXZhdGUgX3NlcmllRGF0YUNoYW5nZWRIYW5kbGVyID0gKHNlbmRlciwgYXJncykgPT4gdGhpcy5vblNlcmllRGF0YUNoYW5nZWQoc2VuZGVyLCBhcmdzKTtcclxuICAgIHByaXZhdGUgX3NlcmllczogTWFwPHN0cmluZywgQmFzZVNlcmllcz4gPSBuZXcgTWFwKCk7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfc2V0dGluZ1Nlcmllc0lkcyA9IFwic2VyaWVzSWRzXCI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9zZXR0aW5nU2VyaWVzID0gXCJzZXJpZXNcIjtcclxuICAgIFxyXG4gICAgLy8gaG9sZHMgYW4gaW5zdGFuY2Ugb2YgdGhpcyBjbGFzc1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBTZXJpZXNQcm92aWRlcnx1bmRlZmluZWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXRzIGEgc2luZ2xldG9uIGluc3RhbmNlIG9mIFNlcmllc1Byb3ZpZGVyXHJcbiAgICAgKiAoVE9ETzogUmVtb3ZlIFNpbmdsZXRvbiB0byBoYXZlIHRoZSBwb3NzaWJpbGl0eSB0byB1c2UgbW9yZSBTZXJpZVByb3ZpZGVycyBpbiBwYXJhbGxlbChmb3IgZGlmZmVyZW50IFRyYWNlIGFuYWx5c2VzKSlcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtJU2VyaWVzUHJvdmlkZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVzUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBJU2VyaWVzUHJvdmlkZXIge1xyXG4gICAgICAgIHRoaXMuX2luc3RhbmNlID0gdGhpcy5faW5zdGFuY2UgPyB0aGlzLl9pbnN0YW5jZSA6IG5ldyBTZXJpZXNQcm92aWRlcigpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY29tcG9uZW50OiBDb21wb25lbnRCYXNlID0gbmV3IENvbXBvbmVudEJhc2UodW5kZWZpbmVkLCB0aGlzKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgU2VyaWVzUHJvdmlkZXJcclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZXNQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIC8vIFRPRE86IGNyZWF0ZSBpbml0aWFsaXplIG1ldGhvZChidXQgY2FsbCBvbmx5IG9uY2UgaW4gY29tcG9uZW50IGZhY3RvcnkpXHJcbiAgICAgICAgLy90aGlzLmluaXRpYWxpemVDb21wb25lbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc3Bvc2VzIHRoZSBTZXJpZXNQcm92aWRlclxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZXNQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpe1xyXG4gICAgICAgIHRoaXMuX3Nlcmllcy5jbGVhcigpO1xyXG4gICAgICAgIFNlcmllc1Byb3ZpZGVyLl9pbnN0YW5jZSA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENsZWFycyBhbGwgdGhlIGRhdGEgb2YgdGhlIFNlcmllc1Byb3ZpZGVyXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllc1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjbGVhcigpe1xyXG4gICAgICAgIHRoaXMuX3Nlcmllcy5jbGVhcigpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgQ29tcG9uZW50U2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7KENvbXBvbmVudFNldHRpbmdzfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVzUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldERlZmF1bHRDb21wb25lbnRTZXR0aW5ncygpOiBDb21wb25lbnRTZXR0aW5nc3x1bmRlZmluZWQge1xyXG4gICAgICAgIHJldHVybiBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuZ2V0U2VyaWVzUHJvdmlkZXJEZWZpbml0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBjdXJyZW50IENvbXBvbmVudFNldHRpbmdzXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudFNldHRpbmdzfVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllc1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRDb21wb25lbnRTZXR0aW5ncyhvbmx5TW9kaWZpZWQ6IGJvb2xlYW4pOiBDb21wb25lbnRTZXR0aW5ncyB7XHJcbiAgICAgICAgbGV0IHNlcmllcyA9IG5ldyBBcnJheTxzdHJpbmc+KCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fc2VyaWVzLmZvckVhY2goKHNlcmllKSA9PiB7XHJcbiAgICAgICAgICAgIHNlcmllcy5wdXNoKHNlcmllLnBlcnNpc3RJRCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYob25seU1vZGlmaWVkID09IGZhbHNlKXtcclxuICAgICAgICAgICAgbGV0IHNlcmllc09iamVjdHMgPSBuZXcgQXJyYXk8SVNldHRpbmdzPigpO1xyXG4gICAgICAgICAgICAvLyBPbmx5IGxpc3Qgb2Ygc2VyaWVzIHNob3VsZCBiZSBleHBvcnRlZCwgbm90IHRoZSBzZXJpZSBkYXRhXHJcbiAgICAgICAgICAgIHRoaXMuX3Nlcmllcy5mb3JFYWNoKChzZXJpZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc2VyaWVzT2JqZWN0cy5wdXNoKHNlcmllLmdldFNldHRpbmdzKCkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuc2V0U2V0dGluZyh0aGlzLl9zZXR0aW5nU2VyaWVzLCBzZXJpZXNPYmplY3RzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuc2V0U2V0dGluZyh0aGlzLl9zZXR0aW5nU2VyaWVzLCB1bmRlZmluZWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5zZXRTZXR0aW5nKHRoaXMuX3NldHRpbmdTZXJpZXNJZHMsIHNlcmllcyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcG9uZW50LmdldENvbXBvbmVudFNldHRpbmdzKG9ubHlNb2RpZmllZCk7XHJcbiAgICB9XHJcbiAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBnaXZlbiBDb21wb25lbnRTZXR0aW5nc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7KENvbXBvbmVudFNldHRpbmdzfHVuZGVmaW5lZCl9IHNldHRpbmdzXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFNlcmllc1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRDb21wb25lbnRTZXR0aW5ncyhzZXR0aW5nczogQ29tcG9uZW50U2V0dGluZ3N8dW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LnNldENvbXBvbmVudFNldHRpbmdzKHNldHRpbmdzKTtcclxuICAgICAgICBpZihzZXR0aW5ncyA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc2VyaWVzU2V0dGluZ3NPYmplY3RzOiBBcnJheTxJU2V0dGluZ3M+ID0gdGhpcy5jb21wb25lbnQuZ2V0U2V0dGluZyh0aGlzLl9zZXR0aW5nU2VyaWVzKTtcclxuICAgICAgICBpZihzZXJpZXNTZXR0aW5nc09iamVjdHMgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gaWYgc2VyaWVzIGluZm9ybWF0aW9ucyBhcmUgYXZhaWxhYmxlIGFkZCB0byBwZXJzaXN0aW5nIGRhdGFcclxuICAgICAgICAgICAgc2VyaWVzU2V0dGluZ3NPYmplY3RzLmZvckVhY2goc2VyaWVzU2V0dGluZ3NPYmplY3QgPT4ge1xyXG4gICAgICAgICAgICAgICAgUGVyc2lzdERhdGFQcm92aWRlci5nZXRJbnN0YW5jZSgpLnNldERhdGFXaXRoSWQodGhpcy5nZXRTZXJpZXNQZXJzaXN0aW5nSWQoc2VyaWVzU2V0dGluZ3NPYmplY3QuZGF0YVtTZXR0aW5nSWRzLlNlcmllc0lkXSksIHNlcmllc1NldHRpbmdzT2JqZWN0KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIENsZWFyIGludGVybmFsIHNlcmllcyBsaXN0IGJlY2F1c2UgdGhlIGxpc3Qgd2lsbCBiZSBjcmVhdGVkIHdpdGggdGhlIHNlcmllcyBsaXN0IGluZm8gZnJvbSB0aGUgZ2l2ZW4gc2V0dGluZ3NcclxuICAgICAgICAgICAgdGhpcy5jbGVhcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBsZXQgc2VyaWVzSWRzOiBBcnJheTxzdHJpbmc+ID0gdGhpcy5jb21wb25lbnQuZ2V0U2V0dGluZyh0aGlzLl9zZXR0aW5nU2VyaWVzSWRzKTtcclxuICAgICAgICBpZihzZXJpZXNJZHMgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgc2VyaWVzSWRzLmZvckVhY2goc2VyaWVJRCA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2VyaWUgPSBQZXJzaXN0RGF0YVByb3ZpZGVyLmdldEluc3RhbmNlKCkuZ2V0RGF0YVdpdGhJZChzZXJpZUlEKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL1dvcmthcm91bmQgZm9yIGltcG9ydCBwcm9ibGVtIHdpdGggbWNlIGZpbGVzIHdoZXJlIHNlcmllcyBhcmUgbm90IHN0b3JlZCBzZXBlcmF0bHlcclxuICAgICAgICAgICAgICAgIGxldCBuZXdTZXJpZTtcclxuICAgICAgICAgICAgICAgIGlmKHNlcmllID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3U2VyaWUgPSB0aGlzLmNyZWF0ZVNlcmllKHNlcmllSUQgYXMgYW55KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3U2VyaWUgPSB0aGlzLmNyZWF0ZVNlcmllKHNlcmllKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihuZXdTZXJpZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Nlcmllcy5zZXQobmV3U2VyaWUuaWQsIG5ld1NlcmllKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlNlcmllIHdpdGggdGhlIGZvbGxvd2luZyBpZCBjb3VsZCBub3QgYmUgY3JlYXRlZDogXCIgKyBzZXJpZUlEKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgc2VyaWUgaWQgd2hpY2ggc2hvdWxkIGJlIHVzZWQgZm9yIHBlcnNpc3RpbmcgYSBzZXJpZSBvYmplY3RcclxuICAgICAqXHJcbiAgICAgKiBAcHVibGljXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VyaWVJRFxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZXNQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0U2VyaWVzUGVyc2lzdGluZ0lkKHNlcmllSUQ6IHN0cmluZyk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gU2VyaWVzUHJvdmlkZXIuZ2V0U2VyaWVzUGVyc2lzdGluZ0lkRm9yQ29tcG9uZW50KHNlcmllSUQsIHRoaXMuY29tcG9uZW50LmlkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHNlcmllIGlkIHdoaWNoIHNob3VsZCBiZSB1c2VkIGZvciBwZXJzaXN0aW5nIG9yIGV4cG9ydC9pbXBvcnQgYSBzZXJpZSBvYmplY3QgZm9yIHRoZSBnaXZlbiBjb21wb25lbnQgaWRcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VyaWVJRFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbXBvbmVudElEXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllc1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0U2VyaWVzUGVyc2lzdGluZ0lkRm9yQ29tcG9uZW50KHNlcmllSUQ6IHN0cmluZywgY29tcG9uZW50SUQ6IHN0cmluZyk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gY29tcG9uZW50SUQgKyBcIl9zZXJpZXNfXCIgKyBzZXJpZUlEO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6ZXMgdGhlIGNvbXBvbmVudCBvZiB0aGlzIFNlcmllc1Byb3ZpZGVyIChlLmcuIGxvYWQgY29tcG9uZW50IHNldHRpbmdzIGlmIGZvdW5kKVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZXNQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaW5pdGlhbGl6ZUNvbXBvbmVudCgpe1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmlkID0gXCJTZXJpZXNQcm92aWRlclwiO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LnR5cGUgPSBcIlNlcmllc1Byb3ZpZGVyXCI7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZGVmYXVsdFNldHRpbmdzRGF0YUlkID0gRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLlNlcmllc1Byb3ZpZGVyRGVmaW5pdGlvbklkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0aWFsaXplKCl7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQubG9hZENvbXBvbmVudFNldHRpbmdzKCk7XHJcbiAgICAgICAgbGV0IHNldHRpbmdzID0gdGhpcy5jb21wb25lbnQuZ2V0Q29tcG9uZW50U2V0dGluZ3MoKTtcclxuICAgICAgICBpZihzZXR0aW5ncyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLnNldENvbXBvbmVudFNldHRpbmdzKHNldHRpbmdzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluaXRpYWxpemVkKCl7XHJcblxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSB1bmlxdWUgaWQgZm9yIGEgbmV3IHNlcmllXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZXNQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0VW5pcXVlSWQoKTogc3RyaW5ne1xyXG4gICAgICAgIGZvcihsZXQgaSA9MDsgaSA8IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgaWQgPSBpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX3Nlcmllcy5oYXMoaWQpID09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiTm8gdW5pcXVlIGlkIGZvciBzZXJpZSBhdmFpbGFibGUhXCIpXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgdW5pcXVlIGlkIGZvciBhIG5ldyBjYWxjdWxhdGlvblxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVzUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFVuaXF1ZUNhbGN1bGF0aW9uSWQoKTogc3RyaW5ne1xyXG4gICAgICAgIGxldCB1c2VkSWRzID0gbmV3IEFycmF5PHN0cmluZz4oKTtcclxuICAgICAgICB0aGlzLl9zZXJpZXMuZm9yRWFjaCgoc2VyaWUpID0+IHtcclxuICAgICAgICAgICAgaWYoc2VyaWUuY2FsY3VsYXRpb25EYXRhSW5mbyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgdXNlZElkcy5wdXNoKHNlcmllLmNhbGN1bGF0aW9uRGF0YUluZm8udW5pcXVlSWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZm9yKGxldCBpID0xOyBpIDwgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVI7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBpZCA9IGkudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgaWYodXNlZElkcy5pbmNsdWRlcyhpZCkgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJObyB1bmlxdWUgY2FsY3VsYXRpb24gaWQgZm9yIHNlcmllIGF2YWlsYWJsZSFcIilcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgaHRtbCBpbmZvcm1hdGlvbihlLmcgaW1nLCBzdmcsIC4uLikgd2l0aCB0aGUgaWNvbnMgZm9yIGEgc2VyaWVzKG1haW4gaWNvbiArIG92ZXJsYXlzKVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVzXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllc1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIGdldEljb24oc2VyaWVzOiBCYXNlU2VyaWVzKTogc3RyaW5ne1xyXG4gICAgICAgIGxldCBzZXJpZXNJY29uUHJvdmlkZXIgPSB0aGlzLmNvbXBvbmVudC5nZXRTdWJDb21wb25lbnQoRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLlNlcmllc0ljb25Qcm92aWRlcklkKSBhcyBJU2VyaWVzSWNvblByb3ZpZGVyO1xyXG4gICAgICAgIGlmKHNlcmllc0ljb25Qcm92aWRlciAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gc2VyaWVzSWNvblByb3ZpZGVyLmdldEljb24oc2VyaWVzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U3BlY2lmaWNJY29uKHN2Z05hbWU6IHN0cmluZyk6IHN0cmluZ3tcclxuICAgICAgICBsZXQgc2VyaWVzSWNvblByb3ZpZGVyID0gdGhpcy5jb21wb25lbnQuZ2V0U3ViQ29tcG9uZW50KERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5TZXJpZXNJY29uUHJvdmlkZXJJZCkgYXMgSVNlcmllc0ljb25Qcm92aWRlcjtcclxuICAgICAgICBpZihzZXJpZXNJY29uUHJvdmlkZXIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIHNlcmllc0ljb25Qcm92aWRlci5nZXRTdmdQYXRoKHN2Z05hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgdGhlIGdpdmVuIHNlcmllIHdpdGggdGhlIGlkIG9mIHRoZSBzZXJpZSB0byB0aGUgU2VyaWVzUHJvdmlkZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNlcmllXHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVzUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZChzZXJpZTogQmFzZVNlcmllcyl7XHJcbiAgICAgICAgaWYodGhpcy5fc2VyaWVzLmhhcyhzZXJpZS5pZCkgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJTZXJpZSB3aXRoIHRoZSBnaXZlbiBpZCBhbHJlYWR5IGluIHNlcmllIHByb3ZpZGVyISA9PiBpZDogXCIgKyBzZXJpZS5pZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3Nlcmllcy5zZXQoc2VyaWUuaWQsIHNlcmllKTtcclxuICAgICAgICBcclxuICAgICAgICBQZXJzaXN0RGF0YVByb3ZpZGVyLmdldEluc3RhbmNlKCkuc2V0RGF0YVdpdGhJZChzZXJpZS5wZXJzaXN0SUQsIHNlcmllLmdldFNldHRpbmdzKCkpO1xyXG4gICAgICAgIFBlcnNpc3REYXRhUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5zZXREYXRhV2l0aElkKHRoaXMuY29tcG9uZW50LmlkLCB0aGlzLmdldENvbXBvbmVudFNldHRpbmdzKHRydWUpKTtcclxuICAgICAgICBcclxuICAgICAgICBzZXJpZS5ldmVudERhdGFDaGFuZ2VkLmF0dGFjaCh0aGlzLl9zZXJpZURhdGFDaGFuZ2VkSGFuZGxlcilcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBkYXRhIG9mIGFuIGV4aXN0aW5nIHNlcmllXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtCYXNlU2VyaWVzfSBzZXJpZVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllc1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25TZXJpZURhdGFDaGFuZ2VkKHNlcmllOiBCYXNlU2VyaWVzLCBhcmdzKXtcclxuICAgICAgICBpZih0aGlzLl9zZXJpZXMgIT0gdW5kZWZpbmVkICYmIHRoaXMuX3Nlcmllcy5oYXMoc2VyaWUuaWQpID09IGZhbHNlKXtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlNlcmllIHdpdGggdGhlIGdpdmVuIGlkIGlzIG5vdCBzZXQgaW4gdGhlIHNlcmllcyBwcm92aWRlciEgPT4gaWQ6IFwiICsgc2VyaWUuaWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fc2VyaWVzLnNldChzZXJpZS5pZCwgc2VyaWUpO1xyXG4gICAgICAgIFBlcnNpc3REYXRhUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5zZXREYXRhV2l0aElkKHNlcmllLnBlcnNpc3RJRCwgc2VyaWUuZ2V0U2V0dGluZ3MoKSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyB0aGUgc2VyaWUgd2l0aCB0aGUgZ2l2ZW4gaWQgZnJvbSB0aGUgU2VyaWVzUHJvdmlkZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZXNQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVtb3ZlKGlkOiBzdHJpbmcsIGRpc3Bvc2VTZXJpZXMgPSB0cnVlKXtcclxuICAgICAgICBQZXJzaXN0RGF0YVByb3ZpZGVyLmdldEluc3RhbmNlKCkuc2V0RGF0YVdpdGhJZCh0aGlzLmdldFNlcmllc1BlcnNpc3RpbmdJZChpZCksIHVuZGVmaW5lZCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoZGlzcG9zZVNlcmllcyl7XHJcbiAgICAgICAgICAgIGxldCBzZXJpZXMgPSB0aGlzLl9zZXJpZXMuZ2V0KGlkKTtcclxuICAgICAgICAgICAgaWYoc2VyaWVzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBzZXJpZXMuZXZlbnREYXRhQ2hhbmdlZC5kZXRhY2godGhpcy5fc2VyaWVEYXRhQ2hhbmdlZEhhbmRsZXIpXHJcbiAgICAgICAgICAgICAgICBzZXJpZXMuZGlzcG9zZSgpOyAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9zZXJpZXMuZGVsZXRlKGlkKTtcclxuICAgICAgICBQZXJzaXN0RGF0YVByb3ZpZGVyLmdldEluc3RhbmNlKCkuc2V0RGF0YVdpdGhJZCh0aGlzLmNvbXBvbmVudC5pZCwgdGhpcy5nZXRDb21wb25lbnRTZXR0aW5ncyh0cnVlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBzZXJpZSBmb3IgdGhlIGdpdmVuIGlkXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsoc3RyaW5nfHVuZGVmaW5lZCl9IGlkXHJcbiAgICAgKiBAcmV0dXJucyB7KEJhc2VTZXJpZXN8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZXNQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0KGlkOiBzdHJpbmd8dW5kZWZpbmVkKTogQmFzZVNlcmllc3x1bmRlZmluZWR7XHJcbiAgICAgICAgaWYoaWQgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Nlcmllcy5nZXQoaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIHNlcmllIGZvciB0aGUgZ2l2ZW4gc2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lTZXR0aW5nc30gc2V0dGluZ3NcclxuICAgICAqIEByZXR1cm5zIHsoQmFzZVNlcmllc3x1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllc1Byb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjcmVhdGVTZXJpZShzZXR0aW5nczogSVNldHRpbmdzKTogQmFzZVNlcmllc3x1bmRlZmluZWR7XHJcbiAgICAgICAgLy8gVE9ETzogSGFuZGxlIHdpdGggc2V0dGluZ3Mgb2JqZWN0IGZhY3RvcnlcclxuICAgICAgICBsZXQgc2VyaWUgOiBCYXNlU2VyaWVzfHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgaWYoc2V0dGluZ3MudHlwZSA9PSBcIllUU2VyaWVzXCIpe1xyXG4gICAgICAgICAgICBzZXJpZSA9ICBZVFNlcmllcy5jcmVhdGUoc2V0dGluZ3MsIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHNldHRpbmdzLnR5cGUgPT0gXCJGRlRTZXJpZXNcIil7XHJcbiAgICAgICAgICAgIHNlcmllID0gIEZGVFNlcmllcy5jcmVhdGUoc2V0dGluZ3MsIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHNldHRpbmdzLnR5cGUgPT0gXCJYWVNlcmllc1wiKXtcclxuICAgICAgICAgICAgc2VyaWUgPSAgWFlTZXJpZXMuY3JlYXRlKHNldHRpbmdzLCB0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHNlcmllICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkKHNlcmllKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzZXJpZTtcclxuICAgIH1cclxufSJdfQ==