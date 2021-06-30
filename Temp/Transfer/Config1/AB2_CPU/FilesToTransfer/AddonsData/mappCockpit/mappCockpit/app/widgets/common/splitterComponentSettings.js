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
    var SplitterComponentSettings = /** @class */ (function (_super) {
        __extends(SplitterComponentSettings, _super);
        function SplitterComponentSettings(orientation, responsive) {
            if (responsive === void 0) { responsive = true; }
            var _this = _super.call(this) || this;
            // Create SplitterDefinition
            _this._splitterDefinition = new splitterDefinition_1.SplitterDefinition(orientation, responsive);
            // Add SplitterDefinition to this widget base data
            _this.setValue(splitterDefinition_1.SplitterDefinition.splitterDefinitionId, _this._splitterDefinition);
            return _this;
        }
        SplitterComponentSettings.prototype.addPane = function (type, id, defaultDataId, paneDefinition) {
            if (paneDefinition === void 0) { paneDefinition = ""; }
            // Add panes to panes data
            var paneDefs = this._splitterDefinition.paneDefinitions;
            paneDefs.push(new splitterPaneDefinition_1.SplitterPaneDefinition(new componentDefinition_1.ComponentDefinition(type, id, defaultDataId), paneDefinition));
        };
        SplitterComponentSettings.getPaneSettings = function (size, resizable, minimumSize) {
            if (resizable === void 0) { resizable = true; }
            if (minimumSize === void 0) { minimumSize = 0; }
            var fillSpace = false;
            if (size == -1) {
                // Use dynamic size for the pane
                size = 0;
                fillSpace = true;
            }
            return layoutPane_1.LayoutPane.getFormatedSettings(size, false, false, fillSpace, resizable, minimumSize);
        };
        return SplitterComponentSettings;
    }(componentSettings_1.ComponentSettings));
    exports.SplitterComponentSettings = SplitterComponentSettings;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXR0ZXJDb21wb25lbnRTZXR0aW5ncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jb21tb24vc3BsaXR0ZXJDb21wb25lbnRTZXR0aW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBT0E7UUFBK0MsNkNBQWlCO1FBSTVELG1DQUFZLFdBQW1CLEVBQUUsVUFBMEI7WUFBMUIsMkJBQUEsRUFBQSxpQkFBMEI7WUFBM0QsWUFDSSxpQkFBTyxTQU9WO1lBTkcsNEJBQTRCO1lBQzVCLEtBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLHVDQUFrQixDQUFDLFdBQVcsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUUzRSxrREFBa0Q7WUFDbEQsS0FBSSxDQUFDLFFBQVEsQ0FBQyx1Q0FBa0IsQ0FBQyxvQkFBb0IsRUFBRSxLQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQzs7UUFFckYsQ0FBQztRQUVELDJDQUFPLEdBQVAsVUFBUSxJQUFZLEVBQUUsRUFBVSxFQUFFLGFBQXFCLEVBQUUsY0FBd0I7WUFBeEIsK0JBQUEsRUFBQSxtQkFBd0I7WUFDN0UsMEJBQTBCO1lBQzFCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxlQUFlLENBQUM7WUFDeEQsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLCtDQUFzQixDQUFDLElBQUkseUNBQW1CLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxhQUFhLENBQUMsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDO1FBQ2hILENBQUM7UUFFTSx5Q0FBZSxHQUF0QixVQUF1QixJQUFJLEVBQUUsU0FBZ0IsRUFBRSxXQUFlO1lBQWpDLDBCQUFBLEVBQUEsZ0JBQWdCO1lBQUUsNEJBQUEsRUFBQSxlQUFlO1lBQzFELElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN0QixJQUFHLElBQUksSUFBSSxDQUFDLENBQUMsRUFBQztnQkFDVixnQ0FBZ0M7Z0JBQ2hDLElBQUksR0FBRyxDQUFDLENBQUM7Z0JBQ1QsU0FBUyxHQUFHLElBQUksQ0FBQzthQUNwQjtZQUNELE9BQU8sdUJBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ2pHLENBQUM7UUFDTCxnQ0FBQztJQUFELENBQUMsQUE3QkQsQ0FBK0MscUNBQWlCLEdBNkIvRDtJQTdCWSw4REFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnREZWZpbml0aW9uIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRGYWN0b3J5L2NvbXBvbmVudERlZmluaXRpb25cIjtcclxuaW1wb3J0IHsgU3BsaXR0ZXJEZWZpbml0aW9uIH0gZnJvbSBcIi4uL3NwbGl0dGVyV2lkZ2V0L3NwbGl0dGVyRGVmaW5pdGlvblwiO1xyXG5pbXBvcnQgeyBTcGxpdHRlclBhbmVEZWZpbml0aW9uIH0gZnJvbSBcIi4uL3NwbGl0dGVyV2lkZ2V0L3NwbGl0dGVyUGFuZURlZmluaXRpb25cIjtcclxuaW1wb3J0IHsgTGF5b3V0UGFuZSB9IGZyb20gXCIuLi9zcGxpdHRlcldpZGdldC9sYXlvdXRQYW5lXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCB7IElTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vcGVyc2lzdGVuY2UvaW50ZXJmYWNlcy9zZXR0aW5nc0ludGVyZmFjZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNwbGl0dGVyQ29tcG9uZW50U2V0dGluZ3MgZXh0ZW5kcyBDb21wb25lbnRTZXR0aW5nc3tcclxuXHJcbiAgICBwcml2YXRlIF9zcGxpdHRlckRlZmluaXRpb246IFNwbGl0dGVyRGVmaW5pdGlvbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihvcmllbnRhdGlvbjogc3RyaW5nLCByZXNwb25zaXZlOiBib29sZWFuID0gdHJ1ZSl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAvLyBDcmVhdGUgU3BsaXR0ZXJEZWZpbml0aW9uXHJcbiAgICAgICAgdGhpcy5fc3BsaXR0ZXJEZWZpbml0aW9uID0gbmV3IFNwbGl0dGVyRGVmaW5pdGlvbihvcmllbnRhdGlvbiwgcmVzcG9uc2l2ZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gQWRkIFNwbGl0dGVyRGVmaW5pdGlvbiB0byB0aGlzIHdpZGdldCBiYXNlIGRhdGFcclxuICAgICAgICB0aGlzLnNldFZhbHVlKFNwbGl0dGVyRGVmaW5pdGlvbi5zcGxpdHRlckRlZmluaXRpb25JZCwgdGhpcy5fc3BsaXR0ZXJEZWZpbml0aW9uKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgYWRkUGFuZSh0eXBlOiBzdHJpbmcsIGlkOiBzdHJpbmcsIGRlZmF1bHREYXRhSWQ6IHN0cmluZywgcGFuZURlZmluaXRpb246IGFueSA9IFwiXCIpe1xyXG4gICAgICAgIC8vIEFkZCBwYW5lcyB0byBwYW5lcyBkYXRhXHJcbiAgICAgICAgbGV0IHBhbmVEZWZzID0gdGhpcy5fc3BsaXR0ZXJEZWZpbml0aW9uLnBhbmVEZWZpbml0aW9ucztcclxuICAgICAgICBwYW5lRGVmcy5wdXNoKG5ldyBTcGxpdHRlclBhbmVEZWZpbml0aW9uKG5ldyBDb21wb25lbnREZWZpbml0aW9uKHR5cGUsIGlkLCBkZWZhdWx0RGF0YUlkKSwgcGFuZURlZmluaXRpb24pKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc3RhdGljIGdldFBhbmVTZXR0aW5ncyhzaXplLCByZXNpemFibGUgPSB0cnVlLCBtaW5pbXVtU2l6ZSA9IDApOiBJU2V0dGluZ3N7XHJcbiAgICAgICAgbGV0IGZpbGxTcGFjZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmKHNpemUgPT0gLTEpe1xyXG4gICAgICAgICAgICAvLyBVc2UgZHluYW1pYyBzaXplIGZvciB0aGUgcGFuZVxyXG4gICAgICAgICAgICBzaXplID0gMDtcclxuICAgICAgICAgICAgZmlsbFNwYWNlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIExheW91dFBhbmUuZ2V0Rm9ybWF0ZWRTZXR0aW5ncyhzaXplLCBmYWxzZSwgZmFsc2UsIGZpbGxTcGFjZSwgcmVzaXphYmxlLCBtaW5pbXVtU2l6ZSk7XHJcbiAgICB9XHJcbn0iXX0=