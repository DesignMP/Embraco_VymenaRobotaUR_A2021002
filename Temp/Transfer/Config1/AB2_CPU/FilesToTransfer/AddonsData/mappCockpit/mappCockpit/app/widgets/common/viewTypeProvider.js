define(["require", "exports", "./themeProvider"], function (require, exports, themeProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ViewType;
    (function (ViewType) {
        ViewType[ViewType["Default"] = 0] = "Default";
        ViewType[ViewType["Common"] = 1] = "Common";
        ViewType[ViewType["Analysis"] = 2] = "Analysis";
        ViewType[ViewType["Configuration"] = 3] = "Configuration";
        ViewType[ViewType["Overview"] = 4] = "Overview";
        ViewType[ViewType["User"] = 5] = "User";
        ViewType[ViewType["SideBarTab"] = 6] = "SideBarTab";
    })(ViewType || (ViewType = {}));
    exports.ViewType = ViewType;
    /**
     *
     *
     * @class ViewTypeProvider
     */
    var ViewTypeProvider = /** @class */ (function () {
        function ViewTypeProvider() {
            this._iconPathList = {};
        }
        ViewTypeProvider.getInstance = function () {
            if (!ViewTypeProvider.instance) {
                ViewTypeProvider.instance = new ViewTypeProvider();
                // ... any one time initialization goes here ...
                this.instance.initIconPathList();
            }
            return ViewTypeProvider.instance;
        };
        ViewTypeProvider.prototype.getIconByViewType = function (viewType) {
            return this._iconPathList[viewType];
        };
        ViewTypeProvider.prototype.initIconPathList = function () {
            var themeProvider = themeProvider_1.ThemeProvider.getInstance();
            this._iconPathList[ViewType.Common.toString()] = themeProvider.getThemedFilePath("widgets/common/style/images/IconComponentView.svg");
            this._iconPathList[ViewType.Analysis.toString()] = themeProvider.getThemedFilePath("widgets/common/style/images/IconTraceView.svg");
            this._iconPathList[ViewType.Configuration.toString()] = themeProvider.getThemedFilePath("widgets/common/style/images/IconTraceConfigurationView.svg");
            this._iconPathList[ViewType.Overview.toString()] = themeProvider.getThemedFilePath("widgets/common/style/images/IconOverviewPage.svg");
            this._iconPathList[ViewType.User.toString()] = themeProvider.getThemedFilePath("widgets/common/style/images/IconUser.svg");
        };
        return ViewTypeProvider;
    }());
    exports.ViewTypeProvider = ViewTypeProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld1R5cGVQcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jb21tb24vdmlld1R5cGVQcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFFQSxJQUFLLFFBUUo7SUFSRCxXQUFLLFFBQVE7UUFDVCw2Q0FBTyxDQUFBO1FBQ1AsMkNBQU0sQ0FBQTtRQUNOLCtDQUFRLENBQUE7UUFDUix5REFBYSxDQUFBO1FBQ2IsK0NBQVEsQ0FBQTtRQUNSLHVDQUFJLENBQUE7UUFDSixtREFBVSxDQUFBO0lBQ2QsQ0FBQyxFQVJJLFFBQVEsS0FBUixRQUFRLFFBUVo7SUFzQ3lCLDRCQUFRO0lBcENsQzs7OztPQUlHO0lBQ0g7UUFBQTtZQUVZLGtCQUFhLEdBQW9DLEVBQUUsQ0FBQztRQTJCaEUsQ0FBQztRQXZCVSw0QkFBVyxHQUFsQjtZQUNJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUU7Z0JBQzVCLGdCQUFnQixDQUFDLFFBQVEsR0FBRyxJQUFJLGdCQUFnQixFQUFFLENBQUM7Z0JBQ25ELGdEQUFnRDtnQkFDaEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2FBQ3BDO1lBQ0QsT0FBTyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUM7UUFDckMsQ0FBQztRQUVELDRDQUFpQixHQUFqQixVQUFrQixRQUFrQjtZQUNoQyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDeEMsQ0FBQztRQUVELDJDQUFnQixHQUFoQjtZQUVJLElBQUksYUFBYSxHQUFHLDZCQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDaEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsYUFBYSxDQUFDLGlCQUFpQixDQUFDLG1EQUFtRCxDQUFDLENBQUM7WUFDdEksSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsYUFBYSxDQUFDLGlCQUFpQixDQUFDLCtDQUErQyxDQUFDLENBQUM7WUFDcEksSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsYUFBYSxDQUFDLGlCQUFpQixDQUFDLDREQUE0RCxDQUFDLENBQUM7WUFDdEosSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsYUFBYSxDQUFDLGlCQUFpQixDQUFDLGtEQUFrRCxDQUFDLENBQUM7WUFDdkksSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsYUFBYSxDQUFDLGlCQUFpQixDQUFDLDBDQUEwQyxDQUFDLENBQUM7UUFDL0gsQ0FBQztRQUVMLHVCQUFDO0lBQUQsQ0FBQyxBQTdCRCxJQTZCQztJQUVPLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRoZW1lUHJvdmlkZXIgfSBmcm9tIFwiLi90aGVtZVByb3ZpZGVyXCI7XHJcblxyXG5lbnVtIFZpZXdUeXBle1xyXG4gICAgRGVmYXVsdCxcclxuICAgIENvbW1vbixcclxuICAgIEFuYWx5c2lzLFxyXG4gICAgQ29uZmlndXJhdGlvbixcclxuICAgIE92ZXJ2aWV3LFxyXG4gICAgVXNlcixcclxuICAgIFNpZGVCYXJUYWJcclxufVxyXG5cclxuLyoqXHJcbiAqXHJcbiAqXHJcbiAqIEBjbGFzcyBWaWV3VHlwZVByb3ZpZGVyXHJcbiAqL1xyXG5jbGFzcyBWaWV3VHlwZVByb3ZpZGVye1xyXG5cclxuICAgIHByaXZhdGUgX2ljb25QYXRoTGlzdDogeyBbdmlld1R5cGU6c3RyaW5nXSA6IHN0cmluZzsgfSA9IHt9O1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBWaWV3VHlwZVByb3ZpZGVyO1xyXG4gIFxyXG4gICAgc3RhdGljIGdldEluc3RhbmNlKCkge1xyXG4gICAgICAgIGlmICghVmlld1R5cGVQcm92aWRlci5pbnN0YW5jZSkge1xyXG4gICAgICAgICAgICBWaWV3VHlwZVByb3ZpZGVyLmluc3RhbmNlID0gbmV3IFZpZXdUeXBlUHJvdmlkZXIoKTtcclxuICAgICAgICAgICAgLy8gLi4uIGFueSBvbmUgdGltZSBpbml0aWFsaXphdGlvbiBnb2VzIGhlcmUgLi4uXHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UuaW5pdEljb25QYXRoTGlzdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gVmlld1R5cGVQcm92aWRlci5pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRJY29uQnlWaWV3VHlwZSh2aWV3VHlwZTogVmlld1R5cGUpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ljb25QYXRoTGlzdFt2aWV3VHlwZV07XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdEljb25QYXRoTGlzdCgpe1xyXG5cclxuICAgICAgICBsZXQgdGhlbWVQcm92aWRlciA9IFRoZW1lUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICB0aGlzLl9pY29uUGF0aExpc3RbVmlld1R5cGUuQ29tbW9uLnRvU3RyaW5nKCldID0gdGhlbWVQcm92aWRlci5nZXRUaGVtZWRGaWxlUGF0aChcIndpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9JY29uQ29tcG9uZW50Vmlldy5zdmdcIik7XHJcbiAgICAgICAgdGhpcy5faWNvblBhdGhMaXN0W1ZpZXdUeXBlLkFuYWx5c2lzLnRvU3RyaW5nKCldID0gdGhlbWVQcm92aWRlci5nZXRUaGVtZWRGaWxlUGF0aChcIndpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9JY29uVHJhY2VWaWV3LnN2Z1wiKTtcclxuICAgICAgICB0aGlzLl9pY29uUGF0aExpc3RbVmlld1R5cGUuQ29uZmlndXJhdGlvbi50b1N0cmluZygpXSA9IHRoZW1lUHJvdmlkZXIuZ2V0VGhlbWVkRmlsZVBhdGgoXCJ3aWRnZXRzL2NvbW1vbi9zdHlsZS9pbWFnZXMvSWNvblRyYWNlQ29uZmlndXJhdGlvblZpZXcuc3ZnXCIpO1xyXG4gICAgICAgIHRoaXMuX2ljb25QYXRoTGlzdFtWaWV3VHlwZS5PdmVydmlldy50b1N0cmluZygpXSA9IHRoZW1lUHJvdmlkZXIuZ2V0VGhlbWVkRmlsZVBhdGgoXCJ3aWRnZXRzL2NvbW1vbi9zdHlsZS9pbWFnZXMvSWNvbk92ZXJ2aWV3UGFnZS5zdmdcIik7XHJcbiAgICAgICAgdGhpcy5faWNvblBhdGhMaXN0W1ZpZXdUeXBlLlVzZXIudG9TdHJpbmcoKV0gPSB0aGVtZVByb3ZpZGVyLmdldFRoZW1lZEZpbGVQYXRoKFwid2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL0ljb25Vc2VyLnN2Z1wiKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCB7Vmlld1R5cGVQcm92aWRlciwgVmlld1R5cGV9OyJdfQ==