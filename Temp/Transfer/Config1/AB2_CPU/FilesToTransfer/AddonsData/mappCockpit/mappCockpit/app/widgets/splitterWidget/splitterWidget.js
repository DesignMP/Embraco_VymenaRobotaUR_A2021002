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
define(["require", "exports", "../common/layoutWidgetBase", "./layoutPane", "../common/uniqueIdGenerator"], function (require, exports, layoutWidgetBase_1, layoutPane_1, uniqueIdGenerator_1) {
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
        SplitterWidget.prototype.setHeaderContent = function (content) {
            $("#" + this._headerContainerId)[0].innerHTML = content;
        };
        SplitterWidget.prototype.setOrientation = function (verticalOrientation) {
            if (verticalOrientation) {
                this._orientation = ej.Orientation.Vertical;
            }
            else {
                this._orientation = ej.Orientation.Horizontal;
            }
        };
        SplitterWidget.prototype.setResponsive = function (isResponsive) {
            this._isResponsive = isResponsive;
            this._actualHeight = 400;
        };
        /**
         * Creates the layout of the widget
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
            // Set orientation before get properties to the the correct paneSizes(height/width)
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
            for (var key in this._widgets) {
                var widget = this._widgets[key];
                if (widget != undefined) {
                    widget.activate();
                }
            }
        };
        SplitterWidget.prototype.deactivate = function () {
            for (var key in this._widgets) {
                var widget = this._widgets[key];
                if (widget != undefined) {
                    widget.deactivate();
                }
            }
        };
        SplitterWidget.prototype.dispose = function () {
            for (var key in this._widgets) {
                var widget = this._widgets[key];
                if (widget != undefined) {
                    widget.dispose();
                }
            }
            _super.prototype.dispose.call(this);
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
            for (var i = 0; i < properties.length; i++) {
                var name_2 = Object.keys(this._widgets)[i];
                var paneWidget = widget;
                if (this.layoutPanes[i] != undefined) {
                    paneWidget = this.layoutPanes[i].widget;
                }
                this.layoutPanes[i] = new layoutPane_1.LayoutPane(name_2, properties[i].paneSize, paneWidget, false, true, properties[i].expandable, properties[i].collapsible);
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
                var widget = this._widgets[this.layoutPanes[i].name];
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
            for (var key in this._widgets) {
                if (this._widgets[key] == widget) {
                    delete this._widgets[key];
                }
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXR0ZXJXaWRnZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvc3BsaXR0ZXJXaWRnZXQvc3BsaXR0ZXJXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQU1BO1FBQTZCLGtDQUFnQjtRQUE3QztZQUFBLHFFQWcyQkM7WUE5MUJHLHlCQUF5QjtZQUNqQixtQkFBYSxHQUFHLENBQUMsQ0FBQztZQUVsQixrQkFBWSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDO1lBSXpDLG1CQUFhLEdBQVksSUFBSSxDQUFDO1lBSTlCLDBCQUFvQixHQUFXLENBQUMsQ0FBQyxDQUFDLGlDQUFpQzs7UUFtMUIvRSxDQUFDO1FBajFCRyxtQ0FBVSxHQUFWLFVBQVcsaUJBQXlCLEVBQUUsWUFBdUI7WUFBdkIsNkJBQUEsRUFBQSxnQkFBdUI7WUFDekQsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGlCQUFpQixDQUFDO1lBQzVDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDO1lBRXpCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztZQUUvQixJQUFJLENBQUMsYUFBYSxHQUFHLFlBQVksQ0FBQztZQUNsQyx1QkFBdUI7WUFDdkIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGlCQUFpQixHQUFHLFNBQVMsQ0FBQztZQUN4RCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsaUJBQWlCLEdBQUcsT0FBTyxDQUFDO1lBRXBELGNBQWM7WUFDZCxJQUFHLFlBQVksSUFBSSxDQUFDLEVBQUM7Z0JBQ2pCLENBQUMsQ0FBQyxHQUFHLEdBQUUsaUJBQWlCLENBQUMsQ0FBQyxNQUFNLENBQUMsZ0NBQWdDLEdBQUUsSUFBSSxDQUFDLGtCQUFrQixHQUFHLG1CQUFtQixHQUFFLElBQUksQ0FB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UUFDSyx5Q0FBZ0IsR0FBeEIsVUFBeUIsSUFBSTtZQUN6QixJQUFJLENBQUMsaUNBQWlDLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ25HLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxhQUFhLEdBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFBO1FBQzdGLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0sscUNBQVksR0FBcEIsVUFBcUIsVUFBVTtZQUMzQixJQUFJLFNBQVMsR0FBRyxJQUFJLEtBQUssRUFBVSxDQUFDO1lBQ3BDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQSxRQUFRO2dCQUN2QixTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN0QyxDQUFDLENBQUMsQ0FBQztZQUNILE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFDTCxxQkFBQztJQUFELENBQUMsQUFoMkJELENBQTZCLG1DQUFnQixHQWcyQjVDO0lBRU8sd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMYXlvdXRXaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi9sYXlvdXRXaWRnZXRCYXNlXCI7XHJcbmltcG9ydCB7IElXaWRnZXQgfSBmcm9tIFwiLi4vY29tbW9uL2ludGVyZmFjZXMvd2lkZ2V0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IExheW91dFBhbmUgfSBmcm9tIFwiLi9sYXlvdXRQYW5lXCI7XHJcbmltcG9ydCB7IFZpZXdUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi92aWV3VHlwZVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IFVuaXF1ZUlkR2VuZXJhdG9yIH0gZnJvbSBcIi4uL2NvbW1vbi91bmlxdWVJZEdlbmVyYXRvclwiO1xyXG5cclxuY2xhc3MgU3BsaXR0ZXJXaWRnZXQgZXh0ZW5kcyBMYXlvdXRXaWRnZXRCYXNle1xyXG4gICAgXHJcbiAgICAvLyBTZXQgc29tZSBkZWZhdWx0IHNpemVzXHJcbiAgICBwcml2YXRlIF9oZWFkZXJIZWlnaHQgPSAwO1xyXG5cclxuICAgIHByaXZhdGUgX29yaWVudGF0aW9uID0gZWouT3JpZW50YXRpb24uSG9yaXpvbnRhbDtcclxuXHJcbiAgICBwcml2YXRlIF9oZWFkZXJDb250YWluZXJJZDtcclxuXHRwcml2YXRlIF9tYWluQ29udGFpbmVySWQ7XHJcbiAgICBwcml2YXRlIF9pc1Jlc3BvbnNpdmU6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIHByaXZhdGUgX2xheW91dENvbnRhaW5lcklkITogc3RyaW5nO1xyXG5cclxuICAgIHByaXZhdGUgX2RlZmF1bHRTcGxpdHRlclNpemU6IG51bWJlciA9IDk7IC8vIFRPRE8gZ2V0IGFjdHVhbCBzcGxpdHRlciBzaXplIFxyXG5cclxuICAgIGluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQ6IHN0cmluZywgaGVhZGVySGVpZ2h0Om51bWJlciA9IDApIHtcclxuICAgICAgICB0aGlzLl9sYXlvdXRDb250YWluZXJJZCA9IGxheW91dENvbnRhaW5lcklkO1xyXG4gICAgICAgIHRoaXMuX2FjdHVhbFdpZHRoID0gMTAwMDtcclxuICAgICAgICB0aGlzLl9hY3R1YWxIZWlnaHQgPSA0MDA7XHJcblxyXG4gICAgICAgIHRoaXMubGF5b3V0UGFuZXMgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgIFxyXG4gICAgICAgIHRoaXMuX2hlYWRlckhlaWdodCA9IGhlYWRlckhlaWdodDtcclxuICAgICAgICAvLyBBZGQgYWRkaXRpb25hbCBkaXZzIFxyXG4gICAgICAgIHRoaXMuX2hlYWRlckNvbnRhaW5lcklkID0gbGF5b3V0Q29udGFpbmVySWQgKyBcIl9oZWFkZXJcIjtcclxuICAgICAgICB0aGlzLl9tYWluQ29udGFpbmVySWQgPSBsYXlvdXRDb250YWluZXJJZCArIFwiX21haW5cIjtcclxuICAgICAgICBcclxuICAgICAgICAvLyBBZGQgaGVhZGVyIFxyXG4gICAgICAgIGlmKGhlYWRlckhlaWdodCAhPSAwKXtcclxuICAgICAgICAgICAgJChcIiNcIisgbGF5b3V0Q29udGFpbmVySWQpLmFwcGVuZChcIjxkaXYgY2xhc3M9J3dpZGdldEhlYWRlcicgaWQ9J1wiKyB0aGlzLl9oZWFkZXJDb250YWluZXJJZCArIFwiJyBzdHlsZT0naGVpZ2h0OiBcIisgdGhpcy5faGVhZGVySGVpZ2h0ICsgXCJweCc+PC9kaXY+XCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgICQoXCIjXCIrIGxheW91dENvbnRhaW5lcklkKS5hcHBlbmQoXCI8ZGl2IGlkPSdcIisgdGhpcy5fbWFpbkNvbnRhaW5lcklkICsgXCInPjwvZGl2PlwiKVxyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemUodGhpcy5fbWFpbkNvbnRhaW5lcklkKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRIZWFkZXJDb250ZW50KGNvbnRlbnQ6c3RyaW5nKXtcclxuXHRcdCQoXCIjXCIrIHRoaXMuX2hlYWRlckNvbnRhaW5lcklkKVswXS5pbm5lckhUTUwgPSBjb250ZW50O1xyXG5cdH1cclxuXHJcbiAgICBzZXRPcmllbnRhdGlvbih2ZXJ0aWNhbE9yaWVudGF0aW9uOiBib29sZWFuKXtcclxuICAgICAgICBpZih2ZXJ0aWNhbE9yaWVudGF0aW9uKXtcclxuICAgICAgICAgICAgdGhpcy5fb3JpZW50YXRpb24gPSBlai5PcmllbnRhdGlvbi5WZXJ0aWNhbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fb3JpZW50YXRpb24gPSBlai5PcmllbnRhdGlvbi5Ib3Jpem9udGFsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRSZXNwb25zaXZlKGlzUmVzcG9uc2l2ZTogYm9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5faXNSZXNwb25zaXZlID0gaXNSZXNwb25zaXZlO1xyXG4gICAgICAgIHRoaXMuX2FjdHVhbEhlaWdodCA9IDQwMDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIGxheW91dCBvZiB0aGUgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZUxheW91dCgpIHtcclxuICAgICBcclxuICAgICAgICAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKS5lalNwbGl0dGVyKHtcclxuICAgICAgICAgICAgaXNSZXNwb25zaXZlOiB0cnVlLFxyXG4gICAgICAgICAgICBvcmllbnRhdGlvbjogZWouT3JpZW50YXRpb24uSG9yaXpvbnRhbCwgLy8gSW5pdGlhbCBvbmx5IEhvcml6b250YWwgaXMgd29ya2luZyA9PiBsYXRlciBzd2l0Y2ggdG8gdmVydGljYWwgaW4gcmVjYWxjdWxhdGUgbGF5b3V0IGlzIHBvc3NpYmxlXHJcbiAgICAgICAgICAgIGFsbG93S2V5Ym9hcmROYXZpZ2F0aW9uOiBmYWxzZSxcclxuICAgICAgICAgICAgLy8gU2V0IGEgZGVmYXVsdCBzaXplID0+IE5lZWRlZCBmb3IgaW5hY3RpdmUgc3BsaXR0ZXIgd2luZG93cyB0byBhdm9pZCBBZGRJdGVtIHByb2JsZW1zXHJcbiAgICAgICAgICAgIHdpZHRoOiBcIjQwMHB4XCIsXHJcbiAgICAgICAgICAgIGhlaWdodDogXCI0MDBweFwiLFxyXG4gICAgICAgICAgICByZXNpemU6IChhcmdzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uU3BsaXR0ZXJSZXNpemUoYXJncyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNyZWF0ZTogKGFyZ3MpID0+IHtcclxuICAgICAgICAgICAgICAgICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpWzBdLnN0eWxlLnBhZGRpbmcgPSBcIjBweFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBhY3R1YWwgbGF5b3V0IHBhbmVzIGRlZmluaXRpb25zIHRvIHRoZSBlanNwbGl0dGVyXHJcbiAgICAgKiBcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICByZWNhbGN1bGF0ZUxheW91dCgpe1xyXG4gICAgICAgIHZhciBzcGxpdHRlciA9IHRoaXMuZ2V0U3BsaXR0ZXIoKTtcclxuICAgICAgICAvLyBTZXQgb3JpZW50YXRpb24gYmVmb3JlIGdldCBwcm9wZXJ0aWVzIHRvIHRoZSB0aGUgY29ycmVjdCBwYW5lU2l6ZXMoaGVpZ2h0L3dpZHRoKVxyXG4gICAgICAgIHNwbGl0dGVyLm9wdGlvbihcIm9yaWVudGF0aW9uXCIsIHRoaXMuX29yaWVudGF0aW9uKTtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgcHJvcGVydGllcyA9IHRoaXMuZ2V0UHJvcGVydGllcyhzcGxpdHRlcik7XHJcbiAgICAgICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyh0aGlzLmxheW91dFBhbmVzKTtcclxuICAgICAgICBpZihwcm9wZXJ0aWVzLmxlbmd0aCAhPSBrZXlzLmxlbmd0aCl7XHJcbiAgICAgICAgICAgIHRocm93KG5ldyBFcnJvcihcInByb3BlcnRpZXMubGVuZ3RoICE9IHRoaXMubGF5b3V0UGFuZXMubGVuZ3RoXCIpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGVQcm9wZXJ0aWVzSW5mb3JtYXRpb25zV2l0aExheW91dFBhbmVzRGF0YShwcm9wZXJ0aWVzKTtcclxuICAgICAgICB0aGlzLnNldFByb3BlcnRpZXMoc3BsaXR0ZXIsIHByb3BlcnRpZXMpO1xyXG5cclxuICAgICAgICBpZih0aGlzLl9pc1Jlc3BvbnNpdmUgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAvLyBjcmVhdGUgZGVmYXVsdCBmaXJzdCBwYW5lLCB3aGljaCB3aWxsIGJlIG5lZWRlZCBmb3IgZHJhZyZkcm9wIG9mIG5ldyB3aWRnZXRzIHRvIHRoZSBzcGxpdHRlciB3aWRnZXRcclxuICAgICAgICAgICAgbGV0IHNwbGl0dGVyID0gdGhpcy5nZXRTcGxpdHRlcigpO1xyXG4gICAgICAgICAgICBsZXQgbmV3SXRlbSA9IHNwbGl0dGVyLmFkZEl0ZW0oXCI8ZGl2IGlkPSdcIiArIHRoaXMucGFyZW50Q29udGVudElkICsgXCJfbGFzdFBhbmVcIiArIFwiJyBzdHlsZT0nb3ZlcmZsb3c6aGlkZGVuOyB3aWR0aDoxMDAlOyBoZWlnaHQ6MTAwJSc+PC9kaXY+XCIsIHsgcGFuZVNpemU6IDQwMCwgZXhwYW5kYWJsZTogZmFsc2UsIGNvbGxhcHNpYmxlOiBmYWxzZX0sIDApOyBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZXNpemVzIHRoZSBzcGxpdHRlciB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gd2lkdGhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICByZXNpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHsgICBcclxuICAgICAgICBpZih0aGlzLl9pc1Jlc3BvbnNpdmUpe1xyXG4gICAgICAgICAgICB0aGlzLl9hY3R1YWxIZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2FjdHVhbFdpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIHRoaXMucmVzaXplU3BsaXR0ZXIodGhpcy5fYWN0dWFsV2lkdGgsIHRoaXMuX2FjdHVhbEhlaWdodC10aGlzLl9oZWFkZXJIZWlnaHQpO1xyXG4gICAgICAgIHRoaXMucmVzaXplU3BsaXR0ZXJQYW5lQ29udGVudHModGhpcy5fYWN0dWFsV2lkdGgsIHRoaXMuX2FjdHVhbEhlaWdodC10aGlzLl9oZWFkZXJIZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZHMgdGhlIHN0eWxlcyBmb3IgdGhlIHNwbGl0dGVyIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBsb2FkU3R5bGVzKCl7XHJcbiAgICAgICAgLy8gYWRkU3R5bGUgdXNlcyBjc3NQYXJlbnRDb250ZW50SWQgd2hpY2ggaXMgZGlmZmVyZW50IHRvIF9sYXlvdXRDb250YWluZXJJZCBhbmQgZG9lcyBub3Qgd29yayFcclxuICAgICAgICBzdXBlci5hZGRTdHlsZVRvQ29udGVudElkKFwiI1wiICsgdGhpcy5fbGF5b3V0Q29udGFpbmVySWQsIFwid2lkZ2V0cy9zcGxpdHRlcldpZGdldC9zdHlsZS9jc3Mvc3BsaXR0ZXJTdHlsZS5jc3NcIik7XHJcbiAgICAgICAgc3VwZXIuYWRkU3R5bGVUb0NvbnRlbnRJZChcIiNcIiArIHRoaXMuX2xheW91dENvbnRhaW5lcklkLCBcIndpZGdldHMvY29tbW9uL3N0eWxlL2Nzcy93aWRnZXRIZWFkZXJGb290ZXJTdHlsZS5jc3NcIik7XHJcbiAgICB9XHJcblxyXG4gICAgYWN0aXZhdGUoKXtcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5fd2lkZ2V0cykge1xyXG4gICAgICAgICAgICBsZXQgd2lkZ2V0ID0gdGhpcy5fd2lkZ2V0c1trZXldO1xyXG4gICAgICAgICAgICBpZih3aWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHdpZGdldC5hY3RpdmF0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRlYWN0aXZhdGUoKXtcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5fd2lkZ2V0cykge1xyXG4gICAgICAgICAgICBsZXQgd2lkZ2V0ID0gdGhpcy5fd2lkZ2V0c1trZXldO1xyXG4gICAgICAgICAgICBpZih3aWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHdpZGdldC5kZWFjdGl2YXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGlzcG9zZSgpe1xyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLl93aWRnZXRzKSB7XHJcbiAgICAgICAgICAgIGxldCB3aWRnZXQgPSB0aGlzLl93aWRnZXRzW2tleV07XHJcbiAgICAgICAgICAgIGlmKHdpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgd2lkZ2V0LmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgICB9XHJcblxyXG4vKipcclxuICAgICAqIEFkZHMgYSB3aWRnZXQgdG8gdGhlIHNwbGl0dGVyID0+IGEgbmV3IHBhbmUgd2lsbCBiZSBhZGRlZCBmb3IgdGhlIHdpZGdldCB0byB0aGUgc3BsaXR0ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lXaWRnZXR9IHdpZGdldFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICAgICAqIEBwYXJhbSB7Vmlld1R5cGV9IHZpZXdUeXBlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3NpemU9LTFdXHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgYWRkV2lkZ2V0KHdpZGdldDogSVdpZGdldCwgbmFtZTogc3RyaW5nLCB2aWV3VHlwZTogVmlld1R5cGUsIHNpemU6IG51bWJlciA9IC0xKXsgXHJcbiAgICAgICAgc3VwZXIuYWRkV2lkZ2V0KHdpZGdldCwgbmFtZSwgdmlld1R5cGUpO1xyXG5cclxuICAgICAgICBsZXQgc3BsaXR0ZXIgPSB0aGlzLmdldFNwbGl0dGVyKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHByb3BlcnRpZXMgPSB0aGlzLmdldFByb3BlcnRpZXMoc3BsaXR0ZXIpOyBcclxuICAgICAgICBsZXQgb2xkUGFuZVNpemVzID0gdGhpcy5nZXRQYW5lU2l6ZXMocHJvcGVydGllcyk7XHJcblxyXG4gICAgICAgIGlmKCF0aGlzLl9pc1Jlc3BvbnNpdmUgJiYgc2l6ZSAhPSAtMSl7XHJcbiAgICAgICAgICAgIHRoaXMuX2FjdHVhbEhlaWdodCArPSBzaXplICsgdGhpcy5fZGVmYXVsdFNwbGl0dGVyU2l6ZTtcclxuICAgICAgICAgICAgdGhpcy5yZXNpemVTcGxpdHRlcih0aGlzLl9hY3R1YWxXaWR0aCwgdGhpcy5fYWN0dWFsSGVpZ2h0IC0gdGhpcy5faGVhZGVySGVpZ2h0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwYW5lSWQgPSB0aGlzLnBhcmVudENvbnRlbnRJZCArIFwicGFuZV9cIiArIG5hbWUucmVwbGFjZShcIiBcIiwgXCJcIik7XHJcbiAgICAgICAgdmFyIGluZGV4T2ZOZXdQYW5lID0gc3BsaXR0ZXIubW9kZWwucHJvcGVydGllcyEubGVuZ3RoO1xyXG5cclxuICAgICAgICB0aGlzLmFkZFBhbmUoc3BsaXR0ZXIsIHBhbmVJZCwgaW5kZXhPZk5ld1BhbmUsIHNpemUpO1xyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICB3aWRnZXQuaW5pdGlhbGl6ZShwYW5lSWQpO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZUxheW91dFBhbmVzQWZ0ZXJBZGRpbmdOZXdQYW5lKHByb3BlcnRpZXMsIG9sZFBhbmVTaXplcywgd2lkZ2V0LCB2aWV3VHlwZSk7XHJcblxyXG4gICAgICAgIGlmKCF0aGlzLl9pc1Jlc3BvbnNpdmUpe1xyXG4gICAgICAgICAgICB0aGlzLnNldFByb3BlcnRpZXMoc3BsaXR0ZXIsIHByb3BlcnRpZXMpO1xyXG4gICAgICAgICAgICB0aGlzLnJlc2l6ZVNwbGl0dGVyUGFuZUNvbnRlbnRzKHRoaXMuX2FjdHVhbFdpZHRoLCB0aGlzLl9hY3R1YWxIZWlnaHQtdGhpcy5faGVhZGVySGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIGEgd2lkZ2V0KHBhbmUpIGZyb20gdGhlIHNwbGl0dGVyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJV2lkZ2V0fSB3aWRnZXRcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICByZW1vdmVXaWRnZXQod2lkZ2V0OiBJV2lkZ2V0KXtcclxuICAgICAgICBsZXQgcGFuZUluZGV4ID0gdGhpcy5nZXRQYW5lSW5kZXgod2lkZ2V0KTtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgc3BsaXR0ZXIgPSB0aGlzLmdldFNwbGl0dGVyKCk7XHJcbiAgICAgICAgLy8gZ2V0IGFsbCBhY3R1YWwgcGFuZVNpemVzIFxyXG4gICAgICAgIHZhciBwcm9wZXJ0aWVzID0gdGhpcy5nZXRQcm9wZXJ0aWVzKHNwbGl0dGVyKTsgIFxyXG4gICAgICAgIHZhciBzaXplVG9SZW1vdmUgPSBwcm9wZXJ0aWVzW3BhbmVJbmRleF0ucGFuZVNpemU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIHBhbmVTaXplcyA9IHRoaXMuZ2V0UGFuZVNpemVzKHByb3BlcnRpZXMpO1xyXG4gICAgICAgIHBhbmVTaXplcy5zcGxpY2UocGFuZUluZGV4LCAxKTtcclxuICAgICAgICBzcGxpdHRlci5yZW1vdmVJdGVtKHBhbmVJbmRleCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5hZGp1c3RDaGFydHNEaXZDb250YWluZXJTaXplKHNpemVUb1JlbW92ZSk7XHJcbiAgICAgICAgbGV0IG5ld1NwbGl0dGVySGVpZ2h0ID0gdGhpcy5hZGp1c3RTcGxpdHRlclNpemUoc3BsaXR0ZXIsIHNpemVUb1JlbW92ZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHByb3BlcnRpZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBwcm9wZXJ0aWVzW2ldLnBhbmVTaXplID0gcGFuZVNpemVzW2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmxheW91dFBhbmVzLnNwbGljZShwYW5lSW5kZXgsMSk7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVXaWRnZXRGcm9tTGlzdCh3aWRnZXQpO1xyXG4gXHJcbiAgICAgICAgdGhpcy5fYWN0dWFsSGVpZ2h0ID0gbmV3U3BsaXR0ZXJIZWlnaHQ7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0UHJvcGVydGllcyhzcGxpdHRlciwgcHJvcGVydGllcyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogTW92ZXMgYSB3aWRnZXQoc3BsaXR0ZXIgcGFuZSkgZnJvbSB0aGUgc291cmNlIGluZGV4IHRvIHRoZSB0YXJnZXQgaW5kZXhcclxuICAgICAqIChpbnRlcm5hbDogdGFyZ2V0IGluZGV4IHdpbGwgYmUgZGVjcmVhc2VkIGJ5IDEgaWYgc291cmNlIGluZGV4IGlzIGJlZm9yZSB0YXJnZXQgaW5kZXgpXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNvdXJjZVBhbmVJbmRleFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRhcmdldFBhbmVJbmRleFxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIG1vdmVXaWRnZXQod2lkZ2V0OiBJV2lkZ2V0LCB0YXJnZXRQYW5lSW5kZXg6IG51bWJlcil7XHJcbiAgICAgICAgd2lkZ2V0LmRpc3Bvc2UoKTtcclxuXHJcbiAgICAgICAgbGV0IHNvdXJjZVBhbmVJbmRleCA9IHRoaXMuZ2V0UGFuZUluZGV4KHdpZGdldCk7XHJcbiAgICAgICAgbGV0IHNwbGl0dGVyID0gdGhpcy5nZXRTcGxpdHRlcigpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBsYXlvdXRQYW5lID0gdGhpcy5sYXlvdXRQYW5lc1tzb3VyY2VQYW5lSW5kZXhdO1xyXG4gICAgICAgIGxldCBtb3ZpbmdQYW5lID0gJCh3aWRnZXQuY3NzUGFyZW50Q29udGVudElkKTtcclxuXHJcbiAgICAgICAgdGFyZ2V0UGFuZUluZGV4ID0gdGhpcy51cGRhdGFUYXJnZXRQYW5lSW5kZXgoc291cmNlUGFuZUluZGV4LCB0YXJnZXRQYW5lSW5kZXgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBwcm9wZXJ0aWVzID0gdGhpcy5nZXRQcm9wZXJ0aWVzKHNwbGl0dGVyKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVByb3BlcnRpZXNMaXN0KHByb3BlcnRpZXMsIHNvdXJjZVBhbmVJbmRleCwgdGFyZ2V0UGFuZUluZGV4KVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMucmVtb3ZlUGFuZShzcGxpdHRlciwgc291cmNlUGFuZUluZGV4KTtcclxuICAgICAgICB0aGlzLmFkZFBhbmVXaXRoUGFuZUluZm8oc3BsaXR0ZXIsIGxheW91dFBhbmUsIHRhcmdldFBhbmVJbmRleCwgcHJvcGVydGllcywgbW92aW5nUGFuZSk7XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlTGF5b3V0UGFuZXNMaXN0QWZ0ZXJNb3ZpbmcobGF5b3V0UGFuZSwgc291cmNlUGFuZUluZGV4LCB0YXJnZXRQYW5lSW5kZXgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMucmVzaXplU3BsaXR0ZXIodGhpcy5fYWN0dWFsV2lkdGgsIHRoaXMuX2FjdHVhbEhlaWdodC10aGlzLl9oZWFkZXJIZWlnaHQpO1xyXG5cclxuICAgICAgICAvLyBmb3JjZSBhIHJlaW5pdGlhbGl6YXRpb24gb2YgdGhlIGNoYXJ0IGluc3RhbmNlLlxyXG4gICAgICAgIHdpZGdldC5yZWluaXRpYWxpemUoKTtcclxuICAgICAgICB3aWRnZXQuZmxhZ2dlZEZvclJlc2l6ZSA9IHRydWU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5yZXNpemVTcGxpdHRlclBhbmVDb250ZW50cyh0aGlzLl9hY3R1YWxXaWR0aCx0aGlzLl9hY3R1YWxIZWlnaHQtdGhpcy5faGVhZGVySGVpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlc2l6ZSBhIHdpZGdldCB0byBhIG5ldyBzaXplIGFuZCBhZGFwdCB0aGUgb3RoZXIgd2lkZ2V0cyBpbiB0aGlzIGxheW91dFdpZGdldChzcGxpdHRlcilcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lXaWRnZXR9IHdpZGdldFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG5ld1NpemVcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICByZXNpemVXaWRnZXQod2lkZ2V0OiBJV2lkZ2V0LCBuZXdTaXplOiBudW1iZXIpe1xyXG4gICAgICAgIGxldCBwYW5lSW5kZXggPSB0aGlzLmdldFBhbmVJbmRleCh3aWRnZXQpO1xyXG4gICAgICAgIHZhciBzcGxpdHRlciA9IHRoaXMuZ2V0U3BsaXR0ZXIoKTtcclxuXHJcbiAgICAgICAgbGV0IHByb3BlcnRpZXMgPSB0aGlzLmdldFByb3BlcnRpZXMoc3BsaXR0ZXIpIFxyXG4gICAgICAgIC8vIHNldCBuZXcgcGFuZSBzaXplc1xyXG4gICAgICAgIGxldCBjdXJyZW50UGFuZVNpemUgPSBwcm9wZXJ0aWVzW3BhbmVJbmRleF0ucGFuZVNpemU7XHJcbiAgICAgICAgbGV0IHBhbmVEaWZmU2l6ZSA9IGN1cnJlbnRQYW5lU2l6ZS1uZXdTaXplO1xyXG5cclxuICAgICAgICBsZXQgc2l6ZU9mT3RoZXJQYW5lID0gLTE7XHJcbiAgICAgICAgbGV0IGluZGV4T2ZPdGhlclBhbmUgPSAtMTtcclxuICAgICAgICBpZihwYW5lSW5kZXggKzEgPj0gdGhpcy5sYXlvdXRQYW5lcy5sZW5ndGgpe1xyXG4gICAgICAgICAgICAvLyBMYXN0IHBhbmUgc2l6ZSBjaGFuZ2VkID0+IHVwZGF0ZSB0aGUgc2l6ZSBvZiB0aGUgcGFuZSBiZWZvcmVcclxuICAgICAgICAgICAgc2l6ZU9mT3RoZXJQYW5lID0gcHJvcGVydGllc1twYW5lSW5kZXgtMV0ucGFuZVNpemUrcGFuZURpZmZTaXplO1xyXG4gICAgICAgICAgICBpbmRleE9mT3RoZXJQYW5lID0gcGFuZUluZGV4LTE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgZm9sbG93aW5nIHBhbmUgc2l6ZVxyXG4gICAgICAgICAgICBzaXplT2ZPdGhlclBhbmUgPSBwcm9wZXJ0aWVzW3BhbmVJbmRleCsxXS5wYW5lU2l6ZStwYW5lRGlmZlNpemU7XHJcbiAgICAgICAgICAgIGluZGV4T2ZPdGhlclBhbmUgPSBwYW5lSW5kZXgrMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoc2l6ZU9mT3RoZXJQYW5lIDwgMCl7XHJcbiAgICAgICAgICAgIC8vIEF2b2lkIHJlc2l6aW5nIHRoZSBmb2xsb3dpbmcgcGFuZShvciB0aGUgcGFuZSBiZWZvcmUpIHRvIGEgc2l6ZSBzbWFsbGVyIHRoZW4gMFxyXG4gICAgICAgICAgICBsZXQgb2xkVmFsdWUgPSBNYXRoLmFicyhzaXplT2ZPdGhlclBhbmUpO1xyXG4gICAgICAgICAgICBzaXplT2ZPdGhlclBhbmUgPSA1MDsgICBcclxuICAgICAgICAgICAgbmV3U2l6ZSA9IG5ld1NpemUgLSBvbGRWYWx1ZSAtIDUwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxheW91dFBhbmVzW2luZGV4T2ZPdGhlclBhbmVdLnNpemUgPSBzaXplT2ZPdGhlclBhbmU7XHJcbiAgICAgICAgcHJvcGVydGllc1tpbmRleE9mT3RoZXJQYW5lXS5wYW5lU2l6ZSA9IHNpemVPZk90aGVyUGFuZTtcclxuXHJcbiAgICAgICAgdGhpcy5sYXlvdXRQYW5lc1twYW5lSW5kZXhdLnNpemUgPSBuZXdTaXplO1xyXG4gICAgICAgIHByb3BlcnRpZXNbcGFuZUluZGV4XS5wYW5lU2l6ZSA9IG5ld1NpemU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gVXBkYXRlcyB0aGUgc3BsaXR0ZXJzXHJcbiAgICAgICAgdGhpcy5zZXRQYW5lUHJvcGVydGllc1RvU3BsaXR0ZXIoc3BsaXR0ZXIsIHByb3BlcnRpZXMpO1xyXG5cclxuICAgICAgICAvLyB1cGRhdGVzIHRoZSBjb250ZW50cyBpbiB0aGUgc3BsaXR0ZXJzXHJcbiAgICAgICAgdGhpcy5yZXNpemVTcGxpdHRlclBhbmVDb250ZW50cyh0aGlzLl9hY3R1YWxXaWR0aCwgdGhpcy5fYWN0dWFsSGVpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGVqU3BsaXR0ZXIgZGF0YSBvYmplY3RcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFNwbGl0dGVyKCk6IGFueXtcclxuICAgICAgICByZXR1cm4gJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCkuZGF0YShcImVqU3BsaXR0ZXJcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBzaXplcyBvZiBhbGwgcGFuZXMgdG9nZXRoZXIsIGluY2wuIHRoZSBkeW5hbWljIHBhbmVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN1bU9mRGVmaW5lZExheW91dFBhbmVTaXplcygpOiBudW1iZXJ7XHJcbiAgICAgICAgbGV0IHN1bTogbnVtYmVyID0gMDtcclxuICAgICAgICBmb3IobGV0IGtleSBpbiB0aGlzLmxheW91dFBhbmVzKSB7XHJcbiAgICAgICAgICAgIGxldCBsYXlvdXRQYW5lID0gIHRoaXMubGF5b3V0UGFuZXNba2V5XTtcclxuICAgICAgICAgICAgaWYobGF5b3V0UGFuZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgc3VtICs9IGxheW91dFBhbmUuc2l6ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3VtO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgc2l6ZXMgb2YgYWxsIHBhbmVzIHRvZ2V0aGVyLCB3aXRob3V0IHRoZSBzaXplIG9mIHRoZSBkeW5hbWljIHBhbmUgYnV0IGluY2x1ZGluZyB0aGUgc3BsaXR0ZXIgc2l6ZShlLmcuIDlweClcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN1bU9mRGVmaW5lZFBhbmVTaXplcygpOiBudW1iZXJ7XHJcbiAgICAgICAgbGV0IHN1bTogbnVtYmVyID0gMDtcclxuICAgICAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgICAgIGZvcihsZXQga2V5IGluIHRoaXMubGF5b3V0UGFuZXMpIHtcclxuICAgICAgICAgICAgbGV0IGxheW91dFBhbmUgPSAgdGhpcy5sYXlvdXRQYW5lc1trZXldO1xyXG4gICAgICAgICAgICBpZihsYXlvdXRQYW5lID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgaWYobGF5b3V0UGFuZS5maWxsU3BhY2UgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgIHN1bSArPSBsYXlvdXRQYW5lLnNpemU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZihpbmRleD4wKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3BsaXR0ZXJTaXplID0gdGhpcy5fZGVmYXVsdFNwbGl0dGVyU2l6ZTtcclxuICAgICAgICAgICAgICAgICAgICBzdW0gKz0gc3BsaXR0ZXJTaXplOyAvLyBBZGQgc2l6ZSBvZiBzcGxpdHRlclxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdW07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBpZiB0aGUgcGFuZSBzaXplcyBhcmUgdG9vIGJpZyBmb3IgdGhlIGN1cnJlbnQgd2luZG93IHNpemUsIHRoZSBwYW5lcyB3b3VsZCBiZSBkZWNyZWFzZWQgaW4gc2l6ZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2l6ZVxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRvcHRMYXlvdXRQYW5lc1RvRml0Q3VycmVudFNpemUoc2l6ZTogbnVtYmVyKXtcclxuICAgICAgICBsZXQgc3VtT2ZQYW5lc1dpdG91dER5bmFtaWMgPSB0aGlzLnN1bU9mRGVmaW5lZFBhbmVTaXplcygpO1xyXG4gICAgICAgIGxldCBuZWVkZWRTaXplID0gc3VtT2ZQYW5lc1dpdG91dER5bmFtaWMgLSBzaXplO1xyXG4gICAgICAgIGlmKG5lZWRlZFNpemUgPiAwKXtcclxuICAgICAgICAgICAgLy8gVE9ETzogZ2V0IGxhc3Qgbm90IGR5bmFtaWMgcGFuZVxyXG4gICAgICAgICAgICBsZXQgbGFzdFBhbmUgPSB0aGlzLmxheW91dFBhbmVzW3RoaXMubGF5b3V0UGFuZXMubGVuZ3RoLTFdO1xyXG4gICAgICAgICAgICBsYXN0UGFuZS5zaXplID0gbGFzdFBhbmUuc2l6ZS0gbmVlZGVkU2l6ZTtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBuZXcgcGFuZSBhdCB0aGUgZ2l2ZW4gaW5kZXggd2l0aCB0aGUgZ2l2ZW4gc2l6ZSBcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBzcGxpdHRlclxyXG4gICAgICogQHBhcmFtIHsqfSBwYW5lSWRcclxuICAgICAqIEBwYXJhbSB7Kn0gaW5kZXhPZk5ld1BhbmVcclxuICAgICAqIEBwYXJhbSB7Kn0gc2l6ZVxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkUGFuZShzcGxpdHRlciwgcGFuZUlkLCBpbmRleE9mTmV3UGFuZSwgc2l6ZSl7XHJcbiAgICAgICAgbGV0IG5ld0l0ZW07XHJcbiAgICAgICAgaWYoIXRoaXMuX2lzUmVzcG9uc2l2ZSAmJiBzaXplICE9IC0xKXtcclxuICAgICAgICAgICAgaWYoaW5kZXhPZk5ld1BhbmUgPT0gMCl7XHJcbiAgICAgICAgICAgICAgICBpbmRleE9mTmV3UGFuZSsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5ld0l0ZW09IHNwbGl0dGVyLnJlbW92ZUl0ZW0oaW5kZXhPZk5ld1BhbmUtMSk7XHJcbiAgICAgICAgICAgIG5ld0l0ZW09IHNwbGl0dGVyLmFkZEl0ZW0oXCI8ZGl2IGlkPSdcIiArIHBhbmVJZCArIFwiJyBzdHlsZT0nb3ZlcmZsb3c6aGlkZGVuJz48L2Rpdj5cIiwgeyBwYW5lU2l6ZTogc2l6ZSwgZXhwYW5kYWJsZTogZmFsc2UsIGNvbGxhcHNpYmxlOiBmYWxzZX0sIGluZGV4T2ZOZXdQYW5lLTEpO1xyXG4gICAgICAgICAgICBuZXdJdGVtPSBzcGxpdHRlci5hZGRJdGVtKFwiPGRpdiBpZD0nXCIgKyB0aGlzLnBhcmVudENvbnRlbnRJZCArIFwiX2xhc3RQYW5lXCIgKyBcIicgc3R5bGU9J292ZXJmbG93OmhpZGRlbjsgd2lkdGg6MTAwJTsgaGVpZ2h0OjEwMCUnPjwvZGl2PlwiLCB7IHBhbmVTaXplOiA0MDAsIGV4cGFuZGFibGU6IGZhbHNlLCBjb2xsYXBzaWJsZTogZmFsc2V9LCBpbmRleE9mTmV3UGFuZSk7IFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBuZXdJdGVtID0gc3BsaXR0ZXIuYWRkSXRlbShcIjxkaXYgaWQ9J1wiICsgcGFuZUlkICsgXCInIHN0eWxlPSdvdmVyZmxvdzpoaWRkZW4nPjwvZGl2PlwiLCB7IHBhbmVTaXplOiBzaXplLCBleHBhbmRhYmxlOiBmYWxzZSwgY29sbGFwc2libGU6IGZhbHNlIH0sIGluZGV4T2ZOZXdQYW5lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKG5ld0l0ZW0udG9TdHJpbmcoKSA9PSBcIlwiKXtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkVSUk9SOiBzcGxpdHRlci5hZGRJdGVtXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBuZXdJdGVtWzBdLnN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIHRoZSBtb3ZlZCBwYW5lIHRvIHRoZSBzcGxpdHRlciBhbmQgc2V0cyB0aGUgc3BsaXR0ZXIgb3B0aW9uc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHNwbGl0dGVyXHJcbiAgICAgKiBAcGFyYW0geyp9IHBhbmVJbmRleFxyXG4gICAgICogQHBhcmFtIHsqfSB0YXJnZXRQYW5lSW5kZXhcclxuICAgICAqIEBwYXJhbSB7Kn0gcHJvcGVydGllc1xyXG4gICAgICogQHBhcmFtIHsqfSBtb3ZpbmdQYW5lXHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRQYW5lV2l0aFBhbmVJbmZvKHNwbGl0dGVyLCBsYXlvdXRQYW5lLCB0YXJnZXRQYW5lSW5kZXgsIHByb3BlcnRpZXMsIG1vdmluZ1BhbmUpe1xyXG4gICAgICAgIHNwbGl0dGVyLmFkZEl0ZW0obW92aW5nUGFuZVswXS5wYXJlbnRFbGVtZW50IS5pbm5lckhUTUwsIHtleHBhbmRhYmxlOiBsYXlvdXRQYW5lLmV4cGFuZGFibGUsIGNvbGxhcHNpYmxlOiBsYXlvdXRQYW5lLmNvbGxhcHNpYmxlfSx0YXJnZXRQYW5lSW5kZXgpO1xyXG4gICAgICAgIHRoaXMuc2V0UHJvcGVydGllcyhzcGxpdHRlciwgcHJvcGVydGllcyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogIFJlbW92ZXMgdGhlIHBhbmUgd2l0aCB0aGUgZ2l2ZW4gaW5kZXggZnJvbSB0aGUgc3BsaXR0ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBzcGxpdHRlclxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHBhbmVJbmRleFxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVtb3ZlUGFuZShzcGxpdHRlciwgcGFuZUluZGV4OiBudW1iZXIpe1xyXG4gICAgICAgIHNwbGl0dGVyLnJlbW92ZUl0ZW0ocGFuZUluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZUxheW91dFBhbmVzQWZ0ZXJBZGRpbmdOZXdQYW5lKHByb3BlcnRpZXMsIG9sZFBhbmVTaXplcywgd2lkZ2V0OiBJV2lkZ2V0LCB2aWV3VHlwZSl7XHJcbiAgICAgICAgaWYodGhpcy5faXNSZXNwb25zaXZlKXtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGFMYXlvdXRQYW5lc0FmdGVyQWRkaW5nTmV3UGFuZVJlc3BvbnNpdmUocHJvcGVydGllcywgd2lkZ2V0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXsgIFxyXG4gICAgICAgICAgICBvbGRQYW5lU2l6ZXNbb2xkUGFuZVNpemVzLmxlbmd0aC0xXSA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9MDsgaSA8IHByb3BlcnRpZXMubGVuZ3RoLTE7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmFtZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBpZihvbGRQYW5lU2l6ZXNbaV0gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzW2ldLnBhbmVTaXplID0gb2xkUGFuZVNpemVzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWUgPSB0aGlzLmxheW91dFBhbmVzW2ldLm5hbWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKG5hbWUgPT09IFwiXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWUgPSB3aWRnZXQud2lkZ2V0TmFtZSArIFwiX1wiKyB2aWV3VHlwZS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWUgPSBVbmlxdWVJZEdlbmVyYXRvci5nZXRJbnN0YW5jZSgpLmdldFVuaXF1ZUlkRnJvbVN0cmluZyhuYW1lKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IHBhbmVXaWRnZXQgPSB3aWRnZXQ7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmxheW91dFBhbmVzW2ldICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFuZVdpZGdldCA9IHRoaXMubGF5b3V0UGFuZXNbaV0ud2lkZ2V0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5sYXlvdXRQYW5lc1tpXSAgPSAgbmV3IExheW91dFBhbmUobmFtZSwgcHJvcGVydGllc1tpXS5wYW5lU2l6ZSwgcGFuZVdpZGdldCwgZmFsc2UsIHRydWUsIHByb3BlcnRpZXNbaV0uZXhwYW5kYWJsZSwgcHJvcGVydGllc1tpXS5jb2xsYXBzaWJsZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGFMYXlvdXRQYW5lc0FmdGVyQWRkaW5nTmV3UGFuZVJlc3BvbnNpdmUocHJvcGVydGllcywgd2lkZ2V0KSB7XHJcbiAgICAgICAgZm9yKGxldCBpID0wOyBpIDwgcHJvcGVydGllcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBuYW1lID0gT2JqZWN0LmtleXModGhpcy5fd2lkZ2V0cylbaV07XHJcblxyXG4gICAgICAgICAgICBsZXQgcGFuZVdpZGdldCA9IHdpZGdldDtcclxuICAgICAgICAgICAgaWYodGhpcy5sYXlvdXRQYW5lc1tpXSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgcGFuZVdpZGdldCA9IHRoaXMubGF5b3V0UGFuZXNbaV0ud2lkZ2V0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubGF5b3V0UGFuZXNbaV0gPSBuZXcgTGF5b3V0UGFuZShuYW1lLCBwcm9wZXJ0aWVzW2ldLnBhbmVTaXplLCBwYW5lV2lkZ2V0LGZhbHNlLCB0cnVlLCBwcm9wZXJ0aWVzW2ldLmV4cGFuZGFibGUsIHByb3BlcnRpZXNbaV0uY29sbGFwc2libGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICBcclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgcHJvcGVydGllcyB3aXRoIHRoZSBpbmZvcm1hdGlvbnMgZnJvbSB0aGUgbGF5b3V0UGFuZSBkZWZpbml0aW9ucztcclxuICAgICAqIFNpemUgb2YgZHluYW1pYyBwYW5lIHdpbGwgYmUgY2FsY3VsYXRlZCBieSB1c2luZyB0aGUgYWN0dWFsIHdpZGdldCBzaXplXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gcHJvcGVydGllc1xyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlUHJvcGVydGllc0luZm9ybWF0aW9uc1dpdGhMYXlvdXRQYW5lc0RhdGEocHJvcGVydGllcyl7ICAgXHJcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcclxuICAgICAgICBmb3IobGV0IGtleSBpbiB0aGlzLmxheW91dFBhbmVzKSB7XHJcbiAgICAgICAgICAgIGxldCBsYXlvdXRQYW5lID0gIHRoaXMubGF5b3V0UGFuZXNba2V5XTtcclxuICAgICAgICAgICAgaWYobGF5b3V0UGFuZSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGlmKGxheW91dFBhbmUuZmlsbFNwYWNlID09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzW2luZGV4XS5wYW5lU2l6ZSA9IGxheW91dFBhbmUuc2l6ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNpemUgPSB0aGlzLl9hY3R1YWxXaWR0aDtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLl9vcmllbnRhdGlvbiA9PSBlai5PcmllbnRhdGlvbi5WZXJ0aWNhbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemUgPSB0aGlzLl9hY3R1YWxIZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXNbaW5kZXhdLnBhbmVTaXplID0gc2l6ZSAtIHRoaXMuc3VtT2ZEZWZpbmVkTGF5b3V0UGFuZVNpemVzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzW2luZGV4XS5leHBhbmRhYmxlID0gbGF5b3V0UGFuZS5leHBhbmRhYmxlO1xyXG4gICAgICAgICAgICAgICAgcHJvcGVydGllc1tpbmRleF0uY29sbGFwc2libGUgPSBsYXlvdXRQYW5lLmNvbGxhcHNpYmxlO1xyXG4gICAgICAgICAgICAgICAgcHJvcGVydGllc1tpbmRleF0ucmVzaXphYmxlID0gbGF5b3V0UGFuZS5yZXNpemFibGU7XHJcbiAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzW2luZGV4XS5taW5TaXplID0gbGF5b3V0UGFuZS5taW5pbXVtU2l6ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgICBcclxuICAgIC8qKlxyXG4gICAgICogcmVzaXplIHRoZSBzcGxpdHRlciBhbmQgdXBkYXRlIHRoZSBzcGxpdHRlciBwYW5lc2l6ZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0XHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZXNpemVTcGxpdHRlcih3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcil7XHJcbiAgICAgICAgdmFyIHNwbGl0dGVyID0gdGhpcy5nZXRTcGxpdHRlcigpO1xyXG5cclxuICAgICAgICBzcGxpdHRlci5vcHRpb24oXCJ3aWR0aFwiLCB3aWR0aCwgdHJ1ZSk7XHJcbiAgICAgICAgc3BsaXR0ZXIub3B0aW9uKFwiaGVpZ2h0XCIsIGhlaWdodCwgdHJ1ZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHByb3BlcnRpZXMgPSB0aGlzLmdldFByb3BlcnRpZXMoc3BsaXR0ZXIpOyBcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnVwZGF0ZVBhbmVQcm9wZXJ0aWVzKHByb3BlcnRpZXMsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuc2V0UGFuZVByb3BlcnRpZXNUb1NwbGl0dGVyKHNwbGl0dGVyLCBwcm9wZXJ0aWVzKTtcclxuICAgIH0gICBcclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIHBhbmVzaXplIGluIHRoZSBwcm9wZXJ0aWVzIGZvciB0aGUgbmV3IGhlaWdodC93aWR0aFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHByb3BlcnRpZXNcclxuICAgICAqIEBwYXJhbSB7Kn0gd2lkdGhcclxuICAgICAqIEBwYXJhbSB7Kn0gaGVpZ2h0XHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVQYW5lUHJvcGVydGllcyhwcm9wZXJ0aWVzLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcil7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gU2V0IGFsbCBrbm93IHBhbmUgc2l6ZXNcclxuICAgICAgICB0aGlzLnNldEtub3duUGFuZVNpemVzKHByb3BlcnRpZXMpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gU2V0IGFsbCBkeW5hbWljIHBhbmUgc2l6ZXNcclxuICAgICAgICB0aGlzLnNldER5bmFtaWNQYW5lU2l6ZXMocHJvcGVydGllcywgd2lkdGgsIGhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRLbm93blBhbmVTaXplcyhwcm9wZXJ0aWVzKXtcclxuICAgICAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgICAgIGZvcihsZXQga2V5IGluIHRoaXMubGF5b3V0UGFuZXMpIHtcclxuICAgICAgICAgICAgbGV0IGxheW91dFBhbmUgPSAgdGhpcy5sYXlvdXRQYW5lc1trZXldO1xyXG4gICAgICAgICAgICBpZihsYXlvdXRQYW5lID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgaWYobGF5b3V0UGFuZS5maWxsU3BhY2UgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXNbaW5kZXhdLnBhbmVTaXplID0gbGF5b3V0UGFuZS5zaXplO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0RHluYW1pY1BhbmVTaXplcyhwcm9wZXJ0aWVzLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcil7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcclxuICAgICAgICBmb3IobGV0IGtleSBpbiB0aGlzLmxheW91dFBhbmVzKSB7XHJcbiAgICAgICAgICAgIGxldCBsYXlvdXRQYW5lID0gIHRoaXMubGF5b3V0UGFuZXNba2V5XTtcclxuICAgICAgICAgICAgaWYobGF5b3V0UGFuZSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGlmKGxheW91dFBhbmUuZmlsbFNwYWNlID09IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuX29yaWVudGF0aW9uID09IGVqLk9yaWVudGF0aW9uLlZlcnRpY2FsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllc1tpbmRleF0ucGFuZVNpemUgPSBoZWlnaHQgLSB0aGlzLnN1bU9mRGVmaW5lZFBhbmVTaXplcygpOyBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllc1tpbmRleF0ucGFuZVNpemUgPSB3aWR0aCAtIHRoaXMuc3VtT2ZEZWZpbmVkUGFuZVNpemVzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGdpdmVuIHByb3BlcnRpZXMocGFuZXNpemVzLCAuLi4pIHRvIHRoZSBlanNwbGl0dGVyXHJcbiAgICAgKiBpZiB0aGUgbGFzdCBwYW5lc2l6ZSBpcyB1bmRlciAxcHggYSBjb3JyZWN0aW9uIG9mIHRoZSBwYW5lc2l6ZSB3aWxsIGJlIGRvbmU7IG9jY3VyZXMgc29tZXRpbWVzIGluIGNhc2Ugb2YgYnJvd3NlciB6b29tXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gc3BsaXR0ZXJcclxuICAgICAqIEBwYXJhbSB7Kn0gcHJvcGVydGllc1xyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0UGFuZVByb3BlcnRpZXNUb1NwbGl0dGVyKHNwbGl0dGVyLCBwcm9wZXJ0aWVzKXtcclxuICAgICAgICB0aGlzLnNldFByb3BlcnRpZXMoc3BsaXR0ZXIsIHByb3BlcnRpZXMpO1xyXG4gICAgICAgIGlmKCg8YW55PnNwbGl0dGVyKS5wYW5lcy5sZW5ndGggPiAwKSB7IFxyXG4gICAgICAgICAgICBsZXQgbGFzdFBhbmUgPSAoPGFueT5zcGxpdHRlcikucGFuZXNbKDxhbnk+c3BsaXR0ZXIpLnBhbmVzLmxlbmd0aC0xXTtcclxuICAgICAgICAgICAgaWYobGFzdFBhbmUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGxldCBsYXN0UGFuZVNpemVTdHJpbmcgPSBsYXN0UGFuZS5zdHlsZS53aWR0aDtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuX29yaWVudGF0aW9uID09IGVqLk9yaWVudGF0aW9uLlZlcnRpY2FsKXtcclxuICAgICAgICAgICAgICAgICAgICBsYXN0UGFuZVNpemVTdHJpbmcgPSBsYXN0UGFuZS5zdHlsZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgbGFzdFBhbmVTaXplID0gcGFyc2VGbG9hdChsYXN0UGFuZVNpemVTdHJpbmcpO1xyXG4gICAgICAgICAgICAgICAgaWYobGFzdFBhbmVTaXplIDw9IDAuOTk5OSAmJiBwcm9wZXJ0aWVzW3Byb3BlcnRpZXMubGVuZ3RoLTFdLnBhbmVTaXplID4gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU2l6ZSBvZiBsYXN0IHNwbGl0dGVyIHBhbmUgd2FzIG5vdCBzZXQgY29ycmVjdCA9PiB0byBsZXNzIHNwYWNlIVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIGJyb3dzZXIgem9vbSBpcyB1c2VkIHRoZSBzaXplcyB3aWxsIGJlIGRlZmluZWQgd2l0aCBkZWNpbWFscGxhY2VzO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoZSBlalNwbGl0dGVyIHNldHMgdGhlIHNpemUgb2YgdGhlIGxhc3QgcGFuZSB0byAwIGlmIGl0IGlzIGEgbGl0dGxlIGJpdCB0byB0YWxsIChlLmcuIFwiMC4xcHhcIikgPT4gcGFuZSB3aWxsIG5vdCBiZSBzaG93blxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFNldCBsYXN0IHBhbmUgYSBsaXR0bGUgYml0IHNtYWxsZXJcclxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzW3Byb3BlcnRpZXMubGVuZ3RoLTFdLnBhbmVTaXplLS07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQcm9wZXJ0aWVzKHNwbGl0dGVyLCBwcm9wZXJ0aWVzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHNwbGl0dGVyIHBhbmUgY29udGVudCBzaXplcyAod2lkZ2V0IHNpemVzKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gd2lkdGhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlc2l6ZVNwbGl0dGVyUGFuZUNvbnRlbnRzKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKXtcclxuICAgICAgICAvLyBTZXQgdGhlIHNpemVzIG9mIHRoZSBzcGxpdHRlciBwYW5lY29udGVudHNcclxuICAgICAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmxheW91dFBhbmVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IHdpZGdldCA9IHRoaXMuX3dpZGdldHNbdGhpcy5sYXlvdXRQYW5lc1tpXS5uYW1lXTtcclxuICAgICAgICAgICAgaWYod2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgd2lkZ2V0V2lkdGggPSB3aWR0aDtcclxuICAgICAgICAgICAgICAgIGxldCB3aWRnZXRIZWlnaHQgPSBoZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5fb3JpZW50YXRpb24gPT0gZWouT3JpZW50YXRpb24uVmVydGljYWwpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMubGF5b3V0UGFuZXNbaW5kZXhdLmZpbGxTcGFjZSA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0SGVpZ2h0ID0gaGVpZ2h0IC0gdGhpcy5zdW1PZkRlZmluZWRQYW5lU2l6ZXMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYod2lkZ2V0SGVpZ2h0IDwgMCl7IC8vIE5vIHBsYWNlIGZvciBkeW5hbWljIHBhbmUsIG1heWJlIGFsc28gb3RoZXIgcGFuZXMgaGF2ZSB0byBiZSBhZG9wdGVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkb3B0TGF5b3V0UGFuZXNUb0ZpdEN1cnJlbnRTaXplKGhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXRIZWlnaHQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldEhlaWdodCA9IHRoaXMubGF5b3V0UGFuZXNbaW5kZXhdLnNpemU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5sYXlvdXRQYW5lc1tpbmRleF0uZmlsbFNwYWNlID09IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXRXaWR0aCA9IHdpZHRoIC0gdGhpcy5zdW1PZkRlZmluZWRQYW5lU2l6ZXMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYod2lkZ2V0V2lkdGggPCAwKXsgLy8gTm8gcGxhY2UgZm9yIGR5bmFtaWMgcGFuZSwgbWF5YmUgYWxzbyBvdGhlciBwYW5lcyBoYXZlIHRvIGJlIGFkb3B0ZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRvcHRMYXlvdXRQYW5lc1RvRml0Q3VycmVudFNpemUod2lkdGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0V2lkdGggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldFdpZHRoID0gdGhpcy5sYXlvdXRQYW5lc1tpbmRleF0uc2l6ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB3aWRnZXQucmVzaXplKHdpZGdldFdpZHRoLCB3aWRnZXRIZWlnaHQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGxheW91dCBwYW5lcyBcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBzcGxpdGJhckluZGV4XHJcbiAgICAgKiBAcGFyYW0geyp9IHByZXZQYW5lU2l6ZVxyXG4gICAgICogQHBhcmFtIHsqfSBuZXh0UGFuZVNpemVcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZUxheW91dFBhbmVzT25TcGxpdHRlclJlc2l6ZShzcGxpdGJhckluZGV4LCBwcmV2UGFuZVNpemUsIG5leHRQYW5lU2l6ZSl7XHJcbiAgICAgICAgbGV0IHNwbGl0dGVyID0gdGhpcy5nZXRTcGxpdHRlcigpO1xyXG4gICAgICAgIGxldCBwcm9wZXJ0aWVzID0gdGhpcy5nZXRQcm9wZXJ0aWVzKHNwbGl0dGVyKTtcclxuXHJcbiAgICAgICAgaWYoIXRoaXMuX2lzUmVzcG9uc2l2ZSl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubGF5b3V0UGFuZXNbc3BsaXRiYXJJbmRleCArIDFdICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzW3NwbGl0YmFySW5kZXggKyAxXS5wYW5lU2l6ZSA9IHRoaXMubGF5b3V0UGFuZXNbc3BsaXRiYXJJbmRleCArIDFdLnNpemU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5sYXlvdXRQYW5lc1tzcGxpdGJhckluZGV4KzFdLnNpemUgPSBuZXh0UGFuZVNpemU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0UHJvcGVydGllcyhzcGxpdHRlciwgcHJvcGVydGllcyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IG9sZFNpemUgPSB0aGlzLmxheW91dFBhbmVzW3NwbGl0YmFySW5kZXhdLnNpemVcclxuICAgICAgICB0aGlzLmxheW91dFBhbmVzW3NwbGl0YmFySW5kZXhdLnNpemUgPSBwcmV2UGFuZVNpemU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoIXRoaXMuX2lzUmVzcG9uc2l2ZSl7XHJcbiAgICAgICAgICAgIHRoaXMuX2FjdHVhbEhlaWdodCArPSAocHJldlBhbmVTaXplIC0gb2xkU2l6ZSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVzaXplU3BsaXR0ZXIodGhpcy5fYWN0dWFsV2lkdGgsIHRoaXMuX2FjdHVhbEhlaWdodC10aGlzLl9oZWFkZXJIZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNvcnJlY3RzIHRoZSB0YXJnZXQgaW5kZXggaWYgc291cmNlIGluZGV4IGlzIGJlZm9yZSB0YXJnZXQgaW5kZXhcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNvdXJjZVBhbmVJbmRleFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRhcmdldFBhbmVJbmRleFxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0YVRhcmdldFBhbmVJbmRleChzb3VyY2VQYW5lSW5kZXg6IG51bWJlciwgdGFyZ2V0UGFuZUluZGV4OiBudW1iZXIpOiBudW1iZXJ7XHJcbiAgICAgICAgaWYoc291cmNlUGFuZUluZGV4IDwgdGFyZ2V0UGFuZUluZGV4KXtcclxuICAgICAgICAgICAgLy8gbW92ZWQgZWxlbWVudCBpcyBpbiBsaXN0IGJlZm9yZSB0YXJnZXQgcG9zaXRpb24gYW5kIHdhcyByZW1vdmVkIGJlZm9yZSwgc28gaW5kZXggbXVzdCBiZSBkZWNyZWFzZWQgdG8gZ2V0IGNvcnJlY3QgaW5zZXJ0IHBvc2l0aW9uXHJcbiAgICAgICAgICAgIHRhcmdldFBhbmVJbmRleC0tO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGFyZ2V0UGFuZUluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgcHJvcGVydGllcyBmcm9tIHRoZSBlalNwbGl0dGVyXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gc3BsaXR0ZXJcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRQcm9wZXJ0aWVzKHNwbGl0dGVyKXtcclxuICAgICAgICByZXR1cm4gc3BsaXR0ZXIub3B0aW9uKFwicHJvcGVydGllc1wiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHByb3BlcnRpZXMgb2YgdGhlIGVqU3BsaXR0ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBzcGxpdHRlclxyXG4gICAgICogQHBhcmFtIHsqfSBwcm9wZXJ0aWVzXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0UHJvcGVydGllcyhzcGxpdHRlciwgcHJvcGVydGllcyl7XHJcbiAgICAgICAgc3BsaXR0ZXIub3B0aW9uKFwicHJvcGVydGllc1wiLCBwcm9wZXJ0aWVzLCB0cnVlKTsgLy8gZm9yY2UgdGhlIHNldHRpbmcgdG8gcmVzaXplIHRoZSBjaGFydCBzcGxpdHRlcnNcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBwcm9wZXJ0aWVzID0+IG1vdmVzIHRoZSBwcm9wZXJ0eSBpbmZvcm1hdGlvbnMgZnJvbSBzb3VyY2UgdG8gdGFyZ2V0IGluZGV4XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gcHJvcGVydGllc1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNvdXJjZVBhbmVJbmRleFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRhcmdldFBhbmVJbmRleFxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlUHJvcGVydGllc0xpc3QocHJvcGVydGllcywgc291cmNlUGFuZUluZGV4OiBudW1iZXIsIHRhcmdldFBhbmVJbmRleDogbnVtYmVyKXtcclxuICAgICAgICBsZXQgcGFuZVByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzW3NvdXJjZVBhbmVJbmRleF07XHJcbiAgICAgICAgcHJvcGVydGllcy5zcGxpY2Uoc291cmNlUGFuZUluZGV4LCAxKTtcclxuICAgICAgICBwcm9wZXJ0aWVzLnNwbGljZSh0YXJnZXRQYW5lSW5kZXgsIDAsIHBhbmVQcm9wZXJ0aWVzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGxheW91dCBwYW5lcyBsaXN0IGFmdGVyIG1vdmluZ1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGxheW91dFBhbmVcclxuICAgICAqIEBwYXJhbSB7Kn0gc291cmNlUGFuZUluZGV4XHJcbiAgICAgKiBAcGFyYW0geyp9IHRhcmdldFBhbmVJbmRleFxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlTGF5b3V0UGFuZXNMaXN0QWZ0ZXJNb3ZpbmcobGF5b3V0UGFuZSwgc291cmNlUGFuZUluZGV4LCB0YXJnZXRQYW5lSW5kZXgpe1xyXG4gICAgICAgIHRoaXMubGF5b3V0UGFuZXMuc3BsaWNlKHNvdXJjZVBhbmVJbmRleCwgMSk7XHJcbiAgICAgICAgdGhpcy5sYXlvdXRQYW5lcy5zcGxpY2UodGFyZ2V0UGFuZUluZGV4LCAwLCBsYXlvdXRQYW5lKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHBhbmUgaW5kZXggb2YgdGhlIGdpdmVuIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHdpZGdldFxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFBhbmVJbmRleCh3aWRnZXQpOiBudW1iZXJ7XHJcbiAgICAgICAgbGV0IHBhbmVJbmRleCA9IC0xO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sYXlvdXRQYW5lcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubGF5b3V0UGFuZXNbaV0ud2lkZ2V0ID09IHdpZGdldCl7XHJcbiAgICAgICAgICAgICAgICBwYW5lSW5kZXggPSBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwYW5lSW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIHRoZSB3aWRnZXQgZnJvbSB0aGUgd2lkZ2V0cyBsaXN0IG9mIHRoaXMgbGF5b3V0IHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHdpZGdldFxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVtb3ZlV2lkZ2V0RnJvbUxpc3Qod2lkZ2V0KXtcclxuICAgICAgICBmb3IobGV0IGtleSBpbiB0aGlzLl93aWRnZXRzKXtcclxuICAgICAgICAgICAgaWYodGhpcy5fd2lkZ2V0c1trZXldID09IHdpZGdldCl7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fd2lkZ2V0c1trZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRqdXN0IGNoYXJ0cyBkaXYgY29udGFpbmVyID0+IHJlbW92ZSBjaGFydCBzaXplXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gc2l6ZVRvUmVtb3ZlXHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGp1c3RDaGFydHNEaXZDb250YWluZXJTaXplKHNpemVUb1JlbW92ZSl7XHJcbiAgICAgICAgdmFyIGFjdHVhbEhlaWdodCA9ICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpLmhlaWdodCgpO1xyXG4gICAgICAgIHZhciBpbnRlcm5hbENvbnRhaW5lciA9ICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpWzBdO1xyXG4gICAgICAgIGludGVybmFsQ29udGFpbmVyLnN0eWxlLmhlaWdodCEgPSAoYWN0dWFsSGVpZ2h0ISAtIHNpemVUb1JlbW92ZSAtIDQwMCArIHRoaXMuX2RlZmF1bHRTcGxpdHRlclNpemUpICsgXCJweFwiOyAvLyBSZW1vdmUgcGFuZSBzaXplICsgc3BsaXR0ZXIgc2l6ZSg5cHgpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAgQWRqdXN0IGVqU3BsaXR0ZXIgc2l6ZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHNwbGl0dGVyXHJcbiAgICAgKiBAcGFyYW0geyp9IHNpemVUb1JlbW92ZVxyXG4gICAgICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgbmV3IHNwbGl0dGVyIHNpemUgYWZ0ZXIgcmVtb3ZpbmdcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkanVzdFNwbGl0dGVyU2l6ZShzcGxpdHRlciwgc2l6ZVRvUmVtb3ZlKTogbnVtYmVye1xyXG4gICAgICAgIGxldCBhY3R1YWxTcGxpdHRlckhlaWdodCA9IHNwbGl0dGVyLm9wdGlvbihcImhlaWdodFwiKTtcclxuICAgICAgICBsZXQgbmV3U3BsaXR0ZXJIZWlnaHQgPSBwYXJzZUludChhY3R1YWxTcGxpdHRlckhlaWdodCwgMTApOyAvLyBwYXJzZUludCB0byByZW1vdmUgXCJweFwiXHJcbiAgICAgICAgbmV3U3BsaXR0ZXJIZWlnaHQgLT0gc2l6ZVRvUmVtb3ZlICsgdGhpcy5fZGVmYXVsdFNwbGl0dGVyU2l6ZTsgLy8gUmVtb3ZlIHBhbmUgc2l6ZSArIHNwbGl0dGVyIHNpemUoOXB4KVxyXG4gICAgICAgIHNwbGl0dGVyLm9wdGlvbihcImhlaWdodFwiLCBuZXdTcGxpdHRlckhlaWdodCwgdHJ1ZSk7IC8vIFRPRE86IG5vdCBvbmx5IGhlaWdodCwgYWxzbyB3aWR0aCBcclxuICAgICAgICByZXR1cm4gbmV3U3BsaXR0ZXJIZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBOb3RpZmllcyB0aGF0IHNwbGl0dGVyIGhhcyByZXNpemVkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvblNwbGl0dGVyUmVzaXplKGFyZ3MpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZUxheW91dFBhbmVzT25TcGxpdHRlclJlc2l6ZShhcmdzLnNwbGl0YmFySW5kZXgsIGFyZ3MucHJldlBhbmUuc2l6ZSwgYXJncy5uZXh0UGFuZS5zaXplKTtcclxuICAgICAgICB0aGlzLnJlc2l6ZVNwbGl0dGVyUGFuZUNvbnRlbnRzKHRoaXMuX2FjdHVhbFdpZHRoLCB0aGlzLl9hY3R1YWxIZWlnaHQtdGhpcy5faGVhZGVySGVpZ2h0KVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSBsaXN0IHdpdGggb25seSB0aGUgc2l6ZXMgb2YgdGhlIHBhbmVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gcHJvcGVydGllc1xyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFBhbmVTaXplcyhwcm9wZXJ0aWVzKTogQXJyYXk8c3RyaW5nPiB7XHJcbiAgICAgICAgdmFyIHBhbmVTaXplcyA9IG5ldyBBcnJheTxzdHJpbmc+KCk7XHJcbiAgICAgICAgcHJvcGVydGllcy5mb3JFYWNoKHByb3BlcnR5ID0+IHtcclxuICAgICAgICAgICAgcGFuZVNpemVzLnB1c2gocHJvcGVydHkucGFuZVNpemUpOyAgICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBwYW5lU2l6ZXM7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7U3BsaXR0ZXJXaWRnZXR9OyJdfQ==