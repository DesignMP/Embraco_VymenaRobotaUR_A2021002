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
define(["require", "exports", "../../../framework/events"], function (require, exports, events_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventSerieDoubleClicked = /** @class */ (function (_super) {
        __extends(EventSerieDoubleClicked, _super);
        function EventSerieDoubleClicked() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventSerieDoubleClicked;
    }(events_1.TypedEvent));
    ;
    var EventChangeSize = /** @class */ (function (_super) {
        __extends(EventChangeSize, _super);
        function EventChangeSize() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventChangeSize;
    }(events_1.TypedEvent));
    ;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsTWFuYWdlcldpZGdldEludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9zaWduYWxNYW5hZ2VyV2lkZ2V0L2ludGVyZmFjZXMvc2lnbmFsTWFuYWdlcldpZGdldEludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBSUE7UUFBc0MsMkNBQTRDO1FBQWxGOztRQUFvRixDQUFDO1FBQUQsOEJBQUM7SUFBRCxDQUFDLEFBQXJGLENBQXNDLG1CQUFVLEdBQXFDO0lBQUEsQ0FBQztJQUN0RjtRQUE4QixtQ0FBd0M7UUFBdEU7O1FBQXdFLENBQUM7UUFBRCxzQkFBQztJQUFELENBQUMsQUFBekUsQ0FBOEIsbUJBQVUsR0FBaUM7SUFBQSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVdpZGdldCB9IGZyb20gXCIuLi8uLi9jb21tb24vaW50ZXJmYWNlcy93aWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvZXZlbnRzXCI7XHJcbmltcG9ydCB7IEJhc2VTZXJpZXMgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9iYXNlU2VyaWVzXCI7XHJcblxyXG5jbGFzcyBFdmVudFNlcmllRG91YmxlQ2xpY2tlZCBleHRlbmRzIFR5cGVkRXZlbnQ8SVNpZ25hbE1hbmFnZXJXaWRnZXQsIEJhc2VTZXJpZXM+eyB9O1xyXG5jbGFzcyBFdmVudENoYW5nZVNpemUgZXh0ZW5kcyBUeXBlZEV2ZW50PElTaWduYWxNYW5hZ2VyV2lkZ2V0LCBudW1iZXI+eyB9O1xyXG5cclxuLyoqXHJcbiAqIERlY2xhcmVzIHRoZSBTaWduYWwgTWFuYWdlciBXaWRnZXQgaW50ZXJmYWNlXHJcbiAqXHJcbiAqIEBpbnRlcmZhY2UgSVNpZ25hbE1hbmFnZXJXaWRnZXRcclxuICogQGV4dGVuZHMge1dpZGdldEludGVyZmFjZX1cclxuICovXHJcbmludGVyZmFjZSBJU2lnbmFsTWFuYWdlcldpZGdldCBleHRlbmRzIElXaWRnZXQge1xyXG4gIGVkaXRNb2RlQWN0aXZlO1xyXG4gIGFjdGl2YXRlRWRpdE1vZGUoYWN0aXZhdGU6IGJvb2xlYW4pO1xyXG4gIHN1cHByZXNzUmVmcmVzaChzdXBwcmVzczogYm9vbGVhbik7XHJcbiAgcmVmcmVzaCgpO1xyXG4gIGV2ZW50U2VyaWVEb3VibGVDbGlja2VkOiBFdmVudFNlcmllRG91YmxlQ2xpY2tlZDtcclxuICBldmVudENoYW5nZVNpemU6IEV2ZW50Q2hhbmdlU2l6ZTtcclxufVxyXG5cclxuZXhwb3J0IHtJU2lnbmFsTWFuYWdlcldpZGdldH07Il19