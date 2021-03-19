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
            //watchable icons
            this.loadSvg("../app/widgets/watchablesWidget/style/images/toolbar/axis_disabled.svg");
            this.loadSvg("../app/widgets/watchablesWidget/style/images/toolbar/axis_standstill.svg");
            this.loadSvg("../app/widgets/watchablesWidget/style/images/toolbar/axis_homing.svg");
            this.loadSvg("../app/widgets/watchablesWidget/style/images/toolbar/axis_motion.svg");
            this.loadSvg("../app/widgets/watchablesWidget/style/images/toolbar/axis_synchronized_motion.svg");
            this.loadSvg("../app/widgets/watchablesWidget/style/images/toolbar/axis_error.svg");
            this.loadSvg("../app/widgets/watchablesWidget/style/images/toolbar/communicationNotReady.svg");
            this.loadSvg("../app/widgets/watchablesWidget/style/images/toolbar/controller_off.svg");
            this.loadSvg("../app/widgets/watchablesWidget/style/images/toolbar/controller_on.svg");
            this.loadSvg("../app/widgets/watchablesWidget/style/images/toolbar/homed.svg");
            this.loadSvg("../app/widgets/watchablesWidget/style/images/toolbar/notHomed.svg");
            //quick commands
            this.loadSvg("../app/widgets/methodListWidget/style/images/toolbar/On.svg");
            this.loadSvg("../app/widgets/methodListWidget/style/images/toolbar/Off.svg");
            this.loadSvg("../app/widgets/methodListWidget/style/images/toolbar/Stop.svg");
            this.loadSvg("../app/widgets/methodListWidget/style/images/toolbar/Reset.svg");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2VQcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jb21tb24vaW1hZ2VQcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFBQTs7Ozs7T0FLRztJQUNIO1FBb0NJOzs7V0FHRztRQUNIO1lBQ0ksd0NBQXdDO1lBckNwQyxlQUFVLEdBQUcsSUFBSSxHQUFHLEVBQWtCLENBQUM7WUF1QzNDLDJCQUEyQjtZQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLHFEQUFxRCxDQUFDLENBQUM7WUFDcEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO1lBRTVELHdCQUF3QjtZQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLHdEQUF3RCxDQUFDLENBQUM7WUFDdkUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxzREFBc0QsQ0FBQyxDQUFDO1lBQ3JFLElBQUksQ0FBQyxPQUFPLENBQUMsdURBQXVELENBQUMsQ0FBQztZQUV0RSxzQ0FBc0M7WUFDdEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpRUFBaUUsQ0FBQyxDQUFDO1lBQ2hGLElBQUksQ0FBQyxPQUFPLENBQUMsMERBQTBELENBQUMsQ0FBQztZQUN6RSxJQUFJLENBQUMsT0FBTyxDQUFDLDBEQUEwRCxDQUFDLENBQUM7WUFDekUsSUFBSSxDQUFDLE9BQU8sQ0FBQywyREFBMkQsQ0FBQyxDQUFDO1lBQzFFLElBQUksQ0FBQyxPQUFPLENBQUMsNkRBQTZELENBQUMsQ0FBQztZQUM1RSxJQUFJLENBQUMsT0FBTyxDQUFDLCtEQUErRCxDQUFDLENBQUM7WUFDOUUsSUFBSSxDQUFDLE9BQU8sQ0FBQywrREFBK0QsQ0FBQyxDQUFDO1lBQzlFLElBQUksQ0FBQyxPQUFPLENBQUMsK0RBQStELENBQUMsQ0FBQztZQUM5RSxJQUFJLENBQUMsT0FBTyxDQUFDLGdFQUFnRSxDQUFDLENBQUM7WUFDL0UsSUFBSSxDQUFDLE9BQU8sQ0FBQywrREFBK0QsQ0FBQyxDQUFDO1lBQzlFLElBQUksQ0FBQyxPQUFPLENBQUMsaUVBQWlFLENBQUMsQ0FBQztZQUNoRixJQUFJLENBQUMsT0FBTyxDQUFDLGlFQUFpRSxDQUFDLENBQUM7WUFDaEYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrRUFBa0UsQ0FBQyxDQUFDO1lBRWpGLGlCQUFpQjtZQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDLHdFQUF3RSxDQUFDLENBQUM7WUFDdkYsSUFBSSxDQUFDLE9BQU8sQ0FBQywwRUFBMEUsQ0FBQyxDQUFDO1lBQ3pGLElBQUksQ0FBQyxPQUFPLENBQUMsc0VBQXNFLENBQUMsQ0FBQztZQUNyRixJQUFJLENBQUMsT0FBTyxDQUFDLHNFQUFzRSxDQUFDLENBQUM7WUFDckYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxtRkFBbUYsQ0FBQyxDQUFDO1lBQ2xHLElBQUksQ0FBQyxPQUFPLENBQUMscUVBQXFFLENBQUMsQ0FBQztZQUNwRixJQUFJLENBQUMsT0FBTyxDQUFDLGdGQUFnRixDQUFDLENBQUM7WUFDL0YsSUFBSSxDQUFDLE9BQU8sQ0FBQyx5RUFBeUUsQ0FBQyxDQUFDO1lBQ3hGLElBQUksQ0FBQyxPQUFPLENBQUMsd0VBQXdFLENBQUMsQ0FBQztZQUN2RixJQUFJLENBQUMsT0FBTyxDQUFDLGdFQUFnRSxDQUFDLENBQUM7WUFDL0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxtRUFBbUUsQ0FBQyxDQUFDO1lBRWxGLGdCQUFnQjtZQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLDZEQUE2RCxDQUFDLENBQUM7WUFDNUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyw4REFBOEQsQ0FBQyxDQUFDO1lBQzdFLElBQUksQ0FBQyxPQUFPLENBQUMsK0RBQStELENBQUMsQ0FBQztZQUM5RSxJQUFJLENBQUMsT0FBTyxDQUFDLGdFQUFnRSxDQUFDLENBQUM7UUFDbkYsQ0FBQztRQS9FRDs7Ozs7O1dBTUc7UUFDVyx5QkFBVyxHQUF6QjtZQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxhQUFhLEVBQUUsQ0FBQztZQUN2RSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDMUIsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNJLGdDQUFRLEdBQWYsVUFBZ0IsU0FBUztZQUNyQixJQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFDO2dCQUM5QixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDL0MsSUFBRyxTQUFTLElBQUksU0FBUyxFQUFDO29CQUN0QixPQUFPLEVBQUUsQ0FBQztpQkFDYjtnQkFDRCxPQUFPLFNBQVMsQ0FBQzthQUNwQjtZQUNELE9BQU8sRUFBRSxDQUFDO1FBQ2QsQ0FBQztRQXFERDs7Ozs7O1dBTUc7UUFDSywrQkFBTyxHQUFmLFVBQWdCLE9BQWU7WUFBL0IsaUJBRUM7WUFERyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxVQUFDLE9BQU8sSUFBTyxLQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pFLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0ssbUNBQVcsR0FBbkIsVUFBb0IsT0FBZSxFQUFFLE9BQVk7WUFDN0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDbkUsQ0FBQztRQUNMLG9CQUFDO0lBQUQsQ0FBQyxBQTdHRCxJQTZHQztJQTdHWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBJbWFnZSBwcm92aWRlciB0byBwcmVsb2FkIHNvbWUgaW1hZ2UodGhlIGRhdGEgb2YgdGhlIGltYWdlcyBlLmcuIDxzdmcgLi4uLi4gLz4pXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIEltYWdlUHJvdmlkZXJcclxuICovXHJcbmV4cG9ydCBjbGFzcyBJbWFnZVByb3ZpZGVye1xyXG4gICAgLy8gaG9sZHMgYW4gaW5zdGFuY2Ugb2YgdGhpcyBjbGFzc1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBJbWFnZVByb3ZpZGVyO1xyXG5cclxuICAgIHByaXZhdGUgaW1hZ2VEYXRhcyA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXRzIGEgc2luZ2xldG9uIGluc3RhbmNlIG9mIEltYWdlUHJvdmlkZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtJbWFnZVByb3ZpZGVyfVxyXG4gICAgICogQG1lbWJlcm9mIEltYWdlUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBJbWFnZVByb3ZpZGVyIHtcclxuICAgICAgICB0aGlzLl9pbnN0YW5jZSA9IHRoaXMuX2luc3RhbmNlID8gdGhpcy5faW5zdGFuY2UgOiBuZXcgSW1hZ2VQcm92aWRlcigpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRhdGEgb2YgYW4gaW1hZ2UgZm9yIHRoZSBnaXZlbiBwYXRoKGUuZyAuLi9hcHAvd2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL3RyZWUvdGltZVNlcmllcy5zdmcpIG9yIFwiXCIgaWYgbm90IGRlZmluZWRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IGltYWdlUGF0aFxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBJbWFnZVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRJbWFnZShpbWFnZVBhdGgpOiBzdHJpbmd7XHJcbiAgICAgICAgaWYodGhpcy5pbWFnZURhdGFzLmhhcyhpbWFnZVBhdGgpKXtcclxuICAgICAgICAgICAgbGV0IGltYWdlRGF0YSA9IHRoaXMuaW1hZ2VEYXRhcy5nZXQoaW1hZ2VQYXRoKTtcclxuICAgICAgICAgICAgaWYoaW1hZ2VEYXRhID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gaW1hZ2VEYXRhO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgSW1hZ2VQcm92aWRlclxyXG4gICAgICogQG1lbWJlcm9mIEltYWdlUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIC8vIFByZWxvYWQgaW1hZ2VzIGF0IHRoZSBpbml0aWFsaXphdGlvbiBcclxuICAgICAgICBcclxuICAgICAgICAvLyBJbWFnZXMgZm9yIGNvbW1vbiB0b3BpY3NcclxuICAgICAgICB0aGlzLmxvYWRTdmcoXCIuLi9hcHAvd2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL2Rpc2Nvbm5lY3RlZC5zdmdcIik7XHJcbiAgICAgICAgdGhpcy5sb2FkU3ZnKFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9idXN5LnN2Z1wiKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBJbWFnZXMgZm9yIHRyZWUgZ3JpZHNcclxuICAgICAgICB0aGlzLmxvYWRTdmcoXCIuLi9hcHAvd2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL3RyZWUvdGltZVNlcmllcy5zdmdcIik7XHJcbiAgICAgICAgdGhpcy5sb2FkU3ZnKFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy90cmVlL3h5U2VyaWVzLnN2Z1wiKTtcclxuICAgICAgICB0aGlzLmxvYWRTdmcoXCIuLi9hcHAvd2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL3RyZWUvZmZ0U2VyaWVzLnN2Z1wiKTtcclxuXHJcbiAgICAgICAgLy8gSW1hZ2VzIGZvciBzaWduYWwgbWFuYWdlciBkcmFnIGRyb3BcclxuICAgICAgICB0aGlzLmxvYWRTdmcoXCIuLi9hcHAvd2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL2RyYWdEcm9wL2Ryb3BOb3RQb3NzaWJsZS5zdmdcIik7XHJcbiAgICAgICAgdGhpcy5sb2FkU3ZnKFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9kcmFnRHJvcC95dFNlcmllcy5zdmdcIik7XHJcbiAgICAgICAgdGhpcy5sb2FkU3ZnKFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9kcmFnRHJvcC94eVNlcmllcy5zdmdcIik7XHJcbiAgICAgICAgdGhpcy5sb2FkU3ZnKFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9kcmFnRHJvcC9mZnRTZXJpZXMuc3ZnXCIpO1xyXG4gICAgICAgIHRoaXMubG9hZFN2ZyhcIi4uL2FwcC93aWRnZXRzL2NvbW1vbi9zdHlsZS9pbWFnZXMvZHJhZ0Ryb3AvYWRkTmV3U2NhbGUuc3ZnXCIpO1xyXG4gICAgICAgIHRoaXMubG9hZFN2ZyhcIi4uL2FwcC93aWRnZXRzL2NvbW1vbi9zdHlsZS9pbWFnZXMvZHJhZ0Ryb3AvYXNzaWduVG9TY2FsZS5zdmdcIik7XHJcbiAgICAgICAgdGhpcy5sb2FkU3ZnKFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9kcmFnRHJvcC9hZGROZXdYWUNoYXJ0LnN2Z1wiKTtcclxuICAgICAgICB0aGlzLmxvYWRTdmcoXCIuLi9hcHAvd2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL2RyYWdEcm9wL2FkZE5ld1lUQ2hhcnQuc3ZnXCIpO1xyXG4gICAgICAgIHRoaXMubG9hZFN2ZyhcIi4uL2FwcC93aWRnZXRzL2NvbW1vbi9zdHlsZS9pbWFnZXMvZHJhZ0Ryb3AvYWRkTmV3RkZUQ2hhcnQuc3ZnXCIpO1xyXG4gICAgICAgIHRoaXMubG9hZFN2ZyhcIi4uL2FwcC93aWRnZXRzL2NvbW1vbi9zdHlsZS9pbWFnZXMvZHJhZ0Ryb3AvYXNzaWduVG9DaGFydC5zdmdcIik7XHJcbiAgICAgICAgdGhpcy5sb2FkU3ZnKFwiLi4vYXBwL3dpZGdldHMvY29tbW9uL3N0eWxlL2ltYWdlcy9kcmFnRHJvcC9zZXZlcmFsWVRTZXJpZXMuc3ZnXCIpO1xyXG4gICAgICAgIHRoaXMubG9hZFN2ZyhcIi4uL2FwcC93aWRnZXRzL2NvbW1vbi9zdHlsZS9pbWFnZXMvZHJhZ0Ryb3Avc2V2ZXJhbFhZU2VyaWVzLnN2Z1wiKTtcclxuICAgICAgICB0aGlzLmxvYWRTdmcoXCIuLi9hcHAvd2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL2RyYWdEcm9wL3NldmVyYWxGRlRTZXJpZXMuc3ZnXCIpO1xyXG5cclxuICAgICAgICAvL3dhdGNoYWJsZSBpY29uc1xyXG4gICAgICAgIHRoaXMubG9hZFN2ZyhcIi4uL2FwcC93aWRnZXRzL3dhdGNoYWJsZXNXaWRnZXQvc3R5bGUvaW1hZ2VzL3Rvb2xiYXIvYXhpc19kaXNhYmxlZC5zdmdcIik7XHJcbiAgICAgICAgdGhpcy5sb2FkU3ZnKFwiLi4vYXBwL3dpZGdldHMvd2F0Y2hhYmxlc1dpZGdldC9zdHlsZS9pbWFnZXMvdG9vbGJhci9heGlzX3N0YW5kc3RpbGwuc3ZnXCIpO1xyXG4gICAgICAgIHRoaXMubG9hZFN2ZyhcIi4uL2FwcC93aWRnZXRzL3dhdGNoYWJsZXNXaWRnZXQvc3R5bGUvaW1hZ2VzL3Rvb2xiYXIvYXhpc19ob21pbmcuc3ZnXCIpO1xyXG4gICAgICAgIHRoaXMubG9hZFN2ZyhcIi4uL2FwcC93aWRnZXRzL3dhdGNoYWJsZXNXaWRnZXQvc3R5bGUvaW1hZ2VzL3Rvb2xiYXIvYXhpc19tb3Rpb24uc3ZnXCIpO1xyXG4gICAgICAgIHRoaXMubG9hZFN2ZyhcIi4uL2FwcC93aWRnZXRzL3dhdGNoYWJsZXNXaWRnZXQvc3R5bGUvaW1hZ2VzL3Rvb2xiYXIvYXhpc19zeW5jaHJvbml6ZWRfbW90aW9uLnN2Z1wiKTtcclxuICAgICAgICB0aGlzLmxvYWRTdmcoXCIuLi9hcHAvd2lkZ2V0cy93YXRjaGFibGVzV2lkZ2V0L3N0eWxlL2ltYWdlcy90b29sYmFyL2F4aXNfZXJyb3Iuc3ZnXCIpO1xyXG4gICAgICAgIHRoaXMubG9hZFN2ZyhcIi4uL2FwcC93aWRnZXRzL3dhdGNoYWJsZXNXaWRnZXQvc3R5bGUvaW1hZ2VzL3Rvb2xiYXIvY29tbXVuaWNhdGlvbk5vdFJlYWR5LnN2Z1wiKTtcclxuICAgICAgICB0aGlzLmxvYWRTdmcoXCIuLi9hcHAvd2lkZ2V0cy93YXRjaGFibGVzV2lkZ2V0L3N0eWxlL2ltYWdlcy90b29sYmFyL2NvbnRyb2xsZXJfb2ZmLnN2Z1wiKTtcclxuICAgICAgICB0aGlzLmxvYWRTdmcoXCIuLi9hcHAvd2lkZ2V0cy93YXRjaGFibGVzV2lkZ2V0L3N0eWxlL2ltYWdlcy90b29sYmFyL2NvbnRyb2xsZXJfb24uc3ZnXCIpO1xyXG4gICAgICAgIHRoaXMubG9hZFN2ZyhcIi4uL2FwcC93aWRnZXRzL3dhdGNoYWJsZXNXaWRnZXQvc3R5bGUvaW1hZ2VzL3Rvb2xiYXIvaG9tZWQuc3ZnXCIpO1xyXG4gICAgICAgIHRoaXMubG9hZFN2ZyhcIi4uL2FwcC93aWRnZXRzL3dhdGNoYWJsZXNXaWRnZXQvc3R5bGUvaW1hZ2VzL3Rvb2xiYXIvbm90SG9tZWQuc3ZnXCIpO1xyXG5cclxuICAgICAgICAvL3F1aWNrIGNvbW1hbmRzXHJcbiAgICAgICAgdGhpcy5sb2FkU3ZnKFwiLi4vYXBwL3dpZGdldHMvbWV0aG9kTGlzdFdpZGdldC9zdHlsZS9pbWFnZXMvdG9vbGJhci9Pbi5zdmdcIik7XHJcbiAgICAgICAgdGhpcy5sb2FkU3ZnKFwiLi4vYXBwL3dpZGdldHMvbWV0aG9kTGlzdFdpZGdldC9zdHlsZS9pbWFnZXMvdG9vbGJhci9PZmYuc3ZnXCIpO1xyXG4gICAgICAgIHRoaXMubG9hZFN2ZyhcIi4uL2FwcC93aWRnZXRzL21ldGhvZExpc3RXaWRnZXQvc3R5bGUvaW1hZ2VzL3Rvb2xiYXIvU3RvcC5zdmdcIik7XHJcbiAgICAgICAgdGhpcy5sb2FkU3ZnKFwiLi4vYXBwL3dpZGdldHMvbWV0aG9kTGlzdFdpZGdldC9zdHlsZS9pbWFnZXMvdG9vbGJhci9SZXNldC5zdmdcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdGFydHMgbG9hZGluZyBvZiBhIHN2ZyBmaWxlIGZyb20gc2VydmVyXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdmdJZFxyXG4gICAgICogQG1lbWJlcm9mIEltYWdlUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBsb2FkU3ZnKHN2Z1BhdGg6IHN0cmluZyl7XHJcbiAgICAgICAgJC5nZXQoc3ZnUGF0aCwgKHN2Z0RhdGEpID0+IHsgdGhpcy5vblN2Z0xvYWRlZChzdmdQYXRoLCBzdmdEYXRhKTsgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgYWZ0ZXIgdGhlIHN2ZyBmaWxlIGhhdmUgYmVlbiBsb2FkZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN2Z1BhdGhcclxuICAgICAqIEBwYXJhbSB7Kn0gc3ZnRGF0YVxyXG4gICAgICogQG1lbWJlcm9mIEltYWdlUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvblN2Z0xvYWRlZChzdmdQYXRoOiBzdHJpbmcsIHN2Z0RhdGE6IGFueSkge1xyXG4gICAgICAgIHRoaXMuaW1hZ2VEYXRhcy5zZXQoc3ZnUGF0aCwgc3ZnRGF0YS5kb2N1bWVudEVsZW1lbnQub3V0ZXJIVE1MKVxyXG4gICAgfVxyXG59Il19