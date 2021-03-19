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
define(["require", "exports", "../common/layoutWidgetBase", "./layoutPane", "../common/viewTypeProvider", "../common/uniqueIdGenerator", "./splitterPaneDefinition", "./splitterDefinition", "../../common/componentFactory/componentFactory", "../../common/componentFactory/componentDefinition", "../common/widgetBase"], function (require, exports, layoutWidgetBase_1, layoutPane_1, viewTypeProvider_1, uniqueIdGenerator_1, splitterPaneDefinition_1, splitterDefinition_1, componentFactory_1, componentDefinition_1, widgetBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SplitterWidget = /** @class */ (function (_super) {
        __extends(SplitterWidget, _super);
        function SplitterWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // Set some default sizes
            _this._headerHeight = 0;
            _this._orientation = ej.Orientation.Horizontal;
            _this._isResponsive = true;
            _this._defaultSplitterSize = 9; // TODO get actual splitter size 
            return _this;
        }
        SplitterWidget.prototype.initialize = function (layoutContainerId, headerHeight) {
            if (headerHeight === void 0) { headerHeight = 0; }
            this._layoutContainerId = layoutContainerId;
            this._actualWidth = 1000;
            this._actualHeight = 400;
            this.layoutPanes = new Array();
            this._headerHeight = headerHeight;
            // Add additional divs 
            this._headerContainerId = layoutContainerId + "_header";
            this._mainContainerId = layoutContainerId + "_main";
            // Add header 
            if (headerHeight != 0) {
                $("#" + layoutContainerId).append("<div class='widgetHeader' id='" + this._headerContainerId + "' style='height: " + this._headerHeight + "px'></div>");
            }
            $("#" + layoutContainerId).append("<div id='" + this._mainContainerId + "'></div>");
            _super.prototype.initialize.call(this, this._mainContainerId);
        };
        SplitterWidget.prototype.initializeComponent = function () {
            this.component.disablePersisting();
        };
        SplitterWidget.prototype.setHeaderContent = function (content) {
            $("#" + this._headerContainerId)[0].innerHTML = content;
        };
        SplitterWidget.prototype.setOrientation = function (orientation) {
            if (orientation == splitterDefinition_1.SplitterDefinition.orientationVertical) {
                this._orientation = ej.Orientation.Vertical;
            }
            else if (orientation == splitterDefinition_1.SplitterDefinition.orientationHorizontal) {
                this._orientation = ej.Orientation.Horizontal;
            }
        };
        SplitterWidget.prototype.getOrientation = function () {
            if (this._orientation == ej.Orientation.Vertical) {
                return splitterDefinition_1.SplitterDefinition.orientationVertical;
            }
            else if (this._orientation == ej.Orientation.Horizontal) {
                return splitterDefinition_1.SplitterDefinition.orientationHorizontal;
            }
            return "";
        };
        SplitterWidget.prototype.getResponsive = function () {
            return this._isResponsive;
        };
        SplitterWidget.prototype.setResponsive = function (isResponsive) {
            this._isResponsive = isResponsive;
            this._actualHeight = 400;
        };
        /**
         * Creates the splitter widget
         *
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.createLayout = function () {
            var _this = this;
            $(this.cssParentContentId).ejSplitter({
                isResponsive: true,
                orientation: ej.Orientation.Horizontal,
                allowKeyboardNavigation: false,
                // Set a default size => Needed for inactive splitter windows to avoid AddItem problems
                width: "400px",
                height: "400px",
                resize: function (args) {
                    _this.onSplitterResize(args);
                },
                create: function (args) {
                    $(_this.cssParentContentId)[0].style.padding = "0px";
                }
            });
        };
        /**
         * Sets the actual layout panes definitions to the ejsplitter
         *
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.recalculateLayout = function () {
            var splitter = this.getSplitter();
            // Set orientation before get properties to the correct paneSizes(height/width)
            splitter.option("orientation", this._orientation);
            var properties = this.getProperties(splitter);
            var keys = Object.keys(this.layoutPanes);
            if (properties.length != keys.length) {
                throw (new Error("properties.length != this.layoutPanes.length"));
            }
            this.updatePropertiesInformationsWithLayoutPanesData(properties);
            this.setProperties(splitter, properties);
            if (this._isResponsive == false) {
                // create default first pane, which will be needed for drag&drop of new widgets to the splitter widget
                var splitter_1 = this.getSplitter();
                var newItem = splitter_1.addItem("<div id='" + this.parentContentId + "_lastPane" + "' style='overflow:hidden; width:100%; height:100%'></div>", { paneSize: 400, expandable: false, collapsible: false }, 0);
            }
        };
        /**
         * resizes the splitter widget
         *
         * @param {number} width
         * @param {number} height
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.resize = function (width, height) {
            if (this._isResponsive) {
                this._actualHeight = height;
            }
            this._actualWidth = width;
            this.resizeSplitter(this._actualWidth, this._actualHeight - this._headerHeight);
            this.resizeSplitterPaneContents(this._actualWidth, this._actualHeight - this._headerHeight);
        };
        /**
         * Loads the styles for the splitter widget
         *
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.loadStyles = function () {
            // addStyle uses cssParentContentId which is different to _layoutContainerId and does not work!
            _super.prototype.addStyleToContentId.call(this, "#" + this._layoutContainerId, "widgets/splitterWidget/style/css/splitterStyle.css");
            _super.prototype.addStyleToContentId.call(this, "#" + this._layoutContainerId, "widgets/common/style/css/widgetHeaderFooterStyle.css");
        };
        SplitterWidget.prototype.activate = function () {
            this._widgets.forEach(function (widget) {
                if (widget != undefined) {
                    widget.activate();
                }
            });
        };
        SplitterWidget.prototype.deactivate = function () {
            this._widgets.forEach(function (widget) {
                if (widget != undefined) {
                    widget.deactivate();
                }
            });
        };
        SplitterWidget.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this._widgets.forEach(function (widget) {
                if (widget != undefined) {
                    widget.dispose();
                }
            });
        };
        SplitterWidget.prototype.getComponentSettings = function () {
            this.component.setSetting(splitterDefinition_1.SplitterDefinition.splitterDefinitionId, this.getSplitterDefinition());
            return _super.prototype.getComponentSettings.call(this);
        };
        SplitterWidget.prototype.setComponentSettings = function (data) {
            if (data != undefined) {
                _super.prototype.setComponentSettings.call(this, data);
                var splitterDefinition = this.component.getSetting(splitterDefinition_1.SplitterDefinition.splitterDefinitionId);
                if (splitterDefinition != undefined) {
                    this.setSplitterDefinition(splitterDefinition);
                }
            }
        };
        SplitterWidget.prototype.getSplitterDefinition = function () {
            var splitterDefinition = new splitterDefinition_1.SplitterDefinition(this.getOrientation(), this.getResponsive());
            splitterDefinition.paneDefinitions = this.getSplitterPaneDefinitions();
            return splitterDefinition;
        };
        SplitterWidget.prototype.setSplitterDefinition = function (splitterDefinition) {
            var splitterOrientation = splitterDefinition.orientation;
            var splitterResponsive = splitterDefinition.responsive;
            var paneDefinitions = splitterDefinition.paneDefinitions;
            if (paneDefinitions == undefined) {
                return;
            }
            // Set splitter panes
            this.setSplitterPaneDefinitions(paneDefinitions);
            // Set orientation of splitter panes
            this.setOrientation(splitterOrientation);
            // Set responsive of splitter
            this.setResponsive(splitterResponsive);
            this.recalculateLayout();
        };
        SplitterWidget.prototype.getSplitterPaneDefinitions = function () {
            var _this = this;
            var paneDefinitions = new Array();
            var i = 0; // TODO: use correct key for getting the correct pane data
            this._widgets.forEach(function (widget) {
                if (widget != undefined) {
                    var componentDefinition = new componentDefinition_1.ComponentDefinition("", "", "");
                    componentDefinition.set(widget.component.getDefinition());
                    var paneSettings = undefined;
                    var layoutPane = _this.layoutPanes[i];
                    if (layoutPane != undefined) {
                        paneSettings = layoutPane.getSettings();
                    }
                    else {
                        console.error("LayoutPane not defined!");
                    }
                    paneDefinitions.push(new splitterPaneDefinition_1.SplitterPaneDefinition(componentDefinition, paneSettings));
                    i++;
                }
            });
            return paneDefinitions;
        };
        SplitterWidget.prototype.setSplitterPaneDefinitions = function (paneDefinitions) {
            // Create splitter panes and add widgets
            for (var i_1 = 0; i_1 < paneDefinitions.length; i_1++) {
                if (paneDefinitions[i_1] != undefined) {
                    var componentDefinition = paneDefinitions[i_1].componentDefinition;
                    var component = componentFactory_1.ComponentFactory.getInstance().create(componentDefinition);
                    if (component != undefined) {
                        // check if instance is a widget
                        if (component instanceof widgetBase_1.WidgetBase) {
                            var widget = component;
                            var splitterStoringDataId = componentDefinition.defaultSettingsDataId;
                            if (splitterStoringDataId != "") {
                                widget.setDefaultComponentSettingsDataId(splitterStoringDataId);
                            }
                            this.addWidget(widget, componentDefinition.id, viewTypeProvider_1.ViewType.Default, -1);
                        }
                    }
                    else {
                        console.warn("Component with component type '" + componentDefinition.type + "' could not be created!");
                    }
                }
            }
            // Set splitter pane sizes
            var i = 0;
            for (var key in this.layoutPanes) {
                var layoutPane = this.layoutPanes[key];
                layoutPane.setSettings(paneDefinitions[i].paneData);
                i++;
            }
        };
        /**
         * Adds a widget to the splitter => a new pane will be added for the widget to the splitter
         *
         * @param {IWidget} widget
         * @param {string} name
         * @param {ViewType} viewType
         * @param {number} [size=-1]
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.addWidget = function (widget, name, viewType, size) {
            if (size === void 0) { size = -1; }
            _super.prototype.addWidget.call(this, widget, name, viewType);
            var splitter = this.getSplitter();
            var properties = this.getProperties(splitter);
            var oldPaneSizes = this.getPaneSizes(properties);
            if (!this._isResponsive && size != -1) {
                this._actualHeight += size + this._defaultSplitterSize;
                this.resizeSplitter(this._actualWidth, this._actualHeight - this._headerHeight);
            }
            var paneId = this.parentContentId + "pane_" + name.replace(" ", "");
            var indexOfNewPane = splitter.model.properties.length;
            this.addPane(splitter, paneId, indexOfNewPane, size);
            widget.initialize(paneId);
            this.updateLayoutPanesAfterAddingNewPane(properties, oldPaneSizes, widget, viewType);
            if (!this._isResponsive) {
                this.setProperties(splitter, properties);
                this.resizeSplitterPaneContents(this._actualWidth, this._actualHeight - this._headerHeight);
            }
        };
        /**
         * Removes a widget(pane) from the splitter
         *
         * @param {IWidget} widget
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.removeWidget = function (widget) {
            var paneIndex = this.getPaneIndex(widget);
            var splitter = this.getSplitter();
            // get all actual paneSizes 
            var properties = this.getProperties(splitter);
            var sizeToRemove = properties[paneIndex].paneSize;
            var paneSizes = this.getPaneSizes(properties);
            paneSizes.splice(paneIndex, 1);
            splitter.removeItem(paneIndex);
            this.adjustChartsDivContainerSize(sizeToRemove);
            var newSplitterHeight = this.adjustSplitterSize(splitter, sizeToRemove);
            for (var i = 0; i < properties.length; i++) {
                properties[i].paneSize = paneSizes[i];
            }
            this.layoutPanes.splice(paneIndex, 1);
            this.removeWidgetFromList(widget);
            this._actualHeight = newSplitterHeight;
            this.setProperties(splitter, properties);
        };
        /**
         * Moves a widget(splitter pane) from the source index to the target index
         * (internal: target index will be decreased by 1 if source index is before target index)
         *
         * @param {number} sourcePaneIndex
         * @param {number} targetPaneIndex
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.moveWidget = function (widget, targetPaneIndex) {
            widget.dispose();
            var sourcePaneIndex = this.getPaneIndex(widget);
            var splitter = this.getSplitter();
            var layoutPane = this.layoutPanes[sourcePaneIndex];
            var movingPane = $(widget.cssParentContentId);
            targetPaneIndex = this.updataTargetPaneIndex(sourcePaneIndex, targetPaneIndex);
            var properties = this.getProperties(splitter);
            this.updatePropertiesList(properties, sourcePaneIndex, targetPaneIndex);
            this.removePane(splitter, sourcePaneIndex);
            this.addPaneWithPaneInfo(splitter, layoutPane, targetPaneIndex, properties, movingPane);
            this.updateLayoutPanesListAfterMoving(layoutPane, sourcePaneIndex, targetPaneIndex);
            this.resizeSplitter(this._actualWidth, this._actualHeight - this._headerHeight);
            // force a reinitialization of the chart instance.
            widget.reinitialize();
            widget.flaggedForResize = true;
            this.resizeSplitterPaneContents(this._actualWidth, this._actualHeight - this._headerHeight);
        };
        /**
         * Resize a widget to a new size and adapt the other widgets in this layoutWidget(splitter)
         *
         * @param {IWidget} widget
         * @param {number} newSize
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.resizeWidget = function (widget, newSize) {
            var paneIndex = this.getPaneIndex(widget);
            var splitter = this.getSplitter();
            var properties = this.getProperties(splitter);
            // set new pane sizes
            var currentPaneSize = properties[paneIndex].paneSize;
            var paneDiffSize = currentPaneSize - newSize;
            var sizeOfOtherPane = -1;
            var indexOfOtherPane = -1;
            if (paneIndex + 1 >= this.layoutPanes.length) {
                // Last pane size changed => update the size of the pane before
                sizeOfOtherPane = properties[paneIndex - 1].paneSize + paneDiffSize;
                indexOfOtherPane = paneIndex - 1;
            }
            else {
                // Update the following pane size
                sizeOfOtherPane = properties[paneIndex + 1].paneSize + paneDiffSize;
                indexOfOtherPane = paneIndex + 1;
            }
            if (sizeOfOtherPane < 0) {
                // Avoid resizing the following pane(or the pane before) to a size smaller then 0
                var oldValue = Math.abs(sizeOfOtherPane);
                sizeOfOtherPane = 50;
                newSize = newSize - oldValue - 50;
            }
            this.layoutPanes[indexOfOtherPane].size = sizeOfOtherPane;
            properties[indexOfOtherPane].paneSize = sizeOfOtherPane;
            this.layoutPanes[paneIndex].size = newSize;
            properties[paneIndex].paneSize = newSize;
            // Updates the splitters
            this.setPanePropertiesToSplitter(splitter, properties);
            // updates the contents in the splitters
            this.resizeSplitterPaneContents(this._actualWidth, this._actualHeight);
        };
        /**
         * Returns the ejSplitter data object
         *
         * @private
         * @returns
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.getSplitter = function () {
            return $(this.cssParentContentId).data("ejSplitter");
        };
        /**
         * Returns the sizes of all panes together, incl. the dynamic pane
         *
         * @private
         * @returns {number}
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.sumOfDefinedLayoutPaneSizes = function () {
            var sum = 0;
            for (var key in this.layoutPanes) {
                var layoutPane = this.layoutPanes[key];
                if (layoutPane != undefined) {
                    sum += layoutPane.size;
                }
            }
            return sum;
        };
        /**
         * Returns the sizes of all panes together, without the size of the dynamic pane but including the splitter size(e.g. 9px)
         *
         * @private
         * @returns {number}
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.sumOfDefinedPaneSizes = function () {
            var sum = 0;
            var index = 0;
            for (var key in this.layoutPanes) {
                var layoutPane = this.layoutPanes[key];
                if (layoutPane == undefined) {
                    continue;
                }
                else {
                    if (layoutPane.fillSpace == false) {
                        sum += layoutPane.size;
                    }
                    if (index > 0) {
                        var splitterSize = this._defaultSplitterSize;
                        sum += splitterSize; // Add size of splitter
                    }
                }
                index++;
            }
            return sum;
        };
        /**
         * if the pane sizes are too big for the current window size, the panes would be decreased in size
         *
         * @private
         * @param {number} size
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.adoptLayoutPanesToFitCurrentSize = function (size) {
            var sumOfPanesWitoutDynamic = this.sumOfDefinedPaneSizes();
            var neededSize = sumOfPanesWitoutDynamic - size;
            if (neededSize > 0) {
                // TODO: get last not dynamic pane
                var lastPane = this.layoutPanes[this.layoutPanes.length - 1];
                lastPane.size = lastPane.size - neededSize;
            }
        };
        /**
         * Adds a new pane at the given index with the given size
         *
         * @private
         * @param {*} splitter
         * @param {*} paneId
         * @param {*} indexOfNewPane
         * @param {*} size
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.addPane = function (splitter, paneId, indexOfNewPane, size) {
            var newItem;
            if (!this._isResponsive && size != -1) {
                if (indexOfNewPane == 0) {
                    indexOfNewPane++;
                }
                newItem = splitter.removeItem(indexOfNewPane - 1);
                newItem = splitter.addItem("<div id='" + paneId + "' style='overflow:hidden'></div>", { paneSize: size, expandable: false, collapsible: false }, indexOfNewPane - 1);
                newItem = splitter.addItem("<div id='" + this.parentContentId + "_lastPane" + "' style='overflow:hidden; width:100%; height:100%'></div>", { paneSize: 400, expandable: false, collapsible: false }, indexOfNewPane);
            }
            else {
                newItem = splitter.addItem("<div id='" + paneId + "' style='overflow:hidden'></div>", { paneSize: size, expandable: false, collapsible: false }, indexOfNewPane);
            }
            if (newItem.toString() == "") {
                console.error("ERROR: splitter.addItem");
            }
            else {
                newItem[0].style.overflow = "hidden";
            }
        };
        /**
         * Adds the moved pane to the splitter and sets the splitter options
         *
         * @private
         * @param {*} splitter
         * @param {*} paneIndex
         * @param {*} targetPaneIndex
         * @param {*} properties
         * @param {*} movingPane
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.addPaneWithPaneInfo = function (splitter, layoutPane, targetPaneIndex, properties, movingPane) {
            splitter.addItem(movingPane[0].parentElement.innerHTML, { expandable: layoutPane.expandable, collapsible: layoutPane.collapsible }, targetPaneIndex);
            this.setProperties(splitter, properties);
        };
        /**
         *  Removes the pane with the given index from the splitter
         *
         * @private
         * @param {*} splitter
         * @param {number} paneIndex
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.removePane = function (splitter, paneIndex) {
            splitter.removeItem(paneIndex);
        };
        SplitterWidget.prototype.updateLayoutPanesAfterAddingNewPane = function (properties, oldPaneSizes, widget, viewType) {
            if (this._isResponsive) {
                this.updataLayoutPanesAfterAddingNewPaneResponsive(properties, widget);
            }
            else {
                oldPaneSizes[oldPaneSizes.length - 1] = undefined;
                for (var i = 0; i < properties.length - 1; i++) {
                    var name_1 = "";
                    if (oldPaneSizes[i] != undefined) {
                        properties[i].paneSize = oldPaneSizes[i];
                        name_1 = this.layoutPanes[i].name;
                    }
                    if (name_1 === "") {
                        name_1 = widget.widgetName + "_" + viewType.toString();
                        name_1 = uniqueIdGenerator_1.UniqueIdGenerator.getInstance().getUniqueIdFromString(name_1);
                    }
                    var paneWidget = widget;
                    if (this.layoutPanes[i] != undefined) {
                        paneWidget = this.layoutPanes[i].widget;
                    }
                    this.layoutPanes[i] = new layoutPane_1.LayoutPane(name_1, properties[i].paneSize, paneWidget, false, true, properties[i].expandable, properties[i].collapsible);
                }
            }
        };
        SplitterWidget.prototype.updataLayoutPanesAfterAddingNewPaneResponsive = function (properties, widget) {
            var _loop_1 = function (i) {
                var name_2 = "";
                var j = 0;
                this_1._widgets.forEach(function (value, key) {
                    if (j == i) {
                        name_2 = key;
                    }
                    j++;
                });
                var paneWidget = widget;
                if (this_1.layoutPanes[i] != undefined) {
                    paneWidget = this_1.layoutPanes[i].widget;
                }
                this_1.layoutPanes[i] = new layoutPane_1.LayoutPane(name_2, properties[i].paneSize, paneWidget, false, true, properties[i].expandable, properties[i].collapsible);
            };
            var this_1 = this;
            for (var i = 0; i < properties.length; i++) {
                _loop_1(i);
            }
        };
        /**
         * Updates the properties with the informations from the layoutPane definitions;
         * Size of dynamic pane will be calculated by using the actual widget size
         *
         * @private
         * @param {*} properties
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.updatePropertiesInformationsWithLayoutPanesData = function (properties) {
            var index = 0;
            for (var key in this.layoutPanes) {
                var layoutPane = this.layoutPanes[key];
                if (layoutPane == undefined) {
                    continue;
                }
                else {
                    if (layoutPane.fillSpace == false) {
                        properties[index].paneSize = layoutPane.size;
                    }
                    else {
                        var size = this._actualWidth;
                        if (this._orientation == ej.Orientation.Vertical) {
                            size = this._actualHeight;
                        }
                        properties[index].paneSize = size - this.sumOfDefinedLayoutPaneSizes();
                    }
                    properties[index].expandable = layoutPane.expandable;
                    properties[index].collapsible = layoutPane.collapsible;
                    properties[index].resizable = layoutPane.resizable;
                    properties[index].minSize = layoutPane.minimumSize;
                }
                index++;
            }
        };
        /**
         * resize the splitter and update the splitter panesizes
         *
         * @private
         * @param {number} width
         * @param {number} height
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.resizeSplitter = function (width, height) {
            var splitter = this.getSplitter();
            splitter.option("width", width, true);
            splitter.option("height", height, true);
            var properties = this.getProperties(splitter);
            this.updatePaneProperties(properties, width, height);
            this.setPanePropertiesToSplitter(splitter, properties);
        };
        /**
         * Updates the panesize in the properties for the new height/width
         *
         * @private
         * @param {*} properties
         * @param {*} width
         * @param {*} height
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.updatePaneProperties = function (properties, width, height) {
            // Set all know pane sizes
            this.setKnownPaneSizes(properties);
            // Set all dynamic pane sizes
            this.setDynamicPaneSizes(properties, width, height);
        };
        SplitterWidget.prototype.setKnownPaneSizes = function (properties) {
            var index = 0;
            for (var key in this.layoutPanes) {
                var layoutPane = this.layoutPanes[key];
                if (layoutPane == undefined) {
                    continue;
                }
                else {
                    if (layoutPane.fillSpace == false) {
                        properties[index].paneSize = layoutPane.size;
                    }
                }
                index++;
            }
        };
        SplitterWidget.prototype.setDynamicPaneSizes = function (properties, width, height) {
            var index = 0;
            for (var key in this.layoutPanes) {
                var layoutPane = this.layoutPanes[key];
                if (layoutPane == undefined) {
                    continue;
                }
                else {
                    if (layoutPane.fillSpace == true) {
                        if (this._orientation == ej.Orientation.Vertical) {
                            properties[index].paneSize = height - this.sumOfDefinedPaneSizes();
                        }
                        else {
                            properties[index].paneSize = width - this.sumOfDefinedPaneSizes();
                        }
                    }
                }
                index++;
            }
        };
        /**
         * Sets the given properties(panesizes, ...) to the ejsplitter
         * if the last panesize is under 1px a correction of the panesize will be done; occures sometimes in case of browser zoom
         *
         * @private
         * @param {*} splitter
         * @param {*} properties
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.setPanePropertiesToSplitter = function (splitter, properties) {
            this.setProperties(splitter, properties);
            if (splitter.panes.length > 0) {
                var lastPane = splitter.panes[splitter.panes.length - 1];
                if (lastPane != undefined) {
                    var lastPaneSizeString = lastPane.style.width;
                    if (this._orientation == ej.Orientation.Vertical) {
                        lastPaneSizeString = lastPane.style.height;
                    }
                    var lastPaneSize = parseFloat(lastPaneSizeString);
                    if (lastPaneSize <= 0.9999 && properties[properties.length - 1].paneSize > 0) {
                        // Size of last splitter pane was not set correct => to less space!
                        // if browser zoom is used the sizes will be defined with decimalplaces;
                        // the ejSplitter sets the size of the last pane to 0 if it is a little bit to tall (e.g. "0.1px") => pane will not be shown
                        // Set last pane a little bit smaller
                        properties[properties.length - 1].paneSize--;
                        this.setProperties(splitter, properties);
                    }
                }
            }
        };
        /**
         * Sets the splitter pane content sizes (widget sizes)
         *
         * @private
         * @param {number} width
         * @param {number} height
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.resizeSplitterPaneContents = function (width, height) {
            // Set the sizes of the splitter panecontents
            var index = 0;
            for (var i = 0; i < this.layoutPanes.length; i++) {
                var widget = this._widgets.get(this.layoutPanes[i].name);
                if (widget != undefined) {
                    var widgetWidth = width;
                    var widgetHeight = height;
                    if (this._orientation == ej.Orientation.Vertical) {
                        if (this.layoutPanes[index].fillSpace == true) {
                            widgetHeight = height - this.sumOfDefinedPaneSizes();
                            if (widgetHeight < 0) { // No place for dynamic pane, maybe also other panes have to be adopted
                                this.adoptLayoutPanesToFitCurrentSize(height);
                                widgetHeight = 0;
                            }
                        }
                        else {
                            widgetHeight = this.layoutPanes[index].size;
                        }
                    }
                    else {
                        if (this.layoutPanes[index].fillSpace == true) {
                            widgetWidth = width - this.sumOfDefinedPaneSizes();
                            if (widgetWidth < 0) { // No place for dynamic pane, maybe also other panes have to be adopted
                                this.adoptLayoutPanesToFitCurrentSize(width);
                                widgetWidth = 0;
                            }
                        }
                        else {
                            widgetWidth = this.layoutPanes[index].size;
                        }
                    }
                    widget.resize(widgetWidth, widgetHeight);
                }
                index++;
            }
        };
        /**
         * Updates the layout panes
         *
         * @private
         * @param {*} splitbarIndex
         * @param {*} prevPaneSize
         * @param {*} nextPaneSize
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.updateLayoutPanesOnSplitterResize = function (splitbarIndex, prevPaneSize, nextPaneSize) {
            var splitter = this.getSplitter();
            var properties = this.getProperties(splitter);
            if (!this._isResponsive) {
                if (this.layoutPanes[splitbarIndex + 1] != undefined) {
                    properties[splitbarIndex + 1].paneSize = this.layoutPanes[splitbarIndex + 1].size;
                }
            }
            else {
                this.layoutPanes[splitbarIndex + 1].size = nextPaneSize;
            }
            this.setProperties(splitter, properties);
            var oldSize = this.layoutPanes[splitbarIndex].size;
            this.layoutPanes[splitbarIndex].size = prevPaneSize;
            if (!this._isResponsive) {
                this._actualHeight += (prevPaneSize - oldSize);
                this.resizeSplitter(this._actualWidth, this._actualHeight - this._headerHeight);
            }
        };
        /**
         * corrects the target index if source index is before target index
         *
         * @private
         * @param {number} sourcePaneIndex
         * @param {number} targetPaneIndex
         * @returns {number}
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.updataTargetPaneIndex = function (sourcePaneIndex, targetPaneIndex) {
            if (sourcePaneIndex < targetPaneIndex) {
                // moved element is in list before target position and was removed before, so index must be decreased to get correct insert position
                targetPaneIndex--;
            }
            return targetPaneIndex;
        };
        /**
         * Returns the properties from the ejSplitter
         *
         * @private
         * @param {*} splitter
         * @returns
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.getProperties = function (splitter) {
            return splitter.option("properties");
        };
        /**
         * Sets the properties of the ejSplitter
         *
         * @private
         * @param {*} splitter
         * @param {*} properties
         * @returns
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.setProperties = function (splitter, properties) {
            splitter.option("properties", properties, true); // force the setting to resize the chart splitters
        };
        /**
         * Updates the properties => moves the property informations from source to target index
         *
         * @private
         * @param {*} properties
         * @param {number} sourcePaneIndex
         * @param {number} targetPaneIndex
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.updatePropertiesList = function (properties, sourcePaneIndex, targetPaneIndex) {
            var paneProperties = properties[sourcePaneIndex];
            properties.splice(sourcePaneIndex, 1);
            properties.splice(targetPaneIndex, 0, paneProperties);
        };
        /**
         * Updates the layout panes list after moving
         *
         * @private
         * @param {*} layoutPane
         * @param {*} sourcePaneIndex
         * @param {*} targetPaneIndex
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.updateLayoutPanesListAfterMoving = function (layoutPane, sourcePaneIndex, targetPaneIndex) {
            this.layoutPanes.splice(sourcePaneIndex, 1);
            this.layoutPanes.splice(targetPaneIndex, 0, layoutPane);
        };
        /**
         * Returns the pane index of the given widget
         *
         * @private
         * @param {*} widget
         * @returns {number}
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.getPaneIndex = function (widget) {
            var paneIndex = -1;
            for (var i = 0; i < this.layoutPanes.length; i++) {
                if (this.layoutPanes[i].widget == widget) {
                    paneIndex = i;
                }
            }
            return paneIndex;
        };
        /**
         * Removes the widget from the widgets list of this layout widget
         *
         * @private
         * @param {*} widget
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.removeWidgetFromList = function (widget) {
            var _this = this;
            this._widgets.forEach(function (widgetTemp, key) {
                if (widgetTemp == widget) {
                    _this._widgets.delete(key);
                }
            });
        };
        /**
         * Adjust charts div container => remove chart size
         *
         * @private
         * @param {*} sizeToRemove
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.adjustChartsDivContainerSize = function (sizeToRemove) {
            var actualHeight = $(this.cssParentContentId).height();
            var internalContainer = $(this.cssParentContentId)[0];
            internalContainer.style.height = (actualHeight - sizeToRemove - 400 + this._defaultSplitterSize) + "px"; // Remove pane size + splitter size(9px)
        };
        /**
         *  Adjust ejSplitter size
         *
         * @private
         * @param {*} splitter
         * @param {*} sizeToRemove
         * @returns {number} Returns the new splitter size after removing
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.adjustSplitterSize = function (splitter, sizeToRemove) {
            var actualSplitterHeight = splitter.option("height");
            var newSplitterHeight = parseInt(actualSplitterHeight, 10); // parseInt to remove "px"
            newSplitterHeight -= sizeToRemove + this._defaultSplitterSize; // Remove pane size + splitter size(9px)
            splitter.option("height", newSplitterHeight, true); // TODO: not only height, also width 
            return newSplitterHeight;
        };
        /**
         * Notifies that splitter has resized
         *
         * @private
         */
        SplitterWidget.prototype.onSplitterResize = function (args) {
            this.updateLayoutPanesOnSplitterResize(args.splitbarIndex, args.prevPane.size, args.nextPane.size);
            this.resizeSplitterPaneContents(this._actualWidth, this._actualHeight - this._headerHeight);
        };
        /**
         * Returns a list with only the sizes of the panes
         *
         * @private
         * @param {*} properties
         * @returns
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.getPaneSizes = function (properties) {
            var paneSizes = new Array();
            properties.forEach(function (property) {
                paneSizes.push(property.paneSize);
            });
            return paneSizes;
        };
        return SplitterWidget;
    }(layoutWidgetBase_1.LayoutWidgetBase));
    exports.SplitterWidget = SplitterWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXR0ZXJXaWRnZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvc3BsaXR0ZXJXaWRnZXQvc3BsaXR0ZXJXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQWNBO1FBQTZCLGtDQUFnQjtRQUE3QztZQUFBLHFFQTI5QkM7WUF6OUJHLHlCQUF5QjtZQUNqQixtQkFBYSxHQUFHLENBQUMsQ0FBQztZQUVsQixrQkFBWSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDO1lBSXpDLG1CQUFhLEdBQVksSUFBSSxDQUFDO1lBSTlCLDBCQUFvQixHQUFXLENBQUMsQ0FBQyxDQUFDLGlDQUFpQzs7UUE4OEIvRSxDQUFDO1FBNThCRyxtQ0FBVSxHQUFWLFVBQVcsaUJBQXlCLEVBQUUsWUFBdUI7WUFBdkIsNkJBQUEsRUFBQSxnQkFBdUI7WUFDekQsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGlCQUFpQixDQUFDO1lBQzVDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDO1lBRXpCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztZQUUvQixJQUFJLENBQUMsYUFBYSxHQUFHLFlBQVksQ0FBQztZQUNsQyx1QkFBdUI7WUFDdkIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGlCQUFpQixHQUFHLFNBQVMsQ0FBQztZQUN4RCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsaUJBQWlCLEdBQUcsT0FBTyxDQUFDO1lBRXBELGNBQWM7WUFDZCxJQUFHLFlBQVksSUFBSSxDQUFDLEVBQUM7Z0JBQ2pCLENBQUMsQ0FBQyxHQUFHLEdBQUUsaUJBQWlCLENBQUMsQ0FBQyxNQUFNLENBQUMsZ0NBQWdDLEdBQUUsSUFBSSxDQUFDLGtCQUFrQixHQUFHLG1CQUFtQixHQUFFLElBQUksQ0FB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SyxFQUFVLENBQUM7WUFDcEMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFBLFFBQVE7Z0JBQ3ZCLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3RDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxTQUFTLENBQUM7UUFDckIsQ0FBQztRQUNMLHFCQUFDO0lBQUQsQ0FBQyxBQTM5QkQsQ0FBNkIsbUNBQWdCLEdBMjlCNUM7SUFFTyx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExheW91dFdpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL2xheW91dFdpZGdldEJhc2VcIjtcclxuaW1wb3J0IHsgSVdpZGdldCB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy93aWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgTGF5b3V0UGFuZSB9IGZyb20gXCIuL2xheW91dFBhbmVcIjtcclxuaW1wb3J0IHsgVmlld1R5cGUgfSBmcm9tIFwiLi4vY29tbW9uL3ZpZXdUeXBlUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgVW5pcXVlSWRHZW5lcmF0b3IgfSBmcm9tIFwiLi4vY29tbW9uL3VuaXF1ZUlkR2VuZXJhdG9yXCI7XHJcblxyXG5pbXBvcnQgeyBTcGxpdHRlclBhbmVEZWZpbml0aW9uIH0gZnJvbSBcIi4vc3BsaXR0ZXJQYW5lRGVmaW5pdGlvblwiO1xyXG5pbXBvcnQgeyBTcGxpdHRlckRlZmluaXRpb24gfSBmcm9tIFwiLi9zcGxpdHRlckRlZmluaXRpb25cIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50RmFjdG9yeSB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50RmFjdG9yeS9jb21wb25lbnRGYWN0b3J5XCI7XHJcbmltcG9ydCB7IENvbXBvbmVudERlZmluaXRpb24gfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEZhY3RvcnkvY29tcG9uZW50RGVmaW5pdGlvblwiO1xyXG5pbXBvcnQgeyBXaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi93aWRnZXRCYXNlXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCB7IElTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vcGVyc2lzdGVuY2UvaW50ZXJmYWNlcy9zZXR0aW5nc0ludGVyZmFjZVwiO1xyXG5cclxuY2xhc3MgU3BsaXR0ZXJXaWRnZXQgZXh0ZW5kcyBMYXlvdXRXaWRnZXRCYXNle1xyXG4gICAgXHJcbiAgICAvLyBTZXQgc29tZSBkZWZhdWx0IHNpemVzXHJcbiAgICBwcml2YXRlIF9oZWFkZXJIZWlnaHQgPSAwO1xyXG5cclxuICAgIHByaXZhdGUgX29yaWVudGF0aW9uID0gZWouT3JpZW50YXRpb24uSG9yaXpvbnRhbDtcclxuXHJcbiAgICBwcml2YXRlIF9oZWFkZXJDb250YWluZXJJZDtcclxuXHRwcml2YXRlIF9tYWluQ29udGFpbmVySWQ7XHJcbiAgICBwcml2YXRlIF9pc1Jlc3BvbnNpdmU6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIHByaXZhdGUgX2xheW91dENvbnRhaW5lcklkITogc3RyaW5nO1xyXG5cclxuICAgIHByaXZhdGUgX2RlZmF1bHRTcGxpdHRlclNpemU6IG51bWJlciA9IDk7IC8vIFRPRE8gZ2V0IGFjdHVhbCBzcGxpdHRlciBzaXplIFxyXG5cclxuICAgIGluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQ6IHN0cmluZywgaGVhZGVySGVpZ2h0Om51bWJlciA9IDApIHtcclxuICAgICAgICB0aGlzLl9sYXlvdXRDb250YWluZXJJZCA9IGxheW91dENvbnRhaW5lcklkO1xyXG4gICAgICAgIHRoaXMuX2FjdHVhbFdpZHRoID0gMTAwMDtcclxuICAgICAgICB0aGlzLl9hY3R1YWxIZWlnaHQgPSA0MDA7XHJcblxyXG4gICAgICAgIHRoaXMubGF5b3V0UGFuZXMgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgIFxyXG4gICAgICAgIHRoaXMuX2hlYWRlckhlaWdodCA9IGhlYWRlckhlaWdodDtcclxuICAgICAgICAvLyBBZGQgYWRkaXRpb25hbCBkaXZzIFxyXG4gICAgICAgIHRoaXMuX2hlYWRlckNvbnRhaW5lcklkID0gbGF5b3V0Q29udGFpbmVySWQgKyBcIl9oZWFkZXJcIjtcclxuICAgICAgICB0aGlzLl9tYWluQ29udGFpbmVySWQgPSBsYXlvdXRDb250YWluZXJJZCArIFwiX21haW5cIjtcclxuICAgICAgICBcclxuICAgICAgICAvLyBBZGQgaGVhZGVyIFxyXG4gICAgICAgIGlmKGhlYWRlckhlaWdodCAhPSAwKXtcclxuICAgICAgICAgICAgJChcIiNcIisgbGF5b3V0Q29udGFpbmVySWQpLmFwcGVuZChcIjxkaXYgY2xhc3M9J3dpZGdldEhlYWRlcicgaWQ9J1wiKyB0aGlzLl9oZWFkZXJDb250YWluZXJJZCArIFwiJyBzdHlsZT0naGVpZ2h0OiBcIisgdGhpcy5faGVhZGVySGVpZ2h0ICsgXCJweCc+PC9kaXY+XCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgICQoXCIjXCIrIGxheW91dENvbnRhaW5lcklkKS5hcHBlbmQoXCI8ZGl2IGlkPSdcIisgdGhpcy5fbWFpbkNvbnRhaW5lcklkICsgXCInPjwvZGl2PlwiKVxyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemUodGhpcy5fbWFpbkNvbnRhaW5lcklkKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0aWFsaXplQ29tcG9uZW50KCl7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZGlzYWJsZVBlcnNpc3RpbmcoKTtcclxuICAgICAgfVxyXG5cclxuICAgIHNldEhlYWRlckNvbnRlbnQoY29udGVudDpzdHJpbmcpe1xyXG5cdFx0JChcIiNcIisgdGhpcy5faGVhZGVyQ29udGFpbmVySWQpWzBdLmlubmVySFRNTCA9IGNvbnRlbnQ7XHJcblx0fVxyXG5cclxuICAgIHNldE9yaWVudGF0aW9uKG9yaWVudGF0aW9uOiBzdHJpbmcpe1xyXG4gICAgICAgIGlmKG9yaWVudGF0aW9uID09IFNwbGl0dGVyRGVmaW5pdGlvbi5vcmllbnRhdGlvblZlcnRpY2FsKXtcclxuICAgICAgICAgICAgdGhpcy5fb3JpZW50YXRpb24gPSBlai5PcmllbnRhdGlvbi5WZXJ0aWNhbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihvcmllbnRhdGlvbiA9PSBTcGxpdHRlckRlZmluaXRpb24ub3JpZW50YXRpb25Ib3Jpem9udGFsKXtcclxuICAgICAgICAgICAgdGhpcy5fb3JpZW50YXRpb24gPSBlai5PcmllbnRhdGlvbi5Ib3Jpem9udGFsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRPcmllbnRhdGlvbigpOiBzdHJpbmd7XHJcbiAgICAgICAgaWYodGhpcy5fb3JpZW50YXRpb24gPT0gZWouT3JpZW50YXRpb24uVmVydGljYWwpe1xyXG4gICAgICAgICAgICByZXR1cm4gU3BsaXR0ZXJEZWZpbml0aW9uLm9yaWVudGF0aW9uVmVydGljYWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5fb3JpZW50YXRpb24gPT0gZWouT3JpZW50YXRpb24uSG9yaXpvbnRhbCl7XHJcbiAgICAgICAgICAgIHJldHVybiBTcGxpdHRlckRlZmluaXRpb24ub3JpZW50YXRpb25Ib3Jpem9udGFsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBnZXRSZXNwb25zaXZlKCk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzUmVzcG9uc2l2ZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRSZXNwb25zaXZlKGlzUmVzcG9uc2l2ZTogYm9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5faXNSZXNwb25zaXZlID0gaXNSZXNwb25zaXZlO1xyXG4gICAgICAgIHRoaXMuX2FjdHVhbEhlaWdodCA9IDQwMDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIHNwbGl0dGVyIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBjcmVhdGVMYXlvdXQoKSB7XHJcbiAgICAgXHJcbiAgICAgICAgJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCkuZWpTcGxpdHRlcih7XHJcbiAgICAgICAgICAgIGlzUmVzcG9uc2l2ZTogdHJ1ZSxcclxuICAgICAgICAgICAgb3JpZW50YXRpb246IGVqLk9yaWVudGF0aW9uLkhvcml6b250YWwsIC8vIEluaXRpYWwgb25seSBIb3Jpem9udGFsIGlzIHdvcmtpbmcgPT4gbGF0ZXIgc3dpdGNoIHRvIHZlcnRpY2FsIGluIHJlY2FsY3VsYXRlIGxheW91dCBpcyBwb3NzaWJsZVxyXG4gICAgICAgICAgICBhbGxvd0tleWJvYXJkTmF2aWdhdGlvbjogZmFsc2UsXHJcbiAgICAgICAgICAgIC8vIFNldCBhIGRlZmF1bHQgc2l6ZSA9PiBOZWVkZWQgZm9yIGluYWN0aXZlIHNwbGl0dGVyIHdpbmRvd3MgdG8gYXZvaWQgQWRkSXRlbSBwcm9ibGVtc1xyXG4gICAgICAgICAgICB3aWR0aDogXCI0MDBweFwiLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IFwiNDAwcHhcIixcclxuICAgICAgICAgICAgcmVzaXplOiAoYXJncykgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vblNwbGl0dGVyUmVzaXplKGFyZ3MpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjcmVhdGU6IChhcmdzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKVswXS5zdHlsZS5wYWRkaW5nID0gXCIwcHhcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgYWN0dWFsIGxheW91dCBwYW5lcyBkZWZpbml0aW9ucyB0byB0aGUgZWpzcGxpdHRlclxyXG4gICAgICogXHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcmVjYWxjdWxhdGVMYXlvdXQoKXtcclxuICAgICAgICB2YXIgc3BsaXR0ZXIgPSB0aGlzLmdldFNwbGl0dGVyKCk7XHJcbiAgICAgICAgLy8gU2V0IG9yaWVudGF0aW9uIGJlZm9yZSBnZXQgcHJvcGVydGllcyB0byB0aGUgY29ycmVjdCBwYW5lU2l6ZXMoaGVpZ2h0L3dpZHRoKVxyXG4gICAgICAgIHNwbGl0dGVyLm9wdGlvbihcIm9yaWVudGF0aW9uXCIsIHRoaXMuX29yaWVudGF0aW9uKTtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgcHJvcGVydGllcyA9IHRoaXMuZ2V0UHJvcGVydGllcyhzcGxpdHRlcik7XHJcbiAgICAgICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyh0aGlzLmxheW91dFBhbmVzKTtcclxuICAgICAgICBpZihwcm9wZXJ0aWVzLmxlbmd0aCAhPSBrZXlzLmxlbmd0aCl7XHJcbiAgICAgICAgICAgIHRocm93KG5ldyBFcnJvcihcInByb3BlcnRpZXMubGVuZ3RoICE9IHRoaXMubGF5b3V0UGFuZXMubGVuZ3RoXCIpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGVQcm9wZXJ0aWVzSW5mb3JtYXRpb25zV2l0aExheW91dFBhbmVzRGF0YShwcm9wZXJ0aWVzKTtcclxuICAgICAgICB0aGlzLnNldFByb3BlcnRpZXMoc3BsaXR0ZXIsIHByb3BlcnRpZXMpO1xyXG5cclxuICAgICAgICBpZih0aGlzLl9pc1Jlc3BvbnNpdmUgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAvLyBjcmVhdGUgZGVmYXVsdCBmaXJzdCBwYW5lLCB3aGljaCB3aWxsIGJlIG5lZWRlZCBmb3IgZHJhZyZkcm9wIG9mIG5ldyB3aWRnZXRzIHRvIHRoZSBzcGxpdHRlciB3aWRnZXRcclxuICAgICAgICAgICAgbGV0IHNwbGl0dGVyID0gdGhpcy5nZXRTcGxpdHRlcigpO1xyXG4gICAgICAgICAgICBsZXQgbmV3SXRlbSA9IHNwbGl0dGVyLmFkZEl0ZW0oXCI8ZGl2IGlkPSdcIiArIHRoaXMucGFyZW50Q29udGVudElkICsgXCJfbGFzdFBhbmVcIiArIFwiJyBzdHlsZT0nb3ZlcmZsb3c6aGlkZGVuOyB3aWR0aDoxMDAlOyBoZWlnaHQ6MTAwJSc+PC9kaXY+XCIsIHsgcGFuZVNpemU6IDQwMCwgZXhwYW5kYWJsZTogZmFsc2UsIGNvbGxhcHNpYmxlOiBmYWxzZX0sIDApOyBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZXNpemVzIHRoZSBzcGxpdHRlciB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gd2lkdGhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICByZXNpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHsgICBcclxuICAgICAgICBpZih0aGlzLl9pc1Jlc3BvbnNpdmUpe1xyXG4gICAgICAgICAgICB0aGlzLl9hY3R1YWxIZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2FjdHVhbFdpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5yZXNpemVTcGxpdHRlcih0aGlzLl9hY3R1YWxXaWR0aCwgdGhpcy5fYWN0dWFsSGVpZ2h0LXRoaXMuX2hlYWRlckhlaWdodCk7XHJcbiAgICAgICAgdGhpcy5yZXNpemVTcGxpdHRlclBhbmVDb250ZW50cyh0aGlzLl9hY3R1YWxXaWR0aCwgdGhpcy5fYWN0dWFsSGVpZ2h0LXRoaXMuX2hlYWRlckhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkcyB0aGUgc3R5bGVzIGZvciB0aGUgc3BsaXR0ZXIgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGxvYWRTdHlsZXMoKXtcclxuICAgICAgICAvLyBhZGRTdHlsZSB1c2VzIGNzc1BhcmVudENvbnRlbnRJZCB3aGljaCBpcyBkaWZmZXJlbnQgdG8gX2xheW91dENvbnRhaW5lcklkIGFuZCBkb2VzIG5vdCB3b3JrIVxyXG4gICAgICAgIHN1cGVyLmFkZFN0eWxlVG9Db250ZW50SWQoXCIjXCIgKyB0aGlzLl9sYXlvdXRDb250YWluZXJJZCwgXCJ3aWRnZXRzL3NwbGl0dGVyV2lkZ2V0L3N0eWxlL2Nzcy9zcGxpdHRlclN0eWxlLmNzc1wiKTtcclxuICAgICAgICBzdXBlci5hZGRTdHlsZVRvQ29udGVudElkKFwiI1wiICsgdGhpcy5fbGF5b3V0Q29udGFpbmVySWQsIFwid2lkZ2V0cy9jb21tb24vc3R5bGUvY3NzL3dpZGdldEhlYWRlckZvb3RlclN0eWxlLmNzc1wiKTtcclxuICAgIH1cclxuXHJcbiAgICBhY3RpdmF0ZSgpe1xyXG4gICAgICAgIHRoaXMuX3dpZGdldHMuZm9yRWFjaCgod2lkZ2V0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHdpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgd2lkZ2V0LmFjdGl2YXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBkZWFjdGl2YXRlKCl7XHJcbiAgICAgICAgdGhpcy5fd2lkZ2V0cy5mb3JFYWNoKCh3aWRnZXQpID0+IHtcclxuICAgICAgICAgICAgaWYod2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICB3aWRnZXQuZGVhY3RpdmF0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGRpc3Bvc2UoKXtcclxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX3dpZGdldHMuZm9yRWFjaCgod2lkZ2V0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHdpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgd2lkZ2V0LmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0Q29tcG9uZW50U2V0dGluZ3MoKTogQ29tcG9uZW50U2V0dGluZ3Mge1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LnNldFNldHRpbmcoU3BsaXR0ZXJEZWZpbml0aW9uLnNwbGl0dGVyRGVmaW5pdGlvbklkLCB0aGlzLmdldFNwbGl0dGVyRGVmaW5pdGlvbigpKTtcclxuICAgICAgICByZXR1cm4gc3VwZXIuZ2V0Q29tcG9uZW50U2V0dGluZ3MoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0Q29tcG9uZW50U2V0dGluZ3MoZGF0YTogQ29tcG9uZW50U2V0dGluZ3MpIHtcclxuICAgICAgICBpZiAoZGF0YSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgc3VwZXIuc2V0Q29tcG9uZW50U2V0dGluZ3MoZGF0YSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgc3BsaXR0ZXJEZWZpbml0aW9uID0gdGhpcy5jb21wb25lbnQuZ2V0U2V0dGluZyhTcGxpdHRlckRlZmluaXRpb24uc3BsaXR0ZXJEZWZpbml0aW9uSWQpO1xyXG4gICAgICAgICAgICBpZihzcGxpdHRlckRlZmluaXRpb24gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3BsaXR0ZXJEZWZpbml0aW9uKHNwbGl0dGVyRGVmaW5pdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRTcGxpdHRlckRlZmluaXRpb24oKTogU3BsaXR0ZXJEZWZpbml0aW9ue1xyXG4gICAgICAgIGxldCBzcGxpdHRlckRlZmluaXRpb24gPSBuZXcgU3BsaXR0ZXJEZWZpbml0aW9uKHRoaXMuZ2V0T3JpZW50YXRpb24oKSwgdGhpcy5nZXRSZXNwb25zaXZlKCkpO1xyXG4gICAgICAgIHNwbGl0dGVyRGVmaW5pdGlvbi5wYW5lRGVmaW5pdGlvbnMgPSB0aGlzLmdldFNwbGl0dGVyUGFuZURlZmluaXRpb25zKCk7XHJcbiAgICAgICAgcmV0dXJuIHNwbGl0dGVyRGVmaW5pdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFNwbGl0dGVyRGVmaW5pdGlvbihzcGxpdHRlckRlZmluaXRpb246IFNwbGl0dGVyRGVmaW5pdGlvbil7XHJcbiAgICAgICAgbGV0IHNwbGl0dGVyT3JpZW50YXRpb24gPSBzcGxpdHRlckRlZmluaXRpb24ub3JpZW50YXRpb247XHJcbiAgICAgICAgbGV0IHNwbGl0dGVyUmVzcG9uc2l2ZSA9IHNwbGl0dGVyRGVmaW5pdGlvbi5yZXNwb25zaXZlO1xyXG4gICAgICAgIGxldCBwYW5lRGVmaW5pdGlvbnMgPSBzcGxpdHRlckRlZmluaXRpb24ucGFuZURlZmluaXRpb25zO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHBhbmVEZWZpbml0aW9ucyA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFNldCBzcGxpdHRlciBwYW5lc1xyXG4gICAgICAgIHRoaXMuc2V0U3BsaXR0ZXJQYW5lRGVmaW5pdGlvbnMocGFuZURlZmluaXRpb25zKTtcclxuIFxyXG4gICAgICAgIC8vIFNldCBvcmllbnRhdGlvbiBvZiBzcGxpdHRlciBwYW5lc1xyXG4gICAgICAgIHRoaXMuc2V0T3JpZW50YXRpb24oc3BsaXR0ZXJPcmllbnRhdGlvbik7XHJcblxyXG4gICAgICAgIC8vIFNldCByZXNwb25zaXZlIG9mIHNwbGl0dGVyXHJcbiAgICAgICAgdGhpcy5zZXRSZXNwb25zaXZlKHNwbGl0dGVyUmVzcG9uc2l2ZSk7XHJcblxyXG4gICAgICAgIHRoaXMucmVjYWxjdWxhdGVMYXlvdXQoKTsgICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIGdldFNwbGl0dGVyUGFuZURlZmluaXRpb25zKCk6IEFycmF5PFNwbGl0dGVyUGFuZURlZmluaXRpb24+e1xyXG4gICAgICAgIGxldCBwYW5lRGVmaW5pdGlvbnMgPSBuZXcgQXJyYXk8U3BsaXR0ZXJQYW5lRGVmaW5pdGlvbj4oKTtcclxuICAgICAgICBsZXQgaT0wOyAvLyBUT0RPOiB1c2UgY29ycmVjdCBrZXkgZm9yIGdldHRpbmcgdGhlIGNvcnJlY3QgcGFuZSBkYXRhXHJcbiAgICAgICAgdGhpcy5fd2lkZ2V0cy5mb3JFYWNoKCh3aWRnZXQpID0+IHtcclxuICAgICAgICAgICAgaWYod2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29tcG9uZW50RGVmaW5pdGlvbiA9IG5ldyBDb21wb25lbnREZWZpbml0aW9uKFwiXCIsXCJcIixcIlwiKTtcclxuICAgICAgICAgICAgICAgIGNvbXBvbmVudERlZmluaXRpb24uc2V0KHdpZGdldC5jb21wb25lbnQuZ2V0RGVmaW5pdGlvbigpKTtcclxuICAgICAgICAgICAgICAgIGxldCBwYW5lU2V0dGluZ3M6IElTZXR0aW5nc3x1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGF5b3V0UGFuZSA9IHRoaXMubGF5b3V0UGFuZXNbaV07XHJcbiAgICAgICAgICAgICAgICBpZihsYXlvdXRQYW5lICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFuZVNldHRpbmdzID0gbGF5b3V0UGFuZS5nZXRTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiTGF5b3V0UGFuZSBub3QgZGVmaW5lZCFcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwYW5lRGVmaW5pdGlvbnMucHVzaChuZXcgU3BsaXR0ZXJQYW5lRGVmaW5pdGlvbihjb21wb25lbnREZWZpbml0aW9uLCBwYW5lU2V0dGluZ3MpKTsgXHJcbiAgICAgICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gcGFuZURlZmluaXRpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0U3BsaXR0ZXJQYW5lRGVmaW5pdGlvbnMocGFuZURlZmluaXRpb25zOiBBcnJheTxTcGxpdHRlclBhbmVEZWZpbml0aW9uPil7XHJcbiAgICAgICAgLy8gQ3JlYXRlIHNwbGl0dGVyIHBhbmVzIGFuZCBhZGQgd2lkZ2V0c1xyXG4gICAgICAgIGZvciggbGV0IGkgPSAwOyBpIDwgcGFuZURlZmluaXRpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKHBhbmVEZWZpbml0aW9uc1tpXSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbXBvbmVudERlZmluaXRpb24gPSBwYW5lRGVmaW5pdGlvbnNbaV0uY29tcG9uZW50RGVmaW5pdGlvbjtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgY29tcG9uZW50ID0gQ29tcG9uZW50RmFjdG9yeS5nZXRJbnN0YW5jZSgpLmNyZWF0ZShjb21wb25lbnREZWZpbml0aW9uKTtcclxuICAgICAgICAgICAgICAgIGlmKGNvbXBvbmVudCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNoZWNrIGlmIGluc3RhbmNlIGlzIGEgd2lkZ2V0XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY29tcG9uZW50IGluc3RhbmNlb2YgV2lkZ2V0QmFzZSl7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgd2lkZ2V0ID0gY29tcG9uZW50ICBhcyBJV2lkZ2V0OyAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzcGxpdHRlclN0b3JpbmdEYXRhSWQgPSBjb21wb25lbnREZWZpbml0aW9uLmRlZmF1bHRTZXR0aW5nc0RhdGFJZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc3BsaXR0ZXJTdG9yaW5nRGF0YUlkICE9IFwiXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LnNldERlZmF1bHRDb21wb25lbnRTZXR0aW5nc0RhdGFJZChzcGxpdHRlclN0b3JpbmdEYXRhSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFdpZGdldCh3aWRnZXQsIGNvbXBvbmVudERlZmluaXRpb24uaWQsIFZpZXdUeXBlLkRlZmF1bHQsIC0xKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkNvbXBvbmVudCB3aXRoIGNvbXBvbmVudCB0eXBlICdcIiArIGNvbXBvbmVudERlZmluaXRpb24udHlwZSArIFwiJyBjb3VsZCBub3QgYmUgY3JlYXRlZCFcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNldCBzcGxpdHRlciBwYW5lIHNpemVzXHJcbiAgICAgICAgbGV0IGkgPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLmxheW91dFBhbmVzKSB7XHJcbiAgICAgICAgICAgIGxldCBsYXlvdXRQYW5lID0gdGhpcy5sYXlvdXRQYW5lc1trZXldO1xyXG4gICAgICAgICAgICBsYXlvdXRQYW5lLnNldFNldHRpbmdzKHBhbmVEZWZpbml0aW9uc1tpXS5wYW5lRGF0YSk7XHJcbiAgICAgICAgICAgIGkrKztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIHdpZGdldCB0byB0aGUgc3BsaXR0ZXIgPT4gYSBuZXcgcGFuZSB3aWxsIGJlIGFkZGVkIGZvciB0aGUgd2lkZ2V0IHRvIHRoZSBzcGxpdHRlclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SVdpZGdldH0gd2lkZ2V0XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gICAgICogQHBhcmFtIHtWaWV3VHlwZX0gdmlld1R5cGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbc2l6ZT0tMV1cclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBhZGRXaWRnZXQod2lkZ2V0OiBJV2lkZ2V0LCBuYW1lOiBzdHJpbmcsIHZpZXdUeXBlOiBWaWV3VHlwZSwgc2l6ZTogbnVtYmVyID0gLTEpeyBcclxuICAgICAgICBzdXBlci5hZGRXaWRnZXQod2lkZ2V0LCBuYW1lLCB2aWV3VHlwZSk7XHJcblxyXG4gICAgICAgIGxldCBzcGxpdHRlciA9IHRoaXMuZ2V0U3BsaXR0ZXIoKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgcHJvcGVydGllcyA9IHRoaXMuZ2V0UHJvcGVydGllcyhzcGxpdHRlcik7IFxyXG4gICAgICAgIGxldCBvbGRQYW5lU2l6ZXMgPSB0aGlzLmdldFBhbmVTaXplcyhwcm9wZXJ0aWVzKTtcclxuXHJcbiAgICAgICAgaWYoIXRoaXMuX2lzUmVzcG9uc2l2ZSAmJiBzaXplICE9IC0xKXtcclxuICAgICAgICAgICAgdGhpcy5fYWN0dWFsSGVpZ2h0ICs9IHNpemUgKyB0aGlzLl9kZWZhdWx0U3BsaXR0ZXJTaXplO1xyXG4gICAgICAgICAgICB0aGlzLnJlc2l6ZVNwbGl0dGVyKHRoaXMuX2FjdHVhbFdpZHRoLCB0aGlzLl9hY3R1YWxIZWlnaHQgLSB0aGlzLl9oZWFkZXJIZWlnaHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHBhbmVJZCA9IHRoaXMucGFyZW50Q29udGVudElkICsgXCJwYW5lX1wiICsgbmFtZS5yZXBsYWNlKFwiIFwiLCBcIlwiKTtcclxuICAgICAgICB2YXIgaW5kZXhPZk5ld1BhbmUgPSBzcGxpdHRlci5tb2RlbC5wcm9wZXJ0aWVzIS5sZW5ndGg7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkUGFuZShzcGxpdHRlciwgcGFuZUlkLCBpbmRleE9mTmV3UGFuZSwgc2l6ZSk7XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgIHdpZGdldC5pbml0aWFsaXplKHBhbmVJZCk7XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlTGF5b3V0UGFuZXNBZnRlckFkZGluZ05ld1BhbmUocHJvcGVydGllcywgb2xkUGFuZVNpemVzLCB3aWRnZXQsIHZpZXdUeXBlKTtcclxuXHJcbiAgICAgICAgaWYoIXRoaXMuX2lzUmVzcG9uc2l2ZSl7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0UHJvcGVydGllcyhzcGxpdHRlciwgcHJvcGVydGllcyk7XHJcbiAgICAgICAgICAgIHRoaXMucmVzaXplU3BsaXR0ZXJQYW5lQ29udGVudHModGhpcy5fYWN0dWFsV2lkdGgsIHRoaXMuX2FjdHVhbEhlaWdodC10aGlzLl9oZWFkZXJIZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgYSB3aWRnZXQocGFuZSkgZnJvbSB0aGUgc3BsaXR0ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lXaWRnZXR9IHdpZGdldFxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHJlbW92ZVdpZGdldCh3aWRnZXQ6IElXaWRnZXQpe1xyXG4gICAgICAgIGxldCBwYW5lSW5kZXggPSB0aGlzLmdldFBhbmVJbmRleCh3aWRnZXQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBzcGxpdHRlciA9IHRoaXMuZ2V0U3BsaXR0ZXIoKTtcclxuICAgICAgICAvLyBnZXQgYWxsIGFjdHVhbCBwYW5lU2l6ZXMgXHJcbiAgICAgICAgdmFyIHByb3BlcnRpZXMgPSB0aGlzLmdldFByb3BlcnRpZXMoc3BsaXR0ZXIpOyAgXHJcbiAgICAgICAgdmFyIHNpemVUb1JlbW92ZSA9IHByb3BlcnRpZXNbcGFuZUluZGV4XS5wYW5lU2l6ZTtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgcGFuZVNpemVzID0gdGhpcy5nZXRQYW5lU2l6ZXMocHJvcGVydGllcyk7XHJcbiAgICAgICAgcGFuZVNpemVzLnNwbGljZShwYW5lSW5kZXgsIDEpO1xyXG4gICAgICAgIHNwbGl0dGVyLnJlbW92ZUl0ZW0ocGFuZUluZGV4KTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmFkanVzdENoYXJ0c0RpdkNvbnRhaW5lclNpemUoc2l6ZVRvUmVtb3ZlKTtcclxuICAgICAgICBsZXQgbmV3U3BsaXR0ZXJIZWlnaHQgPSB0aGlzLmFkanVzdFNwbGl0dGVyU2l6ZShzcGxpdHRlciwgc2l6ZVRvUmVtb3ZlKTtcclxuICAgICAgICBcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcHJvcGVydGllcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIHByb3BlcnRpZXNbaV0ucGFuZVNpemUgPSBwYW5lU2l6ZXNbaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMubGF5b3V0UGFuZXMuc3BsaWNlKHBhbmVJbmRleCwxKTtcclxuICAgICAgICB0aGlzLnJlbW92ZVdpZGdldEZyb21MaXN0KHdpZGdldCk7XHJcbiBcclxuICAgICAgICB0aGlzLl9hY3R1YWxIZWlnaHQgPSBuZXdTcGxpdHRlckhlaWdodDtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRQcm9wZXJ0aWVzKHNwbGl0dGVyLCBwcm9wZXJ0aWVzKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBNb3ZlcyBhIHdpZGdldChzcGxpdHRlciBwYW5lKSBmcm9tIHRoZSBzb3VyY2UgaW5kZXggdG8gdGhlIHRhcmdldCBpbmRleFxyXG4gICAgICogKGludGVybmFsOiB0YXJnZXQgaW5kZXggd2lsbCBiZSBkZWNyZWFzZWQgYnkgMSBpZiBzb3VyY2UgaW5kZXggaXMgYmVmb3JlIHRhcmdldCBpbmRleClcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc291cmNlUGFuZUluZGV4XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdGFyZ2V0UGFuZUluZGV4XHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgbW92ZVdpZGdldCh3aWRnZXQ6IElXaWRnZXQsIHRhcmdldFBhbmVJbmRleDogbnVtYmVyKXtcclxuICAgICAgICB3aWRnZXQuZGlzcG9zZSgpO1xyXG5cclxuICAgICAgICBsZXQgc291cmNlUGFuZUluZGV4ID0gdGhpcy5nZXRQYW5lSW5kZXgod2lkZ2V0KTtcclxuICAgICAgICBsZXQgc3BsaXR0ZXIgPSB0aGlzLmdldFNwbGl0dGVyKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGxheW91dFBhbmUgPSB0aGlzLmxheW91dFBhbmVzW3NvdXJjZVBhbmVJbmRleF07XHJcbiAgICAgICAgbGV0IG1vdmluZ1BhbmUgPSAkKHdpZGdldC5jc3NQYXJlbnRDb250ZW50SWQpO1xyXG5cclxuICAgICAgICB0YXJnZXRQYW5lSW5kZXggPSB0aGlzLnVwZGF0YVRhcmdldFBhbmVJbmRleChzb3VyY2VQYW5lSW5kZXgsIHRhcmdldFBhbmVJbmRleCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHByb3BlcnRpZXMgPSB0aGlzLmdldFByb3BlcnRpZXMoc3BsaXR0ZXIpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlUHJvcGVydGllc0xpc3QocHJvcGVydGllcywgc291cmNlUGFuZUluZGV4LCB0YXJnZXRQYW5lSW5kZXgpXHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5yZW1vdmVQYW5lKHNwbGl0dGVyLCBzb3VyY2VQYW5lSW5kZXgpO1xyXG4gICAgICAgIHRoaXMuYWRkUGFuZVdpdGhQYW5lSW5mbyhzcGxpdHRlciwgbGF5b3V0UGFuZSwgdGFyZ2V0UGFuZUluZGV4LCBwcm9wZXJ0aWVzLCBtb3ZpbmdQYW5lKTtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVMYXlvdXRQYW5lc0xpc3RBZnRlck1vdmluZyhsYXlvdXRQYW5lLCBzb3VyY2VQYW5lSW5kZXgsIHRhcmdldFBhbmVJbmRleCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5yZXNpemVTcGxpdHRlcih0aGlzLl9hY3R1YWxXaWR0aCwgdGhpcy5fYWN0dWFsSGVpZ2h0LXRoaXMuX2hlYWRlckhlaWdodCk7XHJcblxyXG4gICAgICAgIC8vIGZvcmNlIGEgcmVpbml0aWFsaXphdGlvbiBvZiB0aGUgY2hhcnQgaW5zdGFuY2UuXHJcbiAgICAgICAgd2lkZ2V0LnJlaW5pdGlhbGl6ZSgpO1xyXG4gICAgICAgIHdpZGdldC5mbGFnZ2VkRm9yUmVzaXplID0gdHJ1ZTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnJlc2l6ZVNwbGl0dGVyUGFuZUNvbnRlbnRzKHRoaXMuX2FjdHVhbFdpZHRoLHRoaXMuX2FjdHVhbEhlaWdodC10aGlzLl9oZWFkZXJIZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVzaXplIGEgd2lkZ2V0IHRvIGEgbmV3IHNpemUgYW5kIGFkYXB0IHRoZSBvdGhlciB3aWRnZXRzIGluIHRoaXMgbGF5b3V0V2lkZ2V0KHNwbGl0dGVyKVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SVdpZGdldH0gd2lkZ2V0XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbmV3U2l6ZVxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHJlc2l6ZVdpZGdldCh3aWRnZXQ6IElXaWRnZXQsIG5ld1NpemU6IG51bWJlcil7XHJcbiAgICAgICAgbGV0IHBhbmVJbmRleCA9IHRoaXMuZ2V0UGFuZUluZGV4KHdpZGdldCk7XHJcbiAgICAgICAgdmFyIHNwbGl0dGVyID0gdGhpcy5nZXRTcGxpdHRlcigpO1xyXG5cclxuICAgICAgICBsZXQgcHJvcGVydGllcyA9IHRoaXMuZ2V0UHJvcGVydGllcyhzcGxpdHRlcikgXHJcbiAgICAgICAgLy8gc2V0IG5ldyBwYW5lIHNpemVzXHJcbiAgICAgICAgbGV0IGN1cnJlbnRQYW5lU2l6ZSA9IHByb3BlcnRpZXNbcGFuZUluZGV4XS5wYW5lU2l6ZTtcclxuICAgICAgICBsZXQgcGFuZURpZmZTaXplID0gY3VycmVudFBhbmVTaXplLW5ld1NpemU7XHJcblxyXG4gICAgICAgIGxldCBzaXplT2ZPdGhlclBhbmUgPSAtMTtcclxuICAgICAgICBsZXQgaW5kZXhPZk90aGVyUGFuZSA9IC0xO1xyXG4gICAgICAgIGlmKHBhbmVJbmRleCArMSA+PSB0aGlzLmxheW91dFBhbmVzLmxlbmd0aCl7XHJcbiAgICAgICAgICAgIC8vIExhc3QgcGFuZSBzaXplIGNoYW5nZWQgPT4gdXBkYXRlIHRoZSBzaXplIG9mIHRoZSBwYW5lIGJlZm9yZVxyXG4gICAgICAgICAgICBzaXplT2ZPdGhlclBhbmUgPSBwcm9wZXJ0aWVzW3BhbmVJbmRleC0xXS5wYW5lU2l6ZStwYW5lRGlmZlNpemU7XHJcbiAgICAgICAgICAgIGluZGV4T2ZPdGhlclBhbmUgPSBwYW5lSW5kZXgtMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSBmb2xsb3dpbmcgcGFuZSBzaXplXHJcbiAgICAgICAgICAgIHNpemVPZk90aGVyUGFuZSA9IHByb3BlcnRpZXNbcGFuZUluZGV4KzFdLnBhbmVTaXplK3BhbmVEaWZmU2l6ZTtcclxuICAgICAgICAgICAgaW5kZXhPZk90aGVyUGFuZSA9IHBhbmVJbmRleCsxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzaXplT2ZPdGhlclBhbmUgPCAwKXtcclxuICAgICAgICAgICAgLy8gQXZvaWQgcmVzaXppbmcgdGhlIGZvbGxvd2luZyBwYW5lKG9yIHRoZSBwYW5lIGJlZm9yZSkgdG8gYSBzaXplIHNtYWxsZXIgdGhlbiAwXHJcbiAgICAgICAgICAgIGxldCBvbGRWYWx1ZSA9IE1hdGguYWJzKHNpemVPZk90aGVyUGFuZSk7XHJcbiAgICAgICAgICAgIHNpemVPZk90aGVyUGFuZSA9IDUwOyAgIFxyXG4gICAgICAgICAgICBuZXdTaXplID0gbmV3U2l6ZSAtIG9sZFZhbHVlIC0gNTA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubGF5b3V0UGFuZXNbaW5kZXhPZk90aGVyUGFuZV0uc2l6ZSA9IHNpemVPZk90aGVyUGFuZTtcclxuICAgICAgICBwcm9wZXJ0aWVzW2luZGV4T2ZPdGhlclBhbmVdLnBhbmVTaXplID0gc2l6ZU9mT3RoZXJQYW5lO1xyXG5cclxuICAgICAgICB0aGlzLmxheW91dFBhbmVzW3BhbmVJbmRleF0uc2l6ZSA9IG5ld1NpemU7XHJcbiAgICAgICAgcHJvcGVydGllc1twYW5lSW5kZXhdLnBhbmVTaXplID0gbmV3U2l6ZTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBVcGRhdGVzIHRoZSBzcGxpdHRlcnNcclxuICAgICAgICB0aGlzLnNldFBhbmVQcm9wZXJ0aWVzVG9TcGxpdHRlcihzcGxpdHRlciwgcHJvcGVydGllcyk7XHJcblxyXG4gICAgICAgIC8vIHVwZGF0ZXMgdGhlIGNvbnRlbnRzIGluIHRoZSBzcGxpdHRlcnNcclxuICAgICAgICB0aGlzLnJlc2l6ZVNwbGl0dGVyUGFuZUNvbnRlbnRzKHRoaXMuX2FjdHVhbFdpZHRoLCB0aGlzLl9hY3R1YWxIZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZWpTcGxpdHRlciBkYXRhIG9iamVjdFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0U3BsaXR0ZXIoKTogYW55e1xyXG4gICAgICAgIHJldHVybiAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKS5kYXRhKFwiZWpTcGxpdHRlclwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHNpemVzIG9mIGFsbCBwYW5lcyB0b2dldGhlciwgaW5jbC4gdGhlIGR5bmFtaWMgcGFuZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3VtT2ZEZWZpbmVkTGF5b3V0UGFuZVNpemVzKCk6IG51bWJlcntcclxuICAgICAgICBsZXQgc3VtOiBudW1iZXIgPSAwO1xyXG4gICAgICAgIGZvcihsZXQga2V5IGluIHRoaXMubGF5b3V0UGFuZXMpIHtcclxuICAgICAgICAgICAgbGV0IGxheW91dFBhbmUgPSAgdGhpcy5sYXlvdXRQYW5lc1trZXldO1xyXG4gICAgICAgICAgICBpZihsYXlvdXRQYW5lICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBzdW0gKz0gbGF5b3V0UGFuZS5zaXplO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdW07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBzaXplcyBvZiBhbGwgcGFuZXMgdG9nZXRoZXIsIHdpdGhvdXQgdGhlIHNpemUgb2YgdGhlIGR5bmFtaWMgcGFuZSBidXQgaW5jbHVkaW5nIHRoZSBzcGxpdHRlciBzaXplKGUuZy4gOXB4KVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3VtT2ZEZWZpbmVkUGFuZVNpemVzKCk6IG51bWJlcntcclxuICAgICAgICBsZXQgc3VtOiBudW1iZXIgPSAwO1xyXG4gICAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgICAgZm9yKGxldCBrZXkgaW4gdGhpcy5sYXlvdXRQYW5lcykge1xyXG4gICAgICAgICAgICBsZXQgbGF5b3V0UGFuZSA9ICB0aGlzLmxheW91dFBhbmVzW2tleV07XHJcbiAgICAgICAgICAgIGlmKGxheW91dFBhbmUgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZihsYXlvdXRQYW5lLmZpbGxTcGFjZSA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VtICs9IGxheW91dFBhbmUuc2l6ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKGluZGV4PjApe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzcGxpdHRlclNpemUgPSB0aGlzLl9kZWZhdWx0U3BsaXR0ZXJTaXplO1xyXG4gICAgICAgICAgICAgICAgICAgIHN1bSArPSBzcGxpdHRlclNpemU7IC8vIEFkZCBzaXplIG9mIHNwbGl0dGVyXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN1bTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGlmIHRoZSBwYW5lIHNpemVzIGFyZSB0b28gYmlnIGZvciB0aGUgY3VycmVudCB3aW5kb3cgc2l6ZSwgdGhlIHBhbmVzIHdvdWxkIGJlIGRlY3JlYXNlZCBpbiBzaXplXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzaXplXHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZG9wdExheW91dFBhbmVzVG9GaXRDdXJyZW50U2l6ZShzaXplOiBudW1iZXIpe1xyXG4gICAgICAgIGxldCBzdW1PZlBhbmVzV2l0b3V0RHluYW1pYyA9IHRoaXMuc3VtT2ZEZWZpbmVkUGFuZVNpemVzKCk7XHJcbiAgICAgICAgbGV0IG5lZWRlZFNpemUgPSBzdW1PZlBhbmVzV2l0b3V0RHluYW1pYyAtIHNpemU7XHJcbiAgICAgICAgaWYobmVlZGVkU2l6ZSA+IDApe1xyXG4gICAgICAgICAgICAvLyBUT0RPOiBnZXQgbGFzdCBub3QgZHluYW1pYyBwYW5lXHJcbiAgICAgICAgICAgIGxldCBsYXN0UGFuZSA9IHRoaXMubGF5b3V0UGFuZXNbdGhpcy5sYXlvdXRQYW5lcy5sZW5ndGgtMV07XHJcbiAgICAgICAgICAgIGxhc3RQYW5lLnNpemUgPSBsYXN0UGFuZS5zaXplLSBuZWVkZWRTaXplO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIG5ldyBwYW5lIGF0IHRoZSBnaXZlbiBpbmRleCB3aXRoIHRoZSBnaXZlbiBzaXplIFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHNwbGl0dGVyXHJcbiAgICAgKiBAcGFyYW0geyp9IHBhbmVJZFxyXG4gICAgICogQHBhcmFtIHsqfSBpbmRleE9mTmV3UGFuZVxyXG4gICAgICogQHBhcmFtIHsqfSBzaXplXHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRQYW5lKHNwbGl0dGVyLCBwYW5lSWQsIGluZGV4T2ZOZXdQYW5lLCBzaXplKXtcclxuICAgICAgICBsZXQgbmV3SXRlbTtcclxuICAgICAgICBpZighdGhpcy5faXNSZXNwb25zaXZlICYmIHNpemUgIT0gLTEpe1xyXG4gICAgICAgICAgICBpZihpbmRleE9mTmV3UGFuZSA9PSAwKXtcclxuICAgICAgICAgICAgICAgIGluZGV4T2ZOZXdQYW5lKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbmV3SXRlbT0gc3BsaXR0ZXIucmVtb3ZlSXRlbShpbmRleE9mTmV3UGFuZS0xKTtcclxuICAgICAgICAgICAgbmV3SXRlbT0gc3BsaXR0ZXIuYWRkSXRlbShcIjxkaXYgaWQ9J1wiICsgcGFuZUlkICsgXCInIHN0eWxlPSdvdmVyZmxvdzpoaWRkZW4nPjwvZGl2PlwiLCB7IHBhbmVTaXplOiBzaXplLCBleHBhbmRhYmxlOiBmYWxzZSwgY29sbGFwc2libGU6IGZhbHNlfSwgaW5kZXhPZk5ld1BhbmUtMSk7XHJcbiAgICAgICAgICAgIG5ld0l0ZW09IHNwbGl0dGVyLmFkZEl0ZW0oXCI8ZGl2IGlkPSdcIiArIHRoaXMucGFyZW50Q29udGVudElkICsgXCJfbGFzdFBhbmVcIiArIFwiJyBzdHlsZT0nb3ZlcmZsb3c6aGlkZGVuOyB3aWR0aDoxMDAlOyBoZWlnaHQ6MTAwJSc+PC9kaXY+XCIsIHsgcGFuZVNpemU6IDQwMCwgZXhwYW5kYWJsZTogZmFsc2UsIGNvbGxhcHNpYmxlOiBmYWxzZX0sIGluZGV4T2ZOZXdQYW5lKTsgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIG5ld0l0ZW0gPSBzcGxpdHRlci5hZGRJdGVtKFwiPGRpdiBpZD0nXCIgKyBwYW5lSWQgKyBcIicgc3R5bGU9J292ZXJmbG93OmhpZGRlbic+PC9kaXY+XCIsIHsgcGFuZVNpemU6IHNpemUsIGV4cGFuZGFibGU6IGZhbHNlLCBjb2xsYXBzaWJsZTogZmFsc2UgfSwgaW5kZXhPZk5ld1BhbmUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYobmV3SXRlbS50b1N0cmluZygpID09IFwiXCIpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRVJST1I6IHNwbGl0dGVyLmFkZEl0ZW1cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIG5ld0l0ZW1bMF0uc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgdGhlIG1vdmVkIHBhbmUgdG8gdGhlIHNwbGl0dGVyIGFuZCBzZXRzIHRoZSBzcGxpdHRlciBvcHRpb25zXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gc3BsaXR0ZXJcclxuICAgICAqIEBwYXJhbSB7Kn0gcGFuZUluZGV4XHJcbiAgICAgKiBAcGFyYW0geyp9IHRhcmdldFBhbmVJbmRleFxyXG4gICAgICogQHBhcmFtIHsqfSBwcm9wZXJ0aWVzXHJcbiAgICAgKiBAcGFyYW0geyp9IG1vdmluZ1BhbmVcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZFBhbmVXaXRoUGFuZUluZm8oc3BsaXR0ZXIsIGxheW91dFBhbmUsIHRhcmdldFBhbmVJbmRleCwgcHJvcGVydGllcywgbW92aW5nUGFuZSl7XHJcbiAgICAgICAgc3BsaXR0ZXIuYWRkSXRlbShtb3ZpbmdQYW5lWzBdLnBhcmVudEVsZW1lbnQhLmlubmVySFRNTCwge2V4cGFuZGFibGU6IGxheW91dFBhbmUuZXhwYW5kYWJsZSwgY29sbGFwc2libGU6IGxheW91dFBhbmUuY29sbGFwc2libGV9LHRhcmdldFBhbmVJbmRleCk7XHJcbiAgICAgICAgdGhpcy5zZXRQcm9wZXJ0aWVzKHNwbGl0dGVyLCBwcm9wZXJ0aWVzKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiAgUmVtb3ZlcyB0aGUgcGFuZSB3aXRoIHRoZSBnaXZlbiBpbmRleCBmcm9tIHRoZSBzcGxpdHRlclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHNwbGl0dGVyXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcGFuZUluZGV4XHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZW1vdmVQYW5lKHNwbGl0dGVyLCBwYW5lSW5kZXg6IG51bWJlcil7XHJcbiAgICAgICAgc3BsaXR0ZXIucmVtb3ZlSXRlbShwYW5lSW5kZXgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlTGF5b3V0UGFuZXNBZnRlckFkZGluZ05ld1BhbmUocHJvcGVydGllcywgb2xkUGFuZVNpemVzLCB3aWRnZXQ6IElXaWRnZXQsIHZpZXdUeXBlKXtcclxuICAgICAgICBpZih0aGlzLl9pc1Jlc3BvbnNpdmUpe1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0YUxheW91dFBhbmVzQWZ0ZXJBZGRpbmdOZXdQYW5lUmVzcG9uc2l2ZShwcm9wZXJ0aWVzLCB3aWRnZXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNleyAgXHJcbiAgICAgICAgICAgIG9sZFBhbmVTaXplc1tvbGRQYW5lU2l6ZXMubGVuZ3RoLTFdID0gdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICAgICAgZm9yKGxldCBpID0wOyBpIDwgcHJvcGVydGllcy5sZW5ndGgtMTsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBuYW1lID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGlmKG9sZFBhbmVTaXplc1tpXSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXNbaV0ucGFuZVNpemUgPSBvbGRQYW5lU2l6ZXNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZSA9IHRoaXMubGF5b3V0UGFuZXNbaV0ubmFtZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYobmFtZSA9PT0gXCJcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZSA9IHdpZGdldC53aWRnZXROYW1lICsgXCJfXCIrIHZpZXdUeXBlLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZSA9IFVuaXF1ZUlkR2VuZXJhdG9yLmdldEluc3RhbmNlKCkuZ2V0VW5pcXVlSWRGcm9tU3RyaW5nKG5hbWUpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgcGFuZVdpZGdldCA9IHdpZGdldDtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMubGF5b3V0UGFuZXNbaV0gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICBwYW5lV2lkZ2V0ID0gdGhpcy5sYXlvdXRQYW5lc1tpXS53aWRnZXQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxheW91dFBhbmVzW2ldICA9ICBuZXcgTGF5b3V0UGFuZShuYW1lLCBwcm9wZXJ0aWVzW2ldLnBhbmVTaXplLCBwYW5lV2lkZ2V0LCBmYWxzZSwgdHJ1ZSwgcHJvcGVydGllc1tpXS5leHBhbmRhYmxlLCBwcm9wZXJ0aWVzW2ldLmNvbGxhcHNpYmxlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0YUxheW91dFBhbmVzQWZ0ZXJBZGRpbmdOZXdQYW5lUmVzcG9uc2l2ZShwcm9wZXJ0aWVzLCB3aWRnZXQpIHtcclxuICAgICAgICBmb3IobGV0IGkgPTA7IGkgPCBwcm9wZXJ0aWVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IG5hbWUgPSBcIlwiO1xyXG4gICAgICAgICAgICBsZXQgaiA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX3dpZGdldHMuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYoaiA9PSBpKXtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lID0ga2V5O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaisrO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGxldCBwYW5lV2lkZ2V0ID0gd2lkZ2V0O1xyXG4gICAgICAgICAgICBpZih0aGlzLmxheW91dFBhbmVzW2ldICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBwYW5lV2lkZ2V0ID0gdGhpcy5sYXlvdXRQYW5lc1tpXS53aWRnZXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5sYXlvdXRQYW5lc1tpXSA9IG5ldyBMYXlvdXRQYW5lKG5hbWUsIHByb3BlcnRpZXNbaV0ucGFuZVNpemUsIHBhbmVXaWRnZXQsZmFsc2UsIHRydWUsIHByb3BlcnRpZXNbaV0uZXhwYW5kYWJsZSwgcHJvcGVydGllc1tpXS5jb2xsYXBzaWJsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gIFxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBwcm9wZXJ0aWVzIHdpdGggdGhlIGluZm9ybWF0aW9ucyBmcm9tIHRoZSBsYXlvdXRQYW5lIGRlZmluaXRpb25zO1xyXG4gICAgICogU2l6ZSBvZiBkeW5hbWljIHBhbmUgd2lsbCBiZSBjYWxjdWxhdGVkIGJ5IHVzaW5nIHRoZSBhY3R1YWwgd2lkZ2V0IHNpemVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBwcm9wZXJ0aWVzXHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVQcm9wZXJ0aWVzSW5mb3JtYXRpb25zV2l0aExheW91dFBhbmVzRGF0YShwcm9wZXJ0aWVzKXsgICBcclxuICAgICAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgICAgIGZvcihsZXQga2V5IGluIHRoaXMubGF5b3V0UGFuZXMpIHtcclxuICAgICAgICAgICAgbGV0IGxheW91dFBhbmUgPSAgdGhpcy5sYXlvdXRQYW5lc1trZXldO1xyXG4gICAgICAgICAgICBpZihsYXlvdXRQYW5lID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgaWYobGF5b3V0UGFuZS5maWxsU3BhY2UgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXNbaW5kZXhdLnBhbmVTaXplID0gbGF5b3V0UGFuZS5zaXplO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc2l6ZSA9IHRoaXMuX2FjdHVhbFdpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuX29yaWVudGF0aW9uID09IGVqLk9yaWVudGF0aW9uLlZlcnRpY2FsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZSA9IHRoaXMuX2FjdHVhbEhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllc1tpbmRleF0ucGFuZVNpemUgPSBzaXplIC0gdGhpcy5zdW1PZkRlZmluZWRMYXlvdXRQYW5lU2l6ZXMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHByb3BlcnRpZXNbaW5kZXhdLmV4cGFuZGFibGUgPSBsYXlvdXRQYW5lLmV4cGFuZGFibGU7XHJcbiAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzW2luZGV4XS5jb2xsYXBzaWJsZSA9IGxheW91dFBhbmUuY29sbGFwc2libGU7XHJcbiAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzW2luZGV4XS5yZXNpemFibGUgPSBsYXlvdXRQYW5lLnJlc2l6YWJsZTtcclxuICAgICAgICAgICAgICAgIHByb3BlcnRpZXNbaW5kZXhdLm1pblNpemUgPSBsYXlvdXRQYW5lLm1pbmltdW1TaXplO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiByZXNpemUgdGhlIHNwbGl0dGVyIGFuZCB1cGRhdGUgdGhlIHNwbGl0dGVyIHBhbmVzaXplc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gd2lkdGhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlc2l6ZVNwbGl0dGVyKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKXtcclxuICAgICAgICB2YXIgc3BsaXR0ZXIgPSB0aGlzLmdldFNwbGl0dGVyKCk7XHJcblxyXG4gICAgICAgIHNwbGl0dGVyLm9wdGlvbihcIndpZHRoXCIsIHdpZHRoLCB0cnVlKTtcclxuICAgICAgICBzcGxpdHRlci5vcHRpb24oXCJoZWlnaHRcIiwgaGVpZ2h0LCB0cnVlKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgcHJvcGVydGllcyA9IHRoaXMuZ2V0UHJvcGVydGllcyhzcGxpdHRlcik7IFxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMudXBkYXRlUGFuZVByb3BlcnRpZXMocHJvcGVydGllcywgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5zZXRQYW5lUHJvcGVydGllc1RvU3BsaXR0ZXIoc3BsaXR0ZXIsIHByb3BlcnRpZXMpO1xyXG4gICAgfSAgIFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgcGFuZXNpemUgaW4gdGhlIHByb3BlcnRpZXMgZm9yIHRoZSBuZXcgaGVpZ2h0L3dpZHRoXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gcHJvcGVydGllc1xyXG4gICAgICogQHBhcmFtIHsqfSB3aWR0aFxyXG4gICAgICogQHBhcmFtIHsqfSBoZWlnaHRcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZVBhbmVQcm9wZXJ0aWVzKHByb3BlcnRpZXMsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKXtcclxuICAgICAgICBcclxuICAgICAgICAvLyBTZXQgYWxsIGtub3cgcGFuZSBzaXplc1xyXG4gICAgICAgIHRoaXMuc2V0S25vd25QYW5lU2l6ZXMocHJvcGVydGllcyk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAvLyBTZXQgYWxsIGR5bmFtaWMgcGFuZSBzaXplc1xyXG4gICAgICAgIHRoaXMuc2V0RHluYW1pY1BhbmVTaXplcyhwcm9wZXJ0aWVzLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldEtub3duUGFuZVNpemVzKHByb3BlcnRpZXMpe1xyXG4gICAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgICAgZm9yKGxldCBrZXkgaW4gdGhpcy5sYXlvdXRQYW5lcykge1xyXG4gICAgICAgICAgICBsZXQgbGF5b3V0UGFuZSA9ICB0aGlzLmxheW91dFBhbmVzW2tleV07XHJcbiAgICAgICAgICAgIGlmKGxheW91dFBhbmUgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZihsYXlvdXRQYW5lLmZpbGxTcGFjZSA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllc1tpbmRleF0ucGFuZVNpemUgPSBsYXlvdXRQYW5lLnNpemU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXREeW5hbWljUGFuZVNpemVzKHByb3BlcnRpZXMsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKXtcclxuICAgICAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgICAgIGZvcihsZXQga2V5IGluIHRoaXMubGF5b3V0UGFuZXMpIHtcclxuICAgICAgICAgICAgbGV0IGxheW91dFBhbmUgPSAgdGhpcy5sYXlvdXRQYW5lc1trZXldO1xyXG4gICAgICAgICAgICBpZihsYXlvdXRQYW5lID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgaWYobGF5b3V0UGFuZS5maWxsU3BhY2UgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5fb3JpZW50YXRpb24gPT0gZWouT3JpZW50YXRpb24uVmVydGljYWwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzW2luZGV4XS5wYW5lU2l6ZSA9IGhlaWdodCAtIHRoaXMuc3VtT2ZEZWZpbmVkUGFuZVNpemVzKCk7IFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzW2luZGV4XS5wYW5lU2l6ZSA9IHdpZHRoIC0gdGhpcy5zdW1PZkRlZmluZWRQYW5lU2l6ZXMoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgZ2l2ZW4gcHJvcGVydGllcyhwYW5lc2l6ZXMsIC4uLikgdG8gdGhlIGVqc3BsaXR0ZXJcclxuICAgICAqIGlmIHRoZSBsYXN0IHBhbmVzaXplIGlzIHVuZGVyIDFweCBhIGNvcnJlY3Rpb24gb2YgdGhlIHBhbmVzaXplIHdpbGwgYmUgZG9uZTsgb2NjdXJlcyBzb21ldGltZXMgaW4gY2FzZSBvZiBicm93c2VyIHpvb21cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBzcGxpdHRlclxyXG4gICAgICogQHBhcmFtIHsqfSBwcm9wZXJ0aWVzXHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRQYW5lUHJvcGVydGllc1RvU3BsaXR0ZXIoc3BsaXR0ZXIsIHByb3BlcnRpZXMpe1xyXG4gICAgICAgIHRoaXMuc2V0UHJvcGVydGllcyhzcGxpdHRlciwgcHJvcGVydGllcyk7XHJcbiAgICAgICAgaWYoKDxhbnk+c3BsaXR0ZXIpLnBhbmVzLmxlbmd0aCA+IDApIHsgXHJcbiAgICAgICAgICAgIGxldCBsYXN0UGFuZSA9ICg8YW55PnNwbGl0dGVyKS5wYW5lc1soPGFueT5zcGxpdHRlcikucGFuZXMubGVuZ3RoLTFdO1xyXG4gICAgICAgICAgICBpZihsYXN0UGFuZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGxhc3RQYW5lU2l6ZVN0cmluZyA9IGxhc3RQYW5lLnN0eWxlLndpZHRoO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5fb3JpZW50YXRpb24gPT0gZWouT3JpZW50YXRpb24uVmVydGljYWwpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3RQYW5lU2l6ZVN0cmluZyA9IGxhc3RQYW5lLnN0eWxlLmhlaWdodDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBsYXN0UGFuZVNpemUgPSBwYXJzZUZsb2F0KGxhc3RQYW5lU2l6ZVN0cmluZyk7XHJcbiAgICAgICAgICAgICAgICBpZihsYXN0UGFuZVNpemUgPD0gMC45OTk5ICYmIHByb3BlcnRpZXNbcHJvcGVydGllcy5sZW5ndGgtMV0ucGFuZVNpemUgPiAwKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyBTaXplIG9mIGxhc3Qgc3BsaXR0ZXIgcGFuZSB3YXMgbm90IHNldCBjb3JyZWN0ID0+IHRvIGxlc3Mgc3BhY2UhXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgYnJvd3NlciB6b29tIGlzIHVzZWQgdGhlIHNpemVzIHdpbGwgYmUgZGVmaW5lZCB3aXRoIGRlY2ltYWxwbGFjZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlIGVqU3BsaXR0ZXIgc2V0cyB0aGUgc2l6ZSBvZiB0aGUgbGFzdCBwYW5lIHRvIDAgaWYgaXQgaXMgYSBsaXR0bGUgYml0IHRvIHRhbGwgKGUuZy4gXCIwLjFweFwiKSA9PiBwYW5lIHdpbGwgbm90IGJlIHNob3duXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU2V0IGxhc3QgcGFuZSBhIGxpdHRsZSBiaXQgc21hbGxlclxyXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXNbcHJvcGVydGllcy5sZW5ndGgtMV0ucGFuZVNpemUtLTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFByb3BlcnRpZXMoc3BsaXR0ZXIsIHByb3BlcnRpZXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgc3BsaXR0ZXIgcGFuZSBjb250ZW50IHNpemVzICh3aWRnZXQgc2l6ZXMpXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodFxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVzaXplU3BsaXR0ZXJQYW5lQ29udGVudHMod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpe1xyXG4gICAgICAgIC8vIFNldCB0aGUgc2l6ZXMgb2YgdGhlIHNwbGl0dGVyIHBhbmVjb250ZW50c1xyXG4gICAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMubGF5b3V0UGFuZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgd2lkZ2V0ID0gdGhpcy5fd2lkZ2V0cy5nZXQodGhpcy5sYXlvdXRQYW5lc1tpXS5uYW1lKTtcclxuICAgICAgICAgICAgaWYod2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgd2lkZ2V0V2lkdGggPSB3aWR0aDtcclxuICAgICAgICAgICAgICAgIGxldCB3aWRnZXRIZWlnaHQgPSBoZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5fb3JpZW50YXRpb24gPT0gZWouT3JpZW50YXRpb24uVmVydGljYWwpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMubGF5b3V0UGFuZXNbaW5kZXhdLmZpbGxTcGFjZSA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0SGVpZ2h0ID0gaGVpZ2h0IC0gdGhpcy5zdW1PZkRlZmluZWRQYW5lU2l6ZXMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYod2lkZ2V0SGVpZ2h0IDwgMCl7IC8vIE5vIHBsYWNlIGZvciBkeW5hbWljIHBhbmUsIG1heWJlIGFsc28gb3RoZXIgcGFuZXMgaGF2ZSB0byBiZSBhZG9wdGVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkb3B0TGF5b3V0UGFuZXNUb0ZpdEN1cnJlbnRTaXplKGhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXRIZWlnaHQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldEhlaWdodCA9IHRoaXMubGF5b3V0UGFuZXNbaW5kZXhdLnNpemU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5sYXlvdXRQYW5lc1tpbmRleF0uZmlsbFNwYWNlID09IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXRXaWR0aCA9IHdpZHRoIC0gdGhpcy5zdW1PZkRlZmluZWRQYW5lU2l6ZXMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYod2lkZ2V0V2lkdGggPCAwKXsgLy8gTm8gcGxhY2UgZm9yIGR5bmFtaWMgcGFuZSwgbWF5YmUgYWxzbyBvdGhlciBwYW5lcyBoYXZlIHRvIGJlIGFkb3B0ZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRvcHRMYXlvdXRQYW5lc1RvRml0Q3VycmVudFNpemUod2lkdGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0V2lkdGggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldFdpZHRoID0gdGhpcy5sYXlvdXRQYW5lc1tpbmRleF0uc2l6ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB3aWRnZXQucmVzaXplKHdpZGdldFdpZHRoLCB3aWRnZXRIZWlnaHQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGxheW91dCBwYW5lcyBcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBzcGxpdGJhckluZGV4XHJcbiAgICAgKiBAcGFyYW0geyp9IHByZXZQYW5lU2l6ZVxyXG4gICAgICogQHBhcmFtIHsqfSBuZXh0UGFuZVNpemVcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZUxheW91dFBhbmVzT25TcGxpdHRlclJlc2l6ZShzcGxpdGJhckluZGV4LCBwcmV2UGFuZVNpemUsIG5leHRQYW5lU2l6ZSl7XHJcbiAgICAgICAgbGV0IHNwbGl0dGVyID0gdGhpcy5nZXRTcGxpdHRlcigpO1xyXG4gICAgICAgIGxldCBwcm9wZXJ0aWVzID0gdGhpcy5nZXRQcm9wZXJ0aWVzKHNwbGl0dGVyKTtcclxuXHJcbiAgICAgICAgaWYoIXRoaXMuX2lzUmVzcG9uc2l2ZSl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubGF5b3V0UGFuZXNbc3BsaXRiYXJJbmRleCArIDFdICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzW3NwbGl0YmFySW5kZXggKyAxXS5wYW5lU2l6ZSA9IHRoaXMubGF5b3V0UGFuZXNbc3BsaXRiYXJJbmRleCArIDFdLnNpemU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5sYXlvdXRQYW5lc1tzcGxpdGJhckluZGV4KzFdLnNpemUgPSBuZXh0UGFuZVNpemU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0UHJvcGVydGllcyhzcGxpdHRlciwgcHJvcGVydGllcyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IG9sZFNpemUgPSB0aGlzLmxheW91dFBhbmVzW3NwbGl0YmFySW5kZXhdLnNpemVcclxuICAgICAgICB0aGlzLmxheW91dFBhbmVzW3NwbGl0YmFySW5kZXhdLnNpemUgPSBwcmV2UGFuZVNpemU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoIXRoaXMuX2lzUmVzcG9uc2l2ZSl7XHJcbiAgICAgICAgICAgIHRoaXMuX2FjdHVhbEhlaWdodCArPSAocHJldlBhbmVTaXplIC0gb2xkU2l6ZSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVzaXplU3BsaXR0ZXIodGhpcy5fYWN0dWFsV2lkdGgsIHRoaXMuX2FjdHVhbEhlaWdodC10aGlzLl9oZWFkZXJIZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNvcnJlY3RzIHRoZSB0YXJnZXQgaW5kZXggaWYgc291cmNlIGluZGV4IGlzIGJlZm9yZSB0YXJnZXQgaW5kZXhcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNvdXJjZVBhbmVJbmRleFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRhcmdldFBhbmVJbmRleFxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0YVRhcmdldFBhbmVJbmRleChzb3VyY2VQYW5lSW5kZXg6IG51bWJlciwgdGFyZ2V0UGFuZUluZGV4OiBudW1iZXIpOiBudW1iZXJ7XHJcbiAgICAgICAgaWYoc291cmNlUGFuZUluZGV4IDwgdGFyZ2V0UGFuZUluZGV4KXtcclxuICAgICAgICAgICAgLy8gbW92ZWQgZWxlbWVudCBpcyBpbiBsaXN0IGJlZm9yZSB0YXJnZXQgcG9zaXRpb24gYW5kIHdhcyByZW1vdmVkIGJlZm9yZSwgc28gaW5kZXggbXVzdCBiZSBkZWNyZWFzZWQgdG8gZ2V0IGNvcnJlY3QgaW5zZXJ0IHBvc2l0aW9uXHJcbiAgICAgICAgICAgIHRhcmdldFBhbmVJbmRleC0tO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGFyZ2V0UGFuZUluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgcHJvcGVydGllcyBmcm9tIHRoZSBlalNwbGl0dGVyXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gc3BsaXR0ZXJcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRQcm9wZXJ0aWVzKHNwbGl0dGVyKXtcclxuICAgICAgICByZXR1cm4gc3BsaXR0ZXIub3B0aW9uKFwicHJvcGVydGllc1wiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHByb3BlcnRpZXMgb2YgdGhlIGVqU3BsaXR0ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBzcGxpdHRlclxyXG4gICAgICogQHBhcmFtIHsqfSBwcm9wZXJ0aWVzXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0UHJvcGVydGllcyhzcGxpdHRlciwgcHJvcGVydGllcyl7XHJcbiAgICAgICAgc3BsaXR0ZXIub3B0aW9uKFwicHJvcGVydGllc1wiLCBwcm9wZXJ0aWVzLCB0cnVlKTsgLy8gZm9yY2UgdGhlIHNldHRpbmcgdG8gcmVzaXplIHRoZSBjaGFydCBzcGxpdHRlcnNcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBwcm9wZXJ0aWVzID0+IG1vdmVzIHRoZSBwcm9wZXJ0eSBpbmZvcm1hdGlvbnMgZnJvbSBzb3VyY2UgdG8gdGFyZ2V0IGluZGV4XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gcHJvcGVydGllc1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNvdXJjZVBhbmVJbmRleFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRhcmdldFBhbmVJbmRleFxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlUHJvcGVydGllc0xpc3QocHJvcGVydGllcywgc291cmNlUGFuZUluZGV4OiBudW1iZXIsIHRhcmdldFBhbmVJbmRleDogbnVtYmVyKXtcclxuICAgICAgICBsZXQgcGFuZVByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzW3NvdXJjZVBhbmVJbmRleF07XHJcbiAgICAgICAgcHJvcGVydGllcy5zcGxpY2Uoc291cmNlUGFuZUluZGV4LCAxKTtcclxuICAgICAgICBwcm9wZXJ0aWVzLnNwbGljZSh0YXJnZXRQYW5lSW5kZXgsIDAsIHBhbmVQcm9wZXJ0aWVzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGxheW91dCBwYW5lcyBsaXN0IGFmdGVyIG1vdmluZ1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGxheW91dFBhbmVcclxuICAgICAqIEBwYXJhbSB7Kn0gc291cmNlUGFuZUluZGV4XHJcbiAgICAgKiBAcGFyYW0geyp9IHRhcmdldFBhbmVJbmRleFxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlTGF5b3V0UGFuZXNMaXN0QWZ0ZXJNb3ZpbmcobGF5b3V0UGFuZSwgc291cmNlUGFuZUluZGV4LCB0YXJnZXRQYW5lSW5kZXgpe1xyXG4gICAgICAgIHRoaXMubGF5b3V0UGFuZXMuc3BsaWNlKHNvdXJjZVBhbmVJbmRleCwgMSk7XHJcbiAgICAgICAgdGhpcy5sYXlvdXRQYW5lcy5zcGxpY2UodGFyZ2V0UGFuZUluZGV4LCAwLCBsYXlvdXRQYW5lKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHBhbmUgaW5kZXggb2YgdGhlIGdpdmVuIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHdpZGdldFxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFBhbmVJbmRleCh3aWRnZXQpOiBudW1iZXJ7XHJcbiAgICAgICAgbGV0IHBhbmVJbmRleCA9IC0xO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sYXlvdXRQYW5lcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubGF5b3V0UGFuZXNbaV0ud2lkZ2V0ID09IHdpZGdldCl7XHJcbiAgICAgICAgICAgICAgICBwYW5lSW5kZXggPSBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwYW5lSW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIHRoZSB3aWRnZXQgZnJvbSB0aGUgd2lkZ2V0cyBsaXN0IG9mIHRoaXMgbGF5b3V0IHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHdpZGdldFxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVtb3ZlV2lkZ2V0RnJvbUxpc3Qod2lkZ2V0KXtcclxuICAgICAgICB0aGlzLl93aWRnZXRzLmZvckVhY2goKHdpZGdldFRlbXAsIGtleSkgPT4ge1xyXG4gICAgICAgICAgICBpZih3aWRnZXRUZW1wID09IHdpZGdldCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl93aWRnZXRzLmRlbGV0ZShrZXkpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkanVzdCBjaGFydHMgZGl2IGNvbnRhaW5lciA9PiByZW1vdmUgY2hhcnQgc2l6ZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHNpemVUb1JlbW92ZVxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRqdXN0Q2hhcnRzRGl2Q29udGFpbmVyU2l6ZShzaXplVG9SZW1vdmUpe1xyXG4gICAgICAgIHZhciBhY3R1YWxIZWlnaHQgPSAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKS5oZWlnaHQoKTtcclxuICAgICAgICB2YXIgaW50ZXJuYWxDb250YWluZXIgPSAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKVswXTtcclxuICAgICAgICBpbnRlcm5hbENvbnRhaW5lci5zdHlsZS5oZWlnaHQhID0gKGFjdHVhbEhlaWdodCEgLSBzaXplVG9SZW1vdmUgLSA0MDAgKyB0aGlzLl9kZWZhdWx0U3BsaXR0ZXJTaXplKSArIFwicHhcIjsgLy8gUmVtb3ZlIHBhbmUgc2l6ZSArIHNwbGl0dGVyIHNpemUoOXB4KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogIEFkanVzdCBlalNwbGl0dGVyIHNpemVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBzcGxpdHRlclxyXG4gICAgICogQHBhcmFtIHsqfSBzaXplVG9SZW1vdmVcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIG5ldyBzcGxpdHRlciBzaXplIGFmdGVyIHJlbW92aW5nXHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGp1c3RTcGxpdHRlclNpemUoc3BsaXR0ZXIsIHNpemVUb1JlbW92ZSk6IG51bWJlcntcclxuICAgICAgICBsZXQgYWN0dWFsU3BsaXR0ZXJIZWlnaHQgPSBzcGxpdHRlci5vcHRpb24oXCJoZWlnaHRcIik7XHJcbiAgICAgICAgbGV0IG5ld1NwbGl0dGVySGVpZ2h0ID0gcGFyc2VJbnQoYWN0dWFsU3BsaXR0ZXJIZWlnaHQsIDEwKTsgLy8gcGFyc2VJbnQgdG8gcmVtb3ZlIFwicHhcIlxyXG4gICAgICAgIG5ld1NwbGl0dGVySGVpZ2h0IC09IHNpemVUb1JlbW92ZSArIHRoaXMuX2RlZmF1bHRTcGxpdHRlclNpemU7IC8vIFJlbW92ZSBwYW5lIHNpemUgKyBzcGxpdHRlciBzaXplKDlweClcclxuICAgICAgICBzcGxpdHRlci5vcHRpb24oXCJoZWlnaHRcIiwgbmV3U3BsaXR0ZXJIZWlnaHQsIHRydWUpOyAvLyBUT0RPOiBub3Qgb25seSBoZWlnaHQsIGFsc28gd2lkdGggXHJcbiAgICAgICAgcmV0dXJuIG5ld1NwbGl0dGVySGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTm90aWZpZXMgdGhhdCBzcGxpdHRlciBoYXMgcmVzaXplZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25TcGxpdHRlclJlc2l6ZShhcmdzKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVMYXlvdXRQYW5lc09uU3BsaXR0ZXJSZXNpemUoYXJncy5zcGxpdGJhckluZGV4LCBhcmdzLnByZXZQYW5lLnNpemUsIGFyZ3MubmV4dFBhbmUuc2l6ZSk7XHJcbiAgICAgICAgdGhpcy5yZXNpemVTcGxpdHRlclBhbmVDb250ZW50cyh0aGlzLl9hY3R1YWxXaWR0aCwgdGhpcy5fYWN0dWFsSGVpZ2h0LXRoaXMuX2hlYWRlckhlaWdodClcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgbGlzdCB3aXRoIG9ubHkgdGhlIHNpemVzIG9mIHRoZSBwYW5lc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHByb3BlcnRpZXNcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRQYW5lU2l6ZXMocHJvcGVydGllcyk6IEFycmF5PHN0cmluZz4ge1xyXG4gICAgICAgIHZhciBwYW5lU2l6ZXMgPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xyXG4gICAgICAgIHByb3BlcnRpZXMuZm9yRWFjaChwcm9wZXJ0eSA9PiB7XHJcbiAgICAgICAgICAgIHBhbmVTaXplcy5wdXNoKHByb3BlcnR5LnBhbmVTaXplKTsgICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcGFuZVNpemVzO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge1NwbGl0dGVyV2lkZ2V0fTsiXX0=