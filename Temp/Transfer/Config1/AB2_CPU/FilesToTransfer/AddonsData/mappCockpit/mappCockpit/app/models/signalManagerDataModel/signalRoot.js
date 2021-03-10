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
            _this.childs = new Array();
            _this.addDefaultCategories();
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
            // add default categories
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsUm9vdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvc2lnbmFsUm9vdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBTUE7UUFBZ0MsOEJBQWM7UUFLMUM7OztXQUdHO1FBQ0gsb0JBQVksU0FBa0M7WUFBOUMsWUFDSSxrQkFBTSxJQUFJLENBQUMsU0FPZDtZQUxHLEtBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1lBRTNCLEtBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQW1CLENBQUM7WUFFM0MsS0FBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7O1FBQ2hDLENBQUM7UUFFRDs7OztXQUlHO1FBQ0gsMEJBQUssR0FBTDtZQUNJLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFFN0Isa0NBQWtDO1lBQ2xDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQSxRQUFRO2dCQUN2QixRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDckIsQ0FBQyxDQUFDLENBQUM7WUFFSCx5QkFBeUI7WUFDekIsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDaEMsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0sseUNBQW9CLEdBQTVCO1lBQ0ksSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksK0JBQWMsQ0FBQywrQkFBYyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztZQUM1RSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSwrQkFBYyxDQUFDLCtCQUFjLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1lBQzlFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLCtCQUFjLENBQUMsK0JBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7WUFDOUUsa0ZBQWtGO1FBQ3RGLENBQUM7UUFDTCxpQkFBQztJQUFELENBQUMsQUFoREQsQ0FBZ0MsK0JBQWMsR0FnRDdDO0lBaERZLGdDQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVNpZ25hbFJvb3QgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL3NpZ25hbFJvb3RJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVNpZ25hbENhdGVnb3J5IH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9zaWduYWxDYXRlZ29yeUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTaWduYWxDYXRlZ29yeSB9IGZyb20gXCIuL3NpZ25hbENhdGVnb3J5XCI7XHJcbmltcG9ydCB7IFNlcmllQ29udGFpbmVyIH0gZnJvbSBcIi4uL2NvbW1vbi9zaWduYWwvc2VyaWVDb250YWluZXJcIjtcclxuaW1wb3J0IHsgSVNpZ25hbE1hbmFnZXJEYXRhTW9kZWwgfSBmcm9tIFwiLi4vZGF0YU1vZGVsc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNpZ25hbFJvb3QgZXh0ZW5kcyBTZXJpZUNvbnRhaW5lciBpbXBsZW1lbnRzIElTaWduYWxSb290e1xyXG5cclxuICAgIGRhdGFNb2RlbDogSVNpZ25hbE1hbmFnZXJEYXRhTW9kZWw7XHJcbiAgICBjaGlsZHM6IElTaWduYWxDYXRlZ29yeVtdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiB0aGUgU2lnbmFsUm9vdFxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbFJvb3RcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoZGF0YU1vZGVsOiBJU2lnbmFsTWFuYWdlckRhdGFNb2RlbCl7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcblxyXG4gICAgICAgIHRoaXMuZGF0YU1vZGVsID0gZGF0YU1vZGVsO1xyXG5cclxuICAgICAgICB0aGlzLmNoaWxkcyA9IG5ldyBBcnJheTxJU2lnbmFsQ2F0ZWdvcnk+KCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5hZGREZWZhdWx0Q2F0ZWdvcmllcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2xlYXJzIGFsbCB0aGUgZGF0YSBhbmQgc2V0cyB0aGUgZGVmYXVsdCBjYXRlZ29yaWVzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbFJvb3RcclxuICAgICAqL1xyXG4gICAgY2xlYXIoKXtcclxuICAgICAgICBsZXQgY2F0ZWdvcmllcyA9IHRoaXMuY2hpbGRzO1xyXG5cclxuICAgICAgICAvLyBSZW1vdmUgYWxsIGNhdGVnb3JpZXMgd2l0aCBkYXRhXHJcbiAgICAgICAgY2F0ZWdvcmllcy5mb3JFYWNoKGNhdGVnb3J5ID0+IHtcclxuICAgICAgICAgICAgY2F0ZWdvcnkuY2xlYXIoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gYWRkIGRlZmF1bHQgY2F0ZWdvcmllc1xyXG4gICAgICAgIHRoaXMuYWRkRGVmYXVsdENhdGVnb3JpZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgdGhlIG1haW4gY2F0ZWdvcmllcyAoVXBsb2FkZWQsIEltcG9ydGVkLCBDYWxjdWxhdGVkLCAuLi4pIHRvIHRoZSBTaWduYWxSb290XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxSb290XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkRGVmYXVsdENhdGVnb3JpZXMoKXtcclxuICAgICAgICB0aGlzLmFkZFNlcmllQ29udGFpbmVyKG5ldyBTaWduYWxDYXRlZ29yeShTaWduYWxDYXRlZ29yeS5DYXRlZ29yeUlkUmVjZW50KSk7XHJcbiAgICAgICAgdGhpcy5hZGRTZXJpZUNvbnRhaW5lcihuZXcgU2lnbmFsQ2F0ZWdvcnkoU2lnbmFsQ2F0ZWdvcnkuQ2F0ZWdvcnlJZFVwbG9hZGVkKSk7XHJcbiAgICAgICAgdGhpcy5hZGRTZXJpZUNvbnRhaW5lcihuZXcgU2lnbmFsQ2F0ZWdvcnkoU2lnbmFsQ2F0ZWdvcnkuQ2F0ZWdvcnlJZEltcG9ydGVkKSk7XHJcbiAgICAgICAgLy90aGlzLmFkZFNlcmllQ29udGFpbmVyKG5ldyBTaWduYWxDYXRlZ29yeShTaWduYWxDYXRlZ29yeS5DYXRlZ29yeUlkQ2FsY3VsYXRlZCkpO1xyXG4gICAgfVxyXG59Il19