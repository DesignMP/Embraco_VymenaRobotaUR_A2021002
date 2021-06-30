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
define(["require", "exports", "../../../../../framework/events"], function (require, exports, events_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AxisOrientation;
    (function (AxisOrientation) {
        AxisOrientation[AxisOrientation["horizontal"] = 0] = "horizontal";
        AxisOrientation[AxisOrientation["vertical"] = 1] = "vertical";
    })(AxisOrientation = exports.AxisOrientation || (exports.AxisOrientation = {}));
    var AxisPosition;
    (function (AxisPosition) {
        AxisPosition[AxisPosition["left"] = 0] = "left";
        AxisPosition[AxisPosition["right"] = 1] = "right";
    })(AxisPosition = exports.AxisPosition || (exports.AxisPosition = {}));
    var EventAxisRangeChanged = /** @class */ (function (_super) {
        __extends(EventAxisRangeChanged, _super);
        function EventAxisRangeChanged() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventAxisRangeChanged;
    }(events_1.TypedEvent));
    exports.EventAxisRangeChanged = EventAxisRangeChanged;
    ;
    var EventAxisRangeChangedArgs = /** @class */ (function () {
        function EventAxisRangeChangedArgs(axisIDs, forceRedraw, syncAxis) {
            if (syncAxis === void 0) { syncAxis = false; }
            this.axisIDs = axisIDs;
            this.forceRedraw = forceRedraw;
            this.syncAxis = syncAxis;
        }
        return EventAxisRangeChangedArgs;
    }());
    exports.EventAxisRangeChangedArgs = EventAxisRangeChangedArgs;
    var EventMouseAction = /** @class */ (function (_super) {
        __extends(EventMouseAction, _super);
        function EventMouseAction() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventMouseAction;
    }(events_1.TypedEvent));
    exports.EventMouseAction = EventMouseAction;
    ;
    var EventMouseArgs = /** @class */ (function () {
        function EventMouseArgs(mouseActionType, mousePoint, objectUnderMouse) {
            this.mouseActionType = mouseActionType;
            this.mousePoint = mousePoint;
            this.objectUnderMouse = objectUnderMouse;
        }
        return EventMouseArgs;
    }());
    exports.EventMouseArgs = EventMouseArgs;
    var EventMouseWheel = /** @class */ (function (_super) {
        __extends(EventMouseWheel, _super);
        function EventMouseWheel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventMouseWheel;
    }(events_1.TypedEvent));
    exports.EventMouseWheel = EventMouseWheel;
    ;
    var EventMouseWheelArgs = /** @class */ (function () {
        function EventMouseWheelArgs(mousePoint, objectUnderMouse, wheelDelta) {
            this.mousePoint = mousePoint;
            this.objectUnderMouse = objectUnderMouse;
            this.wheelDelta = wheelDelta;
        }
        return EventMouseWheelArgs;
    }());
    exports.EventMouseWheelArgs = EventMouseWheelArgs;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvcmUvaW50ZXJmYWNlcy9jb21wb25lbnRzL3VpL2NoYXJ0L2NoYXJ0SW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlQSxJQUFZLGVBR1g7SUFIRCxXQUFZLGVBQWU7UUFDdkIsaUVBQVksQ0FBQTtRQUNaLDZEQUFVLENBQUE7SUFDZCxDQUFDLEVBSFcsZUFBZSxHQUFmLHVCQUFlLEtBQWYsdUJBQWUsUUFHMUI7SUFFRCxJQUFZLFlBR1g7SUFIRCxXQUFZLFlBQVk7UUFDcEIsK0NBQUksQ0FBQTtRQUNKLGlEQUFLLENBQUE7SUFDVCxDQUFDLEVBSFcsWUFBWSxHQUFaLG9CQUFZLEtBQVosb0JBQVksUUFHdkI7SUFFRDtRQUEyQyx5Q0FBa0Q7UUFBN0Y7O1FBQStGLENBQUM7UUFBRCw0QkFBQztJQUFELENBQUMsQUFBaEcsQ0FBMkMsbUJBQVUsR0FBMkM7SUFBbkYsc0RBQXFCO0lBQThELENBQUM7SUFDakc7UUFLSSxtQ0FBYSxPQUFpQixFQUFFLFdBQW9CLEVBQUUsUUFBeUI7WUFBekIseUJBQUEsRUFBQSxnQkFBeUI7WUFDM0UsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7WUFDL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDN0IsQ0FBQztRQUNMLGdDQUFDO0lBQUQsQ0FBQyxBQVZELElBVUM7SUFWWSw4REFBeUI7SUFZdEM7UUFBc0Msb0NBQW1DO1FBQXpFOztRQUEyRSxDQUFDO1FBQUQsdUJBQUM7SUFBRCxDQUFDLEFBQTVFLENBQXNDLG1CQUFVLEdBQTRCO0lBQS9ELDRDQUFnQjtJQUErQyxDQUFDO0lBQzdFO1FBS0ksd0JBQWEsZUFBZ0MsRUFBRSxVQUFtQixFQUFFLGdCQUF3QztZQUN4RyxJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztZQUN2QyxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztZQUM3QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7UUFDN0MsQ0FBQztRQUNMLHFCQUFDO0lBQUQsQ0FBQyxBQVZELElBVUM7SUFWWSx3Q0FBYztJQVkzQjtRQUFxQyxtQ0FBd0M7UUFBN0U7O1FBQStFLENBQUM7UUFBRCxzQkFBQztJQUFELENBQUMsQUFBaEYsQ0FBcUMsbUJBQVUsR0FBaUM7SUFBbkUsMENBQWU7SUFBb0QsQ0FBQztJQUNqRjtRQUtJLDZCQUFhLFVBQW1CLEVBQUUsZ0JBQXdDLEVBQUUsVUFBa0I7WUFDMUYsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7WUFDN0IsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO1lBQ3pDLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQ2pDLENBQUM7UUFDTCwwQkFBQztJQUFELENBQUMsQUFWRCxJQVVDO0lBVlksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gXCIuLi8uLi8uLi8uLi8uLi9mcmFtZXdvcmsvZXZlbnRzXCI7XHJcbmltcG9ydCB7IFJlY3RhbmdsZSB9IGZyb20gXCIuLi8uLi8uLi8uLi90eXBlcy9SZWN0YW5nbGVcIjtcclxuaW1wb3J0IHsgSUNoYXJ0QXhpcyB9IGZyb20gXCIuL0NoYXJ0QXhpc0ludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vbW9kZWxzL2NvbW1vbi9pbnRlcmZhY2VzL3BvaW50SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IENoYXJ0T2JqZWN0SW5mb3JtYXRpb24gfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vd2lkZ2V0cy9jaGFydFdpZGdldC9DaGFydEJhc2VcIjtcclxuaW1wb3J0IHsgWm9vbURpcmVjdGlvbiB9IGZyb20gXCIuLi8uLi8uLi8uLi8uLi93aWRnZXRzL2NoYXJ0Vmlld1dpZGdldC9jaGFydFZpZXdXaWRnZXRcIjtcclxuaW1wb3J0IHsgTW91c2VBY3Rpb25UeXBlIH0gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL3dpZGdldHMvY2hhcnRXaWRnZXQvdXNlckludGVyYWN0aW9uL3VzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXJcIjtcclxuXHJcbi8vTGltaXRzXHJcbmV4cG9ydCBpbnRlcmZhY2UgU2ltcGxlUmFuZ2V7XHJcbiAgICBtaW46IG51bWJlcjtcclxuICAgIG1heDogbnVtYmVyO1xyXG4gICAgZGVsdGE/OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEF4aXNPcmllbnRhdGlvbntcclxuICAgIFwiaG9yaXpvbnRhbFwiLFxyXG4gICAgXCJ2ZXJ0aWNhbFwiXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEF4aXNQb3NpdGlvbntcclxuICAgIGxlZnQsXHJcbiAgICByaWdodFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRXZlbnRBeGlzUmFuZ2VDaGFuZ2VkIGV4dGVuZHMgVHlwZWRFdmVudCA8SUNoYXJ0QXhpcywgRXZlbnRBeGlzUmFuZ2VDaGFuZ2VkQXJncz4ge307XHJcbmV4cG9ydCBjbGFzcyBFdmVudEF4aXNSYW5nZUNoYW5nZWRBcmdzIHtcclxuICAgIGF4aXNJRHM6IHN0cmluZ1tdO1xyXG4gICAgZm9yY2VSZWRyYXc6IGJvb2xlYW47XHJcbiAgICBzeW5jQXhpcyA6IGJvb2xlYW47XHJcblxyXG4gICAgY29uc3RydWN0b3IgKGF4aXNJRHM6IHN0cmluZ1tdLCBmb3JjZVJlZHJhdzogYm9vbGVhbiwgc3luY0F4aXM6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgICAgIHRoaXMuYXhpc0lEcyA9IGF4aXNJRHM7XHJcbiAgICAgICAgdGhpcy5mb3JjZVJlZHJhdyA9IGZvcmNlUmVkcmF3O1xyXG4gICAgICAgIHRoaXMuc3luY0F4aXMgPSBzeW5jQXhpcztcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEV2ZW50TW91c2VBY3Rpb24gZXh0ZW5kcyBUeXBlZEV2ZW50IDxJQ2hhcnQsIEV2ZW50TW91c2VBcmdzPiB7fTtcclxuZXhwb3J0IGNsYXNzIEV2ZW50TW91c2VBcmdzIHtcclxuICAgIG1vdXNlQWN0aW9uVHlwZSA6IE1vdXNlQWN0aW9uVHlwZTtcclxuICAgIG1vdXNlUG9pbnQgOiBJUG9pbnQ7XHJcbiAgICBvYmplY3RVbmRlck1vdXNlOiBDaGFydE9iamVjdEluZm9ybWF0aW9uO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yIChtb3VzZUFjdGlvblR5cGU6IE1vdXNlQWN0aW9uVHlwZSwgbW91c2VQb2ludCA6IElQb2ludCwgb2JqZWN0VW5kZXJNb3VzZTogQ2hhcnRPYmplY3RJbmZvcm1hdGlvbil7XHJcbiAgICAgICAgdGhpcy5tb3VzZUFjdGlvblR5cGUgPSBtb3VzZUFjdGlvblR5cGU7XHJcbiAgICAgICAgdGhpcy5tb3VzZVBvaW50ID0gbW91c2VQb2ludDtcclxuICAgICAgICB0aGlzLm9iamVjdFVuZGVyTW91c2UgPSBvYmplY3RVbmRlck1vdXNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRXZlbnRNb3VzZVdoZWVsIGV4dGVuZHMgVHlwZWRFdmVudCA8SUNoYXJ0LCBFdmVudE1vdXNlV2hlZWxBcmdzPiB7fTtcclxuZXhwb3J0IGNsYXNzIEV2ZW50TW91c2VXaGVlbEFyZ3Mge1xyXG4gICAgbW91c2VQb2ludCA6IElQb2ludDtcclxuICAgIHdoZWVsRGVsdGEgOiBudW1iZXI7XHJcbiAgICBvYmplY3RVbmRlck1vdXNlOiBDaGFydE9iamVjdEluZm9ybWF0aW9uO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yIChtb3VzZVBvaW50IDogSVBvaW50LCBvYmplY3RVbmRlck1vdXNlOiBDaGFydE9iamVjdEluZm9ybWF0aW9uLCB3aGVlbERlbHRhOiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMubW91c2VQb2ludCA9IG1vdXNlUG9pbnQ7XHJcbiAgICAgICAgdGhpcy5vYmplY3RVbmRlck1vdXNlID0gb2JqZWN0VW5kZXJNb3VzZTtcclxuICAgICAgICB0aGlzLndoZWVsRGVsdGEgPSB3aGVlbERlbHRhO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUNoYXJ0e1xyXG5cclxuICAgIGV2ZW50QXhpc1JhbmdlQ2hhbmdlZCA6IEV2ZW50QXhpc1JhbmdlQ2hhbmdlZDtcclxuICAgIGV2ZW50TW91c2VBY3Rpb24gOiBFdmVudE1vdXNlQWN0aW9uO1xyXG4gICAgZXZlbnRNb3VzZVdoZWVsOiBFdmVudE1vdXNlV2hlZWw7XHJcblxyXG4gICAgcmVkcmF3KCk7XHJcbiAgICByZXNpemUoaGVpZ2h0IDogbnVtYmVyLCB3aWR0aDogbnVtYmVyKTtcclxuXHJcbiAgICBzZXRab29tRGlyZWN0aW9uKHpvb21EaXJlY3Rpb246IFpvb21EaXJlY3Rpb24pO1xyXG4gICAgZW5hYmxlQm94Wm9vbShlbmFibGU6IGJvb2xlYW4pO1xyXG4gICAgXHJcbiAgICBlbmFibGVQYW5uaW5nKGVuYWJsZTogYm9vbGVhbik7XHJcbiAgICBzZXRQYW5uaW5nQXhlcyhheGVzIDogSUNoYXJ0QXhpc1tdKVxyXG5cclxuICAgIGdldENoYXJ0QXJlYSgpIDogUmVjdGFuZ2xlO1xyXG4gICAgc2V0Q2hhcnRBcmVhKGNoYXJ0QXJlYTogUmVjdGFuZ2xlKTtcclxuXHJcbiAgICBnZXRYQXhpc1dpZHRoKCkgOiBudW1iZXI7XHJcblxyXG4gICAgZG9QYW5uaW5nKG1vdXNlWDogbnVtYmVyLCBtb3VzZVk6IG51bWJlcik7XHJcblxyXG4gICAgZ2V0QXhpcyhheGlzSUQ6IHN0cmluZykgOiBJQ2hhcnRBeGlzfHVuZGVmaW5lZDtcclxuICAgIGFkZFlBeGlzKGF4aXNJRDogc3RyaW5nLCBheGlzTWluOiBudW1iZXIsIGF4aXNNYXg6bnVtYmVyLCBwb3NpdGlvbiA6IEF4aXNQb3NpdGlvbik7XHJcbiAgICByZW1vdmVZQXhpcyhheGlzSUQgOiBzdHJpbmcpO1xyXG5cclxuICAgIC8vc2V0WUF4aXNPZmZzZXQobnVtYmVyT2ZBeGVzOiBudW1iZXIpO1xyXG5cclxufSJdfQ==