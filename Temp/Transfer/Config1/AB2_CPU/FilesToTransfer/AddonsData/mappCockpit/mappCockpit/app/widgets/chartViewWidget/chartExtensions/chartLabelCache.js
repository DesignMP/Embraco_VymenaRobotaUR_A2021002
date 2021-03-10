define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Implements caching for chart label text sizes ....
     *
     * @class ChartLabelCache
     */
    var ChartLabelCache = /** @class */ (function () {
        function ChartLabelCache() {
            // holds the text size cache
            this._textSizeCache = {};
        }
        /**
         * Gets the text size for the requested text and font
         *
         * @param {*} text
         * @param {*} maxwidth
         * @param {*} font
         * @memberof ChartLabelCache
         */
        ChartLabelCache.prototype.getTextSize = function (text, maxwidth, font) {
            if (!this._textSizeCache) {
                this._textSizeCache = {};
            }
            else {
                if (this._textSizeCache[font.fontFamily]) {
                    if (this._textSizeCache[font.fontFamily][font.size]) {
                        if (this._textSizeCache[font.fontFamily][font.size][text.length]) {
                            var cachedTextBounds = this._textSizeCache[font.fontFamily][font.size][text.length].bounds;
                            return cachedTextBounds;
                        }
                    }
                }
            }
        };
        /**
         * Caches the text size for the specefied text and font
         *
         * @param {*} text
         * @param {*} maxwidth
         * @param {*} font
         * @memberof ChartLabelCache
         */
        ChartLabelCache.prototype.cacheTextSize = function (text, maxwidth, font, bounds) {
            if (!this._textSizeCache[font.fontFamily]) {
                this._textSizeCache[font.fontFamily] = { fontFamily: font.fontFamily };
            }
            if (!this._textSizeCache[font.fontFamily][font.size]) {
                this._textSizeCache[font.fontFamily][font.size] = { fontSize: font.size };
            }
            if (!this._textSizeCache[font.fontFamily][font.size][text.length]) {
                // reserver some additional space in width because the cache just uses the text length
                bounds.width = bounds.width * 1.2;
                // store the bounds with the text lenght as key. Keep in mind that this not strictly exact because different text content with the same length could result in different text bounds !
                this._textSizeCache[font.fontFamily][font.size][text.length] = { bounds: bounds };
            }
        };
        return ChartLabelCache;
    }());
    exports.ChartLabelCache = ChartLabelCache;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRMYWJlbENhY2hlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0Vmlld1dpZGdldC9jaGFydEV4dGVuc2lvbnMvY2hhcnRMYWJlbENhY2hlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUFBOzs7O09BSUc7SUFDSDtRQUFBO1lBRUksNEJBQTRCO1lBQ3BCLG1CQUFjLEdBQUcsRUFBRSxDQUFDO1FBa0RoQyxDQUFDO1FBaERHOzs7Ozs7O1dBT0c7UUFDSCxxQ0FBVyxHQUFYLFVBQVksSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJO1lBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFO2dCQUN0QixJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQzthQUM1QjtpQkFBSztnQkFDRixJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO29CQUN0QyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTt3QkFDakQsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFOzRCQUM5RCxJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDOzRCQUMzRixPQUFPLGdCQUFnQixDQUFDO3lCQUMzQjtxQkFDSjtpQkFDSjthQUNKO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSCx1Q0FBYSxHQUFiLFVBQWMsSUFBVyxFQUFFLFFBQWUsRUFBRSxJQUFJLEVBQUUsTUFBTTtZQUNwRCxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQ3ZDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUMsQ0FBQzthQUN4RTtZQUVELElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ2xELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFDLENBQUM7YUFDM0U7WUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDL0Qsc0ZBQXNGO2dCQUN0RixNQUFNLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLEdBQUMsR0FBRyxDQUFDO2dCQUNoQyxzTEFBc0w7Z0JBQ3RMLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLENBQUM7YUFDbEY7UUFDTCxDQUFDO1FBRUwsc0JBQUM7SUFBRCxDQUFDLEFBckRELElBcURDO0lBRU8sMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogSW1wbGVtZW50cyBjYWNoaW5nIGZvciBjaGFydCBsYWJlbCB0ZXh0IHNpemVzIC4uLi5cclxuICpcclxuICogQGNsYXNzIENoYXJ0TGFiZWxDYWNoZVxyXG4gKi9cclxuY2xhc3MgQ2hhcnRMYWJlbENhY2hlIHtcclxuXHJcbiAgICAvLyBob2xkcyB0aGUgdGV4dCBzaXplIGNhY2hlXHJcbiAgICBwcml2YXRlIF90ZXh0U2l6ZUNhY2hlID0ge307XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSB0ZXh0IHNpemUgZm9yIHRoZSByZXF1ZXN0ZWQgdGV4dCBhbmQgZm9udFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gdGV4dFxyXG4gICAgICogQHBhcmFtIHsqfSBtYXh3aWR0aFxyXG4gICAgICogQHBhcmFtIHsqfSBmb250XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRMYWJlbENhY2hlXHJcbiAgICAgKi9cclxuICAgIGdldFRleHRTaXplKHRleHQsIG1heHdpZHRoLCBmb250KXtcclxuICAgICAgICBpZiAoIXRoaXMuX3RleHRTaXplQ2FjaGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fdGV4dFNpemVDYWNoZSA9IHt9O1xyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3RleHRTaXplQ2FjaGVbZm9udC5mb250RmFtaWx5XSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3RleHRTaXplQ2FjaGVbZm9udC5mb250RmFtaWx5XVtmb250LnNpemVdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3RleHRTaXplQ2FjaGVbZm9udC5mb250RmFtaWx5XVtmb250LnNpemVdW3RleHQubGVuZ3RoXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2FjaGVkVGV4dEJvdW5kcyA9IHRoaXMuX3RleHRTaXplQ2FjaGVbZm9udC5mb250RmFtaWx5XVtmb250LnNpemVdW3RleHQubGVuZ3RoXS5ib3VuZHM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWNoZWRUZXh0Qm91bmRzOyAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfSAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FjaGVzIHRoZSB0ZXh0IHNpemUgZm9yIHRoZSBzcGVjZWZpZWQgdGV4dCBhbmQgZm9udFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gdGV4dFxyXG4gICAgICogQHBhcmFtIHsqfSBtYXh3aWR0aFxyXG4gICAgICogQHBhcmFtIHsqfSBmb250XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRMYWJlbENhY2hlXHJcbiAgICAgKi9cclxuICAgIGNhY2hlVGV4dFNpemUodGV4dDpzdHJpbmcsIG1heHdpZHRoOm51bWJlciwgZm9udCwgYm91bmRzKXtcclxuICAgICAgICBpZiAoIXRoaXMuX3RleHRTaXplQ2FjaGVbZm9udC5mb250RmFtaWx5XSkge1xyXG4gICAgICAgICAgICB0aGlzLl90ZXh0U2l6ZUNhY2hlW2ZvbnQuZm9udEZhbWlseV0gPSB7Zm9udEZhbWlseTogZm9udC5mb250RmFtaWx5fTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5fdGV4dFNpemVDYWNoZVtmb250LmZvbnRGYW1pbHldW2ZvbnQuc2l6ZV0pIHtcclxuICAgICAgICAgICAgdGhpcy5fdGV4dFNpemVDYWNoZVtmb250LmZvbnRGYW1pbHldW2ZvbnQuc2l6ZV0gPSB7Zm9udFNpemU6IGZvbnQuc2l6ZX07ICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuX3RleHRTaXplQ2FjaGVbZm9udC5mb250RmFtaWx5XVtmb250LnNpemVdW3RleHQubGVuZ3RoXSkge1xyXG4gICAgICAgICAgICAvLyByZXNlcnZlciBzb21lIGFkZGl0aW9uYWwgc3BhY2UgaW4gd2lkdGggYmVjYXVzZSB0aGUgY2FjaGUganVzdCB1c2VzIHRoZSB0ZXh0IGxlbmd0aFxyXG4gICAgICAgICAgICBib3VuZHMud2lkdGggPSBib3VuZHMud2lkdGgqMS4yO1xyXG4gICAgICAgICAgICAvLyBzdG9yZSB0aGUgYm91bmRzIHdpdGggdGhlIHRleHQgbGVuZ2h0IGFzIGtleS4gS2VlcCBpbiBtaW5kIHRoYXQgdGhpcyBub3Qgc3RyaWN0bHkgZXhhY3QgYmVjYXVzZSBkaWZmZXJlbnQgdGV4dCBjb250ZW50IHdpdGggdGhlIHNhbWUgbGVuZ3RoIGNvdWxkIHJlc3VsdCBpbiBkaWZmZXJlbnQgdGV4dCBib3VuZHMgIVxyXG4gICAgICAgICAgICB0aGlzLl90ZXh0U2l6ZUNhY2hlW2ZvbnQuZm9udEZhbWlseV1bZm9udC5zaXplXVt0ZXh0Lmxlbmd0aF0gPSB7Ym91bmRzOmJvdW5kc307ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IHtDaGFydExhYmVsQ2FjaGV9OyJdfQ==