define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Settings = /** @class */ (function () {
        /**
         * Creates an instance of Settings
         * @param {string} type
         * @memberof Settings
         */
        function Settings(type, version) {
            if (version === void 0) { version = "1.0"; }
            /**
             * List of settings data with ids
             *
             * @type {{ [key: string]: any; }}
             * @memberof Settings
             */
            this.data = {};
            this.type = type;
            this.version = version;
        }
        /**
         * Creates an instance with the given interface data
         *
         * @static
         * @param {ISettings} settings
         * @returns {Settings}
         * @memberof Settings
         */
        Settings.create = function (settings) {
            var instance = new Settings(settings.type);
            instance.data = settings.data;
            return instance;
        };
        /**
         * sets some settings data with the given id
         *
         * @param {string} key
         * @param {*} value
         * @memberof Settings
         */
        Settings.prototype.setValue = function (key, value) {
            this.data[key] = value;
        };
        /**
         * Returns some settings data for the given id
         *
         * @param {string} key
         * @returns {*}
         * @memberof Settings
         */
        Settings.prototype.getValue = function (key) {
            return this.data[key];
        };
        return Settings;
    }());
    exports.Settings = Settings;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW1vbi9wZXJzaXN0ZW5jZS9zZXR0aW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFFQTtRQTBCSTs7OztXQUlHO1FBQ0gsa0JBQVksSUFBWSxFQUFFLE9BQXVCO1lBQXZCLHdCQUFBLEVBQUEsZUFBdUI7WUFiakQ7Ozs7O2VBS0c7WUFDSCxTQUFJLEdBQTRCLEVBQUUsQ0FBQztZQVEvQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNqQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUMzQixDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNJLGVBQU0sR0FBYixVQUFjLFFBQW1CO1lBQzdCLElBQUksUUFBUSxHQUFJLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM1QyxRQUFRLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDOUIsT0FBTyxRQUFRLENBQUM7UUFDcEIsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNILDJCQUFRLEdBQVIsVUFBUyxHQUFXLEVBQUUsS0FBVTtZQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUMzQixDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0gsMkJBQVEsR0FBUixVQUFTLEdBQVc7WUFDaEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLENBQUM7UUFDTCxlQUFDO0lBQUQsQ0FBQyxBQXZFRCxJQXVFQztJQXZFWSw0QkFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElTZXR0aW5ncyB9IGZyb20gXCIuL2ludGVyZmFjZXMvc2V0dGluZ3NJbnRlcmZhY2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTZXR0aW5ncyBpbXBsZW1lbnRzIElTZXR0aW5nc3tcclxuXHJcbiAgICAvKipcclxuICAgICAqIFR5cGUgb2YgdGhlIHNldHRpbmdzIGRhdGEgKGUuZy4gY2xhc3NuYW1lLCAuLi4pXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBTZXR0aW5nc1xyXG4gICAgICovXHJcbiAgICB0eXBlOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWZXJzaW9uIG9mIHRoaXMgc2V0dGluZ3MgZGF0YSBmb3JtYXRcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFNldHRpbmdzXHJcbiAgICAgKi9cclxuICAgIHZlcnNpb246IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIExpc3Qgb2Ygc2V0dGluZ3MgZGF0YSB3aXRoIGlkc1xyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHt7IFtrZXk6IHN0cmluZ106IGFueTsgfX1cclxuICAgICAqIEBtZW1iZXJvZiBTZXR0aW5nc1xyXG4gICAgICovXHJcbiAgICBkYXRhOiB7IFtrZXk6IHN0cmluZ106IGFueTsgfSA9IHt9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBTZXR0aW5nc1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcclxuICAgICAqIEBtZW1iZXJvZiBTZXR0aW5nc1xyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih0eXBlOiBzdHJpbmcsIHZlcnNpb246IHN0cmluZyA9IFwiMS4wXCIpe1xyXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgdGhpcy52ZXJzaW9uID0gdmVyc2lvbjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugd2l0aCB0aGUgZ2l2ZW4gaW50ZXJmYWNlIGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge0lTZXR0aW5nc30gc2V0dGluZ3NcclxuICAgICAqIEByZXR1cm5zIHtTZXR0aW5nc31cclxuICAgICAqIEBtZW1iZXJvZiBTZXR0aW5nc1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY3JlYXRlKHNldHRpbmdzOiBJU2V0dGluZ3MpOiBTZXR0aW5nc3tcclxuICAgICAgICBsZXQgaW5zdGFuY2UgPSAgbmV3IFNldHRpbmdzKHNldHRpbmdzLnR5cGUpO1xyXG4gICAgICAgIGluc3RhbmNlLmRhdGEgPSBzZXR0aW5ncy5kYXRhO1xyXG4gICAgICAgIHJldHVybiBpbnN0YW5jZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBzZXRzIHNvbWUgc2V0dGluZ3MgZGF0YSB3aXRoIHRoZSBnaXZlbiBpZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcclxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWVcclxuICAgICAqIEBtZW1iZXJvZiBTZXR0aW5nc1xyXG4gICAgICovXHJcbiAgICBzZXRWYWx1ZShrZXk6IHN0cmluZywgdmFsdWU6IGFueSl7XHJcbiAgICAgICAgdGhpcy5kYXRhW2tleV0gPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHNvbWUgc2V0dGluZ3MgZGF0YSBmb3IgdGhlIGdpdmVuIGlkXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2V0dGluZ3NcclxuICAgICAqL1xyXG4gICAgZ2V0VmFsdWUoa2V5OiBzdHJpbmcpOiBhbnl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVtrZXldO1xyXG4gICAgfVxyXG59Il19