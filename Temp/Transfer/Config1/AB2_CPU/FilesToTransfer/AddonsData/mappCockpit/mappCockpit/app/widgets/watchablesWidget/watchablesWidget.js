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
define(["require", "exports", "../../libs/math/mathjs", "../common/domHelper", "./watchablesGridToolbar", "../common/treeGridWidgetBase", "../../models/online/mappCockpitComponent", "./watchableValueBuffer"], function (require, exports, math, domHelper_1, watchablesGridToolbar_1, treeGridWidgetBase_1, mappCockpitComponent_1, watchableValueBuffer_1) {
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
            _super.prototype.setHeaderContent.call(this, "Watch");
            // Set dynamic column settings
            _super.prototype.setDynamicColumn.call(this, 3, 100);
        };
        WatchablesWidget.prototype.initializeComponent = function () {
            this.component.disablePersisting();
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
                var _this = this;
                this._watchableStateParameters = watchableStateParameters;
                this._watchableStateParameters.forEach(function (state) {
                    if (state.parameters != undefined) {
                        for (var i = 0; i < state.parameters.length; i++) {
                            if (!_this._stateParametersName.includes(state.parameters[i])) {
                                _this._stateParametersName.push(state.parameters[i]);
                            }
                        }
                    }
                });
                this.addTreeGridIcons();
            },
            enumerable: true,
            configurable: true
        });
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
            this._toolbar = new watchablesGridToolbar_1.WatchablesGridToolbar(this.cssParentContentId);
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
        WatchablesWidget.prototype.updateToolbarIcons = function () {
            this._toolbar.hideIcon('empty');
            this._toolbar.disableIcons();
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
         * updates a watchable field with the current values of the correspondig parameter
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
                    if (parameter.parameters.includes(watchableParameter.browseName)) {
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
         * @param {MappCockpitStateParameter} stateParameter
         * @returns
         * @memberof WatchablesWidget
         */
        WatchablesWidget.prototype.evaluateExpression = function (stateParameter) {
            var expression = stateParameter.expression;
            for (var i = 0; i < stateParameter.parameters.length; i++) {
                if (expression.includes(stateParameter.parameters[i])) {
                    var value = this.getParameterValue(stateParameter.parameters[i]);
                    expression = expression.replace(new RegExp(stateParameter.parameters[i], 'g'), value);
                }
            }
            return math.evaluate(expression);
        };
        /**
         * Gets actual value of watchableParameter
         *
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2F0Y2hhYmxlc1dpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy93YXRjaGFibGVzV2lkZ2V0L3dhdGNoYWJsZXNXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBYUEsdURBQXVEO0lBQ3ZELElBQU0sa0JBQWtCLEdBQUcsaUJBQWlCLENBQUM7SUFDN0MsSUFBTSxrQkFBa0IsR0FBRyxpQkFBaUIsQ0FBQztJQUM3Qzs7Ozs7T0FLRztJQUNIO1FBQStCLG9DQUFrQjtRQUFqRDtZQUFBLHFFQXdvQkM7WUF2b0JHLHNDQUFzQztZQUM5QiwwQkFBb0IsR0FBb0MsRUFBRSxDQUFDO1lBQ25FLDBFQUEwRTtZQUNsRSwrQkFBeUIsR0FBZ0MsRUFBRSxDQUFDO1lBQ3BFLCtEQUErRDtZQUN2RCwwQkFBb0IsR0FBRyxJQUFJLEtBQUssRUFBVSxDQUFDO1lBQ25ELDJDQUEyQztZQUNuQywyQkFBcUIsR0FBRyxFQUFFLENBQUM7WUFDbkMsd0NBQXdDO1lBQ2hDLG9CQUFjLEdBQVcsS0FBSyxDQUFDO1lBQ3ZDLGlFQUFpRTtZQUN6RCw0QkFBc0IsR0FBVSxHQUFHLENBQUM7WUFDNUMsd0NBQXdDO1lBQ2hDLDhCQUF3QixHQUFVLEdBQUcsQ0FBQztZQUM5QywwQ0FBMEM7WUFDbEMsNkJBQXVCLEdBQXFCLFNBQVMsQ0FBQztZQUM5RCx5Q0FBeUM7WUFDakMsMkJBQXFCLEdBQXFCLENBQUMsQ0FBQyxDQUFDOztRQXNuQnpELENBQUM7UUFsbkJHOzs7OztXQUtHO1FBQ0gscUNBQVUsR0FBVixVQUFXLGlCQUF5QjtZQUVoQyxpQkFBTSxVQUFVLFlBQUMsaUJBQWlCLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDeEMsaUJBQU0sZ0JBQWdCLFlBQUMsT0FBTyxDQUFDLENBQUM7WUFFaEMsOEJBQThCO1lBQ3BDLGlCQUFNLGdCQUFnQixZQUFDLENBQUMs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Li4vbGlicy91aS9UeXBlcy9lai53ZWIuYWxsLmQudHNcIiAvPlxyXG5pbXBvcnQgKiBhcyBtYXRoIGZyb20gXCIuLi8uLi9saWJzL21hdGgvbWF0aGpzXCI7XHJcbmltcG9ydCB7IERvbUhlbHBlciB9IGZyb20gXCIuLi9jb21tb24vZG9tSGVscGVyXCI7XHJcbmltcG9ydCB7IElXYXRjaGFibGVzV2lkZ2V0IH0gZnJvbSBcIi4vaW50ZXJmYWNlcy93YXRjaGFibGVzV2lkZ2V0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElVaUJpbmRpbmcgfSBmcm9tIFwiLi4vY29tbW9uL2ludGVyZmFjZXMvd2lkZ2V0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFdhdGNoYWJsZXNHcmlkVG9vbGJhciB9IGZyb20gXCIuL3dhdGNoYWJsZXNHcmlkVG9vbGJhclwiO1xyXG5pbXBvcnQgeyBUcmVlR3JpZFdpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL3RyZWVHcmlkV2lkZ2V0QmFzZVwiO1xyXG5cclxuaW1wb3J0IHsgUHJvcGVydHkgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL3Byb3BlcnR5XCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyLCBNYXBwQ29ja3BpdFN0YXRlUGFyYW1ldGVyIH0gZnJvbSBcIi4uLy4uL21vZGVscy9vbmxpbmUvbWFwcENvY2twaXRDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgV2F0Y2hhYmxlVmFsdWVUcmVuZEJ1ZmZlciB9IGZyb20gXCIuL3dhdGNoYWJsZVZhbHVlQnVmZmVyXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2ludGVyZmFjZXMvb2JzZXJ2ZXJcIjtcclxuXHJcbi8vIGRlZmluZXMgdGhlIGJhc2UgaWQgZm9yIHRoZSB3YXRjaGFibGUgdmFsdWUgdGVtcGxhdGVcclxuY29uc3QgV0FUQ0hBQkxFX1ZBTFVFX0lEID0gXCJ3YXRjaGFibGVWYWx1ZV9cIjtcclxuY29uc3QgV0FUQ0hBQkxFX1RSRU5EX0lEID0gXCJ3YXRjaGFibGVUcmVuZF9cIjtcclxuLyoqXHJcbiAqIGltcGxlbWVudHMgdGhlIHdpZGdldCBmb3IgZGlzcGxheWluZyB0aGUgd2F0Y2hhYmxlcyBhbmQgdGhlaXIgdmFsdWVzIHdpdGggZmFzdCB1cGRhdGUuIEl0IGluY2x1ZGVzIGRpc3BsYXlpbmcgYSBzaG9ydCB2YWx1ZSB0cmVuZC5cclxuICpcclxuICogQGNsYXNzIFdhdGNoYWJsZXNXaWRnZXRcclxuICogQGV4dGVuZHMge1RyZWVHcmlkV2lkZ2V0QmFzZX1cclxuICovXHJcbmNsYXNzIFdhdGNoYWJsZXNXaWRnZXQgZXh0ZW5kcyBUcmVlR3JpZFdpZGdldEJhc2UgaW1wbGVtZW50cyBJV2F0Y2hhYmxlc1dpZGdldCB7XHJcbiAgICAvLyBob2xkcyBhIGxpc3Qgb2YgcGFyYW1ldGVycyB0byB3YXRjaFxyXG4gICAgcHJpdmF0ZSBfd2F0Y2hhYmxlUGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSA9IFtdO1xyXG4gICAgLy8gaG9sZHMgYSBsaXN0IG9mIHdhdGNoYWJsZSBwYXJhbWV0ZXJzIHRoYXQgdXNlIGFuIGljb24gdG8gc2hvdyBpdHMgc3RhdGVcclxuICAgIHByaXZhdGUgX3dhdGNoYWJsZVN0YXRlUGFyYW1ldGVyczogTWFwcENvY2twaXRTdGF0ZVBhcmFtZXRlcltdID0gW107XHJcbiAgICAvLyBob2xkcyBhIGxpc3Qgb2YgcGFyYW1ldGVycyB0aGF0IGNoYW5nZSB3YXRjaGFibGUgc3RhdGUgaWNvbnNcclxuICAgIHByaXZhdGUgX3N0YXRlUGFyYW1ldGVyc05hbWUgPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xyXG4gICAgLy8gaG9sZHMgYSB0cmVuZCBidWZmZXIgZm9yIGV2ZXJ5IHBhcmFtZXRlclxyXG4gICAgcHJpdmF0ZSBfd2F0Y2hhYmxlVHJlbmRWYWx1ZXMgPSB7fTtcclxuICAgIC8vIHNwZWNpZmllcyB0aGUgdGltZSBzcGFuIG9mIHRoZSB0cmVuZC5cclxuICAgIHByaXZhdGUgX3RyZW5kVGltZVNwYW46IG51bWJlciA9IDYwMDAwO1xyXG4gICAgLy8gc3BlY2lmaWVzIHRoZSBwZXJpb2QgZm9yIHNhbXBsaW5nIHRoZSBwYXJhbWV0ZXIgdmFsdWVzIChtc2VjcylcclxuICAgIHByaXZhdGUgX3RyZW5kU2FtcGxpbmdJbnRlcnZhbDpudW1iZXIgPSAxMDA7XHJcbiAgICAvLyBzcGVjaWZpZXMgdGhlIHVpIHJlZnJlc2ggcmF0ZSAobXNlY3MpXHJcbiAgICBwcml2YXRlIF90cmVuZFJlZnJlc2hpbmdJbnRlcnZhbDpudW1iZXIgPSA1MDA7XHJcbiAgICAvLyBob2xkcyB0aGUgdGltZXIgaWQgZm9yIHRoZSBzYW1wbGUgdGltZXJcclxuICAgIHByaXZhdGUgX3dhdGNoYWJsZVNhbXBsZVRpbWVySWQ6IG51bWJlcnx1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICAvLyBob2xkcyB0aGUgdGltZXIgaWQgZm9yIHRoZSB0cmVuZCB0aW1lclxyXG4gICAgcHJpdmF0ZSBfd2F0Y2hhYmxUcmVuZFRpbWVySWQ6IG51bWJlcnx1bmRlZmluZWQgPSAtMTtcclxuXHJcbiAgICBwcml2YXRlIF90b29sYmFyITogV2F0Y2hhYmxlc0dyaWRUb29sYmFyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogaW5pdGlhbGl6ZSB0aGUgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxheW91dENvbnRhaW5lcklkXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBpbml0aWFsaXplKGxheW91dENvbnRhaW5lcklkOiBzdHJpbmcpIHtcclxuXHJcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZShsYXlvdXRDb250YWluZXJJZCwgMzApO1xyXG4gICAgICAgIHN1cGVyLnNldEhlYWRlckNvbnRlbnQoXCJXYXRjaFwiKTtcclxuXHJcbiAgICAgICAgLy8gU2V0IGR5bmFtaWMgY29sdW1uIHNldHRpbmdzXHJcblx0XHRzdXBlci5zZXREeW5hbWljQ29sdW1uKDMsIDEwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZUNvbXBvbmVudCgpe1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmRpc2FibGVQZXJzaXN0aW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSB3YXRjaGFibGUgcGFyYW1ldGVycyBhcyB0aGUgZGF0YSBzb3VyY2UgZm9yIHRoZSB3YXRjaGFibGVzIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgd2F0Y2hhYmxlUGFyYW1ldGVycyh3YXRjaGFibGVQYXJhbWV0ZXJzUGFyYW1ldGVyc0xpbms6IFByb3BlcnR5PEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPj4pIHtcclxuICAgICAgICB0aGlzLl93YXRjaGFibGVQYXJhbWV0ZXJzID0gd2F0Y2hhYmxlUGFyYW1ldGVyc1BhcmFtZXRlcnNMaW5rLnZhbHVlO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fd2F0Y2hhYmxlUGFyYW1ldGVycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25Db21wb25lbnRQYXJhbWV0ZXJzVXBkYXRlZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHdhdGNoYWJsZVN0YXRlUGFyYW1ldGVycyh3YXRjaGFibGVTdGF0ZVBhcmFtZXRlcnM6IEFycmF5PE1hcHBDb2NrcGl0U3RhdGVQYXJhbWV0ZXI+KSB7XHJcbiAgICAgICAgdGhpcy5fd2F0Y2hhYmxlU3RhdGVQYXJhbWV0ZXJzID0gd2F0Y2hhYmxlU3RhdGVQYXJhbWV0ZXJzO1xyXG4gICAgICAgIHRoaXMuX3dhdGNoYWJsZVN0YXRlUGFyYW1ldGVycy5mb3JFYWNoKChzdGF0ZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc3RhdGUucGFyYW1ldGVycyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RhdGUucGFyYW1ldGVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5fc3RhdGVQYXJhbWV0ZXJzTmFtZS5pbmNsdWRlcyhzdGF0ZS5wYXJhbWV0ZXJzW2ldKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdGF0ZVBhcmFtZXRlcnNOYW1lLnB1c2goc3RhdGUucGFyYW1ldGVyc1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICBcclxuICAgICAgICB0aGlzLmFkZFRyZWVHcmlkSWNvbnMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb21wb25lbnQgcGFyYW1ldGVycyBoYXZlIGJlZW4gdXBmYXRlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IHdhdGNoYWJsZVBhcmFtZXRlcnNcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25Db21wb25lbnRQYXJhbWV0ZXJzVXBkYXRlZCgpIHtcclxuICAgICAgICAvLyBjcmVhdGUgdHJlbmQgYnVmZmVycyBmb3IgdGhlIHBhcmFtZXRlcnNcclxuICAgICAgICB0aGlzLmNyZWF0ZVdhdGNoYWJsZVRyZW5kQnVmZmVycyh0aGlzLl93YXRjaGFibGVQYXJhbWV0ZXJzKTtcclxuICAgICAgICAvLyBzdGFydCB3YXRjaGFibGUgdHJlbmQgdGltZXJcclxuICAgICAgICB0aGlzLnN0YXJ0V2F0Y2hhYmxlc1RyZW5kKCk7XHJcbiAgICAgICAgLy8gcG9wdWxhdGUgdGhlIHdhdGNoYWJsZXMgd2lkZ2V0XHJcbiAgICAgICAgdGhpcy5wb3B1bGF0ZVdhdGNoYWJsZXNXaWRnZXQoKTtcclxuICAgICAgICAvLyB1cGRhdGUgc3R5bGUgZm9yIHRyZWVHcmlkIEljb25zXHJcbiAgICAgICAgdGhpcy51cGRhdGVUb29sYmFySWNvbnMoKVxyXG4gICAgICAgIC8vIGFmdGVyIHBvcHVsYXRpbmcgdGhlIHdhdGNoYWJsZXMgd2Ugc3RhcnQgb2JzZXJ2aW5nIHZhbHVlIGNoYW5nZXMgb2YgdGhlIHdhdGNoYWJsZXNcclxuICAgICAgICB0aGlzLm9ic2VydmVXYXRjaGFibGVzKHRoaXMuX3dhdGNoYWJsZVBhcmFtZXRlcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RhcnRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHN0YXJ0V2F0Y2hhYmxlc1RyZW5kKCk6IGFueSB7XHJcbiAgICAgICAgdGhpcy5zdGFydFNhbXBsaW5nV2F0Y2hhYmxlcygpO1xyXG4gICAgICAgIHRoaXMuc3RhcnRSZWZyZXNoaW5nV2F0Y2hhYmxlc1RyZW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdGFydHMgc2FtcGxpbmcgdGhlIHdhdGNoYWJsZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGFydFNhbXBsaW5nV2F0Y2hhYmxlcygpIHtcclxuICAgICAgICBcclxuICAgICAgICAvLyBzdG9wIGFuIGV2ZW50dWFsbHkgcnVubmluZyB0aW1lciBiZWZvcmUgc3RhcnRpbmcgYSBuZXcgb25lXHJcbiAgICAgICAgdGhpcy5zdG9wU2FtcGxpbmdUaW1lcigpO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5fd2F0Y2hhYmxlU2FtcGxlVGltZXJJZCA9ICBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2FtcGxlV2F0Y2hhYmxlcyh0aGlzLl93YXRjaGFibGVQYXJhbWV0ZXJzKTtcclxuICAgICAgICB9LCB0aGlzLl90cmVuZFNhbXBsaW5nSW50ZXJ2YWwsdGhpcy5fd2F0Y2hhYmxlU2FtcGxlVGltZXJJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdG9wcyB0aGUgc2FtcGxpbmcgdGltZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdG9wU2FtcGxpbmdUaW1lcigpIHtcclxuICAgICAgICBpZiAodGhpcy5fd2F0Y2hhYmxlU2FtcGxlVGltZXJJZCkge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuX3dhdGNoYWJsZVNhbXBsZVRpbWVySWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFN0YXJ0cyByZWZyZXNoaW5nIHRoZSB3YXRjaGFibGVzIHRyZW5kXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhcnRSZWZyZXNoaW5nV2F0Y2hhYmxlc1RyZW5kKCkge1xyXG5cclxuICAgICAgICAvLyBzdG9wIGFuIGV2ZW50dWFsbHkgcnVubmluZyB0aW1lciBiZWZvcmUgc3RhcnRpbmcgYSBuZXcgb25lXHJcbiAgICAgICAgdGhpcy5zdG9wVHJlbmRUaW1lcigpO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5fd2F0Y2hhYmxUcmVuZFRpbWVySWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaFdhdGNoYWJsZXNUcmVuZCh0aGlzLl93YXRjaGFibGVQYXJhbWV0ZXJzKTtcclxuICAgICAgICB9LCB0aGlzLl90cmVuZFJlZnJlc2hpbmdJbnRlcnZhbCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdG9wcyB0aGUgdHJlbmQgdGltZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdG9wVHJlbmRUaW1lcigpIHtcclxuICAgICAgICBpZiAodGhpcy5fd2F0Y2hhYmxUcmVuZFRpbWVySWQpIHtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl93YXRjaGFibFRyZW5kVGltZXJJZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIHRyZW5kIGJ1ZmZlciBmb3IgZXZlcnkgd2F0Y2hhYmxlIHBhcmFtZXRlclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZVdhdGNoYWJsZVRyZW5kQnVmZmVycyh3YXRjaGFibGVQYXJhbWV0ZXJzOk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pIHtcclxuICAgICAgICB3YXRjaGFibGVQYXJhbWV0ZXJzLmZvckVhY2goKHdhdGNoYWJsZVBhcmFtZXRlcikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl93YXRjaGFibGVUcmVuZFZhbHVlc1t3YXRjaGFibGVQYXJhbWV0ZXIuYnJvd3NlTmFtZV0gPSBXYXRjaGFibGVWYWx1ZVRyZW5kQnVmZmVyLmNyZWF0ZTxhbnk+KHRoaXMuX3RyZW5kVGltZVNwYW4vdGhpcy5fdHJlbmRTYW1wbGluZ0ludGVydmFsKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogcmVzaXplcyB0aGUgd2F0Y2hhYmxlcyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gd2lkdGhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHJlc2l6ZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xyXG4gICAgICAgIHN1cGVyLnJlc2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgLy8gUmVmcmVzaCB3YXRjaGFibGUgdmFsdWVzIGFmdGVyIHJlc2l6ZSAodHJlZWdyaWQgc2V0cyB0aGUgZGF0YSB0byBcIjBcIiBhZnRlciByZXNpemUpXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoV2F0Y2hhYmxlc1ZhbHVlcyh0aGlzLl93YXRjaGFibGVQYXJhbWV0ZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogY3JlYXRlcyB0aGUgdHJlZSBncmlkIGZvciB0aGUgd2F0Y2hhYmxlcyBpbmZvcm1hdGlvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlVHJlZUdyaWQoKSB7XHJcbiAgICAgICAgKDxhbnk+JCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCkpLmVqVHJlZUdyaWQoe1xyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbigpLFxyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkQ29sdW1uUmVzaXplU3VwcG9ydCgpLFxyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkVG9vbGJhclN1cHBvcnQoKSxcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGFsbG93U2VsZWN0aW9uOiBmYWxzZSxcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNyZWF0ZTogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWRDcmVhdGVkKCksXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgY29sdW1uIGRlZmluaXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmVlR3JpZENvbHVtbkRlZmluaXRpb24oKToge317XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY29sdW1uczogW1xyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJkaXNwbGF5TmFtZVwiLCBoZWFkZXJUZXh0OiBcIk5hbWVcIiwgaXNQcmltYXJ5S2V5OiB0cnVlLCB3aWR0aDogXCIyMDBcIiB9LFxyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJkaXNwbGF5VmFsdWVcIiwgaGVhZGVyVGV4dDogXCJWYWx1ZVwiLCB3aWR0aDogXCIyMDBcIiwgaXNUZW1wbGF0ZUNvbHVtbjogdHJ1ZSwgdGVtcGxhdGU6IFwiPGRpdiBzdHlsZT0ncGFkZGluZy1sZWZ0OiAyMHB4JyBpZD0nXCIgKyB0aGlzLnBhcmVudENvbnRlbnRJZCArIFdBVENIQUJMRV9WQUxVRV9JRCArIFwie3s6dWlJZH19Jz4wPC9kaXY+XCIgfSxcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwiZW5naW5lZXJpbmdVbml0XCIsIGhlYWRlclRleHQ6IFwiVW5pdFwiLCB3aWR0aDogXCIxMDBcIiB9LFxyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJ3YXRjaGFibGVUcmVuZFwiLCBoZWFkZXJUZXh0OiBcIlRyZW5kXCIsIGlzVGVtcGxhdGVDb2x1bW46IHRydWUsIHRlbXBsYXRlOiBcIjxkaXYgaWQ9J1wiICsgdGhpcy5wYXJlbnRDb250ZW50SWQgKyBXQVRDSEFCTEVfVFJFTkRfSUQgKyBcInt7OnVpSWR9fSc+PC9kaXY+XCIgfSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJlZSBncmlkIGNvbHVtbiByZXNpemUgc2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmVlR3JpZENvbHVtblJlc2l6ZVN1cHBvcnQoKToge317XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYWxsb3dDb2x1bW5SZXNpemU6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbHVtblJlc2l6ZVNldHRpbmdzOiB7IGNvbHVtblJlc2l6ZU1vZGU6IGVqLlRyZWVHcmlkLkNvbHVtblJlc2l6ZU1vZGUuRml4ZWRDb2x1bW5zIH0sXHJcbiAgICAgICAgICAgIGNvbHVtblJlc2l6ZWQ6IChhcmdzKSA9PiB0aGlzLmNvbHVtblJlc2l6ZWQoYXJncyksXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCB0b29sYmFyIHNldHRpbmdzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VHJlZUdyaWRUb29sYmFyU3VwcG9ydCgpOiB7fXtcclxuICAgICAgICB0aGlzLl90b29sYmFyID0gbmV3IFdhdGNoYWJsZXNHcmlkVG9vbGJhcih0aGlzLmNzc1BhcmVudENvbnRlbnRJZCk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdG9vbGJhclNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICBzaG93VG9vbGJhcjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGN1c3RvbVRvb2xiYXJJdGVtczogdGhpcy5fdG9vbGJhci5nZXRDdXN0b21Ub29sYmFycygpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNvbHVtblJlc2l6ZWQoYXJncyl7XHJcbiAgICAgICAgc3VwZXIucmVzaXplRHluYW1pY0NvbHVtbihhcmdzLmNvbHVtbkluZGV4LCBhcmdzLm1vZGVsKTtcclxuICAgICAgICAvLyBSZWZyZXNoIHdhdGNoYWJsZSB2YWx1ZXMgYWZ0ZXIgcmVzaXplICh0cmVlZ3JpZCBzZXRzIHRoZSBkYXRhIHRvIFwiMFwiIGFmdGVyIHJlc2l6ZSlcclxuICAgICAgICB0aGlzLnJlZnJlc2hXYXRjaGFibGVzVmFsdWVzKHRoaXMuX3dhdGNoYWJsZVBhcmFtZXRlcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdHJlZUdyaWRDcmVhdGVkKCl7XHJcbiAgICAgICAgLy8gU2V0cyB0aGUgY3VzdG9tIHRvb2xiYXIgaWNvbnNcclxuICAgICAgICAgdGhpcy5fdG9vbGJhci5zZXRTdHlsZUZvclRvb2xiYXJJY29ucygpO1xyXG5cclxuICAgICAgICAvLyAvLyBkaXNhYmxlIGR1bW15IGJ1dHRvbiBhZnRlciBjcmVhdGlvblxyXG4gICAgICAgICB0aGlzLl90b29sYmFyLmRpc2FibGVEdW1teUJ1dHRvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYWRkVHJlZUdyaWRJY29ucygpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3dhdGNoYWJsZVN0YXRlUGFyYW1ldGVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLl90b29sYmFyLmFkZEljb24odGhpcy5fd2F0Y2hhYmxlU3RhdGVQYXJhbWV0ZXJzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVUb29sYmFySWNvbnMoKSB7XHJcbiAgICAgICAgdGhpcy5fdG9vbGJhci5oaWRlSWNvbignZW1wdHknKTtcclxuICAgICAgICB0aGlzLl90b29sYmFyLmRpc2FibGVJY29ucygpO1xyXG4gICAgICAgIHRoaXMuX3Rvb2xiYXIuYWRkRXZlbnRMaXN0ZW5lcnMoKTtcclxuICAgICAgICB0aGlzLl90b29sYmFyLnRvb2x0aXBFeHRlbnNpb24oKTtcclxuXHJcbiAgICAgICAgLy9Xb3JrYXJvdW5kOiB0b29sYmFyIGhlaWdodCBjaGFuZ2VzIHdoZW4gaXQgaXMgdXBkYXRlZCBhIHNlY29uZCB0aW1lLiBIZXJlIHdlIHNldCB0byB0aGUgc2l6ZSB3ZSB3YW50LlxyXG4gICAgICAgIGxldCAkdG9vbGJhciA9ICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQgKyAnX3Rvb2xiYXJJdGVtcycpO1xyXG4gICAgICAgICR0b29sYmFyWzBdLnN0eWxlLnNldFByb3BlcnR5KCdoZWlnaHQnLCczM3B4JywnaW1wb3J0YW50Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogbWFya3MgdGhlIHBhcmFtZXRlcnMgd2l0aCBhbiBpZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgdWkgXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSB3YXRjaGFibGVQYXJhbWV0ZXJzXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldFdhdGNoYWJsZXNVaUlkKHdhdGNoYWJsZVBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdhdGNoYWJsZVBhcmFtZXRlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3Qgd2F0Y2hhYmxlUGFyYW1ldGVyID0gd2F0Y2hhYmxlUGFyYW1ldGVyc1tpXTtcclxuICAgICAgICAgICAgKDxJVWlCaW5kaW5nPjxhbnk+d2F0Y2hhYmxlUGFyYW1ldGVyKS51aUlkID0gaTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQb3B1bGF0ZSB0aGUgd2lkZ2V0IHdpdGggaXRzIHNwZWNpZmljIGRhdGEgY29udGVudC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwb3B1bGF0ZVdhdGNoYWJsZXNXaWRnZXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZXRXYXRjaGFibGVzVWlJZCh0aGlzLl93YXRjaGFibGVQYXJhbWV0ZXJzKTtcclxuICAgICAgICAoPGFueT4kKHRoaXMuY3NzUGFyZW50Q29udGVudElkKSkuZWpUcmVlR3JpZCh7XHJcbiAgICAgICAgICAgIGRhdGFTb3VyY2U6IHRoaXMuX3dhdGNoYWJsZVBhcmFtZXRlcnMsXHJcbiAgICAgICAgICAgIHRvb2xiYXJTZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgY3VzdG9tVG9vbGJhckl0ZW1zOiB0aGlzLl90b29sYmFyLmdldEN1c3RvbVRvb2xiYXJzKClcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNhbXBsZXMgdGhlIHdhdGNoYWJsZSB2YWx1ZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSB3YXRjaGFibGVQYXJhbWV0ZXJzXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNhbXBsZVdhdGNoYWJsZXMod2F0Y2hhYmxlUGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSkge1xyXG5cclxuICAgICAgICB3YXRjaGFibGVQYXJhbWV0ZXJzLmZvckVhY2goKHdhdGNoYWJsZVBhcmFtZXRlcik9PntcclxuICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSB0cmVuZCBidWZmZXJcclxuICAgICAgICAgICAgdGhpcy5hZGRXYXRjaGFibGVUcmVuZFZhbHVlKHdhdGNoYWJsZVBhcmFtZXRlcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWZyZXNoZXMgdGhlIHdhdGNoYWJsZXMgdHJlbmQgZmllbGRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gd2F0Y2hhYmxlUGFyYW1ldGVyc1xyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWZyZXNoV2F0Y2hhYmxlc1RyZW5kKHdhdGNoYWJsZVBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pIHtcclxuICAgICAgICB3YXRjaGFibGVQYXJhbWV0ZXJzLmZvckVhY2goKHdhdGNoYWJsZVBhcmFtZXRlcikgPT4ge1xyXG4gICAgICAgICAgICBsZXQgd2F0Y2hhYmxlVHJlbmRFbGVtZW50ID0gdGhpcy5nZXRXYXRjaGFibGVUcmVuZEVsZW1lbnQod2F0Y2hhYmxlUGFyYW1ldGVyKTtcclxuICAgICAgICAgICAgaWYgKHdhdGNoYWJsZVRyZW5kRWxlbWVudCAmJiBEb21IZWxwZXIuaXNFbGVtZW50SW5WaWV3cG9ydCh3YXRjaGFibGVUcmVuZEVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgd2F0Y2hhYmxlVHJlbmRGaWVsZElkID0gXCIjXCIgKyB3YXRjaGFibGVUcmVuZEVsZW1lbnQuaWQ7XHJcbiAgICAgICAgICAgICAgICAvLyB1cGRhdGUgdGhlIHRyZW5kIGZpZWxkXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hXYXRjaGFibGVUcmVuZEZpZWxkKHdhdGNoYWJsZVBhcmFtZXRlcix3YXRjaGFibGVUcmVuZEZpZWxkSWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZWZyZXNoZXMgdGhlIGNvbnRlbnQgb2YgdGhlIHdhdGNoYWJsZSB2YWx1ZSBmaWVsZHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSB3YXRjaGFibGVQYXJhbWV0ZXJzXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlZnJlc2hXYXRjaGFibGVzVmFsdWVzKHdhdGNoYWJsZVBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pIHtcclxuXHJcbiAgICAgICAgd2F0Y2hhYmxlUGFyYW1ldGVycy5mb3JFYWNoKCh3YXRjaGFibGVQYXJhbWV0ZXIpPT57dGhpcy5yZWZyZXNoV2F0Y2hhYmxlVmFsdWVGaWVsZCh3YXRjaGFibGVQYXJhbWV0ZXIpfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIGFuIGVsZW1lbnQgY29ycmVzcG9uZGluZyB0byB0aGUgcGFyYW1ldGVyIHRvIGJlIHVzZWQgZm9yIGRpc3BsYXlpbmcgdGhlIHdhdGNoYWJsZSB2YWx1ZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyfSB3YXRjaGFibGVQYXJhbWV0ZXJcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFdhdGNoYWJsZVZhbHVlRWxlbWVudCh3YXRjaGFibGVQYXJhbWV0ZXI6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyKTogSFRNTEVsZW1lbnQgfCBudWxsIHtcclxuICAgICAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5wYXJlbnRDb250ZW50SWQgKyBXQVRDSEFCTEVfVkFMVUVfSUQgKyAoPElVaUJpbmRpbmc+PGFueT53YXRjaGFibGVQYXJhbWV0ZXIpLnVpSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBhbiBlbGVtZW50IGNvcnJlc3BvbmRpbmcgdG8gdGhlIHBhcmFtZXRlciB0byBiZSB1c2VkIGZvciBkaXNwbGF5aW5nIHRoZSB3YXRjaGFibGUgdHJlbmQgbGluZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyfSB3YXRjaGFibGVQYXJhbWV0ZXJcclxuICAgICAqIEByZXR1cm5zIHsoSFRNTEVsZW1lbnQgfCBudWxsKX1cclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0V2F0Y2hhYmxlVHJlbmRFbGVtZW50KHdhdGNoYWJsZVBhcmFtZXRlcjogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIpOiBIVE1MRWxlbWVudCB8IG51bGwge1xyXG4gICAgICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnBhcmVudENvbnRlbnRJZCArIFdBVENIQUJMRV9UUkVORF9JRCArICg8SVVpQmluZGluZz48YW55PndhdGNoYWJsZVBhcmFtZXRlcikudWlJZClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHVwZGF0ZXMgYSB3YXRjaGFibGUgZmllbGQgd2l0aCB0aGUgY3VycmVudCB2YWx1ZXMgb2YgdGhlIGNvcnJlc3BvbmRpZyBwYXJhbWV0ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcn0gd2F0Y2hhYmxlUGFyYW1ldGVyXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlZnJlc2hXYXRjaGFibGVWYWx1ZUZpZWxkKHdhdGNoYWJsZVBhcmFtZXRlcjogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIpIHtcclxuXHJcbiAgICAgICAgLy8gZ2V0IHRoZSBjb3JyZXNwb25kaW5nIHVpIGVsZW1lbnRcclxuICAgICAgICBsZXQgd2F0Y2hhYmxlVmFsdWVFbGVtZW50ID0gIHRoaXMuZ2V0V2F0Y2hhYmxlVmFsdWVFbGVtZW50KHdhdGNoYWJsZVBhcmFtZXRlcik7XHJcblxyXG4gICAgICAgIC8vIGxldCBtaW5WYWx1ZSA9IHRoaXMuX3dhdGNoYWJsZVRyZW5kVmFsdWVzW3dhdGNoYWJsZVBhcmFtZXRlci5icm93c2VOYW1lXS5fbWluVmFsdWU7XHJcbiAgICAgICAgLy8gbGV0IG1heFZhbHVlID0gdGhpcy5fd2F0Y2hhYmxlVHJlbmRWYWx1ZXNbd2F0Y2hhYmxlUGFyYW1ldGVyLmJyb3dzZU5hbWVdLl9tYXhWYWx1ZTtcclxuXHJcbiAgICAgICAgLy8gbGV0IHZhbHVlU3RyaW5nOiBzdHJpbmcgPSB3YXRjaGFibGVQYXJhbWV0ZXIuZGlzcGxheVZhbHVlLnRvU3RyaW5nKCkgKyBcIihcIiArIG1pblZhbHVlICsgXCItXCIgKyBtYXhWYWx1ZSArIFwiKVwiO1xyXG4gICAgICAgIGxldCB2YWx1ZVN0cmluZzogc3RyaW5nID0gd2F0Y2hhYmxlUGFyYW1ldGVyLmRpc3BsYXlWYWx1ZS50b1N0cmluZygpO1xyXG4gICAgICAgIGlmICh3YXRjaGFibGVWYWx1ZUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgd2F0Y2hhYmxlVmFsdWVFbGVtZW50LmlubmVyVGV4dCA9IHZhbHVlU3RyaW5nO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlZnJlc2hlcyB0aGUgdmlzaWJsZSB0cmVuZCBmaWxlZCBjb250ZW50XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcn0gd2F0Y2hhYmxlUGFyYW1ldGVyXHJcbiAgICAgKiBAcGFyYW0geyhIVE1MRWxlbWVudCB8IG51bGwpfSB3YXRjaGFibGVFbGVtZW50XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVTdHJpbmdcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcmVmcmVzaFdhdGNoYWJsZVRyZW5kRmllbGQod2F0Y2hhYmxlUGFyYW1ldGVyOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcix3YXRjaGFibGVUcmVuZEZpZWxkSWQ6c3RyaW5nICk6IGFueSB7XHJcblxyXG4gICAgICAgIGxldCB3YXRjaGFibGVUcmVuZERhdGEgPSB0aGlzLmdldFdhdGNoYWJsZVRyZW5kVmFsdWVzKHdhdGNoYWJsZVBhcmFtZXRlcik7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJXYXRjaGFibGVUcmVuZCh3YXRjaGFibGVUcmVuZEZpZWxkSWQsIHdhdGNoYWJsZVRyZW5kRGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXRzIHRoZSB0cmVuZCB2YWx1ZXMgZm9yIHRoZSB3YXRjaGFibGUgcGFyYW1ldGVyXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFdhdGNoYWJsZVRyZW5kVmFsdWVzKHdhdGNoYWJsZVBhcmFtZXRlcjogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIpOiBBcnJheTxhbnk+IHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgdHJlbmRWYWx1ZXMgPSBbXTtcclxuICAgICAgICBpZiAodGhpcy5fd2F0Y2hhYmxlVHJlbmRWYWx1ZXNbd2F0Y2hhYmxlUGFyYW1ldGVyLmJyb3dzZU5hbWVdKSB7XHJcbiAgICAgICAgICAgIHRyZW5kVmFsdWVzID0gdGhpcy5fd2F0Y2hhYmxlVHJlbmRWYWx1ZXNbd2F0Y2hhYmxlUGFyYW1ldGVyLmJyb3dzZU5hbWVdLnZhbHVlczsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRyZW5kVmFsdWVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmVuZGVycyBhIHNob3J0IGhpc3Rvcnkgb2YgdHJlbmRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB3YXRjaGFibGVUcmVuZEZpZWxkSWRcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyW119IHdhdGNoYWJsZVRyZW5kRGF0YVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVuZGVyV2F0Y2hhYmxlVHJlbmQod2F0Y2hhYmxlVHJlbmRGaWVsZElkOiBzdHJpbmcsIHdhdGNoYWJsZVRyZW5kRGF0YTogbnVtYmVyW10pIHtcclxuXHJcbiAgICAgICAgLy8gZ2V0IHRoZSB0cmVuZCBjZWxsXHJcbiAgICAgICAgbGV0ICR0cmVuZENlbGwgPSAkKHdhdGNoYWJsZVRyZW5kRmllbGRJZCk7XHJcbiAgICAgICAgbGV0ICRzcGFya0luc3RhbmNlID0gJCh3YXRjaGFibGVUcmVuZEZpZWxkSWQgKyBcIl9zcGFya2xpbmVfc3ZnXCIpO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgYSBuZXcgc3BhcmtsaW5lIGluc3RhbmNlIGlmIG5vdCBhbHJlYWR5IGV4aXN0aW5nXHJcbiAgICAgICAgaWYgKCRzcGFya0luc3RhbmNlLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVdhdGNoYWJsZVRyZW5kVmlldygkdHJlbmRDZWxsLCB3YXRjaGFibGVUcmVuZERhdGEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgdHJlbmRsaW5lIHdpdGggbmV3IGRhdGFcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVXYXRjaGFibGVUcmVuZFZpZXcoJHRyZW5kQ2VsbCwgd2F0Y2hhYmxlVHJlbmREYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB1cGRhdGVzIHRoZSB0cmVuZCB2aWV3IHdpdGggbmV3IGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtKUXVlcnk8SFRNTEVsZW1lbnQ+fSAkdHJlbmRDZWxsXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcltdfSB3YXRjaGFibGVUcmVuZERhdGFcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlV2F0Y2hhYmxlVHJlbmRWaWV3KCR0cmVuZENlbGw6IEpRdWVyeTxIVE1MRWxlbWVudD4sIHdhdGNoYWJsZVRyZW5kRGF0YTogbnVtYmVyW10pIHtcclxuICAgICAgICAkdHJlbmRDZWxsLmVqU3BhcmtsaW5lKHtcclxuICAgICAgICAgICAgZGF0YVNvdXJjZTogd2F0Y2hhYmxlVHJlbmREYXRhLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIGNyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgYSB3YXRjaGFibGUgdHJlbmQgdmlld1xyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SlF1ZXJ5PEhUTUxFbGVtZW50Pn0ganF0cmVuZENlbGxcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyW119IHdhdGNoYWJsZVRyZW5kRGF0YVxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVXYXRjaGFibGVUcmVuZFZpZXcoJHRyZW5kQ2VsbDogSlF1ZXJ5PEhUTUxFbGVtZW50Piwgd2F0Y2hhYmxlVHJlbmREYXRhOiBudW1iZXJbXSkge1xyXG4gICAgICAgICR0cmVuZENlbGwuZWpTcGFya2xpbmUoe1xyXG4gICAgICAgICAgICBkYXRhU291cmNlOiB3YXRjaGFibGVUcmVuZERhdGEsXHJcbiAgICAgICAgICAgIHdpZHRoOiAyLFxyXG4gICAgICAgICAgICBzdHJva2U6IFwiI0M0QzRDNFwiLCAgIFxyXG4gICAgICAgICAgICB0eXBlOiBcImxpbmVcIixcclxuICAgICAgICAgICAgc2l6ZTogeyBoZWlnaHQ6IDI4LCB3aWR0aDogJHRyZW5kQ2VsbC53aWR0aCgpIH0sXHJcbiAgICAgICAgICAgIGlzUmVzcG9uc2l2ZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDIsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPYnNlcnZlcyB0aGUgd2F0Y2hhYmxlcyBmb3IgY2hhbmdlc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gd2F0Y2hhYmxlUGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBvYnNlcnZlV2F0Y2hhYmxlcyh3YXRjaGFibGVQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdKTogYW55IHtcclxuICAgICAgICAvLyBpbnZva2Ugb2JzZXJ2aW5nIHRoZSB3YXRjaGFibGVzXHJcbiAgICAgICAgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIub2JzZXJ2ZVBhcmFtZXRlclZhbHVlQ2hhbmdlcyh0aGlzLHdhdGNoYWJsZVBhcmFtZXRlcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY2FsbGVkIGFmdGVyIGNoYW5nZXMgb2Ygb2JzZXJ2YWJsZXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09ic2VydmFibGVbXX0gY2hhbmdlZE9ic2VydmFibGVzXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBvbk9ic2VydmFibGVzQ2hhbmdlZChjaGFuZ2VkT2JzZXJ2YWJsZXM6IE9ic2VydmFibGVbXSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwib25PYnNlcnZhYmxlc0NoYW5nZWQ6ICVvICVvXCIsdGhpcyxjaGFuZ2VkT2JzZXJ2YWJsZXMpO1xyXG4gICAgICAgIGNoYW5nZWRPYnNlcnZhYmxlcy5mb3JFYWNoKChvYnNlcnZhYmxlKT0+e1xyXG4gICAgICAgICAgICBpZiAob2JzZXJ2YWJsZS5wcm9wZXJ0eSA9PT0gXCJWYWx1ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgd2F0Y2hhYmxlUGFyYW1ldGVyOk1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyID0gb2JzZXJ2YWJsZS5vYmplY3QgYXMgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uV2F0Y2hhYmxlVmFsdWVDaGFuZ2VkKHdhdGNoYWJsZVBhcmFtZXRlcik7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPYnNlcnZlcyB0aGUgd2F0Y2hhYmxlIHBhcmFtZXRlcnMgZm9yIGNoYW5nZXMgYW5kIHVwZGF0ZXMgdGhlIGNvcnJlc3BvbmRpbmcgZmllbGRzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSB3YXRjaGFibGVQYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGF0dGFjaFdhdGNoYWJsZUNoYW5nZUxpc3RlbmVyKHdhdGNoYWJsZVBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pOiBhbnkge1xyXG4gICAgICAgIHdhdGNoYWJsZVBhcmFtZXRlcnMuZm9yRWFjaCgod2F0Y2hhYmxlUGFyYW1ldGVyKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIGxpc3RlbiB0byB2YWx1ZSBjaGFuZ2VzIC4uLi4uLlxyXG4gICAgICAgICAgICB3YXRjaGFibGVQYXJhbWV0ZXIudmFsdWVTb3VyY2UuY2hhbmdlZCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uV2F0Y2hhYmxlVmFsdWVDaGFuZ2VkKHdhdGNoYWJsZVBhcmFtZXRlcik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGVzIHRoZSB2YWx1ZSBjaGFuZ2Ugb2YgYSB3YXRjaGFibGUgcGFyYW1ldGVyXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJ9IHdhdGNoYWJsZVBhcmFtZXRlclxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbldhdGNoYWJsZVZhbHVlQ2hhbmdlZCh3YXRjaGFibGVQYXJhbWV0ZXI6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyKSB7XHJcbiAgICAgICAgLy8gcmVmcmVzaCB0aGUgdmFsdWUgZmllbGQuXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoV2F0Y2hhYmxlVmFsdWVGaWVsZCh3YXRjaGFibGVQYXJhbWV0ZXIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHJlZnJlc2ggd2F0Y2hhYmxlIGljb24gd2hlbiBpdHMgY29ubmVjdGVkIHBhcmFtZXRlciBpcyBjaGFuZ2VkXHJcbiAgICAgICAgaWYgKHRoaXMuX3N0YXRlUGFyYW1ldGVyc05hbWUuaW5jbHVkZXMod2F0Y2hhYmxlUGFyYW1ldGVyLmJyb3dzZU5hbWUpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3dhdGNoYWJsZVN0YXRlUGFyYW1ldGVycy5mb3JFYWNoKChwYXJhbWV0ZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChwYXJhbWV0ZXIucGFyYW1ldGVycy5pbmNsdWRlcyh3YXRjaGFibGVQYXJhbWV0ZXIuYnJvd3NlTmFtZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uV2F0Y2hhYmxlU3RhdGVWYWx1ZUNoYW5nZWQocGFyYW1ldGVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB3YXRjaGFibGUgaWNvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdFN0YXRlUGFyYW1ldGVyfSBzdGF0ZVBhcmFtZXRlclxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbldhdGNoYWJsZVN0YXRlVmFsdWVDaGFuZ2VkKHN0YXRlUGFyYW1ldGVyOiBNYXBwQ29ja3BpdFN0YXRlUGFyYW1ldGVyKSB7XHJcbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5ldmFsdWF0ZUV4cHJlc3Npb24oc3RhdGVQYXJhbWV0ZXIpO1xyXG4gICAgICAgIHRoaXMuX3Rvb2xiYXIudXBkYXRlSWNvbnMoc3RhdGVQYXJhbWV0ZXIubmFtZSwgc3RhdGVQYXJhbWV0ZXIuaWNvblt2YWx1ZV1bXCJJbWFnZU5hbWVcIl0sIHN0YXRlUGFyYW1ldGVyLmljb25bdmFsdWVdW1wiVG9vbHRpcFwiXSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFdmFsdWF0ZSBleHByZXNzaW9uIGFuZCBnZXQgaXRzIHZhbHVlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdFN0YXRlUGFyYW1ldGVyfSBzdGF0ZVBhcmFtZXRlclxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGV2YWx1YXRlRXhwcmVzc2lvbihzdGF0ZVBhcmFtZXRlcjogTWFwcENvY2twaXRTdGF0ZVBhcmFtZXRlcik6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IGV4cHJlc3Npb24gPSBzdGF0ZVBhcmFtZXRlci5leHByZXNzaW9uO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RhdGVQYXJhbWV0ZXIucGFyYW1ldGVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZXhwcmVzc2lvbi5pbmNsdWRlcyhzdGF0ZVBhcmFtZXRlci5wYXJhbWV0ZXJzW2ldKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5nZXRQYXJhbWV0ZXJWYWx1ZShzdGF0ZVBhcmFtZXRlci5wYXJhbWV0ZXJzW2ldKTtcclxuICAgICAgICAgICAgICAgIGV4cHJlc3Npb24gPSBleHByZXNzaW9uLnJlcGxhY2UobmV3IFJlZ0V4cChzdGF0ZVBhcmFtZXRlci5wYXJhbWV0ZXJzW2ldLCAnZycpLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBtYXRoLmV2YWx1YXRlKGV4cHJlc3Npb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBhY3R1YWwgdmFsdWUgb2Ygd2F0Y2hhYmxlUGFyYW1ldGVyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBnZXRQYXJhbWV0ZXJWYWx1ZShuYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCB2YWx1ZTtcclxuICAgICAgICB0aGlzLl93YXRjaGFibGVQYXJhbWV0ZXJzLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50LmJyb3dzZU5hbWUgPT09IG5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gZWxlbWVudC52YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIG5ldyB2YWx1ZSB0byB0aGUgcGFyYW1ldGVycyB0cmVuZCBidWZmZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcn0gd2F0Y2hhYmxlUGFyYW1ldGVyXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZFdhdGNoYWJsZVRyZW5kVmFsdWUod2F0Y2hhYmxlUGFyYW1ldGVyOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcikge1xyXG4gICAgICAgIC8vIGZpbHRlciBudW1iZXJzIGFuZCBib29sZWFuIHZhbHVlcyB0byBiZSByZWNvcmRlZFxyXG4gICAgICAgIGlmICh0eXBlb2Ygd2F0Y2hhYmxlUGFyYW1ldGVyLnZhbHVlID09PSBcIm51bWJlclwiIHx8IHR5cGVvZiB3YXRjaGFibGVQYXJhbWV0ZXIudmFsdWUgPT09IFwiYm9vbGVhblwiKSB7XHJcbiAgICAgICAgICAgICg8V2F0Y2hhYmxlVmFsdWVUcmVuZEJ1ZmZlcj50aGlzLl93YXRjaGFibGVUcmVuZFZhbHVlc1t3YXRjaGFibGVQYXJhbWV0ZXIuYnJvd3NlTmFtZV0pLnB1c2goPG51bWJlcj53YXRjaGFibGVQYXJhbWV0ZXIudmFsdWUpOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGFjdGl2YXRlcyBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFjdGl2YXRlKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJXYXRjaGFibGVzV2lkZ2V0IGFjdGl2YXRlZFwiKTtcclxuICAgICAgICBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlci5hY3RpdmF0ZUNvbXBvbmVudE1vZGVsSXRlbXModGhpcyx0aGlzLl93YXRjaGFibGVQYXJhbWV0ZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGRlYWN0aXZhdGVzIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGVhY3RpdmF0ZSgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiV2F0Y2hhYmxlc1dpZGdldCBkZWFjdGl2YXRlZFwiKTtcclxuICAgICAgICBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlci5kZWFjdGl2YXRlQ29tcG9uZW50TW9kZWxJdGVtcyh0aGlzLHRoaXMuX3dhdGNoYWJsZVBhcmFtZXRlcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZGlzcG9zZXMgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkaXNwb3NlKCl7XHJcbiAgICAgICAgdGhpcy5zdG9wU2FtcGxpbmdUaW1lcigpO1xyXG4gICAgICAgIHRoaXMuc3RvcFRyZW5kVGltZXIoKTtcclxuICAgICAgICBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlci51bm9ic2VydmVDb21wb25lbnRNb2RlbEl0ZW1zKHRoaXMsdGhpcy5fd2F0Y2hhYmxlUGFyYW1ldGVycyk7XHJcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBXYXRjaGFibGVzV2lkZ2V0IH07Il19