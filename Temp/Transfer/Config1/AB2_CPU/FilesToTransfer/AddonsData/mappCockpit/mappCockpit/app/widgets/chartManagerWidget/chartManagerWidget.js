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
define(["require", "exports", "../common/treeGridWidgetBase", "./view/chartManagerTreeGridCellStyle", "./view/chartManagerTreeGridDragDrop", "./view/chartManagerTreeGridToolbar", "../../models/chartManagerDataModel/chartManagerChart", "../common/interfaces/dropInterface", "../../models/chartManagerDataModel/baseSeries", "../../models/chartManagerDataModel/scale", "../../models/chartManagerDataModel/chartManagerDataModel", "../chartViewWidget/chartViewWidget", "../chartViewWidget/helpers/chartDropHelper", "../common/SerieChartTypeHelper", "../../models/chartManagerDataModel/seriesType", "./defaultComponentSettings"], function (require, exports, treeGridWidgetBase_1, chartManagerTreeGridCellStyle_1, chartManagerTreeGridDragDrop_1, chartManagerTreeGridToolbar_1, chartManagerChart_1, dropInterface_1, baseSeries_1, scale_1, chartManagerDataModel_1, chartViewWidget_1, chartDropHelper_1, SerieChartTypeHelper_1, seriesType_1, defaultComponentSettings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ChartManagerWidget = /** @class */ (function (_super) {
        __extends(ChartManagerWidget, _super);
        function ChartManagerWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.eventDropHelper = new chartViewWidget_1.EventDropHelper();
            _this.highlightAreaId = "chartManager_Highlighted";
            return _this;
            //*******************************************************End region drop support*******************************************************
        }
        /**
         * Initializes the chart manager
         *
         * @param {string} layoutContainerId
         * @memberof ChartManagerWidget
         */
        ChartManagerWidget.prototype.initialize = function (layoutContainerId) {
            _super.prototype.initialize.call(this, layoutContainerId, 30);
        };
        ChartManagerWidget.prototype.initializeComponent = function () {
            this.component.defaultSettingsDataId = defaultComponentSettings_1.DefaultComponentSettings.WidgetDefinitionId;
        };
        ChartManagerWidget.prototype.dispose = function () {
            this.removeSupportedDragDropDataId(dropInterface_1.DragDropDataId.signal);
            _super.prototype.dispose.call(this);
        };
        /**
         * Loads the styles for the chart manager widget
         *
         * @memberof ChartManagerWidget
         */
        ChartManagerWidget.prototype.loadStyles = function () {
            _super.prototype.loadStyles.call(this);
            _super.prototype.addStyle.call(this, "widgets/common/style/css/dropDownMenuStyle.css");
        };
        /**
         * Returns the default component settings for this widget
         *
         * @returns {(ComponentSettings|undefined)}
         * @memberof ChartManagerWidget
         */
        ChartManagerWidget.prototype.getDefaultComponentSettings = function () {
            return defaultComponentSettings_1.DefaultComponentSettings.getChartManagerWidgetDefinition();
        };
        /**
         * Creates the layout of the widget
         *
         * @memberof ChartManagerWidget
         */
        ChartManagerWidget.prototype.createLayout = function () {
            var $widgetContainer = $(this.cssParentContentId);
            $widgetContainer[0].style.overflow = "hidden";
            _super.prototype.createLayout.call(this);
        };
        ChartManagerWidget.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            this.setChartManagerDataModel();
            // Recreate treeGrid to use the new datamodel for the toolbar in the treeGrid
            this.refresh(this.dataModel.data, true);
            _super.prototype.setHeaderContent.call(this, "Charts");
            // Set dynamic column settings
            _super.prototype.setDynamicColumn.call(this, 0, 80);
            // Hide the column header of the tree grid
            //super.setColumnHeaderHidden();
            this.addSupportedDragDropDataId(dropInterface_1.DragDropDataId.signal);
        };
        ChartManagerWidget.prototype.setChartManagerDataModel = function () {
            var dataModel = this.component.getSubComponent(defaultComponentSettings_1.DefaultComponentSettings.ChartManagerDataModelId);
            this.dataModel = dataModel;
        };
        ChartManagerWidget.prototype.getComponentSettings = function (onlyModified) {
            return _super.prototype.getComponentSettings.call(this, onlyModified);
        };
        ChartManagerWidget.prototype.setComponentSettings = function (data) {
            if (data != undefined) {
                _super.prototype.setComponentSettings.call(this, data);
            }
        };
        /**
         * Handles the model changes
         *
         * @param {IDataModel} sender
         * @param {EventModelChangedArgs} eventArgs
         * @returns {*}
         * @memberof ChartManagerWidget
         */
        ChartManagerWidget.prototype.handleModelChanged = function (sender, eventArgs) {
            if (eventArgs.hint != chartManagerDataModel_1.ChartManagerDataModelChangedHint.updateScaleRange && eventArgs.hint != chartManagerDataModel_1.ChartManagerDataModelChangedHint.default) {
                this.refresh(eventArgs.data.data);
                var treegridObj = this.getTreeGridObject();
                if (treegridObj.model.selectedRowIndex == -1) { // TODO: selectedItem != undefined but selectedRowIndex == -1 !!!
                    this.updateToolbarButtonStates(eventArgs.data.data, undefined);
                }
                else {
                    this.updateToolbarButtonStates(eventArgs.data.data, treegridObj.model.selectedItem.item);
                }
                this.saveTreeGridSettings();
            }
        };
        /**
         * Creates the column templates for the tree grid and adds them to the widget container
         *
         * @protected
         * @memberof ChartManagerWidget
         */
        ChartManagerWidget.prototype.createColumnTemplates = function () {
            var $widgetContainer = $(this.cssParentContentId);
            $widgetContainer.append(this.getScriptForDragDropTemplateHelpers());
            $widgetContainer.append(this.getColumnTemplateData(ChartManagerWidget.nameColumnId));
        };
        /**
         * creates the tree grid for the chartmanager
         *
         * @protected
         * @returns
         * @memberof ChartManagerWidget
         */
        ChartManagerWidget.prototype.createTreeGrid = function () {
            var _this = this;
            if (this._dataModel == undefined) {
                console.info("dataModel undefined!");
                return;
            }
            var cellStyle = new chartManagerTreeGridCellStyle_1.ChartManagerTreeGridCellStyle();
            $(this.cssParentContentId).ejTreeGrid(__assign(__assign(__assign(__assign(__assign({}, this.getTreeGridColumnDefinition()), this.getTreeGridColumnResizeSupport()), this.getTreeGridToolbarSupport()), this.getTreeGridDragDropSupport()), { dataSource: this._dataModel.data, childMapping: "childs", idMapping: ChartManagerWidget.nameColumnId, expandStateMapping: "expandState", isResponsive: true, rowHeight: 28, 
                // Set init size to draw the toolbar icons at the right position
                sizeSettings: { height: '400px', width: '400px', }, expanded: function (args) { return _this.treeGridNodeExpandedOrCollapsed(); }, collapsed: function (args) { return _this.treeGridNodeExpandedOrCollapsed(); }, rowSelected: function (args) { return _this.updateToolbarButtonStates(args.model.dataSource, args.data.item); }, create: function (args) { return _this.treeGridCreated(); }, actionBegin: function (args) { return _this.treeGridActionBegin(args); }, actionComplete: function (args) { return _this.treeGridActionComplete(args); }, queryCellInfo: function (args) { return cellStyle.setCellStyle(args); } }));
        };
        ChartManagerWidget.prototype.treeGridNodeExpandedOrCollapsed = function () {
            // Refresh to see correct expanded/collapsed icon
            this.refresh(this.dataModel.data);
            //Persist data model (expandState)
            if (this._dataModel !== undefined) {
                this._dataModel.saveSettings();
            }
            //Persit scrollbar position of treeGrid
            this.saveTreeGridSettings();
        };
        /**
         * Returns the tree grid column definition
         *
         * @private
         * @returns {{}}
         * @memberof ChartManagerWidget
         */
        ChartManagerWidget.prototype.getTreeGridColumnDefinition = function () {
            return {
                columns: [
                    { field: ChartManagerWidget.nameColumnId, headerText: "Name", isTemplateColumn: true, templateID: "cmNameColumnTemplate" },
                    { field: ChartManagerWidget.additionalInfoColumnId, headerText: "", width: "140px" },
                    { field: ChartManagerWidget.iconDefinitionColumnId, visible: false, width: "0px" },
                ],
            };
        };
        /**
         * Returns the tree grid column resize settings
         *
         * @private
         * @returns {{}}
         * @memberof ChartManagerWidget
         */
        ChartManagerWidget.prototype.getTreeGridColumnResizeSupport = function () {
            var _this = this;
            return {
                allowColumnResize: true,
                columnResizeSettings: { columnResizeMode: ej.TreeGrid.ColumnResizeMode.FixedColumns },
                columnResized: function (args) { return _this.treeGridColumnResized(args); },
            };
        };
        /**
         * A treegrid column was resized
         *
         * @private
         * @param {*} args
         * @memberof ChartManagerWidget
         */
        ChartManagerWidget.prototype.treeGridColumnResized = function (args) {
            _super.prototype.resizeDynamicColumn.call(this, args.columnIndex, args.model);
            this.saveTreeGridSettings();
        };
        /**
         * Returns the tree grid toolbar settings
         *
         * @private
         * @returns {{}}
         * @memberof ChartManagerWidget
         */
        ChartManagerWidget.prototype.getTreeGridToolbarSupport = function () {
            var _this = this;
            this._toolbar = new chartManagerTreeGridToolbar_1.ChartManagerTreeGridToolbar(this.cssParentContentId, this._dataModel);
            return {
                toolbarSettings: {
                    showToolbar: true,
                    customToolbarItems: this._toolbar.getCustomToolbars(),
                },
                toolbarClick: function (args) { return _this._toolbar.toolbarClick(args); },
            };
        };
        ChartManagerWidget.prototype.getTreeGridDragDropSupport = function () {
            var _this = this;
            var dragDrop = new chartManagerTreeGridDragDrop_1.ChartManagerTreeGridDragDrop();
            return {
                allowDragAndDrop: true,
                rowDragStart: function (args) { return dragDrop.rowDragStart(args); },
                rowDrag: function (args) { return dragDrop.rowDrag(args); },
                rowDropActionBegin: function (args) { return dragDrop.rowDropActionBegin(args, _this._dataModel); },
                rowDragStop: function (args) { return dragDrop.rowDragStop(args, _this._dataModel); },
            };
        };
        ChartManagerWidget.prototype.treeGridCreated = function () {
            // Sets the custom toolbar icons
            this._toolbar.setStyleForToolbarIcons();
            // At the beginning the delete button is disabled because no selection is available
            this._toolbar.disableDeleteButton(true);
        };
        ChartManagerWidget.prototype.treeGridActionBegin = function (args) {
            // Support "Entf/Del" key
            if (args.requestType == "delete") {
                args.cancel = true;
                if (args.deletedItems[0].item instanceof chartManagerChart_1.ChartManagerChart) {
                    // Remove chart from datamodel
                    this._dataModel.removeChart(args.deletedItems[0].item);
                }
                else if (args.deletedItems[0].item instanceof baseSeries_1.BaseSeries) {
                    var chart = args.deletedItems[0].parentItem.parentItem.item;
                    if (chart != undefined) {
                        // Remove serie from datamodel
                        this._dataModel.removeSerie(chart, args.deletedItems[0].item);
                    }
                }
                else if (args.deletedItems[0].item instanceof scale_1.Scale) {
                    var chart = args.deletedItems[0].parentItem.item;
                    if (chart != undefined && chart.canRemoveYAxis() == true) {
                        // Remove yAxis from datamodel
                        this._dataModel.removeYAxis(chart, args.deletedItems[0].item);
                    }
                }
            }
        };
        ChartManagerWidget.prototype.treeGridActionComplete = function (args) {
            // Event trigger while changing datasource dynamically. 
            // code to done after the dynamic change of datasource. 
            if (args.requestType === 'refreshDataSource') {
                this.refreshSelection();
            }
        };
        ChartManagerWidget.prototype.refresh = function (data, recreate) {
            if (recreate === void 0) { recreate = false; }
            try {
                if (recreate == true) {
                    //To avoid problems with the toolbar, treegrid needs to be destroyed if we are creating it again
                    var treegridObj = this.getTreeGridObject();
                    treegridObj.destroy();
                    this.createTreeGrid();
                    // Set column sizes after treegrid recreation => TODO: must be solved in an other way => no recreation for toolbar update, if possible
                    var columnSettings = this.component.getSetting(treeGridWidgetBase_1.TreeGridWidgetBase.ColumnsSettingId);
                    this.setColumnSettings(columnSettings);
                    var scrollbarSettings = this.component.getSetting(treeGridWidgetBase_1.TreeGridWidgetBase.ScrollbarsSettingsId);
                    this.setScrollBarSettings(scrollbarSettings);
                }
                else {
                    this.setModel(data);
                }
            }
            catch (e) {
                console.info("ChartManager refresh error! => TreeGrid recreation!");
                console.info(e);
                this.createTreeGrid();
            }
        };
        ChartManagerWidget.prototype.refreshSelection = function () {
            var treeObj = $(this.cssParentContentId).ejTreeGrid('instance');
            // Get actual selection index
            var actualSelectedRowIndex = treeObj.model.selectedRowIndex;
            // Reset selection
            treeObj.model.selectedRowIndex = -1;
            // Set to last index if index is out of range
            if (actualSelectedRowIndex >= treeObj.model.flatRecords.length) {
                actualSelectedRowIndex = treeObj.model.flatRecords.length - 1;
            }
            // Set selection
            treeObj.model.selectedRowIndex = actualSelectedRowIndex;
            // update toolbar buttons
            if (treeObj.model.flatRecords[actualSelectedRowIndex] != undefined) {
                this.updateToolbarButtonStates(treeObj.model.dataSource, treeObj.model.flatRecords[actualSelectedRowIndex].item);
            }
        };
        ChartManagerWidget.prototype.updateToolbarButtonStates = function (charts, selectedItem) {
            if (charts.length == 0 || selectedItem == undefined || (selectedItem instanceof scale_1.Scale && selectedItem.parent.canRemoveYAxis() == false)) {
                this._toolbar.disableDeleteButton(true);
            }
            else {
                this._toolbar.disableDeleteButton(false);
            }
            if (this._dataModel.canAddChart() || (selectedItem instanceof chartManagerChart_1.ChartManagerChart && selectedItem.canAddYAxis())) {
                this._toolbar.disableAddButton(false);
            }
            else {
                this._toolbar.disableAddButton(true);
            }
            this._toolbar.setSelectedChart(selectedItem);
        };
        //*******************************************************Region drop support*******************************************************
        /**
         * Adds all possible dropLocations
         *
         * @private
         * @param {Array<BaseSeries>} series
         * @memberof ChartManagerWidget
         */
        ChartManagerWidget.prototype.addDropLocations = function (series) {
            // Add possible drop locations
        };
        /**
         * Removes all drop locations
         *
         * @private
         * @param {Array<BaseSeries>} series
         * @memberof ChartManagerWidget
         */
        ChartManagerWidget.prototype.removeDropLocations = function (series) {
            this._dataModel.data.forEach(function (chart) {
                chart.dropPossible = false;
                chart.childs.forEach(function (yAxis) {
                    yAxis.dropPossible = false;
                });
            });
        };
        ChartManagerWidget.prototype.dragStart = function (args) {
            var serie = args.data;
            // Add possible dropLocations
            this.addDropLocations(serie);
            // Update treeGrid
            this.refresh(this._dataModel.data);
        };
        ChartManagerWidget.prototype.dragStop = function (args) {
            var serie = args.data;
            // Remove possible dropLocations
            this.removeDropLocations(serie);
            // Update treeGrid
            this.refresh(this._dataModel.data);
        };
        ChartManagerWidget.prototype.dragOver = function (args) {
            var series = args.data;
            var dropPossible = false;
            var chart = this.getChartFromDragLocation(args.currentTarget);
            var yAxis = this.getYAxisFromDragLocation(args.currentTarget);
            var imageProvider = this.component.getSubComponent(defaultComponentSettings_1.DefaultComponentSettings.ImageProviderId);
            if (chart != undefined) {
                if (chart.dropPossible == true) {
                    dropPossible = true;
                    if (args.dragDropRepresentation != undefined) {
                        var addNewScaleImage = imageProvider.getImage("../app/widgets/common/style/images/dragDrop/addNewScale.svg");
                        args.dragDropRepresentation.iconList.push(addNewScaleImage);
                        if (series[0].type === seriesType_1.SeriesType.timeSeries && chart.chartType == chartManagerChart_1.ChartType.FFTChart) {
                            args.dragDropRepresentation.textList[0] = "Calculate FFT signal and add it to new scale";
                        }
                        else {
                            args.dragDropRepresentation.textList[0] = "Create a new scale and add dragged signals";
                        }
                    }
                }
            }
            else if (yAxis != undefined) {
                if (yAxis.dropPossible == true) {
                    dropPossible = true;
                    if (args.dragDropRepresentation != undefined) {
                        var addNewScaleImage = void 0;
                        //XY chart exception
                        if (yAxis.parent.chartType == chartManagerChart_1.ChartType.XYChart) {
                            addNewScaleImage = imageProvider.getImage("../app/widgets/common/style/images/dragDrop/assignToChart.svg");
                            if (series[0].type == seriesType_1.SeriesType.timeSeries) {
                                args.dragDropRepresentation.textList[0] = "Calculate XY signal and add it to the chart";
                            }
                            else {
                                args.dragDropRepresentation.textList[0] = "Add dragged signals to chart";
                            }
                        }
                        else if (yAxis.parent.chartType == chartManagerChart_1.ChartType.FFTChart) {
                            addNewScaleImage = imageProvider.getImage("../app/widgets/common/style/images/dragDrop/assignToScale.svg");
                            args.dragDropRepresentation.textList[0] = "Calculate FFT signal and add it to scale";
                        }
                        else {
                            addNewScaleImage = imageProvider.getImage("../app/widgets/common/style/images/dragDrop/assignToScale.svg");
                            args.dragDropRepresentation.textList[0] = "Add dragged signals to scale";
                        }
                        args.dragDropRepresentation.iconList.push(addNewScaleImage);
                    }
                }
            }
            this.highlightDroppableAreas(chart, yAxis, args.currentTarget);
            return dropPossible;
        };
        ChartManagerWidget.prototype.drop = function (args) {
            var series = args.data;
            var chart = this.getChartFromDragLocation(args.currentTarget);
            var yAxis = this.getYAxisFromDragLocation(args.currentTarget);
            if (yAxis != undefined) {
                chart = yAxis.parent;
            }
            series = SerieChartTypeHelper_1.SerieChartTypeHelper.getDroppableSeries(chart.getAllSeries(), series);
            var data = {
                chart: chart,
                yAxis: yAxis,
                series: series
            };
            //raise event to traceViewWidget
            if (series[0].type == seriesType_1.SeriesType.timeSeries && chart.chartType == chartManagerChart_1.ChartType.XYChart) {
                this.eventDropHelper.raise(this.dataModel, { hint: chartDropHelper_1.ChartDropHelperChangedHint.createXYSerie, data: data });
            }
            else if (series[0].type == seriesType_1.SeriesType.timeSeries && chart.chartType == chartManagerChart_1.ChartType.FFTChart) {
                this.eventDropHelper.raise(this.dataModel, { hint: chartDropHelper_1.ChartDropHelperChangedHint.createFFTSerie, data: data });
            }
            else {
                this.eventDropHelper.raise(this.dataModel, { hint: chartDropHelper_1.ChartDropHelperChangedHint.addSerie, data: data });
            }
            this.resetHighlightArea();
        };
        ChartManagerWidget.prototype.getChartFromDragLocation = function (currentTarget) {
            var classes = currentTarget.classList.value;
            //avoid dropping serie in not highlighted area
            if (!classes.includes('e-templatecell') && classes.includes('e-rowcell') || classes.includes('e-headercell') || currentTarget.localName == 'span') {
                return undefined;
            }
            var record = this.getTreeRecord(currentTarget);
            if (record != undefined) {
                if (record.item instanceof chartManagerChart_1.ChartManagerChart) {
                    return record.item;
                }
            }
            return undefined;
        };
        ChartManagerWidget.prototype.getYAxisFromDragLocation = function (currentTarget) {
            var classes = currentTarget.classList.value;
            //avoid dropping serie in not highlighted area
            if (!classes.includes('e-templatecell') && classes.includes('e-rowcell')) {
                return undefined;
            }
            var record = this.getTreeRecord(currentTarget);
            if (record != undefined) {
                if (record.item instanceof scale_1.Scale) {
                    return record.item;
                }
            }
            return undefined;
        };
        /**
         * Returns the column template informations
         *
         * @private
         * @returns {string}
         * @memberof ChartManagerWidget
         */
        ChartManagerWidget.prototype.getColumnTemplateData = function (columnId) {
            if (columnId == ChartManagerWidget.nameColumnId) {
                return "<script type=\"text/x-jsrender\" id=\"cmNameColumnTemplate\">\n\t\t\t            <div style='height:20px;' unselectable='on'>\n                            {{if !~getstate()}}\n                                <div class='e-dragintend' style='height:1px; float:left; width:14px; display:inline-block;'>\n                                    <div class={{:~_stageName()}} style='width:24px;'>\n                                        <span class='e-aboveIcon e-iconMargin e-icon' style='position:relative;float:right;display:none;'></span>\n                                        <span class='e-belowIcon e-iconMargin e-icon' style='position:relative;float:right;display:none;'></span>\n                                        <span class='e-childIcon e-iconMargin e-icon' style='position:relative;float:right;display:none;'></span>\n                                        <span class='e-cancelIcon e-iconMargin e-icon' style='position:relative;float:right;display:none;'></span>\n                                    </div>\n                                </div>\n                            {{else ~getstate()}}\n                                <div class='e-intendparent'>\n                                    <div class={{:~_stageName()}}>\n                                        <span class='e-aboveIcon e-iconMargin e-icon' style='position:relative;float:left;display:none;'></span>\n                                        <span class='e-belowIcon e-iconMargin e-icon' style='position:relative;float:left;display:none;'></span>\n                                        <span class='e-childIcon e-iconMargin e-icon' style='position:relative;float:left;display:none;'></span>\n                                        <span class='e-cancelIcon e-iconMargin e-icon' style='position:relative;float:left;display:none;'></span>\n                                    </div>\n                                </div>\n                            {{/if}}\n   \n                            {{:#data['iconDefinition']}}\n                            <div class='e-cell' style='display:inline-block;width:100%' unselectable='on'>{{:#data['name']}}</div>\n\t\t\t            </div>\n                    </script>";
            }
            return "";
        };
        ChartManagerWidget.prototype.getScriptForDragDropTemplateHelpers = function () {
            return "<script type=\"text/javascript\">\n                    $.views.helpers({ _stageName: getStageName });\n                    $.views.helpers({ getstate: _getState });\n                    $.views.helpers({ isGroup: _isGroup });\n                    \n                    function _getState() {\n                        if (this.data.parentItem)\n                            return false;\n                        else\n                            return true;\n                    }\n\n                    function _isGroup() {\n                        if (this.data.isGroup)\n                            return true;\n                        else\n                            return false;\n                    }\n\n                    function getStageName() {\n                        var rowClass = \"gridrowIndex\",\n                            proxy = this;\n                        rowClass += proxy.data.index.toString() + \"level\" + proxy.data.level.toString();\n                        return rowClass;\n\n                    }\n                </script>";
        };
        /**
         *
         *
         * @param {DragDropArgs} args
         * @memberof ChartManagerWidget
         */
        ChartManagerWidget.prototype.dropFocusLost = function (args) {
            this.resetHighlightArea();
        };
        ;
        /**
         * Highlight rows where signal is dragged over and possible to be dropped
         *
         * @private
         * @param {(IChartManagerChart | undefined)} chartManagerChart
         * @param {(Scale | undefined)} yAxis
         * @memberof ChartManagerWidget
         */
        ChartManagerWidget.prototype.highlightDroppableAreas = function (chartManagerChart, yAxis, currentTarget) {
            if (chartManagerChart != undefined && chartManagerChart.dropPossible) {
                var area = this.getAreaToFromCurrentTarget(currentTarget);
                this.addHighlightedArea(area);
            }
            else if (yAxis != undefined && yAxis.dropPossible) {
                var area = this.getAreaToFromCurrentTarget(currentTarget);
                this.addHighlightedArea(area);
            }
            else {
                this.resetHighlightArea();
            }
        };
        ChartManagerWidget.prototype.addHighlightedArea = function (area) {
            var highlightElem = $('<div id="' + this.highlightAreaId + '" style=" pointer-events:none; position:absolute; " class="draggedOver"></div>');
            this.resetHighlightArea(highlightElem);
            $(area).append(highlightElem);
            highlightElem.css('top', area.offsetTop);
            highlightElem.css('left', area.offsetLeft);
            highlightElem.css('height', area.offsetHeight);
            highlightElem.css('width', area.offsetWidth);
        };
        ChartManagerWidget.prototype.getAreaToFromCurrentTarget = function (currentTarget) {
            var classes = currentTarget.classList.value;
            if (classes.includes('e-rowcell')) {
                return currentTarget;
            }
            else {
                return this.getAreaToFromCurrentTarget(currentTarget.parentElement);
            }
        };
        /**
         * Reset all highlighted ares in chartManager except the cell being draggedOver
         *
         * @private
         * @param {JQuery<HTMLElement>} [element]
         * @memberof ChartManagerWidget
         */
        ChartManagerWidget.prototype.resetHighlightArea = function (element) {
            var highlightElem = $('#' + this.highlightAreaId);
            for (var i = 0; i < highlightElem.length; i++) {
                if (element == undefined || highlightElem[i] != element[0]) {
                    highlightElem[i].remove();
                }
            }
        };
        ChartManagerWidget.nameColumnId = "name";
        ChartManagerWidget.additionalInfoColumnId = "additionalInfo";
        ChartManagerWidget.iconDefinitionColumnId = "iconDefinition";
        return ChartManagerWidget;
    }(treeGridWidgetBase_1.TreeGridWidgetBase));
    exports.ChartManagerWidget = ChartManagerWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRNYW5hZ2VyV2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0TWFuYWdlcldpZGdldC9jaGFydE1hbmFnZXJXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBc0JBO1FBQWlDLHNDQUFrQjtRQUFuRDtZQUFBLHFFQXNwQkM7WUFwcEJHLHFCQUFlLEdBQW9CLElBQUksaUNBQWUsRUFBRSxDQUFDO1lBS3hDLHFCQUFlLEdBQUcsMEJBQTBCLENBQUM7O1lBOG9COUQsdUlBQXVJO1FBQzNJLENBQUM7UUEzb0JHOzs7OztXQUtHO1FBQ0gsdUNBQVUsR0FBVixVQUFXLGlCQUF5QjtZQUNoQyxpQkFBTSxVQUFVLFlBQUMsaUJBQWlCLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDNUMsQ0FBQztRQUVELGdEQUFtQixHQUFuQjtZQUNJLElBQUksQ0FBQyxTQUFTLENBQUMscUJBQXFCLEdBQUcsbURBQXdCLENBQUMsa0JBQWtCLENBQUM7UUFDdkYsQ0FBQztRQUVELG9DQUFPLEdBQVA7WUFDSSxJQUFJLENBQUMsNkJBQTZCLENBQUMsOEJBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMxRCxpQkFBTSxPQUFPLFdBQUUsQ0FBQztRQUNwQixDQUFDO1FBRUQ7Ozs7V0FJRztRQUNILHVDQUFVLEdBQVY7WUFDSSxpQkFBTSxVQUFVLFdBQUUsQ0FBQztZQUNuQixpQkFBTSxRQUFRLFlBQUMsZ0RBQWdELENBQUMsQ0FBQztRQUNyRSxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSCx3REFBMkIsR0FBM0I7WUFDSSxPQUFPLG1EQUF3QixDQUFDLCtCQUErQixFQUFFLENBQUM7UUFDdEUsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSCx5Q0FBWSxHQUFaO1lBQ0ksSUFBSSxnQkFBZ0IsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFD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LE1BQU0sQ0FBQztRQUN0Qix5Q0FBc0IsR0FBRyxnQkFBZ0IsQ0FBQztRQUMxQyx5Q0FBc0IsR0FBRyxnQkFBZ0IsQ0FBQztRQWdwQnRFLHlCQUFDO0tBQUEsQUF0cEJELENBQWlDLHVDQUFrQixHQXNwQmxEO0lBRVEsZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2xpYnMvdWkvVHlwZXMvZWoud2ViLmFsbC5kLnRzXCIgLz5cclxuaW1wb3J0IHsgRXZlbnRNb2RlbENoYW5nZWRBcmdzLCBJRGF0YU1vZGVsIH0gZnJvbSBcIi4uLy4uL21vZGVscy9kYXRhTW9kZWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVHJlZUdyaWRXaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi90cmVlR3JpZFdpZGdldEJhc2VcIjtcclxuaW1wb3J0IHsgQ2hhcnRNYW5hZ2VyVHJlZUdyaWRDZWxsU3R5bGUgfSBmcm9tIFwiLi92aWV3L2NoYXJ0TWFuYWdlclRyZWVHcmlkQ2VsbFN0eWxlXCI7XHJcbmltcG9ydCB7IENoYXJ0TWFuYWdlclRyZWVHcmlkRHJhZ0Ryb3AgfSBmcm9tIFwiLi92aWV3L2NoYXJ0TWFuYWdlclRyZWVHcmlkRHJhZ0Ryb3BcIjtcclxuaW1wb3J0IHsgQ2hhcnRNYW5hZ2VyVHJlZUdyaWRUb29sYmFyIH0gZnJvbSBcIi4vdmlldy9jaGFydE1hbmFnZXJUcmVlR3JpZFRvb2xiYXJcIjtcclxuaW1wb3J0IHsgQ2hhcnRNYW5hZ2VyQ2hhcnQsIENoYXJ0VHlwZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2NoYXJ0TWFuYWdlckNoYXJ0XCI7XHJcbmltcG9ydCB7IElDaGFydE1hbmFnZXJDaGFydCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2ludGVyZmFjZXMvY2hhcnRNYW5hZ2VyQ2hhcnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSURyb3BwYWJsZSwgRHJhZ0Ryb3BEYXRhSWQgfSBmcm9tIFwiLi4vY29tbW9uL2ludGVyZmFjZXMvZHJvcEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvYmFzZVNlcmllc1wiO1xyXG5pbXBvcnQgeyBTY2FsZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL3NjYWxlXCI7XHJcbmltcG9ydCB7IElDaGFydE1hbmFnZXJEYXRhTW9kZWwgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9pbnRlcmZhY2VzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDaGFydE1hbmFnZXJEYXRhTW9kZWxDaGFuZ2VkSGludCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2NoYXJ0TWFuYWdlckRhdGFNb2RlbFwiO1xyXG5pbXBvcnQgeyBEcmFnRHJvcEFyZ3MgfSBmcm9tIFwiLi4vY29tbW9uL2RyYWdEcm9wQXJnc1wiO1xyXG5pbXBvcnQgeyBFdmVudERyb3BIZWxwZXIgfSBmcm9tIFwiLi4vY2hhcnRWaWV3V2lkZ2V0L2NoYXJ0Vmlld1dpZGdldFwiO1xyXG5pbXBvcnQgeyBDaGFydERyb3BIZWxwZXJDaGFuZ2VkSGludCB9IGZyb20gXCIuLi9jaGFydFZpZXdXaWRnZXQvaGVscGVycy9jaGFydERyb3BIZWxwZXJcIjtcclxuaW1wb3J0IHsgU2VyaWVDaGFydFR5cGVIZWxwZXIgfSBmcm9tIFwiLi4vY29tbW9uL1NlcmllQ2hhcnRUeXBlSGVscGVyXCI7XHJcbmltcG9ydCB7IFNlcmllc1R5cGUgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9zZXJpZXNUeXBlXCI7XHJcbmltcG9ydCB7IERlZmF1bHRDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuL2RlZmF1bHRDb21wb25lbnRTZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnRTZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBJSW1hZ2VQcm92aWRlciB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy9pbWFnZVByb3ZpZGVySW50ZXJmYWNlXCI7XHJcblxyXG5jbGFzcyBDaGFydE1hbmFnZXJXaWRnZXQgZXh0ZW5kcyBUcmVlR3JpZFdpZGdldEJhc2UgaW1wbGVtZW50cyBJRHJvcHBhYmxlIHtcclxuXHJcbiAgICBldmVudERyb3BIZWxwZXI6IEV2ZW50RHJvcEhlbHBlciA9IG5ldyBFdmVudERyb3BIZWxwZXIoKTtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgbmFtZUNvbHVtbklkID0gXCJuYW1lXCI7XHJcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBhZGRpdGlvbmFsSW5mb0NvbHVtbklkID0gXCJhZGRpdGlvbmFsSW5mb1wiO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgaWNvbkRlZmluaXRpb25Db2x1bW5JZCA9IFwiaWNvbkRlZmluaXRpb25cIjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgaGlnaGxpZ2h0QXJlYUlkID0gXCJjaGFydE1hbmFnZXJfSGlnaGxpZ2h0ZWRcIjtcclxuXHJcbiAgICBwcml2YXRlIF90b29sYmFyITogQ2hhcnRNYW5hZ2VyVHJlZUdyaWRUb29sYmFyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6ZXMgdGhlIGNoYXJ0IG1hbmFnZXIgXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxheW91dENvbnRhaW5lcklkXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQ6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQsIDMwKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0aWFsaXplQ29tcG9uZW50KCl7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZGVmYXVsdFNldHRpbmdzRGF0YUlkID0gRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLldpZGdldERlZmluaXRpb25JZDtcclxuICAgIH1cclxuXHJcbiAgICBkaXNwb3NlKCkge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlU3VwcG9ydGVkRHJhZ0Ryb3BEYXRhSWQoRHJhZ0Ryb3BEYXRhSWQuc2lnbmFsKTtcclxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkcyB0aGUgc3R5bGVzIGZvciB0aGUgY2hhcnQgbWFuYWdlciB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGxvYWRTdHlsZXMoKSB7XHJcbiAgICAgICAgc3VwZXIubG9hZFN0eWxlcygpO1xyXG4gICAgICAgIHN1cGVyLmFkZFN0eWxlKFwid2lkZ2V0cy9jb21tb24vc3R5bGUvY3NzL2Ryb3BEb3duTWVudVN0eWxlLmNzc1wiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgY29tcG9uZW50IHNldHRpbmdzIGZvciB0aGlzIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsoQ29tcG9uZW50U2V0dGluZ3N8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgZ2V0RGVmYXVsdENvbXBvbmVudFNldHRpbmdzKCk6IENvbXBvbmVudFNldHRpbmdzfHVuZGVmaW5lZHtcclxuICAgICAgICByZXR1cm4gRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLmdldENoYXJ0TWFuYWdlcldpZGdldERlZmluaXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIGxheW91dCBvZiB0aGUgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBjcmVhdGVMYXlvdXQoKSB7XHJcbiAgICAgICAgdmFyICR3aWRnZXRDb250YWluZXIgPSAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKTtcclxuICAgICAgICAkd2lkZ2V0Q29udGFpbmVyWzBdLnN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIjtcclxuXHJcbiAgICAgICAgc3VwZXIuY3JlYXRlTGF5b3V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZWQoKXtcclxuICAgICAgICBzdXBlci5pbml0aWFsaXplZCgpO1xyXG5cclxuICAgICAgICB0aGlzLnNldENoYXJ0TWFuYWdlckRhdGFNb2RlbCgpO1xyXG4gICAgICAgIC8vIFJlY3JlYXRlIHRyZWVHcmlkIHRvIHVzZSB0aGUgbmV3IGRhdGFtb2RlbCBmb3IgdGhlIHRvb2xiYXIgaW4gdGhlIHRyZWVHcmlkXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoKHRoaXMuZGF0YU1vZGVsLmRhdGEsIHRydWUpO1xyXG5cclxuICAgICAgICBzdXBlci5zZXRIZWFkZXJDb250ZW50KFwiQ2hhcnRzXCIpO1xyXG5cclxuICAgICAgICAvLyBTZXQgZHluYW1pYyBjb2x1bW4gc2V0dGluZ3NcclxuICAgICAgICBzdXBlci5zZXREeW5hbWljQ29sdW1uKDAsIDgwKTtcclxuXHJcbiAgICAgICAgLy8gSGlkZSB0aGUgY29sdW1uIGhlYWRlciBvZiB0aGUgdHJlZSBncmlkXHJcbiAgICAgICAgLy9zdXBlci5zZXRDb2x1bW5IZWFkZXJIaWRkZW4oKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRTdXBwb3J0ZWREcmFnRHJvcERhdGFJZChEcmFnRHJvcERhdGFJZC5zaWduYWwpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldENoYXJ0TWFuYWdlckRhdGFNb2RlbCgpIHtcclxuICAgICAgICBsZXQgZGF0YU1vZGVsID0gdGhpcy5jb21wb25lbnQuZ2V0U3ViQ29tcG9uZW50KERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5DaGFydE1hbmFnZXJEYXRhTW9kZWxJZCk7XHJcbiAgICAgICAgdGhpcy5kYXRhTW9kZWwgPSBkYXRhTW9kZWwgYXMgSUNoYXJ0TWFuYWdlckRhdGFNb2RlbDtcclxuICAgIH1cclxuXHJcblx0cHVibGljIGdldENvbXBvbmVudFNldHRpbmdzKG9ubHlNb2RpZmllZDogYm9vbGVhbik6IENvbXBvbmVudFNldHRpbmdze1xyXG5cdFx0cmV0dXJuIHN1cGVyLmdldENvbXBvbmVudFNldHRpbmdzKG9ubHlNb2RpZmllZCk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0Q29tcG9uZW50U2V0dGluZ3MoZGF0YTogQ29tcG9uZW50U2V0dGluZ3MpIHtcclxuICAgICAgICBpZihkYXRhICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHN1cGVyLnNldENvbXBvbmVudFNldHRpbmdzKGRhdGEpO1xyXG4gICAgICAgIH1cclxuXHR9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGVzIHRoZSBtb2RlbCBjaGFuZ2VzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJRGF0YU1vZGVsfSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7RXZlbnRNb2RlbENoYW5nZWRBcmdzfSBldmVudEFyZ3NcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBoYW5kbGVNb2RlbENoYW5nZWQoc2VuZGVyOiBJRGF0YU1vZGVsLCBldmVudEFyZ3M6IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyk6IGFueSB7XHJcbiAgICAgICAgaWYgKGV2ZW50QXJncy5oaW50ICE9IENoYXJ0TWFuYWdlckRhdGFNb2RlbENoYW5nZWRIaW50LnVwZGF0ZVNjYWxlUmFuZ2UgJiYgZXZlbnRBcmdzLmhpbnQgIT0gQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsQ2hhbmdlZEhpbnQuZGVmYXVsdCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2goZXZlbnRBcmdzLmRhdGEuZGF0YSk7XHJcbiAgICAgICAgICAgIHZhciB0cmVlZ3JpZE9iaiA9IHRoaXMuZ2V0VHJlZUdyaWRPYmplY3QoKTtcclxuICAgICAgICAgICAgaWYgKCg8YW55PnRyZWVncmlkT2JqLm1vZGVsKS5zZWxlY3RlZFJvd0luZGV4ID09IC0xKSB7IC8vIFRPRE86IHNlbGVjdGVkSXRlbSAhPSB1bmRlZmluZWQgYnV0IHNlbGVjdGVkUm93SW5kZXggPT0gLTEgISEhXHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVRvb2xiYXJCdXR0b25TdGF0ZXMoZXZlbnRBcmdzLmRhdGEuZGF0YSwgdW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVG9vbGJhckJ1dHRvblN0YXRlcyhldmVudEFyZ3MuZGF0YS5kYXRhLCAoPGFueT50cmVlZ3JpZE9iai5tb2RlbCkuc2VsZWN0ZWRJdGVtLml0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2F2ZVRyZWVHcmlkU2V0dGluZ3MoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBjb2x1bW4gdGVtcGxhdGVzIGZvciB0aGUgdHJlZSBncmlkIGFuZCBhZGRzIHRoZW0gdG8gdGhlIHdpZGdldCBjb250YWluZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBjcmVhdGVDb2x1bW5UZW1wbGF0ZXMoKSB7XHJcbiAgICAgICAgdmFyICR3aWRnZXRDb250YWluZXIgPSAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKTtcclxuICAgICAgICAkd2lkZ2V0Q29udGFpbmVyLmFwcGVuZCh0aGlzLmdldFNjcmlwdEZvckRyYWdEcm9wVGVtcGxhdGVIZWxwZXJzKCkpO1xyXG4gICAgICAgICR3aWRnZXRDb250YWluZXIuYXBwZW5kKHRoaXMuZ2V0Q29sdW1uVGVtcGxhdGVEYXRhKENoYXJ0TWFuYWdlcldpZGdldC5uYW1lQ29sdW1uSWQpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZXMgdGhlIHRyZWUgZ3JpZCBmb3IgdGhlIGNoYXJ0bWFuYWdlclxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBjcmVhdGVUcmVlR3JpZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fZGF0YU1vZGVsID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmluZm8oXCJkYXRhTW9kZWwgdW5kZWZpbmVkIVwiKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBjZWxsU3R5bGUgPSBuZXcgQ2hhcnRNYW5hZ2VyVHJlZUdyaWRDZWxsU3R5bGUoKTtcclxuICAgICAgICAoPGFueT4kKHRoaXMuY3NzUGFyZW50Q29udGVudElkKSkuZWpUcmVlR3JpZCh7XHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCksXHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRDb2x1bW5SZXNpemVTdXBwb3J0KCksXHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRUb29sYmFyU3VwcG9ydCgpLFxyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkRHJhZ0Ryb3BTdXBwb3J0KCksXHJcblxyXG4gICAgICAgICAgICBkYXRhU291cmNlOiB0aGlzLl9kYXRhTW9kZWwuZGF0YSxcclxuICAgICAgICAgICAgY2hpbGRNYXBwaW5nOiBcImNoaWxkc1wiLFxyXG4gICAgICAgICAgICBpZE1hcHBpbmc6IENoYXJ0TWFuYWdlcldpZGdldC5uYW1lQ29sdW1uSWQsXHJcbiAgICAgICAgICAgIGV4cGFuZFN0YXRlTWFwcGluZzogXCJleHBhbmRTdGF0ZVwiLFxyXG4gICAgICAgICAgICBpc1Jlc3BvbnNpdmU6IHRydWUsXHJcbiAgICAgICAgICAgIHJvd0hlaWdodDogMjgsXHJcbiAgICAgICAgICAgIC8vIFNldCBpbml0IHNpemUgdG8gZHJhdyB0aGUgdG9vbGJhciBpY29ucyBhdCB0aGUgcmlnaHQgcG9zaXRpb25cclxuICAgICAgICAgICAgc2l6ZVNldHRpbmdzOiB7IGhlaWdodDogJzQwMHB4Jywgd2lkdGg6ICc0MDBweCcsIH0sXHJcblxyXG4gICAgICAgICAgICBleHBhbmRlZDogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWROb2RlRXhwYW5kZWRPckNvbGxhcHNlZCgpLFxyXG4gICAgICAgICAgICBjb2xsYXBzZWQ6IChhcmdzKSA9PiB0aGlzLnRyZWVHcmlkTm9kZUV4cGFuZGVkT3JDb2xsYXBzZWQoKSxcclxuXHJcbiAgICAgICAgICAgIHJvd1NlbGVjdGVkOiAoYXJncykgPT4gdGhpcy51cGRhdGVUb29sYmFyQnV0dG9uU3RhdGVzKGFyZ3MubW9kZWwuZGF0YVNvdXJjZSwgYXJncy5kYXRhLml0ZW0pLFxyXG4gICAgICAgICAgICBjcmVhdGU6IChhcmdzKSA9PiB0aGlzLnRyZWVHcmlkQ3JlYXRlZCgpLFxyXG4gICAgICAgICAgICBhY3Rpb25CZWdpbjogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWRBY3Rpb25CZWdpbihhcmdzKSxcclxuICAgICAgICAgICAgYWN0aW9uQ29tcGxldGU6IChhcmdzKSA9PiB0aGlzLnRyZWVHcmlkQWN0aW9uQ29tcGxldGUoYXJncyksXHJcbiAgICAgICAgICAgIHF1ZXJ5Q2VsbEluZm86IChhcmdzKSA9PiBjZWxsU3R5bGUuc2V0Q2VsbFN0eWxlKGFyZ3MpLFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0cmVlR3JpZE5vZGVFeHBhbmRlZE9yQ29sbGFwc2VkKCkge1xyXG4gICAgICAgIC8vIFJlZnJlc2ggdG8gc2VlIGNvcnJlY3QgZXhwYW5kZWQvY29sbGFwc2VkIGljb25cclxuICAgICAgICB0aGlzLnJlZnJlc2godGhpcy5kYXRhTW9kZWwuZGF0YSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9QZXJzaXN0IGRhdGEgbW9kZWwgKGV4cGFuZFN0YXRlKVxyXG4gICAgICAgIGlmICh0aGlzLl9kYXRhTW9kZWwgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAoPGFueT50aGlzLl9kYXRhTW9kZWwpLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL1BlcnNpdCBzY3JvbGxiYXIgcG9zaXRpb24gb2YgdHJlZUdyaWRcclxuICAgICAgICB0aGlzLnNhdmVUcmVlR3JpZFNldHRpbmdzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgY29sdW1uIGRlZmluaXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbigpOiB7fSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY29sdW1uczogW1xyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogQ2hhcnRNYW5hZ2VyV2lkZ2V0Lm5hbWVDb2x1bW5JZCwgaGVhZGVyVGV4dDogXCJOYW1lXCIsIGlzVGVtcGxhdGVDb2x1bW46IHRydWUsIHRlbXBsYXRlSUQ6IFwiY21OYW1lQ29sdW1uVGVtcGxhdGVcIiB9LFxyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogQ2hhcnRNYW5hZ2VyV2lkZ2V0LmFkZGl0aW9uYWxJbmZvQ29sdW1uSWQsIGhlYWRlclRleHQ6IFwiXCIsIHdpZHRoOiBcIjE0MHB4XCIgfSxcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IENoYXJ0TWFuYWdlcldpZGdldC5pY29uRGVmaW5pdGlvbkNvbHVtbklkLCB2aXNpYmxlOiBmYWxzZSwgd2lkdGg6IFwiMHB4XCIgfSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJlZSBncmlkIGNvbHVtbiByZXNpemUgc2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFRyZWVHcmlkQ29sdW1uUmVzaXplU3VwcG9ydCgpOiB7fSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYWxsb3dDb2x1bW5SZXNpemU6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbHVtblJlc2l6ZVNldHRpbmdzOiB7IGNvbHVtblJlc2l6ZU1vZGU6IGVqLlRyZWVHcmlkLkNvbHVtblJlc2l6ZU1vZGUuRml4ZWRDb2x1bW5zIH0sXHJcbiAgICAgICAgICAgIGNvbHVtblJlc2l6ZWQ6IChhcmdzKSA9PiB0aGlzLnRyZWVHcmlkQ29sdW1uUmVzaXplZChhcmdzKSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQSB0cmVlZ3JpZCBjb2x1bW4gd2FzIHJlc2l6ZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdHJlZUdyaWRDb2x1bW5SZXNpemVkKGFyZ3MpIHtcclxuICAgICAgICBzdXBlci5yZXNpemVEeW5hbWljQ29sdW1uKGFyZ3MuY29sdW1uSW5kZXgsIGFyZ3MubW9kZWwpO1xyXG4gICAgICAgIHRoaXMuc2F2ZVRyZWVHcmlkU2V0dGluZ3MoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCB0b29sYmFyIHNldHRpbmdzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmVlR3JpZFRvb2xiYXJTdXBwb3J0KCk6IHt9IHtcclxuICAgICAgICB0aGlzLl90b29sYmFyID0gbmV3IENoYXJ0TWFuYWdlclRyZWVHcmlkVG9vbGJhcih0aGlzLmNzc1BhcmVudENvbnRlbnRJZCwgdGhpcy5fZGF0YU1vZGVsIGFzIElDaGFydE1hbmFnZXJEYXRhTW9kZWwpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRvb2xiYXJTZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgc2hvd1Rvb2xiYXI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjdXN0b21Ub29sYmFySXRlbXM6IHRoaXMuX3Rvb2xiYXIuZ2V0Q3VzdG9tVG9vbGJhcnMoKSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdG9vbGJhckNsaWNrOiAoYXJncykgPT4gdGhpcy5fdG9vbGJhci50b29sYmFyQ2xpY2soYXJncyksXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFRyZWVHcmlkRHJhZ0Ryb3BTdXBwb3J0KCk6IHt9IHtcclxuICAgICAgICB2YXIgZHJhZ0Ryb3AgPSBuZXcgQ2hhcnRNYW5hZ2VyVHJlZUdyaWREcmFnRHJvcCgpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGFsbG93RHJhZ0FuZERyb3A6IHRydWUsXHJcbiAgICAgICAgICAgIHJvd0RyYWdTdGFydDogKGFyZ3MpID0+IGRyYWdEcm9wLnJvd0RyYWdTdGFydChhcmdzKSxcclxuICAgICAgICAgICAgcm93RHJhZzogKGFyZ3MpID0+IGRyYWdEcm9wLnJvd0RyYWcoYXJncyksXHJcbiAgICAgICAgICAgIHJvd0Ryb3BBY3Rpb25CZWdpbjogKGFyZ3MpID0+IGRyYWdEcm9wLnJvd0Ryb3BBY3Rpb25CZWdpbihhcmdzLCB0aGlzLl9kYXRhTW9kZWwgYXMgSUNoYXJ0TWFuYWdlckRhdGFNb2RlbCksXHJcbiAgICAgICAgICAgIHJvd0RyYWdTdG9wOiAoYXJncykgPT4gZHJhZ0Ryb3Aucm93RHJhZ1N0b3AoYXJncywgdGhpcy5fZGF0YU1vZGVsIGFzIElDaGFydE1hbmFnZXJEYXRhTW9kZWwpLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0cmVlR3JpZENyZWF0ZWQoKSB7XHJcbiAgICAgICAgLy8gU2V0cyB0aGUgY3VzdG9tIHRvb2xiYXIgaWNvbnNcclxuICAgICAgICB0aGlzLl90b29sYmFyLnNldFN0eWxlRm9yVG9vbGJhckljb25zKCk7XHJcblxyXG4gICAgICAgIC8vIEF0IHRoZSBiZWdpbm5pbmcgdGhlIGRlbGV0ZSBidXR0b24gaXMgZGlzYWJsZWQgYmVjYXVzZSBubyBzZWxlY3Rpb24gaXMgYXZhaWxhYmxlXHJcbiAgICAgICAgdGhpcy5fdG9vbGJhci5kaXNhYmxlRGVsZXRlQnV0dG9uKHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdHJlZUdyaWRBY3Rpb25CZWdpbihhcmdzKSB7XHJcbiAgICAgICAgLy8gU3VwcG9ydCBcIkVudGYvRGVsXCIga2V5XHJcbiAgICAgICAgaWYgKGFyZ3MucmVxdWVzdFR5cGUgPT0gXCJkZWxldGVcIikge1xyXG4gICAgICAgICAgICBhcmdzLmNhbmNlbCA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChhcmdzLmRlbGV0ZWRJdGVtc1swXS5pdGVtIGluc3RhbmNlb2YgQ2hhcnRNYW5hZ2VyQ2hhcnQpIHtcclxuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBjaGFydCBmcm9tIGRhdGFtb2RlbFxyXG4gICAgICAgICAgICAgICAgKDxhbnk+dGhpcy5fZGF0YU1vZGVsKSEucmVtb3ZlQ2hhcnQoYXJncy5kZWxldGVkSXRlbXNbMF0uaXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoYXJncy5kZWxldGVkSXRlbXNbMF0uaXRlbSBpbnN0YW5jZW9mIEJhc2VTZXJpZXMpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjaGFydDogSUNoYXJ0TWFuYWdlckNoYXJ0IHwgdW5kZWZpbmVkID0gYXJncy5kZWxldGVkSXRlbXNbMF0ucGFyZW50SXRlbS5wYXJlbnRJdGVtLml0ZW07XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hhcnQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHNlcmllIGZyb20gZGF0YW1vZGVsXHJcbiAgICAgICAgICAgICAgICAgICAgKDxhbnk+dGhpcy5fZGF0YU1vZGVsKSEucmVtb3ZlU2VyaWUoY2hhcnQsIGFyZ3MuZGVsZXRlZEl0ZW1zWzBdLml0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGFyZ3MuZGVsZXRlZEl0ZW1zWzBdLml0ZW0gaW5zdGFuY2VvZiBTY2FsZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoYXJ0OiBJQ2hhcnRNYW5hZ2VyQ2hhcnQgfCB1bmRlZmluZWQgPSBhcmdzLmRlbGV0ZWRJdGVtc1swXS5wYXJlbnRJdGVtLml0ZW07XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hhcnQgIT0gdW5kZWZpbmVkICYmIGNoYXJ0LmNhblJlbW92ZVlBeGlzKCkgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFJlbW92ZSB5QXhpcyBmcm9tIGRhdGFtb2RlbFxyXG4gICAgICAgICAgICAgICAgICAgICg8YW55PnRoaXMuX2RhdGFNb2RlbCkhLnJlbW92ZVlBeGlzKGNoYXJ0LCBhcmdzLmRlbGV0ZWRJdGVtc1swXS5pdGVtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRyZWVHcmlkQWN0aW9uQ29tcGxldGUoYXJncykge1xyXG4gICAgICAgIC8vIEV2ZW50IHRyaWdnZXIgd2hpbGUgY2hhbmdpbmcgZGF0YXNvdXJjZSBkeW5hbWljYWxseS4gXHJcbiAgICAgICAgLy8gY29kZSB0byBkb25lIGFmdGVyIHRoZSBkeW5hbWljIGNoYW5nZSBvZiBkYXRhc291cmNlLiBcclxuICAgICAgICBpZiAoYXJncy5yZXF1ZXN0VHlwZSA9PT0gJ3JlZnJlc2hEYXRhU291cmNlJykge1xyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hTZWxlY3Rpb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWZyZXNoKGRhdGE6IElDaGFydE1hbmFnZXJEYXRhTW9kZWwsIHJlY3JlYXRlOiBib29sZWFuPSBmYWxzZSkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmKHJlY3JlYXRlID09IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgLy9UbyBhdm9pZCBwcm9ibGVtcyB3aXRoIHRoZSB0b29sYmFyLCB0cmVlZ3JpZCBuZWVkcyB0byBiZSBkZXN0cm95ZWQgaWYgd2UgYXJlIGNyZWF0aW5nIGl0IGFnYWluXHJcbiAgICAgICAgICAgICAgICBsZXQgdHJlZWdyaWRPYmogPSB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICB0cmVlZ3JpZE9iai5kZXN0cm95KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVUcmVlR3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgLy8gU2V0IGNvbHVtbiBzaXplcyBhZnRlciB0cmVlZ3JpZCByZWNyZWF0aW9uID0+IFRPRE86IG11c3QgYmUgc29sdmVkIGluIGFuIG90aGVyIHdheSA9PiBubyByZWNyZWF0aW9uIGZvciB0b29sYmFyIHVwZGF0ZSwgaWYgcG9zc2libGVcclxuICAgICAgICAgICAgICAgIGxldCBjb2x1bW5TZXR0aW5ncyA9IHRoaXMuY29tcG9uZW50LmdldFNldHRpbmcoVHJlZUdyaWRXaWRnZXRCYXNlLkNvbHVtbnNTZXR0aW5nSWQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRDb2x1bW5TZXR0aW5ncyhjb2x1bW5TZXR0aW5ncyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHNjcm9sbGJhclNldHRpbmdzID0gdGhpcy5jb21wb25lbnQuZ2V0U2V0dGluZyhUcmVlR3JpZFdpZGdldEJhc2UuU2Nyb2xsYmFyc1NldHRpbmdzSWQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTY3JvbGxCYXJTZXR0aW5ncyhzY3JvbGxiYXJTZXR0aW5ncyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0TW9kZWwoZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhcIkNoYXJ0TWFuYWdlciByZWZyZXNoIGVycm9yISA9PiBUcmVlR3JpZCByZWNyZWF0aW9uIVwiKTtcclxuICAgICAgICAgICAgY29uc29sZS5pbmZvKGUpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVUcmVlR3JpZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlZnJlc2hTZWxlY3Rpb24oKSB7XHJcbiAgICAgICAgY29uc3QgdHJlZU9iaiA9ICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpLmVqVHJlZUdyaWQoJ2luc3RhbmNlJyk7XHJcblxyXG4gICAgICAgIC8vIEdldCBhY3R1YWwgc2VsZWN0aW9uIGluZGV4XHJcbiAgICAgICAgbGV0IGFjdHVhbFNlbGVjdGVkUm93SW5kZXggPSB0cmVlT2JqLm1vZGVsLnNlbGVjdGVkUm93SW5kZXg7XHJcbiAgICAgICAgLy8gUmVzZXQgc2VsZWN0aW9uXHJcbiAgICAgICAgdHJlZU9iai5tb2RlbC5zZWxlY3RlZFJvd0luZGV4ID0gLTE7XHJcblxyXG4gICAgICAgIC8vIFNldCB0byBsYXN0IGluZGV4IGlmIGluZGV4IGlzIG91dCBvZiByYW5nZVxyXG4gICAgICAgIGlmIChhY3R1YWxTZWxlY3RlZFJvd0luZGV4ID49IHRyZWVPYmoubW9kZWwuZmxhdFJlY29yZHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGFjdHVhbFNlbGVjdGVkUm93SW5kZXggPSB0cmVlT2JqLm1vZGVsLmZsYXRSZWNvcmRzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFNldCBzZWxlY3Rpb25cclxuICAgICAgICB0cmVlT2JqLm1vZGVsLnNlbGVjdGVkUm93SW5kZXggPSBhY3R1YWxTZWxlY3RlZFJvd0luZGV4O1xyXG5cclxuICAgICAgICAvLyB1cGRhdGUgdG9vbGJhciBidXR0b25zXHJcbiAgICAgICAgaWYgKHRyZWVPYmoubW9kZWwuZmxhdFJlY29yZHNbYWN0dWFsU2VsZWN0ZWRSb3dJbmRleF0gIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVG9vbGJhckJ1dHRvblN0YXRlcyh0cmVlT2JqLm1vZGVsLmRhdGFTb3VyY2UsIHRyZWVPYmoubW9kZWwuZmxhdFJlY29yZHNbYWN0dWFsU2VsZWN0ZWRSb3dJbmRleF0uaXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlVG9vbGJhckJ1dHRvblN0YXRlcyhjaGFydHM6IEFycmF5PElDaGFydE1hbmFnZXJDaGFydD4sIHNlbGVjdGVkSXRlbSkge1xyXG4gICAgICAgIGlmIChjaGFydHMubGVuZ3RoID09IDAgfHwgc2VsZWN0ZWRJdGVtID09IHVuZGVmaW5lZCB8fCAoc2VsZWN0ZWRJdGVtIGluc3RhbmNlb2YgU2NhbGUgJiYgc2VsZWN0ZWRJdGVtLnBhcmVudC5jYW5SZW1vdmVZQXhpcygpID09IGZhbHNlKSkge1xyXG4gICAgICAgICAgICB0aGlzLl90b29sYmFyLmRpc2FibGVEZWxldGVCdXR0b24odHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl90b29sYmFyLmRpc2FibGVEZWxldGVCdXR0b24oZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoKDxhbnk+dGhpcy5fZGF0YU1vZGVsKS5jYW5BZGRDaGFydCgpIHx8IChzZWxlY3RlZEl0ZW0gaW5zdGFuY2VvZiBDaGFydE1hbmFnZXJDaGFydCAmJiBzZWxlY3RlZEl0ZW0uY2FuQWRkWUF4aXMoKSkpIHtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbGJhci5kaXNhYmxlQWRkQnV0dG9uKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2xiYXIuZGlzYWJsZUFkZEJ1dHRvbih0cnVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3Rvb2xiYXIuc2V0U2VsZWN0ZWRDaGFydChzZWxlY3RlZEl0ZW0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlJlZ2lvbiBkcm9wIHN1cHBvcnQqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGFsbCBwb3NzaWJsZSBkcm9wTG9jYXRpb25zXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8QmFzZVNlcmllcz59IHNlcmllc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZERyb3BMb2NhdGlvbnMoc2VyaWVzOiBBcnJheTxCYXNlU2VyaWVzPikge1xyXG4gICAgICAgIC8vIEFkZCBwb3NzaWJsZSBkcm9wIGxvY2F0aW9uc1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgYWxsIGRyb3AgbG9jYXRpb25zXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8QmFzZVNlcmllcz59IHNlcmllc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlbW92ZURyb3BMb2NhdGlvbnMoc2VyaWVzOiBBcnJheTxCYXNlU2VyaWVzPikge1xyXG4gICAgICAgIHRoaXMuX2RhdGFNb2RlbC5kYXRhLmZvckVhY2goY2hhcnQgPT4ge1xyXG4gICAgICAgICAgICBjaGFydC5kcm9wUG9zc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgY2hhcnQuY2hpbGRzLmZvckVhY2goeUF4aXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgeUF4aXMuZHJvcFBvc3NpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhZ1N0YXJ0KGFyZ3M6IERyYWdEcm9wQXJncykge1xyXG4gICAgICAgIGxldCBzZXJpZSA9IGFyZ3MuZGF0YSBhcyBBcnJheTxCYXNlU2VyaWVzPjtcclxuXHJcbiAgICAgICAgLy8gQWRkIHBvc3NpYmxlIGRyb3BMb2NhdGlvbnNcclxuICAgICAgICB0aGlzLmFkZERyb3BMb2NhdGlvbnMoc2VyaWUpO1xyXG5cclxuICAgICAgICAvLyBVcGRhdGUgdHJlZUdyaWRcclxuICAgICAgICB0aGlzLnJlZnJlc2godGhpcy5fZGF0YU1vZGVsLmRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYWdTdG9wKGFyZ3M6IERyYWdEcm9wQXJncykge1xyXG4gICAgICAgIGxldCBzZXJpZSA9IGFyZ3MuZGF0YSBhcyBBcnJheTxCYXNlU2VyaWVzPjtcclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIHBvc3NpYmxlIGRyb3BMb2NhdGlvbnNcclxuICAgICAgICB0aGlzLnJlbW92ZURyb3BMb2NhdGlvbnMoc2VyaWUpO1xyXG5cclxuICAgICAgICAvLyBVcGRhdGUgdHJlZUdyaWRcclxuICAgICAgICB0aGlzLnJlZnJlc2godGhpcy5fZGF0YU1vZGVsLmRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYWdPdmVyKGFyZ3M6IERyYWdEcm9wQXJncyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBzZXJpZXMgPSBhcmdzLmRhdGEgYXMgQXJyYXk8QmFzZVNlcmllcz47XHJcblxyXG4gICAgICAgIGxldCBkcm9wUG9zc2libGUgPSBmYWxzZTtcclxuICAgICAgICBsZXQgY2hhcnQgPSB0aGlzLmdldENoYXJ0RnJvbURyYWdMb2NhdGlvbihhcmdzLmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgICAgIGxldCB5QXhpcyA9IHRoaXMuZ2V0WUF4aXNGcm9tRHJhZ0xvY2F0aW9uKGFyZ3MuY3VycmVudFRhcmdldCk7XHJcbiAgICAgICAgbGV0IGltYWdlUHJvdmlkZXIgPSB0aGlzLmNvbXBvbmVudC5nZXRTdWJDb21wb25lbnQoRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLkltYWdlUHJvdmlkZXJJZCkgYXMgSUltYWdlUHJvdmlkZXI7XHJcbiAgICAgICAgaWYgKGNoYXJ0ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBpZiAoY2hhcnQuZHJvcFBvc3NpYmxlID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGRyb3BQb3NzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJncy5kcmFnRHJvcFJlcHJlc2VudGF0aW9uICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBhZGROZXdTY2FsZUltYWdlID0gaW1hZ2VQcm92aWRlci5nZXRJbWFnZShcIi4uL2FwcC93aWRnZXRzL2NvbW1vbi9zdHlsZS9pbWFnZXMvZHJhZ0Ryb3AvYWRkTmV3U2NhbGUuc3ZnXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFyZ3MuZHJhZ0Ryb3BSZXByZXNlbnRhdGlvbi5pY29uTGlzdC5wdXNoKGFkZE5ld1NjYWxlSW1hZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlcmllc1swXS50eXBlID09PSBTZXJpZXNUeXBlLnRpbWVTZXJpZXMgJiYgY2hhcnQuY2hhcnRUeXBlID09IENoYXJ0VHlwZS5GRlRDaGFydCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5kcmFnRHJvcFJlcHJlc2VudGF0aW9uLnRleHRMaXN0WzBdID0gXCJDYWxjdWxhdGUgRkZUIHNpZ25hbCBhbmQgYWRkIGl0IHRvIG5ldyBzY2FsZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5kcmFnRHJvcFJlcHJlc2VudGF0aW9uLnRleHRMaXN0WzBdID0gXCJDcmVhdGUgYSBuZXcgc2NhbGUgYW5kIGFkZCBkcmFnZ2VkIHNpZ25hbHNcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoeUF4aXMgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGlmICh5QXhpcy5kcm9wUG9zc2libGUgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgZHJvcFBvc3NpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmIChhcmdzLmRyYWdEcm9wUmVwcmVzZW50YXRpb24gIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFkZE5ld1NjYWxlSW1hZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9YWSBjaGFydCBleGNlcHRpb25cclxuICAgICAgICAgICAgICAgICAgICBpZiAoeUF4aXMucGFyZW50LmNoYXJ0VHlwZSA9PSBDaGFydFR5cGUuWFlDaGFydCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZE5ld1NjYWxlSW1hZ2UgPSBpbWFnZVByb3ZpZGVyLmdldEltYWdlKFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9kcmFnRHJvcC9hc3NpZ25Ub0NoYXJ0LnN2Z1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VyaWVzWzBdLnR5cGUgPT0gU2VyaWVzVHlwZS50aW1lU2VyaWVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzLmRyYWdEcm9wUmVwcmVzZW50YXRpb24udGV4dExpc3RbMF0gPSBcIkNhbGN1bGF0ZSBYWSBzaWduYWwgYW5kIGFkZCBpdCB0byB0aGUgY2hhcnRcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MuZHJhZ0Ryb3BSZXByZXNlbnRhdGlvbi50ZXh0TGlzdFswXSA9IFwiQWRkIGRyYWdnZWQgc2lnbmFscyB0byBjaGFydFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoeUF4aXMucGFyZW50LmNoYXJ0VHlwZSA9PSBDaGFydFR5cGUuRkZUQ2hhcnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkTmV3U2NhbGVJbWFnZSA9IGltYWdlUHJvdmlkZXIuZ2V0SW1hZ2UoXCIuLi9hcHAvd2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL2RyYWdEcm9wL2Fzc2lnblRvU2NhbGUuc3ZnXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLmRyYWdEcm9wUmVwcmVzZW50YXRpb24udGV4dExpc3RbMF0gPSBcIkNhbGN1bGF0ZSBGRlQgc2lnbmFsIGFuZCBhZGQgaXQgdG8gc2NhbGVcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZE5ld1NjYWxlSW1hZ2UgPSBpbWFnZVByb3ZpZGVyLmdldEltYWdlKFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9kcmFnRHJvcC9hc3NpZ25Ub1NjYWxlLnN2Z1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5kcmFnRHJvcFJlcHJlc2VudGF0aW9uLnRleHRMaXN0WzBdID0gXCJBZGQgZHJhZ2dlZCBzaWduYWxzIHRvIHNjYWxlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGFyZ3MuZHJhZ0Ryb3BSZXByZXNlbnRhdGlvbi5pY29uTGlzdC5wdXNoKGFkZE5ld1NjYWxlSW1hZ2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0RHJvcHBhYmxlQXJlYXMoY2hhcnQsIHlBeGlzLCBhcmdzLmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgICAgIHJldHVybiBkcm9wUG9zc2libGU7XHJcbiAgICB9XHJcblxyXG4gICAgZHJvcChhcmdzOiBEcmFnRHJvcEFyZ3MpIHtcclxuICAgICAgICBsZXQgc2VyaWVzID0gYXJncy5kYXRhIGFzIEFycmF5PEJhc2VTZXJpZXM+O1xyXG5cclxuICAgICAgICBsZXQgY2hhcnQgPSB0aGlzLmdldENoYXJ0RnJvbURyYWdMb2NhdGlvbihhcmdzLmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgICAgIGxldCB5QXhpcyA9IHRoaXMuZ2V0WUF4aXNGcm9tRHJhZ0xvY2F0aW9uKGFyZ3MuY3VycmVudFRhcmdldCk7XHJcblxyXG4gICAgICAgIGlmICh5QXhpcyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgY2hhcnQgPSB5QXhpcy5wYXJlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlcmllcyA9IFNlcmllQ2hhcnRUeXBlSGVscGVyLmdldERyb3BwYWJsZVNlcmllcyhjaGFydCEuZ2V0QWxsU2VyaWVzKCksc2VyaWVzKTtcclxuXHJcbiAgICAgICAgbGV0IGRhdGEgPSB7XHJcbiAgICAgICAgICAgIGNoYXJ0OiBjaGFydCxcclxuICAgICAgICAgICAgeUF4aXM6IHlBeGlzLFxyXG4gICAgICAgICAgICBzZXJpZXM6IHNlcmllc1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9yYWlzZSBldmVudCB0byB0cmFjZVZpZXdXaWRnZXRcclxuICAgICAgICBpZiAoc2VyaWVzWzBdLnR5cGUgPT0gU2VyaWVzVHlwZS50aW1lU2VyaWVzICYmIGNoYXJ0IS5jaGFydFR5cGUgPT0gQ2hhcnRUeXBlLlhZQ2hhcnQpIHtcclxuICAgICAgICAgICAgdGhpcy5ldmVudERyb3BIZWxwZXIucmFpc2UodGhpcy5kYXRhTW9kZWwsIHtoaW50OiBDaGFydERyb3BIZWxwZXJDaGFuZ2VkSGludC5jcmVhdGVYWVNlcmllLCBkYXRhOiBkYXRhIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChzZXJpZXNbMF0udHlwZSA9PSBTZXJpZXNUeXBlLnRpbWVTZXJpZXMgJiYgY2hhcnQhLmNoYXJ0VHlwZSA9PSBDaGFydFR5cGUuRkZUQ2hhcnQpe1xyXG4gICAgICAgICAgICB0aGlzLmV2ZW50RHJvcEhlbHBlci5yYWlzZSh0aGlzLmRhdGFNb2RlbCwge2hpbnQ6IENoYXJ0RHJvcEhlbHBlckNoYW5nZWRIaW50LmNyZWF0ZUZGVFNlcmllLCBkYXRhOiBkYXRhIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5ldmVudERyb3BIZWxwZXIucmFpc2UodGhpcy5kYXRhTW9kZWwsIHtoaW50OiBDaGFydERyb3BIZWxwZXJDaGFuZ2VkSGludC5hZGRTZXJpZSwgZGF0YTogZGF0YSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZXNldEhpZ2hsaWdodEFyZWEoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldENoYXJ0RnJvbURyYWdMb2NhdGlvbihjdXJyZW50VGFyZ2V0KTogSUNoYXJ0TWFuYWdlckNoYXJ0IHwgdW5kZWZpbmVkIHtcclxuICAgICAgICBsZXQgY2xhc3NlcyA9IGN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LnZhbHVlO1xyXG4gICAgICAgIC8vYXZvaWQgZHJvcHBpbmcgc2VyaWUgaW4gbm90IGhpZ2hsaWdodGVkIGFyZWFcclxuICAgICAgICBpZiAoIWNsYXNzZXMuaW5jbHVkZXMoJ2UtdGVtcGxhdGVjZWxsJykgJiYgY2xhc3Nlcy5pbmNsdWRlcygnZS1yb3djZWxsJykgfHwgY2xhc3Nlcy5pbmNsdWRlcygnZS1oZWFkZXJjZWxsJykgfHwgY3VycmVudFRhcmdldC5sb2NhbE5hbWUgPT0gJ3NwYW4nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcmVjb3JkID0gdGhpcy5nZXRUcmVlUmVjb3JkKGN1cnJlbnRUYXJnZXQpO1xyXG4gICAgICAgIGlmIChyZWNvcmQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGlmIChyZWNvcmQuaXRlbSBpbnN0YW5jZW9mIENoYXJ0TWFuYWdlckNoYXJ0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVjb3JkLml0ZW07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFlBeGlzRnJvbURyYWdMb2NhdGlvbihjdXJyZW50VGFyZ2V0KTogU2NhbGUgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGxldCBjbGFzc2VzID0gY3VycmVudFRhcmdldC5jbGFzc0xpc3QudmFsdWU7XHJcbiAgICAgICAgLy9hdm9pZCBkcm9wcGluZyBzZXJpZSBpbiBub3QgaGlnaGxpZ2h0ZWQgYXJlYVxyXG4gICAgICAgIGlmICghY2xhc3Nlcy5pbmNsdWRlcygnZS10ZW1wbGF0ZWNlbGwnKSAmJiBjbGFzc2VzLmluY2x1ZGVzKCdlLXJvd2NlbGwnKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHJlY29yZCA9IHRoaXMuZ2V0VHJlZVJlY29yZChjdXJyZW50VGFyZ2V0KTtcclxuICAgICAgICBpZiAocmVjb3JkICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBpZiAocmVjb3JkLml0ZW0gaW5zdGFuY2VvZiBTY2FsZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlY29yZC5pdGVtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcblx0ICogUmV0dXJucyB0aGUgY29sdW1uIHRlbXBsYXRlIGluZm9ybWF0aW9uc1xyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG5cdCAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuICAgIHByaXZhdGUgZ2V0Q29sdW1uVGVtcGxhdGVEYXRhKGNvbHVtbklkOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmIChjb2x1bW5JZCA9PSBDaGFydE1hbmFnZXJXaWRnZXQubmFtZUNvbHVtbklkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBgPHNjcmlwdCB0eXBlPVwidGV4dC94LWpzcmVuZGVyXCIgaWQ9XCJjbU5hbWVDb2x1bW5UZW1wbGF0ZVwiPlxyXG5cdFx0XHQgICAgICAgICAgICA8ZGl2IHN0eWxlPSdoZWlnaHQ6MjBweDsnIHVuc2VsZWN0YWJsZT0nb24nPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3tpZiAhfmdldHN0YXRlKCl9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2UtZHJhZ2ludGVuZCcgc3R5bGU9J2hlaWdodDoxcHg7IGZsb2F0OmxlZnQ7IHdpZHRoOjE0cHg7IGRpc3BsYXk6aW5saW5lLWJsb2NrOyc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9e3s6fl9zdGFnZU5hbWUoKX19IHN0eWxlPSd3aWR0aDoyNHB4Oyc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz0nZS1hYm92ZUljb24gZS1pY29uTWFyZ2luIGUtaWNvbicgc3R5bGU9J3Bvc2l0aW9uOnJlbGF0aXZlO2Zsb2F0OnJpZ2h0O2Rpc3BsYXk6bm9uZTsnPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPSdlLWJlbG93SWNvbiBlLWljb25NYXJnaW4gZS1pY29uJyBzdHlsZT0ncG9zaXRpb246cmVsYXRpdmU7ZmxvYXQ6cmlnaHQ7ZGlzcGxheTpub25lOyc+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9J2UtY2hpbGRJY29uIGUtaWNvbk1hcmdpbiBlLWljb24nIHN0eWxlPSdwb3NpdGlvbjpyZWxhdGl2ZTtmbG9hdDpyaWdodDtkaXNwbGF5Om5vbmU7Jz48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz0nZS1jYW5jZWxJY29uIGUtaWNvbk1hcmdpbiBlLWljb24nIHN0eWxlPSdwb3NpdGlvbjpyZWxhdGl2ZTtmbG9hdDpyaWdodDtkaXNwbGF5Om5vbmU7Jz48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3tlbHNlIH5nZXRzdGF0ZSgpfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdlLWludGVuZHBhcmVudCc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9e3s6fl9zdGFnZU5hbWUoKX19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9J2UtYWJvdmVJY29uIGUtaWNvbk1hcmdpbiBlLWljb24nIHN0eWxlPSdwb3NpdGlvbjpyZWxhdGl2ZTtmbG9hdDpsZWZ0O2Rpc3BsYXk6bm9uZTsnPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPSdlLWJlbG93SWNvbiBlLWljb25NYXJnaW4gZS1pY29uJyBzdHlsZT0ncG9zaXRpb246cmVsYXRpdmU7ZmxvYXQ6bGVmdDtkaXNwbGF5Om5vbmU7Jz48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz0nZS1jaGlsZEljb24gZS1pY29uTWFyZ2luIGUtaWNvbicgc3R5bGU9J3Bvc2l0aW9uOnJlbGF0aXZlO2Zsb2F0OmxlZnQ7ZGlzcGxheTpub25lOyc+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9J2UtY2FuY2VsSWNvbiBlLWljb25NYXJnaW4gZS1pY29uJyBzdHlsZT0ncG9zaXRpb246cmVsYXRpdmU7ZmxvYXQ6bGVmdDtkaXNwbGF5Om5vbmU7Jz48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3svaWZ9fVxyXG4gICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7OiNkYXRhWydpY29uRGVmaW5pdGlvbiddfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2UtY2VsbCcgc3R5bGU9J2Rpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOjEwMCUnIHVuc2VsZWN0YWJsZT0nb24nPnt7OiNkYXRhWyduYW1lJ119fTwvZGl2PlxyXG5cdFx0XHQgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L3NjcmlwdD5gO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFNjcmlwdEZvckRyYWdEcm9wVGVtcGxhdGVIZWxwZXJzKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIGA8c2NyaXB0IHR5cGU9XCJ0ZXh0L2phdmFzY3JpcHRcIj5cclxuICAgICAgICAgICAgICAgICAgICAkLnZpZXdzLmhlbHBlcnMoeyBfc3RhZ2VOYW1lOiBnZXRTdGFnZU5hbWUgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJC52aWV3cy5oZWxwZXJzKHsgZ2V0c3RhdGU6IF9nZXRTdGF0ZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAkLnZpZXdzLmhlbHBlcnMoeyBpc0dyb3VwOiBfaXNHcm91cCB9KTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBfZ2V0U3RhdGUoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRhdGEucGFyZW50SXRlbSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBfaXNHcm91cCgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS5pc0dyb3VwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGdldFN0YWdlTmFtZSgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJvd0NsYXNzID0gXCJncmlkcm93SW5kZXhcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3h5ID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93Q2xhc3MgKz0gcHJveHkuZGF0YS5pbmRleC50b1N0cmluZygpICsgXCJsZXZlbFwiICsgcHJveHkuZGF0YS5sZXZlbC50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcm93Q2xhc3M7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIDwvc2NyaXB0PmA7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0RyYWdEcm9wQXJnc30gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZHJvcEZvY3VzTG9zdChhcmdzOiBEcmFnRHJvcEFyZ3MpIHtcclxuICAgICAgICB0aGlzLnJlc2V0SGlnaGxpZ2h0QXJlYSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhpZ2hsaWdodCByb3dzIHdoZXJlIHNpZ25hbCBpcyBkcmFnZ2VkIG92ZXIgYW5kIHBvc3NpYmxlIHRvIGJlIGRyb3BwZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsoSUNoYXJ0TWFuYWdlckNoYXJ0IHwgdW5kZWZpbmVkKX0gY2hhcnRNYW5hZ2VyQ2hhcnRcclxuICAgICAqIEBwYXJhbSB7KFNjYWxlIHwgdW5kZWZpbmVkKX0geUF4aXNcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBoaWdobGlnaHREcm9wcGFibGVBcmVhcyhjaGFydE1hbmFnZXJDaGFydDogSUNoYXJ0TWFuYWdlckNoYXJ0IHwgdW5kZWZpbmVkLCB5QXhpczogU2NhbGUgfCB1bmRlZmluZWQsIGN1cnJlbnRUYXJnZXQpe1xyXG4gICAgICAgIGlmIChjaGFydE1hbmFnZXJDaGFydCAhPSB1bmRlZmluZWQgJiYgY2hhcnRNYW5hZ2VyQ2hhcnQuZHJvcFBvc3NpYmxlKSB7XHJcbiAgICAgICAgICAgIGxldCBhcmVhID0gdGhpcy5nZXRBcmVhVG9Gcm9tQ3VycmVudFRhcmdldChjdXJyZW50VGFyZ2V0KTtcclxuICAgICAgICAgICAgdGhpcy5hZGRIaWdobGlnaHRlZEFyZWEoYXJlYSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHlBeGlzICE9IHVuZGVmaW5lZCAmJiB5QXhpcy5kcm9wUG9zc2libGUpIHtcclxuICAgICAgICAgICAgbGV0IGFyZWEgPSB0aGlzLmdldEFyZWFUb0Zyb21DdXJyZW50VGFyZ2V0KGN1cnJlbnRUYXJnZXQpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZEhpZ2hsaWdodGVkQXJlYShhcmVhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5yZXNldEhpZ2hsaWdodEFyZWEoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhZGRIaWdobGlnaHRlZEFyZWEoYXJlYSkge1xyXG5cdFx0bGV0IGhpZ2hsaWdodEVsZW0gPSAkKCc8ZGl2IGlkPVwiJysgdGhpcy5oaWdobGlnaHRBcmVhSWQgKydcIiBzdHlsZT1cIiBwb2ludGVyLWV2ZW50czpub25lOyBwb3NpdGlvbjphYnNvbHV0ZTsgXCIgY2xhc3M9XCJkcmFnZ2VkT3ZlclwiPjwvZGl2PicpO1xyXG5cdFx0dGhpcy5yZXNldEhpZ2hsaWdodEFyZWEoaGlnaGxpZ2h0RWxlbSk7XHJcblx0XHQkKGFyZWEpLmFwcGVuZChoaWdobGlnaHRFbGVtKTtcclxuXHJcblx0XHRoaWdobGlnaHRFbGVtLmNzcygndG9wJywgYXJlYS5vZmZzZXRUb3ApO1xyXG5cdFx0aGlnaGxpZ2h0RWxlbS5jc3MoJ2xlZnQnLCBhcmVhLm9mZnNldExlZnQpO1xyXG5cdFx0aGlnaGxpZ2h0RWxlbS5jc3MoJ2hlaWdodCcsIGFyZWEub2Zmc2V0SGVpZ2h0KTtcclxuXHRcdGhpZ2hsaWdodEVsZW0uY3NzKCd3aWR0aCcsIGFyZWEub2Zmc2V0V2lkdGgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0QXJlYVRvRnJvbUN1cnJlbnRUYXJnZXQoY3VycmVudFRhcmdldCkge1xyXG4gICAgICAgIGxldCBjbGFzc2VzID0gY3VycmVudFRhcmdldC5jbGFzc0xpc3QudmFsdWU7XHJcbiAgICAgICAgaWYgKGNsYXNzZXMuaW5jbHVkZXMoJ2Utcm93Y2VsbCcpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50VGFyZ2V0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXJlYVRvRnJvbUN1cnJlbnRUYXJnZXQoY3VycmVudFRhcmdldC5wYXJlbnRFbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNldCBhbGwgaGlnaGxpZ2h0ZWQgYXJlcyBpbiBjaGFydE1hbmFnZXIgZXhjZXB0IHRoZSBjZWxsIGJlaW5nIGRyYWdnZWRPdmVyXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SlF1ZXJ5PEhUTUxFbGVtZW50Pn0gW2VsZW1lbnRdXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVzZXRIaWdobGlnaHRBcmVhIChlbGVtZW50PzogSlF1ZXJ5PEhUTUxFbGVtZW50Pikge1xyXG5cdFx0bGV0IGhpZ2hsaWdodEVsZW0gPSAkKCcjJyArIHRoaXMuaGlnaGxpZ2h0QXJlYUlkKTtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaGlnaGxpZ2h0RWxlbS5sZW5ndGg7IGkrKyl7XHJcblx0XHRcdGlmIChlbGVtZW50ID09IHVuZGVmaW5lZCB8fCBoaWdobGlnaHRFbGVtW2ldICE9IGVsZW1lbnRbMF0pIHtcclxuXHRcdFx0XHRoaWdobGlnaHRFbGVtW2ldLnJlbW92ZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcbiAgICB9XHJcbiAgICAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipFbmQgcmVnaW9uIGRyb3Agc3VwcG9ydCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxufVxyXG5cclxuZXhwb3J0IHsgQ2hhcnRNYW5hZ2VyV2lkZ2V0fTsiXX0=