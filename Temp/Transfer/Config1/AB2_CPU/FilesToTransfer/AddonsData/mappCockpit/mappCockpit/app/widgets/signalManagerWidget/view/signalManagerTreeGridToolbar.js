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
define(["require", "exports", "../../common/treeGridToolbarBase", "../../../common/directoryProvider", "../helpers/exportHelper", "./signalManagerExportDropDownMenu"], function (require, exports, treeGridToolbarBase_1, directoryProvider_1, exportHelper_1, signalManagerExportDropDownMenu_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SignalManagerTreeGridToolbar = /** @class */ (function (_super) {
        __extends(SignalManagerTreeGridToolbar, _super);
        /**
         * Creates an instance of SignalManagerTreeGridToolbar.
         * @param {string} imageDirectory
         * @param {string} parentId
         * @memberof SignalManagerTreeGridToolbar
         */
        function SignalManagerTreeGridToolbar(parentId) {
            var _this = _super.call(this, parentId) || this;
            _this._toolbarIdImport = "Import";
            _this._toolbarToolTipImport = "Imports trace data";
            _this._toolbarIdExport = "Export";
            _this._toolbarToolTipExport = "Exports trace data";
            _this._toolbarIdCalculation = "Calculation";
            _this._toolbarToolTipCalculation = "Inserts a new calculation";
            _this._toolbarIdDelete = "Delete";
            _this._toolbarToolTipDelete = "Delete trace data";
            _this._toolbarIdEditMode = "EditMode";
            _this._toolbarToolTipEditMode = "Open/Close edit mode";
            _this._editModeActivated = false;
            var imageDirectory = "../../../" + directoryProvider_1.DirectoryProvider.getWidgetsDirectory() + "signalManagerWidget/style/images/toolbar/";
            // buttons for the editor
            _this.addToolbarButton(_this._toolbarIdImport, _this._toolbarToolTipImport, imageDirectory + "import.svg");
            _this.addToolbarButton(_this._toolbarIdExport, _this._toolbarToolTipExport, imageDirectory + "export.svg");
            _this.addToolbarButton(_this._toolbarIdCalculation, _this._toolbarToolTipCalculation, imageDirectory + "calculation.svg");
            _this.addToolbarButton(_this._toolbarIdDelete, _this._toolbarToolTipDelete, imageDirectory + "delete.svg");
            // global used buttons of tree grid
            _this.setCollapseLevel(1);
            _this.addCollapseButton();
            _this.addExpandButton();
            // buttons on the right side
            _this.addToolbarButton(_this._toolbarIdEditMode, _this._toolbarToolTipEditMode, imageDirectory + "editMode.svg", treeGridToolbarBase_1.ToolbarButtonAlignment.Right);
            _this.dropDownMenu = new signalManagerExportDropDownMenu_1.SignalManagerExportDropDownMenu(_this, _this._parentId);
            return _this;
        }
        /**
         * Reacts on toolbar click
         *
         * @param {*} args
         * @param {*} signalManagerWidget
         * @memberof SignalManagerTreeGridToolbar
         */
        SignalManagerTreeGridToolbar.prototype.toolbarClick = function (args, signalManagerWidget) {
            //set edit cell to false so treegrid can be updated
            signalManagerWidget.setCellEdit(false);
            _super.prototype.toolbarClickBase.call(this, args);
            var clickedToolbarId = this.getClickedToolbarId(args.itemName, args.model.toolbarSettings);
            if (clickedToolbarId == this._toolbarIdImport) {
                signalManagerWidget.importSerieGroup();
            }
            else if (clickedToolbarId == this._toolbarIdExport) {
                if (!this.dropDownMenu.isOpened) {
                    var selectedItemsExportable = signalManagerWidget.canItemsBeExported(args.model.selectedItems);
                    this.dropDownMenu.showDropDownMenu(signalManagerWidget, args.model, selectedItemsExportable);
                }
                else {
                    this.dropDownMenu.hideDropDownMenu();
                }
            }
            else if (clickedToolbarId == this._toolbarIdCalculation) {
                signalManagerWidget.insertCalculation(args.model.selectedItem);
            }
            else if (clickedToolbarId == this._toolbarIdDelete) {
                var selectedItems = Object.assign([], args.model.selectedItems);
                if (signalManagerWidget.containsItemWithinRecentOrUploaded(selectedItems)) {
                    signalManagerWidget.showMessageBoxForDeletingItem(selectedItems);
                }
                else {
                    signalManagerWidget.deleteItems(selectedItems);
                }
            }
            else if (clickedToolbarId == this._toolbarIdEditMode) {
                this._editModeActivated = !this._editModeActivated;
                this.activateEditModeButton(this._editModeActivated);
                signalManagerWidget.activateEditMode(this._editModeActivated);
            }
        };
        SignalManagerTreeGridToolbar.prototype.exportSelectedTraceData = function (signalManagerWidget, selectedItems) {
            var items = new exportHelper_1.ExportHelper().getExportableElements(selectedItems);
            signalManagerWidget.exportSerieGroup(items);
        };
        SignalManagerTreeGridToolbar.prototype.exportAllTraceDataAsCsv = function (signalManagerWidget, allItems) {
            var itemsTobeExported = Object.assign([], allItems);
            var items = new exportHelper_1.ExportHelper().getExportableElements(itemsTobeExported);
            signalManagerWidget.exportSerieGroup(items);
        };
        SignalManagerTreeGridToolbar.prototype.exportAllTraceData = function (signalManagerWidget) {
            signalManagerWidget.exportSignalManagerData();
        };
        SignalManagerTreeGridToolbar.prototype.disableExportButton = function (disable) {
            this.disableButton(this._toolbarIdExport, disable);
        };
        SignalManagerTreeGridToolbar.prototype.disableDeleteButton = function (disable) {
            this.disableButton(this._toolbarIdDelete, disable);
        };
        SignalManagerTreeGridToolbar.prototype.disableInsertCalculationButton = function (disable) {
            this.disableButton(this._toolbarIdCalculation, disable);
        };
        SignalManagerTreeGridToolbar.prototype.activateEditModeButton = function (activate) {
            this._editModeActivated = activate;
            this.activateButton(this._toolbarIdEditMode, activate);
        };
        return SignalManagerTreeGridToolbar;
    }(treeGridToolbarBase_1.TreeGridToolbarBase));
    exports.SignalManagerTreeGridToolbar = SignalManagerTreeGridToolbar;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsTWFuYWdlclRyZWVHcmlkVG9vbGJhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9zaWduYWxNYW5hZ2VyV2lkZ2V0L3ZpZXcvc2lnbmFsTWFuYWdlclRyZWVHcmlkVG9vbGJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBTUE7UUFBa0QsZ0RBQW1CO1FBcUJqRTs7Ozs7V0FLRztRQUNILHNDQUFZLFFBQWdCO1lBQTVCLFlBQ0ksa0JBQU0sUUFBUSxDQUFDLFNBbUJsQjtZQTdDZ0Isc0JBQWdCLEdBQUcsUUFBUSxDQUFDO1lBQzVCLDJCQUFxQixHQUFHLG9CQUFvQixDQUFDO1lBRTdDLHNCQUFnQixHQUFHLFFBQVEsQ0FBQztZQUM1QiwyQkFBcUIsR0FBRyxvQkFBb0IsQ0FBQztZQUU3QywyQkFBcUIsR0FBRyxhQUFhLENBQUM7WUFDdEMsZ0NBQTBCLEdBQUcsMkJBQTJCLENBQUM7WUFFekQsc0JBQWdCLEdBQUcsUUFBUSxDQUFDO1lBQzVCLDJCQUFxQixHQUFHLG1CQUFtQixDQUFDO1lBRTVDLHdCQUFrQixHQUFHLFVBQVUsQ0FBQztZQUNoQyw2QkFBdUIsR0FBRyxzQkFBc0IsQ0FBQztZQUkxRCx3QkFBa0IsR0FBRyxLQUFLLENBQUM7WUFXL0IsSUFBSSxjQUFjLEdBQUcsV0FBVyxHQUFHLHFDQUFpQixDQUFDLG1CQUFtQixFQUFFLEdBQUcsMkNBQTJDLENBQUM7WUFFekgseUJBQXlCO1lBQ3pCLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFJLENBQUMsZ0JBQWdCLEVBQUUsS0FBSSxDQUFDLHFCQUFxQixFQUFFLGNBQWMsR0FBRyxZQUFZLENBQUMsQ0FBQztZQUN4RyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSSxDQUFDLGdCQUFnQixFQUFFLEtBQUksQ0FBQyxxQkFBcUIsRUFBRSxjQUFjLEdBQUcsWUFBWSxDQUFDLENBQUM7WUFD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USxDQUFDO1lBQ25DLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzNELENBQUM7UUFDTCxtQ0FBQztJQUFELENBQUMsQUEzSEQsQ0FBa0QseUNBQW1CLEdBMkhwRTtJQTNIWSxvRUFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUcmVlR3JpZFRvb2xiYXJCYXNlLCBUb29sYmFyQnV0dG9uQWxpZ25tZW50IH0gZnJvbSBcIi4uLy4uL2NvbW1vbi90cmVlR3JpZFRvb2xiYXJCYXNlXCI7XHJcbmltcG9ydCB7IFNpZ25hbE1hbmFnZXJXaWRnZXQgfSBmcm9tIFwiLi4vc2lnbmFsTWFuYWdlcldpZGdldFwiO1xyXG5pbXBvcnQgeyBEaXJlY3RvcnlQcm92aWRlciB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vZGlyZWN0b3J5UHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgRXhwb3J0SGVscGVyIH0gZnJvbSBcIi4uL2hlbHBlcnMvZXhwb3J0SGVscGVyXCI7XHJcbmltcG9ydCB7IFNpZ25hbE1hbmFnZXJFeHBvcnREcm9wRG93bk1lbnUgfSBmcm9tIFwiLi9zaWduYWxNYW5hZ2VyRXhwb3J0RHJvcERvd25NZW51XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU2lnbmFsTWFuYWdlclRyZWVHcmlkVG9vbGJhciBleHRlbmRzIFRyZWVHcmlkVG9vbGJhckJhc2Uge1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3Rvb2xiYXJJZEltcG9ydCA9IFwiSW1wb3J0XCI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF90b29sYmFyVG9vbFRpcEltcG9ydCA9IFwiSW1wb3J0cyB0cmFjZSBkYXRhXCI7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfdG9vbGJhcklkRXhwb3J0ID0gXCJFeHBvcnRcIjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3Rvb2xiYXJUb29sVGlwRXhwb3J0ID0gXCJFeHBvcnRzIHRyYWNlIGRhdGFcIjtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF90b29sYmFySWRDYWxjdWxhdGlvbiA9IFwiQ2FsY3VsYXRpb25cIjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3Rvb2xiYXJUb29sVGlwQ2FsY3VsYXRpb24gPSBcIkluc2VydHMgYSBuZXcgY2FsY3VsYXRpb25cIjtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF90b29sYmFySWREZWxldGUgPSBcIkRlbGV0ZVwiO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfdG9vbGJhclRvb2xUaXBEZWxldGUgPSBcIkRlbGV0ZSB0cmFjZSBkYXRhXCI7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfdG9vbGJhcklkRWRpdE1vZGUgPSBcIkVkaXRNb2RlXCI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF90b29sYmFyVG9vbFRpcEVkaXRNb2RlID0gXCJPcGVuL0Nsb3NlIGVkaXQgbW9kZVwiO1xyXG4gICAgXHJcbiAgICBwcml2YXRlIGRyb3BEb3duTWVudTogU2lnbmFsTWFuYWdlckV4cG9ydERyb3BEb3duTWVudTtcclxuXHJcbiAgICBwcml2YXRlIF9lZGl0TW9kZUFjdGl2YXRlZCA9IGZhbHNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBTaWduYWxNYW5hZ2VyVHJlZUdyaWRUb29sYmFyLlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGltYWdlRGlyZWN0b3J5XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGFyZW50SWRcclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyVHJlZUdyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHBhcmVudElkOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihwYXJlbnRJZCk7XHJcblxyXG4gICAgICAgIGxldCBpbWFnZURpcmVjdG9yeSA9IFwiLi4vLi4vLi4vXCIgKyBEaXJlY3RvcnlQcm92aWRlci5nZXRXaWRnZXRzRGlyZWN0b3J5KCkgKyBcInNpZ25hbE1hbmFnZXJXaWRnZXQvc3R5bGUvaW1hZ2VzL3Rvb2xiYXIvXCI7XHJcblxyXG4gICAgICAgIC8vIGJ1dHRvbnMgZm9yIHRoZSBlZGl0b3JcclxuICAgICAgICB0aGlzLmFkZFRvb2xiYXJCdXR0b24odGhpcy5fdG9vbGJhcklkSW1wb3J0LCB0aGlzLl90b29sYmFyVG9vbFRpcEltcG9ydCwgaW1hZ2VEaXJlY3RvcnkgKyBcImltcG9ydC5zdmdcIik7XHJcbiAgICAgICAgdGhpcy5hZGRUb29sYmFyQnV0dG9uKHRoaXMuX3Rvb2xiYXJJZEV4cG9ydCwgdGhpcy5fdG9vbGJhclRvb2xUaXBFeHBvcnQsIGltYWdlRGlyZWN0b3J5ICsgXCJleHBvcnQuc3ZnXCIpO1xyXG4gICAgICAgIHRoaXMuYWRkVG9vbGJhckJ1dHRvbih0aGlzLl90b29sYmFySWRDYWxjdWxhdGlvbiwgdGhpcy5fdG9vbGJhclRvb2xUaXBDYWxjdWxhdGlvbiwgaW1hZ2VEaXJlY3RvcnkgKyBcImNhbGN1bGF0aW9uLnN2Z1wiKTtcclxuICAgICAgICB0aGlzLmFkZFRvb2xiYXJCdXR0b24odGhpcy5fdG9vbGJhcklkRGVsZXRlLCB0aGlzLl90b29sYmFyVG9vbFRpcERlbGV0ZSwgaW1hZ2VEaXJlY3RvcnkgKyBcImRlbGV0ZS5zdmdcIik7XHJcblxyXG4gICAgICAgIC8vIGdsb2JhbCB1c2VkIGJ1dHRvbnMgb2YgdHJlZSBncmlkXHJcbiAgICAgICAgdGhpcy5zZXRDb2xsYXBzZUxldmVsKDEpO1xyXG4gICAgICAgIHRoaXMuYWRkQ29sbGFwc2VCdXR0b24oKTtcclxuICAgICAgICB0aGlzLmFkZEV4cGFuZEJ1dHRvbigpO1xyXG5cclxuICAgICAgICAvLyBidXR0b25zIG9uIHRoZSByaWdodCBzaWRlXHJcbiAgICAgICAgdGhpcy5hZGRUb29sYmFyQnV0dG9uKHRoaXMuX3Rvb2xiYXJJZEVkaXRNb2RlLCB0aGlzLl90b29sYmFyVG9vbFRpcEVkaXRNb2RlLCBpbWFnZURpcmVjdG9yeSArIFwiZWRpdE1vZGUuc3ZnXCIsIFRvb2xiYXJCdXR0b25BbGlnbm1lbnQuUmlnaHQpO1xyXG4gICAgXHJcbiAgICAgICAgdGhpcy5kcm9wRG93bk1lbnUgPSBuZXcgU2lnbmFsTWFuYWdlckV4cG9ydERyb3BEb3duTWVudSh0aGlzLCB0aGlzLl9wYXJlbnRJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFjdHMgb24gdG9vbGJhciBjbGlja1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQHBhcmFtIHsqfSBzaWduYWxNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlclRyZWVHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdG9vbGJhckNsaWNrKGFyZ3MsIHNpZ25hbE1hbmFnZXJXaWRnZXQ6IFNpZ25hbE1hbmFnZXJXaWRnZXQpIHtcclxuICAgICAgICAvL3NldCBlZGl0IGNlbGwgdG8gZmFsc2Ugc28gdHJlZWdyaWQgY2FuIGJlIHVwZGF0ZWRcclxuICAgICAgICBzaWduYWxNYW5hZ2VyV2lkZ2V0LnNldENlbGxFZGl0KGZhbHNlKTtcclxuXHJcbiAgICAgICAgc3VwZXIudG9vbGJhckNsaWNrQmFzZShhcmdzKTtcclxuICAgICAgICB2YXIgY2xpY2tlZFRvb2xiYXJJZCA9IHRoaXMuZ2V0Q2xpY2tlZFRvb2xiYXJJZChhcmdzLml0ZW1OYW1lLCBhcmdzLm1vZGVsLnRvb2xiYXJTZXR0aW5ncyk7XHJcbiAgICAgICAgaWYgKGNsaWNrZWRUb29sYmFySWQgPT0gdGhpcy5fdG9vbGJhcklkSW1wb3J0KSB7XHJcbiAgICAgICAgICAgIHNpZ25hbE1hbmFnZXJXaWRnZXQuaW1wb3J0U2VyaWVHcm91cCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjbGlja2VkVG9vbGJhcklkID09IHRoaXMuX3Rvb2xiYXJJZEV4cG9ydCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuZHJvcERvd25NZW51LmlzT3BlbmVkKXtcclxuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZEl0ZW1zRXhwb3J0YWJsZSA9IHNpZ25hbE1hbmFnZXJXaWRnZXQuY2FuSXRlbXNCZUV4cG9ydGVkKGFyZ3MubW9kZWwuc2VsZWN0ZWRJdGVtcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyb3BEb3duTWVudS5zaG93RHJvcERvd25NZW51KHNpZ25hbE1hbmFnZXJXaWRnZXQsIGFyZ3MubW9kZWwsIHNlbGVjdGVkSXRlbXNFeHBvcnRhYmxlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJvcERvd25NZW51LmhpZGVEcm9wRG93bk1lbnUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjbGlja2VkVG9vbGJhcklkID09IHRoaXMuX3Rvb2xiYXJJZENhbGN1bGF0aW9uKSB7XHJcbiAgICAgICAgICAgIHNpZ25hbE1hbmFnZXJXaWRnZXQuaW5zZXJ0Q2FsY3VsYXRpb24oYXJncy5tb2RlbC5zZWxlY3RlZEl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjbGlja2VkVG9vbGJhcklkID09IHRoaXMuX3Rvb2xiYXJJZERlbGV0ZSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRJdGVtcyA9IE9iamVjdC5hc3NpZ24oW10sIGFyZ3MubW9kZWwuc2VsZWN0ZWRJdGVtcyk7XHJcbiAgICAgICAgICAgIGlmIChzaWduYWxNYW5hZ2VyV2lkZ2V0LmNvbnRhaW5zSXRlbVdpdGhpblJlY2VudE9yVXBsb2FkZWQoc2VsZWN0ZWRJdGVtcykpIHtcclxuICAgICAgICAgICAgICAgIHNpZ25hbE1hbmFnZXJXaWRnZXQuc2hvd01lc3NhZ2VCb3hGb3JEZWxldGluZ0l0ZW0oc2VsZWN0ZWRJdGVtcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzaWduYWxNYW5hZ2VyV2lkZ2V0LmRlbGV0ZUl0ZW1zKHNlbGVjdGVkSXRlbXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGNsaWNrZWRUb29sYmFySWQgPT0gdGhpcy5fdG9vbGJhcklkRWRpdE1vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fZWRpdE1vZGVBY3RpdmF0ZWQgPSAhdGhpcy5fZWRpdE1vZGVBY3RpdmF0ZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZhdGVFZGl0TW9kZUJ1dHRvbih0aGlzLl9lZGl0TW9kZUFjdGl2YXRlZCk7XHJcbiAgICAgICAgICAgIHNpZ25hbE1hbmFnZXJXaWRnZXQuYWN0aXZhdGVFZGl0TW9kZSh0aGlzLl9lZGl0TW9kZUFjdGl2YXRlZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBleHBvcnRTZWxlY3RlZFRyYWNlRGF0YShzaWduYWxNYW5hZ2VyV2lkZ2V0OiBTaWduYWxNYW5hZ2VyV2lkZ2V0LCBzZWxlY3RlZEl0ZW1zKSB7XHJcbiAgICAgICAgbGV0IGl0ZW1zID0gbmV3IEV4cG9ydEhlbHBlcigpLmdldEV4cG9ydGFibGVFbGVtZW50cyhzZWxlY3RlZEl0ZW1zKTtcclxuICAgICAgICBzaWduYWxNYW5hZ2VyV2lkZ2V0LmV4cG9ydFNlcmllR3JvdXAoaXRlbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBleHBvcnRBbGxUcmFjZURhdGFBc0NzdihzaWduYWxNYW5hZ2VyV2lkZ2V0OiBTaWduYWxNYW5hZ2VyV2lkZ2V0LCBhbGxJdGVtcykge1xyXG4gICAgICAgIGxldCBpdGVtc1RvYmVFeHBvcnRlZCA9IE9iamVjdC5hc3NpZ24oW10sIGFsbEl0ZW1zKTtcclxuICAgICAgICBsZXQgaXRlbXMgPSBuZXcgRXhwb3J0SGVscGVyKCkuZ2V0RXhwb3J0YWJsZUVsZW1lbnRzKGl0ZW1zVG9iZUV4cG9ydGVkKTtcclxuICAgICAgICBzaWduYWxNYW5hZ2VyV2lkZ2V0LmV4cG9ydFNlcmllR3JvdXAoaXRlbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBleHBvcnRBbGxUcmFjZURhdGEoc2lnbmFsTWFuYWdlcldpZGdldDogU2lnbmFsTWFuYWdlcldpZGdldCkge1xyXG4gICAgICAgIHNpZ25hbE1hbmFnZXJXaWRnZXQuZXhwb3J0U2lnbmFsTWFuYWdlckRhdGEoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGRpc2FibGVFeHBvcnRCdXR0b24oZGlzYWJsZTogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZUJ1dHRvbih0aGlzLl90b29sYmFySWRFeHBvcnQsIGRpc2FibGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNhYmxlRGVsZXRlQnV0dG9uKGRpc2FibGU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLmRpc2FibGVCdXR0b24odGhpcy5fdG9vbGJhcklkRGVsZXRlLCBkaXNhYmxlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzYWJsZUluc2VydENhbGN1bGF0aW9uQnV0dG9uKGRpc2FibGU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLmRpc2FibGVCdXR0b24odGhpcy5fdG9vbGJhcklkQ2FsY3VsYXRpb24sIGRpc2FibGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhY3RpdmF0ZUVkaXRNb2RlQnV0dG9uKGFjdGl2YXRlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fZWRpdE1vZGVBY3RpdmF0ZWQgPSBhY3RpdmF0ZTtcclxuICAgICAgICB0aGlzLmFjdGl2YXRlQnV0dG9uKHRoaXMuX3Rvb2xiYXJJZEVkaXRNb2RlLCBhY3RpdmF0ZSk7XHJcbiAgICB9XHJcbn0iXX0=