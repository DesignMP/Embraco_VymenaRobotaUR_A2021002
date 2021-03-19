define(["require", "exports", "./localStorage"], function (require, exports, localStorage_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PersistDataController = /** @class */ (function () {
        /**
         * Creates an instance of PersistDataController
         * @param {(PersistDataProvider|undefined)} dataProvider
         * @memberof PersistDataController
         */
        function PersistDataController(dataProvider) {
            var _this = this;
            this._defaultStorage = new localStorage_1.LocalStorage();
            this._defaultStorage.setLocation('mappCockpit');
            this._dataProvider = dataProvider;
            if (this._dataProvider != undefined) {
                this._dataProvider.dataChanged.attach(function (sender, args) { return _this.dataProviderDataChanged(sender, args); });
            }
        }
        /**
         * Saves all data from the dataProvider to the default storage
         *
         * @memberof PersistDataController
         */
        PersistDataController.prototype.save = function () {
            if (this._dataProvider != undefined) {
                this._defaultStorage.saveData(this._dataProvider.getData());
            }
        };
        /**
         * Loads all data from default storage and sets the data to the dataProvider
         *
         * @memberof PersistDataController
         */
        PersistDataController.prototype.load = function () {
            var dataFromStorage = this._defaultStorage.loadData();
            if (dataFromStorage != undefined) {
                if (this._dataProvider != undefined) {
                    this._dataProvider.setData(dataFromStorage);
                }
            }
        };
        /**
         * Removes all data from the default storage
         *
         * @memberof PersistDataController
         */
        PersistDataController.prototype.clearDefaultStorage = function () {
            this._defaultStorage.clear();
        };
        /**
         * Notification when data in the dataprovider has changed or added
         *
         * @param {PersistDataProvider} sender
         * @param {PersistDataChangedEventArgs} args
         * @memberof PersistDataController
         */
        PersistDataController.prototype.dataProviderDataChanged = function (sender, args) {
            // Save data on every change
            this.save();
        };
        return PersistDataController;
    }());
    exports.PersistDataController = PersistDataController;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyc2lzdERhdGFDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vcGVyc2lzdGVuY2UvcGVyc2lzdERhdGFDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUtBO1FBb0JJOzs7O1dBSUc7UUFDSCwrQkFBWSxZQUEyQztZQUF2RCxpQkFRQztZQVBHLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSwyQkFBWSxFQUFFLENBQUM7WUFDMUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7WUFFaEQsSUFBSSxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUM7WUFDbEMsSUFBRyxJQUFJLENBQUMsYUFBYSxJQUFJLFNBQVMsRUFBQztnQkFDL0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFVBQUMsTUFBTSxFQUFDLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQTFDLENBQTBDLENBQUMsQ0FBQTthQUNyRztRQUNMLENBQUM7UUFFRDs7OztXQUlHO1FBQ0gsb0NBQUksR0FBSjtZQUNJLElBQUcsSUFBSSxDQUFDLGFBQWEsSUFBSSxTQUFTLEVBQUM7Z0JBQy9CLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQzthQUMvRDtRQUNMLENBQUM7UUFFRDs7OztXQUlHO1FBQ0gsb0NBQUksR0FBSjtZQUNJLElBQUksZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDdEQsSUFBRyxlQUFlLElBQUksU0FBUyxFQUFDO2dCQUM1QixJQUFHLElBQUksQ0FBQyxhQUFhLElBQUksU0FBUyxFQUFDO29CQUMvQixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztpQkFDL0M7YUFDSjtRQUNMLENBQUM7UUFFRDs7OztXQUlHO1FBQ0gsbURBQW1CLEdBQW5CO1lBQ0ksSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNqQyxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0gsdURBQXVCLEdBQXZCLFVBQXdCLE1BQTJCLEVBQUUsSUFBaUM7WUFDbEYsNEJBQTRCO1lBQzVCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNoQixDQUFDO1FBQ0osNEJBQUM7SUFBRCxDQUFDLEFBaEZGLElBZ0ZFO0lBaEZXLHNEQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBlcnNpc3REYXRhUHJvdmlkZXIgfSBmcm9tIFwiLi9wZXJzaXN0RGF0YVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IFBlcnNpc3REYXRhQ2hhbmdlZEV2ZW50QXJncyB9IGZyb20gXCIuL3BlcnNpc3REYXRhQ2hhbmdlZEV2ZW50QXJnc1wiO1xyXG5pbXBvcnQgeyBJU3RvcmFnZSB9IGZyb20gXCIuL2ludGVyZmFjZXMvc3RvcmFnZUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBMb2NhbFN0b3JhZ2UgfSBmcm9tIFwiLi9sb2NhbFN0b3JhZ2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBQZXJzaXN0RGF0YUNvbnRyb2xsZXJ7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogRGF0YVByb3ZpZGVyIHdoaWNoIHByb3ZpZGVzIHRoZSBwZXJzaXN0aW5nIGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUgeyhQZXJzaXN0RGF0YVByb3ZpZGVyfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgUGVyc2lzdERhdGFDb250cm9sbGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2RhdGFQcm92aWRlcjogUGVyc2lzdERhdGFQcm92aWRlcnx1bmRlZmluZWQ7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogRGVmYXVsdCBzdG9yYWdlIGZvciBwZXJzaXN0aW5nIGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUge0lTdG9yYWdlfVxyXG4gICAgICogQG1lbWJlcm9mIFBlcnNpc3REYXRhQ29udHJvbGxlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9kZWZhdWx0U3RvcmFnZTogSVN0b3JhZ2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFBlcnNpc3REYXRhQ29udHJvbGxlclxyXG4gICAgICogQHBhcmFtIHsoUGVyc2lzdERhdGFQcm92aWRlcnx1bmRlZmluZWQpfSBkYXRhUHJvdmlkZXJcclxuICAgICAqIEBtZW1iZXJvZiBQZXJzaXN0RGF0YUNvbnRyb2xsZXJcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoZGF0YVByb3ZpZGVyOiBQZXJzaXN0RGF0YVByb3ZpZGVyfHVuZGVmaW5lZCl7XHJcbiAgICAgICAgdGhpcy5fZGVmYXVsdFN0b3JhZ2UgPSBuZXcgTG9jYWxTdG9yYWdlKCk7XHJcbiAgICAgICAgdGhpcy5fZGVmYXVsdFN0b3JhZ2Uuc2V0TG9jYXRpb24oJ21hcHBDb2NrcGl0Jyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fZGF0YVByb3ZpZGVyID0gZGF0YVByb3ZpZGVyO1xyXG4gICAgICAgIGlmKHRoaXMuX2RhdGFQcm92aWRlciAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9kYXRhUHJvdmlkZXIuZGF0YUNoYW5nZWQuYXR0YWNoKChzZW5kZXIsYXJncykgPT4gdGhpcy5kYXRhUHJvdmlkZXJEYXRhQ2hhbmdlZChzZW5kZXIsIGFyZ3MpKVxyXG4gICAgICAgIH1cclxuICAgIH0gXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTYXZlcyBhbGwgZGF0YSBmcm9tIHRoZSBkYXRhUHJvdmlkZXIgdG8gdGhlIGRlZmF1bHQgc3RvcmFnZVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBQZXJzaXN0RGF0YUNvbnRyb2xsZXJcclxuICAgICAqL1xyXG4gICAgc2F2ZSgpIHtcclxuICAgICAgICBpZih0aGlzLl9kYXRhUHJvdmlkZXIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fZGVmYXVsdFN0b3JhZ2Uuc2F2ZURhdGEodGhpcy5fZGF0YVByb3ZpZGVyLmdldERhdGEoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZHMgYWxsIGRhdGEgZnJvbSBkZWZhdWx0IHN0b3JhZ2UgYW5kIHNldHMgdGhlIGRhdGEgdG8gdGhlIGRhdGFQcm92aWRlclxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBQZXJzaXN0RGF0YUNvbnRyb2xsZXJcclxuICAgICAqL1xyXG4gICAgbG9hZCgpIHtcclxuICAgICAgICBsZXQgZGF0YUZyb21TdG9yYWdlID0gdGhpcy5fZGVmYXVsdFN0b3JhZ2UubG9hZERhdGEoKTtcclxuICAgICAgICBpZihkYXRhRnJvbVN0b3JhZ2UgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgaWYodGhpcy5fZGF0YVByb3ZpZGVyICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kYXRhUHJvdmlkZXIuc2V0RGF0YShkYXRhRnJvbVN0b3JhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyBhbGwgZGF0YSBmcm9tIHRoZSBkZWZhdWx0IHN0b3JhZ2VcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgUGVyc2lzdERhdGFDb250cm9sbGVyXHJcbiAgICAgKi9cclxuICAgIGNsZWFyRGVmYXVsdFN0b3JhZ2UoKXtcclxuICAgICAgICB0aGlzLl9kZWZhdWx0U3RvcmFnZS5jbGVhcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTm90aWZpY2F0aW9uIHdoZW4gZGF0YSBpbiB0aGUgZGF0YXByb3ZpZGVyIGhhcyBjaGFuZ2VkIG9yIGFkZGVkXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtQZXJzaXN0RGF0YVByb3ZpZGVyfSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7UGVyc2lzdERhdGFDaGFuZ2VkRXZlbnRBcmdzfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgUGVyc2lzdERhdGFDb250cm9sbGVyXHJcbiAgICAgKi9cclxuICAgIGRhdGFQcm92aWRlckRhdGFDaGFuZ2VkKHNlbmRlcjogUGVyc2lzdERhdGFQcm92aWRlciwgYXJnczogUGVyc2lzdERhdGFDaGFuZ2VkRXZlbnRBcmdzKTogdm9pZCB7XHJcbiAgICAgICAgLy8gU2F2ZSBkYXRhIG9uIGV2ZXJ5IGNoYW5nZVxyXG4gICAgICAgIHRoaXMuc2F2ZSgpO1xyXG4gICAgfVxyXG4gfSJdfQ==