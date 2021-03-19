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
define(["require", "exports", "./dataModelInterface", "../common/componentBase/componentBase"], function (require, exports, dataModelInterface_1, componentBase_1) {
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
            _this.component = new componentBase_1.ComponentBase(undefined, _this);
            return _this;
        }
        DataModelBase.prototype.connect = function (componentName) {
        };
        DataModelBase.prototype.initialize = function () {
            this.initializeComponent();
            this.component.loadComponentSettings();
        };
        DataModelBase.prototype.initializeComponent = function () {
        };
        DataModelBase.prototype.clear = function () {
        };
        DataModelBase.prototype.dispose = function () {
            this.component.saveComponentSettings();
        };
        DataModelBase.prototype.getComponentSettings = function () {
            return this.component.getComponentSettings();
        };
        DataModelBase.prototype.setComponentSettings = function (componentSettings) {
            this.component.setComponentSettings(componentSettings);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YU1vZGVsQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2RhdGFNb2RlbEJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUlBOzs7OztPQUtHO0lBQ0g7UUFBQTtZQUVJLGlEQUFpRDtZQUNqRCwyQkFBc0IsR0FBMkIsSUFBSSxzQ0FBaUIsRUFBRSxDQUFDO1FBbUM3RSxDQUFDO1FBakNHOzs7OztXQUtHO1FBQ0gsaURBQWlCLEdBQWpCLFVBQWtCLGVBQXNCO1lBQ3BDLG1EQUFtRDtZQUNuRCxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDL0MsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNILG1EQUFtQixHQUFuQixVQUFvQixNQUFrQixFQUFFLElBQTJCO1lBQy9ELHNDQUFzQztZQUN0QyxJQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwRCxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0gsdURBQXVCLEdBQXZCLFVBQXdCLE1BQWtCLEVBQUUsSUFBMkI7UUFFdkUsQ0FBQztRQUNMLDRCQUFDO0lBQUQsQ0FBQyxBQXRDRCxJQXNDQztJQStFdUIsc0RBQXFCO0lBNUU3Qzs7Ozs7O09BTUc7SUFDSDtRQUFxQyxpQ0FBcUI7UUFBMUQ7WUFBQSxxRUFtRUM7WUFqRUcscUJBQXFCO1lBQ3JCLHVCQUFpQixHQUFzQixJQUFJLHNDQUFpQixFQUFFLENBQUM7WUFDL0QsMkJBQXFCLEdBQTBCLElBQUksMENBQXFCLEVBQUUsQ0FBQztZQUVwRSxlQUFTLEdBQWtCLElBQUksNkJBQWEsQ0FBQyxTQUFTLEVBQUUsS0FBSSxDQUFDLENBQUM7O1FBNkR6RSxDQUFDO1FBM0RHLCtCQUFPLEdBQVAsVUFBUSxhQUFxQjtRQUU3QixDQUFDO1FBSUQsa0NBQVUsR0FBVjtZQUNJLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1lBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUMzQyxDQUFDO1FBRUQsMkNBQW1CLEdBQW5CO1FBRUEsQ0FBQztRQUVELDZCQUFLLEdBQUw7UUFFQSxDQUFDO1FBRUQsK0JBQU8sR0FBUDtZQUNJLElBQUksQ0FBQyxTQUFTLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUMzQyxDQUFDO1FBRUQsNENBQW9CLEdBQXBCO1lBQ0ksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDakQsQ0FBQztRQUVELDRDQUFvQixHQUFwQixVQUFxQixpQkFBb0M7WUFDckQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQzNELENBQUM7UUFFRCxzQkFBSSwrQkFBSTtpQkFBUjtnQkFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDdEIsQ0FBQztpQkFFRCxVQUFTLElBQUk7Z0JBQ1QsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDdEIsQ0FBQzs7O1dBSkE7UUFPRCxzQkFBSSxxQ0FBVTtpQkFBZDtnQkFDSSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7WUFDNUIsQ0FBQztpQkFFRCxVQUFlLFVBQVU7Z0JBQ3JCLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO1lBQ2xDLENBQUM7OztXQUpBO1FBTUQsc0NBQWMsR0FBZCxVQUFlLE1BQWtCLEVBQUUsSUFBMkI7WUFDMUQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0MsQ0FBQztRQUdELDBDQUFrQixHQUFsQixVQUFtQixNQUFrQixFQUFFLElBQVM7WUFDNUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkQsQ0FBQztRQUVELDBDQUFrQixHQUFsQixVQUFtQixNQUFrQixFQUFFLElBQTJCLElBQUksQ0FBQztRQUUzRSxvQkFBQztJQUFELENBQUMsQUFuRUQsQ0FBcUMscUJBQXFCLEdBbUV6RDtJQUVRLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSURhdGFNb2RlbCwgRXZlbnRNb2RlbENoYW5nZWQsIEV2ZW50TW9kZWxDaGFuZ2VkQXJncywgRXZlbnRNb2RlbEluaXRpYWxpemVkLCBJRGF0YU1vZGVsSXRlbU9ic2VydmVyLCBFdmVudE1vZGVsSXRlbXNDaGFuZ2VkIH0gZnJvbSBcIi4vZGF0YU1vZGVsSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50QmFzZVwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnRTZXR0aW5nc1wiO1xyXG5cclxuLyoqXHJcbiAqIGltcGxlbWVudHMgdGhlIGJhc2UgaW50ZXJmYWNlIGZvciBvYnNlcnZpbmcgZGF0YSBtb2RlbCBpdGVtc1xyXG4gKlxyXG4gKiBAY2xhc3MgRGF0YU1vZGVsSXRlbU9ic2VydmVyXHJcbiAqIEBpbXBsZW1lbnRzIHtJRGF0YU1vZGVsSXRlbU9ic2VydmVyfVxyXG4gKi9cclxuYWJzdHJhY3QgY2xhc3MgRGF0YU1vZGVsSXRlbU9ic2VydmVyIGltcGxlbWVudHMgSURhdGFNb2RlbEl0ZW1PYnNlcnZlciB7XHJcblxyXG4gICAgLy8gZGVjbGFyZSBldmVudCBmb3Igbm90aWZ5aW5nIG1vZGVsIGl0ZW0gY2hhbmdlc1xyXG4gICAgZXZlbnRNb2RlbEl0ZW1zQ2hhbmdlZDogRXZlbnRNb2RlbEl0ZW1zQ2hhbmdlZCA9IG5ldyBFdmVudE1vZGVsQ2hhbmdlZCgpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogbWV0aG9kIGZvciBpbnZva2luZyB0aGUgb2JzZXJ2YXRpb24gb2YgbW9kZWwgaXRlbXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge2FueVtdfSBvYnNlcnZhYmxlSXRlbXNcclxuICAgICAqIEBtZW1iZXJvZiBEYXRhTW9kZWxJdGVtT2JzZXJ2ZXJcclxuICAgICAqL1xyXG4gICAgb2JzZXJ2ZU1vZGVsSXRlbXMob2JzZXJ2YWJsZUl0ZW1zOiBhbnlbXSkge1xyXG4gICAgICAgIC8vIGhhcyB0byBiZSBvdmVybG9hZGVkIGluIGEgY29uY3JldGl6ZWQgZGF0YSBtb2RlbFxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1ldGhvZCBub3QgaW1wbGVtZW50ZWQuXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbm90aWZpY2F0aW9uIG1ldGhvZCBjYWxsZWQgd2hlbiBtb2RlbCBpdGVtcyBoYXMgY2hhbmdlZFxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge0lEYXRhTW9kZWx9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHtFdmVudE1vZGVsQ2hhbmdlZEFyZ3N9IGRhdGFcclxuICAgICAqIEBtZW1iZXJvZiBEYXRhTW9kZWxJdGVtT2JzZXJ2ZXJcclxuICAgICAqL1xyXG4gICAgb25Nb2RlbEl0ZW1zQ2hhbmdlZChzZW5kZXI6IElEYXRhTW9kZWwsIGRhdGE6IEV2ZW50TW9kZWxDaGFuZ2VkQXJncykge1xyXG4gICAgICAgIC8vIHJhaXNlIHRoZSBtb2RlbCBpdGVtcyBjaGFuZ2VkIGV2ZW50XHJcbiAgICAgICAgdGhpcy5ldmVudE1vZGVsSXRlbXNDaGFuZ2VkLnJhaXNlKHNlbmRlciwgZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBtZXRob2QgZm9yIGhhbmRsaW5nIG1vZGVsIGl0ZW0gY2hhbmdlc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SURhdGFNb2RlbH0gc2VuZGVyXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50TW9kZWxDaGFuZ2VkQXJnc30gZGF0YVxyXG4gICAgICogQG1lbWJlcm9mIERhdGFNb2RlbEl0ZW1PYnNlcnZlclxyXG4gICAgICovXHJcbiAgICBoYW5kbGVNb2RlbEl0ZW1zQ2hhbmdlZChzZW5kZXI6IElEYXRhTW9kZWwsIGRhdGE6IEV2ZW50TW9kZWxDaGFuZ2VkQXJncykge1xyXG4gXHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogaW1wbGVtZW50cyB0aGUgYmFzZSBjbGFzcyBmb3IgZGF0YSBtb2RlbHMuXHJcbiAqXHJcbiAqIEBhYnN0cmFjdFxyXG4gKiBAY2xhc3MgRGF0YU1vZGVsQmFzZVxyXG4gKiBAaW1wbGVtZW50cyB7SURhdGFNb2RlbH1cclxuICovXHJcbmFic3RyYWN0IGNsYXNzIERhdGFNb2RlbEJhc2UgZXh0ZW5kcyBEYXRhTW9kZWxJdGVtT2JzZXJ2ZXIgaW1wbGVtZW50cyBJRGF0YU1vZGVsIHtcclxuICAgIFxyXG4gICAgLy8gZXZlbnQgZGVjbGFyYXRpb25zXHJcbiAgICBldmVudE1vZGVsQ2hhbmdlZDogRXZlbnRNb2RlbENoYW5nZWQgPSBuZXcgRXZlbnRNb2RlbENoYW5nZWQoKTtcclxuICAgIGV2ZW50TW9kZWxJbml0aWFsaXplZDogRXZlbnRNb2RlbEluaXRpYWxpemVkID0gbmV3IEV2ZW50TW9kZWxJbml0aWFsaXplZCgpO1xyXG5cclxuICAgIHB1YmxpYyBjb21wb25lbnQ6IENvbXBvbmVudEJhc2UgPSBuZXcgQ29tcG9uZW50QmFzZSh1bmRlZmluZWQsIHRoaXMpO1xyXG5cclxuICAgIGNvbm5lY3QoY29tcG9uZW50TmFtZTogc3RyaW5nKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBfZGF0YTogYW55O1xyXG4gICAgcHJvdGVjdGVkIF9kYXRhU291cmNlOiBhbnk7XHJcbiAgICBpbml0aWFsaXplKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZUNvbXBvbmVudCgpO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmxvYWRDb21wb25lbnRTZXR0aW5ncygpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRpYWxpemVDb21wb25lbnQoKXtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBjbGVhcigpe1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGRpc3Bvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuc2F2ZUNvbXBvbmVudFNldHRpbmdzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q29tcG9uZW50U2V0dGluZ3MoKTogQ29tcG9uZW50U2V0dGluZ3Mge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbXBvbmVudC5nZXRDb21wb25lbnRTZXR0aW5ncygpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldENvbXBvbmVudFNldHRpbmdzKGNvbXBvbmVudFNldHRpbmdzOiBDb21wb25lbnRTZXR0aW5ncykge1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LnNldENvbXBvbmVudFNldHRpbmdzKGNvbXBvbmVudFNldHRpbmdzKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZGF0YSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgZGF0YShkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IGRhdGE7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGdldCBkYXRhU291cmNlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhU291cmNlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBkYXRhU291cmNlKGRhdGFTb3VyY2UpIHtcclxuICAgICAgICB0aGlzLl9kYXRhU291cmNlID0gZGF0YVNvdXJjZTtcclxuICAgIH1cclxuXHJcbiAgICBvbk1vZGVsQ2hhbmdlZChzZW5kZXI6IElEYXRhTW9kZWwsIGRhdGE6IEV2ZW50TW9kZWxDaGFuZ2VkQXJncykge1xyXG4gICAgICAgIHRoaXMuZXZlbnRNb2RlbENoYW5nZWQucmFpc2Uoc2VuZGVyLCBkYXRhKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgb25Nb2RlbEluaXRpYWxpemVkKHNlbmRlcjogSURhdGFNb2RlbCwgZGF0YTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5ldmVudE1vZGVsSW5pdGlhbGl6ZWQucmFpc2Uoc2VuZGVyLCBkYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVNb2RlbENoYW5nZWQoc2VuZGVyOiBJRGF0YU1vZGVsLCBkYXRhOiBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MpIHsgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IHsgRGF0YU1vZGVsQmFzZSwgRGF0YU1vZGVsSXRlbU9ic2VydmVyIH07XHJcbiJdfQ==