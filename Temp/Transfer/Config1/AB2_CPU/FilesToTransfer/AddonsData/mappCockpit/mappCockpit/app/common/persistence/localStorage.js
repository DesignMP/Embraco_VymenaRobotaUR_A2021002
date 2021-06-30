define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LocalStorage = /** @class */ (function () {
        function LocalStorage() {
            this._location = "LocalStorageDefaultId";
        }
        /**
         * Defines an id for the location in the local storage
         *
         * @param {string} location
         * @memberof LocalStorage
         */
        LocalStorage.prototype.connectStorage = function (location) {
            this._location = location;
        };
        /**
         * load data from the local storage
         *
         * @returns {*}
         * @memberof LocalStorage
         */
        LocalStorage.prototype.loadData = function () {
            var data = {};
            var keys = Object.keys(localStorage);
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                var item = localStorage.getItem(key);
                if (item != undefined) {
                    data[key] = JSON.parse(item);
                }
            }
            this._data = data;
            /*let data = localStorage.getItem(this._location);
            if(data != undefined){
                let dataObject = JSON.parse(data);
                this._data =  dataObject;
            } */
        };
        LocalStorage.prototype.retrieveData = function () {
            if (this._data != undefined) {
                return this._data;
            }
            else {
                console.log("data not defined");
            }
        };
        /**
         * Saves the data to local storage
         *
         * @param {*} data
         * @memberof LocalStorage
         */
        LocalStorage.prototype.saveData = function (key, data) {
            var dataString = JSON.stringify(data);
            var dataLength = dataString.length; // LocalStorage not working with data larger then round about 5.200.000 characters(differs from PC/Browser)
            try {
                localStorage.setItem(key, dataString);
            }
            catch (e) {
                console.error("Save data to local storage not possible! Maybe the data is too large(" + dataLength + " > 5200000 characters).");
            }
        };
        /**
         * Removes all data from local storage
         *
         * @memberof LocalStorage
         */
        LocalStorage.prototype.clear = function () {
            //check if there is an item in store
            if (localStorage.getItem(Object.keys(localStorage)[0])) {
                //clear the storage
                localStorage.clear();
            }
        };
        return LocalStorage;
    }());
    exports.LocalStorage = LocalStorage;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxTdG9yYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vcGVyc2lzdGVuY2UvbG9jYWxTdG9yYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUVBO1FBQUE7WUFHWSxjQUFTLEdBQVUsdUJBQXVCLENBQUM7UUE0RXZELENBQUM7UUExRUc7Ozs7O1dBS0c7UUFDSCxxQ0FBYyxHQUFkLFVBQWUsUUFBZ0I7WUFDM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDOUIsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gsK0JBQVEsR0FBUjtZQUVJLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQTtZQUNiLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUE7WUFFcEMsS0FBZSxVQUFJLEVBQUosYUFBSSxFQUFKLGtCQUFJLEVBQUosSUFBSSxFQUFDO2dCQUFoQixJQUFJLEdBQUcsYUFBQTtnQkFDUCxJQUFJLElBQUksR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUNwQyxJQUFHLElBQUksSUFBSSxTQUFTLEVBQUM7b0JBQ2pCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO2lCQUMvQjthQUNKO1lBRUQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDbEI7Ozs7Z0JBSUk7UUFDUixDQUFDO1FBRUQsbUNBQVksR0FBWjtZQUNJLElBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxTQUFTLEVBQUM7Z0JBQ3ZCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQTthQUNwQjtpQkFDSTtnQkFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7YUFDbkM7UUFDTCxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSCwrQkFBUSxHQUFSLFVBQVMsR0FBVyxFQUFDLElBQVM7WUFDMUIsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0QyxJQUFJLFVBQVUsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsMkdBQTJHO1lBQy9JLElBQUc7Z0JBQ0MsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7YUFDekM7WUFDRCxPQUFNLENBQUMsRUFBQztnQkFDSixPQUFPLENBQUMsS0FBSyxDQUFDLHVFQUF1RSxHQUFHLFVBQVUsR0FBRyx5QkFBeUIsQ0FBQyxDQUFDO2FBQ25JO1FBQ0wsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSCw0QkFBSyxHQUFMO1lBQ0ksb0NBQW9DO1lBQ3BDLElBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ25ELG1CQUFtQjtnQkFDbkIsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ3hCO1FBQ0wsQ0FBQztRQUNMLG1CQUFDO0lBQUQsQ0FBQyxBQS9FRCxJQStFQztJQS9FWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElTdG9yYWdlIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9zdG9yYWdlSW50ZXJmYWNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTG9jYWxTdG9yYWdlIGltcGxlbWVudHMgSVN0b3JhZ2V7XHJcbiAgIFxyXG4gICAgcHJpdmF0ZSBfZGF0YTtcclxuICAgIHByaXZhdGUgX2xvY2F0aW9uOnN0cmluZyA9IFwiTG9jYWxTdG9yYWdlRGVmYXVsdElkXCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIGFuIGlkIGZvciB0aGUgbG9jYXRpb24gaW4gdGhlIGxvY2FsIHN0b3JhZ2VcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbG9jYXRpb25cclxuICAgICAqIEBtZW1iZXJvZiBMb2NhbFN0b3JhZ2VcclxuICAgICAqL1xyXG4gICAgY29ubmVjdFN0b3JhZ2UobG9jYXRpb246IHN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5fbG9jYXRpb24gPSBsb2NhdGlvbjtcclxuICAgIH0gICAgXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogbG9hZCBkYXRhIGZyb20gdGhlIGxvY2FsIHN0b3JhZ2VcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBMb2NhbFN0b3JhZ2VcclxuICAgICAqL1xyXG4gICAgbG9hZERhdGEoKTogYW55IHtcclxuXHJcbiAgICAgICAgbGV0IGRhdGEgPSB7fVxyXG4gICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXMobG9jYWxTdG9yYWdlKVxyXG5cclxuICAgICAgICBmb3IobGV0IGtleSBvZiBrZXlzKXtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpXHJcbiAgICAgICAgICAgIGlmKGl0ZW0gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGRhdGFba2V5XSA9IEpTT04ucGFyc2UoaXRlbSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgLypsZXQgZGF0YSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMuX2xvY2F0aW9uKTtcclxuICAgICAgICBpZihkYXRhICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGxldCBkYXRhT2JqZWN0ID0gSlNPTi5wYXJzZShkYXRhKTtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YSA9ICBkYXRhT2JqZWN0O1xyXG4gICAgICAgIH0gKi8gICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcmV0cmlldmVEYXRhKCkgOiBhbnl7XHJcbiAgICAgICAgaWYodGhpcy5fZGF0YSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0YVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJkYXRhIG5vdCBkZWZpbmVkXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNhdmVzIHRoZSBkYXRhIHRvIGxvY2FsIHN0b3JhZ2VcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IGRhdGFcclxuICAgICAqIEBtZW1iZXJvZiBMb2NhbFN0b3JhZ2VcclxuICAgICAqL1xyXG4gICAgc2F2ZURhdGEoa2V5OiBzdHJpbmcsZGF0YTogYW55KSB7XHJcbiAgICAgICAgbGV0IGRhdGFTdHJpbmcgPSBKU09OLnN0cmluZ2lmeShkYXRhKTtcclxuICAgICAgICBsZXQgZGF0YUxlbmd0aCA9IGRhdGFTdHJpbmcubGVuZ3RoOyAvLyBMb2NhbFN0b3JhZ2Ugbm90IHdvcmtpbmcgd2l0aCBkYXRhIGxhcmdlciB0aGVuIHJvdW5kIGFib3V0IDUuMjAwLjAwMCBjaGFyYWN0ZXJzKGRpZmZlcnMgZnJvbSBQQy9Ccm93c2VyKVxyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBkYXRhU3RyaW5nKTsgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoKGUpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiU2F2ZSBkYXRhIHRvIGxvY2FsIHN0b3JhZ2Ugbm90IHBvc3NpYmxlISBNYXliZSB0aGUgZGF0YSBpcyB0b28gbGFyZ2UoXCIgKyBkYXRhTGVuZ3RoICsgXCIgPiA1MjAwMDAwIGNoYXJhY3RlcnMpLlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIGFsbCBkYXRhIGZyb20gbG9jYWwgc3RvcmFnZVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBMb2NhbFN0b3JhZ2VcclxuICAgICAqL1xyXG4gICAgY2xlYXIoKXtcclxuICAgICAgICAvL2NoZWNrIGlmIHRoZXJlIGlzIGFuIGl0ZW0gaW4gc3RvcmVcclxuICAgICAgICBpZihsb2NhbFN0b3JhZ2UuZ2V0SXRlbShPYmplY3Qua2V5cyhsb2NhbFN0b3JhZ2UpWzBdKSkge1xyXG4gICAgICAgICAgICAvL2NsZWFyIHRoZSBzdG9yYWdlXHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==