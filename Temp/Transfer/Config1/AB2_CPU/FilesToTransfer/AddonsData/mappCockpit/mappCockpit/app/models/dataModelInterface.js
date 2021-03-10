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
define(["require", "exports", "../framework/events"], function (require, exports, events_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // specify the direction of the model change
    var ModelChangeType;
    (function (ModelChangeType) {
        ModelChangeType[ModelChangeType["updateTarget"] = 0] = "updateTarget";
        ModelChangeType[ModelChangeType["updateSource"] = 1] = "updateSource";
    })(ModelChangeType || (ModelChangeType = {}));
    exports.ModelChangeType = ModelChangeType;
    /**
     *
     *
     * @class EventModelChangedArgs
     */
    var EventModelChangedArgs = /** @class */ (function () {
        /**
         *Creates an instance of EventModelChangedArgs.
         * @param {*} caller instance which invoked the change
         * @param {ModelChangeType} changeType the change direction
         * @param {*} hint additional info describing what has changed
         * @param {*} data additional data describing/containing the changed data
         * @memberof EventModelChangedArgs
         */
        function EventModelChangedArgs(caller, changeType, hint, data) {
            if (hint === void 0) { hint = {}; }
            if (data === void 0) { data = {}; }
            this.caller = caller;
            this.changeType = changeType;
            this.data = data;
            this.hint = hint;
        }
        return EventModelChangedArgs;
    }());
    exports.EventModelChangedArgs = EventModelChangedArgs;
    // Declare the model changed event
    var EventModelChanged = /** @class */ (function (_super) {
        __extends(EventModelChanged, _super);
        function EventModelChanged() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventModelChanged;
    }(events_1.TypedEvent));
    exports.EventModelChanged = EventModelChanged;
    ;
    var EventModelItemsChanged = /** @class */ (function (_super) {
        __extends(EventModelItemsChanged, _super);
        function EventModelItemsChanged() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventModelItemsChanged;
    }(events_1.TypedEvent));
    exports.EventModelItemsChanged = EventModelItemsChanged;
    ;
    var EventModelInitialized = /** @class */ (function (_super) {
        __extends(EventModelInitialized, _super);
        function EventModelInitialized() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventModelInitialized;
    }(events_1.TypedEvent));
    exports.EventModelInitialized = EventModelInitialized;
    ;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YU1vZGVsSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvZGF0YU1vZGVsSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFQSw0Q0FBNEM7SUFDNUMsSUFBSyxlQUdKO0lBSEQsV0FBSyxlQUFlO1FBQ2hCLHFFQUFZLENBQUE7UUFDWixxRUFBWSxDQUFBO0lBQ2hCLENBQUMsRUFISSxlQUFlLEtBQWYsZUFBZSxRQUduQjtJQXFGNEcsMENBQWU7SUFuRjVIOzs7O09BSUc7SUFDSDtRQU9JOzs7Ozs7O1dBT0c7UUFDSCwrQkFBWSxNQUFXLEVBQUUsVUFBMkIsRUFBQyxJQUFZLEVBQUMsSUFBWTtZQUF6QixxQkFBQSxFQUFBLFNBQVk7WUFBQyxxQkFBQSxFQUFBLFNBQVk7WUFDMUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7WUFDN0IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFFckIsQ0FBQztRQUVMLDRCQUFDO0lBQUQsQ0FBQyxBQXZCRCxJQXVCQztJQXVENkgsc0RBQXFCO0lBckRuSixrQ0FBa0M7SUFDbEM7UUFBZ0MscUNBQTZDO1FBQTdFOztRQUErRSxDQUFDO1FBQUQsd0JBQUM7SUFBRCxDQUFDLEFBQWhGLENBQWdDLG1CQUFVLEdBQXNDO0lBb0RwQyw4Q0FBaUI7SUFwRG1CLENBQUM7SUFDakY7UUFBcUMsMENBQTZDO1FBQWxGOztRQUFvRixDQUFDO1FBQUQsNkJBQUM7SUFBRCxDQUFDLEFBQXJGLENBQXFDLG1CQUFVLEdBQXNDO0lBbUR0Qix3REFBc0I7SUFuREEsQ0FBQztJQUN0RjtRQUFvQyx5Q0FBb0I7UUFBeEQ7O1FBQTBELENBQUM7UUFBRCw0QkFBQztJQUFELENBQUMsQUFBM0QsQ0FBb0MsbUJBQVUsR0FBYTtJQWtEMkIsc0RBQXFCO0lBbERoRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gXCIuLi9mcmFtZXdvcmsvZXZlbnRzXCI7XHJcblxyXG4vLyBzcGVjaWZ5IHRoZSBkaXJlY3Rpb24gb2YgdGhlIG1vZGVsIGNoYW5nZVxyXG5lbnVtIE1vZGVsQ2hhbmdlVHlwZSB7XHJcbiAgICB1cGRhdGVUYXJnZXQsXHJcbiAgICB1cGRhdGVTb3VyY2UsXHJcbn1cclxuXHJcbi8qKlxyXG4gKlxyXG4gKlxyXG4gKiBAY2xhc3MgRXZlbnRNb2RlbENoYW5nZWRBcmdzXHJcbiAqL1xyXG5jbGFzcyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3Mge1xyXG5cclxuICAgIGNoYW5nZVR5cGUhOiBNb2RlbENoYW5nZVR5cGU7XHJcbiAgICBjYWxsZXI6IGFueTtcclxuICAgIGhpbnQ6IGFueTtcclxuICAgIGRhdGE6IGFueTtcclxuXHJcbiAgICAvKipcclxuICAgICAqQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MuXHJcbiAgICAgKiBAcGFyYW0geyp9IGNhbGxlciBpbnN0YW5jZSB3aGljaCBpbnZva2VkIHRoZSBjaGFuZ2VcclxuICAgICAqIEBwYXJhbSB7TW9kZWxDaGFuZ2VUeXBlfSBjaGFuZ2VUeXBlIHRoZSBjaGFuZ2UgZGlyZWN0aW9uXHJcbiAgICAgKiBAcGFyYW0geyp9IGhpbnQgYWRkaXRpb25hbCBpbmZvIGRlc2NyaWJpbmcgd2hhdCBoYXMgY2hhbmdlZFxyXG4gICAgICogQHBhcmFtIHsqfSBkYXRhIGFkZGl0aW9uYWwgZGF0YSBkZXNjcmliaW5nL2NvbnRhaW5pbmcgdGhlIGNoYW5nZWQgZGF0YVxyXG4gICAgICogQG1lbWJlcm9mIEV2ZW50TW9kZWxDaGFuZ2VkQXJnc1xyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihjYWxsZXI6IGFueSwgY2hhbmdlVHlwZTogTW9kZWxDaGFuZ2VUeXBlLGhpbnQ6IGFueT17fSxkYXRhOiBhbnk9e30pIHtcclxuICAgICAgICB0aGlzLmNhbGxlciA9IGNhbGxlcjtcclxuICAgICAgICB0aGlzLmNoYW5nZVR5cGUgPSBjaGFuZ2VUeXBlO1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgdGhpcy5oaW50ID0gaGludDtcclxuXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4vLyBEZWNsYXJlIHRoZSBtb2RlbCBjaGFuZ2VkIGV2ZW50XHJcbmNsYXNzIEV2ZW50TW9kZWxDaGFuZ2VkIGV4dGVuZHMgVHlwZWRFdmVudDxJRGF0YU1vZGVsLCBFdmVudE1vZGVsQ2hhbmdlZEFyZ3M+eyB9O1xyXG5jbGFzcyBFdmVudE1vZGVsSXRlbXNDaGFuZ2VkIGV4dGVuZHMgVHlwZWRFdmVudDxJRGF0YU1vZGVsLCBFdmVudE1vZGVsQ2hhbmdlZEFyZ3M+eyB9O1xyXG5jbGFzcyBFdmVudE1vZGVsSW5pdGlhbGl6ZWQgZXh0ZW5kcyBUeXBlZEV2ZW50PGFueSwgYW55PnsgfTtcclxuXHJcbi8qKlxyXG4gKiBzcGVjaWZpZXMgdGhlIGRhdGEgbW9kZWwgaW50ZXJmYWNlXHJcbiAqXHJcbiAqIEBpbnRlcmZhY2UgSURhdGFNb2RlbFxyXG4gKi9cclxuaW50ZXJmYWNlIElEYXRhTW9kZWwgZXh0ZW5kcyBJRGF0YU1vZGVsSXRlbU9ic2VydmVyIHtcclxuXHJcbiAgICBkYXRhOiBhbnk7XHJcbiAgICBkYXRhU291cmNlOiBhbnk7XHJcblxyXG4gICAgZXZlbnRNb2RlbENoYW5nZWQ6IEV2ZW50TW9kZWxDaGFuZ2VkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogaW5pdGlhbGl6ZXMgdGhlIGRhdGEgbW9kZWxcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgSURhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBpbml0aWFsaXplKCk6IHZvaWQ7XHJcblxyXG4gICAgZGlzcG9zZSgpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogZm9yY2VzIGFuIHVwZGF0ZSBvZiB0aGUgd2hvbGUgZGF0YSBtb2RlbFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBJRGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIGNvbm5lY3QoY29tcG9uZW50TmFtZTogc3RyaW5nKTogdm9pZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIG5vdGlmaWVzIG90aGVyIGxpc3RlbmVycyBmcm9tIGEgbW9kZWwgY2hhbmdlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJRGF0YU1vZGVsfSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7RXZlbnRNb2RlbENoYW5nZWRBcmdzfSBkYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgSURhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBvbk1vZGVsQ2hhbmdlZChzZW5kZXI6IElEYXRhTW9kZWwsIGRhdGE6IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyk7XHJcbiAgICBoYW5kbGVNb2RlbENoYW5nZWQoc2VuZGVyOiBJRGF0YU1vZGVsLCBkYXRhOiBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MpO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgSURhdGFNb2RlbEl0ZW1PYnNlcnZlciB7XHJcbiAgICBldmVudE1vZGVsSXRlbXNDaGFuZ2VkOiBFdmVudE1vZGVsSXRlbXNDaGFuZ2VkO1xyXG4gICAgb2JzZXJ2ZU1vZGVsSXRlbXMob2JzZXJ2YWJsZUl0ZW1zOkFycmF5PGFueT4pO1xyXG4gICAgb25Nb2RlbEl0ZW1zQ2hhbmdlZChzZW5kZXI6IElEYXRhTW9kZWwsIGRhdGE6IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyk7XHJcbiAgICBoYW5kbGVNb2RlbEl0ZW1zQ2hhbmdlZChzZW5kZXI6IElEYXRhTW9kZWwsIGRhdGE6IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyk7XHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IHsgSURhdGFNb2RlbCwgSURhdGFNb2RlbEl0ZW1PYnNlcnZlcixFdmVudE1vZGVsQ2hhbmdlZCwgRXZlbnRNb2RlbEl0ZW1zQ2hhbmdlZCxFdmVudE1vZGVsSW5pdGlhbGl6ZWQsIE1vZGVsQ2hhbmdlVHlwZSwgRXZlbnRNb2RlbENoYW5nZWRBcmdzIH07Il19