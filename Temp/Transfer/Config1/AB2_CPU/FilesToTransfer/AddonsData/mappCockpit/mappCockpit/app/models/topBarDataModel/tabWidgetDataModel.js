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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiV2lkZ2V0RGF0YU1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvdG9wQmFyRGF0YU1vZGVsL3RhYldpZGdldERhdGFNb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBUUE7UUFBaUMsc0NBQWE7UUFBOUM7WUFBQSxxRUEySEM7WUF0SFcsMEJBQW9CLEdBQUcsVUFBQyxNQUFNLEVBQUUsU0FBUyxJQUFPLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUM7O1FBc0h6RyxDQUFDO1FBcEhHLHVDQUFVLEdBQVY7WUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksK0NBQXNCLEVBQUUsQ0FBQztZQUN6QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQzdELENBQUM7UUFFRCxvQ0FBTyxHQUFQO1lBQ0ksSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUM3RCxDQUFDO1FBRUQsb0NBQU8sR0FBUDtZQUNJLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUMvQyxDQUFDO1FBQ0QsMkNBQWMsR0FBZCxVQUFlLE1BQWtCLEVBQUUsSUFBMkI7WUFDMUQsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBQy9DLENBQUM7UUFDRCwrQ0FBa0IsR0FBbEIsVUFBbUIsTUFBa0IsRUFBRSxJQUEyQjtZQUM5RCxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDL0MsQ0FBQztRQUVELG9DQUFPLEdBQVA7WUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDckIsQ0FBQztRQUVELG1DQUFNLEdBQU4sVUFBTyxN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LE9BQU8sQ0FBQyxFQUFFLEVBQUU7b0JBQ1IsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztpQkFDdkI7YUFDSjtZQUNELEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakIsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDO2FBQ3RDO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyQixDQUFDO1FBQUEsQ0FBQztRQUNOLHlCQUFDO0lBQUQsQ0FBQyxBQTNIRCxDQUFpQyw2QkFBYSxHQTJIN0M7SUFDTSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJVGFiV2lkZ2V0RGF0YU1vZGVsIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy90YWJXaWRnZXREYXRhTW9kZWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSURhdGFNb2RlbCwgRXZlbnRNb2RlbENoYW5nZWRBcmdzIH0gZnJvbSBcIi4uL2RhdGFNb2RlbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBEYXRhTW9kZWxCYXNlIH0gZnJvbSBcIi4uL2RhdGFNb2RlbEJhc2VcIjtcclxuaW1wb3J0IHsgSVRhYldpZGdldFRhYiB9IGZyb20gXCIuLi8uLi93aWRnZXRzL3RhYldpZGdldC9pbnRlcmZhY2VzL3RhYldpZGdldFRhYkludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUYWJXaWRnZXRGbGV4VGFiIH0gZnJvbSBcIi4uLy4uL3dpZGdldHMvdGFiV2lkZ2V0L3ZpZXcvdGFiV2lkZ2V0RmxleFRhYlwiO1xyXG5pbXBvcnQgeyBUYWJXaWRnZXREYXRhTW9kZWxEYXRhIH0gZnJvbSBcIi4vdGFiV2lkZ2V0RGF0YU1vZGVsRGF0YVwiO1xyXG5pbXBvcnQgeyBUYWJXaWRnZXRGaXhlZFRhYiB9IGZyb20gXCIuLi8uLi93aWRnZXRzL3RhYldpZGdldC92aWV3L3RhYldpZGdldEZpeGVkVGFiXCI7XHJcblxyXG5jbGFzcyBUYWJXaWRnZXREYXRhTW9kZWwgZXh0ZW5kcyBEYXRhTW9kZWxCYXNlIGltcGxlbWVudHMgSVRhYldpZGdldERhdGFNb2RlbHtcclxuICAgIFxyXG4gICAgZGF0YTogYW55OyAgICBcclxuICAgIGRhdGFTb3VyY2U6IGFueTtcclxuXHJcbiAgICBwcml2YXRlIF9tb2RlbENoYW5nZWRIYW5kbGVyID0gKHNlbmRlciwgZXZlbnRBcmdzKSA9PiB7IHRoaXMuaGFuZGxlTW9kZWxDaGFuZ2VkKHNlbmRlciwgZXZlbnRBcmdzKSB9O1xyXG5cclxuICAgIGluaXRpYWxpemUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gbmV3IFRhYldpZGdldERhdGFNb2RlbERhdGEoKTtcclxuICAgICAgICB0aGlzLmV2ZW50TW9kZWxDaGFuZ2VkLmF0dGFjaCh0aGlzLl9tb2RlbENoYW5nZWRIYW5kbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBkaXNwb3NlKCl7XHJcbiAgICAgICAgdGhpcy5ldmVudE1vZGVsQ2hhbmdlZC5kZXRhY2godGhpcy5fbW9kZWxDaGFuZ2VkSGFuZGxlcik7XHJcbiAgICB9XHJcblxyXG4gICAgY29ubmVjdCgpOiB2b2lkIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNZXRob2Qgbm90IGltcGxlbWVudGVkLlwiKTtcclxuICAgIH1cclxuICAgIG9uTW9kZWxDaGFuZ2VkKHNlbmRlcjogSURhdGFNb2RlbCwgZGF0YTogRXZlbnRNb2RlbENoYW5nZWRBcmdzKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWV0aG9kIG5vdCBpbXBsZW1lbnRlZC5cIik7XHJcbiAgICB9XHJcbiAgICBoYW5kbGVNb2RlbENoYW5nZWQoc2VuZGVyOiBJRGF0YU1vZGVsLCBkYXRhOiBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNZXRob2Qgbm90IGltcGxlbWVudGVkLlwiKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXREYXRhKCkgOiBhbnl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRUYWIobmV3VGFiOiBJVGFiV2lkZ2V0VGFiKXtcclxuICAgICAgICBpZihuZXdUYWIgaW5zdGFuY2VvZiBUYWJXaWRnZXRGbGV4VGFiKXtcclxuICAgICAgICAgICAgdGhpcy5kYXRhLmZsZXhUYWJzLnB1c2gobmV3VGFiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5kYXRhLmZpeGVkVGFicy5wdXNoKG5ld1RhYik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldFRhYkJ5SWQodGFiSWQ6c3RyaW5nKSA6IElUYWJXaWRnZXRUYWJ8dW5kZWZpbmVke1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmdldEFsbFRhYnMoKS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZ2V0QWxsVGFicygpW2ldLnRhYkNvbnRhaW5lcklkID09IHRhYklkKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEFsbFRhYnMoKVtpXTtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRUYWJOYW1lQnlUYWJJZCh0YWJJZDpzdHJpbmcpIDogU3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0YWJJZC5yZXBsYWNlKFwidGFiX1wiLCBcIlwiKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRGbGV4VGFiSW5kZXgodG9wQmFyVGFiIDogSVRhYldpZGdldFRhYik6IG51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmZsZXhUYWJzLmluZGV4T2YodG9wQmFyVGFiKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRJbmRleE9mRmxleFRhYihpbmRleCwgdG9wQmFyVGFiIDogSVRhYldpZGdldFRhYil7XHJcbiAgICAgICAgdmFyIG9sZEluZGV4ID0gdGhpcy5kYXRhLmZsZXhUYWJzLmluZGV4T2YodG9wQmFyVGFiKTtcclxuICAgICAgICB0aGlzLmFycmF5X21vdmUodGhpcy5kYXRhLmZsZXhUYWJzLG9sZEluZGV4LGluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRBbGxUYWJzKCkgOiBJVGFiV2lkZ2V0VGFiW117XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5mbGV4VGFicy5jb25jYXQodGhpcy5kYXRhLmZpeGVkVGFicyk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RmxleFRhYnMoKSA6IElUYWJXaWRnZXRUYWJbXXtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmZsZXhUYWJzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEFjdGl2ZVRhYigpIDogSVRhYldpZGdldFRhYntcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5nZXRBbGxUYWJzKCkubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZih0aGlzLmdldEFsbFRhYnMoKVtpXS5pc0FjdGl2ZSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRBbGxUYWJzKClbaV07XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgVGFiV2lkZ2V0Rml4ZWRUYWIoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRBY3RpdmVUYWIobmV3QWN0aXZlVGFiIDpJVGFiV2lkZ2V0VGFiKXtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5nZXRBbGxUYWJzKCkubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZih0aGlzLmdldEFsbFRhYnMoKVtpXSA9PSBuZXdBY3RpdmVUYWIpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRBbGxUYWJzKClbaV0uaXNBY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldEFsbFRhYnMoKVtpXS5pc0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldEZsZXhUYWJQb3NpdGlvbihuZXdJbmRleCwgZmxleFRhYiA6IElUYWJXaWRnZXRUYWIpe1xyXG4gICAgICAgIGlmKHRoaXMuZ2V0RmxleFRhYkluZGV4KGZsZXhUYWIpIDwgbmV3SW5kZXgpe1xyXG4gICAgICAgICAgICAkKFwiI1wiK2ZsZXhUYWIudGFiQ29udGFpbmVySWQrXCJfdGFiXCIpLmluc2VydEFmdGVyKFwiI1wiK3RoaXMuZGF0YS5mbGV4VGFic1tuZXdJbmRleF0udGFiQ29udGFpbmVySWQrXCJfdGFiXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAkKFwiI1wiK2ZsZXhUYWIudGFiQ29udGFpbmVySWQrXCJfdGFiXCIpLmluc2VydEJlZm9yZShcIiNcIit0aGlzLmRhdGEuZmxleFRhYnNbbmV3SW5kZXhdLnRhYkNvbnRhaW5lcklkK1wiX3RhYlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRJbmRleE9mRmxleFRhYihuZXdJbmRleCxmbGV4VGFiKTtcclxuICAgIH1cclxuXHJcbiAgICByZXNpemVXaWRnZXRzKGlubmVyVGFiV2lkdGgsIGlubmVyVGFiSGVpZ2h0KXtcclxuICAgICAgICBsZXQgbGVuID0gdGhpcy5nZXRBbGxUYWJzKCkubGVuZ3RoO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmdldEFsbFRhYnMoKS5sZW5ndGg7IGkrKyApe1xyXG4gICAgICAgICAgICBsZXQgd2lkZ2V0ID0gdGhpcy5nZXRBbGxUYWJzKClbaV0ud2lkZ2V0O1xyXG4gICAgICAgICAgICBpZih3aWRnZXQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHdpZGdldC5yZXNpemUoaW5uZXJUYWJXaWR0aCxpbm5lclRhYkhlaWdodClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gIFxyXG4gICAgfVxyXG5cclxuICAgIGFycmF5X21vdmUoYXJyLCBvbGRfaW5kZXgsIG5ld19pbmRleCkge1xyXG4gICAgICAgIGlmIChuZXdfaW5kZXggPj0gYXJyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB2YXIgayA9IG5ld19pbmRleCAtIGFyci5sZW5ndGggKyAxO1xyXG4gICAgICAgICAgICB3aGlsZSAoay0tKSB7XHJcbiAgICAgICAgICAgICAgICBhcnIucHVzaCh1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFyci5zcGxpY2UobmV3X2luZGV4LCAwLCBhcnIuc3BsaWNlKG9sZF9pbmRleCwgMSlbMF0pO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiIFwiKTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYXJyW2ldLnRhYkNvbnRhaW5lcklkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCIgXCIpO1xyXG4gICAgfTtcclxufVxyXG5leHBvcnR7VGFiV2lkZ2V0RGF0YU1vZGVsfSJdfQ==