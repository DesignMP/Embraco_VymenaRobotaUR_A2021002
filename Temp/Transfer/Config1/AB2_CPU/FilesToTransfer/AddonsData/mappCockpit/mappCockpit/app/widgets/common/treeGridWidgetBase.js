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
define(["require", "exports", "./widgetBase", "./treeGridColumnDefinition"], function (require, exports, widgetBase_1, treeGridColumnDefinition_1) {
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
        /**
         * Dispose the tree grid data
         *
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            var treeGridObject = this.getTreeGridObject();
            if (treeGridObject != undefined) {
                treeGridObject.destroy();
            }
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
        TreeGridWidgetBase.prototype.getComponentSettings = function () {
            // Add treegrid persisting data
            this.component.setSetting(TreeGridWidgetBase.ColumnsSettingId, this.getColumnSettings());
            return _super.prototype.getComponentSettings.call(this);
        };
        TreeGridWidgetBase.prototype.setComponentSettings = function (componentSettings) {
            if (componentSettings != undefined) {
                _super.prototype.setComponentSettings.call(this, componentSettings);
                this.setColumnSettings(this.component.getSetting(TreeGridWidgetBase.ColumnsSettingId));
                // Hide tableheader/filter row after setting new column sizes if needed
                if (this.hideSomeTableHeaderParts() == true) {
                    // After setting the treegrid column sizes, the header parts will be shown => hide header parts if not needed
                    this.hideTableHeader();
                }
            }
        };
        TreeGridWidgetBase.prototype.getColumnSettings = function () {
            var columnData = new Array();
            var treeGridObject = this.getTreeGridObject();
            if (treeGridObject != undefined) {
                var columnSettings = treeGridObject.option("columns");
                if (columnSettings != undefined) {
                    for (var i = 0; i < columnSettings.length; i++) {
                        columnData.push(new treeGridColumnDefinition_1.TreeGridColumnDefinition(columnSettings[i].field, columnSettings[i].width, columnSettings[i].visible));
                    }
                }
            }
            return columnData;
        };
        TreeGridWidgetBase.prototype.setColumnSettings = function (columnData) {
            var treeGridObject = this.getTreeGridObject();
            if (treeGridObject != undefined) {
                if (columnData != undefined) {
                    var columnSettings = treeGridObject.option("columns");
                    if (columnSettings != undefined) {
                        for (var i = 0; i < columnData.length; i++) {
                            // TODO: check if id == field
                            //columnSettings[i] = columnData[i].id
                            if (columnSettings[i] != undefined) {
                                columnSettings[i].visible = columnData[i].isVisible;
                                columnSettings[i].width = columnData[i].width;
                            }
                            else {
                                console.error("columnSettings not available for index: " + i);
                            }
                        }
                    }
                    treeGridObject.option("columns", columnSettings, true);
                }
                // Hide tableheader/filter row after setting new column sizes if needed
                if (this.hideSomeTableHeaderParts() == true) {
                    // After setting the treegrid column sizes, the header parts will be shown => hide header parts if not needed
                    this.hideTableHeader();
                }
            }
            return undefined;
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
        TreeGridWidgetBase.prototype.createLayout = function () {
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
                    // After setting the treegrid co6lumn sizes, the header parts will be shown => hide header parts if not needed
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
        TreeGridWidgetBase.ColumnsSettingId = "columns";
        return TreeGridWidgetBase;
    }(widgetBase_1.WidgetBase));
    exports.TreeGridWidgetBase = TreeGridWidgetBase;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZUdyaWRXaWRnZXRCYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NvbW1vbi90cmVlR3JpZFdpZGdldEJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUlBO1FBQTBDLHNDQUFVO1FBQXBEO1lBQUEscUVBa2RDO1lBOWNVLG1CQUFhLEdBQUcsQ0FBQyxDQUFDO1lBQ2xCLG1CQUFhLEdBQUcsQ0FBQyxDQUFDO1lBTXBCLGdDQUEwQixHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsa0NBQWtDO1lBQ25FLHFDQUErQixHQUFHLEVBQUUsQ0FBQztZQUNyQyx1QkFBaUIsR0FBRyxLQUFLLENBQUM7WUFDMUIsMEJBQW9CLEdBQUcsS0FBSyxDQUFDOztRQW9jdEMsQ0FBQztRQWhjQSx1Q0FBVSxHQUFWLFVBQVcsaUJBQXlCLEVBQUUsWUFBd0IsRUFBRSxZQUF3QjtZQUFsRCw2QkFBQSxFQUFBLGdCQUF3QjtZQUFFLDZCQUFBLEVBQUEsZ0JBQXdCO1lBRXZGLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBRXpCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxpQkFBaUIsQ0FBQztZQUMxQyxJQUFHLFlBQVksSUFBSSxDQUFDLElBQUksWUFBWSxJQUFJLENBQUMsRUFBQztnQkFDekMsdUJBQXVCO2dCQUN2QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsaUJBQWlCLEdBQUcsU0FBUyxDQUFDO2dCQUN4RCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsaUJBQWlCLEdBQUcsT0FBTyxDQUFDO2dCQUNwRCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsaUJBQWlCLEdBQUcsU0FBUyxDQUFDO2dCQUN4RCxJQUFHLFlBQVksSUFBSSxDQUFDLEVBQUM7b0JBQ3BCLElBQUksQ0FBQyxhQUFhLEdBQUcsWUFBWSxDQUFDO29CQUNsQyxDQUFDLENBQUMsR0FBRyxHQUFFLGlCQUFpQixDQUFDLENBQUMsTUFBTSxDQUFDLGdDQUFnQyxHQUFFLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxtQkFBbUIsR0FBRSxJQUFJLENBQUMsYUFBYSxHQUFHLFlBQVksQ0FBQyxDQUFBO2lCQUNwSjtnQkFDRCxDQUFDLENBQUMsR0FBRyxHQUFFLGlCQUFpQixDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsVUFBVSxDQUFDLENBQUE7Z0JBQ2pGLElBQUcsWUFBWSxJQUFJLENBQUMsRUFBQztvQkFDcEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUM7b0JBQ2xDLENBQUMsQ0FBQyxHQUFHLEdBQUUsaUJBQWlCLENBQUMsQ0FBQyxNQUFNLENBQUMsZ0NBQWdDLEdBQUUsSUFBSSxDQUFDLGtCQUFrQixHQUFHLG1CQUFtQixHQUFFLElBQUksQ0FBQyxhQUFhLEdBQUcsWUFBWSxDQUFDLENBQUE7aUJBQ3BKO2FBRUQ7aUJBQUk7Z0JBQ0osSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7YUFDdkI7WUFFRCxpQkFBTSxVQUFVLFlBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDekMsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSCxvQ0FBTyxHQUFQO1lBQ0MsaUJBQU0sT0FBTyxXQUFFLENBQUM7WUFFaEIsSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDOUMsSUFBRyxjQUFjLElBQUksU0FBUyxFQUFDO2dCQUM5QixjQUFjLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDekI7UUFDRixDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNILDZDQUFnQixHQUFoQixVQUFpQixXQUFtQixFQUFFLDhCQUFzQztZQUMzRSxJQUFJLENBQUMsMEJBQTBCLEdBQUcsV0FBVyxDQUFDO1lBQzlDLElBQUksQ0FBQywrQkFBK0IsR0FBRyw4QkFBOEIsQ0FBQztRQUN2RSxDQUFDO1FBRUQ7Ozs7V0FJTTtRQUNILHVDQUFVLEdBQVY7WUFDRixpQkFBTSxRQUFRLFlBQUMsNENBQTRDLENBQUMsQ0FBQztZQUM3RCxpQkFBTSxRQUFRLFlBQUMscURBQXFELENBQUMsQ0FBQztZQUN0RSxpQkFBTSxRQUFRLFlBQUMsZ0RBQWdELENBQUMsQ0FBQztZQUNqRSxpQkFBTSxRQUFRLFlBQUMseURBQXlELENBQUMsQ0FBQztZQUMxRSxpQkFBTSxRQUFRLFlBQUMsc0RBQXNELENBQUMsQ0FBQztRQUNyRSxDQUFDO1FBRUo7Ozs7V0FJRztRQUNILGtEQUFxQixHQUFyQjtZQUNDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFDL0IsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSCxxREFBd0IsR0FBeEI7WUFDQyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDO1FBQ2xDLENBQUM7UUFFRDs7OztXQUlNO1FBQ04sNkNBQWdCLEdBQWhCLFVBQWlCLE9BQWM7WUFDOUIsQ0FBQyxDQUFDLEdBQUcsR0FBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO1FBQ3hELENBQUM7UUFFRDs7OztXQUlNO1FBQ04sNkNBQWdCLEdBQWhCLFVBQWlCLE9BQWM7WUFDOUIsQ0FBQyxDQUFDLEdBQUcsR0FBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO1FBQ3hELENBQUM7UUFFRDs7Ozs7V0FLTTtRQUNILG1DQUFNLEdBQU4sVUFBTyxLQUFhLEVBQUUsTUFBYztZQUN0QyxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztZQUMxQixJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQztZQUU1QixJQUFJLFFBQVEsR0FBWSxFQUFFLENBQUM7WUFDM0IsSUFBSSxTQUFTLEdBQVksRUFBRSxDQUFDO1lBQzVCLElBQUcsS0FBSyxJQUFJLENBQUMsRUFBQztnQkFDYixRQUFRLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQzthQUN4QjtZQUNELElBQUcsTUFBTSxJQUFJLENBQUMsRUFBQztnQkFDZCxTQUFTLEdBQUcsTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsR0FBRSxJQUFJLENBQUM7YUFDbkU7WUFFRCxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsRUFDekMsWUFBWSxHQUFHO2dCQUNkLE1BQU0sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFFBQVE7YUFDbkMsQ0FBQztZQUNGLElBQUksV0FBVyxFQUFDO2dCQUNmLHVHQUF1RztnQkFDdkcsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUN2QixXQUFXLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxtREFBbUQ7YUFDM0c7WUFDRCxJQUFHLElBQUksQ0FBQywwQkFBMEIsSUFBSSxDQUFDLENBQUMsRUFBQztnQkFDeEMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3ZDO1FBQ0YsQ0FBQztRQUVELHFDQUFRLEdBQVIsVUFBUyxLQUFVLEVBQUUsS0FBc0I7WUFBdEIsc0JBQUEsRUFBQSxhQUFzQjtZQUMxQyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUMzQyxXQUFXLENBQUMsUUFBUSxDQUFDLEVBQUMsWUFBWSxFQUFHLEtBQUssRUFBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBRXBELElBQUcsSUFBSSxDQUFDLDBCQUEwQixJQUFJLENBQUMsQ0FBQyxFQUFDO2dCQUN4QyxxR0FBcUc7Z0JBQ3JHLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDNUM7UUFDRixDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNILGdEQUFtQixHQUFuQixVQUFvQixXQUFXLEVBQUUsYUFBYTtZQUM3QyxJQUFJLGFBQWEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQywwQkFBMEI7WUFDOUYsSUFBRyxXQUFXLElBQUksSUFBSSxDQUFDLDBCQUEwQixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsMEJBQTBCLEVBQUM7Z0JBQ2xHLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUMvQztpQkFDRztnQkFDSCxnRkFBZ0Y7Z0JBQ2hGLElBQUksc0JBQXNCLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUMzRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsc0JBQXNCLEVBQUUsYUFBYSxDQUFDLENBQUM7YUFDaEU7UUFDRixDQUFDO1FBRU0saURBQW9CLEdBQTNCO1lBQ0MsK0JBQStCO1lBQy9CLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUM7WUFDekYsT0FBTyxpQkFBTSxvQkFBb0IsV0FBRSxDQUFDO1FBQ3JDLENBQUM7UUFFTSxpREFBb0IsR0FBM0IsVUFBNEIsaUJBQW9DO1lBQy9ELElBQUcsaUJBQWlCLElBQUksU0FBUyxFQUFDO2dCQUNqQyxpQkFBTSxvQkFBb0IsWUFBQyxpQkFBaUIsQ0FBQyxDQUFDO2dCQUM5QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO2dCQUV2Rix1RUFBdUU7Z0JBQ3ZFLElBQUcsSUFBSSxDQUFDLHdCQUF3QixFQUFFLElBQUksSUFBSSxFQUFDO29CQUMxQyw2R0FBNkc7b0JBQzdHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztpQkFDdkI7YUFDRDtRQUNGLENBQUM7UUFFTyw4Q0FBaUIsR0FBekI7WUFDQyxJQUFJLFVBQVUsR0FBRyxJQUFJLEtBQUssRUFBTyxDQUFDO1lBQ2xDLElBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQzlDLElBQUcsY0FBYyxJQUFJLFNBQVMsRUFBQztnQkFDOUIsSUFBSSxjQUFjLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDdEQsSUFBRyxjQUFjLElBQUksU0FBUyxFQUFDO29CQUM5QixLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQzt3QkFDN0MsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLG1EQUF3QixDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztxQkFDM0g7aUJBQ0Q7YUFDRDtZQUNELE9BQU8sVUFBVSxDQUFDO1FBQ25CLENBQUM7UUFFTSw4Q0FBaUIsR0FBeEIsVUFBeUIsVUFBMkM7WUFDbkUsSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDOUMsSUFBRyxjQUFjLElBQUksU0FBUyxFQUFDO2dCQUU5QixJQUFHLFVBQVUsSUFBSSxTQUFTLEVBQUM7b0JBQzFCLElBQUksY0FBYyxHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ3RELElBQUcsY0FBYyxJQUFJLFNBQVMsRUFBQzt3QkFDOUIsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7NEJBQ3pDLDZCQUE2Qjs0QkFDN0Isc0NBQXNDOzRCQUN0QyxJQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLEVBQUM7Z0NBQ2pDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztnQ0FDcEQsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDOzZCQUM5QztpQ0FDRztnQ0FDSCxPQUFPLENBQUMsS0FBSyxDQUFDLDBDQUEwQyxHQUFHLENBQUMsQ0FBQyxDQUFDOzZCQUM5RDt5QkFDRDtxQkFDRDtvQkFDRCxjQUFjLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7aUJBQ3ZEO2dCQUVELHVFQUF1RTtnQkFDdkUsSUFBRyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsSUFBSSxJQUFJLEVBQUM7b0JBQzFDLDZHQUE2RztvQkFDN0csSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO2lCQUN2QjthQUNEO1lBQ0QsT0FBTyxTQUFTLENBQUM7UUFDbEIsQ0FBQztRQUlEOzs7Ozs7O1dBT0c7UUFDSyxzREFBeUIsR0FBakMsVUFBa0MsYUFBYTtZQUM5QyxLQUFJLElBQUksQ0FBQyxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUN2RCxJQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLElBQUksRUFBQztvQkFDM0MsT0FBTyxDQUFDLENBQUM7aUJBQ1Q7YUFDRDtZQUNELE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDO1FBRUU7Ozs7V0FJQTtRQUNBLHlDQUFZLEdBQVo7WUFFRixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUU3QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7WUFFdEIsSUFBRyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsSUFBSSxJQUFJLEVBQUM7Z0JBQzFDLHFDQUFxQztnQkFDckMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO2FBQ3ZCO1FBQ0YsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ08sOENBQWlCLEdBQTNCO1lBQ0MsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3RELENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ08sMENBQWEsR0FBdkIsVUFBd0IsT0FBTztZQUN4QixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUMzQyxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9CLElBQUcsRUFBRSxJQUFJLFNBQVMsRUFBQztnQkFDeEIsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFDeEIsSUFBUyxXQUFXLENBQUMsS0FBTSxDQUFDLGVBQWUsSUFBSSxTQUFTLEVBQUM7b0JBQ3hELE9BQWEsV0FBVyxDQUFDLEtBQU0sQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ3ZEO2FBQ0s7WUFDRCxPQUFPLFNBQVMsQ0FBQztRQUNyQixDQUFDO1FBRUo7Ozs7V0FJRztRQUNILGtDQUFLLEdBQUw7WUFDQyw4SUFBOEk7WUFDOUksMktBQTJLO1lBQ3JLLElBQUksQ0FBQyxpQkFBaUIsRUFBRyxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDekQsQ0FBQztRQUdEOzs7OztXQUtHO1FBQ0ssOENBQWlCLEdBQXpCO1lBQ0MsbUNBQW1DO1lBQ25DLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1lBRTdCLG1EQUFtRDtZQUNuRCxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDOUIsQ0FBQztRQUVPLHVEQUEwQixHQUFsQyxVQUFtQyxhQUFxQjtZQUN2RCxJQUFHLElBQUksQ0FBQywwQkFBMEIsSUFBSSxDQUFDLENBQUMsRUFBQztnQkFDeEMsT0FBTzthQUNQO1lBQ0QsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQywwQkFBMEIsRUFBRSxhQUFhLENBQUMsQ0FBQTtRQUN6RSxDQUFDO1FBRU8sZ0RBQW1CLEdBQTNCLFVBQTRCLG9CQUE0QixFQUFFLGFBQXFCO1lBQzlFLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ3ZDLElBQUcsQ0FBQyxPQUFPLEVBQUM7Z0JBQ1gsT0FBTzthQUNQO1lBRUQsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN4QyxJQUFHLENBQUMsT0FBTyxFQUFDO2dCQUNYLE9BQU87YUFDUDtZQUVELElBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLEVBQUUsT0FBTyxFQUFFLG9CQUFvQixDQUFDLENBQUM7WUFDcEYsSUFBRyxjQUFjLEdBQUcsSUFBSSxDQUFDLCtCQUErQixFQUFDO2dCQUNyRCxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxLQUFLLEdBQUcsY0FBYyxHQUFDLENBQUMsQ0FBQyxDQUFDLHVCQUF1QjtnQkFDeEYsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUcsd0JBQXdCO2dCQUMzRixPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBRXpDLElBQUcsSUFBSSxDQUFDLHdCQUF3QixFQUFFLElBQUksSUFBSSxFQUFDO29CQUMxQyw4R0FBOEc7b0JBQzlHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztpQkFDdkI7YUFDRDtRQUNGLENBQUM7UUFFTSwyQ0FBYyxHQUFyQixVQUFzQixLQUFhLEVBQUUsS0FBYTtZQUNqRCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUN2QyxJQUFHLENBQUMsT0FBTyxFQUFDO2dCQUNYLE9BQU87YUFDUDtZQUVELElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDeEMsSUFBRyxDQUFDLE9BQU8sRUFBQztnQkFDWCxPQUFPO2FBQ1A7WUFFRCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUM3QixPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFekMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQywwQkFBMEIsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDOUUsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLHFEQUF3QixHQUFoQztZQUNDLElBQUcsSUFBSSxDQUFDLGlCQUFpQixJQUFJLElBQUksRUFBQztnQkFDakMsT0FBTyxJQUFJLENBQUM7YUFDWjtZQUNELElBQUcsSUFBSSxDQUFDLG9CQUFvQixJQUFJLElBQUksRUFBQztnQkFDcEMsT0FBTyxJQUFJLENBQUM7YUFDWjtZQUNELE9BQU8sS0FBSyxDQUFDO1FBQ2QsQ0FBQztRQUVPLDhDQUFpQixHQUF6QjtZQUNDLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsZUFBZSxDQUFDLENBQUM7WUFDM0QsS0FBSSxJQUFJLFVBQVUsR0FBQyxDQUFDLEVBQUUsVUFBVSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFDO2dCQUMzRSxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUM1QyxJQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLElBQUksRUFBQztvQkFDbkQsT0FBTyxLQUFLLENBQUMsV0FBVyxDQUFDO2lCQUN6QjthQUNEO1lBQ0QsT0FBTyxDQUFDLENBQUM7UUFDVixDQUFDO1FBRU8sOENBQWlCLEdBQXpCLFVBQTBCLGFBQWEsRUFBRSxPQUFPLEVBQUUsb0JBQW9CO1lBQ3JFLElBQUksY0FBYyxHQUFHLGFBQWEsQ0FBQztZQUNuQyxLQUFJLElBQUksV0FBVyxHQUFDLENBQUMsRUFBRSxXQUFXLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsRUFBQztnQkFDekQsSUFBRyxXQUFXLElBQUksb0JBQW9CLEVBQUM7b0JBQy9DLElBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLFNBQVMsSUFBSSxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxJQUFJLElBQUksRUFBQzt3QkFDNUUsY0FBYyxJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUM7cUJBQzdDO2lCQUNRO2FBQ1Y7WUFDRCxPQUFPLGNBQWMsQ0FBQztRQUN2QixDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSyw0Q0FBZSxHQUF2QjtZQUNDLElBQUksZUFBZSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGNBQWMsQ0FBQyxDQUFDO1lBQ3RFLElBQUksV0FBVyxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdELElBQUcsV0FBVyxJQUFJLFNBQVMsRUFBQztnQkFDM0IsSUFBSSxZQUFZLEdBQVMsV0FBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDOUMsSUFBSSxTQUFTLEdBQVMsV0FBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0MsSUFBRyxZQUFZLElBQUksU0FBUyxFQUFDO29CQUM1QixJQUFHLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxJQUFJLEVBQUM7d0JBQ2pDLHFCQUFxQjt3QkFDckIsWUFBWSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO3FCQUNwQztpQkFDRDtnQkFDRCxJQUFHLFNBQVMsSUFBSSxTQUFTLEVBQUM7b0JBQ3pCLElBQUcsSUFBSSxDQUFDLG9CQUFvQixJQUFJLElBQUksRUFBQzt3QkFDcEMsaUJBQWlCO3dCQUNqQixTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7cUJBQ2pDO2lCQUNEO2FBQ0Q7UUFDRixDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDTyxrREFBcUIsR0FBL0I7UUFFQSxDQUFDO1FBL2JzQixtQ0FBZ0IsR0FBRyxTQUFTLENBQUM7UUFrY3JELHlCQUFDO0tBQUEsQUFsZEQsQ0FBMEMsdUJBQVUsR0FrZG5EO0lBRU8sZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgV2lkZ2V0QmFzZSB9IGZyb20gXCIuL3dpZGdldEJhc2VcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgVHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uIH0gZnJvbSBcIi4vdHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uXCI7XHJcblxyXG5hYnN0cmFjdCBjbGFzcyBUcmVlR3JpZFdpZGdldEJhc2UgZXh0ZW5kcyBXaWRnZXRCYXNle1xyXG5cclxuXHRwcm90ZWN0ZWQgX2FjdHVhbFdpZHRoO1xyXG5cdHByb3RlY3RlZCBfYWN0dWFsSGVpZ2h0O1xyXG5cdHByb3RlY3RlZCBfaGVhZGVySGVpZ2h0ID0gMDtcclxuXHRwcm90ZWN0ZWQgX2Zvb3RlckhlaWdodCA9IDA7XHJcblxyXG5cdHByaXZhdGUgX2hlYWRlckNvbnRhaW5lcklkO1xyXG5cdHByaXZhdGUgX21haW5Db250YWluZXJJZDtcclxuXHRwcml2YXRlIF9mb290ZXJDb250YWluZXJJZDtcclxuXHJcblx0cHJpdmF0ZSBfY29sdW1uSW5kZXhGb3JEeW5hbWljU2l6ZSA9IC0xOyAvLyAtMSBmb3Igbm8gZHluYW1pYyBzaXplIGJlaGF2aW9yXHJcblx0cHJpdmF0ZSBfbWluQ29sdW1uV2lkdGhGb3JEeW5hbWljQ29sdW1uID0gMTA7XHJcblx0cHJpdmF0ZSBfaGlkZUNvbHVtbkhlYWRlciA9IGZhbHNlO1xyXG5cdHByaXZhdGUgX2hpZGVIZWFkZXJGaWx0ZXJCYXIgPSBmYWxzZTtcclxuXHJcblx0cHVibGljIHN0YXRpYyByZWFkb25seSBDb2x1bW5zU2V0dGluZ0lkID0gXCJjb2x1bW5zXCI7XHJcblxyXG5cdGluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQ6IHN0cmluZywgaGVhZGVySGVpZ2h0OiBudW1iZXIgPSAwLCBmb290ZXJIZWlnaHQ6IG51bWJlciA9IDApIHtcclxuXHJcblx0XHR0aGlzLmluaXRpYWxpemVMb2NhbGVzKCk7XHJcblxyXG5cdFx0dGhpcy5fbWFpbkNvbnRhaW5lcklkID0gbGF5b3V0Q29udGFpbmVySWQ7XHJcblx0XHRpZihoZWFkZXJIZWlnaHQgIT0gMCB8fCBmb290ZXJIZWlnaHQgIT0gMCl7XHJcblx0XHRcdC8vIEFkZCBhZGRpdGlvbmFsIGRpdnMgXHJcblx0XHRcdHRoaXMuX2hlYWRlckNvbnRhaW5lcklkID0gbGF5b3V0Q29udGFpbmVySWQgKyBcIl9oZWFkZXJcIjtcclxuXHRcdFx0dGhpcy5fbWFpbkNvbnRhaW5lcklkID0gbGF5b3V0Q29udGFpbmVySWQgKyBcIl9tYWluXCI7XHJcblx0XHRcdHRoaXMuX2Zvb3RlckNvbnRhaW5lcklkID0gbGF5b3V0Q29udGFpbmVySWQgKyBcIl9mb290ZXJcIjtcclxuXHRcdFx0aWYoaGVhZGVySGVpZ2h0ICE9IDApe1xyXG5cdFx0XHRcdHRoaXMuX2hlYWRlckhlaWdodCA9IGhlYWRlckhlaWdodDtcclxuXHRcdFx0XHQkKFwiI1wiKyBsYXlvdXRDb250YWluZXJJZCkuYXBwZW5kKFwiPGRpdiBjbGFzcz0nd2lkZ2V0SGVhZGVyJyBpZD0nXCIrIHRoaXMuX2hlYWRlckNvbnRhaW5lcklkICsgXCInIHN0eWxlPSdoZWlnaHQ6IFwiKyB0aGlzLl9oZWFkZXJIZWlnaHQgKyBcInB4Jz48L2Rpdj5cIilcclxuXHRcdFx0fVxyXG5cdFx0XHQkKFwiI1wiKyBsYXlvdXRDb250YWluZXJJZCkuYXBwZW5kKFwiPGRpdiBpZD0nXCIrIHRoaXMuX21haW5Db250YWluZXJJZCArIFwiJz48L2Rpdj5cIilcclxuXHRcdFx0aWYoZm9vdGVySGVpZ2h0ICE9IDApe1xyXG5cdFx0XHRcdHRoaXMuX2Zvb3RlckhlaWdodCA9IGZvb3RlckhlaWdodDtcclxuXHRcdFx0XHQkKFwiI1wiKyBsYXlvdXRDb250YWluZXJJZCkuYXBwZW5kKFwiPGRpdiBjbGFzcz0nd2lkZ2V0Rm9vdGVyJyBpZD0nXCIrIHRoaXMuX2Zvb3RlckNvbnRhaW5lcklkICsgXCInIHN0eWxlPSdoZWlnaHQ6IFwiKyB0aGlzLl9mb290ZXJIZWlnaHQgKyBcInB4Jz48L2Rpdj5cIilcclxuXHRcdFx0fVxyXG5cclxuXHRcdH1lbHNle1xyXG5cdFx0XHR0aGlzLl9oZWFkZXJIZWlnaHQgPSAwO1xyXG5cdFx0fVxyXG5cclxuXHRcdHN1cGVyLmluaXRpYWxpemUodGhpcy5fbWFpbkNvbnRhaW5lcklkKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERpc3Bvc2UgdGhlIHRyZWUgZ3JpZCBkYXRhXHJcblx0ICpcclxuXHQgKiBAbWVtYmVyb2YgVHJlZUdyaWRXaWRnZXRCYXNlXHJcblx0ICovXHJcblx0ZGlzcG9zZSgpe1xyXG5cdFx0c3VwZXIuZGlzcG9zZSgpO1xyXG5cclxuXHRcdGxldCB0cmVlR3JpZE9iamVjdCA9IHRoaXMuZ2V0VHJlZUdyaWRPYmplY3QoKTtcclxuXHRcdGlmKHRyZWVHcmlkT2JqZWN0ICE9IHVuZGVmaW5lZCl7XHJcblx0XHRcdHRyZWVHcmlkT2JqZWN0LmRlc3Ryb3koKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgYSBkeW5hbWljIGNvbHVtblxyXG5cdCAqIFRoaXMgY29sdW1uIHdpbGwgYmUgcmVzaXplZCBpZiB0aGUgd2luZG93L3dpZGdldCB3ZXJlIHJlc2l6ZWRcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBjb2x1bW5JbmRleFxyXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBtaW5Db2x1bW5XaWR0aEZvckR5bmFtaWNDb2x1bW5cclxuXHQgKiBAbWVtYmVyb2YgVHJlZUdyaWRXaWRnZXRCYXNlXHJcblx0ICovXHJcblx0c2V0RHluYW1pY0NvbHVtbihjb2x1bW5JbmRleDogbnVtYmVyLCBtaW5Db2x1bW5XaWR0aEZvckR5bmFtaWNDb2x1bW46IG51bWJlcil7XHJcblx0XHR0aGlzLl9jb2x1bW5JbmRleEZvckR5bmFtaWNTaXplID0gY29sdW1uSW5kZXg7XHJcblx0XHR0aGlzLl9taW5Db2x1bW5XaWR0aEZvckR5bmFtaWNDb2x1bW4gPSBtaW5Db2x1bW5XaWR0aEZvckR5bmFtaWNDb2x1bW47XHJcblx0fVxyXG5cclxuXHQvKipcclxuICAgICAqIExvYWRzIHRoZSBzdHlsZXMgZm9yIHRoZSB0cmVlIGdyaWQgd2lkZ2V0IGJhc2VcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJlZUdyaWRXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIGxvYWRTdHlsZXMoKXtcclxuXHRcdHN1cGVyLmFkZFN0eWxlKFwid2lkZ2V0cy9jb21tb24vc3R5bGUvY3NzL3RyZWVHcmlkU3R5bGUuY3NzXCIpO1xyXG5cdFx0c3VwZXIuYWRkU3R5bGUoXCJ3aWRnZXRzL2NvbW1vbi9zdHlsZS9jc3MvdHJlZUdyaWRTY3JvbGxCYXJTdHlsZS5jc3NcIik7XHJcblx0XHRzdXBlci5hZGRTdHlsZShcIndpZGdldHMvY29tbW9uL3N0eWxlL2Nzcy90cmVlR3JpZEljb25TdHlsZS5jc3NcIik7XHJcblx0XHRzdXBlci5hZGRTdHlsZShcIndpZGdldHMvY29tbW9uL3N0eWxlL2Nzcy90cmVlR3JpZFRvb2xiYXJCdXR0b25TdHlsZS5jc3NcIik7XHJcblx0XHRzdXBlci5hZGRTdHlsZShcIndpZGdldHMvY29tbW9uL3N0eWxlL2Nzcy93aWRnZXRIZWFkZXJGb290ZXJTdHlsZS5jc3NcIik7XHJcbiAgICB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGZsYWcgdGhhdCB0aGUgY29sdW1uIGhlYWRlciBvZiB0aGUgdHJlZSBncmlkIHNob3VsZCBiZSBoaWRkZW5cclxuXHQgKlxyXG5cdCAqIEBtZW1iZXJvZiBUcmVlR3JpZFdpZGdldEJhc2VcclxuXHQgKi9cclxuXHRzZXRDb2x1bW5IZWFkZXJIaWRkZW4oKXtcclxuXHRcdHRoaXMuX2hpZGVDb2x1bW5IZWFkZXIgPSB0cnVlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgZmxhZyB0aGF0IHRoZSBoZWFkZXIgZmlsdGVyYmFyIG9mIHRoZSB0cmVlIGdyaWQgc2hvdWxkIGJlIGhpZGRlblxyXG5cdCAqXHJcblx0ICogQG1lbWJlcm9mIFRyZWVHcmlkV2lkZ2V0QmFzZVxyXG5cdCAqL1xyXG5cdHNldEhlYWRlckZpbHRlckJhckhpZGRlbigpe1xyXG5cdFx0dGhpcy5faGlkZUhlYWRlckZpbHRlckJhciA9IHRydWU7XHJcblx0fVxyXG5cclxuXHQvKiogc2V0cyB0aGUgdHJlZSBncmlkIGhlYWRlciBjb250ZW50IFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJlZUdyaWRXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuXHRzZXRIZWFkZXJDb250ZW50KGNvbnRlbnQ6c3RyaW5nKXtcclxuXHRcdCQoXCIjXCIrIHRoaXMuX2hlYWRlckNvbnRhaW5lcklkKVswXS5pbm5lckhUTUwgPSBjb250ZW50O1xyXG5cdH1cclxuXHJcblx0LyoqIHNldHMgdGhlIHRyZWUgZ3JpZCBmb290ZXIgY29udGVudCBcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29udGVudFxyXG4gICAgICogQG1lbWJlcm9mIFRyZWVHcmlkV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcblx0c2V0Rm9vdGVyQ29udGVudChjb250ZW50OnN0cmluZyl7XHJcblx0XHQkKFwiI1wiKyB0aGlzLl9mb290ZXJDb250YWluZXJJZClbMF0uaW5uZXJIVE1MID0gY29udGVudDtcclxuXHR9XHJcblxyXG5cdC8qKiByZXNpemVzIHRoZSB0cmVlIGdyaWQgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJlZUdyaWRXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIHJlc2l6ZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcil7XHJcblx0XHR0aGlzLl9hY3R1YWxXaWR0aCA9IHdpZHRoO1xyXG5cdFx0dGhpcy5fYWN0dWFsSGVpZ2h0ID0gaGVpZ2h0O1xyXG5cclxuXHRcdHZhciBuZXdXaWR0aCA6IHN0cmluZyA9IFwiXCI7XHJcblx0XHR2YXIgbmV3SGVpZ2h0IDogc3RyaW5nID0gXCJcIjtcclxuXHRcdGlmKHdpZHRoICE9IDApe1xyXG5cdFx0XHRuZXdXaWR0aCA9IHdpZHRoICsgXCJweFwiO1xyXG5cdFx0fVxyXG5cdFx0aWYoaGVpZ2h0ICE9IDApe1xyXG5cdFx0XHRuZXdIZWlnaHQgPSBoZWlnaHQgLSB0aGlzLl9oZWFkZXJIZWlnaHQgLSB0aGlzLl9mb290ZXJIZWlnaHQrIFwicHhcIjtcclxuXHRcdH1cclxuXHRcdFx0XHJcblx0XHR2YXIgdHJlZUdyaWRPYmogPSB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCksXHJcblx0XHRcdHNpemVTZXR0aW5ncyA9IHtcclxuXHRcdFx0XHRoZWlnaHQ6IG5ld0hlaWdodCwgd2lkdGg6IG5ld1dpZHRoLCAvLyAxMDAlIHdvdWxkIGJlIHdyb25nID0+IHNldCBlbXB0eSBzdHJpbmcgdG8gcmVzaXplIHRoZSB0cmVlZ3JpZCBjb3JyZWN0XHJcblx0XHR9O1xyXG5cdFx0aWYgKHRyZWVHcmlkT2JqKXtcclxuXHRcdFx0Ly8gU2F2ZSBjZWxsIGlmIGN1cnJlbnRseSBpbiBlZGl0IG1vZGUgYmVmb3JlIHN0YXJ0IHJlc2l6aW5nIHRoZSB0cmVlZ3JpZCwgb3RoZXJ3aXNlIGVycm9ycyB3b3VsZCBvY2N1clxyXG5cdFx0XHR0cmVlR3JpZE9iai5zYXZlQ2VsbCgpOyBcclxuXHRcdFx0dHJlZUdyaWRPYmoub3B0aW9uKFwic2l6ZVNldHRpbmdzXCIsIHNpemVTZXR0aW5ncywgdHJ1ZSk7IC8vIGZvcmNlIHRoZSBzZXR0aW5nIHRvIHJlc2l6ZSB0aGUgdHJlZWdyaWQgY29ycmVjdFxyXG5cdFx0fVxyXG5cdFx0aWYodGhpcy5fY29sdW1uSW5kZXhGb3JEeW5hbWljU2l6ZSAhPSAtMSl7XHJcblx0XHRcdHRoaXMuZmlsbFNwYWNlV2l0aER5bmFtaWNDb2x1bW4od2lkdGgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c2V0TW9kZWwobW9kZWw6IGFueSwgZm9yY2U6IGJvb2xlYW4gPSBmYWxzZSl7XHJcblx0XHR2YXIgdHJlZUdyaWRPYmogPSB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCk7XHJcblx0XHR0cmVlR3JpZE9iai5zZXRNb2RlbCh7XCJkYXRhU291cmNlXCIgOiBtb2RlbH0sIGZvcmNlKTtcclxuXHRcdFxyXG5cdFx0aWYodGhpcy5fY29sdW1uSW5kZXhGb3JEeW5hbWljU2l6ZSAhPSAtMSl7XHJcblx0XHRcdC8vIFRvIGF2b2lkIGVtcHR5IHNwYWNlIGFmdGVyIGxhc3QgY29sdW1uIGJlY2F1c2Ugb2YgcmVtb3ZpbmcgdGhlIHNjcm9sbGJhciBpZiBsZXNzIGRhdGEgaXMgYXZhaWxhYmxlXHJcblx0XHRcdHRoaXMuZmlsbFNwYWNlV2l0aER5bmFtaWNDb2x1bW4odGhpcy53aWR0aCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXNpemUgZHluYW1pYyBjb2x1bW5cclxuXHQgKiBJZiBjaGFuZ2VkIGNvbHVtbiB3YXMgZHluYW1pYyBjb2x1bW4gdGhlIHNpemUgb2YgdGhlIGxhc3QgY29sdW1uIHdpbGwgYmUgYWRhcHRlZFxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHsqfSBjb2x1bW5JbmRleFx0Y29sdW1uSW5kZXggb2YgY2hhbmdlZCBjb2x1bW5cclxuXHQgKiBAcGFyYW0geyp9IHRyZWVHcmlkTW9kZWxcclxuXHQgKiBAbWVtYmVyb2YgVHJlZUdyaWRXaWRnZXRCYXNlXHJcblx0ICovXHJcblx0cmVzaXplRHluYW1pY0NvbHVtbihjb2x1bW5JbmRleCwgdHJlZUdyaWRNb2RlbCl7XHJcblx0XHRsZXQgdHJlZUdyaWRXaWR0aCA9IHBhcnNlSW50KHRyZWVHcmlkTW9kZWwuc2l6ZVNldHRpbmdzLndpZHRoLCAxMCk7IC8vIHBhcnNlSW50IHRvIHJlbW92ZSBcInB4XCJcclxuXHRcdGlmKGNvbHVtbkluZGV4ICE9IHRoaXMuX2NvbHVtbkluZGV4Rm9yRHluYW1pY1NpemUgJiYgY29sdW1uSW5kZXggPCB0aGlzLl9jb2x1bW5JbmRleEZvckR5bmFtaWNTaXplKXtcclxuXHRcdFx0dGhpcy5maWxsU3BhY2VXaXRoRHluYW1pY0NvbHVtbih0cmVlR3JpZFdpZHRoKTsgXHJcblx0XHR9XHJcblx0XHRlbHNle1xyXG5cdFx0XHQvLyBEeW5hbWljIGNvbHVtbiBzaXplIHdhcyBjaGFuZ2VkID0+IHVwZGF0ZSBsYXN0IFwidmlzaWJsZVwiIGNvbHVtbiB0byBmaWxsIHNwYWNlXHJcblx0XHRcdGxldCBsYXN0VmlzaWJsZUNvbHVtbkluZGV4ID0gdGhpcy5nZXRMYXN0VmlzaWJsZUNvbHVtbkluZGV4KHRyZWVHcmlkTW9kZWwpO1xyXG5cdFx0XHR0aGlzLmZpbGxTcGFjZVdpdGhDb2x1bW4obGFzdFZpc2libGVDb2x1bW5JbmRleCwgdHJlZUdyaWRXaWR0aCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0Q29tcG9uZW50U2V0dGluZ3MoKTogQ29tcG9uZW50U2V0dGluZ3N7XHJcblx0XHQvLyBBZGQgdHJlZWdyaWQgcGVyc2lzdGluZyBkYXRhXHJcblx0XHR0aGlzLmNvbXBvbmVudC5zZXRTZXR0aW5nKFRyZWVHcmlkV2lkZ2V0QmFzZS5Db2x1bW5zU2V0dGluZ0lkLCB0aGlzLmdldENvbHVtblNldHRpbmdzKCkpO1xyXG5cdFx0cmV0dXJuIHN1cGVyLmdldENvbXBvbmVudFNldHRpbmdzKCk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0Q29tcG9uZW50U2V0dGluZ3MoY29tcG9uZW50U2V0dGluZ3M6IENvbXBvbmVudFNldHRpbmdzKSB7XHJcblx0XHRpZihjb21wb25lbnRTZXR0aW5ncyAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHRzdXBlci5zZXRDb21wb25lbnRTZXR0aW5ncyhjb21wb25lbnRTZXR0aW5ncyk7XHRcdFxyXG5cdFx0XHR0aGlzLnNldENvbHVtblNldHRpbmdzKHRoaXMuY29tcG9uZW50LmdldFNldHRpbmcoVHJlZUdyaWRXaWRnZXRCYXNlLkNvbHVtbnNTZXR0aW5nSWQpKTtcclxuXHJcblx0XHRcdC8vIEhpZGUgdGFibGVoZWFkZXIvZmlsdGVyIHJvdyBhZnRlciBzZXR0aW5nIG5ldyBjb2x1bW4gc2l6ZXMgaWYgbmVlZGVkXHJcblx0XHRcdGlmKHRoaXMuaGlkZVNvbWVUYWJsZUhlYWRlclBhcnRzKCkgPT0gdHJ1ZSl7XHJcblx0XHRcdFx0Ly8gQWZ0ZXIgc2V0dGluZyB0aGUgdHJlZWdyaWQgY29sdW1uIHNpemVzLCB0aGUgaGVhZGVyIHBhcnRzIHdpbGwgYmUgc2hvd24gPT4gaGlkZSBoZWFkZXIgcGFydHMgaWYgbm90IG5lZWRlZFxyXG5cdFx0XHRcdHRoaXMuaGlkZVRhYmxlSGVhZGVyKCk7IFxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGdldENvbHVtblNldHRpbmdzKCk6IEFycmF5PFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbj57XHJcblx0XHRsZXQgY29sdW1uRGF0YSA9IG5ldyBBcnJheTxhbnk+KCk7XHJcblx0XHRsZXQgdHJlZUdyaWRPYmplY3QgPSB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCk7XHJcblx0XHRpZih0cmVlR3JpZE9iamVjdCAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHRsZXQgY29sdW1uU2V0dGluZ3MgPSB0cmVlR3JpZE9iamVjdC5vcHRpb24oXCJjb2x1bW5zXCIpOyBcclxuXHRcdFx0aWYoY29sdW1uU2V0dGluZ3MgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0XHRmb3IobGV0IGkgPSAwOyBpIDwgY29sdW1uU2V0dGluZ3MubGVuZ3RoOyBpKyspe1xyXG5cdFx0XHRcdFx0Y29sdW1uRGF0YS5wdXNoKG5ldyBUcmVlR3JpZENvbHVtbkRlZmluaXRpb24oY29sdW1uU2V0dGluZ3NbaV0uZmllbGQsIGNvbHVtblNldHRpbmdzW2ldLndpZHRoLCBjb2x1bW5TZXR0aW5nc1tpXS52aXNpYmxlKSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gY29sdW1uRGF0YTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXRDb2x1bW5TZXR0aW5ncyhjb2x1bW5EYXRhOiBBcnJheTxUcmVlR3JpZENvbHVtbkRlZmluaXRpb24+KSB7XHJcblx0XHRsZXQgdHJlZUdyaWRPYmplY3QgPSB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCk7XHJcblx0XHRpZih0cmVlR3JpZE9iamVjdCAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHRcdFx0XHRcclxuXHRcdFx0aWYoY29sdW1uRGF0YSAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHRcdGxldCBjb2x1bW5TZXR0aW5ncyA9IHRyZWVHcmlkT2JqZWN0Lm9wdGlvbihcImNvbHVtbnNcIik7XHJcblx0XHRcdFx0aWYoY29sdW1uU2V0dGluZ3MgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0XHRcdGZvcihsZXQgaSA9IDA7IGkgPCBjb2x1bW5EYXRhLmxlbmd0aDsgaSsrKXtcclxuXHRcdFx0XHRcdFx0Ly8gVE9ETzogY2hlY2sgaWYgaWQgPT0gZmllbGRcclxuXHRcdFx0XHRcdFx0Ly9jb2x1bW5TZXR0aW5nc1tpXSA9IGNvbHVtbkRhdGFbaV0uaWRcclxuXHRcdFx0XHRcdFx0aWYoY29sdW1uU2V0dGluZ3NbaV0gIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0XHRcdFx0XHRjb2x1bW5TZXR0aW5nc1tpXS52aXNpYmxlID0gY29sdW1uRGF0YVtpXS5pc1Zpc2libGU7XHJcblx0XHRcdFx0XHRcdFx0Y29sdW1uU2V0dGluZ3NbaV0ud2lkdGggPSBjb2x1bW5EYXRhW2ldLndpZHRoO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGVsc2V7XHJcblx0XHRcdFx0XHRcdFx0Y29uc29sZS5lcnJvcihcImNvbHVtblNldHRpbmdzIG5vdCBhdmFpbGFibGUgZm9yIGluZGV4OiBcIiArIGkpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHRyZWVHcmlkT2JqZWN0Lm9wdGlvbihcImNvbHVtbnNcIiwgY29sdW1uU2V0dGluZ3MsIHRydWUpOyBcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gSGlkZSB0YWJsZWhlYWRlci9maWx0ZXIgcm93IGFmdGVyIHNldHRpbmcgbmV3IGNvbHVtbiBzaXplcyBpZiBuZWVkZWRcclxuXHRcdFx0aWYodGhpcy5oaWRlU29tZVRhYmxlSGVhZGVyUGFydHMoKSA9PSB0cnVlKXtcclxuXHRcdFx0XHQvLyBBZnRlciBzZXR0aW5nIHRoZSB0cmVlZ3JpZCBjb2x1bW4gc2l6ZXMsIHRoZSBoZWFkZXIgcGFydHMgd2lsbCBiZSBzaG93biA9PiBoaWRlIGhlYWRlciBwYXJ0cyBpZiBub3QgbmVlZGVkXHJcblx0XHRcdFx0dGhpcy5oaWRlVGFibGVIZWFkZXIoKTsgXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiB1bmRlZmluZWQ7XHJcblx0fVxyXG5cclxuXHRcclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIGxhc3QgdmlzaWJsZSBjb2x1bW5cclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHsqfSB0cmVlR3JpZE1vZGVsXHJcblx0ICogQHJldHVybnNcclxuXHQgKiBAbWVtYmVyb2YgVHJlZUdyaWRXaWRnZXRCYXNlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBnZXRMYXN0VmlzaWJsZUNvbHVtbkluZGV4KHRyZWVHcmlkTW9kZWwpe1xyXG5cdFx0Zm9yKGxldCBpID0gdHJlZUdyaWRNb2RlbC5jb2x1bW5zLmxlbmd0aC0xOyBpID49IDA7IGktLSl7XHJcblx0XHRcdGlmKHRyZWVHcmlkTW9kZWwuY29sdW1uc1tpXS52aXNpYmxlID09IHRydWUpe1xyXG5cdFx0XHRcdHJldHVybiBpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gLTE7XHJcblx0fVxyXG5cclxuICAgIC8qKlxyXG5cdCAqIGNyZWF0ZXMgdGhlIHRyZWUgZ3JpZFxyXG5cdCAqXHJcblx0ICogQG1lbWJlcm9mIFRyZWVHcmlkV2lkZ2V0QmFzZVxyXG5cdCAqL1xyXG4gICAgY3JlYXRlTGF5b3V0KCkge1xyXG5cdFx0XHJcblx0XHR0aGlzLmNyZWF0ZUNvbHVtblRlbXBsYXRlcygpO1xyXG5cclxuXHRcdHRoaXMuY3JlYXRlVHJlZUdyaWQoKTtcclxuXHRcclxuXHRcdGlmKHRoaXMuaGlkZVNvbWVUYWJsZUhlYWRlclBhcnRzKCkgPT0gdHJ1ZSl7XHJcblx0XHRcdC8vIEhpZGUgc29tZSBoZWFkZXIgcGFydHMgb2YgdHJlZWdyaWRcclxuXHRcdFx0dGhpcy5oaWRlVGFibGVIZWFkZXIoKTtcclxuXHRcdH1cclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgZWogdHJlZSBncmlkIG9iamVjdFxyXG5cdCAqXHJcblx0ICogQHJldHVybnMge2VqLlRyZWVHcmlkfVxyXG5cdCAqIEBtZW1iZXJvZiBUcmVlR3JpZFdpZGdldEJhc2VcclxuXHQgKi9cclxuXHRwcm90ZWN0ZWQgZ2V0VHJlZUdyaWRPYmplY3QoKTogZWouVHJlZUdyaWR7XHJcblx0XHRyZXR1cm4gJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCkuZGF0YShcImVqVHJlZUdyaWRcIik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSB0cmVlIHJlY29yZCBmb3IgdGhlIGdpdmVuIGVsZW1lbnRcclxuXHQgKlxyXG5cdCAqIEBwcm90ZWN0ZWRcclxuXHQgKiBAcGFyYW0geyp9IGVsZW1lbnRcclxuXHQgKiBAcmV0dXJucyB7YW55fVxyXG5cdCAqIEBtZW1iZXJvZiBUcmVlR3JpZFdpZGdldEJhc2VcclxuXHQgKi9cclxuXHRwcm90ZWN0ZWQgZ2V0VHJlZVJlY29yZChlbGVtZW50KTogYW55e1xyXG4gICAgICAgIGxldCB0cmVlZ3JpZE9iaiA9IHRoaXMuZ2V0VHJlZUdyaWRPYmplY3QoKTtcclxuICAgICAgICBsZXQgdHIgPSBlbGVtZW50LmNsb3Nlc3QoXCJ0clwiKTsgIFxyXG4gICAgICAgIGlmKHRyICE9IHVuZGVmaW5lZCl7XHJcblx0XHRcdGxldCBpbmRleCA9IHRyLnJvd0luZGV4O1xyXG5cdFx0XHRpZigoPGFueT50cmVlZ3JpZE9iai5tb2RlbCkuY3VycmVudFZpZXdEYXRhICE9IHVuZGVmaW5lZCl7XHJcblx0XHRcdFx0cmV0dXJuICg8YW55PnRyZWVncmlkT2JqLm1vZGVsKS5jdXJyZW50Vmlld0RhdGFbaW5kZXhdO1xyXG5cdFx0XHR9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldCB0aGUgZm9jdXMgdG8gdGhlIGN1cnJlbnQgdHJlZSBncmlkXHJcblx0ICpcclxuXHQgKiBAbWVtYmVyb2YgVHJlZUdyaWRXaWRnZXRCYXNlXHJcblx0ICovXHJcblx0Zm9jdXMoKXtcclxuXHRcdC8vIFRPRE86IE5vIHB1YmxpYyBmb2N1cyBtZXRob2QgYXZhaWxhYmxlIGZvciB0cmVlIGdyaWQsIGJ1dCBuZWVkZWQgZm9yIGZvcmNpbmcgdGhlIGZvY3VzIHRvIHRoZSB0cmVlIGdyaWQgaWYgZHJhZ2dhYmxlIGlzIHVzZWQgaW4gYSB0cmVlIGdyaWRcclxuXHRcdC8vIChpbiBjYXNlIG9mIGRyYWdnYWJsZSB0cmVlIGdyaWQgd2lsbCBub3QgYmUgZm9jdXNlZCBiZWNhdXNlIG5vdCB0aGUgdHJlZWdyaWQgcm93IHdpbGwgYmUgc2VsZWN0ZWQgb24gYSBjbGljaywgYnV0IHRoZSBkaXJlY3RseSBkaXYgd2lsbCBieSBzZWxlY3RlZCA9PiBzdmcgb3Igb3RoZXIgZGl2KVxyXG5cdFx0KDxhbnk+dGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpKS5fZm9jdXNUcmVlR3JpZEVsZW1lbnQoKTtcclxuXHR9XHJcblx0XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluaXRpYWxpemVzIGxvY2FsZSByZXNvdXJjZXNcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQG1lbWJlcm9mIFRyZWVHcmlkV2lkZ2V0QmFzZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaW5pdGlhbGl6ZUxvY2FsZXMoKSB7XHJcblx0XHQvLyBnZXQgdGhlIGxvY2FsZXMgZm9yIHRoZSB0cmVlZ3JpZFxyXG5cdFx0bGV0IGxvYyA9IGVqLlRyZWVHcmlkLkxvY2FsZTtcclxuXHJcblx0XHQvLyBzaG93IGFuIGVtcHR5IHN0cmluZyBpZiBubyByZWNvcmRzIGFyZSBhdmFpbGFibGVcclxuXHRcdGxvYy5kZWZhdWx0LmVtcHR5UmVjb3JkID0gXCJcIjtcclxuXHR9XHJcblx0XHJcblx0cHJpdmF0ZSBmaWxsU3BhY2VXaXRoRHluYW1pY0NvbHVtbih0cmVlZ3JpZFdpZHRoOiBudW1iZXIpe1xyXG5cdFx0aWYodGhpcy5fY29sdW1uSW5kZXhGb3JEeW5hbWljU2l6ZSA9PSAtMSl7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdHRoaXMuZmlsbFNwYWNlV2l0aENvbHVtbih0aGlzLl9jb2x1bW5JbmRleEZvckR5bmFtaWNTaXplLCB0cmVlZ3JpZFdpZHRoKVxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBmaWxsU3BhY2VXaXRoQ29sdW1uKGZpbGxTcGFjZUNvbHVtbkluZGV4OiBudW1iZXIsIHRyZWVncmlkV2lkdGg6IG51bWJlcil7XHJcblx0XHR2YXIgdHJlZU9iaiA9IHRoaXMuZ2V0VHJlZUdyaWRPYmplY3QoKTtcclxuXHRcdGlmKCF0cmVlT2JqKXtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBjb2x1bW5zID0gdHJlZU9iai5vcHRpb24oXCJjb2x1bW5zXCIpOyBcclxuXHRcdGlmKCFjb2x1bW5zKXtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBuZXdDb2x1bW5XaWR0aCA9IHRoaXMuZ2V0TmV3Q29sdW1uV2lkdGgodHJlZWdyaWRXaWR0aCwgY29sdW1ucywgZmlsbFNwYWNlQ29sdW1uSW5kZXgpO1xyXG4gICAgICAgIGlmKG5ld0NvbHVtbldpZHRoID4gdGhpcy5fbWluQ29sdW1uV2lkdGhGb3JEeW5hbWljQ29sdW1uKXtcclxuICAgICAgICAgICAgY29sdW1uc1tmaWxsU3BhY2VDb2x1bW5JbmRleF0ud2lkdGggPSBuZXdDb2x1bW5XaWR0aC0zOyAvLy0zIHRvIGF2b2lkIHNjcm9sbGJhclxyXG5cdFx0XHRjb2x1bW5zW2ZpbGxTcGFjZUNvbHVtbkluZGV4XS53aWR0aCAtPSB0aGlzLmdldFNjcm9sbEJhcldpZHRoKCk7ICAgLy8gcmVtb3ZlIHNjcm9sbGJhciBzaXplXHJcblx0XHRcdHRyZWVPYmoub3B0aW9uKFwiY29sdW1uc1wiLCBjb2x1bW5zLCB0cnVlKTsgXHJcblx0XHRcdFxyXG5cdFx0XHRpZih0aGlzLmhpZGVTb21lVGFibGVIZWFkZXJQYXJ0cygpID09IHRydWUpe1xyXG5cdFx0XHRcdC8vIEFmdGVyIHNldHRpbmcgdGhlIHRyZWVncmlkIGNvNmx1bW4gc2l6ZXMsIHRoZSBoZWFkZXIgcGFydHMgd2lsbCBiZSBzaG93biA9PiBoaWRlIGhlYWRlciBwYXJ0cyBpZiBub3QgbmVlZGVkXHJcblx0XHRcdFx0dGhpcy5oaWRlVGFibGVIZWFkZXIoKTsgXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXRDb2x1bW5XaWR0aChpbmRleDogbnVtYmVyLCB3aWR0aDogbnVtYmVyKXtcclxuXHRcdHZhciB0cmVlT2JqID0gdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpO1xyXG5cdFx0aWYoIXRyZWVPYmope1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIGNvbHVtbnMgPSB0cmVlT2JqLm9wdGlvbihcImNvbHVtbnNcIik7IFxyXG5cdFx0aWYoIWNvbHVtbnMpe1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdGNvbHVtbnNbaW5kZXhdLndpZHRoID0gd2lkdGg7XHJcblx0XHR0cmVlT2JqLm9wdGlvbihcImNvbHVtbnNcIiwgY29sdW1ucywgdHJ1ZSk7IFxyXG5cclxuXHRcdHRoaXMuZmlsbFNwYWNlV2l0aENvbHVtbih0aGlzLl9jb2x1bW5JbmRleEZvckR5bmFtaWNTaXplLCB0aGlzLl9hY3R1YWxXaWR0aCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRydWUgaWYgc29tZSBwYXJ0cyBvZiB0aGUgdGFibGUgaGVhZGVyIHNob3VsZCBiZSBoaWRkZW4oZS5nLiBjb2x1bW4gaGVhZGVyLCBmaWx0ZXJiYXIsIC4uLilcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHJldHVybnMge2Jvb2xlYW59XHJcblx0ICogQG1lbWJlcm9mIFRyZWVHcmlkV2lkZ2V0QmFzZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaGlkZVNvbWVUYWJsZUhlYWRlclBhcnRzKCk6IGJvb2xlYW57XHJcblx0XHRpZih0aGlzLl9oaWRlQ29sdW1uSGVhZGVyID09IHRydWUpe1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHRcdGlmKHRoaXMuX2hpZGVIZWFkZXJGaWx0ZXJCYXIgPT0gdHJ1ZSl7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBnZXRTY3JvbGxCYXJXaWR0aCgpOiBudW1iZXJ7XHJcblx0XHR2YXIgdmlld0RpdiA9ICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQgKyBcImUtZ3JpZGNvbnRlbnRcIik7XHJcblx0XHRmb3IobGV0IGNoaWxkSW5kZXg9MDsgY2hpbGRJbmRleCA8IHZpZXdEaXZbMF0uY2hpbGRyZW4ubGVuZ3RoOyBjaGlsZEluZGV4Kyspe1xyXG5cdFx0XHRsZXQgY2hpbGQgPSB2aWV3RGl2WzBdLmNoaWxkcmVuW2NoaWxkSW5kZXhdO1xyXG5cdFx0XHRpZihjaGlsZC5jbGFzc0xpc3QuY29udGFpbnMoXCJlLXZzY3JvbGxiYXJcIikgPT0gdHJ1ZSl7XHJcblx0XHRcdFx0cmV0dXJuIGNoaWxkLmNsaWVudFdpZHRoO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gMDtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgZ2V0TmV3Q29sdW1uV2lkdGgodHJlZWdyaWRXaWR0aCwgY29sdW1ucywgZmlsbFNwYWNlQ29sdW1uSW5kZXgpOiBudW1iZXJ7XHJcblx0XHRsZXQgbmV3Q29sdW1uV2lkdGggPSB0cmVlZ3JpZFdpZHRoO1xyXG5cdFx0Zm9yKGxldCBjb2x1bW5JbmRleD0wOyBjb2x1bW5JbmRleCA8IGNvbHVtbnMubGVuZ3RoOyBjb2x1bW5JbmRleCsrKXtcclxuICAgICAgICAgICAgaWYoY29sdW1uSW5kZXggIT0gZmlsbFNwYWNlQ29sdW1uSW5kZXgpe1xyXG5cdFx0XHRcdGlmKGNvbHVtbnNbY29sdW1uSW5kZXhdICE9IHVuZGVmaW5lZCAmJiBjb2x1bW5zW2NvbHVtbkluZGV4XS52aXNpYmxlID09IHRydWUpe1xyXG5cdFx0XHRcdFx0bmV3Q29sdW1uV2lkdGggLT0gY29sdW1uc1tjb2x1bW5JbmRleF0ud2lkdGg7XHJcblx0XHRcdFx0fVxyXG4gICAgICAgICAgICB9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gbmV3Q29sdW1uV2lkdGg7XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEhpZGVzIHRoZSB0YWJsZSBoZWFkZXIgcGFydHMgd2hpY2ggYXJlIGN1cnJlbnRseSBkZWZpbmVkIHRvIGJlIGhpZGRlbihlLmcuIF9oaWRlQ29sdW1uSGVhZGVyLCBfaGlkZUhlYWRlckZpbHRlckJhciwgLi4uKVxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAbWVtYmVyb2YgVHJlZUdyaWRXaWRnZXRCYXNlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBoaWRlVGFibGVIZWFkZXIoKXtcclxuXHRcdHZhciAkdHJlZUdyaWRIZWFkZXIgPSAkKFwiI1wiICsgdGhpcy5fbWFpbkNvbnRhaW5lcklkICsgXCJlLWdyaWRoZWFkZXJcIik7XHJcblx0XHRsZXQgdGFibGVIZWFkZXIgPSAkdHJlZUdyaWRIZWFkZXJbMF0uY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF07XHJcblx0XHRpZih0YWJsZUhlYWRlciAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHRsZXQgY29sdW1uSGVhZGVyID0gKDxhbnk+dGFibGVIZWFkZXIpLnJvd3NbMF07XHJcblx0XHRcdGxldCBmaWx0ZXJCYXIgPSAoPGFueT50YWJsZUhlYWRlcikucm93c1sxXTtcclxuXHRcdFx0aWYoY29sdW1uSGVhZGVyICE9IHVuZGVmaW5lZCl7XHJcblx0XHRcdFx0aWYodGhpcy5faGlkZUNvbHVtbkhlYWRlciA9PSB0cnVlKXtcclxuXHRcdFx0XHRcdC8vIGhpZGUgY29sdW1uIGhlYWRlclxyXG5cdFx0XHRcdFx0Y29sdW1uSGVhZGVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0aWYoZmlsdGVyQmFyICE9IHVuZGVmaW5lZCl7XHJcblx0XHRcdFx0aWYodGhpcy5faGlkZUhlYWRlckZpbHRlckJhciA9PSB0cnVlKXtcclxuXHRcdFx0XHRcdC8vIGhpZGUgZmlsdGVyYmFyXHJcblx0XHRcdFx0XHRmaWx0ZXJCYXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgY29sdW1uIHRlbXBsYXRlcyBmb3IgdGhlIHRyZWUgZ3JpZCBhbmQgYWRkcyB0aGVtIHRvIHRoZSB3aWRnZXQgY29udGFpbmVyXHJcblx0ICpcclxuXHQgKiBAcHJvdGVjdGVkXHJcblx0ICogQG1lbWJlcm9mIFRyZWVHcmlkV2lkZ2V0QmFzZVxyXG5cdCAqL1xyXG5cdHByb3RlY3RlZCBjcmVhdGVDb2x1bW5UZW1wbGF0ZXMoKXtcclxuXHJcblx0fVxyXG5cdFxyXG5cdHByb3RlY3RlZCBhYnN0cmFjdCBjcmVhdGVUcmVlR3JpZCgpO1xyXG59XHJcblxyXG5leHBvcnQge1RyZWVHcmlkV2lkZ2V0QmFzZX07Il19