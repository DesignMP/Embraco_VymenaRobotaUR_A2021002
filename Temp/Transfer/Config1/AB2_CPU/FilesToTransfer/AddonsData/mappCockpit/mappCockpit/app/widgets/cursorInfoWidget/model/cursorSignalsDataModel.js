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
define(["require", "exports", "../../../framework/events", "../../../models/chartManagerDataModel/eventSerieDataChangedArgs", "../../../models/common/point", "../../../models/chartManagerDataModel/seriesType", "./ytCursorSignal", "./xyCursorSignal", "./fftCursorSignal", "./defaultComponentSettings", "./settingIds", "../../../common/persistence/settings"], function (require, exports, events_1, eventSerieDataChangedArgs_1, point_1, seriesType_1, ytCursorSignal_1, xyCursorSignal_1, fftCursorSignal_1, defaultComponentSettings_1, settingIds_1, settings_1) {
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
            this._isPersistEnabled = false;
            this.eventModelChanged = new EventModelChanged();
            this._cursorSignals = new Array();
            this._serieDataChangedHandler = function (sender, args) { return _this.onSerieDataChanged(sender, args); };
        }
        CursorSignalsDataModel.prototype.initialize = function () {
            this.component.loadComponentSettings();
            var settings = this.component.getComponentSettings();
            if (settings != undefined) {
                this.setComponentSettings(settings);
            }
            //When widget is initialized data can be persisted
            this._isPersistEnabled = true;
        };
        CursorSignalsDataModel.prototype.initializeComponent = function () {
            this.component.defaultSettingsDataId = defaultComponentSettings_1.DefaultComponentSettings.DataModelDefinitionId;
        };
        /**
         * Returns the default component settings for this datamodel
         *
         * @returns {(ComponentSettings|undefined)}
         * @memberof CursorSignalsDataModel
         */
        CursorSignalsDataModel.prototype.getDefaultComponentSettings = function () {
            return defaultComponentSettings_1.DefaultComponentSettings.getCursorInfoDataModelDefinition();
        };
        CursorSignalsDataModel.prototype.dispose = function () {
        };
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
        CursorSignalsDataModel.prototype.getComponentSettings = function (onlyModified) {
            var cursorSignalsData = new Array();
            for (var i = 0; i < this._cursorSignals.length; i++) {
                cursorSignalsData.push(this._cursorSignals[i].getSettings());
            }
            this.component.setSetting("cursorSignalsData", cursorSignalsData);
            return this.component.getComponentSettings(onlyModified);
        };
        CursorSignalsDataModel.prototype.setComponentSettings = function (componentSettings) {
            if (componentSettings != undefined) {
                this.component.setComponentSettings(componentSettings);
                var cursorSignalsData = this.component.getSetting("cursorSignalsData");
                if (cursorSignalsData != undefined) {
                    //We add the series from bottom to top. In the cursorInfoWidget, the last serie we insert is always placed on top.
                    for (var i = cursorSignalsData.length - 1; i > -1; i--) {
                        var cursorSignalData = cursorSignalsData[i];
                        var settings = settings_1.Settings.create(cursorSignalData);
                        var series = new Array();
                        var serie = this.getSerieFromProvider(settings.getValue(settingIds_1.SettingIds.SerieId));
                        if (serie != undefined) {
                            series.push(serie);
                        }
                        this.addSeries(series, settings.getValue(settingIds_1.SettingIds.ExpandState), settings.getValue(settingIds_1.SettingIds.CursorInfo));
                    }
                }
                this.onModelChanged();
            }
        };
        CursorSignalsDataModel.prototype.getSerieFromProvider = function (id) {
            var seriesProvider = this.component.getSubComponent(defaultComponentSettings_1.DefaultComponentSettings.SeriesProviderId);
            if (seriesProvider != undefined) {
                return seriesProvider.get(id);
            }
            return undefined;
        };
        CursorSignalsDataModel.prototype.addSeries = function (series, expandState, cursorInfo) {
            var cursorSignals = new Array();
            for (var i = 0; i < series.length; i++) {
                if (series[i].type === seriesType_1.SeriesType.timeSeries) {
                    cursorSignals.push(new ytCursorSignal_1.YTCursorSignal(series[i], expandState, cursorInfo));
                }
                else if (series[i].type === seriesType_1.SeriesType.xySeries) {
                    cursorSignals.push(new xyCursorSignal_1.XYCursorSignal(series[i], expandState, cursorInfo));
                }
                else if (series[i].type === seriesType_1.SeriesType.fftSeries) {
                    cursorSignals.push(new fftCursorSignal_1.FFTCursorSignal(series[i], expandState, cursorInfo));
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
            this.saveSettings();
        };
        /**
         * Save settings in cursor dataModel
         *
         * @memberof CursorSignalsDataModel
         */
        CursorSignalsDataModel.prototype.saveSettings = function () {
            if (this._isPersistEnabled) {
                this.component.saveComponentSettings();
            }
        };
        return CursorSignalsDataModel;
    }());
    exports.CursorSignalsDataModel = CursorSignalsDataModel;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3Vyc29yU2lnbmFsc0RhdGFNb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jdXJzb3JJbmZvV2lkZ2V0L21vZGVsL2N1cnNvclNpZ25hbHNEYXRhTW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQXFCQTtRQUFnQyxxQ0FBd0M7UUFBeEU7O1FBQTBFLENBQUM7UUFBRCx3QkFBQztJQUFELENBQUMsQUFBM0UsQ0FBZ0MsbUJBQVUsR0FBaUM7SUFBQSxDQUFDO0lBRTVFO1FBWUk7WUFBQSxpQkFFQztZQVZPLHNCQUFpQixHQUFZLEtBQUssQ0FBQztZQUUzQyxzQkFBaUIsR0FBRyxJQUFJLGlCQUFpQixFQUFFLENBQUM7WUFFcEMsbUJBQWMsR0FBd0IsSUFBSyxLQUFLLEVBQWdCLENBQUM7WUFFakUsNkJBQXdCLEdBQUcsVUFBQyxNQUFNLEVBQUMsSUFBSSxJQUFHLE9BQUEsS0FBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsRUFBcEMsQ0FBb0MsQ0FBQztRQUl2RixDQUFDO1FBRUQsMkNBQVUsR0FBVjtZQUNJLElBQUksQ0FBQyxTQUFTLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUN2QyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLG9CQUFvQixFQUFFLENBQUM7WUFDckQsSUFBRyxRQUFRLElBQUksU0FBUyxFQUFDO2dCQUNyQixJQUFJLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDdkM7WUFDRCxrREFBa0Q7WUFDbEQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztRQUNsQyxDQUFDO1FBRUQsb0RBQW1CLEdBQW5CO1lBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsR0FBRyxtREFBd0IsQ0FBQyxxQkFBcUIsQ0FBQztRQUMxRixDQUFDO1FBRUQ7Ozs7O1dBS0c7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V0FBVyxDQUFDO1FBQ3ZCLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNJLGtEQUFpQixHQUF4QixVQUF5QixZQUEwQjtZQUMvQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDL0IsQ0FBQztRQUVPLG1EQUFrQixHQUExQixVQUEyQixNQUFNLEVBQUUsSUFBK0I7WUFDOUQsSUFBRyxJQUFJLENBQUMsTUFBTSxJQUFJLHVDQUFXLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksdUNBQVcsQ0FBQyxpQkFBaUI7bUJBQzdFLElBQUksQ0FBQyxNQUFNLElBQUksdUNBQVcsQ0FBQyx1QkFBdUIsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLHVDQUFXLENBQUMsWUFBWSxFQUFDO2dCQUNqRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7YUFDekI7UUFDTCxDQUFDO1FBRU8sK0NBQWMsR0FBdEI7WUFDSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEIsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSSw2Q0FBWSxHQUFuQjtZQUNJLElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFO2dCQUN4QixJQUFJLENBQUMsU0FBUyxDQUFDLHFCQUFxQixFQUFFLENBQUM7YUFDMUM7UUFDTCxDQUFDO1FBQ0wsNkJBQUM7SUFBRCxDQUFDLEFBeFBELElBd1BDO0lBeFBZLHdEQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElQb2ludCB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY29tbW9uL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSUNvbXBvbmVudCB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9pbnRlcmZhY2VzL2NvbXBvbmVudEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJU2VyaWVzUHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2NvbW1vbi9zZXJpZXNQcm92aWRlci9zZXJpZXNQcm92aWRlckludGVyZmFjZVwiO1xyXG5cclxuaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvZXZlbnRzXCI7XHJcbmltcG9ydCB7IEJhc2VTZXJpZXMgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9iYXNlU2VyaWVzXCI7XHJcbmltcG9ydCB7IFNlcmllQWN0aW9uLCBFdmVudFNlcmllRGF0YUNoYW5nZWRBcmdzIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvZXZlbnRTZXJpZURhdGFDaGFuZ2VkQXJnc1wiO1xyXG5pbXBvcnQgeyBDdXJzb3JTaWduYWwgfSBmcm9tIFwiLi9jdXJzb3JTaWduYWxcIjtcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2NvbW1vbi9wb2ludFwiO1xyXG5pbXBvcnQgeyBTZXJpZXNUeXBlIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvc2VyaWVzVHlwZVwiO1xyXG5pbXBvcnQgeyBZVEN1cnNvclNpZ25hbCB9IGZyb20gXCIuL3l0Q3Vyc29yU2lnbmFsXCI7XHJcbmltcG9ydCB7IFhZQ3Vyc29yU2lnbmFsIH0gZnJvbSBcIi4veHlDdXJzb3JTaWduYWxcIjtcclxuaW1wb3J0IHsgRkZUQ3Vyc29yU2lnbmFsIH0gZnJvbSBcIi4vZmZ0Q3Vyc29yU2lnbmFsXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudEJhc2UgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50QmFzZVwiO1xyXG5pbXBvcnQgeyBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi9kZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2NvbXBvbmVudEJhc2UvY29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgQ3Vyc29ySW5mb1Zpc2liaWxpdHkgfSBmcm9tIFwiLi9jdXJzb3JJbmZvVmlzaWJpbGl0eVwiO1xyXG5pbXBvcnQgeyBJU2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BlcnNpc3RlbmNlL2ludGVyZmFjZXMvc2V0dGluZ3NJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU2V0dGluZ0lkcyB9IGZyb20gXCIuL3NldHRpbmdJZHNcIjtcclxuaW1wb3J0IHsgU2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BlcnNpc3RlbmNlL3NldHRpbmdzXCI7XHJcblxyXG5jbGFzcyBFdmVudE1vZGVsQ2hhbmdlZCBleHRlbmRzIFR5cGVkRXZlbnQ8Q3Vyc29yU2lnbmFsc0RhdGFNb2RlbCwgbnVsbD57IH07XHJcblxyXG5leHBvcnQgY2xhc3MgQ3Vyc29yU2lnbmFsc0RhdGFNb2RlbCBpbXBsZW1lbnRzIElDb21wb25lbnR7XHJcbiAgICBcclxuICAgIHB1YmxpYyBjb21wb25lbnQhOiBDb21wb25lbnRCYXNlO1xyXG4gICAgXHJcbiAgICBwcml2YXRlIF9pc1BlcnNpc3RFbmFibGVkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgZXZlbnRNb2RlbENoYW5nZWQgPSBuZXcgRXZlbnRNb2RlbENoYW5nZWQoKTtcclxuXHJcbiAgICBwcml2YXRlIF9jdXJzb3JTaWduYWxzOiBBcnJheTxDdXJzb3JTaWduYWw+ID0gbmV3ICBBcnJheTxDdXJzb3JTaWduYWw+KCk7XHJcblxyXG4gICAgcHJpdmF0ZSBfc2VyaWVEYXRhQ2hhbmdlZEhhbmRsZXIgPSAoc2VuZGVyLGFyZ3MpPT50aGlzLm9uU2VyaWVEYXRhQ2hhbmdlZChzZW5kZXIsYXJncyk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZSgpe1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmxvYWRDb21wb25lbnRTZXR0aW5ncygpO1xyXG4gICAgICAgIGxldCBzZXR0aW5ncyA9IHRoaXMuY29tcG9uZW50LmdldENvbXBvbmVudFNldHRpbmdzKCk7XHJcbiAgICAgICAgaWYoc2V0dGluZ3MgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5zZXRDb21wb25lbnRTZXR0aW5ncyhzZXR0aW5ncyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vV2hlbiB3aWRnZXQgaXMgaW5pdGlhbGl6ZWQgZGF0YSBjYW4gYmUgcGVyc2lzdGVkXHJcbiAgICAgICAgdGhpcy5faXNQZXJzaXN0RW5hYmxlZCA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGluaXRpYWxpemVDb21wb25lbnQoKXtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5kZWZhdWx0U2V0dGluZ3NEYXRhSWQgPSBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuRGF0YU1vZGVsRGVmaW5pdGlvbklkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBjb21wb25lbnQgc2V0dGluZ3MgZm9yIHRoaXMgZGF0YW1vZGVsXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyhDb21wb25lbnRTZXR0aW5nc3x1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclNpZ25hbHNEYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgZ2V0RGVmYXVsdENvbXBvbmVudFNldHRpbmdzKCk6IENvbXBvbmVudFNldHRpbmdzfHVuZGVmaW5lZHtcclxuICAgICAgICByZXR1cm4gRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLmdldEN1cnNvckluZm9EYXRhTW9kZWxEZWZpbml0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzcG9zZSgpe1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgbGlzdCB3aXRoIHRoZSBjdXJzb3Igc2lnbmFscyBmb3IgdGhlIGN1cnNvciBpbmZvIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxDdXJzb3JTaWduYWw+fVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclNpZ25hbHNEYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEN1cnNvclNpZ25hbHMoKTogQXJyYXk8Q3Vyc29yU2lnbmFsPntcclxuICAgICAgICByZXR1cm4gdGhpcy5fY3Vyc29yU2lnbmFscztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICBSZXR1cm5zIHRoZSBDdXJzb3JTaWduYWwgd2hpY2ggbGlua3MgdG8gdGhlIGdpdmVuIHNlcmllXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtCYXNlU2VyaWVzfSBzZXJpZVxyXG4gICAgICogQHJldHVybnMgeyhDdXJzb3JTaWduYWx8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTaWduYWxzRGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRDdXJzb3JTaWduYWwoc2VyaWU6IEJhc2VTZXJpZXMpOiBDdXJzb3JTaWduYWx8dW5kZWZpbmVke1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpIDwgdGhpcy5fY3Vyc29yU2lnbmFscy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX2N1cnNvclNpZ25hbHNbaV0uc2VyaWUuaWQgPT09IHNlcmllLmlkKXtcclxuICAgICAgICAgICAgICAgIC8vIHNlcmllIGFscmVhZHkgaW4gbGlzdFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnNvclNpZ25hbHNbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgY3Vyc29yU2lnbmFsIGluIHRoZSBkYXRhbW9kZWwgZWxzZSAtMSBpZiBub3QgZm91bmRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0N1cnNvclNpZ25hbH0gY3Vyc29yU2lnbmFsXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclNpZ25hbHNEYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEluZGV4KGN1cnNvclNpZ25hbDogQ3Vyc29yU2lnbmFsKTogbnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJzb3JTaWduYWxzLmluZGV4T2YoY3Vyc29yU2lnbmFsKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Q29tcG9uZW50U2V0dGluZ3Mob25seU1vZGlmaWVkOiBib29sZWFuKTogQ29tcG9uZW50U2V0dGluZ3N7XHJcbiAgICAgICAgbGV0IGN1cnNvclNpZ25hbHNEYXRhID0gbmV3IEFycmF5PElTZXR0aW5ncz4oKTtcclxuICAgICAgICBmb3IobGV0IGkgPTA7IGkgPCB0aGlzLl9jdXJzb3JTaWduYWxzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgY3Vyc29yU2lnbmFsc0RhdGEucHVzaCh0aGlzLl9jdXJzb3JTaWduYWxzW2ldLmdldFNldHRpbmdzKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5zZXRTZXR0aW5nKFwiY3Vyc29yU2lnbmFsc0RhdGFcIiwgY3Vyc29yU2lnbmFsc0RhdGEpO1xyXG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50LmdldENvbXBvbmVudFNldHRpbmdzKG9ubHlNb2RpZmllZCk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0Q29tcG9uZW50U2V0dGluZ3MoY29tcG9uZW50U2V0dGluZ3M6IENvbXBvbmVudFNldHRpbmdzKSB7XHJcbiAgICAgICAgaWYoY29tcG9uZW50U2V0dGluZ3MgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuc2V0Q29tcG9uZW50U2V0dGluZ3MoY29tcG9uZW50U2V0dGluZ3MpO1xyXG4gICAgICAgICAgICBsZXQgY3Vyc29yU2lnbmFsc0RhdGE6IEFycmF5PElTZXR0aW5ncz4gPSB0aGlzLmNvbXBvbmVudC5nZXRTZXR0aW5nKFwiY3Vyc29yU2lnbmFsc0RhdGFcIik7XHJcblxyXG4gICAgICAgICAgICBpZihjdXJzb3JTaWduYWxzRGF0YSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgLy9XZSBhZGQgdGhlIHNlcmllcyBmcm9tIGJvdHRvbSB0byB0b3AuIEluIHRoZSBjdXJzb3JJbmZvV2lkZ2V0LCB0aGUgbGFzdCBzZXJpZSB3ZSBpbnNlcnQgaXMgYWx3YXlzIHBsYWNlZCBvbiB0b3AuXHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSBjdXJzb3JTaWduYWxzRGF0YS5sZW5ndGggLTE7IGkgPiAtMTsgaS0tKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY3Vyc29yU2lnbmFsRGF0YTogSVNldHRpbmdzID0gY3Vyc29yU2lnbmFsc0RhdGFbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNldHRpbmdzID0gU2V0dGluZ3MuY3JlYXRlKGN1cnNvclNpZ25hbERhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzZXJpZXMgPSBuZXcgQXJyYXk8QmFzZVNlcmllcz4oKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc2VyaWUgPSB0aGlzLmdldFNlcmllRnJvbVByb3ZpZGVyKHNldHRpbmdzLmdldFZhbHVlKFNldHRpbmdJZHMuU2VyaWVJZCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlcmllICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcmllcy5wdXNoKHNlcmllKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRTZXJpZXMoc2VyaWVzLCBzZXR0aW5ncy5nZXRWYWx1ZShTZXR0aW5nSWRzLkV4cGFuZFN0YXRlKSwgc2V0dGluZ3MuZ2V0VmFsdWUoU2V0dGluZ0lkcy5DdXJzb3JJbmZvKSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKCk7ICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRTZXJpZUZyb21Qcm92aWRlcihpZDogc3RyaW5nKTogQmFzZVNlcmllc3x1bmRlZmluZWR7XHJcbiAgICAgICAgbGV0IHNlcmllc1Byb3ZpZGVyID0gdGhpcy5jb21wb25lbnQuZ2V0U3ViQ29tcG9uZW50KCBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuU2VyaWVzUHJvdmlkZXJJZCkgYXMgSVNlcmllc1Byb3ZpZGVyO1xyXG4gICAgICAgIGlmKHNlcmllc1Byb3ZpZGVyICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiBzZXJpZXNQcm92aWRlci5nZXQoaWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYWRkU2VyaWVzKHNlcmllczogQXJyYXk8QmFzZVNlcmllcz4sIGV4cGFuZFN0YXRlOiBib29sZWFuLCBjdXJzb3JJbmZvOiBBcnJheTxDdXJzb3JJbmZvVmlzaWJpbGl0eT4pe1xyXG4gICAgICAgIGxldCBjdXJzb3JTaWduYWxzID0gbmV3IEFycmF5PEN1cnNvclNpZ25hbD4oKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNlcmllcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmIChzZXJpZXNbaV0udHlwZSA9PT0gU2VyaWVzVHlwZS50aW1lU2VyaWVzKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJzb3JTaWduYWxzLnB1c2gobmV3IFlUQ3Vyc29yU2lnbmFsKHNlcmllc1tpXSwgZXhwYW5kU3RhdGUsIGN1cnNvckluZm8pKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzZXJpZXNbaV0udHlwZSA9PT0gU2VyaWVzVHlwZS54eVNlcmllcykge1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yU2lnbmFscy5wdXNoKG5ldyBYWUN1cnNvclNpZ25hbChzZXJpZXNbaV0sIGV4cGFuZFN0YXRlLCBjdXJzb3JJbmZvKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2VyaWVzW2ldLnR5cGUgPT09IFNlcmllc1R5cGUuZmZ0U2VyaWVzKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJzb3JTaWduYWxzLnB1c2gobmV3IEZGVEN1cnNvclNpZ25hbChzZXJpZXNbaV0sIGV4cGFuZFN0YXRlLCBjdXJzb3JJbmZvKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hZGRTaWduYWwoY3Vyc29yU2lnbmFscyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIHRoZSBnaXZlbiBzaWduYWwgdG8gdGhlIHNpZ25hbCBsaXN0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxDdXJzb3JTaWduYWw+fSBjdXJzb3JTaWduYWxcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU2lnbmFsc0RhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkU2lnbmFsKGN1cnNvclNpZ25hbDogQXJyYXk8Q3Vyc29yU2lnbmFsPil7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjdXJzb3JTaWduYWwubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLl9jdXJzb3JTaWduYWxzLmluZGV4T2YoY3Vyc29yU2lnbmFsW2ldKTtcclxuICAgICAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIC8vIGN1c29yU2lnbmFsIGFscmVhZHkgaW4gbGlzdFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vQ2hlY2sgaWYgc2VyaWUgaXMgbm90IGluIHRoZSBsaXN0XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZ2V0Q3Vyc29yU2lnbmFsKGN1cnNvclNpZ25hbFtpXS5zZXJpZSkgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGN1cnNvclNpZ25hbFtpXS5zZXJpZS5ldmVudERhdGFDaGFuZ2VkLmF0dGFjaCh0aGlzLl9zZXJpZURhdGFDaGFuZ2VkSGFuZGxlcik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJzb3JTaWduYWxzLnNwbGljZSgwLCAwLCBjdXJzb3JTaWduYWxbaV0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCgpOyAgXHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyB0aGUgZ2l2ZW4gc2lnbmFsIGZyb20gdGhlIHNpZ25hbCBsaXN0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtDdXJzb3JTaWduYWx9IGN1cnNvclNpZ25hbFxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclNpZ25hbHNEYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlbW92ZVNlcmllKGN1cnNvclNpZ25hbDogQ3Vyc29yU2lnbmFsKXtcclxuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLl9jdXJzb3JTaWduYWxzLmluZGV4T2YoY3Vyc29yU2lnbmFsKTtcclxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJzb3JTaWduYWxzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIGN1cnNvclNpZ25hbC5zZXJpZS5ldmVudERhdGFDaGFuZ2VkLmRldGFjaCh0aGlzLl9zZXJpZURhdGFDaGFuZ2VkSGFuZGxlcik7XHJcbiAgICAgICAgICAgIHRoaXMub25Nb2RlbENoYW5nZWQoKTsgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGN1cnNvciBpbmZvcm1hdGlvbnMgZm9yIHRoZSBnaXZlbiBzaWduYWwgdG8gdGhlIGRlZmluZWQgY3Vyc29ySW5kZXggMSBhbmQgMlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Q3Vyc29yU2lnbmFsfSBjdXJzb3JTaWduYWxcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjdXJzb3JJbmRleDFcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjdXJzb3JJbmRleDJcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTaWduYWxzRGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB1cGRhdGVDdXJzb3JWYWx1ZXMoY3Vyc29yU2lnbmFsOkN1cnNvclNpZ25hbCwgY3Vyc29yVGltZXN0YW1wMTogbnVtYmVyfHVuZGVmaW5lZCwgY3Vyc29yVGltZXN0YW1wMjogbnVtYmVyfHVuZGVmaW5lZCl7XHJcbiAgICAgICAgaWYgKCFjdXJzb3JTaWduYWwuc2VyaWUucmF3UG9pbnRzVmFsaWQpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY3Vyc29yUG9pbnQxOiBJUG9pbnR8dW5kZWZpbmVkO1xyXG4gICAgICAgIGxldCBjdXJzb3JQb2ludDI6IElQb2ludHx1bmRlZmluZWQ7XHJcbiAgICAgICAgaWYoY3Vyc29yVGltZXN0YW1wMSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBjdXJzb3JQb2ludDEgPSB0aGlzLmdldEN1cnNvclNpZ25hbFBvaW50KGN1cnNvclNpZ25hbCwgY3Vyc29yVGltZXN0YW1wMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGN1cnNvclRpbWVzdGFtcDIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgY3Vyc29yUG9pbnQyID0gdGhpcy5nZXRDdXJzb3JTaWduYWxQb2ludChjdXJzb3JTaWduYWwsIGN1cnNvclRpbWVzdGFtcDIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjdXJzb3JTaWduYWwudXBkYXRlVmFsdWVzKGN1cnNvclBvaW50MSwgY3Vyc29yUG9pbnQyLCBjdXJzb3JUaW1lc3RhbXAxLCBjdXJzb3JUaW1lc3RhbXAyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldHMgYSBjdXJzb3Igc2lnbmFsIHBvaW50IGZyb20gdGhlIGdpdmVuIGN1cm9yIHNpZ25hbCBhbmQgdGltZXN0YW1wXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Q3Vyc29yU2lnbmFsfSBjdXJzb3JTaWduYWxcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjdXJzb3JUaW1lc3RhbXBcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU2lnbmFsc0RhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldEN1cnNvclNpZ25hbFBvaW50KGN1cnNvclNpZ25hbDogQ3Vyc29yU2lnbmFsLCBjdXJzb3JUaW1lc3RhbXA6IG51bWJlcik6SVBvaW50IHtcclxuICAgICAgICBsZXQgY3Vyc29yUG9pbnQ6SVBvaW50ID0gUG9pbnQuRW1wdHkoKTtcclxuXHJcbiAgICAgICAgLy8gZ2V0IHRoZSBuZWFyZXN0IHNpZ25hbCBwb2ludCBmb3IgdmFsaWQgdGltZXN0YW1wc1xyXG4gICAgICAgIGlmIChjdXJzb3JUaW1lc3RhbXAgIT0gdW5kZWZpbmVkICYmIGN1cnNvclNpZ25hbC5zZXJpZS50aW1lc3RhbXBJc0luUmFuZ2UoY3Vyc29yVGltZXN0YW1wKSkge1xyXG4gICAgICAgICAgICBjdXJzb3JQb2ludCA9ICBjdXJzb3JTaWduYWwuc2VyaWUucHJldmlvdXNQb2ludEZyb21UaW1lc3RhbXAoY3Vyc29yVGltZXN0YW1wKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjdXJzb3JQb2ludDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENsZWFycyBhbGwgdGhlIGN1cnNvciB2YWx1ZSBpbmZvcm1hdGlvbnMgb2YgdGhpcyBzaWduYWxcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0N1cnNvclNpZ25hbH0gY3Vyc29yU2lnbmFsXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU2lnbmFsc0RhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2xlYXJDdXJzb3JWYWx1ZXMoY3Vyc29yU2lnbmFsOiBDdXJzb3JTaWduYWwpe1xyXG4gICAgICAgIGN1cnNvclNpZ25hbC5jbGVhclZhbHVlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25TZXJpZURhdGFDaGFuZ2VkKHNlbmRlciwgYXJnczogRXZlbnRTZXJpZURhdGFDaGFuZ2VkQXJncyl7XHJcbiAgICAgICAgaWYoYXJncy5hY3Rpb24gPT0gU2VyaWVBY3Rpb24ucmVuYW1lIHx8IGFyZ3MuYWN0aW9uID09IFNlcmllQWN0aW9uLmRhdGFQb2ludHNDaGFuZ2VkIFxyXG4gICAgICAgICAgICB8fCBhcmdzLmFjdGlvbiA9PSBTZXJpZUFjdGlvbi5zdGFydFRyaWdnZXJUaW1lQ2hhbmdlZCB8fCBhcmdzLmFjdGlvbiA9PSBTZXJpZUFjdGlvbi5jb2xvckNoYW5nZWQpe1xyXG4gICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKCk7ICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbk1vZGVsQ2hhbmdlZCgpe1xyXG4gICAgICAgIHRoaXMuZXZlbnRNb2RlbENoYW5nZWQucmFpc2UodGhpcywgbnVsbCk7XHJcbiAgICAgICAgdGhpcy5zYXZlU2V0dGluZ3MoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNhdmUgc2V0dGluZ3MgaW4gY3Vyc29yIGRhdGFNb2RlbFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTaWduYWxzRGF0YU1vZGVsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzYXZlU2V0dGluZ3MoKXtcclxuICAgICAgICBpZiAodGhpcy5faXNQZXJzaXN0RW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5zYXZlQ29tcG9uZW50U2V0dGluZ3MoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=