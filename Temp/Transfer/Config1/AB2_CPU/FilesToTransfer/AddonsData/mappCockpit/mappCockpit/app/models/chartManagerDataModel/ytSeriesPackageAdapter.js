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
    var YTSeriesPackageAdapter = /** @class */ (function (_super) {
        __extends(YTSeriesPackageAdapter, _super);
        function YTSeriesPackageAdapter() {
            var _this = _super.call(this) || this;
            _this.settingsType = "YTSeries";
            _this.objectType = objectTypeEnum_1.ObjectType.YTSERIES;
            return _this;
        }
        return YTSeriesPackageAdapter;
    }(baseSeriesPackageAdapter_1.BaseSeriesPackageAdapter));
    exports.YTSeriesPackageAdapter = YTSeriesPackageAdapter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXRTZXJpZXNQYWNrYWdlQWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC95dFNlcmllc1BhY2thZ2VBZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFHQTtRQUE0QywwQ0FBd0I7UUFFaEU7WUFBQSxZQUNJLGlCQUFPLFNBR1Y7WUFGRyxLQUFJLENBQUMsWUFBWSxHQUFHLFVBQVUsQ0FBQztZQUMvQixLQUFJLENBQUMsVUFBVSxHQUFHLDJCQUFVLENBQUMsUUFBUSxDQUFDOztRQUMxQyxDQUFDO1FBQ0wsNkJBQUM7SUFBRCxDQUFDLEFBUEQsQ0FBNEMsbURBQXdCLEdBT25FO0lBUFksd0RBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZVNlcmllc1BhY2thZ2VBZGFwdGVyIH0gZnJvbSBcIi4vYmFzZVNlcmllc1BhY2thZ2VBZGFwdGVyXCI7XHJcbmltcG9ydCB7IE9iamVjdFR5cGUgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3BhY2thZ2VDb252ZXJzaW9uL2VudW0vb2JqZWN0VHlwZUVudW1cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBZVFNlcmllc1BhY2thZ2VBZGFwdGVyIGV4dGVuZHMgQmFzZVNlcmllc1BhY2thZ2VBZGFwdGVye1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5nc1R5cGUgPSBcIllUU2VyaWVzXCI7XHJcbiAgICAgICAgdGhpcy5vYmplY3RUeXBlID0gT2JqZWN0VHlwZS5ZVFNFUklFUztcclxuICAgIH1cclxufSJdfQ==