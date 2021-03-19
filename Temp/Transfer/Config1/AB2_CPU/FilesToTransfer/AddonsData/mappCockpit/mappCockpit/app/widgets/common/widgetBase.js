define(["require", "exports", "../../models/dataModelInterface", "./commonLayoutProvider", "./busyInformation", "./themeProvider", "./widgetsWithDropSupportProvider", "../../framework/store", "./imageProvider", "./dragDropArgs", "../../common/persistence/persistDataProvider", "../../common/componentBase/componentBase", "../../common/componentFactory/componentFactory", "../../framework/componentHub/bindings/componentBindings"], function (require, exports, dataModelInterface_1, commonLayoutProvider_1, busyInformation_1, themeProvider_1, widgetsWithDropSupportProvider_1, store_1, imageProvider_1, dragDropArgs_1, persistDataProvider_1, componentBase_1, componentFactory_1, componentBindings_1) {
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
            /**
             * The component of this widget(holds the settings for persisting)
             *
             * @type {ComponentBase}
             * @memberof WidgetBase
             */
            this.component = new componentBase_1.ComponentBase(componentFactory_1.ComponentFactory.getInstance(), this);
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
            this.initializeComponent();
            this.addDefaultComponentSettings();
            this.addAdditionalDefaultComponentSettings();
            this.component.loadComponentSettings();
            this.initialized();
            this.component.setBindingsData();
        };
        /**
         * Add the default component settings to the provider
         *
         * @private
         * @memberof WidgetBase
         */
        WidgetBase.prototype.addDefaultComponentSettings = function () {
            // Is a default persisting data id definied
            if (this.getDefaultComponentSettingsDataId() != "") {
                // Is some default persisting data defined
                var defaultComponentSettings = this.getDefaultComponentSettings();
                if (defaultComponentSettings != undefined) {
                    // Add default persisting definition to the default persisting data provider
                    this.addDefaultComponentSettingsToProvider(this.getDefaultComponentSettingsDataId(), defaultComponentSettings);
                }
            }
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
         * Get the id of the default settings data which should be used if no persisting data is available
         *
         * @returns
         * @memberof WidgetBase
         */
        WidgetBase.prototype.getDefaultComponentSettingsDataId = function () {
            return this.component.defaultSettingsDataId;
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
         * Retruns the settings of this component
         *
         * @returns {ComponentSettings}
         * @memberof WidgetBase
         */
        WidgetBase.prototype.getComponentSettings = function () {
            return this.component.getComponentSettings();
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
         * Adds the given default component settings to the default persisting data provider(TODO: should be a seperated default componentSettings provider)
         *
         * @memberof WidgetBase
         */
        WidgetBase.prototype.addDefaultComponentSettingsToProvider = function (id, settings) {
            if (settings == undefined) {
                console.error("No default persisting data available for id: " + id);
            }
            else {
                persistDataProvider_1.PersistDataProvider.getInstance().setDefaultDataWithId(id, settings);
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
            this.component.saveComponentSettings();
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
            this.component = new componentBase_1.ComponentBase(componentFactory_1.ComponentFactory.getInstance(), this);
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
        NullDataModel.prototype.getComponentSettings = function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0QmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jb21tb24vd2lkZ2V0QmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFzQkE7UUF3Q0k7OztXQUdHO1FBQ0g7WUFBQSxpQkFFQztZQTVDUyxZQUFPLEdBQVMsSUFBSSxhQUFLLEVBQUUsQ0FBQztZQUU1QixhQUFRLEdBQXlCLElBQUksR0FBRyxFQUFtQixDQUFDO1lBUXRFOzs7OztlQUtHO1lBQ0gsb0JBQWUsR0FBVyxFQUFFLENBQUM7WUFDN0IsaUJBQVksR0FBRyxFQUFFLENBQUM7WUFFbEIscUJBQWdCLEdBQVksS0FBSyxDQUFDO1lBQ2xDLGVBQVUsR0FBVyxFQUFFLENBQUE7WUFFYixpQkFBWSxHQUFXLENBQUMsQ0FBQztZQUN6QixrQkFBYSxHQUFXLENBQUMsQ0FBQztZQUU1QixxQkFBZ0IsR0FBb0IsSUFBSSxpQ0FBZSxFQUFFLENBQUM7WUFFMUQseUJBQW9CLEdBQUcsVUFBQyxNQUFNLEVBQUUsSUFBSSxJQUFPLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEYsOEJBQXlCLEdBQUcsVUFBQyxNQUFNLEVBQUUsSUFBSSxJQUFPLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFdEc7Ozs7O2VBS0c7WUFDSSxjQUFTLEdBQWtCLElBQUksNkJBQWEsQ0FBQyxtQ0FBZ0IsQ0FBQyxXQUFXLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztZQWlROUYsc0JBQXNCO1lBQ1YsOEJBQXlCLEdBQUcsSUFBSSxLQUFLLEVBQVUsQ0FBQyxDQUFDLGlCQUFpQjtZQXFDOUUsWUFBWTtZQUVaLHNCQUFzQjtZQUNWLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1lBQ3RCLDJCQUFzQixHQUFHLEtB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UUFFdkUsQ0FBQztRQUlELGtDQUFVLEdBQVY7UUFFQSxDQUFDO1FBRUQsNkJBQUssR0FBTDtRQUVBLENBQUM7UUFFRCwrQkFBTyxHQUFQO1FBRUEsQ0FBQztRQUNELDZDQUFxQixHQUFyQjtZQUNJLE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFFRCw0Q0FBb0IsR0FBcEI7UUFFQSxDQUFDO1FBRUQsNENBQW9CLEdBQXBCLFVBQXFCLElBQVM7UUFFOUIsQ0FBQztRQUVELCtCQUFPLEdBQVA7UUFFQSxDQUFDO1FBQ0Qsc0NBQWMsR0FBZCxVQUFlLE1BQWtCLEVBQUUsSUFBMkI7UUFFOUQsQ0FBQztRQUNELDBDQUFrQixHQUFsQixVQUFtQixNQUFrQixFQUFFLElBQTJCO1FBRWxFLENBQUM7UUFDTCxvQkFBQztJQUFELENBQUMsQUFuREQsSUFtREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJRGF0YU1vZGVsLEV2ZW50TW9kZWxDaGFuZ2VkLEV2ZW50TW9kZWxDaGFuZ2VkQXJncywgRXZlbnRNb2RlbEl0ZW1zQ2hhbmdlZCB9IGZyb20gJy4uLy4uL21vZGVscy9kYXRhTW9kZWxJbnRlcmZhY2UnXHJcbmltcG9ydCB7IElXaWRnZXQgfSBmcm9tICcuL2ludGVyZmFjZXMvd2lkZ2V0SW50ZXJmYWNlJztcclxuaW1wb3J0IHsgQ29tbW9uTGF5b3V0UHJvdmlkZXIgfSBmcm9tICcuL2NvbW1vbkxheW91dFByb3ZpZGVyJztcclxuaW1wb3J0IHsgQnVzeUluZm9ybWF0aW9uIH0gZnJvbSAnLi9idXN5SW5mb3JtYXRpb24nO1xyXG5pbXBvcnQgeyBUaGVtZVByb3ZpZGVyIH0gZnJvbSAnLi90aGVtZVByb3ZpZGVyJztcclxuaW1wb3J0IHsgSU9ic2VydmVyLCBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vLi4vZnJhbWV3b3JrL2ludGVyZmFjZXMvb2JzZXJ2ZXInO1xyXG5pbXBvcnQgeyBXaWRnZXRzV2l0aERyb3BTdXBwb3J0UHJvdmlkZXIgfSBmcm9tICcuL3dpZGdldHNXaXRoRHJvcFN1cHBvcnRQcm92aWRlcic7XHJcbmltcG9ydCB7IElEcm9wcGFibGUgfSBmcm9tICcuL2ludGVyZmFjZXMvZHJvcEludGVyZmFjZSc7XHJcbmltcG9ydCB7IERyYWdEcm9wRGF0YU9iamVjdCB9IGZyb20gJy4vZHJhZ0RhdGFPYmplY3QnO1xyXG5pbXBvcnQgeyBJVmlldyB9IGZyb20gJy4vaW50ZXJmYWNlcy92aWV3SW50ZXJmYWNlJztcclxuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICcuLi8uLi9mcmFtZXdvcmsvc3RvcmUnO1xyXG5pbXBvcnQgeyBEcmFnRHJvcFJlcHJlc2VudGF0aW9uIH0gZnJvbSAnLi9kcmFnRHJvcFJlcHJlc2VudGF0aW9uJztcclxuaW1wb3J0IHsgSW1hZ2VQcm92aWRlciB9IGZyb20gJy4vaW1hZ2VQcm92aWRlcic7XHJcbmltcG9ydCB7IERyYWdEcm9wQXJncyB9IGZyb20gJy4vZHJhZ0Ryb3BBcmdzJztcclxuaW1wb3J0IHsgUGVyc2lzdERhdGFQcm92aWRlciB9IGZyb20gJy4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9wZXJzaXN0RGF0YVByb3ZpZGVyJztcclxuaW1wb3J0IHsgSUxheW91dFdpZGdldCB9IGZyb20gJy4vaW50ZXJmYWNlcy9sYXlvdXRXaWRnZXRJbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBDb21wb25lbnRCYXNlIH0gZnJvbSAnLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50QmFzZSc7XHJcbmltcG9ydCB7IENvbXBvbmVudEZhY3RvcnkgfSBmcm9tICcuLi8uLi9jb21tb24vY29tcG9uZW50RmFjdG9yeS9jb21wb25lbnRGYWN0b3J5JztcclxuaW1wb3J0IHsgQ29tcG9uZW50QmluZGluZ3MgfSBmcm9tICcuLi8uLi9mcmFtZXdvcmsvY29tcG9uZW50SHViL2JpbmRpbmdzL2NvbXBvbmVudEJpbmRpbmdzJztcclxuaW1wb3J0IHsgQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tICcuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnRTZXR0aW5ncyc7XHJcbmltcG9ydCB7IElDb21wb25lbnQgfSBmcm9tICcuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9pbnRlcmZhY2VzL2NvbXBvbmVudEludGVyZmFjZSc7XHJcblxyXG5hYnN0cmFjdCBjbGFzcyBXaWRnZXRCYXNlIGltcGxlbWVudHMgSVdpZGdldCwgSU9ic2VydmVyLCBJQ29tcG9uZW50e1xyXG4gICAgICAgXHJcbiAgICBwcm90ZWN0ZWQgX3N0YXRlczpTdG9yZSA9IG5ldyBTdG9yZSgpO1xyXG4gICAgcHJvdGVjdGVkIF9kYXRhTW9kZWw6IElEYXRhTW9kZWw7XHJcbiAgICBwcm90ZWN0ZWQgX3dpZGdldHM6IE1hcDxzdHJpbmcsIElXaWRnZXQ+ID0gbmV3IE1hcDxzdHJpbmcsIElXaWRnZXQ+KCk7XHJcbiAgICBwcml2YXRlIF92aWV3OklWaWV3fHVuZGVmaW5lZDtcclxuICAgICAgIFxyXG4gICAgcHJvdGVjdGVkIF9sYXlvdXRXaWRnZXQ6IElMYXlvdXRXaWRnZXR8dW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfY3VycmVudFdpZGdldDtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFdpZGdldFNldHRpbmdJZCA9IFwid2lkZ2V0XCI7XHJcbiAgICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBob2xkcyB0aGUgaWQgKGUuZy4gXCJNeUlkXCIpXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIHBhcmVudENvbnRlbnRJZDogc3RyaW5nID0gXCJcIjtcclxuICAgIGJ1c3lTY3JlZW5JZCA9IFwiXCI7XHJcbiAgICBcclxuICAgIGZsYWdnZWRGb3JSZXNpemU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHdpZGdldE5hbWU6IHN0cmluZyA9IFwiXCJcclxuXHJcbiAgICBwcm90ZWN0ZWQgX2FjdHVhbFdpZHRoOiBudW1iZXIgPSAwO1xyXG4gICAgcHJvdGVjdGVkIF9hY3R1YWxIZWlnaHQ6IG51bWJlciA9IDA7XHJcblxyXG4gICAgcHJpdmF0ZSBfYnVzeUluZm9ybWF0aW9uOiBCdXN5SW5mb3JtYXRpb24gPSBuZXcgQnVzeUluZm9ybWF0aW9uKCk7XHJcblxyXG4gICAgcHJpdmF0ZSBfbW9kZWxDaGFuZ2VkSGFuZGxlciA9IChzZW5kZXIsIGRhdGEpID0+IHsgdGhpcy5oYW5kbGVNb2RlbENoYW5nZWQoc2VuZGVyLCBkYXRhKTsgfTtcclxuICAgIHByaXZhdGUgX21vZGVsSXRlbXNDaGFuZ2VkSGFuZGxlciA9IChzZW5kZXIsIGRhdGEpID0+IHsgdGhpcy5oYW5kbGVNb2RlbEl0ZW1zQ2hhbmdlZChzZW5kZXIsIGRhdGEpOyB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbXBvbmVudCBvZiB0aGlzIHdpZGdldChob2xkcyB0aGUgc2V0dGluZ3MgZm9yIHBlcnNpc3RpbmcpXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge0NvbXBvbmVudEJhc2V9XHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29tcG9uZW50OiBDb21wb25lbnRCYXNlID0gbmV3IENvbXBvbmVudEJhc2UoQ29tcG9uZW50RmFjdG9yeS5nZXRJbnN0YW5jZSgpLCB0aGlzKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgV2lkZ2V0QmFzZVxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5fZGF0YU1vZGVsID0gbmV3IE51bGxEYXRhTW9kZWwoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdmlldygpIDogSVZpZXd8dW5kZWZpbmVkIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdmlldztcclxuICAgIH1cclxuICAgIFxyXG4gICAgXHJcbiAgICBzZXQgdmlldyh2aWV3IDogSVZpZXd8dW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5fdmlldyA9IHZpZXc7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBnZXQgc3RhdGVzKCkgOiBTdG9yZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZpZXcgPyB0aGlzLl92aWV3LnN0YXRlcyA6IHRoaXMuX3N0YXRlcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGNzcyBpZCAoZS5nLiBcIiNNeUlkXCIpXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgZ2V0IGNzc1BhcmVudENvbnRlbnRJZCgpOiBzdHJpbmd7XHJcbiAgICAgICAgaWYodGhpcy5wYXJlbnRDb250ZW50SWQgIT0gXCJcIil7XHJcbiAgICAgICAgICAgIHJldHVybiBcIiNcIiArIHRoaXMucGFyZW50Q29udGVudElkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBjdXJyZW50IHdpZHRoIG9mIHRoZSB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBnZXQgd2lkdGgoKTogbnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hY3R1YWxXaWR0aDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGN1cnJlbnQgaGVpZ2h0IG9mIHRoZSB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBnZXQgaGVpZ2h0KCk6IG51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5fYWN0dWFsSGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6ZXMgdGhlIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYXlvdXRDb250YWluZXJJZFxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgaW5pdGlhbGl6ZShsYXlvdXRDb250YWluZXJJZDogc3RyaW5nKSB7XHJcbiAgICAgICAgLy8gR2V0IHRoZSBsYXlvdXQgY29udGVudFxyXG4gICAgICAgIHRoaXMucGFyZW50Q29udGVudElkID0gbGF5b3V0Q29udGFpbmVySWQ7XHJcbiAgICAgICAgdGhpcy5sb2FkU3R5bGVzKCk7XHJcblxyXG4gICAgICAgIHRoaXMuY3JlYXRlTGF5b3V0KCk7XHJcbiAgICAgICAgdGhpcy5hdHRhY2hMYXlvdXRUb1ZpZXcoKTtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0aWFsaXplQ29tcG9uZW50KCk7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkRGVmYXVsdENvbXBvbmVudFNldHRpbmdzKCk7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkQWRkaXRpb25hbERlZmF1bHRDb21wb25lbnRTZXR0aW5ncygpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmxvYWRDb21wb25lbnRTZXR0aW5ncygpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuc2V0QmluZGluZ3NEYXRhKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgdGhlIGRlZmF1bHQgY29tcG9uZW50IHNldHRpbmdzIHRvIHRoZSBwcm92aWRlclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZERlZmF1bHRDb21wb25lbnRTZXR0aW5ncygpe1xyXG4gICAgICAgIC8vIElzIGEgZGVmYXVsdCBwZXJzaXN0aW5nIGRhdGEgaWQgZGVmaW5pZWRcclxuICAgICAgICBpZih0aGlzLmdldERlZmF1bHRDb21wb25lbnRTZXR0aW5nc0RhdGFJZCgpICE9IFwiXCIpe1xyXG4gICAgICAgICAgICAvLyBJcyBzb21lIGRlZmF1bHQgcGVyc2lzdGluZyBkYXRhIGRlZmluZWRcclxuICAgICAgICAgICAgbGV0IGRlZmF1bHRDb21wb25lbnRTZXR0aW5ncyA9IHRoaXMuZ2V0RGVmYXVsdENvbXBvbmVudFNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgIGlmKGRlZmF1bHRDb21wb25lbnRTZXR0aW5ncyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgLy8gQWRkIGRlZmF1bHQgcGVyc2lzdGluZyBkZWZpbml0aW9uIHRvIHRoZSBkZWZhdWx0IHBlcnNpc3RpbmcgZGF0YSBwcm92aWRlclxyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGREZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NUb1Byb3ZpZGVyKHRoaXMuZ2V0RGVmYXVsdENvbXBvbmVudFNldHRpbmdzRGF0YUlkKCksIGRlZmF1bHRDb21wb25lbnRTZXR0aW5ncyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWluaXRpYWxpemVzIHRoZSBjaGFydFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIHJlaW5pdGlhbGl6ZSgpOnZvaWQge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogV2lsbCBiZSBjYWxsZWQgYWZ0ZXIgaW5pdGlhbGl6YXRpb24od2hlbiBsb2FkaW5nIHBlcnNpc3RpbmcgZGF0YSB3YXMgZG9uZSlcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBpbml0aWFsaXplZCgpOnZvaWQge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6ZSB0aGUgY29tcG9uZW50IHBhcnRzIGhlcmVcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBpbml0aWFsaXplQ29tcG9uZW50KCl7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSBpZCBmb3IgdGhlIGRlZmF1bHQgc2V0dGluZ3MgZGF0YSB3aGljaCBzaG91bGQgYmUgdXNlZCBpZiBubyBwZXJzaXN0aW5nIGRhdGEgaXMgYXZhaWxhYmxlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRlZmF1bHRTZXR0aW5nc0RhdGFJZFxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldERlZmF1bHRDb21wb25lbnRTZXR0aW5nc0RhdGFJZChkZWZhdWx0U2V0dGluZ3NEYXRhSWQ6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmRlZmF1bHRTZXR0aW5nc0RhdGFJZCA9IGRlZmF1bHRTZXR0aW5nc0RhdGFJZDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIGlkIG9mIHRoZSBkZWZhdWx0IHNldHRpbmdzIGRhdGEgd2hpY2ggc2hvdWxkIGJlIHVzZWQgaWYgbm8gcGVyc2lzdGluZyBkYXRhIGlzIGF2YWlsYWJsZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldERlZmF1bHRDb21wb25lbnRTZXR0aW5nc0RhdGFJZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb21wb25lbnQuZGVmYXVsdFNldHRpbmdzRGF0YUlkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBjb21wb25lbnQgc2V0dGluZ3MgZm9yIHRoaXMgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldERlZmF1bHRDb21wb25lbnRTZXR0aW5ncygpOiBDb21wb25lbnRTZXR0aW5nc3x1bmRlZmluZWR7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHJ1bnMgdGhlIHNldHRpbmdzIG9mIHRoaXMgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudFNldHRpbmdzfVxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldENvbXBvbmVudFNldHRpbmdzKCk6IENvbXBvbmVudFNldHRpbmdze1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbXBvbmVudC5nZXRDb21wb25lbnRTZXR0aW5ncygpO1xyXG4gICAgfVxyXG4gXHJcbiAgICAgLyoqXHJcbiAgICAgICogU2V0cyBzZXR0aW5ncyB0byB0aGlzIGNvbXBvbmVudFxyXG4gICAgICAqXHJcbiAgICAgICogQHBhcmFtIHsoQ29tcG9uZW50U2V0dGluZ3N8dW5kZWZpbmVkKX0gc2V0dGluZ3NcclxuICAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICAqL1xyXG4gICAgcHVibGljIHNldENvbXBvbmVudFNldHRpbmdzKHNldHRpbmdzOiBDb21wb25lbnRTZXR0aW5nc3x1bmRlZmluZWQpe1xyXG4gICAgICAgIGlmKHNldHRpbmdzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIFNldCBjb21wb25lbnRTZXR0aW5nc1xyXG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5zZXRDb21wb25lbnRTZXR0aW5ncyhzZXR0aW5ncyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyB0aGUgZ2l2ZW4gZGVmYXVsdCBjb21wb25lbnQgc2V0dGluZ3MgdG8gdGhlIGRlZmF1bHQgcGVyc2lzdGluZyBkYXRhIHByb3ZpZGVyKFRPRE86IHNob3VsZCBiZSBhIHNlcGVyYXRlZCBkZWZhdWx0IGNvbXBvbmVudFNldHRpbmdzIHByb3ZpZGVyKVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGREZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NUb1Byb3ZpZGVyKGlkOiBzdHJpbmcsIHNldHRpbmdzOiBDb21wb25lbnRTZXR0aW5ncyl7XHJcbiAgICAgICAgaWYoc2V0dGluZ3MgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIk5vIGRlZmF1bHQgcGVyc2lzdGluZyBkYXRhIGF2YWlsYWJsZSBmb3IgaWQ6IFwiICsgaWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBQZXJzaXN0RGF0YVByb3ZpZGVyLmdldEluc3RhbmNlKCkuc2V0RGVmYXVsdERhdGFXaXRoSWQoaWQsIHNldHRpbmdzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIHNvbWUgYWRkaXRpb25hbCBkZWZhdWx0IGNvbXBvbmVudCBzZXR0aW5ncyhlLmcuIHNvbWUgc3BsaXR0ZXIgZGVmaW5pdGlvbnMsIC4uLilcclxuICAgICAqIFVzZSBhZGREZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NUb1Byb3ZpZGVyKGlkLCBkYXRhKSB0byBhZGRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkQWRkaXRpb25hbERlZmF1bHRDb21wb25lbnRTZXR0aW5ncygpe1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJvdGVjdGVkIGF0dGFjaExheW91dFRvVmlldyhwYXJlbnRWaWV3OklWaWV3fHVuZGVmaW5lZCA9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGxldCB2aWV3ID0gcGFyZW50VmlldyA/IHBhcmVudFZpZXcgOiB0aGlzLl92aWV3O1xyXG5cclxuICAgICAgICBpZiAodmlldyAmJiB0aGlzLl9sYXlvdXRXaWRnZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0LnZpZXcgPSB2aWV3O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIGxheW91dCBvZiB0aGUgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgY3JlYXRlTGF5b3V0KCl7XHJcblxyXG4gICAgfVxyXG4gICAgICAgXHJcbiAgICAvKipcclxuICAgICAqIExvYWQgc3R5bGVzIGZvciBXaWRnZXRCYXNlXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgbG9hZFN0eWxlcygpe1xyXG4gICAgICAgIC8vdGhpcy5zdHlsZUxvYWRlZCh1bmRlZmluZWQpO1xyXG4gICAgfTtcclxuXHJcbiAgICBhZGRTdHlsZShmaWxlUGF0aDogc3RyaW5nKXtcclxuICAgICAgICBsZXQgdGhlbWVkRmlsZVBhdGggPSB0aGlzLmdldFRoZW1lZEZpbGVQYXRoKGZpbGVQYXRoKTtcclxuICAgICAgICAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKS5hcHBlbmQoJzxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiJyArIHRoZW1lZEZpbGVQYXRoICsgJ1wiIHR5cGU9XCJ0ZXh0L2Nzc1wiIC8+Jyk7XHJcbiAgICAgICAgLyp2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcclxuICAgICAgICBsaW5rLnR5cGUgPSAndGV4dC9jc3MnO1xyXG4gICAgICAgIGxpbmsucmVsID0gJ3N0eWxlc2hlZXQnO1xyXG4gICAgICAgIGxpbmsuaHJlZiA9IGZpbGVQYXRoO1xyXG4gICAgICAgICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpLmFwcGVuZChsaW5rKTsqL1xyXG4gICAgICAgIC8vdGhpcy5sb2FkQ3NzKCQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpLCBmaWxlUGF0aCwgKGxpbmspID0+e3RoaXMuc3R5bGVMb2FkZWQobGluayl9KTtcclxuICAgIH07XHJcblxyXG4gICAgYWRkU3R5bGVUb0NvbnRlbnRJZChwYXJlbnRDb250ZW50SWQ6IHN0cmluZywgZmlsZVBhdGg6IHN0cmluZyl7XHJcbiAgICAgICAgbGV0IHRoZW1lZEZpbGVQYXRoID0gdGhpcy5nZXRUaGVtZWRGaWxlUGF0aChmaWxlUGF0aCk7XHJcbiAgICAgICAgJChwYXJlbnRDb250ZW50SWQpLmFwcGVuZCgnPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCInICsgdGhlbWVkRmlsZVBhdGggKyAnXCIgdHlwZT1cInRleHQvY3NzXCIgLz4nKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRUaGVtZWRGaWxlUGF0aChmaWxlUGF0aDogc3RyaW5nKTogc3RyaW5ne1xyXG4gICAgICAgIGxldCB0aGVtZVByb3ZpZGVyID0gVGhlbWVQcm92aWRlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIHJldHVybiB0aGVtZVByb3ZpZGVyLmdldFRoZW1lZEZpbGVQYXRoKGZpbGVQYXRoKTtcclxuICAgIH1cclxuXHJcbi8vI3JlZ2lvbiBEcm9wIHN1cHBvcnRcclxuICAgIHByaXZhdGUgX3N1cHBvcnRlZERyYWdEcm9wRGF0YUlkcyA9IG5ldyBBcnJheTxzdHJpbmc+KCk7IC8vZS5nLiBTaWduYWwsIC4uXHJcbiAgICBwdWJsaWMgZ2V0IHN1cHBvcnRlZERyYWdEcm9wRGF0YUlkcygpOiBBcnJheTxzdHJpbmc+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3VwcG9ydGVkRHJhZ0Ryb3BEYXRhSWRzO1xyXG4gICAgfVxyXG4gICAgICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIHRoZSBnaXZlbiBkcmFnZHJvcCBkYXRhIGlkIHRvIHRoaXMgd2lkZ2V0LCBhbmQgYWRkcyB0aGlzIHdpZGdldCB0byB0aGUgV2lkZ2V0c1dpdGhEcm9wU3VwcG9ydFByb3ZpZGVyIGlmIG5vdCBhbHJlYWR5IHRoZXJlXHJcbiAgICAgKiBDYW4gb25seSBiZSB1c2VkIGlmIHRoZSB3aWRnZXQgZGVyaXZlcyBmcm9tIElEcm9wcGFibGVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIGFkZFN1cHBvcnRlZERyYWdEcm9wRGF0YUlkKGlkOiBzdHJpbmcpIHtcclxuICAgICAgICBXaWRnZXRzV2l0aERyb3BTdXBwb3J0UHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5hZGRXaWRnZXQoPGFueT50aGlzIGFzIElEcm9wcGFibGUpO1xyXG4gICAgICAgIC8vIGNoZWNrIGlmIGFscmVhZHkgaW4gbGlzdFxyXG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuX3N1cHBvcnRlZERyYWdEcm9wRGF0YUlkcy5pbmRleE9mKGlkKTtcclxuICAgICAgICBpZihpbmRleCA9PSAtMSl7XHJcbiAgICAgICAgICAgIHRoaXMuX3N1cHBvcnRlZERyYWdEcm9wRGF0YUlkcy5wdXNoKGlkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIHRoZSBnaXZlbiBkcmFnZHJvcCBkYXRhIGlkIGZyb20gdGhpcyB3aWRnZXQsIGFuZCBpZiBpdCBpcyB0aGUgbGFzdCBkcmFnZHJvcCBkYXRhIGlkLCByZW1vdmVzIHRoZSB3aWRnZXQgZnJvbSB0aGUgV2lkZ2V0c1dpdGhEcm9wU3VwcG9ydFByb3ZpZGVyXHJcbiAgICAgKiBDYW4gb25seSBiZSB1c2VkIGlmIHRoZSB3aWRnZXQgZGVyaXZlcyBmcm9tIElEcm9wcGFibGVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZVN1cHBvcnRlZERyYWdEcm9wRGF0YUlkKGlkOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLl9zdXBwb3J0ZWREcmFnRHJvcERhdGFJZHMuaW5kZXhPZihpZCk7XHJcbiAgICAgICAgaWYoaW5kZXggIT0gLTEpe1xyXG4gICAgICAgICAgICB0aGlzLl9zdXBwb3J0ZWREcmFnRHJvcERhdGFJZHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5fc3VwcG9ydGVkRHJhZ0Ryb3BEYXRhSWRzLmxlbmd0aCA9PSAwKXtcclxuICAgICAgICAgICAgV2lkZ2V0c1dpdGhEcm9wU3VwcG9ydFByb3ZpZGVyLmdldEluc3RhbmNlKCkucmVtb3ZlV2lkZ2V0KDxhbnk+dGhpcyBhcyBJRHJvcHBhYmxlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbi8vI2VuZHJlZ2lvblxyXG4gICAgXHJcbi8vI3JlZ2lvbiBkcmFnIHN1cHBvcnRcclxuICAgIHByaXZhdGUgX2Ryb3BQb3NzaWJsZSA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfZHJhZ2dpbmdTdXBwb3J0QWN0aXZlID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9kcmFnZ2luZ0NvbnRhaW5lcjtcclxuICAgIHByaXZhdGUgX2RyYWdEYXRhT2JqZWN0ITogRHJhZ0Ryb3BEYXRhT2JqZWN0O1xyXG4gICAgcHJpdmF0ZSBfZHJhZ1N5bWJvbDtcclxuICAgIHByaXZhdGUgX2RlZmF1bHREcmFnUmVwcmVzZW50YXRpb24hOiBEcmFnRHJvcFJlcHJlc2VudGF0aW9uO1xyXG4gICAgcHJpdmF0ZSBfZGVmYXVsdERyb3BOb3RQb3NzaWJsZVJlcHJlc2VudGF0aW9uID0gSW1hZ2VQcm92aWRlci5nZXRJbnN0YW5jZSgpLmdldEltYWdlKFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9kcmFnRHJvcC9kcm9wTm90UG9zc2libGUuc3ZnXCIpO1xyXG4gICAgXHJcblx0LyoqXHJcbiAgICAgKiBBZGRzIGRyYWdnaW5nIHN1cHBvcnQgdG8gdGhpcyB3aWRnZXQ7IHZpYSBJRHJhZ2dhYmxlIHRoZSB3aWRnZXQgY2FuIHByb3ZpZGUgdGhlIGluZm9ybWF0aW9uIHdoaWNoIG9iamVjdCBzaG91bGQgYmUgZHJhZ2dlZFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGREcmFnZ2luZ1N1cHBvcnQoKXtcclxuICAgICAgICBpZih0aGlzLnBhcmVudENvbnRlbnRJZCA9PSBcIlwiKXtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcInBhcmVudENvbnRlbnRJZCBub3Qgc2V0IGZvciBkcmFnZ2FibGUgc3VwcG9ydFwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fZHJhZ2dpbmdTdXBwb3J0QWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9kcmFnZ2luZ0NvbnRhaW5lciA9ICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpO1xyXG5cclxuICAgICAgICB0aGlzLl9kcmFnZ2luZ0NvbnRhaW5lci5lakRyYWdnYWJsZSh7XHJcbiAgICAgICAgICAgIGRpc3RhbmNlOiAxMCxcclxuXHJcbiAgICAgICAgICAgIGhlbHBlcjogKGFyZ3MpID0+IHRoaXMuZHJhZ2dpbmdIZWxwZXIoYXJncyksXHJcbiAgICAgICAgICAgIGRyYWdTdGFydDogKGFyZ3MpID0+IHRoaXMuZHJhZ2dpbmdTdGFydChhcmdzKSxcclxuICAgICAgICAgICAgZHJhZ1N0b3A6IChhcmdzKSA9PiB0aGlzLmRyYWdnaW5nU3RvcChhcmdzKSxcclxuICAgICAgICAgICAgZGVzdHJveTogKGFyZ3MpID0+IHRoaXMuZHJhZ2dpbmdEZXN0cm95KGFyZ3MpLFxyXG4gICAgICAgICAgICBkcmFnOiAoYXJncykgPT4gdGhpcy5kcmFnZ2luZ0RyYWcoYXJncyksXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIGRyYWdnaW5nIHN1cHBvcnQgZnJvbSB0aGlzIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZW1vdmVEcmFnZ2luZ1N1cHBvcnQoKXtcclxuICAgICAgICB0aGlzLl9kcmFnZ2luZ1N1cHBvcnRBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB2YXIgZWpEcmFnZ2FibGVPYmogPSB0aGlzLl9kcmFnZ2luZ0NvbnRhaW5lci5kYXRhKFwiZWpEcmFnZ2FibGVcIik7XHJcbiAgICAgICAgaWYoZWpEcmFnZ2FibGVPYmogIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgZWpEcmFnZ2FibGVPYmouZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBXaWxsIGJlIGNhbGxlZCBhdCB0aGUgZW5kIG9mIGEgZHJhZyZkcm9wIG9wZXJhdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZHJhZ2dpbmdEZXN0cm95KGFyZ3Mpe1xyXG4gICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSB0ZW1wb3JhcnkgZHJhZyBvYmplY3QgZm9yIHRoZSBkcmFnICYgZHJvcCBvcGVyYXRpb24gYW5kIGFkZHMgaXQgdG8gdGhlIGRvY3VtZW50IGJvZHlcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkcmFnZ2luZ0hlbHBlcihhcmdzKSB7XHJcbiAgICAgICAgdmFyIGVqRHJhZ2dhYmxlT2JqID0gdGhpcy5fZHJhZ2dpbmdDb250YWluZXIuZGF0YShcImVqRHJhZ2dhYmxlXCIpO1xyXG4gICAgICAgIGlmKGVqRHJhZ2dhYmxlT2JqICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIFNldCBkcmFnIG9iamVjdCBwb3NpdGlvbiAoX3JlbFlwb3NpdGlvbiBhbmQgX3JlbFhwb3NpdGlvbiBhcmUgdGhlIHBvc2l0aW9ucyB3aXRoaW4gdGhlIGRyYWdnYWJsZSBvYmplY3QpXHJcbiAgICAgICAgICAgIGVqRHJhZ2dhYmxlT2JqLm9wdGlvbihcImN1cnNvckF0XCIsIHsgdG9wOiAoIGVqRHJhZ2dhYmxlT2JqLl9yZWxZcG9zaXRpb24qLTEpLTEwLCBsZWZ0OiAgZWpEcmFnZ2FibGVPYmouX3JlbFhwb3NpdGlvbiotMSB9LCB0cnVlKVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBHZXQgdGhlIGluZm9ybWF0aW9uIG9mIHRoZSBkcmFnIG9iamVjdCBmcm9tIHdpZGdldFxyXG4gICAgICAgIGxldCBkcmFnRGF0YU9iamVjdCA9IHRoaXMuc3RhcnREcmFnZ2luZygpO1xyXG4gICAgICAgIGlmKGRyYWdEYXRhT2JqZWN0ID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9kcmFnRGF0YU9iamVjdCA9IGRyYWdEYXRhT2JqZWN0O1xyXG5cclxuICAgICAgICB0aGlzLl9kZWZhdWx0RHJhZ1JlcHJlc2VudGF0aW9uID0gdGhpcy5fZHJhZ0RhdGFPYmplY3QucmVwcmVzZW50YXRpb247XHJcbiAgICAgICAgdGhpcy5fZHJhZ1N5bWJvbCA9ICQoJzxwcmU+JykuaHRtbCh0aGlzLl9kZWZhdWx0RHJvcE5vdFBvc3NpYmxlUmVwcmVzZW50YXRpb24pO1xyXG5cclxuICAgICAgICAvLyBBZGRzIHRoZSBjdXJyZW50IGRhdGEgdG8gdGhlIGRyYWcgZGF0YVxyXG4gICAgICAgIHRoaXMuc2V0RHJhZ0RhdGEoYXJncywgdGhpcy5fZHJhZ0RhdGFPYmplY3QuZGF0YSlcclxuXHJcbiAgICAgICAgdGhpcy5fZHJhZ1N5bWJvbC5hcHBlbmRUbyhkb2N1bWVudC5ib2R5KTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZHJhZ1N5bWJvbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFdpbGwgYmUgY2FsbGVkIGF0IHRoZSBiZWdpbm5pbmcgb2YgYSBkcmFnJmRyb3Agb3BlcmF0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHJldHVybnMgeyhEcmFnRHJvcERhdGFPYmplY3R8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBzdGFydERyYWdnaW5nKCk6RHJhZ0Ryb3BEYXRhT2JqZWN0fHVuZGVmaW5lZHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogV2lsbCBiZSBjYWxsZWQgYWZ0ZXIgdGhlIGRyb3BcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZHJhZ2dpbmdTdG9wcGVkKCl7XHJcblxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgdGhlIHRlbXBvcmFyeSBkcmFnIG9iamVjdCBhZnRlciBkcmFnICYgZHJvcCBvcGVyYXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZW1vdmVEcmFnT2JqZWN0RnJvbURvY3VtZW50KCkgeyAgICBcclxuICAgICAgICBmb3IobGV0IGkgPSBkb2N1bWVudC5ib2R5LmNoaWxkTm9kZXMubGVuZ3RoLTE7IGkgPj0gMDsgaS0tKXtcclxuICAgICAgICAgICAgaWYoZG9jdW1lbnQuYm9keS5jaGlsZE5vZGVzW2ldLm5vZGVOYW1lID09IFwiUFJFXCIpe1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jaGlsZE5vZGVzW2ldLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFdpbGwgYmUgY2FsbGVkIGF0IHN0YXJ0IGRyYWdnaW5nXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZHJhZ2dpbmdTdGFydChhcmdzKSB7XHJcbiAgICAgICAgbGV0IGRyYWdEYXRhID0gdGhpcy5nZXREcmFnRGF0YShhcmdzKTtcclxuICAgICAgICBpZihkcmFnRGF0YSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAvLyBJbmZvcm0gb25seSB3aWRnZXRzIHdpdGggZHJvcCBzdXBwb3J0IGZvciB0aGUgZ2l2ZW4gZHJhZ0Ryb3BEYXRhSWRcclxuICAgICAgICAgICAgV2lkZ2V0c1dpdGhEcm9wU3VwcG9ydFByb3ZpZGVyLmdldEluc3RhbmNlKCkuZ2V0V2lkZ2V0c1dpdGhEcmFnRHJvcERhdGFJZCh0aGlzLl9kcmFnRGF0YU9iamVjdC5pZCkuZm9yRWFjaCh3aWRnZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gY2FsbCBkcmFnU3RhcnRcclxuICAgICAgICAgICAgICAgIHdpZGdldC5kcmFnU3RhcnQobmV3IERyYWdEcm9wQXJncyhhcmdzLmN1cnJlbnRUYXJnZXQsIGRyYWdEYXRhLCB0aGlzLl9kZWZhdWx0RHJhZ1JlcHJlc2VudGF0aW9uKSk7XHJcbiAgICAgICAgICAgIH0pOyAgXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgYXJncy5jYW5jZWwgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogV2lsbCBiZSBjYWxsZWQgd2hpbGUgZHJhZ2dpbmcgaXMgYWN0aXZlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkcmFnZ2luZ0RyYWcoYXJncykge1xyXG4gICAgICAgIHRoaXMuX2Ryb3BQb3NzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBjdXJyZW50RHJhZ0Ryb3BFbGVtZW50ID0gdGhpcy5fZGVmYXVsdERyYWdSZXByZXNlbnRhdGlvbi5jbG9uZSgpO1xyXG4gICAgICAgIGxldCBkcmFnRGF0YSA9IHRoaXMuZ2V0RHJhZ0RhdGEoYXJncyk7XHJcbiAgICAgICAgaWYoZHJhZ0RhdGEgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgbGV0IG5ld1dpZGdldDogSURyb3BwYWJsZXx1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIGlmKGFyZ3MuY3VycmVudFRhcmdldCAhPSB1bmRlZmluZWQpeyAvLyB1bmRlZmluZWQgaWYgb3V0IG9mIGJyb3dzZXIgd2luZG93XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIEluZm9ybSBvbmx5IHdpZGdldHMgd2l0aCBkcm9wIHN1cHBvcnQgZm9yIHRoZSBnaXZlbiBkcmFnRHJvcERhdGFJZFxyXG4gICAgICAgICAgICAgICAgV2lkZ2V0c1dpdGhEcm9wU3VwcG9ydFByb3ZpZGVyLmdldEluc3RhbmNlKCkuZ2V0V2lkZ2V0c1dpdGhEcmFnRHJvcERhdGFJZCh0aGlzLl9kcmFnRGF0YU9iamVjdC5pZCkuZm9yRWFjaCh3aWRnZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIE9ubHkgd2lkZ2V0IHdpdGggY3VycmVudFRhcmdldChkaXZJZCkgYXMgcGFyZW50IHNob3VsZCBiZSBpbmZvcm1lZFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNFbGVtZW50V2l0aGluV2lkZ2V0KGFyZ3MuY3VycmVudFRhcmdldCwgKDxhbnk+d2lkZ2V0KS5jc3NQYXJlbnRDb250ZW50SWQpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3V2lkZ2V0ID0gd2lkZ2V0O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2FsbCBkcmFnT3ZlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZHJhZ0Ryb3BBcmdzID0gbmV3IERyYWdEcm9wQXJncyhhcmdzLmN1cnJlbnRUYXJnZXQsIGRyYWdEYXRhLCBjdXJyZW50RHJhZ0Ryb3BFbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRyYWdPdmVyUG9zc2libGUgPSB3aWRnZXQuZHJhZ092ZXIoZHJhZ0Ryb3BBcmdzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZHJhZ092ZXJQb3NzaWJsZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9kcm9wUG9zc2libGUgPSBkcmFnT3ZlclBvc3NpYmxlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gICBcclxuICAgICAgICAgICAgaWYobmV3V2lkZ2V0ICE9IHRoaXMuX2N1cnJlbnRXaWRnZXQpe1xyXG4gICAgICAgICAgICAgICAgLy8gRHJhZ092ZXIgY2hhbmdlZCBmcm9tIG9uZSB3aWRnZXQgdG8gYW4gb3RoZXJcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuX2N1cnJlbnRXaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50V2lkZ2V0LmRyb3BGb2N1c0xvc3QoYXJncyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50V2lkZ2V0ID0gbmV3V2lkZ2V0O1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0gICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLl9kcm9wUG9zc2libGUpe1xyXG4gICAgICAgICAgICB0aGlzLl9kcmFnU3ltYm9sWzBdLmlubmVySFRNTCA9IGN1cnJlbnREcmFnRHJvcEVsZW1lbnQuZ2V0RHJhZ0Ryb3BFbGVtZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX2RyYWdTeW1ib2xbMF0uaW5uZXJIVE1MID0gdGhpcy5fZGVmYXVsdERyb3BOb3RQb3NzaWJsZVJlcHJlc2VudGF0aW9uO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFdpbGwgYmUgY2FsbGVkIHdoZW4gZHJhZ2dpbmcgd2FzIHN0b3BwZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRyYWdnaW5nU3RvcChhcmdzKSB7XHJcbiAgICAgICAgbGV0IGRyYWdEYXRhID0gdGhpcy5nZXREcmFnRGF0YShhcmdzKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5fZHJvcFBvc3NpYmxlKXtcclxuICAgICAgICAgICAgaWYoYXJncy5jdXJyZW50VGFyZ2V0ICE9IHVuZGVmaW5lZCApeyAgLy8gdW5kZWZpbmVkIGlmIG91dCBvZiBicm93c2VyIHdpbmRvd1xyXG4gICAgICAgICAgICAgICAgLy8gSW5mb3JtIG9ubHkgd2lkZ2V0cyB3aXRoIGRyb3Agc3VwcG9ydCBmb3IgdGhlIGdpdmVuIGRyYWdEcm9wRGF0YUlkXHJcbiAgICAgICAgICAgICAgICBXaWRnZXRzV2l0aERyb3BTdXBwb3J0UHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXRXaWRnZXRzV2l0aERyYWdEcm9wRGF0YUlkKHRoaXMuX2RyYWdEYXRhT2JqZWN0LmlkKS5mb3JFYWNoKHdpZGdldCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gT25seSB3aWRnZXQgd2l0aCBjdXJyZW50VGFyZ2V0KGRpdklkKSBhcyBwYXJlbnQgc2hvdWxkIGJlIGluZm9ybWVkXHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5pc0VsZW1lbnRXaXRoaW5XaWRnZXQoYXJncy5jdXJyZW50VGFyZ2V0LCAoPGFueT53aWRnZXQpLmNzc1BhcmVudENvbnRlbnRJZCkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjYWxsIGRyb3BcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LmRyb3AobmV3IERyYWdEcm9wQXJncyhhcmdzLmN1cnJlbnRUYXJnZXQsIGRyYWdEYXRhKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEluZm9ybSBvbmx5IHdpZGdldHMgd2l0aCBkcm9wIHN1cHBvcnQgZm9yIHRoZSBnaXZlbiBkcmFnRHJvcERhdGFJZFxyXG4gICAgICAgIFdpZGdldHNXaXRoRHJvcFN1cHBvcnRQcm92aWRlci5nZXRJbnN0YW5jZSgpLmdldFdpZGdldHNXaXRoRHJhZ0Ryb3BEYXRhSWQodGhpcy5fZHJhZ0RhdGFPYmplY3QuaWQpLmZvckVhY2god2lkZ2V0ID0+IHtcclxuICAgICAgICAgICAgLy8gY2FsbCBkcmFnU3RvcFxyXG4gICAgICAgICAgICB3aWRnZXQuZHJhZ1N0b3AobmV3IERyYWdEcm9wQXJncyhhcmdzLmN1cnJlbnRUYXJnZXQsIGRyYWdEYXRhKSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuZHJhZ2dpbmdTdG9wcGVkKCk7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVEcmFnT2JqZWN0RnJvbURvY3VtZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXREcmFnRGF0YShhcmdzOiBhbnkpOiBhbnl7XHJcbiAgICAgICAgcmV0dXJuIGFyZ3MuZWxlbWVudC5kYXRhKHRoaXMuX2RyYWdEYXRhT2JqZWN0LmlkKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldERyYWdEYXRhKGFyZ3M6IGFueSwgZGF0YTogYW55KXtcclxuICAgICAgICBhcmdzLmVsZW1lbnQuZGF0YSh0aGlzLl9kcmFnRGF0YU9iamVjdC5pZCwgZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVjayBpZiBhbiBlbGVtZW50IGlzIGEgY2hpbGQgb2YgdGhlIGdpdmVuIHBhcmVudCBpZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGVsZW1lbnRcclxuICAgICAqIEBwYXJhbSB7Kn0gcGFyZW50SWRcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgaXNFbGVtZW50V2l0aGluV2lkZ2V0KGVsZW1lbnQsIHBhcmVudElkKXtcclxuICAgICAgICBsZXQgcGFyZW50ID0gZWxlbWVudC5jbG9zZXN0KHBhcmVudElkKTtcclxuICAgICAgICBpZihwYXJlbnQgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgd2lkZ2V0IGZvciB0aGUgZ2l2ZW4gaWQgaWYgZm91bmQsIGVsc2UgdW5kZWZpbmVkXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkIHRoZSB3aWRnZXQgaWRcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgLypwdWJsaWMgZ2V0V2lkZ2V0QnlJZChpZDogc3RyaW5nLCByZWN1cnNpdmU6IGJvb2xlYW4gPSBmYWxzZSk6IElXaWRnZXR8dW5kZWZpbmVke1xyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLl93aWRnZXRzKSB7XHJcbiAgICAgICAgICAgIGxldCBmb3VuZFdpZGdldDogSVdpZGdldHx1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIGxldCB3aWRnZXQgPSB0aGlzLl93aWRnZXRzW2tleV07XHJcbiAgICAgICAgICAgIGlmKHdpZGdldC5pZCA9PSBpZCl7XHJcbiAgICAgICAgICAgICAgICBmb3VuZFdpZGdldCA9IHdpZGdldDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgaWYocmVjdXJzaXZlID09IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmb3VuZENoaWxkV2lkZ2V0ID0gd2lkZ2V0LmdldFdpZGdldEJ5SWQoaWQsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGZvdW5kQ2hpbGRXaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm91bmRXaWRnZXQgPSBmb3VuZENoaWxkV2lkZ2V0O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihmb3VuZFdpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvdW5kV2lkZ2V0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWRcclxuICAgIH0qL1xyXG5cclxuXHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuXHJcbiAgICAvKnByaXZhdGUgc3R5bGVMb2FkZWQobGluayl7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsb2FkQ3NzKGVsZW1lbnQsIHVybCwgY2FsbGJhY2spe1xyXG4gICAgICAgIHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xyXG4gICAgICAgIGxpbmsudHlwZSA9ICd0ZXh0L2Nzcyc7XHJcbiAgICAgICAgbGluay5yZWwgPSAnc3R5bGVzaGVldCc7XHJcbiAgICAgICAgbGluay5ocmVmID0gdXJsO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGVsZW1lbnRbMF0uYXBwZW5kQ2hpbGQobGluayk7XHJcbiAgICBcclxuICAgICAgICB2YXIgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgICAgaW1nLm9uZXJyb3IgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZihjYWxsYmFjayl7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhsaW5rKTtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9XHJcbiAgICAgICAgaW1nLnNyYyA9IHVybDtcclxuICAgIH0qL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWN0aXZhdGUgdGhlIFdpZGdldEJhc2VcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBhY3RpdmF0ZSgpe1xyXG4gICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWFjdGl2YXRlIHRoZSBXaWRnZXRCYXNlXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgZGVhY3RpdmF0ZSgpe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc3Bvc2UgdGhlIFdpZGdldEJhc2VcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBkaXNwb3NlKCl7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuc2F2ZUNvbXBvbmVudFNldHRpbmdzKCk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuX2RyYWdnaW5nU3VwcG9ydEFjdGl2ZSA9PSB0cnVlKXtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVEcmFnZ2luZ1N1cHBvcnQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5fZGF0YU1vZGVsICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGFNb2RlbC5ldmVudE1vZGVsQ2hhbmdlZC5kZXRhY2godGhpcy5fbW9kZWxDaGFuZ2VkSGFuZGxlcik7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGFNb2RlbC5ldmVudE1vZGVsSXRlbXNDaGFuZ2VkLmRldGFjaCh0aGlzLl9tb2RlbEl0ZW1zQ2hhbmdlZEhhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gZGVsZXRlIGJpbmRpbmdzXHJcbiAgICAgICAgQ29tcG9uZW50QmluZGluZ3MudW5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgYnVzeSBzY3JlZW4gaW5mb3JtYXRpb24gd2hpY2ggd2lsbCBiZSBzaG93biB3aGVuIHRoZSBidXN5IGZsYWcgdHJ1ZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QnVzeUluZm9ybWF0aW9ufSBidXN5SW5mb3JtYXRpb25cclxuICAgICAqIEBtZW1iZXJvZiBXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIHNldEJ1c3lJbmZvcm1hdGlvbihidXN5SW5mb3JtYXRpb246IEJ1c3lJbmZvcm1hdGlvbil7XHJcbiAgICAgICAgdGhpcy5fYnVzeUluZm9ybWF0aW9uID0gYnVzeUluZm9ybWF0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSBidXN5IGZsYWcgb2YgdGhlIFdpZGdldEJhc2VcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGZsYWcgaWYgdHJ1ZSBidXN5IHNjcmVlbiB3aWxsIGJlIHNob3duXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBzZXRCdXN5KGZsYWc6IGJvb2xlYW4pe1xyXG4gICAgICAgIHRoaXMuYnVzeVNjcmVlbklkID0gdGhpcy5jc3NQYXJlbnRDb250ZW50SWQrXCJidXN5U2NyZWVuXCI7XHJcbiAgICAgICAgaWYoZmxhZyA9PSB0cnVlKXtcclxuICAgICAgICAgICAgbGV0IHN0cmlwcGVkSWQgPSB0aGlzLmJ1c3lTY3JlZW5JZC5yZXBsYWNlKFwiI1wiLFwiXCIpXHJcbiAgICAgICAgICAgIGxldCBodG1sID0gQ29tbW9uTGF5b3V0UHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXRCdXN5U2NyZWVuTGF5b3V0KHN0cmlwcGVkSWQsIHRoaXMuX2J1c3lJbmZvcm1hdGlvbik7XHJcbiAgICAgICAgICAgICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpLnBhcmVudCgpLmFwcGVuZChodG1sKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgJCh0aGlzLmJ1c3lTY3JlZW5JZCkucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVzaXplIHRoZSBXaWRnZXRCYXNlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0XHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICByZXNpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXQgZGF0YU1vZGVsKCk6SURhdGFNb2RlbHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YU1vZGVsO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBkYXRhTW9kZWwoZGF0YU1vZGVsOiBJRGF0YU1vZGVsKXtcclxuICAgICAgICAvLyBEZXRhY2ggZXZlbnRzIGZyb20gb2xkIGRhdGFNb2RlbFxyXG4gICAgICAgIHRoaXMuZGV0YWNoRGF0YU1vZGVsRXZlbnRzKCk7XHJcbiAgICAgICAgLy8gU2V0IG5ldyBkYXRhTW9kZWxcclxuICAgICAgICB0aGlzLl9kYXRhTW9kZWwgPSBkYXRhTW9kZWw7XHJcbiAgICAgICAgLy8gQXR0YWNoIGV2ZW50cyB0byBuZXcgZGF0YU1vZGVsXHJcbiAgICAgICAgdGhpcy5hdHRhY2hEYXRhTW9kZWxFdmVudHMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGF0dGFjaGVzIHRoZSBkYXRhIG1vZGVsIGV2ZW50c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGF0dGFjaERhdGFNb2RlbEV2ZW50cygpIHtcclxuICAgICAgICBpZih0aGlzLl9kYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YU1vZGVsLmV2ZW50TW9kZWxDaGFuZ2VkLmF0dGFjaCh0aGlzLl9tb2RlbENoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YU1vZGVsLmV2ZW50TW9kZWxJdGVtc0NoYW5nZWQuYXR0YWNoKHRoaXMuX21vZGVsSXRlbXNDaGFuZ2VkSGFuZGxlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIGRldGFjaGVzIHRoZSBkYXRhIG1vZGVsIGV2ZW50c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRldGFjaERhdGFNb2RlbEV2ZW50cygpIHtcclxuICAgICAgICBpZih0aGlzLl9kYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YU1vZGVsLmV2ZW50TW9kZWxDaGFuZ2VkLmRldGFjaCh0aGlzLl9tb2RlbENoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YU1vZGVsLmV2ZW50TW9kZWxJdGVtc0NoYW5nZWQuZGV0YWNoKHRoaXMuX21vZGVsSXRlbXNDaGFuZ2VkSGFuZGxlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBoYW5kbGVNb2RlbENoYW5nZWQoc2VuZGVyOiBhbnksIGRhdGE6IGFueSk6IGFueSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZU1vZGVsSXRlbXNDaGFuZ2VkKHNlbmRlcjogSURhdGFNb2RlbCwgZXZlbnRBcmdzOiBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25PYnNlcnZhYmxlc0NoYW5nZWQoY2hhbmdlZE9ic2VydmFibGVzOiBPYnNlcnZhYmxlW10pIHtcclxuIFxyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiB0aGUgY2xhc3MgaW1wbGVtZW50cyB0aGUgbnVsbCBvYmplY3QgZm9yIHRoZSBkYXRhIG1vZGVsLiBJdCBpcyBpbnRlbmRlZCB0byBiZSBzZXQgZm9yIHdpZGdldHMgd2l0aG91dCBhIHJlYWwgZGF0YSBtb2RlbFxyXG4gKlxyXG4gKiBAY2xhc3MgTnVsbERhdGFNb2RlbFxyXG4gKiBAaW1wbGVtZW50cyB7SURhdGFNb2RlbH1cclxuICovXHJcbmNsYXNzIE51bGxEYXRhTW9kZWwgaW1wbGVtZW50cyBJRGF0YU1vZGVse1xyXG5cclxuICAgIGV2ZW50TW9kZWxDaGFuZ2VkOiBFdmVudE1vZGVsQ2hhbmdlZCA9IG5ldyBFdmVudE1vZGVsQ2hhbmdlZDsgXHJcbiAgICBldmVudE1vZGVsSXRlbXNDaGFuZ2VkOiBFdmVudE1vZGVsSXRlbXNDaGFuZ2VkID0gbmV3IEV2ZW50TW9kZWxJdGVtc0NoYW5nZWQ7IFxyXG4gICAgICAgIFxyXG4gICAgcHVibGljIGNvbXBvbmVudDogQ29tcG9uZW50QmFzZSA9IG5ldyBDb21wb25lbnRCYXNlKENvbXBvbmVudEZhY3RvcnkuZ2V0SW5zdGFuY2UoKSwgdGhpcyk7XHJcblxyXG4gICAgb2JzZXJ2ZU1vZGVsSXRlbXMob2JzZXJ2YWJsZUl0ZW1zOiBhbnlbXSkge1xyXG5cclxuICAgIH1cclxuICAgIG9uTW9kZWxJdGVtc0NoYW5nZWQoc2VuZGVyOiBJRGF0YU1vZGVsLCBkYXRhOiBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MpIHtcclxuXHJcbiAgICB9XHJcbiAgICBoYW5kbGVNb2RlbEl0ZW1zQ2hhbmdlZChzZW5kZXI6IElEYXRhTW9kZWwsIGRhdGE6IEV2ZW50TW9kZWxDaGFuZ2VkQXJncykge1xyXG4gXHJcbiAgICB9XHJcblxyXG5cclxuICAgIGRhdGE6YW55IDsgICAgZGF0YVNvdXJjZTtcclxuICAgIGluaXRpYWxpemUoKTogdm9pZCB7XHJcbiBcclxuICAgIH1cclxuICAgIFxyXG4gICAgY2xlYXIoKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZGlzcG9zZSgpe1xyXG5cclxuICAgIH1cclxuICAgIGdldERlZmF1bHRTdG9yaW5nRGF0YSgpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q29tcG9uZW50U2V0dGluZ3MoKTogYW55IHtcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgc2V0Q29tcG9uZW50U2V0dGluZ3MoZGF0YTogYW55KSB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgY29ubmVjdCgpOiB2b2lkIHtcclxuICAgXHJcbiAgICB9XHJcbiAgICBvbk1vZGVsQ2hhbmdlZChzZW5kZXI6IElEYXRhTW9kZWwsIGRhdGE6IEV2ZW50TW9kZWxDaGFuZ2VkQXJncykge1xyXG4gXHJcbiAgICB9XHJcbiAgICBoYW5kbGVNb2RlbENoYW5nZWQoc2VuZGVyOiBJRGF0YU1vZGVsLCBkYXRhOiBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MpIHtcclxuICBcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtXaWRnZXRCYXNlfTsiXX0=