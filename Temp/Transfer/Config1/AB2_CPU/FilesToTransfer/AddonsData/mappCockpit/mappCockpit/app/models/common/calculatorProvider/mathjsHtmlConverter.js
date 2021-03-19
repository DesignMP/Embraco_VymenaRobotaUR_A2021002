define(["require", "exports", "../../../libs/math/mathjs"], function (require, exports, math) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Helper class for calculator to convert the value to html and back with mathjs.
     *
     * @class MathjsHtmlConverter
     */
    var MathjsHtmlConverter = /** @class */ (function () {
        /**
         *Creates an instance of MathjsHtmlConverter.
         * @param {string} [ignoredValue=""] for ignored value the converter don't execute
         * @memberof MathjsHtmlConverter
         */
        function MathjsHtmlConverter(ignoredValue) {
            if (ignoredValue === void 0) { ignoredValue = ""; }
            this._ignoredValue = ignoredValue;
        }
        /**
         * Convert text formular to HTML code
         *
         * @public
         * @static
         * @param {string} value
         * @returns {string}
         * @memberof MathjsHtmlConverter
         */
        MathjsHtmlConverter.prototype.getValueFromRawValue = function (rawValue) {
            if (this._ignoredValue !== rawValue) {
                try {
                    var code = math.parse(rawValue);
                    //Transform to html string for user output
                    var nodeHTML = code.toHTML();
                    //Add the color information to the html transformed formular
                    rawValue = MathjsHtmlConverter.htmlColorCode + nodeHTML;
                }
                catch (error) {
                    //If an error occure while parsing then give back the unchanged htmlValue
                    return rawValue;
                }
            }
            return rawValue;
        };
        //Color information for html output
        MathjsHtmlConverter.htmlColorCode = "<style> \n            .math-number, .math-imaginary-symbol{ \n                color: #006666; \n                font-family: monospace; \n            } \n            .math-string{ \n                color: #990000; \n                font-family: monospace; \n            } \n            .math-symbol, .math-boolean, .math-undefined, .math-null-symbol, .math-nan-symbol, .math-infinity-symbol{ \n                color: black; \n                font-family: monospace; \n            } \n            .math-function{ \n                color: purple; \n                font-family: monospace; \n                font-weight: bold; \n            } \n            .math-parameter, .math-property{ \n                color: black; \n                font-family: monospace; \n            } \n            .math-operator, .math-parenthesis, .math-separator{ \n                color: black; \n                font-family: monospace; \n            } \n        </style>";
        return MathjsHtmlConverter;
    }());
    exports.MathjsHtmlConverter = MathjsHtmlConverter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0aGpzSHRtbENvbnZlcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvbWF0aGpzSHRtbENvbnZlcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFJQTs7OztPQUlHO0lBQ0g7UUFxQ0k7Ozs7V0FJRztRQUNILDZCQUFZLFlBQXlCO1lBQXpCLDZCQUFBLEVBQUEsaUJBQXlCO1lBQ2pDLElBQUksQ0FBQyxhQUFhLEdBQUcsWUFBWSxDQUFDO1FBQ3RDLENBQUM7UUFFRDs7Ozs7Ozs7V0FRRztRQUNJLGtEQUFvQixHQUEzQixVQUE0QixRQUFnQjtZQUV4QyxJQUFHLElBQUksQ0FBQyxhQUFhLEtBQUssUUFBUSxFQUFFO2dCQUNoQyxJQUFHO29CQUNDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBRWhDLDBDQUEwQztvQkFDMUMsSUFBSSxRQUFRLEdBQVUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUVwQyw0REFBNEQ7b0JBQzVELFFBQVEsR0FBRyxtQkFBbUIsQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO2lCQUMzRDtnQkFDRCxPQUFPLEtBQUssRUFBRTtvQkFDVix5RUFBeUU7b0JBQ3pFLE9BQU8sUUFBUSxDQUFDO2lCQUNuQjthQUNKO1lBQ0QsT0FBTyxRQUFRLENBQUM7UUFDcEIsQ0FBQztRQXBFRCxtQ0FBbUM7UUFDcEIsaUNBQWEsR0FDeEIseTdCQTBCUyxDQUFDO1FBeUNsQiwwQkFBQztLQUFBLEFBMUVELElBMEVDO0lBMUVZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIG1hdGggZnJvbSAgXCIuLi8uLi8uLi9saWJzL21hdGgvbWF0aGpzXCJcclxuaW1wb3J0IHsgSVZhbHVlQ29udmVydGVyIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy92YWx1ZUNvbnZlcnRlckludGVyZmFjZVwiO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBIZWxwZXIgY2xhc3MgZm9yIGNhbGN1bGF0b3IgdG8gY29udmVydCB0aGUgdmFsdWUgdG8gaHRtbCBhbmQgYmFjayB3aXRoIG1hdGhqcy5cclxuICpcclxuICogQGNsYXNzIE1hdGhqc0h0bWxDb252ZXJ0ZXJcclxuICovXHJcbmV4cG9ydCBjbGFzcyBNYXRoanNIdG1sQ29udmVydGVyIGltcGxlbWVudHMgSVZhbHVlQ29udmVydGVye1xyXG5cclxuXHJcbiAgICBcclxuXHJcbiAgICAvL0NvbG9yIGluZm9ybWF0aW9uIGZvciBodG1sIG91dHB1dFxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgaHRtbENvbG9yQ29kZTogc3RyaW5nID0gXHJcbiAgICAgICAgYDxzdHlsZT4gXHJcbiAgICAgICAgICAgIC5tYXRoLW51bWJlciwgLm1hdGgtaW1hZ2luYXJ5LXN5bWJvbHsgXHJcbiAgICAgICAgICAgICAgICBjb2xvcjogIzAwNjY2NjsgXHJcbiAgICAgICAgICAgICAgICBmb250LWZhbWlseTogbW9ub3NwYWNlOyBcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgLm1hdGgtc3RyaW5neyBcclxuICAgICAgICAgICAgICAgIGNvbG9yOiAjOTkwMDAwOyBcclxuICAgICAgICAgICAgICAgIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7IFxyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAubWF0aC1zeW1ib2wsIC5tYXRoLWJvb2xlYW4sIC5tYXRoLXVuZGVmaW5lZCwgLm1hdGgtbnVsbC1zeW1ib2wsIC5tYXRoLW5hbi1zeW1ib2wsIC5tYXRoLWluZmluaXR5LXN5bWJvbHsgXHJcbiAgICAgICAgICAgICAgICBjb2xvcjogYmxhY2s7IFxyXG4gICAgICAgICAgICAgICAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTsgXHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIC5tYXRoLWZ1bmN0aW9ueyBcclxuICAgICAgICAgICAgICAgIGNvbG9yOiBwdXJwbGU7IFxyXG4gICAgICAgICAgICAgICAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTsgXHJcbiAgICAgICAgICAgICAgICBmb250LXdlaWdodDogYm9sZDsgXHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIC5tYXRoLXBhcmFtZXRlciwgLm1hdGgtcHJvcGVydHl7IFxyXG4gICAgICAgICAgICAgICAgY29sb3I6IGJsYWNrOyBcclxuICAgICAgICAgICAgICAgIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7IFxyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAubWF0aC1vcGVyYXRvciwgLm1hdGgtcGFyZW50aGVzaXMsIC5tYXRoLXNlcGFyYXRvcnsgXHJcbiAgICAgICAgICAgICAgICBjb2xvcjogYmxhY2s7IFxyXG4gICAgICAgICAgICAgICAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTsgXHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgPC9zdHlsZT5gO1xyXG5cclxuICAgIHByaXZhdGUgX2lnbm9yZWRWYWx1ZTogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICpDcmVhdGVzIGFuIGluc3RhbmNlIG9mIE1hdGhqc0h0bWxDb252ZXJ0ZXIuXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW2lnbm9yZWRWYWx1ZT1cIlwiXSBmb3IgaWdub3JlZCB2YWx1ZSB0aGUgY29udmVydGVyIGRvbid0IGV4ZWN1dGVcclxuICAgICAqIEBtZW1iZXJvZiBNYXRoanNIdG1sQ29udmVydGVyXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGlnbm9yZWRWYWx1ZTogc3RyaW5nID0gXCJcIil7XHJcbiAgICAgICAgdGhpcy5faWdub3JlZFZhbHVlID0gaWdub3JlZFZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29udmVydCB0ZXh0IGZvcm11bGFyIHRvIEhUTUwgY29kZVxyXG4gICAgICpcclxuICAgICAqIEBwdWJsaWNcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBNYXRoanNIdG1sQ29udmVydGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRWYWx1ZUZyb21SYXdWYWx1ZShyYXdWYWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLl9pZ25vcmVkVmFsdWUgIT09IHJhd1ZhbHVlKSB7ICAgICAgICAgICBcclxuICAgICAgICAgICAgdHJ5eyAgIFxyXG4gICAgICAgICAgICAgICAgbGV0IGNvZGUgPSBtYXRoLnBhcnNlKHJhd1ZhbHVlKTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgLy9UcmFuc2Zvcm0gdG8gaHRtbCBzdHJpbmcgZm9yIHVzZXIgb3V0cHV0XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZUhUTUw6c3RyaW5nID0gY29kZS50b0hUTUwoKTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgLy9BZGQgdGhlIGNvbG9yIGluZm9ybWF0aW9uIHRvIHRoZSBodG1sIHRyYW5zZm9ybWVkIGZvcm11bGFyXHJcbiAgICAgICAgICAgICAgICByYXdWYWx1ZSA9IE1hdGhqc0h0bWxDb252ZXJ0ZXIuaHRtbENvbG9yQ29kZSArIG5vZGVIVE1MO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgLy9JZiBhbiBlcnJvciBvY2N1cmUgd2hpbGUgcGFyc2luZyB0aGVuIGdpdmUgYmFjayB0aGUgdW5jaGFuZ2VkIGh0bWxWYWx1ZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJhd1ZhbHVlOyAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJhd1ZhbHVlOyAgICBcclxuICAgIH1cclxufSJdfQ==