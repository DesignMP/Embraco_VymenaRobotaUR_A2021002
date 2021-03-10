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
define(["require", "exports", "../../framework/events", "./eventSerieDataChangedArgs", "../common/signal/eventSignalDataChangedArgs", "../../widgets/common/seriesIconProvider", "../signalManagerDataModel/signalCategory", "../common/calculatorProvider/calculationDataPoints", "../../common/dateTimeHelper", "../../common/seriesHelper", "../common/point", "../common/calculatorProvider/calculationDataInfo", "./seriesType"], function (require, exports, events_1, eventSerieDataChangedArgs_1, eventSignalDataChangedArgs_1, seriesIconProvider_1, signalCategory_1, calculationDataPoints_1, dateTimeHelper_1, seriesHelper_1, point_1, calculationDataInfo_1, seriesType_1) {
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
        function BaseSeries(signal, name, color, cursorType) {
            var _this = this;
            this.type = seriesType_1.SeriesType.timeSeries;
            this.eventDataChanged = new EventSeriesDataChanged();
            this._onSignalDataChanged = function (sender, eventArgs) { _this.onSignalDataChanged(sender, eventArgs); };
            this._rawPoints = [];
            this._isCalculated = false;
            this._startTriggerTime = 0;
            this.isAutoUpdated = false;
            this._data = [];
            // holds the timestamps
            this._timestamps = [];
            this._errorInfo = new Array();
            this.calculationDataInfo = new calculationDataInfo_1.CalculationDataInfo([], '');
            this.cursorType = cursorType;
            this._name = name;
            this._color = color;
            this.signal = signal;
            this.signal.eventDataChanged.attach(this._onSignalDataChanged);
            this._description = "";
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
         * Updates input data for calculated series
         *
         * @param {Array<CalculationDataPoints>} inputData
         * @memberof baseSeries
         */
        BaseSeries.prototype.updateInputData = function (inputData) {
            for (var i = 0; i < inputData.length; i++) {
                if (inputData[i] instanceof calculationDataPoints_1.CalculationDataPoints) {
                    this.calculationDataInfo.inputData[i] = inputData[i];
                }
            }
        };
        BaseSeries.prototype.updateCalculationDataInfo = function (inputData, type, inputChilds) {
            this.updateInputData(inputData);
            this.calculationDataInfo.type = type;
            this.calculationDataInfo.inputSeries = [];
            for (var i = 0; i < inputChilds.length; i++) {
                this.calculationDataInfo.inputSeries[i] = inputChilds[i].serie;
            }
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
             * Get serie id
             *
             * @readonly
             * @type {string}
             * @memberof baseSeries
             */
            get: function () {
                return this.signal.id;
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
            return new BaseSeries(this.signal, this.name, this.color, this.cursorType);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZVNlcmllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9iYXNlU2VyaWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFtQkE7UUFBcUMsMENBQWtEO1FBQXZGOztRQUF5RixDQUFDO1FBQUQsNkJBQUM7SUFBRCxDQUFDLEFBQTFGLENBQXFDLG1CQUFVLEdBQTJDO0lBQUEsQ0FBQztJQUUzRjtRQTBESSxvQkFBWSxNQUFlLEVBQUUsSUFBWSxFQUFFLEtBQWEsRUFBRSxVQUFzQjtZQUFoRixpQkFRQztZQWhFRCxTQUFJLEdBQUcsdUJBQVUsQ0FBQyxVQUFVLENBQUM7WUFFN0IscUJBQWdCLEdBQTJCLElBQUksc0JBQXNCLEVBQUUsQ0FBQztZQUdoRSx5QkFBb0IsR0FBRyxVQUFDLE1BQU0sRUFBRSxTQUFTLElBQU8sS0FBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQSxDQUFBLENBQUMsQ0FBQTtZQUcxRixlQUFVLEdBQWtCLEVBQUUsQ0FBQztZQUtqQyxrQkFBYSxHQUFZLEtBQUssQ0FBQztZQUUvQixzQkFBaUIsR0FBVyxDQUFDLENBQUM7WUFJdEMsa0JBQWEsR0FBWSxLQUFLLENBQUM7WUFDckIsVUFBSyxHQUFrQixFQUFFLENBQUM7WUFjaEMsdUJBQXVCO1lBQ2IsZ0JBQVcsR0FBWSxFQUFFLENBQUM7WUFFaEMsZUFBVSxHQUFHLElBQUksS0FBSyxFQUFVLENBQUM7WUFvQnJDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLHlDQUFtQixDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUMzRCxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztZQUM3QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUNsQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FB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QUMvQyxDQUFDO1FBQ0wsaUJBQUM7SUFBRCxDQUFDLEFBaGZELElBZ2ZDO0lBaGZZLGdDQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVNpZ25hbCB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy9zaWduYWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvZXZlbnRzXCI7XHJcbmltcG9ydCB7IFNlcmllQWN0aW9uLCBFdmVudFNlcmllRGF0YUNoYW5nZWRBcmdzIH0gZnJvbSBcIi4vZXZlbnRTZXJpZURhdGFDaGFuZ2VkQXJnc1wiO1xyXG5pbXBvcnQgeyBTaWduYWxBY3Rpb24sIEV2ZW50U2lnbmFsRGF0YUNoYW5nZWRBcmdzIH0gZnJvbSBcIi4uL2NvbW1vbi9zaWduYWwvZXZlbnRTaWduYWxEYXRhQ2hhbmdlZEFyZ3NcIjtcclxuaW1wb3J0IHsgU2VyaWVzSWNvblByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uL3dpZGdldHMvY29tbW9uL3Nlcmllc0ljb25Qcm92aWRlclwiO1xyXG5pbXBvcnQgeyBJU2VyaWVHcm91cCB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy9zZXJpZUdyb3VwSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNpZ25hbENhdGVnb3J5IH0gZnJvbSBcIi4uL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvc2lnbmFsQ2F0ZWdvcnlcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhUG9pbnRzIH0gZnJvbSBcIi4uL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRpb25EYXRhUG9pbnRzXCI7XHJcbmltcG9ydCB7IERhdGVUaW1lSGVscGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9kYXRlVGltZUhlbHBlclwiO1xyXG5pbXBvcnQgeyBTZXJpZXNIZWxwZXIsIEJpblNlYXJjaE1vZGUgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3Nlcmllc0hlbHBlclwiO1xyXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuLi9jb21tb24vcG9pbnRcIjtcclxuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL3BvaW50SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YU51bWJlciB9IGZyb20gXCIuLi9jb21tb24vY2FsY3VsYXRvclByb3ZpZGVyL2NhbGN1bGF0aW9uRGF0YU51bWJlclwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cyB9IGZyb20gXCIuLi9jb21tb24vY2FsY3VsYXRvclByb3ZpZGVyL2NhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YUluZm8gfSBmcm9tIFwiLi4vY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdGlvbkRhdGFJbmZvXCI7XHJcbmltcG9ydCB7IElTZXJpZU5vZGUgfSBmcm9tIFwiLi4vY29tbW9uL2ludGVyZmFjZXMvc2VyaWVOb2RlSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNlcmllc1R5cGUgfSBmcm9tIFwiLi9zZXJpZXNUeXBlXCI7XHJcbmltcG9ydCB7IEN1cnNvclR5cGUgfSBmcm9tIFwiLi4vLi4vd2lkZ2V0cy9jb21tb24vc3RhdGVzL2N1cnNvclN0YXRlc1wiO1xyXG5cclxuY2xhc3MgRXZlbnRTZXJpZXNEYXRhQ2hhbmdlZCBleHRlbmRzIFR5cGVkRXZlbnQgPEJhc2VTZXJpZXMsIEV2ZW50U2VyaWVEYXRhQ2hhbmdlZEFyZ3M+eyB9O1xyXG5cclxuZXhwb3J0IGNsYXNzIEJhc2VTZXJpZXN7XHJcblxyXG4gICAgdHlwZSA9IFNlcmllc1R5cGUudGltZVNlcmllcztcclxuICAgIGN1cnNvclR5cGU6IEN1cnNvclR5cGU7XHJcbiAgICBldmVudERhdGFDaGFuZ2VkOiBFdmVudFNlcmllc0RhdGFDaGFuZ2VkID0gbmV3IEV2ZW50U2VyaWVzRGF0YUNoYW5nZWQoKTtcclxuICAgIFxyXG5cclxuICAgIHByaXZhdGUgX29uU2lnbmFsRGF0YUNoYW5nZWQgPSAoc2VuZGVyLCBldmVudEFyZ3MpID0+IHsgdGhpcy5vblNpZ25hbERhdGFDaGFuZ2VkKHNlbmRlciwgZXZlbnRBcmdzKX1cclxuICAgIFxyXG4gICAgcHJvdGVjdGVkIHNpZ25hbDogSVNpZ25hbDtcclxuICAgIHByb3RlY3RlZCBfcmF3UG9pbnRzOiBBcnJheTxJUG9pbnQ+ID0gW107XHJcbiAgICBwcm90ZWN0ZWQgX25hbWU6IHN0cmluZztcclxuICAgIHByb3RlY3RlZCBfY29sb3I6IHN0cmluZztcclxuICAgIHByb3RlY3RlZCBfZGVzY3JpcHRpb246IHN0cmluZztcclxuXHJcbiAgICBwcml2YXRlIF9pc0NhbGN1bGF0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgX3BhcmVudDogSVNlcmllR3JvdXAgfCB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF9zdGFydFRyaWdnZXJUaW1lOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIGNhbGN1bGF0aW9uRGF0YUluZm86IENhbGN1bGF0aW9uRGF0YUluZm87IFxyXG4gICAgXHJcbiAgICBpc0F1dG9VcGRhdGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcm90ZWN0ZWQgX2RhdGE6IEFycmF5PElQb2ludD4gPSBbXTtcclxuICAgIG1heFggOiBudW1iZXJ8dW5kZWZpbmVkO1xyXG4gICAgbWluWCA6IG51bWJlcnx1bmRlZmluZWQ7XHJcbiAgICBtYXhZIDogbnVtYmVyfHVuZGVmaW5lZDtcclxuICAgIG1pblkgOiBudW1iZXJ8dW5kZWZpbmVkO1xyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGRhdGEoKTpBcnJheTxJUG9pbnQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgZGF0YSh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuX2RhdGEgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAgICAgLy8gaG9sZHMgdGhlIHRpbWVzdGFtcHNcclxuICAgICAgICBwcm90ZWN0ZWQgX3RpbWVzdGFtcHM6bnVtYmVyW10gPSBbXTtcclxuXHJcbiAgICBwcml2YXRlIF9lcnJvckluZm8gPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xyXG4gICAgcHVibGljIGdldCBlcnJvckluZm8oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Vycm9ySW5mbztcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgZXJyb3JJbmZvKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5fZXJyb3JJbmZvID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBvcmlnaW5hbE5hbWUoKTpzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNpZ25hbC5uYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgZGVzY3JpcHRpb24oKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGVzY3JpcHRpb247XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IGRlc2NyaXB0aW9uKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9kZXNjcmlwdGlvbiA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHNpZ25hbDogSVNpZ25hbCwgbmFtZTogc3RyaW5nLCBjb2xvcjogc3RyaW5nLCBjdXJzb3JUeXBlOiBDdXJzb3JUeXBlKXtcclxuICAgICAgICB0aGlzLmNhbGN1bGF0aW9uRGF0YUluZm8gPSBuZXcgQ2FsY3VsYXRpb25EYXRhSW5mbyhbXSwgJycpO1xyXG4gICAgICAgIHRoaXMuY3Vyc29yVHlwZSA9IGN1cnNvclR5cGU7XHJcbiAgICAgICAgdGhpcy5fbmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5fY29sb3IgPSBjb2xvcjtcclxuICAgICAgICB0aGlzLnNpZ25hbCA9IHNpZ25hbDtcclxuICAgICAgICB0aGlzLnNpZ25hbC5ldmVudERhdGFDaGFuZ2VkLmF0dGFjaCh0aGlzLl9vblNpZ25hbERhdGFDaGFuZ2VkKTtcclxuICAgICAgICB0aGlzLl9kZXNjcmlwdGlvbiA9IFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSB0aW1lc3RhbXBzIGJhc2VvbiB0aGUgYXZhaWxhYmxlIHNlcmllc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgdXBkYXRlVGltZXN0YW1wcygpIHtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBzZXJpZSBpY29uIGRlZmluaXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGljb25EZWZpbml0aW9uKCk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IGljb25EZWZpbml0aW9uID0gYDxkaXYgY2xhc3M9J2UtZG9jJyBzdHlsZT0ncG9zaXRpb246IHJlbGF0aXZlO2hlaWdodDoxNnB4O3dpZHRoOjMwcHg7bWFyZ2luOmF1dG87ZmxvYXQ6bGVmdDttYXJnaW4tbGVmdDo2cHg7bWFyZ2luLXRvcDoycHgnPmA7XHJcbiAgICAgICAgLy8gYWRkIHNlcmllcyBpY29uICh3aXRoIG92ZXJsYXlzKVxyXG4gICAgICAgIGljb25EZWZpbml0aW9uICs9IFNlcmllc0ljb25Qcm92aWRlci5nZXRJbnN0YW5jZSgpLmdldEljb24odGhpcyk7XHJcbiAgICAgICAgaWNvbkRlZmluaXRpb24gKz0gYDwvZGl2PmA7XHJcbiAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIHJldHVybiBpY29uRGVmaW5pdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGRhdGEgb2YgYW4gZXhpc3Rpbmcgc2VyaWVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElQb2ludD59IHJhd1BvaW50c1xyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHVwZGF0ZVBvaW50cyhyYXdQb2ludHM6IEFycmF5PElQb2ludD4pe1xyXG4gICAgICAgIHRoaXMucmF3UG9pbnRzID0gcmF3UG9pbnRzO1xyXG4gICAgICAgIHRoaXMuZ2V0UmFuZ2UoKTtcclxuICAgICAgICB0aGlzLnNpbXBsaWZ5U2lnbmFsKHJhd1BvaW50cyk7XHJcbiAgICAgICAgdGhpcy5zaWduYWwucmF3UG9pbnRzID0gcmF3UG9pbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaW1wbGlmeVNpZ25hbChyYXdQb2ludHM6IEFycmF5PElQb2ludD4pe307XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIGlucHV0IGRhdGEgZm9yIGNhbGN1bGF0ZWQgc2VyaWVzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+fSBpbnB1dERhdGFcclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB1cGRhdGVJbnB1dERhdGEoaW5wdXREYXRhOiBBcnJheTxDYWxjdWxhdGlvbkRhdGFOdW1iZXJ8Q2FsY3VsYXRpb25EYXRhUG9pbnRzfENhbGN1bGF0aW9uRGF0YU51bWJlck9yUG9pbnRzPil7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGlucHV0RGF0YS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKCBpbnB1dERhdGFbaV0gaW5zdGFuY2VvZiBDYWxjdWxhdGlvbkRhdGFQb2ludHMpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGlvbkRhdGFJbmZvLmlucHV0RGF0YVtpXSA9IGlucHV0RGF0YVtpXSBhcyBDYWxjdWxhdGlvbkRhdGFQb2ludHM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZUNhbGN1bGF0aW9uRGF0YUluZm8gKGlucHV0RGF0YTogQXJyYXk8Q2FsY3VsYXRpb25EYXRhTnVtYmVyfENhbGN1bGF0aW9uRGF0YVBvaW50c3xDYWxjdWxhdGlvbkRhdGFOdW1iZXJPclBvaW50cz4sIHR5cGU6IHN0cmluZywgaW5wdXRDaGlsZHM6IEFycmF5PElTZXJpZU5vZGU+KSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVJbnB1dERhdGEoaW5wdXREYXRhKTtcclxuICAgICAgICB0aGlzLmNhbGN1bGF0aW9uRGF0YUluZm8udHlwZSA9IHR5cGU7XHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdGlvbkRhdGFJbmZvLmlucHV0U2VyaWVzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnB1dENoaWxkcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0aW9uRGF0YUluZm8uaW5wdXRTZXJpZXNbaV0gPSBpbnB1dENoaWxkc1tpXS5zZXJpZSE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgcmFuZ2UgbGltaXRzIGZyb20gYSBzZXJpZVxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXRSYW5nZSgpe1xyXG4gICAgICAgIHRoaXMubWF4WCA9IHRoaXMuZ2V0TWF4WCgpO1xyXG4gICAgICAgIHRoaXMubWluWCA9IHRoaXMuZ2V0TWluWCgpO1xyXG4gICAgICAgIHRoaXMubWF4WSA9IHRoaXMuZ2V0TWF4WSgpO1xyXG4gICAgICAgIHRoaXMubWluWSA9IHRoaXMuZ2V0TWluWSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7KG51bWJlciB8IHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0TWF4WCgpOiBudW1iZXIgfCB1bmRlZmluZWR7XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEByZXR1cm5zIHsobnVtYmVyIHwgdW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXRNaW5YKCk6IG51bWJlciB8IHVuZGVmaW5lZHtcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBtYXggWSB2YWx1ZSBmcm9tIGEgc2VyaWVcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcmV0dXJucyB7KG51bWJlciB8IHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0TWF4WSgpOiBudW1iZXIgfCB1bmRlZmluZWR7XHJcbiAgICAgICAgbGV0IG1heFk7XHJcbiAgICAgICAgaWYgKHRoaXMucmF3UG9pbnRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMucmF3UG9pbnRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGlmKG1heFkgPT0gdW5kZWZpbmVkIHx8IHRoaXMucmF3UG9pbnRzW2ldLnkgPiBtYXhZICl7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF4WSA9IHRoaXMucmF3UG9pbnRzW2ldLnlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWF4WTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBtaW4gWSB2YWx1ZSBmcm9tIGEgc2VyaWVcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcmV0dXJucyB7KG51bWJlciB8IHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0TWluWSgpOiBudW1iZXIgfCB1bmRlZmluZWR7XHJcbiAgICAgICAgbGV0IG1pblk7XHJcbiAgICAgICAgaWYgKHRoaXMucmF3UG9pbnRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMucmF3UG9pbnRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGlmKG1pblkgPT0gdW5kZWZpbmVkIHx8IHRoaXMucmF3UG9pbnRzW2ldLnkgPCBtaW5ZICl7XHJcbiAgICAgICAgICAgICAgICAgICAgbWluWSA9IHRoaXMucmF3UG9pbnRzW2ldLnlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWluWTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCByYXdQb2ludHNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IHJhd1BvaW50cyhwb2ludHM6IEFycmF5PElQb2ludD4pe1xyXG4gICAgICAgIHRoaXMuX3Jhd1BvaW50cyA9IHBvaW50cztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgcmF3UG9pbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge0FycmF5PElQb2ludD59XHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHJhd1BvaW50cygpOiAgQXJyYXk8SVBvaW50PntcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmF3UG9pbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXRzIHRoZSB0aW1lc3RhbXBzIGF2YWlsYWJsZSBpbiB0aGUgc2VyaWVzXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7QXJyYXk8bnVtYmVyPn1cclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgdGltZXN0YW1wcygpIDogQXJyYXk8bnVtYmVyPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RpbWVzdGFtcHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBkZXRlcm1pbmVzIHRoZSBpbmRleCBvZiB0aGUgdGltZXN0YW1wIHdpdGhpbiB0aGUgYXZhaWxhYmxlIHRpbWVzdGFtcHNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdGltZXN0YW1wXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcltdfSB0aW1lc3RhbXBzXHJcbiAgICAgKiBAcGFyYW0ge0JpblNlYXJjaE1vZGV9IExPV0VSXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgZ2V0VGltZXN0YW1wSW5kZXgodGltZXN0YW1wOiBudW1iZXIsYmluU2VhcmNoTW9kZTpCaW5TZWFyY2hNb2RlID0gQmluU2VhcmNoTW9kZS5ORUFSRVNUKSB7XHJcbiAgICAgICBcclxuICAgICAgICAvLyBnZXQgdGhlIGF2YWlsYWJsZSB0aW1lc3RhbXBzXHJcbiAgICAgICAgbGV0IHRpbWVzdGFtcHMgPSB0aGlzLnRpbWVzdGFtcHM7XHJcbiAgICAgICAgLy8gZ2V0IHRoZSBpbmRleCBvZiB0aGUgdGltZXN0YW1wIFxyXG4gICAgICAgIGxldCB0aW1lc3RhbXBJbmRleCA9IFNlcmllc0hlbHBlci5pbmRleE9mTmVhcmVzdCh0aW1lc3RhbXAsdGltZXN0YW1wcyxiaW5TZWFyY2hNb2RlKTtcclxuXHJcbiAgICAgICAgcmV0dXJuICB0aW1lc3RhbXBJbmRleCA+PSAwICYmIHRpbWVzdGFtcEluZGV4IDwgdGltZXN0YW1wcy5sZW5ndGggPyB0aW1lc3RhbXBJbmRleCA6IC0xO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgc2VyaWVzIHBvaW50IG5lYXJlc3QgdG8gdGhlIHRpbWVzdGFtcFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtJUG9pbnR9XHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcG9pbnRGcm9tVGltZXN0YW1wKHRpbWVzdGFtcDpudW1iZXIpIDogSVBvaW50e1xyXG4gICAgICAgIGxldCBuZWFyZXN0VGltZXN0YW1wSW5kZXggPSB0aGlzLmdldFRpbWVzdGFtcEluZGV4KHRpbWVzdGFtcCk7XHJcbiAgICAgICAgcmV0dXJuICBuZWFyZXN0VGltZXN0YW1wSW5kZXggPj0gMCA/ICB0aGlzLnJhd1BvaW50c1tuZWFyZXN0VGltZXN0YW1wSW5kZXhdIDogbmV3IFBvaW50KDAsMCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgc2VyaWVzIHBvaW50IHByZXZpb3VzIHRvIHRoZSB0aW1lc3RhbXBcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7SVBvaW50fVxyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHByZXZpb3VzUG9pbnRGcm9tVGltZXN0YW1wKHRpbWVzdGFtcDogbnVtYmVyKTogSVBvaW50IHtcclxuICAgICAgICAvLyBnZXQgdGhlIGxvd2VyYm91bmQgdGltZXN0YW1wIGluZGV4ICggaWYgdGhlIHRpbWVzdGFtcCBpcyBub3QgbWF0Y2hpbmcgZXhhY3RseSlcclxuICAgICAgICBsZXQgbmVhcmVzdFRpbWVzdGFtcEluZGV4ID0gdGhpcy5nZXRUaW1lc3RhbXBJbmRleCh0aW1lc3RhbXAsQmluU2VhcmNoTW9kZS5MT1dFUkJPVU5EKTtcclxuICAgICAgICByZXR1cm4gbmVhcmVzdFRpbWVzdGFtcEluZGV4ID49IDAgPyB0aGlzLnJhd1BvaW50c1tuZWFyZXN0VGltZXN0YW1wSW5kZXhdIDogbmV3IFBvaW50KDAsIDApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIHRoZSB0aW1lc3RhbXAgaXMgd2l0aGluIHRoZSBhdmFpbGFibGUgcmFuZ2VcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdGltZXN0YW1wXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBCYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB0aW1lc3RhbXBJc0luUmFuZ2UodGltZXN0YW1wOm51bWJlcikgOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiAgU2VyaWVzSGVscGVyLmlzSW5SYW5nZSh0aW1lc3RhbXAsdGhpcy50aW1lc3RhbXBzKTtcclxuICAgIH1cclxuICAgICAgXHJcbiAgICAvKipcclxuICAgICAqIFNldCBpZiBzZXJpZSBpcyBjYWxjdWxhdGVkXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBpc0NhbGN1bGF0ZWQodmFsdWU6IGJvb2xlYW4pe1xyXG4gICAgICAgIHRoaXMuX2lzQ2FsY3VsYXRlZCA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IGlmIHNlcmllIGlzIGNhbGN1bGF0ZWRcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgaXNDYWxjdWxhdGVkKCk6IGJvb2xlYW57XHJcbiAgICAgICByZXR1cm4gdGhpcy5faXNDYWxjdWxhdGVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHNlcmllIG5hbWVcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IG5hbWUodmFsdWU6IHN0cmluZyl7XHJcbiAgICAgICAgbGV0IG9sZE5hbWUgPSAgdGhpcy5fbmFtZTtcclxuICAgICAgICB0aGlzLl9uYW1lID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5vbkRhdGFDaGFuZ2VkKFNlcmllQWN0aW9uLnJlbmFtZSwgdGhpcy5fbmFtZSwgb2xkTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgc2VyaWUgbmFtZVxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHNlcmllIGlkXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBpZCgpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2lnbmFsLmlkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHNlcmllIGNvbG9yXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBjb2xvcih2YWx1ZTogc3RyaW5nKXtcclxuICAgICAgICBsZXQgb2xkQ29sb3IgPSB0aGlzLl9jb2xvcjtcclxuICAgICAgICB0aGlzLl9jb2xvciA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMub25EYXRhQ2hhbmdlZChTZXJpZUFjdGlvbi5jb2xvckNoYW5nZWQsIHRoaXMuX2NvbG9yLCBvbGRDb2xvcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgc2VyaWUgY29sb3JcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBjb2xvcigpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbG9yO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IGlmIHJhd1BvaW50cyBhcmUgdmFsaWRcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCByYXdQb2ludHNWYWxpZCgpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNpZ25hbC5yYXdQb2ludHNWYWxpZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBzdGFydFRyaWdnZXJUaW1lXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgc3RhcnRUcmlnZ2VyVGltZSgpOiBudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXJ0VHJpZ2dlclRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgc3RhcnRUcmlnZ2VyVGltZVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgc3RhcnRUcmlnZ2VyVGltZSh2YWx1ZTogbnVtYmVyKXtcclxuICAgICAgICBsZXQgb2xkU3RhcnRUcmlnZ2VyVGltZSA9IHRoaXMuX3N0YXJ0VHJpZ2dlclRpbWU7XHJcbiAgICAgICAgdGhpcy5fc3RhcnRUcmlnZ2VyVGltZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMub25EYXRhQ2hhbmdlZChTZXJpZUFjdGlvbi5zdGFydFRyaWdnZXJUaW1lQ2hhbmdlZCwgb2xkU3RhcnRUcmlnZ2VyVGltZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgc3RhcnQgdHJpZ2dlciBmb3JtYXRlZCB0aW1lIChzaG93biBuZXh0IHRvIHNlcmllIG5hbWUpXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBhZGRpdGlvbmFsSW5mbygpOiBzdHJpbmd7XHJcbiAgICAgICAgaWYodGhpcy5fc3RhcnRUcmlnZ2VyVGltZSAhPSAwKXtcclxuICAgICAgICAgICAgcmV0dXJuIERhdGVUaW1lSGVscGVyLmdldERhdGVUaW1lKHRoaXMuX3N0YXJ0VHJpZ2dlclRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJcIjsgLy8gTm8gc3RhcnQgdHJpZ2dlciBpbmZvIGF2YWlsYWJsZVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHBhcmVudCBvZiBzZXJpZVxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHsoSVNlcmllR3JvdXAgfCB1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBwYXJlbnQoKTogSVNlcmllR3JvdXAgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgcGFyZW50IG9mIHNlcmllXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIGJhc2VTZXJpZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBwYXJlbnQodmFsdWU6IElTZXJpZUdyb3VwIHwgdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5fcGFyZW50ID0gdmFsdWU7XHJcbiAgICAgICAgaWYodGhpcy5fcGFyZW50ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgaWYodGhpcy5fcGFyZW50LnBhcmVudCBpbnN0YW5jZW9mIFNpZ25hbENhdGVnb3J5KXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuX3BhcmVudC5wYXJlbnQuaWQgPT0gU2lnbmFsQ2F0ZWdvcnkuQ2F0ZWdvcnlJZFJlY2VudCl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU2V0IHNlcmllIHRvIGF1dG9VcGRhdGVkIGlmIGluIHJlY2VudCBjYXRlZ29yeVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNBdXRvVXBkYXRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zdGFydFRyaWdnZXJUaW1lID0gdGhpcy5fcGFyZW50LnN0YXJ0VHJpZ2dlclRpbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRUcmlnZ2VyVGltZSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVzZXRzIHRoZSBuYW1lIHRvIHRoZSBvcmlnaW5hbCBuYW1lIGZyb20gdGhlIHNpZ25hbFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZXNldE5hbWUoKXtcclxuICAgICAgICB0aGlzLm5hbWUgPSB0aGlzLm9yaWdpbmFsTmFtZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENsb25lcyB0aGlzIHNlcmllXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBiYXNlU2VyaWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjbG9uZSgpOiBCYXNlU2VyaWVze1xyXG4gICAgICAgIHJldHVybiBuZXcgQmFzZVNlcmllcyh0aGlzLnNpZ25hbCwgdGhpcy5uYW1lLCB0aGlzLmNvbG9yLCB0aGlzLmN1cnNvclR5cGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlcyB0aGUgc2VyaWUgZGF0YSBjaGFuZ2VkIGV2ZW50IChlLmcuIHNlcmllIGNvbG9yLCBzZXJpZSBkYXRhcG9pbnRzLCByZW5hbWUgY2hhbmdlZClcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7Kn0gZXZlbnRBcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgYmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uU2lnbmFsRGF0YUNoYW5nZWQoc2VuZGVyOiBJU2lnbmFsLCBldmVudEFyZ3M6IEV2ZW50U2lnbmFsRGF0YUNoYW5nZWRBcmdzKXtcclxuICAgICAgICBzd2l0Y2ggKGV2ZW50QXJncy5hY3Rpb24pIHtcclxuICAgICAgICAgICAgY2FzZSBTaWduYWxBY3Rpb24uZGF0YVBvaW50c0NoYW5nZWQ6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVGltZXN0YW1wcygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkRhdGFDaGFuZ2VkKFNlcmllQWN0aW9uLmRhdGFQb2ludHNDaGFuZ2VkLCBldmVudEFyZ3MuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFNpZ25hbEFjdGlvbi5zdGFydFRyaWdnZXJUaW1lQ2hhbmdlZDp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uRGF0YUNoYW5nZWQoU2VyaWVBY3Rpb24uc3RhcnRUcmlnZ2VyVGltZUNoYW5nZWQsIGV2ZW50QXJncy5kYXRhKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25EYXRhQ2hhbmdlZChhY3Rpb246IFNlcmllQWN0aW9uLCBkYXRhOiBhbnksIG9sZERhdGE6IGFueSA9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGxldCBldmVudEFyZ3MgPSBuZXcgRXZlbnRTZXJpZURhdGFDaGFuZ2VkQXJncyhhY3Rpb24sIGRhdGEsIG9sZERhdGEpO1xyXG4gICAgICAgIHRoaXMuZXZlbnREYXRhQ2hhbmdlZC5yYWlzZSh0aGlzLCBldmVudEFyZ3MpO1xyXG4gICAgICAgIGlmKGFjdGlvbiA9PSBTZXJpZUFjdGlvbi5kYXRhUG9pbnRzQ2hhbmdlZCl7XHJcbiAgICAgICAgICAgIHRoaXMub25TZXJpZURhdGFDaGFuZ2VkKGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCB3aGVuZXZlciB0aGUgc2VyaXMgZGF0YSBoYXMgY2hhbmdlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0lQb2ludFtdfSBkYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgQmFzZVNlcmllc1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgb25TZXJpZURhdGFDaGFuZ2VkKCBkYXRhOiBJUG9pbnRbXSkge1xyXG4gICAgICAgIC8vVE9ETzogZXZlbnR1YWxseSBjYWxsIHNpbXBsaWZpY2F0aW9uID8/Pz9cclxuICAgIH1cclxufSJdfQ==