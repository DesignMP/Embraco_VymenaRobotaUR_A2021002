define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var methodFilter = /** @class */ (function () {
        function methodFilter() {
            this._active = false;
            this._parameterRef = undefined;
            this._parameterValues = undefined;
        }
        Object.defineProperty(methodFilter.prototype, "active", {
            get: function () {
                return this._active;
            },
            set: function (active) {
                this._active = active;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(methodFilter.prototype, "parameterRef", {
            get: function () {
                return this._parameterRef;
            },
            set: function (parameterRef) {
                this._parameterRef = parameterRef;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(methodFilter.prototype, "parameterValues", {
            get: function () {
                return this._parameterValues;
            },
            set: function (parameterValues) {
                this._parameterValues = parameterValues;
            },
            enumerable: true,
            configurable: true
        });
        return methodFilter;
    }());
    exports.methodFilter = methodFilter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0aG9kRmlsdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL21ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXQvbWV0aG9kRmlsdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUFBO1FBQUE7WUFDWSxZQUFPLEdBQVksS0FBSyxDQUFDO1lBQ3pCLGtCQUFhLEdBQXVCLFNBQVMsQ0FBQztZQUM5QyxxQkFBZ0IsR0FBNEIsU0FBUyxDQUFDO1FBMEJsRSxDQUFDO1FBdkJHLHNCQUFJLGdDQUFNO2lCQUlWO2dCQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUN4QixDQUFDO2lCQU5ELFVBQVcsTUFBYztnQkFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7WUFDMUIsQ0FBQzs7O1dBQUE7UUFNRCxzQkFBSSxzQ0FBWTtpQkFJaEI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO1lBQzlCLENBQUM7aUJBTkQsVUFBaUIsWUFBZ0M7Z0JBQzdDLElBQUksQ0FBQyxhQUFhLEdBQUcsWUFBWSxDQUFDO1lBQ3RDLENBQUM7OztXQUFBO1FBTUQsc0JBQUkseUNBQWU7aUJBSW5CO2dCQUNJLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDO1lBQ2pDLENBQUM7aUJBTkQsVUFBb0IsZUFBd0M7Z0JBQ3hELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxlQUFlLENBQUE7WUFDM0MsQ0FBQzs7O1dBQUE7UUFLTCxtQkFBQztJQUFELENBQUMsQUE3QkQsSUE2QkM7SUE3Qlksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgbWV0aG9kRmlsdGVyIHtcclxuICAgIHByaXZhdGUgX2FjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfcGFyYW1ldGVyUmVmOiBzdHJpbmcgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF9wYXJhbWV0ZXJWYWx1ZXM6IEFycmF5PHN0cmluZz58dW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG5cclxuXHJcbiAgICBzZXQgYWN0aXZlKGFjdGl2ZTpib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fYWN0aXZlID0gYWN0aXZlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBhY3RpdmUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FjdGl2ZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgcGFyYW1ldGVyUmVmKHBhcmFtZXRlclJlZjogc3RyaW5nIHwgdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5fcGFyYW1ldGVyUmVmID0gcGFyYW1ldGVyUmVmO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBwYXJhbWV0ZXJSZWYoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGFyYW1ldGVyUmVmO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBwYXJhbWV0ZXJWYWx1ZXMocGFyYW1ldGVyVmFsdWVzOiBBcnJheTxzdHJpbmc+fHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuX3BhcmFtZXRlclZhbHVlcyA9IHBhcmFtZXRlclZhbHVlc1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBwYXJhbWV0ZXJWYWx1ZXMoKTogQXJyYXk8c3RyaW5nPnx1bmRlZmluZWR7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcmFtZXRlclZhbHVlcztcclxuICAgIH1cclxufSJdfQ==