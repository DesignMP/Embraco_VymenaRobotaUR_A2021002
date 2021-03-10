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
     * @extends {WidgetBase}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VPdmVydmlld1dpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy90cmFjZU92ZXJ2aWV3V2lkZ2V0L3RyYWNlT3ZlcnZpZXdXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVNBO1FBQTRCLGlDQUFtQztRQUEvRDs7UUFBaUUsQ0FBQztRQUFELG9CQUFDO0lBQUQsQ0FBQyxBQUFsRSxDQUE0QixtQkFBVSxHQUE0QjtJQUFBLENBQUM7SUFFbkU7Ozs7O09BS0c7SUFDSDtRQUFrQyx1Q0FBMEI7UUFBNUQ7WUFBQSxxRUF3RkM7WUF0RkcsbUJBQWEsR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDO1lBSzVCLGlCQUFXLEdBQWdELG1CQUFRLENBQUMsTUFBTSxDQUFtQyxFQUFFLENBQUMsQ0FBQzs7UUFpRjdILENBQUM7UUEvRWEsMkNBQWEsR0FBdkI7WUFDSSxPQUFPLGdCQUFnQixDQUFDO1FBQzVCLENBQUM7UUFFRCxzQkFBVywyQ0FBVTtpQkFPckI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFBO1lBQzNCLENBQUM7aUJBVEQsVUFBc0IsVUFBdUQ7Z0JBQ3pFLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO2dCQUM5QixJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQ25DLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO2lCQUNsQztZQUNMLENBQUM7OztXQUFBO1FBTUQsc0NBQVEsR0FBUjtZQUNJLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1FBQ25DLENBQUM7UUFFTyxxREFBdUIsR0FBL0I7WUFDSSxJQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxJQUFJLFNBQVMsRUFBQztnQkFDbEMsT0FBTzthQUNWO1lBRUQsSUFBRyxJQUFJLENBQUMsa0JBQWtCLElBQUksRUFBRSxFQUFDO2dCQUN2QixDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFFLENBQUMsVUFBVSxDQUFDO29CQUN6QyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLO2lCQUNwQyxDQUFDLENBQUM7YUFDTjtRQUNMLENBQUM7UUFFUyx5REFBMkIsR0FBckM7WUFDSSxPQUFPO2dCQUNILE9BQU8sRUFBRTtvQkFDTCxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLG1CQUFtQixDQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO29CQUNsRixFQUFFLEtBQUssRUFBRSxnQkFBZ0IsRUFBRSxVQUFVLEVBQUUsbUJBQW1CLENBQUMsY0FBYyxFQUFFO2lCQUM5RTthQUNKLENBQUM7UUFDTixDQUFDO1FBRVMsaURBQW1CLEdBQTdCLFVBQThCLFNBQWlCO1lBQzNDLE9BQU8sMkJBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMvQixDQUFDO1FBRVMsaURBQW1CLEdBQTdCLFVBQThCLFNBQWlCO1lBQzNDLE9BQU8sbUNBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsaUJBQWlCLENBQWdCLFNBQVMsQ0FBQyxDQUFDO1FBQ3RGLENBQUM7UUFFUyxtREFBcUIsR0FBL0IsVUFBZ0MsSUFBSTtZQUNoQyxJQUFJLFNBQVMsR0FBeUIsSUFBSSxDQUFDO1lBQzNDLDBDQUEwQztZQUMxQyxJQUFJLGNBQWMsR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO1lBQ2pDLGNBQWMsQ0FBQyxJQUFJLENBQUMsMkJBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUM1QyxjQUFjLENBQUMsSUFBSSxDQUFDLDJCQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdkMsT0FBTyxjQUFjLENBQUM7UUFDMUIsQ0FBQztRQUVPLDREQUE4QixHQUF0QyxVQUF1QyxTQUErQjtZQUNqRSx1Q0FBdUM7WUFDeEMsT0FBTywyQkFBUSxDQUFDLFFBQVEsQ0FBQztRQUM3QixDQUFDO1FBRVMsbUNBQUssR0FBZixVQUFnQixJQUFJLEVBQUUsU0FBUztZQUMzQixJQUFJLFNBQVMsR0FBeUIsSUFBSSxDQUFDO1lBQzNDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzFDLENBQUM7UUFFUyx5Q0FBVyxHQUFyQixVQUFzQixJQUFJO1lBQ3RCLElBQUcsSUFBSSxDQUFDLFVBQVUsSUFBSSxtQkFBbUIsQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLElBQUksU0FBUyxFQUFDO2dCQUN6RixJQUFJLFNBQVMsR0FBeUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDO2dCQUNuRSxJQUFJLG1CQUFtQixHQUFHLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxTQUFTLENBQUMsQ0FBQTtnQkFDeEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsbUJBQW1CLENBQUMsQ0FBQzthQUNuRDtRQUNMLENBQUM7UUFFTyx3Q0FBVSxHQUFsQixVQUFtQixTQUE4QixFQUFFLFlBQXFCO1lBQ3BFLElBQUksU0FBUyxHQUFHLElBQUkscUNBQWlCLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxZQUFZLENBQUMsQ0FBQTtZQUNwRSxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDOUMsQ0FBQztRQW5GYSw4QkFBVSxHQUFHLE1BQU0sQ0FBQztRQUNwQixrQ0FBYyxHQUFHLFdBQVcsQ0FBQztRQW1GL0MsMEJBQUM7S0FBQSxBQXhGRCxDQUFrQyx1REFBMEIsR0F3RjNEO0lBRVEsa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVRyYWNlT3ZlcnZpZXdXaWRnZXQgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL3RyYWNlT3ZlcnZpZXdXaWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgT3ZlcnZpZXdUcmVlR3JpZFdpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL292ZXJ2aWV3VHJlZUdyaWRXaWRnZXRCYXNlXCI7XHJcbmltcG9ydCB7IFR5cGVkRXZlbnQgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2V2ZW50c1wiO1xyXG5pbXBvcnQgeyBFdmVudE9wZW5WaWV3QXJncyB9IGZyb20gXCIuLi9jb21tb24vZXZlbnRPcGVuVmlld0FyZ3NcIjtcclxuaW1wb3J0IHsgUHJvcGVydHkgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL3Byb3BlcnR5XCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9vbmxpbmUvbWFwcENvY2twaXRDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgVmlld1R5cGUsIFZpZXdUeXBlUHJvdmlkZXIgfSBmcm9tIFwiLi4vY29tbW9uL3ZpZXdUeXBlUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRUcmFjZUNvbXBvbmVudCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvZGlhZ25vc3RpY3MvdHJhY2UvbWFwcENvY2twaXRUcmFjZUNvbXBvbmVudFwiO1xyXG5cclxuY2xhc3MgRXZlbnRPcGVuVmlldyBleHRlbmRzIFR5cGVkRXZlbnQ8bnVsbCwgRXZlbnRPcGVuVmlld0FyZ3M+eyB9O1xyXG5cclxuLyoqXHJcbiAqIGltcGxlbWVudHMgdGhlIFRyYWNlT3ZlcnZpZXdXaWRnZXRcclxuICpcclxuICogQGNsYXNzIFRyYWNlT3ZlcnZpZXdXaWRnZXRcclxuICogQGV4dGVuZHMge1dpZGdldEJhc2V9XHJcbiAqL1xyXG5jbGFzcyBUcmFjZU92ZXJ2aWV3V2lkZ2V0IGV4dGVuZHMgT3ZlcnZpZXdUcmVlR3JpZFdpZGdldEJhc2UgaW1wbGVtZW50cyBJVHJhY2VPdmVydmlld1dpZGdldCB7XHJcblxyXG4gICAgZXZlbnRPcGVuVmlldyA9IG5ldyBFdmVudE9wZW5WaWV3KCk7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBjb2x1bW5OYW1lID0gXCJOYW1lXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIGNvbHVtbk9wZW5WaWV3ID0gXCJPcGVuIFZpZXdcIjtcclxuXHJcbiAgICBwcml2YXRlIF9jb21wb25lbnRzOiAgUHJvcGVydHk8QXJyYXk8TWFwcENvY2twaXRUcmFjZUNvbXBvbmVudD4+ID0gUHJvcGVydHkuY3JlYXRlPEFycmF5PE1hcHBDb2NrcGl0VHJhY2VDb21wb25lbnQ+PihbXSk7XHJcblxyXG4gICAgcHJvdGVjdGVkIGdldEhlYWRlclRleHQoKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiBcIlRyYWNlIE92ZXJ2aWV3XCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBjb21wb25lbnRzKGNvbXBvbmVudHMgOiBQcm9wZXJ0eTxBcnJheTxNYXBwQ29ja3BpdFRyYWNlQ29tcG9uZW50Pj4pIHtcclxuICAgICAgICB0aGlzLl9jb21wb25lbnRzID0gY29tcG9uZW50cztcclxuICAgICAgICBpZiAodGhpcy5fY29tcG9uZW50cy52YWx1ZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVHJhY2VPdmVydmlld0RhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBnZXQgY29tcG9uZW50cygpIDogUHJvcGVydHk8QXJyYXk8TWFwcENvY2twaXRUcmFjZUNvbXBvbmVudD4+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29tcG9uZW50c1xyXG4gICAgfVxyXG5cclxuICAgIGFjdGl2YXRlKCl7XHJcbiAgICAgICAgdGhpcy51cGRhdGVUcmFjZU92ZXJ2aWV3RGF0YSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlVHJhY2VPdmVydmlld0RhdGEoKSB7XHJcbiAgICAgICAgaWYodGhpcy5jb21wb25lbnRzLnZhbHVlID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMuY3NzUGFyZW50Q29udGVudElkICE9IFwiXCIpe1xyXG4gICAgICAgICAgICAoPGFueT4kKHRoaXMuY3NzUGFyZW50Q29udGVudElkKSkuZWpUcmVlR3JpZCh7XHJcbiAgICAgICAgICAgICAgICBkYXRhU291cmNlOiB0aGlzLmNvbXBvbmVudHMudmFsdWUsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCk6IHt9e1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNvbHVtbnM6IFtcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwiZGlzcGxheU5hbWVcIiwgaGVhZGVyVGV4dDogVHJhY2VPdmVydmlld1dpZGdldC5jb2x1bW5OYW1lLCB3aWR0aDogXCIzNTBcIiB9LFxyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJjb21tYW5kQnV0dG9uc1wiLCBoZWFkZXJUZXh0OiBUcmFjZU92ZXJ2aWV3V2lkZ2V0LmNvbHVtbk9wZW5WaWV3IH0sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZ2V0TmFtZUZvckNvbW1hbmRJZChjb21tYW5kSWQ6IHN0cmluZyk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gVmlld1R5cGVbY29tbWFuZElkXTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZ2V0SWNvbkZvckNvbW1hbmRJZChjb21tYW5kSWQ6IHN0cmluZykgOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIFZpZXdUeXBlUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXRJY29uQnlWaWV3VHlwZSg8Vmlld1R5cGU+PGFueT5jb21tYW5kSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBnZXRDb21tYW5kSWRzRnJvbUl0ZW0oaXRlbSk6IEFycmF5PHN0cmluZz57XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudDogTWFwcENvY2twaXRDb21wb25lbnQgPSBpdGVtO1xyXG4gICAgICAgIC8vIFRPRE8gZ2V0IGF2YWlsYWJsZSB2aWV3cyBmcm9tIGNvbXBvbmVudFxyXG4gICAgICAgIGxldCBhdmFpbGFibGVWaWV3cyA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgIGF2YWlsYWJsZVZpZXdzLnB1c2goVmlld1R5cGUuQ29uZmlndXJhdGlvbik7XHJcbiAgICAgICAgYXZhaWxhYmxlVmlld3MucHVzaChWaWV3VHlwZS5BbmFseXNpcyk7XHJcbiAgICAgICAgcmV0dXJuIGF2YWlsYWJsZVZpZXdzO1xyXG4gICAgfSAgXHJcblxyXG4gICAgcHJpdmF0ZSBnZXREZWZhdWx0Q29tbWFuZEZyb21Db21wb25lbnQoY29tcG9uZW50OiBNYXBwQ29ja3BpdENvbXBvbmVudCk6IFZpZXdUeXBle1xyXG4gICAgICAgICAvLyBUT0RPIGdldCBkZWZhdWx0IHZpZXcgZnJvbSBjb21wb25lbnRcclxuICAgICAgICByZXR1cm4gVmlld1R5cGUuQW5hbHlzaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGNsaWNrKGl0ZW0sIGNvbW1hbmRJZCl7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudDogTWFwcENvY2twaXRDb21wb25lbnQgPSBpdGVtO1xyXG4gICAgICAgIHRoaXMub25PcGVuVmlldyhjb21wb25lbnQsIGNvbW1hbmRJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGRvdWJsZUNsaWNrKGFyZ3Mpe1xyXG4gICAgICAgIGlmKGFyZ3MuY29sdW1uTmFtZSA9PSBUcmFjZU92ZXJ2aWV3V2lkZ2V0LmNvbHVtbk5hbWUgJiYgYXJncy5tb2RlbC5zZWxlY3RlZEl0ZW0gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgbGV0IGNvbXBvbmVudDogTWFwcENvY2twaXRDb21wb25lbnQgPSBhcmdzLm1vZGVsLnNlbGVjdGVkSXRlbS5pdGVtO1xyXG4gICAgICAgICAgICBsZXQgZGVmYXVsdE9wZW5WaWV3VHlwZSA9IHRoaXMuZ2V0RGVmYXVsdENvbW1hbmRGcm9tQ29tcG9uZW50KGNvbXBvbmVudClcclxuICAgICAgICAgICAgdGhpcy5vbk9wZW5WaWV3KGNvbXBvbmVudCwgZGVmYXVsdE9wZW5WaWV3VHlwZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25PcGVuVmlldyhjb21wb25lbnQ6TWFwcENvY2twaXRDb21wb25lbnQsIG9wZW5WaWV3VHlwZTpWaWV3VHlwZSkge1xyXG4gICAgICAgIGxldCBldmVudEFyZ3MgPSBuZXcgRXZlbnRPcGVuVmlld0FyZ3ModGhpcywgY29tcG9uZW50LCBvcGVuVmlld1R5cGUpXHJcbiAgICAgICAgdGhpcy5ldmVudE9wZW5WaWV3LnJhaXNlKG51bGwsIGV2ZW50QXJncyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IFRyYWNlT3ZlcnZpZXdXaWRnZXQgfTsiXX0=