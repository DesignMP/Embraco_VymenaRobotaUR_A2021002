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
define(["require", "exports", "./cursorInfo", "./dynamicCursorSignalTemplate", "./cursorSignalDescriptor"], function (require, exports, cursorInfo_1, dynamicCursorSignalTemplate_1, cursorSignalDescriptor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var YTCursorSignalDescriptor = /** @class */ (function (_super) {
        __extends(YTCursorSignalDescriptor, _super);
        /**
         * Creates an instance of XYCursorSignalDescriptor.
         * @memberof YTCursorSignalDescriptor
         */
        function YTCursorSignalDescriptor() {
            var _this = _super.call(this) || this;
            _this.initializeCursorSignalInfos();
            _this.setDefaultCursorInfos();
            return _this;
        }
        YTCursorSignalDescriptor.prototype.initializeCursorSignalInfos = function () {
            this._cursorInfoIds = [
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("y1", "y cursor 1", "The y position of cursor 1", cursorInfo_1.CursorDependency.Cursor1),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("t1", "t cursor 1", "The time of cursor 1", cursorInfo_1.CursorDependency.Cursor1),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("y2", "y cursor 2", "The y position of cursor 2", cursorInfo_1.CursorDependency.Cursor2),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("t2", "t cursor 2", "The time of cursor 2", cursorInfo_1.CursorDependency.Cursor2),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("yDiff", "y diff (y2-y1)", "The y difference between cursor 1 and cursor 2", cursorInfo_1.CursorDependency.BothCursors),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("tDiff", "t diff (t2-t1)", "The time difference between cursor 1 and cursor 2", cursorInfo_1.CursorDependency.BothCursors),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("yMean", "y mean", "The mean value of y between cursor 1 and cursor 2", cursorInfo_1.CursorDependency.BothCursors),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("yStD", "y standard deviation", "The standard deviation of the y value between cursor 1 and cursor 2", cursorInfo_1.CursorDependency.BothCursors),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("yVar", "y variance", "The variance of the y value between cursor 1 and cursor 2", cursorInfo_1.CursorDependency.BothCursors),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("yRms", "y RMS", "The root Mean Square (RMS) value of y between cursor 1 and cursor 2", cursorInfo_1.CursorDependency.BothCursors),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("yMinimum", "y min", "The minimum value of y between cursor 1 and cursor 2", cursorInfo_1.CursorDependency.BothCursors),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("yMaximum", "y max", "The maximum value of y between cursor 1 and cursor 2", cursorInfo_1.CursorDependency.BothCursors),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("yPp", "y peak to peak", "The peak to peak value of y between cursor 1 and cursor 2", cursorInfo_1.CursorDependency.BothCursors)
            ];
            this.visibleInfoIds = ['y1', 'y2', 't1', 't2'];
        };
        Object.defineProperty(YTCursorSignalDescriptor.prototype, "cursorInfos", {
            get: function () {
                return this._cursorInfos;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * This method is used by the DynamicCursorSignalTemplate to get hold
         * of all available cursor information available to the YTChart
         *
         * @returns {Array<CursorDisplayInfoClass>}
         * @memberof YTCursorSignalDescriptor
         */
        YTCursorSignalDescriptor.prototype.getAllCursorInfo = function () {
            return this._cursorInfoIds;
        };
        /**
         * Sets the default cursor infos for this cursor signal
         *
         * @private
         * @memberof YTCursorSignalDescriptor
         */
        YTCursorSignalDescriptor.prototype.setDefaultCursorInfos = function () {
            var _this = this;
            this._cursorInfoIds.forEach(function (cursorInfoId) {
                _this.addCursorInfo(cursorInfoId.id, cursorInfoId.displayName, cursorInfoId.description, cursorInfoId.cursorDependency);
            });
        };
        /**
         * Adds a new cursor info to the cursor info list with the default displayname and description if not given(undefined)
         *
         * @protected
         * @param {string} id
         * @param {string} displayName
         * @param {string} description
         * @param {CursorDependency} cursorDependency
         * @memberof YTCursorSignalDescriptor
         */
        YTCursorSignalDescriptor.prototype.addCursorInfo = function (id, displayName, description, cursorDependency) {
            var visible = this.getVisibility(id);
            this._cursorInfos.push(new cursorInfo_1.CursorInfo(id, displayName, description, this, visible, cursorDependency));
        };
        /**
         * Retrieves the visibility for a given cursor info id
         *
         * @protected
         * @param {string} id
         * @returns {string}
         * @memberof YTCursorSignalDescriptor
         */
        YTCursorSignalDescriptor.prototype.getVisibility = function (id) {
            return this.visibleInfoIds.includes(id).toString();
        };
        return YTCursorSignalDescriptor;
    }(cursorSignalDescriptor_1.CursorSignalDescriptor));
    exports.YTCursorSignalDescriptor = YTCursorSignalDescriptor;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXRDdXJzb3JTaWduYWxEZXNjcmlwdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2N1cnNvckluZm9XaWRnZXQvbW9kZWwveXRDdXJzb3JTaWduYWxEZXNjcmlwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFJQTtRQUE4Qyw0Q0FBc0I7UUFFaEU7OztXQUdHO1FBQ0g7WUFBQSxZQUNJLGlCQUFPLFNBS1Y7WUFIRyxLQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztZQUVuQyxLQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQzs7UUFDakMsQ0FBQztRQUVELDhEQUEyQixHQUEzQjtZQUNJLElBQUksQ0FBQyxjQUFjLEdBQUc7Z0JBQ2xCLElBQUksb0RBQXNCLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRSw0QkFBNEIsRUFBRSw2QkFBZ0IsQ0FBQyxPQUFPLENBQUM7Z0JBQ3RHLElBQUksb0RBQXNCLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRSxzQkFBc0IsRUFBRSw2QkFBZ0IsQ0FBQyxPQUFPLENBQUM7Z0JBQ2hHLElBQUksb0RBQXNCLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRSw0QkFBNEIsRUFBRSw2QkFBZ0IsQ0FBQyxPQUFPLENBQUM7Z0JBQ3RHLElBQUksb0RBQXNCLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRSxzQkFBc0IsRUFBRSw2QkFBZ0IsQ0FBQyxPQUFPLENBQUM7Z0JBQ2hHLElBQUksb0RBQXNCLENBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGdEQUFnRCxFQUFFLDZCQUFnQixDQUFDLFdBQVcsQ0FBQztnQkFDckksSUFBSSxvREFBc0IsQ0FBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsbURBQW1ELEVBQUUsNkJBQWdCLENBQUMsV0FBVyxDQUFDO2dCQUN4SSxJQUFJLG9EQUFzQixDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsbURBQW1ELEVBQUUsNkJBQWdCLENBQUMsV0FBVyxDQUFDO2dCQUNoSSxJQUFJLG9EQUFzQixDQUFDLE1BQU0sRUFBRSxzQkFBc0IsRUFBRSxxRUFBcUUsRUFBRSw2QkFBZ0IsQ0FBQyxXQUFXLENBQUM7Z0JBQy9KLElBQUksb0RBQXNCLENBQUMsTUFBTSxFQUFFLFlBQVksRUFBRSwyREFBMkQsRUFBRSw2QkFBZ0IsQ0FBQyxXQUFXLENBQUM7Z0JBQzNJLElBQUksb0RBQXNCLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxxRUFBcUUsRUFBRSw2QkFBZ0IsQ0FBQyxXQUFXLENBQUM7Z0JBQ2hKLElBQUksb0RBQXNCLENBQUMsVUFBVSxFQUFFLE9BQU8sRUFBRSxzREFBc0QsRUFBRSw2QkFBZ0IsQ0FBQyxXQUFXLENBQUM7Z0JBQ3JJLElBQUksb0RBQXNCLENBQUMsVUFBVSxFQUFFLE9BQU8sRUFBRSxzREFBc0QsRUFBRSw2QkFBZ0IsQ0FBQyxXQUFXLENBQUM7Z0JBQ3JJLElBQUksb0RBQXNCLENBQUMsS0FBSyxFQUFFLGdCQUFnQixFQUFFLDJEQUEyRCxFQUFFLDZCQUFnQixDQUFDLFdBQVcsQ0FBQzthQUNqSixDQUFDO1lBRUYsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25ELENBQUM7UUFFRCxzQkFBSSxpREFBVztpQkFBZjtnQkFDSSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDN0IsQ0FBQzs7O1dBQUE7UUFFRDs7Ozs7O1dBTUc7UUFDSSxtREFBZ0IsR0FBdkI7WUFDSSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDL0IsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ08sd0RBQXFCLEdBQS9CO1lBQUEsaUJBSUM7WUFIRyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxVQUFDLFlBQW9DO2dCQUM3RCxLQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsWUFBWSxDQUFDLFdBQVcsRUFBRSxZQUFZLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQzNILENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUVEOzs7Ozs7Ozs7V0FTRztRQUNPLGdEQUFhLEdBQXZCLFVBQXdCLEVBQVUsRUFBRSxXQUFtQixFQUFFLFdBQW1CLEVBQUUsZ0JBQWtDO1lBRTVHLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFckMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSx1QkFBVSxDQUFDLEVBQUUsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1FBQzFHLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ08sZ0RBQWEsR0FBdkIsVUFBeUIsRUFBVTtZQUMvQixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3ZELENBQUM7UUFDTCwrQkFBQztJQUFELENBQUMsQUF6RkQsQ0FBOEMsK0NBQXNCLEdBeUZuRTtJQXpGWSw0REFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDdXJzb3JJbmZvLCBDdXJzb3JEZXBlbmRlbmN5IH0gZnJvbSBcIi4vY3Vyc29ySW5mb1wiO1xyXG5pbXBvcnQgeyBDdXJzb3JEaXNwbGF5SW5mb0NsYXNzIH0gZnJvbSBcIi4vZHluYW1pY0N1cnNvclNpZ25hbFRlbXBsYXRlXCI7XHJcbmltcG9ydCB7IEN1cnNvclNpZ25hbERlc2NyaXB0b3IgfSBmcm9tIFwiLi9jdXJzb3JTaWduYWxEZXNjcmlwdG9yXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgWVRDdXJzb3JTaWduYWxEZXNjcmlwdG9yIGV4dGVuZHMgQ3Vyc29yU2lnbmFsRGVzY3JpcHRvcntcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgWFlDdXJzb3JTaWduYWxEZXNjcmlwdG9yLlxyXG4gICAgICogQG1lbWJlcm9mIFlUQ3Vyc29yU2lnbmFsRGVzY3JpcHRvclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZUN1cnNvclNpZ25hbEluZm9zKCk7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0RGVmYXVsdEN1cnNvckluZm9zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZUN1cnNvclNpZ25hbEluZm9zKCkge1xyXG4gICAgICAgIHRoaXMuX2N1cnNvckluZm9JZHMgPSBbXHJcbiAgICAgICAgICAgIG5ldyBDdXJzb3JEaXNwbGF5SW5mb0NsYXNzKFwieTFcIiwgXCJ5IGN1cnNvciAxXCIsIFwiVGhlIHkgcG9zaXRpb24gb2YgY3Vyc29yIDFcIiwgQ3Vyc29yRGVwZW5kZW5jeS5DdXJzb3IxKSxcclxuICAgICAgICAgICAgbmV3IEN1cnNvckRpc3BsYXlJbmZvQ2xhc3MoXCJ0MVwiLCBcInQgY3Vyc29yIDFcIiwgXCJUaGUgdGltZSBvZiBjdXJzb3IgMVwiLCBDdXJzb3JEZXBlbmRlbmN5LkN1cnNvcjEpLFxyXG4gICAgICAgICAgICBuZXcgQ3Vyc29yRGlzcGxheUluZm9DbGFzcyhcInkyXCIsIFwieSBjdXJzb3IgMlwiLCBcIlRoZSB5IHBvc2l0aW9uIG9mIGN1cnNvciAyXCIsIEN1cnNvckRlcGVuZGVuY3kuQ3Vyc29yMiksXHJcbiAgICAgICAgICAgIG5ldyBDdXJzb3JEaXNwbGF5SW5mb0NsYXNzKFwidDJcIiwgXCJ0IGN1cnNvciAyXCIsIFwiVGhlIHRpbWUgb2YgY3Vyc29yIDJcIiwgQ3Vyc29yRGVwZW5kZW5jeS5DdXJzb3IyKSxcclxuICAgICAgICAgICAgbmV3IEN1cnNvckRpc3BsYXlJbmZvQ2xhc3MoXCJ5RGlmZlwiLCBcInkgZGlmZiAoeTIteTEpXCIsIFwiVGhlIHkgZGlmZmVyZW5jZSBiZXR3ZWVuIGN1cnNvciAxIGFuZCBjdXJzb3IgMlwiLCBDdXJzb3JEZXBlbmRlbmN5LkJvdGhDdXJzb3JzKSxcclxuICAgICAgICAgICAgbmV3IEN1cnNvckRpc3BsYXlJbmZvQ2xhc3MoXCJ0RGlmZlwiLCBcInQgZGlmZiAodDItdDEpXCIsIFwiVGhlIHRpbWUgZGlmZmVyZW5jZSBiZXR3ZWVuIGN1cnNvciAxIGFuZCBjdXJzb3IgMlwiLCBDdXJzb3JEZXBlbmRlbmN5LkJvdGhDdXJzb3JzKSxcclxuICAgICAgICAgICAgbmV3IEN1cnNvckRpc3BsYXlJbmZvQ2xhc3MoXCJ5TWVhblwiLCBcInkgbWVhblwiLCBcIlRoZSBtZWFuIHZhbHVlIG9mIHkgYmV0d2VlbiBjdXJzb3IgMSBhbmQgY3Vyc29yIDJcIiwgQ3Vyc29yRGVwZW5kZW5jeS5Cb3RoQ3Vyc29ycyksXHJcbiAgICAgICAgICAgIG5ldyBDdXJzb3JEaXNwbGF5SW5mb0NsYXNzKFwieVN0RFwiLCBcInkgc3RhbmRhcmQgZGV2aWF0aW9uXCIsIFwiVGhlIHN0YW5kYXJkIGRldmlhdGlvbiBvZiB0aGUgeSB2YWx1ZSBiZXR3ZWVuIGN1cnNvciAxIGFuZCBjdXJzb3IgMlwiLCBDdXJzb3JEZXBlbmRlbmN5LkJvdGhDdXJzb3JzKSxcclxuICAgICAgICAgICAgbmV3IEN1cnNvckRpc3BsYXlJbmZvQ2xhc3MoXCJ5VmFyXCIsIFwieSB2YXJpYW5jZVwiLCBcIlRoZSB2YXJpYW5jZSBvZiB0aGUgeSB2YWx1ZSBiZXR3ZWVuIGN1cnNvciAxIGFuZCBjdXJzb3IgMlwiLCBDdXJzb3JEZXBlbmRlbmN5LkJvdGhDdXJzb3JzKSxcclxuICAgICAgICAgICAgbmV3IEN1cnNvckRpc3BsYXlJbmZvQ2xhc3MoXCJ5Um1zXCIsIFwieSBSTVNcIiwgXCJUaGUgcm9vdCBNZWFuIFNxdWFyZSAoUk1TKSB2YWx1ZSBvZiB5IGJldHdlZW4gY3Vyc29yIDEgYW5kIGN1cnNvciAyXCIsIEN1cnNvckRlcGVuZGVuY3kuQm90aEN1cnNvcnMpLFxyXG4gICAgICAgICAgICBuZXcgQ3Vyc29yRGlzcGxheUluZm9DbGFzcyhcInlNaW5pbXVtXCIsIFwieSBtaW5cIiwgXCJUaGUgbWluaW11bSB2YWx1ZSBvZiB5IGJldHdlZW4gY3Vyc29yIDEgYW5kIGN1cnNvciAyXCIsIEN1cnNvckRlcGVuZGVuY3kuQm90aEN1cnNvcnMpLFxyXG4gICAgICAgICAgICBuZXcgQ3Vyc29yRGlzcGxheUluZm9DbGFzcyhcInlNYXhpbXVtXCIsIFwieSBtYXhcIiwgXCJUaGUgbWF4aW11bSB2YWx1ZSBvZiB5IGJldHdlZW4gY3Vyc29yIDEgYW5kIGN1cnNvciAyXCIsIEN1cnNvckRlcGVuZGVuY3kuQm90aEN1cnNvcnMpLFxyXG4gICAgICAgICAgICBuZXcgQ3Vyc29yRGlzcGxheUluZm9DbGFzcyhcInlQcFwiLCBcInkgcGVhayB0byBwZWFrXCIsIFwiVGhlIHBlYWsgdG8gcGVhayB2YWx1ZSBvZiB5IGJldHdlZW4gY3Vyc29yIDEgYW5kIGN1cnNvciAyXCIsIEN1cnNvckRlcGVuZGVuY3kuQm90aEN1cnNvcnMpXHJcbiAgICAgICAgXTtcclxuICAgIFxyXG4gICAgICAgIHRoaXMudmlzaWJsZUluZm9JZHMgPSBbJ3kxJywgJ3kyJywgJ3QxJywgJ3QyJ107ICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IGN1cnNvckluZm9zKCk6IEFycmF5PEN1cnNvckluZm8+e1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJzb3JJbmZvcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgbWV0aG9kIGlzIHVzZWQgYnkgdGhlIER5bmFtaWNDdXJzb3JTaWduYWxUZW1wbGF0ZSB0byBnZXQgaG9sZFxyXG4gICAgICogb2YgYWxsIGF2YWlsYWJsZSBjdXJzb3IgaW5mb3JtYXRpb24gYXZhaWxhYmxlIHRvIHRoZSBZVENoYXJ0XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0FycmF5PEN1cnNvckRpc3BsYXlJbmZvQ2xhc3M+fVxyXG4gICAgICogQG1lbWJlcm9mIFlUQ3Vyc29yU2lnbmFsRGVzY3JpcHRvclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0QWxsQ3Vyc29ySW5mbyAoKTogQXJyYXk8Q3Vyc29yRGlzcGxheUluZm9DbGFzcz4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJzb3JJbmZvSWRzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgZGVmYXVsdCBjdXJzb3IgaW5mb3MgZm9yIHRoaXMgY3Vyc29yIHNpZ25hbFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgWVRDdXJzb3JTaWduYWxEZXNjcmlwdG9yXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBzZXREZWZhdWx0Q3Vyc29ySW5mb3MoKXtcclxuICAgICAgICB0aGlzLl9jdXJzb3JJbmZvSWRzLmZvckVhY2goKGN1cnNvckluZm9JZDogQ3Vyc29yRGlzcGxheUluZm9DbGFzcykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmFkZEN1cnNvckluZm8oY3Vyc29ySW5mb0lkLmlkLCBjdXJzb3JJbmZvSWQuZGlzcGxheU5hbWUsIGN1cnNvckluZm9JZC5kZXNjcmlwdGlvbiwgY3Vyc29ySW5mb0lkLmN1cnNvckRlcGVuZGVuY3kpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIG5ldyBjdXJzb3IgaW5mbyB0byB0aGUgY3Vyc29yIGluZm8gbGlzdCB3aXRoIHRoZSBkZWZhdWx0IGRpc3BsYXluYW1lIGFuZCBkZXNjcmlwdGlvbiBpZiBub3QgZ2l2ZW4odW5kZWZpbmVkKVxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRpc3BsYXlOYW1lXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGVzY3JpcHRpb25cclxuICAgICAqIEBwYXJhbSB7Q3Vyc29yRGVwZW5kZW5jeX0gY3Vyc29yRGVwZW5kZW5jeVxyXG4gICAgICogQG1lbWJlcm9mIFlUQ3Vyc29yU2lnbmFsRGVzY3JpcHRvclxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgYWRkQ3Vyc29ySW5mbyhpZDogc3RyaW5nLCBkaXNwbGF5TmFtZTogc3RyaW5nLCBkZXNjcmlwdGlvbjogc3RyaW5nLCBjdXJzb3JEZXBlbmRlbmN5OiBDdXJzb3JEZXBlbmRlbmN5KXtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgdmlzaWJsZSA9IHRoaXMuZ2V0VmlzaWJpbGl0eShpZCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2N1cnNvckluZm9zLnB1c2gobmV3IEN1cnNvckluZm8oaWQsIGRpc3BsYXlOYW1lLCBkZXNjcmlwdGlvbiwgdGhpcywgdmlzaWJsZSwgY3Vyc29yRGVwZW5kZW5jeSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0cmlldmVzIHRoZSB2aXNpYmlsaXR5IGZvciBhIGdpdmVuIGN1cnNvciBpbmZvIGlkXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFlUQ3Vyc29yU2lnbmFsRGVzY3JpcHRvclxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0VmlzaWJpbGl0eSAoaWQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmlzaWJsZUluZm9JZHMuaW5jbHVkZXMoaWQpLnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcbn1cclxuIl19