define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CmFilter = /** @class */ (function () {
        function CmFilter(parameterRef, parameterValue, parameterValues) {
            if (parameterValues === void 0) { parameterValues = undefined; }
            this.parameterRef = parameterRef;
            this.parameterValue = parameterValue;
            this.parameterValues = parameterValues;
            this.active = false;
        }
        return CmFilter;
    }());
    exports.CmFilter = CmFilter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY21GaWx0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9jb25maWdNYW5hZ2VyRGF0YU1vZGVsL2NtRmlsdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUVBO1FBTUksa0JBQVksWUFBb0IsRUFBRSxjQUFnQyxFQUFFLGVBQW9EO1lBQXBELGdDQUFBLEVBQUEsMkJBQW9EO1lBQ3BILElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLENBQUM7UUFDTCxlQUFDO0lBQUQsQ0FBQyxBQVpELElBWUM7SUFaWSw0QkFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDbUZpbHRlciB9IGZyb20gXCIuL2ludGVyZmFjZXMvY21GaWx0ZXJJbnRlcmZhY2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDbUZpbHRlciBpbXBsZW1lbnRzIElDbUZpbHRlcntcclxuICAgIGFjdGl2ZTogYm9vbGVhbjtcclxuICAgIHBhcmFtZXRlclJlZjogc3RyaW5nO1xyXG4gICAgcGFyYW1ldGVyVmFsdWU6IHN0cmluZ3x1bmRlZmluZWQ7XHJcbiAgICBwYXJhbWV0ZXJWYWx1ZXM6IEFycmF5PHN0cmluZz58dW5kZWZpbmVkO1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcihwYXJhbWV0ZXJSZWY6IHN0cmluZywgcGFyYW1ldGVyVmFsdWU6IHN0cmluZ3x1bmRlZmluZWQsIHBhcmFtZXRlclZhbHVlczogQXJyYXk8c3RyaW5nPnx1bmRlZmluZWQgPSB1bmRlZmluZWQpe1xyXG4gICAgICAgIHRoaXMucGFyYW1ldGVyUmVmID0gcGFyYW1ldGVyUmVmO1xyXG4gICAgICAgIHRoaXMucGFyYW1ldGVyVmFsdWUgPSBwYXJhbWV0ZXJWYWx1ZTtcclxuICAgICAgICB0aGlzLnBhcmFtZXRlclZhbHVlcyA9IHBhcmFtZXRlclZhbHVlcztcclxuICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG59Il19