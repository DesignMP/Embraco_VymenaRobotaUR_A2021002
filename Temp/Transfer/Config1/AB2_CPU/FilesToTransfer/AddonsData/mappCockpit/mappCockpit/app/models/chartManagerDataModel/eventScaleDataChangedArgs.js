define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ScaleAction;
    (function (ScaleAction) {
        ScaleAction[ScaleAction["rangeChanged"] = 0] = "rangeChanged";
    })(ScaleAction = exports.ScaleAction || (exports.ScaleAction = {}));
    /**
     * Defines the event args of the signal
     *
     * @class EventSerieDataChangedArgs
     */
    var EventScaleDataChangedArgs = /** @class */ (function () {
        function EventScaleDataChangedArgs(action, data, oldData) {
            if (oldData === void 0) { oldData = undefined; }
            this.action = action;
            this.data = data;
            this.oldData = oldData;
        }
        return EventScaleDataChangedArgs;
    }());
    exports.EventScaleDataChangedArgs = EventScaleDataChangedArgs;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRTY2FsZURhdGFDaGFuZ2VkQXJncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9ldmVudFNjYWxlRGF0YUNoYW5nZWRBcmdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUFBLElBQVksV0FFWDtJQUZELFdBQVksV0FBVztRQUNwQiw2REFBWSxDQUFBO0lBQ2YsQ0FBQyxFQUZXLFdBQVcsR0FBWCxtQkFBVyxLQUFYLG1CQUFXLFFBRXRCO0lBRUQ7Ozs7T0FJRztJQUNIO1FBTUksbUNBQVksTUFBbUIsRUFBRSxJQUFTLEVBQUUsT0FBd0I7WUFBeEIsd0JBQUEsRUFBQSxtQkFBd0I7WUFDaEUsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDckIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDM0IsQ0FBQztRQUVMLGdDQUFDO0lBQUQsQ0FBQyxBQVpELElBWUM7SUFaWSw4REFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZW51bSBTY2FsZUFjdGlvbiB7XHJcbiAgIHJhbmdlQ2hhbmdlZFxyXG59XHJcblxyXG4vKipcclxuICogRGVmaW5lcyB0aGUgZXZlbnQgYXJncyBvZiB0aGUgc2lnbmFsXHJcbiAqXHJcbiAqIEBjbGFzcyBFdmVudFNlcmllRGF0YUNoYW5nZWRBcmdzXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRXZlbnRTY2FsZURhdGFDaGFuZ2VkQXJncyB7XHJcblxyXG4gICAgYWN0aW9uOiBTY2FsZUFjdGlvbjtcclxuICAgIGRhdGE6IGFueTtcclxuICAgIG9sZERhdGE6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihhY3Rpb246IFNjYWxlQWN0aW9uLCBkYXRhOiBhbnksIG9sZERhdGE6IGFueSA9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuYWN0aW9uID0gYWN0aW9uO1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgdGhpcy5vbGREYXRhID0gb2xkRGF0YTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19