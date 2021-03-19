define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ChartViewSeries = /** @class */ (function () {
        function ChartViewSeries(serie, scale) {
            this.serie = serie;
        }
        Object.defineProperty(ChartViewSeries.prototype, "id", {
            get: function () {
                return this.serie.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartViewSeries.prototype, "minY", {
            get: function () {
                return this.serie.minY;
            },
            set: function (value) {
                this.serie.minY = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartViewSeries.prototype, "maxY", {
            get: function () {
                return this.serie.maxY;
            },
            set: function (value) {
                this.serie.maxY = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartViewSeries.prototype, "minX", {
            get: function () {
                return this.serie.minX;
            },
            set: function (value) {
                this.serie.minX = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartViewSeries.prototype, "maxX", {
            get: function () {
                return this.serie.maxX;
            },
            set: function (value) {
                this.serie.maxX = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartViewSeries.prototype, "rawPoints", {
            get: function () {
                return this.serie.rawPoints;
            },
            set: function (value) {
                this.serie.rawPoints = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartViewSeries.prototype, "color", {
            get: function () {
                return this.serie.color;
            },
            set: function (value) {
                this.serie.color = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartViewSeries.prototype, "calculationDataInfo", {
            get: function () {
                return this.serie.calculationDataInfo;
            },
            set: function (value) {
                this.serie.calculationDataInfo = value;
            },
            enumerable: true,
            configurable: true
        });
        return ChartViewSeries;
    }());
    exports.ChartViewSerie = ChartViewSeries;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRWaWV3U2VyaWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY2hhcnRXaWRnZXQvY2hhcnRWaWV3U2VyaWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBTUE7UUFJSSx5QkFBYSxLQUFpQixFQUFFLEtBQVk7WUFDeEMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDdkIsQ0FBQztRQUdELHNCQUFJLCtCQUFFO2lCQUFOO2dCQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDekIsQ0FBQzs7O1dBQUE7UUFFRCxzQkFBSSxpQ0FBSTtpQkFBUjtnQkFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1lBQzNCLENBQUM7aUJBRUQsVUFBUyxLQUF1QjtnQkFDNUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1lBQzVCLENBQUM7OztXQUpBO1FBTUQsc0JBQUksaUNBQUk7aUJBQVI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztZQUMzQixDQUFDO2lCQUVELFVBQVMsS0FBdUI7Z0JBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztZQUM1QixDQUFDOzs7V0FKQTtRQU1ELHNCQUFJLGlDQUFJO2lCQUFSO2dCQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFDM0IsQ0FBQztpQkFFRCxVQUFTLEtBQXVCO2dCQUM1QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7WUFDNUIsQ0FBQzs7O1dBSkE7UUFNRCxzQkFBSSxpQ0FBSTtpQkFBUjtnQkFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1lBQzNCLENBQUM7aUJBRUQsVUFBUyxLQUF1QjtnQkFDNUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1lBQzVCLENBQUM7OztXQUpBO1FBTUQsc0JBQUksc0NBQVM7aUJBQWI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztZQUNoQyxDQUFDO2lCQUVELFVBQWMsS0FBaUI7Z0JBQzNCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUNqQyxDQUFDOzs7V0FKQTtRQU1ELHNCQUFJLGtDQUFLO2lCQUFUO2dCQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7WUFDNUIsQ0FBQztpQkFFRCxVQUFXLEtBQWM7Z0JBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUM3QixDQUFDOzs7V0FKQTtRQU1ELHNCQUFJLGdEQUFtQjtpQkFBdkI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDO1lBQzFDLENBQUM7aUJBRUQsVUFBd0IsS0FBcUM7Z0JBQ3pELElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDO1lBQzNDLENBQUM7OztXQUpBO1FBTUwsc0JBQUM7SUFBRCxDQUFDLEFBckVELElBcUVDO0lBRTBCLHlDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZVNlcmllcyB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2Jhc2VTZXJpZXNcIjtcclxuaW1wb3J0IHsgU2NhbGUgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9zY2FsZVwiO1xyXG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbW1vbi9pbnRlcmZhY2VzL3BvaW50SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YUluZm8gfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRpb25EYXRhSW5mb1wiO1xyXG5cclxuXHJcbmNsYXNzIENoYXJ0Vmlld1Nlcmllc3tcclxuXHJcbiAgICBwdWJsaWMgc2VyaWUgOiBCYXNlU2VyaWVzO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yIChzZXJpZTogQmFzZVNlcmllcywgc2NhbGU6IFNjYWxlKXtcclxuICAgICAgICB0aGlzLnNlcmllID0gc2VyaWU7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGdldCBpZCgpIDogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZXJpZS5pZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbWluWSgpIDogbnVtYmVyfHVuZGVmaW5lZHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZXJpZS5taW5ZO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBtaW5ZKHZhbHVlOiBudW1iZXJ8dW5kZWZpbmVkKXtcclxuICAgICAgICB0aGlzLnNlcmllLm1pblkgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbWF4WSgpIDogbnVtYmVyfHVuZGVmaW5lZHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZXJpZS5tYXhZO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBtYXhZKHZhbHVlOiBudW1iZXJ8dW5kZWZpbmVkKXtcclxuICAgICAgICB0aGlzLnNlcmllLm1heFkgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbWluWCgpIDogbnVtYmVyfHVuZGVmaW5lZHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZXJpZS5taW5YO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBtaW5YKHZhbHVlOiBudW1iZXJ8dW5kZWZpbmVkKXtcclxuICAgICAgICB0aGlzLnNlcmllLm1pblggPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbWF4WCgpIDogbnVtYmVyfHVuZGVmaW5lZHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZXJpZS5tYXhYO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBtYXhYKHZhbHVlOiBudW1iZXJ8dW5kZWZpbmVkKXtcclxuICAgICAgICB0aGlzLnNlcmllLm1heFggPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcmF3UG9pbnRzKCkgOiBJUG9pbnQgW117XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VyaWUucmF3UG9pbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCByYXdQb2ludHModmFsdWUgOiBJUG9pbnQgW10pe1xyXG4gICAgICAgIHRoaXMuc2VyaWUucmF3UG9pbnRzID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGNvbG9yICgpIDogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNlcmllLmNvbG9yO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBjb2xvciAodmFsdWUgOiBzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMuc2VyaWUuY29sb3IgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY2FsY3VsYXRpb25EYXRhSW5mbygpIDogQ2FsY3VsYXRpb25EYXRhSW5mb3x1bmRlZmluZWR7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VyaWUuY2FsY3VsYXRpb25EYXRhSW5mbztcclxuICAgIH1cclxuXHJcbiAgICBzZXQgY2FsY3VsYXRpb25EYXRhSW5mbyh2YWx1ZSA6IENhbGN1bGF0aW9uRGF0YUluZm98dW5kZWZpbmVkKXtcclxuICAgICAgICB0aGlzLnNlcmllLmNhbGN1bGF0aW9uRGF0YUluZm8gPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCB7Q2hhcnRWaWV3U2VyaWVzIGFzIENoYXJ0Vmlld1NlcmllfSJdfQ==