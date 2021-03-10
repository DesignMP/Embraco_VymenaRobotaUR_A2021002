define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //Algorithm from
    //http://mourner.github.io/simplify-js/
    var RDP = /** @class */ (function () {
        function RDP() {
            this.ratioX = 1;
            this.ratioY = 1;
        }
        // to suit your point format, run search/replace for '.x' and '.y';
        // for 3D version, see 3d branch (configurability would draw significant performance overhead)
        // square distance between 2 points
        RDP.prototype.getSqDist = function (p1, p2) {
            var dx = p1.x - p2.x, dy = p1.y - p2.y;
            return (dx / this.ratioX) * (dx / this.ratioX) + (dy / this.ratioY * dy / this.ratioY);
        };
        // square distance from a point to a segment
        RDP.prototype.getSqSegDist = function (p, p1, p2) {
            var x = p1.x, y = p1.y, dx = p2.x - x, dy = p2.y - y;
            if (dx !== 0 || dy !== 0) {
                var t = ((p.x - x) * dx + (p.y - y) * dy) / (dx * dx + dy * dy);
                if (t > 1) {
                    x = p2.x;
                    y = p2.y;
                }
                else if (t > 0) {
                    x += dx * t;
                    y += dy * t;
                }
            }
            dx = p.x - x;
            dy = p.y - y;
            return (dx / this.ratioX) * (dx / this.ratioX) + (dy / this.ratioY * dy / this.ratioY);
        };
        // rest of the code doesn't care about point format
        // basic distance-based simplification
        RDP.prototype.simplifyRadialDist = function (points, sqTolerance) {
            var prevPoint = points[0], newPoints = [prevPoint], point;
            for (var i = 1, len = points.length; i < len; i++) {
                point = points[i];
                if (this.getSqDist(point, prevPoint) > sqTolerance) {
                    newPoints.push(point);
                    prevPoint = point;
                }
            }
            if (prevPoint !== point)
                newPoints.push(point);
            return newPoints;
        };
        RDP.prototype.simplifyDPStep = function (points, first, last, sqTolerance, simplified) {
            var maxSqDist = sqTolerance, index;
            for (var i = first + 1; i < last; i++) {
                var sqDist = this.getSqSegDist(points[i], points[first], points[last]);
                if (sqDist > maxSqDist) {
                    index = i;
                    maxSqDist = sqDist;
                }
            }
            if (maxSqDist > sqTolerance) {
                if (index - first > 1)
                    this.simplifyDPStep(points, first, index, sqTolerance, simplified);
                simplified.push(points[index]);
                if (last - index > 1)
                    this.simplifyDPStep(points, index, last, sqTolerance, simplified);
            }
        };
        // simplification using Ramer-Douglas-Peucker algorithm
        RDP.prototype.simplifyDouglasPeucker = function (points, sqTolerance) {
            var last = points.length - 1;
            var simplified = [points[0]];
            this.simplifyDPStep(points, 0, last, sqTolerance, simplified);
            simplified.push(points[last]);
            return simplified;
        };
        // both algorithms combined for awesome performance
        // simplify(points: Array<IPoint>, tolerance: number, highestQuality: boolean) : Array<IPoint> {
        /**
         *
         * @param points
         * @param tolerance tolerance of the algorithm
         * @param ratioX ratio in the x-drection of the chart
         * @param ratioY ratio in the y-direction of the chart
         * @param highestQuality
         */
        RDP.prototype.simplify = function (points, tolerance, ratioX, ratioY, highestQuality) {
            if (points.length <= 2)
                return points;
            this.ratioX = ratioX;
            this.ratioY = ratioY;
            var sqTolerance = (tolerance !== undefined) ? tolerance * tolerance : 1;
            points = highestQuality ? points : this.simplifyRadialDist(points, sqTolerance);
            points = this.simplifyDouglasPeucker(points, sqTolerance);
            return points;
        };
        return RDP;
    }());
    exports.RDP = RDP;
    ;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmRwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vbWF0aC9saW5lUmVkdWN0aW9uQWxnb3JpdGhtL3JkcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFJQSxnQkFBZ0I7SUFDaEIsdUNBQXVDO0lBRXZDO1FBQUE7WUFDWSxXQUFNLEdBQVcsQ0FBQyxDQUFDO1lBQ25CLFdBQU0sR0FBVyxDQUFDLENBQUM7UUF3SC9CLENBQUM7UUF0SEcsbUVBQW1FO1FBQ25FLDhGQUE4RjtRQUU5RixtQ0FBbUM7UUFDbkMsdUJBQVMsR0FBVCxVQUFVLEVBQUUsRUFBRSxFQUFFO1lBRVosSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUNoQixFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBR2pCLE9BQU8sQ0FBQyxFQUFFLEdBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsR0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkYsQ0FBQztRQUVILDRDQUE0QztRQUM1QywwQkFBWSxHQUFaLFVBQWEsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFO1lBRWxCLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQ1IsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQ1IsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUNiLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUVsQixJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRTtnQkFFdEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxD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aEYsTUFBTSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFFMUQsT0FBTyxNQUFNLENBQUM7UUFDbEIsQ0FBQztRQUNMLFVBQUM7SUFBRCxDQUFDLEFBMUhELElBMEhDO0lBMUhZLGtCQUFHO0lBMEhmLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJUkRQIH0gZnJvbSBcIi4uL2ludGVyZmFjZS9yZHBJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ2hhcnRQb2ludCB9IGZyb20gXCIuLi8uLi8uLi93aWRnZXRzL2NoYXJ0Vmlld1dpZGdldC9jaGFydEV4dGVuc2lvbnMvY2hhcnREYXRhT3B0aW1pemVyXCI7XHJcbmltcG9ydCB7IElQb2ludCB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY29tbW9uL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIjtcclxuXHJcbi8vQWxnb3JpdGhtIGZyb21cclxuLy9odHRwOi8vbW91cm5lci5naXRodWIuaW8vc2ltcGxpZnktanMvXHJcblxyXG5leHBvcnQgY2xhc3MgUkRQIGltcGxlbWVudHMgSVJEUCB7IFxyXG4gICAgcHJpdmF0ZSByYXRpb1g6IG51bWJlciA9IDE7XHJcbiAgICBwcml2YXRlIHJhdGlvWTogbnVtYmVyID0gMTtcclxuXHJcbiAgICAvLyB0byBzdWl0IHlvdXIgcG9pbnQgZm9ybWF0LCBydW4gc2VhcmNoL3JlcGxhY2UgZm9yICcueCcgYW5kICcueSc7XHJcbiAgICAvLyBmb3IgM0QgdmVyc2lvbiwgc2VlIDNkIGJyYW5jaCAoY29uZmlndXJhYmlsaXR5IHdvdWxkIGRyYXcgc2lnbmlmaWNhbnQgcGVyZm9ybWFuY2Ugb3ZlcmhlYWQpXHJcblxyXG4gICAgLy8gc3F1YXJlIGRpc3RhbmNlIGJldHdlZW4gMiBwb2ludHNcclxuICAgIGdldFNxRGlzdChwMSwgcDIpIHtcclxuXHJcbiAgICAgICAgdmFyIGR4ID0gcDEueCAtIHAyLngsXHJcbiAgICAgICAgICAgIGR5ID0gcDEueSAtIHAyLnk7XHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIChkeC90aGlzLnJhdGlvWCkgKiAoZHggLyB0aGlzLnJhdGlvWCkgKyAoZHkvdGhpcy5yYXRpb1kgKiBkeS90aGlzLnJhdGlvWSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAvLyBzcXVhcmUgZGlzdGFuY2UgZnJvbSBhIHBvaW50IHRvIGEgc2VnbWVudFxyXG4gICAgZ2V0U3FTZWdEaXN0KHAsIHAxLCBwMikge1xyXG5cclxuICAgICAgICB2YXIgeCA9IHAxLngsXHJcbiAgICAgICAgICAgIHkgPSBwMS55LFxyXG4gICAgICAgICAgICBkeCA9IHAyLnggLSB4LFxyXG4gICAgICAgICAgICBkeSA9IHAyLnkgLSB5O1xyXG5cclxuICAgICAgICBpZiAoZHggIT09IDAgfHwgZHkgIT09IDApIHtcclxuXHJcbiAgICAgICAgICAgIHZhciB0ID0gKChwLnggLSB4KSAqIGR4ICsgKHAueSAtIHkpICogZHkpIC8gKGR4ICogZHggKyBkeSAqIGR5KTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0ID4gMSkge1xyXG4gICAgICAgICAgICAgICAgeCA9IHAyLng7XHJcbiAgICAgICAgICAgICAgICB5ID0gcDIueTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHggKz0gZHggKiB0O1xyXG4gICAgICAgICAgICAgICAgeSArPSBkeSAqIHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGR4ID0gcC54IC0geDtcclxuICAgICAgICBkeSA9IHAueSAtIHk7XHJcblxyXG4gICAgICAgIHJldHVybiAoZHgvdGhpcy5yYXRpb1gpICogKGR4IC8gdGhpcy5yYXRpb1gpICsgKGR5L3RoaXMucmF0aW9ZICogZHkvdGhpcy5yYXRpb1kpO1xyXG4gICAgfVxyXG4gICAgLy8gcmVzdCBvZiB0aGUgY29kZSBkb2Vzbid0IGNhcmUgYWJvdXQgcG9pbnQgZm9ybWF0XHJcblxyXG4gICAgLy8gYmFzaWMgZGlzdGFuY2UtYmFzZWQgc2ltcGxpZmljYXRpb25cclxuICAgIHNpbXBsaWZ5UmFkaWFsRGlzdChwb2ludHMsIHNxVG9sZXJhbmNlKSB7XHJcblxyXG4gICAgICAgIHZhciBwcmV2UG9pbnQgPSBwb2ludHNbMF0sXHJcbiAgICAgICAgICAgIG5ld1BvaW50cyA9IFtwcmV2UG9pbnRdLFxyXG4gICAgICAgICAgICBwb2ludDtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDEsIGxlbiA9IHBvaW50cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBwb2ludCA9IHBvaW50c1tpXTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdldFNxRGlzdChwb2ludCwgcHJldlBvaW50KSA+IHNxVG9sZXJhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdQb2ludHMucHVzaChwb2ludCk7XHJcbiAgICAgICAgICAgICAgICBwcmV2UG9pbnQgPSBwb2ludDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHByZXZQb2ludCAhPT0gcG9pbnQpIG5ld1BvaW50cy5wdXNoKHBvaW50KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ld1BvaW50cztcclxuICAgIH1cclxuXHJcbiAgICBzaW1wbGlmeURQU3RlcChwb2ludHMsIGZpcnN0LCBsYXN0LCBzcVRvbGVyYW5jZSwgc2ltcGxpZmllZCkge1xyXG4gICAgICAgIHZhciBtYXhTcURpc3QgPSBzcVRvbGVyYW5jZSxcclxuICAgICAgICAgICAgaW5kZXg7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSBmaXJzdCArIDE7IGkgPCBsYXN0OyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIHNxRGlzdCA9IHRoaXMuZ2V0U3FTZWdEaXN0KHBvaW50c1tpXSwgcG9pbnRzW2ZpcnN0XSwgcG9pbnRzW2xhc3RdKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChzcURpc3QgPiBtYXhTcURpc3QpIHtcclxuICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcclxuICAgICAgICAgICAgICAgIG1heFNxRGlzdCA9IHNxRGlzdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG1heFNxRGlzdCA+IHNxVG9sZXJhbmNlKSB7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCAtIGZpcnN0ID4gMSkgdGhpcy5zaW1wbGlmeURQU3RlcChwb2ludHMsIGZpcnN0LCBpbmRleCwgc3FUb2xlcmFuY2UsIHNpbXBsaWZpZWQpO1xyXG4gICAgICAgICAgICBzaW1wbGlmaWVkLnB1c2gocG9pbnRzW2luZGV4XSk7XHJcbiAgICAgICAgICAgIGlmIChsYXN0IC0gaW5kZXggPiAxKSB0aGlzLnNpbXBsaWZ5RFBTdGVwKHBvaW50cywgaW5kZXgsIGxhc3QsIHNxVG9sZXJhbmNlLCBzaW1wbGlmaWVkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2ltcGxpZmljYXRpb24gdXNpbmcgUmFtZXItRG91Z2xhcy1QZXVja2VyIGFsZ29yaXRobVxyXG4gICAgc2ltcGxpZnlEb3VnbGFzUGV1Y2tlcihwb2ludHMsIHNxVG9sZXJhbmNlKSB7XHJcbiAgICAgICAgdmFyIGxhc3QgPSBwb2ludHMubGVuZ3RoIC0gMTtcclxuXHJcbiAgICAgICAgdmFyIHNpbXBsaWZpZWQgPSBbcG9pbnRzWzBdXTtcclxuICAgICAgICB0aGlzLnNpbXBsaWZ5RFBTdGVwKHBvaW50cywgMCwgbGFzdCwgc3FUb2xlcmFuY2UsIHNpbXBsaWZpZWQpO1xyXG4gICAgICAgIHNpbXBsaWZpZWQucHVzaChwb2ludHNbbGFzdF0pO1xyXG5cclxuICAgICAgICByZXR1cm4gc2ltcGxpZmllZDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBib3RoIGFsZ29yaXRobXMgY29tYmluZWQgZm9yIGF3ZXNvbWUgcGVyZm9ybWFuY2VcclxuICAgIC8vIHNpbXBsaWZ5KHBvaW50czogQXJyYXk8SVBvaW50PiwgdG9sZXJhbmNlOiBudW1iZXIsIGhpZ2hlc3RRdWFsaXR5OiBib29sZWFuKSA6IEFycmF5PElQb2ludD4ge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSBwb2ludHMgXHJcbiAgICAgICAgICogQHBhcmFtIHRvbGVyYW5jZSB0b2xlcmFuY2Ugb2YgdGhlIGFsZ29yaXRobVxyXG4gICAgICAgICAqIEBwYXJhbSByYXRpb1ggcmF0aW8gaW4gdGhlIHgtZHJlY3Rpb24gb2YgdGhlIGNoYXJ0XHJcbiAgICAgICAgICogQHBhcmFtIHJhdGlvWSByYXRpbyBpbiB0aGUgeS1kaXJlY3Rpb24gb2YgdGhlIGNoYXJ0XHJcbiAgICAgICAgICogQHBhcmFtIGhpZ2hlc3RRdWFsaXR5IFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHNpbXBsaWZ5KHBvaW50czogQXJyYXk8SVBvaW50PiwgdG9sZXJhbmNlLCByYXRpb1g6IG51bWJlciwgcmF0aW9ZOiBudW1iZXIsIGhpZ2hlc3RRdWFsaXR5OiBib29sZWFuKSA6IEFycmF5PElQb2ludD4ge1xyXG4gICAgICAgIGlmIChwb2ludHMubGVuZ3RoIDw9IDIpIHJldHVybiBwb2ludHM7XHJcblxyXG4gICAgICAgIHRoaXMucmF0aW9YID0gcmF0aW9YO1xyXG4gICAgICAgIHRoaXMucmF0aW9ZID0gcmF0aW9ZO1xyXG5cclxuICAgICAgICB2YXIgc3FUb2xlcmFuY2UgPSAodG9sZXJhbmNlICE9PSB1bmRlZmluZWQpID8gdG9sZXJhbmNlICogdG9sZXJhbmNlIDogMTtcclxuXHJcbiAgICAgICAgcG9pbnRzID0gaGlnaGVzdFF1YWxpdHkgPyBwb2ludHMgOiB0aGlzLnNpbXBsaWZ5UmFkaWFsRGlzdChwb2ludHMsIHNxVG9sZXJhbmNlKTtcclxuXHJcbiAgICAgICAgcG9pbnRzID0gdGhpcy5zaW1wbGlmeURvdWdsYXNQZXVja2VyKHBvaW50cywgc3FUb2xlcmFuY2UpO1xyXG5cclxuICAgICAgICByZXR1cm4gcG9pbnRzO1xyXG4gICAgfVxyXG59O1xyXG4iXX0=