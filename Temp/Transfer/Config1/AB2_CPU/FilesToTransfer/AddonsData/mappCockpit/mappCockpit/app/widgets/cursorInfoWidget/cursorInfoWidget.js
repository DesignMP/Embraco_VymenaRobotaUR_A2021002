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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
define(["require", "exports", "./interfaces/cursorInfoWidgetInterface", "../common/treeGridWidgetBase", "./view/cursorInfoTreeGridToolbar", "./model/cursorSignalsDataModel", "./model/ytCursorSignal", "./model/xyCursorSignal", "./model/fftCursorSignal", "./model/cursorInfo", "../common/states/cursorStates", "./model/dynamicCursorSignalTemplate", "./model/cursorSignal", "../../common/seriesHelper", "../../common/utilities/binSearch", "../common/states/chartViewToolbarStates", "../../models/chartManagerDataModel/seriesType"], function (require, exports, cursorInfoWidgetInterface_1, treeGridWidgetBase_1, cursorInfoTreeGridToolbar_1, cursorSignalsDataModel_1, ytCursorSignal_1, xyCursorSignal_1, fftCursorSignal_1, cursorInfo_1, cursorStates_1, dynamicCursorSignalTemplate_1, cursorSignal_1, seriesHelper_1, binSearch_1, chartViewToolbarStates_1, seriesType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // defines the base id for the cursor value template
    var CURSOR_VALUE_ID = "cursorValue_";
    /**
     * implements the CursorInfo Widget
     *
     * @class CursorInfoWidget
     * @extends {TreeGridWidgetBase}
     */
    var CursorInfoWidget = /** @class */ (function (_super) {
        __extends(CursorInfoWidget, _super);
        function CursorInfoWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._cursorSignalsDataModel = new cursorSignalsDataModel_1.CursorSignalsDataModel();
            _this._cursorInfoTemplateDataModel = new Array();
            _this._cursorSignalsDataModelChangedHandler = function (sender, args) { return _this.onCursorSignalsDataModelChanged(sender, args); };
            _this._filterModified = false;
            _this._cursorInfoSelectorIsActive = false;
            _this._columnId_Visible = "visible";
            _this._columnId_Name = "name";
            _this._columnId_Value = "value";
            _this._columnId_Description = "description";
            _this._columnId_IconDefinition = "iconDefinition";
            _this._indeterminateStateValue = "indeterminate";
            _this.cursorStatesId = "CursorStates";
            return _this;
        }
        /**  initialize the widget
         *
         * @param {string} layoutContainerId
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.initialize = function (layoutContainerId) {
            var _this = this;
            _super.prototype.initialize.call(this, layoutContainerId, 30);
            _super.prototype.setHeaderContent.call(this, "Cursors");
            // Set dynamic column settings
            _super.prototype.setDynamicColumn.call(this, 1, 80);
            _super.prototype.setHeaderFilterBarHidden.call(this);
            // Attach event
            this._cursorSignalsDataModel.eventModelChanged.attach(this._cursorSignalsDataModelChangedHandler);
            this.states.observe(cursorStates_1.CursorStates, function (modifiedState, oldState) {
                _this.updateInfoCursorsWithNewStateValues(modifiedState);
            }, this.cursorStatesId);
        };
        CursorInfoWidget.prototype.dispose = function () {
            // Detach events
            this._cursorSignalsDataModel.eventModelChanged.detach(this._cursorSignalsDataModelChangedHandler);
            _super.prototype.dispose.call(this);
        };
        /**
         * Creates the column templates for the tree grid and adds them to the widget container
         *
         * @protected
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.createColumnTemplates = function () {
            var $widgetContainer = $(this.cssParentContentId);
            $widgetContainer.append(this.getColumnTemplateData(this._columnId_Visible));
            $widgetContainer.append(this.getColumnTemplateData(this._columnId_Name));
        };
        /**
         * Returns the column template informations
         *
         * @private
         * @returns {string}
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.getColumnTemplateData = function (columnId) {
            if (columnId == this._columnId_Visible) {
                return "<script type=\"text/x-jsrender\" id=\"ciVisibleColumnTemplate\">\n                        <div style=\"margin-left:10px;\">{{if visible == \"true\" && !hasChildRecords}} <input class=\"customCheckbox\" type=\"checkbox\" checked=\"checked\" value=\"\" />{{else !hasChildRecords}} <input class=\"customCheckbox\" type=\"checkbox\" value=\"\" />{{/if}}</div>\n                        </script>";
            }
            else if (columnId == this._columnId_Name) {
                return "<script type=\"text/x-jsrender\" id=\"ciNameColumnTemplate\">\n                        <div style='height:20px;' unselectable='on'>\n                            {{if hasChildRecords}}\n                                <div class='intend' style='height:1px; float:left; width:{{:level*6}}px; display:inline-block;'></div>\n                            {{else !hasChildRecords}}\n                                <div class='intend' style='height:1px; float:left; width:{{:level*6}}px; display:inline-block;'></div>\n                            {{/if}}\n                            {{:#data['iconDefinition']}}\n                            <div class='e-cell' style='display:inline-block;width:100%' unselectable='on'>{{:#data['name']}}</div>\n                        </div>\n                    </script>";
            }
            return "";
        };
        /**
         * Creates the tree grid for the CursorInfos
         *
         * @protected
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.createTreeGrid = function () {
            var _this = this;
            $(this.cssParentContentId).ejTreeGrid(__assign(__assign(__assign(__assign(__assign({}, this.getTreeGridColumnDefinition()), this.getTreeGridColumnResizeSupport()), this.getTreeGridCellEditSupport()), this.getTreeGridToolbarSupport()), { dataSource: this._cursorSignalsDataModel.getCursorSignals(), childMapping: "cursorInfos", expandStateMapping: "expandState", isResponsive: true, treeColumnIndex: 1, allowFiltering: true, rowHeight: 28, 
                // Set init size to draw the toolbar icons at the right position
                sizeSettings: { height: '200px', width: '200px' }, selectionType: ej.TreeGrid.SelectionType.Multiple, expanded: function (args) { return _this.treeGridNodeExpandedOrCollapsed(); }, collapsed: function (args) { return _this.treeGridNodeExpandedOrCollapsed(); }, rowSelected: function (args) { return _this.treeGridRowSelected(args); }, create: function (args) { return _this.treeGridCreated(); }, actionBegin: function (args) { return _this.treeGridActionBegin(args); }, queryCellInfo: function (args) { return _this.queryCellInfo(args); } }));
        };
        CursorInfoWidget.prototype.treeGridNodeExpandedOrCollapsed = function () {
            // Refresh to see correct expanded/collapsed icon
            this.refresh();
        };
        CursorInfoWidget.prototype.queryCellInfo = function (args) {
            if (args.column.field == this._columnId_Visible) {
                if (args.cellValue == this._indeterminateStateValue) {
                    // Set indeterminate icons
                    $(args.cellElement.childNodes[1].childNodes[1]).prop(this._indeterminateStateValue, true);
                }
            }
        };
        /**
         * TreeGrid selected row has changed
         *
         * @private
         * @param {*} args
         * @returns
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.treeGridRowSelected = function (args) {
            if (args.model.selectedItems == undefined) {
                return;
            }
            if (this._cursorInfoSelectorIsActive == true) {
                // Saves the selected items for multiselection support in cursor info selector
                this._selectedCursorInfosOld = this._selectedCursorInfosNew;
                this._selectedCursorInfosNew = args.model.selectedItems;
            }
            else {
                this._selectedCursorSignals = this.getOnlyCursorSignals(args.model.selectedItems);
                this.setCursorInfoSelectorButtonState(this._selectedCursorSignals);
            }
        };
        /**
         * get all CursorSignals for the current selection(if CursorInfo is selected, get the parent CursorSignal)
         *
         * @private
         * @param {*} selectedItems
         * @returns {Array<CursorSignal>}
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.getOnlyCursorSignals = function (selectedItems) {
            var newList = new Array();
            for (var i = 0; i < selectedItems.length; i++) {
                if (selectedItems[i].item instanceof cursorSignal_1.CursorSignal) {
                    var index = newList.indexOf(selectedItems[i].item);
                    if (index == -1) { // Only add if not already in list
                        newList.push(selectedItems[i].item);
                    }
                }
                else if (selectedItems[i].item instanceof cursorInfo_1.CursorInfo) {
                    var index = newList.indexOf(selectedItems[i].parentItem.item);
                    if (index == -1) { // Only add if not already in list
                        newList.push(selectedItems[i].parentItem.item);
                    }
                }
            }
            return newList;
        };
        /**
         * Sets the cursor info selector button state (if one (or more) signal is selected the button is enabled)
         *
         * @private
         * @param {Array<CursorSignal>} selectedCursorSignals
         * @returns
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.setCursorInfoSelectorButtonState = function (selectedCursorSignals) {
            if (selectedCursorSignals == undefined) {
                // no items selected deactivate Filter button
                this._toolbar.disableCursorInfoSelectorButton(true);
                return;
            }
            if (selectedCursorSignals.length < 1) {
                // no items selected deactivate Filter button
                this._toolbar.disableCursorInfoSelectorButton(true);
            }
            else {
                this._toolbar.disableCursorInfoSelectorButton(false);
            }
        };
        /**
         * Returns the tree grid column definition
         *
         * @private
         * @returns {{}}
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.getTreeGridColumnDefinition = function () {
            // add check box state information
            var checkBoxStates = [
                { text: "Yes", value: "true" },
                { text: "No", value: "false" }
            ];
            // return the column definitions
            return {
                columns: [
                    { field: this._columnId_Visible, headerText: "Visible", visible: false, allowEditing: false, isTemplateColumn: true, templateID: "ciVisibleColumnTemplate", filterEditType: "dropdownedit", dropdownData: checkBoxStates, allowFilteringBlankContent: false, width: "55px" },
                    { field: this._columnId_Name, headerText: "Name", allowEditing: false, isTemplateColumn: true, templateID: "ciNameColumnTemplate" },
                    { field: this._columnId_Value, headerText: "Value", allowEditing: false, width: "140px", isTemplateColumn: true, template: "<div style='padding-left: 20px' id='" + this.parentContentId + CURSOR_VALUE_ID + "{{:uiId}}'></div>" },
                    { field: this._columnId_Description, headerText: "Description", visible: false, allowEditing: false, width: "140px" },
                    { field: this._columnId_IconDefinition, visible: false, width: "0px" },
                ],
            };
        };
        /**
         * Returns the tree grid column resize settings
         *
         * @private
         * @returns {{}}
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.getTreeGridColumnResizeSupport = function () {
            var _this = this;
            return {
                allowColumnResize: true,
                columnResizeSettings: { columnResizeMode: ej.TreeGrid.ColumnResizeMode.FixedColumns },
                columnResized: function (args) { return _this.treeGridColumnResized(args); },
            };
        };
        /**
         * Returns the tree grid cell edit settings
         *
         * @private
         * @returns {{}}
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.getTreeGridCellEditSupport = function () {
            return {
                editSettings: { allowEditing: true },
            };
        };
        /**
         * Returns the tree grid toolbar settings
         *
         * @private
         * @returns {{}}
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.getTreeGridToolbarSupport = function () {
            var _this = this;
            this._toolbar = new cursorInfoTreeGridToolbar_1.CursorInfoTreeGridToolbar(this.cssParentContentId);
            return {
                toolbarSettings: {
                    showToolbar: true,
                    customToolbarItems: this._toolbar.getCustomToolbars(),
                },
                toolbarClick: function (args) { return _this._toolbar.toolbarClick(args, _this); },
            };
        };
        /**
         * TreeGrid was created
         *
         * @private
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.treeGridCreated = function () {
            // Sets the custom toolbar icons
            this._toolbar.setStyleForToolbarIcons();
            this._toolbar.initToolbarStates();
            // Filter data on startup
            var treeObj = this.getTreeGridObject();
            treeObj.filterColumn(this._columnId_Visible, ej.FilterOperators.equal, "true", "and");
            this.attachToCheckBoxChangedEvent();
        };
        /**
         * Attach check box changed events
         *
         * @private
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.attachToCheckBoxChangedEvent = function () {
            var _this = this;
            $(this.cssParentContentId).on("change", ".customCheckbox", function (e) { return _this.checkBoxChanged(e); });
        };
        CursorInfoWidget.prototype.loadStyles = function () {
            _super.prototype.addStyle.call(this, "widgets/cursorInfoWidget/style/css/cursorInfoStyle.css");
        };
        /**
         * Occurs on check box changed events
         *
         * @private
         * @param {*} e
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.checkBoxChanged = function (e) {
            var filterDataSource = this._cursorInfoTemplateDataModel;
            e = e || window.event;
            var targetEle = e.target;
            var checkStatus = $(targetEle).is(':checked');
            // $(targetEle).prop('checked', true);
            var record = this.getTreeRecord(targetEle);
            if (record != undefined) {
                this._filterModified = true;
                if (checkStatus == false) {
                    record.item.visible = "false";
                    record["visible"] = "false";
                    this.setMultiSelectionCheckBoxes("false", record.index);
                }
                else {
                    record.item.visible = "true";
                    record["visible"] = "true";
                    this.setMultiSelectionCheckBoxes("true", record.index);
                }
                this.setModel(filterDataSource);
                // Set selection after setting checkbox because they are lost after setting a check box
                this.setSelectionInCursorInfoSelectorView(this._selectedCursorInfosOld);
                this.updateCheckBoxes();
            }
        };
        /**
         * If multi selection is active, set all selected items to the given state(checked/unchecked)
         *
         * @private
         * @param {string} state
         * @param {number} actualIndex
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.setMultiSelectionCheckBoxes = function (state, actualIndex) {
            var selectedCursorInfos = this._selectedCursorInfosOld;
            if (selectedCursorInfos != undefined) {
                // Set/Unset check boxes
                var indexWithinMultiSelection = false;
                for (var i = 0; i < selectedCursorInfos.length; i++) {
                    if (actualIndex == selectedCursorInfos[i].index) {
                        indexWithinMultiSelection = true;
                    }
                }
                ;
                if (indexWithinMultiSelection == true) {
                    selectedCursorInfos.forEach(function (cursorInfo) {
                        cursorInfo.item.visible = state;
                        cursorInfo["visible"] = state;
                    });
                }
                else {
                    // Only one checkbox was clicked => set selection to the new one
                    this._selectedCursorInfosOld = this._selectedCursorInfosNew;
                }
            }
        };
        CursorInfoWidget.prototype.treeGridActionBegin = function (args) {
            // Don't support "Entf/Del" key
            if (args.requestType == "delete") {
                args.cancel = true;
            }
        };
        /**
         * A treegrid column was resized
         *
         * @private
         * @param {*} args
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.treeGridColumnResized = function (args) {
            _super.prototype.resizeDynamicColumn.call(this, args.columnIndex, args.model);
            if (this._cursorInfoSelectorIsActive) {
                this.updateCheckBoxes();
            }
            // Refresh cursor info values after resize (treegrid sets the data to "0" after resize)
            this.refreshCursorValues(this._cursorSignalsDataModel.getCursorSignals());
        };
        /** resizes the cursor values widget
         *
         * @param {number} width
         * @param {number} height
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.resize = function (width, height) {
            _super.prototype.resize.call(this, width, height);
            if (this._cursorInfoSelectorIsActive) {
                this.updateCheckBoxes();
            }
            // Refresh cursor values after resize (treegrid sets the data to "0" after resize)
            this.refreshCursorValues(this._cursorSignalsDataModel.getCursorSignals());
            this._toolbar.resize(width);
        };
        /**
         * Shows the curser signals with the filtered/defined cursor informations
         *
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.showCursorSignalsView = function () {
            this._cursorInfoSelectorIsActive = false;
            this._selectedCursorInfosOld = undefined;
            this._selectedCursorInfosNew = undefined;
            // Update cursor info visibilities if something has changed
            if (this._filterModified == true) {
                this.setCursorInfoVisibilities(this._selectedCursorSignals, this._cursorInfoTemplateDataModel[0]);
            }
            // Show actual cursorInfo data
            this.refresh();
            // Sets the column visibilities
            var treeGridObject = _super.prototype.getTreeGridObject.call(this);
            this.setColumnVisiblities(treeGridObject, false);
            // Set the filter to hide visible == false cursor infos
            treeGridObject.filterColumn(this._columnId_Visible, ej.FilterOperators.equal, "true", "and");
            // set the selection to state before switching to the cursor info selector view
            this.setSelectionWithCursorSignals(treeGridObject, this._selectedCursorSignals);
            // Update the dynamic column size after hide/show of some columns
            this.resizeDynamicColumn(0, treeGridObject.model);
            // refresh the cursor info values
            this.refreshCursorValues(this._cursorSignalsDataModel.getCursorSignals());
        };
        /**
         * Shows the cursor info selector view
         *
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.showCursorInfoSelectorView = function () {
            this._cursorInfoSelectorIsActive = true;
            this._filterModified = false;
            // Reset cursor info template datamodel
            this._cursorInfoTemplateDataModel.splice(0, this._cursorInfoTemplateDataModel.length);
            // create a signal template based on the selected series
            var templateCursorSignal = new dynamicCursorSignalTemplate_1.DynamicCursorSignalTemplate(this._selectedCursorSignals);
            // add the signal template to the model
            this._cursorInfoTemplateDataModel.push(templateCursorSignal);
            // Set cursor info template visibilities
            this.updateTemplateVisibilities(this._selectedCursorSignals, templateCursorSignal);
            // show cursor info template datamodel (the possible cursor infos)
            this.updateDataSource(this._cursorInfoTemplateDataModel);
            // Sets the column visibilities
            var treeGridObject = _super.prototype.getTreeGridObject.call(this);
            this.setColumnVisiblities(treeGridObject, true);
            // Update the dynamic column size after hide/show of some columns
            this.resizeDynamicColumn(0, treeGridObject.model);
            // Removes the filter of the visibility flag which is needed in the cursor signal view
            treeGridObject.clearFilter(this._columnId_Visible);
            // Convert custom check boxes into syncfusion check boxes
            this.updateCheckBoxes();
        };
        /**
         * Sets the column visibilities for the cursor info selector view or the cursor signals view
         *
         * @private
         * @param {*} treeGridObject
         * @param {boolean} cursorInfoSelectorView
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.setColumnVisiblities = function (treeGridObject, cursorInfoSelectorView) {
            // get needed columns
            var visibleColumn = treeGridObject.getColumnByField(this._columnId_Visible);
            var descriptionColumn = treeGridObject.getColumnByField(this._columnId_Description);
            var valueColumn = treeGridObject.getColumnByField(this._columnId_Value);
            if (cursorInfoSelectorView == false) {
                // Hide visible column
                treeGridObject.hideColumn(visibleColumn.headerText);
                // Hide description column
                treeGridObject.hideColumn(descriptionColumn.headerText);
                // Show value column
                treeGridObject.showColumn(valueColumn.headerText);
            }
            else {
                // Show visible column
                treeGridObject.showColumn(visibleColumn.headerText);
                // Show description column
                treeGridObject.showColumn(descriptionColumn.headerText);
                // Hide value column
                treeGridObject.hideColumn(valueColumn.headerText);
            }
        };
        /**
         * Sets the selection to the given selection objects in cursor info selector view
         *
         * @private
         * @param {Array<any>} selectedObjects
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.setSelectionInCursorInfoSelectorView = function (selectedObjects) {
            if (selectedObjects === undefined) {
                return;
            }
            var treeGridObject = this.getTreeGridObject();
            treeGridObject.clearSelection();
            if (selectedObjects.length !== undefined) {
                for (var i = 0; i < selectedObjects.length; i++) {
                    treeGridObject._multiSelectCtrlRequest = true;
                    var visibleIndex = 0;
                    for (var j = 0; j < treeGridObject.model.flatRecords.length; j++) {
                        if (treeGridObject.model.flatRecords[j].id == selectedObjects[i].id) {
                            treeGridObject.selectRows(visibleIndex);
                        }
                        visibleIndex++;
                    }
                }
            }
            else {
                treeGridObject.selectRows(selectedObjects.index);
            }
            // Set actual selection for later use 
            this._selectedCursorInfosOld = selectedObjects;
            this._selectedCursorInfosNew = selectedObjects;
        };
        ;
        /**
         * Sets the selection to the given cursor signals
         *
         * @private
         * @param {*} treeGridObject
         * @param {Array<CursorSignal>} cursorSignals
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.setSelectionWithCursorSignals = function (treeGridObject, cursorSignals) {
            // deselect all selections in cursor signals view
            treeGridObject.clearSelection();
            if (cursorSignals == undefined) {
                return;
            }
            for (var i = 0; i < cursorSignals.length; i++) {
                treeGridObject._multiSelectCtrlRequest = true;
                var visibleIndex = 0;
                for (var j = 0; j < treeGridObject.model.flatRecords.length; j++) {
                    if (treeGridObject.model.flatRecords[j].item == cursorSignals[i]) {
                        treeGridObject.selectRows(visibleIndex);
                    }
                    if (treeGridObject.model.flatRecords[j].visible != "false") {
                        visibleIndex++;
                    }
                }
            }
        };
        ;
        /**
         * Sets the visible flags in the template cursor signal to the informations from the cursor signals
         * (e.g. all signals show y1 cursor info so therefore template cursor info visibility is set to "true";
         *       all signals dosn't show y1 cursor info so therefore template cursor info visibility is set to "false";
         *       some signals show y1 cursor info so therefore template cursor info visibility is set to "indeterminate";
         * )
         *
         * @private
         * @param {Array<CursorSignal>} cursorSignals
         * @param {DynamicCursorSignalTemplate} templateCursorSignal
         * @returns
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.updateTemplateVisibilities = function (cursorSignals, templateCursorSignal) {
            var _this = this;
            if (templateCursorSignal && templateCursorSignal.cursorInfos) {
                // for all available merged cursor infos
                templateCursorSignal.cursorInfos.forEach(function (templateCursorSignalInfo) {
                    // clear existing visibility
                    templateCursorSignalInfo.visible = "";
                    // get the cursor infos by id
                    var matchingCursorInfos = _this.retrievCursorInfosById(cursorSignals, templateCursorSignalInfo.id);
                    // for all selected cursor signals with matching id ...
                    matchingCursorInfos.forEach(function (cursorSignalInfo) {
                        // if the visibility is yet undefined ..
                        if (!templateCursorSignalInfo.visible) {
                            // initialize the visibility with the first cursor signal infos value.
                            templateCursorSignalInfo.visible = cursorSignalInfo.visible;
                        }
                        else {
                            // set visibility to undetermined if one of the following values is different
                            if (cursorSignalInfo.visible !== templateCursorSignalInfo.visible) {
                                templateCursorSignalInfo.visible = _this._indeterminateStateValue;
                            }
                        }
                    });
                });
            }
        };
        /**
         * Sets the visibility defined in the template cursor signal to the cursor signals
         *
         * @private
         * @param {Array<CursorSignal>} cursorSignals
         * @param {DynamicCursorSignalTemplate} templateCursorSignal
         * @returns
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.setCursorInfoVisibilities = function (cursorSignals, templateCursorSignal) {
            var _this = this;
            if (templateCursorSignal && templateCursorSignal.cursorInfos) {
                // for all available merged cursor infos
                templateCursorSignal.cursorInfos.forEach(function (templateCursorSignalInfo) {
                    if (templateCursorSignalInfo.visible !== _this._indeterminateStateValue) {
                        // get the cursor infos by id
                        var matchingCursorInfos = _this.retrievCursorInfosById(cursorSignals, templateCursorSignalInfo.id);
                        // for all selected cursor infos with matching id ...
                        matchingCursorInfos.forEach(function (cursorSignalInfo) {
                            // set the cursor signals visibility from the template value if a valid state is defined
                            cursorSignalInfo.visible = templateCursorSignalInfo.visible;
                        });
                    }
                });
            }
        };
        /**
         * gets the cursor infos with the specified id
         *
         * @private
         * @param {Array<CursorSignal>} cursorSignals
         * @param {string} cursorInfoId
         * @returns {Array<CursorInfo>}
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.retrievCursorInfosById = function (cursorSignals, cursorInfoId) {
            var matchingCursorInfos = [];
            cursorSignals.forEach(function (cursorSignal) {
                cursorSignal.cursorInfos.forEach(function (cursorSignalInfo) {
                    if (cursorSignalInfo.id === cursorInfoId) {
                        matchingCursorInfos.push(cursorSignalInfo);
                    }
                });
            });
            return matchingCursorInfos;
        };
        /**
         * Raises the move cursor event
         *
         * @param {number} cursorIndex
         * @param {CursorMovement} movement
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.onMoveCursor = function (cursorIndex, movement) {
            var data = [];
            var cursorsStore = this.states.read(cursorStates_1.CursorStates, this.cursorStatesId);
            var x = cursorsStore.getPosition(cursorIndex, cursorsStore.getLastCursorTypeSelected());
            var cursors = this._cursorSignalsDataModel.getCursorSignals();
            cursors.forEach(function (cursor) {
                data.push(cursor.serie);
            });
            if (x != undefined) {
                this.moveCursor(cursorIndex, movement, data, x);
            }
        };
        /**
         * moves the cursor for the specified direction and offset
         *
         * @private
         * @param {number} cursorIndex
         * @param {CursorMovement} cursorMovement
         * @param {BaseSeries[]} series
         * @param {number} cursorPosition
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.moveCursor = function (cursorIndex, cursorMovement, series, cursorPosition) {
            var cursorsStates = this.states.read(cursorStates_1.CursorStates, this.cursorStatesId);
            var cursorType = cursorsStates.getLastCursorTypeSelected();
            // get the next possible cursor timestamp
            var nearestTimestamp = this.findNearestTimestampInSeries(series, cursorPosition, cursorMovement, cursorType);
            // update the cursors timestamp location
            this.updateCursorLocation(cursorIndex, nearestTimestamp);
        };
        /**
         * searches the next timestamp in all available series. The picked value takes the movement direction intoi account.
         *
         * @private
         * @param {BaseSeries[]} series
         * @param {number} cursorTimeStamp
         * @param {CursorMovement} cursorMovement
         * @returns {number}
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.findNearestTimestampInSeries = function (series, cursorTimeStamp, cursorMovement, cursorType) {
            // retrieve the timestamps series from the signal series
            var timestampSeries = series.map(function (singleSeries) {
                if (singleSeries.cursorType == cursorType) {
                    return singleSeries.timestamps;
                }
                else {
                    return [];
                }
            });
            var nextNearestTimeStamp = cursorTimeStamp;
            // dpendiung on movement direction we pick the next possible time stamp
            switch (cursorMovement) {
                case cursorInfoWidgetInterface_1.CursorMovement.Right:
                    nextNearestTimeStamp = seriesHelper_1.SeriesHelper.findNearestValueFromCollection(cursorTimeStamp, timestampSeries, binSearch_1.BinSearchMode.NEXTUPPER);
                    break;
                case cursorInfoWidgetInterface_1.CursorMovement.Left:
                    nextNearestTimeStamp = seriesHelper_1.SeriesHelper.findNearestValueFromCollection(cursorTimeStamp, timestampSeries, binSearch_1.BinSearchMode.PREVIOUSLOWER);
                    break;
            }
            return nextNearestTimeStamp;
        };
        /**
         * Handle cursor activation/selection
         *
         * @param {number} cursorIndex
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.onReferenceCursorSelected = function (cursorIndex) {
            // update the cursor selection state
            var cursorStates = this.states.read(cursorStates_1.CursorStates, this.cursorStatesId);
            cursorStates.setSelected(cursorIndex, true);
            this.states.update(cursorStates_1.CursorStates, cursorStates, this.cursorStatesId);
            // set the cursors as active tool
            var toolstate = this.states.read(chartViewToolbarStates_1.ChartViewToolState, "ChartViewToolState");
            toolstate.selectedTool = chartViewToolbarStates_1.ChartViewToolStateEnum.CURSORS;
            this.states.update(chartViewToolbarStates_1.ChartViewToolState, toolstate, "ChartViewToolState");
        };
        /**
         * Adds a signal to the cursor info widget
         *
         * @param {Array<BaseSeries>} series
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.addSeries = function (series) {
            var cursorSignals = new Array();
            for (var i = 0; i < series.length; i++) {
                if (series[i].type === seriesType_1.SeriesType.timeSeries) {
                    cursorSignals.push(new ytCursorSignal_1.YTCursorSignal(series[i]));
                }
                else if (series[i].type === seriesType_1.SeriesType.xySeries) {
                    cursorSignals.push(new xyCursorSignal_1.XYCursorSignal(series[i]));
                }
                else if (series[i].type === seriesType_1.SeriesType.fftSeries) {
                    cursorSignals.push(new fftCursorSignal_1.FFTCursorSignal(series[i]));
                }
            }
            this._cursorSignalsDataModel.addSignal(cursorSignals);
        };
        /**
         * Remove a cursor signal from the cursor info widget
         *
         * @param {BaseSeries} serie
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.removeSerie = function (serie) {
            var cursorSignal = this._cursorSignalsDataModel.getCursorSignal(serie);
            if (cursorSignal) {
                this._cursorSignalsDataModel.removeSerie(cursorSignal);
                //Disables filter button if is active
                if (this._toolbar.cursorInfoSelectionIsActive) {
                    this._toolbar.cursorInfoSelectionIsActive = !this._toolbar.cursorInfoSelectionIsActive;
                    this._toolbar.activateCursorInfoSelectorView(this, this._toolbar.cursorInfoSelectionIsActive);
                }
                // Removes the cursor signal from the current selection list and updates the toolbar button
                if (this._selectedCursorSignals != undefined) {
                    var index = this._selectedCursorSignals.indexOf(cursorSignal);
                    if (index != -1) {
                        this._selectedCursorSignals.splice(index, 1);
                        this.setCursorInfoSelectorButtonState(this._selectedCursorSignals);
                    }
                }
            }
        };
        /**
         * changes and updates the cursor location of the selected cursor
         *
         * @param {number} cursorIndex
         * @param {number} cursorTimestamp
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.updateCursorLocation = function (cursorIndex, cursorTimestamp) {
            var cursorsStates = this.states.read(cursorStates_1.CursorStates, this.cursorStatesId);
            cursorsStates.setPosition(cursorIndex, cursorTimestamp);
            this.states.update(cursorStates_1.CursorStates, cursorsStates, this.cursorStatesId);
        };
        /**
         * refreshes the tree grids data
         *
         * @private
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.refresh = function () {
            // refresh tree grid only if cursor signal view is active (not in case of cursor info selector)
            if (!this._cursorInfoSelectorIsActive) {
                var cursorSignals = this._cursorSignalsDataModel.getCursorSignals();
                this.updateDataSource(cursorSignals);
                // set the selection to the select signal before
                var treeGridObject = this.getTreeGridObject();
                this.setSelectionWithCursorSignals(treeGridObject, this._selectedCursorSignals);
                // Update cursor info values 
                this.refreshCursorStates();
            }
        };
        /**
         * Trigger the update of the cursorInfos for the current cursor states
         *
         * @private
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.refreshCursorStates = function () {
            var _this = this;
            this.states.refresh(cursorStates_1.CursorStates, function (modifiedState, oldState) {
                _this.updateInfoCursorsWithNewStateValues(modifiedState);
            }, this.cursorStatesId);
        };
        CursorInfoWidget.prototype.updateDataSource = function (cursorSignals) {
            this.setCursorValueUiIds(cursorSignals);
            // Refresh TreeGrid with new datasource
            this.setModel(cursorSignals);
            // Refresh the cursor values after updating the model
            this.refreshCursorValues(cursorSignals);
        };
        /**
         * Defines and sets uids for every cursor value (cursor signals and cursor infos)
         *
         * @private
         * @param {Array<CursorSignal>} cursorSignals
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.setCursorValueUiIds = function (cursorSignals) {
            var cursorInfoId = 0;
            cursorSignals.forEach(function (cursorSignal) {
                cursorSignal.uiId = cursorInfoId++;
                cursorSignal.cursorInfos.forEach(function (cursorInfo) {
                    cursorInfo.uiId = cursorInfoId++;
                });
            });
        };
        /**
         * Refresh all cursor values
         *
         * @private
         * @param {Array<CursorSignal>} cursorSignals
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.refreshCursorValues = function (cursorSignals) {
            var _this = this;
            cursorSignals.forEach(function (cursorSignal) {
                _this.refreshCursorValueField(cursorSignal);
                cursorSignal.cursorInfos.forEach(function (cursorInfo) {
                    _this.refreshCursorValueField(cursorInfo);
                });
            });
        };
        /**
         * updates a cursor value field with the current values of the correspondig cursor signal or info
         *
         * @private
         * @param {CursorSignal|CursorInfo} cursorSignalOrInfo
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.refreshCursorValueField = function (cursorSignalOrInfo) {
            if (cursorSignalOrInfo) {
                // get the corresponding ui element
                var cursorValueElement = this.getCursorValueElement(cursorSignalOrInfo);
                var valueString = cursorSignalOrInfo.value.toString();
                if (cursorValueElement) {
                    cursorValueElement.innerText = valueString;
                }
            }
        };
        /**
         * Gets the corresponding cursor signal or info element
         *
         * @private
         * @param {CursorSignal|CursorInfo} cursorSignalOrInfo
         * @returns {(HTMLElement | null)}
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.getCursorValueElement = function (cursorSignalOrInfo) {
            return document.getElementById(this.parentContentId + CURSOR_VALUE_ID + cursorSignalOrInfo.uiId);
        };
        CursorInfoWidget.prototype.onCursorSignalsDataModelChanged = function (sender, args) {
            this.refresh();
        };
        /**
         * This method will update the cursor info widget with data from
         * the cursor state.
         *
         * @private
         * @param {CursorStates} modifiedState
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.updateInfoCursorsWithNewStateValues = function (modifiedState) {
            var _this = this;
            this._cursorSignalsDataModel.getCursorSignals().forEach(function (cursorSignal) {
                if (cursorSignal.serie.rawPointsValid) {
                    _this._cursorSignalsDataModel.updateCursorValues(cursorSignal, modifiedState.getPosition(0, cursorSignal.serie.cursorType), modifiedState.getPosition(1, cursorSignal.serie.cursorType));
                }
                else {
                    _this._cursorSignalsDataModel.clearCursorValues(cursorSignal);
                }
            });
            this._toolbar.updateButtonStates(modifiedState);
            this.refreshCursorValues(this._cursorSignalsDataModel.getCursorSignals());
        };
        /**
         * Convert custom check boxes into syncfusion check boxes
         *
         * @private
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.updateCheckBoxes = function () {
            var checkBoxes = $('.customCheckbox');
            for (var i = 0; i < checkBoxes.length; i++) {
                checkBoxes[i].id = 'customCheckbox' + (i + 1);
                this.creatSyncfusionCheckbox(checkBoxes[i]);
            }
        };
        /**
         * Instantiate syncfusion check box
         *
         * @private
         * @param {HTMLElement} customCheckbox
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.creatSyncfusionCheckbox = function (customCheckbox) {
            var _this = this;
            var enableTriState = false;
            var state = this.getCustomCheckboxState($(customCheckbox));
            if (state === 'indeterminate') {
                enableTriState = true;
            }
            $(customCheckbox).ejCheckBox({
                enableTriState: enableTriState,
                id: customCheckbox.id,
                checkState: state,
                change: function (args) { return _this.syncfusionCheckBoxChanged(args); },
            });
        };
        /**
         * Trigger check box change event
         *
         * @private
         * @param {*} args
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.syncfusionCheckBoxChanged = function (args) {
            if (args.model.enableTriState) {
                $('#' + args.model.id).ejCheckBox({ enableTriState: false });
            }
            this.setSelectedCursorsInfo(args);
            var customCheckbox = $('#' + args.model.id);
            customCheckbox.change();
        };
        /**
         * Set selected cursor info when checkbox is clicked
         *
         * @param {*} args
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.setSelectedCursorsInfo = function (args) {
            var treegrid = this.getTreeGridObject();
            var index = parseInt(args.model.id.split('customCheckbox')[1], 10);
            if (this._selectedCursorInfosOld == undefined) {
                this._selectedCursorInfosOld = treegrid.model.flatRecords[index];
            }
            else {
                this._selectedCursorInfosOld = this._selectedCursorInfosNew;
            }
            this._selectedCursorInfosNew = treegrid.model.flatRecords[index];
        };
        /**
         * get state of checkbox
         *
         * @private
         * @param {JQuery<HTMLElement>} checkbox
         * @returns {string}
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.getCustomCheckboxState = function (checkbox) {
            if (checkbox.is(':checked')) {
                return 'check';
            }
            else if (checkbox.is(':indeterminate')) {
                return 'indeterminate';
            }
            else {
                return 'uncheck';
            }
        };
        return CursorInfoWidget;
    }(treeGridWidgetBase_1.TreeGridWidgetBase));
    exports.CursorInfoWidget = CursorInfoWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3Vyc29ySW5mb1dpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jdXJzb3JJbmZvV2lkZ2V0L2N1cnNvckluZm9XaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBa0JBLG9EQUFvRDtJQUNwRCxJQUFNLGVBQWUsR0FBRyxjQUFjLENBQUM7SUFFdkM7Ozs7O09BS0c7SUFDSDtRQUErQixvQ0FBa0I7UUFBakQ7WUFBQSxxRUEraUNDO1lBOWlDVyw2QkFBdUIsR0FBMkIsSUFBSSwrQ0FBc0IsRUFBRSxDQUFDO1lBQy9FLGtDQUE0QixHQUF1QyxJQUFJLEtBQUssRUFBK0IsQ0FBQztZQUU1RywyQ0FBcUMsR0FBRyxVQUFDLE1BQU0sRUFBQyxJQUFJLElBQUcsT0FBQSxLQUFJLENBQUMsK0JBQStCLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxFQUFqRCxDQUFpRCxDQUFDO1lBR3pHLHFCQUFlLEdBQUcsS0FBSyxDQUFDO1lBR3hCLGlDQUEyQixHQUFHLEtBQUssQ0FBQztZQUkzQix1QkFBaUIsR0FBRyxTQUFTLENBQUM7WUFDOUIsb0JBQWMsR0FBRyxNQUFNLENBQUM7WUFDeEIscUJBQWUsR0FBRyxPQUFPLENBQUM7WUFDMUIsMkJBQXFCLEdBQUcsYUFBYSxDQUFDO1lBQ3RDLDhCQUF3QixHQUFHLGdCQUFnQixDQUFDO1lBRTVDLDhCQUF3QixHQUFHLGVBQWUsQ0FBQztZQUUzQyxvQkFBYyxHQUFHLGNBQWMsQ0FBQzs7UUF5aENyRCxDQUFDO1FBdmhDRzs7OztXQUlHO1FBQ0gscUNBQVUsR0FBVixVQUFXLGlCQUF5QjtZQUFwQyxpQkFjQztZQWJHLGlCQUFNLFVBQVUsWUFBQyxpQkFBaUIsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN4QyxpQkFBTSxnQkFBZ0IsWUFBQyxTQUFTLENBQUMsQ0FBQztZQUVsQyw4QkFBOEI7WUFDOUIs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LENBQUMsQ0FBQzthQUNwRTtpQkFDSTtnQkFDRCxJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDO2FBQy9EO1lBRUQsSUFBSSxDQUFDLHVCQUF1QixHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JFLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0ssaURBQXNCLEdBQTlCLFVBQStCLFFBQTZCO1lBQ3hELElBQUksUUFBUSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDekIsT0FBTyxPQUFPLENBQUM7YUFDbEI7aUJBQU0sSUFBSSxRQUFRLENBQUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7Z0JBQ3RDLE9BQU8sZUFBZSxDQUFDO2FBQzFCO2lCQUNJO2dCQUNELE9BQU8sU0FBUyxDQUFDO2FBQ3BCO1FBQ0wsQ0FBQztRQUNMLHVCQUFDO0lBQUQsQ0FBQyxBQS9pQ0QsQ0FBK0IsdUNBQWtCLEdBK2lDaEQ7SUFFUSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ3Vyc29ySW5mb1dpZGdldCxDdXJzb3JNb3ZlbWVudCB9IGZyb20gXCIuL2ludGVyZmFjZXMvY3Vyc29ySW5mb1dpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUcmVlR3JpZFdpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL3RyZWVHcmlkV2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBDdXJzb3JJbmZvVHJlZUdyaWRUb29sYmFyIH0gZnJvbSBcIi4vdmlldy9jdXJzb3JJbmZvVHJlZUdyaWRUb29sYmFyXCI7XHJcbmltcG9ydCB7IEN1cnNvclNpZ25hbHNEYXRhTW9kZWwgfSBmcm9tIFwiLi9tb2RlbC9jdXJzb3JTaWduYWxzRGF0YU1vZGVsXCI7XHJcbmltcG9ydCB7IFlUQ3Vyc29yU2lnbmFsIH0gZnJvbSBcIi4vbW9kZWwveXRDdXJzb3JTaWduYWxcIjtcclxuaW1wb3J0IHsgWFlDdXJzb3JTaWduYWwgfSBmcm9tIFwiLi9tb2RlbC94eUN1cnNvclNpZ25hbFwiO1xyXG5pbXBvcnQgeyBGRlRDdXJzb3JTaWduYWwgfSBmcm9tIFwiLi9tb2RlbC9mZnRDdXJzb3JTaWduYWxcIjtcclxuaW1wb3J0IHsgSVVpQmluZGluZyB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy93aWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ3Vyc29ySW5mbyB9IGZyb20gXCIuL21vZGVsL2N1cnNvckluZm9cIjtcclxuaW1wb3J0IHsgQmFzZVNlcmllcyB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2Jhc2VTZXJpZXNcIjtcclxuaW1wb3J0IHsgQ3Vyc29yU3RhdGVzLCBDdXJzb3JUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi9zdGF0ZXMvY3Vyc29yU3RhdGVzXCI7XHJcbmltcG9ydCB7IER5bmFtaWNDdXJzb3JTaWduYWxUZW1wbGF0ZSB9IGZyb20gXCIuL21vZGVsL2R5bmFtaWNDdXJzb3JTaWduYWxUZW1wbGF0ZVwiO1xyXG5pbXBvcnQgeyBDdXJzb3JTaWduYWwgfSBmcm9tIFwiLi9tb2RlbC9jdXJzb3JTaWduYWxcIjtcclxuaW1wb3J0IHsgU2VyaWVzSGVscGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJpZXNIZWxwZXJcIjtcclxuaW1wb3J0IHsgQmluU2VhcmNoTW9kZSBhcyBTZWFyY2hNb2RlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi91dGlsaXRpZXMvYmluU2VhcmNoXCI7XHJcbmltcG9ydCB7IENoYXJ0Vmlld1Rvb2xTdGF0ZSwgQ2hhcnRWaWV3VG9vbFN0YXRlRW51bSB9IGZyb20gXCIuLi9jb21tb24vc3RhdGVzL2NoYXJ0Vmlld1Rvb2xiYXJTdGF0ZXNcIjtcclxuaW1wb3J0IHsgU2VyaWVzVHlwZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL3Nlcmllc1R5cGVcIjtcclxuXHJcbi8vIGRlZmluZXMgdGhlIGJhc2UgaWQgZm9yIHRoZSBjdXJzb3IgdmFsdWUgdGVtcGxhdGVcclxuY29uc3QgQ1VSU09SX1ZBTFVFX0lEID0gXCJjdXJzb3JWYWx1ZV9cIjtcclxuXHJcbi8qKlxyXG4gKiBpbXBsZW1lbnRzIHRoZSBDdXJzb3JJbmZvIFdpZGdldFxyXG4gKlxyXG4gKiBAY2xhc3MgQ3Vyc29ySW5mb1dpZGdldFxyXG4gKiBAZXh0ZW5kcyB7VHJlZUdyaWRXaWRnZXRCYXNlfVxyXG4gKi9cclxuY2xhc3MgQ3Vyc29ySW5mb1dpZGdldCBleHRlbmRzIFRyZWVHcmlkV2lkZ2V0QmFzZSBpbXBsZW1lbnRzIElDdXJzb3JJbmZvV2lkZ2V0IHtcclxuICAgIHByaXZhdGUgX2N1cnNvclNpZ25hbHNEYXRhTW9kZWw6IEN1cnNvclNpZ25hbHNEYXRhTW9kZWwgPSBuZXcgQ3Vyc29yU2lnbmFsc0RhdGFNb2RlbCgpO1xyXG4gICAgcHJpdmF0ZSBfY3Vyc29ySW5mb1RlbXBsYXRlRGF0YU1vZGVsOiBBcnJheTxEeW5hbWljQ3Vyc29yU2lnbmFsVGVtcGxhdGU+ID0gbmV3IEFycmF5PER5bmFtaWNDdXJzb3JTaWduYWxUZW1wbGF0ZT4oKTtcclxuXHJcbiAgICBwcml2YXRlIF9jdXJzb3JTaWduYWxzRGF0YU1vZGVsQ2hhbmdlZEhhbmRsZXIgPSAoc2VuZGVyLGFyZ3MpPT50aGlzLm9uQ3Vyc29yU2lnbmFsc0RhdGFNb2RlbENoYW5nZWQoc2VuZGVyLGFyZ3MpO1xyXG5cclxuICAgIHByaXZhdGUgX3NlbGVjdGVkQ3Vyc29yU2lnbmFscyE6IEFycmF5PEN1cnNvclNpZ25hbD47XHJcbiAgICBwcml2YXRlIF9maWx0ZXJNb2RpZmllZCA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWRDdXJzb3JJbmZvc09sZDtcclxuICAgIHByaXZhdGUgX3NlbGVjdGVkQ3Vyc29ySW5mb3NOZXc7XHJcbiAgICBwcml2YXRlIF9jdXJzb3JJbmZvU2VsZWN0b3JJc0FjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgIHByaXZhdGUgX3Rvb2xiYXIhOiBDdXJzb3JJbmZvVHJlZUdyaWRUb29sYmFyO1xyXG4gICAgXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9jb2x1bW5JZF9WaXNpYmxlID0gXCJ2aXNpYmxlXCI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9jb2x1bW5JZF9OYW1lID0gXCJuYW1lXCI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9jb2x1bW5JZF9WYWx1ZSA9IFwidmFsdWVcIjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2NvbHVtbklkX0Rlc2NyaXB0aW9uID0gXCJkZXNjcmlwdGlvblwiO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfY29sdW1uSWRfSWNvbkRlZmluaXRpb24gPSBcImljb25EZWZpbml0aW9uXCI7XHJcbiAgICBcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2luZGV0ZXJtaW5hdGVTdGF0ZVZhbHVlID0gXCJpbmRldGVybWluYXRlXCI7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBjdXJzb3JTdGF0ZXNJZCA9IFwiQ3Vyc29yU3RhdGVzXCI7XHJcblxyXG4gICAgLyoqICBpbml0aWFsaXplIHRoZSB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGF5b3V0Q29udGFpbmVySWRcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQ6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQsIDMwKTtcclxuICAgICAgICBzdXBlci5zZXRIZWFkZXJDb250ZW50KFwiQ3Vyc29yc1wiKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBTZXQgZHluYW1pYyBjb2x1bW4gc2V0dGluZ3NcclxuICAgICAgICBzdXBlci5zZXREeW5hbWljQ29sdW1uKDEsIDgwKTtcclxuXHJcbiAgICAgICAgc3VwZXIuc2V0SGVhZGVyRmlsdGVyQmFySGlkZGVuKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gQXR0YWNoIGV2ZW50XHJcbiAgICAgICAgdGhpcy5fY3Vyc29yU2lnbmFsc0RhdGFNb2RlbC5ldmVudE1vZGVsQ2hhbmdlZC5hdHRhY2godGhpcy5fY3Vyc29yU2lnbmFsc0RhdGFNb2RlbENoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICB0aGlzLnN0YXRlcy5vYnNlcnZlKEN1cnNvclN0YXRlcywgKG1vZGlmaWVkU3RhdGU6IEN1cnNvclN0YXRlcywgb2xkU3RhdGU6IEN1cnNvclN0YXRlcykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUluZm9DdXJzb3JzV2l0aE5ld1N0YXRlVmFsdWVzKG1vZGlmaWVkU3RhdGUpO1xyXG4gICAgICAgIH0sIHRoaXMuY3Vyc29yU3RhdGVzSWQpXHJcbiAgICB9XHJcblxyXG4gICAgZGlzcG9zZSgpe1xyXG4gICAgICAgIC8vIERldGFjaCBldmVudHNcclxuICAgICAgICB0aGlzLl9jdXJzb3JTaWduYWxzRGF0YU1vZGVsLmV2ZW50TW9kZWxDaGFuZ2VkLmRldGFjaCh0aGlzLl9jdXJzb3JTaWduYWxzRGF0YU1vZGVsQ2hhbmdlZEhhbmRsZXIpO1xyXG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIGNvbHVtbiB0ZW1wbGF0ZXMgZm9yIHRoZSB0cmVlIGdyaWQgYW5kIGFkZHMgdGhlbSB0byB0aGUgd2lkZ2V0IGNvbnRhaW5lclxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBjcmVhdGVDb2x1bW5UZW1wbGF0ZXMoKXtcclxuXHRcdHZhciAkd2lkZ2V0Q29udGFpbmVyID0gJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCk7XHJcblx0XHQkd2lkZ2V0Q29udGFpbmVyLmFwcGVuZCh0aGlzLmdldENvbHVtblRlbXBsYXRlRGF0YSh0aGlzLl9jb2x1bW5JZF9WaXNpYmxlKSk7XHJcblx0XHQkd2lkZ2V0Q29udGFpbmVyLmFwcGVuZCh0aGlzLmdldENvbHVtblRlbXBsYXRlRGF0YSh0aGlzLl9jb2x1bW5JZF9OYW1lKSk7XHJcblx0fVxyXG5cclxuICAgIC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIGNvbHVtbiB0ZW1wbGF0ZSBpbmZvcm1hdGlvbnNcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHJldHVybnMge3N0cmluZ31cclxuXHQgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG5cdCAqL1xyXG4gICAgcHJpdmF0ZSBnZXRDb2x1bW5UZW1wbGF0ZURhdGEoY29sdW1uSWQ6IHN0cmluZykgOiBzdHJpbmd7XHJcbiAgICAgICAgaWYoY29sdW1uSWQgPT0gdGhpcy5fY29sdW1uSWRfVmlzaWJsZSl7XHJcbiAgICAgICAgICAgIHJldHVybiBgPHNjcmlwdCB0eXBlPVwidGV4dC94LWpzcmVuZGVyXCIgaWQ9XCJjaVZpc2libGVDb2x1bW5UZW1wbGF0ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwibWFyZ2luLWxlZnQ6MTBweDtcIj57e2lmIHZpc2libGUgPT0gXCJ0cnVlXCIgJiYgIWhhc0NoaWxkUmVjb3Jkc319IDxpbnB1dCBjbGFzcz1cImN1c3RvbUNoZWNrYm94XCIgdHlwZT1cImNoZWNrYm94XCIgY2hlY2tlZD1cImNoZWNrZWRcIiB2YWx1ZT1cIlwiIC8+e3tlbHNlICFoYXNDaGlsZFJlY29yZHN9fSA8aW5wdXQgY2xhc3M9XCJjdXN0b21DaGVja2JveFwiIHR5cGU9XCJjaGVja2JveFwiIHZhbHVlPVwiXCIgLz57ey9pZn19PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc2NyaXB0PmA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoY29sdW1uSWQgPT0gdGhpcy5fY29sdW1uSWRfTmFtZSl7XHJcbiAgICAgICAgICAgIHJldHVybiBgPHNjcmlwdCB0eXBlPVwidGV4dC94LWpzcmVuZGVyXCIgaWQ9XCJjaU5hbWVDb2x1bW5UZW1wbGF0ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPSdoZWlnaHQ6MjBweDsnIHVuc2VsZWN0YWJsZT0nb24nPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3tpZiBoYXNDaGlsZFJlY29yZHN9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2ludGVuZCcgc3R5bGU9J2hlaWdodDoxcHg7IGZsb2F0OmxlZnQ7IHdpZHRoOnt7OmxldmVsKjZ9fXB4OyBkaXNwbGF5OmlubGluZS1ibG9jazsnPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3tlbHNlICFoYXNDaGlsZFJlY29yZHN9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2ludGVuZCcgc3R5bGU9J2hlaWdodDoxcHg7IGZsb2F0OmxlZnQ7IHdpZHRoOnt7OmxldmVsKjZ9fXB4OyBkaXNwbGF5OmlubGluZS1ibG9jazsnPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3svaWZ9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3s6I2RhdGFbJ2ljb25EZWZpbml0aW9uJ119fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nZS1jZWxsJyBzdHlsZT0nZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6MTAwJScgdW5zZWxlY3RhYmxlPSdvbic+e3s6I2RhdGFbJ25hbWUnXX19PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvc2NyaXB0PmA7XHJcbiAgICAgICAgfVxyXG5cdFx0cmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgdHJlZSBncmlkIGZvciB0aGUgQ3Vyc29ySW5mb3NcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlVHJlZUdyaWQoKXtcclxuICAgICAgICAoPGFueT4kKHRoaXMuY3NzUGFyZW50Q29udGVudElkKSkuZWpUcmVlR3JpZCh7XHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCksXHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRDb2x1bW5SZXNpemVTdXBwb3J0KCksXHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRDZWxsRWRpdFN1cHBvcnQoKSxcclxuICAgICAgICAgICAgLi4udGhpcy5nZXRUcmVlR3JpZFRvb2xiYXJTdXBwb3J0KCksXHRcclxuXHJcbiAgICAgICAgICAgIGRhdGFTb3VyY2U6IHRoaXMuX2N1cnNvclNpZ25hbHNEYXRhTW9kZWwuZ2V0Q3Vyc29yU2lnbmFscygpLFxyXG4gICAgICAgICAgICBjaGlsZE1hcHBpbmc6IFwiY3Vyc29ySW5mb3NcIixcclxuICAgICAgICAgICAgZXhwYW5kU3RhdGVNYXBwaW5nOiBcImV4cGFuZFN0YXRlXCIsXHJcbiAgICAgICAgICAgIGlzUmVzcG9uc2l2ZTogdHJ1ZSxcclxuICAgICAgICAgICAgdHJlZUNvbHVtbkluZGV4OiAxLFxyXG4gICAgICAgICAgICBhbGxvd0ZpbHRlcmluZyA6IHRydWUsXHJcbiAgICAgICAgICAgIHJvd0hlaWdodCA6IDI4LFxyXG4gICAgICAgICAgICAvLyBTZXQgaW5pdCBzaXplIHRvIGRyYXcgdGhlIHRvb2xiYXIgaWNvbnMgYXQgdGhlIHJpZ2h0IHBvc2l0aW9uXHJcbiAgICAgICAgICAgIHNpemVTZXR0aW5nczogeyBoZWlnaHQ6ICcyMDBweCcsIHdpZHRoOiAnMjAwcHgnIH0sXHJcblxyXG4gICAgICAgICAgICBzZWxlY3Rpb25UeXBlOiBlai5UcmVlR3JpZC5TZWxlY3Rpb25UeXBlLk11bHRpcGxlLFxyXG5cclxuICAgICAgICAgICAgZXhwYW5kZWQ6IChhcmdzKSA9PiB0aGlzLnRyZWVHcmlkTm9kZUV4cGFuZGVkT3JDb2xsYXBzZWQoKSxcclxuXHRcdFx0Y29sbGFwc2VkOiAoYXJncykgPT4gdGhpcy50cmVlR3JpZE5vZGVFeHBhbmRlZE9yQ29sbGFwc2VkKCksXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByb3dTZWxlY3RlZDogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWRSb3dTZWxlY3RlZChhcmdzKSxcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgY3JlYXRlOiAoYXJncykgPT4gdGhpcy50cmVlR3JpZENyZWF0ZWQoKSxcclxuICAgICAgICAgICAgYWN0aW9uQmVnaW46IChhcmdzKSA9PiB0aGlzLnRyZWVHcmlkQWN0aW9uQmVnaW4oYXJncyksIFxyXG4gICAgICAgICAgICBxdWVyeUNlbGxJbmZvOiAoYXJncykgPT4gdGhpcy5xdWVyeUNlbGxJbmZvKGFyZ3MpLFxyXG4gICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRyZWVHcmlkTm9kZUV4cGFuZGVkT3JDb2xsYXBzZWQoKXtcclxuICAgICAgICAvLyBSZWZyZXNoIHRvIHNlZSBjb3JyZWN0IGV4cGFuZGVkL2NvbGxhcHNlZCBpY29uXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBxdWVyeUNlbGxJbmZvKGFyZ3Mpe1xyXG4gICAgICAgIGlmKGFyZ3MuY29sdW1uLmZpZWxkID09IHRoaXMuX2NvbHVtbklkX1Zpc2libGUpe1xyXG4gICAgICAgICAgICBpZihhcmdzLmNlbGxWYWx1ZSA9PSB0aGlzLl9pbmRldGVybWluYXRlU3RhdGVWYWx1ZSl7XHJcbiAgICAgICAgICAgICAgICAvLyBTZXQgaW5kZXRlcm1pbmF0ZSBpY29uc1xyXG4gICAgICAgICAgICAgICAgJChhcmdzLmNlbGxFbGVtZW50LmNoaWxkTm9kZXNbMV0uY2hpbGROb2Rlc1sxXSkucHJvcCh0aGlzLl9pbmRldGVybWluYXRlU3RhdGVWYWx1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUcmVlR3JpZCBzZWxlY3RlZCByb3cgaGFzIGNoYW5nZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB0cmVlR3JpZFJvd1NlbGVjdGVkKGFyZ3Mpe1xyXG4gICAgICAgIGlmKGFyZ3MubW9kZWwuc2VsZWN0ZWRJdGVtcyA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuX2N1cnNvckluZm9TZWxlY3RvcklzQWN0aXZlID09IHRydWUpe1xyXG4gICAgICAgICAgICAvLyBTYXZlcyB0aGUgc2VsZWN0ZWQgaXRlbXMgZm9yIG11bHRpc2VsZWN0aW9uIHN1cHBvcnQgaW4gY3Vyc29yIGluZm8gc2VsZWN0b3JcclxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRDdXJzb3JJbmZvc09sZCA9IHRoaXMuX3NlbGVjdGVkQ3Vyc29ySW5mb3NOZXdcclxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRDdXJzb3JJbmZvc05ldyA9IGFyZ3MubW9kZWwuc2VsZWN0ZWRJdGVtcztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRDdXJzb3JTaWduYWxzID0gdGhpcy5nZXRPbmx5Q3Vyc29yU2lnbmFscyhhcmdzLm1vZGVsLnNlbGVjdGVkSXRlbXMpO1xyXG4gICAgICAgICAgICB0aGlzLnNldEN1cnNvckluZm9TZWxlY3RvckJ1dHRvblN0YXRlKHRoaXMuX3NlbGVjdGVkQ3Vyc29yU2lnbmFscylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXQgYWxsIEN1cnNvclNpZ25hbHMgZm9yIHRoZSBjdXJyZW50IHNlbGVjdGlvbihpZiBDdXJzb3JJbmZvIGlzIHNlbGVjdGVkLCBnZXQgdGhlIHBhcmVudCBDdXJzb3JTaWduYWwpXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gc2VsZWN0ZWRJdGVtc1xyXG4gICAgICogQHJldHVybnMge0FycmF5PEN1cnNvclNpZ25hbD59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldE9ubHlDdXJzb3JTaWduYWxzKHNlbGVjdGVkSXRlbXMpOiBBcnJheTxDdXJzb3JTaWduYWw+e1xyXG4gICAgICAgIGxldCBuZXdMaXN0ID0gbmV3IEFycmF5PEN1cnNvclNpZ25hbD4oKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaSA8IHNlbGVjdGVkSXRlbXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZihzZWxlY3RlZEl0ZW1zW2ldLml0ZW0gaW5zdGFuY2VvZiBDdXJzb3JTaWduYWwpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gbmV3TGlzdC5pbmRleE9mKHNlbGVjdGVkSXRlbXNbaV0uaXRlbSk7XHJcbiAgICAgICAgICAgICAgICBpZihpbmRleCA9PSAtMSl7IC8vIE9ubHkgYWRkIGlmIG5vdCBhbHJlYWR5IGluIGxpc3RcclxuICAgICAgICAgICAgICAgICAgICBuZXdMaXN0LnB1c2goc2VsZWN0ZWRJdGVtc1tpXS5pdGVtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKHNlbGVjdGVkSXRlbXNbaV0uaXRlbSBpbnN0YW5jZW9mIEN1cnNvckluZm8pe1xyXG4gICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gbmV3TGlzdC5pbmRleE9mKHNlbGVjdGVkSXRlbXNbaV0ucGFyZW50SXRlbS5pdGVtKTtcclxuICAgICAgICAgICAgICAgIGlmKGluZGV4ID09IC0xKXsgLy8gT25seSBhZGQgaWYgbm90IGFscmVhZHkgaW4gbGlzdFxyXG4gICAgICAgICAgICAgICAgICAgIG5ld0xpc3QucHVzaChzZWxlY3RlZEl0ZW1zW2ldLnBhcmVudEl0ZW0uaXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ld0xpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBjdXJzb3IgaW5mbyBzZWxlY3RvciBidXR0b24gc3RhdGUgKGlmIG9uZSAob3IgbW9yZSkgc2lnbmFsIGlzIHNlbGVjdGVkIHRoZSBidXR0b24gaXMgZW5hYmxlZClcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxDdXJzb3JTaWduYWw+fSBzZWxlY3RlZEN1cnNvclNpZ25hbHNcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldEN1cnNvckluZm9TZWxlY3RvckJ1dHRvblN0YXRlKHNlbGVjdGVkQ3Vyc29yU2lnbmFsczogQXJyYXk8Q3Vyc29yU2lnbmFsPil7XHJcbiAgICAgICAgaWYoc2VsZWN0ZWRDdXJzb3JTaWduYWxzID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIG5vIGl0ZW1zIHNlbGVjdGVkIGRlYWN0aXZhdGUgRmlsdGVyIGJ1dHRvblxyXG4gICAgICAgICAgICB0aGlzLl90b29sYmFyLmRpc2FibGVDdXJzb3JJbmZvU2VsZWN0b3JCdXR0b24odHJ1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHNlbGVjdGVkQ3Vyc29yU2lnbmFscy5sZW5ndGggPCAxKXtcclxuICAgICAgICAgICAgLy8gbm8gaXRlbXMgc2VsZWN0ZWQgZGVhY3RpdmF0ZSBGaWx0ZXIgYnV0dG9uXHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2xiYXIuZGlzYWJsZUN1cnNvckluZm9TZWxlY3RvckJ1dHRvbih0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbGJhci5kaXNhYmxlQ3Vyc29ySW5mb1NlbGVjdG9yQnV0dG9uKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgY29sdW1uIGRlZmluaXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmVlR3JpZENvbHVtbkRlZmluaXRpb24oKToge317XHJcbiAgICAgICAgLy8gYWRkIGNoZWNrIGJveCBzdGF0ZSBpbmZvcm1hdGlvblxyXG4gICAgICAgIHZhciBjaGVja0JveFN0YXRlcyA9IFtcclxuICAgICAgICAgICAgeyB0ZXh0OiBcIlllc1wiLCB2YWx1ZTogXCJ0cnVlXCIgfSxcclxuICAgICAgICAgICAgeyB0ZXh0OiBcIk5vXCIsIHZhbHVlOiBcImZhbHNlXCIgfVxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIC8vIHJldHVybiB0aGUgY29sdW1uIGRlZmluaXRpb25zXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGNvbHVtbnM6IFtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB7IGZpZWxkOiB0aGlzLl9jb2x1bW5JZF9WaXNpYmxlLCBoZWFkZXJUZXh0OiBcIlZpc2libGVcIiwgdmlzaWJsZTogZmFsc2UsIGFsbG93RWRpdGluZzogZmFsc2UsIGlzVGVtcGxhdGVDb2x1bW46IHRydWUsIHRlbXBsYXRlSUQ6IFwiY2lWaXNpYmxlQ29sdW1uVGVtcGxhdGVcIiwgZmlsdGVyRWRpdFR5cGU6IFwiZHJvcGRvd25lZGl0XCIsIGRyb3Bkb3duRGF0YTogY2hlY2tCb3hTdGF0ZXMsIGFsbG93RmlsdGVyaW5nQmxhbmtDb250ZW50OiBmYWxzZSwgd2lkdGg6IFwiNTVweFwifSxcclxuICAgICAgICAgICAgICAgICAgICB7IGZpZWxkOiB0aGlzLl9jb2x1bW5JZF9OYW1lLCBoZWFkZXJUZXh0OiBcIk5hbWVcIiwgYWxsb3dFZGl0aW5nIDogZmFsc2UsIGlzVGVtcGxhdGVDb2x1bW46IHRydWUsIHRlbXBsYXRlSUQ6IFwiY2lOYW1lQ29sdW1uVGVtcGxhdGVcIn0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBmaWVsZDogdGhpcy5fY29sdW1uSWRfVmFsdWUsIGhlYWRlclRleHQ6IFwiVmFsdWVcIiwgYWxsb3dFZGl0aW5nIDogZmFsc2UsIHdpZHRoOiBcIjE0MHB4XCIsIGlzVGVtcGxhdGVDb2x1bW46IHRydWUsIHRlbXBsYXRlOiBcIjxkaXYgc3R5bGU9J3BhZGRpbmctbGVmdDogMjBweCcgaWQ9J1wiICsgdGhpcy5wYXJlbnRDb250ZW50SWQgKyBDVVJTT1JfVkFMVUVfSUQgKyBcInt7OnVpSWR9fSc+PC9kaXY+XCIgfSxcclxuICAgICAgICAgICAgICAgICAgICB7IGZpZWxkOiB0aGlzLl9jb2x1bW5JZF9EZXNjcmlwdGlvbiwgaGVhZGVyVGV4dDogXCJEZXNjcmlwdGlvblwiLCAgdmlzaWJsZTogZmFsc2UsIGFsbG93RWRpdGluZyA6IGZhbHNlLCB3aWR0aDogXCIxNDBweFwifSxcclxuICAgICAgICAgICAgICAgICAgICB7IGZpZWxkOiB0aGlzLl9jb2x1bW5JZF9JY29uRGVmaW5pdGlvbiwgdmlzaWJsZTogZmFsc2UsIHdpZHRoOiBcIjBweFwiIH0sXHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgY29sdW1uIHJlc2l6ZSBzZXR0aW5nc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFRyZWVHcmlkQ29sdW1uUmVzaXplU3VwcG9ydCgpOiB7fXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBhbGxvd0NvbHVtblJlc2l6ZTogdHJ1ZSxcclxuICAgICAgICAgICAgY29sdW1uUmVzaXplU2V0dGluZ3M6IHsgY29sdW1uUmVzaXplTW9kZTogZWouVHJlZUdyaWQuQ29sdW1uUmVzaXplTW9kZS5GaXhlZENvbHVtbnMgfSxcclxuICAgICAgICAgICAgY29sdW1uUmVzaXplZDogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWRDb2x1bW5SZXNpemVkKGFyZ3MpLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcblx0ICogUmV0dXJucyB0aGUgdHJlZSBncmlkIGNlbGwgZWRpdCBzZXR0aW5nc1xyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcmV0dXJucyB7e319XHJcblx0ICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIGdldFRyZWVHcmlkQ2VsbEVkaXRTdXBwb3J0KCk6IHt9e1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0ZWRpdFNldHRpbmdzOiB7XHRhbGxvd0VkaXRpbmc6IHRydWUgfSxcclxuXHRcdH07XHJcblx0fVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJlZSBncmlkIHRvb2xiYXIgc2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmVlR3JpZFRvb2xiYXJTdXBwb3J0KCk6IHt9e1xyXG4gICAgICAgIHRoaXMuX3Rvb2xiYXIgPSBuZXcgQ3Vyc29ySW5mb1RyZWVHcmlkVG9vbGJhcih0aGlzLmNzc1BhcmVudENvbnRlbnRJZCk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdG9vbGJhclNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICBzaG93VG9vbGJhcjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGN1c3RvbVRvb2xiYXJJdGVtczogdGhpcy5fdG9vbGJhci5nZXRDdXN0b21Ub29sYmFycygpLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0b29sYmFyQ2xpY2s6IChhcmdzKSA9PiB0aGlzLl90b29sYmFyLnRvb2xiYXJDbGljayhhcmdzLCB0aGlzKSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVHJlZUdyaWQgd2FzIGNyZWF0ZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB0cmVlR3JpZENyZWF0ZWQoKXtcclxuICAgICAgICAvLyBTZXRzIHRoZSBjdXN0b20gdG9vbGJhciBpY29uc1xyXG4gICAgICAgIHRoaXMuX3Rvb2xiYXIuc2V0U3R5bGVGb3JUb29sYmFySWNvbnMoKTtcclxuICAgICAgICB0aGlzLl90b29sYmFyLmluaXRUb29sYmFyU3RhdGVzKCk7XHJcblxyXG4gICAgICAgIC8vIEZpbHRlciBkYXRhIG9uIHN0YXJ0dXBcclxuICAgICAgICBsZXQgdHJlZU9iaiA9IHRoaXMuZ2V0VHJlZUdyaWRPYmplY3QoKTtcclxuICAgICAgICAoPGFueT50cmVlT2JqKS5maWx0ZXJDb2x1bW4odGhpcy5fY29sdW1uSWRfVmlzaWJsZSwgZWouRmlsdGVyT3BlcmF0b3JzLmVxdWFsLCBcInRydWVcIiwgXCJhbmRcIik7XHJcblxyXG4gICAgICAgIHRoaXMuYXR0YWNoVG9DaGVja0JveENoYW5nZWRFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXR0YWNoIGNoZWNrIGJveCBjaGFuZ2VkIGV2ZW50c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGF0dGFjaFRvQ2hlY2tCb3hDaGFuZ2VkRXZlbnQoKXtcclxuICAgICAgICAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKS5vbihcImNoYW5nZVwiLCBcIi5jdXN0b21DaGVja2JveFwiLCAoZSkgPT4gdGhpcy5jaGVja0JveENoYW5nZWQoZSkgKTtcclxuICAgIH1cclxuXHJcbiAgICBsb2FkU3R5bGVzKCkge1xyXG4gICAgICAgIHN1cGVyLmFkZFN0eWxlKFwid2lkZ2V0cy9jdXJzb3JJbmZvV2lkZ2V0L3N0eWxlL2Nzcy9jdXJzb3JJbmZvU3R5bGUuY3NzXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT2NjdXJzIG9uIGNoZWNrIGJveCBjaGFuZ2VkIGV2ZW50c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGVcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2hlY2tCb3hDaGFuZ2VkKGUpe1xyXG4gICAgICAgIGxldCBmaWx0ZXJEYXRhU291cmNlID0gdGhpcy5fY3Vyc29ySW5mb1RlbXBsYXRlRGF0YU1vZGVsO1xyXG5cclxuICAgICAgICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XHJcbiAgICAgICAgbGV0IHRhcmdldEVsZSA9IGUudGFyZ2V0O1xyXG4gICAgICAgIGxldCBjaGVja1N0YXR1cyA9ICQodGFyZ2V0RWxlKS5pcygnOmNoZWNrZWQnKTtcclxuICAgICAgICAvLyAkKHRhcmdldEVsZSkucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG4gICAgICAgIGxldCByZWNvcmQgPSB0aGlzLmdldFRyZWVSZWNvcmQodGFyZ2V0RWxlKTtcclxuICAgICAgICBpZihyZWNvcmQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fZmlsdGVyTW9kaWZpZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYoY2hlY2tTdGF0dXMgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgcmVjb3JkLml0ZW0udmlzaWJsZSA9IFwiZmFsc2VcIjtcclxuICAgICAgICAgICAgICAgIHJlY29yZFtcInZpc2libGVcIl0gPSBcImZhbHNlXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldE11bHRpU2VsZWN0aW9uQ2hlY2tCb3hlcyhcImZhbHNlXCIsIHJlY29yZC5pbmRleCk7XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHJlY29yZC5pdGVtLnZpc2libGUgPSBcInRydWVcIjtcclxuICAgICAgICAgICAgICAgIHJlY29yZFtcInZpc2libGVcIl0gPSBcInRydWVcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0TXVsdGlTZWxlY3Rpb25DaGVja0JveGVzKFwidHJ1ZVwiLCByZWNvcmQuaW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNldE1vZGVsKGZpbHRlckRhdGFTb3VyY2UpO1xyXG5cclxuICAgICAgICAgICAgLy8gU2V0IHNlbGVjdGlvbiBhZnRlciBzZXR0aW5nIGNoZWNrYm94IGJlY2F1c2UgdGhleSBhcmUgbG9zdCBhZnRlciBzZXR0aW5nIGEgY2hlY2sgYm94XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U2VsZWN0aW9uSW5DdXJzb3JJbmZvU2VsZWN0b3JWaWV3KHRoaXMuX3NlbGVjdGVkQ3Vyc29ySW5mb3NPbGQpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNoZWNrQm94ZXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJZiBtdWx0aSBzZWxlY3Rpb24gaXMgYWN0aXZlLCBzZXQgYWxsIHNlbGVjdGVkIGl0ZW1zIHRvIHRoZSBnaXZlbiBzdGF0ZShjaGVja2VkL3VuY2hlY2tlZClcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYWN0dWFsSW5kZXhcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0TXVsdGlTZWxlY3Rpb25DaGVja0JveGVzKHN0YXRlOiBzdHJpbmcsIGFjdHVhbEluZGV4OiBudW1iZXIpe1xyXG4gICAgICAgIGxldCBzZWxlY3RlZEN1cnNvckluZm9zID0gdGhpcy5fc2VsZWN0ZWRDdXJzb3JJbmZvc09sZDtcclxuICAgICAgICBpZihzZWxlY3RlZEN1cnNvckluZm9zICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIFNldC9VbnNldCBjaGVjayBib3hlc1xyXG4gICAgICAgICAgICBsZXQgaW5kZXhXaXRoaW5NdWx0aVNlbGVjdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPTA7IGkgPCBzZWxlY3RlZEN1cnNvckluZm9zLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGlmKGFjdHVhbEluZGV4ID09IHNlbGVjdGVkQ3Vyc29ySW5mb3NbaV0uaW5kZXgpe1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4V2l0aGluTXVsdGlTZWxlY3Rpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBpZihpbmRleFdpdGhpbk11bHRpU2VsZWN0aW9uID09IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRDdXJzb3JJbmZvcy5mb3JFYWNoKGN1cnNvckluZm8gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnNvckluZm8uaXRlbS52aXNpYmxlID0gc3RhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29ySW5mb1tcInZpc2libGVcIl0gPSBzdGF0ZTsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAvLyBPbmx5IG9uZSBjaGVja2JveCB3YXMgY2xpY2tlZCA9PiBzZXQgc2VsZWN0aW9uIHRvIHRoZSBuZXcgb25lXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3RlZEN1cnNvckluZm9zT2xkID0gdGhpcy5fc2VsZWN0ZWRDdXJzb3JJbmZvc05ldztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRyZWVHcmlkQWN0aW9uQmVnaW4oYXJncyl7XHJcbiAgICAgICAgLy8gRG9uJ3Qgc3VwcG9ydCBcIkVudGYvRGVsXCIga2V5XHJcbiAgICAgICAgaWYoYXJncy5yZXF1ZXN0VHlwZSA9PSBcImRlbGV0ZVwiKXtcclxuICAgICAgICAgICAgYXJncy5jYW5jZWwgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEEgdHJlZWdyaWQgY29sdW1uIHdhcyByZXNpemVkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB0cmVlR3JpZENvbHVtblJlc2l6ZWQoYXJncyl7XHJcbiAgICAgICAgc3VwZXIucmVzaXplRHluYW1pY0NvbHVtbihhcmdzLmNvbHVtbkluZGV4LCBhcmdzLm1vZGVsKTtcclxuICAgICAgICBpZiAodGhpcy5fY3Vyc29ySW5mb1NlbGVjdG9ySXNBY3RpdmUpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDaGVja0JveGVzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFJlZnJlc2ggY3Vyc29yIGluZm8gdmFsdWVzIGFmdGVyIHJlc2l6ZSAodHJlZWdyaWQgc2V0cyB0aGUgZGF0YSB0byBcIjBcIiBhZnRlciByZXNpemUpXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoQ3Vyc29yVmFsdWVzKHRoaXMuX2N1cnNvclNpZ25hbHNEYXRhTW9kZWwuZ2V0Q3Vyc29yU2lnbmFscygpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogcmVzaXplcyB0aGUgY3Vyc29yIHZhbHVlcyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gd2lkdGhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHJlc2l6ZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xyXG4gICAgICAgIHN1cGVyLnJlc2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICBpZiAodGhpcy5fY3Vyc29ySW5mb1NlbGVjdG9ySXNBY3RpdmUpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDaGVja0JveGVzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFJlZnJlc2ggY3Vyc29yIHZhbHVlcyBhZnRlciByZXNpemUgKHRyZWVncmlkIHNldHMgdGhlIGRhdGEgdG8gXCIwXCIgYWZ0ZXIgcmVzaXplKVxyXG4gICAgICAgIHRoaXMucmVmcmVzaEN1cnNvclZhbHVlcyh0aGlzLl9jdXJzb3JTaWduYWxzRGF0YU1vZGVsLmdldEN1cnNvclNpZ25hbHMoKSk7XHJcblxyXG4gICAgICAgIHRoaXMuX3Rvb2xiYXIucmVzaXplKHdpZHRoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNob3dzIHRoZSBjdXJzZXIgc2lnbmFscyB3aXRoIHRoZSBmaWx0ZXJlZC9kZWZpbmVkIGN1cnNvciBpbmZvcm1hdGlvbnNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2hvd0N1cnNvclNpZ25hbHNWaWV3KCl7XHJcbiAgICAgICAgdGhpcy5fY3Vyc29ySW5mb1NlbGVjdG9ySXNBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zZWxlY3RlZEN1cnNvckluZm9zT2xkID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuX3NlbGVjdGVkQ3Vyc29ySW5mb3NOZXcgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gVXBkYXRlIGN1cnNvciBpbmZvIHZpc2liaWxpdGllcyBpZiBzb21ldGhpbmcgaGFzIGNoYW5nZWRcclxuICAgICAgICBpZih0aGlzLl9maWx0ZXJNb2RpZmllZCA9PSB0cnVlKXtcclxuICAgICAgICAgICAgdGhpcy5zZXRDdXJzb3JJbmZvVmlzaWJpbGl0aWVzKHRoaXMuX3NlbGVjdGVkQ3Vyc29yU2lnbmFscywgdGhpcy5fY3Vyc29ySW5mb1RlbXBsYXRlRGF0YU1vZGVsWzBdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNob3cgYWN0dWFsIGN1cnNvckluZm8gZGF0YVxyXG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG5cclxuICAgICAgICAvLyBTZXRzIHRoZSBjb2x1bW4gdmlzaWJpbGl0aWVzXHJcbiAgICAgICAgbGV0IHRyZWVHcmlkT2JqZWN0ID0gc3VwZXIuZ2V0VHJlZUdyaWRPYmplY3QoKTsgIFxyXG4gICAgICAgIHRoaXMuc2V0Q29sdW1uVmlzaWJsaXRpZXModHJlZUdyaWRPYmplY3QsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgLy8gU2V0IHRoZSBmaWx0ZXIgdG8gaGlkZSB2aXNpYmxlID09IGZhbHNlIGN1cnNvciBpbmZvc1xyXG4gICAgICAgICg8YW55PnRyZWVHcmlkT2JqZWN0KS5maWx0ZXJDb2x1bW4odGhpcy5fY29sdW1uSWRfVmlzaWJsZSwgZWouRmlsdGVyT3BlcmF0b3JzLmVxdWFsLCBcInRydWVcIiwgXCJhbmRcIik7XHJcblxyXG4gICAgICAgIC8vIHNldCB0aGUgc2VsZWN0aW9uIHRvIHN0YXRlIGJlZm9yZSBzd2l0Y2hpbmcgdG8gdGhlIGN1cnNvciBpbmZvIHNlbGVjdG9yIHZpZXdcclxuICAgICAgICB0aGlzLnNldFNlbGVjdGlvbldpdGhDdXJzb3JTaWduYWxzKHRyZWVHcmlkT2JqZWN0LCB0aGlzLl9zZWxlY3RlZEN1cnNvclNpZ25hbHMpO1xyXG5cclxuICAgICAgICAvLyBVcGRhdGUgdGhlIGR5bmFtaWMgY29sdW1uIHNpemUgYWZ0ZXIgaGlkZS9zaG93IG9mIHNvbWUgY29sdW1uc1xyXG4gICAgICAgIHRoaXMucmVzaXplRHluYW1pY0NvbHVtbigwLCB0cmVlR3JpZE9iamVjdC5tb2RlbCk7XHJcblxyXG4gICAgICAgIC8vIHJlZnJlc2ggdGhlIGN1cnNvciBpbmZvIHZhbHVlc1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEN1cnNvclZhbHVlcyh0aGlzLl9jdXJzb3JTaWduYWxzRGF0YU1vZGVsLmdldEN1cnNvclNpZ25hbHMoKSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogU2hvd3MgdGhlIGN1cnNvciBpbmZvIHNlbGVjdG9yIHZpZXdcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2hvd0N1cnNvckluZm9TZWxlY3RvclZpZXcoKXtcclxuICAgICAgICB0aGlzLl9jdXJzb3JJbmZvU2VsZWN0b3JJc0FjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fZmlsdGVyTW9kaWZpZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gUmVzZXQgY3Vyc29yIGluZm8gdGVtcGxhdGUgZGF0YW1vZGVsXHJcbiAgICAgICAgdGhpcy5fY3Vyc29ySW5mb1RlbXBsYXRlRGF0YU1vZGVsLnNwbGljZSgwLCB0aGlzLl9jdXJzb3JJbmZvVGVtcGxhdGVEYXRhTW9kZWwubGVuZ3RoKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBjcmVhdGUgYSBzaWduYWwgdGVtcGxhdGUgYmFzZWQgb24gdGhlIHNlbGVjdGVkIHNlcmllc1xyXG4gICAgICAgIGxldCB0ZW1wbGF0ZUN1cnNvclNpZ25hbCA9IG5ldyBEeW5hbWljQ3Vyc29yU2lnbmFsVGVtcGxhdGUodGhpcy5fc2VsZWN0ZWRDdXJzb3JTaWduYWxzKVxyXG5cclxuICAgICAgICAvLyBhZGQgdGhlIHNpZ25hbCB0ZW1wbGF0ZSB0byB0aGUgbW9kZWxcclxuICAgICAgICB0aGlzLl9jdXJzb3JJbmZvVGVtcGxhdGVEYXRhTW9kZWwucHVzaCh0ZW1wbGF0ZUN1cnNvclNpZ25hbCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gU2V0IGN1cnNvciBpbmZvIHRlbXBsYXRlIHZpc2liaWxpdGllc1xyXG4gICAgICAgIHRoaXMudXBkYXRlVGVtcGxhdGVWaXNpYmlsaXRpZXModGhpcy5fc2VsZWN0ZWRDdXJzb3JTaWduYWxzLCB0ZW1wbGF0ZUN1cnNvclNpZ25hbCk7XHJcbiAgICAgICBcclxuICAgICAgICAvLyBzaG93IGN1cnNvciBpbmZvIHRlbXBsYXRlIGRhdGFtb2RlbCAodGhlIHBvc3NpYmxlIGN1cnNvciBpbmZvcylcclxuICAgICAgICB0aGlzLnVwZGF0ZURhdGFTb3VyY2UoPGFueT50aGlzLl9jdXJzb3JJbmZvVGVtcGxhdGVEYXRhTW9kZWwpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFNldHMgdGhlIGNvbHVtbiB2aXNpYmlsaXRpZXNcclxuICAgICAgICBsZXQgdHJlZUdyaWRPYmplY3QgPSBzdXBlci5nZXRUcmVlR3JpZE9iamVjdCgpO1xyXG4gICAgICAgIHRoaXMuc2V0Q29sdW1uVmlzaWJsaXRpZXModHJlZUdyaWRPYmplY3QsIHRydWUpO1xyXG5cclxuICAgICAgICAvLyBVcGRhdGUgdGhlIGR5bmFtaWMgY29sdW1uIHNpemUgYWZ0ZXIgaGlkZS9zaG93IG9mIHNvbWUgY29sdW1uc1xyXG4gICAgICAgIHRoaXMucmVzaXplRHluYW1pY0NvbHVtbigwLCB0cmVlR3JpZE9iamVjdC5tb2RlbCk7XHJcblxyXG4gICAgICAgIC8vIFJlbW92ZXMgdGhlIGZpbHRlciBvZiB0aGUgdmlzaWJpbGl0eSBmbGFnIHdoaWNoIGlzIG5lZWRlZCBpbiB0aGUgY3Vyc29yIHNpZ25hbCB2aWV3XHJcbiAgICAgICAgdHJlZUdyaWRPYmplY3QuY2xlYXJGaWx0ZXIodGhpcy5fY29sdW1uSWRfVmlzaWJsZSk7XHJcblxyXG4gICAgICAgIC8vIENvbnZlcnQgY3VzdG9tIGNoZWNrIGJveGVzIGludG8gc3luY2Z1c2lvbiBjaGVjayBib3hlc1xyXG4gICAgICAgIHRoaXMudXBkYXRlQ2hlY2tCb3hlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgY29sdW1uIHZpc2liaWxpdGllcyBmb3IgdGhlIGN1cnNvciBpbmZvIHNlbGVjdG9yIHZpZXcgb3IgdGhlIGN1cnNvciBzaWduYWxzIHZpZXdcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSB0cmVlR3JpZE9iamVjdFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBjdXJzb3JJbmZvU2VsZWN0b3JWaWV3XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldENvbHVtblZpc2libGl0aWVzKHRyZWVHcmlkT2JqZWN0LCBjdXJzb3JJbmZvU2VsZWN0b3JWaWV3OmJvb2xlYW4pe1xyXG4gICAgICAgIC8vIGdldCBuZWVkZWQgY29sdW1uc1xyXG4gICAgICAgIGxldCB2aXNpYmxlQ29sdW1uID0gdHJlZUdyaWRPYmplY3QuZ2V0Q29sdW1uQnlGaWVsZCh0aGlzLl9jb2x1bW5JZF9WaXNpYmxlKTtcclxuICAgICAgICBsZXQgZGVzY3JpcHRpb25Db2x1bW4gPSB0cmVlR3JpZE9iamVjdC5nZXRDb2x1bW5CeUZpZWxkKHRoaXMuX2NvbHVtbklkX0Rlc2NyaXB0aW9uKTtcclxuICAgICAgICBsZXQgdmFsdWVDb2x1bW4gPSB0cmVlR3JpZE9iamVjdC5nZXRDb2x1bW5CeUZpZWxkKHRoaXMuX2NvbHVtbklkX1ZhbHVlKTtcclxuXHJcbiAgICAgICAgaWYoY3Vyc29ySW5mb1NlbGVjdG9yVmlldyA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgIC8vIEhpZGUgdmlzaWJsZSBjb2x1bW5cclxuICAgICAgICAgICAgdHJlZUdyaWRPYmplY3QuaGlkZUNvbHVtbih2aXNpYmxlQ29sdW1uLmhlYWRlclRleHQpO1xyXG5cclxuICAgICAgICAgICAgLy8gSGlkZSBkZXNjcmlwdGlvbiBjb2x1bW5cclxuICAgICAgICAgICAgdHJlZUdyaWRPYmplY3QuaGlkZUNvbHVtbihkZXNjcmlwdGlvbkNvbHVtbi5oZWFkZXJUZXh0KTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNob3cgdmFsdWUgY29sdW1uXHJcbiAgICAgICAgICAgIHRyZWVHcmlkT2JqZWN0LnNob3dDb2x1bW4odmFsdWVDb2x1bW4uaGVhZGVyVGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIC8vIFNob3cgdmlzaWJsZSBjb2x1bW5cclxuICAgICAgICAgICAgdHJlZUdyaWRPYmplY3Quc2hvd0NvbHVtbih2aXNpYmxlQ29sdW1uLmhlYWRlclRleHQpO1xyXG5cclxuICAgICAgICAgICAgLy8gU2hvdyBkZXNjcmlwdGlvbiBjb2x1bW5cclxuICAgICAgICAgICAgdHJlZUdyaWRPYmplY3Quc2hvd0NvbHVtbihkZXNjcmlwdGlvbkNvbHVtbi5oZWFkZXJUZXh0KTtcclxuXHJcbiAgICAgICAgICAgIC8vIEhpZGUgdmFsdWUgY29sdW1uXHJcbiAgICAgICAgICAgIHRyZWVHcmlkT2JqZWN0LmhpZGVDb2x1bW4odmFsdWVDb2x1bW4uaGVhZGVyVGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgc2VsZWN0aW9uIHRvIHRoZSBnaXZlbiBzZWxlY3Rpb24gb2JqZWN0cyBpbiBjdXJzb3IgaW5mbyBzZWxlY3RvciB2aWV3XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8YW55Pn0gc2VsZWN0ZWRPYmplY3RzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldFNlbGVjdGlvbkluQ3Vyc29ySW5mb1NlbGVjdG9yVmlldyhzZWxlY3RlZE9iamVjdHMpIHtcclxuICAgICAgICBpZiAoc2VsZWN0ZWRPYmplY3RzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdHJlZUdyaWRPYmplY3Q6IGFueSA9IHRoaXMuZ2V0VHJlZUdyaWRPYmplY3QoKTtcclxuICAgICAgICB0cmVlR3JpZE9iamVjdC5jbGVhclNlbGVjdGlvbigpO1xyXG4gICAgICAgIGlmIChzZWxlY3RlZE9iamVjdHMubGVuZ3RoICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHNlbGVjdGVkT2JqZWN0cy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgICAgIHRyZWVHcmlkT2JqZWN0Ll9tdWx0aVNlbGVjdEN0cmxSZXF1ZXN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGxldCB2aXNpYmxlSW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IHRyZWVHcmlkT2JqZWN0Lm1vZGVsLmZsYXRSZWNvcmRzLmxlbmd0aDsgaisrKXtcclxuICAgICAgICAgICAgICAgICAgICBpZih0cmVlR3JpZE9iamVjdC5tb2RlbC5mbGF0UmVjb3Jkc1tqXS5pZCA9PSBzZWxlY3RlZE9iamVjdHNbaV0uaWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJlZUdyaWRPYmplY3Quc2VsZWN0Um93cyh2aXNpYmxlSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlSW5kZXgrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdHJlZUdyaWRPYmplY3Quc2VsZWN0Um93cyhzZWxlY3RlZE9iamVjdHMuaW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBTZXQgYWN0dWFsIHNlbGVjdGlvbiBmb3IgbGF0ZXIgdXNlIFxyXG4gICAgICAgIHRoaXMuX3NlbGVjdGVkQ3Vyc29ySW5mb3NPbGQgPSBzZWxlY3RlZE9iamVjdHM7XHJcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWRDdXJzb3JJbmZvc05ldyA9IHNlbGVjdGVkT2JqZWN0cztcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBzZWxlY3Rpb24gdG8gdGhlIGdpdmVuIGN1cnNvciBzaWduYWxzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gdHJlZUdyaWRPYmplY3RcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8Q3Vyc29yU2lnbmFsPn0gY3Vyc29yU2lnbmFsc1xyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRTZWxlY3Rpb25XaXRoQ3Vyc29yU2lnbmFscyh0cmVlR3JpZE9iamVjdCwgY3Vyc29yU2lnbmFsczogQXJyYXk8Q3Vyc29yU2lnbmFsPikge1xyXG4gICAgICAgIC8vIGRlc2VsZWN0IGFsbCBzZWxlY3Rpb25zIGluIGN1cnNvciBzaWduYWxzIHZpZXdcclxuICAgICAgICB0cmVlR3JpZE9iamVjdC5jbGVhclNlbGVjdGlvbigpO1xyXG5cclxuICAgICAgICBpZihjdXJzb3JTaWduYWxzID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGN1cnNvclNpZ25hbHMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIHRyZWVHcmlkT2JqZWN0Ll9tdWx0aVNlbGVjdEN0cmxSZXF1ZXN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgbGV0IHZpc2libGVJbmRleCA9IDA7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCAoPGFueT50cmVlR3JpZE9iamVjdC5tb2RlbCkuZmxhdFJlY29yZHMubGVuZ3RoOyBqKyspe1xyXG4gICAgICAgICAgICAgICAgaWYoKDxhbnk+dHJlZUdyaWRPYmplY3QubW9kZWwpLmZsYXRSZWNvcmRzW2pdLml0ZW0gPT0gY3Vyc29yU2lnbmFsc1tpXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdHJlZUdyaWRPYmplY3Quc2VsZWN0Um93cyh2aXNpYmxlSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoKDxhbnk+dHJlZUdyaWRPYmplY3QubW9kZWwpLmZsYXRSZWNvcmRzW2pdLnZpc2libGUgIT0gXCJmYWxzZVwiKXtcclxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlSW5kZXgrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgdmlzaWJsZSBmbGFncyBpbiB0aGUgdGVtcGxhdGUgY3Vyc29yIHNpZ25hbCB0byB0aGUgaW5mb3JtYXRpb25zIGZyb20gdGhlIGN1cnNvciBzaWduYWxzXHJcbiAgICAgKiAoZS5nLiBhbGwgc2lnbmFscyBzaG93IHkxIGN1cnNvciBpbmZvIHNvIHRoZXJlZm9yZSB0ZW1wbGF0ZSBjdXJzb3IgaW5mbyB2aXNpYmlsaXR5IGlzIHNldCB0byBcInRydWVcIjtcclxuICAgICAqICAgICAgIGFsbCBzaWduYWxzIGRvc24ndCBzaG93IHkxIGN1cnNvciBpbmZvIHNvIHRoZXJlZm9yZSB0ZW1wbGF0ZSBjdXJzb3IgaW5mbyB2aXNpYmlsaXR5IGlzIHNldCB0byBcImZhbHNlXCI7XHJcbiAgICAgKiAgICAgICBzb21lIHNpZ25hbHMgc2hvdyB5MSBjdXJzb3IgaW5mbyBzbyB0aGVyZWZvcmUgdGVtcGxhdGUgY3Vyc29yIGluZm8gdmlzaWJpbGl0eSBpcyBzZXQgdG8gXCJpbmRldGVybWluYXRlXCI7XHJcbiAgICAgKiApXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8Q3Vyc29yU2lnbmFsPn0gY3Vyc29yU2lnbmFsc1xyXG4gICAgICogQHBhcmFtIHtEeW5hbWljQ3Vyc29yU2lnbmFsVGVtcGxhdGV9IHRlbXBsYXRlQ3Vyc29yU2lnbmFsXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVUZW1wbGF0ZVZpc2liaWxpdGllcyhjdXJzb3JTaWduYWxzOiBBcnJheTxDdXJzb3JTaWduYWw+LCB0ZW1wbGF0ZUN1cnNvclNpZ25hbDogRHluYW1pY0N1cnNvclNpZ25hbFRlbXBsYXRlKSB7XHJcbiAgICAgICAgaWYgKHRlbXBsYXRlQ3Vyc29yU2lnbmFsICYmIHRlbXBsYXRlQ3Vyc29yU2lnbmFsLmN1cnNvckluZm9zKSB7XHJcbiAgICAgICAgICAgIC8vIGZvciBhbGwgYXZhaWxhYmxlIG1lcmdlZCBjdXJzb3IgaW5mb3NcclxuICAgICAgICAgICAgdGVtcGxhdGVDdXJzb3JTaWduYWwuY3Vyc29ySW5mb3MuZm9yRWFjaCgodGVtcGxhdGVDdXJzb3JTaWduYWxJbmZvKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gY2xlYXIgZXhpc3RpbmcgdmlzaWJpbGl0eVxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVDdXJzb3JTaWduYWxJbmZvLnZpc2libGUgPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGdldCB0aGUgY3Vyc29yIGluZm9zIGJ5IGlkXHJcbiAgICAgICAgICAgICAgICBsZXQgbWF0Y2hpbmdDdXJzb3JJbmZvczogQXJyYXk8Q3Vyc29ySW5mbz4gPSB0aGlzLnJldHJpZXZDdXJzb3JJbmZvc0J5SWQoY3Vyc29yU2lnbmFscywgdGVtcGxhdGVDdXJzb3JTaWduYWxJbmZvLmlkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBmb3IgYWxsIHNlbGVjdGVkIGN1cnNvciBzaWduYWxzIHdpdGggbWF0Y2hpbmcgaWQgLi4uXHJcbiAgICAgICAgICAgICAgICBtYXRjaGluZ0N1cnNvckluZm9zLmZvckVhY2goKGN1cnNvclNpZ25hbEluZm8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGUgdmlzaWJpbGl0eSBpcyB5ZXQgdW5kZWZpbmVkIC4uXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0ZW1wbGF0ZUN1cnNvclNpZ25hbEluZm8udmlzaWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpbml0aWFsaXplIHRoZSB2aXNpYmlsaXR5IHdpdGggdGhlIGZpcnN0IGN1cnNvciBzaWduYWwgaW5mb3MgdmFsdWUuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlQ3Vyc29yU2lnbmFsSW5mby52aXNpYmxlID0gY3Vyc29yU2lnbmFsSW5mby52aXNpYmxlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNldCB2aXNpYmlsaXR5IHRvIHVuZGV0ZXJtaW5lZCBpZiBvbmUgb2YgdGhlIGZvbGxvd2luZyB2YWx1ZXMgaXMgZGlmZmVyZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJzb3JTaWduYWxJbmZvLnZpc2libGUgIT09IHRlbXBsYXRlQ3Vyc29yU2lnbmFsSW5mby52aXNpYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZUN1cnNvclNpZ25hbEluZm8udmlzaWJsZSA9IHRoaXMuX2luZGV0ZXJtaW5hdGVTdGF0ZVZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSB2aXNpYmlsaXR5IGRlZmluZWQgaW4gdGhlIHRlbXBsYXRlIGN1cnNvciBzaWduYWwgdG8gdGhlIGN1cnNvciBzaWduYWxzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8Q3Vyc29yU2lnbmFsPn0gY3Vyc29yU2lnbmFsc1xyXG4gICAgICogQHBhcmFtIHtEeW5hbWljQ3Vyc29yU2lnbmFsVGVtcGxhdGV9IHRlbXBsYXRlQ3Vyc29yU2lnbmFsXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRDdXJzb3JJbmZvVmlzaWJpbGl0aWVzKGN1cnNvclNpZ25hbHM6IEFycmF5PEN1cnNvclNpZ25hbD4sIHRlbXBsYXRlQ3Vyc29yU2lnbmFsOiBEeW5hbWljQ3Vyc29yU2lnbmFsVGVtcGxhdGUpIHtcclxuICAgICAgICBpZiAodGVtcGxhdGVDdXJzb3JTaWduYWwgJiYgdGVtcGxhdGVDdXJzb3JTaWduYWwuY3Vyc29ySW5mb3MpIHtcclxuICAgICAgICAgICAgLy8gZm9yIGFsbCBhdmFpbGFibGUgbWVyZ2VkIGN1cnNvciBpbmZvc1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZUN1cnNvclNpZ25hbC5jdXJzb3JJbmZvcy5mb3JFYWNoKCh0ZW1wbGF0ZUN1cnNvclNpZ25hbEluZm8pID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGVtcGxhdGVDdXJzb3JTaWduYWxJbmZvLnZpc2libGUgIT09IHRoaXMuX2luZGV0ZXJtaW5hdGVTdGF0ZVZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSBjdXJzb3IgaW5mb3MgYnkgaWRcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbWF0Y2hpbmdDdXJzb3JJbmZvczogQXJyYXk8Q3Vyc29ySW5mbz4gPSB0aGlzLnJldHJpZXZDdXJzb3JJbmZvc0J5SWQoY3Vyc29yU2lnbmFscywgdGVtcGxhdGVDdXJzb3JTaWduYWxJbmZvLmlkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZm9yIGFsbCBzZWxlY3RlZCBjdXJzb3IgaW5mb3Mgd2l0aCBtYXRjaGluZyBpZCAuLi5cclxuICAgICAgICAgICAgICAgICAgICBtYXRjaGluZ0N1cnNvckluZm9zLmZvckVhY2goKGN1cnNvclNpZ25hbEluZm8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2V0IHRoZSBjdXJzb3Igc2lnbmFscyB2aXNpYmlsaXR5IGZyb20gdGhlIHRlbXBsYXRlIHZhbHVlIGlmIGEgdmFsaWQgc3RhdGUgaXMgZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3JTaWduYWxJbmZvLnZpc2libGUgPSB0ZW1wbGF0ZUN1cnNvclNpZ25hbEluZm8udmlzaWJsZTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldHMgdGhlIGN1cnNvciBpbmZvcyB3aXRoIHRoZSBzcGVjaWZpZWQgaWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxDdXJzb3JTaWduYWw+fSBjdXJzb3JTaWduYWxzXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY3Vyc29ySW5mb0lkXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8Q3Vyc29ySW5mbz59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJldHJpZXZDdXJzb3JJbmZvc0J5SWQoY3Vyc29yU2lnbmFsczogQXJyYXk8Q3Vyc29yU2lnbmFsPiwgY3Vyc29ySW5mb0lkOiBzdHJpbmcpOiBBcnJheTxDdXJzb3JJbmZvPiB7XHJcbiAgICAgICAgbGV0IG1hdGNoaW5nQ3Vyc29ySW5mb3M6IEFycmF5PEN1cnNvckluZm8+ID0gW107XHJcbiAgICAgICAgY3Vyc29yU2lnbmFscy5mb3JFYWNoKChjdXJzb3JTaWduYWwpID0+IHtjdXJzb3JTaWduYWwuY3Vyc29ySW5mb3MuZm9yRWFjaCgoY3Vyc29yU2lnbmFsSW5mbykgPT4geyBcclxuICAgICAgICAgICAgICAgIGlmIChjdXJzb3JTaWduYWxJbmZvLmlkID09PSBjdXJzb3JJbmZvSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXRjaGluZ0N1cnNvckluZm9zLnB1c2goY3Vyc29yU2lnbmFsSW5mbyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gbWF0Y2hpbmdDdXJzb3JJbmZvcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJhaXNlcyB0aGUgbW92ZSBjdXJzb3IgZXZlbnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY3Vyc29ySW5kZXhcclxuICAgICAqIEBwYXJhbSB7Q3Vyc29yTW92ZW1lbnR9IG1vdmVtZW50XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb25Nb3ZlQ3Vyc29yKGN1cnNvckluZGV4OiBudW1iZXIsIG1vdmVtZW50OiBDdXJzb3JNb3ZlbWVudCkge1xyXG4gICAgICAgIGxldCBkYXRhOiBCYXNlU2VyaWVzIFtdID0gW107XHJcbiAgICAgICAgbGV0IGN1cnNvcnNTdG9yZSA6Q3Vyc29yU3RhdGVzID0gdGhpcy5zdGF0ZXMucmVhZChDdXJzb3JTdGF0ZXMsIHRoaXMuY3Vyc29yU3RhdGVzSWQpO1xyXG4gICAgICAgIGxldCB4ID0gY3Vyc29yc1N0b3JlLmdldFBvc2l0aW9uKGN1cnNvckluZGV4LCBjdXJzb3JzU3RvcmUuZ2V0TGFzdEN1cnNvclR5cGVTZWxlY3RlZCgpKTtcclxuXHJcbiAgICAgICAgbGV0IGN1cnNvcnMgPSB0aGlzLl9jdXJzb3JTaWduYWxzRGF0YU1vZGVsLmdldEN1cnNvclNpZ25hbHMoKTtcclxuICAgICAgICBjdXJzb3JzLmZvckVhY2goY3Vyc29yID0+IHtcclxuICAgICAgICAgICAgZGF0YS5wdXNoKGN1cnNvci5zZXJpZSlcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZih4ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZUN1cnNvcihjdXJzb3JJbmRleCwgbW92ZW1lbnQsIGRhdGEsIHgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIG1vdmVzIHRoZSBjdXJzb3IgZm9yIHRoZSBzcGVjaWZpZWQgZGlyZWN0aW9uIGFuZCBvZmZzZXRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGN1cnNvckluZGV4XHJcbiAgICAgKiBAcGFyYW0ge0N1cnNvck1vdmVtZW50fSBjdXJzb3JNb3ZlbWVudFxyXG4gICAgICogQHBhcmFtIHtCYXNlU2VyaWVzW119IHNlcmllc1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGN1cnNvclBvc2l0aW9uXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG1vdmVDdXJzb3IoY3Vyc29ySW5kZXg6IG51bWJlciwgY3Vyc29yTW92ZW1lbnQ6Q3Vyc29yTW92ZW1lbnQsc2VyaWVzOkJhc2VTZXJpZXNbXSxjdXJzb3JQb3NpdGlvbjpudW1iZXIpIHtcclxuICAgICAgICBsZXQgY3Vyc29yc1N0YXRlcyA6IEN1cnNvclN0YXRlcyA9IHRoaXMuc3RhdGVzLnJlYWQoQ3Vyc29yU3RhdGVzLCB0aGlzLmN1cnNvclN0YXRlc0lkKTtcclxuICAgICAgICBsZXQgY3Vyc29yVHlwZTogQ3Vyc29yVHlwZSA9IGN1cnNvcnNTdGF0ZXMuZ2V0TGFzdEN1cnNvclR5cGVTZWxlY3RlZCgpO1xyXG4gICAgICAgIC8vIGdldCB0aGUgbmV4dCBwb3NzaWJsZSBjdXJzb3IgdGltZXN0YW1wXHJcbiAgICAgICAgbGV0IG5lYXJlc3RUaW1lc3RhbXAgPSB0aGlzLmZpbmROZWFyZXN0VGltZXN0YW1wSW5TZXJpZXMoc2VyaWVzLCBjdXJzb3JQb3NpdGlvbiwgY3Vyc29yTW92ZW1lbnQsIGN1cnNvclR5cGUpO1xyXG5cclxuICAgICAgICAvLyB1cGRhdGUgdGhlIGN1cnNvcnMgdGltZXN0YW1wIGxvY2F0aW9uXHJcbiAgICAgICAgdGhpcy51cGRhdGVDdXJzb3JMb2NhdGlvbihjdXJzb3JJbmRleCwgbmVhcmVzdFRpbWVzdGFtcCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBzZWFyY2hlcyB0aGUgbmV4dCB0aW1lc3RhbXAgaW4gYWxsIGF2YWlsYWJsZSBzZXJpZXMuIFRoZSBwaWNrZWQgdmFsdWUgdGFrZXMgdGhlIG1vdmVtZW50IGRpcmVjdGlvbiBpbnRvaSBhY2NvdW50LlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXNbXX0gc2VyaWVzXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY3Vyc29yVGltZVN0YW1wXHJcbiAgICAgKiBAcGFyYW0ge0N1cnNvck1vdmVtZW50fSBjdXJzb3JNb3ZlbWVudFxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZmluZE5lYXJlc3RUaW1lc3RhbXBJblNlcmllcyhzZXJpZXM6IEJhc2VTZXJpZXNbXSwgY3Vyc29yVGltZVN0YW1wOiBudW1iZXIsIGN1cnNvck1vdmVtZW50OiBDdXJzb3JNb3ZlbWVudCwgY3Vyc29yVHlwZTogQ3Vyc29yVHlwZSk6IG51bWJlciB7XHJcbiAgICAgICAgLy8gcmV0cmlldmUgdGhlIHRpbWVzdGFtcHMgc2VyaWVzIGZyb20gdGhlIHNpZ25hbCBzZXJpZXNcclxuICAgICAgICBsZXQgdGltZXN0YW1wU2VyaWVzID0gc2VyaWVzLm1hcCgoc2luZ2xlU2VyaWVzKSA9PiB7IFxyXG4gICAgICAgICAgICBpZiAoc2luZ2xlU2VyaWVzLmN1cnNvclR5cGUgPT0gY3Vyc29yVHlwZSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2luZ2xlU2VyaWVzLnRpbWVzdGFtcHM7IFxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBuZXh0TmVhcmVzdFRpbWVTdGFtcCA9IGN1cnNvclRpbWVTdGFtcDtcclxuXHJcbiAgICAgICAgLy8gZHBlbmRpdW5nIG9uIG1vdmVtZW50IGRpcmVjdGlvbiB3ZSBwaWNrIHRoZSBuZXh0IHBvc3NpYmxlIHRpbWUgc3RhbXBcclxuICAgICAgICBzd2l0Y2ggKGN1cnNvck1vdmVtZW50KSB7XHJcbiAgICAgICAgICAgIGNhc2UgQ3Vyc29yTW92ZW1lbnQuUmlnaHQ6XHJcbiAgICAgICAgICAgICAgICBuZXh0TmVhcmVzdFRpbWVTdGFtcCA9IFNlcmllc0hlbHBlci5maW5kTmVhcmVzdFZhbHVlRnJvbUNvbGxlY3Rpb24oY3Vyc29yVGltZVN0YW1wLCB0aW1lc3RhbXBTZXJpZXMsIFNlYXJjaE1vZGUuTkVYVFVQUEVSKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEN1cnNvck1vdmVtZW50LkxlZnQ6XHJcbiAgICAgICAgICAgICAgICBuZXh0TmVhcmVzdFRpbWVTdGFtcCA9IFNlcmllc0hlbHBlci5maW5kTmVhcmVzdFZhbHVlRnJvbUNvbGxlY3Rpb24oY3Vyc29yVGltZVN0YW1wLCB0aW1lc3RhbXBTZXJpZXMsIFNlYXJjaE1vZGUuUFJFVklPVVNMT1dFUik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5leHROZWFyZXN0VGltZVN0YW1wO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlIGN1cnNvciBhY3RpdmF0aW9uL3NlbGVjdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjdXJzb3JJbmRleFxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIG9uUmVmZXJlbmNlQ3Vyc29yU2VsZWN0ZWQoY3Vyc29ySW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgY3Vyc29yIHNlbGVjdGlvbiBzdGF0ZVxyXG4gICAgICAgIGxldCBjdXJzb3JTdGF0ZXM6IEN1cnNvclN0YXRlcyA9IHRoaXMuc3RhdGVzLnJlYWQoQ3Vyc29yU3RhdGVzLCB0aGlzLmN1cnNvclN0YXRlc0lkKTtcclxuICAgICAgICBjdXJzb3JTdGF0ZXMuc2V0U2VsZWN0ZWQoY3Vyc29ySW5kZXgsIHRydWUpO1xyXG4gICAgICAgIHRoaXMuc3RhdGVzLnVwZGF0ZShDdXJzb3JTdGF0ZXMsIGN1cnNvclN0YXRlcywgdGhpcy5jdXJzb3JTdGF0ZXNJZCk7XHJcblxyXG4gICAgICAgIC8vIHNldCB0aGUgY3Vyc29ycyBhcyBhY3RpdmUgdG9vbFxyXG4gICAgICAgIGxldCB0b29sc3RhdGU6IENoYXJ0Vmlld1Rvb2xTdGF0ZSA9IHRoaXMuc3RhdGVzLnJlYWQoQ2hhcnRWaWV3VG9vbFN0YXRlLFwiQ2hhcnRWaWV3VG9vbFN0YXRlXCIpO1xyXG4gICAgICAgIHRvb2xzdGF0ZS5zZWxlY3RlZFRvb2wgPSBDaGFydFZpZXdUb29sU3RhdGVFbnVtLkNVUlNPUlM7XHJcbiAgICAgICAgdGhpcy5zdGF0ZXMudXBkYXRlKENoYXJ0Vmlld1Rvb2xTdGF0ZSwgdG9vbHN0YXRlLFwiQ2hhcnRWaWV3VG9vbFN0YXRlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIHNpZ25hbCB0byB0aGUgY3Vyc29yIGluZm8gd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxCYXNlU2VyaWVzPn0gc2VyaWVzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkU2VyaWVzKHNlcmllczogQXJyYXk8QmFzZVNlcmllcz4pe1xyXG4gICAgICAgIGxldCBjdXJzb3JTaWduYWxzID0gbmV3IEFycmF5PEN1cnNvclNpZ25hbD4oKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNlcmllcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmIChzZXJpZXNbaV0udHlwZSA9PT0gU2VyaWVzVHlwZS50aW1lU2VyaWVzKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJzb3JTaWduYWxzLnB1c2gobmV3IFlUQ3Vyc29yU2lnbmFsKHNlcmllc1tpXSkpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNlcmllc1tpXS50eXBlID09PSBTZXJpZXNUeXBlLnh5U2VyaWVzKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJzb3JTaWduYWxzLnB1c2gobmV3IFhZQ3Vyc29yU2lnbmFsKHNlcmllc1tpXSkpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNlcmllc1tpXS50eXBlID09PSBTZXJpZXNUeXBlLmZmdFNlcmllcykge1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yU2lnbmFscy5wdXNoKG5ldyBGRlRDdXJzb3JTaWduYWwoc2VyaWVzW2ldKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2N1cnNvclNpZ25hbHNEYXRhTW9kZWwuYWRkU2lnbmFsKGN1cnNvclNpZ25hbHMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlIGEgY3Vyc29yIHNpZ25hbCBmcm9tIHRoZSBjdXJzb3IgaW5mbyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNlcmllXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVtb3ZlU2VyaWUoc2VyaWU6IEJhc2VTZXJpZXMpe1xyXG4gICAgICAgIGxldCBjdXJzb3JTaWduYWwgPSB0aGlzLl9jdXJzb3JTaWduYWxzRGF0YU1vZGVsLmdldEN1cnNvclNpZ25hbChzZXJpZSk7XHJcbiAgICAgICAgaWYoY3Vyc29yU2lnbmFsKXtcclxuICAgICAgICAgICAgdGhpcy5fY3Vyc29yU2lnbmFsc0RhdGFNb2RlbC5yZW1vdmVTZXJpZShjdXJzb3JTaWduYWwpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy9EaXNhYmxlcyBmaWx0ZXIgYnV0dG9uIGlmIGlzIGFjdGl2ZVxyXG4gICAgICAgICAgICBpZih0aGlzLl90b29sYmFyLmN1cnNvckluZm9TZWxlY3Rpb25Jc0FjdGl2ZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90b29sYmFyLmN1cnNvckluZm9TZWxlY3Rpb25Jc0FjdGl2ZSA9ICF0aGlzLl90b29sYmFyLmN1cnNvckluZm9TZWxlY3Rpb25Jc0FjdGl2ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2xiYXIuYWN0aXZhdGVDdXJzb3JJbmZvU2VsZWN0b3JWaWV3KHRoaXMsIHRoaXMuX3Rvb2xiYXIuY3Vyc29ySW5mb1NlbGVjdGlvbklzQWN0aXZlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gUmVtb3ZlcyB0aGUgY3Vyc29yIHNpZ25hbCBmcm9tIHRoZSBjdXJyZW50IHNlbGVjdGlvbiBsaXN0IGFuZCB1cGRhdGVzIHRoZSB0b29sYmFyIGJ1dHRvblxyXG4gICAgICAgICAgICBpZih0aGlzLl9zZWxlY3RlZEN1cnNvclNpZ25hbHMgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMuX3NlbGVjdGVkQ3Vyc29yU2lnbmFscy5pbmRleE9mKGN1cnNvclNpZ25hbCk7XHJcbiAgICAgICAgICAgICAgICBpZihpbmRleCAhPSAtMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRDdXJzb3JTaWduYWxzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRDdXJzb3JJbmZvU2VsZWN0b3JCdXR0b25TdGF0ZSh0aGlzLl9zZWxlY3RlZEN1cnNvclNpZ25hbHMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY2hhbmdlcyBhbmQgdXBkYXRlcyB0aGUgY3Vyc29yIGxvY2F0aW9uIG9mIHRoZSBzZWxlY3RlZCBjdXJzb3JcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY3Vyc29ySW5kZXhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjdXJzb3JUaW1lc3RhbXBcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB1cGRhdGVDdXJzb3JMb2NhdGlvbihjdXJzb3JJbmRleDogbnVtYmVyLCBjdXJzb3JUaW1lc3RhbXA6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBjdXJzb3JzU3RhdGVzOiBDdXJzb3JTdGF0ZXMgPSB0aGlzLnN0YXRlcy5yZWFkKEN1cnNvclN0YXRlcywgdGhpcy5jdXJzb3JTdGF0ZXNJZCk7XHJcbiAgICAgICAgY3Vyc29yc1N0YXRlcy5zZXRQb3NpdGlvbihjdXJzb3JJbmRleCwgY3Vyc29yVGltZXN0YW1wKTtcclxuICAgICAgICB0aGlzLnN0YXRlcy51cGRhdGUoQ3Vyc29yU3RhdGVzLCBjdXJzb3JzU3RhdGVzLCB0aGlzLmN1cnNvclN0YXRlc0lkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlZnJlc2hlcyB0aGUgdHJlZSBncmlkcyBkYXRhXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVmcmVzaCgpe1xyXG4gICAgICAgIC8vIHJlZnJlc2ggdHJlZSBncmlkIG9ubHkgaWYgY3Vyc29yIHNpZ25hbCB2aWV3IGlzIGFjdGl2ZSAobm90IGluIGNhc2Ugb2YgY3Vyc29yIGluZm8gc2VsZWN0b3IpXHJcbiAgICAgICAgaWYoIXRoaXMuX2N1cnNvckluZm9TZWxlY3RvcklzQWN0aXZlKXtcclxuICAgICAgICAgICAgbGV0IGN1cnNvclNpZ25hbHMgPSB0aGlzLl9jdXJzb3JTaWduYWxzRGF0YU1vZGVsLmdldEN1cnNvclNpZ25hbHMoKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVEYXRhU291cmNlKGN1cnNvclNpZ25hbHMpO1xyXG5cclxuICAgICAgICAgICAgLy8gc2V0IHRoZSBzZWxlY3Rpb24gdG8gdGhlIHNlbGVjdCBzaWduYWwgYmVmb3JlXHJcbiAgICAgICAgICAgIGxldCB0cmVlR3JpZE9iamVjdDogYW55ID0gdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFNlbGVjdGlvbldpdGhDdXJzb3JTaWduYWxzKHRyZWVHcmlkT2JqZWN0LCB0aGlzLl9zZWxlY3RlZEN1cnNvclNpZ25hbHMpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gVXBkYXRlIGN1cnNvciBpbmZvIHZhbHVlcyBcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ3Vyc29yU3RhdGVzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVHJpZ2dlciB0aGUgdXBkYXRlIG9mIHRoZSBjdXJzb3JJbmZvcyBmb3IgdGhlIGN1cnJlbnQgY3Vyc29yIHN0YXRlc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlZnJlc2hDdXJzb3JTdGF0ZXMoKXtcclxuICAgICAgICB0aGlzLnN0YXRlcy5yZWZyZXNoKEN1cnNvclN0YXRlcywgKG1vZGlmaWVkU3RhdGU6IEN1cnNvclN0YXRlcywgb2xkU3RhdGU6IEN1cnNvclN0YXRlcykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUluZm9DdXJzb3JzV2l0aE5ld1N0YXRlVmFsdWVzKG1vZGlmaWVkU3RhdGUpO1xyXG4gICAgICAgIH0sIHRoaXMuY3Vyc29yU3RhdGVzSWQpXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVEYXRhU291cmNlKGN1cnNvclNpZ25hbHM6IEFycmF5PEN1cnNvclNpZ25hbD4pe1xyXG4gICAgICAgIHRoaXMuc2V0Q3Vyc29yVmFsdWVVaUlkcyhjdXJzb3JTaWduYWxzKTtcclxuXHJcbiAgICAgICAgLy8gUmVmcmVzaCBUcmVlR3JpZCB3aXRoIG5ldyBkYXRhc291cmNlXHJcbiAgICAgICAgdGhpcy5zZXRNb2RlbChjdXJzb3JTaWduYWxzKTtcclxuXHJcbiAgICAgICAgLy8gUmVmcmVzaCB0aGUgY3Vyc29yIHZhbHVlcyBhZnRlciB1cGRhdGluZyB0aGUgbW9kZWxcclxuICAgICAgICB0aGlzLnJlZnJlc2hDdXJzb3JWYWx1ZXMoY3Vyc29yU2lnbmFscyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIGFuZCBzZXRzIHVpZHMgZm9yIGV2ZXJ5IGN1cnNvciB2YWx1ZSAoY3Vyc29yIHNpZ25hbHMgYW5kIGN1cnNvciBpbmZvcylcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxDdXJzb3JTaWduYWw+fSBjdXJzb3JTaWduYWxzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldEN1cnNvclZhbHVlVWlJZHMoY3Vyc29yU2lnbmFsczogQXJyYXk8Q3Vyc29yU2lnbmFsPikge1xyXG4gICAgICAgIGxldCBjdXJzb3JJbmZvSWQgPSAwO1xyXG4gICAgICAgIGN1cnNvclNpZ25hbHMuZm9yRWFjaCgoY3Vyc29yU2lnbmFsKT0+e1xyXG4gICAgICAgICAgICAoPElVaUJpbmRpbmc+PGFueT5jdXJzb3JTaWduYWwpLnVpSWQgPSBjdXJzb3JJbmZvSWQrKztcclxuICAgICAgICAgICAgY3Vyc29yU2lnbmFsLmN1cnNvckluZm9zLmZvckVhY2goKGN1cnNvckluZm8pPT57XHJcbiAgICAgICAgICAgICAgICAgKDxJVWlCaW5kaW5nPjxhbnk+Y3Vyc29ySW5mbykudWlJZCA9IGN1cnNvckluZm9JZCsrO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVmcmVzaCBhbGwgY3Vyc29yIHZhbHVlc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PEN1cnNvclNpZ25hbD59IGN1cnNvclNpZ25hbHNcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVmcmVzaEN1cnNvclZhbHVlcyhjdXJzb3JTaWduYWxzOiBBcnJheTxDdXJzb3JTaWduYWw+KSB7ICAgICAgICAgICAgICAgXHJcbiAgICAgICAgY3Vyc29yU2lnbmFscy5mb3JFYWNoKChjdXJzb3JTaWduYWwpPT57IFxyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hDdXJzb3JWYWx1ZUZpZWxkKGN1cnNvclNpZ25hbCk7XHJcbiAgICAgICAgICAgIGN1cnNvclNpZ25hbC5jdXJzb3JJbmZvcy5mb3JFYWNoKChjdXJzb3JJbmZvKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ3Vyc29yVmFsdWVGaWVsZChjdXJzb3JJbmZvKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHVwZGF0ZXMgYSBjdXJzb3IgdmFsdWUgZmllbGQgd2l0aCB0aGUgY3VycmVudCB2YWx1ZXMgb2YgdGhlIGNvcnJlc3BvbmRpZyBjdXJzb3Igc2lnbmFsIG9yIGluZm9cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtDdXJzb3JTaWduYWx8Q3Vyc29ySW5mb30gY3Vyc29yU2lnbmFsT3JJbmZvXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlZnJlc2hDdXJzb3JWYWx1ZUZpZWxkKGN1cnNvclNpZ25hbE9ySW5mbzogQ3Vyc29yU2lnbmFsfEN1cnNvckluZm8pIHtcclxuICAgICAgICBpZiAoY3Vyc29yU2lnbmFsT3JJbmZvKSB7XHJcbiAgICAgICAgICAgIC8vIGdldCB0aGUgY29ycmVzcG9uZGluZyB1aSBlbGVtZW50XHJcbiAgICAgICAgICAgIGxldCBjdXJzb3JWYWx1ZUVsZW1lbnQgPSB0aGlzLmdldEN1cnNvclZhbHVlRWxlbWVudChjdXJzb3JTaWduYWxPckluZm8pO1xyXG5cclxuICAgICAgICAgICAgbGV0IHZhbHVlU3RyaW5nOiBzdHJpbmcgPSBjdXJzb3JTaWduYWxPckluZm8udmFsdWUudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgaWYgKGN1cnNvclZhbHVlRWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yVmFsdWVFbGVtZW50LmlubmVyVGV4dCA9IHZhbHVlU3RyaW5nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgY29ycmVzcG9uZGluZyBjdXJzb3Igc2lnbmFsIG9yIGluZm8gZWxlbWVudFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0N1cnNvclNpZ25hbHxDdXJzb3JJbmZvfSBjdXJzb3JTaWduYWxPckluZm9cclxuICAgICAqIEByZXR1cm5zIHsoSFRNTEVsZW1lbnQgfCBudWxsKX1cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0Q3Vyc29yVmFsdWVFbGVtZW50KGN1cnNvclNpZ25hbE9ySW5mbzogQ3Vyc29yU2lnbmFsfEN1cnNvckluZm8pOiBIVE1MRWxlbWVudCB8IG51bGwge1xyXG4gICAgICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnBhcmVudENvbnRlbnRJZCArIENVUlNPUl9WQUxVRV9JRCArICg8SVVpQmluZGluZz48YW55PmN1cnNvclNpZ25hbE9ySW5mbykudWlJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkN1cnNvclNpZ25hbHNEYXRhTW9kZWxDaGFuZ2VkKHNlbmRlciwgYXJncyl7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBtZXRob2Qgd2lsbCB1cGRhdGUgdGhlIGN1cnNvciBpbmZvIHdpZGdldCB3aXRoIGRhdGEgZnJvbVxyXG4gICAgICogdGhlIGN1cnNvciBzdGF0ZS5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtDdXJzb3JTdGF0ZXN9IG1vZGlmaWVkU3RhdGVcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlSW5mb0N1cnNvcnNXaXRoTmV3U3RhdGVWYWx1ZXMgKG1vZGlmaWVkU3RhdGU6IEN1cnNvclN0YXRlcykge1xyXG4gICAgICAgIHRoaXMuX2N1cnNvclNpZ25hbHNEYXRhTW9kZWwuZ2V0Q3Vyc29yU2lnbmFscygpLmZvckVhY2goKGN1cnNvclNpZ25hbDogQ3Vyc29yU2lnbmFsKT0+e1xyXG4gICAgICAgICAgICBpZihjdXJzb3JTaWduYWwuc2VyaWUucmF3UG9pbnRzVmFsaWQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3Vyc29yU2lnbmFsc0RhdGFNb2RlbC51cGRhdGVDdXJzb3JWYWx1ZXMoY3Vyc29yU2lnbmFsLCBtb2RpZmllZFN0YXRlLmdldFBvc2l0aW9uKDAsIGN1cnNvclNpZ25hbC5zZXJpZS5jdXJzb3JUeXBlKSwgbW9kaWZpZWRTdGF0ZS5nZXRQb3NpdGlvbigxLCBjdXJzb3JTaWduYWwuc2VyaWUuY3Vyc29yVHlwZSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJzb3JTaWduYWxzRGF0YU1vZGVsLmNsZWFyQ3Vyc29yVmFsdWVzKGN1cnNvclNpZ25hbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl90b29sYmFyLnVwZGF0ZUJ1dHRvblN0YXRlcyhtb2RpZmllZFN0YXRlKTtcclxuICAgICAgICB0aGlzLnJlZnJlc2hDdXJzb3JWYWx1ZXModGhpcy5fY3Vyc29yU2lnbmFsc0RhdGFNb2RlbC5nZXRDdXJzb3JTaWduYWxzKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29udmVydCBjdXN0b20gY2hlY2sgYm94ZXMgaW50byBzeW5jZnVzaW9uIGNoZWNrIGJveGVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlQ2hlY2tCb3hlcygpIHtcclxuICAgICAgICB2YXIgY2hlY2tCb3hlcyA9ICQoJy5jdXN0b21DaGVja2JveCcpO1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBjaGVja0JveGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNoZWNrQm94ZXNbaV0uaWQgPSAnY3VzdG9tQ2hlY2tib3gnICsgKGkgKyAxKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdFN5bmNmdXNpb25DaGVja2JveChjaGVja0JveGVzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbnN0YW50aWF0ZSBzeW5jZnVzaW9uIGNoZWNrIGJveFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjdXN0b21DaGVja2JveFxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdFN5bmNmdXNpb25DaGVja2JveChjdXN0b21DaGVja2JveDogSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICB2YXIgZW5hYmxlVHJpU3RhdGUgPSBmYWxzZTtcclxuICAgICAgICB2YXIgc3RhdGUgPSB0aGlzLmdldEN1c3RvbUNoZWNrYm94U3RhdGUoJChjdXN0b21DaGVja2JveCkpO1xyXG4gICAgICAgIGlmIChzdGF0ZSA9PT0gJ2luZGV0ZXJtaW5hdGUnKSB7IGVuYWJsZVRyaVN0YXRlID0gdHJ1ZTsgfVxyXG4gICAgICAgICQoY3VzdG9tQ2hlY2tib3gpLmVqQ2hlY2tCb3goXHJcbiAgICAgICAgICAgIHsgIFxyXG4gICAgICAgICAgICBlbmFibGVUcmlTdGF0ZTogZW5hYmxlVHJpU3RhdGUsXHJcbiAgICAgICAgICAgIGlkOiBjdXN0b21DaGVja2JveC5pZCxcclxuICAgICAgICAgICAgY2hlY2tTdGF0ZTogc3RhdGUsXHJcbiAgICAgICAgICAgIGNoYW5nZTogKGFyZ3MpID0+IHRoaXMuc3luY2Z1c2lvbkNoZWNrQm94Q2hhbmdlZChhcmdzKSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUcmlnZ2VyIGNoZWNrIGJveCBjaGFuZ2UgZXZlbnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN5bmNmdXNpb25DaGVja0JveENoYW5nZWQoYXJncykge1xyXG4gICAgICAgIGlmIChhcmdzLm1vZGVsLmVuYWJsZVRyaVN0YXRlKSB7XHJcbiAgICAgICAgICAgICQoJyMnICsgYXJncy5tb2RlbC5pZCkuZWpDaGVja0JveCh7ZW5hYmxlVHJpU3RhdGU6IGZhbHNlfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2V0U2VsZWN0ZWRDdXJzb3JzSW5mbyhhcmdzKTtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgY3VzdG9tQ2hlY2tib3ggPSAkKCcjJyArIGFyZ3MubW9kZWwuaWQpO1xyXG4gICAgICAgIGN1c3RvbUNoZWNrYm94LmNoYW5nZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHNlbGVjdGVkIGN1cnNvciBpbmZvIHdoZW4gY2hlY2tib3ggaXMgY2xpY2tlZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgc2V0U2VsZWN0ZWRDdXJzb3JzSW5mbyhhcmdzKXtcclxuICAgICAgICB2YXIgdHJlZWdyaWQ6IGFueSA9IHRoaXMuZ2V0VHJlZUdyaWRPYmplY3QoKTtcclxuICAgICAgICB2YXIgaW5kZXggPSBwYXJzZUludChhcmdzLm1vZGVsLmlkLnNwbGl0KCdjdXN0b21DaGVja2JveCcpWzFdLCAxMCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuX3NlbGVjdGVkQ3Vyc29ySW5mb3NPbGQgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkQ3Vyc29ySW5mb3NPbGQgPSB0cmVlZ3JpZC5tb2RlbC5mbGF0UmVjb3Jkc1tpbmRleF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZEN1cnNvckluZm9zT2xkID0gdGhpcy5fc2VsZWN0ZWRDdXJzb3JJbmZvc05ldztcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWRDdXJzb3JJbmZvc05ldyA9IHRyZWVncmlkLm1vZGVsLmZsYXRSZWNvcmRzW2luZGV4XTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldCBzdGF0ZSBvZiBjaGVja2JveFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0pRdWVyeTxIVE1MRWxlbWVudD59IGNoZWNrYm94XHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRDdXN0b21DaGVja2JveFN0YXRlKGNoZWNrYm94OiBKUXVlcnk8SFRNTEVsZW1lbnQ+KTogc3RyaW5nIHtcclxuICAgICAgICBpZiAoY2hlY2tib3guaXMoJzpjaGVja2VkJykpIHtcclxuICAgICAgICAgICAgcmV0dXJuICdjaGVjayc7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjaGVja2JveC5pcygnOmluZGV0ZXJtaW5hdGUnKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJ2luZGV0ZXJtaW5hdGUnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuICd1bmNoZWNrJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IEN1cnNvckluZm9XaWRnZXQgfTsiXX0=