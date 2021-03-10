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
define(["require", "exports", "../../framework/events", "../common/eventOpenViewArgs", "../../framework/property", "../common/viewTypeProvider", "../common/overviewTreeGridWidgetBase"], function (require, exports, events_1, eventOpenViewArgs_1, property_1, viewTypeProvider_1, overviewTreeGridWidgetBase_1) {
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
     * implements the ComponentOverviewWidget
     *
     * @class ComponentOverviewWidget
     * @extends {WidgetBase}
     */
    var ComponentOverviewWidget = /** @class */ (function (_super) {
        __extends(ComponentOverviewWidget, _super);
        function ComponentOverviewWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.eventOpenView = new EventOpenView();
            _this._components = property_1.Property.create([]);
            return _this;
        }
        ComponentOverviewWidget.prototype.getHeaderText = function () {
            return "Component Overview";
        };
        Object.defineProperty(ComponentOverviewWidget.prototype, "components", {
            get: function () {
                return this._components;
            },
            set: function (components) {
                var _this = this;
                this._components = components;
                this._components.changed(function (components) {
                    _this.updateComponentOverviewData();
                });
            },
            enumerable: true,
            configurable: true
        });
        ComponentOverviewWidget.prototype.activate = function () {
            this.updateComponentOverviewData();
        };
        ComponentOverviewWidget.prototype.updateComponentOverviewData = function () {
            if (this.cssParentContentId != "") {
                $(this.cssParentContentId).ejTreeGrid({
                    dataSource: this.components.value,
                });
            }
        };
        ComponentOverviewWidget.prototype.getTreeGridColumnDefinition = function () {
            return {
                columns: [
                    { field: "displayName", headerText: ComponentOverviewWidget.columnName, width: "350" },
                    { field: "commandButtons", headerText: ComponentOverviewWidget.columnOpenView },
                ],
            };
        };
        ComponentOverviewWidget.prototype.getNameForCommandId = function (commandId) {
            return viewTypeProvider_1.ViewType[commandId];
        };
        ComponentOverviewWidget.prototype.getIconForCommandId = function (commandId) {
            return viewTypeProvider_1.ViewTypeProvider.getInstance().getIconByViewType(commandId);
        };
        ComponentOverviewWidget.prototype.getCommandIdsFromItem = function (item) {
            var component = item;
            // TODO get available views from component
            var availableViews = new Array();
            availableViews.push(viewTypeProvider_1.ViewType.Common);
            return availableViews;
        };
        ComponentOverviewWidget.prototype.getDefaultCommandFromComponent = function (component) {
            // TODO get default view from component
            return viewTypeProvider_1.ViewType.Common;
        };
        ComponentOverviewWidget.prototype.click = function (item, commandId) {
            var component = item;
            this.onOpenView(component, commandId);
        };
        ComponentOverviewWidget.prototype.doubleClick = function (args) {
            if (args.columnName == ComponentOverviewWidget.columnName && args.model.selectedItem != undefined) {
                var component = args.model.selectedItem.item;
                var defaultOpenViewType = this.getDefaultCommandFromComponent(component);
                this.onOpenView(component, defaultOpenViewType);
            }
        };
        ComponentOverviewWidget.prototype.onOpenView = function (component, openViewType) {
            var eventArgs = new eventOpenViewArgs_1.EventOpenViewArgs(this, component, openViewType);
            this.eventOpenView.raise(null, eventArgs);
        };
        ComponentOverviewWidget.columnName = "Name";
        ComponentOverviewWidget.columnOpenView = "Open View";
        return ComponentOverviewWidget;
    }(overviewTreeGridWidgetBase_1.OverviewTreeGridWidgetBase));
    exports.ComponentOverviewWidget = ComponentOverviewWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50T3ZlcnZpZXdXaWRnZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY29tcG9uZW50T3ZlcnZpZXdXaWRnZXQvY29tcG9uZW50T3ZlcnZpZXdXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVFBO1FBQTRCLGlDQUFtQztRQUEvRDs7UUFBaUUsQ0FBQztRQUFELG9CQUFDO0lBQUQsQ0FBQyxBQUFsRSxDQUE0QixtQkFBVSxHQUE0QjtJQUFBLENBQUM7SUFFbkU7Ozs7O09BS0c7SUFDSDtRQUFzQywyQ0FBMEI7UUFBaEU7WUFBQSxxRUFtRkM7WUFqRkcsbUJBQWEsR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDO1lBSTVCLGlCQUFXLEdBQTJDLG1CQUFRLENBQUMsTUFBTSxDQUE4QixFQUFFLENBQUMsQ0FBQzs7UUE2RW5ILENBQUM7UUEzRWEsK0NBQWEsR0FBdkI7WUFDSSxPQUFPLG9CQUFvQixDQUFDO1FBQ2hDLENBQUM7UUFFRCxzQkFBVywrQ0FBVTtpQkFPckI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFBO1lBQzNCLENBQUM7aUJBVEQsVUFBc0IsVUFBa0Q7Z0JBQXhFLGlCQUtDO2dCQUpHLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO2dCQUM5QixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFDLFVBQVU7b0JBQ2hDLEtBQUksQ0FBQywyQkFBMkIsRUFBRSxDQUFDO2dCQUN2QyxDQUFDLENBQUMsQ0FBQTtZQUNOLENBQUM7OztXQUFBO1FBTUQsMENBQVEsR0FBUjtZQUNJLElBQUksQ0FBQywyQkFBMkIsRUFBRSxDQUFDO1FBQ3ZDLENBQUM7UUFFTyw2REFBMkIsR0FBbkM7WUFFSSxJQUFHLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxFQUFFLEVBQUM7Z0JBQ3ZCLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUUsQ0FBQyxVQUFVLENBQUM7b0JBQzdDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUs7aUJBQ2hDLENBQUMsQ0FBQzthQUNOO1FBQ0wsQ0FBQztRQUVTLDZEQUEyQixHQUFyQztZQUNJLE9BQU87Z0JBQ0gsT0FBTyxFQUFFO29CQUNMLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsdUJBQXVCLENBQUMsVUFBVSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7b0JBQ3RGLEVBQUUsS0FBSyxFQUFFLGdCQUFnQixFQUFFLFVBQVUsRUFBRSx1QkFBdUIsQ0FBQyxjQUFjLEVBQUM7aUJBQ2pGO2FBQ0osQ0FBQztRQUNOLENBQUM7UUFFUyxxREFBbUIsR0FBN0IsVUFBOEIsU0FBaUI7WUFDM0MsT0FBTywyQkFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQy9CLENBQUM7UUFFUyxxREFBbUIsR0FBN0IsVUFBOEIsU0FBaUI7WUFDM0MsT0FBTyxtQ0FBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBZ0IsU0FBUyxDQUFDLENBQUM7UUFDdEYsQ0FBQztRQUVTLHVEQUFxQixHQUEvQixVQUFnQyxJQUFJO1lBQ2hDLElBQUksU0FBUyxHQUF5QixJQUFJLENBQUM7WUFDM0MsMENBQTBDO1lBQzFDLElBQUksY0FBYyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7WUFDakMsY0FBYyxDQUFDLElBQUksQ0FBQywyQkFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3JDLE9BQU8sY0FBYyxDQUFDO1FBQzFCLENBQUM7UUFFTyxnRUFBOEIsR0FBdEMsVUFBdUMsU0FBK0I7WUFDbEUsdUNBQXVDO1lBQ3hDLE9BQU8sMkJBQVEsQ0FBQyxNQUFNLENBQUM7UUFDMUIsQ0FBQztRQUVTLHVDQUFLLEdBQWYsVUFBZ0IsSUFBSSxFQUFFLFNBQVM7WUFDM0IsSUFBSSxTQUFTLEdBQXlCLElBQUksQ0FBQztZQUMzQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUMxQyxDQUFDO1FBRVMsNkNBQVcsR0FBckIsVUFBc0IsSUFBSTtZQUN0QixJQUFHLElBQUksQ0FBQyxVQUFVLElBQUksdUJBQXVCLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxJQUFJLFNBQVMsRUFBQztnQkFDN0YsSUFBSSxTQUFTLEdBQXlCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQztnQkFDbkUsSUFBSSxtQkFBbUIsR0FBRyxJQUFJLENBQUMsOEJBQThCLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3pFLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLG1CQUFtQixDQUFDLENBQUM7YUFDbkQ7UUFDTCxDQUFDO1FBRU8sNENBQVUsR0FBbEIsVUFBbUIsU0FBOEIsRUFBRSxZQUFxQjtZQUNwRSxJQUFJLFNBQVMsR0FBRyxJQUFJLHFDQUFpQixDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDckUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzlDLENBQUM7UUE5RWEsa0NBQVUsR0FBRyxNQUFNLENBQUM7UUFDcEIsc0NBQWMsR0FBRyxXQUFXLENBQUM7UUE4RS9DLDhCQUFDO0tBQUEsQUFuRkQsQ0FBc0MsdURBQTBCLEdBbUYvRDtJQUVRLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDb21wb25lbnRPdmVydmlld1dpZGdldCB9IGZyb20gXCIuL2ludGVyZmFjZXMvY29tcG9uZW50T3ZlcnZpZXdXaWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvZXZlbnRzXCI7XHJcbmltcG9ydCB7IEV2ZW50T3BlblZpZXdBcmdzIH0gZnJvbSBcIi4uL2NvbW1vbi9ldmVudE9wZW5WaWV3QXJnc1wiO1xyXG5pbXBvcnQgeyBQcm9wZXJ0eSB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvcHJvcGVydHlcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBWaWV3VHlwZSwgVmlld1R5cGVQcm92aWRlciwgIH0gZnJvbSBcIi4uL2NvbW1vbi92aWV3VHlwZVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IE92ZXJ2aWV3VHJlZUdyaWRXaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi9vdmVydmlld1RyZWVHcmlkV2lkZ2V0QmFzZVwiO1xyXG5cclxuY2xhc3MgRXZlbnRPcGVuVmlldyBleHRlbmRzIFR5cGVkRXZlbnQ8bnVsbCwgRXZlbnRPcGVuVmlld0FyZ3M+eyB9O1xyXG5cclxuLyoqXHJcbiAqIGltcGxlbWVudHMgdGhlIENvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0XHJcbiAqXHJcbiAqIEBjbGFzcyBDb21wb25lbnRPdmVydmlld1dpZGdldFxyXG4gKiBAZXh0ZW5kcyB7V2lkZ2V0QmFzZX1cclxuICovXHJcbmNsYXNzIENvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0IGV4dGVuZHMgT3ZlcnZpZXdUcmVlR3JpZFdpZGdldEJhc2UgaW1wbGVtZW50cyBJQ29tcG9uZW50T3ZlcnZpZXdXaWRnZXQge1xyXG4gICBcclxuICAgIGV2ZW50T3BlblZpZXcgPSBuZXcgRXZlbnRPcGVuVmlldygpO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY29sdW1uTmFtZSA9IFwiTmFtZVwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBjb2x1bW5PcGVuVmlldyA9IFwiT3BlbiBWaWV3XCI7XHJcbiAgICBwcml2YXRlIF9jb21wb25lbnRzOiAgUHJvcGVydHk8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnQ+PiA9IFByb3BlcnR5LmNyZWF0ZTxBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudD4+KFtdKTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgZ2V0SGVhZGVyVGV4dCgpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIFwiQ29tcG9uZW50IE92ZXJ2aWV3XCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBjb21wb25lbnRzKGNvbXBvbmVudHMgOiBQcm9wZXJ0eTxBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudD4+KSB7XHJcbiAgICAgICAgdGhpcy5fY29tcG9uZW50cyA9IGNvbXBvbmVudHM7XHJcbiAgICAgICAgdGhpcy5fY29tcG9uZW50cy5jaGFuZ2VkKChjb21wb25lbnRzKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbXBvbmVudE92ZXJ2aWV3RGF0YSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBnZXQgY29tcG9uZW50cygpIDogUHJvcGVydHk8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnQ+PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbXBvbmVudHNcclxuICAgIH1cclxuXHJcbiAgICBhY3RpdmF0ZSgpe1xyXG4gICAgICAgIHRoaXMudXBkYXRlQ29tcG9uZW50T3ZlcnZpZXdEYXRhKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVDb21wb25lbnRPdmVydmlld0RhdGEoKSB7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuY3NzUGFyZW50Q29udGVudElkICE9IFwiXCIpe1xyXG4gICAgICAgICAgICAoPGFueT4kKHRoaXMuY3NzUGFyZW50Q29udGVudElkKSkuZWpUcmVlR3JpZCh7XHJcbiAgICAgICAgICAgIGRhdGFTb3VyY2U6IHRoaXMuY29tcG9uZW50cy52YWx1ZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBnZXRUcmVlR3JpZENvbHVtbkRlZmluaXRpb24oKToge317XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY29sdW1uczogW1xyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJkaXNwbGF5TmFtZVwiLCBoZWFkZXJUZXh0OiBDb21wb25lbnRPdmVydmlld1dpZGdldC5jb2x1bW5OYW1lLCB3aWR0aDogXCIzNTBcIiB9LFxyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJjb21tYW5kQnV0dG9uc1wiLCBoZWFkZXJUZXh0OiBDb21wb25lbnRPdmVydmlld1dpZGdldC5jb2x1bW5PcGVuVmlld30sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZ2V0TmFtZUZvckNvbW1hbmRJZChjb21tYW5kSWQ6IHN0cmluZyk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gVmlld1R5cGVbY29tbWFuZElkXTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZ2V0SWNvbkZvckNvbW1hbmRJZChjb21tYW5kSWQ6IHN0cmluZykgOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIFZpZXdUeXBlUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXRJY29uQnlWaWV3VHlwZSg8Vmlld1R5cGU+PGFueT5jb21tYW5kSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBnZXRDb21tYW5kSWRzRnJvbUl0ZW0oaXRlbSk6IEFycmF5PHN0cmluZz57XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudDogTWFwcENvY2twaXRDb21wb25lbnQgPSBpdGVtO1xyXG4gICAgICAgIC8vIFRPRE8gZ2V0IGF2YWlsYWJsZSB2aWV3cyBmcm9tIGNvbXBvbmVudFxyXG4gICAgICAgIGxldCBhdmFpbGFibGVWaWV3cyA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgIGF2YWlsYWJsZVZpZXdzLnB1c2goVmlld1R5cGUuQ29tbW9uKTtcclxuICAgICAgICByZXR1cm4gYXZhaWxhYmxlVmlld3M7XHJcbiAgICB9ICBcclxuXHJcbiAgICBwcml2YXRlIGdldERlZmF1bHRDb21tYW5kRnJvbUNvbXBvbmVudChjb21wb25lbnQ6IE1hcHBDb2NrcGl0Q29tcG9uZW50KTogVmlld1R5cGV7XHJcbiAgICAgICAgLy8gVE9ETyBnZXQgZGVmYXVsdCB2aWV3IGZyb20gY29tcG9uZW50XHJcbiAgICAgICByZXR1cm4gVmlld1R5cGUuQ29tbW9uO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBjbGljayhpdGVtLCBjb21tYW5kSWQpe1xyXG4gICAgICAgIGxldCBjb21wb25lbnQ6IE1hcHBDb2NrcGl0Q29tcG9uZW50ID0gaXRlbTtcclxuICAgICAgICB0aGlzLm9uT3BlblZpZXcoY29tcG9uZW50LCBjb21tYW5kSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBkb3VibGVDbGljayhhcmdzKXtcclxuICAgICAgICBpZihhcmdzLmNvbHVtbk5hbWUgPT0gQ29tcG9uZW50T3ZlcnZpZXdXaWRnZXQuY29sdW1uTmFtZSAmJiBhcmdzLm1vZGVsLnNlbGVjdGVkSXRlbSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBsZXQgY29tcG9uZW50OiBNYXBwQ29ja3BpdENvbXBvbmVudCA9IGFyZ3MubW9kZWwuc2VsZWN0ZWRJdGVtLml0ZW07XHJcbiAgICAgICAgICAgIGxldCBkZWZhdWx0T3BlblZpZXdUeXBlID0gdGhpcy5nZXREZWZhdWx0Q29tbWFuZEZyb21Db21wb25lbnQoY29tcG9uZW50KTsgXHJcbiAgICAgICAgICAgIHRoaXMub25PcGVuVmlldyhjb21wb25lbnQsIGRlZmF1bHRPcGVuVmlld1R5cGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uT3BlblZpZXcoY29tcG9uZW50Ok1hcHBDb2NrcGl0Q29tcG9uZW50LCBvcGVuVmlld1R5cGU6Vmlld1R5cGUgKSB7XHJcbiAgICAgICAgbGV0IGV2ZW50QXJncyA9IG5ldyBFdmVudE9wZW5WaWV3QXJncyh0aGlzLCBjb21wb25lbnQsIG9wZW5WaWV3VHlwZSk7XHJcbiAgICAgICAgdGhpcy5ldmVudE9wZW5WaWV3LnJhaXNlKG51bGwsIGV2ZW50QXJncyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IENvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0IH07Il19