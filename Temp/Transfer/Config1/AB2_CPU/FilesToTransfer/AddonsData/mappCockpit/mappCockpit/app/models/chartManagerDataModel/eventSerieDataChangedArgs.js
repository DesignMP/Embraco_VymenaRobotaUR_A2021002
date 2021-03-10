define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SerieAction;
    (function (SerieAction) {
        SerieAction[SerieAction["rename"] = 0] = "rename";
        SerieAction[SerieAction["dataPointsChanged"] = 1] = "dataPointsChanged";
        SerieAction[SerieAction["colorChanged"] = 2] = "colorChanged";
        SerieAction[SerieAction["startTriggerTimeChanged"] = 3] = "startTriggerTimeChanged";
    })(SerieAction = exports.SerieAction || (exports.SerieAction = {}));
    /**
     * Defines the event args of the signal
     *
     * @class EventSerieDataChangedArgs
     */
    var EventSerieDataChangedArgs = /** @class */ (function () {
        function EventSerieDataChangedArgs(action, data, oldData) {
            if (oldData === void 0) { oldData = undefined; }
            this.action = action;
            this.data = data;
            this.oldData = oldData;
        }
        return EventSerieDataChangedArgs;
    }());
    exports.EventSerieDataChangedArgs = EventSerieDataChangedArgs;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRTZXJpZURhdGFDaGFuZ2VkQXJncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9ldmVudFNlcmllRGF0YUNoYW5nZWRBcmdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUFBLElBQVksV0FLWDtJQUxELFdBQVksV0FBVztRQUNuQixpREFBTSxDQUFBO1FBQ04sdUVBQWlCLENBQUE7UUFDakIsNkRBQVksQ0FBQTtRQUNaLG1GQUF1QixDQUFBO0lBQzNCLENBQUMsRUFMVyxXQUFXLEdBQVgsbUJBQVcsS0FBWCxtQkFBVyxRQUt0QjtJQUVEOzs7O09BSUc7SUFDSDtRQU1JLG1DQUFZLE1BQW1CLEVBQUUsSUFBUyxFQUFFLE9BQXdCO1lBQXhCLHdCQUFBLEVBQUEsbUJBQXdCO1lBQ2hFLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQzNCLENBQUM7UUFFTCxnQ0FBQztJQUFELENBQUMsQUFaRCxJQVlDO0lBWlksOERBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGVudW0gU2VyaWVBY3Rpb24ge1xyXG4gICAgcmVuYW1lLFxyXG4gICAgZGF0YVBvaW50c0NoYW5nZWQsXHJcbiAgICBjb2xvckNoYW5nZWQsXHJcbiAgICBzdGFydFRyaWdnZXJUaW1lQ2hhbmdlZCxcclxufVxyXG5cclxuLyoqXHJcbiAqIERlZmluZXMgdGhlIGV2ZW50IGFyZ3Mgb2YgdGhlIHNpZ25hbFxyXG4gKlxyXG4gKiBAY2xhc3MgRXZlbnRTZXJpZURhdGFDaGFuZ2VkQXJnc1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEV2ZW50U2VyaWVEYXRhQ2hhbmdlZEFyZ3Mge1xyXG5cclxuICAgIGFjdGlvbjogU2VyaWVBY3Rpb247XHJcbiAgICBkYXRhOiBhbnk7XHJcbiAgICBvbGREYXRhOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoYWN0aW9uOiBTZXJpZUFjdGlvbiwgZGF0YTogYW55LCBvbGREYXRhOiBhbnkgPSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLmFjdGlvbiA9IGFjdGlvbjtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgIHRoaXMub2xkRGF0YSA9IG9sZERhdGE7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==