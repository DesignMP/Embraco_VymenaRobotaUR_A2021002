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
define(["require", "exports", "../dataModelBase", "../../widgets/tabWidget/view/tabWidgetFlexTab", "./tabWidgetDataModelData", "../../widgets/tabWidget/view/tabWidgetFixedTab"], function (require, exports, dataModelBase_1, tabWidgetFlexTab_1, tabWidgetDataModelData_1, tabWidgetFixedTab_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TabWidgetDataModel = /** @class */ (function (_super) {
        __extends(TabWidgetDataModel, _super);
        function TabWidgetDataModel() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._modelChangedHandler = function (sender, eventArgs) { _this.handleModelChanged(sender, eventArgs); };
            return _this;
        }
        TabWidgetDataModel.prototype.initialize = function () {
            this.data = new tabWidgetDataModelData_1.TabWidgetDataModelData();
            this.eventModelChanged.attach(this._modelChangedHandler);
            _super.prototype.initialize.call(this);
        };
        TabWidgetDataModel.prototype.initializeComponent = function () {
            this.component.disablePersisting();
        };
        TabWidgetDataModel.prototype.dispose = function () {
            this.eventModelChanged.detach(this._modelChangedHandler);
        };
        TabWidgetDataModel.prototype.connect = function () {
            throw new Error("Method not implemented.");
        };
        TabWidgetDataModel.prototype.onModelChanged = function (sender, data) {
            throw new Error("Method not implemented.");
        };
        TabWidgetDataModel.prototype.handleModelChanged = function (sender, data) {
            throw new Error("Method not implemented.");
        };
        TabWidgetDataModel.prototype.getData = function () {
            return this.data;
        };
        TabWidgetDataModel.prototype.addTab = function (newTab) {
            if (newTab instanceof tabWidgetFlexTab_1.TabWidgetFlexTab) {
                this.data.flexTabs.push(newTab);
            }
            else {
                this.data.fixedTabs.push(newTab);
            }
        };
        TabWidgetDataModel.prototype.getTabById = function (tabId) {
            for (var i = 0; i < this.getAllTabs().length; i++) {
                if (this.getAllTabs()[i].tabContainerId == tabId) {
                    return this.getAllTabs()[i];
                }
            }
            return undefined;
        };
        TabWidgetDataModel.prototype.getTabNameByTabId = function (tabId) {
            return tabId.replace("tab_", "");
        };
        TabWidgetDataModel.prototype.getFlexTabIndex = function (topBarTab) {
            return this.data.flexTabs.indexOf(topBarTab);
        };
        TabWidgetDataModel.prototype.setIndexOfFlexTab = function (index, topBarTab) {
            var oldIndex = this.data.flexTabs.indexOf(topBarTab);
            this.array_move(this.data.flexTabs, oldIndex, index);
        };
        TabWidgetDataModel.prototype.getAllTabs = function () {
            return this.data.flexTabs.concat(this.data.fixedTabs);
        };
        TabWidgetDataModel.prototype.getFlexTabs = function () {
            return this.data.flexTabs;
        };
        TabWidgetDataModel.prototype.getActiveTab = function () {
            for (var i = 0; i < this.getAllTabs().length; i++) {
                if (this.getAllTabs()[i].isActive) {
                    return this.getAllTabs()[i];
                }
            }
            return new tabWidgetFixedTab_1.TabWidgetFixedTab();
        };
        TabWidgetDataModel.prototype.setActiveTab = function (newActiveTab) {
            for (var i = 0; i < this.getAllTabs().length; i++) {
                if (this.getAllTabs()[i] == newActiveTab) {
                    this.getAllTabs()[i].isActive = true;
                }
                else {
                    this.getAllTabs()[i].isActive = false;
                }
            }
        };
        TabWidgetDataModel.prototype.setFlexTabPosition = function (newIndex, flexTab) {
            if (this.getFlexTabIndex(flexTab) < newIndex) {
                $("#" + flexTab.tabContainerId + "_tab").insertAfter("#" + this.data.flexTabs[newIndex].tabContainerId + "_tab");
            }
            else {
                $("#" + flexTab.tabContainerId + "_tab").insertBefore("#" + this.data.flexTabs[newIndex].tabContainerId + "_tab");
            }
            this.setIndexOfFlexTab(newIndex, flexTab);
        };
        TabWidgetDataModel.prototype.resizeWidgets = function (innerTabWidth, innerTabHeight) {
            var len = this.getAllTabs().length;
            for (var i = 0; i < this.getAllTabs().length; i++) {
                var widget = this.getAllTabs()[i].widget;
                if (widget != undefined) {
                    widget.resize(innerTabWidth, innerTabHeight);
                }
            }
        };
        TabWidgetDataModel.prototype.array_move = function (arr, old_index, new_index) {
            if (new_index >= arr.length) {
                var k = new_index - arr.length + 1;
                while (k--) {
                    arr.push(undefined);
                }
            }
            arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
            console.log(" ");
            for (var i = 0; i < arr.length; i++) {
                console.log(arr[i].tabContainerId);
            }
            console.log(" ");
        };
        ;
        return TabWidgetDataModel;
    }(dataModelBase_1.DataModelBase));
    exports.TabWidgetDataModel = TabWidgetDataModel;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiV2lkZ2V0RGF0YU1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvdG9wQmFyRGF0YU1vZGVsL3RhYldpZGdldERhdGFNb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBUUE7UUFBaUMsc0NBQWE7UUFBOUM7WUFBQSxxRUFnSUM7WUEzSFcsMEJBQW9CLEdBQUcsVUFBQyxNQUFNLEVBQUUsU0FBUyxJQUFPLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUM7O1FBMkh6RyxDQUFDO1FBekhHLHVDQUFVLEdBQVY7WUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksK0NBQXNCLEVBQUUsQ0FBQztZQUN6QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQ3pELGlCQUFNLFVBQVUsV0FBRSxDQUFDO1FBQ3ZCLENBQUM7UUFFRCxnREFBbUIsR0FBbkI7WUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDckMsQ0FBQztRQUVILG9DQUFPLEdBQVA7WUFDSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQzdELENBQUM7UUFFRCxvQ0FBTyxHQUFQO1lBQ0ksTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBQy9DLENBQUM7UUFDRCwyQ0FBYyxHQUFkLFVBQWUsTUFBa0IsRUFBRSxJQUEyQjtZQUMxRCxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDL0MsQ0FBQztRQUNELCtDQUFrQixHQUFsQixVQUFtQixNQUFrQixFQUFFLElBQTJCO1lBQzlELE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENB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U0FBUyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUU7Z0JBQ3pCLElBQUksQ0FBQyxHQUFHLFNBQVMsR0FBRyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztnQkFDbkMsT0FBTyxDQUFDLEVBQUUsRUFBRTtvQkFDUixHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2lCQUN2QjthQUNKO1lBQ0QsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQixLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztnQkFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUM7YUFDdEM7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLENBQUM7UUFBQSxDQUFDO1FBQ04seUJBQUM7SUFBRCxDQUFDLEFBaElELENBQWlDLDZCQUFhLEdBZ0k3QztJQUNNLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElUYWJXaWRnZXREYXRhTW9kZWwgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL3RhYldpZGdldERhdGFNb2RlbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJRGF0YU1vZGVsLCBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MgfSBmcm9tIFwiLi4vZGF0YU1vZGVsSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IERhdGFNb2RlbEJhc2UgfSBmcm9tIFwiLi4vZGF0YU1vZGVsQmFzZVwiO1xyXG5pbXBvcnQgeyBJVGFiV2lkZ2V0VGFiIH0gZnJvbSBcIi4uLy4uL3dpZGdldHMvdGFiV2lkZ2V0L2ludGVyZmFjZXMvdGFiV2lkZ2V0VGFiSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFRhYldpZGdldEZsZXhUYWIgfSBmcm9tIFwiLi4vLi4vd2lkZ2V0cy90YWJXaWRnZXQvdmlldy90YWJXaWRnZXRGbGV4VGFiXCI7XHJcbmltcG9ydCB7IFRhYldpZGdldERhdGFNb2RlbERhdGEgfSBmcm9tIFwiLi90YWJXaWRnZXREYXRhTW9kZWxEYXRhXCI7XHJcbmltcG9ydCB7IFRhYldpZGdldEZpeGVkVGFiIH0gZnJvbSBcIi4uLy4uL3dpZGdldHMvdGFiV2lkZ2V0L3ZpZXcvdGFiV2lkZ2V0Rml4ZWRUYWJcIjtcclxuXHJcbmNsYXNzIFRhYldpZGdldERhdGFNb2RlbCBleHRlbmRzIERhdGFNb2RlbEJhc2UgaW1wbGVtZW50cyBJVGFiV2lkZ2V0RGF0YU1vZGVse1xyXG4gICAgXHJcbiAgICBkYXRhOiBhbnk7ICAgIFxyXG4gICAgZGF0YVNvdXJjZTogYW55O1xyXG5cclxuICAgIHByaXZhdGUgX21vZGVsQ2hhbmdlZEhhbmRsZXIgPSAoc2VuZGVyLCBldmVudEFyZ3MpID0+IHsgdGhpcy5oYW5kbGVNb2RlbENoYW5nZWQoc2VuZGVyLCBldmVudEFyZ3MpIH07XHJcblxyXG4gICAgaW5pdGlhbGl6ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRhdGEgPSBuZXcgVGFiV2lkZ2V0RGF0YU1vZGVsRGF0YSgpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRNb2RlbENoYW5nZWQuYXR0YWNoKHRoaXMuX21vZGVsQ2hhbmdlZEhhbmRsZXIpO1xyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemUoKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0aWFsaXplQ29tcG9uZW50KCl7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZGlzYWJsZVBlcnNpc3RpbmcoKTtcclxuICAgICAgfVxyXG5cclxuICAgIGRpc3Bvc2UoKXtcclxuICAgICAgICB0aGlzLmV2ZW50TW9kZWxDaGFuZ2VkLmRldGFjaCh0aGlzLl9tb2RlbENoYW5nZWRIYW5kbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25uZWN0KCk6IHZvaWQge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1ldGhvZCBub3QgaW1wbGVtZW50ZWQuXCIpO1xyXG4gICAgfVxyXG4gICAgb25Nb2RlbENoYW5nZWQoc2VuZGVyOiBJRGF0YU1vZGVsLCBkYXRhOiBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNZXRob2Qgbm90IGltcGxlbWVudGVkLlwiKTtcclxuICAgIH1cclxuICAgIGhhbmRsZU1vZGVsQ2hhbmdlZChzZW5kZXI6IElEYXRhTW9kZWwsIGRhdGE6IEV2ZW50TW9kZWxDaGFuZ2VkQXJncykge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1ldGhvZCBub3QgaW1wbGVtZW50ZWQuXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldERhdGEoKSA6IGFueXtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZFRhYihuZXdUYWI6IElUYWJXaWRnZXRUYWIpe1xyXG4gICAgICAgIGlmKG5ld1RhYiBpbnN0YW5jZW9mIFRhYldpZGdldEZsZXhUYWIpe1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEuZmxleFRhYnMucHVzaChuZXdUYWIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEuZml4ZWRUYWJzLnB1c2gobmV3VGFiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VGFiQnlJZCh0YWJJZDpzdHJpbmcpIDogSVRhYldpZGdldFRhYnx1bmRlZmluZWR7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuZ2V0QWxsVGFicygpLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYodGhpcy5nZXRBbGxUYWJzKClbaV0udGFiQ29udGFpbmVySWQgPT0gdGFiSWQpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QWxsVGFicygpW2ldO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFRhYk5hbWVCeVRhYklkKHRhYklkOnN0cmluZykgOiBTdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIHRhYklkLnJlcGxhY2UoXCJ0YWJfXCIsIFwiXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEZsZXhUYWJJbmRleCh0b3BCYXJUYWIgOiBJVGFiV2lkZ2V0VGFiKTogbnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZmxleFRhYnMuaW5kZXhPZih0b3BCYXJUYWIpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEluZGV4T2ZGbGV4VGFiKGluZGV4LCB0b3BCYXJUYWIgOiBJVGFiV2lkZ2V0VGFiKXtcclxuICAgICAgICB2YXIgb2xkSW5kZXggPSB0aGlzLmRhdGEuZmxleFRhYnMuaW5kZXhPZih0b3BCYXJUYWIpO1xyXG4gICAgICAgIHRoaXMuYXJyYXlfbW92ZSh0aGlzLmRhdGEuZmxleFRhYnMsb2xkSW5kZXgsaW5kZXgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEFsbFRhYnMoKSA6IElUYWJXaWRnZXRUYWJbXXtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmZsZXhUYWJzLmNvbmNhdCh0aGlzLmRhdGEuZml4ZWRUYWJzKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRGbGV4VGFicygpIDogSVRhYldpZGdldFRhYltde1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZmxleFRhYnM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QWN0aXZlVGFiKCkgOiBJVGFiV2lkZ2V0VGFie1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmdldEFsbFRhYnMoKS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZ2V0QWxsVGFicygpW2ldLmlzQWN0aXZlKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEFsbFRhYnMoKVtpXTtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBUYWJXaWRnZXRGaXhlZFRhYigpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEFjdGl2ZVRhYihuZXdBY3RpdmVUYWIgOklUYWJXaWRnZXRUYWIpe1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmdldEFsbFRhYnMoKS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZ2V0QWxsVGFicygpW2ldID09IG5ld0FjdGl2ZVRhYil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldEFsbFRhYnMoKVtpXS5pc0FjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0QWxsVGFicygpW2ldLmlzQWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RmxleFRhYlBvc2l0aW9uKG5ld0luZGV4LCBmbGV4VGFiIDogSVRhYldpZGdldFRhYil7XHJcbiAgICAgICAgaWYodGhpcy5nZXRGbGV4VGFiSW5kZXgoZmxleFRhYikgPCBuZXdJbmRleCl7XHJcbiAgICAgICAgICAgICQoXCIjXCIrZmxleFRhYi50YWJDb250YWluZXJJZCtcIl90YWJcIikuaW5zZXJ0QWZ0ZXIoXCIjXCIrdGhpcy5kYXRhLmZsZXhUYWJzW25ld0luZGV4XS50YWJDb250YWluZXJJZCtcIl90YWJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICQoXCIjXCIrZmxleFRhYi50YWJDb250YWluZXJJZCtcIl90YWJcIikuaW5zZXJ0QmVmb3JlKFwiI1wiK3RoaXMuZGF0YS5mbGV4VGFic1tuZXdJbmRleF0udGFiQ29udGFpbmVySWQrXCJfdGFiXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldEluZGV4T2ZGbGV4VGFiKG5ld0luZGV4LGZsZXhUYWIpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc2l6ZVdpZGdldHMoaW5uZXJUYWJXaWR0aCwgaW5uZXJUYWJIZWlnaHQpe1xyXG4gICAgICAgIGxldCBsZW4gPSB0aGlzLmdldEFsbFRhYnMoKS5sZW5ndGg7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuZ2V0QWxsVGFicygpLmxlbmd0aDsgaSsrICl7XHJcbiAgICAgICAgICAgIGxldCB3aWRnZXQgPSB0aGlzLmdldEFsbFRhYnMoKVtpXS53aWRnZXQ7XHJcbiAgICAgICAgICAgIGlmKHdpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgd2lkZ2V0LnJlc2l6ZShpbm5lclRhYldpZHRoLGlubmVyVGFiSGVpZ2h0KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSAgXHJcbiAgICB9XHJcblxyXG4gICAgYXJyYXlfbW92ZShhcnIsIG9sZF9pbmRleCwgbmV3X2luZGV4KSB7XHJcbiAgICAgICAgaWYgKG5ld19pbmRleCA+PSBhcnIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHZhciBrID0gbmV3X2luZGV4IC0gYXJyLmxlbmd0aCArIDE7XHJcbiAgICAgICAgICAgIHdoaWxlIChrLS0pIHtcclxuICAgICAgICAgICAgICAgIGFyci5wdXNoKHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgYXJyLnNwbGljZShuZXdfaW5kZXgsIDAsIGFyci5zcGxpY2Uob2xkX2luZGV4LCAxKVswXSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCIgXCIpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhcnJbaV0udGFiQ29udGFpbmVySWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhcIiBcIik7XHJcbiAgICB9O1xyXG59XHJcbmV4cG9ydHtUYWJXaWRnZXREYXRhTW9kZWx9Il19