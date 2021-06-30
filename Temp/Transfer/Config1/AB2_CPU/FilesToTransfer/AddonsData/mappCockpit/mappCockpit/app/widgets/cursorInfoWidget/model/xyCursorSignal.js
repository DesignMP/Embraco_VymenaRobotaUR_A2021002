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
define(["require", "exports", "./xyCursorSignalDescriptor", "./cursorSignal"], function (require, exports, xyCursorSignalDescriptor_1, cursorSignal_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var XYCursorSignal = /** @class */ (function (_super) {
        __extends(XYCursorSignal, _super);
        /**
         * Creates an instance of XYCursorSignal
         * @param {BaseSeries} serie
         * @memberof XYCursorSignal
         */
        function XYCursorSignal(serie, expandState, cursorInfo) {
            var _this = _super.call(this, serie, expandState) || this;
            // represents all available values for the actual given cursors
            _this._availableValues = new InfoValues();
            // create specific cursor signal desriptor
            _this._cursorSignalDescriptor = new xyCursorSignalDescriptor_1.XYCursorSignalDescriptor(cursorInfo);
            return _this;
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieHlDdXJzb3JTaWduYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY3Vyc29ySW5mb1dpZGdldC9tb2RlbC94eUN1cnNvclNpZ25hbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBUUE7UUFBb0Msa0NBQVk7UUFLNUM7Ozs7V0FJRztRQUNILHdCQUFZLEtBQWlCLEVBQUUsV0FBb0IsRUFBRSxVQUFtQztZQUF4RixZQUNJLGtCQUFNLEtBQUssRUFBRSxXQUFXLENBQUMsU0FJNUI7WUFiRCwrREFBK0Q7WUFDdkQsc0JBQWdCLEdBQWUsSUFBSSxVQUFVLEVBQUUsQ0FBQztZQVVwRCwwQ0FBMEM7WUFDMUMsS0FBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksbURBQXdCLENBQUMsVUFBVSxDQUFDLENBQUM7O1FBQzVFLENBQUM7UUFFRDs7Ozs7Ozs7V0FRRztRQUNJLHFDQUFZLEdBQW5CLFVBQW9CLFdBQW1CLEVBQUUsV0FBbUIsRUFBRSxLQUFhLEVBQUUsS0FBYTtZQUExRixpQkFNQztZQUxHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNoRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsV0FBVyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDcEUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBQSxVQUFVO2dCQUMvQixLQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ25DLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUdPLDJDQUFrQixHQUExQixVQUEyQixXQUFtQixFQUFFLFdBQW1CLEVBQUUsS0FBYSxFQUFFLEtBQWE7WUFDN0YsSUFBRyxXQUFXLElBQUksU0FBUyxJQUFJLFdBQVcsQ0FBQyxDQUFDLElBQUksU0FB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QUMsYUFBYSxDQUFDO1lBQ25DLElBQUksQ0FBQyxFQUFFLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQztZQUNuQyxJQUFJLENBQUMsRUFBRSxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUM7WUFDbkMsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsYUFBYSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQztZQUN0QyxJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUM7WUFDdEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsYUFBYSxDQUFDO1FBQzVDLENBQUM7UUFic0Isd0JBQWEsR0FBVyxFQUFFLENBQUM7UUFjdEQsaUJBQUM7S0FBQSxBQTNCRCxJQTJCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElQb2ludCB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY29tbW9uL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgWFlDdXJzb3JTaWduYWxEZXNjcmlwdG9yIH0gZnJvbSBcIi4veHlDdXJzb3JTaWduYWxEZXNjcmlwdG9yXCI7XHJcbmltcG9ydCB7IEJhc2VTZXJpZXMgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9iYXNlU2VyaWVzXCI7XHJcbmltcG9ydCB7IEN1cnNvclNpZ25hbCB9IGZyb20gXCIuL2N1cnNvclNpZ25hbFwiO1xyXG5pbXBvcnQgeyBDdXJzb3JEaXNwbGF5SW5mb0NsYXNzIH0gZnJvbSBcIi4vZHluYW1pY0N1cnNvclNpZ25hbFRlbXBsYXRlXCI7XHJcbmltcG9ydCB7IEN1cnNvckluZm8gfSBmcm9tIFwiLi9jdXJzb3JJbmZvXCI7XHJcbmltcG9ydCB7IEN1cnNvckluZm9WaXNpYmlsaXR5IH0gZnJvbSBcIi4vY3Vyc29ySW5mb1Zpc2liaWxpdHlcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBYWUN1cnNvclNpZ25hbCBleHRlbmRzIEN1cnNvclNpZ25hbHtcclxuXHJcbiAgICAvLyByZXByZXNlbnRzIGFsbCBhdmFpbGFibGUgdmFsdWVzIGZvciB0aGUgYWN0dWFsIGdpdmVuIGN1cnNvcnNcclxuICAgIHByaXZhdGUgX2F2YWlsYWJsZVZhbHVlczogSW5mb1ZhbHVlcyA9IG5ldyBJbmZvVmFsdWVzKCk7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBYWUN1cnNvclNpZ25hbFxyXG4gICAgICogQHBhcmFtIHtCYXNlU2VyaWVzfSBzZXJpZVxyXG4gICAgICogQG1lbWJlcm9mIFhZQ3Vyc29yU2lnbmFsXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHNlcmllOiBCYXNlU2VyaWVzLCBleHBhbmRTdGF0ZTogYm9vbGVhbiwgY3Vyc29ySW5mbz86IEN1cnNvckluZm9WaXNpYmlsaXR5W10pe1xyXG4gICAgICAgIHN1cGVyKHNlcmllLCBleHBhbmRTdGF0ZSk7XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSBzcGVjaWZpYyBjdXJzb3Igc2lnbmFsIGRlc3JpcHRvclxyXG4gICAgICAgIHRoaXMuX2N1cnNvclNpZ25hbERlc2NyaXB0b3IgPSBuZXcgWFlDdXJzb3JTaWduYWxEZXNjcmlwdG9yKGN1cnNvckluZm8pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgY3Vyc29yIHZhbHVlIGluZm9ybWF0aW9ucyBmb3IgdGhlIGdpdmVuIGN1cnNvcnNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lQb2ludH0gY3Vyc29yRGF0YTFcclxuICAgICAqIEBwYXJhbSB7SVBvaW50fSBjdXJzb3JEYXRhMlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWUxXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdGltZTJcclxuICAgICAqIEBtZW1iZXJvZiBYWUN1cnNvclNpZ25hbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXBkYXRlVmFsdWVzKGN1cnNvckRhdGExOiBJUG9pbnQsIGN1cnNvckRhdGEyOiBJUG9pbnQsIHRpbWUxOiBudW1iZXIsIHRpbWUyOiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2ltcGxlVmFsdWVzKGN1cnNvckRhdGExLCBjdXJzb3JEYXRhMiwgdGltZTEsIHRpbWUyKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUNhbGN1bGF0ZWRWYWx1ZXMoY3Vyc29yRGF0YTEsIGN1cnNvckRhdGEyLCB0aW1lMSwgdGltZTIpO1xyXG4gICAgICAgIHRoaXMuY3Vyc29ySW5mb3MuZm9yRWFjaChjdXJzb3JJbmZvID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXRDdXJzb3JJbmZvKGN1cnNvckluZm8pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZVNpbXBsZVZhbHVlcyhjdXJzb3IxRGF0YTogSVBvaW50LCBjdXJzb3IyRGF0YTogSVBvaW50LCB0aW1lMTogbnVtYmVyLCB0aW1lMjogbnVtYmVyKXtcclxuICAgICAgICBpZihjdXJzb3IxRGF0YSAhPSB1bmRlZmluZWQgJiYgY3Vyc29yMURhdGEueSAhPSB1bmRlZmluZWQgJiYgdGltZTEgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gU2V0IGN1cnNvciAxIGluZm9zXHJcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVZhbHVlcy55MSA9IGN1cnNvcjFEYXRhLnkudG9QcmVjaXNpb24oMTcpO1xyXG4gICAgICAgICAgICB0aGlzLl9hdmFpbGFibGVWYWx1ZXMueDEgPSBjdXJzb3IxRGF0YS54LnRvUHJlY2lzaW9uKDE3KTtcclxuICAgICAgICAgICAgdGhpcy5fYXZhaWxhYmxlVmFsdWVzLnQxID0gdGltZTEudG9QcmVjaXNpb24oNik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVZhbHVlcy55MSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgdGhpcy5fYXZhaWxhYmxlVmFsdWVzLngxID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB0aGlzLl9hdmFpbGFibGVWYWx1ZXMudDEgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGN1cnNvcjJEYXRhICE9IHVuZGVmaW5lZCAmJiBjdXJzb3IyRGF0YS55ICE9IHVuZGVmaW5lZCAmJiB0aW1lMiAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAvLyBTZXQgY3Vyc29yIDEgaW5mb3NcclxuICAgICAgICAgICAgdGhpcy5fYXZhaWxhYmxlVmFsdWVzLnkyID0gY3Vyc29yMkRhdGEueS50b1ByZWNpc2lvbigxNyk7XHJcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVZhbHVlcy54MiA9IGN1cnNvcjJEYXRhLngudG9QcmVjaXNpb24oMTcpO1xyXG4gICAgICAgICAgICB0aGlzLl9hdmFpbGFibGVWYWx1ZXMudDIgPSB0aW1lMi50b1ByZWNpc2lvbig2KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fYXZhaWxhYmxlVmFsdWVzLnkyID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB0aGlzLl9hdmFpbGFibGVWYWx1ZXMueDIgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVZhbHVlcy50MiA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVDYWxjdWxhdGVkVmFsdWVzKGN1cnNvcjFEYXRhOiBJUG9pbnQsIGN1cnNvcjJEYXRhOiBJUG9pbnQsIHRpbWUxOiBudW1iZXIsIHRpbWUyOiBudW1iZXIpe1xyXG4gICAgICAgIGlmKGN1cnNvcjFEYXRhICE9IHVuZGVmaW5lZCAmJiBjdXJzb3IxRGF0YS55ICE9IHVuZGVmaW5lZCAmJiB0aW1lMSAhPSB1bmRlZmluZWQgJiYgY3Vyc29yMkRhdGEgIT0gdW5kZWZpbmVkICYmIGN1cnNvcjJEYXRhLnkgIT0gdW5kZWZpbmVkICYmIHRpbWUyICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGxldCBjdXJzb3JNaW5YVmFsdWUgPSBjdXJzb3IxRGF0YS54O1xyXG4gICAgICAgICAgICBsZXQgY3Vyc29yTWF4WFZhbHVlID0gY3Vyc29yMkRhdGEueDtcclxuICAgICAgICAgICAgaWYoY3Vyc29yTWluWFZhbHVlID4gY3Vyc29yTWF4WFZhbHVlKXtcclxuICAgICAgICAgICAgICAgIC8vIENoYW5nZSBtaW4gYW5kIG1heCB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgbGV0IHRlbXBYVmFsdWUgPSBjdXJzb3JNYXhYVmFsdWU7XHJcbiAgICAgICAgICAgICAgICBjdXJzb3JNYXhYVmFsdWUgPSBjdXJzb3JNaW5YVmFsdWU7XHJcbiAgICAgICAgICAgICAgICBjdXJzb3JNaW5YVmFsdWUgPSB0ZW1wWFZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9hdmFpbGFibGVWYWx1ZXMueURpZmYgPSAoY3Vyc29yMkRhdGEueS1jdXJzb3IxRGF0YS55KS50b1ByZWNpc2lvbigxNyk7XHJcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVZhbHVlcy54RGlmZiA9IChjdXJzb3IyRGF0YS54LWN1cnNvcjFEYXRhLngpLnRvUHJlY2lzaW9uKDE3KTtcclxuICAgICAgICAgICAgdGhpcy5fYXZhaWxhYmxlVmFsdWVzLnREaWZmID0gKHRpbWUyLXRpbWUxKS50b1ByZWNpc2lvbig2KTtcclxuICAgICAgICAgICAgdGhpcy5fYXZhaWxhYmxlVmFsdWVzLmV1Y0Rpc3QgPSAoTWF0aC5zcXJ0KE1hdGgucG93KGN1cnNvcjJEYXRhLnggLSBjdXJzb3IxRGF0YS54LCAyKSArIE1hdGgucG93KGN1cnNvcjJEYXRhLnkgLSBjdXJzb3IxRGF0YS55LCAyKSApKS50b1ByZWNpc2lvbigxNyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVZhbHVlcy55RGlmZiA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgdGhpcy5fYXZhaWxhYmxlVmFsdWVzLnREaWZmID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB0aGlzLl9hdmFpbGFibGVWYWx1ZXMueERpZmYgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IGN1cnNvciBpbmZvcm1hdGlvbnNcclxuICAgICAqIFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gY3Vyc29ySW5mb1xyXG4gICAgICogQG1lbWJlcm9mIFhZQ3Vyc29yU2lnbmFsXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0Q3Vyc29ySW5mbyhjdXJzb3JJbmZvOiBDdXJzb3JJbmZvKXtcclxuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLl9hdmFpbGFibGVWYWx1ZXNbY3Vyc29ySW5mby5pZF07XHJcbiAgICAgICAgaWYodmFsdWUgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdmFsdWUgPSBJbmZvVmFsdWVzLnVuZGVmaW5lZFRleHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGN1cnNvckluZm8udmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxuICBcclxuICAgIC8qKlxyXG4gICAgICogcHJvdmlkZXMgYWxsIGF2YWlsYWJsZSBjdXJzb3IgaW5mb3NcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8Q3Vyc29yRGlzcGxheUluZm9DbGFzcz59XHJcbiAgICAgKiBAbWVtYmVyb2YgWFlDdXJzb3JTaWduYWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEFsbEN1cnNvckluZm8gKCk6IEFycmF5PEN1cnNvckRpc3BsYXlJbmZvQ2xhc3M+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY3Vyc29yU2lnbmFsRGVzY3JpcHRvci5nZXRBbGxDdXJzb3JJbmZvKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEluZm9WYWx1ZXN7XHJcbiAgICAvLyBUaGlzIHByb3BlcnRpZXMgbXVzdCBoYXZlIHRoZSBzYW1lIG5hbWUgYXMgdGhlIGlkcyBkZWZpbmVkIGluIHRoZSBDdXJzb3JTaWduYWwgY2xhc3MgKGUuZy4gY3Vyc29ySW5mb0lkX3kxID0gXCJ5MVwiOylcclxuICAgIHB1YmxpYyB5MTogc3RyaW5nfHVuZGVmaW5lZDtcclxuICAgIHB1YmxpYyB5Mjogc3RyaW5nfHVuZGVmaW5lZDtcclxuICAgIHB1YmxpYyB0MTogc3RyaW5nfHVuZGVmaW5lZDtcclxuICAgIHB1YmxpYyB0Mjogc3RyaW5nfHVuZGVmaW5lZDtcclxuICAgIHB1YmxpYyB4MTogc3RyaW5nfHVuZGVmaW5lZDtcclxuICAgIHB1YmxpYyB4Mjogc3RyaW5nfHVuZGVmaW5lZDtcclxuICAgIHB1YmxpYyB5RGlmZjogc3RyaW5nfHVuZGVmaW5lZDtcclxuICAgIHB1YmxpYyB0RGlmZjogc3RyaW5nfHVuZGVmaW5lZDtcclxuICAgIHB1YmxpYyB4RGlmZjogc3RyaW5nfHVuZGVmaW5lZDtcclxuICAgIHB1YmxpYyBldWNEaXN0OiBzdHJpbmd8dW5kZWZpbmVkO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgdW5kZWZpbmVkVGV4dDogc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMueTEgPSBJbmZvVmFsdWVzLnVuZGVmaW5lZFRleHQ7XHJcbiAgICAgICAgdGhpcy55MiA9IEluZm9WYWx1ZXMudW5kZWZpbmVkVGV4dDtcclxuICAgICAgICB0aGlzLngxID0gSW5mb1ZhbHVlcy51bmRlZmluZWRUZXh0O1xyXG4gICAgICAgIHRoaXMueDIgPSBJbmZvVmFsdWVzLnVuZGVmaW5lZFRleHQ7XHJcbiAgICAgICAgdGhpcy50MSA9IEluZm9WYWx1ZXMudW5kZWZpbmVkVGV4dDtcclxuICAgICAgICB0aGlzLnQyID0gSW5mb1ZhbHVlcy51bmRlZmluZWRUZXh0O1xyXG4gICAgICAgIHRoaXMueURpZmYgPSBJbmZvVmFsdWVzLnVuZGVmaW5lZFRleHQ7XHJcbiAgICAgICAgdGhpcy50RGlmZiA9IEluZm9WYWx1ZXMudW5kZWZpbmVkVGV4dDtcclxuICAgICAgICB0aGlzLnhEaWZmID0gSW5mb1ZhbHVlcy51bmRlZmluZWRUZXh0O1xyXG4gICAgICAgIHRoaXMuZXVjRGlzdCA9IEluZm9WYWx1ZXMudW5kZWZpbmVkVGV4dDtcclxuICAgIH1cclxufSJdfQ==