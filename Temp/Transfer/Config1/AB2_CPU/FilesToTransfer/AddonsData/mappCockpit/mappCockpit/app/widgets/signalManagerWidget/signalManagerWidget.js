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
define(["require", "exports", "../common/treeGridWidgetBase", "../../models/common/signal/serieGroup", "./view/smTreeGridCellEditEvents", "./view/smTreeGridCellEditTemplate", "./view/signalManagerTreeGridToolbar", "../../common/fileProvider", "../../framework/events", "../../common/exportImportHelper", "../common/busyInformation", "../../models/signalManagerDataModel/signalCategory", "../../models/signalManagerDataModel/signalManagerCalculation", "../../models/common/signal/serieContainer", "../../models/common/signal/serieNode", "../common/interfaces/dropInterface", "../common/dragDataObject", "../../models/signalManagerDataModel/signalManagerCalculationInputData", "../../models/signalManagerDataModel/signalManagerCalculationOutputData", "../common/imageProvider", "../common/dragDropRepresentation", "../../models/signalManagerDataModel/signalManagerCalculatorType", "../../models/chartManagerDataModel/seriesType", "./helpers/exportHelper", "../common/alertDialog", "../../models/signalManagerDataModel/signalRoot"], function (require, exports, treeGridWidgetBase_1, serieGroup_1, smTreeGridCellEditEvents_1, smTreeGridCellEditTemplate_1, signalManagerTreeGridToolbar_1, fileProvider_1, events_1, exportImportHelper_1, busyInformation_1, signalCategory_1, signalManagerCalculation_1, serieContainer_1, serieNode_1, dropInterface_1, dragDataObject_1, signalManagerCalculationInputData_1, signalManagerCalculationOutputData_1, imageProvider_1, dragDropRepresentation_1, signalManagerCalculatorType_1, seriesType_1, exportHelper_1, alertDialog_1, signalRoot_1) {
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
            _this._messageBoxContent = "This action will permanently delete selected elements.";
            _this._messageBoxHeader = "Delete recorded data?";
            _this._indexesDragged = [];
            _this._fileProvider = new fileProvider_1.FileProvider();
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
        SignalManagerWidget.prototype.dispose = function () {
            this.dataModel.clear();
            this.removeSupportedDragDropDataId(dropInterface_1.DragDropDataId.signal);
            _super.prototype.dispose.call(this);
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
            this.refresh(this.dataModel.data);
            var treeGridObj = this.getTreeGridObject();
            this.updateSerieSelection(treeGridObj, this._indexesDragged);
        };
        SignalManagerWidget.prototype.dragStop = function (args) {
            var series = args.data;
            // Remove possible dropLocations
            this.removeDropLocations(series);
            // Update treeGrid
            this.refresh(this.dataModel.data);
            var treeGridObj = this.getTreeGridObject();
            this.updateSerieSelection(treeGridObj, this._indexesDragged);
        };
        SignalManagerWidget.prototype.dragOver = function (args) {
            var calculationInputItem = this.getCalculationInputFromDropLocation(args.currentTarget);
            this.resetDraggedOverFlag(this.dataModel.data);
            if (calculationInputItem != undefined && calculationInputItem.dropPossible == true) {
                this.addHighlightedArea(args.currentTarget);
                calculationInputItem.draggedOver = true;
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
                    calculationInputTarget.draggedOver = false;
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
            var left = currentTarget.offsetLeft;
            if (this.getScrollBarWidth() != 0) {
                left = left - 0.5;
            }
            var highlightElem = $('<div id="' + this._highlightAreaId + '" style=" pointer-events:none; position:absolute; " class="draggedOver"></div>');
            this.resetHighlightArea(highlightElem);
            $(currentTarget).append(highlightElem);
            highlightElem.css('top', currentTarget.offsetTop);
            highlightElem.css('left', left);
            highlightElem.css('height', currentTarget.offsetHeight);
            highlightElem.css('width', currentTarget.offsetWidth);
        };
        /**
         * Sets the draggedOver flag of all SignalInput to false
         *
         * @private
         * @param {*} data
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.resetDraggedOverFlag = function (data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i] instanceof signalManagerCalculationInputData_1.SignalManagerCalculationInputData) {
                    data[i].draggedOver = false;
                }
                else if (data[i].type == serieNode_1.NodeType.container) {
                    this.resetDraggedOverFlag(data[i].getChilds());
                }
            }
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
            this.refresh(this.dataModel.data);
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
        /**
         * Refreshes the tree grid
         *
         * @private
         * @param {ISignalManagerDataModel} data
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.refresh = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var treegridObj, i, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 6, , 7]);
                            treegridObj = this.getTreeGridObject();
                            if (!(treegridObj.model.isEdit == false)) return [3 /*break*/, 1];
                            //To refresh TreeGrid with new datasource
                            this.setModel(data);
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
                                this.setModel(data);
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
                }, selectionType: 'multiple', expanded: function (args) { return _this.treeGridNodeExpandedOrCollapsed(); }, collapsed: function (args) { return _this.treeGridNodeExpandedOrCollapsed(); }, recordClick: function (args) { return _this.click(args); }, recordDoubleClick: function (args) { return _this.doubleClick(args); }, rowSelected: function (args) { return _this.rowSelected(args.data.item, args.model.selectedItems); }, create: function (args) { return _this.treeGridCreated(); }, actionBegin: function (args) { return _this.treeGridActionBegin(args); }, actionComplete: function (args) { return _this.treeGridActionComplete(args); }, queryCellInfo: function (args) { return _this.treeGridQueryCellInfo(args); } }));
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
            // update toolbar buttons
            if (treeObj.model.flatRecords[actualSelectedRowIndex] != undefined) {
                this.updateToolbarButtonStates(treeObj.model.flatRecords[actualSelectedRowIndex].item);
            }
            else {
                this.updateToolbarButtonStates(undefined);
            }
        };
        SignalManagerWidget.prototype.rowSelected = function (item, selectedItems) {
            if (selectedItems.length > 1) {
                var selectedItem = void 0;
                for (var i = 0; i < selectedItems.length; i++) {
                    var isExportable = new exportHelper_1.ExportHelper().isElementExportable(selectedItems[i].item);
                    if (!isExportable) {
                        selectedItem = selectedItems[i];
                    }
                    else {
                        selectedItem = selectedItems[i];
                        break;
                    }
                }
                this.updateToolbarButtonStates(selectedItem.item);
            }
            else {
                this.updateToolbarButtonStates(item);
            }
        };
        /**
         * updates the toolbar buttons(e.g. insert calulation only enabled on SerieGroup or under "Calculated signals" category)
         *
         * @private
         * @param {ISerieNode} item
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.updateToolbarButtonStates = function (item) {
            if (item == undefined) {
                this._toolbar.disableExportButton(true);
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
                // TODO: Open edit cell on calculator type
                /*if(calculation.childs[0] instanceof SignalManagerCalculatorType){
                    let calcType = calculation.childs[0] as SignalManagerCalculatorType;
                    let treeObject = this.getTreeGridObject();
                    //treeObject.selectCells();
                        //treeObject.editCell(0, 'Test');
                }*/
            }
            return undefined;
        };
        SignalManagerWidget.prototype.addCalculationToContainer = function (container) {
            var calculation = new signalManagerCalculation_1.SignalManagerCalculation("Calculation");
            this._serieContainerToSelectAfterRefresh = calculation;
            container.addSerieContainer(calculation, -1);
            return calculation;
        };
        SignalManagerWidget.prototype.activateEditMode = function (activate) {
            if (this.editModeActive != activate) {
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
                this.refresh(this.dataModel.data);
            }
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
         * Creates a message box that lets user decide to delete selected data or not
         *
         * @param {*} deletedItems
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.showMessageBoxForDeletingItem = function (deletedItems) {
            var deferred = jQuery.Deferred();
            var self = this;
            new alertDialog_1.AlertDialog().createMessageBox(this._messageBoxHeader, this._messageBoxContent, alertDialog_1.messageBoxType.CancelDelete, deferred);
            $.when(deferred).done(function () {
                self.deleteItems(deletedItems);
            });
        };
        SignalManagerWidget.prototype.deleteItems = function (items) {
            for (var i = 0; i < items.length; i++) {
                this.deleteItem(items[i].item);
            }
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
            setTimeout(function () { return _this.exportData(elements); }, 200);
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
            this._fileProvider.uploadData(".csv", true); // Only show/accept *.csv files
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
            var _this = this;
            this.setBusyInformation(new busyInformation_1.BusyInformation("Importing data...", busyInformation_1.ImageId.defaultImage, 48, true));
            this.setBusy(true);
            // Timeout needed to show the busyscreen before importing data 
            setTimeout(function () { return _this.importData(sender, args); }, 200);
            this._fileProvider.eventUploadDataFinished.detach(this._uploadDataFinishedHandler);
        };
        /**
         * Exports the given signal group to TraceData.csv file
         *
         * @private
         * @param { Array<ExportSerieGroup>} elements
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.exportData = function (elements) {
            var data = exportImportHelper_1.ExportImportHelper.exportTraceData(elements);
            if (data !== undefined) {
                var blob = new Blob([data], { type: "text/csv" });
                fileProvider_1.FileProvider.downloadData("TraceData.csv", blob);
            }
            this.setBusy(false);
        };
        /**
         * imports the given filedata with the given filename to the signal manager datamodel
         *
         * @private
         * @param {HTMLInputElement} fileInputElement
         * @param {Map<string, string>} fileContents
         * @memberof SignalManagerWidget
         */
        SignalManagerWidget.prototype.importData = function (fileInputElement, fileContents) {
            var _this = this;
            fileContents.forEach(function (fileData, filename) {
                var serieGroups = exportImportHelper_1.ExportImportHelper.importTraceData(fileData, filename);
                var signalFile = new serieContainer_1.SerieContainer(filename);
                serieGroups.forEach(function (serieGroup) {
                    signalFile.addSerieContainer(serieGroup, -1);
                });
                _this._serieContainerToSelectAfterRefresh = signalFile;
                _this._dataModel.addSerieContainer(signalFile, signalCategory_1.SignalCategory.CategoryIdImported);
            });
            this.setBusy(false);
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
            this.refresh(this.dataModel.data);
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
        Object.defineProperty(SignalManagerWidget.prototype, "availableDataPoints", {
            /**
             * Sets the available trace datapoints to the signal manager widget
             *
             * @memberof SignalManagerWidget
             */
            set: function (availableTraceDataPoints) {
                var _this = this;
                availableTraceDataPoints.changed(function (dataPoints) {
                    _this._availableTraceDataPoints = dataPoints;
                });
            },
            enumerable: true,
            configurable: true
        });
        SignalManagerWidget.prototype.dropFocusLost = function (args) {
            this.resetDraggedOverFlag(this.dataModel.data);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsTWFuYWdlcldpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9zaWduYWxNYW5hZ2VyV2lkZ2V0L3NpZ25hbE1hbmFnZXJXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBcUNBO1FBQXNDLDJDQUE0QztRQUFsRjs7UUFBb0YsQ0FBQztRQUFELDhCQUFDO0lBQUQsQ0FBQyxBQUFyRixDQUFzQyxtQkFBVSxHQUFxQztJQUFBLENBQUM7SUFDdEY7UUFBOEIsbUNBQXdDO1FBQXRFOztRQUF3RSxDQUFDO1FBQUQsc0JBQUM7SUFBRCxDQUFDLEFBQXpFLENBQThCLG1CQUFVLEdBQWlDO0lBQUEsQ0FBQztJQUUxRTtRQUFrQyx1Q0FBa0I7UUFBcEQ7WUFBQSxxRUEwMENDO1lBajBDaUIsc0JBQWdCLEdBQUcsMkJBQTJCLENBQUM7WUFDL0Msd0JBQWtCLEdBQUcsd0RBQXdELENBQUM7WUFDOUUsdUJBQWlCLEdBQUcsdUJBQXVCLENBQUE7WUFFcEQscUJBQWUsR0FBa0IsRUFBRSxDQUFDO1lBVXBDLG1CQUFhLEdBQUcsSUFBSSwyQkFBWSxFQUFFLENBQUM7WUFFcEMsb0JBQWMsR0FBWSxLQUFLLENBQUM7WUFLdkMsNkJBQXVCLEdBQUcsSUFBSSx1QkFBdUIsRUFBRSxDQUFDO1lBRXhELHFCQUFlLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztZQUVoQyxnQ0FBMEIsR0FBRyxVQUFDLE1BQU0sRUFBQyxJQUFJLElBQUcsT0FBQSxLQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxFQUF0QyxDQUFzQyxDQUFDOztRQXd5QzVGLENBQUM7UUEveENBLHNCQUFJLGlEQUFnQjtZQVBwQjs7Ozs7O2VBTUc7aUJBQ0g7Z0JBQ0MsT0FBTyxJQUFJLENB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Q0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzlCLENBQUM7UUF2MENKLHFCQUFxQjtRQUNFLGdDQUFZLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLGlDQUFhLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLHVDQUFtQixHQUFHLGFBQWEsQ0FBQztRQUNwQyxpQ0FBYSxHQUFHLE9BQU8sQ0FBQztRQUN4QiwwQ0FBc0IsR0FBRyxnQkFBZ0IsQ0FBQztRQW0wQ2xFLDBCQUFDO0tBQUEsQUExMENELENBQWtDLHVDQUFrQixHQTAwQ25EO0lBRVEsa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2xpYnMvdWkvVHlwZXMvZWoud2ViLmFsbC5kLnRzXCIgLz5cclxuaW1wb3J0IHsgRXZlbnRNb2RlbENoYW5nZWRBcmdzLCBJRGF0YU1vZGVsIH0gZnJvbSBcIi4uLy4uL21vZGVscy9kYXRhTW9kZWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVHJlZUdyaWRXaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi90cmVlR3JpZFdpZGdldEJhc2VcIjtcclxuaW1wb3J0IHsgU2VyaWVHcm91cCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL3NpZ25hbC9zZXJpZUdyb3VwXCI7XHJcbmltcG9ydCB7IElTaWduYWxNYW5hZ2VyRGF0YU1vZGVsIH0gZnJvbSBcIi4uLy4uL21vZGVscy9kYXRhTW9kZWxzXCI7XHJcbmltcG9ydCB7IFNtVHJlZUdyaWRDZWxsRWRpdEV2ZW50cyB9IGZyb20gXCIuL3ZpZXcvc21UcmVlR3JpZENlbGxFZGl0RXZlbnRzXCI7XHJcbmltcG9ydCB7IFNtVHJlZUdyaWRDZWxsRWRpdFRlbXBsYXRlIH0gZnJvbSBcIi4vdmlldy9zbVRyZWVHcmlkQ2VsbEVkaXRUZW1wbGF0ZVwiO1xyXG5pbXBvcnQgeyBTaWduYWxNYW5hZ2VyVHJlZUdyaWRUb29sYmFyIH0gZnJvbSBcIi4vdmlldy9zaWduYWxNYW5hZ2VyVHJlZUdyaWRUb29sYmFyXCI7XHJcbmltcG9ydCB7IEZpbGVQcm92aWRlciB9IGZyb20gXCIuLi8uLi9jb21tb24vZmlsZVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IFR5cGVkRXZlbnQgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2V2ZW50c1wiO1xyXG5pbXBvcnQgeyBFeHBvcnRJbXBvcnRIZWxwZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2V4cG9ydEltcG9ydEhlbHBlclwiO1xyXG5pbXBvcnQgeyBCdXN5SW5mb3JtYXRpb24sIEltYWdlSWQgfSBmcm9tIFwiLi4vY29tbW9uL2J1c3lJbmZvcm1hdGlvblwiO1xyXG5pbXBvcnQgeyBJU2lnbmFsTWFuYWdlcldpZGdldCB9IGZyb20gXCIuLi93aWRnZXRzXCI7XHJcbmltcG9ydCB7IFNpZ25hbENhdGVnb3J5IH0gZnJvbSBcIi4uLy4uL21vZGVscy9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsL3NpZ25hbENhdGVnb3J5XCI7XHJcbmltcG9ydCB7IFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbiB9IGZyb20gXCIuLi8uLi9tb2RlbHMvc2lnbmFsTWFuYWdlckRhdGFNb2RlbC9zaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25cIjtcclxuaW1wb3J0IHsgSVNlcmllQ29udGFpbmVyIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb21tb24vaW50ZXJmYWNlcy9zZXJpZUNvbnRhaW5lckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJU2VyaWVOb2RlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb21tb24vaW50ZXJmYWNlcy9zZXJpZU5vZGVJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU2VyaWVDb250YWluZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbW1vbi9zaWduYWwvc2VyaWVDb250YWluZXJcIjtcclxuaW1wb3J0IHsgU2VyaWVOb2RlLCBOb2RlVHlwZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29tbW9uL3NpZ25hbC9zZXJpZU5vZGVcIjtcclxuaW1wb3J0IHsgRHJhZ0Ryb3BEYXRhSWQsIElEcm9wcGFibGUgfSBmcm9tIFwiLi4vY29tbW9uL2ludGVyZmFjZXMvZHJvcEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJRHJhZ2dhYmxlIH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL2RyYWdJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgRHJhZ0Ryb3BEYXRhT2JqZWN0IH0gZnJvbSBcIi4uL2NvbW1vbi9kcmFnRGF0YU9iamVjdFwiO1xyXG5pbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvYmFzZVNlcmllc1wiO1xyXG5pbXBvcnQgeyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGEgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvc2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhXCI7XHJcbmltcG9ydCB7IFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbk91dHB1dERhdGEgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvc2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uT3V0cHV0RGF0YVwiO1xyXG5pbXBvcnQgeyBUcmFjZURhdGFQb2ludEluZm8gfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2RpYWdub3N0aWNzL3RyYWNlL3RyYWNlRGF0YVBvaW50SW5mb1wiO1xyXG5pbXBvcnQgeyBQcm9wZXJ0eSB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvcHJvcGVydHlcIjtcclxuaW1wb3J0IHsgSW1hZ2VQcm92aWRlciB9IGZyb20gXCIuLi9jb21tb24vaW1hZ2VQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBEcmFnRHJvcFJlcHJlc2VudGF0aW9uIH0gZnJvbSBcIi4uL2NvbW1vbi9kcmFnRHJvcFJlcHJlc2VudGF0aW9uXCI7XHJcbmltcG9ydCB7IERyYWdEcm9wQXJncyB9IGZyb20gXCIuLi9jb21tb24vZHJhZ0Ryb3BBcmdzXCI7XHJcbmltcG9ydCB7IFNpZ25hbE1hbmFnZXJDYWxjdWxhdG9yVHlwZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvc2lnbmFsTWFuYWdlckRhdGFNb2RlbC9zaWduYWxNYW5hZ2VyQ2FsY3VsYXRvclR5cGVcIjtcclxuaW1wb3J0IHsgU2VyaWVzVHlwZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL3Nlcmllc1R5cGVcIjtcclxuaW1wb3J0IHsgRXhwb3J0U2VyaWVHcm91cCB9IGZyb20gXCIuLi8uLi9jb21tb24vZXhwb3J0U2VyaWVHcm91cFwiO1xyXG5pbXBvcnQgeyBFeHBvcnRIZWxwZXIgfSBmcm9tIFwiLi9oZWxwZXJzL2V4cG9ydEhlbHBlclwiO1xyXG5pbXBvcnQgeyBBbGVydERpYWxvZywgbWVzc2FnZUJveFR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL2FsZXJ0RGlhbG9nXCI7XHJcbmltcG9ydCB7IFNpZ25hbFJvb3QgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvc2lnbmFsUm9vdFwiO1xyXG5cclxuY2xhc3MgRXZlbnRTZXJpZURvdWJsZUNsaWNrZWQgZXh0ZW5kcyBUeXBlZEV2ZW50PElTaWduYWxNYW5hZ2VyV2lkZ2V0LCBCYXNlU2VyaWVzPnsgfTtcclxuY2xhc3MgRXZlbnRDaGFuZ2VTaXplIGV4dGVuZHMgVHlwZWRFdmVudDxJU2lnbmFsTWFuYWdlcldpZGdldCwgbnVtYmVyPnsgfTtcclxuXHJcbmNsYXNzIFNpZ25hbE1hbmFnZXJXaWRnZXQgZXh0ZW5kcyBUcmVlR3JpZFdpZGdldEJhc2UgaW1wbGVtZW50cyBJU2lnbmFsTWFuYWdlcldpZGdldCwgSURyYWdnYWJsZSwgSURyb3BwYWJsZXtcclxuXHRcclxuXHQvLyBjb2x1bW4gZGVmaW5pdGlvbnNcclxuXHRwdWJsaWMgc3RhdGljIHJlYWRvbmx5IG5hbWVDb2x1bW5JZCA9IFwibmFtZVwiO1xyXG5cdHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgdmFsdWVDb2x1bW5JZCA9IFwidmFsdWVcIjtcclxuXHRwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGRlc2NyaXB0aW9uQ29sdW1uSWQgPSBcImRlc2NyaXB0aW9uXCI7XHJcblx0cHVibGljIHN0YXRpYyByZWFkb25seSBjb2xvckNvbHVtbklkID0gXCJjb2xvclwiO1xyXG5cdHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgaWNvbkRlZmluaXRpb25Db2x1bW5JZCA9IFwiaWNvbkRlZmluaXRpb25cIjtcclxuXHJcblx0cHJpdmF0ZSByZWFkb25seSBfaGlnaGxpZ2h0QXJlYUlkID0gXCJzaWduYWxNYW5hZ2VyX0hpZ2hsaWdodGVkXCI7XHJcblx0cHJpdmF0ZSByZWFkb25seSBfbWVzc2FnZUJveENvbnRlbnQgPSBcIlRoaXMgYWN0aW9uIHdpbGwgcGVybWFuZW50bHkgZGVsZXRlIHNlbGVjdGVkIGVsZW1lbnRzLlwiO1xyXG5cdHByaXZhdGUgcmVhZG9ubHkgX21lc3NhZ2VCb3hIZWFkZXIgPSBcIkRlbGV0ZSByZWNvcmRlZCBkYXRhP1wiXHJcblxyXG5cdHByaXZhdGUgX2luZGV4ZXNEcmFnZ2VkOiBBcnJheTxudW1iZXI+ID0gW107XHJcblxyXG5cdHByaXZhdGUgX2N1cnJlbnREcmFnRHJvcFNlcmllcz86IEFycmF5PEJhc2VTZXJpZXM+O1xyXG5cclxuXHRwcml2YXRlIF9jdXJyZW50Q2FsY3VsYXRvclR5cGU/OiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRvclR5cGU7XHJcblxyXG5cdHByaXZhdGUgX3Rvb2xiYXIhOiBTaWduYWxNYW5hZ2VyVHJlZUdyaWRUb29sYmFyO1xyXG5cclxuXHRwcml2YXRlIF9zZXJpZUNvbnRhaW5lclRvU2VsZWN0QWZ0ZXJSZWZyZXNoOiBJU2VyaWVDb250YWluZXJ8dW5kZWZpbmVkO1xyXG5cdFx0XHJcblx0cHJpdmF0ZSBfZmlsZVByb3ZpZGVyID0gbmV3IEZpbGVQcm92aWRlcigpO1xyXG5cclxuXHRwdWJsaWMgZWRpdE1vZGVBY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblx0X2N1cnJlbnRUYXJnZXQ7XHJcblx0cHJpdmF0ZSBfYXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzOiBBcnJheTxUcmFjZURhdGFQb2ludEluZm8+fHVuZGVmaW5lZDtcclxuXHJcblx0ZXZlbnRTZXJpZURvdWJsZUNsaWNrZWQgPSBuZXcgRXZlbnRTZXJpZURvdWJsZUNsaWNrZWQoKTtcclxuXHRcclxuXHRldmVudENoYW5nZVNpemUgPSBuZXcgRXZlbnRDaGFuZ2VTaXplKCk7XHJcblx0XHJcblx0cHJpdmF0ZSBfdXBsb2FkRGF0YUZpbmlzaGVkSGFuZGxlciA9IChzZW5kZXIsYXJncyk9PnRoaXMub25VcGxvYWREYXRhRmluaXNoZWQoc2VuZGVyLGFyZ3MpO1xyXG5cclxuXHQvKipcclxuXHQgKiBHZXRzIHRoZSBpbmZvcm1hdGlvbiBpZiB0aGUgYXV0byB1cGxvYWQgb2YgdHJhY2VkYXRhIGlzIGFjdGl2ZVxyXG5cdCAqXHJcblx0ICogQHJlYWRvbmx5XHJcblx0ICogQHR5cGUge2Jvb2xlYW59XHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRnZXQgYXV0b1VwbG9hZEFjdGl2ZSgpOmJvb2xlYW57XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG4gIFx0LyoqXHJcblx0ICogSW5pdGlhbGl6ZXMgdGhlIHNpZ25hbCBtYW5hZ2VyXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbGF5b3V0Q29udGFpbmVySWRcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdGluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQ6IHN0cmluZyl7XHJcblx0XHRzdXBlci5pbml0aWFsaXplKGxheW91dENvbnRhaW5lcklkLCAzMCk7XHJcblx0XHRzdXBlci5zZXRIZWFkZXJDb250ZW50KFwiU2lnbmFsc1wiKTtcclxuXHJcblx0XHQvLyBTZXQgZHluYW1pYyBjb2x1bW4gc2V0dGluZ3NcclxuXHRcdHN1cGVyLnNldER5bmFtaWNDb2x1bW4oMCwgNDApO1xyXG5cclxuXHRcdC8vIEFkZCBkcmFnIHN1cHBvcnRcclxuXHRcdHN1cGVyLmFkZERyYWdnaW5nU3VwcG9ydCgpO1xyXG5cdFx0XHJcblx0XHQvLyBBZGQgZHJvcCBzdXBwb3J0XHJcblx0XHRzdXBlci5hZGRTdXBwb3J0ZWREcmFnRHJvcERhdGFJZChEcmFnRHJvcERhdGFJZC5zaWduYWwpXHJcblx0fVxyXG5cclxuXHRkaXNwb3NlKCl7XHJcblx0XHQoPElTaWduYWxNYW5hZ2VyRGF0YU1vZGVsPnRoaXMuZGF0YU1vZGVsKS5jbGVhcigpO1xyXG5cdFx0dGhpcy5yZW1vdmVTdXBwb3J0ZWREcmFnRHJvcERhdGFJZChEcmFnRHJvcERhdGFJZC5zaWduYWwpO1xyXG5cdFx0c3VwZXIuZGlzcG9zZSgpO1xyXG5cdH1cclxuXHJcblx0Ly8jcmVnaW9uIGRyYWcgc3VwcG9ydFxyXG5cdHN0YXJ0RHJhZ2dpbmcoKTogRHJhZ0Ryb3BEYXRhT2JqZWN0fHVuZGVmaW5lZHtcclxuXHRcdGlmKHRoaXMuX2N1cnJlbnREcmFnRHJvcFNlcmllcyAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHRsZXQgc2lnbmFsSW1hZ2UsXHJcblx0XHRcdFx0c2lnbmFsTmFtZTtcclxuXHRcdFx0aWYgKHRoaXMuX2N1cnJlbnREcmFnRHJvcFNlcmllcy5sZW5ndGggPT0gMSkge1xyXG5cdFx0XHRcdC8vIERlZmF1bHQgeXQgc2VyaWVzIHN2Z1xyXG5cdFx0XHRcdHNpZ25hbE5hbWUgPSB0aGlzLl9jdXJyZW50RHJhZ0Ryb3BTZXJpZXNbMF0ubmFtZTtcclxuXHRcdFx0XHRzaWduYWxJbWFnZSA9IEltYWdlUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXRJbWFnZShcIi4uL2FwcC93aWRnZXRzL2NvbW1vbi9zdHlsZS9pbWFnZXMvZHJhZ0Ryb3AveXRTZXJpZXMuc3ZnXCIpO1xyXG5cdFx0XHRcdGlmKHRoaXMuX2N1cnJlbnREcmFnRHJvcFNlcmllc1swXS50eXBlID09IFNlcmllc1R5cGUueHlTZXJpZXMpe1xyXG5cdFx0XHRcdFx0Ly8gVXNlIHh5IHNlcmllcyBzdmdcclxuXHRcdFx0XHRcdHNpZ25hbEltYWdlID0gSW1hZ2VQcm92aWRlci5nZXRJbnN0YW5jZSgpLmdldEltYWdlKFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9kcmFnRHJvcC94eVNlcmllcy5zdmdcIik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2UgaWYodGhpcy5fY3VycmVudERyYWdEcm9wU2VyaWVzWzBdLnR5cGUgPT0gU2VyaWVzVHlwZS5mZnRTZXJpZXMpe1xyXG5cdFx0XHRcdFx0Ly8gVXNlIGZmdCBzZXJpZXMgc3ZnXHJcblx0XHRcdFx0XHRzaWduYWxJbWFnZSA9IEltYWdlUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXRJbWFnZShcIi4uL2FwcC93aWRnZXRzL2NvbW1vbi9zdHlsZS9pbWFnZXMvZHJhZ0Ryb3AvZmZ0U2VyaWVzLnN2Z1wiKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYoc2lnbmFsSW1hZ2UgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0XHRcdC8vIFJlcGxhY2Ugc2VyaWUgY29sb3IgaW4gc3ZnIHdpdGggY29sb3Igb2YgY3VycmVudCBzZXJpZVxyXG5cdFx0XHRcdFx0c2lnbmFsSW1hZ2UgPSBzaWduYWxJbWFnZS5yZXBsYWNlKFwic3Ryb2tlOiM3NmJlYTZcIiwgXCJzdHJva2U6XCIgKyB0aGlzLl9jdXJyZW50RHJhZ0Ryb3BTZXJpZXNbMF0uY29sb3IpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRpZih0aGlzLl9jdXJyZW50RHJhZ0Ryb3BTZXJpZXNbMF0udHlwZSA9PSBTZXJpZXNUeXBlLnh5U2VyaWVzKXtcclxuXHRcdFx0XHRcdHNpZ25hbEltYWdlID0gSW1hZ2VQcm92aWRlci5nZXRJbnN0YW5jZSgpLmdldEltYWdlKFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9kcmFnRHJvcC9zZXZlcmFsWFlTZXJpZXMuc3ZnXCIpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIGlmKHRoaXMuX2N1cnJlbnREcmFnRHJvcFNlcmllc1swXS50eXBlID09IFNlcmllc1R5cGUuZmZ0U2VyaWVzKXtcclxuXHRcdFx0XHRcdHNpZ25hbEltYWdlID0gSW1hZ2VQcm92aWRlci5nZXRJbnN0YW5jZSgpLmdldEltYWdlKFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9kcmFnRHJvcC9zZXZlcmFsRkZUU2VyaWVzLnN2Z1wiKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRzaWduYWxJbWFnZSA9IEltYWdlUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXRJbWFnZShcIi4uL2FwcC93aWRnZXRzL2NvbW1vbi9zdHlsZS9pbWFnZXMvZHJhZ0Ryb3Avc2V2ZXJhbFlUU2VyaWVzLnN2Z1wiKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0bGV0IGRyYWdEcm9wSWNvblJlcHJlc2VudGF0aW9uID0gbmV3IERyYWdEcm9wUmVwcmVzZW50YXRpb24oKTtcclxuXHRcdFx0ZHJhZ0Ryb3BJY29uUmVwcmVzZW50YXRpb24uaWNvbkxpc3QucHVzaChzaWduYWxJbWFnZSk7XHJcblx0XHRcdGRyYWdEcm9wSWNvblJlcHJlc2VudGF0aW9uLnRleHRMaXN0LnB1c2goc2lnbmFsTmFtZSk7XHJcblx0XHRcdHJldHVybiBuZXcgRHJhZ0Ryb3BEYXRhT2JqZWN0KERyYWdEcm9wRGF0YUlkLnNpZ25hbCwgdGhpcy5fY3VycmVudERyYWdEcm9wU2VyaWVzLCBkcmFnRHJvcEljb25SZXByZXNlbnRhdGlvbik7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xyXG5cdH1cclxuXHRcclxuXHRkcmFnZ2luZ1N0b3BwZWQoKXtcclxuXHRcdC8vIFJlc2V0IGN1cnJlbnQgZHJhZyBkcm9wIHNpZ25hbFxyXG5cdFx0dGhpcy5fY3VycmVudERyYWdEcm9wU2VyaWVzID0gdW5kZWZpbmVkO1xyXG5cdFx0dGhpcy5fY3VycmVudENhbGN1bGF0b3JUeXBlID0gdW5kZWZpbmVkO1xyXG5cdFx0dGhpcy5faW5kZXhlc0RyYWdnZWQgPSBbXTtcclxuXHR9XHJcblx0Ly8jZW5kcmVnaW9uXHJcblxyXG5cdC8vI3JlZ2lvbiBkcm9wIHN1cHBvcnRcclxuXHRwcml2YXRlIGFkZERyb3BMb2NhdGlvbnMoc2VyaWVzOiBBcnJheTxCYXNlU2VyaWVzPil7XHJcbiAgICAgICAgaWYgKHNlcmllc1swXS5wYXJlbnQgIT0gdW5kZWZpbmVkICYmIHNlcmllcy5sZW5ndGggPT0gMSkge1xyXG5cdFx0XHRzZXJpZXNbMF0ucGFyZW50LnZpc2libGVDaGlsZHMhLmZvckVhY2goY2hpbGQgPT4ge1xyXG5cdFx0XHRcdGlmKGNoaWxkIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uKXtcclxuXHRcdFx0XHRcdGNoaWxkLnNldERyb3BMb2NhdGlvbnModHJ1ZSwgc2VyaWVzWzBdKTtcclxuXHRcdFx0XHR9XHRcdFx0XHRcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHJlbW92ZURyb3BMb2NhdGlvbnMoc2VyaWVzOiBBcnJheTxCYXNlU2VyaWVzPil7XHJcblx0XHRpZiAoc2VyaWVzWzBdLnBhcmVudCAhPSB1bmRlZmluZWQgJiYgc2VyaWVzLmxlbmd0aCA9PSAxKSB7XHJcblx0XHRcdHNlcmllc1swXS5wYXJlbnQudmlzaWJsZUNoaWxkcyEuZm9yRWFjaChjaGlsZCA9PiB7XHJcblx0XHRcdFx0aWYoY2hpbGQgaW5zdGFuY2VvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb24pe1xyXG5cdFx0XHRcdFx0Y2hpbGQuc2V0RHJvcExvY2F0aW9ucyhmYWxzZSwgc2VyaWVzWzBdKTtcclxuXHRcdFx0XHR9XHRcdFx0XHRcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRkcmFnU3RhcnQoYXJnczogRHJhZ0Ryb3BBcmdzKSB7XHJcblx0XHRsZXQgc2VyaWVzID0gYXJncy5kYXRhIGFzIEFycmF5PEJhc2VTZXJpZXM+O1xyXG5cdFx0XHJcblx0XHQvLyBBZGQgcG9zc2libGUgZHJvcExvY2F0aW9uc1xyXG5cdFx0dGhpcy5hZGREcm9wTG9jYXRpb25zKHNlcmllcyk7XHJcblx0XHRcclxuXHRcdC8vIFVwZGF0ZSB0cmVlR3JpZFxyXG5cdFx0dGhpcy5yZWZyZXNoKHRoaXMuZGF0YU1vZGVsLmRhdGEpO1xyXG5cclxuXHRcdGxldCB0cmVlR3JpZE9iaiA9IHRoaXMuZ2V0VHJlZUdyaWRPYmplY3QoKTtcclxuXHRcdHRoaXMudXBkYXRlU2VyaWVTZWxlY3Rpb24odHJlZUdyaWRPYmosIHRoaXMuX2luZGV4ZXNEcmFnZ2VkKTtcclxuXHR9XHJcblxyXG5cdGRyYWdTdG9wKGFyZ3M6IERyYWdEcm9wQXJncykge1xyXG5cdFx0bGV0IHNlcmllcyA9IGFyZ3MuZGF0YSBhcyBBcnJheTxCYXNlU2VyaWVzPjtcclxuXHRcdFxyXG5cdFx0Ly8gUmVtb3ZlIHBvc3NpYmxlIGRyb3BMb2NhdGlvbnNcclxuXHRcdHRoaXMucmVtb3ZlRHJvcExvY2F0aW9ucyhzZXJpZXMpO1xyXG5cclxuXHRcdC8vIFVwZGF0ZSB0cmVlR3JpZFxyXG5cdFx0dGhpcy5yZWZyZXNoKHRoaXMuZGF0YU1vZGVsLmRhdGEpO1xyXG5cdFx0XHJcblx0XHRsZXQgdHJlZUdyaWRPYmogPSB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCk7XHJcblx0XHR0aGlzLnVwZGF0ZVNlcmllU2VsZWN0aW9uKHRyZWVHcmlkT2JqLCB0aGlzLl9pbmRleGVzRHJhZ2dlZCk7XHJcblx0fVxyXG5cclxuXHRkcmFnT3ZlcihhcmdzOiBEcmFnRHJvcEFyZ3MpOiBib29sZWFuIHtcclxuXHRcdGxldCBjYWxjdWxhdGlvbklucHV0SXRlbSA9ICB0aGlzLmdldENhbGN1bGF0aW9uSW5wdXRGcm9tRHJvcExvY2F0aW9uKGFyZ3MuY3VycmVudFRhcmdldCk7XHJcblx0XHR0aGlzLnJlc2V0RHJhZ2dlZE92ZXJGbGFnKHRoaXMuZGF0YU1vZGVsLmRhdGEpO1xyXG5cdFx0XHJcblx0XHRpZihjYWxjdWxhdGlvbklucHV0SXRlbSAhPSB1bmRlZmluZWQgJiYgY2FsY3VsYXRpb25JbnB1dEl0ZW0uZHJvcFBvc3NpYmxlID09IHRydWUpe1xyXG5cdFx0XHR0aGlzLmFkZEhpZ2hsaWdodGVkQXJlYShhcmdzLmN1cnJlbnRUYXJnZXQpO1xyXG5cdFx0XHRjYWxjdWxhdGlvbklucHV0SXRlbS5kcmFnZ2VkT3ZlciA9IHRydWU7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHRoaXMucmVzZXRIaWdobGlnaHRBcmVhKCk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHRkcm9wKGFyZ3M6IERyYWdEcm9wQXJncykge1xyXG5cdFx0bGV0IHNlcmllcyA9IGFyZ3MuZGF0YVswXSBhcyBCYXNlU2VyaWVzO1xyXG5cdFx0bGV0IGNhbGN1bGF0aW9uSW5wdXRUYXJnZXQgPSAgdGhpcy5nZXRDYWxjdWxhdGlvbklucHV0RnJvbURyb3BMb2NhdGlvbihhcmdzLmN1cnJlbnRUYXJnZXQpO1xyXG5cdFx0bGV0IGNhbGN1bGF0aW9uSW5wdXREcmFnZ2VkSXRlbSA9IHRoaXMuZ2V0Q2FsY3VsYXRpb25JbnB1dERyYWdnZWQoc2VyaWVzKTtcclxuXHJcblx0XHRpZihjYWxjdWxhdGlvbklucHV0VGFyZ2V0ICE9IHVuZGVmaW5lZCAmJiBjYWxjdWxhdGlvbklucHV0VGFyZ2V0LmRyb3BQb3NzaWJsZSA9PSB0cnVlKXtcclxuXHRcdFx0aWYoc2VyaWVzICE9IHVuZGVmaW5lZCl7XHJcblx0XHRcdFx0Y2FsY3VsYXRpb25JbnB1dFRhcmdldC5kcmFnZ2VkT3ZlciA9IGZhbHNlO1xyXG5cdFx0XHRcdC8vRXhjaGFuZ2Ugb2Ygc2VyaWUgaWYgdGhlIGRyYWdnZWQgc2VyaWUgaXMgaW5zaWRlIHRoZSBjYWxjdWxhdG9yXHJcblx0XHRcdFx0aWYgKHRoaXMuX2N1cnJlbnRDYWxjdWxhdG9yVHlwZSA9PSBjYWxjdWxhdGlvbklucHV0VGFyZ2V0LnBhcmVudCAmJiBjYWxjdWxhdGlvbklucHV0RHJhZ2dlZEl0ZW0gIT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHRsZXQgb2xkVmFsdWUgPSBjYWxjdWxhdGlvbklucHV0VGFyZ2V0LnZhbHVlO1xyXG5cdFx0XHRcdFx0Y2FsY3VsYXRpb25JbnB1dERyYWdnZWRJdGVtIS52YWx1ZSA9IG9sZFZhbHVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRjYWxjdWxhdGlvbklucHV0VGFyZ2V0LnZhbHVlID0gc2VyaWVzLm5hbWU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgYSA8ZGl2PiBpbnRvIHRoZSBjZWxsIHdoZW4gZHJvcHBhYmxlIGlzIHBvc3NpYmxlIGFuZCBzaWduYWwgaXMgYmVpbmcgZHJhZ2dlZCBvdmVyXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7Kn0gY3VycmVudFRhcmdldFxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBhZGRIaWdobGlnaHRlZEFyZWEoY3VycmVudFRhcmdldCkge1xyXG5cdFx0bGV0IGxlZnQgPSBjdXJyZW50VGFyZ2V0Lm9mZnNldExlZnQ7XHJcblx0XHRpZiAodGhpcy5nZXRTY3JvbGxCYXJXaWR0aCgpICE9IDApIHtcclxuXHRcdFx0bGVmdCA9IGxlZnQgLSAwLjU7XHJcblx0XHR9XHJcblx0XHRsZXQgaGlnaGxpZ2h0RWxlbSA9ICQoJzxkaXYgaWQ9XCInKyB0aGlzLl9oaWdobGlnaHRBcmVhSWQgKydcIiBzdHlsZT1cIiBwb2ludGVyLWV2ZW50czpub25lOyBwb3NpdGlvbjphYnNvbHV0ZTsgXCIgY2xhc3M9XCJkcmFnZ2VkT3ZlclwiPjwvZGl2PicpO1xyXG5cdFx0dGhpcy5yZXNldEhpZ2hsaWdodEFyZWEoaGlnaGxpZ2h0RWxlbSk7XHJcblx0XHQkKGN1cnJlbnRUYXJnZXQpLmFwcGVuZChoaWdobGlnaHRFbGVtKTtcclxuXHJcblx0XHRoaWdobGlnaHRFbGVtLmNzcygndG9wJywgY3VycmVudFRhcmdldC5vZmZzZXRUb3ApO1xyXG5cdFx0aGlnaGxpZ2h0RWxlbS5jc3MoJ2xlZnQnLCBsZWZ0KTtcclxuXHRcdGhpZ2hsaWdodEVsZW0uY3NzKCdoZWlnaHQnLCBjdXJyZW50VGFyZ2V0Lm9mZnNldEhlaWdodCk7XHJcblx0XHRoaWdobGlnaHRFbGVtLmNzcygnd2lkdGgnLCBjdXJyZW50VGFyZ2V0Lm9mZnNldFdpZHRoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGRyYWdnZWRPdmVyIGZsYWcgb2YgYWxsIFNpZ25hbElucHV0IHRvIGZhbHNlXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7Kn0gZGF0YVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSByZXNldERyYWdnZWRPdmVyRmxhZyhkYXRhKSB7XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYgKGRhdGFbaV0gaW5zdGFuY2VvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGEpe1xyXG5cdFx0XHRcdGRhdGFbaV0uZHJhZ2dlZE92ZXIgPSBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIGlmIChkYXRhW2ldLnR5cGUgPT0gTm9kZVR5cGUuY29udGFpbmVyKSB7XHJcblx0XHRcdFx0dGhpcy5yZXNldERyYWdnZWRPdmVyRmxhZyhkYXRhW2ldLmdldENoaWxkcygpKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlIGFsbCBzaWduYWxNYW5hZ2VyIGhpZ2hsaWdodGVkIGFyZWFzIChleGNlcHQgdGhlIHNlbGVjdGVkIG9uZSlcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHtKUXVlcnk8SFRNTEVsZW1lbnQ+fSBbZWxlbWVudF1cclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgcmVzZXRIaWdobGlnaHRBcmVhIChlbGVtZW50PzogSlF1ZXJ5PEhUTUxFbGVtZW50Pikge1xyXG5cdFx0bGV0IGhpZ2hsaWdodEVsZW0gPSAkKCcjJyArIHRoaXMuX2hpZ2hsaWdodEFyZWFJZCk7XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGhpZ2hsaWdodEVsZW0ubGVuZ3RoOyBpKyspe1xyXG5cdFx0XHRpZiAoZWxlbWVudCA9PSB1bmRlZmluZWQgfHwgaGlnaGxpZ2h0RWxlbVtpXSAhPSBlbGVtZW50WzBdKSB7XHJcblx0XHRcdFx0aGlnaGxpZ2h0RWxlbVtpXS5yZW1vdmUoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBnZXRDYWxjdWxhdGlvbklucHV0RnJvbURyb3BMb2NhdGlvbihjdXJyZW50VGFyZ2V0KTogU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhfHVuZGVmaW5lZHtcclxuXHRcdGxldCByZWNvcmQgPSB0aGlzLmdldFRyZWVSZWNvcmQoY3VycmVudFRhcmdldCk7XHJcbiAgICAgICAgaWYocmVjb3JkICE9IHVuZGVmaW5lZCl7XHJcblx0XHRcdGlmKHJlY29yZC5pdGVtIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhICYmIGN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LnZhbHVlLmluY2x1ZGVzKCdkcm9wTG9jYXRpb25BcmVhJykpe1xyXG5cdFx0XHRcdHJldHVybiByZWNvcmQuaXRlbTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGdldENhbGN1bGF0aW9uSW5wdXREcmFnZ2VkKHNlcmllOiBCYXNlU2VyaWVzKTogU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhIHwgdW5kZWZpbmVke1xyXG5cdFx0aWYgKHRoaXMuX2N1cnJlbnRDYWxjdWxhdG9yVHlwZSAhPSB1bmRlZmluZWQpIHtcclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9jdXJyZW50Q2FsY3VsYXRvclR5cGUhLmdldENoaWxkcygpLmxlbmd0aDsgaSsrKXtcclxuXHRcdFx0XHRpZiAodGhpcy5fY3VycmVudENhbGN1bGF0b3JUeXBlIS5nZXRDaGlsZHMoKVtpXS5zZXJpZSA9PSBzZXJpZSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuX2N1cnJlbnRDYWxjdWxhdG9yVHlwZSEuZ2V0Q2hpbGRzKClbaV0gYXMgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHVuZGVmaW5lZDtcclxuXHR9XHJcblxyXG5cdC8vI2VuZHJlZ2lvblxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBsYXlvdXQgb2YgdGhlIHdpZGdldFxyXG5cdCAqXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRjcmVhdGVMYXlvdXQoKSB7XHJcblx0XHR2YXIgJHdpZGdldENvbnRhaW5lciA9ICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpO1xyXG5cdFx0JHdpZGdldENvbnRhaW5lclswXS5zdHlsZS5vdmVyZmxvdyA9XCJoaWRkZW5cIjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEhhbmRsZXMgdGhlIG1vZGVsIGNoYW5nZXNcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7SURhdGFNb2RlbH0gc2VuZGVyXHJcblx0ICogQHBhcmFtIHtFdmVudE1vZGVsQ2hhbmdlZEFyZ3N9IGV2ZW50QXJnc1xyXG5cdCAqIEByZXR1cm5zIHsqfVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0aGFuZGxlTW9kZWxDaGFuZ2VkKHNlbmRlcjogSURhdGFNb2RlbCwgZXZlbnRBcmdzOiBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MpOiBhbnkge1xyXG5cdFx0dGhpcy5yZWZyZXNoKHRoaXMuZGF0YU1vZGVsLmRhdGEpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVzaXplcyB0aGUgc2lnbmFsIG1hbmFnZXIgd2lkZ2V0XHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge251bWJlcn0gd2lkdGhcclxuXHQgKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0XHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRyZXNpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpe1xyXG5cdFx0c3VwZXIucmVzaXplKHdpZHRoLCBoZWlnaHQpO1xyXG5cclxuXHRcdHRoaXMuX3Rvb2xiYXIucmVzaXplKHdpZHRoKTtcclxuXHR9XHJcblxyXG5cdCAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHNlbGVjdGlvbiB0byB0aGUgZ2l2ZW4gc2VyaWVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gdHJlZUdyaWRPYmplY3RcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gaW5kZXhlc1xyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvckluZm9XaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVTZXJpZVNlbGVjdGlvbih0cmVlR3JpZE9iamVjdCwgaW5kZXhlczogQXJyYXk8bnVtYmVyPikge1xyXG4gICAgICAgIC8vIGRlc2VsZWN0IGFsbCBzZWxlY3Rpb25zIGluIHNpZ25hbCBwYW5lXHJcbiAgICAgICAgdHJlZUdyaWRPYmplY3QuY2xlYXJTZWxlY3Rpb24oKTtcclxuXHJcbiAgICAgICAgaWYoaW5kZXhlc1swXSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBpbmRleGVzLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICB0cmVlR3JpZE9iamVjdC5fbXVsdGlTZWxlY3RDdHJsUmVxdWVzdCA9IHRydWU7XHJcbiAgICAgICAgICAgIGxldCB2aXNpYmxlSW5kZXggPSAwO1xyXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgKDxhbnk+dHJlZUdyaWRPYmplY3QubW9kZWwpLmZsYXRSZWNvcmRzLmxlbmd0aDsgaisrKXtcclxuICAgICAgICAgICAgICAgIGlmKGogPT0gaW5kZXhlc1tpXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJlZUdyaWRPYmplY3Quc2VsZWN0Um93cyh2aXNpYmxlSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoKDxhbnk+dHJlZUdyaWRPYmplY3QubW9kZWwpLmZsYXRSZWNvcmRzW2pdLnZpc2libGUgIT0gXCJmYWxzZVwiKXtcclxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlSW5kZXgrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlZnJlc2hlcyB0aGUgdHJlZSBncmlkIFxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0ge0lTaWduYWxNYW5hZ2VyRGF0YU1vZGVsfSBkYXRhXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIGFzeW5jIHJlZnJlc2goZGF0YTogSVNpZ25hbE1hbmFnZXJEYXRhTW9kZWwpe1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0dmFyIHRyZWVncmlkT2JqID0gdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpO1xyXG5cdFx0XHRpZiAoKDxhbnk+dHJlZWdyaWRPYmoubW9kZWwpLmlzRWRpdCA9PSBmYWxzZSl7XHJcblx0XHRcdFx0Ly9UbyByZWZyZXNoIFRyZWVHcmlkIHdpdGggbmV3IGRhdGFzb3VyY2VcclxuXHRcdFx0XHR0aGlzLnNldE1vZGVsKGRhdGEpO1xyXG4gICAgIFx0XHR9XHJcblx0XHRcdGVsc2V7XHJcblx0XHRcdFx0Ly8gdHJlZWdyaWQgaXMgaW4gZWRpdCBtb2RlID0+IHJlZnJlc2ggd291bGQgbm90IHdvcmsgPT4gd2FpdCBmb3IgZWRpdGluZyBpcyBmaW5pc2hlZFxyXG5cdFx0XHRcdGZvcihsZXQgaSA9MDsgaSA8IDEwMDsgaSsrKXtcclxuXHRcdFx0XHRcdGF3YWl0IHRoaXMuc2xlZXAoMjAwKTtcclxuXHRcdFx0XHRcdC8vIGlzIGVkaXRpbmcgYWxyZWFkeSBmaW5pc2hlZFxyXG5cdFx0XHRcdFx0aWYgKCg8YW55PnRyZWVncmlkT2JqLm1vZGVsKS5pc0VkaXQgPT0gZmFsc2Upe1xyXG5cdFx0XHRcdFx0XHR0aGlzLnNldE1vZGVsKGRhdGEpO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHRcdFx0XHRcclxuXHRcdH1cclxuXHRcdGNhdGNoKGUpe1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRjb25zb2xlLmluZm8oXCJTaWduYWxNYW5hZ2VyIHJlZnJlc2ggZXJyb3IhID0+IFRyZWVHcmlkIHJlY3JlYXRpb24hXCIpO1xyXG5cdFx0XHRjb25zb2xlLmluZm8oZSk7XHJcblx0XHRcdFxyXG5cdFx0XHR0aGlzLmNyZWF0ZVRyZWVHcmlkKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHNsZWVwKG1zOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpKTtcclxuICAgIH1cclxuXHRcclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBjb2x1bW4gdGVtcGxhdGVzIGZvciB0aGUgdHJlZSBncmlkIGFuZCBhZGRzIHRoZW0gdG8gdGhlIHdpZGdldCBjb250YWluZXJcclxuXHQgKlxyXG5cdCAqIEBwcm90ZWN0ZWRcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByb3RlY3RlZCBjcmVhdGVDb2x1bW5UZW1wbGF0ZXMoKXtcclxuXHRcdHZhciAkd2lkZ2V0Q29udGFpbmVyID0gJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCk7XHJcblx0XHQkd2lkZ2V0Q29udGFpbmVyLmFwcGVuZCh0aGlzLmdldENvbHVtblRlbXBsYXRlRGF0YShTaWduYWxNYW5hZ2VyV2lkZ2V0Lm5hbWVDb2x1bW5JZCkpO1xyXG5cdFx0JHdpZGdldENvbnRhaW5lci5hcHBlbmQodGhpcy5nZXRDb2x1bW5UZW1wbGF0ZURhdGEoU2lnbmFsTWFuYWdlcldpZGdldC5jb2xvckNvbHVtbklkKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSB0cmVlIGdyaWQgZm9yIHRoZSBzaWduYWwgbWFuYWdlclxyXG5cdCAqXHJcblx0ICogQHByb3RlY3RlZFxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJvdGVjdGVkIGNyZWF0ZVRyZWVHcmlkKCl7XHJcblx0XHQoPGFueT4kKHRoaXMuY3NzUGFyZW50Q29udGVudElkKSkuZWpUcmVlR3JpZCh7XHJcblx0XHRcdC4uLnRoaXMuZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCksXHJcblx0XHRcdC4uLnRoaXMuZ2V0VHJlZUdyaWRDb2x1bW5SZXNpemVTdXBwb3J0KCksXHJcblx0XHRcdC4uLnRoaXMuZ2V0VHJlZUdyaWRUb29sYmFyU3VwcG9ydCgpLFx0XHJcblx0XHRcdC4uLnRoaXMuZ2V0VHJlZUdyaWRDZWxsRWRpdFN1cHBvcnQoKSxcclxuXHRcdFx0Li4udGhpcy5nZXRUcmVlR3JpZERyYWdEcm9wU3VwcG9ydCgpLFxyXG5cdFx0XHJcblx0XHRcdGRhdGFTb3VyY2U6dGhpcy5kYXRhTW9kZWwuZGF0YSxcclxuXHRcdFx0Y2hpbGRNYXBwaW5nOlwidmlzaWJsZUNoaWxkc1wiLFxyXG5cdFx0XHRleHBhbmRTdGF0ZU1hcHBpbmc6IFwiZXhwYW5kU3RhdGVcIixcclxuXHRcdFx0YWxsb3dSZW9yZGVyaW5nOiBmYWxzZSxcclxuXHRcdFx0cm93SGVpZ2h0OiAyOCxcclxuXHRcdFx0c2VsZWN0aW9uU2V0dGluZ3M6e1xyXG5cdFx0XHRcdHNlbGVjdGlvblR5cGUgOiAnbXVsdGlwbGUnIFxyXG5cdFx0XHR9LFxyXG5cdFx0XHRzZWxlY3Rpb25UeXBlOiAnbXVsdGlwbGUnLFxyXG5cdFx0XHRleHBhbmRlZDogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWROb2RlRXhwYW5kZWRPckNvbGxhcHNlZCgpLFxyXG5cdFx0XHRjb2xsYXBzZWQ6IChhcmdzKSA9PiB0aGlzLnRyZWVHcmlkTm9kZUV4cGFuZGVkT3JDb2xsYXBzZWQoKSxcclxuXHJcblx0XHRcdHJlY29yZENsaWNrOiAoYXJncykgPT4gdGhpcy5jbGljayhhcmdzKSxcclxuXHRcdFx0cmVjb3JkRG91YmxlQ2xpY2s6IChhcmdzKSA9PiB0aGlzLmRvdWJsZUNsaWNrKGFyZ3MpLFxyXG5cdFx0XHRyb3dTZWxlY3RlZDogKGFyZ3MpID0+IHRoaXMucm93U2VsZWN0ZWQoYXJncy5kYXRhLml0ZW0sIGFyZ3MubW9kZWwuc2VsZWN0ZWRJdGVtcyksXHJcblx0XHRcdGNyZWF0ZTogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWRDcmVhdGVkKCksXHJcblx0XHRcdGFjdGlvbkJlZ2luOiAoYXJncykgPT4gdGhpcy50cmVlR3JpZEFjdGlvbkJlZ2luKGFyZ3MpLFxyXG5cdFx0XHRhY3Rpb25Db21wbGV0ZTogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWRBY3Rpb25Db21wbGV0ZShhcmdzKSxcclxuXHRcdFx0cXVlcnlDZWxsSW5mbzogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWRRdWVyeUNlbGxJbmZvKGFyZ3MpLFxyXG5cdFx0fSlcclxuXHRcdHRoaXMuc2V0RWRpdE1vZGUodGhpcy5lZGl0TW9kZUFjdGl2ZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgY29sdW1uIGRlZmluaXRpb25cclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHJldHVybnMge3t9fVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBnZXRUcmVlR3JpZENvbHVtbkRlZmluaXRpb24oKToge317XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRjb2x1bW5zOiBbXHJcblx0XHRcdFx0eyBmaWVsZDogU2lnbmFsTWFuYWdlcldpZGdldC5uYW1lQ29sdW1uSWQsIGhlYWRlclRleHQ6IFwiTmFtZVwiLCB3aWR0aDogXCIzNTFweFwiICwgaXNUZW1wbGF0ZUNvbHVtbjogdHJ1ZSwgdGVtcGxhdGVJRDogXCJzbU5hbWVDb2x1bW5UZW1wbGF0ZVwifSxcclxuXHRcdFx0XHR7IGZpZWxkOiBTaWduYWxNYW5hZ2VyV2lkZ2V0LnZhbHVlQ29sdW1uSWQsIGhlYWRlclRleHQ6IFwiVmFsdWVcIiwgdmlzaWJsZTogdGhpcy5lZGl0TW9kZUFjdGl2ZSwgd2lkdGg6IFwiMzAwcHhcIiwgZWRpdFRlbXBsYXRlOiBTbVRyZWVHcmlkQ2VsbEVkaXRUZW1wbGF0ZS5jcmVhdGVJbnN0YW5jZSgpLCBpc1RlbXBsYXRlQ29sdW1uOiB0cnVlfSxcclxuXHRcdFx0XHR7IGZpZWxkOiBTaWduYWxNYW5hZ2VyV2lkZ2V0LmRlc2NyaXB0aW9uQ29sdW1uSWQsIGhlYWRlclRleHQ6IFwiRGVzY3JpcHRpb25cIiwgdmlzaWJsZTogdGhpcy5lZGl0TW9kZUFjdGl2ZSwgd2lkdGg6IFwiMTAwcHhcIiB9LFxyXG5cdFx0XHRcdHsgZmllbGQ6IFNpZ25hbE1hbmFnZXJXaWRnZXQuY29sb3JDb2x1bW5JZCwgaGVhZGVyVGV4dDogXCJDb2xvclwiLCB3aWR0aDogXCI1MHB4XCIsIHZpc2libGU6IHRoaXMuZWRpdE1vZGVBY3RpdmUsIGVkaXRUeXBlOiBcIkRhdGVQaWNrZXJcIiwgZWRpdFRlbXBsYXRlOiBTbVRyZWVHcmlkQ2VsbEVkaXRUZW1wbGF0ZS5jcmVhdGVJbnN0YW5jZSgpLCBpc1RlbXBsYXRlQ29sdW1uOiB0cnVlLCB0ZW1wbGF0ZUlEOiBcInNtQ29sb3JDb2x1bW5UZW1wbGF0ZVwifSxcclxuXHRcdFx0XHR7IGZpZWxkOiBTaWduYWxNYW5hZ2VyV2lkZ2V0Lmljb25EZWZpbml0aW9uQ29sdW1uSWQsIHZpc2libGU6IGZhbHNlLCB3aWR0aDogXCIwcHhcIiB9LFxyXG5cdFx0XHRdLFxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCBjb2x1bW4gcmVzaXplIHNldHRpbmdzXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEByZXR1cm5zIHt7fX1cclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZ2V0VHJlZUdyaWRDb2x1bW5SZXNpemVTdXBwb3J0KCk6IHt9e1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0YWxsb3dDb2x1bW5SZXNpemU6IHRydWUsXHJcblx0XHRcdGNvbHVtblJlc2l6ZVNldHRpbmdzOiB7IGNvbHVtblJlc2l6ZU1vZGU6IGVqLlRyZWVHcmlkLkNvbHVtblJlc2l6ZU1vZGUuRml4ZWRDb2x1bW5zXHR9LFxyXG5cdFx0XHRjb2x1bW5SZXNpemVkOiAoYXJncykgPT4gdGhpcy50cmVlR3JpZENvbHVtblJlc2l6ZWQoYXJncyksXHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcbiAgICAgKiBBIHRyZWVncmlkIGNvbHVtbiB3YXMgcmVzaXplZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdHJlZUdyaWRDb2x1bW5SZXNpemVkKGFyZ3Mpe1xyXG5cdFx0c3VwZXIucmVzaXplRHluYW1pY0NvbHVtbihhcmdzLmNvbHVtbkluZGV4LCBhcmdzLm1vZGVsKTtcclxuICAgIH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgdHJlZSBncmlkIHRvb2xiYXIgc2V0dGluZ3NcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHJldHVybnMge3t9fVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBnZXRUcmVlR3JpZFRvb2xiYXJTdXBwb3J0KCk6IHt9e1xyXG5cdFx0dGhpcy5fdG9vbGJhciA9IG5ldyBTaWduYWxNYW5hZ2VyVHJlZUdyaWRUb29sYmFyKHRoaXMuY3NzUGFyZW50Q29udGVudElkKTtcdFxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0XHR0b29sYmFyU2V0dGluZ3M6IHtcclxuXHRcdFx0XHRcdHNob3dUb29sYmFyOiB0cnVlLFxyXG5cdFx0XHRcdFx0Y3VzdG9tVG9vbGJhckl0ZW1zOiB0aGlzLl90b29sYmFyLmdldEN1c3RvbVRvb2xiYXJzKClcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHRvb2xiYXJDbGljazogKGFyZ3MpID0+IHRoaXMuX3Rvb2xiYXIudG9vbGJhckNsaWNrKGFyZ3MsIHRoaXMpLFxyXG5cdFx0XHR9O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgdHJlZSBncmlkIGNlbGwgZWRpdCBzZXR0aW5nc1xyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcmV0dXJucyB7e319XHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIGdldFRyZWVHcmlkQ2VsbEVkaXRTdXBwb3J0KCk6IHt9e1xyXG5cdFx0dmFyIGNlbGxFZGl0RXZlbnRzID0gbmV3IFNtVHJlZUdyaWRDZWxsRWRpdEV2ZW50cygpO1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0ZWRpdFNldHRpbmdzOiB7XHRhbGxvd0VkaXRpbmc6IHRydWUgfSxcclxuXHRcdFx0YmVnaW5FZGl0OiAoYXJncykgPT4gY2VsbEVkaXRFdmVudHMuYmVnaW5FZGl0KGFyZ3MsIHRoaXMpLFxyXG5cdFx0XHRlbmRFZGl0OiAoYXJncykgPT4gY2VsbEVkaXRFdmVudHMuZW5kRWRpdChhcmdzLCB0aGlzKSxcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBY3RpdmF0ZXMgdGhlIHNpZ25hbCBtYW5hZ2VyIGRyYWcgYW5kIGRyb3Agc3VwcG9ydFxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcmV0dXJucyB7e319XHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIGdldFRyZWVHcmlkRHJhZ0Ryb3BTdXBwb3J0KCk6IHt9e1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0YWxsb3dEcmFnQW5kRHJvcCA6IHRydWUsXHJcblx0XHRcdHJvd0RyYWdTdGFydDogKGFyZ3MpID0+IHRoaXMucm93RHJhZ1N0YXJ0KGFyZ3MpLFxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFdpbGwgYmUgY2FsbGVkIGFmdGVyIHRoZSB0cmVlIGdyaWQgd2FzIGNyZWF0ZWQ7IHRvb2xiYXIgc3R5bGVzIGFuZCBzdGF0ZXMgd2lsbCBiZSBzZXRcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIHRyZWVHcmlkQ3JlYXRlZCgpe1xyXG5cdFx0Ly8gU2V0cyB0aGUgY3VzdG9tIHRvb2xiYXIgaWNvbnNcclxuXHRcdHRoaXMuX3Rvb2xiYXIuc2V0U3R5bGVGb3JUb29sYmFySWNvbnMoKTtcclxuXHJcblx0XHQvLyBBdCB0aGUgYmVnaW5uaW5nIHRoZSBleHBvcnQvZGVsZXRlL2luc2VydCBjYWxjdWxhdGlvbiBidXR0b24gaXMgZGlzYWJsZWQgYmVjYXVzZSBubyBzZWxlY3Rpb24gaXMgYXZhaWxhYmxlXHJcblx0XHR0aGlzLl90b29sYmFyLmRpc2FibGVFeHBvcnRCdXR0b24odHJ1ZSk7XHJcblx0XHR0aGlzLl90b29sYmFyLmRpc2FibGVEZWxldGVCdXR0b24odHJ1ZSk7XHJcblx0XHR0aGlzLl90b29sYmFyLmRpc2FibGVJbnNlcnRDYWxjdWxhdGlvbkJ1dHRvbih0cnVlKTtcclxuXHRcdHRoaXMuc2V0RWRpdE1vZGUoZmFsc2UpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU3dpdGNoIGludG8gXCJlZGl0IG1vZGVcIiBvciBcIm5vcm1hbCBtb2RlXCJcclxuXHQgKiBpZiBlZGl0IG1vZGUgaXMgYWN0aXZlLCB0aGUgZWRpdCBtb2RlIHdpbGwgYmUgc2V0IHRvIHRoZSBkYXRhbW9kZWwsIGFuZCB0aGUgd2lkZ2V0IHNpemUgd2lsbCBiZSBpbmNyZWFzZWRcclxuXHQgKiBpZiBub3JtYWwgbW9kZSBpcyBhY3RpdmUsIHRoZSBub3JtYWwgbW9kZSB3aWxsIGJlIHNldCB0byB0aGUgZGF0YW1vZGVsLCBhbmQgdGhlIHdpZGdldCBzaXplIHdpbGwgYmUgZGVjcmVhc2VkXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gYWN0aXZlXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIHNldEVkaXRNb2RlKGFjdGl2ZTpib29sZWFuKXtcclxuXHRcdGlmKGFjdGl2ZSA9PSB0cnVlKXtcclxuXHRcdFx0dGhpcy5vbkNoYW5nZVNpemUodGhpcy5fYWN0dWFsV2lkdGgrNDUwKTtcclxuXHRcdH1lbHNle1xyXG5cdFx0XHRsZXQgbmV3U2l6ZSA9IHRoaXMuX2FjdHVhbFdpZHRoIC0gNDUwO1xyXG5cdFx0XHRpZihuZXdTaXplIDwgMjUwKXtcclxuXHRcdFx0XHRuZXdTaXplID0gMjUwO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMub25DaGFuZ2VTaXplKG5ld1NpemUpO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5lZGl0TW9kZUFjdGl2ZSA9IGFjdGl2ZTtcclxuXHRcdCh0aGlzLmRhdGFNb2RlbCBhcyBJU2lnbmFsTWFuYWdlckRhdGFNb2RlbCkuZWRpdE1vZGVBY3RpdmUgPSB0aGlzLmVkaXRNb2RlQWN0aXZlO1xyXG5cdFx0aWYodGhpcy5fdG9vbGJhciAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHR0aGlzLl90b29sYmFyLmFjdGl2YXRlRWRpdE1vZGVCdXR0b24odGhpcy5lZGl0TW9kZUFjdGl2ZSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBXZWxsIGJlIGNhbGxlZCBhZnRlciBzb21lIHRyZWUgZ3JpZCBhY3Rpb24gd2FzIHN0YXJ0ZWRcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHsqfSBhcmdzXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIHRyZWVHcmlkQWN0aW9uQmVnaW4oYXJncyl7XHJcblx0XHQvLyBTdXBwb3J0IFwiRW50Zi9EZWxcIiBrZXlcclxuXHRcdGlmKGFyZ3MucmVxdWVzdFR5cGUgPT0gXCJkZWxldGVcIil7XHJcblx0XHRcdGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuXHRcdFx0aWYgKHRoaXMuY29udGFpbnNJdGVtV2l0aGluUmVjZW50T3JVcGxvYWRlZChhcmdzLmRlbGV0ZWRJdGVtcykpIHtcclxuXHRcdFx0XHR0aGlzLnNob3dNZXNzYWdlQm94Rm9yRGVsZXRpbmdJdGVtKGFyZ3MuZGVsZXRlZEl0ZW1zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVsZXRlSXRlbXMoYXJncy5kZWxldGVkSXRlbXMpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRcclxuXHJcblx0LyoqXHJcblx0ICogV2VsbCBiZSBjYWxsZWQgYWZ0ZXIgc29tZSB0cmVlIGdyaWQgYWN0aW9uIHdhcyBjb21wbGV0ZWRcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHsqfSBhcmdzXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIHRyZWVHcmlkQWN0aW9uQ29tcGxldGUoYXJncyl7IFxyXG5cdFx0Ly8gRXZlbnQgdHJpZ2dlciB3aGlsZSBjaGFuZ2luZyBkYXRhc291cmNlIGR5bmFtaWNhbGx5LiBcclxuXHRcdC8vIGNvZGUgdG8gZG9uZSBhZnRlciB0aGUgZHluYW1pYyBjaGFuZ2Ugb2YgZGF0YXNvdXJjZS4gXHJcblx0XHRpZiAoYXJncy5yZXF1ZXN0VHlwZSA9PT0gJ3JlZnJlc2hEYXRhU291cmNlJykgeyBcclxuXHRcdFx0dGhpcy5yZWZyZXNoU2VsZWN0aW9uKCk7XHJcblx0XHRcdGlmKHRoaXMuX3NlcmllQ29udGFpbmVyVG9TZWxlY3RBZnRlclJlZnJlc2ggIT0gdW5kZWZpbmVkKXtcdFx0XHRcdFxyXG5cdFx0XHRcdC8vIFNlbGVjdHMgdGhlIGltcG9ydGVkIHNpZ25hbGZpbGUsIG9yIHRoZSBpbnNlcnRlZCBjYWxjdWxhdGlvbiwgLi4uXHJcblx0XHRcdFx0dGhpcy5zZWxlY3RJdGVtKHRoaXMuX3NlcmllQ29udGFpbmVyVG9TZWxlY3RBZnRlclJlZnJlc2gpO1xyXG5cdFx0XHRcdHRoaXMuX3NlcmllQ29udGFpbmVyVG9TZWxlY3RBZnRlclJlZnJlc2ggPSB1bmRlZmluZWQ7XHJcblx0XHRcdH1cclxuXHRcdH0gXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBXaWxsIGJlIGNhbGxlZCB0byB1cGRhdGUgdGhlIHN0eWxlIG9mIHRoZSBnaXZlIGNlbGwgaWYgYSByZWZyZXNoIHdpbGwgYmUgbmVlZGVkXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7Kn0gYXJnc1xyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSB0cmVlR3JpZFF1ZXJ5Q2VsbEluZm8oYXJncyl7XHJcblx0XHRpZiAoYXJncy5jb2x1bW4uZmllbGQgPT0gXCJuYW1lXCIpe1xyXG5cdFx0XHRpZih0aGlzLmlzR3JvdXBJdGVtKGFyZ3MuZGF0YS5pdGVtKSkge1xyXG5cdFx0XHRcdC8vIFNob3cgZ3JvdXAgbm9kZXMgYWx3YXlzIGJvbGQgPT4gYWxzbyBpZiB0aGV5IGhhdmUgbm8gY2hpbGRzXHJcblx0XHRcdFx0aWYoYXJncy5jZWxsRWxlbWVudC5zdHlsZSAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHRcdFx0aWYoYXJncy5kYXRhLmxldmVsID09IDApe1xyXG5cdFx0XHRcdFx0XHRhcmdzLmNlbGxFbGVtZW50LnN0eWxlLmZvbnRXZWlnaHQgPSBcIjgwMFwiOyAvLyA3MDAgd291bGQgYmUgYm9sZFxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0ZWxzZXtcclxuXHRcdFx0XHRcdFx0YXJncy5jZWxsRWxlbWVudC5zdHlsZS5mb250V2VpZ2h0ID0gXCI2NTBcIjtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0Ly8gU2hvdyBhbGwgbm9kZXMgcmVkIHdoaWNoIGhhdmUgaW52YWxpZCBzaWduYWxzIGluIGl0IFxyXG5cdFx0XHRpZih0aGlzLmlzSXRlbUludmFsaWQoYXJncy5kYXRhLml0ZW0pID09IHRydWUpe1xyXG5cdFx0XHRcdGlmKGFyZ3MuY2VsbEVsZW1lbnQuc3R5bGUgIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0XHRcdGFyZ3MuY2VsbEVsZW1lbnQuc3R5bGUuY29sb3IgPSBcInJlZFwiO1xyXG5cdFx0XHRcdFx0YXJncy5jZWxsRWxlbWVudC5zdHlsZS5mb250V2VpZ2h0ID0gXCJib2xkXCI7XHJcblx0XHRcdFx0XHQvL2FyZ3MuY2VsbEVsZW1lbnQuaW5uZXJUZXh0ID0gYXJncy5jZWxsRWxlbWVudC5pbm5lclRleHQgKyBcIihpbnZhbGlkKVwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSBcclxuXHRcdGVsc2UgaWYgKGFyZ3MuY29sdW1uLmZpZWxkID09IFwidmFsdWVcIil7XHJcblx0XHRcdGlmKGFyZ3MuZGF0YS5kcm9wUG9zc2libGUgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICBhcmdzLmNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJkcm9wTG9jYXRpb25BcmVhXCIpO1xyXG5cdFx0XHR9XHJcblx0XHR9ICAgICAgXHJcblx0fVxyXG4vKlxyXG5cdC8vIElzIGEgaW52YWxpZCBzaWduYWwgd2l0aGluIHRoaXMgaXRlbSAob3IgYSBjaGlsZCBpdGVtKVxyXG5cdHByaXZhdGUgaXNJdGVtSW52YWxpZChpdGVtKTogYm9vbGVhbntcclxuXHRcdGxldCBpbnZhbGlkU2lnbmFsRm91bmQgPSBmYWxzZTtcclxuXHRcdGxldCBzaWduYWxzID0gdGhpcy5nZXRTaWduYWxzRnJvbUl0ZW0oaXRlbSk7XHJcblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgc2lnbmFscy5sZW5ndGg7IGkrKyl7XHJcblx0XHRcdGlmKHNpZ25hbHNbaV0ucmF3UG9pbnRzVmFsaWQgPT0gZmFsc2Upe1xyXG5cdFx0XHRcdGludmFsaWRTaWduYWxGb3VuZCA9IHRydWU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBpbnZhbGlkU2lnbmFsRm91bmQ7XHJcblx0fSovXHJcblxyXG5cdC8qKlxyXG5cdCAqIEhhcyB0aGUgZ2l2ZW4gaXRlbSBzb21lIGRhdGEgYW5kIGlzIHRoaXMgZGF0YSB2YWxpZCBcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHsqfSBpdGVtXHJcblx0ICogQHJldHVybnMge2Jvb2xlYW59XHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIGlzSXRlbUludmFsaWQoaXRlbSk6IGJvb2xlYW57XHJcblx0XHRpZihpdGVtIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uKXtcclxuXHRcdFx0bGV0IGNhbGN1bGF0ZWRTaWduYWxzID0gaXRlbS5nZXRTZXJpZXMoKTtcclxuXHRcdFx0Ly8gY2hlY2sgaWYgYSBjYWxjdWxhdGVkIG91dHB1dCBzaWduYWwgaXMgaW52YWxpZFxyXG5cdFx0XHRmb3IobGV0IGkgPSAwOyBpIDwgY2FsY3VsYXRlZFNpZ25hbHMubGVuZ3RoOyBpKyspe1xyXG5cdFx0XHRcdGlmKGNhbGN1bGF0ZWRTaWduYWxzW2ldLnJhd1BvaW50c1ZhbGlkID09IGZhbHNlKXtcclxuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZihpdGVtIGluc3RhbmNlb2YgU2VyaWVOb2RlICl7XHJcblx0XHRcdGlmKGl0ZW0uc2VyaWUgIT0gdW5kZWZpbmVkICYmIGl0ZW0uc2VyaWUucmF3UG9pbnRzVmFsaWQgPT0gZmFsc2Upe1xyXG5cdFx0XHRcdGlmKGl0ZW0gaW5zdGFuY2VvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25PdXRwdXREYXRhKXtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2V7XHJcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQSBkcmFnIGFuZCBkcm9wIG9wZXJhdGlvbiB3YXMgc3RhcnRlZFxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0geyp9IGFyZ3NcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgcm93RHJhZ1N0YXJ0KGFyZ3Mpe1xyXG5cdFx0dGhpcy5faW5kZXhlc0RyYWdnZWQgPSBbXTtcclxuXHRcdFxyXG5cdFx0bGV0IHNlbGVjdGVkRWxlbWVudHMgPSB0aGlzLmNoZWNrU2VsZWN0ZWRFbGVtZW50cyhhcmdzLmRyYWdnZWRSZWNvcmRzLCBhcmdzLmRyYWdnZWRSb3cpO1xyXG5cdFx0aWYgKHNlbGVjdGVkRWxlbWVudHMubGVuZ3RoID4gMCApIHtcclxuXHRcdFx0dGhpcy5fY3VycmVudERyYWdEcm9wU2VyaWVzID0gc2VsZWN0ZWRFbGVtZW50cztcclxuXHRcdFx0IC8vIFNldCBjdXJyZW50IGRyYWcgZHJvcCBzaWduYWxcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR0aGlzLl9jdXJyZW50RHJhZ0Ryb3BTZXJpZXMgPSB1bmRlZmluZWQ7IC8vIFJlc2V0IGN1cnJlbnQgZHJhZyBkcm9wIHNpZ25hbFxyXG5cdFx0fVxyXG5cdFx0YXJncy5kcmFnZ2VkUmVjb3JkcyA9IFtdO1xyXG5cdFx0YXJncy5jYW5jZWwgPSB0cnVlO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSByZWZyZXNoU2VsZWN0aW9uKCl7XHJcblx0XHRjb25zdCB0cmVlT2JqID0gJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCkuZWpUcmVlR3JpZCgnaW5zdGFuY2UnKTsgXHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0Ly8gR2V0IGFjdHVhbCBzZWxlY3Rpb24gaW5kZXhcclxuXHRcdGxldCBhY3R1YWxTZWxlY3RlZFJvd0luZGV4ID0gdHJlZU9iai5tb2RlbC5zZWxlY3RlZFJvd0luZGV4O1xyXG5cdFx0Ly8gUmVzZXQgc2VsZWN0aW9uXHJcblx0XHR0cmVlT2JqLm1vZGVsLnNlbGVjdGVkUm93SW5kZXggPSAtMTtcclxuXHRcdFxyXG5cdFx0Ly8gU2V0IHRvIGxhc3QgaW5kZXggaWYgaW5kZXggaXMgb3V0IG9mIHJhbmdlXHJcblx0XHRpZihhY3R1YWxTZWxlY3RlZFJvd0luZGV4ID49IHRyZWVPYmoubW9kZWwuZmxhdFJlY29yZHMubGVuZ3RoKXtcclxuXHRcdFx0YWN0dWFsU2VsZWN0ZWRSb3dJbmRleCA9IHRyZWVPYmoubW9kZWwuZmxhdFJlY29yZHMubGVuZ3RoLTE7XHJcblx0XHR9XHJcblx0XHQvLyBTZXQgc2VsZWN0aW9uXHJcblx0XHR0cmVlT2JqLm1vZGVsLnNlbGVjdGVkUm93SW5kZXggPSBhY3R1YWxTZWxlY3RlZFJvd0luZGV4O1xyXG5cdFx0XHJcblx0XHQvLyB1cGRhdGUgdG9vbGJhciBidXR0b25zXHJcblx0XHRpZih0cmVlT2JqLm1vZGVsLmZsYXRSZWNvcmRzW2FjdHVhbFNlbGVjdGVkUm93SW5kZXhdICE9IHVuZGVmaW5lZCl7XHJcblx0XHRcdHRoaXMudXBkYXRlVG9vbGJhckJ1dHRvblN0YXRlcyh0cmVlT2JqLm1vZGVsLmZsYXRSZWNvcmRzW2FjdHVhbFNlbGVjdGVkUm93SW5kZXhdLml0ZW0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy51cGRhdGVUb29sYmFyQnV0dG9uU3RhdGVzKHVuZGVmaW5lZCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHJvd1NlbGVjdGVkKGl0ZW06IGFueSwgc2VsZWN0ZWRJdGVtcyl7XHJcblx0XHRpZihzZWxlY3RlZEl0ZW1zLmxlbmd0aCA+IDEpe1xyXG5cdFx0XHRsZXQgc2VsZWN0ZWRJdGVtO1xyXG5cdFx0XHRmb3IodmFyIGk9IDA7IGkgPCBzZWxlY3RlZEl0ZW1zLmxlbmd0aDsgaSsrKXtcclxuXHRcdFx0XHRsZXQgaXNFeHBvcnRhYmxlID0gbmV3IEV4cG9ydEhlbHBlcigpLmlzRWxlbWVudEV4cG9ydGFibGUoc2VsZWN0ZWRJdGVtc1tpXS5pdGVtKTtcclxuXHJcblx0XHRcdFx0aWYgKCFpc0V4cG9ydGFibGUpe1xyXG5cdFx0XHRcdFx0c2VsZWN0ZWRJdGVtID0gc2VsZWN0ZWRJdGVtc1tpXTtcclxuXHRcdFx0XHR9IFxyXG5cdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0c2VsZWN0ZWRJdGVtID0gc2VsZWN0ZWRJdGVtc1tpXTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLnVwZGF0ZVRvb2xiYXJCdXR0b25TdGF0ZXMoc2VsZWN0ZWRJdGVtLml0ZW0pO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHRoaXMudXBkYXRlVG9vbGJhckJ1dHRvblN0YXRlcyhpdGVtKTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogdXBkYXRlcyB0aGUgdG9vbGJhciBidXR0b25zKGUuZy4gaW5zZXJ0IGNhbHVsYXRpb24gb25seSBlbmFibGVkIG9uIFNlcmllR3JvdXAgb3IgdW5kZXIgXCJDYWxjdWxhdGVkIHNpZ25hbHNcIiBjYXRlZ29yeSlcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHtJU2VyaWVOb2RlfSBpdGVtXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIHVwZGF0ZVRvb2xiYXJCdXR0b25TdGF0ZXMoaXRlbTogSVNlcmllTm9kZSB8IHVuZGVmaW5lZCl7XHJcblx0XHRcclxuXHRcdGlmIChpdGVtID09IHVuZGVmaW5lZCl7XHJcblx0XHRcdHRoaXMuX3Rvb2xiYXIuZGlzYWJsZUV4cG9ydEJ1dHRvbih0cnVlKTtcclxuXHRcdFx0dGhpcy5fdG9vbGJhci5kaXNhYmxlSW5zZXJ0Q2FsY3VsYXRpb25CdXR0b24odHJ1ZSk7XHJcblx0XHRcdHRoaXMuX3Rvb2xiYXIuZGlzYWJsZURlbGV0ZUJ1dHRvbih0cnVlKTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHQvLyBzZXQgZGVsZXRlIGJ1dHRvbiBzdGF0ZVxyXG5cdFx0XHR0aGlzLl90b29sYmFyLmRpc2FibGVEZWxldGVCdXR0b24oIWl0ZW0uY2FuRGVsZXRlKTtcclxuXHJcblx0XHRcdGlmKGl0ZW0gaW5zdGFuY2VvZiBTZXJpZUdyb3VwKXtcclxuXHRcdFx0XHR0aGlzLl90b29sYmFyLmRpc2FibGVFeHBvcnRCdXR0b24oZmFsc2UpO1xyXG5cdFx0XHRcdHRoaXMuX3Rvb2xiYXIuZGlzYWJsZUluc2VydENhbGN1bGF0aW9uQnV0dG9uKGZhbHNlKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNle1xyXG5cdFx0XHRcdGlmKGl0ZW0uZ2V0U2VyaWVHcm91cCgpID09IHVuZGVmaW5lZCl7XHJcblx0XHRcdFx0XHR0aGlzLl90b29sYmFyLmRpc2FibGVJbnNlcnRDYWxjdWxhdGlvbkJ1dHRvbih0cnVlKTtcclxuXHRcdFx0XHRcdHRoaXMuX3Rvb2xiYXIuZGlzYWJsZUV4cG9ydEJ1dHRvbih0cnVlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSBpZihpdGVtIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlICYmIGl0ZW0ubmFtZSA9PSAnQWxnb3JpdGhtJyB8fCBpdGVtIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhICYmIGl0ZW0uc2VyaWUgPT0gdW5kZWZpbmVkIHx8XHJcblx0XHRcdFx0KChpdGVtIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uIHx8IGl0ZW0gaW5zdGFuY2VvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25PdXRwdXREYXRhKSAmJiAoaXRlbS5zZXJpZSA9PSB1bmRlZmluZWQgfHwgaXRlbS5zZXJpZSEucmF3UG9pbnRzVmFsaWQgPT0gZmFsc2UpKSl7XHJcblx0XHRcdFx0XHR0aGlzLl90b29sYmFyLmRpc2FibGVJbnNlcnRDYWxjdWxhdGlvbkJ1dHRvbihmYWxzZSk7XHJcblx0XHRcdFx0XHR0aGlzLl90b29sYmFyLmRpc2FibGVFeHBvcnRCdXR0b24odHJ1ZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2V7XHJcblx0XHRcdFx0XHR0aGlzLl90b29sYmFyLmRpc2FibGVFeHBvcnRCdXR0b24oZmFsc2UpO1xyXG5cdFx0XHRcdFx0dGhpcy5fdG9vbGJhci5kaXNhYmxlSW5zZXJ0Q2FsY3VsYXRpb25CdXR0b24oZmFsc2UpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVx0XHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQSBjbGljayBvbiB0aGUgdHJlZSBncmlkIChuZWVkZWQgZm9yIHJlc2V0aW5nIHRoZSBjdXJyZW50IGRyYWcgZHJvcCBzaWduYWwpXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7Kn0gYXJnc1xyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBjbGljayhhcmdzKXtcclxuXHRcdC8vIFJlc2V0IGN1cnJlbnQgZHJhZyBkcm9wIHNpZ25hbCBhZnRlciBjbGljayB3YXMgZmluaXNoZWQoY2xpY2sgdXApXHJcblx0XHR0aGlzLl9jdXJyZW50RHJhZ0Ryb3BTZXJpZXMgPSB1bmRlZmluZWQ7XHJcblx0XHR0aGlzLmZvY3VzKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBIGRvdWJsZSBjbGljayBvbiB0aGUgdHJlZSBncmlkIHdhcyBkb25lXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7Kn0gYXJnc1xyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBkb3VibGVDbGljayhhcmdzKXtcclxuXHRcdGlmKGFyZ3MuY2VsbEluZGV4ID09IDApe1xyXG5cdFx0XHRsZXQgc2VyaWVOb2RlID0gYXJncy5kYXRhLml0ZW07XHJcblx0XHRcdGxldCBmb3VuZFNlcmllcyA9IHRoaXMuZ2V0U2VyaWVzRnJvbUl0ZW0oc2VyaWVOb2RlKTtcclxuXHRcdFx0aWYoZm91bmRTZXJpZXMubGVuZ3RoID4gMCl7XHJcblx0XHRcdFx0Ly8gT25seSBvbmUgc2VyaWUgY2FuIGJlIGFkZGVkIGJ5IGRvdWJsZSBjbGljayBjdXJyZW50bHkoVE9ETzogYWRkIG11bHRpIGluc2VydClcclxuXHRcdFx0XHR0aGlzLm9uU2VyaWVzRG91YmxlQ2xpY2tlZChmb3VuZFNlcmllc1swXSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGFsbCBlbGVtZW50cyBzZWxlY3RlZCBhcmUgc2VyaWVzIGFuZCBvZiB0aGUgc2FtZSB0eXBlXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7Kn0gZWxlbWVudHNcclxuXHQgKiBAcGFyYW0geyp9IGRyYWdnZWRSb3dcclxuXHQgKiBAcmV0dXJucyB7QXJyYXk8QmFzZVNlcmllcz59XHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIGNoZWNrU2VsZWN0ZWRFbGVtZW50cyhlbGVtZW50cywgZHJhZ2dlZFJvdyk6QXJyYXk8QmFzZVNlcmllcz4ge1xyXG5cdFx0bGV0IHNlcmllcyA9IG5ldyBBcnJheTxCYXNlU2VyaWVzPigpO1xyXG5cdFx0bGV0IGl0ZW1zID0gbmV3IEFycmF5PGFueT4oKTtcclxuXHRcdGxldCBkcmFnZ2VkUm93SXNTZWxlY3RlZCA9IGZhbHNlO1xyXG5cdFx0bGV0IGludmFsaWRTZWxlY3Rpb24gPSBmYWxzZTtcclxuXHJcblx0XHRpZiAoZHJhZ2dlZFJvdyA9PSB1bmRlZmluZWQgfHwgZHJhZ2dlZFJvdy5zZXJpZSA9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0cmV0dXJuIFtdO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCB0eXBlID0gZHJhZ2dlZFJvdy5zZXJpZS50eXBlO1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkgPSBpICsgMSl7XHJcblx0XHRcdGlmIChlbGVtZW50c1tpXS5zZXJpZSA9PSB1bmRlZmluZWQgfHwgZWxlbWVudHNbaV0uc2VyaWUudHlwZSAhPSB0eXBlKSB7XHJcblx0XHRcdFx0aW52YWxpZFNlbGVjdGlvbiA9IHRydWU7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKGVsZW1lbnRzW2ldID09IGRyYWdnZWRSb3cpIHtcclxuXHRcdFx0XHRkcmFnZ2VkUm93SXNTZWxlY3RlZCA9IHRydWU7XHJcblx0XHRcdH1cclxuXHRcdFx0c2VyaWVzLnB1c2goZWxlbWVudHNbaV0uc2VyaWUpO1xyXG5cdFx0XHRpdGVtcy5wdXNoKGVsZW1lbnRzW2ldKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoZHJhZ2dlZFJvdy5pdGVtIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhKXtcclxuXHRcdFx0dGhpcy5fY3VycmVudENhbGN1bGF0b3JUeXBlID0gZHJhZ2dlZFJvdy5wYXJlbnQ7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly9PbmNlIGFsbCBlbGVtZW50cyBoYXZlIGJlZW4gY2hlY2tlZCwgc2VsZWN0IGNvcnJlY3QgZWxlbWVudHMgYWNjb3JkaW5nIHRvIHRoZSBleGNlcHRpb25zXHJcblx0XHRpZiAoIWRyYWdnZWRSb3dJc1NlbGVjdGVkKSB7XHJcblx0XHRcdHNlcmllcyA9IFtdO1xyXG5cdFx0XHRzZXJpZXMucHVzaChkcmFnZ2VkUm93LnNlcmllKTtcclxuXHRcdFx0dGhpcy5faW5kZXhlc0RyYWdnZWQgPSBbXTtcclxuXHRcdFx0dGhpcy5faW5kZXhlc0RyYWdnZWQucHVzaChkcmFnZ2VkUm93LmluZGV4KTtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYoaW52YWxpZFNlbGVjdGlvbikge1xyXG5cdFx0XHRyZXR1cm4gW107XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0c2VyaWVzID0gdGhpcy5kZWxldGVFcXVhbFNpZ25hbHMoc2VyaWVzLCBpdGVtcyk7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHJldHVybiBzZXJpZXM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEZWxldGUgZHVwbGljYXRlZCBzaWduYWxzIGZyb20gdGhlIGRyYWcmZHJvcCBhcnJheVxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0ge0FycmF5PEJhc2VTZXJpZXM+fSBzZXJpZXNcclxuXHQgKiBAcGFyYW0geyp9IGVsZW1lbnRzXHJcblx0ICogQHJldHVybnNcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZGVsZXRlRXF1YWxTaWduYWxzKHNlcmllczogQXJyYXk8QmFzZVNlcmllcz4sIGVsZW1lbnRzKSB7XHJcblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgc2VyaWVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGlmIChlbGVtZW50c1tpXS5pdGVtIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhKXtcclxuXHRcdFx0XHRsZXQgc2VsZWN0ZWRJdGVtcyA9IE9iamVjdC5hc3NpZ24oW10sIHNlcmllcyk7XHJcblx0XHRcdFx0c2VsZWN0ZWRJdGVtcy5zcGxpY2UoaSwgMSk7XHJcblx0XHRcdFx0aWYgKHNlbGVjdGVkSXRlbXMuaW5jbHVkZXMoc2VyaWVzW2ldKSl7XHJcblx0XHRcdFx0XHRzZXJpZXMuc3BsaWNlKGksIDEpO1xyXG5cdFx0XHRcdFx0ZWxlbWVudHMuc3BsaWNlKGksIDEpO1xyXG5cdFx0XHRcdFx0aSA9IC0xO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGZvcihsZXQgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR0aGlzLl9pbmRleGVzRHJhZ2dlZC5wdXNoKGVsZW1lbnRzW2ldLmluZGV4KTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0cmV0dXJuIHNlcmllcztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgYWxsIHNlcmllcyB3aGljaCB3ZXJlIGZvdW5kIGluIHRoZSBzZXJpZSBub2RlIGl0ZW0oZS5nLiBhIG5vcm1hbCBzZXJpZSBvciBjYWxjdWxhdGVkIHNlcmllcylcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHsqfSBpdGVtXHJcblx0ICogQHJldHVybnMge0FycmF5PEJhc2VTZXJpZXM+fVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBnZXRTZXJpZXNGcm9tSXRlbShpdGVtKTogQXJyYXk8QmFzZVNlcmllcz57XHJcblx0XHRsZXQgc2lnbmFscyA9IG5ldyBBcnJheTxCYXNlU2VyaWVzPigpO1xyXG5cdFx0aWYoaXRlbSBpbnN0YW5jZW9mIFNlcmllTm9kZSAmJiBpdGVtLnNlcmllICE9IHVuZGVmaW5lZCl7IC8vIElzIFNpZ25hbCBub2RlXHJcblx0XHRcdHNpZ25hbHMucHVzaChpdGVtLnNlcmllKTtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYoaXRlbSBpbnN0YW5jZW9mIFNlcmllQ29udGFpbmVyKXsgLy8gaXMgY2FsY3VsYXRpb24oZ3JvdXAgbm9kZSkgd2l0aCBzaWduYWxzXHJcblx0XHRcdHJldHVybiBpdGVtLmdldFNlcmllcygpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHNpZ25hbHM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJcyB0aGUgZ2l2ZW4gaXRlbSBhIGdyb3VwIGl0ZW0gKGUuZy4gbmVlZGVkIGZvciBzZXR0aW5nIHRoZSBmb250IHN0eWxlIHRvIGJvbGQpXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7SVNlcmllQ29udGFpbmVyfSBpdGVtXHJcblx0ICogQHJldHVybnNcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaXNHcm91cEl0ZW0oaXRlbTogSVNlcmllQ29udGFpbmVyKXtcclxuXHRcdGlmKGl0ZW0gPT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0aWYoaXRlbS52aXNpYmxlQ2hpbGRzICE9IHVuZGVmaW5lZCl7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0aW5zZXJ0Q2FsY3VsYXRpb24oaXRlbSl7XHJcblx0XHRpZihpdGVtID09IHVuZGVmaW5lZCl7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdHZhciBzZWxlY3RlZEl0ZW0gPSBpdGVtLml0ZW07XHJcblx0XHR2YXIgc2VyaWVHcm91cDtcclxuXHRcdGlmKHNlbGVjdGVkSXRlbSBpbnN0YW5jZW9mIFNlcmllR3JvdXAgfHwgc2VsZWN0ZWRJdGVtIGluc3RhbmNlb2YgU2lnbmFsQ2F0ZWdvcnkpe1xyXG5cdFx0XHQvLyBDYWxjdWxhdGlvbiBjYW4gb25seSBiZSBpbnNlcnQgYXQgZ3JvdXBzIG9yIGNhdGVnb3JpZXNcclxuXHRcdFx0c2VyaWVHcm91cCA9IHNlbGVjdGVkSXRlbTtcclxuXHRcdH1cclxuXHRcdGVsc2V7XHJcblx0XHRcdHNlcmllR3JvdXAgPSBzZWxlY3RlZEl0ZW0uZ2V0U2VyaWVHcm91cCgpO1xyXG5cdFx0fVxyXG5cdFx0aWYoc2VyaWVHcm91cCAhPSB1bmRlZmluZWQpe1xyXG5cclxuXHRcdFx0dGhpcy5hY3RpdmF0ZUVkaXRNb2RlKHRydWUpO1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5hZGRDYWxjdWxhdGlvblRvQ29udGFpbmVyKHNlcmllR3JvdXApO1xyXG5cdFx0XHRcclxuXHRcdFx0Ly8gVE9ETzogT3BlbiBlZGl0IGNlbGwgb24gY2FsY3VsYXRvciB0eXBlXHJcblx0XHRcdC8qaWYoY2FsY3VsYXRpb24uY2hpbGRzWzBdIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlKXtcclxuXHRcdFx0XHRsZXQgY2FsY1R5cGUgPSBjYWxjdWxhdGlvbi5jaGlsZHNbMF0gYXMgU2lnbmFsTWFuYWdlckNhbGN1bGF0b3JUeXBlO1xyXG5cdFx0XHRcdGxldCB0cmVlT2JqZWN0ID0gdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpOyBcclxuXHRcdFx0XHQvL3RyZWVPYmplY3Quc2VsZWN0Q2VsbHMoKTtcclxuXHRcdFx0XHRcdC8vdHJlZU9iamVjdC5lZGl0Q2VsbCgwLCAnVGVzdCcpO1xyXG5cdFx0XHR9Ki9cclxuXHRcdH1cclxuXHRcdHJldHVybiB1bmRlZmluZWQ7XHJcblx0fVxyXG5cdFxyXG5cdHByaXZhdGUgYWRkQ2FsY3VsYXRpb25Ub0NvbnRhaW5lcihjb250YWluZXI6IElTZXJpZUNvbnRhaW5lcik6IFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbntcclxuXHRcdGxldCBjYWxjdWxhdGlvbiA9IG5ldyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb24oXCJDYWxjdWxhdGlvblwiKTtcclxuXHRcdHRoaXMuX3NlcmllQ29udGFpbmVyVG9TZWxlY3RBZnRlclJlZnJlc2ggPSBjYWxjdWxhdGlvbjtcclxuXHRcdGNvbnRhaW5lci5hZGRTZXJpZUNvbnRhaW5lcihjYWxjdWxhdGlvbiwgLTEpO1xyXG5cdFx0cmV0dXJuIGNhbGN1bGF0aW9uO1xyXG5cdH1cclxuXHJcblx0YWN0aXZhdGVFZGl0TW9kZShhY3RpdmF0ZTogYm9vbGVhbil7XHJcblx0XHRpZih0aGlzLmVkaXRNb2RlQWN0aXZlICE9IGFjdGl2YXRlKXtcclxuXHRcdFx0Ly8gU2hvdyBvciBoaWRlIGVkaXQgbW9kZSBjb2x1bW5zXHJcblx0XHRcdGxldCB0cmVlT2JqZWN0ID0gdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpOyBcclxuXHRcdFx0bGV0IHZhbHVlQ29sdW1uID0gdHJlZU9iamVjdC5nZXRDb2x1bW5CeUZpZWxkKFNpZ25hbE1hbmFnZXJXaWRnZXQudmFsdWVDb2x1bW5JZCk7XHJcblx0XHRcdGxldCBkZXNjcmlwdGlvbkNvbHVtbiA9IHRyZWVPYmplY3QuZ2V0Q29sdW1uQnlGaWVsZChTaWduYWxNYW5hZ2VyV2lkZ2V0LmRlc2NyaXB0aW9uQ29sdW1uSWQpO1xyXG5cdFx0XHRsZXQgY29sb3JDb2x1bW4gPSB0cmVlT2JqZWN0LmdldENvbHVtbkJ5RmllbGQoU2lnbmFsTWFuYWdlcldpZGdldC5jb2xvckNvbHVtbklkKTtcclxuXHRcdFx0aWYoYWN0aXZhdGUgPT0gdHJ1ZSl7XHJcblx0XHRcdFx0dHJlZU9iamVjdC5zaG93Q29sdW1uKHZhbHVlQ29sdW1uLmhlYWRlclRleHQpO1xyXG5cdFx0XHRcdHRyZWVPYmplY3Quc2hvd0NvbHVtbihkZXNjcmlwdGlvbkNvbHVtbi5oZWFkZXJUZXh0KTtcclxuXHRcdFx0XHR0cmVlT2JqZWN0LnNob3dDb2x1bW4oY29sb3JDb2x1bW4uaGVhZGVyVGV4dCk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZXtcclxuXHRcdFx0XHR0cmVlT2JqZWN0LmhpZGVDb2x1bW4odmFsdWVDb2x1bW4uaGVhZGVyVGV4dCk7XHJcblx0XHRcdFx0dHJlZU9iamVjdC5oaWRlQ29sdW1uKGRlc2NyaXB0aW9uQ29sdW1uLmhlYWRlclRleHQpO1xyXG5cdFx0XHRcdHRyZWVPYmplY3QuaGlkZUNvbHVtbihjb2xvckNvbHVtbi5oZWFkZXJUZXh0KTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLnNldEVkaXRNb2RlKGFjdGl2YXRlKTtcclxuXHRcdFx0dGhpcy5yZWZyZXNoKHRoaXMuZGF0YU1vZGVsLmRhdGEpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0cnVlIGlmIG9uZSBvZiB0aGUgaXRlbXMgZGVsZXRlZCBoYXMgYmVlbiBkb25lIHRocm91Z2ggdGhlIHRyYWNlIG9mIG1hcHBDb2NrcGl0XHJcblx0ICpcclxuXHQgKiBAcGFyYW0geyp9IHNlbGVjdGVkSXRlbXNcclxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBjb250YWluc0l0ZW1XaXRoaW5SZWNlbnRPclVwbG9hZGVkKHNlbGVjdGVkSXRlbXM6IEFycmF5PGFueT4pOiBib29sZWFuIHtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc2VsZWN0ZWRJdGVtcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZiAodGhpcy5pc0l0ZW1JblNpZ25hbENhdGVnb3J5KHNlbGVjdGVkSXRlbXNbaV0uaXRlbSwgU2lnbmFsQ2F0ZWdvcnkuQ2F0ZWdvcnlJZFVwbG9hZGVkKSB8fCB0aGlzLmlzSXRlbUluU2lnbmFsQ2F0ZWdvcnkoc2VsZWN0ZWRJdGVtc1tpXS5pdGVtLCBTaWduYWxDYXRlZ29yeS5DYXRlZ29yeUlkUmVjZW50KSkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGl0ZW0gc2VsZWN0ZWQgYmVsb25ncyB0byB0aGUgc2lnbmFsIGNhdGVnb3J5IHNlbGVjdGVkXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7Kn0gaXRlbVxyXG5cdCAqIEBwYXJhbSB7Kn0gc2lnbmFsQ2F0ZWdvcnlJZFxyXG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBpc0l0ZW1JblNpZ25hbENhdGVnb3J5KGl0ZW06IElTZXJpZU5vZGUgfCBJU2VyaWVDb250YWluZXIsIHNpZ25hbENhdGVnb3J5SWQ6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cdFx0bGV0IHBhcmVudCA9IGl0ZW0ucGFyZW50O1xyXG5cclxuXHRcdGlmIChwYXJlbnQgaW5zdGFuY2VvZiBTaWduYWxDYXRlZ29yeSAmJiBwYXJlbnQuaWQgPT0gc2lnbmFsQ2F0ZWdvcnlJZCkge1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKCEocGFyZW50IGluc3RhbmNlb2YgU2lnbmFsUm9vdCkpe1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5pc0l0ZW1JblNpZ25hbENhdGVnb3J5KHBhcmVudCEsIHNpZ25hbENhdGVnb3J5SWQpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYSBtZXNzYWdlIGJveCB0aGF0IGxldHMgdXNlciBkZWNpZGUgdG8gZGVsZXRlIHNlbGVjdGVkIGRhdGEgb3Igbm90XHJcblx0ICpcclxuXHQgKiBAcGFyYW0geyp9IGRlbGV0ZWRJdGVtc1xyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHVibGljIHNob3dNZXNzYWdlQm94Rm9yRGVsZXRpbmdJdGVtKGRlbGV0ZWRJdGVtcykge1xyXG5cdFx0bGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XHJcblx0XHRsZXQgc2VsZiA9IHRoaXM7XHJcblx0XHRcclxuXHRcdG5ldyBBbGVydERpYWxvZygpLmNyZWF0ZU1lc3NhZ2VCb3godGhpcy5fbWVzc2FnZUJveEhlYWRlcix0aGlzLl9tZXNzYWdlQm94Q29udGVudCwgbWVzc2FnZUJveFR5cGUuQ2FuY2VsRGVsZXRlLCBkZWZlcnJlZCk7XHJcblxyXG5cdFx0JC53aGVuKGRlZmVycmVkKS5kb25lKGZ1bmN0aW9uKCl7XHJcblx0XHRcdHNlbGYuZGVsZXRlSXRlbXMoZGVsZXRlZEl0ZW1zKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcbiAgICBwdWJsaWMgZGVsZXRlSXRlbXMoaXRlbXMpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVsZXRlSXRlbShpdGVtc1tpXS5pdGVtKTtcclxuICAgICAgICB9XHJcblx0fVxyXG5cdFxyXG5cdGRlbGV0ZUl0ZW0oaXRlbSl7XHJcblx0XHRpZihpdGVtLmNhbkRlbGV0ZSl7XHJcblx0XHRcdGlmKGl0ZW0gaW5zdGFuY2VvZiBTZXJpZU5vZGUpe1xyXG5cdFx0XHRcdHRoaXMucmVtb3ZlU2VyaWVOb2RlKGl0ZW0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2V7XHJcblx0XHRcdFx0dGhpcy5yZW1vdmVTZXJpZUNvbnRhaW5lcihpdGVtKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQgKiAgUmVtb3ZlIHRoZSBzaWduYWwgY29udGFpbmVyIHdpdGggYWxsIHN1YiBjb250YWluZXJzIGFuZCBzaWduYWxzIGZyb20gZGF0YW1vZGVsXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7SVNlcmllQ29udGFpbmVyfSBzZXJpZUdyb3VwXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIHJlbW92ZVNlcmllQ29udGFpbmVyKHNlcmllR3JvdXA6IElTZXJpZUNvbnRhaW5lcil7XHJcblx0XHQoPElTaWduYWxNYW5hZ2VyRGF0YU1vZGVsPnRoaXMuX2RhdGFNb2RlbCkucmVtb3ZlU2VyaWVDb250YWluZXIoc2VyaWVHcm91cCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmVzIHRoZSBzaWduYWwgZnJvbSBkYXRhbW9kZWxcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHtJU2VyaWVOb2RlfSBzZXJpZU5vZGVcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgcmVtb3ZlU2VyaWVOb2RlKHNlcmllTm9kZTogSVNlcmllTm9kZSl7XHJcblx0XHQoPElTaWduYWxNYW5hZ2VyRGF0YU1vZGVsPnRoaXMuX2RhdGFNb2RlbCkucmVtb3ZlU2VyaWVOb2RlKHNlcmllTm9kZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBFeHBvcnRzIGEgc2VyaWVHcm91cFxyXG5cdCAqXHJcblx0ICogQHB1YmxpY1xyXG5cdCAqIEBwYXJhbSB7QXJyYXk8RXhwb3J0U2VyaWVHcm91cD59IGVsZW1lbnRzXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJUcmVlR3JpZFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBleHBvcnRTZXJpZUdyb3VwKGVsZW1lbnRzOiBBcnJheTxFeHBvcnRTZXJpZUdyb3VwPil7XHJcblx0XHR0aGlzLnNldEJ1c3lJbmZvcm1hdGlvbihuZXcgQnVzeUluZm9ybWF0aW9uKFwiRXhwb3J0aW5nIGRhdGEuLi5cIiwgSW1hZ2VJZC5kZWZhdWx0SW1hZ2UsIDQ4LCB0cnVlKSk7XHJcblx0XHR0aGlzLnNldEJ1c3kodHJ1ZSk7XHJcblx0XHQvLyBUaW1lb3V0IG5lZWRlZCB0byBzaG93IHRoZSBidXN5c2NyZWVuIGJlZm9yZSBleHBvcnRpbmcgZGF0YSBcclxuXHRcdHNldFRpbWVvdXQoKCkgPT4gdGhpcy5leHBvcnREYXRhKGVsZW1lbnRzKSwgMjAwKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE9wZW5zIGEgZmlsZSBzZWxlY3QgZGlhbG9nIGFuZCBpbXBvcnRzIGEgc2VyaWVHcm91cCBmcm9tIHRoZSBmaWxlXHJcblx0ICpcclxuXHQgKiBAcHVibGljXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJUcmVlR3JpZFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBpbXBvcnRTZXJpZUdyb3VwKCl7XHJcblx0XHR0aGlzLl9zZXJpZUNvbnRhaW5lclRvU2VsZWN0QWZ0ZXJSZWZyZXNoID0gdW5kZWZpbmVkO1xyXG5cdFx0dGhpcy5fZmlsZVByb3ZpZGVyLmV2ZW50VXBsb2FkRGF0YUZpbmlzaGVkLmF0dGFjaCh0aGlzLl91cGxvYWREYXRhRmluaXNoZWRIYW5kbGVyKTtcclxuXHRcdHRoaXMuX2ZpbGVQcm92aWRlci51cGxvYWREYXRhKFwiLmNzdlwiLCB0cnVlKTsgLy8gT25seSBzaG93L2FjY2VwdCAqLmNzdiBmaWxlc1xyXG5cdH1cclxuXHJcblx0XHJcblx0LyoqXHJcblx0ICogT2NjdXJzIGFmdGVyIHJlYWRpbmcgZGF0YSBmcm9tIGZpbGUodHJhY2UgaW1wb3J0IGRhdGEpXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7SFRNTElucHV0RWxlbWVudH0gc2VuZGVyXHJcblx0ICogQHBhcmFtIHtNYXA8c3RyaW5nLCBzdHJpbmc+fSBhcmdzXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIG9uVXBsb2FkRGF0YUZpbmlzaGVkKHNlbmRlcjogSFRNTElucHV0RWxlbWVudCwgYXJnczogTWFwPHN0cmluZywgc3RyaW5nPil7XHJcblx0XHR0aGlzLnNldEJ1c3lJbmZvcm1hdGlvbihuZXcgQnVzeUluZm9ybWF0aW9uKFwiSW1wb3J0aW5nIGRhdGEuLi5cIiwgSW1hZ2VJZC5kZWZhdWx0SW1hZ2UsIDQ4LCB0cnVlKSk7XHJcblx0XHR0aGlzLnNldEJ1c3kodHJ1ZSk7XHJcblx0XHRcclxuXHRcdC8vIFRpbWVvdXQgbmVlZGVkIHRvIHNob3cgdGhlIGJ1c3lzY3JlZW4gYmVmb3JlIGltcG9ydGluZyBkYXRhIFxyXG5cdFx0c2V0VGltZW91dCgoKSA9PiB0aGlzLmltcG9ydERhdGEoc2VuZGVyLCBhcmdzKSwgMjAwKTtcclxuXHJcblx0XHR0aGlzLl9maWxlUHJvdmlkZXIuZXZlbnRVcGxvYWREYXRhRmluaXNoZWQuZGV0YWNoKHRoaXMuX3VwbG9hZERhdGFGaW5pc2hlZEhhbmRsZXIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRXhwb3J0cyB0aGUgZ2l2ZW4gc2lnbmFsIGdyb3VwIHRvIFRyYWNlRGF0YS5jc3YgZmlsZVxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0geyBBcnJheTxFeHBvcnRTZXJpZUdyb3VwPn0gZWxlbWVudHNcclxuXHQgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlcldpZGdldFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZXhwb3J0RGF0YShlbGVtZW50czogQXJyYXk8RXhwb3J0U2VyaWVHcm91cD4pe1xyXG5cdFx0bGV0IGRhdGEgPSBFeHBvcnRJbXBvcnRIZWxwZXIuZXhwb3J0VHJhY2VEYXRhKGVsZW1lbnRzKTtcclxuXHRcdGlmKGRhdGEgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtkYXRhXSwgeyB0eXBlOiBcInRleHQvY3N2XCIgfSk7XHJcblx0XHRcdEZpbGVQcm92aWRlci5kb3dubG9hZERhdGEoXCJUcmFjZURhdGEuY3N2XCIsIGJsb2IpOyAgICBcclxuXHRcdH1cclxuXHRcdHRoaXMuc2V0QnVzeShmYWxzZSk7XHJcblx0fVxyXG5cclxuXHJcblx0LyoqXHJcblx0ICogaW1wb3J0cyB0aGUgZ2l2ZW4gZmlsZWRhdGEgd2l0aCB0aGUgZ2l2ZW4gZmlsZW5hbWUgdG8gdGhlIHNpZ25hbCBtYW5hZ2VyIGRhdGFtb2RlbFxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0ge0hUTUxJbnB1dEVsZW1lbnR9IGZpbGVJbnB1dEVsZW1lbnRcclxuXHQgKiBAcGFyYW0ge01hcDxzdHJpbmcsIHN0cmluZz59IGZpbGVDb250ZW50c1xyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBpbXBvcnREYXRhKGZpbGVJbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQsIGZpbGVDb250ZW50czogTWFwPHN0cmluZywgc3RyaW5nPil7XHJcblxyXG5cdFx0ZmlsZUNvbnRlbnRzLmZvckVhY2goKGZpbGVEYXRhLCBmaWxlbmFtZSkgPT4ge1xyXG5cdFx0XHRsZXQgc2VyaWVHcm91cHMgPSBFeHBvcnRJbXBvcnRIZWxwZXIuaW1wb3J0VHJhY2VEYXRhKGZpbGVEYXRhLCBmaWxlbmFtZSk7XHJcblx0XHRcdGxldCBzaWduYWxGaWxlID0gbmV3IFNlcmllQ29udGFpbmVyKGZpbGVuYW1lKTtcclxuXHRcdFx0XHJcblx0XHRcdHNlcmllR3JvdXBzLmZvckVhY2goc2VyaWVHcm91cCA9PntcdFxyXG5cdFx0XHRcdHNpZ25hbEZpbGUuYWRkU2VyaWVDb250YWluZXIoc2VyaWVHcm91cCwgLTEpO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0dGhpcy5fc2VyaWVDb250YWluZXJUb1NlbGVjdEFmdGVyUmVmcmVzaCA9IHNpZ25hbEZpbGU7XHJcblx0XHRcdCg8SVNpZ25hbE1hbmFnZXJEYXRhTW9kZWw+dGhpcy5fZGF0YU1vZGVsKS5hZGRTZXJpZUNvbnRhaW5lcihzaWduYWxGaWxlLCBTaWduYWxDYXRlZ29yeS5DYXRlZ29yeUlkSW1wb3J0ZWQpO1xyXG5cdFx0fSk7XHJcblx0XHRcclxuXHJcblx0XHR0aGlzLnNldEJ1c3koZmFsc2UpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2VsZWN0cyB0aGUgZ2l2ZW4gY29udGFpbmVyIGluIHRoZSB0cmVlIGdyaWQgYW5kIHNjcm9sbHMgdG8gaXQgaWYgb3V0IG9mIHRoZSB3aW5kb3cgKFRPRE86IE1vdmUgdG8gQmFzZUNsYXNzIGluY2wuIF9zZXJpZUNvbnRhaW5lclRvU2VsZWN0QWZ0ZXJSZWZyZXNoKVxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0geyhJU2VyaWVDb250YWluZXJ8dW5kZWZpbmVkKX0gY29udGFpbmVyXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIHNlbGVjdEl0ZW0oY29udGFpbmVyOiBJU2VyaWVDb250YWluZXJ8dW5kZWZpbmVkKXtcclxuXHRcdGxldCB0cmVlT2JqZWN0ID0gdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpOyBcclxuXHRcdGxldCByZWNvcmQgPSAoPGFueT50cmVlT2JqZWN0Lm1vZGVsKS5mbGF0UmVjb3Jkcy5maWx0ZXIocmVjb3JkID0+IHtyZXR1cm4gcmVjb3JkLml0ZW0gPT09IGNvbnRhaW5lcn0pWzBdO1xyXG5cdFx0aWYocmVjb3JkICE9IHVuZGVmaW5lZCl7XHJcblx0XHRcdC8vIGV4cGFuZCBwYXJlbnQgbm9kZSBpZiBpdCBpcyBjb2xsYXBzZWQgdG8gc2VlIHRoZSBuZXcgaW1wb3J0ZWQgdHJhY2UgZGF0YVxyXG5cdFx0XHRpZihyZWNvcmQucGFyZW50SXRlbS5leHBhbmRTdGF0ZSA9PSBmYWxzZSl7XHJcblx0XHRcdFx0dHJlZU9iamVjdC5leHBhbmRDb2xsYXBzZVJvdyhyZWNvcmQucGFyZW50SXRlbS5pbmRleClcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gdHJlZU9iamVjdC5zY3JvbGxPZmZzZXQgbm90IHBvc3NpYmxlIGlmIHRoZXJlIHdvdWxkIGJlIHNvbWUgZnJlZSBzcGFjZSBhZnRlciB0aGUgbGFzdCBpdGVtIGluIHRoZSB0cmVlIGdyaWQgYWZ0ZXIgc2Nyb2xsaW5nIHRvIHRoZSBnaXZlbiBpdGVtXHJcblx0XHRcdC8vID0+IHNjcm9sbFRvQm90dG9tIGJlZm9yIHNjcm9sbCB0byBhIHNwZWNpYWwgb2Zmc2V0IGlmIHBvc3NpYmxlXHJcblx0XHRcdHRyZWVPYmplY3Quc2Nyb2xsVG9Cb3R0b20oKTtcclxuXHRcdFx0dHJlZU9iamVjdC5zZXRNb2RlbCh7XCJzZWxlY3RlZFJvd0luZGV4XCIgOiByZWNvcmQuaW5kZXggfSk7XHJcblx0XHRcdGxldCByb3dIZWlnaHQgPSB0cmVlT2JqZWN0Lm1vZGVsLnJvd0hlaWdodDtcclxuXHRcdFx0Ly8gc2Nyb2xsIGluZGV4IG5vdCB0aGUgc2FtZSBhcyB0aGUgc2VsZWN0ZWRJbmRleCA9PiBjb2xsYXBzZWQgbm9kZXMgbXVzdCBiZSBjb25zaWRlcmVkXHJcblx0XHRcdGxldCBzY3JvbGxJbmRleD0gdGhpcy5nZXRTY3JvbGxJbmRleCgoPGFueT50cmVlT2JqZWN0Lm1vZGVsKS5mbGF0UmVjb3JkcywgcmVjb3JkLmluZGV4KTtcclxuXHRcdFx0bGV0IHNjcm9sbE9mZnNldCA9ICAoc2Nyb2xsSW5kZXgtMSkqcm93SGVpZ2h0ITtcclxuXHRcdFx0dHJlZU9iamVjdC5zY3JvbGxPZmZzZXQoXCIwXCIsIHNjcm9sbE9mZnNldC50b1N0cmluZygpKTsgLy8gVXNlIHBhcmVudCBpbmRleCB0byBzZWUgdGhlIHBhcmVudCBub2RlIGluIHRoZSB2aWV3XHJcblx0XHRcdC8vKDxhbnk+dHJlZU9iamVjdCkudXBkYXRlU2Nyb2xsQmFyKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSBpbmRleCBvZiBvbmx5IHRoZSB2aXNpYmxlKGV4cGFuZGVkKSByb3dzXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7QXJyYXk8YW55Pn0gcm93c1xyXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSByb3dJbmRleFxyXG5cdCAqIEByZXR1cm5zIHtudW1iZXJ9XHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIGdldFNjcm9sbEluZGV4KHJvd3M6IEFycmF5PGFueT4sIHJvd0luZGV4OiBudW1iZXIpOiBudW1iZXJ7XHJcblx0XHRsZXQgc2Nyb2xsSW5kZXggPSAwO1xyXG5cdFx0Zm9yKGxldCBpPTA7IGk8IHJvd3MubGVuZ3RoOyBpKyspe1xyXG5cdFx0XHRpZihyb3dzW2ldLmluZGV4ID09IHJvd0luZGV4KXtcclxuXHRcdFx0XHRzY3JvbGxJbmRleCsrXHJcblx0XHRcdFx0cmV0dXJuIHNjcm9sbEluZGV4O1xyXG5cdFx0XHR9XHJcblx0XHRcdC8qaWYocm93c1tpXS5pdGVtIGluc3RhbmNlb2YgU2VyaWVHcm91cCl7XHJcblx0XHRcdFx0aWYodGhpcy5pc1Zpc2libGVTZXJpZUdyb3VwTm9kZShyb3dzW2ldKSA9PSBmYWxzZSl7XHJcblx0XHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0c2Nyb2xsSW5kZXgrKztcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlICovaWYocm93c1tpXS5pdGVtIGluc3RhbmNlb2YgU2VyaWVDb250YWluZXIpe1xyXG5cdFx0XHRcdGlmKHRoaXMuaXNWaXNpYmxlU2VyaWVHcm91cE5vZGUocm93c1tpXSkgPT0gZmFsc2Upe1xyXG5cdFx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHNjcm9sbEluZGV4Kys7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSBpZihyb3dzW2ldLml0ZW0gaW5zdGFuY2VvZiBTZXJpZU5vZGUpe1xyXG5cdFx0XHRcdGlmKHRoaXMuaXNWaXNpYmxlU2VyaWVOb2RlKHJvd3NbaV0pID09IGZhbHNlKXtcclxuXHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRzY3JvbGxJbmRleCsrO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gc2Nyb2xsSW5kZXg7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGlzVmlzaWJsZVNlcmllR3JvdXBOb2RlKG5vZGUpOiBib29sZWFue1xyXG5cdFx0aWYobm9kZS5wYXJlbnRJdGVtICE9IG51bGwpe1xyXG5cdFx0XHRpZihub2RlLnBhcmVudEl0ZW0uZXhwYW5kU3RhdGUgPT0gZmFsc2Upe1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIGlmKG5vZGUucGFyZW50SXRlbS5wYXJlbnRJdGVtICE9IHVuZGVmaW5lZCl7XHJcblx0XHRcdFx0aWYobm9kZS5wYXJlbnRJdGVtLnBhcmVudEl0ZW0uZXhwYW5kU3RhdGUgPT0gZmFsc2Upe1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGlzVmlzaWJsZVNlcmllTm9kZShub2RlKTogYm9vbGVhbntcclxuXHRcdGlmKG5vZGUucGFyZW50SXRlbS5leHBhbmRTdGF0ZSA9PSBmYWxzZSB8fCBub2RlLnBhcmVudEl0ZW0ucGFyZW50SXRlbS5leHBhbmRTdGF0ZSA9PSBmYWxzZSl7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYobm9kZS5wYXJlbnRJdGVtLnBhcmVudEl0ZW0ucGFyZW50SXRlbSAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHRpZihub2RlLnBhcmVudEl0ZW0ucGFyZW50SXRlbS5wYXJlbnRJdGVtLmV4cGFuZFN0YXRlID09IGZhbHNlKXtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSB0cmVlR3JpZE5vZGVFeHBhbmRlZE9yQ29sbGFwc2VkKCl7XHJcbiAgICAgICAgLy8gUmVmcmVzaCB0byBzZWUgY29ycmVjdCBleHBhbmRlZC9jb2xsYXBzZWQgaWNvblxyXG4gICAgICAgIHRoaXMucmVmcmVzaCh0aGlzLmRhdGFNb2RlbC5kYXRhKTtcclxuICAgIH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgY29sdW1uIHRlbXBsYXRlIGluZm9ybWF0aW9uc1xyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gY29sdW1uSWRcclxuXHQgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBnZXRDb2x1bW5UZW1wbGF0ZURhdGEoY29sdW1uSWQ6IHN0cmluZykgOiBzdHJpbmd7XHJcblx0XHRpZihjb2x1bW5JZCA9PSBTaWduYWxNYW5hZ2VyV2lkZ2V0LmNvbG9yQ29sdW1uSWQpe1xyXG5cdFx0XHRyZXR1cm4gYDxzY3JpcHQgdHlwZT1cInRleHQveC1qc3JlbmRlclwiIGlkPVwic21Db2xvckNvbHVtblRlbXBsYXRlXCI+XHJcblx0XHRcdFx0XHRcdDxkaXYgc3R5bGU9J2hlaWdodDoyMHB4O3BhZGRpbmctbGVmdDo3cHg7cGFkZGluZy10b3A6NHB4OycgdW5zZWxlY3RhYmxlPSdvbic+XHJcblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz0nZS1jZWxsJyBzdHlsZT0nZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6MTdweDtoZWlnaHQ6MTdweDtiYWNrZ3JvdW5kLWNvbG9yOiB7ezojZGF0YVsnY29sb3InXX19OycgdW5zZWxlY3RhYmxlPSdvbic+PC9kaXY+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PC9zY3JpcHQ+YFxyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZihjb2x1bW5JZCA9PSBTaWduYWxNYW5hZ2VyV2lkZ2V0Lm5hbWVDb2x1bW5JZCl7XHJcblx0XHRcdHJldHVybiBgPHNjcmlwdCB0eXBlPVwidGV4dC94LWpzcmVuZGVyXCIgaWQ9XCJzbU5hbWVDb2x1bW5UZW1wbGF0ZVwiPlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IHN0eWxlPSdoZWlnaHQ6MjBweDsnIHVuc2VsZWN0YWJsZT0nb24nPlxyXG5cdFx0XHRcdFx0XHRcdHt7aWYgaGFzQ2hpbGRSZWNvcmRzfX1cclxuXHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9J2ludGVuZCcgc3R5bGU9J2hlaWdodDoxcHg7IGZsb2F0OmxlZnQ7IHdpZHRoOnt7OmxldmVsKjEwfX1weDsgZGlzcGxheTppbmxpbmUtYmxvY2s7Jz48L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHR7e2Vsc2UgIWhhc0NoaWxkUmVjb3Jkc319XHJcblx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPSdpbnRlbmQnIHN0eWxlPSdoZWlnaHQ6MXB4OyBmbG9hdDpsZWZ0OyB3aWR0aDp7ezpsZXZlbCoxMH19cHg7IGRpc3BsYXk6aW5saW5lLWJsb2NrOyc+PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0e3svaWZ9fVxyXG5cdFx0XHRcdFx0XHRcdHt7OiNkYXRhWydpY29uRGVmaW5pdGlvbiddfX1cclxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPSdlLWNlbGwnIHN0eWxlPSdkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDoxMDAlJyB1bnNlbGVjdGFibGU9J29uJz57ezojZGF0YVsnbmFtZSddfX08L2Rpdj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8L3NjcmlwdD5gO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIFwiXCI7XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIFJhaXNlcyB0aGUgc2VyaWVzIGRvdWJsZSBjbGljayBldmVudFxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNpZ25hbFxyXG5cdCAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyV2lkZ2V0XHJcblx0ICovXHJcblx0cHJpdmF0ZSBvblNlcmllc0RvdWJsZUNsaWNrZWQoc2VyaWVzOiBCYXNlU2VyaWVzKSB7XHJcblx0XHR0aGlzLmV2ZW50U2VyaWVEb3VibGVDbGlja2VkLnJhaXNlKHRoaXMsIHNlcmllcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSYWlzZXMgdGhlIGNoYW5nZSBzaXplIGV2ZW50XHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBzaXplXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwcml2YXRlIG9uQ2hhbmdlU2l6ZShzaXplOiBudW1iZXIpIHtcclxuXHRcdHRoaXMuZXZlbnRDaGFuZ2VTaXplLnJhaXNlKHRoaXMsIHNpemUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgYXZhaWxhYmxlIHRyYWNlIGRhdGFwb2ludHMgdG8gdGhlIHNpZ25hbCBtYW5hZ2VyIHdpZGdldFxyXG5cdCAqXHJcblx0ICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJXaWRnZXRcclxuXHQgKi9cclxuXHRwdWJsaWMgc2V0IGF2YWlsYWJsZURhdGFQb2ludHMoYXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzOiBQcm9wZXJ0eTxUcmFjZURhdGFQb2ludEluZm9bXT4pIHtcclxuXHRcdGF2YWlsYWJsZVRyYWNlRGF0YVBvaW50cy5jaGFuZ2VkKChkYXRhUG9pbnRzKT0+e1xyXG5cdFx0XHR0aGlzLl9hdmFpbGFibGVUcmFjZURhdGFQb2ludHMgPSBkYXRhUG9pbnRzO1xyXG5cdFx0fSlcclxuXHR9ICBcclxuXHJcbiAgICBkcm9wRm9jdXNMb3N0KGFyZ3M6IERyYWdEcm9wQXJncykge1xyXG5cdFx0dGhpcy5yZXNldERyYWdnZWRPdmVyRmxhZyh0aGlzLmRhdGFNb2RlbC5kYXRhKTtcclxuICAgICAgICB0aGlzLnJlc2V0SGlnaGxpZ2h0QXJlYSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBTaWduYWxNYW5hZ2VyV2lkZ2V0IH07Il19