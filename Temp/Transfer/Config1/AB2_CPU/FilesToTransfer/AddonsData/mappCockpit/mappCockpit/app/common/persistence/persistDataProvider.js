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
define(["require", "exports", "../../framework/events", "./persistDataChangedEventArgs"], function (require, exports, events_1, persistDataChangedEventArgs_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DataChanged = /** @class */ (function (_super) {
        __extends(DataChanged, _super);
        function DataChanged() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return DataChanged;
    }(events_1.TypedEvent));
    ;
    var PersistDataProvider = /** @class */ (function () {
        /**
         * Creates an instance of PersistDataProvider
         * @memberof PersistDataProvider
         */
        function PersistDataProvider() {
            this.dataChanged = new DataChanged();
            /**
             * Holds all of the persisting data
             *
             * @private
             * @type {{ [id: string]: any; }}
             * @memberof PersistDataProvider
             */
            this._data = {};
            /**
             * Holds default persisting/settings data (TODO: Move to seperated class/provider)
             *
             * @private
             * @type {{ [id: string]: any; }}
             * @memberof PersistDataProvider
             */
            this._defaultData = {};
        }
        /**
         * gets a singleton instance of PersistDataProvider
         *
         * @readonly
         * @type {PersistDataProvider}
         * @memberof PersistDataProvider
         */
        PersistDataProvider.getInstance = function () {
            this._instance = this._instance ? this._instance : new PersistDataProvider();
            return this._instance;
        };
        /**
         * Get the whole data from this data provider
         *
         * @returns {*}
         * @memberof PersistDataProvider
         */
        PersistDataProvider.prototype.getData = function () {
            return this._data;
        };
        /**
         * Set the whole data of this data provider
         *
         * @param {*} data
         * @memberof PersistDataProvider
         */
        PersistDataProvider.prototype.setData = function (data) {
            this._data = data;
        };
        /**
         * Get data from this dataprovider with the given id
         *
         * @param {string} id
         * @returns {*}
         * @memberof PersistDataProvider
         */
        PersistDataProvider.prototype.getDataWithId = function (id) {
            return this._data[id];
        };
        /**
         * Set data to this dataprovider with the given id
         *
         * @param {string} id
         * @param {*} data
         * @memberof PersistDataProvider
         */
        PersistDataProvider.prototype.setDataWithId = function (id, data) {
            this._data[id] = data;
            this.onDataChanged(id, data);
        };
        /**
         * Get default data from this dataprovider with the given id
         *
         * @param {string} id
         * @returns {*}
         * @memberof PersistDataProvider
         */
        PersistDataProvider.prototype.getDefaultDataWithId = function (id) {
            return this._defaultData[id];
        };
        /**
         * Set data to this dataprovider with the given id
         *
         * @param {string} id
         * @param {*} data
         * @memberof PersistDataProvider
         */
        PersistDataProvider.prototype.setDefaultDataWithId = function (id, data) {
            this._defaultData[id] = data;
        };
        /**
         * Raise dataChanged event
         *
         * @private
         * @param {string} id
         * @param {*} data
         * @memberof PersistDataProvider
         */
        PersistDataProvider.prototype.onDataChanged = function (id, data) {
            var eventArgs = new persistDataChangedEventArgs_1.PersistDataChangedEventArgs();
            eventArgs.id = id;
            eventArgs.data = data;
            this.dataChanged.raise(this, eventArgs);
        };
        return PersistDataProvider;
    }());
    exports.PersistDataProvider = PersistDataProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyc2lzdERhdGFQcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL3BlcnNpc3RlbmNlL3BlcnNpc3REYXRhUHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUdBO1FBQTBCLCtCQUE0RDtRQUF0Rjs7UUFBd0YsQ0FBQztRQUFELGtCQUFDO0lBQUQsQ0FBQyxBQUF6RixDQUEwQixtQkFBVSxHQUFxRDtJQUFBLENBQUM7SUFFMUY7UUFzQ0k7OztXQUdHO1FBQ0g7WUF4Q0EsZ0JBQVcsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1lBRWhDOzs7Ozs7ZUFNRztZQUNLLFVBQUssR0FBMkIsRUFBRSxDQUFDO1lBRTNDOzs7Ozs7ZUFNRztZQUNLLGlCQUFZLEdBQTJCLEVBQUUsQ0FBQztRQXdCbEQsQ0FBQztRQW5CRDs7Ozs7O1dBTUc7UUFDVywrQkFBVyxHQUF6QjtZQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxtQkFBbUIsRUFBRSxDQUFDO1lBRTdFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMxQixDQUFDO1FBVUQ7Ozs7O1dBS0c7UUFDSCxxQ0FBTyxHQUFQO1lBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RCLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNILHFDQUFPLEdBQVAsVUFBUSxJQUFTO1lBQ2IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDdEIsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNILDJDQUFhLEdBQWIsVUFBYyxFQUFVO1lBQ3BCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMxQixDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0gsMkNBQWEsR0FBYixVQUFjLEVBQVUsRUFBRSxJQUFTO1lBQy9CLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQ2hDLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSCxrREFBb0IsR0FBcEIsVUFBcUIsRUFBVTtZQUMzQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDakMsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNILGtEQUFvQixHQUFwQixVQUFxQixFQUFVLEVBQUUsSUFBUztZQUN0QyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUNqQyxDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNLLDJDQUFhLEdBQXJCLFVBQXNCLEVBQVUsRUFBRSxJQUFTO1lBQ3ZDLElBQUksU0FBUyxHQUFHLElBQUkseURBQTJCLEVBQUUsQ0FBQztZQUNsRCxTQUFTLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztZQUNsQixTQUFTLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUN0QixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDNUMsQ0FBQztRQUNMLDBCQUFDO0lBQUQsQ0FBQyxBQTdIRCxJQTZIQztJQTdIWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUeXBlZEV2ZW50IH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9ldmVudHNcIjtcclxuaW1wb3J0IHsgUGVyc2lzdERhdGFDaGFuZ2VkRXZlbnRBcmdzIH0gZnJvbSBcIi4vcGVyc2lzdERhdGFDaGFuZ2VkRXZlbnRBcmdzXCI7XHJcblxyXG5jbGFzcyBEYXRhQ2hhbmdlZCBleHRlbmRzIFR5cGVkRXZlbnQ8UGVyc2lzdERhdGFQcm92aWRlciwgUGVyc2lzdERhdGFDaGFuZ2VkRXZlbnRBcmdzPnsgfTtcclxuXHJcbmV4cG9ydCBjbGFzcyBQZXJzaXN0RGF0YVByb3ZpZGVye1xyXG5cclxuICAgIGRhdGFDaGFuZ2VkID0gbmV3IERhdGFDaGFuZ2VkKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIb2xkcyBhbGwgb2YgdGhlIHBlcnNpc3RpbmcgZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAdHlwZSB7eyBbaWQ6IHN0cmluZ106IGFueTsgfX1cclxuICAgICAqIEBtZW1iZXJvZiBQZXJzaXN0RGF0YVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2RhdGE6IHsgW2lkOiBzdHJpbmddOiBhbnk7IH0gPSB7fTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhvbGRzIGRlZmF1bHQgcGVyc2lzdGluZy9zZXR0aW5ncyBkYXRhIChUT0RPOiBNb3ZlIHRvIHNlcGVyYXRlZCBjbGFzcy9wcm92aWRlcilcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUge3sgW2lkOiBzdHJpbmddOiBhbnk7IH19XHJcbiAgICAgKiBAbWVtYmVyb2YgUGVyc2lzdERhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9kZWZhdWx0RGF0YTogeyBbaWQ6IHN0cmluZ106IGFueTsgfSA9IHt9O1xyXG5cclxuICAgIC8vIGhvbGRzIGFuIGluc3RhbmNlIG9mIHRoaXMgY2xhc3NcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogUGVyc2lzdERhdGFQcm92aWRlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldHMgYSBzaW5nbGV0b24gaW5zdGFuY2Ugb2YgUGVyc2lzdERhdGFQcm92aWRlclxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge1BlcnNpc3REYXRhUHJvdmlkZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgUGVyc2lzdERhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IFBlcnNpc3REYXRhUHJvdmlkZXIge1xyXG4gICAgICAgIHRoaXMuX2luc3RhbmNlID0gdGhpcy5faW5zdGFuY2UgPyB0aGlzLl9pbnN0YW5jZSA6IG5ldyBQZXJzaXN0RGF0YVByb3ZpZGVyKCk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgUGVyc2lzdERhdGFQcm92aWRlclxyXG4gICAgICogQG1lbWJlcm9mIFBlcnNpc3REYXRhUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuXHJcbiAgICB9IFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSB3aG9sZSBkYXRhIGZyb20gdGhpcyBkYXRhIHByb3ZpZGVyXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgUGVyc2lzdERhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBnZXREYXRhKCk6YW55e1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSB3aG9sZSBkYXRhIG9mIHRoaXMgZGF0YSBwcm92aWRlclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gZGF0YVxyXG4gICAgICogQG1lbWJlcm9mIFBlcnNpc3REYXRhUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgc2V0RGF0YShkYXRhOiBhbnkpe1xyXG4gICAgICAgIHRoaXMuX2RhdGEgPSBkYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IGRhdGEgZnJvbSB0aGlzIGRhdGFwcm92aWRlciB3aXRoIHRoZSBnaXZlbiBpZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgUGVyc2lzdERhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBnZXREYXRhV2l0aElkKGlkOiBzdHJpbmcpOmFueXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YVtpZF07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgZGF0YSB0byB0aGlzIGRhdGFwcm92aWRlciB3aXRoIHRoZSBnaXZlbiBpZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAgICogQHBhcmFtIHsqfSBkYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgUGVyc2lzdERhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBzZXREYXRhV2l0aElkKGlkOiBzdHJpbmcsIGRhdGE6IGFueSl7XHJcbiAgICAgICAgdGhpcy5fZGF0YVtpZF0gPSBkYXRhO1xyXG4gICAgICAgIHRoaXMub25EYXRhQ2hhbmdlZChpZCwgZGF0YSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBkZWZhdWx0IGRhdGEgZnJvbSB0aGlzIGRhdGFwcm92aWRlciB3aXRoIHRoZSBnaXZlbiBpZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgUGVyc2lzdERhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBnZXREZWZhdWx0RGF0YVdpdGhJZChpZDogc3RyaW5nKTphbnl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RlZmF1bHREYXRhW2lkXTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCBkYXRhIHRvIHRoaXMgZGF0YXByb3ZpZGVyIHdpdGggdGhlIGdpdmVuIGlkXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICAgKiBAcGFyYW0geyp9IGRhdGFcclxuICAgICAqIEBtZW1iZXJvZiBQZXJzaXN0RGF0YVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHNldERlZmF1bHREYXRhV2l0aElkKGlkOiBzdHJpbmcsIGRhdGE6IGFueSl7XHJcbiAgICAgICAgdGhpcy5fZGVmYXVsdERhdGFbaWRdID0gZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJhaXNlIGRhdGFDaGFuZ2VkIGV2ZW50XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAgICogQHBhcmFtIHsqfSBkYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgUGVyc2lzdERhdGFQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uRGF0YUNoYW5nZWQoaWQ6IHN0cmluZywgZGF0YTogYW55KSB7XHJcbiAgICAgICAgbGV0IGV2ZW50QXJncyA9IG5ldyBQZXJzaXN0RGF0YUNoYW5nZWRFdmVudEFyZ3MoKTtcclxuICAgICAgICBldmVudEFyZ3MuaWQgPSBpZDtcclxuICAgICAgICBldmVudEFyZ3MuZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgdGhpcy5kYXRhQ2hhbmdlZC5yYWlzZSh0aGlzLCBldmVudEFyZ3MpO1xyXG4gICAgfVxyXG59Il19