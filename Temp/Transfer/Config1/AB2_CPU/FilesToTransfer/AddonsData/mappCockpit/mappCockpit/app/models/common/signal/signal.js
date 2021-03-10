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
define(["require", "exports", "../../../framework/events", "./eventSignalDataChangedArgs"], function (require, exports, events_1, eventSignalDataChangedArgs_1) {
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
    var Signal = /** @class */ (function () {
        /**
         * Creates an instance of Signal.
         * @param {string} name
         * @param {Array<IPoint>} data
         * @memberof Signal
         */
        function Signal(name, data) {
            this.eventDataChanged = new EventDataChanged();
            this._name = name;
            // preserve original data points
            this._rawPoints = data;
            this.id = name + Signal.uniqueId;
            Signal.uniqueId++;
        }
        Object.defineProperty(Signal.prototype, "rawPointsValid", {
            get: function () {
                if (this._rawPoints.length < 2) {
                    return false;
                }
                return true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Signal.prototype, "name", {
            get: function () {
                return this._name;
            },
            set: function (value) {
                var oldName = this._name;
                this._name = value;
                this.onDataChanged(eventSignalDataChangedArgs_1.SignalAction.rename, oldName);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Signal.prototype, "rawPoints", {
            get: function () {
                return this._rawPoints;
            },
            set: function (points) {
                this._rawPoints = points;
                // Raise rawPoints changed event
                this.onDataChanged(eventSignalDataChangedArgs_1.SignalAction.dataPointsChanged, this._rawPoints);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Clones the signal
         *
         * @returns
         * @memberof Signal
         */
        Signal.prototype.clone = function () {
            var clonedSignal = new Signal(this._name, this.rawPoints);
            return clonedSignal;
        };
        /**
         * Raises the name changed event
         *
         * @private
         * @param {string} name
         * @memberof Signal
         */
        Signal.prototype.onDataChanged = function (action, data) {
            var eventArgs = new eventSignalDataChangedArgs_1.EventSignalDataChangedArgs(action, data);
            this.eventDataChanged.raise(this, eventArgs);
        };
        Signal.uniqueId = 0; // TODO use unique id (first recent data and latest have same id) => create unique id generator
        return Signal;
    }());
    exports.Signal = Signal;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvY29tbW9uL3NpZ25hbC9zaWduYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUtBO1FBQStCLG9DQUErQztRQUE5RTs7UUFBZ0YsQ0FBQztRQUFELHVCQUFDO0lBQUQsQ0FBQyxBQUFqRixDQUErQixtQkFBVSxHQUF3QztJQUFBLENBQUM7SUFFbEY7UUF1Q0k7Ozs7O1dBS0c7UUFDSCxnQkFBWSxJQUFZLEVBQUUsSUFBbUI7WUEzQzdDLHFCQUFnQixHQUFxQixJQUFJLGdCQUFnQixFQUFFLENBQUM7WUE0Q3hELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBRWxCLGdDQUFnQztZQUNoQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUV2QixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQ2pDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN0QixDQUFDO1FBMUNELHNCQUFXLGtDQUFjO2lCQUF6QjtnQkFDSSxJQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQztvQkFDMUIsT0FBTyxLQUFLLENBQUM7aUJBQ2hCO2dCQUNELE9BQU8sSUFBSSxDQUFDO1lBQ2hCLENBQUM7OztXQUFBO1FBRUQsc0JBQVcsd0JBQUk7aUJBQWY7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3RCLENBQUM7aUJBRUQsVUFBZ0IsS0FBYTtnQkFDekIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDekIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxhQUFhLENBQUMseUNBQVksQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDckQsQ0FBQzs7O1dBTkE7UUFRRCxzQkFBVyw2QkFBUztpQkFBcEI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQzNCLENBQUM7aUJBRUQsVUFBcUIsTUFBcUI7Z0JBQ3RDLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDO2dCQUV6QixnQ0FBZ0M7Z0JBQ2hDLElBQUksQ0FBQyxhQUFhLENBQUMseUNBQVksQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7WUFDdkUsQ0FBQzs7O1dBUEE7UUF5QkQ7Ozs7O1dBS0c7UUFDSCxzQkFBSyxHQUFMO1lBQ0ksSUFBSSxZQUFZLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDMUQsT0FBTyxZQUFZLENBQUM7UUFDeEIsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLDhCQUFhLEdBQXJCLFVBQXNCLE1BQW9CLEVBQUUsSUFBUztZQUNqRCxJQUFJLFNBQVMsR0FBRyxJQUFJLHVEQUEwQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztZQUM3RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNqRCxDQUFDO1FBbkVjLGVBQVEsR0FBVyxDQUFDLENBQUMsQ0FBQywrRkFBK0Y7UUFvRXhJLGFBQUM7S0FBQSxBQTdFRCxJQTZFQztJQTdFWSx3QkFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElTaWduYWwgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9zaWduYWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvZXZlbnRzXCI7XHJcbmltcG9ydCB7IFNpZ25hbEFjdGlvbiwgRXZlbnRTaWduYWxEYXRhQ2hhbmdlZEFyZ3MgfSBmcm9tIFwiLi9ldmVudFNpZ25hbERhdGFDaGFuZ2VkQXJnc1wiO1xyXG5cclxuY2xhc3MgRXZlbnREYXRhQ2hhbmdlZCBleHRlbmRzIFR5cGVkRXZlbnQ8SVNpZ25hbCwgRXZlbnRTaWduYWxEYXRhQ2hhbmdlZEFyZ3M+eyB9O1xyXG5cclxuZXhwb3J0IGNsYXNzIFNpZ25hbCBpbXBsZW1lbnRzIElTaWduYWx7XHJcbiAgICAgICAgXHJcbiAgICBldmVudERhdGFDaGFuZ2VkOiBFdmVudERhdGFDaGFuZ2VkID0gbmV3IEV2ZW50RGF0YUNoYW5nZWQoKTtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfbmFtZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfcmF3UG9pbnRzOiBBcnJheTxJUG9pbnQ+O1xyXG5cclxuICAgIHB1YmxpYyBpZDogc3RyaW5nO1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIHVuaXF1ZUlkOiBudW1iZXIgPSAwOyAvLyBUT0RPIHVzZSB1bmlxdWUgaWQgKGZpcnN0IHJlY2VudCBkYXRhIGFuZCBsYXRlc3QgaGF2ZSBzYW1lIGlkKSA9PiBjcmVhdGUgdW5pcXVlIGlkIGdlbmVyYXRvclxyXG5cclxuICAgIHB1YmxpYyBnZXQgcmF3UG9pbnRzVmFsaWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYodGhpcy5fcmF3UG9pbnRzLmxlbmd0aCA8IDIpe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgICAgXHJcbiAgICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIHNldCBuYW1lKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgb2xkTmFtZSA9IHRoaXMuX25hbWU7XHJcbiAgICAgICAgdGhpcy5fbmFtZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMub25EYXRhQ2hhbmdlZChTaWduYWxBY3Rpb24ucmVuYW1lLCBvbGROYW1lKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGdldCByYXdQb2ludHMoKTogQXJyYXk8SVBvaW50PntcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmF3UG9pbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgcmF3UG9pbnRzKHBvaW50czogQXJyYXk8SVBvaW50Pil7XHJcbiAgICAgICAgdGhpcy5fcmF3UG9pbnRzID0gcG9pbnRzO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFJhaXNlIHJhd1BvaW50cyBjaGFuZ2VkIGV2ZW50XHJcbiAgICAgICAgdGhpcy5vbkRhdGFDaGFuZ2VkKFNpZ25hbEFjdGlvbi5kYXRhUG9pbnRzQ2hhbmdlZCwgdGhpcy5fcmF3UG9pbnRzKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBTaWduYWwuXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxJUG9pbnQ+fSBkYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgZGF0YTogQXJyYXk8SVBvaW50Pil7XHJcbiAgICAgICAgdGhpcy5fbmFtZSA9IG5hbWU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcHJlc2VydmUgb3JpZ2luYWwgZGF0YSBwb2ludHNcclxuICAgICAgICB0aGlzLl9yYXdQb2ludHMgPSBkYXRhO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuaWQgPSBuYW1lICsgU2lnbmFsLnVuaXF1ZUlkO1xyXG4gICAgICAgIFNpZ25hbC51bmlxdWVJZCsrO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2xvbmVzIHRoZSBzaWduYWxcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbFxyXG4gICAgICovXHJcbiAgICBjbG9uZSgpOiBTaWduYWx7XHJcbiAgICAgICAgbGV0IGNsb25lZFNpZ25hbCA9IG5ldyBTaWduYWwodGhpcy5fbmFtZSwgdGhpcy5yYXdQb2ludHMpO1xyXG4gICAgICAgIHJldHVybiBjbG9uZWRTaWduYWw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSYWlzZXMgdGhlIG5hbWUgY2hhbmdlZCBldmVudFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uRGF0YUNoYW5nZWQoYWN0aW9uOiBTaWduYWxBY3Rpb24sIGRhdGE6IGFueSkge1xyXG4gICAgICAgIGxldCBldmVudEFyZ3MgPSBuZXcgRXZlbnRTaWduYWxEYXRhQ2hhbmdlZEFyZ3MoYWN0aW9uLCBkYXRhKTtcclxuICAgICAgICB0aGlzLmV2ZW50RGF0YUNoYW5nZWQucmFpc2UodGhpcywgZXZlbnRBcmdzKTtcclxuICAgIH1cclxufSJdfQ==