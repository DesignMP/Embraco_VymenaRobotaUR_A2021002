define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Image provider to preload some image(the data of the images e.g. <svg ..... />)
     *
     * @export
     * @class ImageProvider
     */
    var ImageProvider = /** @class */ (function () {
        /**
         * Creates an instance of ImageProvider
         * @memberof ImageProvider
         */
        function ImageProvider() {
            // Preload images at the initialization 
            this.imageDatas = new Map();
            // Images for common topics
            this.loadSvg("../app/widgets/common/style/images/disconnected.svg");
            this.loadSvg("../app/widgets/common/style/images/busy.svg");
            // Images for tree grids
            this.loadSvg("../app/widgets/common/style/images/tree/timeSeries.svg");
            this.loadSvg("../app/widgets/common/style/images/tree/xySeries.svg");
            this.loadSvg("../app/widgets/common/style/images/tree/fftSeries.svg");
            // Images for signal manager drag drop
            this.loadSvg("../app/widgets/common/style/images/dragDrop/dropNotPossible.svg");
            this.loadSvg("../app/widgets/common/style/images/dragDrop/ytSeries.svg");
            this.loadSvg("../app/widgets/common/style/images/dragDrop/xySeries.svg");
            this.loadSvg("../app/widgets/common/style/images/dragDrop/fftSeries.svg");
            this.loadSvg("../app/widgets/common/style/images/dragDrop/addNewScale.svg");
            this.loadSvg("../app/widgets/common/style/images/dragDrop/assignToScale.svg");
            this.loadSvg("../app/widgets/common/style/images/dragDrop/addNewXYChart.svg");
            this.loadSvg("../app/widgets/common/style/images/dragDrop/addNewYTChart.svg");
            this.loadSvg("../app/widgets/common/style/images/dragDrop/addNewFFTChart.svg");
            this.loadSvg("../app/widgets/common/style/images/dragDrop/assignToChart.svg");
            this.loadSvg("../app/widgets/common/style/images/dragDrop/severalYTSeries.svg");
            this.loadSvg("../app/widgets/common/style/images/dragDrop/severalXYSeries.svg");
            this.loadSvg("../app/widgets/common/style/images/dragDrop/severalFFTSeries.svg");
        }
        /**
         * gets a singleton instance of ImageProvider
         *
         * @readonly
         * @type {ImageProvider}
         * @memberof ImageProvider
         */
        ImageProvider.getInstance = function () {
            this._instance = this._instance ? this._instance : new ImageProvider();
            return this._instance;
        };
        /**
         * Returns the data of an image for the given path(e.g ../app/widgets/common/style/images/tree/timeSeries.svg) or "" if not defined
         *
         * @param {*} imagePath
         * @returns {string}
         * @memberof ImageProvider
         */
        ImageProvider.prototype.getImage = function (imagePath) {
            if (this.imageDatas.has(imagePath)) {
                var imageData = this.imageDatas.get(imagePath);
                if (imageData == undefined) {
                    return "";
                }
                return imageData;
            }
            return "";
        };
        /**
         * Starts loading of a svg file from server
         *
         * @private
         * @param {string} svgId
         * @memberof ImageProvider
         */
        ImageProvider.prototype.loadSvg = function (svgPath) {
            var _this = this;
            $.get(svgPath, function (svgData) { _this.onSvgLoaded(svgPath, svgData); });
        };
        /**
         * Called after the svg file have been loaded
         *
         * @private
         * @param {string} svgPath
         * @param {*} svgData
         * @memberof ImageProvider
         */
        ImageProvider.prototype.onSvgLoaded = function (svgPath, svgData) {
            this.imageDatas.set(svgPath, svgData.documentElement.outerHTML);
        };
        return ImageProvider;
    }());
    exports.ImageProvider = ImageProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2VQcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jb21tb24vaW1hZ2VQcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFBQTs7Ozs7T0FLRztJQUNIO1FBb0NJOzs7V0FHRztRQUNIO1lBQ0ksd0NBQXdDO1lBckNwQyxlQUFVLEdBQUcsSUFBSSxHQUFHLEVBQWtCLENBQUM7WUF1QzNDLDJCQUEyQjtZQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLHFEQUFxRCxDQUFDLENBQUM7WUFDcEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO1lBRTVELHdCQUF3QjtZQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLHdEQUF3RCxDQUFDLENBQUM7WUFDdkUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxzREFBc0QsQ0FBQyxDQUFDO1lBQ3JFLElBQUksQ0FBQyxPQUFPLENBQUMsdURBQXVELENBQUMsQ0FBQztZQUV0RSxzQ0FBc0M7WUFDdEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpRUFBaUUsQ0FBQyxDQUFDO1lBQ2hGLElBQUksQ0FBQyxPQUFPLENBQUMsMERBQTBELENBQUMsQ0FBQztZQUN6RSxJQUFJLENBQUMsT0FBTyxDQUFDLDBEQUEwRCxDQUFDLENBQUM7WUFDekUsSUFBSSxDQUFDLE9BQU8sQ0FBQywyREFBMkQsQ0FBQyxDQUFDO1lBQzFFLElBQUksQ0FBQyxPQUFPLENBQUMsNkRBQTZELENBQUMsQ0FBQztZQUM1RSxJQUFJLENBQUMsT0FBTyxDQUFDLCtEQUErRCxDQUFDLENBQUM7WUFDOUUsSUFBSSxDQUFDLE9BQU8sQ0FBQywrREFBK0QsQ0FBQyxDQUFDO1lBQzlFLElBQUksQ0FBQyxPQUFPLENBQUMsK0RBQStELENBQUMsQ0FBQztZQUM5RSxJQUFJLENBQUMsT0FBTyxDQUFDLGdFQUFnRSxDQUFDLENBQUM7WUFDL0UsSUFBSSxDQUFDLE9BQU8sQ0FBQywrREFBK0QsQ0FBQyxDQUFDO1lBQzlFLElBQUksQ0FBQyxPQUFPLENBQUMsaUVBQWlFLENBQUMsQ0FBQztZQUNoRixJQUFJLENBQUMsT0FBTyxDQUFDLGlFQUFpRSxDQUFDLENBQUM7WUFDaEYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrRUFBa0UsQ0FBQyxDQUFDO1FBQ3JGLENBQUM7UUE1REQ7Ozs7OztXQU1HO1FBQ1cseUJBQVcsR0FBekI7WUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksYUFBYSxFQUFFLENBQUM7WUFDdkUsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzFCLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSSxnQ0FBUSxHQUFmLFVBQWdCLFNBQVM7WUFDckIsSUFBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBQztnQkFDOUIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQy9DLElBQUcsU0FBUyxJQUFJLFNBQVMsRUFBQztvQkFDdEIsT0FBTyxFQUFFLENBQUM7aUJBQ2I7Z0JBQ0QsT0FBTyxTQUFTLENBQUM7YUFDcEI7WUFDRCxPQUFPLEVBQUUsQ0FBQztRQUNkLENBQUM7UUFrQ0Q7Ozs7OztXQU1HO1FBQ0ssK0JBQU8sR0FBZixVQUFnQixPQUFlO1lBQS9CLGlCQUVDO1lBREcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsVUFBQyxPQUFPLElBQU8sS0FBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6RSxDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNLLG1DQUFXLEdBQW5CLFVBQW9CLE9BQWUsRUFBRSxPQUFZO1lBQzdDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQ25FLENBQUM7UUFDTCxvQkFBQztJQUFELENBQUMsQUExRkQsSUEwRkM7SUExRlksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogSW1hZ2UgcHJvdmlkZXIgdG8gcHJlbG9hZCBzb21lIGltYWdlKHRoZSBkYXRhIG9mIHRoZSBpbWFnZXMgZS5nLiA8c3ZnIC4uLi4uIC8+KVxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBjbGFzcyBJbWFnZVByb3ZpZGVyXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgSW1hZ2VQcm92aWRlcntcclxuICAgIC8vIGhvbGRzIGFuIGluc3RhbmNlIG9mIHRoaXMgY2xhc3NcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogSW1hZ2VQcm92aWRlcjtcclxuXHJcbiAgICBwcml2YXRlIGltYWdlRGF0YXMgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0cyBhIHNpbmdsZXRvbiBpbnN0YW5jZSBvZiBJbWFnZVByb3ZpZGVyXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7SW1hZ2VQcm92aWRlcn1cclxuICAgICAqIEBtZW1iZXJvZiBJbWFnZVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogSW1hZ2VQcm92aWRlciB7XHJcbiAgICAgICAgdGhpcy5faW5zdGFuY2UgPSB0aGlzLl9pbnN0YW5jZSA/IHRoaXMuX2luc3RhbmNlIDogbmV3IEltYWdlUHJvdmlkZXIoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkYXRhIG9mIGFuIGltYWdlIGZvciB0aGUgZ2l2ZW4gcGF0aChlLmcgLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy90cmVlL3RpbWVTZXJpZXMuc3ZnKSBvciBcIlwiIGlmIG5vdCBkZWZpbmVkXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBpbWFnZVBhdGhcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgSW1hZ2VQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0SW1hZ2UoaW1hZ2VQYXRoKTogc3RyaW5ne1xyXG4gICAgICAgIGlmKHRoaXMuaW1hZ2VEYXRhcy5oYXMoaW1hZ2VQYXRoKSl7XHJcbiAgICAgICAgICAgIGxldCBpbWFnZURhdGEgPSB0aGlzLmltYWdlRGF0YXMuZ2V0KGltYWdlUGF0aCk7XHJcbiAgICAgICAgICAgIGlmKGltYWdlRGF0YSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGltYWdlRGF0YTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEltYWdlUHJvdmlkZXJcclxuICAgICAqIEBtZW1iZXJvZiBJbWFnZVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKXtcclxuICAgICAgICAvLyBQcmVsb2FkIGltYWdlcyBhdCB0aGUgaW5pdGlhbGl6YXRpb24gXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gSW1hZ2VzIGZvciBjb21tb24gdG9waWNzXHJcbiAgICAgICAgdGhpcy5sb2FkU3ZnKFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9kaXNjb25uZWN0ZWQuc3ZnXCIpO1xyXG4gICAgICAgIHRoaXMubG9hZFN2ZyhcIi4uL2FwcC93aWRnZXRzL2NvbW1vbi9zdHlsZS9pbWFnZXMvYnVzeS5zdmdcIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gSW1hZ2VzIGZvciB0cmVlIGdyaWRzXHJcbiAgICAgICAgdGhpcy5sb2FkU3ZnKFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy90cmVlL3RpbWVTZXJpZXMuc3ZnXCIpO1xyXG4gICAgICAgIHRoaXMubG9hZFN2ZyhcIi4uL2FwcC93aWRnZXRzL2NvbW1vbi9zdHlsZS9pbWFnZXMvdHJlZS94eVNlcmllcy5zdmdcIik7XHJcbiAgICAgICAgdGhpcy5sb2FkU3ZnKFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy90cmVlL2ZmdFNlcmllcy5zdmdcIik7XHJcblxyXG4gICAgICAgIC8vIEltYWdlcyBmb3Igc2lnbmFsIG1hbmFnZXIgZHJhZyBkcm9wXHJcbiAgICAgICAgdGhpcy5sb2FkU3ZnKFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9kcmFnRHJvcC9kcm9wTm90UG9zc2libGUuc3ZnXCIpO1xyXG4gICAgICAgIHRoaXMubG9hZFN2ZyhcIi4uL2FwcC93aWRnZXRzL2NvbW1vbi9zdHlsZS9pbWFnZXMvZHJhZ0Ryb3AveXRTZXJpZXMuc3ZnXCIpO1xyXG4gICAgICAgIHRoaXMubG9hZFN2ZyhcIi4uL2FwcC93aWRnZXRzL2NvbW1vbi9zdHlsZS9pbWFnZXMvZHJhZ0Ryb3AveHlTZXJpZXMuc3ZnXCIpO1xyXG4gICAgICAgIHRoaXMubG9hZFN2ZyhcIi4uL2FwcC93aWRnZXRzL2NvbW1vbi9zdHlsZS9pbWFnZXMvZHJhZ0Ryb3AvZmZ0U2VyaWVzLnN2Z1wiKTtcclxuICAgICAgICB0aGlzLmxvYWRTdmcoXCIuLi9hcHAvd2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL2RyYWdEcm9wL2FkZE5ld1NjYWxlLnN2Z1wiKTtcclxuICAgICAgICB0aGlzLmxvYWRTdmcoXCIuLi9hcHAvd2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL2RyYWdEcm9wL2Fzc2lnblRvU2NhbGUuc3ZnXCIpO1xyXG4gICAgICAgIHRoaXMubG9hZFN2ZyhcIi4uL2FwcC93aWRnZXRzL2NvbW1vbi9zdHlsZS9pbWFnZXMvZHJhZ0Ryb3AvYWRkTmV3WFlDaGFydC5zdmdcIik7XHJcbiAgICAgICAgdGhpcy5sb2FkU3ZnKFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9kcmFnRHJvcC9hZGROZXdZVENoYXJ0LnN2Z1wiKTtcclxuICAgICAgICB0aGlzLmxvYWRTdmcoXCIuLi9hcHAvd2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL2RyYWdEcm9wL2FkZE5ld0ZGVENoYXJ0LnN2Z1wiKTtcclxuICAgICAgICB0aGlzLmxvYWRTdmcoXCIuLi9hcHAvd2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL2RyYWdEcm9wL2Fzc2lnblRvQ2hhcnQuc3ZnXCIpO1xyXG4gICAgICAgIHRoaXMubG9hZFN2ZyhcIi4uL2FwcC93aWRnZXRzL2NvbW1vbi9zdHlsZS9pbWFnZXMvZHJhZ0Ryb3Avc2V2ZXJhbFlUU2VyaWVzLnN2Z1wiKTtcclxuICAgICAgICB0aGlzLmxvYWRTdmcoXCIuLi9hcHAvd2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL2RyYWdEcm9wL3NldmVyYWxYWVNlcmllcy5zdmdcIik7XHJcbiAgICAgICAgdGhpcy5sb2FkU3ZnKFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9kcmFnRHJvcC9zZXZlcmFsRkZUU2VyaWVzLnN2Z1wiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFN0YXJ0cyBsb2FkaW5nIG9mIGEgc3ZnIGZpbGUgZnJvbSBzZXJ2ZXJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN2Z0lkXHJcbiAgICAgKiBAbWVtYmVyb2YgSW1hZ2VQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGxvYWRTdmcoc3ZnUGF0aDogc3RyaW5nKXtcclxuICAgICAgICAkLmdldChzdmdQYXRoLCAoc3ZnRGF0YSkgPT4geyB0aGlzLm9uU3ZnTG9hZGVkKHN2Z1BhdGgsIHN2Z0RhdGEpOyB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCBhZnRlciB0aGUgc3ZnIGZpbGUgaGF2ZSBiZWVuIGxvYWRlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3ZnUGF0aFxyXG4gICAgICogQHBhcmFtIHsqfSBzdmdEYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgSW1hZ2VQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uU3ZnTG9hZGVkKHN2Z1BhdGg6IHN0cmluZywgc3ZnRGF0YTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5pbWFnZURhdGFzLnNldChzdmdQYXRoLCBzdmdEYXRhLmRvY3VtZW50RWxlbWVudC5vdXRlckhUTUwpXHJcbiAgICB9XHJcbn0iXX0=