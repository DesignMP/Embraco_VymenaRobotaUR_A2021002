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
define(["require", "exports", "./xyCursorSignalDescriptor", "../../common/seriesIconProvider", "./cursorSignal"], function (require, exports, xyCursorSignalDescriptor_1, seriesIconProvider_1, cursorSignal_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var XYCursorSignal = /** @class */ (function (_super) {
        __extends(XYCursorSignal, _super);
        /**
         * Creates an instance of XYCursorSignal
         * @param {BaseSeries} serie
         * @memberof XYCursorSignal
         */
        function XYCursorSignal(serie) {
            var _this = _super.call(this, serie) || this;
            // represents all available values for the actual given cursors
            _this._availableValues = new InfoValues();
            _this.expandState = false;
            // create specific cursor signal desriptor
            _this._cursorSignalDescriptor = new xyCursorSignalDescriptor_1.XYCursorSignalDescriptor();
            return _this;
        }
        Object.defineProperty(XYCursorSignal.prototype, "iconDefinition", {
            /**
             * Returns the icon representation for this node for the tree grid
             *
             * @readonly
             * @type {string}
             * @memberof XYCursorSignal
             */
            get: function () {
                var iconDefinition = "";
                var classNames = "e-treegridcollapse treegridcollapse";
                // Add collapse/expand icon 
                if (this.expandState == true) {
                    classNames += "e-treegridexpand treegridexpand";
                }
                iconDefinition += "<div class='" + classNames + "'></div>";
                // add series icon (with overlays)
                iconDefinition += "<div class='e-doc' style='position: relative;height:16px;width:30px;margin:auto;float:left;margin-left:0px;margin-top:2px'>";
                iconDefinition += seriesIconProvider_1.SeriesIconProvider.getInstance().getIcon(this.serie);
                iconDefinition += "</div>";
                return iconDefinition;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Updates the cursor value informations for the given cursors
         *
         * @param {IPoint} cursorData1
         * @param {IPoint} cursorData2
         * @param {number} time1
         * @param {number} time2
         * @memberof XYCursorSignal
         */
        XYCursorSignal.prototype.updateValues = function (cursorData1, cursorData2, time1, time2) {
            var _this = this;
            this.updateSimpleValues(cursorData1, cursorData2, time1, time2);
            this.updateCalculatedValues(cursorData1, cursorData2, time1, time2);
            this.cursorInfos.forEach(function (cursorInfo) {
                _this.setCursorInfo(cursorInfo);
            });
        };
        XYCursorSignal.prototype.updateSimpleValues = function (cursor1Data, cursor2Data, time1, time2) {
            if (cursor1Data != undefined && cursor1Data.y != undefined && time1 != undefined) {
                // Set cursor 1 infos
                this._availableValues.y1 = cursor1Data.y.toPrecision(17);
                this._availableValues.x1 = cursor1Data.x.toPrecision(17);
                this._availableValues.t1 = time1.toPrecision(6);
            }
            else {
                this._availableValues.y1 = undefined;
                this._availableValues.x1 = undefined;
                this._availableValues.t1 = undefined;
            }
            if (cursor2Data != undefined && cursor2Data.y != undefined && time2 != undefined) {
                // Set cursor 1 infos
                this._availableValues.y2 = cursor2Data.y.toPrecision(17);
                this._availableValues.x2 = cursor2Data.x.toPrecision(17);
                this._availableValues.t2 = time2.toPrecision(6);
            }
            else {
                this._availableValues.y2 = undefined;
                this._availableValues.x2 = undefined;
                this._availableValues.t2 = undefined;
            }
        };
        XYCursorSignal.prototype.updateCalculatedValues = function (cursor1Data, cursor2Data, time1, time2) {
            if (cursor1Data != undefined && cursor1Data.y != undefined && time1 != undefined && cursor2Data != undefined && cursor2Data.y != undefined && time2 != undefined) {
                var cursorMinXValue = cursor1Data.x;
                var cursorMaxXValue = cursor2Data.x;
                if (cursorMinXValue > cursorMaxXValue) {
                    // Change min and max value
                    var tempXValue = cursorMaxXValue;
                    cursorMaxXValue = cursorMinXValue;
                    cursorMinXValue = tempXValue;
                }
                this._availableValues.yDiff = (cursor2Data.y - cursor1Data.y).toPrecision(17);
                this._availableValues.xDiff = (cursor2Data.x - cursor1Data.x).toPrecision(17);
                this._availableValues.tDiff = (time2 - time1).toPrecision(6);
                this._availableValues.eucDist = (Math.sqrt(Math.pow(cursor2Data.x - cursor1Data.x, 2) + Math.pow(cursor2Data.y - cursor1Data.y, 2))).toPrecision(17);
            }
            else {
                this._availableValues.yDiff = undefined;
                this._availableValues.tDiff = undefined;
                this._availableValues.xDiff = undefined;
            }
        };
        /**
         * Set cursor informations
         *
         * @private
         * @param {*} cursorInfo
         * @memberof XYCursorSignal
         */
        XYCursorSignal.prototype.setCursorInfo = function (cursorInfo) {
            var value = this._availableValues[cursorInfo.id];
            if (value == undefined) {
                value = InfoValues.undefinedText;
            }
            cursorInfo.value = value;
        };
        /**
         * provides all available cursor infos
         *
         * @returns {Array<CursorDisplayInfoClass>}
         * @memberof XYCursorSignal
         */
        XYCursorSignal.prototype.getAllCursorInfo = function () {
            return this._cursorSignalDescriptor.getAllCursorInfo();
        };
        return XYCursorSignal;
    }(cursorSignal_1.CursorSignal));
    exports.XYCursorSignal = XYCursorSignal;
    var InfoValues = /** @class */ (function () {
        function InfoValues() {
            this.y1 = InfoValues.undefinedText;
            this.y2 = InfoValues.undefinedText;
            this.x1 = InfoValues.undefinedText;
            this.x2 = InfoValues.undefinedText;
            this.t1 = InfoValues.undefinedText;
            this.t2 = InfoValues.undefinedText;
            this.yDiff = InfoValues.undefinedText;
            this.tDiff = InfoValues.undefinedText;
            this.xDiff = InfoValues.undefinedText;
            this.eucDist = InfoValues.undefinedText;
        }
        InfoValues.undefinedText = "";
        return InfoValues;
    }());
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieHlDdXJzb3JTaWduYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY3Vyc29ySW5mb1dpZGdldC9tb2RlbC94eUN1cnNvclNpZ25hbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBT0E7UUFBb0Msa0NBQVk7UUFPNUM7Ozs7V0FJRztRQUNILHdCQUFZLEtBQWlCO1lBQTdCLFlBQ0ksa0JBQU0sS0FBSyxDQUFDLFNBSWY7WUFmRCwrREFBK0Q7WUFDdkQsc0JBQWdCLEdBQWUsSUFBSSxVQUFVLEVBQUUsQ0FBQztZQUV4RCxpQkFBVyxHQUFZLEtBQUssQ0FBQztZQVV6QiwwQ0FBMEM7WUFDMUMsS0FBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksbURBQXdCLEVBQUUsQ0FBQzs7UUFDbEUsQ0FBQztRQVNELHNCQUFXLDBDQUFjO1lBUHpCOzs7Ozs7ZUFNRztpQkFDSDtnQkFDSSxJQUFJLGNBQWMsR0FBRyxFQUFFLENBQUM7Z0JBQ3hCLElBQUksVUFBVSxHQUFHLHFDQUFxQyxDQUFDO2dCQUV2RCw0QkFBNEI7Z0JBQzVCLElBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLEVBQUM7b0JBQ3hCLFVBQVUsSUFBSSxpQ0FBaUMsQ0FBQztpQkFDbkQ7Z0JBQ0QsY0FBYyxJQUFJLGNBQWMsR0FBRyxVQUFVLEdBQUcsVUFBVSxDQUFDO2dCQUUzRCxrQ0FBa0M7Z0JBQ2xDLGNBQWMsSUFBSSw2SEFBNkgsQ0FBQztnQkFDaEosY0FBYyxJQUFJLHVDQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3ZFLGNBQWMsSUFBSSxRQUFRLENBQUM7Z0JBRTNCLE9BQU8sY0FBYyxDQUFDO1lBQzFCLENBQUM7OztXQUFBO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDSSxxQ0FBWSxHQUFuQixVQUFvQixXQUFtQixFQUFFLFdB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S0FBSyxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUM7YUFDcEM7WUFDRCxVQUFVLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUM3QixDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSSx5Q0FBZ0IsR0FBdkI7WUFDSSxPQUFPLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQzNELENBQUM7UUFDTCxxQkFBQztJQUFELENBQUMsQUF0SUQsQ0FBb0MsMkJBQVksR0FzSS9DO0lBdElZLHdDQUFjO0lBd0kzQjtRQWVJO1lBQ0ksSUFBSSxDQUFDLEVBQUUsR0FBRyxVQUFVLENBQUMsYUFBYSxDQUFDO1lBQ25DLElBQUksQ0FBQyxFQUFFLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQztZQUNuQyxJQUFJLENBQUMsRUFBRSxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUM7WUFDbkMsSUFBSSxDQUFDLEVBQUUsR0FBRyxVQUFVLENBQUMsYUFBYSxDQUFDO1lBQ25DLElBQUksQ0FBQyxFQUFFLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQztZQUNuQyxJQUFJLENBQUMsRUFBRSxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUM7WUFDbkMsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsYUFBYSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQztZQUN0QyxJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUM7WUFDdEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsYUFBYSxDQUFDO1FBQzVDLENBQUM7UUFic0Isd0JBQWEsR0FBVyxFQUFFLENBQUM7UUFjdEQsaUJBQUM7S0FBQSxBQTNCRCxJQTJCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElQb2ludCB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY29tbW9uL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgWFlDdXJzb3JTaWduYWxEZXNjcmlwdG9yIH0gZnJvbSBcIi4veHlDdXJzb3JTaWduYWxEZXNjcmlwdG9yXCI7XHJcbmltcG9ydCB7IEJhc2VTZXJpZXMgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9iYXNlU2VyaWVzXCI7XHJcbmltcG9ydCB7IFNlcmllc0ljb25Qcm92aWRlciB9IGZyb20gXCIuLi8uLi9jb21tb24vc2VyaWVzSWNvblByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IEN1cnNvclNpZ25hbCB9IGZyb20gXCIuL2N1cnNvclNpZ25hbFwiO1xyXG5pbXBvcnQgeyBDdXJzb3JEaXNwbGF5SW5mb0NsYXNzIH0gZnJvbSBcIi4vZHluYW1pY0N1cnNvclNpZ25hbFRlbXBsYXRlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgWFlDdXJzb3JTaWduYWwgZXh0ZW5kcyBDdXJzb3JTaWduYWx7XHJcblxyXG4gICAgLy8gcmVwcmVzZW50cyBhbGwgYXZhaWxhYmxlIHZhbHVlcyBmb3IgdGhlIGFjdHVhbCBnaXZlbiBjdXJzb3JzXHJcbiAgICBwcml2YXRlIF9hdmFpbGFibGVWYWx1ZXM6IEluZm9WYWx1ZXMgPSBuZXcgSW5mb1ZhbHVlcygpO1xyXG5cclxuICAgIGV4cGFuZFN0YXRlOiBib29sZWFuID0gZmFsc2U7ICAgIFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBYWUN1cnNvclNpZ25hbFxyXG4gICAgICogQHBhcmFtIHtCYXNlU2VyaWVzfSBzZXJpZVxyXG4gICAgICogQG1lbWJlcm9mIFhZQ3Vyc29yU2lnbmFsXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHNlcmllOiBCYXNlU2VyaWVzKXtcclxuICAgICAgICBzdXBlcihzZXJpZSk7XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSBzcGVjaWZpYyBjdXJzb3Igc2lnbmFsIGRlc3JpcHRvclxyXG4gICAgICAgIHRoaXMuX2N1cnNvclNpZ25hbERlc2NyaXB0b3IgPSBuZXcgWFlDdXJzb3JTaWduYWxEZXNjcmlwdG9yKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBpY29uIHJlcHJlc2VudGF0aW9uIGZvciB0aGlzIG5vZGUgZm9yIHRoZSB0cmVlIGdyaWRcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgWFlDdXJzb3JTaWduYWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBpY29uRGVmaW5pdGlvbigpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBpY29uRGVmaW5pdGlvbiA9IFwiXCI7XHJcbiAgICAgICAgbGV0IGNsYXNzTmFtZXMgPSBcImUtdHJlZWdyaWRjb2xsYXBzZSB0cmVlZ3JpZGNvbGxhcHNlXCI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gQWRkIGNvbGxhcHNlL2V4cGFuZCBpY29uIFxyXG4gICAgICAgIGlmKHRoaXMuZXhwYW5kU3RhdGUgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZXMgKz0gXCJlLXRyZWVncmlkZXhwYW5kIHRyZWVncmlkZXhwYW5kXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGljb25EZWZpbml0aW9uICs9IGA8ZGl2IGNsYXNzPSdgICsgY2xhc3NOYW1lcyArIGAnPjwvZGl2PmA7XHJcblxyXG4gICAgICAgIC8vIGFkZCBzZXJpZXMgaWNvbiAod2l0aCBvdmVybGF5cylcclxuICAgICAgICBpY29uRGVmaW5pdGlvbiArPSBgPGRpdiBjbGFzcz0nZS1kb2MnIHN0eWxlPSdwb3NpdGlvbjogcmVsYXRpdmU7aGVpZ2h0OjE2cHg7d2lkdGg6MzBweDttYXJnaW46YXV0bztmbG9hdDpsZWZ0O21hcmdpbi1sZWZ0OjBweDttYXJnaW4tdG9wOjJweCc+YDtcclxuICAgICAgICBpY29uRGVmaW5pdGlvbiArPSBTZXJpZXNJY29uUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXRJY29uKHRoaXMuc2VyaWUpO1xyXG4gICAgICAgIGljb25EZWZpbml0aW9uICs9IGA8L2Rpdj5gO1xyXG4gICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICByZXR1cm4gaWNvbkRlZmluaXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBjdXJzb3IgdmFsdWUgaW5mb3JtYXRpb25zIGZvciB0aGUgZ2l2ZW4gY3Vyc29yc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SVBvaW50fSBjdXJzb3JEYXRhMVxyXG4gICAgICogQHBhcmFtIHtJUG9pbnR9IGN1cnNvckRhdGEyXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdGltZTFcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lMlxyXG4gICAgICogQG1lbWJlcm9mIFhZQ3Vyc29yU2lnbmFsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB1cGRhdGVWYWx1ZXMoY3Vyc29yRGF0YTE6IElQb2ludCwgY3Vyc29yRGF0YTI6IElQb2ludCwgdGltZTE6IG51bWJlciwgdGltZTI6IG51bWJlcil7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTaW1wbGVWYWx1ZXMoY3Vyc29yRGF0YTEsIGN1cnNvckRhdGEyLCB0aW1lMSwgdGltZTIpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlQ2FsY3VsYXRlZFZhbHVlcyhjdXJzb3JEYXRhMSwgY3Vyc29yRGF0YTIsIHRpbWUxLCB0aW1lMik7XHJcbiAgICAgICAgdGhpcy5jdXJzb3JJbmZvcy5mb3JFYWNoKGN1cnNvckluZm8gPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldEN1cnNvckluZm8oY3Vyc29ySW5mbyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlU2ltcGxlVmFsdWVzKGN1cnNvcjFEYXRhOiBJUG9pbnQsIGN1cnNvcjJEYXRhOiBJUG9pbnQsIHRpbWUxOiBudW1iZXIsIHRpbWUyOiBudW1iZXIpe1xyXG4gICAgICAgIGlmKGN1cnNvcjFEYXRhICE9IHVuZGVmaW5lZCAmJiBjdXJzb3IxRGF0YS55ICE9IHVuZGVmaW5lZCAmJiB0aW1lMSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAvLyBTZXQgY3Vyc29yIDEgaW5mb3NcclxuICAgICAgICAgICAgdGhpcy5fYXZhaWxhYmxlVmFsdWVzLnkxID0gY3Vyc29yMURhdGEueS50b1ByZWNpc2lvbigxNyk7XHJcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVZhbHVlcy54MSA9IGN1cnNvcjFEYXRhLngudG9QcmVjaXNpb24oMTcpO1xyXG4gICAgICAgICAgICB0aGlzLl9hdmFpbGFibGVWYWx1ZXMudDEgPSB0aW1lMS50b1ByZWNpc2lvbig2KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fYXZhaWxhYmxlVmFsdWVzLnkxID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB0aGlzLl9hdmFpbGFibGVWYWx1ZXMueDEgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVZhbHVlcy50MSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoY3Vyc29yMkRhdGEgIT0gdW5kZWZpbmVkICYmIGN1cnNvcjJEYXRhLnkgIT0gdW5kZWZpbmVkICYmIHRpbWUyICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIFNldCBjdXJzb3IgMSBpbmZvc1xyXG4gICAgICAgICAgICB0aGlzLl9hdmFpbGFibGVWYWx1ZXMueTIgPSBjdXJzb3IyRGF0YS55LnRvUHJlY2lzaW9uKDE3KTtcclxuICAgICAgICAgICAgdGhpcy5fYXZhaWxhYmxlVmFsdWVzLngyID0gY3Vyc29yMkRhdGEueC50b1ByZWNpc2lvbigxNyk7XHJcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVZhbHVlcy50MiA9IHRpbWUyLnRvUHJlY2lzaW9uKDYpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLl9hdmFpbGFibGVWYWx1ZXMueTIgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVZhbHVlcy54MiA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgdGhpcy5fYXZhaWxhYmxlVmFsdWVzLnQyID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZUNhbGN1bGF0ZWRWYWx1ZXMoY3Vyc29yMURhdGE6IElQb2ludCwgY3Vyc29yMkRhdGE6IElQb2ludCwgdGltZTE6IG51bWJlciwgdGltZTI6IG51bWJlcil7XHJcbiAgICAgICAgaWYoY3Vyc29yMURhdGEgIT0gdW5kZWZpbmVkICYmIGN1cnNvcjFEYXRhLnkgIT0gdW5kZWZpbmVkICYmIHRpbWUxICE9IHVuZGVmaW5lZCAmJiBjdXJzb3IyRGF0YSAhPSB1bmRlZmluZWQgJiYgY3Vyc29yMkRhdGEueSAhPSB1bmRlZmluZWQgJiYgdGltZTIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgbGV0IGN1cnNvck1pblhWYWx1ZSA9IGN1cnNvcjFEYXRhLng7XHJcbiAgICAgICAgICAgIGxldCBjdXJzb3JNYXhYVmFsdWUgPSBjdXJzb3IyRGF0YS54O1xyXG4gICAgICAgICAgICBpZihjdXJzb3JNaW5YVmFsdWUgPiBjdXJzb3JNYXhYVmFsdWUpe1xyXG4gICAgICAgICAgICAgICAgLy8gQ2hhbmdlIG1pbiBhbmQgbWF4IHZhbHVlXHJcbiAgICAgICAgICAgICAgICBsZXQgdGVtcFhWYWx1ZSA9IGN1cnNvck1heFhWYWx1ZTtcclxuICAgICAgICAgICAgICAgIGN1cnNvck1heFhWYWx1ZSA9IGN1cnNvck1pblhWYWx1ZTtcclxuICAgICAgICAgICAgICAgIGN1cnNvck1pblhWYWx1ZSA9IHRlbXBYVmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVZhbHVlcy55RGlmZiA9IChjdXJzb3IyRGF0YS55LWN1cnNvcjFEYXRhLnkpLnRvUHJlY2lzaW9uKDE3KTtcclxuICAgICAgICAgICAgdGhpcy5fYXZhaWxhYmxlVmFsdWVzLnhEaWZmID0gKGN1cnNvcjJEYXRhLngtY3Vyc29yMURhdGEueCkudG9QcmVjaXNpb24oMTcpO1xyXG4gICAgICAgICAgICB0aGlzLl9hdmFpbGFibGVWYWx1ZXMudERpZmYgPSAodGltZTItdGltZTEpLnRvUHJlY2lzaW9uKDYpO1xyXG4gICAgICAgICAgICB0aGlzLl9hdmFpbGFibGVWYWx1ZXMuZXVjRGlzdCA9IChNYXRoLnNxcnQoTWF0aC5wb3coY3Vyc29yMkRhdGEueCAtIGN1cnNvcjFEYXRhLngsIDIpICsgTWF0aC5wb3coY3Vyc29yMkRhdGEueSAtIGN1cnNvcjFEYXRhLnksIDIpICkpLnRvUHJlY2lzaW9uKDE3KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fYXZhaWxhYmxlVmFsdWVzLnlEaWZmID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB0aGlzLl9hdmFpbGFibGVWYWx1ZXMudERpZmYgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVZhbHVlcy54RGlmZiA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgY3Vyc29yIGluZm9ybWF0aW9uc1xyXG4gICAgICogXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBjdXJzb3JJbmZvXHJcbiAgICAgKiBAbWVtYmVyb2YgWFlDdXJzb3JTaWduYWxcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRDdXJzb3JJbmZvKGN1cnNvckluZm8pe1xyXG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuX2F2YWlsYWJsZVZhbHVlc1tjdXJzb3JJbmZvLmlkXTtcclxuICAgICAgICBpZih2YWx1ZSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB2YWx1ZSA9IEluZm9WYWx1ZXMudW5kZWZpbmVkVGV4dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY3Vyc29ySW5mby52YWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgLyoqXHJcbiAgICAgKiBwcm92aWRlcyBhbGwgYXZhaWxhYmxlIGN1cnNvciBpbmZvc1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxDdXJzb3JEaXNwbGF5SW5mb0NsYXNzPn1cclxuICAgICAqIEBtZW1iZXJvZiBYWUN1cnNvclNpZ25hbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0QWxsQ3Vyc29ySW5mbyAoKTogQXJyYXk8Q3Vyc29yRGlzcGxheUluZm9DbGFzcz4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJzb3JTaWduYWxEZXNjcmlwdG9yLmdldEFsbEN1cnNvckluZm8oKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgSW5mb1ZhbHVlc3tcclxuICAgIC8vIFRoaXMgcHJvcGVydGllcyBtdXN0IGhhdmUgdGhlIHNhbWUgbmFtZSBhcyB0aGUgaWRzIGRlZmluZWQgaW4gdGhlIEN1cnNvclNpZ25hbCBjbGFzcyAoZS5nLiBjdXJzb3JJbmZvSWRfeTEgPSBcInkxXCI7KVxyXG4gICAgcHVibGljIHkxOiBzdHJpbmd8dW5kZWZpbmVkO1xyXG4gICAgcHVibGljIHkyOiBzdHJpbmd8dW5kZWZpbmVkO1xyXG4gICAgcHVibGljIHQxOiBzdHJpbmd8dW5kZWZpbmVkO1xyXG4gICAgcHVibGljIHQyOiBzdHJpbmd8dW5kZWZpbmVkO1xyXG4gICAgcHVibGljIHgxOiBzdHJpbmd8dW5kZWZpbmVkO1xyXG4gICAgcHVibGljIHgyOiBzdHJpbmd8dW5kZWZpbmVkO1xyXG4gICAgcHVibGljIHlEaWZmOiBzdHJpbmd8dW5kZWZpbmVkO1xyXG4gICAgcHVibGljIHREaWZmOiBzdHJpbmd8dW5kZWZpbmVkO1xyXG4gICAgcHVibGljIHhEaWZmOiBzdHJpbmd8dW5kZWZpbmVkO1xyXG4gICAgcHVibGljIGV1Y0Rpc3Q6IHN0cmluZ3x1bmRlZmluZWQ7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSB1bmRlZmluZWRUZXh0OiBzdHJpbmcgPSBcIlwiO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdGhpcy55MSA9IEluZm9WYWx1ZXMudW5kZWZpbmVkVGV4dDtcclxuICAgICAgICB0aGlzLnkyID0gSW5mb1ZhbHVlcy51bmRlZmluZWRUZXh0O1xyXG4gICAgICAgIHRoaXMueDEgPSBJbmZvVmFsdWVzLnVuZGVmaW5lZFRleHQ7XHJcbiAgICAgICAgdGhpcy54MiA9IEluZm9WYWx1ZXMudW5kZWZpbmVkVGV4dDtcclxuICAgICAgICB0aGlzLnQxID0gSW5mb1ZhbHVlcy51bmRlZmluZWRUZXh0O1xyXG4gICAgICAgIHRoaXMudDIgPSBJbmZvVmFsdWVzLnVuZGVmaW5lZFRleHQ7XHJcbiAgICAgICAgdGhpcy55RGlmZiA9IEluZm9WYWx1ZXMudW5kZWZpbmVkVGV4dDtcclxuICAgICAgICB0aGlzLnREaWZmID0gSW5mb1ZhbHVlcy51bmRlZmluZWRUZXh0O1xyXG4gICAgICAgIHRoaXMueERpZmYgPSBJbmZvVmFsdWVzLnVuZGVmaW5lZFRleHQ7XHJcbiAgICAgICAgdGhpcy5ldWNEaXN0ID0gSW5mb1ZhbHVlcy51bmRlZmluZWRUZXh0O1xyXG4gICAgfVxyXG59Il19