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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvcmUvaW50ZXJmYWNlcy9jb21wb25lbnRzL3VpL2NoYXJ0L2NoYXJ0SW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlQSxJQUFZLGVBR1g7SUFIRCxXQUFZLGVBQWU7UUFDdkIsaUVBQVksQ0FBQTtRQUNaLDZEQUFVLENBQUE7SUFDZCxDQUFDLEVBSFcsZUFBZSxHQUFmLHVCQUFlLEtBQWYsdUJBQWUsUUFHMUI7SUFFRCxJQUFZLFlBR1g7SUFIRCxXQUFZLFlBQVk7UUFDcEIsK0NBQUksQ0FBQTtRQUNKLGlEQUFLLENBQUE7SUFDVCxDQUFDLEVBSFcsWUFBWSxHQUFaLG9CQUFZLEtBQVosb0JBQVksUUFHdkI7SUFFRDtRQUEyQyx5Q0FBa0Q7UUFBN0Y7O1FBQStGLENBQUM7UUFBRCw0QkFBQztJQUFELENBQUMsQUFBaEcsQ0FBMkMsbUJBQVUsR0FBMkM7SUFBbkYsc0RBQXFCO0lBQThELENBQUM7SUFDakc7UUFLSSxtQ0FBYSxPQUFpQixFQUFFLFdBQW9CLEVBQUUsUUFBeUI7WUFBekIseUJBQUEsRUFBQSxnQkFBeUI7WUFDM0UsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7WUFDL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDN0IsQ0FBQztRQUNMLGdDQUFDO0lBQUQsQ0FBQyxBQVZELElBVUM7SUFWWSw4REFBeUI7SUFZdEM7UUFBc0Msb0NBQW1DO1FBQXpFOztRQUEyRSxDQUFDO1FBQUQsdUJBQUM7SUFBRCxDQUFDLEFBQTVFLENBQXNDLG1CQUFVLEdBQTRCO0lBQS9ELDRDQUFnQjtJQUErQyxDQUFDO0lBQzdFO1FBS0ksd0JBQWEsZUFBZ0MsRUFBRSxVQUFtQixFQUFFLGdCQUF3QztZQUN4RyxJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztZQUN2QyxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztZQUM3QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7UUFDN0MsQ0FBQztRQUNMLHFCQUFDO0lBQUQsQ0FBQyxBQVZELElBVUM7SUFWWSx3Q0FBYztJQVkzQjtRQUFxQyxtQ0FBd0M7UUFBN0U7O1FBQStFLENBQUM7UUFBRCxzQkFBQztJQUFELENBQUMsQUFBaEYsQ0FBcUMsbUJBQVUsR0FBaUM7SUFBbkUsMENBQWU7SUFBb0QsQ0FBQztJQUNqRjtRQUtJLDZCQUFhLFVBQW1CLEVBQUUsZ0JBQXdDLEVBQUUsVUFBa0I7WUFDMUYsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7WUFDN0IsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO1lBQ3pDLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQ2pDLENBQUM7UUFDTCwwQkFBQztJQUFELENBQUMsQUFWRCxJQVVDO0lBVlksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gXCIuLi8uLi8uLi8uLi8uLi9mcmFtZXdvcmsvZXZlbnRzXCI7XHJcbmltcG9ydCB7IFJlY3RhbmdsZSB9IGZyb20gXCIuLi8uLi8uLi8uLi90eXBlcy9SZWN0YW5nbGVcIjtcclxuaW1wb3J0IHtJQ2hhcnRBeGlzfSBmcm9tIFwiLi9DaGFydEF4aXNJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL21vZGVscy9jb21tb24vaW50ZXJmYWNlcy9wb2ludEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDaGFydE9iamVjdEluZm9ybWF0aW9uIH0gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL3dpZGdldHMvY2hhcnRXaWRnZXQvQ2hhcnRCYXNlXCI7XHJcbmltcG9ydCB7IFpvb21EaXJlY3Rpb24gfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vd2lkZ2V0cy9jaGFydFZpZXdXaWRnZXQvY2hhcnRWaWV3V2lkZ2V0XCI7XHJcbmltcG9ydCB7IE1vdXNlQWN0aW9uVHlwZSB9IGZyb20gXCIuLi8uLi8uLi8uLi8uLi93aWRnZXRzL2NoYXJ0V2lkZ2V0L3VzZXJJbnRlcmFjdGlvbi91c2VySW50ZXJhY3Rpb25Db250cm9sbGVyXCI7XHJcblxyXG4vL0xpbWl0c1xyXG5leHBvcnQgaW50ZXJmYWNlIFNpbXBsZVJhbmdle1xyXG4gICAgbWluOiBudW1iZXI7XHJcbiAgICBtYXg6IG51bWJlcjtcclxuICAgIGRlbHRhPzogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgZW51bSBBeGlzT3JpZW50YXRpb257XHJcbiAgICBcImhvcml6b250YWxcIixcclxuICAgIFwidmVydGljYWxcIlxyXG59XHJcblxyXG5leHBvcnQgZW51bSBBeGlzUG9zaXRpb257XHJcbiAgICBsZWZ0LFxyXG4gICAgcmlnaHRcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEV2ZW50QXhpc1JhbmdlQ2hhbmdlZCBleHRlbmRzIFR5cGVkRXZlbnQgPElDaGFydEF4aXMsIEV2ZW50QXhpc1JhbmdlQ2hhbmdlZEFyZ3M+IHt9O1xyXG5leHBvcnQgY2xhc3MgRXZlbnRBeGlzUmFuZ2VDaGFuZ2VkQXJncyB7XHJcbiAgICBheGlzSURzOiBzdHJpbmdbXTtcclxuICAgIGZvcmNlUmVkcmF3OiBib29sZWFuO1xyXG4gICAgc3luY0F4aXMgOiBib29sZWFuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yIChheGlzSURzOiBzdHJpbmdbXSwgZm9yY2VSZWRyYXc6IGJvb2xlYW4sIHN5bmNBeGlzOiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgICAgICB0aGlzLmF4aXNJRHMgPSBheGlzSURzO1xyXG4gICAgICAgIHRoaXMuZm9yY2VSZWRyYXcgPSBmb3JjZVJlZHJhdztcclxuICAgICAgICB0aGlzLnN5bmNBeGlzID0gc3luY0F4aXM7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBFdmVudE1vdXNlQWN0aW9uIGV4dGVuZHMgVHlwZWRFdmVudCA8SUNoYXJ0LCBFdmVudE1vdXNlQXJncz4ge307XHJcbmV4cG9ydCBjbGFzcyBFdmVudE1vdXNlQXJncyB7XHJcbiAgICBtb3VzZUFjdGlvblR5cGUgOiBNb3VzZUFjdGlvblR5cGU7XHJcbiAgICBtb3VzZVBvaW50IDogSVBvaW50O1xyXG4gICAgb2JqZWN0VW5kZXJNb3VzZTogQ2hhcnRPYmplY3RJbmZvcm1hdGlvbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciAobW91c2VBY3Rpb25UeXBlOiBNb3VzZUFjdGlvblR5cGUsIG1vdXNlUG9pbnQgOiBJUG9pbnQsIG9iamVjdFVuZGVyTW91c2U6IENoYXJ0T2JqZWN0SW5mb3JtYXRpb24pe1xyXG4gICAgICAgIHRoaXMubW91c2VBY3Rpb25UeXBlID0gbW91c2VBY3Rpb25UeXBlO1xyXG4gICAgICAgIHRoaXMubW91c2VQb2ludCA9IG1vdXNlUG9pbnQ7XHJcbiAgICAgICAgdGhpcy5vYmplY3RVbmRlck1vdXNlID0gb2JqZWN0VW5kZXJNb3VzZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEV2ZW50TW91c2VXaGVlbCBleHRlbmRzIFR5cGVkRXZlbnQgPElDaGFydCwgRXZlbnRNb3VzZVdoZWVsQXJncz4ge307XHJcbmV4cG9ydCBjbGFzcyBFdmVudE1vdXNlV2hlZWxBcmdzIHtcclxuICAgIG1vdXNlUG9pbnQgOiBJUG9pbnQ7XHJcbiAgICB3aGVlbERlbHRhIDogbnVtYmVyO1xyXG4gICAgb2JqZWN0VW5kZXJNb3VzZTogQ2hhcnRPYmplY3RJbmZvcm1hdGlvbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciAobW91c2VQb2ludCA6IElQb2ludCwgb2JqZWN0VW5kZXJNb3VzZTogQ2hhcnRPYmplY3RJbmZvcm1hdGlvbiwgd2hlZWxEZWx0YTogbnVtYmVyKXtcclxuICAgICAgICB0aGlzLm1vdXNlUG9pbnQgPSBtb3VzZVBvaW50O1xyXG4gICAgICAgIHRoaXMub2JqZWN0VW5kZXJNb3VzZSA9IG9iamVjdFVuZGVyTW91c2U7XHJcbiAgICAgICAgdGhpcy53aGVlbERlbHRhID0gd2hlZWxEZWx0YTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElDaGFydHtcclxuXHJcbiAgICBldmVudEF4aXNSYW5nZUNoYW5nZWQgOiBFdmVudEF4aXNSYW5nZUNoYW5nZWQ7XHJcbiAgICBldmVudE1vdXNlQWN0aW9uIDogRXZlbnRNb3VzZUFjdGlvbjtcclxuICAgIGV2ZW50TW91c2VXaGVlbDogRXZlbnRNb3VzZVdoZWVsO1xyXG5cclxuICAgIHJlZHJhdygpO1xyXG4gICAgcmVzaXplKGhlaWdodCA6IG51bWJlciwgd2lkdGg6IG51bWJlcik7XHJcblxyXG4gICAgc2V0Wm9vbURpcmVjdGlvbih6b29tRGlyZWN0aW9uOiBab29tRGlyZWN0aW9uKTtcclxuICAgIGVuYWJsZUJveFpvb20oZW5hYmxlOiBib29sZWFuKTtcclxuICAgIFxyXG4gICAgZW5hYmxlUGFubmluZyhlbmFibGU6IGJvb2xlYW4pO1xyXG4gICAgc2V0UGFubmluZ0F4ZXMoYXhlcyA6IElDaGFydEF4aXNbXSlcclxuXHJcbiAgICBnZXRDaGFydEFyZWEoKSA6IFJlY3RhbmdsZTtcclxuICAgIHNldENoYXJ0QXJlYShjaGFydEFyZWE6IFJlY3RhbmdsZSk7XHJcblxyXG4gICAgZG9QYW5uaW5nKG1vdXNlWDogbnVtYmVyLCBtb3VzZVk6IG51bWJlcik7XHJcblxyXG4gICAgZ2V0QXhpcyhheGlzSUQ6IHN0cmluZykgOiBJQ2hhcnRBeGlzfHVuZGVmaW5lZDtcclxuICAgIGFkZFlBeGlzKGF4aXNJRDogc3RyaW5nLCBheGlzTWluOiBudW1iZXIsIGF4aXNNYXg6bnVtYmVyLCBwb3NpdGlvbiA6IEF4aXNQb3NpdGlvbik7XHJcbiAgICByZW1vdmVZQXhpcyhheGlzSUQgOiBzdHJpbmcpO1xyXG5cclxuICAgIC8vc2V0WUF4aXNPZmZzZXQobnVtYmVyT2ZBeGVzOiBudW1iZXIpO1xyXG5cclxufSJdfQ==