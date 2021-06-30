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
define(["require", "exports", "../../libs/math/mathjs", "../common/domHelper", "./watchablesGridToolbar", "../common/treeGridWidgetBase", "../../models/online/mappCockpitComponent", "./watchableValueBuffer", "./defaultComponentSettings"], function (require, exports, math, domHelper_1, watchablesGridToolbar_1, treeGridWidgetBase_1, mappCockpitComponent_1, watchableValueBuffer_1, defaultComponentSettings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // defines the base id for the watchable value template
    var WATCHABLE_VALUE_ID = "watchableValue_";
    var WATCHABLE_TREND_ID = "watchableTrend_";
    /**
     * implements the widget for displaying the watchables and their values with fast update. It includes displaying a short value trend.
     *
     * @class WatchablesWidget
     * @extends {TreeGridWidgetBase}
     */
    var WatchablesWidget = /** @class */ (function (_super) {
        __extends(WatchablesWidget, _super);
        function WatchablesWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // holds a list of parameters to watch
            _this._watchableParameters = [];
            // holds a list of watchable parameters that use an icon to show its state
            _this._watchableStateParameters = [];
            // holds a list of parameters that change watchable state icons
            _this._stateParametersName = new Array();
            // holds a trend buffer for every parameter
            _this._watchableTrendValues = {};
            // specifies the time span of the trend.
            _this._trendTimeSpan = 60000;
            // specifies the period for sampling the parameter values (msecs)
            _this._trendSamplingInterval = 100;
            // specifies the ui refresh rate (msecs)
            _this._trendRefreshingInterval = 500;
            // holds the timer id for the sample timer
            _this._watchableSampleTimerId = undefined;
            // holds the timer id for the trend timer
            _this._watchablTrendTimerId = -1;
            return _this;
        }
        /**
         * initialize the widget
         *
         * @param {string} layoutContainerId
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.initialize = function (layoutContainerId) {
            _super.prototype.initialize.call(this, layoutContainerId, 30);
        };
        WatchablesWidget.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            _super.prototype.setHeaderContent.call(this, "Watch");
            // Set dynamic column settings
            _super.prototype.setDynamicColumn.call(this, 3, 100);
        };
        WatchablesWidget.prototype.initializeComponent = function () {
            this.component.defaultSettingsDataId = defaultComponentSettings_1.DefaultComponentSettings.WidgetDefinitionId;
            this.component.disablePersisting();
        };
        /**
         * Returns the default component settings for this widget
         *
         * @returns {(ComponentSettings|undefined)}
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.getDefaultComponentSettings = function () {
            return defaultComponentSettings_1.DefaultComponentSettings.getWatchablesWidgetDefinition();
        };
        Object.defineProperty(WatchablesWidget.prototype, "watchableParameters", {
            /**
             * Sets the watchable parameters as the data source for the watchables widget
             *
             * @memberof WatchablesWidget
             */
            set: function (watchableParametersParametersLink) {
                this._watchableParameters = watchableParametersParametersLink.value;
                if (this._watchableParameters.length > 0) {
                    this.onComponentParametersUpdated();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WatchablesWidget.prototype, "watchableStateParameters", {
            set: function (watchableStateParameters) {
                this._watchableStateParameters = watchableStateParameters;
                this.addTreeGridIcons();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Define all watchable variables that are used in the watchableIcons
         *
         * @private
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.setStateParametersNameList = function () {
            var _this = this;
            this._watchableStateParameters.forEach(function (state) {
                if (state.expression != undefined) {
                    _this._watchableParameters.forEach(function (watchable) {
                        if (!_this._stateParametersName.includes(watchable.browseName) && state.expression.includes(watchable.browseName)) {
                            _this._stateParametersName.push(watchable.browseName);
                        }
                    });
                }
            });
        };
        /**
         * The component parameters have been upfated
         *
         * @private
         * @param {MappCockpitComponentParameter[]} watchableParameters
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.onComponentParametersUpdated = function () {
            // create trend buffers for the parameters
            this.createWatchableTrendBuffers(this._watchableParameters);
            // start watchable trend timer
            this.startWatchablesTrend();
            // populate the watchables widget
            this.populateWatchablesWidget();
            // set a list of watchable variables that modify watchableIcons
            this.setStateParametersNameList();
            // update style for treeGrid Icons
            this.updateToolbarIcons();
            // after populating the watchables we start observing value changes of the watchables
            this.observeWatchables(this._watchableParameters);
        };
        /**
         * Start
         *
         * @returns {*}
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.startWatchablesTrend = function () {
            this.startSamplingWatchables();
            this.startRefreshingWatchablesTrend();
        };
        /**
         * Starts sampling the watchables
         *
         * @private
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.startSamplingWatchables = function () {
            var _this = this;
            // stop an eventually running timer before starting a new one
            this.stopSamplingTimer();
            this._watchableSampleTimerId = setInterval(function () {
                _this.sampleWatchables(_this._watchableParameters);
            }, this._trendSamplingInterval, this._watchableSampleTimerId);
        };
        /**
         * Stops the sampling timer
         *
         * @private
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.stopSamplingTimer = function () {
            if (this._watchableSampleTimerId) {
                clearInterval(this._watchableSampleTimerId);
            }
        };
        /**
         * Starts refreshing the watchables trend
         *
         * @private
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.startRefreshingWatchablesTrend = function () {
            var _this = this;
            // stop an eventually running timer before starting a new one
            this.stopTrendTimer();
            this._watchablTrendTimerId = setInterval(function () {
                _this.refreshWatchablesTrend(_this._watchableParameters);
            }, this._trendRefreshingInterval);
        };
        /**
         * Stops the trend timer
         *
         * @private
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.stopTrendTimer = function () {
            if (this._watchablTrendTimerId) {
                clearInterval(this._watchablTrendTimerId);
            }
        };
        /**
         * Creates a trend buffer for every watchable parameter
         *
         * @private
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.createWatchableTrendBuffers = function (watchableParameters) {
            var _this = this;
            watchableParameters.forEach(function (watchableParameter) {
                _this._watchableTrendValues[watchableParameter.browseName] = watchableValueBuffer_1.WatchableValueTrendBuffer.create(_this._trendTimeSpan / _this._trendSamplingInterval);
            });
        };
        /** resizes the watchables widget
         *
         * @param {number} width
         * @param {number} height
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.resize = function (width, height) {
            _super.prototype.resize.call(this, width, height);
            // Refresh watchable values after resize (treegrid sets the data to "0" after resize)
            this.refreshWatchablesValues(this._watchableParameters);
        };
        /** creates the tree grid for the watchables informations
         *
         * @protected
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.createTreeGrid = function () {
            var _this = this;
            $(this.cssParentContentId).ejTreeGrid(__assign(__assign(__assign(__assign({}, this.getTreeGridColumnDefinition()), this.getTreeGridColumnResizeSupport()), this.getTreeGridToolbarSupport()), { allowSelection: false, create: function (args) { return _this.treeGridCreated(); } }));
        };
        /**
         * Returns the tree grid column definition
         *
         * @private
         * @returns {{}}
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.getTreeGridColumnDefinition = function () {
            return {
                columns: [
                    { field: "displayName", headerText: "Name", isPrimaryKey: true, width: "200" },
                    { field: "displayValue", headerText: "Value", width: "200", isTemplateColumn: true, template: "<div style='padding-left: 20px' id='" + this.parentContentId + WATCHABLE_VALUE_ID + "{{:uiId}}'>0</div>" },
                    { field: "engineeringUnit", headerText: "Unit", width: "100" },
                    { field: "watchableTrend", headerText: "Trend", isTemplateColumn: true, template: "<div id='" + this.parentContentId + WATCHABLE_TREND_ID + "{{:uiId}}'></div>" },
                ],
            };
        };
        /**
         * Returns the tree grid column resize settings
         *
         * @private
         * @returns {{}}
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.getTreeGridColumnResizeSupport = function () {
            var _this = this;
            return {
                allowColumnResize: true,
                columnResizeSettings: { columnResizeMode: ej.TreeGrid.ColumnResizeMode.FixedColumns },
                columnResized: function (args) { return _this.columnResized(args); },
            };
        };
        /**
         * Returns the tree grid toolbar settings
         *
         * @private
         * @returns {{}}
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.getTreeGridToolbarSupport = function () {
            var imageProvider = this.component.getSubComponent(defaultComponentSettings_1.DefaultComponentSettings.ImageProviderId);
            this._toolbar = new watchablesGridToolbar_1.WatchablesGridToolbar(this.cssParentContentId, imageProvider);
            return {
                toolbarSettings: {
                    showToolbar: true,
                    customToolbarItems: this._toolbar.getCustomToolbars()
                },
            };
        };
        WatchablesWidget.prototype.columnResized = function (args) {
            _super.prototype.resizeDynamicColumn.call(this, args.columnIndex, args.model);
            // Refresh watchable values after resize (treegrid sets the data to "0" after resize)
            this.refreshWatchablesValues(this._watchableParameters);
        };
        WatchablesWidget.prototype.treeGridCreated = function () {
            // Sets the custom toolbar icons
            this._toolbar.setStyleForToolbarIcons();
            // // disable dummy button after creation
            this._toolbar.disableDummyButton();
        };
        WatchablesWidget.prototype.addTreeGridIcons = function () {
            for (var i = 0; i < this._watchableStateParameters.length; i++) {
                this._toolbar.addIcon(this._watchableStateParameters[i]);
            }
        };
        /**
         * Disable button properties from icons
         *
         * @private
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.updateToolbarIcons = function () {
            this._toolbar.hideIcon('empty');
            this._toolbar.convertBtnsToIcons();
            this._toolbar.addEventListeners();
            this._toolbar.tooltipExtension();
            //Workaround: toolbar height changes when it is updated a second time. Here we set to the size we want.
            var $toolbar = $(this.cssParentContentId + '_toolbarItems');
            $toolbar[0].style.setProperty('height', '33px', 'important');
        };
        /**
         *
         * marks the parameters with an id as a reference to the ui
         * @private
         * @param {MappCockpitComponentParameter[]} watchableParameters
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.setWatchablesUiId = function (watchableParameters) {
            for (var i = 0; i < watchableParameters.length; i++) {
                var watchableParameter = watchableParameters[i];
                watchableParameter.uiId = i;
            }
        };
        /**
         * Populate the widget with its specific data content.
         *
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.populateWatchablesWidget = function () {
            this.setWatchablesUiId(this._watchableParameters);
            $(this.cssParentContentId).ejTreeGrid({
                dataSource: this._watchableParameters,
                toolbarSettings: {
                    customToolbarItems: this._toolbar.getCustomToolbars()
                },
            });
        };
        /**
         * Samples the watchable values
         *
         * @private
         * @param {MappCockpitComponentParameter[]} watchableParameters
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.sampleWatchables = function (watchableParameters) {
            var _this = this;
            watchableParameters.forEach(function (watchableParameter) {
                // update the trend buffer
                _this.addWatchableTrendValue(watchableParameter);
            });
        };
        /**
         * Refreshes the watchables trend fields
         *
         * @private
         * @param {MappCockpitComponentParameter[]} watchableParameters
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.refreshWatchablesTrend = function (watchableParameters) {
            var _this = this;
            watchableParameters.forEach(function (watchableParameter) {
                var watchableTrendElement = _this.getWatchableTrendElement(watchableParameter);
                if (watchableTrendElement && domHelper_1.DomHelper.isElementInViewport(watchableTrendElement)) {
                    var watchableTrendFieldId = "#" + watchableTrendElement.id;
                    // update the trend field
                    _this.refreshWatchableTrendField(watchableParameter, watchableTrendFieldId);
                }
            });
        };
        /**
         * refreshes the content of the watchable value fields
         *
         * @private
         * @param {MappCockpitComponentParameter[]} watchableParameters
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.refreshWatchablesValues = function (watchableParameters) {
            var _this = this;
            watchableParameters.forEach(function (watchableParameter) { _this.refreshWatchableValueField(watchableParameter); });
        };
        /**
         * Gets an element corresponding to the parameter to be used for displaying the watchable value
         *
         * @private
         * @param {MappCockpitComponentParameter} watchableParameter
         * @returns
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.getWatchableValueElement = function (watchableParameter) {
            return document.getElementById(this.parentContentId + WATCHABLE_VALUE_ID + watchableParameter.uiId);
        };
        /**
         * Gets an element corresponding to the parameter to be used for displaying the watchable trend line
         *
         * @private
         * @param {MappCockpitComponentParameter} watchableParameter
         * @returns {(HTMLElement | null)}
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.getWatchableTrendElement = function (watchableParameter) {
            return document.getElementById(this.parentContentId + WATCHABLE_TREND_ID + watchableParameter.uiId);
        };
        /**
         * updates a watchable field with the current values of the corresponding parameter
         *
         * @private
         * @param {MappCockpitComponentParameter} watchableParameter
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.refreshWatchableValueField = function (watchableParameter) {
            // get the corresponding ui element
            var watchableValueElement = this.getWatchableValueElement(watchableParameter);
            // let minValue = this._watchableTrendValues[watchableParameter.browseName]._minValue;
            // let maxValue = this._watchableTrendValues[watchableParameter.browseName]._maxValue;
            // let valueString: string = watchableParameter.displayValue.toString() + "(" + minValue + "-" + maxValue + ")";
            var valueString = watchableParameter.displayValue.toString();
            if (watchableValueElement) {
                watchableValueElement.innerText = valueString;
            }
        };
        /**
         * refreshes the visible trend filed content
         *
         * @param {MappCockpitComponentParameter} watchableParameter
         * @param {(HTMLElement | null)} watchableElement
         * @param {string} valueString
         * @returns {*}
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.refreshWatchableTrendField = function (watchableParameter, watchableTrendFieldId) {
            var watchableTrendData = this.getWatchableTrendValues(watchableParameter);
            this.renderWatchableTrend(watchableTrendFieldId, watchableTrendData);
        };
        /**
         * gets the trend values for the watchable parameter
         *
         * @private
         * @returns
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.getWatchableTrendValues = function (watchableParameter) {
            var trendValues = [];
            if (this._watchableTrendValues[watchableParameter.browseName]) {
                trendValues = this._watchableTrendValues[watchableParameter.browseName].values;
            }
            return trendValues;
        };
        /**
         * renders a short history of trends
         *
         * @private
         * @param {string} watchableTrendFieldId
         * @param {number[]} watchableTrendData
         * @returns
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.renderWatchableTrend = function (watchableTrendFieldId, watchableTrendData) {
            // get the trend cell
            var $trendCell = $(watchableTrendFieldId);
            var $sparkInstance = $(watchableTrendFieldId + "_sparkline_svg");
            // create a new sparkline instance if not already existing
            if ($sparkInstance.length === 0) {
                this.createWatchableTrendView($trendCell, watchableTrendData);
            }
            else {
                // update the trendline with new data
                this.updateWatchableTrendView($trendCell, watchableTrendData);
            }
        };
        /**
         * updates the trend view with new data
         *
         * @private
         * @param {JQuery<HTMLElement>} $trendCell
         * @param {number[]} watchableTrendData
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.updateWatchableTrendView = function ($trendCell, watchableTrendData) {
            $trendCell.ejSparkline({
                dataSource: watchableTrendData,
            });
        };
        /**
         *
         * creates a new instance of a watchable trend view
         * @private
         * @param {JQuery<HTMLElement>} jqtrendCell
         * @param {number[]} watchableTrendData
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.createWatchableTrendView = function ($trendCell, watchableTrendData) {
            $trendCell.ejSparkline({
                dataSource: watchableTrendData,
                width: 2,
                stroke: "#C4C4C4",
                type: "line",
                size: { height: 28, width: $trendCell.width() },
                isResponsive: false,
                padding: 2,
            });
        };
        /**
         * Observes the watchables for changes
         *
         * @param {MappCockpitComponentParameter[]} watchableParameters
         * @returns {*}
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.observeWatchables = function (watchableParameters) {
            // invoke observing the watchables
            mappCockpitComponent_1.MappCockpitComponentParameter.observeParameterValueChanges(this, watchableParameters);
        };
        /**
         * called after changes of observables
         *
         * @param {Observable[]} changedObservables
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.onObservablesChanged = function (changedObservables) {
            var _this = this;
            console.log("onObservablesChanged: %o %o", this, changedObservables);
            changedObservables.forEach(function (observable) {
                if (observable.property === "Value") {
                    var watchableParameter = observable.object;
                    _this.onWatchableValueChanged(watchableParameter);
                }
            });
        };
        /**
         * Observes the watchable parameters for changes and updates the corresponding fields
         *
         * @param {MappCockpitComponentParameter[]} watchableParameters
         * @returns {*}
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.attachWatchableChangeListener = function (watchableParameters) {
            var _this = this;
            watchableParameters.forEach(function (watchableParameter) {
                // listen to value changes ......
                watchableParameter.valueSource.changed(function () {
                    _this.onWatchableValueChanged(watchableParameter);
                });
            });
        };
        /**
         * Handles the value change of a watchable parameter
         *
         * @private
         * @param {MappCockpitComponentParameter} watchableParameter
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.onWatchableValueChanged = function (watchableParameter) {
            var _this = this;
            // refresh the value field.
            this.refreshWatchableValueField(watchableParameter);
            // refresh watchable icon when its connected parameter is changed
            if (this._stateParametersName.includes(watchableParameter.browseName)) {
                this._watchableStateParameters.forEach(function (parameter) {
                    if (parameter.expression.includes(watchableParameter.browseName)) {
                        _this.onWatchableStateValueChanged(parameter);
                    }
                });
            }
        };
        /**
         * Updates watchable icons
         *
         * @private
         * @param {MappCockpitStateParameter} stateParameter
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.onWatchableStateValueChanged = function (stateParameter) {
            var value = this.evaluateExpression(stateParameter);
            this._toolbar.updateIcons(stateParameter.name, stateParameter.icon[value]["ImageName"], stateParameter.icon[value]["Tooltip"]);
        };
        /**
         * Evaluate expression and get its value
         *
         * @private
         * @param {MappCockpitStateParameter} stateParameter
         * @returns
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.evaluateExpression = function (stateParameter) {
            var _this = this;
            var expression = stateParameter.expression;
            this._stateParametersName.forEach(function (watchableName) {
                if (stateParameter.expression.includes(watchableName)) {
                    var value = _this.getParameterValue(watchableName);
                    expression = expression.replace(new RegExp(watchableName, 'g'), value);
                }
            });
            return math.evaluate(expression);
        };
        /**
         * Gets actual value of watchableParameter
         *
         * @private
         * @param {string} name
         * @returns {string}
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.getParameterValue = function (name) {
            var value;
            this._watchableParameters.forEach(function (element) {
                if (element.browseName === name) {
                    value = element.value;
                }
            });
            return value.toString();
        };
        /**
         * Adds a new value to the parameters trend buffer
         *
         * @private
         * @param {MappCockpitComponentParameter} watchableParameter
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.addWatchableTrendValue = function (watchableParameter) {
            // filter numbers and boolean values to be recorded
            if (typeof watchableParameter.value === "number" || typeof watchableParameter.value === "boolean") {
                this._watchableTrendValues[watchableParameter.browseName].push(watchableParameter.value);
            }
        };
        /**
         * activates WatchablesWidget
         *
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.activate = function () {
            console.log("WatchablesWidget activated");
            mappCockpitComponent_1.MappCockpitComponentParameter.activateComponentModelItems(this, this._watchableParameters);
        };
        /**
         * deactivates WatchablesWidget
         *
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.deactivate = function () {
            console.log("WatchablesWidget deactivated");
            mappCockpitComponent_1.MappCockpitComponentParameter.deactivateComponentModelItems(this, this._watchableParameters);
        };
        /**
         * disposes WatchablesWidget
         *
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.dispose = function () {
            this.stopSamplingTimer();
            this.stopTrendTimer();
            mappCockpitComponent_1.MappCockpitComponentParameter.unobserveComponentModelItems(this, this._watchableParameters);
            _super.prototype.dispose.call(this);
        };
        return WatchablesWidget;
    }(treeGridWidgetBase_1.TreeGridWidgetBase));
    exports.WatchablesWidget = WatchablesWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2F0Y2hhYmxlc1dpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy93YXRjaGFibGVzV2lkZ2V0L3dhdGNoYWJsZXNXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZ0JBLHVEQUF1RDtJQUN2RCxJQUFNLGtCQUFrQixHQUFHLGlCQUFpQixDQUFDO0lBQzdDLElBQU0sa0JBQWtCLEdBQUcsaUJBQWlCLENBQUM7SUFDN0M7Ozs7O09BS0c7SUFDSDtRQUErQixvQ0FBa0I7UUFBakQ7WUFBQSxxRUEwcUJDO1lBenFCRyxzQ0FBc0M7WUFDOUIsMEJBQW9CLEdBQW9DLEVBQUUsQ0FBQztZQUNuRSwwRUFBMEU7WUFDbEUsK0JBQXlCLEdBQWdDLEVBQUUsQ0FBQztZQUNwRSwrREFBK0Q7WUFDdkQsMEJBQW9CLEdBQUcsSUFBSSxLQUFLLEVBQVUsQ0FBQztZQUNuRCwyQ0FBMkM7WUFDbkMsMkJBQXFCLEdBQUcsRUFBRSxDQUFDO1lBQ25DLHdDQUF3QztZQUNoQyxvQkFBYyxHQUFXLEtBQUssQ0FBQztZQUN2QyxpRUFBaUU7WUFDekQsNEJBQXNCLEdBQVUsR0FBRyxDQUFDO1lBQzVDLHdDQUF3QztZQUNoQyw4QkFBd0IsR0FBVSxHQUFHLENBQUM7WUFDOUMsMENBQTBDO1lBQ2xDLDZCQUF1QixHQUFxQixTQUFTLENBQUM7WUFDOUQseUNBQXlDO1lBQ2pDLDJCQUFxQixHQUFxQixDQUFDLENBQUMsQ0FBQzs7UUF3cEJ6RCxDQUFDO1FBcHBCRzs7Ozs7V0FLRztRQUNILHFDQUFVLEdBQVYsVUFBVyxpQkFBeUI7WUFDaEMsaUJBQU0sVUFBVSxZQUFDLGlCQUFpQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzVDLENBQUM7UUFFRCxzQ0FBVyxHQUFYO1lBQ0ksaUJBQU0sV0FBVyxXQUFFLENBQUM7WUFFcEIsaUJBQU0sZ0JBQWdCLFlBQUMsT0FB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QztRQUVEOzs7O1dBSUc7UUFDSSxrQ0FBTyxHQUFkO1lBQ0ksSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDekIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3RCLG9EQUE2QixDQUFDLDRCQUE0QixDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUMzRixpQkFBTSxPQUFPLFdBQUUsQ0FBQztRQUNwQixDQUFDO1FBQ0wsdUJBQUM7SUFBRCxDQUFDLEFBMXFCRCxDQUErQix1Q0FBa0IsR0EwcUJoRDtJQUVRLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9saWJzL3VpL1R5cGVzL2VqLndlYi5hbGwuZC50c1wiIC8+XHJcbmltcG9ydCAqIGFzIG1hdGggZnJvbSBcIi4uLy4uL2xpYnMvbWF0aC9tYXRoanNcIjtcclxuaW1wb3J0IHsgRG9tSGVscGVyIH0gZnJvbSBcIi4uL2NvbW1vbi9kb21IZWxwZXJcIjtcclxuaW1wb3J0IHsgSVdhdGNoYWJsZXNXaWRnZXQgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL3dhdGNoYWJsZXNXaWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVVpQmluZGluZyB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy93aWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgV2F0Y2hhYmxlc0dyaWRUb29sYmFyIH0gZnJvbSBcIi4vd2F0Y2hhYmxlc0dyaWRUb29sYmFyXCI7XHJcbmltcG9ydCB7IFRyZWVHcmlkV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vdHJlZUdyaWRXaWRnZXRCYXNlXCI7XHJcblxyXG5pbXBvcnQgeyBQcm9wZXJ0eSB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvcHJvcGVydHlcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIsIE1hcHBDb2NrcGl0U3RhdGVQYXJhbWV0ZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBXYXRjaGFibGVWYWx1ZVRyZW5kQnVmZmVyIH0gZnJvbSBcIi4vd2F0Y2hhYmxlVmFsdWVCdWZmZXJcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvaW50ZXJmYWNlcy9vYnNlcnZlclwiO1xyXG5pbXBvcnQgeyBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi9kZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgSUltYWdlUHJvdmlkZXIgfSBmcm9tIFwiLi4vY29tbW9uL2ludGVyZmFjZXMvaW1hZ2VQcm92aWRlckludGVyZmFjZVwiO1xyXG5cclxuLy8gZGVmaW5lcyB0aGUgYmFzZSBpZCBmb3IgdGhlIHdhdGNoYWJsZSB2YWx1ZSB0ZW1wbGF0ZVxyXG5jb25zdCBXQVRDSEFCTEVfVkFMVUVfSUQgPSBcIndhdGNoYWJsZVZhbHVlX1wiO1xyXG5jb25zdCBXQVRDSEFCTEVfVFJFTkRfSUQgPSBcIndhdGNoYWJsZVRyZW5kX1wiO1xyXG4vKipcclxuICogaW1wbGVtZW50cyB0aGUgd2lkZ2V0IGZvciBkaXNwbGF5aW5nIHRoZSB3YXRjaGFibGVzIGFuZCB0aGVpciB2YWx1ZXMgd2l0aCBmYXN0IHVwZGF0ZS4gSXQgaW5jbHVkZXMgZGlzcGxheWluZyBhIHNob3J0IHZhbHVlIHRyZW5kLlxyXG4gKlxyXG4gKiBAY2xhc3MgV2F0Y2hhYmxlc1dpZGdldFxyXG4gKiBAZXh0ZW5kcyB7VHJlZUdyaWRXaWRnZXRCYXNlfVxyXG4gKi9cclxuY2xhc3MgV2F0Y2hhYmxlc1dpZGdldCBleHRlbmRzIFRyZWVHcmlkV2lkZ2V0QmFzZSBpbXBsZW1lbnRzIElXYXRjaGFibGVzV2lkZ2V0IHtcclxuICAgIC8vIGhvbGRzIGEgbGlzdCBvZiBwYXJhbWV0ZXJzIHRvIHdhdGNoXHJcbiAgICBwcml2YXRlIF93YXRjaGFibGVQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdID0gW107XHJcbiAgICAvLyBob2xkcyBhIGxpc3Qgb2Ygd2F0Y2hhYmxlIHBhcmFtZXRlcnMgdGhhdCB1c2UgYW4gaWNvbiB0byBzaG93IGl0cyBzdGF0ZVxyXG4gICAgcHJpdmF0ZSBfd2F0Y2hhYmxlU3RhdGVQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdFN0YXRlUGFyYW1ldGVyW10gPSBbXTtcclxuICAgIC8vIGhvbGRzIGEgbGlzdCBvZiBwYXJhbWV0ZXJzIHRoYXQgY2hhbmdlIHdhdGNoYWJsZSBzdGF0ZSBpY29uc1xyXG4gICAgcHJpdmF0ZSBfc3RhdGVQYXJhbWV0ZXJzTmFtZSA9IG5ldyBBcnJheTxzdHJpbmc+KCk7XHJcbiAgICAvLyBob2xkcyBhIHRyZW5kIGJ1ZmZlciBmb3IgZXZlcnkgcGFyYW1ldGVyXHJcbiAgICBwcml2YXRlIF93YXRjaGFibGVUcmVuZFZhbHVlcyA9IHt9O1xyXG4gICAgLy8gc3BlY2lmaWVzIHRoZSB0aW1lIHNwYW4gb2YgdGhlIHRyZW5kLlxyXG4gICAgcHJpdmF0ZSBfdHJlbmRUaW1lU3BhbjogbnVtYmVyID0gNjAwMDA7XHJcbiAgICAvLyBzcGVjaWZpZXMgdGhlIHBlcmlvZCBmb3Igc2FtcGxpbmcgdGhlIHBhcmFtZXRlciB2YWx1ZXMgKG1zZWNzKVxyXG4gICAgcHJpdmF0ZSBfdHJlbmRTYW1wbGluZ0ludGVydmFsOm51bWJlciA9IDEwMDtcclxuICAgIC8vIHNwZWNpZmllcyB0aGUgdWkgcmVmcmVzaCByYXRlIChtc2VjcylcclxuICAgIHByaXZhdGUgX3RyZW5kUmVmcmVzaGluZ0ludGVydmFsOm51bWJlciA9IDUwMDtcclxuICAgIC8vIGhvbGRzIHRoZSB0aW1lciBpZCBmb3IgdGhlIHNhbXBsZSB0aW1lclxyXG4gICAgcHJpdmF0ZSBfd2F0Y2hhYmxlU2FtcGxlVGltZXJJZDogbnVtYmVyfHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuICAgIC8vIGhvbGRzIHRoZSB0aW1lciBpZCBmb3IgdGhlIHRyZW5kIHRpbWVyXHJcbiAgICBwcml2YXRlIF93YXRjaGFibFRyZW5kVGltZXJJZDogbnVtYmVyfHVuZGVmaW5lZCA9IC0xO1xyXG5cclxuICAgIHByaXZhdGUgX3Rvb2xiYXIhOiBXYXRjaGFibGVzR3JpZFRvb2xiYXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBpbml0aWFsaXplIHRoZSB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGF5b3V0Q29udGFpbmVySWRcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQ6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQsIDMwKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0aWFsaXplZCgpe1xyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemVkKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgc3VwZXIuc2V0SGVhZGVyQ29udGVudChcIldhdGNoXCIpO1xyXG5cclxuICAgICAgICAvLyBTZXQgZHluYW1pYyBjb2x1bW4gc2V0dGluZ3NcclxuICAgICAgICBzdXBlci5zZXREeW5hbWljQ29sdW1uKDMsIDEwMCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGluaXRpYWxpemVDb21wb25lbnQoKXtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5kZWZhdWx0U2V0dGluZ3NEYXRhSWQgPSBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuV2lkZ2V0RGVmaW5pdGlvbklkO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmRpc2FibGVQZXJzaXN0aW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IGNvbXBvbmVudCBzZXR0aW5ncyBmb3IgdGhpcyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7KENvbXBvbmVudFNldHRpbmdzfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBnZXREZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MoKTogQ29tcG9uZW50U2V0dGluZ3N8dW5kZWZpbmVke1xyXG4gICAgICAgIHJldHVybiBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuZ2V0V2F0Y2hhYmxlc1dpZGdldERlZmluaXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHdhdGNoYWJsZSBwYXJhbWV0ZXJzIGFzIHRoZSBkYXRhIHNvdXJjZSBmb3IgdGhlIHdhdGNoYWJsZXMgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCB3YXRjaGFibGVQYXJhbWV0ZXJzKHdhdGNoYWJsZVBhcmFtZXRlcnNQYXJhbWV0ZXJzTGluazogUHJvcGVydHk8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+Pikge1xyXG4gICAgICAgIHRoaXMuX3dhdGNoYWJsZVBhcmFtZXRlcnMgPSB3YXRjaGFibGVQYXJhbWV0ZXJzUGFyYW1ldGVyc0xpbmsudmFsdWU7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl93YXRjaGFibGVQYXJhbWV0ZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5vbkNvbXBvbmVudFBhcmFtZXRlcnNVcGRhdGVkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgd2F0Y2hhYmxlU3RhdGVQYXJhbWV0ZXJzKHdhdGNoYWJsZVN0YXRlUGFyYW1ldGVyczogQXJyYXk8TWFwcENvY2twaXRTdGF0ZVBhcmFtZXRlcj4pIHtcclxuICAgICAgICB0aGlzLl93YXRjaGFibGVTdGF0ZVBhcmFtZXRlcnMgPSB3YXRjaGFibGVTdGF0ZVBhcmFtZXRlcnM7XHJcbiAgICAgICAgdGhpcy5hZGRUcmVlR3JpZEljb25zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmUgYWxsIHdhdGNoYWJsZSB2YXJpYWJsZXMgdGhhdCBhcmUgdXNlZCBpbiB0aGUgd2F0Y2hhYmxlSWNvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRTdGF0ZVBhcmFtZXRlcnNOYW1lTGlzdCgpIHtcclxuICAgICAgICAgICAgdGhpcy5fd2F0Y2hhYmxlU3RhdGVQYXJhbWV0ZXJzLmZvckVhY2goKHN0YXRlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhdGUuZXhwcmVzc2lvbiAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl93YXRjaGFibGVQYXJhbWV0ZXJzLmZvckVhY2goKHdhdGNoYWJsZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZighdGhpcy5fc3RhdGVQYXJhbWV0ZXJzTmFtZS5pbmNsdWRlcyh3YXRjaGFibGUuYnJvd3NlTmFtZSkgJiYgc3RhdGUuZXhwcmVzc2lvbiEuaW5jbHVkZXMod2F0Y2hhYmxlLmJyb3dzZU5hbWUpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0YXRlUGFyYW1ldGVyc05hbWUucHVzaCh3YXRjaGFibGUuYnJvd3NlTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbXBvbmVudCBwYXJhbWV0ZXJzIGhhdmUgYmVlbiB1cGZhdGVkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gd2F0Y2hhYmxlUGFyYW1ldGVyc1xyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbkNvbXBvbmVudFBhcmFtZXRlcnNVcGRhdGVkKCkge1xyXG4gICAgICAgIC8vIGNyZWF0ZSB0cmVuZCBidWZmZXJzIGZvciB0aGUgcGFyYW1ldGVyc1xyXG4gICAgICAgIHRoaXMuY3JlYXRlV2F0Y2hhYmxlVHJlbmRCdWZmZXJzKHRoaXMuX3dhdGNoYWJsZVBhcmFtZXRlcnMpO1xyXG4gICAgICAgIC8vIHN0YXJ0IHdhdGNoYWJsZSB0cmVuZCB0aW1lclxyXG4gICAgICAgIHRoaXMuc3RhcnRXYXRjaGFibGVzVHJlbmQoKTtcclxuICAgICAgICAvLyBwb3B1bGF0ZSB0aGUgd2F0Y2hhYmxlcyB3aWRnZXRcclxuICAgICAgICB0aGlzLnBvcHVsYXRlV2F0Y2hhYmxlc1dpZGdldCgpO1xyXG4gICAgICAgIC8vIHNldCBhIGxpc3Qgb2Ygd2F0Y2hhYmxlIHZhcmlhYmxlcyB0aGF0IG1vZGlmeSB3YXRjaGFibGVJY29uc1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGVQYXJhbWV0ZXJzTmFtZUxpc3QoKTtcclxuICAgICAgICAvLyB1cGRhdGUgc3R5bGUgZm9yIHRyZWVHcmlkIEljb25zXHJcbiAgICAgICAgdGhpcy51cGRhdGVUb29sYmFySWNvbnMoKTtcclxuICAgICAgICAvLyBhZnRlciBwb3B1bGF0aW5nIHRoZSB3YXRjaGFibGVzIHdlIHN0YXJ0IG9ic2VydmluZyB2YWx1ZSBjaGFuZ2VzIG9mIHRoZSB3YXRjaGFibGVzXHJcbiAgICAgICAgdGhpcy5vYnNlcnZlV2F0Y2hhYmxlcyh0aGlzLl93YXRjaGFibGVQYXJhbWV0ZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFN0YXJ0XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBzdGFydFdhdGNoYWJsZXNUcmVuZCgpOiBhbnkge1xyXG4gICAgICAgIHRoaXMuc3RhcnRTYW1wbGluZ1dhdGNoYWJsZXMoKTtcclxuICAgICAgICB0aGlzLnN0YXJ0UmVmcmVzaGluZ1dhdGNoYWJsZXNUcmVuZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RhcnRzIHNhbXBsaW5nIHRoZSB3YXRjaGFibGVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhcnRTYW1wbGluZ1dhdGNoYWJsZXMoKSB7ICAgICAgICBcclxuICAgICAgICAvLyBzdG9wIGFuIGV2ZW50dWFsbHkgcnVubmluZyB0aW1lciBiZWZvcmUgc3RhcnRpbmcgYSBuZXcgb25lXHJcbiAgICAgICAgdGhpcy5zdG9wU2FtcGxpbmdUaW1lcigpO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5fd2F0Y2hhYmxlU2FtcGxlVGltZXJJZCA9ICBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2FtcGxlV2F0Y2hhYmxlcyh0aGlzLl93YXRjaGFibGVQYXJhbWV0ZXJzKTtcclxuICAgICAgICB9LCB0aGlzLl90cmVuZFNhbXBsaW5nSW50ZXJ2YWwsdGhpcy5fd2F0Y2hhYmxlU2FtcGxlVGltZXJJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdG9wcyB0aGUgc2FtcGxpbmcgdGltZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdG9wU2FtcGxpbmdUaW1lcigpIHtcclxuICAgICAgICBpZiAodGhpcy5fd2F0Y2hhYmxlU2FtcGxlVGltZXJJZCkge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuX3dhdGNoYWJsZVNhbXBsZVRpbWVySWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFN0YXJ0cyByZWZyZXNoaW5nIHRoZSB3YXRjaGFibGVzIHRyZW5kXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhcnRSZWZyZXNoaW5nV2F0Y2hhYmxlc1RyZW5kKCkge1xyXG5cclxuICAgICAgICAvLyBzdG9wIGFuIGV2ZW50dWFsbHkgcnVubmluZyB0aW1lciBiZWZvcmUgc3RhcnRpbmcgYSBuZXcgb25lXHJcbiAgICAgICAgdGhpcy5zdG9wVHJlbmRUaW1lcigpO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5fd2F0Y2hhYmxUcmVuZFRpbWVySWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaFdhdGNoYWJsZXNUcmVuZCh0aGlzLl93YXRjaGFibGVQYXJhbWV0ZXJzKTtcclxuICAgICAgICB9LCB0aGlzLl90cmVuZFJlZnJlc2hpbmdJbnRlcnZhbCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdG9wcyB0aGUgdHJlbmQgdGltZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdG9wVHJlbmRUaW1lcigpIHtcclxuICAgICAgICBpZiAodGhpcy5fd2F0Y2hhYmxUcmVuZFRpbWVySWQpIHtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl93YXRjaGFibFRyZW5kVGltZXJJZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIHRyZW5kIGJ1ZmZlciBmb3IgZXZlcnkgd2F0Y2hhYmxlIHBhcmFtZXRlclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZVdhdGNoYWJsZVRyZW5kQnVmZmVycyh3YXRjaGFibGVQYXJhbWV0ZXJzOk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pIHtcclxuICAgICAgICB3YXRjaGFibGVQYXJhbWV0ZXJzLmZvckVhY2goKHdhdGNoYWJsZVBhcmFtZXRlcikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl93YXRjaGFibGVUcmVuZFZhbHVlc1t3YXRjaGFibGVQYXJhbWV0ZXIuYnJvd3NlTmFtZV0gPSBXYXRjaGFibGVWYWx1ZVRyZW5kQnVmZmVyLmNyZWF0ZTxhbnk+KHRoaXMuX3RyZW5kVGltZVNwYW4vdGhpcy5fdHJlbmRTYW1wbGluZ0ludGVydmFsKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogcmVzaXplcyB0aGUgd2F0Y2hhYmxlcyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gd2lkdGhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHJlc2l6ZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xyXG4gICAgICAgIHN1cGVyLnJlc2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgLy8gUmVmcmVzaCB3YXRjaGFibGUgdmFsdWVzIGFmdGVyIHJlc2l6ZSAodHJlZWdyaWQgc2V0cyB0aGUgZGF0YSB0byBcIjBcIiBhZnRlciByZXNpemUpXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoV2F0Y2hhYmxlc1ZhbHVlcyh0aGlzLl93YXRjaGFibGVQYXJhbWV0ZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogY3JlYXRlcyB0aGUgdHJlZSBncmlkIGZvciB0aGUgd2F0Y2hhYmxlcyBpbmZvcm1hdGlvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlVHJlZUdyaWQoKSB7XHJcbiAgICAgICAgKDxhbnk+JCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCkpLmVqVHJlZUdyaWQoe1xyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbigpLFxyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkQ29sdW1uUmVzaXplU3VwcG9ydCgpLFxyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkVG9vbGJhclN1cHBvcnQoKSxcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGFsbG93U2VsZWN0aW9uOiBmYWxzZSxcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNyZWF0ZTogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWRDcmVhdGVkKCksXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgY29sdW1uIGRlZmluaXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmVlR3JpZENvbHVtbkRlZmluaXRpb24oKToge317XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY29sdW1uczogW1xyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJkaXNwbGF5TmFtZVwiLCBoZWFkZXJUZXh0OiBcIk5hbWVcIiwgaXNQcmltYXJ5S2V5OiB0cnVlLCB3aWR0aDogXCIyMDBcIiB9LFxyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJkaXNwbGF5VmFsdWVcIiwgaGVhZGVyVGV4dDogXCJWYWx1ZVwiLCB3aWR0aDogXCIyMDBcIiwgaXNUZW1wbGF0ZUNvbHVtbjogdHJ1ZSwgdGVtcGxhdGU6IFwiPGRpdiBzdHlsZT0ncGFkZGluZy1sZWZ0OiAyMHB4JyBpZD0nXCIgKyB0aGlzLnBhcmVudENvbnRlbnRJZCArIFdBVENIQUJMRV9WQUxVRV9JRCArIFwie3s6dWlJZH19Jz4wPC9kaXY+XCIgfSxcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwiZW5naW5lZXJpbmdVbml0XCIsIGhlYWRlclRleHQ6IFwiVW5pdFwiLCB3aWR0aDogXCIxMDBcIiB9LFxyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJ3YXRjaGFibGVUcmVuZFwiLCBoZWFkZXJUZXh0OiBcIlRyZW5kXCIsIGlzVGVtcGxhdGVDb2x1bW46IHRydWUsIHRlbXBsYXRlOiBcIjxkaXYgaWQ9J1wiICsgdGhpcy5wYXJlbnRDb250ZW50SWQgKyBXQVRDSEFCTEVfVFJFTkRfSUQgKyBcInt7OnVpSWR9fSc+PC9kaXY+XCIgfSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJlZSBncmlkIGNvbHVtbiByZXNpemUgc2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmVlR3JpZENvbHVtblJlc2l6ZVN1cHBvcnQoKToge317XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYWxsb3dDb2x1bW5SZXNpemU6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbHVtblJlc2l6ZVNldHRpbmdzOiB7IGNvbHVtblJlc2l6ZU1vZGU6IGVqLlRyZWVHcmlkLkNvbHVtblJlc2l6ZU1vZGUuRml4ZWRDb2x1bW5zIH0sXHJcbiAgICAgICAgICAgIGNvbHVtblJlc2l6ZWQ6IChhcmdzKSA9PiB0aGlzLmNvbHVtblJlc2l6ZWQoYXJncyksXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCB0b29sYmFyIHNldHRpbmdzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VHJlZUdyaWRUb29sYmFyU3VwcG9ydCgpOiB7fXtcclxuICAgICAgICBsZXQgaW1hZ2VQcm92aWRlciA9IHRoaXMuY29tcG9uZW50LmdldFN1YkNvbXBvbmVudChEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuSW1hZ2VQcm92aWRlcklkKSBhcyBJSW1hZ2VQcm92aWRlcjtcclxuICAgICAgICB0aGlzLl90b29sYmFyID0gbmV3IFdhdGNoYWJsZXNHcmlkVG9vbGJhcih0aGlzLmNzc1BhcmVudENvbnRlbnRJZCwgaW1hZ2VQcm92aWRlcik7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdG9vbGJhclNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICBzaG93VG9vbGJhcjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGN1c3RvbVRvb2xiYXJJdGVtczogdGhpcy5fdG9vbGJhci5nZXRDdXN0b21Ub29sYmFycygpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNvbHVtblJlc2l6ZWQoYXJncyl7XHJcbiAgICAgICAgc3VwZXIucmVzaXplRHluYW1pY0NvbHVtbihhcmdzLmNvbHVtbkluZGV4LCBhcmdzLm1vZGVsKTtcclxuICAgICAgICAvLyBSZWZyZXNoIHdhdGNoYWJsZSB2YWx1ZXMgYWZ0ZXIgcmVzaXplICh0cmVlZ3JpZCBzZXRzIHRoZSBkYXRhIHRvIFwiMFwiIGFmdGVyIHJlc2l6ZSlcclxuICAgICAgICB0aGlzLnJlZnJlc2hXYXRjaGFibGVzVmFsdWVzKHRoaXMuX3dhdGNoYWJsZVBhcmFtZXRlcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdHJlZUdyaWRDcmVhdGVkKCl7XHJcbiAgICAgICAgLy8gU2V0cyB0aGUgY3VzdG9tIHRvb2xiYXIgaWNvbnNcclxuICAgICAgICAgdGhpcy5fdG9vbGJhci5zZXRTdHlsZUZvclRvb2xiYXJJY29ucygpO1xyXG5cclxuICAgICAgICAvLyAvLyBkaXNhYmxlIGR1bW15IGJ1dHRvbiBhZnRlciBjcmVhdGlvblxyXG4gICAgICAgICB0aGlzLl90b29sYmFyLmRpc2FibGVEdW1teUJ1dHRvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYWRkVHJlZUdyaWRJY29ucygpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3dhdGNoYWJsZVN0YXRlUGFyYW1ldGVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLl90b29sYmFyLmFkZEljb24odGhpcy5fd2F0Y2hhYmxlU3RhdGVQYXJhbWV0ZXJzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNhYmxlIGJ1dHRvbiBwcm9wZXJ0aWVzIGZyb20gaWNvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVUb29sYmFySWNvbnMoKSB7XHJcbiAgICAgICAgdGhpcy5fdG9vbGJhci5oaWRlSWNvbignZW1wdHknKTtcclxuICAgICAgICB0aGlzLl90b29sYmFyLmNvbnZlcnRCdG5zVG9JY29ucygpO1xyXG4gICAgICAgIHRoaXMuX3Rvb2xiYXIuYWRkRXZlbnRMaXN0ZW5lcnMoKTtcclxuICAgICAgICB0aGlzLl90b29sYmFyLnRvb2x0aXBFeHRlbnNpb24oKTtcclxuXHJcbiAgICAgICAgLy9Xb3JrYXJvdW5kOiB0b29sYmFyIGhlaWdodCBjaGFuZ2VzIHdoZW4gaXQgaXMgdXBkYXRlZCBhIHNlY29uZCB0aW1lLiBIZXJlIHdlIHNldCB0byB0aGUgc2l6ZSB3ZSB3YW50LlxyXG4gICAgICAgIGxldCAkdG9vbGJhciA9ICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQgKyAnX3Rvb2xiYXJJdGVtcycpO1xyXG4gICAgICAgICR0b29sYmFyWzBdLnN0eWxlLnNldFByb3BlcnR5KCdoZWlnaHQnLCczM3B4JywnaW1wb3J0YW50Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogbWFya3MgdGhlIHBhcmFtZXRlcnMgd2l0aCBhbiBpZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgdWkgXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSB3YXRjaGFibGVQYXJhbWV0ZXJzXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldFdhdGNoYWJsZXNVaUlkKHdhdGNoYWJsZVBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdhdGNoYWJsZVBhcmFtZXRlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3Qgd2F0Y2hhYmxlUGFyYW1ldGVyID0gd2F0Y2hhYmxlUGFyYW1ldGVyc1tpXTtcclxuICAgICAgICAgICAgKDxJVWlCaW5kaW5nPjxhbnk+d2F0Y2hhYmxlUGFyYW1ldGVyKS51aUlkID0gaTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQb3B1bGF0ZSB0aGUgd2lkZ2V0IHdpdGggaXRzIHNwZWNpZmljIGRhdGEgY29udGVudC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwb3B1bGF0ZVdhdGNoYWJsZXNXaWRnZXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZXRXYXRjaGFibGVzVWlJZCh0aGlzLl93YXRjaGFibGVQYXJhbWV0ZXJzKTtcclxuICAgICAgICAoPGFueT4kKHRoaXMuY3NzUGFyZW50Q29udGVudElkKSkuZWpUcmVlR3JpZCh7XHJcbiAgICAgICAgICAgIGRhdGFTb3VyY2U6IHRoaXMuX3dhdGNoYWJsZVBhcmFtZXRlcnMsXHJcbiAgICAgICAgICAgIHRvb2xiYXJTZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgY3VzdG9tVG9vbGJhckl0ZW1zOiB0aGlzLl90b29sYmFyLmdldEN1c3RvbVRvb2xiYXJzKClcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNhbXBsZXMgdGhlIHdhdGNoYWJsZSB2YWx1ZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSB3YXRjaGFibGVQYXJhbWV0ZXJzXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNhbXBsZVdhdGNoYWJsZXMod2F0Y2hhYmxlUGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSkge1xyXG5cclxuICAgICAgICB3YXRjaGFibGVQYXJhbWV0ZXJzLmZvckVhY2goKHdhdGNoYWJsZVBhcmFtZXRlcik9PntcclxuICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSB0cmVuZCBidWZmZXJcclxuICAgICAgICAgICAgdGhpcy5hZGRXYXRjaGFibGVUcmVuZFZhbHVlKHdhdGNoYWJsZVBhcmFtZXRlcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWZyZXNoZXMgdGhlIHdhdGNoYWJsZXMgdHJlbmQgZmllbGRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gd2F0Y2hhYmxlUGFyYW1ldGVyc1xyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWZyZXNoV2F0Y2hhYmxlc1RyZW5kKHdhdGNoYWJsZVBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pIHtcclxuICAgICAgICB3YXRjaGFibGVQYXJhbWV0ZXJzLmZvckVhY2goKHdhdGNoYWJsZVBhcmFtZXRlcikgPT4ge1xyXG4gICAgICAgICAgICBsZXQgd2F0Y2hhYmxlVHJlbmRFbGVtZW50ID0gdGhpcy5nZXRXYXRjaGFibGVUcmVuZEVsZW1lbnQod2F0Y2hhYmxlUGFyYW1ldGVyKTtcclxuICAgICAgICAgICAgaWYgKHdhdGNoYWJsZVRyZW5kRWxlbWVudCAmJiBEb21IZWxwZXIuaXNFbGVtZW50SW5WaWV3cG9ydCh3YXRjaGFibGVUcmVuZEVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgd2F0Y2hhYmxlVHJlbmRGaWVsZElkID0gXCIjXCIgKyB3YXRjaGFibGVUcmVuZEVsZW1lbnQuaWQ7XHJcbiAgICAgICAgICAgICAgICAvLyB1cGRhdGUgdGhlIHRyZW5kIGZpZWxkXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hXYXRjaGFibGVUcmVuZEZpZWxkKHdhdGNoYWJsZVBhcmFtZXRlcix3YXRjaGFibGVUcmVuZEZpZWxkSWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZWZyZXNoZXMgdGhlIGNvbnRlbnQgb2YgdGhlIHdhdGNoYWJsZSB2YWx1ZSBmaWVsZHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSB3YXRjaGFibGVQYXJhbWV0ZXJzXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlZnJlc2hXYXRjaGFibGVzVmFsdWVzKHdhdGNoYWJsZVBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pIHtcclxuXHJcbiAgICAgICAgd2F0Y2hhYmxlUGFyYW1ldGVycy5mb3JFYWNoKCh3YXRjaGFibGVQYXJhbWV0ZXIpPT57dGhpcy5yZWZyZXNoV2F0Y2hhYmxlVmFsdWVGaWVsZCh3YXRjaGFibGVQYXJhbWV0ZXIpfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIGFuIGVsZW1lbnQgY29ycmVzcG9uZGluZyB0byB0aGUgcGFyYW1ldGVyIHRvIGJlIHVzZWQgZm9yIGRpc3BsYXlpbmcgdGhlIHdhdGNoYWJsZSB2YWx1ZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyfSB3YXRjaGFibGVQYXJhbWV0ZXJcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFdhdGNoYWJsZVZhbHVlRWxlbWVudCh3YXRjaGFibGVQYXJhbWV0ZXI6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyKTogSFRNTEVsZW1lbnQgfCBudWxsIHtcclxuICAgICAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5wYXJlbnRDb250ZW50SWQgKyBXQVRDSEFCTEVfVkFMVUVfSUQgKyAoPElVaUJpbmRpbmc+PGFueT53YXRjaGFibGVQYXJhbWV0ZXIpLnVpSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBhbiBlbGVtZW50IGNvcnJlc3BvbmRpbmcgdG8gdGhlIHBhcmFtZXRlciB0byBiZSB1c2VkIGZvciBkaXNwbGF5aW5nIHRoZSB3YXRjaGFibGUgdHJlbmQgbGluZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyfSB3YXRjaGFibGVQYXJhbWV0ZXJcclxuICAgICAqIEByZXR1cm5zIHsoSFRNTEVsZW1lbnQgfCBudWxsKX1cclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0V2F0Y2hhYmxlVHJlbmRFbGVtZW50KHdhdGNoYWJsZVBhcmFtZXRlcjogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIpOiBIVE1MRWxlbWVudCB8IG51bGwge1xyXG4gICAgICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnBhcmVudENvbnRlbnRJZCArIFdBVENIQUJMRV9UUkVORF9JRCArICg8SVVpQmluZGluZz48YW55PndhdGNoYWJsZVBhcmFtZXRlcikudWlJZClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHVwZGF0ZXMgYSB3YXRjaGFibGUgZmllbGQgd2l0aCB0aGUgY3VycmVudCB2YWx1ZXMgb2YgdGhlIGNvcnJlc3BvbmRpbmcgcGFyYW1ldGVyXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJ9IHdhdGNoYWJsZVBhcmFtZXRlclxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWZyZXNoV2F0Y2hhYmxlVmFsdWVGaWVsZCh3YXRjaGFibGVQYXJhbWV0ZXI6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyKSB7XHJcblxyXG4gICAgICAgIC8vIGdldCB0aGUgY29ycmVzcG9uZGluZyB1aSBlbGVtZW50XHJcbiAgICAgICAgbGV0IHdhdGNoYWJsZVZhbHVlRWxlbWVudCA9ICB0aGlzLmdldFdhdGNoYWJsZVZhbHVlRWxlbWVudCh3YXRjaGFibGVQYXJhbWV0ZXIpO1xyXG5cclxuICAgICAgICAvLyBsZXQgbWluVmFsdWUgPSB0aGlzLl93YXRjaGFibGVUcmVuZFZhbHVlc1t3YXRjaGFibGVQYXJhbWV0ZXIuYnJvd3NlTmFtZV0uX21pblZhbHVlO1xyXG4gICAgICAgIC8vIGxldCBtYXhWYWx1ZSA9IHRoaXMuX3dhdGNoYWJsZVRyZW5kVmFsdWVzW3dhdGNoYWJsZVBhcmFtZXRlci5icm93c2VOYW1lXS5fbWF4VmFsdWU7XHJcblxyXG4gICAgICAgIC8vIGxldCB2YWx1ZVN0cmluZzogc3RyaW5nID0gd2F0Y2hhYmxlUGFyYW1ldGVyLmRpc3BsYXlWYWx1ZS50b1N0cmluZygpICsgXCIoXCIgKyBtaW5WYWx1ZSArIFwiLVwiICsgbWF4VmFsdWUgKyBcIilcIjtcclxuICAgICAgICBsZXQgdmFsdWVTdHJpbmc6IHN0cmluZyA9IHdhdGNoYWJsZVBhcmFtZXRlci5kaXNwbGF5VmFsdWUudG9TdHJpbmcoKTtcclxuICAgICAgICBpZiAod2F0Y2hhYmxlVmFsdWVFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHdhdGNoYWJsZVZhbHVlRWxlbWVudC5pbm5lclRleHQgPSB2YWx1ZVN0cmluZztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZWZyZXNoZXMgdGhlIHZpc2libGUgdHJlbmQgZmlsZWQgY29udGVudFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJ9IHdhdGNoYWJsZVBhcmFtZXRlclxyXG4gICAgICogQHBhcmFtIHsoSFRNTEVsZW1lbnQgfCBudWxsKX0gd2F0Y2hhYmxlRWxlbWVudFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlU3RyaW5nXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHJlZnJlc2hXYXRjaGFibGVUcmVuZEZpZWxkKHdhdGNoYWJsZVBhcmFtZXRlcjogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIsd2F0Y2hhYmxlVHJlbmRGaWVsZElkOnN0cmluZyApOiBhbnkge1xyXG5cclxuICAgICAgICBsZXQgd2F0Y2hhYmxlVHJlbmREYXRhID0gdGhpcy5nZXRXYXRjaGFibGVUcmVuZFZhbHVlcyh3YXRjaGFibGVQYXJhbWV0ZXIpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyV2F0Y2hhYmxlVHJlbmQod2F0Y2hhYmxlVHJlbmRGaWVsZElkLCB3YXRjaGFibGVUcmVuZERhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0cyB0aGUgdHJlbmQgdmFsdWVzIGZvciB0aGUgd2F0Y2hhYmxlIHBhcmFtZXRlclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRXYXRjaGFibGVUcmVuZFZhbHVlcyh3YXRjaGFibGVQYXJhbWV0ZXI6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyKTogQXJyYXk8YW55PiB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHRyZW5kVmFsdWVzID0gW107XHJcbiAgICAgICAgaWYgKHRoaXMuX3dhdGNoYWJsZVRyZW5kVmFsdWVzW3dhdGNoYWJsZVBhcmFtZXRlci5icm93c2VOYW1lXSkge1xyXG4gICAgICAgICAgICB0cmVuZFZhbHVlcyA9IHRoaXMuX3dhdGNoYWJsZVRyZW5kVmFsdWVzW3dhdGNoYWJsZVBhcmFtZXRlci5icm93c2VOYW1lXS52YWx1ZXM7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cmVuZFZhbHVlcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlbmRlcnMgYSBzaG9ydCBoaXN0b3J5IG9mIHRyZW5kc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gd2F0Y2hhYmxlVHJlbmRGaWVsZElkXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcltdfSB3YXRjaGFibGVUcmVuZERhdGFcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlbmRlcldhdGNoYWJsZVRyZW5kKHdhdGNoYWJsZVRyZW5kRmllbGRJZDogc3RyaW5nLCB3YXRjaGFibGVUcmVuZERhdGE6IG51bWJlcltdKSB7XHJcblxyXG4gICAgICAgIC8vIGdldCB0aGUgdHJlbmQgY2VsbFxyXG4gICAgICAgIGxldCAkdHJlbmRDZWxsID0gJCh3YXRjaGFibGVUcmVuZEZpZWxkSWQpO1xyXG4gICAgICAgIGxldCAkc3BhcmtJbnN0YW5jZSA9ICQod2F0Y2hhYmxlVHJlbmRGaWVsZElkICsgXCJfc3BhcmtsaW5lX3N2Z1wiKTtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIGEgbmV3IHNwYXJrbGluZSBpbnN0YW5jZSBpZiBub3QgYWxyZWFkeSBleGlzdGluZ1xyXG4gICAgICAgIGlmICgkc3BhcmtJbnN0YW5jZS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVXYXRjaGFibGVUcmVuZFZpZXcoJHRyZW5kQ2VsbCwgd2F0Y2hhYmxlVHJlbmREYXRhKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyB1cGRhdGUgdGhlIHRyZW5kbGluZSB3aXRoIG5ldyBkYXRhXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlV2F0Y2hhYmxlVHJlbmRWaWV3KCR0cmVuZENlbGwsIHdhdGNoYWJsZVRyZW5kRGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdXBkYXRlcyB0aGUgdHJlbmQgdmlldyB3aXRoIG5ldyBkYXRhXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SlF1ZXJ5PEhUTUxFbGVtZW50Pn0gJHRyZW5kQ2VsbFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJbXX0gd2F0Y2hhYmxlVHJlbmREYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZVdhdGNoYWJsZVRyZW5kVmlldygkdHJlbmRDZWxsOiBKUXVlcnk8SFRNTEVsZW1lbnQ+LCB3YXRjaGFibGVUcmVuZERhdGE6IG51bWJlcltdKSB7XHJcbiAgICAgICAgJHRyZW5kQ2VsbC5lalNwYXJrbGluZSh7XHJcbiAgICAgICAgICAgIGRhdGFTb3VyY2U6IHdhdGNoYWJsZVRyZW5kRGF0YSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBjcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIGEgd2F0Y2hhYmxlIHRyZW5kIHZpZXdcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0pRdWVyeTxIVE1MRWxlbWVudD59IGpxdHJlbmRDZWxsXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcltdfSB3YXRjaGFibGVUcmVuZERhdGFcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlV2F0Y2hhYmxlVHJlbmRWaWV3KCR0cmVuZENlbGw6IEpRdWVyeTxIVE1MRWxlbWVudD4sIHdhdGNoYWJsZVRyZW5kRGF0YTogbnVtYmVyW10pIHtcclxuICAgICAgICAkdHJlbmRDZWxsLmVqU3BhcmtsaW5lKHtcclxuICAgICAgICAgICAgZGF0YVNvdXJjZTogd2F0Y2hhYmxlVHJlbmREYXRhLFxyXG4gICAgICAgICAgICB3aWR0aDogMixcclxuICAgICAgICAgICAgc3Ryb2tlOiBcIiNDNEM0QzRcIiwgICBcclxuICAgICAgICAgICAgdHlwZTogXCJsaW5lXCIsXHJcbiAgICAgICAgICAgIHNpemU6IHsgaGVpZ2h0OiAyOCwgd2lkdGg6ICR0cmVuZENlbGwud2lkdGgoKSB9LFxyXG4gICAgICAgICAgICBpc1Jlc3BvbnNpdmU6IGZhbHNlLFxyXG4gICAgICAgICAgICBwYWRkaW5nOiAyLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT2JzZXJ2ZXMgdGhlIHdhdGNoYWJsZXMgZm9yIGNoYW5nZXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IHdhdGNoYWJsZVBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgb2JzZXJ2ZVdhdGNoYWJsZXMod2F0Y2hhYmxlUGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSk6IGFueSB7XHJcbiAgICAgICAgLy8gaW52b2tlIG9ic2VydmluZyB0aGUgd2F0Y2hhYmxlc1xyXG4gICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyLm9ic2VydmVQYXJhbWV0ZXJWYWx1ZUNoYW5nZXModGhpcyx3YXRjaGFibGVQYXJhbWV0ZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNhbGxlZCBhZnRlciBjaGFuZ2VzIG9mIG9ic2VydmFibGVzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYnNlcnZhYmxlW119IGNoYW5nZWRPYnNlcnZhYmxlc1xyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgb25PYnNlcnZhYmxlc0NoYW5nZWQoY2hhbmdlZE9ic2VydmFibGVzOiBPYnNlcnZhYmxlW10pIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIm9uT2JzZXJ2YWJsZXNDaGFuZ2VkOiAlbyAlb1wiLHRoaXMsY2hhbmdlZE9ic2VydmFibGVzKTtcclxuICAgICAgICBjaGFuZ2VkT2JzZXJ2YWJsZXMuZm9yRWFjaCgob2JzZXJ2YWJsZSk9PntcclxuICAgICAgICAgICAgaWYgKG9ic2VydmFibGUucHJvcGVydHkgPT09IFwiVmFsdWVcIikge1xyXG4gICAgICAgICAgICAgICAgbGV0IHdhdGNoYWJsZVBhcmFtZXRlcjpNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlciA9IG9ic2VydmFibGUub2JqZWN0IGFzIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbldhdGNoYWJsZVZhbHVlQ2hhbmdlZCh3YXRjaGFibGVQYXJhbWV0ZXIpOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT2JzZXJ2ZXMgdGhlIHdhdGNoYWJsZSBwYXJhbWV0ZXJzIGZvciBjaGFuZ2VzIGFuZCB1cGRhdGVzIHRoZSBjb3JyZXNwb25kaW5nIGZpZWxkc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gd2F0Y2hhYmxlUGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBhdHRhY2hXYXRjaGFibGVDaGFuZ2VMaXN0ZW5lcih3YXRjaGFibGVQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdKTogYW55IHtcclxuICAgICAgICB3YXRjaGFibGVQYXJhbWV0ZXJzLmZvckVhY2goKHdhdGNoYWJsZVBhcmFtZXRlcikgPT4ge1xyXG4gICAgICAgICAgICAvLyBsaXN0ZW4gdG8gdmFsdWUgY2hhbmdlcyAuLi4uLi5cclxuICAgICAgICAgICAgd2F0Y2hhYmxlUGFyYW1ldGVyLnZhbHVlU291cmNlLmNoYW5nZWQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbldhdGNoYWJsZVZhbHVlQ2hhbmdlZCh3YXRjaGFibGVQYXJhbWV0ZXIpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlcyB0aGUgdmFsdWUgY2hhbmdlIG9mIGEgd2F0Y2hhYmxlIHBhcmFtZXRlclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyfSB3YXRjaGFibGVQYXJhbWV0ZXJcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25XYXRjaGFibGVWYWx1ZUNoYW5nZWQod2F0Y2hhYmxlUGFyYW1ldGVyOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcikge1xyXG4gICAgICAgIC8vIHJlZnJlc2ggdGhlIHZhbHVlIGZpZWxkLlxyXG4gICAgICAgIHRoaXMucmVmcmVzaFdhdGNoYWJsZVZhbHVlRmllbGQod2F0Y2hhYmxlUGFyYW1ldGVyKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyByZWZyZXNoIHdhdGNoYWJsZSBpY29uIHdoZW4gaXRzIGNvbm5lY3RlZCBwYXJhbWV0ZXIgaXMgY2hhbmdlZFxyXG4gICAgICAgIGlmICh0aGlzLl9zdGF0ZVBhcmFtZXRlcnNOYW1lLmluY2x1ZGVzKHdhdGNoYWJsZVBhcmFtZXRlci5icm93c2VOYW1lKSkge1xyXG4gICAgICAgICAgICB0aGlzLl93YXRjaGFibGVTdGF0ZVBhcmFtZXRlcnMuZm9yRWFjaCgocGFyYW1ldGVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyYW1ldGVyLmV4cHJlc3Npb24uaW5jbHVkZXMod2F0Y2hhYmxlUGFyYW1ldGVyLmJyb3dzZU5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbldhdGNoYWJsZVN0YXRlVmFsdWVDaGFuZ2VkKHBhcmFtZXRlcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgd2F0Y2hhYmxlIGljb25zXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRTdGF0ZVBhcmFtZXRlcn0gc3RhdGVQYXJhbWV0ZXJcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25XYXRjaGFibGVTdGF0ZVZhbHVlQ2hhbmdlZChzdGF0ZVBhcmFtZXRlcjogTWFwcENvY2twaXRTdGF0ZVBhcmFtZXRlcikge1xyXG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuZXZhbHVhdGVFeHByZXNzaW9uKHN0YXRlUGFyYW1ldGVyKTtcclxuICAgICAgICB0aGlzLl90b29sYmFyLnVwZGF0ZUljb25zKHN0YXRlUGFyYW1ldGVyLm5hbWUsIHN0YXRlUGFyYW1ldGVyLmljb25bdmFsdWVdW1wiSW1hZ2VOYW1lXCJdLCBzdGF0ZVBhcmFtZXRlci5pY29uW3ZhbHVlXVtcIlRvb2x0aXBcIl0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRXZhbHVhdGUgZXhwcmVzc2lvbiBhbmQgZ2V0IGl0cyB2YWx1ZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0U3RhdGVQYXJhbWV0ZXJ9IHN0YXRlUGFyYW1ldGVyXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBldmFsdWF0ZUV4cHJlc3Npb24oc3RhdGVQYXJhbWV0ZXI6IE1hcHBDb2NrcGl0U3RhdGVQYXJhbWV0ZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBleHByZXNzaW9uID0gc3RhdGVQYXJhbWV0ZXIuZXhwcmVzc2lvbjtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9zdGF0ZVBhcmFtZXRlcnNOYW1lLmZvckVhY2goKHdhdGNoYWJsZU5hbWUpPT57XHJcbiAgICAgICAgICAgIGlmIChzdGF0ZVBhcmFtZXRlci5leHByZXNzaW9uIS5pbmNsdWRlcyh3YXRjaGFibGVOYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5nZXRQYXJhbWV0ZXJWYWx1ZSh3YXRjaGFibGVOYW1lKVxyXG4gICAgICAgICAgICAgICAgZXhwcmVzc2lvbiA9IGV4cHJlc3Npb24hLnJlcGxhY2UobmV3IFJlZ0V4cCh3YXRjaGFibGVOYW1lLCAnZycpLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gbWF0aC5ldmFsdWF0ZShleHByZXNzaW9uKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIGFjdHVhbCB2YWx1ZSBvZiB3YXRjaGFibGVQYXJhbWV0ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFBhcmFtZXRlclZhbHVlKG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuX3dhdGNoYWJsZVBhcmFtZXRlcnMuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQuYnJvd3NlTmFtZSA9PT0gbmFtZSkge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBlbGVtZW50LnZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgbmV3IHZhbHVlIHRvIHRoZSBwYXJhbWV0ZXJzIHRyZW5kIGJ1ZmZlclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyfSB3YXRjaGFibGVQYXJhbWV0ZXJcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkV2F0Y2hhYmxlVHJlbmRWYWx1ZSh3YXRjaGFibGVQYXJhbWV0ZXI6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyKSB7XHJcbiAgICAgICAgLy8gZmlsdGVyIG51bWJlcnMgYW5kIGJvb2xlYW4gdmFsdWVzIHRvIGJlIHJlY29yZGVkXHJcbiAgICAgICAgaWYgKHR5cGVvZiB3YXRjaGFibGVQYXJhbWV0ZXIudmFsdWUgPT09IFwibnVtYmVyXCIgfHwgdHlwZW9mIHdhdGNoYWJsZVBhcmFtZXRlci52YWx1ZSA9PT0gXCJib29sZWFuXCIpIHtcclxuICAgICAgICAgICAgKDxXYXRjaGFibGVWYWx1ZVRyZW5kQnVmZmVyPnRoaXMuX3dhdGNoYWJsZVRyZW5kVmFsdWVzW3dhdGNoYWJsZVBhcmFtZXRlci5icm93c2VOYW1lXSkucHVzaCg8bnVtYmVyPndhdGNoYWJsZVBhcmFtZXRlci52YWx1ZSk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYWN0aXZhdGVzIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWN0aXZhdGUoKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIldhdGNoYWJsZXNXaWRnZXQgYWN0aXZhdGVkXCIpO1xyXG4gICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyLmFjdGl2YXRlQ29tcG9uZW50TW9kZWxJdGVtcyh0aGlzLHRoaXMuX3dhdGNoYWJsZVBhcmFtZXRlcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZGVhY3RpdmF0ZXMgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkZWFjdGl2YXRlKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJXYXRjaGFibGVzV2lkZ2V0IGRlYWN0aXZhdGVkXCIpO1xyXG4gICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyLmRlYWN0aXZhdGVDb21wb25lbnRNb2RlbEl0ZW1zKHRoaXMsdGhpcy5fd2F0Y2hhYmxlUGFyYW1ldGVycyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBkaXNwb3NlcyBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRpc3Bvc2UoKXtcclxuICAgICAgICB0aGlzLnN0b3BTYW1wbGluZ1RpbWVyKCk7XHJcbiAgICAgICAgdGhpcy5zdG9wVHJlbmRUaW1lcigpO1xyXG4gICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyLnVub2JzZXJ2ZUNvbXBvbmVudE1vZGVsSXRlbXModGhpcyx0aGlzLl93YXRjaGFibGVQYXJhbWV0ZXJzKTtcclxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IFdhdGNoYWJsZXNXaWRnZXQgfTsiXX0=