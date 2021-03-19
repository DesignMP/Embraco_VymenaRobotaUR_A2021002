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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "../common/treeGridWidgetBase", "../../models/common/signal/serieGroup", "./view/smTreeGridCellEditEvents", "./view/smTreeGridCellEditTemplate", "./view/signalManagerTreeGridToolbar", "../../common/fileProvider", "../../framework/events", "../../common/exportImportHelper", "../common/busyInformation", "../../models/signalManagerDataModel/signalCategory", "../../models/signalManagerDataModel/signalManagerCalculation", "../../models/common/signal/serieContainer", "../../models/common/signal/serieNode", "../common/interfaces/dropInterface", "../common/dragDataObject", "../../models/signalManagerDataModel/signalManagerCalculationInputData", "../../models/signalManagerDataModel/signalManagerCalculationOutputData", "../common/imageProvider", "../common/dragDropRepresentation", "../../models/signalManagerDataModel/signalManagerCalculatorType", "../../models/chartManagerDataModel/seriesType", "./helpers/exportHelper", "../common/alertDialog", "../../models/signalManagerDataModel/signalRoot", "./defaultComponentSettings", "../common/widgetBase"], function (require, exports, treeGridWidgetBase_1, serieGroup_1, smTreeGridCellEditEvents_1, smTreeGridCellEditTemplate_1, signalManagerTreeGridToolbar_1, fileProvider_1, events_1, exportImportHelper_1, busyInformation_1, signalCategory_1, signalManagerCalculation_1, serieContainer_1, serieNode_1, dropInterface_1, dragDataObject_1, signalManagerCalculationInputData_1, signalManagerCalculationOutputData_1, imageProvider_1, dragDropRepresentation_1, signalManagerCalculatorType_1, seriesType_1, exportHelper_1, alertDialog_1, signalRoot_1, defaultComponentSettings_1, widgetBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventSerieDoubleClicked = /** @class */ (function (_super) {
        __extends(EventSerieDoubleClicked, _super);
        function EventSerieDoubleClicked() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventSerieDoubleClicked;
    }(events_1.TypedEvent));
    ;
    var EventChangeSize = /** @class */ (function (_super) {
        __extends(EventChangeSize, _super);
        function EventChangeSize() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventChangeSize;
    }(events_1.TypedEvent));
    ;
    var SignalManagerWidget = /** @class */ (function (_super) {
        __extends(SignalManagerWidget, _super);
        function SignalManagerWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._highlightAreaId = "signalManager_Highlighted";
            _this._deleteItemsContent = "This action will permanently delete selected elements.";
            _this._deleteItemsHeader = "Delete recorded data?";
            _this._warningImportingHeader = "Import canceled";
            _this._warningImportingContent = "It is not possible to import one .mce file with other files at the same time.";
            _this._MCEFilesImportedHeader = "Delete all trace data?";
            _this._MCEFilesImportedContent = "Do you want to delete all trace data and import the .mce file?";
            _this._indexesDragged = [];
            _this._fileProvider = new fileProvider_1.FileProvider();
            _this._suppressRefresh = false;
            _this.editModeActive = false;
            _this.eventSerieDoubleClicked = new EventSerieDoubleClicked();
            _this.eventChangeSize = new EventChangeSize();
            _this._uploadDataFinishedHandler = function (sender, args) { return _this.onUploadDataFinished(sender, args); };
            return _this;
        }
        Object.defineProperty(SignalManagerWidget.prototype, "autoUploadActive", {
            /**
             * Gets the information if the auto upload of tracedata is active
             *
             * @readonly
             * @type {boolean}
             * @memberof SignalManagerWidget
             */
            get: function () {
                return true;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Initializes the signal manager
         *
         * @param {string} layoutContainerId
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.initialize = function (layoutContainerId) {
            _super.prototype.initialize.call(this, layoutContainerId, 30);
            _super.prototype.setHeaderContent.call(this, "Signals");
            // Set dynamic column settings
            _super.prototype.setDynamicColumn.call(this, 0, 40);
            // Add drag support
            _super.prototype.addDraggingSupport.call(this);
            // Add drop support
            _super.prototype.addSupportedDragDropDataId.call(this, dropInterface_1.DragDropDataId.signal);
        };
        SignalManagerWidget.prototype.initializeComponent = function () {
            this.component.defaultSettingsDataId = defaultComponentSettings_1.DefaultComponentSettings.WidgetDefinitionId;
            this.component.disablePersisting();
        };
        SignalManagerWidget.prototype.dispose = function () {
            this.removeSupportedDragDropDataId(dropInterface_1.DragDropDataId.signal);
            _super.prototype.dispose.call(this);
        };
        /**
         * Returns the default component settings for this widget
         *
         * @returns {*}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.getDefaultComponentSettings = function () {
            return defaultComponentSettings_1.DefaultComponentSettings.getSignalManagerWidgetDefinition();
        };
        //#region drag support
        SignalManagerWidget.prototype.startDragging = function () {
            if (this._currentDragDropSeries != undefined) {
                var signalImage = void 0, signalName = void 0;
                if (this._currentDragDropSeries.length == 1) {
                    // Default yt series svg
                    signalName = this._currentDragDropSeries[0].name;
                    signalImage = imageProvider_1.ImageProvider.getInstance().getImage("../app/widgets/common/style/images/dragDrop/ytSeries.svg");
                    if (this._currentDragDropSeries[0].type == seriesType_1.SeriesType.xySeries) {
                        // Use xy series svg
                        signalImage = imageProvider_1.ImageProvider.getInstance().getImage("../app/widgets/common/style/images/dragDrop/xySeries.svg");
                    }
                    else if (this._currentDragDropSeries[0].type == seriesType_1.SeriesType.fftSeries) {
                        // Use fft series svg
                        signalImage = imageProvider_1.ImageProvider.getInstance().getImage("../app/widgets/common/style/images/dragDrop/fftSeries.svg");
                    }
                    if (signalImage != undefined) {
                        // Replace serie color in svg with color of current serie
                        signalImage = signalImage.replace("stroke:#76bea6", "stroke:" + this._currentDragDropSeries[0].color);
                    }
                }
                else {
                    if (this._currentDragDropSeries[0].type == seriesType_1.SeriesType.xySeries) {
                        signalImage = imageProvider_1.ImageProvider.getInstance().getImage("../app/widgets/common/style/images/dragDrop/severalXYSeries.svg");
                    }
                    else if (this._currentDragDropSeries[0].type == seriesType_1.SeriesType.fftSeries) {
                        signalImage = imageProvider_1.ImageProvider.getInstance().getImage("../app/widgets/common/style/images/dragDrop/severalFFTSeries.svg");
                    }
                    else {
                        signalImage = imageProvider_1.ImageProvider.getInstance().getImage("../app/widgets/common/style/images/dragDrop/severalYTSeries.svg");
                    }
                }
                var dragDropIconRepresentation = new dragDropRepresentation_1.DragDropRepresentation();
                dragDropIconRepresentation.iconList.push(signalImage);
                dragDropIconRepresentation.textList.push(signalName);
                return new dragDataObject_1.DragDropDataObject(dropInterface_1.DragDropDataId.signal, this._currentDragDropSeries, dragDropIconRepresentation);
            }
            return undefined;
        };
        SignalManagerWidget.prototype.draggingStopped = function () {
            // Reset current drag drop signal
            this._currentDragDropSeries = undefined;
            this._currentCalculatorType = undefined;
            this._indexesDragged = [];
        };
        //#endregion
        //#region drop support
        SignalManagerWidget.prototype.addDropLocations = function (series) {
            if (series[0].parent != undefined && series.length == 1) {
                series[0].parent.visibleChilds.forEach(function (child) {
                    if (child instanceof signalManagerCalculation_1.SignalManagerCalculation) {
                        child.setDropLocations(true, series[0]);
                    }
                });
            }
        };
        SignalManagerWidget.prototype.removeDropLocations = function (series) {
            if (series[0].parent != undefined && series.length == 1) {
                series[0].parent.visibleChilds.forEach(function (child) {
                    if (child instanceof signalManagerCalculation_1.SignalManagerCalculation) {
                        child.setDropLocations(false, series[0]);
                    }
                });
            }
        };
        SignalManagerWidget.prototype.dragStart = function (args) {
            var series = args.data;
            // Add possible dropLocations
            this.addDropLocations(series);
            // Update treeGrid
            this.refresh();
            var treeGridObj = this.getTreeGridObject();
            this.updateSerieSelection(treeGridObj, this._indexesDragged);
        };
        SignalManagerWidget.prototype.dragStop = function (args) {
            var series = args.data;
            // Remove possible dropLocations
            this.removeDropLocations(series);
            // Update treeGrid
            this.refresh();
            var treeGridObj = this.getTreeGridObject();
            this.updateSerieSelection(treeGridObj, this._indexesDragged);
        };
        SignalManagerWidget.prototype.dragOver = function (args) {
            var calculationInputItem = this.getCalculationInputFromDropLocation(args.currentTarget);
            if (calculationInputItem != undefined && calculationInputItem.dropPossible == true) {
                this.addHighlightedArea(args.currentTarget);
                return true;
            }
            else {
                this.resetHighlightArea();
            }
            return false;
        };
        SignalManagerWidget.prototype.drop = function (args) {
            var series = args.data[0];
            var calculationInputTarget = this.getCalculationInputFromDropLocation(args.currentTarget);
            var calculationInputDraggedItem = this.getCalculationInputDragged(series);
            if (calculationInputTarget != undefined && calculationInputTarget.dropPossible == true) {
                if (series != undefined) {
                    //Exchange of serie if the dragged serie is inside the calculator
                    if (this._currentCalculatorType == calculationInputTarget.parent && calculationInputDraggedItem != undefined) {
                        var oldValue = calculationInputTarget.value;
                        calculationInputDraggedItem.value = oldValue;
                    }
                    calculationInputTarget.value = series.name;
                }
            }
        };
        /**
         * Adds a <div> into the cell when droppable is possible and signal is being dragged over
         *
         * @private
         * @param {*} currentTarget
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.addHighlightedArea = function (currentTarget) {
            var highlightElem = $('<div id="' + this._highlightAreaId + '" style=" pointer-events:none; position:absolute; " class="draggedOver"></div>');
            this.resetHighlightArea(highlightElem);
            $(currentTarget).append(highlightElem);
            highlightElem.offset({ top: $(currentTarget).offset().top, left: $(currentTarget).offset().left });
            highlightElem.css('height', currentTarget.offsetHeight);
            highlightElem.css('width', currentTarget.offsetWidth);
        };
        /**
         * Remove all signalManager highlighted areas (except the selected one)
         *
         * @private
         * @param {JQuery<HTMLElement>} [element]
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.resetHighlightArea = function (element) {
            var highlightElem = $('#' + this._highlightAreaId);
            for (var i = 0; i < highlightElem.length; i++) {
                if (element == undefined || highlightElem[i] != element[0]) {
                    highlightElem[i].remove();
                }
            }
        };
        SignalManagerWidget.prototype.getCalculationInputFromDropLocation = function (currentTarget) {
            var record = this.getTreeRecord(currentTarget);
            if (record != undefined) {
                if (record.item instanceof signalManagerCalculationInputData_1.SignalManagerCalculationInputData && currentTarget.classList.value.includes('dropLocationArea')) {
                    return record.item;
                }
            }
            return undefined;
        };
        SignalManagerWidget.prototype.getCalculationInputDragged = function (serie) {
            if (this._currentCalculatorType != undefined) {
                for (var i = 0; i < this._currentCalculatorType.getChilds().length; i++) {
                    if (this._currentCalculatorType.getChilds()[i].serie == serie) {
                        return this._currentCalculatorType.getChilds()[i];
                    }
                }
            }
            return undefined;
        };
        //#endregion
        /**
         * Creates the layout of the widget
         *
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.createLayout = function () {
            var $widgetContainer = $(this.cssParentContentId);
            $widgetContainer[0].style.overflow = "hidden";
            _super.prototype.createLayout.call(this);
        };
        SignalManagerWidget.prototype.initialized = function () {
            this.initSignalManagerDataModel();
            this.initSeriesProvider();
            this.initChartManagerDataModel();
            // Set the widget settings again => datamodel must be updated with editModeActive info
            this.setWidgetSettings(this.component.getSetting(widgetBase_1.WidgetBase.WidgetSettingId));
            this.refresh();
        };
        SignalManagerWidget.prototype.initSignalManagerDataModel = function () {
            var dataModel = this.component.getSubComponent("SignalManagerDataModel");
            dataModel.initialize();
            this.dataModel = dataModel;
        };
        SignalManagerWidget.prototype.initSeriesProvider = function () {
            this._seriesProvider = this.component.getSubComponent("SeriesProvider");
        };
        SignalManagerWidget.prototype.initChartManagerDataModel = function () {
            this._chartManagerDataModel = this.component.getSubComponent("ChartManagerDataModel");
        };
        /**
         * Handles the model changes
         *
         * @param {IDataModel} sender
         * @param {EventModelChangedArgs} eventArgs
         * @returns {*}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.handleModelChanged = function (sender, eventArgs) {
            this.refresh();
        };
        /**
         * Resizes the signal manager widget
         *
         * @param {number} width
         * @param {number} height
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.resize = function (width, height) {
            _super.prototype.resize.call(this, width, height);
            this._toolbar.resize(width);
        };
        /**
     * Sets the selection to the given series
     *
     * @private
     * @param {*} treeGridObject
     * @param {Array<number>} indexes
     * @memberof CursorInfoWidget
     */
        SignalManagerWidget.prototype.updateSerieSelection = function (treeGridObject, indexes) {
            // deselect all selections in signal pane
            treeGridObject.clearSelection();
            if (indexes[0] == undefined) {
                return;
            }
            for (var i = 0; i < indexes.length; i++) {
                treeGridObject._multiSelectCtrlRequest = true;
                var visibleIndex = 0;
                for (var j = 0; j < treeGridObject.model.flatRecords.length; j++) {
                    if (j == indexes[i]) {
                        treeGridObject.selectRows(visibleIndex);
                    }
                    if (treeGridObject.model.flatRecords[j].visible != "false") {
                        visibleIndex++;
                    }
                }
            }
        };
        ;
        SignalManagerWidget.prototype.suppressRefresh = function (suppress) {
            this._suppressRefresh = suppress;
        };
        /**
         * Refreshes the tree grid
         *
         * @private
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.refresh = function () {
            return __awaiter(this, void 0, void 0, function () {
                var treegridObj, i, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 6, , 7]);
                            if (!(this._suppressRefresh == false)) return [3 /*break*/, 5];
                            treegridObj = this.getTreeGridObject();
                            if (!(treegridObj.model.isEdit == false)) return [3 /*break*/, 1];
                            //To refresh TreeGrid with new datasource
                            this.setModel(this.dataModel.data);
                            return [3 /*break*/, 5];
                        case 1:
                            i = 0;
                            _a.label = 2;
                        case 2:
                            if (!(i < 100)) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.sleep(200)];
                        case 3:
                            _a.sent();
                            // is editing already finished
                            if (treegridObj.model.isEdit == false) {
                                this.setModel(this.dataModel.data);
                                return [2 /*return*/];
                            }
                            _a.label = 4;
                        case 4:
                            i++;
                            return [3 /*break*/, 2];
                        case 5: return [3 /*break*/, 7];
                        case 6:
                            e_1 = _a.sent();
                            console.info("SignalManager refresh error! => TreeGrid recreation!");
                            console.info(e_1);
                            this.createTreeGrid();
                            return [3 /*break*/, 7];
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
        SignalManagerWidget.prototype.sleep = function (ms) {
            return new Promise(function (resolve) { return setTimeout(resolve, ms); });
        };
        /**
         * Creates the column templates for the tree grid and adds them to the widget container
         *
         * @protected
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.createColumnTemplates = function () {
            var $widgetContainer = $(this.cssParentContentId);
            $widgetContainer.append(this.getColumnTemplateData(SignalManagerWidget.nameColumnId));
            $widgetContainer.append(this.getColumnTemplateData(SignalManagerWidget.colorColumnId));
        };
        /**
         * Creates the tree grid for the signal manager
         *
         * @protected
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.createTreeGrid = function () {
            var _this = this;
            $(this.cssParentContentId).ejTreeGrid(__assign(__assign(__assign(__assign(__assign(__assign({}, this.getTreeGridColumnDefinition()), this.getTreeGridColumnResizeSupport()), this.getTreeGridToolbarSupport()), this.getTreeGridCellEditSupport()), this.getTreeGridDragDropSupport()), { dataSource: this.dataModel.data, childMapping: "visibleChilds", expandStateMapping: "expandState", allowReordering: false, rowHeight: 28, selectionSettings: {
                    selectionType: 'multiple'
                }, selectionType: 'multiple', expanded: function (args) { return _this.treeGridNodeExpandedOrCollapsed(); }, collapsed: function (args) { return _this.treeGridNodeExpandedOrCollapsed(); }, recordClick: function (args) { return _this.click(args); }, recordDoubleClick: function (args) { return _this.doubleClick(args); }, rowSelected: function (args) { return _this.rowSelected(args.data.item, args.model.currentViewData); }, create: function (args) { return _this.treeGridCreated(); }, actionBegin: function (args) { return _this.treeGridActionBegin(args); }, actionComplete: function (args) { return _this.treeGridActionComplete(args); }, queryCellInfo: function (args) { return _this.treeGridQueryCellInfo(args); } }));
            this.setEditMode(this.editModeActive);
        };
        /**
         * Returns the tree grid column definition
         *
         * @private
         * @returns {{}}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.getTreeGridColumnDefinition = function () {
            return {
                columns: [
                    { field: SignalManagerWidget.nameColumnId, headerText: "Name", width: "351px", isTemplateColumn: true, templateID: "smNameColumnTemplate" },
                    { field: SignalManagerWidget.valueColumnId, headerText: "Value", visible: this.editModeActive, width: "300px", editTemplate: smTreeGridCellEditTemplate_1.SmTreeGridCellEditTemplate.createInstance(), isTemplateColumn: true },
                    { field: SignalManagerWidget.descriptionColumnId, headerText: "Description", visible: this.editModeActive, width: "100px" },
                    { field: SignalManagerWidget.colorColumnId, headerText: "Color", width: "50px", visible: this.editModeActive, editType: "DatePicker", editTemplate: smTreeGridCellEditTemplate_1.SmTreeGridCellEditTemplate.createInstance(), isTemplateColumn: true, templateID: "smColorColumnTemplate" },
                    { field: SignalManagerWidget.iconDefinitionColumnId, visible: false, width: "0px" },
                ],
            };
        };
        /**
         * Returns the tree grid column resize settings
         *
         * @private
         * @returns {{}}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.getTreeGridColumnResizeSupport = function () {
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
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.treeGridColumnResized = function (args) {
            _super.prototype.resizeDynamicColumn.call(this, args.columnIndex, args.model);
        };
        /**
         * Returns the tree grid toolbar settings
         *
         * @private
         * @returns {{}}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.getTreeGridToolbarSupport = function () {
            var _this = this;
            this._toolbar = new signalManagerTreeGridToolbar_1.SignalManagerTreeGridToolbar(this.cssParentContentId);
            return {
                toolbarSettings: {
                    showToolbar: true,
                    customToolbarItems: this._toolbar.getCustomToolbars()
                },
                toolbarClick: function (args) { return _this._toolbar.toolbarClick(args, _this); },
            };
        };
        /**
         * Returns the tree grid cell edit settings
         *
         * @private
         * @returns {{}}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.getTreeGridCellEditSupport = function () {
            var _this = this;
            var cellEditEvents = new smTreeGridCellEditEvents_1.SmTreeGridCellEditEvents();
            return {
                editSettings: { allowEditing: true },
                beginEdit: function (args) { return cellEditEvents.beginEdit(args, _this); },
                endEdit: function (args) { return cellEditEvents.endEdit(args, _this); },
            };
        };
        /**
         * Activates the signal manager drag and drop support
         *
         * @private
         * @returns {{}}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.getTreeGridDragDropSupport = function () {
            var _this = this;
            return {
                allowDragAndDrop: true,
                rowDragStart: function (args) { return _this.rowDragStart(args); },
            };
        };
        /**
         * Will be called after the tree grid was created; toolbar styles and states will be set
         *
         * @private
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.treeGridCreated = function () {
            // Sets the custom toolbar icons
            this._toolbar.setStyleForToolbarIcons();
            // At the beginning the export/delete/insert calculation button is disabled because no selection is available
            this._toolbar.disableExportButton(true);
            this._toolbar.disableDeleteButton(true);
            this._toolbar.disableInsertCalculationButton(true);
            this.setEditMode(false);
        };
        /**
         * Switch into "edit mode" or "normal mode"
         * if edit mode is active, the edit mode will be set to the datamodel, and the widget size will be increased
         * if normal mode is active, the normal mode will be set to the datamodel, and the widget size will be decreased
         *
         * @private
         * @param {boolean} active
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.setEditMode = function (active) {
            if (this.editModeActive != active) {
                if (active == true) {
                    this.onChangeSize(this._actualWidth + 450);
                }
                else {
                    var newSize = this._actualWidth - 450;
                    if (newSize < 250) {
                        newSize = 250;
                    }
                    this.onChangeSize(newSize);
                }
            }
            this.editModeActive = active;
            this.dataModel.editModeActive = this.editModeActive;
            if (this._toolbar != undefined) {
                this._toolbar.activateEditModeButton(this.editModeActive);
            }
        };
        /**
         * Well be called after some tree grid action was started
         *
         * @private
         * @param {*} args
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.treeGridActionBegin = function (args) {
            // Support "Entf/Del" key
            if (args.requestType == "delete") {
                args.cancel = true;
                if (this.containsItemWithinRecentOrUploaded(args.deletedItems)) {
                    this.showMessageBoxForDeletingItem(args.deletedItems);
                }
                else {
                    this.deleteItems(args.deletedItems);
                }
            }
        };
        /**
     * Loads the styles for the chart manager widget
     *
     * @memberof ChartManagerWidget
     */
        SignalManagerWidget.prototype.loadStyles = function () {
            _super.prototype.loadStyles.call(this);
            _super.prototype.addStyle.call(this, "widgets/common/style/css/dropDownMenuStyle.css");
        };
        /**
         * Well be called after some tree grid action was completed
         *
         * @private
         * @param {*} args
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.treeGridActionComplete = function (args) {
            // Event trigger while changing datasource dynamically. 
            // code to done after the dynamic change of datasource. 
            if (args.requestType === 'refreshDataSource') {
                this.refreshSelection();
                if (this._serieContainerToSelectAfterRefresh != undefined) {
                    // Selects the imported signalfile, or the inserted calculation, ...
                    this.selectItem(this._serieContainerToSelectAfterRefresh);
                    this._serieContainerToSelectAfterRefresh = undefined;
                }
            }
        };
        /**
         * Will be called to update the style of the give cell if a refresh will be needed
         *
         * @private
         * @param {*} args
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.treeGridQueryCellInfo = function (args) {
            if (args.column.field == "name") {
                if (this.isGroupItem(args.data.item)) {
                    // Show group nodes always bold => also if they have no childs
                    if (args.cellElement.style != undefined) {
                        if (args.data.level == 0) {
                            args.cellElement.style.fontWeight = "800"; // 700 would be bold
                        }
                        else {
                            args.cellElement.style.fontWeight = "650";
                        }
                    }
                }
                // Show all nodes red which have invalid signals in it 
                if (this.isItemInvalid(args.data.item) == true) {
                    if (args.cellElement.style != undefined) {
                        args.cellElement.style.color = "red";
                        args.cellElement.style.fontWeight = "bold";
                        //args.cellElement.innerText = args.cellElement.innerText + "(invalid)";
                    }
                }
            }
            else if (args.column.field == "value") {
                if (args.data.dropPossible == true) {
                    args.cellElement.classList.add("dropLocationArea");
                }
            }
        };
        /*
            // Is a invalid signal within this item (or a child item)
            private isItemInvalid(item): boolean{
                let invalidSignalFound = false;
                let signals = this.getSignalsFromItem(item);
                for(let i = 0; i < signals.length; i++){
                    if(signals[i].rawPointsValid == false){
                        invalidSignalFound = true;
                    }
                }
                return invalidSignalFound;
            }*/
        /**
         * Has the given item some data and is this data valid
         *
         * @private
         * @param {*} item
         * @returns {boolean}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.isItemInvalid = function (item) {
            if (item instanceof signalManagerCalculation_1.SignalManagerCalculation) {
                var calculatedSignals = item.getSeries();
                // check if a calculated output signal is invalid
                for (var i = 0; i < calculatedSignals.length; i++) {
                    if (calculatedSignals[i].rawPointsValid == false) {
                        return true;
                    }
                }
            }
            else if (item instanceof serieNode_1.SerieNode) {
                if (item.serie != undefined && item.serie.rawPointsValid == false) {
                    if (item instanceof signalManagerCalculationOutputData_1.SignalManagerCalculationOutputData) {
                        return true;
                    }
                    else {
                        return true;
                    }
                }
            }
            return false;
        };
        /**
         * A drag and drop operation was started
         *
         * @private
         * @param {*} args
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.rowDragStart = function (args) {
            this._indexesDragged = [];
            var selectedElements = this.checkSelectedElements(args.draggedRecords, args.draggedRow);
            if (selectedElements.length > 0) {
                this._currentDragDropSeries = selectedElements;
                // Set current drag drop signal
            }
            else {
                this._currentDragDropSeries = undefined; // Reset current drag drop signal
            }
            args.draggedRecords = [];
            args.cancel = true;
        };
        SignalManagerWidget.prototype.refreshSelection = function () {
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
            var areElementsExportable = this.canItemsBeExported(treeObj.model.flatRecords);
            // update toolbar buttons
            if (treeObj.model.flatRecords[actualSelectedRowIndex] != undefined) {
                this.updateToolbarButtonStates(treeObj.model.flatRecords[actualSelectedRowIndex].item, areElementsExportable);
            }
            else {
                this.updateToolbarButtonStates(undefined, areElementsExportable);
            }
        };
        SignalManagerWidget.prototype.rowSelected = function (item, currentViewData) {
            var areElementsExportable = this.canItemsBeExported(currentViewData);
            this.updateToolbarButtonStates(item, areElementsExportable);
        };
        /**
         * updates the toolbar buttons(e.g. insert calulation only enabled on SerieGroup or under "Calculated signals" category)
         *
         * @private
         * @param {ISerieNode} item
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.updateToolbarButtonStates = function (item, areElementsExportable) {
            if (item == undefined) {
                this._toolbar.disableInsertCalculationButton(true);
                this._toolbar.disableDeleteButton(true);
            }
            else {
                // set delete button state
                this._toolbar.disableDeleteButton(!item.canDelete);
                if (item instanceof serieGroup_1.SerieGroup) {
                    this._toolbar.disableExportButton(false);
                    this._toolbar.disableInsertCalculationButton(false);
                }
                else {
                    if (item.getSerieGroup() == undefined) {
                        this._toolbar.disableInsertCalculationButton(true);
                        this._toolbar.disableExportButton(true);
                    }
                    else if (item instanceof signalManagerCalculatorType_1.SignalManagerCalculatorType && item.name == 'Algorithm' || item instanceof signalManagerCalculationInputData_1.SignalManagerCalculationInputData && item.serie == undefined ||
                        ((item instanceof signalManagerCalculation_1.SignalManagerCalculation || item instanceof signalManagerCalculationOutputData_1.SignalManagerCalculationOutputData) && (item.serie == undefined || item.serie.rawPointsValid == false))) {
                        this._toolbar.disableInsertCalculationButton(false);
                        this._toolbar.disableExportButton(true);
                    }
                    else {
                        this._toolbar.disableExportButton(false);
                        this._toolbar.disableInsertCalculationButton(false);
                    }
                }
            }
            if (areElementsExportable) {
                this._toolbar.disableExportButton(false);
            }
            else {
                this._toolbar.disableExportButton(true);
            }
        };
        SignalManagerWidget.prototype.canItemsBeExported = function (items) {
            var canBeExported = false;
            var exportHelper = new exportHelper_1.ExportHelper();
            for (var i = 0; i < items.length; i++) {
                if (exportHelper.isElementExportable(items[i].item) === true) {
                    canBeExported = true;
                    break;
                }
            }
            return canBeExported;
        };
        /**
         * A click on the tree grid (needed for reseting the current drag drop signal)
         *
         * @private
         * @param {*} args
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.click = function (args) {
            // Reset current drag drop signal after click was finished(click up)
            this._currentDragDropSeries = undefined;
            this.focus();
        };
        /**
         * A double click on the tree grid was done
         *
         * @private
         * @param {*} args
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.doubleClick = function (args) {
            if (args.cellIndex == 0) {
                var serieNode = args.data.item;
                var foundSeries = this.getSeriesFromItem(serieNode);
                if (foundSeries.length > 0) {
                    // Only one serie can be added by double click currently(TODO: add multi insert)
                    this.onSeriesDoubleClicked(foundSeries[0]);
                }
            }
        };
        /**
         * Checks if all elements selected are series and of the same type
         *
         * @private
         * @param {*} elements
         * @param {*} draggedRow
         * @returns {Array<BaseSeries>}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.checkSelectedElements = function (elements, draggedRow) {
            var series = new Array();
            var items = new Array();
            var draggedRowIsSelected = false;
            var invalidSelection = false;
            if (draggedRow == undefined || draggedRow.serie == undefined) {
                return [];
            }
            var type = draggedRow.serie.type;
            for (var i = 0; i < elements.length; i = i + 1) {
                if (elements[i].serie == undefined || elements[i].serie.type != type) {
                    invalidSelection = true;
                }
                if (elements[i] == draggedRow) {
                    draggedRowIsSelected = true;
                }
                series.push(elements[i].serie);
                items.push(elements[i]);
            }
            if (draggedRow.item instanceof signalManagerCalculationInputData_1.SignalManagerCalculationInputData) {
                this._currentCalculatorType = draggedRow.parent;
            }
            //Once all elements have been checked, select correct elements according to the exceptions
            if (!draggedRowIsSelected) {
                series = [];
                series.push(draggedRow.serie);
                this._indexesDragged = [];
                this._indexesDragged.push(draggedRow.index);
            }
            else if (invalidSelection) {
                return [];
            }
            else {
                series = this.deleteEqualSignals(series, items);
            }
            return series;
        };
        /**
         * Delete duplicated signals from the drag&drop array
         *
         * @private
         * @param {Array<BaseSeries>} series
         * @param {*} elements
         * @returns
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.deleteEqualSignals = function (series, elements) {
            for (var i = 0; i < series.length; i++) {
                if (elements[i].item instanceof signalManagerCalculationInputData_1.SignalManagerCalculationInputData) {
                    var selectedItems = Object.assign([], series);
                    selectedItems.splice(i, 1);
                    if (selectedItems.includes(series[i])) {
                        series.splice(i, 1);
                        elements.splice(i, 1);
                        i = -1;
                    }
                }
            }
            for (var i = 0; i < elements.length; i++) {
                this._indexesDragged.push(elements[i].index);
            }
            return series;
        };
        /**
         * Returns all series which were found in the serie node item(e.g. a normal serie or calculated series)
         *
         * @private
         * @param {*} item
         * @returns {Array<BaseSeries>}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.getSeriesFromItem = function (item) {
            var signals = new Array();
            if (item instanceof serieNode_1.SerieNode && item.serie != undefined) { // Is Signal node
                signals.push(item.serie);
            }
            else if (item instanceof serieContainer_1.SerieContainer) { // is calculation(group node) with signals
                return item.getSeries();
            }
            return signals;
        };
        /**
         * Is the given item a group item (e.g. needed for setting the font style to bold)
         *
         * @private
         * @param {ISerieContainer} item
         * @returns
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.isGroupItem = function (item) {
            if (item == undefined) {
                return false;
            }
            if (item.visibleChilds != undefined) {
                return true;
            }
            return false;
        };
        SignalManagerWidget.prototype.insertCalculation = function (item) {
            if (item == undefined) {
                return;
            }
            var selectedItem = item.item;
            var serieGroup;
            if (selectedItem instanceof serieGroup_1.SerieGroup || selectedItem instanceof signalCategory_1.SignalCategory) {
                // Calculation can only be insert at groups or categories
                serieGroup = selectedItem;
            }
            else {
                serieGroup = selectedItem.getSerieGroup();
            }
            if (serieGroup != undefined) {
                this.activateEditMode(true);
                return this.addCalculationToContainer(serieGroup);
            }
            return undefined;
        };
        SignalManagerWidget.prototype.addCalculationToContainer = function (container) {
            var calculation = new signalManagerCalculation_1.SignalManagerCalculation("Calculation");
            this._serieContainerToSelectAfterRefresh = calculation;
            container.addSerieContainer(calculation, -1);
            return calculation;
        };
        SignalManagerWidget.prototype.getComponentSettings = function () {
            this.component.setSetting(widgetBase_1.WidgetBase.WidgetSettingId, this.getWidgetSettings());
            return _super.prototype.getComponentSettings.call(this);
        };
        SignalManagerWidget.prototype.setComponentSettings = function (data) {
            _super.prototype.setComponentSettings.call(this, data);
            this.setWidgetSettings(this.component.getSetting(widgetBase_1.WidgetBase.WidgetSettingId));
        };
        SignalManagerWidget.prototype.getWidgetSettings = function () {
            var settings = { "editModeActive": this.editModeActive };
            return settings;
        };
        SignalManagerWidget.prototype.setWidgetSettings = function (data) {
            if (data == undefined) {
                return;
            }
            this.activateEditMode(data["editModeActive"]);
        };
        SignalManagerWidget.prototype.activateEditMode = function (activate) {
            // Show or hide edit mode columns
            var treeObject = this.getTreeGridObject();
            var valueColumn = treeObject.getColumnByField(SignalManagerWidget.valueColumnId);
            var descriptionColumn = treeObject.getColumnByField(SignalManagerWidget.descriptionColumnId);
            var colorColumn = treeObject.getColumnByField(SignalManagerWidget.colorColumnId);
            if (activate == true) {
                treeObject.showColumn(valueColumn.headerText);
                treeObject.showColumn(descriptionColumn.headerText);
                treeObject.showColumn(colorColumn.headerText);
            }
            else {
                treeObject.hideColumn(valueColumn.headerText);
                treeObject.hideColumn(descriptionColumn.headerText);
                treeObject.hideColumn(colorColumn.headerText);
            }
            this.setEditMode(activate);
            this.refresh();
        };
        /**
         * Returns true if one of the items deleted has been done through the trace of mappCockpit
         *
         * @param {*} selectedItems
         * @returns {boolean}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.containsItemWithinRecentOrUploaded = function (selectedItems) {
            for (var i = 0; i < selectedItems.length; i++) {
                if (this.isItemInSignalCategory(selectedItems[i].item, signalCategory_1.SignalCategory.CategoryIdUploaded) || this.isItemInSignalCategory(selectedItems[i].item, signalCategory_1.SignalCategory.CategoryIdRecent)) {
                    return true;
                }
            }
            return false;
        };
        /**
         * Returns true if the item selected belongs to the signal category selected
         *
         * @private
         * @param {*} item
         * @param {*} signalCategoryId
         * @returns {boolean}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.isItemInSignalCategory = function (item, signalCategoryId) {
            var parent = item.parent;
            if (parent instanceof signalCategory_1.SignalCategory && parent.id == signalCategoryId) {
                return true;
            }
            else if (!(parent instanceof signalRoot_1.SignalRoot)) {
                return this.isItemInSignalCategory(parent, signalCategoryId);
            }
            else {
                return false;
            }
        };
        /**
         * Shows message box according to type
         *
         * @private
         * @param {messageBoxType} type
         * @param {Map<string, string>} fileContents
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.showMessageBox = function (type, fileContents) {
            if (type === alertDialog_1.messageBoxType.Warning) {
                this.showWarningWhenImportingFiles();
            }
            else if (type === alertDialog_1.messageBoxType.YesNo) {
                this.showMessageBoxWhenImportingMCEFiles(fileContents);
            }
        };
        /**
         * Creates a warning message when the user imports a .mce file and other files too
         *
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.showWarningWhenImportingFiles = function () {
            new alertDialog_1.AlertDialog().createMessageBox(this._warningImportingHeader, this._warningImportingContent, alertDialog_1.messageBoxType.Warning, undefined);
        };
        /**
         * Creates a message box that lets user decide to delete selected data or not
         *
         * @param {*} deletedItems
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.showMessageBoxForDeletingItem = function (deletedItems) {
            var deferred = jQuery.Deferred();
            var self = this;
            new alertDialog_1.AlertDialog().createMessageBox(this._deleteItemsHeader, this._deleteItemsContent, alertDialog_1.messageBoxType.CancelDelete, deferred);
            $.when(deferred).done(function () {
                self.deleteItems(deletedItems);
            });
        };
        /**
         * Creates a message box that lets user decide to import .mce file nad delete all data or not
         *
         * @private
         * @param {*} data
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.showMessageBoxWhenImportingMCEFiles = function (fileContents) {
            var deferred = jQuery.Deferred();
            var self = this;
            new alertDialog_1.AlertDialog().createMessageBox(this._MCEFilesImportedHeader, this._MCEFilesImportedContent, alertDialog_1.messageBoxType.YesNo, deferred);
            $.when(deferred).done(function () {
                self.startImport(fileContents);
            });
        };
        SignalManagerWidget.prototype.deleteItems = function (items) {
            this._suppressRefresh = true;
            for (var i = 0; i < items.length; i++) {
                this.deleteItem(items[i].item);
            }
            this._suppressRefresh = false;
            this.refresh();
        };
        SignalManagerWidget.prototype.deleteItem = function (item) {
            if (item.canDelete) {
                if (item instanceof serieNode_1.SerieNode) {
                    this.removeSerieNode(item);
                }
                else {
                    this.removeSerieContainer(item);
                }
            }
        };
        /**
         *  Remove the signal container with all sub containers and signals from datamodel
         *
         * @private
         * @param {ISerieContainer} serieGroup
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.removeSerieContainer = function (serieGroup) {
            this._dataModel.removeSerieContainer(serieGroup);
        };
        /**
         * Removes the signal from datamodel
         *
         * @private
         * @param {ISerieNode} serieNode
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.removeSerieNode = function (serieNode) {
            this._dataModel.removeSerieNode(serieNode);
        };
        /**
         * Exports a serieGroup
         *
         * @public
         * @param {Array<ExportSerieGroup>} elements
         * @memberof SignalManagerTreeGrid
         */
        SignalManagerWidget.prototype.exportSerieGroup = function (elements) {
            var _this = this;
            this.setBusyInformation(new busyInformation_1.BusyInformation("Exporting data...", busyInformation_1.ImageId.defaultImage, 48, true));
            this.setBusy(true);
            // Timeout needed to show the busyscreen before exporting data 
            setTimeout(function () { return _this.exportCsvData(elements); }, 200);
        };
        /**
         * Opens a file select dialog and imports a serieGroup from the file
         *
         * @public
         * @memberof SignalManagerTreeGrid
         */
        SignalManagerWidget.prototype.importSerieGroup = function () {
            this._serieContainerToSelectAfterRefresh = undefined;
            this._fileProvider.eventUploadDataFinished.attach(this._uploadDataFinishedHandler);
            this._fileProvider.uploadData(".csv, .mce", true); // Only show/accept *.csv and *.mce files
        };
        SignalManagerWidget.prototype.exportSignalManagerData = function () {
            var _this = this;
            this.setBusyInformation(new busyInformation_1.BusyInformation("Exporting data...", busyInformation_1.ImageId.defaultImage, 48, true));
            this.setBusy(true);
            // Timeout needed to show the busyscreen before exporting data 
            setTimeout(function () { return _this.exportData(); }, 200);
        };
        /**
         * Occurs after reading data from file(trace import data)
         *
         * @private
         * @param {HTMLInputElement} sender
         * @param {Map<string, string>} args
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.onUploadDataFinished = function (sender, args) {
            this.setBusyInformation(new busyInformation_1.BusyInformation("Importing data...", busyInformation_1.ImageId.defaultImage, 48, true));
            var msgBoxType = this.checkMessageBoxType(args);
            if (msgBoxType != undefined) {
                this.showMessageBox(msgBoxType, args);
            }
            else {
                this.startImport(args);
            }
            this._fileProvider.eventUploadDataFinished.detach(this._uploadDataFinishedHandler);
        };
        /**
         * Exports the given signal group to TraceData.csv file
         *
         * @private
         * @param { Array<ExportSerieGroup>} elements
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.exportCsvData = function (elements) {
            var data = exportImportHelper_1.ExportImportHelper.exportTraceData(elements);
            if (data !== undefined) {
                var blob = new Blob([data], { type: "text/csv" });
                fileProvider_1.FileProvider.downloadData("TraceData.csv", blob);
            }
            this.setBusy(false);
        };
        /**
         * Exports the signal manager data(datamodel and series provider)
         *
         * @private
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.exportData = function () {
            if (this._seriesProvider != undefined) { // SeriesProvider needed to export data
                var signalManagerDataModelSettings = this.dataModel.getComponentSettings();
                var seriesProviderSettings = this._seriesProvider.getComponentSettings();
                if (signalManagerDataModelSettings !== undefined && seriesProviderSettings !== undefined) {
                    var data = { "SignalManagerDataModel": signalManagerDataModelSettings, "SeriesProvider": seriesProviderSettings };
                    var stringData = JSON.stringify(data);
                    var blob = new Blob([stringData], { type: "text/html" });
                    fileProvider_1.FileProvider.downloadData("Export.mce", blob);
                }
            }
            else {
                console.error("SeriesProvider for export not available!");
            }
            this.setBusy(false);
        };
        /**
         * Sets the busy screen and start importing data
         *
         * @private
         * @param {Map<string, string>} args
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.startImport = function (args) {
            var _this = this;
            this.setBusy(true);
            // Timeout needed to show the busyscreen before importing data 
            setTimeout(function () { return _this.importData(args); }, 200);
        };
        /**
         * imports the given filedata with the given filename to the signal manager datamodel
         *
         * @private
         * @param {Map<string, string>} fileContents
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.importData = function (fileContents) {
            var _this = this;
            fileContents.forEach(function (fileData, filename) {
                if (filename.toLowerCase().endsWith(".csv")) {
                    var serieGroups = exportImportHelper_1.ExportImportHelper.importTraceData(fileData, filename);
                    var signalFile_1 = new serieContainer_1.SerieContainer(filename);
                    serieGroups.forEach(function (serieGroup) {
                        signalFile_1.addSerieContainer(serieGroup, -1);
                    });
                    _this._serieContainerToSelectAfterRefresh = signalFile_1;
                    _this._dataModel.addSerieContainer(signalFile_1, signalCategory_1.SignalCategory.CategoryIdImported);
                }
                else if (filename.toLowerCase().endsWith(".mce")) {
                    var data = JSON.parse(fileData);
                    _this.importMCEFile(data);
                }
                else {
                    console.error("Import for file format not implemented: " + filename);
                }
            });
            this.setBusy(false);
        };
        /**
         * Returns type of message box need it (if need it)
         *
         * @private
         * @param {Map<string, string>} fileContents
         * @returns {(messageBoxType | undefined)}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.checkMessageBoxType = function (fileContents) {
            var isSignalManagerEmpty = this.isSignalManagerEmpty(this.dataModel.data);
            var isThereMCEFile = false;
            fileContents.forEach(function (fileData, filename) {
                if (filename.toLowerCase().endsWith(".mce")) {
                    isThereMCEFile = true;
                }
            });
            if (isThereMCEFile && fileContents.size > 1) {
                return alertDialog_1.messageBoxType.Warning;
            }
            else if (isThereMCEFile && !isSignalManagerEmpty) {
                return alertDialog_1.messageBoxType.YesNo;
            }
            else {
                return undefined;
            }
        };
        /**
         * Returns true if there is nothing in the signalManager
         *
         * @private
         * @param {*} data
         * @returns {boolean}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.isSignalManagerEmpty = function (data) {
            var isEmpty = true;
            for (var i = 0; i < data.length; i++) {
                if (data[i].childs.length > 0) {
                    isEmpty = false;
                    break;
                }
            }
            return isEmpty;
        };
        /**
         * Deletes all trace data and imports the .mce file
         *
         * @private
         * @param {*} data
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.importMCEFile = function (data) {
            if (this._seriesProvider) { // serie provider needed to import data
                // Remove data from old datamodel => Removes also the series from the serie provider
                this.dataModel.clear();
                if (this._chartManagerDataModel != undefined) {
                    // clear old charts from chartmanager datamodel
                    this._chartManagerDataModel.clear();
                }
                // set new serie data to serie provider
                this._seriesProvider.setComponentSettings(data.SeriesProvider);
                // set new signal manager data
                this.suppressRefresh(true);
                this.dataModel.setComponentSettings(data.SignalManagerDataModel);
                this.suppressRefresh(false);
                this.refresh();
            }
            else {
                console.error("SeriesProvider for import not available!");
            }
        };
        /**
         * Selects the given container in the tree grid and scrolls to it if out of the window (TODO: Move to BaseClass incl. _serieContainerToSelectAfterRefresh)
         *
         * @private
         * @param {(ISerieContainer|undefined)} container
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.selectItem = function (container) {
            var treeObject = this.getTreeGridObject();
            var record = treeObject.model.flatRecords.filter(function (record) { return record.item === container; })[0];
            if (record != undefined) {
                // expand parent node if it is collapsed to see the new imported trace data
                if (record.parentItem.expandState == false) {
                    treeObject.expandCollapseRow(record.parentItem.index);
                }
                // treeObject.scrollOffset not possible if there would be some free space after the last item in the tree grid after scrolling to the given item
                // => scrollToBottom befor scroll to a special offset if possible
                treeObject.scrollToBottom();
                treeObject.setModel({ "selectedRowIndex": record.index });
                var rowHeight = treeObject.model.rowHeight;
                // scroll index not the same as the selectedIndex => collapsed nodes must be considered
                var scrollIndex = this.getScrollIndex(treeObject.model.flatRecords, record.index);
                var scrollOffset = (scrollIndex - 1) * rowHeight;
                treeObject.scrollOffset("0", scrollOffset.toString()); // Use parent index to see the parent node in the view
                //(<any>treeObject).updateScrollBar();
            }
        };
        /**
         * Returns the index of only the visible(expanded) rows
         *
         * @private
         * @param {Array<any>} rows
         * @param {number} rowIndex
         * @returns {number}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.getScrollIndex = function (rows, rowIndex) {
            var scrollIndex = 0;
            for (var i = 0; i < rows.length; i++) {
                if (rows[i].index == rowIndex) {
                    scrollIndex++;
                    return scrollIndex;
                }
                /*if(rows[i].item instanceof SerieGroup){
                    if(this.isVisibleSerieGroupNode(rows[i]) == false){
                        continue;
                    }
                    scrollIndex++;
                }
                else */ if (rows[i].item instanceof serieContainer_1.SerieContainer) {
                    if (this.isVisibleSerieGroupNode(rows[i]) == false) {
                        continue;
                    }
                    scrollIndex++;
                }
                else if (rows[i].item instanceof serieNode_1.SerieNode) {
                    if (this.isVisibleSerieNode(rows[i]) == false) {
                        continue;
                    }
                    scrollIndex++;
                }
            }
            return scrollIndex;
        };
        SignalManagerWidget.prototype.isVisibleSerieGroupNode = function (node) {
            if (node.parentItem != null) {
                if (node.parentItem.expandState == false) {
                    return false;
                }
                else if (node.parentItem.parentItem != undefined) {
                    if (node.parentItem.parentItem.expandState == false) {
                        return false;
                    }
                }
            }
            return true;
        };
        SignalManagerWidget.prototype.isVisibleSerieNode = function (node) {
            if (node.parentItem.expandState == false || node.parentItem.parentItem.expandState == false) {
                return false;
            }
            else if (node.parentItem.parentItem.parentItem != undefined) {
                if (node.parentItem.parentItem.parentItem.expandState == false) {
                    return false;
                }
            }
            return true;
        };
        SignalManagerWidget.prototype.treeGridNodeExpandedOrCollapsed = function () {
            // Refresh to see correct expanded/collapsed icon
            this.refresh();
        };
        /**
         * Returns the column template informations
         *
         * @private
         * @param {string} columnId
         * @returns {string}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.getColumnTemplateData = function (columnId) {
            if (columnId == SignalManagerWidget.colorColumnId) {
                return "<script type=\"text/x-jsrender\" id=\"smColorColumnTemplate\">\n\t\t\t\t\t\t<div style='height:20px;padding-left:7px;padding-top:4px;' unselectable='on'>\n\t\t\t\t\t\t\t<div class='e-cell' style='display:inline-block;width:17px;height:17px;background-color: {{:#data['color']}};' unselectable='on'></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</script>";
            }
            else if (columnId == SignalManagerWidget.nameColumnId) {
                return "<script type=\"text/x-jsrender\" id=\"smNameColumnTemplate\">\n\t\t\t\t\t\t<div style='height:20px;' unselectable='on'>\n\t\t\t\t\t\t\t{{if hasChildRecords}}\n\t\t\t\t\t\t\t\t<div class='intend' style='height:1px; float:left; width:{{:level*10}}px; display:inline-block;'></div>\n\t\t\t\t\t\t\t{{else !hasChildRecords}}\n\t\t\t\t\t\t\t\t<div class='intend' style='height:1px; float:left; width:{{:level*10}}px; display:inline-block;'></div>\n\t\t\t\t\t\t\t{{/if}}\n\t\t\t\t\t\t\t{{:#data['iconDefinition']}}\n\t\t\t\t\t\t\t<div class='e-cell' style='display:inline-block;width:100%' unselectable='on'>{{:#data['name']}}</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</script>";
            }
            return "";
        };
        /**
         * Raises the series double click event
         *
         * @private
         * @param {BaseSeries} signal
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.onSeriesDoubleClicked = function (series) {
            this.eventSerieDoubleClicked.raise(this, series);
        };
        /**
         * Raises the change size event
         *
         * @private
         * @param {number} size
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.onChangeSize = function (size) {
            this.eventChangeSize.raise(this, size);
        };
        SignalManagerWidget.prototype.dropFocusLost = function (args) {
            this.resetHighlightArea();
        };
        // column definitions
        SignalManagerWidget.nameColumnId = "name";
        SignalManagerWidget.valueColumnId = "value";
        SignalManagerWidget.descriptionColumnId = "description";
        SignalManagerWidget.colorColumnId = "color";
        SignalManagerWidget.iconDefinitionColumnId = "iconDefinition";
        return SignalManagerWidget;
    }(treeGridWidgetBase_1.TreeGridWidgetBase));
    exports.SignalManagerWidget = SignalManagerWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsTWFuYWdlcldpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9zaWduYWxNYW5hZ2VyV2lkZ2V0L3NpZ25hbE1hbmFnZXJXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBdUNBO1FBQXNDLDJDQUE0QztRQUFsRjs7UUFBb0YsQ0FBQztRQUFELDhCQUFDO0lBQUQsQ0FBQyxBQUFyRixDQUFzQyxtQkFBVSxHQUFxQztJQUFBLENBQUM7SUFDdEY7UUFBOEIsbUNBQXdDO1FBQXRFOztRQUF3RSxDQUFDO1FBQUQsc0JBQUM7SUFBRCxDQUFDLEFBQXpFLENBQThCLG1CQUFVLEdBQWlDO0lBQUEsQ0FBQztJQUUxRTtRQUFrQyx1Q0FBa0I7UUFBcEQ7WUFBQSxxRUFxaURDO1lBNWhEaUIsc0JBQWdCLEdBQUcsMkJBQTJCLENBQUM7WUFFL0MseUJBQW1CLEdBQUcsd0RBQXdELENBQUM7WUFDL0Usd0JBQWtCLEdBQUcsdUJBQXVCLENBQUM7WUFDN0MsNkJBQXVCLEdBQUcsaUJBQWlCLENBQUE7WUFDM0MsOEJBQXdCLEdBQUcsK0VBQStFLENBQUE7WUFDMUcsNkJBQXVCLEdBQUcsd0JBQXdCLENBQUM7WUFDbkQsOEJBQXdCLEdBQUcsZ0VBQWdFLENBQUM7WUFFckcscUJBQWUsR0FBa0IsRUFBRSxDQUFDO1lBVXBDLG1CQUFhLEdBQUcsSUFBSSwyQkFBWSxFQUFFLENBQUM7WUFLbkMsc0JBQWdCLEdBQUcsS0FBSyxDQUFDO1lBRTFCLG9CQUFjLEdBQVksS0FBSyxDQUFDO1lBSXZDLDZCQUF1QixHQUFHLElBQUksdUJBQXVCLEVBQUUsQ0FBQztZQUV4RCxxQkFBZSxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7WUFFaEMsZ0NBQTBCLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFHLE9BQUEsS0FBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsRUFBdEMsQ0FBc0MsQ0FBQzs7UUEwL0M1RixDQUFDO1FBai9DQSxzQkFBSSxpREFBZ0I7WUFQcEI7Ozs7OztlQU1HO2lCQUNIO2dCQUNDLE9BQU8sSUFBSSxDQUFDO1lBQ2IsQ0FBQzs7O1dBQUE7UUFFQzs7Ozs7V0FLQztRQUNILHdDQUFVLEdBQVYsVUFBVyxpQkFBeUI7WUFDbkMsaUJBQU0sVUFBVSxZQUFDLGlCQUFpQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3hDLGlCQUFNLGdCQUFnQixZQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRWxDLDhCQUE4QjtZQUM5QixpQkFBTSxnQkFBZ0IsWUFBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFOUIsbUJBQW1CO1lBQ25CLGlCQUFNLGtCQUFrQixXQUFFLENBQUM7WUFFM0IsbUJBQW1CO1lBQ25CLGlCQUFNLDBCQUEwQixZQUFDLDhCQUFjLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDeEQsQ0FBQztRQUVELGlEQUFtQixHQUFuQjtZQUNDLElBQUksQ0FBQyxTQUFTLENBQUMscUJBQXFCLEdBQUcsbURBQXdCLENBQUMsa0JBQWtCLENBQUM7WUFDbkYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ2pDLENBQUM7UUFFSixxQ0FBTyxHQUFQO1lBQ0MsSUFBSSxDQUFDLDZCQUE2QixDQUFDLDhCQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDMUQsaUJBQU0sT0FBTyxXQUFFLENBQUM7UUFDakIsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gseURBQTJCLEdBQTNCO1lBQ08sT0FBTyxtREFBd0IsQ0FBQyxnQ0FBZ0MsRUFBRSxDQUFDO1FBQzFFLENBQUM7UUFFRCxzQkFBc0I7UUFDdEIsMkNBQWEsR0FBYjtZQUNDLElBQUcsSUFBSSxDQUFDLHNCQUFzQixJQUFJLFNBQVMsRUFBQztnQkFDM0MsSUFBSSxXQUFXLFNBQUEsRUFDZCxVQUFVLFNBQUEsQ0FBQztnQkFDWixJQUFJLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO29CQUM1Qyx3QkFBd0I7b0JBQ3hCLFVBQVUsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO29CQUNqRCxXQUFXLEdBQUcsNkJBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsMERBQTBELENBQUMsQ0FBQztvQkFDL0csSUFBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLHVCQUFVLENBQUMsUUFBUSxFQUFDO3dCQUM3RCxvQkFBb0I7d0JBQ3BCLFdBQVcsR0FBRyw2QkFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQywwREFBMEQsQ0FBQyxDQUFDO3FCQUMvRzt5QkFDSSxJQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksdUJBQVUsQ0FBQyxTQUFTLEVBQUM7d0JBQ25FLHFCQUFxQjt3QkFDckIsV0FBVyxHQUFHLDZCQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLDJEQUEyRCxDQUFDLENBQUM7cUJBQ2hIO29CQUNELElBQUcsV0FBVyxJQUFJLFNBQVMsRUFBQzt3QkFDM0IseURBQXlEO3dCQUN6RCxXQUFXLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxTQUFTLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUN0RztpQkFDRDtxQkFDSTtvQkFDSixJQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksdUJBQVUsQ0FBQyxRQUFRLEVBQUM7d0JBQzdELFdBQVcsR0FBRyw2QkFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxpRUFBaUUsQ0FBQyxDQUFDO3FCQUN0SDt5QkFDSSxJQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksdUJBQVUsQ0FBQyxTQUFTLEVBQUM7d0JBQ25FLFdBQVcsR0FBRyw2QkFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxrRUFBa0UsQ0FBQyxDQUFDO3FCQUN2SDt5QkFDSTt3QkFDSixXQUFXLEdBQUcsNkJBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsaUVBQWlFLENBQUMsQ0FBQztxQkFDdEg7aUJBQ0Q7Z0JBQ0QsSUFBSSwwQkFBMEIsR0FBRyxJQUFJLCtDQUFzQixFQUFFLENBQUM7Z0JBQzlELDBCQUEwQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ3RELDBCQUEwQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3JELE9BQU8sSUFBSSxtQ0FBa0IsQ0FBQyw4QkFBYyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsc0JBQXNCLEVBQUUsMEJBQTBCLENBQUMsQ0FBQzthQUM5RztZQUNELE9BQU8sU0FBUyxDQUFDO1FBQ2xCLENBQUM7UUFFRCw2Q0FBZSxHQUFmO1lBQ0MsaUNBQWlDO1lBQ2pDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxTQUFTLENBQUM7WUFDeEMsSUFBSSxDQUFDLHNCQUFzQixHQUFHLFNBQVMsQ0FBQztZQUN4QyxJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztRQUMzQixDQUFDO1FBQ0QsWUFBWTtRQUVaLHNCQUFzQjtRQUNkLDhDQUFnQixHQUF4QixVQUF5QixNQUF5QjtZQUMzQyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksU0FBUyxJQUFJLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO2dCQUM5RCxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLGFBQWMsQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLO29CQUM1QyxJQUFHLEtBQUssWUFBWSxtREFBd0IsRUFBQzt3QkFDNUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDeEM7Z0JBQ0YsQ0FBQyxDQUFDLENBQUM7YUFDSDtRQUNGLENBQUM7UUFFTyxpREFBbUIsR0FBM0IsVUFBNEIsTUFBeUI7WUFDcEQsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLFNBQVMsSUFBSSxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtnQkFDeEQsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxhQUFjLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSztvQkFDNUMsSUFBRyxLQUFLLFlBQVksbURBQXdCLEVBQUM7d0JBQzVDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQ3pDO2dCQUNGLENBQUMsQ0FBQyxDQUFDO2FBQ0g7UUFDRixDQUFDO1FBRUQsdUNBQVMsR0FBVCxVQUFVLElBQWtCO1lBQzNCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxJQUF5QixDQUFDO1lBRTVDLDZCQUE2QjtZQUM3QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFOUIsa0JBQWtCO1lBQ2xCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUVmLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQzNDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzlELENBQUM7UUFFRCxzQ0FBUSxHQUFSLFVBQVMsSUFBa0I7WUFDMUIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQXlCLENBQUM7WUFFNUMsZ0NBQWdDO1lBQ2hDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUVqQyxrQkFBa0I7WUFDbEIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBRWYsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDM0MsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDOUQsQ0FBQztRQUVELHNDQUFRLEdBQVIsVUFBUyxJQUFrQjtZQUMxQixJQUFJLG9CQUFvQixHQUFJLElBQUksQ0FBQyxtQ0FBbUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFFekYsSUFBRyxvQkFBb0IsSUFBSSxTQUFTLElBQUksb0JBQW9CLENBQUMsWUFBWSxJQUFJLElBQUksRUFBQztnQkFDakYsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDNUMsT0FBTyxJQUFJLENBQUM7YUFDWjtpQkFDSTtnQkFDSixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQzthQUMxQjtZQUNELE9BQU8sS0FBSyxDQUFDO1FBQ2QsQ0FBQztRQUVELGtDQUFJLEdBQUosVUFBSyxJQUFrQjtZQUN0QixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBZSxDQUFDO1lBQ3hDLElBQUksc0JBQXNCLEdBQUksSUFBSSxDQUFDLG1DQUFtQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUMzRixJQUFJLDJCQUEyQixHQUFHLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUUxRSxJQUFHLHNCQUFzQixJQUFJLFNBQVMsSUFBSSxzQkFBc0IsQ0FBQyxZQUFZLElBQUksSUFBSSxFQUFDO2dCQUNyRixJQUFHLE1BQU0sSUFBSSxTQUFTLEVBQUM7b0JBQ3RCLGlFQUFpRTtvQkFDakUsSUFBSSxJQUFJLENBQUMsc0JBQXNCLElBQUksc0JBQXNCLENBQUMsTUFBTSxJQUFJLDJCQUEyQixJQUFJLFNBQVMsRUFBRTt3QkFDN0csSUFBSSxRQUFRLEdBQUcsc0JBQXNCLENBQUMsS0FBSyxDQUFDO3dCQUM1QywyQkFBNEIsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDO3FCQUM5QztvQkFDRCxzQkFBc0IsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztpQkFDM0M7YUFDRDtRQUNGLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSyxnREFBa0IsR0FBMUIsVUFBMkIsYUFBYTtZQUN2QyxJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUMsV0FBVyxHQUFFLElBQUksQ0FBQyxnQkFBZ0IsR0FBRSxnRkFBZ0YsQ0FBQyxDQUFDO1lBQzVJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUN2QyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBRXZDLGFBQWEsQ0FBQyxNQUFNLENBQUMsRUFBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLE1BQU0sRUFBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLE1BQU0sRUFBRyxDQUFDLElBQUksRUFBQyxDQUFDLENBQUE7WUFDbEcsYUFBYSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3hELGFBQWEsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN2RCxDQUFDO1FBR0Q7Ozs7OztXQU1HO1FBQ0ssZ0RBQWtCLEdBQTFCLFVBQTRCLE9BQTZCO1lBQ3hELElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDbkQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQzdDLElBQUksT0FBTyxJQUFJLFNBQVMsSUFBSSxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUMzRCxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7aUJBQzFCO2FBQ0Q7UUFDRixDQUFDO1FBRU8saUVBQW1DLEdBQTNDLFVBQTRDLGFBQWE7WUFDeEQsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUN6QyxJQUFHLE1BQU0sSUFBSSxTQUFTLEVBQUM7Z0JBQzVCLElBQUcsTUFBTSxDQUFDLElBQUksWUFBWSxxRUFBaUMsSUFBSSxhQUFhLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsRUFBQztvQkFDekgsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDO2lCQUNuQjthQUNEO1lBQ0ssT0FBTyxTQUFTLENBQUM7UUFDeEIsQ0FBQztRQUVPLHdEQUEwQixHQUFsQyxVQUFtQyxLQUFpQjtZQUNuRCxJQUFJLElBQUksQ0FBQyxzQkFBc0IsSUFBSSxTQUFTLEVBQUU7Z0JBQzdDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsc0JBQXVCLENBQUMsU0FBUyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO29CQUN4RSxJQUFJLElBQUksQ0FBQyxzQkFBdUIsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksS0FBSyxFQUFFO3dCQUMvRCxPQUFPLElBQUksQ0FBQyxzQkFBdUIsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQXNDLENBQUM7cUJBQ3hGO2lCQUNEO2FBQ0Q7WUFDRCxPQUFPLFNBQVMsQ0FBQztRQUNsQixDQUFDO1FBRUQsWUFBWTtRQUVaOzs7O1dBSUc7UUFDSCwwQ0FBWSxHQUFaO1lBQ0MsSUFBSSxnQkFBZ0IsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDbEQsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRSxRQUFRLENBQUM7WUFDN0MsaUJBQU0sWUFBWSxXQUFFLENBQUM7UUFDdEIsQ0FBQztRQUVELHlDQUFXLEdBQVg7WUFDQyxJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztZQUNsQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztZQUMxQixJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQztZQUMzQixzRkFBc0Y7WUFDNUYsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLHVCQUFVLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztZQUM5RSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDaEIsQ0FBQztRQUVELHdEQUEwQixHQUExQjtZQUNDLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLHdCQUF3QixDQUE0QixDQUFDO1lBQ3BHLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQW9DLENBQUM7UUFDdkQsQ0FBQztRQUVELGdEQUFrQixHQUFsQjtZQUNDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQW9CLENBQUM7UUFDNUYsQ0FBQztRQUVELHVEQUF5QixHQUF6QjtZQUNDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyx1QkFBdUIsQ0FBMkIsQ0FBQztRQUNqSCxDQUFDO1FBR0Q7Ozs7Ozs7V0FPRztRQUNILGdEQUFrQixHQUFsQixVQUFtQixNQUFrQixFQUFFLFNBQWdDO1lBQ3RFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNoQixDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0gsb0NBQU0sR0FBTixVQUFPLEtBQWEsRUFBRSxNQUFjO1lBQ25DLGlCQUFNLE1BQU0sWUFBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFFNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0IsQ0FBQztRQUVHOzs7Ozs7O09BT0U7UUFDSyxrREFBb0IsR0FBNUIsVUFBNkIsY0FBYyxFQUFFLE9BQXNCO1lBQy9ELHlDQUF5QztZQUN6QyxjQUFjLENBQUMsY0FBYyxFQUFFLENBQUM7WUFFaEMsSUFBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksU0FBUyxFQUFDO2dCQUN2QixPQUFPO2FBQ1Y7WUFDRCxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFBQztnQkFDbEMsY0FBYyxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQztnQkFDOUMsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDO2dCQUNyQixLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQVMsY0FBYyxDQUFDLEtBQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO29CQUNuRSxJQUFHLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUM7d0JBQ2YsY0FBYyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztxQkFDM0M7b0JBQ0QsSUFBUyxjQUFjLENBQUMsS0FBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksT0FBTyxFQUFDO3dCQUM3RCxZQUFZLEVBQUUsQ0FBQztxQkFDbEI7aUJBQ0o7YUFDSjtRQUNMLENBQUM7UUFBQSxDQUFDO1FBR0UsNkNBQWUsR0FBdEIsVUFBdUIsUUFBaUI7WUFDdkMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFFBQVEsQ0FBQztRQUNsQyxDQUFDO1FBQ0Q7Ozs7O1dBS0c7UUFDVSxxQ0FBTyxHQUFwQjs7Ozs7OztpQ0FFSyxDQUFBLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxLQUFLLENBQUEsRUFBOUIsd0JBQThCOzRCQUM1QixXQUFXLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7aUNBQ3ZDLENBQU0sV0FBVyxDQUFDLEtBQU0sQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFBLEVBQXhDLHdCQUF3Qzs0QkFDM0MseUNBQXlDOzRCQUN6QyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs0QkFJM0IsQ0FBQyxHQUFFLENBQUM7OztpQ0FBRSxDQUFBLENBQUMsR0FBRyxHQUFHLENBQUE7NEJBQ3BCLHFCQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUE7OzRCQUFyQixTQUFxQixDQUFDOzRCQUN0Qiw4QkFBOEI7NEJBQzlCLElBQVUsV0FBVyxDQUFDLEtBQU0sQ0FBQyxNQUFNLElBQUksS0FBSyxFQUFDO2dDQUM1QyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7Z0NBQ25DLHNCQUFPOzZCQUNQOzs7NEJBTnFCLENBQUMsRUFBRSxDQUFBOzs7Ozs0QkFhNUIsT0FBTyxDQUFDLElBQUksQ0FBQyxzREFBc0QsQ0FBQyxDQUFDOzRCQUNyRSxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDOzRCQUVoQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7Ozs7OztTQUV2QjtRQUVPLG1DQUFLLEdBQWIsVUFBYyxFQUFVO1lBQ2pCLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLElBQUssT0FBQSxVQUFVLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxFQUF2QixDQUF1QixDQUFDLENBQUM7UUFDN0QsQ0FBQztRQUVKOzs7OztXQUtHO1FBQ08sbURBQXFCLEdBQS9CO1lBQ0MsSUFBSSxnQkFBZ0IsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDbEQsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ3RGLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsbUJBQW1CLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUN4RixDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDTyw0Q0FBYyxHQUF4QjtZQUFBLGlCQTZCQztZQTVCTSxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFFLENBQUMsVUFBVSwyREFDeEMsSUFBSSxDQUFDLDJCQUEyQixFQUFFLEdBQ2xDLElBQUksQ0FBQyw4QkFBOEIsRUFBRSxHQUNyQyxJQUFJLENBQUMseUJBQXlCLEVBQUUsR0FDaEMsSUFBSSxDQUFDLDBCQUEwQixFQUFFLEdBQ2pDLElBQUksQ0FBQywwQkFBMEIsRUFBRSxLQUVwQyxVQUFVLEVBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQzlCLFlBQVksRUFBQyxlQUFlLEVBQzVCLGtCQUFrQixFQUFFLGFBQWEsRUFDakMsZUFBZSxFQUFFLEtBQUssRUFDdEIsU0FBUyxFQUFFLEVBQUUsRUFDYixpQkFBaUIsRUFBQztvQkFDakIsYUFBYSxFQUFHLFVBQVU7aUJBQzFCLEVBQ0QsYUFBYSxFQUFFLFVBQVUsRUFDekIsUUFBUSxFQUFFLFVBQUMsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLCtCQUErQixFQUFFLEVBQXRDLENBQXNDLEVBQzFELFNBQVMsRUFBRSxVQUFDLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQywrQkFBK0IsRUFBRSxFQUF0QyxDQUFzQyxFQUUzRCxXQUFXLEVBQUUsVUFBQyxJQUFJLElBQUssT0FBQSxLQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFoQixDQUFnQixFQUN2QyxpQkFBaUIsRUFBRSxVQUFDLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQXRCLENBQXNCLEVBQ25ELFdBQVcsRUFBRSxVQUFDLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsRUFBNUQsQ0FBNEQsRUFDbkYsTUFBTSxFQUFFLFVBQUMsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLGVBQWUsRUFBRSxFQUF0QixDQUFzQixFQUN4QyxXQUFXLEVBQUUsVUFBQyxJQUFJLElBQUssT0FBQSxLQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEVBQTlCLENBQThCLEVBQ3JELGNBQWMsRUFBRSxVQUFDLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsRUFBakMsQ0FBaUMsRUFDM0QsYUFBYSxFQUFFLFVBQUMsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxFQUFoQyxDQUFnQyxJQUN4RCxDQUFBO1lBQ0YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDdkMsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLHlEQUEyQixHQUFuQztZQUNDLE9BQU87Z0JBQ04sT0FBTyxFQUFFO29CQUNSLEVBQUUsS0FBSyxFQUFFLG1CQUFtQixDQUFDLFlBQVksRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUcsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxzQkFBc0IsRUFBQztvQkFDM0ksRUFBRSxLQUFLLEVBQUUsbUJBQW1CLENBQUMsYUFBYSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsdURBQTBCLENBQUMsY0FBYyxFQUFFLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFDO29CQUNqTSxFQUFFLEtBQUssRUFBRSxtQkFBbUIsQ0FBQyxtQkFBbUIsRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUU7b0JBQzNILEVBQUUsS0FBSyxFQUFFLG1CQUFtQixDQUFDLGFBQWEsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsdURBQTBCLENBQUMsY0FBYyxFQUFFLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSx1QkFBdUIsRUFBQztvQkFDN1AsRUFBRSxLQUFLLEVBQUUsbUJBQW1CLENBQUMsc0JBQXNCLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO2lCQUNuRjthQUNELENBQUM7UUFDSCxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ssNERBQThCLEdBQXRDO1lBQUEsaUJBTUM7WUFMQSxPQUFPO2dCQUNOLGlCQUFpQixFQUFFLElBQUk7Z0JBQ3ZCLG9CQUFvQixFQUFFLEVBQUUsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUU7Z0JBQ3JGLGFBQWEsRUFBRSxVQUFDLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsRUFBaEMsQ0FBZ0M7YUFDekQsQ0FBQztRQUNILENBQUM7UUFFRDs7Ozs7O1dBTU07UUFDSyxtREFBcUIsR0FBN0IsVUFBOEIsSUFBSTtZQUNwQyxpQkFBTSxtQkFBbUIsWUFBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0RCxDQUFDO1FBRUo7Ozs7OztXQU1HO1FBQ0ssdURBQXlCLEdBQWpDO1lBQUEsaUJBU0M7WUFSQSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksMkRBQTRCLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDMUUsT0FBTztnQkFDTCxlQUFlLEVBQUU7b0JBQ2hCLFdBQVcsRUFBRSxJQUFJO29CQUNqQixrQkFBa0IsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixFQUFFO2lCQUNyRDtnQkFDRCxZQUFZLEVBQUUsVUFBQyxJQUFJLElBQUssT0FBQSxLQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsS0FBSSxDQUFDLEVBQXRDLENBQXNDO2FBQzlELENBQUM7UUFDSixDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ssd0RBQTBCLEdBQWxDO1lBQUEsaUJBT0M7WUFOQSxJQUFJLGNBQWMsR0FBRyxJQUFJLG1EQUF3QixFQUFFLENBQUM7WUFDcEQsT0FBTztnQkFDTixZQUFZLEVBQUUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFO2dCQUNwQyxTQUFTLEVBQUUsVUFBQyxJQUFJLElBQUssT0FBQSxjQUFjLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxLQUFJLENBQUMsRUFBcEMsQ0FBb0M7Z0JBQ3pELE9BQU8sRUFBRSxVQUFDLElBQUksSUFBSyxPQUFBLGNBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUksQ0FBQyxFQUFsQyxDQUFrQzthQUNyRCxDQUFDO1FBQ0gsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLHdEQUEwQixHQUFsQztZQUFBLGlCQUtDO1lBSkEsT0FBTztnQkFDTixnQkFBZ0IsRUFBRyxJQUFJO2dCQUN2QixZQUFZLEVBQUUsVUFBQyxJQUFJLElBQUssT0FBQSxLQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUF2QixDQUF1QjthQUMvQyxDQUFDO1FBQ0gsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0ssNkNBQWUsR0FBdkI7WUFDQyxnQ0FBZ0M7WUFDaEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1lBRXhDLDZHQUE2RztZQUM3RyxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyw4QkFBOEIsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuRCxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pCLENBQUM7UUFFRDs7Ozs7Ozs7V0FRRztRQUNLLHlDQUFXLEdBQW5CLFVBQW9CLE1BQWM7WUFDakMsSUFBRyxJQUFJLENBQUMsY0FBYyxJQUFJLE1BQU0sRUFBQztnQkFDaEMsSUFBRyxNQUFNLElBQUksSUFBSSxFQUFDO29CQUNqQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ3pDO3FCQUNHO29CQUNILElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO29CQUN0QyxJQUFHLE9BQU8sR0FBRyxHQUFHLEVBQUM7d0JBQ2hCLE9BQU8sR0FBRyxHQUFHLENBQUM7cUJBQ2Q7b0JBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDM0I7YUFDRDtZQUNELElBQUksQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDO1lBQzVCLElBQUksQ0FBQyxTQUFxQyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1lBQ2pGLElBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxTQUFTLEVBQUM7Z0JBQzdCLElBQUksQ0FBQyxRQUFRLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2FBQzFEO1FBQ0YsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLGlEQUFtQixHQUEzQixVQUE0QixJQUFJO1lBQy9CLHlCQUF5QjtZQUN6QixJQUFHLElBQUksQ0FBQyxXQUFXLElBQUksUUFBUSxFQUFDO2dCQUMvQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDbkIsSUFBSSxJQUFJLENBQUMsa0NBQWtDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFO29CQUMvRCxJQUFJLENBQUMsNkJBQTZCLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2lCQUM3QztxQkFDSTtvQkFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztpQkFDdkM7YUFDVjtRQUNGLENBQUM7UUFFRzs7OztPQUlFO1FBQ0gsd0NBQVUsR0FBVjtZQUNJLGlCQUFNLFVBQVUsV0FBRSxDQUFDO1lBQ25CLGlCQUFNLFFBQVEsWUFBQyxnREFBZ0QsQ0FBQyxDQUFDO1FBQ3JFLENBQUM7UUFFSjs7Ozs7O1dBTUc7UUFDSyxvREFBc0IsR0FBOUIsVUFBK0IsSUFBSTtZQUNsQyx3REFBd0Q7WUFDeEQsd0RBQXdEO1lBQ3hELElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxtQkFBbUIsRUFBRTtnQkFDN0MsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7Z0JBQ3hCLElBQUcsSUFBSSxDQUFDLG1DQUFtQyxJQUFJLFNBQVMsRUFBQztvQkFDeEQsb0VBQW9FO29CQUNwRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO29CQUMxRCxJQUFJLENBQUMsbUNBQW1DLEdBQUcsU0FBUyxDQUFDO2lCQUNyRDthQUNEO1FBQ0YsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLG1EQUFxQixHQUE3QixVQUE4QixJQUFJO1lBQ2pDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksTUFBTSxFQUFDO2dCQUMvQixJQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDcEMsOERBQThEO29CQUM5RCxJQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxJQUFJLFNBQVMsRUFBQzt3QkFDdEMsSUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEVBQUM7NEJBQ3ZCLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUMsQ0FBQyxvQkFBb0I7eUJBQy9EOzZCQUNHOzRCQUNILElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7eUJBQzFDO3FCQUNEO2lCQUNEO2dCQUNELHVEQUF1RDtnQkFDdkQsSUFBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxFQUFDO29CQUM3QyxJQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxJQUFJLFNBQVMsRUFBQzt3QkFDdEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQzt3QkFDckMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQzt3QkFDM0Msd0VBQXdFO3FCQUN4RTtpQkFDRDthQUNEO2lCQUNJLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksT0FBTyxFQUFDO2dCQUNyQyxJQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksRUFBQztvQkFDckIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7aUJBQy9EO2FBQ0Q7UUFDRixDQUFDO1FBQ0Y7Ozs7Ozs7Ozs7O2VBV0k7UUFFSDs7Ozs7OztXQU9HO1FBQ0ssMkNBQWEsR0FBckIsVUFBc0IsSUFBSTtZQUN6QixJQUFHLElBQUksWUFBWSxtREFBd0IsRUFBQztnQkFDM0MsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ3pDLGlEQUFpRDtnQkFDakQsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztvQkFDaEQsSUFBRyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLElBQUksS0FBSyxFQUFDO3dCQUMvQyxPQUFPLElBQUksQ0FBQztxQkFDWjtpQkFDRDthQUNEO2lCQUNJLElBQUcsSUFBSSxZQUFZLHFCQUFTLEVBQUU7Z0JBQ2xDLElBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLElBQUksS0FBSyxFQUFDO29CQUNoRSxJQUFHLElBQUksWUFBWSx1RUFBa0MsRUFBQzt3QkFDcEQsT0FBTyxJQUFJLENBQUM7cUJBQ2I7eUJBQ0c7d0JBQ0gsT0FBTyxJQUFJLENBQUM7cUJBQ1o7aUJBQ0Q7YUFDRDtZQUVELE9BQU8sS0FBSyxDQUFDO1FBQ2QsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLDBDQUFZLEdBQXBCLFVBQXFCLElBQUk7WUFDeEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7WUFFMUIsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDeEYsSUFBSSxnQkFBZ0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFHO2dCQUNqQyxJQUFJLENBQUMsc0JBQXNCLEdBQUcsZ0JBQWdCLENBQUM7Z0JBQzlDLCtCQUErQjthQUNoQztpQkFDSTtnQkFDSixJQUFJLENBQUMsc0JBQXNCLEdBQUcsU0FBUyxDQUFDLENBQUMsaUNBQWlDO2FBQzFFO1lBQ0QsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7WUFDekIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDcEIsQ0FBQztRQUVPLDhDQUFnQixHQUF4QjtZQUNDLElBQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFbEUsNkJBQTZCO1lBQzdCLElBQUksc0JBQXNCLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQztZQUM1RCxrQkFBa0I7WUFDbEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUVwQyw2Q0FBNkM7WUFDN0MsSUFBRyxzQkFBc0IsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUM7Z0JBQzdELHNCQUFzQixHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUM7YUFDNUQ7WUFDRCxnQkFBZ0I7WUFDaEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsR0FBRyxzQkFBc0IsQ0FBQztZQUV4RCxJQUFJLHFCQUFxQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRS9FLHlCQUF5QjtZQUN6QixJQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLHNCQUFzQixDQUFDLElBQUksU0FBUyxFQUFDO2dCQUNqRSxJQUFJLENBQUMseUJBQXlCLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxJQUFJLEVBQUUscUJBQXFCLENBQUMsQ0FBQzthQUM5RztpQkFBTTtnQkFDTixJQUFJLENBQUMseUJBQXlCLENBQUMsU0FBUyxFQUFFLHFCQUFxQixDQUFDLENBQUM7YUFDakU7UUFDRixDQUFDO1FBRU8seUNBQVcsR0FBbkIsVUFBb0IsSUFBUyxFQUFFLGVBQWU7WUFDN0MsSUFBSSxxQkFBcUIsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDckUsSUFBSSxDQUFDLHlCQUF5QixDQUFDLElBQUksRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1FBQzdELENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSyx1REFBeUIsR0FBakMsVUFBa0MsSUFBNEIsRUFBRSxxQkFBOEI7WUFDN0YsSUFBSSxJQUFJLElBQUksU0FBUyxFQUFDO2dCQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLDhCQUE4QixDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNuRCxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3hDO2lCQUNJO2dCQUNKLDBCQUEwQjtnQkFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFFbkQsSUFBRyxJQUFJLFlBQVksdUJBQVUsRUFBQztvQkFDN0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDekMsSUFBSSxDQUFDLFFBQVEsQ0FBQyw4QkFBOEIsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDcEQ7cUJBQ0c7b0JBQ0gsSUFBRyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksU0FBUyxFQUFDO3dCQUNwQyxJQUFJLENBQUMsUUFBUSxDQUFDLDhCQUE4QixDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNuRCxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUN4Qzt5QkFDSSxJQUFHLElBQUksWUFBWSx5REFBMkIsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLFdBQVcsSUFBSSxJQUFJLFlBQVkscUVBQWlDLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxTQUFTO3dCQUMvSixDQUFDLENBQUMsSUFBSSxZQUFZLG1EQUF3QixJQUFJLElBQUksWUFBWSx1RUFBa0MsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDLEtBQU0sQ0FBQyxjQUFjLElBQUksS0FBSyxDQUFDLENBQUMsRUFBQzt3QkFDdEssSUFBSSxDQUFDLFFBQVEsQ0FBQyw4QkFBOEIsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDcEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFDeEM7eUJBQ0c7d0JBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDekMsSUFBSSxDQUFDLFFBQVEsQ0FBQyw4QkFBOEIsQ0FBQyxLQUFLLENBQUMsQ0FBQztxQkFDcEQ7aUJBQ0Q7YUFDRDtZQUVELElBQUkscUJBQXFCLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDekM7aUJBQ0k7Z0JBQ0osSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN4QztRQUNGLENBQUM7UUFFTSxnREFBa0IsR0FBekIsVUFBMEIsS0FBSztZQUM5QixJQUFJLGFBQWEsR0FBRyxLQUFLLENBQUM7WUFDMUIsSUFBSSxZQUFZLEdBQUcsSUFBSSwyQkFBWSxFQUFFLENBQUM7WUFDdEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3RDLElBQUksWUFBWSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUU7b0JBQzdELGFBQWEsR0FBRyxJQUFJLENBQUM7b0JBQ3JCLE1BQU07aUJBQ047YUFDRDtZQUNELE9BQU8sYUFBYSxDQUFDO1FBQ3RCLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSyxtQ0FBSyxHQUFiLFVBQWMsSUFBSTtZQUNqQixvRUFBb0U7WUFDcEUsSUFBSSxDQUFDLHNCQUFzQixHQUFHLFNBQVMsQ0FBQztZQUN4QyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDZCxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0sseUNBQVcsR0FBbkIsVUFBb0IsSUFBSTtZQUN2QixJQUFHLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxFQUFDO2dCQUN0QixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDL0IsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNwRCxJQUFHLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDO29CQUN6QixnRkFBZ0Y7b0JBQ2hGLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDM0M7YUFDRDtRQUNGLENBQUM7UUFDRDs7Ozs7Ozs7V0FRRztRQUNLLG1EQUFxQixHQUE3QixVQUE4QixRQUFRLEVBQUUsVUFBVTtZQUNqRCxJQUFJLE1BQU0sR0FBRyxJQUFJLEtBQUssRUFBYyxDQUFDO1lBQ3JDLElBQUksS0FBSyxHQUFHLElBQUksS0FBSyxFQUFPLENBQUM7WUFDN0IsSUFBSSxvQkFBb0IsR0FBRyxLQUFLLENBQUM7WUFDakMsSUFBSSxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7WUFFN0IsSUFBSSxVQUFVLElBQUksU0FBUyxJQUFJLFVBQVUsQ0FBQyxLQUFLLElBQUksU0FBUyxFQUFFO2dCQUM3RCxPQUFPLEVBQUUsQ0FBQzthQUNWO1lBRUQsSUFBSSxJQUFJLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFDakMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUM7Z0JBQzlDLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxTQUFTLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksSUFBSSxFQUFFO29CQUNyRSxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7aUJBQ3hCO2dCQUNELElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLFVBQVUsRUFBRTtvQkFDOUIsb0JBQW9CLEdBQUcsSUFBSSxDQUFDO2lCQUM1QjtnQkFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDL0IsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN4QjtZQUVELElBQUksVUFBVSxDQUFDLElBQUksWUFBWSxxRUFBaUMsRUFBQztnQkFDaEUsSUFBSSxDQUFDLHNCQUFzQixHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUM7YUFDaEQ7WUFFRCwwRkFBMEY7WUFDMUYsSUFBSSxDQUFDLG9CQUFvQixFQUFFO2dCQUMxQixNQUFNLEdBQUcsRUFBRSxDQUFDO2dCQUNaLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUM5QixJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztnQkFDMUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzVDO2lCQUNJLElBQUcsZ0JBQWdCLEVBQUU7Z0JBQ3pCLE9BQU8sRUFBRSxDQUFDO2FBQ1Y7aUJBQ0k7Z0JBQ0osTUFBTSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDaEQ7WUFFRCxPQUFPLE1BQU0sQ0FBQztRQUNmLENBQUM7UUFFRDs7Ozs7Ozs7V0FRRztRQUNLLGdEQUFrQixHQUExQixVQUEyQixNQUF5QixFQUFFLFFBQVE7WUFDN0QsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3RDLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksWUFBWSxxRUFBaUMsRUFBQztvQkFDakUsSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7b0JBQzlDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUMzQixJQUFJLGFBQWEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUM7d0JBQ3JDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUNwQixRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzt3QkFDdEIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO3FCQUNQO2lCQUNEO2FBQ0Q7WUFFRCxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDeEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzdDO1lBRUQsT0FBTyxNQUFNLENBQUM7UUFDZixDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNLLCtDQUFpQixHQUF6QixVQUEwQixJQUFJO1lBQzdCLElBQUksT0FBTyxHQUFHLElBQUksS0FBSyxFQUFjLENBQUM7WUFDdEMsSUFBRyxJQUFJLFlBQVkscUJBQVMsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLFNBQVMsRUFBQyxFQUFFLGlCQUFpQjtnQkFDMUUsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDekI7aUJBQ0ksSUFBRyxJQUFJLFlBQVksK0JBQWMsRUFBQyxFQUFFLDBDQUEwQztnQkFDbEYsT0FBTyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDeEI7WUFDRCxPQUFPLE9BQU8sQ0FBQztRQUNoQixDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNLLHlDQUFXLEdBQW5CLFVBQW9CLElBQXFCO1lBQ3hDLElBQUcsSUFBSSxJQUFJLFNBQVMsRUFBQztnQkFDcEIsT0FBTyxLQUFLLENBQUM7YUFDYjtZQUNELElBQUcsSUFBSSxDQUFDLGFBQWEsSUFBSSxTQUFTLEVBQUM7Z0JBQ2xDLE9BQU8sSUFBSSxDQUFDO2FBQ1o7WUFDRCxPQUFPLEtBQUssQ0FBQztRQUNkLENBQUM7UUFFRCwrQ0FBaUIsR0FBakIsVUFBa0IsSUFBSTtZQUNyQixJQUFHLElBQUksSUFBSSxTQUFTLEVBQUM7Z0JBQ3BCLE9BQU87YUFDUDtZQUNELElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDN0IsSUFBSSxVQUFVLENBQUM7WUFDZixJQUFHLFlBQVksWUFBWSx1QkFBVSxJQUFJLFlBQVksWUFBWSwrQkFBYyxFQUFDO2dCQUMvRSx5REFBeUQ7Z0JBQ3pELFVBQVUsR0FBRyxZQUFZLENBQUM7YUFDMUI7aUJBQ0c7Z0JBQ0gsVUFBVSxHQUFHLFlBQVksQ0FBQyxhQUFhLEVBQUUsQ0FBQzthQUMxQztZQUNELElBQUcsVUFBVSxJQUFJLFNBQVMsRUFBQztnQkFFMUIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM1QixPQUFPLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUNsRDtZQUNELE9BQU8sU0FBUyxDQUFDO1FBQ2xCLENBQUM7UUFFTyx1REFBeUIsR0FBakMsVUFBa0MsU0FBMEI7WUFDM0QsSUFBSSxXQUFXLEdBQUcsSUFBSSxtREFBd0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUM5RCxJQUFJLENBQUMsbUNBQW1DLEdBQUcsV0FBVyxDQUFDO1lBQ3ZELFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QyxPQUFPLFdBQVcsQ0FBQztRQUNqQixDQUFDO1FBRUcsa0RBQW9CLEdBQTNCO1lBQ0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsdUJBQVUsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQztZQUNoRixPQUFPLGlCQUFNLG9CQUFvQixXQUFFLENBQUM7UUFDckMsQ0FBQztRQUVNLGtEQUFvQixHQUEzQixVQUE0QixJQUF1QjtZQUNsRCxpQkFBTSxvQkFBb0IsWUFBQyxJQUFJLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsdUJBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1FBQy9FLENBQUM7UUFFTywrQ0FBaUIsR0FBekI7WUFDQyxJQUFJLFFBQVEsR0FBRyxFQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUMsQ0FBQztZQUN2RCxPQUFPLFFBQVEsQ0FBQztRQUNqQixDQUFDO1FBRU8sK0NBQWlCLEdBQXpCLFVBQTBCLElBQVM7WUFDbEMsSUFBRyxJQUFJLElBQUksU0FBUyxFQUFDO2dCQUNYLE9BQU87YUFDaEI7WUFDRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztRQUMvQyxDQUFDO1FBRUQsOENBQWdCLEdBQWhCLFVBQWlCLFFBQWlCO1lBRWpDLGlDQUFpQztZQUNqQyxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUMxQyxJQUFJLFdBQVcsR0FBRyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsbUJBQW1CLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDakYsSUFBSSxpQkFBaUIsR0FBRyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsbUJBQW1CLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUM3RixJQUFJLFdBQVcsR0FBRyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsbUJBQW1CLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDakYsSUFBRyxRQUFRLElBQUksSUFBSSxFQUFDO2dCQUNuQixVQUFVLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDOUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDcEQsVUFBVSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDOUM7aUJBQ0c7Z0JBQ0gsVUFBVSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQzlDLFVBQVUsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3BELFVBQVUsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQzlDO1lBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDaEIsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNJLGdFQUFrQyxHQUF6QyxVQUEwQyxhQUF5QjtZQUNsRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDOUMsSUFBSSxJQUFJLENBQUMsc0JBQXNCLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSwrQkFBYyxDQUFDLGtCQUFrQixDQUFDLElBQUksSUFBSSxDQUFDLHNCQUFzQixDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsK0JBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO29CQUNqTCxPQUFPLElBQUksQ0FBQztpQkFDWjthQUNEO1lBQ0QsT0FBTyxLQUFLLENBQUM7UUFDZCxDQUFDO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDSyxvREFBc0IsR0FBOUIsVUFBK0IsSUFBa0MsRUFBRSxnQkFBd0I7WUFDMUYsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUV6QixJQUFJLE1BQU0sWUFBWSwrQkFBYyxJQUFJLE1BQU0sQ0FBQyxFQUFFLElBQUksZ0JBQWdCLEVBQUU7Z0JBQ3RFLE9BQU8sSUFBSSxDQUFDO2FBQ1o7aUJBQ0ksSUFBSSxDQUFDLENBQUMsTUFBTSxZQUFZLHVCQUFVLENBQUMsRUFBQztnQkFDeEMsT0FBTyxJQUFJLENBQUMsc0JBQXNCLENBQUMsTUFBTyxFQUFFLGdCQUFnQixDQUFDLENBQUM7YUFDOUQ7aUJBQ0k7Z0JBQ0osT0FBTyxLQUFLLENBQUM7YUFDYjtRQUNGLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0ssNENBQWMsR0FBdEIsVUFBdUIsSUFBb0IsRUFBRSxZQUFpQztZQUM3RSxJQUFHLElBQUksS0FBSyw0QkFBYyxDQUFDLE9BQU8sRUFBRTtnQkFDbkMsSUFBSSxDQUFDLDZCQUE2QixFQUFFLENBQUM7YUFDckM7aUJBQ0ksSUFBRyxJQUFJLEtBQUssNEJBQWMsQ0FBQyxLQUFLLEVBQUU7Z0JBQ3RDLElBQUksQ0FBQyxtQ0FBbUMsQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUN2RDtRQUNGLENBQUM7UUFFRDs7OztXQUlHO1FBQ0ssMkRBQTZCLEdBQXJDO1lBQ0MsSUFBSSx5QkFBVyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLHVCQUF1QixFQUFDLElBQUksQ0FBQyx3QkFBd0IsRUFBRSw0QkFBYyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNuSSxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSSwyREFBNkIsR0FBcEMsVUFBcUMsWUFBWTtZQUNoRCxJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDakMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBRWhCLElBQUkseUJBQVcsRUFBRSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsNEJBQWMsQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFFNUgsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDaEMsQ0FBQyxDQUFDLENBQUM7UUFDSixDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ssaUVBQW1DLEdBQTNDLFVBQTRDLFlBQWlDO1lBQzVFLElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNqQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7WUFFaEIsSUFBSSx5QkFBVyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLHVCQUF1QixFQUFDLElBQUksQ0FBQyx3QkFBd0IsRUFBRSw0QkFBYyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztZQUUvSCxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDckIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNoQyxDQUFDLENBQUMsQ0FBQztRQUNKLENBQUM7UUFFUyx5Q0FBVyxHQUFsQixVQUFtQixLQUFLO1lBQzFCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7WUFDN0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzdCLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3hDO1lBQ0QsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztZQUM5QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDaEIsQ0FBQztRQUVELHdDQUFVLEdBQVYsVUFBVyxJQUFJO1lBQ2QsSUFBRyxJQUFJLENBQUMsU0FBUyxFQUFDO2dCQUNqQixJQUFHLElBQUksWUFBWSxxQkFBUyxFQUFDO29CQUM1QixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUMzQjtxQkFDRztvQkFDSCxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ2hDO2FBQ0Q7UUFDRixDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ssa0RBQW9CLEdBQTVCLFVBQTZCLFVBQTJCO1lBQzdCLElBQUksQ0FBQyxVQUFXLENBQUMsb0JBQW9CLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDN0UsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLDZDQUFlLEdBQXZCLFVBQXdCLFNBQXFCO1lBQ2xCLElBQUksQ0FBQyxVQUFXLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZFLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSSw4Q0FBZ0IsR0FBdkIsVUFBd0IsUUFBaUM7WUFBekQsaUJBS0M7WUFKQSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxpQ0FBZSxDQUFDLG1CQUFtQixFQUFFLHlCQUFPLENBQUMsWUFBWSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2xHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkIsK0RBQStEO1lBQy9ELFVBQVUsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsRUFBNUIsQ0FBNEIsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNyRCxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSSw4Q0FBZ0IsR0FBdkI7WUFDQyxJQUFJLENBQUMsbUNBQW1DLEdBQUcsU0FBUyxDQUFDO1lBQ3JELElBQUksQ0FBQyxhQUFhLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1lBQ25GLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLHlDQUF5QztRQUM3RixDQUFDO1FBRU0scURBQXVCLEdBQTlCO1lBQUEsaUJBS0M7WUFKQSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxpQ0FBZSxDQUFDLG1CQUFtQixFQUFFLHlCQUFPLENBQUMsWUFBWSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2xHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkIsK0RBQStEO1lBQy9ELFVBQVUsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLFVBQVUsRUFBRSxFQUFqQixDQUFpQixFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzFDLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0ssa0RBQW9CLEdBQTVCLFVBQTZCLE1BQXdCLEVBQUUsSUFBeUI7WUFDL0UsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksaUNBQWUsQ0FBQyxtQkFBbUIsRUFBRSx5QkFBTyxDQUFDLFlBQVksRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNsRyxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFaEQsSUFBSSxVQUFVLElBQUksU0FBUyxFQUFFO2dCQUM1QixJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUN0QztpQkFDSTtnQkFDSixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3ZCO1lBRUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUM7UUFDcEYsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLDJDQUFhLEdBQXJCLFVBQXNCLFFBQWlDO1lBQ3RELElBQUksSUFBSSxHQUFHLHVDQUFrQixDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN4RCxJQUFHLElBQUksS0FBSyxTQUFTLEVBQUU7Z0JBQ3RCLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztnQkFDbEQsMkJBQVksQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ2pEO1lBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQixDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSyx3Q0FBVSxHQUFsQjtZQUNDLElBQUcsSUFBSSxDQUFDLGVBQWUsSUFBSSxTQUFTLEVBQUMsRUFBRSx1Q0FBdUM7Z0JBQzdFLElBQUksOEJBQThCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO2dCQUMzRSxJQUFJLHNCQUFzQixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztnQkFFekUsSUFBRyw4QkFBOEIsS0FBSyxTQUFTLElBQUksc0JBQXNCLEtBQUssU0FBUyxFQUFFO29CQUM1RSxJQUFJLElBQUksR0FBRyxFQUFDLHdCQUF3QixFQUFFLDhCQUE4QixFQUFFLGdCQUFnQixFQUFFLHNCQUFzQixFQUFDLENBQUM7b0JBQzVILElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3RDLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQztvQkFDekQsMkJBQVksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUM5QzthQUNEO2lCQUNHO2dCQUNILE9BQU8sQ0FBQyxLQUFLLENBQUMsMENBQTBDLENBQUMsQ0FBQzthQUMxRDtZQUNELElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckIsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLHlDQUFXLEdBQW5CLFVBQW9CLElBQXlCO1lBQTdDLGlCQUlDO1lBSEEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuQiwrREFBK0Q7WUFDL0QsVUFBVSxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFyQixDQUFxQixFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzlDLENBQUM7UUFHRDs7Ozs7O1dBTUc7UUFDSyx3Q0FBVSxHQUFsQixVQUFtQixZQUFpQztZQUFwRCxpQkFzQkM7WUFyQkEsWUFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFDLFFBQVEsRUFBRSxRQUFRO2dCQUN2QyxJQUFHLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUM7b0JBQzFDLElBQUksV0FBVyxHQUFHLHVDQUFrQixDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7b0JBQ3pFLElBQUksWUFBVSxHQUFHLElBQUksK0JBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFFOUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFBLFVBQVU7d0JBQzdCLFlBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDOUMsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsS0FBSSxDQUFDLG1DQUFtQyxHQUFHLFlBQVUsQ0FBQztvQkFDNUIsS0FBSSxDQUFDLFVBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxZQUFVLEVBQUUsK0JBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2lCQUM1RztxQkFDSSxJQUFJLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUM7b0JBQ2hELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ2hDLEtBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ3pCO3FCQUNHO29CQUNILE9BQU8sQ0FBQyxLQUFLLENBQUMsMENBQTBDLEdBQUcsUUFBUSxDQUFDLENBQUM7aUJBQ3JFO1lBRUYsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JCLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0ssaURBQW1CLEdBQTNCLFVBQTRCLFlBQWlDO1lBQzVELElBQUksb0JBQW9CLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDMUUsSUFBSSxjQUFjLEdBQUcsS0FBSyxDQUFDO1lBRTNCLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBQyxRQUFRLEVBQUUsUUFBUTtnQkFDdkMsSUFBSSxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO29CQUM1QyxjQUFjLEdBQUcsSUFBSSxDQUFDO2lCQUN0QjtZQUNGLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxjQUFjLElBQUksWUFBWSxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUU7Z0JBQzVDLE9BQU8sNEJBQWMsQ0FBQyxPQUFPLENBQUM7YUFDOUI7aUJBQ0ksSUFBRyxjQUFjLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtnQkFDaEQsT0FBTyw0QkFBYyxDQUFDLEtBQUssQ0FBQzthQUM1QjtpQkFDSTtnQkFDSixPQUFPLFNBQVMsQ0FBQzthQUNqQjtRQUNGLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0ssa0RBQW9CLEdBQTVCLFVBQTZCLElBQUk7WUFDaEMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ25CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNyQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDOUIsT0FBTyxHQUFHLEtBQUssQ0FBQztvQkFDaEIsTUFBTTtpQkFDTjthQUNEO1lBQ0QsT0FBTyxPQUFPLENBQUM7UUFDaEIsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLDJDQUFhLEdBQXJCLFVBQXNCLElBQUk7WUFDekIsSUFBRyxJQUFJLENBQUMsZUFBZSxFQUFDLEVBQUUsdUNBQXVDO2dCQUNoRSxvRkFBb0Y7Z0JBQ3BGLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBRXZCLElBQUcsSUFBSSxDQUFDLHNCQUFzQixJQUFJLFNBQVMsRUFBQztvQkFDM0MsK0NBQStDO29CQUMvQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSyxFQUFFLENBQUM7aUJBQ3BDO2dCQUVELHVDQUF1QztnQkFDdkMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQy9ELDhCQUE4QjtnQkFDOUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDM0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztnQkFDakUsSUFBSSxDQUFDLGVBQWUsQ0FBRSxLQUFLLENBQUMsQ0FBQztnQkFDN0IsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO2FBQ2Q7aUJBQ0c7Z0JBQ0gsT0FBTyxDQUFDLEtBQUssQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO2FBQzFEO1FBQ0YsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLHdDQUFVLEdBQWxCLFVBQW1CLFNBQW9DO1lBQ3RELElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQzFDLElBQUksTUFBTSxHQUFTLFVBQVUsQ0FBQyxLQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxVQUFBLE1BQU0sSUFBSyxPQUFPLE1BQU0sQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFBLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekcsSUFBRyxNQUFNLElBQUksU0FBUyxFQUFDO2dCQUN0QiwyRUFBMkU7Z0JBQzNFLElBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxXQUFXLElBQUksS0FBSyxFQUFDO29CQUN6QyxVQUFVLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtpQkFDckQ7Z0JBRUQsZ0pBQWdKO2dCQUNoSixpRUFBaUU7Z0JBQ2pFLFVBQVUsQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDNUIsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFDLGtCQUFrQixFQUFHLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUMxRCxJQUFJLFNBQVMsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztnQkFDM0MsdUZBQXVGO2dCQUN2RixJQUFJLFdBQVcsR0FBRSxJQUFJLENBQUMsY0FBYyxDQUFPLFVBQVUsQ0FBQyxLQUFNLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDeEYsSUFBSSxZQUFZLEdBQUksQ0FBQyxXQUFXLEdBQUMsQ0FBQyxDQUFDLEdBQUMsU0FBVSxDQUFDO2dCQUMvQyxVQUFVLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLHNEQUFzRDtnQkFDN0csc0NBQXNDO2FBQ3RDO1FBQ0YsQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ0ssNENBQWMsR0FBdEIsVUFBdUIsSUFBZ0IsRUFBRSxRQUFnQjtZQUN4RCxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUM7WUFDcEIsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQ2hDLElBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxRQUFRLEVBQUM7b0JBQzVCLFdBQVcsRUFBRSxDQUFBO29CQUNiLE9BQU8sV0FBVyxDQUFDO2lCQUNuQjtnQkFDRDs7Ozs7O3VCQU1PLENBQUEsSUFBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxZQUFZLCtCQUFjLEVBQUM7b0JBQ2hELElBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBQzt3QkFDakQsU0FBUztxQkFDVDtvQkFDRCxXQUFXLEVBQUUsQ0FBQztpQkFDZDtxQkFDSSxJQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLFlBQVkscUJBQVMsRUFBQztvQkFDekMsSUFBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFDO3dCQUM1QyxTQUFTO3FCQUNUO29CQUNELFdBQVcsRUFBRSxDQUFDO2lCQUNkO2FBQ0Q7WUFDRCxPQUFPLFdBQVcsQ0FBQztRQUNwQixDQUFDO1FBRU8scURBQXVCLEdBQS9CLFVBQWdDLElBQUk7WUFDbkMsSUFBRyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksRUFBQztnQkFDMUIsSUFBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsSUFBSSxLQUFLLEVBQUM7b0JBQ3ZDLE9BQU8sS0FBSyxDQUFDO2lCQUNiO3FCQUNJLElBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLElBQUksU0FBUyxFQUFDO29CQUMvQyxJQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLFdBQVcsSUFBSSxLQUFLLEVBQUM7d0JBQ2xELE9BQU8sS0FBSyxDQUFDO3FCQUNiO2lCQUNEO2FBQ0Q7WUFDRCxPQUFPLElBQUksQ0FBQztRQUNiLENBQUM7UUFFTyxnREFBa0IsR0FBMUIsVUFBMkIsSUFBSTtZQUM5QixJQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxXQUFXLElBQUksS0FBSyxFQUFDO2dCQUMxRixPQUFPLEtBQUssQ0FBQzthQUNiO2lCQUNJLElBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsVUFBVSxJQUFJLFNBQVMsRUFBQztnQkFDMUQsSUFBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsV0FBVyxJQUFJLEtBQUssRUFBQztvQkFDN0QsT0FBTyxLQUFLLENBQUM7aUJBQ2I7YUFDRDtZQUNELE9BQU8sSUFBSSxDQUFDO1FBQ2IsQ0FBQztRQUVPLDZEQUErQixHQUF2QztZQUNPLGlEQUFpRDtZQUNqRCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDbkIsQ0FBQztRQUVKOzs7Ozs7O1dBT0c7UUFDSyxtREFBcUIsR0FBN0IsVUFBOEIsUUFBZ0I7WUFDN0MsSUFBRyxRQUFRLElBQUksbUJBQW1CLENBQUMsYUFBYSxFQUFDO2dCQUNoRCxPQUFPLDJWQUlLLENBQUE7YUFDWjtpQkFDSSxJQUFHLFFBQVEsSUFBSSxtQkFBbUIsQ0FBQyxZQUFZLEVBQUM7Z0JBQ3BELE9BQU8sNHBCQVVLLENBQUM7YUFDYjtZQUNELE9BQU8sRUFBRSxDQUFDO1FBQ1gsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLG1EQUFxQixHQUE3QixVQUE4QixNQUFrQjtZQUMvQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNsRCxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ssMENBQVksR0FBcEIsVUFBcUIsSUFBWTtZQUNoQyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEMsQ0FBQztRQUVFLDJDQUFhLEdBQWIsVUFBYyxJQUFrQjtZQUM1QixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUM5QixDQUFDO1FBbGlESixxQkFBcUI7UUFDRSxnQ0FBWSxHQUFHLE1BQU0sQ0FBQztRQUN0QixpQ0FBYSxHQUFHLE9BQU8sQ0FBQztRQUN4Qix1Q0FBbUIsR0FBRyxhQUFhLENBQUM7UUFDcEMsaUNBQWEsR0FBRyxPQUFPLENBQUM7UUFDeEIsMENBQXNCLEdBQUcsZ0JBQWdCLENBQUM7UUE4aERsRSwwQkFBQztLQUFBLEFBcmlERCxDQUFrQyx1Q0FBa0IsR0FxaURuRDtJQUVRLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9saWJzL3VpL1R5cGVzL2VqLndlYi5hbGwuZC50c1wiIC8+XHJcbmltcG9ydCB7IEV2ZW50TW9kZWxDaGFuZ2VkQXJncywgSURhdGFNb2RlbCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvZGF0YU1vZGVsSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFRyZWVHcmlkV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vdHJlZUdyaWRXaWRnZXRCYXNlXCI7XHJcbmltcG9ydCB7IFNlcmllR3JvdXAgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbW1vbi9zaWduYWwvc2VyaWVHcm91cFwiO1xyXG5pbXBvcnQgeyBJU2lnbmFsTWFuYWdlckRhdGFNb2RlbCwgSUNoYXJ0TWFuYWdlckRhdGFNb2RlbCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvZGF0YU1vZGVsc1wiO1xyXG5pbXBvcnQgeyBTbVRyZWVHcmlkQ2VsbEVkaXRFdmVudHMgfSBmcm9tIFwiLi92aWV3L3NtVHJlZUdyaWRDZWxsRWRpdEV2ZW50c1wiO1xyXG5pbXBvcnQgeyBTbVRyZWVHcmlkQ2VsbEVkaXRUZW1wbGF0ZSB9IGZyb20gXCIuL3ZpZXcvc21UcmVlR3JpZENlbGxFZGl0VGVtcGxhdGVcIjtcclxuaW1wb3J0IHsgU2lnbmFsTWFuYWdlclRyZWVHcmlkVG9vbGJhciB9IGZyb20gXCIuL3ZpZXcvc2lnbmFsTWFuYWdlclRyZWVHcmlkVG9vbGJhclwiO1xyXG5pbXBvcnQgeyBGaWxlUHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2ZpbGVQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBUeXBlZEV2ZW50IH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9ldmVudHNcIjtcclxuaW1wb3J0IHsgRXhwb3J0SW1wb3J0SGVscGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9leHBvcnRJbXBvcnRIZWxwZXJcIjtcclxuaW1wb3J0IHsgQnVzeUluZm9ybWF0aW9uLCBJbWFnZUlkIH0gZnJvbSBcIi4uL2NvbW1vbi9idXN5SW5mb3JtYXRpb25cIjtcclxuaW1wb3J0IHsgSVNpZ25hbE1hbmFnZXJXaWRnZXQgfSBmcm9tIFwiLi4vd2lkZ2V0c1wiO1xyXG5pbXBvcnQgeyBTaWduYWxDYXRlZ29yeSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvc2lnbmFsTWFuYWdlckRhdGFNb2RlbC9zaWduYWxDYXRlZ29yeVwiO1xyXG5pbXBvcnQgeyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb24gfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvc2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uXCI7XHJcbmltcG9ydCB7IElTZXJpZUNvbnRhaW5lciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL2ludGVyZmFjZXMvc2VyaWVDb250YWluZXJJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVNlcmllTm9kZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL2ludGVyZmFjZXMvc2VyaWVOb2RlSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNlcmllQ29udGFpbmVyIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb21tb24vc2lnbmFsL3NlcmllQ29udGFpbmVyXCI7XHJcbmltcG9ydCB7IFNlcmllTm9kZSwgTm9kZVR5cGUgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbW1vbi9zaWduYWwvc2VyaWVOb2RlXCI7XHJcbmltcG9ydCB7IERyYWdEcm9wRGF0YUlkLCBJRHJvcHBhYmxlIH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL2Ryb3BJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSURyYWdnYWJsZSB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy9kcmFnSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IERyYWdEcm9wRGF0YU9iamVjdCB9IGZyb20gXCIuLi9jb21tb24vZHJhZ0RhdGFPYmplY3RcIjtcclxuaW1wb3J0IHsgQmFzZVNlcmllcyB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2Jhc2VTZXJpZXNcIjtcclxuaW1wb3J0IHsgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhIH0gZnJvbSBcIi4uLy4uL21vZGVscy9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsL3NpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YVwiO1xyXG5pbXBvcnQgeyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25PdXRwdXREYXRhIH0gZnJvbSBcIi4uLy4uL21vZGVscy9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsL3NpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbk91dHB1dERhdGFcIjtcclxuaW1wb3J0IHsgSW1hZ2VQcm92aWRlciB9IGZyb20gXCIuLi9jb21tb24vaW1hZ2VQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBEcmFnRHJvcFJlcHJlc2VudGF0aW9uIH0gZnJvbSBcIi4uL2NvbW1vbi9kcmFnRHJvcFJlcHJlc2VudGF0aW9uXCI7XHJcbmltcG9ydCB7IERyYWdEcm9wQXJncyB9IGZyb20gXCIuLi9jb21tb24vZHJhZ0Ryb3BBcmdzXCI7XHJcbmltcG9ydCB7IFNpZ25hbE1hbmFnZXJDYWxjdWxhdG9yVHlwZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvc2lnbmFsTWFuYWdlckRhdGFNb2RlbC9zaWduYWxNYW5hZ2VyQ2FsY3VsYXRvclR5cGVcIjtcclxuaW1wb3J0IHsgU2VyaWVzVHlwZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL3Nlcmllc1R5cGVcIjtcclxuaW1wb3J0IHsgRXhwb3J0U2VyaWVHcm91cCB9IGZyb20gXCIuLi8uLi9jb21tb24vZXhwb3J0U2VyaWVHcm91cFwiO1xyXG5pbXBvcnQgeyBFeHBvcnRIZWxwZXIgfSBmcm9tIFwiLi9oZWxwZXJzL2V4cG9ydEhlbHBlclwiO1xyXG5pbXBvcnQgeyBBbGVydERpYWxvZywgbWVzc2FnZUJveFR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL2FsZXJ0RGlhbG9nXCI7XHJcbmltcG9ydCB7IFNpZ25hbFJvb3QgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvc2lnbmFsUm9vdFwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnRTZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi9kZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vd2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBJU2VyaWVzUHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbW1vbi9zZXJpZXNQcm92aWRlci9zZXJpZXNQcm92aWRlckludGVyZmFjZVwiO1xyXG5cclxuY2xhc3MgRXZlbnRTZXJpZURvdWJsZUNsaWNrZWQgZXh0ZW5kcyBUeXBlZEV2ZW50PElTaWduYWxNYW5hZ2VyV2lkZ2V0LCBCYXNlU2VyaWVzPnsgfTtcclxuY2xhc3MgRXZlbnRDaGFuZ2VTaXplIGV4dGVuZHMgVHlwZWRFdmVudDxJU2lnbmFsTWFuYWdlcldpZGdldCwgbnVtYmVyPnsgfTtcclxuXHJcbmNsYXNzIFNpZ25hbE1hbmFnZXJXaWRnZXQgZXh0ZW5kcyBUcmVlR3JpZFdpZGdldEJhc2UgaW1wbGVtZW50cyBJU2lnbmFsTWFuYWdlcldpZGdldCwgSURyYWdnYWJsZSwgSURyb3BwYWJsZXtcclxuXHRcclxuXHQvLyBjb2x1bW4gZGVmaW5pdGlvbnNcclxuXHRwdWJsaWMgc3RhdGljIHJlYWRvbmx5IG5hbWVDb2x1bW5JZCA9IFwibmFtZVwiO1xyXG5cdHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgdmFsdWVDb2x1bW5JZCA9IFwidmFsdWVcIjtcclxuXHRwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGRlc2NyaXB0aW9uQ29sdW1uSWQgPSBcImRlc2NyaXB0aW9uXCI7XHJcblx0cHVibGljIHN0YXRpYyByZWFkb25seSBjb2xvckNvbHVtbklkID0gXCJjb2xvclwiO1xyXG5cdHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgaWNvbkRlZmluaXRpb25Db2x1bW5JZCA9IFwiaWNvbkRlZmluaXRpb25cIjtcclxuXHJcblx0cHJpdmF0ZSByZWFkb25seSBfaGlnaGxpZ2h0QXJlYUlkID0gXCJzaWduYWxNYW5hZ2VyX0hpZ2hsaWdodGVkXCI7XHJcblxyXG5cdHByaXZhdGUgcmVhZG9ubHkgX2RlbGV0ZUl0ZW1zQ29udGVudCA9IFwiVGhpcyBhY3Rpb24gd2lsbCBwZXJtYW5lbnRseSBkZWxldGUgc2VsZWN0ZWQgZWxlbWVudHMuXCI7XHJcblx0cHJpdmF0ZSByZWFkb25seSBfZGVsZXRlSXRlbXNIZWFkZXIgPSBcIkRlbGV0ZSByZWNvcmRlZCBkYXRhP1wiO1xyXG5cdHByaXZhdGUgcmVhZG9ubHkgX3dhcm5pbmdJbXBvcnRpbmdIZWFkZXIgPSBcIkltcG9ydCBjYW5jZWxlZFwiXHJcblx0cHJpdmF0ZSByZWFkb25seSBfd2FybmluZ0ltcG9ydGluZ0NvbnRlbnQgPSBcIkl0IGlzIG5vdCBwb3NzaWJsZSB0byBpbXBvcnQgb25lIC5tY2UgZmlsZSB3aXRoIG90aGVyIGZpbGVzIGF0IHRoZSBzYW1lIHRpbWUuXCIgXHJcblx0cHJpdmF0ZSByZWFkb25seSBfTUNFRmlsZXNJbXBvcnRlZEhlYWRlciA9IFwiRGVsZXRlIGFsbCB0cmFjZSBkYXRhP1wiO1xyXG5cdHByaXZhdGUgcmVhZG9ubHkgX01DRUZpbGVzSW1wb3J0ZWRDb250ZW50ID0gXCJEbyB5b3Ugd2FudCB0byBkZWxldGUgYWxsIHRyYWNlIGRhdGEgYW5kIGltcG9ydCB0aGUgLm1jZSBmaWxlP1wiO1xyXG5cclxuXHRwcml2YXRlIF9pbmRleGVzRHJhZ2dlZDogQXJyYXk8bnVtYmVyPiA9IFtdO1xyXG5cclxuXHRwcml2YXRlIF9jdXJyZW50RHJhZ0Ryb3BTZXJpZXM/OiBBcnJheTxCYXNlU2VyaWVzPjtcclxuXHJcblx0cHJpdmF0ZSBfY3VycmVudENhbGN1bGF0b3JUeXBlPzogU2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlO1xyXG5cclxuXHRwcml2YXRlIF90b29sYmFyITogU2lnbmFsTWFuYWdlclRyZWVHcmlkVG9vbGJhcjtcclxuXHJcblx0cHJpdmF0ZSBfc2VyaWVDb250YWluZXJUb1NlbGVjdEFmdGVyUmVmcmVzaDogSVNlcmllQ29udGFpbmVyfHVuZGVmaW5lZDtcclxuXHRcdFxyXG5cdHByaXZhdGUgX2ZpbGVQcm92aWRlciA9IG5ldyBGaWxlUHJvdmlkZXIoKTtcclxuXHJcblx0cHJpdmF0ZSBfc2VyaWVzUHJvdmlkZXI6IElTZXJpZXNQcm92aWRlcnx1bmRlZmluZWQ7XHJcblxyXG5cdHByaXZhdGUgX2NoYXJ0TWFuYWdlckRhdGFNb2RlbDogSUNoYXJ0TWFuYWdlckRhdGFNb2RlbHx1bmRlZmluZWQ7XHJcblx0cHJpdmF0ZSBfc3VwcHJlc3NSZWZyZXNoID0gZmFsc2U7XHJcblxyXG5cdHB1YmxpYyBlZGl0TW9kZUFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuXHRfY3VycmVudFRhcmdldDtcclxuXHJcblx0ZXZlbnRTZXJpZURvdWJsZUNsaWNrZWQgPSBuZXcgRXZlbnRTZXJpZURvdWJsZUNsaWNrZWQoKTtcclxuXHRcclxuXHRldmVudENoYW5nZVNpemUgPSBuZXcgRXZlbnRDaGFuZ2VTaXplKCk7XHJcblx0XHJcblx0cHJpdmF0ZSBfdXBsb2FkRGF0YUZpbmlzaGVkSGFuZGxlciA9IChzZW5kZXIsYXJncyk9PnRoaXMub25VcGxvYWREYXRhRmluaXNoZWQoc2VuZGVyLGFyZ3MpO1xyXG5cclxuXHQvKipcclxuXHQgKiBHZXRzIHRoZSBpbmZvcm1hdGlvbiBpZiB0aGUgYXV0byB1cGxvYWQgb2YgdHJhY2VkYXRhIGlzIGFjdGl2ZVxyXG5cdCAqXHJcblx0ICogQHJlYWRvbmx5XHJcblx0ICogQHR5cGUge2Jvb2xlYW59XHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRnZXQgYXV0b1VwbG9hZEFjdGl2ZSgpOmJvb2xlYW57XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG4gIFx0LyoqXHJcblx0ICogSW5pdGlhbGl6ZXMgdGhlIHNpZ25hbCBtYW5hZ2VyXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbGF5b3V0Q29udGFpbmVySWRcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdGluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQ6IHN0cmluZyl7XHJcblx0XHRzdXBlci5pbml0aWFsaXplKGxheW91dENvbnRhaW5lcklkLCAzMCk7XHJcblx0XHRzdXBlci5zZXRIZWFkZXJDb250ZW50KFwiU2lnbmFsc1wiKTtcclxuXHJcblx0XHQvLyBTZXQgZHluYW1pYyBjb2x1bW4gc2V0dGluZ3NcclxuXHRcdHN1cGVyLnNldER5bmFtaWNDb2x1bW4oMCwgNDApO1xyXG5cclxuXHRcdC8vIEFkZCBkcmFnIHN1cHBvcnRcclxuXHRcdHN1cGVyLmFkZERyYWdnaW5nU3VwcG9ydCgpO1xyXG5cdFx0XHJcblx0XHQvLyBBZGQgZHJvcCBzdXBwb3J0XHJcblx0XHRzdXBlci5hZGRTdXBwb3J0ZWREcmFnRHJvcERhdGFJZChEcmFnRHJvcERhdGFJZC5zaWduYWwpXHJcblx0fVxyXG5cdFxyXG5cdGluaXRpYWxpemVDb21wb25lbnQoKXtcclxuXHRcdHRoaXMuY29tcG9uZW50LmRlZmF1bHRTZXR0aW5nc0RhdGFJZCA9IERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5XaWRnZXREZWZpbml0aW9uSWQ7XHJcblx0XHR0aGlzLmNvbXBvbmVudC5kaXNhYmxlUGVyc2lzdGluZygpO1xyXG4gICAgfVxyXG5cclxuXHRkaXNwb3NlKCl7XHJcblx0XHR0aGlzLnJlbW92ZVN1cHBvcnRlZERyYWdEcm9wRGF0YUlkKERyYWdEcm9wRGF0YUlkLnNpZ25hbCk7XHJcblx0XHRzdXBlci5kaXNwb3NlKCk7XHJcblx0fVxyXG5cdCBcclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IGNvbXBvbmVudCBzZXR0aW5ncyBmb3IgdGhpcyB3aWRnZXRcclxuXHQgKlxyXG5cdCAqIEByZXR1cm5zIHsqfVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0Z2V0RGVmYXVsdENvbXBvbmVudFNldHRpbmdzKCk6IENvbXBvbmVudFNldHRpbmdze1xyXG4gICAgICAgIHJldHVybiBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuZ2V0U2lnbmFsTWFuYWdlcldpZGdldERlZmluaXRpb24oKTtcclxuXHR9XHJcblx0XHJcblx0Ly8jcmVnaW9uIGRyYWcgc3VwcG9ydFxyXG5cdHN0YXJ0RHJhZ2dpbmcoKTogRHJhZ0Ryb3BEYXRhT2JqZWN0fHVuZGVmaW5lZHtcclxuXHRcdGlmKHRoaXMuX2N1cnJlbnREcmFnRHJvcFNlcmllcyAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHRsZXQgc2lnbmFsSW1hZ2UsXHJcblx0XHRcdFx0c2lnbmFsTmFtZTtcclxuXHRcdFx0aWYgKHRoaXMuX2N1cnJlbnREcmFnRHJvcFNlcmllcy5sZW5ndGggPT0gMSkge1xyXG5cdFx0XHRcdC8vIERlZmF1bHQgeXQgc2VyaWVzIHN2Z1xyXG5cdFx0XHRcdHNpZ25hbE5hbWUgPSB0aGlzLl9jdXJyZW50RHJhZ0Ryb3BTZXJpZXNbMF0ubmFtZTtcclxuXHRcdFx0XHRzaWduYWxJbWFnZSA9IEltYWdlUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXRJbWFnZShcIi4uL2FwcC93aWRnZXRzL2NvbW1vbi9zdHlsZS9pbWFnZXMvZHJhZ0Ryb3AveXRTZXJpZXMuc3ZnXCIpO1xyXG5cdFx0XHRcdGlmKHRoaXMuX2N1cnJlbnREcmFnRHJvcFNlcmllc1swXS50eXBlID09IFNlcmllc1R5cGUueHlTZXJpZXMpe1xyXG5cdFx0XHRcdFx0Ly8gVXNlIHh5IHNlcmllcyBzdmdcclxuXHRcdFx0XHRcdHNpZ25hbEltYWdlID0gSW1hZ2VQcm92aWRlci5nZXRJbnN0YW5jZSgpLmdldEltYWdlKFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9kcmFnRHJvcC94eVNlcmllcy5zdmdcIik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2UgaWYodGhpcy5fY3VycmVudERyYWdEcm9wU2VyaWVzWzBdLnR5cGUgPT0gU2VyaWVzVHlwZS5mZnRTZXJpZXMpe1xyXG5cdFx0XHRcdFx0Ly8gVXNlIGZmdCBzZXJpZXMgc3ZnXHJcblx0XHRcdFx0XHRzaWduYWxJbWFnZSA9IEltYWdlUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXRJbWFnZShcIi4uL2FwcC93aWRnZXRzL2NvbW1vbi9zdHlsZS9pbWFnZXMvZHJhZ0Ryb3AvZmZ0U2VyaWVzLnN2Z1wiKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYoc2lnbmFsSW1hZ2UgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0XHRcdC8vIFJlcGxhY2Ugc2VyaWUgY29sb3IgaW4gc3ZnIHdpdGggY29sb3Igb2YgY3VycmVudCBzZXJpZVxyXG5cdFx0XHRcdFx0c2lnbmFsSW1hZ2UgPSBzaWduYWxJbWFnZS5yZXBsYWNlKFwic3Ryb2tlOiM3NmJlYTZcIiwgXCJzdHJva2U6XCIgKyB0aGlzLl9jdXJyZW50RHJhZ0Ryb3BTZXJpZXNbMF0uY29sb3IpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRpZih0aGlzLl9jdXJyZW50RHJhZ0Ryb3BTZXJpZXNbMF0udHlwZSA9PSBTZXJpZXNUeXBlLnh5U2VyaWVzKXtcclxuXHRcdFx0XHRcdHNpZ25hbEltYWdlID0gSW1hZ2VQcm92aWRlci5nZXRJbnN0YW5jZSgpLmdldEltYWdlKFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9kcmFnRHJvcC9zZXZlcmFsWFlTZXJpZXMuc3ZnXCIpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIGlmKHRoaXMuX2N1cnJlbnREcmFnRHJvcFNlcmllc1swXS50eXBlID09IFNlcmllc1R5cGUuZmZ0U2VyaWVzKXtcclxuXHRcdFx0XHRcdHNpZ25hbEltYWdlID0gSW1hZ2VQcm92aWRlci5nZXRJbnN0YW5jZSgpLmdldEltYWdlKFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9kcmFnRHJvcC9zZXZlcmFsRkZUU2VyaWVzLnN2Z1wiKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRzaWduYWxJbWFnZSA9IEltYWdlUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXRJbWFnZShcIi4uL2FwcC93aWRnZXRzL2NvbW1vbi9zdHlsZS9pbWFnZXMvZHJhZ0Ryb3Avc2V2ZXJhbFlUU2VyaWVzLnN2Z1wiKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0bGV0IGRyYWdEcm9wSWNvblJlcHJlc2VudGF0aW9uID0gbmV3IERyYWdEcm9wUmVwcmVzZW50YXRpb24oKTtcclxuXHRcdFx0ZHJhZ0Ryb3BJY29uUmVwcmVzZW50YXRpb24uaWNvbkxpc3QucHVzaChzaWduYWxJbWFnZSk7XHJcblx0XHRcdGRyYWdEcm9wSWNvblJlcHJlc2VudGF0aW9uLnRleHRMaXN0LnB1c2goc2lnbmFsTmFtZSk7XHJcblx0XHRcdHJldHVybiBuZXcgRHJhZ0Ryb3BEYXRhT2JqZWN0KERyYWdEcm9wRGF0YUlkLnNpZ25hbCwgdGhpcy5fY3VycmVudERyYWdEcm9wU2VyaWVzLCBkcmFnRHJvcEljb25SZXByZXNlbnRhdGlvbik7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xyXG5cdH1cclxuXHRcclxuXHRkcmFnZ2luZ1N0b3BwZWQoKXtcclxuXHRcdC8vIFJlc2V0IGN1cnJlbnQgZHJhZyBkcm9wIHNpZ25hbFxyXG5cdFx0dGhpcy5fY3VycmVudERyYWdEcm9wU2VyaWVzID0gdW5kZWZpbmVkO1xyXG5cdFx0dGhpcy5fY3VycmVudENhbGN1bGF0b3JUeXBlID0gdW5kZWZpbmVkO1xyXG5cdFx0dGhpcy5faW5kZXhlc0RyYWdnZWQgPSBbXTtcclxuXHR9XHJcblx0Ly8jZW5kcmVnaW9uXHJcblxyXG5cdC8vI3JlZ2lvbiBkcm9wIHN1cHBvcnRcclxuXHRwcml2YXRlIGFkZERyb3BMb2NhdGlvbnMoc2VyaWVzOiBBcnJheTxCYXNlU2VyaWVzPil7XHJcbiAgICAgICAgaWYgKHNlcmllc1swXS5wYXJlbnQgIT0gdW5kZWZpbmVkICYmIHNlcmllcy5sZW5ndGggPT0gMSkge1xyXG5cdFx0XHRzZXJpZXNbMF0ucGFyZW50LnZpc2libGVDaGlsZHMhLmZvckVhY2goY2hpbGQgPT4ge1xyXG5cdFx0XHRcdGlmKGNoaWxkIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uKXtcclxuXHRcdFx0XHRcdGNoaWxkLnNldERyb3BMb2NhdGlvbnModHJ1ZSwgc2VyaWVzWzBdKTtcclxuXHRcdFx0XHR9XHRcdFx0XHRcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHJlbW92ZURyb3BMb2NhdGlvbnMoc2VyaWVzOiBBcnJheTxCYXNlU2VyaWVzPil7XHJcblx0XHRpZiAoc2VyaWVzWzBdLnBhcmVudCAhPSB1bmRlZmluZWQgJiYgc2VyaWVzLmxlbmd0aCA9PSAxKSB7XHJcblx0XHRcdHNlcmllc1swXS5wYXJlbnQudmlzaWJsZUNoaWxkcyEuZm9yRWFjaChjaGlsZCA9PiB7XHJcblx0XHRcdFx0aWYoY2hpbGQgaW5zdGFuY2VvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb24pe1xyXG5cdFx0XHRcdFx0Y2hpbGQuc2V0RHJvcExvY2F0aW9ucyhmYWxzZSwgc2VyaWVzWzBdKTtcclxuXHRcdFx0XHR9XHRcdFx0XHRcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRkcmFnU3RhcnQoYXJnczogRHJhZ0Ryb3BBcmdzKSB7XHJcblx0XHRsZXQgc2VyaWVzID0gYXJncy5kYXRhIGFzIEFycmF5PEJhc2VTZXJpZXM+O1xyXG5cdFx0XHJcblx0XHQvLyBBZGQgcG9zc2libGUgZHJvcExvY2F0aW9uc1xyXG5cdFx0dGhpcy5hZGREcm9wTG9jYXRpb25zKHNlcmllcyk7XHJcblx0XHRcclxuXHRcdC8vIFVwZGF0ZSB0cmVlR3JpZFxyXG5cdFx0dGhpcy5yZWZyZXNoKCk7XHJcblxyXG5cdFx0bGV0IHRyZWVHcmlkT2JqID0gdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpO1xyXG5cdFx0dGhpcy51cGRhdGVTZXJpZVNlbGVjdGlvbih0cmVlR3JpZE9iaiwgdGhpcy5faW5kZXhlc0RyYWdnZWQpO1xyXG5cdH1cclxuXHJcblx0ZHJhZ1N0b3AoYXJnczogRHJhZ0Ryb3BBcmdzKSB7XHJcblx0XHRsZXQgc2VyaWVzID0gYXJncy5kYXRhIGFzIEFycmF5PEJhc2VTZXJpZXM+O1xyXG5cdFx0XHJcblx0XHQvLyBSZW1vdmUgcG9zc2libGUgZHJvcExvY2F0aW9uc1xyXG5cdFx0dGhpcy5yZW1vdmVEcm9wTG9jYXRpb25zKHNlcmllcyk7XHJcblxyXG5cdFx0Ly8gVXBkYXRlIHRyZWVHcmlkXHJcblx0XHR0aGlzLnJlZnJlc2goKTtcclxuXHRcdFxyXG5cdFx0bGV0IHRyZWVHcmlkT2JqID0gdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpO1xyXG5cdFx0dGhpcy51cGRhdGVTZXJpZVNlbGVjdGlvbih0cmVlR3JpZE9iaiwgdGhpcy5faW5kZXhlc0RyYWdnZWQpO1xyXG5cdH1cclxuXHJcblx0ZHJhZ092ZXIoYXJnczogRHJhZ0Ryb3BBcmdzKTogYm9vbGVhbiB7XHJcblx0XHRsZXQgY2FsY3VsYXRpb25JbnB1dEl0ZW0gPSAgdGhpcy5nZXRDYWxjdWxhdGlvbklucHV0RnJvbURyb3BMb2NhdGlvbihhcmdzLmN1cnJlbnRUYXJnZXQpO1xyXG5cdFx0XHJcblx0XHRpZihjYWxjdWxhdGlvbklucHV0SXRlbSAhPSB1bmRlZmluZWQgJiYgY2FsY3VsYXRpb25JbnB1dEl0ZW0uZHJvcFBvc3NpYmxlID09IHRydWUpe1xyXG5cdFx0XHR0aGlzLmFkZEhpZ2hsaWdodGVkQXJlYShhcmdzLmN1cnJlbnRUYXJnZXQpO1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR0aGlzLnJlc2V0SGlnaGxpZ2h0QXJlYSgpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0ZHJvcChhcmdzOiBEcmFnRHJvcEFyZ3MpIHtcclxuXHRcdGxldCBzZXJpZXMgPSBhcmdzLmRhdGFbMF0gYXMgQmFzZVNlcmllcztcclxuXHRcdGxldCBjYWxjdWxhdGlvbklucHV0VGFyZ2V0ID0gIHRoaXMuZ2V0Q2FsY3VsYXRpb25JbnB1dEZyb21Ecm9wTG9jYXRpb24oYXJncy5jdXJyZW50VGFyZ2V0KTtcclxuXHRcdGxldCBjYWxjdWxhdGlvbklucHV0RHJhZ2dlZEl0ZW0gPSB0aGlzLmdldENhbGN1bGF0aW9uSW5wdXREcmFnZ2VkKHNlcmllcyk7XHJcblxyXG5cdFx0aWYoY2FsY3VsYXRpb25JbnB1dFRhcmdldCAhPSB1bmRlZmluZWQgJiYgY2FsY3VsYXRpb25JbnB1dFRhcmdldC5kcm9wUG9zc2libGUgPT0gdHJ1ZSl7XHJcblx0XHRcdGlmKHNlcmllcyAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHRcdC8vRXhjaGFuZ2Ugb2Ygc2VyaWUgaWYgdGhlIGRyYWdnZWQgc2VyaWUgaXMgaW5zaWRlIHRoZSBjYWxjdWxhdG9yXHJcblx0XHRcdFx0aWYgKHRoaXMuX2N1cnJlbnRDYWxjdWxhdG9yVHlwZSA9PSBjYWxjdWxhdGlvbklucHV0VGFyZ2V0LnBhcmVudCAmJiBjYWxjdWxhdGlvbklucHV0RHJhZ2dlZEl0ZW0gIT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHRsZXQgb2xkVmFsdWUgPSBjYWxjdWxhdGlvbklucHV0VGFyZ2V0LnZhbHVlO1xyXG5cdFx0XHRcdFx0Y2FsY3VsYXRpb25JbnB1dERyYWdnZWRJdGVtIS52YWx1ZSA9IG9sZFZhbHVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRjYWxjdWxhdGlvbklucHV0VGFyZ2V0LnZhbHVlID0gc2VyaWVzLm5hbWU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgYSA8ZGl2PiBpbnRvIHRoZSBjZWxsIHdoZW4gZHJvcHBhYmxlIGlzIHBvc3NpYmxlIGFuZCBzaWduYWwgaXMgYmVpbmcgZHJhZ2dlZCBvdmVyXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7Kn0gY3VycmVudFRhcmdldFxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBhZGRIaWdobGlnaHRlZEFyZWEoY3VycmVudFRhcmdldCkge1xyXG5cdFx0bGV0IGhpZ2hsaWdodEVsZW0gPSAkKCc8ZGl2IGlkPVwiJysgdGhpcy5faGlnaGxpZ2h0QXJlYUlkICsnXCIgc3R5bGU9XCIgcG9pbnRlci1ldmVudHM6bm9uZTsgcG9zaXRpb246YWJzb2x1dGU7IFwiIGNsYXNzPVwiZHJhZ2dlZE92ZXJcIj48L2Rpdj4nKTtcclxuXHRcdHRoaXMucmVzZXRIaWdobGlnaHRBcmVhKGhpZ2hsaWdodEVsZW0pO1xyXG5cdFx0JChjdXJyZW50VGFyZ2V0KS5hcHBlbmQoaGlnaGxpZ2h0RWxlbSk7XHJcblxyXG5cdFx0aGlnaGxpZ2h0RWxlbS5vZmZzZXQoe3RvcDogJChjdXJyZW50VGFyZ2V0KS5vZmZzZXQoKSEudG9wLCBsZWZ0OiAkKGN1cnJlbnRUYXJnZXQpLm9mZnNldCgpIS5sZWZ0fSlcclxuXHRcdGhpZ2hsaWdodEVsZW0uY3NzKCdoZWlnaHQnLCBjdXJyZW50VGFyZ2V0Lm9mZnNldEhlaWdodCk7XHJcblx0XHRoaWdobGlnaHRFbGVtLmNzcygnd2lkdGgnLCBjdXJyZW50VGFyZ2V0Lm9mZnNldFdpZHRoKTtcclxuXHR9XHJcblxyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmUgYWxsIHNpZ25hbE1hbmFnZXIgaGlnaGxpZ2h0ZWQgYXJlYXMgKGV4Y2VwdCB0aGUgc2VsZWN0ZWQgb25lKVxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0ge0pRdWVyeTxIVE1MRWxlbWVudD59IFtlbGVtZW50XVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSByZXNldEhpZ2hsaWdodEFyZWEgKGVsZW1lbnQ/OiBKUXVlcnk8SFRNTEVsZW1lbnQ+KSB7XHJcblx0XHRsZXQgaGlnaGxpZ2h0RWxlbSA9ICQoJyMnICsgdGhpcy5faGlnaGxpZ2h0QXJlYUlkKTtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaGlnaGxpZ2h0RWxlbS5sZW5ndGg7IGkrKyl7XHJcblx0XHRcdGlmIChlbGVtZW50ID09IHVuZGVmaW5lZCB8fCBoaWdobGlnaHRFbGVtW2ldICE9IGVsZW1lbnRbMF0pIHtcclxuXHRcdFx0XHRoaWdobGlnaHRFbGVtW2ldLnJlbW92ZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGdldENhbGN1bGF0aW9uSW5wdXRGcm9tRHJvcExvY2F0aW9uKGN1cnJlbnRUYXJnZXQpOiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGF8dW5kZWZpbmVke1xyXG5cdFx0bGV0IHJlY29yZCA9IHRoaXMuZ2V0VHJlZVJlY29yZChjdXJyZW50VGFyZ2V0KTtcclxuICAgICAgICBpZihyZWNvcmQgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0aWYocmVjb3JkLml0ZW0gaW5zdGFuY2VvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGEgJiYgY3VycmVudFRhcmdldC5jbGFzc0xpc3QudmFsdWUuaW5jbHVkZXMoJ2Ryb3BMb2NhdGlvbkFyZWEnKSl7XHJcblx0XHRcdFx0cmV0dXJuIHJlY29yZC5pdGVtO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgZ2V0Q2FsY3VsYXRpb25JbnB1dERyYWdnZWQoc2VyaWU6IEJhc2VTZXJpZXMpOiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGEgfCB1bmRlZmluZWR7XHJcblx0XHRpZiAodGhpcy5fY3VycmVudENhbGN1bGF0b3JUeXBlICE9IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2N1cnJlbnRDYWxjdWxhdG9yVHlwZSEuZ2V0Q2hpbGRzKCkubGVuZ3RoOyBpKyspe1xyXG5cdFx0XHRcdGlmICh0aGlzLl9jdXJyZW50Q2FsY3VsYXRvclR5cGUhLmdldENoaWxkcygpW2ldLnNlcmllID09IHNlcmllKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fY3VycmVudENhbGN1bGF0b3JUeXBlIS5nZXRDaGlsZHMoKVtpXSBhcyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGE7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xyXG5cdH1cclxuXHJcblx0Ly8jZW5kcmVnaW9uXHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIGxheW91dCBvZiB0aGUgd2lkZ2V0XHJcblx0ICpcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdGNyZWF0ZUxheW91dCgpIHtcclxuXHRcdHZhciAkd2lkZ2V0Q29udGFpbmVyID0gJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCk7XHJcblx0XHQkd2lkZ2V0Q29udGFpbmVyWzBdLnN0eWxlLm92ZXJmbG93ID1cImhpZGRlblwiO1xyXG5cdFx0c3VwZXIuY3JlYXRlTGF5b3V0KCk7XHJcblx0fVxyXG5cclxuXHRpbml0aWFsaXplZCgpe1xyXG5cdFx0dGhpcy5pbml0U2lnbmFsTWFuYWdlckRhdGFNb2RlbCgpO1xyXG5cdFx0dGhpcy5pbml0U2VyaWVzUHJvdmlkZXIoKTtcclxuXHRcdHRoaXMuaW5pdENoYXJ0TWFuYWdlckRhdGFNb2RlbCgpO1xyXG4gICAgICAgIC8vIFNldCB0aGUgd2lkZ2V0IHNldHRpbmdzIGFnYWluID0+IGRhdGFtb2RlbCBtdXN0IGJlIHVwZGF0ZWQgd2l0aCBlZGl0TW9kZUFjdGl2ZSBpbmZvXHJcblx0XHR0aGlzLnNldFdpZGdldFNldHRpbmdzKHRoaXMuY29tcG9uZW50LmdldFNldHRpbmcoV2lkZ2V0QmFzZS5XaWRnZXRTZXR0aW5nSWQpKTtcclxuXHRcdHRoaXMucmVmcmVzaCgpO1xyXG5cdH1cclxuXHJcblx0aW5pdFNpZ25hbE1hbmFnZXJEYXRhTW9kZWwoKSB7XHJcblx0XHRsZXQgZGF0YU1vZGVsID0gdGhpcy5jb21wb25lbnQuZ2V0U3ViQ29tcG9uZW50KFwiU2lnbmFsTWFuYWdlckRhdGFNb2RlbFwiKSBhcyBJU2lnbmFsTWFuYWdlckRhdGFNb2RlbDtcclxuXHRcdGRhdGFNb2RlbC5pbml0aWFsaXplKCk7ICAgXHJcblx0XHR0aGlzLmRhdGFNb2RlbCA9IGRhdGFNb2RlbCBhcyBJU2lnbmFsTWFuYWdlckRhdGFNb2RlbDtcclxuXHR9XHJcblxyXG5cdGluaXRTZXJpZXNQcm92aWRlcigpIHtcclxuXHRcdHRoaXMuX3Nlcmllc1Byb3ZpZGVyID0gdGhpcy5jb21wb25lbnQuZ2V0U3ViQ29tcG9uZW50KFwiU2VyaWVzUHJvdmlkZXJcIikgYXMgSVNlcmllc1Byb3ZpZGVyO1xyXG5cdH1cclxuXHJcblx0aW5pdENoYXJ0TWFuYWdlckRhdGFNb2RlbCgpIHtcclxuXHRcdHRoaXMuX2NoYXJ0TWFuYWdlckRhdGFNb2RlbCA9IHRoaXMuY29tcG9uZW50LmdldFN1YkNvbXBvbmVudChcIkNoYXJ0TWFuYWdlckRhdGFNb2RlbFwiKSBhcyBJQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsO1xyXG5cdH1cclxuXHRcclxuXHJcblx0LyoqXHJcblx0ICogSGFuZGxlcyB0aGUgbW9kZWwgY2hhbmdlc1xyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtJRGF0YU1vZGVsfSBzZW5kZXJcclxuXHQgKiBAcGFyYW0ge0V2ZW50TW9kZWxDaGFuZ2VkQXJnc30gZXZlbnRBcmdzXHJcblx0ICogQHJldHVybnMgeyp9XHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRoYW5kbGVNb2RlbENoYW5nZWQoc2VuZGVyOiBJRGF0YU1vZGVsLCBldmVudEFyZ3M6IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyk6IGFueSB7XHJcblx0XHR0aGlzLnJlZnJlc2goKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlc2l6ZXMgdGhlIHNpZ25hbCBtYW5hZ2VyIHdpZGdldFxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoXHJcblx0ICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodFxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cmVzaXplKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKXtcclxuXHRcdHN1cGVyLnJlc2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuXHJcblx0XHR0aGlzLl90b29sYmFyLnJlc2l6ZSh3aWR0aCk7XHJcblx0fVxyXG5cclxuXHQgICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBzZWxlY3Rpb24gdG8gdGhlIGdpdmVuIHNlcmllc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHRyZWVHcmlkT2JqZWN0XHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IGluZGV4ZXNcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JJbmZvV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlU2VyaWVTZWxlY3Rpb24odHJlZUdyaWRPYmplY3QsIGluZGV4ZXM6IEFycmF5PG51bWJlcj4pIHtcclxuICAgICAgICAvLyBkZXNlbGVjdCBhbGwgc2VsZWN0aW9ucyBpbiBzaWduYWwgcGFuZVxyXG4gICAgICAgIHRyZWVHcmlkT2JqZWN0LmNsZWFyU2VsZWN0aW9uKCk7XHJcblxyXG4gICAgICAgIGlmKGluZGV4ZXNbMF0gPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgaW5kZXhlcy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgdHJlZUdyaWRPYmplY3QuX211bHRpU2VsZWN0Q3RybFJlcXVlc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICBsZXQgdmlzaWJsZUluZGV4ID0gMDtcclxuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8ICg8YW55PnRyZWVHcmlkT2JqZWN0Lm1vZGVsKS5mbGF0UmVjb3Jkcy5sZW5ndGg7IGorKyl7XHJcbiAgICAgICAgICAgICAgICBpZihqID09IGluZGV4ZXNbaV0pe1xyXG4gICAgICAgICAgICAgICAgICAgIHRyZWVHcmlkT2JqZWN0LnNlbGVjdFJvd3ModmlzaWJsZUluZGV4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKCg8YW55PnRyZWVHcmlkT2JqZWN0Lm1vZGVsKS5mbGF0UmVjb3Jkc1tqXS52aXNpYmxlICE9IFwiZmFsc2VcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZUluZGV4Kys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcblx0cHVibGljIHN1cHByZXNzUmVmcmVzaChzdXBwcmVzczogYm9vbGVhbil7XHJcblx0XHR0aGlzLl9zdXBwcmVzc1JlZnJlc2ggPSBzdXBwcmVzcztcclxuXHR9XHJcblx0LyoqXHJcblx0ICogUmVmcmVzaGVzIHRoZSB0cmVlIGdyaWQgXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHVibGljIGFzeW5jIHJlZnJlc2goKXtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGlmKHRoaXMuX3N1cHByZXNzUmVmcmVzaCA9PSBmYWxzZSl7XHJcblx0XHRcdFx0dmFyIHRyZWVncmlkT2JqID0gdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpO1xyXG5cdFx0XHRcdGlmICgoPGFueT50cmVlZ3JpZE9iai5tb2RlbCkuaXNFZGl0ID09IGZhbHNlKXtcclxuXHRcdFx0XHRcdC8vVG8gcmVmcmVzaCBUcmVlR3JpZCB3aXRoIG5ldyBkYXRhc291cmNlXHJcblx0XHRcdFx0XHR0aGlzLnNldE1vZGVsKHRoaXMuZGF0YU1vZGVsLmRhdGEpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNle1xyXG5cdFx0XHRcdFx0Ly8gdHJlZWdyaWQgaXMgaW4gZWRpdCBtb2RlID0+IHJlZnJlc2ggd291bGQgbm90IHdvcmsgPT4gd2FpdCBmb3IgZWRpdGluZyBpcyBmaW5pc2hlZFxyXG5cdFx0XHRcdFx0Zm9yKGxldCBpID0wOyBpIDwgMTAwOyBpKyspe1xyXG5cdFx0XHRcdFx0XHRhd2FpdCB0aGlzLnNsZWVwKDIwMCk7XHJcblx0XHRcdFx0XHRcdC8vIGlzIGVkaXRpbmcgYWxyZWFkeSBmaW5pc2hlZFxyXG5cdFx0XHRcdFx0XHRpZiAoKDxhbnk+dHJlZWdyaWRPYmoubW9kZWwpLmlzRWRpdCA9PSBmYWxzZSl7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5zZXRNb2RlbCh0aGlzLmRhdGFNb2RlbC5kYXRhKTtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHRcdFx0XHRcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0Y2F0Y2goZSl7XHJcblx0XHRcdFx0XHJcblx0XHRcdGNvbnNvbGUuaW5mbyhcIlNpZ25hbE1hbmFnZXIgcmVmcmVzaCBlcnJvciEgPT4gVHJlZUdyaWQgcmVjcmVhdGlvbiFcIik7XHJcblx0XHRcdGNvbnNvbGUuaW5mbyhlKTtcclxuXHRcdFx0XHJcblx0XHRcdHRoaXMuY3JlYXRlVHJlZUdyaWQoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHByaXZhdGUgc2xlZXAobXM6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpO1xyXG4gICAgfVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIGNvbHVtbiB0ZW1wbGF0ZXMgZm9yIHRoZSB0cmVlIGdyaWQgYW5kIGFkZHMgdGhlbSB0byB0aGUgd2lkZ2V0IGNvbnRhaW5lclxyXG5cdCAqXHJcblx0ICogQHByb3RlY3RlZFxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJvdGVjdGVkIGNyZWF0ZUNvbHVtblRlbXBsYXRlcygpe1xyXG5cdFx0dmFyICR3aWRnZXRDb250YWluZXIgPSAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKTtcclxuXHRcdCR3aWRnZXRDb250YWluZXIuYXBwZW5kKHRoaXMuZ2V0Q29sdW1uVGVtcGxhdGVEYXRhKFNpZ25hbE1hbmFnZXJXaWRnZXQubmFtZUNvbHVtbklkKSk7XHJcblx0XHQkd2lkZ2V0Q29udGFpbmVyLmFwcGVuZCh0aGlzLmdldENvbHVtblRlbXBsYXRlRGF0YShTaWduYWxNYW5hZ2VyV2lkZ2V0LmNvbG9yQ29sdW1uSWQpKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIHRyZWUgZ3JpZCBmb3IgdGhlIHNpZ25hbCBtYW5hZ2VyXHJcblx0ICpcclxuXHQgKiBAcHJvdGVjdGVkXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcm90ZWN0ZWQgY3JlYXRlVHJlZUdyaWQoKXtcclxuXHRcdCg8YW55PiQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpKS5lalRyZWVHcmlkKHtcclxuXHRcdFx0Li4udGhpcy5nZXRUcmVlR3JpZENvbHVtbkRlZmluaXRpb24oKSxcclxuXHRcdFx0Li4udGhpcy5nZXRUcmVlR3JpZENvbHVtblJlc2l6ZVN1cHBvcnQoKSxcclxuXHRcdFx0Li4udGhpcy5nZXRUcmVlR3JpZFRvb2xiYXJTdXBwb3J0KCksXHRcclxuXHRcdFx0Li4udGhpcy5nZXRUcmVlR3JpZENlbGxFZGl0U3VwcG9ydCgpLFxyXG5cdFx0XHQuLi50aGlzLmdldFRyZWVHcmlkRHJhZ0Ryb3BTdXBwb3J0KCksXHJcblx0XHRcclxuXHRcdFx0ZGF0YVNvdXJjZTp0aGlzLmRhdGFNb2RlbC5kYXRhLFxyXG5cdFx0XHRjaGlsZE1hcHBpbmc6XCJ2aXNpYmxlQ2hpbGRzXCIsXHJcblx0XHRcdGV4cGFuZFN0YXRlTWFwcGluZzogXCJleHBhbmRTdGF0ZVwiLFxyXG5cdFx0XHRhbGxvd1Jlb3JkZXJpbmc6IGZhbHNlLFxyXG5cdFx0XHRyb3dIZWlnaHQ6IDI4LFxyXG5cdFx0XHRzZWxlY3Rpb25TZXR0aW5nczp7XHJcblx0XHRcdFx0c2VsZWN0aW9uVHlwZSA6ICdtdWx0aXBsZScgXHJcblx0XHRcdH0sXHJcblx0XHRcdHNlbGVjdGlvblR5cGU6ICdtdWx0aXBsZScsXHJcblx0XHRcdGV4cGFuZGVkOiAoYXJncykgPT4gdGhpcy50cmVlR3JpZE5vZGVFeHBhbmRlZE9yQ29sbGFwc2VkKCksXHJcblx0XHRcdGNvbGxhcHNlZDogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWROb2RlRXhwYW5kZWRPckNvbGxhcHNlZCgpLFxyXG5cclxuXHRcdFx0cmVjb3JkQ2xpY2s6IChhcmdzKSA9PiB0aGlzLmNsaWNrKGFyZ3MpLFxyXG5cdFx0XHRyZWNvcmREb3VibGVDbGljazogKGFyZ3MpID0+IHRoaXMuZG91YmxlQ2xpY2soYXJncyksXHJcblx0XHRcdHJvd1NlbGVjdGVkOiAoYXJncykgPT4gdGhpcy5yb3dTZWxlY3RlZChhcmdzLmRhdGEuaXRlbSwgYXJncy5tb2RlbC5jdXJyZW50Vmlld0RhdGEpLFxyXG5cdFx0XHRjcmVhdGU6IChhcmdzKSA9PiB0aGlzLnRyZWVHcmlkQ3JlYXRlZCgpLFxyXG5cdFx0XHRhY3Rpb25CZWdpbjogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWRBY3Rpb25CZWdpbihhcmdzKSxcclxuXHRcdFx0YWN0aW9uQ29tcGxldGU6IChhcmdzKSA9PiB0aGlzLnRyZWVHcmlkQWN0aW9uQ29tcGxldGUoYXJncyksXHJcblx0XHRcdHF1ZXJ5Q2VsbEluZm86IChhcmdzKSA9PiB0aGlzLnRyZWVHcmlkUXVlcnlDZWxsSW5mbyhhcmdzKSxcclxuXHRcdH0pXHJcblx0XHR0aGlzLnNldEVkaXRNb2RlKHRoaXMuZWRpdE1vZGVBY3RpdmUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgdHJlZSBncmlkIGNvbHVtbiBkZWZpbml0aW9uXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEByZXR1cm5zIHt7fX1cclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCk6IHt9e1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0Y29sdW1uczogW1xyXG5cdFx0XHRcdHsgZmllbGQ6IFNpZ25hbE1hbmFnZXJXaWRnZXQubmFtZUNvbHVtbklkLCBoZWFkZXJUZXh0OiBcIk5hbWVcIiwgd2lkdGg6IFwiMzUxcHhcIiAsIGlzVGVtcGxhdGVDb2x1bW46IHRydWUsIHRlbXBsYXRlSUQ6IFwic21OYW1lQ29sdW1uVGVtcGxhdGVcIn0sXHJcblx0XHRcdFx0eyBmaWVsZDogU2lnbmFsTWFuYWdlcldpZGdldC52YWx1ZUNvbHVtbklkLCBoZWFkZXJUZXh0OiBcIlZhbHVlXCIsIHZpc2libGU6IHRoaXMuZWRpdE1vZGVBY3RpdmUsIHdpZHRoOiBcIjMwMHB4XCIsIGVkaXRUZW1wbGF0ZTogU21UcmVlR3JpZENlbGxFZGl0VGVtcGxhdGUuY3JlYXRlSW5zdGFuY2UoKSwgaXNUZW1wbGF0ZUNvbHVtbjogdHJ1ZX0sXHJcblx0XHRcdFx0eyBmaWVsZDogU2lnbmFsTWFuYWdlcldpZGdldC5kZXNjcmlwdGlvbkNvbHVtbklkLCBoZWFkZXJUZXh0OiBcIkRlc2NyaXB0aW9uXCIsIHZpc2libGU6IHRoaXMuZWRpdE1vZGVBY3RpdmUsIHdpZHRoOiBcIjEwMHB4XCIgfSxcclxuXHRcdFx0XHR7IGZpZWxkOiBTaWduYWxNYW5hZ2VyV2lkZ2V0LmNvbG9yQ29sdW1uSWQsIGhlYWRlclRleHQ6IFwiQ29sb3JcIiwgd2lkdGg6IFwiNTBweFwiLCB2aXNpYmxlOiB0aGlzLmVkaXRNb2RlQWN0aXZlLCBlZGl0VHlwZTogXCJEYXRlUGlja2VyXCIsIGVkaXRUZW1wbGF0ZTogU21UcmVlR3JpZENlbGxFZGl0VGVtcGxhdGUuY3JlYXRlSW5zdGFuY2UoKSwgaXNUZW1wbGF0ZUNvbHVtbjogdHJ1ZSwgdGVtcGxhdGVJRDogXCJzbUNvbG9yQ29sdW1uVGVtcGxhdGVcIn0sXHJcblx0XHRcdFx0eyBmaWVsZDogU2lnbmFsTWFuYWdlcldpZGdldC5pY29uRGVmaW5pdGlvbkNvbHVtbklkLCB2aXNpYmxlOiBmYWxzZSwgd2lkdGg6IFwiMHB4XCIgfSxcclxuXHRcdFx0XSxcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgY29sdW1uIHJlc2l6ZSBzZXR0aW5nc1xyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcmV0dXJucyB7e319XHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIGdldFRyZWVHcmlkQ29sdW1uUmVzaXplU3VwcG9ydCgpOiB7fXtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGFsbG93Q29sdW1uUmVzaXplOiB0cnVlLFxyXG5cdFx0XHRjb2x1bW5SZXNpemVTZXR0aW5nczogeyBjb2x1bW5SZXNpemVNb2RlOiBlai5UcmVlR3JpZC5Db2x1bW5SZXNpemVNb2RlLkZpeGVkQ29sdW1uc1x0fSxcclxuXHRcdFx0Y29sdW1uUmVzaXplZDogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWRDb2x1bW5SZXNpemVkKGFyZ3MpLFxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG4gICAgICogQSB0cmVlZ3JpZCBjb2x1bW4gd2FzIHJlc2l6ZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHRyZWVHcmlkQ29sdW1uUmVzaXplZChhcmdzKXtcclxuXHRcdHN1cGVyLnJlc2l6ZUR5bmFtaWNDb2x1bW4oYXJncy5jb2x1bW5JbmRleCwgYXJncy5tb2RlbCk7XHJcbiAgICB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCB0b29sYmFyIHNldHRpbmdzXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEByZXR1cm5zIHt7fX1cclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZ2V0VHJlZUdyaWRUb29sYmFyU3VwcG9ydCgpOiB7fXtcclxuXHRcdHRoaXMuX3Rvb2xiYXIgPSBuZXcgU2lnbmFsTWFuYWdlclRyZWVHcmlkVG9vbGJhcih0aGlzLmNzc1BhcmVudENvbnRlbnRJZCk7XHRcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdFx0dG9vbGJhclNldHRpbmdzOiB7XHJcblx0XHRcdFx0XHRzaG93VG9vbGJhcjogdHJ1ZSxcclxuXHRcdFx0XHRcdGN1c3RvbVRvb2xiYXJJdGVtczogdGhpcy5fdG9vbGJhci5nZXRDdXN0b21Ub29sYmFycygpXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR0b29sYmFyQ2xpY2s6IChhcmdzKSA9PiB0aGlzLl90b29sYmFyLnRvb2xiYXJDbGljayhhcmdzLCB0aGlzKSxcclxuXHRcdFx0fTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCBjZWxsIGVkaXQgc2V0dGluZ3NcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHJldHVybnMge3t9fVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBnZXRUcmVlR3JpZENlbGxFZGl0U3VwcG9ydCgpOiB7fXtcclxuXHRcdHZhciBjZWxsRWRpdEV2ZW50cyA9IG5ldyBTbVRyZWVHcmlkQ2VsbEVkaXRFdmVudHMoKTtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGVkaXRTZXR0aW5nczoge1x0YWxsb3dFZGl0aW5nOiB0cnVlIH0sXHJcblx0XHRcdGJlZ2luRWRpdDogKGFyZ3MpID0+IGNlbGxFZGl0RXZlbnRzLmJlZ2luRWRpdChhcmdzLCB0aGlzKSxcclxuXHRcdFx0ZW5kRWRpdDogKGFyZ3MpID0+IGNlbGxFZGl0RXZlbnRzLmVuZEVkaXQoYXJncywgdGhpcyksXHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWN0aXZhdGVzIHRoZSBzaWduYWwgbWFuYWdlciBkcmFnIGFuZCBkcm9wIHN1cHBvcnRcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHJldHVybnMge3t9fVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBnZXRUcmVlR3JpZERyYWdEcm9wU3VwcG9ydCgpOiB7fXtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGFsbG93RHJhZ0FuZERyb3AgOiB0cnVlLFxyXG5cdFx0XHRyb3dEcmFnU3RhcnQ6IChhcmdzKSA9PiB0aGlzLnJvd0RyYWdTdGFydChhcmdzKSxcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBXaWxsIGJlIGNhbGxlZCBhZnRlciB0aGUgdHJlZSBncmlkIHdhcyBjcmVhdGVkOyB0b29sYmFyIHN0eWxlcyBhbmQgc3RhdGVzIHdpbGwgYmUgc2V0XHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSB0cmVlR3JpZENyZWF0ZWQoKXtcclxuXHRcdC8vIFNldHMgdGhlIGN1c3RvbSB0b29sYmFyIGljb25zXHJcblx0XHR0aGlzLl90b29sYmFyLnNldFN0eWxlRm9yVG9vbGJhckljb25zKCk7XHJcblxyXG5cdFx0Ly8gQXQgdGhlIGJlZ2lubmluZyB0aGUgZXhwb3J0L2RlbGV0ZS9pbnNlcnQgY2FsY3VsYXRpb24gYnV0dG9uIGlzIGRpc2FibGVkIGJlY2F1c2Ugbm8gc2VsZWN0aW9uIGlzIGF2YWlsYWJsZVxyXG5cdFx0dGhpcy5fdG9vbGJhci5kaXNhYmxlRXhwb3J0QnV0dG9uKHRydWUpO1xyXG5cdFx0dGhpcy5fdG9vbGJhci5kaXNhYmxlRGVsZXRlQnV0dG9uKHRydWUpO1xyXG5cdFx0dGhpcy5fdG9vbGJhci5kaXNhYmxlSW5zZXJ0Q2FsY3VsYXRpb25CdXR0b24odHJ1ZSk7XHJcblx0XHR0aGlzLnNldEVkaXRNb2RlKGZhbHNlKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFN3aXRjaCBpbnRvIFwiZWRpdCBtb2RlXCIgb3IgXCJub3JtYWwgbW9kZVwiXHJcblx0ICogaWYgZWRpdCBtb2RlIGlzIGFjdGl2ZSwgdGhlIGVkaXQgbW9kZSB3aWxsIGJlIHNldCB0byB0aGUgZGF0YW1vZGVsLCBhbmQgdGhlIHdpZGdldCBzaXplIHdpbGwgYmUgaW5jcmVhc2VkXHJcblx0ICogaWYgbm9ybWFsIG1vZGUgaXMgYWN0aXZlLCB0aGUgbm9ybWFsIG1vZGUgd2lsbCBiZSBzZXQgdG8gdGhlIGRhdGFtb2RlbCwgYW5kIHRoZSB3aWRnZXQgc2l6ZSB3aWxsIGJlIGRlY3JlYXNlZFxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IGFjdGl2ZVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBzZXRFZGl0TW9kZShhY3RpdmU6Ym9vbGVhbil7XHJcblx0XHRpZih0aGlzLmVkaXRNb2RlQWN0aXZlICE9IGFjdGl2ZSl7XHJcblx0XHRcdGlmKGFjdGl2ZSA9PSB0cnVlKXtcclxuXHRcdFx0XHR0aGlzLm9uQ2hhbmdlU2l6ZSh0aGlzLl9hY3R1YWxXaWR0aCs0NTApO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2V7XHJcblx0XHRcdFx0bGV0IG5ld1NpemUgPSB0aGlzLl9hY3R1YWxXaWR0aCAtIDQ1MDtcclxuXHRcdFx0XHRpZihuZXdTaXplIDwgMjUwKXtcclxuXHRcdFx0XHRcdG5ld1NpemUgPSAyNTA7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHRoaXMub25DaGFuZ2VTaXplKG5ld1NpemUpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHR0aGlzLmVkaXRNb2RlQWN0aXZlID0gYWN0aXZlO1xyXG5cdFx0KHRoaXMuZGF0YU1vZGVsIGFzIElTaWduYWxNYW5hZ2VyRGF0YU1vZGVsKS5lZGl0TW9kZUFjdGl2ZSA9IHRoaXMuZWRpdE1vZGVBY3RpdmU7XHJcblx0XHRpZih0aGlzLl90b29sYmFyICE9IHVuZGVmaW5lZCl7XHJcblx0XHRcdHRoaXMuX3Rvb2xiYXIuYWN0aXZhdGVFZGl0TW9kZUJ1dHRvbih0aGlzLmVkaXRNb2RlQWN0aXZlKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFdlbGwgYmUgY2FsbGVkIGFmdGVyIHNvbWUgdHJlZSBncmlkIGFjdGlvbiB3YXMgc3RhcnRlZFxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0geyp9IGFyZ3NcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgdHJlZUdyaWRBY3Rpb25CZWdpbihhcmdzKXtcclxuXHRcdC8vIFN1cHBvcnQgXCJFbnRmL0RlbFwiIGtleVxyXG5cdFx0aWYoYXJncy5yZXF1ZXN0VHlwZSA9PSBcImRlbGV0ZVwiKXtcclxuXHRcdFx0YXJncy5jYW5jZWwgPSB0cnVlO1xyXG5cdFx0XHRpZiAodGhpcy5jb250YWluc0l0ZW1XaXRoaW5SZWNlbnRPclVwbG9hZGVkKGFyZ3MuZGVsZXRlZEl0ZW1zKSkge1xyXG5cdFx0XHRcdHRoaXMuc2hvd01lc3NhZ2VCb3hGb3JEZWxldGluZ0l0ZW0oYXJncy5kZWxldGVkSXRlbXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWxldGVJdGVtcyhhcmdzLmRlbGV0ZWRJdGVtcyk7XHJcbiAgICAgICAgICAgIH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdCAgICAvKipcclxuICAgICAqIExvYWRzIHRoZSBzdHlsZXMgZm9yIHRoZSBjaGFydCBtYW5hZ2VyIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgbG9hZFN0eWxlcygpIHtcclxuICAgICAgICBzdXBlci5sb2FkU3R5bGVzKCk7XHJcbiAgICAgICAgc3VwZXIuYWRkU3R5bGUoXCJ3aWRnZXRzL2NvbW1vbi9zdHlsZS9jc3MvZHJvcERvd25NZW51U3R5bGUuY3NzXCIpO1xyXG4gICAgfVxyXG5cclxuXHQvKipcclxuXHQgKiBXZWxsIGJlIGNhbGxlZCBhZnRlciBzb21lIHRyZWUgZ3JpZCBhY3Rpb24gd2FzIGNvbXBsZXRlZFxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0geyp9IGFyZ3NcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgdHJlZUdyaWRBY3Rpb25Db21wbGV0ZShhcmdzKXsgXHJcblx0XHQvLyBFdmVudCB0cmlnZ2VyIHdoaWxlIGNoYW5naW5nIGRhdGFzb3VyY2UgZHluYW1pY2FsbHkuIFxyXG5cdFx0Ly8gY29kZSB0byBkb25lIGFmdGVyIHRoZSBkeW5hbWljIGNoYW5nZSBvZiBkYXRhc291cmNlLiBcclxuXHRcdGlmIChhcmdzLnJlcXVlc3RUeXBlID09PSAncmVmcmVzaERhdGFTb3VyY2UnKSB7IFxyXG5cdFx0XHR0aGlzLnJlZnJlc2hTZWxlY3Rpb24oKTtcclxuXHRcdFx0aWYodGhpcy5fc2VyaWVDb250YWluZXJUb1NlbGVjdEFmdGVyUmVmcmVzaCAhPSB1bmRlZmluZWQpe1x0XHRcdFx0XHJcblx0XHRcdFx0Ly8gU2VsZWN0cyB0aGUgaW1wb3J0ZWQgc2lnbmFsZmlsZSwgb3IgdGhlIGluc2VydGVkIGNhbGN1bGF0aW9uLCAuLi5cclxuXHRcdFx0XHR0aGlzLnNlbGVjdEl0ZW0odGhpcy5fc2VyaWVDb250YWluZXJUb1NlbGVjdEFmdGVyUmVmcmVzaCk7XHJcblx0XHRcdFx0dGhpcy5fc2VyaWVDb250YWluZXJUb1NlbGVjdEFmdGVyUmVmcmVzaCA9IHVuZGVmaW5lZDtcclxuXHRcdFx0fVxyXG5cdFx0fSBcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFdpbGwgYmUgY2FsbGVkIHRvIHVwZGF0ZSB0aGUgc3R5bGUgb2YgdGhlIGdpdmUgY2VsbCBpZiBhIHJlZnJlc2ggd2lsbCBiZSBuZWVkZWRcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHsqfSBhcmdzXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIHRyZWVHcmlkUXVlcnlDZWxsSW5mbyhhcmdzKXtcclxuXHRcdGlmIChhcmdzLmNvbHVtbi5maWVsZCA9PSBcIm5hbWVcIil7XHJcblx0XHRcdGlmKHRoaXMuaXNHcm91cEl0ZW0oYXJncy5kYXRhLml0ZW0pKSB7XHJcblx0XHRcdFx0Ly8gU2hvdyBncm91cCBub2RlcyBhbHdheXMgYm9sZCA9PiBhbHNvIGlmIHRoZXkgaGF2ZSBubyBjaGlsZHNcclxuXHRcdFx0XHRpZihhcmdzLmNlbGxFbGVtZW50LnN0eWxlICE9IHVuZGVmaW5lZCl7XHJcblx0XHRcdFx0XHRpZihhcmdzLmRhdGEubGV2ZWwgPT0gMCl7XHJcblx0XHRcdFx0XHRcdGFyZ3MuY2VsbEVsZW1lbnQuc3R5bGUuZm9udFdlaWdodCA9IFwiODAwXCI7IC8vIDcwMCB3b3VsZCBiZSBib2xkXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRlbHNle1xyXG5cdFx0XHRcdFx0XHRhcmdzLmNlbGxFbGVtZW50LnN0eWxlLmZvbnRXZWlnaHQgPSBcIjY1MFwiO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHQvLyBTaG93IGFsbCBub2RlcyByZWQgd2hpY2ggaGF2ZSBpbnZhbGlkIHNpZ25hbHMgaW4gaXQgXHJcblx0XHRcdGlmKHRoaXMuaXNJdGVtSW52YWxpZChhcmdzLmRhdGEuaXRlbSkgPT0gdHJ1ZSl7XHJcblx0XHRcdFx0aWYoYXJncy5jZWxsRWxlbWVudC5zdHlsZSAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHRcdFx0YXJncy5jZWxsRWxlbWVudC5zdHlsZS5jb2xvciA9IFwicmVkXCI7XHJcblx0XHRcdFx0XHRhcmdzLmNlbGxFbGVtZW50LnN0eWxlLmZvbnRXZWlnaHQgPSBcImJvbGRcIjtcclxuXHRcdFx0XHRcdC8vYXJncy5jZWxsRWxlbWVudC5pbm5lclRleHQgPSBhcmdzLmNlbGxFbGVtZW50LmlubmVyVGV4dCArIFwiKGludmFsaWQpXCI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9IFxyXG5cdFx0ZWxzZSBpZiAoYXJncy5jb2x1bW4uZmllbGQgPT0gXCJ2YWx1ZVwiKXtcclxuXHRcdFx0aWYoYXJncy5kYXRhLmRyb3BQb3NzaWJsZSA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgIGFyZ3MuY2VsbEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImRyb3BMb2NhdGlvbkFyZWFcIik7XHJcblx0XHRcdH1cclxuXHRcdH0gICAgICBcclxuXHR9XHJcbi8qXHJcblx0Ly8gSXMgYSBpbnZhbGlkIHNpZ25hbCB3aXRoaW4gdGhpcyBpdGVtIChvciBhIGNoaWxkIGl0ZW0pXHJcblx0cHJpdmF0ZSBpc0l0ZW1JbnZhbGlkKGl0ZW0pOiBib29sZWFue1xyXG5cdFx0bGV0IGludmFsaWRTaWduYWxGb3VuZCA9IGZhbHNlO1xyXG5cdFx0bGV0IHNpZ25hbHMgPSB0aGlzLmdldFNpZ25hbHNGcm9tSXRlbShpdGVtKTtcclxuXHRcdGZvcihsZXQgaSA9IDA7IGkgPCBzaWduYWxzLmxlbmd0aDsgaSsrKXtcclxuXHRcdFx0aWYoc2lnbmFsc1tpXS5yYXdQb2ludHNWYWxpZCA9PSBmYWxzZSl7XHJcblx0XHRcdFx0aW52YWxpZFNpZ25hbEZvdW5kID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGludmFsaWRTaWduYWxGb3VuZDtcclxuXHR9Ki9cclxuXHJcblx0LyoqXHJcblx0ICogSGFzIHRoZSBnaXZlbiBpdGVtIHNvbWUgZGF0YSBhbmQgaXMgdGhpcyBkYXRhIHZhbGlkIFxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0geyp9IGl0ZW1cclxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaXNJdGVtSW52YWxpZChpdGVtKTogYm9vbGVhbntcclxuXHRcdGlmKGl0ZW0gaW5zdGFuY2VvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb24pe1xyXG5cdFx0XHRsZXQgY2FsY3VsYXRlZFNpZ25hbHMgPSBpdGVtLmdldFNlcmllcygpO1xyXG5cdFx0XHQvLyBjaGVjayBpZiBhIGNhbGN1bGF0ZWQgb3V0cHV0IHNpZ25hbCBpcyBpbnZhbGlkXHJcblx0XHRcdGZvcihsZXQgaSA9IDA7IGkgPCBjYWxjdWxhdGVkU2lnbmFscy5sZW5ndGg7IGkrKyl7XHJcblx0XHRcdFx0aWYoY2FsY3VsYXRlZFNpZ25hbHNbaV0ucmF3UG9pbnRzVmFsaWQgPT0gZmFsc2Upe1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmKGl0ZW0gaW5zdGFuY2VvZiBTZXJpZU5vZGUgKXtcclxuXHRcdFx0aWYoaXRlbS5zZXJpZSAhPSB1bmRlZmluZWQgJiYgaXRlbS5zZXJpZS5yYXdQb2ludHNWYWxpZCA9PSBmYWxzZSl7XHJcblx0XHRcdFx0aWYoaXRlbSBpbnN0YW5jZW9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbk91dHB1dERhdGEpe1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZXtcclxuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBIGRyYWcgYW5kIGRyb3Agb3BlcmF0aW9uIHdhcyBzdGFydGVkXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7Kn0gYXJnc1xyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSByb3dEcmFnU3RhcnQoYXJncyl7XHJcblx0XHR0aGlzLl9pbmRleGVzRHJhZ2dlZCA9IFtdO1xyXG5cdFx0XHJcblx0XHRsZXQgc2VsZWN0ZWRFbGVtZW50cyA9IHRoaXMuY2hlY2tTZWxlY3RlZEVsZW1lbnRzKGFyZ3MuZHJhZ2dlZFJlY29yZHMsIGFyZ3MuZHJhZ2dlZFJvdyk7XHJcblx0XHRpZiAoc2VsZWN0ZWRFbGVtZW50cy5sZW5ndGggPiAwICkge1xyXG5cdFx0XHR0aGlzLl9jdXJyZW50RHJhZ0Ryb3BTZXJpZXMgPSBzZWxlY3RlZEVsZW1lbnRzO1xyXG5cdFx0XHQgLy8gU2V0IGN1cnJlbnQgZHJhZyBkcm9wIHNpZ25hbFxyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHRoaXMuX2N1cnJlbnREcmFnRHJvcFNlcmllcyA9IHVuZGVmaW5lZDsgLy8gUmVzZXQgY3VycmVudCBkcmFnIGRyb3Agc2lnbmFsXHJcblx0XHR9XHJcblx0XHRhcmdzLmRyYWdnZWRSZWNvcmRzID0gW107XHJcblx0XHRhcmdzLmNhbmNlbCA9IHRydWU7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHJlZnJlc2hTZWxlY3Rpb24oKXtcclxuXHRcdGNvbnN0IHRyZWVPYmogPSAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKS5lalRyZWVHcmlkKCdpbnN0YW5jZScpOyBcclxuXHRcdFx0XHRcdFx0XHJcblx0XHQvLyBHZXQgYWN0dWFsIHNlbGVjdGlvbiBpbmRleFxyXG5cdFx0bGV0IGFjdHVhbFNlbGVjdGVkUm93SW5kZXggPSB0cmVlT2JqLm1vZGVsLnNlbGVjdGVkUm93SW5kZXg7XHJcblx0XHQvLyBSZXNldCBzZWxlY3Rpb25cclxuXHRcdHRyZWVPYmoubW9kZWwuc2VsZWN0ZWRSb3dJbmRleCA9IC0xO1xyXG5cdFx0XHJcblx0XHQvLyBTZXQgdG8gbGFzdCBpbmRleCBpZiBpbmRleCBpcyBvdXQgb2YgcmFuZ2VcclxuXHRcdGlmKGFjdHVhbFNlbGVjdGVkUm93SW5kZXggPj0gdHJlZU9iai5tb2RlbC5mbGF0UmVjb3Jkcy5sZW5ndGgpe1xyXG5cdFx0XHRhY3R1YWxTZWxlY3RlZFJvd0luZGV4ID0gdHJlZU9iai5tb2RlbC5mbGF0UmVjb3Jkcy5sZW5ndGgtMTtcclxuXHRcdH1cclxuXHRcdC8vIFNldCBzZWxlY3Rpb25cclxuXHRcdHRyZWVPYmoubW9kZWwuc2VsZWN0ZWRSb3dJbmRleCA9IGFjdHVhbFNlbGVjdGVkUm93SW5kZXg7XHJcblx0XHRcclxuXHRcdGxldCBhcmVFbGVtZW50c0V4cG9ydGFibGUgPSB0aGlzLmNhbkl0ZW1zQmVFeHBvcnRlZCh0cmVlT2JqLm1vZGVsLmZsYXRSZWNvcmRzKTtcclxuXHJcblx0XHQvLyB1cGRhdGUgdG9vbGJhciBidXR0b25zXHJcblx0XHRpZih0cmVlT2JqLm1vZGVsLmZsYXRSZWNvcmRzW2FjdHVhbFNlbGVjdGVkUm93SW5kZXhdICE9IHVuZGVmaW5lZCl7XHJcblx0XHRcdHRoaXMudXBkYXRlVG9vbGJhckJ1dHRvblN0YXRlcyh0cmVlT2JqLm1vZGVsLmZsYXRSZWNvcmRzW2FjdHVhbFNlbGVjdGVkUm93SW5kZXhdLml0ZW0sIGFyZUVsZW1lbnRzRXhwb3J0YWJsZSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLnVwZGF0ZVRvb2xiYXJCdXR0b25TdGF0ZXModW5kZWZpbmVkLCBhcmVFbGVtZW50c0V4cG9ydGFibGUpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSByb3dTZWxlY3RlZChpdGVtOiBhbnksIGN1cnJlbnRWaWV3RGF0YSl7XHJcblx0XHRsZXQgYXJlRWxlbWVudHNFeHBvcnRhYmxlID0gdGhpcy5jYW5JdGVtc0JlRXhwb3J0ZWQoY3VycmVudFZpZXdEYXRhKTtcclxuXHRcdHRoaXMudXBkYXRlVG9vbGJhckJ1dHRvblN0YXRlcyhpdGVtLCBhcmVFbGVtZW50c0V4cG9ydGFibGUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogdXBkYXRlcyB0aGUgdG9vbGJhciBidXR0b25zKGUuZy4gaW5zZXJ0IGNhbHVsYXRpb24gb25seSBlbmFibGVkIG9uIFNlcmllR3JvdXAgb3IgdW5kZXIgXCJDYWxjdWxhdGVkIHNpZ25hbHNcIiBjYXRlZ29yeSlcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHtJU2VyaWVOb2RlfSBpdGVtXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIHVwZGF0ZVRvb2xiYXJCdXR0b25TdGF0ZXMoaXRlbTogSVNlcmllTm9kZSB8IHVuZGVmaW5lZCwgYXJlRWxlbWVudHNFeHBvcnRhYmxlOiBib29sZWFuKXtcclxuXHRcdGlmIChpdGVtID09IHVuZGVmaW5lZCl7XHJcblx0XHRcdHRoaXMuX3Rvb2xiYXIuZGlzYWJsZUluc2VydENhbGN1bGF0aW9uQnV0dG9uKHRydWUpO1xyXG5cdFx0XHR0aGlzLl90b29sYmFyLmRpc2FibGVEZWxldGVCdXR0b24odHJ1ZSk7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0Ly8gc2V0IGRlbGV0ZSBidXR0b24gc3RhdGVcclxuXHRcdFx0dGhpcy5fdG9vbGJhci5kaXNhYmxlRGVsZXRlQnV0dG9uKCFpdGVtLmNhbkRlbGV0ZSk7XHJcblxyXG5cdFx0XHRpZihpdGVtIGluc3RhbmNlb2YgU2VyaWVHcm91cCl7XHJcblx0XHRcdFx0dGhpcy5fdG9vbGJhci5kaXNhYmxlRXhwb3J0QnV0dG9uKGZhbHNlKTtcclxuXHRcdFx0XHR0aGlzLl90b29sYmFyLmRpc2FibGVJbnNlcnRDYWxjdWxhdGlvbkJ1dHRvbihmYWxzZSk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZXtcclxuXHRcdFx0XHRpZihpdGVtLmdldFNlcmllR3JvdXAoKSA9PSB1bmRlZmluZWQpe1xyXG5cdFx0XHRcdFx0dGhpcy5fdG9vbGJhci5kaXNhYmxlSW5zZXJ0Q2FsY3VsYXRpb25CdXR0b24odHJ1ZSk7XHJcblx0XHRcdFx0XHR0aGlzLl90b29sYmFyLmRpc2FibGVFeHBvcnRCdXR0b24odHJ1ZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2UgaWYoaXRlbSBpbnN0YW5jZW9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdG9yVHlwZSAmJiBpdGVtLm5hbWUgPT0gJ0FsZ29yaXRobScgfHwgaXRlbSBpbnN0YW5jZW9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YSAmJiBpdGVtLnNlcmllID09IHVuZGVmaW5lZCB8fFxyXG5cdFx0XHRcdCgoaXRlbSBpbnN0YW5jZW9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbiB8fCBpdGVtIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uT3V0cHV0RGF0YSkgJiYgKGl0ZW0uc2VyaWUgPT0gdW5kZWZpbmVkIHx8IGl0ZW0uc2VyaWUhLnJhd1BvaW50c1ZhbGlkID09IGZhbHNlKSkpe1xyXG5cdFx0XHRcdFx0dGhpcy5fdG9vbGJhci5kaXNhYmxlSW5zZXJ0Q2FsY3VsYXRpb25CdXR0b24oZmFsc2UpO1xyXG5cdFx0XHRcdFx0dGhpcy5fdG9vbGJhci5kaXNhYmxlRXhwb3J0QnV0dG9uKHRydWUpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNle1xyXG5cdFx0XHRcdFx0dGhpcy5fdG9vbGJhci5kaXNhYmxlRXhwb3J0QnV0dG9uKGZhbHNlKTtcclxuXHRcdFx0XHRcdHRoaXMuX3Rvb2xiYXIuZGlzYWJsZUluc2VydENhbGN1bGF0aW9uQnV0dG9uKGZhbHNlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cdFxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChhcmVFbGVtZW50c0V4cG9ydGFibGUpIHtcclxuXHRcdFx0dGhpcy5fdG9vbGJhci5kaXNhYmxlRXhwb3J0QnV0dG9uKGZhbHNlKTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR0aGlzLl90b29sYmFyLmRpc2FibGVFeHBvcnRCdXR0b24odHJ1ZSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgY2FuSXRlbXNCZUV4cG9ydGVkKGl0ZW1zKTogYm9vbGVhbiB7XHJcblx0XHRsZXQgY2FuQmVFeHBvcnRlZCA9IGZhbHNlO1xyXG5cdFx0bGV0IGV4cG9ydEhlbHBlciA9IG5ldyBFeHBvcnRIZWxwZXIoKTtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYgKGV4cG9ydEhlbHBlci5pc0VsZW1lbnRFeHBvcnRhYmxlKGl0ZW1zW2ldLml0ZW0pID09PSB0cnVlKSB7XHJcblx0XHRcdFx0Y2FuQmVFeHBvcnRlZCA9IHRydWU7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBjYW5CZUV4cG9ydGVkO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQSBjbGljayBvbiB0aGUgdHJlZSBncmlkIChuZWVkZWQgZm9yIHJlc2V0aW5nIHRoZSBjdXJyZW50IGRyYWcgZHJvcCBzaWduYWwpXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7Kn0gYXJnc1xyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBjbGljayhhcmdzKXtcclxuXHRcdC8vIFJlc2V0IGN1cnJlbnQgZHJhZyBkcm9wIHNpZ25hbCBhZnRlciBjbGljayB3YXMgZmluaXNoZWQoY2xpY2sgdXApXHJcblx0XHR0aGlzLl9jdXJyZW50RHJhZ0Ryb3BTZXJpZXMgPSB1bmRlZmluZWQ7XHJcblx0XHR0aGlzLmZvY3VzKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBIGRvdWJsZSBjbGljayBvbiB0aGUgdHJlZSBncmlkIHdhcyBkb25lXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7Kn0gYXJnc1xyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBkb3VibGVDbGljayhhcmdzKXtcclxuXHRcdGlmKGFyZ3MuY2VsbEluZGV4ID09IDApe1xyXG5cdFx0XHRsZXQgc2VyaWVOb2RlID0gYXJncy5kYXRhLml0ZW07XHJcblx0XHRcdGxldCBmb3VuZFNlcmllcyA9IHRoaXMuZ2V0U2VyaWVzRnJvbUl0ZW0oc2VyaWVOb2RlKTtcclxuXHRcdFx0aWYoZm91bmRTZXJpZXMubGVuZ3RoID4gMCl7XHJcblx0XHRcdFx0Ly8gT25seSBvbmUgc2VyaWUgY2FuIGJlIGFkZGVkIGJ5IGRvdWJsZSBjbGljayBjdXJyZW50bHkoVE9ETzogYWRkIG11bHRpIGluc2VydClcclxuXHRcdFx0XHR0aGlzLm9uU2VyaWVzRG91YmxlQ2xpY2tlZChmb3VuZFNlcmllc1swXSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGFsbCBlbGVtZW50cyBzZWxlY3RlZCBhcmUgc2VyaWVzIGFuZCBvZiB0aGUgc2FtZSB0eXBlXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7Kn0gZWxlbWVudHNcclxuXHQgKiBAcGFyYW0geyp9IGRyYWdnZWRSb3dcclxuXHQgKiBAcmV0dXJucyB7QXJyYXk8QmFzZVNlcmllcz59XHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIGNoZWNrU2VsZWN0ZWRFbGVtZW50cyhlbGVtZW50cywgZHJhZ2dlZFJvdyk6QXJyYXk8QmFzZVNlcmllcz4ge1xyXG5cdFx0bGV0IHNlcmllcyA9IG5ldyBBcnJheTxCYXNlU2VyaWVzPigpO1xyXG5cdFx0bGV0IGl0ZW1zID0gbmV3IEFycmF5PGFueT4oKTtcclxuXHRcdGxldCBkcmFnZ2VkUm93SXNTZWxlY3RlZCA9IGZhbHNlO1xyXG5cdFx0bGV0IGludmFsaWRTZWxlY3Rpb24gPSBmYWxzZTtcclxuXHJcblx0XHRpZiAoZHJhZ2dlZFJvdyA9PSB1bmRlZmluZWQgfHwgZHJhZ2dlZFJvdy5zZXJpZSA9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0cmV0dXJuIFtdO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCB0eXBlID0gZHJhZ2dlZFJvdy5zZXJpZS50eXBlO1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkgPSBpICsgMSl7XHJcblx0XHRcdGlmIChlbGVtZW50c1tpXS5zZXJpZSA9PSB1bmRlZmluZWQgfHwgZWxlbWVudHNbaV0uc2VyaWUudHlwZSAhPSB0eXBlKSB7XHJcblx0XHRcdFx0aW52YWxpZFNlbGVjdGlvbiA9IHRydWU7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKGVsZW1lbnRzW2ldID09IGRyYWdnZWRSb3cpIHtcclxuXHRcdFx0XHRkcmFnZ2VkUm93SXNTZWxlY3RlZCA9IHRydWU7XHJcblx0XHRcdH1cclxuXHRcdFx0c2VyaWVzLnB1c2goZWxlbWVudHNbaV0uc2VyaWUpO1xyXG5cdFx0XHRpdGVtcy5wdXNoKGVsZW1lbnRzW2ldKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoZHJhZ2dlZFJvdy5pdGVtIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhKXtcclxuXHRcdFx0dGhpcy5fY3VycmVudENhbGN1bGF0b3JUeXBlID0gZHJhZ2dlZFJvdy5wYXJlbnQ7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly9PbmNlIGFsbCBlbGVtZW50cyBoYXZlIGJlZW4gY2hlY2tlZCwgc2VsZWN0IGNvcnJlY3QgZWxlbWVudHMgYWNjb3JkaW5nIHRvIHRoZSBleGNlcHRpb25zXHJcblx0XHRpZiAoIWRyYWdnZWRSb3dJc1NlbGVjdGVkKSB7XHJcblx0XHRcdHNlcmllcyA9IFtdO1xyXG5cdFx0XHRzZXJpZXMucHVzaChkcmFnZ2VkUm93LnNlcmllKTtcclxuXHRcdFx0dGhpcy5faW5kZXhlc0RyYWdnZWQgPSBbXTtcclxuXHRcdFx0dGhpcy5faW5kZXhlc0RyYWdnZWQucHVzaChkcmFnZ2VkUm93LmluZGV4KTtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYoaW52YWxpZFNlbGVjdGlvbikge1xyXG5cdFx0XHRyZXR1cm4gW107XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0c2VyaWVzID0gdGhpcy5kZWxldGVFcXVhbFNpZ25hbHMoc2VyaWVzLCBpdGVtcyk7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHJldHVybiBzZXJpZXM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEZWxldGUgZHVwbGljYXRlZCBzaWduYWxzIGZyb20gdGhlIGRyYWcmZHJvcCBhcnJheVxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0ge0FycmF5PEJhc2VTZXJpZXM+fSBzZXJpZXNcclxuXHQgKiBAcGFyYW0geyp9IGVsZW1lbnRzXHJcblx0ICogQHJldHVybnNcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZGVsZXRlRXF1YWxTaWduYWxzKHNlcmllczogQXJyYXk8QmFzZVNlcmllcz4sIGVsZW1lbnRzKSB7XHJcblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgc2VyaWVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGlmIChlbGVtZW50c1tpXS5pdGVtIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhKXtcclxuXHRcdFx0XHRsZXQgc2VsZWN0ZWRJdGVtcyA9IE9iamVjdC5hc3NpZ24oW10sIHNlcmllcyk7XHJcblx0XHRcdFx0c2VsZWN0ZWRJdGVtcy5zcGxpY2UoaSwgMSk7XHJcblx0XHRcdFx0aWYgKHNlbGVjdGVkSXRlbXMuaW5jbHVkZXMoc2VyaWVzW2ldKSl7XHJcblx0XHRcdFx0XHRzZXJpZXMuc3BsaWNlKGksIDEpO1xyXG5cdFx0XHRcdFx0ZWxlbWVudHMuc3BsaWNlKGksIDEpO1xyXG5cdFx0XHRcdFx0aSA9IC0xO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGZvcihsZXQgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR0aGlzLl9pbmRleGVzRHJhZ2dlZC5wdXNoKGVsZW1lbnRzW2ldLmluZGV4KTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0cmV0dXJuIHNlcmllcztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgYWxsIHNlcmllcyB3aGljaCB3ZXJlIGZvdW5kIGluIHRoZSBzZXJpZSBub2RlIGl0ZW0oZS5nLiBhIG5vcm1hbCBzZXJpZSBvciBjYWxjdWxhdGVkIHNlcmllcylcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHsqfSBpdGVtXHJcblx0ICogQHJldHVybnMge0FycmF5PEJhc2VTZXJpZXM+fVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBnZXRTZXJpZXNGcm9tSXRlbShpdGVtKTogQXJyYXk8QmFzZVNlcmllcz57XHJcblx0XHRsZXQgc2lnbmFscyA9IG5ldyBBcnJheTxCYXNlU2VyaWVzPigpO1xyXG5cdFx0aWYoaXRlbSBpbnN0YW5jZW9mIFNlcmllTm9kZSAmJiBpdGVtLnNlcmllICE9IHVuZGVmaW5lZCl7IC8vIElzIFNpZ25hbCBub2RlXHJcblx0XHRcdHNpZ25hbHMucHVzaChpdGVtLnNlcmllKTtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYoaXRlbSBpbnN0YW5jZW9mIFNlcmllQ29udGFpbmVyKXsgLy8gaXMgY2FsY3VsYXRpb24oZ3JvdXAgbm9kZSkgd2l0aCBzaWduYWxzXHJcblx0XHRcdHJldHVybiBpdGVtLmdldFNlcmllcygpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHNpZ25hbHM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJcyB0aGUgZ2l2ZW4gaXRlbSBhIGdyb3VwIGl0ZW0gKGUuZy4gbmVlZGVkIGZvciBzZXR0aW5nIHRoZSBmb250IHN0eWxlIHRvIGJvbGQpXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7SVNlcmllQ29udGFpbmVyfSBpdGVtXHJcblx0ICogQHJldHVybnNcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaXNHcm91cEl0ZW0oaXRlbTogSVNlcmllQ29udGFpbmVyKXtcclxuXHRcdGlmKGl0ZW0gPT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0aWYoaXRlbS52aXNpYmxlQ2hpbGRzICE9IHVuZGVmaW5lZCl7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0aW5zZXJ0Q2FsY3VsYXRpb24oaXRlbSl7XHJcblx0XHRpZihpdGVtID09IHVuZGVmaW5lZCl7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdHZhciBzZWxlY3RlZEl0ZW0gPSBpdGVtLml0ZW07XHJcblx0XHR2YXIgc2VyaWVHcm91cDtcclxuXHRcdGlmKHNlbGVjdGVkSXRlbSBpbnN0YW5jZW9mIFNlcmllR3JvdXAgfHwgc2VsZWN0ZWRJdGVtIGluc3RhbmNlb2YgU2lnbmFsQ2F0ZWdvcnkpe1xyXG5cdFx0XHQvLyBDYWxjdWxhdGlvbiBjYW4gb25seSBiZSBpbnNlcnQgYXQgZ3JvdXBzIG9yIGNhdGVnb3JpZXNcclxuXHRcdFx0c2VyaWVHcm91cCA9IHNlbGVjdGVkSXRlbTtcclxuXHRcdH1cclxuXHRcdGVsc2V7XHJcblx0XHRcdHNlcmllR3JvdXAgPSBzZWxlY3RlZEl0ZW0uZ2V0U2VyaWVHcm91cCgpO1xyXG5cdFx0fVxyXG5cdFx0aWYoc2VyaWVHcm91cCAhPSB1bmRlZmluZWQpe1xyXG5cclxuXHRcdFx0dGhpcy5hY3RpdmF0ZUVkaXRNb2RlKHRydWUpO1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5hZGRDYWxjdWxhdGlvblRvQ29udGFpbmVyKHNlcmllR3JvdXApO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHVuZGVmaW5lZDtcclxuXHR9XHJcblx0XHJcblx0cHJpdmF0ZSBhZGRDYWxjdWxhdGlvblRvQ29udGFpbmVyKGNvbnRhaW5lcjogSVNlcmllQ29udGFpbmVyKTogU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9ue1xyXG5cdFx0bGV0IGNhbGN1bGF0aW9uID0gbmV3IFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbihcIkNhbGN1bGF0aW9uXCIpO1xyXG5cdFx0dGhpcy5fc2VyaWVDb250YWluZXJUb1NlbGVjdEFmdGVyUmVmcmVzaCA9IGNhbGN1bGF0aW9uO1xyXG5cdFx0Y29udGFpbmVyLmFkZFNlcmllQ29udGFpbmVyKGNhbGN1bGF0aW9uLCAtMSk7XHJcblx0XHRyZXR1cm4gY2FsY3VsYXRpb247XHJcbiAgICB9XHJcblxyXG5cdHB1YmxpYyBnZXRDb21wb25lbnRTZXR0aW5ncygpOiBDb21wb25lbnRTZXR0aW5nc3tcclxuXHRcdHRoaXMuY29tcG9uZW50LnNldFNldHRpbmcoV2lkZ2V0QmFzZS5XaWRnZXRTZXR0aW5nSWQsIHRoaXMuZ2V0V2lkZ2V0U2V0dGluZ3MoKSk7XHJcblx0XHRyZXR1cm4gc3VwZXIuZ2V0Q29tcG9uZW50U2V0dGluZ3MoKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXRDb21wb25lbnRTZXR0aW5ncyhkYXRhOiBDb21wb25lbnRTZXR0aW5ncykge1xyXG5cdFx0c3VwZXIuc2V0Q29tcG9uZW50U2V0dGluZ3MoZGF0YSk7XHJcblx0XHR0aGlzLnNldFdpZGdldFNldHRpbmdzKHRoaXMuY29tcG9uZW50LmdldFNldHRpbmcoV2lkZ2V0QmFzZS5XaWRnZXRTZXR0aW5nSWQpKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgZ2V0V2lkZ2V0U2V0dGluZ3MoKTogYW55e1xyXG5cdFx0bGV0IHNldHRpbmdzID0ge1wiZWRpdE1vZGVBY3RpdmVcIjogdGhpcy5lZGl0TW9kZUFjdGl2ZX07XHJcblx0XHRyZXR1cm4gc2V0dGluZ3M7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHNldFdpZGdldFNldHRpbmdzKGRhdGE6IGFueSkge1xyXG5cdFx0aWYoZGF0YSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcblx0XHR9XHJcblx0XHR0aGlzLmFjdGl2YXRlRWRpdE1vZGUoZGF0YVtcImVkaXRNb2RlQWN0aXZlXCJdKTtcclxuXHR9XHJcblxyXG5cdGFjdGl2YXRlRWRpdE1vZGUoYWN0aXZhdGU6IGJvb2xlYW4pe1xyXG5cclxuXHRcdC8vIFNob3cgb3IgaGlkZSBlZGl0IG1vZGUgY29sdW1uc1xyXG5cdFx0bGV0IHRyZWVPYmplY3QgPSB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCk7IFxyXG5cdFx0bGV0IHZhbHVlQ29sdW1uID0gdHJlZU9iamVjdC5nZXRDb2x1bW5CeUZpZWxkKFNpZ25hbE1hbmFnZXJXaWRnZXQudmFsdWVDb2x1bW5JZCk7XHJcblx0XHRsZXQgZGVzY3JpcHRpb25Db2x1bW4gPSB0cmVlT2JqZWN0LmdldENvbHVtbkJ5RmllbGQoU2lnbmFsTWFuYWdlcldpZGdldC5kZXNjcmlwdGlvbkNvbHVtbklkKTtcclxuXHRcdGxldCBjb2xvckNvbHVtbiA9IHRyZWVPYmplY3QuZ2V0Q29sdW1uQnlGaWVsZChTaWduYWxNYW5hZ2VyV2lkZ2V0LmNvbG9yQ29sdW1uSWQpO1xyXG5cdFx0aWYoYWN0aXZhdGUgPT0gdHJ1ZSl7XHJcblx0XHRcdHRyZWVPYmplY3Quc2hvd0NvbHVtbih2YWx1ZUNvbHVtbi5oZWFkZXJUZXh0KTtcclxuXHRcdFx0dHJlZU9iamVjdC5zaG93Q29sdW1uKGRlc2NyaXB0aW9uQ29sdW1uLmhlYWRlclRleHQpO1xyXG5cdFx0XHR0cmVlT2JqZWN0LnNob3dDb2x1bW4oY29sb3JDb2x1bW4uaGVhZGVyVGV4dCk7XHJcblx0XHR9XHJcblx0XHRlbHNle1xyXG5cdFx0XHR0cmVlT2JqZWN0LmhpZGVDb2x1bW4odmFsdWVDb2x1bW4uaGVhZGVyVGV4dCk7XHJcblx0XHRcdHRyZWVPYmplY3QuaGlkZUNvbHVtbihkZXNjcmlwdGlvbkNvbHVtbi5oZWFkZXJUZXh0KTtcclxuXHRcdFx0dHJlZU9iamVjdC5oaWRlQ29sdW1uKGNvbG9yQ29sdW1uLmhlYWRlclRleHQpO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5zZXRFZGl0TW9kZShhY3RpdmF0ZSk7XHJcblx0XHR0aGlzLnJlZnJlc2goKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdHJ1ZSBpZiBvbmUgb2YgdGhlIGl0ZW1zIGRlbGV0ZWQgaGFzIGJlZW4gZG9uZSB0aHJvdWdoIHRoZSB0cmFjZSBvZiBtYXBwQ29ja3BpdFxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHsqfSBzZWxlY3RlZEl0ZW1zXHJcblx0ICogQHJldHVybnMge2Jvb2xlYW59XHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwdWJsaWMgY29udGFpbnNJdGVtV2l0aGluUmVjZW50T3JVcGxvYWRlZChzZWxlY3RlZEl0ZW1zOiBBcnJheTxhbnk+KTogYm9vbGVhbiB7XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHNlbGVjdGVkSXRlbXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYgKHRoaXMuaXNJdGVtSW5TaWduYWxDYXRlZ29yeShzZWxlY3RlZEl0ZW1zW2ldLml0ZW0sIFNpZ25hbENhdGVnb3J5LkNhdGVnb3J5SWRVcGxvYWRlZCkgfHwgdGhpcy5pc0l0ZW1JblNpZ25hbENhdGVnb3J5KHNlbGVjdGVkSXRlbXNbaV0uaXRlbSwgU2lnbmFsQ2F0ZWdvcnkuQ2F0ZWdvcnlJZFJlY2VudCkpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0cnVlIGlmIHRoZSBpdGVtIHNlbGVjdGVkIGJlbG9uZ3MgdG8gdGhlIHNpZ25hbCBjYXRlZ29yeSBzZWxlY3RlZFxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0geyp9IGl0ZW1cclxuXHQgKiBAcGFyYW0geyp9IHNpZ25hbENhdGVnb3J5SWRcclxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaXNJdGVtSW5TaWduYWxDYXRlZ29yeShpdGVtOiBJU2VyaWVOb2RlIHwgSVNlcmllQ29udGFpbmVyLCBzaWduYWxDYXRlZ29yeUlkOiBzdHJpbmcpOiBib29sZWFuIHtcclxuXHRcdGxldCBwYXJlbnQgPSBpdGVtLnBhcmVudDtcclxuXHJcblx0XHRpZiAocGFyZW50IGluc3RhbmNlb2YgU2lnbmFsQ2F0ZWdvcnkgJiYgcGFyZW50LmlkID09IHNpZ25hbENhdGVnb3J5SWQpIHtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmICghKHBhcmVudCBpbnN0YW5jZW9mIFNpZ25hbFJvb3QpKXtcclxuXHRcdFx0cmV0dXJuIHRoaXMuaXNJdGVtSW5TaWduYWxDYXRlZ29yeShwYXJlbnQhLCBzaWduYWxDYXRlZ29yeUlkKTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTaG93cyBtZXNzYWdlIGJveCBhY2NvcmRpbmcgdG8gdHlwZVxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0ge21lc3NhZ2VCb3hUeXBlfSB0eXBlXHJcblx0ICogQHBhcmFtIHtNYXA8c3RyaW5nLCBzdHJpbmc+fSBmaWxlQ29udGVudHNcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgc2hvd01lc3NhZ2VCb3godHlwZTogbWVzc2FnZUJveFR5cGUsIGZpbGVDb250ZW50czogTWFwPHN0cmluZywgc3RyaW5nPikge1xyXG5cdFx0aWYodHlwZSA9PT0gbWVzc2FnZUJveFR5cGUuV2FybmluZykge1xyXG5cdFx0XHR0aGlzLnNob3dXYXJuaW5nV2hlbkltcG9ydGluZ0ZpbGVzKCk7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmKHR5cGUgPT09IG1lc3NhZ2VCb3hUeXBlLlllc05vKSB7XHJcblx0XHRcdHRoaXMuc2hvd01lc3NhZ2VCb3hXaGVuSW1wb3J0aW5nTUNFRmlsZXMoZmlsZUNvbnRlbnRzKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYSB3YXJuaW5nIG1lc3NhZ2Ugd2hlbiB0aGUgdXNlciBpbXBvcnRzIGEgLm1jZSBmaWxlIGFuZCBvdGhlciBmaWxlcyB0b29cclxuXHQgKlxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBzaG93V2FybmluZ1doZW5JbXBvcnRpbmdGaWxlcygpIHtcclxuXHRcdG5ldyBBbGVydERpYWxvZygpLmNyZWF0ZU1lc3NhZ2VCb3godGhpcy5fd2FybmluZ0ltcG9ydGluZ0hlYWRlcix0aGlzLl93YXJuaW5nSW1wb3J0aW5nQ29udGVudCwgbWVzc2FnZUJveFR5cGUuV2FybmluZywgdW5kZWZpbmVkKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYSBtZXNzYWdlIGJveCB0aGF0IGxldHMgdXNlciBkZWNpZGUgdG8gZGVsZXRlIHNlbGVjdGVkIGRhdGEgb3Igbm90XHJcblx0ICpcclxuXHQgKiBAcGFyYW0geyp9IGRlbGV0ZWRJdGVtc1xyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHVibGljIHNob3dNZXNzYWdlQm94Rm9yRGVsZXRpbmdJdGVtKGRlbGV0ZWRJdGVtcykge1xyXG5cdFx0bGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XHJcblx0XHRsZXQgc2VsZiA9IHRoaXM7XHJcblx0XHRcclxuXHRcdG5ldyBBbGVydERpYWxvZygpLmNyZWF0ZU1lc3NhZ2VCb3godGhpcy5fZGVsZXRlSXRlbXNIZWFkZXIsdGhpcy5fZGVsZXRlSXRlbXNDb250ZW50LCBtZXNzYWdlQm94VHlwZS5DYW5jZWxEZWxldGUsIGRlZmVycmVkKTtcclxuXHJcblx0XHQkLndoZW4oZGVmZXJyZWQpLmRvbmUoZnVuY3Rpb24oKXtcclxuXHRcdFx0c2VsZi5kZWxldGVJdGVtcyhkZWxldGVkSXRlbXMpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGEgbWVzc2FnZSBib3ggdGhhdCBsZXRzIHVzZXIgZGVjaWRlIHRvIGltcG9ydCAubWNlIGZpbGUgbmFkIGRlbGV0ZSBhbGwgZGF0YSBvciBub3RcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHsqfSBkYXRhXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIHNob3dNZXNzYWdlQm94V2hlbkltcG9ydGluZ01DRUZpbGVzKGZpbGVDb250ZW50czogTWFwPHN0cmluZywgc3RyaW5nPikge1xyXG5cdFx0bGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XHJcblx0XHRsZXQgc2VsZiA9IHRoaXM7XHJcblx0XHRcclxuXHRcdG5ldyBBbGVydERpYWxvZygpLmNyZWF0ZU1lc3NhZ2VCb3godGhpcy5fTUNFRmlsZXNJbXBvcnRlZEhlYWRlcix0aGlzLl9NQ0VGaWxlc0ltcG9ydGVkQ29udGVudCwgbWVzc2FnZUJveFR5cGUuWWVzTm8sIGRlZmVycmVkKTtcclxuXHRcdFxyXG5cdFx0JC53aGVuKGRlZmVycmVkKS5kb25lKGZ1bmN0aW9uKCl7XHJcblx0XHRcdHNlbGYuc3RhcnRJbXBvcnQoZmlsZUNvbnRlbnRzKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcbiAgICBwdWJsaWMgZGVsZXRlSXRlbXMoaXRlbXMpIHtcclxuXHRcdHRoaXMuX3N1cHByZXNzUmVmcmVzaCA9IHRydWU7XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVsZXRlSXRlbShpdGVtc1tpXS5pdGVtKTtcclxuXHRcdH1cclxuXHRcdHRoaXMuX3N1cHByZXNzUmVmcmVzaCA9IGZhbHNlO1xyXG5cdFx0dGhpcy5yZWZyZXNoKCk7XHJcblx0fVxyXG5cdFxyXG5cdGRlbGV0ZUl0ZW0oaXRlbSl7XHJcblx0XHRpZihpdGVtLmNhbkRlbGV0ZSl7XHJcblx0XHRcdGlmKGl0ZW0gaW5zdGFuY2VvZiBTZXJpZU5vZGUpe1xyXG5cdFx0XHRcdHRoaXMucmVtb3ZlU2VyaWVOb2RlKGl0ZW0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2V7XHJcblx0XHRcdFx0dGhpcy5yZW1vdmVTZXJpZUNvbnRhaW5lcihpdGVtKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQgKiAgUmVtb3ZlIHRoZSBzaWduYWwgY29udGFpbmVyIHdpdGggYWxsIHN1YiBjb250YWluZXJzIGFuZCBzaWduYWxzIGZyb20gZGF0YW1vZGVsXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7SVNlcmllQ29udGFpbmVyfSBzZXJpZUdyb3VwXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIHJlbW92ZVNlcmllQ29udGFpbmVyKHNlcmllR3JvdXA6IElTZXJpZUNvbnRhaW5lcil7XHJcblx0XHQoPElTaWduYWxNYW5hZ2VyRGF0YU1vZGVsPnRoaXMuX2RhdGFNb2RlbCkucmVtb3ZlU2VyaWVDb250YWluZXIoc2VyaWVHcm91cCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmVzIHRoZSBzaWduYWwgZnJvbSBkYXRhbW9kZWxcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHtJU2VyaWVOb2RlfSBzZXJpZU5vZGVcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgcmVtb3ZlU2VyaWVOb2RlKHNlcmllTm9kZTogSVNlcmllTm9kZSl7XHJcblx0XHQoPElTaWduYWxNYW5hZ2VyRGF0YU1vZGVsPnRoaXMuX2RhdGFNb2RlbCkucmVtb3ZlU2VyaWVOb2RlKHNlcmllTm9kZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBFeHBvcnRzIGEgc2VyaWVHcm91cFxyXG5cdCAqXHJcblx0ICogQHB1YmxpY1xyXG5cdCAqIEBwYXJhbSB7QXJyYXk8RXhwb3J0U2VyaWVHcm91cD59IGVsZW1lbnRzXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJUcmVlR3JpZFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBleHBvcnRTZXJpZUdyb3VwKGVsZW1lbnRzOiBBcnJheTxFeHBvcnRTZXJpZUdyb3VwPil7XHJcblx0XHR0aGlzLnNldEJ1c3lJbmZvcm1hdGlvbihuZXcgQnVzeUluZm9ybWF0aW9uKFwiRXhwb3J0aW5nIGRhdGEuLi5cIiwgSW1hZ2VJZC5kZWZhdWx0SW1hZ2UsIDQ4LCB0cnVlKSk7XHJcblx0XHR0aGlzLnNldEJ1c3kodHJ1ZSk7XHJcblx0XHQvLyBUaW1lb3V0IG5lZWRlZCB0byBzaG93IHRoZSBidXN5c2NyZWVuIGJlZm9yZSBleHBvcnRpbmcgZGF0YSBcclxuXHRcdHNldFRpbWVvdXQoKCkgPT4gdGhpcy5leHBvcnRDc3ZEYXRhKGVsZW1lbnRzKSwgMjAwKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE9wZW5zIGEgZmlsZSBzZWxlY3QgZGlhbG9nIGFuZCBpbXBvcnRzIGEgc2VyaWVHcm91cCBmcm9tIHRoZSBmaWxlXHJcblx0ICpcclxuXHQgKiBAcHVibGljXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJUcmVlR3JpZFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBpbXBvcnRTZXJpZUdyb3VwKCl7XHJcblx0XHR0aGlzLl9zZXJpZUNvbnRhaW5lclRvU2VsZWN0QWZ0ZXJSZWZyZXNoID0gdW5kZWZpbmVkO1xyXG5cdFx0dGhpcy5fZmlsZVByb3ZpZGVyLmV2ZW50VXBsb2FkRGF0YUZpbmlzaGVkLmF0dGFjaCh0aGlzLl91cGxvYWREYXRhRmluaXNoZWRIYW5kbGVyKTtcclxuXHRcdHRoaXMuX2ZpbGVQcm92aWRlci51cGxvYWREYXRhKFwiLmNzdiwgLm1jZVwiLCB0cnVlKTsgLy8gT25seSBzaG93L2FjY2VwdCAqLmNzdiBhbmQgKi5tY2UgZmlsZXNcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBleHBvcnRTaWduYWxNYW5hZ2VyRGF0YSgpe1xyXG5cdFx0dGhpcy5zZXRCdXN5SW5mb3JtYXRpb24obmV3IEJ1c3lJbmZvcm1hdGlvbihcIkV4cG9ydGluZyBkYXRhLi4uXCIsIEltYWdlSWQuZGVmYXVsdEltYWdlLCA0OCwgdHJ1ZSkpO1xyXG5cdFx0dGhpcy5zZXRCdXN5KHRydWUpO1xyXG5cdFx0Ly8gVGltZW91dCBuZWVkZWQgdG8gc2hvdyB0aGUgYnVzeXNjcmVlbiBiZWZvcmUgZXhwb3J0aW5nIGRhdGEgXHJcblx0XHRzZXRUaW1lb3V0KCgpID0+IHRoaXMuZXhwb3J0RGF0YSgpLCAyMDApO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogT2NjdXJzIGFmdGVyIHJlYWRpbmcgZGF0YSBmcm9tIGZpbGUodHJhY2UgaW1wb3J0IGRhdGEpXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7SFRNTElucHV0RWxlbWVudH0gc2VuZGVyXHJcblx0ICogQHBhcmFtIHtNYXA8c3RyaW5nLCBzdHJpbmc+fSBhcmdzXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIG9uVXBsb2FkRGF0YUZpbmlzaGVkKHNlbmRlcjogSFRNTElucHV0RWxlbWVudCwgYXJnczogTWFwPHN0cmluZywgc3RyaW5nPil7XHJcblx0XHR0aGlzLnNldEJ1c3lJbmZvcm1hdGlvbihuZXcgQnVzeUluZm9ybWF0aW9uKFwiSW1wb3J0aW5nIGRhdGEuLi5cIiwgSW1hZ2VJZC5kZWZhdWx0SW1hZ2UsIDQ4LCB0cnVlKSk7XHJcblx0XHRsZXQgbXNnQm94VHlwZSA9IHRoaXMuY2hlY2tNZXNzYWdlQm94VHlwZShhcmdzKTsgXHJcblxyXG5cdFx0aWYgKG1zZ0JveFR5cGUgIT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHRoaXMuc2hvd01lc3NhZ2VCb3gobXNnQm94VHlwZSwgYXJncyk7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGhpcy5zdGFydEltcG9ydChhcmdzKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl9maWxlUHJvdmlkZXIuZXZlbnRVcGxvYWREYXRhRmluaXNoZWQuZGV0YWNoKHRoaXMuX3VwbG9hZERhdGFGaW5pc2hlZEhhbmRsZXIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRXhwb3J0cyB0aGUgZ2l2ZW4gc2lnbmFsIGdyb3VwIHRvIFRyYWNlRGF0YS5jc3YgZmlsZVxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0geyBBcnJheTxFeHBvcnRTZXJpZUdyb3VwPn0gZWxlbWVudHNcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZXhwb3J0Q3N2RGF0YShlbGVtZW50czogQXJyYXk8RXhwb3J0U2VyaWVHcm91cD4pe1xyXG5cdFx0bGV0IGRhdGEgPSBFeHBvcnRJbXBvcnRIZWxwZXIuZXhwb3J0VHJhY2VEYXRhKGVsZW1lbnRzKTtcclxuXHRcdGlmKGRhdGEgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtkYXRhXSwgeyB0eXBlOiBcInRleHQvY3N2XCIgfSk7XHJcblx0XHRcdEZpbGVQcm92aWRlci5kb3dubG9hZERhdGEoXCJUcmFjZURhdGEuY3N2XCIsIGJsb2IpOyAgICBcclxuXHRcdH1cclxuXHRcdHRoaXMuc2V0QnVzeShmYWxzZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBFeHBvcnRzIHRoZSBzaWduYWwgbWFuYWdlciBkYXRhKGRhdGFtb2RlbCBhbmQgc2VyaWVzIHByb3ZpZGVyKVxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZXhwb3J0RGF0YSgpe1xyXG5cdFx0aWYodGhpcy5fc2VyaWVzUHJvdmlkZXIgIT0gdW5kZWZpbmVkKXsgLy8gU2VyaWVzUHJvdmlkZXIgbmVlZGVkIHRvIGV4cG9ydCBkYXRhXHJcblx0XHRcdGxldCBzaWduYWxNYW5hZ2VyRGF0YU1vZGVsU2V0dGluZ3MgPSB0aGlzLmRhdGFNb2RlbC5nZXRDb21wb25lbnRTZXR0aW5ncygpO1xyXG5cdFx0XHRsZXQgc2VyaWVzUHJvdmlkZXJTZXR0aW5ncyA9IHRoaXMuX3Nlcmllc1Byb3ZpZGVyLmdldENvbXBvbmVudFNldHRpbmdzKCk7XHJcblxyXG5cdFx0XHRpZihzaWduYWxNYW5hZ2VyRGF0YU1vZGVsU2V0dGluZ3MgIT09IHVuZGVmaW5lZCAmJiBzZXJpZXNQcm92aWRlclNldHRpbmdzICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhID0ge1wiU2lnbmFsTWFuYWdlckRhdGFNb2RlbFwiOiBzaWduYWxNYW5hZ2VyRGF0YU1vZGVsU2V0dGluZ3MsIFwiU2VyaWVzUHJvdmlkZXJcIjogc2VyaWVzUHJvdmlkZXJTZXR0aW5nc307XHJcblx0XHRcdFx0bGV0IHN0cmluZ0RhdGEgPSBKU09OLnN0cmluZ2lmeShkYXRhKTtcclxuXHRcdFx0XHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtzdHJpbmdEYXRhXSwgeyB0eXBlOiBcInRleHQvaHRtbFwiIH0pO1xyXG5cdFx0XHRcdEZpbGVQcm92aWRlci5kb3dubG9hZERhdGEoXCJFeHBvcnQubWNlXCIsIGJsb2IpOyAgICBcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0ZWxzZXtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihcIlNlcmllc1Byb3ZpZGVyIGZvciBleHBvcnQgbm90IGF2YWlsYWJsZSFcIik7XHJcblx0XHR9XHJcblx0XHR0aGlzLnNldEJ1c3koZmFsc2UpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgYnVzeSBzY3JlZW4gYW5kIHN0YXJ0IGltcG9ydGluZyBkYXRhXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7TWFwPHN0cmluZywgc3RyaW5nPn0gYXJnc1xyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBzdGFydEltcG9ydChhcmdzOiBNYXA8c3RyaW5nLCBzdHJpbmc+KSB7XHJcblx0XHR0aGlzLnNldEJ1c3kodHJ1ZSk7XHJcblx0XHQvLyBUaW1lb3V0IG5lZWRlZCB0byBzaG93IHRoZSBidXN5c2NyZWVuIGJlZm9yZSBpbXBvcnRpbmcgZGF0YSBcclxuXHRcdHNldFRpbWVvdXQoKCkgPT4gdGhpcy5pbXBvcnREYXRhKGFyZ3MpLCAyMDApO1xyXG5cdH1cclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIGltcG9ydHMgdGhlIGdpdmVuIGZpbGVkYXRhIHdpdGggdGhlIGdpdmVuIGZpbGVuYW1lIHRvIHRoZSBzaWduYWwgbWFuYWdlciBkYXRhbW9kZWxcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHtNYXA8c3RyaW5nLCBzdHJpbmc+fSBmaWxlQ29udGVudHNcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaW1wb3J0RGF0YShmaWxlQ29udGVudHM6IE1hcDxzdHJpbmcsIHN0cmluZz4pe1xyXG5cdFx0ZmlsZUNvbnRlbnRzLmZvckVhY2goKGZpbGVEYXRhLCBmaWxlbmFtZSkgPT4ge1xyXG5cdFx0XHRpZihmaWxlbmFtZS50b0xvd2VyQ2FzZSgpLmVuZHNXaXRoKFwiLmNzdlwiKSl7XHJcblx0XHRcdFx0bGV0IHNlcmllR3JvdXBzID0gRXhwb3J0SW1wb3J0SGVscGVyLmltcG9ydFRyYWNlRGF0YShmaWxlRGF0YSwgZmlsZW5hbWUpO1xyXG5cdFx0XHRcdGxldCBzaWduYWxGaWxlID0gbmV3IFNlcmllQ29udGFpbmVyKGZpbGVuYW1lKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRzZXJpZUdyb3Vwcy5mb3JFYWNoKHNlcmllR3JvdXAgPT57XHRcclxuXHRcdFx0XHRcdHNpZ25hbEZpbGUuYWRkU2VyaWVDb250YWluZXIoc2VyaWVHcm91cCwgLTEpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdHRoaXMuX3NlcmllQ29udGFpbmVyVG9TZWxlY3RBZnRlclJlZnJlc2ggPSBzaWduYWxGaWxlO1xyXG5cdFx0XHRcdCg8SVNpZ25hbE1hbmFnZXJEYXRhTW9kZWw+dGhpcy5fZGF0YU1vZGVsKS5hZGRTZXJpZUNvbnRhaW5lcihzaWduYWxGaWxlLCBTaWduYWxDYXRlZ29yeS5DYXRlZ29yeUlkSW1wb3J0ZWQpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYgKGZpbGVuYW1lLnRvTG93ZXJDYXNlKCkuZW5kc1dpdGgoXCIubWNlXCIpKXtcclxuXHRcdFx0XHRsZXQgZGF0YSA9IEpTT04ucGFyc2UoZmlsZURhdGEpO1xyXG5cdFx0XHRcdHRoaXMuaW1wb3J0TUNFRmlsZShkYXRhKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNle1xyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJJbXBvcnQgZm9yIGZpbGUgZm9ybWF0IG5vdCBpbXBsZW1lbnRlZDogXCIgKyBmaWxlbmFtZSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHR9KTtcclxuXHRcdHRoaXMuc2V0QnVzeShmYWxzZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHR5cGUgb2YgbWVzc2FnZSBib3ggbmVlZCBpdCAoaWYgbmVlZCBpdClcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHtNYXA8c3RyaW5nLCBzdHJpbmc+fSBmaWxlQ29udGVudHNcclxuXHQgKiBAcmV0dXJucyB7KG1lc3NhZ2VCb3hUeXBlIHwgdW5kZWZpbmVkKX1cclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgY2hlY2tNZXNzYWdlQm94VHlwZShmaWxlQ29udGVudHM6IE1hcDxzdHJpbmcsIHN0cmluZz4pOiBtZXNzYWdlQm94VHlwZSB8IHVuZGVmaW5lZCB7XHJcblx0XHRsZXQgaXNTaWduYWxNYW5hZ2VyRW1wdHkgPSB0aGlzLmlzU2lnbmFsTWFuYWdlckVtcHR5KHRoaXMuZGF0YU1vZGVsLmRhdGEpO1xyXG5cdFx0bGV0IGlzVGhlcmVNQ0VGaWxlID0gZmFsc2U7XHJcblxyXG5cdFx0ZmlsZUNvbnRlbnRzLmZvckVhY2goKGZpbGVEYXRhLCBmaWxlbmFtZSkgPT4ge1xyXG5cdFx0XHRpZiAoZmlsZW5hbWUudG9Mb3dlckNhc2UoKS5lbmRzV2l0aChcIi5tY2VcIikpIHtcclxuXHRcdFx0XHRpc1RoZXJlTUNFRmlsZSA9IHRydWU7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdGlmIChpc1RoZXJlTUNFRmlsZSAmJiBmaWxlQ29udGVudHMuc2l6ZSA+IDEpIHtcclxuXHRcdFx0cmV0dXJuIG1lc3NhZ2VCb3hUeXBlLldhcm5pbmc7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmKGlzVGhlcmVNQ0VGaWxlICYmICFpc1NpZ25hbE1hbmFnZXJFbXB0eSkge1xyXG5cdFx0XHRyZXR1cm4gbWVzc2FnZUJveFR5cGUuWWVzTm87XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0cmV0dXJuIHVuZGVmaW5lZDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdHJ1ZSBpZiB0aGVyZSBpcyBub3RoaW5nIGluIHRoZSBzaWduYWxNYW5hZ2VyXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7Kn0gZGF0YVxyXG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBpc1NpZ25hbE1hbmFnZXJFbXB0eShkYXRhKTogYm9vbGVhbiB7XHJcblx0XHRsZXQgaXNFbXB0eSA9IHRydWU7XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYgKGRhdGFbaV0uY2hpbGRzLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRpc0VtcHR5ID0gZmFsc2U7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBpc0VtcHR5O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRGVsZXRlcyBhbGwgdHJhY2UgZGF0YSBhbmQgaW1wb3J0cyB0aGUgLm1jZSBmaWxlXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7Kn0gZGF0YVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBpbXBvcnRNQ0VGaWxlKGRhdGEpIHtcclxuXHRcdGlmKHRoaXMuX3Nlcmllc1Byb3ZpZGVyKXsgLy8gc2VyaWUgcHJvdmlkZXIgbmVlZGVkIHRvIGltcG9ydCBkYXRhXHJcblx0XHRcdC8vIFJlbW92ZSBkYXRhIGZyb20gb2xkIGRhdGFtb2RlbCA9PiBSZW1vdmVzIGFsc28gdGhlIHNlcmllcyBmcm9tIHRoZSBzZXJpZSBwcm92aWRlclxyXG5cdFx0XHR0aGlzLmRhdGFNb2RlbC5jbGVhcigpO1xyXG5cclxuXHRcdFx0aWYodGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsICE9IHVuZGVmaW5lZCl7XHJcblx0XHRcdFx0Ly8gY2xlYXIgb2xkIGNoYXJ0cyBmcm9tIGNoYXJ0bWFuYWdlciBkYXRhbW9kZWxcclxuXHRcdFx0XHR0aGlzLl9jaGFydE1hbmFnZXJEYXRhTW9kZWwuY2xlYXIoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gc2V0IG5ldyBzZXJpZSBkYXRhIHRvIHNlcmllIHByb3ZpZGVyXHJcblx0XHRcdHRoaXMuX3Nlcmllc1Byb3ZpZGVyLnNldENvbXBvbmVudFNldHRpbmdzKGRhdGEuU2VyaWVzUHJvdmlkZXIpO1xyXG5cdFx0XHQvLyBzZXQgbmV3IHNpZ25hbCBtYW5hZ2VyIGRhdGFcclxuXHRcdFx0dGhpcy5zdXBwcmVzc1JlZnJlc2godHJ1ZSk7XHJcblx0XHRcdHRoaXMuZGF0YU1vZGVsLnNldENvbXBvbmVudFNldHRpbmdzKGRhdGEuU2lnbmFsTWFuYWdlckRhdGFNb2RlbCk7XHJcblx0XHRcdHRoaXMuc3VwcHJlc3NSZWZyZXNoIChmYWxzZSk7XHJcblx0XHRcdHRoaXMucmVmcmVzaCgpXHJcblx0XHR9XHJcblx0XHRlbHNle1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKFwiU2VyaWVzUHJvdmlkZXIgZm9yIGltcG9ydCBub3QgYXZhaWxhYmxlIVwiKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNlbGVjdHMgdGhlIGdpdmVuIGNvbnRhaW5lciBpbiB0aGUgdHJlZSBncmlkIGFuZCBzY3JvbGxzIHRvIGl0IGlmIG91dCBvZiB0aGUgd2luZG93IChUT0RPOiBNb3ZlIHRvIEJhc2VDbGFzcyBpbmNsLiBfc2VyaWVDb250YWluZXJUb1NlbGVjdEFmdGVyUmVmcmVzaClcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHsoSVNlcmllQ29udGFpbmVyfHVuZGVmaW5lZCl9IGNvbnRhaW5lclxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBzZWxlY3RJdGVtKGNvbnRhaW5lcjogSVNlcmllQ29udGFpbmVyfHVuZGVmaW5lZCl7XHJcblx0XHRsZXQgdHJlZU9iamVjdCA9IHRoaXMuZ2V0VHJlZUdyaWRPYmplY3QoKTsgXHJcblx0XHRsZXQgcmVjb3JkID0gKDxhbnk+dHJlZU9iamVjdC5tb2RlbCkuZmxhdFJlY29yZHMuZmlsdGVyKHJlY29yZCA9PiB7cmV0dXJuIHJlY29yZC5pdGVtID09PSBjb250YWluZXJ9KVswXTtcclxuXHRcdGlmKHJlY29yZCAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHQvLyBleHBhbmQgcGFyZW50IG5vZGUgaWYgaXQgaXMgY29sbGFwc2VkIHRvIHNlZSB0aGUgbmV3IGltcG9ydGVkIHRyYWNlIGRhdGFcclxuXHRcdFx0aWYocmVjb3JkLnBhcmVudEl0ZW0uZXhwYW5kU3RhdGUgPT0gZmFsc2Upe1xyXG5cdFx0XHRcdHRyZWVPYmplY3QuZXhwYW5kQ29sbGFwc2VSb3cocmVjb3JkLnBhcmVudEl0ZW0uaW5kZXgpXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIHRyZWVPYmplY3Quc2Nyb2xsT2Zmc2V0IG5vdCBwb3NzaWJsZSBpZiB0aGVyZSB3b3VsZCBiZSBzb21lIGZyZWUgc3BhY2UgYWZ0ZXIgdGhlIGxhc3QgaXRlbSBpbiB0aGUgdHJlZSBncmlkIGFmdGVyIHNjcm9sbGluZyB0byB0aGUgZ2l2ZW4gaXRlbVxyXG5cdFx0XHQvLyA9PiBzY3JvbGxUb0JvdHRvbSBiZWZvciBzY3JvbGwgdG8gYSBzcGVjaWFsIG9mZnNldCBpZiBwb3NzaWJsZVxyXG5cdFx0XHR0cmVlT2JqZWN0LnNjcm9sbFRvQm90dG9tKCk7XHJcblx0XHRcdHRyZWVPYmplY3Quc2V0TW9kZWwoe1wic2VsZWN0ZWRSb3dJbmRleFwiIDogcmVjb3JkLmluZGV4IH0pO1xyXG5cdFx0XHRsZXQgcm93SGVpZ2h0ID0gdHJlZU9iamVjdC5tb2RlbC5yb3dIZWlnaHQ7XHJcblx0XHRcdC8vIHNjcm9sbCBpbmRleCBub3QgdGhlIHNhbWUgYXMgdGhlIHNlbGVjdGVkSW5kZXggPT4gY29sbGFwc2VkIG5vZGVzIG11c3QgYmUgY29uc2lkZXJlZFxyXG5cdFx0XHRsZXQgc2Nyb2xsSW5kZXg9IHRoaXMuZ2V0U2Nyb2xsSW5kZXgoKDxhbnk+dHJlZU9iamVjdC5tb2RlbCkuZmxhdFJlY29yZHMsIHJlY29yZC5pbmRleCk7XHJcblx0XHRcdGxldCBzY3JvbGxPZmZzZXQgPSAgKHNjcm9sbEluZGV4LTEpKnJvd0hlaWdodCE7XHJcblx0XHRcdHRyZWVPYmplY3Quc2Nyb2xsT2Zmc2V0KFwiMFwiLCBzY3JvbGxPZmZzZXQudG9TdHJpbmcoKSk7IC8vIFVzZSBwYXJlbnQgaW5kZXggdG8gc2VlIHRoZSBwYXJlbnQgbm9kZSBpbiB0aGUgdmlld1xyXG5cdFx0XHQvLyg8YW55PnRyZWVPYmplY3QpLnVwZGF0ZVNjcm9sbEJhcigpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgaW5kZXggb2Ygb25seSB0aGUgdmlzaWJsZShleHBhbmRlZCkgcm93c1xyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0ge0FycmF5PGFueT59IHJvd3NcclxuXHQgKiBAcGFyYW0ge251bWJlcn0gcm93SW5kZXhcclxuXHQgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBnZXRTY3JvbGxJbmRleChyb3dzOiBBcnJheTxhbnk+LCByb3dJbmRleDogbnVtYmVyKTogbnVtYmVye1xyXG5cdFx0bGV0IHNjcm9sbEluZGV4ID0gMDtcclxuXHRcdGZvcihsZXQgaT0wOyBpPCByb3dzLmxlbmd0aDsgaSsrKXtcclxuXHRcdFx0aWYocm93c1tpXS5pbmRleCA9PSByb3dJbmRleCl7XHJcblx0XHRcdFx0c2Nyb2xsSW5kZXgrK1xyXG5cdFx0XHRcdHJldHVybiBzY3JvbGxJbmRleDtcclxuXHRcdFx0fVxyXG5cdFx0XHQvKmlmKHJvd3NbaV0uaXRlbSBpbnN0YW5jZW9mIFNlcmllR3JvdXApe1xyXG5cdFx0XHRcdGlmKHRoaXMuaXNWaXNpYmxlU2VyaWVHcm91cE5vZGUocm93c1tpXSkgPT0gZmFsc2Upe1xyXG5cdFx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHNjcm9sbEluZGV4Kys7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSAqL2lmKHJvd3NbaV0uaXRlbSBpbnN0YW5jZW9mIFNlcmllQ29udGFpbmVyKXtcclxuXHRcdFx0XHRpZih0aGlzLmlzVmlzaWJsZVNlcmllR3JvdXBOb2RlKHJvd3NbaV0pID09IGZhbHNlKXtcclxuXHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRzY3JvbGxJbmRleCsrO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYocm93c1tpXS5pdGVtIGluc3RhbmNlb2YgU2VyaWVOb2RlKXtcclxuXHRcdFx0XHRpZih0aGlzLmlzVmlzaWJsZVNlcmllTm9kZShyb3dzW2ldKSA9PSBmYWxzZSl7XHJcblx0XHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0c2Nyb2xsSW5kZXgrKztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHNjcm9sbEluZGV4O1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBpc1Zpc2libGVTZXJpZUdyb3VwTm9kZShub2RlKTogYm9vbGVhbntcclxuXHRcdGlmKG5vZGUucGFyZW50SXRlbSAhPSBudWxsKXtcclxuXHRcdFx0aWYobm9kZS5wYXJlbnRJdGVtLmV4cGFuZFN0YXRlID09IGZhbHNlKXtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSBpZihub2RlLnBhcmVudEl0ZW0ucGFyZW50SXRlbSAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHRcdGlmKG5vZGUucGFyZW50SXRlbS5wYXJlbnRJdGVtLmV4cGFuZFN0YXRlID09IGZhbHNlKXtcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBpc1Zpc2libGVTZXJpZU5vZGUobm9kZSk6IGJvb2xlYW57XHJcblx0XHRpZihub2RlLnBhcmVudEl0ZW0uZXhwYW5kU3RhdGUgPT0gZmFsc2UgfHwgbm9kZS5wYXJlbnRJdGVtLnBhcmVudEl0ZW0uZXhwYW5kU3RhdGUgPT0gZmFsc2Upe1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmKG5vZGUucGFyZW50SXRlbS5wYXJlbnRJdGVtLnBhcmVudEl0ZW0gIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0aWYobm9kZS5wYXJlbnRJdGVtLnBhcmVudEl0ZW0ucGFyZW50SXRlbS5leHBhbmRTdGF0ZSA9PSBmYWxzZSl7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgdHJlZUdyaWROb2RlRXhwYW5kZWRPckNvbGxhcHNlZCgpe1xyXG4gICAgICAgIC8vIFJlZnJlc2ggdG8gc2VlIGNvcnJlY3QgZXhwYW5kZWQvY29sbGFwc2VkIGljb25cclxuICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgIH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgY29sdW1uIHRlbXBsYXRlIGluZm9ybWF0aW9uc1xyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gY29sdW1uSWRcclxuXHQgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBnZXRDb2x1bW5UZW1wbGF0ZURhdGEoY29sdW1uSWQ6IHN0cmluZykgOiBzdHJpbmd7XHJcblx0XHRpZihjb2x1bW5JZCA9PSBTaWduYWxNYW5hZ2VyV2lkZ2V0LmNvbG9yQ29sdW1uSWQpe1xyXG5cdFx0XHRyZXR1cm4gYDxzY3JpcHQgdHlwZT1cInRleHQveC1qc3JlbmRlclwiIGlkPVwic21Db2xvckNvbHVtblRlbXBsYXRlXCI+XHJcblx0XHRcdFx0XHRcdDxkaXYgc3R5bGU9J2hlaWdodDoyMHB4O3BhZGRpbmctbGVmdDo3cHg7cGFkZGluZy10b3A6NHB4OycgdW5zZWxlY3RhYmxlPSdvbic+XHJcblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz0nZS1jZWxsJyBzdHlsZT0nZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6MTdweDtoZWlnaHQ6MTdweDtiYWNrZ3JvdW5kLWNvbG9yOiB7ezojZGF0YVsnY29sb3InXX19OycgdW5zZWxlY3RhYmxlPSdvbic+PC9kaXY+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PC9zY3JpcHQ+YFxyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZihjb2x1bW5JZCA9PSBTaWduYWxNYW5hZ2VyV2lkZ2V0Lm5hbWVDb2x1bW5JZCl7XHJcblx0XHRcdHJldHVybiBgPHNjcmlwdCB0eXBlPVwidGV4dC94LWpzcmVuZGVyXCIgaWQ9XCJzbU5hbWVDb2x1bW5UZW1wbGF0ZVwiPlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IHN0eWxlPSdoZWlnaHQ6MjBweDsnIHVuc2VsZWN0YWJsZT0nb24nPlxyXG5cdFx0XHRcdFx0XHRcdHt7aWYgaGFzQ2hpbGRSZWNvcmRzfX1cclxuXHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9J2ludGVuZCcgc3R5bGU9J2hlaWdodDoxcHg7IGZsb2F0OmxlZnQ7IHdpZHRoOnt7OmxldmVsKjEwfX1weDsgZGlzcGxheTppbmxpbmUtYmxvY2s7Jz48L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHR7e2Vsc2UgIWhhc0NoaWxkUmVjb3Jkc319XHJcblx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPSdpbnRlbmQnIHN0eWxlPSdoZWlnaHQ6MXB4OyBmbG9hdDpsZWZ0OyB3aWR0aDp7ezpsZXZlbCoxMH19cHg7IGRpc3BsYXk6aW5saW5lLWJsb2NrOyc+PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0e3svaWZ9fVxyXG5cdFx0XHRcdFx0XHRcdHt7OiNkYXRhWydpY29uRGVmaW5pdGlvbiddfX1cclxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPSdlLWNlbGwnIHN0eWxlPSdkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDoxMDAlJyB1bnNlbGVjdGFibGU9J29uJz57ezojZGF0YVsnbmFtZSddfX08L2Rpdj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8L3NjcmlwdD5gO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIFwiXCI7XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIFJhaXNlcyB0aGUgc2VyaWVzIGRvdWJsZSBjbGljayBldmVudFxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNpZ25hbFxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBvblNlcmllc0RvdWJsZUNsaWNrZWQoc2VyaWVzOiBCYXNlU2VyaWVzKSB7XHJcblx0XHR0aGlzLmV2ZW50U2VyaWVEb3VibGVDbGlja2VkLnJhaXNlKHRoaXMsIHNlcmllcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSYWlzZXMgdGhlIGNoYW5nZSBzaXplIGV2ZW50XHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBzaXplXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIG9uQ2hhbmdlU2l6ZShzaXplOiBudW1iZXIpIHtcclxuXHRcdHRoaXMuZXZlbnRDaGFuZ2VTaXplLnJhaXNlKHRoaXMsIHNpemUpO1xyXG5cdH1cclxuXHJcbiAgICBkcm9wRm9jdXNMb3N0KGFyZ3M6IERyYWdEcm9wQXJncykge1xyXG4gICAgICAgIHRoaXMucmVzZXRIaWdobGlnaHRBcmVhKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IFNpZ25hbE1hbmFnZXJXaWRnZXQgfTsiXX0=