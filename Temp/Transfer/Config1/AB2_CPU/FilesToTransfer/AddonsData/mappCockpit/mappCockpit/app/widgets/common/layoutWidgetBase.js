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
define(["require", "exports", "./widgetBase", "../../framework/events", "./uniqueIdGenerator"], function (require, exports, widgetBase_1, events_1, uniqueIdGenerator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventWidgetActivated = /** @class */ (function (_super) {
        __extends(EventWidgetActivated, _super);
        function EventWidgetActivated() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventWidgetActivated;
    }(events_1.TypedEvent));
    ;
    var LayoutWidgetBase = /** @class */ (function (_super) {
        __extends(LayoutWidgetBase, _super);
        function LayoutWidgetBase() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.eventWidgetActivated = new EventWidgetActivated();
            return _this;
        }
        /**
         * Adds a widget to the widgets list of this layout widget
         *
         * @param {IWidget} widget
         * @param {string} name
         * @param {ViewType} viewType
         * @param {{}} [data]
         * @memberof LayoutWidgetBase
         */
        LayoutWidgetBase.prototype.addWidget = function (widget, name, viewType, data) {
            var id = name + "_" + viewType.toString();
            id = uniqueIdGenerator_1.UniqueIdGenerator.getInstance().getUniqueIdFromString(id);
            id = id.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '_');
            if (this._widgets[id] != undefined) {
                console.error("addWidget %s => id (%s) must be unique", name, viewType);
            }
            this._widgets[id] = widget;
            this.addWidgetToView(widget, this.view);
        };
        LayoutWidgetBase.prototype.addWidgetToView = function (widget, view) {
            if (view) {
                view.addWidget(widget);
            }
        };
        LayoutWidgetBase.prototype.removeWidgetFromView = function (widget) {
            if (this.view) {
                this.view.removeWidget(widget);
            }
        };
        /**
         * Removes a widget from the widgets list of this layout widget
         *
         * @param {(IWidget|undefined)} widget
         * @returns
         * @memberof LayoutWidgetBase
         */
        LayoutWidgetBase.prototype.removeWidget = function (widget) {
            if (widget == undefined) {
                return;
            }
            for (var key in this._widgets) {
                // check if the property/key is defined in the object itself, not in parent
                if (this._widgets.hasOwnProperty(key)) {
                    if (this._widgets[key] === widget) {
                        if (this.view) {
                            this.removeWidgetFromView(widget);
                        }
                        delete this._widgets[key];
                    }
                }
            }
        };
        return LayoutWidgetBase;
    }(widgetBase_1.WidgetBase));
    exports.LayoutWidgetBase = LayoutWidgetBase;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0V2lkZ2V0QmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jb21tb24vbGF5b3V0V2lkZ2V0QmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBVUE7UUFBbUMsd0NBQTBDO1FBQTdFOztRQUErRSxDQUFDO1FBQUQsMkJBQUM7SUFBRCxDQUFDLEFBQWhGLENBQW1DLG1CQUFVLEdBQW1DO0lBQUEsQ0FBQztJQUVqRjtRQUF3QyxvQ0FBVTtRQUFsRDtZQUFBLHFFQWtFQztZQWhFRywwQkFBb0IsR0FBRyxJQUFJLG9CQUFvQixFQUFFLENBQUM7O1FBZ0V0RCxDQUFDO1FBNURHOzs7Ozs7OztXQVFHO1FBQ0gsb0NBQVMsR0FBVCxVQUFVLE1BQWUsRUFBRSxJQUFZLEVBQUUsUUFBa0IsRUFBRSxJQUFTO1lBQ2xFLElBQUksRUFBRSxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUUsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3pDLEVBQUUsR0FBRyxxQ0FBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMvRCxFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyw0QkFBNEIsRUFBQyxHQUFHLENBQUMsQ0FBQztZQUVsRCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksU0FBUyxFQUFFO2dCQUNoQyxPQUFPLENBQUMsS0FBSyxDQUFDLHdDQUF3QyxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQTthQUMxRTtZQUNELElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDO1lBRTNCLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUzQyxDQUFDO1FBRU8sMENBQWUsR0FBdkIsVUFBd0IsTUFBZSxFQUFFLElBQXFCO1lBQzFELElBQUksSUFBSSxFQUFFO2dCQUNOLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDMUI7UUFDTCxDQUFDO1FBRU8sK0NBQW9CLEdBQTVCLFVBQTZCLE1BQWU7WUFDeEMsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNYLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ2xDO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNILHVDQUFZLEdBQVosVUFBYSxNQUF5QjtZQUNsQyxJQUFHLE1BQU0sSUFBSSxTQUFTLEVBQUM7Z0JBQ25CLE9BQU87YUFDVjtZQUNELEtBQUssSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDM0IsMkVBQTJFO2dCQUMzRSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUNuQyxJQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssTUFBTSxFQUFDO3dCQUM3QixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7NEJBQ1gsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDO3lCQUNyQzt3QkFDRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQzdCO2lCQUNKO2FBQ0o7UUFDTCxDQUFDO1FBR0wsdUJBQUM7SUFBRCxDQUFDLEFBbEVELENBQXdDLHVCQUFVLEdBa0VqRDtJQUVPLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFdpZGdldEJhc2UgfSBmcm9tICcuL3dpZGdldEJhc2UnO1xyXG5pbXBvcnQgeyBJTGF5b3V0V2lkZ2V0IH0gZnJvbSAnLi9pbnRlcmZhY2VzL2xheW91dFdpZGdldEludGVyZmFjZSc7XHJcbmltcG9ydCB7IElXaWRnZXQgfSBmcm9tICcuL2ludGVyZmFjZXMvd2lkZ2V0SW50ZXJmYWNlJztcclxuaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gJy4uLy4uL2ZyYW1ld29yay9ldmVudHMnO1xyXG5pbXBvcnQgeyBFdmVudFdpZGdldEFjdGl2YXRlZEFyZ3MgfSBmcm9tICcuL2V2ZW50V2lkZ2V0QWN0aXZhdGVkQXJncyc7XHJcbmltcG9ydCB7IElMYXlvdXRQYW5lIH0gZnJvbSAnLi4vc3BsaXR0ZXJXaWRnZXQvaW50ZXJmYWNlcy9sYXlvdXRQYW5lSW50ZXJmYWNlJztcclxuaW1wb3J0IHsgVmlld1R5cGUgfSBmcm9tICcuL3ZpZXdUeXBlUHJvdmlkZXInO1xyXG5pbXBvcnQgeyBVbmlxdWVJZEdlbmVyYXRvciB9IGZyb20gJy4vdW5pcXVlSWRHZW5lcmF0b3InO1xyXG5pbXBvcnQgeyBJVmlldyB9IGZyb20gJy4vaW50ZXJmYWNlcy92aWV3SW50ZXJmYWNlJztcclxuXHJcbmNsYXNzIEV2ZW50V2lkZ2V0QWN0aXZhdGVkIGV4dGVuZHMgVHlwZWRFdmVudDxudWxsLCBFdmVudFdpZGdldEFjdGl2YXRlZEFyZ3M+eyB9O1xyXG5cclxuYWJzdHJhY3QgY2xhc3MgTGF5b3V0V2lkZ2V0QmFzZSBleHRlbmRzIFdpZGdldEJhc2UgaW1wbGVtZW50cyBJTGF5b3V0V2lkZ2V0e1xyXG4gICAgXHJcbiAgICBldmVudFdpZGdldEFjdGl2YXRlZCA9IG5ldyBFdmVudFdpZGdldEFjdGl2YXRlZCgpO1xyXG5cclxuICAgIGxheW91dFBhbmVzITogSUxheW91dFBhbmVbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSB3aWRnZXQgdG8gdGhlIHdpZGdldHMgbGlzdCBvZiB0aGlzIGxheW91dCB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lXaWRnZXR9IHdpZGdldFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICAgICAqIEBwYXJhbSB7Vmlld1R5cGV9IHZpZXdUeXBlXHJcbiAgICAgKiBAcGFyYW0ge3t9fSBbZGF0YV1cclxuICAgICAqIEBtZW1iZXJvZiBMYXlvdXRXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIGFkZFdpZGdldCh3aWRnZXQ6IElXaWRnZXQsIG5hbWU6IHN0cmluZywgdmlld1R5cGU6IFZpZXdUeXBlLCBkYXRhPzoge30pIHtcclxuICAgICAgICBsZXQgaWQgPSBuYW1lICsgXCJfXCIrIHZpZXdUeXBlLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgaWQgPSBVbmlxdWVJZEdlbmVyYXRvci5nZXRJbnN0YW5jZSgpLmdldFVuaXF1ZUlkRnJvbVN0cmluZyhpZCk7XHJcbiAgICAgICAgaWQgPSBpZC5yZXBsYWNlKC9bJlxcL1xcXFwjLCsoKSR+JS4nXCI6Kj88Pnt9XS9nLCdfJyk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl93aWRnZXRzW2lkXSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImFkZFdpZGdldCAlcyA9PiBpZCAoJXMpIG11c3QgYmUgdW5pcXVlXCIsIG5hbWUsIHZpZXdUeXBlKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl93aWRnZXRzW2lkXSA9IHdpZGdldDtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRXaWRnZXRUb1ZpZXcod2lkZ2V0LHRoaXMudmlldyk7XHJcblxyXG4gICAgfSAgICBcclxuXHJcbiAgICBwcml2YXRlIGFkZFdpZGdldFRvVmlldyh3aWRnZXQ6IElXaWRnZXQsIHZpZXc6IElWaWV3fHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGlmICh2aWV3KSB7XHJcbiAgICAgICAgICAgIHZpZXcuYWRkV2lkZ2V0KHdpZGdldCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVtb3ZlV2lkZ2V0RnJvbVZpZXcod2lkZ2V0OiBJV2lkZ2V0KSB7XHJcbiAgICAgICAgaWYgKHRoaXMudmlldykge1xyXG4gICAgICAgICAgICB0aGlzLnZpZXcucmVtb3ZlV2lkZ2V0KHdpZGdldCk7ICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIGEgd2lkZ2V0IGZyb20gdGhlIHdpZGdldHMgbGlzdCBvZiB0aGlzIGxheW91dCB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyhJV2lkZ2V0fHVuZGVmaW5lZCl9IHdpZGdldFxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBMYXlvdXRXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZVdpZGdldCh3aWRnZXQ6IElXaWRnZXR8dW5kZWZpbmVkKXtcclxuICAgICAgICBpZih3aWRnZXQgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5fd2lkZ2V0cykge1xyXG4gICAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgcHJvcGVydHkva2V5IGlzIGRlZmluZWQgaW4gdGhlIG9iamVjdCBpdHNlbGYsIG5vdCBpbiBwYXJlbnRcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3dpZGdldHMuaGFzT3duUHJvcGVydHkoa2V5KSkgeyAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLl93aWRnZXRzW2tleV0gPT09IHdpZGdldCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudmlldykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVdpZGdldEZyb21WaWV3KHdpZGdldCk7ICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl93aWRnZXRzW2tleV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG5cclxuZXhwb3J0IHtMYXlvdXRXaWRnZXRCYXNlfTsiXX0=