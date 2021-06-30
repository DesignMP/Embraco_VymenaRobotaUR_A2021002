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
define(["require", "exports", "../common/viewBase", "./defaultComponentSettings"], function (require, exports, viewBase_1, defaultComponentSettings_1) {
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
        TraceConfigurationViewWidget.prototype.initializeComponent = function () {
            this.component.defaultSettingsDataId = defaultComponentSettings_1.DefaultComponentSettings.WidgetDefinitionId;
            this.component.disablePersisting();
        };
        /**
         * Returns the default component settings for this widget
         *
         * @returns {(ComponentSettings|undefined)}
         * @memberof TraceConfigurationViewWidget
         */
        TraceConfigurationViewWidget.prototype.getDefaultComponentSettings = function () {
            return defaultComponentSettings_1.DefaultComponentSettings.getTraceConfigurationViewDefinition();
        };
        /**
         * Adds some default persisting data packages in the main default persisting data provider
         *
         * @private
         * @memberof TraceConfigurationViewWidget
         */
        TraceConfigurationViewWidget.prototype.addAdditionalDefaultComponentSettings = function () {
            // Splitter definitions  
            this.component.addDefaultComponentSettingsToProvider(defaultComponentSettings_1.DefaultComponentSettings.MainSplitterDefinitionId, defaultComponentSettings_1.DefaultComponentSettings.getMainSplitterDefinition());
        };
        /**
         * Sets the widget content and eventually subwidgets
         *
         * @memberof TraceConfigurationViewWidget
         */
        TraceConfigurationViewWidget.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            this.initLayoutWidget();
            this.setTraceControlWidget();
            this.setMessagesWidget();
            // attach layout of traceConfigurationWidget to view
            this.attachLayoutToView(this);
        };
        TraceConfigurationViewWidget.prototype.initLayoutWidget = function () {
            this._layoutWidget = this.component.getSubComponent(defaultComponentSettings_1.DefaultComponentSettings.SplitterWidgetTraceConfigurationViewId);
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
         * set the trace control widget
         *
         * @returns {*}
         * @memberof TraceConfigurationViewWidget
         */
        TraceConfigurationViewWidget.prototype.setTraceControlWidget = function () {
            this._traceControlWidget = this.getWidgetById(defaultComponentSettings_1.DefaultComponentSettings.TraceControlWidgetId);
        };
        /**
         * set the messages widget
         *
         * @returns {*}
         * @memberof TraceConfigurationViewWidget
         */
        TraceConfigurationViewWidget.prototype.setMessagesWidget = function () {
            this._messagesWidget = this.getWidgetById(defaultComponentSettings_1.DefaultComponentSettings.TraceConfigurationMessagesWidgetId);
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
        return TraceConfigurationViewWidget;
    }(viewBase_1.ViewBase));
    exports.TraceConfigurationViewWidget = TraceConfigurationViewWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VDb25maWd1cmF0aW9uVmlld1dpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy90cmFjZUNvbmZpZ3VyYXRpb25WaWV3V2lkZ2V0L3RyYWNlQ29uZmlndXJhdGlvblZpZXdXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVVBOzs7OztPQUtHO0lBQ0g7UUFBMkMsZ0RBQVE7UUFBbkQ7WUFBQSxxRUFrS0M7WUEzSlcsbUNBQTZCLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFHLE9BQUEsS0FBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsRUFBcEMsQ0FBb0MsQ0FBQzs7UUEySmhHLENBQUM7UUF6SkcsMERBQW1CLEdBQW5CO1lBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsR0FBRyxtREFBd0IsQ0FBQyxrQkFBa0IsQ0FBQztZQUNuRixJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDdkMsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gsa0VBQTJCLEdBQTNCO1lBQ0ksT0FBTyxtREFBd0IsQ0FBQyxtQ0FBbUMsRUFBRSxDQUFDO1FBQzFFLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNILDRFQUFxQyxHQUFyQztZQUNJLHlCQUF5QjtZQUN6QixJQUFJLENBQUMsU0FBUyxDQUFDLHFDQUFxQyxDQUFDLG1EQUF3QixDQUFDLHdCQUF3QixFQUFFLG1EQUF3QixDQUFDLHlCQUF5QixFQUFFLENBQUMsQ0FBQztRQUNsSyxDQUFDO1FBRUQ7Ozs7V0FJRztRQUNILGtEQUFXLEdBQVg7WUFDSSxpQkFBTSxXQUFXLFdBQUUsQ0FBQztZQUVwQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUV4QixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUM3QixJQUFJLENBQUMsaUJBQWlCLEVBQUUs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QUNMLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSyxnRUFBeUIsR0FBakMsVUFBa0MscUJBQTZDO1lBQzNFLElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFO2dCQUMxQixJQUFJLENBQUMsbUJBQW1CLENBQUMscUJBQXFCLEdBQUcscUJBQXFCLENBQUM7YUFDMUU7UUFDTCxDQUFDO1FBRU8seURBQWtCLEdBQTFCLFVBQTJCLE1BQU0sRUFBRSxJQUFJO1lBRW5DLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN2RCxDQUFDO1FBQ0wsbUNBQUM7SUFBRCxDQUFDLEFBbEtELENBQTJDLG1CQUFRLEdBa0tsRDtJQUVRLG9FQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElUcmFjZUNvbmZpZ3VyYXRpb25WaWV3V2lkZ2V0IH0gZnJvbSBcIi4vaW50ZXJmYWNlcy90cmFjZUNvbmZpZ3VyYXRpb25WaWV3V2lkZ2V0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCAqIGFzIFdpZGdldHMgZnJvbSBcIi4uLy4uL3dpZGdldHMvd2lkZ2V0c1wiO1xyXG5pbXBvcnQgeyBQcm9wZXJ0eSB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvcHJvcGVydHlcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBJVHJhY2VDb21wb25lbnRDb250cm9sIH0gZnJvbSBcIi4uLy4uL21vZGVscy9kaWFnbm9zdGljcy90cmFjZS9pbnRlcmZhY2VzL3RyYWNlQ29udHJvbFByb3ZpZGVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0VHJhY2VDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2RpYWdub3N0aWNzL3RyYWNlL21hcHBDb2NrcGl0VHJhY2VDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgVmlld0Jhc2UgfSBmcm9tIFwiLi4vY29tbW9uL3ZpZXdCYXNlXCI7XHJcbmltcG9ydCB7IERlZmF1bHRDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuL2RlZmF1bHRDb21wb25lbnRTZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnRTZXR0aW5nc1wiO1xyXG5cclxuLyoqXHJcbiAqIGltcGxlbWVudHMgdGhlIHRyYWNlIGNvbmZpZ3VyYXRpb24gdmlldyB3aWRnZXRcclxuICpcclxuICogQGNsYXNzIFRyYWNlQ29uZmlndXJhdGlvblZpZXdXaWRnZXRcclxuICogQGV4dGVuZHMge1dpZGdldEJhc2V9XHJcbiAqL1xyXG5jbGFzcyBUcmFjZUNvbmZpZ3VyYXRpb25WaWV3V2lkZ2V0IGV4dGVuZHMgVmlld0Jhc2UgaW1wbGVtZW50cyBJVHJhY2VDb25maWd1cmF0aW9uVmlld1dpZGdldCB7XHJcblxyXG4gICAgcHJpdmF0ZSBfdHJhY2VDb250cm9sV2lkZ2V0ITogV2lkZ2V0cy5JVHJhY2VDb250cm9sV2lkZ2V0O1xyXG5cclxuICAgIHByaXZhdGUgX2FjdGl2ZUNvbXBvbmVudCE6IFByb3BlcnR5PE1hcHBDb2NrcGl0VHJhY2VDb21wb25lbnQ+O1xyXG4gICAgcHJpdmF0ZSBfbWVzc2FnZXNXaWRnZXQ6IFdpZGdldHMuSU1lc3NhZ2VzV2lkZ2V0IHwgdW5kZWZpbmVkO1xyXG5cclxuICAgIHByaXZhdGUgX2xheW91dFdpZGdldEFjdGl2YXRlZEhhbmRsZXIgPSAoc2VuZGVyLGFyZ3MpPT50aGlzLm9uQ29udGVudEFjdGl2YXRlZChzZW5kZXIsYXJncyk7XHJcblxyXG4gICAgaW5pdGlhbGl6ZUNvbXBvbmVudCgpe1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmRlZmF1bHRTZXR0aW5nc0RhdGFJZCA9IERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5XaWRnZXREZWZpbml0aW9uSWQ7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZGlzYWJsZVBlcnNpc3RpbmcoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IGNvbXBvbmVudCBzZXR0aW5ncyBmb3IgdGhpcyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7KENvbXBvbmVudFNldHRpbmdzfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWd1cmF0aW9uVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBnZXREZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MoKTogQ29tcG9uZW50U2V0dGluZ3N8dW5kZWZpbmVke1xyXG4gICAgICAgIHJldHVybiBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuZ2V0VHJhY2VDb25maWd1cmF0aW9uVmlld0RlZmluaXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgc29tZSBkZWZhdWx0IHBlcnNpc3RpbmcgZGF0YSBwYWNrYWdlcyBpbiB0aGUgbWFpbiBkZWZhdWx0IHBlcnNpc3RpbmcgZGF0YSBwcm92aWRlclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWd1cmF0aW9uVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBhZGRBZGRpdGlvbmFsRGVmYXVsdENvbXBvbmVudFNldHRpbmdzKCl7XHJcbiAgICAgICAgLy8gU3BsaXR0ZXIgZGVmaW5pdGlvbnMgIFxyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmFkZERlZmF1bHRDb21wb25lbnRTZXR0aW5nc1RvUHJvdmlkZXIoRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLk1haW5TcGxpdHRlckRlZmluaXRpb25JZCwgRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLmdldE1haW5TcGxpdHRlckRlZmluaXRpb24oKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSB3aWRnZXQgY29udGVudCBhbmQgZXZlbnR1YWxseSBzdWJ3aWRnZXRzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlndXJhdGlvblZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgaW5pdGlhbGl6ZWQoKSB7XHJcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZWQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0TGF5b3V0V2lkZ2V0KCk7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0VHJhY2VDb250cm9sV2lkZ2V0KCk7XHJcbiAgICAgICAgdGhpcy5zZXRNZXNzYWdlc1dpZGdldCgpO1xyXG5cclxuICAgICAgICAvLyBhdHRhY2ggbGF5b3V0IG9mIHRyYWNlQ29uZmlndXJhdGlvbldpZGdldCB0byB2aWV3XHJcbiAgICAgICAgdGhpcy5hdHRhY2hMYXlvdXRUb1ZpZXcoPGFueT50aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0TGF5b3V0V2lkZ2V0KCkge1xyXG4gICAgICAgIHRoaXMuX2xheW91dFdpZGdldCA9IHRoaXMuY29tcG9uZW50LmdldFN1YkNvbXBvbmVudChEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuU3BsaXR0ZXJXaWRnZXRUcmFjZUNvbmZpZ3VyYXRpb25WaWV3SWQpIGFzIFdpZGdldHMuSVNwbGl0dGVyV2lkZ2V0O1xyXG4gICAgICAgIHRoaXMuYXR0YWNoTGF5b3V0VG9WaWV3KDxhbnk+dGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMuX2xheW91dFdpZGdldC5pbml0aWFsaXplKHRoaXMucGFyZW50Q29udGVudElkKTtcclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQuZXZlbnRXaWRnZXRBY3RpdmF0ZWQuYXR0YWNoKHRoaXMuX2xheW91dFdpZGdldEFjdGl2YXRlZEhhbmRsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3Bvc2UoKXtcclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQhLmV2ZW50V2lkZ2V0QWN0aXZhdGVkLmRldGFjaCh0aGlzLl9sYXlvdXRXaWRnZXRBY3RpdmF0ZWRIYW5kbGVyKTtcclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQhLmRpc3Bvc2UoKTtcclxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBzZXQgdGhlIHRyYWNlIGNvbnRyb2wgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWd1cmF0aW9uVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBzZXRUcmFjZUNvbnRyb2xXaWRnZXQoKSB7XHJcbiAgICAgICAgdGhpcy5fdHJhY2VDb250cm9sV2lkZ2V0ID0gdGhpcy5nZXRXaWRnZXRCeUlkKERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5UcmFjZUNvbnRyb2xXaWRnZXRJZCkgYXMgV2lkZ2V0cy5JVHJhY2VDb250cm9sV2lkZ2V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogc2V0IHRoZSBtZXNzYWdlcyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ3VyYXRpb25WaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHNldE1lc3NhZ2VzV2lkZ2V0KCkge1xyXG4gICAgICAgIHRoaXMuX21lc3NhZ2VzV2lkZ2V0ID0gdGhpcy5nZXRXaWRnZXRCeUlkKERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5UcmFjZUNvbmZpZ3VyYXRpb25NZXNzYWdlc1dpZGdldElkKSBhcyBXaWRnZXRzLklNZXNzYWdlc1dpZGdldDtcclxuICAgIH1cclxuXHJcbiAgICAvKiogcmVzaXplcyB0aGUgdHJhY2UgY29uZmlndXJhdGlvbiB2aWV3IHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodFxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlndXJhdGlvblZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcmVzaXplKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKXtcclxuICAgICAgICB0aGlzLl9hY3R1YWxXaWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuX2FjdHVhbEhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLl9sYXlvdXRXaWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0IS5yZXNpemUod2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSAgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBhY3RpdmUgY29tcG9uZW50IHRvIGJlIGRpc3BsYXllZCBieSB0aGUgY29tcG9uZW50IHZpZXdcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWd1cmF0aW9uVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IGFjdGl2ZUNvbXBvbmVudChhY3RpdmVDb21wb25lbnQ6IFByb3BlcnR5PE1hcHBDb2NrcGl0VHJhY2VDb21wb25lbnQ+KSB7XHJcbiAgICAgICAgdGhpcy5fYWN0aXZlQ29tcG9uZW50ID0gYWN0aXZlQ29tcG9uZW50O1xyXG4gICAgICAgIHRoaXMuX2FjdGl2ZUNvbXBvbmVudC52YWx1ZS5pbml0aWFsaXplKCkudGhlbigoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RDb21wb25lbnQodGhpcy5fYWN0aXZlQ29tcG9uZW50LnZhbHVlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gICBcclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbm5lY3RzIHRoZSBhY3RpdmUgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnR9IGFjdGl2ZUNvbXBvbmVudFxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlndXJhdGlvblZpZXdXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb25uZWN0Q29tcG9uZW50KGFjdGl2ZUNvbXBvbmVudDogTWFwcENvY2twaXRUcmFjZUNvbXBvbmVudCkge1xyXG4gICAgICAgIGFjdGl2ZUNvbXBvbmVudC5tYXBwQ29ja3BpdENvbXBvbmVudC5jb21tYW5kQ29ubmVjdENvbXBvbmVudC5leGVjdXRlKG51bGwsICgpID0+IHtcclxuICAgICAgICAgICAgaWYoYWN0aXZlQ29tcG9uZW50Lm1hcHBDb2NrcGl0Q29tcG9uZW50LnBhcmFtZXRlcnNTb3VyY2UgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdE1lc3NhZ2VzV2lkZ2V0KGFjdGl2ZUNvbXBvbmVudC5tYXBwQ29ja3BpdENvbXBvbmVudC5tZXNzYWdlUGFyYW1ldGVyc1NvdXJjZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoYWN0aXZlQ29tcG9uZW50LnRyYWNlQ29udHJvbEludGVyZmFjZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0VHJhY2VDb250cm9sV2lkZ2V0KGFjdGl2ZUNvbXBvbmVudC50cmFjZUNvbnRyb2xJbnRlcmZhY2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAgIENvbm5lY3RzIHRoZSBtZXNzYWdlcyB3aWRnZXQgdG8gdGhlIGNvbXBvbmVudCBwYXJhbWV0ZXJzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtQcm9wZXJ0eTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdPn0gcGFyYW1ldGVyc1NvdXJjZVxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWd1cmF0aW9uVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbm5lY3RNZXNzYWdlc1dpZGdldChjb21wb25lbnRQYXJhbWV0ZXJzTGluazogUHJvcGVydHk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXT4pOiBhbnkge1xyXG4gICAgICAgIGlmICh0aGlzLl9tZXNzYWdlc1dpZGdldCkge1xyXG4gICAgICAgICAgICB0aGlzLl9tZXNzYWdlc1dpZGdldC5tZXNzYWdlUGFyYW1ldGVycyA9IGNvbXBvbmVudFBhcmFtZXRlcnNMaW5rO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICAgQ29ubmVjdHMgdGhlIHRyYWNlIGNvbnRyb2wgd2lkZ2V0IHRvIHRoZSB0cmFjZSBjb250cm9sIHByb3ZpZGVyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJVHJhY2VDb21wb25lbnRDb250cm9sfSB0cmFjZUNvbnRyb2xQcm92aWRlclxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJhY2VDb25maWd1cmF0aW9uVmlld1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbm5lY3RUcmFjZUNvbnRyb2xXaWRnZXQodHJhY2VDb21wb25lbnRDb250cm9sOiBJVHJhY2VDb21wb25lbnRDb250cm9sKTogYW55IHtcclxuICAgICAgICBpZiAodGhpcy5fdHJhY2VDb250cm9sV2lkZ2V0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RyYWNlQ29udHJvbFdpZGdldC50cmFjZUNvbnRyb2xJbnRlcmZhY2UgPSB0cmFjZUNvbXBvbmVudENvbnRyb2w7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIG9uQ29udGVudEFjdGl2YXRlZChzZW5kZXIsIGFyZ3MpIHtcclxuXHJcbiAgICAgICAgYXJncy53aWRnZXQuYWN0aXZhdGUoKTtcclxuICAgICAgICB0aGlzLnJlc2l6ZSh0aGlzLl9hY3R1YWxXaWR0aCwgdGhpcy5fYWN0dWFsSGVpZ2h0KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgVHJhY2VDb25maWd1cmF0aW9uVmlld1dpZGdldCB9OyJdfQ==