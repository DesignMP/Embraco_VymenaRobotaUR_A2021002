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
define(["require", "exports", "./cmParameter"], function (require, exports, cmParameter_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CmGroup = /** @class */ (function (_super) {
        __extends(CmGroup, _super);
        function CmGroup(element, componentDataModel) {
            var _this = _super.call(this, element, componentDataModel) || this;
            var childConfigurationData = new Array();
            if (element.Group != null) {
                if (element.Group.Childs != null) {
                    element.Group.Childs.forEach(function (element) {
                        if (element.Group != null) {
                            childConfigurationData.push(new CmGroup(element, componentDataModel));
                        }
                        else {
                            childConfigurationData.push(new cmParameter_1.CmParameter(element, componentDataModel));
                        }
                    });
                }
            }
            _this.childs = childConfigurationData;
            return _this;
        }
        return CmGroup;
    }(cmParameter_1.CmParameter));
    exports.CmGroup = CmGroup;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY21Hcm91cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbmZpZ01hbmFnZXJEYXRhTW9kZWwvY21Hcm91cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBSUE7UUFBNkIsMkJBQVc7UUFJcEMsaUJBQVksT0FBWSxFQUFFLGtCQUF1QjtZQUFqRCxZQUNJLGtCQUFNLE9BQU8sRUFBRSxrQkFBa0IsQ0FBQyxTQWdCckM7WUFmRyxJQUFJLHNCQUFzQixHQUFHLElBQUksS0FBSyxFQUFnQixDQUFDO1lBQ3ZELElBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxJQUFJLEVBQUM7Z0JBQ3JCLElBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksSUFBSSxFQUFDO29CQUM1QixPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPO3dCQUVoQyxJQUFHLE9BQU8sQ0FBQyxLQUFLLElBQUksSUFBSSxFQUFDOzRCQUNyQixzQkFBc0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFLGtCQUFrQixDQUFDLENBQUMsQ0FBQzt5QkFDekU7NkJBQ0c7NEJBQ0Esc0JBQXNCLENBQUMsSUFBSSxDQUFDLElBQUkseUJBQVcsQ0FBQyxPQUFPLEVBQUUsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO3lCQUM3RTtvQkFDTCxDQUFDLENBQUMsQ0FBQztpQkFDTjthQUNKO1lBQ0QsS0FBSSxDQUFDLE1BQU0sR0FBRyxzQkFBc0IsQ0FBQzs7UUFDekMsQ0FBQztRQUNMLGNBQUM7SUFBRCxDQUFDLEFBdEJELENBQTZCLHlCQUFXLEdBc0J2QztJQXRCWSwwQkFBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDbVBhcmFtZXRlciB9IGZyb20gXCIuL2ludGVyZmFjZXMvY21QYXJhbWV0ZXJJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ21QYXJhbWV0ZXIgfSBmcm9tIFwiLi9jbVBhcmFtZXRlclwiO1xyXG5pbXBvcnQgeyBJQ21Hcm91cCB9IGZyb20gXCIuL2ludGVyZmFjZXMvY21Hcm91cEludGVyZmFjZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENtR3JvdXAgZXh0ZW5kcyBDbVBhcmFtZXRlciBpbXBsZW1lbnRzIElDbUdyb3Vwe1xyXG5cclxuICAgIGNoaWxkczogSUNtUGFyYW1ldGVyW107XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IGFueSwgY29tcG9uZW50RGF0YU1vZGVsOiBhbnkpe1xyXG4gICAgICAgIHN1cGVyKGVsZW1lbnQsIGNvbXBvbmVudERhdGFNb2RlbCk7XHJcbiAgICAgICAgdmFyIGNoaWxkQ29uZmlndXJhdGlvbkRhdGEgPSBuZXcgQXJyYXk8SUNtUGFyYW1ldGVyPigpO1xyXG4gICAgICAgIGlmKGVsZW1lbnQuR3JvdXAgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIGlmKGVsZW1lbnQuR3JvdXAuQ2hpbGRzICE9IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5Hcm91cC5DaGlsZHMuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZihlbGVtZW50Lkdyb3VwICE9IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZENvbmZpZ3VyYXRpb25EYXRhLnB1c2gobmV3IENtR3JvdXAoZWxlbWVudCwgY29tcG9uZW50RGF0YU1vZGVsKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkQ29uZmlndXJhdGlvbkRhdGEucHVzaChuZXcgQ21QYXJhbWV0ZXIoZWxlbWVudCwgY29tcG9uZW50RGF0YU1vZGVsKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jaGlsZHMgPSBjaGlsZENvbmZpZ3VyYXRpb25EYXRhO1xyXG4gICAgfVxyXG59Il19