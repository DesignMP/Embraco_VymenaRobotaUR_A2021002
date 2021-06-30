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
define(["require", "exports", "../../framework/events", "./eventSerieDataChangedArgs", "../common/signal/eventSignalDataChangedArgs", "../common/calculatorProvider/calculationDataPoints", "../../common/dateTimeHelper", "../../common/seriesHelper", "../common/point", "../common/calculatorProvider/calculationDataInfo", "./seriesType", "../../common/persistence/settings", "../common/signal/signal", "./settingIds", "../signalManagerDataModel/signalCategory"], function (require, exports, events_1, eventSerieDataChangedArgs_1, eventSignalDataChangedArgs_1, calculationDataPoints_1, dateTimeHelper_1, seriesHelper_1, point_1, calculationDataInfo_1, seriesType_1, settings_1, signal_1, settingIds_1, signalCategory_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventSeriesDataChanged = /** @class */ (function (_super) {
        __extends(EventSeriesDataChanged, _super);
        function EventSeriesDataChanged() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventSeriesDataChanged;
    }(events_1.TypedEvent));
    ;
    var BaseSeries = /** @class */ (function () {
        /**
         * Creates an instance of BaseSeries
         * @param {ISignal} signal
         * @param {string} name
         * @param {string} color
         * @param {CursorType} cursorType
         * @param {ISeriesProvider} serieProvider
         * @param {string} [uniqueId=""]
         * @memberof BaseSeries
         */
        function BaseSeries(signal, name, color, cursorType, serieProvider, uniqueId) {
            var _this = this;
            this.type = seriesType_1.SeriesType.timeSeries;
            this.eventDataChanged = new EventSeriesDataChanged();
            this._onSignalDataChanged = function (sender, eventArgs) { _this.onSignalDataChanged(sender, eventArgs); };
            this._rawPoints = [];
            this._isCalculated = false;
            this._startTriggerTime = 0;
            this.calculationDataInfo = undefined;
            this.isAutoUpdated = false;
            this._data = [];
            // holds the timestamps
            this._timestamps = [];
            this._errorInfo = new Array();
            this._seriesProvider = serieProvider;
            this.cursorType = cursorType;
            this._name = name;
            this._color = color;
            this.signal = signal;
            this.signal.eventDataChanged.attach(this._onSignalDataChanged);
            this._description = "";
            // Set given unique id
            this._id = uniqueId;
            this.persistID = serieProvider.getSeriesPersistingId(this._id);
        }
        Object.defineProperty(BaseSeries.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseSeries.prototype, "errorInfo", {
            get: function () {
                return this._errorInfo;
            },
            set: function (value) {
                this._errorInfo = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseSeries.prototype, "originalName", {
            get: function () {
                return this.signal.name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseSeries.prototype, "description", {
            get: function () {
                return this._description;
            },
            set: function (value) {
                this._description = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Create a signal with the given persisted signalData
         *
         * @protected
         * @param {*} signalData
         * @returns {ISignal}
         * @memberof BaseSeries
         */
        BaseSeries.createSignal = function (signalData) {
            var signal = new signal_1.Signal("", new Array());
            if (signalData != undefined) {
                signal.setSettings(signalData);
            }
            return signal;
        };
        BaseSeries.prototype.getIcon = function () {
            return this._seriesProvider.getIcon(this);
        };
        BaseSeries.prototype.getSpecificIcon = function (svgName) {
            return this._seriesProvider.getSpecificIcon(svgName);
        };
        BaseSeries.prototype.getErrorText = function () {
            var formatedText = "";
            if (this.errorInfo != undefined) {
                if (this.errorInfo.length > 0) {
                    formatedText = "";
                    this.errorInfo.forEach(function (error) {
                        formatedText += error + "\r\n";
                    });
                }
            }
            return formatedText;
        };
        /**
         * Returns the persisting data of the BaseSeries
         *
         * @returns {ISettings}
         * @memberof BaseSeries
         */
        BaseSeries.prototype.getSettings = function () {
            var settings = new settings_1.Settings("BaseSeries");
            var calculationDataInfoSettings = undefined;
            var signalDataSettings = undefined;
            var transferables;
            if (this.calculationDataInfo == undefined) {
                signalDataSettings = this.signal.getSettings();
                transferables = [signalDataSettings.data.rawPointsX.buffer, signalDataSettings.data.rawPointsY.buffer];
            }
            else {
                calculationDataInfoSettings = this.calculationDataInfo.getSettings();
            }
            settings.setValue(settingIds_1.SettingIds.SeriesId, this.id);
            settings.setValue(settingIds_1.SettingIds.SeriesName, this.name);
            settings.setValue(settingIds_1.SettingIds.SeriesColor, this.color);
            settings.setValue(settingIds_1.SettingIds.SeriesSignalData, signalDataSettings);
            settings.setValue(settingIds_1.SettingIds.SeriesCalculationData, calculationDataInfoSettings);
            settings.setValue("transferables", transferables);
            return settings;
        };
        /**
         * Disposes the BaseSeries
         *
         * @memberof BaseSeries
         */
        BaseSeries.prototype.dispose = function () {
            this.signal.eventDataChanged.detach(this._onSignalDataChanged);
        };
        /**
         * Updates the timestamps baseon the available series
         *
         * @private
         * @memberof BaseSeries
         */
        BaseSeries.prototype.updateTimestamps = function () {
        };
        Object.defineProperty(BaseSeries.prototype, "iconDefinition", {
            /**
             * Get serie icon definition
             *
             * @readonly
             * @type {string}
             * @memberof baseSeries
             */
            get: function () {
                var iconDefinition = "<div class='e-doc' style='position: relative;height:16px;width:30px;margin:auto;float:left;margin-left:6px;margin-top:2px'>";
                // add series icon (with overlays)
                iconDefinition += this.getIcon();
                iconDefinition += "</div>";
                return iconDefinition;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Updates the data of an existing serie
         *
         * @param {Array<IPoint>} rawPoints
         * @memberof baseSeries
         */
        BaseSeries.prototype.updatePoints = function (rawPoints) {
            this.rawPoints = rawPoints;
            this.getRange();
            this.simplifySignal(rawPoints);
            this.signal.rawPoints = rawPoints;
        };
        BaseSeries.prototype.simplifySignal = function (rawPoints) { };
        ;
        /**
         * Updates input data (DataPoints list) for calculated series
         *
         * @param {Array<CalculationDataPoints>} inputData
         * @memberof baseSeries
         */
        BaseSeries.prototype.updateInputData = function (inputData) {
            if (this.calculationDataInfo != undefined) {
                for (var i = 0; i < inputData.length; i++) {
                    if (inputData[i] instanceof calculationDataPoints_1.CalculationDataPoints) {
                        this.calculationDataInfo.inputData[i] = inputData[i];
                    }
                }
            }
        };
        /**
         * Updates input data values (input string; e.g. signalname, 5, ...) for calculated series
         *
         * @private
         * @param {Array<SignalManagerCalculationInputData>} inputChilds
         * @memberof BaseSeries
         */
        BaseSeries.prototype.updateInputDataValues = function (inputChilds) {
            if (this.calculationDataInfo != undefined) {
                var values = new Array();
                var inputDataIds = new Array();
                for (var i = 0; i < inputChilds.length; i++) {
                    values.push(inputChilds[i].getRawValue());
                    inputDataIds.push(inputChilds[i].calculationData.id);
                }
                this.calculationDataInfo.inputDataIds = inputDataIds;
                this.calculationDataInfo.inputDataValues = values;
            }
        };
        /**
         * Updates the input series for calculated series
         *
         * @private
         * @param {Array<SignalManagerCalculationInputData>} inputChilds
         * @memberof BaseSeries
         */
        BaseSeries.prototype.updateInputSeriesIds = function (inputChilds) {
            if (this.calculationDataInfo != undefined) {
                this.calculationDataInfo.inputSeriesIds = [];
                for (var i = 0; i < inputChilds.length; i++) {
                    var serie = inputChilds[i].serie;
                    if (serie != undefined) {
                        this.calculationDataInfo.inputSeriesIds.push(serie.id);
                    }
                }
            }
        };
        /**
         * Updates the calculation informations for this series
         *
         * @param {Array<TCalculationData>} inputData
         * @param {string} type
         * @param {Array<SignalManagerCalculationInputData>} inputChilds
         * @memberof BaseSeries
         */
        BaseSeries.prototype.updateCalculationDataInfo = function (inputData, type, inputChilds, seriesProvider) {
            if (this.calculationDataInfo == undefined) {
                this.calculationDataInfo = new calculationDataInfo_1.CalculationDataInfo(seriesProvider.getUniqueCalculationId());
            }
            this.calculationDataInfo.type = type;
            this.updateInputData(inputData);
            this.updateInputDataValues(inputChilds);
            this.updateInputSeriesIds(inputChilds);
        };
        /**
         * Gets the range limits from a serie
         *
         * @protected
         * @memberof baseSeries
         */
        BaseSeries.prototype.getRange = function () {
            this.maxX = this.getMaxX();
            this.minX = this.getMinX();
            this.maxY = this.getMaxY();
            this.minY = this.getMinY();
        };
        /**
         *
         *
         * @returns {(number | undefined)}
         * @memberof baseSeries
         */
        BaseSeries.prototype.getMaxX = function () {
            return 0;
        };
        /**
         *
         *
         * @protected
         * @returns {(number | undefined)}
         * @memberof baseSeries
         */
        BaseSeries.prototype.getMinX = function () {
            return 0;
        };
        /**
         * Get max Y value from a serie
         *
         * @protected
         * @returns {(number | undefined)}
         * @memberof baseSeries
         */
        BaseSeries.prototype.getMaxY = function () {
            var maxY;
            if (this.rawPoints.length > 0) {
                for (var i = 0; i < this.rawPoints.length; i++) {
                    if (maxY == undefined || this.rawPoints[i].y > maxY) {
                        maxY = this.rawPoints[i].y;
                    }
                }
            }
            return maxY;
        };
        /**
         * Get min Y value from a serie
         *
         * @protected
         * @returns {(number | undefined)}
         * @memberof baseSeries
         */
        BaseSeries.prototype.getMinY = function () {
            var minY;
            if (this.rawPoints.length > 0) {
                for (var i = 0; i < this.rawPoints.length; i++) {
                    if (minY == undefined || this.rawPoints[i].y < minY) {
                        minY = this.rawPoints[i].y;
                    }
                }
            }
            return minY;
        };
        Object.defineProperty(BaseSeries.prototype, "rawPoints", {
            /**
             * Get rawPoints
             *
             * @type {Array<IPoint>}
             * @memberof baseSeries
             */
            get: function () {
                return this._rawPoints;
            },
            /**
             * Set rawPoints
             *
             * @memberof baseSeries
             */
            set: function (points) {
                this._rawPoints = points;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseSeries.prototype, "timestamps", {
            /**
             * gets the timestamps available in the series
             *
             * @readonly
             * @type {Array<number>}
             * @memberof baseSeries
             */
            get: function () {
                return this._timestamps;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * determines the index of the timestamp within the available timestamps
         *
         * @param {number} timestamp
         * @param {number[]} timestamps
         * @param {BinSearchMode} LOWER
         * @returns
         * @memberof baseSeries
         */
        BaseSeries.prototype.getTimestampIndex = function (timestamp, binSearchMode) {
            if (binSearchMode === void 0) { binSearchMode = seriesHelper_1.BinSearchMode.NEAREST; }
            // get the available timestamps
            var timestamps = this.timestamps;
            // get the index of the timestamp 
            var timestampIndex = seriesHelper_1.SeriesHelper.indexOfNearest(timestamp, timestamps, binSearchMode);
            return timestampIndex >= 0 && timestampIndex < timestamps.length ? timestampIndex : -1;
        };
        /**
         * Gets the series point nearest to the timestamp
         *
         * @returns {IPoint}
         * @memberof baseSeries
         */
        BaseSeries.prototype.pointFromTimestamp = function (timestamp) {
            var nearestTimestampIndex = this.getTimestampIndex(timestamp);
            return nearestTimestampIndex >= 0 ? this.rawPoints[nearestTimestampIndex] : new point_1.Point(0, 0);
        };
        /**
         * Gets the series point previous to the timestamp
         *
         * @returns {IPoint}
         * @memberof baseSeries
         */
        BaseSeries.prototype.previousPointFromTimestamp = function (timestamp) {
            // get the lowerbound timestamp index ( if the timestamp is not matching exactly)
            var nearestTimestampIndex = this.getTimestampIndex(timestamp, seriesHelper_1.BinSearchMode.LOWERBOUND);
            return nearestTimestampIndex >= 0 ? this.rawPoints[nearestTimestampIndex] : new point_1.Point(0, 0);
        };
        /**
         * Checks if the timestamp is within the available range
         *
         * @param {number} timestamp
         * @returns {boolean}
         * @memberof BaseSeries
         */
        BaseSeries.prototype.timestampIsInRange = function (timestamp) {
            return seriesHelper_1.SeriesHelper.isInRange(timestamp, this.timestamps);
        };
        Object.defineProperty(BaseSeries.prototype, "isCalculated", {
            /**
             * Get if serie is calculated
             *
             * @type {boolean}
             * @memberof baseSeries
             */
            get: function () {
                return this._isCalculated;
            },
            /**
             * Set if serie is calculated
             *
             * @memberof baseSeries
             */
            set: function (value) {
                this._isCalculated = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseSeries.prototype, "name", {
            /**
             * Get serie name
             *
             * @type {string}
             * @memberof baseSeries
             */
            get: function () {
                return this._name;
            },
            /**
             * Set serie name
             *
             * @memberof baseSeries
             */
            set: function (value) {
                var oldName = this._name;
                this._name = value;
                this.onDataChanged(eventSerieDataChangedArgs_1.SerieAction.rename, this._name, oldName);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseSeries.prototype, "id", {
            /**
             * Get unique serie id
             *
             * @readonly
             * @type {string}
             * @memberof baseSeries
             */
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseSeries.prototype, "color", {
            /**
             * Get serie color
             *
             * @type {string}
             * @memberof baseSeries
             */
            get: function () {
                return this._color;
            },
            /**
             * Set serie color
             *
             * @memberof baseSeries
             */
            set: function (value) {
                var oldColor = this._color;
                this._color = value;
                this.onDataChanged(eventSerieDataChangedArgs_1.SerieAction.colorChanged, this._color, oldColor);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseSeries.prototype, "rawPointsValid", {
            /**
             * Get if rawPoints are valid
             *
             * @readonly
             * @type {boolean}
             * @memberof baseSeries
             */
            get: function () {
                return this.signal.rawPointsValid;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseSeries.prototype, "startTriggerTime", {
            /**
             * Get startTriggerTime
             *
             * @type {number}
             * @memberof baseSeries
             */
            get: function () {
                return this._startTriggerTime;
            },
            /**
             * Set startTriggerTime
             *
             * @memberof baseSeries
             */
            set: function (value) {
                var oldStartTriggerTime = this._startTriggerTime;
                this._startTriggerTime = value;
                this.onDataChanged(eventSerieDataChangedArgs_1.SerieAction.startTriggerTimeChanged, oldStartTriggerTime);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseSeries.prototype, "additionalInfo", {
            /**
             * Get start trigger formated time (shown next to serie name)
             *
             * @readonly
             * @type {string}
             * @memberof baseSeries
             */
            get: function () {
                if (this._startTriggerTime != 0) {
                    return dateTimeHelper_1.DateTimeHelper.getDateTime(this._startTriggerTime);
                }
                return ""; // No start trigger info available
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseSeries.prototype, "parent", {
            /**
             * Get parent of serie
             *
             * @type {(ISerieGroup | undefined)}
             * @memberof baseSeries
             */
            get: function () {
                return this._parent;
            },
            /**
             * Set parent of serie
             *
             * @memberof baseSeries
             */
            set: function (value) {
                this._parent = value;
                if (this._parent != undefined) {
                    if (this._parent.parent instanceof signalCategory_1.SignalCategory) {
                        if (this._parent.parent.id == signalCategory_1.SignalCategory.CategoryIdRecent) {
                            // Set serie to autoUpdated if in recent category
                            this.isAutoUpdated = true;
                        }
                    }
                    this.startTriggerTime = this._parent.startTriggerTime;
                }
                else {
                    this.startTriggerTime = 0;
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Resets the name to the original name from the signal
         *
         * @memberof baseSeries
         */
        BaseSeries.prototype.resetName = function () {
            this.name = this.originalName;
        };
        /**
         * Clones this serie
         *
         * @returns
         * @memberof baseSeries
         */
        BaseSeries.prototype.clone = function () {
            var settings = this.getSettings();
            settings.setValue(settingIds_1.SettingIds.SeriesId, this._seriesProvider.getUniqueId());
            return this._seriesProvider.createSerie(settings);
        };
        /**
         * Handles the serie data changed event (e.g. serie color, serie datapoints, rename changed)
         *
         * @private
         * @param {*} sender
         * @param {*} eventArgs
         * @memberof baseSeries
         */
        BaseSeries.prototype.onSignalDataChanged = function (sender, eventArgs) {
            switch (eventArgs.action) {
                case eventSignalDataChangedArgs_1.SignalAction.dataPointsChanged: {
                    this.updateTimestamps();
                    this.onDataChanged(eventSerieDataChangedArgs_1.SerieAction.dataPointsChanged, eventArgs.data);
                    break;
                }
                case eventSignalDataChangedArgs_1.SignalAction.startTriggerTimeChanged: {
                    this.onDataChanged(eventSerieDataChangedArgs_1.SerieAction.startTriggerTimeChanged, eventArgs.data);
                    break;
                }
            }
        };
        BaseSeries.prototype.onDataChanged = function (action, data, oldData) {
            if (oldData === void 0) { oldData = undefined; }
            var eventArgs = new eventSerieDataChangedArgs_1.EventSerieDataChangedArgs(action, data, oldData);
            this.eventDataChanged.raise(this, eventArgs);
            if (action == eventSerieDataChangedArgs_1.SerieAction.dataPointsChanged) {
                this.onSerieDataChanged(data);
            }
        };
        /**
         * Called whenever the seris data has changed
         *
         * @private
         * @param {IPoint[]} data
         * @memberof BaseSeries
         */
        BaseSeries.prototype.onSerieDataChanged = function (data) {
            //TODO: eventually call simplification ????
        };
        return BaseSeries;
    }());
    exports.BaseSeries = BaseSeries;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZVNlcmllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9iYXNlU2VyaWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUF1QkE7UUFBcUMsMENBQWtEO1FBQXZGOztRQUF5RixDQUFDO1FBQUQsNkJBQUM7SUFBRCxDQUFDLEFBQTFGLENBQXFDLG1CQUFVLEdBQTJDO0lBQUEsQ0FBQztJQUUzRjtRQThESTs7Ozs7Ozs7O1dBU0c7UUFDSCxvQkFBc0IsTUFBZSxFQUFFLElBQVksRUFBRSxLQUFhLEVBQUUsVUFBc0IsRUFBRSxhQUE4QixFQUFFLFFBQWdCO1lBQTVJLGlCQVlDO1lBbEZELFNBQUksR0FBRyx1QkFBVSxDQUFDLFVBQVUsQ0FBQztZQUU3QixxQkFBZ0IsR0FBMkIsSUFBSSxzQkFBc0IsRUFBRSxDQUFDO1lBSWhFLHlCQUFvQixHQUFHLFVBQUMsTUFBTSxFQUFFLFNBQVMsSUFBTyxLQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFBLENBQUEsQ0FBQyxDQUFBO1lBRzFGLGVBQVUsR0FBa0IsRUFBRSxDQUFDO1lBTWpDLGtCQUFhLEdBQVksS0FBSyxDQUFDO1lBRS9CLHNCQUFpQixHQUFXLENBQUMsQ0FBQztZQUV0Qyx3QkFBbUIsR0FBa0MsU0FBUyxDQUFDO1lBRS9ELGtCQUFhLEdBQVksS0FBSyxDQUFDO1lBQ3JCLFVBQUssR0FBa0IsRUFBRSxDQUFDO1lBY2hDLHVCQUF1QjtZQUNiLGdCQUFXLEdBQVksRUFBRSxDQUFDO1lBRWhDLGVBQVUsR0FBRyxJQUFJLEtBQUssRUFBVSxDQUFDO1lBZ0NyQyxJQUFJLENBQUMsZUFBZSxHQUFHLGFBQWEsQ0FBQztZQUNyQyxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztZQUM3QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FB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LGdCQUFnQixDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDN0MsSUFBRyxNQUFNLElBQUksdUNBQVcsQ0FBQyxpQkFBaUIsRUFBQztnQkFDdkMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2pDO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNPLHVDQUFrQixHQUE1QixVQUE4QixJQUFjO1lBQ3hDLDJDQUEyQztRQUMvQyxDQUFDO1FBQ0wsaUJBQUM7SUFBRCxDQUFDLEFBbG9CRCxJQWtvQkM7SUFsb0JZLGdDQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVNpZ25hbCB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy9zaWduYWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL3BvaW50SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElTZXJpZUdyb3VwIH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL3NlcmllR3JvdXBJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVNlcmllc1Byb3ZpZGVyIH0gZnJvbSBcIi4uL2NvbW1vbi9zZXJpZXNQcm92aWRlci9zZXJpZXNQcm92aWRlckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJU2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3BlcnNpc3RlbmNlL2ludGVyZmFjZXMvc2V0dGluZ3NJbnRlcmZhY2VcIjtcclxuXHJcbmltcG9ydCB7IFR5cGVkRXZlbnQgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2V2ZW50c1wiO1xyXG5pbXBvcnQgeyBTZXJpZUFjdGlvbiwgRXZlbnRTZXJpZURhdGFDaGFuZ2VkQXJncyB9IGZyb20gXCIuL2V2ZW50U2VyaWVEYXRhQ2hhbmdlZEFyZ3NcIjtcclxuaW1wb3J0IHsgU2lnbmFsQWN0aW9uLCBFdmVudFNpZ25hbERhdGFDaGFuZ2VkQXJncyB9IGZyb20gXCIuLi9jb21tb24vc2lnbmFsL2V2ZW50U2lnbmFsRGF0YUNoYW5nZWRBcmdzXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YVBvaW50cyB9IGZyb20gXCIuLi9jb21tb24vY2FsY3VsYXRvclByb3ZpZGVyL2NhbGN1bGF0aW9uRGF0YVBvaW50c1wiO1xyXG5pbXBvcnQgeyBEYXRlVGltZUhlbHBlciB9IGZyb20gXCIuLi8uLi9jb21tb24vZGF0ZVRpbWVIZWxwZXJcIjtcclxuaW1wb3J0IHsgU2VyaWVzSGVscGVyLCBCaW5TZWFyY2hNb2RlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJpZXNIZWxwZXJcIjtcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi4vY29tbW9uL3BvaW50XCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YUluZm8gfSBmcm9tIFwiLi4vY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdGlvbkRhdGFJbmZvXCI7XHJcbmltcG9ydCB7IFNlcmllc1R5cGUgfSBmcm9tIFwiLi9zZXJpZXNUeXBlXCI7XHJcbmltcG9ydCB7IEN1cnNvclR5cGUgfSBmcm9tIFwiLi4vLi4vd2lkZ2V0cy9jb21tb24vc3RhdGVzL2N1cnNvclN0YXRlc1wiO1xyXG5pbXBvcnQgeyBUQ2FsY3VsYXRpb25EYXRhIH0gZnJvbSBcIi4uL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRpb25EYXRhXCI7XHJcbmltcG9ydCB7IFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YSB9IGZyb20gXCIuLi9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsL3NpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YVwiO1xyXG5pbXBvcnQgeyBTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vcGVyc2lzdGVuY2Uvc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgU2lnbmFsIH0gZnJvbSBcIi4uL2NvbW1vbi9zaWduYWwvc2lnbmFsXCI7XHJcbmltcG9ydCB7IFNldHRpbmdJZHMgfSBmcm9tIFwiLi9zZXR0aW5nSWRzXCI7XHJcbmltcG9ydCB7IFNpZ25hbENhdGVnb3J5IH0gZnJvbSBcIi4uL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvc2lnbmFsQ2F0ZWdvcnlcIjtcclxuXHJcbmNsYXNzIEV2ZW50U2VyaWVzRGF0YUNoYW5nZWQgZXh0ZW5kcyBUeXBlZEV2ZW50IDxCYXNlU2VyaWVzLCBFdmVudFNlcmllRGF0YUNoYW5nZWRBcmdzPnsgfTtcclxuXHJcbmV4cG9ydCBjbGFzcyBCYXNlU2VyaWVze1xyXG5cclxuICAgIHR5cGUgPSBTZXJpZXNUeXBlLnRpbWVTZXJpZXM7XHJcbiAgICBjdXJzb3JUeXBlOiBDdXJzb3JUeXBlO1xyXG4gICAgZXZlbnREYXRhQ2hhbmdlZDogRXZlbnRTZXJpZXNEYXRhQ2hhbmdlZCA9IG5ldyBFdmVudFNlcmllc0RhdGFDaGFuZ2VkKCk7XHJcbiAgICBwZXJzaXN0SUQ6IHN0cmluZztcclxuXHJcblxyXG4gICAgcHJpdmF0ZSBfb25TaWduYWxEYXRhQ2hhbmdlZCA9IChzZW5kZXIsIGV2ZW50QXJncykgPT4geyB0aGlzLm9uU2lnbmFsRGF0YUNoYW5nZWQoc2VuZGVyLCBldmVudEFyZ3MpfVxyXG4gICAgXHJcbiAgICBwcm90ZWN0ZWQgc2lnbmFsOiBJU2lnbmFsO1xyXG4gICAgcHJvdGVjdGVkIF9yYXdQb2ludHM6IEFycmF5PElQb2ludD4gPSBbXTtcclxuICAgIHByb3RlY3RlZCBfbmFtZTogc3RyaW5nO1xyXG4gICAgcHJvdGVjdGVkIF9jb2xvcjogc3RyaW5nO1xyXG4gICAgcHJvdGVjdGVkIF9kZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gICAgcHJvdGVjdGVkIF9pZDogc3RyaW5nO1xyXG5cclxuICAgIHByaXZhdGUgX2lzQ2FsY3VsYXRlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfcGFyZW50OiBJU2VyaWVHcm91cCB8IHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX3N0YXJ0VHJpZ2dlclRpbWU6IG51bWJlciA9IDA7XHJcbiAgICBcclxuICAgIGNhbGN1bGF0aW9uRGF0YUluZm86IENhbGN1bGF0aW9uRGF0YUluZm98dW5kZWZpbmVkID0gdW5kZWZpbmVkOyBcclxuICAgIFxyXG4gICAgaXNBdXRvVXBkYXRlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJvdGVjdGVkIF9kYXRhOiBBcnJheTxJUG9pbnQ+ID0gW107XHJcbiAgICBtYXhYIDogbnVtYmVyfHVuZGVmaW5lZDtcclxuICAgIG1pblggOiBudW1iZXJ8dW5kZWZpbmVkO1xyXG4gICAgbWF4WSA6IG51bWJlcnx1bmRlZmluZWQ7XHJcbiAgICBtaW5ZIDogbnVtYmVyfHVuZGVmaW5lZDtcclxuXHJcblxyXG4gICAgcHVibGljIGdldCBkYXRhKCk6QXJyYXk8SVBvaW50PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGE7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IGRhdGEodmFsdWUpIHtcclxuICAgICAgICB0aGlzLl9kYXRhID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgICAgIC8vIGhvbGRzIHRoZSB0aW1lc3RhbXBzXHJcbiAgICAgICAgcHJvdGVjdGVkIF90aW1lc3RhbXBzOm51bWJlcltdID0gW107XHJcblxyXG4gICAgcHJpdmF0ZSBfZXJyb3JJbmZvID0gbmV3IEFycmF5PHN0cmluZz4oKTtcclxuICAgIHB1YmxpYyBnZXQgZXJyb3JJbmZvKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9lcnJvckluZm87XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IGVycm9ySW5mbyh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuX2Vycm9ySW5mbyA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgb3JpZ2luYWxOYW1lKCk6c3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zaWduYWwubmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGRlc2NyaXB0aW9uKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rlc2NyaXB0aW9uO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBkZXNjcmlwdGlvbih2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fZGVzY3JpcHRpb24gPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgX3Nlcmllc1Byb3ZpZGVyOiBJU2VyaWVzUHJvdmlkZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEJhc2VTZXJpZXNcclxuICAgICAqIEBwYXJhbSB7SVNpZ25hbH0gc2lnbmFsXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbG9yXHJcbiAgICAgKiBAcGFyYW0ge0N1cnNvclR5cGV9IGN1cnNvclR5cGVcclxuICAgICAqIEBwYXJhbSB7SVNlcmllc1Byb3ZpZGVyfSBzZXJpZVByb3ZpZGVyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW3VuaXF1ZUlkPVwiXCJdXHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3Ioc2lnbmFsOiBJU2lnbmFsLCBuYW1lOiBzdHJpbmcsIGNvbG9yOiBzdHJpbmcsIGN1cnNvclR5cGU6IEN1cnNvclR5cGUsIHNlcmllUHJvdmlkZXI6IElTZXJpZXNQcm92aWRlciwgdW5pcXVlSWQ6IHN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5fc2VyaWVzUHJvdmlkZXIgPSBzZXJpZVByb3ZpZGVyO1xyXG4gICAgICAgIHRoaXMuY3Vyc29yVHlwZSA9IGN1cnNvclR5cGU7XHJcbiAgICAgICAgdGhpcy5fbmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5fY29sb3IgPSBjb2xvcjtcclxuICAgICAgICB0aGlzLnNpZ25hbCA9IHNpZ25hbDtcclxuICAgICAgICB0aGlzLnNpZ25hbC5ldmVudERhdGFDaGFuZ2VkLmF0dGFjaCh0aGlzLl9vblNpZ25hbERhdGFDaGFuZ2VkKTtcclxuICAgICAgICB0aGlzLl9kZXNjcmlwdGlvbiA9IFwiXCI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gU2V0IGdpdmVuIHVuaXF1ZSBpZFxyXG4gICAgICAgIHRoaXMuX2lkID0gdW5pcXVlSWQ7ICBcclxuICAgICAgICB0aGlzLnBlcnNpc3RJRCA9IHNlcmllUHJvdmlkZXIuZ2V0U2VyaWVzUGVyc2lzdGluZ0lkKHRoaXMuX2lkKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGEgc2lnbmFsIHdpdGggdGhlIGdpdmVuIHBlcnNpc3RlZCBzaWduYWxEYXRhXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHBhcmFtIHsqfSBzaWduYWxEYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7SVNpZ25hbH1cclxuICAgICAqIEBtZW1iZXJvZiBCYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBzdGF0aWMgY3JlYXRlU2lnbmFsKHNpZ25hbERhdGE6IGFueSk6IElTaWduYWx7XHJcbiAgICAgICAgbGV0IHNpZ25hbDogSVNpZ25hbCA9IG5ldyBTaWduYWwoXCJcIiwgbmV3IEFycmF5PElQb2ludD4oKSk7XHJcbiAgICAgICAgaWYoc2lnbmFsRGF0YSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBzaWduYWwuc2V0U2V0dGluZ3Moc2lnbmFsRGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzaWduYWw7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SWNvbigpOiBzdHJpbmd7XHJcbiAgICAgICByZXR1cm4gdGhpcy5fc2VyaWVzUHJvdmlkZXIuZ2V0SWNvbih0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTcGVjaWZpY0ljb24oc3ZnTmFtZTogc3RyaW5nKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZXJpZXNQcm92aWRlci5nZXRTcGVjaWZpY0ljb24oc3ZnTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RXJyb3JUZXh0KCk6IHN0cmluZ3tcclxuICAgICAgICBsZXQgZm9ybWF0ZWRUZXh0ID0gXCJcIjtcclxuICAgICAgICBpZih0aGlzLmVycm9ySW5mbyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmVycm9ySW5mby5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICAgIGZvcm1hdGVkVGV4dCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9ySW5mby5mb3JFYWNoKGVycm9yID0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdGVkVGV4dCArPSBlcnJvciArIFwiXFxyXFxuXCI7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZvcm1hdGVkVGV4dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHBlcnNpc3RpbmcgZGF0YSBvZiB0aGUgQmFzZVNlcmllc1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtJU2V0dGluZ3N9XHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBnZXRTZXR0aW5ncygpOiBJU2V0dGluZ3N7XHJcbiAgICAgICAgbGV0IHNldHRpbmdzID0gbmV3IFNldHRpbmdzKFwiQmFzZVNlcmllc1wiKTtcclxuICAgICAgICBsZXQgY2FsY3VsYXRpb25EYXRhSW5mb1NldHRpbmdzOiBJU2V0dGluZ3N8dW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIGxldCBzaWduYWxEYXRhU2V0dGluZ3M6IElTZXR0aW5nc3x1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgbGV0IHRyYW5zZmVyYWJsZXM7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuY2FsY3VsYXRpb25EYXRhSW5mbyA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBzaWduYWxEYXRhU2V0dGluZ3MgPSB0aGlzLnNpZ25hbC5nZXRTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICB0cmFuc2ZlcmFibGVzID0gW3NpZ25hbERhdGFTZXR0aW5ncy5kYXRhLnJhd1BvaW50c1guYnVmZmVyLCBzaWduYWxEYXRhU2V0dGluZ3MuZGF0YS5yYXdQb2ludHNZLmJ1ZmZlcl07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGNhbGN1bGF0aW9uRGF0YUluZm9TZXR0aW5ncyA9IHRoaXMuY2FsY3VsYXRpb25EYXRhSW5mby5nZXRTZXR0aW5ncygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBzZXR0aW5ncy5zZXRWYWx1ZShTZXR0aW5nSWRzLlNlcmllc0lkLCB0aGlzLmlkKTtcclxuICAgICAgICBzZXR0aW5ncy5zZXRWYWx1ZShTZXR0aW5nSWRzLlNlcmllc05hbWUsIHRoaXMubmFtZSk7XHJcbiAgICAgICAgc2V0dGluZ3Muc2V0VmFsdWUoU2V0dGluZ0lkcy5TZXJpZXNDb2xvciwgdGhpcy5jb2xvcik7XHJcbiAgICAgICAgc2V0dGluZ3Muc2V0VmFsdWUoU2V0dGluZ0lkcy5TZXJpZXNTaWduYWxEYXRhLCBzaWduYWxEYXRhU2V0dGluZ3MpO1xyXG4gICAgICAgIHNldHRpbmdzLnNldFZhbHVlKFNldHRpbmdJZHMuU2VyaWVzQ2FsY3VsYXRpb25EYXRhLCBjYWxjdWxhdGlvbkRhdGFJbmZvU2V0dGluZ3MpO1xyXG5cclxuICAgICAgICBzZXR0aW5ncy5zZXRWYWx1ZShcInRyYW5zZmVyYWJsZXNcIiwgdHJhbnNmZXJhYmxlcyk7XHJcbiAgICAgICAgcmV0dXJuIHNldHRpbmdzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzcG9zZXMgdGhlIEJhc2VTZXJpZXNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBkaXNwb3NlKCl7XHJcbiAgICAgICAgdGhpcy5zaWduYWwuZXZlbnREYXRhQ2hhbmdlZC5kZXRhY2godGhpcy5fb25TaWduYWxEYXRhQ2hhbmdlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSB0aW1lc3RhbXBzIGJhc2VvbiB0aGUgYXZhaWxhYmxlIHNlcmllc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgdXBkYXRlVGltZXN0YW1wcygpIHtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBzZXJpZSBpY29uIGRlZmluaXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGljb25EZWZpbml0aW9uKCk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IGljb25EZWZpbml0aW9uID0gYDxkaXYgY2xhc3M9J2UtZG9jJyBzdHlsZT0ncG9zaXRpb246IHJlbGF0aXZlO2hlaWdodDoxNnB4O3dpZHRoOjMwcHg7bWFyZ2luOmF1dG87ZmxvYXQ6bGVmdDttYXJnaW4tbGVmdDo2cHg7bWFyZ2luLXRvcDoycHgnPmA7XHJcbiAgICAgICAgLy8gYWRkIHNlcmllcyBpY29uICh3aXRoIG92ZXJsYXlzKVxyXG4gICAgICAgIGljb25EZWZpbml0aW9uICs9IHRoaXMuZ2V0SWNvbigpO1xyXG4gICAgICAgIGljb25EZWZpbml0aW9uICs9IGA8L2Rpdj5gO1xyXG4gICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICByZXR1cm4gaWNvbkRlZmluaXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBkYXRhIG9mIGFuIGV4aXN0aW5nIHNlcmllXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxJUG9pbnQ+fSByYXdQb2ludHNcclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB1cGRhdGVQb2ludHMocmF3UG9pbnRzOiBBcnJheTxJUG9pbnQ+KXtcclxuICAgICAgICB0aGlzLnJhd1BvaW50cyA9IHJhd1BvaW50cztcclxuICAgICAgICB0aGlzLmdldFJhbmdlKCk7XHJcbiAgICAgICAgdGhpcy5zaW1wbGlmeVNpZ25hbChyYXdQb2ludHMpO1xyXG4gICAgICAgIHRoaXMuc2lnbmFsLnJhd1BvaW50cyA9IHJhd1BvaW50cztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2ltcGxpZnlTaWduYWwocmF3UG9pbnRzOiBBcnJheTxJUG9pbnQ+KXt9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyBpbnB1dCBkYXRhIChEYXRhUG9pbnRzIGxpc3QpIGZvciBjYWxjdWxhdGVkIHNlcmllc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPn0gaW5wdXREYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZUlucHV0RGF0YShpbnB1dERhdGE6IEFycmF5PFRDYWxjdWxhdGlvbkRhdGE+KXtcclxuICAgICAgICBpZih0aGlzLmNhbGN1bGF0aW9uRGF0YUluZm8gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGlucHV0RGF0YS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBpZihpbnB1dERhdGFbaV0gaW5zdGFuY2VvZiBDYWxjdWxhdGlvbkRhdGFQb2ludHMpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRpb25EYXRhSW5mby5pbnB1dERhdGFbaV0gPSBpbnB1dERhdGFbaV0gYXMgQ2FsY3VsYXRpb25EYXRhUG9pbnRzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyBpbnB1dCBkYXRhIHZhbHVlcyAoaW5wdXQgc3RyaW5nOyBlLmcuIHNpZ25hbG5hbWUsIDUsIC4uLikgZm9yIGNhbGN1bGF0ZWQgc2VyaWVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8U2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhPn0gaW5wdXRDaGlsZHNcclxuICAgICAqIEBtZW1iZXJvZiBCYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlSW5wdXREYXRhVmFsdWVzKGlucHV0Q2hpbGRzOiBBcnJheTxTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGE+KXtcclxuICAgICAgICBpZih0aGlzLmNhbGN1bGF0aW9uRGF0YUluZm8gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgbGV0IHZhbHVlcyA9IG5ldyBBcnJheTxzdHJpbmc+KCk7XHJcbiAgICAgICAgICAgIGxldCBpbnB1dERhdGFJZHMgPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgaW5wdXRDaGlsZHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgdmFsdWVzLnB1c2goaW5wdXRDaGlsZHNbaV0uZ2V0UmF3VmFsdWUoKSk7XHJcbiAgICAgICAgICAgICAgICBpbnB1dERhdGFJZHMucHVzaChpbnB1dENoaWxkc1tpXS5jYWxjdWxhdGlvbkRhdGEuaWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRpb25EYXRhSW5mby5pbnB1dERhdGFJZHMgPSBpbnB1dERhdGFJZHM7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRpb25EYXRhSW5mby5pbnB1dERhdGFWYWx1ZXMgPSB2YWx1ZXM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgaW5wdXQgc2VyaWVzIGZvciBjYWxjdWxhdGVkIHNlcmllc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YT59IGlucHV0Q2hpbGRzXHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZUlucHV0U2VyaWVzSWRzKGlucHV0Q2hpbGRzOiBBcnJheTxTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGE+KXtcclxuICAgICAgICBpZih0aGlzLmNhbGN1bGF0aW9uRGF0YUluZm8gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGlvbkRhdGFJbmZvLmlucHV0U2VyaWVzSWRzID0gW107XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5wdXRDaGlsZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBzZXJpZSA9IGlucHV0Q2hpbGRzW2ldLnNlcmllO1xyXG4gICAgICAgICAgICAgICAgaWYoc2VyaWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0aW9uRGF0YUluZm8uaW5wdXRTZXJpZXNJZHMucHVzaChzZXJpZS5pZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBjYWxjdWxhdGlvbiBpbmZvcm1hdGlvbnMgZm9yIHRoaXMgc2VyaWVzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxUQ2FsY3VsYXRpb25EYXRhPn0gaW5wdXREYXRhXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGE+fSBpbnB1dENoaWxkc1xyXG4gICAgICogQG1lbWJlcm9mIEJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHVwZGF0ZUNhbGN1bGF0aW9uRGF0YUluZm8gKGlucHV0RGF0YTogQXJyYXk8VENhbGN1bGF0aW9uRGF0YT4sIHR5cGU6IHN0cmluZywgaW5wdXRDaGlsZHM6IEFycmF5PFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YT4sIHNlcmllc1Byb3ZpZGVyIDogSVNlcmllc1Byb3ZpZGVyKSB7XHJcbiAgICAgICAgaWYodGhpcy5jYWxjdWxhdGlvbkRhdGFJbmZvID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRpb25EYXRhSW5mbyA9IG5ldyBDYWxjdWxhdGlvbkRhdGFJbmZvKHNlcmllc1Byb3ZpZGVyLmdldFVuaXF1ZUNhbGN1bGF0aW9uSWQoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2FsY3VsYXRpb25EYXRhSW5mby50eXBlID0gdHlwZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUlucHV0RGF0YShpbnB1dERhdGEpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlSW5wdXREYXRhVmFsdWVzKGlucHV0Q2hpbGRzKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUlucHV0U2VyaWVzSWRzKGlucHV0Q2hpbGRzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHJhbmdlIGxpbWl0cyBmcm9tIGEgc2VyaWVcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0UmFuZ2UoKXtcclxuICAgICAgICB0aGlzLm1heFggPSB0aGlzLmdldE1heFgoKTtcclxuICAgICAgICB0aGlzLm1pblggPSB0aGlzLmdldE1pblgoKTtcclxuICAgICAgICB0aGlzLm1heFkgPSB0aGlzLmdldE1heFkoKTtcclxuICAgICAgICB0aGlzLm1pblkgPSB0aGlzLmdldE1pblkoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyhudW1iZXIgfCB1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldE1heFgoKTogbnVtYmVyIHwgdW5kZWZpbmVke1xyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcmV0dXJucyB7KG51bWJlciB8IHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0TWluWCgpOiBudW1iZXIgfCB1bmRlZmluZWR7XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgbWF4IFkgdmFsdWUgZnJvbSBhIHNlcmllXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHJldHVybnMgeyhudW1iZXIgfCB1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldE1heFkoKTogbnVtYmVyIHwgdW5kZWZpbmVke1xyXG4gICAgICAgIGxldCBtYXhZO1xyXG4gICAgICAgIGlmICh0aGlzLnJhd1BvaW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnJhd1BvaW50cy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBpZihtYXhZID09IHVuZGVmaW5lZCB8fCB0aGlzLnJhd1BvaW50c1tpXS55ID4gbWF4WSApe1xyXG4gICAgICAgICAgICAgICAgICAgIG1heFkgPSB0aGlzLnJhd1BvaW50c1tpXS55XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1heFk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgbWluIFkgdmFsdWUgZnJvbSBhIHNlcmllXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHJldHVybnMgeyhudW1iZXIgfCB1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldE1pblkoKTogbnVtYmVyIHwgdW5kZWZpbmVke1xyXG4gICAgICAgIGxldCBtaW5ZO1xyXG4gICAgICAgIGlmICh0aGlzLnJhd1BvaW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnJhd1BvaW50cy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBpZihtaW5ZID09IHVuZGVmaW5lZCB8fCB0aGlzLnJhd1BvaW50c1tpXS55IDwgbWluWSApe1xyXG4gICAgICAgICAgICAgICAgICAgIG1pblkgPSB0aGlzLnJhd1BvaW50c1tpXS55XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1pblk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgcmF3UG9pbnRzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCByYXdQb2ludHMocG9pbnRzOiBBcnJheTxJUG9pbnQ+KXtcclxuICAgICAgICB0aGlzLl9yYXdQb2ludHMgPSBwb2ludHM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogR2V0IHJhd1BvaW50c1xyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHtBcnJheTxJUG9pbnQ+fVxyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCByYXdQb2ludHMoKTogIEFycmF5PElQb2ludD57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jhd1BvaW50cztcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogZ2V0cyB0aGUgdGltZXN0YW1wcyBhdmFpbGFibGUgaW4gdGhlIHNlcmllc1xyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge0FycmF5PG51bWJlcj59XHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHRpbWVzdGFtcHMoKSA6IEFycmF5PG51bWJlcj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90aW1lc3RhbXBzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZGV0ZXJtaW5lcyB0aGUgaW5kZXggb2YgdGhlIHRpbWVzdGFtcCB3aXRoaW4gdGhlIGF2YWlsYWJsZSB0aW1lc3RhbXBzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWVzdGFtcFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJbXX0gdGltZXN0YW1wc1xyXG4gICAgICogQHBhcmFtIHtCaW5TZWFyY2hNb2RlfSBMT1dFUlxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIGdldFRpbWVzdGFtcEluZGV4KHRpbWVzdGFtcDogbnVtYmVyLGJpblNlYXJjaE1vZGU6QmluU2VhcmNoTW9kZSA9IEJpblNlYXJjaE1vZGUuTkVBUkVTVCkge1xyXG4gICAgICAgXHJcbiAgICAgICAgLy8gZ2V0IHRoZSBhdmFpbGFibGUgdGltZXN0YW1wc1xyXG4gICAgICAgIGxldCB0aW1lc3RhbXBzID0gdGhpcy50aW1lc3RhbXBzO1xyXG4gICAgICAgIC8vIGdldCB0aGUgaW5kZXggb2YgdGhlIHRpbWVzdGFtcCBcclxuICAgICAgICBsZXQgdGltZXN0YW1wSW5kZXggPSBTZXJpZXNIZWxwZXIuaW5kZXhPZk5lYXJlc3QodGltZXN0YW1wLHRpbWVzdGFtcHMsYmluU2VhcmNoTW9kZSk7XHJcblxyXG4gICAgICAgIHJldHVybiAgdGltZXN0YW1wSW5kZXggPj0gMCAmJiB0aW1lc3RhbXBJbmRleCA8IHRpbWVzdGFtcHMubGVuZ3RoID8gdGltZXN0YW1wSW5kZXggOiAtMTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHNlcmllcyBwb2ludCBuZWFyZXN0IHRvIHRoZSB0aW1lc3RhbXBcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7SVBvaW50fVxyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHBvaW50RnJvbVRpbWVzdGFtcCh0aW1lc3RhbXA6bnVtYmVyKSA6IElQb2ludHtcclxuICAgICAgICBsZXQgbmVhcmVzdFRpbWVzdGFtcEluZGV4ID0gdGhpcy5nZXRUaW1lc3RhbXBJbmRleCh0aW1lc3RhbXApO1xyXG4gICAgICAgIHJldHVybiAgbmVhcmVzdFRpbWVzdGFtcEluZGV4ID49IDAgPyAgdGhpcy5yYXdQb2ludHNbbmVhcmVzdFRpbWVzdGFtcEluZGV4XSA6IG5ldyBQb2ludCgwLDApO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHNlcmllcyBwb2ludCBwcmV2aW91cyB0byB0aGUgdGltZXN0YW1wXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0lQb2ludH1cclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBwcmV2aW91c1BvaW50RnJvbVRpbWVzdGFtcCh0aW1lc3RhbXA6IG51bWJlcik6IElQb2ludCB7XHJcbiAgICAgICAgLy8gZ2V0IHRoZSBsb3dlcmJvdW5kIHRpbWVzdGFtcCBpbmRleCAoIGlmIHRoZSB0aW1lc3RhbXAgaXMgbm90IG1hdGNoaW5nIGV4YWN0bHkpXHJcbiAgICAgICAgbGV0IG5lYXJlc3RUaW1lc3RhbXBJbmRleCA9IHRoaXMuZ2V0VGltZXN0YW1wSW5kZXgodGltZXN0YW1wLEJpblNlYXJjaE1vZGUuTE9XRVJCT1VORCk7XHJcbiAgICAgICAgcmV0dXJuIG5lYXJlc3RUaW1lc3RhbXBJbmRleCA+PSAwID8gdGhpcy5yYXdQb2ludHNbbmVhcmVzdFRpbWVzdGFtcEluZGV4XSA6IG5ldyBQb2ludCgwLCAwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiB0aGUgdGltZXN0YW1wIGlzIHdpdGhpbiB0aGUgYXZhaWxhYmxlIHJhbmdlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWVzdGFtcFxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdGltZXN0YW1wSXNJblJhbmdlKHRpbWVzdGFtcDpudW1iZXIpIDogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gIFNlcmllc0hlbHBlci5pc0luUmFuZ2UodGltZXN0YW1wLHRoaXMudGltZXN0YW1wcyk7XHJcbiAgICB9XHJcbiAgICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgaWYgc2VyaWUgaXMgY2FsY3VsYXRlZFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgaXNDYWxjdWxhdGVkKHZhbHVlOiBib29sZWFuKXtcclxuICAgICAgICB0aGlzLl9pc0NhbGN1bGF0ZWQgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBpZiBzZXJpZSBpcyBjYWxjdWxhdGVkXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGlzQ2FsY3VsYXRlZCgpOiBib29sZWFue1xyXG4gICAgICAgcmV0dXJuIHRoaXMuX2lzQ2FsY3VsYXRlZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCBzZXJpZSBuYW1lXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBuYW1lKHZhbHVlOiBzdHJpbmcpe1xyXG4gICAgICAgIGxldCBvbGROYW1lID0gIHRoaXMuX25hbWU7XHJcbiAgICAgICAgdGhpcy5fbmFtZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMub25EYXRhQ2hhbmdlZChTZXJpZUFjdGlvbi5yZW5hbWUsIHRoaXMuX25hbWUsIG9sZE5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHNlcmllIG5hbWVcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBuYW1lKCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB1bmlxdWUgc2VyaWUgaWRcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGlkKCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgc2VyaWUgY29sb3JcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IGNvbG9yKHZhbHVlOiBzdHJpbmcpe1xyXG4gICAgICAgIGxldCBvbGRDb2xvciA9IHRoaXMuX2NvbG9yO1xyXG4gICAgICAgIHRoaXMuX2NvbG9yID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5vbkRhdGFDaGFuZ2VkKFNlcmllQWN0aW9uLmNvbG9yQ2hhbmdlZCwgdGhpcy5fY29sb3IsIG9sZENvbG9yKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBzZXJpZSBjb2xvclxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGNvbG9yKCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29sb3I7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgaWYgcmF3UG9pbnRzIGFyZSB2YWxpZFxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHJhd1BvaW50c1ZhbGlkKCk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2lnbmFsLnJhd1BvaW50c1ZhbGlkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHN0YXJ0VHJpZ2dlclRpbWVcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBzdGFydFRyaWdnZXJUaW1lKCk6IG51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3RhcnRUcmlnZ2VyVGltZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCBzdGFydFRyaWdnZXJUaW1lXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBzdGFydFRyaWdnZXJUaW1lKHZhbHVlOiBudW1iZXIpe1xyXG4gICAgICAgIGxldCBvbGRTdGFydFRyaWdnZXJUaW1lID0gdGhpcy5fc3RhcnRUcmlnZ2VyVGltZTtcclxuICAgICAgICB0aGlzLl9zdGFydFRyaWdnZXJUaW1lID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5vbkRhdGFDaGFuZ2VkKFNlcmllQWN0aW9uLnN0YXJ0VHJpZ2dlclRpbWVDaGFuZ2VkLCBvbGRTdGFydFRyaWdnZXJUaW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBzdGFydCB0cmlnZ2VyIGZvcm1hdGVkIHRpbWUgKHNob3duIG5leHQgdG8gc2VyaWUgbmFtZSlcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGFkZGl0aW9uYWxJbmZvKCk6IHN0cmluZ3tcclxuICAgICAgICBpZih0aGlzLl9zdGFydFRyaWdnZXJUaW1lICE9IDApe1xyXG4gICAgICAgICAgICByZXR1cm4gRGF0ZVRpbWVIZWxwZXIuZ2V0RGF0ZVRpbWUodGhpcy5fc3RhcnRUcmlnZ2VyVGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcIlwiOyAvLyBObyBzdGFydCB0cmlnZ2VyIGluZm8gYXZhaWxhYmxlXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgcGFyZW50IG9mIHNlcmllXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUgeyhJU2VyaWVHcm91cCB8IHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHBhcmVudCgpOiBJU2VyaWVHcm91cCB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcmVudDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCBwYXJlbnQgb2Ygc2VyaWVcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IHBhcmVudCh2YWx1ZTogSVNlcmllR3JvdXAgfCB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLl9wYXJlbnQgPSB2YWx1ZTtcclxuICAgICAgICBpZih0aGlzLl9wYXJlbnQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICBpZih0aGlzLl9wYXJlbnQucGFyZW50IGluc3RhbmNlb2YgU2lnbmFsQ2F0ZWdvcnkpe1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5fcGFyZW50LnBhcmVudC5pZCA9PSBTaWduYWxDYXRlZ29yeS5DYXRlZ29yeUlkUmVjZW50KXtcclxuICAgICAgICAgICAgICAgICAgICAvLyBTZXQgc2VyaWUgdG8gYXV0b1VwZGF0ZWQgaWYgaW4gcmVjZW50IGNhdGVnb3J5XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0F1dG9VcGRhdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0VHJpZ2dlclRpbWUgPSB0aGlzLl9wYXJlbnQuc3RhcnRUcmlnZ2VyVGltZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5zdGFydFRyaWdnZXJUaW1lID0gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNldHMgdGhlIG5hbWUgdG8gdGhlIG9yaWdpbmFsIG5hbWUgZnJvbSB0aGUgc2lnbmFsXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlc2V0TmFtZSgpe1xyXG4gICAgICAgIHRoaXMubmFtZSA9IHRoaXMub3JpZ2luYWxOYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2xvbmVzIHRoaXMgc2VyaWVcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNsb25lKCk6IEJhc2VTZXJpZXN7XHJcbiAgICAgICAgbGV0IHNldHRpbmdzID0gdGhpcy5nZXRTZXR0aW5ncygpO1xyXG4gICAgICAgIChzZXR0aW5ncyBhcyBTZXR0aW5ncykuc2V0VmFsdWUoU2V0dGluZ0lkcy5TZXJpZXNJZCwgdGhpcy5fc2VyaWVzUHJvdmlkZXIuZ2V0VW5pcXVlSWQoKSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Nlcmllc1Byb3ZpZGVyLmNyZWF0ZVNlcmllKHNldHRpbmdzKSE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGVzIHRoZSBzZXJpZSBkYXRhIGNoYW5nZWQgZXZlbnQgKGUuZy4gc2VyaWUgY29sb3IsIHNlcmllIGRhdGFwb2ludHMsIHJlbmFtZSBjaGFuZ2VkKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHsqfSBldmVudEFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25TaWduYWxEYXRhQ2hhbmdlZChzZW5kZXI6IElTaWduYWwsIGV2ZW50QXJnczogRXZlbnRTaWduYWxEYXRhQ2hhbmdlZEFyZ3Mpe1xyXG4gICAgICAgIHN3aXRjaCAoZXZlbnRBcmdzLmFjdGlvbikge1xyXG4gICAgICAgICAgICBjYXNlIFNpZ25hbEFjdGlvbi5kYXRhUG9pbnRzQ2hhbmdlZDoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVUaW1lc3RhbXBzKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uRGF0YUNoYW5nZWQoU2VyaWVBY3Rpb24uZGF0YVBvaW50c0NoYW5nZWQsIGV2ZW50QXJncy5kYXRhKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgU2lnbmFsQWN0aW9uLnN0YXJ0VHJpZ2dlclRpbWVDaGFuZ2VkOntcclxuICAgICAgICAgICAgICAgIHRoaXMub25EYXRhQ2hhbmdlZChTZXJpZUFjdGlvbi5zdGFydFRyaWdnZXJUaW1lQ2hhbmdlZCwgZXZlbnRBcmdzLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkRhdGFDaGFuZ2VkKGFjdGlvbjogU2VyaWVBY3Rpb24sIGRhdGE6IGFueSwgb2xkRGF0YTogYW55ID0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgbGV0IGV2ZW50QXJncyA9IG5ldyBFdmVudFNlcmllRGF0YUNoYW5nZWRBcmdzKGFjdGlvbiwgZGF0YSwgb2xkRGF0YSk7XHJcbiAgICAgICAgdGhpcy5ldmVudERhdGFDaGFuZ2VkLnJhaXNlKHRoaXMsIGV2ZW50QXJncyk7XHJcbiAgICAgICAgaWYoYWN0aW9uID09IFNlcmllQWN0aW9uLmRhdGFQb2ludHNDaGFuZ2VkKXtcclxuICAgICAgICAgICAgdGhpcy5vblNlcmllRGF0YUNoYW5nZWQoZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIHdoZW5ldmVyIHRoZSBzZXJpcyBkYXRhIGhhcyBjaGFuZ2VkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SVBvaW50W119IGRhdGFcclxuICAgICAqIEBtZW1iZXJvZiBCYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBvblNlcmllRGF0YUNoYW5nZWQoIGRhdGE6IElQb2ludFtdKSB7XHJcbiAgICAgICAgLy9UT0RPOiBldmVudHVhbGx5IGNhbGwgc2ltcGxpZmljYXRpb24gPz8/P1xyXG4gICAgfVxyXG59Il19