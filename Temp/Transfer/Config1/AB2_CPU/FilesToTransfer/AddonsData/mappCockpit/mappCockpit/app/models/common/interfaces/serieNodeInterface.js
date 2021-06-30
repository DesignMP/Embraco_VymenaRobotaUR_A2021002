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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWVOb2RlSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvY29tbW9uL2ludGVyZmFjZXMvc2VyaWVOb2RlSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFTQTtRQUErQixvQ0FBeUQ7UUFBeEY7O1FBQTBGLENBQUM7UUFBRCx1QkFBQztJQUFELENBQUMsQUFBM0YsQ0FBK0IsbUJBQVUsR0FBa0Q7SUFBQSxDQUFDO0lBQzVGO1FBQW9DLHlDQUFpRDtRQUFyRjs7UUFBdUYsQ0FBQztRQUFELDRCQUFDO0lBQUQsQ0FBQyxBQUF4RixDQUFvQyxtQkFBVSxHQUEwQztJQUFBLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUeXBlZEV2ZW50IH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9ldmVudHNcIjtcclxuaW1wb3J0IHsgRXZlbnRTaWduYWxNYW5hZ2VyRGF0YUNoYW5nZWRBcmdzIH0gZnJvbSBcIi4uLy4uL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvZXZlbnRTaWduYWxNYW5hZ2VyRGF0YUNoYW5nZWRBcmdzXCI7XHJcbmltcG9ydCB7IElTZXJpZUNvbnRhaW5lciB9IGZyb20gXCIuL3NlcmllQ29udGFpbmVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElTaWduYWxNYW5hZ2VyRGF0YU1vZGVsIH0gZnJvbSBcIi4uLy4uL2RhdGFNb2RlbHNcIjtcclxuaW1wb3J0IHsgSVNlcmllR3JvdXAgfSBmcm9tIFwiLi9zZXJpZUdyb3VwSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEJhc2VTZXJpZXMgfSBmcm9tIFwiLi4vLi4vY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2Jhc2VTZXJpZXNcIjtcclxuaW1wb3J0IHsgRXZlbnRTZXJpZURhdGFDaGFuZ2VkQXJncyB9IGZyb20gXCIuLi8uLi9jaGFydE1hbmFnZXJEYXRhTW9kZWwvZXZlbnRTZXJpZURhdGFDaGFuZ2VkQXJnc1wiO1xyXG5pbXBvcnQgeyBOb2RlVHlwZSB9IGZyb20gXCIuLi9zaWduYWwvc2VyaWVOb2RlXCI7XHJcblxyXG5jbGFzcyBFdmVudERhdGFDaGFuZ2VkIGV4dGVuZHMgVHlwZWRFdmVudDxJU2VyaWVOb2RlLCBFdmVudFNpZ25hbE1hbmFnZXJEYXRhQ2hhbmdlZEFyZ3M+eyB9O1xyXG5jbGFzcyBFdmVudFNlcmllRGF0YUNoYW5nZWQgZXh0ZW5kcyBUeXBlZEV2ZW50PEJhc2VTZXJpZXMsIEV2ZW50U2VyaWVEYXRhQ2hhbmdlZEFyZ3M+eyB9O1xyXG5cclxuLyoqXHJcbiAqIERlY2xhcmVzIHRoZSBzaWduYWwgbm9kZSBpbnRlcmZhY2VcclxuICpcclxuICogQGludGVyZmFjZSBJU2VyaWVOb2RlXHJcbiAgKi9cclxuZXhwb3J0IGludGVyZmFjZSBJU2VyaWVOb2Rle1xyXG4gIGV2ZW50RGF0YUNoYW5nZWQ6IEV2ZW50RGF0YUNoYW5nZWQ7XHJcbiAgZXZlbnRTZXJpZURhdGFDaGFuZ2VkOiBFdmVudFNlcmllRGF0YUNoYW5nZWQ7XHJcblxyXG4gIG5hbWU6IHN0cmluZztcclxuICBjb2xvcjogc3RyaW5nfHVuZGVmaW5lZDtcclxuICBjYW5EZWxldGU6IGJvb2xlYW47XHJcbiAgc2VyaWU6IEJhc2VTZXJpZXN8dW5kZWZpbmVkO1xyXG4gIHZhbGlkTm9kZTogYm9vbGVhbjtcclxuXHJcbiAgcGFyZW50OiBJU2VyaWVDb250YWluZXJ8dW5kZWZpbmVkO1xyXG4gIG5vZGVUeXBlOiBOb2RlVHlwZTtcclxuXHJcbiAgZGlzcG9zZSgpO1xyXG4gIGNsb25lKCk6IElTZXJpZU5vZGU7XHJcbiAgZ2V0RGF0YU1vZGVsKCk6IElTaWduYWxNYW5hZ2VyRGF0YU1vZGVsfHVuZGVmaW5lZDtcclxuICBnZXRTZXJpZUdyb3VwKCk6IElTZXJpZUdyb3VwfHVuZGVmaW5lZDtcclxufVxyXG4iXX0=