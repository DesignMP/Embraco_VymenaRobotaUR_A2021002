define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var IconInfo = /** @class */ (function () {
        function IconInfo(name, tooltip, imageName) {
            this._isDrawn = false;
            this._name = name;
            this._tooltip = tooltip;
            this._imageName = imageName;
        }
        Object.defineProperty(IconInfo.prototype, "name", {
            get: function () {
                return this._name;
            },
            set: function (name) {
                this._name = name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IconInfo.prototype, "tooltip", {
            get: function () {
                return this._tooltip;
            },
            set: function (tooltip) {
                this._tooltip = tooltip;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IconInfo.prototype, "imageName", {
            get: function () {
                return this._imageName;
            },
            set: function (imageName) {
                this._imageName = imageName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IconInfo.prototype, "isDrawn", {
            get: function () {
                return this._isDrawn;
            },
            set: function (isDrawn) {
                this._isDrawn = isDrawn;
            },
            enumerable: true,
            configurable: true
        });
        return IconInfo;
    }());
    exports.IconInfo = IconInfo;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbkluZm8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY29tbW9uL2ljb25JbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUFBO1FBT0ksa0JBQW1CLElBQVksRUFBRSxPQUFlLEVBQUUsU0FBaUI7WUFGM0QsYUFBUSxHQUFZLEtBQUssQ0FBQztZQUc5QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztZQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUNoQyxDQUFDO1FBRUQsc0JBQVcsMEJBQUk7aUJBQWY7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3RCLENBQUM7aUJBRUQsVUFBZ0IsSUFBSTtnQkFDaEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDdEIsQ0FBQzs7O1dBSkE7UUFNRCxzQkFBVyw2QkFBTztpQkFBbEI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ3pCLENBQUM7aUJBRUQsVUFBbUIsT0FBTztnQkFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7WUFDNUIsQ0FBQzs7O1dBSkE7UUFNRCxzQkFBVywrQkFBUztpQkFBcEI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQzNCLENBQUM7aUJBRUQsVUFBcUIsU0FBUztnQkFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7WUFDaEMsQ0FBQzs7O1dBSkE7UUFNRCxzQkFBVyw2QkFBTztpQkFBbEI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ3pCLENBQUM7aUJBRUQsVUFBbUIsT0FBTztnQkFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7WUFDNUIsQ0FBQzs7O1dBSkE7UUFLTCxlQUFDO0lBQUQsQ0FBQyxBQTVDRCxJQTRDQztJQTVDWSw0QkFBUSIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBJY29uSW5mb3tcclxuXHJcbiAgICBwcml2YXRlIF9uYW1lOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF90b29sdGlwOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF9pbWFnZU5hbWU6IHN0cmluZztcclxuICAgIHByaXZhdGUgX2lzRHJhd246IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCB0b29sdGlwOiBzdHJpbmcsIGltYWdlTmFtZTogc3RyaW5nKXtcclxuICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLl90b29sdGlwID0gdG9vbHRpcDtcclxuICAgICAgICB0aGlzLl9pbWFnZU5hbWUgPSBpbWFnZU5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBuYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBuYW1lKG5hbWUpIHtcclxuICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHRvb2x0aXAoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdG9vbHRpcDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHRvb2x0aXAodG9vbHRpcCkge1xyXG4gICAgICAgIHRoaXMuX3Rvb2x0aXAgPSB0b29sdGlwO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgaW1hZ2VOYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ltYWdlTmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGltYWdlTmFtZShpbWFnZU5hbWUpIHtcclxuICAgICAgICB0aGlzLl9pbWFnZU5hbWUgPSBpbWFnZU5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBpc0RyYXduKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pc0RyYXduO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgaXNEcmF3bihpc0RyYXduKSB7XHJcbiAgICAgICAgdGhpcy5faXNEcmF3biA9IGlzRHJhd247XHJcbiAgICB9XHJcbn0iXX0=