define(["require", "exports", "../../../common/packageConversion/enum/objectTypeEnum", "../../../common/persistence/settings", "../../../common/packageConversion/enum/dataTypeEnum", "../../../common/packageConversion/enum/additionalMetaKeys", "../../../common/packageConversion/mceConversionError", "../../../common/packageConversion/meta", "../../../common/packageConversion/package", "./settingIds", "./cursorState"], function (require, exports, objectTypeEnum_1, settings_1, dataTypeEnum_1, additionalMetaKeys_1, mceConversionError_1, meta_1, package_1, settingIds_1, cursorState_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //Enum to map the numbers, representing a cursor type to a string and back again
    var CursorTypeMapping;
    (function (CursorTypeMapping) {
        CursorTypeMapping[CursorTypeMapping["timeDomain"] = 0] = "timeDomain";
        CursorTypeMapping[CursorTypeMapping["frequencyDomain"] = 1] = "frequencyDomain";
    })(CursorTypeMapping || (CursorTypeMapping = {}));
    var DataIds;
    (function (DataIds) {
        DataIds["TimeCursorStates"] = "timeCursorStates";
        DataIds["FftCursorStates"] = "fftCursorStates";
        DataIds["Type"] = "type";
        DataIds["Position"] = "position";
    })(DataIds || (DataIds = {}));
    var CursorStatesPackageAdapter = /** @class */ (function () {
        function CursorStatesPackageAdapter() {
            //newest version of package format
            this.currentPackageVersion = 1;
            //CursorState ObjectType (not a seperate adapter)
            this.cursorStateDataObjecType = "cursorstatedata";
            this.settingsType = "CursorStates";
            this.objectType = objectTypeEnum_1.ObjectType.CURSORSTATES;
        }
        CursorStatesPackageAdapter.prototype.packageToSetting = function (packageData, container) {
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
        CursorStatesPackageAdapter.prototype.packageV1ToSetting = function (packageData, container) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
            var setting = new settings_1.Settings(this.settingsType);
            if (((_c = (_b = (_a = packageData === null || packageData === void 0 ? void 0 : packageData.data) === null || _a === void 0 ? void 0 : _a[DataIds.TimeCursorStates]) === null || _b === void 0 ? void 0 : _b.meta) === null || _c === void 0 ? void 0 : _c.dataType) == dataTypeEnum_1.DataType.ARRAY && ((_f = (_e = (_d = packageData === null || packageData === void 0 ? void 0 : packageData.data) === null || _d === void 0 ? void 0 : _d[DataIds.TimeCursorStates]) === null || _e === void 0 ? void 0 : _e.meta) === null || _f === void 0 ? void 0 : _f[additionalMetaKeys_1.AdditionalMetaKeys.ARRAYTYPE]) == this.cursorStateDataObjecType) {
                var timeCursorStatesArray = (_h = (_g = packageData === null || packageData === void 0 ? void 0 : packageData.data) === null || _g === void 0 ? void 0 : _g[DataIds.TimeCursorStates]) === null || _h === void 0 ? void 0 : _h.data;
                setting.setValue(settingIds_1.SettingIds.TimeCursorPositions, this.cursorStateDataObjecToCursorState(timeCursorStatesArray));
            }
            else {
                throw mceConversionError_1.MceConversionError.createErrorByType(mceConversionError_1.MceConversionErrorType.MISSING_DATA, DataIds.TimeCursorStates);
            }
            if (((_l = (_k = (_j = packageData === null || packageData === void 0 ? void 0 : packageData.data) === null || _j === void 0 ? void 0 : _j[DataIds.FftCursorStates]) === null || _k === void 0 ? void 0 : _k.meta) === null || _l === void 0 ? void 0 : _l.dataType) == dataTypeEnum_1.DataType.ARRAY && ((_p = (_o = (_m = packageData === null || packageData === void 0 ? void 0 : packageData.data) === null || _m === void 0 ? void 0 : _m[DataIds.FftCursorStates]) === null || _o === void 0 ? void 0 : _o.meta) === null || _p === void 0 ? void 0 : _p[additionalMetaKeys_1.AdditionalMetaKeys.ARRAYTYPE]) == this.cursorStateDataObjecType) {
                var fftCursorStatesArray = (_r = (_q = packageData === null || packageData === void 0 ? void 0 : packageData.data) === null || _q === void 0 ? void 0 : _q[DataIds.FftCursorStates]) === null || _r === void 0 ? void 0 : _r.data;
                setting.setValue(settingIds_1.SettingIds.FftCursorPositions, this.cursorStateDataObjecToCursorState(fftCursorStatesArray));
            }
            else {
                throw mceConversionError_1.MceConversionError.createErrorByType(mceConversionError_1.MceConversionErrorType.MISSING_DATA, DataIds.FftCursorStates);
            }
            return setting;
        };
        CursorStatesPackageAdapter.prototype.cursorStateDataObjecToCursorState = function (cursorStateDataObjectArray) {
            var cursorStateArray = new Array();
            cursorStateDataObjectArray.forEach(function (cursorStateDataObject) {
                var cursorState = new cursorState_1.CursorState(CursorTypeMapping[cursorStateDataObject[DataIds.Type]]);
                var position = (Number.isNaN(cursorStateDataObject[DataIds.Position])) ? undefined : cursorStateDataObject[DataIds.Position];
                cursorState.position = position;
                cursorStateArray.push(cursorState);
            });
            return cursorStateArray;
        };
        CursorStatesPackageAdapter.prototype.cursorStateToCursorStateDataObject = function (cursorStateArray, cursorType) {
            var cursorStateDataObjectArray = new Array();
            cursorStateArray.forEach(function (cursorState) {
                var cursorStateDataObject = {};
                cursorStateDataObject[DataIds.Type] = cursorType;
                //let position: number = (cursorState === undefined) ? NaN : cursorState;
                cursorStateDataObject[DataIds.Position] = cursorState;
                cursorStateDataObjectArray.push(cursorStateDataObject);
            });
            return cursorStateDataObjectArray;
        };
        CursorStatesPackageAdapter.prototype.settingToPackage = function (settingsData) {
            var settings = settings_1.Settings.create(settingsData);
            var seriesData = {};
            var packageStructure = {
                packages: new Array(),
                topLevelID: NaN
            };
            if (settings.type === this.settingsType) {
                var id = meta_1.Meta.createID();
                var additionalMetaInfo = [{ key: additionalMetaKeys_1.AdditionalMetaKeys.OBJECTTYPE, value: this.objectType }, { key: additionalMetaKeys_1.AdditionalMetaKeys.ID, value: id }, { key: additionalMetaKeys_1.AdditionalMetaKeys.VERSION, value: this.currentPackageVersion }];
                var seriesMeta = new meta_1.Meta(dataTypeEnum_1.DataType.OBJECT, additionalMetaInfo);
                var timeCursorStateData = settings.getValue(settingIds_1.SettingIds.TimeCursorPositions);
                if (timeCursorStateData !== undefined) {
                    var timeCursorStateDataObject = this.cursorStateToCursorStateDataObject(timeCursorStateData, CursorTypeMapping.timeDomain);
                    seriesData[DataIds.TimeCursorStates] = new package_1.Package(new meta_1.Meta(dataTypeEnum_1.DataType.ARRAY, [{ key: additionalMetaKeys_1.AdditionalMetaKeys.ARRAYTYPE, value: this.cursorStateDataObjecType }]), timeCursorStateDataObject);
                }
                else {
                    throw mceConversionError_1.MceConversionError.createErrorByType(mceConversionError_1.MceConversionErrorType.MISSING_DATA, settingIds_1.SettingIds.TimeCursorPositions);
                }
                var fftCursorStateData = settings.getValue(settingIds_1.SettingIds.FftCursorPositions);
                if (fftCursorStateData !== undefined) {
                    var fftCursorStateDataObject = this.cursorStateToCursorStateDataObject(fftCursorStateData, CursorTypeMapping.frequencyDomain);
                    seriesData[DataIds.FftCursorStates] = new package_1.Package(new meta_1.Meta(dataTypeEnum_1.DataType.ARRAY, [{ key: additionalMetaKeys_1.AdditionalMetaKeys.ARRAYTYPE, value: this.cursorStateDataObjecType }]), fftCursorStateDataObject);
                }
                else {
                    throw mceConversionError_1.MceConversionError.createErrorByType(mceConversionError_1.MceConversionErrorType.MISSING_DATA, settingIds_1.SettingIds.FftCursorPositions);
                }
                var seriesPackage = new package_1.Package(seriesMeta, seriesData);
                packageStructure.packages.push(seriesPackage);
                packageStructure.topLevelID = id;
            }
            else {
                throw mceConversionError_1.MceConversionError.createErrorByType(mceConversionError_1.MceConversionErrorType.UNSUPPORTED_VERSION, this.settingsType);
            }
            return packageStructure;
        };
        return CursorStatesPackageAdapter;
    }());
    exports.CursorStatesPackageAdapter = CursorStatesPackageAdapter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3Vyc29yU3RhdGVzUGFja2FnZUFkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY29tbW9uL3N0YXRlcy9jdXJzb3JTdGF0ZXNQYWNrYWdlQWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFjQSxnRkFBZ0Y7SUFDaEYsSUFBSyxpQkFHSjtJQUhELFdBQUssaUJBQWlCO1FBQ2xCLHFFQUFjLENBQUE7UUFDZCwrRUFBbUIsQ0FBQTtJQUN2QixDQUFDLEVBSEksaUJBQWlCLEtBQWpCLGlCQUFpQixRQUdyQjtJQUVELElBQUssT0FLSjtJQUxELFdBQUssT0FBTztRQUNSLGdEQUFxQyxDQUFBO1FBQ3JDLDhDQUFtQyxDQUFBO1FBQ25DLHdCQUFhLENBQUE7UUFDYixnQ0FBcUIsQ0FBQTtJQUN6QixDQUFDLEVBTEksT0FBTyxLQUFQLE9BQU8sUUFLWDtJQUtEO1FBV0k7WUFUQSxrQ0FBa0M7WUFDakIsMEJBQXFCLEdBQUcsQ0FBQyxDQUFDO1lBRTNDLGlEQUFpRDtZQUNoQyw2QkFBd0IsR0FBRyxpQkFBaUIsQ0FBQztZQU0xRCxJQUFJLENBQUMsWUFBWSxHQUFHLGNBQWMsQ0FBQztZQUNuQyxJQUFJLENBQUMsVUFBVSxHQUFHLDJCQUFVLENBQUMsWUFBWSxDQUFDO1FBQzlDLENBQUM7UUFDRCxxREFBZ0IsR0FBaEIsVUFBaUIsV0FBcUIsRUFBRSxTQUEwQjs7WUFFOUQsSUFBSSxPQUFPLEdBQWMsSUFBSSxtQkFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUV6RCxJQUFHLE9BQUEsV0FBVyxhQUFYLFdBQVcsdUJBQVgsV0FBVyxDQUFFLElBQUksMENBQUUsUUFBUSxLQUFJLHVCQUFRLENBQUMsTUFBTSxJQUFJLE9BQUEsV0FBVyxhQUFYLFdBQVcsdUJBQVgsV0FBVyxDQUFFLElBQUksMENBQUcsdUNBQWtCLENBQUMsVUFBVSxNQUFLLElBQUksQ0FB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Y2thZ2VBZGFwdGVyLCBQYWNrYWdlQXJyYXlXaXRoVG9wTGV2ZWxJRCB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vaW50ZXJmYWNlL3BhY2thZ2VBZGFwdGVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IE9iamVjdFR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BhY2thZ2VDb252ZXJzaW9uL2VudW0vb2JqZWN0VHlwZUVudW1cIjtcclxuaW1wb3J0IHsgRXhwb3J0Q29udGFpbmVyIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wYWNrYWdlQ29udmVyc2lvbi9leHBvcnRDb250YWluZXJcIjtcclxuaW1wb3J0IHsgSVBhY2thZ2UgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BhY2thZ2VDb252ZXJzaW9uL2ludGVyZmFjZS9wYWNrYWdlSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGVyc2lzdGVuY2UvaW50ZXJmYWNlcy9zZXR0aW5nc0ludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGVyc2lzdGVuY2Uvc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgRGF0YVR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BhY2thZ2VDb252ZXJzaW9uL2VudW0vZGF0YVR5cGVFbnVtXCI7XHJcbmltcG9ydCB7IEFkZGl0aW9uYWxNZXRhS2V5cyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vZW51bS9hZGRpdGlvbmFsTWV0YUtleXNcIjtcclxuaW1wb3J0IHsgTWNlQ29udmVyc2lvbkVycm9yVHlwZSwgTWNlQ29udmVyc2lvbkVycm9yIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wYWNrYWdlQ29udmVyc2lvbi9tY2VDb252ZXJzaW9uRXJyb3JcIjtcclxuaW1wb3J0IHsgTWV0YSB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vbWV0YVwiO1xyXG5pbXBvcnQgeyBQYWNrYWdlIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wYWNrYWdlQ29udmVyc2lvbi9wYWNrYWdlXCI7XHJcbmltcG9ydCB7IFNldHRpbmdJZHMgfSBmcm9tIFwiLi9zZXR0aW5nSWRzXCI7XHJcbmltcG9ydCB7IEN1cnNvclN0YXRlIH0gZnJvbSBcIi4vY3Vyc29yU3RhdGVcIjtcclxuXHJcbi8vRW51bSB0byBtYXAgdGhlIG51bWJlcnMsIHJlcHJlc2VudGluZyBhIGN1cnNvciB0eXBlIHRvIGEgc3RyaW5nIGFuZCBiYWNrIGFnYWluXHJcbmVudW0gQ3Vyc29yVHlwZU1hcHBpbmcgeyAvLyBtYWtlIHN1cmUgdGhpcyBlbnVtIHN0YXlzIHN5bmNocm9uaXplZCB3aXRoIHRoZSBDdXJzb3JTdGF0ZXMgQ3Vyc29yVHlwZXMgZW51bVxyXG4gICAgdGltZURvbWFpbiA9IDAsXHJcbiAgICBmcmVxdWVuY3lEb21haW4gPSAxXHJcbn1cclxuXHJcbmVudW0gRGF0YUlkcyB7XHJcbiAgICBUaW1lQ3Vyc29yU3RhdGVzID0gXCJ0aW1lQ3Vyc29yU3RhdGVzXCIsXHJcbiAgICBGZnRDdXJzb3JTdGF0ZXMgPSBcImZmdEN1cnNvclN0YXRlc1wiLFxyXG4gICAgVHlwZSA9IFwidHlwZVwiLFxyXG4gICAgUG9zaXRpb24gPSBcInBvc2l0aW9uXCJcclxufVxyXG50eXBlIEN1cnNvclN0YXRlRGF0YU9iamVjdCA9IHsgLy8gdHlwZSBvZiBkYXRhIG9iamVjdCBmb3IgY3Vyc29yc3RhdGVcclxuICAgIHR5cGU6IHN0cmluZyxcclxuICAgIHBvc2l0aW9uOiBudW1iZXJcclxufVxyXG5jbGFzcyBDdXJzb3JTdGF0ZXNQYWNrYWdlQWRhcHRlciBpbXBsZW1lbnRzIElQYWNrYWdlQWRhcHRlciB7XHJcbiAgIFxyXG4gICAgLy9uZXdlc3QgdmVyc2lvbiBvZiBwYWNrYWdlIGZvcm1hdFxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBjdXJyZW50UGFja2FnZVZlcnNpb24gPSAxO1xyXG5cclxuICAgIC8vQ3Vyc29yU3RhdGUgT2JqZWN0VHlwZSAobm90IGEgc2VwZXJhdGUgYWRhcHRlcilcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgY3Vyc29yU3RhdGVEYXRhT2JqZWNUeXBlID0gXCJjdXJzb3JzdGF0ZWRhdGFcIjtcclxuXHJcbiAgICBwcm90ZWN0ZWQgc2V0dGluZ3NUeXBlOiBzdHJpbmc7XHJcbiAgICBwcm90ZWN0ZWQgb2JqZWN0VHlwZTogT2JqZWN0VHlwZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnNldHRpbmdzVHlwZSA9IFwiQ3Vyc29yU3RhdGVzXCI7XHJcbiAgICAgICAgdGhpcy5vYmplY3RUeXBlID0gT2JqZWN0VHlwZS5DVVJTT1JTVEFURVM7XHJcbiAgICB9XHJcbiAgICBwYWNrYWdlVG9TZXR0aW5nKHBhY2thZ2VEYXRhOiBJUGFja2FnZSwgY29udGFpbmVyOiBFeHBvcnRDb250YWluZXIpOiBJU2V0dGluZ3Mge1xyXG5cclxuICAgICAgICBsZXQgc2V0dGluZzogSVNldHRpbmdzID0gbmV3IFNldHRpbmdzKHRoaXMuc2V0dGluZ3NUeXBlKTtcclxuXHJcbiAgICAgICAgaWYocGFja2FnZURhdGE/Lm1ldGE/LmRhdGFUeXBlID09IERhdGFUeXBlLk9CSkVDVCAmJiBwYWNrYWdlRGF0YT8ubWV0YT8uW0FkZGl0aW9uYWxNZXRhS2V5cy5PQkpFQ1RUWVBFXSA9PSB0aGlzLm9iamVjdFR5cGUpIHtcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgc3dpdGNoKHBhY2thZ2VEYXRhPy5tZXRhPy5bQWRkaXRpb25hbE1ldGFLZXlzLlZFUlNJT05dKXsgXHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZyA9IHRoaXMucGFja2FnZVYxVG9TZXR0aW5nKHBhY2thZ2VEYXRhLCBjb250YWluZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBNY2VDb252ZXJzaW9uRXJyb3IuY3JlYXRlRXJyb3JCeVR5cGUoTWNlQ29udmVyc2lvbkVycm9yVHlwZS5VTlNVUFBPUlRFRF9WRVJTSU9OLCB0aGlzLm9iamVjdFR5cGUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBNY2VDb252ZXJzaW9uRXJyb3IuY3JlYXRlRXJyb3JCeVR5cGUoTWNlQ29udmVyc2lvbkVycm9yVHlwZS5VTlNVUFBPUlRFRF9UWVBFLCB0aGlzLm9iamVjdFR5cGUpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc2V0dGluZztcclxuICAgIFxyXG4gICAgfSAgICBcclxuXHJcbiAgICBwcml2YXRlIHBhY2thZ2VWMVRvU2V0dGluZyhwYWNrYWdlRGF0YTogSVBhY2thZ2UsIGNvbnRhaW5lcjogRXhwb3J0Q29udGFpbmVyKTogSVNldHRpbmdzIHtcclxuICAgICAgICBsZXQgc2V0dGluZyA9IG5ldyBTZXR0aW5ncyh0aGlzLnNldHRpbmdzVHlwZSk7XHJcblxyXG4gICAgICAgIGlmKHBhY2thZ2VEYXRhPy5kYXRhPy5bRGF0YUlkcy5UaW1lQ3Vyc29yU3RhdGVzXT8ubWV0YT8uZGF0YVR5cGUgPT0gRGF0YVR5cGUuQVJSQVkgJiYgcGFja2FnZURhdGE/LmRhdGE/LltEYXRhSWRzLlRpbWVDdXJzb3JTdGF0ZXNdPy5tZXRhPy5bQWRkaXRpb25hbE1ldGFLZXlzLkFSUkFZVFlQRV0gPT0gdGhpcy5jdXJzb3JTdGF0ZURhdGFPYmplY1R5cGUpIHtcclxuICAgICAgICAgICAgbGV0IHRpbWVDdXJzb3JTdGF0ZXNBcnJheTogQXJyYXk8Q3Vyc29yU3RhdGVEYXRhT2JqZWN0PiA9IHBhY2thZ2VEYXRhPy5kYXRhPy5bRGF0YUlkcy5UaW1lQ3Vyc29yU3RhdGVzXT8uZGF0YTtcclxuICAgICAgICAgICAgc2V0dGluZy5zZXRWYWx1ZShTZXR0aW5nSWRzLlRpbWVDdXJzb3JQb3NpdGlvbnMsIHRoaXMuY3Vyc29yU3RhdGVEYXRhT2JqZWNUb0N1cnNvclN0YXRlKHRpbWVDdXJzb3JTdGF0ZXNBcnJheSkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IE1jZUNvbnZlcnNpb25FcnJvci5jcmVhdGVFcnJvckJ5VHlwZShNY2VDb252ZXJzaW9uRXJyb3JUeXBlLk1JU1NJTkdfREFUQSwgRGF0YUlkcy5UaW1lQ3Vyc29yU3RhdGVzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHBhY2thZ2VEYXRhPy5kYXRhPy5bRGF0YUlkcy5GZnRDdXJzb3JTdGF0ZXNdPy5tZXRhPy5kYXRhVHlwZSA9PSBEYXRhVHlwZS5BUlJBWSAmJiBwYWNrYWdlRGF0YT8uZGF0YT8uW0RhdGFJZHMuRmZ0Q3Vyc29yU3RhdGVzXT8ubWV0YT8uW0FkZGl0aW9uYWxNZXRhS2V5cy5BUlJBWVRZUEVdID09IHRoaXMuY3Vyc29yU3RhdGVEYXRhT2JqZWNUeXBlKSB7XHJcbiAgICAgICAgICAgIGxldCBmZnRDdXJzb3JTdGF0ZXNBcnJheTogQXJyYXk8Q3Vyc29yU3RhdGVEYXRhT2JqZWN0PiA9IHBhY2thZ2VEYXRhPy5kYXRhPy5bRGF0YUlkcy5GZnRDdXJzb3JTdGF0ZXNdPy5kYXRhO1xyXG4gICAgICAgICAgICBzZXR0aW5nLnNldFZhbHVlKFNldHRpbmdJZHMuRmZ0Q3Vyc29yUG9zaXRpb25zLCB0aGlzLmN1cnNvclN0YXRlRGF0YU9iamVjVG9DdXJzb3JTdGF0ZShmZnRDdXJzb3JTdGF0ZXNBcnJheSkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IE1jZUNvbnZlcnNpb25FcnJvci5jcmVhdGVFcnJvckJ5VHlwZShNY2VDb252ZXJzaW9uRXJyb3JUeXBlLk1JU1NJTkdfREFUQSwgRGF0YUlkcy5GZnRDdXJzb3JTdGF0ZXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNldHRpbmc7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGN1cnNvclN0YXRlRGF0YU9iamVjVG9DdXJzb3JTdGF0ZShjdXJzb3JTdGF0ZURhdGFPYmplY3RBcnJheTogQ3Vyc29yU3RhdGVEYXRhT2JqZWN0W10pOiBBcnJheTxDdXJzb3JTdGF0ZT4ge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBjdXJzb3JTdGF0ZUFycmF5OiBBcnJheTxDdXJzb3JTdGF0ZT4gPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICBcclxuICAgICAgICBjdXJzb3JTdGF0ZURhdGFPYmplY3RBcnJheS5mb3JFYWNoKChjdXJzb3JTdGF0ZURhdGFPYmplY3QpID0+IHtcclxuICAgICAgICAgICAgbGV0IGN1cnNvclN0YXRlID0gbmV3IEN1cnNvclN0YXRlKEN1cnNvclR5cGVNYXBwaW5nW2N1cnNvclN0YXRlRGF0YU9iamVjdFtEYXRhSWRzLlR5cGVdXSk7XHJcbiAgICAgICAgICAgIGxldCBwb3NpdGlvbjogbnVtYmVyIHwgdW5kZWZpbmVkID0gKE51bWJlci5pc05hTihjdXJzb3JTdGF0ZURhdGFPYmplY3RbRGF0YUlkcy5Qb3NpdGlvbl0pKSA/IHVuZGVmaW5lZCA6IGN1cnNvclN0YXRlRGF0YU9iamVjdFtEYXRhSWRzLlBvc2l0aW9uXTtcclxuICAgICAgICAgICAgY3Vyc29yU3RhdGUucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICAgICAgICAgICAgY3Vyc29yU3RhdGVBcnJheS5wdXNoKGN1cnNvclN0YXRlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGN1cnNvclN0YXRlQXJyYXk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGN1cnNvclN0YXRlVG9DdXJzb3JTdGF0ZURhdGFPYmplY3QoY3Vyc29yU3RhdGVBcnJheTogQ3Vyc29yU3RhdGVbXSwgY3Vyc29yVHlwZTogQ3Vyc29yVHlwZU1hcHBpbmcpOiBBcnJheTxDdXJzb3JTdGF0ZURhdGFPYmplY3Q+IHtcclxuICAgICAgICBsZXQgY3Vyc29yU3RhdGVEYXRhT2JqZWN0QXJyYXk6IEFycmF5PEN1cnNvclN0YXRlRGF0YU9iamVjdD4gPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICBcclxuICAgICAgICBjdXJzb3JTdGF0ZUFycmF5LmZvckVhY2goKGN1cnNvclN0YXRlKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjdXJzb3JTdGF0ZURhdGFPYmplY3Q9IHt9O1xyXG4gICAgICAgICAgICBjdXJzb3JTdGF0ZURhdGFPYmplY3RbRGF0YUlkcy5UeXBlXSA9IGN1cnNvclR5cGU7XHJcbiAgICAgICAgICAgIC8vbGV0IHBvc2l0aW9uOiBudW1iZXIgPSAoY3Vyc29yU3RhdGUgPT09IHVuZGVmaW5lZCkgPyBOYU4gOiBjdXJzb3JTdGF0ZTtcclxuICAgICAgICAgICAgY3Vyc29yU3RhdGVEYXRhT2JqZWN0W0RhdGFJZHMuUG9zaXRpb25dID0gY3Vyc29yU3RhdGU7XHJcblxyXG4gICAgICAgICAgICBjdXJzb3JTdGF0ZURhdGFPYmplY3RBcnJheS5wdXNoKGN1cnNvclN0YXRlRGF0YU9iamVjdCBhcyBDdXJzb3JTdGF0ZURhdGFPYmplY3QpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gY3Vyc29yU3RhdGVEYXRhT2JqZWN0QXJyYXk7XHJcbiAgICB9XHJcbiAgICBzZXR0aW5nVG9QYWNrYWdlKHNldHRpbmdzRGF0YTogSVNldHRpbmdzKTogUGFja2FnZUFycmF5V2l0aFRvcExldmVsSUQge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBzZXR0aW5ncyA9IFNldHRpbmdzLmNyZWF0ZShzZXR0aW5nc0RhdGEpO1xyXG5cclxuICAgICAgICBsZXQgc2VyaWVzRGF0YTogeyBbaW5kZXg6IHN0cmluZ106ICBJUGFja2FnZSB9ICA9IHt9O1xyXG5cclxuICAgICAgICBsZXQgcGFja2FnZVN0cnVjdHVyZTogUGFja2FnZUFycmF5V2l0aFRvcExldmVsSUQgPSB7XHJcbiAgICAgICAgICAgICBwYWNrYWdlczogbmV3IEFycmF5PElQYWNrYWdlPigpLFxyXG4gICAgICAgICAgICAgdG9wTGV2ZWxJRDogTmFOXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYoc2V0dGluZ3MudHlwZSA9PT0gdGhpcy5zZXR0aW5nc1R5cGUpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBpZCA9IE1ldGEuY3JlYXRlSUQoKTtcclxuICAgICAgICAgICAgbGV0IGFkZGl0aW9uYWxNZXRhSW5mbyA9IFt7a2V5OiBBZGRpdGlvbmFsTWV0YUtleXMuT0JKRUNUVFlQRSwgdmFsdWU6IHRoaXMub2JqZWN0VHlwZX0sIHtrZXk6IEFkZGl0aW9uYWxNZXRhS2V5cy5JRCwgdmFsdWU6IGlkfSwge2tleTogQWRkaXRpb25hbE1ldGFLZXlzLlZFUlNJT04sIHZhbHVlOiB0aGlzLmN1cnJlbnRQYWNrYWdlVmVyc2lvbn1dO1xyXG4gICAgICAgICAgICBsZXQgc2VyaWVzTWV0YSA9IG5ldyBNZXRhKERhdGFUeXBlLk9CSkVDVCwgYWRkaXRpb25hbE1ldGFJbmZvKTtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aW1lQ3Vyc29yU3RhdGVEYXRhOiBBcnJheTxDdXJzb3JTdGF0ZT4gPSBzZXR0aW5ncy5nZXRWYWx1ZShTZXR0aW5nSWRzLlRpbWVDdXJzb3JQb3NpdGlvbnMpO1xyXG4gICAgICAgICAgICBpZih0aW1lQ3Vyc29yU3RhdGVEYXRhICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGxldCB0aW1lQ3Vyc29yU3RhdGVEYXRhT2JqZWN0ID0gdGhpcy5jdXJzb3JTdGF0ZVRvQ3Vyc29yU3RhdGVEYXRhT2JqZWN0KHRpbWVDdXJzb3JTdGF0ZURhdGEsIEN1cnNvclR5cGVNYXBwaW5nLnRpbWVEb21haW4pO1xyXG4gICAgICAgICAgICAgICAgc2VyaWVzRGF0YVtEYXRhSWRzLlRpbWVDdXJzb3JTdGF0ZXNdID0gbmV3IFBhY2thZ2UobmV3IE1ldGEoRGF0YVR5cGUuQVJSQVksIFt7a2V5OkFkZGl0aW9uYWxNZXRhS2V5cy5BUlJBWVRZUEUsIHZhbHVlOiB0aGlzLmN1cnNvclN0YXRlRGF0YU9iamVjVHlwZX1dKSwgdGltZUN1cnNvclN0YXRlRGF0YU9iamVjdCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBNY2VDb252ZXJzaW9uRXJyb3IuY3JlYXRlRXJyb3JCeVR5cGUoTWNlQ29udmVyc2lvbkVycm9yVHlwZS5NSVNTSU5HX0RBVEEsIFNldHRpbmdJZHMuVGltZUN1cnNvclBvc2l0aW9ucyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBmZnRDdXJzb3JTdGF0ZURhdGE6IEFycmF5PEN1cnNvclN0YXRlPiB8IHVuZGVmaW5lZCA9IHNldHRpbmdzLmdldFZhbHVlKFNldHRpbmdJZHMuRmZ0Q3Vyc29yUG9zaXRpb25zKTtcclxuICAgICAgICAgICAgaWYoZmZ0Q3Vyc29yU3RhdGVEYXRhICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBmZnRDdXJzb3JTdGF0ZURhdGFPYmplY3QgPSB0aGlzLmN1cnNvclN0YXRlVG9DdXJzb3JTdGF0ZURhdGFPYmplY3QoZmZ0Q3Vyc29yU3RhdGVEYXRhLCBDdXJzb3JUeXBlTWFwcGluZy5mcmVxdWVuY3lEb21haW4pO1xyXG4gICAgICAgICAgICAgICAgc2VyaWVzRGF0YVtEYXRhSWRzLkZmdEN1cnNvclN0YXRlc10gPSBuZXcgUGFja2FnZShuZXcgTWV0YShEYXRhVHlwZS5BUlJBWSwgW3trZXk6QWRkaXRpb25hbE1ldGFLZXlzLkFSUkFZVFlQRSwgdmFsdWU6IHRoaXMuY3Vyc29yU3RhdGVEYXRhT2JqZWNUeXBlfV0pLCBmZnRDdXJzb3JTdGF0ZURhdGFPYmplY3QpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgTWNlQ29udmVyc2lvbkVycm9yLmNyZWF0ZUVycm9yQnlUeXBlKE1jZUNvbnZlcnNpb25FcnJvclR5cGUuTUlTU0lOR19EQVRBLCBTZXR0aW5nSWRzLkZmdEN1cnNvclBvc2l0aW9ucyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICBsZXQgc2VyaWVzUGFja2FnZSA9IG5ldyBQYWNrYWdlKHNlcmllc01ldGEsIHNlcmllc0RhdGEpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcGFja2FnZVN0cnVjdHVyZS5wYWNrYWdlcy5wdXNoKHNlcmllc1BhY2thZ2UpO1xyXG4gICAgICAgICAgICBwYWNrYWdlU3RydWN0dXJlLnRvcExldmVsSUQgPSBpZDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBNY2VDb252ZXJzaW9uRXJyb3IuY3JlYXRlRXJyb3JCeVR5cGUoTWNlQ29udmVyc2lvbkVycm9yVHlwZS5VTlNVUFBPUlRFRF9WRVJTSU9OLCB0aGlzLnNldHRpbmdzVHlwZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcGFja2FnZVN0cnVjdHVyZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgQ3Vyc29yU3RhdGVzUGFja2FnZUFkYXB0ZXIgfSJdfQ==