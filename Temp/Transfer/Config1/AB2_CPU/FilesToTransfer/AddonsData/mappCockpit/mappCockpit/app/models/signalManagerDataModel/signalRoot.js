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
define(["require", "exports", "./signalCategory", "../common/signal/serieContainer"], function (require, exports, signalCategory_1, serieContainer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SignalRoot = /** @class */ (function (_super) {
        __extends(SignalRoot, _super);
        /**
         * Creates an instance of the SignalRoot
         * @memberof SignalRoot
         */
        function SignalRoot(dataModel) {
            var _this = _super.call(this, name) || this;
            _this.dataModel = dataModel;
            _this.setDefaultData();
            return _this;
        }
        /**
         * Clears all the data and sets the default categories
         *
         * @memberof SignalRoot
         */
        SignalRoot.prototype.clear = function () {
            var categories = this.childs;
            // Remove all categories with data
            categories.forEach(function (category) {
                category.clear();
            });
            this.setDefaultData();
        };
        /**
         * Creates a new data array and sets the default categories
         *
         * @private
         * @memberof SignalRoot
         */
        SignalRoot.prototype.setDefaultData = function () {
            // Create new data array
            this.childs = new Array();
            // Add default categories
            this.addDefaultCategories();
        };
        /**
         * Adds the main categories (Uploaded, Imported, Calculated, ...) to the SignalRoot
         *
         * @private
         * @memberof SignalRoot
         */
        SignalRoot.prototype.addDefaultCategories = function () {
            this.addSerieContainer(new signalCategory_1.SignalCategory(signalCategory_1.SignalCategory.CategoryIdRecent));
            this.addSerieContainer(new signalCategory_1.SignalCategory(signalCategory_1.SignalCategory.CategoryIdUploaded));
            this.addSerieContainer(new signalCategory_1.SignalCategory(signalCategory_1.SignalCategory.CategoryIdImported));
            //this.addSerieContainer(new SignalCategory(SignalCategory.CategoryIdCalculated));
        };
        return SignalRoot;
    }(serieContainer_1.SerieContainer));
    exports.SignalRoot = SignalRoot;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsUm9vdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvc2lnbmFsUm9vdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBTUE7UUFBZ0MsOEJBQWM7UUFLMUM7OztXQUdHO1FBQ0gsb0JBQVksU0FBa0M7WUFBOUMsWUFDSSxrQkFBTSxJQUFJLENBQUMsU0FLZDtZQUhHLEtBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1lBRTNCLEtBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzs7UUFDMUIsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSCwwQkFBSyxHQUFMO1lBQ0ksSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUU3QixrQ0FBa0M7WUFDbEMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFBLFFBQVE7Z0JBQ3ZCLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNyQixDQUFDLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUMxQixDQUFDO1FBR0Q7Ozs7O1dBS0c7UUFDSyxtQ0FBYyxHQUF0QjtZQUNJLHdCQUF3QjtZQUN4QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksS0FBSyxFQUFtQixDQUFDO1lBRTNDLHlCQUF5QjtZQUN6QixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUNoQyxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSyx5Q0FBb0IsR0FBNUI7WUFDSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSwrQkFBYyxDQUFDLCtCQUFjLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1lBQzVFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLCtCQUFjLENBQUMsK0JBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7WUFDOUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksK0JBQWMsQ0FBQywrQkFBYyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztZQUM5RSxrRkFBa0Y7UUFDdEYsQ0FBQztRQUNMLGlCQUFDO0lBQUQsQ0FBQyxBQTVERCxDQUFnQywrQkFBYyxHQTREN0M7SUE1RFksZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJU2lnbmFsUm9vdCB9IGZyb20gXCIuL2ludGVyZmFjZXMvc2lnbmFsUm9vdEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJU2lnbmFsQ2F0ZWdvcnkgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL3NpZ25hbENhdGVnb3J5SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNpZ25hbENhdGVnb3J5IH0gZnJvbSBcIi4vc2lnbmFsQ2F0ZWdvcnlcIjtcclxuaW1wb3J0IHsgU2VyaWVDb250YWluZXIgfSBmcm9tIFwiLi4vY29tbW9uL3NpZ25hbC9zZXJpZUNvbnRhaW5lclwiO1xyXG5pbXBvcnQgeyBJU2lnbmFsTWFuYWdlckRhdGFNb2RlbCB9IGZyb20gXCIuLi9kYXRhTW9kZWxzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU2lnbmFsUm9vdCBleHRlbmRzIFNlcmllQ29udGFpbmVyIGltcGxlbWVudHMgSVNpZ25hbFJvb3R7XHJcblxyXG4gICAgZGF0YU1vZGVsOiBJU2lnbmFsTWFuYWdlckRhdGFNb2RlbDtcclxuICAgIGNoaWxkcyE6IElTaWduYWxDYXRlZ29yeVtdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiB0aGUgU2lnbmFsUm9vdFxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbFJvb3RcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoZGF0YU1vZGVsOiBJU2lnbmFsTWFuYWdlckRhdGFNb2RlbCl7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcblxyXG4gICAgICAgIHRoaXMuZGF0YU1vZGVsID0gZGF0YU1vZGVsO1xyXG5cclxuICAgICAgICB0aGlzLnNldERlZmF1bHREYXRhKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDbGVhcnMgYWxsIHRoZSBkYXRhIGFuZCBzZXRzIHRoZSBkZWZhdWx0IGNhdGVnb3JpZXNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsUm9vdFxyXG4gICAgICovXHJcbiAgICBjbGVhcigpe1xyXG4gICAgICAgIGxldCBjYXRlZ29yaWVzID0gdGhpcy5jaGlsZHM7XHJcblxyXG4gICAgICAgIC8vIFJlbW92ZSBhbGwgY2F0ZWdvcmllcyB3aXRoIGRhdGFcclxuICAgICAgICBjYXRlZ29yaWVzLmZvckVhY2goY2F0ZWdvcnkgPT4ge1xyXG4gICAgICAgICAgICBjYXRlZ29yeS5jbGVhcigpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnNldERlZmF1bHREYXRhKCk7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBuZXcgZGF0YSBhcnJheSBhbmQgc2V0cyB0aGUgZGVmYXVsdCBjYXRlZ29yaWVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxSb290XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0RGVmYXVsdERhdGEoKXtcclxuICAgICAgICAvLyBDcmVhdGUgbmV3IGRhdGEgYXJyYXlcclxuICAgICAgICB0aGlzLmNoaWxkcyA9IG5ldyBBcnJheTxJU2lnbmFsQ2F0ZWdvcnk+KCk7XHJcblxyXG4gICAgICAgIC8vIEFkZCBkZWZhdWx0IGNhdGVnb3JpZXNcclxuICAgICAgICB0aGlzLmFkZERlZmF1bHRDYXRlZ29yaWVzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIHRoZSBtYWluIGNhdGVnb3JpZXMgKFVwbG9hZGVkLCBJbXBvcnRlZCwgQ2FsY3VsYXRlZCwgLi4uKSB0byB0aGUgU2lnbmFsUm9vdFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsUm9vdFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZERlZmF1bHRDYXRlZ29yaWVzKCl7XHJcbiAgICAgICAgdGhpcy5hZGRTZXJpZUNvbnRhaW5lcihuZXcgU2lnbmFsQ2F0ZWdvcnkoU2lnbmFsQ2F0ZWdvcnkuQ2F0ZWdvcnlJZFJlY2VudCkpO1xyXG4gICAgICAgIHRoaXMuYWRkU2VyaWVDb250YWluZXIobmV3IFNpZ25hbENhdGVnb3J5KFNpZ25hbENhdGVnb3J5LkNhdGVnb3J5SWRVcGxvYWRlZCkpO1xyXG4gICAgICAgIHRoaXMuYWRkU2VyaWVDb250YWluZXIobmV3IFNpZ25hbENhdGVnb3J5KFNpZ25hbENhdGVnb3J5LkNhdGVnb3J5SWRJbXBvcnRlZCkpO1xyXG4gICAgICAgIC8vdGhpcy5hZGRTZXJpZUNvbnRhaW5lcihuZXcgU2lnbmFsQ2F0ZWdvcnkoU2lnbmFsQ2F0ZWdvcnkuQ2F0ZWdvcnlJZENhbGN1bGF0ZWQpKTtcclxuICAgIH1cclxufSJdfQ==