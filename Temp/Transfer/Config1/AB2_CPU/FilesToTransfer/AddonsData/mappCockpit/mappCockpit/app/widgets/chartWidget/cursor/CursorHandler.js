define(["require", "exports", "./Cursor"], function (require, exports, Cursor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CursorHandler = /** @class */ (function () {
        /**
         * initializes the main cursor handler
         * @param {string} parentContainerId
         * @param {Rectangle} [chartArea]
         * @memberof MainCursorHandler
         */
        function CursorHandler(parentContainerId, chartArea) {
            this._enableLineCursor = false;
            this._enableCrosshairCursor = false;
            this.parentContainerId = parentContainerId;
            this.containerId = parentContainerId + "_cursorHandler";
            this.appendContainer(chartArea);
            //initialize Cursors
            this.cursors = new Array();
            this.cursors[0] = new Cursor_1.Cursor(this.containerId, 0);
            this.cursors[1] = new Cursor_1.Cursor(this.containerId, 1);
            //set cursor colors
            this.cursors[0].setCursorColor("var(--main-cursor1-color)", "var(--main-cursor1-hover-color)", "var(--main-cursor1-active-color)");
            this.cursors[1].setCursorColor("var(--main-cursor2-color)", "var(--main-cursor2-hover-color)", "var(--main-cursor2-active-color)");
        }
        /**
         *draw the cursor of the given cursor index onto the given positions
         *
         * @param {CursorPosition} leadCursorPosition
         * @param {CursorPosition[]} cursorPositions
         * @param {number} cursorIndex
         * @memberof MainCursorHandler
         */
        CursorHandler.prototype.drawCursor = function (leadCursorPosition, cursorPositions, cursorIndex) {
            this.cursors[cursorIndex].drawCursor(leadCursorPosition, cursorPositions);
        };
        /**
         *return the closest cursors position and additional data to a given point
         *
         * @param {IPoint} point
         * @returns {CursorPosition}
         * @memberof MainCursorHandler
         */
        CursorHandler.prototype.getClosestCursorPositionToPoint = function (point, selectedCursorIndex) {
            var distance = undefined;
            var currentClosestCursorPosition;
            for (var _i = 0, _a = this.cursors; _i < _a.length; _i++) {
                var cursor = _a[_i];
                var closestCursorPosition = cursor.getClosestCursorPositionToPoint(point);
                if (closestCursorPosition != undefined) {
                    var cursorsClosestDistance = closestCursorPosition.additionalInformation["distance"];
                    if (distance == undefined || distance > cursorsClosestDistance) {
                        distance = cursorsClosestDistance;
                        currentClosestCursorPosition = closestCursorPosition;
                    }
                    else if (distance == cursorsClosestDistance) {
                        if (cursor.cursorIndex == selectedCursorIndex) {
                            distance = cursorsClosestDistance;
                            currentClosestCursorPosition = closestCursorPosition;
                        }
                    }
                }
            }
            return currentClosestCursorPosition;
        };
        /**
         * sets up the cursor handler html code
         *
         * @private
         * @param {Rectangle} [chartArea]
         * @memberof MainCursorHandler
         */
        CursorHandler.prototype.appendContainer = function (chartArea) {
            var cursorHandlerDiv = document.createElement("div");
            cursorHandlerDiv.id = this.containerId;
            $("#" + this.parentContainerId).append(cursorHandlerDiv);
            this.updateChartArea(chartArea);
        };
        /**
         *updates the cursor handlers html position
         *
         * @param {Rectangle} [chartArea]
         * @memberof MainCursorHandler
         */
        CursorHandler.prototype.updateChartArea = function (chartArea) {
            var cursorHandlerDiv = document.getElementById(this.containerId);
            if (cursorHandlerDiv != undefined) {
                cursorHandlerDiv.setAttribute("style", "position: absolute; top: " + chartArea.y + "px;left: " + chartArea.x + "px;width: " + chartArea.width + "px;height: " + chartArea.height + "px;");
            }
        };
        Object.defineProperty(CursorHandler.prototype, "enableLineCursor", {
            get: function () {
                return this._enableLineCursor;
            },
            set: function (enable) {
                this._enableLineCursor = enable;
                for (var i = 0; i < this.cursors.length; i++) {
                    this.cursors[i].enableLineCursor = enable;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CursorHandler.prototype, "enableCrosshairCursor", {
            get: function () {
                return this._enableCrosshairCursor;
            },
            set: function (enable) {
                this._enableCrosshairCursor = enable;
                for (var i = 0; i < this.cursors.length; i++) {
                    this.cursors[i].enableCrossHairCursor = enable;
                }
            },
            enumerable: true,
            configurable: true
        });
        return CursorHandler;
    }());
    exports.CursorHandler = CursorHandler;
    ;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3Vyc29ySGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jaGFydFdpZGdldC9jdXJzb3IvQ3Vyc29ySGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFLQTtRQVVJOzs7OztXQUtHO1FBQ0gsdUJBQVksaUJBQXlCLEVBQUUsU0FBcUI7WUFacEQsc0JBQWlCLEdBQWEsS0FBSyxDQUFDO1lBQ3BDLDJCQUFzQixHQUFZLEtBQUssQ0FBQztZQVk1QyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUM7WUFDM0MsSUFBSSxDQUFDLFdBQVcsR0FBRyxpQkFBaUIsR0FBRyxnQkFBZ0IsQ0FBQztZQUN4RCxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVUsQ0FBQyxDQUFDO1lBRWpDLG9CQUFvQjtZQUNwQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksS0FBSyxFQUFVLENBQUM7WUFDbkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLGVBQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2xELElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxlQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUVsRCxtQkFBbUI7WUFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsMkJBQTJCLEVBQUMsaUNBQWlDLEVBQUMsa0NBQWtDLENBQUMsQ0FBQztZQUNqSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQywyQkFBMkIsRUFBQyxpQ0FBaUMsRUFBQyxrQ0FBa0MsQ0FBQyxDQUFDO1FBQ3JJLENBQUM7UUFHRDs7Ozs7OztXQU9HO1FBQ0ksa0NBQVUsR0FBakIsVUFBa0Isa0JBQWtDLEVBQUUs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LENBQUMsc0JBQXNCLEdBQUcsTUFBTSxDQUFDO2dCQUNyQyxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7b0JBQ3hDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMscUJBQXFCLEdBQUcsTUFBTSxDQUFDO2lCQUNsRDtZQUNMLENBQUM7OztXQUFBO1FBS0wsb0JBQUM7SUFBRCxDQUFDLEFBM0hELElBMkhDO0lBM0hZLHNDQUFhO0lBMkh6QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVBvaW50IH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvaW50ZXJmYWNlcy9wb2ludEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDdXJzb3IgfSBmcm9tIFwiLi9DdXJzb3JcIjtcclxuaW1wb3J0IHsgUmVjdGFuZ2xlIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvdHlwZXMvUmVjdGFuZ2xlXCI7XHJcbmltcG9ydCB7IEN1cnNvclBvc2l0aW9uIH0gZnJvbSBcIi4vQ3Vyc29yUG9zaXRpb25JbmZvXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ3Vyc29ySGFuZGxlciB7IFxyXG4gICAgcHJpdmF0ZSBwYXJlbnRDb250YWluZXJJZCA6IHN0cmluZztcclxuICAgIHByaXZhdGUgY29udGFpbmVySWQ6IHN0cmluZ1xyXG5cclxuICAgIHByaXZhdGUgX2VuYWJsZUxpbmVDdXJzb3IgOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9lbmFibGVDcm9zc2hhaXJDdXJzb3I6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgIFxyXG4gICAgcHJpdmF0ZSBjdXJzb3JzIDogQ3Vyc29yW107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBpbml0aWFsaXplcyB0aGUgbWFpbiBjdXJzb3IgaGFuZGxlclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhcmVudENvbnRhaW5lcklkXHJcbiAgICAgKiBAcGFyYW0ge1JlY3RhbmdsZX0gW2NoYXJ0QXJlYV1cclxuICAgICAqIEBtZW1iZXJvZiBNYWluQ3Vyc29ySGFuZGxlclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRDb250YWluZXJJZDogc3RyaW5nLCBjaGFydEFyZWE/OiBSZWN0YW5nbGUpIHtcclxuICAgICAgICB0aGlzLnBhcmVudENvbnRhaW5lcklkID0gcGFyZW50Q29udGFpbmVySWQ7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXJJZCA9IHBhcmVudENvbnRhaW5lcklkICsgXCJfY3Vyc29ySGFuZGxlclwiO1xyXG4gICAgICAgIHRoaXMuYXBwZW5kQ29udGFpbmVyKGNoYXJ0QXJlYSEpO1xyXG4gICAgXHJcbiAgICAgICAgLy9pbml0aWFsaXplIEN1cnNvcnNcclxuICAgICAgICB0aGlzLmN1cnNvcnMgPSBuZXcgQXJyYXk8Q3Vyc29yPigpO1xyXG4gICAgICAgIHRoaXMuY3Vyc29yc1swXSA9IG5ldyBDdXJzb3IodGhpcy5jb250YWluZXJJZCwgMCk7XHJcbiAgICAgICAgdGhpcy5jdXJzb3JzWzFdID0gbmV3IEN1cnNvcih0aGlzLmNvbnRhaW5lcklkLCAxKTtcclxuXHJcbiAgICAgICAgLy9zZXQgY3Vyc29yIGNvbG9yc1xyXG4gICAgICAgIHRoaXMuY3Vyc29yc1swXS5zZXRDdXJzb3JDb2xvcihcInZhcigtLW1haW4tY3Vyc29yMS1jb2xvcilcIixcInZhcigtLW1haW4tY3Vyc29yMS1ob3Zlci1jb2xvcilcIixcInZhcigtLW1haW4tY3Vyc29yMS1hY3RpdmUtY29sb3IpXCIpO1xyXG4gICAgICAgIHRoaXMuY3Vyc29yc1sxXS5zZXRDdXJzb3JDb2xvcihcInZhcigtLW1haW4tY3Vyc29yMi1jb2xvcilcIixcInZhcigtLW1haW4tY3Vyc29yMi1ob3Zlci1jb2xvcilcIixcInZhcigtLW1haW4tY3Vyc29yMi1hY3RpdmUtY29sb3IpXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKmRyYXcgdGhlIGN1cnNvciBvZiB0aGUgZ2l2ZW4gY3Vyc29yIGluZGV4IG9udG8gdGhlIGdpdmVuIHBvc2l0aW9uc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Q3Vyc29yUG9zaXRpb259IGxlYWRDdXJzb3JQb3NpdGlvblxyXG4gICAgICogQHBhcmFtIHtDdXJzb3JQb3NpdGlvbltdfSBjdXJzb3JQb3NpdGlvbnNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjdXJzb3JJbmRleFxyXG4gICAgICogQG1lbWJlcm9mIE1haW5DdXJzb3JIYW5kbGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkcmF3Q3Vyc29yKGxlYWRDdXJzb3JQb3NpdGlvbjogQ3Vyc29yUG9zaXRpb24sIGN1cnNvclBvc2l0aW9uczpDdXJzb3JQb3NpdGlvbltdLCBjdXJzb3JJbmRleDogbnVtYmVyKSA6IHZvaWR7XHJcbiAgICAgICAgdGhpcy5jdXJzb3JzW2N1cnNvckluZGV4XS5kcmF3Q3Vyc29yKGxlYWRDdXJzb3JQb3NpdGlvbiwgY3Vyc29yUG9zaXRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqcmV0dXJuIHRoZSBjbG9zZXN0IGN1cnNvcnMgcG9zaXRpb24gYW5kIGFkZGl0aW9uYWwgZGF0YSB0byBhIGdpdmVuIHBvaW50XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJUG9pbnR9IHBvaW50XHJcbiAgICAgKiBAcmV0dXJucyB7Q3Vyc29yUG9zaXRpb259XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFpbkN1cnNvckhhbmRsZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldENsb3Nlc3RDdXJzb3JQb3NpdGlvblRvUG9pbnQocG9pbnQ6IElQb2ludCwgc2VsZWN0ZWRDdXJzb3JJbmRleDogbnVtYmVyKTogQ3Vyc29yUG9zaXRpb257XHJcbiAgICAgICAgbGV0IGRpc3RhbmNlIDp1bmRlZmluZWR8bnVtYmVyID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIGxldCBjdXJyZW50Q2xvc2VzdEN1cnNvclBvc2l0aW9uIDogQ3Vyc29yUG9zaXRpb247XHJcblxyXG4gICAgICAgIGZvcihsZXQgY3Vyc29yIG9mIHRoaXMuY3Vyc29ycyl7XHJcbiAgICAgICAgICAgIGxldCBjbG9zZXN0Q3Vyc29yUG9zaXRpb24gPSBjdXJzb3IuZ2V0Q2xvc2VzdEN1cnNvclBvc2l0aW9uVG9Qb2ludChwb2ludCk7XHJcbiAgICAgICAgICAgIGlmKGNsb3Nlc3RDdXJzb3JQb3NpdGlvbiAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGN1cnNvcnNDbG9zZXN0RGlzdGFuY2UgPSBjbG9zZXN0Q3Vyc29yUG9zaXRpb24hLmFkZGl0aW9uYWxJbmZvcm1hdGlvbltcImRpc3RhbmNlXCJdO1xyXG4gICAgICAgICAgICAgICAgaWYoZGlzdGFuY2UgPT0gdW5kZWZpbmVkIHx8IGRpc3RhbmNlID4gY3Vyc29yc0Nsb3Nlc3REaXN0YW5jZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2UgPSBjdXJzb3JzQ2xvc2VzdERpc3RhbmNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDbG9zZXN0Q3Vyc29yUG9zaXRpb24gPSBjbG9zZXN0Q3Vyc29yUG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKGRpc3RhbmNlID09IGN1cnNvcnNDbG9zZXN0RGlzdGFuY2Upe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGN1cnNvci5jdXJzb3JJbmRleCA9PSBzZWxlY3RlZEN1cnNvckluZGV4KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2UgPSBjdXJzb3JzQ2xvc2VzdERpc3RhbmNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q2xvc2VzdEN1cnNvclBvc2l0aW9uID0gY2xvc2VzdEN1cnNvclBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRDbG9zZXN0Q3Vyc29yUG9zaXRpb24hO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogc2V0cyB1cCB0aGUgY3Vyc29yIGhhbmRsZXIgaHRtbCBjb2RlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7UmVjdGFuZ2xlfSBbY2hhcnRBcmVhXVxyXG4gICAgICogQG1lbWJlcm9mIE1haW5DdXJzb3JIYW5kbGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXBwZW5kQ29udGFpbmVyIChjaGFydEFyZWE6IFJlY3RhbmdsZSkgeyAgICAgICAgXHJcbiAgICAgICAgbGV0IGN1cnNvckhhbmRsZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIGN1cnNvckhhbmRsZXJEaXYuaWQgPSB0aGlzLmNvbnRhaW5lcklkO1xyXG4gICAgICAgICQoXCIjXCIrdGhpcy5wYXJlbnRDb250YWluZXJJZCkuYXBwZW5kKGN1cnNvckhhbmRsZXJEaXYpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlQ2hhcnRBcmVhKGNoYXJ0QXJlYSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKnVwZGF0ZXMgdGhlIGN1cnNvciBoYW5kbGVycyBodG1sIHBvc2l0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtSZWN0YW5nbGV9IFtjaGFydEFyZWFdXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFpbkN1cnNvckhhbmRsZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHVwZGF0ZUNoYXJ0QXJlYShjaGFydEFyZWE/OiBSZWN0YW5nbGUpe1xyXG4gICAgICAgIGxldCBjdXJzb3JIYW5kbGVyRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5jb250YWluZXJJZCk7XHJcbiAgICAgICAgaWYoY3Vyc29ySGFuZGxlckRpdiAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBjdXJzb3JIYW5kbGVyRGl2LnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwicG9zaXRpb246IGFic29sdXRlOyB0b3A6IFwiKyBjaGFydEFyZWEhLnkgKyBcInB4O2xlZnQ6IFwiKyBjaGFydEFyZWEhLnggKyBcInB4O3dpZHRoOiBcIisgY2hhcnRBcmVhIS53aWR0aCArIFwicHg7aGVpZ2h0OiBcIisgY2hhcnRBcmVhIS5oZWlnaHQrXCJweDtcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgZW5hYmxlTGluZUN1cnNvcihlbmFibGUgOiBib29sZWFuKXtcclxuICAgICAgICB0aGlzLl9lbmFibGVMaW5lQ3Vyc29yID0gZW5hYmxlO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmN1cnNvcnMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICB0aGlzLmN1cnNvcnNbaV0uZW5hYmxlTGluZUN1cnNvciA9IGVuYWJsZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBlbmFibGVMaW5lQ3Vyc29yKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VuYWJsZUxpbmVDdXJzb3I7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBlbmFibGVDcm9zc2hhaXJDdXJzb3IoZW5hYmxlIDogYm9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5fZW5hYmxlQ3Jvc3NoYWlyQ3Vyc29yID0gZW5hYmxlO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmN1cnNvcnMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICB0aGlzLmN1cnNvcnNbaV0uZW5hYmxlQ3Jvc3NIYWlyQ3Vyc29yID0gZW5hYmxlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGVuYWJsZUNyb3NzaGFpckN1cnNvcigpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9lbmFibGVDcm9zc2hhaXJDdXJzb3I7XHJcbiAgICB9XHJcbn07Il19