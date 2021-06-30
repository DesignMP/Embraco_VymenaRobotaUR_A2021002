define(["require", "exports", "../../models/dataModelInterface", "./busyInformation", "./themeProvider", "./widgetsWithDropSupportProvider", "../../framework/store", "./dragDropArgs", "../../framework/componentHub/bindings/componentBindings", "../../common/componentBase/componentSettings", "./defaultComponentSettingsWidgetBase"], function (require, exports, dataModelInterface_1, busyInformation_1, themeProvider_1, widgetsWithDropSupportProvider_1, store_1, dragDropArgs_1, componentBindings_1, componentSettings_1, defaultComponentSettingsWidgetBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WidgetBase = /** @class */ (function () {
        /**
         * Creates an instance of WidgetBase
         * @memberof WidgetBase
         */
        function WidgetBase() {
            var _this = this;
            this._states = new store_1.Store();
            this._widgets = new Map();
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
            this._defaultDropNotPossibleRepresentation = "";
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
            this.addAdditionalDefaultComponentSettings();
            this.component.loadComponentSettings();
            this.createLayout();
            this.attachLayoutToView();
            var settings = this.component.getComponentSettings();
            if (settings != undefined) {
                this.setComponentSettings(settings);
            }
            this.initialized();
            this.component.setBindingsData();
        };
        /**
         * Reinitializes the chart
         *
         * @memberof WidgetBase
         */
        WidgetBase.prototype.reinitialize = function () {
        };
        /**
         * Will be called after initialization(when loading persisting data was done)
         *
         * @memberof WidgetBase
         */
        WidgetBase.prototype.initialized = function () {
        };
        /**
         * Initialize the component parts here
         *
         * @memberof WidgetBase
         */
        WidgetBase.prototype.initializeComponent = function () {
        };
        /**
         * Set the id for the default settings data which should be used if no persisting data is available
         *
         * @param {string} defaultSettingsDataId
         * @memberof WidgetBase
         */
        WidgetBase.prototype.setDefaultComponentSettingsDataId = function (defaultSettingsDataId) {
            this.component.defaultSettingsDataId = defaultSettingsDataId;
        };
        /**
         * Returns the default component settings for this widget
         *
         * @memberof WidgetBase
         */
        WidgetBase.prototype.getDefaultComponentSettings = function () {
            return undefined;
        };
        /**
         * Returns the settings of this component
         *
         * @returns {ComponentSettings}
         * @memberof WidgetBase
         */
        WidgetBase.prototype.getComponentSettings = function (onlyModified) {
            return this.component.getComponentSettings(onlyModified);
        };
        /**
         * Sets settings to this component
         *
         * @param {(ComponentSettings|undefined)} settings
         * @memberof WidgetBase
         */
        WidgetBase.prototype.setComponentSettings = function (settings) {
            if (settings != undefined) {
                // Set componentSettings
                this.component.setComponentSettings(settings);
            }
        };
        /**
         * Adds some additional default component settings(e.g. some splitter definitions, ...)
         * Use addDefaultComponentSettingsToProvider(id, data) to add
         *
         * @memberof WidgetBase
         */
        WidgetBase.prototype.addAdditionalDefaultComponentSettings = function () {
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
            var imageProvider = this.component.getSubComponent(defaultComponentSettingsWidgetBase_1.DefaultComponentSettingsWidgetBase.ImageProviderId);
            if (imageProvider != undefined) {
                this._defaultDropNotPossibleRepresentation = imageProvider.getImage("../app/widgets/common/style/images/dragDrop/dropNotPossible.svg");
            }
            else {
                console.error("ImageProvider not available => Add ImageProvider sub component to this widget!");
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
            if (this._dragDataObject != undefined) {
                return args.element.data(this._dragDataObject.id);
            }
            return undefined;
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
        /**
         * Returns the widget for the given id if found, else undefined
         *
         * @param {string} id the widget id
         * @returns {*}
         * @memberof WidgetBase
         */
        /*public getWidgetById(id: string, recursive: boolean = false): IWidget|undefined{
            for (let key in this._widgets) {
                let foundWidget: IWidget|undefined = undefined;
                let widget = this._widgets[key];
                if(widget.id == id){
                    foundWidget = widget;
                }
                else{
                    if(recursive == true){
                        let foundChildWidget = widget.getWidgetById(id, true);
                        if(foundChildWidget != undefined){
                            foundWidget = foundChildWidget;
                        }
                    }
                }
                if(foundWidget != undefined){
                    return foundWidget;
                }
            }
            return undefined
        }*/
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
            // delete bindings
            componentBindings_1.ComponentBindings.unbind(this);
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
                var commonLayoutProvider = this.component.getSubComponent(defaultComponentSettingsWidgetBase_1.DefaultComponentSettingsWidgetBase.CommonLayoutProviderId);
                if (commonLayoutProvider != undefined) {
                    var html = commonLayoutProvider.getBusyScreenLayout(strippedId, this._busyInformation);
                    $(this.cssParentContentId).parent().append(html);
                }
                else {
                    console.error("CommonLayoutProvider not available => add to sub components!");
                }
            }
            else {
                $(this.busyScreenId).remove();
            }
        };
        /**
         * Persist widget settings
         *
         * @protected
         * @memberof WidgetBase
         */
        WidgetBase.prototype.saveSettings = function () {
            this.component.saveComponentSettings();
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
        WidgetBase.WidgetSettingId = "widget";
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
        NullDataModel.prototype.clear = function () {
        };
        NullDataModel.prototype.dispose = function () {
        };
        NullDataModel.prototype.getDefaultStoringData = function () {
            return undefined;
        };
        NullDataModel.prototype.initializeComponent = function () {
            this.component.disablePersisting();
        };
        NullDataModel.prototype.getComponentSettings = function () {
            return new componentSettings_1.ComponentSettings();
        };
        NullDataModel.prototype.getDefaultComponentSettings = function () {
            return undefined;
        };
        NullDataModel.prototype.setComponentSettings = function (data) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0QmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jb21tb24vd2lkZ2V0QmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFxQkE7UUF3Q0k7OztXQUdHO1FBQ0g7WUFBQSxpQkFFQztZQTVDUyxZQUFPLEdBQVMsSUFBSSxhQUFLLEVBQUUsQ0FBQztZQUU1QixhQUFRLEdBQXlCLElBQUksR0FBRyxFQUFtQixDQUFDO1lBUXRFOzs7OztlQUtHO1lBQ0gsb0JBQWUsR0FBVyxFQUFFLENBQUM7WUFDN0IsaUJBQVksR0FBRyxFQUFFLENBQUM7WUFFbEIscUJBQWdCLEdBQVksS0FBSyxDQUFDO1lBQ2xDLGVBQVUsR0FBVyxFQUFFLENBQUE7WUFFYixpQkFBWSxHQUFXLENBQUMsQ0FBQztZQUN6QixrQkFBYSxHQUFXLENBQUMsQ0FBQztZQUU1QixxQkFBZ0IsR0FBb0IsSUFBSSxpQ0FBZSxFQUFFLENBQUM7WUFFMUQseUJBQW9CLEdBQUcsVUFBQyxNQUFNLEVBQUUsSUFBSSxJQUFPLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEYsOEJBQXlCLEdBQUcsVUFBQyxNQUFNLEVBQUUsSUFBSSxJQUFPLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFpTzFHLHNCQUFzQjtZQUNWLDhCQUF5QixHQUFHLElBQUksS0FBSyxFQUFVLENBQUMsQ0FBQyxpQkFBaUI7WUFxQzlFLFlBQVk7WUFFWixzQkFBc0I7WUFDVixrQkFBYSxHQUFHLEtBQUssQ0FBQztZQUN0QiwyQkFBc0IsR0FBRyxLQUFLLENBQUM7WUFLL0IsMENBQXFDLEdBQVUsRUFBRSxDQUFDO1lBalF0RCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7UUFDMUMs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QUNuQyxDQUFDO1FBRUQsbURBQTJCLEdBQTNCO1lBQ0ksT0FBTyxTQUFTLENBQUM7UUFDckIsQ0FBQztRQUVELDRDQUFvQixHQUFwQixVQUFxQixJQUF1QjtRQUU1QyxDQUFDO1FBRUQsK0JBQU8sR0FBUDtRQUVBLENBQUM7UUFDRCxzQ0FBYyxHQUFkLFVBQWUsTUFBa0IsRUFBRSxJQUEyQjtRQUU5RCxDQUFDO1FBQ0QsMENBQWtCLEdBQWxCLFVBQW1CLE1BQWtCLEVBQUUsSUFBMkI7UUFFbEUsQ0FBQztRQUNMLG9CQUFDO0lBQUQsQ0FBQyxBQTNERCxJQTJEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElEYXRhTW9kZWwsRXZlbnRNb2RlbENoYW5nZWQsRXZlbnRNb2RlbENoYW5nZWRBcmdzLCBFdmVudE1vZGVsSXRlbXNDaGFuZ2VkIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2RhdGFNb2RlbEludGVyZmFjZSdcclxuaW1wb3J0IHsgSUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2ludGVyZmFjZXMvY29tcG9uZW50SW50ZXJmYWNlJztcclxuaW1wb3J0IHsgSVdpZGdldCB9IGZyb20gJy4vaW50ZXJmYWNlcy93aWRnZXRJbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBJVmlldyB9IGZyb20gJy4vaW50ZXJmYWNlcy92aWV3SW50ZXJmYWNlJztcclxuaW1wb3J0IHsgSURyb3BwYWJsZSB9IGZyb20gJy4vaW50ZXJmYWNlcy9kcm9wSW50ZXJmYWNlJztcclxuaW1wb3J0IHsgSUxheW91dFdpZGdldCB9IGZyb20gJy4vaW50ZXJmYWNlcy9sYXlvdXRXaWRnZXRJbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBJT2JzZXJ2ZXIsIE9ic2VydmFibGUgfSBmcm9tICcuLi8uLi9mcmFtZXdvcmsvaW50ZXJmYWNlcy9vYnNlcnZlcic7XHJcbmltcG9ydCB7IEJ1c3lJbmZvcm1hdGlvbiB9IGZyb20gJy4vYnVzeUluZm9ybWF0aW9uJztcclxuaW1wb3J0IHsgVGhlbWVQcm92aWRlciB9IGZyb20gJy4vdGhlbWVQcm92aWRlcic7XHJcbmltcG9ydCB7IFdpZGdldHNXaXRoRHJvcFN1cHBvcnRQcm92aWRlciB9IGZyb20gJy4vd2lkZ2V0c1dpdGhEcm9wU3VwcG9ydFByb3ZpZGVyJztcclxuaW1wb3J0IHsgRHJhZ0Ryb3BEYXRhT2JqZWN0IH0gZnJvbSAnLi9kcmFnRGF0YU9iamVjdCc7XHJcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnLi4vLi4vZnJhbWV3b3JrL3N0b3JlJztcclxuaW1wb3J0IHsgRHJhZ0Ryb3BSZXByZXNlbnRhdGlvbiB9IGZyb20gJy4vZHJhZ0Ryb3BSZXByZXNlbnRhdGlvbic7XHJcbmltcG9ydCB7IERyYWdEcm9wQXJncyB9IGZyb20gJy4vZHJhZ0Ryb3BBcmdzJztcclxuaW1wb3J0IHsgQ29tcG9uZW50QmFzZSB9IGZyb20gJy4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudEJhc2UnO1xyXG5pbXBvcnQgeyBDb21wb25lbnRCaW5kaW5ncyB9IGZyb20gJy4uLy4uL2ZyYW1ld29yay9jb21wb25lbnRIdWIvYmluZGluZ3MvY29tcG9uZW50QmluZGluZ3MnO1xyXG5pbXBvcnQgeyBDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gJy4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzJztcclxuaW1wb3J0IHsgRGVmYXVsdENvbXBvbmVudFNldHRpbmdzV2lkZ2V0QmFzZSB9IGZyb20gJy4vZGVmYXVsdENvbXBvbmVudFNldHRpbmdzV2lkZ2V0QmFzZSc7XHJcbmltcG9ydCB7IElJbWFnZVByb3ZpZGVyIH0gZnJvbSAnLi9pbnRlcmZhY2VzL2ltYWdlUHJvdmlkZXJJbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBJQ29tbW9uTGF5b3V0UHJvdmlkZXIgfSBmcm9tICcuL2ludGVyZmFjZXMvY29tbW9uTGF5b3V0UHJvdmlkZXJJbnRlcmZhY2UnO1xyXG5cclxuYWJzdHJhY3QgY2xhc3MgV2lkZ2V0QmFzZSBpbXBsZW1lbnRzIElXaWRnZXQsIElPYnNlcnZlciwgSUNvbXBvbmVudHtcclxuICAgICAgIFxyXG4gICAgcHJvdGVjdGVkIF9zdGF0ZXM6U3RvcmUgPSBuZXcgU3RvcmUoKTtcclxuICAgIHByb3RlY3RlZCBfZGF0YU1vZGVsOiBJRGF0YU1vZGVsO1xyXG4gICAgcHJvdGVjdGVkIF93aWRnZXRzOiBNYXA8c3RyaW5nLCBJV2lkZ2V0PiA9IG5ldyBNYXA8c3RyaW5nLCBJV2lkZ2V0PigpO1xyXG4gICAgcHJpdmF0ZSBfdmlldzpJVmlld3x1bmRlZmluZWQ7XHJcbiAgICAgICBcclxuICAgIHByb3RlY3RlZCBfbGF5b3V0V2lkZ2V0OiBJTGF5b3V0V2lkZ2V0fHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX2N1cnJlbnRXaWRnZXQ7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBXaWRnZXRTZXR0aW5nSWQgPSBcIndpZGdldFwiO1xyXG4gICAgICBcclxuICAgIC8qKlxyXG4gICAgICogaG9sZHMgdGhlIGlkIChlLmcuIFwiTXlJZFwiKVxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwYXJlbnRDb250ZW50SWQ6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBidXN5U2NyZWVuSWQgPSBcIlwiO1xyXG4gICAgXHJcbiAgICBmbGFnZ2VkRm9yUmVzaXplOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICB3aWRnZXROYW1lOiBzdHJpbmcgPSBcIlwiXHJcblxyXG4gICAgcHJvdGVjdGVkIF9hY3R1YWxXaWR0aDogbnVtYmVyID0gMDtcclxuICAgIHByb3RlY3RlZCBfYWN0dWFsSGVpZ2h0OiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHByaXZhdGUgX2J1c3lJbmZvcm1hdGlvbjogQnVzeUluZm9ybWF0aW9uID0gbmV3IEJ1c3lJbmZvcm1hdGlvbigpO1xyXG5cclxuICAgIHByaXZhdGUgX21vZGVsQ2hhbmdlZEhhbmRsZXIgPSAoc2VuZGVyLCBkYXRhKSA9PiB7IHRoaXMuaGFuZGxlTW9kZWxDaGFuZ2VkKHNlbmRlciwgZGF0YSk7IH07XHJcbiAgICBwcml2YXRlIF9tb2RlbEl0ZW1zQ2hhbmdlZEhhbmRsZXIgPSAoc2VuZGVyLCBkYXRhKSA9PiB7IHRoaXMuaGFuZGxlTW9kZWxJdGVtc0NoYW5nZWQoc2VuZGVyLCBkYXRhKTsgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb21wb25lbnQgb2YgdGhpcyB3aWRnZXQoaG9sZHMgdGhlIHNldHRpbmdzIGZvciBwZXJzaXN0aW5nKVxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHtDb21wb25lbnRCYXNlfVxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbXBvbmVudCE6IENvbXBvbmVudEJhc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFdpZGdldEJhc2VcclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuX2RhdGFNb2RlbCA9IG5ldyBOdWxsRGF0YU1vZGVsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHZpZXcoKSA6IElWaWV3fHVuZGVmaW5lZCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZpZXc7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIFxyXG4gICAgc2V0IHZpZXcodmlldyA6IElWaWV3fHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuX3ZpZXcgPSB2aWV3O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgZ2V0IHN0YXRlcygpIDogU3RvcmUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92aWV3ID8gdGhpcy5fdmlldy5zdGF0ZXMgOiB0aGlzLl9zdGF0ZXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBjc3MgaWQgKGUuZy4gXCIjTXlJZFwiKVxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIGdldCBjc3NQYXJlbnRDb250ZW50SWQoKTogc3RyaW5ne1xyXG4gICAgICAgIGlmKHRoaXMucGFyZW50Q29udGVudElkICE9IFwiXCIpe1xyXG4gICAgICAgICAgICByZXR1cm4gXCIjXCIgKyB0aGlzLnBhcmVudENvbnRlbnRJZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgY3VycmVudCB3aWR0aCBvZiB0aGUgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgZ2V0IHdpZHRoKCk6IG51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5fYWN0dWFsV2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBjdXJyZW50IGhlaWdodCBvZiB0aGUgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgZ2V0IGhlaWdodCgpOiBudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FjdHVhbEhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemVzIHRoZSB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGF5b3V0Q29udGFpbmVySWRcclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIGluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQ6IHN0cmluZykge1xyXG5cclxuICAgICAgICAvLyBHZXQgdGhlIGxheW91dCBjb250ZW50XHJcbiAgICAgICAgdGhpcy5wYXJlbnRDb250ZW50SWQgPSBsYXlvdXRDb250YWluZXJJZDtcclxuICAgICAgICB0aGlzLmxvYWRTdHlsZXMoKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRBZGRpdGlvbmFsRGVmYXVsdENvbXBvbmVudFNldHRpbmdzKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQubG9hZENvbXBvbmVudFNldHRpbmdzKCk7XHJcblxyXG4gICAgICAgIHRoaXMuY3JlYXRlTGF5b3V0KCk7XHJcbiAgICAgICAgdGhpcy5hdHRhY2hMYXlvdXRUb1ZpZXcoKTtcclxuXHJcbiAgICAgICAgbGV0IHNldHRpbmdzID0gdGhpcy5jb21wb25lbnQuZ2V0Q29tcG9uZW50U2V0dGluZ3MoKTtcclxuICAgICAgICBpZihzZXR0aW5ncyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLnNldENvbXBvbmVudFNldHRpbmdzKHNldHRpbmdzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5pbml0aWFsaXplZCgpO1xyXG5cclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5zZXRCaW5kaW5nc0RhdGEoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlaW5pdGlhbGl6ZXMgdGhlIGNoYXJ0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgcmVpbml0aWFsaXplKCk6dm9pZCB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaWxsIGJlIGNhbGxlZCBhZnRlciBpbml0aWFsaXphdGlvbih3aGVuIGxvYWRpbmcgcGVyc2lzdGluZyBkYXRhIHdhcyBkb25lKVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIGluaXRpYWxpemVkKCk6dm9pZCB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXplIHRoZSBjb21wb25lbnQgcGFydHMgaGVyZVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIGluaXRpYWxpemVDb21wb25lbnQoKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIGlkIGZvciB0aGUgZGVmYXVsdCBzZXR0aW5ncyBkYXRhIHdoaWNoIHNob3VsZCBiZSB1c2VkIGlmIG5vIHBlcnNpc3RpbmcgZGF0YSBpcyBhdmFpbGFibGVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGVmYXVsdFNldHRpbmdzRGF0YUlkXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0RGVmYXVsdENvbXBvbmVudFNldHRpbmdzRGF0YUlkKGRlZmF1bHRTZXR0aW5nc0RhdGFJZDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZGVmYXVsdFNldHRpbmdzRGF0YUlkID0gZGVmYXVsdFNldHRpbmdzRGF0YUlkO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgY29tcG9uZW50IHNldHRpbmdzIGZvciB0aGlzIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXREZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MoKTogQ29tcG9uZW50U2V0dGluZ3N8dW5kZWZpbmVke1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBzZXR0aW5ncyBvZiB0aGlzIGNvbXBvbmVudFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnRTZXR0aW5nc31cclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRDb21wb25lbnRTZXR0aW5ncyhvbmx5TW9kaWZpZWQ6IGJvb2xlYW4pOiBDb21wb25lbnRTZXR0aW5nc3tcclxuICAgICAgICByZXR1cm4gdGhpcy5jb21wb25lbnQuZ2V0Q29tcG9uZW50U2V0dGluZ3Mob25seU1vZGlmaWVkKTtcclxuICAgIH1cclxuIFxyXG4gICAgIC8qKlxyXG4gICAgICAqIFNldHMgc2V0dGluZ3MgdG8gdGhpcyBjb21wb25lbnRcclxuICAgICAgKlxyXG4gICAgICAqIEBwYXJhbSB7KENvbXBvbmVudFNldHRpbmdzfHVuZGVmaW5lZCl9IHNldHRpbmdzXHJcbiAgICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRDb21wb25lbnRTZXR0aW5ncyhzZXR0aW5nczogQ29tcG9uZW50U2V0dGluZ3N8dW5kZWZpbmVkKXtcclxuICAgICAgICBpZihzZXR0aW5ncyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAvLyBTZXQgY29tcG9uZW50U2V0dGluZ3NcclxuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuc2V0Q29tcG9uZW50U2V0dGluZ3Moc2V0dGluZ3MpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgc29tZSBhZGRpdGlvbmFsIGRlZmF1bHQgY29tcG9uZW50IHNldHRpbmdzKGUuZy4gc29tZSBzcGxpdHRlciBkZWZpbml0aW9ucywgLi4uKVxyXG4gICAgICogVXNlIGFkZERlZmF1bHRDb21wb25lbnRTZXR0aW5nc1RvUHJvdmlkZXIoaWQsIGRhdGEpIHRvIGFkZFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGRBZGRpdGlvbmFsRGVmYXVsdENvbXBvbmVudFNldHRpbmdzKCl7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcm90ZWN0ZWQgYXR0YWNoTGF5b3V0VG9WaWV3KHBhcmVudFZpZXc6SVZpZXd8dW5kZWZpbmVkID0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgbGV0IHZpZXcgPSBwYXJlbnRWaWV3ID8gcGFyZW50VmlldyA6IHRoaXMuX3ZpZXc7XHJcblxyXG4gICAgICAgIGlmICh2aWV3ICYmIHRoaXMuX2xheW91dFdpZGdldCkge1xyXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQudmlldyA9IHZpZXc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgbGF5b3V0IG9mIHRoZSB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBjcmVhdGVMYXlvdXQoKXtcclxuXHJcbiAgICB9XHJcbiAgICAgICBcclxuICAgIC8qKlxyXG4gICAgICogTG9hZCBzdHlsZXMgZm9yIFdpZGdldEJhc2VcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBsb2FkU3R5bGVzKCl7XHJcbiAgICAgICAgLy90aGlzLnN0eWxlTG9hZGVkKHVuZGVmaW5lZCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGFkZFN0eWxlKGZpbGVQYXRoOiBzdHJpbmcpe1xyXG4gICAgICAgIGxldCB0aGVtZWRGaWxlUGF0aCA9IHRoaXMuZ2V0VGhlbWVkRmlsZVBhdGgoZmlsZVBhdGgpO1xyXG4gICAgICAgICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpLmFwcGVuZCgnPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCInICsgdGhlbWVkRmlsZVBhdGggKyAnXCIgdHlwZT1cInRleHQvY3NzXCIgLz4nKTtcclxuICAgICAgICAvKnZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xyXG4gICAgICAgIGxpbmsudHlwZSA9ICd0ZXh0L2Nzcyc7XHJcbiAgICAgICAgbGluay5yZWwgPSAnc3R5bGVzaGVldCc7XHJcbiAgICAgICAgbGluay5ocmVmID0gZmlsZVBhdGg7XHJcbiAgICAgICAgJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCkuYXBwZW5kKGxpbmspOyovXHJcbiAgICAgICAgLy90aGlzLmxvYWRDc3MoJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCksIGZpbGVQYXRoLCAobGluaykgPT57dGhpcy5zdHlsZUxvYWRlZChsaW5rKX0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBhZGRTdHlsZVRvQ29udGVudElkKHBhcmVudENvbnRlbnRJZDogc3RyaW5nLCBmaWxlUGF0aDogc3RyaW5nKXtcclxuICAgICAgICBsZXQgdGhlbWVkRmlsZVBhdGggPSB0aGlzLmdldFRoZW1lZEZpbGVQYXRoKGZpbGVQYXRoKTtcclxuICAgICAgICAkKHBhcmVudENvbnRlbnRJZCkuYXBwZW5kKCc8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cIicgKyB0aGVtZWRGaWxlUGF0aCArICdcIiB0eXBlPVwidGV4dC9jc3NcIiAvPicpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFRoZW1lZEZpbGVQYXRoKGZpbGVQYXRoOiBzdHJpbmcpOiBzdHJpbmd7XHJcbiAgICAgICAgbGV0IHRoZW1lUHJvdmlkZXIgPSBUaGVtZVByb3ZpZGVyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoZW1lUHJvdmlkZXIuZ2V0VGhlbWVkRmlsZVBhdGgoZmlsZVBhdGgpO1xyXG4gICAgfVxyXG5cclxuLy8jcmVnaW9uIERyb3Agc3VwcG9ydFxyXG4gICAgcHJpdmF0ZSBfc3VwcG9ydGVkRHJhZ0Ryb3BEYXRhSWRzID0gbmV3IEFycmF5PHN0cmluZz4oKTsgLy9lLmcuIFNpZ25hbCwgLi5cclxuICAgIHB1YmxpYyBnZXQgc3VwcG9ydGVkRHJhZ0Ryb3BEYXRhSWRzKCk6IEFycmF5PHN0cmluZz4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdXBwb3J0ZWREcmFnRHJvcERhdGFJZHM7XHJcbiAgICB9XHJcbiAgICAgICAgXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgdGhlIGdpdmVuIGRyYWdkcm9wIGRhdGEgaWQgdG8gdGhpcyB3aWRnZXQsIGFuZCBhZGRzIHRoaXMgd2lkZ2V0IHRvIHRoZSBXaWRnZXRzV2l0aERyb3BTdXBwb3J0UHJvdmlkZXIgaWYgbm90IGFscmVhZHkgdGhlcmVcclxuICAgICAqIENhbiBvbmx5IGJlIHVzZWQgaWYgdGhlIHdpZGdldCBkZXJpdmVzIGZyb20gSURyb3BwYWJsZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgYWRkU3VwcG9ydGVkRHJhZ0Ryb3BEYXRhSWQoaWQ6IHN0cmluZykge1xyXG4gICAgICAgIFdpZGdldHNXaXRoRHJvcFN1cHBvcnRQcm92aWRlci5nZXRJbnN0YW5jZSgpLmFkZFdpZGdldCg8YW55PnRoaXMgYXMgSURyb3BwYWJsZSk7XHJcbiAgICAgICAgLy8gY2hlY2sgaWYgYWxyZWFkeSBpbiBsaXN0XHJcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5fc3VwcG9ydGVkRHJhZ0Ryb3BEYXRhSWRzLmluZGV4T2YoaWQpO1xyXG4gICAgICAgIGlmKGluZGV4ID09IC0xKXtcclxuICAgICAgICAgICAgdGhpcy5fc3VwcG9ydGVkRHJhZ0Ryb3BEYXRhSWRzLnB1c2goaWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgdGhlIGdpdmVuIGRyYWdkcm9wIGRhdGEgaWQgZnJvbSB0aGlzIHdpZGdldCwgYW5kIGlmIGl0IGlzIHRoZSBsYXN0IGRyYWdkcm9wIGRhdGEgaWQsIHJlbW92ZXMgdGhlIHdpZGdldCBmcm9tIHRoZSBXaWRnZXRzV2l0aERyb3BTdXBwb3J0UHJvdmlkZXJcclxuICAgICAqIENhbiBvbmx5IGJlIHVzZWQgaWYgdGhlIHdpZGdldCBkZXJpdmVzIGZyb20gSURyb3BwYWJsZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlU3VwcG9ydGVkRHJhZ0Ryb3BEYXRhSWQoaWQ6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuX3N1cHBvcnRlZERyYWdEcm9wRGF0YUlkcy5pbmRleE9mKGlkKTtcclxuICAgICAgICBpZihpbmRleCAhPSAtMSl7XHJcbiAgICAgICAgICAgIHRoaXMuX3N1cHBvcnRlZERyYWdEcm9wRGF0YUlkcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLl9zdXBwb3J0ZWREcmFnRHJvcERhdGFJZHMubGVuZ3RoID09IDApe1xyXG4gICAgICAgICAgICBXaWRnZXRzV2l0aERyb3BTdXBwb3J0UHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5yZW1vdmVXaWRnZXQoPGFueT50aGlzIGFzIElEcm9wcGFibGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuLy8jZW5kcmVnaW9uXHJcbiAgICBcclxuLy8jcmVnaW9uIGRyYWcgc3VwcG9ydFxyXG4gICAgcHJpdmF0ZSBfZHJvcFBvc3NpYmxlID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9kcmFnZ2luZ1N1cHBvcnRBY3RpdmUgPSBmYWxzZTtcclxuICAgIHByaXZhdGUgX2RyYWdnaW5nQ29udGFpbmVyO1xyXG4gICAgcHJpdmF0ZSBfZHJhZ0RhdGFPYmplY3QhOiBEcmFnRHJvcERhdGFPYmplY3Q7XHJcbiAgICBwcml2YXRlIF9kcmFnU3ltYm9sO1xyXG4gICAgcHJpdmF0ZSBfZGVmYXVsdERyYWdSZXByZXNlbnRhdGlvbiE6IERyYWdEcm9wUmVwcmVzZW50YXRpb247XHJcbiAgICBwcml2YXRlIF9kZWZhdWx0RHJvcE5vdFBvc3NpYmxlUmVwcmVzZW50YXRpb246c3RyaW5nID0gXCJcIjtcclxuICAgIFxyXG5cdC8qKlxyXG4gICAgICogQWRkcyBkcmFnZ2luZyBzdXBwb3J0IHRvIHRoaXMgd2lkZ2V0OyB2aWEgSURyYWdnYWJsZSB0aGUgd2lkZ2V0IGNhbiBwcm92aWRlIHRoZSBpbmZvcm1hdGlvbiB3aGljaCBvYmplY3Qgc2hvdWxkIGJlIGRyYWdnZWRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkRHJhZ2dpbmdTdXBwb3J0KCl7XHJcbiAgICAgICAgaWYodGhpcy5wYXJlbnRDb250ZW50SWQgPT0gXCJcIil7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJwYXJlbnRDb250ZW50SWQgbm90IHNldCBmb3IgZHJhZ2dhYmxlIHN1cHBvcnRcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGltYWdlUHJvdmlkZXIgPSB0aGlzLmNvbXBvbmVudC5nZXRTdWJDb21wb25lbnQoRGVmYXVsdENvbXBvbmVudFNldHRpbmdzV2lkZ2V0QmFzZS5JbWFnZVByb3ZpZGVySWQpIGFzIElJbWFnZVByb3ZpZGVyOyBcclxuICAgICAgICBpZihpbWFnZVByb3ZpZGVyICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2RlZmF1bHREcm9wTm90UG9zc2libGVSZXByZXNlbnRhdGlvbiA9IGltYWdlUHJvdmlkZXIuZ2V0SW1hZ2UoXCIuLi9hcHAvd2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL2RyYWdEcm9wL2Ryb3BOb3RQb3NzaWJsZS5zdmdcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJJbWFnZVByb3ZpZGVyIG5vdCBhdmFpbGFibGUgPT4gQWRkIEltYWdlUHJvdmlkZXIgc3ViIGNvbXBvbmVudCB0byB0aGlzIHdpZGdldCFcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9kcmFnZ2luZ1N1cHBvcnRBY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2RyYWdnaW5nQ29udGFpbmVyID0gJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2RyYWdnaW5nQ29udGFpbmVyLmVqRHJhZ2dhYmxlKHtcclxuICAgICAgICAgICAgZGlzdGFuY2U6IDEwLFxyXG5cclxuICAgICAgICAgICAgaGVscGVyOiAoYXJncykgPT4gdGhpcy5kcmFnZ2luZ0hlbHBlcihhcmdzKSxcclxuICAgICAgICAgICAgZHJhZ1N0YXJ0OiAoYXJncykgPT4gdGhpcy5kcmFnZ2luZ1N0YXJ0KGFyZ3MpLFxyXG4gICAgICAgICAgICBkcmFnU3RvcDogKGFyZ3MpID0+IHRoaXMuZHJhZ2dpbmdTdG9wKGFyZ3MpLFxyXG4gICAgICAgICAgICBkZXN0cm95OiAoYXJncykgPT4gdGhpcy5kcmFnZ2luZ0Rlc3Ryb3koYXJncyksXHJcbiAgICAgICAgICAgIGRyYWc6IChhcmdzKSA9PiB0aGlzLmRyYWdnaW5nRHJhZyhhcmdzKSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgZHJhZ2dpbmcgc3VwcG9ydCBmcm9tIHRoaXMgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlbW92ZURyYWdnaW5nU3VwcG9ydCgpe1xyXG4gICAgICAgIHRoaXMuX2RyYWdnaW5nU3VwcG9ydEFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBlakRyYWdnYWJsZU9iaiA9IHRoaXMuX2RyYWdnaW5nQ29udGFpbmVyLmRhdGEoXCJlakRyYWdnYWJsZVwiKTtcclxuICAgICAgICBpZihlakRyYWdnYWJsZU9iaiAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBlakRyYWdnYWJsZU9iai5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFdpbGwgYmUgY2FsbGVkIGF0IHRoZSBlbmQgb2YgYSBkcmFnJmRyb3Agb3BlcmF0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkcmFnZ2luZ0Rlc3Ryb3koYXJncyl7XHJcbiAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIHRlbXBvcmFyeSBkcmFnIG9iamVjdCBmb3IgdGhlIGRyYWcgJiBkcm9wIG9wZXJhdGlvbiBhbmQgYWRkcyBpdCB0byB0aGUgZG9jdW1lbnQgYm9keVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRyYWdnaW5nSGVscGVyKGFyZ3MpIHtcclxuICAgICAgICB2YXIgZWpEcmFnZ2FibGVPYmogPSB0aGlzLl9kcmFnZ2luZ0NvbnRhaW5lci5kYXRhKFwiZWpEcmFnZ2FibGVcIik7XHJcbiAgICAgICAgaWYoZWpEcmFnZ2FibGVPYmogIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gU2V0IGRyYWcgb2JqZWN0IHBvc2l0aW9uIChfcmVsWXBvc2l0aW9uIGFuZCBfcmVsWHBvc2l0aW9uIGFyZSB0aGUgcG9zaXRpb25zIHdpdGhpbiB0aGUgZHJhZ2dhYmxlIG9iamVjdClcclxuICAgICAgICAgICAgZWpEcmFnZ2FibGVPYmoub3B0aW9uKFwiY3Vyc29yQXRcIiwgeyB0b3A6ICggZWpEcmFnZ2FibGVPYmouX3JlbFlwb3NpdGlvbiotMSktMTAsIGxlZnQ6ICBlakRyYWdnYWJsZU9iai5fcmVsWHBvc2l0aW9uKi0xIH0sIHRydWUpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEdldCB0aGUgaW5mb3JtYXRpb24gb2YgdGhlIGRyYWcgb2JqZWN0IGZyb20gd2lkZ2V0XHJcbiAgICAgICAgbGV0IGRyYWdEYXRhT2JqZWN0ID0gdGhpcy5zdGFydERyYWdnaW5nKCk7XHJcbiAgICAgICAgaWYoZHJhZ0RhdGFPYmplY3QgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9kcmFnRGF0YU9iamVjdCA9IGRyYWdEYXRhT2JqZWN0O1xyXG5cclxuICAgICAgICB0aGlzLl9kZWZhdWx0RHJhZ1JlcHJlc2VudGF0aW9uID0gdGhpcy5fZHJhZ0RhdGFPYmplY3QucmVwcmVzZW50YXRpb247XHJcbiAgICAgICAgdGhpcy5fZHJhZ1N5bWJvbCA9ICQoJzxwcmU+JykuaHRtbCh0aGlzLl9kZWZhdWx0RHJvcE5vdFBvc3NpYmxlUmVwcmVzZW50YXRpb24pO1xyXG5cclxuICAgICAgICAvLyBBZGRzIHRoZSBjdXJyZW50IGRhdGEgdG8gdGhlIGRyYWcgZGF0YVxyXG4gICAgICAgIHRoaXMuc2V0RHJhZ0RhdGEoYXJncywgdGhpcy5fZHJhZ0RhdGFPYmplY3QuZGF0YSlcclxuXHJcbiAgICAgICAgdGhpcy5fZHJhZ1N5bWJvbC5hcHBlbmRUbyhkb2N1bWVudC5ib2R5KTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZHJhZ1N5bWJvbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFdpbGwgYmUgY2FsbGVkIGF0IHRoZSBiZWdpbm5pbmcgb2YgYSBkcmFnJmRyb3Agb3BlcmF0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHJldHVybnMgeyhEcmFnRHJvcERhdGFPYmplY3R8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBzdGFydERyYWdnaW5nKCk6RHJhZ0Ryb3BEYXRhT2JqZWN0fHVuZGVmaW5lZHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogV2lsbCBiZSBjYWxsZWQgYWZ0ZXIgdGhlIGRyb3BcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZHJhZ2dpbmdTdG9wcGVkKCl7XHJcblxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgdGhlIHRlbXBvcmFyeSBkcmFnIG9iamVjdCBhZnRlciBkcmFnICYgZHJvcCBvcGVyYXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZW1vdmVEcmFnT2JqZWN0RnJvbURvY3VtZW50KCkgeyAgICBcclxuICAgICAgICBmb3IobGV0IGkgPSBkb2N1bWVudC5ib2R5LmNoaWxkTm9kZXMubGVuZ3RoLTE7IGkgPj0gMDsgaS0tKXtcclxuICAgICAgICAgICAgaWYoZG9jdW1lbnQuYm9keS5jaGlsZE5vZGVzW2ldLm5vZGVOYW1lID09IFwiUFJFXCIpe1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jaGlsZE5vZGVzW2ldLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFdpbGwgYmUgY2FsbGVkIGF0IHN0YXJ0IGRyYWdnaW5nXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZHJhZ2dpbmdTdGFydChhcmdzKSB7XHJcbiAgICAgICAgbGV0IGRyYWdEYXRhID0gdGhpcy5nZXREcmFnRGF0YShhcmdzKTtcclxuICAgICAgICBpZihkcmFnRGF0YSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAvLyBJbmZvcm0gb25seSB3aWRnZXRzIHdpdGggZHJvcCBzdXBwb3J0IGZvciB0aGUgZ2l2ZW4gZHJhZ0Ryb3BEYXRhSWRcclxuICAgICAgICAgICAgV2lkZ2V0c1dpdGhEcm9wU3VwcG9ydFByb3ZpZGVyLmdldEluc3RhbmNlKCkuZ2V0V2lkZ2V0c1dpdGhEcmFnRHJvcERhdGFJZCh0aGlzLl9kcmFnRGF0YU9iamVjdC5pZCkuZm9yRWFjaCh3aWRnZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gY2FsbCBkcmFnU3RhcnRcclxuICAgICAgICAgICAgICAgIHdpZGdldC5kcmFnU3RhcnQobmV3IERyYWdEcm9wQXJncyhhcmdzLmN1cnJlbnRUYXJnZXQsIGRyYWdEYXRhLCB0aGlzLl9kZWZhdWx0RHJhZ1JlcHJlc2VudGF0aW9uKSk7XHJcbiAgICAgICAgICAgIH0pOyAgXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgYXJncy5jYW5jZWwgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogV2lsbCBiZSBjYWxsZWQgd2hpbGUgZHJhZ2dpbmcgaXMgYWN0aXZlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkcmFnZ2luZ0RyYWcoYXJncykge1xyXG4gICAgICAgIHRoaXMuX2Ryb3BQb3NzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBjdXJyZW50RHJhZ0Ryb3BFbGVtZW50ID0gdGhpcy5fZGVmYXVsdERyYWdSZXByZXNlbnRhdGlvbi5jbG9uZSgpO1xyXG4gICAgICAgIGxldCBkcmFnRGF0YSA9IHRoaXMuZ2V0RHJhZ0RhdGEoYXJncyk7XHJcbiAgICAgICAgaWYoZHJhZ0RhdGEgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgbGV0IG5ld1dpZGdldDogSURyb3BwYWJsZXx1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIGlmKGFyZ3MuY3VycmVudFRhcmdldCAhPSB1bmRlZmluZWQpeyAvLyB1bmRlZmluZWQgaWYgb3V0IG9mIGJyb3dzZXIgd2luZG93XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIEluZm9ybSBvbmx5IHdpZGdldHMgd2l0aCBkcm9wIHN1cHBvcnQgZm9yIHRoZSBnaXZlbiBkcmFnRHJvcERhdGFJZFxyXG4gICAgICAgICAgICAgICAgV2lkZ2V0c1dpdGhEcm9wU3VwcG9ydFByb3ZpZGVyLmdldEluc3RhbmNlKCkuZ2V0V2lkZ2V0c1dpdGhEcmFnRHJvcERhdGFJZCh0aGlzLl9kcmFnRGF0YU9iamVjdC5pZCkuZm9yRWFjaCh3aWRnZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIE9ubHkgd2lkZ2V0IHdpdGggY3VycmVudFRhcmdldChkaXZJZCkgYXMgcGFyZW50IHNob3VsZCBiZSBpbmZvcm1lZFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNFbGVtZW50V2l0aGluV2lkZ2V0KGFyZ3MuY3VycmVudFRhcmdldCwgKDxhbnk+d2lkZ2V0KS5jc3NQYXJlbnRDb250ZW50SWQpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3V2lkZ2V0ID0gd2lkZ2V0O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2FsbCBkcmFnT3ZlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZHJhZ0Ryb3BBcmdzID0gbmV3IERyYWdEcm9wQXJncyhhcmdzLmN1cnJlbnRUYXJnZXQsIGRyYWdEYXRhLCBjdXJyZW50RHJhZ0Ryb3BFbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRyYWdPdmVyUG9zc2libGUgPSB3aWRnZXQuZHJhZ092ZXIoZHJhZ0Ryb3BBcmdzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZHJhZ092ZXJQb3NzaWJsZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9kcm9wUG9zc2libGUgPSBkcmFnT3ZlclBvc3NpYmxlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gICBcclxuICAgICAgICAgICAgaWYobmV3V2lkZ2V0ICE9IHRoaXMuX2N1cnJlbnRXaWRnZXQpe1xyXG4gICAgICAgICAgICAgICAgLy8gRHJhZ092ZXIgY2hhbmdlZCBmcm9tIG9uZSB3aWRnZXQgdG8gYW4gb3RoZXJcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuX2N1cnJlbnRXaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50V2lkZ2V0LmRyb3BGb2N1c0xvc3QoYXJncyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50V2lkZ2V0ID0gbmV3V2lkZ2V0O1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0gICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLl9kcm9wUG9zc2libGUpe1xyXG4gICAgICAgICAgICB0aGlzLl9kcmFnU3ltYm9sWzBdLmlubmVySFRNTCA9IGN1cnJlbnREcmFnRHJvcEVsZW1lbnQuZ2V0RHJhZ0Ryb3BFbGVtZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX2RyYWdTeW1ib2xbMF0uaW5uZXJIVE1MID0gdGhpcy5fZGVmYXVsdERyb3BOb3RQb3NzaWJsZVJlcHJlc2VudGF0aW9uO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFdpbGwgYmUgY2FsbGVkIHdoZW4gZHJhZ2dpbmcgd2FzIHN0b3BwZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRyYWdnaW5nU3RvcChhcmdzKSB7XHJcbiAgICAgICAgbGV0IGRyYWdEYXRhID0gdGhpcy5nZXREcmFnRGF0YShhcmdzKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5fZHJvcFBvc3NpYmxlKXtcclxuICAgICAgICAgICAgaWYoYXJncy5jdXJyZW50VGFyZ2V0ICE9IHVuZGVmaW5lZCApeyAgLy8gdW5kZWZpbmVkIGlmIG91dCBvZiBicm93c2VyIHdpbmRvd1xyXG4gICAgICAgICAgICAgICAgLy8gSW5mb3JtIG9ubHkgd2lkZ2V0cyB3aXRoIGRyb3Agc3VwcG9ydCBmb3IgdGhlIGdpdmVuIGRyYWdEcm9wRGF0YUlkXHJcbiAgICAgICAgICAgICAgICBXaWRnZXRzV2l0aERyb3BTdXBwb3J0UHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXRXaWRnZXRzV2l0aERyYWdEcm9wRGF0YUlkKHRoaXMuX2RyYWdEYXRhT2JqZWN0LmlkKS5mb3JFYWNoKHdpZGdldCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gT25seSB3aWRnZXQgd2l0aCBjdXJyZW50VGFyZ2V0KGRpdklkKSBhcyBwYXJlbnQgc2hvdWxkIGJlIGluZm9ybWVkXHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5pc0VsZW1lbnRXaXRoaW5XaWRnZXQoYXJncy5jdXJyZW50VGFyZ2V0LCAoPGFueT53aWRnZXQpLmNzc1BhcmVudENvbnRlbnRJZCkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjYWxsIGRyb3BcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LmRyb3AobmV3IERyYWdEcm9wQXJncyhhcmdzLmN1cnJlbnRUYXJnZXQsIGRyYWdEYXRhKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEluZm9ybSBvbmx5IHdpZGdldHMgd2l0aCBkcm9wIHN1cHBvcnQgZm9yIHRoZSBnaXZlbiBkcmFnRHJvcERhdGFJZFxyXG4gICAgICAgIFdpZGdldHNXaXRoRHJvcFN1cHBvcnRQcm92aWRlci5nZXRJbnN0YW5jZSgpLmdldFdpZGdldHNXaXRoRHJhZ0Ryb3BEYXRhSWQodGhpcy5fZHJhZ0RhdGFPYmplY3QuaWQpLmZvckVhY2god2lkZ2V0ID0+IHtcclxuICAgICAgICAgICAgLy8gY2FsbCBkcmFnU3RvcFxyXG4gICAgICAgICAgICB3aWRnZXQuZHJhZ1N0b3AobmV3IERyYWdEcm9wQXJncyhhcmdzLmN1cnJlbnRUYXJnZXQsIGRyYWdEYXRhKSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuZHJhZ2dpbmdTdG9wcGVkKCk7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVEcmFnT2JqZWN0RnJvbURvY3VtZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXREcmFnRGF0YShhcmdzOiBhbnkpOiBhbnl7XHJcbiAgICAgICAgaWYodGhpcy5fZHJhZ0RhdGFPYmplY3QgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIGFyZ3MuZWxlbWVudC5kYXRhKHRoaXMuX2RyYWdEYXRhT2JqZWN0LmlkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldERyYWdEYXRhKGFyZ3M6IGFueSwgZGF0YTogYW55KXtcclxuICAgICAgICBhcmdzLmVsZW1lbnQuZGF0YSh0aGlzLl9kcmFnRGF0YU9iamVjdC5pZCwgZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVjayBpZiBhbiBlbGVtZW50IGlzIGEgY2hpbGQgb2YgdGhlIGdpdmVuIHBhcmVudCBpZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGVsZW1lbnRcclxuICAgICAqIEBwYXJhbSB7Kn0gcGFyZW50SWRcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgaXNFbGVtZW50V2l0aGluV2lkZ2V0KGVsZW1lbnQsIHBhcmVudElkKXtcclxuICAgICAgICBsZXQgcGFyZW50ID0gZWxlbWVudC5jbG9zZXN0KHBhcmVudElkKTtcclxuICAgICAgICBpZihwYXJlbnQgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgd2lkZ2V0IGZvciB0aGUgZ2l2ZW4gaWQgaWYgZm91bmQsIGVsc2UgdW5kZWZpbmVkXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkIHRoZSB3aWRnZXQgaWRcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgLypwdWJsaWMgZ2V0V2lkZ2V0QnlJZChpZDogc3RyaW5nLCByZWN1cnNpdmU6IGJvb2xlYW4gPSBmYWxzZSk6IElXaWRnZXR8dW5kZWZpbmVke1xyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLl93aWRnZXRzKSB7XHJcbiAgICAgICAgICAgIGxldCBmb3VuZFdpZGdldDogSVdpZGdldHx1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIGxldCB3aWRnZXQgPSB0aGlzLl93aWRnZXRzW2tleV07XHJcbiAgICAgICAgICAgIGlmKHdpZGdldC5pZCA9PSBpZCl7XHJcbiAgICAgICAgICAgICAgICBmb3VuZFdpZGdldCA9IHdpZGdldDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgaWYocmVjdXJzaXZlID09IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmb3VuZENoaWxkV2lkZ2V0ID0gd2lkZ2V0LmdldFdpZGdldEJ5SWQoaWQsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGZvdW5kQ2hpbGRXaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm91bmRXaWRnZXQgPSBmb3VuZENoaWxkV2lkZ2V0O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihmb3VuZFdpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvdW5kV2lkZ2V0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWRcclxuICAgIH0qL1xyXG5cclxuXHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuXHJcbiAgICAvKnByaXZhdGUgc3R5bGVMb2FkZWQobGluayl7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsb2FkQ3NzKGVsZW1lbnQsIHVybCwgY2FsbGJhY2spe1xyXG4gICAgICAgIHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xyXG4gICAgICAgIGxpbmsudHlwZSA9ICd0ZXh0L2Nzcyc7XHJcbiAgICAgICAgbGluay5yZWwgPSAnc3R5bGVzaGVldCc7XHJcbiAgICAgICAgbGluay5ocmVmID0gdXJsO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGVsZW1lbnRbMF0uYXBwZW5kQ2hpbGQobGluayk7XHJcbiAgICBcclxuICAgICAgICB2YXIgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgICAgaW1nLm9uZXJyb3IgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZihjYWxsYmFjayl7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhsaW5rKTtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9XHJcbiAgICAgICAgaW1nLnNyYyA9IHVybDtcclxuICAgIH0qL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWN0aXZhdGUgdGhlIFdpZGdldEJhc2VcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBhY3RpdmF0ZSgpe1xyXG4gICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWFjdGl2YXRlIHRoZSBXaWRnZXRCYXNlXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgZGVhY3RpdmF0ZSgpe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc3Bvc2UgdGhlIFdpZGdldEJhc2VcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBkaXNwb3NlKCl7XHJcbiAgICAgICAgaWYodGhpcy5fZHJhZ2dpbmdTdXBwb3J0QWN0aXZlID09IHRydWUpe1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZURyYWdnaW5nU3VwcG9ydCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLl9kYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YU1vZGVsLmV2ZW50TW9kZWxDaGFuZ2VkLmRldGFjaCh0aGlzLl9tb2RlbENoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YU1vZGVsLmV2ZW50TW9kZWxJdGVtc0NoYW5nZWQuZGV0YWNoKHRoaXMuX21vZGVsSXRlbXNDaGFuZ2VkSGFuZGxlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBkZWxldGUgYmluZGluZ3NcclxuICAgICAgICBDb21wb25lbnRCaW5kaW5ncy51bmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBidXN5IHNjcmVlbiBpbmZvcm1hdGlvbiB3aGljaCB3aWxsIGJlIHNob3duIHdoZW4gdGhlIGJ1c3kgZmxhZyB0cnVlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtCdXN5SW5mb3JtYXRpb259IGJ1c3lJbmZvcm1hdGlvblxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgc2V0QnVzeUluZm9ybWF0aW9uKGJ1c3lJbmZvcm1hdGlvbjogQnVzeUluZm9ybWF0aW9uKXtcclxuICAgICAgICB0aGlzLl9idXN5SW5mb3JtYXRpb24gPSBidXN5SW5mb3JtYXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIGJ1c3kgZmxhZyBvZiB0aGUgV2lkZ2V0QmFzZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZmxhZyBpZiB0cnVlIGJ1c3kgc2NyZWVuIHdpbGwgYmUgc2hvd25cclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIHNldEJ1c3koZmxhZzogYm9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5idXN5U2NyZWVuSWQgPSB0aGlzLmNzc1BhcmVudENvbnRlbnRJZCtcImJ1c3lTY3JlZW5cIjtcclxuICAgICAgICBpZihmbGFnID09IHRydWUpe1xyXG4gICAgICAgICAgICBsZXQgc3RyaXBwZWRJZCA9IHRoaXMuYnVzeVNjcmVlbklkLnJlcGxhY2UoXCIjXCIsXCJcIilcclxuICAgICAgICAgICAgbGV0IGNvbW1vbkxheW91dFByb3ZpZGVyID0gdGhpcy5jb21wb25lbnQuZ2V0U3ViQ29tcG9uZW50KERlZmF1bHRDb21wb25lbnRTZXR0aW5nc1dpZGdldEJhc2UuQ29tbW9uTGF5b3V0UHJvdmlkZXJJZCkgYXMgSUNvbW1vbkxheW91dFByb3ZpZGVyO1xyXG4gICAgICAgICAgICBpZihjb21tb25MYXlvdXRQcm92aWRlciAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGh0bWwgPSBjb21tb25MYXlvdXRQcm92aWRlci5nZXRCdXN5U2NyZWVuTGF5b3V0KHN0cmlwcGVkSWQsIHRoaXMuX2J1c3lJbmZvcm1hdGlvbik7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKS5wYXJlbnQoKS5hcHBlbmQoaHRtbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDb21tb25MYXlvdXRQcm92aWRlciBub3QgYXZhaWxhYmxlID0+IGFkZCB0byBzdWIgY29tcG9uZW50cyFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgJCh0aGlzLmJ1c3lTY3JlZW5JZCkucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUGVyc2lzdCB3aWRnZXQgc2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgc2F2ZVNldHRpbmdzKCkge1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LnNhdmVDb21wb25lbnRTZXR0aW5ncygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVzaXplIHRoZSBXaWRnZXRCYXNlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0XHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICByZXNpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXQgZGF0YU1vZGVsKCk6SURhdGFNb2RlbHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YU1vZGVsO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBkYXRhTW9kZWwoZGF0YU1vZGVsOiBJRGF0YU1vZGVsKXtcclxuICAgICAgICAvLyBEZXRhY2ggZXZlbnRzIGZyb20gb2xkIGRhdGFNb2RlbFxyXG4gICAgICAgIHRoaXMuZGV0YWNoRGF0YU1vZGVsRXZlbnRzKCk7XHJcbiAgICAgICAgLy8gU2V0IG5ldyBkYXRhTW9kZWxcclxuICAgICAgICB0aGlzLl9kYXRhTW9kZWwgPSBkYXRhTW9kZWw7XHJcbiAgICAgICAgLy8gQXR0YWNoIGV2ZW50cyB0byBuZXcgZGF0YU1vZGVsXHJcbiAgICAgICAgdGhpcy5hdHRhY2hEYXRhTW9kZWxFdmVudHMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGF0dGFjaGVzIHRoZSBkYXRhIG1vZGVsIGV2ZW50c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGF0dGFjaERhdGFNb2RlbEV2ZW50cygpIHtcclxuICAgICAgICBpZih0aGlzLl9kYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YU1vZGVsLmV2ZW50TW9kZWxDaGFuZ2VkLmF0dGFjaCh0aGlzLl9tb2RlbENoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YU1vZGVsLmV2ZW50TW9kZWxJdGVtc0NoYW5nZWQuYXR0YWNoKHRoaXMuX21vZGVsSXRlbXNDaGFuZ2VkSGFuZGxlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIGRldGFjaGVzIHRoZSBkYXRhIG1vZGVsIGV2ZW50c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRldGFjaERhdGFNb2RlbEV2ZW50cygpIHtcclxuICAgICAgICBpZih0aGlzLl9kYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YU1vZGVsLmV2ZW50TW9kZWxDaGFuZ2VkLmRldGFjaCh0aGlzLl9tb2RlbENoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YU1vZGVsLmV2ZW50TW9kZWxJdGVtc0NoYW5nZWQuZGV0YWNoKHRoaXMuX21vZGVsSXRlbXNDaGFuZ2VkSGFuZGxlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBoYW5kbGVNb2RlbENoYW5nZWQoc2VuZGVyOiBhbnksIGRhdGE6IGFueSk6IGFueSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZU1vZGVsSXRlbXNDaGFuZ2VkKHNlbmRlcjogSURhdGFNb2RlbCwgZXZlbnRBcmdzOiBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25PYnNlcnZhYmxlc0NoYW5nZWQoY2hhbmdlZE9ic2VydmFibGVzOiBPYnNlcnZhYmxlW10pIHtcclxuIFxyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiB0aGUgY2xhc3MgaW1wbGVtZW50cyB0aGUgbnVsbCBvYmplY3QgZm9yIHRoZSBkYXRhIG1vZGVsLiBJdCBpcyBpbnRlbmRlZCB0byBiZSBzZXQgZm9yIHdpZGdldHMgd2l0aG91dCBhIHJlYWwgZGF0YSBtb2RlbFxyXG4gKlxyXG4gKiBAY2xhc3MgTnVsbERhdGFNb2RlbFxyXG4gKiBAaW1wbGVtZW50cyB7SURhdGFNb2RlbH1cclxuICovXHJcbmNsYXNzIE51bGxEYXRhTW9kZWwgaW1wbGVtZW50cyBJRGF0YU1vZGVse1xyXG5cclxuICAgIGV2ZW50TW9kZWxDaGFuZ2VkOiBFdmVudE1vZGVsQ2hhbmdlZCA9IG5ldyBFdmVudE1vZGVsQ2hhbmdlZDsgXHJcbiAgICBldmVudE1vZGVsSXRlbXNDaGFuZ2VkOiBFdmVudE1vZGVsSXRlbXNDaGFuZ2VkID0gbmV3IEV2ZW50TW9kZWxJdGVtc0NoYW5nZWQ7IFxyXG4gICAgICAgIFxyXG4gICAgcHVibGljIGNvbXBvbmVudCE6IENvbXBvbmVudEJhc2U7XHJcblxyXG4gICAgb2JzZXJ2ZU1vZGVsSXRlbXMob2JzZXJ2YWJsZUl0ZW1zOiBhbnlbXSkge1xyXG5cclxuICAgIH1cclxuICAgIG9uTW9kZWxJdGVtc0NoYW5nZWQoc2VuZGVyOiBJRGF0YU1vZGVsLCBkYXRhOiBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MpIHtcclxuXHJcbiAgICB9XHJcbiAgICBoYW5kbGVNb2RlbEl0ZW1zQ2hhbmdlZChzZW5kZXI6IElEYXRhTW9kZWwsIGRhdGE6IEV2ZW50TW9kZWxDaGFuZ2VkQXJncykge1xyXG4gXHJcbiAgICB9XHJcblxyXG5cclxuICAgIGRhdGE6YW55IDsgICAgZGF0YVNvdXJjZTtcclxuICAgIGluaXRpYWxpemUoKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjbGVhcigpe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBkaXNwb3NlKCl7XHJcblxyXG4gICAgfVxyXG4gICAgZ2V0RGVmYXVsdFN0b3JpbmdEYXRhKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBpbml0aWFsaXplQ29tcG9uZW50KCl7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZGlzYWJsZVBlcnNpc3RpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDb21wb25lbnRTZXR0aW5ncygpOiBDb21wb25lbnRTZXR0aW5ncyB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBDb21wb25lbnRTZXR0aW5ncygpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldERlZmF1bHRDb21wb25lbnRTZXR0aW5ncygpOiBDb21wb25lbnRTZXR0aW5nc3x1bmRlZmluZWQge1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHNldENvbXBvbmVudFNldHRpbmdzKGRhdGE6IENvbXBvbmVudFNldHRpbmdzKSB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgY29ubmVjdCgpOiB2b2lkIHtcclxuICAgXHJcbiAgICB9XHJcbiAgICBvbk1vZGVsQ2hhbmdlZChzZW5kZXI6IElEYXRhTW9kZWwsIGRhdGE6IEV2ZW50TW9kZWxDaGFuZ2VkQXJncykge1xyXG4gXHJcbiAgICB9XHJcbiAgICBoYW5kbGVNb2RlbENoYW5nZWQoc2VuZGVyOiBJRGF0YU1vZGVsLCBkYXRhOiBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MpIHtcclxuICBcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtXaWRnZXRCYXNlfTsiXX0=