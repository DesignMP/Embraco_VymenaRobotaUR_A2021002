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
define(["require", "exports", "../../models/dataModelBase", "../../models/online/componentsDataModel"], function (require, exports, dataModelBase_1, componentsDataModel_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * implements the data model for the mappCockpit
     *
     * @class MappCockpitDataModel
     * @implements {IMappCockpitDataModel}
     */
    var MappCockpitDataModel = /** @class */ (function (_super) {
        __extends(MappCockpitDataModel, _super);
        function MappCockpitDataModel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(MappCockpitDataModel.prototype, "mappCockpitComponentDataModel", {
            get: function () { return this.dataSource; },
            enumerable: true,
            configurable: true
        });
        ;
        /**
         * initializes the data model
         *
         * @memberof MappCockpitDataModel
         */
        MappCockpitDataModel.prototype.initialize = function () {
            // the main data models data source is the mapp cockpit component data model
            var mappCockpitComponentDataModel = new componentsDataModel_1.MappCockpitComponentDataModel();
            this.dataSource = mappCockpitComponentDataModel;
            mappCockpitComponentDataModel.initialize();
        };
        /**
         * Dispose the MappCockpitDataModel
         *
         * @memberof MappCockpitDataModel
         */
        MappCockpitDataModel.prototype.dispose = function () {
            this.mappCockpitComponentDataModel.dispose();
            _super.prototype.dispose.call(this);
        };
        /**
         * updates the data model
         *
         * @memberof MappCockpitDataModel
         */
        MappCockpitDataModel.prototype.connect = function () {
            this.mappCockpitComponentDataModel.connect();
        };
        return MappCockpitDataModel;
    }(dataModelBase_1.DataModelBase));
    exports.MappCockpitDataModel = MappCockpitDataModel;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcENvY2twaXREYXRhTW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9tYXBwQ29ja3BpdERhdGFNb2RlbC9tYXBwQ29ja3BpdERhdGFNb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBS0E7Ozs7O09BS0c7SUFDSDtRQUFtQyx3Q0FBYTtRQUFoRDs7UUFvQ0EsQ0FBQztRQWxDRyxzQkFBWSwrREFBNkI7aUJBQXpDLGNBQTZFLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7OztXQUFBO1FBQUEsQ0FBQztRQUV2Rzs7OztXQUlHO1FBQ0gseUNBQVUsR0FBVjtZQUVJLDRFQUE0RTtZQUM1RSxJQUFJLDZCQUE2QixHQUFHLElBQUksbURBQTZCLEVBQUUsQ0FBQztZQUN4RSxJQUFJLENBQUMsVUFBVSxHQUFHLDZCQUE2QixDQUFDO1lBQ2hELDZCQUE2QixDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQy9DLENBQUM7UUFFRDs7OztXQUlHO1FBQ0gsc0NBQU8sR0FBUDtZQUNJLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUM3QyxpQkFBTSxPQUFPLFdBQUUsQ0FBQztRQUNwQixDQUFDO1FBRUQ7Ozs7V0FJRztRQUNILHNDQUFPLEdBQVA7WUFDSSxJQUFJLENBQUMsNkJBQTZCLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDakQsQ0FBQztRQUVMLDJCQUFDO0lBQUQsQ0FBQyxBQXBDRCxDQUFtQyw2QkFBYSxHQW9DL0M7SUFFUSxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEYXRhTW9kZWxCYXNlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9kYXRhTW9kZWxCYXNlXCI7XHJcbmltcG9ydCB7IElNYXBwQ29ja3BpdERhdGFNb2RlbCB9IGZyb20gXCIuL21hcHBDb2NrcGl0RGF0YU1vZGVsSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsIH0gZnJvbSBcIi4uLy4uL21vZGVscy9vbmxpbmUvY29tcG9uZW50c0RhdGFNb2RlbFwiO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBpbXBsZW1lbnRzIHRoZSBkYXRhIG1vZGVsIGZvciB0aGUgbWFwcENvY2twaXRcclxuICpcclxuICogQGNsYXNzIE1hcHBDb2NrcGl0RGF0YU1vZGVsXHJcbiAqIEBpbXBsZW1lbnRzIHtJTWFwcENvY2twaXREYXRhTW9kZWx9XHJcbiAqL1xyXG5jbGFzcyBNYXBwQ29ja3BpdERhdGFNb2RlbCBleHRlbmRzIERhdGFNb2RlbEJhc2UgaW1wbGVtZW50cyBJTWFwcENvY2twaXREYXRhTW9kZWx7XHJcblxyXG4gICAgcHJpdmF0ZSBnZXQgbWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWwoKTogTWFwcENvY2twaXRDb21wb25lbnREYXRhTW9kZWwgeyByZXR1cm4gdGhpcy5kYXRhU291cmNlOyB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogaW5pdGlhbGl6ZXMgdGhlIGRhdGEgbW9kZWxcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgaW5pdGlhbGl6ZSgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgLy8gdGhlIG1haW4gZGF0YSBtb2RlbHMgZGF0YSBzb3VyY2UgaXMgdGhlIG1hcHAgY29ja3BpdCBjb21wb25lbnQgZGF0YSBtb2RlbFxyXG4gICAgICAgIGxldCBtYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbCA9IG5ldyBNYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbCgpO1xyXG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZSA9IG1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsO1xyXG4gICAgICAgIG1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsLmluaXRpYWxpemUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc3Bvc2UgdGhlIE1hcHBDb2NrcGl0RGF0YU1vZGVsXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIGRpc3Bvc2UoKXtcclxuICAgICAgICB0aGlzLm1hcHBDb2NrcGl0Q29tcG9uZW50RGF0YU1vZGVsLmRpc3Bvc2UoKTtcclxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB1cGRhdGVzIHRoZSBkYXRhIG1vZGVsXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0RGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIGNvbm5lY3QoKSB7ICAgICAgICAgICAgXHJcbiAgICAgICAgdGhpcy5tYXBwQ29ja3BpdENvbXBvbmVudERhdGFNb2RlbC5jb25uZWN0KCk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgeyBNYXBwQ29ja3BpdERhdGFNb2RlbCB9OyJdfQ==