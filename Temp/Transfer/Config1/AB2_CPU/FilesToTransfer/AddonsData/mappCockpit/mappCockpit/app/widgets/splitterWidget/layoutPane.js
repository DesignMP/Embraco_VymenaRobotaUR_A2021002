define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LayoutPane = /** @class */ (function () {
        function LayoutPane(name, size, widget, fillSpace, resizable, expandable, collapsible, minimumSize) {
            if (fillSpace === void 0) { fillSpace = false; }
            if (resizable === void 0) { resizable = false; }
            if (expandable === void 0) { expandable = false; }
            if (collapsible === void 0) { collapsible = false; }
            if (minimumSize === void 0) { minimumSize = 0; }
            this.name = name;
            this.size = size;
            this.expandable = expandable;
            this.collapsible = collapsible;
            this.fillSpace = fillSpace;
            this.resizable = resizable;
            this.minimumSize = minimumSize;
            this.widget = widget;
        }
        return LayoutPane;
    }());
    exports.LayoutPane = LayoutPane;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0UGFuZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9zcGxpdHRlcldpZGdldC9sYXlvdXRQYW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUdBO1FBV0ksb0JBQVksSUFBWSxFQUFFLElBQVksRUFBRSxNQUFlLEVBQUUsU0FBaUIsRUFBRSxTQUFpQixFQUFFLFVBQWtCLEVBQUUsV0FBbUIsRUFBRSxXQUFlO1lBQTlGLDBCQUFBLEVBQUEsaUJBQWlCO1lBQUUsMEJBQUEsRUFBQSxpQkFBaUI7WUFBRSwyQkFBQSxFQUFBLGtCQUFrQjtZQUFFLDRCQUFBLEVBQUEsbUJBQW1CO1lBQUUsNEJBQUEsRUFBQSxlQUFlO1lBQ25KLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1lBQzdCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1lBQy9CLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1lBQzNCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1lBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1lBRS9CLElBQUksQ0FBQyxNQUFNLEdBQUUsTUFBTSxDQUFDO1FBQ3hCLENBQUM7UUFFTCxpQkFBQztJQUFELENBQUMsQUF2QkQsSUF1QkM7SUFFTyxnQ0FBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElMYXlvdXRQYW5lIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9sYXlvdXRQYW5lSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElXaWRnZXQgfSBmcm9tIFwiLi4vY29tbW9uL2ludGVyZmFjZXMvd2lkZ2V0SW50ZXJmYWNlXCI7XHJcblxyXG5jbGFzcyBMYXlvdXRQYW5lIGltcGxlbWVudHMgSUxheW91dFBhbmUge1xyXG4gICAgbmFtZTtcclxuICAgIHNpemU7XHJcbiAgICBleHBhbmRhYmxlO1xyXG4gICAgY29sbGFwc2libGU7XHJcbiAgICBmaWxsU3BhY2U7XHJcbiAgICByZXNpemFibGU7XHJcbiAgICBtaW5pbXVtU2l6ZTtcclxuXHJcbiAgICB3aWRnZXQ6IElXaWRnZXRcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHNpemU6IG51bWJlciwgd2lkZ2V0OiBJV2lkZ2V0LCBmaWxsU3BhY2UgPSBmYWxzZSwgcmVzaXphYmxlID0gZmFsc2UsIGV4cGFuZGFibGUgPSBmYWxzZSwgY29sbGFwc2libGUgPSBmYWxzZSwgbWluaW11bVNpemUgPSAwKXtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemU7XHJcbiAgICAgICAgdGhpcy5leHBhbmRhYmxlID0gZXhwYW5kYWJsZTtcclxuICAgICAgICB0aGlzLmNvbGxhcHNpYmxlID0gY29sbGFwc2libGU7XHJcbiAgICAgICAgdGhpcy5maWxsU3BhY2UgPSBmaWxsU3BhY2U7XHJcbiAgICAgICAgdGhpcy5yZXNpemFibGUgPSByZXNpemFibGU7XHJcbiAgICAgICAgdGhpcy5taW5pbXVtU2l6ZSA9IG1pbmltdW1TaXplO1xyXG5cclxuICAgICAgICB0aGlzLndpZGdldCA9d2lkZ2V0O1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IHtMYXlvdXRQYW5lfTsiXX0=