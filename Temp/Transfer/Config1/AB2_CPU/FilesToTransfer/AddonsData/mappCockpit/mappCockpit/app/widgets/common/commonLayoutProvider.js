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
define(["require", "exports", "./busyInformation", "./defaultComponentSettingsCommonLayoutProvider", "../../common/componentBase/componentWithoutSettingsBase"], function (require, exports, busyInformation_1, defaultComponentSettingsCommonLayoutProvider_1, componentWithoutSettingsBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CommonLayoutProvider = /** @class */ (function (_super) {
        __extends(CommonLayoutProvider, _super);
        function CommonLayoutProvider() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CommonLayoutProvider.prototype.initializeComponent = function () {
            _super.prototype.initializeComponent.call(this);
            this.component.defaultSettingsDataId = defaultComponentSettingsCommonLayoutProvider_1.DefaultComponentSettingsCommonLayoutProvider.ProviderDefinitionId;
        };
        CommonLayoutProvider.prototype.initialize = function () {
            this.component.loadComponentSettings();
            var settings = this.component.getComponentSettings();
            if (settings != undefined) {
                this.setComponentSettings(settings);
            }
        };
        /**
         * Returns the default component settings for this provider
         *
         * @returns {(ComponentSettings|undefined)}
         * @memberof CommonLayoutProvider
         */
        CommonLayoutProvider.prototype.getDefaultComponentSettings = function () {
            return defaultComponentSettingsCommonLayoutProvider_1.DefaultComponentSettingsCommonLayoutProvider.getCommonLayoutProviderDefinition();
        };
        CommonLayoutProvider.getInstance = function () {
            if (!CommonLayoutProvider.instance) {
                CommonLayoutProvider.instance = new CommonLayoutProvider();
                // ... any one time initialization goes here ...
            }
            return CommonLayoutProvider.instance;
        };
        /**
         * Disposes the CommonLayoutProvider
         *
         * @memberof CommonLayoutProvider
         */
        CommonLayoutProvider.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        /**
         * Returns the busy screen representation for the given busy information
         *
         * @param {string} containerId
         * @param {BusyInformation} busyInformation
         * @returns {string}
         * @memberof CommonLayoutProvider
         */
        CommonLayoutProvider.prototype.getBusyScreenLayout = function (containerId, busyInformation) {
            var innerHtmlTextWithMessage = "";
            if (busyInformation.message != "") {
                innerHtmlTextWithMessage = "<div id=\"" + containerId + "_message\" style='margin:auto; color: white; font-family: var(--main-font); font-size: 22px'>" + busyInformation.message + "</div>";
                if (busyInformation.rowOrientation == true) {
                    innerHtmlTextWithMessage += "</br>";
                }
                else {
                    innerHtmlTextWithMessage += "&nbsp;&nbsp;&nbsp;&nbsp;";
                }
            }
            var orientation = "flex-direction: row;";
            if (busyInformation.rowOrientation) {
                orientation = "flex-direction: column;";
            }
            var html = "\n            <div id=\"" + containerId + "\" class=\"busyPage\" \n                style='display:flex; position:absolute; width: 100%; height: 100%; top: 0px; left: 0px; background-color: rgba(0,0,0,0.7); z-index: 99; '>\n                <div style=\"margin:auto; display:flex; " + orientation + "\">"
                + innerHtmlTextWithMessage +
                "<div id=\"" + containerId + "_image\" style='margin:auto;'>" + this.getImage(busyInformation.imageId, busyInformation.imageSize) + "</div>\n                </div>\n            </div>";
            return html;
        };
        /**
         * Returns the image for the given id with the given imageSize
         *
         * @private
         * @param {ImageId} imageId
         * @param {number} imageSize
         * @returns {string}
         * @memberof CommonLayoutProvider
         */
        CommonLayoutProvider.prototype.getImage = function (imageId, imageSize) {
            if (imageId == busyInformation_1.ImageId.defaultImage) {
                return this.getDefaultImage(imageSize);
            }
            else if (imageId == busyInformation_1.ImageId.disconnectedImage) {
                return this.getDisconnectedImage();
            }
            return "";
        };
        /**
         * Returns the disconnected image
         *
         * @private
         * @returns {string}
         * @memberof CommonLayoutProvider
         */
        CommonLayoutProvider.prototype.getDisconnectedImage = function () {
            var imageProvider = this.component.getSubComponent(defaultComponentSettingsCommonLayoutProvider_1.DefaultComponentSettingsCommonLayoutProvider.ImageProviderId);
            if (imageProvider == undefined) {
                return "";
            }
            return imageProvider.getImage("../app/widgets/common/style/images/disconnected.svg");
        };
        /**
         * Returns the default busy image with the given size
         *
         * @private
         * @param {number} size
         * @returns
         * @memberof CommonLayoutProvider
         */
        CommonLayoutProvider.prototype.getDefaultImage = function (size) {
            var imageProvider = this.component.getSubComponent(defaultComponentSettingsCommonLayoutProvider_1.DefaultComponentSettingsCommonLayoutProvider.ImageProviderId);
            if (imageProvider == undefined) {
                return "";
            }
            var busyImage = imageProvider.getImage("../app/widgets/common/style/images/busy.svg");
            busyImage = busyImage.replace('width="120"', 'width="' + size.toString() + '"');
            busyImage = busyImage.replace('height="120"', 'height="' + size.toString() + '"');
            return busyImage;
        };
        return CommonLayoutProvider;
    }(componentWithoutSettingsBase_1.ComponentWithoutSettingsBase));
    exports.CommonLayoutProvider = CommonLayoutProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uTGF5b3V0UHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY29tbW9uL2NvbW1vbkxheW91dFByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFPQTtRQUEwQyx3Q0FBNEI7UUFBdEU7O1FBc0lBLENBQUM7UUFsSVEsa0RBQW1CLEdBQTFCO1lBQ00saUJBQU0sbUJBQW1CLFdBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsU0FBUyxDQUFDLHFCQUFxQixHQUFHLDJGQUE0QyxDQUFDLG9CQUFvQixDQUFDO1FBQzdHLENBQUM7UUFFRCx5Q0FBVSxHQUFWO1lBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQ3ZDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztZQUNyRCxJQUFHLFFBQVEsSUFBSSxTQUFTLEVBQUM7Z0JBQ3JCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUN2QztRQUNMLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNILDBEQUEyQixHQUEzQjtZQUNJLE9BQU8sMkZBQTRDLENBQUMsaUNBQWlDLEVBQUUsQ0FBQztRQUM1RixDQUFDO1FBSU0sZ0NBQVcsR0FBbEI7WUFDSSxJQUFJLENBQUMsb0JBQW9CLENBQUMsUUFBUSxFQUFFO2dCQUNoQyxvQkFBb0IsQ0FBQyxRQUFRLEdBQUcsSUFBSSxvQkFBb0IsRUFBRSxDQUFDO2dCQUMzRCxnREFBZ0Q7YUFDbkQ7WUFDRCxPQUFPLG9CQUFvQixDQUFDLFFBQVEsQ0FBQztRQUN6QyxDQUFDO1FBRUQ7Ozs7V0FJRztRQUNILHNDQUFPLEdBQVA7WUFDSSxpQkFBTSxPQUFPLFdBQUUsQ0FBQztRQUNwQixDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNILGtEQUFtQixHQUFuQixVQUFvQixXQUFtQixFQUFFLGVBQWdDO1lBQ3JFLElBQUksd0JBQXdCLEdBQUcsRUFBRSxDQUFDO1lBQ2xDLElBQUcsZUFBZSxDQUFDLE9BQU8sSUFBSSxFQUFFLEVBQUM7Z0JBQzdCLHdCQUF3QixHQUFHLFlBQVcsR0FBQyxXQUFXLEdBQUMsK0ZBQThGLEdBQUcsZUFBZSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUE7Z0JBQ3RMLElBQUcsZUFBZSxDQUFDLGNBQWMsSUFBSSxJQUFJLEVBQUM7b0JBQ3RDLHdCQUF3QixJQUFJLE9BQU8sQ0FBQztpQkFDdkM7cUJBQ0c7b0JBQ0Esd0JBQXdCLElBQUksMEJBQTBCLENBQUM7aUJBQzFEO2FBQ0o7WUFDRCxJQUFJLFdBQVcsR0FBRyxzQkFBc0IsQ0FBQTtZQUN4QyxJQUFHLGVBQWUsQ0FBQyxjQUFjLEVBQUM7Z0JBQzlCLFdBQVcsR0FBRyx5QkFBeUIsQ0FBQzthQUMzQztZQUVELElBQUksSUFBSSxHQUFHLDBCQUNHLEdBQUMsV0FBVyxHQUFDLDhPQUVxQixHQUFDLFdBQVcsR0FBQyxLQUFJO2tCQUNsRCx3QkFBd0I7Z0JBQzFCLFlBQVcsR0FBQyxXQUFXLEdBQUMsZ0NBQStCLEdBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQyxTQUFTLENBQUMsR0FBRyxvREFFakksQ0FBQztZQUNaLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFFRDs7Ozs7Ozs7V0FRRztRQUNLLHVDQUFRLEdBQWhCLFVBQWlCLE9BQWdCLEVBQUUsU0FBaUI7WUFDaEQsSUFBRyxPQUFPLElBQUkseUJBQU8sQ0FBQyxZQUFZLEVBQUM7Z0JBQy9CLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUMxQztpQkFDSSxJQUFHLE9BQU8sSUFBSSx5QkFBTyxDQUFDLGlCQUFpQixFQUFDO2dCQUN6QyxPQUFPLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO2FBQ3RDO1lBQ0QsT0FBTyxFQUFFLENBQUM7UUFDZCxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ssbURBQW9CLEdBQTVCO1lBQ0ksSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsMkZBQTRDLENBQUMsZUFBZSxDQUFtQixDQUFDO1lBQ25JLElBQUcsYUFBYSxJQUFJLFNBQVMsRUFBQztnQkFDMUIsT0FBTyxFQUFFLENBQUM7YUFDYjtZQUNELE9BQU8sYUFBYSxDQUFDLFFBQVEsQ0FBQyxxREFBcUQsQ0FBQyxDQUFDO1FBQ3pGLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0ssOENBQWUsR0FBdkIsVUFBd0IsSUFBWTtZQUNoQyxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQywyRkFBNEMsQ0FBQyxlQUFlLENBQW1CLENBQUM7WUFDbkksSUFBRyxhQUFhLElBQUksU0FBUyxFQUFDO2dCQUMxQixPQUFPLEVBQUUsQ0FBQzthQUNiO1lBRUQsSUFBSSxTQUFTLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO1lBQ3RGLFNBQVMsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ2hGLFNBQVMsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ2xGLE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFDTCwyQkFBQztJQUFELENBQUMsQUF0SUQsQ0FBMEMsMkRBQTRCLEdBc0lyRTtJQXRJWSxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCdXN5SW5mb3JtYXRpb24sIEltYWdlSWQgfSBmcm9tIFwiLi9idXN5SW5mb3JtYXRpb25cIjtcclxuaW1wb3J0IHsgRGVmYXVsdENvbXBvbmVudFNldHRpbmdzQ29tbW9uTGF5b3V0UHJvdmlkZXIgfSBmcm9tIFwiLi9kZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NDb21tb25MYXlvdXRQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRXaXRob3V0U2V0dGluZ3NCYXNlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFdpdGhvdXRTZXR0aW5nc0Jhc2VcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgSUltYWdlUHJvdmlkZXIgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL2ltYWdlUHJvdmlkZXJJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSUNvbW1vbkxheW91dFByb3ZpZGVyIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9jb21tb25MYXlvdXRQcm92aWRlckludGVyZmFjZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbW1vbkxheW91dFByb3ZpZGVyIGV4dGVuZHMgQ29tcG9uZW50V2l0aG91dFNldHRpbmdzQmFzZSBpbXBsZW1lbnRzIElDb21tb25MYXlvdXRQcm92aWRlcntcclxuXHJcbiAgICBwcml2YXRlIF9pbWFnZVByb3ZpZGVyOiBJSW1hZ2VQcm92aWRlcnx1bmRlZmluZWQ7XHJcblxyXG4gIHB1YmxpYyBpbml0aWFsaXplQ29tcG9uZW50KCl7XHJcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZUNvbXBvbmVudCgpO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmRlZmF1bHRTZXR0aW5nc0RhdGFJZCA9IERlZmF1bHRDb21wb25lbnRTZXR0aW5nc0NvbW1vbkxheW91dFByb3ZpZGVyLlByb3ZpZGVyRGVmaW5pdGlvbklkO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRpYWxpemUoKXtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5sb2FkQ29tcG9uZW50U2V0dGluZ3MoKTtcclxuICAgICAgICBsZXQgc2V0dGluZ3MgPSB0aGlzLmNvbXBvbmVudC5nZXRDb21wb25lbnRTZXR0aW5ncygpO1xyXG4gICAgICAgIGlmKHNldHRpbmdzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Q29tcG9uZW50U2V0dGluZ3Moc2V0dGluZ3MpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IGNvbXBvbmVudCBzZXR0aW5ncyBmb3IgdGhpcyBwcm92aWRlclxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsoQ29tcG9uZW50U2V0dGluZ3N8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBDb21tb25MYXlvdXRQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBnZXREZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MoKTogQ29tcG9uZW50U2V0dGluZ3N8dW5kZWZpbmVke1xyXG4gICAgICAgIHJldHVybiBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NDb21tb25MYXlvdXRQcm92aWRlci5nZXRDb21tb25MYXlvdXRQcm92aWRlckRlZmluaXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogQ29tbW9uTGF5b3V0UHJvdmlkZXI7XHJcbiAgXHJcbiAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoKSB7XHJcbiAgICAgICAgaWYgKCFDb21tb25MYXlvdXRQcm92aWRlci5pbnN0YW5jZSkge1xyXG4gICAgICAgICAgICBDb21tb25MYXlvdXRQcm92aWRlci5pbnN0YW5jZSA9IG5ldyBDb21tb25MYXlvdXRQcm92aWRlcigpO1xyXG4gICAgICAgICAgICAvLyAuLi4gYW55IG9uZSB0aW1lIGluaXRpYWxpemF0aW9uIGdvZXMgaGVyZSAuLi5cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIENvbW1vbkxheW91dFByb3ZpZGVyLmluc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzcG9zZXMgdGhlIENvbW1vbkxheW91dFByb3ZpZGVyXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENvbW1vbkxheW91dFByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIGRpc3Bvc2UoKXtcclxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBidXN5IHNjcmVlbiByZXByZXNlbnRhdGlvbiBmb3IgdGhlIGdpdmVuIGJ1c3kgaW5mb3JtYXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29udGFpbmVySWRcclxuICAgICAqIEBwYXJhbSB7QnVzeUluZm9ybWF0aW9ufSBidXN5SW5mb3JtYXRpb25cclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tbW9uTGF5b3V0UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgZ2V0QnVzeVNjcmVlbkxheW91dChjb250YWluZXJJZDogc3RyaW5nLCBidXN5SW5mb3JtYXRpb246IEJ1c3lJbmZvcm1hdGlvbik6IHN0cmluZ3tcclxuICAgICAgICBsZXQgaW5uZXJIdG1sVGV4dFdpdGhNZXNzYWdlID0gXCJcIjtcclxuICAgICAgICBpZihidXN5SW5mb3JtYXRpb24ubWVzc2FnZSAhPSBcIlwiKXtcclxuICAgICAgICAgICAgaW5uZXJIdG1sVGV4dFdpdGhNZXNzYWdlID0gYDxkaXYgaWQ9XCJgK2NvbnRhaW5lcklkK2BfbWVzc2FnZVwiIHN0eWxlPSdtYXJnaW46YXV0bzsgY29sb3I6IHdoaXRlOyBmb250LWZhbWlseTogdmFyKC0tbWFpbi1mb250KTsgZm9udC1zaXplOiAyMnB4Jz5gICsgYnVzeUluZm9ybWF0aW9uLm1lc3NhZ2UgKyBgPC9kaXY+YFxyXG4gICAgICAgICAgICBpZihidXN5SW5mb3JtYXRpb24ucm93T3JpZW50YXRpb24gPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICBpbm5lckh0bWxUZXh0V2l0aE1lc3NhZ2UgKz0gXCI8L2JyPlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBpbm5lckh0bWxUZXh0V2l0aE1lc3NhZ2UgKz0gXCImbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDtcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgb3JpZW50YXRpb24gPSBcImZsZXgtZGlyZWN0aW9uOiByb3c7XCJcclxuICAgICAgICBpZihidXN5SW5mb3JtYXRpb24ucm93T3JpZW50YXRpb24pe1xyXG4gICAgICAgICAgICBvcmllbnRhdGlvbiA9IFwiZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBodG1sID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGlkPVwiYCtjb250YWluZXJJZCtgXCIgY2xhc3M9XCJidXN5UGFnZVwiIFxyXG4gICAgICAgICAgICAgICAgc3R5bGU9J2Rpc3BsYXk6ZmxleDsgcG9zaXRpb246YWJzb2x1dGU7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDEwMCU7IHRvcDogMHB4OyBsZWZ0OiAwcHg7IGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwwLDAsMC43KTsgei1pbmRleDogOTk7ICc+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwibWFyZ2luOmF1dG87IGRpc3BsYXk6ZmxleDsgYCtvcmllbnRhdGlvbitgXCI+YFxyXG4gICAgICAgICAgICAgICAgICAgICArIGlubmVySHRtbFRleHRXaXRoTWVzc2FnZSArIFxyXG4gICAgICAgICAgICAgICAgICAgICBgPGRpdiBpZD1cImArY29udGFpbmVySWQrYF9pbWFnZVwiIHN0eWxlPSdtYXJnaW46YXV0bzsnPmAgKyAgdGhpcy5nZXRJbWFnZShidXN5SW5mb3JtYXRpb24uaW1hZ2VJZCwgYnVzeUluZm9ybWF0aW9uLmltYWdlU2l6ZSkgKyBgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+YDtcclxuICAgICAgICByZXR1cm4gaHRtbDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBpbWFnZSBmb3IgdGhlIGdpdmVuIGlkIHdpdGggdGhlIGdpdmVuIGltYWdlU2l6ZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0ltYWdlSWR9IGltYWdlSWRcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbWFnZVNpemVcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tbW9uTGF5b3V0UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRJbWFnZShpbWFnZUlkOiBJbWFnZUlkLCBpbWFnZVNpemU6IG51bWJlcik6IHN0cmluZ3tcclxuICAgICAgICBpZihpbWFnZUlkID09IEltYWdlSWQuZGVmYXVsdEltYWdlKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGVmYXVsdEltYWdlKGltYWdlU2l6ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoaW1hZ2VJZCA9PSBJbWFnZUlkLmRpc2Nvbm5lY3RlZEltYWdlKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGlzY29ubmVjdGVkSW1hZ2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkaXNjb25uZWN0ZWQgaW1hZ2VcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBDb21tb25MYXlvdXRQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldERpc2Nvbm5lY3RlZEltYWdlKCk6c3RyaW5ne1xyXG4gICAgICAgIGxldCBpbWFnZVByb3ZpZGVyID0gdGhpcy5jb21wb25lbnQuZ2V0U3ViQ29tcG9uZW50KERlZmF1bHRDb21wb25lbnRTZXR0aW5nc0NvbW1vbkxheW91dFByb3ZpZGVyLkltYWdlUHJvdmlkZXJJZCkgYXMgSUltYWdlUHJvdmlkZXI7XHJcbiAgICAgICAgaWYoaW1hZ2VQcm92aWRlciA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGltYWdlUHJvdmlkZXIuZ2V0SW1hZ2UoXCIuLi9hcHAvd2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL2Rpc2Nvbm5lY3RlZC5zdmdcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IGJ1c3kgaW1hZ2Ugd2l0aCB0aGUgZ2l2ZW4gc2l6ZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2l6ZVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBDb21tb25MYXlvdXRQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldERlZmF1bHRJbWFnZShzaXplOiBudW1iZXIpe1xyXG4gICAgICAgIGxldCBpbWFnZVByb3ZpZGVyID0gdGhpcy5jb21wb25lbnQuZ2V0U3ViQ29tcG9uZW50KERlZmF1bHRDb21wb25lbnRTZXR0aW5nc0NvbW1vbkxheW91dFByb3ZpZGVyLkltYWdlUHJvdmlkZXJJZCkgYXMgSUltYWdlUHJvdmlkZXI7XHJcbiAgICAgICAgaWYoaW1hZ2VQcm92aWRlciA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBidXN5SW1hZ2UgPSBpbWFnZVByb3ZpZGVyLmdldEltYWdlKFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9idXN5LnN2Z1wiKTtcclxuICAgICAgICBidXN5SW1hZ2UgPSBidXN5SW1hZ2UucmVwbGFjZSgnd2lkdGg9XCIxMjBcIicsICd3aWR0aD1cIicgKyBzaXplLnRvU3RyaW5nKCkgKyAnXCInKTtcclxuICAgICAgICBidXN5SW1hZ2UgPSBidXN5SW1hZ2UucmVwbGFjZSgnaGVpZ2h0PVwiMTIwXCInLCAnaGVpZ2h0PVwiJyArIHNpemUudG9TdHJpbmcoKSArICdcIicpO1xyXG4gICAgICAgIHJldHVybiBidXN5SW1hZ2U7XHJcbiAgICB9XHJcbn0iXX0=