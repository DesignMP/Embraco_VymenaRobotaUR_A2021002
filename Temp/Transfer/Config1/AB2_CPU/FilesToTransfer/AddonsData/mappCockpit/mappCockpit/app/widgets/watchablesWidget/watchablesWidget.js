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
define(["require", "exports", "../common/domHelper", "./watchablesGridToolbar", "../common/treeGridWidgetBase", "../../models/online/mappCockpitComponent", "./watchableValueBuffer"], function (require, exports, domHelper_1, watchablesGridToolbar_1, treeGridWidgetBase_1, mappCockpitComponent_1, watchableValueBuffer_1) {
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
        Object.defineProperty(WatchablesWidget.prototype, "watchableParameters", {
            /**
             * Sets the watchable parameters as the data source for the watchables widget
             *
             * @memberof WatchablesWidget
             */
            set: function (watchableParametersParametersLink) {
                var watchableParameters = watchableParametersParametersLink.value;
                if (watchableParameters.length > 0) {
                    this.onComponentParametersUpdated(watchableParameters);
                }
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
        WatchablesWidget.prototype.onComponentParametersUpdated = function (watchableParameters) {
            this._watchableParameters = watchableParameters;
            // create trend buffers for the parameters
            this.createWatchableTrendBuffers(this._watchableParameters);
            // start watchable trend timer
            this.startWatchablesTrend();
            // populate the watchables widget
            this.populateWatchablesWidget();
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
            // disable dummy button after creation
            this._toolbar.disableDummyButton();
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
            // refresh the value field.
            this.refreshWatchableValueField(watchableParameter);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2F0Y2hhYmxlc1dpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy93YXRjaGFibGVzV2lkZ2V0L3dhdGNoYWJsZXNXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBWUEsdURBQXVEO0lBQ3ZELElBQU0sa0JBQWtCLEdBQUcsaUJBQWlCLENBQUM7SUFDN0MsSUFBTSxrQkFBa0IsR0FBRyxpQkFBaUIsQ0FBQztJQUM3Qzs7Ozs7T0FLRztJQUNIO1FBQStCLG9DQUFrQjtRQUFqRDtZQUFBLHFFQXFpQkM7WUFuaUJHLHNDQUFzQztZQUM5QiwwQkFBb0IsR0FBb0MsRUFBRSxDQUFDO1lBQ25FLDJDQUEyQztZQUNuQywyQkFBcUIsR0FBRyxFQUFFLENBQUM7WUFDbkMsd0NBQXdDO1lBQ2hDLG9CQUFjLEdBQVcsS0FBSyxDQUFDO1lBQ3ZDLGlFQUFpRTtZQUN6RCw0QkFBc0IsR0FBVSxHQUFHLENBQUM7WUFDNUMsd0NBQXdDO1lBQ2hDLDhCQUF3QixHQUFVLEdBQUcsQ0FBQztZQUM5QywwQ0FBMEM7WUFDbEMsNkJBQXVCLEdBQXFCLFNBQVMsQ0FBQztZQUM5RCx5Q0FBeUM7WUFDakMsMkJBQXFCLEdBQXFCLENBQUMsQ0FBQyxDQUFDOztRQXNoQnpELENBQUM7UUFsaEJHOzs7OztXQUtHO1FBQ0gscUNBQVUsR0FBVixVQUFXLGlCQUF5QjtZQUVoQyxpQkFBTSxVQUFVLFlBQUMsaUJBQWlCLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDeEMsaUJBQU0sZ0JBQWdCLFlBQUMsT0FBTyxDQUFDLENBQUM7WUFFaEMsOEJBQThCO1lBQ3BDLGlCQUFNLGdCQUFnQixZQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM3QixDQUFDO1FBT0Qsc0JBQVcsaURBQW1CO1lBTDlCOzs7O2VBSUc7aUJBQ0gsVUFBK0IsaUNBQWlGO2dCQUU1RyxJQUFJ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ZSBwYXRoPVwiLi4vLi4vbGlicy91aS9UeXBlcy9lai53ZWIuYWxsLmQudHNcIiAvPlxyXG5pbXBvcnQgeyBEb21IZWxwZXIgfSBmcm9tIFwiLi4vY29tbW9uL2RvbUhlbHBlclwiO1xyXG5pbXBvcnQgeyBJV2F0Y2hhYmxlc1dpZGdldCB9IGZyb20gXCIuL2ludGVyZmFjZXMvd2F0Y2hhYmxlc1dpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJVWlCaW5kaW5nIH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL3dpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBXYXRjaGFibGVzR3JpZFRvb2xiYXIgfSBmcm9tIFwiLi93YXRjaGFibGVzR3JpZFRvb2xiYXJcIjtcclxuaW1wb3J0IHsgVHJlZUdyaWRXaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi90cmVlR3JpZFdpZGdldEJhc2VcIjtcclxuXHJcbmltcG9ydCB7IFByb3BlcnR5IH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9wcm9wZXJ0eVwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFdhdGNoYWJsZVZhbHVlVHJlbmRCdWZmZXIgfSBmcm9tIFwiLi93YXRjaGFibGVWYWx1ZUJ1ZmZlclwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9pbnRlcmZhY2VzL29ic2VydmVyXCI7XHJcblxyXG4vLyBkZWZpbmVzIHRoZSBiYXNlIGlkIGZvciB0aGUgd2F0Y2hhYmxlIHZhbHVlIHRlbXBsYXRlXHJcbmNvbnN0IFdBVENIQUJMRV9WQUxVRV9JRCA9IFwid2F0Y2hhYmxlVmFsdWVfXCI7XHJcbmNvbnN0IFdBVENIQUJMRV9UUkVORF9JRCA9IFwid2F0Y2hhYmxlVHJlbmRfXCI7XHJcbi8qKlxyXG4gKiBpbXBsZW1lbnRzIHRoZSB3aWRnZXQgZm9yIGRpc3BsYXlpbmcgdGhlIHdhdGNoYWJsZXMgYW5kIHRoZWlyIHZhbHVlcyB3aXRoIGZhc3QgdXBkYXRlLiBJdCBpbmNsdWRlcyBkaXNwbGF5aW5nIGEgc2hvcnQgdmFsdWUgdHJlbmQuXHJcbiAqXHJcbiAqIEBjbGFzcyBXYXRjaGFibGVzV2lkZ2V0XHJcbiAqIEBleHRlbmRzIHtUcmVlR3JpZFdpZGdldEJhc2V9XHJcbiAqL1xyXG5jbGFzcyBXYXRjaGFibGVzV2lkZ2V0IGV4dGVuZHMgVHJlZUdyaWRXaWRnZXRCYXNlIGltcGxlbWVudHMgSVdhdGNoYWJsZXNXaWRnZXQge1xyXG5cclxuICAgIC8vIGhvbGRzIGEgbGlzdCBvZiBwYXJhbWV0ZXJzIHRvIHdhdGNoXHJcbiAgICBwcml2YXRlIF93YXRjaGFibGVQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdID0gW107XHJcbiAgICAvLyBob2xkcyBhIHRyZW5kIGJ1ZmZlciBmb3IgZXZlcnkgcGFyYW1ldGVyXHJcbiAgICBwcml2YXRlIF93YXRjaGFibGVUcmVuZFZhbHVlcyA9IHt9O1xyXG4gICAgLy8gc3BlY2lmaWVzIHRoZSB0aW1lIHNwYW4gb2YgdGhlIHRyZW5kLlxyXG4gICAgcHJpdmF0ZSBfdHJlbmRUaW1lU3BhbjogbnVtYmVyID0gNjAwMDA7XHJcbiAgICAvLyBzcGVjaWZpZXMgdGhlIHBlcmlvZCBmb3Igc2FtcGxpbmcgdGhlIHBhcmFtZXRlciB2YWx1ZXMgKG1zZWNzKVxyXG4gICAgcHJpdmF0ZSBfdHJlbmRTYW1wbGluZ0ludGVydmFsOm51bWJlciA9IDEwMDtcclxuICAgIC8vIHNwZWNpZmllcyB0aGUgdWkgcmVmcmVzaCByYXRlIChtc2VjcylcclxuICAgIHByaXZhdGUgX3RyZW5kUmVmcmVzaGluZ0ludGVydmFsOm51bWJlciA9IDUwMDtcclxuICAgIC8vIGhvbGRzIHRoZSB0aW1lciBpZCBmb3IgdGhlIHNhbXBsZSB0aW1lclxyXG4gICAgcHJpdmF0ZSBfd2F0Y2hhYmxlU2FtcGxlVGltZXJJZDogbnVtYmVyfHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuICAgIC8vIGhvbGRzIHRoZSB0aW1lciBpZCBmb3IgdGhlIHRyZW5kIHRpbWVyXHJcbiAgICBwcml2YXRlIF93YXRjaGFibFRyZW5kVGltZXJJZDogbnVtYmVyfHVuZGVmaW5lZCA9IC0xO1xyXG5cclxuICAgIHByaXZhdGUgX3Rvb2xiYXIhOiBXYXRjaGFibGVzR3JpZFRvb2xiYXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBpbml0aWFsaXplIHRoZSB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGF5b3V0Q29udGFpbmVySWRcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQ6IHN0cmluZykge1xyXG5cclxuICAgICAgICBzdXBlci5pbml0aWFsaXplKGxheW91dENvbnRhaW5lcklkLCAzMCk7XHJcbiAgICAgICAgc3VwZXIuc2V0SGVhZGVyQ29udGVudChcIldhdGNoXCIpO1xyXG5cclxuICAgICAgICAvLyBTZXQgZHluYW1pYyBjb2x1bW4gc2V0dGluZ3NcclxuXHRcdHN1cGVyLnNldER5bmFtaWNDb2x1bW4oMywgMTAwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHdhdGNoYWJsZSBwYXJhbWV0ZXJzIGFzIHRoZSBkYXRhIHNvdXJjZSBmb3IgdGhlIHdhdGNoYWJsZXMgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCB3YXRjaGFibGVQYXJhbWV0ZXJzKHdhdGNoYWJsZVBhcmFtZXRlcnNQYXJhbWV0ZXJzTGluazogUHJvcGVydHk8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+Pikge1xyXG5cclxuICAgICAgICBsZXQgd2F0Y2hhYmxlUGFyYW1ldGVycyA9IHdhdGNoYWJsZVBhcmFtZXRlcnNQYXJhbWV0ZXJzTGluay52YWx1ZTtcclxuXHJcbiAgICAgICAgaWYgKHdhdGNoYWJsZVBhcmFtZXRlcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLm9uQ29tcG9uZW50UGFyYW1ldGVyc1VwZGF0ZWQod2F0Y2hhYmxlUGFyYW1ldGVycyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbXBvbmVudCBwYXJhbWV0ZXJzIGhhdmUgYmVlbiB1cGZhdGVkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gd2F0Y2hhYmxlUGFyYW1ldGVyc1xyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbkNvbXBvbmVudFBhcmFtZXRlcnNVcGRhdGVkKHdhdGNoYWJsZVBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pIHtcclxuICAgICAgICB0aGlzLl93YXRjaGFibGVQYXJhbWV0ZXJzID0gd2F0Y2hhYmxlUGFyYW1ldGVycztcclxuICAgICAgICAvLyBjcmVhdGUgdHJlbmQgYnVmZmVycyBmb3IgdGhlIHBhcmFtZXRlcnNcclxuICAgICAgICB0aGlzLmNyZWF0ZVdhdGNoYWJsZVRyZW5kQnVmZmVycyh0aGlzLl93YXRjaGFibGVQYXJhbWV0ZXJzKTtcclxuICAgICAgICAvLyBzdGFydCB3YXRjaGFibGUgdHJlbmQgdGltZXJcclxuICAgICAgICB0aGlzLnN0YXJ0V2F0Y2hhYmxlc1RyZW5kKCk7XHJcbiAgICAgICAgLy8gcG9wdWxhdGUgdGhlIHdhdGNoYWJsZXMgd2lkZ2V0XHJcbiAgICAgICAgdGhpcy5wb3B1bGF0ZVdhdGNoYWJsZXNXaWRnZXQoKTtcclxuICAgICAgICAvLyBhZnRlciBwb3B1bGF0aW5nIHRoZSB3YXRjaGFibGVzIHdlIHN0YXJ0IG9ic2VydmluZyB2YWx1ZSBjaGFuZ2VzIG9mIHRoZSB3YXRjaGFibGVzXHJcbiAgICAgICAgdGhpcy5vYnNlcnZlV2F0Y2hhYmxlcyh0aGlzLl93YXRjaGFibGVQYXJhbWV0ZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFN0YXJ0XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBzdGFydFdhdGNoYWJsZXNUcmVuZCgpOiBhbnkge1xyXG4gICAgICAgIHRoaXMuc3RhcnRTYW1wbGluZ1dhdGNoYWJsZXMoKTtcclxuICAgICAgICB0aGlzLnN0YXJ0UmVmcmVzaGluZ1dhdGNoYWJsZXNUcmVuZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RhcnRzIHNhbXBsaW5nIHRoZSB3YXRjaGFibGVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhcnRTYW1wbGluZ1dhdGNoYWJsZXMoKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gc3RvcCBhbiBldmVudHVhbGx5IHJ1bm5pbmcgdGltZXIgYmVmb3JlIHN0YXJ0aW5nIGEgbmV3IG9uZVxyXG4gICAgICAgIHRoaXMuc3RvcFNhbXBsaW5nVGltZXIoKTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuX3dhdGNoYWJsZVNhbXBsZVRpbWVySWQgPSAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNhbXBsZVdhdGNoYWJsZXModGhpcy5fd2F0Y2hhYmxlUGFyYW1ldGVycyk7XHJcbiAgICAgICAgfSwgdGhpcy5fdHJlbmRTYW1wbGluZ0ludGVydmFsLHRoaXMuX3dhdGNoYWJsZVNhbXBsZVRpbWVySWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RvcHMgdGhlIHNhbXBsaW5nIHRpbWVyXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RvcFNhbXBsaW5nVGltZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3dhdGNoYWJsZVNhbXBsZVRpbWVySWQpIHtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl93YXRjaGFibGVTYW1wbGVUaW1lcklkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdGFydHMgcmVmcmVzaGluZyB0aGUgd2F0Y2hhYmxlcyB0cmVuZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXJ0UmVmcmVzaGluZ1dhdGNoYWJsZXNUcmVuZCgpIHtcclxuXHJcbiAgICAgICAgLy8gc3RvcCBhbiBldmVudHVhbGx5IHJ1bm5pbmcgdGltZXIgYmVmb3JlIHN0YXJ0aW5nIGEgbmV3IG9uZVxyXG4gICAgICAgIHRoaXMuc3RvcFRyZW5kVGltZXIoKTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuX3dhdGNoYWJsVHJlbmRUaW1lcklkID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hXYXRjaGFibGVzVHJlbmQodGhpcy5fd2F0Y2hhYmxlUGFyYW1ldGVycyk7XHJcbiAgICAgICAgfSwgdGhpcy5fdHJlbmRSZWZyZXNoaW5nSW50ZXJ2YWwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RvcHMgdGhlIHRyZW5kIHRpbWVyXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RvcFRyZW5kVGltZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3dhdGNoYWJsVHJlbmRUaW1lcklkKSB7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5fd2F0Y2hhYmxUcmVuZFRpbWVySWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSB0cmVuZCBidWZmZXIgZm9yIGV2ZXJ5IHdhdGNoYWJsZSBwYXJhbWV0ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVXYXRjaGFibGVUcmVuZEJ1ZmZlcnMod2F0Y2hhYmxlUGFyYW1ldGVyczpNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdKSB7XHJcbiAgICAgICAgd2F0Y2hhYmxlUGFyYW1ldGVycy5mb3JFYWNoKCh3YXRjaGFibGVQYXJhbWV0ZXIpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fd2F0Y2hhYmxlVHJlbmRWYWx1ZXNbd2F0Y2hhYmxlUGFyYW1ldGVyLmJyb3dzZU5hbWVdID0gV2F0Y2hhYmxlVmFsdWVUcmVuZEJ1ZmZlci5jcmVhdGU8YW55Pih0aGlzLl90cmVuZFRpbWVTcGFuL3RoaXMuX3RyZW5kU2FtcGxpbmdJbnRlcnZhbCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIHJlc2l6ZXMgdGhlIHdhdGNoYWJsZXMgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0XHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICByZXNpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHtcclxuICAgICAgICBzdXBlci5yZXNpemUod2lkdGgsIGhlaWdodCk7XHJcblxyXG4gICAgICAgIC8vIFJlZnJlc2ggd2F0Y2hhYmxlIHZhbHVlcyBhZnRlciByZXNpemUgKHRyZWVncmlkIHNldHMgdGhlIGRhdGEgdG8gXCIwXCIgYWZ0ZXIgcmVzaXplKVxyXG4gICAgICAgIHRoaXMucmVmcmVzaFdhdGNoYWJsZXNWYWx1ZXModGhpcy5fd2F0Y2hhYmxlUGFyYW1ldGVycyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGNyZWF0ZXMgdGhlIHRyZWUgZ3JpZCBmb3IgdGhlIHdhdGNoYWJsZXMgaW5mb3JtYXRpb25zXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZVRyZWVHcmlkKCkge1xyXG4gICAgICAgICg8YW55PiQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpKS5lalRyZWVHcmlkKHtcclxuICAgICAgICAgICAgLi4udGhpcy5nZXRUcmVlR3JpZENvbHVtbkRlZmluaXRpb24oKSxcclxuICAgICAgICAgICAgLi4udGhpcy5nZXRUcmVlR3JpZENvbHVtblJlc2l6ZVN1cHBvcnQoKSxcclxuICAgICAgICAgICAgLi4udGhpcy5nZXRUcmVlR3JpZFRvb2xiYXJTdXBwb3J0KCksXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBhbGxvd1NlbGVjdGlvbjogZmFsc2UsXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjcmVhdGU6IChhcmdzKSA9PiB0aGlzLnRyZWVHcmlkQ3JlYXRlZCgpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJlZSBncmlkIGNvbHVtbiBkZWZpbml0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCk6IHt9e1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNvbHVtbnM6IFtcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwiZGlzcGxheU5hbWVcIiwgaGVhZGVyVGV4dDogXCJOYW1lXCIsIGlzUHJpbWFyeUtleTogdHJ1ZSwgd2lkdGg6IFwiMjAwXCIgfSxcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwiZGlzcGxheVZhbHVlXCIsIGhlYWRlclRleHQ6IFwiVmFsdWVcIiwgd2lkdGg6IFwiMjAwXCIsIGlzVGVtcGxhdGVDb2x1bW46IHRydWUsIHRlbXBsYXRlOiBcIjxkaXYgc3R5bGU9J3BhZGRpbmctbGVmdDogMjBweCcgaWQ9J1wiICsgdGhpcy5wYXJlbnRDb250ZW50SWQgKyBXQVRDSEFCTEVfVkFMVUVfSUQgKyBcInt7OnVpSWR9fSc+MDwvZGl2PlwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcImVuZ2luZWVyaW5nVW5pdFwiLCBoZWFkZXJUZXh0OiBcIlVuaXRcIiwgd2lkdGg6IFwiMTAwXCIgfSxcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwid2F0Y2hhYmxlVHJlbmRcIiwgaGVhZGVyVGV4dDogXCJUcmVuZFwiLCBpc1RlbXBsYXRlQ29sdW1uOiB0cnVlLCB0ZW1wbGF0ZTogXCI8ZGl2IGlkPSdcIiArIHRoaXMucGFyZW50Q29udGVudElkICsgV0FUQ0hBQkxFX1RSRU5EX0lEICsgXCJ7ezp1aUlkfX0nPjwvZGl2PlwiIH0sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCBjb2x1bW4gcmVzaXplIHNldHRpbmdzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VHJlZUdyaWRDb2x1bW5SZXNpemVTdXBwb3J0KCk6IHt9e1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGFsbG93Q29sdW1uUmVzaXplOiB0cnVlLFxyXG4gICAgICAgICAgICBjb2x1bW5SZXNpemVTZXR0aW5nczogeyBjb2x1bW5SZXNpemVNb2RlOiBlai5UcmVlR3JpZC5Db2x1bW5SZXNpemVNb2RlLkZpeGVkQ29sdW1ucyB9LFxyXG4gICAgICAgICAgICBjb2x1bW5SZXNpemVkOiAoYXJncykgPT4gdGhpcy5jb2x1bW5SZXNpemVkKGFyZ3MpLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgdG9vbGJhciBzZXR0aW5nc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFRyZWVHcmlkVG9vbGJhclN1cHBvcnQoKToge317XHJcbiAgICAgICAgdGhpcy5fdG9vbGJhciA9IG5ldyBXYXRjaGFibGVzR3JpZFRvb2xiYXIodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRvb2xiYXJTZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgc2hvd1Rvb2xiYXI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjdXN0b21Ub29sYmFySXRlbXM6IHRoaXMuX3Rvb2xiYXIuZ2V0Q3VzdG9tVG9vbGJhcnMoKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjb2x1bW5SZXNpemVkKGFyZ3Mpe1xyXG4gICAgICAgIHN1cGVyLnJlc2l6ZUR5bmFtaWNDb2x1bW4oYXJncy5jb2x1bW5JbmRleCwgYXJncy5tb2RlbCk7XHJcbiAgICAgICAgLy8gUmVmcmVzaCB3YXRjaGFibGUgdmFsdWVzIGFmdGVyIHJlc2l6ZSAodHJlZWdyaWQgc2V0cyB0aGUgZGF0YSB0byBcIjBcIiBhZnRlciByZXNpemUpXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoV2F0Y2hhYmxlc1ZhbHVlcyh0aGlzLl93YXRjaGFibGVQYXJhbWV0ZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRyZWVHcmlkQ3JlYXRlZCgpe1xyXG4gICAgICAgIC8vIFNldHMgdGhlIGN1c3RvbSB0b29sYmFyIGljb25zXHJcbiAgICAgICAgdGhpcy5fdG9vbGJhci5zZXRTdHlsZUZvclRvb2xiYXJJY29ucygpO1xyXG5cclxuICAgICAgICAvLyBkaXNhYmxlIGR1bW15IGJ1dHRvbiBhZnRlciBjcmVhdGlvblxyXG4gICAgICAgIHRoaXMuX3Rvb2xiYXIuZGlzYWJsZUR1bW15QnV0dG9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogbWFya3MgdGhlIHBhcmFtZXRlcnMgd2l0aCBhbiBpZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgdWkgXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSB3YXRjaGFibGVQYXJhbWV0ZXJzXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldFdhdGNoYWJsZXNVaUlkKHdhdGNoYWJsZVBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdhdGNoYWJsZVBhcmFtZXRlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3Qgd2F0Y2hhYmxlUGFyYW1ldGVyID0gd2F0Y2hhYmxlUGFyYW1ldGVyc1tpXTtcclxuICAgICAgICAgICAgKDxJVWlCaW5kaW5nPjxhbnk+d2F0Y2hhYmxlUGFyYW1ldGVyKS51aUlkID0gaTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQb3B1bGF0ZSB0aGUgd2lkZ2V0IHdpdGggaXRzIHNwZWNpZmljIGRhdGEgY29udGVudC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwb3B1bGF0ZVdhdGNoYWJsZXNXaWRnZXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZXRXYXRjaGFibGVzVWlJZCh0aGlzLl93YXRjaGFibGVQYXJhbWV0ZXJzKTtcclxuICAgICAgICAoPGFueT4kKHRoaXMuY3NzUGFyZW50Q29udGVudElkKSkuZWpUcmVlR3JpZCh7XHJcbiAgICAgICAgICAgIGRhdGFTb3VyY2U6IHRoaXMuX3dhdGNoYWJsZVBhcmFtZXRlcnMsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTYW1wbGVzIHRoZSB3YXRjaGFibGUgdmFsdWVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gd2F0Y2hhYmxlUGFyYW1ldGVyc1xyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzYW1wbGVXYXRjaGFibGVzKHdhdGNoYWJsZVBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10pIHtcclxuXHJcbiAgICAgICAgd2F0Y2hhYmxlUGFyYW1ldGVycy5mb3JFYWNoKCh3YXRjaGFibGVQYXJhbWV0ZXIpPT57XHJcbiAgICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgdHJlbmQgYnVmZmVyXHJcbiAgICAgICAgICAgIHRoaXMuYWRkV2F0Y2hhYmxlVHJlbmRWYWx1ZSh3YXRjaGFibGVQYXJhbWV0ZXIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVmcmVzaGVzIHRoZSB3YXRjaGFibGVzIHRyZW5kIGZpZWxkc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IHdhdGNoYWJsZVBhcmFtZXRlcnNcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVmcmVzaFdhdGNoYWJsZXNUcmVuZCh3YXRjaGFibGVQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdKSB7XHJcbiAgICAgICAgd2F0Y2hhYmxlUGFyYW1ldGVycy5mb3JFYWNoKCh3YXRjaGFibGVQYXJhbWV0ZXIpID0+IHtcclxuICAgICAgICAgICAgbGV0IHdhdGNoYWJsZVRyZW5kRWxlbWVudCA9IHRoaXMuZ2V0V2F0Y2hhYmxlVHJlbmRFbGVtZW50KHdhdGNoYWJsZVBhcmFtZXRlcik7XHJcbiAgICAgICAgICAgIGlmICh3YXRjaGFibGVUcmVuZEVsZW1lbnQgJiYgRG9tSGVscGVyLmlzRWxlbWVudEluVmlld3BvcnQod2F0Y2hhYmxlVHJlbmRFbGVtZW50KSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHdhdGNoYWJsZVRyZW5kRmllbGRJZCA9IFwiI1wiICsgd2F0Y2hhYmxlVHJlbmRFbGVtZW50LmlkO1xyXG4gICAgICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSB0cmVuZCBmaWVsZFxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoV2F0Y2hhYmxlVHJlbmRGaWVsZCh3YXRjaGFibGVQYXJhbWV0ZXIsd2F0Y2hhYmxlVHJlbmRGaWVsZElkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmVmcmVzaGVzIHRoZSBjb250ZW50IG9mIHRoZSB3YXRjaGFibGUgdmFsdWUgZmllbGRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gd2F0Y2hhYmxlUGFyYW1ldGVyc1xyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWZyZXNoV2F0Y2hhYmxlc1ZhbHVlcyh3YXRjaGFibGVQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdKSB7XHJcblxyXG4gICAgICAgIHdhdGNoYWJsZVBhcmFtZXRlcnMuZm9yRWFjaCgod2F0Y2hhYmxlUGFyYW1ldGVyKT0+e3RoaXMucmVmcmVzaFdhdGNoYWJsZVZhbHVlRmllbGQod2F0Y2hhYmxlUGFyYW1ldGVyKX0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBhbiBlbGVtZW50IGNvcnJlc3BvbmRpbmcgdG8gdGhlIHBhcmFtZXRlciB0byBiZSB1c2VkIGZvciBkaXNwbGF5aW5nIHRoZSB3YXRjaGFibGUgdmFsdWVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcn0gd2F0Y2hhYmxlUGFyYW1ldGVyXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRXYXRjaGFibGVWYWx1ZUVsZW1lbnQod2F0Y2hhYmxlUGFyYW1ldGVyOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcik6IEhUTUxFbGVtZW50IHwgbnVsbCB7XHJcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMucGFyZW50Q29udGVudElkICsgV0FUQ0hBQkxFX1ZBTFVFX0lEICsgKDxJVWlCaW5kaW5nPjxhbnk+d2F0Y2hhYmxlUGFyYW1ldGVyKS51aUlkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgYW4gZWxlbWVudCBjb3JyZXNwb25kaW5nIHRvIHRoZSBwYXJhbWV0ZXIgdG8gYmUgdXNlZCBmb3IgZGlzcGxheWluZyB0aGUgd2F0Y2hhYmxlIHRyZW5kIGxpbmVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcn0gd2F0Y2hhYmxlUGFyYW1ldGVyXHJcbiAgICAgKiBAcmV0dXJucyB7KEhUTUxFbGVtZW50IHwgbnVsbCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFdhdGNoYWJsZVRyZW5kRWxlbWVudCh3YXRjaGFibGVQYXJhbWV0ZXI6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyKTogSFRNTEVsZW1lbnQgfCBudWxsIHtcclxuICAgICAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5wYXJlbnRDb250ZW50SWQgKyBXQVRDSEFCTEVfVFJFTkRfSUQgKyAoPElVaUJpbmRpbmc+PGFueT53YXRjaGFibGVQYXJhbWV0ZXIpLnVpSWQpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB1cGRhdGVzIGEgd2F0Y2hhYmxlIGZpZWxkIHdpdGggdGhlIGN1cnJlbnQgdmFsdWVzIG9mIHRoZSBjb3JyZXNwb25kaWcgcGFyYW1ldGVyXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJ9IHdhdGNoYWJsZVBhcmFtZXRlclxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWZyZXNoV2F0Y2hhYmxlVmFsdWVGaWVsZCh3YXRjaGFibGVQYXJhbWV0ZXI6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyKSB7XHJcblxyXG4gICAgICAgIC8vIGdldCB0aGUgY29ycmVzcG9uZGluZyB1aSBlbGVtZW50XHJcbiAgICAgICAgbGV0IHdhdGNoYWJsZVZhbHVlRWxlbWVudCA9ICB0aGlzLmdldFdhdGNoYWJsZVZhbHVlRWxlbWVudCh3YXRjaGFibGVQYXJhbWV0ZXIpO1xyXG5cclxuICAgICAgICAvLyBsZXQgbWluVmFsdWUgPSB0aGlzLl93YXRjaGFibGVUcmVuZFZhbHVlc1t3YXRjaGFibGVQYXJhbWV0ZXIuYnJvd3NlTmFtZV0uX21pblZhbHVlO1xyXG4gICAgICAgIC8vIGxldCBtYXhWYWx1ZSA9IHRoaXMuX3dhdGNoYWJsZVRyZW5kVmFsdWVzW3dhdGNoYWJsZVBhcmFtZXRlci5icm93c2VOYW1lXS5fbWF4VmFsdWU7XHJcblxyXG4gICAgICAgIC8vIGxldCB2YWx1ZVN0cmluZzogc3RyaW5nID0gd2F0Y2hhYmxlUGFyYW1ldGVyLmRpc3BsYXlWYWx1ZS50b1N0cmluZygpICsgXCIoXCIgKyBtaW5WYWx1ZSArIFwiLVwiICsgbWF4VmFsdWUgKyBcIilcIjtcclxuICAgICAgICBsZXQgdmFsdWVTdHJpbmc6IHN0cmluZyA9IHdhdGNoYWJsZVBhcmFtZXRlci5kaXNwbGF5VmFsdWUudG9TdHJpbmcoKTtcclxuICAgICAgICBpZiAod2F0Y2hhYmxlVmFsdWVFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHdhdGNoYWJsZVZhbHVlRWxlbWVudC5pbm5lclRleHQgPSB2YWx1ZVN0cmluZztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZWZyZXNoZXMgdGhlIHZpc2libGUgdHJlbmQgZmlsZWQgY29udGVudFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJ9IHdhdGNoYWJsZVBhcmFtZXRlclxyXG4gICAgICogQHBhcmFtIHsoSFRNTEVsZW1lbnQgfCBudWxsKX0gd2F0Y2hhYmxlRWxlbWVudFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlU3RyaW5nXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHJlZnJlc2hXYXRjaGFibGVUcmVuZEZpZWxkKHdhdGNoYWJsZVBhcmFtZXRlcjogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIsd2F0Y2hhYmxlVHJlbmRGaWVsZElkOnN0cmluZyApOiBhbnkge1xyXG5cclxuICAgICAgICBsZXQgd2F0Y2hhYmxlVHJlbmREYXRhID0gdGhpcy5nZXRXYXRjaGFibGVUcmVuZFZhbHVlcyh3YXRjaGFibGVQYXJhbWV0ZXIpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyV2F0Y2hhYmxlVHJlbmQod2F0Y2hhYmxlVHJlbmRGaWVsZElkLCB3YXRjaGFibGVUcmVuZERhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0cyB0aGUgdHJlbmQgdmFsdWVzIGZvciB0aGUgd2F0Y2hhYmxlIHBhcmFtZXRlclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRXYXRjaGFibGVUcmVuZFZhbHVlcyh3YXRjaGFibGVQYXJhbWV0ZXI6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyKTogQXJyYXk8YW55PiB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHRyZW5kVmFsdWVzID0gW107XHJcbiAgICAgICAgaWYgKHRoaXMuX3dhdGNoYWJsZVRyZW5kVmFsdWVzW3dhdGNoYWJsZVBhcmFtZXRlci5icm93c2VOYW1lXSkge1xyXG4gICAgICAgICAgICB0cmVuZFZhbHVlcyA9IHRoaXMuX3dhdGNoYWJsZVRyZW5kVmFsdWVzW3dhdGNoYWJsZVBhcmFtZXRlci5icm93c2VOYW1lXS52YWx1ZXM7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cmVuZFZhbHVlcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlbmRlcnMgYSBzaG9ydCBoaXN0b3J5IG9mIHRyZW5kc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gd2F0Y2hhYmxlVHJlbmRGaWVsZElkXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcltdfSB3YXRjaGFibGVUcmVuZERhdGFcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlbmRlcldhdGNoYWJsZVRyZW5kKHdhdGNoYWJsZVRyZW5kRmllbGRJZDogc3RyaW5nLCB3YXRjaGFibGVUcmVuZERhdGE6IG51bWJlcltdKSB7XHJcblxyXG4gICAgICAgIC8vIGdldCB0aGUgdHJlbmQgY2VsbFxyXG4gICAgICAgIGxldCAkdHJlbmRDZWxsID0gJCh3YXRjaGFibGVUcmVuZEZpZWxkSWQpO1xyXG4gICAgICAgIGxldCAkc3BhcmtJbnN0YW5jZSA9ICQod2F0Y2hhYmxlVHJlbmRGaWVsZElkICsgXCJfc3BhcmtsaW5lX3N2Z1wiKTtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIGEgbmV3IHNwYXJrbGluZSBpbnN0YW5jZSBpZiBub3QgYWxyZWFkeSBleGlzdGluZ1xyXG4gICAgICAgIGlmICgkc3BhcmtJbnN0YW5jZS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVXYXRjaGFibGVUcmVuZFZpZXcoJHRyZW5kQ2VsbCwgd2F0Y2hhYmxlVHJlbmREYXRhKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyB1cGRhdGUgdGhlIHRyZW5kbGluZSB3aXRoIG5ldyBkYXRhXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlV2F0Y2hhYmxlVHJlbmRWaWV3KCR0cmVuZENlbGwsIHdhdGNoYWJsZVRyZW5kRGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdXBkYXRlcyB0aGUgdHJlbmQgdmlldyB3aXRoIG5ldyBkYXRhXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SlF1ZXJ5PEhUTUxFbGVtZW50Pn0gJHRyZW5kQ2VsbFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJbXX0gd2F0Y2hhYmxlVHJlbmREYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZVdhdGNoYWJsZVRyZW5kVmlldygkdHJlbmRDZWxsOiBKUXVlcnk8SFRNTEVsZW1lbnQ+LCB3YXRjaGFibGVUcmVuZERhdGE6IG51bWJlcltdKSB7XHJcbiAgICAgICAgJHRyZW5kQ2VsbC5lalNwYXJrbGluZSh7XHJcbiAgICAgICAgICAgIGRhdGFTb3VyY2U6IHdhdGNoYWJsZVRyZW5kRGF0YSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBjcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIGEgd2F0Y2hhYmxlIHRyZW5kIHZpZXdcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0pRdWVyeTxIVE1MRWxlbWVudD59IGpxdHJlbmRDZWxsXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcltdfSB3YXRjaGFibGVUcmVuZERhdGFcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlV2F0Y2hhYmxlVHJlbmRWaWV3KCR0cmVuZENlbGw6IEpRdWVyeTxIVE1MRWxlbWVudD4sIHdhdGNoYWJsZVRyZW5kRGF0YTogbnVtYmVyW10pIHtcclxuICAgICAgICAkdHJlbmRDZWxsLmVqU3BhcmtsaW5lKHtcclxuICAgICAgICAgICAgZGF0YVNvdXJjZTogd2F0Y2hhYmxlVHJlbmREYXRhLFxyXG4gICAgICAgICAgICB3aWR0aDogMixcclxuICAgICAgICAgICAgc3Ryb2tlOiBcIiNDNEM0QzRcIiwgICBcclxuICAgICAgICAgICAgdHlwZTogXCJsaW5lXCIsXHJcbiAgICAgICAgICAgIHNpemU6IHsgaGVpZ2h0OiAyOCwgd2lkdGg6ICR0cmVuZENlbGwud2lkdGgoKSB9LFxyXG4gICAgICAgICAgICBpc1Jlc3BvbnNpdmU6IGZhbHNlLFxyXG4gICAgICAgICAgICBwYWRkaW5nOiAyLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT2JzZXJ2ZXMgdGhlIHdhdGNoYWJsZXMgZm9yIGNoYW5nZXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IHdhdGNoYWJsZVBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgb2JzZXJ2ZVdhdGNoYWJsZXMod2F0Y2hhYmxlUGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSk6IGFueSB7XHJcbiAgICAgICAgLy8gaW52b2tlIG9ic2VydmluZyB0aGUgd2F0Y2hhYmxlc1xyXG4gICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyLm9ic2VydmVQYXJhbWV0ZXJWYWx1ZUNoYW5nZXModGhpcyx3YXRjaGFibGVQYXJhbWV0ZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNhbGxlZCBhZnRlciBjaGFuZ2VzIG9mIG9ic2VydmFibGVzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYnNlcnZhYmxlW119IGNoYW5nZWRPYnNlcnZhYmxlc1xyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgb25PYnNlcnZhYmxlc0NoYW5nZWQoY2hhbmdlZE9ic2VydmFibGVzOiBPYnNlcnZhYmxlW10pIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIm9uT2JzZXJ2YWJsZXNDaGFuZ2VkOiAlbyAlb1wiLHRoaXMsY2hhbmdlZE9ic2VydmFibGVzKTtcclxuICAgICAgICBjaGFuZ2VkT2JzZXJ2YWJsZXMuZm9yRWFjaCgob2JzZXJ2YWJsZSk9PntcclxuICAgICAgICAgICAgaWYgKG9ic2VydmFibGUucHJvcGVydHkgPT09IFwiVmFsdWVcIikge1xyXG4gICAgICAgICAgICAgICAgbGV0IHdhdGNoYWJsZVBhcmFtZXRlcjpNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlciA9IG9ic2VydmFibGUub2JqZWN0IGFzIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbldhdGNoYWJsZVZhbHVlQ2hhbmdlZCh3YXRjaGFibGVQYXJhbWV0ZXIpOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT2JzZXJ2ZXMgdGhlIHdhdGNoYWJsZSBwYXJhbWV0ZXJzIGZvciBjaGFuZ2VzIGFuZCB1cGRhdGVzIHRoZSBjb3JyZXNwb25kaW5nIGZpZWxkc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gd2F0Y2hhYmxlUGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBhdHRhY2hXYXRjaGFibGVDaGFuZ2VMaXN0ZW5lcih3YXRjaGFibGVQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdKTogYW55IHtcclxuICAgICAgICB3YXRjaGFibGVQYXJhbWV0ZXJzLmZvckVhY2goKHdhdGNoYWJsZVBhcmFtZXRlcikgPT4ge1xyXG4gICAgICAgICAgICAvLyBsaXN0ZW4gdG8gdmFsdWUgY2hhbmdlcyAuLi4uLi5cclxuICAgICAgICAgICAgd2F0Y2hhYmxlUGFyYW1ldGVyLnZhbHVlU291cmNlLmNoYW5nZWQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbldhdGNoYWJsZVZhbHVlQ2hhbmdlZCh3YXRjaGFibGVQYXJhbWV0ZXIpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlcyB0aGUgdmFsdWUgY2hhbmdlIG9mIGEgd2F0Y2hhYmxlIHBhcmFtZXRlclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyfSB3YXRjaGFibGVQYXJhbWV0ZXJcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25XYXRjaGFibGVWYWx1ZUNoYW5nZWQod2F0Y2hhYmxlUGFyYW1ldGVyOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcikge1xyXG4gICAgICAgIC8vIHJlZnJlc2ggdGhlIHZhbHVlIGZpZWxkLlxyXG4gICAgICAgIHRoaXMucmVmcmVzaFdhdGNoYWJsZVZhbHVlRmllbGQod2F0Y2hhYmxlUGFyYW1ldGVyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBuZXcgdmFsdWUgdG8gdGhlIHBhcmFtZXRlcnMgdHJlbmQgYnVmZmVyXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJ9IHdhdGNoYWJsZVBhcmFtZXRlclxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRXYXRjaGFibGVUcmVuZFZhbHVlKHdhdGNoYWJsZVBhcmFtZXRlcjogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIpIHtcclxuICAgICAgICAvLyBmaWx0ZXIgbnVtYmVycyBhbmQgYm9vbGVhbiB2YWx1ZXMgdG8gYmUgcmVjb3JkZWRcclxuICAgICAgICBpZiAodHlwZW9mIHdhdGNoYWJsZVBhcmFtZXRlci52YWx1ZSA9PT0gXCJudW1iZXJcIiB8fCB0eXBlb2Ygd2F0Y2hhYmxlUGFyYW1ldGVyLnZhbHVlID09PSBcImJvb2xlYW5cIikge1xyXG4gICAgICAgICAgICAoPFdhdGNoYWJsZVZhbHVlVHJlbmRCdWZmZXI+dGhpcy5fd2F0Y2hhYmxlVHJlbmRWYWx1ZXNbd2F0Y2hhYmxlUGFyYW1ldGVyLmJyb3dzZU5hbWVdKS5wdXNoKDxudW1iZXI+d2F0Y2hhYmxlUGFyYW1ldGVyLnZhbHVlKTsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBhY3RpdmF0ZXMgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhY3RpdmF0ZSgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiV2F0Y2hhYmxlc1dpZGdldCBhY3RpdmF0ZWRcIik7XHJcbiAgICAgICAgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIuYWN0aXZhdGVDb21wb25lbnRNb2RlbEl0ZW1zKHRoaXMsdGhpcy5fd2F0Y2hhYmxlUGFyYW1ldGVycyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBkZWFjdGl2YXRlcyBXYXRjaGFibGVzV2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRlYWN0aXZhdGUoKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIldhdGNoYWJsZXNXaWRnZXQgZGVhY3RpdmF0ZWRcIik7XHJcbiAgICAgICAgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIuZGVhY3RpdmF0ZUNvbXBvbmVudE1vZGVsSXRlbXModGhpcyx0aGlzLl93YXRjaGFibGVQYXJhbWV0ZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGRpc3Bvc2VzIFdhdGNoYWJsZXNXaWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpe1xyXG4gICAgICAgIHRoaXMuc3RvcFNhbXBsaW5nVGltZXIoKTtcclxuICAgICAgICB0aGlzLnN0b3BUcmVuZFRpbWVyKCk7XHJcbiAgICAgICAgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIudW5vYnNlcnZlQ29tcG9uZW50TW9kZWxJdGVtcyh0aGlzLHRoaXMuX3dhdGNoYWJsZVBhcmFtZXRlcnMpO1xyXG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgV2F0Y2hhYmxlc1dpZGdldCB9OyJdfQ==