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
define(["require", "exports", "../../framework/events", "./chartManagerChart", "./seriesType"], function (require, exports, events_1, chartManagerChart_1, seriesType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventScaleDataChanged = /** @class */ (function (_super) {
        __extends(EventScaleDataChanged, _super);
        function EventScaleDataChanged() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventScaleDataChanged;
    }(events_1.TypedEvent));
    ;
    var Scale = /** @class */ (function () {
        /**
         * Creates an instance of Scale.
         * @param {string} id
         * @memberof Scale
         */
        function Scale(id, parent) {
            this.dropPossible = false;
            this.draggedOver = false;
            this.expandState = true;
            this.uniqueId = 0;
            this._minYValue = 0;
            this._maxYValue = 100;
            this._minXValue = 0;
            this._maxXValue = 100;
            this._xValue = [0, 100];
            this.eventDataChanged = new EventScaleDataChanged();
            this.parent = parent;
            this.id = id;
            this.name = 'Scale';
            this.description = "";
            this.childs = new Array();
            this.isDisabled = false;
        }
        Object.defineProperty(Scale.prototype, "minYValue", {
            get: function () {
                return this._minYValue;
            },
            set: function (value) {
                this._minYValue = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scale.prototype, "maxYValue", {
            get: function () {
                return this._maxYValue;
            },
            set: function (value) {
                this._maxYValue = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scale.prototype, "minXValue", {
            get: function () {
                return this._minXValue;
            },
            set: function (value) {
                if (value != this._minXValue) {
                    this._minXValue = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scale.prototype, "maxXValue", {
            get: function () {
                return this._maxXValue;
            },
            set: function (value) {
                if (value != this._maxXValue) {
                    this._maxXValue = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scale.prototype, "xValue", {
            get: function () {
                return this._xValue;
            },
            set: function (value) {
                this._xValue = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scale.prototype, "iconDefinition", {
            get: function () {
                var iconDefinition = "";
                var classNames = "e-treegridcollapse treegridcollapse";
                // Add collapse/expand icon 
                if (this.expandState == true) {
                    classNames += "e-treegridexpand treegridexpand";
                }
                iconDefinition += "<div class='" + classNames + "'></div>";
                return iconDefinition;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Add series to scale
         *
         * @param {Array<BaseSeries>} series
         * @memberof Scale
         */
        Scale.prototype.addSeries = function (series) {
            for (var i = 0; i < series.length; i++) {
                this.childs.push(series[i]);
            }
        };
        /**
         *
         *
         * @param {BaseSeries} serie
         * @returns {boolean}
         * @memberof Scale
         */
        Scale.prototype.removeSerie = function (serie) {
            var index = -1;
            for (var i = 0; i < this.childs.length; i++) {
                if (this.childs[i] == serie) {
                    index = i;
                    break;
                }
            }
            if (index > -1) {
                this.childs.splice(index, 1);
                return true;
            }
            return false;
        };
        /**
         * Returns the number of signals that are already in the chart (including implicit signals)
         *
         * @param {Array<BaseSeries>} data
         * @returns {number}
         * @memberof Scale
         */
        Scale.prototype.hasSeries = function (data) {
            var index = 0;
            for (var i = 0; i < this.childs.length; i++) {
                for (var j = 0; j < data.length; j++) {
                    //Check if dropped serie is already used in a calculated serie that is inside the chart
                    index = this.isSerieInCalculation(this.childs[i], data[j], index);
                    if (this.childs[i] == data[j]) {
                        index = index + 1;
                        break;
                    }
                }
            }
            return index;
        };
        /**
         * Returns true if the signal is in the scale
         *
         * @param {BaseSeries} serie
         * @returns {boolean}
         * @memberof Scale
         */
        Scale.prototype.hasExactSerie = function (serie) {
            for (var i = 0; i < this.childs.length; i++) {
                if (this.childs[i] == serie) {
                    return true;
                }
            }
            return false;
        };
        Scale.prototype.isSerieInCalculation = function (serieInScale, serie, index) {
            //So far used just for FFT charts
            if (this.parent.chartType == chartManagerChart_1.ChartType.FFTChart && serie.type == seriesType_1.SeriesType.timeSeries) {
                if (serieInScale.calculationDataInfo.inputSeries[0] == serie) {
                    index = index + 1;
                }
            }
            return index;
        };
        Scale.prototype.getChilds = function () {
            var series = [];
            for (var i = 0; i < this.childs.length; i++) {
                series.push(this.childs[i]);
            }
            return series;
        };
        /**
         * Sets the chart disabled or enabled
         *
         * @param {boolean} disabled
         * @memberof Scale
         */
        Scale.prototype.setDisabled = function (disabled) {
            this.isDisabled = disabled;
        };
        return Scale;
    }());
    exports.Scale = Scale;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NhbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvc2NhbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVFBO1FBQW9DLHlDQUE2QztRQUFqRjs7UUFBbUYsQ0FBQztRQUFELDRCQUFDO0lBQUQsQ0FBQyxBQUFwRixDQUFvQyxtQkFBVSxHQUFzQztJQUFBLENBQUM7SUFHckY7UUF1Qkk7Ozs7V0FJRztRQUNILGVBQVksRUFBVSxFQUFFLE1BQTBCO1lBckJsRCxpQkFBWSxHQUFZLEtBQUssQ0FBQztZQUM5QixnQkFBVyxHQUFZLEtBQUssQ0FBQztZQUM3QixnQkFBVyxHQUFZLElBQUksQ0FBQztZQUM1QixhQUFRLEdBQVcsQ0FBQyxDQUFDO1lBRWIsZUFBVSxHQUFHLENBQUMsQ0FBQztZQUNmLGVBQVUsR0FBRyxHQUFHLENBQUM7WUFFakIsZUFBVSxHQUFHLENBQUMsQ0FBQztZQUNmLGVBQVUsR0FBRyxHQUFHLENBQUM7WUFFakIsWUFBTyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBRTNCLHFCQUFnQixHQUEwQixJQUFJLHFCQUFxQixFQUFFLENBQUM7WUFTbEUsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDckIsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7WUFDYixJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQTtZQUNuQixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztZQUN0QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksS0FBSyxFQUFjLENBQUM7WUFDdEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDNUIsQ0FBQztRQUVELHNCQUFJLDRCQUFTO2lCQUFiO2dCQUNJLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUMzQixDQUFDO2lCQUVE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Q0FBQztRQUNqQixDQUFDO1FBRUQseUJBQVMsR0FBVDtZQUNJLElBQUksTUFBTSxHQUFpQixFQUFFLENBQUM7WUFDOUIsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUN2QyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMvQjtZQUNELE9BQU8sTUFBTSxDQUFDO1FBQ2xCLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNILDJCQUFXLEdBQVgsVUFBWSxRQUFpQjtZQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQztRQUMvQixDQUFDO1FBQ0wsWUFBQztJQUFELENBQUMsQUFsTUQsSUFrTUM7SUFsTVksc0JBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4vYmFzZVNlcmllc1wiO1xyXG5pbXBvcnQgeyBJU2NhbGUgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL3NjYWxlSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElDaGFydE1hbmFnZXJDaGFydCB9IGZyb20gXCIuL2ludGVyZmFjZXMvY2hhcnRNYW5hZ2VyQ2hhcnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvZXZlbnRzXCI7XHJcbmltcG9ydCB7IEV2ZW50U2NhbGVEYXRhQ2hhbmdlZEFyZ3MsIFNjYWxlQWN0aW9uIH0gZnJvbSBcIi4vZXZlbnRTY2FsZURhdGFDaGFuZ2VkQXJnc1wiO1xyXG5pbXBvcnQgeyBDaGFydFR5cGUgfSBmcm9tIFwiLi9jaGFydE1hbmFnZXJDaGFydFwiO1xyXG5pbXBvcnQgeyBTZXJpZXNUeXBlIH0gZnJvbSBcIi4vc2VyaWVzVHlwZVwiO1xyXG5cclxuY2xhc3MgRXZlbnRTY2FsZURhdGFDaGFuZ2VkIGV4dGVuZHMgVHlwZWRFdmVudCA8U2NhbGUsIEV2ZW50U2NhbGVEYXRhQ2hhbmdlZEFyZ3M+eyB9O1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBTY2FsZSBpbXBsZW1lbnRzIElTY2FsZXtcclxuICAgIHBhcmVudDogSUNoYXJ0TWFuYWdlckNoYXJ0O1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgaWQ6IHN0cmluZztcclxuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgICBjaGlsZHM6IEJhc2VTZXJpZXNbXTtcclxuICAgIGlzRGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgICBkcm9wUG9zc2libGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGRyYWdnZWRPdmVyOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBleHBhbmRTdGF0ZTogYm9vbGVhbiA9IHRydWU7XHJcbiAgICB1bmlxdWVJZDogbnVtYmVyID0gMDtcclxuXHJcbiAgICBwcml2YXRlIF9taW5ZVmFsdWUgPSAwO1xyXG4gICAgcHJpdmF0ZSBfbWF4WVZhbHVlID0gMTAwO1xyXG5cclxuICAgIHByaXZhdGUgX21pblhWYWx1ZSA9IDA7XHJcbiAgICBwcml2YXRlIF9tYXhYVmFsdWUgPSAxMDA7XHJcblxyXG4gICAgcHJpdmF0ZSBfeFZhbHVlID0gWzAsIDEwMF07XHJcblxyXG4gICAgZXZlbnREYXRhQ2hhbmdlZDogRXZlbnRTY2FsZURhdGFDaGFuZ2VkID0gbmV3IEV2ZW50U2NhbGVEYXRhQ2hhbmdlZCgpO1xyXG5cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFNjYWxlLlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICAgKiBAbWVtYmVyb2YgU2NhbGVcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoaWQ6IHN0cmluZywgcGFyZW50OiBJQ2hhcnRNYW5hZ2VyQ2hhcnQpe1xyXG4gICAgICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgICAgICB0aGlzLm5hbWUgPSAnU2NhbGUnXHJcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5jaGlsZHMgPSBuZXcgQXJyYXk8QmFzZVNlcmllcz4oKTtcclxuICAgICAgICB0aGlzLmlzRGlzYWJsZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbWluWVZhbHVlKCk6IG51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWluWVZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBtaW5ZVmFsdWUodmFsdWU6IG51bWJlcil7XHJcbiAgICAgICAgdGhpcy5fbWluWVZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG1heFlWYWx1ZSgpOiBudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21heFlWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgbWF4WVZhbHVlKHZhbHVlOiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuX21heFlWYWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBtaW5YVmFsdWUoKTogbnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9taW5YVmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IG1pblhWYWx1ZSh2YWx1ZTogbnVtYmVyKXtcclxuICAgICAgICBpZih2YWx1ZSAhPSB0aGlzLl9taW5YVmFsdWUpe1xyXG4gICAgICAgICAgICB0aGlzLl9taW5YVmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG1heFhWYWx1ZSgpOiBudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21heFhWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgbWF4WFZhbHVlKHZhbHVlOiBudW1iZXIpe1xyXG4gICAgICAgIGlmKHZhbHVlICE9IHRoaXMuX21heFhWYWx1ZSl7XHJcbiAgICAgICAgICAgIHRoaXMuX21heFhWYWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXQgeFZhbHVlKCkgOiBudW1iZXJbXXtcclxuICAgICAgICByZXR1cm4gdGhpcy5feFZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCB4VmFsdWUoIHZhbHVlIDpudW1iZXJbXSl7XHJcbiAgICAgICAgdGhpcy5feFZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBpY29uRGVmaW5pdGlvbigpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBpY29uRGVmaW5pdGlvbiA9IFwiXCI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGNsYXNzTmFtZXMgPSBcImUtdHJlZWdyaWRjb2xsYXBzZSB0cmVlZ3JpZGNvbGxhcHNlXCI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gQWRkIGNvbGxhcHNlL2V4cGFuZCBpY29uIFxyXG4gICAgICAgIGlmKHRoaXMuZXhwYW5kU3RhdGUgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZXMgKz0gXCJlLXRyZWVncmlkZXhwYW5kIHRyZWVncmlkZXhwYW5kXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGljb25EZWZpbml0aW9uICs9IGA8ZGl2IGNsYXNzPSdgICsgY2xhc3NOYW1lcyArIGAnPjwvZGl2PmA7XHJcbiAgICAgICAgcmV0dXJuIGljb25EZWZpbml0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIHNlcmllcyB0byBzY2FsZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8QmFzZVNlcmllcz59IHNlcmllc1xyXG4gICAgICogQG1lbWJlcm9mIFNjYWxlXHJcbiAgICAgKi9cclxuICAgIGFkZFNlcmllcyhzZXJpZXM6IEFycmF5PEJhc2VTZXJpZXM+KXtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNlcmllcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIHRoaXMuY2hpbGRzLnB1c2goc2VyaWVzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIFNjYWxlXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZVNlcmllKHNlcmllOiBCYXNlU2VyaWVzKTogYm9vbGVhbntcclxuICAgICAgICBsZXQgaW5kZXggPSAtMTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZih0aGlzLmNoaWxkc1tpXSA9PSBzZXJpZSl7XHJcbiAgICAgICAgICAgICAgICBpbmRleCA9IGk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLmNoaWxkcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIHNpZ25hbHMgdGhhdCBhcmUgYWxyZWFkeSBpbiB0aGUgY2hhcnQgKGluY2x1ZGluZyBpbXBsaWNpdCBzaWduYWxzKVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8QmFzZVNlcmllcz59IGRhdGFcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2NhbGVcclxuICAgICAqL1xyXG4gICAgaGFzU2VyaWVzKGRhdGE6IEFycmF5PEJhc2VTZXJpZXM+KTogbnVtYmVye1xyXG4gICAgICAgIGxldCBpbmRleCA9IDA7IFxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBkYXRhLmxlbmd0aDsgaisrKXtcclxuICAgICAgICAgICAgICAgIC8vQ2hlY2sgaWYgZHJvcHBlZCBzZXJpZSBpcyBhbHJlYWR5IHVzZWQgaW4gYSBjYWxjdWxhdGVkIHNlcmllIHRoYXQgaXMgaW5zaWRlIHRoZSBjaGFydFxyXG4gICAgICAgICAgICAgICAgaW5kZXggPSB0aGlzLmlzU2VyaWVJbkNhbGN1bGF0aW9uKHRoaXMuY2hpbGRzW2ldLCBkYXRhW2pdLCBpbmRleCk7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmNoaWxkc1tpXSA9PSBkYXRhW2pdKXtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IGluZGV4ICsgMTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpbmRleDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgc2lnbmFsIGlzIGluIHRoZSBzY2FsZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIFNjYWxlXHJcbiAgICAgKi9cclxuICAgIGhhc0V4YWN0U2VyaWUoc2VyaWU6IEJhc2VTZXJpZXMpOiBib29sZWFuIHtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZih0aGlzLmNoaWxkc1tpXSA9PSBzZXJpZSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaXNTZXJpZUluQ2FsY3VsYXRpb24oc2VyaWVJblNjYWxlLCBzZXJpZSwgaW5kZXgpIHtcclxuICAgICAgICAvL1NvIGZhciB1c2VkIGp1c3QgZm9yIEZGVCBjaGFydHNcclxuICAgICAgICBpZih0aGlzLnBhcmVudC5jaGFydFR5cGUgPT0gQ2hhcnRUeXBlLkZGVENoYXJ0ICYmIHNlcmllLnR5cGUgPT0gU2VyaWVzVHlwZS50aW1lU2VyaWVzKXtcclxuICAgICAgICAgICAgaWYoc2VyaWVJblNjYWxlLmNhbGN1bGF0aW9uRGF0YUluZm8uaW5wdXRTZXJpZXNbMF0gPT0gc2VyaWUpe1xyXG4gICAgICAgICAgICAgICAgaW5kZXggPSBpbmRleCArIDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IFxyXG4gICAgICAgIHJldHVybiBpbmRleDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDaGlsZHMoKSB7XHJcbiAgICAgICAgbGV0IHNlcmllczogQmFzZVNlcmllc1tdID0gW107XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgc2VyaWVzLnB1c2godGhpcy5jaGlsZHNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2VyaWVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgY2hhcnQgZGlzYWJsZWQgb3IgZW5hYmxlZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZGlzYWJsZWRcclxuICAgICAqIEBtZW1iZXJvZiBTY2FsZVxyXG4gICAgICovXHJcbiAgICBzZXREaXNhYmxlZChkaXNhYmxlZDogYm9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5pc0Rpc2FibGVkID0gZGlzYWJsZWQ7XHJcbiAgICB9XHJcbn0iXX0=