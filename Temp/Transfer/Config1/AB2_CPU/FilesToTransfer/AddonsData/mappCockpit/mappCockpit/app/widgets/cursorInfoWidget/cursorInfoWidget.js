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
define(["require", "exports", "./interfaces/cursorInfoWidgetInterface", "../common/treeGridWidgetBase", "./view/cursorInfoTreeGridToolbar", "./model/ytCursorSignal", "./model/xyCursorSignal", "./model/fftCursorSignal", "./model/cursorInfo", "../common/states/cursorStates", "./model/dynamicCursorSignalTemplate", "./model/cursorSignal", "../../common/seriesHelper", "../../common/utilities/binSearch", "../common/states/chartViewToolbarStates", "../../models/chartManagerDataModel/seriesType", "./defaultComponentSettings", "../../models/chartManagerDataModel/chartManagerDataModel"], function (require, exports, cursorInfoWidgetInterface_1, treeGridWidgetBase_1, cursorInfoTreeGridToolbar_1, ytCursorSignal_1, xyCursorSignal_1, fftCursorSignal_1, cursorInfo_1, cursorStates_1, dynamicCursorSignalTemplate_1, cursorSignal_1, seriesHelper_1, binSearch_1, chartViewToolbarStates_1, seriesType_1, defaultComponentSettings_1, chartManagerDataModel_1) {
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
            _this._cursorInfoTemplateDataModel = new Array();
            _this._cursorSignalsDataModelChangedHandler = function (sender, args) { return _this.onCursorSignalsDataModelChanged(sender, args); };
            _this._chartManagerModelChangedHandler = function (sender, data) { return _this.onChartManagerModelChanged(sender, data); };
            _this._selectedCursorSignals = new Array();
            _this._cursorInfoSelectorIsActive = false;
            _this._columnId_Visible = "visible";
            _this._columnId_Name = "name";
            _this._columnId_Value = "value";
            _this._columnId_Description = "description";
            _this._columnId_IconDefinition = "iconDefinition";
            _this._indeterminateStateValue = "indeterminate";
            // holds the current cursor states values. We initialize the member for default. The effective initialization takes place when the external shared instance
            // of the cursor states is created and reflected through the curorStates setter!
            _this._cursorStates = new cursorStates_1.CursorStates();
            return _this;
        }
        /**  initialize the widget
         *
         * @param {string} layoutContainerId
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.initialize = function (layoutContainerId) {
            _super.prototype.setHeaderFilterBarHidden.call(this); // Must be set before initialization to avoid showing the filterbar
            _super.prototype.initialize.call(this, layoutContainerId, 30);
        };
        CursorInfoWidget.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            // Get cursor signals datamodel
            this._cursorSignalsDataModel = this.component.getSubComponent(defaultComponentSettings_1.DefaultComponentSettings.CursorSignalsDataModelId);
            // Attach cursor signals datamodel event
            if (this._cursorSignalsDataModel != undefined) {
                this._cursorSignalsDataModel.eventModelChanged.attach(this._cursorSignalsDataModelChangedHandler);
            }
            // Get cursor signals datamodel
            this._chartManagerDataModel = this.component.getSubComponent(defaultComponentSettings_1.DefaultComponentSettings.ChartManagerDataModelId);
            this.attachChartManagerDataModelEvents();
            // Refresh treeGrid to see the loaded persisting data
            this.refresh();
            // Initialize scrollbars positions
            var scrollbarSettings = this.component.getSetting(treeGridWidgetBase_1.TreeGridWidgetBase.ScrollbarsSettingsId);
            this.setScrollBarSettings(scrollbarSettings);
            _super.prototype.setHeaderContent.call(this, "Cursors");
            // Set dynamic column settings
            _super.prototype.setDynamicColumn.call(this, 1, 80);
        };
        CursorInfoWidget.prototype.initializeComponent = function () {
            this.component.defaultSettingsDataId = defaultComponentSettings_1.DefaultComponentSettings.WidgetDefinitionId;
        };
        Object.defineProperty(CursorInfoWidget.prototype, "cursorsStates", {
            /**
             * Gets the cursors states
             *
             * @protected
             * @type {CursorStates}
             * @memberof ChartViewToolbar
             */
            get: function () {
                return this._cursorStates;
            },
            /**
             * Sets the cursors states. The method is called automatically whenever a cursor state has been changed externally.
             *
             * @protected
             * @memberof ChartViewToolbar
             */
            set: function (cursorStates) {
                // update the backup field
                this._cursorStates = cursorStates;
                this.updateInfoCursorsWithNewStateValues(cursorStates);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Updates the cursor states.
         *
         * @protected
         * @param {CursorStates} cursorStates
         * @memberof ChartBase
         */
        CursorInfoWidget.prototype.updateCursorStates = function (cursorStates) {
            // BINDINGSOURCE: dispatches the method call to bound targets
        };
        CursorInfoWidget.prototype.dispose = function () {
            this.detachChartManagerDataModelEvents();
            if (this._cursorSignalsDataModel != undefined) {
                // Detach cursor signals datamodel events
                this._cursorSignalsDataModel.eventModelChanged.detach(this._cursorSignalsDataModelChangedHandler);
                // Dispose cursor signals datamodel
                this._cursorSignalsDataModel.dispose();
            }
            _super.prototype.dispose.call(this);
        };
        /**
         * Returns the default component settings for this widget
         *
         * @returns {(ComponentSettings|undefined)}
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.getDefaultComponentSettings = function () {
            return defaultComponentSettings_1.DefaultComponentSettings.getCursorInfoWidgetDefinition();
        };
        CursorInfoWidget.prototype.getComponentSettings = function (onlyModified) {
            return _super.prototype.getComponentSettings.call(this, onlyModified);
        };
        CursorInfoWidget.prototype.setComponentSettings = function (data) {
            if (data != undefined) {
                _super.prototype.setComponentSettings.call(this, data);
            }
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
            $(this.cssParentContentId).ejTreeGrid(__assign(__assign(__assign(__assign(__assign({}, this.getTreeGridColumnDefinition()), this.getTreeGridColumnResizeSupport()), this.getTreeGridCellEditSupport()), this.getTreeGridToolbarSupport()), { 
                //dataSource: this._cursorSignalsDataModel.getCursorSignals(),
                childMapping: "cursorInfos", expandStateMapping: "expandState", isResponsive: true, treeColumnIndex: 1, allowFiltering: true, rowHeight: 28, 
                // Set init size to draw the toolbar icons at the right position
                sizeSettings: { height: '200px', width: '200px' }, selectionType: ej.TreeGrid.SelectionType.Multiple, expanded: function (args) { return _this.treeGridNodeExpandedOrCollapsed(); }, collapsed: function (args) { return _this.treeGridNodeExpandedOrCollapsed(); }, rowSelected: function (args) { return _this.treeGridRowSelected(args); }, create: function (args) { return _this.treeGridCreated(); }, actionBegin: function (args) { return _this.treeGridActionBegin(args); }, queryCellInfo: function (args) { return _this.queryCellInfo(args); } }));
        };
        CursorInfoWidget.prototype.treeGridNodeExpandedOrCollapsed = function () {
            // Refresh to see correct expanded/collapsed icon
            this.refresh();
            // Persist expandState in dataModel
            if (this._cursorSignalsDataModel !== undefined) {
                this._cursorSignalsDataModel.saveSettings();
            }
            // Persist scrollbar state in cursorInfoWidget
            this.saveTreeGridSettings();
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
                this.updateCursorInfoSelectorButtonState();
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
         * @returns
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.updateCursorInfoSelectorButtonState = function () {
            if (this._selectedCursorSignals == undefined) {
                // no items selected deactivate Filter button
                this._toolbar.disableCursorInfoSelectorButton(true);
                return;
            }
            if (this._selectedCursorSignals.length < 1) {
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
                // Update cursor info visibilities if something has changed
                this.setCursorInfoVisibilities(this._selectedCursorSignals, this._cursorInfoTemplateDataModel[0]);
                // Update dataModel
                this._cursorSignalsDataModel.saveSettings();
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
            this.refreshCursorValues();
            // Just persist column resize when filter is closed
            if (!this._cursorInfoSelectorIsActive) {
                this.saveTreeGridSettings();
            }
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
            this.refreshCursorValues();
            this._toolbar.resize(width);
        };
        CursorInfoWidget.prototype.activateCursorInfoSelectorView = function (activate) {
            this._toolbar.activateCursorInfoSelectorView(activate);
            if (activate == true) {
                this.showCursorInfoSelectorView();
            }
            else {
                this.showCursorSignalsView();
            }
            // Update toolbar button positions(e.g. position of right align toolbar) after hide or show toolbar button
            this._toolbar.resize(this.width);
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
            this.refreshCursorValues();
        };
        /**
         * Shows the cursor info selector view
         *
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.showCursorInfoSelectorView = function () {
            this._cursorInfoSelectorIsActive = true;
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
                var model = treeGridObject.model;
                for (var j = 0; j < model.flatRecords.length; j++) {
                    if (model.flatRecords[j].item == cursorSignals[i]) {
                        treeGridObject.selectRows(visibleIndex);
                    }
                    if (model.flatRecords[j].visible != "false") {
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
            var x = this.cursorsStates.getPosition(cursorIndex, this.cursorsStates.getLastCursorTypeSelected());
            if (this._cursorSignalsDataModel != undefined) {
                var cursors = this._cursorSignalsDataModel.getCursorSignals();
                cursors.forEach(function (cursor) {
                    data.push(cursor.serie);
                });
                if (x != undefined) {
                    this.moveCursor(cursorIndex, movement, data, x);
                }
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
            var cursorType = this.cursorsStates.getLastCursorTypeSelected();
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
            this.cursorsStates.setSelected(cursorIndex, true);
            this.updateCursorStates(this.cursorsStates);
            // set the cursors as active tool
            var toolstate = this.states.read(chartViewToolbarStates_1.ChartViewToolState, "ChartViewToolState");
            toolstate.selectedTool = chartViewToolbarStates_1.ChartViewToolStateEnum.CURSORS;
            this.states.update(this, chartViewToolbarStates_1.ChartViewToolState, toolstate, "ChartViewToolState");
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
                    cursorSignals.push(new ytCursorSignal_1.YTCursorSignal(series[i], false));
                }
                else if (series[i].type === seriesType_1.SeriesType.xySeries) {
                    cursorSignals.push(new xyCursorSignal_1.XYCursorSignal(series[i], false));
                }
                else if (series[i].type === seriesType_1.SeriesType.fftSeries) {
                    cursorSignals.push(new fftCursorSignal_1.FFTCursorSignal(series[i], false));
                }
            }
            if (this._cursorSignalsDataModel != undefined) {
                this._cursorSignalsDataModel.addSignal(cursorSignals);
            }
        };
        /**
         * Remove a cursor signal from the cursor info widget
         *
         * @param {BaseSeries} serie
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.removeSerie = function (serie) {
            if (this._cursorSignalsDataModel != undefined) {
                var cursorSignal = this._cursorSignalsDataModel.getCursorSignal(serie);
                if (cursorSignal) {
                    this._cursorSignalsDataModel.removeSerie(cursorSignal);
                    // Disables filter button if is active
                    if (this._toolbar.cursorInfoSelectionIsActive) {
                        this._toolbar.activateCursorInfoSelectorView(!this._toolbar.cursorInfoSelectionIsActive);
                    }
                    // Removes the cursor signal from the current selection list and updates the toolbar button
                    var index = this._selectedCursorSignals.indexOf(cursorSignal);
                    if (index != -1) {
                        this._selectedCursorSignals.splice(index, 1);
                        this.updateCursorInfoSelectorButtonState();
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
            this.cursorsStates.setPosition(cursorIndex, cursorTimestamp);
            this.updateCursorStates(this.cursorsStates);
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
                if (this._cursorSignalsDataModel != undefined) {
                    var cursorSignals = this._cursorSignalsDataModel.getCursorSignals();
                    this.updateDataSource(cursorSignals);
                }
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
            this.updateCursorStates(this.cursorsStates);
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
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.refreshCursorValues = function (cursorSignals) {
            var _this = this;
            if (cursorSignals === void 0) { cursorSignals = undefined; }
            if (cursorSignals == undefined && this._cursorSignalsDataModel != undefined) {
                cursorSignals = this._cursorSignalsDataModel.getCursorSignals();
            }
            if (cursorSignals != undefined) {
                cursorSignals.forEach(function (cursorSignal) {
                    _this.refreshCursorValueField(cursorSignal);
                    cursorSignal.cursorInfos.forEach(function (cursorInfo) {
                        _this.refreshCursorValueField(cursorInfo);
                    });
                });
            }
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
            this.saveTreeGridSettings();
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
            if (this._cursorSignalsDataModel != undefined) {
                this._cursorSignalsDataModel.getCursorSignals().forEach(function (cursorSignal) {
                    if (_this._cursorSignalsDataModel != undefined) {
                        if (cursorSignal.serie.rawPointsValid) {
                            _this._cursorSignalsDataModel.updateCursorValues(cursorSignal, modifiedState.getPosition(0, cursorSignal.serie.cursorType), modifiedState.getPosition(1, cursorSignal.serie.cursorType));
                        }
                        else {
                            _this._cursorSignalsDataModel.clearCursorValues(cursorSignal);
                        }
                    }
                });
            }
            this._toolbar.updateButtonStates(modifiedState);
            this.refreshCursorValues();
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
        /**
         * Attaches the chart manager datamodel events
         *
         * @private
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.attachChartManagerDataModelEvents = function () {
            if (this._chartManagerDataModel) {
                this._chartManagerDataModel.eventModelChanged.attach(this._chartManagerModelChangedHandler);
            }
        };
        /**
         * Detaches the chart manager datamodel events
         *
         * @private
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.detachChartManagerDataModelEvents = function () {
            if (this._chartManagerDataModel) {
                this._chartManagerDataModel.eventModelChanged.detach(this._chartManagerModelChangedHandler);
            }
        };
        /**
         * chartManagerModel has changed
         *
         * @private
         * @param {*} sender
         * @param {*} args
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.onChartManagerModelChanged = function (sender, args) {
            // Update the cursor info widget
            if (args.hint == chartManagerDataModel_1.ChartManagerDataModelChangedHint.addSerie && args.data.series != undefined) {
                this.addSeries(args.data.series);
            }
            else if (args.hint == chartManagerDataModel_1.ChartManagerDataModelChangedHint.removeSerie) {
                if (args.data.signalUsedInOtherCharts == false) {
                    this.removeSerie(args.data.serie);
                }
            }
        };
        return CursorInfoWidget;
    }(treeGridWidgetBase_1.TreeGridWidgetBase));
    exports.CursorInfoWidget = CursorInfoWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3Vyc29ySW5mb1dpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jdXJzb3JJbmZvV2lkZ2V0L2N1cnNvckluZm9XaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBcUJBLG9EQUFvRDtJQUNwRCxJQUFNLGVBQWUsR0FBRyxjQUFjLENBQUM7SUFFdkM7Ozs7O09BS0c7SUFDSDtRQUErQixvQ0FBa0I7UUFBakQ7WUFBQSxxRUFvdENDO1lBbHRDVyxrQ0FBNEIsR0FBdUMsSUFBSSxLQUFLLEVBQStCLENBQUM7WUFJNUcsMkNBQXFDLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFHLE9BQUEsS0FBSSxDQUFDLCtCQUErQixDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsRUFBakQsQ0FBaUQsQ0FBQztZQUN6RyxzQ0FBZ0MsR0FBRyxVQUFDLE1BQU0sRUFBRSxJQUFJLElBQUssT0FBQSxLQUFJLENBQUMsMEJBQTBCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUE3QyxDQUE2QyxDQUFDO1lBRW5HLDRCQUFzQixHQUF3QixJQUFJLEtBQUssRUFBZ0IsQ0FBQztZQUd4RSxpQ0FBMkIsR0FBRyxLQUFLLENBQUM7WUFJM0IsdUJBQWlCLEdBQUcsU0FBUyxDQUFDO1lBQzlCLG9CQUFjLEdBQUcsTUFBTSxDQUFDO1lBQ3hCLHFCQUFlLEdBQUcsT0FBTyxDQUFDO1lBQzFCLDJCQUFxQixHQUFHLGFBQWEsQ0FBQztZQUN0Qyw4QkFBd0IsR0FBRyxnQkFBZ0IsQ0FBQztZQUU1Qyw4QkFBd0IsR0FBRyxlQUFlLENBQUM7WUFFNUQsMkpBQTJKO1lBQzNKLGdGQUFnRjtZQUN0RSxtQkFBYSxHQUFpQixJQUFJLDJCQUFZLEVBQUUsQ0FBQzs7UUEwckMvRCxDQUFDO1FBeHJDRzs7OztXQUlHO1FBQ0gscUNBQVUsR0FBVixVQUFXLGlCQUF5QjtZ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LCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ3Vyc29ySW5mb1dpZGdldCxDdXJzb3JNb3ZlbWVudCB9IGZyb20gXCIuL2ludGVyZmFjZXMvY3Vyc29ySW5mb1dpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUcmVlR3JpZFdpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL3RyZWVHcmlkV2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBDdXJzb3JJbmZvVHJlZUdyaWRUb29sYmFyIH0gZnJvbSBcIi4vdmlldy9jdXJzb3JJbmZvVHJlZUdyaWRUb29sYmFyXCI7XHJcbmltcG9ydCB7IEN1cnNvclNpZ25hbHNEYXRhTW9kZWwgfSBmcm9tIFwiLi9tb2RlbC9jdXJzb3JTaWduYWxzRGF0YU1vZGVsXCI7XHJcbmltcG9ydCB7IFlUQ3Vyc29yU2lnbmFsIH0gZnJvbSBcIi4vbW9kZWwveXRDdXJzb3JTaWduYWxcIjtcclxuaW1wb3J0IHsgWFlDdXJzb3JTaWduYWwgfSBmcm9tIFwiLi9tb2RlbC94eUN1cnNvclNpZ25hbFwiO1xyXG5pbXBvcnQgeyBGRlRDdXJzb3JTaWduYWwgfSBmcm9tIFwiLi9tb2RlbC9mZnRDdXJzb3JTaWduYWxcIjtcclxuaW1wb3J0IHsgSVVpQmluZGluZyB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy93aWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ3Vyc29ySW5mbyB9IGZyb20gXCIuL21vZGVsL2N1cnNvckluZm9cIjtcclxuaW1wb3J0IHsgQmFzZVNlcmllcyB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2Jhc2VTZXJpZXNcIjtcclxuaW1wb3J0IHsgQ3Vyc29yU3RhdGVzLCBDdXJzb3JUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi9zdGF0ZXMvY3Vyc29yU3RhdGVzXCI7XHJcbmltcG9ydCB7IER5bmFtaWNDdXJzb3JTaWduYWxUZW1wbGF0ZSB9IGZyb20gXCIuL21vZGVsL2R5bmFtaWNDdXJzb3JTaWduYWxUZW1wbGF0ZVwiO1xyXG5pbXBvcnQgeyBDdXJzb3JTaWduYWwgfSBmcm9tIFwiLi9tb2RlbC9jdXJzb3JTaWduYWxcIjtcclxuaW1wb3J0IHsgU2VyaWVzSGVscGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJpZXNIZWxwZXJcIjtcclxuaW1wb3J0IHsgQmluU2VhcmNoTW9kZSBhcyBTZWFyY2hNb2RlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi91dGlsaXRpZXMvYmluU2VhcmNoXCI7XHJcbmltcG9ydCB7IENoYXJ0Vmlld1Rvb2xTdGF0ZSwgQ2hhcnRWaWV3VG9vbFN0YXRlRW51bSB9IGZyb20gXCIuLi9jb21tb24vc3RhdGVzL2NoYXJ0Vmlld1Rvb2xiYXJTdGF0ZXNcIjtcclxuaW1wb3J0IHsgU2VyaWVzVHlwZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL3Nlcmllc1R5cGVcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgRGVmYXVsdENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4vZGVmYXVsdENvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCB7IENoYXJ0TWFuYWdlckRhdGFNb2RlbENoYW5nZWRIaW50LCBDaGFydE1hbmFnZXJEYXRhTW9kZWwgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9jaGFydE1hbmFnZXJEYXRhTW9kZWxcIjtcclxuXHJcbi8vIGRlZmluZXMgdGhlIGJhc2UgaWQgZm9yIHRoZSBjdXJzb3IgdmFsdWUgdGVtcGxhdGVcclxuY29uc3QgQ1VSU09SX1ZBTFVFX0lEID0gXCJjdXJzb3JWYWx1ZV9cIjtcclxuXHJcbi8qKlxyXG4gKiBpbXBsZW1lbnRzIHRoZSBDdXJzb3JJbmZvIFdpZGdldFxyXG4gKlxyXG4gKiBAY2xhc3MgQ3Vyc29ySW5mb1dpZGdldFxyXG4gKiBAZXh0ZW5kcyB7VHJlZUdyaWRXaWRnZXRCYXNlfVxyXG4gKi9cclxuY2xhc3MgQ3Vyc29ySW5mb1dpZGdldCBleHRlbmRzIFRyZWVHcmlkV2lkZ2V0QmFzZSBpbXBsZW1lbnRzIElDdXJzb3JJbmZvV2lkZ2V0IHtcclxuICAgIHByaXZhdGUgX2N1cnNvclNpZ25hbHNEYXRhTW9kZWw6IEN1cnNvclNpZ25hbHNEYXRhTW9kZWx8dW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfY3Vyc29ySW5mb1RlbXBsYXRlRGF0YU1vZGVsOiBBcnJheTxEeW5hbWljQ3Vyc29yU2lnbmFsVGVtcGxhdGU+ID0gbmV3IEFycmF5PER5bmFtaWNDdXJzb3JTaWduYWxUZW1wbGF0ZT4oKTtcclxuXHJcbiAgICBwcml2YXRlIF9jaGFydE1hbmFnZXJEYXRhTW9kZWw6IENoYXJ0TWFuYWdlckRhdGFNb2RlbHx1bmRlZmluZWQ7XHJcblxyXG4gICAgcHJpdmF0ZSBfY3Vyc29yU2lnbmFsc0RhdGFNb2RlbENoYW5nZWRIYW5kbGVyID0gKHNlbmRlcixhcmdzKT0+dGhpcy5vbkN1cnNvclNpZ25hbHNEYXRhTW9kZWxDaGFuZ2VkKHNlbmRlcixhcmdzKTtcclxuICAgIHByaXZhdGUgX2NoYXJ0TWFuYWdlck1vZGVsQ2hhbmdlZEhhbmRsZXIgPSAoc2VuZGVyLCBkYXRhKSA9PiB0aGlzLm9uQ2hhcnRNYW5hZ2VyTW9kZWxDaGFuZ2VkKHNlbmRlciwgZGF0YSk7ICBcclxuXHJcbiAgICBwcml2YXRlIF9zZWxlY3RlZEN1cnNvclNpZ25hbHM6IEFycmF5PEN1cnNvclNpZ25hbD4gPSBuZXcgQXJyYXk8Q3Vyc29yU2lnbmFsPigpO1xyXG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWRDdXJzb3JJbmZvc09sZDtcclxuICAgIHByaXZhdGUgX3NlbGVjdGVkQ3Vyc29ySW5mb3NOZXc7XHJcbiAgICBwcml2YXRlIF9jdXJzb3JJbmZvU2VsZWN0b3JJc0FjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgIHByaXZhdGUgX3Rvb2xiYXIhOiBDdXJzb3JJbmZvVHJlZUdyaWRUb29sYmFyO1xyXG4gICAgXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9jb2x1bW5JZF9WaXNpYmxlID0gXCJ2aXNpYmxlXCI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9jb2x1bW5JZF9OYW1lID0gXCJuYW1lXCI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9jb2x1bW5JZF9WYWx1ZSA9IFwidmFsdWVcIjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2NvbHVtbklkX0Rlc2NyaXB0aW9uID0gXCJkZXNjcmlwdGlvblwiO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfY29sdW1uSWRfSWNvbkRlZmluaXRpb24gPSBcImljb25EZWZpbml0aW9uXCI7XHJcbiAgICBcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2luZGV0ZXJtaW5hdGVTdGF0ZVZhbHVlID0gXCJpbmRldGVybWluYXRlXCI7XHJcblxyXG4gICAgLy8gaG9sZHMgdGhlIGN1cnJlbnQgY3Vyc29yIHN0YXRlcyB2YWx1ZXMuIFdlIGluaXRpYWxpemUgdGhlIG1lbWJlciBmb3IgZGVmYXVsdC4gVGhlIGVmZmVjdGl2ZSBpbml0aWFsaXphdGlvbiB0YWtlcyBwbGFjZSB3aGVuIHRoZSBleHRlcm5hbCBzaGFyZWQgaW5zdGFuY2VcclxuICAgIC8vIG9mIHRoZSBjdXJzb3Igc3RhdGVzIGlzIGNyZWF0ZWQgYW5kIHJlZmxlY3RlZCB0aHJvdWdoIHRoZSBjdXJvclN0YXRlcyBzZXR0ZXIhXHJcbiAgICBwcm90ZWN0ZWQgX2N1cnNvclN0YXRlczogQ3Vyc29yU3RhdGVzID0gbmV3IEN1cnNvclN0YXRlcygpO1xyXG5cclxuICAgIC8qKiAgaW5pdGlhbGl6ZSB0aGUgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxheW91dENvbnRhaW5lcklkXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBpbml0aWFsaXplKGxheW91dENvbnRhaW5lcklkOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlci5zZXRIZWFkZXJGaWx0ZXJCYXJIaWRkZW4oKTsvLyBNdXN0IGJlIHNldCBiZWZvcmUgaW5pdGlhbGl6YXRpb24gdG8gYXZvaWQgc2hvd2luZyB0aGUgZmlsdGVyYmFyXHJcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZShsYXlvdXRDb250YWluZXJJZCwgMzApO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRpYWxpemVkKCl7XHJcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZWQoKTtcclxuXHJcbiAgICAgICAgLy8gR2V0IGN1cnNvciBzaWduYWxzIGRhdGFtb2RlbFxyXG4gICAgICAgIHRoaXMuX2N1cnNvclNpZ25hbHNEYXRhTW9kZWwgPSB0aGlzLmNvbXBvbmVudC5nZXRTdWJDb21wb25lbnQoRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLkN1cnNvclNpZ25hbHNEYXRhTW9kZWxJZCkgYXMgQ3Vyc29yU2lnbmFsc0RhdGFNb2RlbDtcclxuXHJcbiAgICAgICAgLy8gQXR0YWNoIGN1cnNvciBzaWduYWxzIGRhdGFtb2RlbCBldmVudFxyXG4gICAgICAgIGlmKHRoaXMuX2N1cnNvclNpZ25hbHNEYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fY3Vyc29yU2lnbmFsc0RhdGFNb2RlbC5ldmVudE1vZGVsQ2hhbmdlZC5hdHRhY2godGhpcy5fY3Vyc29yU2lnbmFsc0RhdGFNb2RlbENoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gR2V0IGN1cnNvciBzaWduYWxzIGRhdGFtb2RlbFxyXG4gICAgICAgIHRoaXMuX2NoYXJ0TWFuYWdlckRhdGFNb2RlbCA9IHRoaXMuY29tcG9uZW50LmdldFN1YkNvbXBvbmVudChEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsSWQpIGFzIENoYXJ0TWFuYWdlckRhdGFNb2RlbDtcclxuXHJcbiAgICAgICAgdGhpcy5hdHRhY2hDaGFydE1hbmFnZXJEYXRhTW9kZWxFdmVudHMoKTtcclxuXHJcbiAgICAgICAgLy8gUmVmcmVzaCB0cmVlR3JpZCB0byBzZWUgdGhlIGxvYWRlZCBwZXJzaXN0aW5nIGRhdGFcclxuICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuXHJcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBzY3JvbGxiYXJzIHBvc2l0aW9uc1xyXG4gICAgICAgIGxldCBzY3JvbGxiYXJTZXR0aW5ncyA9IHRoaXMuY29tcG9uZW50LmdldFNldHRpbmcoVHJlZUdyaWRXaWRnZXRCYXNlLlNjcm9sbGJhcnNTZXR0aW5nc0lkKTtcclxuICAgICAgICB0aGlzLnNldFNjcm9sbEJhclNldHRpbmdzKHNjcm9sbGJhclNldHRpbmdzKTtcclxuXHJcbiAgICAgICAgc3VwZXIuc2V0SGVhZGVyQ29udGVudChcIkN1cnNvcnNcIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gU2V0IGR5bmFtaWMgY29sdW1uIHNldHRpbmdzXHJcbiAgICAgICAgc3VwZXIuc2V0RHluYW1pY0NvbHVtbigxLCA4MCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZUNvbXBvbmVudCgpe1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmRlZmF1bHRTZXR0aW5nc0RhdGFJZCA9IERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5XaWRnZXREZWZpbml0aW9uSWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBjdXJzb3JzIHN0YXRlc1xyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEB0eXBlIHtDdXJzb3JTdGF0ZXN9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3VG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0IGN1cnNvcnNTdGF0ZXMoKSA6IEN1cnNvclN0YXRlcyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnNvclN0YXRlcztcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgY3Vyc29ycyBzdGF0ZXMuIFRoZSBtZXRob2QgaXMgY2FsbGVkIGF1dG9tYXRpY2FsbHkgd2hlbmV2ZXIgYSBjdXJzb3Igc3RhdGUgaGFzIGJlZW4gY2hhbmdlZCBleHRlcm5hbGx5LiBcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3VG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgc2V0IGN1cnNvcnNTdGF0ZXMoY3Vyc29yU3RhdGVzIDogQ3Vyc29yU3RhdGVzKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gdXBkYXRlIHRoZSBiYWNrdXAgZmllbGRcclxuICAgICAgICB0aGlzLl9jdXJzb3JTdGF0ZXMgPSBjdXJzb3JTdGF0ZXM7XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlSW5mb0N1cnNvcnNXaXRoTmV3U3RhdGVWYWx1ZXMoY3Vyc29yU3RhdGVzKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBjdXJzb3Igc3RhdGVzLlxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBwYXJhbSB7Q3Vyc29yU3RhdGVzfSBjdXJzb3JTdGF0ZXNcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHVwZGF0ZUN1cnNvclN0YXRlcyhjdXJzb3JTdGF0ZXM6Q3Vyc29yU3RhdGVzKXtcclxuICAgICAgICAvLyBCSU5ESU5HU09VUkNFOiBkaXNwYXRjaGVzIHRoZSBtZXRob2QgY2FsbCB0byBib3VuZCB0YXJnZXRzXHJcbiAgICB9XHJcblxyXG4gICAgZGlzcG9zZSgpe1xyXG4gICAgICAgIHRoaXMuZGV0YWNoQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsRXZlbnRzKCk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuX2N1cnNvclNpZ25hbHNEYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gRGV0YWNoIGN1cnNvciBzaWduYWxzIGRhdGFtb2RlbCBldmVudHNcclxuICAgICAgICAgICAgdGhpcy5fY3Vyc29yU2lnbmFsc0RhdGFNb2RlbC5ldmVudE1vZGVsQ2hhbmdlZC5kZXRhY2godGhpcy5fY3Vyc29yU2lnbmFsc0RhdGFNb2RlbENoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICAgICAgLy8gRGlzcG9zZSBjdXJzb3Igc2lnbmFscyBkYXRhbW9kZWxcclxuICAgICAgICAgICAgdGhpcy5fY3Vyc29yU2lnbmFsc0RhdGFNb2RlbC5kaXNwb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgY29tcG9uZW50IHNldHRpbmdzIGZvciB0aGlzIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsoQ29tcG9uZW50U2V0dGluZ3N8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGdldERlZmF1bHRDb21wb25lbnRTZXR0aW5ncygpOiBDb21wb25lbnRTZXR0aW5nc3x1bmRlZmluZWR7XHJcbiAgICAgICAgcmV0dXJuIERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5nZXRDdXJzb3JJbmZvV2lkZ2V0RGVmaW5pdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgcHVibGljIGdldENvbXBvbmVudFNldHRpbmdzKG9ubHlNb2RpZmllZDogYm9vbGVhbik6IENvbXBvbmVudFNldHRpbmdze1xyXG5cdFx0cmV0dXJuIHN1cGVyLmdldENvbXBvbmVudFNldHRpbmdzKG9ubHlNb2RpZmllZCk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0Q29tcG9uZW50U2V0dGluZ3MoZGF0YTogQ29tcG9uZW50U2V0dGluZ3MpIHtcclxuICAgICAgICBpZihkYXRhICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHN1cGVyLnNldENvbXBvbmVudFNldHRpbmdzKGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIGNvbHVtbiB0ZW1wbGF0ZXMgZm9yIHRoZSB0cmVlIGdyaWQgYW5kIGFkZHMgdGhlbSB0byB0aGUgd2lkZ2V0IGNvbnRhaW5lclxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBjcmVhdGVDb2x1bW5UZW1wbGF0ZXMoKXtcclxuXHRcdHZhciAkd2lkZ2V0Q29udGFpbmVyID0gJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCk7XHJcblx0XHQkd2lkZ2V0Q29udGFpbmVyLmFwcGVuZCh0aGlzLmdldENvbHVtblRlbXBsYXRlRGF0YSh0aGlzLl9jb2x1bW5JZF9WaXNpYmxlKSk7XHJcblx0XHQkd2lkZ2V0Q29udGFpbmVyLmFwcGVuZCh0aGlzLmdldENvbHVtblRlbXBsYXRlRGF0YSh0aGlzLl9jb2x1bW5JZF9OYW1lKSk7XHJcblx0fVxyXG5cclxuICAgIC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIGNvbHVtbiB0ZW1wbGF0ZSBpbmZvcm1hdGlvbnNcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHJldHVybnMge3N0cmluZ31cclxuXHQgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG5cdCAqL1xyXG4gICAgcHJpdmF0ZSBnZXRDb2x1bW5UZW1wbGF0ZURhdGEoY29sdW1uSWQ6IHN0cmluZykgOiBzdHJpbmd7XHJcbiAgICAgICAgaWYoY29sdW1uSWQgPT0gdGhpcy5fY29sdW1uSWRfVmlzaWJsZSl7XHJcbiAgICAgICAgICAgIHJldHVybiBgPHNjcmlwdCB0eXBlPVwidGV4dC94LWpzcmVuZGVyXCIgaWQ9XCJjaVZpc2libGVDb2x1bW5UZW1wbGF0ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwibWFyZ2luLWxlZnQ6MTBweDtcIj57e2lmIHZpc2libGUgPT0gXCJ0cnVlXCIgJiYgIWhhc0NoaWxkUmVjb3Jkc319IDxpbnB1dCBjbGFzcz1cImN1c3RvbUNoZWNrYm94XCIgdHlwZT1cImNoZWNrYm94XCIgY2hlY2tlZD1cImNoZWNrZWRcIiB2YWx1ZT1cIlwiIC8+e3tlbHNlICFoYXNDaGlsZFJlY29yZHN9fSA8aW5wdXQgY2xhc3M9XCJjdXN0b21DaGVja2JveFwiIHR5cGU9XCJjaGVja2JveFwiIHZhbHVlPVwiXCIgLz57ey9pZn19PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc2NyaXB0PmA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoY29sdW1uSWQgPT0gdGhpcy5fY29sdW1uSWRfTmFtZSl7XHJcbiAgICAgICAgICAgIHJldHVybiBgPHNjcmlwdCB0eXBlPVwidGV4dC94LWpzcmVuZGVyXCIgaWQ9XCJjaU5hbWVDb2x1bW5UZW1wbGF0ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPSdoZWlnaHQ6MjBweDsnIHVuc2VsZWN0YWJsZT0nb24nPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3tpZiBoYXNDaGlsZFJlY29yZHN9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2ludGVuZCcgc3R5bGU9J2hlaWdodDoxcHg7IGZsb2F0OmxlZnQ7IHdpZHRoOnt7OmxldmVsKjZ9fXB4OyBkaXNwbGF5OmlubGluZS1ibG9jazsnPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3tlbHNlICFoYXNDaGlsZFJlY29yZHN9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2ludGVuZCcgc3R5bGU9J2hlaWdodDoxcHg7IGZsb2F0OmxlZnQ7IHdpZHRoOnt7OmxldmVsKjZ9fXB4OyBkaXNwbGF5OmlubGluZS1ibG9jazsnPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3svaWZ9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3s6I2RhdGFbJ2ljb25EZWZpbml0aW9uJ119fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nZS1jZWxsJyBzdHlsZT0nZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6MTAwJScgdW5zZWxlY3RhYmxlPSdvbic+e3s6I2RhdGFbJ25hbWUnXX19PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvc2NyaXB0PmA7XHJcbiAgICAgICAgfVxyXG5cdFx0cmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgdHJlZSBncmlkIGZvciB0aGUgQ3Vyc29ySW5mb3NcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlVHJlZUdyaWQoKXtcclxuICAgICAgICAoPGFueT4kKHRoaXMuY3NzUGFyZW50Q29udGVudElkKSkuZWpUcmVlR3JpZCh7XHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCksXHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRDb2x1bW5SZXNpemVTdXBwb3J0KCksXHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRDZWxsRWRpdFN1cHBvcnQoKSxcclxuICAgICAgICAgICAgLi4udGhpcy5nZXRUcmVlR3JpZFRvb2xiYXJTdXBwb3J0KCksXHRcclxuXHJcbiAgICAgICAgICAgIC8vZGF0YVNvdXJjZTogdGhpcy5fY3Vyc29yU2lnbmFsc0RhdGFNb2RlbC5nZXRDdXJzb3JTaWduYWxzKCksXHJcbiAgICAgICAgICAgIGNoaWxkTWFwcGluZzogXCJjdXJzb3JJbmZvc1wiLFxyXG4gICAgICAgICAgICBleHBhbmRTdGF0ZU1hcHBpbmc6IFwiZXhwYW5kU3RhdGVcIixcclxuICAgICAgICAgICAgaXNSZXNwb25zaXZlOiB0cnVlLFxyXG4gICAgICAgICAgICB0cmVlQ29sdW1uSW5kZXg6IDEsXHJcbiAgICAgICAgICAgIGFsbG93RmlsdGVyaW5nIDogdHJ1ZSxcclxuICAgICAgICAgICAgcm93SGVpZ2h0IDogMjgsXHJcbiAgICAgICAgICAgIC8vIFNldCBpbml0IHNpemUgdG8gZHJhdyB0aGUgdG9vbGJhciBpY29ucyBhdCB0aGUgcmlnaHQgcG9zaXRpb25cclxuICAgICAgICAgICAgc2l6ZVNldHRpbmdzOiB7IGhlaWdodDogJzIwMHB4Jywgd2lkdGg6ICcyMDBweCcgfSxcclxuXHJcbiAgICAgICAgICAgIHNlbGVjdGlvblR5cGU6IGVqLlRyZWVHcmlkLlNlbGVjdGlvblR5cGUuTXVsdGlwbGUsXHJcblxyXG4gICAgICAgICAgICBleHBhbmRlZDogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWROb2RlRXhwYW5kZWRPckNvbGxhcHNlZCgpLFxyXG5cdFx0XHRjb2xsYXBzZWQ6IChhcmdzKSA9PiB0aGlzLnRyZWVHcmlkTm9kZUV4cGFuZGVkT3JDb2xsYXBzZWQoKSxcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJvd1NlbGVjdGVkOiAoYXJncykgPT4gdGhpcy50cmVlR3JpZFJvd1NlbGVjdGVkKGFyZ3MpLFxyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICBjcmVhdGU6IChhcmdzKSA9PiB0aGlzLnRyZWVHcmlkQ3JlYXRlZCgpLFxyXG4gICAgICAgICAgICBhY3Rpb25CZWdpbjogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWRBY3Rpb25CZWdpbihhcmdzKSwgXHJcbiAgICAgICAgICAgIHF1ZXJ5Q2VsbEluZm86IChhcmdzKSA9PiB0aGlzLnF1ZXJ5Q2VsbEluZm8oYXJncyksXHJcbiAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdHJlZUdyaWROb2RlRXhwYW5kZWRPckNvbGxhcHNlZCgpe1xyXG4gICAgICAgIC8vIFJlZnJlc2ggdG8gc2VlIGNvcnJlY3QgZXhwYW5kZWQvY29sbGFwc2VkIGljb25cclxuICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgICAgICAvLyBQZXJzaXN0IGV4cGFuZFN0YXRlIGluIGRhdGFNb2RlbFxyXG4gICAgICAgIGlmICh0aGlzLl9jdXJzb3JTaWduYWxzRGF0YU1vZGVsICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3Vyc29yU2lnbmFsc0RhdGFNb2RlbC5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gUGVyc2lzdCBzY3JvbGxiYXIgc3RhdGUgaW4gY3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICAgIHRoaXMuc2F2ZVRyZWVHcmlkU2V0dGluZ3MoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHF1ZXJ5Q2VsbEluZm8oYXJncyl7XHJcbiAgICAgICAgaWYoYXJncy5jb2x1bW4uZmllbGQgPT0gdGhpcy5fY29sdW1uSWRfVmlzaWJsZSl7XHJcbiAgICAgICAgICAgIGlmKGFyZ3MuY2VsbFZhbHVlID09IHRoaXMuX2luZGV0ZXJtaW5hdGVTdGF0ZVZhbHVlKXtcclxuICAgICAgICAgICAgICAgIC8vIFNldCBpbmRldGVybWluYXRlIGljb25zXHJcbiAgICAgICAgICAgICAgICAkKGFyZ3MuY2VsbEVsZW1lbnQuY2hpbGROb2Rlc1sxXS5jaGlsZE5vZGVzWzFdKS5wcm9wKHRoaXMuX2luZGV0ZXJtaW5hdGVTdGF0ZVZhbHVlLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRyZWVHcmlkIHNlbGVjdGVkIHJvdyBoYXMgY2hhbmdlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHRyZWVHcmlkUm93U2VsZWN0ZWQoYXJncyl7XHJcbiAgICAgICAgaWYoYXJncy5tb2RlbC5zZWxlY3RlZEl0ZW1zID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5fY3Vyc29ySW5mb1NlbGVjdG9ySXNBY3RpdmUgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIC8vIFNhdmVzIHRoZSBzZWxlY3RlZCBpdGVtcyBmb3IgbXVsdGlzZWxlY3Rpb24gc3VwcG9ydCBpbiBjdXJzb3IgaW5mbyBzZWxlY3RvclxyXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZEN1cnNvckluZm9zT2xkID0gdGhpcy5fc2VsZWN0ZWRDdXJzb3JJbmZvc05ld1xyXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZEN1cnNvckluZm9zTmV3ID0gYXJncy5tb2RlbC5zZWxlY3RlZEl0ZW1zO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZEN1cnNvclNpZ25hbHMgPSB0aGlzLmdldE9ubHlDdXJzb3JTaWduYWxzKGFyZ3MubW9kZWwuc2VsZWN0ZWRJdGVtcyk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ3Vyc29ySW5mb1NlbGVjdG9yQnV0dG9uU3RhdGUoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldCBhbGwgQ3Vyc29yU2lnbmFscyBmb3IgdGhlIGN1cnJlbnQgc2VsZWN0aW9uKGlmIEN1cnNvckluZm8gaXMgc2VsZWN0ZWQsIGdldCB0aGUgcGFyZW50IEN1cnNvclNpZ25hbClcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBzZWxlY3RlZEl0ZW1zXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8Q3Vyc29yU2lnbmFsPn1cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0T25seUN1cnNvclNpZ25hbHMoc2VsZWN0ZWRJdGVtcyk6IEFycmF5PEN1cnNvclNpZ25hbD57XHJcbiAgICAgICAgbGV0IG5ld0xpc3QgPSBuZXcgQXJyYXk8Q3Vyc29yU2lnbmFsPigpO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpIDwgc2VsZWN0ZWRJdGVtcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKHNlbGVjdGVkSXRlbXNbaV0uaXRlbSBpbnN0YW5jZW9mIEN1cnNvclNpZ25hbCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBuZXdMaXN0LmluZGV4T2Yoc2VsZWN0ZWRJdGVtc1tpXS5pdGVtKTtcclxuICAgICAgICAgICAgICAgIGlmKGluZGV4ID09IC0xKXsgLy8gT25seSBhZGQgaWYgbm90IGFscmVhZHkgaW4gbGlzdFxyXG4gICAgICAgICAgICAgICAgICAgIG5ld0xpc3QucHVzaChzZWxlY3RlZEl0ZW1zW2ldLml0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYoc2VsZWN0ZWRJdGVtc1tpXS5pdGVtIGluc3RhbmNlb2YgQ3Vyc29ySW5mbyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBuZXdMaXN0LmluZGV4T2Yoc2VsZWN0ZWRJdGVtc1tpXS5wYXJlbnRJdGVtLml0ZW0pO1xyXG4gICAgICAgICAgICAgICAgaWYoaW5kZXggPT0gLTEpeyAvLyBPbmx5IGFkZCBpZiBub3QgYWxyZWFkeSBpbiBsaXN0XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3TGlzdC5wdXNoKHNlbGVjdGVkSXRlbXNbaV0ucGFyZW50SXRlbS5pdGVtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3TGlzdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGN1cnNvciBpbmZvIHNlbGVjdG9yIGJ1dHRvbiBzdGF0ZSAoaWYgb25lIChvciBtb3JlKSBzaWduYWwgaXMgc2VsZWN0ZWQgdGhlIGJ1dHRvbiBpcyBlbmFibGVkKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVDdXJzb3JJbmZvU2VsZWN0b3JCdXR0b25TdGF0ZSgpe1xyXG4gICAgICAgIGlmKHRoaXMuX3NlbGVjdGVkQ3Vyc29yU2lnbmFscyA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAvLyBubyBpdGVtcyBzZWxlY3RlZCBkZWFjdGl2YXRlIEZpbHRlciBidXR0b25cclxuICAgICAgICAgICAgdGhpcy5fdG9vbGJhci5kaXNhYmxlQ3Vyc29ySW5mb1NlbGVjdG9yQnV0dG9uKHRydWUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLl9zZWxlY3RlZEN1cnNvclNpZ25hbHMubGVuZ3RoIDwgMSl7XHJcbiAgICAgICAgICAgIC8vIG5vIGl0ZW1zIHNlbGVjdGVkIGRlYWN0aXZhdGUgRmlsdGVyIGJ1dHRvblxyXG4gICAgICAgICAgICB0aGlzLl90b29sYmFyLmRpc2FibGVDdXJzb3JJbmZvU2VsZWN0b3JCdXR0b24odHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2xiYXIuZGlzYWJsZUN1cnNvckluZm9TZWxlY3RvckJ1dHRvbihmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJlZSBncmlkIGNvbHVtbiBkZWZpbml0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCk6IHt9e1xyXG4gICAgICAgIC8vIGFkZCBjaGVjayBib3ggc3RhdGUgaW5mb3JtYXRpb25cclxuICAgICAgICB2YXIgY2hlY2tCb3hTdGF0ZXMgPSBbXHJcbiAgICAgICAgICAgIHsgdGV4dDogXCJZZXNcIiwgdmFsdWU6IFwidHJ1ZVwiIH0sXHJcbiAgICAgICAgICAgIHsgdGV4dDogXCJOb1wiLCB2YWx1ZTogXCJmYWxzZVwiIH1cclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICAvLyByZXR1cm4gdGhlIGNvbHVtbiBkZWZpbml0aW9uc1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgeyBmaWVsZDogdGhpcy5fY29sdW1uSWRfVmlzaWJsZSwgaGVhZGVyVGV4dDogXCJWaXNpYmxlXCIsIHZpc2libGU6IGZhbHNlLCBhbGxvd0VkaXRpbmc6IGZhbHNlLCBpc1RlbXBsYXRlQ29sdW1uOiB0cnVlLCB0ZW1wbGF0ZUlEOiBcImNpVmlzaWJsZUNvbHVtblRlbXBsYXRlXCIsIGZpbHRlckVkaXRUeXBlOiBcImRyb3Bkb3duZWRpdFwiLCBkcm9wZG93bkRhdGE6IGNoZWNrQm94U3RhdGVzLCBhbGxvd0ZpbHRlcmluZ0JsYW5rQ29udGVudDogZmFsc2UsIHdpZHRoOiBcIjU1cHhcIn0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBmaWVsZDogdGhpcy5fY29sdW1uSWRfTmFtZSwgaGVhZGVyVGV4dDogXCJOYW1lXCIsIGFsbG93RWRpdGluZyA6IGZhbHNlLCBpc1RlbXBsYXRlQ29sdW1uOiB0cnVlLCB0ZW1wbGF0ZUlEOiBcImNpTmFtZUNvbHVtblRlbXBsYXRlXCJ9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsgZmllbGQ6IHRoaXMuX2NvbHVtbklkX1ZhbHVlLCBoZWFkZXJUZXh0OiBcIlZhbHVlXCIsIGFsbG93RWRpdGluZyA6IGZhbHNlLCB3aWR0aDogXCIxNDBweFwiLCBpc1RlbXBsYXRlQ29sdW1uOiB0cnVlLCB0ZW1wbGF0ZTogXCI8ZGl2IHN0eWxlPSdwYWRkaW5nLWxlZnQ6IDIwcHgnIGlkPSdcIiArIHRoaXMucGFyZW50Q29udGVudElkICsgQ1VSU09SX1ZBTFVFX0lEICsgXCJ7ezp1aUlkfX0nPjwvZGl2PlwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBmaWVsZDogdGhpcy5fY29sdW1uSWRfRGVzY3JpcHRpb24sIGhlYWRlclRleHQ6IFwiRGVzY3JpcHRpb25cIiwgIHZpc2libGU6IGZhbHNlLCBhbGxvd0VkaXRpbmcgOiBmYWxzZSwgd2lkdGg6IFwiMTQwcHhcIn0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBmaWVsZDogdGhpcy5fY29sdW1uSWRfSWNvbkRlZmluaXRpb24sIHZpc2libGU6IGZhbHNlLCB3aWR0aDogXCIwcHhcIiB9LFxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJlZSBncmlkIGNvbHVtbiByZXNpemUgc2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmVlR3JpZENvbHVtblJlc2l6ZVN1cHBvcnQoKToge317XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYWxsb3dDb2x1bW5SZXNpemU6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbHVtblJlc2l6ZVNldHRpbmdzOiB7IGNvbHVtblJlc2l6ZU1vZGU6IGVqLlRyZWVHcmlkLkNvbHVtblJlc2l6ZU1vZGUuRml4ZWRDb2x1bW5zIH0sXHJcbiAgICAgICAgICAgIGNvbHVtblJlc2l6ZWQ6IChhcmdzKSA9PiB0aGlzLnRyZWVHcmlkQ29sdW1uUmVzaXplZChhcmdzKSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCBjZWxsIGVkaXQgc2V0dGluZ3NcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHJldHVybnMge3t9fVxyXG5cdCAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBnZXRUcmVlR3JpZENlbGxFZGl0U3VwcG9ydCgpOiB7fXtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGVkaXRTZXR0aW5nczoge1x0YWxsb3dFZGl0aW5nOiB0cnVlIH0sXHJcblx0XHR9O1xyXG5cdH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCB0b29sYmFyIHNldHRpbmdzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VHJlZUdyaWRUb29sYmFyU3VwcG9ydCgpOiB7fXtcclxuICAgICAgICB0aGlzLl90b29sYmFyID0gbmV3IEN1cnNvckluZm9UcmVlR3JpZFRvb2xiYXIodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRvb2xiYXJTZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgc2hvd1Rvb2xiYXI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjdXN0b21Ub29sYmFySXRlbXM6IHRoaXMuX3Rvb2xiYXIuZ2V0Q3VzdG9tVG9vbGJhcnMoKSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdG9vbGJhckNsaWNrOiAoYXJncykgPT4gdGhpcy5fdG9vbGJhci50b29sYmFyQ2xpY2soYXJncywgdGhpcyksXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRyZWVHcmlkIHdhcyBjcmVhdGVkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdHJlZUdyaWRDcmVhdGVkKCl7XHJcbiAgICAgICAgLy8gU2V0cyB0aGUgY3VzdG9tIHRvb2xiYXIgaWNvbnNcclxuICAgICAgICB0aGlzLl90b29sYmFyLnNldFN0eWxlRm9yVG9vbGJhckljb25zKCk7XHJcbiAgICAgICAgdGhpcy5fdG9vbGJhci5pbml0VG9vbGJhclN0YXRlcygpO1xyXG5cclxuICAgICAgICAvLyBGaWx0ZXIgZGF0YSBvbiBzdGFydHVwXHJcbiAgICAgICAgbGV0IHRyZWVPYmogPSB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCk7XHJcbiAgICAgICAgKDxhbnk+dHJlZU9iaikuZmlsdGVyQ29sdW1uKHRoaXMuX2NvbHVtbklkX1Zpc2libGUsIGVqLkZpbHRlck9wZXJhdG9ycy5lcXVhbCwgXCJ0cnVlXCIsIFwiYW5kXCIpO1xyXG5cclxuICAgICAgICB0aGlzLmF0dGFjaFRvQ2hlY2tCb3hDaGFuZ2VkRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEF0dGFjaCBjaGVjayBib3ggY2hhbmdlZCBldmVudHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhdHRhY2hUb0NoZWNrQm94Q2hhbmdlZEV2ZW50KCl7XHJcbiAgICAgICAgJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCkub24oXCJjaGFuZ2VcIiwgXCIuY3VzdG9tQ2hlY2tib3hcIiwgKGUpID0+IHRoaXMuY2hlY2tCb3hDaGFuZ2VkKGUpICk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZFN0eWxlcygpIHtcclxuICAgICAgICBzdXBlci5hZGRTdHlsZShcIndpZGdldHMvY3Vyc29ySW5mb1dpZGdldC9zdHlsZS9jc3MvY3Vyc29ySW5mb1N0eWxlLmNzc1wiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9jY3VycyBvbiBjaGVjayBib3ggY2hhbmdlZCBldmVudHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNoZWNrQm94Q2hhbmdlZChlKXtcclxuICAgICAgICBsZXQgZmlsdGVyRGF0YVNvdXJjZSA9IHRoaXMuX2N1cnNvckluZm9UZW1wbGF0ZURhdGFNb2RlbDtcclxuXHJcbiAgICAgICAgZSA9IGUgfHwgd2luZG93LmV2ZW50O1xyXG4gICAgICAgIGxldCB0YXJnZXRFbGUgPSBlLnRhcmdldDtcclxuICAgICAgICBsZXQgY2hlY2tTdGF0dXMgPSAkKHRhcmdldEVsZSkuaXMoJzpjaGVja2VkJyk7XHJcbiAgICAgICAgLy8gJCh0YXJnZXRFbGUpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgICAgICBsZXQgcmVjb3JkID0gdGhpcy5nZXRUcmVlUmVjb3JkKHRhcmdldEVsZSk7XHJcbiAgICAgICAgaWYocmVjb3JkICE9IHVuZGVmaW5lZCl7ICAgIFxyXG4gICAgICAgICAgICBpZihjaGVja1N0YXR1cyA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICByZWNvcmQuaXRlbS52aXNpYmxlID0gXCJmYWxzZVwiO1xyXG4gICAgICAgICAgICAgICAgcmVjb3JkW1widmlzaWJsZVwiXSA9IFwiZmFsc2VcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0TXVsdGlTZWxlY3Rpb25DaGVja0JveGVzKFwiZmFsc2VcIiwgcmVjb3JkLmluZGV4KTtcclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgcmVjb3JkLml0ZW0udmlzaWJsZSA9IFwidHJ1ZVwiO1xyXG4gICAgICAgICAgICAgICAgcmVjb3JkW1widmlzaWJsZVwiXSA9IFwidHJ1ZVwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRNdWx0aVNlbGVjdGlvbkNoZWNrQm94ZXMoXCJ0cnVlXCIsIHJlY29yZC5pbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0TW9kZWwoZmlsdGVyRGF0YVNvdXJjZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBTZXQgc2VsZWN0aW9uIGFmdGVyIHNldHRpbmcgY2hlY2tib3ggYmVjYXVzZSB0aGV5IGFyZSBsb3N0IGFmdGVyIHNldHRpbmcgYSBjaGVjayBib3hcclxuICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3Rpb25JbkN1cnNvckluZm9TZWxlY3RvclZpZXcodGhpcy5fc2VsZWN0ZWRDdXJzb3JJbmZvc09sZCk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2hlY2tCb3hlcygpO1xyXG5cclxuICAgICAgICAgICAgLy8gVXBkYXRlIGN1cnNvciBpbmZvIHZpc2liaWxpdGllcyBpZiBzb21ldGhpbmcgaGFzIGNoYW5nZWRcclxuICAgICAgICAgICAgdGhpcy5zZXRDdXJzb3JJbmZvVmlzaWJpbGl0aWVzKHRoaXMuX3NlbGVjdGVkQ3Vyc29yU2lnbmFscywgdGhpcy5fY3Vyc29ySW5mb1RlbXBsYXRlRGF0YU1vZGVsWzBdKTtcclxuICAgICAgICAgICAgLy8gVXBkYXRlIGRhdGFNb2RlbFxyXG4gICAgICAgICAgICB0aGlzLl9jdXJzb3JTaWduYWxzRGF0YU1vZGVsIS5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJZiBtdWx0aSBzZWxlY3Rpb24gaXMgYWN0aXZlLCBzZXQgYWxsIHNlbGVjdGVkIGl0ZW1zIHRvIHRoZSBnaXZlbiBzdGF0ZShjaGVja2VkL3VuY2hlY2tlZClcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYWN0dWFsSW5kZXhcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0TXVsdGlTZWxlY3Rpb25DaGVja0JveGVzKHN0YXRlOiBzdHJpbmcsIGFjdHVhbEluZGV4OiBudW1iZXIpe1xyXG4gICAgICAgIGxldCBzZWxlY3RlZEN1cnNvckluZm9zID0gdGhpcy5fc2VsZWN0ZWRDdXJzb3JJbmZvc09sZDtcclxuICAgICAgICBpZihzZWxlY3RlZEN1cnNvckluZm9zICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIFNldC9VbnNldCBjaGVjayBib3hlc1xyXG4gICAgICAgICAgICBsZXQgaW5kZXhXaXRoaW5NdWx0aVNlbGVjdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPTA7IGkgPCBzZWxlY3RlZEN1cnNvckluZm9zLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGlmKGFjdHVhbEluZGV4ID09IHNlbGVjdGVkQ3Vyc29ySW5mb3NbaV0uaW5kZXgpe1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4V2l0aGluTXVsdGlTZWxlY3Rpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBpZihpbmRleFdpdGhpbk11bHRpU2VsZWN0aW9uID09IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRDdXJzb3JJbmZvcy5mb3JFYWNoKGN1cnNvckluZm8gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnNvckluZm8uaXRlbS52aXNpYmxlID0gc3RhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29ySW5mb1tcInZpc2libGVcIl0gPSBzdGF0ZTsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAvLyBPbmx5IG9uZSBjaGVja2JveCB3YXMgY2xpY2tlZCA9PiBzZXQgc2VsZWN0aW9uIHRvIHRoZSBuZXcgb25lXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3RlZEN1cnNvckluZm9zT2xkID0gdGhpcy5fc2VsZWN0ZWRDdXJzb3JJbmZvc05ldztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRyZWVHcmlkQWN0aW9uQmVnaW4oYXJncyl7XHJcbiAgICAgICAgLy8gRG9uJ3Qgc3VwcG9ydCBcIkVudGYvRGVsXCIga2V5XHJcbiAgICAgICAgaWYoYXJncy5yZXF1ZXN0VHlwZSA9PSBcImRlbGV0ZVwiKXtcclxuICAgICAgICAgICAgYXJncy5jYW5jZWwgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEEgdHJlZWdyaWQgY29sdW1uIHdhcyByZXNpemVkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB0cmVlR3JpZENvbHVtblJlc2l6ZWQoYXJncyl7XHJcbiAgICAgICAgc3VwZXIucmVzaXplRHluYW1pY0NvbHVtbihhcmdzLmNvbHVtbkluZGV4LCBhcmdzLm1vZGVsKTtcclxuICAgICAgICBpZiAodGhpcy5fY3Vyc29ySW5mb1NlbGVjdG9ySXNBY3RpdmUpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDaGVja0JveGVzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFJlZnJlc2ggY3Vyc29yIGluZm8gdmFsdWVzIGFmdGVyIHJlc2l6ZSAodHJlZWdyaWQgc2V0cyB0aGUgZGF0YSB0byBcIjBcIiBhZnRlciByZXNpemUpXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoQ3Vyc29yVmFsdWVzKCk7XHJcblxyXG4gICAgICAgIC8vIEp1c3QgcGVyc2lzdCBjb2x1bW4gcmVzaXplIHdoZW4gZmlsdGVyIGlzIGNsb3NlZFxyXG4gICAgICAgIGlmICghdGhpcy5fY3Vyc29ySW5mb1NlbGVjdG9ySXNBY3RpdmUpIHtcclxuICAgICAgICAgICAgdGhpcy5zYXZlVHJlZUdyaWRTZXR0aW5ncygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogcmVzaXplcyB0aGUgY3Vyc29yIHZhbHVlcyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gd2lkdGhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHJlc2l6ZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xyXG4gICAgICAgIHN1cGVyLnJlc2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICBpZiAodGhpcy5fY3Vyc29ySW5mb1NlbGVjdG9ySXNBY3RpdmUpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDaGVja0JveGVzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFJlZnJlc2ggY3Vyc29yIHZhbHVlcyBhZnRlciByZXNpemUgKHRyZWVncmlkIHNldHMgdGhlIGRhdGEgdG8gXCIwXCIgYWZ0ZXIgcmVzaXplKVxyXG4gICAgICAgIHRoaXMucmVmcmVzaEN1cnNvclZhbHVlcygpO1xyXG5cclxuICAgICAgICB0aGlzLl90b29sYmFyLnJlc2l6ZSh3aWR0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFjdGl2YXRlQ3Vyc29ySW5mb1NlbGVjdG9yVmlldyhhY3RpdmF0ZTogYm9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5fdG9vbGJhci5hY3RpdmF0ZUN1cnNvckluZm9TZWxlY3RvclZpZXcoYWN0aXZhdGUpO1xyXG4gICAgICAgIGlmKGFjdGl2YXRlID09IHRydWUpe1xyXG4gICAgICAgICAgICB0aGlzLnNob3dDdXJzb3JJbmZvU2VsZWN0b3JWaWV3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0N1cnNvclNpZ25hbHNWaWV3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFVwZGF0ZSB0b29sYmFyIGJ1dHRvbiBwb3NpdGlvbnMoZS5nLiBwb3NpdGlvbiBvZiByaWdodCBhbGlnbiB0b29sYmFyKSBhZnRlciBoaWRlIG9yIHNob3cgdG9vbGJhciBidXR0b25cclxuICAgICAgICB0aGlzLl90b29sYmFyLnJlc2l6ZSh0aGlzLndpZHRoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNob3dzIHRoZSBjdXJzZXIgc2lnbmFscyB3aXRoIHRoZSBmaWx0ZXJlZC9kZWZpbmVkIGN1cnNvciBpbmZvcm1hdGlvbnNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNob3dDdXJzb3JTaWduYWxzVmlldygpe1xyXG4gICAgICAgIHRoaXMuX2N1cnNvckluZm9TZWxlY3RvcklzQWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWRDdXJzb3JJbmZvc09sZCA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLl9zZWxlY3RlZEN1cnNvckluZm9zTmV3ID0gdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICAvLyBTaG93IGFjdHVhbCBjdXJzb3JJbmZvIGRhdGFcclxuICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuXHJcbiAgICAgICAgLy8gU2V0cyB0aGUgY29sdW1uIHZpc2liaWxpdGllc1xyXG4gICAgICAgIGxldCB0cmVlR3JpZE9iamVjdCA9IHN1cGVyLmdldFRyZWVHcmlkT2JqZWN0KCk7ICBcclxuICAgICAgICB0aGlzLnNldENvbHVtblZpc2libGl0aWVzKHRyZWVHcmlkT2JqZWN0LCBmYWxzZSk7XHJcblxyXG4gICAgICAgIC8vIFNldCB0aGUgZmlsdGVyIHRvIGhpZGUgdmlzaWJsZSA9PSBmYWxzZSBjdXJzb3IgaW5mb3NcclxuICAgICAgICAoPGFueT50cmVlR3JpZE9iamVjdCkuZmlsdGVyQ29sdW1uKHRoaXMuX2NvbHVtbklkX1Zpc2libGUsIGVqLkZpbHRlck9wZXJhdG9ycy5lcXVhbCwgXCJ0cnVlXCIsIFwiYW5kXCIpO1xyXG5cclxuICAgICAgICAvLyBzZXQgdGhlIHNlbGVjdGlvbiB0byBzdGF0ZSBiZWZvcmUgc3dpdGNoaW5nIHRvIHRoZSBjdXJzb3IgaW5mbyBzZWxlY3RvciB2aWV3XHJcbiAgICAgICAgdGhpcy5zZXRTZWxlY3Rpb25XaXRoQ3Vyc29yU2lnbmFscyh0cmVlR3JpZE9iamVjdCwgdGhpcy5fc2VsZWN0ZWRDdXJzb3JTaWduYWxzKTtcclxuXHJcbiAgICAgICAgLy8gVXBkYXRlIHRoZSBkeW5hbWljIGNvbHVtbiBzaXplIGFmdGVyIGhpZGUvc2hvdyBvZiBzb21lIGNvbHVtbnNcclxuICAgICAgICB0aGlzLnJlc2l6ZUR5bmFtaWNDb2x1bW4oMCwgdHJlZUdyaWRPYmplY3QubW9kZWwpO1xyXG5cclxuICAgICAgICAvLyByZWZyZXNoIHRoZSBjdXJzb3IgaW5mbyB2YWx1ZXNcclxuICAgICAgICB0aGlzLnJlZnJlc2hDdXJzb3JWYWx1ZXMoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBTaG93cyB0aGUgY3Vyc29yIGluZm8gc2VsZWN0b3Igdmlld1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2hvd0N1cnNvckluZm9TZWxlY3RvclZpZXcoKXtcclxuICAgICAgICB0aGlzLl9jdXJzb3JJbmZvU2VsZWN0b3JJc0FjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgIC8vIFJlc2V0IGN1cnNvciBpbmZvIHRlbXBsYXRlIGRhdGFtb2RlbFxyXG4gICAgICAgIHRoaXMuX2N1cnNvckluZm9UZW1wbGF0ZURhdGFNb2RlbC5zcGxpY2UoMCwgdGhpcy5fY3Vyc29ySW5mb1RlbXBsYXRlRGF0YU1vZGVsLmxlbmd0aCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gY3JlYXRlIGEgc2lnbmFsIHRlbXBsYXRlIGJhc2VkIG9uIHRoZSBzZWxlY3RlZCBzZXJpZXNcclxuICAgICAgICBsZXQgdGVtcGxhdGVDdXJzb3JTaWduYWwgPSBuZXcgRHluYW1pY0N1cnNvclNpZ25hbFRlbXBsYXRlKHRoaXMuX3NlbGVjdGVkQ3Vyc29yU2lnbmFscylcclxuXHJcbiAgICAgICAgLy8gYWRkIHRoZSBzaWduYWwgdGVtcGxhdGUgdG8gdGhlIG1vZGVsXHJcbiAgICAgICAgdGhpcy5fY3Vyc29ySW5mb1RlbXBsYXRlRGF0YU1vZGVsLnB1c2godGVtcGxhdGVDdXJzb3JTaWduYWwpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFNldCBjdXJzb3IgaW5mbyB0ZW1wbGF0ZSB2aXNpYmlsaXRpZXNcclxuICAgICAgICB0aGlzLnVwZGF0ZVRlbXBsYXRlVmlzaWJpbGl0aWVzKHRoaXMuX3NlbGVjdGVkQ3Vyc29yU2lnbmFscywgdGVtcGxhdGVDdXJzb3JTaWduYWwpO1xyXG4gICAgICAgXHJcbiAgICAgICAgLy8gc2hvdyBjdXJzb3IgaW5mbyB0ZW1wbGF0ZSBkYXRhbW9kZWwgKHRoZSBwb3NzaWJsZSBjdXJzb3IgaW5mb3MpXHJcbiAgICAgICAgdGhpcy51cGRhdGVEYXRhU291cmNlKDxhbnk+dGhpcy5fY3Vyc29ySW5mb1RlbXBsYXRlRGF0YU1vZGVsKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBTZXRzIHRoZSBjb2x1bW4gdmlzaWJpbGl0aWVzXHJcbiAgICAgICAgbGV0IHRyZWVHcmlkT2JqZWN0ID0gc3VwZXIuZ2V0VHJlZUdyaWRPYmplY3QoKTtcclxuICAgICAgICB0aGlzLnNldENvbHVtblZpc2libGl0aWVzKHRyZWVHcmlkT2JqZWN0LCB0cnVlKTtcclxuXHJcbiAgICAgICAgLy8gVXBkYXRlIHRoZSBkeW5hbWljIGNvbHVtbiBzaXplIGFmdGVyIGhpZGUvc2hvdyBvZiBzb21lIGNvbHVtbnNcclxuICAgICAgICB0aGlzLnJlc2l6ZUR5bmFtaWNDb2x1bW4oMCwgdHJlZUdyaWRPYmplY3QubW9kZWwpO1xyXG5cclxuICAgICAgICAvLyBSZW1vdmVzIHRoZSBmaWx0ZXIgb2YgdGhlIHZpc2liaWxpdHkgZmxhZyB3aGljaCBpcyBuZWVkZWQgaW4gdGhlIGN1cnNvciBzaWduYWwgdmlld1xyXG4gICAgICAgIHRyZWVHcmlkT2JqZWN0LmNsZWFyRmlsdGVyKHRoaXMuX2NvbHVtbklkX1Zpc2libGUpO1xyXG5cclxuICAgICAgICAvLyBDb252ZXJ0IGN1c3RvbSBjaGVjayBib3hlcyBpbnRvIHN5bmNmdXNpb24gY2hlY2sgYm94ZXNcclxuICAgICAgICB0aGlzLnVwZGF0ZUNoZWNrQm94ZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGNvbHVtbiB2aXNpYmlsaXRpZXMgZm9yIHRoZSBjdXJzb3IgaW5mbyBzZWxlY3RvciB2aWV3IG9yIHRoZSBjdXJzb3Igc2lnbmFscyB2aWV3XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gdHJlZUdyaWRPYmplY3RcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gY3Vyc29ySW5mb1NlbGVjdG9yVmlld1xyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRDb2x1bW5WaXNpYmxpdGllcyh0cmVlR3JpZE9iamVjdCwgY3Vyc29ySW5mb1NlbGVjdG9yVmlldzpib29sZWFuKXtcclxuICAgICAgICAvLyBnZXQgbmVlZGVkIGNvbHVtbnNcclxuICAgICAgICBsZXQgdmlzaWJsZUNvbHVtbiA9IHRyZWVHcmlkT2JqZWN0LmdldENvbHVtbkJ5RmllbGQodGhpcy5fY29sdW1uSWRfVmlzaWJsZSk7XHJcbiAgICAgICAgbGV0IGRlc2NyaXB0aW9uQ29sdW1uID0gdHJlZUdyaWRPYmplY3QuZ2V0Q29sdW1uQnlGaWVsZCh0aGlzLl9jb2x1bW5JZF9EZXNjcmlwdGlvbik7XHJcbiAgICAgICAgbGV0IHZhbHVlQ29sdW1uID0gdHJlZUdyaWRPYmplY3QuZ2V0Q29sdW1uQnlGaWVsZCh0aGlzLl9jb2x1bW5JZF9WYWx1ZSk7XHJcblxyXG4gICAgICAgIGlmKGN1cnNvckluZm9TZWxlY3RvclZpZXcgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAvLyBIaWRlIHZpc2libGUgY29sdW1uXHJcbiAgICAgICAgICAgIHRyZWVHcmlkT2JqZWN0LmhpZGVDb2x1bW4odmlzaWJsZUNvbHVtbi5oZWFkZXJUZXh0KTtcclxuXHJcbiAgICAgICAgICAgIC8vIEhpZGUgZGVzY3JpcHRpb24gY29sdW1uXHJcbiAgICAgICAgICAgIHRyZWVHcmlkT2JqZWN0LmhpZGVDb2x1bW4oZGVzY3JpcHRpb25Db2x1bW4uaGVhZGVyVGV4dCk7XHJcblxyXG4gICAgICAgICAgICAvLyBTaG93IHZhbHVlIGNvbHVtblxyXG4gICAgICAgICAgICB0cmVlR3JpZE9iamVjdC5zaG93Q29sdW1uKHZhbHVlQ29sdW1uLmhlYWRlclRleHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAvLyBTaG93IHZpc2libGUgY29sdW1uXHJcbiAgICAgICAgICAgIHRyZWVHcmlkT2JqZWN0LnNob3dDb2x1bW4odmlzaWJsZUNvbHVtbi5oZWFkZXJUZXh0KTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNob3cgZGVzY3JpcHRpb24gY29sdW1uXHJcbiAgICAgICAgICAgIHRyZWVHcmlkT2JqZWN0LnNob3dDb2x1bW4oZGVzY3JpcHRpb25Db2x1bW4uaGVhZGVyVGV4dCk7XHJcblxyXG4gICAgICAgICAgICAvLyBIaWRlIHZhbHVlIGNvbHVtblxyXG4gICAgICAgICAgICB0cmVlR3JpZE9iamVjdC5oaWRlQ29sdW1uKHZhbHVlQ29sdW1uLmhlYWRlclRleHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHNlbGVjdGlvbiB0byB0aGUgZ2l2ZW4gc2VsZWN0aW9uIG9iamVjdHMgaW4gY3Vyc29yIGluZm8gc2VsZWN0b3Igdmlld1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PGFueT59IHNlbGVjdGVkT2JqZWN0c1xyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRTZWxlY3Rpb25JbkN1cnNvckluZm9TZWxlY3RvclZpZXcoc2VsZWN0ZWRPYmplY3RzKSB7XHJcbiAgICAgICAgaWYgKHNlbGVjdGVkT2JqZWN0cyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHRyZWVHcmlkT2JqZWN0OiBhbnkgPSB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCk7XHJcbiAgICAgICAgdHJlZUdyaWRPYmplY3QuY2xlYXJTZWxlY3Rpb24oKTtcclxuICAgICAgICBpZiAoc2VsZWN0ZWRPYmplY3RzLmxlbmd0aCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBzZWxlY3RlZE9iamVjdHMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgICAgICB0cmVlR3JpZE9iamVjdC5fbXVsdGlTZWxlY3RDdHJsUmVxdWVzdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmlzaWJsZUluZGV4ID0gMDtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCB0cmVlR3JpZE9iamVjdC5tb2RlbC5mbGF0UmVjb3Jkcy5sZW5ndGg7IGorKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodHJlZUdyaWRPYmplY3QubW9kZWwuZmxhdFJlY29yZHNbal0uaWQgPT0gc2VsZWN0ZWRPYmplY3RzW2ldLmlkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyZWVHcmlkT2JqZWN0LnNlbGVjdFJvd3ModmlzaWJsZUluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZUluZGV4Kys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRyZWVHcmlkT2JqZWN0LnNlbGVjdFJvd3Moc2VsZWN0ZWRPYmplY3RzLmluZGV4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gU2V0IGFjdHVhbCBzZWxlY3Rpb24gZm9yIGxhdGVyIHVzZSBcclxuICAgICAgICB0aGlzLl9zZWxlY3RlZEN1cnNvckluZm9zT2xkID0gc2VsZWN0ZWRPYmplY3RzO1xyXG4gICAgICAgIHRoaXMuX3NlbGVjdGVkQ3Vyc29ySW5mb3NOZXcgPSBzZWxlY3RlZE9iamVjdHM7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgc2VsZWN0aW9uIHRvIHRoZSBnaXZlbiBjdXJzb3Igc2lnbmFsc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHRyZWVHcmlkT2JqZWN0XHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PEN1cnNvclNpZ25hbD59IGN1cnNvclNpZ25hbHNcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0U2VsZWN0aW9uV2l0aEN1cnNvclNpZ25hbHModHJlZUdyaWRPYmplY3QsIGN1cnNvclNpZ25hbHM6IEFycmF5PEN1cnNvclNpZ25hbD4pIHtcclxuICAgICAgICAvLyBkZXNlbGVjdCBhbGwgc2VsZWN0aW9ucyBpbiBjdXJzb3Igc2lnbmFscyB2aWV3XHJcbiAgICAgICAgdHJlZUdyaWRPYmplY3QuY2xlYXJTZWxlY3Rpb24oKTtcclxuXHJcbiAgICAgICAgaWYoY3Vyc29yU2lnbmFscyA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBjdXJzb3JTaWduYWxzLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICB0cmVlR3JpZE9iamVjdC5fbXVsdGlTZWxlY3RDdHJsUmVxdWVzdCA9IHRydWU7XHJcbiAgICAgICAgICAgIGxldCB2aXNpYmxlSW5kZXggPSAwO1xyXG4gICAgICAgICAgICBsZXQgbW9kZWwgPSB0cmVlR3JpZE9iamVjdC5tb2RlbDtcclxuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IG1vZGVsLmZsYXRSZWNvcmRzLmxlbmd0aDsgaisrKXtcclxuICAgICAgICAgICAgICAgIGlmKG1vZGVsLmZsYXRSZWNvcmRzW2pdLml0ZW0gPT0gY3Vyc29yU2lnbmFsc1tpXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJlZUdyaWRPYmplY3Quc2VsZWN0Um93cyh2aXNpYmxlSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYobW9kZWwuZmxhdFJlY29yZHNbal0udmlzaWJsZSAhPSBcImZhbHNlXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGVJbmRleCsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSB2aXNpYmxlIGZsYWdzIGluIHRoZSB0ZW1wbGF0ZSBjdXJzb3Igc2lnbmFsIHRvIHRoZSBpbmZvcm1hdGlvbnMgZnJvbSB0aGUgY3Vyc29yIHNpZ25hbHNcclxuICAgICAqIChlLmcuIGFsbCBzaWduYWxzIHNob3cgeTEgY3Vyc29yIGluZm8gc28gdGhlcmVmb3JlIHRlbXBsYXRlIGN1cnNvciBpbmZvIHZpc2liaWxpdHkgaXMgc2V0IHRvIFwidHJ1ZVwiO1xyXG4gICAgICogICAgICAgYWxsIHNpZ25hbHMgZG9zbid0IHNob3cgeTEgY3Vyc29yIGluZm8gc28gdGhlcmVmb3JlIHRlbXBsYXRlIGN1cnNvciBpbmZvIHZpc2liaWxpdHkgaXMgc2V0IHRvIFwiZmFsc2VcIjtcclxuICAgICAqICAgICAgIHNvbWUgc2lnbmFscyBzaG93IHkxIGN1cnNvciBpbmZvIHNvIHRoZXJlZm9yZSB0ZW1wbGF0ZSBjdXJzb3IgaW5mbyB2aXNpYmlsaXR5IGlzIHNldCB0byBcImluZGV0ZXJtaW5hdGVcIjtcclxuICAgICAqIClcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxDdXJzb3JTaWduYWw+fSBjdXJzb3JTaWduYWxzXHJcbiAgICAgKiBAcGFyYW0ge0R5bmFtaWNDdXJzb3JTaWduYWxUZW1wbGF0ZX0gdGVtcGxhdGVDdXJzb3JTaWduYWxcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZVRlbXBsYXRlVmlzaWJpbGl0aWVzKGN1cnNvclNpZ25hbHM6IEFycmF5PEN1cnNvclNpZ25hbD4sIHRlbXBsYXRlQ3Vyc29yU2lnbmFsOiBEeW5hbWljQ3Vyc29yU2lnbmFsVGVtcGxhdGUpIHtcclxuICAgICAgICBpZiAodGVtcGxhdGVDdXJzb3JTaWduYWwgJiYgdGVtcGxhdGVDdXJzb3JTaWduYWwuY3Vyc29ySW5mb3MpIHtcclxuICAgICAgICAgICAgLy8gZm9yIGFsbCBhdmFpbGFibGUgbWVyZ2VkIGN1cnNvciBpbmZvc1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZUN1cnNvclNpZ25hbC5jdXJzb3JJbmZvcy5mb3JFYWNoKCh0ZW1wbGF0ZUN1cnNvclNpZ25hbEluZm8pID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBjbGVhciBleGlzdGluZyB2aXNpYmlsaXR5XHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZUN1cnNvclNpZ25hbEluZm8udmlzaWJsZSA9IFwiXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSBjdXJzb3IgaW5mb3MgYnkgaWRcclxuICAgICAgICAgICAgICAgIGxldCBtYXRjaGluZ0N1cnNvckluZm9zOiBBcnJheTxDdXJzb3JJbmZvPiA9IHRoaXMucmV0cmlldkN1cnNvckluZm9zQnlJZChjdXJzb3JTaWduYWxzLCB0ZW1wbGF0ZUN1cnNvclNpZ25hbEluZm8uaWQpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGZvciBhbGwgc2VsZWN0ZWQgY3Vyc29yIHNpZ25hbHMgd2l0aCBtYXRjaGluZyBpZCAuLi5cclxuICAgICAgICAgICAgICAgIG1hdGNoaW5nQ3Vyc29ySW5mb3MuZm9yRWFjaCgoY3Vyc29yU2lnbmFsSW5mbykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZSB2aXNpYmlsaXR5IGlzIHlldCB1bmRlZmluZWQgLi5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRlbXBsYXRlQ3Vyc29yU2lnbmFsSW5mby52aXNpYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGluaXRpYWxpemUgdGhlIHZpc2liaWxpdHkgd2l0aCB0aGUgZmlyc3QgY3Vyc29yIHNpZ25hbCBpbmZvcyB2YWx1ZS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVDdXJzb3JTaWduYWxJbmZvLnZpc2libGUgPSBjdXJzb3JTaWduYWxJbmZvLnZpc2libGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2V0IHZpc2liaWxpdHkgdG8gdW5kZXRlcm1pbmVkIGlmIG9uZSBvZiB0aGUgZm9sbG93aW5nIHZhbHVlcyBpcyBkaWZmZXJlbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnNvclNpZ25hbEluZm8udmlzaWJsZSAhPT0gdGVtcGxhdGVDdXJzb3JTaWduYWxJbmZvLnZpc2libGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlQ3Vyc29yU2lnbmFsSW5mby52aXNpYmxlID0gdGhpcy5faW5kZXRlcm1pbmF0ZVN0YXRlVmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHZpc2liaWxpdHkgZGVmaW5lZCBpbiB0aGUgdGVtcGxhdGUgY3Vyc29yIHNpZ25hbCB0byB0aGUgY3Vyc29yIHNpZ25hbHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxDdXJzb3JTaWduYWw+fSBjdXJzb3JTaWduYWxzXHJcbiAgICAgKiBAcGFyYW0ge0R5bmFtaWNDdXJzb3JTaWduYWxUZW1wbGF0ZX0gdGVtcGxhdGVDdXJzb3JTaWduYWxcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldEN1cnNvckluZm9WaXNpYmlsaXRpZXMoY3Vyc29yU2lnbmFsczogQXJyYXk8Q3Vyc29yU2lnbmFsPiwgdGVtcGxhdGVDdXJzb3JTaWduYWw6IER5bmFtaWNDdXJzb3JTaWduYWxUZW1wbGF0ZSkge1xyXG4gICAgICAgIGlmICh0ZW1wbGF0ZUN1cnNvclNpZ25hbCAmJiB0ZW1wbGF0ZUN1cnNvclNpZ25hbC5jdXJzb3JJbmZvcykge1xyXG4gICAgICAgICAgICAvLyBmb3IgYWxsIGF2YWlsYWJsZSBtZXJnZWQgY3Vyc29yIGluZm9zXHJcbiAgICAgICAgICAgIHRlbXBsYXRlQ3Vyc29yU2lnbmFsLmN1cnNvckluZm9zLmZvckVhY2goKHRlbXBsYXRlQ3Vyc29yU2lnbmFsSW5mbykgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0ZW1wbGF0ZUN1cnNvclNpZ25hbEluZm8udmlzaWJsZSAhPT0gdGhpcy5faW5kZXRlcm1pbmF0ZVN0YXRlVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIGN1cnNvciBpbmZvcyBieSBpZFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtYXRjaGluZ0N1cnNvckluZm9zOiBBcnJheTxDdXJzb3JJbmZvPiA9IHRoaXMucmV0cmlldkN1cnNvckluZm9zQnlJZChjdXJzb3JTaWduYWxzLCB0ZW1wbGF0ZUN1cnNvclNpZ25hbEluZm8uaWQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBmb3IgYWxsIHNlbGVjdGVkIGN1cnNvciBpbmZvcyB3aXRoIG1hdGNoaW5nIGlkIC4uLlxyXG4gICAgICAgICAgICAgICAgICAgIG1hdGNoaW5nQ3Vyc29ySW5mb3MuZm9yRWFjaCgoY3Vyc29yU2lnbmFsSW5mbykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzZXQgdGhlIGN1cnNvciBzaWduYWxzIHZpc2liaWxpdHkgZnJvbSB0aGUgdGVtcGxhdGUgdmFsdWUgaWYgYSB2YWxpZCBzdGF0ZSBpcyBkZWZpbmVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvclNpZ25hbEluZm8udmlzaWJsZSA9IHRlbXBsYXRlQ3Vyc29yU2lnbmFsSW5mby52aXNpYmxlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0cyB0aGUgY3Vyc29yIGluZm9zIHdpdGggdGhlIHNwZWNpZmllZCBpZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PEN1cnNvclNpZ25hbD59IGN1cnNvclNpZ25hbHNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjdXJzb3JJbmZvSWRcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxDdXJzb3JJbmZvPn1cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmV0cmlldkN1cnNvckluZm9zQnlJZChjdXJzb3JTaWduYWxzOiBBcnJheTxDdXJzb3JTaWduYWw+LCBjdXJzb3JJbmZvSWQ6IHN0cmluZyk6IEFycmF5PEN1cnNvckluZm8+IHtcclxuICAgICAgICBsZXQgbWF0Y2hpbmdDdXJzb3JJbmZvczogQXJyYXk8Q3Vyc29ySW5mbz4gPSBbXTtcclxuICAgICAgICBjdXJzb3JTaWduYWxzLmZvckVhY2goKGN1cnNvclNpZ25hbCkgPT4ge2N1cnNvclNpZ25hbC5jdXJzb3JJbmZvcy5mb3JFYWNoKChjdXJzb3JTaWduYWxJbmZvKSA9PiB7IFxyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnNvclNpZ25hbEluZm8uaWQgPT09IGN1cnNvckluZm9JZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hdGNoaW5nQ3Vyc29ySW5mb3MucHVzaChjdXJzb3JTaWduYWxJbmZvKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBtYXRjaGluZ0N1cnNvckluZm9zO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmFpc2VzIHRoZSBtb3ZlIGN1cnNvciBldmVudFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjdXJzb3JJbmRleFxyXG4gICAgICogQHBhcmFtIHtDdXJzb3JNb3ZlbWVudH0gbW92ZW1lbnRcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvbk1vdmVDdXJzb3IoY3Vyc29ySW5kZXg6IG51bWJlciwgbW92ZW1lbnQ6IEN1cnNvck1vdmVtZW50KSB7XHJcbiAgICAgICAgbGV0IGRhdGE6IEJhc2VTZXJpZXMgW10gPSBbXTtcclxuXHJcbiAgICAgICAgbGV0IHggPSB0aGlzLmN1cnNvcnNTdGF0ZXMuZ2V0UG9zaXRpb24oY3Vyc29ySW5kZXgsIHRoaXMuY3Vyc29yc1N0YXRlcy5nZXRMYXN0Q3Vyc29yVHlwZVNlbGVjdGVkKCkpO1xyXG4gICAgICAgIGlmKHRoaXMuX2N1cnNvclNpZ25hbHNEYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgbGV0IGN1cnNvcnMgPSB0aGlzLl9jdXJzb3JTaWduYWxzRGF0YU1vZGVsLmdldEN1cnNvclNpZ25hbHMoKTtcclxuICAgICAgICAgICAgY3Vyc29ycy5mb3JFYWNoKGN1cnNvciA9PiB7XHJcbiAgICAgICAgICAgICAgICBkYXRhLnB1c2goY3Vyc29yLnNlcmllKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYoeCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlQ3Vyc29yKGN1cnNvckluZGV4LCBtb3ZlbWVudCwgZGF0YSwgeCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBtb3ZlcyB0aGUgY3Vyc29yIGZvciB0aGUgc3BlY2lmaWVkIGRpcmVjdGlvbiBhbmQgb2Zmc2V0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjdXJzb3JJbmRleFxyXG4gICAgICogQHBhcmFtIHtDdXJzb3JNb3ZlbWVudH0gY3Vyc29yTW92ZW1lbnRcclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc1tdfSBzZXJpZXNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjdXJzb3JQb3NpdGlvblxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBtb3ZlQ3Vyc29yKGN1cnNvckluZGV4OiBudW1iZXIsIGN1cnNvck1vdmVtZW50OkN1cnNvck1vdmVtZW50LHNlcmllczpCYXNlU2VyaWVzW10sY3Vyc29yUG9zaXRpb246bnVtYmVyKSB7XHJcblxyXG4gICAgICAgIGxldCBjdXJzb3JUeXBlOiBDdXJzb3JUeXBlID0gdGhpcy5jdXJzb3JzU3RhdGVzLmdldExhc3RDdXJzb3JUeXBlU2VsZWN0ZWQoKTtcclxuICAgICAgICAvLyBnZXQgdGhlIG5leHQgcG9zc2libGUgY3Vyc29yIHRpbWVzdGFtcFxyXG4gICAgICAgIGxldCBuZWFyZXN0VGltZXN0YW1wID0gdGhpcy5maW5kTmVhcmVzdFRpbWVzdGFtcEluU2VyaWVzKHNlcmllcywgY3Vyc29yUG9zaXRpb24sIGN1cnNvck1vdmVtZW50LCBjdXJzb3JUeXBlKTtcclxuXHJcbiAgICAgICAgLy8gdXBkYXRlIHRoZSBjdXJzb3JzIHRpbWVzdGFtcCBsb2NhdGlvblxyXG4gICAgICAgIHRoaXMudXBkYXRlQ3Vyc29yTG9jYXRpb24oY3Vyc29ySW5kZXgsIG5lYXJlc3RUaW1lc3RhbXApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogc2VhcmNoZXMgdGhlIG5leHQgdGltZXN0YW1wIGluIGFsbCBhdmFpbGFibGUgc2VyaWVzLiBUaGUgcGlja2VkIHZhbHVlIHRha2VzIHRoZSBtb3ZlbWVudCBkaXJlY3Rpb24gaW50b2kgYWNjb3VudC5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtCYXNlU2VyaWVzW119IHNlcmllc1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGN1cnNvclRpbWVTdGFtcFxyXG4gICAgICogQHBhcmFtIHtDdXJzb3JNb3ZlbWVudH0gY3Vyc29yTW92ZW1lbnRcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGZpbmROZWFyZXN0VGltZXN0YW1wSW5TZXJpZXMoc2VyaWVzOiBCYXNlU2VyaWVzW10sIGN1cnNvclRpbWVTdGFtcDogbnVtYmVyLCBjdXJzb3JNb3ZlbWVudDogQ3Vyc29yTW92ZW1lbnQsIGN1cnNvclR5cGU6IEN1cnNvclR5cGUpOiBudW1iZXIge1xyXG4gICAgICAgIC8vIHJldHJpZXZlIHRoZSB0aW1lc3RhbXBzIHNlcmllcyBmcm9tIHRoZSBzaWduYWwgc2VyaWVzXHJcbiAgICAgICAgbGV0IHRpbWVzdGFtcFNlcmllcyA9IHNlcmllcy5tYXAoKHNpbmdsZVNlcmllcykgPT4geyBcclxuICAgICAgICAgICAgaWYgKHNpbmdsZVNlcmllcy5jdXJzb3JUeXBlID09IGN1cnNvclR5cGUpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNpbmdsZVNlcmllcy50aW1lc3RhbXBzOyBcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgbmV4dE5lYXJlc3RUaW1lU3RhbXAgPSBjdXJzb3JUaW1lU3RhbXA7XHJcblxyXG4gICAgICAgIC8vIGRwZW5kaXVuZyBvbiBtb3ZlbWVudCBkaXJlY3Rpb24gd2UgcGljayB0aGUgbmV4dCBwb3NzaWJsZSB0aW1lIHN0YW1wXHJcbiAgICAgICAgc3dpdGNoIChjdXJzb3JNb3ZlbWVudCkge1xyXG4gICAgICAgICAgICBjYXNlIEN1cnNvck1vdmVtZW50LlJpZ2h0OlxyXG4gICAgICAgICAgICAgICAgbmV4dE5lYXJlc3RUaW1lU3RhbXAgPSBTZXJpZXNIZWxwZXIuZmluZE5lYXJlc3RWYWx1ZUZyb21Db2xsZWN0aW9uKGN1cnNvclRpbWVTdGFtcCwgdGltZXN0YW1wU2VyaWVzLCBTZWFyY2hNb2RlLk5FWFRVUFBFUik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBDdXJzb3JNb3ZlbWVudC5MZWZ0OlxyXG4gICAgICAgICAgICAgICAgbmV4dE5lYXJlc3RUaW1lU3RhbXAgPSBTZXJpZXNIZWxwZXIuZmluZE5lYXJlc3RWYWx1ZUZyb21Db2xsZWN0aW9uKGN1cnNvclRpbWVTdGFtcCwgdGltZXN0YW1wU2VyaWVzLCBTZWFyY2hNb2RlLlBSRVZJT1VTTE9XRVIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXh0TmVhcmVzdFRpbWVTdGFtcDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZSBjdXJzb3IgYWN0aXZhdGlvbi9zZWxlY3Rpb25cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY3Vyc29ySW5kZXhcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvblJlZmVyZW5jZUN1cnNvclNlbGVjdGVkKGN1cnNvckluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICBcclxuICAgICAgICAvLyB1cGRhdGUgdGhlIGN1cnNvciBzZWxlY3Rpb24gc3RhdGVcclxuICAgICAgICB0aGlzLmN1cnNvcnNTdGF0ZXMuc2V0U2VsZWN0ZWQoY3Vyc29ySW5kZXgsIHRydWUpO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZUN1cnNvclN0YXRlcyggdGhpcy5jdXJzb3JzU3RhdGVzKTtcclxuXHJcbiAgICAgICAgLy8gc2V0IHRoZSBjdXJzb3JzIGFzIGFjdGl2ZSB0b29sXHJcbiAgICAgICAgbGV0IHRvb2xzdGF0ZTogQ2hhcnRWaWV3VG9vbFN0YXRlID0gdGhpcy5zdGF0ZXMucmVhZChDaGFydFZpZXdUb29sU3RhdGUsXCJDaGFydFZpZXdUb29sU3RhdGVcIik7XHJcbiAgICAgICAgdG9vbHN0YXRlLnNlbGVjdGVkVG9vbCA9IENoYXJ0Vmlld1Rvb2xTdGF0ZUVudW0uQ1VSU09SUztcclxuICAgICAgICB0aGlzLnN0YXRlcy51cGRhdGUodGhpcyxDaGFydFZpZXdUb29sU3RhdGUsIHRvb2xzdGF0ZSxcIkNoYXJ0Vmlld1Rvb2xTdGF0ZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBzaWduYWwgdG8gdGhlIGN1cnNvciBpbmZvIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8QmFzZVNlcmllcz59IHNlcmllc1xyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZFNlcmllcyhzZXJpZXM6IEFycmF5PEJhc2VTZXJpZXM+KXtcclxuICAgICAgICBsZXQgY3Vyc29yU2lnbmFscyA9IG5ldyBBcnJheTxDdXJzb3JTaWduYWw+KCk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZXJpZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZiAoc2VyaWVzW2ldLnR5cGUgPT09IFNlcmllc1R5cGUudGltZVNlcmllcykge1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yU2lnbmFscy5wdXNoKG5ldyBZVEN1cnNvclNpZ25hbChzZXJpZXNbaV0sIGZhbHNlKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2VyaWVzW2ldLnR5cGUgPT09IFNlcmllc1R5cGUueHlTZXJpZXMpIHtcclxuICAgICAgICAgICAgICAgIGN1cnNvclNpZ25hbHMucHVzaChuZXcgWFlDdXJzb3JTaWduYWwoc2VyaWVzW2ldLCBmYWxzZSkpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNlcmllc1tpXS50eXBlID09PSBTZXJpZXNUeXBlLmZmdFNlcmllcykge1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yU2lnbmFscy5wdXNoKG5ldyBGRlRDdXJzb3JTaWduYWwoc2VyaWVzW2ldLCBmYWxzZSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuX2N1cnNvclNpZ25hbHNEYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fY3Vyc29yU2lnbmFsc0RhdGFNb2RlbC5hZGRTaWduYWwoY3Vyc29yU2lnbmFscyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlIGEgY3Vyc29yIHNpZ25hbCBmcm9tIHRoZSBjdXJzb3IgaW5mbyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNlcmllXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVtb3ZlU2VyaWUoc2VyaWU6IEJhc2VTZXJpZXMpe1xyXG4gICAgICAgIGlmKHRoaXMuX2N1cnNvclNpZ25hbHNEYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgbGV0IGN1cnNvclNpZ25hbCA9IHRoaXMuX2N1cnNvclNpZ25hbHNEYXRhTW9kZWwuZ2V0Q3Vyc29yU2lnbmFsKHNlcmllKTtcclxuICAgICAgICAgICAgaWYoY3Vyc29yU2lnbmFsKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnNvclNpZ25hbHNEYXRhTW9kZWwucmVtb3ZlU2VyaWUoY3Vyc29yU2lnbmFsKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gRGlzYWJsZXMgZmlsdGVyIGJ1dHRvbiBpZiBpcyBhY3RpdmVcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuX3Rvb2xiYXIuY3Vyc29ySW5mb1NlbGVjdGlvbklzQWN0aXZlKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl90b29sYmFyLmFjdGl2YXRlQ3Vyc29ySW5mb1NlbGVjdG9yVmlldyghdGhpcy5fdG9vbGJhci5jdXJzb3JJbmZvU2VsZWN0aW9uSXNBY3RpdmUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFJlbW92ZXMgdGhlIGN1cnNvciBzaWduYWwgZnJvbSB0aGUgY3VycmVudCBzZWxlY3Rpb24gbGlzdCBhbmQgdXBkYXRlcyB0aGUgdG9vbGJhciBidXR0b25cclxuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMuX3NlbGVjdGVkQ3Vyc29yU2lnbmFscy5pbmRleE9mKGN1cnNvclNpZ25hbCk7XHJcbiAgICAgICAgICAgICAgICBpZihpbmRleCAhPSAtMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRDdXJzb3JTaWduYWxzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVDdXJzb3JJbmZvU2VsZWN0b3JCdXR0b25TdGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY2hhbmdlcyBhbmQgdXBkYXRlcyB0aGUgY3Vyc29yIGxvY2F0aW9uIG9mIHRoZSBzZWxlY3RlZCBjdXJzb3JcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY3Vyc29ySW5kZXhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjdXJzb3JUaW1lc3RhbXBcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB1cGRhdGVDdXJzb3JMb2NhdGlvbihjdXJzb3JJbmRleDogbnVtYmVyLCBjdXJzb3JUaW1lc3RhbXA6IG51bWJlcikge1xyXG5cclxuICAgICAgICB0aGlzLmN1cnNvcnNTdGF0ZXMuc2V0UG9zaXRpb24oY3Vyc29ySW5kZXgsIGN1cnNvclRpbWVzdGFtcCk7XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlQ3Vyc29yU3RhdGVzKCB0aGlzLmN1cnNvcnNTdGF0ZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmVmcmVzaGVzIHRoZSB0cmVlIGdyaWRzIGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWZyZXNoKCl7XHJcbiAgICAgICAgLy8gcmVmcmVzaCB0cmVlIGdyaWQgb25seSBpZiBjdXJzb3Igc2lnbmFsIHZpZXcgaXMgYWN0aXZlIChub3QgaW4gY2FzZSBvZiBjdXJzb3IgaW5mbyBzZWxlY3RvcilcclxuICAgICAgICBpZighdGhpcy5fY3Vyc29ySW5mb1NlbGVjdG9ySXNBY3RpdmUpe1xyXG4gICAgICAgICAgICBpZih0aGlzLl9jdXJzb3JTaWduYWxzRGF0YU1vZGVsICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgY3Vyc29yU2lnbmFscyA9IHRoaXMuX2N1cnNvclNpZ25hbHNEYXRhTW9kZWwuZ2V0Q3Vyc29yU2lnbmFscygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVEYXRhU291cmNlKGN1cnNvclNpZ25hbHMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBzZXQgdGhlIHNlbGVjdGlvbiB0byB0aGUgc2VsZWN0IHNpZ25hbCBiZWZvcmVcclxuICAgICAgICAgICAgbGV0IHRyZWVHcmlkT2JqZWN0OiBhbnkgPSB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U2VsZWN0aW9uV2l0aEN1cnNvclNpZ25hbHModHJlZUdyaWRPYmplY3QsIHRoaXMuX3NlbGVjdGVkQ3Vyc29yU2lnbmFscyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBVcGRhdGUgY3Vyc29yIGluZm8gdmFsdWVzIFxyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hDdXJzb3JTdGF0ZXMoKTsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUcmlnZ2VyIHRoZSB1cGRhdGUgb2YgdGhlIGN1cnNvckluZm9zIGZvciB0aGUgY3VycmVudCBjdXJzb3Igc3RhdGVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVmcmVzaEN1cnNvclN0YXRlcygpe1xyXG4gICAgICAgIHRoaXMudXBkYXRlQ3Vyc29yU3RhdGVzKHRoaXMuY3Vyc29yc1N0YXRlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVEYXRhU291cmNlKGN1cnNvclNpZ25hbHM6IEFycmF5PEN1cnNvclNpZ25hbD4pe1xyXG4gICAgICAgIHRoaXMuc2V0Q3Vyc29yVmFsdWVVaUlkcyhjdXJzb3JTaWduYWxzKTtcclxuXHJcbiAgICAgICAgLy8gUmVmcmVzaCBUcmVlR3JpZCB3aXRoIG5ldyBkYXRhc291cmNlXHJcbiAgICAgICAgdGhpcy5zZXRNb2RlbChjdXJzb3JTaWduYWxzKTtcclxuXHJcbiAgICAgICAgLy8gUmVmcmVzaCB0aGUgY3Vyc29yIHZhbHVlcyBhZnRlciB1cGRhdGluZyB0aGUgbW9kZWxcclxuICAgICAgICB0aGlzLnJlZnJlc2hDdXJzb3JWYWx1ZXMoY3Vyc29yU2lnbmFscyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIGFuZCBzZXRzIHVpZHMgZm9yIGV2ZXJ5IGN1cnNvciB2YWx1ZSAoY3Vyc29yIHNpZ25hbHMgYW5kIGN1cnNvciBpbmZvcylcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxDdXJzb3JTaWduYWw+fSBjdXJzb3JTaWduYWxzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldEN1cnNvclZhbHVlVWlJZHMoY3Vyc29yU2lnbmFsczogQXJyYXk8Q3Vyc29yU2lnbmFsPikge1xyXG4gICAgICAgIGxldCBjdXJzb3JJbmZvSWQgPSAwO1xyXG4gICAgICAgIGN1cnNvclNpZ25hbHMuZm9yRWFjaCgoY3Vyc29yU2lnbmFsKT0+e1xyXG4gICAgICAgICAgICAoPElVaUJpbmRpbmc+PGFueT5jdXJzb3JTaWduYWwpLnVpSWQgPSBjdXJzb3JJbmZvSWQrKztcclxuICAgICAgICAgICAgY3Vyc29yU2lnbmFsLmN1cnNvckluZm9zLmZvckVhY2goKGN1cnNvckluZm8pPT57XHJcbiAgICAgICAgICAgICAgICAgKDxJVWlCaW5kaW5nPjxhbnk+Y3Vyc29ySW5mbykudWlJZCA9IGN1cnNvckluZm9JZCsrO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVmcmVzaCBhbGwgY3Vyc29yIHZhbHVlc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlZnJlc2hDdXJzb3JWYWx1ZXMoY3Vyc29yU2lnbmFsczogQ3Vyc29yU2lnbmFsW118dW5kZWZpbmVkID0gdW5kZWZpbmVkKSB7ICAgICAgICAgICAgICAgXHJcbiAgICAgICAgaWYoY3Vyc29yU2lnbmFscyA9PSB1bmRlZmluZWQgJiYgdGhpcy5fY3Vyc29yU2lnbmFsc0RhdGFNb2RlbCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBjdXJzb3JTaWduYWxzID0gdGhpcy5fY3Vyc29yU2lnbmFsc0RhdGFNb2RlbC5nZXRDdXJzb3JTaWduYWxzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGN1cnNvclNpZ25hbHMgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgY3Vyc29yU2lnbmFscy5mb3JFYWNoKChjdXJzb3JTaWduYWwpPT57IFxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ3Vyc29yVmFsdWVGaWVsZChjdXJzb3JTaWduYWwpO1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yU2lnbmFsLmN1cnNvckluZm9zLmZvckVhY2goKGN1cnNvckluZm8pPT57XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ3Vyc29yVmFsdWVGaWVsZChjdXJzb3JJbmZvKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHVwZGF0ZXMgYSBjdXJzb3IgdmFsdWUgZmllbGQgd2l0aCB0aGUgY3VycmVudCB2YWx1ZXMgb2YgdGhlIGNvcnJlc3BvbmRpZyBjdXJzb3Igc2lnbmFsIG9yIGluZm9cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtDdXJzb3JTaWduYWx8Q3Vyc29ySW5mb30gY3Vyc29yU2lnbmFsT3JJbmZvXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlZnJlc2hDdXJzb3JWYWx1ZUZpZWxkKGN1cnNvclNpZ25hbE9ySW5mbzogQ3Vyc29yU2lnbmFsfEN1cnNvckluZm8pIHtcclxuICAgICAgICBpZiAoY3Vyc29yU2lnbmFsT3JJbmZvKSB7XHJcbiAgICAgICAgICAgIC8vIGdldCB0aGUgY29ycmVzcG9uZGluZyB1aSBlbGVtZW50XHJcbiAgICAgICAgICAgIGxldCBjdXJzb3JWYWx1ZUVsZW1lbnQgPSB0aGlzLmdldEN1cnNvclZhbHVlRWxlbWVudChjdXJzb3JTaWduYWxPckluZm8pO1xyXG5cclxuICAgICAgICAgICAgbGV0IHZhbHVlU3RyaW5nOiBzdHJpbmcgPSBjdXJzb3JTaWduYWxPckluZm8udmFsdWUudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgaWYgKGN1cnNvclZhbHVlRWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yVmFsdWVFbGVtZW50LmlubmVyVGV4dCA9IHZhbHVlU3RyaW5nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgY29ycmVzcG9uZGluZyBjdXJzb3Igc2lnbmFsIG9yIGluZm8gZWxlbWVudFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0N1cnNvclNpZ25hbHxDdXJzb3JJbmZvfSBjdXJzb3JTaWduYWxPckluZm9cclxuICAgICAqIEByZXR1cm5zIHsoSFRNTEVsZW1lbnQgfCBudWxsKX1cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0Q3Vyc29yVmFsdWVFbGVtZW50KGN1cnNvclNpZ25hbE9ySW5mbzogQ3Vyc29yU2lnbmFsfEN1cnNvckluZm8pOiBIVE1MRWxlbWVudCB8IG51bGwge1xyXG4gICAgICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnBhcmVudENvbnRlbnRJZCArIENVUlNPUl9WQUxVRV9JRCArICg8SVVpQmluZGluZz48YW55PmN1cnNvclNpZ25hbE9ySW5mbykudWlJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkN1cnNvclNpZ25hbHNEYXRhTW9kZWxDaGFuZ2VkKHNlbmRlciwgYXJncyl7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICAgICAgdGhpcy5zYXZlVHJlZUdyaWRTZXR0aW5ncygpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgbWV0aG9kIHdpbGwgdXBkYXRlIHRoZSBjdXJzb3IgaW5mbyB3aWRnZXQgd2l0aCBkYXRhIGZyb21cclxuICAgICAqIHRoZSBjdXJzb3Igc3RhdGUuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Q3Vyc29yU3RhdGVzfSBtb2RpZmllZFN0YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZUluZm9DdXJzb3JzV2l0aE5ld1N0YXRlVmFsdWVzIChtb2RpZmllZFN0YXRlOiBDdXJzb3JTdGF0ZXMpIHtcclxuICAgICAgICBpZih0aGlzLl9jdXJzb3JTaWduYWxzRGF0YU1vZGVsICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnNvclNpZ25hbHNEYXRhTW9kZWwuZ2V0Q3Vyc29yU2lnbmFscygpLmZvckVhY2goKGN1cnNvclNpZ25hbDogQ3Vyc29yU2lnbmFsKT0+e1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5fY3Vyc29yU2lnbmFsc0RhdGFNb2RlbCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGN1cnNvclNpZ25hbC5zZXJpZS5yYXdQb2ludHNWYWxpZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1cnNvclNpZ25hbHNEYXRhTW9kZWwudXBkYXRlQ3Vyc29yVmFsdWVzKGN1cnNvclNpZ25hbCwgbW9kaWZpZWRTdGF0ZS5nZXRQb3NpdGlvbigwLCBjdXJzb3JTaWduYWwuc2VyaWUuY3Vyc29yVHlwZSksIG1vZGlmaWVkU3RhdGUuZ2V0UG9zaXRpb24oMSwgY3Vyc29yU2lnbmFsLnNlcmllLmN1cnNvclR5cGUpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3Vyc29yU2lnbmFsc0RhdGFNb2RlbC5jbGVhckN1cnNvclZhbHVlcyhjdXJzb3JTaWduYWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3Rvb2xiYXIudXBkYXRlQnV0dG9uU3RhdGVzKG1vZGlmaWVkU3RhdGUpO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEN1cnNvclZhbHVlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29udmVydCBjdXN0b20gY2hlY2sgYm94ZXMgaW50byBzeW5jZnVzaW9uIGNoZWNrIGJveGVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlQ2hlY2tCb3hlcygpIHtcclxuICAgICAgICB2YXIgY2hlY2tCb3hlcyA9ICQoJy5jdXN0b21DaGVja2JveCcpO1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBjaGVja0JveGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNoZWNrQm94ZXNbaV0uaWQgPSAnY3VzdG9tQ2hlY2tib3gnICsgKGkgKyAxKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdFN5bmNmdXNpb25DaGVja2JveChjaGVja0JveGVzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbnN0YW50aWF0ZSBzeW5jZnVzaW9uIGNoZWNrIGJveFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjdXN0b21DaGVja2JveFxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdFN5bmNmdXNpb25DaGVja2JveChjdXN0b21DaGVja2JveDogSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICB2YXIgZW5hYmxlVHJpU3RhdGUgPSBmYWxzZTtcclxuICAgICAgICB2YXIgc3RhdGUgPSB0aGlzLmdldEN1c3RvbUNoZWNrYm94U3RhdGUoJChjdXN0b21DaGVja2JveCkpO1xyXG4gICAgICAgIGlmIChzdGF0ZSA9PT0gJ2luZGV0ZXJtaW5hdGUnKSB7IGVuYWJsZVRyaVN0YXRlID0gdHJ1ZTsgfVxyXG4gICAgICAgICQoY3VzdG9tQ2hlY2tib3gpLmVqQ2hlY2tCb3goXHJcbiAgICAgICAgICAgIHsgIFxyXG4gICAgICAgICAgICBlbmFibGVUcmlTdGF0ZTogZW5hYmxlVHJpU3RhdGUsXHJcbiAgICAgICAgICAgIGlkOiBjdXN0b21DaGVja2JveC5pZCxcclxuICAgICAgICAgICAgY2hlY2tTdGF0ZTogc3RhdGUsXHJcbiAgICAgICAgICAgIGNoYW5nZTogKGFyZ3MpID0+IHRoaXMuc3luY2Z1c2lvbkNoZWNrQm94Q2hhbmdlZChhcmdzKSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUcmlnZ2VyIGNoZWNrIGJveCBjaGFuZ2UgZXZlbnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN5bmNmdXNpb25DaGVja0JveENoYW5nZWQoYXJncykge1xyXG4gICAgICAgIGlmIChhcmdzLm1vZGVsLmVuYWJsZVRyaVN0YXRlKSB7XHJcbiAgICAgICAgICAgICQoJyMnICsgYXJncy5tb2RlbC5pZCkuZWpDaGVja0JveCh7ZW5hYmxlVHJpU3RhdGU6IGZhbHNlfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2V0U2VsZWN0ZWRDdXJzb3JzSW5mbyhhcmdzKTtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgY3VzdG9tQ2hlY2tib3ggPSAkKCcjJyArIGFyZ3MubW9kZWwuaWQpO1xyXG4gICAgICAgIGN1c3RvbUNoZWNrYm94LmNoYW5nZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHNlbGVjdGVkIGN1cnNvciBpbmZvIHdoZW4gY2hlY2tib3ggaXMgY2xpY2tlZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgc2V0U2VsZWN0ZWRDdXJzb3JzSW5mbyhhcmdzKXtcclxuICAgICAgICB2YXIgdHJlZWdyaWQ6IGFueSA9IHRoaXMuZ2V0VHJlZUdyaWRPYmplY3QoKTtcclxuICAgICAgICB2YXIgaW5kZXggPSBwYXJzZUludChhcmdzLm1vZGVsLmlkLnNwbGl0KCdjdXN0b21DaGVja2JveCcpWzFdLCAxMCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuX3NlbGVjdGVkQ3Vyc29ySW5mb3NPbGQgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkQ3Vyc29ySW5mb3NPbGQgPSB0cmVlZ3JpZC5tb2RlbC5mbGF0UmVjb3Jkc1tpbmRleF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZEN1cnNvckluZm9zT2xkID0gdGhpcy5fc2VsZWN0ZWRDdXJzb3JJbmZvc05ldztcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWRDdXJzb3JJbmZvc05ldyA9IHRyZWVncmlkLm1vZGVsLmZsYXRSZWNvcmRzW2luZGV4XTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldCBzdGF0ZSBvZiBjaGVja2JveFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0pRdWVyeTxIVE1MRWxlbWVudD59IGNoZWNrYm94XHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRDdXN0b21DaGVja2JveFN0YXRlKGNoZWNrYm94OiBKUXVlcnk8SFRNTEVsZW1lbnQ+KTogc3RyaW5nIHtcclxuICAgICAgICBpZiAoY2hlY2tib3guaXMoJzpjaGVja2VkJykpIHtcclxuICAgICAgICAgICAgcmV0dXJuICdjaGVjayc7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjaGVja2JveC5pcygnOmluZGV0ZXJtaW5hdGUnKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJ2luZGV0ZXJtaW5hdGUnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuICd1bmNoZWNrJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBdHRhY2hlcyB0aGUgY2hhcnQgbWFuYWdlciBkYXRhbW9kZWwgZXZlbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXR0YWNoQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsRXZlbnRzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9jaGFydE1hbmFnZXJEYXRhTW9kZWwpIHtcclxuICAgICAgICAgICAgdGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsLmV2ZW50TW9kZWxDaGFuZ2VkLmF0dGFjaCh0aGlzLl9jaGFydE1hbmFnZXJNb2RlbENoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXRhY2hlcyB0aGUgY2hhcnQgbWFuYWdlciBkYXRhbW9kZWwgZXZlbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZGV0YWNoQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsRXZlbnRzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9jaGFydE1hbmFnZXJEYXRhTW9kZWwpIHtcclxuICAgICAgICAgICAgdGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsLmV2ZW50TW9kZWxDaGFuZ2VkLmRldGFjaCh0aGlzLl9jaGFydE1hbmFnZXJNb2RlbENoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjaGFydE1hbmFnZXJNb2RlbCBoYXMgY2hhbmdlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uQ2hhcnRNYW5hZ2VyTW9kZWxDaGFuZ2VkKHNlbmRlciwgYXJncykge1xyXG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgY3Vyc29yIGluZm8gd2lkZ2V0XHJcbiAgICAgICAgaWYgKGFyZ3MuaGludCA9PSBDaGFydE1hbmFnZXJEYXRhTW9kZWxDaGFuZ2VkSGludC5hZGRTZXJpZSAmJiBhcmdzLmRhdGEuc2VyaWVzICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLmFkZFNlcmllcyhhcmdzLmRhdGEuc2VyaWVzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoYXJncy5oaW50ID09IENoYXJ0TWFuYWdlckRhdGFNb2RlbENoYW5nZWRIaW50LnJlbW92ZVNlcmllKSB7XHJcbiAgICAgICAgICAgIGlmIChhcmdzLmRhdGEuc2lnbmFsVXNlZEluT3RoZXJDaGFydHMgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlU2VyaWUoYXJncy5kYXRhLnNlcmllKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgQ3Vyc29ySW5mb1dpZGdldCB9OyJdfQ==