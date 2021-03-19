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
define(["require", "exports", "../common/treeGridWidgetBase", "./view/chartManagerTreeGridCellStyle", "./view/chartManagerTreeGridDragDrop", "./view/chartManagerTreeGridToolbar", "../../models/chartManagerDataModel/chartManagerChart", "../common/interfaces/dropInterface", "../../models/chartManagerDataModel/baseSeries", "../../models/chartManagerDataModel/scale", "../../models/chartManagerDataModel/chartManagerDataModel", "../common/imageProvider", "../chartViewWidget/chartViewWidget", "../chartViewWidget/helpers/chartDropHelper", "../common/SerieChartTypeHelper", "../../models/chartManagerDataModel/seriesType", "./defaultComponentSettings"], function (require, exports, treeGridWidgetBase_1, chartManagerTreeGridCellStyle_1, chartManagerTreeGridDragDrop_1, chartManagerTreeGridToolbar_1, chartManagerChart_1, dropInterface_1, baseSeries_1, scale_1, chartManagerDataModel_1, imageProvider_1, chartViewWidget_1, chartDropHelper_1, SerieChartTypeHelper_1, seriesType_1, defaultComponentSettings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ChartManagerWidget = /** @class */ (function (_super) {
        __extends(ChartManagerWidget, _super);
        function ChartManagerWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.eventDropHelper = new chartViewWidget_1.EventDropHelper();
            _this.highlightAreaId = "chartManager_Highlighted";
            return _this;
            //#endregion drop support
        }
        /**
         * Initializes the chart manager
         *
         * @param {string} layoutContainerId
         * @memberof ChartManagerWidget
         */
        ChartManagerWidget.prototype.initialize = function (layoutContainerId) {
            _super.prototype.initialize.call(this, layoutContainerId, 30);
            _super.prototype.setHeaderContent.call(this, "Charts");
            // Set dynamic column settings
            _super.prototype.setDynamicColumn.call(this, 0, 80);
            // Hide the column header of the tree grid
            //super.setColumnHeaderHidden();
            this.addSupportedDragDropDataId(dropInterface_1.DragDropDataId.signal);
        };
        ChartManagerWidget.prototype.initializeComponent = function () {
            this.component.defaultSettingsDataId = defaultComponentSettings_1.DefaultComponentSettings.WidgetDefinitionId;
            this.component.disablePersisting();
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
         * @returns {*}
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
            this.setChartManagerDataModel();
            // Recreate treeGrid to use the new datamodel for the toolbar in the treeGrid
            this.refresh(this.dataModel.data, true);
        };
        ChartManagerWidget.prototype.setChartManagerDataModel = function () {
            var dataModel = this.component.getSubComponent("ChartManagerDataModel");
            this.dataModel = dataModel;
        };
        ChartManagerWidget.prototype.getComponentSettings = function () {
            return _super.prototype.getComponentSettings.call(this);
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
            if (eventArgs.hint != chartManagerDataModel_1.ChartManagerDataModelChangedHint.updateScaleRange) {
                this.refresh(eventArgs.data.data);
                var treegridObj = this.getTreeGridObject();
                if (treegridObj.model.selectedRowIndex == -1) { // TODO: selectedItem != undefined but selectedRowIndex == -1 !!!
                    this.updateToolbarButtonStates(eventArgs.data.data, undefined);
                }
                else {
                    this.updateToolbarButtonStates(eventArgs.data.data, treegridObj.model.selectedItem.item);
                }
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
        //#region drop support
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
            if (chart != undefined) {
                if (chart.dropPossible == true) {
                    dropPossible = true;
                    if (args.dragDropRepresentation != undefined) {
                        var addNewScaleImage = imageProvider_1.ImageProvider.getInstance().getImage("../app/widgets/common/style/images/dragDrop/addNewScale.svg");
                        args.dragDropRepresentation.iconList.push(addNewScaleImage);
                        if (series[0].type === seriesType_1.SeriesType.timeSeries && chart.chartType == chartManagerChart_1.ChartType.FFTChart) {
                            args.dragDropRepresentation.textList[0] = "Calculate FFT singal and add it to new scale";
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
                            addNewScaleImage = imageProvider_1.ImageProvider.getInstance().getImage("../app/widgets/common/style/images/dragDrop/assignToChart.svg");
                            if (series[0].type == seriesType_1.SeriesType.timeSeries) {
                                args.dragDropRepresentation.textList[0] = "Calculate XY signal and add it to the chart";
                            }
                            else {
                                args.dragDropRepresentation.textList[0] = "Add dragged signals to chart";
                            }
                        }
                        else if (yAxis.parent.chartType == chartManagerChart_1.ChartType.FFTChart) {
                            addNewScaleImage = imageProvider_1.ImageProvider.getInstance().getImage("../app/widgets/common/style/images/dragDrop/assignToScale.svg");
                            args.dragDropRepresentation.textList[0] = "Calculate FFT signal and add it to scale";
                        }
                        else {
                            addNewScaleImage = imageProvider_1.ImageProvider.getInstance().getImage("../app/widgets/common/style/images/dragDrop/assignToScale.svg");
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
            var serieChartTypeHelper = new SerieChartTypeHelper_1.SerieChartTypeHelper();
            series = serieChartTypeHelper.getDroppableSeries(chart.getAllSeries(), series);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRNYW5hZ2VyV2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0TWFuYWdlcldpZGdldC9jaGFydE1hbmFnZXJXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBc0JBO1FBQWlDLHNDQUFrQjtRQUFuRDtZQUFBLHFFQXFvQkM7WUFub0JHLHFCQUFlLEdBQW9CLElBQUksaUNBQWUsRUFBRSxDQUFDO1lBS3hDLHFCQUFlLEdBQUcsMEJBQTBCLENBQUM7O1lBNm5COUQseUJBQXlCO1FBQzdCLENBQUM7UUExbkJHOzs7OztXQUtHO1FBQ0gsdUNBQVUsR0FBVixVQUFXLGlCQUF5QjtZQUVoQyxpQkFBTSxVQUFVLFlBQUMsaUJBQWlCLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDeEMsaUJBQU0sZ0JBQWdCLFlBQUMsUUFBUSxDQUFDLENBQUM7WUFFakMsOEJBQThCO1lBQzlCLGlCQUFNLGdCQUFnQixZQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUU5QiwwQ0FBMEM7WUFDMUMsZ0NBQWdDO1lBRWhDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyw4QkFBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNELENBQUM7UUFFRCxnREFBbUIsR0FBbkI7WUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLHFCQUFxQixHQUFHLG1EQUF3QixDQUFDLGtCQUFrQixDQUFDO1lBQ25GLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN2QyxDQUFDO1FBRUQsb0NBQU8sR0FBUDtZQUNJLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyw4QkFBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzFELGlCQUFNLE9BQU8sV0FBRSxDQUFDO1FBQ3BCLENBQUM7UUFFRDs7OztXQUlHO1FBQ0gsdUNBQVUsR0FBVjtZQUNJLGlCQUFNLFVBQVUs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NUMsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO2dCQUMvQixPQUFPLGFBQWEsQ0FBQzthQUN4QjtpQkFDSTtnQkFDRCxPQUFPLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDdkU7UUFDTCxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ssK0NBQWtCLEdBQTFCLFVBQTRCLE9BQTZCO1lBQzNELElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ2xELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUM3QyxJQUFJLE9BQU8sSUFBSSxTQUFTLElBQUksYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDM0QsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO2lCQUMxQjthQUNEO1FBQ0MsQ0FBQztRQS9uQnVCLCtCQUFZLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLHlDQUFzQixHQUFHLGdCQUFnQixDQUFDO1FBQzFDLHlDQUFzQixHQUFHLGdCQUFnQixDQUFDO1FBK25CdEUseUJBQUM7S0FBQSxBQXJvQkQsQ0FBaUMsdUNBQWtCLEdBcW9CbEQ7SUFFUSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vbGlicy91aS9UeXBlcy9lai53ZWIuYWxsLmQudHNcIiAvPlxyXG5pbXBvcnQgeyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MsIElEYXRhTW9kZWwgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2RhdGFNb2RlbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUcmVlR3JpZFdpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL3RyZWVHcmlkV2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBDaGFydE1hbmFnZXJUcmVlR3JpZENlbGxTdHlsZSB9IGZyb20gXCIuL3ZpZXcvY2hhcnRNYW5hZ2VyVHJlZUdyaWRDZWxsU3R5bGVcIjtcclxuaW1wb3J0IHsgQ2hhcnRNYW5hZ2VyVHJlZUdyaWREcmFnRHJvcCB9IGZyb20gXCIuL3ZpZXcvY2hhcnRNYW5hZ2VyVHJlZUdyaWREcmFnRHJvcFwiO1xyXG5pbXBvcnQgeyBDaGFydE1hbmFnZXJUcmVlR3JpZFRvb2xiYXIgfSBmcm9tIFwiLi92aWV3L2NoYXJ0TWFuYWdlclRyZWVHcmlkVG9vbGJhclwiO1xyXG5pbXBvcnQgeyBDaGFydE1hbmFnZXJDaGFydCwgQ2hhcnRUeXBlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvY2hhcnRNYW5hZ2VyQ2hhcnRcIjtcclxuaW1wb3J0IHsgSUNoYXJ0TWFuYWdlckNoYXJ0IH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvaW50ZXJmYWNlcy9jaGFydE1hbmFnZXJDaGFydEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJRHJvcHBhYmxlLCBEcmFnRHJvcERhdGFJZCB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy9kcm9wSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEJhc2VTZXJpZXMgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9iYXNlU2VyaWVzXCI7XHJcbmltcG9ydCB7IFNjYWxlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvc2NhbGVcIjtcclxuaW1wb3J0IHsgSUNoYXJ0TWFuYWdlckRhdGFNb2RlbCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2ludGVyZmFjZXMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IENoYXJ0TWFuYWdlckRhdGFNb2RlbENoYW5nZWRIaW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsXCI7XHJcbmltcG9ydCB7IEltYWdlUHJvdmlkZXIgfSBmcm9tIFwiLi4vY29tbW9uL2ltYWdlUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgRHJhZ0Ryb3BBcmdzIH0gZnJvbSBcIi4uL2NvbW1vbi9kcmFnRHJvcEFyZ3NcIjtcclxuaW1wb3J0IHsgRXZlbnREcm9wSGVscGVyIH0gZnJvbSBcIi4uL2NoYXJ0Vmlld1dpZGdldC9jaGFydFZpZXdXaWRnZXRcIjtcclxuaW1wb3J0IHsgQ2hhcnREcm9wSGVscGVyQ2hhbmdlZEhpbnQgfSBmcm9tIFwiLi4vY2hhcnRWaWV3V2lkZ2V0L2hlbHBlcnMvY2hhcnREcm9wSGVscGVyXCI7XHJcbmltcG9ydCB7IFNlcmllQ2hhcnRUeXBlSGVscGVyIH0gZnJvbSBcIi4uL2NvbW1vbi9TZXJpZUNoYXJ0VHlwZUhlbHBlclwiO1xyXG5pbXBvcnQgeyBTZXJpZXNUeXBlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvc2VyaWVzVHlwZVwiO1xyXG5pbXBvcnQgeyBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi9kZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50U2V0dGluZ3NcIjtcclxuXHJcbmNsYXNzIENoYXJ0TWFuYWdlcldpZGdldCBleHRlbmRzIFRyZWVHcmlkV2lkZ2V0QmFzZSBpbXBsZW1lbnRzIElEcm9wcGFibGUge1xyXG5cclxuICAgIGV2ZW50RHJvcEhlbHBlcjogRXZlbnREcm9wSGVscGVyID0gbmV3IEV2ZW50RHJvcEhlbHBlcigpO1xyXG4gICAgXHJcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBuYW1lQ29sdW1uSWQgPSBcIm5hbWVcIjtcclxuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IGFkZGl0aW9uYWxJbmZvQ29sdW1uSWQgPSBcImFkZGl0aW9uYWxJbmZvXCI7XHJcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBpY29uRGVmaW5pdGlvbkNvbHVtbklkID0gXCJpY29uRGVmaW5pdGlvblwiO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBoaWdobGlnaHRBcmVhSWQgPSBcImNoYXJ0TWFuYWdlcl9IaWdobGlnaHRlZFwiO1xyXG5cclxuICAgIHByaXZhdGUgX3Rvb2xiYXIhOiBDaGFydE1hbmFnZXJUcmVlR3JpZFRvb2xiYXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXplcyB0aGUgY2hhcnQgbWFuYWdlciBcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGF5b3V0Q29udGFpbmVySWRcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgaW5pdGlhbGl6ZShsYXlvdXRDb250YWluZXJJZDogc3RyaW5nKSB7XHJcblxyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQsIDMwKTtcclxuICAgICAgICBzdXBlci5zZXRIZWFkZXJDb250ZW50KFwiQ2hhcnRzXCIpO1xyXG5cclxuICAgICAgICAvLyBTZXQgZHluYW1pYyBjb2x1bW4gc2V0dGluZ3NcclxuICAgICAgICBzdXBlci5zZXREeW5hbWljQ29sdW1uKDAsIDgwKTtcclxuXHJcbiAgICAgICAgLy8gSGlkZSB0aGUgY29sdW1uIGhlYWRlciBvZiB0aGUgdHJlZSBncmlkXHJcbiAgICAgICAgLy9zdXBlci5zZXRDb2x1bW5IZWFkZXJIaWRkZW4oKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRTdXBwb3J0ZWREcmFnRHJvcERhdGFJZChEcmFnRHJvcERhdGFJZC5zaWduYWwpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRpYWxpemVDb21wb25lbnQoKXtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5kZWZhdWx0U2V0dGluZ3NEYXRhSWQgPSBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuV2lkZ2V0RGVmaW5pdGlvbklkO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmRpc2FibGVQZXJzaXN0aW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzcG9zZSgpIHtcclxuICAgICAgICB0aGlzLnJlbW92ZVN1cHBvcnRlZERyYWdEcm9wRGF0YUlkKERyYWdEcm9wRGF0YUlkLnNpZ25hbCk7XHJcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZHMgdGhlIHN0eWxlcyBmb3IgdGhlIGNoYXJ0IG1hbmFnZXIgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBsb2FkU3R5bGVzKCkge1xyXG4gICAgICAgIHN1cGVyLmxvYWRTdHlsZXMoKTtcclxuICAgICAgICBzdXBlci5hZGRTdHlsZShcIndpZGdldHMvY29tbW9uL3N0eWxlL2Nzcy9kcm9wRG93bk1lbnVTdHlsZS5jc3NcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IGNvbXBvbmVudCBzZXR0aW5ncyBmb3IgdGhpcyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgZ2V0RGVmYXVsdENvbXBvbmVudFNldHRpbmdzKCk6IENvbXBvbmVudFNldHRpbmdze1xyXG4gICAgICAgIHJldHVybiBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuZ2V0Q2hhcnRNYW5hZ2VyV2lkZ2V0RGVmaW5pdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgbGF5b3V0IG9mIHRoZSB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZUxheW91dCgpIHtcclxuICAgICAgICB2YXIgJHdpZGdldENvbnRhaW5lciA9ICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpO1xyXG4gICAgICAgICR3aWRnZXRDb250YWluZXJbMF0uc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xyXG5cclxuICAgICAgICBzdXBlci5jcmVhdGVMYXlvdXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0aWFsaXplZCgpe1xyXG4gICAgICAgIHRoaXMuc2V0Q2hhcnRNYW5hZ2VyRGF0YU1vZGVsKCk7XHJcbiAgICAgICAgLy8gUmVjcmVhdGUgdHJlZUdyaWQgdG8gdXNlIHRoZSBuZXcgZGF0YW1vZGVsIGZvciB0aGUgdG9vbGJhciBpbiB0aGUgdHJlZUdyaWRcclxuICAgICAgICB0aGlzLnJlZnJlc2godGhpcy5kYXRhTW9kZWwuZGF0YSwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Q2hhcnRNYW5hZ2VyRGF0YU1vZGVsKCkge1xyXG4gICAgICAgIGxldCBkYXRhTW9kZWwgPSB0aGlzLmNvbXBvbmVudC5nZXRTdWJDb21wb25lbnQoXCJDaGFydE1hbmFnZXJEYXRhTW9kZWxcIik7XHJcbiAgICAgICAgdGhpcy5kYXRhTW9kZWwgPSBkYXRhTW9kZWwgYXMgSUNoYXJ0TWFuYWdlckRhdGFNb2RlbDtcclxuICAgIH1cclxuXHJcblx0cHVibGljIGdldENvbXBvbmVudFNldHRpbmdzKCk6IENvbXBvbmVudFNldHRpbmdze1xyXG5cdFx0cmV0dXJuIHN1cGVyLmdldENvbXBvbmVudFNldHRpbmdzKCk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0Q29tcG9uZW50U2V0dGluZ3MoZGF0YTogQ29tcG9uZW50U2V0dGluZ3MpIHtcclxuICAgICAgICBpZihkYXRhICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHN1cGVyLnNldENvbXBvbmVudFNldHRpbmdzKGRhdGEpO1xyXG4gICAgICAgIH1cclxuXHR9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGVzIHRoZSBtb2RlbCBjaGFuZ2VzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJRGF0YU1vZGVsfSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7RXZlbnRNb2RlbENoYW5nZWRBcmdzfSBldmVudEFyZ3NcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBoYW5kbGVNb2RlbENoYW5nZWQoc2VuZGVyOiBJRGF0YU1vZGVsLCBldmVudEFyZ3M6IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyk6IGFueSB7XHJcbiAgICAgICAgaWYgKGV2ZW50QXJncy5oaW50ICE9IENoYXJ0TWFuYWdlckRhdGFNb2RlbENoYW5nZWRIaW50LnVwZGF0ZVNjYWxlUmFuZ2UpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoKGV2ZW50QXJncy5kYXRhLmRhdGEpO1xyXG4gICAgICAgICAgICB2YXIgdHJlZWdyaWRPYmogPSB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCk7XHJcbiAgICAgICAgICAgIGlmICgoPGFueT50cmVlZ3JpZE9iai5tb2RlbCkuc2VsZWN0ZWRSb3dJbmRleCA9PSAtMSkgeyAvLyBUT0RPOiBzZWxlY3RlZEl0ZW0gIT0gdW5kZWZpbmVkIGJ1dCBzZWxlY3RlZFJvd0luZGV4ID09IC0xICEhIVxyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVUb29sYmFyQnV0dG9uU3RhdGVzKGV2ZW50QXJncy5kYXRhLmRhdGEsIHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVRvb2xiYXJCdXR0b25TdGF0ZXMoZXZlbnRBcmdzLmRhdGEuZGF0YSwgKDxhbnk+dHJlZWdyaWRPYmoubW9kZWwpLnNlbGVjdGVkSXRlbS5pdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIGNvbHVtbiB0ZW1wbGF0ZXMgZm9yIHRoZSB0cmVlIGdyaWQgYW5kIGFkZHMgdGhlbSB0byB0aGUgd2lkZ2V0IGNvbnRhaW5lclxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZUNvbHVtblRlbXBsYXRlcygpIHtcclxuICAgICAgICB2YXIgJHdpZGdldENvbnRhaW5lciA9ICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpO1xyXG4gICAgICAgICR3aWRnZXRDb250YWluZXIuYXBwZW5kKHRoaXMuZ2V0U2NyaXB0Rm9yRHJhZ0Ryb3BUZW1wbGF0ZUhlbHBlcnMoKSk7XHJcbiAgICAgICAgJHdpZGdldENvbnRhaW5lci5hcHBlbmQodGhpcy5nZXRDb2x1bW5UZW1wbGF0ZURhdGEoQ2hhcnRNYW5hZ2VyV2lkZ2V0Lm5hbWVDb2x1bW5JZCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY3JlYXRlcyB0aGUgdHJlZSBncmlkIGZvciB0aGUgY2hhcnRtYW5hZ2VyXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZVRyZWVHcmlkKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9kYXRhTW9kZWwgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhcImRhdGFNb2RlbCB1bmRlZmluZWQhXCIpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGNlbGxTdHlsZSA9IG5ldyBDaGFydE1hbmFnZXJUcmVlR3JpZENlbGxTdHlsZSgpO1xyXG4gICAgICAgICg8YW55PiQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpKS5lalRyZWVHcmlkKHtcclxuICAgICAgICAgICAgLi4udGhpcy5nZXRUcmVlR3JpZENvbHVtbkRlZmluaXRpb24oKSxcclxuICAgICAgICAgICAgLi4udGhpcy5nZXRUcmVlR3JpZENvbHVtblJlc2l6ZVN1cHBvcnQoKSxcclxuICAgICAgICAgICAgLi4udGhpcy5nZXRUcmVlR3JpZFRvb2xiYXJTdXBwb3J0KCksXHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWREcmFnRHJvcFN1cHBvcnQoKSxcclxuXHJcbiAgICAgICAgICAgIGRhdGFTb3VyY2U6IHRoaXMuX2RhdGFNb2RlbC5kYXRhLFxyXG4gICAgICAgICAgICBjaGlsZE1hcHBpbmc6IFwiY2hpbGRzXCIsXHJcbiAgICAgICAgICAgIGlkTWFwcGluZzogQ2hhcnRNYW5hZ2VyV2lkZ2V0Lm5hbWVDb2x1bW5JZCxcclxuICAgICAgICAgICAgZXhwYW5kU3RhdGVNYXBwaW5nOiBcImV4cGFuZFN0YXRlXCIsXHJcbiAgICAgICAgICAgIGlzUmVzcG9uc2l2ZTogdHJ1ZSxcclxuICAgICAgICAgICAgcm93SGVpZ2h0OiAyOCxcclxuICAgICAgICAgICAgLy8gU2V0IGluaXQgc2l6ZSB0byBkcmF3IHRoZSB0b29sYmFyIGljb25zIGF0IHRoZSByaWdodCBwb3NpdGlvblxyXG4gICAgICAgICAgICBzaXplU2V0dGluZ3M6IHsgaGVpZ2h0OiAnNDAwcHgnLCB3aWR0aDogJzQwMHB4JywgfSxcclxuXHJcbiAgICAgICAgICAgIGV4cGFuZGVkOiAoYXJncykgPT4gdGhpcy50cmVlR3JpZE5vZGVFeHBhbmRlZE9yQ29sbGFwc2VkKCksXHJcbiAgICAgICAgICAgIGNvbGxhcHNlZDogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWROb2RlRXhwYW5kZWRPckNvbGxhcHNlZCgpLFxyXG5cclxuICAgICAgICAgICAgcm93U2VsZWN0ZWQ6IChhcmdzKSA9PiB0aGlzLnVwZGF0ZVRvb2xiYXJCdXR0b25TdGF0ZXMoYXJncy5tb2RlbC5kYXRhU291cmNlLCBhcmdzLmRhdGEuaXRlbSksXHJcbiAgICAgICAgICAgIGNyZWF0ZTogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWRDcmVhdGVkKCksXHJcbiAgICAgICAgICAgIGFjdGlvbkJlZ2luOiAoYXJncykgPT4gdGhpcy50cmVlR3JpZEFjdGlvbkJlZ2luKGFyZ3MpLFxyXG4gICAgICAgICAgICBhY3Rpb25Db21wbGV0ZTogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWRBY3Rpb25Db21wbGV0ZShhcmdzKSxcclxuICAgICAgICAgICAgcXVlcnlDZWxsSW5mbzogKGFyZ3MpID0+IGNlbGxTdHlsZS5zZXRDZWxsU3R5bGUoYXJncyksXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRyZWVHcmlkTm9kZUV4cGFuZGVkT3JDb2xsYXBzZWQoKSB7XHJcbiAgICAgICAgLy8gUmVmcmVzaCB0byBzZWUgY29ycmVjdCBleHBhbmRlZC9jb2xsYXBzZWQgaWNvblxyXG4gICAgICAgIHRoaXMucmVmcmVzaCh0aGlzLmRhdGFNb2RlbC5kYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCBjb2x1bW4gZGVmaW5pdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCk6IHt9IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjb2x1bW5zOiBbXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBDaGFydE1hbmFnZXJXaWRnZXQubmFtZUNvbHVtbklkLCBoZWFkZXJUZXh0OiBcIk5hbWVcIiwgaXNUZW1wbGF0ZUNvbHVtbjogdHJ1ZSwgdGVtcGxhdGVJRDogXCJjbU5hbWVDb2x1bW5UZW1wbGF0ZVwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBDaGFydE1hbmFnZXJXaWRnZXQuYWRkaXRpb25hbEluZm9Db2x1bW5JZCwgaGVhZGVyVGV4dDogXCJcIiwgd2lkdGg6IFwiMTQwcHhcIiB9LFxyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogQ2hhcnRNYW5hZ2VyV2lkZ2V0Lmljb25EZWZpbml0aW9uQ29sdW1uSWQsIHZpc2libGU6IGZhbHNlLCB3aWR0aDogXCIwcHhcIiB9LFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgY29sdW1uIHJlc2l6ZSBzZXR0aW5nc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VHJlZUdyaWRDb2x1bW5SZXNpemVTdXBwb3J0KCk6IHt9IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBhbGxvd0NvbHVtblJlc2l6ZTogdHJ1ZSxcclxuICAgICAgICAgICAgY29sdW1uUmVzaXplU2V0dGluZ3M6IHsgY29sdW1uUmVzaXplTW9kZTogZWouVHJlZUdyaWQuQ29sdW1uUmVzaXplTW9kZS5GaXhlZENvbHVtbnMgfSxcclxuICAgICAgICAgICAgY29sdW1uUmVzaXplZDogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWRDb2x1bW5SZXNpemVkKGFyZ3MpLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBIHRyZWVncmlkIGNvbHVtbiB3YXMgcmVzaXplZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB0cmVlR3JpZENvbHVtblJlc2l6ZWQoYXJncykge1xyXG4gICAgICAgIHN1cGVyLnJlc2l6ZUR5bmFtaWNDb2x1bW4oYXJncy5jb2x1bW5JbmRleCwgYXJncy5tb2RlbCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgdG9vbGJhciBzZXR0aW5nc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VHJlZUdyaWRUb29sYmFyU3VwcG9ydCgpOiB7fSB7XHJcbiAgICAgICAgdGhpcy5fdG9vbGJhciA9IG5ldyBDaGFydE1hbmFnZXJUcmVlR3JpZFRvb2xiYXIodGhpcy5jc3NQYXJlbnRDb250ZW50SWQsIHRoaXMuX2RhdGFNb2RlbCBhcyBJQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0b29sYmFyU2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgIHNob3dUb29sYmFyOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tVG9vbGJhckl0ZW1zOiB0aGlzLl90b29sYmFyLmdldEN1c3RvbVRvb2xiYXJzKCksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRvb2xiYXJDbGljazogKGFyZ3MpID0+IHRoaXMuX3Rvb2xiYXIudG9vbGJhckNsaWNrKGFyZ3MpLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRUcmVlR3JpZERyYWdEcm9wU3VwcG9ydCgpOiB7fSB7XHJcbiAgICAgICAgdmFyIGRyYWdEcm9wID0gbmV3IENoYXJ0TWFuYWdlclRyZWVHcmlkRHJhZ0Ryb3AoKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBhbGxvd0RyYWdBbmREcm9wOiB0cnVlLFxyXG4gICAgICAgICAgICByb3dEcmFnU3RhcnQ6IChhcmdzKSA9PiBkcmFnRHJvcC5yb3dEcmFnU3RhcnQoYXJncyksXHJcbiAgICAgICAgICAgIHJvd0RyYWc6IChhcmdzKSA9PiBkcmFnRHJvcC5yb3dEcmFnKGFyZ3MpLFxyXG4gICAgICAgICAgICByb3dEcm9wQWN0aW9uQmVnaW46IChhcmdzKSA9PiBkcmFnRHJvcC5yb3dEcm9wQWN0aW9uQmVnaW4oYXJncywgdGhpcy5fZGF0YU1vZGVsIGFzIElDaGFydE1hbmFnZXJEYXRhTW9kZWwpLFxyXG4gICAgICAgICAgICByb3dEcmFnU3RvcDogKGFyZ3MpID0+IGRyYWdEcm9wLnJvd0RyYWdTdG9wKGFyZ3MsIHRoaXMuX2RhdGFNb2RlbCBhcyBJQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsKSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdHJlZUdyaWRDcmVhdGVkKCkge1xyXG4gICAgICAgIC8vIFNldHMgdGhlIGN1c3RvbSB0b29sYmFyIGljb25zXHJcbiAgICAgICAgdGhpcy5fdG9vbGJhci5zZXRTdHlsZUZvclRvb2xiYXJJY29ucygpO1xyXG5cclxuICAgICAgICAvLyBBdCB0aGUgYmVnaW5uaW5nIHRoZSBkZWxldGUgYnV0dG9uIGlzIGRpc2FibGVkIGJlY2F1c2Ugbm8gc2VsZWN0aW9uIGlzIGF2YWlsYWJsZVxyXG4gICAgICAgIHRoaXMuX3Rvb2xiYXIuZGlzYWJsZURlbGV0ZUJ1dHRvbih0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRyZWVHcmlkQWN0aW9uQmVnaW4oYXJncykge1xyXG4gICAgICAgIC8vIFN1cHBvcnQgXCJFbnRmL0RlbFwiIGtleVxyXG4gICAgICAgIGlmIChhcmdzLnJlcXVlc3RUeXBlID09IFwiZGVsZXRlXCIpIHtcclxuICAgICAgICAgICAgYXJncy5jYW5jZWwgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAoYXJncy5kZWxldGVkSXRlbXNbMF0uaXRlbSBpbnN0YW5jZW9mIENoYXJ0TWFuYWdlckNoYXJ0KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgY2hhcnQgZnJvbSBkYXRhbW9kZWxcclxuICAgICAgICAgICAgICAgICg8YW55PnRoaXMuX2RhdGFNb2RlbCkhLnJlbW92ZUNoYXJ0KGFyZ3MuZGVsZXRlZEl0ZW1zWzBdLml0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGFyZ3MuZGVsZXRlZEl0ZW1zWzBdLml0ZW0gaW5zdGFuY2VvZiBCYXNlU2VyaWVzKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2hhcnQ6IElDaGFydE1hbmFnZXJDaGFydCB8IHVuZGVmaW5lZCA9IGFyZ3MuZGVsZXRlZEl0ZW1zWzBdLnBhcmVudEl0ZW0ucGFyZW50SXRlbS5pdGVtO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoYXJ0ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBzZXJpZSBmcm9tIGRhdGFtb2RlbFxyXG4gICAgICAgICAgICAgICAgICAgICg8YW55PnRoaXMuX2RhdGFNb2RlbCkhLnJlbW92ZVNlcmllKGNoYXJ0LCBhcmdzLmRlbGV0ZWRJdGVtc1swXS5pdGVtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChhcmdzLmRlbGV0ZWRJdGVtc1swXS5pdGVtIGluc3RhbmNlb2YgU2NhbGUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjaGFydDogSUNoYXJ0TWFuYWdlckNoYXJ0IHwgdW5kZWZpbmVkID0gYXJncy5kZWxldGVkSXRlbXNbMF0ucGFyZW50SXRlbS5pdGVtO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoYXJ0ICE9IHVuZGVmaW5lZCAmJiBjaGFydC5jYW5SZW1vdmVZQXhpcygpID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBSZW1vdmUgeUF4aXMgZnJvbSBkYXRhbW9kZWxcclxuICAgICAgICAgICAgICAgICAgICAoPGFueT50aGlzLl9kYXRhTW9kZWwpIS5yZW1vdmVZQXhpcyhjaGFydCwgYXJncy5kZWxldGVkSXRlbXNbMF0uaXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0cmVlR3JpZEFjdGlvbkNvbXBsZXRlKGFyZ3MpIHtcclxuICAgICAgICAvLyBFdmVudCB0cmlnZ2VyIHdoaWxlIGNoYW5naW5nIGRhdGFzb3VyY2UgZHluYW1pY2FsbHkuIFxyXG4gICAgICAgIC8vIGNvZGUgdG8gZG9uZSBhZnRlciB0aGUgZHluYW1pYyBjaGFuZ2Ugb2YgZGF0YXNvdXJjZS4gXHJcbiAgICAgICAgaWYgKGFyZ3MucmVxdWVzdFR5cGUgPT09ICdyZWZyZXNoRGF0YVNvdXJjZScpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoU2VsZWN0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVmcmVzaChkYXRhOiBJQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsLCByZWNyZWF0ZTogYm9vbGVhbj0gZmFsc2UpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZihyZWNyZWF0ZSA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgIC8vVG8gYXZvaWQgcHJvYmxlbXMgd2l0aCB0aGUgdG9vbGJhciwgdHJlZWdyaWQgbmVlZHMgdG8gYmUgZGVzdHJveWVkIGlmIHdlIGFyZSBjcmVhdGluZyBpdCBhZ2FpblxyXG4gICAgICAgICAgICAgICAgbGV0IHRyZWVncmlkT2JqID0gdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgdHJlZWdyaWRPYmouZGVzdHJveSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlVHJlZUdyaWQoKTtcclxuICAgICAgICAgICAgICAgIC8vIFNldCBjb2x1bW4gc2l6ZXMgYWZ0ZXIgdHJlZWdyaWQgcmVjcmVhdGlvbiA9PiBUT0RPOiBtdXN0IGJlIHNvbHZlZCBpbiBhbiBvdGhlciB3YXkgPT4gbm8gcmVjcmVhdGlvbiBmb3IgdG9vbGJhciB1cGRhdGUsIGlmIHBvc3NpYmxlXHJcbiAgICAgICAgICAgICAgICBsZXQgY29sdW1uU2V0dGluZ3MgPSB0aGlzLmNvbXBvbmVudC5nZXRTZXR0aW5nKFRyZWVHcmlkV2lkZ2V0QmFzZS5Db2x1bW5zU2V0dGluZ0lkKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0Q29sdW1uU2V0dGluZ3MoY29sdW1uU2V0dGluZ3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldE1vZGVsKGRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmluZm8oXCJDaGFydE1hbmFnZXIgcmVmcmVzaCBlcnJvciEgPT4gVHJlZUdyaWQgcmVjcmVhdGlvbiFcIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhlKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVHJlZUdyaWQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWZyZXNoU2VsZWN0aW9uKCkge1xyXG4gICAgICAgIGNvbnN0IHRyZWVPYmogPSAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKS5lalRyZWVHcmlkKCdpbnN0YW5jZScpO1xyXG5cclxuICAgICAgICAvLyBHZXQgYWN0dWFsIHNlbGVjdGlvbiBpbmRleFxyXG4gICAgICAgIGxldCBhY3R1YWxTZWxlY3RlZFJvd0luZGV4ID0gdHJlZU9iai5tb2RlbC5zZWxlY3RlZFJvd0luZGV4O1xyXG4gICAgICAgIC8vIFJlc2V0IHNlbGVjdGlvblxyXG4gICAgICAgIHRyZWVPYmoubW9kZWwuc2VsZWN0ZWRSb3dJbmRleCA9IC0xO1xyXG5cclxuICAgICAgICAvLyBTZXQgdG8gbGFzdCBpbmRleCBpZiBpbmRleCBpcyBvdXQgb2YgcmFuZ2VcclxuICAgICAgICBpZiAoYWN0dWFsU2VsZWN0ZWRSb3dJbmRleCA+PSB0cmVlT2JqLm1vZGVsLmZsYXRSZWNvcmRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBhY3R1YWxTZWxlY3RlZFJvd0luZGV4ID0gdHJlZU9iai5tb2RlbC5mbGF0UmVjb3Jkcy5sZW5ndGggLSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBTZXQgc2VsZWN0aW9uXHJcbiAgICAgICAgdHJlZU9iai5tb2RlbC5zZWxlY3RlZFJvd0luZGV4ID0gYWN0dWFsU2VsZWN0ZWRSb3dJbmRleDtcclxuXHJcbiAgICAgICAgLy8gdXBkYXRlIHRvb2xiYXIgYnV0dG9uc1xyXG4gICAgICAgIGlmICh0cmVlT2JqLm1vZGVsLmZsYXRSZWNvcmRzW2FjdHVhbFNlbGVjdGVkUm93SW5kZXhdICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVRvb2xiYXJCdXR0b25TdGF0ZXModHJlZU9iai5tb2RlbC5kYXRhU291cmNlLCB0cmVlT2JqLm1vZGVsLmZsYXRSZWNvcmRzW2FjdHVhbFNlbGVjdGVkUm93SW5kZXhdLml0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZVRvb2xiYXJCdXR0b25TdGF0ZXMoY2hhcnRzOiBBcnJheTxJQ2hhcnRNYW5hZ2VyQ2hhcnQ+LCBzZWxlY3RlZEl0ZW0pIHtcclxuICAgICAgICBpZiAoY2hhcnRzLmxlbmd0aCA9PSAwIHx8IHNlbGVjdGVkSXRlbSA9PSB1bmRlZmluZWQgfHwgKHNlbGVjdGVkSXRlbSBpbnN0YW5jZW9mIFNjYWxlICYmIHNlbGVjdGVkSXRlbS5wYXJlbnQuY2FuUmVtb3ZlWUF4aXMoKSA9PSBmYWxzZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbGJhci5kaXNhYmxlRGVsZXRlQnV0dG9uKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbGJhci5kaXNhYmxlRGVsZXRlQnV0dG9uKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCg8YW55PnRoaXMuX2RhdGFNb2RlbCkuY2FuQWRkQ2hhcnQoKSB8fCAoc2VsZWN0ZWRJdGVtIGluc3RhbmNlb2YgQ2hhcnRNYW5hZ2VyQ2hhcnQgJiYgc2VsZWN0ZWRJdGVtLmNhbkFkZFlBeGlzKCkpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2xiYXIuZGlzYWJsZUFkZEJ1dHRvbihmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl90b29sYmFyLmRpc2FibGVBZGRCdXR0b24odHJ1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl90b29sYmFyLnNldFNlbGVjdGVkQ2hhcnQoc2VsZWN0ZWRJdGVtKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8jcmVnaW9uIGRyb3Agc3VwcG9ydFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhbGwgcG9zc2libGUgZHJvcExvY2F0aW9uc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PEJhc2VTZXJpZXM+fSBzZXJpZXNcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGREcm9wTG9jYXRpb25zKHNlcmllczogQXJyYXk8QmFzZVNlcmllcz4pIHtcclxuICAgICAgICAvLyBBZGQgcG9zc2libGUgZHJvcCBsb2NhdGlvbnNcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIGFsbCBkcm9wIGxvY2F0aW9uc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PEJhc2VTZXJpZXM+fSBzZXJpZXNcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZW1vdmVEcm9wTG9jYXRpb25zKHNlcmllczogQXJyYXk8QmFzZVNlcmllcz4pIHtcclxuICAgICAgICB0aGlzLl9kYXRhTW9kZWwuZGF0YS5mb3JFYWNoKGNoYXJ0ID0+IHtcclxuICAgICAgICAgICAgY2hhcnQuZHJvcFBvc3NpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNoYXJ0LmNoaWxkcy5mb3JFYWNoKHlBeGlzID0+IHtcclxuICAgICAgICAgICAgICAgIHlBeGlzLmRyb3BQb3NzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYWdTdGFydChhcmdzOiBEcmFnRHJvcEFyZ3MpIHtcclxuICAgICAgICBsZXQgc2VyaWUgPSBhcmdzLmRhdGEgYXMgQXJyYXk8QmFzZVNlcmllcz47XHJcblxyXG4gICAgICAgIC8vIEFkZCBwb3NzaWJsZSBkcm9wTG9jYXRpb25zXHJcbiAgICAgICAgdGhpcy5hZGREcm9wTG9jYXRpb25zKHNlcmllKTtcclxuXHJcbiAgICAgICAgLy8gVXBkYXRlIHRyZWVHcmlkXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoKHRoaXMuX2RhdGFNb2RlbC5kYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBkcmFnU3RvcChhcmdzOiBEcmFnRHJvcEFyZ3MpIHtcclxuICAgICAgICBsZXQgc2VyaWUgPSBhcmdzLmRhdGEgYXMgQXJyYXk8QmFzZVNlcmllcz47XHJcblxyXG4gICAgICAgIC8vIFJlbW92ZSBwb3NzaWJsZSBkcm9wTG9jYXRpb25zXHJcbiAgICAgICAgdGhpcy5yZW1vdmVEcm9wTG9jYXRpb25zKHNlcmllKTtcclxuXHJcbiAgICAgICAgLy8gVXBkYXRlIHRyZWVHcmlkXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoKHRoaXMuX2RhdGFNb2RlbC5kYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBkcmFnT3ZlcihhcmdzOiBEcmFnRHJvcEFyZ3MpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgc2VyaWVzID0gYXJncy5kYXRhIGFzIEFycmF5PEJhc2VTZXJpZXM+O1xyXG5cclxuICAgICAgICBsZXQgZHJvcFBvc3NpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IGNoYXJ0ID0gdGhpcy5nZXRDaGFydEZyb21EcmFnTG9jYXRpb24oYXJncy5jdXJyZW50VGFyZ2V0KTtcclxuICAgICAgICBsZXQgeUF4aXMgPSB0aGlzLmdldFlBeGlzRnJvbURyYWdMb2NhdGlvbihhcmdzLmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChjaGFydCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJ0LmRyb3BQb3NzaWJsZSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBkcm9wUG9zc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFyZ3MuZHJhZ0Ryb3BSZXByZXNlbnRhdGlvbiAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYWRkTmV3U2NhbGVJbWFnZSA9IEltYWdlUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXRJbWFnZShcIi4uL2FwcC93aWRnZXRzL2NvbW1vbi9zdHlsZS9pbWFnZXMvZHJhZ0Ryb3AvYWRkTmV3U2NhbGUuc3ZnXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFyZ3MuZHJhZ0Ryb3BSZXByZXNlbnRhdGlvbi5pY29uTGlzdC5wdXNoKGFkZE5ld1NjYWxlSW1hZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlcmllc1swXS50eXBlID09PSBTZXJpZXNUeXBlLnRpbWVTZXJpZXMgJiYgY2hhcnQuY2hhcnRUeXBlID09IENoYXJ0VHlwZS5GRlRDaGFydCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5kcmFnRHJvcFJlcHJlc2VudGF0aW9uLnRleHRMaXN0WzBdID0gXCJDYWxjdWxhdGUgRkZUIHNpbmdhbCBhbmQgYWRkIGl0IHRvIG5ldyBzY2FsZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5kcmFnRHJvcFJlcHJlc2VudGF0aW9uLnRleHRMaXN0WzBdID0gXCJDcmVhdGUgYSBuZXcgc2NhbGUgYW5kIGFkZCBkcmFnZ2VkIHNpZ25hbHNcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoeUF4aXMgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGlmICh5QXhpcy5kcm9wUG9zc2libGUgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgZHJvcFBvc3NpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmIChhcmdzLmRyYWdEcm9wUmVwcmVzZW50YXRpb24gIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFkZE5ld1NjYWxlSW1hZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9YWSBjaGFydCBleGNlcHRpb25cclxuICAgICAgICAgICAgICAgICAgICBpZiAoeUF4aXMucGFyZW50LmNoYXJ0VHlwZSA9PSBDaGFydFR5cGUuWFlDaGFydCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZE5ld1NjYWxlSW1hZ2UgPSBJbWFnZVByb3ZpZGVyLmdldEluc3RhbmNlKCkuZ2V0SW1hZ2UoXCIuLi9hcHAvd2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL2RyYWdEcm9wL2Fzc2lnblRvQ2hhcnQuc3ZnXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZXJpZXNbMF0udHlwZSA9PSBTZXJpZXNUeXBlLnRpbWVTZXJpZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MuZHJhZ0Ryb3BSZXByZXNlbnRhdGlvbi50ZXh0TGlzdFswXSA9IFwiQ2FsY3VsYXRlIFhZIHNpZ25hbCBhbmQgYWRkIGl0IHRvIHRoZSBjaGFydFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5kcmFnRHJvcFJlcHJlc2VudGF0aW9uLnRleHRMaXN0WzBdID0gXCJBZGQgZHJhZ2dlZCBzaWduYWxzIHRvIGNoYXJ0XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh5QXhpcy5wYXJlbnQuY2hhcnRUeXBlID09IENoYXJ0VHlwZS5GRlRDaGFydCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGROZXdTY2FsZUltYWdlID0gSW1hZ2VQcm92aWRlci5nZXRJbnN0YW5jZSgpLmdldEltYWdlKFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9kcmFnRHJvcC9hc3NpZ25Ub1NjYWxlLnN2Z1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5kcmFnRHJvcFJlcHJlc2VudGF0aW9uLnRleHRMaXN0WzBdID0gXCJDYWxjdWxhdGUgRkZUIHNpZ25hbCBhbmQgYWRkIGl0IHRvIHNjYWxlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGROZXdTY2FsZUltYWdlID0gSW1hZ2VQcm92aWRlci5nZXRJbnN0YW5jZSgpLmdldEltYWdlKFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9kcmFnRHJvcC9hc3NpZ25Ub1NjYWxlLnN2Z1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5kcmFnRHJvcFJlcHJlc2VudGF0aW9uLnRleHRMaXN0WzBdID0gXCJBZGQgZHJhZ2dlZCBzaWduYWxzIHRvIHNjYWxlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGFyZ3MuZHJhZ0Ryb3BSZXByZXNlbnRhdGlvbi5pY29uTGlzdC5wdXNoKGFkZE5ld1NjYWxlSW1hZ2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0RHJvcHBhYmxlQXJlYXMoY2hhcnQsIHlBeGlzLCBhcmdzLmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgICAgIHJldHVybiBkcm9wUG9zc2libGU7XHJcbiAgICB9XHJcblxyXG4gICAgZHJvcChhcmdzOiBEcmFnRHJvcEFyZ3MpIHtcclxuICAgICAgICBsZXQgc2VyaWVzID0gYXJncy5kYXRhIGFzIEFycmF5PEJhc2VTZXJpZXM+O1xyXG5cclxuICAgICAgICBsZXQgY2hhcnQgPSB0aGlzLmdldENoYXJ0RnJvbURyYWdMb2NhdGlvbihhcmdzLmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgICAgIGxldCB5QXhpcyA9IHRoaXMuZ2V0WUF4aXNGcm9tRHJhZ0xvY2F0aW9uKGFyZ3MuY3VycmVudFRhcmdldCk7XHJcblxyXG4gICAgICAgIGlmICh5QXhpcyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgY2hhcnQgPSB5QXhpcy5wYXJlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzZXJpZUNoYXJ0VHlwZUhlbHBlciA9IG5ldyBTZXJpZUNoYXJ0VHlwZUhlbHBlcigpO1xyXG4gICAgICAgIHNlcmllcyA9IHNlcmllQ2hhcnRUeXBlSGVscGVyLmdldERyb3BwYWJsZVNlcmllcyhjaGFydCEuZ2V0QWxsU2VyaWVzKCksc2VyaWVzKTtcclxuXHJcbiAgICAgICAgbGV0IGRhdGEgPSB7XHJcbiAgICAgICAgICAgIGNoYXJ0OiBjaGFydCxcclxuICAgICAgICAgICAgeUF4aXM6IHlBeGlzLFxyXG4gICAgICAgICAgICBzZXJpZXM6IHNlcmllc1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9yYWlzZSBldmVudCB0byB0cmFjZVZpZXdXaWRnZXRcclxuICAgICAgICBpZiAoc2VyaWVzWzBdLnR5cGUgPT0gU2VyaWVzVHlwZS50aW1lU2VyaWVzICYmIGNoYXJ0IS5jaGFydFR5cGUgPT0gQ2hhcnRUeXBlLlhZQ2hhcnQpIHtcclxuICAgICAgICAgICAgdGhpcy5ldmVudERyb3BIZWxwZXIucmFpc2UodGhpcy5kYXRhTW9kZWwsIHtoaW50OiBDaGFydERyb3BIZWxwZXJDaGFuZ2VkSGludC5jcmVhdGVYWVNlcmllLCBkYXRhOiBkYXRhIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChzZXJpZXNbMF0udHlwZSA9PSBTZXJpZXNUeXBlLnRpbWVTZXJpZXMgJiYgY2hhcnQhLmNoYXJ0VHlwZSA9PSBDaGFydFR5cGUuRkZUQ2hhcnQpe1xyXG4gICAgICAgICAgICB0aGlzLmV2ZW50RHJvcEhlbHBlci5yYWlzZSh0aGlzLmRhdGFNb2RlbCwge2hpbnQ6IENoYXJ0RHJvcEhlbHBlckNoYW5nZWRIaW50LmNyZWF0ZUZGVFNlcmllLCBkYXRhOiBkYXRhIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5ldmVudERyb3BIZWxwZXIucmFpc2UodGhpcy5kYXRhTW9kZWwsIHtoaW50OiBDaGFydERyb3BIZWxwZXJDaGFuZ2VkSGludC5hZGRTZXJpZSwgZGF0YTogZGF0YSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZXNldEhpZ2hsaWdodEFyZWEoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldENoYXJ0RnJvbURyYWdMb2NhdGlvbihjdXJyZW50VGFyZ2V0KTogSUNoYXJ0TWFuYWdlckNoYXJ0IHwgdW5kZWZpbmVkIHtcclxuICAgICAgICBsZXQgY2xhc3NlcyA9IGN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LnZhbHVlO1xyXG4gICAgICAgIC8vYXZvaWQgZHJvcHBpbmcgc2VyaWUgaW4gbm90IGhpZ2hsaWdodGVkIGFyZWFcclxuICAgICAgICBpZiAoIWNsYXNzZXMuaW5jbHVkZXMoJ2UtdGVtcGxhdGVjZWxsJykgJiYgY2xhc3Nlcy5pbmNsdWRlcygnZS1yb3djZWxsJykgfHwgY2xhc3Nlcy5pbmNsdWRlcygnZS1oZWFkZXJjZWxsJykgfHwgY3VycmVudFRhcmdldC5sb2NhbE5hbWUgPT0gJ3NwYW4nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcmVjb3JkID0gdGhpcy5nZXRUcmVlUmVjb3JkKGN1cnJlbnRUYXJnZXQpO1xyXG4gICAgICAgIGlmIChyZWNvcmQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGlmIChyZWNvcmQuaXRlbSBpbnN0YW5jZW9mIENoYXJ0TWFuYWdlckNoYXJ0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVjb3JkLml0ZW07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFlBeGlzRnJvbURyYWdMb2NhdGlvbihjdXJyZW50VGFyZ2V0KTogU2NhbGUgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGxldCBjbGFzc2VzID0gY3VycmVudFRhcmdldC5jbGFzc0xpc3QudmFsdWU7XHJcbiAgICAgICAgLy9hdm9pZCBkcm9wcGluZyBzZXJpZSBpbiBub3QgaGlnaGxpZ2h0ZWQgYXJlYVxyXG4gICAgICAgIGlmICghY2xhc3Nlcy5pbmNsdWRlcygnZS10ZW1wbGF0ZWNlbGwnKSAmJiBjbGFzc2VzLmluY2x1ZGVzKCdlLXJvd2NlbGwnKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHJlY29yZCA9IHRoaXMuZ2V0VHJlZVJlY29yZChjdXJyZW50VGFyZ2V0KTtcclxuICAgICAgICBpZiAocmVjb3JkICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBpZiAocmVjb3JkLml0ZW0gaW5zdGFuY2VvZiBTY2FsZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlY29yZC5pdGVtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcblx0ICogUmV0dXJucyB0aGUgY29sdW1uIHRlbXBsYXRlIGluZm9ybWF0aW9uc1xyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG5cdCAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuICAgIHByaXZhdGUgZ2V0Q29sdW1uVGVtcGxhdGVEYXRhKGNvbHVtbklkOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmIChjb2x1bW5JZCA9PSBDaGFydE1hbmFnZXJXaWRnZXQubmFtZUNvbHVtbklkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBgPHNjcmlwdCB0eXBlPVwidGV4dC94LWpzcmVuZGVyXCIgaWQ9XCJjbU5hbWVDb2x1bW5UZW1wbGF0ZVwiPlxyXG5cdFx0XHQgICAgICAgICAgICA8ZGl2IHN0eWxlPSdoZWlnaHQ6MjBweDsnIHVuc2VsZWN0YWJsZT0nb24nPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3tpZiAhfmdldHN0YXRlKCl9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2UtZHJhZ2ludGVuZCcgc3R5bGU9J2hlaWdodDoxcHg7IGZsb2F0OmxlZnQ7IHdpZHRoOjE0cHg7IGRpc3BsYXk6aW5saW5lLWJsb2NrOyc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9e3s6fl9zdGFnZU5hbWUoKX19IHN0eWxlPSd3aWR0aDoyNHB4Oyc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz0nZS1hYm92ZUljb24gZS1pY29uTWFyZ2luIGUtaWNvbicgc3R5bGU9J3Bvc2l0aW9uOnJlbGF0aXZlO2Zsb2F0OnJpZ2h0O2Rpc3BsYXk6bm9uZTsnPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPSdlLWJlbG93SWNvbiBlLWljb25NYXJnaW4gZS1pY29uJyBzdHlsZT0ncG9zaXRpb246cmVsYXRpdmU7ZmxvYXQ6cmlnaHQ7ZGlzcGxheTpub25lOyc+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9J2UtY2hpbGRJY29uIGUtaWNvbk1hcmdpbiBlLWljb24nIHN0eWxlPSdwb3NpdGlvbjpyZWxhdGl2ZTtmbG9hdDpyaWdodDtkaXNwbGF5Om5vbmU7Jz48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz0nZS1jYW5jZWxJY29uIGUtaWNvbk1hcmdpbiBlLWljb24nIHN0eWxlPSdwb3NpdGlvbjpyZWxhdGl2ZTtmbG9hdDpyaWdodDtkaXNwbGF5Om5vbmU7Jz48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3tlbHNlIH5nZXRzdGF0ZSgpfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdlLWludGVuZHBhcmVudCc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9e3s6fl9zdGFnZU5hbWUoKX19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9J2UtYWJvdmVJY29uIGUtaWNvbk1hcmdpbiBlLWljb24nIHN0eWxlPSdwb3NpdGlvbjpyZWxhdGl2ZTtmbG9hdDpsZWZ0O2Rpc3BsYXk6bm9uZTsnPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPSdlLWJlbG93SWNvbiBlLWljb25NYXJnaW4gZS1pY29uJyBzdHlsZT0ncG9zaXRpb246cmVsYXRpdmU7ZmxvYXQ6bGVmdDtkaXNwbGF5Om5vbmU7Jz48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz0nZS1jaGlsZEljb24gZS1pY29uTWFyZ2luIGUtaWNvbicgc3R5bGU9J3Bvc2l0aW9uOnJlbGF0aXZlO2Zsb2F0OmxlZnQ7ZGlzcGxheTpub25lOyc+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9J2UtY2FuY2VsSWNvbiBlLWljb25NYXJnaW4gZS1pY29uJyBzdHlsZT0ncG9zaXRpb246cmVsYXRpdmU7ZmxvYXQ6bGVmdDtkaXNwbGF5Om5vbmU7Jz48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3svaWZ9fVxyXG4gICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7OiNkYXRhWydpY29uRGVmaW5pdGlvbiddfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2UtY2VsbCcgc3R5bGU9J2Rpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOjEwMCUnIHVuc2VsZWN0YWJsZT0nb24nPnt7OiNkYXRhWyduYW1lJ119fTwvZGl2PlxyXG5cdFx0XHQgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L3NjcmlwdD5gO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFNjcmlwdEZvckRyYWdEcm9wVGVtcGxhdGVIZWxwZXJzKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIGA8c2NyaXB0IHR5cGU9XCJ0ZXh0L2phdmFzY3JpcHRcIj5cclxuICAgICAgICAgICAgICAgICAgICAkLnZpZXdzLmhlbHBlcnMoeyBfc3RhZ2VOYW1lOiBnZXRTdGFnZU5hbWUgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJC52aWV3cy5oZWxwZXJzKHsgZ2V0c3RhdGU6IF9nZXRTdGF0ZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAkLnZpZXdzLmhlbHBlcnMoeyBpc0dyb3VwOiBfaXNHcm91cCB9KTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBfZ2V0U3RhdGUoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRhdGEucGFyZW50SXRlbSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBfaXNHcm91cCgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS5pc0dyb3VwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGdldFN0YWdlTmFtZSgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJvd0NsYXNzID0gXCJncmlkcm93SW5kZXhcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3h5ID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93Q2xhc3MgKz0gcHJveHkuZGF0YS5pbmRleC50b1N0cmluZygpICsgXCJsZXZlbFwiICsgcHJveHkuZGF0YS5sZXZlbC50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcm93Q2xhc3M7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIDwvc2NyaXB0PmA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRyb3BGb2N1c0xvc3QoYXJnczogRHJhZ0Ryb3BBcmdzKSB7XHJcbiAgICAgICAgdGhpcy5yZXNldEhpZ2hsaWdodEFyZWEoKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIaWdobGlnaHQgcm93cyB3aGVyZSBzaWduYWwgaXMgZHJhZ2dlZCBvdmVyIGFuZCBwb3NzaWJsZSB0byBiZSBkcm9wcGVkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7KElDaGFydE1hbmFnZXJDaGFydCB8IHVuZGVmaW5lZCl9IGNoYXJ0TWFuYWdlckNoYXJ0XHJcbiAgICAgKiBAcGFyYW0geyhTY2FsZSB8IHVuZGVmaW5lZCl9IHlBeGlzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaGlnaGxpZ2h0RHJvcHBhYmxlQXJlYXMoY2hhcnRNYW5hZ2VyQ2hhcnQ6IElDaGFydE1hbmFnZXJDaGFydCB8IHVuZGVmaW5lZCwgeUF4aXM6IFNjYWxlIHwgdW5kZWZpbmVkLCBjdXJyZW50VGFyZ2V0KXtcclxuICAgICAgICBpZiAoY2hhcnRNYW5hZ2VyQ2hhcnQgIT0gdW5kZWZpbmVkICYmIGNoYXJ0TWFuYWdlckNoYXJ0LmRyb3BQb3NzaWJsZSkge1xyXG4gICAgICAgICAgICBsZXQgYXJlYSA9IHRoaXMuZ2V0QXJlYVRvRnJvbUN1cnJlbnRUYXJnZXQoY3VycmVudFRhcmdldCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkSGlnaGxpZ2h0ZWRBcmVhKGFyZWEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh5QXhpcyAhPSB1bmRlZmluZWQgJiYgeUF4aXMuZHJvcFBvc3NpYmxlKSB7XHJcbiAgICAgICAgICAgIGxldCBhcmVhID0gdGhpcy5nZXRBcmVhVG9Gcm9tQ3VycmVudFRhcmdldChjdXJyZW50VGFyZ2V0KTtcclxuICAgICAgICAgICAgdGhpcy5hZGRIaWdobGlnaHRlZEFyZWEoYXJlYSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMucmVzZXRIaWdobGlnaHRBcmVhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYWRkSGlnaGxpZ2h0ZWRBcmVhKGFyZWEpIHtcclxuXHRcdGxldCBoaWdobGlnaHRFbGVtID0gJCgnPGRpdiBpZD1cIicrIHRoaXMuaGlnaGxpZ2h0QXJlYUlkICsnXCIgc3R5bGU9XCIgcG9pbnRlci1ldmVudHM6bm9uZTsgcG9zaXRpb246YWJzb2x1dGU7IFwiIGNsYXNzPVwiZHJhZ2dlZE92ZXJcIj48L2Rpdj4nKTtcclxuXHRcdHRoaXMucmVzZXRIaWdobGlnaHRBcmVhKGhpZ2hsaWdodEVsZW0pO1xyXG5cdFx0JChhcmVhKS5hcHBlbmQoaGlnaGxpZ2h0RWxlbSk7XHJcblxyXG5cdFx0aGlnaGxpZ2h0RWxlbS5jc3MoJ3RvcCcsIGFyZWEub2Zmc2V0VG9wKTtcclxuXHRcdGhpZ2hsaWdodEVsZW0uY3NzKCdsZWZ0JywgYXJlYS5vZmZzZXRMZWZ0KTtcclxuXHRcdGhpZ2hsaWdodEVsZW0uY3NzKCdoZWlnaHQnLCBhcmVhLm9mZnNldEhlaWdodCk7XHJcblx0XHRoaWdobGlnaHRFbGVtLmNzcygnd2lkdGgnLCBhcmVhLm9mZnNldFdpZHRoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEFyZWFUb0Zyb21DdXJyZW50VGFyZ2V0KGN1cnJlbnRUYXJnZXQpIHtcclxuICAgICAgICBsZXQgY2xhc3NlcyA9IGN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LnZhbHVlO1xyXG4gICAgICAgIGlmIChjbGFzc2VzLmluY2x1ZGVzKCdlLXJvd2NlbGwnKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gY3VycmVudFRhcmdldDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEFyZWFUb0Zyb21DdXJyZW50VGFyZ2V0KGN1cnJlbnRUYXJnZXQucGFyZW50RWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVzZXQgYWxsIGhpZ2hsaWdodGVkIGFyZXMgaW4gY2hhcnRNYW5hZ2VyIGV4Y2VwdCB0aGUgY2VsbCBiZWluZyBkcmFnZ2VkT3ZlclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0pRdWVyeTxIVE1MRWxlbWVudD59IFtlbGVtZW50XVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlc2V0SGlnaGxpZ2h0QXJlYSAoZWxlbWVudD86IEpRdWVyeTxIVE1MRWxlbWVudD4pIHtcclxuXHRcdGxldCBoaWdobGlnaHRFbGVtID0gJCgnIycgKyB0aGlzLmhpZ2hsaWdodEFyZWFJZCk7XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGhpZ2hsaWdodEVsZW0ubGVuZ3RoOyBpKyspe1xyXG5cdFx0XHRpZiAoZWxlbWVudCA9PSB1bmRlZmluZWQgfHwgaGlnaGxpZ2h0RWxlbVtpXSAhPSBlbGVtZW50WzBdKSB7XHJcblx0XHRcdFx0aGlnaGxpZ2h0RWxlbVtpXS5yZW1vdmUoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG4gICAgfVxyXG4gICAgLy8jZW5kcmVnaW9uIGRyb3Agc3VwcG9ydFxyXG59XHJcblxyXG5leHBvcnQgeyBDaGFydE1hbmFnZXJXaWRnZXR9OyJdfQ==