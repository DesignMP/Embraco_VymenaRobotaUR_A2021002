define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     *this class holds the cursors position and additional information that is defined by the user
     *
     * @export
     * @class CursorPosition
     */
    var CursorPosition = /** @class */ (function () {
        function CursorPosition(position, additionalInformation) {
            this.position = position;
            this.additionalInformation = (additionalInformation != undefined) ? additionalInformation : {};
        }
        return CursorPosition;
    }());
    exports.CursorPosition = CursorPosition;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3Vyc29yUG9zaXRpb25JbmZvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0Vmlld1dpZGdldC9jdXJzb3IvQ3Vyc29yUG9zaXRpb25JbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUVBOzs7OztPQUtHO0lBQ0g7UUFHSSx3QkFBWSxRQUFnQixFQUFFLHFCQUEwQjtZQUNwRCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztZQUN6QixJQUFJLENBQUMscUJBQXFCLEdBQUcsQ0FBQyxxQkFBcUIsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNuRyxDQUFDO1FBQ0wscUJBQUM7SUFBRCxDQUFDLEFBUEQsSUFPQztJQVBZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVBvaW50IH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvaW50ZXJmYWNlcy9wb2ludEludGVyZmFjZVwiO1xyXG5cclxuLyoqXHJcbiAqdGhpcyBjbGFzcyBob2xkcyB0aGUgY3Vyc29ycyBwb3NpdGlvbiBhbmQgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiB0aGF0IGlzIGRlZmluZWQgYnkgdGhlIHVzZXJcclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAY2xhc3MgQ3Vyc29yUG9zaXRpb25cclxuICovXHJcbmV4cG9ydCBjbGFzcyBDdXJzb3JQb3NpdGlvbiB7XHJcbiAgICBwb3NpdGlvbjogSVBvaW50O1xyXG4gICAgYWRkaXRpb25hbEluZm9ybWF0aW9uOiB7fTtcclxuICAgIGNvbnN0cnVjdG9yKHBvc2l0aW9uOiBJUG9pbnQsIGFkZGl0aW9uYWxJbmZvcm1hdGlvbj86IHt9KSB7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgICAgIHRoaXMuYWRkaXRpb25hbEluZm9ybWF0aW9uID0gKGFkZGl0aW9uYWxJbmZvcm1hdGlvbiAhPSB1bmRlZmluZWQpID8gYWRkaXRpb25hbEluZm9ybWF0aW9uIDoge307XHJcbiAgICB9XHJcbn1cclxuIl19