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
define(["require", "exports", "../common/widgetBase", "../../widgets/widgets", "../common/viewTypeProvider"], function (require, exports, widgetBase_1, Widgets, viewTypeProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * implements the TraceConfigurationWidget
     *
     * @class TraceConfigurationWidget
     * @extends {WidgetBase}
     */
    var TraceConfigurationWidget = /** @class */ (function (_super) {
        __extends(TraceConfigurationWidget, _super);
        function TraceConfigurationWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._layoutWidgetActivatedHandler = function (sender, args) { return _this.onLayoutContentActivated(sender, args); };
            return _this;
        }
        /* initialize the widget
         *
         * @param {string} layoutContainerId
         * @memberof TraceConfigurationWidget
         */
        TraceConfigurationWidget.prototype.initialize = function (layoutContainerId) {
            _super.prototype.initialize.call(this, layoutContainerId);
        };
        /**
         * Creates the layout of the widget
         *
         * @memberof TraceConfigurationWidget
         */
        TraceConfigurationWidget.prototype.createLayout = function () {
            this._layoutWidget = Widgets.SplitterWidget.create();
            this._layoutWidget.initialize(this.parentContentId);
            this._layoutWidget.eventWidgetActivated.attach(this._layoutWidgetActivatedHandler);
        };
        TraceConfigurationWidget.prototype.dispose = function () {
            this._layoutWidget.eventWidgetActivated.detach(this._layoutWidgetActivatedHandler);
            this._layoutWidget.dispose();
            _super.prototype.dispose.call(this);
        };
        /**
         * Creates the widget content and eventually subwidgets
         *
         * @memberof TraceConfigurationWidget
         */
        TraceConfigurationWidget.prototype.createWidgets = function () {
            this.createTraceConfigDatapointsWidget();
            this.createTraceConfigTimingWidget();
            this.createTraceConfigTriggerWidget();
            this.initializeLayout();
        };
        /**
         * creates the trace config datapoints widget
         *
         * @returns {*}
         * @memberof TraceConfigurationWidget
         */
        TraceConfigurationWidget.prototype.createTraceConfigDatapointsWidget = function () {
            this._traceConfigDataPointsWidget = Widgets.TraceConfigDatapointsWidget.create();
            this._layoutWidget.addWidget(this._traceConfigDataPointsWidget, "DataPoints", viewTypeProvider_1.ViewType.Default, -1);
        };
        /**
         * creates the trace config timing widget
         *
         * @returns {*}
         * @memberof TraceConfigurationWidget
         */
        TraceConfigurationWidget.prototype.createTraceConfigTimingWidget = function () {
            this._traceConfigTimingWidget = Widgets.TraceConfigTimingWidget.create();
            this._layoutWidget.addWidget(this._traceConfigTimingWidget, "Timings", viewTypeProvider_1.ViewType.Default, -1);
        };
        /**
         * creates the trace config trigger widget
         *
         * @returns {*}
         * @memberof TraceConfigurationWidget
         */
        TraceConfigurationWidget.prototype.createTraceConfigTriggerWidget = function () {
            this._traceConfigTriggerWidget = Widgets.TraceConfigTriggerWidget.create();
            this._layoutWidget.addWidget(this._traceConfigTriggerWidget, "Triggers", viewTypeProvider_1.ViewType.Default, -1);
        };
        /**
         * resizes the trace configuration widget
         *
         * @param {number} width
         * @param {number} height
         * @memberof TraceConfigurationWidget
         */
        TraceConfigurationWidget.prototype.resize = function (width, height) {
            this._actualWidth = width;
            this._actualHeight = height;
            if (this._layoutWidget != undefined) {
                this._layoutWidget.resize(width, height);
            }
        };
        /**
         * Raised after a layout content was activated
         *
         * @private
         * @param {*} sender
         * @param {*} args
         * @memberof TraceConfigurationWidget
         */
        TraceConfigurationWidget.prototype.onLayoutContentActivated = function (sender, args) {
            args.widget.activate();
            this.resize(this._actualWidth, this._actualHeight);
        };
        /**
         * Initializes the layout
         * Defines the sizes(and other settings) of the trace config panes => trace config datapoints/ trace config timing/ trace config start triggers
         *
         * @private
         * @memberof TraceConfigurationWidget
         */
        TraceConfigurationWidget.prototype.initializeLayout = function () {
            var keys = Object.keys(this._layoutWidget.layoutPanes);
            if (keys.length == 3) {
                // Set initial pane sizes and settings
                var key0 = keys[0];
                this._layoutWidget.layoutPanes[key0].size = 0;
                this._layoutWidget.layoutPanes[key0].fillSpace = true;
                this._layoutWidget.layoutPanes[key0].expandable = false;
                this._layoutWidget.layoutPanes[key0].collapsible = false;
                var key1 = keys[1];
                this._layoutWidget.layoutPanes[key1].size = 570;
                this._layoutWidget.layoutPanes[key1].expandable = false;
                this._layoutWidget.layoutPanes[key1].collapsible = false;
                var key2 = keys[2];
                this._layoutWidget.layoutPanes[key2].size = 500;
                this._layoutWidget.layoutPanes[key2].expandable = false;
                this._layoutWidget.layoutPanes[key2].collapsible = false;
                // Redraw the layout
                this._layoutWidget.recalculateLayout();
            }
            else {
                throw (new Error("this._layoutWidget.layoutPanes.length != 3"));
            }
        };
        Object.defineProperty(TraceConfigurationWidget.prototype, "traceParametersInterface", {
            /**
             * Sets the trace parameter interface to the trace configuration widget
             *
             * @memberof TraceConfigurationWidget
             */
            set: function (traceParameterInterface) {
                var _this = this;
                this._traceParameterInterface = traceParameterInterface;
                this._traceParameterInterface.changed(function (traceParameterInterface) {
                    try {
                        _this._traceConfigDataPointsWidget.dataPoints = traceParameterInterface.traceConfigurationData.dataPoints;
                        _this._traceConfigDataPointsWidget.availableDataPoints = traceParameterInterface.availableTraceDataPoints;
                    }
                    catch (error) {
                        console.log(error);
                    }
                    _this._traceConfigTimingWidget.timingParameters = traceParameterInterface.traceConfigurationData.timingParameters;
                    _this._traceConfigTriggerWidget.startTriggers = { data: traceParameterInterface.traceConfigurationData.startTriggers, info: traceParameterInterface.traceConfigurationInfo.startTriggerInfos };
                    _this._traceConfigTriggerWidget.availableDataPoints = traceParameterInterface.availableTraceDataPoints;
                });
            },
            enumerable: true,
            configurable: true
        });
        return TraceConfigurationWidget;
    }(widgetBase_1.WidgetBase));
    exports.TraceConfigurationWidget = TraceConfigurationWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VDb25maWd1cmF0aW9uV2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RyYWNlQ29uZmlndXJhdGlvbldpZGdldC90cmFjZUNvbmZpZ3VyYXRpb25XaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQU9BOzs7OztPQUtHO0lBQ0g7UUFBdUMsNENBQVU7UUFBakQ7WUFBQSxxRUEwS0M7WUFsS1csbUNBQTZCLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFHLE9BQUEsS0FBSSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsRUFBMUMsQ0FBMEMsQ0FBQzs7UUFrS3RHLENBQUM7UUFoS0c7Ozs7V0FJRztRQUNILDZDQUFVLEdBQVYsVUFBVyxpQkFBeUI7WUFDaEMsaUJBQU0sVUFBVSxZQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDeEMsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSCwrQ0FBWSxHQUFaO1lBQ0ksSUFBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3JELElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUNwRCxJQUFJLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUN2RixDQUFDO1FBRUQsMENBQU8sR0FBUDtZQUNJLElBQUksQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1lBQ25GLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDN0IsaUJBQU0sT0FBTyxXQUFFLENBQUM7UUFDcEIsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSCxnREFBYSxHQUFiO1lB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QUFDO3dCQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQ3RCO29CQUNELEtBQUksQ0FBQyx3QkFBd0IsQ0FBQyxnQkFBZ0IsR0FBRyx1QkFBdUIsQ0FBQyxzQkFBdUIsQ0FBQyxnQkFBZ0IsQ0FBQztvQkFFbEgsS0FBSSxDQUFDLHlCQUF5QixDQUFDLGFBQWEsR0FBSSxFQUFDLElBQUksRUFBRSx1QkFBdUIsQ0FBQyxzQkFBdUIsQ0FBQyxhQUFhLEVBQUUsSUFBSSxFQUFFLHVCQUF1QixDQUFDLHNCQUF1QixDQUFDLGlCQUFpQixFQUFDLENBQUM7b0JBQy9MLEtBQUksQ0FBQyx5QkFBeUIsQ0FBQyxtQkFBbUIsR0FBRyx1QkFBdUIsQ0FBQyx3QkFBd0IsQ0FBQztnQkFDMUcsQ0FBQyxDQUFDLENBQUE7WUFDTixDQUFDOzs7V0FBQTtRQUNMLCtCQUFDO0lBQUQsQ0FBQyxBQTFLRCxDQUF1Qyx1QkFBVSxHQTBLaEQ7SUFFUSw0REFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBXaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi93aWRnZXRCYXNlXCI7XHJcbmltcG9ydCB7IElUcmFjZUNvbmZpZ3VyYXRpb25XaWRnZXQgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL3RyYWNlQ29uZmlndXJhdGlvbldpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgKiBhcyBXaWRnZXRzIGZyb20gXCIuLi8uLi93aWRnZXRzL3dpZGdldHNcIjtcclxuaW1wb3J0IHsgUHJvcGVydHkgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL3Byb3BlcnR5XCI7XHJcbmltcG9ydCB7IElUcmFjZUNvbXBvbmVudFBhcmFtZXRlcnMgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2RpYWdub3N0aWNzL3RyYWNlL2ludGVyZmFjZXMvdHJhY2VDb21wb25lbnRQYXJhbWV0ZXJJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVmlld1R5cGUgfSBmcm9tIFwiLi4vY29tbW9uL3ZpZXdUeXBlUHJvdmlkZXJcIjtcclxuXHJcbi8qKlxyXG4gKiBpbXBsZW1lbnRzIHRoZSBUcmFjZUNvbmZpZ3VyYXRpb25XaWRnZXRcclxuICpcclxuICogQGNsYXNzIFRyYWNlQ29uZmlndXJhdGlvbldpZGdldFxyXG4gKiBAZXh0ZW5kcyB7V2lkZ2V0QmFzZX1cclxuICovXHJcbmNsYXNzIFRyYWNlQ29uZmlndXJhdGlvbldpZGdldCBleHRlbmRzIFdpZGdldEJhc2UgaW1wbGVtZW50cyBJVHJhY2VDb25maWd1cmF0aW9uV2lkZ2V0IHtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfdHJhY2VDb25maWdEYXRhUG9pbnRzV2lkZ2V0ITogV2lkZ2V0cy5JVHJhY2VDb25maWdEYXRhcG9pbnRzV2lkZ2V0O1xyXG4gICAgcHJpdmF0ZSBfdHJhY2VDb25maWdUaW1pbmdXaWRnZXQhOiBXaWRnZXRzLklUcmFjZUNvbmZpZ1RpbWluZ1dpZGdldDtcclxuICAgIHByaXZhdGUgX3RyYWNlQ29uZmlnVHJpZ2dlcldpZGdldCE6IFdpZGdldHMuSVRyYWNlQ29uZmlnVHJpZ2dlcldpZGdldDtcclxuXHJcbiAgICBwcml2YXRlIF90cmFjZVBhcmFtZXRlckludGVyZmFjZTogUHJvcGVydHk8SVRyYWNlQ29tcG9uZW50UGFyYW1ldGVycz58dW5kZWZpbmVkO1xyXG5cclxuICAgIHByaXZhdGUgX2xheW91dFdpZGdldEFjdGl2YXRlZEhhbmRsZXIgPSAoc2VuZGVyLGFyZ3MpPT50aGlzLm9uTGF5b3V0Q29udGVudEFjdGl2YXRlZChzZW5kZXIsYXJncyk7XHJcblxyXG4gICAgLyogaW5pdGlhbGl6ZSB0aGUgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxheW91dENvbnRhaW5lcklkXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWd1cmF0aW9uV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQ6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBcclxuICAgICAqIENyZWF0ZXMgdGhlIGxheW91dCBvZiB0aGUgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlndXJhdGlvbldpZGdldFxyXG4gICAgICovXHJcbiAgICBjcmVhdGVMYXlvdXQoKSB7IFxyXG4gICAgICAgIHRoaXMuX2xheW91dFdpZGdldCA9IFdpZGdldHMuU3BsaXR0ZXJXaWRnZXQuY3JlYXRlKCk7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0LmluaXRpYWxpemUodGhpcy5wYXJlbnRDb250ZW50SWQpO1xyXG4gICAgICAgIHRoaXMuX2xheW91dFdpZGdldC5ldmVudFdpZGdldEFjdGl2YXRlZC5hdHRhY2godGhpcy5fbGF5b3V0V2lkZ2V0QWN0aXZhdGVkSGFuZGxlcik7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzcG9zZSgpe1xyXG4gICAgICAgIHRoaXMuX2xheW91dFdpZGdldC5ldmVudFdpZGdldEFjdGl2YXRlZC5kZXRhY2godGhpcy5fbGF5b3V0V2lkZ2V0QWN0aXZhdGVkSGFuZGxlcik7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0LmRpc3Bvc2UoKTtcclxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSB3aWRnZXQgY29udGVudCBhbmQgZXZlbnR1YWxseSBzdWJ3aWRnZXRzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlndXJhdGlvbldpZGdldFxyXG4gICAgICovXHJcbiAgICBjcmVhdGVXaWRnZXRzKCkge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlVHJhY2VDb25maWdEYXRhcG9pbnRzV2lkZ2V0KCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVUcmFjZUNvbmZpZ1RpbWluZ1dpZGdldCgpO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlVHJhY2VDb25maWdUcmlnZ2VyV2lkZ2V0KCk7XHJcbiAgICAgICAgICBcclxuICAgICAgICB0aGlzLmluaXRpYWxpemVMYXlvdXQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZXMgdGhlIHRyYWNlIGNvbmZpZyBkYXRhcG9pbnRzIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlndXJhdGlvbldpZGdldFxyXG4gICAgICovXHJcbiAgICBjcmVhdGVUcmFjZUNvbmZpZ0RhdGFwb2ludHNXaWRnZXQoKSB7XHJcbiAgICAgICAgdGhpcy5fdHJhY2VDb25maWdEYXRhUG9pbnRzV2lkZ2V0ID0gV2lkZ2V0cy5UcmFjZUNvbmZpZ0RhdGFwb2ludHNXaWRnZXQuY3JlYXRlKCk7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0LmFkZFdpZGdldCh0aGlzLl90cmFjZUNvbmZpZ0RhdGFQb2ludHNXaWRnZXQsIFwiRGF0YVBvaW50c1wiLCBWaWV3VHlwZS5EZWZhdWx0LCAtMSk7XHJcbiAgICB9IFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY3JlYXRlcyB0aGUgdHJhY2UgY29uZmlnIHRpbWluZyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ3VyYXRpb25XaWRnZXRcclxuICAgICAqL1xyXG4gICAgY3JlYXRlVHJhY2VDb25maWdUaW1pbmdXaWRnZXQoKSB7XHJcbiAgICAgICAgdGhpcy5fdHJhY2VDb25maWdUaW1pbmdXaWRnZXQgPSBXaWRnZXRzLlRyYWNlQ29uZmlnVGltaW5nV2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgIHRoaXMuX2xheW91dFdpZGdldC5hZGRXaWRnZXQodGhpcy5fdHJhY2VDb25maWdUaW1pbmdXaWRnZXQsIFwiVGltaW5nc1wiLCBWaWV3VHlwZS5EZWZhdWx0LCAtMSk7XHJcbiAgICB9ICAgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjcmVhdGVzIHRoZSB0cmFjZSBjb25maWcgdHJpZ2dlciB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ3VyYXRpb25XaWRnZXRcclxuICAgICAqL1xyXG4gICAgY3JlYXRlVHJhY2VDb25maWdUcmlnZ2VyV2lkZ2V0KCkge1xyXG4gICAgICAgIHRoaXMuX3RyYWNlQ29uZmlnVHJpZ2dlcldpZGdldCA9IFdpZGdldHMuVHJhY2VDb25maWdUcmlnZ2VyV2lkZ2V0LmNyZWF0ZSgpO1xyXG4gICAgICAgIHRoaXMuX2xheW91dFdpZGdldC5hZGRXaWRnZXQodGhpcy5fdHJhY2VDb25maWdUcmlnZ2VyV2lkZ2V0LCBcIlRyaWdnZXJzXCIsIFZpZXdUeXBlLkRlZmF1bHQsIC0xKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogXHJcbiAgICAgKiByZXNpemVzIHRoZSB0cmFjZSBjb25maWd1cmF0aW9uIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodFxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlndXJhdGlvbldpZGdldFxyXG4gICAgICovXHJcbiAgICByZXNpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpe1xyXG5cclxuICAgICAgICB0aGlzLl9hY3R1YWxXaWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuX2FjdHVhbEhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLl9sYXlvdXRXaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0IS5yZXNpemUod2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICBcclxuICAgIC8qKlxyXG4gICAgICogUmFpc2VkIGFmdGVyIGEgbGF5b3V0IGNvbnRlbnQgd2FzIGFjdGl2YXRlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWd1cmF0aW9uV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25MYXlvdXRDb250ZW50QWN0aXZhdGVkKHNlbmRlciwgYXJncykge1xyXG4gICAgICAgIGFyZ3Mud2lkZ2V0LmFjdGl2YXRlKCk7XHJcbiAgICAgICAgdGhpcy5yZXNpemUodGhpcy5fYWN0dWFsV2lkdGgsIHRoaXMuX2FjdHVhbEhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXplcyB0aGUgbGF5b3V0IFxyXG4gICAgICogRGVmaW5lcyB0aGUgc2l6ZXMoYW5kIG90aGVyIHNldHRpbmdzKSBvZiB0aGUgdHJhY2UgY29uZmlnIHBhbmVzID0+IHRyYWNlIGNvbmZpZyBkYXRhcG9pbnRzLyB0cmFjZSBjb25maWcgdGltaW5nLyB0cmFjZSBjb25maWcgc3RhcnQgdHJpZ2dlcnNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlndXJhdGlvbldpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGluaXRpYWxpemVMYXlvdXQoKXtcclxuICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuX2xheW91dFdpZGdldC5sYXlvdXRQYW5lcyk7XHJcbiAgICAgICAgaWYoa2V5cy5sZW5ndGggPT0gMyl7XHJcblxyXG4gICAgICAgICAgICAvLyBTZXQgaW5pdGlhbCBwYW5lIHNpemVzIGFuZCBzZXR0aW5nc1xyXG4gICAgICAgICAgICBsZXQga2V5MCA9IGtleXNbMF07XHJcbiAgICAgICAgICAgIHRoaXMuX2xheW91dFdpZGdldC5sYXlvdXRQYW5lc1trZXkwXS5zaXplID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0LmxheW91dFBhbmVzW2tleTBdLmZpbGxTcGFjZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX2xheW91dFdpZGdldC5sYXlvdXRQYW5lc1trZXkwXS5leHBhbmRhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX2xheW91dFdpZGdldC5sYXlvdXRQYW5lc1trZXkwXS5jb2xsYXBzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGtleTEgPSBrZXlzWzFdO1xyXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQubGF5b3V0UGFuZXNba2V5MV0uc2l6ZSA9IDU3MDtcclxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0LmxheW91dFBhbmVzW2tleTFdLmV4cGFuZGFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0LmxheW91dFBhbmVzW2tleTFdLmNvbGxhcHNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQga2V5MiA9IGtleXNbMl07XHJcbiAgICAgICAgICAgIHRoaXMuX2xheW91dFdpZGdldC5sYXlvdXRQYW5lc1trZXkyXS5zaXplID0gNTAwO1xyXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQubGF5b3V0UGFuZXNba2V5Ml0uZXhwYW5kYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQubGF5b3V0UGFuZXNba2V5Ml0uY29sbGFwc2libGUgPSBmYWxzZTsgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgLy8gUmVkcmF3IHRoZSBsYXlvdXRcclxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0LnJlY2FsY3VsYXRlTGF5b3V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRocm93KG5ldyBFcnJvcihcInRoaXMuX2xheW91dFdpZGdldC5sYXlvdXRQYW5lcy5sZW5ndGggIT0gM1wiKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgdHJhY2UgcGFyYW1ldGVyIGludGVyZmFjZSB0byB0aGUgdHJhY2UgY29uZmlndXJhdGlvbiB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWd1cmF0aW9uV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgdHJhY2VQYXJhbWV0ZXJzSW50ZXJmYWNlKHRyYWNlUGFyYW1ldGVySW50ZXJmYWNlOiBQcm9wZXJ0eTxJVHJhY2VDb21wb25lbnRQYXJhbWV0ZXJzPikge1xyXG4gICAgICAgIHRoaXMuX3RyYWNlUGFyYW1ldGVySW50ZXJmYWNlID0gdHJhY2VQYXJhbWV0ZXJJbnRlcmZhY2U7XHJcbiAgICAgICAgdGhpcy5fdHJhY2VQYXJhbWV0ZXJJbnRlcmZhY2UuY2hhbmdlZCgodHJhY2VQYXJhbWV0ZXJJbnRlcmZhY2UpPT57XHJcbiAgXHJcbiAgICAgICAgICAgIHRyeXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RyYWNlQ29uZmlnRGF0YVBvaW50c1dpZGdldC5kYXRhUG9pbnRzID0gdHJhY2VQYXJhbWV0ZXJJbnRlcmZhY2UudHJhY2VDb25maWd1cmF0aW9uRGF0YSEuZGF0YVBvaW50cztcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RyYWNlQ29uZmlnRGF0YVBvaW50c1dpZGdldC5hdmFpbGFibGVEYXRhUG9pbnRzID0gdHJhY2VQYXJhbWV0ZXJJbnRlcmZhY2UuYXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoKGVycm9yKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl90cmFjZUNvbmZpZ1RpbWluZ1dpZGdldC50aW1pbmdQYXJhbWV0ZXJzID0gdHJhY2VQYXJhbWV0ZXJJbnRlcmZhY2UudHJhY2VDb25maWd1cmF0aW9uRGF0YSEudGltaW5nUGFyYW1ldGVycztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuX3RyYWNlQ29uZmlnVHJpZ2dlcldpZGdldC5zdGFydFRyaWdnZXJzICA9IHtkYXRhOiB0cmFjZVBhcmFtZXRlckludGVyZmFjZS50cmFjZUNvbmZpZ3VyYXRpb25EYXRhIS5zdGFydFRyaWdnZXJzLCBpbmZvOiB0cmFjZVBhcmFtZXRlckludGVyZmFjZS50cmFjZUNvbmZpZ3VyYXRpb25JbmZvIS5zdGFydFRyaWdnZXJJbmZvc307XHJcbiAgICAgICAgICAgIHRoaXMuX3RyYWNlQ29uZmlnVHJpZ2dlcldpZGdldC5hdmFpbGFibGVEYXRhUG9pbnRzID0gdHJhY2VQYXJhbWV0ZXJJbnRlcmZhY2UuYXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IFRyYWNlQ29uZmlndXJhdGlvbldpZGdldCB9OyJdfQ==