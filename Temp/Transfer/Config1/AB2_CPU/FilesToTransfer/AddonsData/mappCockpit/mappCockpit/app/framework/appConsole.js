define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AppConsole = /** @class */ (function () {
        /**
         * Creates an instance of AppConsole.
         * @memberof AppConsole
         */
        function AppConsole() {
            var origConsoleMethods = this.preserveOriginalConsoleMethods();
            // override the standard app console.
            console = this;
            this.enableReleaseConsoleMethods(origConsoleMethods);
        }
        /**
         * Creates an AppConsole instance
         *
         * @static
         * @returns {AppConsole}
         * @memberof AppConsole
         */
        AppConsole.create = function () {
            return new AppConsole();
        };
        /**
         * Preserves the original methods
         *
         * @private
         * @memberof AppConsole
         */
        AppConsole.prototype.preserveOriginalConsoleMethods = function () {
            var origConsoleMethods = {};
            origConsoleMethods["info"] = console.info;
            origConsoleMethods["log"] = console.log;
            origConsoleMethods["warn"] = console.warn;
            origConsoleMethods["error"] = console.error;
            return origConsoleMethods;
        };
        /**
         * Enables console methods for release mode
         *
         * @param {*} origConsoleMethods
         * @returns {*}
         * @memberof AppConsole
         */
        AppConsole.prototype.enableReleaseConsoleMethods = function (origConsoleMethods) {
            console.warn = origConsoleMethods["warn"];
            console.error = origConsoleMethods["error"];
        };
        AppConsole.prototype.info = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
        };
        AppConsole.prototype.log = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
        };
        AppConsole.prototype.warn = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
        };
        AppConsole.prototype.error = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
        };
        AppConsole.prototype.assert = function (condition, message) {
            var data = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                data[_i - 2] = arguments[_i];
            }
        };
        AppConsole.prototype.clear = function () {
        };
        AppConsole.prototype.count = function (label) {
        };
        AppConsole.prototype.debug = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
        };
        AppConsole.prototype.dir = function (value) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
        };
        AppConsole.prototype.dirxml = function (value) {
        };
        AppConsole.prototype.exception = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
        };
        AppConsole.prototype.group = function (groupTitle) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
        };
        AppConsole.prototype.groupCollapsed = function (groupTitle) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
        };
        AppConsole.prototype.groupEnd = function () {
        };
        AppConsole.prototype.markTimeline = function (label) {
        };
        AppConsole.prototype.msIsIndependentlyComposed = function (element) {
            return false;
        };
        AppConsole.prototype.profile = function (reportName) {
        };
        AppConsole.prototype.profileEnd = function () {
        };
        AppConsole.prototype.select = function (element) {
        };
        AppConsole.prototype.table = function () {
            var tabularData = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                tabularData[_i] = arguments[_i];
            }
        };
        AppConsole.prototype.time = function (label) {
        };
        AppConsole.prototype.timeEnd = function (label) {
        };
        AppConsole.prototype.timeStamp = function (label) {
        };
        AppConsole.prototype.timeline = function (label) {
        };
        AppConsole.prototype.timelineEnd = function (label) {
        };
        AppConsole.prototype.trace = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
        };
        return AppConsole;
    }());
    exports.AppConsole = AppConsole;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwQ29uc29sZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcHAvZnJhbWV3b3JrL2FwcENvbnNvbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBQ0E7UUFNSTs7O1dBR0c7UUFDSDtZQUVJLElBQUksa0JBQWtCLEdBQUcsSUFBSSxDQUFDLDhCQUE4QixFQUFFLENBQUM7WUFFL0QscUNBQXFDO1lBQ3JDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFFZixJQUFJLENBQUMsMkJBQTJCLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUN6RCxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ksaUJBQU0sR0FBYjtZQUNJLE9BQU8sSUFBSSxVQUFVLEVBQUUsQ0FBQztRQUM1QixDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSyxtREFBOEIsR0FBdEM7WUFDSSxJQUFJLGtCQUFrQixHQUFHLEVBQUUsQ0FBQztZQUM1QixrQkFBa0IsQ0FBQyxNQUFNLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQzFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFDeEMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztZQUMxQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQzVDLE9BQU8sa0JBQWtCLENBQUM7UUFDOUIsQ0FBQztRQUtEOzs7Ozs7V0FNRztRQUNILGdEQUEyQixHQUEzQixVQUE0QixrQkFBa0I7WUFDMUMsT0FBTyxDQUFDLElBQUksR0FBRyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMxQyxPQUFPLENBQUMsS0FBSyxHQUFHLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hELENBQUM7UUFHRCx5QkFBSSxHQUFKLFVBQUssT0FBYTtZQUFFLHdCQUF3QjtpQkFBeEIsVUFBd0IsRUFBeEIscUJBQXdCLEVBQXhCLElBQXdCO2dCQUF4Qix1Q0FBd0I7O1FBRTVDLENBQUM7UUFFRCx3QkFBRyxHQUFILFVBQUksT0FBYTtZQUFFLHdCQUF3QjtpQkFBeEIsVUFBd0IsRUFBeEIscUJBQXdCLEVBQXhCLElBQXdCO2dCQUF4Qix1Q0FBd0I7O1FBRTNDLENBQUM7UUFFRCx5QkFBSSxHQUFKLFVBQUssT0FBYTtZQUFFLHdCQUF3QjtpQkFBeEIsVUFBd0IsRUFBeEIscUJBQXdCLEVBQXhCLElBQXdCO2dCQUF4Qix1Q0FBd0I7O1FBRTVDLENBQUM7UUFFRCwwQkFBSyxHQUFMLFVBQU0sT0FBYTtZQUFFLHdCQUF3QjtpQkFBeEIsVUFBd0IsRUFBeEIscUJBQXdCLEVBQXhCLElBQXdCO2dCQUF4Qix1Q0FBd0I7O1FBRTdDLENBQUM7UUFFRCwyQkFBTSxHQUFOLFVBQU8sU0FBK0IsRUFBRSxPQUE0QjtZQUFFLGNBQWM7aUJBQWQsVUFBYyxFQUFkLHFCQUFjLEVBQWQsSUFBYztnQkFBZCw2QkFBYzs7UUFFcEYsQ0FBQztRQUVELDBCQUFLLEdBQUw7UUFFQSxDQUFDO1FBQ0QsMEJBQUssR0FBTCxVQUFNLEtBQTBCO1FBRWhDLENBQUM7UUFDRCwwQkFBSyxHQUFMLFVBQU0sT0FBYTtZQUFFLHdCQUF3QjtpQkFBeEIsVUFBd0IsRUFBeEIscUJBQXdCLEVBQXhCLElBQXdCO2dCQUF4Qix1Q0FBd0I7O1FBRTdDLENBQUM7UUFDRCx3QkFBRyxHQUFILFVBQUksS0FBVztZQUFFLHdCQUF3QjtpQkFBeEIsVUFBd0IsRUFBeEIscUJBQXdCLEVBQXhCLElBQXdCO2dCQUF4Qix1Q0FBd0I7O1FBRXpDLENBQUM7UUFDRCwyQkFBTSxHQUFOLFVBQU8sS0FBVTtRQUVqQixDQUFDO1FBRUQsOEJBQVMsR0FBVCxVQUFVLE9BQTRCO1lBQUUsd0JBQXdCO2lCQUF4QixVQUF3QixFQUF4QixxQkFBd0IsRUFBeEIsSUFBd0I7Z0JBQXhCLHVDQUF3Qjs7UUFFaEUsQ0FBQztRQUNELDBCQUFLLEdBQUwsVUFBTSxVQUErQjtZQUFFLHdCQUF3QjtpQkFBeEIsVUFBd0IsRUFBeEIscUJBQXdCLEVBQXhCLElBQXdCO2dCQUF4Qix1Q0FBd0I7O1FBRS9ELENBQUM7UUFDRCxtQ0FBYyxHQUFkLFVBQWUsVUFBK0I7WUFBRSx3QkFBd0I7aUJBQXhCLFVBQXdCLEVBQXhCLHFCQUF3QixFQUF4QixJQUF3QjtnQkFBeEIsdUNBQXdCOztRQUV4RSxDQUFDO1FBQ0QsNkJBQVEsR0FBUjtRQUVBLENBQUM7UUFFRCxpQ0FBWSxHQUFaLFVBQWEsS0FBMEI7UUFFdkMsQ0FBQztRQUNELDhDQUF5QixHQUF6QixVQUEwQixPQUFnQjtZQUN0QyxPQUFPLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBQ0QsNEJBQU8sR0FBUCxVQUFRLFVBQStCO1FBRXZDLENBQUM7UUFDRCwrQkFBVSxHQUFWO1FBRUEsQ0FBQztRQUNELDJCQUFNLEdBQU4sVUFBTyxPQUFnQjtRQUV2QixDQUFDO1FBQ0QsMEJBQUssR0FBTDtZQUFNLHFCQUFxQjtpQkFBckIsVUFBcUIsRUFBckIscUJBQXFCLEVBQXJCLElBQXFCO2dCQUFyQixnQ0FBcUI7O1FBRTNCLENBQUM7UUFDRCx5QkFBSSxHQUFKLFVBQUssS0FBMEI7UUFFL0IsQ0FBQztRQUNELDRCQUFPLEdBQVAsVUFBUSxLQUEwQjtRQUVsQyxDQUFDO1FBQ0QsOEJBQVMsR0FBVCxVQUFVLEtBQTBCO1FBRXBDLENBQUM7UUFDRCw2QkFBUSxHQUFSLFVBQVMsS0FBMEI7UUFFbkMsQ0FBQztRQUNELGdDQUFXLEdBQVgsVUFBWSxLQUEwQjtRQUV0QyxDQUFDO1FBQ0QsMEJBQUssR0FBTCxVQUFNLE9BQWE7WUFBRSx3QkFBd0I7aUJBQXhCLFVBQXdCLEVBQXhCLHFCQUF3QixFQUF4QixJQUF3QjtnQkFBeEIsdUNBQXdCOztRQUU3QyxDQUFDO1FBRUwsaUJBQUM7SUFBRCxDQUFDLEFBcEpELElBb0pDO0lBR08sZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuY2xhc3MgQXBwQ29uc29sZSBpbXBsZW1lbnRzIENvbnNvbGV7XHJcblxyXG5cclxuXHJcbiAgICBtZW1vcnk6IGFueTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQXBwQ29uc29sZS5cclxuICAgICAqIEBtZW1iZXJvZiBBcHBDb25zb2xlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKXtcclxuXHJcbiAgICAgICAgbGV0IG9yaWdDb25zb2xlTWV0aG9kcyA9IHRoaXMucHJlc2VydmVPcmlnaW5hbENvbnNvbGVNZXRob2RzKCk7XHJcblxyXG4gICAgICAgIC8vIG92ZXJyaWRlIHRoZSBzdGFuZGFyZCBhcHAgY29uc29sZS5cclxuICAgICAgICBjb25zb2xlID0gdGhpcztcclxuXHJcbiAgICAgICAgdGhpcy5lbmFibGVSZWxlYXNlQ29uc29sZU1ldGhvZHMob3JpZ0NvbnNvbGVNZXRob2RzKTsgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBBcHBDb25zb2xlIGluc3RhbmNlXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHJldHVybnMge0FwcENvbnNvbGV9XHJcbiAgICAgKiBAbWVtYmVyb2YgQXBwQ29uc29sZVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY3JlYXRlKCk6IEFwcENvbnNvbGUge1xyXG4gICAgICAgIHJldHVybiBuZXcgQXBwQ29uc29sZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJlc2VydmVzIHRoZSBvcmlnaW5hbCBtZXRob2RzIFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgQXBwQ29uc29sZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHByZXNlcnZlT3JpZ2luYWxDb25zb2xlTWV0aG9kcygpIHtcclxuICAgICAgICBsZXQgb3JpZ0NvbnNvbGVNZXRob2RzID0ge307XHJcbiAgICAgICAgb3JpZ0NvbnNvbGVNZXRob2RzW1wiaW5mb1wiXSA9IGNvbnNvbGUuaW5mbztcclxuICAgICAgICBvcmlnQ29uc29sZU1ldGhvZHNbXCJsb2dcIl0gPSBjb25zb2xlLmxvZztcclxuICAgICAgICBvcmlnQ29uc29sZU1ldGhvZHNbXCJ3YXJuXCJdID0gY29uc29sZS53YXJuO1xyXG4gICAgICAgIG9yaWdDb25zb2xlTWV0aG9kc1tcImVycm9yXCJdID0gY29uc29sZS5lcnJvcjtcclxuICAgICAgICByZXR1cm4gb3JpZ0NvbnNvbGVNZXRob2RzO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBcclxuXHJcbiAgICAvKipcclxuICAgICAqIEVuYWJsZXMgY29uc29sZSBtZXRob2RzIGZvciByZWxlYXNlIG1vZGVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IG9yaWdDb25zb2xlTWV0aG9kc1xyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgQXBwQ29uc29sZVxyXG4gICAgICovXHJcbiAgICBlbmFibGVSZWxlYXNlQ29uc29sZU1ldGhvZHMob3JpZ0NvbnNvbGVNZXRob2RzKTogYW55IHtcclxuICAgICAgICBjb25zb2xlLndhcm4gPSBvcmlnQ29uc29sZU1ldGhvZHNbXCJ3YXJuXCJdO1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IgPSBvcmlnQ29uc29sZU1ldGhvZHNbXCJlcnJvclwiXTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgaW5mbyhtZXNzYWdlPzogYW55LCAuLi5vcHRpb25hbFBhcmFtczogYW55W10pOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbG9nKG1lc3NhZ2U/OiBhbnksIC4uLm9wdGlvbmFsUGFyYW1zOiBhbnlbXSk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICB3YXJuKG1lc3NhZ2U/OiBhbnksIC4uLm9wdGlvbmFsUGFyYW1zOiBhbnlbXSk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBlcnJvcihtZXNzYWdlPzogYW55LCAuLi5vcHRpb25hbFBhcmFtczogYW55W10pOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgYXNzZXJ0KGNvbmRpdGlvbj86IGJvb2xlYW4gfCB1bmRlZmluZWQsIG1lc3NhZ2U/OiBzdHJpbmcgfCB1bmRlZmluZWQsIC4uLmRhdGE6IGFueVtdKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyKCk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuICAgIGNvdW50KGxhYmVsPzogc3RyaW5nIHwgdW5kZWZpbmVkKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG4gICAgZGVidWcobWVzc2FnZT86IGFueSwgLi4ub3B0aW9uYWxQYXJhbXM6IGFueVtdKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG4gICAgZGlyKHZhbHVlPzogYW55LCAuLi5vcHRpb25hbFBhcmFtczogYW55W10pOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcbiAgICBkaXJ4bWwodmFsdWU6IGFueSk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBleGNlcHRpb24obWVzc2FnZT86IHN0cmluZyB8IHVuZGVmaW5lZCwgLi4ub3B0aW9uYWxQYXJhbXM6IGFueVtdKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG4gICAgZ3JvdXAoZ3JvdXBUaXRsZT86IHN0cmluZyB8IHVuZGVmaW5lZCwgLi4ub3B0aW9uYWxQYXJhbXM6IGFueVtdKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG4gICAgZ3JvdXBDb2xsYXBzZWQoZ3JvdXBUaXRsZT86IHN0cmluZyB8IHVuZGVmaW5lZCwgLi4ub3B0aW9uYWxQYXJhbXM6IGFueVtdKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG4gICAgZ3JvdXBFbmQoKTogdm9pZCB7XHJcbiAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgbWFya1RpbWVsaW5lKGxhYmVsPzogc3RyaW5nIHwgdW5kZWZpbmVkKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG4gICAgbXNJc0luZGVwZW5kZW50bHlDb21wb3NlZChlbGVtZW50OiBFbGVtZW50KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcHJvZmlsZShyZXBvcnROYW1lPzogc3RyaW5nIHwgdW5kZWZpbmVkKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG4gICAgcHJvZmlsZUVuZCgpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcbiAgICBzZWxlY3QoZWxlbWVudDogRWxlbWVudCk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuICAgIHRhYmxlKC4uLnRhYnVsYXJEYXRhOiBhbnlbXSk6IHZvaWQge1xyXG4gICBcclxuICAgIH1cclxuICAgIHRpbWUobGFiZWw/OiBzdHJpbmcgfCB1bmRlZmluZWQpOiB2b2lkIHtcclxuICAgIFxyXG4gICAgfVxyXG4gICAgdGltZUVuZChsYWJlbD86IHN0cmluZyB8IHVuZGVmaW5lZCk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuICAgIHRpbWVTdGFtcChsYWJlbD86IHN0cmluZyB8IHVuZGVmaW5lZCk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuICAgIHRpbWVsaW5lKGxhYmVsPzogc3RyaW5nIHwgdW5kZWZpbmVkKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG4gICAgdGltZWxpbmVFbmQobGFiZWw/OiBzdHJpbmcgfCB1bmRlZmluZWQpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcbiAgICB0cmFjZShtZXNzYWdlPzogYW55LCAuLi5vcHRpb25hbFBhcmFtczogYW55W10pOiB2b2lkIHtcclxuIFxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcbmV4cG9ydCB7QXBwQ29uc29sZX07Il19