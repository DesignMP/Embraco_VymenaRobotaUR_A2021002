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
define(["require", "exports", "../common/treeGridWidgetBase", "../../models/common/signal/serieGroup", "./view/smTreeGridCellEditEvents", "./view/smTreeGridCellEditTemplate", "./view/signalManagerTreeGridToolbar", "../../common/fileProvider", "../../framework/events", "../../common/exportImportHelper", "../common/busyInformation", "../../models/signalManagerDataModel/signalCategory", "../../models/signalManagerDataModel/signalManagerCalculation", "../../models/common/signal/serieContainer", "../../models/common/signal/serieNode", "../common/interfaces/dropInterface", "../common/dragDataObject", "../../models/signalManagerDataModel/signalManagerCalculationInputData", "../../models/signalManagerDataModel/signalManagerCalculationOutputData", "../common/dragDropRepresentation", "../../models/signalManagerDataModel/signalManagerCalculatorType", "../../models/chartManagerDataModel/seriesType", "./helpers/exportHelper", "../common/alertDialog", "../../models/signalManagerDataModel/signalRoot", "./defaultComponentSettings", "../common/widgetBase", "../../common/persistence/persistDataProvider", "../../common/packageConversion/exportContainer", "../../common/packageConversion/mceConversionError", "./mceExportImportHelper"], function (require, exports, treeGridWidgetBase_1, serieGroup_1, smTreeGridCellEditEvents_1, smTreeGridCellEditTemplate_1, signalManagerTreeGridToolbar_1, fileProvider_1, events_1, exportImportHelper_1, busyInformation_1, signalCategory_1, signalManagerCalculation_1, serieContainer_1, serieNode_1, dropInterface_1, dragDataObject_1, signalManagerCalculationInputData_1, signalManagerCalculationOutputData_1, dragDropRepresentation_1, signalManagerCalculatorType_1, seriesType_1, exportHelper_1, alertDialog_1, signalRoot_1, defaultComponentSettings_1, widgetBase_1, persistDataProvider_1, exportContainer_1, mceConversionError_1, mceExportImportHelper_1) {
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
            _this._isFirstResize = true;
            _this._indexesDragged = [];
            _this._fileProvider = new fileProvider_1.FileProvider();
            _this._suppressRefresh = false;
            _this.editModeActive = false;
            _this._widthDifference = 450;
            _this._minWidth = 250;
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
        };
        SignalManagerWidget.prototype.initializeComponent = function () {
            this.component.defaultSettingsDataId = defaultComponentSettings_1.DefaultComponentSettings.WidgetDefinitionId;
        };
        SignalManagerWidget.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            this.initSignalManagerDataModel();
            this.initSeriesProvider();
            this.initChartManagerDataModel();
            this.refresh();
            _super.prototype.setHeaderContent.call(this, "Signals");
            // Set dynamic column settings
            _super.prototype.setDynamicColumn.call(this, 0, 40);
            // Initialize scrollbars positions
            var scrollbarSettings = this.component.getSetting(treeGridWidgetBase_1.TreeGridWidgetBase.ScrollbarsSettingsId);
            this.setScrollBarSettings(scrollbarSettings);
            // Add drag support
            _super.prototype.addDraggingSupport.call(this);
            // Add drop support
            _super.prototype.addSupportedDragDropDataId.call(this, dropInterface_1.DragDropDataId.signal);
        };
        SignalManagerWidget.prototype.dispose = function () {
            this.removeSupportedDragDropDataId(dropInterface_1.DragDropDataId.signal);
            _super.prototype.dispose.call(this);
        };
        /**
         * Returns the default component settings for this widget
         *
         * @returns {(ComponentSettings|undefined)}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.getDefaultComponentSettings = function () {
            return defaultComponentSettings_1.DefaultComponentSettings.getSignalManagerWidgetDefinition();
        };
        //#region drag support
        SignalManagerWidget.prototype.startDragging = function () {
            if (this._currentDragDropSeries != undefined) {
                var signalImage = void 0, signalName = void 0;
                var imageProvider = this.component.getSubComponent(defaultComponentSettings_1.DefaultComponentSettings.ImageProviderId);
                if (this._currentDragDropSeries.length == 1) {
                    // Default yt series svg
                    signalName = this._currentDragDropSeries[0].name;
                    if (imageProvider != undefined) {
                        signalImage = imageProvider.getImage("../app/widgets/common/style/images/dragDrop/ytSeries.svg");
                        if (this._currentDragDropSeries[0].type == seriesType_1.SeriesType.xySeries) {
                            // Use xy series svg
                            signalImage = imageProvider.getImage("../app/widgets/common/style/images/dragDrop/xySeries.svg");
                        }
                        else if (this._currentDragDropSeries[0].type == seriesType_1.SeriesType.fftSeries) {
                            // Use fft series svg
                            signalImage = imageProvider.getImage("../app/widgets/common/style/images/dragDrop/fftSeries.svg");
                        }
                        if (signalImage != undefined) {
                            // Replace serie color in svg with color of current serie
                            signalImage = signalImage.replace("stroke:#76bea6", "stroke:" + this._currentDragDropSeries[0].color);
                        }
                    }
                }
                else {
                    if (imageProvider != undefined) {
                        if (this._currentDragDropSeries[0].type == seriesType_1.SeriesType.xySeries) {
                            signalImage = imageProvider.getImage("../app/widgets/common/style/images/dragDrop/severalXYSeries.svg");
                        }
                        else if (this._currentDragDropSeries[0].type == seriesType_1.SeriesType.fftSeries) {
                            signalImage = imageProvider.getImage("../app/widgets/common/style/images/dragDrop/severalFFTSeries.svg");
                        }
                        else {
                            signalImage = imageProvider.getImage("../app/widgets/common/style/images/dragDrop/severalYTSeries.svg");
                        }
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
        SignalManagerWidget.prototype.initSignalManagerDataModel = function () {
            var dataModel = this.component.getSubComponent(defaultComponentSettings_1.DefaultComponentSettings.SignalManagerDataModelId);
            this.dataModel = dataModel;
        };
        SignalManagerWidget.prototype.initSeriesProvider = function () {
            this._seriesProvider = this.component.getSubComponent(defaultComponentSettings_1.DefaultComponentSettings.SeriesProviderId);
        };
        SignalManagerWidget.prototype.initChartManagerDataModel = function () {
            this._chartManagerDataModel = this.component.getSubComponent(defaultComponentSettings_1.DefaultComponentSettings.ChartManagerDataModelId);
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
            this.saveTreeGridSettings();
        };
        /**
         * Resizes the signal manager widget
         *
         * @param {number} width
         * @param {number} height
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.resize = function (width, height) {
            if (this._isFirstResize && this.editModeActive) {
                //Deactivate editMode and set correct width when widget is initialized
                this._isFirstResize = false;
                this.activateEditMode(false);
            }
            else {
                this._isFirstResize = false;
                _super.prototype.resize.call(this, width, height);
                this._toolbar.resize(width);
            }
        };
        /**
     * Sets the selection to the given series
     *
     * @private
     * @param {*} treeGridObject
     * @param {Array<number>} indexes
     * @memberof SignalManagerWidget
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
            this.saveTreeGridSettings();
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
                toolbarClick: function (args) {
                    _this.suppressRefresh(true);
                    _this._toolbar.toolbarClick(args, _this);
                    _this.suppressRefresh(false);
                    _this.refresh();
                }
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
                    this.onChangeSize(this._actualWidth + this._widthDifference);
                }
                else {
                    var newSize = this._actualWidth - this._widthDifference;
                    if (newSize < this._minWidth) {
                        newSize = this._minWidth;
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
            if (this._seriesProvider == undefined) {
                return undefined;
            }
            var calculation = new signalManagerCalculation_1.SignalManagerCalculation("Calculation", this._seriesProvider);
            this._serieContainerToSelectAfterRefresh = calculation;
            container.addSerieContainer(calculation, -1);
            return calculation;
        };
        SignalManagerWidget.prototype.getComponentSettings = function (onlyModified) {
            this.component.setSetting(widgetBase_1.WidgetBase.WidgetSettingId, this.getWidgetSettings());
            return _super.prototype.getComponentSettings.call(this, onlyModified);
        };
        SignalManagerWidget.prototype.setComponentSettings = function (data) {
            _super.prototype.setComponentSettings.call(this, data);
            this.setWidgetSettings(this.component.getSetting(widgetBase_1.WidgetBase.WidgetSettingId));
        };
        SignalManagerWidget.prototype.getWidgetSettings = function () {
            var settings = { "editModeActive": this.editModeActive,
                "width": this._actualWidth
            };
            return settings;
        };
        SignalManagerWidget.prototype.setWidgetSettings = function (data) {
            if (data == undefined) {
                return;
            }
            this.editModeActive = (data["editModeActive"]);
            this._actualWidth = data["width"];
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
            persistDataProvider_1.PersistDataProvider.getInstance().setDataWithId(this.component.id, this.getComponentSettings(true));
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
         * @param {ISerieNode | ISerieContainer} item
         * @param {string} signalCategoryId
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
         * @param {Map<string, string>} fileContents
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
        /**
         * Delete selected items
         *
         * @param {*} items
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.deleteItems = function (items) {
            this._suppressRefresh = true;
            for (var i = 0; i < items.length; i++) {
                this.deleteItem(items[i].item);
            }
            this._suppressRefresh = false;
            this.refresh();
        };
        /**
         * Delete a specific item
         *
         * @private
         * @param {*} item
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.deleteItem = function (item) {
            if (item.canDelete) {
                if (item instanceof serieContainer_1.SerieContainer) {
                    this.removeSerieContainer(item);
                }
                else {
                    this.removeSerieNode(item);
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
            this._fileProvider.uploadData(".csv, .mce, .mce1", true); // Only show/accept *.csv, *.mce, *.mce1 files
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
            var data;
            if (this._seriesProvider != undefined) {
                data = new exportImportHelper_1.ExportImportHelper(this._seriesProvider).exportTraceData(elements);
            }
            else {
                console.error("SeriesProvider is not available!");
            }
            if (data !== undefined) {
                var blob = new Blob([data], { type: "text/csv" });
                fileProvider_1.FileProvider.downloadData("TraceData.csv", blob);
            }
            this.setBusy(false);
        };
        /**
         * Exports the signal manager data(datamodel, series provider, ...)
         *
         * @private
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.exportData = function () {
            if (this._seriesProvider != undefined) { // SeriesProvider needed to export data
                try {
                    var components = this.getComponentsToExport();
                    var settingObjects = this.getSettingObjectsToExport();
                    var stringData = mceExportImportHelper_1.MceExportImportHelper.getExportData(components, settingObjects);
                    var blob = new Blob([stringData], { type: "text/html" });
                    fileProvider_1.FileProvider.downloadData("Export.mce1", blob);
                }
                catch (e) {
                    if (mceConversionError_1.MceConversionError.isMceConversionError(e)) {
                        console.error(e.toString());
                    }
                    else {
                        console.error(e);
                    }
                }
            }
            else {
                console.error("SeriesProvider for export not available!");
            }
            this.setBusy(false);
        };
        /**
         * Returns the components in a defined order which should be cleared before importing new setting
         *
         * @private
         * @returns {Array<IComponent>}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.getComponentsToClear = function () {
            var componentsToClear = new Array();
            componentsToClear.push(this.dataModel); // SignalManagerDataModel
            if (this._chartManagerDataModel != undefined) {
                componentsToClear.push(this._chartManagerDataModel); // ChartManagerDataModel
            }
            if (this._seriesProvider != undefined) {
                componentsToClear.push(this._seriesProvider); // SeriesProvider must be imported first
            }
            return componentsToClear;
        };
        /**
         * Returns the components which should be exported/imported from the mce file in the given order
         *
         * @private
         * @returns {Array<IComponent>}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.getComponentsToExport = function () {
            var exportComponents = new Array();
            if (this._seriesProvider != undefined) {
                exportComponents.push(this._seriesProvider); // SeriesProvider must be imported first
            }
            exportComponents.push(this.dataModel); // SignalManagerDataModel
            if (this._chartManagerDataModel != undefined) {
                exportComponents.push(this._chartManagerDataModel); // ChartManagerDataModel
            }
            return exportComponents;
        };
        /**
         * Returns all settings objects which should be exported
         *
         * @private
         * @returns {Array<ISettingsObject>}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.getSettingObjectsToExport = function () {
            var settingsObjects = new Array();
            // TODO: get cursorInfoStates without the use of cursorInfoWidget
            /*if(this.view != undefined){
                let cursorInfoWidget = this.view.getWidgetById("CursorInfoWidget");
                if (cursorInfoWidget != undefined) {
                    let cursorStates = cursorInfoWidget._cursorStates;
                    if(cursorStates != undefined){
                        settingsObjects.push(cursorStates);
                    }
                }
            }*/
            return settingsObjects;
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
                    if (_this._seriesProvider != undefined) {
                        var exportImportHelper = new exportImportHelper_1.ExportImportHelper(_this._seriesProvider);
                        var serieGroups = exportImportHelper.importTraceData(fileData, filename);
                        var signalFile_1 = new serieContainer_1.SerieContainer(filename);
                        //
                        _this.setContainerId(signalFile_1);
                        serieGroups.forEach(function (serieGroup) {
                            signalFile_1.addSerieContainer(serieGroup, -1);
                        });
                        _this._serieContainerToSelectAfterRefresh = signalFile_1;
                        _this._dataModel.addSerieContainer(signalFile_1, signalCategory_1.SignalCategory.CategoryIdImported);
                    }
                    else {
                        console.error("SeriesProvider is not available!");
                    }
                }
                else if (filename.toLowerCase().endsWith(".mce") || filename.toLowerCase().endsWith(".mce1")) {
                    try {
                        _this.importMCEFile(fileData);
                    }
                    catch (e) {
                        if (mceConversionError_1.MceConversionError.isMceConversionError(e)) {
                            console.error(e.toString());
                        }
                        else {
                            console.error(e);
                        }
                    }
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
                if (filename.toLowerCase().endsWith(".mce") || filename.toLowerCase().endsWith(".mce1")) {
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
        SignalManagerWidget.prototype.importMCEFile = function (fileData) {
            if (this._seriesProvider) { // serie provider needed to import data
                this.suppressRefresh(true);
                // Clear components with the given order
                var componentsToClear = this.getComponentsToClear();
                mceExportImportHelper_1.MceExportImportHelper.clearComponents(componentsToClear);
                // Set the import data to the components in the given order
                var exportContainer = exportContainer_1.ExportContainer.fromJson(fileData);
                var components = this.getComponentsToExport(); // Import and Export components are the same so we can use the export components array
                var settingObjects = this.getSettingObjectsToExport(); // Import and Export objects are the same so we can use the export settings object array
                mceExportImportHelper_1.MceExportImportHelper.setImportData(components, settingObjects, exportContainer);
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
                treeObject.scrollOffset(0, scrollOffset); // Use parent index to see the parent node in the view
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
        /**
         * Set unique id for imported data
         *
         * @private
         * @param {SerieContainer} serieContainer
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.setContainerId = function (serieContainer) {
            serieContainer.id = this.getUniqueId();
        };
        /**
         * Returns a unique id for the imported serieContainer
         *
         * @private
         * @returns
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.getUniqueId = function () {
            var importedDataIds = this.getImportedDataIds();
            for (var i = 0; i < Number.MAX_SAFE_INTEGER; i++) {
                var id = i.toString();
                if (importedDataIds.includes(id) == false) {
                    return id;
                }
            }
            console.error("No unique id for serieContainer available!");
            return "";
        };
        /**
         * Returns an array of all ids from the imported from file category
         *
         * @private
         * @returns {Array<string>}
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.getImportedDataIds = function () {
            var ids = [];
            var signalCategory = this._dataModel.getSignalCategory(signalCategory_1.SignalCategory.CategoryIdImported);
            signalCategory.getChilds().forEach(function (child) {
                ids.push(child.id);
            });
            return ids;
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
            //Persist data model (expandState)
            if (this._dataModel !== undefined) {
                this._dataModel.saveSettings();
            }
            this.saveTreeGridSettings();
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
         * @param {BaseSeries} series
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
        /**
         * Mouse is not over signalManager while dragging operation
         *
         * @param {DragDropArgs} args
         * @memberof SignalManagerWidget
         */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsTWFuYWdlcldpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9zaWduYWxNYW5hZ2VyV2lkZ2V0L3NpZ25hbE1hbmFnZXJXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBNkNBO1FBQXNDLDJDQUE0QztRQUFsRjs7UUFBb0YsQ0FBQztRQUFELDhCQUFDO0lBQUQsQ0FBQyxBQUFyRixDQUFzQyxtQkFBVSxHQUFxQztJQUFBLENBQUM7SUFDdEY7UUFBOEIsbUNBQXdDO1FBQXRFOztRQUF3RSxDQUFDO1FBQUQsc0JBQUM7SUFBRCxDQUFDLEFBQXpFLENBQThCLG1CQUFVLEdBQWlDO0lBQUEsQ0FBQztJQUUxRTtRQUFrQyx1Q0FBa0I7UUFBcEQ7WUFBQSxxRUF3dERDO1lBL3NEaUIsc0JBQWdCLEdBQUcsMkJBQTJCLENBQUM7WUFFL0MseUJBQW1CLEdBQUcsd0RBQXdELENBQUM7WUFDL0Usd0JBQWtCLEdBQUcsdUJBQXVCLENBQUM7WUFDN0MsNkJBQXVCLEdBQUcsaUJBQWlCLENBQUE7WUFDM0MsOEJBQXdCLEdBQUcsK0VBQStFLENBQUE7WUFDMUcsNkJBQXVCLEdBQUcsd0JBQXdCLENBQUM7WUFDbkQsOEJBQXdCLEdBQUcsZ0VBQWdFLENBQUM7WUFFckcsb0JBQWMsR0FBWSxJQUFJLENBQUM7WUFFL0IscUJBQWUsR0FBa0IsRUFBRSxDQUFDO1lBVXBDLG1CQUFhLEdBQUcsSUFBSSwyQkFBWSxFQUFFLENBQUM7WUFLbkMsc0JBQWdCLEdBQUcsS0FBSyxDQUFDO1lBQzFCLG9CQUFjLEdBQVksS0FBSyxDQUFDO1lBRS9CLHNCQUFnQixHQUFXLEdBQUcsQ0FBQztZQUM1QixlQUFTLEdBQVcsR0FBRyxDQUFDO1lBS25DLDZCQUF1QixHQUFHLElBQUksdUJBQXVC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QUFDLENBQUM7UUFDeEMsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0ksMkNBQWEsR0FBcEIsVUFBcUIsSUFBa0I7WUFDaEMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDOUIsQ0FBQztRQXJ0REoscUJBQXFCO1FBQ0UsZ0NBQVksR0FBRyxNQUFNLENBQUM7UUFDdEIsaUNBQWEsR0FBRyxPQUFPLENBQUM7UUFDeEIsdUNBQW1CLEdBQUcsYUFBYSxDQUFDO1FBQ3BDLGlDQUFhLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLDBDQUFzQixHQUFHLGdCQUFnQixDQUFDO1FBaXREbEUsMEJBQUM7S0FBQSxBQXh0REQsQ0FBa0MsdUNBQWtCLEdBd3REbkQ7SUFFUSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vbGlicy91aS9UeXBlcy9lai53ZWIuYWxsLmQudHNcIiAvPlxyXG5pbXBvcnQgeyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MsIElEYXRhTW9kZWwgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2RhdGFNb2RlbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUcmVlR3JpZFdpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL3RyZWVHcmlkV2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBTZXJpZUdyb3VwIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb21tb24vc2lnbmFsL3NlcmllR3JvdXBcIjtcclxuaW1wb3J0IHsgSVNpZ25hbE1hbmFnZXJEYXRhTW9kZWwsIElDaGFydE1hbmFnZXJEYXRhTW9kZWwgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2RhdGFNb2RlbHNcIjtcclxuaW1wb3J0IHsgU21UcmVlR3JpZENlbGxFZGl0RXZlbnRzIH0gZnJvbSBcIi4vdmlldy9zbVRyZWVHcmlkQ2VsbEVkaXRFdmVudHNcIjtcclxuaW1wb3J0IHsgU21UcmVlR3JpZENlbGxFZGl0VGVtcGxhdGUgfSBmcm9tIFwiLi92aWV3L3NtVHJlZUdyaWRDZWxsRWRpdFRlbXBsYXRlXCI7XHJcbmltcG9ydCB7IFNpZ25hbE1hbmFnZXJUcmVlR3JpZFRvb2xiYXIgfSBmcm9tIFwiLi92aWV3L3NpZ25hbE1hbmFnZXJUcmVlR3JpZFRvb2xiYXJcIjtcclxuaW1wb3J0IHsgRmlsZVByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9maWxlUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvZXZlbnRzXCI7XHJcbmltcG9ydCB7IEV4cG9ydEltcG9ydEhlbHBlciB9IGZyb20gXCIuLi8uLi9jb21tb24vZXhwb3J0SW1wb3J0SGVscGVyXCI7XHJcbmltcG9ydCB7IEJ1c3lJbmZvcm1hdGlvbiwgSW1hZ2VJZCB9IGZyb20gXCIuLi9jb21tb24vYnVzeUluZm9ybWF0aW9uXCI7XHJcbmltcG9ydCB7IElTaWduYWxNYW5hZ2VyV2lkZ2V0IH0gZnJvbSBcIi4uL3dpZGdldHNcIjtcclxuaW1wb3J0IHsgU2lnbmFsQ2F0ZWdvcnkgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvc2lnbmFsQ2F0ZWdvcnlcIjtcclxuaW1wb3J0IHsgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uIH0gZnJvbSBcIi4uLy4uL21vZGVscy9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsL3NpZ25hbE1hbmFnZXJDYWxjdWxhdGlvblwiO1xyXG5pbXBvcnQgeyBJU2VyaWVDb250YWluZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbW1vbi9pbnRlcmZhY2VzL3NlcmllQ29udGFpbmVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElTZXJpZU5vZGUgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbW1vbi9pbnRlcmZhY2VzL3NlcmllTm9kZUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTZXJpZUNvbnRhaW5lciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL3NpZ25hbC9zZXJpZUNvbnRhaW5lclwiO1xyXG5pbXBvcnQgeyBTZXJpZU5vZGUgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbW1vbi9zaWduYWwvc2VyaWVOb2RlXCI7XHJcbmltcG9ydCB7IERyYWdEcm9wRGF0YUlkLCBJRHJvcHBhYmxlIH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL2Ryb3BJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSURyYWdnYWJsZSB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy9kcmFnSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IERyYWdEcm9wRGF0YU9iamVjdCB9IGZyb20gXCIuLi9jb21tb24vZHJhZ0RhdGFPYmplY3RcIjtcclxuaW1wb3J0IHsgQmFzZVNlcmllcyB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2Jhc2VTZXJpZXNcIjtcclxuaW1wb3J0IHsgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhIH0gZnJvbSBcIi4uLy4uL21vZGVscy9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsL3NpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YVwiO1xyXG5pbXBvcnQgeyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25PdXRwdXREYXRhIH0gZnJvbSBcIi4uLy4uL21vZGVscy9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsL3NpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbk91dHB1dERhdGFcIjtcclxuaW1wb3J0IHsgRHJhZ0Ryb3BSZXByZXNlbnRhdGlvbiB9IGZyb20gXCIuLi9jb21tb24vZHJhZ0Ryb3BSZXByZXNlbnRhdGlvblwiO1xyXG5pbXBvcnQgeyBEcmFnRHJvcEFyZ3MgfSBmcm9tIFwiLi4vY29tbW9uL2RyYWdEcm9wQXJnc1wiO1xyXG5pbXBvcnQgeyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRvclR5cGUgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvc2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlXCI7XHJcbmltcG9ydCB7IFNlcmllc1R5cGUgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9zZXJpZXNUeXBlXCI7XHJcbmltcG9ydCB7IEV4cG9ydFNlcmllR3JvdXAgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2V4cG9ydFNlcmllR3JvdXBcIjtcclxuaW1wb3J0IHsgRXhwb3J0SGVscGVyIH0gZnJvbSBcIi4vaGVscGVycy9leHBvcnRIZWxwZXJcIjtcclxuaW1wb3J0IHsgQWxlcnREaWFsb2csIG1lc3NhZ2VCb3hUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi9hbGVydERpYWxvZ1wiO1xyXG5pbXBvcnQgeyBTaWduYWxSb290IH0gZnJvbSBcIi4uLy4uL21vZGVscy9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsL3NpZ25hbFJvb3RcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgRGVmYXVsdENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4vZGVmYXVsdENvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCB7IFdpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL3dpZGdldEJhc2VcIjtcclxuaW1wb3J0IHsgSVNlcmllc1Byb3ZpZGVyIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb21tb24vc2VyaWVzUHJvdmlkZXIvc2VyaWVzUHJvdmlkZXJJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSUltYWdlUHJvdmlkZXIgfSBmcm9tIFwiLi4vY29tbW9uL2ludGVyZmFjZXMvaW1hZ2VQcm92aWRlckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBQZXJzaXN0RGF0YVByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9wZXJzaXN0RGF0YVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IEV4cG9ydENvbnRhaW5lciB9IGZyb20gXCIuLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vZXhwb3J0Q29udGFpbmVyXCI7XHJcbmltcG9ydCB7IE1jZUNvbnZlcnNpb25FcnJvciB9IGZyb20gXCIuLi8uLi9jb21tb24vcGFja2FnZUNvbnZlcnNpb24vbWNlQ29udmVyc2lvbkVycm9yXCI7XHJcbmltcG9ydCB7IE1jZUV4cG9ydEltcG9ydEhlbHBlciB9IGZyb20gXCIuL21jZUV4cG9ydEltcG9ydEhlbHBlclwiO1xyXG5pbXBvcnQgeyBJQ29tcG9uZW50IH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2ludGVyZmFjZXMvY29tcG9uZW50SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElTZXR0aW5nc09iamVjdCB9IGZyb20gXCIuLi8uLi9jb21tb24vcGVyc2lzdGVuY2UvaW50ZXJmYWNlcy9zZXR0aW5nc09iamVjdEludGVyZmFjZVwiO1xyXG5cclxuY2xhc3MgRXZlbnRTZXJpZURvdWJsZUNsaWNrZWQgZXh0ZW5kcyBUeXBlZEV2ZW50PElTaWduYWxNYW5hZ2VyV2lkZ2V0LCBCYXNlU2VyaWVzPnsgfTtcclxuY2xhc3MgRXZlbnRDaGFuZ2VTaXplIGV4dGVuZHMgVHlwZWRFdmVudDxJU2lnbmFsTWFuYWdlcldpZGdldCwgbnVtYmVyPnsgfTtcclxuXHJcbmNsYXNzIFNpZ25hbE1hbmFnZXJXaWRnZXQgZXh0ZW5kcyBUcmVlR3JpZFdpZGdldEJhc2UgaW1wbGVtZW50cyBJU2lnbmFsTWFuYWdlcldpZGdldCwgSURyYWdnYWJsZSwgSURyb3BwYWJsZXtcclxuXHRcclxuXHQvLyBjb2x1bW4gZGVmaW5pdGlvbnNcclxuXHRwdWJsaWMgc3RhdGljIHJlYWRvbmx5IG5hbWVDb2x1bW5JZCA9IFwibmFtZVwiO1xyXG5cdHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgdmFsdWVDb2x1bW5JZCA9IFwidmFsdWVcIjtcclxuXHRwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGRlc2NyaXB0aW9uQ29sdW1uSWQgPSBcImRlc2NyaXB0aW9uXCI7XHJcblx0cHVibGljIHN0YXRpYyByZWFkb25seSBjb2xvckNvbHVtbklkID0gXCJjb2xvclwiO1xyXG5cdHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgaWNvbkRlZmluaXRpb25Db2x1bW5JZCA9IFwiaWNvbkRlZmluaXRpb25cIjtcclxuXHJcblx0cHJpdmF0ZSByZWFkb25seSBfaGlnaGxpZ2h0QXJlYUlkID0gXCJzaWduYWxNYW5hZ2VyX0hpZ2hsaWdodGVkXCI7XHJcblxyXG5cdHByaXZhdGUgcmVhZG9ubHkgX2RlbGV0ZUl0ZW1zQ29udGVudCA9IFwiVGhpcyBhY3Rpb24gd2lsbCBwZXJtYW5lbnRseSBkZWxldGUgc2VsZWN0ZWQgZWxlbWVudHMuXCI7XHJcblx0cHJpdmF0ZSByZWFkb25seSBfZGVsZXRlSXRlbXNIZWFkZXIgPSBcIkRlbGV0ZSByZWNvcmRlZCBkYXRhP1wiO1xyXG5cdHByaXZhdGUgcmVhZG9ubHkgX3dhcm5pbmdJbXBvcnRpbmdIZWFkZXIgPSBcIkltcG9ydCBjYW5jZWxlZFwiXHJcblx0cHJpdmF0ZSByZWFkb25seSBfd2FybmluZ0ltcG9ydGluZ0NvbnRlbnQgPSBcIkl0IGlzIG5vdCBwb3NzaWJsZSB0byBpbXBvcnQgb25lIC5tY2UgZmlsZSB3aXRoIG90aGVyIGZpbGVzIGF0IHRoZSBzYW1lIHRpbWUuXCIgXHJcblx0cHJpdmF0ZSByZWFkb25seSBfTUNFRmlsZXNJbXBvcnRlZEhlYWRlciA9IFwiRGVsZXRlIGFsbCB0cmFjZSBkYXRhP1wiO1xyXG5cdHByaXZhdGUgcmVhZG9ubHkgX01DRUZpbGVzSW1wb3J0ZWRDb250ZW50ID0gXCJEbyB5b3Ugd2FudCB0byBkZWxldGUgYWxsIHRyYWNlIGRhdGEgYW5kIGltcG9ydCB0aGUgLm1jZSBmaWxlP1wiO1xyXG5cclxuXHRwcml2YXRlIF9pc0ZpcnN0UmVzaXplOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcblx0cHJpdmF0ZSBfaW5kZXhlc0RyYWdnZWQ6IEFycmF5PG51bWJlcj4gPSBbXTtcclxuXHJcblx0cHJpdmF0ZSBfY3VycmVudERyYWdEcm9wU2VyaWVzPzogQXJyYXk8QmFzZVNlcmllcz47XHJcblxyXG5cdHByaXZhdGUgX2N1cnJlbnRDYWxjdWxhdG9yVHlwZT86IFNpZ25hbE1hbmFnZXJDYWxjdWxhdG9yVHlwZTtcclxuXHJcblx0cHJpdmF0ZSBfdG9vbGJhciE6IFNpZ25hbE1hbmFnZXJUcmVlR3JpZFRvb2xiYXI7XHJcblxyXG5cdHByaXZhdGUgX3NlcmllQ29udGFpbmVyVG9TZWxlY3RBZnRlclJlZnJlc2g6IElTZXJpZUNvbnRhaW5lcnx1bmRlZmluZWQ7XHJcblx0XHRcclxuXHRwcml2YXRlIF9maWxlUHJvdmlkZXIgPSBuZXcgRmlsZVByb3ZpZGVyKCk7XHJcblxyXG5cdHByaXZhdGUgX3Nlcmllc1Byb3ZpZGVyOiBJU2VyaWVzUHJvdmlkZXJ8dW5kZWZpbmVkO1xyXG5cclxuXHRwcml2YXRlIF9jaGFydE1hbmFnZXJEYXRhTW9kZWw6IElDaGFydE1hbmFnZXJEYXRhTW9kZWx8dW5kZWZpbmVkO1xyXG5cdHByaXZhdGUgX3N1cHByZXNzUmVmcmVzaCA9IGZhbHNlO1xyXG5cdHB1YmxpYyBlZGl0TW9kZUFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuXHRwcml2YXRlIF93aWR0aERpZmZlcmVuY2U6IG51bWJlciA9IDQ1MDtcclxuICAgIHByaXZhdGUgX21pbldpZHRoOiBudW1iZXIgPSAyNTA7XHJcblxyXG5cclxuXHRfY3VycmVudFRhcmdldDtcclxuXHJcblx0ZXZlbnRTZXJpZURvdWJsZUNsaWNrZWQgPSBuZXcgRXZlbnRTZXJpZURvdWJsZUNsaWNrZWQoKTtcclxuXHRcclxuXHRldmVudENoYW5nZVNpemUgPSBuZXcgRXZlbnRDaGFuZ2VTaXplKCk7XHJcblx0XHJcblx0cHJpdmF0ZSBfdXBsb2FkRGF0YUZpbmlzaGVkSGFuZGxlciA9IChzZW5kZXIsYXJncyk9PnRoaXMub25VcGxvYWREYXRhRmluaXNoZWQoc2VuZGVyLGFyZ3MpO1xyXG5cclxuXHQvKipcclxuXHQgKiBHZXRzIHRoZSBpbmZvcm1hdGlvbiBpZiB0aGUgYXV0byB1cGxvYWQgb2YgdHJhY2VkYXRhIGlzIGFjdGl2ZVxyXG5cdCAqXHJcblx0ICogQHJlYWRvbmx5XHJcblx0ICogQHR5cGUge2Jvb2xlYW59XHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRnZXQgYXV0b1VwbG9hZEFjdGl2ZSgpOmJvb2xlYW57XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG4gIFx0LyoqXHJcblx0ICogSW5pdGlhbGl6ZXMgdGhlIHNpZ25hbCBtYW5hZ2VyXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbGF5b3V0Q29udGFpbmVySWRcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdGluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQ6IHN0cmluZyl7XHJcblx0XHRzdXBlci5pbml0aWFsaXplKGxheW91dENvbnRhaW5lcklkLCAzMCk7XHJcblx0fVxyXG5cdFxyXG5cdGluaXRpYWxpemVDb21wb25lbnQoKXtcclxuXHRcdHRoaXMuY29tcG9uZW50LmRlZmF1bHRTZXR0aW5nc0RhdGFJZCA9IERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5XaWRnZXREZWZpbml0aW9uSWQ7XHJcblx0fVxyXG5cdFxyXG5cdGluaXRpYWxpemVkKCl7XHJcblx0XHRzdXBlci5pbml0aWFsaXplZCgpO1xyXG5cclxuXHRcdHRoaXMuaW5pdFNpZ25hbE1hbmFnZXJEYXRhTW9kZWwoKTtcclxuXHRcdHRoaXMuaW5pdFNlcmllc1Byb3ZpZGVyKCk7XHJcblx0XHR0aGlzLmluaXRDaGFydE1hbmFnZXJEYXRhTW9kZWwoKTsgXHJcblx0XHR0aGlzLnJlZnJlc2goKTtcclxuXHRcdFxyXG5cdFx0c3VwZXIuc2V0SGVhZGVyQ29udGVudChcIlNpZ25hbHNcIik7XHJcblxyXG5cdFx0Ly8gU2V0IGR5bmFtaWMgY29sdW1uIHNldHRpbmdzXHJcblx0XHRzdXBlci5zZXREeW5hbWljQ29sdW1uKDAsIDQwKTtcclxuXHJcblx0XHQvLyBJbml0aWFsaXplIHNjcm9sbGJhcnMgcG9zaXRpb25zXHJcblx0XHRsZXQgc2Nyb2xsYmFyU2V0dGluZ3MgPSB0aGlzLmNvbXBvbmVudC5nZXRTZXR0aW5nKFRyZWVHcmlkV2lkZ2V0QmFzZS5TY3JvbGxiYXJzU2V0dGluZ3NJZCk7XHJcblx0XHR0aGlzLnNldFNjcm9sbEJhclNldHRpbmdzKHNjcm9sbGJhclNldHRpbmdzKTtcclxuXHRcdFxyXG5cdFx0Ly8gQWRkIGRyYWcgc3VwcG9ydFxyXG5cdFx0c3VwZXIuYWRkRHJhZ2dpbmdTdXBwb3J0KCk7XHJcblx0XHRcclxuXHRcdC8vIEFkZCBkcm9wIHN1cHBvcnRcclxuXHRcdHN1cGVyLmFkZFN1cHBvcnRlZERyYWdEcm9wRGF0YUlkKERyYWdEcm9wRGF0YUlkLnNpZ25hbClcclxuXHR9XHJcblxyXG5cdGRpc3Bvc2UoKXtcclxuXHRcdHRoaXMucmVtb3ZlU3VwcG9ydGVkRHJhZ0Ryb3BEYXRhSWQoRHJhZ0Ryb3BEYXRhSWQuc2lnbmFsKTtcclxuXHRcdHN1cGVyLmRpc3Bvc2UoKTtcclxuXHR9XHJcblx0IFxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIGRlZmF1bHQgY29tcG9uZW50IHNldHRpbmdzIGZvciB0aGlzIHdpZGdldFxyXG5cdCAqXHJcblx0ICogQHJldHVybnMgeyhDb21wb25lbnRTZXR0aW5nc3x1bmRlZmluZWQpfVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0Z2V0RGVmYXVsdENvbXBvbmVudFNldHRpbmdzKCk6IENvbXBvbmVudFNldHRpbmdzfHVuZGVmaW5lZHtcclxuICAgICAgICByZXR1cm4gRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLmdldFNpZ25hbE1hbmFnZXJXaWRnZXREZWZpbml0aW9uKCk7XHJcblx0fVxyXG5cdFxyXG5cdC8vI3JlZ2lvbiBkcmFnIHN1cHBvcnRcclxuXHRzdGFydERyYWdnaW5nKCk6IERyYWdEcm9wRGF0YU9iamVjdHx1bmRlZmluZWR7XHJcblx0XHRpZih0aGlzLl9jdXJyZW50RHJhZ0Ryb3BTZXJpZXMgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0bGV0IHNpZ25hbEltYWdlLFxyXG5cdFx0XHRcdHNpZ25hbE5hbWU7XHJcblx0XHRcdFxyXG5cdFx0XHRsZXQgaW1hZ2VQcm92aWRlciA9IHRoaXMuY29tcG9uZW50LmdldFN1YkNvbXBvbmVudChEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuSW1hZ2VQcm92aWRlcklkKSBhcyBJSW1hZ2VQcm92aWRlcjtcclxuXHRcdFx0aWYgKHRoaXMuX2N1cnJlbnREcmFnRHJvcFNlcmllcy5sZW5ndGggPT0gMSkge1xyXG5cdFx0XHRcdC8vIERlZmF1bHQgeXQgc2VyaWVzIHN2Z1xyXG5cdFx0XHRcdHNpZ25hbE5hbWUgPSB0aGlzLl9jdXJyZW50RHJhZ0Ryb3BTZXJpZXNbMF0ubmFtZTtcclxuXHRcdFx0XHRpZihpbWFnZVByb3ZpZGVyICE9IHVuZGVmaW5lZCl7XHJcblx0XHRcdFx0XHRzaWduYWxJbWFnZSA9IGltYWdlUHJvdmlkZXIuZ2V0SW1hZ2UoXCIuLi9hcHAvd2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL2RyYWdEcm9wL3l0U2VyaWVzLnN2Z1wiKTtcclxuXHRcdFx0XHRcdGlmKHRoaXMuX2N1cnJlbnREcmFnRHJvcFNlcmllc1swXS50eXBlID09IFNlcmllc1R5cGUueHlTZXJpZXMpe1xyXG5cdFx0XHRcdFx0XHQvLyBVc2UgeHkgc2VyaWVzIHN2Z1xyXG5cdFx0XHRcdFx0XHRzaWduYWxJbWFnZSA9IGltYWdlUHJvdmlkZXIuZ2V0SW1hZ2UoXCIuLi9hcHAvd2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL2RyYWdEcm9wL3h5U2VyaWVzLnN2Z1wiKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGVsc2UgaWYodGhpcy5fY3VycmVudERyYWdEcm9wU2VyaWVzWzBdLnR5cGUgPT0gU2VyaWVzVHlwZS5mZnRTZXJpZXMpe1xyXG5cdFx0XHRcdFx0XHQvLyBVc2UgZmZ0IHNlcmllcyBzdmdcclxuXHRcdFx0XHRcdFx0c2lnbmFsSW1hZ2UgPSBpbWFnZVByb3ZpZGVyLmdldEltYWdlKFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9kcmFnRHJvcC9mZnRTZXJpZXMuc3ZnXCIpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0aWYoc2lnbmFsSW1hZ2UgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0XHRcdFx0Ly8gUmVwbGFjZSBzZXJpZSBjb2xvciBpbiBzdmcgd2l0aCBjb2xvciBvZiBjdXJyZW50IHNlcmllXHJcblx0XHRcdFx0XHRcdHNpZ25hbEltYWdlID0gc2lnbmFsSW1hZ2UucmVwbGFjZShcInN0cm9rZTojNzZiZWE2XCIsIFwic3Ryb2tlOlwiICsgdGhpcy5fY3VycmVudERyYWdEcm9wU2VyaWVzWzBdLmNvbG9yKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0aWYoaW1hZ2VQcm92aWRlciAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHRcdFx0aWYodGhpcy5fY3VycmVudERyYWdEcm9wU2VyaWVzWzBdLnR5cGUgPT0gU2VyaWVzVHlwZS54eVNlcmllcyl7XHJcblx0XHRcdFx0XHRcdHNpZ25hbEltYWdlID0gaW1hZ2VQcm92aWRlci5nZXRJbWFnZShcIi4uL2FwcC93aWRnZXRzL2NvbW1vbi9zdHlsZS9pbWFnZXMvZHJhZ0Ryb3Avc2V2ZXJhbFhZU2VyaWVzLnN2Z1wiKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGVsc2UgaWYodGhpcy5fY3VycmVudERyYWdEcm9wU2VyaWVzWzBdLnR5cGUgPT0gU2VyaWVzVHlwZS5mZnRTZXJpZXMpe1xyXG5cdFx0XHRcdFx0XHRzaWduYWxJbWFnZSA9IGltYWdlUHJvdmlkZXIuZ2V0SW1hZ2UoXCIuLi9hcHAvd2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL2RyYWdEcm9wL3NldmVyYWxGRlRTZXJpZXMuc3ZnXCIpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRcdHNpZ25hbEltYWdlID0gaW1hZ2VQcm92aWRlci5nZXRJbWFnZShcIi4uL2FwcC93aWRnZXRzL2NvbW1vbi9zdHlsZS9pbWFnZXMvZHJhZ0Ryb3Avc2V2ZXJhbFlUU2VyaWVzLnN2Z1wiKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0bGV0IGRyYWdEcm9wSWNvblJlcHJlc2VudGF0aW9uID0gbmV3IERyYWdEcm9wUmVwcmVzZW50YXRpb24oKTtcclxuXHRcdFx0ZHJhZ0Ryb3BJY29uUmVwcmVzZW50YXRpb24uaWNvbkxpc3QucHVzaChzaWduYWxJbWFnZSk7XHJcblx0XHRcdGRyYWdEcm9wSWNvblJlcHJlc2VudGF0aW9uLnRleHRMaXN0LnB1c2goc2lnbmFsTmFtZSk7XHJcblx0XHRcdHJldHVybiBuZXcgRHJhZ0Ryb3BEYXRhT2JqZWN0KERyYWdEcm9wRGF0YUlkLnNpZ25hbCwgdGhpcy5fY3VycmVudERyYWdEcm9wU2VyaWVzLCBkcmFnRHJvcEljb25SZXByZXNlbnRhdGlvbik7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xyXG5cdH1cclxuXHRcclxuXHRkcmFnZ2luZ1N0b3BwZWQoKXtcclxuXHRcdC8vIFJlc2V0IGN1cnJlbnQgZHJhZyBkcm9wIHNpZ25hbFxyXG5cdFx0dGhpcy5fY3VycmVudERyYWdEcm9wU2VyaWVzID0gdW5kZWZpbmVkO1xyXG5cdFx0dGhpcy5fY3VycmVudENhbGN1bGF0b3JUeXBlID0gdW5kZWZpbmVkO1xyXG5cdFx0dGhpcy5faW5kZXhlc0RyYWdnZWQgPSBbXTtcclxuXHR9XHJcblx0Ly8jZW5kcmVnaW9uXHJcblxyXG5cdC8vI3JlZ2lvbiBkcm9wIHN1cHBvcnRcclxuXHRwcml2YXRlIGFkZERyb3BMb2NhdGlvbnMoc2VyaWVzOiBBcnJheTxCYXNlU2VyaWVzPil7XHJcbiAgICAgICAgaWYgKHNlcmllc1swXS5wYXJlbnQgIT0gdW5kZWZpbmVkICYmIHNlcmllcy5sZW5ndGggPT0gMSkge1xyXG5cdFx0XHRzZXJpZXNbMF0ucGFyZW50LnZpc2libGVDaGlsZHMhLmZvckVhY2goY2hpbGQgPT4ge1xyXG5cdFx0XHRcdGlmKGNoaWxkIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uKXtcclxuXHRcdFx0XHRcdGNoaWxkLnNldERyb3BMb2NhdGlvbnModHJ1ZSwgc2VyaWVzWzBdKTtcclxuXHRcdFx0XHR9XHRcdFx0XHRcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHJlbW92ZURyb3BMb2NhdGlvbnMoc2VyaWVzOiBBcnJheTxCYXNlU2VyaWVzPil7XHJcblx0XHRpZiAoc2VyaWVzWzBdLnBhcmVudCAhPSB1bmRlZmluZWQgJiYgc2VyaWVzLmxlbmd0aCA9PSAxKSB7XHJcblx0XHRcdHNlcmllc1swXS5wYXJlbnQudmlzaWJsZUNoaWxkcyEuZm9yRWFjaChjaGlsZCA9PiB7XHJcblx0XHRcdFx0aWYoY2hpbGQgaW5zdGFuY2VvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb24pe1xyXG5cdFx0XHRcdFx0Y2hpbGQuc2V0RHJvcExvY2F0aW9ucyhmYWxzZSwgc2VyaWVzWzBdKTtcclxuXHRcdFx0XHR9XHRcdFx0XHRcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRkcmFnU3RhcnQoYXJnczogRHJhZ0Ryb3BBcmdzKSB7XHJcblx0XHRsZXQgc2VyaWVzID0gYXJncy5kYXRhIGFzIEFycmF5PEJhc2VTZXJpZXM+O1xyXG5cdFx0XHJcblx0XHQvLyBBZGQgcG9zc2libGUgZHJvcExvY2F0aW9uc1xyXG5cdFx0dGhpcy5hZGREcm9wTG9jYXRpb25zKHNlcmllcyk7XHJcblx0XHRcclxuXHRcdC8vIFVwZGF0ZSB0cmVlR3JpZFxyXG5cdFx0dGhpcy5yZWZyZXNoKCk7XHJcblxyXG5cdFx0bGV0IHRyZWVHcmlkT2JqID0gdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpO1xyXG5cdFx0dGhpcy51cGRhdGVTZXJpZVNlbGVjdGlvbih0cmVlR3JpZE9iaiwgdGhpcy5faW5kZXhlc0RyYWdnZWQpO1xyXG5cdH1cclxuXHJcblx0ZHJhZ1N0b3AoYXJnczogRHJhZ0Ryb3BBcmdzKSB7XHJcblx0XHRsZXQgc2VyaWVzID0gYXJncy5kYXRhIGFzIEFycmF5PEJhc2VTZXJpZXM+O1xyXG5cdFx0XHJcblx0XHQvLyBSZW1vdmUgcG9zc2libGUgZHJvcExvY2F0aW9uc1xyXG5cdFx0dGhpcy5yZW1vdmVEcm9wTG9jYXRpb25zKHNlcmllcyk7XHJcblxyXG5cdFx0Ly8gVXBkYXRlIHRyZWVHcmlkXHJcblx0XHR0aGlzLnJlZnJlc2goKTtcclxuXHRcdFxyXG5cdFx0bGV0IHRyZWVHcmlkT2JqID0gdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpO1xyXG5cdFx0dGhpcy51cGRhdGVTZXJpZVNlbGVjdGlvbih0cmVlR3JpZE9iaiwgdGhpcy5faW5kZXhlc0RyYWdnZWQpO1xyXG5cdH1cclxuXHJcblx0ZHJhZ092ZXIoYXJnczogRHJhZ0Ryb3BBcmdzKTogYm9vbGVhbiB7XHJcblx0XHRsZXQgY2FsY3VsYXRpb25JbnB1dEl0ZW0gPSAgdGhpcy5nZXRDYWxjdWxhdGlvbklucHV0RnJvbURyb3BMb2NhdGlvbihhcmdzLmN1cnJlbnRUYXJnZXQpO1xyXG5cdFx0XHJcblx0XHRpZihjYWxjdWxhdGlvbklucHV0SXRlbSAhPSB1bmRlZmluZWQgJiYgY2FsY3VsYXRpb25JbnB1dEl0ZW0uZHJvcFBvc3NpYmxlID09IHRydWUpe1xyXG5cdFx0XHR0aGlzLmFkZEhpZ2hsaWdodGVkQXJlYShhcmdzLmN1cnJlbnRUYXJnZXQpO1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR0aGlzLnJlc2V0SGlnaGxpZ2h0QXJlYSgpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0ZHJvcChhcmdzOiBEcmFnRHJvcEFyZ3MpIHtcclxuXHRcdGxldCBzZXJpZXMgPSBhcmdzLmRhdGFbMF0gYXMgQmFzZVNlcmllcztcclxuXHRcdGxldCBjYWxjdWxhdGlvbklucHV0VGFyZ2V0ID0gIHRoaXMuZ2V0Q2FsY3VsYXRpb25JbnB1dEZyb21Ecm9wTG9jYXRpb24oYXJncy5jdXJyZW50VGFyZ2V0KTtcclxuXHRcdGxldCBjYWxjdWxhdGlvbklucHV0RHJhZ2dlZEl0ZW0gPSB0aGlzLmdldENhbGN1bGF0aW9uSW5wdXREcmFnZ2VkKHNlcmllcyk7XHJcblxyXG5cdFx0aWYoY2FsY3VsYXRpb25JbnB1dFRhcmdldCAhPSB1bmRlZmluZWQgJiYgY2FsY3VsYXRpb25JbnB1dFRhcmdldC5kcm9wUG9zc2libGUgPT0gdHJ1ZSl7XHJcblx0XHRcdGlmKHNlcmllcyAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHRcdC8vRXhjaGFuZ2Ugb2Ygc2VyaWUgaWYgdGhlIGRyYWdnZWQgc2VyaWUgaXMgaW5zaWRlIHRoZSBjYWxjdWxhdG9yXHJcblx0XHRcdFx0aWYgKHRoaXMuX2N1cnJlbnRDYWxjdWxhdG9yVHlwZSA9PSBjYWxjdWxhdGlvbklucHV0VGFyZ2V0LnBhcmVudCAmJiBjYWxjdWxhdGlvbklucHV0RHJhZ2dlZEl0ZW0gIT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHRsZXQgb2xkVmFsdWUgPSBjYWxjdWxhdGlvbklucHV0VGFyZ2V0LnZhbHVlO1xyXG5cdFx0XHRcdFx0Y2FsY3VsYXRpb25JbnB1dERyYWdnZWRJdGVtIS52YWx1ZSA9IG9sZFZhbHVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRjYWxjdWxhdGlvbklucHV0VGFyZ2V0LnZhbHVlID0gc2VyaWVzLm5hbWU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgYSA8ZGl2PiBpbnRvIHRoZSBjZWxsIHdoZW4gZHJvcHBhYmxlIGlzIHBvc3NpYmxlIGFuZCBzaWduYWwgaXMgYmVpbmcgZHJhZ2dlZCBvdmVyXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7Kn0gY3VycmVudFRhcmdldFxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBhZGRIaWdobGlnaHRlZEFyZWEoY3VycmVudFRhcmdldCkge1xyXG5cdFx0bGV0IGhpZ2hsaWdodEVsZW0gPSAkKCc8ZGl2IGlkPVwiJysgdGhpcy5faGlnaGxpZ2h0QXJlYUlkICsnXCIgc3R5bGU9XCIgcG9pbnRlci1ldmVudHM6bm9uZTsgcG9zaXRpb246YWJzb2x1dGU7IFwiIGNsYXNzPVwiZHJhZ2dlZE92ZXJcIj48L2Rpdj4nKTtcclxuXHRcdHRoaXMucmVzZXRIaWdobGlnaHRBcmVhKGhpZ2hsaWdodEVsZW0pO1xyXG5cdFx0JChjdXJyZW50VGFyZ2V0KS5hcHBlbmQoaGlnaGxpZ2h0RWxlbSk7XHJcblxyXG5cdFx0aGlnaGxpZ2h0RWxlbS5vZmZzZXQoe3RvcDogJChjdXJyZW50VGFyZ2V0KS5vZmZzZXQoKSEudG9wLCBsZWZ0OiAkKGN1cnJlbnRUYXJnZXQpLm9mZnNldCgpIS5sZWZ0fSlcclxuXHRcdGhpZ2hsaWdodEVsZW0uY3NzKCdoZWlnaHQnLCBjdXJyZW50VGFyZ2V0Lm9mZnNldEhlaWdodCk7XHJcblx0XHRoaWdobGlnaHRFbGVtLmNzcygnd2lkdGgnLCBjdXJyZW50VGFyZ2V0Lm9mZnNldFdpZHRoKTtcclxuXHR9XHJcblxyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmUgYWxsIHNpZ25hbE1hbmFnZXIgaGlnaGxpZ2h0ZWQgYXJlYXMgKGV4Y2VwdCB0aGUgc2VsZWN0ZWQgb25lKVxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0ge0pRdWVyeTxIVE1MRWxlbWVudD59IFtlbGVtZW50XVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSByZXNldEhpZ2hsaWdodEFyZWEgKGVsZW1lbnQ/OiBKUXVlcnk8SFRNTEVsZW1lbnQ+KSB7XHJcblx0XHRsZXQgaGlnaGxpZ2h0RWxlbSA9ICQoJyMnICsgdGhpcy5faGlnaGxpZ2h0QXJlYUlkKTtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaGlnaGxpZ2h0RWxlbS5sZW5ndGg7IGkrKyl7XHJcblx0XHRcdGlmIChlbGVtZW50ID09IHVuZGVmaW5lZCB8fCBoaWdobGlnaHRFbGVtW2ldICE9IGVsZW1lbnRbMF0pIHtcclxuXHRcdFx0XHRoaWdobGlnaHRFbGVtW2ldLnJlbW92ZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGdldENhbGN1bGF0aW9uSW5wdXRGcm9tRHJvcExvY2F0aW9uKGN1cnJlbnRUYXJnZXQpOiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGF8dW5kZWZpbmVke1xyXG5cdFx0bGV0IHJlY29yZCA9IHRoaXMuZ2V0VHJlZVJlY29yZChjdXJyZW50VGFyZ2V0KTtcclxuICAgICAgICBpZihyZWNvcmQgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0aWYocmVjb3JkLml0ZW0gaW5zdGFuY2VvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGEgJiYgY3VycmVudFRhcmdldC5jbGFzc0xpc3QudmFsdWUuaW5jbHVkZXMoJ2Ryb3BMb2NhdGlvbkFyZWEnKSl7XHJcblx0XHRcdFx0cmV0dXJuIHJlY29yZC5pdGVtO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgZ2V0Q2FsY3VsYXRpb25JbnB1dERyYWdnZWQoc2VyaWU6IEJhc2VTZXJpZXMpOiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGEgfCB1bmRlZmluZWR7XHJcblx0XHRpZiAodGhpcy5fY3VycmVudENhbGN1bGF0b3JUeXBlICE9IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2N1cnJlbnRDYWxjdWxhdG9yVHlwZSEuZ2V0Q2hpbGRzKCkubGVuZ3RoOyBpKyspe1xyXG5cdFx0XHRcdGlmICh0aGlzLl9jdXJyZW50Q2FsY3VsYXRvclR5cGUhLmdldENoaWxkcygpW2ldLnNlcmllID09IHNlcmllKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fY3VycmVudENhbGN1bGF0b3JUeXBlIS5nZXRDaGlsZHMoKVtpXSBhcyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGE7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xyXG5cdH1cclxuXHJcblx0Ly8jZW5kcmVnaW9uXHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIGxheW91dCBvZiB0aGUgd2lkZ2V0XHJcblx0ICpcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdGNyZWF0ZUxheW91dCgpIHtcclxuXHRcdHZhciAkd2lkZ2V0Q29udGFpbmVyID0gJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCk7XHJcblx0XHQkd2lkZ2V0Q29udGFpbmVyWzBdLnN0eWxlLm92ZXJmbG93ID1cImhpZGRlblwiO1xyXG5cdFx0c3VwZXIuY3JlYXRlTGF5b3V0KCk7XHJcblx0fVxyXG5cclxuXHRpbml0U2lnbmFsTWFuYWdlckRhdGFNb2RlbCgpIHtcclxuXHRcdGxldCBkYXRhTW9kZWwgPSB0aGlzLmNvbXBvbmVudC5nZXRTdWJDb21wb25lbnQoRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLlNpZ25hbE1hbmFnZXJEYXRhTW9kZWxJZCkgYXMgSVNpZ25hbE1hbmFnZXJEYXRhTW9kZWw7XHJcblx0XHR0aGlzLmRhdGFNb2RlbCA9IGRhdGFNb2RlbCBhcyBJU2lnbmFsTWFuYWdlckRhdGFNb2RlbDtcclxuXHR9XHJcblxyXG5cdGluaXRTZXJpZXNQcm92aWRlcigpIHtcclxuXHRcdHRoaXMuX3Nlcmllc1Byb3ZpZGVyID0gdGhpcy5jb21wb25lbnQuZ2V0U3ViQ29tcG9uZW50KERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5TZXJpZXNQcm92aWRlcklkKSBhcyBJU2VyaWVzUHJvdmlkZXI7XHJcblx0fVxyXG5cclxuXHRpbml0Q2hhcnRNYW5hZ2VyRGF0YU1vZGVsKCkge1xyXG5cdFx0dGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsID0gdGhpcy5jb21wb25lbnQuZ2V0U3ViQ29tcG9uZW50KERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5DaGFydE1hbmFnZXJEYXRhTW9kZWxJZCkgYXMgSUNoYXJ0TWFuYWdlckRhdGFNb2RlbDtcclxuXHR9XHJcblx0XHJcblxyXG5cdC8qKlxyXG5cdCAqIEhhbmRsZXMgdGhlIG1vZGVsIGNoYW5nZXNcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7SURhdGFNb2RlbH0gc2VuZGVyXHJcblx0ICogQHBhcmFtIHtFdmVudE1vZGVsQ2hhbmdlZEFyZ3N9IGV2ZW50QXJnc1xyXG5cdCAqIEByZXR1cm5zIHsqfVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0aGFuZGxlTW9kZWxDaGFuZ2VkKHNlbmRlcjogSURhdGFNb2RlbCwgZXZlbnRBcmdzOiBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MpOiBhbnkge1xyXG5cdFx0dGhpcy5yZWZyZXNoKCk7XHJcblx0XHR0aGlzLnNhdmVUcmVlR3JpZFNldHRpbmdzKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXNpemVzIHRoZSBzaWduYWwgbWFuYWdlciB3aWRnZXRcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aFxyXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHJlc2l6ZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcil7XHJcblx0XHRpZiAodGhpcy5faXNGaXJzdFJlc2l6ZSAmJiB0aGlzLmVkaXRNb2RlQWN0aXZlKSB7XHJcblx0XHRcdC8vRGVhY3RpdmF0ZSBlZGl0TW9kZSBhbmQgc2V0IGNvcnJlY3Qgd2lkdGggd2hlbiB3aWRnZXQgaXMgaW5pdGlhbGl6ZWRcclxuXHRcdFx0dGhpcy5faXNGaXJzdFJlc2l6ZSA9IGZhbHNlO1xyXG5cdFx0XHR0aGlzLmFjdGl2YXRlRWRpdE1vZGUoZmFsc2UpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5faXNGaXJzdFJlc2l6ZSA9IGZhbHNlO1xyXG5cdFx0XHRzdXBlci5yZXNpemUod2lkdGgsIGhlaWdodCk7XHJcblx0XHRcdHRoaXMuX3Rvb2xiYXIucmVzaXplKHdpZHRoKTtcclxuXHRcdH1cclxuXHRcclxuXHR9XHJcblxyXG5cdCAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHNlbGVjdGlvbiB0byB0aGUgZ2l2ZW4gc2VyaWVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gdHJlZUdyaWRPYmplY3RcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gaW5kZXhlc1xyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVTZXJpZVNlbGVjdGlvbih0cmVlR3JpZE9iamVjdCwgaW5kZXhlczogQXJyYXk8bnVtYmVyPikge1xyXG4gICAgICAgIC8vIGRlc2VsZWN0IGFsbCBzZWxlY3Rpb25zIGluIHNpZ25hbCBwYW5lXHJcbiAgICAgICAgdHJlZUdyaWRPYmplY3QuY2xlYXJTZWxlY3Rpb24oKTtcclxuXHJcbiAgICAgICAgaWYoaW5kZXhlc1swXSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBpbmRleGVzLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICB0cmVlR3JpZE9iamVjdC5fbXVsdGlTZWxlY3RDdHJsUmVxdWVzdCA9IHRydWU7XHJcbiAgICAgICAgICAgIGxldCB2aXNpYmxlSW5kZXggPSAwO1xyXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgKDxhbnk+dHJlZUdyaWRPYmplY3QubW9kZWwpLmZsYXRSZWNvcmRzLmxlbmd0aDsgaisrKXtcclxuICAgICAgICAgICAgICAgIGlmKGogPT0gaW5kZXhlc1tpXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJlZUdyaWRPYmplY3Quc2VsZWN0Um93cyh2aXNpYmxlSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoKDxhbnk+dHJlZUdyaWRPYmplY3QubW9kZWwpLmZsYXRSZWNvcmRzW2pdLnZpc2libGUgIT0gXCJmYWxzZVwiKXtcclxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlSW5kZXgrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuXHRwdWJsaWMgc3VwcHJlc3NSZWZyZXNoKHN1cHByZXNzOiBib29sZWFuKXtcclxuXHRcdHRoaXMuX3N1cHByZXNzUmVmcmVzaCA9IHN1cHByZXNzO1xyXG5cdH1cclxuXHQvKipcclxuXHQgKiBSZWZyZXNoZXMgdGhlIHRyZWUgZ3JpZCBcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwdWJsaWMgYXN5bmMgcmVmcmVzaCgpe1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0aWYodGhpcy5fc3VwcHJlc3NSZWZyZXNoID09IGZhbHNlKXtcclxuXHRcdFx0XHR2YXIgdHJlZWdyaWRPYmogPSB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCk7XHJcblx0XHRcdFx0aWYgKCg8YW55PnRyZWVncmlkT2JqLm1vZGVsKS5pc0VkaXQgPT0gZmFsc2Upe1xyXG5cdFx0XHRcdFx0Ly9UbyByZWZyZXNoIFRyZWVHcmlkIHdpdGggbmV3IGRhdGFzb3VyY2VcclxuXHRcdFx0XHRcdHRoaXMuc2V0TW9kZWwodGhpcy5kYXRhTW9kZWwuZGF0YSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2V7XHJcblx0XHRcdFx0XHQvLyB0cmVlZ3JpZCBpcyBpbiBlZGl0IG1vZGUgPT4gcmVmcmVzaCB3b3VsZCBub3Qgd29yayA9PiB3YWl0IGZvciBlZGl0aW5nIGlzIGZpbmlzaGVkXHJcblx0XHRcdFx0XHRmb3IobGV0IGkgPTA7IGkgPCAxMDA7IGkrKyl7XHJcblx0XHRcdFx0XHRcdGF3YWl0IHRoaXMuc2xlZXAoMjAwKTtcclxuXHRcdFx0XHRcdFx0Ly8gaXMgZWRpdGluZyBhbHJlYWR5IGZpbmlzaGVkXHJcblx0XHRcdFx0XHRcdGlmICgoPGFueT50cmVlZ3JpZE9iai5tb2RlbCkuaXNFZGl0ID09IGZhbHNlKXtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLnNldE1vZGVsKHRoaXMuZGF0YU1vZGVsLmRhdGEpO1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cdFx0XHRcdFxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRjYXRjaChlKXtcclxuXHRcdFx0XHRcclxuXHRcdFx0Y29uc29sZS5pbmZvKFwiU2lnbmFsTWFuYWdlciByZWZyZXNoIGVycm9yISA9PiBUcmVlR3JpZCByZWNyZWF0aW9uIVwiKTtcclxuXHRcdFx0Y29uc29sZS5pbmZvKGUpO1xyXG5cdFx0XHRcclxuXHRcdFx0dGhpcy5jcmVhdGVUcmVlR3JpZCgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBzbGVlcChtczogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKSk7XHJcbiAgICB9XHJcblx0XHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgY29sdW1uIHRlbXBsYXRlcyBmb3IgdGhlIHRyZWUgZ3JpZCBhbmQgYWRkcyB0aGVtIHRvIHRoZSB3aWRnZXQgY29udGFpbmVyXHJcblx0ICpcclxuXHQgKiBAcHJvdGVjdGVkXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcm90ZWN0ZWQgY3JlYXRlQ29sdW1uVGVtcGxhdGVzKCl7XHJcblx0XHR2YXIgJHdpZGdldENvbnRhaW5lciA9ICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpO1xyXG5cdFx0JHdpZGdldENvbnRhaW5lci5hcHBlbmQodGhpcy5nZXRDb2x1bW5UZW1wbGF0ZURhdGEoU2lnbmFsTWFuYWdlcldpZGdldC5uYW1lQ29sdW1uSWQpKTtcclxuXHRcdCR3aWRnZXRDb250YWluZXIuYXBwZW5kKHRoaXMuZ2V0Q29sdW1uVGVtcGxhdGVEYXRhKFNpZ25hbE1hbmFnZXJXaWRnZXQuY29sb3JDb2x1bW5JZCkpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgdHJlZSBncmlkIGZvciB0aGUgc2lnbmFsIG1hbmFnZXJcclxuXHQgKlxyXG5cdCAqIEBwcm90ZWN0ZWRcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByb3RlY3RlZCBjcmVhdGVUcmVlR3JpZCgpe1xyXG5cdFx0KDxhbnk+JCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCkpLmVqVHJlZUdyaWQoe1xyXG5cdFx0XHQuLi50aGlzLmdldFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbigpLFxyXG5cdFx0XHQuLi50aGlzLmdldFRyZWVHcmlkQ29sdW1uUmVzaXplU3VwcG9ydCgpLFxyXG5cdFx0XHQuLi50aGlzLmdldFRyZWVHcmlkVG9vbGJhclN1cHBvcnQoKSxcdFxyXG5cdFx0XHQuLi50aGlzLmdldFRyZWVHcmlkQ2VsbEVkaXRTdXBwb3J0KCksXHJcblx0XHRcdC4uLnRoaXMuZ2V0VHJlZUdyaWREcmFnRHJvcFN1cHBvcnQoKSxcclxuXHRcdFxyXG5cdFx0XHRkYXRhU291cmNlOnRoaXMuZGF0YU1vZGVsLmRhdGEsXHJcblx0XHRcdGNoaWxkTWFwcGluZzpcInZpc2libGVDaGlsZHNcIixcclxuXHRcdFx0ZXhwYW5kU3RhdGVNYXBwaW5nOiBcImV4cGFuZFN0YXRlXCIsXHJcblx0XHRcdGFsbG93UmVvcmRlcmluZzogZmFsc2UsXHJcblx0XHRcdHJvd0hlaWdodDogMjgsXHJcblx0XHRcdHNlbGVjdGlvblNldHRpbmdzOntcclxuXHRcdFx0XHRzZWxlY3Rpb25UeXBlIDogJ211bHRpcGxlJyBcclxuXHRcdFx0fSxcclxuXHRcdFx0c2VsZWN0aW9uVHlwZTogJ211bHRpcGxlJyxcclxuXHRcdFx0ZXhwYW5kZWQ6IChhcmdzKSA9PiB0aGlzLnRyZWVHcmlkTm9kZUV4cGFuZGVkT3JDb2xsYXBzZWQoKSxcclxuXHRcdFx0Y29sbGFwc2VkOiAoYXJncykgPT4gdGhpcy50cmVlR3JpZE5vZGVFeHBhbmRlZE9yQ29sbGFwc2VkKCksXHJcblxyXG5cdFx0XHRyZWNvcmRDbGljazogKGFyZ3MpID0+IHRoaXMuY2xpY2soYXJncyksXHJcblx0XHRcdHJlY29yZERvdWJsZUNsaWNrOiAoYXJncykgPT4gdGhpcy5kb3VibGVDbGljayhhcmdzKSxcclxuXHRcdFx0cm93U2VsZWN0ZWQ6IChhcmdzKSA9PiB0aGlzLnJvd1NlbGVjdGVkKGFyZ3MuZGF0YS5pdGVtLCBhcmdzLm1vZGVsLmN1cnJlbnRWaWV3RGF0YSksXHJcblx0XHRcdGNyZWF0ZTogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWRDcmVhdGVkKCksXHJcblx0XHRcdGFjdGlvbkJlZ2luOiAoYXJncykgPT4gdGhpcy50cmVlR3JpZEFjdGlvbkJlZ2luKGFyZ3MpLFxyXG5cdFx0XHRhY3Rpb25Db21wbGV0ZTogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWRBY3Rpb25Db21wbGV0ZShhcmdzKSxcclxuXHRcdFx0cXVlcnlDZWxsSW5mbzogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWRRdWVyeUNlbGxJbmZvKGFyZ3MpLFxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCBjb2x1bW4gZGVmaW5pdGlvblxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcmV0dXJucyB7e319XHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIGdldFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbigpOiB7fXtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGNvbHVtbnM6IFtcclxuXHRcdFx0XHR7IGZpZWxkOiBTaWduYWxNYW5hZ2VyV2lkZ2V0Lm5hbWVDb2x1bW5JZCwgaGVhZGVyVGV4dDogXCJOYW1lXCIsIHdpZHRoOiBcIjM1MXB4XCIgLCBpc1RlbXBsYXRlQ29sdW1uOiB0cnVlLCB0ZW1wbGF0ZUlEOiBcInNtTmFtZUNvbHVtblRlbXBsYXRlXCJ9LFxyXG5cdFx0XHRcdHsgZmllbGQ6IFNpZ25hbE1hbmFnZXJXaWRnZXQudmFsdWVDb2x1bW5JZCwgaGVhZGVyVGV4dDogXCJWYWx1ZVwiLCB2aXNpYmxlOiB0aGlzLmVkaXRNb2RlQWN0aXZlLCB3aWR0aDogXCIzMDBweFwiLCBlZGl0VGVtcGxhdGU6IFNtVHJlZUdyaWRDZWxsRWRpdFRlbXBsYXRlLmNyZWF0ZUluc3RhbmNlKCksIGlzVGVtcGxhdGVDb2x1bW46IHRydWV9LFxyXG5cdFx0XHRcdHsgZmllbGQ6IFNpZ25hbE1hbmFnZXJXaWRnZXQuZGVzY3JpcHRpb25Db2x1bW5JZCwgaGVhZGVyVGV4dDogXCJEZXNjcmlwdGlvblwiLCB2aXNpYmxlOiB0aGlzLmVkaXRNb2RlQWN0aXZlLCB3aWR0aDogXCIxMDBweFwiIH0sXHJcblx0XHRcdFx0eyBmaWVsZDogU2lnbmFsTWFuYWdlcldpZGdldC5jb2xvckNvbHVtbklkLCBoZWFkZXJUZXh0OiBcIkNvbG9yXCIsIHdpZHRoOiBcIjUwcHhcIiwgdmlzaWJsZTogdGhpcy5lZGl0TW9kZUFjdGl2ZSwgZWRpdFR5cGU6IFwiRGF0ZVBpY2tlclwiLCBlZGl0VGVtcGxhdGU6IFNtVHJlZUdyaWRDZWxsRWRpdFRlbXBsYXRlLmNyZWF0ZUluc3RhbmNlKCksIGlzVGVtcGxhdGVDb2x1bW46IHRydWUsIHRlbXBsYXRlSUQ6IFwic21Db2xvckNvbHVtblRlbXBsYXRlXCJ9LFxyXG5cdFx0XHRcdHsgZmllbGQ6IFNpZ25hbE1hbmFnZXJXaWRnZXQuaWNvbkRlZmluaXRpb25Db2x1bW5JZCwgdmlzaWJsZTogZmFsc2UsIHdpZHRoOiBcIjBweFwiIH0sXHJcblx0XHRcdF0sXHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgdHJlZSBncmlkIGNvbHVtbiByZXNpemUgc2V0dGluZ3NcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHJldHVybnMge3t9fVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBnZXRUcmVlR3JpZENvbHVtblJlc2l6ZVN1cHBvcnQoKToge317XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRhbGxvd0NvbHVtblJlc2l6ZTogdHJ1ZSxcclxuXHRcdFx0Y29sdW1uUmVzaXplU2V0dGluZ3M6IHsgY29sdW1uUmVzaXplTW9kZTogZWouVHJlZUdyaWQuQ29sdW1uUmVzaXplTW9kZS5GaXhlZENvbHVtbnNcdH0sXHJcblx0XHRcdGNvbHVtblJlc2l6ZWQ6IChhcmdzKSA9PiB0aGlzLnRyZWVHcmlkQ29sdW1uUmVzaXplZChhcmdzKSxcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHQvKipcclxuICAgICAqIEEgdHJlZWdyaWQgY29sdW1uIHdhcyByZXNpemVkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB0cmVlR3JpZENvbHVtblJlc2l6ZWQoYXJncyl7XHJcblx0XHRzdXBlci5yZXNpemVEeW5hbWljQ29sdW1uKGFyZ3MuY29sdW1uSW5kZXgsIGFyZ3MubW9kZWwpO1xyXG5cdFx0dGhpcy5zYXZlVHJlZUdyaWRTZXR0aW5ncygpO1xyXG4gICAgfVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgdG9vbGJhciBzZXR0aW5nc1xyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcmV0dXJucyB7e319XHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIGdldFRyZWVHcmlkVG9vbGJhclN1cHBvcnQoKToge317XHJcblx0XHR0aGlzLl90b29sYmFyID0gbmV3IFNpZ25hbE1hbmFnZXJUcmVlR3JpZFRvb2xiYXIodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpO1x0XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdHRvb2xiYXJTZXR0aW5nczoge1xyXG5cdFx0XHRcdFx0c2hvd1Rvb2xiYXI6IHRydWUsXHJcblx0XHRcdFx0XHRjdXN0b21Ub29sYmFySXRlbXM6IHRoaXMuX3Rvb2xiYXIuZ2V0Q3VzdG9tVG9vbGJhcnMoKVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0dG9vbGJhckNsaWNrOiAoYXJncykgPT4ge1xyXG5cdFx0XHRcdFx0dGhpcy5zdXBwcmVzc1JlZnJlc2godHJ1ZSk7XHJcblx0XHRcdFx0XHR0aGlzLl90b29sYmFyLnRvb2xiYXJDbGljayhhcmdzLCB0aGlzKTtcclxuXHRcdFx0XHRcdHRoaXMuc3VwcHJlc3NSZWZyZXNoKGZhbHNlKTtcclxuXHRcdFx0XHRcdHRoaXMucmVmcmVzaCgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCBjZWxsIGVkaXQgc2V0dGluZ3NcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHJldHVybnMge3t9fVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBnZXRUcmVlR3JpZENlbGxFZGl0U3VwcG9ydCgpOiB7fXtcclxuXHRcdHZhciBjZWxsRWRpdEV2ZW50cyA9IG5ldyBTbVRyZWVHcmlkQ2VsbEVkaXRFdmVudHMoKTtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGVkaXRTZXR0aW5nczoge1x0YWxsb3dFZGl0aW5nOiB0cnVlIH0sXHJcblx0XHRcdGJlZ2luRWRpdDogKGFyZ3MpID0+IGNlbGxFZGl0RXZlbnRzLmJlZ2luRWRpdChhcmdzLCB0aGlzKSxcclxuXHRcdFx0ZW5kRWRpdDogKGFyZ3MpID0+IGNlbGxFZGl0RXZlbnRzLmVuZEVkaXQoYXJncywgdGhpcyksXHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWN0aXZhdGVzIHRoZSBzaWduYWwgbWFuYWdlciBkcmFnIGFuZCBkcm9wIHN1cHBvcnRcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHJldHVybnMge3t9fVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBnZXRUcmVlR3JpZERyYWdEcm9wU3VwcG9ydCgpOiB7fXtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGFsbG93RHJhZ0FuZERyb3AgOiB0cnVlLFxyXG5cdFx0XHRyb3dEcmFnU3RhcnQ6IChhcmdzKSA9PiB0aGlzLnJvd0RyYWdTdGFydChhcmdzKSxcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBXaWxsIGJlIGNhbGxlZCBhZnRlciB0aGUgdHJlZSBncmlkIHdhcyBjcmVhdGVkOyB0b29sYmFyIHN0eWxlcyBhbmQgc3RhdGVzIHdpbGwgYmUgc2V0XHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSB0cmVlR3JpZENyZWF0ZWQoKXtcclxuXHRcdC8vIFNldHMgdGhlIGN1c3RvbSB0b29sYmFyIGljb25zXHJcblx0XHR0aGlzLl90b29sYmFyLnNldFN0eWxlRm9yVG9vbGJhckljb25zKCk7XHJcblxyXG5cdFx0Ly8gQXQgdGhlIGJlZ2lubmluZyB0aGUgZXhwb3J0L2RlbGV0ZS9pbnNlcnQgY2FsY3VsYXRpb24gYnV0dG9uIGlzIGRpc2FibGVkIGJlY2F1c2Ugbm8gc2VsZWN0aW9uIGlzIGF2YWlsYWJsZVxyXG5cdFx0dGhpcy5fdG9vbGJhci5kaXNhYmxlRXhwb3J0QnV0dG9uKHRydWUpO1xyXG5cdFx0dGhpcy5fdG9vbGJhci5kaXNhYmxlRGVsZXRlQnV0dG9uKHRydWUpO1xyXG5cdFx0dGhpcy5fdG9vbGJhci5kaXNhYmxlSW5zZXJ0Q2FsY3VsYXRpb25CdXR0b24odHJ1ZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTd2l0Y2ggaW50byBcImVkaXQgbW9kZVwiIG9yIFwibm9ybWFsIG1vZGVcIlxyXG5cdCAqIGlmIGVkaXQgbW9kZSBpcyBhY3RpdmUsIHRoZSBlZGl0IG1vZGUgd2lsbCBiZSBzZXQgdG8gdGhlIGRhdGFtb2RlbCwgYW5kIHRoZSB3aWRnZXQgc2l6ZSB3aWxsIGJlIGluY3JlYXNlZFxyXG5cdCAqIGlmIG5vcm1hbCBtb2RlIGlzIGFjdGl2ZSwgdGhlIG5vcm1hbCBtb2RlIHdpbGwgYmUgc2V0IHRvIHRoZSBkYXRhbW9kZWwsIGFuZCB0aGUgd2lkZ2V0IHNpemUgd2lsbCBiZSBkZWNyZWFzZWRcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHtib29sZWFufSBhY3RpdmVcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgc2V0RWRpdE1vZGUoYWN0aXZlOmJvb2xlYW4pe1xyXG5cdFx0aWYodGhpcy5lZGl0TW9kZUFjdGl2ZSAhPSBhY3RpdmUpe1xyXG5cdFx0XHRpZihhY3RpdmUgPT0gdHJ1ZSl7XHJcblx0XHRcdFx0dGhpcy5vbkNoYW5nZVNpemUodGhpcy5fYWN0dWFsV2lkdGggKyB0aGlzLl93aWR0aERpZmZlcmVuY2UpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2V7XHJcblx0XHRcdFx0bGV0IG5ld1NpemUgPSB0aGlzLl9hY3R1YWxXaWR0aCAtIHRoaXMuX3dpZHRoRGlmZmVyZW5jZTtcclxuXHRcdFx0XHRpZihuZXdTaXplIDwgdGhpcy5fbWluV2lkdGgpe1xyXG5cdFx0XHRcdFx0bmV3U2l6ZSA9IHRoaXMuX21pbldpZHRoO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR0aGlzLm9uQ2hhbmdlU2l6ZShuZXdTaXplKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0dGhpcy5lZGl0TW9kZUFjdGl2ZSA9IGFjdGl2ZTtcclxuXHRcdCh0aGlzLmRhdGFNb2RlbCBhcyBJU2lnbmFsTWFuYWdlckRhdGFNb2RlbCkuZWRpdE1vZGVBY3RpdmUgPSB0aGlzLmVkaXRNb2RlQWN0aXZlO1xyXG5cdFx0aWYodGhpcy5fdG9vbGJhciAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHR0aGlzLl90b29sYmFyLmFjdGl2YXRlRWRpdE1vZGVCdXR0b24odGhpcy5lZGl0TW9kZUFjdGl2ZSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBXZWxsIGJlIGNhbGxlZCBhZnRlciBzb21lIHRyZWUgZ3JpZCBhY3Rpb24gd2FzIHN0YXJ0ZWRcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHsqfSBhcmdzXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIHRyZWVHcmlkQWN0aW9uQmVnaW4oYXJncyl7XHJcblx0XHQvLyBTdXBwb3J0IFwiRW50Zi9EZWxcIiBrZXlcclxuXHRcdGlmKGFyZ3MucmVxdWVzdFR5cGUgPT0gXCJkZWxldGVcIil7XHJcblx0XHRcdGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuXHRcdFx0aWYgKHRoaXMuY29udGFpbnNJdGVtV2l0aGluUmVjZW50T3JVcGxvYWRlZChhcmdzLmRlbGV0ZWRJdGVtcykpIHtcclxuXHRcdFx0XHR0aGlzLnNob3dNZXNzYWdlQm94Rm9yRGVsZXRpbmdJdGVtKGFyZ3MuZGVsZXRlZEl0ZW1zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVsZXRlSXRlbXMoYXJncy5kZWxldGVkSXRlbXMpO1xyXG4gICAgICAgICAgICB9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQgICAgLyoqXHJcbiAgICAgKiBMb2FkcyB0aGUgc3R5bGVzIGZvciB0aGUgY2hhcnQgbWFuYWdlciB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGxvYWRTdHlsZXMoKSB7XHJcbiAgICAgICAgc3VwZXIubG9hZFN0eWxlcygpO1xyXG4gICAgICAgIHN1cGVyLmFkZFN0eWxlKFwid2lkZ2V0cy9jb21tb24vc3R5bGUvY3NzL2Ryb3BEb3duTWVudVN0eWxlLmNzc1wiKTtcclxuICAgIH1cclxuXHJcblx0LyoqXHJcblx0ICogV2VsbCBiZSBjYWxsZWQgYWZ0ZXIgc29tZSB0cmVlIGdyaWQgYWN0aW9uIHdhcyBjb21wbGV0ZWRcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHsqfSBhcmdzXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIHRyZWVHcmlkQWN0aW9uQ29tcGxldGUoYXJncyl7IFxyXG5cdFx0Ly8gRXZlbnQgdHJpZ2dlciB3aGlsZSBjaGFuZ2luZyBkYXRhc291cmNlIGR5bmFtaWNhbGx5LiBcclxuXHRcdC8vIGNvZGUgdG8gZG9uZSBhZnRlciB0aGUgZHluYW1pYyBjaGFuZ2Ugb2YgZGF0YXNvdXJjZS4gXHJcblx0XHRpZiAoYXJncy5yZXF1ZXN0VHlwZSA9PT0gJ3JlZnJlc2hEYXRhU291cmNlJykgeyBcclxuXHRcdFx0dGhpcy5yZWZyZXNoU2VsZWN0aW9uKCk7XHJcblx0XHRcdGlmKHRoaXMuX3NlcmllQ29udGFpbmVyVG9TZWxlY3RBZnRlclJlZnJlc2ggIT0gdW5kZWZpbmVkKXtcdFx0XHRcdFxyXG5cdFx0XHRcdC8vIFNlbGVjdHMgdGhlIGltcG9ydGVkIHNpZ25hbGZpbGUsIG9yIHRoZSBpbnNlcnRlZCBjYWxjdWxhdGlvbiwgLi4uXHJcblx0XHRcdFx0dGhpcy5zZWxlY3RJdGVtKHRoaXMuX3NlcmllQ29udGFpbmVyVG9TZWxlY3RBZnRlclJlZnJlc2gpO1xyXG5cdFx0XHRcdHRoaXMuX3NlcmllQ29udGFpbmVyVG9TZWxlY3RBZnRlclJlZnJlc2ggPSB1bmRlZmluZWQ7XHJcblx0XHRcdH1cclxuXHRcdH0gXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBXaWxsIGJlIGNhbGxlZCB0byB1cGRhdGUgdGhlIHN0eWxlIG9mIHRoZSBnaXZlIGNlbGwgaWYgYSByZWZyZXNoIHdpbGwgYmUgbmVlZGVkXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7Kn0gYXJnc1xyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSB0cmVlR3JpZFF1ZXJ5Q2VsbEluZm8oYXJncyl7XHJcblx0XHRpZiAoYXJncy5jb2x1bW4uZmllbGQgPT0gXCJuYW1lXCIpe1xyXG5cdFx0XHRpZih0aGlzLmlzR3JvdXBJdGVtKGFyZ3MuZGF0YS5pdGVtKSkge1xyXG5cdFx0XHRcdC8vIFNob3cgZ3JvdXAgbm9kZXMgYWx3YXlzIGJvbGQgPT4gYWxzbyBpZiB0aGV5IGhhdmUgbm8gY2hpbGRzXHJcblx0XHRcdFx0aWYoYXJncy5jZWxsRWxlbWVudC5zdHlsZSAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHRcdFx0aWYoYXJncy5kYXRhLmxldmVsID09IDApe1xyXG5cdFx0XHRcdFx0XHRhcmdzLmNlbGxFbGVtZW50LnN0eWxlLmZvbnRXZWlnaHQgPSBcIjgwMFwiOyAvLyA3MDAgd291bGQgYmUgYm9sZFxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0ZWxzZXtcclxuXHRcdFx0XHRcdFx0YXJncy5jZWxsRWxlbWVudC5zdHlsZS5mb250V2VpZ2h0ID0gXCI2NTBcIjtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0Ly8gU2hvdyBhbGwgbm9kZXMgcmVkIHdoaWNoIGhhdmUgaW52YWxpZCBzaWduYWxzIGluIGl0IFxyXG5cdFx0XHRpZih0aGlzLmlzSXRlbUludmFsaWQoYXJncy5kYXRhLml0ZW0pID09IHRydWUpe1xyXG5cdFx0XHRcdGlmKGFyZ3MuY2VsbEVsZW1lbnQuc3R5bGUgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0XHRcdGFyZ3MuY2VsbEVsZW1lbnQuc3R5bGUuY29sb3IgPSBcInJlZFwiO1xyXG5cdFx0XHRcdFx0YXJncy5jZWxsRWxlbWVudC5zdHlsZS5mb250V2VpZ2h0ID0gXCJib2xkXCI7XHJcblx0XHRcdFx0XHQvL2FyZ3MuY2VsbEVsZW1lbnQuaW5uZXJUZXh0ID0gYXJncy5jZWxsRWxlbWVudC5pbm5lclRleHQgKyBcIihpbnZhbGlkKVwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSBcclxuXHRcdGVsc2UgaWYgKGFyZ3MuY29sdW1uLmZpZWxkID09IFwidmFsdWVcIil7XHJcblx0XHRcdGlmKGFyZ3MuZGF0YS5kcm9wUG9zc2libGUgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICBhcmdzLmNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJkcm9wTG9jYXRpb25BcmVhXCIpO1xyXG5cdFx0XHR9XHJcblx0XHR9ICAgICAgXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBIYXMgdGhlIGdpdmVuIGl0ZW0gc29tZSBkYXRhIGFuZCBpcyB0aGlzIGRhdGEgdmFsaWQgXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7Kn0gaXRlbVxyXG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBpc0l0ZW1JbnZhbGlkKGl0ZW0pOiBib29sZWFue1xyXG5cdFx0aWYoaXRlbSBpbnN0YW5jZW9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbil7XHJcblx0XHRcdGxldCBjYWxjdWxhdGVkU2lnbmFscyA9IGl0ZW0uZ2V0U2VyaWVzKCk7XHJcblx0XHRcdC8vIGNoZWNrIGlmIGEgY2FsY3VsYXRlZCBvdXRwdXQgc2lnbmFsIGlzIGludmFsaWRcclxuXHRcdFx0Zm9yKGxldCBpID0gMDsgaSA8IGNhbGN1bGF0ZWRTaWduYWxzLmxlbmd0aDsgaSsrKXtcclxuXHRcdFx0XHRpZihjYWxjdWxhdGVkU2lnbmFsc1tpXS5yYXdQb2ludHNWYWxpZCA9PSBmYWxzZSl7XHJcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGVsc2UgaWYoaXRlbSBpbnN0YW5jZW9mIFNlcmllTm9kZSApe1xyXG5cdFx0XHRpZihpdGVtLnNlcmllICE9IHVuZGVmaW5lZCAmJiBpdGVtLnNlcmllLnJhd1BvaW50c1ZhbGlkID09IGZhbHNlKXtcclxuXHRcdFx0XHRpZihpdGVtIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uT3V0cHV0RGF0YSl7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNle1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEEgZHJhZyBhbmQgZHJvcCBvcGVyYXRpb24gd2FzIHN0YXJ0ZWRcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHsqfSBhcmdzXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIHJvd0RyYWdTdGFydChhcmdzKXtcclxuXHRcdHRoaXMuX2luZGV4ZXNEcmFnZ2VkID0gW107XHJcblx0XHRcclxuXHRcdGxldCBzZWxlY3RlZEVsZW1lbnRzID0gdGhpcy5jaGVja1NlbGVjdGVkRWxlbWVudHMoYXJncy5kcmFnZ2VkUmVjb3JkcywgYXJncy5kcmFnZ2VkUm93KTtcclxuXHRcdGlmIChzZWxlY3RlZEVsZW1lbnRzLmxlbmd0aCA+IDAgKSB7XHJcblx0XHRcdHRoaXMuX2N1cnJlbnREcmFnRHJvcFNlcmllcyA9IHNlbGVjdGVkRWxlbWVudHM7XHJcblx0XHRcdCAvLyBTZXQgY3VycmVudCBkcmFnIGRyb3Agc2lnbmFsXHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGhpcy5fY3VycmVudERyYWdEcm9wU2VyaWVzID0gdW5kZWZpbmVkOyAvLyBSZXNldCBjdXJyZW50IGRyYWcgZHJvcCBzaWduYWxcclxuXHRcdH1cclxuXHRcdGFyZ3MuZHJhZ2dlZFJlY29yZHMgPSBbXTtcclxuXHRcdGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgcmVmcmVzaFNlbGVjdGlvbigpe1xyXG5cdFx0Y29uc3QgdHJlZU9iaiA9ICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpLmVqVHJlZUdyaWQoJ2luc3RhbmNlJyk7IFxyXG5cdFx0XHRcdFx0XHRcclxuXHRcdC8vIEdldCBhY3R1YWwgc2VsZWN0aW9uIGluZGV4XHJcblx0XHRsZXQgYWN0dWFsU2VsZWN0ZWRSb3dJbmRleCA9IHRyZWVPYmoubW9kZWwuc2VsZWN0ZWRSb3dJbmRleDtcclxuXHRcdC8vIFJlc2V0IHNlbGVjdGlvblxyXG5cdFx0dHJlZU9iai5tb2RlbC5zZWxlY3RlZFJvd0luZGV4ID0gLTE7XHJcblx0XHRcclxuXHRcdC8vIFNldCB0byBsYXN0IGluZGV4IGlmIGluZGV4IGlzIG91dCBvZiByYW5nZVxyXG5cdFx0aWYoYWN0dWFsU2VsZWN0ZWRSb3dJbmRleCA+PSB0cmVlT2JqLm1vZGVsLmZsYXRSZWNvcmRzLmxlbmd0aCl7XHJcblx0XHRcdGFjdHVhbFNlbGVjdGVkUm93SW5kZXggPSB0cmVlT2JqLm1vZGVsLmZsYXRSZWNvcmRzLmxlbmd0aC0xO1xyXG5cdFx0fVxyXG5cdFx0Ly8gU2V0IHNlbGVjdGlvblxyXG5cdFx0dHJlZU9iai5tb2RlbC5zZWxlY3RlZFJvd0luZGV4ID0gYWN0dWFsU2VsZWN0ZWRSb3dJbmRleDtcclxuXHRcdFxyXG5cdFx0bGV0IGFyZUVsZW1lbnRzRXhwb3J0YWJsZSA9IHRoaXMuY2FuSXRlbXNCZUV4cG9ydGVkKHRyZWVPYmoubW9kZWwuZmxhdFJlY29yZHMpO1xyXG5cclxuXHRcdC8vIHVwZGF0ZSB0b29sYmFyIGJ1dHRvbnNcclxuXHRcdGlmKHRyZWVPYmoubW9kZWwuZmxhdFJlY29yZHNbYWN0dWFsU2VsZWN0ZWRSb3dJbmRleF0gIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0dGhpcy51cGRhdGVUb29sYmFyQnV0dG9uU3RhdGVzKHRyZWVPYmoubW9kZWwuZmxhdFJlY29yZHNbYWN0dWFsU2VsZWN0ZWRSb3dJbmRleF0uaXRlbSwgYXJlRWxlbWVudHNFeHBvcnRhYmxlKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMudXBkYXRlVG9vbGJhckJ1dHRvblN0YXRlcyh1bmRlZmluZWQsIGFyZUVsZW1lbnRzRXhwb3J0YWJsZSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHJvd1NlbGVjdGVkKGl0ZW06IGFueSwgY3VycmVudFZpZXdEYXRhKXtcclxuXHRcdGxldCBhcmVFbGVtZW50c0V4cG9ydGFibGUgPSB0aGlzLmNhbkl0ZW1zQmVFeHBvcnRlZChjdXJyZW50Vmlld0RhdGEpO1xyXG5cdFx0dGhpcy51cGRhdGVUb29sYmFyQnV0dG9uU3RhdGVzKGl0ZW0sIGFyZUVsZW1lbnRzRXhwb3J0YWJsZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiB1cGRhdGVzIHRoZSB0b29sYmFyIGJ1dHRvbnMoZS5nLiBpbnNlcnQgY2FsdWxhdGlvbiBvbmx5IGVuYWJsZWQgb24gU2VyaWVHcm91cCBvciB1bmRlciBcIkNhbGN1bGF0ZWQgc2lnbmFsc1wiIGNhdGVnb3J5KVxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0ge0lTZXJpZU5vZGV9IGl0ZW1cclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgdXBkYXRlVG9vbGJhckJ1dHRvblN0YXRlcyhpdGVtOiBJU2VyaWVOb2RlIHwgdW5kZWZpbmVkLCBhcmVFbGVtZW50c0V4cG9ydGFibGU6IGJvb2xlYW4pe1xyXG5cdFx0aWYgKGl0ZW0gPT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0dGhpcy5fdG9vbGJhci5kaXNhYmxlSW5zZXJ0Q2FsY3VsYXRpb25CdXR0b24odHJ1ZSk7XHJcblx0XHRcdHRoaXMuX3Rvb2xiYXIuZGlzYWJsZURlbGV0ZUJ1dHRvbih0cnVlKTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHQvLyBzZXQgZGVsZXRlIGJ1dHRvbiBzdGF0ZVxyXG5cdFx0XHR0aGlzLl90b29sYmFyLmRpc2FibGVEZWxldGVCdXR0b24oIWl0ZW0uY2FuRGVsZXRlKTtcclxuXHJcblx0XHRcdGlmKGl0ZW0gaW5zdGFuY2VvZiBTZXJpZUdyb3VwKXtcclxuXHRcdFx0XHR0aGlzLl90b29sYmFyLmRpc2FibGVFeHBvcnRCdXR0b24oZmFsc2UpO1xyXG5cdFx0XHRcdHRoaXMuX3Rvb2xiYXIuZGlzYWJsZUluc2VydENhbGN1bGF0aW9uQnV0dG9uKGZhbHNlKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNle1xyXG5cdFx0XHRcdGlmKGl0ZW0uZ2V0U2VyaWVHcm91cCgpID09IHVuZGVmaW5lZCl7XHJcblx0XHRcdFx0XHR0aGlzLl90b29sYmFyLmRpc2FibGVJbnNlcnRDYWxjdWxhdGlvbkJ1dHRvbih0cnVlKTtcclxuXHRcdFx0XHRcdHRoaXMuX3Rvb2xiYXIuZGlzYWJsZUV4cG9ydEJ1dHRvbih0cnVlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSBpZihpdGVtIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlICYmIGl0ZW0ubmFtZSA9PSAnQWxnb3JpdGhtJyB8fCBpdGVtIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhICYmIGl0ZW0uc2VyaWUgPT0gdW5kZWZpbmVkIHx8XHJcblx0XHRcdFx0KChpdGVtIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uIHx8IGl0ZW0gaW5zdGFuY2VvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25PdXRwdXREYXRhKSAmJiAoaXRlbS5zZXJpZSA9PSB1bmRlZmluZWQgfHwgaXRlbS5zZXJpZSEucmF3UG9pbnRzVmFsaWQgPT0gZmFsc2UpKSl7XHJcblx0XHRcdFx0XHR0aGlzLl90b29sYmFyLmRpc2FibGVJbnNlcnRDYWxjdWxhdGlvbkJ1dHRvbihmYWxzZSk7XHJcblx0XHRcdFx0XHR0aGlzLl90b29sYmFyLmRpc2FibGVFeHBvcnRCdXR0b24odHJ1ZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2V7XHJcblx0XHRcdFx0XHR0aGlzLl90b29sYmFyLmRpc2FibGVFeHBvcnRCdXR0b24oZmFsc2UpO1xyXG5cdFx0XHRcdFx0dGhpcy5fdG9vbGJhci5kaXNhYmxlSW5zZXJ0Q2FsY3VsYXRpb25CdXR0b24oZmFsc2UpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVx0XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGFyZUVsZW1lbnRzRXhwb3J0YWJsZSkge1xyXG5cdFx0XHR0aGlzLl90b29sYmFyLmRpc2FibGVFeHBvcnRCdXR0b24oZmFsc2UpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHRoaXMuX3Rvb2xiYXIuZGlzYWJsZUV4cG9ydEJ1dHRvbih0cnVlKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBjYW5JdGVtc0JlRXhwb3J0ZWQoaXRlbXMpOiBib29sZWFuIHtcclxuXHRcdGxldCBjYW5CZUV4cG9ydGVkID0gZmFsc2U7XHJcblx0XHRsZXQgZXhwb3J0SGVscGVyID0gbmV3IEV4cG9ydEhlbHBlcigpO1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZiAoZXhwb3J0SGVscGVyLmlzRWxlbWVudEV4cG9ydGFibGUoaXRlbXNbaV0uaXRlbSkgPT09IHRydWUpIHtcclxuXHRcdFx0XHRjYW5CZUV4cG9ydGVkID0gdHJ1ZTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGNhbkJlRXhwb3J0ZWQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBIGNsaWNrIG9uIHRoZSB0cmVlIGdyaWQgKG5lZWRlZCBmb3IgcmVzZXRpbmcgdGhlIGN1cnJlbnQgZHJhZyBkcm9wIHNpZ25hbClcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHsqfSBhcmdzXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIGNsaWNrKGFyZ3Mpe1xyXG5cdFx0Ly8gUmVzZXQgY3VycmVudCBkcmFnIGRyb3Agc2lnbmFsIGFmdGVyIGNsaWNrIHdhcyBmaW5pc2hlZChjbGljayB1cClcclxuXHRcdHRoaXMuX2N1cnJlbnREcmFnRHJvcFNlcmllcyA9IHVuZGVmaW5lZDtcclxuXHRcdHRoaXMuZm9jdXMoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEEgZG91YmxlIGNsaWNrIG9uIHRoZSB0cmVlIGdyaWQgd2FzIGRvbmVcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHsqfSBhcmdzXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIGRvdWJsZUNsaWNrKGFyZ3Mpe1xyXG5cdFx0aWYoYXJncy5jZWxsSW5kZXggPT0gMCl7XHJcblx0XHRcdGxldCBzZXJpZU5vZGUgPSBhcmdzLmRhdGEuaXRlbTtcclxuXHRcdFx0bGV0IGZvdW5kU2VyaWVzID0gdGhpcy5nZXRTZXJpZXNGcm9tSXRlbShzZXJpZU5vZGUpO1xyXG5cdFx0XHRpZihmb3VuZFNlcmllcy5sZW5ndGggPiAwKXtcclxuXHRcdFx0XHQvLyBPbmx5IG9uZSBzZXJpZSBjYW4gYmUgYWRkZWQgYnkgZG91YmxlIGNsaWNrIGN1cnJlbnRseShUT0RPOiBhZGQgbXVsdGkgaW5zZXJ0KVxyXG5cdFx0XHRcdHRoaXMub25TZXJpZXNEb3VibGVDbGlja2VkKGZvdW5kU2VyaWVzWzBdKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgYWxsIGVsZW1lbnRzIHNlbGVjdGVkIGFyZSBzZXJpZXMgYW5kIG9mIHRoZSBzYW1lIHR5cGVcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHsqfSBlbGVtZW50c1xyXG5cdCAqIEBwYXJhbSB7Kn0gZHJhZ2dlZFJvd1xyXG5cdCAqIEByZXR1cm5zIHtBcnJheTxCYXNlU2VyaWVzPn1cclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgY2hlY2tTZWxlY3RlZEVsZW1lbnRzKGVsZW1lbnRzLCBkcmFnZ2VkUm93KTpBcnJheTxCYXNlU2VyaWVzPiB7XHJcblx0XHRsZXQgc2VyaWVzID0gbmV3IEFycmF5PEJhc2VTZXJpZXM+KCk7XHJcblx0XHRsZXQgaXRlbXMgPSBuZXcgQXJyYXk8YW55PigpO1xyXG5cdFx0bGV0IGRyYWdnZWRSb3dJc1NlbGVjdGVkID0gZmFsc2U7XHJcblx0XHRsZXQgaW52YWxpZFNlbGVjdGlvbiA9IGZhbHNlO1xyXG5cclxuXHRcdGlmIChkcmFnZ2VkUm93ID09IHVuZGVmaW5lZCB8fCBkcmFnZ2VkUm93LnNlcmllID09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm4gW107XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHR5cGUgPSBkcmFnZ2VkUm93LnNlcmllLnR5cGU7XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSA9IGkgKyAxKXtcclxuXHRcdFx0aWYgKGVsZW1lbnRzW2ldLnNlcmllID09IHVuZGVmaW5lZCB8fCBlbGVtZW50c1tpXS5zZXJpZS50eXBlICE9IHR5cGUpIHtcclxuXHRcdFx0XHRpbnZhbGlkU2VsZWN0aW9uID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoZWxlbWVudHNbaV0gPT0gZHJhZ2dlZFJvdykge1xyXG5cdFx0XHRcdGRyYWdnZWRSb3dJc1NlbGVjdGVkID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRzZXJpZXMucHVzaChlbGVtZW50c1tpXS5zZXJpZSk7XHJcblx0XHRcdGl0ZW1zLnB1c2goZWxlbWVudHNbaV0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChkcmFnZ2VkUm93Lml0ZW0gaW5zdGFuY2VvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGEpe1xyXG5cdFx0XHR0aGlzLl9jdXJyZW50Q2FsY3VsYXRvclR5cGUgPSBkcmFnZ2VkUm93LnBhcmVudDtcclxuXHRcdH1cclxuXHJcblx0XHQvL09uY2UgYWxsIGVsZW1lbnRzIGhhdmUgYmVlbiBjaGVja2VkLCBzZWxlY3QgY29ycmVjdCBlbGVtZW50cyBhY2NvcmRpbmcgdG8gdGhlIGV4Y2VwdGlvbnNcclxuXHRcdGlmICghZHJhZ2dlZFJvd0lzU2VsZWN0ZWQpIHtcclxuXHRcdFx0c2VyaWVzID0gW107XHJcblx0XHRcdHNlcmllcy5wdXNoKGRyYWdnZWRSb3cuc2VyaWUpO1xyXG5cdFx0XHR0aGlzLl9pbmRleGVzRHJhZ2dlZCA9IFtdO1xyXG5cdFx0XHR0aGlzLl9pbmRleGVzRHJhZ2dlZC5wdXNoKGRyYWdnZWRSb3cuaW5kZXgpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZihpbnZhbGlkU2VsZWN0aW9uKSB7XHJcblx0XHRcdHJldHVybiBbXTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRzZXJpZXMgPSB0aGlzLmRlbGV0ZUVxdWFsU2lnbmFscyhzZXJpZXMsIGl0ZW1zKTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0cmV0dXJuIHNlcmllcztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERlbGV0ZSBkdXBsaWNhdGVkIHNpZ25hbHMgZnJvbSB0aGUgZHJhZyZkcm9wIGFycmF5XHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7QXJyYXk8QmFzZVNlcmllcz59IHNlcmllc1xyXG5cdCAqIEBwYXJhbSB7Kn0gZWxlbWVudHNcclxuXHQgKiBAcmV0dXJuc1xyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBkZWxldGVFcXVhbFNpZ25hbHMoc2VyaWVzOiBBcnJheTxCYXNlU2VyaWVzPiwgZWxlbWVudHMpIHtcclxuXHRcdGZvcihsZXQgaSA9IDA7IGkgPCBzZXJpZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYgKGVsZW1lbnRzW2ldLml0ZW0gaW5zdGFuY2VvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGEpe1xyXG5cdFx0XHRcdGxldCBzZWxlY3RlZEl0ZW1zID0gT2JqZWN0LmFzc2lnbihbXSwgc2VyaWVzKTtcclxuXHRcdFx0XHRzZWxlY3RlZEl0ZW1zLnNwbGljZShpLCAxKTtcclxuXHRcdFx0XHRpZiAoc2VsZWN0ZWRJdGVtcy5pbmNsdWRlcyhzZXJpZXNbaV0pKXtcclxuXHRcdFx0XHRcdHNlcmllcy5zcGxpY2UoaSwgMSk7XHJcblx0XHRcdFx0XHRlbGVtZW50cy5zcGxpY2UoaSwgMSk7XHJcblx0XHRcdFx0XHRpID0gLTE7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHRoaXMuX2luZGV4ZXNEcmFnZ2VkLnB1c2goZWxlbWVudHNbaV0uaW5kZXgpO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRyZXR1cm4gc2VyaWVzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyBhbGwgc2VyaWVzIHdoaWNoIHdlcmUgZm91bmQgaW4gdGhlIHNlcmllIG5vZGUgaXRlbShlLmcuIGEgbm9ybWFsIHNlcmllIG9yIGNhbGN1bGF0ZWQgc2VyaWVzKVxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0geyp9IGl0ZW1cclxuXHQgKiBAcmV0dXJucyB7QXJyYXk8QmFzZVNlcmllcz59XHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIGdldFNlcmllc0Zyb21JdGVtKGl0ZW0pOiBBcnJheTxCYXNlU2VyaWVzPntcclxuXHRcdGxldCBzaWduYWxzID0gbmV3IEFycmF5PEJhc2VTZXJpZXM+KCk7XHJcblx0XHRpZihpdGVtIGluc3RhbmNlb2YgU2VyaWVOb2RlICYmIGl0ZW0uc2VyaWUgIT0gdW5kZWZpbmVkKXsgLy8gSXMgU2lnbmFsIG5vZGVcclxuXHRcdFx0c2lnbmFscy5wdXNoKGl0ZW0uc2VyaWUpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZihpdGVtIGluc3RhbmNlb2YgU2VyaWVDb250YWluZXIpeyAvLyBpcyBjYWxjdWxhdGlvbihncm91cCBub2RlKSB3aXRoIHNpZ25hbHNcclxuXHRcdFx0cmV0dXJuIGl0ZW0uZ2V0U2VyaWVzKCk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gc2lnbmFscztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIElzIHRoZSBnaXZlbiBpdGVtIGEgZ3JvdXAgaXRlbSAoZS5nLiBuZWVkZWQgZm9yIHNldHRpbmcgdGhlIGZvbnQgc3R5bGUgdG8gYm9sZClcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHtJU2VyaWVDb250YWluZXJ9IGl0ZW1cclxuXHQgKiBAcmV0dXJuc1xyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBpc0dyb3VwSXRlbShpdGVtOiBJU2VyaWVDb250YWluZXIpOiBib29sZWFue1xyXG5cdFx0aWYoaXRlbSA9PSB1bmRlZmluZWQpe1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRpZihpdGVtLnZpc2libGVDaGlsZHMgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHRpbnNlcnRDYWxjdWxhdGlvbihpdGVtKTogU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9ufHVuZGVmaW5lZHtcclxuXHRcdGlmKGl0ZW0gPT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0dmFyIHNlbGVjdGVkSXRlbSA9IGl0ZW0uaXRlbTtcclxuXHRcdHZhciBzZXJpZUdyb3VwO1xyXG5cdFx0aWYoc2VsZWN0ZWRJdGVtIGluc3RhbmNlb2YgU2VyaWVHcm91cCB8fCBzZWxlY3RlZEl0ZW0gaW5zdGFuY2VvZiBTaWduYWxDYXRlZ29yeSl7XHJcblx0XHRcdC8vIENhbGN1bGF0aW9uIGNhbiBvbmx5IGJlIGluc2VydCBhdCBncm91cHMgb3IgY2F0ZWdvcmllc1xyXG5cdFx0XHRzZXJpZUdyb3VwID0gc2VsZWN0ZWRJdGVtO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZXtcclxuXHRcdFx0c2VyaWVHcm91cCA9IHNlbGVjdGVkSXRlbS5nZXRTZXJpZUdyb3VwKCk7XHJcblx0XHR9XHJcblx0XHRpZihzZXJpZUdyb3VwICE9IHVuZGVmaW5lZCl7XHJcblxyXG5cdFx0XHR0aGlzLmFjdGl2YXRlRWRpdE1vZGUodHJ1ZSk7XHJcblx0XHRcdHJldHVybiB0aGlzLmFkZENhbGN1bGF0aW9uVG9Db250YWluZXIoc2VyaWVHcm91cCk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xyXG5cdH1cclxuXHRcclxuXHRwcml2YXRlIGFkZENhbGN1bGF0aW9uVG9Db250YWluZXIoY29udGFpbmVyOiBJU2VyaWVDb250YWluZXIpOiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb258dW5kZWZpbmVke1xyXG5cdFx0aWYodGhpcy5fc2VyaWVzUHJvdmlkZXIgPT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0cmV0dXJuIHVuZGVmaW5lZDtcclxuXHRcdH1cclxuXHRcdGxldCBjYWxjdWxhdGlvbiA9IG5ldyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb24oXCJDYWxjdWxhdGlvblwiLCB0aGlzLl9zZXJpZXNQcm92aWRlcik7XHJcblx0XHR0aGlzLl9zZXJpZUNvbnRhaW5lclRvU2VsZWN0QWZ0ZXJSZWZyZXNoID0gY2FsY3VsYXRpb247XHJcblx0XHRjb250YWluZXIuYWRkU2VyaWVDb250YWluZXIoY2FsY3VsYXRpb24sIC0xKTtcclxuXHRcdHJldHVybiBjYWxjdWxhdGlvbjtcclxuICAgIH1cclxuXHJcblx0cHVibGljIGdldENvbXBvbmVudFNldHRpbmdzKG9ubHlNb2RpZmllZDogYm9vbGVhbik6IENvbXBvbmVudFNldHRpbmdze1xyXG5cdFx0dGhpcy5jb21wb25lbnQuc2V0U2V0dGluZyhXaWRnZXRCYXNlLldpZGdldFNldHRpbmdJZCwgdGhpcy5nZXRXaWRnZXRTZXR0aW5ncygpKTtcclxuXHRcdHJldHVybiBzdXBlci5nZXRDb21wb25lbnRTZXR0aW5ncyhvbmx5TW9kaWZpZWQpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldENvbXBvbmVudFNldHRpbmdzKGRhdGE6IENvbXBvbmVudFNldHRpbmdzKSB7XHJcblx0XHRzdXBlci5zZXRDb21wb25lbnRTZXR0aW5ncyhkYXRhKTtcclxuXHRcdHRoaXMuc2V0V2lkZ2V0U2V0dGluZ3ModGhpcy5jb21wb25lbnQuZ2V0U2V0dGluZyhXaWRnZXRCYXNlLldpZGdldFNldHRpbmdJZCkpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBnZXRXaWRnZXRTZXR0aW5ncygpOiBhbnl7XHJcblx0XHRsZXQgc2V0dGluZ3MgPSB7XCJlZGl0TW9kZUFjdGl2ZVwiOiB0aGlzLmVkaXRNb2RlQWN0aXZlLFxyXG5cdFx0XHRcdFx0XHRcIndpZHRoXCI6IHRoaXMuX2FjdHVhbFdpZHRoXHJcblx0XHRcdFx0XHRcdH07XHJcblx0XHRyZXR1cm4gc2V0dGluZ3M7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHNldFdpZGdldFNldHRpbmdzKGRhdGE6IGFueSkge1xyXG5cdFx0aWYoZGF0YSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcblx0XHR9XHJcblx0XHR0aGlzLmVkaXRNb2RlQWN0aXZlID0gKGRhdGFbXCJlZGl0TW9kZUFjdGl2ZVwiXSk7XHJcblx0XHR0aGlzLl9hY3R1YWxXaWR0aCA9IGRhdGFbXCJ3aWR0aFwiXTtcclxuXHR9XHJcblxyXG5cdGFjdGl2YXRlRWRpdE1vZGUoYWN0aXZhdGU6IGJvb2xlYW4pe1xyXG5cclxuXHRcdC8vIFNob3cgb3IgaGlkZSBlZGl0IG1vZGUgY29sdW1uc1xyXG5cdFx0bGV0IHRyZWVPYmplY3QgPSB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCk7IFxyXG5cdFx0bGV0IHZhbHVlQ29sdW1uID0gdHJlZU9iamVjdC5nZXRDb2x1bW5CeUZpZWxkKFNpZ25hbE1hbmFnZXJXaWRnZXQudmFsdWVDb2x1bW5JZCk7XHJcblx0XHRsZXQgZGVzY3JpcHRpb25Db2x1bW4gPSB0cmVlT2JqZWN0LmdldENvbHVtbkJ5RmllbGQoU2lnbmFsTWFuYWdlcldpZGdldC5kZXNjcmlwdGlvbkNvbHVtbklkKTtcclxuXHRcdGxldCBjb2xvckNvbHVtbiA9IHRyZWVPYmplY3QuZ2V0Q29sdW1uQnlGaWVsZChTaWduYWxNYW5hZ2VyV2lkZ2V0LmNvbG9yQ29sdW1uSWQpO1xyXG5cdFx0aWYoYWN0aXZhdGUgPT0gdHJ1ZSl7XHJcblx0XHRcdHRyZWVPYmplY3Quc2hvd0NvbHVtbih2YWx1ZUNvbHVtbi5oZWFkZXJUZXh0KTtcclxuXHRcdFx0dHJlZU9iamVjdC5zaG93Q29sdW1uKGRlc2NyaXB0aW9uQ29sdW1uLmhlYWRlclRleHQpO1xyXG5cdFx0XHR0cmVlT2JqZWN0LnNob3dDb2x1bW4oY29sb3JDb2x1bW4uaGVhZGVyVGV4dCk7XHJcblx0XHR9XHJcblx0XHRlbHNle1xyXG5cdFx0XHR0cmVlT2JqZWN0LmhpZGVDb2x1bW4odmFsdWVDb2x1bW4uaGVhZGVyVGV4dCk7XHJcblx0XHRcdHRyZWVPYmplY3QuaGlkZUNvbHVtbihkZXNjcmlwdGlvbkNvbHVtbi5oZWFkZXJUZXh0KTtcclxuXHRcdFx0dHJlZU9iamVjdC5oaWRlQ29sdW1uKGNvbG9yQ29sdW1uLmhlYWRlclRleHQpO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5zZXRFZGl0TW9kZShhY3RpdmF0ZSk7XHJcblx0XHR0aGlzLnJlZnJlc2goKTtcclxuXHRcdFBlcnNpc3REYXRhUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5zZXREYXRhV2l0aElkKHRoaXMuY29tcG9uZW50LmlkLCB0aGlzLmdldENvbXBvbmVudFNldHRpbmdzKHRydWUpKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdHJ1ZSBpZiBvbmUgb2YgdGhlIGl0ZW1zIGRlbGV0ZWQgaGFzIGJlZW4gZG9uZSB0aHJvdWdoIHRoZSB0cmFjZSBvZiBtYXBwQ29ja3BpdFxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHsqfSBzZWxlY3RlZEl0ZW1zXHJcblx0ICogQHJldHVybnMge2Jvb2xlYW59XHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwdWJsaWMgY29udGFpbnNJdGVtV2l0aGluUmVjZW50T3JVcGxvYWRlZChzZWxlY3RlZEl0ZW1zOiBBcnJheTxhbnk+KTogYm9vbGVhbiB7XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHNlbGVjdGVkSXRlbXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYgKHRoaXMuaXNJdGVtSW5TaWduYWxDYXRlZ29yeShzZWxlY3RlZEl0ZW1zW2ldLml0ZW0sIFNpZ25hbENhdGVnb3J5LkNhdGVnb3J5SWRVcGxvYWRlZCkgfHwgdGhpcy5pc0l0ZW1JblNpZ25hbENhdGVnb3J5KHNlbGVjdGVkSXRlbXNbaV0uaXRlbSwgU2lnbmFsQ2F0ZWdvcnkuQ2F0ZWdvcnlJZFJlY2VudCkpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0cnVlIGlmIHRoZSBpdGVtIHNlbGVjdGVkIGJlbG9uZ3MgdG8gdGhlIHNpZ25hbCBjYXRlZ29yeSBzZWxlY3RlZFxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0ge0lTZXJpZU5vZGUgfCBJU2VyaWVDb250YWluZXJ9IGl0ZW1cclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gc2lnbmFsQ2F0ZWdvcnlJZFxyXG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBpc0l0ZW1JblNpZ25hbENhdGVnb3J5KGl0ZW06IElTZXJpZU5vZGUgfCBJU2VyaWVDb250YWluZXIsIHNpZ25hbENhdGVnb3J5SWQ6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cdFx0bGV0IHBhcmVudCA9IGl0ZW0ucGFyZW50O1xyXG5cclxuXHRcdGlmIChwYXJlbnQgaW5zdGFuY2VvZiBTaWduYWxDYXRlZ29yeSAmJiBwYXJlbnQuaWQgPT0gc2lnbmFsQ2F0ZWdvcnlJZCkge1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKCEocGFyZW50IGluc3RhbmNlb2YgU2lnbmFsUm9vdCkpe1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5pc0l0ZW1JblNpZ25hbENhdGVnb3J5KHBhcmVudCEsIHNpZ25hbENhdGVnb3J5SWQpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNob3dzIG1lc3NhZ2UgYm94IGFjY29yZGluZyB0byB0eXBlXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7bWVzc2FnZUJveFR5cGV9IHR5cGVcclxuXHQgKiBAcGFyYW0ge01hcDxzdHJpbmcsIHN0cmluZz59IGZpbGVDb250ZW50c1xyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBzaG93TWVzc2FnZUJveCh0eXBlOiBtZXNzYWdlQm94VHlwZSwgZmlsZUNvbnRlbnRzOiBNYXA8c3RyaW5nLCBzdHJpbmc+KSB7XHJcblx0XHRpZih0eXBlID09PSBtZXNzYWdlQm94VHlwZS5XYXJuaW5nKSB7XHJcblx0XHRcdHRoaXMuc2hvd1dhcm5pbmdXaGVuSW1wb3J0aW5nRmlsZXMoKTtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYodHlwZSA9PT0gbWVzc2FnZUJveFR5cGUuWWVzTm8pIHtcclxuXHRcdFx0dGhpcy5zaG93TWVzc2FnZUJveFdoZW5JbXBvcnRpbmdNQ0VGaWxlcyhmaWxlQ29udGVudHMpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhIHdhcm5pbmcgbWVzc2FnZSB3aGVuIHRoZSB1c2VyIGltcG9ydHMgYSAubWNlIGZpbGUgYW5kIG90aGVyIGZpbGVzIHRvb1xyXG5cdCAqXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIHNob3dXYXJuaW5nV2hlbkltcG9ydGluZ0ZpbGVzKCkge1xyXG5cdFx0bmV3IEFsZXJ0RGlhbG9nKCkuY3JlYXRlTWVzc2FnZUJveCh0aGlzLl93YXJuaW5nSW1wb3J0aW5nSGVhZGVyLHRoaXMuX3dhcm5pbmdJbXBvcnRpbmdDb250ZW50LCBtZXNzYWdlQm94VHlwZS5XYXJuaW5nLCB1bmRlZmluZWQpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhIG1lc3NhZ2UgYm94IHRoYXQgbGV0cyB1c2VyIGRlY2lkZSB0byBkZWxldGUgc2VsZWN0ZWQgZGF0YSBvciBub3RcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7Kn0gZGVsZXRlZEl0ZW1zXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwdWJsaWMgc2hvd01lc3NhZ2VCb3hGb3JEZWxldGluZ0l0ZW0oZGVsZXRlZEl0ZW1zKSB7XHJcblx0XHRsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcclxuXHRcdGxldCBzZWxmID0gdGhpcztcclxuXHRcdFxyXG5cdFx0bmV3IEFsZXJ0RGlhbG9nKCkuY3JlYXRlTWVzc2FnZUJveCh0aGlzLl9kZWxldGVJdGVtc0hlYWRlcix0aGlzLl9kZWxldGVJdGVtc0NvbnRlbnQsIG1lc3NhZ2VCb3hUeXBlLkNhbmNlbERlbGV0ZSwgZGVmZXJyZWQpO1xyXG5cclxuXHRcdCQud2hlbihkZWZlcnJlZCkuZG9uZShmdW5jdGlvbigpe1xyXG5cdFx0XHRzZWxmLmRlbGV0ZUl0ZW1zKGRlbGV0ZWRJdGVtcyk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYSBtZXNzYWdlIGJveCB0aGF0IGxldHMgdXNlciBkZWNpZGUgdG8gaW1wb3J0IC5tY2UgZmlsZSBuYWQgZGVsZXRlIGFsbCBkYXRhIG9yIG5vdFxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0ge01hcDxzdHJpbmcsIHN0cmluZz59IGZpbGVDb250ZW50c1xyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBzaG93TWVzc2FnZUJveFdoZW5JbXBvcnRpbmdNQ0VGaWxlcyhmaWxlQ29udGVudHM6IE1hcDxzdHJpbmcsIHN0cmluZz4pIHtcclxuXHRcdGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xyXG5cdFx0bGV0IHNlbGYgPSB0aGlzO1xyXG5cdFx0XHJcblx0XHRuZXcgQWxlcnREaWFsb2coKS5jcmVhdGVNZXNzYWdlQm94KHRoaXMuX01DRUZpbGVzSW1wb3J0ZWRIZWFkZXIsdGhpcy5fTUNFRmlsZXNJbXBvcnRlZENvbnRlbnQsIG1lc3NhZ2VCb3hUeXBlLlllc05vLCBkZWZlcnJlZCk7XHJcblx0XHRcclxuXHRcdCQud2hlbihkZWZlcnJlZCkuZG9uZShmdW5jdGlvbigpe1xyXG5cdFx0XHRzZWxmLnN0YXJ0SW1wb3J0KGZpbGVDb250ZW50cyk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERlbGV0ZSBzZWxlY3RlZCBpdGVtc1xyXG5cdCAqXHJcblx0ICogQHBhcmFtIHsqfSBpdGVtc1xyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHVibGljIGRlbGV0ZUl0ZW1zKGl0ZW1zKSB7XHJcblx0XHR0aGlzLl9zdXBwcmVzc1JlZnJlc2ggPSB0cnVlO1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmRlbGV0ZUl0ZW0oaXRlbXNbaV0uaXRlbSk7XHJcblx0XHR9XHJcblx0XHR0aGlzLl9zdXBwcmVzc1JlZnJlc2ggPSBmYWxzZTtcclxuXHRcdHRoaXMucmVmcmVzaCgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRGVsZXRlIGEgc3BlY2lmaWMgaXRlbVxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0geyp9IGl0ZW1cclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZGVsZXRlSXRlbShpdGVtKXtcclxuXHRcdGlmKGl0ZW0uY2FuRGVsZXRlKXtcclxuXHRcdFx0aWYoaXRlbSBpbnN0YW5jZW9mIFNlcmllQ29udGFpbmVyKXtcclxuXHRcdFx0XHR0aGlzLnJlbW92ZVNlcmllQ29udGFpbmVyKGl0ZW0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2V7XHJcblx0XHRcdFx0dGhpcy5yZW1vdmVTZXJpZU5vZGUoaXRlbSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0ICogIFJlbW92ZSB0aGUgc2lnbmFsIGNvbnRhaW5lciB3aXRoIGFsbCBzdWIgY29udGFpbmVycyBhbmQgc2lnbmFscyBmcm9tIGRhdGFtb2RlbFxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0ge0lTZXJpZUNvbnRhaW5lcn0gc2VyaWVHcm91cFxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSByZW1vdmVTZXJpZUNvbnRhaW5lcihzZXJpZUdyb3VwOiBJU2VyaWVDb250YWluZXIpe1xyXG5cdFx0KDxJU2lnbmFsTWFuYWdlckRhdGFNb2RlbD50aGlzLl9kYXRhTW9kZWwpLnJlbW92ZVNlcmllQ29udGFpbmVyKHNlcmllR3JvdXApO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlcyB0aGUgc2lnbmFsIGZyb20gZGF0YW1vZGVsXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7SVNlcmllTm9kZX0gc2VyaWVOb2RlXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIHJlbW92ZVNlcmllTm9kZShzZXJpZU5vZGU6IElTZXJpZU5vZGUpe1xyXG5cdFx0KDxJU2lnbmFsTWFuYWdlckRhdGFNb2RlbD50aGlzLl9kYXRhTW9kZWwpLnJlbW92ZVNlcmllTm9kZShzZXJpZU5vZGUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRXhwb3J0cyBhIHNlcmllR3JvdXBcclxuXHQgKlxyXG5cdCAqIEBwdWJsaWNcclxuXHQgKiBAcGFyYW0ge0FycmF5PEV4cG9ydFNlcmllR3JvdXA+fSBlbGVtZW50c1xyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyVHJlZUdyaWRcclxuXHQgKi9cclxuXHRwdWJsaWMgZXhwb3J0U2VyaWVHcm91cChlbGVtZW50czogQXJyYXk8RXhwb3J0U2VyaWVHcm91cD4pe1xyXG5cdFx0dGhpcy5zZXRCdXN5SW5mb3JtYXRpb24obmV3IEJ1c3lJbmZvcm1hdGlvbihcIkV4cG9ydGluZyBkYXRhLi4uXCIsIEltYWdlSWQuZGVmYXVsdEltYWdlLCA0OCwgdHJ1ZSkpO1xyXG5cdFx0dGhpcy5zZXRCdXN5KHRydWUpO1xyXG5cdFx0Ly8gVGltZW91dCBuZWVkZWQgdG8gc2hvdyB0aGUgYnVzeXNjcmVlbiBiZWZvcmUgZXhwb3J0aW5nIGRhdGEgXHJcblx0XHRzZXRUaW1lb3V0KCgpID0+IHRoaXMuZXhwb3J0Q3N2RGF0YShlbGVtZW50cyksIDIwMCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBPcGVucyBhIGZpbGUgc2VsZWN0IGRpYWxvZyBhbmQgaW1wb3J0cyBhIHNlcmllR3JvdXAgZnJvbSB0aGUgZmlsZVxyXG5cdCAqXHJcblx0ICogQHB1YmxpY1xyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyVHJlZUdyaWRcclxuXHQgKi9cclxuXHRwdWJsaWMgaW1wb3J0U2VyaWVHcm91cCgpe1xyXG5cdFx0dGhpcy5fc2VyaWVDb250YWluZXJUb1NlbGVjdEFmdGVyUmVmcmVzaCA9IHVuZGVmaW5lZDtcclxuXHRcdHRoaXMuX2ZpbGVQcm92aWRlci5ldmVudFVwbG9hZERhdGFGaW5pc2hlZC5hdHRhY2godGhpcy5fdXBsb2FkRGF0YUZpbmlzaGVkSGFuZGxlcik7XHJcblx0XHR0aGlzLl9maWxlUHJvdmlkZXIudXBsb2FkRGF0YShcIi5jc3YsIC5tY2UsIC5tY2UxXCIsIHRydWUpOyAvLyBPbmx5IHNob3cvYWNjZXB0ICouY3N2LCAqLm1jZSwgKi5tY2UxIGZpbGVzXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZXhwb3J0U2lnbmFsTWFuYWdlckRhdGEoKXtcclxuXHRcdHRoaXMuc2V0QnVzeUluZm9ybWF0aW9uKG5ldyBCdXN5SW5mb3JtYXRpb24oXCJFeHBvcnRpbmcgZGF0YS4uLlwiLCBJbWFnZUlkLmRlZmF1bHRJbWFnZSwgNDgsIHRydWUpKTtcclxuXHRcdHRoaXMuc2V0QnVzeSh0cnVlKTtcclxuXHRcdC8vIFRpbWVvdXQgbmVlZGVkIHRvIHNob3cgdGhlIGJ1c3lzY3JlZW4gYmVmb3JlIGV4cG9ydGluZyBkYXRhIFxyXG5cdFx0c2V0VGltZW91dCgoKSA9PiB0aGlzLmV4cG9ydERhdGEoKSwgMjAwKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE9jY3VycyBhZnRlciByZWFkaW5nIGRhdGEgZnJvbSBmaWxlKHRyYWNlIGltcG9ydCBkYXRhKVxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0ge0hUTUxJbnB1dEVsZW1lbnR9IHNlbmRlclxyXG5cdCAqIEBwYXJhbSB7TWFwPHN0cmluZywgc3RyaW5nPn0gYXJnc1xyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBvblVwbG9hZERhdGFGaW5pc2hlZChzZW5kZXI6IEhUTUxJbnB1dEVsZW1lbnQsIGFyZ3M6IE1hcDxzdHJpbmcsIHN0cmluZz4pe1xyXG5cdFx0dGhpcy5zZXRCdXN5SW5mb3JtYXRpb24obmV3IEJ1c3lJbmZvcm1hdGlvbihcIkltcG9ydGluZyBkYXRhLi4uXCIsIEltYWdlSWQuZGVmYXVsdEltYWdlLCA0OCwgdHJ1ZSkpO1xyXG5cdFx0bGV0IG1zZ0JveFR5cGUgPSB0aGlzLmNoZWNrTWVzc2FnZUJveFR5cGUoYXJncyk7IFxyXG5cclxuXHRcdGlmIChtc2dCb3hUeXBlICE9IHVuZGVmaW5lZCkge1xyXG5cdFx0XHR0aGlzLnNob3dNZXNzYWdlQm94KG1zZ0JveFR5cGUsIGFyZ3MpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHRoaXMuc3RhcnRJbXBvcnQoYXJncyk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5fZmlsZVByb3ZpZGVyLmV2ZW50VXBsb2FkRGF0YUZpbmlzaGVkLmRldGFjaCh0aGlzLl91cGxvYWREYXRhRmluaXNoZWRIYW5kbGVyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEV4cG9ydHMgdGhlIGdpdmVuIHNpZ25hbCBncm91cCB0byBUcmFjZURhdGEuY3N2IGZpbGVcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHsgQXJyYXk8RXhwb3J0U2VyaWVHcm91cD59IGVsZW1lbnRzXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIGV4cG9ydENzdkRhdGEoZWxlbWVudHM6IEFycmF5PEV4cG9ydFNlcmllR3JvdXA+KXtcclxuXHRcdGxldCBkYXRhO1xyXG5cdFx0aWYodGhpcy5fc2VyaWVzUHJvdmlkZXIgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0ZGF0YSA9IG5ldyBFeHBvcnRJbXBvcnRIZWxwZXIodGhpcy5fc2VyaWVzUHJvdmlkZXIpLmV4cG9ydFRyYWNlRGF0YShlbGVtZW50cyk7XHJcblx0XHR9XHJcblx0XHRlbHNle1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKFwiU2VyaWVzUHJvdmlkZXIgaXMgbm90IGF2YWlsYWJsZSFcIilcclxuXHRcdH1cclxuXHRcdGlmKGRhdGEgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtkYXRhXSwgeyB0eXBlOiBcInRleHQvY3N2XCIgfSk7XHJcblx0XHRcdEZpbGVQcm92aWRlci5kb3dubG9hZERhdGEoXCJUcmFjZURhdGEuY3N2XCIsIGJsb2IpOyAgICBcclxuXHRcdH1cclxuXHRcdHRoaXMuc2V0QnVzeShmYWxzZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBFeHBvcnRzIHRoZSBzaWduYWwgbWFuYWdlciBkYXRhKGRhdGFtb2RlbCwgc2VyaWVzIHByb3ZpZGVyLCAuLi4pXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBleHBvcnREYXRhKCl7XHJcblx0XHRpZih0aGlzLl9zZXJpZXNQcm92aWRlciAhPSB1bmRlZmluZWQpeyAvLyBTZXJpZXNQcm92aWRlciBuZWVkZWQgdG8gZXhwb3J0IGRhdGFcclxuXHRcdFx0dHJ5e1xyXG5cdFx0XHRcdGxldCBjb21wb25lbnRzID0gdGhpcy5nZXRDb21wb25lbnRzVG9FeHBvcnQoKTtcclxuXHRcdFx0XHRsZXQgc2V0dGluZ09iamVjdHMgPSB0aGlzLmdldFNldHRpbmdPYmplY3RzVG9FeHBvcnQoKTtcclxuXHRcdFx0XHRsZXQgc3RyaW5nRGF0YSA9IE1jZUV4cG9ydEltcG9ydEhlbHBlci5nZXRFeHBvcnREYXRhKGNvbXBvbmVudHMsIHNldHRpbmdPYmplY3RzKTtcclxuXHRcdFx0XHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtzdHJpbmdEYXRhXSwgeyB0eXBlOiBcInRleHQvaHRtbFwiIH0pO1xyXG5cdFx0XHRcdEZpbGVQcm92aWRlci5kb3dubG9hZERhdGEoXCJFeHBvcnQubWNlMVwiLCBibG9iKTsgICAgXHJcblx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRpZihNY2VDb252ZXJzaW9uRXJyb3IuaXNNY2VDb252ZXJzaW9uRXJyb3IoZSkpIHtcclxuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoZS50b1N0cmluZygpKVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGUpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBcclxuXHRcdH1cclxuXHRcdGVsc2V7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoXCJTZXJpZXNQcm92aWRlciBmb3IgZXhwb3J0IG5vdCBhdmFpbGFibGUhXCIpO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5zZXRCdXN5KGZhbHNlKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIGNvbXBvbmVudHMgaW4gYSBkZWZpbmVkIG9yZGVyIHdoaWNoIHNob3VsZCBiZSBjbGVhcmVkIGJlZm9yZSBpbXBvcnRpbmcgbmV3IHNldHRpbmdcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHJldHVybnMge0FycmF5PElDb21wb25lbnQ+fVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBnZXRDb21wb25lbnRzVG9DbGVhcigpOiBBcnJheTxJQ29tcG9uZW50PntcclxuXHRcdGxldCBjb21wb25lbnRzVG9DbGVhciA9IG5ldyBBcnJheTxJQ29tcG9uZW50PigpO1xyXG5cdFx0Y29tcG9uZW50c1RvQ2xlYXIucHVzaCh0aGlzLmRhdGFNb2RlbCk7IC8vIFNpZ25hbE1hbmFnZXJEYXRhTW9kZWxcclxuXHRcdGlmKHRoaXMuX2NoYXJ0TWFuYWdlckRhdGFNb2RlbCAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHRjb21wb25lbnRzVG9DbGVhci5wdXNoKHRoaXMuX2NoYXJ0TWFuYWdlckRhdGFNb2RlbCk7IC8vIENoYXJ0TWFuYWdlckRhdGFNb2RlbFxyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuX3Nlcmllc1Byb3ZpZGVyICE9IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRjb21wb25lbnRzVG9DbGVhci5wdXNoKHRoaXMuX3Nlcmllc1Byb3ZpZGVyKTsgLy8gU2VyaWVzUHJvdmlkZXIgbXVzdCBiZSBpbXBvcnRlZCBmaXJzdFxyXG4gICAgICAgIH1cclxuXHJcblx0XHRyZXR1cm4gY29tcG9uZW50c1RvQ2xlYXI7XHJcblx0fVxyXG4gICAgXHRcclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSBjb21wb25lbnRzIHdoaWNoIHNob3VsZCBiZSBleHBvcnRlZC9pbXBvcnRlZCBmcm9tIHRoZSBtY2UgZmlsZSBpbiB0aGUgZ2l2ZW4gb3JkZXJcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHJldHVybnMge0FycmF5PElDb21wb25lbnQ+fVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBnZXRDb21wb25lbnRzVG9FeHBvcnQoKTogQXJyYXk8SUNvbXBvbmVudD57XHJcblx0XHRsZXQgZXhwb3J0Q29tcG9uZW50cyA9IG5ldyBBcnJheTxJQ29tcG9uZW50PigpO1xyXG5cdFx0aWYgKHRoaXMuX3Nlcmllc1Byb3ZpZGVyICE9IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRleHBvcnRDb21wb25lbnRzLnB1c2godGhpcy5fc2VyaWVzUHJvdmlkZXIpOyAvLyBTZXJpZXNQcm92aWRlciBtdXN0IGJlIGltcG9ydGVkIGZpcnN0XHJcbiAgICAgICAgfVxyXG5cdFx0ZXhwb3J0Q29tcG9uZW50cy5wdXNoKHRoaXMuZGF0YU1vZGVsKTsgLy8gU2lnbmFsTWFuYWdlckRhdGFNb2RlbFxyXG5cdFx0aWYodGhpcy5fY2hhcnRNYW5hZ2VyRGF0YU1vZGVsICE9IHVuZGVmaW5lZCl7XHJcblx0XHRcdGV4cG9ydENvbXBvbmVudHMucHVzaCh0aGlzLl9jaGFydE1hbmFnZXJEYXRhTW9kZWwpOyAvLyBDaGFydE1hbmFnZXJEYXRhTW9kZWxcclxuXHRcdH0gICAgICAgXHJcblx0XHJcblx0XHRyZXR1cm4gZXhwb3J0Q29tcG9uZW50cztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuXHQgKiBSZXR1cm5zIGFsbCBzZXR0aW5ncyBvYmplY3RzIHdoaWNoIHNob3VsZCBiZSBleHBvcnRlZFxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcmV0dXJucyB7QXJyYXk8SVNldHRpbmdzT2JqZWN0Pn1cclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZ2V0U2V0dGluZ09iamVjdHNUb0V4cG9ydCgpOiBBcnJheTxJU2V0dGluZ3NPYmplY3Q+IHtcclxuXHRcdGxldCBzZXR0aW5nc09iamVjdHMgPSBuZXcgQXJyYXk8SVNldHRpbmdzT2JqZWN0PigpO1xyXG5cdFx0Ly8gVE9ETzogZ2V0IGN1cnNvckluZm9TdGF0ZXMgd2l0aG91dCB0aGUgdXNlIG9mIGN1cnNvckluZm9XaWRnZXRcclxuXHRcdC8qaWYodGhpcy52aWV3ICE9IHVuZGVmaW5lZCl7XHJcblx0XHRcdGxldCBjdXJzb3JJbmZvV2lkZ2V0ID0gdGhpcy52aWV3LmdldFdpZGdldEJ5SWQoXCJDdXJzb3JJbmZvV2lkZ2V0XCIpO1xyXG5cdFx0XHRpZiAoY3Vyc29ySW5mb1dpZGdldCAhPSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRsZXQgY3Vyc29yU3RhdGVzID0gY3Vyc29ySW5mb1dpZGdldC5fY3Vyc29yU3RhdGVzO1xyXG5cdFx0XHRcdGlmKGN1cnNvclN0YXRlcyAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHRcdFx0c2V0dGluZ3NPYmplY3RzLnB1c2goY3Vyc29yU3RhdGVzKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0qL1xyXG5cdFx0cmV0dXJuIHNldHRpbmdzT2JqZWN0cztcclxuICAgIH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgYnVzeSBzY3JlZW4gYW5kIHN0YXJ0IGltcG9ydGluZyBkYXRhXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7TWFwPHN0cmluZywgc3RyaW5nPn0gYXJnc1xyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBzdGFydEltcG9ydChhcmdzOiBNYXA8c3RyaW5nLCBzdHJpbmc+KSB7XHJcblx0XHR0aGlzLnNldEJ1c3kodHJ1ZSk7XHJcblx0XHQvLyBUaW1lb3V0IG5lZWRlZCB0byBzaG93IHRoZSBidXN5c2NyZWVuIGJlZm9yZSBpbXBvcnRpbmcgZGF0YSBcclxuXHRcdHNldFRpbWVvdXQoKCkgPT4gdGhpcy5pbXBvcnREYXRhKGFyZ3MpLCAyMDApO1xyXG5cdH1cclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIGltcG9ydHMgdGhlIGdpdmVuIGZpbGVkYXRhIHdpdGggdGhlIGdpdmVuIGZpbGVuYW1lIHRvIHRoZSBzaWduYWwgbWFuYWdlciBkYXRhbW9kZWxcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHtNYXA8c3RyaW5nLCBzdHJpbmc+fSBmaWxlQ29udGVudHNcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaW1wb3J0RGF0YShmaWxlQ29udGVudHM6IE1hcDxzdHJpbmcsIHN0cmluZz4pe1xyXG5cdFx0ZmlsZUNvbnRlbnRzLmZvckVhY2goKGZpbGVEYXRhLCBmaWxlbmFtZSkgPT4ge1xyXG5cdFx0XHRpZihmaWxlbmFtZS50b0xvd2VyQ2FzZSgpLmVuZHNXaXRoKFwiLmNzdlwiKSl7XHJcblx0XHRcdFx0aWYodGhpcy5fc2VyaWVzUHJvdmlkZXIgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0XHRcdGxldCBleHBvcnRJbXBvcnRIZWxwZXIgPSBuZXcgRXhwb3J0SW1wb3J0SGVscGVyKHRoaXMuX3Nlcmllc1Byb3ZpZGVyKTtcclxuXHRcdFx0XHRcdGxldCBzZXJpZUdyb3VwcyA9IGV4cG9ydEltcG9ydEhlbHBlci5pbXBvcnRUcmFjZURhdGEoZmlsZURhdGEsIGZpbGVuYW1lKTtcclxuXHRcdFx0XHRcdGxldCBzaWduYWxGaWxlID0gbmV3IFNlcmllQ29udGFpbmVyKGZpbGVuYW1lKTtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0Ly9cclxuXHRcdFx0XHRcdHRoaXMuc2V0Q29udGFpbmVySWQoc2lnbmFsRmlsZSk7XHJcblx0XHRcdFx0XHRzZXJpZUdyb3Vwcy5mb3JFYWNoKHNlcmllR3JvdXAgPT57XHRcclxuXHRcdFx0XHRcdFx0c2lnbmFsRmlsZS5hZGRTZXJpZUNvbnRhaW5lcihzZXJpZUdyb3VwLCAtMSk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHR0aGlzLl9zZXJpZUNvbnRhaW5lclRvU2VsZWN0QWZ0ZXJSZWZyZXNoID0gc2lnbmFsRmlsZTtcclxuXHRcdFx0XHRcdCg8SVNpZ25hbE1hbmFnZXJEYXRhTW9kZWw+dGhpcy5fZGF0YU1vZGVsKS5hZGRTZXJpZUNvbnRhaW5lcihzaWduYWxGaWxlLCBTaWduYWxDYXRlZ29yeS5DYXRlZ29yeUlkSW1wb3J0ZWQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNle1xyXG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvcihcIlNlcmllc1Byb3ZpZGVyIGlzIG5vdCBhdmFpbGFibGUhXCIpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIGlmIChmaWxlbmFtZS50b0xvd2VyQ2FzZSgpLmVuZHNXaXRoKFwiLm1jZVwiKSB8fCBmaWxlbmFtZS50b0xvd2VyQ2FzZSgpLmVuZHNXaXRoKFwiLm1jZTFcIikpe1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHR0aGlzLmltcG9ydE1DRUZpbGUoZmlsZURhdGEpO1xyXG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRcdGlmKE1jZUNvbnZlcnNpb25FcnJvci5pc01jZUNvbnZlcnNpb25FcnJvcihlKSkge1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGUudG9TdHJpbmcoKSk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNle1xyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJJbXBvcnQgZm9yIGZpbGUgZm9ybWF0IG5vdCBpbXBsZW1lbnRlZDogXCIgKyBmaWxlbmFtZSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHR9KTtcclxuXHRcdHRoaXMuc2V0QnVzeShmYWxzZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHR5cGUgb2YgbWVzc2FnZSBib3ggbmVlZCBpdCAoaWYgbmVlZCBpdClcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHtNYXA8c3RyaW5nLCBzdHJpbmc+fSBmaWxlQ29udGVudHNcclxuXHQgKiBAcmV0dXJucyB7KG1lc3NhZ2VCb3hUeXBlIHwgdW5kZWZpbmVkKX1cclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgY2hlY2tNZXNzYWdlQm94VHlwZShmaWxlQ29udGVudHM6IE1hcDxzdHJpbmcsIHN0cmluZz4pOiBtZXNzYWdlQm94VHlwZSB8IHVuZGVmaW5lZCB7XHJcblx0XHRsZXQgaXNTaWduYWxNYW5hZ2VyRW1wdHkgPSB0aGlzLmlzU2lnbmFsTWFuYWdlckVtcHR5KHRoaXMuZGF0YU1vZGVsLmRhdGEpO1xyXG5cdFx0bGV0IGlzVGhlcmVNQ0VGaWxlID0gZmFsc2U7XHJcblxyXG5cdFx0ZmlsZUNvbnRlbnRzLmZvckVhY2goKGZpbGVEYXRhLCBmaWxlbmFtZSkgPT4ge1xyXG5cdFx0XHRpZiAoZmlsZW5hbWUudG9Mb3dlckNhc2UoKS5lbmRzV2l0aChcIi5tY2VcIikgfHwgZmlsZW5hbWUudG9Mb3dlckNhc2UoKS5lbmRzV2l0aChcIi5tY2UxXCIpKSB7XHJcblx0XHRcdFx0aXNUaGVyZU1DRUZpbGUgPSB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHRpZiAoaXNUaGVyZU1DRUZpbGUgJiYgZmlsZUNvbnRlbnRzLnNpemUgPiAxKSB7XHJcblx0XHRcdHJldHVybiBtZXNzYWdlQm94VHlwZS5XYXJuaW5nO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZihpc1RoZXJlTUNFRmlsZSAmJiAhaXNTaWduYWxNYW5hZ2VyRW1wdHkpIHtcclxuXHRcdFx0cmV0dXJuIG1lc3NhZ2VCb3hUeXBlLlllc05vO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHJldHVybiB1bmRlZmluZWQ7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRydWUgaWYgdGhlcmUgaXMgbm90aGluZyBpbiB0aGUgc2lnbmFsTWFuYWdlclxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0geyp9IGRhdGFcclxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaXNTaWduYWxNYW5hZ2VyRW1wdHkoZGF0YSk6IGJvb2xlYW4ge1xyXG5cdFx0bGV0IGlzRW1wdHkgPSB0cnVlO1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGlmIChkYXRhW2ldLmNoaWxkcy5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0aXNFbXB0eSA9IGZhbHNlO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gaXNFbXB0eTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERlbGV0ZXMgYWxsIHRyYWNlIGRhdGEgYW5kIGltcG9ydHMgdGhlIC5tY2UgZmlsZVxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0geyp9IGRhdGFcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaW1wb3J0TUNFRmlsZShmaWxlRGF0YSkge1xyXG5cdFx0aWYodGhpcy5fc2VyaWVzUHJvdmlkZXIpeyAvLyBzZXJpZSBwcm92aWRlciBuZWVkZWQgdG8gaW1wb3J0IGRhdGFcclxuXHRcdFx0dGhpcy5zdXBwcmVzc1JlZnJlc2godHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBDbGVhciBjb21wb25lbnRzIHdpdGggdGhlIGdpdmVuIG9yZGVyXHJcblx0XHRcdGxldCBjb21wb25lbnRzVG9DbGVhciA9IHRoaXMuZ2V0Q29tcG9uZW50c1RvQ2xlYXIoKTtcclxuXHRcdFx0TWNlRXhwb3J0SW1wb3J0SGVscGVyLmNsZWFyQ29tcG9uZW50cyhjb21wb25lbnRzVG9DbGVhcik7XHJcblxyXG4gICAgICAgICAgICAvLyBTZXQgdGhlIGltcG9ydCBkYXRhIHRvIHRoZSBjb21wb25lbnRzIGluIHRoZSBnaXZlbiBvcmRlclxyXG5cdFx0XHRsZXQgZXhwb3J0Q29udGFpbmVyID0gRXhwb3J0Q29udGFpbmVyLmZyb21Kc29uKGZpbGVEYXRhKTtcclxuXHRcdFx0bGV0IGNvbXBvbmVudHMgPSB0aGlzLmdldENvbXBvbmVudHNUb0V4cG9ydCgpOyAvLyBJbXBvcnQgYW5kIEV4cG9ydCBjb21wb25lbnRzIGFyZSB0aGUgc2FtZSBzbyB3ZSBjYW4gdXNlIHRoZSBleHBvcnQgY29tcG9uZW50cyBhcnJheVxyXG5cdFx0XHRsZXQgc2V0dGluZ09iamVjdHMgPSB0aGlzLmdldFNldHRpbmdPYmplY3RzVG9FeHBvcnQoKTsgLy8gSW1wb3J0IGFuZCBFeHBvcnQgb2JqZWN0cyBhcmUgdGhlIHNhbWUgc28gd2UgY2FuIHVzZSB0aGUgZXhwb3J0IHNldHRpbmdzIG9iamVjdCBhcnJheVxyXG5cdFx0XHRNY2VFeHBvcnRJbXBvcnRIZWxwZXIuc2V0SW1wb3J0RGF0YShjb21wb25lbnRzLCBzZXR0aW5nT2JqZWN0cywgZXhwb3J0Q29udGFpbmVyKTtcclxuXHJcblx0XHRcdHRoaXMuc3VwcHJlc3NSZWZyZXNoIChmYWxzZSk7XHJcblx0XHRcdHRoaXMucmVmcmVzaCgpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZXtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihcIlNlcmllc1Byb3ZpZGVyIGZvciBpbXBvcnQgbm90IGF2YWlsYWJsZSFcIik7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZWxlY3RzIHRoZSBnaXZlbiBjb250YWluZXIgaW4gdGhlIHRyZWUgZ3JpZCBhbmQgc2Nyb2xscyB0byBpdCBpZiBvdXQgb2YgdGhlIHdpbmRvdyAoVE9ETzogTW92ZSB0byBCYXNlQ2xhc3MgaW5jbC4gX3NlcmllQ29udGFpbmVyVG9TZWxlY3RBZnRlclJlZnJlc2gpXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7KElTZXJpZUNvbnRhaW5lcnx1bmRlZmluZWQpfSBjb250YWluZXJcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgc2VsZWN0SXRlbShjb250YWluZXI6IElTZXJpZUNvbnRhaW5lcnx1bmRlZmluZWQpe1xyXG5cdFx0bGV0IHRyZWVPYmplY3QgPSB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCk7IFxyXG5cdFx0bGV0IHJlY29yZCA9ICg8YW55PnRyZWVPYmplY3QubW9kZWwpLmZsYXRSZWNvcmRzLmZpbHRlcihyZWNvcmQgPT4ge3JldHVybiByZWNvcmQuaXRlbSA9PT0gY29udGFpbmVyfSlbMF07XHJcblx0XHRpZihyZWNvcmQgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0Ly8gZXhwYW5kIHBhcmVudCBub2RlIGlmIGl0IGlzIGNvbGxhcHNlZCB0byBzZWUgdGhlIG5ldyBpbXBvcnRlZCB0cmFjZSBkYXRhXHJcblx0XHRcdGlmKHJlY29yZC5wYXJlbnRJdGVtLmV4cGFuZFN0YXRlID09IGZhbHNlKXtcclxuXHRcdFx0XHR0cmVlT2JqZWN0LmV4cGFuZENvbGxhcHNlUm93KHJlY29yZC5wYXJlbnRJdGVtLmluZGV4KVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyB0cmVlT2JqZWN0LnNjcm9sbE9mZnNldCBub3QgcG9zc2libGUgaWYgdGhlcmUgd291bGQgYmUgc29tZSBmcmVlIHNwYWNlIGFmdGVyIHRoZSBsYXN0IGl0ZW0gaW4gdGhlIHRyZWUgZ3JpZCBhZnRlciBzY3JvbGxpbmcgdG8gdGhlIGdpdmVuIGl0ZW1cclxuXHRcdFx0Ly8gPT4gc2Nyb2xsVG9Cb3R0b20gYmVmb3Igc2Nyb2xsIHRvIGEgc3BlY2lhbCBvZmZzZXQgaWYgcG9zc2libGVcclxuXHRcdFx0dHJlZU9iamVjdC5zY3JvbGxUb0JvdHRvbSgpO1xyXG5cdFx0XHR0cmVlT2JqZWN0LnNldE1vZGVsKHtcInNlbGVjdGVkUm93SW5kZXhcIiA6IHJlY29yZC5pbmRleCB9KTtcclxuXHRcdFx0bGV0IHJvd0hlaWdodCA9IHRyZWVPYmplY3QubW9kZWwucm93SGVpZ2h0O1xyXG5cdFx0XHQvLyBzY3JvbGwgaW5kZXggbm90IHRoZSBzYW1lIGFzIHRoZSBzZWxlY3RlZEluZGV4ID0+IGNvbGxhcHNlZCBub2RlcyBtdXN0IGJlIGNvbnNpZGVyZWRcclxuXHRcdFx0bGV0IHNjcm9sbEluZGV4PSB0aGlzLmdldFNjcm9sbEluZGV4KCg8YW55PnRyZWVPYmplY3QubW9kZWwpLmZsYXRSZWNvcmRzLCByZWNvcmQuaW5kZXgpO1xyXG5cdFx0XHRsZXQgc2Nyb2xsT2Zmc2V0ID0gIChzY3JvbGxJbmRleC0xKSpyb3dIZWlnaHQhO1xyXG5cdFx0XHR0cmVlT2JqZWN0LnNjcm9sbE9mZnNldCgwLCBzY3JvbGxPZmZzZXQpOyAvLyBVc2UgcGFyZW50IGluZGV4IHRvIHNlZSB0aGUgcGFyZW50IG5vZGUgaW4gdGhlIHZpZXdcclxuXHRcdFx0Ly8oPGFueT50cmVlT2JqZWN0KS51cGRhdGVTY3JvbGxCYXIoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIGluZGV4IG9mIG9ubHkgdGhlIHZpc2libGUoZXhwYW5kZWQpIHJvd3NcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHtBcnJheTxhbnk+fSByb3dzXHJcblx0ICogQHBhcmFtIHtudW1iZXJ9IHJvd0luZGV4XHJcblx0ICogQHJldHVybnMge251bWJlcn1cclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZ2V0U2Nyb2xsSW5kZXgocm93czogQXJyYXk8YW55Piwgcm93SW5kZXg6IG51bWJlcik6IG51bWJlcntcclxuXHRcdGxldCBzY3JvbGxJbmRleCA9IDA7XHJcblx0XHRmb3IobGV0IGk9MDsgaTwgcm93cy5sZW5ndGg7IGkrKyl7XHJcblx0XHRcdGlmKHJvd3NbaV0uaW5kZXggPT0gcm93SW5kZXgpe1xyXG5cdFx0XHRcdHNjcm9sbEluZGV4KytcclxuXHRcdFx0XHRyZXR1cm4gc2Nyb2xsSW5kZXg7XHJcblx0XHRcdH1cclxuXHRcdFx0LyppZihyb3dzW2ldLml0ZW0gaW5zdGFuY2VvZiBTZXJpZUdyb3VwKXtcclxuXHRcdFx0XHRpZih0aGlzLmlzVmlzaWJsZVNlcmllR3JvdXBOb2RlKHJvd3NbaV0pID09IGZhbHNlKXtcclxuXHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRzY3JvbGxJbmRleCsrO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgKi9pZihyb3dzW2ldLml0ZW0gaW5zdGFuY2VvZiBTZXJpZUNvbnRhaW5lcil7XHJcblx0XHRcdFx0aWYodGhpcy5pc1Zpc2libGVTZXJpZUdyb3VwTm9kZShyb3dzW2ldKSA9PSBmYWxzZSl7XHJcblx0XHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0c2Nyb2xsSW5kZXgrKztcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIGlmKHJvd3NbaV0uaXRlbSBpbnN0YW5jZW9mIFNlcmllTm9kZSl7XHJcblx0XHRcdFx0aWYodGhpcy5pc1Zpc2libGVTZXJpZU5vZGUocm93c1tpXSkgPT0gZmFsc2Upe1xyXG5cdFx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHNjcm9sbEluZGV4Kys7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBzY3JvbGxJbmRleDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldCB1bmlxdWUgaWQgZm9yIGltcG9ydGVkIGRhdGFcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHtTZXJpZUNvbnRhaW5lcn0gc2VyaWVDb250YWluZXJcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgc2V0Q29udGFpbmVySWQoc2VyaWVDb250YWluZXI6IFNlcmllQ29udGFpbmVyKSB7XHJcblx0XHRzZXJpZUNvbnRhaW5lci5pZCA9IHRoaXMuZ2V0VW5pcXVlSWQoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgYSB1bmlxdWUgaWQgZm9yIHRoZSBpbXBvcnRlZCBzZXJpZUNvbnRhaW5lclxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcmV0dXJuc1xyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBnZXRVbmlxdWVJZCgpIHtcclxuXHRcdGxldCBpbXBvcnRlZERhdGFJZHMgPSB0aGlzLmdldEltcG9ydGVkRGF0YUlkcygpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9MDsgaSA8IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgaWQgPSBpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIGlmKGltcG9ydGVkRGF0YUlkcy5pbmNsdWRlcyhpZCkgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJObyB1bmlxdWUgaWQgZm9yIHNlcmllQ29udGFpbmVyIGF2YWlsYWJsZSFcIik7XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIGFuIGFycmF5IG9mIGFsbCBpZHMgZnJvbSB0aGUgaW1wb3J0ZWQgZnJvbSBmaWxlIGNhdGVnb3J5IFxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcmV0dXJucyB7QXJyYXk8c3RyaW5nPn1cclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZ2V0SW1wb3J0ZWREYXRhSWRzKCk6IEFycmF5PHN0cmluZz4ge1xyXG5cdFx0bGV0IGlkczogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG5cdFx0bGV0IHNpZ25hbENhdGVnb3J5ID0gKDxJU2lnbmFsTWFuYWdlckRhdGFNb2RlbD50aGlzLl9kYXRhTW9kZWwpLmdldFNpZ25hbENhdGVnb3J5KFNpZ25hbENhdGVnb3J5LkNhdGVnb3J5SWRJbXBvcnRlZCk7XHJcblx0XHRzaWduYWxDYXRlZ29yeSEuZ2V0Q2hpbGRzKCkuZm9yRWFjaChjaGlsZCA9PiB7XHJcblx0XHRcdGlkcy5wdXNoKChjaGlsZCBhcyBTZXJpZUNvbnRhaW5lcikuaWQpO1xyXG5cdFx0fSk7XHJcblx0XHRyZXR1cm4gaWRzO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBpc1Zpc2libGVTZXJpZUdyb3VwTm9kZShub2RlKTogYm9vbGVhbntcclxuXHRcdGlmKG5vZGUucGFyZW50SXRlbSAhPSBudWxsKXtcclxuXHRcdFx0aWYobm9kZS5wYXJlbnRJdGVtLmV4cGFuZFN0YXRlID09IGZhbHNlKXtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSBpZihub2RlLnBhcmVudEl0ZW0ucGFyZW50SXRlbSAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHRcdGlmKG5vZGUucGFyZW50SXRlbS5wYXJlbnRJdGVtLmV4cGFuZFN0YXRlID09IGZhbHNlKXtcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBpc1Zpc2libGVTZXJpZU5vZGUobm9kZSk6IGJvb2xlYW57XHJcblx0XHRpZihub2RlLnBhcmVudEl0ZW0uZXhwYW5kU3RhdGUgPT0gZmFsc2UgfHwgbm9kZS5wYXJlbnRJdGVtLnBhcmVudEl0ZW0uZXhwYW5kU3RhdGUgPT0gZmFsc2Upe1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmKG5vZGUucGFyZW50SXRlbS5wYXJlbnRJdGVtLnBhcmVudEl0ZW0gIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0aWYobm9kZS5wYXJlbnRJdGVtLnBhcmVudEl0ZW0ucGFyZW50SXRlbS5leHBhbmRTdGF0ZSA9PSBmYWxzZSl7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgdHJlZUdyaWROb2RlRXhwYW5kZWRPckNvbGxhcHNlZCgpe1xyXG4gICAgICAgIC8vIFJlZnJlc2ggdG8gc2VlIGNvcnJlY3QgZXhwYW5kZWQvY29sbGFwc2VkIGljb25cclxuXHRcdHRoaXMucmVmcmVzaCgpO1xyXG5cdFx0Ly9QZXJzaXN0IGRhdGEgbW9kZWwgKGV4cGFuZFN0YXRlKVxyXG5cdFx0aWYgKHRoaXMuX2RhdGFNb2RlbCAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdCg8YW55PnRoaXMuX2RhdGFNb2RlbCkuc2F2ZVNldHRpbmdzKCk7XHJcblx0XHR9XHJcblx0XHR0aGlzLnNhdmVUcmVlR3JpZFNldHRpbmdzKCk7XHJcbiAgICB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIGNvbHVtbiB0ZW1wbGF0ZSBpbmZvcm1hdGlvbnNcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGNvbHVtbklkXHJcblx0ICogQHJldHVybnMge3N0cmluZ31cclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZ2V0Q29sdW1uVGVtcGxhdGVEYXRhKGNvbHVtbklkOiBzdHJpbmcpIDogc3RyaW5ne1xyXG5cdFx0aWYoY29sdW1uSWQgPT0gU2lnbmFsTWFuYWdlcldpZGdldC5jb2xvckNvbHVtbklkKXtcclxuXHRcdFx0cmV0dXJuIGA8c2NyaXB0IHR5cGU9XCJ0ZXh0L3gtanNyZW5kZXJcIiBpZD1cInNtQ29sb3JDb2x1bW5UZW1wbGF0ZVwiPlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IHN0eWxlPSdoZWlnaHQ6MjBweDtwYWRkaW5nLWxlZnQ6N3B4O3BhZGRpbmctdG9wOjRweDsnIHVuc2VsZWN0YWJsZT0nb24nPlxyXG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9J2UtY2VsbCcgc3R5bGU9J2Rpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOjE3cHg7aGVpZ2h0OjE3cHg7YmFja2dyb3VuZC1jb2xvcjoge3s6I2RhdGFbJ2NvbG9yJ119fTsnIHVuc2VsZWN0YWJsZT0nb24nPjwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDwvc2NyaXB0PmBcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYoY29sdW1uSWQgPT0gU2lnbmFsTWFuYWdlcldpZGdldC5uYW1lQ29sdW1uSWQpe1xyXG5cdFx0XHRyZXR1cm4gYDxzY3JpcHQgdHlwZT1cInRleHQveC1qc3JlbmRlclwiIGlkPVwic21OYW1lQ29sdW1uVGVtcGxhdGVcIj5cclxuXHRcdFx0XHRcdFx0PGRpdiBzdHlsZT0naGVpZ2h0OjIwcHg7JyB1bnNlbGVjdGFibGU9J29uJz5cclxuXHRcdFx0XHRcdFx0XHR7e2lmIGhhc0NoaWxkUmVjb3Jkc319XHJcblx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPSdpbnRlbmQnIHN0eWxlPSdoZWlnaHQ6MXB4OyBmbG9hdDpsZWZ0OyB3aWR0aDp7ezpsZXZlbCoxMH19cHg7IGRpc3BsYXk6aW5saW5lLWJsb2NrOyc+PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0e3tlbHNlICFoYXNDaGlsZFJlY29yZHN9fVxyXG5cdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz0naW50ZW5kJyBzdHlsZT0naGVpZ2h0OjFweDsgZmxvYXQ6bGVmdDsgd2lkdGg6e3s6bGV2ZWwqMTB9fXB4OyBkaXNwbGF5OmlubGluZS1ibG9jazsnPjwvZGl2PlxyXG5cdFx0XHRcdFx0XHRcdHt7L2lmfX1cclxuXHRcdFx0XHRcdFx0XHR7ezojZGF0YVsnaWNvbkRlZmluaXRpb24nXX19XHJcblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz0nZS1jZWxsJyBzdHlsZT0nZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6MTAwJScgdW5zZWxlY3RhYmxlPSdvbic+e3s6I2RhdGFbJ25hbWUnXX19PC9kaXY+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PC9zY3JpcHQ+YDtcclxuXHRcdH1cclxuXHRcdHJldHVybiBcIlwiO1xyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQgKiBSYWlzZXMgdGhlIHNlcmllcyBkb3VibGUgY2xpY2sgZXZlbnRcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHtCYXNlU2VyaWVzfSBzZXJpZXNcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgb25TZXJpZXNEb3VibGVDbGlja2VkKHNlcmllczogQmFzZVNlcmllcykge1xyXG5cdFx0dGhpcy5ldmVudFNlcmllRG91YmxlQ2xpY2tlZC5yYWlzZSh0aGlzLCBzZXJpZXMpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmFpc2VzIHRoZSBjaGFuZ2Ugc2l6ZSBldmVudFxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0ge251bWJlcn0gc2l6ZVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBvbkNoYW5nZVNpemUoc2l6ZTogbnVtYmVyKSB7XHJcblx0XHR0aGlzLmV2ZW50Q2hhbmdlU2l6ZS5yYWlzZSh0aGlzLCBzaXplKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1vdXNlIGlzIG5vdCBvdmVyIHNpZ25hbE1hbmFnZXIgd2hpbGUgZHJhZ2dpbmcgb3BlcmF0aW9uXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge0RyYWdEcm9wQXJnc30gYXJnc1xyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHVibGljIGRyb3BGb2N1c0xvc3QoYXJnczogRHJhZ0Ryb3BBcmdzKSB7XHJcbiAgICAgICAgdGhpcy5yZXNldEhpZ2hsaWdodEFyZWEoKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgU2lnbmFsTWFuYWdlcldpZGdldCB9OyJdfQ==