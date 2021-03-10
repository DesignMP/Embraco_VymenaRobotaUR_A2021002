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
define(["require", "exports", "./widgetBase"], function (require, exports, widgetBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TreeGridWidgetBase = /** @class */ (function (_super) {
        __extends(TreeGridWidgetBase, _super);
        function TreeGridWidgetBase() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._headerHeight = 0;
            _this._footerHeight = 0;
            _this._columnIndexForDynamicSize = -1; // -1 for no dynamic size behavior
            _this._minColumnWidthForDynamicColumn = 10;
            _this._hideColumnHeader = false;
            _this._hideHeaderFilterBar = false;
            return _this;
        }
        TreeGridWidgetBase.prototype.initialize = function (layoutContainerId, headerHeight, footerHeight) {
            if (headerHeight === void 0) { headerHeight = 0; }
            if (footerHeight === void 0) { footerHeight = 0; }
            this.initializeLocales();
            this._mainContainerId = layoutContainerId;
            if (headerHeight != 0 || footerHeight != 0) {
                // Add additional divs 
                this._headerContainerId = layoutContainerId + "_header";
                this._mainContainerId = layoutContainerId + "_main";
                this._footerContainerId = layoutContainerId + "_footer";
                if (headerHeight != 0) {
                    this._headerHeight = headerHeight;
                    $("#" + layoutContainerId).append("<div class='widgetHeader' id='" + this._headerContainerId + "' style='height: " + this._headerHeight + "px'></div>");
                }
                $("#" + layoutContainerId).append("<div id='" + this._mainContainerId + "'></div>");
                if (footerHeight != 0) {
                    this._footerHeight = footerHeight;
                    $("#" + layoutContainerId).append("<div class='widgetFooter' id='" + this._footerContainerId + "' style='height: " + this._footerHeight + "px'></div>");
                }
            }
            else {
                this._headerHeight = 0;
            }
            _super.prototype.initialize.call(this, this._mainContainerId);
        };
        TreeGridWidgetBase.prototype.dispose = function () {
            var treeGridObject = this.getTreeGridObject();
            if (treeGridObject != undefined) {
                treeGridObject.destroy();
            }
            _super.prototype.dispose.call(this);
        };
        /**
         * Sets a dynamic column
         * This column will be resized if the window/widget were resized
         *
         * @param {number} columnIndex
         * @param {number} minColumnWidthForDynamicColumn
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.setDynamicColumn = function (columnIndex, minColumnWidthForDynamicColumn) {
            this._columnIndexForDynamicSize = columnIndex;
            this._minColumnWidthForDynamicColumn = minColumnWidthForDynamicColumn;
        };
        /**
         * Loads the styles for the tree grid widget base
         *
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.loadStyles = function () {
            _super.prototype.addStyle.call(this, "widgets/common/style/css/treeGridStyle.css");
            _super.prototype.addStyle.call(this, "widgets/common/style/css/treeGridScrollBarStyle.css");
            _super.prototype.addStyle.call(this, "widgets/common/style/css/treeGridIconStyle.css");
            _super.prototype.addStyle.call(this, "widgets/common/style/css/treeGridToolbarButtonStyle.css");
            _super.prototype.addStyle.call(this, "widgets/common/style/css/widgetHeaderFooterStyle.css");
        };
        /**
         * Sets the flag that the column header of the tree grid should be hidden
         *
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.setColumnHeaderHidden = function () {
            this._hideColumnHeader = true;
        };
        /**
         * Sets the flag that the header filterbar of the tree grid should be hidden
         *
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.setHeaderFilterBarHidden = function () {
            this._hideHeaderFilterBar = true;
        };
        /** sets the tree grid header content
         *
         * @param {string} content
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.setHeaderContent = function (content) {
            $("#" + this._headerContainerId)[0].innerHTML = content;
        };
        /** sets the tree grid footer content
         *
         * @param {string} content
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.setFooterContent = function (content) {
            $("#" + this._footerContainerId)[0].innerHTML = content;
        };
        /** resizes the tree grid widget
         *
         * @param {number} width
         * @param {number} height
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.resize = function (width, height) {
            this._actualWidth = width;
            this._actualHeight = height;
            var newWidth = "";
            var newHeight = "";
            if (width != 0) {
                newWidth = width + "px";
            }
            if (height != 0) {
                newHeight = height - this._headerHeight - this._footerHeight + "px";
            }
            var treeGridObj = this.getTreeGridObject(), sizeSettings = {
                height: newHeight, width: newWidth,
            };
            if (treeGridObj) {
                // Save cell if currently in edit mode before start resizing the treegrid, otherwise errors would occur
                treeGridObj.saveCell();
                treeGridObj.option("sizeSettings", sizeSettings, true); // force the setting to resize the treegrid correct
            }
            if (this._columnIndexForDynamicSize != -1) {
                this.fillSpaceWithDynamicColumn(width);
            }
        };
        TreeGridWidgetBase.prototype.setModel = function (model, force) {
            if (force === void 0) { force = false; }
            var treeGridObj = this.getTreeGridObject();
            treeGridObj.setModel({ "dataSource": model }, force);
            if (this._columnIndexForDynamicSize != -1) {
                // To avoid empty space after last column because of removing the scrollbar if less data is available
                this.fillSpaceWithDynamicColumn(this.width);
            }
        };
        /**
         * Resize dynamic column
         * If changed column was dynamic column the size of the last column will be adapted
         *
         * @param {*} columnIndex	columnIndex of changed column
         * @param {*} treeGridModel
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.resizeDynamicColumn = function (columnIndex, treeGridModel) {
            var treeGridWidth = parseInt(treeGridModel.sizeSettings.width, 10); // parseInt to remove "px"
            if (columnIndex != this._columnIndexForDynamicSize && columnIndex < this._columnIndexForDynamicSize) {
                this.fillSpaceWithDynamicColumn(treeGridWidth);
            }
            else {
                // Dynamic column size was changed => update last "visible" column to fill space
                var lastVisibleColumnIndex = this.getLastVisibleColumnIndex(treeGridModel);
                this.fillSpaceWithColumn(lastVisibleColumnIndex, treeGridWidth);
            }
        };
        /**
         * Returns the index of the last visible column
         *
         * @private
         * @param {*} treeGridModel
         * @returns
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.getLastVisibleColumnIndex = function (treeGridModel) {
            for (var i = treeGridModel.columns.length - 1; i >= 0; i--) {
                if (treeGridModel.columns[i].visible == true) {
                    return i;
                }
            }
            return -1;
        };
        /**
         * creates the tree grid
         *
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.createWidgets = function () {
            this.createColumnTemplates();
            this.createTreeGrid();
            if (this.hideSomeTableHeaderParts() == true) {
                // Hide some header parts of treegrid
                this.hideTableHeader();
            }
        };
        /**
         * Returns the ej tree grid object
         *
         * @returns {ej.TreeGrid}
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.getTreeGridObject = function () {
            return $(this.cssParentContentId).data("ejTreeGrid");
        };
        /**
         * Returns the tree record for the given element
         *
         * @protected
         * @param {*} element
         * @returns {any}
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.getTreeRecord = function (element) {
            var treegridObj = this.getTreeGridObject();
            var tr = element.closest("tr");
            if (tr != undefined) {
                var index = tr.rowIndex;
                if (treegridObj.model.currentViewData != undefined) {
                    return treegridObj.model.currentViewData[index];
                }
            }
            return undefined;
        };
        /**
         * Set the focus to the current tree grid
         *
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.focus = function () {
            // TODO: No public focus method available for tree grid, but needed for forcing the focus to the tree grid if draggable is used in a tree grid
            // (in case of draggable tree grid will not be focused because not the treegrid row will be selected on a click, but the directly div will by selected => svg or other div)
            this.getTreeGridObject()._focusTreeGridElement();
        };
        /**
         * Initializes locale resources
         *
         * @private
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.initializeLocales = function () {
            // get the locales for the treegrid
            var loc = ej.TreeGrid.Locale;
            // show an empty string if no records are available
            loc.default.emptyRecord = "";
        };
        TreeGridWidgetBase.prototype.fillSpaceWithDynamicColumn = function (treegridWidth) {
            if (this._columnIndexForDynamicSize == -1) {
                return;
            }
            this.fillSpaceWithColumn(this._columnIndexForDynamicSize, treegridWidth);
        };
        TreeGridWidgetBase.prototype.fillSpaceWithColumn = function (fillSpaceColumnIndex, treegridWidth) {
            var treeObj = this.getTreeGridObject();
            if (!treeObj) {
                return;
            }
            var columns = treeObj.option("columns");
            if (!columns) {
                return;
            }
            var newColumnWidth = this.getNewColumnWidth(treegridWidth, columns, fillSpaceColumnIndex);
            if (newColumnWidth > this._minColumnWidthForDynamicColumn) {
                columns[fillSpaceColumnIndex].width = newColumnWidth - 3; //-3 to avoid scrollbar
                columns[fillSpaceColumnIndex].width -= this.getScrollBarWidth(); // remove scrollbar size
                treeObj.option("columns", columns, true);
                if (this.hideSomeTableHeaderParts() == true) {
                    // After setting the treegrid column sizes, the header parts will be shown => hide header parts if not needed
                    this.hideTableHeader();
                }
            }
        };
        TreeGridWidgetBase.prototype.setColumnWidth = function (index, width) {
            var treeObj = this.getTreeGridObject();
            if (!treeObj) {
                return;
            }
            var columns = treeObj.option("columns");
            if (!columns) {
                return;
            }
            columns[index].width = width;
            treeObj.option("columns", columns, true);
            this.fillSpaceWithColumn(this._columnIndexForDynamicSize, this._actualWidth);
        };
        /**
         * Returns true if some parts of the table header should be hidden(e.g. column header, filterbar, ...)
         *
         * @private
         * @returns {boolean}
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.hideSomeTableHeaderParts = function () {
            if (this._hideColumnHeader == true) {
                return true;
            }
            if (this._hideHeaderFilterBar == true) {
                return true;
            }
            return false;
        };
        TreeGridWidgetBase.prototype.getScrollBarWidth = function () {
            var viewDiv = $(this.cssParentContentId + "e-gridcontent");
            for (var childIndex = 0; childIndex < viewDiv[0].children.length; childIndex++) {
                var child = viewDiv[0].children[childIndex];
                if (child.classList.contains("e-vscrollbar") == true) {
                    return child.clientWidth;
                }
            }
            return 0;
        };
        TreeGridWidgetBase.prototype.getNewColumnWidth = function (treegridWidth, columns, fillSpaceColumnIndex) {
            var newColumnWidth = treegridWidth;
            for (var columnIndex = 0; columnIndex < columns.length; columnIndex++) {
                if (columnIndex != fillSpaceColumnIndex) {
                    if (columns[columnIndex] != undefined && columns[columnIndex].visible == true) {
                        newColumnWidth -= columns[columnIndex].width;
                    }
                }
            }
            return newColumnWidth;
        };
        /**
         * Hides the table header parts which are currently defined to be hidden(e.g. _hideColumnHeader, _hideHeaderFilterBar, ...)
         *
         * @private
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.hideTableHeader = function () {
            var $treeGridHeader = $("#" + this._mainContainerId + "e-gridheader");
            var tableHeader = $treeGridHeader[0].children[0].children[0];
            if (tableHeader != undefined) {
                var columnHeader = tableHeader.rows[0];
                var filterBar = tableHeader.rows[1];
                if (columnHeader != undefined) {
                    if (this._hideColumnHeader == true) {
                        // hide column header
                        columnHeader.style.display = "none";
                    }
                }
                if (filterBar != undefined) {
                    if (this._hideHeaderFilterBar == true) {
                        // hide filterbar
                        filterBar.style.display = "none";
                    }
                }
            }
        };
        /**
         * Creates the column templates for the tree grid and adds them to the widget container
         *
         * @protected
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.createColumnTemplates = function () {
        };
        return TreeGridWidgetBase;
    }(widgetBase_1.WidgetBase));
    exports.TreeGridWidgetBase = TreeGridWidgetBase;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZUdyaWRXaWRnZXRCYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NvbW1vbi90cmVlR3JpZFdpZGdldEJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUVBO1FBQTBDLHNDQUFVO1FBQXBEO1lBQUEscUVBd1lDO1lBcFlVLG1CQUFhLEdBQUcsQ0FBQyxDQUFDO1lBQ2xCLG1CQUFhLEdBQUcsQ0FBQyxDQUFDO1lBTXBCLGdDQUEwQixHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsa0NBQWtDO1lBQ25FLHFDQUErQixHQUFHLEVBQUUsQ0FBQztZQUNyQyx1QkFBaUIsR0FBRyxLQUFLLENBQUM7WUFDMUIsMEJBQW9CLEdBQUcsS0FBSyxDQUFDOztRQTBYdEMsQ0FBQztRQXhYQSx1Q0FBVSxHQUFWLFVBQVcsaUJBQXlCLEVBQUUsWUFBd0IsRUFBRSxZQUF3QjtZQUFsRCw2QkFBQSxFQUFBLGdCQUF3QjtZQUFFLDZCQUFBLEVBQUEsZ0JBQXdCO1lBRXZGLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBRXpCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxpQkFBaUIsQ0FBQztZQUMxQyxJQUFHLFlBQVksSUFBSSxDQUFDLElBQUksWUFBWSxJQUFJLENBQUMsRUFBQztnQkFDekMsdUJBQXVCO2dCQUN2QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsaUJBQWlCLEdBQUcsU0FBUyxDQUFDO2dCQUN4RCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsaUJBQWlCLEdBQUcsT0FBTyxDQUFDO2dCQUNwRCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsaUJBQWlCLEdBQUcsU0FBUyxDQUFDO2dCQUN4RCxJQUFHLFlBQVksSUFBSSxDQUFDLEVBQUM7b0JBQ3BCLElBQUksQ0FBQyxhQUFhLEdBQUcsWUFBWSxDQUFDO29CQUNsQyxDQUFDLENBQUMsR0FBRyxHQUFFLGlCQUFpQixDQUFD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O1FBRUEsQ0FBQztRQUdGLHlCQUFDO0lBQUQsQ0FBQyxBQXhZRCxDQUEwQyx1QkFBVSxHQXdZbkQ7SUFFTyxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBXaWRnZXRCYXNlIH0gZnJvbSBcIi4vd2lkZ2V0QmFzZVwiO1xyXG5cclxuYWJzdHJhY3QgY2xhc3MgVHJlZUdyaWRXaWRnZXRCYXNlIGV4dGVuZHMgV2lkZ2V0QmFzZXtcclxuXHJcblx0cHJvdGVjdGVkIF9hY3R1YWxXaWR0aDtcclxuXHRwcm90ZWN0ZWQgX2FjdHVhbEhlaWdodDtcclxuXHRwcm90ZWN0ZWQgX2hlYWRlckhlaWdodCA9IDA7XHJcblx0cHJvdGVjdGVkIF9mb290ZXJIZWlnaHQgPSAwO1xyXG5cclxuXHRwcml2YXRlIF9oZWFkZXJDb250YWluZXJJZDtcclxuXHRwcml2YXRlIF9tYWluQ29udGFpbmVySWQ7XHJcblx0cHJpdmF0ZSBfZm9vdGVyQ29udGFpbmVySWQ7XHJcblxyXG5cdHByaXZhdGUgX2NvbHVtbkluZGV4Rm9yRHluYW1pY1NpemUgPSAtMTsgLy8gLTEgZm9yIG5vIGR5bmFtaWMgc2l6ZSBiZWhhdmlvclxyXG5cdHByaXZhdGUgX21pbkNvbHVtbldpZHRoRm9yRHluYW1pY0NvbHVtbiA9IDEwO1xyXG5cdHByaXZhdGUgX2hpZGVDb2x1bW5IZWFkZXIgPSBmYWxzZTtcclxuXHRwcml2YXRlIF9oaWRlSGVhZGVyRmlsdGVyQmFyID0gZmFsc2U7XHJcblxyXG5cdGluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQ6IHN0cmluZywgaGVhZGVySGVpZ2h0OiBudW1iZXIgPSAwLCBmb290ZXJIZWlnaHQ6IG51bWJlciA9IDApIHtcclxuXHJcblx0XHR0aGlzLmluaXRpYWxpemVMb2NhbGVzKCk7XHJcblxyXG5cdFx0dGhpcy5fbWFpbkNvbnRhaW5lcklkID0gbGF5b3V0Q29udGFpbmVySWQ7XHJcblx0XHRpZihoZWFkZXJIZWlnaHQgIT0gMCB8fCBmb290ZXJIZWlnaHQgIT0gMCl7XHJcblx0XHRcdC8vIEFkZCBhZGRpdGlvbmFsIGRpdnMgXHJcblx0XHRcdHRoaXMuX2hlYWRlckNvbnRhaW5lcklkID0gbGF5b3V0Q29udGFpbmVySWQgKyBcIl9oZWFkZXJcIjtcclxuXHRcdFx0dGhpcy5fbWFpbkNvbnRhaW5lcklkID0gbGF5b3V0Q29udGFpbmVySWQgKyBcIl9tYWluXCI7XHJcblx0XHRcdHRoaXMuX2Zvb3RlckNvbnRhaW5lcklkID0gbGF5b3V0Q29udGFpbmVySWQgKyBcIl9mb290ZXJcIjtcclxuXHRcdFx0aWYoaGVhZGVySGVpZ2h0ICE9IDApe1xyXG5cdFx0XHRcdHRoaXMuX2hlYWRlckhlaWdodCA9IGhlYWRlckhlaWdodDtcclxuXHRcdFx0XHQkKFwiI1wiKyBsYXlvdXRDb250YWluZXJJZCkuYXBwZW5kKFwiPGRpdiBjbGFzcz0nd2lkZ2V0SGVhZGVyJyBpZD0nXCIrIHRoaXMuX2hlYWRlckNvbnRhaW5lcklkICsgXCInIHN0eWxlPSdoZWlnaHQ6IFwiKyB0aGlzLl9oZWFkZXJIZWlnaHQgKyBcInB4Jz48L2Rpdj5cIilcclxuXHRcdFx0fVxyXG5cdFx0XHQkKFwiI1wiKyBsYXlvdXRDb250YWluZXJJZCkuYXBwZW5kKFwiPGRpdiBpZD0nXCIrIHRoaXMuX21haW5Db250YWluZXJJZCArIFwiJz48L2Rpdj5cIilcclxuXHRcdFx0aWYoZm9vdGVySGVpZ2h0ICE9IDApe1xyXG5cdFx0XHRcdHRoaXMuX2Zvb3RlckhlaWdodCA9IGZvb3RlckhlaWdodDtcclxuXHRcdFx0XHQkKFwiI1wiKyBsYXlvdXRDb250YWluZXJJZCkuYXBwZW5kKFwiPGRpdiBjbGFzcz0nd2lkZ2V0Rm9vdGVyJyBpZD0nXCIrIHRoaXMuX2Zvb3RlckNvbnRhaW5lcklkICsgXCInIHN0eWxlPSdoZWlnaHQ6IFwiKyB0aGlzLl9mb290ZXJIZWlnaHQgKyBcInB4Jz48L2Rpdj5cIilcclxuXHRcdFx0fVxyXG5cclxuXHRcdH1lbHNle1xyXG5cdFx0XHR0aGlzLl9oZWFkZXJIZWlnaHQgPSAwO1xyXG5cdFx0fVxyXG5cclxuXHRcdHN1cGVyLmluaXRpYWxpemUodGhpcy5fbWFpbkNvbnRhaW5lcklkKTtcclxuXHR9XHJcblxyXG5cdGRpc3Bvc2UoKXtcclxuXHRcdGxldCB0cmVlR3JpZE9iamVjdCA9IHRoaXMuZ2V0VHJlZUdyaWRPYmplY3QoKTtcclxuXHRcdGlmKHRyZWVHcmlkT2JqZWN0ICE9IHVuZGVmaW5lZCl7XHJcblx0XHRcdHRyZWVHcmlkT2JqZWN0LmRlc3Ryb3koKTtcclxuXHRcdH1cclxuXHRcdHN1cGVyLmRpc3Bvc2UoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgYSBkeW5hbWljIGNvbHVtblxyXG5cdCAqIFRoaXMgY29sdW1uIHdpbGwgYmUgcmVzaXplZCBpZiB0aGUgd2luZG93L3dpZGdldCB3ZXJlIHJlc2l6ZWRcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBjb2x1bW5JbmRleFxyXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBtaW5Db2x1bW5XaWR0aEZvckR5bmFtaWNDb2x1bW5cclxuXHQgKiBAbWVtYmVyb2YgVHJlZUdyaWRXaWRnZXRCYXNlXHJcblx0ICovXHJcblx0c2V0RHluYW1pY0NvbHVtbihjb2x1bW5JbmRleDogbnVtYmVyLCBtaW5Db2x1bW5XaWR0aEZvckR5bmFtaWNDb2x1bW46IG51bWJlcil7XHJcblx0XHR0aGlzLl9jb2x1bW5JbmRleEZvckR5bmFtaWNTaXplID0gY29sdW1uSW5kZXg7XHJcblx0XHR0aGlzLl9taW5Db2x1bW5XaWR0aEZvckR5bmFtaWNDb2x1bW4gPSBtaW5Db2x1bW5XaWR0aEZvckR5bmFtaWNDb2x1bW47XHJcblx0fVxyXG5cclxuXHQvKipcclxuICAgICAqIExvYWRzIHRoZSBzdHlsZXMgZm9yIHRoZSB0cmVlIGdyaWQgd2lkZ2V0IGJhc2VcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJlZUdyaWRXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIGxvYWRTdHlsZXMoKXtcclxuXHRcdHN1cGVyLmFkZFN0eWxlKFwid2lkZ2V0cy9jb21tb24vc3R5bGUvY3NzL3RyZWVHcmlkU3R5bGUuY3NzXCIpO1xyXG5cdFx0c3VwZXIuYWRkU3R5bGUoXCJ3aWRnZXRzL2NvbW1vbi9zdHlsZS9jc3MvdHJlZUdyaWRTY3JvbGxCYXJTdHlsZS5jc3NcIik7XHJcblx0XHRzdXBlci5hZGRTdHlsZShcIndpZGdldHMvY29tbW9uL3N0eWxlL2Nzcy90cmVlR3JpZEljb25TdHlsZS5jc3NcIik7XHJcblx0XHRzdXBlci5hZGRTdHlsZShcIndpZGdldHMvY29tbW9uL3N0eWxlL2Nzcy90cmVlR3JpZFRvb2xiYXJCdXR0b25TdHlsZS5jc3NcIik7XHJcblx0XHRzdXBlci5hZGRTdHlsZShcIndpZGdldHMvY29tbW9uL3N0eWxlL2Nzcy93aWRnZXRIZWFkZXJGb290ZXJTdHlsZS5jc3NcIik7XHJcbiAgICB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGZsYWcgdGhhdCB0aGUgY29sdW1uIGhlYWRlciBvZiB0aGUgdHJlZSBncmlkIHNob3VsZCBiZSBoaWRkZW5cclxuXHQgKlxyXG5cdCAqIEBtZW1iZXJvZiBUcmVlR3JpZFdpZGdldEJhc2VcclxuXHQgKi9cclxuXHRzZXRDb2x1bW5IZWFkZXJIaWRkZW4oKXtcclxuXHRcdHRoaXMuX2hpZGVDb2x1bW5IZWFkZXIgPSB0cnVlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgZmxhZyB0aGF0IHRoZSBoZWFkZXIgZmlsdGVyYmFyIG9mIHRoZSB0cmVlIGdyaWQgc2hvdWxkIGJlIGhpZGRlblxyXG5cdCAqXHJcblx0ICogQG1lbWJlcm9mIFRyZWVHcmlkV2lkZ2V0QmFzZVxyXG5cdCAqL1xyXG5cdHNldEhlYWRlckZpbHRlckJhckhpZGRlbigpe1xyXG5cdFx0dGhpcy5faGlkZUhlYWRlckZpbHRlckJhciA9IHRydWU7XHJcblx0fVxyXG5cclxuXHQvKiogc2V0cyB0aGUgdHJlZSBncmlkIGhlYWRlciBjb250ZW50IFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJlZUdyaWRXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuXHRzZXRIZWFkZXJDb250ZW50KGNvbnRlbnQ6c3RyaW5nKXtcclxuXHRcdCQoXCIjXCIrIHRoaXMuX2hlYWRlckNvbnRhaW5lcklkKVswXS5pbm5lckhUTUwgPSBjb250ZW50O1xyXG5cdH1cclxuXHJcblx0LyoqIHNldHMgdGhlIHRyZWUgZ3JpZCBmb290ZXIgY29udGVudCBcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29udGVudFxyXG4gICAgICogQG1lbWJlcm9mIFRyZWVHcmlkV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcblx0c2V0Rm9vdGVyQ29udGVudChjb250ZW50OnN0cmluZyl7XHJcblx0XHQkKFwiI1wiKyB0aGlzLl9mb290ZXJDb250YWluZXJJZClbMF0uaW5uZXJIVE1MID0gY29udGVudDtcclxuXHR9XHJcblxyXG5cdC8qKiByZXNpemVzIHRoZSB0cmVlIGdyaWQgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJlZUdyaWRXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIHJlc2l6ZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcil7XHJcblx0XHR0aGlzLl9hY3R1YWxXaWR0aCA9IHdpZHRoO1xyXG5cdFx0dGhpcy5fYWN0dWFsSGVpZ2h0ID0gaGVpZ2h0O1xyXG5cclxuXHRcdHZhciBuZXdXaWR0aCA6IHN0cmluZyA9IFwiXCI7XHJcblx0XHR2YXIgbmV3SGVpZ2h0IDogc3RyaW5nID0gXCJcIjtcclxuXHRcdGlmKHdpZHRoICE9IDApe1xyXG5cdFx0XHRuZXdXaWR0aCA9IHdpZHRoICsgXCJweFwiO1xyXG5cdFx0fVxyXG5cdFx0aWYoaGVpZ2h0ICE9IDApe1xyXG5cdFx0XHRuZXdIZWlnaHQgPSBoZWlnaHQgLSB0aGlzLl9oZWFkZXJIZWlnaHQgLSB0aGlzLl9mb290ZXJIZWlnaHQrIFwicHhcIjtcclxuXHRcdH1cclxuXHRcdFx0XHJcblx0XHR2YXIgdHJlZUdyaWRPYmogPSB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCksXHJcblx0XHRcdHNpemVTZXR0aW5ncyA9IHtcclxuXHRcdFx0XHRoZWlnaHQ6IG5ld0hlaWdodCwgd2lkdGg6IG5ld1dpZHRoLCAvLyAxMDAlIHdvdWxkIGJlIHdyb25nID0+IHNldCBlbXB0eSBzdHJpbmcgdG8gcmVzaXplIHRoZSB0cmVlZ3JpZCBjb3JyZWN0XHJcblx0XHR9O1xyXG5cdFx0aWYgKHRyZWVHcmlkT2JqKXtcclxuXHRcdFx0Ly8gU2F2ZSBjZWxsIGlmIGN1cnJlbnRseSBpbiBlZGl0IG1vZGUgYmVmb3JlIHN0YXJ0IHJlc2l6aW5nIHRoZSB0cmVlZ3JpZCwgb3RoZXJ3aXNlIGVycm9ycyB3b3VsZCBvY2N1clxyXG5cdFx0XHR0cmVlR3JpZE9iai5zYXZlQ2VsbCgpOyBcclxuXHRcdFx0dHJlZUdyaWRPYmoub3B0aW9uKFwic2l6ZVNldHRpbmdzXCIsIHNpemVTZXR0aW5ncywgdHJ1ZSk7IC8vIGZvcmNlIHRoZSBzZXR0aW5nIHRvIHJlc2l6ZSB0aGUgdHJlZWdyaWQgY29ycmVjdFxyXG5cdFx0fVxyXG5cdFx0aWYodGhpcy5fY29sdW1uSW5kZXhGb3JEeW5hbWljU2l6ZSAhPSAtMSl7XHJcblx0XHRcdHRoaXMuZmlsbFNwYWNlV2l0aER5bmFtaWNDb2x1bW4od2lkdGgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c2V0TW9kZWwobW9kZWw6IGFueSwgZm9yY2U6IGJvb2xlYW4gPSBmYWxzZSl7XHJcblx0XHR2YXIgdHJlZUdyaWRPYmogPSB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCk7XHJcblx0XHR0cmVlR3JpZE9iai5zZXRNb2RlbCh7XCJkYXRhU291cmNlXCIgOiBtb2RlbH0sIGZvcmNlKTtcclxuXHRcdFxyXG5cdFx0aWYodGhpcy5fY29sdW1uSW5kZXhGb3JEeW5hbWljU2l6ZSAhPSAtMSl7XHJcblx0XHRcdC8vIFRvIGF2b2lkIGVtcHR5IHNwYWNlIGFmdGVyIGxhc3QgY29sdW1uIGJlY2F1c2Ugb2YgcmVtb3ZpbmcgdGhlIHNjcm9sbGJhciBpZiBsZXNzIGRhdGEgaXMgYXZhaWxhYmxlXHJcblx0XHRcdHRoaXMuZmlsbFNwYWNlV2l0aER5bmFtaWNDb2x1bW4odGhpcy53aWR0aCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXNpemUgZHluYW1pYyBjb2x1bW5cclxuXHQgKiBJZiBjaGFuZ2VkIGNvbHVtbiB3YXMgZHluYW1pYyBjb2x1bW4gdGhlIHNpemUgb2YgdGhlIGxhc3QgY29sdW1uIHdpbGwgYmUgYWRhcHRlZFxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHsqfSBjb2x1bW5JbmRleFx0Y29sdW1uSW5kZXggb2YgY2hhbmdlZCBjb2x1bW5cclxuXHQgKiBAcGFyYW0geyp9IHRyZWVHcmlkTW9kZWxcclxuXHQgKiBAbWVtYmVyb2YgVHJlZUdyaWRXaWRnZXRCYXNlXHJcblx0ICovXHJcblx0cmVzaXplRHluYW1pY0NvbHVtbihjb2x1bW5JbmRleCwgdHJlZUdyaWRNb2RlbCl7XHJcblx0XHRsZXQgdHJlZUdyaWRXaWR0aCA9IHBhcnNlSW50KHRyZWVHcmlkTW9kZWwuc2l6ZVNldHRpbmdzLndpZHRoLCAxMCk7IC8vIHBhcnNlSW50IHRvIHJlbW92ZSBcInB4XCJcclxuXHRcdGlmKGNvbHVtbkluZGV4ICE9IHRoaXMuX2NvbHVtbkluZGV4Rm9yRHluYW1pY1NpemUgJiYgY29sdW1uSW5kZXggPCB0aGlzLl9jb2x1bW5JbmRleEZvckR5bmFtaWNTaXplKXtcclxuXHRcdFx0dGhpcy5maWxsU3BhY2VXaXRoRHluYW1pY0NvbHVtbih0cmVlR3JpZFdpZHRoKTsgXHJcblx0XHR9XHJcblx0XHRlbHNle1xyXG5cdFx0XHQvLyBEeW5hbWljIGNvbHVtbiBzaXplIHdhcyBjaGFuZ2VkID0+IHVwZGF0ZSBsYXN0IFwidmlzaWJsZVwiIGNvbHVtbiB0byBmaWxsIHNwYWNlXHJcblx0XHRcdGxldCBsYXN0VmlzaWJsZUNvbHVtbkluZGV4ID0gdGhpcy5nZXRMYXN0VmlzaWJsZUNvbHVtbkluZGV4KHRyZWVHcmlkTW9kZWwpO1xyXG5cdFx0XHR0aGlzLmZpbGxTcGFjZVdpdGhDb2x1bW4obGFzdFZpc2libGVDb2x1bW5JbmRleCwgdHJlZUdyaWRXaWR0aCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbGFzdCB2aXNpYmxlIGNvbHVtblxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0geyp9IHRyZWVHcmlkTW9kZWxcclxuXHQgKiBAcmV0dXJuc1xyXG5cdCAqIEBtZW1iZXJvZiBUcmVlR3JpZFdpZGdldEJhc2VcclxuXHQgKi9cclxuXHRwcml2YXRlIGdldExhc3RWaXNpYmxlQ29sdW1uSW5kZXgodHJlZUdyaWRNb2RlbCl7XHJcblx0XHRmb3IobGV0IGkgPSAgdHJlZUdyaWRNb2RlbC5jb2x1bW5zLmxlbmd0aC0xOyBpID49IDA7IGktLSl7XHJcblx0XHRcdGlmKHRyZWVHcmlkTW9kZWwuY29sdW1uc1tpXS52aXNpYmxlID09IHRydWUpe1xyXG5cdFx0XHRcdHJldHVybiBpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gLTE7XHJcblx0fVxyXG5cclxuICAgIC8qKlxyXG5cdCAqIGNyZWF0ZXMgdGhlIHRyZWUgZ3JpZFxyXG5cdCAqXHJcblx0ICogQG1lbWJlcm9mIFRyZWVHcmlkV2lkZ2V0QmFzZVxyXG5cdCAqL1xyXG5cdGNyZWF0ZVdpZGdldHMoKSB7XHJcblx0XHRcclxuXHRcdHRoaXMuY3JlYXRlQ29sdW1uVGVtcGxhdGVzKCk7XHJcblxyXG5cdFx0dGhpcy5jcmVhdGVUcmVlR3JpZCgpO1xyXG5cdFxyXG5cdFx0aWYodGhpcy5oaWRlU29tZVRhYmxlSGVhZGVyUGFydHMoKSA9PSB0cnVlKXtcclxuXHRcdFx0Ly8gSGlkZSBzb21lIGhlYWRlciBwYXJ0cyBvZiB0cmVlZ3JpZFxyXG5cdFx0XHR0aGlzLmhpZGVUYWJsZUhlYWRlcigpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSBlaiB0cmVlIGdyaWQgb2JqZWN0XHJcblx0ICpcclxuXHQgKiBAcmV0dXJucyB7ZWouVHJlZUdyaWR9XHJcblx0ICogQG1lbWJlcm9mIFRyZWVHcmlkV2lkZ2V0QmFzZVxyXG5cdCAqL1xyXG5cdHByb3RlY3RlZCBnZXRUcmVlR3JpZE9iamVjdCgpOiBlai5UcmVlR3JpZHtcclxuXHRcdHJldHVybiAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKS5kYXRhKFwiZWpUcmVlR3JpZFwiKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIHRyZWUgcmVjb3JkIGZvciB0aGUgZ2l2ZW4gZWxlbWVudFxyXG5cdCAqXHJcblx0ICogQHByb3RlY3RlZFxyXG5cdCAqIEBwYXJhbSB7Kn0gZWxlbWVudFxyXG5cdCAqIEByZXR1cm5zIHthbnl9XHJcblx0ICogQG1lbWJlcm9mIFRyZWVHcmlkV2lkZ2V0QmFzZVxyXG5cdCAqL1xyXG5cdHByb3RlY3RlZCBnZXRUcmVlUmVjb3JkKGVsZW1lbnQpOiBhbnl7XHJcbiAgICAgICAgbGV0IHRyZWVncmlkT2JqID0gdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpO1xyXG4gICAgICAgIGxldCB0ciA9IGVsZW1lbnQuY2xvc2VzdChcInRyXCIpOyAgXHJcbiAgICAgICAgaWYodHIgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0bGV0IGluZGV4ID0gdHIucm93SW5kZXg7XHJcblx0XHRcdGlmKCg8YW55PnRyZWVncmlkT2JqLm1vZGVsKS5jdXJyZW50Vmlld0RhdGEgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0XHRyZXR1cm4gKDxhbnk+dHJlZWdyaWRPYmoubW9kZWwpLmN1cnJlbnRWaWV3RGF0YVtpbmRleF07XHJcblx0XHRcdH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0IHRoZSBmb2N1cyB0byB0aGUgY3VycmVudCB0cmVlIGdyaWRcclxuXHQgKlxyXG5cdCAqIEBtZW1iZXJvZiBUcmVlR3JpZFdpZGdldEJhc2VcclxuXHQgKi9cclxuXHRmb2N1cygpe1xyXG5cdFx0Ly8gVE9ETzogTm8gcHVibGljIGZvY3VzIG1ldGhvZCBhdmFpbGFibGUgZm9yIHRyZWUgZ3JpZCwgYnV0IG5lZWRlZCBmb3IgZm9yY2luZyB0aGUgZm9jdXMgdG8gdGhlIHRyZWUgZ3JpZCBpZiBkcmFnZ2FibGUgaXMgdXNlZCBpbiBhIHRyZWUgZ3JpZFxyXG5cdFx0Ly8gKGluIGNhc2Ugb2YgZHJhZ2dhYmxlIHRyZWUgZ3JpZCB3aWxsIG5vdCBiZSBmb2N1c2VkIGJlY2F1c2Ugbm90IHRoZSB0cmVlZ3JpZCByb3cgd2lsbCBiZSBzZWxlY3RlZCBvbiBhIGNsaWNrLCBidXQgdGhlIGRpcmVjdGx5IGRpdiB3aWxsIGJ5IHNlbGVjdGVkID0+IHN2ZyBvciBvdGhlciBkaXYpXHJcblx0XHQoPGFueT50aGlzLmdldFRyZWVHcmlkT2JqZWN0KCkpLl9mb2N1c1RyZWVHcmlkRWxlbWVudCgpO1xyXG5cdH1cclxuXHRcclxuXHJcblx0LyoqXHJcblx0ICogSW5pdGlhbGl6ZXMgbG9jYWxlIHJlc291cmNlc1xyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAbWVtYmVyb2YgVHJlZUdyaWRXaWRnZXRCYXNlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBpbml0aWFsaXplTG9jYWxlcygpIHtcclxuXHRcdC8vIGdldCB0aGUgbG9jYWxlcyBmb3IgdGhlIHRyZWVncmlkXHJcblx0XHRsZXQgbG9jID0gZWouVHJlZUdyaWQuTG9jYWxlO1xyXG5cclxuXHRcdC8vIHNob3cgYW4gZW1wdHkgc3RyaW5nIGlmIG5vIHJlY29yZHMgYXJlIGF2YWlsYWJsZVxyXG5cdFx0bG9jLmRlZmF1bHQuZW1wdHlSZWNvcmQgPSBcIlwiO1xyXG5cdH1cclxuXHRcclxuXHRwcml2YXRlIGZpbGxTcGFjZVdpdGhEeW5hbWljQ29sdW1uKHRyZWVncmlkV2lkdGg6IG51bWJlcil7XHJcblx0XHRpZih0aGlzLl9jb2x1bW5JbmRleEZvckR5bmFtaWNTaXplID09IC0xKXtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5maWxsU3BhY2VXaXRoQ29sdW1uKHRoaXMuX2NvbHVtbkluZGV4Rm9yRHluYW1pY1NpemUsIHRyZWVncmlkV2lkdGgpXHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGZpbGxTcGFjZVdpdGhDb2x1bW4oZmlsbFNwYWNlQ29sdW1uSW5kZXg6IG51bWJlciwgdHJlZWdyaWRXaWR0aDogbnVtYmVyKXtcclxuXHRcdHZhciB0cmVlT2JqID0gdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpO1xyXG5cdFx0aWYoIXRyZWVPYmope1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIGNvbHVtbnMgPSB0cmVlT2JqLm9wdGlvbihcImNvbHVtbnNcIik7IFxyXG5cdFx0aWYoIWNvbHVtbnMpe1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IG5ld0NvbHVtbldpZHRoID0gdGhpcy5nZXROZXdDb2x1bW5XaWR0aCh0cmVlZ3JpZFdpZHRoLCBjb2x1bW5zLCBmaWxsU3BhY2VDb2x1bW5JbmRleCk7XHJcbiAgICAgICAgaWYobmV3Q29sdW1uV2lkdGggPiB0aGlzLl9taW5Db2x1bW5XaWR0aEZvckR5bmFtaWNDb2x1bW4pe1xyXG4gICAgICAgICAgICBjb2x1bW5zW2ZpbGxTcGFjZUNvbHVtbkluZGV4XS53aWR0aCA9IG5ld0NvbHVtbldpZHRoLTM7IC8vLTMgdG8gYXZvaWQgc2Nyb2xsYmFyXHJcblx0XHRcdGNvbHVtbnNbZmlsbFNwYWNlQ29sdW1uSW5kZXhdLndpZHRoIC09IHRoaXMuZ2V0U2Nyb2xsQmFyV2lkdGgoKTsgICAvLyByZW1vdmUgc2Nyb2xsYmFyIHNpemVcclxuXHRcdFx0dHJlZU9iai5vcHRpb24oXCJjb2x1bW5zXCIsIGNvbHVtbnMsIHRydWUpOyBcclxuXHRcdFx0XHJcblx0XHRcdGlmKHRoaXMuaGlkZVNvbWVUYWJsZUhlYWRlclBhcnRzKCkgPT0gdHJ1ZSl7XHJcblx0XHRcdFx0Ly8gQWZ0ZXIgc2V0dGluZyB0aGUgdHJlZWdyaWQgY29sdW1uIHNpemVzLCB0aGUgaGVhZGVyIHBhcnRzIHdpbGwgYmUgc2hvd24gPT4gaGlkZSBoZWFkZXIgcGFydHMgaWYgbm90IG5lZWRlZFxyXG5cdFx0XHRcdHRoaXMuaGlkZVRhYmxlSGVhZGVyKCk7IFxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0Q29sdW1uV2lkdGgoaW5kZXg6IG51bWJlciwgd2lkdGg6IG51bWJlcil7XHJcblx0XHR2YXIgdHJlZU9iaiA9IHRoaXMuZ2V0VHJlZUdyaWRPYmplY3QoKTtcclxuXHRcdGlmKCF0cmVlT2JqKXtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBjb2x1bW5zID0gdHJlZU9iai5vcHRpb24oXCJjb2x1bW5zXCIpOyBcclxuXHRcdGlmKCFjb2x1bW5zKXtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRjb2x1bW5zW2luZGV4XS53aWR0aCA9IHdpZHRoO1xyXG5cdFx0dHJlZU9iai5vcHRpb24oXCJjb2x1bW5zXCIsIGNvbHVtbnMsIHRydWUpOyBcclxuXHJcblx0XHR0aGlzLmZpbGxTcGFjZVdpdGhDb2x1bW4odGhpcy5fY29sdW1uSW5kZXhGb3JEeW5hbWljU2l6ZSwgdGhpcy5fYWN0dWFsV2lkdGgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0cnVlIGlmIHNvbWUgcGFydHMgb2YgdGhlIHRhYmxlIGhlYWRlciBzaG91bGQgYmUgaGlkZGVuKGUuZy4gY29sdW1uIGhlYWRlciwgZmlsdGVyYmFyLCAuLi4pXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxyXG5cdCAqIEBtZW1iZXJvZiBUcmVlR3JpZFdpZGdldEJhc2VcclxuXHQgKi9cclxuXHRwcml2YXRlIGhpZGVTb21lVGFibGVIZWFkZXJQYXJ0cygpOiBib29sZWFue1xyXG5cdFx0aWYodGhpcy5faGlkZUNvbHVtbkhlYWRlciA9PSB0cnVlKXtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblx0XHRpZih0aGlzLl9oaWRlSGVhZGVyRmlsdGVyQmFyID09IHRydWUpe1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBnZXRTY3JvbGxCYXJXaWR0aCgpOiBudW1iZXJ7XHJcblx0XHR2YXIgdmlld0RpdiA9ICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQgKyBcImUtZ3JpZGNvbnRlbnRcIik7XHJcblx0XHRmb3IobGV0IGNoaWxkSW5kZXg9MDsgY2hpbGRJbmRleCA8IHZpZXdEaXZbMF0uY2hpbGRyZW4ubGVuZ3RoOyBjaGlsZEluZGV4Kyspe1xyXG5cdFx0XHRsZXQgY2hpbGQgPSB2aWV3RGl2WzBdLmNoaWxkcmVuW2NoaWxkSW5kZXhdO1xyXG5cdFx0XHRpZihjaGlsZC5jbGFzc0xpc3QuY29udGFpbnMoXCJlLXZzY3JvbGxiYXJcIikgPT0gdHJ1ZSl7XHJcblx0XHRcdFx0cmV0dXJuIGNoaWxkLmNsaWVudFdpZHRoO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gMDtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgZ2V0TmV3Q29sdW1uV2lkdGgodHJlZWdyaWRXaWR0aCwgY29sdW1ucywgZmlsbFNwYWNlQ29sdW1uSW5kZXgpOiBudW1iZXJ7XHJcblx0XHRsZXQgbmV3Q29sdW1uV2lkdGggPSB0cmVlZ3JpZFdpZHRoO1xyXG5cdFx0Zm9yKGxldCBjb2x1bW5JbmRleD0wOyBjb2x1bW5JbmRleCA8IGNvbHVtbnMubGVuZ3RoOyBjb2x1bW5JbmRleCsrKXtcclxuICAgICAgICAgICAgaWYoY29sdW1uSW5kZXggIT0gZmlsbFNwYWNlQ29sdW1uSW5kZXgpe1xyXG5cdFx0XHRcdGlmKGNvbHVtbnNbY29sdW1uSW5kZXhdICE9IHVuZGVmaW5lZCAmJiBjb2x1bW5zW2NvbHVtbkluZGV4XS52aXNpYmxlID09IHRydWUpe1xyXG5cdFx0XHRcdFx0bmV3Q29sdW1uV2lkdGggLT0gY29sdW1uc1tjb2x1bW5JbmRleF0ud2lkdGg7XHJcblx0XHRcdFx0fVxyXG4gICAgICAgICAgICB9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gbmV3Q29sdW1uV2lkdGg7XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEhpZGVzIHRoZSB0YWJsZSBoZWFkZXIgcGFydHMgd2hpY2ggYXJlIGN1cnJlbnRseSBkZWZpbmVkIHRvIGJlIGhpZGRlbihlLmcuIF9oaWRlQ29sdW1uSGVhZGVyLCBfaGlkZUhlYWRlckZpbHRlckJhciwgLi4uKVxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAbWVtYmVyb2YgVHJlZUdyaWRXaWRnZXRCYXNlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBoaWRlVGFibGVIZWFkZXIoKXtcclxuXHRcdHZhciAkdHJlZUdyaWRIZWFkZXIgPSAkKFwiI1wiICsgdGhpcy5fbWFpbkNvbnRhaW5lcklkICsgXCJlLWdyaWRoZWFkZXJcIik7XHJcblx0XHRsZXQgdGFibGVIZWFkZXIgPSAkdHJlZUdyaWRIZWFkZXJbMF0uY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF07XHJcblx0XHRpZih0YWJsZUhlYWRlciAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHRsZXQgY29sdW1uSGVhZGVyID0gKDxhbnk+dGFibGVIZWFkZXIpLnJvd3NbMF07XHJcblx0XHRcdGxldCBmaWx0ZXJCYXIgPSAoPGFueT50YWJsZUhlYWRlcikucm93c1sxXTtcclxuXHRcdFx0aWYoY29sdW1uSGVhZGVyICE9IHVuZGVmaW5lZCl7XHJcblx0XHRcdFx0aWYodGhpcy5faGlkZUNvbHVtbkhlYWRlciA9PSB0cnVlKXtcclxuXHRcdFx0XHRcdC8vIGhpZGUgY29sdW1uIGhlYWRlclxyXG5cdFx0XHRcdFx0Y29sdW1uSGVhZGVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0aWYoZmlsdGVyQmFyICE9IHVuZGVmaW5lZCl7XHJcblx0XHRcdFx0aWYodGhpcy5faGlkZUhlYWRlckZpbHRlckJhciA9PSB0cnVlKXtcclxuXHRcdFx0XHRcdC8vIGhpZGUgZmlsdGVyYmFyXHJcblx0XHRcdFx0XHRmaWx0ZXJCYXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgY29sdW1uIHRlbXBsYXRlcyBmb3IgdGhlIHRyZWUgZ3JpZCBhbmQgYWRkcyB0aGVtIHRvIHRoZSB3aWRnZXQgY29udGFpbmVyXHJcblx0ICpcclxuXHQgKiBAcHJvdGVjdGVkXHJcblx0ICogQG1lbWJlcm9mIFRyZWVHcmlkV2lkZ2V0QmFzZVxyXG5cdCAqL1xyXG5cdHByb3RlY3RlZCBjcmVhdGVDb2x1bW5UZW1wbGF0ZXMoKXtcclxuXHJcblx0fVxyXG5cdFxyXG5cdHByb3RlY3RlZCBhYnN0cmFjdCBjcmVhdGVUcmVlR3JpZCgpO1xyXG59XHJcblxyXG5leHBvcnQge1RyZWVHcmlkV2lkZ2V0QmFzZX07Il19