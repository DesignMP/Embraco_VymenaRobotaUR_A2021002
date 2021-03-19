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
define(["require", "exports", "../../../models/chartManagerDataModel/chartManagerChart", "../../common/treeGridToolbarBase", "../../../common/directoryProvider", "../../../models/chartManagerDataModel/baseSeries", "../../../models/chartManagerDataModel/scale", "./chartManagerTreeGridDropDownMenu"], function (require, exports, chartManagerChart_1, treeGridToolbarBase_1, directoryProvider_1, baseSeries_1, scale_1, chartManagerTreeGridDropDownMenu_1) {
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
            _this.dropDownMenu = new chartManagerTreeGridDropDownMenu_1.ChartManagerTreeGridDropDownMenu(_this.dataModel, _this._parentId);
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
                if (!this.dropDownMenu.isOpened) {
                    this.dropDownMenu.showDropDownMenu(this.selectedChart);
                }
                else {
                    this.dropDownMenu.hideDropDownMenu();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRNYW5hZ2VyVHJlZUdyaWRUb29sYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0TWFuYWdlcldpZGdldC92aWV3L2NoYXJ0TWFuYWdlclRyZWVHcmlkVG9vbGJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBU0E7UUFBaUQsK0NBQW1CO1FBV2hFOzs7OztXQUtHO1FBQ0gscUNBQVksUUFBZ0IsRUFBRSxTQUFpQztZQUEvRCxZQUNJLGtCQUFNLFFBQVEsQ0FBQyxTQVlsQjtZQTVCZ0IsbUJBQWEsR0FBRSxLQUFLLENBQUM7WUFDckIsd0JBQWtCLEdBQUUsd0JBQXdCLENBQUM7WUFLN0Msc0JBQWdCLEdBQUUsUUFBUSxDQUFDO1lBQzNCLDJCQUFxQixHQUFFLHNDQUFzQyxDQUFDO1lBVzNFLEtBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1lBQzNCLEtBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxtRUFBZ0MsQ0FBQyxLQUFJLENBQUMsU0FBUyxFQUFFLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUV6RixJQUFJLGNBQWMsR0FBRyxXQUFXLEdBQUcscUNBQWlCLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxrQ0FBa0MsQ0FBQztZQUVoSCxLQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSSxDQUFDLGFBQWEsRUFBRSxLQUFJLENBQUMsa0JBQWtCLEVBQUUsY0FBYyxHQUFHLFNBQVMsQ0FBQyxDQUFDO1lBQy9GLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFJLENBQUMsZ0JBQWdCLEVBQUUsS0FBSSxDQUFDLHFCQUFxQixFQUFFLGNBQWMsR0FBRyxZQUFZLENBQUMsQ0FBQztZQUV4RyxLQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUN6QixLQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7O1FBQzNCLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNJLGtEQUFZLEdBQW5CLFVBQXFCLElBQUk7WUFDckIsaUJBQU0sZ0JBQWdCLFlBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0IsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQzNGLElBQUksZ0JBQWdCLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtnQkFDeEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBQztvQkFDNUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7aUJBQzFEO3FCQUFNO29CQUNILElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztpQkFDeEM7YUFDSjtpQkFDSSxJQUFJLGdCQUFnQixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDaEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUM1QztRQUNMLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSyxnREFBVSxHQUFsQixVQUFtQixpQkFBaUI7WUFDaEMsSUFBSSxZQUFZLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxDQUFDO1lBQzFDLElBQUksaUJBQWlCLElBQUksSUFBSSxFQUFFO2dCQUMzQixJQUFHLFlBQVksWUFBWSxxQ0FBaUIsRUFBQztvQkFDekMsOEJBQThCO29CQUM5QixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztpQkFDNUM7cUJBQ0ksSUFBRyxZQUFZLFlBQVksdUJBQVUsRUFBQztvQkFDdkMsSUFBSSxLQUFLLEdBQWlDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO29CQUN2RixJQUFHLEtBQUssSUFBSSxTQUFTLEVBQUM7d0JBQ2xCLDhCQUE4Qjt3QkFDOUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFDO3FCQUNuRDtpQkFDSjtxQkFDSSxJQUFHLFlBQVksWUFBWSxhQUFLLEVBQUM7b0JBQ2xDLElBQUksS0FBSyxHQUFpQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO29CQUM1RSxJQUFHLEtBQUssSUFBSSxTQUFTLEVBQUM7d0JBQ2xCLDhCQUE4Qjt3QkFDOUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFDO3FCQUNuRDtpQkFDSjthQUNKO1FBQ0wsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0kseURBQW1CLEdBQTFCLFVBQTJCLE9BQWdCO1lBQ3ZDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZELENBQUM7UUFFRDs7Ozs7V0FLRztRQUNJLHNEQUFnQixHQUF2QixVQUF3QixPQUFnQjtZQUNwQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDcEQsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0ksc0RBQWdCLEdBQXZCLFVBQXlCLEtBQTBDO1lBQy9ELElBQUksS0FBSyxZQUFZLHFDQUFpQixFQUFFO2dCQUNwQyxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQzthQUM5QjtpQkFBTTtnQkFDSCxJQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQzthQUNsQztRQUNMLENBQUM7UUFDTCxrQ0FBQztJQUFELENBQUMsQUF2SEQsQ0FBaUQseUNBQW1CLEdBdUhuRTtJQXZIWSxrRUFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFydE1hbmFnZXJDaGFydCB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2NoYXJ0TWFuYWdlckNoYXJ0XCI7XHJcbmltcG9ydCB7IElDaGFydE1hbmFnZXJDaGFydCB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2ludGVyZmFjZXMvY2hhcnRNYW5hZ2VyQ2hhcnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVHJlZUdyaWRUb29sYmFyQmFzZSB9IGZyb20gXCIuLi8uLi9jb21tb24vdHJlZUdyaWRUb29sYmFyQmFzZVwiO1xyXG5pbXBvcnQgeyBEaXJlY3RvcnlQcm92aWRlciB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vZGlyZWN0b3J5UHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgQmFzZVNlcmllcyB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2Jhc2VTZXJpZXNcIjtcclxuaW1wb3J0IHsgU2NhbGUgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9zY2FsZVwiO1xyXG5pbXBvcnQgeyBJQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvaW50ZXJmYWNlcy9jaGFydE1hbmFnZXJEYXRhTW9kZWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ2hhcnRNYW5hZ2VyVHJlZUdyaWREcm9wRG93bk1lbnUgfSBmcm9tIFwiLi9jaGFydE1hbmFnZXJUcmVlR3JpZERyb3BEb3duTWVudVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENoYXJ0TWFuYWdlclRyZWVHcmlkVG9vbGJhciBleHRlbmRzIFRyZWVHcmlkVG9vbGJhckJhc2V7XHJcbiAgICBcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3Rvb2xiYXJJZEFkZCA9XCJBZGRcIjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3Rvb2xiYXJUb29sVGlwQWRkID1cIkFkZHMgYSBuZXcgY2hhcnQvc2NhbGVcIjtcclxuICAgIHByaXZhdGUgZGF0YU1vZGVsOiBJQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsO1xyXG4gICAgcHJpdmF0ZSBzZWxlY3RlZENoYXJ0OiBJQ2hhcnRNYW5hZ2VyQ2hhcnR8dW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBkcm9wRG93bk1lbnU6IENoYXJ0TWFuYWdlclRyZWVHcmlkRHJvcERvd25NZW51O1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3Rvb2xiYXJJZERlbGV0ZSA9XCJEZWxldGVcIjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3Rvb2xiYXJUb29sVGlwRGVsZXRlID1cIkRlbGV0ZXMgYSBjaGFydCwgYSBzY2FsZSBvciBhIHNpZ25hbFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBDaGFydE1hbmFnZXJUcmVlR3JpZFRvb2xiYXIuXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGFyZW50SWRcclxuICAgICAqIEBwYXJhbSB7SUNoYXJ0TWFuYWdlckRhdGFNb2RlbH0gZGF0YU1vZGVsXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyVHJlZUdyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHBhcmVudElkOiBzdHJpbmcsIGRhdGFNb2RlbDogSUNoYXJ0TWFuYWdlckRhdGFNb2RlbCl7XHJcbiAgICAgICAgc3VwZXIocGFyZW50SWQpO1xyXG5cclxuICAgICAgICB0aGlzLmRhdGFNb2RlbCA9IGRhdGFNb2RlbDtcclxuICAgICAgICB0aGlzLmRyb3BEb3duTWVudSA9IG5ldyBDaGFydE1hbmFnZXJUcmVlR3JpZERyb3BEb3duTWVudSh0aGlzLmRhdGFNb2RlbCwgdGhpcy5fcGFyZW50SWQpO1xyXG5cclxuICAgICAgICBsZXQgaW1hZ2VEaXJlY3RvcnkgPSBcIi4uLy4uLy4uL1wiICsgRGlyZWN0b3J5UHJvdmlkZXIuZ2V0V2lkZ2V0c0RpcmVjdG9yeSgpICsgXCJjaGFydE1hbmFnZXJXaWRnZXQvc3R5bGUvaW1hZ2VzL1wiO1xyXG5cclxuICAgICAgICB0aGlzLmFkZFRvb2xiYXJCdXR0b24odGhpcy5fdG9vbGJhcklkQWRkLCB0aGlzLl90b29sYmFyVG9vbFRpcEFkZCwgaW1hZ2VEaXJlY3RvcnkgKyBcImFkZC5zdmdcIik7XHJcbiAgICAgICAgdGhpcy5hZGRUb29sYmFyQnV0dG9uKHRoaXMuX3Rvb2xiYXJJZERlbGV0ZSwgdGhpcy5fdG9vbGJhclRvb2xUaXBEZWxldGUsIGltYWdlRGlyZWN0b3J5ICsgXCJkZWxldGUuc3ZnXCIpO1xyXG5cclxuICAgICAgICB0aGlzLmFkZENvbGxhcHNlQnV0dG9uKCk7XHJcbiAgICAgICAgdGhpcy5hZGRFeHBhbmRCdXR0b24oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWN0cyBvbiB0b29sYmFyIGNsaWNrXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyVHJlZUdyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB0b29sYmFyQ2xpY2sgKGFyZ3Mpe1xyXG4gICAgICAgIHN1cGVyLnRvb2xiYXJDbGlja0Jhc2UoYXJncyk7XHJcbiAgICAgICAgdmFyIGNsaWNrZWRUb29sYmFySWQgPSB0aGlzLmdldENsaWNrZWRUb29sYmFySWQoYXJncy5pdGVtTmFtZSwgYXJncy5tb2RlbC50b29sYmFyU2V0dGluZ3MpO1xyXG4gICAgICAgIGlmIChjbGlja2VkVG9vbGJhcklkID09IHRoaXMuX3Rvb2xiYXJJZEFkZCkge1xyXG4gICAgICAgICAgICBhcmdzLmNhbmNlbCA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5kcm9wRG93bk1lbnUuaXNPcGVuZWQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kcm9wRG93bk1lbnUuc2hvd0Ryb3BEb3duTWVudSh0aGlzLnNlbGVjdGVkQ2hhcnQpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kcm9wRG93bk1lbnUuaGlkZURyb3BEb3duTWVudSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGNsaWNrZWRUb29sYmFySWQgPT0gdGhpcy5fdG9vbGJhcklkRGVsZXRlKSB7XHJcbiAgICAgICAgICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5kZWxldGVJdGVtKGFyZ3MubW9kZWwuc2VsZWN0ZWRJdGVtKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBkZWxldGVzIHRoZSBnaXZlbiBkYXRhbW9kZWwgaXRlbShjaGFydCwgc2NhbGUsIHNlcmllKSBmcm9tIHRoZSBkYXRhbW9kZWxcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBzZWxlY3RlZE1vZGVsSXRlbVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlclRyZWVHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRlbGV0ZUl0ZW0oc2VsZWN0ZWRNb2RlbEl0ZW0pe1xyXG4gICAgICAgIGxldCBzZWxlY3RlZEl0ZW0gPSBzZWxlY3RlZE1vZGVsSXRlbS5pdGVtO1xyXG4gICAgICAgIGlmIChzZWxlY3RlZE1vZGVsSXRlbSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmKHNlbGVjdGVkSXRlbSBpbnN0YW5jZW9mIENoYXJ0TWFuYWdlckNoYXJ0KXtcclxuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBjaGFydCBmcm9tIGRhdGFtb2RlbFxyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhTW9kZWwucmVtb3ZlQ2hhcnQoc2VsZWN0ZWRJdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKHNlbGVjdGVkSXRlbSBpbnN0YW5jZW9mIEJhc2VTZXJpZXMpe1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoYXJ0OiBJQ2hhcnRNYW5hZ2VyQ2hhcnR8dW5kZWZpbmVkID0gc2VsZWN0ZWRNb2RlbEl0ZW0ucGFyZW50SXRlbS5wYXJlbnRJdGVtLml0ZW07XHJcbiAgICAgICAgICAgICAgICBpZihjaGFydCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBzZXJpZSBmcm9tIGRhdGFtb2RlbFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YU1vZGVsLnJlbW92ZVNlcmllKGNoYXJ0LCBzZWxlY3RlZEl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYoc2VsZWN0ZWRJdGVtIGluc3RhbmNlb2YgU2NhbGUpe1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoYXJ0OiBJQ2hhcnRNYW5hZ2VyQ2hhcnR8dW5kZWZpbmVkID0gc2VsZWN0ZWRNb2RlbEl0ZW0ucGFyZW50SXRlbS5pdGVtO1xyXG4gICAgICAgICAgICAgICAgaWYoY2hhcnQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyBSZW1vdmUgeUF4aXMgZnJvbSBkYXRhbW9kZWxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFNb2RlbC5yZW1vdmVZQXhpcyhjaGFydCwgc2VsZWN0ZWRJdGVtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc2FibGVzL0VuYWJsZXMgdGhlIGRlbGV0ZSBjaGFydC9zZXJpZSBidXR0b24gaW4gdGhlIHRvb2xiYXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGRpc2FibGVcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJUcmVlR3JpZFRvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRpc2FibGVEZWxldGVCdXR0b24oZGlzYWJsZTogYm9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlQnV0dG9uKHRoaXMuX3Rvb2xiYXJJZERlbGV0ZSwgZGlzYWJsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNhYmxlcy9FbmFibGVzIHRoZSBhZGQgY2hhcnQgYnV0dG9uIGluIHRoZSB0b29sYmFyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBkaXNhYmxlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyVHJlZUdyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkaXNhYmxlQWRkQnV0dG9uKGRpc2FibGU6IGJvb2xlYW4pe1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZUJ1dHRvbih0aGlzLl90b29sYmFySWRBZGQsIGRpc2FibGUpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIHNldHMgdGhlIGN1cnJlbnQgc2VsZWN0ZWQgY2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyhJQ2hhcnRNYW5hZ2VyQ2hhcnR8U2NhbGV8QmFzZVNlcmllcyl9IGNoYXJ0XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyVHJlZUdyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRTZWxlY3RlZENoYXJ0IChjaGFydDogSUNoYXJ0TWFuYWdlckNoYXJ0fFNjYWxlfEJhc2VTZXJpZXMpIHtcclxuICAgICAgICBpZiAoY2hhcnQgaW5zdGFuY2VvZiBDaGFydE1hbmFnZXJDaGFydCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkQ2hhcnQgPSBjaGFydDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkQ2hhcnQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19