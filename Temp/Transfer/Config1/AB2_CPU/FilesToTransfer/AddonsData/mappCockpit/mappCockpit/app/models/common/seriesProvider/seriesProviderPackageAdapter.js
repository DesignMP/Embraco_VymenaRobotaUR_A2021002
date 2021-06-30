define(["require", "exports", "../../../common/packageConversion/enum/objectTypeEnum", "../../../common/packageConversion/exportContainer", "../../../common/persistence/settings", "../../../common/packageConversion/enum/dataTypeEnum", "../../../common/packageConversion/enum/additionalMetaKeys", "../../../common/packageConversion/mceConversionError", "../../../common/packageConversion/enum/arrayTypeEnum", "../../../common/packageConversion/meta", "../../../common/packageConversion/package", "./seriesProvider", "../../chartManagerDataModel/settingIds"], function (require, exports, objectTypeEnum_1, exportContainer_1, settings_1, dataTypeEnum_1, additionalMetaKeys_1, mceConversionError_1, arrayTypeEnum_1, meta_1, package_1, seriesProvider_1, settingIds_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DataIds;
    (function (DataIds) {
        DataIds["Series"] = "series";
    })(DataIds || (DataIds = {}));
    var SeriesProviderPackageAdapter = /** @class */ (function () {
        function SeriesProviderPackageAdapter() {
            //newest version of the package format
            this.currentPackageVersion = 1;
            //define settings key for value series as there is no SettingIds object provided
            this.seriesSettingsKey = "series";
            this.seriesIdsSettingsKey = "seriesIds";
            this.settingsType = "SeriesProvider";
            this.objectType = objectTypeEnum_1.ObjectType.SERIESPROVIDER;
        }
        SeriesProviderPackageAdapter.prototype.packageToSetting = function (packageData, container) {
            var _a, _b, _c;
            var setting = new settings_1.Settings(this.settingsType);
            if (((_a = packageData === null || packageData === void 0 ? void 0 : packageData.meta) === null || _a === void 0 ? void 0 : _a.dataType) == dataTypeEnum_1.DataType.OBJECT && ((_b = packageData === null || packageData === void 0 ? void 0 : packageData.meta) === null || _b === void 0 ? void 0 : _b[additionalMetaKeys_1.AdditionalMetaKeys.OBJECTTYPE]) == this.objectType) {
                switch ((_c = packageData === null || packageData === void 0 ? void 0 : packageData.meta) === null || _c === void 0 ? void 0 : _c[additionalMetaKeys_1.AdditionalMetaKeys.VERSION]) {
                    case 1:
                        setting = this.packageV1ToSetting(packageData, container);
                        break;
                    default:
                        throw mceConversionError_1.MceConversionError.createErrorByType(mceConversionError_1.MceConversionErrorType.UNSUPPORTED_VERSION, this.objectType);
                }
            }
            else {
                throw mceConversionError_1.MceConversionError.createErrorByType(mceConversionError_1.MceConversionErrorType.UNSUPPORTED_TYPE, this.objectType);
            }
            return setting;
        };
        SeriesProviderPackageAdapter.prototype.packageV1ToSetting = function (packageData, container) {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            var setting = new settings_1.Settings(this.settingsType);
            if (((_c = (_b = (_a = packageData === null || packageData === void 0 ? void 0 : packageData.data) === null || _a === void 0 ? void 0 : _a[DataIds.Series]) === null || _b === void 0 ? void 0 : _b.meta) === null || _c === void 0 ? void 0 : _c.dataType) == dataTypeEnum_1.DataType.ARRAY && ((_f = (_e = (_d = packageData === null || packageData === void 0 ? void 0 : packageData.data) === null || _d === void 0 ? void 0 : _d[DataIds.Series]) === null || _e === void 0 ? void 0 : _e.meta) === null || _f === void 0 ? void 0 : _f[additionalMetaKeys_1.AdditionalMetaKeys.ARRAYTYPE]) === arrayTypeEnum_1.ArrayType.LINK) {
                var seriesSettingsArray_1 = new Array();
                var serieIds_1 = new Array();
                var seriesData = (_h = (_g = packageData === null || packageData === void 0 ? void 0 : packageData.data) === null || _g === void 0 ? void 0 : _g[DataIds.Series]) === null || _h === void 0 ? void 0 : _h.data;
                if (seriesData != undefined) {
                    seriesData.forEach(function (id) {
                        var _a;
                        var seriesSetting = container.getSettingsByID(id);
                        if (seriesSetting !== null) {
                            seriesSettingsArray_1.push(seriesSetting);
                            serieIds_1.push(seriesProvider_1.SeriesProvider.getSeriesPersistingIdForComponent(seriesSetting.data[settingIds_1.SettingIds.SeriesId], (_a = packageData === null || packageData === void 0 ? void 0 : packageData.meta) === null || _a === void 0 ? void 0 : _a[additionalMetaKeys_1.AdditionalMetaKeys.KEY]));
                        }
                        else {
                            throw mceConversionError_1.MceConversionError.createErrorByType(mceConversionError_1.MceConversionErrorType.MISSING_DATA, DataIds.Series);
                        }
                    });
                }
                else {
                    throw mceConversionError_1.MceConversionError.createErrorByType(mceConversionError_1.MceConversionErrorType.MISSING_DATA, DataIds.Series);
                }
                setting.setValue(this.seriesSettingsKey, seriesSettingsArray_1);
                setting.setValue(this.seriesIdsSettingsKey, serieIds_1);
            }
            else {
                throw mceConversionError_1.MceConversionError.createErrorByType(mceConversionError_1.MceConversionErrorType.MISSING_DATA, DataIds.Series);
            }
            return setting;
        };
        SeriesProviderPackageAdapter.prototype.settingToPackage = function (settingsData) {
            var settings = settings_1.Settings.create(settingsData);
            var serieProviderData = {};
            var packageStructure = {
                packages: new Array(),
                topLevelID: NaN
            };
            if (settings.type === this.settingsType) {
                var id = meta_1.Meta.createID();
                var additionalMetaInfo = [{ key: additionalMetaKeys_1.AdditionalMetaKeys.OBJECTTYPE, value: this.objectType }, { key: additionalMetaKeys_1.AdditionalMetaKeys.ID, value: id }, { key: additionalMetaKeys_1.AdditionalMetaKeys.VERSION, value: this.currentPackageVersion }];
                var seriesProviderMeta = new meta_1.Meta(dataTypeEnum_1.DataType.OBJECT, additionalMetaInfo);
                var seriesMeta = new meta_1.Meta(dataTypeEnum_1.DataType.ARRAY, [{ key: additionalMetaKeys_1.AdditionalMetaKeys.ARRAYTYPE, value: arrayTypeEnum_1.ArrayType.LINK }]);
                var seriesLinks_1 = new Array();
                var seriesData = settings.getValue(this.seriesSettingsKey);
                if (seriesData !== undefined) {
                    seriesData.forEach(function (setting) {
                        var _a;
                        var seriesPackages = exportContainer_1.ExportContainer.createPackages(setting);
                        if (seriesPackages.packages.length > 0 && !Number.isNaN(seriesPackages.topLevelID)) {
                            seriesLinks_1.push(seriesPackages.topLevelID);
                            (_a = packageStructure.packages).push.apply(_a, seriesPackages.packages);
                        }
                    });
                    serieProviderData[DataIds.Series] = new package_1.Package(seriesMeta, seriesLinks_1);
                }
                else {
                    throw mceConversionError_1.MceConversionError.createErrorByType(mceConversionError_1.MceConversionErrorType.MISSING_DATA, this.seriesSettingsKey);
                }
                var seriesProviderPackage = new package_1.Package(seriesProviderMeta, serieProviderData);
                packageStructure.packages.push(seriesProviderPackage);
                packageStructure.topLevelID = id;
            }
            else {
                throw mceConversionError_1.MceConversionError.createErrorByType(mceConversionError_1.MceConversionErrorType.UNSUPPORTED_VERSION, this.settingsType);
            }
            return packageStructure;
        };
        return SeriesProviderPackageAdapter;
    }());
    exports.SeriesProviderPackageAdapter = SeriesProviderPackageAdapter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWVzUHJvdmlkZXJQYWNrYWdlQWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbW1vbi9zZXJpZXNQcm92aWRlci9zZXJpZXNQcm92aWRlclBhY2thZ2VBZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQWdCQSxJQUFLLE9BRUo7SUFGRCxXQUFLLE9BQU87UUFDUiw0QkFBaUIsQ0FBQTtJQUNyQixDQUFDLEVBRkksT0FBTyxLQUFQLE9BQU8sUUFFWDtJQUVEO1FBWUk7WUFWQSxzQ0FBc0M7WUFDckIsMEJBQXFCLEdBQVcsQ0FBQyxDQUFDO1lBRW5ELGdGQUFnRjtZQUMvRCxzQkFBaUIsR0FBVyxRQUFRLENBQUM7WUFDckMseUJBQW9CLEdBQUcsV0FBVyxDQUFDO1lBTWhELElBQUksQ0FBQyxZQUFZLEdBQUcsZ0JBQWdCLENBQUM7WUFDckMsSUFBSSxDQUFDLFVBQVUsR0FBRywyQkFBVSxDQUFDLGNBQWMsQ0FBQztRQUNoRCxDQUFDO1FBRUQsdURBQWdCLEdBQWhCLFVBQWlCLFdBQXFCLEVBQUUsU0FBMEI7O1lBRTlELElBQUksT0FBTyxHQUFjLElBQUksbUJBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFFekQsSUFBRyxPQUFBLFdBQVcsYUFBWCxXQUFXLHVCQUFYLFdBQVcsQ0FBRSxJQUFJLDBDQUFFLFFBQVEsS0FBSSx1QkFBUSxDQUFDLE1BQU0sSUFBSSxPQUFBLFdBQVcsYUFBWCxXQUFXLHVCQUFYLFdBQVcsQ0FBRSxJQUFJLDBDQUFHLHVDQUFrQixDQUFDLFVBQVUsTUFBSyxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUV4SCxjQUFPLFdBQVcsYUFBWCxXQUFXLHVCQUFYLFdBQVcsQ0FBRSxJQUFJLDBDQUFHLHVDQUFrQixDQUFDLE9BQU8sR0FBRTtvQkFDbkQsS0FBSyxDQUFDO3dCQUNGLE9BQU8sR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO3dCQUMxRCxNQUFNO29CQUNWO3dCQUNJLE1BQU0sdUNBQWtCLENBQUMsaUJBQWlCLENBQUMsMkNBQXNCLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2lCQUMvRzthQUNKO2lCQUFNO2dCQUNILE1BQU0sdUNBQWtCLENBQUMsaUJBQWlCLENBQUMsMkNBQXNCLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ3hHO1lBRUQsT0FBTyxPQUFPLENBQUM7UUFDbkIsQ0FBQztRQUVPLHlEQUFrQixHQUExQixVQUEyQixXQUFxQixFQUFFLFNBQTBCOztZQUV4RSxJQUFJLE9BQU8sR0FBRyxJQUFJLG1CQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBRTlDLElBQUcsbUJBQUEsV0FBVyxhQUFYLFdBQVcsdUJBQVgsV0FBVyxDQUFFLElBQUksMENBQUcsT0FBTyxDQUFDLE1BQU0sMkNBQUcsSUFBSSwwQ0FBRSxRQUFRLEtBQUksdUJBQVEsQ0FBQyxLQUFLLElBQUksbUJBQUEsV0FBVyxhQUFYLFdBQVcsdUJBQVgsV0FBVyxDQUFFLElBQUksMENBQUcsT0FBTyxDQUFDLE1BQU0sMkNBQUcsSUFBSSwwQ0FBRyx1Q0FBa0IsQ0FBQyxTQUFTLE9BQU0seUJBQVMsQ0FBQyxJQUFJLEVBQUU7Z0JBQ3RLLElBQUkscUJBQW1CLEdBQUcsSUFBSSxLQUFLLEVBQWEsQ0FBQztnQkFDakQsSUFBSSxVQUFRLEdBQUcsSUFBSSxLQUFLLEVBQVUsQ0FBQztnQkFDbkMsSUFBSSxVQUFVLGVBQWtCLFdBQVcsYUFBWCxXQUFXLHVCQUFYLFdBQVcsQ0FBRSxJQUFJLDBDQUFHLE9BQU8sQ0FBQyxNQUFNLDJDQUFHLElBQUksQ0FBQztnQkFDMUUsSUFBRyxVQUFVLElBQUksU0FBUyxFQUFFO29CQUV4QixVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUMsRUFBRTs7d0JBQ2xCLElBQUksYUFBYSxHQUFHLFNBQVMsQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7d0JBQ2xELElBQUcsYUFBYSxLQUFLLElBQUksRUFBRTs0QkFDdkIscUJBQW1CLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDOzRCQUN4QyxVQUFRLENBQUMsSUFBSSxDQUFDLCtCQUFjLENBQUMsaUNBQWlDLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyx1QkFBVSxDQUFDLFFBQVEsQ0FBQyxRQUFFLFdBQVcsYUFBWCxXQUFXLHVCQUFYLFdBQVcsQ0FBRSxJQUFJLDBDQUFHLHVDQUFrQixDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7eUJBQ3pKOzZCQUFNOzRCQUNILE1BQU0sdUNBQWtCLENBQUMsaUJBQWlCLENBQUMsMkNBQXNCLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQzt5QkFDbkc7b0JBQ0wsQ0FBQyxDQUFDLENBQUM7aUJBQ047cUJBQU07b0JBQ0gsTUFBTSx1Q0FBa0IsQ0FBQyxpQkFBaUIsQ0FBQywyQ0FBc0IsQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUNuRztnQkFDRCxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxxQkFBbUIsQ0FBQyxDQUFDO2dCQUM5RCxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxVQUFRLENBQUMsQ0FBQzthQUV6RDtpQkFBTTtnQkFDSCxNQUFNLHVDQUFrQixDQUFDLGlCQUFpQixDQUFDLDJDQUFzQixDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDbkc7WUFFRCxPQUFPLE9BQU8sQ0FBQztRQUNuQixDQUFDO1FBRUQsdURBQWdCLEdBQWhCLFVBQWlCLFlBQXVCO1lBRXBDLElBQUksUUFBUSxHQUFHLG1CQUFRLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBRTdDLElBQUksaUJBQWlCLEdBQW9DLEVBQUUsQ0FBQztZQUU1RCxJQUFJLGdCQUFnQixHQUErQjtnQkFDL0MsUUFBUSxFQUFFLElBQUksS0FBSyxFQUFZO2dCQUMvQixVQUFVLEVBQUUsR0FBRzthQUNsQixDQUFDO1lBRUYsSUFBRyxRQUFRLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBRXBDLElBQUksRUFBRSxHQUFHLFdBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDekIsSUFBSSxrQkFBa0IsR0FBRyxDQUFDLEVBQUMsR0FBRyxFQUFFLHVDQUFrQixDQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBQyxFQUFFLEVBQUMsR0FBRyxFQUFFLHVDQUFrQixDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUUsdUNBQWtCLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMscUJBQXFCLEVBQUMsQ0FBQyxDQUFDO2dCQUN2TSxJQUFJLGtCQUFrQixHQUFHLElBQUksV0FBSSxDQUFDLHVCQUFRLENBQUMsTUFBTSxFQUFFLGtCQUFrQixDQUFDLENBQUM7Z0JBQ3ZFLElBQUksVUFBVSxHQUFHLElBQUksV0FBSSxDQUFDLHVCQUFRLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBQyxHQUFHLEVBQUUsdUNBQWtCLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSx5QkFBUyxDQUFDLElBQUksRUFBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEcsSUFBSSxhQUFXLEdBQUcsSUFBSSxLQUFLLEVBQVUsQ0FBQztnQkFFdEMsSUFBSSxVQUFVLEdBQXFCLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7Z0JBQzdFLElBQUcsVUFBVSxLQUFLLFNBQVMsRUFBRTtvQkFDekIsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFDLE9BQU87O3dCQUN2QixJQUFJLGNBQWMsR0FBRyxpQ0FBZSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFFN0QsSUFBRyxjQUFjLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsRUFBRTs0QkFDL0UsYUFBVyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7NEJBQzVDLENBQUEsS0FBQSxnQkFBZ0IsQ0FBQyxRQUFRLENBQUEsQ0FBQyxJQUFJLFdBQUksY0FBYyxDQUFDLFFBQVEsRUFBRTt5QkFDOUQ7b0JBQ0wsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsaUJBQWlCLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksaUJBQU8sQ0FBQyxVQUFVLEVBQUUsYUFBVyxDQUFDLENBQUE7aUJBQzNFO3FCQUFNO29CQUNILE1BQU0sdUNBQWtCLENBQUMsaUJBQWlCLENBQUMsMkNBQXNCLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2lCQUMzRztnQkFFRCxJQUFJLHFCQUFxQixHQUFHLElBQUksaUJBQU8sQ0FBQyxrQkFBa0IsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO2dCQUUvRSxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7Z0JBQ3RELGdCQUFnQixDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7YUFFcEM7aUJBQU07Z0JBQ0gsTUFBTSx1Q0FBa0IsQ0FBQyxpQkFBaUIsQ0FBQywyQ0FBc0IsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDN0c7WUFFRCxPQUFPLGdCQUFnQixDQUFDO1FBQzVCLENBQUM7UUFDTCxtQ0FBQztJQUFELENBQUMsQUFsSEQsSUFrSEM7SUFFUSxvRUFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJUGFja2FnZUFkYXB0ZXIsIFBhY2thZ2VBcnJheVdpdGhUb3BMZXZlbElEIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wYWNrYWdlQ29udmVyc2lvbi9pbnRlcmZhY2UvcGFja2FnZUFkYXB0ZXJJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgT2JqZWN0VHlwZSB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vZW51bS9vYmplY3RUeXBlRW51bVwiO1xyXG5pbXBvcnQgeyBJUGFja2FnZSB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vaW50ZXJmYWNlL3BhY2thZ2VJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgRXhwb3J0Q29udGFpbmVyIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wYWNrYWdlQ29udmVyc2lvbi9leHBvcnRDb250YWluZXJcIjtcclxuaW1wb3J0IHsgSVNldHRpbmdzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9pbnRlcmZhY2VzL3NldHRpbmdzSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBEYXRhVHlwZSB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vZW51bS9kYXRhVHlwZUVudW1cIjtcclxuaW1wb3J0IHsgQWRkaXRpb25hbE1ldGFLZXlzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wYWNrYWdlQ29udmVyc2lvbi9lbnVtL2FkZGl0aW9uYWxNZXRhS2V5c1wiO1xyXG5pbXBvcnQgeyBNY2VDb252ZXJzaW9uRXJyb3IsIE1jZUNvbnZlcnNpb25FcnJvclR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BhY2thZ2VDb252ZXJzaW9uL21jZUNvbnZlcnNpb25FcnJvclwiO1xyXG5pbXBvcnQgeyBBcnJheVR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BhY2thZ2VDb252ZXJzaW9uL2VudW0vYXJyYXlUeXBlRW51bVwiO1xyXG5pbXBvcnQgeyBNZXRhIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wYWNrYWdlQ29udmVyc2lvbi9tZXRhXCI7XHJcbmltcG9ydCB7IFBhY2thZ2UgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BhY2thZ2VDb252ZXJzaW9uL3BhY2thZ2VcIjtcclxuaW1wb3J0IHsgU2VyaWVzUHJvdmlkZXIgfSBmcm9tIFwiLi9zZXJpZXNQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBTZXR0aW5nSWRzIH0gZnJvbSBcIi4uLy4uL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9zZXR0aW5nSWRzXCI7XHJcblxyXG5cclxuZW51bSBEYXRhSWRzIHtcclxuICAgIFNlcmllcyA9IFwic2VyaWVzXCJcclxufVxyXG5cclxuY2xhc3MgU2VyaWVzUHJvdmlkZXJQYWNrYWdlQWRhcHRlciBpbXBsZW1lbnRzIElQYWNrYWdlQWRhcHRlciB7XHJcblxyXG4gICAgLy9uZXdlc3QgdmVyc2lvbiBvZiB0aGUgcGFja2FnZSBmb3JtYXRcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgY3VycmVudFBhY2thZ2VWZXJzaW9uOiBudW1iZXIgPSAxO1xyXG5cclxuICAgIC8vZGVmaW5lIHNldHRpbmdzIGtleSBmb3IgdmFsdWUgc2VyaWVzIGFzIHRoZXJlIGlzIG5vIFNldHRpbmdJZHMgb2JqZWN0IHByb3ZpZGVkXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHNlcmllc1NldHRpbmdzS2V5OiBzdHJpbmcgPSBcInNlcmllc1wiO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBzZXJpZXNJZHNTZXR0aW5nc0tleSA9IFwic2VyaWVzSWRzXCI7XHJcblxyXG4gICAgcHJpdmF0ZSBzZXR0aW5nc1R5cGU6IHN0cmluZztcclxuICAgIHByaXZhdGUgb2JqZWN0VHlwZTogT2JqZWN0VHlwZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnNldHRpbmdzVHlwZSA9IFwiU2VyaWVzUHJvdmlkZXJcIjtcclxuICAgICAgICB0aGlzLm9iamVjdFR5cGUgPSBPYmplY3RUeXBlLlNFUklFU1BST1ZJREVSO1xyXG4gICAgfVxyXG5cclxuICAgIHBhY2thZ2VUb1NldHRpbmcocGFja2FnZURhdGE6IElQYWNrYWdlLCBjb250YWluZXI6IEV4cG9ydENvbnRhaW5lcik6IElTZXR0aW5ncyB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHNldHRpbmc6IElTZXR0aW5ncyA9IG5ldyBTZXR0aW5ncyh0aGlzLnNldHRpbmdzVHlwZSk7XHJcblxyXG4gICAgICAgIGlmKHBhY2thZ2VEYXRhPy5tZXRhPy5kYXRhVHlwZSA9PSBEYXRhVHlwZS5PQkpFQ1QgJiYgcGFja2FnZURhdGE/Lm1ldGE/LltBZGRpdGlvbmFsTWV0YUtleXMuT0JKRUNUVFlQRV0gPT0gdGhpcy5vYmplY3RUeXBlKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBzd2l0Y2gocGFja2FnZURhdGE/Lm1ldGE/LltBZGRpdGlvbmFsTWV0YUtleXMuVkVSU0lPTl0peyBcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nID0gdGhpcy5wYWNrYWdlVjFUb1NldHRpbmcocGFja2FnZURhdGEsIGNvbnRhaW5lcik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IE1jZUNvbnZlcnNpb25FcnJvci5jcmVhdGVFcnJvckJ5VHlwZShNY2VDb252ZXJzaW9uRXJyb3JUeXBlLlVOU1VQUE9SVEVEX1ZFUlNJT04sIHRoaXMub2JqZWN0VHlwZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBNY2VDb252ZXJzaW9uRXJyb3IuY3JlYXRlRXJyb3JCeVR5cGUoTWNlQ29udmVyc2lvbkVycm9yVHlwZS5VTlNVUFBPUlRFRF9UWVBFLCB0aGlzLm9iamVjdFR5cGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNldHRpbmc7XHJcbiAgICB9ICAgIFxyXG5cclxuICAgIHByaXZhdGUgcGFja2FnZVYxVG9TZXR0aW5nKHBhY2thZ2VEYXRhOiBJUGFja2FnZSwgY29udGFpbmVyOiBFeHBvcnRDb250YWluZXIpOiBJU2V0dGluZ3Mge1xyXG5cclxuICAgICAgICBsZXQgc2V0dGluZyA9IG5ldyBTZXR0aW5ncyh0aGlzLnNldHRpbmdzVHlwZSk7XHJcblxyXG4gICAgICAgIGlmKHBhY2thZ2VEYXRhPy5kYXRhPy5bRGF0YUlkcy5TZXJpZXNdPy5tZXRhPy5kYXRhVHlwZSA9PSBEYXRhVHlwZS5BUlJBWSAmJiBwYWNrYWdlRGF0YT8uZGF0YT8uW0RhdGFJZHMuU2VyaWVzXT8ubWV0YT8uW0FkZGl0aW9uYWxNZXRhS2V5cy5BUlJBWVRZUEVdID09PSBBcnJheVR5cGUuTElOSykge1xyXG4gICAgICAgICAgICBsZXQgc2VyaWVzU2V0dGluZ3NBcnJheSA9IG5ldyBBcnJheTxJU2V0dGluZ3M+KCk7XHJcbiAgICAgICAgICAgIGxldCBzZXJpZUlkcyA9IG5ldyBBcnJheTxzdHJpbmc+KCk7XHJcbiAgICAgICAgICAgIGxldCBzZXJpZXNEYXRhOiBBcnJheTxudW1iZXI+ID0gcGFja2FnZURhdGE/LmRhdGE/LltEYXRhSWRzLlNlcmllc10/LmRhdGE7XHJcbiAgICAgICAgICAgIGlmKHNlcmllc0RhdGEgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHNlcmllc0RhdGEuZm9yRWFjaCgoaWQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc2VyaWVzU2V0dGluZyA9IGNvbnRhaW5lci5nZXRTZXR0aW5nc0J5SUQoaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlcmllc1NldHRpbmcgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VyaWVzU2V0dGluZ3NBcnJheS5wdXNoKHNlcmllc1NldHRpbmcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJpZUlkcy5wdXNoKFNlcmllc1Byb3ZpZGVyLmdldFNlcmllc1BlcnNpc3RpbmdJZEZvckNvbXBvbmVudChzZXJpZXNTZXR0aW5nLmRhdGFbU2V0dGluZ0lkcy5TZXJpZXNJZF0sIHBhY2thZ2VEYXRhPy5tZXRhPy5bQWRkaXRpb25hbE1ldGFLZXlzLktFWV0pKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBNY2VDb252ZXJzaW9uRXJyb3IuY3JlYXRlRXJyb3JCeVR5cGUoTWNlQ29udmVyc2lvbkVycm9yVHlwZS5NSVNTSU5HX0RBVEEsIERhdGFJZHMuU2VyaWVzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRocm93IE1jZUNvbnZlcnNpb25FcnJvci5jcmVhdGVFcnJvckJ5VHlwZShNY2VDb252ZXJzaW9uRXJyb3JUeXBlLk1JU1NJTkdfREFUQSwgRGF0YUlkcy5TZXJpZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldHRpbmcuc2V0VmFsdWUodGhpcy5zZXJpZXNTZXR0aW5nc0tleSwgc2VyaWVzU2V0dGluZ3NBcnJheSk7XHJcbiAgICAgICAgICAgIHNldHRpbmcuc2V0VmFsdWUodGhpcy5zZXJpZXNJZHNTZXR0aW5nc0tleSwgc2VyaWVJZHMpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBNY2VDb252ZXJzaW9uRXJyb3IuY3JlYXRlRXJyb3JCeVR5cGUoTWNlQ29udmVyc2lvbkVycm9yVHlwZS5NSVNTSU5HX0RBVEEsIERhdGFJZHMuU2VyaWVzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzZXR0aW5nO1xyXG4gICAgfVxyXG5cclxuICAgIHNldHRpbmdUb1BhY2thZ2Uoc2V0dGluZ3NEYXRhOiBJU2V0dGluZ3MpOiBQYWNrYWdlQXJyYXlXaXRoVG9wTGV2ZWxJRCB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHNldHRpbmdzID0gU2V0dGluZ3MuY3JlYXRlKHNldHRpbmdzRGF0YSk7XHJcblxyXG4gICAgICAgIGxldCBzZXJpZVByb3ZpZGVyRGF0YTogeyBbaW5kZXg6IHN0cmluZ106ICBJUGFja2FnZSB9ICA9IHt9O1xyXG5cclxuICAgICAgICBsZXQgcGFja2FnZVN0cnVjdHVyZTogUGFja2FnZUFycmF5V2l0aFRvcExldmVsSUQgPSB7XHJcbiAgICAgICAgICAgIHBhY2thZ2VzOiBuZXcgQXJyYXk8SVBhY2thZ2U+KCksXHJcbiAgICAgICAgICAgIHRvcExldmVsSUQ6IE5hTlxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmKHNldHRpbmdzLnR5cGUgPT09IHRoaXMuc2V0dGluZ3NUeXBlKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgaWQgPSBNZXRhLmNyZWF0ZUlEKCk7XHJcbiAgICAgICAgICAgIGxldCBhZGRpdGlvbmFsTWV0YUluZm8gPSBbe2tleTogQWRkaXRpb25hbE1ldGFLZXlzLk9CSkVDVFRZUEUsIHZhbHVlOiB0aGlzLm9iamVjdFR5cGV9LCB7a2V5OiBBZGRpdGlvbmFsTWV0YUtleXMuSUQsIHZhbHVlOiBpZH0sIHtrZXk6IEFkZGl0aW9uYWxNZXRhS2V5cy5WRVJTSU9OLCB2YWx1ZTogdGhpcy5jdXJyZW50UGFja2FnZVZlcnNpb259XTtcclxuICAgICAgICAgICAgbGV0IHNlcmllc1Byb3ZpZGVyTWV0YSA9IG5ldyBNZXRhKERhdGFUeXBlLk9CSkVDVCwgYWRkaXRpb25hbE1ldGFJbmZvKTtcclxuICAgICAgICAgICAgbGV0IHNlcmllc01ldGEgPSBuZXcgTWV0YShEYXRhVHlwZS5BUlJBWSwgW3trZXk6IEFkZGl0aW9uYWxNZXRhS2V5cy5BUlJBWVRZUEUsIHZhbHVlOiBBcnJheVR5cGUuTElOS31dKTtcclxuICAgICAgICAgICAgbGV0IHNlcmllc0xpbmtzID0gbmV3IEFycmF5PG51bWJlcj4oKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBzZXJpZXNEYXRhOiBBcnJheTxJU2V0dGluZ3M+ID0gc2V0dGluZ3MuZ2V0VmFsdWUodGhpcy5zZXJpZXNTZXR0aW5nc0tleSk7XHJcbiAgICAgICAgICAgIGlmKHNlcmllc0RhdGEgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgc2VyaWVzRGF0YS5mb3JFYWNoKChzZXR0aW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlcmllc1BhY2thZ2VzID0gRXhwb3J0Q29udGFpbmVyLmNyZWF0ZVBhY2thZ2VzKHNldHRpbmcpO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlcmllc1BhY2thZ2VzLnBhY2thZ2VzLmxlbmd0aCA+IDAgJiYgIU51bWJlci5pc05hTihzZXJpZXNQYWNrYWdlcy50b3BMZXZlbElEKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJpZXNMaW5rcy5wdXNoKHNlcmllc1BhY2thZ2VzLnRvcExldmVsSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYWNrYWdlU3RydWN0dXJlLnBhY2thZ2VzLnB1c2goLi4uc2VyaWVzUGFja2FnZXMucGFja2FnZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgc2VyaWVQcm92aWRlckRhdGFbRGF0YUlkcy5TZXJpZXNdID0gbmV3IFBhY2thZ2Uoc2VyaWVzTWV0YSwgc2VyaWVzTGlua3MpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBNY2VDb252ZXJzaW9uRXJyb3IuY3JlYXRlRXJyb3JCeVR5cGUoTWNlQ29udmVyc2lvbkVycm9yVHlwZS5NSVNTSU5HX0RBVEEsIHRoaXMuc2VyaWVzU2V0dGluZ3NLZXkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBzZXJpZXNQcm92aWRlclBhY2thZ2UgPSBuZXcgUGFja2FnZShzZXJpZXNQcm92aWRlck1ldGEsIHNlcmllUHJvdmlkZXJEYXRhKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHBhY2thZ2VTdHJ1Y3R1cmUucGFja2FnZXMucHVzaChzZXJpZXNQcm92aWRlclBhY2thZ2UpO1xyXG4gICAgICAgICAgICBwYWNrYWdlU3RydWN0dXJlLnRvcExldmVsSUQgPSBpZDtcclxuICAgICAgICAgICBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBNY2VDb252ZXJzaW9uRXJyb3IuY3JlYXRlRXJyb3JCeVR5cGUoTWNlQ29udmVyc2lvbkVycm9yVHlwZS5VTlNVUFBPUlRFRF9WRVJTSU9OLCB0aGlzLnNldHRpbmdzVHlwZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICByZXR1cm4gcGFja2FnZVN0cnVjdHVyZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgU2VyaWVzUHJvdmlkZXJQYWNrYWdlQWRhcHRlciB9Il19