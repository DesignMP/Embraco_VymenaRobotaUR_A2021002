define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Defines the available ids of drag and drop data (e.g. signal, chart, ...)
     *
     * @export
     * @class DroppableTypeId
     */
    var DragDropDataId = /** @class */ (function () {
        function DragDropDataId() {
        }
        DragDropDataId.signal = "signal";
        return DragDropDataId;
    }());
    exports.DragDropDataId = DragDropDataId;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcEludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jb21tb24vaW50ZXJmYWNlcy9kcm9wSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUVBOzs7OztPQUtHO0lBQ0g7UUFBQTtRQUVBLENBQUM7UUFEbUIscUJBQU0sR0FBRyxRQUFRLENBQUM7UUFDdEMscUJBQUM7S0FBQSxBQUZELElBRUM7SUFGWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERyYWdEcm9wQXJncyB9IGZyb20gXCIuLi9kcmFnRHJvcEFyZ3NcIjtcclxuXHJcbi8qKlxyXG4gKiBEZWZpbmVzIHRoZSBhdmFpbGFibGUgaWRzIG9mIGRyYWcgYW5kIGRyb3AgZGF0YSAoZS5nLiBzaWduYWwsIGNoYXJ0LCAuLi4pXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIERyb3BwYWJsZVR5cGVJZFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIERyYWdEcm9wRGF0YUlke1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IHNpZ25hbCA9IFwic2lnbmFsXCI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJbnRlcmZhY2UgZm9yIGhhbmRsaW5nIHRoZSBkcmFnL2Ryb3AgZXZlbnRzIHdpdGhpbiBhIHdpZGdldFxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBpbnRlcmZhY2UgSURyb3BwYWJsZVxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJRHJvcHBhYmxlIHtcclxuICAgIHN1cHBvcnRlZERyYWdEcm9wRGF0YUlkczogQXJyYXk8c3RyaW5nPjtcclxuICAgIFxyXG4gICAgLy8gQ2FsbGVkIGZvciBldmVyeSBkcm9wcGFibGUgd2lkZ2V0IHdpdGggc2FtZSBzY29wZVxyXG4gICAgZHJhZ1N0YXJ0KGFyZ3M6IERyYWdEcm9wQXJncyk7XHJcbiAgICBkcmFnU3RvcChhcmdzOiBEcmFnRHJvcEFyZ3MpO1xyXG4gICAgXHJcbiAgICAvLyBDYWxsZWQgZm9yIGV2ZXJ5IGRyb3BwYWJsZSB3aWRnZXQgd2l0aCBzYW1lIHNjb3BlIGFuZCB3ZXJlIHRoZSBjdXJyZW50VGFyZ2V0IGlzIHdpdGhpbiBhIHdpZGdldCBcclxuICAgIGRyYWdPdmVyKGFyZ3M6IERyYWdEcm9wQXJncyk6IGJvb2xlYW47IC8vIFJldHVybnMgdHJ1ZSBpZiBkcm9wcGluZyBpcyBwb3NzaWJsZVxyXG4gICAgZHJvcChhcmdzOiBEcmFnRHJvcEFyZ3MpO1xyXG4gICAgZHJvcEZvY3VzTG9zdChhcmdzOiBEcmFnRHJvcEFyZ3MpO1xyXG59Il19