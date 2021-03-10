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
define(["require", "exports", "./cmNode", "../../../models/configManagerDataModel/cmGroup"], function (require, exports, cmNode_1, cmGroup_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CmGroupNode = /** @class */ (function (_super) {
        __extends(CmGroupNode, _super);
        function CmGroupNode(element) {
            var _this = _super.call(this, element) || this;
            _this.expandState = true;
            var childConfigurationData = new Array();
            if (element instanceof cmGroup_1.CmGroup) {
                if (element.childs != null) {
                    element.childs.forEach(function (element) {
                        if (element.filter == null || element.filter.active == false) {
                            if (element instanceof cmGroup_1.CmGroup) {
                                childConfigurationData.push(new CmGroupNode(element));
                            }
                            else {
                                childConfigurationData.push(new cmNode_1.CmNode(element));
                            }
                        }
                    });
                }
                _this.childs = childConfigurationData;
            }
            _this.childs = childConfigurationData;
            return _this;
        }
        return CmGroupNode;
    }(cmNode_1.CmNode));
    exports.CmGroupNode = CmGroupNode;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY21Hcm91cE5vZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY29uZmlnTWFuYWdlcldpZGdldC9tb2RlbC9jbUdyb3VwTm9kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBTUE7UUFBaUMsK0JBQU07UUFLbkMscUJBQVksT0FBaUI7WUFBN0IsWUFDSSxrQkFBTSxPQUFPLENBQUMsU0FrQmpCO1lBckJELGlCQUFXLEdBQVksSUFBSSxDQUFDO1lBSXhCLElBQUksc0JBQXNCLEdBQUcsSUFBSSxLQUFLLEVBQVcsQ0FBQztZQUNsRCxJQUFHLE9BQU8sWUFBWSxpQkFBTyxFQUFDO2dCQUMxQixJQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksSUFBSSxFQUFDO29CQUN0QixPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFBLE9BQU87d0JBQzFCLElBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSxJQUFJLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksS0FBSyxFQUFDOzRCQUN4RCxJQUFHLE9BQU8sWUFBWSxpQkFBTyxFQUFDO2dDQUMxQixzQkFBc0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs2QkFDekQ7aUNBQ0c7Z0NBQ0Esc0JBQXNCLENBQUMsSUFBSSxDQUFDLElBQUksZUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7NkJBQ3BEO3lCQUNKO29CQUNMLENBQUMsQ0FBQyxDQUFDO2lCQUNOO2dCQUNELEtBQUksQ0FBQyxNQUFNLEdBQUcsc0JBQXNCLENBQUM7YUFDeEM7WUFDRCxLQUFJLENBQUMsTUFBTSxHQUFHLHNCQUFzQixDQUFDOztRQUN6QyxDQUFDO1FBQ0wsa0JBQUM7SUFBRCxDQUFDLEFBekJELENBQWlDLGVBQU0sR0F5QnRDO0lBekJZLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUNtTm9kZSB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2NtTm9kZUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJQ21Hcm91cE5vZGUgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9jbUdyb3VwTm9kZUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDbU5vZGUgfSBmcm9tIFwiLi9jbU5vZGVcIjtcclxuaW1wb3J0IHsgQ21Hcm91cCB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY29uZmlnTWFuYWdlckRhdGFNb2RlbC9jbUdyb3VwXCI7XHJcbmltcG9ydCB7IElDbUdyb3VwIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9jb25maWdNYW5hZ2VyRGF0YU1vZGVsL2ludGVyZmFjZXMvY21Hcm91cEludGVyZmFjZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENtR3JvdXBOb2RlIGV4dGVuZHMgQ21Ob2RlIGltcGxlbWVudHMgSUNtR3JvdXBOb2Rle1xyXG5cclxuICAgIGNoaWxkczogSUNtTm9kZVtdO1xyXG4gICAgZXhwYW5kU3RhdGU6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50OiBJQ21Hcm91cCl7XHJcbiAgICAgICAgc3VwZXIoZWxlbWVudCk7XHJcbiAgICAgICAgdmFyIGNoaWxkQ29uZmlndXJhdGlvbkRhdGEgPSBuZXcgQXJyYXk8SUNtTm9kZT4oKTtcclxuICAgICAgICBpZihlbGVtZW50IGluc3RhbmNlb2YgQ21Hcm91cCl7XHJcbiAgICAgICAgICAgIGlmKGVsZW1lbnQuY2hpbGRzICE9IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5jaGlsZHMuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZihlbGVtZW50LmZpbHRlciA9PSBudWxsIHx8IGVsZW1lbnQuZmlsdGVyLmFjdGl2ZSA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGVsZW1lbnQgaW5zdGFuY2VvZiBDbUdyb3VwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkQ29uZmlndXJhdGlvbkRhdGEucHVzaChuZXcgQ21Hcm91cE5vZGUoZWxlbWVudCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZENvbmZpZ3VyYXRpb25EYXRhLnB1c2gobmV3IENtTm9kZShlbGVtZW50KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNoaWxkcyA9IGNoaWxkQ29uZmlndXJhdGlvbkRhdGE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2hpbGRzID0gY2hpbGRDb25maWd1cmF0aW9uRGF0YTtcclxuICAgIH1cclxufSJdfQ==