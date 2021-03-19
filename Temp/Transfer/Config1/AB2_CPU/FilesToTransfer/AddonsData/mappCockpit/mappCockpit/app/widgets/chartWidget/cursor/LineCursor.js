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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGluZUN1cnNvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jaGFydFdpZGdldC9jdXJzb3IvTGluZUN1cnNvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBR0E7UUFBZ0MsOEJBQW9CO1FBR2hELG9CQUFZLGVBQXVCLEVBQUUsV0FBbUI7WUFBeEQsWUFDSSxrQkFBTSxlQUFlLEVBQUUsV0FBVyxDQUFDLFNBRXRDO1lBREcsS0FBSSxDQUFDLE1BQU0sR0FBRyxlQUFlLEdBQUcsWUFBWSxHQUFHLEdBQUcsR0FBRyxXQUFXLEdBQUcsT0FBTyxDQUFDOztRQUMvRSxDQUFDO1FBRU0sK0JBQVUsR0FBakIsVUFBa0Isa0JBQWtDLEVBQUUsZUFBaUM7WUFDbkYsSUFBSSxrQkFBa0IsSUFBSSxTQUFTLElBQUksZUFBZSxDQUFDLENBQUMsQ0FBQyxJQUFJLFNBQVMsRUFBRTtnQkFDcEUsSUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxrQkFBa0IsQ0FBQztnQkFDN0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLGtCQUFrQixDQUFDLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxFQUFFLGtCQUFrQixDQUFDLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxFQUFDLGtCQUFrQixDQUFDLHFCQUFxQixDQUFDLFVBQVUsQ0FBQyxDQUFHLENBQUM7YUFDbk47UUFDTCxDQUFDO1FBRU0sa0NBQWEsR0FBcEI7WUFDSSxJQUFJLGFBQWEsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN6RCxJQUFJLGFBQWEsSUFBSSxTQUFTLEVBQUU7Z0JBQzVCLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUMxQjtRQUNMLENBQUM7UUFFTyw2QkFBUSxHQUFoQixVQUFpQixTQUFpQixFQUFFLE9BQWdCLEVBQUUsU0FBa0IsRUFBRSxRQUFpQjtZQUV2RixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQ3BDLElBQUksUUFBUSxFQUFFO2dCQUNWLFlBQVksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO2FBQ3JDO1lBQ0QsSUFBRyxPQUFPLEVBQUU7Z0JBQ1IsWUFBWSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7YUFDbEM7WUFHRCxJQUFJLE9BQU8sR0FBRywyQ0FBd0MsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLGlFQUNwRCxHQUFHLFNBQVMsR0FBRyxtQkFBZSxHQUFHLFNBQVMsR0FBRyxnQ0FBNEIsR0FBRyxZQUFZLEdBQUcsMENBQ25HLENBQUM7WUFDWixJQUFJLGFBQWEsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBQzNFLElBQUcsYUFBYSxJQUFJLFNBQVMsRUFBQztnQkFDMUIsYUFBYSxDQUFDLFNBQVMsSUFBSSxPQUFPLENBQUM7YUFDdEM7UUFDTCxDQUFDO1FBRU0sb0RBQStCLEdBQXRDLFVBQXVDLEtBQWE7WUFDaEQsSUFBSSxRQUFRLEdBQXVCLFNBQVMsQ0FBQztZQUM3QyxJQUFJLDRCQUF3RCxDQUFDO1lBQzdELElBQUcsSUFBSSxDQUFDLGtCQUFrQixJQUFJLFNBQVMsRUFBQztnQkFDcEMsUUFBUSxHQUFHLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNyRiw0QkFBNEIsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUM7Z0JBQ3ZELDRCQUE2QixDQUFDLHFCQUFxQixDQUFDLFVBQVUsQ0FBQyxHQUFHLFFBQVEsQ0FBQztnQkFDM0UsT0FBTyw0QkFBNEIsQ0FBQzthQUN2QztRQUNMLENBQUM7UUFFRDs7Ozs7Ozs7V0FRRztRQUNLLGdEQUEyQixHQUFuQyxVQUFvQyxNQUFjLEVBQUUsTUFBYztZQUM5RCxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekQsQ0FBQztRQUNMLGlCQUFDO0lBQUQsQ0FBQyxBQWxFRCxDQUFnQywyQ0FBb0IsR0FrRW5EO0lBbEVZLGdDQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVBvaW50IH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9jb21tb24vaW50ZXJmYWNlcy9wb2ludEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDdXJzb3JQb3NpdGlvbiB9IGZyb20gXCIuL0N1cnNvclBvc2l0aW9uSW5mb1wiO1xyXG5pbXBvcnQgeyBDdXJzb3JEZWZpbml0aW9uQmFzZSB9IGZyb20gXCIuL0N1cnNvckRlZmluaXRpb25CYXNlXCI7XHJcbmV4cG9ydCBjbGFzcyBMaW5lQ3Vyc29yIGV4dGVuZHMgQ3Vyc29yRGVmaW5pdGlvbkJhc2Uge1xyXG4gICAgbGluZUlkOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY3Vyc29ySGFuZGxlcklkOiBzdHJpbmcsIGN1cnNvckluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICBzdXBlcihjdXJzb3JIYW5kbGVySWQsIGN1cnNvckluZGV4KTtcclxuICAgICAgICB0aGlzLmxpbmVJZCA9IGN1cnNvckhhbmRsZXJJZCArIFwibGluZUN1cnNvclwiICsgXCJfXCIgKyBjdXJzb3JJbmRleCArIFwiX2xpbmVcIjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhd0N1cnNvcihsZWFkQ3Vyc29yUG9zaXRpb246IEN1cnNvclBvc2l0aW9uLCBjdXJzb3JQb3NpdGlvbnM6IEN1cnNvclBvc2l0aW9uW10pOiB2b2lkIHtcclxuICAgICAgICBpZiAobGVhZEN1cnNvclBvc2l0aW9uICE9IHVuZGVmaW5lZCAmJiBjdXJzb3JQb3NpdGlvbnNbMF0gIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3Vyc29yUG9zaXRpb25zID0gY3Vyc29yUG9zaXRpb25zO1xyXG4gICAgICAgICAgICB0aGlzLmxlYWRDdXJzb3JQb3NpdGlvbiA9IGxlYWRDdXJzb3JQb3NpdGlvbjtcclxuICAgICAgICAgICAgdGhpcy5kcmF3TGluZShsZWFkQ3Vyc29yUG9zaXRpb24ucG9zaXRpb24ueCwgbGVhZEN1cnNvclBvc2l0aW9uLmFkZGl0aW9uYWxJbmZvcm1hdGlvbltcImhvdmVyZWRcIl0sIGxlYWRDdXJzb3JQb3NpdGlvbi5hZGRpdGlvbmFsSW5mb3JtYXRpb25bXCJoaWdobGlnaHRcIl0sbGVhZEN1cnNvclBvc2l0aW9uLmFkZGl0aW9uYWxJbmZvcm1hdGlvbltcInNlbGVjdGVkXCJdLCApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlQ3Vyc29ycygpIHtcclxuICAgICAgICBsZXQgY3Vyc29yRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMubGluZUlkKTtcclxuICAgICAgICBpZiAoY3Vyc29yRWxlbWVudCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgY3Vyc29yRWxlbWVudC5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByaXZhdGUgZHJhd0xpbmUocG9zaXRpb25YOiBudW1iZXIsIGhvdmVyZWQ6IGJvb2xlYW4sIGhpZ2hsaWdodDogYm9vbGVhbiwgc2VsZWN0ZWQ6IGJvb2xlYW4pIHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgY3VycmVudENvbG9yID0gdGhpcy5jdXJzb3JDb2xvcjtcclxuICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgY3VycmVudENvbG9yID0gdGhpcy5zZWxlY3RlZENvbG9yO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihob3ZlcmVkKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRDb2xvciA9IHRoaXMuaG92ZXJDb2xvcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHN2Z0h0bWwgPSBgPHN2ZyBzdHlsZT0gXCJwb3NpdGlvbjogYWJzb2x1dGVcIiBpZCA9XCJgICsgdGhpcy5saW5lSWQgKyBgXCIgaGVpZ2h0PVwiMTAwJVwiIHdpZHRoPVwiMTAwJVwiPlxyXG4gICAgICAgICAgICAgICAgPGxpbmUgeDE9XCJgICsgcG9zaXRpb25YICsgYFwiIHkxPVwiMFwiIHgyPVwiYCArIHBvc2l0aW9uWCArIGBcIiB5Mj1cIjEwMCVcIiBzdHlsZT1cInN0cm9rZTpgICsgY3VycmVudENvbG9yICsgYDtzdHJva2Utd2lkdGg6MlwiIC8+XHJcbiAgICAgICAgICAgIDwvc3ZnPmA7XHJcbiAgICAgICAgbGV0IGN1cnNvckhhbmRsZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmN1cnNvckhhbmRsZXJDb250YWluZXJJZCk7XHJcbiAgICAgICAgaWYoY3Vyc29ySGFuZGxlciAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBjdXJzb3JIYW5kbGVyLmlubmVySFRNTCArPSBzdmdIdG1sO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGdldENsb3Nlc3RDdXJzb3JQb3NpdGlvblRvUG9pbnQocG9pbnQ6IElQb2ludCk6IEN1cnNvclBvc2l0aW9uIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICBsZXQgZGlzdGFuY2U6IG51bWJlciB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuICAgICAgICBsZXQgY3VycmVudENsb3Nlc3RDdXJzb3JQb3NpdGlvbjogQ3Vyc29yUG9zaXRpb24gfCB1bmRlZmluZWQ7XHJcbiAgICAgICAgaWYodGhpcy5sZWFkQ3Vyc29yUG9zaXRpb24gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgZGlzdGFuY2UgPSB0aGlzLmNhbGN1bGF0ZUhvcml6b250YWxEaXN0YW5jZSh0aGlzLmxlYWRDdXJzb3JQb3NpdGlvbi5wb3NpdGlvbiwgcG9pbnQpO1xyXG4gICAgICAgICAgICBjdXJyZW50Q2xvc2VzdEN1cnNvclBvc2l0aW9uID0gdGhpcy5sZWFkQ3Vyc29yUG9zaXRpb247XHJcbiAgICAgICAgICAgIGN1cnJlbnRDbG9zZXN0Q3Vyc29yUG9zaXRpb24hLmFkZGl0aW9uYWxJbmZvcm1hdGlvbltcImRpc3RhbmNlXCJdID0gZGlzdGFuY2U7XHJcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50Q2xvc2VzdEN1cnNvclBvc2l0aW9uO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBjYWxjdWxhdGUgdGhlIGhvcml6b250YWwgZGlzdGFuY2UgYmV0d2VlbiB0d28gcG9pbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SVBvaW50fSBwb2ludDFcclxuICAgICAqIEBwYXJhbSB7SVBvaW50fSBwb2ludDJcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgTGluZUN1cnNvclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNhbGN1bGF0ZUhvcml6b250YWxEaXN0YW5jZShwb2ludDE6IElQb2ludCwgcG9pbnQyOiBJUG9pbnQpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAoTWF0aC5zcXJ0KE1hdGgucG93KHBvaW50Mi54IC0gcG9pbnQxLngsIDIpKSk7XHJcbiAgICB9XHJcbn1cclxuIl19