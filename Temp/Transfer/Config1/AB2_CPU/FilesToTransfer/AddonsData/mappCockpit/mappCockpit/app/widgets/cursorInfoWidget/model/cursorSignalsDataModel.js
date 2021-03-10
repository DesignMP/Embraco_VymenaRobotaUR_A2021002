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
define(["require", "exports", "../../../framework/events", "../../../models/chartManagerDataModel/eventSerieDataChangedArgs", "../../../models/common/point"], function (require, exports, events_1, eventSerieDataChangedArgs_1, point_1) {
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
            this.eventModelChanged = new EventModelChanged();
            this._cursorSignals = new Array();
            this._serieDataChangedHandler = function (sender, args) { return _this.onSerieDataChanged(sender, args); };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3Vyc29yU2lnbmFsc0RhdGFNb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jdXJzb3JJbmZvV2lkZ2V0L21vZGVsL2N1cnNvclNpZ25hbHNEYXRhTW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQU9BO1FBQWdDLHFDQUF3QztRQUF4RTs7UUFBMEUsQ0FBQztRQUFELHdCQUFDO0lBQUQsQ0FBQyxBQUEzRSxDQUFnQyxtQkFBVSxHQUFpQztJQUFBLENBQUM7SUFFNUU7UUFBQTtZQUFBLGlCQXlJQztZQXZJRyxzQkFBaUIsR0FBRyxJQUFJLGlCQUFpQixFQUFFLENBQUM7WUFFcEMsbUJBQWMsR0FBd0IsSUFBSyxLQUFLLEVBQWdCLENBQUM7WUFFakUsNkJBQXdCLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFHLE9BQUEsS0FBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsRUFBcEMsQ0FBb0MsQ0FBQztRQW1JM0YsQ0FBQztRQWpJRzs7Ozs7V0FLRztRQUNJLGlEQUFnQixHQUF2QjtZQUNJLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUMvQixDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ksZ0RBQWUsR0FBdEIsVUFBdUIsS0FBaUI7WUFDcEMsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUM3QyxJQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxLQUFLLENBQUMsRUFBRSxFQUFDO29CQUM1Qyx3QkFBd0I7b0JBQ3hCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDakM7YUFDSjtZQUNELE9BQU8sU0FBUyxDQUFD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LG1EQUFrQixHQUExQixVQUEyQixNQUFNLEVBQUUsSUFBK0I7WUFDOUQsSUFBRyxJQUFJLENBQUMsTUFBTSxJQUFJLHVDQUFXLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksdUNBQVcsQ0FBQyxpQkFBaUI7bUJBQzdFLElBQUksQ0FBQyxNQUFNLElBQUksdUNBQVcsQ0FBQyx1QkFBdUIsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLHVDQUFXLENBQUMsWUFBWSxFQUFDO2dCQUNqRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7YUFDekI7UUFDTCxDQUFDO1FBRU8sK0NBQWMsR0FBdEI7WUFDSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM3QyxDQUFDO1FBQ0wsNkJBQUM7SUFBRCxDQUFDLEFBeklELElBeUlDO0lBeklZLHdEQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFR5cGVkRXZlbnQgfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL2V2ZW50c1wiO1xyXG5pbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvYmFzZVNlcmllc1wiO1xyXG5pbXBvcnQgeyBTZXJpZUFjdGlvbiwgRXZlbnRTZXJpZURhdGFDaGFuZ2VkQXJncyB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2V2ZW50U2VyaWVEYXRhQ2hhbmdlZEFyZ3NcIjtcclxuaW1wb3J0IHsgQ3Vyc29yU2lnbmFsIH0gZnJvbSBcIi4vY3Vyc29yU2lnbmFsXCI7XHJcbmltcG9ydCB7IElQb2ludCB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY29tbW9uL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2NvbW1vbi9wb2ludFwiO1xyXG5cclxuY2xhc3MgRXZlbnRNb2RlbENoYW5nZWQgZXh0ZW5kcyBUeXBlZEV2ZW50PEN1cnNvclNpZ25hbHNEYXRhTW9kZWwsIG51bGw+eyB9O1xyXG5cclxuZXhwb3J0IGNsYXNzIEN1cnNvclNpZ25hbHNEYXRhTW9kZWx7XHJcbiAgICBcclxuICAgIGV2ZW50TW9kZWxDaGFuZ2VkID0gbmV3IEV2ZW50TW9kZWxDaGFuZ2VkKCk7XHJcblxyXG4gICAgcHJpdmF0ZSBfY3Vyc29yU2lnbmFsczogQXJyYXk8Q3Vyc29yU2lnbmFsPiA9IG5ldyAgQXJyYXk8Q3Vyc29yU2lnbmFsPigpO1xyXG5cclxuICAgIHByaXZhdGUgX3NlcmllRGF0YUNoYW5nZWRIYW5kbGVyID0gKHNlbmRlcixhcmdzKT0+dGhpcy5vblNlcmllRGF0YUNoYW5nZWQoc2VuZGVyLGFyZ3MpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgbGlzdCB3aXRoIHRoZSBjdXJzb3Igc2lnbmFscyBmb3IgdGhlIGN1cnNvciBpbmZvIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxDdXJzb3JTaWduYWw+fVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclNpZ25hbHNEYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEN1cnNvclNpZ25hbHMoKTogQXJyYXk8Q3Vyc29yU2lnbmFsPntcclxuICAgICAgICByZXR1cm4gdGhpcy5fY3Vyc29yU2lnbmFscztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICBSZXR1cm5zIHRoZSBDdXJzb3JTaWduYWwgd2hpY2ggbGlua3MgdG8gdGhlIGdpdmVuIHNlcmllXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtCYXNlU2VyaWVzfSBzZXJpZVxyXG4gICAgICogQHJldHVybnMgeyhDdXJzb3JTaWduYWx8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTaWduYWxzRGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRDdXJzb3JTaWduYWwoc2VyaWU6IEJhc2VTZXJpZXMpOiBDdXJzb3JTaWduYWx8dW5kZWZpbmVke1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpIDwgdGhpcy5fY3Vyc29yU2lnbmFscy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX2N1cnNvclNpZ25hbHNbaV0uc2VyaWUuaWQgPT09IHNlcmllLmlkKXtcclxuICAgICAgICAgICAgICAgIC8vIHNlcmllIGFscmVhZHkgaW4gbGlzdFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnNvclNpZ25hbHNbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgdGhlIGdpdmVuIHNpZ25hbCB0byB0aGUgc2lnbmFsIGxpc3RcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PEN1cnNvclNpZ25hbD59IGN1cnNvclNpZ25hbFxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTaWduYWxzRGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGRTaWduYWwoY3Vyc29yU2lnbmFsOiBBcnJheTxDdXJzb3JTaWduYWw+KXtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGN1cnNvclNpZ25hbC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMuX2N1cnNvclNpZ25hbHMuaW5kZXhPZihjdXJzb3JTaWduYWxbaV0pO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgLy8gY3Vzb3JTaWduYWwgYWxyZWFkeSBpbiBsaXN0XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9DaGVjayBpZiBzZXJpZSBpcyBub3QgaW4gdGhlIGxpc3RcclxuICAgICAgICAgICAgaWYodGhpcy5nZXRDdXJzb3JTaWduYWwoY3Vyc29yU2lnbmFsW2ldLnNlcmllKSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yU2lnbmFsW2ldLnNlcmllLmV2ZW50RGF0YUNoYW5nZWQuYXR0YWNoKHRoaXMuX3NlcmllRGF0YUNoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnNvclNpZ25hbHMuc3BsaWNlKDAsIDAsIGN1cnNvclNpZ25hbFtpXSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKCk7ICBcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIHRoZSBnaXZlbiBzaWduYWwgZnJvbSB0aGUgc2lnbmFsIGxpc3RcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0N1cnNvclNpZ25hbH0gY3Vyc29yU2lnbmFsXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU2lnbmFsc0RhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVtb3ZlU2VyaWUoY3Vyc29yU2lnbmFsOiBDdXJzb3JTaWduYWwpe1xyXG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuX2N1cnNvclNpZ25hbHMuaW5kZXhPZihjdXJzb3JTaWduYWwpO1xyXG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnNvclNpZ25hbHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgY3Vyc29yU2lnbmFsLnNlcmllLmV2ZW50RGF0YUNoYW5nZWQuZGV0YWNoKHRoaXMuX3NlcmllRGF0YUNoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCgpOyAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgY3Vyc29yIGluZm9ybWF0aW9ucyBmb3IgdGhlIGdpdmVuIHNpZ25hbCB0byB0aGUgZGVmaW5lZCBjdXJzb3JJbmRleCAxIGFuZCAyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtDdXJzb3JTaWduYWx9IGN1cnNvclNpZ25hbFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGN1cnNvckluZGV4MVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGN1cnNvckluZGV4MlxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclNpZ25hbHNEYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIHVwZGF0ZUN1cnNvclZhbHVlcyhjdXJzb3JTaWduYWw6Q3Vyc29yU2lnbmFsLCBjdXJzb3JUaW1lc3RhbXAxOiBudW1iZXJ8dW5kZWZpbmVkLCBjdXJzb3JUaW1lc3RhbXAyOiBudW1iZXJ8dW5kZWZpbmVkKXtcclxuICAgICAgICBpZiAoIWN1cnNvclNpZ25hbC5zZXJpZS5yYXdQb2ludHNWYWxpZCl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjdXJzb3JQb2ludDE6IElQb2ludHx1bmRlZmluZWQ7XHJcbiAgICAgICAgbGV0IGN1cnNvclBvaW50MjogSVBvaW50fHVuZGVmaW5lZDtcclxuICAgICAgICBpZihjdXJzb3JUaW1lc3RhbXAxICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGN1cnNvclBvaW50MSA9IHRoaXMuZ2V0Q3Vyc29yU2lnbmFsUG9pbnQoY3Vyc29yU2lnbmFsLCBjdXJzb3JUaW1lc3RhbXAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoY3Vyc29yVGltZXN0YW1wMiAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBjdXJzb3JQb2ludDIgPSB0aGlzLmdldEN1cnNvclNpZ25hbFBvaW50KGN1cnNvclNpZ25hbCwgY3Vyc29yVGltZXN0YW1wMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGN1cnNvclNpZ25hbC51cGRhdGVWYWx1ZXMoY3Vyc29yUG9pbnQxLCBjdXJzb3JQb2ludDIsIGN1cnNvclRpbWVzdGFtcDEsIGN1cnNvclRpbWVzdGFtcDIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0cyBhIGN1cnNvciBzaWduYWwgcG9pbnQgZnJvbSB0aGUgZ2l2ZW4gY3Vyb3Igc2lnbmFsIGFuZCB0aW1lc3RhbXBcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtDdXJzb3JTaWduYWx9IGN1cnNvclNpZ25hbFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGN1cnNvclRpbWVzdGFtcFxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTaWduYWxzRGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0Q3Vyc29yU2lnbmFsUG9pbnQoY3Vyc29yU2lnbmFsOiBDdXJzb3JTaWduYWwsIGN1cnNvclRpbWVzdGFtcDogbnVtYmVyKTpJUG9pbnQge1xyXG4gICAgICAgIGxldCBjdXJzb3JQb2ludDpJUG9pbnQgPSBQb2ludC5FbXB0eSgpO1xyXG5cclxuICAgICAgICAvLyBnZXQgdGhlIG5lYXJlc3Qgc2lnbmFsIHBvaW50IGZvciB2YWxpZCB0aW1lc3RhbXBzXHJcbiAgICAgICAgaWYgKGN1cnNvclRpbWVzdGFtcCAhPSB1bmRlZmluZWQgJiYgY3Vyc29yU2lnbmFsLnNlcmllLnRpbWVzdGFtcElzSW5SYW5nZShjdXJzb3JUaW1lc3RhbXApKSB7XHJcbiAgICAgICAgICAgIGN1cnNvclBvaW50ID0gIGN1cnNvclNpZ25hbC5zZXJpZS5wcmV2aW91c1BvaW50RnJvbVRpbWVzdGFtcChjdXJzb3JUaW1lc3RhbXApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGN1cnNvclBvaW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2xlYXJzIGFsbCB0aGUgY3Vyc29yIHZhbHVlIGluZm9ybWF0aW9ucyBvZiB0aGlzIHNpZ25hbFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Q3Vyc29yU2lnbmFsfSBjdXJzb3JTaWduYWxcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTaWduYWxzRGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjbGVhckN1cnNvclZhbHVlcyhjdXJzb3JTaWduYWw6IEN1cnNvclNpZ25hbCl7XHJcbiAgICAgICAgY3Vyc29yU2lnbmFsLmNsZWFyVmFsdWVzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblNlcmllRGF0YUNoYW5nZWQoc2VuZGVyLCBhcmdzOiBFdmVudFNlcmllRGF0YUNoYW5nZWRBcmdzKXtcclxuICAgICAgICBpZihhcmdzLmFjdGlvbiA9PSBTZXJpZUFjdGlvbi5yZW5hbWUgfHwgYXJncy5hY3Rpb24gPT0gU2VyaWVBY3Rpb24uZGF0YVBvaW50c0NoYW5nZWQgXHJcbiAgICAgICAgICAgIHx8IGFyZ3MuYWN0aW9uID09IFNlcmllQWN0aW9uLnN0YXJ0VHJpZ2dlclRpbWVDaGFuZ2VkIHx8IGFyZ3MuYWN0aW9uID09IFNlcmllQWN0aW9uLmNvbG9yQ2hhbmdlZCl7XHJcbiAgICAgICAgICAgIHRoaXMub25Nb2RlbENoYW5nZWQoKTsgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uTW9kZWxDaGFuZ2VkKCl7XHJcbiAgICAgICAgdGhpcy5ldmVudE1vZGVsQ2hhbmdlZC5yYWlzZSh0aGlzLCBudWxsKTtcclxuICAgIH1cclxufSJdfQ==