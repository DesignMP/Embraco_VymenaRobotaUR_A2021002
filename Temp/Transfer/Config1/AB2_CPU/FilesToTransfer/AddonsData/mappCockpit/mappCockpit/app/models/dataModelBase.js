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
define(["require", "exports", "./dataModelInterface"], function (require, exports, dataModelInterface_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * implements the base interface for observing data model items
     *
     * @class DataModelItemObserver
     * @implements {IDataModelItemObserver}
     */
    var DataModelItemObserver = /** @class */ (function () {
        function DataModelItemObserver() {
            // declare event for notifying model item changes
            this.eventModelItemsChanged = new dataModelInterface_1.EventModelChanged();
        }
        /**
         * method for invoking the observation of model items
         *
         * @param {any[]} observableItems
         * @memberof DataModelItemObserver
         */
        DataModelItemObserver.prototype.observeModelItems = function (observableItems) {
            // has to be overloaded in a concretized data model
            throw new Error("Method not implemented.");
        };
        /**
         * notification method called when model items has changed
         *
         * @param {IDataModel} sender
         * @param {EventModelChangedArgs} data
         * @memberof DataModelItemObserver
         */
        DataModelItemObserver.prototype.onModelItemsChanged = function (sender, data) {
            // raise the model items changed event
            this.eventModelItemsChanged.raise(sender, data);
        };
        /**
         * method for handling model item changes
         *
         * @param {IDataModel} sender
         * @param {EventModelChangedArgs} data
         * @memberof DataModelItemObserver
         */
        DataModelItemObserver.prototype.handleModelItemsChanged = function (sender, data) {
        };
        return DataModelItemObserver;
    }());
    exports.DataModelItemObserver = DataModelItemObserver;
    /**
     * implements the base class for data models.
     *
     * @abstract
     * @class DataModelBase
     * @implements {IDataModel}
     */
    var DataModelBase = /** @class */ (function (_super) {
        __extends(DataModelBase, _super);
        function DataModelBase() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // event declarations
            _this.eventModelChanged = new dataModelInterface_1.EventModelChanged();
            _this.eventModelInitialized = new dataModelInterface_1.EventModelInitialized();
            return _this;
        }
        DataModelBase.prototype.connect = function (componentName) {
        };
        DataModelBase.prototype.initialize = function () {
        };
        DataModelBase.prototype.dispose = function () {
        };
        Object.defineProperty(DataModelBase.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (data) {
                this._data = data;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataModelBase.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function (dataSource) {
                this._dataSource = dataSource;
            },
            enumerable: true,
            configurable: true
        });
        DataModelBase.prototype.onModelChanged = function (sender, data) {
            this.eventModelChanged.raise(sender, data);
        };
        DataModelBase.prototype.onModelInitialized = function (sender, data) {
            this.eventModelInitialized.raise(sender, data);
        };
        DataModelBase.prototype.handleModelChanged = function (sender, data) { };
        return DataModelBase;
    }(DataModelItemObserver));
    exports.DataModelBase = DataModelBase;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YU1vZGVsQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2RhdGFNb2RlbEJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUVBOzs7OztPQUtHO0lBQ0g7UUFBQTtZQUVJLGlEQUFpRDtZQUNqRCwyQkFBc0IsR0FBMkIsSUFBSSxzQ0FBaUIsRUFBRSxDQUFDO1FBbUM3RSxDQUFDO1FBakNHOzs7OztXQUtHO1FBQ0gsaURBQWlCLEdBQWpCLFVBQWtCLGVBQXNCO1lBQ3BDLG1EQUFtRDtZQUNuRCxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDL0MsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNILG1EQUFtQixHQUFuQixVQUFvQixNQUFrQixFQUFFLElBQTJCO1lBQy9ELHNDQUFzQztZQUN0QyxJQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwRCxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0gsdURBQXVCLEdBQXZCLFVBQXdCLE1BQWtCLEVBQUUsSUFBMkI7UUFFdkUsQ0FBQztRQUNMLDRCQUFDO0lBQUQsQ0FBQyxBQXRDRCxJQXNDQztJQTZEdUIsc0RBQXFCO0lBMUQ3Qzs7Ozs7O09BTUc7SUFDSDtRQUF1QyxpQ0FBcUI7UUFBNUQ7WUFBQSxxRUFpREM7WUE5Q0cscUJBQXFCO1lBQ3JCLHVCQUFpQixHQUFzQixJQUFJLHNDQUFpQixFQUFFLENBQUM7WUFDL0QsMkJBQXFCLEdBQTBCLElBQUksMENBQXFCLEVBQUUsQ0FBQzs7UUE0Qy9FLENBQUM7UUExQ0csK0JBQU8sR0FBUCxVQUFRLGFBQXFCO1FBRTdCLENBQUM7UUFJRCxrQ0FBVSxHQUFWO1FBRUEsQ0FBQztRQUVELCtCQUFPLEdBQVA7UUFFQSxDQUFDO1FBRUQsc0JBQUksK0JBQUk7aUJBQVI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3RCLENBQUM7aUJBRUQsVUFBUyxJQUFJO2dCQUNULElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLENBQUM7OztXQUpBO1FBT0Qsc0JBQUkscUNBQVU7aUJBQWQ7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQzVCLENBQUM7aUJBRUQsVUFBZSxVQUFVO2dCQUNyQixJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztZQUNsQyxDQUFDOzs7V0FKQTtRQU1ELHNDQUFjLEdBQWQsVUFBZSxNQUFrQixFQUFFLElBQTJCO1lBQzFELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQy9DLENBQUM7UUFHRCwwQ0FBa0IsR0FBbEIsVUFBbUIsTUFBa0IsRUFBRSxJQUFTO1lBQzVDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25ELENBQUM7UUFFRCwwQ0FBa0IsR0FBbEIsVUFBbUIsTUFBa0IsRUFBRSxJQUEyQixJQUFJLENBQUM7UUFFM0Usb0JBQUM7SUFBRCxDQUFDLEFBakRELENBQXVDLHFCQUFxQixHQWlEM0Q7SUFFUSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElEYXRhTW9kZWwsIEV2ZW50TW9kZWxDaGFuZ2VkLCBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MsIEV2ZW50TW9kZWxJbml0aWFsaXplZCwgSURhdGFNb2RlbEl0ZW1PYnNlcnZlciwgRXZlbnRNb2RlbEl0ZW1zQ2hhbmdlZCB9IGZyb20gXCIuL2RhdGFNb2RlbEludGVyZmFjZVwiO1xyXG5cclxuLyoqXHJcbiAqIGltcGxlbWVudHMgdGhlIGJhc2UgaW50ZXJmYWNlIGZvciBvYnNlcnZpbmcgZGF0YSBtb2RlbCBpdGVtc1xyXG4gKlxyXG4gKiBAY2xhc3MgRGF0YU1vZGVsSXRlbU9ic2VydmVyXHJcbiAqIEBpbXBsZW1lbnRzIHtJRGF0YU1vZGVsSXRlbU9ic2VydmVyfVxyXG4gKi9cclxuYWJzdHJhY3QgY2xhc3MgRGF0YU1vZGVsSXRlbU9ic2VydmVyIGltcGxlbWVudHMgSURhdGFNb2RlbEl0ZW1PYnNlcnZlciB7XHJcblxyXG4gICAgLy8gZGVjbGFyZSBldmVudCBmb3Igbm90aWZ5aW5nIG1vZGVsIGl0ZW0gY2hhbmdlc1xyXG4gICAgZXZlbnRNb2RlbEl0ZW1zQ2hhbmdlZDogRXZlbnRNb2RlbEl0ZW1zQ2hhbmdlZCA9IG5ldyBFdmVudE1vZGVsQ2hhbmdlZCgpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogbWV0aG9kIGZvciBpbnZva2luZyB0aGUgb2JzZXJ2YXRpb24gb2YgbW9kZWwgaXRlbXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge2FueVtdfSBvYnNlcnZhYmxlSXRlbXNcclxuICAgICAqIEBtZW1iZXJvZiBEYXRhTW9kZWxJdGVtT2JzZXJ2ZXJcclxuICAgICAqL1xyXG4gICAgb2JzZXJ2ZU1vZGVsSXRlbXMob2JzZXJ2YWJsZUl0ZW1zOiBhbnlbXSkge1xyXG4gICAgICAgIC8vIGhhcyB0byBiZSBvdmVybG9hZGVkIGluIGEgY29uY3JldGl6ZWQgZGF0YSBtb2RlbFxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1ldGhvZCBub3QgaW1wbGVtZW50ZWQuXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbm90aWZpY2F0aW9uIG1ldGhvZCBjYWxsZWQgd2hlbiBtb2RlbCBpdGVtcyBoYXMgY2hhbmdlZFxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge0lEYXRhTW9kZWx9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHtFdmVudE1vZGVsQ2hhbmdlZEFyZ3N9IGRhdGFcclxuICAgICAqIEBtZW1iZXJvZiBEYXRhTW9kZWxJdGVtT2JzZXJ2ZXJcclxuICAgICAqL1xyXG4gICAgb25Nb2RlbEl0ZW1zQ2hhbmdlZChzZW5kZXI6IElEYXRhTW9kZWwsIGRhdGE6IEV2ZW50TW9kZWxDaGFuZ2VkQXJncykge1xyXG4gICAgICAgIC8vIHJhaXNlIHRoZSBtb2RlbCBpdGVtcyBjaGFuZ2VkIGV2ZW50XHJcbiAgICAgICAgdGhpcy5ldmVudE1vZGVsSXRlbXNDaGFuZ2VkLnJhaXNlKHNlbmRlciwgZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBtZXRob2QgZm9yIGhhbmRsaW5nIG1vZGVsIGl0ZW0gY2hhbmdlc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SURhdGFNb2RlbH0gc2VuZGVyXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50TW9kZWxDaGFuZ2VkQXJnc30gZGF0YVxyXG4gICAgICogQG1lbWJlcm9mIERhdGFNb2RlbEl0ZW1PYnNlcnZlclxyXG4gICAgICovXHJcbiAgICBoYW5kbGVNb2RlbEl0ZW1zQ2hhbmdlZChzZW5kZXI6IElEYXRhTW9kZWwsIGRhdGE6IEV2ZW50TW9kZWxDaGFuZ2VkQXJncykge1xyXG4gXHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogaW1wbGVtZW50cyB0aGUgYmFzZSBjbGFzcyBmb3IgZGF0YSBtb2RlbHMuXHJcbiAqXHJcbiAqIEBhYnN0cmFjdFxyXG4gKiBAY2xhc3MgRGF0YU1vZGVsQmFzZVxyXG4gKiBAaW1wbGVtZW50cyB7SURhdGFNb2RlbH1cclxuICovXHJcbmFic3RyYWN0IGNsYXNzIERhdGFNb2RlbEJhc2UgIGV4dGVuZHMgIERhdGFNb2RlbEl0ZW1PYnNlcnZlciBpbXBsZW1lbnRzIElEYXRhTW9kZWwge1xyXG5cclxuXHJcbiAgICAvLyBldmVudCBkZWNsYXJhdGlvbnNcclxuICAgIGV2ZW50TW9kZWxDaGFuZ2VkOiBFdmVudE1vZGVsQ2hhbmdlZCA9IG5ldyBFdmVudE1vZGVsQ2hhbmdlZCgpO1xyXG4gICAgZXZlbnRNb2RlbEluaXRpYWxpemVkOiBFdmVudE1vZGVsSW5pdGlhbGl6ZWQgPSBuZXcgRXZlbnRNb2RlbEluaXRpYWxpemVkKCk7XHJcblxyXG4gICAgY29ubmVjdChjb21wb25lbnROYW1lOiBzdHJpbmcpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIF9kYXRhOiBhbnk7XHJcbiAgICBwcm90ZWN0ZWQgX2RhdGFTb3VyY2U6IGFueTtcclxuICAgIGluaXRpYWxpemUoKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGRpc3Bvc2UoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldCBkYXRhKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBkYXRhKGRhdGEpIHtcclxuICAgICAgICB0aGlzLl9kYXRhID0gZGF0YTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgZ2V0IGRhdGFTb3VyY2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFTb3VyY2U7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGRhdGFTb3VyY2UoZGF0YVNvdXJjZSkge1xyXG4gICAgICAgIHRoaXMuX2RhdGFTb3VyY2UgPSBkYXRhU291cmNlO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTW9kZWxDaGFuZ2VkKHNlbmRlcjogSURhdGFNb2RlbCwgZGF0YTogRXZlbnRNb2RlbENoYW5nZWRBcmdzKSB7XHJcbiAgICAgICAgdGhpcy5ldmVudE1vZGVsQ2hhbmdlZC5yYWlzZShzZW5kZXIsIGRhdGEpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBvbk1vZGVsSW5pdGlhbGl6ZWQoc2VuZGVyOiBJRGF0YU1vZGVsLCBkYXRhOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmV2ZW50TW9kZWxJbml0aWFsaXplZC5yYWlzZShzZW5kZXIsIGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZU1vZGVsQ2hhbmdlZChzZW5kZXI6IElEYXRhTW9kZWwsIGRhdGE6IEV2ZW50TW9kZWxDaGFuZ2VkQXJncykgeyB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgeyBEYXRhTW9kZWxCYXNlLCBEYXRhTW9kZWxJdGVtT2JzZXJ2ZXIgfTtcclxuIl19