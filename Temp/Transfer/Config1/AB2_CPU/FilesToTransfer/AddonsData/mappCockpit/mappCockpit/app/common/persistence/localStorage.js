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
        LocalStorage.prototype.setLocation = function (location) {
            this._location = location;
        };
        /**
         * load data from the local storage
         *
         * @returns {*}
         * @memberof LocalStorage
         */
        LocalStorage.prototype.loadData = function () {
            var data = localStorage.getItem(this._location);
            if (data != undefined) {
                var dataObject = JSON.parse(data);
                return dataObject;
            }
        };
        /**
         * Saves the data to local storage
         *
         * @param {*} data
         * @memberof LocalStorage
         */
        LocalStorage.prototype.saveData = function (data) {
            var dataString = JSON.stringify(data);
            var dataLength = dataString.length; // LocalStorage not working with data larger then round about 5.200.000 characters(differs from PC/Browser)
            try {
                localStorage.setItem(this._location, dataString);
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
            if (localStorage.getItem(this._location)) {
                localStorage.clear();
            }
        };
        return LocalStorage;
    }());
    exports.LocalStorage = LocalStorage;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxTdG9yYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vcGVyc2lzdGVuY2UvbG9jYWxTdG9yYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUVBO1FBQUE7WUFFWSxjQUFTLEdBQVUsdUJBQXVCLENBQUM7UUFxRHZELENBQUM7UUFuREc7Ozs7O1dBS0c7UUFDSCxrQ0FBVyxHQUFYLFVBQVksUUFBZ0I7WUFDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDOUIsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gsK0JBQVEsR0FBUjtZQUNJLElBQUksSUFBSSxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2hELElBQUcsSUFBSSxJQUFJLFNBQVMsRUFBQztnQkFDakIsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbEMsT0FBTyxVQUFVLENBQUM7YUFDckI7UUFDTCxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSCwrQkFBUSxHQUFSLFVBQVMsSUFBUztZQUNkLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEMsSUFBSSxVQUFVLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLDJHQUEyRztZQUMvSSxJQUFHO2dCQUNDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQzthQUNwRDtZQUNELE9BQU0sQ0FBQyxFQUFDO2dCQUNKLE9BQU8sQ0FBQyxLQUFLLENBQUMsdUVBQXVFLEdBQUcsVUFBVSxHQUFHLHlCQUF5QixDQUFDLENBQUM7YUFDbkk7UUFDTCxDQUFDO1FBRUQ7Ozs7V0FJRztRQUNILDRCQUFLLEdBQUw7WUFDSSxJQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUNyQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDeEI7UUFDTCxDQUFDO1FBQ0wsbUJBQUM7SUFBRCxDQUFDLEFBdkRELElBdURDO0lBdkRZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVN0b3JhZ2UgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL3N0b3JhZ2VJbnRlcmZhY2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBMb2NhbFN0b3JhZ2UgaW1wbGVtZW50cyBJU3RvcmFnZXtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfbG9jYXRpb246c3RyaW5nID0gXCJMb2NhbFN0b3JhZ2VEZWZhdWx0SWRcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgYW4gaWQgZm9yIHRoZSBsb2NhdGlvbiBpbiB0aGUgbG9jYWwgc3RvcmFnZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhdGlvblxyXG4gICAgICogQG1lbWJlcm9mIExvY2FsU3RvcmFnZVxyXG4gICAgICovXHJcbiAgICBzZXRMb2NhdGlvbihsb2NhdGlvbjogc3RyaW5nKXtcclxuICAgICAgICB0aGlzLl9sb2NhdGlvbiA9IGxvY2F0aW9uO1xyXG4gICAgfSAgICBcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBsb2FkIGRhdGEgZnJvbSB0aGUgbG9jYWwgc3RvcmFnZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIExvY2FsU3RvcmFnZVxyXG4gICAgICovXHJcbiAgICBsb2FkRGF0YSgpOiBhbnkge1xyXG4gICAgICAgIGxldCBkYXRhID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5fbG9jYXRpb24pO1xyXG4gICAgICAgIGlmKGRhdGEgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgbGV0IGRhdGFPYmplY3QgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG4gICAgICAgICAgICByZXR1cm4gZGF0YU9iamVjdDtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBTYXZlcyB0aGUgZGF0YSB0byBsb2NhbCBzdG9yYWdlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBkYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgTG9jYWxTdG9yYWdlXHJcbiAgICAgKi9cclxuICAgIHNhdmVEYXRhKGRhdGE6IGFueSkge1xyXG4gICAgICAgIGxldCBkYXRhU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XHJcbiAgICAgICAgbGV0IGRhdGFMZW5ndGggPSBkYXRhU3RyaW5nLmxlbmd0aDsgLy8gTG9jYWxTdG9yYWdlIG5vdCB3b3JraW5nIHdpdGggZGF0YSBsYXJnZXIgdGhlbiByb3VuZCBhYm91dCA1LjIwMC4wMDAgY2hhcmFjdGVycyhkaWZmZXJzIGZyb20gUEMvQnJvd3NlcilcclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMuX2xvY2F0aW9uLCBkYXRhU3RyaW5nKTsgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoKGUpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiU2F2ZSBkYXRhIHRvIGxvY2FsIHN0b3JhZ2Ugbm90IHBvc3NpYmxlISBNYXliZSB0aGUgZGF0YSBpcyB0b28gbGFyZ2UoXCIgKyBkYXRhTGVuZ3RoICsgXCIgPiA1MjAwMDAwIGNoYXJhY3RlcnMpLlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIGFsbCBkYXRhIGZyb20gbG9jYWwgc3RvcmFnZVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBMb2NhbFN0b3JhZ2VcclxuICAgICAqL1xyXG4gICAgY2xlYXIoKXtcclxuICAgICAgICBpZihsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLl9sb2NhdGlvbikpIHtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19