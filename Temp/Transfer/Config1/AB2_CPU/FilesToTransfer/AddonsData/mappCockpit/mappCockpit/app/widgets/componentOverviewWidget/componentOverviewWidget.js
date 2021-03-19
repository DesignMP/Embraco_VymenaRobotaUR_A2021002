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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50T3ZlcnZpZXdXaWRnZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY29tcG9uZW50T3ZlcnZpZXdXaWRnZXQvY29tcG9uZW50T3ZlcnZpZXdXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVFBO1FBQTRCLGlDQUFtQztRQUEvRDs7UUFBaUUsQ0FBQztRQUFELG9CQUFDO0lBQUQsQ0FBQyxBQUFsRSxDQUE0QixtQkFBVSxHQUE0QjtJQUFBLENBQUM7SUFFbkU7Ozs7O09BS0c7SUFDSDtRQUFzQywyQ0FBMEI7UUFBaEU7WUFBQSxxRUF5RkM7WUF2RkcsbUJBQWEsR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDO1lBSTVCLGlCQUFXLEdBQTJDLG1CQUFRLENBQUMsTUFBTSxDQUE4QixFQUFFLENBQUMsQ0FBQzs7UUFtRm5ILENBQUM7UUFqRmEsK0NBQWEsR0FBdkI7WUFDSSxPQUFPLG9CQUFvQixDQUFDO1FBQ2hDLENBQUM7UUFFRCxzQkFBVywrQ0FBVTtpQkFPckI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFBO1lBQzNCLENBQUM7aUJBVEQsVUFBc0IsVUFBa0Q7Z0JBQXhFLGlCQUtDO2dCQUpHLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO2dCQUM5QixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFDLFVBQVU7b0JBQ2hDLEtBQUksQ0FBQywyQkFBMkIsRUFBRSxDQUFDO2dCQUN2QyxDQUFDLENBQUMsQ0FBQTtZQUNOLENBQUM7OztXQUFBO1FBTUQsMENBQVEsR0FBUjtZQUNJLElBQUksQ0FBQywyQkFBMkIsRUFBRSxDQUFDO1FBQ3ZDLENBQUM7UUFFTyw2REFBMkIsR0FBbkM7WUFFSSxJQUFHLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxFQUFFLEVBQUM7Z0JBQ3ZCLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUUsQ0FBQyxVQUFVLENBQUM7b0JBQzdDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUs7aUJBQ2hDLENBQUMsQ0FBQzthQUNOO1FBQ0wsQ0FBQztRQUVTLDZEQUEyQixHQUFyQztZQUNJLE9BQU87Z0JBQ0gsT0FBTyxFQUFFO29CQUNMLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsdUJBQXVCLENBQUMsVUFBVSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBQztvQkFDekcsRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsVUFBVSxFQUFFLHVCQUF1QixDQUFDLGNBQWMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFDO2lCQUN0RzthQUNKLENBQUM7UUFDTixDQUFDO1FBRVMsMERBQXdCLEdBQWxDO1lBQ0ksT0FBTztnQkFDSCxZQUFZLEVBQUUsSUFBSTthQUNyQixDQUFDO1FBQ04sQ0FBQztRQUVTLHFEQUFtQixHQUE3QixVQUE4QixTQUFpQjtZQUMzQyxPQUFPLDJCQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDL0IsQ0FBQztRQUVTLHFEQUFtQixHQUE3QixVQUE4QixTQUFpQjtZQUMzQyxPQUFPLG1DQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLGlCQUFpQixDQUFnQixTQUFTLENBQUMsQ0FBQztRQUN0RixDQUFDO1FBRVMsdURBQXFCLEdBQS9CLFVBQWdDLElBQUk7WUFDaEMsSUFBSSxTQUFTLEdBQXlCLElBQUksQ0FBQztZQUMzQywwQ0FBMEM7WUFDMUMsSUFBSSxjQUFjLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztZQUNqQyxjQUFjLENBQUMsSUFBSSxDQUFDLDJCQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDckMsT0FBTyxjQUFjLENBQUM7UUFDMUIsQ0FBQztRQUVPLGdFQUE4QixHQUF0QyxVQUF1QyxTQUErQjtZQUNsRSx1Q0FBdUM7WUFDeEMsT0FBTywyQkFBUSxDQUFDLE1BQU0sQ0FBQztRQUMxQixDQUFDO1FBRVMsdUNBQUssR0FBZixVQUFnQixJQUFJLEVBQUUsU0FBUztZQUMzQixJQUFJLFNBQVMsR0FBeUIsSUFBSSxDQUFDO1lBQzNDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzFDLENBQUM7UUFFUyw2Q0FBVyxHQUFyQixVQUFzQixJQUFJO1lBQ3RCLElBQUcsSUFBSSxDQUFDLFVBQVUsSUFBSSx1QkFBdUIsQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLElBQUksU0FBUyxFQUFDO2dCQUM3RixJQUFJLFNBQVMsR0FBeUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDO2dCQUNuRSxJQUFJLG1CQUFtQixHQUFHLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDekUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsbUJBQW1CLENBQUMsQ0FBQzthQUNuRDtRQUNMLENBQUM7UUFFTyw0Q0FBVSxHQUFsQixVQUFtQixTQUE4QixFQUFFLFlBQXFCO1lBQ3BFLElBQUksU0FBUyxHQUFHLElBQUkscUNBQWlCLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxZQUFZLENBQUMsQ0FBQztZQUNyRSxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDOUMsQ0FBQztRQXBGYSxrQ0FBVSxHQUFHLE1BQU0sQ0FBQztRQUNwQixzQ0FBYyxHQUFHLFdBQVcsQ0FBQztRQW9GL0MsOEJBQUM7S0FBQSxBQXpGRCxDQUFzQyx1REFBMEIsR0F5Ri9EO0lBRVEsMERBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUNvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0IH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9jb21wb25lbnRPdmVydmlld1dpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUeXBlZEV2ZW50IH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9ldmVudHNcIjtcclxuaW1wb3J0IHsgRXZlbnRPcGVuVmlld0FyZ3MgfSBmcm9tIFwiLi4vY29tbW9uL2V2ZW50T3BlblZpZXdBcmdzXCI7XHJcbmltcG9ydCB7IFByb3BlcnR5IH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9wcm9wZXJ0eVwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFZpZXdUeXBlLCBWaWV3VHlwZVByb3ZpZGVyLCAgfSBmcm9tIFwiLi4vY29tbW9uL3ZpZXdUeXBlUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgT3ZlcnZpZXdUcmVlR3JpZFdpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL292ZXJ2aWV3VHJlZUdyaWRXaWRnZXRCYXNlXCI7XHJcblxyXG5jbGFzcyBFdmVudE9wZW5WaWV3IGV4dGVuZHMgVHlwZWRFdmVudDxudWxsLCBFdmVudE9wZW5WaWV3QXJncz57IH07XHJcblxyXG4vKipcclxuICogaW1wbGVtZW50cyB0aGUgQ29tcG9uZW50T3ZlcnZpZXdXaWRnZXRcclxuICpcclxuICogQGNsYXNzIENvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0XHJcbiAqIEBleHRlbmRzIHtXaWRnZXRCYXNlfVxyXG4gKi9cclxuY2xhc3MgQ29tcG9uZW50T3ZlcnZpZXdXaWRnZXQgZXh0ZW5kcyBPdmVydmlld1RyZWVHcmlkV2lkZ2V0QmFzZSBpbXBsZW1lbnRzIElDb21wb25lbnRPdmVydmlld1dpZGdldCB7XHJcbiAgIFxyXG4gICAgZXZlbnRPcGVuVmlldyA9IG5ldyBFdmVudE9wZW5WaWV3KCk7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBjb2x1bW5OYW1lID0gXCJOYW1lXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIGNvbHVtbk9wZW5WaWV3ID0gXCJPcGVuIFZpZXdcIjtcclxuICAgIHByaXZhdGUgX2NvbXBvbmVudHM6ICBQcm9wZXJ0eTxBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudD4+ID0gUHJvcGVydHkuY3JlYXRlPEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50Pj4oW10pO1xyXG5cclxuICAgIHByb3RlY3RlZCBnZXRIZWFkZXJUZXh0KCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gXCJDb21wb25lbnQgT3ZlcnZpZXdcIjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGNvbXBvbmVudHMoY29tcG9uZW50cyA6IFByb3BlcnR5PEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50Pj4pIHtcclxuICAgICAgICB0aGlzLl9jb21wb25lbnRzID0gY29tcG9uZW50cztcclxuICAgICAgICB0aGlzLl9jb21wb25lbnRzLmNoYW5nZWQoKGNvbXBvbmVudHMpPT57XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ29tcG9uZW50T3ZlcnZpZXdEYXRhKCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGdldCBjb21wb25lbnRzKCkgOiBQcm9wZXJ0eTxBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudD4+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29tcG9uZW50c1xyXG4gICAgfVxyXG5cclxuICAgIGFjdGl2YXRlKCl7XHJcbiAgICAgICAgdGhpcy51cGRhdGVDb21wb25lbnRPdmVydmlld0RhdGEoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZUNvbXBvbmVudE92ZXJ2aWV3RGF0YSgpIHtcclxuXHJcbiAgICAgICAgaWYodGhpcy5jc3NQYXJlbnRDb250ZW50SWQgIT0gXCJcIil7XHJcbiAgICAgICAgICAgICg8YW55PiQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpKS5lalRyZWVHcmlkKHtcclxuICAgICAgICAgICAgZGF0YVNvdXJjZTogdGhpcy5jb21wb25lbnRzLnZhbHVlLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGdldFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbigpOiB7fXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjb2x1bW5zOiBbXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcImRpc3BsYXlOYW1lXCIsIGhlYWRlclRleHQ6IENvbXBvbmVudE92ZXJ2aWV3V2lkZ2V0LmNvbHVtbk5hbWUsIHdpZHRoOiBcIjM1MFwiLCBhbGxvd1NvcnRpbmc6IHRydWV9LFxyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJjb21tYW5kQnV0dG9uc1wiLCBoZWFkZXJUZXh0OiBDb21wb25lbnRPdmVydmlld1dpZGdldC5jb2x1bW5PcGVuVmlldywgYWxsb3dTb3J0aW5nOiBmYWxzZX0sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJvdGVjdGVkIGdldFRyZWVHcmlkQ29sdW1uU29ydGluZygpOiB7fXtcclxuICAgICAgICByZXR1cm4geyAgICAgICAgXHJcbiAgICAgICAgICAgIGFsbG93U29ydGluZzogdHJ1ZSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBnZXROYW1lRm9yQ29tbWFuZElkKGNvbW1hbmRJZDogc3RyaW5nKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiBWaWV3VHlwZVtjb21tYW5kSWRdO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBnZXRJY29uRm9yQ29tbWFuZElkKGNvbW1hbmRJZDogc3RyaW5nKSA6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gVmlld1R5cGVQcm92aWRlci5nZXRJbnN0YW5jZSgpLmdldEljb25CeVZpZXdUeXBlKDxWaWV3VHlwZT48YW55PmNvbW1hbmRJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGdldENvbW1hbmRJZHNGcm9tSXRlbShpdGVtKTogQXJyYXk8c3RyaW5nPntcclxuICAgICAgICBsZXQgY29tcG9uZW50OiBNYXBwQ29ja3BpdENvbXBvbmVudCA9IGl0ZW07XHJcbiAgICAgICAgLy8gVE9ETyBnZXQgYXZhaWxhYmxlIHZpZXdzIGZyb20gY29tcG9uZW50XHJcbiAgICAgICAgbGV0IGF2YWlsYWJsZVZpZXdzID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgYXZhaWxhYmxlVmlld3MucHVzaChWaWV3VHlwZS5Db21tb24pO1xyXG4gICAgICAgIHJldHVybiBhdmFpbGFibGVWaWV3cztcclxuICAgIH0gIFxyXG5cclxuICAgIHByaXZhdGUgZ2V0RGVmYXVsdENvbW1hbmRGcm9tQ29tcG9uZW50KGNvbXBvbmVudDogTWFwcENvY2twaXRDb21wb25lbnQpOiBWaWV3VHlwZXtcclxuICAgICAgICAvLyBUT0RPIGdldCBkZWZhdWx0IHZpZXcgZnJvbSBjb21wb25lbnRcclxuICAgICAgIHJldHVybiBWaWV3VHlwZS5Db21tb247XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGNsaWNrKGl0ZW0sIGNvbW1hbmRJZCl7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudDogTWFwcENvY2twaXRDb21wb25lbnQgPSBpdGVtO1xyXG4gICAgICAgIHRoaXMub25PcGVuVmlldyhjb21wb25lbnQsIGNvbW1hbmRJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGRvdWJsZUNsaWNrKGFyZ3Mpe1xyXG4gICAgICAgIGlmKGFyZ3MuY29sdW1uTmFtZSA9PSBDb21wb25lbnRPdmVydmlld1dpZGdldC5jb2x1bW5OYW1lICYmIGFyZ3MubW9kZWwuc2VsZWN0ZWRJdGVtICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGxldCBjb21wb25lbnQ6IE1hcHBDb2NrcGl0Q29tcG9uZW50ID0gYXJncy5tb2RlbC5zZWxlY3RlZEl0ZW0uaXRlbTtcclxuICAgICAgICAgICAgbGV0IGRlZmF1bHRPcGVuVmlld1R5cGUgPSB0aGlzLmdldERlZmF1bHRDb21tYW5kRnJvbUNvbXBvbmVudChjb21wb25lbnQpOyBcclxuICAgICAgICAgICAgdGhpcy5vbk9wZW5WaWV3KGNvbXBvbmVudCwgZGVmYXVsdE9wZW5WaWV3VHlwZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25PcGVuVmlldyhjb21wb25lbnQ6TWFwcENvY2twaXRDb21wb25lbnQsIG9wZW5WaWV3VHlwZTpWaWV3VHlwZSApIHtcclxuICAgICAgICBsZXQgZXZlbnRBcmdzID0gbmV3IEV2ZW50T3BlblZpZXdBcmdzKHRoaXMsIGNvbXBvbmVudCwgb3BlblZpZXdUeXBlKTtcclxuICAgICAgICB0aGlzLmV2ZW50T3BlblZpZXcucmFpc2UobnVsbCwgZXZlbnRBcmdzKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgQ29tcG9uZW50T3ZlcnZpZXdXaWRnZXQgfTsiXX0=