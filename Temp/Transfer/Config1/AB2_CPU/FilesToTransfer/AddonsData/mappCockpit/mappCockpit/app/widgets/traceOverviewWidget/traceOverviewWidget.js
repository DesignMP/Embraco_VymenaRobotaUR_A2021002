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
define(["require", "exports", "../common/overviewTreeGridWidgetBase", "../../framework/events", "../common/eventOpenViewArgs", "../../framework/property", "../common/viewTypeProvider"], function (require, exports, overviewTreeGridWidgetBase_1, events_1, eventOpenViewArgs_1, property_1, viewTypeProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventOpenView = /** @class */ (function (_super) {
        __extends(EventOpenView, _super);
        function EventOpenView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventOpenView;
    }(events_1.TypedEvent));
    ;
    /**
     * implements the TraceOverviewWidget
     *
     * @class TraceOverviewWidget
     * @extends {OverviewTreeGridWidgetBase}
     * @implements {ITraceOverviewWidget}
     */
    var TraceOverviewWidget = /** @class */ (function (_super) {
        __extends(TraceOverviewWidget, _super);
        function TraceOverviewWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.eventOpenView = new EventOpenView();
            _this._components = property_1.Property.create([]);
            return _this;
        }
        TraceOverviewWidget.prototype.getHeaderText = function () {
            return "Trace Overview";
        };
        Object.defineProperty(TraceOverviewWidget.prototype, "components", {
            get: function () {
                return this._components;
            },
            set: function (components) {
                this._components = components;
                if (this._components.value.length > 0) {
                    this.updateTraceOverviewData();
                }
            },
            enumerable: true,
            configurable: true
        });
        TraceOverviewWidget.prototype.activate = function () {
            this.updateTraceOverviewData();
        };
        TraceOverviewWidget.prototype.updateTraceOverviewData = function () {
            if (this.components.value == undefined) {
                return;
            }
            if (this.cssParentContentId != "") {
                $(this.cssParentContentId).ejTreeGrid({
                    dataSource: this.components.value,
                });
            }
        };
        TraceOverviewWidget.prototype.getTreeGridColumnDefinition = function () {
            return {
                columns: [
                    { field: "displayName", headerText: TraceOverviewWidget.columnName, width: "350" },
                    { field: "commandButtons", headerText: TraceOverviewWidget.columnOpenView },
                ],
            };
        };
        TraceOverviewWidget.prototype.getNameForCommandId = function (commandId) {
            return viewTypeProvider_1.ViewType[commandId];
        };
        TraceOverviewWidget.prototype.getIconForCommandId = function (commandId) {
            return viewTypeProvider_1.ViewTypeProvider.getInstance().getIconByViewType(commandId);
        };
        TraceOverviewWidget.prototype.getCommandIdsFromItem = function (item) {
            var component = item;
            // TODO get available views from component
            var availableViews = new Array();
            availableViews.push(viewTypeProvider_1.ViewType.Configuration);
            availableViews.push(viewTypeProvider_1.ViewType.Analysis);
            return availableViews;
        };
        TraceOverviewWidget.prototype.getDefaultCommandFromComponent = function (component) {
            // TODO get default view from component
            return viewTypeProvider_1.ViewType.Analysis;
        };
        TraceOverviewWidget.prototype.click = function (item, commandId) {
            var component = item;
            this.onOpenView(component, commandId);
        };
        TraceOverviewWidget.prototype.doubleClick = function (args) {
            if (args.columnName == TraceOverviewWidget.columnName && args.model.selectedItem != undefined) {
                var component = args.model.selectedItem.item;
                var defaultOpenViewType = this.getDefaultCommandFromComponent(component);
                this.onOpenView(component, defaultOpenViewType);
            }
        };
        TraceOverviewWidget.prototype.onOpenView = function (component, openViewType) {
            var eventArgs = new eventOpenViewArgs_1.EventOpenViewArgs(this, component, openViewType);
            this.eventOpenView.raise(null, eventArgs);
        };
        TraceOverviewWidget.columnName = "Name";
        TraceOverviewWidget.columnOpenView = "Open View";
        return TraceOverviewWidget;
    }(overviewTreeGridWidgetBase_1.OverviewTreeGridWidgetBase));
    exports.TraceOverviewWidget = TraceOverviewWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VPdmVydmlld1dpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy90cmFjZU92ZXJ2aWV3V2lkZ2V0L3RyYWNlT3ZlcnZpZXdXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVNBO1FBQTRCLGlDQUFtQztRQUEvRDs7UUFBaUUsQ0FBQztRQUFELG9CQUFDO0lBQUQsQ0FBQyxBQUFsRSxDQUE0QixtQkFBVSxHQUE0QjtJQUFBLENBQUM7SUFFbkU7Ozs7OztPQU1HO0lBQ0g7UUFBa0MsdUNBQTBCO1FBQTVEO1lBQUEscUVBd0ZDO1lBdEZHLG1CQUFhLEdBQUcsSUFBSSxhQUFhLEVBQUUsQ0FBQztZQUs1QixpQkFBVyxHQUFnRCxtQkFBUSxDQUFDLE1BQU0sQ0FBbUMsRUFBRSxDQUFDLENBQUM7O1FBaUY3SCxDQUFDO1FBL0VhLDJDQUFhLEdBQXZCO1lBQ0ksT0FBTyxnQkFBZ0IsQ0FBQztRQUM1QixDQUFDO1FBRUQsc0JBQVcsMkNBQVU7aUJBT3JCO2dCQUNJLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQTtZQUMzQixDQUFDO2lCQVRELFVBQXNCLFVBQXVEO2dCQUN6RSxJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztnQkFDOUIsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUNuQyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztpQkFDbEM7WUFDTCxDQUFDOzs7V0FBQTtRQU1ELHNDQUFRLEdBQVI7WUFDSSxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztRQUNuQyxDQUFDO1FBRU8scURBQXVCLEdBQS9CO1lBQ0ksSUFBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssSUFBSSxTQUFTLEVBQUM7Z0JBQ2xDLE9BQU87YUFDVjtZQUVELElBQUcsSUFBSSxDQUFDLGtCQUFrQixJQUFJLEVBQUUsRUFBQztnQkFDdkIsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBRSxDQUFDLFVBQVUsQ0FBQztvQkFDekMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSztpQkFDcEMsQ0FBQyxDQUFDO2FBQ047UUFDTCxDQUFDO1FBRVMseURBQTJCLEdBQXJDO1lBQ0ksT0FBTztnQkFDSCxPQUFPLEVBQUU7b0JBQ0wsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLFVBQVUsRUFBRSxtQkFBbUIsQ0FBQyxVQUFVLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtvQkFDbEYsRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsVUFBVSxFQUFFLG1CQUFtQixDQUFDLGNBQWMsRUFBRTtpQkFDOUU7YUFDSixDQUFDO1FBQ04sQ0FBQztRQUVTLGlEQUFtQixHQUE3QixVQUE4QixTQUFpQjtZQUMzQyxPQUFPLDJCQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDL0IsQ0FBQztRQUVTLGlEQUFtQixHQUE3QixVQUE4QixTQUFpQjtZQUMzQyxPQUFPLG1DQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLGlCQUFpQixDQUFnQixTQUFTLENBQUMsQ0FBQztRQUN0RixDQUFDO1FBRVMsbURBQXFCLEdBQS9CLFVBQWdDLElBQUk7WUFDaEMsSUFBSSxTQUFTLEdBQXlCLElBQUksQ0FBQztZQUMzQywwQ0FBMEM7WUFDMUMsSUFBSSxjQUFjLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztZQUNqQyxjQUFjLENBQUMsSUFBSSxDQUFDLDJCQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDNUMsY0FBYyxDQUFDLElBQUksQ0FBQywyQkFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3ZDLE9BQU8sY0FBYyxDQUFDO1FBQzFCLENBQUM7UUFFTyw0REFBOEIsR0FBdEMsVUFBdUMsU0FBK0I7WUFDakUsdUNBQXVDO1lBQ3hDLE9BQU8sMkJBQVEsQ0FBQyxRQUFRLENBQUM7UUFDN0IsQ0FBQztRQUVTLG1DQUFLLEdBQWYsVUFBZ0IsSUFBSSxFQUFFLFNBQVM7WUFDM0IsSUFBSSxTQUFTLEdBQXlCLElBQUksQ0FBQztZQUMzQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUMxQyxDQUFDO1FBRVMseUNBQVcsR0FBckIsVUFBc0IsSUFBSTtZQUN0QixJQUFHLElBQUksQ0FBQyxVQUFVLElBQUksbUJBQW1CLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxJQUFJLFNBQVMsRUFBQztnQkFDekYsSUFBSSxTQUFTLEdBQXlCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQztnQkFDbkUsSUFBSSxtQkFBbUIsR0FBRyxJQUFJLENBQUMsOEJBQThCLENBQUMsU0FBUyxDQUFDLENBQUE7Z0JBQ3hFLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLG1CQUFtQixDQUFDLENBQUM7YUFDbkQ7UUFDTCxDQUFDO1FBRU8sd0NBQVUsR0FBbEIsVUFBbUIsU0FBOEIsRUFBRSxZQUFxQjtZQUNwRSxJQUFJLFNBQVMsR0FBRyxJQUFJLHFDQUFpQixDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUE7WUFDcEUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzlDLENBQUM7UUFuRmEsOEJBQVUsR0FBRyxNQUFNLENBQUM7UUFDcEIsa0NBQWMsR0FBRyxXQUFXLENBQUM7UUFtRi9DLDBCQUFDO0tBQUEsQUF4RkQsQ0FBa0MsdURBQTBCLEdBd0YzRDtJQUVRLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElUcmFjZU92ZXJ2aWV3V2lkZ2V0IH0gZnJvbSBcIi4vaW50ZXJmYWNlcy90cmFjZU92ZXJ2aWV3V2lkZ2V0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IE92ZXJ2aWV3VHJlZUdyaWRXaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi9vdmVydmlld1RyZWVHcmlkV2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBUeXBlZEV2ZW50IH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9ldmVudHNcIjtcclxuaW1wb3J0IHsgRXZlbnRPcGVuVmlld0FyZ3MgfSBmcm9tIFwiLi4vY29tbW9uL2V2ZW50T3BlblZpZXdBcmdzXCI7XHJcbmltcG9ydCB7IFByb3BlcnR5IH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9wcm9wZXJ0eVwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFZpZXdUeXBlLCBWaWV3VHlwZVByb3ZpZGVyIH0gZnJvbSBcIi4uL2NvbW1vbi92aWV3VHlwZVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0VHJhY2VDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2RpYWdub3N0aWNzL3RyYWNlL21hcHBDb2NrcGl0VHJhY2VDb21wb25lbnRcIjtcclxuXHJcbmNsYXNzIEV2ZW50T3BlblZpZXcgZXh0ZW5kcyBUeXBlZEV2ZW50PG51bGwsIEV2ZW50T3BlblZpZXdBcmdzPnsgfTtcclxuXHJcbi8qKlxyXG4gKiBpbXBsZW1lbnRzIHRoZSBUcmFjZU92ZXJ2aWV3V2lkZ2V0XHJcbiAqXHJcbiAqIEBjbGFzcyBUcmFjZU92ZXJ2aWV3V2lkZ2V0XHJcbiAqIEBleHRlbmRzIHtPdmVydmlld1RyZWVHcmlkV2lkZ2V0QmFzZX1cclxuICogQGltcGxlbWVudHMge0lUcmFjZU92ZXJ2aWV3V2lkZ2V0fVxyXG4gKi9cclxuY2xhc3MgVHJhY2VPdmVydmlld1dpZGdldCBleHRlbmRzIE92ZXJ2aWV3VHJlZUdyaWRXaWRnZXRCYXNlIGltcGxlbWVudHMgSVRyYWNlT3ZlcnZpZXdXaWRnZXQge1xyXG5cclxuICAgIGV2ZW50T3BlblZpZXcgPSBuZXcgRXZlbnRPcGVuVmlldygpO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY29sdW1uTmFtZSA9IFwiTmFtZVwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBjb2x1bW5PcGVuVmlldyA9IFwiT3BlbiBWaWV3XCI7XHJcblxyXG4gICAgcHJpdmF0ZSBfY29tcG9uZW50czogIFByb3BlcnR5PEFycmF5PE1hcHBDb2NrcGl0VHJhY2VDb21wb25lbnQ+PiA9IFByb3BlcnR5LmNyZWF0ZTxBcnJheTxNYXBwQ29ja3BpdFRyYWNlQ29tcG9uZW50Pj4oW10pO1xyXG5cclxuICAgIHByb3RlY3RlZCBnZXRIZWFkZXJUZXh0KCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gXCJUcmFjZSBPdmVydmlld1wiO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgY29tcG9uZW50cyhjb21wb25lbnRzIDogUHJvcGVydHk8QXJyYXk8TWFwcENvY2twaXRUcmFjZUNvbXBvbmVudD4+KSB7XHJcbiAgICAgICAgdGhpcy5fY29tcG9uZW50cyA9IGNvbXBvbmVudHM7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NvbXBvbmVudHMudmFsdWUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVRyYWNlT3ZlcnZpZXdEYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgZ2V0IGNvbXBvbmVudHMoKSA6IFByb3BlcnR5PEFycmF5PE1hcHBDb2NrcGl0VHJhY2VDb21wb25lbnQ+PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbXBvbmVudHNcclxuICAgIH1cclxuXHJcbiAgICBhY3RpdmF0ZSgpe1xyXG4gICAgICAgIHRoaXMudXBkYXRlVHJhY2VPdmVydmlld0RhdGEoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZVRyYWNlT3ZlcnZpZXdEYXRhKCkge1xyXG4gICAgICAgIGlmKHRoaXMuY29tcG9uZW50cy52YWx1ZSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLmNzc1BhcmVudENvbnRlbnRJZCAhPSBcIlwiKXtcclxuICAgICAgICAgICAgKDxhbnk+JCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCkpLmVqVHJlZUdyaWQoe1xyXG4gICAgICAgICAgICAgICAgZGF0YVNvdXJjZTogdGhpcy5jb21wb25lbnRzLnZhbHVlLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGdldFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbigpOiB7fXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjb2x1bW5zOiBbXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcImRpc3BsYXlOYW1lXCIsIGhlYWRlclRleHQ6IFRyYWNlT3ZlcnZpZXdXaWRnZXQuY29sdW1uTmFtZSwgd2lkdGg6IFwiMzUwXCIgfSxcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwiY29tbWFuZEJ1dHRvbnNcIiwgaGVhZGVyVGV4dDogVHJhY2VPdmVydmlld1dpZGdldC5jb2x1bW5PcGVuVmlldyB9LFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGdldE5hbWVGb3JDb21tYW5kSWQoY29tbWFuZElkOiBzdHJpbmcpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIFZpZXdUeXBlW2NvbW1hbmRJZF07XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGdldEljb25Gb3JDb21tYW5kSWQoY29tbWFuZElkOiBzdHJpbmcpIDogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiBWaWV3VHlwZVByb3ZpZGVyLmdldEluc3RhbmNlKCkuZ2V0SWNvbkJ5Vmlld1R5cGUoPFZpZXdUeXBlPjxhbnk+Y29tbWFuZElkKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZ2V0Q29tbWFuZElkc0Zyb21JdGVtKGl0ZW0pOiBBcnJheTxzdHJpbmc+e1xyXG4gICAgICAgIGxldCBjb21wb25lbnQ6IE1hcHBDb2NrcGl0Q29tcG9uZW50ID0gaXRlbTtcclxuICAgICAgICAvLyBUT0RPIGdldCBhdmFpbGFibGUgdmlld3MgZnJvbSBjb21wb25lbnRcclxuICAgICAgICBsZXQgYXZhaWxhYmxlVmlld3MgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICBhdmFpbGFibGVWaWV3cy5wdXNoKFZpZXdUeXBlLkNvbmZpZ3VyYXRpb24pO1xyXG4gICAgICAgIGF2YWlsYWJsZVZpZXdzLnB1c2goVmlld1R5cGUuQW5hbHlzaXMpO1xyXG4gICAgICAgIHJldHVybiBhdmFpbGFibGVWaWV3cztcclxuICAgIH0gIFxyXG5cclxuICAgIHByaXZhdGUgZ2V0RGVmYXVsdENvbW1hbmRGcm9tQ29tcG9uZW50KGNvbXBvbmVudDogTWFwcENvY2twaXRDb21wb25lbnQpOiBWaWV3VHlwZXtcclxuICAgICAgICAgLy8gVE9ETyBnZXQgZGVmYXVsdCB2aWV3IGZyb20gY29tcG9uZW50XHJcbiAgICAgICAgcmV0dXJuIFZpZXdUeXBlLkFuYWx5c2lzO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBjbGljayhpdGVtLCBjb21tYW5kSWQpe1xyXG4gICAgICAgIGxldCBjb21wb25lbnQ6IE1hcHBDb2NrcGl0Q29tcG9uZW50ID0gaXRlbTtcclxuICAgICAgICB0aGlzLm9uT3BlblZpZXcoY29tcG9uZW50LCBjb21tYW5kSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBkb3VibGVDbGljayhhcmdzKXtcclxuICAgICAgICBpZihhcmdzLmNvbHVtbk5hbWUgPT0gVHJhY2VPdmVydmlld1dpZGdldC5jb2x1bW5OYW1lICYmIGFyZ3MubW9kZWwuc2VsZWN0ZWRJdGVtICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGxldCBjb21wb25lbnQ6IE1hcHBDb2NrcGl0Q29tcG9uZW50ID0gYXJncy5tb2RlbC5zZWxlY3RlZEl0ZW0uaXRlbTtcclxuICAgICAgICAgICAgbGV0IGRlZmF1bHRPcGVuVmlld1R5cGUgPSB0aGlzLmdldERlZmF1bHRDb21tYW5kRnJvbUNvbXBvbmVudChjb21wb25lbnQpXHJcbiAgICAgICAgICAgIHRoaXMub25PcGVuVmlldyhjb21wb25lbnQsIGRlZmF1bHRPcGVuVmlld1R5cGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uT3BlblZpZXcoY29tcG9uZW50Ok1hcHBDb2NrcGl0Q29tcG9uZW50LCBvcGVuVmlld1R5cGU6Vmlld1R5cGUpIHtcclxuICAgICAgICBsZXQgZXZlbnRBcmdzID0gbmV3IEV2ZW50T3BlblZpZXdBcmdzKHRoaXMsIGNvbXBvbmVudCwgb3BlblZpZXdUeXBlKVxyXG4gICAgICAgIHRoaXMuZXZlbnRPcGVuVmlldy5yYWlzZShudWxsLCBldmVudEFyZ3MpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBUcmFjZU92ZXJ2aWV3V2lkZ2V0IH07Il19