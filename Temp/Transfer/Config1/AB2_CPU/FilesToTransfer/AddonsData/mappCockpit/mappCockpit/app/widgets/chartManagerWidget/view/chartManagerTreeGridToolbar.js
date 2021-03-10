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
define(["require", "exports", "../../../models/chartManagerDataModel/chartManagerChart", "../../common/treeGridToolbarBase", "../../../common/directoryProvider", "../../../models/chartManagerDataModel/baseSeries", "../../../models/chartManagerDataModel/scale", "./chartManagerTreeGridBoilerPlate"], function (require, exports, chartManagerChart_1, treeGridToolbarBase_1, directoryProvider_1, baseSeries_1, scale_1, chartManagerTreeGridBoilerPlate_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ChartManagerTreeGridToolbar = /** @class */ (function (_super) {
        __extends(ChartManagerTreeGridToolbar, _super);
        /**
         * Creates an instance of ChartManagerTreeGridToolbar.
         * @param {string} parentId
         * @param {IChartManagerDataModel} dataModel
         * @memberof ChartManagerTreeGridToolbar
         */
        function ChartManagerTreeGridToolbar(parentId, dataModel) {
            var _this = _super.call(this, parentId) || this;
            _this._toolbarIdAdd = "Add";
            _this._toolbarToolTipAdd = "Adds a new chart/scale";
            _this._toolbarIdDelete = "Delete";
            _this._toolbarToolTipDelete = "Deletes a chart, a scale or a signal";
            _this.dataModel = dataModel;
            _this.boilerPlate = new chartManagerTreeGridBoilerPlate_1.ChartManagerTreeGridBoilerPlate(_this.dataModel, _this._parentId);
            var imageDirectory = "../../../" + directoryProvider_1.DirectoryProvider.getWidgetsDirectory() + "chartManagerWidget/style/images/";
            _this.addToolbarButton(_this._toolbarIdAdd, _this._toolbarToolTipAdd, imageDirectory + "add.svg");
            _this.addToolbarButton(_this._toolbarIdDelete, _this._toolbarToolTipDelete, imageDirectory + "delete.svg");
            _this.addCollapseButton();
            _this.addExpandButton();
            return _this;
        }
        /**
         * Reacts on toolbar click
         *
         * @param {*} args
         * @memberof ChartManagerTreeGridToolbar
         */
        ChartManagerTreeGridToolbar.prototype.toolbarClick = function (args) {
            _super.prototype.toolbarClickBase.call(this, args);
            var clickedToolbarId = this.getClickedToolbarId(args.itemName, args.model.toolbarSettings);
            if (clickedToolbarId == this._toolbarIdAdd) {
                args.cancel = true;
                if (!this.boilerPlate.isOpened) {
                    this.boilerPlate.showBoilerplate(this.selectedChart);
                }
                else {
                    this.boilerPlate.hideBoilerplate();
                }
            }
            else if (clickedToolbarId == this._toolbarIdDelete) {
                args.cancel = true;
                this.deleteItem(args.model.selectedItem);
            }
        };
        /**
         * deletes the given datamodel item(chart, scale, serie) from the datamodel
         *
         * @private
         * @param {*} selectedModelItem
         * @memberof ChartManagerTreeGridToolbar
         */
        ChartManagerTreeGridToolbar.prototype.deleteItem = function (selectedModelItem) {
            var selectedItem = selectedModelItem.item;
            if (selectedModelItem != null) {
                if (selectedItem instanceof chartManagerChart_1.ChartManagerChart) {
                    // Remove chart from datamodel
                    this.dataModel.removeChart(selectedItem);
                }
                else if (selectedItem instanceof baseSeries_1.BaseSeries) {
                    var chart = selectedModelItem.parentItem.parentItem.item;
                    if (chart != undefined) {
                        // Remove serie from datamodel
                        this.dataModel.removeSerie(chart, selectedItem);
                    }
                }
                else if (selectedItem instanceof scale_1.Scale) {
                    var chart = selectedModelItem.parentItem.item;
                    if (chart != undefined) {
                        // Remove yAxis from datamodel
                        this.dataModel.removeYAxis(chart, selectedItem);
                    }
                }
            }
        };
        /**
         * Disables/Enables the delete chart/serie button in the toolbar
         *
         * @param {boolean} disable
         * @memberof ChartManagerTreeGridToolbar
         */
        ChartManagerTreeGridToolbar.prototype.disableDeleteButton = function (disable) {
            this.disableButton(this._toolbarIdDelete, disable);
        };
        /**
         * Disables/Enables the add chart button in the toolbar
         *
         * @param {boolean} disable
         * @memberof ChartManagerTreeGridToolbar
         */
        ChartManagerTreeGridToolbar.prototype.disableAddButton = function (disable) {
            this.disableButton(this._toolbarIdAdd, disable);
        };
        /**
         * sets the current selected chart
         *
         * @param {(IChartManagerChart|Scale|BaseSeries)} chart
         * @memberof ChartManagerTreeGridToolbar
         */
        ChartManagerTreeGridToolbar.prototype.setSelectedChart = function (chart) {
            if (chart instanceof chartManagerChart_1.ChartManagerChart) {
                this.selectedChart = chart;
            }
            else {
                this.selectedChart = undefined;
            }
        };
        return ChartManagerTreeGridToolbar;
    }(treeGridToolbarBase_1.TreeGridToolbarBase));
    exports.ChartManagerTreeGridToolbar = ChartManagerTreeGridToolbar;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRNYW5hZ2VyVHJlZUdyaWRUb29sYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0TWFuYWdlcldpZGdldC92aWV3L2NoYXJ0TWFuYWdlclRyZWVHcmlkVG9vbGJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBU0E7UUFBaUQsK0NBQW1CO1FBV2hFOzs7OztXQUtHO1FBQ0gscUNBQVksUUFBZ0IsRUFBRSxTQUFpQztZQUEvRCxZQUNJLGtCQUFNLFFBQVEsQ0FBQyxTQVlsQjtZQTVCZ0IsbUJBQWEsR0FBRSxLQUFLLENBQUM7WUFDckIsd0JBQWtCLEdBQUUsd0JBQXdCLENBQUM7WUFLN0Msc0JBQWdCLEdBQUUsUUFBUSxDQUFDO1lBQzNCLDJCQUFxQixHQUFFLHNDQUFzQyxDQUFDO1lBVzNFLEtBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1lBQzNCLEtBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxpRUFBK0IsQ0FBQyxLQUFJLENBQUMsU0FBUyxFQUFFLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUV2RixJQUFJLGNBQWMsR0FBRyxXQUFXLEdBQUcscUNBQWlCLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxrQ0FBa0MsQ0FBQztZQUVoSCxLQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSSxDQUFDLGFBQWEsRUFBRSxLQUFJLENBQUMsa0JBQWtCLEVBQUUsY0FBYyxHQUFHLFNBQVMsQ0FBQyxDQUFDO1lBQy9GLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFJLENBQUMsZ0JBQWdCLEVBQUUsS0FBSSxDQUFDLHFCQUFxQixFQUFFLGNBQWMsR0FBRyxZQUFZLENBQUMsQ0FBQztZQUV4RyxLQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUN6QixLQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7O1FBQzNCLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNJLGtEQUFZLEdBQW5CLFVBQXFCLElBQUk7WUFDckIsaUJBQU0sZ0JBQWdCLFlBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0IsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQzNGLElBQUksZ0JBQWdCLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtnQkFDeEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBQztvQkFDM0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2lCQUN4RDtxQkFBTTtvQkFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsRUFBRSxDQUFDO2lCQUN0QzthQUNKO2lCQUNJLElBQUksZ0JBQWdCLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO2dCQUNoRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQzVDO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLGdEQUFVLEdBQWxCLFVBQW1CLGlCQUFpQjtZQUNoQyxJQUFJLFlBQVksR0FBRyxpQkFBaUIsQ0FBQyxJQUFJLENBQUM7WUFDMUMsSUFBSSxpQkFBaUIsSUFBSSxJQUFJLEVBQUU7Z0JBQzNCLElBQUcsWUFBWSxZQUFZLHFDQUFpQixFQUFDO29CQUN6Qyw4QkFBOEI7b0JBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO2lCQUM1QztxQkFDSSxJQUFHLFlBQVksWUFBWSx1QkFBVSxFQUFDO29CQUN2QyxJQUFJLEtBQUssR0FBaUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7b0JBQ3ZGLElBQUcsS0FBSyxJQUFJLFNBQVMsRUFBQzt3QkFDbEIsOEJBQThCO3dCQUM5QixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUM7cUJBQ25EO2lCQUNKO3FCQUNJLElBQUcsWUFBWSxZQUFZLGFBQUssRUFBQztvQkFDbEMsSUFBSSxLQUFLLEdBQWlDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7b0JBQzVFLElBQUcsS0FBSyxJQUFJLFNBQVMsRUFBQzt3QkFDbEIsOEJBQThCO3dCQUM5QixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUM7cUJBQ25EO2lCQUNKO2FBQ0o7UUFDTCxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSSx5REFBbUIsR0FBMUIsVUFBMkIsT0FBZ0I7WUFDdkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDdkQsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0ksc0RBQWdCLEdBQXZCLFVBQXdCLE9BQWdCO1lBQ3BDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNwRCxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSSxzREFBZ0IsR0FBdkIsVUFBeUIsS0FBMEM7WUFDL0QsSUFBSSxLQUFLLFlBQVkscUNBQWlCLEVBQUU7Z0JBQ3BDLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO2FBQzlCO2lCQUFNO2dCQUNILElBQUksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO2FBQ2xDO1FBQ0wsQ0FBQztRQUNMLGtDQUFDO0lBQUQsQ0FBQyxBQXZIRCxDQUFpRCx5Q0FBbUIsR0F1SG5FO0lBdkhZLGtFQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYXJ0TWFuYWdlckNoYXJ0IH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvY2hhcnRNYW5hZ2VyQ2hhcnRcIjtcclxuaW1wb3J0IHsgSUNoYXJ0TWFuYWdlckNoYXJ0IH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvaW50ZXJmYWNlcy9jaGFydE1hbmFnZXJDaGFydEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUcmVlR3JpZFRvb2xiYXJCYXNlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi90cmVlR3JpZFRvb2xiYXJCYXNlXCI7XHJcbmltcG9ydCB7IERpcmVjdG9yeVByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9kaXJlY3RvcnlQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvYmFzZVNlcmllc1wiO1xyXG5pbXBvcnQgeyBTY2FsZSB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL3NjYWxlXCI7XHJcbmltcG9ydCB7IElDaGFydE1hbmFnZXJEYXRhTW9kZWwgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9pbnRlcmZhY2VzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDaGFydE1hbmFnZXJUcmVlR3JpZEJvaWxlclBsYXRlIH0gZnJvbSBcIi4vY2hhcnRNYW5hZ2VyVHJlZUdyaWRCb2lsZXJQbGF0ZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENoYXJ0TWFuYWdlclRyZWVHcmlkVG9vbGJhciBleHRlbmRzIFRyZWVHcmlkVG9vbGJhckJhc2V7XHJcbiAgICBcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3Rvb2xiYXJJZEFkZCA9XCJBZGRcIjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3Rvb2xiYXJUb29sVGlwQWRkID1cIkFkZHMgYSBuZXcgY2hhcnQvc2NhbGVcIjtcclxuICAgIHByaXZhdGUgZGF0YU1vZGVsOiBJQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsO1xyXG4gICAgcHJpdmF0ZSBzZWxlY3RlZENoYXJ0OiBJQ2hhcnRNYW5hZ2VyQ2hhcnR8dW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBib2lsZXJQbGF0ZTogQ2hhcnRNYW5hZ2VyVHJlZUdyaWRCb2lsZXJQbGF0ZTtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF90b29sYmFySWREZWxldGUgPVwiRGVsZXRlXCI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF90b29sYmFyVG9vbFRpcERlbGV0ZSA9XCJEZWxldGVzIGEgY2hhcnQsIGEgc2NhbGUgb3IgYSBzaWduYWxcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQ2hhcnRNYW5hZ2VyVHJlZUdyaWRUb29sYmFyLlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhcmVudElkXHJcbiAgICAgKiBAcGFyYW0ge0lDaGFydE1hbmFnZXJEYXRhTW9kZWx9IGRhdGFNb2RlbFxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlclRyZWVHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRJZDogc3RyaW5nLCBkYXRhTW9kZWw6IElDaGFydE1hbmFnZXJEYXRhTW9kZWwpe1xyXG4gICAgICAgIHN1cGVyKHBhcmVudElkKTtcclxuXHJcbiAgICAgICAgdGhpcy5kYXRhTW9kZWwgPSBkYXRhTW9kZWw7XHJcbiAgICAgICAgdGhpcy5ib2lsZXJQbGF0ZSA9IG5ldyBDaGFydE1hbmFnZXJUcmVlR3JpZEJvaWxlclBsYXRlKHRoaXMuZGF0YU1vZGVsLCB0aGlzLl9wYXJlbnRJZCk7XHJcblxyXG4gICAgICAgIGxldCBpbWFnZURpcmVjdG9yeSA9IFwiLi4vLi4vLi4vXCIgKyBEaXJlY3RvcnlQcm92aWRlci5nZXRXaWRnZXRzRGlyZWN0b3J5KCkgKyBcImNoYXJ0TWFuYWdlcldpZGdldC9zdHlsZS9pbWFnZXMvXCI7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkVG9vbGJhckJ1dHRvbih0aGlzLl90b29sYmFySWRBZGQsIHRoaXMuX3Rvb2xiYXJUb29sVGlwQWRkLCBpbWFnZURpcmVjdG9yeSArIFwiYWRkLnN2Z1wiKTtcclxuICAgICAgICB0aGlzLmFkZFRvb2xiYXJCdXR0b24odGhpcy5fdG9vbGJhcklkRGVsZXRlLCB0aGlzLl90b29sYmFyVG9vbFRpcERlbGV0ZSwgaW1hZ2VEaXJlY3RvcnkgKyBcImRlbGV0ZS5zdmdcIik7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkQ29sbGFwc2VCdXR0b24oKTtcclxuICAgICAgICB0aGlzLmFkZEV4cGFuZEJ1dHRvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhY3RzIG9uIHRvb2xiYXIgY2xpY2tcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJUcmVlR3JpZFRvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHRvb2xiYXJDbGljayAoYXJncyl7XHJcbiAgICAgICAgc3VwZXIudG9vbGJhckNsaWNrQmFzZShhcmdzKTtcclxuICAgICAgICB2YXIgY2xpY2tlZFRvb2xiYXJJZCA9IHRoaXMuZ2V0Q2xpY2tlZFRvb2xiYXJJZChhcmdzLml0ZW1OYW1lLCBhcmdzLm1vZGVsLnRvb2xiYXJTZXR0aW5ncyk7XHJcbiAgICAgICAgaWYgKGNsaWNrZWRUb29sYmFySWQgPT0gdGhpcy5fdG9vbGJhcklkQWRkKSB7XHJcbiAgICAgICAgICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmJvaWxlclBsYXRlLmlzT3BlbmVkKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYm9pbGVyUGxhdGUuc2hvd0JvaWxlcnBsYXRlKHRoaXMuc2VsZWN0ZWRDaGFydCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJvaWxlclBsYXRlLmhpZGVCb2lsZXJwbGF0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGNsaWNrZWRUb29sYmFySWQgPT0gdGhpcy5fdG9vbGJhcklkRGVsZXRlKSB7XHJcbiAgICAgICAgICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5kZWxldGVJdGVtKGFyZ3MubW9kZWwuc2VsZWN0ZWRJdGVtKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBkZWxldGVzIHRoZSBnaXZlbiBkYXRhbW9kZWwgaXRlbShjaGFydCwgc2NhbGUsIHNlcmllKSBmcm9tIHRoZSBkYXRhbW9kZWxcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBzZWxlY3RlZE1vZGVsSXRlbVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlclRyZWVHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRlbGV0ZUl0ZW0oc2VsZWN0ZWRNb2RlbEl0ZW0pe1xyXG4gICAgICAgIGxldCBzZWxlY3RlZEl0ZW0gPSBzZWxlY3RlZE1vZGVsSXRlbS5pdGVtO1xyXG4gICAgICAgIGlmIChzZWxlY3RlZE1vZGVsSXRlbSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmKHNlbGVjdGVkSXRlbSBpbnN0YW5jZW9mIENoYXJ0TWFuYWdlckNoYXJ0KXtcclxuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBjaGFydCBmcm9tIGRhdGFtb2RlbFxyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhTW9kZWwucmVtb3ZlQ2hhcnQoc2VsZWN0ZWRJdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKHNlbGVjdGVkSXRlbSBpbnN0YW5jZW9mIEJhc2VTZXJpZXMpe1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoYXJ0OiBJQ2hhcnRNYW5hZ2VyQ2hhcnR8dW5kZWZpbmVkID0gc2VsZWN0ZWRNb2RlbEl0ZW0ucGFyZW50SXRlbS5wYXJlbnRJdGVtLml0ZW07XHJcbiAgICAgICAgICAgICAgICBpZihjaGFydCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBzZXJpZSBmcm9tIGRhdGFtb2RlbFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YU1vZGVsLnJlbW92ZVNlcmllKGNoYXJ0LCBzZWxlY3RlZEl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYoc2VsZWN0ZWRJdGVtIGluc3RhbmNlb2YgU2NhbGUpe1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoYXJ0OiBJQ2hhcnRNYW5hZ2VyQ2hhcnR8dW5kZWZpbmVkID0gc2VsZWN0ZWRNb2RlbEl0ZW0ucGFyZW50SXRlbS5pdGVtO1xyXG4gICAgICAgICAgICAgICAgaWYoY2hhcnQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyBSZW1vdmUgeUF4aXMgZnJvbSBkYXRhbW9kZWxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFNb2RlbC5yZW1vdmVZQXhpcyhjaGFydCwgc2VsZWN0ZWRJdGVtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc2FibGVzL0VuYWJsZXMgdGhlIGRlbGV0ZSBjaGFydC9zZXJpZSBidXR0b24gaW4gdGhlIHRvb2xiYXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGRpc2FibGVcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJUcmVlR3JpZFRvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRpc2FibGVEZWxldGVCdXR0b24oZGlzYWJsZTogYm9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlQnV0dG9uKHRoaXMuX3Rvb2xiYXJJZERlbGV0ZSwgZGlzYWJsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNhYmxlcy9FbmFibGVzIHRoZSBhZGQgY2hhcnQgYnV0dG9uIGluIHRoZSB0b29sYmFyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBkaXNhYmxlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyVHJlZUdyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkaXNhYmxlQWRkQnV0dG9uKGRpc2FibGU6IGJvb2xlYW4pe1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZUJ1dHRvbih0aGlzLl90b29sYmFySWRBZGQsIGRpc2FibGUpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIHNldHMgdGhlIGN1cnJlbnQgc2VsZWN0ZWQgY2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyhJQ2hhcnRNYW5hZ2VyQ2hhcnR8U2NhbGV8QmFzZVNlcmllcyl9IGNoYXJ0XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyVHJlZUdyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRTZWxlY3RlZENoYXJ0IChjaGFydDogSUNoYXJ0TWFuYWdlckNoYXJ0fFNjYWxlfEJhc2VTZXJpZXMpIHtcclxuICAgICAgICBpZiAoY2hhcnQgaW5zdGFuY2VvZiBDaGFydE1hbmFnZXJDaGFydCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkQ2hhcnQgPSBjaGFydDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkQ2hhcnQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19