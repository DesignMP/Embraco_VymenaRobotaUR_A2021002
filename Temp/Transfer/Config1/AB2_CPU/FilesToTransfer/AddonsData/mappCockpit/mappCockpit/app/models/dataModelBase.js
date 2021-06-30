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
            _this._isPersistEnabled = false;
            return _this;
        }
        DataModelBase.prototype.connect = function (componentName) {
        };
        DataModelBase.prototype.initialize = function () {
            this.component.loadComponentSettings();
            var settings = this.component.getComponentSettings();
            if (settings != undefined) {
                this.setComponentSettings(settings);
            }
            this.initialized();
            this._isPersistEnabled = true;
        };
        DataModelBase.prototype.getDefaultComponentSettings = function () {
            return undefined;
        };
        DataModelBase.prototype.initializeComponent = function () {
        };
        DataModelBase.prototype.initialized = function () {
        };
        DataModelBase.prototype.clear = function () {
        };
        DataModelBase.prototype.dispose = function () {
            this._isPersistEnabled = false;
        };
        DataModelBase.prototype.getComponentSettings = function (onlyModified) {
            return this.component.getComponentSettings(onlyModified);
        };
        DataModelBase.prototype.setComponentSettings = function (componentSettings) {
            this.component.setComponentSettings(componentSettings);
        };
        DataModelBase.prototype.saveSettings = function () {
            if (this._isPersistEnabled) {
                this.component.saveComponentSettings();
            }
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
            this.saveSettings();
        };
        DataModelBase.prototype.onModelInitialized = function (sender, data) {
            this.eventModelInitialized.raise(sender, data);
        };
        DataModelBase.prototype.handleModelChanged = function (sender, data) { };
        return DataModelBase;
    }(DataModelItemObserver));
    exports.DataModelBase = DataModelBase;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YU1vZGVsQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2RhdGFNb2RlbEJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUlBOzs7OztPQUtHO0lBQ0g7UUFBQTtZQUVJLGlEQUFpRDtZQUNqRCwyQkFBc0IsR0FBMkIsSUFBSSxzQ0FBaUIsRUFBRSxDQUFDO1FBbUM3RSxDQUFDO1FBakNHOzs7OztXQUtHO1FBQ0gsaURBQWlCLEdBQWpCLFVBQWtCLGVBQXNCO1lBQ3BDLG1EQUFtRDtZQUNuRCxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDL0MsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNILG1EQUFtQixHQUFuQixVQUFvQixNQUFrQixFQUFFLElBQTJCO1lBQy9ELHNDQUFzQztZQUN0QyxJQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwRCxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0gsdURBQXVCLEdBQXZCLFVBQXdCLE1BQWtCLEVBQUUsSUFBMkI7UUFFdkUsQ0FBQztRQUNMLDRCQUFDO0lBQUQsQ0FBQyxBQXRDRCxJQXNDQztJQW9HdUIsc0RBQXFCO0lBakc3Qzs7Ozs7O09BTUc7SUFDSDtRQUFxQyxpQ0FBcUI7UUFBMUQ7WUFBQSxxRUF3RkM7WUF0RkcscUJBQXFCO1lBQ3JCLHVCQUFpQixHQUFzQixJQUFJLHNDQUFpQixFQUFFLENBQUM7WUFDL0QsMkJBQXFCLEdBQTBCLElBQUksMENBQXFCLEVBQUUsQ0FBQztZQUdqRSx1QkFBaUIsR0FBWSxLQUFLLENBQUM7O1FBaUZqRCxDQUFDO1FBL0VHLCtCQUFPLEdBQVAsVUFBUSxhQUFxQjtRQUU3QixDQUFDO1FBS0Qsa0NBQVUsR0FBVjtZQUNJLElBQUksQ0FBQyxTQUFTLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUN2QyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLG9CQUFvQixFQUFFLENBQUM7WUFDckQsSUFBRyxRQUFRLElBQUksU0FBUyxFQUFDO2dCQUNyQixJQUFJLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDdkM7WUFDRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztRQUNsQyxDQUFDO1FBRUQsbURBQTJCLEdBQTNCO1lBQ0ksT0FBTyxTQUFTLENBQUM7UUFDckIsQ0FBQztRQUVELDJDQUFtQixHQUFuQjtRQUVBLENBQUM7UUFFRCxtQ0FBVyxHQUFYO1FBRUEsQ0FBQztRQUVELDZCQUFLLEdBQUw7UUFFQSxDQUFDO1FBRUQsK0JBQU8sR0FBUDtZQUNJLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFDbkMsQ0FBQztRQUVELDRDQUFvQixHQUFwQixVQUFxQixZQUFxQjtZQUN0QyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDN0QsQ0FBQztRQUVELDRDQUFvQixHQUFwQixVQUFxQixpQkFBb0M7WUFDckQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQzNELENBQUM7UUFFUyxvQ0FBWSxHQUF0QjtZQUNJLElBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFDO2dCQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLHFCQUFxQixFQUFFLENBQUM7YUFDMUM7UUFDTCxDQUFDO1FBRUQsc0JBQUksK0JBQUk7aUJBQVI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3RCLENBQUM7aUJBRUQsVUFBUyxJQUFJO2dCQUNULElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLENBQUM7OztXQUpBO1FBT0Qsc0JBQUkscUNBQVU7aUJBQWQ7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQzVCLENBQUM7aUJBRUQsVUFBZSxVQUFVO2dCQUNyQixJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztZQUNsQyxDQUFDOzs7V0FKQTtRQU1ELHNDQUFjLEdBQWQsVUFBZSxNQUFrQixFQUFFLElBQTJCO1lBQzFELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzNDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4QixDQUFDO1FBRUQsMENBQWtCLEdBQWxCLFVBQW1CLE1BQWtCLEVBQUUsSUFBUztZQUM1QyxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuRCxDQUFDO1FBRUQsMENBQWtCLEdBQWxCLFVBQW1CLE1BQWtCLEVBQUUsSUFBMkIsSUFBSSxDQUFDO1FBRTNFLG9CQUFDO0lBQUQsQ0FBQyxBQXhGRCxDQUFxQyxxQkFBcUIsR0F3RnpEO0lBRVEsc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJRGF0YU1vZGVsLCBFdmVudE1vZGVsQ2hhbmdlZCwgRXZlbnRNb2RlbENoYW5nZWRBcmdzLCBFdmVudE1vZGVsSW5pdGlhbGl6ZWQsIElEYXRhTW9kZWxJdGVtT2JzZXJ2ZXIsIEV2ZW50TW9kZWxJdGVtc0NoYW5nZWQgfSBmcm9tIFwiLi9kYXRhTW9kZWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50QmFzZSB9IGZyb20gXCIuLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnRCYXNlXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcblxyXG4vKipcclxuICogaW1wbGVtZW50cyB0aGUgYmFzZSBpbnRlcmZhY2UgZm9yIG9ic2VydmluZyBkYXRhIG1vZGVsIGl0ZW1zXHJcbiAqXHJcbiAqIEBjbGFzcyBEYXRhTW9kZWxJdGVtT2JzZXJ2ZXJcclxuICogQGltcGxlbWVudHMge0lEYXRhTW9kZWxJdGVtT2JzZXJ2ZXJ9XHJcbiAqL1xyXG5hYnN0cmFjdCBjbGFzcyBEYXRhTW9kZWxJdGVtT2JzZXJ2ZXIgaW1wbGVtZW50cyBJRGF0YU1vZGVsSXRlbU9ic2VydmVyIHtcclxuXHJcbiAgICAvLyBkZWNsYXJlIGV2ZW50IGZvciBub3RpZnlpbmcgbW9kZWwgaXRlbSBjaGFuZ2VzXHJcbiAgICBldmVudE1vZGVsSXRlbXNDaGFuZ2VkOiBFdmVudE1vZGVsSXRlbXNDaGFuZ2VkID0gbmV3IEV2ZW50TW9kZWxDaGFuZ2VkKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBtZXRob2QgZm9yIGludm9raW5nIHRoZSBvYnNlcnZhdGlvbiBvZiBtb2RlbCBpdGVtc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7YW55W119IG9ic2VydmFibGVJdGVtc1xyXG4gICAgICogQG1lbWJlcm9mIERhdGFNb2RlbEl0ZW1PYnNlcnZlclxyXG4gICAgICovXHJcbiAgICBvYnNlcnZlTW9kZWxJdGVtcyhvYnNlcnZhYmxlSXRlbXM6IGFueVtdKSB7XHJcbiAgICAgICAgLy8gaGFzIHRvIGJlIG92ZXJsb2FkZWQgaW4gYSBjb25jcmV0aXplZCBkYXRhIG1vZGVsXHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWV0aG9kIG5vdCBpbXBsZW1lbnRlZC5cIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBub3RpZmljYXRpb24gbWV0aG9kIGNhbGxlZCB3aGVuIG1vZGVsIGl0ZW1zIGhhcyBjaGFuZ2VkXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7SURhdGFNb2RlbH0gc2VuZGVyXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50TW9kZWxDaGFuZ2VkQXJnc30gZGF0YVxyXG4gICAgICogQG1lbWJlcm9mIERhdGFNb2RlbEl0ZW1PYnNlcnZlclxyXG4gICAgICovXHJcbiAgICBvbk1vZGVsSXRlbXNDaGFuZ2VkKHNlbmRlcjogSURhdGFNb2RlbCwgZGF0YTogRXZlbnRNb2RlbENoYW5nZWRBcmdzKSB7XHJcbiAgICAgICAgLy8gcmFpc2UgdGhlIG1vZGVsIGl0ZW1zIGNoYW5nZWQgZXZlbnRcclxuICAgICAgICB0aGlzLmV2ZW50TW9kZWxJdGVtc0NoYW5nZWQucmFpc2Uoc2VuZGVyLCBkYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIG1ldGhvZCBmb3IgaGFuZGxpbmcgbW9kZWwgaXRlbSBjaGFuZ2VzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJRGF0YU1vZGVsfSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7RXZlbnRNb2RlbENoYW5nZWRBcmdzfSBkYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgRGF0YU1vZGVsSXRlbU9ic2VydmVyXHJcbiAgICAgKi9cclxuICAgIGhhbmRsZU1vZGVsSXRlbXNDaGFuZ2VkKHNlbmRlcjogSURhdGFNb2RlbCwgZGF0YTogRXZlbnRNb2RlbENoYW5nZWRBcmdzKSB7XHJcbiBcclxuICAgIH1cclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBpbXBsZW1lbnRzIHRoZSBiYXNlIGNsYXNzIGZvciBkYXRhIG1vZGVscy5cclxuICpcclxuICogQGFic3RyYWN0XHJcbiAqIEBjbGFzcyBEYXRhTW9kZWxCYXNlXHJcbiAqIEBpbXBsZW1lbnRzIHtJRGF0YU1vZGVsfVxyXG4gKi9cclxuYWJzdHJhY3QgY2xhc3MgRGF0YU1vZGVsQmFzZSBleHRlbmRzIERhdGFNb2RlbEl0ZW1PYnNlcnZlciBpbXBsZW1lbnRzIElEYXRhTW9kZWwge1xyXG4gICAgXHJcbiAgICAvLyBldmVudCBkZWNsYXJhdGlvbnNcclxuICAgIGV2ZW50TW9kZWxDaGFuZ2VkOiBFdmVudE1vZGVsQ2hhbmdlZCA9IG5ldyBFdmVudE1vZGVsQ2hhbmdlZCgpO1xyXG4gICAgZXZlbnRNb2RlbEluaXRpYWxpemVkOiBFdmVudE1vZGVsSW5pdGlhbGl6ZWQgPSBuZXcgRXZlbnRNb2RlbEluaXRpYWxpemVkKCk7XHJcblxyXG4gICAgcHVibGljIGNvbXBvbmVudCE6IENvbXBvbmVudEJhc2U7XHJcbiAgICBwcm90ZWN0ZWQgX2lzUGVyc2lzdEVuYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBjb25uZWN0KGNvbXBvbmVudE5hbWU6IHN0cmluZyk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgX2RhdGE6IGFueTtcclxuICAgIHByb3RlY3RlZCBfZGF0YVNvdXJjZTogYW55O1xyXG5cclxuICAgIGluaXRpYWxpemUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQubG9hZENvbXBvbmVudFNldHRpbmdzKCk7XHJcbiAgICAgICAgbGV0IHNldHRpbmdzID0gdGhpcy5jb21wb25lbnQuZ2V0Q29tcG9uZW50U2V0dGluZ3MoKTtcclxuICAgICAgICBpZihzZXR0aW5ncyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLnNldENvbXBvbmVudFNldHRpbmdzKHNldHRpbmdzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pbml0aWFsaXplZCgpO1xyXG4gICAgICAgIHRoaXMuX2lzUGVyc2lzdEVuYWJsZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgZ2V0RGVmYXVsdENvbXBvbmVudFNldHRpbmdzKCk6IENvbXBvbmVudFNldHRpbmdzfHVuZGVmaW5lZHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRpYWxpemVDb21wb25lbnQoKXtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBpbml0aWFsaXplZCgpe1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyKCl7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZGlzcG9zZSgpIHtcclxuICAgICAgICB0aGlzLl9pc1BlcnNpc3RFbmFibGVkID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q29tcG9uZW50U2V0dGluZ3Mob25seU1vZGlmaWVkOiBib29sZWFuKTogQ29tcG9uZW50U2V0dGluZ3Mge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbXBvbmVudC5nZXRDb21wb25lbnRTZXR0aW5ncyhvbmx5TW9kaWZpZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldENvbXBvbmVudFNldHRpbmdzKGNvbXBvbmVudFNldHRpbmdzOiBDb21wb25lbnRTZXR0aW5ncykge1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LnNldENvbXBvbmVudFNldHRpbmdzKGNvbXBvbmVudFNldHRpbmdzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgc2F2ZVNldHRpbmdzKCl7XHJcbiAgICAgICAgaWYodGhpcy5faXNQZXJzaXN0RW5hYmxlZCl7XHJcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LnNhdmVDb21wb25lbnRTZXR0aW5ncygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXQgZGF0YSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgZGF0YShkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IGRhdGE7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGdldCBkYXRhU291cmNlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhU291cmNlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBkYXRhU291cmNlKGRhdGFTb3VyY2UpIHtcclxuICAgICAgICB0aGlzLl9kYXRhU291cmNlID0gZGF0YVNvdXJjZTtcclxuICAgIH1cclxuXHJcbiAgICBvbk1vZGVsQ2hhbmdlZChzZW5kZXI6IElEYXRhTW9kZWwsIGRhdGE6IEV2ZW50TW9kZWxDaGFuZ2VkQXJncykge1xyXG4gICAgICAgIHRoaXMuZXZlbnRNb2RlbENoYW5nZWQucmFpc2Uoc2VuZGVyLCBkYXRhKTtcclxuICAgICAgICB0aGlzLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTW9kZWxJbml0aWFsaXplZChzZW5kZXI6IElEYXRhTW9kZWwsIGRhdGE6IGFueSkge1xyXG4gICAgICAgIHRoaXMuZXZlbnRNb2RlbEluaXRpYWxpemVkLnJhaXNlKHNlbmRlciwgZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlTW9kZWxDaGFuZ2VkKHNlbmRlcjogSURhdGFNb2RlbCwgZGF0YTogRXZlbnRNb2RlbENoYW5nZWRBcmdzKSB7IH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCB7IERhdGFNb2RlbEJhc2UsIERhdGFNb2RlbEl0ZW1PYnNlcnZlciB9O1xyXG4iXX0=