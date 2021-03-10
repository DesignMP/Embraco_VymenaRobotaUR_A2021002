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
    var XYCursorSignalDescriptor = /** @class */ (function (_super) {
        __extends(XYCursorSignalDescriptor, _super);
        /**
         * Creates an instance of XYCursorSignalDescriptor
         * @memberof XYCursorSignalDescriptor
         */
        function XYCursorSignalDescriptor() {
            var _this = _super.call(this) || this;
            _this.initializeCursorSignalInfos();
            _this.setDefaultCursorInfos();
            return _this;
        }
        XYCursorSignalDescriptor.prototype.initializeCursorSignalInfos = function () {
            this._cursorInfoIds = [
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("y1", "y cursor 1", "The y position of cursor 1", cursorInfo_1.CursorDependency.Cursor1),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("x1", "x cursor 1", "The x position of cursor 1", cursorInfo_1.CursorDependency.Cursor1),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("t1", "t cursor 1", "The time of cursor 1", cursorInfo_1.CursorDependency.Cursor1),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("y2", "y cursor 2", "The y position of cursor 2", cursorInfo_1.CursorDependency.Cursor2),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("x2", "x cursor 2", "The x position of cursor 2", cursorInfo_1.CursorDependency.Cursor2),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("t2", "t cursor 2", "The time of cursor 2", cursorInfo_1.CursorDependency.Cursor2),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("yDiff", "y diff (y2-y1)", "The y difference between cursor 1 and cursor 2", cursorInfo_1.CursorDependency.BothCursors),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("xDiff", "x diff (x2-x1)", "The x difference between cursor 1 and cursor 2", cursorInfo_1.CursorDependency.BothCursors),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("tDiff", "t diff (t2-t1)", "The time difference between cursor 1 and cursor 2", cursorInfo_1.CursorDependency.BothCursors),
                new dynamicCursorSignalTemplate_1.CursorDisplayInfoClass("eucDist", "Euclidean Distance", "The euclidean distance between two points", cursorInfo_1.CursorDependency.BothCursors)
            ];
            this.visibleInfoIds = ['y1', 'y2', 'x1', 'x2'];
        };
        Object.defineProperty(XYCursorSignalDescriptor.prototype, "cursorInfos", {
            get: function () {
                return this._cursorInfos;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * This method is used by the DynamicCursorSignalTemplate to get hold
         * of all available cursor information available to the XYChart
         *
         * @returns {Array<CursorDisplayInfoClass>}
         * @memberof XYCursorSignalDescriptor
         */
        XYCursorSignalDescriptor.prototype.getAllCursorInfo = function () {
            return this._cursorInfoIds;
        };
        /**
         * Sets the default cursor infos for this cursor signal
         *
         * @private
         * @memberof XYCursorSignalDescriptor
         */
        XYCursorSignalDescriptor.prototype.setDefaultCursorInfos = function () {
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
         * @memberof XYCursorSignalDescriptor
         */
        XYCursorSignalDescriptor.prototype.addCursorInfo = function (id, displayName, description, cursorDependency) {
            var visible = this.getVisibility(id);
            this._cursorInfos.push(new cursorInfo_1.CursorInfo(id, displayName, description, this, visible, cursorDependency));
        };
        /**
         * Retrieves the visibility for a given cursor info id
         *
         * @protected
         * @param {string} id
         * @returns {string}
         * @memberof XYCursorSignalDescriptor
         */
        XYCursorSignalDescriptor.prototype.getVisibility = function (id) {
            return this.visibleInfoIds.includes(id).toString();
        };
        return XYCursorSignalDescriptor;
    }(cursorSignalDescriptor_1.CursorSignalDescriptor));
    exports.XYCursorSignalDescriptor = XYCursorSignalDescriptor;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieHlDdXJzb3JTaWduYWxEZXNjcmlwdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2N1cnNvckluZm9XaWRnZXQvbW9kZWwveHlDdXJzb3JTaWduYWxEZXNjcmlwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFJQTtRQUE4Qyw0Q0FBc0I7UUFFaEU7OztXQUdHO1FBQ0g7WUFBQSxZQUNJLGlCQUFPLFNBS1Y7WUFIRyxLQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztZQUVuQyxLQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQzs7UUFDakMsQ0FBQztRQUVELDhEQUEyQixHQUEzQjtZQUNJLElBQUksQ0FBQyxjQUFjLEdBQUc7Z0JBQ2xCLElBQUksb0RBQXNCLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRSw0QkFBNEIsRUFBRSw2QkFBZ0IsQ0FBQyxPQUFPLENBQUM7Z0JBQ3RHLElBQUksb0RBQXNCLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRSw0QkFBNEIsRUFBRSw2QkFBZ0IsQ0FBQyxPQUFPLENBQUM7Z0JBQ3RHLElBQUksb0RBQXNCLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRSxzQkFBc0IsRUFBRSw2QkFBZ0IsQ0FBQyxPQUFPLENBQUM7Z0JBQ2hHLElBQUksb0RBQXNCLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRSw0QkFBNEIsRUFBRSw2QkFBZ0IsQ0FBQyxPQUFPLENBQUM7Z0JBQ3RHLElBQUksb0RBQXNCLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRSw0QkFBNEIsRUFBRSw2QkFBZ0IsQ0FBQyxPQUFPLENBQUM7Z0JBQ3RHLElBQUksb0RBQXNCLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRSxzQkFBc0IsRUFBRSw2QkFBZ0IsQ0FBQyxPQUFPLENBQUM7Z0JBQ2hHLElBQUksb0RBQXNCLENBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGdEQUFnRCxFQUFFLDZCQUFnQixDQUFDLFdBQVcsQ0FBQztnQkFDckksSUFBSSxvREFBc0IsQ0FBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsZ0RBQWdELEVBQUUsNkJBQWdCLENBQUMsV0FBVyxDQUFDO2dCQUNySSxJQUFJLG9EQUFzQixDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxtREFBbUQsRUFBRSw2QkFBZ0IsQ0FBQyxXQUFXLENBQUM7Z0JBQ3hJLElBQUksb0RBQXNCLENBQUMsU0FBUyxFQUFFLG9CQUFvQixFQUFFLDJDQUEyQyxFQUFFLDZCQUFnQixDQUFDLFdBQVcsQ0FBQzthQUN6SSxDQUFDO1lBRUYsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25ELENBQUM7UUFFRCxzQkFBSSxpREFBVztpQkFBZjtnQkFDSSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDN0IsQ0FBQzs7O1dBQUE7UUFFRDs7Ozs7O1dBTUc7UUFDSSxtREFBZ0IsR0FBdkI7WUFDSSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDL0IsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ08sd0RBQXFCLEdBQS9CO1lBQUEsaUJBSUM7WUFIRyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxVQUFDLFlBQW9DO2dCQUM3RCxLQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsWUFBWSxDQUFDLFdBQVcsRUFBRSxZQUFZLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQzNILENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUVEOzs7Ozs7Ozs7V0FTRztRQUNPLGdEQUFhLEdBQXZCLFVBQXdCLEVBQVUsRUFBRSxXQUFtQixFQUFFLFdBQW1CLEVBQUUsZ0JBQWtDO1lBRTVHLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFckMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSx1QkFBVSxDQUFDLEVBQUUsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1FBQzFHLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ08sZ0RBQWEsR0FBdkIsVUFBeUIsRUFBVTtZQUMvQixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3ZELENBQUM7UUFDTCwrQkFBQztJQUFELENBQUMsQUF0RkQsQ0FBOEMsK0NBQXNCLEdBc0ZuRTtJQXRGWSw0REFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDdXJzb3JJbmZvLCBDdXJzb3JEZXBlbmRlbmN5IH0gZnJvbSBcIi4vY3Vyc29ySW5mb1wiO1xyXG5pbXBvcnQgeyBDdXJzb3JEaXNwbGF5SW5mb0NsYXNzIH0gZnJvbSBcIi4vZHluYW1pY0N1cnNvclNpZ25hbFRlbXBsYXRlXCI7XHJcbmltcG9ydCB7IEN1cnNvclNpZ25hbERlc2NyaXB0b3IgfSBmcm9tIFwiLi9jdXJzb3JTaWduYWxEZXNjcmlwdG9yXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgWFlDdXJzb3JTaWduYWxEZXNjcmlwdG9yIGV4dGVuZHMgQ3Vyc29yU2lnbmFsRGVzY3JpcHRvcntcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFhZQ3Vyc29yU2lnbmFsRGVzY3JpcHRvclxyXG4gICAgICogQG1lbWJlcm9mIFhZQ3Vyc29yU2lnbmFsRGVzY3JpcHRvclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZUN1cnNvclNpZ25hbEluZm9zKCk7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0RGVmYXVsdEN1cnNvckluZm9zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZUN1cnNvclNpZ25hbEluZm9zKCkge1xyXG4gICAgICAgIHRoaXMuX2N1cnNvckluZm9JZHMgPSBbXHJcbiAgICAgICAgICAgIG5ldyBDdXJzb3JEaXNwbGF5SW5mb0NsYXNzKFwieTFcIiwgXCJ5IGN1cnNvciAxXCIsIFwiVGhlIHkgcG9zaXRpb24gb2YgY3Vyc29yIDFcIiwgQ3Vyc29yRGVwZW5kZW5jeS5DdXJzb3IxKSxcclxuICAgICAgICAgICAgbmV3IEN1cnNvckRpc3BsYXlJbmZvQ2xhc3MoXCJ4MVwiLCBcInggY3Vyc29yIDFcIiwgXCJUaGUgeCBwb3NpdGlvbiBvZiBjdXJzb3IgMVwiLCBDdXJzb3JEZXBlbmRlbmN5LkN1cnNvcjEpLFxyXG4gICAgICAgICAgICBuZXcgQ3Vyc29yRGlzcGxheUluZm9DbGFzcyhcInQxXCIsIFwidCBjdXJzb3IgMVwiLCBcIlRoZSB0aW1lIG9mIGN1cnNvciAxXCIsIEN1cnNvckRlcGVuZGVuY3kuQ3Vyc29yMSksXHJcbiAgICAgICAgICAgIG5ldyBDdXJzb3JEaXNwbGF5SW5mb0NsYXNzKFwieTJcIiwgXCJ5IGN1cnNvciAyXCIsIFwiVGhlIHkgcG9zaXRpb24gb2YgY3Vyc29yIDJcIiwgQ3Vyc29yRGVwZW5kZW5jeS5DdXJzb3IyKSxcclxuICAgICAgICAgICAgbmV3IEN1cnNvckRpc3BsYXlJbmZvQ2xhc3MoXCJ4MlwiLCBcInggY3Vyc29yIDJcIiwgXCJUaGUgeCBwb3NpdGlvbiBvZiBjdXJzb3IgMlwiLCBDdXJzb3JEZXBlbmRlbmN5LkN1cnNvcjIpLFxyXG4gICAgICAgICAgICBuZXcgQ3Vyc29yRGlzcGxheUluZm9DbGFzcyhcInQyXCIsIFwidCBjdXJzb3IgMlwiLCBcIlRoZSB0aW1lIG9mIGN1cnNvciAyXCIsIEN1cnNvckRlcGVuZGVuY3kuQ3Vyc29yMiksXHJcbiAgICAgICAgICAgIG5ldyBDdXJzb3JEaXNwbGF5SW5mb0NsYXNzKFwieURpZmZcIiwgXCJ5IGRpZmYgKHkyLXkxKVwiLCBcIlRoZSB5IGRpZmZlcmVuY2UgYmV0d2VlbiBjdXJzb3IgMSBhbmQgY3Vyc29yIDJcIiwgQ3Vyc29yRGVwZW5kZW5jeS5Cb3RoQ3Vyc29ycyksXHJcbiAgICAgICAgICAgIG5ldyBDdXJzb3JEaXNwbGF5SW5mb0NsYXNzKFwieERpZmZcIiwgXCJ4IGRpZmYgKHgyLXgxKVwiLCBcIlRoZSB4IGRpZmZlcmVuY2UgYmV0d2VlbiBjdXJzb3IgMSBhbmQgY3Vyc29yIDJcIiwgQ3Vyc29yRGVwZW5kZW5jeS5Cb3RoQ3Vyc29ycyksXHJcbiAgICAgICAgICAgIG5ldyBDdXJzb3JEaXNwbGF5SW5mb0NsYXNzKFwidERpZmZcIiwgXCJ0IGRpZmYgKHQyLXQxKVwiLCBcIlRoZSB0aW1lIGRpZmZlcmVuY2UgYmV0d2VlbiBjdXJzb3IgMSBhbmQgY3Vyc29yIDJcIiwgQ3Vyc29yRGVwZW5kZW5jeS5Cb3RoQ3Vyc29ycyksXHJcbiAgICAgICAgICAgIG5ldyBDdXJzb3JEaXNwbGF5SW5mb0NsYXNzKFwiZXVjRGlzdFwiLCBcIkV1Y2xpZGVhbiBEaXN0YW5jZVwiLCBcIlRoZSBldWNsaWRlYW4gZGlzdGFuY2UgYmV0d2VlbiB0d28gcG9pbnRzXCIsIEN1cnNvckRlcGVuZGVuY3kuQm90aEN1cnNvcnMpXHJcbiAgICAgICAgXTtcclxuICAgIFxyXG4gICAgICAgIHRoaXMudmlzaWJsZUluZm9JZHMgPSBbJ3kxJywgJ3kyJywgJ3gxJywgJ3gyJ107XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBjdXJzb3JJbmZvcygpOiBBcnJheTxDdXJzb3JJbmZvPntcclxuICAgICAgICByZXR1cm4gdGhpcy5fY3Vyc29ySW5mb3M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIG1ldGhvZCBpcyB1c2VkIGJ5IHRoZSBEeW5hbWljQ3Vyc29yU2lnbmFsVGVtcGxhdGUgdG8gZ2V0IGhvbGRcclxuICAgICAqIG9mIGFsbCBhdmFpbGFibGUgY3Vyc29yIGluZm9ybWF0aW9uIGF2YWlsYWJsZSB0byB0aGUgWFlDaGFydFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxDdXJzb3JEaXNwbGF5SW5mb0NsYXNzPn1cclxuICAgICAqIEBtZW1iZXJvZiBYWUN1cnNvclNpZ25hbERlc2NyaXB0b3JcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEFsbEN1cnNvckluZm8gKCk6IEFycmF5PEN1cnNvckRpc3BsYXlJbmZvQ2xhc3M+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY3Vyc29ySW5mb0lkcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGRlZmF1bHQgY3Vyc29yIGluZm9zIGZvciB0aGlzIGN1cnNvciBzaWduYWxcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFhZQ3Vyc29yU2lnbmFsRGVzY3JpcHRvclxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgc2V0RGVmYXVsdEN1cnNvckluZm9zKCl7ICAgICAgICBcclxuICAgICAgICB0aGlzLl9jdXJzb3JJbmZvSWRzLmZvckVhY2goKGN1cnNvckluZm9JZDogQ3Vyc29yRGlzcGxheUluZm9DbGFzcykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmFkZEN1cnNvckluZm8oY3Vyc29ySW5mb0lkLmlkLCBjdXJzb3JJbmZvSWQuZGlzcGxheU5hbWUsIGN1cnNvckluZm9JZC5kZXNjcmlwdGlvbiwgY3Vyc29ySW5mb0lkLmN1cnNvckRlcGVuZGVuY3kpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIG5ldyBjdXJzb3IgaW5mbyB0byB0aGUgY3Vyc29yIGluZm8gbGlzdCB3aXRoIHRoZSBkZWZhdWx0IGRpc3BsYXluYW1lIGFuZCBkZXNjcmlwdGlvbiBpZiBub3QgZ2l2ZW4odW5kZWZpbmVkKVxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRpc3BsYXlOYW1lXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGVzY3JpcHRpb25cclxuICAgICAqIEBwYXJhbSB7Q3Vyc29yRGVwZW5kZW5jeX0gY3Vyc29yRGVwZW5kZW5jeVxyXG4gICAgICogQG1lbWJlcm9mIFhZQ3Vyc29yU2lnbmFsRGVzY3JpcHRvclxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgYWRkQ3Vyc29ySW5mbyhpZDogc3RyaW5nLCBkaXNwbGF5TmFtZTogc3RyaW5nLCBkZXNjcmlwdGlvbjogc3RyaW5nLCBjdXJzb3JEZXBlbmRlbmN5OiBDdXJzb3JEZXBlbmRlbmN5KXtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgdmlzaWJsZSA9IHRoaXMuZ2V0VmlzaWJpbGl0eShpZCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2N1cnNvckluZm9zLnB1c2gobmV3IEN1cnNvckluZm8oaWQsIGRpc3BsYXlOYW1lLCBkZXNjcmlwdGlvbiwgdGhpcywgdmlzaWJsZSwgY3Vyc29yRGVwZW5kZW5jeSkpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJldHJpZXZlcyB0aGUgdmlzaWJpbGl0eSBmb3IgYSBnaXZlbiBjdXJzb3IgaW5mbyBpZFxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBYWUN1cnNvclNpZ25hbERlc2NyaXB0b3JcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldFZpc2liaWxpdHkgKGlkOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZpc2libGVJbmZvSWRzLmluY2x1ZGVzKGlkKS50b1N0cmluZygpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==