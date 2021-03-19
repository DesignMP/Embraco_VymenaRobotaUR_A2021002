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
define(["require", "exports", "./interfaces/cursorInfoWidgetInterface", "../common/treeGridWidgetBase", "./view/cursorInfoTreeGridToolbar", "./model/cursorSignalsDataModel", "./model/ytCursorSignal", "./model/xyCursorSignal", "./model/fftCursorSignal", "./model/cursorInfo", "../common/states/cursorStates", "./model/dynamicCursorSignalTemplate", "./model/cursorSignal", "../../common/seriesHelper", "../../common/utilities/binSearch", "../common/states/chartViewToolbarStates", "../../models/chartManagerDataModel/seriesType", "./defaultComponentSettings", "../common/widgetBase"], function (require, exports, cursorInfoWidgetInterface_1, treeGridWidgetBase_1, cursorInfoTreeGridToolbar_1, cursorSignalsDataModel_1, ytCursorSignal_1, xyCursorSignal_1, fftCursorSignal_1, cursorInfo_1, cursorStates_1, dynamicCursorSignalTemplate_1, cursorSignal_1, seriesHelper_1, binSearch_1, chartViewToolbarStates_1, seriesType_1, defaultComponentSettings_1, widgetBase_1) {
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
            _this._selectedCursorSignals = new Array();
            _this._filterModified = false;
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
            _super.prototype.setHeaderContent.call(this, "Cursors");
            // Set dynamic column settings
            _super.prototype.setDynamicColumn.call(this, 1, 80);
            // Attach event
            this._cursorSignalsDataModel.eventModelChanged.attach(this._cursorSignalsDataModelChangedHandler);
        };
        CursorInfoWidget.prototype.initializeComponent = function () {
            this.component.defaultSettingsDataId = defaultComponentSettings_1.DefaultComponentSettings.WidgetDefinitionId;
            this.component.disablePersisting();
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
        CursorInfoWidget.prototype.initialized = function () {
            // Refresh treeGrid to see the loaded persisting data
            this.refresh();
            // Set column sizes after all other work was done => TODO: must be solved in an other way => maybe invisible columns make some problems here
            var columnSettings = this.component.getSetting(treeGridWidgetBase_1.TreeGridWidgetBase.ColumnsSettingId);
            this.setColumnSettings(columnSettings);
        };
        CursorInfoWidget.prototype.dispose = function () {
            // Detach events
            this._cursorSignalsDataModel.eventModelChanged.detach(this._cursorSignalsDataModelChangedHandler);
            _super.prototype.dispose.call(this);
        };
        /**
         * Returns the default component settings for this widget
         *
         * @returns {*}
         * @memberof CursorInfoWidget
         */
        CursorInfoWidget.prototype.getDefaultComponentSettings = function () {
            return defaultComponentSettings_1.DefaultComponentSettings.getCursorInfoDefinition();
        };
        CursorInfoWidget.prototype.getComponentSettings = function () {
            this.component.setSetting(widgetBase_1.WidgetBase.WidgetSettingId, this.getWidgetSettings());
            this.component.setSetting("dataModel", this._cursorSignalsDataModel.getComponentSettings());
            return _super.prototype.getComponentSettings.call(this);
        };
        CursorInfoWidget.prototype.setComponentSettings = function (data) {
            if (data != undefined) {
                _super.prototype.setComponentSettings.call(this, data);
                this.setDataModelData(this.component.getSetting("dataModel"));
                this.setWidgetSettings(this.component.getSetting(widgetBase_1.WidgetBase.WidgetSettingId));
            }
        };
        CursorInfoWidget.prototype.getWidgetSettings = function () {
            var indices = new Array();
            for (var i = 0; i < this._selectedCursorSignals.length; i++) {
                var selectedCursorSignal = this._selectedCursorSignals[i];
                var index = this._cursorSignalsDataModel.getIndex(selectedCursorSignal);
                if (index != -1) {
                    indices.push(index);
                }
            }
            var settings = { "cursorInfoSelectorIsActive": this._cursorInfoSelectorIsActive, "selectedIndices": indices };
            return settings;
        };
        CursorInfoWidget.prototype.setDataModelData = function (data) {
            this._cursorSignalsDataModel.setComponentSettings(data);
            this.updateDataSource(this._cursorSignalsDataModel.getCursorSignals());
        };
        CursorInfoWidget.prototype.setWidgetSettings = function (data) {
            if (data == undefined) {
                return;
            }
            var cursorSignals = this._cursorSignalsDataModel.getCursorSignals();
            var selectedCursorSignals = new Array();
            if (cursorSignals.length > 0) {
                if (data.selectedIndices != undefined) {
                    for (var i = 0; i < data.selectedIndices.length; i++) {
                        selectedCursorSignals.push(cursorSignals[data.selectedIndices[i]]);
                    }
                }
            }
            this._selectedCursorSignals = selectedCursorSignals;
            this.setSelectionWithCursorSignals(this.getTreeGridObject(), selectedCursorSignals);
            this.activateCursorInfoSelectorView(data.cursorInfoSelectorIsActive);
            this.updateCursorInfoSelectorButtonState();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3Vyc29ySW5mb1dpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jdXJzb3JJbmZvV2lkZ2V0L2N1cnNvckluZm9XaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBcUJBLG9EQUFvRDtJQUNwRCxJQUFNLGVBQWUsR0FBRyxjQUFjLENBQUM7SUFFdkM7Ozs7O09BS0c7SUFDSDtRQUErQixvQ0FBa0I7UUFBakQ7WUFBQSxxRUEycUNDO1lBMXFDVyw2QkFBdUIsR0FBMkIsSUFBSSwrQ0FBc0IsRUFBRSxDQUFDO1lBQy9FLGtDQUE0QixHQUF1QyxJQUFJLEtBQUssRUFBK0IsQ0FBQztZQUU1RywyQ0FBcUMsR0FBRyxVQUFDLE1BQU0sRUFBQyxJQUFJLElBQUcsT0FBQSxLQUFJLENBQUMsK0JBQStCLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxFQUFqRCxDQUFpRCxDQUFDO1lBRXpHLDRCQUFzQixHQUF3QixJQUFJLEtBQUssRUFBZ0IsQ0FBQztZQUN4RSxxQkFBZSxHQUFHLEtBQUssQ0FBQztZQUd4QixpQ0FBMkIsR0FBRyxLQUFLLENBQUM7WUFJM0IsdUJBQWlCLEdBQUcsU0FBUyxDQUFDO1lBQzlCLG9CQUFjLEdBQUcsTUFBTSxDQUFDO1lBQ3hCLHFCQUFlLEdBQUcsT0FBTyxDQUFDO1lBQzFCLDJCQUFxQixHQUFHLGFBQWEsQ0FBQztZQUN0Qyw4QkFBd0IsR0FBRyxnQkFBZ0IsQ0FBQztZQUU1Qyw4QkFBd0IsR0FBRyxlQUFlLENBQUM7WUFFNUQsMkpBQTJKO1lBQzNKLGdGQUFnRjtZQUN0RSxtQkFBYSxHQUFpQixJQUFJLDJCQUFZLEVBQUUsQ0FBQzs7UUFtcEMvRCxDQUFDO1FBanBDRzs7OztXQUlHO1FBQ0gscUNBQVUsR0FBVixVQUFXLGlCQUF5QjtZQUNoQyxpQkFBTSx3QkFBd0IsV0FBRSxDQUFDLENBQUEsbUVBQW1F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QUM1QyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDNUIsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gsaURBQXNCLEdBQXRCLFVBQXVCLElBQUk7WUFDdkIsSUFBSSxRQUFRLEdBQVEsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDN0MsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRW5FLElBQUksSUFBSSxDQUFDLHVCQUF1QixJQUFJLFNBQVMsRUFBRTtnQkFDM0MsSUFBSSxDQUFDLHVCQUF1QixHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3BFO2lCQUNJO2dCQUNELElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUM7YUFDL0Q7WUFFRCxJQUFJLENBQUMsdUJBQXVCLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckUsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSyxpREFBc0IsR0FBOUIsVUFBK0IsUUFBNkI7WUFDeEQsSUFBSSxRQUFRLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUN6QixPQUFPLE9BQU8sQ0FBQzthQUNsQjtpQkFBTSxJQUFJLFFBQVEsQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtnQkFDdEMsT0FBTyxlQUFlLENBQUM7YUFDMUI7aUJBQ0k7Z0JBQ0QsT0FBTyxTQUFTLENBQUM7YUFDcEI7UUFDTCxDQUFDO1FBQ0wsdUJBQUM7SUFBRCxDQUFDLEFBM3FDRCxDQUErQix1Q0FBa0IsR0EycUNoRDtJQUVRLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDdXJzb3JJbmZvV2lkZ2V0LEN1cnNvck1vdmVtZW50IH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9jdXJzb3JJbmZvV2lkZ2V0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFRyZWVHcmlkV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vdHJlZUdyaWRXaWRnZXRCYXNlXCI7XHJcbmltcG9ydCB7IEN1cnNvckluZm9UcmVlR3JpZFRvb2xiYXIgfSBmcm9tIFwiLi92aWV3L2N1cnNvckluZm9UcmVlR3JpZFRvb2xiYXJcIjtcclxuaW1wb3J0IHsgQ3Vyc29yU2lnbmFsc0RhdGFNb2RlbCB9IGZyb20gXCIuL21vZGVsL2N1cnNvclNpZ25hbHNEYXRhTW9kZWxcIjtcclxuaW1wb3J0IHsgWVRDdXJzb3JTaWduYWwgfSBmcm9tIFwiLi9tb2RlbC95dEN1cnNvclNpZ25hbFwiO1xyXG5pbXBvcnQgeyBYWUN1cnNvclNpZ25hbCB9IGZyb20gXCIuL21vZGVsL3h5Q3Vyc29yU2lnbmFsXCI7XHJcbmltcG9ydCB7IEZGVEN1cnNvclNpZ25hbCB9IGZyb20gXCIuL21vZGVsL2ZmdEN1cnNvclNpZ25hbFwiO1xyXG5pbXBvcnQgeyBJVWlCaW5kaW5nIH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL3dpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDdXJzb3JJbmZvIH0gZnJvbSBcIi4vbW9kZWwvY3Vyc29ySW5mb1wiO1xyXG5pbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvYmFzZVNlcmllc1wiO1xyXG5pbXBvcnQgeyBDdXJzb3JTdGF0ZXMsIEN1cnNvclR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL3N0YXRlcy9jdXJzb3JTdGF0ZXNcIjtcclxuaW1wb3J0IHsgRHluYW1pY0N1cnNvclNpZ25hbFRlbXBsYXRlIH0gZnJvbSBcIi4vbW9kZWwvZHluYW1pY0N1cnNvclNpZ25hbFRlbXBsYXRlXCI7XHJcbmltcG9ydCB7IEN1cnNvclNpZ25hbCB9IGZyb20gXCIuL21vZGVsL2N1cnNvclNpZ25hbFwiO1xyXG5pbXBvcnQgeyBTZXJpZXNIZWxwZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3Nlcmllc0hlbHBlclwiO1xyXG5pbXBvcnQgeyBCaW5TZWFyY2hNb2RlIGFzIFNlYXJjaE1vZGUgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3V0aWxpdGllcy9iaW5TZWFyY2hcIjtcclxuaW1wb3J0IHsgQ2hhcnRWaWV3VG9vbFN0YXRlLCBDaGFydFZpZXdUb29sU3RhdGVFbnVtIH0gZnJvbSBcIi4uL2NvbW1vbi9zdGF0ZXMvY2hhcnRWaWV3VG9vbGJhclN0YXRlc1wiO1xyXG5pbXBvcnQgeyBTZXJpZXNUeXBlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvc2VyaWVzVHlwZVwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnRTZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi9kZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vd2lkZ2V0QmFzZVwiO1xyXG5cclxuLy8gZGVmaW5lcyB0aGUgYmFzZSBpZCBmb3IgdGhlIGN1cnNvciB2YWx1ZSB0ZW1wbGF0ZVxyXG5jb25zdCBDVVJTT1JfVkFMVUVfSUQgPSBcImN1cnNvclZhbHVlX1wiO1xyXG5cclxuLyoqXHJcbiAqIGltcGxlbWVudHMgdGhlIEN1cnNvckluZm8gV2lkZ2V0XHJcbiAqXHJcbiAqIEBjbGFzcyBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAqIEBleHRlbmRzIHtUcmVlR3JpZFdpZGdldEJhc2V9XHJcbiAqL1xyXG5jbGFzcyBDdXJzb3JJbmZvV2lkZ2V0IGV4dGVuZHMgVHJlZUdyaWRXaWRnZXRCYXNlIGltcGxlbWVudHMgSUN1cnNvckluZm9XaWRnZXQge1xyXG4gICAgcHJpdmF0ZSBfY3Vyc29yU2lnbmFsc0RhdGFNb2RlbDogQ3Vyc29yU2lnbmFsc0RhdGFNb2RlbCA9IG5ldyBDdXJzb3JTaWduYWxzRGF0YU1vZGVsKCk7XHJcbiAgICBwcml2YXRlIF9jdXJzb3JJbmZvVGVtcGxhdGVEYXRhTW9kZWw6IEFycmF5PER5bmFtaWNDdXJzb3JTaWduYWxUZW1wbGF0ZT4gPSBuZXcgQXJyYXk8RHluYW1pY0N1cnNvclNpZ25hbFRlbXBsYXRlPigpO1xyXG5cclxuICAgIHByaXZhdGUgX2N1cnNvclNpZ25hbHNEYXRhTW9kZWxDaGFuZ2VkSGFuZGxlciA9IChzZW5kZXIsYXJncyk9PnRoaXMub25DdXJzb3JTaWduYWxzRGF0YU1vZGVsQ2hhbmdlZChzZW5kZXIsYXJncyk7XHJcblxyXG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWRDdXJzb3JTaWduYWxzOiBBcnJheTxDdXJzb3JTaWduYWw+ID0gbmV3IEFycmF5PEN1cnNvclNpZ25hbD4oKTtcclxuICAgIHByaXZhdGUgX2ZpbHRlck1vZGlmaWVkID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9zZWxlY3RlZEN1cnNvckluZm9zT2xkO1xyXG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWRDdXJzb3JJbmZvc05ldztcclxuICAgIHByaXZhdGUgX2N1cnNvckluZm9TZWxlY3RvcklzQWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgcHJpdmF0ZSBfdG9vbGJhciE6IEN1cnNvckluZm9UcmVlR3JpZFRvb2xiYXI7XHJcbiAgICBcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2NvbHVtbklkX1Zpc2libGUgPSBcInZpc2libGVcIjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2NvbHVtbklkX05hbWUgPSBcIm5hbWVcIjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2NvbHVtbklkX1ZhbHVlID0gXCJ2YWx1ZVwiO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfY29sdW1uSWRfRGVzY3JpcHRpb24gPSBcImRlc2NyaXB0aW9uXCI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9jb2x1bW5JZF9JY29uRGVmaW5pdGlvbiA9IFwiaWNvbkRlZmluaXRpb25cIjtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfaW5kZXRlcm1pbmF0ZVN0YXRlVmFsdWUgPSBcImluZGV0ZXJtaW5hdGVcIjtcclxuXHJcbiAgICAvLyBob2xkcyB0aGUgY3VycmVudCBjdXJzb3Igc3RhdGVzIHZhbHVlcy4gV2UgaW5pdGlhbGl6ZSB0aGUgbWVtYmVyIGZvciBkZWZhdWx0LiBUaGUgZWZmZWN0aXZlIGluaXRpYWxpemF0aW9uIHRha2VzIHBsYWNlIHdoZW4gdGhlIGV4dGVybmFsIHNoYXJlZCBpbnN0YW5jZVxyXG4gICAgLy8gb2YgdGhlIGN1cnNvciBzdGF0ZXMgaXMgY3JlYXRlZCBhbmQgcmVmbGVjdGVkIHRocm91Z2ggdGhlIGN1cm9yU3RhdGVzIHNldHRlciFcclxuICAgIHByb3RlY3RlZCBfY3Vyc29yU3RhdGVzOiBDdXJzb3JTdGF0ZXMgPSBuZXcgQ3Vyc29yU3RhdGVzKCk7XHJcblxyXG4gICAgLyoqICBpbml0aWFsaXplIHRoZSB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGF5b3V0Q29udGFpbmVySWRcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQ6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyLnNldEhlYWRlckZpbHRlckJhckhpZGRlbigpOy8vIE11c3QgYmUgc2V0IGJlZm9yZSBpbml0aWFsaXphdGlvbiB0byBhdm9pZCBzaG93aW5nIHRoZSBmaWx0ZXJiYXJcclxuXHJcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZShsYXlvdXRDb250YWluZXJJZCwgMzApO1xyXG4gICAgICAgIHN1cGVyLnNldEhlYWRlckNvbnRlbnQoXCJDdXJzb3JzXCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFNldCBkeW5hbWljIGNvbHVtbiBzZXR0aW5nc1xyXG4gICAgICAgIHN1cGVyLnNldER5bmFtaWNDb2x1bW4oMSwgODApO1xyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAvLyBBdHRhY2ggZXZlbnRcclxuICAgICAgICB0aGlzLl9jdXJzb3JTaWduYWxzRGF0YU1vZGVsLmV2ZW50TW9kZWxDaGFuZ2VkLmF0dGFjaCh0aGlzLl9jdXJzb3JTaWduYWxzRGF0YU1vZGVsQ2hhbmdlZEhhbmRsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRpYWxpemVDb21wb25lbnQoKXtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5kZWZhdWx0U2V0dGluZ3NEYXRhSWQgPSBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuV2lkZ2V0RGVmaW5pdGlvbklkO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmRpc2FibGVQZXJzaXN0aW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBjdXJzb3JzIHN0YXRlc1xyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEB0eXBlIHtDdXJzb3JTdGF0ZXN9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3VG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0IGN1cnNvcnNTdGF0ZXMoKSA6IEN1cnNvclN0YXRlcyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnNvclN0YXRlcztcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgY3Vyc29ycyBzdGF0ZXMuIFRoZSBtZXRob2QgaXMgY2FsbGVkIGF1dG9tYXRpY2FsbHkgd2hlbmV2ZXIgYSBjdXJzb3Igc3RhdGUgaGFzIGJlZW4gY2hhbmdlZCBleHRlcm5hbGx5LiBcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3VG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgc2V0IGN1cnNvcnNTdGF0ZXMoY3Vyc29yU3RhdGVzIDogQ3Vyc29yU3RhdGVzKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gdXBkYXRlIHRoZSBiYWNrdXAgZmllbGRcclxuICAgICAgICB0aGlzLl9jdXJzb3JTdGF0ZXMgPSBjdXJzb3JTdGF0ZXM7XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlSW5mb0N1cnNvcnNXaXRoTmV3U3RhdGVWYWx1ZXMoY3Vyc29yU3RhdGVzKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBjdXJzb3Igc3RhdGVzLlxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBwYXJhbSB7Q3Vyc29yU3RhdGVzfSBjdXJzb3JTdGF0ZXNcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHVwZGF0ZUN1cnNvclN0YXRlcyhjdXJzb3JTdGF0ZXM6Q3Vyc29yU3RhdGVzKXtcclxuICAgICAgICAvLyBCSU5ESU5HU09VUkNFOiBkaXNwYXRjaGVzIHRoZSBtZXRob2QgY2FsbCB0byBib3VuZCB0YXJnZXRzXHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZWQoKXtcclxuICAgICAgICAvLyBSZWZyZXNoIHRyZWVHcmlkIHRvIHNlZSB0aGUgbG9hZGVkIHBlcnNpc3RpbmcgZGF0YVxyXG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG5cclxuICAgICAgICAvLyBTZXQgY29sdW1uIHNpemVzIGFmdGVyIGFsbCBvdGhlciB3b3JrIHdhcyBkb25lID0+IFRPRE86IG11c3QgYmUgc29sdmVkIGluIGFuIG90aGVyIHdheSA9PiBtYXliZSBpbnZpc2libGUgY29sdW1ucyBtYWtlIHNvbWUgcHJvYmxlbXMgaGVyZVxyXG4gICAgICAgIGxldCBjb2x1bW5TZXR0aW5ncyA9IHRoaXMuY29tcG9uZW50LmdldFNldHRpbmcoVHJlZUdyaWRXaWRnZXRCYXNlLkNvbHVtbnNTZXR0aW5nSWQpO1xyXG4gICAgICAgIHRoaXMuc2V0Q29sdW1uU2V0dGluZ3MoY29sdW1uU2V0dGluZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3Bvc2UoKXtcclxuICAgICAgICAvLyBEZXRhY2ggZXZlbnRzXHJcbiAgICAgICAgdGhpcy5fY3Vyc29yU2lnbmFsc0RhdGFNb2RlbC5ldmVudE1vZGVsQ2hhbmdlZC5kZXRhY2godGhpcy5fY3Vyc29yU2lnbmFsc0RhdGFNb2RlbENoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IGNvbXBvbmVudCBzZXR0aW5ncyBmb3IgdGhpcyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGdldERlZmF1bHRDb21wb25lbnRTZXR0aW5ncygpOiBDb21wb25lbnRTZXR0aW5nc3tcclxuICAgICAgICByZXR1cm4gRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLmdldEN1cnNvckluZm9EZWZpbml0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBwdWJsaWMgZ2V0Q29tcG9uZW50U2V0dGluZ3MoKTogQ29tcG9uZW50U2V0dGluZ3N7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuc2V0U2V0dGluZyhXaWRnZXRCYXNlLldpZGdldFNldHRpbmdJZCwgdGhpcy5nZXRXaWRnZXRTZXR0aW5ncygpKTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5zZXRTZXR0aW5nKFwiZGF0YU1vZGVsXCIsIHRoaXMuX2N1cnNvclNpZ25hbHNEYXRhTW9kZWwuZ2V0Q29tcG9uZW50U2V0dGluZ3MoKSk7XHJcblx0XHRyZXR1cm4gc3VwZXIuZ2V0Q29tcG9uZW50U2V0dGluZ3MoKTtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0Q29tcG9uZW50U2V0dGluZ3MoZGF0YTogQ29tcG9uZW50U2V0dGluZ3MpIHtcclxuICAgICAgICBpZihkYXRhICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHN1cGVyLnNldENvbXBvbmVudFNldHRpbmdzKGRhdGEpO1xyXG4gICAgICAgICAgICB0aGlzLnNldERhdGFNb2RlbERhdGEodGhpcy5jb21wb25lbnQuZ2V0U2V0dGluZyhcImRhdGFNb2RlbFwiKSk7XHJcblx0XHQgICAgdGhpcy5zZXRXaWRnZXRTZXR0aW5ncyh0aGlzLmNvbXBvbmVudC5nZXRTZXR0aW5nKFdpZGdldEJhc2UuV2lkZ2V0U2V0dGluZ0lkKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICBcclxuICAgIHByaXZhdGUgZ2V0V2lkZ2V0U2V0dGluZ3MoKTogYW55e1xyXG4gICAgICAgIGxldCBpbmRpY2VzID0gbmV3IEFycmF5PG51bWJlcj4oKTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5fc2VsZWN0ZWRDdXJzb3JTaWduYWxzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IHNlbGVjdGVkQ3Vyc29yU2lnbmFsID0gdGhpcy5fc2VsZWN0ZWRDdXJzb3JTaWduYWxzW2ldO1xyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLl9jdXJzb3JTaWduYWxzRGF0YU1vZGVsLmdldEluZGV4KHNlbGVjdGVkQ3Vyc29yU2lnbmFsKTtcclxuICAgICAgICAgICAgaWYoaW5kZXggIT0gLTEpe1xyXG4gICAgICAgICAgICAgICAgaW5kaWNlcy5wdXNoKGluZGV4KTsgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblx0XHRsZXQgc2V0dGluZ3MgPSB7XCJjdXJzb3JJbmZvU2VsZWN0b3JJc0FjdGl2ZVwiOiB0aGlzLl9jdXJzb3JJbmZvU2VsZWN0b3JJc0FjdGl2ZSwgXCJzZWxlY3RlZEluZGljZXNcIjogaW5kaWNlc307IFxyXG5cdFx0cmV0dXJuIHNldHRpbmdzO1xyXG5cdH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBzZXREYXRhTW9kZWxEYXRhKGRhdGE6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX2N1cnNvclNpZ25hbHNEYXRhTW9kZWwuc2V0Q29tcG9uZW50U2V0dGluZ3MoZGF0YSk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVEYXRhU291cmNlKHRoaXMuX2N1cnNvclNpZ25hbHNEYXRhTW9kZWwuZ2V0Q3Vyc29yU2lnbmFscygpKTtcclxuICAgIH1cclxuXHJcblx0cHJpdmF0ZSBzZXRXaWRnZXRTZXR0aW5ncyhkYXRhOiBhbnkpIHtcclxuXHRcdGlmKGRhdGEgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBsZXQgY3Vyc29yU2lnbmFscyA9IHRoaXMuX2N1cnNvclNpZ25hbHNEYXRhTW9kZWwuZ2V0Q3Vyc29yU2lnbmFscygpO1xyXG4gICAgICAgIGxldCBzZWxlY3RlZEN1cnNvclNpZ25hbHMgPSBuZXcgQXJyYXk8Q3Vyc29yU2lnbmFsPigpO1xyXG4gICAgICAgIGlmKGN1cnNvclNpZ25hbHMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIGlmKGRhdGEuc2VsZWN0ZWRJbmRpY2VzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZGF0YS5zZWxlY3RlZEluZGljZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkQ3Vyc29yU2lnbmFscy5wdXNoKGN1cnNvclNpZ25hbHNbZGF0YS5zZWxlY3RlZEluZGljZXNbaV1dKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zZWxlY3RlZEN1cnNvclNpZ25hbHMgPSBzZWxlY3RlZEN1cnNvclNpZ25hbHM7XHJcbiAgICAgICAgdGhpcy5zZXRTZWxlY3Rpb25XaXRoQ3Vyc29yU2lnbmFscyh0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCksIHNlbGVjdGVkQ3Vyc29yU2lnbmFscyk7XHJcbiAgICAgICAgdGhpcy5hY3RpdmF0ZUN1cnNvckluZm9TZWxlY3RvclZpZXcoZGF0YS5jdXJzb3JJbmZvU2VsZWN0b3JJc0FjdGl2ZSk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVDdXJzb3JJbmZvU2VsZWN0b3JCdXR0b25TdGF0ZSgpO1xyXG5cdH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIGNvbHVtbiB0ZW1wbGF0ZXMgZm9yIHRoZSB0cmVlIGdyaWQgYW5kIGFkZHMgdGhlbSB0byB0aGUgd2lkZ2V0IGNvbnRhaW5lclxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBjcmVhdGVDb2x1bW5UZW1wbGF0ZXMoKXtcclxuXHRcdHZhciAkd2lkZ2V0Q29udGFpbmVyID0gJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCk7XHJcblx0XHQkd2lkZ2V0Q29udGFpbmVyLmFwcGVuZCh0aGlzLmdldENvbHVtblRlbXBsYXRlRGF0YSh0aGlzLl9jb2x1bW5JZF9WaXNpYmxlKSk7XHJcblx0XHQkd2lkZ2V0Q29udGFpbmVyLmFwcGVuZCh0aGlzLmdldENvbHVtblRlbXBsYXRlRGF0YSh0aGlzLl9jb2x1bW5JZF9OYW1lKSk7XHJcblx0fVxyXG5cclxuICAgIC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIGNvbHVtbiB0ZW1wbGF0ZSBpbmZvcm1hdGlvbnNcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHJldHVybnMge3N0cmluZ31cclxuXHQgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG5cdCAqL1xyXG4gICAgcHJpdmF0ZSBnZXRDb2x1bW5UZW1wbGF0ZURhdGEoY29sdW1uSWQ6IHN0cmluZykgOiBzdHJpbmd7XHJcbiAgICAgICAgaWYoY29sdW1uSWQgPT0gdGhpcy5fY29sdW1uSWRfVmlzaWJsZSl7XHJcbiAgICAgICAgICAgIHJldHVybiBgPHNjcmlwdCB0eXBlPVwidGV4dC94LWpzcmVuZGVyXCIgaWQ9XCJjaVZpc2libGVDb2x1bW5UZW1wbGF0ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwibWFyZ2luLWxlZnQ6MTBweDtcIj57e2lmIHZpc2libGUgPT0gXCJ0cnVlXCIgJiYgIWhhc0NoaWxkUmVjb3Jkc319IDxpbnB1dCBjbGFzcz1cImN1c3RvbUNoZWNrYm94XCIgdHlwZT1cImNoZWNrYm94XCIgY2hlY2tlZD1cImNoZWNrZWRcIiB2YWx1ZT1cIlwiIC8+e3tlbHNlICFoYXNDaGlsZFJlY29yZHN9fSA8aW5wdXQgY2xhc3M9XCJjdXN0b21DaGVja2JveFwiIHR5cGU9XCJjaGVja2JveFwiIHZhbHVlPVwiXCIgLz57ey9pZn19PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc2NyaXB0PmA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoY29sdW1uSWQgPT0gdGhpcy5fY29sdW1uSWRfTmFtZSl7XHJcbiAgICAgICAgICAgIHJldHVybiBgPHNjcmlwdCB0eXBlPVwidGV4dC94LWpzcmVuZGVyXCIgaWQ9XCJjaU5hbWVDb2x1bW5UZW1wbGF0ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPSdoZWlnaHQ6MjBweDsnIHVuc2VsZWN0YWJsZT0nb24nPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3tpZiBoYXNDaGlsZFJlY29yZHN9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2ludGVuZCcgc3R5bGU9J2hlaWdodDoxcHg7IGZsb2F0OmxlZnQ7IHdpZHRoOnt7OmxldmVsKjZ9fXB4OyBkaXNwbGF5OmlubGluZS1ibG9jazsnPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3tlbHNlICFoYXNDaGlsZFJlY29yZHN9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2ludGVuZCcgc3R5bGU9J2hlaWdodDoxcHg7IGZsb2F0OmxlZnQ7IHdpZHRoOnt7OmxldmVsKjZ9fXB4OyBkaXNwbGF5OmlubGluZS1ibG9jazsnPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3svaWZ9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3s6I2RhdGFbJ2ljb25EZWZpbml0aW9uJ119fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nZS1jZWxsJyBzdHlsZT0nZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6MTAwJScgdW5zZWxlY3RhYmxlPSdvbic+e3s6I2RhdGFbJ25hbWUnXX19PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvc2NyaXB0PmA7XHJcbiAgICAgICAgfVxyXG5cdFx0cmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgdHJlZSBncmlkIGZvciB0aGUgQ3Vyc29ySW5mb3NcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlVHJlZUdyaWQoKXtcclxuICAgICAgICAoPGFueT4kKHRoaXMuY3NzUGFyZW50Q29udGVudElkKSkuZWpUcmVlR3JpZCh7XHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCksXHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRDb2x1bW5SZXNpemVTdXBwb3J0KCksXHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRDZWxsRWRpdFN1cHBvcnQoKSxcclxuICAgICAgICAgICAgLi4udGhpcy5nZXRUcmVlR3JpZFRvb2xiYXJTdXBwb3J0KCksXHRcclxuXHJcbiAgICAgICAgICAgIGRhdGFTb3VyY2U6IHRoaXMuX2N1cnNvclNpZ25hbHNEYXRhTW9kZWwuZ2V0Q3Vyc29yU2lnbmFscygpLFxyXG4gICAgICAgICAgICBjaGlsZE1hcHBpbmc6IFwiY3Vyc29ySW5mb3NcIixcclxuICAgICAgICAgICAgZXhwYW5kU3RhdGVNYXBwaW5nOiBcImV4cGFuZFN0YXRlXCIsXHJcbiAgICAgICAgICAgIGlzUmVzcG9uc2l2ZTogdHJ1ZSxcclxuICAgICAgICAgICAgdHJlZUNvbHVtbkluZGV4OiAxLFxyXG4gICAgICAgICAgICBhbGxvd0ZpbHRlcmluZyA6IHRydWUsXHJcbiAgICAgICAgICAgIHJvd0hlaWdodCA6IDI4LFxyXG4gICAgICAgICAgICAvLyBTZXQgaW5pdCBzaXplIHRvIGRyYXcgdGhlIHRvb2xiYXIgaWNvbnMgYXQgdGhlIHJpZ2h0IHBvc2l0aW9uXHJcbiAgICAgICAgICAgIHNpemVTZXR0aW5nczogeyBoZWlnaHQ6ICcyMDBweCcsIHdpZHRoOiAnMjAwcHgnIH0sXHJcblxyXG4gICAgICAgICAgICBzZWxlY3Rpb25UeXBlOiBlai5UcmVlR3JpZC5TZWxlY3Rpb25UeXBlLk11bHRpcGxlLFxyXG5cclxuICAgICAgICAgICAgZXhwYW5kZWQ6IChhcmdzKSA9PiB0aGlzLnRyZWVHcmlkTm9kZUV4cGFuZGVkT3JDb2xsYXBzZWQoKSxcclxuXHRcdFx0Y29sbGFwc2VkOiAoYXJncykgPT4gdGhpcy50cmVlR3JpZE5vZGVFeHBhbmRlZE9yQ29sbGFwc2VkKCksXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByb3dTZWxlY3RlZDogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWRSb3dTZWxlY3RlZChhcmdzKSxcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgY3JlYXRlOiAoYXJncykgPT4gdGhpcy50cmVlR3JpZENyZWF0ZWQoKSxcclxuICAgICAgICAgICAgYWN0aW9uQmVnaW46IChhcmdzKSA9PiB0aGlzLnRyZWVHcmlkQWN0aW9uQmVnaW4oYXJncyksIFxyXG4gICAgICAgICAgICBxdWVyeUNlbGxJbmZvOiAoYXJncykgPT4gdGhpcy5xdWVyeUNlbGxJbmZvKGFyZ3MpLFxyXG4gICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRyZWVHcmlkTm9kZUV4cGFuZGVkT3JDb2xsYXBzZWQoKXtcclxuICAgICAgICAvLyBSZWZyZXNoIHRvIHNlZSBjb3JyZWN0IGV4cGFuZGVkL2NvbGxhcHNlZCBpY29uXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBxdWVyeUNlbGxJbmZvKGFyZ3Mpe1xyXG4gICAgICAgIGlmKGFyZ3MuY29sdW1uLmZpZWxkID09IHRoaXMuX2NvbHVtbklkX1Zpc2libGUpe1xyXG4gICAgICAgICAgICBpZihhcmdzLmNlbGxWYWx1ZSA9PSB0aGlzLl9pbmRldGVybWluYXRlU3RhdGVWYWx1ZSl7XHJcbiAgICAgICAgICAgICAgICAvLyBTZXQgaW5kZXRlcm1pbmF0ZSBpY29uc1xyXG4gICAgICAgICAgICAgICAgJChhcmdzLmNlbGxFbGVtZW50LmNoaWxkTm9kZXNbMV0uY2hpbGROb2Rlc1sxXSkucHJvcCh0aGlzLl9pbmRldGVybWluYXRlU3RhdGVWYWx1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUcmVlR3JpZCBzZWxlY3RlZCByb3cgaGFzIGNoYW5nZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB0cmVlR3JpZFJvd1NlbGVjdGVkKGFyZ3Mpe1xyXG4gICAgICAgIGlmKGFyZ3MubW9kZWwuc2VsZWN0ZWRJdGVtcyA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuX2N1cnNvckluZm9TZWxlY3RvcklzQWN0aXZlID09IHRydWUpe1xyXG4gICAgICAgICAgICAvLyBTYXZlcyB0aGUgc2VsZWN0ZWQgaXRlbXMgZm9yIG11bHRpc2VsZWN0aW9uIHN1cHBvcnQgaW4gY3Vyc29yIGluZm8gc2VsZWN0b3JcclxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRDdXJzb3JJbmZvc09sZCA9IHRoaXMuX3NlbGVjdGVkQ3Vyc29ySW5mb3NOZXdcclxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRDdXJzb3JJbmZvc05ldyA9IGFyZ3MubW9kZWwuc2VsZWN0ZWRJdGVtcztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRDdXJzb3JTaWduYWxzID0gdGhpcy5nZXRPbmx5Q3Vyc29yU2lnbmFscyhhcmdzLm1vZGVsLnNlbGVjdGVkSXRlbXMpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUN1cnNvckluZm9TZWxlY3RvckJ1dHRvblN0YXRlKClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXQgYWxsIEN1cnNvclNpZ25hbHMgZm9yIHRoZSBjdXJyZW50IHNlbGVjdGlvbihpZiBDdXJzb3JJbmZvIGlzIHNlbGVjdGVkLCBnZXQgdGhlIHBhcmVudCBDdXJzb3JTaWduYWwpXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gc2VsZWN0ZWRJdGVtc1xyXG4gICAgICogQHJldHVybnMge0FycmF5PEN1cnNvclNpZ25hbD59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldE9ubHlDdXJzb3JTaWduYWxzKHNlbGVjdGVkSXRlbXMpOiBBcnJheTxDdXJzb3JTaWduYWw+e1xyXG4gICAgICAgIGxldCBuZXdMaXN0ID0gbmV3IEFycmF5PEN1cnNvclNpZ25hbD4oKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaSA8IHNlbGVjdGVkSXRlbXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZihzZWxlY3RlZEl0ZW1zW2ldLml0ZW0gaW5zdGFuY2VvZiBDdXJzb3JTaWduYWwpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gbmV3TGlzdC5pbmRleE9mKHNlbGVjdGVkSXRlbXNbaV0uaXRlbSk7XHJcbiAgICAgICAgICAgICAgICBpZihpbmRleCA9PSAtMSl7IC8vIE9ubHkgYWRkIGlmIG5vdCBhbHJlYWR5IGluIGxpc3RcclxuICAgICAgICAgICAgICAgICAgICBuZXdMaXN0LnB1c2goc2VsZWN0ZWRJdGVtc1tpXS5pdGVtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKHNlbGVjdGVkSXRlbXNbaV0uaXRlbSBpbnN0YW5jZW9mIEN1cnNvckluZm8pe1xyXG4gICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gbmV3TGlzdC5pbmRleE9mKHNlbGVjdGVkSXRlbXNbaV0ucGFyZW50SXRlbS5pdGVtKTtcclxuICAgICAgICAgICAgICAgIGlmKGluZGV4ID09IC0xKXsgLy8gT25seSBhZGQgaWYgbm90IGFscmVhZHkgaW4gbGlzdFxyXG4gICAgICAgICAgICAgICAgICAgIG5ld0xpc3QucHVzaChzZWxlY3RlZEl0ZW1zW2ldLnBhcmVudEl0ZW0uaXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ld0xpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBjdXJzb3IgaW5mbyBzZWxlY3RvciBidXR0b24gc3RhdGUgKGlmIG9uZSAob3IgbW9yZSkgc2lnbmFsIGlzIHNlbGVjdGVkIHRoZSBidXR0b24gaXMgZW5hYmxlZClcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlQ3Vyc29ySW5mb1NlbGVjdG9yQnV0dG9uU3RhdGUoKXtcclxuICAgICAgICBpZih0aGlzLl9zZWxlY3RlZEN1cnNvclNpZ25hbHMgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gbm8gaXRlbXMgc2VsZWN0ZWQgZGVhY3RpdmF0ZSBGaWx0ZXIgYnV0dG9uXHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2xiYXIuZGlzYWJsZUN1cnNvckluZm9TZWxlY3RvckJ1dHRvbih0cnVlKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5fc2VsZWN0ZWRDdXJzb3JTaWduYWxzLmxlbmd0aCA8IDEpe1xyXG4gICAgICAgICAgICAvLyBubyBpdGVtcyBzZWxlY3RlZCBkZWFjdGl2YXRlIEZpbHRlciBidXR0b25cclxuICAgICAgICAgICAgdGhpcy5fdG9vbGJhci5kaXNhYmxlQ3Vyc29ySW5mb1NlbGVjdG9yQnV0dG9uKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLl90b29sYmFyLmRpc2FibGVDdXJzb3JJbmZvU2VsZWN0b3JCdXR0b24oZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCBjb2x1bW4gZGVmaW5pdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbigpOiB7fXtcclxuICAgICAgICAvLyBhZGQgY2hlY2sgYm94IHN0YXRlIGluZm9ybWF0aW9uXHJcbiAgICAgICAgdmFyIGNoZWNrQm94U3RhdGVzID0gW1xyXG4gICAgICAgICAgICB7IHRleHQ6IFwiWWVzXCIsIHZhbHVlOiBcInRydWVcIiB9LFxyXG4gICAgICAgICAgICB7IHRleHQ6IFwiTm9cIiwgdmFsdWU6IFwiZmFsc2VcIiB9XHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgLy8gcmV0dXJuIHRoZSBjb2x1bW4gZGVmaW5pdGlvbnNcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgY29sdW1uczogW1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHsgZmllbGQ6IHRoaXMuX2NvbHVtbklkX1Zpc2libGUsIGhlYWRlclRleHQ6IFwiVmlzaWJsZVwiLCB2aXNpYmxlOiBmYWxzZSwgYWxsb3dFZGl0aW5nOiBmYWxzZSwgaXNUZW1wbGF0ZUNvbHVtbjogdHJ1ZSwgdGVtcGxhdGVJRDogXCJjaVZpc2libGVDb2x1bW5UZW1wbGF0ZVwiLCBmaWx0ZXJFZGl0VHlwZTogXCJkcm9wZG93bmVkaXRcIiwgZHJvcGRvd25EYXRhOiBjaGVja0JveFN0YXRlcywgYWxsb3dGaWx0ZXJpbmdCbGFua0NvbnRlbnQ6IGZhbHNlLCB3aWR0aDogXCI1NXB4XCJ9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsgZmllbGQ6IHRoaXMuX2NvbHVtbklkX05hbWUsIGhlYWRlclRleHQ6IFwiTmFtZVwiLCBhbGxvd0VkaXRpbmcgOiBmYWxzZSwgaXNUZW1wbGF0ZUNvbHVtbjogdHJ1ZSwgdGVtcGxhdGVJRDogXCJjaU5hbWVDb2x1bW5UZW1wbGF0ZVwifSxcclxuICAgICAgICAgICAgICAgICAgICB7IGZpZWxkOiB0aGlzLl9jb2x1bW5JZF9WYWx1ZSwgaGVhZGVyVGV4dDogXCJWYWx1ZVwiLCBhbGxvd0VkaXRpbmcgOiBmYWxzZSwgd2lkdGg6IFwiMTQwcHhcIiwgaXNUZW1wbGF0ZUNvbHVtbjogdHJ1ZSwgdGVtcGxhdGU6IFwiPGRpdiBzdHlsZT0ncGFkZGluZy1sZWZ0OiAyMHB4JyBpZD0nXCIgKyB0aGlzLnBhcmVudENvbnRlbnRJZCArIENVUlNPUl9WQUxVRV9JRCArIFwie3s6dWlJZH19Jz48L2Rpdj5cIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsgZmllbGQ6IHRoaXMuX2NvbHVtbklkX0Rlc2NyaXB0aW9uLCBoZWFkZXJUZXh0OiBcIkRlc2NyaXB0aW9uXCIsICB2aXNpYmxlOiBmYWxzZSwgYWxsb3dFZGl0aW5nIDogZmFsc2UsIHdpZHRoOiBcIjE0MHB4XCJ9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsgZmllbGQ6IHRoaXMuX2NvbHVtbklkX0ljb25EZWZpbml0aW9uLCB2aXNpYmxlOiBmYWxzZSwgd2lkdGg6IFwiMHB4XCIgfSxcclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCBjb2x1bW4gcmVzaXplIHNldHRpbmdzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VHJlZUdyaWRDb2x1bW5SZXNpemVTdXBwb3J0KCk6IHt9e1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGFsbG93Q29sdW1uUmVzaXplOiB0cnVlLFxyXG4gICAgICAgICAgICBjb2x1bW5SZXNpemVTZXR0aW5nczogeyBjb2x1bW5SZXNpemVNb2RlOiBlai5UcmVlR3JpZC5Db2x1bW5SZXNpemVNb2RlLkZpeGVkQ29sdW1ucyB9LFxyXG4gICAgICAgICAgICBjb2x1bW5SZXNpemVkOiAoYXJncykgPT4gdGhpcy50cmVlR3JpZENvbHVtblJlc2l6ZWQoYXJncyksXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuXHQgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgY2VsbCBlZGl0IHNldHRpbmdzXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEByZXR1cm5zIHt7fX1cclxuXHQgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZ2V0VHJlZUdyaWRDZWxsRWRpdFN1cHBvcnQoKToge317XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRlZGl0U2V0dGluZ3M6IHtcdGFsbG93RWRpdGluZzogdHJ1ZSB9LFxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgdG9vbGJhciBzZXR0aW5nc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFRyZWVHcmlkVG9vbGJhclN1cHBvcnQoKToge317XHJcbiAgICAgICAgdGhpcy5fdG9vbGJhciA9IG5ldyBDdXJzb3JJbmZvVHJlZUdyaWRUb29sYmFyKHRoaXMuY3NzUGFyZW50Q29udGVudElkKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0b29sYmFyU2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgIHNob3dUb29sYmFyOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tVG9vbGJhckl0ZW1zOiB0aGlzLl90b29sYmFyLmdldEN1c3RvbVRvb2xiYXJzKCksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRvb2xiYXJDbGljazogKGFyZ3MpID0+IHRoaXMuX3Rvb2xiYXIudG9vbGJhckNsaWNrKGFyZ3MsIHRoaXMpLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUcmVlR3JpZCB3YXMgY3JlYXRlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHRyZWVHcmlkQ3JlYXRlZCgpe1xyXG4gICAgICAgIC8vIFNldHMgdGhlIGN1c3RvbSB0b29sYmFyIGljb25zXHJcbiAgICAgICAgdGhpcy5fdG9vbGJhci5zZXRTdHlsZUZvclRvb2xiYXJJY29ucygpO1xyXG4gICAgICAgIHRoaXMuX3Rvb2xiYXIuaW5pdFRvb2xiYXJTdGF0ZXMoKTtcclxuXHJcbiAgICAgICAgLy8gRmlsdGVyIGRhdGEgb24gc3RhcnR1cFxyXG4gICAgICAgIGxldCB0cmVlT2JqID0gdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpO1xyXG4gICAgICAgICg8YW55PnRyZWVPYmopLmZpbHRlckNvbHVtbih0aGlzLl9jb2x1bW5JZF9WaXNpYmxlLCBlai5GaWx0ZXJPcGVyYXRvcnMuZXF1YWwsIFwidHJ1ZVwiLCBcImFuZFwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5hdHRhY2hUb0NoZWNrQm94Q2hhbmdlZEV2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBdHRhY2ggY2hlY2sgYm94IGNoYW5nZWQgZXZlbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXR0YWNoVG9DaGVja0JveENoYW5nZWRFdmVudCgpe1xyXG4gICAgICAgICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpLm9uKFwiY2hhbmdlXCIsIFwiLmN1c3RvbUNoZWNrYm94XCIsIChlKSA9PiB0aGlzLmNoZWNrQm94Q2hhbmdlZChlKSApO1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWRTdHlsZXMoKSB7XHJcbiAgICAgICAgc3VwZXIuYWRkU3R5bGUoXCJ3aWRnZXRzL2N1cnNvckluZm9XaWRnZXQvc3R5bGUvY3NzL2N1cnNvckluZm9TdHlsZS5jc3NcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPY2N1cnMgb24gY2hlY2sgYm94IGNoYW5nZWQgZXZlbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gZVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjaGVja0JveENoYW5nZWQoZSl7XHJcbiAgICAgICAgbGV0IGZpbHRlckRhdGFTb3VyY2UgPSB0aGlzLl9jdXJzb3JJbmZvVGVtcGxhdGVEYXRhTW9kZWw7XHJcblxyXG4gICAgICAgIGUgPSBlIHx8IHdpbmRvdy5ldmVudDtcclxuICAgICAgICBsZXQgdGFyZ2V0RWxlID0gZS50YXJnZXQ7XHJcbiAgICAgICAgbGV0IGNoZWNrU3RhdHVzID0gJCh0YXJnZXRFbGUpLmlzKCc6Y2hlY2tlZCcpO1xyXG4gICAgICAgIC8vICQodGFyZ2V0RWxlKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcbiAgICAgICAgbGV0IHJlY29yZCA9IHRoaXMuZ2V0VHJlZVJlY29yZCh0YXJnZXRFbGUpO1xyXG4gICAgICAgIGlmKHJlY29yZCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9maWx0ZXJNb2RpZmllZCA9IHRydWU7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihjaGVja1N0YXR1cyA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICByZWNvcmQuaXRlbS52aXNpYmxlID0gXCJmYWxzZVwiO1xyXG4gICAgICAgICAgICAgICAgcmVjb3JkW1widmlzaWJsZVwiXSA9IFwiZmFsc2VcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0TXVsdGlTZWxlY3Rpb25DaGVja0JveGVzKFwiZmFsc2VcIiwgcmVjb3JkLmluZGV4KTtcclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgcmVjb3JkLml0ZW0udmlzaWJsZSA9IFwidHJ1ZVwiO1xyXG4gICAgICAgICAgICAgICAgcmVjb3JkW1widmlzaWJsZVwiXSA9IFwidHJ1ZVwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRNdWx0aVNlbGVjdGlvbkNoZWNrQm94ZXMoXCJ0cnVlXCIsIHJlY29yZC5pbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0TW9kZWwoZmlsdGVyRGF0YVNvdXJjZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBTZXQgc2VsZWN0aW9uIGFmdGVyIHNldHRpbmcgY2hlY2tib3ggYmVjYXVzZSB0aGV5IGFyZSBsb3N0IGFmdGVyIHNldHRpbmcgYSBjaGVjayBib3hcclxuICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3Rpb25JbkN1cnNvckluZm9TZWxlY3RvclZpZXcodGhpcy5fc2VsZWN0ZWRDdXJzb3JJbmZvc09sZCk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2hlY2tCb3hlcygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIElmIG11bHRpIHNlbGVjdGlvbiBpcyBhY3RpdmUsIHNldCBhbGwgc2VsZWN0ZWQgaXRlbXMgdG8gdGhlIGdpdmVuIHN0YXRlKGNoZWNrZWQvdW5jaGVja2VkKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBhY3R1YWxJbmRleFxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRNdWx0aVNlbGVjdGlvbkNoZWNrQm94ZXMoc3RhdGU6IHN0cmluZywgYWN0dWFsSW5kZXg6IG51bWJlcil7XHJcbiAgICAgICAgbGV0IHNlbGVjdGVkQ3Vyc29ySW5mb3MgPSB0aGlzLl9zZWxlY3RlZEN1cnNvckluZm9zT2xkO1xyXG4gICAgICAgIGlmKHNlbGVjdGVkQ3Vyc29ySW5mb3MgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gU2V0L1Vuc2V0IGNoZWNrIGJveGVzXHJcbiAgICAgICAgICAgIGxldCBpbmRleFdpdGhpbk11bHRpU2VsZWN0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9MDsgaSA8IHNlbGVjdGVkQ3Vyc29ySW5mb3MubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgaWYoYWN0dWFsSW5kZXggPT0gc2VsZWN0ZWRDdXJzb3JJbmZvc1tpXS5pbmRleCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXhXaXRoaW5NdWx0aVNlbGVjdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGlmKGluZGV4V2l0aGluTXVsdGlTZWxlY3Rpb24gPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEN1cnNvckluZm9zLmZvckVhY2goY3Vyc29ySW5mbyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29ySW5mby5pdGVtLnZpc2libGUgPSBzdGF0ZTtcclxuICAgICAgICAgICAgICAgICAgICBjdXJzb3JJbmZvW1widmlzaWJsZVwiXSA9IHN0YXRlOyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIC8vIE9ubHkgb25lIGNoZWNrYm94IHdhcyBjbGlja2VkID0+IHNldCBzZWxlY3Rpb24gdG8gdGhlIG5ldyBvbmVcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkQ3Vyc29ySW5mb3NPbGQgPSB0aGlzLl9zZWxlY3RlZEN1cnNvckluZm9zTmV3O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdHJlZUdyaWRBY3Rpb25CZWdpbihhcmdzKXtcclxuICAgICAgICAvLyBEb24ndCBzdXBwb3J0IFwiRW50Zi9EZWxcIiBrZXlcclxuICAgICAgICBpZihhcmdzLnJlcXVlc3RUeXBlID09IFwiZGVsZXRlXCIpe1xyXG4gICAgICAgICAgICBhcmdzLmNhbmNlbCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQSB0cmVlZ3JpZCBjb2x1bW4gd2FzIHJlc2l6ZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHRyZWVHcmlkQ29sdW1uUmVzaXplZChhcmdzKXtcclxuICAgICAgICBzdXBlci5yZXNpemVEeW5hbWljQ29sdW1uKGFyZ3MuY29sdW1uSW5kZXgsIGFyZ3MubW9kZWwpO1xyXG4gICAgICAgIGlmICh0aGlzLl9jdXJzb3JJbmZvU2VsZWN0b3JJc0FjdGl2ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNoZWNrQm94ZXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gUmVmcmVzaCBjdXJzb3IgaW5mbyB2YWx1ZXMgYWZ0ZXIgcmVzaXplICh0cmVlZ3JpZCBzZXRzIHRoZSBkYXRhIHRvIFwiMFwiIGFmdGVyIHJlc2l6ZSlcclxuICAgICAgICB0aGlzLnJlZnJlc2hDdXJzb3JWYWx1ZXModGhpcy5fY3Vyc29yU2lnbmFsc0RhdGFNb2RlbC5nZXRDdXJzb3JTaWduYWxzKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiByZXNpemVzIHRoZSBjdXJzb3IgdmFsdWVzIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodFxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcmVzaXplKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7XHJcbiAgICAgICAgc3VwZXIucmVzaXplKHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIGlmICh0aGlzLl9jdXJzb3JJbmZvU2VsZWN0b3JJc0FjdGl2ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNoZWNrQm94ZXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gUmVmcmVzaCBjdXJzb3IgdmFsdWVzIGFmdGVyIHJlc2l6ZSAodHJlZWdyaWQgc2V0cyB0aGUgZGF0YSB0byBcIjBcIiBhZnRlciByZXNpemUpXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoQ3Vyc29yVmFsdWVzKHRoaXMuX2N1cnNvclNpZ25hbHNEYXRhTW9kZWwuZ2V0Q3Vyc29yU2lnbmFscygpKTtcclxuXHJcbiAgICAgICAgdGhpcy5fdG9vbGJhci5yZXNpemUod2lkdGgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhY3RpdmF0ZUN1cnNvckluZm9TZWxlY3RvclZpZXcoYWN0aXZhdGU6IGJvb2xlYW4pe1xyXG4gICAgICAgIHRoaXMuX3Rvb2xiYXIuYWN0aXZhdGVDdXJzb3JJbmZvU2VsZWN0b3JWaWV3KGFjdGl2YXRlKTtcclxuICAgICAgICBpZihhY3RpdmF0ZSA9PSB0cnVlKXtcclxuICAgICAgICAgICAgdGhpcy5zaG93Q3Vyc29ySW5mb1NlbGVjdG9yVmlldygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLnNob3dDdXJzb3JTaWduYWxzVmlldygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBVcGRhdGUgdG9vbGJhciBidXR0b24gcG9zaXRpb25zKGUuZy4gcG9zaXRpb24gb2YgcmlnaHQgYWxpZ24gdG9vbGJhcikgYWZ0ZXIgaGlkZSBvciBzaG93IHRvb2xiYXIgYnV0dG9uXHJcbiAgICAgICAgdGhpcy5fdG9vbGJhci5yZXNpemUodGhpcy53aWR0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTaG93cyB0aGUgY3Vyc2VyIHNpZ25hbHMgd2l0aCB0aGUgZmlsdGVyZWQvZGVmaW5lZCBjdXJzb3IgaW5mb3JtYXRpb25zXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzaG93Q3Vyc29yU2lnbmFsc1ZpZXcoKXtcclxuICAgICAgICB0aGlzLl9jdXJzb3JJbmZvU2VsZWN0b3JJc0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3NlbGVjdGVkQ3Vyc29ySW5mb3NPbGQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWRDdXJzb3JJbmZvc05ldyA9IHVuZGVmaW5lZDtcclxuICAgICAgICBcclxuICAgICAgICAvLyBVcGRhdGUgY3Vyc29yIGluZm8gdmlzaWJpbGl0aWVzIGlmIHNvbWV0aGluZyBoYXMgY2hhbmdlZFxyXG4gICAgICAgIGlmKHRoaXMuX2ZpbHRlck1vZGlmaWVkID09IHRydWUpe1xyXG4gICAgICAgICAgICB0aGlzLnNldEN1cnNvckluZm9WaXNpYmlsaXRpZXModGhpcy5fc2VsZWN0ZWRDdXJzb3JTaWduYWxzLCB0aGlzLl9jdXJzb3JJbmZvVGVtcGxhdGVEYXRhTW9kZWxbMF0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU2hvdyBhY3R1YWwgY3Vyc29ySW5mbyBkYXRhXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcblxyXG4gICAgICAgIC8vIFNldHMgdGhlIGNvbHVtbiB2aXNpYmlsaXRpZXNcclxuICAgICAgICBsZXQgdHJlZUdyaWRPYmplY3QgPSBzdXBlci5nZXRUcmVlR3JpZE9iamVjdCgpOyAgXHJcbiAgICAgICAgdGhpcy5zZXRDb2x1bW5WaXNpYmxpdGllcyh0cmVlR3JpZE9iamVjdCwgZmFsc2UpO1xyXG5cclxuICAgICAgICAvLyBTZXQgdGhlIGZpbHRlciB0byBoaWRlIHZpc2libGUgPT0gZmFsc2UgY3Vyc29yIGluZm9zXHJcbiAgICAgICAgKDxhbnk+dHJlZUdyaWRPYmplY3QpLmZpbHRlckNvbHVtbih0aGlzLl9jb2x1bW5JZF9WaXNpYmxlLCBlai5GaWx0ZXJPcGVyYXRvcnMuZXF1YWwsIFwidHJ1ZVwiLCBcImFuZFwiKTtcclxuXHJcbiAgICAgICAgLy8gc2V0IHRoZSBzZWxlY3Rpb24gdG8gc3RhdGUgYmVmb3JlIHN3aXRjaGluZyB0byB0aGUgY3Vyc29yIGluZm8gc2VsZWN0b3Igdmlld1xyXG4gICAgICAgIHRoaXMuc2V0U2VsZWN0aW9uV2l0aEN1cnNvclNpZ25hbHModHJlZUdyaWRPYmplY3QsIHRoaXMuX3NlbGVjdGVkQ3Vyc29yU2lnbmFscyk7XHJcblxyXG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgZHluYW1pYyBjb2x1bW4gc2l6ZSBhZnRlciBoaWRlL3Nob3cgb2Ygc29tZSBjb2x1bW5zXHJcbiAgICAgICAgdGhpcy5yZXNpemVEeW5hbWljQ29sdW1uKDAsIHRyZWVHcmlkT2JqZWN0Lm1vZGVsKTtcclxuXHJcbiAgICAgICAgLy8gcmVmcmVzaCB0aGUgY3Vyc29yIGluZm8gdmFsdWVzXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoQ3Vyc29yVmFsdWVzKHRoaXMuX2N1cnNvclNpZ25hbHNEYXRhTW9kZWwuZ2V0Q3Vyc29yU2lnbmFscygpKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBTaG93cyB0aGUgY3Vyc29yIGluZm8gc2VsZWN0b3Igdmlld1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2hvd0N1cnNvckluZm9TZWxlY3RvclZpZXcoKXtcclxuICAgICAgICB0aGlzLl9jdXJzb3JJbmZvU2VsZWN0b3JJc0FjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fZmlsdGVyTW9kaWZpZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gUmVzZXQgY3Vyc29yIGluZm8gdGVtcGxhdGUgZGF0YW1vZGVsXHJcbiAgICAgICAgdGhpcy5fY3Vyc29ySW5mb1RlbXBsYXRlRGF0YU1vZGVsLnNwbGljZSgwLCB0aGlzLl9jdXJzb3JJbmZvVGVtcGxhdGVEYXRhTW9kZWwubGVuZ3RoKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBjcmVhdGUgYSBzaWduYWwgdGVtcGxhdGUgYmFzZWQgb24gdGhlIHNlbGVjdGVkIHNlcmllc1xyXG4gICAgICAgIGxldCB0ZW1wbGF0ZUN1cnNvclNpZ25hbCA9IG5ldyBEeW5hbWljQ3Vyc29yU2lnbmFsVGVtcGxhdGUodGhpcy5fc2VsZWN0ZWRDdXJzb3JTaWduYWxzKVxyXG5cclxuICAgICAgICAvLyBhZGQgdGhlIHNpZ25hbCB0ZW1wbGF0ZSB0byB0aGUgbW9kZWxcclxuICAgICAgICB0aGlzLl9jdXJzb3JJbmZvVGVtcGxhdGVEYXRhTW9kZWwucHVzaCh0ZW1wbGF0ZUN1cnNvclNpZ25hbCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gU2V0IGN1cnNvciBpbmZvIHRlbXBsYXRlIHZpc2liaWxpdGllc1xyXG4gICAgICAgIHRoaXMudXBkYXRlVGVtcGxhdGVWaXNpYmlsaXRpZXModGhpcy5fc2VsZWN0ZWRDdXJzb3JTaWduYWxzLCB0ZW1wbGF0ZUN1cnNvclNpZ25hbCk7XHJcbiAgICAgICBcclxuICAgICAgICAvLyBzaG93IGN1cnNvciBpbmZvIHRlbXBsYXRlIGRhdGFtb2RlbCAodGhlIHBvc3NpYmxlIGN1cnNvciBpbmZvcylcclxuICAgICAgICB0aGlzLnVwZGF0ZURhdGFTb3VyY2UoPGFueT50aGlzLl9jdXJzb3JJbmZvVGVtcGxhdGVEYXRhTW9kZWwpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFNldHMgdGhlIGNvbHVtbiB2aXNpYmlsaXRpZXNcclxuICAgICAgICBsZXQgdHJlZUdyaWRPYmplY3QgPSBzdXBlci5nZXRUcmVlR3JpZE9iamVjdCgpO1xyXG4gICAgICAgIHRoaXMuc2V0Q29sdW1uVmlzaWJsaXRpZXModHJlZUdyaWRPYmplY3QsIHRydWUpO1xyXG5cclxuICAgICAgICAvLyBVcGRhdGUgdGhlIGR5bmFtaWMgY29sdW1uIHNpemUgYWZ0ZXIgaGlkZS9zaG93IG9mIHNvbWUgY29sdW1uc1xyXG4gICAgICAgIHRoaXMucmVzaXplRHluYW1pY0NvbHVtbigwLCB0cmVlR3JpZE9iamVjdC5tb2RlbCk7XHJcblxyXG4gICAgICAgIC8vIFJlbW92ZXMgdGhlIGZpbHRlciBvZiB0aGUgdmlzaWJpbGl0eSBmbGFnIHdoaWNoIGlzIG5lZWRlZCBpbiB0aGUgY3Vyc29yIHNpZ25hbCB2aWV3XHJcbiAgICAgICAgdHJlZUdyaWRPYmplY3QuY2xlYXJGaWx0ZXIodGhpcy5fY29sdW1uSWRfVmlzaWJsZSk7XHJcblxyXG4gICAgICAgIC8vIENvbnZlcnQgY3VzdG9tIGNoZWNrIGJveGVzIGludG8gc3luY2Z1c2lvbiBjaGVjayBib3hlc1xyXG4gICAgICAgIHRoaXMudXBkYXRlQ2hlY2tCb3hlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgY29sdW1uIHZpc2liaWxpdGllcyBmb3IgdGhlIGN1cnNvciBpbmZvIHNlbGVjdG9yIHZpZXcgb3IgdGhlIGN1cnNvciBzaWduYWxzIHZpZXdcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSB0cmVlR3JpZE9iamVjdFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBjdXJzb3JJbmZvU2VsZWN0b3JWaWV3XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldENvbHVtblZpc2libGl0aWVzKHRyZWVHcmlkT2JqZWN0LCBjdXJzb3JJbmZvU2VsZWN0b3JWaWV3OmJvb2xlYW4pe1xyXG4gICAgICAgIC8vIGdldCBuZWVkZWQgY29sdW1uc1xyXG4gICAgICAgIGxldCB2aXNpYmxlQ29sdW1uID0gdHJlZUdyaWRPYmplY3QuZ2V0Q29sdW1uQnlGaWVsZCh0aGlzLl9jb2x1bW5JZF9WaXNpYmxlKTtcclxuICAgICAgICBsZXQgZGVzY3JpcHRpb25Db2x1bW4gPSB0cmVlR3JpZE9iamVjdC5nZXRDb2x1bW5CeUZpZWxkKHRoaXMuX2NvbHVtbklkX0Rlc2NyaXB0aW9uKTtcclxuICAgICAgICBsZXQgdmFsdWVDb2x1bW4gPSB0cmVlR3JpZE9iamVjdC5nZXRDb2x1bW5CeUZpZWxkKHRoaXMuX2NvbHVtbklkX1ZhbHVlKTtcclxuXHJcbiAgICAgICAgaWYoY3Vyc29ySW5mb1NlbGVjdG9yVmlldyA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgIC8vIEhpZGUgdmlzaWJsZSBjb2x1bW5cclxuICAgICAgICAgICAgdHJlZUdyaWRPYmplY3QuaGlkZUNvbHVtbih2aXNpYmxlQ29sdW1uLmhlYWRlclRleHQpO1xyXG5cclxuICAgICAgICAgICAgLy8gSGlkZSBkZXNjcmlwdGlvbiBjb2x1bW5cclxuICAgICAgICAgICAgdHJlZUdyaWRPYmplY3QuaGlkZUNvbHVtbihkZXNjcmlwdGlvbkNvbHVtbi5oZWFkZXJUZXh0KTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNob3cgdmFsdWUgY29sdW1uXHJcbiAgICAgICAgICAgIHRyZWVHcmlkT2JqZWN0LnNob3dDb2x1bW4odmFsdWVDb2x1bW4uaGVhZGVyVGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIC8vIFNob3cgdmlzaWJsZSBjb2x1bW5cclxuICAgICAgICAgICAgdHJlZUdyaWRPYmplY3Quc2hvd0NvbHVtbih2aXNpYmxlQ29sdW1uLmhlYWRlclRleHQpO1xyXG5cclxuICAgICAgICAgICAgLy8gU2hvdyBkZXNjcmlwdGlvbiBjb2x1bW5cclxuICAgICAgICAgICAgdHJlZUdyaWRPYmplY3Quc2hvd0NvbHVtbihkZXNjcmlwdGlvbkNvbHVtbi5oZWFkZXJUZXh0KTtcclxuXHJcbiAgICAgICAgICAgIC8vIEhpZGUgdmFsdWUgY29sdW1uXHJcbiAgICAgICAgICAgIHRyZWVHcmlkT2JqZWN0LmhpZGVDb2x1bW4odmFsdWVDb2x1bW4uaGVhZGVyVGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgc2VsZWN0aW9uIHRvIHRoZSBnaXZlbiBzZWxlY3Rpb24gb2JqZWN0cyBpbiBjdXJzb3IgaW5mbyBzZWxlY3RvciB2aWV3XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8YW55Pn0gc2VsZWN0ZWRPYmplY3RzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldFNlbGVjdGlvbkluQ3Vyc29ySW5mb1NlbGVjdG9yVmlldyhzZWxlY3RlZE9iamVjdHMpIHtcclxuICAgICAgICBpZiAoc2VsZWN0ZWRPYmplY3RzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdHJlZUdyaWRPYmplY3Q6IGFueSA9IHRoaXMuZ2V0VHJlZUdyaWRPYmplY3QoKTtcclxuICAgICAgICB0cmVlR3JpZE9iamVjdC5jbGVhclNlbGVjdGlvbigpO1xyXG4gICAgICAgIGlmIChzZWxlY3RlZE9iamVjdHMubGVuZ3RoICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHNlbGVjdGVkT2JqZWN0cy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgICAgIHRyZWVHcmlkT2JqZWN0Ll9tdWx0aVNlbGVjdEN0cmxSZXF1ZXN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGxldCB2aXNpYmxlSW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IHRyZWVHcmlkT2JqZWN0Lm1vZGVsLmZsYXRSZWNvcmRzLmxlbmd0aDsgaisrKXtcclxuICAgICAgICAgICAgICAgICAgICBpZih0cmVlR3JpZE9iamVjdC5tb2RlbC5mbGF0UmVjb3Jkc1tqXS5pZCA9PSBzZWxlY3RlZE9iamVjdHNbaV0uaWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJlZUdyaWRPYmplY3Quc2VsZWN0Um93cyh2aXNpYmxlSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlSW5kZXgrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdHJlZUdyaWRPYmplY3Quc2VsZWN0Um93cyhzZWxlY3RlZE9iamVjdHMuaW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBTZXQgYWN0dWFsIHNlbGVjdGlvbiBmb3IgbGF0ZXIgdXNlIFxyXG4gICAgICAgIHRoaXMuX3NlbGVjdGVkQ3Vyc29ySW5mb3NPbGQgPSBzZWxlY3RlZE9iamVjdHM7XHJcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWRDdXJzb3JJbmZvc05ldyA9IHNlbGVjdGVkT2JqZWN0cztcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBzZWxlY3Rpb24gdG8gdGhlIGdpdmVuIGN1cnNvciBzaWduYWxzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gdHJlZUdyaWRPYmplY3RcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8Q3Vyc29yU2lnbmFsPn0gY3Vyc29yU2lnbmFsc1xyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRTZWxlY3Rpb25XaXRoQ3Vyc29yU2lnbmFscyh0cmVlR3JpZE9iamVjdCwgY3Vyc29yU2lnbmFsczogQXJyYXk8Q3Vyc29yU2lnbmFsPikge1xyXG4gICAgICAgIC8vIGRlc2VsZWN0IGFsbCBzZWxlY3Rpb25zIGluIGN1cnNvciBzaWduYWxzIHZpZXdcclxuICAgICAgICB0cmVlR3JpZE9iamVjdC5jbGVhclNlbGVjdGlvbigpO1xyXG5cclxuICAgICAgICBpZihjdXJzb3JTaWduYWxzID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGN1cnNvclNpZ25hbHMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIHRyZWVHcmlkT2JqZWN0Ll9tdWx0aVNlbGVjdEN0cmxSZXF1ZXN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgbGV0IHZpc2libGVJbmRleCA9IDA7XHJcbiAgICAgICAgICAgIGxldCBtb2RlbCA9IHRyZWVHcmlkT2JqZWN0Lm1vZGVsO1xyXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgbW9kZWwuZmxhdFJlY29yZHMubGVuZ3RoOyBqKyspe1xyXG4gICAgICAgICAgICAgICAgaWYobW9kZWwuZmxhdFJlY29yZHNbal0uaXRlbSA9PSBjdXJzb3JTaWduYWxzW2ldKXtcclxuICAgICAgICAgICAgICAgICAgICB0cmVlR3JpZE9iamVjdC5zZWxlY3RSb3dzKHZpc2libGVJbmRleCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZihtb2RlbC5mbGF0UmVjb3Jkc1tqXS52aXNpYmxlICE9IFwiZmFsc2VcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZUluZGV4Kys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHZpc2libGUgZmxhZ3MgaW4gdGhlIHRlbXBsYXRlIGN1cnNvciBzaWduYWwgdG8gdGhlIGluZm9ybWF0aW9ucyBmcm9tIHRoZSBjdXJzb3Igc2lnbmFsc1xyXG4gICAgICogKGUuZy4gYWxsIHNpZ25hbHMgc2hvdyB5MSBjdXJzb3IgaW5mbyBzbyB0aGVyZWZvcmUgdGVtcGxhdGUgY3Vyc29yIGluZm8gdmlzaWJpbGl0eSBpcyBzZXQgdG8gXCJ0cnVlXCI7XHJcbiAgICAgKiAgICAgICBhbGwgc2lnbmFscyBkb3NuJ3Qgc2hvdyB5MSBjdXJzb3IgaW5mbyBzbyB0aGVyZWZvcmUgdGVtcGxhdGUgY3Vyc29yIGluZm8gdmlzaWJpbGl0eSBpcyBzZXQgdG8gXCJmYWxzZVwiO1xyXG4gICAgICogICAgICAgc29tZSBzaWduYWxzIHNob3cgeTEgY3Vyc29yIGluZm8gc28gdGhlcmVmb3JlIHRlbXBsYXRlIGN1cnNvciBpbmZvIHZpc2liaWxpdHkgaXMgc2V0IHRvIFwiaW5kZXRlcm1pbmF0ZVwiO1xyXG4gICAgICogKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PEN1cnNvclNpZ25hbD59IGN1cnNvclNpZ25hbHNcclxuICAgICAqIEBwYXJhbSB7RHluYW1pY0N1cnNvclNpZ25hbFRlbXBsYXRlfSB0ZW1wbGF0ZUN1cnNvclNpZ25hbFxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlVGVtcGxhdGVWaXNpYmlsaXRpZXMoY3Vyc29yU2lnbmFsczogQXJyYXk8Q3Vyc29yU2lnbmFsPiwgdGVtcGxhdGVDdXJzb3JTaWduYWw6IER5bmFtaWNDdXJzb3JTaWduYWxUZW1wbGF0ZSkge1xyXG4gICAgICAgIGlmICh0ZW1wbGF0ZUN1cnNvclNpZ25hbCAmJiB0ZW1wbGF0ZUN1cnNvclNpZ25hbC5jdXJzb3JJbmZvcykge1xyXG4gICAgICAgICAgICAvLyBmb3IgYWxsIGF2YWlsYWJsZSBtZXJnZWQgY3Vyc29yIGluZm9zXHJcbiAgICAgICAgICAgIHRlbXBsYXRlQ3Vyc29yU2lnbmFsLmN1cnNvckluZm9zLmZvckVhY2goKHRlbXBsYXRlQ3Vyc29yU2lnbmFsSW5mbykgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGNsZWFyIGV4aXN0aW5nIHZpc2liaWxpdHlcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlQ3Vyc29yU2lnbmFsSW5mby52aXNpYmxlID0gXCJcIjtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIGN1cnNvciBpbmZvcyBieSBpZFxyXG4gICAgICAgICAgICAgICAgbGV0IG1hdGNoaW5nQ3Vyc29ySW5mb3M6IEFycmF5PEN1cnNvckluZm8+ID0gdGhpcy5yZXRyaWV2Q3Vyc29ySW5mb3NCeUlkKGN1cnNvclNpZ25hbHMsIHRlbXBsYXRlQ3Vyc29yU2lnbmFsSW5mby5pZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gZm9yIGFsbCBzZWxlY3RlZCBjdXJzb3Igc2lnbmFscyB3aXRoIG1hdGNoaW5nIGlkIC4uLlxyXG4gICAgICAgICAgICAgICAgbWF0Y2hpbmdDdXJzb3JJbmZvcy5mb3JFYWNoKChjdXJzb3JTaWduYWxJbmZvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhlIHZpc2liaWxpdHkgaXMgeWV0IHVuZGVmaW5lZCAuLlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGVtcGxhdGVDdXJzb3JTaWduYWxJbmZvLnZpc2libGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaW5pdGlhbGl6ZSB0aGUgdmlzaWJpbGl0eSB3aXRoIHRoZSBmaXJzdCBjdXJzb3Igc2lnbmFsIGluZm9zIHZhbHVlLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZUN1cnNvclNpZ25hbEluZm8udmlzaWJsZSA9IGN1cnNvclNpZ25hbEluZm8udmlzaWJsZTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzZXQgdmlzaWJpbGl0eSB0byB1bmRldGVybWluZWQgaWYgb25lIG9mIHRoZSBmb2xsb3dpbmcgdmFsdWVzIGlzIGRpZmZlcmVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3Vyc29yU2lnbmFsSW5mby52aXNpYmxlICE9PSB0ZW1wbGF0ZUN1cnNvclNpZ25hbEluZm8udmlzaWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVDdXJzb3JTaWduYWxJbmZvLnZpc2libGUgPSB0aGlzLl9pbmRldGVybWluYXRlU3RhdGVWYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgdmlzaWJpbGl0eSBkZWZpbmVkIGluIHRoZSB0ZW1wbGF0ZSBjdXJzb3Igc2lnbmFsIHRvIHRoZSBjdXJzb3Igc2lnbmFsc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PEN1cnNvclNpZ25hbD59IGN1cnNvclNpZ25hbHNcclxuICAgICAqIEBwYXJhbSB7RHluYW1pY0N1cnNvclNpZ25hbFRlbXBsYXRlfSB0ZW1wbGF0ZUN1cnNvclNpZ25hbFxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0Q3Vyc29ySW5mb1Zpc2liaWxpdGllcyhjdXJzb3JTaWduYWxzOiBBcnJheTxDdXJzb3JTaWduYWw+LCB0ZW1wbGF0ZUN1cnNvclNpZ25hbDogRHluYW1pY0N1cnNvclNpZ25hbFRlbXBsYXRlKSB7XHJcbiAgICAgICAgaWYgKHRlbXBsYXRlQ3Vyc29yU2lnbmFsICYmIHRlbXBsYXRlQ3Vyc29yU2lnbmFsLmN1cnNvckluZm9zKSB7XHJcbiAgICAgICAgICAgIC8vIGZvciBhbGwgYXZhaWxhYmxlIG1lcmdlZCBjdXJzb3IgaW5mb3NcclxuICAgICAgICAgICAgdGVtcGxhdGVDdXJzb3JTaWduYWwuY3Vyc29ySW5mb3MuZm9yRWFjaCgodGVtcGxhdGVDdXJzb3JTaWduYWxJbmZvKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRlbXBsYXRlQ3Vyc29yU2lnbmFsSW5mby52aXNpYmxlICE9PSB0aGlzLl9pbmRldGVybWluYXRlU3RhdGVWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGdldCB0aGUgY3Vyc29yIGluZm9zIGJ5IGlkXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1hdGNoaW5nQ3Vyc29ySW5mb3M6IEFycmF5PEN1cnNvckluZm8+ID0gdGhpcy5yZXRyaWV2Q3Vyc29ySW5mb3NCeUlkKGN1cnNvclNpZ25hbHMsIHRlbXBsYXRlQ3Vyc29yU2lnbmFsSW5mby5pZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGZvciBhbGwgc2VsZWN0ZWQgY3Vyc29yIGluZm9zIHdpdGggbWF0Y2hpbmcgaWQgLi4uXHJcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2hpbmdDdXJzb3JJbmZvcy5mb3JFYWNoKChjdXJzb3JTaWduYWxJbmZvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNldCB0aGUgY3Vyc29yIHNpZ25hbHMgdmlzaWJpbGl0eSBmcm9tIHRoZSB0ZW1wbGF0ZSB2YWx1ZSBpZiBhIHZhbGlkIHN0YXRlIGlzIGRlZmluZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yU2lnbmFsSW5mby52aXNpYmxlID0gdGVtcGxhdGVDdXJzb3JTaWduYWxJbmZvLnZpc2libGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXRzIHRoZSBjdXJzb3IgaW5mb3Mgd2l0aCB0aGUgc3BlY2lmaWVkIGlkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8Q3Vyc29yU2lnbmFsPn0gY3Vyc29yU2lnbmFsc1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGN1cnNvckluZm9JZFxyXG4gICAgICogQHJldHVybnMge0FycmF5PEN1cnNvckluZm8+fVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZXRyaWV2Q3Vyc29ySW5mb3NCeUlkKGN1cnNvclNpZ25hbHM6IEFycmF5PEN1cnNvclNpZ25hbD4sIGN1cnNvckluZm9JZDogc3RyaW5nKTogQXJyYXk8Q3Vyc29ySW5mbz4ge1xyXG4gICAgICAgIGxldCBtYXRjaGluZ0N1cnNvckluZm9zOiBBcnJheTxDdXJzb3JJbmZvPiA9IFtdO1xyXG4gICAgICAgIGN1cnNvclNpZ25hbHMuZm9yRWFjaCgoY3Vyc29yU2lnbmFsKSA9PiB7Y3Vyc29yU2lnbmFsLmN1cnNvckluZm9zLmZvckVhY2goKGN1cnNvclNpZ25hbEluZm8pID0+IHsgXHJcbiAgICAgICAgICAgICAgICBpZiAoY3Vyc29yU2lnbmFsSW5mby5pZCA9PT0gY3Vyc29ySW5mb0lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2hpbmdDdXJzb3JJbmZvcy5wdXNoKGN1cnNvclNpZ25hbEluZm8pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIG1hdGNoaW5nQ3Vyc29ySW5mb3M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSYWlzZXMgdGhlIG1vdmUgY3Vyc29yIGV2ZW50XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGN1cnNvckluZGV4XHJcbiAgICAgKiBAcGFyYW0ge0N1cnNvck1vdmVtZW50fSBtb3ZlbWVudFxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIG9uTW92ZUN1cnNvcihjdXJzb3JJbmRleDogbnVtYmVyLCBtb3ZlbWVudDogQ3Vyc29yTW92ZW1lbnQpIHtcclxuICAgICAgICBsZXQgZGF0YTogQmFzZVNlcmllcyBbXSA9IFtdO1xyXG5cclxuICAgICAgICBsZXQgeCA9IHRoaXMuY3Vyc29yc1N0YXRlcy5nZXRQb3NpdGlvbihjdXJzb3JJbmRleCwgdGhpcy5jdXJzb3JzU3RhdGVzLmdldExhc3RDdXJzb3JUeXBlU2VsZWN0ZWQoKSk7XHJcblxyXG4gICAgICAgIGxldCBjdXJzb3JzID0gdGhpcy5fY3Vyc29yU2lnbmFsc0RhdGFNb2RlbC5nZXRDdXJzb3JTaWduYWxzKCk7XHJcbiAgICAgICAgY3Vyc29ycy5mb3JFYWNoKGN1cnNvciA9PiB7XHJcbiAgICAgICAgICAgIGRhdGEucHVzaChjdXJzb3Iuc2VyaWUpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYoeCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVDdXJzb3IoY3Vyc29ySW5kZXgsIG1vdmVtZW50LCBkYXRhLCB4KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBtb3ZlcyB0aGUgY3Vyc29yIGZvciB0aGUgc3BlY2lmaWVkIGRpcmVjdGlvbiBhbmQgb2Zmc2V0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjdXJzb3JJbmRleFxyXG4gICAgICogQHBhcmFtIHtDdXJzb3JNb3ZlbWVudH0gY3Vyc29yTW92ZW1lbnRcclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc1tdfSBzZXJpZXNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjdXJzb3JQb3NpdGlvblxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBtb3ZlQ3Vyc29yKGN1cnNvckluZGV4OiBudW1iZXIsIGN1cnNvck1vdmVtZW50OkN1cnNvck1vdmVtZW50LHNlcmllczpCYXNlU2VyaWVzW10sY3Vyc29yUG9zaXRpb246bnVtYmVyKSB7XHJcblxyXG4gICAgICAgIGxldCBjdXJzb3JUeXBlOiBDdXJzb3JUeXBlID0gdGhpcy5jdXJzb3JzU3RhdGVzLmdldExhc3RDdXJzb3JUeXBlU2VsZWN0ZWQoKTtcclxuICAgICAgICAvLyBnZXQgdGhlIG5leHQgcG9zc2libGUgY3Vyc29yIHRpbWVzdGFtcFxyXG4gICAgICAgIGxldCBuZWFyZXN0VGltZXN0YW1wID0gdGhpcy5maW5kTmVhcmVzdFRpbWVzdGFtcEluU2VyaWVzKHNlcmllcywgY3Vyc29yUG9zaXRpb24sIGN1cnNvck1vdmVtZW50LCBjdXJzb3JUeXBlKTtcclxuXHJcbiAgICAgICAgLy8gdXBkYXRlIHRoZSBjdXJzb3JzIHRpbWVzdGFtcCBsb2NhdGlvblxyXG4gICAgICAgIHRoaXMudXBkYXRlQ3Vyc29yTG9jYXRpb24oY3Vyc29ySW5kZXgsIG5lYXJlc3RUaW1lc3RhbXApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogc2VhcmNoZXMgdGhlIG5leHQgdGltZXN0YW1wIGluIGFsbCBhdmFpbGFibGUgc2VyaWVzLiBUaGUgcGlja2VkIHZhbHVlIHRha2VzIHRoZSBtb3ZlbWVudCBkaXJlY3Rpb24gaW50b2kgYWNjb3VudC5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtCYXNlU2VyaWVzW119IHNlcmllc1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGN1cnNvclRpbWVTdGFtcFxyXG4gICAgICogQHBhcmFtIHtDdXJzb3JNb3ZlbWVudH0gY3Vyc29yTW92ZW1lbnRcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGZpbmROZWFyZXN0VGltZXN0YW1wSW5TZXJpZXMoc2VyaWVzOiBCYXNlU2VyaWVzW10sIGN1cnNvclRpbWVTdGFtcDogbnVtYmVyLCBjdXJzb3JNb3ZlbWVudDogQ3Vyc29yTW92ZW1lbnQsIGN1cnNvclR5cGU6IEN1cnNvclR5cGUpOiBudW1iZXIge1xyXG4gICAgICAgIC8vIHJldHJpZXZlIHRoZSB0aW1lc3RhbXBzIHNlcmllcyBmcm9tIHRoZSBzaWduYWwgc2VyaWVzXHJcbiAgICAgICAgbGV0IHRpbWVzdGFtcFNlcmllcyA9IHNlcmllcy5tYXAoKHNpbmdsZVNlcmllcykgPT4geyBcclxuICAgICAgICAgICAgaWYgKHNpbmdsZVNlcmllcy5jdXJzb3JUeXBlID09IGN1cnNvclR5cGUpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNpbmdsZVNlcmllcy50aW1lc3RhbXBzOyBcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgbmV4dE5lYXJlc3RUaW1lU3RhbXAgPSBjdXJzb3JUaW1lU3RhbXA7XHJcblxyXG4gICAgICAgIC8vIGRwZW5kaXVuZyBvbiBtb3ZlbWVudCBkaXJlY3Rpb24gd2UgcGljayB0aGUgbmV4dCBwb3NzaWJsZSB0aW1lIHN0YW1wXHJcbiAgICAgICAgc3dpdGNoIChjdXJzb3JNb3ZlbWVudCkge1xyXG4gICAgICAgICAgICBjYXNlIEN1cnNvck1vdmVtZW50LlJpZ2h0OlxyXG4gICAgICAgICAgICAgICAgbmV4dE5lYXJlc3RUaW1lU3RhbXAgPSBTZXJpZXNIZWxwZXIuZmluZE5lYXJlc3RWYWx1ZUZyb21Db2xsZWN0aW9uKGN1cnNvclRpbWVTdGFtcCwgdGltZXN0YW1wU2VyaWVzLCBTZWFyY2hNb2RlLk5FWFRVUFBFUik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBDdXJzb3JNb3ZlbWVudC5MZWZ0OlxyXG4gICAgICAgICAgICAgICAgbmV4dE5lYXJlc3RUaW1lU3RhbXAgPSBTZXJpZXNIZWxwZXIuZmluZE5lYXJlc3RWYWx1ZUZyb21Db2xsZWN0aW9uKGN1cnNvclRpbWVTdGFtcCwgdGltZXN0YW1wU2VyaWVzLCBTZWFyY2hNb2RlLlBSRVZJT1VTTE9XRVIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXh0TmVhcmVzdFRpbWVTdGFtcDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZSBjdXJzb3IgYWN0aXZhdGlvbi9zZWxlY3Rpb25cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY3Vyc29ySW5kZXhcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvblJlZmVyZW5jZUN1cnNvclNlbGVjdGVkKGN1cnNvckluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICBcclxuICAgICAgICAvLyB1cGRhdGUgdGhlIGN1cnNvciBzZWxlY3Rpb24gc3RhdGVcclxuICAgICAgICB0aGlzLmN1cnNvcnNTdGF0ZXMuc2V0U2VsZWN0ZWQoY3Vyc29ySW5kZXgsIHRydWUpO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZUN1cnNvclN0YXRlcyggdGhpcy5jdXJzb3JzU3RhdGVzKTtcclxuXHJcbiAgICAgICAgLy8gc2V0IHRoZSBjdXJzb3JzIGFzIGFjdGl2ZSB0b29sXHJcbiAgICAgICAgbGV0IHRvb2xzdGF0ZTogQ2hhcnRWaWV3VG9vbFN0YXRlID0gdGhpcy5zdGF0ZXMucmVhZChDaGFydFZpZXdUb29sU3RhdGUsXCJDaGFydFZpZXdUb29sU3RhdGVcIik7XHJcbiAgICAgICAgdG9vbHN0YXRlLnNlbGVjdGVkVG9vbCA9IENoYXJ0Vmlld1Rvb2xTdGF0ZUVudW0uQ1VSU09SUztcclxuICAgICAgICB0aGlzLnN0YXRlcy51cGRhdGUodGhpcyxDaGFydFZpZXdUb29sU3RhdGUsIHRvb2xzdGF0ZSxcIkNoYXJ0Vmlld1Rvb2xTdGF0ZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBzaWduYWwgdG8gdGhlIGN1cnNvciBpbmZvIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8QmFzZVNlcmllcz59IHNlcmllc1xyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZFNlcmllcyhzZXJpZXM6IEFycmF5PEJhc2VTZXJpZXM+KXtcclxuICAgICAgICBsZXQgY3Vyc29yU2lnbmFscyA9IG5ldyBBcnJheTxDdXJzb3JTaWduYWw+KCk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZXJpZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZiAoc2VyaWVzW2ldLnR5cGUgPT09IFNlcmllc1R5cGUudGltZVNlcmllcykge1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yU2lnbmFscy5wdXNoKG5ldyBZVEN1cnNvclNpZ25hbChzZXJpZXNbaV0pKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzZXJpZXNbaV0udHlwZSA9PT0gU2VyaWVzVHlwZS54eVNlcmllcykge1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yU2lnbmFscy5wdXNoKG5ldyBYWUN1cnNvclNpZ25hbChzZXJpZXNbaV0pKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzZXJpZXNbaV0udHlwZSA9PT0gU2VyaWVzVHlwZS5mZnRTZXJpZXMpIHtcclxuICAgICAgICAgICAgICAgIGN1cnNvclNpZ25hbHMucHVzaChuZXcgRkZUQ3Vyc29yU2lnbmFsKHNlcmllc1tpXSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9jdXJzb3JTaWduYWxzRGF0YU1vZGVsLmFkZFNpZ25hbChjdXJzb3JTaWduYWxzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZSBhIGN1cnNvciBzaWduYWwgZnJvbSB0aGUgY3Vyc29yIGluZm8gd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtCYXNlU2VyaWVzfSBzZXJpZVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlbW92ZVNlcmllKHNlcmllOiBCYXNlU2VyaWVzKXtcclxuICAgICAgICBsZXQgY3Vyc29yU2lnbmFsID0gdGhpcy5fY3Vyc29yU2lnbmFsc0RhdGFNb2RlbC5nZXRDdXJzb3JTaWduYWwoc2VyaWUpO1xyXG4gICAgICAgIGlmKGN1cnNvclNpZ25hbCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnNvclNpZ25hbHNEYXRhTW9kZWwucmVtb3ZlU2VyaWUoY3Vyc29yU2lnbmFsKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIERpc2FibGVzIGZpbHRlciBidXR0b24gaWYgaXMgYWN0aXZlXHJcbiAgICAgICAgICAgIGlmKHRoaXMuX3Rvb2xiYXIuY3Vyc29ySW5mb1NlbGVjdGlvbklzQWN0aXZlKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2xiYXIuYWN0aXZhdGVDdXJzb3JJbmZvU2VsZWN0b3JWaWV3KCF0aGlzLl90b29sYmFyLmN1cnNvckluZm9TZWxlY3Rpb25Jc0FjdGl2ZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFJlbW92ZXMgdGhlIGN1cnNvciBzaWduYWwgZnJvbSB0aGUgY3VycmVudCBzZWxlY3Rpb24gbGlzdCBhbmQgdXBkYXRlcyB0aGUgdG9vbGJhciBidXR0b25cclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5fc2VsZWN0ZWRDdXJzb3JTaWduYWxzLmluZGV4T2YoY3Vyc29yU2lnbmFsKTtcclxuICAgICAgICAgICAgaWYoaW5kZXggIT0gLTEpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRDdXJzb3JTaWduYWxzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUN1cnNvckluZm9TZWxlY3RvckJ1dHRvblN0YXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjaGFuZ2VzIGFuZCB1cGRhdGVzIHRoZSBjdXJzb3IgbG9jYXRpb24gb2YgdGhlIHNlbGVjdGVkIGN1cnNvclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjdXJzb3JJbmRleFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGN1cnNvclRpbWVzdGFtcFxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHVwZGF0ZUN1cnNvckxvY2F0aW9uKGN1cnNvckluZGV4OiBudW1iZXIsIGN1cnNvclRpbWVzdGFtcDogbnVtYmVyKSB7XHJcblxyXG4gICAgICAgIHRoaXMuY3Vyc29yc1N0YXRlcy5zZXRQb3NpdGlvbihjdXJzb3JJbmRleCwgY3Vyc29yVGltZXN0YW1wKTtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVDdXJzb3JTdGF0ZXMoIHRoaXMuY3Vyc29yc1N0YXRlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZWZyZXNoZXMgdGhlIHRyZWUgZ3JpZHMgZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlZnJlc2goKXtcclxuICAgICAgICAvLyByZWZyZXNoIHRyZWUgZ3JpZCBvbmx5IGlmIGN1cnNvciBzaWduYWwgdmlldyBpcyBhY3RpdmUgKG5vdCBpbiBjYXNlIG9mIGN1cnNvciBpbmZvIHNlbGVjdG9yKVxyXG4gICAgICAgIGlmKCF0aGlzLl9jdXJzb3JJbmZvU2VsZWN0b3JJc0FjdGl2ZSl7XHJcbiAgICAgICAgICAgIGxldCBjdXJzb3JTaWduYWxzID0gdGhpcy5fY3Vyc29yU2lnbmFsc0RhdGFNb2RlbC5nZXRDdXJzb3JTaWduYWxzKCk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRGF0YVNvdXJjZShjdXJzb3JTaWduYWxzKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHNldCB0aGUgc2VsZWN0aW9uIHRvIHRoZSBzZWxlY3Qgc2lnbmFsIGJlZm9yZVxyXG4gICAgICAgICAgICBsZXQgdHJlZUdyaWRPYmplY3Q6IGFueSA9IHRoaXMuZ2V0VHJlZUdyaWRPYmplY3QoKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3Rpb25XaXRoQ3Vyc29yU2lnbmFscyh0cmVlR3JpZE9iamVjdCwgdGhpcy5fc2VsZWN0ZWRDdXJzb3JTaWduYWxzKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIFVwZGF0ZSBjdXJzb3IgaW5mbyB2YWx1ZXMgXHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaEN1cnNvclN0YXRlcygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRyaWdnZXIgdGhlIHVwZGF0ZSBvZiB0aGUgY3Vyc29ySW5mb3MgZm9yIHRoZSBjdXJyZW50IGN1cnNvciBzdGF0ZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWZyZXNoQ3Vyc29yU3RhdGVzKCl7XHJcbiAgICAgICAgdGhpcy51cGRhdGVDdXJzb3JTdGF0ZXModGhpcy5jdXJzb3JzU3RhdGVzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZURhdGFTb3VyY2UoY3Vyc29yU2lnbmFsczogQXJyYXk8Q3Vyc29yU2lnbmFsPil7XHJcbiAgICAgICAgdGhpcy5zZXRDdXJzb3JWYWx1ZVVpSWRzKGN1cnNvclNpZ25hbHMpO1xyXG5cclxuICAgICAgICAvLyBSZWZyZXNoIFRyZWVHcmlkIHdpdGggbmV3IGRhdGFzb3VyY2VcclxuICAgICAgICB0aGlzLnNldE1vZGVsKGN1cnNvclNpZ25hbHMpO1xyXG5cclxuICAgICAgICAvLyBSZWZyZXNoIHRoZSBjdXJzb3IgdmFsdWVzIGFmdGVyIHVwZGF0aW5nIHRoZSBtb2RlbFxyXG4gICAgICAgIHRoaXMucmVmcmVzaEN1cnNvclZhbHVlcyhjdXJzb3JTaWduYWxzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgYW5kIHNldHMgdWlkcyBmb3IgZXZlcnkgY3Vyc29yIHZhbHVlIChjdXJzb3Igc2lnbmFscyBhbmQgY3Vyc29yIGluZm9zKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PEN1cnNvclNpZ25hbD59IGN1cnNvclNpZ25hbHNcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0Q3Vyc29yVmFsdWVVaUlkcyhjdXJzb3JTaWduYWxzOiBBcnJheTxDdXJzb3JTaWduYWw+KSB7XHJcbiAgICAgICAgbGV0IGN1cnNvckluZm9JZCA9IDA7XHJcbiAgICAgICAgY3Vyc29yU2lnbmFscy5mb3JFYWNoKChjdXJzb3JTaWduYWwpPT57XHJcbiAgICAgICAgICAgICg8SVVpQmluZGluZz48YW55PmN1cnNvclNpZ25hbCkudWlJZCA9IGN1cnNvckluZm9JZCsrO1xyXG4gICAgICAgICAgICBjdXJzb3JTaWduYWwuY3Vyc29ySW5mb3MuZm9yRWFjaCgoY3Vyc29ySW5mbyk9PntcclxuICAgICAgICAgICAgICAgICAoPElVaUJpbmRpbmc+PGFueT5jdXJzb3JJbmZvKS51aUlkID0gY3Vyc29ySW5mb0lkKys7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWZyZXNoIGFsbCBjdXJzb3IgdmFsdWVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8Q3Vyc29yU2lnbmFsPn0gY3Vyc29yU2lnbmFsc1xyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWZyZXNoQ3Vyc29yVmFsdWVzKGN1cnNvclNpZ25hbHM6IEFycmF5PEN1cnNvclNpZ25hbD4pIHsgICAgICAgICAgICAgICBcclxuICAgICAgICBjdXJzb3JTaWduYWxzLmZvckVhY2goKGN1cnNvclNpZ25hbCk9PnsgXHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaEN1cnNvclZhbHVlRmllbGQoY3Vyc29yU2lnbmFsKTtcclxuICAgICAgICAgICAgY3Vyc29yU2lnbmFsLmN1cnNvckluZm9zLmZvckVhY2goKGN1cnNvckluZm8pPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDdXJzb3JWYWx1ZUZpZWxkKGN1cnNvckluZm8pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdXBkYXRlcyBhIGN1cnNvciB2YWx1ZSBmaWVsZCB3aXRoIHRoZSBjdXJyZW50IHZhbHVlcyBvZiB0aGUgY29ycmVzcG9uZGlnIGN1cnNvciBzaWduYWwgb3IgaW5mb1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0N1cnNvclNpZ25hbHxDdXJzb3JJbmZvfSBjdXJzb3JTaWduYWxPckluZm9cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVmcmVzaEN1cnNvclZhbHVlRmllbGQoY3Vyc29yU2lnbmFsT3JJbmZvOiBDdXJzb3JTaWduYWx8Q3Vyc29ySW5mbykge1xyXG4gICAgICAgIGlmIChjdXJzb3JTaWduYWxPckluZm8pIHtcclxuICAgICAgICAgICAgLy8gZ2V0IHRoZSBjb3JyZXNwb25kaW5nIHVpIGVsZW1lbnRcclxuICAgICAgICAgICAgbGV0IGN1cnNvclZhbHVlRWxlbWVudCA9IHRoaXMuZ2V0Q3Vyc29yVmFsdWVFbGVtZW50KGN1cnNvclNpZ25hbE9ySW5mbyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgdmFsdWVTdHJpbmc6IHN0cmluZyA9IGN1cnNvclNpZ25hbE9ySW5mby52YWx1ZS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICBpZiAoY3Vyc29yVmFsdWVFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBjdXJzb3JWYWx1ZUVsZW1lbnQuaW5uZXJUZXh0ID0gdmFsdWVTdHJpbmc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBjb3JyZXNwb25kaW5nIGN1cnNvciBzaWduYWwgb3IgaW5mbyBlbGVtZW50XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Q3Vyc29yU2lnbmFsfEN1cnNvckluZm99IGN1cnNvclNpZ25hbE9ySW5mb1xyXG4gICAgICogQHJldHVybnMgeyhIVE1MRWxlbWVudCB8IG51bGwpfVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRDdXJzb3JWYWx1ZUVsZW1lbnQoY3Vyc29yU2lnbmFsT3JJbmZvOiBDdXJzb3JTaWduYWx8Q3Vyc29ySW5mbyk6IEhUTUxFbGVtZW50IHwgbnVsbCB7XHJcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMucGFyZW50Q29udGVudElkICsgQ1VSU09SX1ZBTFVFX0lEICsgKDxJVWlCaW5kaW5nPjxhbnk+Y3Vyc29yU2lnbmFsT3JJbmZvKS51aUlkKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQ3Vyc29yU2lnbmFsc0RhdGFNb2RlbENoYW5nZWQoc2VuZGVyLCBhcmdzKXtcclxuICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIG1ldGhvZCB3aWxsIHVwZGF0ZSB0aGUgY3Vyc29yIGluZm8gd2lkZ2V0IHdpdGggZGF0YSBmcm9tXHJcbiAgICAgKiB0aGUgY3Vyc29yIHN0YXRlLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0N1cnNvclN0YXRlc30gbW9kaWZpZWRTdGF0ZVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVJbmZvQ3Vyc29yc1dpdGhOZXdTdGF0ZVZhbHVlcyAobW9kaWZpZWRTdGF0ZTogQ3Vyc29yU3RhdGVzKSB7XHJcbiAgICAgICAgdGhpcy5fY3Vyc29yU2lnbmFsc0RhdGFNb2RlbC5nZXRDdXJzb3JTaWduYWxzKCkuZm9yRWFjaCgoY3Vyc29yU2lnbmFsOiBDdXJzb3JTaWduYWwpPT57XHJcbiAgICAgICAgICAgIGlmKGN1cnNvclNpZ25hbC5zZXJpZS5yYXdQb2ludHNWYWxpZCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJzb3JTaWduYWxzRGF0YU1vZGVsLnVwZGF0ZUN1cnNvclZhbHVlcyhjdXJzb3JTaWduYWwsIG1vZGlmaWVkU3RhdGUuZ2V0UG9zaXRpb24oMCwgY3Vyc29yU2lnbmFsLnNlcmllLmN1cnNvclR5cGUpLCBtb2RpZmllZFN0YXRlLmdldFBvc2l0aW9uKDEsIGN1cnNvclNpZ25hbC5zZXJpZS5jdXJzb3JUeXBlKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnNvclNpZ25hbHNEYXRhTW9kZWwuY2xlYXJDdXJzb3JWYWx1ZXMoY3Vyc29yU2lnbmFsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX3Rvb2xiYXIudXBkYXRlQnV0dG9uU3RhdGVzKG1vZGlmaWVkU3RhdGUpO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEN1cnNvclZhbHVlcyh0aGlzLl9jdXJzb3JTaWduYWxzRGF0YU1vZGVsLmdldEN1cnNvclNpZ25hbHMoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb252ZXJ0IGN1c3RvbSBjaGVjayBib3hlcyBpbnRvIHN5bmNmdXNpb24gY2hlY2sgYm94ZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVDaGVja0JveGVzKCkge1xyXG4gICAgICAgIHZhciBjaGVja0JveGVzID0gJCgnLmN1c3RvbUNoZWNrYm94Jyk7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGNoZWNrQm94ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY2hlY2tCb3hlc1tpXS5pZCA9ICdjdXN0b21DaGVja2JveCcgKyAoaSArIDEpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0U3luY2Z1c2lvbkNoZWNrYm94KGNoZWNrQm94ZXNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluc3RhbnRpYXRlIHN5bmNmdXNpb24gY2hlY2sgYm94XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGN1c3RvbUNoZWNrYm94XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0U3luY2Z1c2lvbkNoZWNrYm94KGN1c3RvbUNoZWNrYm94OiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgIHZhciBlbmFibGVUcmlTdGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBzdGF0ZSA9IHRoaXMuZ2V0Q3VzdG9tQ2hlY2tib3hTdGF0ZSgkKGN1c3RvbUNoZWNrYm94KSk7XHJcbiAgICAgICAgaWYgKHN0YXRlID09PSAnaW5kZXRlcm1pbmF0ZScpIHsgZW5hYmxlVHJpU3RhdGUgPSB0cnVlOyB9XHJcbiAgICAgICAgJChjdXN0b21DaGVja2JveCkuZWpDaGVja0JveChcclxuICAgICAgICAgICAgeyAgXHJcbiAgICAgICAgICAgIGVuYWJsZVRyaVN0YXRlOiBlbmFibGVUcmlTdGF0ZSxcclxuICAgICAgICAgICAgaWQ6IGN1c3RvbUNoZWNrYm94LmlkLFxyXG4gICAgICAgICAgICBjaGVja1N0YXRlOiBzdGF0ZSxcclxuICAgICAgICAgICAgY2hhbmdlOiAoYXJncykgPT4gdGhpcy5zeW5jZnVzaW9uQ2hlY2tCb3hDaGFuZ2VkKGFyZ3MpLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRyaWdnZXIgY2hlY2sgYm94IGNoYW5nZSBldmVudFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3luY2Z1c2lvbkNoZWNrQm94Q2hhbmdlZChhcmdzKSB7XHJcbiAgICAgICAgaWYgKGFyZ3MubW9kZWwuZW5hYmxlVHJpU3RhdGUpIHtcclxuICAgICAgICAgICAgJCgnIycgKyBhcmdzLm1vZGVsLmlkKS5lakNoZWNrQm94KHtlbmFibGVUcmlTdGF0ZTogZmFsc2V9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZXRTZWxlY3RlZEN1cnNvcnNJbmZvKGFyZ3MpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBjdXN0b21DaGVja2JveCA9ICQoJyMnICsgYXJncy5tb2RlbC5pZCk7XHJcbiAgICAgICAgY3VzdG9tQ2hlY2tib3guY2hhbmdlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgc2VsZWN0ZWQgY3Vyc29yIGluZm8gd2hlbiBjaGVja2JveCBpcyBjbGlja2VkXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBzZXRTZWxlY3RlZEN1cnNvcnNJbmZvKGFyZ3Mpe1xyXG4gICAgICAgIHZhciB0cmVlZ3JpZDogYW55ID0gdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpO1xyXG4gICAgICAgIHZhciBpbmRleCA9IHBhcnNlSW50KGFyZ3MubW9kZWwuaWQuc3BsaXQoJ2N1c3RvbUNoZWNrYm94JylbMV0sIDEwKTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5fc2VsZWN0ZWRDdXJzb3JJbmZvc09sZCA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRDdXJzb3JJbmZvc09sZCA9IHRyZWVncmlkLm1vZGVsLmZsYXRSZWNvcmRzW2luZGV4XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkQ3Vyc29ySW5mb3NPbGQgPSB0aGlzLl9zZWxlY3RlZEN1cnNvckluZm9zTmV3O1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9zZWxlY3RlZEN1cnNvckluZm9zTmV3ID0gdHJlZWdyaWQubW9kZWwuZmxhdFJlY29yZHNbaW5kZXhdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0IHN0YXRlIG9mIGNoZWNrYm94XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SlF1ZXJ5PEhUTUxFbGVtZW50Pn0gY2hlY2tib3hcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29ySW5mb1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldEN1c3RvbUNoZWNrYm94U3RhdGUoY2hlY2tib3g6IEpRdWVyeTxIVE1MRWxlbWVudD4pOiBzdHJpbmcge1xyXG4gICAgICAgIGlmIChjaGVja2JveC5pcygnOmNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJ2NoZWNrJztcclxuICAgICAgICB9IGVsc2UgaWYgKGNoZWNrYm94LmlzKCc6aW5kZXRlcm1pbmF0ZScpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnaW5kZXRlcm1pbmF0ZSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gJ3VuY2hlY2snO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgQ3Vyc29ySW5mb1dpZGdldCB9OyJdfQ==