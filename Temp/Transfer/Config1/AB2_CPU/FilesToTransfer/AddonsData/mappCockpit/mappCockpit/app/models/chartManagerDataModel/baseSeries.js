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
define(["require", "exports", "../../framework/events", "./eventSerieDataChangedArgs", "../common/signal/eventSignalDataChangedArgs", "../../widgets/common/seriesIconProvider", "../signalManagerDataModel/signalCategory", "../common/calculatorProvider/calculationDataPoints", "../../common/dateTimeHelper", "../../common/seriesHelper", "../common/point", "../common/calculatorProvider/calculationDataInfo", "./seriesType", "../../common/persistence/settings", "../common/signal/signal", "./baseSeriesSettingIds"], function (require, exports, events_1, eventSerieDataChangedArgs_1, eventSignalDataChangedArgs_1, seriesIconProvider_1, signalCategory_1, calculationDataPoints_1, dateTimeHelper_1, seriesHelper_1, point_1, calculationDataInfo_1, seriesType_1, settings_1, signal_1, baseSeriesSettingIds_1) {
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
            if (uniqueId === void 0) { uniqueId = ""; }
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
            if (uniqueId != "") {
                // Set given unique id
                this._id = uniqueId;
            }
            else {
                // Use unique id from seriesProvider
                this._id = this._seriesProvider.getUniqueId();
            }
            this.addToSeriesProvider();
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
        BaseSeries.prototype.addToSeriesProvider = function () {
            this._seriesProvider.add(this);
        };
        BaseSeries.prototype.removeFromSeriesProvider = function () {
            this._seriesProvider.remove(this.id);
        };
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
            if (this.calculationDataInfo == undefined) {
                signalDataSettings = this.signal.getSettings();
            }
            else {
                calculationDataInfoSettings = this.calculationDataInfo.getSettings();
            }
            settings.setValue(baseSeriesSettingIds_1.SettingIds.Id, this.id);
            settings.setValue(baseSeriesSettingIds_1.SettingIds.Name, this.name);
            settings.setValue(baseSeriesSettingIds_1.SettingIds.Color, this.color);
            settings.setValue(baseSeriesSettingIds_1.SettingIds.SignalData, signalDataSettings);
            settings.setValue(baseSeriesSettingIds_1.SettingIds.CalculationData, calculationDataInfoSettings);
            return settings;
        };
        /**
         * Disposes the BaseSeries
         *
         * @memberof BaseSeries
         */
        BaseSeries.prototype.dispose = function () {
            this.signal.eventDataChanged.detach(this._onSignalDataChanged);
            this.removeFromSeriesProvider();
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
                iconDefinition += seriesIconProvider_1.SeriesIconProvider.getInstance().getIcon(this);
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
                for (var i = 0; i < inputChilds.length; i++) {
                    values.push(inputChilds[i].getRawValue());
                }
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
        BaseSeries.prototype.updateCalculationDataInfo = function (inputData, type, inputChilds) {
            if (this.calculationDataInfo == undefined) {
                this.calculationDataInfo = new calculationDataInfo_1.CalculationDataInfo(this._seriesProvider.getUniqueCalculationId());
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
            var clone = new BaseSeries(this.signal, this.name, this.color, this.cursorType, this._seriesProvider);
            return clone;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZVNlcmllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9iYXNlU2VyaWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUF1QkE7UUFBcUMsMENBQWtEO1FBQXZGOztRQUF5RixDQUFDO1FBQUQsNkJBQUM7SUFBRCxDQUFDLEFBQTFGLENBQXFDLG1CQUFVLEdBQTJDO0lBQUEsQ0FBQztJQUUzRjtRQTZESTs7Ozs7Ozs7O1dBU0c7UUFDSCxvQkFBWSxNQUFlLEVBQUUsSUFBWSxFQUFFLEtBQWEsRUFBRSxVQUFzQixFQUFFLGFBQThCLEVBQUUsUUFBcUI7WUFBdkksaUJBaUJDO1lBakJpSCx5QkFBQSxFQUFBLGFBQXFCO1lBckV2SSxTQUFJLEdBQUcsdUJBQVUsQ0FBQyxVQUFVLENBQUM7WUFFN0IscUJBQWdCLEdBQTJCLElBQUksc0JBQXNCLEVBQUUsQ0FBQztZQUdoRSx5QkFBb0IsR0FBRyxVQUFDLE1BQU0sRUFBRSxTQUFTLElBQU8sS0FBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQSxDQUFBLENBQUMsQ0FBQTtZQUcxRixlQUFVLEdBQWtCLEVBQUUsQ0FBQztZQU1qQyxrQkFBYSxHQUFZLEtBQUssQ0FBQztZQUUvQixzQkFBaUIsR0FBVyxDQUFDLENBQUM7WUFFdEMsd0JBQW1CLEdBQWtDLFNBQVMsQ0FBQztZQUUvRCxrQkFBYSxHQUFZLEtBQUssQ0FBQztZQUNyQixVQUFLLEdBQWtCLEVBQUUsQ0FBQztZQWNoQyx1QkFBdUI7WUFDYixnQkFBVyxHQUFZLEVBQUUsQ0FBQztZQUVoQyxlQUFVLEdBQUcsSUFBSSxLQUFLLEVBQVUsQ0FBQztZQWdDckMsSUFBSSxDQUFDLGVBQWUsR0FBRyxhQUFhLENBQUM7WUFDckMsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7WUFDN0IsSUFB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QkFBaUIsRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ2xFLE1BQU07aUJBQ1Q7Z0JBQ0QsS0FBSyx5Q0FBWSxDQUFDLHVCQUF1QixDQUFDLENBQUE7b0JBQ3RDLElBQUksQ0FBQyxhQUFhLENBQUMsdUNBQVcsQ0FBQyx1QkFBdUIsRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3hFLE1BQU07aUJBQ1Q7YUFDSjtRQUNMLENBQUM7UUFFTyxrQ0FBYSxHQUFyQixVQUFzQixNQUFtQixFQUFFLElBQVMsRUFBRSxPQUF3QjtZQUF4Qix3QkFBQSxFQUFBLG1CQUF3QjtZQUMxRSxJQUFJLFNBQVMsR0FBRyxJQUFJLHFEQUF5QixDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDckUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDN0MsSUFBRyxNQUFNLElBQUksdUNBQVcsQ0FBQyxpQkFBaUIsRUFBQztnQkFDdkMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2pDO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNPLHVDQUFrQixHQUE1QixVQUE4QixJQUFjO1lBQ3hDLDJDQUEyQztRQUMvQyxDQUFDO1FBQ0wsaUJBQUM7SUFBRCxDQUFDLEFBam5CRCxJQWluQkM7SUFqbkJZLGdDQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVNpZ25hbCB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy9zaWduYWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvZXZlbnRzXCI7XHJcbmltcG9ydCB7IFNlcmllQWN0aW9uLCBFdmVudFNlcmllRGF0YUNoYW5nZWRBcmdzIH0gZnJvbSBcIi4vZXZlbnRTZXJpZURhdGFDaGFuZ2VkQXJnc1wiO1xyXG5pbXBvcnQgeyBTaWduYWxBY3Rpb24sIEV2ZW50U2lnbmFsRGF0YUNoYW5nZWRBcmdzIH0gZnJvbSBcIi4uL2NvbW1vbi9zaWduYWwvZXZlbnRTaWduYWxEYXRhQ2hhbmdlZEFyZ3NcIjtcclxuaW1wb3J0IHsgU2VyaWVzSWNvblByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uL3dpZGdldHMvY29tbW9uL3Nlcmllc0ljb25Qcm92aWRlclwiO1xyXG5pbXBvcnQgeyBJU2VyaWVHcm91cCB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy9zZXJpZUdyb3VwSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNpZ25hbENhdGVnb3J5IH0gZnJvbSBcIi4uL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvc2lnbmFsQ2F0ZWdvcnlcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhUG9pbnRzIH0gZnJvbSBcIi4uL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRpb25EYXRhUG9pbnRzXCI7XHJcbmltcG9ydCB7IERhdGVUaW1lSGVscGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9kYXRlVGltZUhlbHBlclwiO1xyXG5pbXBvcnQgeyBTZXJpZXNIZWxwZXIsIEJpblNlYXJjaE1vZGUgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3Nlcmllc0hlbHBlclwiO1xyXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuLi9jb21tb24vcG9pbnRcIjtcclxuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL3BvaW50SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YUluZm8gfSBmcm9tIFwiLi4vY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdGlvbkRhdGFJbmZvXCI7XHJcbmltcG9ydCB7IFNlcmllc1R5cGUgfSBmcm9tIFwiLi9zZXJpZXNUeXBlXCI7XHJcbmltcG9ydCB7IEN1cnNvclR5cGUgfSBmcm9tIFwiLi4vLi4vd2lkZ2V0cy9jb21tb24vc3RhdGVzL2N1cnNvclN0YXRlc1wiO1xyXG5pbXBvcnQgeyBJU2VyaWVzUHJvdmlkZXIgfSBmcm9tIFwiLi4vY29tbW9uL3Nlcmllc1Byb3ZpZGVyL3Nlcmllc1Byb3ZpZGVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFRDYWxjdWxhdGlvbkRhdGEgfSBmcm9tIFwiLi4vY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdGlvbkRhdGFcIjtcclxuaW1wb3J0IHsgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhIH0gZnJvbSBcIi4uL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvc2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhXCI7XHJcbmltcG9ydCB7IElTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vcGVyc2lzdGVuY2UvaW50ZXJmYWNlcy9zZXR0aW5nc0ludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vcGVyc2lzdGVuY2Uvc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgU2lnbmFsIH0gZnJvbSBcIi4uL2NvbW1vbi9zaWduYWwvc2lnbmFsXCI7XHJcbmltcG9ydCB7IFNldHRpbmdJZHMgfSBmcm9tIFwiLi9iYXNlU2VyaWVzU2V0dGluZ0lkc1wiO1xyXG5cclxuY2xhc3MgRXZlbnRTZXJpZXNEYXRhQ2hhbmdlZCBleHRlbmRzIFR5cGVkRXZlbnQgPEJhc2VTZXJpZXMsIEV2ZW50U2VyaWVEYXRhQ2hhbmdlZEFyZ3M+eyB9O1xyXG5cclxuZXhwb3J0IGNsYXNzIEJhc2VTZXJpZXN7XHJcblxyXG4gICAgdHlwZSA9IFNlcmllc1R5cGUudGltZVNlcmllcztcclxuICAgIGN1cnNvclR5cGU6IEN1cnNvclR5cGU7XHJcbiAgICBldmVudERhdGFDaGFuZ2VkOiBFdmVudFNlcmllc0RhdGFDaGFuZ2VkID0gbmV3IEV2ZW50U2VyaWVzRGF0YUNoYW5nZWQoKTtcclxuICAgIFxyXG5cclxuICAgIHByaXZhdGUgX29uU2lnbmFsRGF0YUNoYW5nZWQgPSAoc2VuZGVyLCBldmVudEFyZ3MpID0+IHsgdGhpcy5vblNpZ25hbERhdGFDaGFuZ2VkKHNlbmRlciwgZXZlbnRBcmdzKX1cclxuICAgIFxyXG4gICAgcHJvdGVjdGVkIHNpZ25hbDogSVNpZ25hbDtcclxuICAgIHByb3RlY3RlZCBfcmF3UG9pbnRzOiBBcnJheTxJUG9pbnQ+ID0gW107XHJcbiAgICBwcm90ZWN0ZWQgX25hbWU6IHN0cmluZztcclxuICAgIHByb3RlY3RlZCBfY29sb3I6IHN0cmluZztcclxuICAgIHByb3RlY3RlZCBfZGVzY3JpcHRpb246IHN0cmluZztcclxuICAgIHByb3RlY3RlZCBfaWQ6IHN0cmluZztcclxuXHJcbiAgICBwcml2YXRlIF9pc0NhbGN1bGF0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgX3BhcmVudDogSVNlcmllR3JvdXAgfCB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF9zdGFydFRyaWdnZXJUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgXHJcbiAgICBjYWxjdWxhdGlvbkRhdGFJbmZvOiBDYWxjdWxhdGlvbkRhdGFJbmZvfHVuZGVmaW5lZCA9IHVuZGVmaW5lZDsgXHJcbiAgICBcclxuICAgIGlzQXV0b1VwZGF0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByb3RlY3RlZCBfZGF0YTogQXJyYXk8SVBvaW50PiA9IFtdO1xyXG4gICAgbWF4WCA6IG51bWJlcnx1bmRlZmluZWQ7XHJcbiAgICBtaW5YIDogbnVtYmVyfHVuZGVmaW5lZDtcclxuICAgIG1heFkgOiBudW1iZXJ8dW5kZWZpbmVkO1xyXG4gICAgbWluWSA6IG51bWJlcnx1bmRlZmluZWQ7XHJcblxyXG5cclxuICAgIHB1YmxpYyBnZXQgZGF0YSgpOkFycmF5PElQb2ludD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBkYXRhKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgICAgICAvLyBob2xkcyB0aGUgdGltZXN0YW1wc1xyXG4gICAgICAgIHByb3RlY3RlZCBfdGltZXN0YW1wczpudW1iZXJbXSA9IFtdO1xyXG5cclxuICAgIHByaXZhdGUgX2Vycm9ySW5mbyA9IG5ldyBBcnJheTxzdHJpbmc+KCk7XHJcbiAgICBwdWJsaWMgZ2V0IGVycm9ySW5mbygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZXJyb3JJbmZvO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBlcnJvckluZm8odmFsdWUpIHtcclxuICAgICAgICB0aGlzLl9lcnJvckluZm8gPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IG9yaWdpbmFsTmFtZSgpOnN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2lnbmFsLm5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBkZXNjcmlwdGlvbigpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kZXNjcmlwdGlvbjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgZGVzY3JpcHRpb24odmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2Rlc2NyaXB0aW9uID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIF9zZXJpZXNQcm92aWRlcjogSVNlcmllc1Byb3ZpZGVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBCYXNlU2VyaWVzXHJcbiAgICAgKiBAcGFyYW0ge0lTaWduYWx9IHNpZ25hbFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb2xvclxyXG4gICAgICogQHBhcmFtIHtDdXJzb3JUeXBlfSBjdXJzb3JUeXBlXHJcbiAgICAgKiBAcGFyYW0ge0lTZXJpZXNQcm92aWRlcn0gc2VyaWVQcm92aWRlclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFt1bmlxdWVJZD1cIlwiXVxyXG4gICAgICogQG1lbWJlcm9mIEJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Ioc2lnbmFsOiBJU2lnbmFsLCBuYW1lOiBzdHJpbmcsIGNvbG9yOiBzdHJpbmcsIGN1cnNvclR5cGU6IEN1cnNvclR5cGUsIHNlcmllUHJvdmlkZXI6IElTZXJpZXNQcm92aWRlciwgdW5pcXVlSWQ6IHN0cmluZyA9IFwiXCIpe1xyXG4gICAgICAgIHRoaXMuX3Nlcmllc1Byb3ZpZGVyID0gc2VyaWVQcm92aWRlcjtcclxuICAgICAgICB0aGlzLmN1cnNvclR5cGUgPSBjdXJzb3JUeXBlO1xyXG4gICAgICAgIHRoaXMuX25hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuX2NvbG9yID0gY29sb3I7XHJcbiAgICAgICAgdGhpcy5zaWduYWwgPSBzaWduYWw7XHJcbiAgICAgICAgdGhpcy5zaWduYWwuZXZlbnREYXRhQ2hhbmdlZC5hdHRhY2godGhpcy5fb25TaWduYWxEYXRhQ2hhbmdlZCk7XHJcbiAgICAgICAgdGhpcy5fZGVzY3JpcHRpb24gPSBcIlwiO1xyXG4gICAgICAgIGlmKHVuaXF1ZUlkICE9IFwiXCIpe1xyXG4gICAgICAgICAgICAvLyBTZXQgZ2l2ZW4gdW5pcXVlIGlkXHJcbiAgICAgICAgICAgIHRoaXMuX2lkID0gdW5pcXVlSWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIC8vIFVzZSB1bmlxdWUgaWQgZnJvbSBzZXJpZXNQcm92aWRlclxyXG4gICAgICAgICAgICB0aGlzLl9pZCA9IHRoaXMuX3Nlcmllc1Byb3ZpZGVyLmdldFVuaXF1ZUlkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYWRkVG9TZXJpZXNQcm92aWRlcigpXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhZGRUb1Nlcmllc1Byb3ZpZGVyKCl7ICAgIFxyXG4gICAgICAgIHRoaXMuX3Nlcmllc1Byb3ZpZGVyLmFkZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlbW92ZUZyb21TZXJpZXNQcm92aWRlcigpeyAgICAgICBcclxuICAgICAgICB0aGlzLl9zZXJpZXNQcm92aWRlci5yZW1vdmUodGhpcy5pZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgYSBzaWduYWwgd2l0aCB0aGUgZ2l2ZW4gcGVyc2lzdGVkIHNpZ25hbERhdGFcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcGFyYW0geyp9IHNpZ25hbERhdGFcclxuICAgICAqIEByZXR1cm5zIHtJU2lnbmFsfVxyXG4gICAgICogQG1lbWJlcm9mIEJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHN0YXRpYyBjcmVhdGVTaWduYWwoc2lnbmFsRGF0YTogYW55KTogSVNpZ25hbHtcclxuICAgICAgICBsZXQgc2lnbmFsOiBJU2lnbmFsID0gbmV3IFNpZ25hbChcIlwiLCBuZXcgQXJyYXk8SVBvaW50PigpKTtcclxuICAgICAgICBpZihzaWduYWxEYXRhICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHNpZ25hbC5zZXRTZXR0aW5ncyhzaWduYWxEYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNpZ25hbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHBlcnNpc3RpbmcgZGF0YSBvZiB0aGUgQmFzZVNlcmllc1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtJU2V0dGluZ3N9XHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBnZXRTZXR0aW5ncygpOiBJU2V0dGluZ3N7XHJcbiAgICAgICAgbGV0IHNldHRpbmdzID0gbmV3IFNldHRpbmdzKFwiQmFzZVNlcmllc1wiKTtcclxuICAgICAgICBsZXQgY2FsY3VsYXRpb25EYXRhSW5mb1NldHRpbmdzOiBJU2V0dGluZ3N8dW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIGxldCBzaWduYWxEYXRhU2V0dGluZ3M6IElTZXR0aW5nc3x1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgaWYodGhpcy5jYWxjdWxhdGlvbkRhdGFJbmZvID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHNpZ25hbERhdGFTZXR0aW5ncyA9IHRoaXMuc2lnbmFsLmdldFNldHRpbmdzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGNhbGN1bGF0aW9uRGF0YUluZm9TZXR0aW5ncyA9IHRoaXMuY2FsY3VsYXRpb25EYXRhSW5mby5nZXRTZXR0aW5ncygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBzZXR0aW5ncy5zZXRWYWx1ZShTZXR0aW5nSWRzLklkLCB0aGlzLmlkKTtcclxuICAgICAgICBzZXR0aW5ncy5zZXRWYWx1ZShTZXR0aW5nSWRzLk5hbWUsIHRoaXMubmFtZSk7XHJcbiAgICAgICAgc2V0dGluZ3Muc2V0VmFsdWUoU2V0dGluZ0lkcy5Db2xvciwgdGhpcy5jb2xvcik7XHJcbiAgICAgICAgc2V0dGluZ3Muc2V0VmFsdWUoU2V0dGluZ0lkcy5TaWduYWxEYXRhLCBzaWduYWxEYXRhU2V0dGluZ3MpO1xyXG4gICAgICAgIHNldHRpbmdzLnNldFZhbHVlKFNldHRpbmdJZHMuQ2FsY3VsYXRpb25EYXRhLCBjYWxjdWxhdGlvbkRhdGFJbmZvU2V0dGluZ3MpO1xyXG4gICAgICAgIHJldHVybiBzZXR0aW5ncztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc3Bvc2VzIHRoZSBCYXNlU2VyaWVzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgZGlzcG9zZSgpe1xyXG4gICAgICAgIHRoaXMuc2lnbmFsLmV2ZW50RGF0YUNoYW5nZWQuZGV0YWNoKHRoaXMuX29uU2lnbmFsRGF0YUNoYW5nZWQpO1xyXG4gICAgICAgIHRoaXMucmVtb3ZlRnJvbVNlcmllc1Byb3ZpZGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSB0aW1lc3RhbXBzIGJhc2VvbiB0aGUgYXZhaWxhYmxlIHNlcmllc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgdXBkYXRlVGltZXN0YW1wcygpIHtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBzZXJpZSBpY29uIGRlZmluaXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGljb25EZWZpbml0aW9uKCk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IGljb25EZWZpbml0aW9uID0gYDxkaXYgY2xhc3M9J2UtZG9jJyBzdHlsZT0ncG9zaXRpb246IHJlbGF0aXZlO2hlaWdodDoxNnB4O3dpZHRoOjMwcHg7bWFyZ2luOmF1dG87ZmxvYXQ6bGVmdDttYXJnaW4tbGVmdDo2cHg7bWFyZ2luLXRvcDoycHgnPmA7XHJcbiAgICAgICAgLy8gYWRkIHNlcmllcyBpY29uICh3aXRoIG92ZXJsYXlzKVxyXG4gICAgICAgIGljb25EZWZpbml0aW9uICs9IFNlcmllc0ljb25Qcm92aWRlci5nZXRJbnN0YW5jZSgpLmdldEljb24odGhpcyk7XHJcbiAgICAgICAgaWNvbkRlZmluaXRpb24gKz0gYDwvZGl2PmA7XHJcbiAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIHJldHVybiBpY29uRGVmaW5pdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGRhdGEgb2YgYW4gZXhpc3Rpbmcgc2VyaWVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElQb2ludD59IHJhd1BvaW50c1xyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHVwZGF0ZVBvaW50cyhyYXdQb2ludHM6IEFycmF5PElQb2ludD4pe1xyXG4gICAgICAgIHRoaXMucmF3UG9pbnRzID0gcmF3UG9pbnRzO1xyXG4gICAgICAgIHRoaXMuZ2V0UmFuZ2UoKTtcclxuICAgICAgICB0aGlzLnNpbXBsaWZ5U2lnbmFsKHJhd1BvaW50cyk7XHJcbiAgICAgICAgdGhpcy5zaWduYWwucmF3UG9pbnRzID0gcmF3UG9pbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaW1wbGlmeVNpZ25hbChyYXdQb2ludHM6IEFycmF5PElQb2ludD4pe307XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIGlucHV0IGRhdGEgKERhdGFQb2ludHMgbGlzdCkgZm9yIGNhbGN1bGF0ZWQgc2VyaWVzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+fSBpbnB1dERhdGFcclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlSW5wdXREYXRhKGlucHV0RGF0YTogQXJyYXk8VENhbGN1bGF0aW9uRGF0YT4pe1xyXG4gICAgICAgIGlmKHRoaXMuY2FsY3VsYXRpb25EYXRhSW5mbyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgaW5wdXREYXRhLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGlmKGlucHV0RGF0YVtpXSBpbnN0YW5jZW9mIENhbGN1bGF0aW9uRGF0YVBvaW50cyl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGlvbkRhdGFJbmZvLmlucHV0RGF0YVtpXSA9IGlucHV0RGF0YVtpXSBhcyBDYWxjdWxhdGlvbkRhdGFQb2ludHM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIGlucHV0IGRhdGEgdmFsdWVzIChpbnB1dCBzdHJpbmc7IGUuZy4gc2lnbmFsbmFtZSwgNSwgLi4uKSBmb3IgY2FsY3VsYXRlZCBzZXJpZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGE+fSBpbnB1dENoaWxkc1xyXG4gICAgICogQG1lbWJlcm9mIEJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVJbnB1dERhdGFWYWx1ZXMoaW5wdXRDaGlsZHM6IEFycmF5PFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YT4pe1xyXG4gICAgICAgIGlmKHRoaXMuY2FsY3VsYXRpb25EYXRhSW5mbyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBsZXQgdmFsdWVzID0gbmV3IEFycmF5PHN0cmluZz4oKTtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGlucHV0Q2hpbGRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKGlucHV0Q2hpbGRzW2ldLmdldFJhd1ZhbHVlKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRpb25EYXRhSW5mby5pbnB1dERhdGFWYWx1ZXMgPSB2YWx1ZXM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgaW5wdXQgc2VyaWVzIGZvciBjYWxjdWxhdGVkIHNlcmllc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YT59IGlucHV0Q2hpbGRzXHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZUlucHV0U2VyaWVzSWRzKGlucHV0Q2hpbGRzOiBBcnJheTxTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGE+KXtcclxuICAgICAgICBpZih0aGlzLmNhbGN1bGF0aW9uRGF0YUluZm8gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGlvbkRhdGFJbmZvLmlucHV0U2VyaWVzSWRzID0gW107XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5wdXRDaGlsZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBzZXJpZSA9IGlucHV0Q2hpbGRzW2ldLnNlcmllO1xyXG4gICAgICAgICAgICAgICAgaWYoc2VyaWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0aW9uRGF0YUluZm8uaW5wdXRTZXJpZXNJZHMucHVzaChzZXJpZS5pZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBjYWxjdWxhdGlvbiBpbmZvcm1hdGlvbnMgZm9yIHRoaXMgc2VyaWVzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxUQ2FsY3VsYXRpb25EYXRhPn0gaW5wdXREYXRhXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGE+fSBpbnB1dENoaWxkc1xyXG4gICAgICogQG1lbWJlcm9mIEJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHVwZGF0ZUNhbGN1bGF0aW9uRGF0YUluZm8gKGlucHV0RGF0YTogQXJyYXk8VENhbGN1bGF0aW9uRGF0YT4sIHR5cGU6IHN0cmluZywgaW5wdXRDaGlsZHM6IEFycmF5PFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YT4pIHtcclxuICAgICAgICBpZih0aGlzLmNhbGN1bGF0aW9uRGF0YUluZm8gPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGlvbkRhdGFJbmZvID0gbmV3IENhbGN1bGF0aW9uRGF0YUluZm8odGhpcy5fc2VyaWVzUHJvdmlkZXIuZ2V0VW5pcXVlQ2FsY3VsYXRpb25JZCgpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdGlvbkRhdGFJbmZvLnR5cGUgPSB0eXBlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlSW5wdXREYXRhKGlucHV0RGF0YSk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVJbnB1dERhdGFWYWx1ZXMoaW5wdXRDaGlsZHMpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlSW5wdXRTZXJpZXNJZHMoaW5wdXRDaGlsZHMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgcmFuZ2UgbGltaXRzIGZyb20gYSBzZXJpZVxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXRSYW5nZSgpe1xyXG4gICAgICAgIHRoaXMubWF4WCA9IHRoaXMuZ2V0TWF4WCgpO1xyXG4gICAgICAgIHRoaXMubWluWCA9IHRoaXMuZ2V0TWluWCgpO1xyXG4gICAgICAgIHRoaXMubWF4WSA9IHRoaXMuZ2V0TWF4WSgpO1xyXG4gICAgICAgIHRoaXMubWluWSA9IHRoaXMuZ2V0TWluWSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7KG51bWJlciB8IHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0TWF4WCgpOiBudW1iZXIgfCB1bmRlZmluZWR7XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEByZXR1cm5zIHsobnVtYmVyIHwgdW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXRNaW5YKCk6IG51bWJlciB8IHVuZGVmaW5lZHtcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBtYXggWSB2YWx1ZSBmcm9tIGEgc2VyaWVcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcmV0dXJucyB7KG51bWJlciB8IHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0TWF4WSgpOiBudW1iZXIgfCB1bmRlZmluZWR7XHJcbiAgICAgICAgbGV0IG1heFk7XHJcbiAgICAgICAgaWYgKHRoaXMucmF3UG9pbnRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMucmF3UG9pbnRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGlmKG1heFkgPT0gdW5kZWZpbmVkIHx8IHRoaXMucmF3UG9pbnRzW2ldLnkgPiBtYXhZICl7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF4WSA9IHRoaXMucmF3UG9pbnRzW2ldLnlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWF4WTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBtaW4gWSB2YWx1ZSBmcm9tIGEgc2VyaWVcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcmV0dXJucyB7KG51bWJlciB8IHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0TWluWSgpOiBudW1iZXIgfCB1bmRlZmluZWR7XHJcbiAgICAgICAgbGV0IG1pblk7XHJcbiAgICAgICAgaWYgKHRoaXMucmF3UG9pbnRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMucmF3UG9pbnRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGlmKG1pblkgPT0gdW5kZWZpbmVkIHx8IHRoaXMucmF3UG9pbnRzW2ldLnkgPCBtaW5ZICl7XHJcbiAgICAgICAgICAgICAgICAgICAgbWluWSA9IHRoaXMucmF3UG9pbnRzW2ldLnlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWluWTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCByYXdQb2ludHNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IHJhd1BvaW50cyhwb2ludHM6IEFycmF5PElQb2ludD4pe1xyXG4gICAgICAgIHRoaXMuX3Jhd1BvaW50cyA9IHBvaW50cztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgcmF3UG9pbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge0FycmF5PElQb2ludD59XHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHJhd1BvaW50cygpOiAgQXJyYXk8SVBvaW50PntcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmF3UG9pbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXRzIHRoZSB0aW1lc3RhbXBzIGF2YWlsYWJsZSBpbiB0aGUgc2VyaWVzXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7QXJyYXk8bnVtYmVyPn1cclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgdGltZXN0YW1wcygpIDogQXJyYXk8bnVtYmVyPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RpbWVzdGFtcHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBkZXRlcm1pbmVzIHRoZSBpbmRleCBvZiB0aGUgdGltZXN0YW1wIHdpdGhpbiB0aGUgYXZhaWxhYmxlIHRpbWVzdGFtcHNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdGltZXN0YW1wXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcltdfSB0aW1lc3RhbXBzXHJcbiAgICAgKiBAcGFyYW0ge0JpblNlYXJjaE1vZGV9IExPV0VSXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgZ2V0VGltZXN0YW1wSW5kZXgodGltZXN0YW1wOiBudW1iZXIsYmluU2VhcmNoTW9kZTpCaW5TZWFyY2hNb2RlID0gQmluU2VhcmNoTW9kZS5ORUFSRVNUKSB7XHJcbiAgICAgICBcclxuICAgICAgICAvLyBnZXQgdGhlIGF2YWlsYWJsZSB0aW1lc3RhbXBzXHJcbiAgICAgICAgbGV0IHRpbWVzdGFtcHMgPSB0aGlzLnRpbWVzdGFtcHM7XHJcbiAgICAgICAgLy8gZ2V0IHRoZSBpbmRleCBvZiB0aGUgdGltZXN0YW1wIFxyXG4gICAgICAgIGxldCB0aW1lc3RhbXBJbmRleCA9IFNlcmllc0hlbHBlci5pbmRleE9mTmVhcmVzdCh0aW1lc3RhbXAsdGltZXN0YW1wcyxiaW5TZWFyY2hNb2RlKTtcclxuXHJcbiAgICAgICAgcmV0dXJuICB0aW1lc3RhbXBJbmRleCA+PSAwICYmIHRpbWVzdGFtcEluZGV4IDwgdGltZXN0YW1wcy5sZW5ndGggPyB0aW1lc3RhbXBJbmRleCA6IC0xO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgc2VyaWVzIHBvaW50IG5lYXJlc3QgdG8gdGhlIHRpbWVzdGFtcFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtJUG9pbnR9XHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcG9pbnRGcm9tVGltZXN0YW1wKHRpbWVzdGFtcDpudW1iZXIpIDogSVBvaW50e1xyXG4gICAgICAgIGxldCBuZWFyZXN0VGltZXN0YW1wSW5kZXggPSB0aGlzLmdldFRpbWVzdGFtcEluZGV4KHRpbWVzdGFtcCk7XHJcbiAgICAgICAgcmV0dXJuICBuZWFyZXN0VGltZXN0YW1wSW5kZXggPj0gMCA/ICB0aGlzLnJhd1BvaW50c1tuZWFyZXN0VGltZXN0YW1wSW5kZXhdIDogbmV3IFBvaW50KDAsMCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgc2VyaWVzIHBvaW50IHByZXZpb3VzIHRvIHRoZSB0aW1lc3RhbXBcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7SVBvaW50fVxyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHByZXZpb3VzUG9pbnRGcm9tVGltZXN0YW1wKHRpbWVzdGFtcDogbnVtYmVyKTogSVBvaW50IHtcclxuICAgICAgICAvLyBnZXQgdGhlIGxvd2VyYm91bmQgdGltZXN0YW1wIGluZGV4ICggaWYgdGhlIHRpbWVzdGFtcCBpcyBub3QgbWF0Y2hpbmcgZXhhY3RseSlcclxuICAgICAgICBsZXQgbmVhcmVzdFRpbWVzdGFtcEluZGV4ID0gdGhpcy5nZXRUaW1lc3RhbXBJbmRleCh0aW1lc3RhbXAsQmluU2VhcmNoTW9kZS5MT1dFUkJPVU5EKTtcclxuICAgICAgICByZXR1cm4gbmVhcmVzdFRpbWVzdGFtcEluZGV4ID49IDAgPyB0aGlzLnJhd1BvaW50c1tuZWFyZXN0VGltZXN0YW1wSW5kZXhdIDogbmV3IFBvaW50KDAsIDApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIHRoZSB0aW1lc3RhbXAgaXMgd2l0aGluIHRoZSBhdmFpbGFibGUgcmFuZ2VcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdGltZXN0YW1wXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBCYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB0aW1lc3RhbXBJc0luUmFuZ2UodGltZXN0YW1wOm51bWJlcikgOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiAgU2VyaWVzSGVscGVyLmlzSW5SYW5nZSh0aW1lc3RhbXAsdGhpcy50aW1lc3RhbXBzKTtcclxuICAgIH1cclxuICAgICAgXHJcbiAgICAvKipcclxuICAgICAqIFNldCBpZiBzZXJpZSBpcyBjYWxjdWxhdGVkXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBpc0NhbGN1bGF0ZWQodmFsdWU6IGJvb2xlYW4pe1xyXG4gICAgICAgIHRoaXMuX2lzQ2FsY3VsYXRlZCA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IGlmIHNlcmllIGlzIGNhbGN1bGF0ZWRcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgaXNDYWxjdWxhdGVkKCk6IGJvb2xlYW57XHJcbiAgICAgICByZXR1cm4gdGhpcy5faXNDYWxjdWxhdGVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHNlcmllIG5hbWVcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IG5hbWUodmFsdWU6IHN0cmluZyl7XHJcbiAgICAgICAgbGV0IG9sZE5hbWUgPSAgdGhpcy5fbmFtZTtcclxuICAgICAgICB0aGlzLl9uYW1lID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5vbkRhdGFDaGFuZ2VkKFNlcmllQWN0aW9uLnJlbmFtZSwgdGhpcy5fbmFtZSwgb2xkTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgc2VyaWUgbmFtZVxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHVuaXF1ZSBzZXJpZSBpZFxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgaWQoKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCBzZXJpZSBjb2xvclxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgY29sb3IodmFsdWU6IHN0cmluZyl7XHJcbiAgICAgICAgbGV0IG9sZENvbG9yID0gdGhpcy5fY29sb3I7XHJcbiAgICAgICAgdGhpcy5fY29sb3IgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLm9uRGF0YUNoYW5nZWQoU2VyaWVBY3Rpb24uY29sb3JDaGFuZ2VkLCB0aGlzLl9jb2xvciwgb2xkQ29sb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHNlcmllIGNvbG9yXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgY29sb3IoKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb2xvcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBpZiByYXdQb2ludHMgYXJlIHZhbGlkXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgcmF3UG9pbnRzVmFsaWQoKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5zaWduYWwucmF3UG9pbnRzVmFsaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgc3RhcnRUcmlnZ2VyVGltZVxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHN0YXJ0VHJpZ2dlclRpbWUoKTogbnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdGFydFRyaWdnZXJUaW1lO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHN0YXJ0VHJpZ2dlclRpbWVcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IHN0YXJ0VHJpZ2dlclRpbWUodmFsdWU6IG51bWJlcil7XHJcbiAgICAgICAgbGV0IG9sZFN0YXJ0VHJpZ2dlclRpbWUgPSB0aGlzLl9zdGFydFRyaWdnZXJUaW1lO1xyXG4gICAgICAgIHRoaXMuX3N0YXJ0VHJpZ2dlclRpbWUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLm9uRGF0YUNoYW5nZWQoU2VyaWVBY3Rpb24uc3RhcnRUcmlnZ2VyVGltZUNoYW5nZWQsIG9sZFN0YXJ0VHJpZ2dlclRpbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHN0YXJ0IHRyaWdnZXIgZm9ybWF0ZWQgdGltZSAoc2hvd24gbmV4dCB0byBzZXJpZSBuYW1lKVxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgYWRkaXRpb25hbEluZm8oKTogc3RyaW5ne1xyXG4gICAgICAgIGlmKHRoaXMuX3N0YXJ0VHJpZ2dlclRpbWUgIT0gMCl7XHJcbiAgICAgICAgICAgIHJldHVybiBEYXRlVGltZUhlbHBlci5nZXREYXRlVGltZSh0aGlzLl9zdGFydFRyaWdnZXJUaW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7IC8vIE5vIHN0YXJ0IHRyaWdnZXIgaW5mbyBhdmFpbGFibGVcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBwYXJlbnQgb2Ygc2VyaWVcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7KElTZXJpZUdyb3VwIHwgdW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgcGFyZW50KCk6IElTZXJpZUdyb3VwIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGFyZW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHBhcmVudCBvZiBzZXJpZVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgcGFyZW50KHZhbHVlOiBJU2VyaWVHcm91cCB8IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuX3BhcmVudCA9IHZhbHVlO1xyXG4gICAgICAgIGlmKHRoaXMuX3BhcmVudCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgIGlmKHRoaXMuX3BhcmVudC5wYXJlbnQgaW5zdGFuY2VvZiBTaWduYWxDYXRlZ29yeSl7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLl9wYXJlbnQucGFyZW50LmlkID09IFNpZ25hbENhdGVnb3J5LkNhdGVnb3J5SWRSZWNlbnQpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFNldCBzZXJpZSB0byBhdXRvVXBkYXRlZCBpZiBpbiByZWNlbnQgY2F0ZWdvcnlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQXV0b1VwZGF0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRUcmlnZ2VyVGltZSA9IHRoaXMuX3BhcmVudC5zdGFydFRyaWdnZXJUaW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0VHJpZ2dlclRpbWUgPSAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlc2V0cyB0aGUgbmFtZSB0byB0aGUgb3JpZ2luYWwgbmFtZSBmcm9tIHRoZSBzaWduYWxcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVzZXROYW1lKCl7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gdGhpcy5vcmlnaW5hbE5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDbG9uZXMgdGhpcyBzZXJpZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2xvbmUoKTogQmFzZVNlcmllc3tcclxuICAgICAgICBsZXQgY2xvbmUgPSBuZXcgQmFzZVNlcmllcyh0aGlzLnNpZ25hbCwgdGhpcy5uYW1lLCB0aGlzLmNvbG9yLCB0aGlzLmN1cnNvclR5cGUsIHRoaXMuX3Nlcmllc1Byb3ZpZGVyKTtcclxuICAgICAgICByZXR1cm4gY2xvbmU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGVzIHRoZSBzZXJpZSBkYXRhIGNoYW5nZWQgZXZlbnQgKGUuZy4gc2VyaWUgY29sb3IsIHNlcmllIGRhdGFwb2ludHMsIHJlbmFtZSBjaGFuZ2VkKVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHsqfSBldmVudEFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25TaWduYWxEYXRhQ2hhbmdlZChzZW5kZXI6IElTaWduYWwsIGV2ZW50QXJnczogRXZlbnRTaWduYWxEYXRhQ2hhbmdlZEFyZ3Mpe1xyXG4gICAgICAgIHN3aXRjaCAoZXZlbnRBcmdzLmFjdGlvbikge1xyXG4gICAgICAgICAgICBjYXNlIFNpZ25hbEFjdGlvbi5kYXRhUG9pbnRzQ2hhbmdlZDoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVUaW1lc3RhbXBzKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uRGF0YUNoYW5nZWQoU2VyaWVBY3Rpb24uZGF0YVBvaW50c0NoYW5nZWQsIGV2ZW50QXJncy5kYXRhKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgU2lnbmFsQWN0aW9uLnN0YXJ0VHJpZ2dlclRpbWVDaGFuZ2VkOntcclxuICAgICAgICAgICAgICAgIHRoaXMub25EYXRhQ2hhbmdlZChTZXJpZUFjdGlvbi5zdGFydFRyaWdnZXJUaW1lQ2hhbmdlZCwgZXZlbnRBcmdzLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkRhdGFDaGFuZ2VkKGFjdGlvbjogU2VyaWVBY3Rpb24sIGRhdGE6IGFueSwgb2xkRGF0YTogYW55ID0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgbGV0IGV2ZW50QXJncyA9IG5ldyBFdmVudFNlcmllRGF0YUNoYW5nZWRBcmdzKGFjdGlvbiwgZGF0YSwgb2xkRGF0YSk7XHJcbiAgICAgICAgdGhpcy5ldmVudERhdGFDaGFuZ2VkLnJhaXNlKHRoaXMsIGV2ZW50QXJncyk7XHJcbiAgICAgICAgaWYoYWN0aW9uID09IFNlcmllQWN0aW9uLmRhdGFQb2ludHNDaGFuZ2VkKXtcclxuICAgICAgICAgICAgdGhpcy5vblNlcmllRGF0YUNoYW5nZWQoZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIHdoZW5ldmVyIHRoZSBzZXJpcyBkYXRhIGhhcyBjaGFuZ2VkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SVBvaW50W119IGRhdGFcclxuICAgICAqIEBtZW1iZXJvZiBCYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBvblNlcmllRGF0YUNoYW5nZWQoIGRhdGE6IElQb2ludFtdKSB7XHJcbiAgICAgICAgLy9UT0RPOiBldmVudHVhbGx5IGNhbGwgc2ltcGxpZmljYXRpb24gPz8/P1xyXG4gICAgfVxyXG59Il19