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
define(["require", "exports", "../../widgets/widgets", "../common/viewTypeProvider", "../common/viewBase"], function (require, exports, Widgets, viewTypeProvider_1, viewBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * implements the trace configuration view widget
     *
     * @class TraceConfigurationViewWidget
     * @extends {WidgetBase}
     */
    var TraceConfigurationViewWidget = /** @class */ (function (_super) {
        __extends(TraceConfigurationViewWidget, _super);
        function TraceConfigurationViewWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._layoutWidgetActivatedHandler = function (sender, args) { return _this.onContentActivated(sender, args); };
            return _this;
        }
        /* initialize the widget
         *
         * @param {string} layoutContainerId
         * @memberof TraceConfigurationViewWidget
         */
        TraceConfigurationViewWidget.prototype.initialize = function (layoutContainerId) {
            _super.prototype.initialize.call(this, layoutContainerId);
        };
        /**
         * Creates the layout of the widget
         *
         * @memberof TraceConfigurationViewWidget
         */
        TraceConfigurationViewWidget.prototype.createLayout = function () {
            this._layoutWidget = Widgets.SplitterWidget.create();
            this.attachLayoutToView(this);
            this._layoutWidget.initialize(this.parentContentId);
            this._layoutWidget.eventWidgetActivated.attach(this._layoutWidgetActivatedHandler);
        };
        TraceConfigurationViewWidget.prototype.dispose = function () {
            this._layoutWidget.eventWidgetActivated.detach(this._layoutWidgetActivatedHandler);
            this._layoutWidget.dispose();
            _super.prototype.dispose.call(this);
        };
        /**
         * Creates the widget content and eventually subwidgets
         *
         * @memberof TraceConfigurationViewWidget
         */
        TraceConfigurationViewWidget.prototype.createWidgets = function () {
            this.createTraceControlWidget();
            this.createTraceConfigurationWidget();
            this.createMessagesWidget();
            this.initializeLayout();
        };
        /**
         * creates the trace control widget
         *
         * @returns {*}
         * @memberof TraceConfigurationViewWidget
         */
        TraceConfigurationViewWidget.prototype.createTraceControlWidget = function () {
            this._traceControlWidget = Widgets.TraceControlWidget.create();
            this._layoutWidget.addWidget(this._traceControlWidget, "TraceController", viewTypeProvider_1.ViewType.Default, -1);
        };
        /**
         * creates the trace configuration widget
         *
         * @returns {*}
         * @memberof TraceConfigurationViewWidget
         */
        TraceConfigurationViewWidget.prototype.createTraceConfigurationWidget = function () {
            this._traceConfigurationWidget = Widgets.TraceConfigurationWidget.create();
            this._layoutWidget.addWidget(this._traceConfigurationWidget, "TraceConfig", viewTypeProvider_1.ViewType.Default, -1);
        };
        /**
         * creates the messages widget
         *
         * @returns {*}
         * @memberof TraceConfigurationViewWidget
         */
        TraceConfigurationViewWidget.prototype.createMessagesWidget = function () {
            this._messagesWidget = Widgets.MessagesWidget.create();
            this._layoutWidget.addWidget(this._messagesWidget, "Messages", viewTypeProvider_1.ViewType.Default, -1);
        };
        /** resizes the trace configuration view widget
         *
         * @param {number} width
         * @param {number} height
         * @memberof TraceConfigurationViewWidget
         */
        TraceConfigurationViewWidget.prototype.resize = function (width, height) {
            this._actualWidth = width;
            this._actualHeight = height;
            if (this._layoutWidget != undefined) {
                this._layoutWidget.resize(width, height);
            }
        };
        Object.defineProperty(TraceConfigurationViewWidget.prototype, "activeComponent", {
            /**
             * Sets the active component to be displayed by the component view
             *
             * @memberof TraceConfigurationViewWidget
             */
            set: function (activeComponent) {
                var _this = this;
                this._activeComponent = activeComponent;
                this._activeComponent.value.initialize().then(function () {
                    _this.connectComponent(_this._activeComponent.value);
                });
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Connects the active component
         *
         * @private
         * @param {MappCockpitComponent} activeComponent
         * @memberof TraceConfigurationViewWidget
         */
        TraceConfigurationViewWidget.prototype.connectComponent = function (activeComponent) {
            var _this = this;
            activeComponent.mappCockpitComponent.commandConnectComponent.execute(null, function () {
                if (activeComponent.mappCockpitComponent.parametersSource != undefined) {
                    _this.connectMessagesWidget(activeComponent.mappCockpitComponent.messageParametersSource);
                }
                if (activeComponent.traceParameters != undefined) {
                    _this.connectTraceConfigurationWidget(activeComponent.traceParameters);
                }
                if (activeComponent.traceControlInterface != undefined) {
                    _this.connectTraceControlWidget(activeComponent.traceControlInterface);
                }
            });
        };
        /**
         *   Connects the messages widget to the component parameters
         *
         * @param {Property<MappCockpitComponentParameter[]>} parametersSource
         * @returns {*}
         * @memberof TraceConfigurationViewWidget
         */
        TraceConfigurationViewWidget.prototype.connectMessagesWidget = function (componentParametersLink) {
            if (this._messagesWidget) {
                this._messagesWidget.messageParameters = componentParametersLink;
            }
        };
        /**
         *   Connects the trace configuration widget to the trace configuration parameters
         *
         * @param {Property<ITraceComponentParameters>} traceComponentParametersLink
         * @returns {*}
         * @memberof TraceConfigurationViewWidget
         */
        TraceConfigurationViewWidget.prototype.connectTraceConfigurationWidget = function (traceComponentParametersLink) {
            if (this._traceConfigurationWidget) {
                this._traceConfigurationWidget.traceParametersInterface = traceComponentParametersLink;
            }
        };
        /**
         *   Connects the trace control widget to the trace control provider
         *
         * @param {ITraceComponentControl} traceControlProvider
         * @returns {*}
         * @memberof TraceConfigurationViewWidget
         */
        TraceConfigurationViewWidget.prototype.connectTraceControlWidget = function (traceComponentControl) {
            if (this._traceControlWidget) {
                this._traceControlWidget.traceControlInterface = traceComponentControl;
            }
        };
        TraceConfigurationViewWidget.prototype.onContentActivated = function (sender, args) {
            args.widget.activate();
            this.resize(this._actualWidth, this._actualHeight);
        };
        TraceConfigurationViewWidget.prototype.initializeLayout = function () {
            var keys = Object.keys(this._layoutWidget.layoutPanes);
            if (keys.length == 3) {
                this._layoutWidget.setOrientation(true);
                // Set initial pane sizes and settings
                var key0 = keys[0];
                this._layoutWidget.layoutPanes[key0].size = 40;
                this._layoutWidget.layoutPanes[key0].expandable = false;
                this._layoutWidget.layoutPanes[key0].collapsible = false;
                this._layoutWidget.layoutPanes[key0].resizable = false;
                var key1 = keys[1];
                this._layoutWidget.layoutPanes[key1].size = 0;
                this._layoutWidget.layoutPanes[key1].fillSpace = true;
                this._layoutWidget.layoutPanes[key1].expandable = false;
                this._layoutWidget.layoutPanes[key1].collapsible = false;
                var key2 = keys[2];
                this._layoutWidget.layoutPanes[key2].size = 110;
                this._layoutWidget.layoutPanes[key2].expandable = false;
                this._layoutWidget.layoutPanes[key2].collapsible = false;
                // Redraw the layout
                this._layoutWidget.recalculateLayout();
            }
            else {
                throw (new Error("this._layoutWidget.layoutPanes.length != 3"));
            }
        };
        return TraceConfigurationViewWidget;
    }(viewBase_1.ViewBase));
    exports.TraceConfigurationViewWidget = TraceConfigurationViewWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VDb25maWd1cmF0aW9uVmlld1dpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy90cmFjZUNvbmZpZ3VyYXRpb25WaWV3V2lkZ2V0L3RyYWNlQ29uZmlndXJhdGlvblZpZXdXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVVBOzs7OztPQUtHO0lBQ0g7UUFBMkMsZ0RBQVE7UUFBbkQ7WUFBQSxxRUE4TUM7WUF0TVcsbUNBQTZCLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFHLE9BQUEsS0FBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsRUFBcEMsQ0FBb0MsQ0FBQzs7UUFzTWhHLENBQUM7UUFwTUc7Ozs7V0FJRztRQUNILGlEQUFVLEdBQVYsVUFBVyxpQkFBeUI7WUFDaEMsaUJBQU0sVUFBVSxZQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDeEMsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSCxtREFBWSxHQUFaO1lBQ0ksSUFBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3JELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDcEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLENBQUM7UUFDdkYsQ0FBQztRQUVELDhDQUFPLEdBQVA7WUFDSSxJQUFJLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsNkJBQTZCLENBQUMsQ0FBQztZQUNuRixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzdCLGlCQUFNLE9B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YUFBYSxDQUFDLGlCQUFpQixFQUFFLENBQUM7YUFDMUM7aUJBQ0c7Z0JBQ0EsTUFBSyxDQUFDLElBQUksS0FBSyxDQUFDLDRDQUE0QyxDQUFDLENBQUMsQ0FBQzthQUNsRTtRQUNMLENBQUM7UUFDTCxtQ0FBQztJQUFELENBQUMsQUE5TUQsQ0FBMkMsbUJBQVEsR0E4TWxEO0lBRVEsb0VBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVRyYWNlQ29uZmlndXJhdGlvblZpZXdXaWRnZXQgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL3RyYWNlQ29uZmlndXJhdGlvblZpZXdXaWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0ICogYXMgV2lkZ2V0cyBmcm9tIFwiLi4vLi4vd2lkZ2V0cy93aWRnZXRzXCI7XHJcbmltcG9ydCB7IFByb3BlcnR5IH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9wcm9wZXJ0eVwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50XCI7XHJcbmltcG9ydCB7IElUcmFjZUNvbXBvbmVudFBhcmFtZXRlcnMgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2RpYWdub3N0aWNzL3RyYWNlL2ludGVyZmFjZXMvdHJhY2VDb21wb25lbnRQYXJhbWV0ZXJJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVRyYWNlQ29tcG9uZW50Q29udHJvbCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvZGlhZ25vc3RpY3MvdHJhY2UvaW50ZXJmYWNlcy90cmFjZUNvbnRyb2xQcm92aWRlckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdFRyYWNlQ29tcG9uZW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9kaWFnbm9zdGljcy90cmFjZS9tYXBwQ29ja3BpdFRyYWNlQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFZpZXdUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi92aWV3VHlwZVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IFZpZXdCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi92aWV3QmFzZVwiO1xyXG5cclxuLyoqXHJcbiAqIGltcGxlbWVudHMgdGhlIHRyYWNlIGNvbmZpZ3VyYXRpb24gdmlldyB3aWRnZXRcclxuICpcclxuICogQGNsYXNzIFRyYWNlQ29uZmlndXJhdGlvblZpZXdXaWRnZXRcclxuICogQGV4dGVuZHMge1dpZGdldEJhc2V9XHJcbiAqL1xyXG5jbGFzcyBUcmFjZUNvbmZpZ3VyYXRpb25WaWV3V2lkZ2V0IGV4dGVuZHMgVmlld0Jhc2UgaW1wbGVtZW50cyBJVHJhY2VDb25maWd1cmF0aW9uVmlld1dpZGdldCB7XHJcblxyXG4gICAgcHJpdmF0ZSBfdHJhY2VDb25maWd1cmF0aW9uV2lkZ2V0ITogV2lkZ2V0cy5JVHJhY2VDb25maWd1cmF0aW9uV2lkZ2V0O1xyXG4gICAgcHJpdmF0ZSBfdHJhY2VDb250cm9sV2lkZ2V0ITogV2lkZ2V0cy5JVHJhY2VDb250cm9sV2lkZ2V0O1xyXG5cclxuICAgIHByaXZhdGUgX2FjdGl2ZUNvbXBvbmVudCE6IFByb3BlcnR5PE1hcHBDb2NrcGl0VHJhY2VDb21wb25lbnQ+O1xyXG4gICAgcHJpdmF0ZSBfbWVzc2FnZXNXaWRnZXQ6IFdpZGdldHMuSU1lc3NhZ2VzV2lkZ2V0IHwgdW5kZWZpbmVkO1xyXG5cclxuICAgIHByaXZhdGUgX2xheW91dFdpZGdldEFjdGl2YXRlZEhhbmRsZXIgPSAoc2VuZGVyLGFyZ3MpPT50aGlzLm9uQ29udGVudEFjdGl2YXRlZChzZW5kZXIsYXJncyk7XHJcblxyXG4gICAgLyogaW5pdGlhbGl6ZSB0aGUgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxheW91dENvbnRhaW5lcklkXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWd1cmF0aW9uVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBpbml0aWFsaXplKGxheW91dENvbnRhaW5lcklkOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlci5pbml0aWFsaXplKGxheW91dENvbnRhaW5lcklkKTtcclxuICAgIH1cclxuIFxyXG4gICAgLyoqIFxyXG4gICAgICogQ3JlYXRlcyB0aGUgbGF5b3V0IG9mIHRoZSB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWd1cmF0aW9uVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBjcmVhdGVMYXlvdXQoKSB7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0ID0gV2lkZ2V0cy5TcGxpdHRlcldpZGdldC5jcmVhdGUoKTtcclxuICAgICAgICB0aGlzLmF0dGFjaExheW91dFRvVmlldyh0aGlzKTtcclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQuaW5pdGlhbGl6ZSh0aGlzLnBhcmVudENvbnRlbnRJZCk7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0LmV2ZW50V2lkZ2V0QWN0aXZhdGVkLmF0dGFjaCh0aGlzLl9sYXlvdXRXaWRnZXRBY3RpdmF0ZWRIYW5kbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBkaXNwb3NlKCl7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0LmV2ZW50V2lkZ2V0QWN0aXZhdGVkLmRldGFjaCh0aGlzLl9sYXlvdXRXaWRnZXRBY3RpdmF0ZWRIYW5kbGVyKTtcclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQuZGlzcG9zZSgpO1xyXG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIHdpZGdldCBjb250ZW50IGFuZCBldmVudHVhbGx5IHN1YndpZGdldHNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWd1cmF0aW9uVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBjcmVhdGVXaWRnZXRzKCkge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlVHJhY2VDb250cm9sV2lkZ2V0KCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVUcmFjZUNvbmZpZ3VyYXRpb25XaWRnZXQoKTsgICAgICAgIFxyXG4gICAgICAgIHRoaXMuY3JlYXRlTWVzc2FnZXNXaWRnZXQoKTtcclxuICAgIFxyXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZUxheW91dCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY3JlYXRlcyB0aGUgdHJhY2UgY29udHJvbCB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ3VyYXRpb25WaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZVRyYWNlQ29udHJvbFdpZGdldCgpIHtcclxuICAgICAgICB0aGlzLl90cmFjZUNvbnRyb2xXaWRnZXQgPSBXaWRnZXRzLlRyYWNlQ29udHJvbFdpZGdldC5jcmVhdGUoKTtcclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQuYWRkV2lkZ2V0KHRoaXMuX3RyYWNlQ29udHJvbFdpZGdldCwgXCJUcmFjZUNvbnRyb2xsZXJcIiwgVmlld1R5cGUuRGVmYXVsdCwgLTEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY3JlYXRlcyB0aGUgdHJhY2UgY29uZmlndXJhdGlvbiB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ3VyYXRpb25WaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZVRyYWNlQ29uZmlndXJhdGlvbldpZGdldCgpIHtcclxuICAgICAgICB0aGlzLl90cmFjZUNvbmZpZ3VyYXRpb25XaWRnZXQgPSBXaWRnZXRzLlRyYWNlQ29uZmlndXJhdGlvbldpZGdldC5jcmVhdGUoKTtcclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQuYWRkV2lkZ2V0KHRoaXMuX3RyYWNlQ29uZmlndXJhdGlvbldpZGdldCwgXCJUcmFjZUNvbmZpZ1wiLCBWaWV3VHlwZS5EZWZhdWx0LCAtMSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjcmVhdGVzIHRoZSBtZXNzYWdlcyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ3VyYXRpb25WaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZU1lc3NhZ2VzV2lkZ2V0KCkge1xyXG4gICAgICAgIHRoaXMuX21lc3NhZ2VzV2lkZ2V0ID0gV2lkZ2V0cy5NZXNzYWdlc1dpZGdldC5jcmVhdGUoKTtcclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQuYWRkV2lkZ2V0KHRoaXMuX21lc3NhZ2VzV2lkZ2V0LCBcIk1lc3NhZ2VzXCIsIFZpZXdUeXBlLkRlZmF1bHQsIC0xKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogcmVzaXplcyB0aGUgdHJhY2UgY29uZmlndXJhdGlvbiB2aWV3IHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodFxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlndXJhdGlvblZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcmVzaXplKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKXtcclxuICAgICAgICB0aGlzLl9hY3R1YWxXaWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuX2FjdHVhbEhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLl9sYXlvdXRXaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0IS5yZXNpemUod2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSAgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBhY3RpdmUgY29tcG9uZW50IHRvIGJlIGRpc3BsYXllZCBieSB0aGUgY29tcG9uZW50IHZpZXdcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWd1cmF0aW9uVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IGFjdGl2ZUNvbXBvbmVudChhY3RpdmVDb21wb25lbnQ6IFByb3BlcnR5PE1hcHBDb2NrcGl0VHJhY2VDb21wb25lbnQ+KSB7XHJcbiAgICAgICAgdGhpcy5fYWN0aXZlQ29tcG9uZW50ID0gYWN0aXZlQ29tcG9uZW50O1xyXG4gICAgICAgIHRoaXMuX2FjdGl2ZUNvbXBvbmVudC52YWx1ZS5pbml0aWFsaXplKCkudGhlbigoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RDb21wb25lbnQodGhpcy5fYWN0aXZlQ29tcG9uZW50LnZhbHVlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gICBcclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbm5lY3RzIHRoZSBhY3RpdmUgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnR9IGFjdGl2ZUNvbXBvbmVudFxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlndXJhdGlvblZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb25uZWN0Q29tcG9uZW50KGFjdGl2ZUNvbXBvbmVudDogTWFwcENvY2twaXRUcmFjZUNvbXBvbmVudCkge1xyXG4gICAgICAgIGFjdGl2ZUNvbXBvbmVudC5tYXBwQ29ja3BpdENvbXBvbmVudC5jb21tYW5kQ29ubmVjdENvbXBvbmVudC5leGVjdXRlKG51bGwsICgpID0+IHtcclxuICAgICAgICAgICAgaWYoYWN0aXZlQ29tcG9uZW50Lm1hcHBDb2NrcGl0Q29tcG9uZW50LnBhcmFtZXRlcnNTb3VyY2UgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdE1lc3NhZ2VzV2lkZ2V0KGFjdGl2ZUNvbXBvbmVudC5tYXBwQ29ja3BpdENvbXBvbmVudC5tZXNzYWdlUGFyYW1ldGVyc1NvdXJjZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoYWN0aXZlQ29tcG9uZW50LnRyYWNlUGFyYW1ldGVycyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0VHJhY2VDb25maWd1cmF0aW9uV2lkZ2V0KGFjdGl2ZUNvbXBvbmVudC50cmFjZVBhcmFtZXRlcnMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGFjdGl2ZUNvbXBvbmVudC50cmFjZUNvbnRyb2xJbnRlcmZhY2UgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdFRyYWNlQ29udHJvbFdpZGdldChhY3RpdmVDb21wb25lbnQudHJhY2VDb250cm9sSW50ZXJmYWNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogICBDb25uZWN0cyB0aGUgbWVzc2FnZXMgd2lkZ2V0IHRvIHRoZSBjb21wb25lbnQgcGFyYW1ldGVyc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7UHJvcGVydHk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXT59IHBhcmFtZXRlcnNTb3VyY2VcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlndXJhdGlvblZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb25uZWN0TWVzc2FnZXNXaWRnZXQoY29tcG9uZW50UGFyYW1ldGVyc0xpbms6IFByb3BlcnR5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10+KTogYW55IHtcclxuICAgICAgICBpZiAodGhpcy5fbWVzc2FnZXNXaWRnZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWVzc2FnZXNXaWRnZXQubWVzc2FnZVBhcmFtZXRlcnMgPSBjb21wb25lbnRQYXJhbWV0ZXJzTGluaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAgIENvbm5lY3RzIHRoZSB0cmFjZSBjb25maWd1cmF0aW9uIHdpZGdldCB0byB0aGUgdHJhY2UgY29uZmlndXJhdGlvbiBwYXJhbWV0ZXJzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtQcm9wZXJ0eTxJVHJhY2VDb21wb25lbnRQYXJhbWV0ZXJzPn0gdHJhY2VDb21wb25lbnRQYXJhbWV0ZXJzTGlua1xyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWd1cmF0aW9uVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbm5lY3RUcmFjZUNvbmZpZ3VyYXRpb25XaWRnZXQodHJhY2VDb21wb25lbnRQYXJhbWV0ZXJzTGluazogUHJvcGVydHk8SVRyYWNlQ29tcG9uZW50UGFyYW1ldGVycz4pOiBhbnkge1xyXG4gICAgICAgIGlmICh0aGlzLl90cmFjZUNvbmZpZ3VyYXRpb25XaWRnZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5fdHJhY2VDb25maWd1cmF0aW9uV2lkZ2V0LnRyYWNlUGFyYW1ldGVyc0ludGVyZmFjZSA9IHRyYWNlQ29tcG9uZW50UGFyYW1ldGVyc0xpbms7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogICBDb25uZWN0cyB0aGUgdHJhY2UgY29udHJvbCB3aWRnZXQgdG8gdGhlIHRyYWNlIGNvbnRyb2wgcHJvdmlkZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lUcmFjZUNvbXBvbmVudENvbnRyb2x9IHRyYWNlQ29udHJvbFByb3ZpZGVyXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ3VyYXRpb25WaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29ubmVjdFRyYWNlQ29udHJvbFdpZGdldCh0cmFjZUNvbXBvbmVudENvbnRyb2w6IElUcmFjZUNvbXBvbmVudENvbnRyb2wpOiBhbnkge1xyXG4gICAgICAgIGlmICh0aGlzLl90cmFjZUNvbnRyb2xXaWRnZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5fdHJhY2VDb250cm9sV2lkZ2V0LnRyYWNlQ29udHJvbEludGVyZmFjZSA9IHRyYWNlQ29tcG9uZW50Q29udHJvbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByaXZhdGUgb25Db250ZW50QWN0aXZhdGVkKHNlbmRlciwgYXJncykge1xyXG5cclxuICAgICAgICBhcmdzLndpZGdldC5hY3RpdmF0ZSgpO1xyXG4gICAgICAgIHRoaXMucmVzaXplKHRoaXMuX2FjdHVhbFdpZHRoLCB0aGlzLl9hY3R1YWxIZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdGlhbGl6ZUxheW91dCgpe1xyXG4gICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXModGhpcy5fbGF5b3V0V2lkZ2V0LmxheW91dFBhbmVzKVxyXG4gICAgICAgIGlmKGtleXMubGVuZ3RoID09IDMpe1xyXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQuc2V0T3JpZW50YXRpb24odHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBTZXQgaW5pdGlhbCBwYW5lIHNpemVzIGFuZCBzZXR0aW5nc1xyXG4gICAgICAgICAgICBsZXQga2V5MCA9IGtleXNbMF07XHJcbiAgICAgICAgICAgIHRoaXMuX2xheW91dFdpZGdldC5sYXlvdXRQYW5lc1trZXkwXS5zaXplID0gNDA7XHJcbiAgICAgICAgICAgIHRoaXMuX2xheW91dFdpZGdldC5sYXlvdXRQYW5lc1trZXkwXS5leHBhbmRhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX2xheW91dFdpZGdldC5sYXlvdXRQYW5lc1trZXkwXS5jb2xsYXBzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQubGF5b3V0UGFuZXNba2V5MF0ucmVzaXphYmxlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBsZXQga2V5MSA9IGtleXNbMV07XHJcbiAgICAgICAgICAgIHRoaXMuX2xheW91dFdpZGdldC5sYXlvdXRQYW5lc1trZXkxXS5zaXplID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0LmxheW91dFBhbmVzW2tleTFdLmZpbGxTcGFjZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX2xheW91dFdpZGdldC5sYXlvdXRQYW5lc1trZXkxXS5leHBhbmRhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX2xheW91dFdpZGdldC5sYXlvdXRQYW5lc1trZXkxXS5jb2xsYXBzaWJsZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgbGV0IGtleTIgPSBrZXlzWzJdO1xyXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQubGF5b3V0UGFuZXNba2V5Ml0uc2l6ZSA9IDExMDtcclxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0LmxheW91dFBhbmVzW2tleTJdLmV4cGFuZGFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0LmxheW91dFBhbmVzW2tleTJdLmNvbGxhcHNpYmxlID0gZmFsc2U7ICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIC8vIFJlZHJhdyB0aGUgbGF5b3V0XHJcbiAgICAgICAgICAgIHRoaXMuX2xheW91dFdpZGdldC5yZWNhbGN1bGF0ZUxheW91dCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aHJvdyhuZXcgRXJyb3IoXCJ0aGlzLl9sYXlvdXRXaWRnZXQubGF5b3V0UGFuZXMubGVuZ3RoICE9IDNcIikpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgVHJhY2VDb25maWd1cmF0aW9uVmlld1dpZGdldCB9OyJdfQ==