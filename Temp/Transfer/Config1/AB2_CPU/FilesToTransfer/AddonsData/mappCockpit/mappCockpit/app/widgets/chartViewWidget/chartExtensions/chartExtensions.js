define(["require", "exports", "./chartDataOptimizer", "./chartLabelCache", "./chartRenderOptimizer"], function (require, exports, chartDataOptimizer_1, chartLabelCache_1, chartRenderOptimizer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Implements chart extensions and optimizations
     *
     * @class ChartExtensions
     */
    var ChartExtensions = /** @class */ (function () {
        /**
         * Creates an instance of ChartExtensions.
         * @memberof ChartExtensions
         */
        function ChartExtensions(seriesProvider) {
            this._chartDataOptimizer = new chartDataOptimizer_1.ChartDataOptimizer(seriesProvider);
            this._chartLabelCache = new chartLabelCache_1.ChartLabelCache();
            this._chartRenderOptimizer = new chartRenderOptimizer_1.ChartRenderOptimizer();
        }
        Object.defineProperty(ChartExtensions.prototype, "chartDataOptimizer", {
            /**
             * Gets the chart data optimizer
             *
             * @readonly
             * @type {ChartDataOptimizer}
             * @memberof ChartExtensions
             */
            get: function () {
                return this._chartDataOptimizer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartExtensions.prototype, "chartLabelCache", {
            /**
             * Gets the chart label cache
             *
             * @readonly
             * @type {ChartLabelCache}
             * @memberof ChartExtensions
             */
            get: function () {
                return this._chartLabelCache;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartExtensions.prototype, "chartRenderOptimizer", {
            /**
             * Gets the chart render optimizer
             *
             * @readonly
             * @type {ChartRenderOptimizer}
             * @memberof ChartExtensions
             */
            get: function () {
                return this._chartRenderOptimizer;
            },
            enumerable: true,
            configurable: true
        });
        return ChartExtensions;
    }());
    exports.ChartExtensions = ChartExtensions;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRFeHRlbnNpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0Vmlld1dpZGdldC9jaGFydEV4dGVuc2lvbnMvY2hhcnRFeHRlbnNpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUlBOzs7O09BSUc7SUFDSDtRQU9JOzs7V0FHRztRQUNILHlCQUFZLGNBQW9DO1lBQzVDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLHVDQUFrQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ2xFLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLGlDQUFlLEVBQUUsQ0FBQztZQUM5QyxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSwyQ0FBb0IsRUFBRSxDQUFDO1FBQzVELENBQUM7UUFVRCxzQkFBVywrQ0FBa0I7WUFQN0I7Ozs7OztlQU1HO2lCQUNIO2dCQUNJLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDO1lBQ3BDLENBQUM7OztXQUFBO1FBU0Qsc0JBQVcsNENBQWU7WUFQMUI7Ozs7OztlQU1HO2lCQUNIO2dCQUNJLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDO1lBQ2pDLENBQUM7OztXQUFBO1FBU0Qsc0JBQVcsaURBQW9CO1lBUC9COzs7Ozs7ZUFNRztpQkFDSDtnQkFDSSxPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQztZQUN0QyxDQUFDOzs7V0FBQTtRQUNMLHNCQUFDO0lBQUQsQ0FBQyxBQWxERCxJQWtEQztJQUVPLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhcnREYXRhT3B0aW1pemVyLCBJQ2hhcnRTZXJpZXNQcm92aWRlciB9IGZyb20gXCIuL2NoYXJ0RGF0YU9wdGltaXplclwiO1xyXG5pbXBvcnQgeyBDaGFydExhYmVsQ2FjaGUgfSBmcm9tIFwiLi9jaGFydExhYmVsQ2FjaGVcIjtcclxuaW1wb3J0IHtDaGFydFJlbmRlck9wdGltaXplcn0gZnJvbSBcIi4vY2hhcnRSZW5kZXJPcHRpbWl6ZXJcIjtcclxuXHJcbi8qKlxyXG4gKiBJbXBsZW1lbnRzIGNoYXJ0IGV4dGVuc2lvbnMgYW5kIG9wdGltaXphdGlvbnNcclxuICpcclxuICogQGNsYXNzIENoYXJ0RXh0ZW5zaW9uc1xyXG4gKi9cclxuY2xhc3MgQ2hhcnRFeHRlbnNpb25zIHtcclxuXHJcbiAgICBwcml2YXRlIF9jaGFydERhdGFPcHRpbWl6ZXI6Q2hhcnREYXRhT3B0aW1pemVyO1xyXG4gICAgcHJpdmF0ZSBfY2hhcnRMYWJlbENhY2hlOkNoYXJ0TGFiZWxDYWNoZTtcclxuICAgIHByaXZhdGUgX2NoYXJ0UmVuZGVyT3B0aW1pemVyOiBDaGFydFJlbmRlck9wdGltaXplclxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQ2hhcnRFeHRlbnNpb25zLlxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0RXh0ZW5zaW9uc1xyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihzZXJpZXNQcm92aWRlcjogSUNoYXJ0U2VyaWVzUHJvdmlkZXIpe1xyXG4gICAgICAgIHRoaXMuX2NoYXJ0RGF0YU9wdGltaXplciA9IG5ldyBDaGFydERhdGFPcHRpbWl6ZXIoc2VyaWVzUHJvdmlkZXIpO1xyXG4gICAgICAgIHRoaXMuX2NoYXJ0TGFiZWxDYWNoZSA9IG5ldyBDaGFydExhYmVsQ2FjaGUoKTtcclxuICAgICAgICB0aGlzLl9jaGFydFJlbmRlck9wdGltaXplciA9IG5ldyBDaGFydFJlbmRlck9wdGltaXplcigpO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBjaGFydCBkYXRhIG9wdGltaXplclxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge0NoYXJ0RGF0YU9wdGltaXplcn1cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydEV4dGVuc2lvbnNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBjaGFydERhdGFPcHRpbWl6ZXIoKSA6IENoYXJ0RGF0YU9wdGltaXplciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NoYXJ0RGF0YU9wdGltaXplcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGNoYXJ0IGxhYmVsIGNhY2hlXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7Q2hhcnRMYWJlbENhY2hlfVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0RXh0ZW5zaW9uc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGNoYXJ0TGFiZWxDYWNoZSgpIDogQ2hhcnRMYWJlbENhY2hlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY2hhcnRMYWJlbENhY2hlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgY2hhcnQgcmVuZGVyIG9wdGltaXplclxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge0NoYXJ0UmVuZGVyT3B0aW1pemVyfVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0RXh0ZW5zaW9uc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGNoYXJ0UmVuZGVyT3B0aW1pemVyKCkgOiBDaGFydFJlbmRlck9wdGltaXplcntcclxuICAgICAgICByZXR1cm4gdGhpcy5fY2hhcnRSZW5kZXJPcHRpbWl6ZXI7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7Q2hhcnRFeHRlbnNpb25zfTtcclxuXHJcbiJdfQ==