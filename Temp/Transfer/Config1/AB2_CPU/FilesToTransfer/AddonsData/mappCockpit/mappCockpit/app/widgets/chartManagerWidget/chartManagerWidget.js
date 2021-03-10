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
define(["require", "exports", "../common/treeGridWidgetBase", "./view/chartManagerTreeGridCellStyle", "./view/chartManagerTreeGridDragDrop", "./view/chartManagerTreeGridToolbar", "../../models/chartManagerDataModel/chartManagerChart", "../common/interfaces/dropInterface", "../../models/chartManagerDataModel/baseSeries", "../../models/chartManagerDataModel/scale", "../../models/chartManagerDataModel/chartManagerDataModel", "../common/imageProvider", "../chartViewWidget/chartViewWidget", "../chartViewWidget/helpers/chartDropHelper", "../common/SerieChartTypeHelper", "../../models/chartManagerDataModel/seriesType"], function (require, exports, treeGridWidgetBase_1, chartManagerTreeGridCellStyle_1, chartManagerTreeGridDragDrop_1, chartManagerTreeGridToolbar_1, chartManagerChart_1, dropInterface_1, baseSeries_1, scale_1, chartManagerDataModel_1, imageProvider_1, chartViewWidget_1, chartDropHelper_1, SerieChartTypeHelper_1, seriesType_1) {
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
            _super.prototype.addStyle.call(this, "widgets/chartManagerWidget/style/css/boilerPlateStyle.css");
        };
        /**
         * Creates the layout of the widget
         *
         * @memberof ChartManagerWidget
         */
        ChartManagerWidget.prototype.createLayout = function () {
            var $widgetContainer = $(this.cssParentContentId);
            $widgetContainer[0].style.overflow = "hidden";
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
        ChartManagerWidget.prototype.refresh = function (data) {
            try {
                this.setModel(data);
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
                this.eventDropHelper.raise(this, { hint: chartDropHelper_1.ChartDropHelperChangedHint.createXYSerie, data: data });
            }
            else if (series[0].type == seriesType_1.SeriesType.timeSeries && chart.chartType == chartManagerChart_1.ChartType.FFTChart) {
                this.eventDropHelper.raise(this, { hint: chartDropHelper_1.ChartDropHelperChangedHint.createFFTSerie, data: data });
            }
            else {
                this.eventDropHelper.raise(this, { hint: chartDropHelper_1.ChartDropHelperChangedHint.addSerie, data: data });
            }
            this.resetDraggedOverState();
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
            this.resetDraggedOverState();
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
            this.resetDraggedOverState();
            if (chartManagerChart != undefined && chartManagerChart.dropPossible) {
                var area = this.getAreaToFromCurrentTarget(currentTarget);
                this.addHighlightedArea(area);
                chartManagerChart.draggedOver = true;
            }
            else if (yAxis != undefined && yAxis.dropPossible) {
                var area = this.getAreaToFromCurrentTarget(currentTarget);
                this.addHighlightedArea(area);
                yAxis.draggedOver = true;
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
        ChartManagerWidget.prototype.resetDraggedOverState = function () {
            this._dataModel.data.forEach(function (chart) {
                chart.draggedOver = false;
                chart.childs.forEach(function (yAxis) {
                    yAxis.draggedOver = false;
                });
            });
        };
        ChartManagerWidget.nameColumnId = "name";
        ChartManagerWidget.additionalInfoColumnId = "additionalInfo";
        ChartManagerWidget.iconDefinitionColumnId = "iconDefinition";
        return ChartManagerWidget;
    }(treeGridWidgetBase_1.TreeGridWidgetBase));
    exports.ChartManagerWidget = ChartManagerWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRNYW5hZ2VyV2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0TWFuYWdlcldpZGdldC9jaGFydE1hbmFnZXJXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBb0JBO1FBQWlDLHNDQUFrQjtRQUFuRDtZQUFBLHFFQWdtQkM7WUE5bEJHLHFCQUFlLEdBQW9CLElBQUksaUNBQWUsRUFBRSxDQUFDO1lBS3hDLHFCQUFlLEdBQUcsMEJBQTBCLENBQUM7O1lBd2xCOUQseUJBQXlCO1FBQzdCLENBQUM7UUF0bEJHOzs7OztXQUtHO1FBQ0gsdUNBQVUsR0FBVixVQUFXLGlCQUF5QjtZQUVoQyxpQkFBTSxVQUFVLFlBQUMsaUJBQWlCLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDeEMsaUJBQU0sZ0JBQWdCLFlBQUMsUUFBUSxDQUFDLENBQUM7WUFFakMsOEJBQThCO1lBQzlCLGlCQUFNLGdCQUFnQixZQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUU5QiwwQ0FBMEM7WUFDMUMsZ0NBQWdDO1lBRWhDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyw4QkFBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNELENBQUM7UUFFRCxvQ0FBTyxHQUFQO1lBQ0ksSUFBSSxDQUFDLDZCQUE2QixDQUFDLDhCQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDMUQsaUJBQU0sT0FBTyxXQUFFLENBQUM7UUFDcEIsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSSx1Q0FBVSxHQUFqQjtZQUNJLGlCQUFNLFVBQVUsV0FBRSxDQUFDO1lBQ25CLGlCQUFNLFFBQVEsWUFBQywyREFBMkQsQ0FBQyxDQUFDO1FBQ2hGLENBQUM7UUFFRDs7OztXQUlHO1FBQ0gseUNBQVksR0FBWjtZQUNJLElBQUksZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxr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bnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2xpYnMvdWkvVHlwZXMvZWoud2ViLmFsbC5kLnRzXCIgLz5cclxuaW1wb3J0IHsgRXZlbnRNb2RlbENoYW5nZWRBcmdzLCBJRGF0YU1vZGVsIH0gZnJvbSBcIi4uLy4uL21vZGVscy9kYXRhTW9kZWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVHJlZUdyaWRXaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi90cmVlR3JpZFdpZGdldEJhc2VcIjtcclxuaW1wb3J0IHsgQ2hhcnRNYW5hZ2VyVHJlZUdyaWRDZWxsU3R5bGUgfSBmcm9tIFwiLi92aWV3L2NoYXJ0TWFuYWdlclRyZWVHcmlkQ2VsbFN0eWxlXCI7XHJcbmltcG9ydCB7IENoYXJ0TWFuYWdlclRyZWVHcmlkRHJhZ0Ryb3AgfSBmcm9tIFwiLi92aWV3L2NoYXJ0TWFuYWdlclRyZWVHcmlkRHJhZ0Ryb3BcIjtcclxuaW1wb3J0IHsgQ2hhcnRNYW5hZ2VyVHJlZUdyaWRUb29sYmFyIH0gZnJvbSBcIi4vdmlldy9jaGFydE1hbmFnZXJUcmVlR3JpZFRvb2xiYXJcIjtcclxuaW1wb3J0IHsgQ2hhcnRNYW5hZ2VyQ2hhcnQsIENoYXJ0VHlwZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2NoYXJ0TWFuYWdlckNoYXJ0XCI7XHJcbmltcG9ydCB7IElDaGFydE1hbmFnZXJDaGFydCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2ludGVyZmFjZXMvY2hhcnRNYW5hZ2VyQ2hhcnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSURyb3BwYWJsZSwgRHJhZ0Ryb3BEYXRhSWQgfSBmcm9tIFwiLi4vY29tbW9uL2ludGVyZmFjZXMvZHJvcEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvYmFzZVNlcmllc1wiO1xyXG5pbXBvcnQgeyBTY2FsZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL3NjYWxlXCI7XHJcbmltcG9ydCB7IElDaGFydE1hbmFnZXJEYXRhTW9kZWwgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9pbnRlcmZhY2VzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDaGFydE1hbmFnZXJEYXRhTW9kZWxDaGFuZ2VkSGludCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2NoYXJ0TWFuYWdlckRhdGFNb2RlbFwiO1xyXG5pbXBvcnQgeyBJbWFnZVByb3ZpZGVyIH0gZnJvbSBcIi4uL2NvbW1vbi9pbWFnZVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IERyYWdEcm9wQXJncyB9IGZyb20gXCIuLi9jb21tb24vZHJhZ0Ryb3BBcmdzXCI7XHJcbmltcG9ydCB7IEV2ZW50RHJvcEhlbHBlciB9IGZyb20gXCIuLi9jaGFydFZpZXdXaWRnZXQvY2hhcnRWaWV3V2lkZ2V0XCI7XHJcbmltcG9ydCB7IENoYXJ0RHJvcEhlbHBlckNoYW5nZWRIaW50IH0gZnJvbSBcIi4uL2NoYXJ0Vmlld1dpZGdldC9oZWxwZXJzL2NoYXJ0RHJvcEhlbHBlclwiO1xyXG5pbXBvcnQgeyBTZXJpZUNoYXJ0VHlwZUhlbHBlciB9IGZyb20gXCIuLi9jb21tb24vU2VyaWVDaGFydFR5cGVIZWxwZXJcIjtcclxuaW1wb3J0IHsgU2VyaWVzVHlwZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL3Nlcmllc1R5cGVcIjtcclxuXHJcbmNsYXNzIENoYXJ0TWFuYWdlcldpZGdldCBleHRlbmRzIFRyZWVHcmlkV2lkZ2V0QmFzZSBpbXBsZW1lbnRzIElEcm9wcGFibGUge1xyXG5cclxuICAgIGV2ZW50RHJvcEhlbHBlcjogRXZlbnREcm9wSGVscGVyID0gbmV3IEV2ZW50RHJvcEhlbHBlcigpO1xyXG4gICAgXHJcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBuYW1lQ29sdW1uSWQgPSBcIm5hbWVcIjtcclxuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IGFkZGl0aW9uYWxJbmZvQ29sdW1uSWQgPSBcImFkZGl0aW9uYWxJbmZvXCI7XHJcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBpY29uRGVmaW5pdGlvbkNvbHVtbklkID0gXCJpY29uRGVmaW5pdGlvblwiO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBoaWdobGlnaHRBcmVhSWQgPSBcImNoYXJ0TWFuYWdlcl9IaWdobGlnaHRlZFwiO1xyXG5cclxuICAgIHByaXZhdGUgX3Rvb2xiYXIhOiBDaGFydE1hbmFnZXJUcmVlR3JpZFRvb2xiYXI7XHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemVzIHRoZSBjaGFydCBtYW5hZ2VyIFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYXlvdXRDb250YWluZXJJZFxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBpbml0aWFsaXplKGxheW91dENvbnRhaW5lcklkOiBzdHJpbmcpIHtcclxuXHJcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZShsYXlvdXRDb250YWluZXJJZCwgMzApO1xyXG4gICAgICAgIHN1cGVyLnNldEhlYWRlckNvbnRlbnQoXCJDaGFydHNcIik7XHJcblxyXG4gICAgICAgIC8vIFNldCBkeW5hbWljIGNvbHVtbiBzZXR0aW5nc1xyXG4gICAgICAgIHN1cGVyLnNldER5bmFtaWNDb2x1bW4oMCwgODApO1xyXG5cclxuICAgICAgICAvLyBIaWRlIHRoZSBjb2x1bW4gaGVhZGVyIG9mIHRoZSB0cmVlIGdyaWRcclxuICAgICAgICAvL3N1cGVyLnNldENvbHVtbkhlYWRlckhpZGRlbigpO1xyXG5cclxuICAgICAgICB0aGlzLmFkZFN1cHBvcnRlZERyYWdEcm9wRGF0YUlkKERyYWdEcm9wRGF0YUlkLnNpZ25hbCk7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzcG9zZSgpIHtcclxuICAgICAgICB0aGlzLnJlbW92ZVN1cHBvcnRlZERyYWdEcm9wRGF0YUlkKERyYWdEcm9wRGF0YUlkLnNpZ25hbCk7XHJcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZHMgdGhlIHN0eWxlcyBmb3IgdGhlIGNoYXJ0IG1hbmFnZXIgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9hZFN0eWxlcygpIHtcclxuICAgICAgICBzdXBlci5sb2FkU3R5bGVzKCk7XHJcbiAgICAgICAgc3VwZXIuYWRkU3R5bGUoXCJ3aWRnZXRzL2NoYXJ0TWFuYWdlcldpZGdldC9zdHlsZS9jc3MvYm9pbGVyUGxhdGVTdHlsZS5jc3NcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBsYXlvdXQgb2YgdGhlIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgY3JlYXRlTGF5b3V0KCkge1xyXG4gICAgICAgIHZhciAkd2lkZ2V0Q29udGFpbmVyID0gJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCk7XHJcbiAgICAgICAgJHdpZGdldENvbnRhaW5lclswXS5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGVzIHRoZSBtb2RlbCBjaGFuZ2VzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJRGF0YU1vZGVsfSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7RXZlbnRNb2RlbENoYW5nZWRBcmdzfSBldmVudEFyZ3NcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBoYW5kbGVNb2RlbENoYW5nZWQoc2VuZGVyOiBJRGF0YU1vZGVsLCBldmVudEFyZ3M6IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyk6IGFueSB7XHJcbiAgICAgICAgaWYgKGV2ZW50QXJncy5oaW50ICE9IENoYXJ0TWFuYWdlckRhdGFNb2RlbENoYW5nZWRIaW50LnVwZGF0ZVNjYWxlUmFuZ2UpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoKGV2ZW50QXJncy5kYXRhLmRhdGEpO1xyXG4gICAgICAgICAgICB2YXIgdHJlZWdyaWRPYmogPSB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCk7XHJcbiAgICAgICAgICAgIGlmICgoPGFueT50cmVlZ3JpZE9iai5tb2RlbCkuc2VsZWN0ZWRSb3dJbmRleCA9PSAtMSkgeyAvLyBUT0RPOiBzZWxlY3RlZEl0ZW0gIT0gdW5kZWZpbmVkIGJ1dCBzZWxlY3RlZFJvd0luZGV4ID09IC0xICEhIVxyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVUb29sYmFyQnV0dG9uU3RhdGVzKGV2ZW50QXJncy5kYXRhLmRhdGEsIHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVRvb2xiYXJCdXR0b25TdGF0ZXMoZXZlbnRBcmdzLmRhdGEuZGF0YSwgKDxhbnk+dHJlZWdyaWRPYmoubW9kZWwpLnNlbGVjdGVkSXRlbS5pdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIGNvbHVtbiB0ZW1wbGF0ZXMgZm9yIHRoZSB0cmVlIGdyaWQgYW5kIGFkZHMgdGhlbSB0byB0aGUgd2lkZ2V0IGNvbnRhaW5lclxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZUNvbHVtblRlbXBsYXRlcygpIHtcclxuICAgICAgICB2YXIgJHdpZGdldENvbnRhaW5lciA9ICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpO1xyXG4gICAgICAgICR3aWRnZXRDb250YWluZXIuYXBwZW5kKHRoaXMuZ2V0U2NyaXB0Rm9yRHJhZ0Ryb3BUZW1wbGF0ZUhlbHBlcnMoKSk7XHJcbiAgICAgICAgJHdpZGdldENvbnRhaW5lci5hcHBlbmQodGhpcy5nZXRDb2x1bW5UZW1wbGF0ZURhdGEoQ2hhcnRNYW5hZ2VyV2lkZ2V0Lm5hbWVDb2x1bW5JZCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY3JlYXRlcyB0aGUgdHJlZSBncmlkIGZvciB0aGUgY2hhcnRtYW5hZ2VyXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZVRyZWVHcmlkKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9kYXRhTW9kZWwgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhcImRhdGFNb2RlbCB1bmRlZmluZWQhXCIpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGNlbGxTdHlsZSA9IG5ldyBDaGFydE1hbmFnZXJUcmVlR3JpZENlbGxTdHlsZSgpO1xyXG4gICAgICAgICg8YW55PiQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpKS5lalRyZWVHcmlkKHtcclxuICAgICAgICAgICAgLi4udGhpcy5nZXRUcmVlR3JpZENvbHVtbkRlZmluaXRpb24oKSxcclxuICAgICAgICAgICAgLi4udGhpcy5nZXRUcmVlR3JpZENvbHVtblJlc2l6ZVN1cHBvcnQoKSxcclxuICAgICAgICAgICAgLi4udGhpcy5nZXRUcmVlR3JpZFRvb2xiYXJTdXBwb3J0KCksXHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWREcmFnRHJvcFN1cHBvcnQoKSxcclxuXHJcbiAgICAgICAgICAgIGRhdGFTb3VyY2U6IHRoaXMuX2RhdGFNb2RlbC5kYXRhLFxyXG4gICAgICAgICAgICBjaGlsZE1hcHBpbmc6IFwiY2hpbGRzXCIsXHJcbiAgICAgICAgICAgIGlkTWFwcGluZzogQ2hhcnRNYW5hZ2VyV2lkZ2V0Lm5hbWVDb2x1bW5JZCxcclxuICAgICAgICAgICAgZXhwYW5kU3RhdGVNYXBwaW5nOiBcImV4cGFuZFN0YXRlXCIsXHJcbiAgICAgICAgICAgIGlzUmVzcG9uc2l2ZTogdHJ1ZSxcclxuICAgICAgICAgICAgcm93SGVpZ2h0OiAyOCxcclxuICAgICAgICAgICAgLy8gU2V0IGluaXQgc2l6ZSB0byBkcmF3IHRoZSB0b29sYmFyIGljb25zIGF0IHRoZSByaWdodCBwb3NpdGlvblxyXG4gICAgICAgICAgICBzaXplU2V0dGluZ3M6IHsgaGVpZ2h0OiAnNDAwcHgnLCB3aWR0aDogJzQwMHB4JywgfSxcclxuXHJcbiAgICAgICAgICAgIGV4cGFuZGVkOiAoYXJncykgPT4gdGhpcy50cmVlR3JpZE5vZGVFeHBhbmRlZE9yQ29sbGFwc2VkKCksXHJcbiAgICAgICAgICAgIGNvbGxhcHNlZDogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWROb2RlRXhwYW5kZWRPckNvbGxhcHNlZCgpLFxyXG5cclxuICAgICAgICAgICAgcm93U2VsZWN0ZWQ6IChhcmdzKSA9PiB0aGlzLnVwZGF0ZVRvb2xiYXJCdXR0b25TdGF0ZXMoYXJncy5tb2RlbC5kYXRhU291cmNlLCBhcmdzLmRhdGEuaXRlbSksXHJcbiAgICAgICAgICAgIGNyZWF0ZTogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWRDcmVhdGVkKCksXHJcbiAgICAgICAgICAgIGFjdGlvbkJlZ2luOiAoYXJncykgPT4gdGhpcy50cmVlR3JpZEFjdGlvbkJlZ2luKGFyZ3MpLFxyXG4gICAgICAgICAgICBhY3Rpb25Db21wbGV0ZTogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWRBY3Rpb25Db21wbGV0ZShhcmdzKSxcclxuICAgICAgICAgICAgcXVlcnlDZWxsSW5mbzogKGFyZ3MpID0+IGNlbGxTdHlsZS5zZXRDZWxsU3R5bGUoYXJncyksXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRyZWVHcmlkTm9kZUV4cGFuZGVkT3JDb2xsYXBzZWQoKSB7XHJcbiAgICAgICAgLy8gUmVmcmVzaCB0byBzZWUgY29ycmVjdCBleHBhbmRlZC9jb2xsYXBzZWQgaWNvblxyXG4gICAgICAgIHRoaXMucmVmcmVzaCh0aGlzLmRhdGFNb2RlbC5kYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCBjb2x1bW4gZGVmaW5pdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCk6IHt9IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjb2x1bW5zOiBbXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBDaGFydE1hbmFnZXJXaWRnZXQubmFtZUNvbHVtbklkLCBoZWFkZXJUZXh0OiBcIk5hbWVcIiwgaXNUZW1wbGF0ZUNvbHVtbjogdHJ1ZSwgdGVtcGxhdGVJRDogXCJjbU5hbWVDb2x1bW5UZW1wbGF0ZVwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBDaGFydE1hbmFnZXJXaWRnZXQuYWRkaXRpb25hbEluZm9Db2x1bW5JZCwgaGVhZGVyVGV4dDogXCJcIiwgd2lkdGg6IFwiMTQwcHhcIiB9LFxyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogQ2hhcnRNYW5hZ2VyV2lkZ2V0Lmljb25EZWZpbml0aW9uQ29sdW1uSWQsIHZpc2libGU6IGZhbHNlLCB3aWR0aDogXCIwcHhcIiB9LFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgY29sdW1uIHJlc2l6ZSBzZXR0aW5nc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VHJlZUdyaWRDb2x1bW5SZXNpemVTdXBwb3J0KCk6IHt9IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBhbGxvd0NvbHVtblJlc2l6ZTogdHJ1ZSxcclxuICAgICAgICAgICAgY29sdW1uUmVzaXplU2V0dGluZ3M6IHsgY29sdW1uUmVzaXplTW9kZTogZWouVHJlZUdyaWQuQ29sdW1uUmVzaXplTW9kZS5GaXhlZENvbHVtbnMgfSxcclxuICAgICAgICAgICAgY29sdW1uUmVzaXplZDogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWRDb2x1bW5SZXNpemVkKGFyZ3MpLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBIHRyZWVncmlkIGNvbHVtbiB3YXMgcmVzaXplZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB0cmVlR3JpZENvbHVtblJlc2l6ZWQoYXJncykge1xyXG4gICAgICAgIHN1cGVyLnJlc2l6ZUR5bmFtaWNDb2x1bW4oYXJncy5jb2x1bW5JbmRleCwgYXJncy5tb2RlbCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgdG9vbGJhciBzZXR0aW5nc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VHJlZUdyaWRUb29sYmFyU3VwcG9ydCgpOiB7fSB7XHJcbiAgICAgICAgdGhpcy5fdG9vbGJhciA9IG5ldyBDaGFydE1hbmFnZXJUcmVlR3JpZFRvb2xiYXIodGhpcy5jc3NQYXJlbnRDb250ZW50SWQsIHRoaXMuX2RhdGFNb2RlbCBhcyBJQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0b29sYmFyU2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgIHNob3dUb29sYmFyOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tVG9vbGJhckl0ZW1zOiB0aGlzLl90b29sYmFyLmdldEN1c3RvbVRvb2xiYXJzKCksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRvb2xiYXJDbGljazogKGFyZ3MpID0+IHRoaXMuX3Rvb2xiYXIudG9vbGJhckNsaWNrKGFyZ3MpLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRUcmVlR3JpZERyYWdEcm9wU3VwcG9ydCgpOiB7fSB7XHJcbiAgICAgICAgdmFyIGRyYWdEcm9wID0gbmV3IENoYXJ0TWFuYWdlclRyZWVHcmlkRHJhZ0Ryb3AoKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBhbGxvd0RyYWdBbmREcm9wOiB0cnVlLFxyXG4gICAgICAgICAgICByb3dEcmFnU3RhcnQ6IChhcmdzKSA9PiBkcmFnRHJvcC5yb3dEcmFnU3RhcnQoYXJncyksXHJcbiAgICAgICAgICAgIHJvd0RyYWc6IChhcmdzKSA9PiBkcmFnRHJvcC5yb3dEcmFnKGFyZ3MpLFxyXG4gICAgICAgICAgICByb3dEcm9wQWN0aW9uQmVnaW46IChhcmdzKSA9PiBkcmFnRHJvcC5yb3dEcm9wQWN0aW9uQmVnaW4oYXJncywgdGhpcy5fZGF0YU1vZGVsIGFzIElDaGFydE1hbmFnZXJEYXRhTW9kZWwpLFxyXG4gICAgICAgICAgICByb3dEcmFnU3RvcDogKGFyZ3MpID0+IGRyYWdEcm9wLnJvd0RyYWdTdG9wKGFyZ3MsIHRoaXMuX2RhdGFNb2RlbCBhcyBJQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsKSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdHJlZUdyaWRDcmVhdGVkKCkge1xyXG4gICAgICAgIC8vIFNldHMgdGhlIGN1c3RvbSB0b29sYmFyIGljb25zXHJcbiAgICAgICAgdGhpcy5fdG9vbGJhci5zZXRTdHlsZUZvclRvb2xiYXJJY29ucygpO1xyXG5cclxuICAgICAgICAvLyBBdCB0aGUgYmVnaW5uaW5nIHRoZSBkZWxldGUgYnV0dG9uIGlzIGRpc2FibGVkIGJlY2F1c2Ugbm8gc2VsZWN0aW9uIGlzIGF2YWlsYWJsZVxyXG4gICAgICAgIHRoaXMuX3Rvb2xiYXIuZGlzYWJsZURlbGV0ZUJ1dHRvbih0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRyZWVHcmlkQWN0aW9uQmVnaW4oYXJncykge1xyXG4gICAgICAgIC8vIFN1cHBvcnQgXCJFbnRmL0RlbFwiIGtleVxyXG4gICAgICAgIGlmIChhcmdzLnJlcXVlc3RUeXBlID09IFwiZGVsZXRlXCIpIHtcclxuICAgICAgICAgICAgYXJncy5jYW5jZWwgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAoYXJncy5kZWxldGVkSXRlbXNbMF0uaXRlbSBpbnN0YW5jZW9mIENoYXJ0TWFuYWdlckNoYXJ0KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgY2hhcnQgZnJvbSBkYXRhbW9kZWxcclxuICAgICAgICAgICAgICAgICg8YW55PnRoaXMuX2RhdGFNb2RlbCkhLnJlbW92ZUNoYXJ0KGFyZ3MuZGVsZXRlZEl0ZW1zWzBdLml0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGFyZ3MuZGVsZXRlZEl0ZW1zWzBdLml0ZW0gaW5zdGFuY2VvZiBCYXNlU2VyaWVzKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2hhcnQ6IElDaGFydE1hbmFnZXJDaGFydCB8IHVuZGVmaW5lZCA9IGFyZ3MuZGVsZXRlZEl0ZW1zWzBdLnBhcmVudEl0ZW0ucGFyZW50SXRlbS5pdGVtO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoYXJ0ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBzZXJpZSBmcm9tIGRhdGFtb2RlbFxyXG4gICAgICAgICAgICAgICAgICAgICg8YW55PnRoaXMuX2RhdGFNb2RlbCkhLnJlbW92ZVNlcmllKGNoYXJ0LCBhcmdzLmRlbGV0ZWRJdGVtc1swXS5pdGVtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChhcmdzLmRlbGV0ZWRJdGVtc1swXS5pdGVtIGluc3RhbmNlb2YgU2NhbGUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjaGFydDogSUNoYXJ0TWFuYWdlckNoYXJ0IHwgdW5kZWZpbmVkID0gYXJncy5kZWxldGVkSXRlbXNbMF0ucGFyZW50SXRlbS5pdGVtO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoYXJ0ICE9IHVuZGVmaW5lZCAmJiBjaGFydC5jYW5SZW1vdmVZQXhpcygpID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBSZW1vdmUgeUF4aXMgZnJvbSBkYXRhbW9kZWxcclxuICAgICAgICAgICAgICAgICAgICAoPGFueT50aGlzLl9kYXRhTW9kZWwpIS5yZW1vdmVZQXhpcyhjaGFydCwgYXJncy5kZWxldGVkSXRlbXNbMF0uaXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0cmVlR3JpZEFjdGlvbkNvbXBsZXRlKGFyZ3MpIHtcclxuICAgICAgICAvLyBFdmVudCB0cmlnZ2VyIHdoaWxlIGNoYW5naW5nIGRhdGFzb3VyY2UgZHluYW1pY2FsbHkuIFxyXG4gICAgICAgIC8vIGNvZGUgdG8gZG9uZSBhZnRlciB0aGUgZHluYW1pYyBjaGFuZ2Ugb2YgZGF0YXNvdXJjZS4gXHJcbiAgICAgICAgaWYgKGFyZ3MucmVxdWVzdFR5cGUgPT09ICdyZWZyZXNoRGF0YVNvdXJjZScpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoU2VsZWN0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVmcmVzaChkYXRhOiBJQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdGhpcy5zZXRNb2RlbChkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhcIkNoYXJ0TWFuYWdlciByZWZyZXNoIGVycm9yISA9PiBUcmVlR3JpZCByZWNyZWF0aW9uIVwiKTtcclxuICAgICAgICAgICAgY29uc29sZS5pbmZvKGUpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVUcmVlR3JpZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlZnJlc2hTZWxlY3Rpb24oKSB7XHJcbiAgICAgICAgY29uc3QgdHJlZU9iaiA9ICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpLmVqVHJlZUdyaWQoJ2luc3RhbmNlJyk7XHJcblxyXG4gICAgICAgIC8vIEdldCBhY3R1YWwgc2VsZWN0aW9uIGluZGV4XHJcbiAgICAgICAgbGV0IGFjdHVhbFNlbGVjdGVkUm93SW5kZXggPSB0cmVlT2JqLm1vZGVsLnNlbGVjdGVkUm93SW5kZXg7XHJcbiAgICAgICAgLy8gUmVzZXQgc2VsZWN0aW9uXHJcbiAgICAgICAgdHJlZU9iai5tb2RlbC5zZWxlY3RlZFJvd0luZGV4ID0gLTE7XHJcblxyXG4gICAgICAgIC8vIFNldCB0byBsYXN0IGluZGV4IGlmIGluZGV4IGlzIG91dCBvZiByYW5nZVxyXG4gICAgICAgIGlmIChhY3R1YWxTZWxlY3RlZFJvd0luZGV4ID49IHRyZWVPYmoubW9kZWwuZmxhdFJlY29yZHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGFjdHVhbFNlbGVjdGVkUm93SW5kZXggPSB0cmVlT2JqLm1vZGVsLmZsYXRSZWNvcmRzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFNldCBzZWxlY3Rpb25cclxuICAgICAgICB0cmVlT2JqLm1vZGVsLnNlbGVjdGVkUm93SW5kZXggPSBhY3R1YWxTZWxlY3RlZFJvd0luZGV4O1xyXG5cclxuICAgICAgICAvLyB1cGRhdGUgdG9vbGJhciBidXR0b25zXHJcbiAgICAgICAgaWYgKHRyZWVPYmoubW9kZWwuZmxhdFJlY29yZHNbYWN0dWFsU2VsZWN0ZWRSb3dJbmRleF0gIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVG9vbGJhckJ1dHRvblN0YXRlcyh0cmVlT2JqLm1vZGVsLmRhdGFTb3VyY2UsIHRyZWVPYmoubW9kZWwuZmxhdFJlY29yZHNbYWN0dWFsU2VsZWN0ZWRSb3dJbmRleF0uaXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlVG9vbGJhckJ1dHRvblN0YXRlcyhjaGFydHM6IEFycmF5PElDaGFydE1hbmFnZXJDaGFydD4sIHNlbGVjdGVkSXRlbSkge1xyXG4gICAgICAgIGlmIChjaGFydHMubGVuZ3RoID09IDAgfHwgc2VsZWN0ZWRJdGVtID09IHVuZGVmaW5lZCB8fCAoc2VsZWN0ZWRJdGVtIGluc3RhbmNlb2YgU2NhbGUgJiYgc2VsZWN0ZWRJdGVtLnBhcmVudC5jYW5SZW1vdmVZQXhpcygpID09IGZhbHNlKSkge1xyXG4gICAgICAgICAgICB0aGlzLl90b29sYmFyLmRpc2FibGVEZWxldGVCdXR0b24odHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl90b29sYmFyLmRpc2FibGVEZWxldGVCdXR0b24oZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoKDxhbnk+dGhpcy5fZGF0YU1vZGVsKS5jYW5BZGRDaGFydCgpIHx8IChzZWxlY3RlZEl0ZW0gaW5zdGFuY2VvZiBDaGFydE1hbmFnZXJDaGFydCAmJiBzZWxlY3RlZEl0ZW0uY2FuQWRkWUF4aXMoKSkpIHtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbGJhci5kaXNhYmxlQWRkQnV0dG9uKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2xiYXIuZGlzYWJsZUFkZEJ1dHRvbih0cnVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3Rvb2xiYXIuc2V0U2VsZWN0ZWRDaGFydChzZWxlY3RlZEl0ZW0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyNyZWdpb24gZHJvcCBzdXBwb3J0XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGFsbCBwb3NzaWJsZSBkcm9wTG9jYXRpb25zXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8QmFzZVNlcmllcz59IHNlcmllc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZERyb3BMb2NhdGlvbnMoc2VyaWVzOiBBcnJheTxCYXNlU2VyaWVzPikge1xyXG4gICAgICAgIC8vIEFkZCBwb3NzaWJsZSBkcm9wIGxvY2F0aW9uc1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgYWxsIGRyb3AgbG9jYXRpb25zXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8QmFzZVNlcmllcz59IHNlcmllc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlbW92ZURyb3BMb2NhdGlvbnMoc2VyaWVzOiBBcnJheTxCYXNlU2VyaWVzPikge1xyXG4gICAgICAgIHRoaXMuX2RhdGFNb2RlbC5kYXRhLmZvckVhY2goY2hhcnQgPT4ge1xyXG4gICAgICAgICAgICBjaGFydC5kcm9wUG9zc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgY2hhcnQuY2hpbGRzLmZvckVhY2goeUF4aXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgeUF4aXMuZHJvcFBvc3NpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhZ1N0YXJ0KGFyZ3M6IERyYWdEcm9wQXJncykge1xyXG4gICAgICAgIGxldCBzZXJpZSA9IGFyZ3MuZGF0YSBhcyBBcnJheTxCYXNlU2VyaWVzPjtcclxuXHJcbiAgICAgICAgLy8gQWRkIHBvc3NpYmxlIGRyb3BMb2NhdGlvbnNcclxuICAgICAgICB0aGlzLmFkZERyb3BMb2NhdGlvbnMoc2VyaWUpO1xyXG5cclxuICAgICAgICAvLyBVcGRhdGUgdHJlZUdyaWRcclxuICAgICAgICB0aGlzLnJlZnJlc2godGhpcy5fZGF0YU1vZGVsLmRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYWdTdG9wKGFyZ3M6IERyYWdEcm9wQXJncykge1xyXG4gICAgICAgIGxldCBzZXJpZSA9IGFyZ3MuZGF0YSBhcyBBcnJheTxCYXNlU2VyaWVzPjtcclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIHBvc3NpYmxlIGRyb3BMb2NhdGlvbnNcclxuICAgICAgICB0aGlzLnJlbW92ZURyb3BMb2NhdGlvbnMoc2VyaWUpO1xyXG5cclxuICAgICAgICAvLyBVcGRhdGUgdHJlZUdyaWRcclxuICAgICAgICB0aGlzLnJlZnJlc2godGhpcy5fZGF0YU1vZGVsLmRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYWdPdmVyKGFyZ3M6IERyYWdEcm9wQXJncyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBzZXJpZXMgPSBhcmdzLmRhdGEgYXMgQXJyYXk8QmFzZVNlcmllcz47XHJcblxyXG4gICAgICAgIGxldCBkcm9wUG9zc2libGUgPSBmYWxzZTtcclxuICAgICAgICBsZXQgY2hhcnQgPSB0aGlzLmdldENoYXJ0RnJvbURyYWdMb2NhdGlvbihhcmdzLmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgICAgIGxldCB5QXhpcyA9IHRoaXMuZ2V0WUF4aXNGcm9tRHJhZ0xvY2F0aW9uKGFyZ3MuY3VycmVudFRhcmdldCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGNoYXJ0ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBpZiAoY2hhcnQuZHJvcFBvc3NpYmxlID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGRyb3BQb3NzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJncy5kcmFnRHJvcFJlcHJlc2VudGF0aW9uICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBhZGROZXdTY2FsZUltYWdlID0gSW1hZ2VQcm92aWRlci5nZXRJbnN0YW5jZSgpLmdldEltYWdlKFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9kcmFnRHJvcC9hZGROZXdTY2FsZS5zdmdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJncy5kcmFnRHJvcFJlcHJlc2VudGF0aW9uLmljb25MaXN0LnB1c2goYWRkTmV3U2NhbGVJbWFnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VyaWVzWzBdLnR5cGUgPT09IFNlcmllc1R5cGUudGltZVNlcmllcyAmJiBjaGFydC5jaGFydFR5cGUgPT0gQ2hhcnRUeXBlLkZGVENoYXJ0ICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLmRyYWdEcm9wUmVwcmVzZW50YXRpb24udGV4dExpc3RbMF0gPSBcIkNhbGN1bGF0ZSBGRlQgc2luZ2FsIGFuZCBhZGQgaXQgdG8gbmV3IHNjYWxlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLmRyYWdEcm9wUmVwcmVzZW50YXRpb24udGV4dExpc3RbMF0gPSBcIkNyZWF0ZSBhIG5ldyBzY2FsZSBhbmQgYWRkIGRyYWdnZWQgc2lnbmFsc1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh5QXhpcyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgaWYgKHlBeGlzLmRyb3BQb3NzaWJsZSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBkcm9wUG9zc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFyZ3MuZHJhZ0Ryb3BSZXByZXNlbnRhdGlvbiAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYWRkTmV3U2NhbGVJbWFnZTtcclxuICAgICAgICAgICAgICAgICAgICAvL1hZIGNoYXJ0IGV4Y2VwdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh5QXhpcy5wYXJlbnQuY2hhcnRUeXBlID09IENoYXJ0VHlwZS5YWUNoYXJ0KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkTmV3U2NhbGVJbWFnZSA9IEltYWdlUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXRJbWFnZShcIi4uL2FwcC93aWRnZXRzL2NvbW1vbi9zdHlsZS9pbWFnZXMvZHJhZ0Ryb3AvYXNzaWduVG9DaGFydC5zdmdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlcmllc1swXS50eXBlID09IFNlcmllc1R5cGUudGltZVNlcmllcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5kcmFnRHJvcFJlcHJlc2VudGF0aW9uLnRleHRMaXN0WzBdID0gXCJDYWxjdWxhdGUgWFkgc2lnbmFsIGFuZCBhZGQgaXQgdG8gdGhlIGNoYXJ0XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzLmRyYWdEcm9wUmVwcmVzZW50YXRpb24udGV4dExpc3RbMF0gPSBcIkFkZCBkcmFnZ2VkIHNpZ25hbHMgdG8gY2hhcnRcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSAgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHlBeGlzLnBhcmVudC5jaGFydFR5cGUgPT0gQ2hhcnRUeXBlLkZGVENoYXJ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZE5ld1NjYWxlSW1hZ2UgPSBJbWFnZVByb3ZpZGVyLmdldEluc3RhbmNlKCkuZ2V0SW1hZ2UoXCIuLi9hcHAvd2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL2RyYWdEcm9wL2Fzc2lnblRvU2NhbGUuc3ZnXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLmRyYWdEcm9wUmVwcmVzZW50YXRpb24udGV4dExpc3RbMF0gPSBcIkNhbGN1bGF0ZSBGRlQgc2lnbmFsIGFuZCBhZGQgaXQgdG8gc2NhbGVcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZE5ld1NjYWxlSW1hZ2UgPSBJbWFnZVByb3ZpZGVyLmdldEluc3RhbmNlKCkuZ2V0SW1hZ2UoXCIuLi9hcHAvd2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL2RyYWdEcm9wL2Fzc2lnblRvU2NhbGUuc3ZnXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLmRyYWdEcm9wUmVwcmVzZW50YXRpb24udGV4dExpc3RbMF0gPSBcIkFkZCBkcmFnZ2VkIHNpZ25hbHMgdG8gc2NhbGVcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYXJncy5kcmFnRHJvcFJlcHJlc2VudGF0aW9uLmljb25MaXN0LnB1c2goYWRkTmV3U2NhbGVJbWFnZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5oaWdobGlnaHREcm9wcGFibGVBcmVhcyhjaGFydCwgeUF4aXMsIGFyZ3MuY3VycmVudFRhcmdldCk7XHJcbiAgICAgICAgcmV0dXJuIGRyb3BQb3NzaWJsZTtcclxuICAgIH1cclxuXHJcbiAgICBkcm9wKGFyZ3M6IERyYWdEcm9wQXJncykge1xyXG4gICAgICAgIGxldCBzZXJpZXMgPSBhcmdzLmRhdGEgYXMgQXJyYXk8QmFzZVNlcmllcz47XHJcblxyXG4gICAgICAgIGxldCBjaGFydCA9IHRoaXMuZ2V0Q2hhcnRGcm9tRHJhZ0xvY2F0aW9uKGFyZ3MuY3VycmVudFRhcmdldCk7XHJcbiAgICAgICAgbGV0IHlBeGlzID0gdGhpcy5nZXRZQXhpc0Zyb21EcmFnTG9jYXRpb24oYXJncy5jdXJyZW50VGFyZ2V0KTtcclxuXHJcbiAgICAgICAgaWYgKHlBeGlzICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBjaGFydCA9IHlBeGlzLnBhcmVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHNlcmllQ2hhcnRUeXBlSGVscGVyID0gbmV3IFNlcmllQ2hhcnRUeXBlSGVscGVyKCk7XHJcbiAgICAgICAgc2VyaWVzID0gc2VyaWVDaGFydFR5cGVIZWxwZXIuZ2V0RHJvcHBhYmxlU2VyaWVzKGNoYXJ0IS5nZXRBbGxTZXJpZXMoKSxzZXJpZXMpO1xyXG5cclxuICAgICAgICBsZXQgZGF0YSA9IHtcclxuICAgICAgICAgICAgY2hhcnQ6IGNoYXJ0LFxyXG4gICAgICAgICAgICB5QXhpczogeUF4aXMsXHJcbiAgICAgICAgICAgIHNlcmllczogc2VyaWVzXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3JhaXNlIGV2ZW50IHRvIHRyYWNlVmlld1dpZGdldFxyXG4gICAgICAgIGlmIChzZXJpZXNbMF0udHlwZSA9PSBTZXJpZXNUeXBlLnRpbWVTZXJpZXMgJiYgY2hhcnQhLmNoYXJ0VHlwZSA9PSBDaGFydFR5cGUuWFlDaGFydCkge1xyXG4gICAgICAgICAgICB0aGlzLmV2ZW50RHJvcEhlbHBlci5yYWlzZSh0aGlzLCB7aGludDogQ2hhcnREcm9wSGVscGVyQ2hhbmdlZEhpbnQuY3JlYXRlWFlTZXJpZSwgZGF0YTogZGF0YSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoc2VyaWVzWzBdLnR5cGUgPT0gU2VyaWVzVHlwZS50aW1lU2VyaWVzICYmIGNoYXJ0IS5jaGFydFR5cGUgPT0gQ2hhcnRUeXBlLkZGVENoYXJ0KXtcclxuICAgICAgICAgICAgdGhpcy5ldmVudERyb3BIZWxwZXIucmFpc2UodGhpcywge2hpbnQ6IENoYXJ0RHJvcEhlbHBlckNoYW5nZWRIaW50LmNyZWF0ZUZGVFNlcmllLCBkYXRhOiBkYXRhIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5ldmVudERyb3BIZWxwZXIucmFpc2UodGhpcywge2hpbnQ6IENoYXJ0RHJvcEhlbHBlckNoYW5nZWRIaW50LmFkZFNlcmllLCBkYXRhOiBkYXRhIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlc2V0RHJhZ2dlZE92ZXJTdGF0ZSgpO1xyXG4gICAgICAgIHRoaXMucmVzZXRIaWdobGlnaHRBcmVhKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRDaGFydEZyb21EcmFnTG9jYXRpb24oY3VycmVudFRhcmdldCk6IElDaGFydE1hbmFnZXJDaGFydCB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgbGV0IGNsYXNzZXMgPSBjdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC52YWx1ZTtcclxuICAgICAgICAvL2F2b2lkIGRyb3BwaW5nIHNlcmllIGluIG5vdCBoaWdobGlnaHRlZCBhcmVhXHJcbiAgICAgICAgaWYgKCFjbGFzc2VzLmluY2x1ZGVzKCdlLXRlbXBsYXRlY2VsbCcpICYmIGNsYXNzZXMuaW5jbHVkZXMoJ2Utcm93Y2VsbCcpIHx8IGNsYXNzZXMuaW5jbHVkZXMoJ2UtaGVhZGVyY2VsbCcpIHx8IGN1cnJlbnRUYXJnZXQubG9jYWxOYW1lID09ICdzcGFuJykge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHJlY29yZCA9IHRoaXMuZ2V0VHJlZVJlY29yZChjdXJyZW50VGFyZ2V0KTtcclxuICAgICAgICBpZiAocmVjb3JkICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBpZiAocmVjb3JkLml0ZW0gaW5zdGFuY2VvZiBDaGFydE1hbmFnZXJDaGFydCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlY29yZC5pdGVtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRZQXhpc0Zyb21EcmFnTG9jYXRpb24oY3VycmVudFRhcmdldCk6IFNjYWxlIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICBsZXQgY2xhc3NlcyA9IGN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LnZhbHVlO1xyXG4gICAgICAgIC8vYXZvaWQgZHJvcHBpbmcgc2VyaWUgaW4gbm90IGhpZ2hsaWdodGVkIGFyZWFcclxuICAgICAgICBpZiAoIWNsYXNzZXMuaW5jbHVkZXMoJ2UtdGVtcGxhdGVjZWxsJykgJiYgY2xhc3Nlcy5pbmNsdWRlcygnZS1yb3djZWxsJykpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCByZWNvcmQgPSB0aGlzLmdldFRyZWVSZWNvcmQoY3VycmVudFRhcmdldCk7XHJcbiAgICAgICAgaWYgKHJlY29yZCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgaWYgKHJlY29yZC5pdGVtIGluc3RhbmNlb2YgU2NhbGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZWNvcmQuaXRlbTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIGNvbHVtbiB0ZW1wbGF0ZSBpbmZvcm1hdGlvbnNcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHJldHVybnMge3N0cmluZ31cclxuXHQgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcbiAgICBwcml2YXRlIGdldENvbHVtblRlbXBsYXRlRGF0YShjb2x1bW5JZDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAoY29sdW1uSWQgPT0gQ2hhcnRNYW5hZ2VyV2lkZ2V0Lm5hbWVDb2x1bW5JZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYDxzY3JpcHQgdHlwZT1cInRleHQveC1qc3JlbmRlclwiIGlkPVwiY21OYW1lQ29sdW1uVGVtcGxhdGVcIj5cclxuXHRcdFx0ICAgICAgICAgICAgPGRpdiBzdHlsZT0naGVpZ2h0OjIwcHg7JyB1bnNlbGVjdGFibGU9J29uJz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7aWYgIX5nZXRzdGF0ZSgpfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdlLWRyYWdpbnRlbmQnIHN0eWxlPSdoZWlnaHQ6MXB4OyBmbG9hdDpsZWZ0OyB3aWR0aDoxNHB4OyBkaXNwbGF5OmlubGluZS1ibG9jazsnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPXt7On5fc3RhZ2VOYW1lKCl9fSBzdHlsZT0nd2lkdGg6MjRweDsnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9J2UtYWJvdmVJY29uIGUtaWNvbk1hcmdpbiBlLWljb24nIHN0eWxlPSdwb3NpdGlvbjpyZWxhdGl2ZTtmbG9hdDpyaWdodDtkaXNwbGF5Om5vbmU7Jz48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz0nZS1iZWxvd0ljb24gZS1pY29uTWFyZ2luIGUtaWNvbicgc3R5bGU9J3Bvc2l0aW9uOnJlbGF0aXZlO2Zsb2F0OnJpZ2h0O2Rpc3BsYXk6bm9uZTsnPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPSdlLWNoaWxkSWNvbiBlLWljb25NYXJnaW4gZS1pY29uJyBzdHlsZT0ncG9zaXRpb246cmVsYXRpdmU7ZmxvYXQ6cmlnaHQ7ZGlzcGxheTpub25lOyc+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9J2UtY2FuY2VsSWNvbiBlLWljb25NYXJnaW4gZS1pY29uJyBzdHlsZT0ncG9zaXRpb246cmVsYXRpdmU7ZmxvYXQ6cmlnaHQ7ZGlzcGxheTpub25lOyc+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7ZWxzZSB+Z2V0c3RhdGUoKX19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nZS1pbnRlbmRwYXJlbnQnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPXt7On5fc3RhZ2VOYW1lKCl9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPSdlLWFib3ZlSWNvbiBlLWljb25NYXJnaW4gZS1pY29uJyBzdHlsZT0ncG9zaXRpb246cmVsYXRpdmU7ZmxvYXQ6bGVmdDtkaXNwbGF5Om5vbmU7Jz48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz0nZS1iZWxvd0ljb24gZS1pY29uTWFyZ2luIGUtaWNvbicgc3R5bGU9J3Bvc2l0aW9uOnJlbGF0aXZlO2Zsb2F0OmxlZnQ7ZGlzcGxheTpub25lOyc+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9J2UtY2hpbGRJY29uIGUtaWNvbk1hcmdpbiBlLWljb24nIHN0eWxlPSdwb3NpdGlvbjpyZWxhdGl2ZTtmbG9hdDpsZWZ0O2Rpc3BsYXk6bm9uZTsnPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPSdlLWNhbmNlbEljb24gZS1pY29uTWFyZ2luIGUtaWNvbicgc3R5bGU9J3Bvc2l0aW9uOnJlbGF0aXZlO2Zsb2F0OmxlZnQ7ZGlzcGxheTpub25lOyc+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7L2lmfX1cclxuICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ezojZGF0YVsnaWNvbkRlZmluaXRpb24nXX19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdlLWNlbGwnIHN0eWxlPSdkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDoxMDAlJyB1bnNlbGVjdGFibGU9J29uJz57ezojZGF0YVsnbmFtZSddfX08L2Rpdj5cclxuXHRcdFx0ICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zY3JpcHQ+YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRTY3JpcHRGb3JEcmFnRHJvcFRlbXBsYXRlSGVscGVycygpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBgPHNjcmlwdCB0eXBlPVwidGV4dC9qYXZhc2NyaXB0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgJC52aWV3cy5oZWxwZXJzKHsgX3N0YWdlTmFtZTogZ2V0U3RhZ2VOYW1lIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICQudmlld3MuaGVscGVycyh7IGdldHN0YXRlOiBfZ2V0U3RhdGUgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJC52aWV3cy5oZWxwZXJzKHsgaXNHcm91cDogX2lzR3JvdXAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gX2dldFN0YXRlKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kYXRhLnBhcmVudEl0ZW0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gX2lzR3JvdXAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRhdGEuaXNHcm91cClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBnZXRTdGFnZU5hbWUoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByb3dDbGFzcyA9IFwiZ3JpZHJvd0luZGV4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm94eSA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd0NsYXNzICs9IHByb3h5LmRhdGEuaW5kZXgudG9TdHJpbmcoKSArIFwibGV2ZWxcIiArIHByb3h5LmRhdGEubGV2ZWwudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJvd0NsYXNzO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICA8L3NjcmlwdD5gO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcm9wRm9jdXNMb3N0KGFyZ3M6IERyYWdEcm9wQXJncykge1xyXG4gICAgICAgIHRoaXMucmVzZXREcmFnZ2VkT3ZlclN0YXRlKCk7XHJcbiAgICAgICAgdGhpcy5yZXNldEhpZ2hsaWdodEFyZWEoKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIaWdobGlnaHQgcm93cyB3aGVyZSBzaWduYWwgaXMgZHJhZ2dlZCBvdmVyIGFuZCBwb3NzaWJsZSB0byBiZSBkcm9wcGVkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7KElDaGFydE1hbmFnZXJDaGFydCB8IHVuZGVmaW5lZCl9IGNoYXJ0TWFuYWdlckNoYXJ0XHJcbiAgICAgKiBAcGFyYW0geyhTY2FsZSB8IHVuZGVmaW5lZCl9IHlBeGlzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaGlnaGxpZ2h0RHJvcHBhYmxlQXJlYXMoY2hhcnRNYW5hZ2VyQ2hhcnQ6IElDaGFydE1hbmFnZXJDaGFydCB8IHVuZGVmaW5lZCwgeUF4aXM6IFNjYWxlIHwgdW5kZWZpbmVkLCBjdXJyZW50VGFyZ2V0KXtcclxuICAgICAgICB0aGlzLnJlc2V0RHJhZ2dlZE92ZXJTdGF0ZSgpO1xyXG4gICAgICAgIGlmIChjaGFydE1hbmFnZXJDaGFydCAhPSB1bmRlZmluZWQgJiYgY2hhcnRNYW5hZ2VyQ2hhcnQuZHJvcFBvc3NpYmxlKSB7XHJcbiAgICAgICAgICAgIGxldCBhcmVhID0gdGhpcy5nZXRBcmVhVG9Gcm9tQ3VycmVudFRhcmdldChjdXJyZW50VGFyZ2V0KTtcclxuICAgICAgICAgICAgdGhpcy5hZGRIaWdobGlnaHRlZEFyZWEoYXJlYSk7XHJcbiAgICAgICAgICAgIGNoYXJ0TWFuYWdlckNoYXJ0LmRyYWdnZWRPdmVyID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoeUF4aXMgIT0gdW5kZWZpbmVkICYmIHlBeGlzLmRyb3BQb3NzaWJsZSkge1xyXG4gICAgICAgICAgICBsZXQgYXJlYSA9IHRoaXMuZ2V0QXJlYVRvRnJvbUN1cnJlbnRUYXJnZXQoY3VycmVudFRhcmdldCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkSGlnaGxpZ2h0ZWRBcmVhKGFyZWEpO1xyXG4gICAgICAgICAgICB5QXhpcy5kcmFnZ2VkT3ZlciA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMucmVzZXRIaWdobGlnaHRBcmVhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYWRkSGlnaGxpZ2h0ZWRBcmVhKGFyZWEpIHtcclxuXHRcdGxldCBoaWdobGlnaHRFbGVtID0gJCgnPGRpdiBpZD1cIicrIHRoaXMuaGlnaGxpZ2h0QXJlYUlkICsnXCIgc3R5bGU9XCIgcG9pbnRlci1ldmVudHM6bm9uZTsgcG9zaXRpb246YWJzb2x1dGU7IFwiIGNsYXNzPVwiZHJhZ2dlZE92ZXJcIj48L2Rpdj4nKTtcclxuXHRcdHRoaXMucmVzZXRIaWdobGlnaHRBcmVhKGhpZ2hsaWdodEVsZW0pO1xyXG5cdFx0JChhcmVhKS5hcHBlbmQoaGlnaGxpZ2h0RWxlbSk7XHJcblxyXG5cdFx0aGlnaGxpZ2h0RWxlbS5jc3MoJ3RvcCcsIGFyZWEub2Zmc2V0VG9wKTtcclxuXHRcdGhpZ2hsaWdodEVsZW0uY3NzKCdsZWZ0JywgYXJlYS5vZmZzZXRMZWZ0KTtcclxuXHRcdGhpZ2hsaWdodEVsZW0uY3NzKCdoZWlnaHQnLCBhcmVhLm9mZnNldEhlaWdodCk7XHJcblx0XHRoaWdobGlnaHRFbGVtLmNzcygnd2lkdGgnLCBhcmVhLm9mZnNldFdpZHRoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEFyZWFUb0Zyb21DdXJyZW50VGFyZ2V0KGN1cnJlbnRUYXJnZXQpIHtcclxuICAgICAgICBsZXQgY2xhc3NlcyA9IGN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LnZhbHVlO1xyXG4gICAgICAgIGlmIChjbGFzc2VzLmluY2x1ZGVzKCdlLXJvd2NlbGwnKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gY3VycmVudFRhcmdldDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEFyZWFUb0Zyb21DdXJyZW50VGFyZ2V0KGN1cnJlbnRUYXJnZXQucGFyZW50RWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVzZXQgYWxsIGhpZ2hsaWdodGVkIGFyZXMgaW4gY2hhcnRNYW5hZ2VyIGV4Y2VwdCB0aGUgY2VsbCBiZWluZyBkcmFnZ2VkT3ZlclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0pRdWVyeTxIVE1MRWxlbWVudD59IFtlbGVtZW50XVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlc2V0SGlnaGxpZ2h0QXJlYSAoZWxlbWVudD86IEpRdWVyeTxIVE1MRWxlbWVudD4pIHtcclxuXHRcdGxldCBoaWdobGlnaHRFbGVtID0gJCgnIycgKyB0aGlzLmhpZ2hsaWdodEFyZWFJZCk7XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGhpZ2hsaWdodEVsZW0ubGVuZ3RoOyBpKyspe1xyXG5cdFx0XHRpZiAoZWxlbWVudCA9PSB1bmRlZmluZWQgfHwgaGlnaGxpZ2h0RWxlbVtpXSAhPSBlbGVtZW50WzBdKSB7XHJcblx0XHRcdFx0aGlnaGxpZ2h0RWxlbVtpXS5yZW1vdmUoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVzZXREcmFnZ2VkT3ZlclN0YXRlKCl7ICAgICAgIFxyXG4gICAgICAgIHRoaXMuX2RhdGFNb2RlbC5kYXRhLmZvckVhY2goY2hhcnQgPT4ge1xyXG4gICAgICAgICAgICBjaGFydC5kcmFnZ2VkT3ZlciA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjaGFydC5jaGlsZHMuZm9yRWFjaCh5QXhpcyA9PiB7XHJcbiAgICAgICAgICAgICAgICB5QXhpcy5kcmFnZ2VkT3ZlciA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLy8jZW5kcmVnaW9uIGRyb3Agc3VwcG9ydFxyXG59XHJcblxyXG5leHBvcnQgeyBDaGFydE1hbmFnZXJXaWRnZXR9OyJdfQ==