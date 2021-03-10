define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CmNode = /** @class */ (function () {
        function CmNode(element) {
            this.element = element;
        }
        Object.defineProperty(CmNode.prototype, "displayName", {
            get: function () {
                return this.element.displayName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CmNode.prototype, "description", {
            get: function () {
                return this.element.description;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CmNode.prototype, "value", {
            get: function () {
                if (this.element.componentParameter != undefined) {
                    return this.element.componentParameter.value;
                }
                return "";
            },
            set: function (value) {
                if (this.element.componentParameter != undefined) {
                    this.element.componentParameter.value = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CmNode.prototype, "displayValue", {
            get: function () {
                if (this.element.componentParameter != undefined) {
                    return this.element.componentParameter.displayValue;
                }
                return "";
            },
            set: function (value) {
                if (this.element.componentParameter != undefined) {
                    this.element.componentParameter.displayValue = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CmNode.prototype, "unit", {
            get: function () {
                if (this.element.componentParameter != undefined) {
                    return this.element.componentParameter.engineeringUnit;
                }
                return "";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CmNode.prototype, "readOnly", {
            get: function () {
                if (this.element.componentParameter != undefined) {
                    return !this.element.componentParameter.isWriteable.value;
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        return CmNode;
    }());
    exports.CmNode = CmNode;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY21Ob2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NvbmZpZ01hbmFnZXJXaWRnZXQvbW9kZWwvY21Ob2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUdBO1FBR0ksZ0JBQVksT0FBcUI7WUFDN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDM0IsQ0FBQztRQUVELHNCQUFJLCtCQUFXO2lCQUFmO2dCQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7WUFDcEMsQ0FBQzs7O1dBQUE7UUFFRCxzQkFBSSwrQkFBVztpQkFBZjtnQkFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO1lBQ3BDLENBQUM7OztXQUFBO1FBRUQsc0JBQUkseUJBQUs7aUJBQVQ7Z0JBQ0ksSUFBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFrQixJQUFJLFNBQVMsRUFBQztvQkFDNUMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQztpQkFDaEQ7Z0JBQ0QsT0FBTyxFQUFFLENBQUM7WUFDZCxDQUFDO2lCQUVELFVBQVUsS0FBYTtnQkFDbkIsSUFBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFrQixJQUFJLFNBQVMsRUFBQztvQkFDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2lCQUNqRDtZQUNMLENBQUM7OztXQU5BO1FBUUQsc0JBQUksZ0NBQVk7aUJBQWhCO2dCQUNJLElBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsSUFBSSxTQUFTLEVBQUM7b0JBQzVDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUM7aUJBQ3ZEO2dCQUNELE9BQU8sRUFBRSxDQUFDO1lBQ2QsQ0FBQztpQkFFRCxVQUFpQixLQUFhO2dCQUMxQixJQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLElBQUksU0FBUyxFQUFDO29CQUM1QyxJQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7aUJBQ3hEO1lBQ0wsQ0FBQzs7O1dBTkE7UUFRRCxzQkFBSSx3QkFBSTtpQkFBUjtnQkFDSSxJQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLElBQUksU0FBUyxFQUFDO29CQUM1QyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsZUFBZSxDQUFDO2lCQUMxRDtnQkFDRCxPQUFPLEVBQUUsQ0FBQztZQUNkLENBQUM7OztXQUFBO1FBRUQsc0JBQUksNEJBQVE7aUJBQVo7Z0JBQ0ksSUFBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFrQixJQUFJLFNBQVMsRUFBQztvQkFDNUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztpQkFDN0Q7Z0JBQ0QsT0FBTyxLQUFLLENBQUM7WUFDakIsQ0FBQzs7O1dBQUE7UUFDTCxhQUFDO0lBQUQsQ0FBQyxBQXRERCxJQXNEQztJQXREWSx3QkFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDbU5vZGUgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9jbU5vZGVJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSUNtUGFyYW1ldGVyIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9jb25maWdNYW5hZ2VyRGF0YU1vZGVsL2ludGVyZmFjZXMvY21QYXJhbWV0ZXJJbnRlcmZhY2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDbU5vZGUgaW1wbGVtZW50cyBJQ21Ob2Rle1xyXG4gICAgZWxlbWVudDogSUNtUGFyYW1ldGVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IElDbVBhcmFtZXRlcil7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZGlzcGxheU5hbWUoKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQuZGlzcGxheU5hbWU7ICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGdldCBkZXNjcmlwdGlvbigpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudC5kZXNjcmlwdGlvbjsgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHZhbHVlKCk6IHN0cmluZ3tcclxuICAgICAgICBpZih0aGlzLmVsZW1lbnQuY29tcG9uZW50UGFyYW1ldGVyICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQuY29tcG9uZW50UGFyYW1ldGVyLnZhbHVlOyAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHZhbHVlKHZhbHVlOiBzdHJpbmcpe1xyXG4gICAgICAgIGlmKHRoaXMuZWxlbWVudC5jb21wb25lbnRQYXJhbWV0ZXIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmNvbXBvbmVudFBhcmFtZXRlci52YWx1ZSA9IHZhbHVlOyAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGRpc3BsYXlWYWx1ZSgpOiBzdHJpbmd7XHJcbiAgICAgICAgaWYodGhpcy5lbGVtZW50LmNvbXBvbmVudFBhcmFtZXRlciAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50LmNvbXBvbmVudFBhcmFtZXRlci5kaXNwbGF5VmFsdWU7ICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc2V0IGRpc3BsYXlWYWx1ZSh2YWx1ZTogc3RyaW5nKXtcclxuICAgICAgICBpZih0aGlzLmVsZW1lbnQuY29tcG9uZW50UGFyYW1ldGVyICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5jb21wb25lbnRQYXJhbWV0ZXIuZGlzcGxheVZhbHVlID0gdmFsdWU7ICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXQgdW5pdCgpOiBzdHJpbmd7XHJcbiAgICAgICAgaWYodGhpcy5lbGVtZW50LmNvbXBvbmVudFBhcmFtZXRlciAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50LmNvbXBvbmVudFBhcmFtZXRlci5lbmdpbmVlcmluZ1VuaXQ7ICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcmVhZE9ubHkoKTogYm9vbGVhbntcclxuICAgICAgICBpZih0aGlzLmVsZW1lbnQuY29tcG9uZW50UGFyYW1ldGVyICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5lbGVtZW50LmNvbXBvbmVudFBhcmFtZXRlci5pc1dyaXRlYWJsZS52YWx1ZTsgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufSJdfQ==