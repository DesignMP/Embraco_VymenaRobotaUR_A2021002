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
define(["require", "exports", "../common/layoutWidgetBase", "./layoutPane", "../common/viewTypeProvider", "../common/uniqueIdGenerator", "./splitterPaneDefinition", "./splitterDefinition", "../../common/componentFactory/componentDefinition", "../common/widgetBase", "../common/paneProperties"], function (require, exports, layoutWidgetBase_1, layoutPane_1, viewTypeProvider_1, uniqueIdGenerator_1, splitterPaneDefinition_1, splitterDefinition_1, componentDefinition_1, widgetBase_1, paneProperties_1) {
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
            this.component.disablePersisting();
            _super.prototype.dispose.call(this);
            this._widgets.forEach(function (widget) {
                if (widget != undefined) {
                    widget.dispose();
                }
            });
        };
        SplitterWidget.prototype.getComponentSettings = function (onlyModified) {
            this.component.setSetting(splitterDefinition_1.SplitterDefinition.splitterDefinitionId, this.getSplitterDefinition());
            return _super.prototype.getComponentSettings.call(this, onlyModified);
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
            this._widgets.forEach(function (widget, key) {
                if (widget != undefined) {
                    var componentDefinition = new componentDefinition_1.ComponentDefinition("", "", "");
                    componentDefinition.set(widget.component.getDefinition());
                    var paneSettings = undefined;
                    var layoutPane = _this.getLayoutPane(key);
                    if (layoutPane != undefined) {
                        paneSettings = layoutPane.getSettings();
                    }
                    else {
                        console.error("LayoutPane not defined!");
                    }
                    paneDefinitions.push(new splitterPaneDefinition_1.SplitterPaneDefinition(componentDefinition, paneSettings));
                }
            });
            return paneDefinitions;
        };
        SplitterWidget.prototype.getLayoutPane = function (key) {
            var layoutPane;
            layoutPane = this.layoutPanes.filter(function (element) { return element.name == key; });
            return layoutPane[0];
        };
        SplitterWidget.prototype.setSplitterPaneDefinitions = function (paneDefinitions) {
            // Create splitter panes and add widgets
            for (var i_1 = 0; i_1 < paneDefinitions.length; i_1++) {
                if (paneDefinitions[i_1] != undefined) {
                    var componentDefinition = paneDefinitions[i_1].componentDefinition;
                    if (this.component.componentFactory != undefined) {
                        var component = this.component.addSubComponent(componentDefinition.type, componentDefinition.id, componentDefinition.defaultSettingsDataId, this.component.context);
                        if (component != undefined) {
                            // check if instance is a widget
                            if (component instanceof widgetBase_1.WidgetBase) {
                                var widget = component;
                                var splitterStoringDataId = componentDefinition.defaultSettingsDataId;
                                if (splitterStoringDataId != "") {
                                    widget.setDefaultComponentSettingsDataId(splitterStoringDataId);
                                }
                                this.addWidget(widget, componentDefinition.id, viewTypeProvider_1.ViewType.Default, new paneProperties_1.PaneProperties());
                            }
                        }
                        else {
                            if (componentDefinition.type != "ChartBase") { // "ChartBase" currently not implemented => TODO: create charts with componentfactory
                                console.warn("Component with component type '" + componentDefinition.type + "' could not be created!");
                            }
                        }
                    }
                    else {
                        console.error("ComponentFactory not available!");
                    }
                }
            }
            // Set splitter pane sizes
            var i = 0;
            for (var key in this.layoutPanes) {
                var layoutPane = this.layoutPanes[key];
                if (paneDefinitions[i].paneData != undefined) {
                    layoutPane.setSettings(paneDefinitions[i].paneData); // TODO: paneData
                }
                i++;
            }
        };
        /**
         * Get pane definitions from chartSplitter component
         *
         * @returns {Array<SplitterPaneDefinition>}
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.getChartViewSplitterPaneDefinitions = function () {
            var settings = this.component.getComponentSettings();
            var paneDefinitions = new Array();
            if (settings.data != undefined) {
                if (settings.data.splitterDefinition != undefined) {
                    paneDefinitions = settings.data.splitterDefinition.paneDefinitions;
                }
            }
            return paneDefinitions;
        };
        /**
         * Adds a widget to the splitter => a new pane will be added for the widget to the splitter
         *
         * @param {IWidget} widget
         * @param {string} name
         * @param {ViewType} viewType
         * @param {PaneProperties} paneProperties
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.addWidget = function (widget, name, viewType, paneProperties) {
            _super.prototype.addWidget.call(this, widget, name, viewType);
            var splitter = this.getSplitter();
            var properties = this.getProperties(splitter);
            var oldPaneSizes = this.getPaneSizes(properties);
            if (!this._isResponsive && paneProperties.paneSize != -1) {
                this._actualHeight += paneProperties.paneSize + this._defaultSplitterSize;
                this.resizeSplitter(this._actualWidth, this._actualHeight - this._headerHeight);
            }
            var paneId = this.parentContentId + "pane_" + name.replace(" ", "");
            var indexOfNewPane = splitter.model.properties.length;
            this.addPane(splitter, paneId, indexOfNewPane, paneProperties);
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
         * @param {ej.Splitter} splitter
         * @param {string} paneId
         * @param {number} indexOfNewPane
         * @param {PaneProperties} paneProperties
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.addPane = function (splitter, paneId, indexOfNewPane, paneProperties) {
            var newItem;
            if (!this._isResponsive && paneProperties.paneSize != -1) {
                if (indexOfNewPane == 0) {
                    indexOfNewPane++;
                }
                newItem = splitter.removeItem(indexOfNewPane - 1);
                newItem = splitter.addItem("<div id='" + paneId + "' style='overflow:hidden'></div>", { paneSize: paneProperties.paneSize, expandable: paneProperties.expandable, collapsible: paneProperties.collapsible, minSize: paneProperties.minSize }, indexOfNewPane - 1);
                newItem = splitter.addItem("<div id='" + this.parentContentId + "_lastPane" + "' style='overflow:hidden; width:100%; height:100%'></div>", { paneSize: 400, expandable: false, collapsible: false }, indexOfNewPane);
            }
            else {
                newItem = splitter.addItem("<div id='" + paneId + "' style='overflow:hidden'></div>", { paneSize: paneProperties.paneSize, expandable: paneProperties.expandable, collapsible: paneProperties.collapsible, minSize: paneProperties.minSize }, indexOfNewPane);
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
         * @param {ej.Splitter} splitter
         * @param {ILayoutPane} layoutPane
         * @param {number} targetPaneIndex
         * @param {*} properties
         * @param {JQuery<HTMLElement>} movingPane
         * @memberof SplitterWidget
         */
        SplitterWidget.prototype.addPaneWithPaneInfo = function (splitter, layoutPane, targetPaneIndex, properties, movingPane) {
            splitter.addItem(movingPane[0].parentElement.innerHTML, { expandable: layoutPane.expandable, collapsible: layoutPane.collapsible, minSize: layoutPane.minimumSize }, targetPaneIndex);
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
                    this.layoutPanes[i] = new layoutPane_1.LayoutPane(name_1, properties[i].paneSize, paneWidget, false, true, properties[i].expandable, properties[i].collapsible, properties[i].minSize);
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
                this_1.layoutPanes[i] = new layoutPane_1.LayoutPane(name_2, properties[i].paneSize, paneWidget, false, true, properties[i].expandable, properties[i].collapsible, properties[i].minSize);
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
            //Persist data every time a splitter is resized
            this.saveSettings();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXR0ZXJXaWRnZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvc3BsaXR0ZXJXaWRnZXQvc3BsaXR0ZXJXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQWVBO1FBQTZCLGtDQUFnQjtRQUE3QztZQUFBLHFFQXkvQkM7WUF2L0JHLHlCQUF5QjtZQUNqQixtQkFBYSxHQUFHLENBQUMsQ0FBQztZQUVsQixrQkFBWSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDO1lBSXpDLG1CQUFhLEdBQVksSUFBSSxDQUFDO1lBSTlCLDBCQUFvQixHQUFXLENBQUMsQ0FBQyxDQUFDLGlDQUFpQzs7UUE0K0IvRSxDQUFDO1FBMStCRyxtQ0FBVSxHQUFWLFVBQVcsaUJBQXlCLEVBQUUsWUFBdUI7WUFBdkIsNkJBQUEsRUFBQSxnQkFBdUI7WUFDekQsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGlCQUFpQixDQUFDO1lBQzVDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDO1lBRXpCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztZQUUvQixJQUFJLENBQUMsYUFBYSxHQUFHLFlBQVksQ0FBQztZQUNsQyx1QkFBdUI7WUFDdkIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGlCQUFpQixHQUFHLFNBQVMsQ0FBQztZQUN4RCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsaUJBQWlCLEdBQUcsT0FBTyxDQUFDO1lBRXBELGNBQWM7WUFDZCxJQUFHLFlBQVksSUFBSSxDQUFDLEVBQUM7Z0JBQ2pCLENBQUMsQ0FBQyxHQUFHLEdBQUUsaUJBQWlCLENBQUMsQ0FBQyxNQUFNLENBQUMsZ0NBQWdDLEdBQUUsSUFBSSxDQUFDLGtCQUFrQixHQUFHLG1CQUFtQixHQUFFLElBQUksQ0FB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QUFJLENBQUMsQ0FBQztZQUNuRyxJQUFJLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsYUFBYSxHQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtRQUM3RixDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNLLHFDQUFZLEdBQXBCLFVBQXFCLFVBQVU7WUFDM0IsSUFBSSxTQUFTLEdBQUcsSUFBSSxLQUFLLEVBQVUsQ0FBQztZQUNwQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUEsUUFBUTtnQkFDdkIsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdEMsQ0FBQyxDQUFDLENBQUM7WUFDSCxPQUFPLFNBQVMsQ0FBQztRQUNyQixDQUFDO1FBQ0wscUJBQUM7SUFBRCxDQUFDLEFBei9CRCxDQUE2QixtQ0FBZ0IsR0F5L0I1QztJQUVPLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTGF5b3V0V2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vbGF5b3V0V2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBJV2lkZ2V0IH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL3dpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBMYXlvdXRQYW5lIH0gZnJvbSBcIi4vbGF5b3V0UGFuZVwiO1xyXG5pbXBvcnQgeyBWaWV3VHlwZSB9IGZyb20gXCIuLi9jb21tb24vdmlld1R5cGVQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBVbmlxdWVJZEdlbmVyYXRvciB9IGZyb20gXCIuLi9jb21tb24vdW5pcXVlSWRHZW5lcmF0b3JcIjtcclxuXHJcbmltcG9ydCB7IFNwbGl0dGVyUGFuZURlZmluaXRpb24gfSBmcm9tIFwiLi9zcGxpdHRlclBhbmVEZWZpbml0aW9uXCI7XHJcbmltcG9ydCB7IFNwbGl0dGVyRGVmaW5pdGlvbiB9IGZyb20gXCIuL3NwbGl0dGVyRGVmaW5pdGlvblwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnREZWZpbml0aW9uIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRGYWN0b3J5L2NvbXBvbmVudERlZmluaXRpb25cIjtcclxuaW1wb3J0IHsgV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vd2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnRTZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBJU2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3BlcnNpc3RlbmNlL2ludGVyZmFjZXMvc2V0dGluZ3NJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSUxheW91dFBhbmUgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL2xheW91dFBhbmVJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgUGFuZVByb3BlcnRpZXMgfSBmcm9tIFwiLi4vY29tbW9uL3BhbmVQcm9wZXJ0aWVzXCI7XHJcblxyXG5jbGFzcyBTcGxpdHRlcldpZGdldCBleHRlbmRzIExheW91dFdpZGdldEJhc2V7XHJcbiAgICBcclxuICAgIC8vIFNldCBzb21lIGRlZmF1bHQgc2l6ZXNcclxuICAgIHByaXZhdGUgX2hlYWRlckhlaWdodCA9IDA7XHJcblxyXG4gICAgcHJpdmF0ZSBfb3JpZW50YXRpb24gPSBlai5PcmllbnRhdGlvbi5Ib3Jpem9udGFsO1xyXG5cclxuICAgIHByaXZhdGUgX2hlYWRlckNvbnRhaW5lcklkO1xyXG5cdHByaXZhdGUgX21haW5Db250YWluZXJJZDtcclxuICAgIHByaXZhdGUgX2lzUmVzcG9uc2l2ZTogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgcHJpdmF0ZSBfbGF5b3V0Q29udGFpbmVySWQhOiBzdHJpbmc7XHJcblxyXG4gICAgcHJpdmF0ZSBfZGVmYXVsdFNwbGl0dGVyU2l6ZTogbnVtYmVyID0gOTsgLy8gVE9ETyBnZXQgYWN0dWFsIHNwbGl0dGVyIHNpemUgXHJcblxyXG4gICAgaW5pdGlhbGl6ZShsYXlvdXRDb250YWluZXJJZDogc3RyaW5nLCBoZWFkZXJIZWlnaHQ6bnVtYmVyID0gMCkge1xyXG4gICAgICAgIHRoaXMuX2xheW91dENvbnRhaW5lcklkID0gbGF5b3V0Q29udGFpbmVySWQ7XHJcbiAgICAgICAgdGhpcy5fYWN0dWFsV2lkdGggPSAxMDAwO1xyXG4gICAgICAgIHRoaXMuX2FjdHVhbEhlaWdodCA9IDQwMDtcclxuXHJcbiAgICAgICAgdGhpcy5sYXlvdXRQYW5lcyA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgXHJcbiAgICAgICAgdGhpcy5faGVhZGVySGVpZ2h0ID0gaGVhZGVySGVpZ2h0O1xyXG4gICAgICAgIC8vIEFkZCBhZGRpdGlvbmFsIGRpdnMgXHJcbiAgICAgICAgdGhpcy5faGVhZGVyQ29udGFpbmVySWQgPSBsYXlvdXRDb250YWluZXJJZCArIFwiX2hlYWRlclwiO1xyXG4gICAgICAgIHRoaXMuX21haW5Db250YWluZXJJZCA9IGxheW91dENvbnRhaW5lcklkICsgXCJfbWFpblwiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIEFkZCBoZWFkZXIgXHJcbiAgICAgICAgaWYoaGVhZGVySGVpZ2h0ICE9IDApe1xyXG4gICAgICAgICAgICAkKFwiI1wiKyBsYXlvdXRDb250YWluZXJJZCkuYXBwZW5kKFwiPGRpdiBjbGFzcz0nd2lkZ2V0SGVhZGVyJyBpZD0nXCIrIHRoaXMuX2hlYWRlckNvbnRhaW5lcklkICsgXCInIHN0eWxlPSdoZWlnaHQ6IFwiKyB0aGlzLl9oZWFkZXJIZWlnaHQgKyBcInB4Jz48L2Rpdj5cIilcclxuICAgICAgICB9XHJcbiAgICAgICAgJChcIiNcIisgbGF5b3V0Q29udGFpbmVySWQpLmFwcGVuZChcIjxkaXYgaWQ9J1wiKyB0aGlzLl9tYWluQ29udGFpbmVySWQgKyBcIic+PC9kaXY+XCIpXHJcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZSh0aGlzLl9tYWluQ29udGFpbmVySWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEhlYWRlckNvbnRlbnQoY29udGVudDpzdHJpbmcpe1xyXG5cdFx0JChcIiNcIisgdGhpcy5faGVhZGVyQ29udGFpbmVySWQpWzBdLmlubmVySFRNTCA9IGNvbnRlbnQ7XHJcblx0fVxyXG5cclxuICAgIHNldE9yaWVudGF0aW9uKG9yaWVudGF0aW9uOiBzdHJpbmcpe1xyXG4gICAgICAgIGlmKG9yaWVudGF0aW9uID09IFNwbGl0dGVyRGVmaW5pdGlvbi5vcmllbnRhdGlvblZlcnRpY2FsKXtcclxuICAgICAgICAgICAgdGhpcy5fb3JpZW50YXRpb24gPSBlai5PcmllbnRhdGlvbi5WZXJ0aWNhbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihvcmllbnRhdGlvbiA9PSBTcGxpdHRlckRlZmluaXRpb24ub3JpZW50YXRpb25Ib3Jpem9udGFsKXtcclxuICAgICAgICAgICAgdGhpcy5fb3JpZW50YXRpb24gPSBlai5PcmllbnRhdGlvbi5Ib3Jpem9udGFsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRPcmllbnRhdGlvbigpOiBzdHJpbmd7XHJcbiAgICAgICAgaWYodGhpcy5fb3JpZW50YXRpb24gPT0gZWouT3JpZW50YXRpb24uVmVydGljYWwpe1xyXG4gICAgICAgICAgICByZXR1cm4gU3BsaXR0ZXJEZWZpbml0aW9uLm9yaWVudGF0aW9uVmVydGljYWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5fb3JpZW50YXRpb24gPT0gZWouT3JpZW50YXRpb24uSG9yaXpvbnRhbCl7XHJcbiAgICAgICAgICAgIHJldHVybiBTcGxpdHRlckRlZmluaXRpb24ub3JpZW50YXRpb25Ib3Jpem9udGFsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBnZXRSZXNwb25zaXZlKCk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzUmVzcG9uc2l2ZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRSZXNwb25zaXZlKGlzUmVzcG9uc2l2ZTogYm9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5faXNSZXNwb25zaXZlID0gaXNSZXNwb25zaXZlO1xyXG4gICAgICAgIHRoaXMuX2FjdHVhbEhlaWdodCA9IDQwMDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIHNwbGl0dGVyIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBjcmVhdGVMYXlvdXQoKSB7XHJcbiAgICAgXHJcbiAgICAgICAgJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCkuZWpTcGxpdHRlcih7XHJcbiAgICAgICAgICAgIGlzUmVzcG9uc2l2ZTogdHJ1ZSxcclxuICAgICAgICAgICAgb3JpZW50YXRpb246IGVqLk9yaWVudGF0aW9uLkhvcml6b250YWwsIC8vIEluaXRpYWwgb25seSBIb3Jpem9udGFsIGlzIHdvcmtpbmcgPT4gbGF0ZXIgc3dpdGNoIHRvIHZlcnRpY2FsIGluIHJlY2FsY3VsYXRlIGxheW91dCBpcyBwb3NzaWJsZVxyXG4gICAgICAgICAgICBhbGxvd0tleWJvYXJkTmF2aWdhdGlvbjogZmFsc2UsXHJcbiAgICAgICAgICAgIC8vIFNldCBhIGRlZmF1bHQgc2l6ZSA9PiBOZWVkZWQgZm9yIGluYWN0aXZlIHNwbGl0dGVyIHdpbmRvd3MgdG8gYXZvaWQgQWRkSXRlbSBwcm9ibGVtc1xyXG4gICAgICAgICAgICB3aWR0aDogXCI0MDBweFwiLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IFwiNDAwcHhcIixcclxuICAgICAgICAgICAgcmVzaXplOiAoYXJncykgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vblNwbGl0dGVyUmVzaXplKGFyZ3MpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjcmVhdGU6IChhcmdzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKVswXS5zdHlsZS5wYWRkaW5nID0gXCIwcHhcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgYWN0dWFsIGxheW91dCBwYW5lcyBkZWZpbml0aW9ucyB0byB0aGUgZWpzcGxpdHRlclxyXG4gICAgICogXHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcmVjYWxjdWxhdGVMYXlvdXQoKXtcclxuICAgICAgICB2YXIgc3BsaXR0ZXIgPSB0aGlzLmdldFNwbGl0dGVyKCk7XHJcbiAgICAgICAgLy8gU2V0IG9yaWVudGF0aW9uIGJlZm9yZSBnZXQgcHJvcGVydGllcyB0byB0aGUgY29ycmVjdCBwYW5lU2l6ZXMoaGVpZ2h0L3dpZHRoKVxyXG4gICAgICAgIHNwbGl0dGVyLm9wdGlvbihcIm9yaWVudGF0aW9uXCIsIHRoaXMuX29yaWVudGF0aW9uKTtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgcHJvcGVydGllcyA9IHRoaXMuZ2V0UHJvcGVydGllcyhzcGxpdHRlcik7XHJcbiAgICAgICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyh0aGlzLmxheW91dFBhbmVzKTtcclxuICAgICAgICBpZihwcm9wZXJ0aWVzLmxlbmd0aCAhPSBrZXlzLmxlbmd0aCl7XHJcbiAgICAgICAgICAgIHRocm93KG5ldyBFcnJvcihcInByb3BlcnRpZXMubGVuZ3RoICE9IHRoaXMubGF5b3V0UGFuZXMubGVuZ3RoXCIpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGVQcm9wZXJ0aWVzSW5mb3JtYXRpb25zV2l0aExheW91dFBhbmVzRGF0YShwcm9wZXJ0aWVzKTtcclxuICAgICAgICB0aGlzLnNldFByb3BlcnRpZXMoc3BsaXR0ZXIsIHByb3BlcnRpZXMpO1xyXG5cclxuICAgICAgICBpZih0aGlzLl9pc1Jlc3BvbnNpdmUgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAvLyBjcmVhdGUgZGVmYXVsdCBmaXJzdCBwYW5lLCB3aGljaCB3aWxsIGJlIG5lZWRlZCBmb3IgZHJhZyZkcm9wIG9mIG5ldyB3aWRnZXRzIHRvIHRoZSBzcGxpdHRlciB3aWRnZXRcclxuICAgICAgICAgICAgbGV0IHNwbGl0dGVyID0gdGhpcy5nZXRTcGxpdHRlcigpO1xyXG4gICAgICAgICAgICBsZXQgbmV3SXRlbSA9IHNwbGl0dGVyLmFkZEl0ZW0oXCI8ZGl2IGlkPSdcIiArIHRoaXMucGFyZW50Q29udGVudElkICsgXCJfbGFzdFBhbmVcIiArIFwiJyBzdHlsZT0nb3ZlcmZsb3c6aGlkZGVuOyB3aWR0aDoxMDAlOyBoZWlnaHQ6MTAwJSc+PC9kaXY+XCIsIHsgcGFuZVNpemU6IDQwMCwgZXhwYW5kYWJsZTogZmFsc2UsIGNvbGxhcHNpYmxlOiBmYWxzZX0sIDApOyBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZXNpemVzIHRoZSBzcGxpdHRlciB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gd2lkdGhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICByZXNpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHsgICBcclxuICAgICAgICBpZih0aGlzLl9pc1Jlc3BvbnNpdmUpe1xyXG4gICAgICAgICAgICB0aGlzLl9hY3R1YWxIZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2FjdHVhbFdpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5yZXNpemVTcGxpdHRlcih0aGlzLl9hY3R1YWxXaWR0aCwgdGhpcy5fYWN0dWFsSGVpZ2h0LXRoaXMuX2hlYWRlckhlaWdodCk7XHJcbiAgICAgICAgdGhpcy5yZXNpemVTcGxpdHRlclBhbmVDb250ZW50cyh0aGlzLl9hY3R1YWxXaWR0aCwgdGhpcy5fYWN0dWFsSGVpZ2h0LXRoaXMuX2hlYWRlckhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkcyB0aGUgc3R5bGVzIGZvciB0aGUgc3BsaXR0ZXIgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGxvYWRTdHlsZXMoKXtcclxuICAgICAgICAvLyBhZGRTdHlsZSB1c2VzIGNzc1BhcmVudENvbnRlbnRJZCB3aGljaCBpcyBkaWZmZXJlbnQgdG8gX2xheW91dENvbnRhaW5lcklkIGFuZCBkb2VzIG5vdCB3b3JrIVxyXG4gICAgICAgIHN1cGVyLmFkZFN0eWxlVG9Db250ZW50SWQoXCIjXCIgKyB0aGlzLl9sYXlvdXRDb250YWluZXJJZCwgXCJ3aWRnZXRzL3NwbGl0dGVyV2lkZ2V0L3N0eWxlL2Nzcy9zcGxpdHRlclN0eWxlLmNzc1wiKTtcclxuICAgICAgICBzdXBlci5hZGRTdHlsZVRvQ29udGVudElkKFwiI1wiICsgdGhpcy5fbGF5b3V0Q29udGFpbmVySWQsIFwid2lkZ2V0cy9jb21tb24vc3R5bGUvY3NzL3dpZGdldEhlYWRlckZvb3RlclN0eWxlLmNzc1wiKTtcclxuICAgIH1cclxuXHJcbiAgICBhY3RpdmF0ZSgpe1xyXG4gICAgICAgIHRoaXMuX3dpZGdldHMuZm9yRWFjaCgod2lkZ2V0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHdpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgd2lkZ2V0LmFjdGl2YXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBkZWFjdGl2YXRlKCl7XHJcbiAgICAgICAgdGhpcy5fd2lkZ2V0cy5mb3JFYWNoKCh3aWRnZXQpID0+IHtcclxuICAgICAgICAgICAgaWYod2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICB3aWRnZXQuZGVhY3RpdmF0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGRpc3Bvc2UoKXtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5kaXNhYmxlUGVyc2lzdGluZygpO1xyXG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcclxuXHJcbiAgICAgICAgdGhpcy5fd2lkZ2V0cy5mb3JFYWNoKCh3aWRnZXQpID0+IHtcclxuICAgICAgICAgICAgaWYod2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICB3aWRnZXQuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBnZXRDb21wb25lbnRTZXR0aW5ncyhvbmx5TW9kaWZpZWQ6IGJvb2xlYW4pOiBDb21wb25lbnRTZXR0aW5ncyB7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuc2V0U2V0dGluZyhTcGxpdHRlckRlZmluaXRpb24uc3BsaXR0ZXJEZWZpbml0aW9uSWQsIHRoaXMuZ2V0U3BsaXR0ZXJEZWZpbml0aW9uKCkpO1xyXG4gICAgICAgIHJldHVybiBzdXBlci5nZXRDb21wb25lbnRTZXR0aW5ncyhvbmx5TW9kaWZpZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRDb21wb25lbnRTZXR0aW5ncyhkYXRhOiBDb21wb25lbnRTZXR0aW5ncykge1xyXG4gICAgICAgIGlmIChkYXRhICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBzdXBlci5zZXRDb21wb25lbnRTZXR0aW5ncyhkYXRhKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBzcGxpdHRlckRlZmluaXRpb24gPSB0aGlzLmNvbXBvbmVudC5nZXRTZXR0aW5nKFNwbGl0dGVyRGVmaW5pdGlvbi5zcGxpdHRlckRlZmluaXRpb25JZCk7XHJcbiAgICAgICAgICAgIGlmKHNwbGl0dGVyRGVmaW5pdGlvbiAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTcGxpdHRlckRlZmluaXRpb24oc3BsaXR0ZXJEZWZpbml0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFNwbGl0dGVyRGVmaW5pdGlvbigpOiBTcGxpdHRlckRlZmluaXRpb257XHJcbiAgICAgICAgbGV0IHNwbGl0dGVyRGVmaW5pdGlvbiA9IG5ldyBTcGxpdHRlckRlZmluaXRpb24odGhpcy5nZXRPcmllbnRhdGlvbigpLCB0aGlzLmdldFJlc3BvbnNpdmUoKSk7XHJcbiAgICAgICAgc3BsaXR0ZXJEZWZpbml0aW9uLnBhbmVEZWZpbml0aW9ucyA9IHRoaXMuZ2V0U3BsaXR0ZXJQYW5lRGVmaW5pdGlvbnMoKTtcclxuICAgICAgICByZXR1cm4gc3BsaXR0ZXJEZWZpbml0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0U3BsaXR0ZXJEZWZpbml0aW9uKHNwbGl0dGVyRGVmaW5pdGlvbjogU3BsaXR0ZXJEZWZpbml0aW9uKXtcclxuICAgICAgICBsZXQgc3BsaXR0ZXJPcmllbnRhdGlvbiA9IHNwbGl0dGVyRGVmaW5pdGlvbi5vcmllbnRhdGlvbjtcclxuICAgICAgICBsZXQgc3BsaXR0ZXJSZXNwb25zaXZlID0gc3BsaXR0ZXJEZWZpbml0aW9uLnJlc3BvbnNpdmU7XHJcbiAgICAgICAgbGV0IHBhbmVEZWZpbml0aW9ucyA9IHNwbGl0dGVyRGVmaW5pdGlvbi5wYW5lRGVmaW5pdGlvbnM7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYocGFuZURlZmluaXRpb25zID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gU2V0IHNwbGl0dGVyIHBhbmVzXHJcbiAgICAgICAgdGhpcy5zZXRTcGxpdHRlclBhbmVEZWZpbml0aW9ucyhwYW5lRGVmaW5pdGlvbnMpO1xyXG4gXHJcbiAgICAgICAgLy8gU2V0IG9yaWVudGF0aW9uIG9mIHNwbGl0dGVyIHBhbmVzXHJcbiAgICAgICAgdGhpcy5zZXRPcmllbnRhdGlvbihzcGxpdHRlck9yaWVudGF0aW9uKTtcclxuXHJcbiAgICAgICAgLy8gU2V0IHJlc3BvbnNpdmUgb2Ygc3BsaXR0ZXJcclxuICAgICAgICB0aGlzLnNldFJlc3BvbnNpdmUoc3BsaXR0ZXJSZXNwb25zaXZlKTtcclxuXHJcbiAgICAgICAgdGhpcy5yZWNhbGN1bGF0ZUxheW91dCgpOyAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByaXZhdGUgZ2V0U3BsaXR0ZXJQYW5lRGVmaW5pdGlvbnMoKTogQXJyYXk8U3BsaXR0ZXJQYW5lRGVmaW5pdGlvbj57XHJcbiAgICAgICAgbGV0IHBhbmVEZWZpbml0aW9ucyA9IG5ldyBBcnJheTxTcGxpdHRlclBhbmVEZWZpbml0aW9uPigpO1xyXG4gICAgICAgIHRoaXMuX3dpZGdldHMuZm9yRWFjaCgod2lkZ2V0LCBrZXkpID0+IHtcclxuICAgICAgICAgICAgaWYod2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29tcG9uZW50RGVmaW5pdGlvbiA9IG5ldyBDb21wb25lbnREZWZpbml0aW9uKFwiXCIsXCJcIixcIlwiKTtcclxuICAgICAgICAgICAgICAgIGNvbXBvbmVudERlZmluaXRpb24uc2V0KHdpZGdldC5jb21wb25lbnQuZ2V0RGVmaW5pdGlvbigpKTtcclxuICAgICAgICAgICAgICAgIGxldCBwYW5lU2V0dGluZ3M6IElTZXR0aW5nc3x1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGF5b3V0UGFuZSA9IHRoaXMuZ2V0TGF5b3V0UGFuZShrZXkpO1xyXG4gICAgICAgICAgICAgICAgaWYobGF5b3V0UGFuZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHBhbmVTZXR0aW5ncyA9IGxheW91dFBhbmUuZ2V0U2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkxheW91dFBhbmUgbm90IGRlZmluZWQhXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcGFuZURlZmluaXRpb25zLnB1c2gobmV3IFNwbGl0dGVyUGFuZURlZmluaXRpb24oY29tcG9uZW50RGVmaW5pdGlvbiwgcGFuZVNldHRpbmdzKSk7IFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHBhbmVEZWZpbml0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldExheW91dFBhbmUoa2V5OiBzdHJpbmcpOiBJTGF5b3V0UGFuZXtcclxuICAgICAgICBsZXQgbGF5b3V0UGFuZTtcclxuICAgICAgICBsYXlvdXRQYW5lID0gdGhpcy5sYXlvdXRQYW5lcy5maWx0ZXIoZWxlbWVudCA9PiB7IHJldHVybiBlbGVtZW50Lm5hbWUgPT0ga2V5fSlcclxuICAgICAgICByZXR1cm4gbGF5b3V0UGFuZVswXTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFNwbGl0dGVyUGFuZURlZmluaXRpb25zKHBhbmVEZWZpbml0aW9uczogQXJyYXk8U3BsaXR0ZXJQYW5lRGVmaW5pdGlvbj4pe1xyXG4gICAgICAgIC8vIENyZWF0ZSBzcGxpdHRlciBwYW5lcyBhbmQgYWRkIHdpZGdldHNcclxuICAgICAgICBmb3IoIGxldCBpID0gMDsgaSA8IHBhbmVEZWZpbml0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZihwYW5lRGVmaW5pdGlvbnNbaV0gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGxldCBjb21wb25lbnREZWZpbml0aW9uID0gcGFuZURlZmluaXRpb25zW2ldLmNvbXBvbmVudERlZmluaXRpb247XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmNvbXBvbmVudC5jb21wb25lbnRGYWN0b3J5ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50LmFkZFN1YkNvbXBvbmVudChjb21wb25lbnREZWZpbml0aW9uLnR5cGUsIGNvbXBvbmVudERlZmluaXRpb24uaWQsIGNvbXBvbmVudERlZmluaXRpb24uZGVmYXVsdFNldHRpbmdzRGF0YUlkLCB0aGlzLmNvbXBvbmVudC5jb250ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICBpZihjb21wb25lbnQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgaW5zdGFuY2UgaXMgYSB3aWRnZXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY29tcG9uZW50IGluc3RhbmNlb2YgV2lkZ2V0QmFzZSl7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHdpZGdldCA9IGNvbXBvbmVudCAgYXMgSVdpZGdldDsgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNwbGl0dGVyU3RvcmluZ0RhdGFJZCA9IGNvbXBvbmVudERlZmluaXRpb24uZGVmYXVsdFNldHRpbmdzRGF0YUlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc3BsaXR0ZXJTdG9yaW5nRGF0YUlkICE9IFwiXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC5zZXREZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NEYXRhSWQoc3BsaXR0ZXJTdG9yaW5nRGF0YUlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFdpZGdldCh3aWRnZXQsIGNvbXBvbmVudERlZmluaXRpb24uaWQsIFZpZXdUeXBlLkRlZmF1bHQsIG5ldyBQYW5lUHJvcGVydGllcygpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihjb21wb25lbnREZWZpbml0aW9uLnR5cGUgIT0gXCJDaGFydEJhc2VcIil7IC8vIFwiQ2hhcnRCYXNlXCIgY3VycmVudGx5IG5vdCBpbXBsZW1lbnRlZCA9PiBUT0RPOiBjcmVhdGUgY2hhcnRzIHdpdGggY29tcG9uZW50ZmFjdG9yeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiQ29tcG9uZW50IHdpdGggY29tcG9uZW50IHR5cGUgJ1wiICsgY29tcG9uZW50RGVmaW5pdGlvbi50eXBlICsgXCInIGNvdWxkIG5vdCBiZSBjcmVhdGVkIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkNvbXBvbmVudEZhY3Rvcnkgbm90IGF2YWlsYWJsZSFcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNldCBzcGxpdHRlciBwYW5lIHNpemVzXHJcbiAgICAgICAgbGV0IGkgPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLmxheW91dFBhbmVzKSB7XHJcbiAgICAgICAgICAgIGxldCBsYXlvdXRQYW5lID0gdGhpcy5sYXlvdXRQYW5lc1trZXldO1xyXG4gICAgICAgICAgICBpZihwYW5lRGVmaW5pdGlvbnNbaV0ucGFuZURhdGEgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGxheW91dFBhbmUuc2V0U2V0dGluZ3MocGFuZURlZmluaXRpb25zW2ldLnBhbmVEYXRhKTsgLy8gVE9ETzogcGFuZURhdGFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpKys7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHBhbmUgZGVmaW5pdGlvbnMgZnJvbSBjaGFydFNwbGl0dGVyIGNvbXBvbmVudFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxTcGxpdHRlclBhbmVEZWZpbml0aW9uPn1cclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0Q2hhcnRWaWV3U3BsaXR0ZXJQYW5lRGVmaW5pdGlvbnMoKTogQXJyYXk8U3BsaXR0ZXJQYW5lRGVmaW5pdGlvbj57XHJcbiAgICAgICAgbGV0IHNldHRpbmdzID0gdGhpcy5jb21wb25lbnQuZ2V0Q29tcG9uZW50U2V0dGluZ3MoKTtcclxuICAgICAgICBsZXQgcGFuZURlZmluaXRpb25zID0gbmV3IEFycmF5PFNwbGl0dGVyUGFuZURlZmluaXRpb24+KCk7XHJcbiAgICAgICAgaWYgKHNldHRpbmdzLmRhdGEgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGlmIChzZXR0aW5ncy5kYXRhLnNwbGl0dGVyRGVmaW5pdGlvbiAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHBhbmVEZWZpbml0aW9ucyA9IHNldHRpbmdzLmRhdGEuc3BsaXR0ZXJEZWZpbml0aW9uLnBhbmVEZWZpbml0aW9ucztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHBhbmVEZWZpbml0aW9ucztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgd2lkZ2V0IHRvIHRoZSBzcGxpdHRlciA9PiBhIG5ldyBwYW5lIHdpbGwgYmUgYWRkZWQgZm9yIHRoZSB3aWRnZXQgdG8gdGhlIHNwbGl0dGVyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJV2lkZ2V0fSB3aWRnZXRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAgICAgKiBAcGFyYW0ge1ZpZXdUeXBlfSB2aWV3VHlwZVxyXG4gICAgICogQHBhcmFtIHtQYW5lUHJvcGVydGllc30gcGFuZVByb3BlcnRpZXNcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBhZGRXaWRnZXQod2lkZ2V0OiBJV2lkZ2V0LCBuYW1lOiBzdHJpbmcsIHZpZXdUeXBlOiBWaWV3VHlwZSwgcGFuZVByb3BlcnRpZXM6IFBhbmVQcm9wZXJ0aWVzKXsgXHJcbiAgICAgICAgc3VwZXIuYWRkV2lkZ2V0KHdpZGdldCwgbmFtZSwgdmlld1R5cGUpO1xyXG5cclxuICAgICAgICBsZXQgc3BsaXR0ZXIgPSB0aGlzLmdldFNwbGl0dGVyKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHByb3BlcnRpZXMgPSB0aGlzLmdldFByb3BlcnRpZXMoc3BsaXR0ZXIpOyBcclxuICAgICAgICBsZXQgb2xkUGFuZVNpemVzID0gdGhpcy5nZXRQYW5lU2l6ZXMocHJvcGVydGllcyk7XHJcblxyXG4gICAgICAgIGlmKCF0aGlzLl9pc1Jlc3BvbnNpdmUgJiYgcGFuZVByb3BlcnRpZXMucGFuZVNpemUgIT0gLTEpe1xyXG4gICAgICAgICAgICB0aGlzLl9hY3R1YWxIZWlnaHQgKz0gcGFuZVByb3BlcnRpZXMucGFuZVNpemUgKyB0aGlzLl9kZWZhdWx0U3BsaXR0ZXJTaXplO1xyXG4gICAgICAgICAgICB0aGlzLnJlc2l6ZVNwbGl0dGVyKHRoaXMuX2FjdHVhbFdpZHRoLCB0aGlzLl9hY3R1YWxIZWlnaHQgLSB0aGlzLl9oZWFkZXJIZWlnaHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHBhbmVJZCA9IHRoaXMucGFyZW50Q29udGVudElkICsgXCJwYW5lX1wiICsgbmFtZS5yZXBsYWNlKFwiIFwiLCBcIlwiKTtcclxuICAgICAgICB2YXIgaW5kZXhPZk5ld1BhbmUgPSBzcGxpdHRlci5tb2RlbC5wcm9wZXJ0aWVzIS5sZW5ndGg7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkUGFuZShzcGxpdHRlciwgcGFuZUlkLCBpbmRleE9mTmV3UGFuZSwgcGFuZVByb3BlcnRpZXMpO1xyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICB3aWRnZXQuaW5pdGlhbGl6ZShwYW5lSWQpO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZUxheW91dFBhbmVzQWZ0ZXJBZGRpbmdOZXdQYW5lKHByb3BlcnRpZXMsIG9sZFBhbmVTaXplcywgd2lkZ2V0LCB2aWV3VHlwZSk7XHJcblxyXG4gICAgICAgIGlmKCF0aGlzLl9pc1Jlc3BvbnNpdmUpe1xyXG4gICAgICAgICAgICB0aGlzLnNldFByb3BlcnRpZXMoc3BsaXR0ZXIsIHByb3BlcnRpZXMpO1xyXG4gICAgICAgICAgICB0aGlzLnJlc2l6ZVNwbGl0dGVyUGFuZUNvbnRlbnRzKHRoaXMuX2FjdHVhbFdpZHRoLCB0aGlzLl9hY3R1YWxIZWlnaHQtdGhpcy5faGVhZGVySGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIGEgd2lkZ2V0KHBhbmUpIGZyb20gdGhlIHNwbGl0dGVyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJV2lkZ2V0fSB3aWRnZXRcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICByZW1vdmVXaWRnZXQod2lkZ2V0OiBJV2lkZ2V0KXtcclxuICAgICAgICBsZXQgcGFuZUluZGV4ID0gdGhpcy5nZXRQYW5lSW5kZXgod2lkZ2V0KTtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgc3BsaXR0ZXIgPSB0aGlzLmdldFNwbGl0dGVyKCk7XHJcbiAgICAgICAgLy8gZ2V0IGFsbCBhY3R1YWwgcGFuZVNpemVzIFxyXG4gICAgICAgIHZhciBwcm9wZXJ0aWVzID0gdGhpcy5nZXRQcm9wZXJ0aWVzKHNwbGl0dGVyKTsgIFxyXG4gICAgICAgIHZhciBzaXplVG9SZW1vdmUgPSBwcm9wZXJ0aWVzW3BhbmVJbmRleF0ucGFuZVNpemU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIHBhbmVTaXplcyA9IHRoaXMuZ2V0UGFuZVNpemVzKHByb3BlcnRpZXMpO1xyXG4gICAgICAgIHBhbmVTaXplcy5zcGxpY2UocGFuZUluZGV4LCAxKTtcclxuICAgICAgICBzcGxpdHRlci5yZW1vdmVJdGVtKHBhbmVJbmRleCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5hZGp1c3RDaGFydHNEaXZDb250YWluZXJTaXplKHNpemVUb1JlbW92ZSk7XHJcbiAgICAgICAgbGV0IG5ld1NwbGl0dGVySGVpZ2h0ID0gdGhpcy5hZGp1c3RTcGxpdHRlclNpemUoc3BsaXR0ZXIsIHNpemVUb1JlbW92ZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHByb3BlcnRpZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBwcm9wZXJ0aWVzW2ldLnBhbmVTaXplID0gcGFuZVNpemVzW2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmxheW91dFBhbmVzLnNwbGljZShwYW5lSW5kZXgsMSk7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVXaWRnZXRGcm9tTGlzdCh3aWRnZXQpO1xyXG4gXHJcbiAgICAgICAgdGhpcy5fYWN0dWFsSGVpZ2h0ID0gbmV3U3BsaXR0ZXJIZWlnaHQ7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0UHJvcGVydGllcyhzcGxpdHRlciwgcHJvcGVydGllcyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogTW92ZXMgYSB3aWRnZXQoc3BsaXR0ZXIgcGFuZSkgZnJvbSB0aGUgc291cmNlIGluZGV4IHRvIHRoZSB0YXJnZXQgaW5kZXhcclxuICAgICAqIChpbnRlcm5hbDogdGFyZ2V0IGluZGV4IHdpbGwgYmUgZGVjcmVhc2VkIGJ5IDEgaWYgc291cmNlIGluZGV4IGlzIGJlZm9yZSB0YXJnZXQgaW5kZXgpXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNvdXJjZVBhbmVJbmRleFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRhcmdldFBhbmVJbmRleFxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIG1vdmVXaWRnZXQod2lkZ2V0OiBJV2lkZ2V0LCB0YXJnZXRQYW5lSW5kZXg6IG51bWJlcil7XHJcbiAgICAgICAgd2lkZ2V0LmRpc3Bvc2UoKTtcclxuXHJcbiAgICAgICAgbGV0IHNvdXJjZVBhbmVJbmRleCA9IHRoaXMuZ2V0UGFuZUluZGV4KHdpZGdldCk7XHJcbiAgICAgICAgbGV0IHNwbGl0dGVyID0gdGhpcy5nZXRTcGxpdHRlcigpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBsYXlvdXRQYW5lID0gdGhpcy5sYXlvdXRQYW5lc1tzb3VyY2VQYW5lSW5kZXhdO1xyXG4gICAgICAgIGxldCBtb3ZpbmdQYW5lID0gJCh3aWRnZXQuY3NzUGFyZW50Q29udGVudElkKTtcclxuXHJcbiAgICAgICAgdGFyZ2V0UGFuZUluZGV4ID0gdGhpcy51cGRhdGFUYXJnZXRQYW5lSW5kZXgoc291cmNlUGFuZUluZGV4LCB0YXJnZXRQYW5lSW5kZXgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBwcm9wZXJ0aWVzID0gdGhpcy5nZXRQcm9wZXJ0aWVzKHNwbGl0dGVyKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVByb3BlcnRpZXNMaXN0KHByb3BlcnRpZXMsIHNvdXJjZVBhbmVJbmRleCwgdGFyZ2V0UGFuZUluZGV4KVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMucmVtb3ZlUGFuZShzcGxpdHRlciwgc291cmNlUGFuZUluZGV4KTtcclxuICAgICAgICB0aGlzLmFkZFBhbmVXaXRoUGFuZUluZm8oc3BsaXR0ZXIsIGxheW91dFBhbmUsIHRhcmdldFBhbmVJbmRleCwgcHJvcGVydGllcywgbW92aW5nUGFuZSk7XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlTGF5b3V0UGFuZXNMaXN0QWZ0ZXJNb3ZpbmcobGF5b3V0UGFuZSwgc291cmNlUGFuZUluZGV4LCB0YXJnZXRQYW5lSW5kZXgpO1xyXG5cclxuICAgICAgICB0aGlzLnJlc2l6ZVNwbGl0dGVyKHRoaXMuX2FjdHVhbFdpZHRoLCB0aGlzLl9hY3R1YWxIZWlnaHQtdGhpcy5faGVhZGVySGVpZ2h0KTtcclxuXHJcbiAgICAgICAgLy8gZm9yY2UgYSByZWluaXRpYWxpemF0aW9uIG9mIHRoZSBjaGFydCBpbnN0YW5jZS5cclxuICAgICAgICB3aWRnZXQucmVpbml0aWFsaXplKCk7XHJcbiAgICAgICAgd2lkZ2V0LmZsYWdnZWRGb3JSZXNpemUgPSB0cnVlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMucmVzaXplU3BsaXR0ZXJQYW5lQ29udGVudHModGhpcy5fYWN0dWFsV2lkdGgsdGhpcy5fYWN0dWFsSGVpZ2h0LXRoaXMuX2hlYWRlckhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNpemUgYSB3aWRnZXQgdG8gYSBuZXcgc2l6ZSBhbmQgYWRhcHQgdGhlIG90aGVyIHdpZGdldHMgaW4gdGhpcyBsYXlvdXRXaWRnZXQoc3BsaXR0ZXIpXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJV2lkZ2V0fSB3aWRnZXRcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBuZXdTaXplXHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcmVzaXplV2lkZ2V0KHdpZGdldDogSVdpZGdldCwgbmV3U2l6ZTogbnVtYmVyKXtcclxuICAgICAgICBsZXQgcGFuZUluZGV4ID0gdGhpcy5nZXRQYW5lSW5kZXgod2lkZ2V0KTtcclxuICAgICAgICB2YXIgc3BsaXR0ZXIgPSB0aGlzLmdldFNwbGl0dGVyKCk7XHJcblxyXG4gICAgICAgIGxldCBwcm9wZXJ0aWVzID0gdGhpcy5nZXRQcm9wZXJ0aWVzKHNwbGl0dGVyKSBcclxuICAgICAgICAvLyBzZXQgbmV3IHBhbmUgc2l6ZXNcclxuICAgICAgICBsZXQgY3VycmVudFBhbmVTaXplID0gcHJvcGVydGllc1twYW5lSW5kZXhdLnBhbmVTaXplO1xyXG4gICAgICAgIGxldCBwYW5lRGlmZlNpemUgPSBjdXJyZW50UGFuZVNpemUtbmV3U2l6ZTtcclxuXHJcbiAgICAgICAgbGV0IHNpemVPZk90aGVyUGFuZSA9IC0xO1xyXG4gICAgICAgIGxldCBpbmRleE9mT3RoZXJQYW5lID0gLTE7XHJcbiAgICAgICAgaWYocGFuZUluZGV4ICsxID49IHRoaXMubGF5b3V0UGFuZXMubGVuZ3RoKXtcclxuICAgICAgICAgICAgLy8gTGFzdCBwYW5lIHNpemUgY2hhbmdlZCA9PiB1cGRhdGUgdGhlIHNpemUgb2YgdGhlIHBhbmUgYmVmb3JlXHJcbiAgICAgICAgICAgIHNpemVPZk90aGVyUGFuZSA9IHByb3BlcnRpZXNbcGFuZUluZGV4LTFdLnBhbmVTaXplK3BhbmVEaWZmU2l6ZTtcclxuICAgICAgICAgICAgaW5kZXhPZk90aGVyUGFuZSA9IHBhbmVJbmRleC0xO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGZvbGxvd2luZyBwYW5lIHNpemVcclxuICAgICAgICAgICAgc2l6ZU9mT3RoZXJQYW5lID0gcHJvcGVydGllc1twYW5lSW5kZXgrMV0ucGFuZVNpemUrcGFuZURpZmZTaXplO1xyXG4gICAgICAgICAgICBpbmRleE9mT3RoZXJQYW5lID0gcGFuZUluZGV4KzE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHNpemVPZk90aGVyUGFuZSA8IDApe1xyXG4gICAgICAgICAgICAvLyBBdm9pZCByZXNpemluZyB0aGUgZm9sbG93aW5nIHBhbmUob3IgdGhlIHBhbmUgYmVmb3JlKSB0byBhIHNpemUgc21hbGxlciB0aGVuIDBcclxuICAgICAgICAgICAgbGV0IG9sZFZhbHVlID0gTWF0aC5hYnMoc2l6ZU9mT3RoZXJQYW5lKTtcclxuICAgICAgICAgICAgc2l6ZU9mT3RoZXJQYW5lID0gNTA7ICAgXHJcbiAgICAgICAgICAgIG5ld1NpemUgPSBuZXdTaXplIC0gb2xkVmFsdWUgLSA1MDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sYXlvdXRQYW5lc1tpbmRleE9mT3RoZXJQYW5lXS5zaXplID0gc2l6ZU9mT3RoZXJQYW5lO1xyXG4gICAgICAgIHByb3BlcnRpZXNbaW5kZXhPZk90aGVyUGFuZV0ucGFuZVNpemUgPSBzaXplT2ZPdGhlclBhbmU7XHJcblxyXG4gICAgICAgIHRoaXMubGF5b3V0UGFuZXNbcGFuZUluZGV4XS5zaXplID0gbmV3U2l6ZTtcclxuICAgICAgICBwcm9wZXJ0aWVzW3BhbmVJbmRleF0ucGFuZVNpemUgPSBuZXdTaXplO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFVwZGF0ZXMgdGhlIHNwbGl0dGVyc1xyXG4gICAgICAgIHRoaXMuc2V0UGFuZVByb3BlcnRpZXNUb1NwbGl0dGVyKHNwbGl0dGVyLCBwcm9wZXJ0aWVzKTtcclxuXHJcbiAgICAgICAgLy8gdXBkYXRlcyB0aGUgY29udGVudHMgaW4gdGhlIHNwbGl0dGVyc1xyXG4gICAgICAgIHRoaXMucmVzaXplU3BsaXR0ZXJQYW5lQ29udGVudHModGhpcy5fYWN0dWFsV2lkdGgsIHRoaXMuX2FjdHVhbEhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBlalNwbGl0dGVyIGRhdGEgb2JqZWN0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRTcGxpdHRlcigpOiBhbnl7XHJcbiAgICAgICAgcmV0dXJuICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpLmRhdGEoXCJlalNwbGl0dGVyXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgc2l6ZXMgb2YgYWxsIHBhbmVzIHRvZ2V0aGVyLCBpbmNsLiB0aGUgZHluYW1pYyBwYW5lXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdW1PZkRlZmluZWRMYXlvdXRQYW5lU2l6ZXMoKTogbnVtYmVye1xyXG4gICAgICAgIGxldCBzdW06IG51bWJlciA9IDA7XHJcbiAgICAgICAgZm9yKGxldCBrZXkgaW4gdGhpcy5sYXlvdXRQYW5lcykge1xyXG4gICAgICAgICAgICBsZXQgbGF5b3V0UGFuZSA9ICB0aGlzLmxheW91dFBhbmVzW2tleV07XHJcbiAgICAgICAgICAgIGlmKGxheW91dFBhbmUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHN1bSArPSBsYXlvdXRQYW5lLnNpemU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN1bTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHNpemVzIG9mIGFsbCBwYW5lcyB0b2dldGhlciwgd2l0aG91dCB0aGUgc2l6ZSBvZiB0aGUgZHluYW1pYyBwYW5lIGJ1dCBpbmNsdWRpbmcgdGhlIHNwbGl0dGVyIHNpemUoZS5nLiA5cHgpXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdW1PZkRlZmluZWRQYW5lU2l6ZXMoKTogbnVtYmVye1xyXG4gICAgICAgIGxldCBzdW06IG51bWJlciA9IDA7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcclxuICAgICAgICBmb3IobGV0IGtleSBpbiB0aGlzLmxheW91dFBhbmVzKSB7XHJcbiAgICAgICAgICAgIGxldCBsYXlvdXRQYW5lID0gIHRoaXMubGF5b3V0UGFuZXNba2V5XTtcclxuICAgICAgICAgICAgaWYobGF5b3V0UGFuZSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGlmKGxheW91dFBhbmUuZmlsbFNwYWNlID09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgICAgICBzdW0gKz0gbGF5b3V0UGFuZS5zaXplO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoaW5kZXg+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNwbGl0dGVyU2l6ZSA9IHRoaXMuX2RlZmF1bHRTcGxpdHRlclNpemU7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VtICs9IHNwbGl0dGVyU2l6ZTsgLy8gQWRkIHNpemUgb2Ygc3BsaXR0ZXJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3VtO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogaWYgdGhlIHBhbmUgc2l6ZXMgYXJlIHRvbyBiaWcgZm9yIHRoZSBjdXJyZW50IHdpbmRvdyBzaXplLCB0aGUgcGFuZXMgd291bGQgYmUgZGVjcmVhc2VkIGluIHNpemVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNpemVcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkb3B0TGF5b3V0UGFuZXNUb0ZpdEN1cnJlbnRTaXplKHNpemU6IG51bWJlcil7XHJcbiAgICAgICAgbGV0IHN1bU9mUGFuZXNXaXRvdXREeW5hbWljID0gdGhpcy5zdW1PZkRlZmluZWRQYW5lU2l6ZXMoKTtcclxuICAgICAgICBsZXQgbmVlZGVkU2l6ZSA9IHN1bU9mUGFuZXNXaXRvdXREeW5hbWljIC0gc2l6ZTtcclxuICAgICAgICBpZihuZWVkZWRTaXplID4gMCl7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IGdldCBsYXN0IG5vdCBkeW5hbWljIHBhbmVcclxuICAgICAgICAgICAgbGV0IGxhc3RQYW5lID0gdGhpcy5sYXlvdXRQYW5lc1t0aGlzLmxheW91dFBhbmVzLmxlbmd0aC0xXTtcclxuICAgICAgICAgICAgbGFzdFBhbmUuc2l6ZSA9IGxhc3RQYW5lLnNpemUtIG5lZWRlZFNpemU7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgbmV3IHBhbmUgYXQgdGhlIGdpdmVuIGluZGV4IHdpdGggdGhlIGdpdmVuIHNpemUgXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7ZWouU3BsaXR0ZXJ9IHNwbGl0dGVyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGFuZUlkXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXhPZk5ld1BhbmVcclxuICAgICAqIEBwYXJhbSB7UGFuZVByb3BlcnRpZXN9IHBhbmVQcm9wZXJ0aWVzXHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRQYW5lKHNwbGl0dGVyOiBlai5TcGxpdHRlciwgcGFuZUlkOiBzdHJpbmcsIGluZGV4T2ZOZXdQYW5lOiBudW1iZXIsIHBhbmVQcm9wZXJ0aWVzOiBQYW5lUHJvcGVydGllcyl7XHJcbiAgICAgICAgbGV0IG5ld0l0ZW07XHJcbiAgICAgICAgaWYoIXRoaXMuX2lzUmVzcG9uc2l2ZSAmJiBwYW5lUHJvcGVydGllcy5wYW5lU2l6ZSAhPSAtMSl7XHJcbiAgICAgICAgICAgIGlmKGluZGV4T2ZOZXdQYW5lID09IDApe1xyXG4gICAgICAgICAgICAgICAgaW5kZXhPZk5ld1BhbmUrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBuZXdJdGVtPSBzcGxpdHRlci5yZW1vdmVJdGVtKGluZGV4T2ZOZXdQYW5lLTEpO1xyXG4gICAgICAgICAgICBuZXdJdGVtPSBzcGxpdHRlci5hZGRJdGVtKFwiPGRpdiBpZD0nXCIgKyBwYW5lSWQgKyBcIicgc3R5bGU9J292ZXJmbG93OmhpZGRlbic+PC9kaXY+XCIsIHsgcGFuZVNpemU6IHBhbmVQcm9wZXJ0aWVzLnBhbmVTaXplLCBleHBhbmRhYmxlOiBwYW5lUHJvcGVydGllcy5leHBhbmRhYmxlLCBjb2xsYXBzaWJsZTogcGFuZVByb3BlcnRpZXMuY29sbGFwc2libGUsIG1pblNpemU6IHBhbmVQcm9wZXJ0aWVzLm1pblNpemV9LCBpbmRleE9mTmV3UGFuZS0xKTtcclxuICAgICAgICAgICAgbmV3SXRlbT0gc3BsaXR0ZXIuYWRkSXRlbShcIjxkaXYgaWQ9J1wiICsgdGhpcy5wYXJlbnRDb250ZW50SWQgKyBcIl9sYXN0UGFuZVwiICsgXCInIHN0eWxlPSdvdmVyZmxvdzpoaWRkZW47IHdpZHRoOjEwMCU7IGhlaWdodDoxMDAlJz48L2Rpdj5cIiwgeyBwYW5lU2l6ZTogNDAwLCBleHBhbmRhYmxlOiBmYWxzZSwgY29sbGFwc2libGU6IGZhbHNlfSwgaW5kZXhPZk5ld1BhbmUpOyBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgbmV3SXRlbSA9IHNwbGl0dGVyLmFkZEl0ZW0oXCI8ZGl2IGlkPSdcIiArIHBhbmVJZCArIFwiJyBzdHlsZT0nb3ZlcmZsb3c6aGlkZGVuJz48L2Rpdj5cIiwgeyBwYW5lU2l6ZTogcGFuZVByb3BlcnRpZXMucGFuZVNpemUsIGV4cGFuZGFibGU6IHBhbmVQcm9wZXJ0aWVzLmV4cGFuZGFibGUsIGNvbGxhcHNpYmxlOiBwYW5lUHJvcGVydGllcy5jb2xsYXBzaWJsZSwgbWluU2l6ZTogcGFuZVByb3BlcnRpZXMubWluU2l6ZX0sIGluZGV4T2ZOZXdQYW5lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKG5ld0l0ZW0udG9TdHJpbmcoKSA9PSBcIlwiKXtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkVSUk9SOiBzcGxpdHRlci5hZGRJdGVtXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBuZXdJdGVtWzBdLnN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIHRoZSBtb3ZlZCBwYW5lIHRvIHRoZSBzcGxpdHRlciBhbmQgc2V0cyB0aGUgc3BsaXR0ZXIgb3B0aW9uc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge2VqLlNwbGl0dGVyfSBzcGxpdHRlclxyXG4gICAgICogQHBhcmFtIHtJTGF5b3V0UGFuZX0gbGF5b3V0UGFuZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRhcmdldFBhbmVJbmRleFxyXG4gICAgICogQHBhcmFtIHsqfSBwcm9wZXJ0aWVzXHJcbiAgICAgKiBAcGFyYW0ge0pRdWVyeTxIVE1MRWxlbWVudD59IG1vdmluZ1BhbmVcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZFBhbmVXaXRoUGFuZUluZm8oc3BsaXR0ZXI6IGVqLlNwbGl0dGVyLCBsYXlvdXRQYW5lOiBJTGF5b3V0UGFuZSwgdGFyZ2V0UGFuZUluZGV4OiBudW1iZXIsIHByb3BlcnRpZXMsIG1vdmluZ1BhbmU6IEpRdWVyeTxIVE1MRWxlbWVudD4pe1xyXG4gICAgICAgIHNwbGl0dGVyLmFkZEl0ZW0obW92aW5nUGFuZVswXS5wYXJlbnRFbGVtZW50IS5pbm5lckhUTUwsIHtleHBhbmRhYmxlOiBsYXlvdXRQYW5lLmV4cGFuZGFibGUsIGNvbGxhcHNpYmxlOiBsYXlvdXRQYW5lLmNvbGxhcHNpYmxlLCBtaW5TaXplOiBsYXlvdXRQYW5lLm1pbmltdW1TaXplfSx0YXJnZXRQYW5lSW5kZXgpO1xyXG4gICAgICAgIHRoaXMuc2V0UHJvcGVydGllcyhzcGxpdHRlciwgcHJvcGVydGllcyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogIFJlbW92ZXMgdGhlIHBhbmUgd2l0aCB0aGUgZ2l2ZW4gaW5kZXggZnJvbSB0aGUgc3BsaXR0ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBzcGxpdHRlclxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHBhbmVJbmRleFxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVtb3ZlUGFuZShzcGxpdHRlciwgcGFuZUluZGV4OiBudW1iZXIpe1xyXG4gICAgICAgIHNwbGl0dGVyLnJlbW92ZUl0ZW0ocGFuZUluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZUxheW91dFBhbmVzQWZ0ZXJBZGRpbmdOZXdQYW5lKHByb3BlcnRpZXMsIG9sZFBhbmVTaXplcywgd2lkZ2V0OiBJV2lkZ2V0LCB2aWV3VHlwZSl7XHJcbiAgICAgICAgaWYodGhpcy5faXNSZXNwb25zaXZlKXtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGFMYXlvdXRQYW5lc0FmdGVyQWRkaW5nTmV3UGFuZVJlc3BvbnNpdmUocHJvcGVydGllcywgd2lkZ2V0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXsgIFxyXG4gICAgICAgICAgICBvbGRQYW5lU2l6ZXNbb2xkUGFuZVNpemVzLmxlbmd0aC0xXSA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9MDsgaSA8IHByb3BlcnRpZXMubGVuZ3RoLTE7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmFtZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBpZihvbGRQYW5lU2l6ZXNbaV0gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzW2ldLnBhbmVTaXplID0gb2xkUGFuZVNpemVzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWUgPSB0aGlzLmxheW91dFBhbmVzW2ldLm5hbWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKG5hbWUgPT09IFwiXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWUgPSB3aWRnZXQud2lkZ2V0TmFtZSArIFwiX1wiKyB2aWV3VHlwZS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWUgPSBVbmlxdWVJZEdlbmVyYXRvci5nZXRJbnN0YW5jZSgpLmdldFVuaXF1ZUlkRnJvbVN0cmluZyhuYW1lKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IHBhbmVXaWRnZXQgPSB3aWRnZXQ7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmxheW91dFBhbmVzW2ldICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFuZVdpZGdldCA9IHRoaXMubGF5b3V0UGFuZXNbaV0ud2lkZ2V0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5sYXlvdXRQYW5lc1tpXSAgPSAgbmV3IExheW91dFBhbmUobmFtZSwgcHJvcGVydGllc1tpXS5wYW5lU2l6ZSwgcGFuZVdpZGdldCwgZmFsc2UsIHRydWUsIHByb3BlcnRpZXNbaV0uZXhwYW5kYWJsZSwgcHJvcGVydGllc1tpXS5jb2xsYXBzaWJsZSwgcHJvcGVydGllc1tpXS5taW5TaXplKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0YUxheW91dFBhbmVzQWZ0ZXJBZGRpbmdOZXdQYW5lUmVzcG9uc2l2ZShwcm9wZXJ0aWVzLCB3aWRnZXQpIHtcclxuICAgICAgICBmb3IobGV0IGkgPTA7IGkgPCBwcm9wZXJ0aWVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IG5hbWUgPSBcIlwiO1xyXG4gICAgICAgICAgICBsZXQgaiA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX3dpZGdldHMuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYoaiA9PSBpKXtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lID0ga2V5O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaisrO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGxldCBwYW5lV2lkZ2V0ID0gd2lkZ2V0O1xyXG4gICAgICAgICAgICBpZih0aGlzLmxheW91dFBhbmVzW2ldICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBwYW5lV2lkZ2V0ID0gdGhpcy5sYXlvdXRQYW5lc1tpXS53aWRnZXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5sYXlvdXRQYW5lc1tpXSA9IG5ldyBMYXlvdXRQYW5lKG5hbWUsIHByb3BlcnRpZXNbaV0ucGFuZVNpemUsIHBhbmVXaWRnZXQsIGZhbHNlLCB0cnVlLCBwcm9wZXJ0aWVzW2ldLmV4cGFuZGFibGUsIHByb3BlcnRpZXNbaV0uY29sbGFwc2libGUsIHByb3BlcnRpZXNbaV0ubWluU2l6ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gIFxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBwcm9wZXJ0aWVzIHdpdGggdGhlIGluZm9ybWF0aW9ucyBmcm9tIHRoZSBsYXlvdXRQYW5lIGRlZmluaXRpb25zO1xyXG4gICAgICogU2l6ZSBvZiBkeW5hbWljIHBhbmUgd2lsbCBiZSBjYWxjdWxhdGVkIGJ5IHVzaW5nIHRoZSBhY3R1YWwgd2lkZ2V0IHNpemVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBwcm9wZXJ0aWVzXHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVQcm9wZXJ0aWVzSW5mb3JtYXRpb25zV2l0aExheW91dFBhbmVzRGF0YShwcm9wZXJ0aWVzKXsgICBcclxuICAgICAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgICAgIGZvcihsZXQga2V5IGluIHRoaXMubGF5b3V0UGFuZXMpIHtcclxuICAgICAgICAgICAgbGV0IGxheW91dFBhbmUgPSAgdGhpcy5sYXlvdXRQYW5lc1trZXldO1xyXG4gICAgICAgICAgICBpZihsYXlvdXRQYW5lID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgaWYobGF5b3V0UGFuZS5maWxsU3BhY2UgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXNbaW5kZXhdLnBhbmVTaXplID0gbGF5b3V0UGFuZS5zaXplO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc2l6ZSA9IHRoaXMuX2FjdHVhbFdpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuX29yaWVudGF0aW9uID09IGVqLk9yaWVudGF0aW9uLlZlcnRpY2FsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZSA9IHRoaXMuX2FjdHVhbEhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllc1tpbmRleF0ucGFuZVNpemUgPSBzaXplIC0gdGhpcy5zdW1PZkRlZmluZWRMYXlvdXRQYW5lU2l6ZXMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHByb3BlcnRpZXNbaW5kZXhdLmV4cGFuZGFibGUgPSBsYXlvdXRQYW5lLmV4cGFuZGFibGU7XHJcbiAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzW2luZGV4XS5jb2xsYXBzaWJsZSA9IGxheW91dFBhbmUuY29sbGFwc2libGU7XHJcbiAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzW2luZGV4XS5yZXNpemFibGUgPSBsYXlvdXRQYW5lLnJlc2l6YWJsZTtcclxuICAgICAgICAgICAgICAgIHByb3BlcnRpZXNbaW5kZXhdLm1pblNpemUgPSBsYXlvdXRQYW5lLm1pbmltdW1TaXplO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiByZXNpemUgdGhlIHNwbGl0dGVyIGFuZCB1cGRhdGUgdGhlIHNwbGl0dGVyIHBhbmVzaXplc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gd2lkdGhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlc2l6ZVNwbGl0dGVyKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKXtcclxuICAgICAgICB2YXIgc3BsaXR0ZXIgPSB0aGlzLmdldFNwbGl0dGVyKCk7XHJcblxyXG4gICAgICAgIHNwbGl0dGVyLm9wdGlvbihcIndpZHRoXCIsIHdpZHRoLCB0cnVlKTtcclxuICAgICAgICBzcGxpdHRlci5vcHRpb24oXCJoZWlnaHRcIiwgaGVpZ2h0LCB0cnVlKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgcHJvcGVydGllcyA9IHRoaXMuZ2V0UHJvcGVydGllcyhzcGxpdHRlcik7IFxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMudXBkYXRlUGFuZVByb3BlcnRpZXMocHJvcGVydGllcywgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5zZXRQYW5lUHJvcGVydGllc1RvU3BsaXR0ZXIoc3BsaXR0ZXIsIHByb3BlcnRpZXMpO1xyXG4gICAgfSAgIFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgcGFuZXNpemUgaW4gdGhlIHByb3BlcnRpZXMgZm9yIHRoZSBuZXcgaGVpZ2h0L3dpZHRoXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gcHJvcGVydGllc1xyXG4gICAgICogQHBhcmFtIHsqfSB3aWR0aFxyXG4gICAgICogQHBhcmFtIHsqfSBoZWlnaHRcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZVBhbmVQcm9wZXJ0aWVzKHByb3BlcnRpZXMsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKXtcclxuICAgICAgICBcclxuICAgICAgICAvLyBTZXQgYWxsIGtub3cgcGFuZSBzaXplc1xyXG4gICAgICAgIHRoaXMuc2V0S25vd25QYW5lU2l6ZXMocHJvcGVydGllcyk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAvLyBTZXQgYWxsIGR5bmFtaWMgcGFuZSBzaXplc1xyXG4gICAgICAgIHRoaXMuc2V0RHluYW1pY1BhbmVTaXplcyhwcm9wZXJ0aWVzLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldEtub3duUGFuZVNpemVzKHByb3BlcnRpZXMpe1xyXG4gICAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgICAgZm9yKGxldCBrZXkgaW4gdGhpcy5sYXlvdXRQYW5lcykge1xyXG4gICAgICAgICAgICBsZXQgbGF5b3V0UGFuZSA9ICB0aGlzLmxheW91dFBhbmVzW2tleV07XHJcbiAgICAgICAgICAgIGlmKGxheW91dFBhbmUgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZihsYXlvdXRQYW5lLmZpbGxTcGFjZSA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllc1tpbmRleF0ucGFuZVNpemUgPSBsYXlvdXRQYW5lLnNpemU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXREeW5hbWljUGFuZVNpemVzKHByb3BlcnRpZXMsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKXtcclxuICAgICAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgICAgIGZvcihsZXQga2V5IGluIHRoaXMubGF5b3V0UGFuZXMpIHtcclxuICAgICAgICAgICAgbGV0IGxheW91dFBhbmUgPSAgdGhpcy5sYXlvdXRQYW5lc1trZXldO1xyXG4gICAgICAgICAgICBpZihsYXlvdXRQYW5lID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgaWYobGF5b3V0UGFuZS5maWxsU3BhY2UgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5fb3JpZW50YXRpb24gPT0gZWouT3JpZW50YXRpb24uVmVydGljYWwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzW2luZGV4XS5wYW5lU2l6ZSA9IGhlaWdodCAtIHRoaXMuc3VtT2ZEZWZpbmVkUGFuZVNpemVzKCk7IFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzW2luZGV4XS5wYW5lU2l6ZSA9IHdpZHRoIC0gdGhpcy5zdW1PZkRlZmluZWRQYW5lU2l6ZXMoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgZ2l2ZW4gcHJvcGVydGllcyhwYW5lc2l6ZXMsIC4uLikgdG8gdGhlIGVqc3BsaXR0ZXJcclxuICAgICAqIGlmIHRoZSBsYXN0IHBhbmVzaXplIGlzIHVuZGVyIDFweCBhIGNvcnJlY3Rpb24gb2YgdGhlIHBhbmVzaXplIHdpbGwgYmUgZG9uZTsgb2NjdXJlcyBzb21ldGltZXMgaW4gY2FzZSBvZiBicm93c2VyIHpvb21cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBzcGxpdHRlclxyXG4gICAgICogQHBhcmFtIHsqfSBwcm9wZXJ0aWVzXHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRQYW5lUHJvcGVydGllc1RvU3BsaXR0ZXIoc3BsaXR0ZXIsIHByb3BlcnRpZXMpe1xyXG4gICAgICAgIHRoaXMuc2V0UHJvcGVydGllcyhzcGxpdHRlciwgcHJvcGVydGllcyk7XHJcbiAgICAgICAgaWYoKDxhbnk+c3BsaXR0ZXIpLnBhbmVzLmxlbmd0aCA+IDApIHsgXHJcbiAgICAgICAgICAgIGxldCBsYXN0UGFuZSA9ICg8YW55PnNwbGl0dGVyKS5wYW5lc1soPGFueT5zcGxpdHRlcikucGFuZXMubGVuZ3RoLTFdO1xyXG4gICAgICAgICAgICBpZihsYXN0UGFuZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGxhc3RQYW5lU2l6ZVN0cmluZyA9IGxhc3RQYW5lLnN0eWxlLndpZHRoO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5fb3JpZW50YXRpb24gPT0gZWouT3JpZW50YXRpb24uVmVydGljYWwpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3RQYW5lU2l6ZVN0cmluZyA9IGxhc3RQYW5lLnN0eWxlLmhlaWdodDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBsYXN0UGFuZVNpemUgPSBwYXJzZUZsb2F0KGxhc3RQYW5lU2l6ZVN0cmluZyk7XHJcbiAgICAgICAgICAgICAgICBpZihsYXN0UGFuZVNpemUgPD0gMC45OTk5ICYmIHByb3BlcnRpZXNbcHJvcGVydGllcy5sZW5ndGgtMV0ucGFuZVNpemUgPiAwKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyBTaXplIG9mIGxhc3Qgc3BsaXR0ZXIgcGFuZSB3YXMgbm90IHNldCBjb3JyZWN0ID0+IHRvIGxlc3Mgc3BhY2UhXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgYnJvd3NlciB6b29tIGlzIHVzZWQgdGhlIHNpemVzIHdpbGwgYmUgZGVmaW5lZCB3aXRoIGRlY2ltYWxwbGFjZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlIGVqU3BsaXR0ZXIgc2V0cyB0aGUgc2l6ZSBvZiB0aGUgbGFzdCBwYW5lIHRvIDAgaWYgaXQgaXMgYSBsaXR0bGUgYml0IHRvIHRhbGwgKGUuZy4gXCIwLjFweFwiKSA9PiBwYW5lIHdpbGwgbm90IGJlIHNob3duXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU2V0IGxhc3QgcGFuZSBhIGxpdHRsZSBiaXQgc21hbGxlclxyXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXNbcHJvcGVydGllcy5sZW5ndGgtMV0ucGFuZVNpemUtLTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFByb3BlcnRpZXMoc3BsaXR0ZXIsIHByb3BlcnRpZXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgc3BsaXR0ZXIgcGFuZSBjb250ZW50IHNpemVzICh3aWRnZXQgc2l6ZXMpXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodFxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVzaXplU3BsaXR0ZXJQYW5lQ29udGVudHMod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpe1xyXG4gICAgICAgIC8vIFNldCB0aGUgc2l6ZXMgb2YgdGhlIHNwbGl0dGVyIHBhbmVjb250ZW50c1xyXG4gICAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMubGF5b3V0UGFuZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgd2lkZ2V0ID0gdGhpcy5fd2lkZ2V0cy5nZXQodGhpcy5sYXlvdXRQYW5lc1tpXS5uYW1lKTtcclxuICAgICAgICAgICAgaWYod2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgd2lkZ2V0V2lkdGggPSB3aWR0aDtcclxuICAgICAgICAgICAgICAgIGxldCB3aWRnZXRIZWlnaHQgPSBoZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5fb3JpZW50YXRpb24gPT0gZWouT3JpZW50YXRpb24uVmVydGljYWwpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMubGF5b3V0UGFuZXNbaW5kZXhdLmZpbGxTcGFjZSA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0SGVpZ2h0ID0gaGVpZ2h0IC0gdGhpcy5zdW1PZkRlZmluZWRQYW5lU2l6ZXMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYod2lkZ2V0SGVpZ2h0IDwgMCl7IC8vIE5vIHBsYWNlIGZvciBkeW5hbWljIHBhbmUsIG1heWJlIGFsc28gb3RoZXIgcGFuZXMgaGF2ZSB0byBiZSBhZG9wdGVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkb3B0TGF5b3V0UGFuZXNUb0ZpdEN1cnJlbnRTaXplKGhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXRIZWlnaHQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldEhlaWdodCA9IHRoaXMubGF5b3V0UGFuZXNbaW5kZXhdLnNpemU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5sYXlvdXRQYW5lc1tpbmRleF0uZmlsbFNwYWNlID09IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXRXaWR0aCA9IHdpZHRoIC0gdGhpcy5zdW1PZkRlZmluZWRQYW5lU2l6ZXMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYod2lkZ2V0V2lkdGggPCAwKXsgLy8gTm8gcGxhY2UgZm9yIGR5bmFtaWMgcGFuZSwgbWF5YmUgYWxzbyBvdGhlciBwYW5lcyBoYXZlIHRvIGJlIGFkb3B0ZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRvcHRMYXlvdXRQYW5lc1RvRml0Q3VycmVudFNpemUod2lkdGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0V2lkdGggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldFdpZHRoID0gdGhpcy5sYXlvdXRQYW5lc1tpbmRleF0uc2l6ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB3aWRnZXQucmVzaXplKHdpZGdldFdpZHRoLCB3aWRnZXRIZWlnaHQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9QZXJzaXN0IGRhdGEgZXZlcnkgdGltZSBhIHNwbGl0dGVyIGlzIHJlc2l6ZWRcclxuICAgICAgICB0aGlzLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgbGF5b3V0IHBhbmVzIFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHNwbGl0YmFySW5kZXhcclxuICAgICAqIEBwYXJhbSB7Kn0gcHJldlBhbmVTaXplXHJcbiAgICAgKiBAcGFyYW0geyp9IG5leHRQYW5lU2l6ZVxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlTGF5b3V0UGFuZXNPblNwbGl0dGVyUmVzaXplKHNwbGl0YmFySW5kZXgsIHByZXZQYW5lU2l6ZSwgbmV4dFBhbmVTaXplKXtcclxuICAgICAgICBsZXQgc3BsaXR0ZXIgPSB0aGlzLmdldFNwbGl0dGVyKCk7XHJcbiAgICAgICAgbGV0IHByb3BlcnRpZXMgPSB0aGlzLmdldFByb3BlcnRpZXMoc3BsaXR0ZXIpO1xyXG5cclxuICAgICAgICBpZighdGhpcy5faXNSZXNwb25zaXZlKXtcclxuICAgICAgICAgICAgaWYodGhpcy5sYXlvdXRQYW5lc1tzcGxpdGJhckluZGV4ICsgMV0gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHByb3BlcnRpZXNbc3BsaXRiYXJJbmRleCArIDFdLnBhbmVTaXplID0gdGhpcy5sYXlvdXRQYW5lc1tzcGxpdGJhckluZGV4ICsgMV0uc2l6ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLmxheW91dFBhbmVzW3NwbGl0YmFySW5kZXgrMV0uc2l6ZSA9IG5leHRQYW5lU2l6ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRQcm9wZXJ0aWVzKHNwbGl0dGVyLCBwcm9wZXJ0aWVzKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgb2xkU2l6ZSA9IHRoaXMubGF5b3V0UGFuZXNbc3BsaXRiYXJJbmRleF0uc2l6ZVxyXG4gICAgICAgIHRoaXMubGF5b3V0UGFuZXNbc3BsaXRiYXJJbmRleF0uc2l6ZSA9IHByZXZQYW5lU2l6ZTtcclxuICAgICAgICBcclxuICAgICAgICBpZighdGhpcy5faXNSZXNwb25zaXZlKXtcclxuICAgICAgICAgICAgdGhpcy5fYWN0dWFsSGVpZ2h0ICs9IChwcmV2UGFuZVNpemUgLSBvbGRTaXplKTtcclxuICAgICAgICAgICAgdGhpcy5yZXNpemVTcGxpdHRlcih0aGlzLl9hY3R1YWxXaWR0aCwgdGhpcy5fYWN0dWFsSGVpZ2h0LXRoaXMuX2hlYWRlckhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY29ycmVjdHMgdGhlIHRhcmdldCBpbmRleCBpZiBzb3VyY2UgaW5kZXggaXMgYmVmb3JlIHRhcmdldCBpbmRleFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc291cmNlUGFuZUluZGV4XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdGFyZ2V0UGFuZUluZGV4XHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRhVGFyZ2V0UGFuZUluZGV4KHNvdXJjZVBhbmVJbmRleDogbnVtYmVyLCB0YXJnZXRQYW5lSW5kZXg6IG51bWJlcik6IG51bWJlcntcclxuICAgICAgICBpZihzb3VyY2VQYW5lSW5kZXggPCB0YXJnZXRQYW5lSW5kZXgpe1xyXG4gICAgICAgICAgICAvLyBtb3ZlZCBlbGVtZW50IGlzIGluIGxpc3QgYmVmb3JlIHRhcmdldCBwb3NpdGlvbiBhbmQgd2FzIHJlbW92ZWQgYmVmb3JlLCBzbyBpbmRleCBtdXN0IGJlIGRlY3JlYXNlZCB0byBnZXQgY29ycmVjdCBpbnNlcnQgcG9zaXRpb25cclxuICAgICAgICAgICAgdGFyZ2V0UGFuZUluZGV4LS07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0YXJnZXRQYW5lSW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBwcm9wZXJ0aWVzIGZyb20gdGhlIGVqU3BsaXR0ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBzcGxpdHRlclxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFByb3BlcnRpZXMoc3BsaXR0ZXIpe1xyXG4gICAgICAgIHJldHVybiBzcGxpdHRlci5vcHRpb24oXCJwcm9wZXJ0aWVzXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgcHJvcGVydGllcyBvZiB0aGUgZWpTcGxpdHRlclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHNwbGl0dGVyXHJcbiAgICAgKiBAcGFyYW0geyp9IHByb3BlcnRpZXNcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRQcm9wZXJ0aWVzKHNwbGl0dGVyLCBwcm9wZXJ0aWVzKXtcclxuICAgICAgICBzcGxpdHRlci5vcHRpb24oXCJwcm9wZXJ0aWVzXCIsIHByb3BlcnRpZXMsIHRydWUpOyAvLyBmb3JjZSB0aGUgc2V0dGluZyB0byByZXNpemUgdGhlIGNoYXJ0IHNwbGl0dGVyc1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIHByb3BlcnRpZXMgPT4gbW92ZXMgdGhlIHByb3BlcnR5IGluZm9ybWF0aW9ucyBmcm9tIHNvdXJjZSB0byB0YXJnZXQgaW5kZXhcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBwcm9wZXJ0aWVzXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc291cmNlUGFuZUluZGV4XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdGFyZ2V0UGFuZUluZGV4XHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVQcm9wZXJ0aWVzTGlzdChwcm9wZXJ0aWVzLCBzb3VyY2VQYW5lSW5kZXg6IG51bWJlciwgdGFyZ2V0UGFuZUluZGV4OiBudW1iZXIpe1xyXG4gICAgICAgIGxldCBwYW5lUHJvcGVydGllcyA9IHByb3BlcnRpZXNbc291cmNlUGFuZUluZGV4XTtcclxuICAgICAgICBwcm9wZXJ0aWVzLnNwbGljZShzb3VyY2VQYW5lSW5kZXgsIDEpO1xyXG4gICAgICAgIHByb3BlcnRpZXMuc3BsaWNlKHRhcmdldFBhbmVJbmRleCwgMCwgcGFuZVByb3BlcnRpZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgbGF5b3V0IHBhbmVzIGxpc3QgYWZ0ZXIgbW92aW5nXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gbGF5b3V0UGFuZVxyXG4gICAgICogQHBhcmFtIHsqfSBzb3VyY2VQYW5lSW5kZXhcclxuICAgICAqIEBwYXJhbSB7Kn0gdGFyZ2V0UGFuZUluZGV4XHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVMYXlvdXRQYW5lc0xpc3RBZnRlck1vdmluZyhsYXlvdXRQYW5lLCBzb3VyY2VQYW5lSW5kZXgsIHRhcmdldFBhbmVJbmRleCl7XHJcbiAgICAgICAgdGhpcy5sYXlvdXRQYW5lcy5zcGxpY2Uoc291cmNlUGFuZUluZGV4LCAxKTtcclxuICAgICAgICB0aGlzLmxheW91dFBhbmVzLnNwbGljZSh0YXJnZXRQYW5lSW5kZXgsIDAsIGxheW91dFBhbmUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgcGFuZSBpbmRleCBvZiB0aGUgZ2l2ZW4gd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gd2lkZ2V0XHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIFNwbGl0dGVyV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0UGFuZUluZGV4KHdpZGdldCk6IG51bWJlcntcclxuICAgICAgICBsZXQgcGFuZUluZGV4ID0gLTE7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxheW91dFBhbmVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYodGhpcy5sYXlvdXRQYW5lc1tpXS53aWRnZXQgPT0gd2lkZ2V0KXtcclxuICAgICAgICAgICAgICAgIHBhbmVJbmRleCA9IGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBhbmVJbmRleDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgdGhlIHdpZGdldCBmcm9tIHRoZSB3aWRnZXRzIGxpc3Qgb2YgdGhpcyBsYXlvdXQgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gd2lkZ2V0XHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZW1vdmVXaWRnZXRGcm9tTGlzdCh3aWRnZXQpe1xyXG4gICAgICAgIHRoaXMuX3dpZGdldHMuZm9yRWFjaCgod2lkZ2V0VGVtcCwga2V5KSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHdpZGdldFRlbXAgPT0gd2lkZ2V0KXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3dpZGdldHMuZGVsZXRlKGtleSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRqdXN0IGNoYXJ0cyBkaXYgY29udGFpbmVyID0+IHJlbW92ZSBjaGFydCBzaXplXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gc2l6ZVRvUmVtb3ZlXHJcbiAgICAgKiBAbWVtYmVyb2YgU3BsaXR0ZXJXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGp1c3RDaGFydHNEaXZDb250YWluZXJTaXplKHNpemVUb1JlbW92ZSl7XHJcbiAgICAgICAgdmFyIGFjdHVhbEhlaWdodCA9ICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpLmhlaWdodCgpO1xyXG4gICAgICAgIHZhciBpbnRlcm5hbENvbnRhaW5lciA9ICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpWzBdO1xyXG4gICAgICAgIGludGVybmFsQ29udGFpbmVyLnN0eWxlLmhlaWdodCEgPSAoYWN0dWFsSGVpZ2h0ISAtIHNpemVUb1JlbW92ZSAtIDQwMCArIHRoaXMuX2RlZmF1bHRTcGxpdHRlclNpemUpICsgXCJweFwiOyAvLyBSZW1vdmUgcGFuZSBzaXplICsgc3BsaXR0ZXIgc2l6ZSg5cHgpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAgQWRqdXN0IGVqU3BsaXR0ZXIgc2l6ZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHNwbGl0dGVyXHJcbiAgICAgKiBAcGFyYW0geyp9IHNpemVUb1JlbW92ZVxyXG4gICAgICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgbmV3IHNwbGl0dGVyIHNpemUgYWZ0ZXIgcmVtb3ZpbmdcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkanVzdFNwbGl0dGVyU2l6ZShzcGxpdHRlciwgc2l6ZVRvUmVtb3ZlKTogbnVtYmVye1xyXG4gICAgICAgIGxldCBhY3R1YWxTcGxpdHRlckhlaWdodCA9IHNwbGl0dGVyLm9wdGlvbihcImhlaWdodFwiKTtcclxuICAgICAgICBsZXQgbmV3U3BsaXR0ZXJIZWlnaHQgPSBwYXJzZUludChhY3R1YWxTcGxpdHRlckhlaWdodCwgMTApOyAvLyBwYXJzZUludCB0byByZW1vdmUgXCJweFwiXHJcbiAgICAgICAgbmV3U3BsaXR0ZXJIZWlnaHQgLT0gc2l6ZVRvUmVtb3ZlICsgdGhpcy5fZGVmYXVsdFNwbGl0dGVyU2l6ZTsgLy8gUmVtb3ZlIHBhbmUgc2l6ZSArIHNwbGl0dGVyIHNpemUoOXB4KVxyXG4gICAgICAgIHNwbGl0dGVyLm9wdGlvbihcImhlaWdodFwiLCBuZXdTcGxpdHRlckhlaWdodCwgdHJ1ZSk7IC8vIFRPRE86IG5vdCBvbmx5IGhlaWdodCwgYWxzbyB3aWR0aCBcclxuICAgICAgICByZXR1cm4gbmV3U3BsaXR0ZXJIZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBOb3RpZmllcyB0aGF0IHNwbGl0dGVyIGhhcyByZXNpemVkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvblNwbGl0dGVyUmVzaXplKGFyZ3MpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZUxheW91dFBhbmVzT25TcGxpdHRlclJlc2l6ZShhcmdzLnNwbGl0YmFySW5kZXgsIGFyZ3MucHJldlBhbmUuc2l6ZSwgYXJncy5uZXh0UGFuZS5zaXplKTtcclxuICAgICAgICB0aGlzLnJlc2l6ZVNwbGl0dGVyUGFuZUNvbnRlbnRzKHRoaXMuX2FjdHVhbFdpZHRoLCB0aGlzLl9hY3R1YWxIZWlnaHQtdGhpcy5faGVhZGVySGVpZ2h0KVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSBsaXN0IHdpdGggb25seSB0aGUgc2l6ZXMgb2YgdGhlIHBhbmVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gcHJvcGVydGllc1xyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBTcGxpdHRlcldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFBhbmVTaXplcyhwcm9wZXJ0aWVzKTogQXJyYXk8c3RyaW5nPiB7XHJcbiAgICAgICAgdmFyIHBhbmVTaXplcyA9IG5ldyBBcnJheTxzdHJpbmc+KCk7XHJcbiAgICAgICAgcHJvcGVydGllcy5mb3JFYWNoKHByb3BlcnR5ID0+IHtcclxuICAgICAgICAgICAgcGFuZVNpemVzLnB1c2gocHJvcGVydHkucGFuZVNpemUpOyAgICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBwYW5lU2l6ZXM7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7U3BsaXR0ZXJXaWRnZXR9OyJdfQ==