define(["require", "exports", "./busyInformation", "./imageProvider"], function (require, exports, busyInformation_1, imageProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CommonLayoutProvider = /** @class */ (function () {
        function CommonLayoutProvider() {
        }
        CommonLayoutProvider.getInstance = function () {
            if (!CommonLayoutProvider.instance) {
                CommonLayoutProvider.instance = new CommonLayoutProvider();
                // ... any one time initialization goes here ...
            }
            return CommonLayoutProvider.instance;
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
            return imageProvider_1.ImageProvider.getInstance().getImage("../app/widgets/common/style/images/disconnected.svg");
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
            var busyImage = imageProvider_1.ImageProvider.getInstance().getImage("../app/widgets/common/style/images/busy.svg");
            busyImage = busyImage.replace('width="120"', 'width="' + size.toString() + '"');
            busyImage = busyImage.replace('height="120"', 'height="' + size.toString() + '"');
            return busyImage;
        };
        return CommonLayoutProvider;
    }());
    exports.CommonLayoutProvider = CommonLayoutProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uTGF5b3V0UHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY29tbW9uL2NvbW1vbkxheW91dFByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUdBO1FBQUE7UUEyRkEsQ0FBQztRQXZGVSxnQ0FBVyxHQUFsQjtZQUNJLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLEVBQUU7Z0JBQ2hDLG9CQUFvQixDQUFDLFFBQVEsR0FBRyxJQUFJLG9CQUFvQixFQUFFLENBQUM7Z0JBQzNELGdEQUFnRDthQUNuRDtZQUNELE9BQU8sb0JBQW9CLENBQUMsUUFBUSxDQUFDO1FBQ3pDLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0gsa0RBQW1CLEdBQW5CLFVBQW9CLFdBQW1CLEVBQUUsZUFBZ0M7WUFDckUsSUFBSSx3QkFBd0IsR0FBRyxFQUFFLENBQUM7WUFDbEMsSUFBRyxlQUFlLENBQUMsT0FBTyxJQUFJLEVBQUUsRUFBQztnQkFDN0Isd0JBQXdCLEdBQUcsWUFBVyxHQUFDLFdBQVcsR0FBQywrRkFBOEYsR0FBRyxlQUFlLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQTtnQkFDdEwsSUFBRyxlQUFlLENBQUMsY0FBYyxJQUFJLElBQUksRUFBQztvQkFDdEMsd0JBQXdCLElBQUksT0FBTyxDQUFDO2lCQUN2QztxQkFDRztvQkFDQSx3QkFBd0IsSUFBSSwwQkFBMEIsQ0FBQztpQkFDMUQ7YUFDSjtZQUNELElBQUksV0FBVyxHQUFHLHNCQUFzQixDQUFBO1lBQ3hDLElBQUcsZUFBZSxDQUFDLGNBQWMsRUFBQztnQkFDOUIsV0FBVyxHQUFHLHlCQUF5QixDQUFDO2FBQzNDO1lBRUQsSUFBSSxJQUFJLEdBQUcsMEJBQ0csR0FBQyxXQUFXLEdBQUMsOE9BRXFCLEdBQUMsV0FBVyxHQUFDLEtBQUk7a0JBQ2xELHdCQUF3QjtnQkFDMUIsWUFBVyxHQUFDLFdBQVcsR0FBQyxnQ0FBK0IsR0FBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDLFNBQVMsQ0FBQyxHQUFHLG9EQUVqSSxDQUFDO1lBQ1osT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ0ssdUNBQVEsR0FBaEIsVUFBaUIsT0FBZ0IsRUFBRSxTQUFpQjtZQUNoRCxJQUFHLE9BQU8sSUFBSSx5QkFBTyxDQUFDLFlBQVksRUFBQztnQkFDL0IsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQzFDO2lCQUNJLElBQUcsT0FBTyxJQUFJLHlCQUFPLENBQUMsaUJBQWlCLEVBQUM7Z0JBQ3pDLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7YUFDdEM7WUFDRCxPQUFPLEVBQUUsQ0FBQztRQUNkLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSyxtREFBb0IsR0FBNUI7WUFDSSxPQUFPLDZCQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLHFEQUFxRCxDQUFDLENBQUM7UUFDdkcsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSyw4Q0FBZSxHQUF2QixVQUF3QixJQUFZO1lBQ2hDLElBQUksU0FBUyxHQUFHLDZCQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLDZDQUE2QyxDQUFDLENBQUM7WUFDcEcsU0FBUyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDaEYsU0FBUyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDbEYsT0FBTyxTQUFTLENBQUM7UUFDckIsQ0FBQztRQUNMLDJCQUFDO0lBQUQsQ0FBQyxBQTNGRCxJQTJGQztJQTNGWSxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCdXN5SW5mb3JtYXRpb24sIEltYWdlSWQgfSBmcm9tIFwiLi9idXN5SW5mb3JtYXRpb25cIjtcclxuaW1wb3J0IHsgSW1hZ2VQcm92aWRlciB9IGZyb20gXCIuL2ltYWdlUHJvdmlkZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDb21tb25MYXlvdXRQcm92aWRlcntcclxuXHJcbnByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBDb21tb25MYXlvdXRQcm92aWRlcjtcclxuICBcclxuICAgIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcclxuICAgICAgICBpZiAoIUNvbW1vbkxheW91dFByb3ZpZGVyLmluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIENvbW1vbkxheW91dFByb3ZpZGVyLmluc3RhbmNlID0gbmV3IENvbW1vbkxheW91dFByb3ZpZGVyKCk7XHJcbiAgICAgICAgICAgIC8vIC4uLiBhbnkgb25lIHRpbWUgaW5pdGlhbGl6YXRpb24gZ29lcyBoZXJlIC4uLlxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gQ29tbW9uTGF5b3V0UHJvdmlkZXIuaW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBidXN5IHNjcmVlbiByZXByZXNlbnRhdGlvbiBmb3IgdGhlIGdpdmVuIGJ1c3kgaW5mb3JtYXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29udGFpbmVySWRcclxuICAgICAqIEBwYXJhbSB7QnVzeUluZm9ybWF0aW9ufSBidXN5SW5mb3JtYXRpb25cclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tbW9uTGF5b3V0UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgZ2V0QnVzeVNjcmVlbkxheW91dChjb250YWluZXJJZDogc3RyaW5nLCBidXN5SW5mb3JtYXRpb246IEJ1c3lJbmZvcm1hdGlvbik6IHN0cmluZ3tcclxuICAgICAgICBsZXQgaW5uZXJIdG1sVGV4dFdpdGhNZXNzYWdlID0gXCJcIjtcclxuICAgICAgICBpZihidXN5SW5mb3JtYXRpb24ubWVzc2FnZSAhPSBcIlwiKXtcclxuICAgICAgICAgICAgaW5uZXJIdG1sVGV4dFdpdGhNZXNzYWdlID0gYDxkaXYgaWQ9XCJgK2NvbnRhaW5lcklkK2BfbWVzc2FnZVwiIHN0eWxlPSdtYXJnaW46YXV0bzsgY29sb3I6IHdoaXRlOyBmb250LWZhbWlseTogdmFyKC0tbWFpbi1mb250KTsgZm9udC1zaXplOiAyMnB4Jz5gICsgYnVzeUluZm9ybWF0aW9uLm1lc3NhZ2UgKyBgPC9kaXY+YFxyXG4gICAgICAgICAgICBpZihidXN5SW5mb3JtYXRpb24ucm93T3JpZW50YXRpb24gPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICBpbm5lckh0bWxUZXh0V2l0aE1lc3NhZ2UgKz0gXCI8L2JyPlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBpbm5lckh0bWxUZXh0V2l0aE1lc3NhZ2UgKz0gXCImbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDtcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgb3JpZW50YXRpb24gPSBcImZsZXgtZGlyZWN0aW9uOiByb3c7XCJcclxuICAgICAgICBpZihidXN5SW5mb3JtYXRpb24ucm93T3JpZW50YXRpb24pe1xyXG4gICAgICAgICAgICBvcmllbnRhdGlvbiA9IFwiZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBodG1sID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGlkPVwiYCtjb250YWluZXJJZCtgXCIgY2xhc3M9XCJidXN5UGFnZVwiIFxyXG4gICAgICAgICAgICAgICAgc3R5bGU9J2Rpc3BsYXk6ZmxleDsgcG9zaXRpb246YWJzb2x1dGU7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDEwMCU7IHRvcDogMHB4OyBsZWZ0OiAwcHg7IGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwwLDAsMC43KTsgei1pbmRleDogOTk7ICc+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwibWFyZ2luOmF1dG87IGRpc3BsYXk6ZmxleDsgYCtvcmllbnRhdGlvbitgXCI+YFxyXG4gICAgICAgICAgICAgICAgICAgICArIGlubmVySHRtbFRleHRXaXRoTWVzc2FnZSArIFxyXG4gICAgICAgICAgICAgICAgICAgICBgPGRpdiBpZD1cImArY29udGFpbmVySWQrYF9pbWFnZVwiIHN0eWxlPSdtYXJnaW46YXV0bzsnPmAgKyAgdGhpcy5nZXRJbWFnZShidXN5SW5mb3JtYXRpb24uaW1hZ2VJZCwgYnVzeUluZm9ybWF0aW9uLmltYWdlU2l6ZSkgKyBgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+YDtcclxuICAgICAgICByZXR1cm4gaHRtbDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBpbWFnZSBmb3IgdGhlIGdpdmVuIGlkIHdpdGggdGhlIGdpdmVuIGltYWdlU2l6ZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0ltYWdlSWR9IGltYWdlSWRcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbWFnZVNpemVcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tbW9uTGF5b3V0UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRJbWFnZShpbWFnZUlkOiBJbWFnZUlkLCBpbWFnZVNpemU6IG51bWJlcik6IHN0cmluZ3tcclxuICAgICAgICBpZihpbWFnZUlkID09IEltYWdlSWQuZGVmYXVsdEltYWdlKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGVmYXVsdEltYWdlKGltYWdlU2l6ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoaW1hZ2VJZCA9PSBJbWFnZUlkLmRpc2Nvbm5lY3RlZEltYWdlKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGlzY29ubmVjdGVkSW1hZ2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkaXNjb25uZWN0ZWQgaW1hZ2VcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBDb21tb25MYXlvdXRQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldERpc2Nvbm5lY3RlZEltYWdlKCk6c3RyaW5ne1xyXG4gICAgICAgIHJldHVybiBJbWFnZVByb3ZpZGVyLmdldEluc3RhbmNlKCkuZ2V0SW1hZ2UoXCIuLi9hcHAvd2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL2Rpc2Nvbm5lY3RlZC5zdmdcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IGJ1c3kgaW1hZ2Ugd2l0aCB0aGUgZ2l2ZW4gc2l6ZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2l6ZVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBDb21tb25MYXlvdXRQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldERlZmF1bHRJbWFnZShzaXplOiBudW1iZXIpe1xyXG4gICAgICAgIGxldCBidXN5SW1hZ2UgPSBJbWFnZVByb3ZpZGVyLmdldEluc3RhbmNlKCkuZ2V0SW1hZ2UoXCIuLi9hcHAvd2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL2J1c3kuc3ZnXCIpO1xyXG4gICAgICAgIGJ1c3lJbWFnZSA9IGJ1c3lJbWFnZS5yZXBsYWNlKCd3aWR0aD1cIjEyMFwiJywgJ3dpZHRoPVwiJyArIHNpemUudG9TdHJpbmcoKSArICdcIicpO1xyXG4gICAgICAgIGJ1c3lJbWFnZSA9IGJ1c3lJbWFnZS5yZXBsYWNlKCdoZWlnaHQ9XCIxMjBcIicsICdoZWlnaHQ9XCInICsgc2l6ZS50b1N0cmluZygpICsgJ1wiJyk7XHJcbiAgICAgICAgcmV0dXJuIGJ1c3lJbWFnZTtcclxuICAgIH1cclxufSJdfQ==