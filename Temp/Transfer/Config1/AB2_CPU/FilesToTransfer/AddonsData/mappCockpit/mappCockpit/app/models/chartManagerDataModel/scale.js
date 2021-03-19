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
define(["require", "exports", "../../framework/events", "./chartManagerChart", "../common/seriesProvider/seriesProvider", "../../common/persistence/settings"], function (require, exports, events_1, chartManagerChart_1, seriesProvider_1, settings_1) {
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
         * Creates an instance of Scale
         * @param {string} id
         * @memberof Scale
         */
        function Scale(id, parent) {
            this.dropPossible = false;
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
        Scale.prototype.getSettings = function () {
            var settings = new settings_1.Settings("Scale");
            var series = this.getChilds();
            var seriesExport = new Array();
            series.forEach(function (serie) {
                seriesExport.push(serie.id);
            });
            settings.setValue("id", this.id);
            settings.setValue("name", this.name);
            settings.setValue("minXValue", this.minXValue);
            settings.setValue("maxXValue", this.maxXValue);
            settings.setValue("minYValue", this.minYValue);
            settings.setValue("maxYValue", this.maxYValue);
            settings.setValue("seriesIds", seriesExport);
            return settings;
        };
        Scale.prototype.setSettings = function (settings) {
            var settingsObj = settings_1.Settings.create(settings);
            this.id = settingsObj.getValue("id");
            this.name = settingsObj.getValue("name");
            this.minXValue = settingsObj.getValue("minXValue");
            this.maxXValue = settingsObj.getValue("maxXValue");
            this.minYValue = settingsObj.getValue("minYValue");
            this.maxYValue = settingsObj.getValue("maxYValue");
            // TODO: Set series to scale here and not in chartmanager datamodel
            //this.seriesExport = settingsObj.getData("seriesIds");
        };
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
         * Returns the number of matching series between the ones being dragged and the ones in the scale
         *
         * @param {Array<BaseSeries>} data
         * @returns {number}
         * @memberof Scale
         */
        Scale.prototype.numberOfMatchingSeries = function (data) {
            var index = 0;
            //FFT exception. Avoid to insert same input signal in FFT chart
            var isFFTChart = this.parent.chartType == chartManagerChart_1.ChartType.FFTChart;
            for (var i = 0; i < this.childs.length; i++) {
                for (var j = 0; j < data.length; j++) {
                    if (this.childs[i] == data[j] || (isFFTChart && this.isSerieInCalculation(this.childs[i], data[j]))) {
                        index += 1;
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
        Scale.prototype.hasSerie = function (serie) {
            for (var i = 0; i < this.childs.length; i++) {
                if (this.childs[i] == serie) {
                    return true;
                }
            }
            return false;
        };
        /**
         * Check if serie is already used in a calculated serie that is inside the chart
         *
         * @param {BaseSeries} serieInScale
         * @param {BaseSeries} serie
         * @returns {boolean}
         * @memberof Scale
         */
        Scale.prototype.isSerieInCalculation = function (serieInScale, serie) {
            var calculationDataInfo = serieInScale.calculationDataInfo;
            if (calculationDataInfo != undefined) {
                var serieFromCalculation = seriesProvider_1.SeriesProvider.getInstance().get(calculationDataInfo.inputSeriesIds[0]);
                if (serieFromCalculation == serie) {
                    return true;
                }
            }
            return false;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NhbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvc2NhbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVVBO1FBQW9DLHlDQUE2QztRQUFqRjs7UUFBbUYsQ0FBQztRQUFELDRCQUFDO0lBQUQsQ0FBQyxBQUFwRixDQUFvQyxtQkFBVSxHQUFzQztJQUFBLENBQUM7SUFHckY7UUFzQkk7Ozs7V0FJRztRQUNILGVBQVksRUFBVSxFQUFFLE1BQTBCO1lBcEJsRCxpQkFBWSxHQUFZLEtBQUssQ0FBQztZQUM5QixnQkFBVyxHQUFZLElBQUksQ0FBQztZQUM1QixhQUFRLEdBQVcsQ0FBQyxDQUFDO1lBRWIsZUFBVSxHQUFHLENBQUMsQ0FBQztZQUNmLGVBQVUsR0FBRyxHQUFHLENBQUM7WUFFakIsZUFBVSxHQUFHLENBQUMsQ0FBQztZQUNmLGVBQVUsR0FBRyxHQUFHLENBQUM7WUFFakIsWUFBTyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBRTNCLHFCQUFnQixHQUEwQixJQUFJLHFCQUFxQixFQUFFLENBQUM7WUFTbEUsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDckIsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7WUFDYixJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQTtZQUNuQixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztZQUN0QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksS0FBSyxFQUFjLENBQUM7WUFDdEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDNUIsQ0FBQztRQUVELDJCQUFXLEdBQVg7WUFDSSxJQUFJLFFBQVEsR0FBRyxJQUFJLG1CQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDckMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFD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Q0QsT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSCxvQ0FBb0IsR0FBcEIsVUFBcUIsWUFBd0IsRUFBRSxLQUFpQjtZQUM1RCxJQUFJLG1CQUFtQixHQUFHLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQztZQUMzRCxJQUFHLG1CQUFtQixJQUFJLFNBQVMsRUFBQztnQkFDaEMsSUFBSSxvQkFBb0IsR0FBRywrQkFBYyxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkcsSUFBRyxvQkFBb0IsSUFBSSxLQUFLLEVBQUM7b0JBQzdCLE9BQU8sSUFBSSxDQUFDO2lCQUNmO2FBQ0o7WUFDRCxPQUFPLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBRUQseUJBQVMsR0FBVDtZQUNJLElBQUksTUFBTSxHQUFpQixFQUFFLENBQUM7WUFDOUIsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUN2QyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMvQjtZQUNELE9BQU8sTUFBTSxDQUFDO1FBQ2xCLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNILDJCQUFXLEdBQVgsVUFBWSxRQUFpQjtZQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQztRQUMvQixDQUFDO1FBQ0wsWUFBQztJQUFELENBQUMsQUE5T0QsSUE4T0M7SUE5T1ksc0JBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4vYmFzZVNlcmllc1wiO1xyXG5pbXBvcnQgeyBJU2NhbGUgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL3NjYWxlSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElDaGFydE1hbmFnZXJDaGFydCB9IGZyb20gXCIuL2ludGVyZmFjZXMvY2hhcnRNYW5hZ2VyQ2hhcnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvZXZlbnRzXCI7XHJcbmltcG9ydCB7IEV2ZW50U2NhbGVEYXRhQ2hhbmdlZEFyZ3MgfSBmcm9tIFwiLi9ldmVudFNjYWxlRGF0YUNoYW5nZWRBcmdzXCI7XHJcbmltcG9ydCB7IENoYXJ0VHlwZSB9IGZyb20gXCIuL2NoYXJ0TWFuYWdlckNoYXJ0XCI7XHJcbmltcG9ydCB7IFNlcmllc1Byb3ZpZGVyIH0gZnJvbSBcIi4uL2NvbW1vbi9zZXJpZXNQcm92aWRlci9zZXJpZXNQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBJU2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3BlcnNpc3RlbmNlL2ludGVyZmFjZXMvc2V0dGluZ3NJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3BlcnNpc3RlbmNlL3NldHRpbmdzXCI7XHJcblxyXG5jbGFzcyBFdmVudFNjYWxlRGF0YUNoYW5nZWQgZXh0ZW5kcyBUeXBlZEV2ZW50IDxTY2FsZSwgRXZlbnRTY2FsZURhdGFDaGFuZ2VkQXJncz57IH07XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFNjYWxlIGltcGxlbWVudHMgSVNjYWxle1xyXG4gICAgcGFyZW50OiBJQ2hhcnRNYW5hZ2VyQ2hhcnQ7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBpZDogc3RyaW5nO1xyXG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcclxuICAgIGNoaWxkczogQmFzZVNlcmllc1tdO1xyXG4gICAgaXNEaXNhYmxlZDogYm9vbGVhbjtcclxuICAgIGRyb3BQb3NzaWJsZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgZXhwYW5kU3RhdGU6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgdW5pcXVlSWQ6IG51bWJlciA9IDA7XHJcblxyXG4gICAgcHJpdmF0ZSBfbWluWVZhbHVlID0gMDtcclxuICAgIHByaXZhdGUgX21heFlWYWx1ZSA9IDEwMDtcclxuXHJcbiAgICBwcml2YXRlIF9taW5YVmFsdWUgPSAwO1xyXG4gICAgcHJpdmF0ZSBfbWF4WFZhbHVlID0gMTAwO1xyXG5cclxuICAgIHByaXZhdGUgX3hWYWx1ZSA9IFswLCAxMDBdO1xyXG5cclxuICAgIGV2ZW50RGF0YUNoYW5nZWQ6IEV2ZW50U2NhbGVEYXRhQ2hhbmdlZCA9IG5ldyBFdmVudFNjYWxlRGF0YUNoYW5nZWQoKTtcclxuXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBTY2FsZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICAgKiBAbWVtYmVyb2YgU2NhbGVcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoaWQ6IHN0cmluZywgcGFyZW50OiBJQ2hhcnRNYW5hZ2VyQ2hhcnQpe1xyXG4gICAgICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgICAgICB0aGlzLm5hbWUgPSAnU2NhbGUnXHJcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5jaGlsZHMgPSBuZXcgQXJyYXk8QmFzZVNlcmllcz4oKTtcclxuICAgICAgICB0aGlzLmlzRGlzYWJsZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTZXR0aW5ncygpOiBJU2V0dGluZ3N7XHJcbiAgICAgICAgbGV0IHNldHRpbmdzID0gbmV3IFNldHRpbmdzKFwiU2NhbGVcIik7XHJcbiAgICAgICAgbGV0IHNlcmllcyA9IHRoaXMuZ2V0Q2hpbGRzKCk7XHJcbiAgICAgICAgbGV0IHNlcmllc0V4cG9ydCA9IG5ldyBBcnJheTxhbnk+KCk7XHJcbiAgICAgICAgc2VyaWVzLmZvckVhY2goc2VyaWUgPT57XHJcbiAgICAgICAgICBzZXJpZXNFeHBvcnQucHVzaChzZXJpZS5pZCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHNldHRpbmdzLnNldFZhbHVlKFwiaWRcIiwgdGhpcy5pZCk7XHJcbiAgICAgICAgc2V0dGluZ3Muc2V0VmFsdWUoXCJuYW1lXCIsIHRoaXMubmFtZSk7XHJcblxyXG4gICAgICAgIHNldHRpbmdzLnNldFZhbHVlKFwibWluWFZhbHVlXCIsIHRoaXMubWluWFZhbHVlKTtcclxuICAgICAgICBzZXR0aW5ncy5zZXRWYWx1ZShcIm1heFhWYWx1ZVwiLCB0aGlzLm1heFhWYWx1ZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgc2V0dGluZ3Muc2V0VmFsdWUoXCJtaW5ZVmFsdWVcIiwgdGhpcy5taW5ZVmFsdWUpO1xyXG4gICAgICAgIHNldHRpbmdzLnNldFZhbHVlKFwibWF4WVZhbHVlXCIsIHRoaXMubWF4WVZhbHVlKTtcclxuICAgICAgICBcclxuICAgICAgICBzZXR0aW5ncy5zZXRWYWx1ZShcInNlcmllc0lkc1wiLCBzZXJpZXNFeHBvcnQpO1xyXG5cclxuICAgICAgICByZXR1cm4gc2V0dGluZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U2V0dGluZ3Moc2V0dGluZ3M6IElTZXR0aW5ncyl7XHJcbiAgICAgICAgbGV0IHNldHRpbmdzT2JqID0gU2V0dGluZ3MuY3JlYXRlKHNldHRpbmdzKTtcclxuICAgICAgICB0aGlzLmlkID0gc2V0dGluZ3NPYmouZ2V0VmFsdWUoXCJpZFwiKTtcclxuICAgICAgICB0aGlzLm5hbWUgPSBzZXR0aW5nc09iai5nZXRWYWx1ZShcIm5hbWVcIik7XHJcblxyXG4gICAgICAgIHRoaXMubWluWFZhbHVlID0gc2V0dGluZ3NPYmouZ2V0VmFsdWUoXCJtaW5YVmFsdWVcIik7XHJcbiAgICAgICAgdGhpcy5tYXhYVmFsdWUgPSBzZXR0aW5nc09iai5nZXRWYWx1ZShcIm1heFhWYWx1ZVwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5taW5ZVmFsdWUgPSBzZXR0aW5nc09iai5nZXRWYWx1ZShcIm1pbllWYWx1ZVwiKTtcclxuICAgICAgICB0aGlzLm1heFlWYWx1ZSA9IHNldHRpbmdzT2JqLmdldFZhbHVlKFwibWF4WVZhbHVlXCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAvLyBUT0RPOiBTZXQgc2VyaWVzIHRvIHNjYWxlIGhlcmUgYW5kIG5vdCBpbiBjaGFydG1hbmFnZXIgZGF0YW1vZGVsXHJcbiAgICAgICAgLy90aGlzLnNlcmllc0V4cG9ydCA9IHNldHRpbmdzT2JqLmdldERhdGEoXCJzZXJpZXNJZHNcIik7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG1pbllWYWx1ZSgpOiBudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21pbllWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgbWluWVZhbHVlKHZhbHVlOiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuX21pbllWYWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBtYXhZVmFsdWUoKTogbnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXhZVmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IG1heFlWYWx1ZSh2YWx1ZTogbnVtYmVyKXtcclxuICAgICAgICB0aGlzLl9tYXhZVmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbWluWFZhbHVlKCk6IG51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWluWFZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBtaW5YVmFsdWUodmFsdWU6IG51bWJlcil7XHJcbiAgICAgICAgaWYodmFsdWUgIT0gdGhpcy5fbWluWFZhbHVlKXtcclxuICAgICAgICAgICAgdGhpcy5fbWluWFZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldCBtYXhYVmFsdWUoKTogbnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXhYVmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IG1heFhWYWx1ZSh2YWx1ZTogbnVtYmVyKXtcclxuICAgICAgICBpZih2YWx1ZSAhPSB0aGlzLl9tYXhYVmFsdWUpe1xyXG4gICAgICAgICAgICB0aGlzLl9tYXhYVmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHhWYWx1ZSgpIDogbnVtYmVyW117XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3hWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgeFZhbHVlKCB2YWx1ZSA6bnVtYmVyW10pe1xyXG4gICAgICAgIHRoaXMuX3hWYWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgaWNvbkRlZmluaXRpb24oKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgaWNvbkRlZmluaXRpb24gPSBcIlwiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBjbGFzc05hbWVzID0gXCJlLXRyZWVncmlkY29sbGFwc2UgdHJlZWdyaWRjb2xsYXBzZVwiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIEFkZCBjb2xsYXBzZS9leHBhbmQgaWNvbiBcclxuICAgICAgICBpZih0aGlzLmV4cGFuZFN0YXRlID09IHRydWUpe1xyXG4gICAgICAgICAgICBjbGFzc05hbWVzICs9IFwiZS10cmVlZ3JpZGV4cGFuZCB0cmVlZ3JpZGV4cGFuZFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpY29uRGVmaW5pdGlvbiArPSBgPGRpdiBjbGFzcz0nYCArIGNsYXNzTmFtZXMgKyBgJz48L2Rpdj5gO1xyXG4gICAgICAgIHJldHVybiBpY29uRGVmaW5pdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBzZXJpZXMgdG8gc2NhbGVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PEJhc2VTZXJpZXM+fSBzZXJpZXNcclxuICAgICAqIEBtZW1iZXJvZiBTY2FsZVxyXG4gICAgICovXHJcbiAgICBhZGRTZXJpZXMoc2VyaWVzOiBBcnJheTxCYXNlU2VyaWVzPil7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZXJpZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICB0aGlzLmNoaWxkcy5wdXNoKHNlcmllc1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNlcmllXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBTY2FsZVxyXG4gICAgICovXHJcbiAgICByZW1vdmVTZXJpZShzZXJpZTogQmFzZVNlcmllcyk6IGJvb2xlYW57XHJcbiAgICAgICAgbGV0IGluZGV4ID0gLTE7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYodGhpcy5jaGlsZHNbaV0gPT0gc2VyaWUpe1xyXG4gICAgICAgICAgICAgICAgaW5kZXggPSBpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGlsZHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIG51bWJlciBvZiBtYXRjaGluZyBzZXJpZXMgYmV0d2VlbiB0aGUgb25lcyBiZWluZyBkcmFnZ2VkIGFuZCB0aGUgb25lcyBpbiB0aGUgc2NhbGVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PEJhc2VTZXJpZXM+fSBkYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIFNjYWxlXHJcbiAgICAgKi9cclxuICAgIG51bWJlck9mTWF0Y2hpbmdTZXJpZXMoZGF0YTogQXJyYXk8QmFzZVNlcmllcz4pOiBudW1iZXJ7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gMDsgXHJcbiAgICAgICAgLy9GRlQgZXhjZXB0aW9uLiBBdm9pZCB0byBpbnNlcnQgc2FtZSBpbnB1dCBzaWduYWwgaW4gRkZUIGNoYXJ0XHJcbiAgICAgICAgbGV0IGlzRkZUQ2hhcnQgPSB0aGlzLnBhcmVudC5jaGFydFR5cGUgPT0gQ2hhcnRUeXBlLkZGVENoYXJ0O1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBkYXRhLmxlbmd0aDsgaisrKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuY2hpbGRzW2ldID09IGRhdGFbal0gfHwgKGlzRkZUQ2hhcnQgJiYgdGhpcy5pc1NlcmllSW5DYWxjdWxhdGlvbih0aGlzLmNoaWxkc1tpXSwgZGF0YVtqXSkpKXtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleCArPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpbmRleDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgc2lnbmFsIGlzIGluIHRoZSBzY2FsZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIFNjYWxlXHJcbiAgICAgKi9cclxuICAgIGhhc1NlcmllKHNlcmllOiBCYXNlU2VyaWVzKTogYm9vbGVhbiB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYodGhpcy5jaGlsZHNbaV0gPT0gc2VyaWUpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgaWYgc2VyaWUgaXMgYWxyZWFkeSB1c2VkIGluIGEgY2FsY3VsYXRlZCBzZXJpZSB0aGF0IGlzIGluc2lkZSB0aGUgY2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNlcmllSW5TY2FsZVxyXG4gICAgICogQHBhcmFtIHtCYXNlU2VyaWVzfSBzZXJpZVxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgU2NhbGVcclxuICAgICAqL1xyXG4gICAgaXNTZXJpZUluQ2FsY3VsYXRpb24oc2VyaWVJblNjYWxlOiBCYXNlU2VyaWVzLCBzZXJpZTogQmFzZVNlcmllcyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBjYWxjdWxhdGlvbkRhdGFJbmZvID0gc2VyaWVJblNjYWxlLmNhbGN1bGF0aW9uRGF0YUluZm87XHJcbiAgICAgICAgaWYoY2FsY3VsYXRpb25EYXRhSW5mbyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBsZXQgc2VyaWVGcm9tQ2FsY3VsYXRpb24gPSBTZXJpZXNQcm92aWRlci5nZXRJbnN0YW5jZSgpLmdldChjYWxjdWxhdGlvbkRhdGFJbmZvLmlucHV0U2VyaWVzSWRzWzBdKTtcclxuICAgICAgICAgICAgaWYoc2VyaWVGcm9tQ2FsY3VsYXRpb24gPT0gc2VyaWUpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldENoaWxkcygpIHtcclxuICAgICAgICBsZXQgc2VyaWVzOiBCYXNlU2VyaWVzW10gPSBbXTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBzZXJpZXMucHVzaCh0aGlzLmNoaWxkc1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZXJpZXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBjaGFydCBkaXNhYmxlZCBvciBlbmFibGVkXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBkaXNhYmxlZFxyXG4gICAgICogQG1lbWJlcm9mIFNjYWxlXHJcbiAgICAgKi9cclxuICAgIHNldERpc2FibGVkKGRpc2FibGVkOiBib29sZWFuKXtcclxuICAgICAgICB0aGlzLmlzRGlzYWJsZWQgPSBkaXNhYmxlZDtcclxuICAgIH1cclxufSJdfQ==