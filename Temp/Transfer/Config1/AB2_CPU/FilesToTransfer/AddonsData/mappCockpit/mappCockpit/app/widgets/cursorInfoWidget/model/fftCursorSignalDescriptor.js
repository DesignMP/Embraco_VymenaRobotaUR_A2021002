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
    var FFTCursorSignalDescriptor = /** @class */ (function (_super) {
        __extends(FFTCursorSignalDescriptor, _super);
        /**
         * Creates an instance of XYCursorSignalDescriptor.
         * @memberof FFTCursorSignalDescriptor
         */
        function FFTCursorSignalDescriptor() {
            var _this = _super.call(this) || this;
            _this.initializeCursorSignalInfos();
            _this.setDefaultCursorInfos();
            return _this;
        }
        FFTCursorSignalDescriptor.prototype.initializeCursorSignalInfos = function () {
            this._cursorInfoIds = [
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("y1", "y cursor 1", "The y position of cursor 1", cursorInfo_1.CursorDependency.Cursor1),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("f1", "f cursor 1", "The frequency of cursor 1", cursorInfo_1.CursorDependency.Cursor1),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("y2", "y cursor 2", "The y position of cursor 2", cursorInfo_1.CursorDependency.Cursor2),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("f2", "f cursor 2", "The frequency of cursor 2", cursorInfo_1.CursorDependency.Cursor2),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("yDiff", "y diff (y2-y1)", "The y difference between cursor 1 and cursor 2", cursorInfo_1.CursorDependency.BothCursors),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("fDiff", "f diff (f2-f1)", "The frequency difference between cursor 1 and cursor 2", cursorInfo_1.CursorDependency.BothCursors),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("yMean", "y mean", "The mean value of y between cursor 1 and cursor 2", cursorInfo_1.CursorDependency.BothCursors),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("yStD", "y standard deviation", "The standard deviation of the y value between cursor 1 and cursor 2", cursorInfo_1.CursorDependency.BothCursors),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("yVar", "y variance", "The variance of the y value between cursor 1 and cursor 2", cursorInfo_1.CursorDependency.BothCursors),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("yRms", "y RMS", "The root Mean Square (RMS) value of y between cursor 1 and cursor 2", cursorInfo_1.CursorDependency.BothCursors),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("yMinimum", "y min", "The minimum value of y between cursor 1 and cursor 2", cursorInfo_1.CursorDependency.BothCursors),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("yMaximum", "y max", "The maximum value of y between cursor 1 and cursor 2", cursorInfo_1.CursorDependency.BothCursors),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("yPp", "y peak to peak", "The peak to peak value of y between cursor 1 and cursor 2", cursorInfo_1.CursorDependency.BothCursors)
            ];
            this.visibleInfoIds = ['y1', 'y2', 'f1', 'f2'];
        };
        Object.defineProperty(FFTCursorSignalDescriptor.prototype, "cursorInfos", {
            get: function () {
                return this._cursorInfos;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * This method is used by the DynamicCursorSignalTemplate to get hold
         * of all available cursor information available to the FFTChart
         *
         * @returns {Array<CursorDisplayInfoClass>}
         * @memberof FFTCursorSignalDescriptor
         */
        FFTCursorSignalDescriptor.prototype.getAllCursorInfo = function () {
            return this._cursorInfoIds;
        };
        /**
         * Sets the default cursor infos for this cursor signal
         *
         * @private
         * @memberof FFTCursorSignalDescriptor
         */
        FFTCursorSignalDescriptor.prototype.setDefaultCursorInfos = function () {
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
         * @memberof FFTCursorSignalDescriptor
         */
        FFTCursorSignalDescriptor.prototype.addCursorInfo = function (id, displayName, description, cursorDependency) {
            var visible = this.getVisibility(id);
            this._cursorInfos.push(new cursorInfo_1.CursorInfo(id, displayName, description, this, visible, cursorDependency));
        };
        /**
         * Retrieves the visibility for a given cursor info id
         *
         * @protected
         * @param {string} id
         * @returns {string}
         * @memberof FFTCursorSignalDescriptor
         */
        FFTCursorSignalDescriptor.prototype.getVisibility = function (id) {
            return this.visibleInfoIds.includes(id).toString();
        };
        return FFTCursorSignalDescriptor;
    }(cursorSignalDescriptor_1.CursorSignalDescriptor));
    exports.FFTCursorSignalDescriptor = FFTCursorSignalDescriptor;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmZ0Q3Vyc29yU2lnbmFsRGVzY3JpcHRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jdXJzb3JJbmZvV2lkZ2V0L21vZGVsL2ZmdEN1cnNvclNpZ25hbERlc2NyaXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUlBO1FBQStDLDZDQUFzQjtRQUVqRTs7O1dBR0c7UUFDSDtZQUFBLFlBQ0ksaUJBQU8sU0FLVjtZQUhHLEtBQUksQ0FBQywyQkFBMkIsRUFBRSxDQUFDO1lBRW5DLEtBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDOztRQUNqQyxDQUFDO1FBRUQsK0RBQTJCLEdBQTNCO1lBQ0ksSUFBSSxDQUFDLGNBQWMsR0FBRztnQkFDbEIsSUFBSSxvREFBc0IsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLDRCQUE0QixFQUFFLDZCQUFnQixDQUFDLE9BQU8sQ0FBQztnQkFDdEcsSUFBSSxvREFBc0IsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLDJCQUEyQixFQUFFLDZCQUFnQixDQUFDLE9BQU8sQ0FBQztnQkFDckcsSUFBSSxvREFBc0IsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLDRCQUE0QixFQUFFLDZCQUFnQixDQUFDLE9BQU8sQ0FBQztnQkFDdEcsSUFBSSxvREFBc0IsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLDJCQUEyQixFQUFFLDZCQUFnQixDQUFDLE9BQU8sQ0FBQztnQkFDckcsSUFBSSxvREFBc0IsQ0FBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsZ0RBQWdELEVBQUUsNkJBQWdCLENBQUMsV0FBVyxDQUFDO2dCQUNySSxJQUFJLG9EQUFzQixDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSx3REFBd0QsRUFBRSw2QkFBZ0IsQ0FBQyxXQUFXLENBQUM7Z0JBQzdJLElBQUksb0RBQXNCLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxtREFBbUQsRUFBRSw2QkFBZ0IsQ0FBQyxXQUFXLENBQUM7Z0JBQ2hJLElBQUksb0RBQXNCLENBQUMsTUFBTSxFQUFFLHNCQUFzQixFQUFFLHFFQUFxRSxFQUFFLDZCQUFnQixDQUFDLFdBQVcsQ0FBQztnQkFDL0osSUFBSSxvREFBc0IsQ0FBQyxNQUFNLEVBQUUsWUFBWSxFQUFFLDJEQUEyRCxFQUFFLDZCQUFnQixDQUFDLFdBQVcsQ0FBQztnQkFDM0ksSUFBSSxvREFBc0IsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLHFFQUFxRSxFQUFFLDZCQUFnQixDQUFDLFdBQVcsQ0FBQztnQkFDaEosSUFBSSxvREFBc0IsQ0FBQyxVQUFVLEVBQUUsT0FBTyxFQUFFLHNEQUFzRCxFQUFFLDZCQUFnQixDQUFDLFdBQVcsQ0FBQztnQkFDckksSUFBSSxvREFBc0IsQ0FBQyxVQUFVLEVBQUUsT0FBTyxFQUFFLHNEQUFzRCxFQUFFLDZCQUFnQixDQUFDLFdBQVcsQ0FBQztnQkFDckksSUFBSSxvREFBc0IsQ0FBQyxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsMkRBQTJELEVBQUUsNkJBQWdCLENBQUMsV0FBVyxDQUFDO2FBQ2pKLENBQUM7WUFFRixJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkQsQ0FBQztRQUVELHNCQUFJLGtEQUFXO2lCQUFmO2dCQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztZQUM3QixDQUFDOzs7V0FBQTtRQUVEOzs7Ozs7V0FNRztRQUNJLG9EQUFnQixHQUF2QjtZQUNJLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUMvQixDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDTyx5REFBcUIsR0FBL0I7WUFBQSxpQkFJQztZQUhHLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFVBQUMsWUFBb0M7Z0JBQzdELEtBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxZQUFZLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxXQUFXLEVBQUUsWUFBWSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDM0gsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBRUQ7Ozs7Ozs7OztXQVNHO1FBQ08saURBQWEsR0FBdkIsVUFBd0IsRUFBVSxFQUFFLFdBQW1CLEVBQUUsV0FBbUIsRUFBRSxnQkFBa0M7WUFFNUcsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUVyQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLHVCQUFVLENBQUMsRUFBRSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7UUFDMUcsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDTyxpREFBYSxHQUF2QixVQUF5QixFQUFVO1lBQy9CLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDdkQsQ0FBQztRQUNMLGdDQUFDO0lBQUQsQ0FBQyxBQXpGRCxDQUErQywrQ0FBc0IsR0F5RnBFO0lBekZZLDhEQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEN1cnNvckluZm8sIEN1cnNvckRlcGVuZGVuY3kgfSBmcm9tIFwiLi9jdXJzb3JJbmZvXCI7XHJcbmltcG9ydCB7IEN1cnNvckRpc3BsYXlJbmZvQ2xhc3MgfSBmcm9tIFwiLi9keW5hbWljQ3Vyc29yU2lnbmFsVGVtcGxhdGVcIjtcclxuaW1wb3J0IHsgQ3Vyc29yU2lnbmFsRGVzY3JpcHRvciB9IGZyb20gXCIuL2N1cnNvclNpZ25hbERlc2NyaXB0b3JcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBGRlRDdXJzb3JTaWduYWxEZXNjcmlwdG9yIGV4dGVuZHMgQ3Vyc29yU2lnbmFsRGVzY3JpcHRvcntcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgWFlDdXJzb3JTaWduYWxEZXNjcmlwdG9yLlxyXG4gICAgICogQG1lbWJlcm9mIEZGVEN1cnNvclNpZ25hbERlc2NyaXB0b3JcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICB0aGlzLmluaXRpYWxpemVDdXJzb3JTaWduYWxJbmZvcygpO1xyXG5cclxuICAgICAgICB0aGlzLnNldERlZmF1bHRDdXJzb3JJbmZvcygpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRpYWxpemVDdXJzb3JTaWduYWxJbmZvcygpIHtcclxuICAgICAgICB0aGlzLl9jdXJzb3JJbmZvSWRzID0gW1xyXG4gICAgICAgICAgICBuZXcgQ3Vyc29yRGlzcGxheUluZm9DbGFzcyhcInkxXCIsIFwieSBjdXJzb3IgMVwiLCBcIlRoZSB5IHBvc2l0aW9uIG9mIGN1cnNvciAxXCIsIEN1cnNvckRlcGVuZGVuY3kuQ3Vyc29yMSksXHJcbiAgICAgICAgICAgIG5ldyBDdXJzb3JEaXNwbGF5SW5mb0NsYXNzKFwiZjFcIiwgXCJmIGN1cnNvciAxXCIsIFwiVGhlIGZyZXF1ZW5jeSBvZiBjdXJzb3IgMVwiLCBDdXJzb3JEZXBlbmRlbmN5LkN1cnNvcjEpLFxyXG4gICAgICAgICAgICBuZXcgQ3Vyc29yRGlzcGxheUluZm9DbGFzcyhcInkyXCIsIFwieSBjdXJzb3IgMlwiLCBcIlRoZSB5IHBvc2l0aW9uIG9mIGN1cnNvciAyXCIsIEN1cnNvckRlcGVuZGVuY3kuQ3Vyc29yMiksXHJcbiAgICAgICAgICAgIG5ldyBDdXJzb3JEaXNwbGF5SW5mb0NsYXNzKFwiZjJcIiwgXCJmIGN1cnNvciAyXCIsIFwiVGhlIGZyZXF1ZW5jeSBvZiBjdXJzb3IgMlwiLCBDdXJzb3JEZXBlbmRlbmN5LkN1cnNvcjIpLFxyXG4gICAgICAgICAgICBuZXcgQ3Vyc29yRGlzcGxheUluZm9DbGFzcyhcInlEaWZmXCIsIFwieSBkaWZmICh5Mi15MSlcIiwgXCJUaGUgeSBkaWZmZXJlbmNlIGJldHdlZW4gY3Vyc29yIDEgYW5kIGN1cnNvciAyXCIsIEN1cnNvckRlcGVuZGVuY3kuQm90aEN1cnNvcnMpLFxyXG4gICAgICAgICAgICBuZXcgQ3Vyc29yRGlzcGxheUluZm9DbGFzcyhcImZEaWZmXCIsIFwiZiBkaWZmIChmMi1mMSlcIiwgXCJUaGUgZnJlcXVlbmN5IGRpZmZlcmVuY2UgYmV0d2VlbiBjdXJzb3IgMSBhbmQgY3Vyc29yIDJcIiwgQ3Vyc29yRGVwZW5kZW5jeS5Cb3RoQ3Vyc29ycyksXHJcbiAgICAgICAgICAgIG5ldyBDdXJzb3JEaXNwbGF5SW5mb0NsYXNzKFwieU1lYW5cIiwgXCJ5IG1lYW5cIiwgXCJUaGUgbWVhbiB2YWx1ZSBvZiB5IGJldHdlZW4gY3Vyc29yIDEgYW5kIGN1cnNvciAyXCIsIEN1cnNvckRlcGVuZGVuY3kuQm90aEN1cnNvcnMpLFxyXG4gICAgICAgICAgICBuZXcgQ3Vyc29yRGlzcGxheUluZm9DbGFzcyhcInlTdERcIiwgXCJ5IHN0YW5kYXJkIGRldmlhdGlvblwiLCBcIlRoZSBzdGFuZGFyZCBkZXZpYXRpb24gb2YgdGhlIHkgdmFsdWUgYmV0d2VlbiBjdXJzb3IgMSBhbmQgY3Vyc29yIDJcIiwgQ3Vyc29yRGVwZW5kZW5jeS5Cb3RoQ3Vyc29ycyksXHJcbiAgICAgICAgICAgIG5ldyBDdXJzb3JEaXNwbGF5SW5mb0NsYXNzKFwieVZhclwiLCBcInkgdmFyaWFuY2VcIiwgXCJUaGUgdmFyaWFuY2Ugb2YgdGhlIHkgdmFsdWUgYmV0d2VlbiBjdXJzb3IgMSBhbmQgY3Vyc29yIDJcIiwgQ3Vyc29yRGVwZW5kZW5jeS5Cb3RoQ3Vyc29ycyksXHJcbiAgICAgICAgICAgIG5ldyBDdXJzb3JEaXNwbGF5SW5mb0NsYXNzKFwieVJtc1wiLCBcInkgUk1TXCIsIFwiVGhlIHJvb3QgTWVhbiBTcXVhcmUgKFJNUykgdmFsdWUgb2YgeSBiZXR3ZWVuIGN1cnNvciAxIGFuZCBjdXJzb3IgMlwiLCBDdXJzb3JEZXBlbmRlbmN5LkJvdGhDdXJzb3JzKSxcclxuICAgICAgICAgICAgbmV3IEN1cnNvckRpc3BsYXlJbmZvQ2xhc3MoXCJ5TWluaW11bVwiLCBcInkgbWluXCIsIFwiVGhlIG1pbmltdW0gdmFsdWUgb2YgeSBiZXR3ZWVuIGN1cnNvciAxIGFuZCBjdXJzb3IgMlwiLCBDdXJzb3JEZXBlbmRlbmN5LkJvdGhDdXJzb3JzKSxcclxuICAgICAgICAgICAgbmV3IEN1cnNvckRpc3BsYXlJbmZvQ2xhc3MoXCJ5TWF4aW11bVwiLCBcInkgbWF4XCIsIFwiVGhlIG1heGltdW0gdmFsdWUgb2YgeSBiZXR3ZWVuIGN1cnNvciAxIGFuZCBjdXJzb3IgMlwiLCBDdXJzb3JEZXBlbmRlbmN5LkJvdGhDdXJzb3JzKSxcclxuICAgICAgICAgICAgbmV3IEN1cnNvckRpc3BsYXlJbmZvQ2xhc3MoXCJ5UHBcIiwgXCJ5IHBlYWsgdG8gcGVha1wiLCBcIlRoZSBwZWFrIHRvIHBlYWsgdmFsdWUgb2YgeSBiZXR3ZWVuIGN1cnNvciAxIGFuZCBjdXJzb3IgMlwiLCBDdXJzb3JEZXBlbmRlbmN5LkJvdGhDdXJzb3JzKVxyXG4gICAgICAgIF07XHJcbiAgICBcclxuICAgICAgICB0aGlzLnZpc2libGVJbmZvSWRzID0gWyd5MScsICd5MicsICdmMScsICdmMiddOyAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBjdXJzb3JJbmZvcygpOiBBcnJheTxDdXJzb3JJbmZvPntcclxuICAgICAgICByZXR1cm4gdGhpcy5fY3Vyc29ySW5mb3M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIG1ldGhvZCBpcyB1c2VkIGJ5IHRoZSBEeW5hbWljQ3Vyc29yU2lnbmFsVGVtcGxhdGUgdG8gZ2V0IGhvbGRcclxuICAgICAqIG9mIGFsbCBhdmFpbGFibGUgY3Vyc29yIGluZm9ybWF0aW9uIGF2YWlsYWJsZSB0byB0aGUgRkZUQ2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8Q3Vyc29yRGlzcGxheUluZm9DbGFzcz59XHJcbiAgICAgKiBAbWVtYmVyb2YgRkZUQ3Vyc29yU2lnbmFsRGVzY3JpcHRvclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0QWxsQ3Vyc29ySW5mbyAoKTogQXJyYXk8Q3Vyc29yRGlzcGxheUluZm9DbGFzcz4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJzb3JJbmZvSWRzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgZGVmYXVsdCBjdXJzb3IgaW5mb3MgZm9yIHRoaXMgY3Vyc29yIHNpZ25hbFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgRkZUQ3Vyc29yU2lnbmFsRGVzY3JpcHRvclxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgc2V0RGVmYXVsdEN1cnNvckluZm9zKCl7XHJcbiAgICAgICAgdGhpcy5fY3Vyc29ySW5mb0lkcy5mb3JFYWNoKChjdXJzb3JJbmZvSWQ6IEN1cnNvckRpc3BsYXlJbmZvQ2xhc3MpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5hZGRDdXJzb3JJbmZvKGN1cnNvckluZm9JZC5pZCwgY3Vyc29ySW5mb0lkLmRpc3BsYXlOYW1lLCBjdXJzb3JJbmZvSWQuZGVzY3JpcHRpb24sIGN1cnNvckluZm9JZC5jdXJzb3JEZXBlbmRlbmN5KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBuZXcgY3Vyc29yIGluZm8gdG8gdGhlIGN1cnNvciBpbmZvIGxpc3Qgd2l0aCB0aGUgZGVmYXVsdCBkaXNwbGF5bmFtZSBhbmQgZGVzY3JpcHRpb24gaWYgbm90IGdpdmVuKHVuZGVmaW5lZClcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkaXNwbGF5TmFtZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRlc2NyaXB0aW9uXHJcbiAgICAgKiBAcGFyYW0ge0N1cnNvckRlcGVuZGVuY3l9IGN1cnNvckRlcGVuZGVuY3lcclxuICAgICAqIEBtZW1iZXJvZiBGRlRDdXJzb3JTaWduYWxEZXNjcmlwdG9yXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBhZGRDdXJzb3JJbmZvKGlkOiBzdHJpbmcsIGRpc3BsYXlOYW1lOiBzdHJpbmcsIGRlc2NyaXB0aW9uOiBzdHJpbmcsIGN1cnNvckRlcGVuZGVuY3k6IEN1cnNvckRlcGVuZGVuY3kpe1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCB2aXNpYmxlID0gdGhpcy5nZXRWaXNpYmlsaXR5KGlkKTtcclxuXHJcbiAgICAgICAgdGhpcy5fY3Vyc29ySW5mb3MucHVzaChuZXcgQ3Vyc29ySW5mbyhpZCwgZGlzcGxheU5hbWUsIGRlc2NyaXB0aW9uLCB0aGlzLCB2aXNpYmxlLCBjdXJzb3JEZXBlbmRlbmN5KSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRyaWV2ZXMgdGhlIHZpc2liaWxpdHkgZm9yIGEgZ2l2ZW4gY3Vyc29yIGluZm8gaWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgRkZUQ3Vyc29yU2lnbmFsRGVzY3JpcHRvclxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0VmlzaWJpbGl0eSAoaWQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmlzaWJsZUluZm9JZHMuaW5jbHVkZXMoaWQpLnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcbn1cclxuIl19