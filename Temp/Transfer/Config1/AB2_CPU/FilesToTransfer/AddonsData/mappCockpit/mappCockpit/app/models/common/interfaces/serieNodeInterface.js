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
    var EventDataChanged = /** @class */ (function (_super) {
        __extends(EventDataChanged, _super);
        function EventDataChanged() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventDataChanged;
    }(events_1.TypedEvent));
    ;
    var EventSerieDataChanged = /** @class */ (function (_super) {
        __extends(EventSerieDataChanged, _super);
        function EventSerieDataChanged() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventSerieDataChanged;
    }(events_1.TypedEvent));
    ;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWVOb2RlSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvY29tbW9uL2ludGVyZmFjZXMvc2VyaWVOb2RlSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFRQTtRQUErQixvQ0FBeUQ7UUFBeEY7O1FBQTBGLENBQUM7UUFBRCx1QkFBQztJQUFELENBQUMsQUFBM0YsQ0FBK0IsbUJBQVUsR0FBa0Q7SUFBQSxDQUFDO0lBQzVGO1FBQW9DLHlDQUFpRDtRQUFyRjs7UUFBdUYsQ0FBQztRQUFELDRCQUFDO0lBQUQsQ0FBQyxBQUF4RixDQUFvQyxtQkFBVSxHQUEwQztJQUFBLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUeXBlZEV2ZW50IH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9ldmVudHNcIjtcclxuaW1wb3J0IHsgRXZlbnRTaWduYWxNYW5hZ2VyRGF0YUNoYW5nZWRBcmdzIH0gZnJvbSBcIi4uLy4uL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvZXZlbnRTaWduYWxNYW5hZ2VyRGF0YUNoYW5nZWRBcmdzXCI7XHJcbmltcG9ydCB7IElTZXJpZUNvbnRhaW5lciB9IGZyb20gXCIuL3NlcmllQ29udGFpbmVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElTaWduYWxNYW5hZ2VyRGF0YU1vZGVsIH0gZnJvbSBcIi4uLy4uL2RhdGFNb2RlbHNcIjtcclxuaW1wb3J0IHsgSVNlcmllR3JvdXAgfSBmcm9tIFwiLi9zZXJpZUdyb3VwSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEJhc2VTZXJpZXMgfSBmcm9tIFwiLi4vLi4vY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2Jhc2VTZXJpZXNcIjtcclxuaW1wb3J0IHsgRXZlbnRTZXJpZURhdGFDaGFuZ2VkQXJncyB9IGZyb20gXCIuLi8uLi9jaGFydE1hbmFnZXJEYXRhTW9kZWwvZXZlbnRTZXJpZURhdGFDaGFuZ2VkQXJnc1wiO1xyXG5cclxuY2xhc3MgRXZlbnREYXRhQ2hhbmdlZCBleHRlbmRzIFR5cGVkRXZlbnQ8SVNlcmllTm9kZSwgRXZlbnRTaWduYWxNYW5hZ2VyRGF0YUNoYW5nZWRBcmdzPnsgfTtcclxuY2xhc3MgRXZlbnRTZXJpZURhdGFDaGFuZ2VkIGV4dGVuZHMgVHlwZWRFdmVudDxCYXNlU2VyaWVzLCBFdmVudFNlcmllRGF0YUNoYW5nZWRBcmdzPnsgfTtcclxuXHJcbi8qKlxyXG4gKiBEZWNsYXJlcyB0aGUgc2lnbmFsIG5vZGUgaW50ZXJmYWNlXHJcbiAqXHJcbiAqIEBpbnRlcmZhY2UgSVNlcmllTm9kZVxyXG4gICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVNlcmllTm9kZXtcclxuICBldmVudERhdGFDaGFuZ2VkOiBFdmVudERhdGFDaGFuZ2VkO1xyXG4gIGV2ZW50U2VyaWVEYXRhQ2hhbmdlZDogRXZlbnRTZXJpZURhdGFDaGFuZ2VkO1xyXG5cclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgY29sb3I6IHN0cmluZ3x1bmRlZmluZWQ7XHJcbiAgY2FuRGVsZXRlOiBib29sZWFuO1xyXG4gIHNlcmllOiBCYXNlU2VyaWVzfHVuZGVmaW5lZDtcclxuICB2YWxpZE5vZGU6IGJvb2xlYW47XHJcblxyXG4gIHBhcmVudDogSVNlcmllQ29udGFpbmVyfHVuZGVmaW5lZDtcclxuXHJcbiAgZGlzcG9zZSgpO1xyXG4gIGNsb25lKCk6IElTZXJpZU5vZGU7XHJcbiAgZ2V0RGF0YU1vZGVsKCk6IElTaWduYWxNYW5hZ2VyRGF0YU1vZGVsfHVuZGVmaW5lZDtcclxuICBnZXRTZXJpZUdyb3VwKCk6IElTZXJpZUdyb3VwfHVuZGVmaW5lZDtcclxufVxyXG4iXX0=