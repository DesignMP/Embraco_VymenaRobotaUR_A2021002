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
define(["require", "exports", "../../../framework/events", "../../../models/chartManagerDataModel/eventSerieDataChangedArgs", "../../../models/common/point", "../../../models/chartManagerDataModel/seriesType", "./ytCursorSignal", "./xyCursorSignal", "./fftCursorSignal", "../../../models/common/seriesProvider/seriesProvider", "../../../common/componentBase/componentBase", "../../../common/componentFactory/componentFactory"], function (require, exports, events_1, eventSerieDataChangedArgs_1, point_1, seriesType_1, ytCursorSignal_1, xyCursorSignal_1, fftCursorSignal_1, seriesProvider_1, componentBase_1, componentFactory_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventModelChanged = /** @class */ (function (_super) {
        __extends(EventModelChanged, _super);
        function EventModelChanged() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventModelChanged;
    }(events_1.TypedEvent));
    ;
    var CursorSignalsDataModel = /** @class */ (function () {
        function CursorSignalsDataModel() {
            var _this = this;
            this.component = new componentBase_1.ComponentBase(componentFactory_1.ComponentFactory.getInstance(), this);
            this.eventModelChanged = new EventModelChanged();
            this._cursorSignals = new Array();
            this._serieDataChangedHandler = function (sender, args) { return _this.onSerieDataChanged(sender, args); };
            this.component.type = "CursorSignalsDataModel";
            this.component.id = "CursorSignalsDataModel";
        }
        /**
         * Returns the list with the cursor signals for the cursor info widget
         *
         * @returns {Array<CursorSignal>}
         * @memberof CursorSignalsDataModel
         */
        CursorSignalsDataModel.prototype.getCursorSignals = function () {
            return this._cursorSignals;
        };
        /**
         *  Returns the CursorSignal which links to the given serie
         *
         * @param {BaseSeries} serie
         * @returns {(CursorSignal|undefined)}
         * @memberof CursorSignalsDataModel
         */
        CursorSignalsDataModel.prototype.getCursorSignal = function (serie) {
            for (var i = 0; i < this._cursorSignals.length; i++) {
                if (this._cursorSignals[i].serie.id === serie.id) {
                    // serie already in list
                    return this._cursorSignals[i];
                }
            }
            return undefined;
        };
        /**
         * Returns the index of the cursorSignal in the datamodel else -1 if not found
         *
         * @param {CursorSignal} cursorSignal
         * @returns {number}
         * @memberof CursorSignalsDataModel
         */
        CursorSignalsDataModel.prototype.getIndex = function (cursorSignal) {
            return this._cursorSignals.indexOf(cursorSignal);
        };
        CursorSignalsDataModel.prototype.getComponentSettings = function () {
            var seriesIds = new Array();
            for (var i = 0; i < this._cursorSignals.length; i++) {
                seriesIds.push(this._cursorSignals[i].serie.id);
            }
            return { "seriesIds": seriesIds };
        };
        CursorSignalsDataModel.prototype.setComponentSettings = function (data) {
            if (data != undefined) {
                var seriesIds = data.seriesIds;
                for (var i = 0; i < seriesIds.length; i++) {
                    var series = new Array();
                    var serie = this.getSerieFromProvider(seriesIds[i]);
                    if (serie != undefined) {
                        series.push(serie);
                    }
                    this.addSeries(series);
                }
                this.onModelChanged();
            }
        };
        CursorSignalsDataModel.prototype.getSerieFromProvider = function (id) {
            return seriesProvider_1.SeriesProvider.getInstance().get(id);
        };
        CursorSignalsDataModel.prototype.addSeries = function (series) {
            var cursorSignals = new Array();
            for (var i = 0; i < series.length; i++) {
                if (series[i].type === seriesType_1.SeriesType.timeSeries) {
                    cursorSignals.push(new ytCursorSignal_1.YTCursorSignal(series[i]));
                }
                else if (series[i].type === seriesType_1.SeriesType.xySeries) {
                    cursorSignals.push(new xyCursorSignal_1.XYCursorSignal(series[i]));
                }
                else if (series[i].type === seriesType_1.SeriesType.fftSeries) {
                    cursorSignals.push(new fftCursorSignal_1.FFTCursorSignal(series[i]));
                }
            }
            this.addSignal(cursorSignals);
        };
        /**
         * Adds the given signal to the signal list
         *
         * @param {Array<CursorSignal>} cursorSignal
         * @returns
         * @memberof CursorSignalsDataModel
         */
        CursorSignalsDataModel.prototype.addSignal = function (cursorSignal) {
            for (var i = 0; i < cursorSignal.length; i++) {
                var index = this._cursorSignals.indexOf(cursorSignal[i]);
                if (index > -1) {
                    // cusorSignal already in list
                    return;
                }
                //Check if serie is not in the list
                if (this.getCursorSignal(cursorSignal[i].serie) == undefined) {
                    cursorSignal[i].serie.eventDataChanged.attach(this._serieDataChangedHandler);
                    this._cursorSignals.splice(0, 0, cursorSignal[i]);
                    this.onModelChanged();
                }
            }
        };
        /**
         * Removes the given signal from the signal list
         *
         * @param {CursorSignal} cursorSignal
         * @memberof CursorSignalsDataModel
         */
        CursorSignalsDataModel.prototype.removeSerie = function (cursorSignal) {
            var index = this._cursorSignals.indexOf(cursorSignal);
            if (index > -1) {
                this._cursorSignals.splice(index, 1);
                cursorSignal.serie.eventDataChanged.detach(this._serieDataChangedHandler);
                this.onModelChanged();
            }
        };
        /**
         * Updates the cursor informations for the given signal to the defined cursorIndex 1 and 2
         *
         * @param {CursorSignal} cursorSignal
         * @param {number} cursorIndex1
         * @param {number} cursorIndex2
         * @memberof CursorSignalsDataModel
         */
        CursorSignalsDataModel.prototype.updateCursorValues = function (cursorSignal, cursorTimestamp1, cursorTimestamp2) {
            if (!cursorSignal.serie.rawPointsValid) {
                return;
            }
            var cursorPoint1;
            var cursorPoint2;
            if (cursorTimestamp1 != undefined) {
                cursorPoint1 = this.getCursorSignalPoint(cursorSignal, cursorTimestamp1);
            }
            if (cursorTimestamp2 != undefined) {
                cursorPoint2 = this.getCursorSignalPoint(cursorSignal, cursorTimestamp2);
            }
            cursorSignal.updateValues(cursorPoint1, cursorPoint2, cursorTimestamp1, cursorTimestamp2);
        };
        /**
         * gets a cursor signal point from the given curor signal and timestamp
         *
         * @private
         * @param {CursorSignal} cursorSignal
         * @param {number} cursorTimestamp
         * @returns
         * @memberof CursorSignalsDataModel
         */
        CursorSignalsDataModel.prototype.getCursorSignalPoint = function (cursorSignal, cursorTimestamp) {
            var cursorPoint = point_1.Point.Empty();
            // get the nearest signal point for valid timestamps
            if (cursorTimestamp != undefined && cursorSignal.serie.timestampIsInRange(cursorTimestamp)) {
                cursorPoint = cursorSignal.serie.previousPointFromTimestamp(cursorTimestamp);
            }
            return cursorPoint;
        };
        /**
         * Clears all the cursor value informations of this signal
         *
         * @param {CursorSignal} cursorSignal
         * @memberof CursorSignalsDataModel
         */
        CursorSignalsDataModel.prototype.clearCursorValues = function (cursorSignal) {
            cursorSignal.clearValues();
        };
        CursorSignalsDataModel.prototype.onSerieDataChanged = function (sender, args) {
            if (args.action == eventSerieDataChangedArgs_1.SerieAction.rename || args.action == eventSerieDataChangedArgs_1.SerieAction.dataPointsChanged
                || args.action == eventSerieDataChangedArgs_1.SerieAction.startTriggerTimeChanged || args.action == eventSerieDataChangedArgs_1.SerieAction.colorChanged) {
                this.onModelChanged();
            }
        };
        CursorSignalsDataModel.prototype.onModelChanged = function () {
            this.eventModelChanged.raise(this, null);
        };
        return CursorSignalsDataModel;
    }());
    exports.CursorSignalsDataModel = CursorSignalsDataModel;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3Vyc29yU2lnbmFsc0RhdGFNb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jdXJzb3JJbmZvV2lkZ2V0L21vZGVsL2N1cnNvclNpZ25hbHNEYXRhTW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQWVBO1FBQWdDLHFDQUF3QztRQUF4RTs7UUFBMEUsQ0FBQztRQUFELHdCQUFDO0lBQUQsQ0FBQyxBQUEzRSxDQUFnQyxtQkFBVSxHQUFpQztJQUFBLENBQUM7SUFFNUU7UUFVSTtZQUFBLGlCQUdDO1lBWE0sY0FBUyxHQUFrQixJQUFJLDZCQUFhLENBQUMsbUNBQWdCLENBQUMsV0FBVyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFMUYsc0JBQWlCLEdBQUcsSUFBSSxpQkFBaUIsRUFBRSxDQUFDO1lBRXBDLG1CQUFjLEdBQXdCLElBQUssS0FBSyxFQUFnQixDQUFDO1lBRWpFLDZCQUF3QixHQUFHLFVBQUMsTUFBTSxFQUFDLElBQUksSUFBRyxPQUFBLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLEVBQXBDLENBQW9DLENBQUM7WUFHbkYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsd0JBQXdCLENBQUM7WUFDL0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsd0JBQXdCLENBQUM7UUFDakQsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0ksaURBQWdCLEdBQXZCO1lBQ0ksT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQy9CLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSSxnREFBZSxHQUF0QixVQUF1QixLQUFpQjtZQUNwQyxLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQzdDLElBQUcs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Qy9CLENBQUM7UUFFTyxtREFBa0IsR0FBMUIsVUFBMkIsTUFBTSxFQUFFLElBQStCO1lBQzlELElBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSx1Q0FBVyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLHVDQUFXLENBQUMsaUJBQWlCO21CQUM3RSxJQUFJLENBQUMsTUFBTSxJQUFJLHVDQUFXLENBQUMsdUJBQXVCLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSx1Q0FBVyxDQUFDLFlBQVksRUFBQztnQkFDakcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO2FBQ3pCO1FBQ0wsQ0FBQztRQUVPLCtDQUFjLEdBQXRCO1lBQ0ksSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDN0MsQ0FBQztRQUNMLDZCQUFDO0lBQUQsQ0FBQyxBQXJNRCxJQXFNQztJQXJNWSx3REFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUeXBlZEV2ZW50IH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9ldmVudHNcIjtcclxuaW1wb3J0IHsgQmFzZVNlcmllcyB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2Jhc2VTZXJpZXNcIjtcclxuaW1wb3J0IHsgU2VyaWVBY3Rpb24sIEV2ZW50U2VyaWVEYXRhQ2hhbmdlZEFyZ3MgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9ldmVudFNlcmllRGF0YUNoYW5nZWRBcmdzXCI7XHJcbmltcG9ydCB7IEN1cnNvclNpZ25hbCB9IGZyb20gXCIuL2N1cnNvclNpZ25hbFwiO1xyXG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2NvbW1vbi9pbnRlcmZhY2VzL3BvaW50SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9jb21tb24vcG9pbnRcIjtcclxuaW1wb3J0IHsgU2VyaWVzVHlwZSB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL3Nlcmllc1R5cGVcIjtcclxuaW1wb3J0IHsgWVRDdXJzb3JTaWduYWwgfSBmcm9tIFwiLi95dEN1cnNvclNpZ25hbFwiO1xyXG5pbXBvcnQgeyBYWUN1cnNvclNpZ25hbCB9IGZyb20gXCIuL3h5Q3Vyc29yU2lnbmFsXCI7XHJcbmltcG9ydCB7IEZGVEN1cnNvclNpZ25hbCB9IGZyb20gXCIuL2ZmdEN1cnNvclNpZ25hbFwiO1xyXG5pbXBvcnQgeyBTZXJpZXNQcm92aWRlciB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY29tbW9uL3Nlcmllc1Byb3ZpZGVyL3Nlcmllc1Byb3ZpZGVyXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudEJhc2UgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50QmFzZVwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRGYWN0b3J5IH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9jb21wb25lbnRGYWN0b3J5L2NvbXBvbmVudEZhY3RvcnlcIjtcclxuaW1wb3J0IHsgSUNvbXBvbmVudCB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9pbnRlcmZhY2VzL2NvbXBvbmVudEludGVyZmFjZVwiO1xyXG5cclxuY2xhc3MgRXZlbnRNb2RlbENoYW5nZWQgZXh0ZW5kcyBUeXBlZEV2ZW50PEN1cnNvclNpZ25hbHNEYXRhTW9kZWwsIG51bGw+eyB9O1xyXG5cclxuZXhwb3J0IGNsYXNzIEN1cnNvclNpZ25hbHNEYXRhTW9kZWwgaW1wbGVtZW50cyBJQ29tcG9uZW50e1xyXG4gICAgXHJcbiAgICBwdWJsaWMgY29tcG9uZW50OiBDb21wb25lbnRCYXNlID0gbmV3IENvbXBvbmVudEJhc2UoQ29tcG9uZW50RmFjdG9yeS5nZXRJbnN0YW5jZSgpLCB0aGlzKTtcclxuXHJcbiAgICBldmVudE1vZGVsQ2hhbmdlZCA9IG5ldyBFdmVudE1vZGVsQ2hhbmdlZCgpO1xyXG5cclxuICAgIHByaXZhdGUgX2N1cnNvclNpZ25hbHM6IEFycmF5PEN1cnNvclNpZ25hbD4gPSBuZXcgIEFycmF5PEN1cnNvclNpZ25hbD4oKTtcclxuXHJcbiAgICBwcml2YXRlIF9zZXJpZURhdGFDaGFuZ2VkSGFuZGxlciA9IChzZW5kZXIsYXJncyk9PnRoaXMub25TZXJpZURhdGFDaGFuZ2VkKHNlbmRlcixhcmdzKTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LnR5cGUgPSBcIkN1cnNvclNpZ25hbHNEYXRhTW9kZWxcIjtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5pZCA9IFwiQ3Vyc29yU2lnbmFsc0RhdGFNb2RlbFwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgbGlzdCB3aXRoIHRoZSBjdXJzb3Igc2lnbmFscyBmb3IgdGhlIGN1cnNvciBpbmZvIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxDdXJzb3JTaWduYWw+fVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclNpZ25hbHNEYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEN1cnNvclNpZ25hbHMoKTogQXJyYXk8Q3Vyc29yU2lnbmFsPntcclxuICAgICAgICByZXR1cm4gdGhpcy5fY3Vyc29yU2lnbmFscztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICBSZXR1cm5zIHRoZSBDdXJzb3JTaWduYWwgd2hpY2ggbGlua3MgdG8gdGhlIGdpdmVuIHNlcmllXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtCYXNlU2VyaWVzfSBzZXJpZVxyXG4gICAgICogQHJldHVybnMgeyhDdXJzb3JTaWduYWx8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTaWduYWxzRGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRDdXJzb3JTaWduYWwoc2VyaWU6IEJhc2VTZXJpZXMpOiBDdXJzb3JTaWduYWx8dW5kZWZpbmVke1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpIDwgdGhpcy5fY3Vyc29yU2lnbmFscy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX2N1cnNvclNpZ25hbHNbaV0uc2VyaWUuaWQgPT09IHNlcmllLmlkKXtcclxuICAgICAgICAgICAgICAgIC8vIHNlcmllIGFscmVhZHkgaW4gbGlzdFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnNvclNpZ25hbHNbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgY3Vyc29yU2lnbmFsIGluIHRoZSBkYXRhbW9kZWwgZWxzZSAtMSBpZiBub3QgZm91bmRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0N1cnNvclNpZ25hbH0gY3Vyc29yU2lnbmFsXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclNpZ25hbHNEYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEluZGV4KGN1cnNvclNpZ25hbDogQ3Vyc29yU2lnbmFsKTogbnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJzb3JTaWduYWxzLmluZGV4T2YoY3Vyc29yU2lnbmFsKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Q29tcG9uZW50U2V0dGluZ3MoKTogYW55e1xyXG4gICAgICAgIGxldCBzZXJpZXNJZHMgPSBuZXcgQXJyYXk8YW55PigpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9MDsgaSA8IHRoaXMuX2N1cnNvclNpZ25hbHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBzZXJpZXNJZHMucHVzaCh0aGlzLl9jdXJzb3JTaWduYWxzW2ldLnNlcmllLmlkKTtcclxuICAgICAgICB9XHJcblx0XHRyZXR1cm4ge1wic2VyaWVzSWRzXCI6IHNlcmllc0lkc307XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0Q29tcG9uZW50U2V0dGluZ3MoZGF0YTogYW55KSB7XHJcbiAgICAgICAgaWYoZGF0YSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBsZXQgc2VyaWVzSWRzID0gZGF0YS5zZXJpZXNJZHM7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9MDsgaSA8IHNlcmllc0lkcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2VyaWVzID0gbmV3IEFycmF5PEJhc2VTZXJpZXM+KCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2VyaWUgPSB0aGlzLmdldFNlcmllRnJvbVByb3ZpZGVyKHNlcmllc0lkc1tpXSk7XHJcbiAgICAgICAgICAgICAgICBpZihzZXJpZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHNlcmllcy5wdXNoKHNlcmllKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkU2VyaWVzKHNlcmllcylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKCk7ICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRTZXJpZUZyb21Qcm92aWRlcihpZDogc3RyaW5nKTogQmFzZVNlcmllc3x1bmRlZmluZWR7XHJcbiAgICAgICAgcmV0dXJuIFNlcmllc1Byb3ZpZGVyLmdldEluc3RhbmNlKCkuZ2V0KGlkKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkU2VyaWVzKHNlcmllczogQXJyYXk8QmFzZVNlcmllcz4pe1xyXG4gICAgICAgIGxldCBjdXJzb3JTaWduYWxzID0gbmV3IEFycmF5PEN1cnNvclNpZ25hbD4oKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNlcmllcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmIChzZXJpZXNbaV0udHlwZSA9PT0gU2VyaWVzVHlwZS50aW1lU2VyaWVzKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJzb3JTaWduYWxzLnB1c2gobmV3IFlUQ3Vyc29yU2lnbmFsKHNlcmllc1tpXSkpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNlcmllc1tpXS50eXBlID09PSBTZXJpZXNUeXBlLnh5U2VyaWVzKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJzb3JTaWduYWxzLnB1c2gobmV3IFhZQ3Vyc29yU2lnbmFsKHNlcmllc1tpXSkpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNlcmllc1tpXS50eXBlID09PSBTZXJpZXNUeXBlLmZmdFNlcmllcykge1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yU2lnbmFscy5wdXNoKG5ldyBGRlRDdXJzb3JTaWduYWwoc2VyaWVzW2ldKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuYWRkU2lnbmFsKGN1cnNvclNpZ25hbHMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyB0aGUgZ2l2ZW4gc2lnbmFsIHRvIHRoZSBzaWduYWwgbGlzdFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8Q3Vyc29yU2lnbmFsPn0gY3Vyc29yU2lnbmFsXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclNpZ25hbHNEYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZFNpZ25hbChjdXJzb3JTaWduYWw6IEFycmF5PEN1cnNvclNpZ25hbD4pe1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY3Vyc29yU2lnbmFsLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5fY3Vyc29yU2lnbmFscy5pbmRleE9mKGN1cnNvclNpZ25hbFtpXSk7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjdXNvclNpZ25hbCBhbHJlYWR5IGluIGxpc3RcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL0NoZWNrIGlmIHNlcmllIGlzIG5vdCBpbiB0aGUgbGlzdFxyXG4gICAgICAgICAgICBpZih0aGlzLmdldEN1cnNvclNpZ25hbChjdXJzb3JTaWduYWxbaV0uc2VyaWUpID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBjdXJzb3JTaWduYWxbaV0uc2VyaWUuZXZlbnREYXRhQ2hhbmdlZC5hdHRhY2godGhpcy5fc2VyaWVEYXRhQ2hhbmdlZEhhbmRsZXIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3Vyc29yU2lnbmFscy5zcGxpY2UoMCwgMCwgY3Vyc29yU2lnbmFsW2ldKTtcclxuICAgICAgICAgICAgICAgIHRoaXMub25Nb2RlbENoYW5nZWQoKTsgIFxyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgdGhlIGdpdmVuIHNpZ25hbCBmcm9tIHRoZSBzaWduYWwgbGlzdFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Q3Vyc29yU2lnbmFsfSBjdXJzb3JTaWduYWxcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTaWduYWxzRGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZW1vdmVTZXJpZShjdXJzb3JTaWduYWw6IEN1cnNvclNpZ25hbCl7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5fY3Vyc29yU2lnbmFscy5pbmRleE9mKGN1cnNvclNpZ25hbCk7XHJcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3Vyc29yU2lnbmFscy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICBjdXJzb3JTaWduYWwuc2VyaWUuZXZlbnREYXRhQ2hhbmdlZC5kZXRhY2godGhpcy5fc2VyaWVEYXRhQ2hhbmdlZEhhbmRsZXIpO1xyXG4gICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKCk7ICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBjdXJzb3IgaW5mb3JtYXRpb25zIGZvciB0aGUgZ2l2ZW4gc2lnbmFsIHRvIHRoZSBkZWZpbmVkIGN1cnNvckluZGV4IDEgYW5kIDJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0N1cnNvclNpZ25hbH0gY3Vyc29yU2lnbmFsXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY3Vyc29ySW5kZXgxXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY3Vyc29ySW5kZXgyXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU2lnbmFsc0RhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXBkYXRlQ3Vyc29yVmFsdWVzKGN1cnNvclNpZ25hbDpDdXJzb3JTaWduYWwsIGN1cnNvclRpbWVzdGFtcDE6IG51bWJlcnx1bmRlZmluZWQsIGN1cnNvclRpbWVzdGFtcDI6IG51bWJlcnx1bmRlZmluZWQpe1xyXG4gICAgICAgIGlmICghY3Vyc29yU2lnbmFsLnNlcmllLnJhd1BvaW50c1ZhbGlkKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGN1cnNvclBvaW50MTogSVBvaW50fHVuZGVmaW5lZDtcclxuICAgICAgICBsZXQgY3Vyc29yUG9pbnQyOiBJUG9pbnR8dW5kZWZpbmVkO1xyXG4gICAgICAgIGlmKGN1cnNvclRpbWVzdGFtcDEgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgY3Vyc29yUG9pbnQxID0gdGhpcy5nZXRDdXJzb3JTaWduYWxQb2ludChjdXJzb3JTaWduYWwsIGN1cnNvclRpbWVzdGFtcDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihjdXJzb3JUaW1lc3RhbXAyICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGN1cnNvclBvaW50MiA9IHRoaXMuZ2V0Q3Vyc29yU2lnbmFsUG9pbnQoY3Vyc29yU2lnbmFsLCBjdXJzb3JUaW1lc3RhbXAyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY3Vyc29yU2lnbmFsLnVwZGF0ZVZhbHVlcyhjdXJzb3JQb2ludDEsIGN1cnNvclBvaW50MiwgY3Vyc29yVGltZXN0YW1wMSwgY3Vyc29yVGltZXN0YW1wMik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXRzIGEgY3Vyc29yIHNpZ25hbCBwb2ludCBmcm9tIHRoZSBnaXZlbiBjdXJvciBzaWduYWwgYW5kIHRpbWVzdGFtcFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0N1cnNvclNpZ25hbH0gY3Vyc29yU2lnbmFsXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY3Vyc29yVGltZXN0YW1wXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclNpZ25hbHNEYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRDdXJzb3JTaWduYWxQb2ludChjdXJzb3JTaWduYWw6IEN1cnNvclNpZ25hbCwgY3Vyc29yVGltZXN0YW1wOiBudW1iZXIpOklQb2ludCB7XHJcbiAgICAgICAgbGV0IGN1cnNvclBvaW50OklQb2ludCA9IFBvaW50LkVtcHR5KCk7XHJcblxyXG4gICAgICAgIC8vIGdldCB0aGUgbmVhcmVzdCBzaWduYWwgcG9pbnQgZm9yIHZhbGlkIHRpbWVzdGFtcHNcclxuICAgICAgICBpZiAoY3Vyc29yVGltZXN0YW1wICE9IHVuZGVmaW5lZCAmJiBjdXJzb3JTaWduYWwuc2VyaWUudGltZXN0YW1wSXNJblJhbmdlKGN1cnNvclRpbWVzdGFtcCkpIHtcclxuICAgICAgICAgICAgY3Vyc29yUG9pbnQgPSAgY3Vyc29yU2lnbmFsLnNlcmllLnByZXZpb3VzUG9pbnRGcm9tVGltZXN0YW1wKGN1cnNvclRpbWVzdGFtcCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY3Vyc29yUG9pbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDbGVhcnMgYWxsIHRoZSBjdXJzb3IgdmFsdWUgaW5mb3JtYXRpb25zIG9mIHRoaXMgc2lnbmFsXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtDdXJzb3JTaWduYWx9IGN1cnNvclNpZ25hbFxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclNpZ25hbHNEYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNsZWFyQ3Vyc29yVmFsdWVzKGN1cnNvclNpZ25hbDogQ3Vyc29yU2lnbmFsKXtcclxuICAgICAgICBjdXJzb3JTaWduYWwuY2xlYXJWYWx1ZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uU2VyaWVEYXRhQ2hhbmdlZChzZW5kZXIsIGFyZ3M6IEV2ZW50U2VyaWVEYXRhQ2hhbmdlZEFyZ3Mpe1xyXG4gICAgICAgIGlmKGFyZ3MuYWN0aW9uID09IFNlcmllQWN0aW9uLnJlbmFtZSB8fCBhcmdzLmFjdGlvbiA9PSBTZXJpZUFjdGlvbi5kYXRhUG9pbnRzQ2hhbmdlZCBcclxuICAgICAgICAgICAgfHwgYXJncy5hY3Rpb24gPT0gU2VyaWVBY3Rpb24uc3RhcnRUcmlnZ2VyVGltZUNoYW5nZWQgfHwgYXJncy5hY3Rpb24gPT0gU2VyaWVBY3Rpb24uY29sb3JDaGFuZ2VkKXtcclxuICAgICAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCgpOyAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25Nb2RlbENoYW5nZWQoKXtcclxuICAgICAgICB0aGlzLmV2ZW50TW9kZWxDaGFuZ2VkLnJhaXNlKHRoaXMsIG51bGwpO1xyXG4gICAgfVxyXG59Il19