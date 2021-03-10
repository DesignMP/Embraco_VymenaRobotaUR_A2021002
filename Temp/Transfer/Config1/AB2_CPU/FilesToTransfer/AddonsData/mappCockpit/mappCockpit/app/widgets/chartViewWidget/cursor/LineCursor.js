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
define(["require", "exports", "./CursorDefinitionBase"], function (require, exports, CursorDefinitionBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LineCursor = /** @class */ (function (_super) {
        __extends(LineCursor, _super);
        function LineCursor(cursorHandlerId, cursorIndex) {
            var _this = _super.call(this, cursorHandlerId, cursorIndex) || this;
            _this.lineId = cursorHandlerId + "lineCursor" + "_" + cursorIndex + "_line";
            return _this;
        }
        LineCursor.prototype.drawCursor = function (leadCursorPosition, cursorPositions) {
            if (leadCursorPosition != undefined && cursorPositions[0] != undefined) {
                this.cursorPositions = cursorPositions;
                this.leadCursorPosition = leadCursorPosition;
                this.drawLine(leadCursorPosition.position.x, leadCursorPosition.additionalInformation["hovered"], leadCursorPosition.additionalInformation["highlight"], leadCursorPosition.additionalInformation["selected"]);
            }
        };
        LineCursor.prototype.removeCursors = function () {
            var cursorElement = document.getElementById(this.lineId);
            if (cursorElement != undefined) {
                cursorElement.remove();
            }
        };
        LineCursor.prototype.drawLine = function (positionX, hovered, highlight, selected) {
            var currentColor = this.cursorColor;
            if (selected) {
                currentColor = this.selectedColor;
            }
            if (hovered) {
                currentColor = this.hoverColor;
            }
            var svgHtml = "<svg style= \"position: absolute\" id =\"" + this.lineId + "\" height=\"100%\" width=\"100%\">\n                <line x1=\"" + positionX + "\" y1=\"0\" x2=\"" + positionX + "\" y2=\"100%\" style=\"stroke:" + currentColor + ";stroke-width:2\" />\n            </svg>";
            var cursorHandler = document.getElementById(this.cursorHandlerContainerId);
            if (cursorHandler != undefined) {
                cursorHandler.innerHTML += svgHtml;
            }
        };
        LineCursor.prototype.getClosestCursorPositionToPoint = function (point) {
            var distance = undefined;
            var currentClosestCursorPosition;
            if (this.leadCursorPosition != undefined) {
                distance = this.calculateHorizontalDistance(this.leadCursorPosition.position, point);
                currentClosestCursorPosition = this.leadCursorPosition;
                currentClosestCursorPosition.additionalInformation["distance"] = distance;
                return currentClosestCursorPosition;
            }
        };
        /**
         * calculate the horizontal distance between two points
         *
         * @private
         * @param {IPoint} point1
         * @param {IPoint} point2
         * @returns {number}
         * @memberof LineCursor
         */
        LineCursor.prototype.calculateHorizontalDistance = function (point1, point2) {
            return (Math.sqrt(Math.pow(point2.x - point1.x, 2)));
        };
        return LineCursor;
    }(CursorDefinitionBase_1.CursorDefinitionBase));
    exports.LineCursor = LineCursor;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGluZUN1cnNvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jaGFydFZpZXdXaWRnZXQvY3Vyc29yL0xpbmVDdXJzb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUdBO1FBQWdDLDhCQUFvQjtRQUdoRCxvQkFBWSxlQUF1QixFQUFFLFdBQW1CO1lBQXhELFlBQ0ksa0JBQU0sZUFBZSxFQUFFLFdBQVcsQ0FBQyxTQUV0QztZQURHLEtBQUksQ0FBQyxNQUFNLEdBQUcsZUFBZSxHQUFHLFlBQVksR0FBRyxHQUFHLEdBQUcsV0FBVyxHQUFHLE9BQU8sQ0FBQzs7UUFDL0UsQ0FBQztRQUVNLCtCQUFVLEdBQWpCLFVBQWtCLGtCQUFrQyxFQUFFLGVBQWlDO1lBQ25GLElBQUksa0JBQWtCLElBQUksU0FBUyxJQUFJLGVBQWUsQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLEVBQUU7Z0JBQ3BFLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO2dCQUN2QyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUM7Z0JBQzdDLElBQUksQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxrQkFBa0IsQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsRUFBRSxrQkFBa0IsQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsRUFBQyxrQkFBa0IsQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsQ0FBRyxDQUFDO2FBQ25OO1FBQ0wsQ0FBQztRQUVNLGtDQUFhLEdBQXBCO1lBQ0ksSUFBSSxhQUFhLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDekQsSUFBSSxhQUFhLElBQUksU0FBUyxFQUFFO2dCQUM1QixhQUFhLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDMUI7UUFDTCxDQUFDO1FBRU8sNkJBQVEsR0FBaEIsVUFBaUIsU0FBaUIsRUFBRSxPQUFnQixFQUFFLFNBQWtCLEVBQUUsUUFBaUI7WUFFdkYsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUNwQyxJQUFJLFFBQVEsRUFBRTtnQkFDVixZQUFZLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQzthQUNyQztZQUNELElBQUcsT0FBTyxFQUFFO2dCQUNSLFlBQVksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO2FBQ2xDO1lBR0QsSUFBSSxPQUFPLEdBQUcsMkNBQXdDLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxpRUFDcEQsR0FBRyxTQUFTLEdBQUcsbUJBQWUsR0FBRyxTQUFTLEdBQUcsZ0NBQTRCLEdBQUcsWUFBWSxHQUFHLDBDQUNuRyxDQUFDO1lBQ1osSUFBSSxhQUFhLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUMzRSxJQUFHLGFBQWEsSUFBSSxTQUFTLEVBQUM7Z0JBQzFCLGFBQWEsQ0FBQyxTQUFTLElBQUksT0FBTyxDQUFDO2FBQ3RDO1FBQ0wsQ0FBQztRQUVNLG9EQUErQixHQUF0QyxVQUF1QyxLQUFhO1lBQ2hELElBQUksUUFBUSxHQUF1QixTQUFTLENBQUM7WUFDN0MsSUFBSSw0QkFBd0QsQ0FBQztZQUM3RCxJQUFHLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxTQUFTLEVBQUM7Z0JBQ3BDLFFBQVEsR0FBRyxJQUFJLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDckYsNEJBQTRCLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDO2dCQUN2RCw0QkFBNkIsQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsR0FBRyxRQUFRLENBQUM7Z0JBQzNFLE9BQU8sNEJBQTRCLENBQUM7YUFDdkM7UUFDTCxDQUFDO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDSyxnREFBMkIsR0FBbkMsVUFBb0MsTUFBYyxFQUFFLE1BQWM7WUFDOUQsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pELENBQUM7UUFDTCxpQkFBQztJQUFELENBQUMsQUFsRUQsQ0FBZ0MsMkNBQW9CLEdBa0VuRDtJQWxFWSxnQ0FBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElQb2ludCB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY29tbW9uL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ3Vyc29yUG9zaXRpb24gfSBmcm9tIFwiLi9DdXJzb3JQb3NpdGlvbkluZm9cIjtcclxuaW1wb3J0IHsgQ3Vyc29yRGVmaW5pdGlvbkJhc2UgfSBmcm9tIFwiLi9DdXJzb3JEZWZpbml0aW9uQmFzZVwiO1xyXG5leHBvcnQgY2xhc3MgTGluZUN1cnNvciBleHRlbmRzIEN1cnNvckRlZmluaXRpb25CYXNlIHtcclxuICAgIGxpbmVJZDogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGN1cnNvckhhbmRsZXJJZDogc3RyaW5nLCBjdXJzb3JJbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgc3VwZXIoY3Vyc29ySGFuZGxlcklkLCBjdXJzb3JJbmRleCk7XHJcbiAgICAgICAgdGhpcy5saW5lSWQgPSBjdXJzb3JIYW5kbGVySWQgKyBcImxpbmVDdXJzb3JcIiArIFwiX1wiICsgY3Vyc29ySW5kZXggKyBcIl9saW5lXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRyYXdDdXJzb3IobGVhZEN1cnNvclBvc2l0aW9uOiBDdXJzb3JQb3NpdGlvbiwgY3Vyc29yUG9zaXRpb25zOiBDdXJzb3JQb3NpdGlvbltdKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGxlYWRDdXJzb3JQb3NpdGlvbiAhPSB1bmRlZmluZWQgJiYgY3Vyc29yUG9zaXRpb25zWzBdICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnNvclBvc2l0aW9ucyA9IGN1cnNvclBvc2l0aW9ucztcclxuICAgICAgICAgICAgdGhpcy5sZWFkQ3Vyc29yUG9zaXRpb24gPSBsZWFkQ3Vyc29yUG9zaXRpb247XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd0xpbmUobGVhZEN1cnNvclBvc2l0aW9uLnBvc2l0aW9uLngsIGxlYWRDdXJzb3JQb3NpdGlvbi5hZGRpdGlvbmFsSW5mb3JtYXRpb25bXCJob3ZlcmVkXCJdLCBsZWFkQ3Vyc29yUG9zaXRpb24uYWRkaXRpb25hbEluZm9ybWF0aW9uW1wiaGlnaGxpZ2h0XCJdLGxlYWRDdXJzb3JQb3NpdGlvbi5hZGRpdGlvbmFsSW5mb3JtYXRpb25bXCJzZWxlY3RlZFwiXSwgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZUN1cnNvcnMoKSB7XHJcbiAgICAgICAgbGV0IGN1cnNvckVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmxpbmVJZCk7XHJcbiAgICAgICAgaWYgKGN1cnNvckVsZW1lbnQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGN1cnNvckVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIGRyYXdMaW5lKHBvc2l0aW9uWDogbnVtYmVyLCBob3ZlcmVkOiBib29sZWFuLCBoaWdobGlnaHQ6IGJvb2xlYW4sIHNlbGVjdGVkOiBib29sZWFuKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGN1cnJlbnRDb2xvciA9IHRoaXMuY3Vyc29yQ29sb3I7XHJcbiAgICAgICAgaWYgKHNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRDb2xvciA9IHRoaXMuc2VsZWN0ZWRDb2xvcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaG92ZXJlZCkge1xyXG4gICAgICAgICAgICBjdXJyZW50Q29sb3IgPSB0aGlzLmhvdmVyQ29sb3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBzdmdIdG1sID0gYDxzdmcgc3R5bGU9IFwicG9zaXRpb246IGFic29sdXRlXCIgaWQgPVwiYCArIHRoaXMubGluZUlkICsgYFwiIGhlaWdodD1cIjEwMCVcIiB3aWR0aD1cIjEwMCVcIj5cclxuICAgICAgICAgICAgICAgIDxsaW5lIHgxPVwiYCArIHBvc2l0aW9uWCArIGBcIiB5MT1cIjBcIiB4Mj1cImAgKyBwb3NpdGlvblggKyBgXCIgeTI9XCIxMDAlXCIgc3R5bGU9XCJzdHJva2U6YCArIGN1cnJlbnRDb2xvciArIGA7c3Ryb2tlLXdpZHRoOjJcIiAvPlxyXG4gICAgICAgICAgICA8L3N2Zz5gO1xyXG4gICAgICAgIGxldCBjdXJzb3JIYW5kbGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5jdXJzb3JIYW5kbGVyQ29udGFpbmVySWQpO1xyXG4gICAgICAgIGlmKGN1cnNvckhhbmRsZXIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgY3Vyc29ySGFuZGxlci5pbm5lckhUTUwgKz0gc3ZnSHRtbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBnZXRDbG9zZXN0Q3Vyc29yUG9zaXRpb25Ub1BvaW50KHBvaW50OiBJUG9pbnQpOiBDdXJzb3JQb3NpdGlvbiB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgbGV0IGRpc3RhbmNlOiBudW1iZXIgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRDbG9zZXN0Q3Vyc29yUG9zaXRpb246IEN1cnNvclBvc2l0aW9uIHwgdW5kZWZpbmVkO1xyXG4gICAgICAgIGlmKHRoaXMubGVhZEN1cnNvclBvc2l0aW9uICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGRpc3RhbmNlID0gdGhpcy5jYWxjdWxhdGVIb3Jpem9udGFsRGlzdGFuY2UodGhpcy5sZWFkQ3Vyc29yUG9zaXRpb24ucG9zaXRpb24sIHBvaW50KTtcclxuICAgICAgICAgICAgY3VycmVudENsb3Nlc3RDdXJzb3JQb3NpdGlvbiA9IHRoaXMubGVhZEN1cnNvclBvc2l0aW9uO1xyXG4gICAgICAgICAgICBjdXJyZW50Q2xvc2VzdEN1cnNvclBvc2l0aW9uIS5hZGRpdGlvbmFsSW5mb3JtYXRpb25bXCJkaXN0YW5jZVwiXSA9IGRpc3RhbmNlO1xyXG4gICAgICAgICAgICByZXR1cm4gY3VycmVudENsb3Nlc3RDdXJzb3JQb3NpdGlvbjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogY2FsY3VsYXRlIHRoZSBob3Jpem9udGFsIGRpc3RhbmNlIGJldHdlZW4gdHdvIHBvaW50c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0lQb2ludH0gcG9pbnQxXHJcbiAgICAgKiBAcGFyYW0ge0lQb2ludH0gcG9pbnQyXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIExpbmVDdXJzb3JcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVIb3Jpem9udGFsRGlzdGFuY2UocG9pbnQxOiBJUG9pbnQsIHBvaW50MjogSVBvaW50KTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gKE1hdGguc3FydChNYXRoLnBvdyhwb2ludDIueCAtIHBvaW50MS54LCAyKSkpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==