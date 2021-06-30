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
define(["require", "exports", "./baseSeriesPackageAdapter", "../../common/packageConversion/enum/objectTypeEnum"], function (require, exports, baseSeriesPackageAdapter_1, objectTypeEnum_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FFTSeriesPackageAdapter = /** @class */ (function (_super) {
        __extends(FFTSeriesPackageAdapter, _super);
        function FFTSeriesPackageAdapter() {
            var _this = _super.call(this) || this;
            _this.settingsType = "FFTSeries";
            _this.objectType = objectTypeEnum_1.ObjectType.FFTSERIES;
            return _this;
        }
        return FFTSeriesPackageAdapter;
    }(baseSeriesPackageAdapter_1.BaseSeriesPackageAdapter));
    exports.FFTSeriesPackageAdapter = FFTSeriesPackageAdapter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmZ0U2VyaWVzUGFja2FnZUFkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvZmZ0U2VyaWVzUGFja2FnZUFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUdBO1FBQXNDLDJDQUF3QjtRQUUxRDtZQUFBLFlBQ0ksaUJBQU8sU0FHVjtZQUZHLEtBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDO1lBQ2hDLEtBQUksQ0FBQyxVQUFVLEdBQUcsMkJBQVUsQ0FBQyxTQUFTLENBQUM7O1FBQzNDLENBQUM7UUFDTCw4QkFBQztJQUFELENBQUMsQUFQRCxDQUFzQyxtREFBd0IsR0FPN0Q7SUFFUSwwREFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlU2VyaWVzUGFja2FnZUFkYXB0ZXIgfSBmcm9tIFwiLi9iYXNlU2VyaWVzUGFja2FnZUFkYXB0ZXJcIjtcclxuaW1wb3J0IHsgT2JqZWN0VHlwZSB9IGZyb20gXCIuLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vZW51bS9vYmplY3RUeXBlRW51bVwiO1xyXG5cclxuY2xhc3MgRkZUU2VyaWVzUGFja2FnZUFkYXB0ZXIgZXh0ZW5kcyBCYXNlU2VyaWVzUGFja2FnZUFkYXB0ZXJ7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnNldHRpbmdzVHlwZSA9IFwiRkZUU2VyaWVzXCI7XHJcbiAgICAgICAgdGhpcy5vYmplY3RUeXBlID0gT2JqZWN0VHlwZS5GRlRTRVJJRVM7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IEZGVFNlcmllc1BhY2thZ2VBZGFwdGVyIH0iXX0=