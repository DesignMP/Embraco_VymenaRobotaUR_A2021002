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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsTWFuYWdlclRyZWVHcmlkVG9vbGJhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9zaWduYWxNYW5hZ2VyV2lkZ2V0L3ZpZXcvc2lnbmFsTWFuYWdlclRyZWVHcmlkVG9vbGJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBTUE7UUFBa0QsZ0RBQW1CO1FBcUJqRTs7Ozs7V0FLRztRQUNILHNDQUFZLFFBQWdCO1lBQTVCLFlBQ0ksa0JBQU0sUUFBUSxDQUFDLFNBbUJsQjtZQTdDZ0Isc0JBQWdCLEdBQUcsUUFBUSxDQUFDO1lBQzVCLDJCQUFxQixHQUFHLG9CQUFvQixDQUFDO1lBRTdDLHNCQUFnQixHQUFHLFFBQVEsQ0FBQztZQUM1QiwyQkFBcUIsR0FBRyxvQkFBb0IsQ0FBQztZQUU3QywyQkFBcUIsR0FBRyxhQUFhLENBQUM7WUFDdEMsZ0NBQTBCLEdBQUcsMkJBQTJCLENBQUM7WUFFekQsc0JBQWdCLEdBQUcsUUFBUSxDQUFDO1lBQzVCLDJCQUFxQixHQUFHLG1CQUFtQixDQUFDO1lBRTVDLHdCQUFrQixHQUFHLFVBQVUsQ0FBQztZQUNoQyw2QkFBdUIsR0FBRyxzQkFBc0IsQ0FBQztZQUkxRCx3QkFBa0IsR0FBRyxLQUFLLENBQUM7WUFXL0IsSUFBSSxjQUFjLEdBQUcsV0FBVyxHQUFHLHFDQUFpQixDQUFDLG1CQUFtQixFQUFFLEdBQUcsMkNBQTJDLENBQUM7WUFFekgseUJBQXlCO1lBQ3pCLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFJLENBQUMsZ0JBQWdCLEVBQUUsS0FBSSxDQUFDLHFCQUFxQixFQUFFLGNBQWMsR0FBRyxZQUFZLENBQUMsQ0FBQztZQUN4RyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSSxDQUFDLGdCQUFnQixFQUFFLEtBQUksQ0FBQyxxQkFBcUIsRUFBRSxjQUFjLEdBQUcsWUFBWSxDQUFDLENBQUM7WUFD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QUFRLENBQUMsQ0FBQztRQUMzRCxDQUFDO1FBQ0wsbUNBQUM7SUFBRCxDQUFDLEFBeEhELENBQWtELHlDQUFtQixHQXdIcEU7SUF4SFksb0VBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHJlZUdyaWRUb29sYmFyQmFzZSwgVG9vbGJhckJ1dHRvbkFsaWdubWVudCB9IGZyb20gXCIuLi8uLi9jb21tb24vdHJlZUdyaWRUb29sYmFyQmFzZVwiO1xyXG5pbXBvcnQgeyBTaWduYWxNYW5hZ2VyV2lkZ2V0IH0gZnJvbSBcIi4uL3NpZ25hbE1hbmFnZXJXaWRnZXRcIjtcclxuaW1wb3J0IHsgRGlyZWN0b3J5UHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2RpcmVjdG9yeVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IEV4cG9ydEhlbHBlciB9IGZyb20gXCIuLi9oZWxwZXJzL2V4cG9ydEhlbHBlclwiO1xyXG5pbXBvcnQgeyBTaWduYWxNYW5hZ2VyRXhwb3J0RHJvcERvd25NZW51IH0gZnJvbSBcIi4vc2lnbmFsTWFuYWdlckV4cG9ydERyb3BEb3duTWVudVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNpZ25hbE1hbmFnZXJUcmVlR3JpZFRvb2xiYXIgZXh0ZW5kcyBUcmVlR3JpZFRvb2xiYXJCYXNlIHtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF90b29sYmFySWRJbXBvcnQgPSBcIkltcG9ydFwiO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfdG9vbGJhclRvb2xUaXBJbXBvcnQgPSBcIkltcG9ydHMgdHJhY2UgZGF0YVwiO1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3Rvb2xiYXJJZEV4cG9ydCA9IFwiRXhwb3J0XCI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF90b29sYmFyVG9vbFRpcEV4cG9ydCA9IFwiRXhwb3J0cyB0cmFjZSBkYXRhXCI7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfdG9vbGJhcklkQ2FsY3VsYXRpb24gPSBcIkNhbGN1bGF0aW9uXCI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF90b29sYmFyVG9vbFRpcENhbGN1bGF0aW9uID0gXCJJbnNlcnRzIGEgbmV3IGNhbGN1bGF0aW9uXCI7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfdG9vbGJhcklkRGVsZXRlID0gXCJEZWxldGVcIjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3Rvb2xiYXJUb29sVGlwRGVsZXRlID0gXCJEZWxldGUgdHJhY2UgZGF0YVwiO1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3Rvb2xiYXJJZEVkaXRNb2RlID0gXCJFZGl0TW9kZVwiO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfdG9vbGJhclRvb2xUaXBFZGl0TW9kZSA9IFwiT3Blbi9DbG9zZSBlZGl0IG1vZGVcIjtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBkcm9wRG93bk1lbnU6IFNpZ25hbE1hbmFnZXJFeHBvcnREcm9wRG93bk1lbnU7XHJcblxyXG4gICAgcHJpdmF0ZSBfZWRpdE1vZGVBY3RpdmF0ZWQgPSBmYWxzZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgU2lnbmFsTWFuYWdlclRyZWVHcmlkVG9vbGJhci5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbWFnZURpcmVjdG9yeVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhcmVudElkXHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlclRyZWVHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRJZDogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIocGFyZW50SWQpO1xyXG5cclxuICAgICAgICBsZXQgaW1hZ2VEaXJlY3RvcnkgPSBcIi4uLy4uLy4uL1wiICsgRGlyZWN0b3J5UHJvdmlkZXIuZ2V0V2lkZ2V0c0RpcmVjdG9yeSgpICsgXCJzaWduYWxNYW5hZ2VyV2lkZ2V0L3N0eWxlL2ltYWdlcy90b29sYmFyL1wiO1xyXG5cclxuICAgICAgICAvLyBidXR0b25zIGZvciB0aGUgZWRpdG9yXHJcbiAgICAgICAgdGhpcy5hZGRUb29sYmFyQnV0dG9uKHRoaXMuX3Rvb2xiYXJJZEltcG9ydCwgdGhpcy5fdG9vbGJhclRvb2xUaXBJbXBvcnQsIGltYWdlRGlyZWN0b3J5ICsgXCJpbXBvcnQuc3ZnXCIpO1xyXG4gICAgICAgIHRoaXMuYWRkVG9vbGJhckJ1dHRvbih0aGlzLl90b29sYmFySWRFeHBvcnQsIHRoaXMuX3Rvb2xiYXJUb29sVGlwRXhwb3J0LCBpbWFnZURpcmVjdG9yeSArIFwiZXhwb3J0LnN2Z1wiKTtcclxuICAgICAgICB0aGlzLmFkZFRvb2xiYXJCdXR0b24odGhpcy5fdG9vbGJhcklkQ2FsY3VsYXRpb24sIHRoaXMuX3Rvb2xiYXJUb29sVGlwQ2FsY3VsYXRpb24sIGltYWdlRGlyZWN0b3J5ICsgXCJjYWxjdWxhdGlvbi5zdmdcIik7XHJcbiAgICAgICAgdGhpcy5hZGRUb29sYmFyQnV0dG9uKHRoaXMuX3Rvb2xiYXJJZERlbGV0ZSwgdGhpcy5fdG9vbGJhclRvb2xUaXBEZWxldGUsIGltYWdlRGlyZWN0b3J5ICsgXCJkZWxldGUuc3ZnXCIpO1xyXG5cclxuICAgICAgICAvLyBnbG9iYWwgdXNlZCBidXR0b25zIG9mIHRyZWUgZ3JpZFxyXG4gICAgICAgIHRoaXMuc2V0Q29sbGFwc2VMZXZlbCgxKTtcclxuICAgICAgICB0aGlzLmFkZENvbGxhcHNlQnV0dG9uKCk7XHJcbiAgICAgICAgdGhpcy5hZGRFeHBhbmRCdXR0b24oKTtcclxuXHJcbiAgICAgICAgLy8gYnV0dG9ucyBvbiB0aGUgcmlnaHQgc2lkZVxyXG4gICAgICAgIHRoaXMuYWRkVG9vbGJhckJ1dHRvbih0aGlzLl90b29sYmFySWRFZGl0TW9kZSwgdGhpcy5fdG9vbGJhclRvb2xUaXBFZGl0TW9kZSwgaW1hZ2VEaXJlY3RvcnkgKyBcImVkaXRNb2RlLnN2Z1wiLCBUb29sYmFyQnV0dG9uQWxpZ25tZW50LlJpZ2h0KTtcclxuICAgIFxyXG4gICAgICAgIHRoaXMuZHJvcERvd25NZW51ID0gbmV3IFNpZ25hbE1hbmFnZXJFeHBvcnREcm9wRG93bk1lbnUodGhpcywgdGhpcy5fcGFyZW50SWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhY3RzIG9uIHRvb2xiYXIgY2xpY2tcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBwYXJhbSB7Kn0gc2lnbmFsTWFuYWdlcldpZGdldFxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJUcmVlR3JpZFRvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHRvb2xiYXJDbGljayhhcmdzLCBzaWduYWxNYW5hZ2VyV2lkZ2V0OiBTaWduYWxNYW5hZ2VyV2lkZ2V0KSB7XHJcbiAgICAgICAgc3VwZXIudG9vbGJhckNsaWNrQmFzZShhcmdzKTtcclxuICAgICAgICB2YXIgY2xpY2tlZFRvb2xiYXJJZCA9IHRoaXMuZ2V0Q2xpY2tlZFRvb2xiYXJJZChhcmdzLml0ZW1OYW1lLCBhcmdzLm1vZGVsLnRvb2xiYXJTZXR0aW5ncyk7XHJcbiAgICAgICAgaWYgKGNsaWNrZWRUb29sYmFySWQgPT0gdGhpcy5fdG9vbGJhcklkSW1wb3J0KSB7XHJcbiAgICAgICAgICAgIHNpZ25hbE1hbmFnZXJXaWRnZXQuaW1wb3J0U2VyaWVHcm91cCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjbGlja2VkVG9vbGJhcklkID09IHRoaXMuX3Rvb2xiYXJJZEV4cG9ydCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuZHJvcERvd25NZW51LmlzT3BlbmVkKXtcclxuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZEl0ZW1zRXhwb3J0YWJsZSA9IHNpZ25hbE1hbmFnZXJXaWRnZXQuY2FuSXRlbXNCZUV4cG9ydGVkKGFyZ3MubW9kZWwuc2VsZWN0ZWRJdGVtcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyb3BEb3duTWVudS5zaG93RHJvcERvd25NZW51KHNpZ25hbE1hbmFnZXJXaWRnZXQsIGFyZ3MubW9kZWwsIHNlbGVjdGVkSXRlbXNFeHBvcnRhYmxlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJvcERvd25NZW51LmhpZGVEcm9wRG93bk1lbnUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjbGlja2VkVG9vbGJhcklkID09IHRoaXMuX3Rvb2xiYXJJZENhbGN1bGF0aW9uKSB7XHJcbiAgICAgICAgICAgIHNpZ25hbE1hbmFnZXJXaWRnZXQuaW5zZXJ0Q2FsY3VsYXRpb24oYXJncy5tb2RlbC5zZWxlY3RlZEl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjbGlja2VkVG9vbGJhcklkID09IHRoaXMuX3Rvb2xiYXJJZERlbGV0ZSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRJdGVtcyA9IE9iamVjdC5hc3NpZ24oW10sIGFyZ3MubW9kZWwuc2VsZWN0ZWRJdGVtcyk7XHJcbiAgICAgICAgICAgIGlmIChzaWduYWxNYW5hZ2VyV2lkZ2V0LmNvbnRhaW5zSXRlbVdpdGhpblJlY2VudE9yVXBsb2FkZWQoc2VsZWN0ZWRJdGVtcykpIHtcclxuICAgICAgICAgICAgICAgIHNpZ25hbE1hbmFnZXJXaWRnZXQuc2hvd01lc3NhZ2VCb3hGb3JEZWxldGluZ0l0ZW0oc2VsZWN0ZWRJdGVtcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzaWduYWxNYW5hZ2VyV2lkZ2V0LmRlbGV0ZUl0ZW1zKHNlbGVjdGVkSXRlbXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGNsaWNrZWRUb29sYmFySWQgPT0gdGhpcy5fdG9vbGJhcklkRWRpdE1vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fZWRpdE1vZGVBY3RpdmF0ZWQgPSAhdGhpcy5fZWRpdE1vZGVBY3RpdmF0ZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZhdGVFZGl0TW9kZUJ1dHRvbih0aGlzLl9lZGl0TW9kZUFjdGl2YXRlZCk7XHJcbiAgICAgICAgICAgIHNpZ25hbE1hbmFnZXJXaWRnZXQuYWN0aXZhdGVFZGl0TW9kZSh0aGlzLl9lZGl0TW9kZUFjdGl2YXRlZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBleHBvcnRTZWxlY3RlZFRyYWNlRGF0YShzaWduYWxNYW5hZ2VyV2lkZ2V0OiBTaWduYWxNYW5hZ2VyV2lkZ2V0LCBzZWxlY3RlZEl0ZW1zKSB7XHJcbiAgICAgICAgbGV0IGl0ZW1zID0gbmV3IEV4cG9ydEhlbHBlcigpLmdldEV4cG9ydGFibGVFbGVtZW50cyhzZWxlY3RlZEl0ZW1zKTtcclxuICAgICAgICBzaWduYWxNYW5hZ2VyV2lkZ2V0LmV4cG9ydFNlcmllR3JvdXAoaXRlbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBleHBvcnRBbGxUcmFjZURhdGFBc0NzdihzaWduYWxNYW5hZ2VyV2lkZ2V0OiBTaWduYWxNYW5hZ2VyV2lkZ2V0LCBhbGxJdGVtcykge1xyXG4gICAgICAgIGxldCBpdGVtc1RvYmVFeHBvcnRlZCA9IE9iamVjdC5hc3NpZ24oW10sIGFsbEl0ZW1zKTtcclxuICAgICAgICBsZXQgaXRlbXMgPSBuZXcgRXhwb3J0SGVscGVyKCkuZ2V0RXhwb3J0YWJsZUVsZW1lbnRzKGl0ZW1zVG9iZUV4cG9ydGVkKTtcclxuICAgICAgICBzaWduYWxNYW5hZ2VyV2lkZ2V0LmV4cG9ydFNlcmllR3JvdXAoaXRlbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBleHBvcnRBbGxUcmFjZURhdGEoc2lnbmFsTWFuYWdlcldpZGdldDogU2lnbmFsTWFuYWdlcldpZGdldCkge1xyXG4gICAgICAgIHNpZ25hbE1hbmFnZXJXaWRnZXQuZXhwb3J0U2lnbmFsTWFuYWdlckRhdGEoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGRpc2FibGVFeHBvcnRCdXR0b24oZGlzYWJsZTogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZUJ1dHRvbih0aGlzLl90b29sYmFySWRFeHBvcnQsIGRpc2FibGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNhYmxlRGVsZXRlQnV0dG9uKGRpc2FibGU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLmRpc2FibGVCdXR0b24odGhpcy5fdG9vbGJhcklkRGVsZXRlLCBkaXNhYmxlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzYWJsZUluc2VydENhbGN1bGF0aW9uQnV0dG9uKGRpc2FibGU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLmRpc2FibGVCdXR0b24odGhpcy5fdG9vbGJhcklkQ2FsY3VsYXRpb24sIGRpc2FibGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhY3RpdmF0ZUVkaXRNb2RlQnV0dG9uKGFjdGl2YXRlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fZWRpdE1vZGVBY3RpdmF0ZWQgPSBhY3RpdmF0ZTtcclxuICAgICAgICB0aGlzLmFjdGl2YXRlQnV0dG9uKHRoaXMuX3Rvb2xiYXJJZEVkaXRNb2RlLCBhY3RpdmF0ZSk7XHJcbiAgICB9XHJcbn0iXX0=