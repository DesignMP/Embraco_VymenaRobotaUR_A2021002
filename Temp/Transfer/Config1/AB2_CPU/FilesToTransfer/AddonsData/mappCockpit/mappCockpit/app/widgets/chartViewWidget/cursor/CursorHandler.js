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
        CursorHandler.prototype.getClosestCursorPositionToPoint = function (point) {
            var distance = undefined;
            var currentClosestCursorPosition;
            for (var j = 0; j < this.cursors.length; j++) {
                var closestCursorPosition = this.cursors[j].getClosestCursorPositionToPoint(point);
                if (closestCursorPosition != undefined) {
                    var cursorsClosestDistance = closestCursorPosition.additionalInformation["distance"];
                    if ((distance == undefined || distance > cursorsClosestDistance)) {
                        distance = cursorsClosestDistance;
                        currentClosestCursorPosition = closestCursorPosition;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3Vyc29ySGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jaGFydFZpZXdXaWRnZXQvY3Vyc29yL0N1cnNvckhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBS0E7UUFVSTs7Ozs7V0FLRztRQUNILHVCQUFZLGlCQUF5QixFQUFFLFNBQXFCO1lBWnBELHNCQUFpQixHQUFhLEtBQUssQ0FBQztZQUNwQywyQkFBc0IsR0FBWSxLQUFLLENBQUM7WUFZNUMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDO1lBQzNDLElBQUksQ0FBQyxXQUFXLEdBQUcsaUJBQWlCLEdBQUcsZ0JBQWdCLENBQUM7WUFDeEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFVLENBQUMsQ0FBQztZQUVqQyxvQkFBb0I7WUFDcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLEtBQUssRUFBVSxDQUFDO1lBQ25DLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxlQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksZUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFbEQsbUJBQW1CO1lBQ25CLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLDJCQUEyQixFQUFDLGlDQUFpQyxFQUFDLGtDQUFrQyxDQUFDLENBQUM7WUFDakksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsMkJBQTJCLEVBQUMsaUNBQWlDLEVBQUMsa0NBQWtDLENBQUMsQ0FBQztRQUNySSxDQUFDO1FBR0Q7Ozs7Ozs7V0FPRztRQUNJLGtDQUFVLEdBQWpCLFVBQWtCLGtCQUFrQyxF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b0JBQ3hDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMscUJBQXFCLEdBQUcsTUFBTSxDQUFDO2lCQUNsRDtZQUNMLENBQUM7OztXQUFBO1FBS0wsb0JBQUM7SUFBRCxDQUFDLEFBckhELElBcUhDO0lBckhZLHNDQUFhO0lBcUh6QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVBvaW50IH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvaW50ZXJmYWNlcy9wb2ludEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDdXJzb3IgfSBmcm9tIFwiLi9DdXJzb3JcIjtcclxuaW1wb3J0IHsgUmVjdGFuZ2xlIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvdHlwZXMvUmVjdGFuZ2xlXCI7XHJcbmltcG9ydCB7IEN1cnNvclBvc2l0aW9uIH0gZnJvbSBcIi4vQ3Vyc29yUG9zaXRpb25JbmZvXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ3Vyc29ySGFuZGxlciB7IFxyXG4gICAgcHJpdmF0ZSBwYXJlbnRDb250YWluZXJJZCA6IHN0cmluZztcclxuICAgIHByaXZhdGUgY29udGFpbmVySWQ6IHN0cmluZ1xyXG5cclxuICAgIHByaXZhdGUgX2VuYWJsZUxpbmVDdXJzb3IgOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9lbmFibGVDcm9zc2hhaXJDdXJzb3I6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgIFxyXG4gICAgcHJpdmF0ZSBjdXJzb3JzIDogQ3Vyc29yW107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBpbml0aWFsaXplcyB0aGUgbWFpbiBjdXJzb3IgaGFuZGxlclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhcmVudENvbnRhaW5lcklkXHJcbiAgICAgKiBAcGFyYW0ge1JlY3RhbmdsZX0gW2NoYXJ0QXJlYV1cclxuICAgICAqIEBtZW1iZXJvZiBNYWluQ3Vyc29ySGFuZGxlclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRDb250YWluZXJJZDogc3RyaW5nLCBjaGFydEFyZWE/OiBSZWN0YW5nbGUpIHtcclxuICAgICAgICB0aGlzLnBhcmVudENvbnRhaW5lcklkID0gcGFyZW50Q29udGFpbmVySWQ7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXJJZCA9IHBhcmVudENvbnRhaW5lcklkICsgXCJfY3Vyc29ySGFuZGxlclwiO1xyXG4gICAgICAgIHRoaXMuYXBwZW5kQ29udGFpbmVyKGNoYXJ0QXJlYSEpO1xyXG4gICAgXHJcbiAgICAgICAgLy9pbml0aWFsaXplIEN1cnNvcnNcclxuICAgICAgICB0aGlzLmN1cnNvcnMgPSBuZXcgQXJyYXk8Q3Vyc29yPigpO1xyXG4gICAgICAgIHRoaXMuY3Vyc29yc1swXSA9IG5ldyBDdXJzb3IodGhpcy5jb250YWluZXJJZCwgMCk7XHJcbiAgICAgICAgdGhpcy5jdXJzb3JzWzFdID0gbmV3IEN1cnNvcih0aGlzLmNvbnRhaW5lcklkLCAxKTtcclxuXHJcbiAgICAgICAgLy9zZXQgY3Vyc29yIGNvbG9yc1xyXG4gICAgICAgIHRoaXMuY3Vyc29yc1swXS5zZXRDdXJzb3JDb2xvcihcInZhcigtLW1haW4tY3Vyc29yMS1jb2xvcilcIixcInZhcigtLW1haW4tY3Vyc29yMS1ob3Zlci1jb2xvcilcIixcInZhcigtLW1haW4tY3Vyc29yMS1hY3RpdmUtY29sb3IpXCIpO1xyXG4gICAgICAgIHRoaXMuY3Vyc29yc1sxXS5zZXRDdXJzb3JDb2xvcihcInZhcigtLW1haW4tY3Vyc29yMi1jb2xvcilcIixcInZhcigtLW1haW4tY3Vyc29yMi1ob3Zlci1jb2xvcilcIixcInZhcigtLW1haW4tY3Vyc29yMi1hY3RpdmUtY29sb3IpXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKmRyYXcgdGhlIGN1cnNvciBvZiB0aGUgZ2l2ZW4gY3Vyc29yIGluZGV4IG9udG8gdGhlIGdpdmVuIHBvc2l0aW9uc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Q3Vyc29yUG9zaXRpb259IGxlYWRDdXJzb3JQb3NpdGlvblxyXG4gICAgICogQHBhcmFtIHtDdXJzb3JQb3NpdGlvbltdfSBjdXJzb3JQb3NpdGlvbnNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjdXJzb3JJbmRleFxyXG4gICAgICogQG1lbWJlcm9mIE1haW5DdXJzb3JIYW5kbGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkcmF3Q3Vyc29yKGxlYWRDdXJzb3JQb3NpdGlvbjogQ3Vyc29yUG9zaXRpb24sIGN1cnNvclBvc2l0aW9uczpDdXJzb3JQb3NpdGlvbltdLCBjdXJzb3JJbmRleDogbnVtYmVyKSA6IHZvaWR7XHJcbiAgICAgICAgdGhpcy5jdXJzb3JzW2N1cnNvckluZGV4XS5kcmF3Q3Vyc29yKGxlYWRDdXJzb3JQb3NpdGlvbiwgY3Vyc29yUG9zaXRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqcmV0dXJuIHRoZSBjbG9zZXN0IGN1cnNvcnMgcG9zaXRpb24gYW5kIGFkZGl0aW9uYWwgZGF0YSB0byBhIGdpdmVuIHBvaW50XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJUG9pbnR9IHBvaW50XHJcbiAgICAgKiBAcmV0dXJucyB7Q3Vyc29yUG9zaXRpb259XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFpbkN1cnNvckhhbmRsZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldENsb3Nlc3RDdXJzb3JQb3NpdGlvblRvUG9pbnQocG9pbnQ6IElQb2ludCk6IEN1cnNvclBvc2l0aW9ue1xyXG4gICAgICAgIGxldCBkaXN0YW5jZSA6dW5kZWZpbmVkfG51bWJlciA9IHVuZGVmaW5lZDtcclxuICAgICAgICBsZXQgY3VycmVudENsb3Nlc3RDdXJzb3JQb3NpdGlvbjtcclxuXHJcbiAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IHRoaXMuY3Vyc29ycy5sZW5ndGg7IGorKyl7XHJcbiAgICAgICAgICAgIGxldCBjbG9zZXN0Q3Vyc29yUG9zaXRpb24gPSB0aGlzLmN1cnNvcnNbal0uZ2V0Q2xvc2VzdEN1cnNvclBvc2l0aW9uVG9Qb2ludChwb2ludCk7XHJcbiAgICAgICAgICAgIGlmKGNsb3Nlc3RDdXJzb3JQb3NpdGlvbiAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGN1cnNvcnNDbG9zZXN0RGlzdGFuY2UgPSBjbG9zZXN0Q3Vyc29yUG9zaXRpb24hLmFkZGl0aW9uYWxJbmZvcm1hdGlvbltcImRpc3RhbmNlXCJdO1xyXG4gICAgICAgICAgICAgICAgaWYoKGRpc3RhbmNlID09IHVuZGVmaW5lZCB8fCBkaXN0YW5jZSA+IGN1cnNvcnNDbG9zZXN0RGlzdGFuY2UpKXtcclxuICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZSA9IGN1cnNvcnNDbG9zZXN0RGlzdGFuY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudENsb3Nlc3RDdXJzb3JQb3NpdGlvbiA9IGNsb3Nlc3RDdXJzb3JQb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRDbG9zZXN0Q3Vyc29yUG9zaXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBzZXRzIHVwIHRoZSBjdXJzb3IgaGFuZGxlciBodG1sIGNvZGVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtSZWN0YW5nbGV9IFtjaGFydEFyZWFdXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFpbkN1cnNvckhhbmRsZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhcHBlbmRDb250YWluZXIgKGNoYXJ0QXJlYTogUmVjdGFuZ2xlKSB7ICAgICAgICBcclxuICAgICAgICBsZXQgY3Vyc29ySGFuZGxlckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgY3Vyc29ySGFuZGxlckRpdi5pZCA9IHRoaXMuY29udGFpbmVySWQ7XHJcbiAgICAgICAgJChcIiNcIit0aGlzLnBhcmVudENvbnRhaW5lcklkKS5hcHBlbmQoY3Vyc29ySGFuZGxlckRpdik7XHJcbiAgICAgICAgdGhpcy51cGRhdGVDaGFydEFyZWEoY2hhcnRBcmVhKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqdXBkYXRlcyB0aGUgY3Vyc29yIGhhbmRsZXJzIGh0bWwgcG9zaXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1JlY3RhbmdsZX0gW2NoYXJ0QXJlYV1cclxuICAgICAqIEBtZW1iZXJvZiBNYWluQ3Vyc29ySGFuZGxlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXBkYXRlQ2hhcnRBcmVhKGNoYXJ0QXJlYT86IFJlY3RhbmdsZSl7XHJcbiAgICAgICAgbGV0IGN1cnNvckhhbmRsZXJEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmNvbnRhaW5lcklkKTtcclxuICAgICAgICBpZihjdXJzb3JIYW5kbGVyRGl2ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGN1cnNvckhhbmRsZXJEaXYuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogXCIrIGNoYXJ0QXJlYSEueSArIFwicHg7bGVmdDogXCIrIGNoYXJ0QXJlYSEueCArIFwicHg7d2lkdGg6IFwiKyBjaGFydEFyZWEhLndpZHRoICsgXCJweDtoZWlnaHQ6IFwiKyBjaGFydEFyZWEhLmhlaWdodCtcInB4O1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBlbmFibGVMaW5lQ3Vyc29yKGVuYWJsZSA6IGJvb2xlYW4pe1xyXG4gICAgICAgIHRoaXMuX2VuYWJsZUxpbmVDdXJzb3IgPSBlbmFibGU7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY3Vyc29ycy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIHRoaXMuY3Vyc29yc1tpXS5lbmFibGVMaW5lQ3Vyc29yID0gZW5hYmxlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGVuYWJsZUxpbmVDdXJzb3IoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZW5hYmxlTGluZUN1cnNvcjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGVuYWJsZUNyb3NzaGFpckN1cnNvcihlbmFibGUgOiBib29sZWFuKXtcclxuICAgICAgICB0aGlzLl9lbmFibGVDcm9zc2hhaXJDdXJzb3IgPSBlbmFibGU7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY3Vyc29ycy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIHRoaXMuY3Vyc29yc1tpXS5lbmFibGVDcm9zc0hhaXJDdXJzb3IgPSBlbmFibGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgZW5hYmxlQ3Jvc3NoYWlyQ3Vyc29yKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VuYWJsZUNyb3NzaGFpckN1cnNvcjtcclxuICAgIH1cclxufTsiXX0=