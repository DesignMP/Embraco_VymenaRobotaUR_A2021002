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
define(["require", "exports", "../../common/treeGridToolbarBase", "../../../common/directoryProvider", "../helpers/exportHelper"], function (require, exports, treeGridToolbarBase_1, directoryProvider_1, exportHelper_1) {
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
            _this._toolbarToolTipExport = "Export selected trace data";
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
                var items = new exportHelper_1.ExportHelper().getExportableElements(args.model.selectedItems);
                signalManagerWidget.exportSerieGroup(items);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsTWFuYWdlclRyZWVHcmlkVG9vbGJhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9zaWduYWxNYW5hZ2VyV2lkZ2V0L3ZpZXcvc2lnbmFsTWFuYWdlclRyZWVHcmlkVG9vbGJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBS0E7UUFBa0QsZ0RBQW1CO1FBbUJqRTs7Ozs7V0FLRztRQUNILHNDQUFZLFFBQWdCO1lBQTVCLFlBQ0ksa0JBQU0sUUFBUSxDQUFDLFNBaUJsQjtZQXpDZ0Isc0JBQWdCLEdBQUcsUUFBUSxDQUFDO1lBQzVCLDJCQUFxQixHQUFHLG9CQUFvQixDQUFDO1lBRTdDLHNCQUFnQixHQUFHLFFBQVEsQ0FBQztZQUM1QiwyQkFBcUIsR0FBRyw0QkFBNEIsQ0FBQztZQUVyRCwyQkFBcUIsR0FBRyxhQUFhLENBQUM7WUFDdEMsZ0NBQTBCLEdBQUcsMkJBQTJCLENBQUM7WUFFekQsc0JBQWdCLEdBQUcsUUFBUSxDQUFDO1lBQzVCLDJCQUFxQixHQUFHLG1CQUFtQixDQUFDO1lBRTVDLHdCQUFrQixHQUFHLFVBQVUsQ0FBQztZQUNoQyw2QkFBdUIsR0FBRyxzQkFBc0IsQ0FBQztZQUUxRCx3QkFBa0IsR0FBRyxLQUFLLENBQUM7WUFXL0IsSUFBSSxjQUFjLEdBQUcsV0FBVyxHQUFHLHFDQUFpQixDQUFDLG1CQUFtQixFQUFFLEdBQUcsMkNBQTJDLENBQUM7WUFFekgseUJBQXlCO1lBQ3pCLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFJLENBQUMsZ0JBQWdCLEVBQUUsS0FBSSxDQUFDLHFCQUFxQixFQUFFLGNBQWMsR0FBRyxZQUFZLENBQUMsQ0FBQztZQUN4RyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSSxDQUFDLGdCQUFnQixFQUFFLEtBQUksQ0FBQyxxQkFBcUIsRUFBRSxjQUFjLEdBQUcsWUFBWSxDQUFDLENBQUM7WUFD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QyxPQUFnQjtZQUNsRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM1RCxDQUFDO1FBRU0sNkRBQXNCLEdBQTdCLFVBQThCLFFBQWlCO1lBQzNDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxRQUFRLENBQUM7WUFDbkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDM0QsQ0FBQztRQUNMLG1DQUFDO0lBQUQsQ0FBQyxBQWpHRCxDQUFrRCx5Q0FBbUIsR0FpR3BFO0lBakdZLG9FQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRyZWVHcmlkVG9vbGJhckJhc2UsIFRvb2xiYXJCdXR0b25BbGlnbm1lbnQgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3RyZWVHcmlkVG9vbGJhckJhc2VcIjtcclxuaW1wb3J0IHsgU2lnbmFsTWFuYWdlcldpZGdldCB9IGZyb20gXCIuLi9zaWduYWxNYW5hZ2VyV2lkZ2V0XCI7XHJcbmltcG9ydCB7IERpcmVjdG9yeVByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9kaXJlY3RvcnlQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBFeHBvcnRIZWxwZXIgfSBmcm9tIFwiLi4vaGVscGVycy9leHBvcnRIZWxwZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTaWduYWxNYW5hZ2VyVHJlZUdyaWRUb29sYmFyIGV4dGVuZHMgVHJlZUdyaWRUb29sYmFyQmFzZSB7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfdG9vbGJhcklkSW1wb3J0ID0gXCJJbXBvcnRcIjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3Rvb2xiYXJUb29sVGlwSW1wb3J0ID0gXCJJbXBvcnRzIHRyYWNlIGRhdGFcIjtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF90b29sYmFySWRFeHBvcnQgPSBcIkV4cG9ydFwiO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfdG9vbGJhclRvb2xUaXBFeHBvcnQgPSBcIkV4cG9ydCBzZWxlY3RlZCB0cmFjZSBkYXRhXCI7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfdG9vbGJhcklkQ2FsY3VsYXRpb24gPSBcIkNhbGN1bGF0aW9uXCI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF90b29sYmFyVG9vbFRpcENhbGN1bGF0aW9uID0gXCJJbnNlcnRzIGEgbmV3IGNhbGN1bGF0aW9uXCI7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfdG9vbGJhcklkRGVsZXRlID0gXCJEZWxldGVcIjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3Rvb2xiYXJUb29sVGlwRGVsZXRlID0gXCJEZWxldGUgdHJhY2UgZGF0YVwiO1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3Rvb2xiYXJJZEVkaXRNb2RlID0gXCJFZGl0TW9kZVwiO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfdG9vbGJhclRvb2xUaXBFZGl0TW9kZSA9IFwiT3Blbi9DbG9zZSBlZGl0IG1vZGVcIjtcclxuXHJcbiAgICBwcml2YXRlIF9lZGl0TW9kZUFjdGl2YXRlZCA9IGZhbHNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBTaWduYWxNYW5hZ2VyVHJlZUdyaWRUb29sYmFyLlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGltYWdlRGlyZWN0b3J5XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGFyZW50SWRcclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyVHJlZUdyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHBhcmVudElkOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihwYXJlbnRJZCk7XHJcblxyXG4gICAgICAgIGxldCBpbWFnZURpcmVjdG9yeSA9IFwiLi4vLi4vLi4vXCIgKyBEaXJlY3RvcnlQcm92aWRlci5nZXRXaWRnZXRzRGlyZWN0b3J5KCkgKyBcInNpZ25hbE1hbmFnZXJXaWRnZXQvc3R5bGUvaW1hZ2VzL3Rvb2xiYXIvXCI7XHJcblxyXG4gICAgICAgIC8vIGJ1dHRvbnMgZm9yIHRoZSBlZGl0b3JcclxuICAgICAgICB0aGlzLmFkZFRvb2xiYXJCdXR0b24odGhpcy5fdG9vbGJhcklkSW1wb3J0LCB0aGlzLl90b29sYmFyVG9vbFRpcEltcG9ydCwgaW1hZ2VEaXJlY3RvcnkgKyBcImltcG9ydC5zdmdcIik7XHJcbiAgICAgICAgdGhpcy5hZGRUb29sYmFyQnV0dG9uKHRoaXMuX3Rvb2xiYXJJZEV4cG9ydCwgdGhpcy5fdG9vbGJhclRvb2xUaXBFeHBvcnQsIGltYWdlRGlyZWN0b3J5ICsgXCJleHBvcnQuc3ZnXCIpO1xyXG4gICAgICAgIHRoaXMuYWRkVG9vbGJhckJ1dHRvbih0aGlzLl90b29sYmFySWRDYWxjdWxhdGlvbiwgdGhpcy5fdG9vbGJhclRvb2xUaXBDYWxjdWxhdGlvbiwgaW1hZ2VEaXJlY3RvcnkgKyBcImNhbGN1bGF0aW9uLnN2Z1wiKTtcclxuICAgICAgICB0aGlzLmFkZFRvb2xiYXJCdXR0b24odGhpcy5fdG9vbGJhcklkRGVsZXRlLCB0aGlzLl90b29sYmFyVG9vbFRpcERlbGV0ZSwgaW1hZ2VEaXJlY3RvcnkgKyBcImRlbGV0ZS5zdmdcIik7XHJcblxyXG4gICAgICAgIC8vIGdsb2JhbCB1c2VkIGJ1dHRvbnMgb2YgdHJlZSBncmlkXHJcbiAgICAgICAgdGhpcy5zZXRDb2xsYXBzZUxldmVsKDEpO1xyXG4gICAgICAgIHRoaXMuYWRkQ29sbGFwc2VCdXR0b24oKTtcclxuICAgICAgICB0aGlzLmFkZEV4cGFuZEJ1dHRvbigpO1xyXG5cclxuICAgICAgICAvLyBidXR0b25zIG9uIHRoZSByaWdodCBzaWRlXHJcbiAgICAgICAgdGhpcy5hZGRUb29sYmFyQnV0dG9uKHRoaXMuX3Rvb2xiYXJJZEVkaXRNb2RlLCB0aGlzLl90b29sYmFyVG9vbFRpcEVkaXRNb2RlLCBpbWFnZURpcmVjdG9yeSArIFwiZWRpdE1vZGUuc3ZnXCIsIFRvb2xiYXJCdXR0b25BbGlnbm1lbnQuUmlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhY3RzIG9uIHRvb2xiYXIgY2xpY2tcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBwYXJhbSB7Kn0gc2lnbmFsTWFuYWdlcldpZGdldFxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJUcmVlR3JpZFRvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHRvb2xiYXJDbGljayhhcmdzLCBzaWduYWxNYW5hZ2VyV2lkZ2V0OiBTaWduYWxNYW5hZ2VyV2lkZ2V0KSB7XHJcbiAgICAgICAgc3VwZXIudG9vbGJhckNsaWNrQmFzZShhcmdzKTtcclxuICAgICAgICB2YXIgY2xpY2tlZFRvb2xiYXJJZCA9IHRoaXMuZ2V0Q2xpY2tlZFRvb2xiYXJJZChhcmdzLml0ZW1OYW1lLCBhcmdzLm1vZGVsLnRvb2xiYXJTZXR0aW5ncyk7XHJcbiAgICAgICAgaWYgKGNsaWNrZWRUb29sYmFySWQgPT0gdGhpcy5fdG9vbGJhcklkSW1wb3J0KSB7XHJcbiAgICAgICAgICAgIHNpZ25hbE1hbmFnZXJXaWRnZXQuaW1wb3J0U2VyaWVHcm91cCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjbGlja2VkVG9vbGJhcklkID09IHRoaXMuX3Rvb2xiYXJJZEV4cG9ydCkge1xyXG4gICAgICAgICAgICBsZXQgaXRlbXMgPSBuZXcgRXhwb3J0SGVscGVyKCkuZ2V0RXhwb3J0YWJsZUVsZW1lbnRzKGFyZ3MubW9kZWwuc2VsZWN0ZWRJdGVtcyk7XHJcbiAgICAgICAgICAgIHNpZ25hbE1hbmFnZXJXaWRnZXQuZXhwb3J0U2VyaWVHcm91cChpdGVtcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGNsaWNrZWRUb29sYmFySWQgPT0gdGhpcy5fdG9vbGJhcklkQ2FsY3VsYXRpb24pIHtcclxuICAgICAgICAgICAgc2lnbmFsTWFuYWdlcldpZGdldC5pbnNlcnRDYWxjdWxhdGlvbihhcmdzLm1vZGVsLnNlbGVjdGVkSXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGNsaWNrZWRUb29sYmFySWQgPT0gdGhpcy5fdG9vbGJhcklkRGVsZXRlKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZEl0ZW1zID0gT2JqZWN0LmFzc2lnbihbXSwgYXJncy5tb2RlbC5zZWxlY3RlZEl0ZW1zKTtcclxuICAgICAgICAgICAgaWYgKHNpZ25hbE1hbmFnZXJXaWRnZXQuY29udGFpbnNJdGVtV2l0aGluUmVjZW50T3JVcGxvYWRlZChzZWxlY3RlZEl0ZW1zKSkge1xyXG4gICAgICAgICAgICAgICAgc2lnbmFsTWFuYWdlcldpZGdldC5zaG93TWVzc2FnZUJveEZvckRlbGV0aW5nSXRlbShzZWxlY3RlZEl0ZW1zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNpZ25hbE1hbmFnZXJXaWRnZXQuZGVsZXRlSXRlbXMoc2VsZWN0ZWRJdGVtcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY2xpY2tlZFRvb2xiYXJJZCA9PSB0aGlzLl90b29sYmFySWRFZGl0TW9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9lZGl0TW9kZUFjdGl2YXRlZCA9ICF0aGlzLl9lZGl0TW9kZUFjdGl2YXRlZDtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZUVkaXRNb2RlQnV0dG9uKHRoaXMuX2VkaXRNb2RlQWN0aXZhdGVkKTtcclxuICAgICAgICAgICAgc2lnbmFsTWFuYWdlcldpZGdldC5hY3RpdmF0ZUVkaXRNb2RlKHRoaXMuX2VkaXRNb2RlQWN0aXZhdGVkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpc2FibGVFeHBvcnRCdXR0b24oZGlzYWJsZTogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZUJ1dHRvbih0aGlzLl90b29sYmFySWRFeHBvcnQsIGRpc2FibGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNhYmxlRGVsZXRlQnV0dG9uKGRpc2FibGU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLmRpc2FibGVCdXR0b24odGhpcy5fdG9vbGJhcklkRGVsZXRlLCBkaXNhYmxlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzYWJsZUluc2VydENhbGN1bGF0aW9uQnV0dG9uKGRpc2FibGU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLmRpc2FibGVCdXR0b24odGhpcy5fdG9vbGJhcklkQ2FsY3VsYXRpb24sIGRpc2FibGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhY3RpdmF0ZUVkaXRNb2RlQnV0dG9uKGFjdGl2YXRlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fZWRpdE1vZGVBY3RpdmF0ZWQgPSBhY3RpdmF0ZTtcclxuICAgICAgICB0aGlzLmFjdGl2YXRlQnV0dG9uKHRoaXMuX3Rvb2xiYXJJZEVkaXRNb2RlLCBhY3RpdmF0ZSk7XHJcbiAgICB9XHJcbn0iXX0=