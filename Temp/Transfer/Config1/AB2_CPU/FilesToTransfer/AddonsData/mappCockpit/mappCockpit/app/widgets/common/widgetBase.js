define(["require", "exports", "../../models/dataModelInterface", "./commonLayoutProvider", "./busyInformation", "./themeProvider", "./widgetsWithDropSupportProvider", "../../framework/store", "./imageProvider", "./dragDropArgs"], function (require, exports, dataModelInterface_1, commonLayoutProvider_1, busyInformation_1, themeProvider_1, widgetsWithDropSupportProvider_1, store_1, imageProvider_1, dragDropArgs_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WidgetBase = /** @class */ (function () {
        /**
         * Creates an instance of WidgetBase.
         * @memberof WidgetBase
         */
        function WidgetBase() {
            var _this = this;
            this._states = new store_1.Store();
            this._widgets = {};
            /**
             * holds the id (e.g. "MyId")
             *
             * @type {string}
             * @memberof WidgetBase
             */
            this.parentContentId = "";
            this.busyScreenId = "";
            this.flaggedForResize = false;
            this.widgetName = "";
            this._actualWidth = 0;
            this._actualHeight = 0;
            this._busyInformation = new busyInformation_1.BusyInformation();
            this._modelChangedHandler = function (sender, data) { _this.handleModelChanged(sender, data); };
            this._modelItemsChangedHandler = function (sender, data) { _this.handleModelItemsChanged(sender, data); };
            //#region Drop support
            this._supportedDragDropDataIds = new Array(); //e.g. Signal, ..
            //#endregion
            //#region drag support
            this._dropPossible = false;
            this._draggingSupportActive = false;
            this._defaultDropNotPossibleRepresentation = imageProvider_1.ImageProvider.getInstance().getImage("../app/widgets/common/style/images/dragDrop/dropNotPossible.svg");
            this._dataModel = new NullDataModel();
        }
        Object.defineProperty(WidgetBase.prototype, "view", {
            get: function () {
                return this._view;
            },
            set: function (view) {
                this._view = view;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WidgetBase.prototype, "states", {
            get: function () {
                return this._view ? this._view.states : this._states;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WidgetBase.prototype, "cssParentContentId", {
            /**
             * Returns the css id (e.g. "#MyId")
             *
             * @readonly
             * @type {string}
             * @memberof WidgetBase
             */
            get: function () {
                if (this.parentContentId != "") {
                    return "#" + this.parentContentId;
                }
                else {
                    return "";
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WidgetBase.prototype, "width", {
            /**
             * Returns the current width of the widget
             *
             * @readonly
             * @type {number}
             * @memberof WidgetBase
             */
            get: function () {
                return this._actualWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WidgetBase.prototype, "height", {
            /**
             * Returns the current height of the widget
             *
             * @readonly
             * @type {number}
             * @memberof WidgetBase
             */
            get: function () {
                return this._actualHeight;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Initializes the widget
         *
         * @param {string} layoutContainerId
         * @memberof WidgetBase
         */
        WidgetBase.prototype.initialize = function (layoutContainerId) {
            // Get the layout content
            this.parentContentId = layoutContainerId;
            this.loadStyles();
            this.createLayout();
            this.attachLayoutToView();
            this.createWidgets();
        };
        /**
         * Reinitializes the chart
         *
         * @memberof WidgetBase
         */
        WidgetBase.prototype.reinitialize = function () {
        };
        WidgetBase.prototype.attachLayoutToView = function (parentView) {
            if (parentView === void 0) { parentView = undefined; }
            var view = parentView ? parentView : this._view;
            if (view && this._layoutWidget) {
                this._layoutWidget.view = view;
            }
        };
        /**
         * Creates the layout of the widget
         *
         * @memberof WidgetBase
         */
        WidgetBase.prototype.createLayout = function () {
        };
        /**
         * Creates the widget content and eventually subwidgets
         *
         * @memberof WidgetBase
         */
        WidgetBase.prototype.createWidgets = function () {
        };
        /**
         * Load styles for WidgetBase
         *
         * @memberof WidgetBase
         */
        WidgetBase.prototype.loadStyles = function () {
            //this.styleLoaded(undefined);
        };
        ;
        WidgetBase.prototype.addStyle = function (filePath) {
            var themedFilePath = this.getThemedFilePath(filePath);
            $(this.cssParentContentId).append('<link rel="stylesheet" href="' + themedFilePath + '" type="text/css" />');
            /*var link = document.createElement('link');
            link.type = 'text/css';
            link.rel = 'stylesheet';
            link.href = filePath;
            $(this.cssParentContentId).append(link);*/
            //this.loadCss($(this.cssParentContentId), filePath, (link) =>{this.styleLoaded(link)});
        };
        ;
        WidgetBase.prototype.addStyleToContentId = function (parentContentId, filePath) {
            var themedFilePath = this.getThemedFilePath(filePath);
            $(parentContentId).append('<link rel="stylesheet" href="' + themedFilePath + '" type="text/css" />');
        };
        WidgetBase.prototype.getThemedFilePath = function (filePath) {
            var themeProvider = themeProvider_1.ThemeProvider.getInstance();
            return themeProvider.getThemedFilePath(filePath);
        };
        Object.defineProperty(WidgetBase.prototype, "supportedDragDropDataIds", {
            get: function () {
                return this._supportedDragDropDataIds;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Adds the given dragdrop data id to this widget, and adds this widget to the WidgetsWithDropSupportProvider if not already there
         * Can only be used if the widget derives from IDroppable
         *
         * @param {string} id
         * @memberof WidgetBase
         */
        WidgetBase.prototype.addSupportedDragDropDataId = function (id) {
            widgetsWithDropSupportProvider_1.WidgetsWithDropSupportProvider.getInstance().addWidget(this);
            // check if already in list
            var index = this._supportedDragDropDataIds.indexOf(id);
            if (index == -1) {
                this._supportedDragDropDataIds.push(id);
            }
        };
        /**
         * Removes the given dragdrop data id from this widget, and if it is the last dragdrop data id, removes the widget from the WidgetsWithDropSupportProvider
         * Can only be used if the widget derives from IDroppable
         *
         * @param {string} id
         * @memberof WidgetBase
         */
        WidgetBase.prototype.removeSupportedDragDropDataId = function (id) {
            var index = this._supportedDragDropDataIds.indexOf(id);
            if (index != -1) {
                this._supportedDragDropDataIds.splice(index, 1);
            }
            if (this._supportedDragDropDataIds.length == 0) {
                widgetsWithDropSupportProvider_1.WidgetsWithDropSupportProvider.getInstance().removeWidget(this);
            }
        };
        /**
         * Adds dragging support to this widget; via IDraggable the widget can provide the information which object should be dragged
         *
         * @memberof WidgetBase
         */
        WidgetBase.prototype.addDraggingSupport = function () {
            var _this = this;
            if (this.parentContentId == "") {
                console.error("parentContentId not set for draggable support");
                return;
            }
            this._draggingSupportActive = true;
            this._draggingContainer = $(this.cssParentContentId);
            this._draggingContainer.ejDraggable({
                distance: 10,
                helper: function (args) { return _this.draggingHelper(args); },
                dragStart: function (args) { return _this.draggingStart(args); },
                dragStop: function (args) { return _this.draggingStop(args); },
                destroy: function (args) { return _this.draggingDestroy(args); },
                drag: function (args) { return _this.draggingDrag(args); },
            });
        };
        /**
         * Removes dragging support from this widget
         *
         * @memberof WidgetBase
         */
        WidgetBase.prototype.removeDraggingSupport = function () {
            this._draggingSupportActive = false;
            var ejDraggableObj = this._draggingContainer.data("ejDraggable");
            if (ejDraggableObj != undefined) {
                ejDraggableObj.destroy();
            }
        };
        /**
         * Will be called at the end of a drag&drop operation
         *
         * @private
         * @param {*} args
         * @memberof WidgetBase
         */
        WidgetBase.prototype.draggingDestroy = function (args) {
        };
        /**
         * Creates the temporary drag object for the drag & drop operation and adds it to the document body
         *
         * @private
         * @param {*} args
         * @returns
         * @memberof WidgetBase
         */
        WidgetBase.prototype.draggingHelper = function (args) {
            var ejDraggableObj = this._draggingContainer.data("ejDraggable");
            if (ejDraggableObj != undefined) {
                // Set drag object position (_relYposition and _relXposition are the positions within the draggable object)
                ejDraggableObj.option("cursorAt", { top: (ejDraggableObj._relYposition * -1) - 10, left: ejDraggableObj._relXposition * -1 }, true);
            }
            // Get the information of the drag object from widget
            var dragDataObject = this.startDragging();
            if (dragDataObject == undefined) {
                args.cancel = true;
                return;
            }
            this._dragDataObject = dragDataObject;
            this._defaultDragRepresentation = this._dragDataObject.representation;
            this._dragSymbol = $('<pre>').html(this._defaultDropNotPossibleRepresentation);
            // Adds the current data to the drag data
            this.setDragData(args, this._dragDataObject.data);
            this._dragSymbol.appendTo(document.body);
            return this._dragSymbol;
        };
        /**
         * Will be called at the beginning of a drag&drop operation
         *
         * @protected
         * @returns {(DragDropDataObject|undefined)}
         * @memberof WidgetBase
         */
        WidgetBase.prototype.startDragging = function () {
            return undefined;
        };
        /**
         * Will be called after the drop
         *
         * @protected
         * @memberof WidgetBase
         */
        WidgetBase.prototype.draggingStopped = function () {
        };
        /**
         * Removes the temporary drag object after drag & drop operation
         *
         * @private
         * @memberof WidgetBase
         */
        WidgetBase.prototype.removeDragObjectFromDocument = function () {
            for (var i = document.body.childNodes.length - 1; i >= 0; i--) {
                if (document.body.childNodes[i].nodeName == "PRE") {
                    document.body.childNodes[i].remove();
                }
            }
        };
        /**
         * Will be called at start dragging
         *
         * @private
         * @param {*} args
         * @returns
         * @memberof WidgetBase
         */
        WidgetBase.prototype.draggingStart = function (args) {
            var _this = this;
            var dragData = this.getDragData(args);
            if (dragData != undefined) {
                // Inform only widgets with drop support for the given dragDropDataId
                widgetsWithDropSupportProvider_1.WidgetsWithDropSupportProvider.getInstance().getWidgetsWithDragDropDataId(this._dragDataObject.id).forEach(function (widget) {
                    // call dragStart
                    widget.dragStart(new dragDropArgs_1.DragDropArgs(args.currentTarget, dragData, _this._defaultDragRepresentation));
                });
                return;
            }
            args.cancel = true;
        };
        /**
         * Will be called while dragging is active
         *
         * @private
         * @param {*} args
         * @memberof WidgetBase
         */
        WidgetBase.prototype.draggingDrag = function (args) {
            var _this = this;
            this._dropPossible = false;
            var currentDragDropElement = this._defaultDragRepresentation.clone();
            var dragData = this.getDragData(args);
            if (dragData != undefined) {
                var newWidget_1 = undefined;
                if (args.currentTarget != undefined) { // undefined if out of browser window
                    // Inform only widgets with drop support for the given dragDropDataId
                    widgetsWithDropSupportProvider_1.WidgetsWithDropSupportProvider.getInstance().getWidgetsWithDragDropDataId(this._dragDataObject.id).forEach(function (widget) {
                        // Only widget with currentTarget(divId) as parent should be informed
                        if (_this.isElementWithinWidget(args.currentTarget, widget.cssParentContentId)) {
                            newWidget_1 = widget;
                            // call dragOver
                            var dragDropArgs = new dragDropArgs_1.DragDropArgs(args.currentTarget, dragData, currentDragDropElement);
                            var dragOverPossible = widget.dragOver(dragDropArgs);
                            if (dragOverPossible) {
                                _this._dropPossible = dragOverPossible;
                            }
                        }
                    });
                }
                if (newWidget_1 != this._currentWidget) {
                    // DragOver changed from one widget to an other
                    if (this._currentWidget != undefined) {
                        this._currentWidget.dropFocusLost(args);
                    }
                    this._currentWidget = newWidget_1;
                }
            }
            if (this._dropPossible) {
                this._dragSymbol[0].innerHTML = currentDragDropElement.getDragDropElement();
            }
            else {
                this._dragSymbol[0].innerHTML = this._defaultDropNotPossibleRepresentation;
            }
        };
        /**
         * Will be called when dragging was stopped
         *
         * @private
         * @param {*} args
         * @memberof WidgetBase
         */
        WidgetBase.prototype.draggingStop = function (args) {
            var _this = this;
            var dragData = this.getDragData(args);
            if (this._dropPossible) {
                if (args.currentTarget != undefined) { // undefined if out of browser window
                    // Inform only widgets with drop support for the given dragDropDataId
                    widgetsWithDropSupportProvider_1.WidgetsWithDropSupportProvider.getInstance().getWidgetsWithDragDropDataId(this._dragDataObject.id).forEach(function (widget) {
                        // Only widget with currentTarget(divId) as parent should be informed
                        if (_this.isElementWithinWidget(args.currentTarget, widget.cssParentContentId)) {
                            // call drop
                            widget.drop(new dragDropArgs_1.DragDropArgs(args.currentTarget, dragData));
                        }
                    });
                }
            }
            // Inform only widgets with drop support for the given dragDropDataId
            widgetsWithDropSupportProvider_1.WidgetsWithDropSupportProvider.getInstance().getWidgetsWithDragDropDataId(this._dragDataObject.id).forEach(function (widget) {
                // call dragStop
                widget.dragStop(new dragDropArgs_1.DragDropArgs(args.currentTarget, dragData));
            });
            this.draggingStopped();
            this.removeDragObjectFromDocument();
        };
        WidgetBase.prototype.getDragData = function (args) {
            return args.element.data(this._dragDataObject.id);
        };
        WidgetBase.prototype.setDragData = function (args, data) {
            args.element.data(this._dragDataObject.id, data);
        };
        /**
         * Check if an element is a child of the given parent id
         *
         * @private
         * @param {*} element
         * @param {*} parentId
         * @returns
         * @memberof WidgetBase
         */
        WidgetBase.prototype.isElementWithinWidget = function (element, parentId) {
            var parent = element.closest(parentId);
            if (parent == null) {
                return false;
            }
            return true;
        };
        //#endregion
        /*private styleLoaded(link){
            
        }
    
        private loadCss(element, url, callback){
            var link = document.createElement('link');
            link.type = 'text/css';
            link.rel = 'stylesheet';
            link.href = url;
            
            element[0].appendChild(link);
        
            var img = document.createElement('img');
            img.onerror = function(){
                if(callback){
                    callback(link);
                }
            }
            img.src = url;
        }*/
        /**
         * Activate the WidgetBase
         *
         * @memberof WidgetBase
         */
        WidgetBase.prototype.activate = function () {
        };
        /**
         * Deactivate the WidgetBase
         *
         * @memberof WidgetBase
         */
        WidgetBase.prototype.deactivate = function () {
        };
        /**
         * Dispose the WidgetBase
         *
         * @memberof WidgetBase
         */
        WidgetBase.prototype.dispose = function () {
            if (this._draggingSupportActive == true) {
                this.removeDraggingSupport();
            }
            if (this._dataModel != undefined) {
                this._dataModel.eventModelChanged.detach(this._modelChangedHandler);
                this._dataModel.eventModelItemsChanged.detach(this._modelItemsChangedHandler);
            }
        };
        /**
         * Sets the busy screen information which will be shown when the busy flag true
         *
         * @param {BusyInformation} busyInformation
         * @memberof WidgetBase
         */
        WidgetBase.prototype.setBusyInformation = function (busyInformation) {
            this._busyInformation = busyInformation;
        };
        /**
         * Set the busy flag of the WidgetBase
         *
         * @param {boolean} flag if true busy screen will be shown
         * @memberof WidgetBase
         */
        WidgetBase.prototype.setBusy = function (flag) {
            this.busyScreenId = this.cssParentContentId + "busyScreen";
            if (flag == true) {
                var strippedId = this.busyScreenId.replace("#", "");
                var html = commonLayoutProvider_1.CommonLayoutProvider.getInstance().getBusyScreenLayout(strippedId, this._busyInformation);
                $(this.cssParentContentId).parent().append(html);
            }
            else {
                $(this.busyScreenId).remove();
            }
        };
        /**
         * Resize the WidgetBase
         *
         * @param {number} width
         * @param {number} height
         * @memberof WidgetBase
         */
        WidgetBase.prototype.resize = function (width, height) {
        };
        Object.defineProperty(WidgetBase.prototype, "dataModel", {
            get: function () {
                return this._dataModel;
            },
            set: function (dataModel) {
                // Detach events from old dataModel
                this.detachDataModelEvents();
                // Set new dataModel
                this._dataModel = dataModel;
                // Attach events to new dataModel
                this.attachDataModelEvents();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * attaches the data model events
         *
         * @private
         * @memberof WidgetBase
         */
        WidgetBase.prototype.attachDataModelEvents = function () {
            if (this._dataModel != undefined) {
                this._dataModel.eventModelChanged.attach(this._modelChangedHandler);
                this._dataModel.eventModelItemsChanged.attach(this._modelItemsChangedHandler);
            }
        };
        /**
         * detaches the data model events
         *
         * @private
         * @memberof WidgetBase
         */
        WidgetBase.prototype.detachDataModelEvents = function () {
            if (this._dataModel != undefined) {
                this._dataModel.eventModelChanged.detach(this._modelChangedHandler);
                this._dataModel.eventModelItemsChanged.detach(this._modelItemsChangedHandler);
            }
        };
        WidgetBase.prototype.handleModelChanged = function (sender, data) {
        };
        WidgetBase.prototype.handleModelItemsChanged = function (sender, eventArgs) {
        };
        WidgetBase.prototype.onObservablesChanged = function (changedObservables) {
        };
        return WidgetBase;
    }());
    exports.WidgetBase = WidgetBase;
    /**
     * the class implements the null object for the data model. It is intended to be set for widgets without a real data model
     *
     * @class NullDataModel
     * @implements {IDataModel}
     */
    var NullDataModel = /** @class */ (function () {
        function NullDataModel() {
            this.eventModelChanged = new dataModelInterface_1.EventModelChanged;
            this.eventModelItemsChanged = new dataModelInterface_1.EventModelItemsChanged;
        }
        NullDataModel.prototype.observeModelItems = function (observableItems) {
        };
        NullDataModel.prototype.onModelItemsChanged = function (sender, data) {
        };
        NullDataModel.prototype.handleModelItemsChanged = function (sender, data) {
        };
        NullDataModel.prototype.initialize = function () {
        };
        NullDataModel.prototype.dispose = function () {
        };
        NullDataModel.prototype.connect = function () {
        };
        NullDataModel.prototype.onModelChanged = function (sender, data) {
        };
        NullDataModel.prototype.handleModelChanged = function (sender, data) {
        };
        return NullDataModel;
    }());
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0QmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jb21tb24vd2lkZ2V0QmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFlQTtRQTZCSTs7O1dBR0c7UUFDSDtZQUFBLGlCQUdDO1lBbENTLFlBQU8sR0FBUyxJQUFJLGFBQUssRUFBRSxDQUFDO1lBRTVCLGFBQVEsR0FBK0IsRUFBRSxDQUFDO1lBS3BEOzs7OztlQUtHO1lBQ0gsb0JBQWUsR0FBVyxFQUFFLENBQUM7WUFDN0IsaUJBQVksR0FBRyxFQUFFLENBQUM7WUFFbEIscUJBQWdCLEdBQVksS0FBSyxDQUFDO1lBQ2xDLGVBQVUsR0FBVyxFQUFFLENBQUE7WUFFYixpQkFBWSxHQUFXLENBQUMsQ0FBQztZQUN6QixrQkFBYSxHQUFXLENBQUMsQ0FBQztZQUU1QixxQkFBZ0IsR0FBb0IsSUFBSSxpQ0FBZSxFQUFFLENBQUM7WUFFMUQseUJBQW9CLEdBQUcsVUFBQyxNQUFNLEVBQUUsSUFBSSxJQUFPLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEYsOEJBQXlCLEdBQUcsVUFBQyxNQUFNLEVBQUUsSUFBSSxJQUFPLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFtSjFHLHNCQUFzQjtZQUNWLDhCQUF5QixHQUFHLElBQUksS0FBSyxFQUFVLENBQUMsQ0FBQyxpQkFBaUI7WUFxQzlFLFlBQVk7WUFFWixzQkFBc0I7WUFDVixrQkFBYSxHQUFHLEtBQUssQ0FBQztZQUN0QiwyQkFBc0IsR0FBRyxLQUFLLENBQUM7WUFLL0IsMENBQXFDLEdBQUcsNkJBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsaUVBQWlFLENBQUMsQ0FBQztZQTNMcEosSUFBSSxDQUFDLFVBQVUs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QztRQStCaEYsQ0FBQztRQTdCRyx5Q0FBaUIsR0FBakIsVUFBa0IsZUFBc0I7UUFFeEMsQ0FBQztRQUNELDJDQUFtQixHQUFuQixVQUFvQixNQUFrQixFQUFFLElBQTJCO1FBRW5FLENBQUM7UUFDRCwrQ0FBdUIsR0FBdkIsVUFBd0IsTUFBa0IsRUFBRSxJQUEyQjtRQUV2RSxDQUFDO1FBSUQsa0NBQVUsR0FBVjtRQUVBLENBQUM7UUFFRCwrQkFBTyxHQUFQO1FBRUEsQ0FBQztRQUVELCtCQUFPLEdBQVA7UUFFQSxDQUFDO1FBQ0Qsc0NBQWMsR0FBZCxVQUFlLE1BQWtCLEVBQUUsSUFBMkI7UUFFOUQsQ0FBQztRQUNELDBDQUFrQixHQUFsQixVQUFtQixNQUFrQixFQUFFLElBQTJCO1FBRWxFLENBQUM7UUFDTCxvQkFBQztJQUFELENBQUMsQUFsQ0QsSUFrQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJRGF0YU1vZGVsLEV2ZW50TW9kZWxDaGFuZ2VkLEV2ZW50TW9kZWxDaGFuZ2VkQXJncywgRXZlbnRNb2RlbEl0ZW1zQ2hhbmdlZCB9IGZyb20gJy4uLy4uL21vZGVscy9kYXRhTW9kZWxJbnRlcmZhY2UnXHJcbmltcG9ydCB7IElXaWRnZXQgfSBmcm9tICcuL2ludGVyZmFjZXMvd2lkZ2V0SW50ZXJmYWNlJztcclxuaW1wb3J0IHsgQ29tbW9uTGF5b3V0UHJvdmlkZXIgfSBmcm9tICcuL2NvbW1vbkxheW91dFByb3ZpZGVyJztcclxuaW1wb3J0IHsgQnVzeUluZm9ybWF0aW9uIH0gZnJvbSAnLi9idXN5SW5mb3JtYXRpb24nO1xyXG5pbXBvcnQgeyBUaGVtZVByb3ZpZGVyIH0gZnJvbSAnLi90aGVtZVByb3ZpZGVyJztcclxuaW1wb3J0IHsgSU9ic2VydmVyLCBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vLi4vZnJhbWV3b3JrL2ludGVyZmFjZXMvb2JzZXJ2ZXInO1xyXG5pbXBvcnQgeyBXaWRnZXRzV2l0aERyb3BTdXBwb3J0UHJvdmlkZXIgfSBmcm9tICcuL3dpZGdldHNXaXRoRHJvcFN1cHBvcnRQcm92aWRlcic7XHJcbmltcG9ydCB7IElEcm9wcGFibGUgfSBmcm9tICcuL2ludGVyZmFjZXMvZHJvcEludGVyZmFjZSc7XHJcbmltcG9ydCB7IERyYWdEcm9wRGF0YU9iamVjdCB9IGZyb20gJy4vZHJhZ0RhdGFPYmplY3QnO1xyXG5pbXBvcnQgeyBJVmlldyB9IGZyb20gJy4vaW50ZXJmYWNlcy92aWV3SW50ZXJmYWNlJztcclxuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICcuLi8uLi9mcmFtZXdvcmsvc3RvcmUnO1xyXG5pbXBvcnQgeyBEcmFnRHJvcFJlcHJlc2VudGF0aW9uIH0gZnJvbSAnLi9kcmFnRHJvcFJlcHJlc2VudGF0aW9uJztcclxuaW1wb3J0IHsgSW1hZ2VQcm92aWRlciB9IGZyb20gJy4vaW1hZ2VQcm92aWRlcic7XHJcbmltcG9ydCB7IERyYWdEcm9wQXJncyB9IGZyb20gJy4vZHJhZ0Ryb3BBcmdzJztcclxuXHJcbmFic3RyYWN0IGNsYXNzIFdpZGdldEJhc2UgaW1wbGVtZW50cyBJV2lkZ2V0LElPYnNlcnZlcntcclxuICAgIFxyXG4gICAgcHJvdGVjdGVkIF9zdGF0ZXM6U3RvcmUgPSBuZXcgU3RvcmUoKTtcclxuICAgIHByb3RlY3RlZCBfZGF0YU1vZGVsOiBJRGF0YU1vZGVsO1xyXG4gICAgcHJvdGVjdGVkIF93aWRnZXRzOiB7IFtpZDogbnVtYmVyXTogSVdpZGdldDsgfSA9IHt9O1xyXG4gICAgcHJpdmF0ZSBfdmlldzpJVmlld3x1bmRlZmluZWQ7XHJcbiAgICBcclxuICAgIHByb3RlY3RlZCBfbGF5b3V0V2lkZ2V0O1xyXG4gICAgcHJpdmF0ZSBfY3VycmVudFdpZGdldDtcclxuICAgIC8qKlxyXG4gICAgICogaG9sZHMgdGhlIGlkIChlLmcuIFwiTXlJZFwiKVxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwYXJlbnRDb250ZW50SWQ6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBidXN5U2NyZWVuSWQgPSBcIlwiO1xyXG4gICAgXHJcbiAgICBmbGFnZ2VkRm9yUmVzaXplOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICB3aWRnZXROYW1lOiBzdHJpbmcgPSBcIlwiXHJcblxyXG4gICAgcHJvdGVjdGVkIF9hY3R1YWxXaWR0aDogbnVtYmVyID0gMDtcclxuICAgIHByb3RlY3RlZCBfYWN0dWFsSGVpZ2h0OiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHByaXZhdGUgX2J1c3lJbmZvcm1hdGlvbjogQnVzeUluZm9ybWF0aW9uID0gbmV3IEJ1c3lJbmZvcm1hdGlvbigpO1xyXG5cclxuICAgIHByaXZhdGUgX21vZGVsQ2hhbmdlZEhhbmRsZXIgPSAoc2VuZGVyLCBkYXRhKSA9PiB7IHRoaXMuaGFuZGxlTW9kZWxDaGFuZ2VkKHNlbmRlciwgZGF0YSk7IH07XHJcbiAgICBwcml2YXRlIF9tb2RlbEl0ZW1zQ2hhbmdlZEhhbmRsZXIgPSAoc2VuZGVyLCBkYXRhKSA9PiB7IHRoaXMuaGFuZGxlTW9kZWxJdGVtc0NoYW5nZWQoc2VuZGVyLCBkYXRhKTsgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgV2lkZ2V0QmFzZS5cclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuX2RhdGFNb2RlbCA9IG5ldyBOdWxsRGF0YU1vZGVsKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgZ2V0IHZpZXcoKSA6IElWaWV3fHVuZGVmaW5lZCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZpZXc7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIFxyXG4gICAgc2V0IHZpZXcodmlldyA6IElWaWV3fHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuX3ZpZXcgPSB2aWV3O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgZ2V0IHN0YXRlcygpIDogU3RvcmUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92aWV3ID8gdGhpcy5fdmlldy5zdGF0ZXMgOiB0aGlzLl9zdGF0ZXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBjc3MgaWQgKGUuZy4gXCIjTXlJZFwiKVxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIGdldCBjc3NQYXJlbnRDb250ZW50SWQoKTogc3RyaW5ne1xyXG4gICAgICAgIGlmKHRoaXMucGFyZW50Q29udGVudElkICE9IFwiXCIpe1xyXG4gICAgICAgICAgICByZXR1cm4gXCIjXCIgKyB0aGlzLnBhcmVudENvbnRlbnRJZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgY3VycmVudCB3aWR0aCBvZiB0aGUgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgZ2V0IHdpZHRoKCk6IG51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5fYWN0dWFsV2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBjdXJyZW50IGhlaWdodCBvZiB0aGUgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgZ2V0IGhlaWdodCgpOiBudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FjdHVhbEhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemVzIHRoZSB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGF5b3V0Q29udGFpbmVySWRcclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIGluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQ6IHN0cmluZykge1xyXG4gICAgICAgIC8vIEdldCB0aGUgbGF5b3V0IGNvbnRlbnRcclxuICAgICAgICB0aGlzLnBhcmVudENvbnRlbnRJZCA9IGxheW91dENvbnRhaW5lcklkO1xyXG4gICAgICAgIHRoaXMubG9hZFN0eWxlcygpO1xyXG5cclxuICAgICAgICB0aGlzLmNyZWF0ZUxheW91dCgpO1xyXG4gICAgICAgIHRoaXMuYXR0YWNoTGF5b3V0VG9WaWV3KCk7XHJcblxyXG4gICAgICAgIHRoaXMuY3JlYXRlV2lkZ2V0cygpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlaW5pdGlhbGl6ZXMgdGhlIGNoYXJ0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgcmVpbml0aWFsaXplKCk6dm9pZCB7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBwcm90ZWN0ZWQgYXR0YWNoTGF5b3V0VG9WaWV3KHBhcmVudFZpZXc6SVZpZXd8dW5kZWZpbmVkID0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgbGV0IHZpZXcgPSBwYXJlbnRWaWV3ID8gcGFyZW50VmlldyA6IHRoaXMuX3ZpZXc7XHJcblxyXG4gICAgICAgIGlmICh2aWV3ICYmIHRoaXMuX2xheW91dFdpZGdldCkge1xyXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQudmlldyA9IHZpZXc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgbGF5b3V0IG9mIHRoZSB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBjcmVhdGVMYXlvdXQoKXtcclxuXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgd2lkZ2V0IGNvbnRlbnQgYW5kIGV2ZW50dWFsbHkgc3Vid2lkZ2V0c1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZVdpZGdldHMoKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkIHN0eWxlcyBmb3IgV2lkZ2V0QmFzZVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIGxvYWRTdHlsZXMoKXtcclxuICAgICAgICAvL3RoaXMuc3R5bGVMb2FkZWQodW5kZWZpbmVkKTtcclxuICAgIH07XHJcblxyXG4gICAgYWRkU3R5bGUoZmlsZVBhdGg6IHN0cmluZyl7XHJcbiAgICAgICAgbGV0IHRoZW1lZEZpbGVQYXRoID0gdGhpcy5nZXRUaGVtZWRGaWxlUGF0aChmaWxlUGF0aCk7XHJcbiAgICAgICAgJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCkuYXBwZW5kKCc8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cIicgKyB0aGVtZWRGaWxlUGF0aCArICdcIiB0eXBlPVwidGV4dC9jc3NcIiAvPicpO1xyXG4gICAgICAgIC8qdmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XHJcbiAgICAgICAgbGluay50eXBlID0gJ3RleHQvY3NzJztcclxuICAgICAgICBsaW5rLnJlbCA9ICdzdHlsZXNoZWV0JztcclxuICAgICAgICBsaW5rLmhyZWYgPSBmaWxlUGF0aDtcclxuICAgICAgICAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKS5hcHBlbmQobGluayk7Ki9cclxuICAgICAgICAvL3RoaXMubG9hZENzcygkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKSwgZmlsZVBhdGgsIChsaW5rKSA9Pnt0aGlzLnN0eWxlTG9hZGVkKGxpbmspfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGFkZFN0eWxlVG9Db250ZW50SWQocGFyZW50Q29udGVudElkOiBzdHJpbmcsIGZpbGVQYXRoOiBzdHJpbmcpe1xyXG4gICAgICAgIGxldCB0aGVtZWRGaWxlUGF0aCA9IHRoaXMuZ2V0VGhlbWVkRmlsZVBhdGgoZmlsZVBhdGgpO1xyXG4gICAgICAgICQocGFyZW50Q29udGVudElkKS5hcHBlbmQoJzxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiJyArIHRoZW1lZEZpbGVQYXRoICsgJ1wiIHR5cGU9XCJ0ZXh0L2Nzc1wiIC8+Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VGhlbWVkRmlsZVBhdGgoZmlsZVBhdGg6IHN0cmluZyk6IHN0cmluZ3tcclxuICAgICAgICBsZXQgdGhlbWVQcm92aWRlciA9IFRoZW1lUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICByZXR1cm4gdGhlbWVQcm92aWRlci5nZXRUaGVtZWRGaWxlUGF0aChmaWxlUGF0aCk7XHJcbiAgICB9XHJcblxyXG4vLyNyZWdpb24gRHJvcCBzdXBwb3J0XHJcbiAgICBwcml2YXRlIF9zdXBwb3J0ZWREcmFnRHJvcERhdGFJZHMgPSBuZXcgQXJyYXk8c3RyaW5nPigpOyAvL2UuZy4gU2lnbmFsLCAuLlxyXG4gICAgcHVibGljIGdldCBzdXBwb3J0ZWREcmFnRHJvcERhdGFJZHMoKTogQXJyYXk8c3RyaW5nPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N1cHBvcnRlZERyYWdEcm9wRGF0YUlkcztcclxuICAgIH1cclxuICAgICAgICBcclxuICAgIC8qKlxyXG4gICAgICogQWRkcyB0aGUgZ2l2ZW4gZHJhZ2Ryb3AgZGF0YSBpZCB0byB0aGlzIHdpZGdldCwgYW5kIGFkZHMgdGhpcyB3aWRnZXQgdG8gdGhlIFdpZGdldHNXaXRoRHJvcFN1cHBvcnRQcm92aWRlciBpZiBub3QgYWxyZWFkeSB0aGVyZVxyXG4gICAgICogQ2FuIG9ubHkgYmUgdXNlZCBpZiB0aGUgd2lkZ2V0IGRlcml2ZXMgZnJvbSBJRHJvcHBhYmxlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBhZGRTdXBwb3J0ZWREcmFnRHJvcERhdGFJZChpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgV2lkZ2V0c1dpdGhEcm9wU3VwcG9ydFByb3ZpZGVyLmdldEluc3RhbmNlKCkuYWRkV2lkZ2V0KDxhbnk+dGhpcyBhcyBJRHJvcHBhYmxlKTtcclxuICAgICAgICAvLyBjaGVjayBpZiBhbHJlYWR5IGluIGxpc3RcclxuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLl9zdXBwb3J0ZWREcmFnRHJvcERhdGFJZHMuaW5kZXhPZihpZCk7XHJcbiAgICAgICAgaWYoaW5kZXggPT0gLTEpe1xyXG4gICAgICAgICAgICB0aGlzLl9zdXBwb3J0ZWREcmFnRHJvcERhdGFJZHMucHVzaChpZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyB0aGUgZ2l2ZW4gZHJhZ2Ryb3AgZGF0YSBpZCBmcm9tIHRoaXMgd2lkZ2V0LCBhbmQgaWYgaXQgaXMgdGhlIGxhc3QgZHJhZ2Ryb3AgZGF0YSBpZCwgcmVtb3ZlcyB0aGUgd2lkZ2V0IGZyb20gdGhlIFdpZGdldHNXaXRoRHJvcFN1cHBvcnRQcm92aWRlclxyXG4gICAgICogQ2FuIG9ubHkgYmUgdXNlZCBpZiB0aGUgd2lkZ2V0IGRlcml2ZXMgZnJvbSBJRHJvcHBhYmxlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICByZW1vdmVTdXBwb3J0ZWREcmFnRHJvcERhdGFJZChpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5fc3VwcG9ydGVkRHJhZ0Ryb3BEYXRhSWRzLmluZGV4T2YoaWQpO1xyXG4gICAgICAgIGlmKGluZGV4ICE9IC0xKXtcclxuICAgICAgICAgICAgdGhpcy5fc3VwcG9ydGVkRHJhZ0Ryb3BEYXRhSWRzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuX3N1cHBvcnRlZERyYWdEcm9wRGF0YUlkcy5sZW5ndGggPT0gMCl7XHJcbiAgICAgICAgICAgIFdpZGdldHNXaXRoRHJvcFN1cHBvcnRQcm92aWRlci5nZXRJbnN0YW5jZSgpLnJlbW92ZVdpZGdldCg8YW55PnRoaXMgYXMgSURyb3BwYWJsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4vLyNlbmRyZWdpb25cclxuICAgIFxyXG4vLyNyZWdpb24gZHJhZyBzdXBwb3J0XHJcbiAgICBwcml2YXRlIF9kcm9wUG9zc2libGUgPSBmYWxzZTtcclxuICAgIHByaXZhdGUgX2RyYWdnaW5nU3VwcG9ydEFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfZHJhZ2dpbmdDb250YWluZXI7XHJcbiAgICBwcml2YXRlIF9kcmFnRGF0YU9iamVjdCE6IERyYWdEcm9wRGF0YU9iamVjdDtcclxuICAgIHByaXZhdGUgX2RyYWdTeW1ib2w7XHJcbiAgICBwcml2YXRlIF9kZWZhdWx0RHJhZ1JlcHJlc2VudGF0aW9uITogRHJhZ0Ryb3BSZXByZXNlbnRhdGlvbjtcclxuICAgIHByaXZhdGUgX2RlZmF1bHREcm9wTm90UG9zc2libGVSZXByZXNlbnRhdGlvbiA9IEltYWdlUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXRJbWFnZShcIi4uL2FwcC93aWRnZXRzL2NvbW1vbi9zdHlsZS9pbWFnZXMvZHJhZ0Ryb3AvZHJvcE5vdFBvc3NpYmxlLnN2Z1wiKTtcclxuICAgIFxyXG5cdC8qKlxyXG4gICAgICogQWRkcyBkcmFnZ2luZyBzdXBwb3J0IHRvIHRoaXMgd2lkZ2V0OyB2aWEgSURyYWdnYWJsZSB0aGUgd2lkZ2V0IGNhbiBwcm92aWRlIHRoZSBpbmZvcm1hdGlvbiB3aGljaCBvYmplY3Qgc2hvdWxkIGJlIGRyYWdnZWRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkRHJhZ2dpbmdTdXBwb3J0KCl7XHJcbiAgICAgICAgaWYodGhpcy5wYXJlbnRDb250ZW50SWQgPT0gXCJcIil7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJwYXJlbnRDb250ZW50SWQgbm90IHNldCBmb3IgZHJhZ2dhYmxlIHN1cHBvcnRcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2RyYWdnaW5nU3VwcG9ydEFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fZHJhZ2dpbmdDb250YWluZXIgPSAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKTtcclxuXHJcbiAgICAgICAgdGhpcy5fZHJhZ2dpbmdDb250YWluZXIuZWpEcmFnZ2FibGUoe1xyXG4gICAgICAgICAgICBkaXN0YW5jZTogMTAsXHJcblxyXG4gICAgICAgICAgICBoZWxwZXI6IChhcmdzKSA9PiB0aGlzLmRyYWdnaW5nSGVscGVyKGFyZ3MpLFxyXG4gICAgICAgICAgICBkcmFnU3RhcnQ6IChhcmdzKSA9PiB0aGlzLmRyYWdnaW5nU3RhcnQoYXJncyksXHJcbiAgICAgICAgICAgIGRyYWdTdG9wOiAoYXJncykgPT4gdGhpcy5kcmFnZ2luZ1N0b3AoYXJncyksXHJcbiAgICAgICAgICAgIGRlc3Ryb3k6IChhcmdzKSA9PiB0aGlzLmRyYWdnaW5nRGVzdHJveShhcmdzKSxcclxuICAgICAgICAgICAgZHJhZzogKGFyZ3MpID0+IHRoaXMuZHJhZ2dpbmdEcmFnKGFyZ3MpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyBkcmFnZ2luZyBzdXBwb3J0IGZyb20gdGhpcyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVtb3ZlRHJhZ2dpbmdTdXBwb3J0KCl7XHJcbiAgICAgICAgdGhpcy5fZHJhZ2dpbmdTdXBwb3J0QWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIGVqRHJhZ2dhYmxlT2JqID0gdGhpcy5fZHJhZ2dpbmdDb250YWluZXIuZGF0YShcImVqRHJhZ2dhYmxlXCIpO1xyXG4gICAgICAgIGlmKGVqRHJhZ2dhYmxlT2JqICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGVqRHJhZ2dhYmxlT2JqLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaWxsIGJlIGNhbGxlZCBhdCB0aGUgZW5kIG9mIGEgZHJhZyZkcm9wIG9wZXJhdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZHJhZ2dpbmdEZXN0cm95KGFyZ3Mpe1xyXG4gICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSB0ZW1wb3JhcnkgZHJhZyBvYmplY3QgZm9yIHRoZSBkcmFnICYgZHJvcCBvcGVyYXRpb24gYW5kIGFkZHMgaXQgdG8gdGhlIGRvY3VtZW50IGJvZHlcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkcmFnZ2luZ0hlbHBlcihhcmdzKSB7XHJcbiAgICAgICAgdmFyIGVqRHJhZ2dhYmxlT2JqID0gdGhpcy5fZHJhZ2dpbmdDb250YWluZXIuZGF0YShcImVqRHJhZ2dhYmxlXCIpO1xyXG4gICAgICAgIGlmKGVqRHJhZ2dhYmxlT2JqICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIFNldCBkcmFnIG9iamVjdCBwb3NpdGlvbiAoX3JlbFlwb3NpdGlvbiBhbmQgX3JlbFhwb3NpdGlvbiBhcmUgdGhlIHBvc2l0aW9ucyB3aXRoaW4gdGhlIGRyYWdnYWJsZSBvYmplY3QpXHJcbiAgICAgICAgICAgIGVqRHJhZ2dhYmxlT2JqLm9wdGlvbihcImN1cnNvckF0XCIsIHsgdG9wOiAoIGVqRHJhZ2dhYmxlT2JqLl9yZWxZcG9zaXRpb24qLTEpLTEwLCBsZWZ0OiAgZWpEcmFnZ2FibGVPYmouX3JlbFhwb3NpdGlvbiotMSB9LCB0cnVlKVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBHZXQgdGhlIGluZm9ybWF0aW9uIG9mIHRoZSBkcmFnIG9iamVjdCBmcm9tIHdpZGdldFxyXG4gICAgICAgIGxldCBkcmFnRGF0YU9iamVjdCA9IHRoaXMuc3RhcnREcmFnZ2luZygpO1xyXG4gICAgICAgIGlmKGRyYWdEYXRhT2JqZWN0ID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9kcmFnRGF0YU9iamVjdCA9IGRyYWdEYXRhT2JqZWN0O1xyXG5cclxuICAgICAgICB0aGlzLl9kZWZhdWx0RHJhZ1JlcHJlc2VudGF0aW9uID0gdGhpcy5fZHJhZ0RhdGFPYmplY3QucmVwcmVzZW50YXRpb247XHJcbiAgICAgICAgdGhpcy5fZHJhZ1N5bWJvbCA9ICQoJzxwcmU+JykuaHRtbCh0aGlzLl9kZWZhdWx0RHJvcE5vdFBvc3NpYmxlUmVwcmVzZW50YXRpb24pO1xyXG5cclxuICAgICAgICAvLyBBZGRzIHRoZSBjdXJyZW50IGRhdGEgdG8gdGhlIGRyYWcgZGF0YVxyXG4gICAgICAgIHRoaXMuc2V0RHJhZ0RhdGEoYXJncywgdGhpcy5fZHJhZ0RhdGFPYmplY3QuZGF0YSlcclxuXHJcbiAgICAgICAgdGhpcy5fZHJhZ1N5bWJvbC5hcHBlbmRUbyhkb2N1bWVudC5ib2R5KTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZHJhZ1N5bWJvbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFdpbGwgYmUgY2FsbGVkIGF0IHRoZSBiZWdpbm5pbmcgb2YgYSBkcmFnJmRyb3Agb3BlcmF0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHJldHVybnMgeyhEcmFnRHJvcERhdGFPYmplY3R8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBzdGFydERyYWdnaW5nKCk6RHJhZ0Ryb3BEYXRhT2JqZWN0fHVuZGVmaW5lZHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogV2lsbCBiZSBjYWxsZWQgYWZ0ZXIgdGhlIGRyb3BcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZHJhZ2dpbmdTdG9wcGVkKCl7XHJcblxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgdGhlIHRlbXBvcmFyeSBkcmFnIG9iamVjdCBhZnRlciBkcmFnICYgZHJvcCBvcGVyYXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZW1vdmVEcmFnT2JqZWN0RnJvbURvY3VtZW50KCkgeyAgICBcclxuICAgICAgICBmb3IobGV0IGkgPSBkb2N1bWVudC5ib2R5LmNoaWxkTm9kZXMubGVuZ3RoLTE7IGkgPj0gMDsgaS0tKXtcclxuICAgICAgICAgICAgaWYoZG9jdW1lbnQuYm9keS5jaGlsZE5vZGVzW2ldLm5vZGVOYW1lID09IFwiUFJFXCIpe1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jaGlsZE5vZGVzW2ldLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFdpbGwgYmUgY2FsbGVkIGF0IHN0YXJ0IGRyYWdnaW5nXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZHJhZ2dpbmdTdGFydChhcmdzKSB7XHJcbiAgICAgICAgbGV0IGRyYWdEYXRhID0gdGhpcy5nZXREcmFnRGF0YShhcmdzKTtcclxuICAgICAgICBpZihkcmFnRGF0YSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAvLyBJbmZvcm0gb25seSB3aWRnZXRzIHdpdGggZHJvcCBzdXBwb3J0IGZvciB0aGUgZ2l2ZW4gZHJhZ0Ryb3BEYXRhSWRcclxuICAgICAgICAgICAgV2lkZ2V0c1dpdGhEcm9wU3VwcG9ydFByb3ZpZGVyLmdldEluc3RhbmNlKCkuZ2V0V2lkZ2V0c1dpdGhEcmFnRHJvcERhdGFJZCh0aGlzLl9kcmFnRGF0YU9iamVjdC5pZCkuZm9yRWFjaCh3aWRnZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gY2FsbCBkcmFnU3RhcnRcclxuICAgICAgICAgICAgICAgIHdpZGdldC5kcmFnU3RhcnQobmV3IERyYWdEcm9wQXJncyhhcmdzLmN1cnJlbnRUYXJnZXQsIGRyYWdEYXRhLCB0aGlzLl9kZWZhdWx0RHJhZ1JlcHJlc2VudGF0aW9uKSk7XHJcbiAgICAgICAgICAgIH0pOyAgXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgYXJncy5jYW5jZWwgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogV2lsbCBiZSBjYWxsZWQgd2hpbGUgZHJhZ2dpbmcgaXMgYWN0aXZlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkcmFnZ2luZ0RyYWcoYXJncykge1xyXG4gICAgICAgIHRoaXMuX2Ryb3BQb3NzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBjdXJyZW50RHJhZ0Ryb3BFbGVtZW50ID0gdGhpcy5fZGVmYXVsdERyYWdSZXByZXNlbnRhdGlvbi5jbG9uZSgpO1xyXG4gICAgICAgIGxldCBkcmFnRGF0YSA9IHRoaXMuZ2V0RHJhZ0RhdGEoYXJncyk7XHJcbiAgICAgICAgaWYoZHJhZ0RhdGEgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgbGV0IG5ld1dpZGdldDogSURyb3BwYWJsZXx1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIGlmKGFyZ3MuY3VycmVudFRhcmdldCAhPSB1bmRlZmluZWQpeyAvLyB1bmRlZmluZWQgaWYgb3V0IG9mIGJyb3dzZXIgd2luZG93XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIEluZm9ybSBvbmx5IHdpZGdldHMgd2l0aCBkcm9wIHN1cHBvcnQgZm9yIHRoZSBnaXZlbiBkcmFnRHJvcERhdGFJZFxyXG4gICAgICAgICAgICAgICAgV2lkZ2V0c1dpdGhEcm9wU3VwcG9ydFByb3ZpZGVyLmdldEluc3RhbmNlKCkuZ2V0V2lkZ2V0c1dpdGhEcmFnRHJvcERhdGFJZCh0aGlzLl9kcmFnRGF0YU9iamVjdC5pZCkuZm9yRWFjaCh3aWRnZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIE9ubHkgd2lkZ2V0IHdpdGggY3VycmVudFRhcmdldChkaXZJZCkgYXMgcGFyZW50IHNob3VsZCBiZSBpbmZvcm1lZFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNFbGVtZW50V2l0aGluV2lkZ2V0KGFyZ3MuY3VycmVudFRhcmdldCwgKDxhbnk+d2lkZ2V0KS5jc3NQYXJlbnRDb250ZW50SWQpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3V2lkZ2V0ID0gd2lkZ2V0O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2FsbCBkcmFnT3ZlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZHJhZ0Ryb3BBcmdzID0gbmV3IERyYWdEcm9wQXJncyhhcmdzLmN1cnJlbnRUYXJnZXQsIGRyYWdEYXRhLCBjdXJyZW50RHJhZ0Ryb3BFbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRyYWdPdmVyUG9zc2libGUgPSB3aWRnZXQuZHJhZ092ZXIoZHJhZ0Ryb3BBcmdzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZHJhZ092ZXJQb3NzaWJsZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9kcm9wUG9zc2libGUgPSBkcmFnT3ZlclBvc3NpYmxlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gICBcclxuICAgICAgICAgICAgaWYobmV3V2lkZ2V0ICE9IHRoaXMuX2N1cnJlbnRXaWRnZXQpe1xyXG4gICAgICAgICAgICAgICAgLy8gRHJhZ092ZXIgY2hhbmdlZCBmcm9tIG9uZSB3aWRnZXQgdG8gYW4gb3RoZXJcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuX2N1cnJlbnRXaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50V2lkZ2V0LmRyb3BGb2N1c0xvc3QoYXJncyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50V2lkZ2V0ID0gbmV3V2lkZ2V0O1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0gICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLl9kcm9wUG9zc2libGUpe1xyXG4gICAgICAgICAgICB0aGlzLl9kcmFnU3ltYm9sWzBdLmlubmVySFRNTCA9IGN1cnJlbnREcmFnRHJvcEVsZW1lbnQuZ2V0RHJhZ0Ryb3BFbGVtZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX2RyYWdTeW1ib2xbMF0uaW5uZXJIVE1MID0gdGhpcy5fZGVmYXVsdERyb3BOb3RQb3NzaWJsZVJlcHJlc2VudGF0aW9uO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFdpbGwgYmUgY2FsbGVkIHdoZW4gZHJhZ2dpbmcgd2FzIHN0b3BwZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRyYWdnaW5nU3RvcChhcmdzKSB7XHJcbiAgICAgICAgbGV0IGRyYWdEYXRhID0gdGhpcy5nZXREcmFnRGF0YShhcmdzKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5fZHJvcFBvc3NpYmxlKXtcclxuICAgICAgICAgICAgaWYoYXJncy5jdXJyZW50VGFyZ2V0ICE9IHVuZGVmaW5lZCApeyAgLy8gdW5kZWZpbmVkIGlmIG91dCBvZiBicm93c2VyIHdpbmRvd1xyXG4gICAgICAgICAgICAgICAgLy8gSW5mb3JtIG9ubHkgd2lkZ2V0cyB3aXRoIGRyb3Agc3VwcG9ydCBmb3IgdGhlIGdpdmVuIGRyYWdEcm9wRGF0YUlkXHJcbiAgICAgICAgICAgICAgICBXaWRnZXRzV2l0aERyb3BTdXBwb3J0UHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXRXaWRnZXRzV2l0aERyYWdEcm9wRGF0YUlkKHRoaXMuX2RyYWdEYXRhT2JqZWN0LmlkKS5mb3JFYWNoKHdpZGdldCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gT25seSB3aWRnZXQgd2l0aCBjdXJyZW50VGFyZ2V0KGRpdklkKSBhcyBwYXJlbnQgc2hvdWxkIGJlIGluZm9ybWVkXHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5pc0VsZW1lbnRXaXRoaW5XaWRnZXQoYXJncy5jdXJyZW50VGFyZ2V0LCAoPGFueT53aWRnZXQpLmNzc1BhcmVudENvbnRlbnRJZCkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjYWxsIGRyb3BcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LmRyb3AobmV3IERyYWdEcm9wQXJncyhhcmdzLmN1cnJlbnRUYXJnZXQsIGRyYWdEYXRhKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEluZm9ybSBvbmx5IHdpZGdldHMgd2l0aCBkcm9wIHN1cHBvcnQgZm9yIHRoZSBnaXZlbiBkcmFnRHJvcERhdGFJZFxyXG4gICAgICAgIFdpZGdldHNXaXRoRHJvcFN1cHBvcnRQcm92aWRlci5nZXRJbnN0YW5jZSgpLmdldFdpZGdldHNXaXRoRHJhZ0Ryb3BEYXRhSWQodGhpcy5fZHJhZ0RhdGFPYmplY3QuaWQpLmZvckVhY2god2lkZ2V0ID0+IHtcclxuICAgICAgICAgICAgLy8gY2FsbCBkcmFnU3RvcFxyXG4gICAgICAgICAgICB3aWRnZXQuZHJhZ1N0b3AobmV3IERyYWdEcm9wQXJncyhhcmdzLmN1cnJlbnRUYXJnZXQsIGRyYWdEYXRhKSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuZHJhZ2dpbmdTdG9wcGVkKCk7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVEcmFnT2JqZWN0RnJvbURvY3VtZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXREcmFnRGF0YShhcmdzOiBhbnkpOiBhbnl7XHJcbiAgICAgICAgcmV0dXJuIGFyZ3MuZWxlbWVudC5kYXRhKHRoaXMuX2RyYWdEYXRhT2JqZWN0LmlkKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldERyYWdEYXRhKGFyZ3M6IGFueSwgZGF0YTogYW55KXtcclxuICAgICAgICBhcmdzLmVsZW1lbnQuZGF0YSh0aGlzLl9kcmFnRGF0YU9iamVjdC5pZCwgZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVjayBpZiBhbiBlbGVtZW50IGlzIGEgY2hpbGQgb2YgdGhlIGdpdmVuIHBhcmVudCBpZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGVsZW1lbnRcclxuICAgICAqIEBwYXJhbSB7Kn0gcGFyZW50SWRcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgaXNFbGVtZW50V2l0aGluV2lkZ2V0KGVsZW1lbnQsIHBhcmVudElkKXtcclxuICAgICAgICBsZXQgcGFyZW50ID0gZWxlbWVudC5jbG9zZXN0KHBhcmVudElkKTtcclxuICAgICAgICBpZihwYXJlbnQgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuLy8jZW5kcmVnaW9uXHJcblxyXG5cclxuICAgIC8qcHJpdmF0ZSBzdHlsZUxvYWRlZChsaW5rKXtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxvYWRDc3MoZWxlbWVudCwgdXJsLCBjYWxsYmFjayl7XHJcbiAgICAgICAgdmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XHJcbiAgICAgICAgbGluay50eXBlID0gJ3RleHQvY3NzJztcclxuICAgICAgICBsaW5rLnJlbCA9ICdzdHlsZXNoZWV0JztcclxuICAgICAgICBsaW5rLmhyZWYgPSB1cmw7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZWxlbWVudFswXS5hcHBlbmRDaGlsZChsaW5rKTtcclxuICAgIFxyXG4gICAgICAgIHZhciBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgICAgICBpbWcub25lcnJvciA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGlmKGNhbGxiYWNrKXtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGxpbmspO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH1cclxuICAgICAgICBpbWcuc3JjID0gdXJsO1xyXG4gICAgfSovXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBY3RpdmF0ZSB0aGUgV2lkZ2V0QmFzZVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIGFjdGl2YXRlKCl7XHJcbiAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlYWN0aXZhdGUgdGhlIFdpZGdldEJhc2VcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBkZWFjdGl2YXRlKCl7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzcG9zZSB0aGUgV2lkZ2V0QmFzZVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIGRpc3Bvc2UoKXtcclxuICAgICAgICBpZih0aGlzLl9kcmFnZ2luZ1N1cHBvcnRBY3RpdmUgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRHJhZ2dpbmdTdXBwb3J0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuX2RhdGFNb2RlbCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9kYXRhTW9kZWwuZXZlbnRNb2RlbENoYW5nZWQuZGV0YWNoKHRoaXMuX21vZGVsQ2hhbmdlZEhhbmRsZXIpO1xyXG4gICAgICAgICAgICB0aGlzLl9kYXRhTW9kZWwuZXZlbnRNb2RlbEl0ZW1zQ2hhbmdlZC5kZXRhY2godGhpcy5fbW9kZWxJdGVtc0NoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBidXN5IHNjcmVlbiBpbmZvcm1hdGlvbiB3aGljaCB3aWxsIGJlIHNob3duIHdoZW4gdGhlIGJ1c3kgZmxhZyB0cnVlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtCdXN5SW5mb3JtYXRpb259IGJ1c3lJbmZvcm1hdGlvblxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgc2V0QnVzeUluZm9ybWF0aW9uKGJ1c3lJbmZvcm1hdGlvbjogQnVzeUluZm9ybWF0aW9uKXtcclxuICAgICAgICB0aGlzLl9idXN5SW5mb3JtYXRpb24gPSBidXN5SW5mb3JtYXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIGJ1c3kgZmxhZyBvZiB0aGUgV2lkZ2V0QmFzZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZmxhZyBpZiB0cnVlIGJ1c3kgc2NyZWVuIHdpbGwgYmUgc2hvd25cclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIHNldEJ1c3koZmxhZzogYm9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5idXN5U2NyZWVuSWQgPSB0aGlzLmNzc1BhcmVudENvbnRlbnRJZCtcImJ1c3lTY3JlZW5cIjtcclxuICAgICAgICBpZihmbGFnID09IHRydWUpe1xyXG4gICAgICAgICAgICBsZXQgc3RyaXBwZWRJZCA9IHRoaXMuYnVzeVNjcmVlbklkLnJlcGxhY2UoXCIjXCIsXCJcIilcclxuICAgICAgICAgICAgbGV0IGh0bWwgPSBDb21tb25MYXlvdXRQcm92aWRlci5nZXRJbnN0YW5jZSgpLmdldEJ1c3lTY3JlZW5MYXlvdXQoc3RyaXBwZWRJZCwgdGhpcy5fYnVzeUluZm9ybWF0aW9uKTtcclxuICAgICAgICAgICAgJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCkucGFyZW50KCkuYXBwZW5kKGh0bWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAkKHRoaXMuYnVzeVNjcmVlbklkKS5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNpemUgdGhlIFdpZGdldEJhc2VcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gd2lkdGhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIHJlc2l6ZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcil7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldCBkYXRhTW9kZWwoKTpJRGF0YU1vZGVse1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhTW9kZWw7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGRhdGFNb2RlbChkYXRhTW9kZWw6IElEYXRhTW9kZWwpe1xyXG4gICAgICAgIC8vIERldGFjaCBldmVudHMgZnJvbSBvbGQgZGF0YU1vZGVsXHJcbiAgICAgICAgdGhpcy5kZXRhY2hEYXRhTW9kZWxFdmVudHMoKTtcclxuICAgICAgICAvLyBTZXQgbmV3IGRhdGFNb2RlbFxyXG4gICAgICAgIHRoaXMuX2RhdGFNb2RlbCA9IGRhdGFNb2RlbDtcclxuICAgICAgICAvLyBBdHRhY2ggZXZlbnRzIHRvIG5ldyBkYXRhTW9kZWxcclxuICAgICAgICB0aGlzLmF0dGFjaERhdGFNb2RlbEV2ZW50cygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYXR0YWNoZXMgdGhlIGRhdGEgbW9kZWwgZXZlbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXR0YWNoRGF0YU1vZGVsRXZlbnRzKCkge1xyXG4gICAgICAgIGlmKHRoaXMuX2RhdGFNb2RlbCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9kYXRhTW9kZWwuZXZlbnRNb2RlbENoYW5nZWQuYXR0YWNoKHRoaXMuX21vZGVsQ2hhbmdlZEhhbmRsZXIpO1xyXG4gICAgICAgICAgICB0aGlzLl9kYXRhTW9kZWwuZXZlbnRNb2RlbEl0ZW1zQ2hhbmdlZC5hdHRhY2godGhpcy5fbW9kZWxJdGVtc0NoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogZGV0YWNoZXMgdGhlIGRhdGEgbW9kZWwgZXZlbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZGV0YWNoRGF0YU1vZGVsRXZlbnRzKCkge1xyXG4gICAgICAgIGlmKHRoaXMuX2RhdGFNb2RlbCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9kYXRhTW9kZWwuZXZlbnRNb2RlbENoYW5nZWQuZGV0YWNoKHRoaXMuX21vZGVsQ2hhbmdlZEhhbmRsZXIpO1xyXG4gICAgICAgICAgICB0aGlzLl9kYXRhTW9kZWwuZXZlbnRNb2RlbEl0ZW1zQ2hhbmdlZC5kZXRhY2godGhpcy5fbW9kZWxJdGVtc0NoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGhhbmRsZU1vZGVsQ2hhbmdlZChzZW5kZXI6IGFueSwgZGF0YTogYW55KTogYW55IHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlTW9kZWxJdGVtc0NoYW5nZWQoc2VuZGVyOiBJRGF0YU1vZGVsLCBldmVudEFyZ3M6IEV2ZW50TW9kZWxDaGFuZ2VkQXJncykge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBvbk9ic2VydmFibGVzQ2hhbmdlZChjaGFuZ2VkT2JzZXJ2YWJsZXM6IE9ic2VydmFibGVbXSkge1xyXG4gXHJcbiAgICB9XHJcblxyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIHRoZSBjbGFzcyBpbXBsZW1lbnRzIHRoZSBudWxsIG9iamVjdCBmb3IgdGhlIGRhdGEgbW9kZWwuIEl0IGlzIGludGVuZGVkIHRvIGJlIHNldCBmb3Igd2lkZ2V0cyB3aXRob3V0IGEgcmVhbCBkYXRhIG1vZGVsXHJcbiAqXHJcbiAqIEBjbGFzcyBOdWxsRGF0YU1vZGVsXHJcbiAqIEBpbXBsZW1lbnRzIHtJRGF0YU1vZGVsfVxyXG4gKi9cclxuY2xhc3MgTnVsbERhdGFNb2RlbCBpbXBsZW1lbnRzIElEYXRhTW9kZWx7XHJcblxyXG4gICAgZXZlbnRNb2RlbENoYW5nZWQ6IEV2ZW50TW9kZWxDaGFuZ2VkID0gbmV3IEV2ZW50TW9kZWxDaGFuZ2VkOyBcclxuICAgIGV2ZW50TW9kZWxJdGVtc0NoYW5nZWQ6IEV2ZW50TW9kZWxJdGVtc0NoYW5nZWQgPSBuZXcgRXZlbnRNb2RlbEl0ZW1zQ2hhbmdlZDsgXHJcblxyXG4gICAgb2JzZXJ2ZU1vZGVsSXRlbXMob2JzZXJ2YWJsZUl0ZW1zOiBhbnlbXSkge1xyXG5cclxuICAgIH1cclxuICAgIG9uTW9kZWxJdGVtc0NoYW5nZWQoc2VuZGVyOiBJRGF0YU1vZGVsLCBkYXRhOiBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MpIHtcclxuXHJcbiAgICB9XHJcbiAgICBoYW5kbGVNb2RlbEl0ZW1zQ2hhbmdlZChzZW5kZXI6IElEYXRhTW9kZWwsIGRhdGE6IEV2ZW50TW9kZWxDaGFuZ2VkQXJncykge1xyXG4gXHJcbiAgICB9XHJcblxyXG5cclxuICAgIGRhdGE6YW55IDsgICAgZGF0YVNvdXJjZTtcclxuICAgIGluaXRpYWxpemUoKTogdm9pZCB7XHJcbiBcclxuICAgIH1cclxuICAgIFxyXG4gICAgZGlzcG9zZSgpe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBjb25uZWN0KCk6IHZvaWQge1xyXG4gICBcclxuICAgIH1cclxuICAgIG9uTW9kZWxDaGFuZ2VkKHNlbmRlcjogSURhdGFNb2RlbCwgZGF0YTogRXZlbnRNb2RlbENoYW5nZWRBcmdzKSB7XHJcbiBcclxuICAgIH1cclxuICAgIGhhbmRsZU1vZGVsQ2hhbmdlZChzZW5kZXI6IElEYXRhTW9kZWwsIGRhdGE6IEV2ZW50TW9kZWxDaGFuZ2VkQXJncykge1xyXG4gIFxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge1dpZGdldEJhc2V9OyJdfQ==