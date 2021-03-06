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
    var EventSignalRemoved = /** @class */ (function (_super) {
        __extends(EventSignalRemoved, _super);
        function EventSignalRemoved() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventSignalRemoved;
    }(events_1.TypedEvent));
    ;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsTWFuYWdlckRhdGFNb2RlbEludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvaW50ZXJmYWNlcy9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFTQTtRQUFpQyxzQ0FBK0M7UUFBaEY7O1FBQWtGLENBQUM7UUFBRCx5QkFBQztJQUFELENBQUMsQUFBbkYsQ0FBaUMsbUJBQVUsR0FBd0M7SUFBQSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSURhdGFNb2RlbCB9IGZyb20gXCIuLi8uLi9kYXRhTW9kZWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvZXZlbnRzXCI7XHJcbmltcG9ydCB7IElTZXJpZUNvbnRhaW5lciB9IGZyb20gXCIuLi8uLi9jb21tb24vaW50ZXJmYWNlcy9zZXJpZUNvbnRhaW5lckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJU2lnbmFsQ2F0ZWdvcnkgfSBmcm9tIFwiLi9zaWduYWxDYXRlZ29yeUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJU2VyaWVOb2RlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9pbnRlcmZhY2VzL3NlcmllTm9kZUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4uLy4uL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9iYXNlU2VyaWVzXCI7XHJcbmltcG9ydCB7IElTZXJpZUdyb3VwIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9pbnRlcmZhY2VzL3NlcmllR3JvdXBJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVNlcmllc1Byb3ZpZGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJpZXNQcm92aWRlci9zZXJpZXNQcm92aWRlckludGVyZmFjZVwiO1xyXG5cclxuY2xhc3MgRXZlbnRTaWduYWxSZW1vdmVkIGV4dGVuZHMgVHlwZWRFdmVudDxJU2lnbmFsTWFuYWdlckRhdGFNb2RlbCwgQmFzZVNlcmllcz57IH07XHJcblxyXG4vKipcclxuICogRGVjbGFyZXMgdGhlIHNpZ25hbCBtYW5hZ2VyIGRhdGFNb2RlbCBpbnRlcmZhY2VcclxuICpcclxuICogQGludGVyZmFjZSBTaWduYWxNYW5hZ2VyRGF0YU1vZGVsSW50ZXJmYWNlXHJcbiAqIEBleHRlbmRzIHtEYXRhTW9kZWxJbnRlcmZhY2V9XHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElTaWduYWxNYW5hZ2VyRGF0YU1vZGVsIGV4dGVuZHMgSURhdGFNb2RlbCB7XHJcbiAgZXZlbnRTaWduYWxSZW1vdmVkOiBFdmVudFNpZ25hbFJlbW92ZWQ7XHJcbiAgZWRpdE1vZGVBY3RpdmU6Ym9vbGVhbjtcclxuICBzZXJpZXNQcm92aWRlcjogSVNlcmllc1Byb3ZpZGVyfHVuZGVmaW5lZDtcclxuICBjbGVhcigpO1xyXG4gIGFkZFNlcmllQ29udGFpbmVyKHNlcmllQ29udGFpbmVyOiBJU2VyaWVDb250YWluZXIsIGNhdGVnb3J5SWQ6IHN0cmluZyk7XHJcbiAgcmVtb3ZlU2VyaWVDb250YWluZXIoc2VyaWVDb250YWluZXI6IElTZXJpZUNvbnRhaW5lcik7XHJcbiAgYWRkVXBsb2FkZWRTZXJpZUdyb3VwKHNlcmllR3JvdXA6IElTZXJpZUdyb3VwKTtcclxuICBnZXRTaWduYWxDYXRlZ29yeShpZDogc3RyaW5nKTogSVNpZ25hbENhdGVnb3J5fHVuZGVmaW5lZDtcclxuICByZW1vdmVTZXJpZU5vZGUoc2VyaWVOb2RlOiBJU2VyaWVOb2RlKTtcclxufVxyXG4iXX0=