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
define(["require", "exports", "../../common/componentFactory/componentDefinition", "../splitterWidget/splitterDefinition", "../splitterWidget/splitterPaneDefinition", "../splitterWidget/layoutPane", "../../common/componentBase/componentSettings"], function (require, exports, componentDefinition_1, splitterDefinition_1, splitterPaneDefinition_1, layoutPane_1, componentSettings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SplitterWidgetData = /** @class */ (function (_super) {
        __extends(SplitterWidgetData, _super);
        function SplitterWidgetData(orientation, responsive) {
            if (responsive === void 0) { responsive = true; }
            var _this = _super.call(this) || this;
            // Create SplitterDefinition
            _this._splitterDefinition = new splitterDefinition_1.SplitterDefinition(orientation, responsive);
            // Add SplitterDefinition to this widget base data
            _this.setValue(splitterDefinition_1.SplitterDefinition.splitterDefinitionId, _this._splitterDefinition);
            return _this;
        }
        SplitterWidgetData.prototype.addPane = function (type, id, defaultDataId, paneDefinition) {
            if (paneDefinition === void 0) { paneDefinition = ""; }
            // Add panes to panes data
            var paneDefs = this._splitterDefinition.paneDefinitions;
            paneDefs.push(new splitterPaneDefinition_1.SplitterPaneDefinition(new componentDefinition_1.ComponentDefinition(type, id, defaultDataId), paneDefinition));
        };
        SplitterWidgetData.getPanePersistingData = function (size, resizable, minimumSize) {
            if (resizable === void 0) { resizable = true; }
            if (minimumSize === void 0) { minimumSize = 0; }
            var fillSpace = false;
            if (size == -1) {
                // Use dynamic size for the pane
                size = 0;
                fillSpace = true;
            }
            return layoutPane_1.LayoutPane.getFormatedPersistingData(size, false, false, fillSpace, resizable, minimumSize);
        };
        return SplitterWidgetData;
    }(componentSettings_1.ComponentSettings));
    exports.SplitterWidgetData = SplitterWidgetData;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXR0ZXJXaWRnZXREYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NvbW1vbi9zcGxpdHRlcldpZGdldERhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQU9BO1FBQXdDLHNDQUFpQjtRQUlyRCw0QkFBWSxXQUFtQixFQUFFLFVBQTBCO1lBQTFCLDJCQUFBLEVBQUEsaUJBQTBCO1lBQTNELFlBQ0ksaUJBQU8sU0FPVjtZQU5HLDRCQUE0QjtZQUM1QixLQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSx1Q0FBa0IsQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFFM0Usa0RBQWtEO1lBQ2xELEtBQUksQ0FBQyxRQUFRLENBQUMsdUNBQWtCLENBQUMsb0JBQW9CLEVBQUUsS0FBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7O1FBRXJGLENBQUM7UUFFRCxvQ0FBTyxHQUFQLFVBQVEsSUFBWSxFQUFFLEVBQVUsRUFBRSxhQUFxQixFQUFFLGNBQXdCO1lBQXhCLCtCQUFBLEVBQUEsbUJBQXdCO1lBQzdFLDBCQUEwQjtZQUMxQixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsZUFBZSxDQUFDO1lBQ3hELFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSwrQ0FBc0IsQ0FBQyxJQUFJLHlDQUFtQixDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsYUFBYSxDQUFDLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUNoSCxDQUFDO1FBRU0sd0NBQXFCLEdBQTVCLFVBQTZCLElBQUksRUFBRSxTQUFnQixFQUFFLFdBQWU7WUFBakMsMEJBQUEsRUFBQSxnQkFBZ0I7WUFBRSw0QkFBQSxFQUFBLGVBQWU7WUFDaEUsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQ3RCLElBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFDO2dCQUNWLGdDQUFnQztnQkFDaEMsSUFBSSxHQUFHLENBQUMsQ0FBQztnQkFDVCxTQUFTLEdBQUcsSUFBSSxDQUFDO2FBQ3BCO1lBQ0QsT0FBTyx1QkFBVSxDQUFDLHlCQUF5QixDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDdkcsQ0FBQztRQUNMLHlCQUFDO0lBQUQsQ0FBQyxBQTdCRCxDQUF3QyxxQ0FBaUIsR0E2QnhEO0lBN0JZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudERlZmluaXRpb24gfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEZhY3RvcnkvY29tcG9uZW50RGVmaW5pdGlvblwiO1xyXG5pbXBvcnQgeyBTcGxpdHRlckRlZmluaXRpb24gfSBmcm9tIFwiLi4vc3BsaXR0ZXJXaWRnZXQvc3BsaXR0ZXJEZWZpbml0aW9uXCI7XHJcbmltcG9ydCB7IFNwbGl0dGVyUGFuZURlZmluaXRpb24gfSBmcm9tIFwiLi4vc3BsaXR0ZXJXaWRnZXQvc3BsaXR0ZXJQYW5lRGVmaW5pdGlvblwiO1xyXG5pbXBvcnQgeyBMYXlvdXRQYW5lIH0gZnJvbSBcIi4uL3NwbGl0dGVyV2lkZ2V0L2xheW91dFBhbmVcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgSVNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9pbnRlcmZhY2VzL3NldHRpbmdzSW50ZXJmYWNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU3BsaXR0ZXJXaWRnZXREYXRhIGV4dGVuZHMgQ29tcG9uZW50U2V0dGluZ3N7XHJcblxyXG4gICAgcHJpdmF0ZSBfc3BsaXR0ZXJEZWZpbml0aW9uO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG9yaWVudGF0aW9uOiBzdHJpbmcsIHJlc3BvbnNpdmU6IGJvb2xlYW4gPSB0cnVlKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIC8vIENyZWF0ZSBTcGxpdHRlckRlZmluaXRpb25cclxuICAgICAgICB0aGlzLl9zcGxpdHRlckRlZmluaXRpb24gPSBuZXcgU3BsaXR0ZXJEZWZpbml0aW9uKG9yaWVudGF0aW9uLCByZXNwb25zaXZlKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBBZGQgU3BsaXR0ZXJEZWZpbml0aW9uIHRvIHRoaXMgd2lkZ2V0IGJhc2UgZGF0YVxyXG4gICAgICAgIHRoaXMuc2V0VmFsdWUoU3BsaXR0ZXJEZWZpbml0aW9uLnNwbGl0dGVyRGVmaW5pdGlvbklkLCB0aGlzLl9zcGxpdHRlckRlZmluaXRpb24pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBhZGRQYW5lKHR5cGU6IHN0cmluZywgaWQ6IHN0cmluZywgZGVmYXVsdERhdGFJZDogc3RyaW5nLCBwYW5lRGVmaW5pdGlvbjogYW55ID0gXCJcIil7XHJcbiAgICAgICAgLy8gQWRkIHBhbmVzIHRvIHBhbmVzIGRhdGFcclxuICAgICAgICBsZXQgcGFuZURlZnMgPSB0aGlzLl9zcGxpdHRlckRlZmluaXRpb24ucGFuZURlZmluaXRpb25zO1xyXG4gICAgICAgIHBhbmVEZWZzLnB1c2gobmV3IFNwbGl0dGVyUGFuZURlZmluaXRpb24obmV3IENvbXBvbmVudERlZmluaXRpb24odHlwZSwgaWQsIGRlZmF1bHREYXRhSWQpLCBwYW5lRGVmaW5pdGlvbikpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzdGF0aWMgZ2V0UGFuZVBlcnNpc3RpbmdEYXRhKHNpemUsIHJlc2l6YWJsZSA9IHRydWUsIG1pbmltdW1TaXplID0gMCk6IElTZXR0aW5nc3tcclxuICAgICAgICBsZXQgZmlsbFNwYWNlID0gZmFsc2U7XHJcbiAgICAgICAgaWYoc2l6ZSA9PSAtMSl7XHJcbiAgICAgICAgICAgIC8vIFVzZSBkeW5hbWljIHNpemUgZm9yIHRoZSBwYW5lXHJcbiAgICAgICAgICAgIHNpemUgPSAwO1xyXG4gICAgICAgICAgICBmaWxsU3BhY2UgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gTGF5b3V0UGFuZS5nZXRGb3JtYXRlZFBlcnNpc3RpbmdEYXRhKHNpemUsIGZhbHNlLCBmYWxzZSwgZmlsbFNwYWNlLCByZXNpemFibGUsIG1pbmltdW1TaXplKTtcclxuICAgIH1cclxufSJdfQ==