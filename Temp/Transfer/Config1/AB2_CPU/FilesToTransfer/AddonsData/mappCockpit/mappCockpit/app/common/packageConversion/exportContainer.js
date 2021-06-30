define(["require", "exports", "./package", "./enum/dataTypeEnum", "./enum/objectTypeEnum", "./enum/additionalMetaKeys", "../../models/chartManagerDataModel/baseSeriesPackageAdapter", "../../models/chartManagerDataModel/ytSeriesPackageAdapter", "../../models/chartManagerDataModel/xySeriesPackageAdapter", "../../models/chartManagerDataModel/fftSeriesPackageAdapter", "../../models/common/signal/signalPackageAdapter", "../../models/common/calculatorProvider/calculationDataInfoPackageAdapter", "../../models/signalManagerDataModel/serieGroupPackageAdapter", "../../models/signalManagerDataModel/categoryPackageAdapter", "../../models/common/seriesProvider/seriesProviderPackageAdapter", "../../models/signalManagerDataModel/signalManagerDataModelPackageAdapter", "../../models/chartManagerDataModel/scalesPackageAdapter", "../../models/chartManagerDataModel/chartManagerChartPackageAdapter", "../../models/chartManagerDataModel/chartManagerDataModelPackageAdapter", "../../widgets/common/states/cursorStatesPackageAdapter"], function (require, exports, package_1, dataTypeEnum_1, objectTypeEnum_1, additionalMetaKeys_1, baseSeriesPackageAdapter_1, ytSeriesPackageAdapter_1, xySeriesPackageAdapter_1, fftSeriesPackageAdapter_1, signalPackageAdapter_1, calculationDataInfoPackageAdapter_1, serieGroupPackageAdapter_1, categoryPackageAdapter_1, seriesProviderPackageAdapter_1, signalManagerDataModelPackageAdapter_1, scalesPackageAdapter_1, chartManagerChartPackageAdapter_1, chartManagerDataModelPackageAdapter_1, cursorStatesPackageAdapter_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ExportContainer = /** @class */ (function () {
        /**
         * Creates an instance of ExportContainer.
         * @memberof ExportContainer
         */
        function ExportContainer() {
            this._container = new Array();
        }
        /**
         * Creates an ExportContainer from an array containing IPackage data
         *
         * @static
         * @param {Array<IPackage>} packages
         * @returns {ExportContainer}
         * @memberof ExportContainer
         */
        ExportContainer.fromPackages = function (packages) {
            var container = new ExportContainer();
            container._container = packages;
            return container;
        };
        /**
         * Creates an ExportContainer from a string containing a JSON representing an array containing IPackage data.
         *
         * @static
         * @param {string} str
         * @returns {ExportContainer}
         * @memberof ExportContainer
         */
        ExportContainer.fromJson = function (str) {
            var container = new ExportContainer();
            var parsedData = JSON.parse(str, package_1.Package.reviver);
            if (Array.isArray(parsedData)) {
                container._container = parsedData;
            }
            else {
                container = ExportContainer.fromLegacyFormat(parsedData);
            }
            return container;
        };
        /**
         * Transforms legacy mce export format to an array containing IPackage data
         *
         * @private
         * @static
         * @param {Object} parsedData
         * @returns {Array<IPackage>}
         * @memberof ExportContainer
         */
        ExportContainer.fromLegacyFormat = function (parsedData) {
            var container = new ExportContainer();
            if (parsedData["SignalManagerDataModel"] !== undefined) {
                container.addSettings(parsedData["SignalManagerDataModel"], "SignalManagerDataModel");
            }
            if (parsedData["SeriesProvider"] !== undefined) {
                container.addSettings(parsedData["SeriesProvider"], "SeriesProvider");
            }
            return container;
        };
        /**
         * Creates the necessary IPackage data to represent ISettings data.
         *
         * @static
         * @param {ISettings} data
         * @returns {IPackage[]}
         * @memberof ExportContainer
         */
        ExportContainer.createPackages = function (data) {
            var packageStructure = {
                packages: new Array(),
                topLevelID: NaN
            };
            var adapter = ExportContainer.getAdapterToSettings(data);
            if (adapter !== null) {
                packageStructure = adapter.settingToPackage(data);
            }
            return packageStructure;
        };
        /**
         * Adds a setting to the the export container.
         *
         * @param {ISettings} setting
         * @returns {boolean}
         * @memberof ExportContainer
         */
        ExportContainer.prototype.addSettings = function (setting, key) {
            var _a;
            var success = false;
            if (this._container.every(function (packet) { return packet.meta[additionalMetaKeys_1.AdditionalMetaKeys.KEY] !== key; })) {
                var packageStructure_1 = ExportContainer.createPackages(setting);
                if (packageStructure_1.packages.length > 0 && !Number.isNaN(packageStructure_1.topLevelID)) {
                    var topLevelPackage = packageStructure_1.packages.find(function (p) { return p.meta[additionalMetaKeys_1.AdditionalMetaKeys.ID] === packageStructure_1.topLevelID; });
                    if (topLevelPackage !== undefined) {
                        topLevelPackage.meta[additionalMetaKeys_1.AdditionalMetaKeys.KEY] = key;
                        (_a = this._container).push.apply(_a, packageStructure_1.packages);
                        success = true;
                    }
                }
            }
            return success;
        };
        /**
         * Returns the associated package adapter to an ISettings based on the settings type.
         *
         * @private
         * @static
         * @param {ISettings} setting
         * @returns {(IPackageAdapter | null)}
         * @memberof ExportContainer
         */
        ExportContainer.getAdapterToSettings = function (setting) {
            /* tslint:disable:max-func-body-length */ // disabled due to switch case
            var adapter = null;
            switch (setting.type) {
                case "BaseSeries":
                    adapter = new baseSeriesPackageAdapter_1.BaseSeriesPackageAdapter();
                    break;
                case "YTSeries":
                    adapter = new ytSeriesPackageAdapter_1.YTSeriesPackageAdapter();
                    break;
                case "XYSeries":
                    adapter = new xySeriesPackageAdapter_1.XYSeriesPackageAdapter();
                    break;
                case "FFTSeries":
                    adapter = new fftSeriesPackageAdapter_1.FFTSeriesPackageAdapter();
                    break;
                case "Signal":
                    adapter = new signalPackageAdapter_1.SignalPackageAdapter();
                    break;
                case "CalculationDataInfo":
                    adapter = new calculationDataInfoPackageAdapter_1.CalculationDataPackageAdapter();
                    break;
                case "SeriesProvider":
                    adapter = new seriesProviderPackageAdapter_1.SeriesProviderPackageAdapter();
                    break;
                case "SerieGroup":
                    adapter = new serieGroupPackageAdapter_1.SerieGroupPackageAdapter();
                    break;
                case "category":
                    adapter = new categoryPackageAdapter_1.CategoryPackageAdapter();
                    break;
                case "SignalManagerDataModel":
                    adapter = new signalManagerDataModelPackageAdapter_1.SignalManagerDataModelPackageAdapter();
                    break;
                case "Scale":
                    adapter = new scalesPackageAdapter_1.ScalePackageAdapter();
                    break;
                case "Chart":
                    adapter = new chartManagerChartPackageAdapter_1.ChartManagerChartPackageAdapter();
                    break;
                case "ChartManagerDataModel":
                    adapter = new chartManagerDataModelPackageAdapter_1.ChartManagerDataModelPackageAdapter();
                    break;
                case "CursorStates":
                    adapter = new cursorStatesPackageAdapter_1.CursorStatesPackageAdapter();
                    break;
            }
            return adapter;
            /* tslint:enable:max-func-body-length */
        };
        /**
         * Returns the associated package adapter to an IPackage based on the meta data.
         *
         * @private
         * @static
         * @param {IPackage} packet
         * @returns {(IPackageAdapter | null)}
         * @memberof ExportContainer
         */
        ExportContainer.getAdapterToPackage = function (packet) {
            /* tslint:disable:max-func-body-length */ // disabled due to switch case
            var adapter = null;
            if (packet.meta.dataType === dataTypeEnum_1.DataType.OBJECT) {
                switch (packet.meta[additionalMetaKeys_1.AdditionalMetaKeys.OBJECTTYPE]) {
                    case objectTypeEnum_1.ObjectType.BASESERIES:
                        adapter = new baseSeriesPackageAdapter_1.BaseSeriesPackageAdapter();
                        break;
                    case objectTypeEnum_1.ObjectType.YTSERIES:
                        adapter = new ytSeriesPackageAdapter_1.YTSeriesPackageAdapter();
                        break;
                    case objectTypeEnum_1.ObjectType.XYSERIES:
                        adapter = new xySeriesPackageAdapter_1.XYSeriesPackageAdapter();
                        break;
                    case objectTypeEnum_1.ObjectType.FFTSERIES:
                        adapter = new fftSeriesPackageAdapter_1.FFTSeriesPackageAdapter();
                        break;
                    case objectTypeEnum_1.ObjectType.SIGNAL:
                        adapter = new signalPackageAdapter_1.SignalPackageAdapter();
                        break;
                    case objectTypeEnum_1.ObjectType.CALCULATION:
                        adapter = new calculationDataInfoPackageAdapter_1.CalculationDataPackageAdapter();
                        break;
                    case objectTypeEnum_1.ObjectType.SERIESPROVIDER:
                        adapter = new seriesProviderPackageAdapter_1.SeriesProviderPackageAdapter();
                        break;
                    case objectTypeEnum_1.ObjectType.SERIEGROUP:
                        adapter = new serieGroupPackageAdapter_1.SerieGroupPackageAdapter();
                        break;
                    case objectTypeEnum_1.ObjectType.CATEGORY:
                        adapter = new categoryPackageAdapter_1.CategoryPackageAdapter();
                        break;
                    case objectTypeEnum_1.ObjectType.SIGNALMANAGERDATAMODEL:
                        adapter = new signalManagerDataModelPackageAdapter_1.SignalManagerDataModelPackageAdapter();
                        break;
                    case objectTypeEnum_1.ObjectType.SCALE:
                        adapter = new scalesPackageAdapter_1.ScalePackageAdapter();
                        break;
                    case objectTypeEnum_1.ObjectType.CHART:
                        adapter = new chartManagerChartPackageAdapter_1.ChartManagerChartPackageAdapter();
                        break;
                    case objectTypeEnum_1.ObjectType.CHARTMANAGERDATAMODEL:
                        adapter = new chartManagerDataModelPackageAdapter_1.ChartManagerDataModelPackageAdapter();
                        break;
                    case objectTypeEnum_1.ObjectType.CURSORSTATES:
                        adapter = new cursorStatesPackageAdapter_1.CursorStatesPackageAdapter();
                }
            }
            return adapter;
            /* tslint:enable:max-func-body-length */
        };
        /**
         * Returns all top level settings (which are not part of another setting).
         *
         * @returns {Map<string,ISettings>}
         * @memberof ExportContainer
         */
        ExportContainer.prototype.getAllSettings = function () {
            var _this = this;
            var settings = new Map();
            this._container.forEach(function (packet) {
                if (packet.meta[additionalMetaKeys_1.AdditionalMetaKeys.KEY] !== undefined) {
                    var adapter = ExportContainer.getAdapterToPackage(packet);
                    if (adapter !== null) {
                        settings.set(packet.meta[additionalMetaKeys_1.AdditionalMetaKeys.KEY], adapter.packageToSetting(packet, _this));
                    }
                }
            });
            return settings;
        };
        /**
         * Returns all keys of ISettings.
         * Keys only exist on top level settings (which are not part of another setting).
         *
         * @returns {Array<string>}
         * @memberof ExportContainer
         */
        ExportContainer.prototype.getAllKeys = function () {
            var keys = new Array();
            this._container.forEach(function (packet) {
                if (packet.meta[additionalMetaKeys_1.AdditionalMetaKeys.KEY] !== undefined) {
                    keys.push(packet.meta[additionalMetaKeys_1.AdditionalMetaKeys.KEY]);
                }
            });
            return keys;
        };
        /**
         * Returns ISettings data based on its key (provided when adding).
         * Does only work for top level settings (which are not part of another setting).
         *
         * @param {string} key
         * @returns {(ISettings | null)}
         * @memberof ExportContainer
         */
        ExportContainer.prototype.getSettingsByKey = function (key) {
            var setting = null;
            var packet = this._container.find(function (packet) {
                return packet.meta[additionalMetaKeys_1.AdditionalMetaKeys.KEY] === key;
            });
            if (packet !== undefined) {
                var adapter = ExportContainer.getAdapterToPackage(packet);
                if (adapter !== null) {
                    setting = adapter.packageToSetting(packet, this);
                }
            }
            return setting;
        };
        /**
         * Returns ISettings data based on its id as a package.
         * Does not work for top level settings (which are not part of another setting).
         *
         * @param {number} packageID
         * @returns {(ISettings | null)}
         * @memberof ExportContainer
         */
        ExportContainer.prototype.getSettingsByID = function (packageID) {
            var setting = null;
            var packet = this._container.find(function (packet) {
                return packet.meta[additionalMetaKeys_1.AdditionalMetaKeys.ID] === packageID;
            });
            if (packet !== undefined) {
                var adapter = ExportContainer.getAdapterToPackage(packet);
                if (adapter !== null) {
                    setting = adapter.packageToSetting(packet, this);
                }
            }
            return setting;
        };
        /**
         * Stringifies the array containing IPackage data to a JSON string.
         *
         * @returns {string}
         * @memberof ExportContainer
         */
        ExportContainer.prototype.toJson = function () {
            var str = "";
            str = JSON.stringify(this._container, package_1.Package.replacer);
            return str;
        };
        return ExportContainer;
    }());
    exports.ExportContainer = ExportContainer;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0Q29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vZXhwb3J0Q29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQXNCQTtRQW9FSTs7O1dBR0c7UUFDSDtZQUVJLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxLQUFLLEVBQVksQ0FBQztRQUM1QyxDQUFDO1FBdkVEOzs7Ozs7O1dBT0c7UUFDVyw0QkFBWSxHQUExQixVQUEyQixRQUF5QjtZQUVoRCxJQUFJLFNBQVMsR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO1lBQ3RDLFNBQVMsQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDO1lBRWhDLE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ1csd0JBQVEsR0FBdEIsVUFBdUIsR0FBVztZQUU5QixJQUFJLFNBQVMsR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO1lBRWxDLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLGlCQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFbEQsSUFBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUMxQixTQUFTLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQzthQUNyQztpQkFBTTtnQkFDSCxTQUFTLEdBQUcsZUFBZSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQzVEO1lBR0wsT0FBTyxTQUFTLENBQUM7UUFDckIsQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ1ksZ0NBQWdCLEdBQS9CLFVBQWdDLFVBQWtCO1lBRTlDLElBQUksU0FBUyxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7WUFFdEMsSUFBRyxVQUFVLENBQUMsd0JBQXdCLENBQUMsS0FBSyxTQUFTLEVBQUU7Z0JBQ25ELFNBQVMsQ0FBQyxX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LE9BQU8sS0FBSyxJQUFJLEVBQUU7b0JBRWpCLE9BQU8sR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUNwRDthQUNKO1lBQ0QsT0FBTyxPQUFPLENBQUM7UUFDbkIsQ0FBQztRQUNEOzs7OztXQUtHO1FBQ0ksZ0NBQU0sR0FBYjtZQUVJLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztZQUNiLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsaUJBQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUV4RCxPQUFPLEdBQUcsQ0FBQztRQUNmLENBQUM7UUFDSixzQkFBQztJQUFELENBQUMsQUFwV0YsSUFvV0U7SUFFUSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElQYWNrYWdlIH0gZnJvbSBcIi4vaW50ZXJmYWNlL3BhY2thZ2VJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVNldHRpbmdzIH0gZnJvbSBcIi4uL3BlcnNpc3RlbmNlL2ludGVyZmFjZXMvc2V0dGluZ3NJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVBhY2thZ2VBZGFwdGVyLCBQYWNrYWdlQXJyYXlXaXRoVG9wTGV2ZWxJRCB9IGZyb20gXCIuL2ludGVyZmFjZS9wYWNrYWdlQWRhcHRlckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBQYWNrYWdlIH0gZnJvbSBcIi4vcGFja2FnZVwiO1xyXG5pbXBvcnQgeyBEYXRhVHlwZSB9IGZyb20gXCIuL2VudW0vZGF0YVR5cGVFbnVtXCI7XHJcbmltcG9ydCB7IE9iamVjdFR5cGUgfSBmcm9tIFwiLi9lbnVtL29iamVjdFR5cGVFbnVtXCI7XHJcbmltcG9ydCB7IEFkZGl0aW9uYWxNZXRhS2V5cyB9IGZyb20gXCIuL2VudW0vYWRkaXRpb25hbE1ldGFLZXlzXCI7XHJcbmltcG9ydCB7IEJhc2VTZXJpZXNQYWNrYWdlQWRhcHRlciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2Jhc2VTZXJpZXNQYWNrYWdlQWRhcHRlclwiO1xyXG5pbXBvcnQgeyBZVFNlcmllc1BhY2thZ2VBZGFwdGVyIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwveXRTZXJpZXNQYWNrYWdlQWRhcHRlclwiO1xyXG5pbXBvcnQgeyBYWVNlcmllc1BhY2thZ2VBZGFwdGVyIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwveHlTZXJpZXNQYWNrYWdlQWRhcHRlclwiO1xyXG5pbXBvcnQgeyBGRlRTZXJpZXNQYWNrYWdlQWRhcHRlciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2ZmdFNlcmllc1BhY2thZ2VBZGFwdGVyXCI7XHJcbmltcG9ydCB7IFNpZ25hbFBhY2thZ2VBZGFwdGVyIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb21tb24vc2lnbmFsL3NpZ25hbFBhY2thZ2VBZGFwdGVyXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YVBhY2thZ2VBZGFwdGVyIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb21tb24vY2FsY3VsYXRvclByb3ZpZGVyL2NhbGN1bGF0aW9uRGF0YUluZm9QYWNrYWdlQWRhcHRlclwiO1xyXG5pbXBvcnQgeyBTZXJpZUdyb3VwUGFja2FnZUFkYXB0ZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvc2VyaWVHcm91cFBhY2thZ2VBZGFwdGVyXCI7XHJcbmltcG9ydCB7IENhdGVnb3J5UGFja2FnZUFkYXB0ZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvY2F0ZWdvcnlQYWNrYWdlQWRhcHRlclwiO1xyXG5pbXBvcnQgeyBTZXJpZXNQcm92aWRlclBhY2thZ2VBZGFwdGVyIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb21tb24vc2VyaWVzUHJvdmlkZXIvc2VyaWVzUHJvdmlkZXJQYWNrYWdlQWRhcHRlclwiO1xyXG5pbXBvcnQgeyBTaWduYWxNYW5hZ2VyRGF0YU1vZGVsUGFja2FnZUFkYXB0ZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvc2lnbmFsTWFuYWdlckRhdGFNb2RlbFBhY2thZ2VBZGFwdGVyXCI7XHJcbmltcG9ydCB7IFNjYWxlUGFja2FnZUFkYXB0ZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9zY2FsZXNQYWNrYWdlQWRhcHRlclwiO1xyXG5pbXBvcnQgeyBDaGFydE1hbmFnZXJDaGFydFBhY2thZ2VBZGFwdGVyIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvY2hhcnRNYW5hZ2VyQ2hhcnRQYWNrYWdlQWRhcHRlclwiO1xyXG5pbXBvcnQgeyBDaGFydE1hbmFnZXJEYXRhTW9kZWxQYWNrYWdlQWRhcHRlciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2NoYXJ0TWFuYWdlckRhdGFNb2RlbFBhY2thZ2VBZGFwdGVyXCI7XHJcbmltcG9ydCB7IEN1cnNvclN0YXRlc1BhY2thZ2VBZGFwdGVyIH0gZnJvbSBcIi4uLy4uL3dpZGdldHMvY29tbW9uL3N0YXRlcy9jdXJzb3JTdGF0ZXNQYWNrYWdlQWRhcHRlclwiO1xyXG5cclxuY2xhc3MgRXhwb3J0Q29udGFpbmVyIHtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfY29udGFpbmVyOiBBcnJheTxJUGFja2FnZT47IFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBFeHBvcnRDb250YWluZXIgZnJvbSBhbiBhcnJheSBjb250YWluaW5nIElQYWNrYWdlIGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElQYWNrYWdlPn0gcGFja2FnZXNcclxuICAgICAqIEByZXR1cm5zIHtFeHBvcnRDb250YWluZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgRXhwb3J0Q29udGFpbmVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZnJvbVBhY2thZ2VzKHBhY2thZ2VzOiBBcnJheTxJUGFja2FnZT4pOiBFeHBvcnRDb250YWluZXIge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBjb250YWluZXIgPSBuZXcgRXhwb3J0Q29udGFpbmVyKCk7XHJcbiAgICAgICAgY29udGFpbmVyLl9jb250YWluZXIgPSBwYWNrYWdlcztcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gRXhwb3J0Q29udGFpbmVyIGZyb20gYSBzdHJpbmcgY29udGFpbmluZyBhIEpTT04gcmVwcmVzZW50aW5nIGFuIGFycmF5IGNvbnRhaW5pbmcgSVBhY2thZ2UgZGF0YS5cclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyXHJcbiAgICAgKiBAcmV0dXJucyB7RXhwb3J0Q29udGFpbmVyfVxyXG4gICAgICogQG1lbWJlcm9mIEV4cG9ydENvbnRhaW5lclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGZyb21Kc29uKHN0cjogc3RyaW5nKTogRXhwb3J0Q29udGFpbmVyIHtcclxuXHJcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IG5ldyBFeHBvcnRDb250YWluZXIoKTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgbGV0IHBhcnNlZERhdGEgPSBKU09OLnBhcnNlKHN0ciwgUGFja2FnZS5yZXZpdmVyKTtcclxuXHJcbiAgICAgICAgICAgIGlmKEFycmF5LmlzQXJyYXkocGFyc2VkRGF0YSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5fY29udGFpbmVyID0gcGFyc2VkRGF0YTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lciA9IEV4cG9ydENvbnRhaW5lci5mcm9tTGVnYWN5Rm9ybWF0KHBhcnNlZERhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRyYW5zZm9ybXMgbGVnYWN5IG1jZSBleHBvcnQgZm9ybWF0IHRvIGFuIGFycmF5IGNvbnRhaW5pbmcgSVBhY2thZ2UgZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcGFyc2VkRGF0YVxyXG4gICAgICogQHJldHVybnMge0FycmF5PElQYWNrYWdlPn1cclxuICAgICAqIEBtZW1iZXJvZiBFeHBvcnRDb250YWluZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZnJvbUxlZ2FjeUZvcm1hdChwYXJzZWREYXRhOiBPYmplY3QpOiBFeHBvcnRDb250YWluZXIge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBjb250YWluZXIgPSBuZXcgRXhwb3J0Q29udGFpbmVyKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYocGFyc2VkRGF0YVtcIlNpZ25hbE1hbmFnZXJEYXRhTW9kZWxcIl0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBjb250YWluZXIuYWRkU2V0dGluZ3MocGFyc2VkRGF0YVtcIlNpZ25hbE1hbmFnZXJEYXRhTW9kZWxcIl0sIFwiU2lnbmFsTWFuYWdlckRhdGFNb2RlbFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYocGFyc2VkRGF0YVtcIlNlcmllc1Byb3ZpZGVyXCJdICE9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBjb250YWluZXIuYWRkU2V0dGluZ3MocGFyc2VkRGF0YVtcIlNlcmllc1Byb3ZpZGVyXCJdLCBcIlNlcmllc1Byb3ZpZGVyXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIH1cclxuICAgICBcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgRXhwb3J0Q29udGFpbmVyLlxyXG4gICAgICogQG1lbWJlcm9mIEV4cG9ydENvbnRhaW5lclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICAgICAgdGhpcy5fY29udGFpbmVyID0gbmV3IEFycmF5PElQYWNrYWdlPigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgbmVjZXNzYXJ5IElQYWNrYWdlIGRhdGEgdG8gcmVwcmVzZW50IElTZXR0aW5ncyBkYXRhLlxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7SVNldHRpbmdzfSBkYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7SVBhY2thZ2VbXX1cclxuICAgICAqIEBtZW1iZXJvZiBFeHBvcnRDb250YWluZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGVQYWNrYWdlcyhkYXRhOiBJU2V0dGluZ3MpOiBQYWNrYWdlQXJyYXlXaXRoVG9wTGV2ZWxJRCB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHBhY2thZ2VTdHJ1Y3R1cmU6IFBhY2thZ2VBcnJheVdpdGhUb3BMZXZlbElEID0ge1xyXG4gICAgICAgICAgICBwYWNrYWdlczogbmV3IEFycmF5PElQYWNrYWdlPigpLFxyXG4gICAgICAgICAgICB0b3BMZXZlbElEOiBOYU5cclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBhZGFwdGVyID0gRXhwb3J0Q29udGFpbmVyLmdldEFkYXB0ZXJUb1NldHRpbmdzKGRhdGEpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKGFkYXB0ZXIgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgcGFja2FnZVN0cnVjdHVyZSA9IGFkYXB0ZXIuc2V0dGluZ1RvUGFja2FnZShkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBhY2thZ2VTdHJ1Y3R1cmU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgc2V0dGluZyB0byB0aGUgdGhlIGV4cG9ydCBjb250YWluZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJU2V0dGluZ3N9IHNldHRpbmdcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIEV4cG9ydENvbnRhaW5lclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkU2V0dGluZ3Moc2V0dGluZzogSVNldHRpbmdzLCBrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBzdWNjZXNzOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHRoaXMuX2NvbnRhaW5lci5ldmVyeShwYWNrZXQgPT4ge3JldHVybiBwYWNrZXQubWV0YVtBZGRpdGlvbmFsTWV0YUtleXMuS0VZXSAhPT0ga2V5O30pKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcGFja2FnZVN0cnVjdHVyZSA9IEV4cG9ydENvbnRhaW5lci5jcmVhdGVQYWNrYWdlcyhzZXR0aW5nKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihwYWNrYWdlU3RydWN0dXJlLnBhY2thZ2VzLmxlbmd0aCA+IDAgJiYgIU51bWJlci5pc05hTihwYWNrYWdlU3RydWN0dXJlLnRvcExldmVsSUQpKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdG9wTGV2ZWxQYWNrYWdlID0gcGFja2FnZVN0cnVjdHVyZS5wYWNrYWdlcy5maW5kKHAgPT4geyByZXR1cm4gcC5tZXRhW0FkZGl0aW9uYWxNZXRhS2V5cy5JRF0gPT09IHBhY2thZ2VTdHJ1Y3R1cmUudG9wTGV2ZWxJRDsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodG9wTGV2ZWxQYWNrYWdlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wTGV2ZWxQYWNrYWdlLm1ldGFbQWRkaXRpb25hbE1ldGFLZXlzLktFWV0gPSBrZXk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbnRhaW5lci5wdXNoKC4uLnBhY2thZ2VTdHJ1Y3R1cmUucGFja2FnZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzdWNjZXNzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgYXNzb2NpYXRlZCBwYWNrYWdlIGFkYXB0ZXIgdG8gYW4gSVNldHRpbmdzIGJhc2VkIG9uIHRoZSBzZXR0aW5ncyB0eXBlLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge0lTZXR0aW5nc30gc2V0dGluZ1xyXG4gICAgICogQHJldHVybnMgeyhJUGFja2FnZUFkYXB0ZXIgfCBudWxsKX1cclxuICAgICAqIEBtZW1iZXJvZiBFeHBvcnRDb250YWluZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0QWRhcHRlclRvU2V0dGluZ3Moc2V0dGluZzogSVNldHRpbmdzKTogSVBhY2thZ2VBZGFwdGVyIHwgbnVsbCB7XHJcbiAgICAgICAgLyogdHNsaW50OmRpc2FibGU6bWF4LWZ1bmMtYm9keS1sZW5ndGggKi8gLy8gZGlzYWJsZWQgZHVlIHRvIHN3aXRjaCBjYXNlXHJcbiAgICAgICAgbGV0IGFkYXB0ZXI6IElQYWNrYWdlQWRhcHRlciB8IG51bGwgPSBudWxsO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHN3aXRjaChzZXR0aW5nLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBcIkJhc2VTZXJpZXNcIjogXHJcbiAgICAgICAgICAgICAgICBhZGFwdGVyID0gbmV3IEJhc2VTZXJpZXNQYWNrYWdlQWRhcHRlcigpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJZVFNlcmllc1wiOlxyXG4gICAgICAgICAgICAgICAgYWRhcHRlciA9IG5ldyBZVFNlcmllc1BhY2thZ2VBZGFwdGVyKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIlhZU2VyaWVzXCI6XHJcbiAgICAgICAgICAgICAgICBhZGFwdGVyID0gbmV3IFhZU2VyaWVzUGFja2FnZUFkYXB0ZXIoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiRkZUU2VyaWVzXCI6XHJcbiAgICAgICAgICAgICAgICBhZGFwdGVyID0gbmV3IEZGVFNlcmllc1BhY2thZ2VBZGFwdGVyKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIlNpZ25hbFwiOlxyXG4gICAgICAgICAgICAgICAgYWRhcHRlciA9IG5ldyBTaWduYWxQYWNrYWdlQWRhcHRlcigpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJDYWxjdWxhdGlvbkRhdGFJbmZvXCI6XHJcbiAgICAgICAgICAgICAgICBhZGFwdGVyID0gbmV3IENhbGN1bGF0aW9uRGF0YVBhY2thZ2VBZGFwdGVyKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIlNlcmllc1Byb3ZpZGVyXCI6XHJcbiAgICAgICAgICAgICAgICBhZGFwdGVyID0gbmV3IFNlcmllc1Byb3ZpZGVyUGFja2FnZUFkYXB0ZXIoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiU2VyaWVHcm91cFwiOlxyXG4gICAgICAgICAgICAgICAgYWRhcHRlciA9IG5ldyBTZXJpZUdyb3VwUGFja2FnZUFkYXB0ZXIoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiY2F0ZWdvcnlcIjpcclxuICAgICAgICAgICAgICAgIGFkYXB0ZXIgPSBuZXcgQ2F0ZWdvcnlQYWNrYWdlQWRhcHRlcigpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJTaWduYWxNYW5hZ2VyRGF0YU1vZGVsXCI6XHJcbiAgICAgICAgICAgICAgICBhZGFwdGVyID0gbmV3IFNpZ25hbE1hbmFnZXJEYXRhTW9kZWxQYWNrYWdlQWRhcHRlcigpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJTY2FsZVwiOlxyXG4gICAgICAgICAgICAgICAgYWRhcHRlciA9IG5ldyBTY2FsZVBhY2thZ2VBZGFwdGVyKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIkNoYXJ0XCI6XHJcbiAgICAgICAgICAgICAgICBhZGFwdGVyID0gbmV3IENoYXJ0TWFuYWdlckNoYXJ0UGFja2FnZUFkYXB0ZXIoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsXCI6XHJcbiAgICAgICAgICAgICAgICBhZGFwdGVyID0gbmV3IENoYXJ0TWFuYWdlckRhdGFNb2RlbFBhY2thZ2VBZGFwdGVyKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIkN1cnNvclN0YXRlc1wiOlxyXG4gICAgICAgICAgICAgICAgYWRhcHRlciA9IG5ldyBDdXJzb3JTdGF0ZXNQYWNrYWdlQWRhcHRlcigpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYWRhcHRlcjtcclxuICAgICAgICAvKiB0c2xpbnQ6ZW5hYmxlOm1heC1mdW5jLWJvZHktbGVuZ3RoICovXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBhc3NvY2lhdGVkIHBhY2thZ2UgYWRhcHRlciB0byBhbiBJUGFja2FnZSBiYXNlZCBvbiB0aGUgbWV0YSBkYXRhLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge0lQYWNrYWdlfSBwYWNrZXRcclxuICAgICAqIEByZXR1cm5zIHsoSVBhY2thZ2VBZGFwdGVyIHwgbnVsbCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgRXhwb3J0Q29udGFpbmVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIGdldEFkYXB0ZXJUb1BhY2thZ2UocGFja2V0OiBJUGFja2FnZSk6IElQYWNrYWdlQWRhcHRlciB8IG51bGwge1xyXG4gICAgICAgIC8qIHRzbGludDpkaXNhYmxlOm1heC1mdW5jLWJvZHktbGVuZ3RoICovIC8vIGRpc2FibGVkIGR1ZSB0byBzd2l0Y2ggY2FzZVxyXG4gICAgICAgIGxldCBhZGFwdGVyOiBJUGFja2FnZUFkYXB0ZXIgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICAgICAgaWYocGFja2V0Lm1ldGEuZGF0YVR5cGUgPT09IERhdGFUeXBlLk9CSkVDVCkge1xyXG5cclxuICAgICAgICAgICAgc3dpdGNoKHBhY2tldC5tZXRhW0FkZGl0aW9uYWxNZXRhS2V5cy5PQkpFQ1RUWVBFXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBPYmplY3RUeXBlLkJBU0VTRVJJRVM6XHJcbiAgICAgICAgICAgICAgICAgICAgYWRhcHRlciA9IG5ldyBCYXNlU2VyaWVzUGFja2FnZUFkYXB0ZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgT2JqZWN0VHlwZS5ZVFNFUklFUzpcclxuICAgICAgICAgICAgICAgICAgICBhZGFwdGVyID0gbmV3IFlUU2VyaWVzUGFja2FnZUFkYXB0ZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgT2JqZWN0VHlwZS5YWVNFUklFUzpcclxuICAgICAgICAgICAgICAgICAgICBhZGFwdGVyID0gbmV3IFhZU2VyaWVzUGFja2FnZUFkYXB0ZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgT2JqZWN0VHlwZS5GRlRTRVJJRVM6XHJcbiAgICAgICAgICAgICAgICAgICAgYWRhcHRlciA9IG5ldyBGRlRTZXJpZXNQYWNrYWdlQWRhcHRlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBPYmplY3RUeXBlLlNJR05BTDpcclxuICAgICAgICAgICAgICAgICAgICBhZGFwdGVyID0gbmV3IFNpZ25hbFBhY2thZ2VBZGFwdGVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIE9iamVjdFR5cGUuQ0FMQ1VMQVRJT046XHJcbiAgICAgICAgICAgICAgICAgICAgYWRhcHRlciA9IG5ldyBDYWxjdWxhdGlvbkRhdGFQYWNrYWdlQWRhcHRlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBPYmplY3RUeXBlLlNFUklFU1BST1ZJREVSOlxyXG4gICAgICAgICAgICAgICAgICAgIGFkYXB0ZXIgPSBuZXcgU2VyaWVzUHJvdmlkZXJQYWNrYWdlQWRhcHRlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBPYmplY3RUeXBlLlNFUklFR1JPVVA6XHJcbiAgICAgICAgICAgICAgICAgICAgYWRhcHRlciA9IG5ldyBTZXJpZUdyb3VwUGFja2FnZUFkYXB0ZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgT2JqZWN0VHlwZS5DQVRFR09SWTpcclxuICAgICAgICAgICAgICAgICAgICBhZGFwdGVyID0gbmV3IENhdGVnb3J5UGFja2FnZUFkYXB0ZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgT2JqZWN0VHlwZS5TSUdOQUxNQU5BR0VSREFUQU1PREVMOlxyXG4gICAgICAgICAgICAgICAgICAgIGFkYXB0ZXIgPSBuZXcgU2lnbmFsTWFuYWdlckRhdGFNb2RlbFBhY2thZ2VBZGFwdGVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIE9iamVjdFR5cGUuU0NBTEU6XHJcbiAgICAgICAgICAgICAgICAgICAgYWRhcHRlciA9IG5ldyBTY2FsZVBhY2thZ2VBZGFwdGVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIE9iamVjdFR5cGUuQ0hBUlQ6XHJcbiAgICAgICAgICAgICAgICAgICAgYWRhcHRlciA9IG5ldyBDaGFydE1hbmFnZXJDaGFydFBhY2thZ2VBZGFwdGVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIE9iamVjdFR5cGUuQ0hBUlRNQU5BR0VSREFUQU1PREVMOlxyXG4gICAgICAgICAgICAgICAgICAgIGFkYXB0ZXIgPSBuZXcgQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsUGFja2FnZUFkYXB0ZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgT2JqZWN0VHlwZS5DVVJTT1JTVEFURVM6IFxyXG4gICAgICAgICAgICAgICAgICAgIGFkYXB0ZXIgPSBuZXcgQ3Vyc29yU3RhdGVzUGFja2FnZUFkYXB0ZXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGFkYXB0ZXJcclxuICAgICAgICAvKiB0c2xpbnQ6ZW5hYmxlOm1heC1mdW5jLWJvZHktbGVuZ3RoICovXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGFsbCB0b3AgbGV2ZWwgc2V0dGluZ3MgKHdoaWNoIGFyZSBub3QgcGFydCBvZiBhbm90aGVyIHNldHRpbmcpLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtNYXA8c3RyaW5nLElTZXR0aW5ncz59XHJcbiAgICAgKiBAbWVtYmVyb2YgRXhwb3J0Q29udGFpbmVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRBbGxTZXR0aW5ncygpOiBNYXA8c3RyaW5nLElTZXR0aW5ncz4ge1xyXG5cclxuICAgICAgICBsZXQgc2V0dGluZ3MgPSBuZXcgTWFwPHN0cmluZywgSVNldHRpbmdzPigpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX2NvbnRhaW5lci5mb3JFYWNoKChwYWNrZXQpID0+IHtcclxuICAgICAgICAgICAgaWYocGFja2V0Lm1ldGFbQWRkaXRpb25hbE1ldGFLZXlzLktFWV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGFkYXB0ZXIgPSBFeHBvcnRDb250YWluZXIuZ2V0QWRhcHRlclRvUGFja2FnZShwYWNrZXQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGFkYXB0ZXIgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncy5zZXQocGFja2V0Lm1ldGFbQWRkaXRpb25hbE1ldGFLZXlzLktFWV0sIGFkYXB0ZXIucGFja2FnZVRvU2V0dGluZyhwYWNrZXQsdGhpcykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBzZXR0aW5nc1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhbGwga2V5cyBvZiBJU2V0dGluZ3MuXHJcbiAgICAgKiBLZXlzIG9ubHkgZXhpc3Qgb24gdG9wIGxldmVsIHNldHRpbmdzICh3aGljaCBhcmUgbm90IHBhcnQgb2YgYW5vdGhlciBzZXR0aW5nKS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8c3RyaW5nPn1cclxuICAgICAqIEBtZW1iZXJvZiBFeHBvcnRDb250YWluZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEFsbEtleXMoKTogQXJyYXk8c3RyaW5nPiB7XHJcbiAgICAgICAgbGV0IGtleXMgPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xyXG5cclxuICAgICAgICB0aGlzLl9jb250YWluZXIuZm9yRWFjaChwYWNrZXQgPT4ge1xyXG4gICAgICAgICAgICBpZihwYWNrZXQubWV0YVtBZGRpdGlvbmFsTWV0YUtleXMuS0VZXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBrZXlzLnB1c2gocGFja2V0Lm1ldGFbQWRkaXRpb25hbE1ldGFLZXlzLktFWV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBrZXlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBJU2V0dGluZ3MgZGF0YSBiYXNlZCBvbiBpdHMga2V5IChwcm92aWRlZCB3aGVuIGFkZGluZykuXHJcbiAgICAgKiBEb2VzIG9ubHkgd29yayBmb3IgdG9wIGxldmVsIHNldHRpbmdzICh3aGljaCBhcmUgbm90IHBhcnQgb2YgYW5vdGhlciBzZXR0aW5nKS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XHJcbiAgICAgKiBAcmV0dXJucyB7KElTZXR0aW5ncyB8IG51bGwpfVxyXG4gICAgICogQG1lbWJlcm9mIEV4cG9ydENvbnRhaW5lclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0U2V0dGluZ3NCeUtleShrZXk6IHN0cmluZyk6IElTZXR0aW5ncyB8IG51bGwge1xyXG5cclxuICAgICAgICBsZXQgc2V0dGluZzogSVNldHRpbmdzIHwgbnVsbCA9IG51bGw7XHJcbiAgICAgICAgbGV0IHBhY2tldCA9IHRoaXMuX2NvbnRhaW5lci5maW5kKChwYWNrZXQpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHBhY2tldC5tZXRhW0FkZGl0aW9uYWxNZXRhS2V5cy5LRVldID09PSBrZXk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYocGFja2V0ICE9PSB1bmRlZmluZWQpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBhZGFwdGVyID0gRXhwb3J0Q29udGFpbmVyLmdldEFkYXB0ZXJUb1BhY2thZ2UocGFja2V0KTtcclxuICAgICAgICAgICAgaWYoYWRhcHRlciAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nID0gYWRhcHRlci5wYWNrYWdlVG9TZXR0aW5nKHBhY2tldCwgdGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNldHRpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIElTZXR0aW5ncyBkYXRhIGJhc2VkIG9uIGl0cyBpZCBhcyBhIHBhY2thZ2UuXHJcbiAgICAgKiBEb2VzIG5vdCB3b3JrIGZvciB0b3AgbGV2ZWwgc2V0dGluZ3MgKHdoaWNoIGFyZSBub3QgcGFydCBvZiBhbm90aGVyIHNldHRpbmcpLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBwYWNrYWdlSURcclxuICAgICAqIEByZXR1cm5zIHsoSVNldHRpbmdzIHwgbnVsbCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgRXhwb3J0Q29udGFpbmVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRTZXR0aW5nc0J5SUQocGFja2FnZUlEOiBudW1iZXIpOiBJU2V0dGluZ3MgfCBudWxsIHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgc2V0dGluZzogSVNldHRpbmdzIHwgbnVsbCA9IG51bGw7XHJcbiAgICAgICAgbGV0IHBhY2tldCA9IHRoaXMuX2NvbnRhaW5lci5maW5kKChwYWNrZXQpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHBhY2tldC5tZXRhW0FkZGl0aW9uYWxNZXRhS2V5cy5JRF0gPT09IHBhY2thZ2VJRDtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZihwYWNrZXQgIT09IHVuZGVmaW5lZCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IGFkYXB0ZXIgPSBFeHBvcnRDb250YWluZXIuZ2V0QWRhcHRlclRvUGFja2FnZShwYWNrZXQpO1xyXG4gICAgICAgICAgICBpZihhZGFwdGVyICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHNldHRpbmcgPSBhZGFwdGVyLnBhY2thZ2VUb1NldHRpbmcocGFja2V0LCB0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2V0dGluZztcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogU3RyaW5naWZpZXMgdGhlIGFycmF5IGNvbnRhaW5pbmcgSVBhY2thZ2UgZGF0YSB0byBhIEpTT04gc3RyaW5nLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgRXhwb3J0Q29udGFpbmVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB0b0pzb24oKTogc3RyaW5nIHtcclxuXHJcbiAgICAgICAgbGV0IHN0ciA9IFwiXCI7XHJcbiAgICAgICAgc3RyID0gSlNPTi5zdHJpbmdpZnkodGhpcy5fY29udGFpbmVyLCBQYWNrYWdlLnJlcGxhY2VyKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHN0cjtcclxuICAgIH1cclxuIH1cclxuXHJcbiBleHBvcnQgeyBFeHBvcnRDb250YWluZXIgfSJdfQ==