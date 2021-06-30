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
            _this._previousScrollSettings = { "vertical": 0, "horizontal": 0 };
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
        TreeGridWidgetBase.prototype.setCellEdit = function (value) {
            var treeGridObject = this.getTreeGridObject();
            treeGridObject.model.isEdit = value;
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
                newHeight = this.getNewHeight(height);
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
            //When treeGrid is resized, syncf scrollbar can be added or removed
            this.updatescrollbarsObservation();
        };
        /**
         * Get new height of treegrid
         *
         * @param {number} height
         * @returns {string}
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.getNewHeight = function (height) {
            var newHeight = height - this._headerHeight - this._footerHeight + "px";
            if (this._footerHeight != 0) {
                var nonContentHeight = this.getNonTreeGridContentHeight();
                if (parseFloat(newHeight) < nonContentHeight) {
                    $("#" + this._footerContainerId).hide();
                    newHeight = height - this._headerHeight + "px";
                }
                else {
                    $("#" + this._footerContainerId).show();
                }
            }
            return newHeight;
        };
        /**
         * Get height of treegrid without content (toolbar + header)
         *
         * @returns {number}
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.getNonTreeGridContentHeight = function () {
            var toolbarHeight = parseFloat($(this.cssParentContentId + '_toolbarItems').css('height'));
            var headerHeight = parseFloat($(this.cssParentContentId + 'e-gridheader').css('height'));
            toolbarHeight = toolbarHeight == NaN ? 0 : toolbarHeight;
            headerHeight = headerHeight == NaN ? 0 : headerHeight;
            //1 is added if it is not a Gantt chart (syncfusion internal weird stuff)
            return toolbarHeight + headerHeight + 1;
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
         * Returns the settings of this component
         *
         * @param {boolean} onlyModified
         * @returns {ComponentSettings}
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.getComponentSettings = function (onlyModified) {
            // Add treegrid persisting data
            this.component.setSetting(TreeGridWidgetBase.ColumnsSettingId, this.getColumnSettings());
            this.component.setSetting(TreeGridWidgetBase.ScrollbarsSettingsId, this.getScrollBarSettings());
            return _super.prototype.getComponentSettings.call(this, onlyModified);
        };
        /**
         * Sets the given settings to this component
         *
         * @param {ComponentSettings} componentSettings
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.setComponentSettings = function (componentSettings) {
            if (componentSettings != undefined) {
                _super.prototype.setComponentSettings.call(this, componentSettings);
                this.setColumnSettings(this.component.getSetting(TreeGridWidgetBase.ColumnsSettingId));
                this.setScrollBarSettings(this.component.getSetting(TreeGridWidgetBase.ScrollbarsSettingsId));
                // Hide tableheader/filter row after setting new column sizes if needed
                if (this.hideSomeTableHeaderParts() == true) {
                    // After setting the treegrid column sizes, the header parts will be shown => hide header parts if not needed
                    this.hideTableHeader();
                }
            }
        };
        /**
         * Returns the column settings
         *
         * @private
         * @returns {Array<TreeGridColumnDefinition>}
         * @memberof TreeGridWidgetBase
         */
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
        /**
         * Sets the given columns settings
         *
         * @param {Array<TreeGridColumnDefinition>} columnData
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.setColumnSettings = function (columnData) {
            var treeGridObject = this.getTreeGridObject();
            if (treeGridObject != undefined) {
                if (columnData != undefined) {
                    var columnSettings = treeGridObject.option("columns");
                    if (columnSettings != undefined) {
                        var _loop_1 = function (i) {
                            var columnSetting = columnSettings.find(function (colSetting) { return colSetting.field == columnData[i].id; });
                            if (columnSetting != undefined) {
                                columnSetting.visible = columnData[i].isVisible;
                                columnSetting.width = columnData[i].width;
                            }
                            else {
                                console.error("columnSettings not available for index: " + i);
                            }
                        };
                        for (var i = 0; i < columnData.length; i++) {
                            _loop_1(i);
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
        };
        TreeGridWidgetBase.prototype.getScrollBarSettings = function () {
            var treeGridObject = this.getTreeGridObject();
            var settings = {
                "vertical": treeGridObject.getScrollTopOffset(),
                "horizontal": treeGridObject.getScrollLeftOffset()
            };
            return settings;
        };
        TreeGridWidgetBase.prototype.setScrollBarSettings = function (data) {
            if (data == undefined) {
                return;
            }
            var treeGridObject = this.getTreeGridObject();
            treeGridObject.scrollOffset(data.horizontal, data.vertical);
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
         * Save tree grid settings
         *
         * @protected
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.saveTreeGridSettings = function () {
            if (this.component.getPersistency()) {
                this.updatescrollbarsObservation();
                this.saveSettings();
            }
        };
        /**
         * Updates scrollbar observation for both scrollbars
         *
         * @protected
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.updatescrollbarsObservation = function () {
            var verticalScrollbar = this.getVerticalScrollbar();
            var horizontalScrollbar = this.getHorizontalScrollbar();
            this.updateScrollbarObservation(verticalScrollbar, this._verticalScrollbarObserver);
            this.updateScrollbarObservation(horizontalScrollbar, this._horizontalScrollbarObserver);
        };
        /**
         * Observe scrollbar, unobserve scrollbar or don't do anything.
         *
         * @private
         * @param {(HTMLElement | undefined)} element
         * @param {(MutationObserver | undefined)} observer
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.updateScrollbarObservation = function (element, observer) {
            if (element !== undefined && observer === undefined) {
                this.observeScrollbar(element, observer);
            }
            else if (element === undefined) {
                this.unobserveScrollbar(observer);
            }
        };
        /**
         * Get element of vertical scrollbar
         *
         * @private
         * @returns {(HTMLElement | undefined)}
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.getVerticalScrollbar = function () {
            var scrollbarElement = $(this.cssParentContentId).find('.e-vscrollbar');
            if (scrollbarElement.length > 0) {
                return scrollbarElement.find('.e-vhandle')[0];
            }
            return undefined;
        };
        /**
         * Get element of horizontal scrollbar
         *
         * @private
         * @returns {(HTMLElement | undefined)}
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.getHorizontalScrollbar = function () {
            var scrollbarElement = $(this.cssParentContentId).find('.e-hscrollbar');
            if (scrollbarElement.length > 0) {
                return scrollbarElement.find('.e-hhandle')[0];
            }
            return undefined;
        };
        /**
         * Observe scrollbar for changes
         *
         * @private
         * @param {HTMLElement} target
         * @param {(MutationObserver | undefined)} observer
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.observeScrollbar = function (target, observer) {
            var widget = this;
            observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutationRecord) {
                    var scrollSettings = widget.getComponentSettings(true).data.scrollbars;
                    if (scrollSettings.horizontal != widget._previousScrollSettings.horizontal || scrollSettings.vertical != widget._previousScrollSettings.vertical) {
                        widget._previousScrollSettings = scrollSettings;
                        widget.saveSettings();
                    }
                });
            });
            observer.observe(target, { attributes: true });
        };
        /**
         * Unobserve scrollbar
         *
         * @private
         * @param {(MutationObserver | undefined)} observer
         * @memberof TreeGridWidgetBase
         */
        TreeGridWidgetBase.prototype.unobserveScrollbar = function (observer) {
            if (observer !== undefined) {
                observer.disconnect();
                observer = undefined;
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
        TreeGridWidgetBase.ScrollbarsSettingsId = "scrollbars";
        return TreeGridWidgetBase;
    }(widgetBase_1.WidgetBase));
    exports.TreeGridWidgetBase = TreeGridWidgetBase;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZUdyaWRXaWRnZXRCYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NvbW1vbi90cmVlR3JpZFdpZGdldEJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQU1BO1FBQTBDLHNDQUFVO1FBQXBEO1lBQUEscUVBNHBCQztZQXhwQlUsbUJBQWEsR0FBRyxDQUFDLENBQUM7WUFDbEIsbUJBQWEsR0FBRyxDQUFDLENBQUM7WUFNcEIsZ0NBQTBCLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxrQ0FBa0M7WUFDbkUscUNBQStCLEdBQUcsRUFBRSxDQUFDO1lBQ3JDLHVCQUFpQixHQUFHLEtBQUssQ0FBQztZQUMxQiwwQkFBb0IsR0FBRyxLQUFLLENBQUM7WUFJN0IsNkJBQXVCLEdBQW9CLEVBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSxZQUFZLEVBQUUsQ0FBQyxFQUFDLENBQUM7O1FBMG9CckYsQ0FBQztRQXJvQkEsdUNBQVUsR0FBVixVQUFXLGlCQUF5QixFQUFFLFlBQXdCLEVBQUUsWUFBd0I7WUFBbEQsNkJBQUEsRUFBQSxnQkFBd0I7WUFBRSw2QkFBQSxFQUFBLGdCQUF3QjtZQUV2RixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUV6QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsaUJBQWlCLENBQUM7WUFDMUMsSUFBRyxZQUFZLElBQUksQ0FBQyxJQUFJLFlBQVksSUFBSSxDQUFDLEVBQUM7Z0JBQ3pDLHVCQUF1QjtnQkFDdkIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGlCQUFpQixHQUFHLFNBQVMsQ0FBQztnQkFDeEQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGlCQUFpQixHQUFHLE9BQU8sQ0FBQztnQkFDcEQsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGlCQUFpQixHQUFHLFNBQVMsQ0FBQztnQkFDeEQsSUFBRyxZQUFZLElBQUksQ0FBQyxFQUFDO29C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QkFDaEQsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO3FCQUN0QjtnQkFDTyxDQUFDLENBQUMsQ0FBQztZQUNiLENBQUMsQ0FBQyxDQUFDO1lBRUgsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxVQUFVLEVBQUcsSUFBSSxFQUFDLENBQUMsQ0FBQztRQUNoRCxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ssK0NBQWtCLEdBQTFCLFVBQTJCLFFBQXNDO1lBQ2hFLElBQUksUUFBUSxLQUFLLFNBQVMsRUFBRTtnQkFDM0IsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUN0QixRQUFRLEdBQUcsU0FBUyxDQUFDO2FBQ3JCO1FBQ0YsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ08sa0RBQXFCLEdBQS9CO1FBRUEsQ0FBQztRQXJvQnNCLG1DQUFnQixHQUFHLFNBQVMsQ0FBQztRQUM3Qix1Q0FBb0IsR0FBRyxZQUFZLENBQUM7UUF1b0I1RCx5QkFBQztLQUFBLEFBNXBCRCxDQUEwQyx1QkFBVSxHQTRwQm5EO0lBRU8sZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgV2lkZ2V0QmFzZSB9IGZyb20gXCIuL3dpZGdldEJhc2VcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgVHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uIH0gZnJvbSBcIi4vdHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uXCI7XHJcbmltcG9ydCB7IFBlcnNpc3REYXRhUHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3BlcnNpc3RlbmNlL3BlcnNpc3REYXRhUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgSVNjcm9sbFNldHRpbmdzIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9zY3JvbGxTZXR0aW5nc0ludGVyZmFjZVwiO1xyXG5cclxuYWJzdHJhY3QgY2xhc3MgVHJlZUdyaWRXaWRnZXRCYXNlIGV4dGVuZHMgV2lkZ2V0QmFzZXtcclxuXHJcblx0cHJvdGVjdGVkIF9hY3R1YWxXaWR0aDtcclxuXHRwcm90ZWN0ZWQgX2FjdHVhbEhlaWdodDtcclxuXHRwcm90ZWN0ZWQgX2hlYWRlckhlaWdodCA9IDA7XHJcblx0cHJvdGVjdGVkIF9mb290ZXJIZWlnaHQgPSAwO1xyXG5cclxuXHRwcml2YXRlIF9oZWFkZXJDb250YWluZXJJZDtcclxuXHRwcml2YXRlIF9tYWluQ29udGFpbmVySWQ7XHJcblx0cHJpdmF0ZSBfZm9vdGVyQ29udGFpbmVySWQ7XHJcblxyXG5cdHByaXZhdGUgX2NvbHVtbkluZGV4Rm9yRHluYW1pY1NpemUgPSAtMTsgLy8gLTEgZm9yIG5vIGR5bmFtaWMgc2l6ZSBiZWhhdmlvclxyXG5cdHByaXZhdGUgX21pbkNvbHVtbldpZHRoRm9yRHluYW1pY0NvbHVtbiA9IDEwO1xyXG5cdHByaXZhdGUgX2hpZGVDb2x1bW5IZWFkZXIgPSBmYWxzZTtcclxuXHRwcml2YXRlIF9oaWRlSGVhZGVyRmlsdGVyQmFyID0gZmFsc2U7XHJcblxyXG5cdHByaXZhdGUgX3ZlcnRpY2FsU2Nyb2xsYmFyT2JzZXJ2ZXI7XHJcblx0cHJpdmF0ZSBfaG9yaXpvbnRhbFNjcm9sbGJhck9ic2VydmVyO1xyXG5cdHByaXZhdGUgX3ByZXZpb3VzU2Nyb2xsU2V0dGluZ3M6IElTY3JvbGxTZXR0aW5ncyA9IHtcInZlcnRpY2FsXCI6IDAsIFwiaG9yaXpvbnRhbFwiOiAwfTtcclxuXHJcblx0cHVibGljIHN0YXRpYyByZWFkb25seSBDb2x1bW5zU2V0dGluZ0lkID0gXCJjb2x1bW5zXCI7XHJcblx0cHVibGljIHN0YXRpYyByZWFkb25seSBTY3JvbGxiYXJzU2V0dGluZ3NJZCA9IFwic2Nyb2xsYmFyc1wiO1xyXG5cclxuXHRpbml0aWFsaXplKGxheW91dENvbnRhaW5lcklkOiBzdHJpbmcsIGhlYWRlckhlaWdodDogbnVtYmVyID0gMCwgZm9vdGVySGVpZ2h0OiBudW1iZXIgPSAwKSB7XHJcblxyXG5cdFx0dGhpcy5pbml0aWFsaXplTG9jYWxlcygpO1xyXG5cclxuXHRcdHRoaXMuX21haW5Db250YWluZXJJZCA9IGxheW91dENvbnRhaW5lcklkO1xyXG5cdFx0aWYoaGVhZGVySGVpZ2h0ICE9IDAgfHwgZm9vdGVySGVpZ2h0ICE9IDApe1xyXG5cdFx0XHQvLyBBZGQgYWRkaXRpb25hbCBkaXZzIFxyXG5cdFx0XHR0aGlzLl9oZWFkZXJDb250YWluZXJJZCA9IGxheW91dENvbnRhaW5lcklkICsgXCJfaGVhZGVyXCI7XHJcblx0XHRcdHRoaXMuX21haW5Db250YWluZXJJZCA9IGxheW91dENvbnRhaW5lcklkICsgXCJfbWFpblwiO1xyXG5cdFx0XHR0aGlzLl9mb290ZXJDb250YWluZXJJZCA9IGxheW91dENvbnRhaW5lcklkICsgXCJfZm9vdGVyXCI7XHJcblx0XHRcdGlmKGhlYWRlckhlaWdodCAhPSAwKXtcclxuXHRcdFx0XHR0aGlzLl9oZWFkZXJIZWlnaHQgPSBoZWFkZXJIZWlnaHQ7XHJcblx0XHRcdFx0JChcIiNcIisgbGF5b3V0Q29udGFpbmVySWQpLmFwcGVuZChcIjxkaXYgY2xhc3M9J3dpZGdldEhlYWRlcicgaWQ9J1wiKyB0aGlzLl9oZWFkZXJDb250YWluZXJJZCArIFwiJyBzdHlsZT0naGVpZ2h0OiBcIisgdGhpcy5faGVhZGVySGVpZ2h0ICsgXCJweCc+PC9kaXY+XCIpXHJcblx0XHRcdH1cclxuXHRcdFx0JChcIiNcIisgbGF5b3V0Q29udGFpbmVySWQpLmFwcGVuZChcIjxkaXYgaWQ9J1wiKyB0aGlzLl9tYWluQ29udGFpbmVySWQgKyBcIic+PC9kaXY+XCIpXHJcblx0XHRcdGlmKGZvb3RlckhlaWdodCAhPSAwKXtcclxuXHRcdFx0XHR0aGlzLl9mb290ZXJIZWlnaHQgPSBmb290ZXJIZWlnaHQ7XHJcblx0XHRcdFx0JChcIiNcIisgbGF5b3V0Q29udGFpbmVySWQpLmFwcGVuZChcIjxkaXYgY2xhc3M9J3dpZGdldEZvb3RlcicgaWQ9J1wiKyB0aGlzLl9mb290ZXJDb250YWluZXJJZCArIFwiJyBzdHlsZT0naGVpZ2h0OiBcIisgdGhpcy5fZm9vdGVySGVpZ2h0ICsgXCJweCc+PC9kaXY+XCIpXHJcblx0XHRcdH1cclxuXHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0dGhpcy5faGVhZGVySGVpZ2h0ID0gMDtcclxuXHRcdH1cclxuXHJcblx0XHRzdXBlci5pbml0aWFsaXplKHRoaXMuX21haW5Db250YWluZXJJZCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEaXNwb3NlIHRoZSB0cmVlIGdyaWQgZGF0YVxyXG5cdCAqXHJcblx0ICogQG1lbWJlcm9mIFRyZWVHcmlkV2lkZ2V0QmFzZVxyXG5cdCAqL1xyXG5cdGRpc3Bvc2UoKXtcclxuXHRcdHN1cGVyLmRpc3Bvc2UoKTtcclxuXHJcblx0XHRsZXQgdHJlZUdyaWRPYmplY3QgPSB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCk7XHJcblx0XHRpZih0cmVlR3JpZE9iamVjdCAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHR0cmVlR3JpZE9iamVjdC5kZXN0cm95KCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIGEgZHluYW1pYyBjb2x1bW5cclxuXHQgKiBUaGlzIGNvbHVtbiB3aWxsIGJlIHJlc2l6ZWQgaWYgdGhlIHdpbmRvdy93aWRnZXQgd2VyZSByZXNpemVkXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge251bWJlcn0gY29sdW1uSW5kZXhcclxuXHQgKiBAcGFyYW0ge251bWJlcn0gbWluQ29sdW1uV2lkdGhGb3JEeW5hbWljQ29sdW1uXHJcblx0ICogQG1lbWJlcm9mIFRyZWVHcmlkV2lkZ2V0QmFzZVxyXG5cdCAqL1xyXG5cdHNldER5bmFtaWNDb2x1bW4oY29sdW1uSW5kZXg6IG51bWJlciwgbWluQ29sdW1uV2lkdGhGb3JEeW5hbWljQ29sdW1uOiBudW1iZXIpe1xyXG5cdFx0dGhpcy5fY29sdW1uSW5kZXhGb3JEeW5hbWljU2l6ZSA9IGNvbHVtbkluZGV4O1xyXG5cdFx0dGhpcy5fbWluQ29sdW1uV2lkdGhGb3JEeW5hbWljQ29sdW1uID0gbWluQ29sdW1uV2lkdGhGb3JEeW5hbWljQ29sdW1uO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcbiAgICAgKiBMb2FkcyB0aGUgc3R5bGVzIGZvciB0aGUgdHJlZSBncmlkIHdpZGdldCBiYXNlXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRyZWVHcmlkV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBsb2FkU3R5bGVzKCl7XHJcblx0XHRzdXBlci5hZGRTdHlsZShcIndpZGdldHMvY29tbW9uL3N0eWxlL2Nzcy90cmVlR3JpZFN0eWxlLmNzc1wiKTtcclxuXHRcdHN1cGVyLmFkZFN0eWxlKFwid2lkZ2V0cy9jb21tb24vc3R5bGUvY3NzL3RyZWVHcmlkU2Nyb2xsQmFyU3R5bGUuY3NzXCIpO1xyXG5cdFx0c3VwZXIuYWRkU3R5bGUoXCJ3aWRnZXRzL2NvbW1vbi9zdHlsZS9jc3MvdHJlZUdyaWRJY29uU3R5bGUuY3NzXCIpO1xyXG5cdFx0c3VwZXIuYWRkU3R5bGUoXCJ3aWRnZXRzL2NvbW1vbi9zdHlsZS9jc3MvdHJlZUdyaWRUb29sYmFyQnV0dG9uU3R5bGUuY3NzXCIpO1xyXG5cdFx0c3VwZXIuYWRkU3R5bGUoXCJ3aWRnZXRzL2NvbW1vbi9zdHlsZS9jc3Mvd2lkZ2V0SGVhZGVyRm9vdGVyU3R5bGUuY3NzXCIpO1xyXG5cdH1cclxuXHRcclxuXHRzZXRDZWxsRWRpdCh2YWx1ZTogYm9vbGVhbil7XHJcblx0XHR2YXIgdHJlZUdyaWRPYmplY3QgPSB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCk7XHJcblx0XHQoPGFueT50cmVlR3JpZE9iamVjdC5tb2RlbCkuaXNFZGl0ID0gdmFsdWU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBmbGFnIHRoYXQgdGhlIGNvbHVtbiBoZWFkZXIgb2YgdGhlIHRyZWUgZ3JpZCBzaG91bGQgYmUgaGlkZGVuXHJcblx0ICpcclxuXHQgKiBAbWVtYmVyb2YgVHJlZUdyaWRXaWRnZXRCYXNlXHJcblx0ICovXHJcblx0c2V0Q29sdW1uSGVhZGVySGlkZGVuKCl7XHJcblx0XHR0aGlzLl9oaWRlQ29sdW1uSGVhZGVyID0gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGZsYWcgdGhhdCB0aGUgaGVhZGVyIGZpbHRlcmJhciBvZiB0aGUgdHJlZSBncmlkIHNob3VsZCBiZSBoaWRkZW5cclxuXHQgKlxyXG5cdCAqIEBtZW1iZXJvZiBUcmVlR3JpZFdpZGdldEJhc2VcclxuXHQgKi9cclxuXHRzZXRIZWFkZXJGaWx0ZXJCYXJIaWRkZW4oKXtcclxuXHRcdHRoaXMuX2hpZGVIZWFkZXJGaWx0ZXJCYXIgPSB0cnVlO1xyXG5cdH1cclxuXHJcblx0LyoqIHNldHMgdGhlIHRyZWUgZ3JpZCBoZWFkZXIgY29udGVudCBcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29udGVudFxyXG4gICAgICogQG1lbWJlcm9mIFRyZWVHcmlkV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcblx0c2V0SGVhZGVyQ29udGVudChjb250ZW50OnN0cmluZyl7XHJcblx0XHQkKFwiI1wiKyB0aGlzLl9oZWFkZXJDb250YWluZXJJZClbMF0uaW5uZXJIVE1MID0gY29udGVudDtcclxuXHR9XHJcblxyXG5cdC8qKiBzZXRzIHRoZSB0cmVlIGdyaWQgZm9vdGVyIGNvbnRlbnQgXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnRcclxuICAgICAqIEBtZW1iZXJvZiBUcmVlR3JpZFdpZGdldEJhc2VcclxuICAgICAqL1xyXG5cdHNldEZvb3RlckNvbnRlbnQoY29udGVudDpzdHJpbmcpe1xyXG5cdFx0JChcIiNcIisgdGhpcy5fZm9vdGVyQ29udGFpbmVySWQpWzBdLmlubmVySFRNTCA9IGNvbnRlbnQ7XHJcblx0fVxyXG5cclxuXHQvKiogcmVzaXplcyB0aGUgdHJlZSBncmlkIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodFxyXG4gICAgICogQG1lbWJlcm9mIFRyZWVHcmlkV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICByZXNpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpe1xyXG5cdFx0dGhpcy5fYWN0dWFsV2lkdGggPSB3aWR0aDtcclxuXHRcdHRoaXMuX2FjdHVhbEhlaWdodCA9IGhlaWdodDtcclxuXHJcblx0XHR2YXIgbmV3V2lkdGggOiBzdHJpbmcgPSBcIlwiO1xyXG5cdFx0dmFyIG5ld0hlaWdodCA6IHN0cmluZyA9IFwiXCI7XHJcblx0XHRpZih3aWR0aCAhPSAwKXtcclxuXHRcdFx0bmV3V2lkdGggPSB3aWR0aCArIFwicHhcIjtcclxuXHRcdH1cclxuXHRcdGlmKGhlaWdodCAhPSAwKXtcclxuXHRcdFx0bmV3SGVpZ2h0ID0gdGhpcy5nZXROZXdIZWlnaHQoaGVpZ2h0KTtcclxuXHRcdH1cclxuXHRcdFx0XHJcblx0XHR2YXIgdHJlZUdyaWRPYmogPSB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCksXHJcblx0XHRcdHNpemVTZXR0aW5ncyA9IHtcclxuXHRcdFx0XHRoZWlnaHQ6IG5ld0hlaWdodCwgd2lkdGg6IG5ld1dpZHRoLCAvLyAxMDAlIHdvdWxkIGJlIHdyb25nID0+IHNldCBlbXB0eSBzdHJpbmcgdG8gcmVzaXplIHRoZSB0cmVlZ3JpZCBjb3JyZWN0XHJcblx0XHR9O1xyXG5cdFx0aWYgKHRyZWVHcmlkT2JqKXtcclxuXHRcdFx0Ly8gU2F2ZSBjZWxsIGlmIGN1cnJlbnRseSBpbiBlZGl0IG1vZGUgYmVmb3JlIHN0YXJ0IHJlc2l6aW5nIHRoZSB0cmVlZ3JpZCwgb3RoZXJ3aXNlIGVycm9ycyB3b3VsZCBvY2N1clxyXG5cdFx0XHR0cmVlR3JpZE9iai5zYXZlQ2VsbCgpOyBcclxuXHRcdFx0dHJlZUdyaWRPYmoub3B0aW9uKFwic2l6ZVNldHRpbmdzXCIsIHNpemVTZXR0aW5ncywgdHJ1ZSk7IC8vIGZvcmNlIHRoZSBzZXR0aW5nIHRvIHJlc2l6ZSB0aGUgdHJlZWdyaWQgY29ycmVjdFxyXG5cdFx0fVxyXG5cdFx0aWYodGhpcy5fY29sdW1uSW5kZXhGb3JEeW5hbWljU2l6ZSAhPSAtMSl7XHJcblx0XHRcdHRoaXMuZmlsbFNwYWNlV2l0aER5bmFtaWNDb2x1bW4od2lkdGgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vV2hlbiB0cmVlR3JpZCBpcyByZXNpemVkLCBzeW5jZiBzY3JvbGxiYXIgY2FuIGJlIGFkZGVkIG9yIHJlbW92ZWRcclxuXHRcdHRoaXMudXBkYXRlc2Nyb2xsYmFyc09ic2VydmF0aW9uKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZXQgbmV3IGhlaWdodCBvZiB0cmVlZ3JpZFxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodFxyXG5cdCAqIEByZXR1cm5zIHtzdHJpbmd9XHJcblx0ICogQG1lbWJlcm9mIFRyZWVHcmlkV2lkZ2V0QmFzZVxyXG5cdCAqL1xyXG5cdGdldE5ld0hlaWdodChoZWlnaHQ6IG51bWJlcik6IHN0cmluZyB7XHJcblx0XHRsZXQgbmV3SGVpZ2h0ID0gaGVpZ2h0IC0gdGhpcy5faGVhZGVySGVpZ2h0IC0gdGhpcy5fZm9vdGVySGVpZ2h0ICsgXCJweFwiO1xyXG5cdFx0aWYgKHRoaXMuX2Zvb3RlckhlaWdodCAhPSAwKSB7XHJcblx0XHRcdGxldCBub25Db250ZW50SGVpZ2h0ID0gdGhpcy5nZXROb25UcmVlR3JpZENvbnRlbnRIZWlnaHQoKTtcclxuXHRcdFx0aWYgKHBhcnNlRmxvYXQobmV3SGVpZ2h0KSA8IG5vbkNvbnRlbnRIZWlnaHQpIHtcclxuXHRcdFx0XHQkKFwiI1wiKyB0aGlzLl9mb290ZXJDb250YWluZXJJZCkuaGlkZSgpO1xyXG5cdFx0XHRcdG5ld0hlaWdodCA9IGhlaWdodCAtIHRoaXMuX2hlYWRlckhlaWdodCArXCJweFwiO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdCQoXCIjXCIrIHRoaXMuX2Zvb3RlckNvbnRhaW5lcklkKS5zaG93KCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBuZXdIZWlnaHQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZXQgaGVpZ2h0IG9mIHRyZWVncmlkIHdpdGhvdXQgY29udGVudCAodG9vbGJhciArIGhlYWRlcilcclxuXHQgKlxyXG5cdCAqIEByZXR1cm5zIHtudW1iZXJ9XHJcblx0ICogQG1lbWJlcm9mIFRyZWVHcmlkV2lkZ2V0QmFzZVxyXG5cdCAqL1xyXG5cdGdldE5vblRyZWVHcmlkQ29udGVudEhlaWdodCgpOiBudW1iZXIge1xyXG5cdFx0bGV0IHRvb2xiYXJIZWlnaHQgPSBwYXJzZUZsb2F0KCQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQgKyAnX3Rvb2xiYXJJdGVtcycpLmNzcygnaGVpZ2h0JykpO1xyXG5cdFx0bGV0IGhlYWRlckhlaWdodCA9IHBhcnNlRmxvYXQoJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCArICdlLWdyaWRoZWFkZXInKS5jc3MoJ2hlaWdodCcpKTtcclxuXHRcdHRvb2xiYXJIZWlnaHQgPSB0b29sYmFySGVpZ2h0ID09IE5hTiA/IDAgOiB0b29sYmFySGVpZ2h0O1xyXG5cdFx0aGVhZGVySGVpZ2h0ID0gaGVhZGVySGVpZ2h0ID09IE5hTiA/IDAgOiBoZWFkZXJIZWlnaHQ7XHJcblx0XHRcclxuXHRcdC8vMSBpcyBhZGRlZCBpZiBpdCBpcyBub3QgYSBHYW50dCBjaGFydCAoc3luY2Z1c2lvbiBpbnRlcm5hbCB3ZWlyZCBzdHVmZilcclxuXHRcdHJldHVybiB0b29sYmFySGVpZ2h0ICsgaGVhZGVySGVpZ2h0ICsgMTtcclxuXHR9XHJcblxyXG5cdHNldE1vZGVsKG1vZGVsOiBhbnksIGZvcmNlOiBib29sZWFuID0gZmFsc2Upe1xyXG5cdFx0dmFyIHRyZWVHcmlkT2JqID0gdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpO1xyXG5cdFx0dHJlZUdyaWRPYmouc2V0TW9kZWwoe1wiZGF0YVNvdXJjZVwiIDogbW9kZWx9LCBmb3JjZSk7XHJcblx0XHRcclxuXHRcdGlmKHRoaXMuX2NvbHVtbkluZGV4Rm9yRHluYW1pY1NpemUgIT0gLTEpe1xyXG5cdFx0XHQvLyBUbyBhdm9pZCBlbXB0eSBzcGFjZSBhZnRlciBsYXN0IGNvbHVtbiBiZWNhdXNlIG9mIHJlbW92aW5nIHRoZSBzY3JvbGxiYXIgaWYgbGVzcyBkYXRhIGlzIGF2YWlsYWJsZVxyXG5cdFx0XHR0aGlzLmZpbGxTcGFjZVdpdGhEeW5hbWljQ29sdW1uKHRoaXMud2lkdGgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVzaXplIGR5bmFtaWMgY29sdW1uXHJcblx0ICogSWYgY2hhbmdlZCBjb2x1bW4gd2FzIGR5bmFtaWMgY29sdW1uIHRoZSBzaXplIG9mIHRoZSBsYXN0IGNvbHVtbiB3aWxsIGJlIGFkYXB0ZWRcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7Kn0gY29sdW1uSW5kZXhcdGNvbHVtbkluZGV4IG9mIGNoYW5nZWQgY29sdW1uXHJcblx0ICogQHBhcmFtIHsqfSB0cmVlR3JpZE1vZGVsXHJcblx0ICogQG1lbWJlcm9mIFRyZWVHcmlkV2lkZ2V0QmFzZVxyXG5cdCAqL1xyXG5cdHJlc2l6ZUR5bmFtaWNDb2x1bW4oY29sdW1uSW5kZXgsIHRyZWVHcmlkTW9kZWwpe1xyXG5cdFx0bGV0IHRyZWVHcmlkV2lkdGggPSBwYXJzZUludCh0cmVlR3JpZE1vZGVsLnNpemVTZXR0aW5ncy53aWR0aCwgMTApOyAvLyBwYXJzZUludCB0byByZW1vdmUgXCJweFwiXHJcblx0XHRpZihjb2x1bW5JbmRleCAhPSB0aGlzLl9jb2x1bW5JbmRleEZvckR5bmFtaWNTaXplICYmIGNvbHVtbkluZGV4IDwgdGhpcy5fY29sdW1uSW5kZXhGb3JEeW5hbWljU2l6ZSl7XHJcblx0XHRcdHRoaXMuZmlsbFNwYWNlV2l0aER5bmFtaWNDb2x1bW4odHJlZUdyaWRXaWR0aCk7IFxyXG5cdFx0fVxyXG5cdFx0ZWxzZXtcclxuXHRcdFx0Ly8gRHluYW1pYyBjb2x1bW4gc2l6ZSB3YXMgY2hhbmdlZCA9PiB1cGRhdGUgbGFzdCBcInZpc2libGVcIiBjb2x1bW4gdG8gZmlsbCBzcGFjZVxyXG5cdFx0XHRsZXQgbGFzdFZpc2libGVDb2x1bW5JbmRleCA9IHRoaXMuZ2V0TGFzdFZpc2libGVDb2x1bW5JbmRleCh0cmVlR3JpZE1vZGVsKTtcclxuXHRcdFx0dGhpcy5maWxsU3BhY2VXaXRoQ29sdW1uKGxhc3RWaXNpYmxlQ29sdW1uSW5kZXgsIHRyZWVHcmlkV2lkdGgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgc2V0dGluZ3Mgb2YgdGhpcyBjb21wb25lbnRcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gb25seU1vZGlmaWVkXHJcblx0ICogQHJldHVybnMge0NvbXBvbmVudFNldHRpbmdzfVxyXG5cdCAqIEBtZW1iZXJvZiBUcmVlR3JpZFdpZGdldEJhc2VcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0Q29tcG9uZW50U2V0dGluZ3Mob25seU1vZGlmaWVkOiBib29sZWFuKTogQ29tcG9uZW50U2V0dGluZ3N7XHJcblx0XHQvLyBBZGQgdHJlZWdyaWQgcGVyc2lzdGluZyBkYXRhXHJcblx0XHR0aGlzLmNvbXBvbmVudC5zZXRTZXR0aW5nKFRyZWVHcmlkV2lkZ2V0QmFzZS5Db2x1bW5zU2V0dGluZ0lkLCB0aGlzLmdldENvbHVtblNldHRpbmdzKCkpO1xyXG5cdFx0dGhpcy5jb21wb25lbnQuc2V0U2V0dGluZyhUcmVlR3JpZFdpZGdldEJhc2UuU2Nyb2xsYmFyc1NldHRpbmdzSWQsIHRoaXMuZ2V0U2Nyb2xsQmFyU2V0dGluZ3MoKSk7XHJcblx0XHRyZXR1cm4gc3VwZXIuZ2V0Q29tcG9uZW50U2V0dGluZ3Mob25seU1vZGlmaWVkKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGdpdmVuIHNldHRpbmdzIHRvIHRoaXMgY29tcG9uZW50XHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge0NvbXBvbmVudFNldHRpbmdzfSBjb21wb25lbnRTZXR0aW5nc1xyXG5cdCAqIEBtZW1iZXJvZiBUcmVlR3JpZFdpZGdldEJhc2VcclxuXHQgKi9cclxuXHRwdWJsaWMgc2V0Q29tcG9uZW50U2V0dGluZ3MoY29tcG9uZW50U2V0dGluZ3M6IENvbXBvbmVudFNldHRpbmdzKSB7XHJcblx0XHRpZihjb21wb25lbnRTZXR0aW5ncyAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHRzdXBlci5zZXRDb21wb25lbnRTZXR0aW5ncyhjb21wb25lbnRTZXR0aW5ncyk7XHRcdFxyXG5cdFx0XHR0aGlzLnNldENvbHVtblNldHRpbmdzKHRoaXMuY29tcG9uZW50LmdldFNldHRpbmcoVHJlZUdyaWRXaWRnZXRCYXNlLkNvbHVtbnNTZXR0aW5nSWQpKTtcclxuXHRcdFx0dGhpcy5zZXRTY3JvbGxCYXJTZXR0aW5ncyh0aGlzLmNvbXBvbmVudC5nZXRTZXR0aW5nKFRyZWVHcmlkV2lkZ2V0QmFzZS5TY3JvbGxiYXJzU2V0dGluZ3NJZCkpO1xyXG5cdFx0XHQvLyBIaWRlIHRhYmxlaGVhZGVyL2ZpbHRlciByb3cgYWZ0ZXIgc2V0dGluZyBuZXcgY29sdW1uIHNpemVzIGlmIG5lZWRlZFxyXG5cdFx0XHRpZih0aGlzLmhpZGVTb21lVGFibGVIZWFkZXJQYXJ0cygpID09IHRydWUpe1xyXG5cdFx0XHRcdC8vIEFmdGVyIHNldHRpbmcgdGhlIHRyZWVncmlkIGNvbHVtbiBzaXplcywgdGhlIGhlYWRlciBwYXJ0cyB3aWxsIGJlIHNob3duID0+IGhpZGUgaGVhZGVyIHBhcnRzIGlmIG5vdCBuZWVkZWRcclxuXHRcdFx0XHR0aGlzLmhpZGVUYWJsZUhlYWRlcigpOyBcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgY29sdW1uIHNldHRpbmdzXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEByZXR1cm5zIHtBcnJheTxUcmVlR3JpZENvbHVtbkRlZmluaXRpb24+fVxyXG5cdCAqIEBtZW1iZXJvZiBUcmVlR3JpZFdpZGdldEJhc2VcclxuXHQgKi9cclxuXHRwcml2YXRlIGdldENvbHVtblNldHRpbmdzKCk6IEFycmF5PFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbj57XHJcblx0XHRsZXQgY29sdW1uRGF0YSA9IG5ldyBBcnJheTxhbnk+KCk7XHJcblx0XHRsZXQgdHJlZUdyaWRPYmplY3QgPSB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCk7XHJcblx0XHRpZih0cmVlR3JpZE9iamVjdCAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHRsZXQgY29sdW1uU2V0dGluZ3MgPSB0cmVlR3JpZE9iamVjdC5vcHRpb24oXCJjb2x1bW5zXCIpOyBcclxuXHRcdFx0aWYoY29sdW1uU2V0dGluZ3MgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0XHRmb3IobGV0IGkgPSAwOyBpIDwgY29sdW1uU2V0dGluZ3MubGVuZ3RoOyBpKyspe1xyXG5cdFx0XHRcdFx0Y29sdW1uRGF0YS5wdXNoKG5ldyBUcmVlR3JpZENvbHVtbkRlZmluaXRpb24oY29sdW1uU2V0dGluZ3NbaV0uZmllbGQsIGNvbHVtblNldHRpbmdzW2ldLndpZHRoLCBjb2x1bW5TZXR0aW5nc1tpXS52aXNpYmxlKSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gY29sdW1uRGF0YTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGdpdmVuIGNvbHVtbnMgc2V0dGluZ3MgXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge0FycmF5PFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbj59IGNvbHVtbkRhdGFcclxuXHQgKiBAbWVtYmVyb2YgVHJlZUdyaWRXaWRnZXRCYXNlXHJcblx0ICovXHJcblx0cHVibGljIHNldENvbHVtblNldHRpbmdzKGNvbHVtbkRhdGE6IEFycmF5PFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbj4pIHtcclxuXHRcdGxldCB0cmVlR3JpZE9iamVjdCA9IHRoaXMuZ2V0VHJlZUdyaWRPYmplY3QoKTtcclxuXHRcdGlmKHRyZWVHcmlkT2JqZWN0ICE9IHVuZGVmaW5lZCl7XHJcblx0XHRcdGlmKGNvbHVtbkRhdGEgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0XHRsZXQgY29sdW1uU2V0dGluZ3M6IEFycmF5PGFueT4gPSB0cmVlR3JpZE9iamVjdC5vcHRpb24oXCJjb2x1bW5zXCIpO1xyXG5cdFx0XHRcdGlmKGNvbHVtblNldHRpbmdzICE9IHVuZGVmaW5lZCl7XHJcblx0XHRcdFx0XHRmb3IobGV0IGkgPSAwOyBpIDwgY29sdW1uRGF0YS5sZW5ndGg7IGkrKyl7XHJcblx0XHRcdFx0XHRcdGxldCBjb2x1bW5TZXR0aW5nID0gY29sdW1uU2V0dGluZ3MuZmluZChjb2xTZXR0aW5nID0+IGNvbFNldHRpbmcuZmllbGQgPT0gY29sdW1uRGF0YVtpXS5pZCk7XHJcblx0XHRcdFx0XHRcdGlmKGNvbHVtblNldHRpbmcgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0XHRcdFx0XHRjb2x1bW5TZXR0aW5nLnZpc2libGUgPSBjb2x1bW5EYXRhW2ldLmlzVmlzaWJsZTtcclxuXHRcdFx0XHRcdFx0XHRjb2x1bW5TZXR0aW5nLndpZHRoID0gY29sdW1uRGF0YVtpXS53aWR0aDtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRlbHNle1xyXG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJjb2x1bW5TZXR0aW5ncyBub3QgYXZhaWxhYmxlIGZvciBpbmRleDogXCIgKyBpKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR0cmVlR3JpZE9iamVjdC5vcHRpb24oXCJjb2x1bW5zXCIsIGNvbHVtblNldHRpbmdzLCB0cnVlKTsgXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIEhpZGUgdGFibGVoZWFkZXIvZmlsdGVyIHJvdyBhZnRlciBzZXR0aW5nIG5ldyBjb2x1bW4gc2l6ZXMgaWYgbmVlZGVkXHJcblx0XHRcdGlmKHRoaXMuaGlkZVNvbWVUYWJsZUhlYWRlclBhcnRzKCkgPT0gdHJ1ZSl7XHJcblx0XHRcdFx0Ly8gQWZ0ZXIgc2V0dGluZyB0aGUgdHJlZWdyaWQgY29sdW1uIHNpemVzLCB0aGUgaGVhZGVyIHBhcnRzIHdpbGwgYmUgc2hvd24gPT4gaGlkZSBoZWFkZXIgcGFydHMgaWYgbm90IG5lZWRlZFxyXG5cdFx0XHRcdHRoaXMuaGlkZVRhYmxlSGVhZGVyKCk7IFxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGdldFNjcm9sbEJhclNldHRpbmdzKCk6IElTY3JvbGxTZXR0aW5ncyB7XHJcblx0XHRsZXQgdHJlZUdyaWRPYmplY3QgPSB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCk7XHJcblx0XHRsZXQgc2V0dGluZ3M6IElTY3JvbGxTZXR0aW5ncyA9IHtcclxuXHRcdFx0XCJ2ZXJ0aWNhbFwiOiB0cmVlR3JpZE9iamVjdC5nZXRTY3JvbGxUb3BPZmZzZXQoKSxcclxuXHRcdFx0XCJob3Jpem9udGFsXCI6IHRyZWVHcmlkT2JqZWN0LmdldFNjcm9sbExlZnRPZmZzZXQoKVxyXG5cdFx0fTtcclxuXHJcblx0XHRyZXR1cm4gc2V0dGluZ3M7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0U2Nyb2xsQmFyU2V0dGluZ3MoZGF0YTogSVNjcm9sbFNldHRpbmdzIHwgdW5kZWZpbmVkKXtcclxuXHRcdGlmKGRhdGEgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0bGV0IHRyZWVHcmlkT2JqZWN0ID0gdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpO1xyXG5cdFx0dHJlZUdyaWRPYmplY3Quc2Nyb2xsT2Zmc2V0KGRhdGEuaG9yaXpvbnRhbCwgZGF0YS52ZXJ0aWNhbCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbGFzdCB2aXNpYmxlIGNvbHVtblxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0geyp9IHRyZWVHcmlkTW9kZWxcclxuXHQgKiBAcmV0dXJuc1xyXG5cdCAqIEBtZW1iZXJvZiBUcmVlR3JpZFdpZGdldEJhc2VcclxuXHQgKi9cclxuXHRwcml2YXRlIGdldExhc3RWaXNpYmxlQ29sdW1uSW5kZXgodHJlZUdyaWRNb2RlbCl7XHJcblx0XHRmb3IobGV0IGkgPSB0cmVlR3JpZE1vZGVsLmNvbHVtbnMubGVuZ3RoLTE7IGkgPj0gMDsgaS0tKXtcclxuXHRcdFx0aWYodHJlZUdyaWRNb2RlbC5jb2x1bW5zW2ldLnZpc2libGUgPT0gdHJ1ZSl7XHJcblx0XHRcdFx0cmV0dXJuIGk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiAtMTtcclxuXHR9XHJcblxyXG4gICAgLyoqXHJcblx0ICogY3JlYXRlcyB0aGUgdHJlZSBncmlkXHJcblx0ICpcclxuXHQgKiBAbWVtYmVyb2YgVHJlZUdyaWRXaWRnZXRCYXNlXHJcblx0ICovXHJcbiAgICBjcmVhdGVMYXlvdXQoKSB7XHJcblx0XHRcclxuXHRcdHRoaXMuY3JlYXRlQ29sdW1uVGVtcGxhdGVzKCk7XHJcblxyXG5cdFx0dGhpcy5jcmVhdGVUcmVlR3JpZCgpO1xyXG5cdFxyXG5cdFx0aWYodGhpcy5oaWRlU29tZVRhYmxlSGVhZGVyUGFydHMoKSA9PSB0cnVlKXtcclxuXHRcdFx0Ly8gSGlkZSBzb21lIGhlYWRlciBwYXJ0cyBvZiB0cmVlZ3JpZFxyXG5cdFx0XHR0aGlzLmhpZGVUYWJsZUhlYWRlcigpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSBlaiB0cmVlIGdyaWQgb2JqZWN0XHJcblx0ICpcclxuXHQgKiBAcmV0dXJucyB7ZWouVHJlZUdyaWR9XHJcblx0ICogQG1lbWJlcm9mIFRyZWVHcmlkV2lkZ2V0QmFzZVxyXG5cdCAqL1xyXG5cdHByb3RlY3RlZCBnZXRUcmVlR3JpZE9iamVjdCgpOiBlai5UcmVlR3JpZHtcclxuXHRcdHJldHVybiAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKS5kYXRhKFwiZWpUcmVlR3JpZFwiKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIHRyZWUgcmVjb3JkIGZvciB0aGUgZ2l2ZW4gZWxlbWVudFxyXG5cdCAqXHJcblx0ICogQHByb3RlY3RlZFxyXG5cdCAqIEBwYXJhbSB7Kn0gZWxlbWVudFxyXG5cdCAqIEByZXR1cm5zIHthbnl9XHJcblx0ICogQG1lbWJlcm9mIFRyZWVHcmlkV2lkZ2V0QmFzZVxyXG5cdCAqL1xyXG5cdHByb3RlY3RlZCBnZXRUcmVlUmVjb3JkKGVsZW1lbnQpOiBhbnl7XHJcbiAgICAgICAgbGV0IHRyZWVncmlkT2JqID0gdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpO1xyXG4gICAgICAgIGxldCB0ciA9IGVsZW1lbnQuY2xvc2VzdChcInRyXCIpOyAgXHJcbiAgICAgICAgaWYodHIgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0bGV0IGluZGV4ID0gdHIucm93SW5kZXg7XHJcblx0XHRcdGlmKCg8YW55PnRyZWVncmlkT2JqLm1vZGVsKS5jdXJyZW50Vmlld0RhdGEgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0XHRyZXR1cm4gKDxhbnk+dHJlZWdyaWRPYmoubW9kZWwpLmN1cnJlbnRWaWV3RGF0YVtpbmRleF07XHJcblx0XHRcdH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0IHRoZSBmb2N1cyB0byB0aGUgY3VycmVudCB0cmVlIGdyaWRcclxuXHQgKlxyXG5cdCAqIEBtZW1iZXJvZiBUcmVlR3JpZFdpZGdldEJhc2VcclxuXHQgKi9cclxuXHRmb2N1cygpe1xyXG5cdFx0Ly8gVE9ETzogTm8gcHVibGljIGZvY3VzIG1ldGhvZCBhdmFpbGFibGUgZm9yIHRyZWUgZ3JpZCwgYnV0IG5lZWRlZCBmb3IgZm9yY2luZyB0aGUgZm9jdXMgdG8gdGhlIHRyZWUgZ3JpZCBpZiBkcmFnZ2FibGUgaXMgdXNlZCBpbiBhIHRyZWUgZ3JpZFxyXG5cdFx0Ly8gKGluIGNhc2Ugb2YgZHJhZ2dhYmxlIHRyZWUgZ3JpZCB3aWxsIG5vdCBiZSBmb2N1c2VkIGJlY2F1c2Ugbm90IHRoZSB0cmVlZ3JpZCByb3cgd2lsbCBiZSBzZWxlY3RlZCBvbiBhIGNsaWNrLCBidXQgdGhlIGRpcmVjdGx5IGRpdiB3aWxsIGJ5IHNlbGVjdGVkID0+IHN2ZyBvciBvdGhlciBkaXYpXHJcblx0XHQoPGFueT50aGlzLmdldFRyZWVHcmlkT2JqZWN0KCkpLl9mb2N1c1RyZWVHcmlkRWxlbWVudCgpO1xyXG5cdH1cclxuXHRcclxuXHJcblx0LyoqXHJcblx0ICogSW5pdGlhbGl6ZXMgbG9jYWxlIHJlc291cmNlc1xyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAbWVtYmVyb2YgVHJlZUdyaWRXaWRnZXRCYXNlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBpbml0aWFsaXplTG9jYWxlcygpIHtcclxuXHRcdC8vIGdldCB0aGUgbG9jYWxlcyBmb3IgdGhlIHRyZWVncmlkXHJcblx0XHRsZXQgbG9jID0gZWouVHJlZUdyaWQuTG9jYWxlO1xyXG5cclxuXHRcdC8vIHNob3cgYW4gZW1wdHkgc3RyaW5nIGlmIG5vIHJlY29yZHMgYXJlIGF2YWlsYWJsZVxyXG5cdFx0bG9jLmRlZmF1bHQuZW1wdHlSZWNvcmQgPSBcIlwiO1xyXG5cdH1cclxuXHRcclxuXHRwcml2YXRlIGZpbGxTcGFjZVdpdGhEeW5hbWljQ29sdW1uKHRyZWVncmlkV2lkdGg6IG51bWJlcil7XHJcblx0XHRpZih0aGlzLl9jb2x1bW5JbmRleEZvckR5bmFtaWNTaXplID09IC0xKXtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5maWxsU3BhY2VXaXRoQ29sdW1uKHRoaXMuX2NvbHVtbkluZGV4Rm9yRHluYW1pY1NpemUsIHRyZWVncmlkV2lkdGgpXHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGZpbGxTcGFjZVdpdGhDb2x1bW4oZmlsbFNwYWNlQ29sdW1uSW5kZXg6IG51bWJlciwgdHJlZWdyaWRXaWR0aDogbnVtYmVyKXtcclxuXHRcdHZhciB0cmVlT2JqID0gdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpO1xyXG5cdFx0aWYoIXRyZWVPYmope1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIGNvbHVtbnMgPSB0cmVlT2JqLm9wdGlvbihcImNvbHVtbnNcIik7IFxyXG5cdFx0aWYoIWNvbHVtbnMpe1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IG5ld0NvbHVtbldpZHRoID0gdGhpcy5nZXROZXdDb2x1bW5XaWR0aCh0cmVlZ3JpZFdpZHRoLCBjb2x1bW5zLCBmaWxsU3BhY2VDb2x1bW5JbmRleCk7XHJcbiAgICAgICAgaWYobmV3Q29sdW1uV2lkdGggPiB0aGlzLl9taW5Db2x1bW5XaWR0aEZvckR5bmFtaWNDb2x1bW4pe1xyXG4gICAgICAgICAgICBjb2x1bW5zW2ZpbGxTcGFjZUNvbHVtbkluZGV4XS53aWR0aCA9IG5ld0NvbHVtbldpZHRoLTM7IC8vLTMgdG8gYXZvaWQgc2Nyb2xsYmFyXHJcblx0XHRcdGNvbHVtbnNbZmlsbFNwYWNlQ29sdW1uSW5kZXhdLndpZHRoIC09IHRoaXMuZ2V0U2Nyb2xsQmFyV2lkdGgoKTsgICAvLyByZW1vdmUgc2Nyb2xsYmFyIHNpemVcclxuXHRcdFx0dHJlZU9iai5vcHRpb24oXCJjb2x1bW5zXCIsIGNvbHVtbnMsIHRydWUpOyBcclxuXHRcdFx0XHJcblx0XHRcdGlmKHRoaXMuaGlkZVNvbWVUYWJsZUhlYWRlclBhcnRzKCkgPT0gdHJ1ZSl7XHJcblx0XHRcdFx0Ly8gQWZ0ZXIgc2V0dGluZyB0aGUgdHJlZWdyaWQgY282bHVtbiBzaXplcywgdGhlIGhlYWRlciBwYXJ0cyB3aWxsIGJlIHNob3duID0+IGhpZGUgaGVhZGVyIHBhcnRzIGlmIG5vdCBuZWVkZWRcclxuXHRcdFx0XHR0aGlzLmhpZGVUYWJsZUhlYWRlcigpOyBcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHVibGljIHNldENvbHVtbldpZHRoKGluZGV4OiBudW1iZXIsIHdpZHRoOiBudW1iZXIpe1xyXG5cdFx0dmFyIHRyZWVPYmogPSB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCk7XHJcblx0XHRpZighdHJlZU9iail7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgY29sdW1ucyA9IHRyZWVPYmoub3B0aW9uKFwiY29sdW1uc1wiKTsgXHJcblx0XHRpZighY29sdW1ucyl7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0Y29sdW1uc1tpbmRleF0ud2lkdGggPSB3aWR0aDtcclxuXHRcdHRyZWVPYmoub3B0aW9uKFwiY29sdW1uc1wiLCBjb2x1bW5zLCB0cnVlKTsgXHJcblxyXG5cdFx0dGhpcy5maWxsU3BhY2VXaXRoQ29sdW1uKHRoaXMuX2NvbHVtbkluZGV4Rm9yRHluYW1pY1NpemUsIHRoaXMuX2FjdHVhbFdpZHRoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdHJ1ZSBpZiBzb21lIHBhcnRzIG9mIHRoZSB0YWJsZSBoZWFkZXIgc2hvdWxkIGJlIGhpZGRlbihlLmcuIGNvbHVtbiBoZWFkZXIsIGZpbHRlcmJhciwgLi4uKVxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuXHQgKiBAbWVtYmVyb2YgVHJlZUdyaWRXaWRnZXRCYXNlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBoaWRlU29tZVRhYmxlSGVhZGVyUGFydHMoKTogYm9vbGVhbntcclxuXHRcdGlmKHRoaXMuX2hpZGVDb2x1bW5IZWFkZXIgPT0gdHJ1ZSl7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0aWYodGhpcy5faGlkZUhlYWRlckZpbHRlckJhciA9PSB0cnVlKXtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGdldFNjcm9sbEJhcldpZHRoKCk6IG51bWJlcntcclxuXHRcdHZhciB2aWV3RGl2ID0gJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCArIFwiZS1ncmlkY29udGVudFwiKTtcclxuXHRcdGZvcihsZXQgY2hpbGRJbmRleD0wOyBjaGlsZEluZGV4IDwgdmlld0RpdlswXS5jaGlsZHJlbi5sZW5ndGg7IGNoaWxkSW5kZXgrKyl7XHJcblx0XHRcdGxldCBjaGlsZCA9IHZpZXdEaXZbMF0uY2hpbGRyZW5bY2hpbGRJbmRleF07XHJcblx0XHRcdGlmKGNoaWxkLmNsYXNzTGlzdC5jb250YWlucyhcImUtdnNjcm9sbGJhclwiKSA9PSB0cnVlKXtcclxuXHRcdFx0XHRyZXR1cm4gY2hpbGQuY2xpZW50V2lkdGg7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiAwO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBnZXROZXdDb2x1bW5XaWR0aCh0cmVlZ3JpZFdpZHRoLCBjb2x1bW5zLCBmaWxsU3BhY2VDb2x1bW5JbmRleCk6IG51bWJlcntcclxuXHRcdGxldCBuZXdDb2x1bW5XaWR0aCA9IHRyZWVncmlkV2lkdGg7XHJcblx0XHRmb3IobGV0IGNvbHVtbkluZGV4PTA7IGNvbHVtbkluZGV4IDwgY29sdW1ucy5sZW5ndGg7IGNvbHVtbkluZGV4Kyspe1xyXG4gICAgICAgICAgICBpZihjb2x1bW5JbmRleCAhPSBmaWxsU3BhY2VDb2x1bW5JbmRleCl7XHJcblx0XHRcdFx0aWYoY29sdW1uc1tjb2x1bW5JbmRleF0gIT0gdW5kZWZpbmVkICYmIGNvbHVtbnNbY29sdW1uSW5kZXhdLnZpc2libGUgPT0gdHJ1ZSl7XHJcblx0XHRcdFx0XHRuZXdDb2x1bW5XaWR0aCAtPSBjb2x1bW5zW2NvbHVtbkluZGV4XS53aWR0aDtcclxuXHRcdFx0XHR9XHJcbiAgICAgICAgICAgIH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBuZXdDb2x1bW5XaWR0aDtcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0ICogSGlkZXMgdGhlIHRhYmxlIGhlYWRlciBwYXJ0cyB3aGljaCBhcmUgY3VycmVudGx5IGRlZmluZWQgdG8gYmUgaGlkZGVuKGUuZy4gX2hpZGVDb2x1bW5IZWFkZXIsIF9oaWRlSGVhZGVyRmlsdGVyQmFyLCAuLi4pXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBtZW1iZXJvZiBUcmVlR3JpZFdpZGdldEJhc2VcclxuXHQgKi9cclxuXHRwcml2YXRlIGhpZGVUYWJsZUhlYWRlcigpe1xyXG5cdFx0dmFyICR0cmVlR3JpZEhlYWRlciA9ICQoXCIjXCIgKyB0aGlzLl9tYWluQ29udGFpbmVySWQgKyBcImUtZ3JpZGhlYWRlclwiKTtcclxuXHRcdGxldCB0YWJsZUhlYWRlciA9ICR0cmVlR3JpZEhlYWRlclswXS5jaGlsZHJlblswXS5jaGlsZHJlblswXTtcclxuXHRcdGlmKHRhYmxlSGVhZGVyICE9IHVuZGVmaW5lZCl7XHJcblx0XHRcdGxldCBjb2x1bW5IZWFkZXIgPSAoPGFueT50YWJsZUhlYWRlcikucm93c1swXTtcclxuXHRcdFx0bGV0IGZpbHRlckJhciA9ICg8YW55PnRhYmxlSGVhZGVyKS5yb3dzWzFdO1xyXG5cdFx0XHRpZihjb2x1bW5IZWFkZXIgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0XHRpZih0aGlzLl9oaWRlQ29sdW1uSGVhZGVyID09IHRydWUpe1xyXG5cdFx0XHRcdFx0Ly8gaGlkZSBjb2x1bW4gaGVhZGVyXHJcblx0XHRcdFx0XHRjb2x1bW5IZWFkZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRpZihmaWx0ZXJCYXIgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0XHRpZih0aGlzLl9oaWRlSGVhZGVyRmlsdGVyQmFyID09IHRydWUpe1xyXG5cdFx0XHRcdFx0Ly8gaGlkZSBmaWx0ZXJiYXJcclxuXHRcdFx0XHRcdGZpbHRlckJhci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTYXZlIHRyZWUgZ3JpZCBzZXR0aW5nc1xyXG5cdCAqXHJcblx0ICogQHByb3RlY3RlZFxyXG5cdCAqIEBtZW1iZXJvZiBUcmVlR3JpZFdpZGdldEJhc2VcclxuXHQgKi9cclxuXHRwcm90ZWN0ZWQgc2F2ZVRyZWVHcmlkU2V0dGluZ3MoKSB7XHJcblx0XHRpZiAodGhpcy5jb21wb25lbnQuZ2V0UGVyc2lzdGVuY3koKSkge1xyXG5cdFx0XHR0aGlzLnVwZGF0ZXNjcm9sbGJhcnNPYnNlcnZhdGlvbigpO1xyXG5cdFx0XHR0aGlzLnNhdmVTZXR0aW5ncygpO1xyXG5cdFx0fVxyXG4gICAgfVxyXG5cclxuXHQvKipcclxuXHQgKiBVcGRhdGVzIHNjcm9sbGJhciBvYnNlcnZhdGlvbiBmb3IgYm90aCBzY3JvbGxiYXJzXHJcblx0ICpcclxuIFx0ICogQHByb3RlY3RlZFxyXG5cdCAqIEBtZW1iZXJvZiBUcmVlR3JpZFdpZGdldEJhc2VcclxuXHQgKi9cclxuXHRwcml2YXRlIHVwZGF0ZXNjcm9sbGJhcnNPYnNlcnZhdGlvbigpe1xyXG5cdFx0dmFyIHZlcnRpY2FsU2Nyb2xsYmFyID0gdGhpcy5nZXRWZXJ0aWNhbFNjcm9sbGJhcigpO1xyXG5cdFx0dmFyIGhvcml6b250YWxTY3JvbGxiYXIgPSB0aGlzLmdldEhvcml6b250YWxTY3JvbGxiYXIoKTtcclxuXHJcblx0XHR0aGlzLnVwZGF0ZVNjcm9sbGJhck9ic2VydmF0aW9uKHZlcnRpY2FsU2Nyb2xsYmFyLCB0aGlzLl92ZXJ0aWNhbFNjcm9sbGJhck9ic2VydmVyKTtcclxuXHRcdHRoaXMudXBkYXRlU2Nyb2xsYmFyT2JzZXJ2YXRpb24oaG9yaXpvbnRhbFNjcm9sbGJhciwgdGhpcy5faG9yaXpvbnRhbFNjcm9sbGJhck9ic2VydmVyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE9ic2VydmUgc2Nyb2xsYmFyLCB1bm9ic2VydmUgc2Nyb2xsYmFyIG9yIGRvbid0IGRvIGFueXRoaW5nLlxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0geyhIVE1MRWxlbWVudCB8IHVuZGVmaW5lZCl9IGVsZW1lbnRcclxuXHQgKiBAcGFyYW0geyhNdXRhdGlvbk9ic2VydmVyIHwgdW5kZWZpbmVkKX0gb2JzZXJ2ZXJcclxuXHQgKiBAbWVtYmVyb2YgVHJlZUdyaWRXaWRnZXRCYXNlXHJcblx0ICovXHJcblx0cHJpdmF0ZSB1cGRhdGVTY3JvbGxiYXJPYnNlcnZhdGlvbihlbGVtZW50OiBIVE1MRWxlbWVudCB8IHVuZGVmaW5lZCwgb2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXIgfCB1bmRlZmluZWQpIHtcclxuXHRcdGlmIChlbGVtZW50ICE9PSB1bmRlZmluZWQgJiYgb2JzZXJ2ZXIgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHR0aGlzLm9ic2VydmVTY3JvbGxiYXIoZWxlbWVudCwgb2JzZXJ2ZXIpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAoZWxlbWVudCA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHRoaXMudW5vYnNlcnZlU2Nyb2xsYmFyKG9ic2VydmVyKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldCBlbGVtZW50IG9mIHZlcnRpY2FsIHNjcm9sbGJhclxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcmV0dXJucyB7KEhUTUxFbGVtZW50IHwgdW5kZWZpbmVkKX1cclxuXHQgKiBAbWVtYmVyb2YgVHJlZUdyaWRXaWRnZXRCYXNlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBnZXRWZXJ0aWNhbFNjcm9sbGJhcigpOiBIVE1MRWxlbWVudCB8IHVuZGVmaW5lZCB7XHJcblx0XHR2YXIgc2Nyb2xsYmFyRWxlbWVudCA9ICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpLmZpbmQoJy5lLXZzY3JvbGxiYXInKVxyXG5cdFx0aWYgKHNjcm9sbGJhckVsZW1lbnQubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRyZXR1cm4gc2Nyb2xsYmFyRWxlbWVudC5maW5kKCcuZS12aGFuZGxlJylbMF07XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2V0IGVsZW1lbnQgb2YgaG9yaXpvbnRhbCBzY3JvbGxiYXJcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHJldHVybnMgeyhIVE1MRWxlbWVudCB8IHVuZGVmaW5lZCl9XHJcblx0ICogQG1lbWJlcm9mIFRyZWVHcmlkV2lkZ2V0QmFzZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZ2V0SG9yaXpvbnRhbFNjcm9sbGJhcigpOiBIVE1MRWxlbWVudCB8IHVuZGVmaW5lZCB7XHJcblx0XHR2YXIgc2Nyb2xsYmFyRWxlbWVudCA9ICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpLmZpbmQoJy5lLWhzY3JvbGxiYXInKVxyXG5cdFx0aWYgKHNjcm9sbGJhckVsZW1lbnQubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRyZXR1cm4gc2Nyb2xsYmFyRWxlbWVudC5maW5kKCcuZS1oaGFuZGxlJylbMF07XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogT2JzZXJ2ZSBzY3JvbGxiYXIgZm9yIGNoYW5nZXNcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gdGFyZ2V0XHJcblx0ICogQHBhcmFtIHsoTXV0YXRpb25PYnNlcnZlciB8IHVuZGVmaW5lZCl9IG9ic2VydmVyXHJcblx0ICogQG1lbWJlcm9mIFRyZWVHcmlkV2lkZ2V0QmFzZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgb2JzZXJ2ZVNjcm9sbGJhcih0YXJnZXQ6IEhUTUxFbGVtZW50LCBvYnNlcnZlcjogTXV0YXRpb25PYnNlcnZlciB8IHVuZGVmaW5lZCApIHtcclxuXHRcdHZhciB3aWRnZXQgPSB0aGlzO1xyXG5cdFx0b2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbihtdXRhdGlvbnMpIHtcclxuICAgICAgICAgICAgbXV0YXRpb25zLmZvckVhY2goZnVuY3Rpb24obXV0YXRpb25SZWNvcmQpIHtcclxuXHRcdFx0XHRsZXQgc2Nyb2xsU2V0dGluZ3M6IElTY3JvbGxTZXR0aW5ncyA9IHdpZGdldC5nZXRDb21wb25lbnRTZXR0aW5ncyh0cnVlKS5kYXRhLnNjcm9sbGJhcnM7XHJcblx0XHRcdFx0aWYgKHNjcm9sbFNldHRpbmdzLmhvcml6b250YWwgIT0gd2lkZ2V0Ll9wcmV2aW91c1Njcm9sbFNldHRpbmdzLmhvcml6b250YWwgfHwgc2Nyb2xsU2V0dGluZ3MudmVydGljYWwgIT0gd2lkZ2V0Ll9wcmV2aW91c1Njcm9sbFNldHRpbmdzLnZlcnRpY2FsKSB7XHJcblx0XHRcdFx0XHR3aWRnZXQuX3ByZXZpb3VzU2Nyb2xsU2V0dGluZ3MgPSBzY3JvbGxTZXR0aW5ncztcclxuXHRcdFx0XHRcdHdpZGdldC5zYXZlU2V0dGluZ3MoKTtcclxuXHRcdFx0XHR9XHJcbiAgICAgICAgICAgIH0pOyAgICBcclxuXHRcdH0pO1xyXG5cdFxyXG5cdFx0b2JzZXJ2ZXIub2JzZXJ2ZSh0YXJnZXQsIHsgYXR0cmlidXRlcyA6IHRydWV9KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFVub2JzZXJ2ZSBzY3JvbGxiYXJcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHsoTXV0YXRpb25PYnNlcnZlciB8IHVuZGVmaW5lZCl9IG9ic2VydmVyXHJcblx0ICogQG1lbWJlcm9mIFRyZWVHcmlkV2lkZ2V0QmFzZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgdW5vYnNlcnZlU2Nyb2xsYmFyKG9ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyIHwgdW5kZWZpbmVkKSB7XHJcblx0XHRpZiAob2JzZXJ2ZXIgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRvYnNlcnZlci5kaXNjb25uZWN0KCk7XHJcblx0XHRcdG9ic2VydmVyID0gdW5kZWZpbmVkO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBjb2x1bW4gdGVtcGxhdGVzIGZvciB0aGUgdHJlZSBncmlkIGFuZCBhZGRzIHRoZW0gdG8gdGhlIHdpZGdldCBjb250YWluZXJcclxuXHQgKlxyXG5cdCAqIEBwcm90ZWN0ZWRcclxuXHQgKiBAbWVtYmVyb2YgVHJlZUdyaWRXaWRnZXRCYXNlXHJcblx0ICovXHJcblx0cHJvdGVjdGVkIGNyZWF0ZUNvbHVtblRlbXBsYXRlcygpe1xyXG5cclxuXHR9XHJcblx0XHJcblx0cHJvdGVjdGVkIGFic3RyYWN0IGNyZWF0ZVRyZWVHcmlkKCk7XHJcbn1cclxuXHJcbmV4cG9ydCB7VHJlZUdyaWRXaWRnZXRCYXNlfTsiXX0=