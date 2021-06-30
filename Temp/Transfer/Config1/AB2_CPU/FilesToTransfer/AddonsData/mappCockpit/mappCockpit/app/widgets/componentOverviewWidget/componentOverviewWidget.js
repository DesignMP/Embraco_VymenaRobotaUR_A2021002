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
     * @extends {OverviewTreeGridWidgetBase}
     * @implements {IComponentOverviewWidget}
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
                    { field: "displayName", headerText: ComponentOverviewWidget.columnName, width: "350", allowSorting: true },
                    { field: "commandButtons", headerText: ComponentOverviewWidget.columnOpenView, allowSorting: false },
                ],
            };
        };
        ComponentOverviewWidget.prototype.getTreeGridColumnSorting = function () {
            return {
                allowSorting: true,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50T3ZlcnZpZXdXaWRnZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY29tcG9uZW50T3ZlcnZpZXdXaWRnZXQvY29tcG9uZW50T3ZlcnZpZXdXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVFBO1FBQTRCLGlDQUFtQztRQUEvRDs7UUFBaUUsQ0FBQztRQUFELG9CQUFDO0lBQUQsQ0FBQyxBQUFsRSxDQUE0QixtQkFBVSxHQUE0QjtJQUFBLENBQUM7SUFFbkU7Ozs7OztPQU1HO0lBQ0g7UUFBc0MsMkNBQTBCO1FBQWhFO1lBQUEscUVBeUZDO1lBdkZHLG1CQUFhLEdBQUcsSUFBSSxhQUFhLEVBQUUsQ0FBQztZQUk1QixpQkFBVyxHQUEyQyxtQkFBUSxDQUFDLE1BQU0sQ0FBOEIsRUFBRSxDQUFDLENBQUM7O1FBbUZuSCxDQUFDO1FBakZhLCtDQUFhLEdBQXZCO1lBQ0ksT0FBTyxvQkFBb0IsQ0FBQztRQUNoQyxDQUFDO1FBRUQsc0JBQVcsK0NBQVU7aUJBT3JCO2dCQUNJLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQTtZQUMzQixDQUFDO2lCQVRELFVBQXNCLFVBQWtEO2dCQUF4RSxpQkFLQztnQkFKRyxJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztnQkFDOUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBQyxVQUFVO29CQUNoQyxLQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztnQkFDdkMsQ0FBQyxDQUFDLENBQUE7WUFDTixDQUFDOzs7V0FBQTtRQU1ELDBDQUFRLEdBQVI7WUFDSSxJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztRQUN2QyxDQUFDO1FBRU8sNkRBQTJCLEdBQW5DO1lBRUksSUFBRyxJQUFJLENBQUMsa0JBQWtCLElBQUksRUFBRSxFQUFDO2dCQUN2QixDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFFLENBQUMsVUFBVSxDQUFDO29CQUM3QyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLO2lCQUNoQyxDQUFDLENBQUM7YUFDTjtRQUNMLENBQUM7UUFFUyw2REFBMkIsR0FBckM7WUFDSSxPQUFPO2dCQUNILE9BQU8sRUFBRTtvQkFDTCxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLHVCQUF1QixDQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUM7b0JBQ3pHLEVBQUUsS0FBSyxFQUFFLGdCQUFnQixFQUFFLFVBQVUsRUFBRSx1QkFBdUIsQ0FBQyxjQUFjLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBQztpQkFDdEc7YUFDSixDQUFDO1FBQ04sQ0FBQztRQUVTLDBEQUF3QixHQUFsQztZQUNJLE9BQU87Z0JBQ0gsWUFBWSxFQUFFLElBQUk7YUFDckIsQ0FBQztRQUNOLENBQUM7UUFFUyxxREFBbUIsR0FBN0IsVUFBOEIsU0FBaUI7WUFDM0MsT0FBTywyQkFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQy9CLENBQUM7UUFFUyxxREFBbUIsR0FBN0IsVUFBOEIsU0FBaUI7WUFDM0MsT0FBTyxtQ0FBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBZ0IsU0FBUyxDQUFDLENBQUM7UUFDdEYsQ0FBQztRQUVTLHVEQUFxQixHQUEvQixVQUFnQyxJQUFJO1lBQ2hDLElBQUksU0FBUyxHQUF5QixJQUFJLENBQUM7WUFDM0MsMENBQTBDO1lBQzFDLElBQUksY0FBYyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7WUFDakMsY0FBYyxDQUFDLElBQUksQ0FBQywyQkFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3JDLE9BQU8sY0FBYyxDQUFDO1FBQzFCLENBQUM7UUFFTyxnRUFBOEIsR0FBdEMsVUFBdUMsU0FBK0I7WUFDbEUsdUNBQXVDO1lBQ3hDLE9BQU8sMkJBQVEsQ0FBQyxNQUFNLENBQUM7UUFDMUIsQ0FBQztRQUVTLHVDQUFLLEdBQWYsVUFBZ0IsSUFBSSxFQUFFLFNBQVM7WUFDM0IsSUFBSSxTQUFTLEdBQXlCLElBQUksQ0FBQztZQUMzQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUMxQyxDQUFDO1FBRVMsNkNBQVcsR0FBckIsVUFBc0IsSUFBSTtZQUN0QixJQUFHLElBQUksQ0FBQyxVQUFVLElBQUksdUJBQXVCLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxJQUFJLFNBQVMsRUFBQztnQkFDN0YsSUFBSSxTQUFTLEdBQXlCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQztnQkFDbkUsSUFBSSxtQkFBbUIsR0FBRyxJQUFJLENBQUMsOEJBQThCLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3pFLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLG1CQUFtQixDQUFDLENBQUM7YUFDbkQ7UUFDTCxDQUFDO1FBRU8sNENBQVUsR0FBbEIsVUFBbUIsU0FBOEIsRUFBRSxZQUFxQjtZQUNwRSxJQUFJLFNBQVMsR0FBRyxJQUFJLHFDQUFpQixDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDckUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzlDLENBQUM7UUFwRmEsa0NBQVUsR0FBRyxNQUFNLENBQUM7UUFDcEIsc0NBQWMsR0FBRyxXQUFXLENBQUM7UUFvRi9DLDhCQUFDO0tBQUEsQUF6RkQsQ0FBc0MsdURBQTBCLEdBeUYvRDtJQUVRLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDb21wb25lbnRPdmVydmlld1dpZGdldCB9IGZyb20gXCIuL2ludGVyZmFjZXMvY29tcG9uZW50T3ZlcnZpZXdXaWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvZXZlbnRzXCI7XHJcbmltcG9ydCB7IEV2ZW50T3BlblZpZXdBcmdzIH0gZnJvbSBcIi4uL2NvbW1vbi9ldmVudE9wZW5WaWV3QXJnc1wiO1xyXG5pbXBvcnQgeyBQcm9wZXJ0eSB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvcHJvcGVydHlcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBWaWV3VHlwZSwgVmlld1R5cGVQcm92aWRlciwgIH0gZnJvbSBcIi4uL2NvbW1vbi92aWV3VHlwZVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IE92ZXJ2aWV3VHJlZUdyaWRXaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi9vdmVydmlld1RyZWVHcmlkV2lkZ2V0QmFzZVwiO1xyXG5cclxuY2xhc3MgRXZlbnRPcGVuVmlldyBleHRlbmRzIFR5cGVkRXZlbnQ8bnVsbCwgRXZlbnRPcGVuVmlld0FyZ3M+eyB9O1xyXG5cclxuLyoqXHJcbiAqIGltcGxlbWVudHMgdGhlIENvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0XHJcbiAqXHJcbiAqIEBjbGFzcyBDb21wb25lbnRPdmVydmlld1dpZGdldFxyXG4gKiBAZXh0ZW5kcyB7T3ZlcnZpZXdUcmVlR3JpZFdpZGdldEJhc2V9XHJcbiAqIEBpbXBsZW1lbnRzIHtJQ29tcG9uZW50T3ZlcnZpZXdXaWRnZXR9XHJcbiAqL1xyXG5jbGFzcyBDb21wb25lbnRPdmVydmlld1dpZGdldCBleHRlbmRzIE92ZXJ2aWV3VHJlZUdyaWRXaWRnZXRCYXNlIGltcGxlbWVudHMgSUNvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0IHtcclxuICAgXHJcbiAgICBldmVudE9wZW5WaWV3ID0gbmV3IEV2ZW50T3BlblZpZXcoKTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGNvbHVtbk5hbWUgPSBcIk5hbWVcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgY29sdW1uT3BlblZpZXcgPSBcIk9wZW4gVmlld1wiO1xyXG4gICAgcHJpdmF0ZSBfY29tcG9uZW50czogIFByb3BlcnR5PEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50Pj4gPSBQcm9wZXJ0eS5jcmVhdGU8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnQ+PihbXSk7XHJcblxyXG4gICAgcHJvdGVjdGVkIGdldEhlYWRlclRleHQoKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiBcIkNvbXBvbmVudCBPdmVydmlld1wiO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgY29tcG9uZW50cyhjb21wb25lbnRzIDogUHJvcGVydHk8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnQ+Pikge1xyXG4gICAgICAgIHRoaXMuX2NvbXBvbmVudHMgPSBjb21wb25lbnRzO1xyXG4gICAgICAgIHRoaXMuX2NvbXBvbmVudHMuY2hhbmdlZCgoY29tcG9uZW50cyk9PntcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDb21wb25lbnRPdmVydmlld0RhdGEoKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgZ2V0IGNvbXBvbmVudHMoKSA6IFByb3BlcnR5PEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50Pj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb21wb25lbnRzXHJcbiAgICB9XHJcblxyXG4gICAgYWN0aXZhdGUoKXtcclxuICAgICAgICB0aGlzLnVwZGF0ZUNvbXBvbmVudE92ZXJ2aWV3RGF0YSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlQ29tcG9uZW50T3ZlcnZpZXdEYXRhKCkge1xyXG5cclxuICAgICAgICBpZih0aGlzLmNzc1BhcmVudENvbnRlbnRJZCAhPSBcIlwiKXtcclxuICAgICAgICAgICAgKDxhbnk+JCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCkpLmVqVHJlZUdyaWQoe1xyXG4gICAgICAgICAgICBkYXRhU291cmNlOiB0aGlzLmNvbXBvbmVudHMudmFsdWUsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCk6IHt9e1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNvbHVtbnM6IFtcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwiZGlzcGxheU5hbWVcIiwgaGVhZGVyVGV4dDogQ29tcG9uZW50T3ZlcnZpZXdXaWRnZXQuY29sdW1uTmFtZSwgd2lkdGg6IFwiMzUwXCIsIGFsbG93U29ydGluZzogdHJ1ZX0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcImNvbW1hbmRCdXR0b25zXCIsIGhlYWRlclRleHQ6IENvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0LmNvbHVtbk9wZW5WaWV3LCBhbGxvd1NvcnRpbmc6IGZhbHNlfSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcm90ZWN0ZWQgZ2V0VHJlZUdyaWRDb2x1bW5Tb3J0aW5nKCk6IHt9e1xyXG4gICAgICAgIHJldHVybiB7ICAgICAgICBcclxuICAgICAgICAgICAgYWxsb3dTb3J0aW5nOiB0cnVlLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGdldE5hbWVGb3JDb21tYW5kSWQoY29tbWFuZElkOiBzdHJpbmcpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIFZpZXdUeXBlW2NvbW1hbmRJZF07XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGdldEljb25Gb3JDb21tYW5kSWQoY29tbWFuZElkOiBzdHJpbmcpIDogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiBWaWV3VHlwZVByb3ZpZGVyLmdldEluc3RhbmNlKCkuZ2V0SWNvbkJ5Vmlld1R5cGUoPFZpZXdUeXBlPjxhbnk+Y29tbWFuZElkKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZ2V0Q29tbWFuZElkc0Zyb21JdGVtKGl0ZW0pOiBBcnJheTxzdHJpbmc+e1xyXG4gICAgICAgIGxldCBjb21wb25lbnQ6IE1hcHBDb2NrcGl0Q29tcG9uZW50ID0gaXRlbTtcclxuICAgICAgICAvLyBUT0RPIGdldCBhdmFpbGFibGUgdmlld3MgZnJvbSBjb21wb25lbnRcclxuICAgICAgICBsZXQgYXZhaWxhYmxlVmlld3MgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICBhdmFpbGFibGVWaWV3cy5wdXNoKFZpZXdUeXBlLkNvbW1vbik7XHJcbiAgICAgICAgcmV0dXJuIGF2YWlsYWJsZVZpZXdzO1xyXG4gICAgfSAgXHJcblxyXG4gICAgcHJpdmF0ZSBnZXREZWZhdWx0Q29tbWFuZEZyb21Db21wb25lbnQoY29tcG9uZW50OiBNYXBwQ29ja3BpdENvbXBvbmVudCk6IFZpZXdUeXBle1xyXG4gICAgICAgIC8vIFRPRE8gZ2V0IGRlZmF1bHQgdmlldyBmcm9tIGNvbXBvbmVudFxyXG4gICAgICAgcmV0dXJuIFZpZXdUeXBlLkNvbW1vbjtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgY2xpY2soaXRlbSwgY29tbWFuZElkKXtcclxuICAgICAgICBsZXQgY29tcG9uZW50OiBNYXBwQ29ja3BpdENvbXBvbmVudCA9IGl0ZW07XHJcbiAgICAgICAgdGhpcy5vbk9wZW5WaWV3KGNvbXBvbmVudCwgY29tbWFuZElkKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZG91YmxlQ2xpY2soYXJncyl7XHJcbiAgICAgICAgaWYoYXJncy5jb2x1bW5OYW1lID09IENvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0LmNvbHVtbk5hbWUgJiYgYXJncy5tb2RlbC5zZWxlY3RlZEl0ZW0gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgbGV0IGNvbXBvbmVudDogTWFwcENvY2twaXRDb21wb25lbnQgPSBhcmdzLm1vZGVsLnNlbGVjdGVkSXRlbS5pdGVtO1xyXG4gICAgICAgICAgICBsZXQgZGVmYXVsdE9wZW5WaWV3VHlwZSA9IHRoaXMuZ2V0RGVmYXVsdENvbW1hbmRGcm9tQ29tcG9uZW50KGNvbXBvbmVudCk7IFxyXG4gICAgICAgICAgICB0aGlzLm9uT3BlblZpZXcoY29tcG9uZW50LCBkZWZhdWx0T3BlblZpZXdUeXBlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbk9wZW5WaWV3KGNvbXBvbmVudDpNYXBwQ29ja3BpdENvbXBvbmVudCwgb3BlblZpZXdUeXBlOlZpZXdUeXBlICkge1xyXG4gICAgICAgIGxldCBldmVudEFyZ3MgPSBuZXcgRXZlbnRPcGVuVmlld0FyZ3ModGhpcywgY29tcG9uZW50LCBvcGVuVmlld1R5cGUpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRPcGVuVmlldy5yYWlzZShudWxsLCBldmVudEFyZ3MpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBDb21wb25lbnRPdmVydmlld1dpZGdldCB9OyJdfQ==