define(["require", "exports", "./CrossHairCursor", "./LineCursor"], function (require, exports, CrossHairCursor_1, LineCursor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Cursor = /** @class */ (function () {
        function Cursor(cursorHandlerID, cursorIndex) {
            this._enableLineCursor = false;
            this._enableCrossHairCursor = false;
            this.lineCursor = new LineCursor_1.LineCursor(cursorHandlerID, cursorIndex);
            this.crossHairCursor = new CrossHairCursor_1.CrossHairCursor(cursorHandlerID, cursorIndex);
        }
        /**
         * set the cursor colors
         *
         * @param {string} cursorColor
         * @param {string} hoverColor
         * @param {string} selectedColor
         * @memberof Cursor
         */
        Cursor.prototype.setCursorColor = function (cursorColor, hoverColor, selectedColor) {
            this.lineCursor.setColor(cursorColor, hoverColor, selectedColor);
            this.crossHairCursor.setColor(cursorColor, hoverColor, selectedColor);
        };
        /**
         *draw the cursor to the given positions
         *
         * @param {*} leadCursorPosition
         * @param {*} cursorPositions
         * @memberof Cursor
         */
        Cursor.prototype.drawCursor = function (leadCursorPosition, cursorPositions) {
            this.lineCursor.removeCursors();
            if (this.enableLineCursor == true) {
                this.lineCursor.drawCursor(leadCursorPosition, cursorPositions);
            }
            this.crossHairCursor.removeCursors();
            if (this.enableCrossHairCursor == true) {
                this.crossHairCursor.drawCursor(leadCursorPosition, cursorPositions);
            }
        };
        /**
         * return the closest cursors position and additional data to a given point
         *
         * @param {IPoint} point
         * @returns {CursorPosition}
         * @memberof Cursor
         */
        Cursor.prototype.getClosestCursorPositionToPoint = function (point) {
            var distance = undefined;
            var currentClosestCursorPosition;
            var cursorStyles = this.getCursorStyleArray();
            for (var i = 0; i < cursorStyles.length; i++) {
                var cursorsClosestCursorPosition = cursorStyles[i].getClosestCursorPositionToPoint(point);
                if (cursorsClosestCursorPosition != undefined) {
                    var cursorsClosestDistance = cursorsClosestCursorPosition.additionalInformation["distance"];
                    if ((distance == undefined || distance > cursorsClosestDistance)) {
                        distance = cursorsClosestDistance;
                        currentClosestCursorPosition = cursorsClosestCursorPosition;
                    }
                }
            }
            return currentClosestCursorPosition;
        };
        /**
         *
         * returns an array with all available cursor styles
         * @private
         * @returns {Array<CursorDefinitionBase>}
         * @memberof Cursor
         */
        Cursor.prototype.getCursorStyleArray = function () {
            var cursorStyles = new Array();
            if (this.enableLineCursor == true) {
                cursorStyles.push(this.lineCursor);
            }
            if (this.enableCrossHairCursor == true) {
                cursorStyles.push(this.crossHairCursor);
            }
            return cursorStyles;
        };
        Object.defineProperty(Cursor.prototype, "enableLineCursor", {
            get: function () {
                return this._enableLineCursor;
            },
            set: function (enable) {
                this._enableLineCursor = enable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cursor.prototype, "enableCrossHairCursor", {
            get: function () {
                return this._enableCrossHairCursor;
            },
            set: function (enable) {
                this._enableCrossHairCursor = enable;
            },
            enumerable: true,
            configurable: true
        });
        return Cursor;
    }());
    exports.Cursor = Cursor;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3Vyc29yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0Vmlld1dpZGdldC9jdXJzb3IvQ3Vyc29yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUtBO1FBT0ksZ0JBQVksZUFBdUIsRUFBRSxXQUFtQjtZQU5oRCxzQkFBaUIsR0FBWSxLQUFLLENBQUM7WUFDbkMsMkJBQXNCLEdBQVksS0FBSyxDQUFDO1lBTTVDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSx1QkFBVSxDQUFDLGVBQWUsRUFBRSxXQUFXLENBQUMsQ0FBQztZQUMvRCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksaUNBQWUsQ0FBQyxlQUFlLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDN0UsQ0FBQztRQUdEOzs7Ozs7O1dBT0c7UUFDSSwrQkFBYyxHQUFyQixVQUFzQixXQUFtQixFQUFFLFVBQWtCLEVBQUUsYUFBcUI7WUFDaEYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLFVBQVUsRUFBRSxhQUFhLENBQUMsQ0FBQztZQUNqRSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsVUFBVSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQzFFLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSSwyQkFBVSxHQUFqQixVQUFrQixrQkFBa0IsRUFBRSxlQUFlO1lBQ2pELElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDaEMsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLElBQUksSUFBSSxFQUFFO2dCQUMvQixJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsRUFBRSxlQUFlLENBQUMsQ0FBQzthQUNuRTtZQUNELElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDckMsSUFBSSxJQUFJLENBQUMscUJBQXFCLElBQUksSUFBSSxFQUFFO2dCQUNwQyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsRUFBRSxlQUFlLENBQUMsQ0FBQzthQUN4RTtRQUNMLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSSxnREFBK0IsR0FBdEMsVUFBdUMsS0FBYTtZQUNoRCxJQUFJLFFBQVEsR0FBdUIsU0FBUyxDQUFDO1lBQzdDLElBQUksNEJBQTRCLENBQUM7WUFDakMsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7WUFDOUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzFDLElBQUksNEJBQTRCLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLCtCQUErQixDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMxRixJQUFJLDRCQUE0QixJQUFJLFNBQVMsRUFBQztvQkFDMUMsSUFBSSxzQkFBc0IsR0FBRyw0QkFBNkIsQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDN0YsSUFBRyxDQUFDLFFBQVEsSUFBSSxTQUFTLElBQUksUUFBUSxHQUFHLHNCQUFzQixDQUFDLEVBQUU7d0JBQzdELFFBQVEsR0FBRyxzQkFBc0IsQ0FBQzt3QkFDbEMsNEJBQTRCLEdBQUcsNEJBQTRCLENBQUM7cUJBQy9EO2lCQUNKO2FBQ0o7WUFDRCxPQUFPLDRCQUE0QixDQUFDO1FBQ3hDLENBQUM7UUFHRDs7Ozs7O1dBTUc7UUFDSyxvQ0FBbUIsR0FBM0I7WUFDSSxJQUFJLFlBQVksR0FBRyxJQUFJLEtBQUssRUFBd0IsQ0FBQztZQUNyRCxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLEVBQUU7Z0JBQy9CLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ3RDO1lBQ0QsSUFBSSxJQUFJLENBQUMscUJBQXFCLElBQUksSUFBSSxFQUFFO2dCQUNwQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQzthQUMzQztZQUNELE9BQU8sWUFBWSxDQUFDO1FBQ3hCLENBQUM7UUFJRCxzQkFBVyxvQ0FBZ0I7aUJBRzNCO2dCQUNJLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO1lBQ2xDLENBQUM7aUJBTEQsVUFBNEIsTUFBZTtnQkFDdkMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLE1BQU0sQ0FBQztZQUNwQyxDQUFDOzs7V0FBQTtRQUlELHNCQUFXLHlDQUFxQjtpQkFHaEM7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsc0JBQXNCLENBQUM7WUFDdkMsQ0FBQztpQkFMRCxVQUFpQyxNQUFlO2dCQUM1QyxJQUFJLENBQUMsc0JBQXNCLEdBQUcsTUFBTSxDQUFDO1lBQ3pDLENBQUM7OztXQUFBO1FBSUwsYUFBQztJQUFELENBQUMsQUFyR0QsSUFxR0M7SUFyR1ksd0JBQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJUG9pbnQgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2NvbW1vbi9pbnRlcmZhY2VzL3BvaW50SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEN1cnNvclBvc2l0aW9uIH0gZnJvbSBcIi4vQ3Vyc29yUG9zaXRpb25JbmZvXCI7XHJcbmltcG9ydCB7IENyb3NzSGFpckN1cnNvciB9IGZyb20gXCIuL0Nyb3NzSGFpckN1cnNvclwiO1xyXG5pbXBvcnQgeyBMaW5lQ3Vyc29yIH0gZnJvbSBcIi4vTGluZUN1cnNvclwiO1xyXG5pbXBvcnQgeyBDdXJzb3JEZWZpbml0aW9uQmFzZSB9IGZyb20gXCIuL0N1cnNvckRlZmluaXRpb25CYXNlXCI7XHJcbmV4cG9ydCBjbGFzcyBDdXJzb3Ige1xyXG4gICAgcHJpdmF0ZSBfZW5hYmxlTGluZUN1cnNvcjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfZW5hYmxlQ3Jvc3NIYWlyQ3Vyc29yOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBcclxuICAgIHByaXZhdGUgbGluZUN1cnNvcjogTGluZUN1cnNvcjtcclxuICAgIHByaXZhdGUgY3Jvc3NIYWlyQ3Vyc29yOiBDcm9zc0hhaXJDdXJzb3I7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKGN1cnNvckhhbmRsZXJJRDogc3RyaW5nLCBjdXJzb3JJbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5saW5lQ3Vyc29yID0gbmV3IExpbmVDdXJzb3IoY3Vyc29ySGFuZGxlcklELCBjdXJzb3JJbmRleCk7XHJcbiAgICAgICAgdGhpcy5jcm9zc0hhaXJDdXJzb3IgPSBuZXcgQ3Jvc3NIYWlyQ3Vyc29yKGN1cnNvckhhbmRsZXJJRCwgY3Vyc29ySW5kZXgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIHNldCB0aGUgY3Vyc29yIGNvbG9yc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjdXJzb3JDb2xvclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGhvdmVyQ29sb3JcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RlZENvbG9yXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRDdXJzb3JDb2xvcihjdXJzb3JDb2xvcjogc3RyaW5nLCBob3ZlckNvbG9yOiBzdHJpbmcsIHNlbGVjdGVkQ29sb3I6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMubGluZUN1cnNvci5zZXRDb2xvcihjdXJzb3JDb2xvciwgaG92ZXJDb2xvciwgc2VsZWN0ZWRDb2xvcik7XHJcbiAgICAgICAgdGhpcy5jcm9zc0hhaXJDdXJzb3Iuc2V0Q29sb3IoY3Vyc29yQ29sb3IsIGhvdmVyQ29sb3IsIHNlbGVjdGVkQ29sb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpkcmF3IHRoZSBjdXJzb3IgdG8gdGhlIGdpdmVuIHBvc2l0aW9uc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gbGVhZEN1cnNvclBvc2l0aW9uXHJcbiAgICAgKiBAcGFyYW0geyp9IGN1cnNvclBvc2l0aW9uc1xyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZHJhd0N1cnNvcihsZWFkQ3Vyc29yUG9zaXRpb24sIGN1cnNvclBvc2l0aW9ucykge1xyXG4gICAgICAgIHRoaXMubGluZUN1cnNvci5yZW1vdmVDdXJzb3JzKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlTGluZUN1cnNvciA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGluZUN1cnNvci5kcmF3Q3Vyc29yKGxlYWRDdXJzb3JQb3NpdGlvbiwgY3Vyc29yUG9zaXRpb25zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jcm9zc0hhaXJDdXJzb3IucmVtb3ZlQ3Vyc29ycygpO1xyXG4gICAgICAgIGlmICh0aGlzLmVuYWJsZUNyb3NzSGFpckN1cnNvciA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3Jvc3NIYWlyQ3Vyc29yLmRyYXdDdXJzb3IobGVhZEN1cnNvclBvc2l0aW9uLCBjdXJzb3JQb3NpdGlvbnMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJldHVybiB0aGUgY2xvc2VzdCBjdXJzb3JzIHBvc2l0aW9uIGFuZCBhZGRpdGlvbmFsIGRhdGEgdG8gYSBnaXZlbiBwb2ludFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SVBvaW50fSBwb2ludFxyXG4gICAgICogQHJldHVybnMge0N1cnNvclBvc2l0aW9ufVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0Q2xvc2VzdEN1cnNvclBvc2l0aW9uVG9Qb2ludChwb2ludDogSVBvaW50KTogQ3Vyc29yUG9zaXRpb24ge1xyXG4gICAgICAgIGxldCBkaXN0YW5jZTogdW5kZWZpbmVkIHwgbnVtYmVyID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIGxldCBjdXJyZW50Q2xvc2VzdEN1cnNvclBvc2l0aW9uO1xyXG4gICAgICAgIGxldCBjdXJzb3JTdHlsZXMgPSB0aGlzLmdldEN1cnNvclN0eWxlQXJyYXkoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGN1cnNvclN0eWxlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY3Vyc29yc0Nsb3Nlc3RDdXJzb3JQb3NpdGlvbiA9IGN1cnNvclN0eWxlc1tpXS5nZXRDbG9zZXN0Q3Vyc29yUG9zaXRpb25Ub1BvaW50KHBvaW50KTtcclxuICAgICAgICAgICAgaWYgKGN1cnNvcnNDbG9zZXN0Q3Vyc29yUG9zaXRpb24gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGxldCBjdXJzb3JzQ2xvc2VzdERpc3RhbmNlID0gY3Vyc29yc0Nsb3Nlc3RDdXJzb3JQb3NpdGlvbiEuYWRkaXRpb25hbEluZm9ybWF0aW9uW1wiZGlzdGFuY2VcIl07XHJcbiAgICAgICAgICAgICAgICBpZigoZGlzdGFuY2UgPT0gdW5kZWZpbmVkIHx8IGRpc3RhbmNlID4gY3Vyc29yc0Nsb3Nlc3REaXN0YW5jZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZSA9IGN1cnNvcnNDbG9zZXN0RGlzdGFuY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudENsb3Nlc3RDdXJzb3JQb3NpdGlvbiA9IGN1cnNvcnNDbG9zZXN0Q3Vyc29yUG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRDbG9zZXN0Q3Vyc29yUG9zaXRpb247XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIHJldHVybnMgYW4gYXJyYXkgd2l0aCBhbGwgYXZhaWxhYmxlIGN1cnNvciBzdHlsZXNcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8Q3Vyc29yRGVmaW5pdGlvbkJhc2U+fVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldEN1cnNvclN0eWxlQXJyYXkoKTogQXJyYXk8Q3Vyc29yRGVmaW5pdGlvbkJhc2U+IHtcclxuICAgICAgICBsZXQgY3Vyc29yU3R5bGVzID0gbmV3IEFycmF5PEN1cnNvckRlZmluaXRpb25CYXNlPigpO1xyXG4gICAgICAgIGlmICh0aGlzLmVuYWJsZUxpbmVDdXJzb3IgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBjdXJzb3JTdHlsZXMucHVzaCh0aGlzLmxpbmVDdXJzb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5lbmFibGVDcm9zc0hhaXJDdXJzb3IgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBjdXJzb3JTdHlsZXMucHVzaCh0aGlzLmNyb3NzSGFpckN1cnNvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjdXJzb3JTdHlsZXM7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIFxyXG4gICAgcHVibGljIHNldCBlbmFibGVMaW5lQ3Vyc29yKGVuYWJsZTogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuX2VuYWJsZUxpbmVDdXJzb3IgPSBlbmFibGU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGVuYWJsZUxpbmVDdXJzb3IoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VuYWJsZUxpbmVDdXJzb3I7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IGVuYWJsZUNyb3NzSGFpckN1cnNvcihlbmFibGU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl9lbmFibGVDcm9zc0hhaXJDdXJzb3IgPSBlbmFibGU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGVuYWJsZUNyb3NzSGFpckN1cnNvcigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZW5hYmxlQ3Jvc3NIYWlyQ3Vyc29yO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==