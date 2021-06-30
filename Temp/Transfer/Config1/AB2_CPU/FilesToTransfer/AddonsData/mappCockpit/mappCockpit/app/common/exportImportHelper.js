define(["require", "exports", "./traceDataConversion/classes/ConvertHandler", "./traceDataConversion/enums/ConvertTypes", "../models/common/signal/signal", "./colorHelper", "./dateTimeHelper", "../models/common/point", "./traceDataConversion/classes/DeconvertHandler", "./traceDataConversion/exceptions/traceDataConversionError", "./traceDataConversion/classes/ytSignal", "./traceDataConversion/classes/xySignal", "./traceDataConversion/classes/fftSignal", "../core/types/sample", "../core/types/frequencyAmplitude", "../core/types/point", "../models/chartManagerDataModel/seriesType", "./exportSerieGroup", "../models/common/signal/serieGroup", "../models/signalManagerDataModel/signalManagerCalculation", "./seriesHelper", "../models/common/calculatorProvider/calculators/fftCalculator", "../models/common/calculatorProvider/calculators/xyCalculator"], function (require, exports, ConvertHandler_1, ConvertTypes_1, signal_1, colorHelper_1, dateTimeHelper_1, point_1, DeconvertHandler_1, traceDataConversionError_1, ytSignal_1, xySignal_1, fftSignal_1, sample_1, frequencyAmplitude_1, point_2, seriesType_1, exportSerieGroup_1, serieGroup_1, signalManagerCalculation_1, seriesHelper_1, fftCalculator_1, xyCalculator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ExportImportHelper = /** @class */ (function () {
        /**
         * Creates an instance of ExportImportHelper
         * @param {ISeriesProvider} seriesProvider
         * @memberof ExportImportHelper
         */
        function ExportImportHelper(seriesProvider) {
            this._seriesProvider = seriesProvider;
        }
        /**
         * converts the data of a serieGroup to a csv string
         *
         * @param {Array<ExportSerieGroup>} elements
         * @returns {string}
         * @memberof ExportImportHelper
         */
        ExportImportHelper.prototype.exportTraceData = function (elements) {
            var returnValue = undefined;
            try {
                var recordings = new Array();
                for (var i = 0; i < elements.length; i++) { // create a recording for each ExportSeriesGroup
                    try {
                        var recording = new Recording(elements[i], this._seriesProvider);
                        recordings.push(recording);
                    }
                    catch (e) {
                        console.error("Convert for " + elements[i].name + " not possible!");
                        console.error(e);
                    }
                }
                if (recordings.length > 0) { //convert recordings if there are any
                    var convertHandler = new ConvertHandler_1.ConvertHandler();
                    var partialFile = convertHandler.convert(recordings, ConvertTypes_1.ConvertTypes.CSV_AS_EN);
                    returnValue = partialFile.data;
                }
            }
            catch (e) {
                if (traceDataConversionError_1.TraceDataConversionError.isTraceDataConversionError(e)) {
                    console.error("ErrorType: " + e.name + " ErrorMessage: " + e.message);
                }
                else {
                    console.error("Convert not possible! Signals can not be exported!");
                }
                alert("Trace data can not be exported!");
            }
            return returnValue;
        };
        /**
         * Converts a csv string to a list of serie groups
         *
         * @param {string} data
         * @param {string} filename
         * @param {(Array<TraceDataPointInfo>|undefined)} [traceDataPointInfos=undefined] can be used for adding alias and description of a datapoint
         * @returns {ISerieGroup[]}
         * @memberof ExportImportHelper
         */
        ExportImportHelper.prototype.importTraceData = function (data, filename, traceDataPointInfos) {
            if (traceDataPointInfos === void 0) { traceDataPointInfos = undefined; }
            // get recordings from data(csv)
            var recordings = ExportImportHelper.getRecordingsFromData(data, filename);
            if (recordings == undefined) {
                return [new serieGroup_1.SerieGroup("No data found!", 0)];
            }
            // get serie groups from the recording datas
            return this.getSerieGroupsFromRecordings(recordings, traceDataPointInfos);
        };
        /**
         * Returns recording data from the given input data(csv)
         *
         * @private
         * @static
         * @param {string} data
         * @param {string} filename
         * @returns
         * @memberof ExportImportHelper
         */
        ExportImportHelper.getRecordingsFromData = function (data, filename) {
            var deconverter = new DeconvertHandler_1.DeconvertHandler();
            var recordings;
            try {
                recordings = deconverter.Deconvert({ data: data, fileending: this.getFileExtension(filename) });
            }
            catch (e) {
                if (traceDataConversionError_1.TraceDataConversionError.isTraceDataConversionError(e)) {
                    console.error("ErrorType: " + e.name + " ErrorMessage: " + e.message);
                }
                else {
                    console.error("Deconvert not possible! Signals can not be imported!");
                }
                alert("Trace data can not be imported from file!");
                return undefined;
            }
            return recordings;
        };
        /**
         * Returns a series group array with the informations from the given recordings
         *
         * @private
         * @param {Array<IRecording>} recordings
         * @param {(Array<TraceDataPointInfo>|undefined)} [traceDataPointInfos=undefined]
         * @returns
         * @memberof ExportImportHelper
         */
        ExportImportHelper.prototype.getSerieGroupsFromRecordings = function (recordings, traceDataPointInfos) {
            var _this = this;
            if (traceDataPointInfos === void 0) { traceDataPointInfos = undefined; }
            var serieGroups = new Array();
            // Each recording will be displayed as a own signal group with its own start trigger time
            recordings.forEach(function (recording) {
                var timestamp = recording.startTriggerTime;
                var serieGroup = new serieGroup_1.SerieGroup(dateTimeHelper_1.DateTimeHelper.getDateTime(timestamp), timestamp);
                var signals = recording.signals;
                var _loop_1 = function (i) {
                    if (signals[i] instanceof ytSignal_1.YTSignal) {
                        var newSerie = _this.createYTSerieFromYTSignal(serieGroup, signals[i]);
                        if (traceDataPointInfos != undefined) {
                            // Add description and alias name for datapoint if found
                            var tracePointInfos = traceDataPointInfos.filter(function (element) { return element.fullname == signals[i].name; });
                            if (tracePointInfos.length == 1) {
                                newSerie.name = tracePointInfos[0].componentName + ":" + tracePointInfos[0].name;
                                newSerie.description = traceDataPointInfos[0].description;
                            }
                        }
                        serieGroup.addSerie(newSerie);
                    }
                };
                for (var i = 0; i < signals.length; i++) {
                    _loop_1(i);
                }
                signals.forEach(function (signal) {
                    if (signal instanceof xySignal_1.XYSignal || signal instanceof fftSignal_1.FFTSignal) {
                        _this.createCalculatedSerieFromCalculatedSignal(serieGroup, signal);
                    }
                });
                serieGroups.push(serieGroup);
            });
            return serieGroups;
        };
        ExportImportHelper.prototype.createYTSerieFromYTSignal = function (serieGroup, signal) {
            var signalData = new Array();
            for (var i = 0; i < signal.items.length; i++) {
                signalData.push(new point_1.Point(signal.items[i].t, signal.items[i].y));
            }
            var newSignal = new signal_1.Signal(signal.name, signalData);
            var settings = seriesHelper_1.SeriesHelper.createSerieSettings(newSignal, newSignal.name, colorHelper_1.ColorHelper.getColor(), this._seriesProvider.getUniqueId(), seriesType_1.SeriesType.timeSeries);
            var newSerie = this._seriesProvider.createSerie(settings);
            return newSerie;
        };
        ExportImportHelper.prototype.createCalculatedSerieFromCalculatedSignal = function (serieGroup, signal) {
            var calculation = new signalManagerCalculation_1.SignalManagerCalculation(signal.name, this._seriesProvider);
            serieGroup.addSerieContainer(calculation, -1);
            if (signal instanceof xySignal_1.XYSignal) {
                calculation.setCalculatorTypeById(xyCalculator_1.XYCalculator.id);
                calculation.setInputValueById(xyCalculator_1.XYCalculator.inputIdXSignal, signal.xSource.name);
                calculation.setInputValueById(xyCalculator_1.XYCalculator.inputIdYSignal, signal.ySource.name);
                calculation.setOutputSignalName(signal.name);
            }
            if (signal instanceof fftSignal_1.FFTSignal) {
                calculation.setCalculatorTypeById(fftCalculator_1.FftCalculator.id);
                calculation.setInputValueById(fftCalculator_1.FftCalculator.inputIdSignal, signal.source.name);
                calculation.setOutputSignalName(signal.name);
            }
        };
        ExportImportHelper.getFileExtension = function (filename) {
            return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
        };
        return ExportImportHelper;
    }());
    exports.ExportImportHelper = ExportImportHelper;
    var Recording = /** @class */ (function () {
        function Recording(element, seriesProvider) {
            this.startTriggerTime = 0;
            this.signals = new Array();
            this._seriesProvider = seriesProvider;
            //Export a serieGroup
            if (element instanceof exportSerieGroup_1.ExportSerieGroup) {
                this.startTriggerTime = element.startTriggerTime;
                for (var i = 0; i < element.series.length; i++) {
                    if (element.series[i].type == seriesType_1.SeriesType.timeSeries) { //Export YTSeries
                        this.signals.push(this.createYTSignalFromSeries(element.series[i]));
                    }
                    if (element.series[i].type == seriesType_1.SeriesType.xySeries) { //Export XYSeries
                        this.signals.push(this.createXYSignalFromSeries(element.series[i]));
                    }
                    if (element.series[i].type == seriesType_1.SeriesType.fftSeries) { //Export FFTSeries
                        this.signals.push(this.createFFTSignalFromSeries(element.series[i]));
                    }
                }
            }
        }
        Recording.prototype.createYTSignalFromSeries = function (serie) {
            var samples = new Array();
            serie.rawPoints.forEach(function (point) {
                samples.push(new sample_1.Sample(point.x, point.y));
            });
            return new ytSignal_1.YTSignal(serie.name, samples);
        };
        Recording.prototype.createXYSignalFromSeries = function (serie) {
            var points = new Array();
            serie.rawPoints.forEach(function (point) {
                points.push(new point_2.Point(point.x, point.y));
            });
            var calculationDataInfo = serie.calculationDataInfo;
            var xSource = this.createYTSignalFromSeries(this._seriesProvider.get(calculationDataInfo.inputSeriesIds[0]));
            var ySource = this.createYTSignalFromSeries(this._seriesProvider.get(calculationDataInfo.inputSeriesIds[1]));
            return new xySignal_1.XYSignal(serie.name, points, xSource, ySource);
        };
        Recording.prototype.createFFTSignalFromSeries = function (serie) {
            var freqAmps = new Array();
            serie.rawPoints.forEach(function (point) {
                freqAmps.push(new frequencyAmplitude_1.FrequencyAmplitude(point.x, point.y));
            });
            var calculationDataInfo = serie.calculationDataInfo;
            var source = this.createYTSignalFromSeries(this._seriesProvider.get(calculationDataInfo.inputSeriesIds[0]));
            return new fftSignal_1.FFTSignal(serie.name, freqAmps, source);
        };
        return Recording;
    }());
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0SW1wb3J0SGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vZXhwb3J0SW1wb3J0SGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQWdDQTtRQVdJOzs7O1dBSUc7UUFDSCw0QkFBWSxjQUErQjtZQUN2QyxJQUFJLENBQUMsZUFBZSxHQUFHLGNBQWMsQ0FBQztRQUMxQyxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0gsNENBQWUsR0FBZixVQUFnQixRQUFpQztZQUU3QyxJQUFJLFdBQVcsR0FBdUIsU0FBUyxDQUFDO1lBRWhELElBQUk7Z0JBQ0EsSUFBSSxVQUFVLEdBQUcsSUFBSSxLQUFLLEVBQWMsQ0FBQztnQkFDekMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUMsRUFBRSxnREFBZ0Q7b0JBRXZGLElBQUk7d0JBQ0EsSUFBSSxTQUFTLEdBQUcsSUFBSSxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQzt3QkFDakUsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztxQkFDOUI7b0JBQUMsT0FBTSxDQUFDLEVBQUU7d0JBQ1AsT0FBTyxDQUFDLEtBQUssQ0FBQyxjQUFjLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDO3dCQUNwRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUNwQjtpQkFDSjtnQkFDRCxJQUFHLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLEVBQUUscUNBQXFDO29CQUM3RCxJQUFJLGNBQWMsR0FBRyxJQUFJLCtCQUFjLEVBQUUsQ0FBQztvQkFDMUMsSUFBSSxXQUFXLEdBQUcsY0FBYyxDQUFDLE9BQU8sQ0FB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QUMsQ0FBQztZQUM1RCxDQUFDLENBQUMsQ0FBQztZQUVILElBQUksbUJBQW1CLEdBQUcsS0FBSyxDQUFDLG1CQUFtQixDQUFDO1lBQ3BELElBQUksTUFBTSxHQUFhLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxtQkFBb0IsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQWEsQ0FBQyxDQUFDO1lBRW5JLE9BQU8sSUFBSSxxQkFBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZELENBQUM7UUFDTCxnQkFBQztJQUFELENBQUMsQUFoRUQsSUFnRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJU2VyaWVzUHJvdmlkZXIgfSBmcm9tIFwiLi4vbW9kZWxzL2NvbW1vbi9zZXJpZXNQcm92aWRlci9zZXJpZXNQcm92aWRlckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJU2lnbmFsIGFzIElMaWJTaWduYWwgfSBmcm9tIFwiLi90cmFjZURhdGFDb252ZXJzaW9uL2ludGVyZmFjZXMvc2lnbmFsSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElSZWNvcmRpbmcgfSBmcm9tIFwiLi90cmFjZURhdGFDb252ZXJzaW9uL2ludGVyZmFjZXMvcmVjb3JkaW5nSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElTZXJpZUdyb3VwIH0gZnJvbSBcIi4uL21vZGVscy9jb21tb24vaW50ZXJmYWNlcy9zZXJpZUdyb3VwSW50ZXJmYWNlXCI7XHJcblxyXG5pbXBvcnQgeyBDb252ZXJ0SGFuZGxlciB9IGZyb20gXCIuL3RyYWNlRGF0YUNvbnZlcnNpb24vY2xhc3Nlcy9Db252ZXJ0SGFuZGxlclwiO1xyXG5pbXBvcnQgeyBDb252ZXJ0VHlwZXMgfSBmcm9tIFwiLi90cmFjZURhdGFDb252ZXJzaW9uL2VudW1zL0NvbnZlcnRUeXBlc1wiO1xyXG5pbXBvcnQgeyBTaWduYWwgfSBmcm9tIFwiLi4vbW9kZWxzL2NvbW1vbi9zaWduYWwvc2lnbmFsXCI7XHJcbmltcG9ydCB7IENvbG9ySGVscGVyIH0gZnJvbSBcIi4vY29sb3JIZWxwZXJcIjtcclxuaW1wb3J0IHsgRGF0ZVRpbWVIZWxwZXIgfSBmcm9tIFwiLi9kYXRlVGltZUhlbHBlclwiO1xyXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuLi9tb2RlbHMvY29tbW9uL3BvaW50XCI7XHJcbmltcG9ydCB7IERlY29udmVydEhhbmRsZXIgfSBmcm9tIFwiLi90cmFjZURhdGFDb252ZXJzaW9uL2NsYXNzZXMvRGVjb252ZXJ0SGFuZGxlclwiO1xyXG5pbXBvcnQgeyBUcmFjZURhdGFDb252ZXJzaW9uRXJyb3IgfSBmcm9tIFwiLi90cmFjZURhdGFDb252ZXJzaW9uL2V4Y2VwdGlvbnMvdHJhY2VEYXRhQ29udmVyc2lvbkVycm9yXCI7XHJcbmltcG9ydCB7IFRyYWNlRGF0YVBvaW50SW5mbyB9IGZyb20gXCIuLi9tb2RlbHMvZGlhZ25vc3RpY3MvdHJhY2UvdHJhY2VEYXRhUG9pbnRJbmZvXCI7XHJcbmltcG9ydCB7IFlUU2lnbmFsIH0gZnJvbSBcIi4vdHJhY2VEYXRhQ29udmVyc2lvbi9jbGFzc2VzL3l0U2lnbmFsXCI7XHJcbmltcG9ydCB7IFhZU2lnbmFsIH0gZnJvbSBcIi4vdHJhY2VEYXRhQ29udmVyc2lvbi9jbGFzc2VzL3h5U2lnbmFsXCI7XHJcbmltcG9ydCB7IEZGVFNpZ25hbCB9IGZyb20gXCIuL3RyYWNlRGF0YUNvbnZlcnNpb24vY2xhc3Nlcy9mZnRTaWduYWxcIjtcclxuaW1wb3J0IHsgU2FtcGxlIH0gZnJvbSBcIi4uL2NvcmUvdHlwZXMvc2FtcGxlXCI7XHJcbmltcG9ydCB7IFhZU2VyaWVzIH0gZnJvbSBcIi4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvWFlTZXJpZXNcIjtcclxuaW1wb3J0IHsgRkZUU2VyaWVzIH0gZnJvbSBcIi4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvRkZUU2VyaWVzXCI7XHJcbmltcG9ydCB7IFlUU2VyaWVzIH0gZnJvbSBcIi4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvWVRTZXJpZXNcIjtcclxuaW1wb3J0IHsgQmFzZVNlcmllcyB9IGZyb20gXCIuLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2Jhc2VTZXJpZXNcIjtcclxuaW1wb3J0IHsgRnJlcXVlbmN5QW1wbGl0dWRlIH0gZnJvbSBcIi4uL2NvcmUvdHlwZXMvZnJlcXVlbmN5QW1wbGl0dWRlXCI7XHJcbmltcG9ydCB7IFBvaW50IGFzIENvcmVQb2ludCB9IGZyb20gXCIuLi9jb3JlL3R5cGVzL3BvaW50XCI7XHJcbmltcG9ydCB7IFNlcmllc1R5cGUgfSBmcm9tIFwiLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9zZXJpZXNUeXBlXCI7XHJcbmltcG9ydCB7IEV4cG9ydFNlcmllR3JvdXAgfSBmcm9tIFwiLi9leHBvcnRTZXJpZUdyb3VwXCI7XHJcbmltcG9ydCB7IFNlcmllR3JvdXAgfSBmcm9tIFwiLi4vbW9kZWxzL2NvbW1vbi9zaWduYWwvc2VyaWVHcm91cFwiO1xyXG5pbXBvcnQgeyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb24gfSBmcm9tIFwiLi4vbW9kZWxzL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvc2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uXCI7XHJcbmltcG9ydCB7IFNlcmllc0hlbHBlciB9IGZyb20gXCIuL3Nlcmllc0hlbHBlclwiO1xyXG5pbXBvcnQgeyBGZnRDYWxjdWxhdG9yIH0gZnJvbSBcIi4uL21vZGVscy9jb21tb24vY2FsY3VsYXRvclByb3ZpZGVyL2NhbGN1bGF0b3JzL2ZmdENhbGN1bGF0b3JcIjtcclxuaW1wb3J0IHsgWFlDYWxjdWxhdG9yIH0gZnJvbSBcIi4uL21vZGVscy9jb21tb24vY2FsY3VsYXRvclByb3ZpZGVyL2NhbGN1bGF0b3JzL3h5Q2FsY3VsYXRvclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEV4cG9ydEltcG9ydEhlbHBlciB7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogSG9sZHMgdGhlIHNlcmllcyBwcm92aWRlciBpbnN0YW5jZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAdHlwZSB7SVNlcmllc1Byb3ZpZGVyfVxyXG4gICAgICogQG1lbWJlcm9mIEV4cG9ydEltcG9ydEhlbHBlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9zZXJpZXNQcm92aWRlcjogSVNlcmllc1Byb3ZpZGVyO1xyXG4gICAgICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEV4cG9ydEltcG9ydEhlbHBlclxyXG4gICAgICogQHBhcmFtIHtJU2VyaWVzUHJvdmlkZXJ9IHNlcmllc1Byb3ZpZGVyXHJcbiAgICAgKiBAbWVtYmVyb2YgRXhwb3J0SW1wb3J0SGVscGVyXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHNlcmllc1Byb3ZpZGVyOiBJU2VyaWVzUHJvdmlkZXIpe1xyXG4gICAgICAgIHRoaXMuX3Nlcmllc1Byb3ZpZGVyID0gc2VyaWVzUHJvdmlkZXI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogY29udmVydHMgdGhlIGRhdGEgb2YgYSBzZXJpZUdyb3VwIHRvIGEgY3N2IHN0cmluZ1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8RXhwb3J0U2VyaWVHcm91cD59IGVsZW1lbnRzXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIEV4cG9ydEltcG9ydEhlbHBlclxyXG4gICAgICovXHJcbiAgICBleHBvcnRUcmFjZURhdGEoZWxlbWVudHM6IEFycmF5PEV4cG9ydFNlcmllR3JvdXA+KTogc3RyaW5nIHwgdW5kZWZpbmVke1xyXG5cclxuICAgICAgICBsZXQgcmV0dXJuVmFsdWU6IHN0cmluZyB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbGV0IHJlY29yZGluZ3MgPSBuZXcgQXJyYXk8SVJlY29yZGluZz4oKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKyl7IC8vIGNyZWF0ZSBhIHJlY29yZGluZyBmb3IgZWFjaCBFeHBvcnRTZXJpZXNHcm91cFxyXG5cclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlY29yZGluZyA9IG5ldyBSZWNvcmRpbmcoZWxlbWVudHNbaV0sIHRoaXMuX3Nlcmllc1Byb3ZpZGVyKTtcclxuICAgICAgICAgICAgICAgICAgICByZWNvcmRpbmdzLnB1c2gocmVjb3JkaW5nKTtcclxuICAgICAgICAgICAgICAgIH0gY2F0Y2goZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDb252ZXJ0IGZvciBcIiArIGVsZW1lbnRzW2ldLm5hbWUgKyBcIiBub3QgcG9zc2libGUhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYocmVjb3JkaW5ncy5sZW5ndGggPiAwKSB7IC8vY29udmVydCByZWNvcmRpbmdzIGlmIHRoZXJlIGFyZSBhbnlcclxuICAgICAgICAgICAgICAgIGxldCBjb252ZXJ0SGFuZGxlciA9IG5ldyBDb252ZXJ0SGFuZGxlcigpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHBhcnRpYWxGaWxlID0gY29udmVydEhhbmRsZXIuY29udmVydChyZWNvcmRpbmdzLCBDb252ZXJ0VHlwZXMuQ1NWX0FTX0VOKTtcclxuICAgICAgICAgICAgICAgIHJldHVyblZhbHVlID0gcGFydGlhbEZpbGUuZGF0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1jYXRjaChlKXtcclxuICAgICAgICAgICAgaWYoVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yLmlzVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yKGUpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3JUeXBlOiBcIisgZS5uYW1lICtcIiBFcnJvck1lc3NhZ2U6IFwiKyBlLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkNvbnZlcnQgbm90IHBvc3NpYmxlISBTaWduYWxzIGNhbiBub3QgYmUgZXhwb3J0ZWQhXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiVHJhY2UgZGF0YSBjYW4gbm90IGJlIGV4cG9ydGVkIVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJldHVyblZhbHVlO1xyXG4gICAgfVxyXG4gICBcclxuICAgIC8qKlxyXG4gICAgICogQ29udmVydHMgYSBjc3Ygc3RyaW5nIHRvIGEgbGlzdCBvZiBzZXJpZSBncm91cHNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGF0YVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZpbGVuYW1lXHJcbiAgICAgKiBAcGFyYW0geyhBcnJheTxUcmFjZURhdGFQb2ludEluZm8+fHVuZGVmaW5lZCl9IFt0cmFjZURhdGFQb2ludEluZm9zPXVuZGVmaW5lZF0gY2FuIGJlIHVzZWQgZm9yIGFkZGluZyBhbGlhcyBhbmQgZGVzY3JpcHRpb24gb2YgYSBkYXRhcG9pbnRcclxuICAgICAqIEByZXR1cm5zIHtJU2VyaWVHcm91cFtdfVxyXG4gICAgICogQG1lbWJlcm9mIEV4cG9ydEltcG9ydEhlbHBlclxyXG4gICAgICovXHJcbiAgICBpbXBvcnRUcmFjZURhdGEoZGF0YTogc3RyaW5nLCBmaWxlbmFtZTogc3RyaW5nLCB0cmFjZURhdGFQb2ludEluZm9zOiBBcnJheTxUcmFjZURhdGFQb2ludEluZm8+fHVuZGVmaW5lZCA9IHVuZGVmaW5lZCk6IElTZXJpZUdyb3VwW117XHJcbiAgICAgICAgLy8gZ2V0IHJlY29yZGluZ3MgZnJvbSBkYXRhKGNzdilcclxuICAgICAgICBsZXQgcmVjb3JkaW5ncz0gRXhwb3J0SW1wb3J0SGVscGVyLmdldFJlY29yZGluZ3NGcm9tRGF0YShkYXRhLCBmaWxlbmFtZSk7XHJcbiAgICAgICAgaWYocmVjb3JkaW5ncyA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gW25ldyBTZXJpZUdyb3VwKFwiTm8gZGF0YSBmb3VuZCFcIiwgMCldIGFzIElTZXJpZUdyb3VwW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGdldCBzZXJpZSBncm91cHMgZnJvbSB0aGUgcmVjb3JkaW5nIGRhdGFzXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U2VyaWVHcm91cHNGcm9tUmVjb3JkaW5ncyhyZWNvcmRpbmdzLCB0cmFjZURhdGFQb2ludEluZm9zKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgcmVjb3JkaW5nIGRhdGEgZnJvbSB0aGUgZ2l2ZW4gaW5wdXQgZGF0YShjc3YpXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZmlsZW5hbWVcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgRXhwb3J0SW1wb3J0SGVscGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIGdldFJlY29yZGluZ3NGcm9tRGF0YShkYXRhOiBzdHJpbmcsIGZpbGVuYW1lOiBzdHJpbmcpe1xyXG4gICAgICAgIGxldCBkZWNvbnZlcnRlciA9IG5ldyBEZWNvbnZlcnRIYW5kbGVyKCk7XHJcbiAgICAgICAgbGV0IHJlY29yZGluZ3M6IElSZWNvcmRpbmdbXTtcclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIHJlY29yZGluZ3MgPSBkZWNvbnZlcnRlci5EZWNvbnZlcnQoe2RhdGE6ZGF0YSwgZmlsZWVuZGluZzogdGhpcy5nZXRGaWxlRXh0ZW5zaW9uKGZpbGVuYW1lKX0pO1xyXG4gICAgICAgIH1jYXRjaChlKXtcclxuICAgICAgICAgICAgaWYoVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yLmlzVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yKGUpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3JUeXBlOiBcIisgZS5uYW1lICtcIiBFcnJvck1lc3NhZ2U6IFwiKyBlLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkRlY29udmVydCBub3QgcG9zc2libGUhIFNpZ25hbHMgY2FuIG5vdCBiZSBpbXBvcnRlZCFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYWxlcnQoXCJUcmFjZSBkYXRhIGNhbiBub3QgYmUgaW1wb3J0ZWQgZnJvbSBmaWxlIVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlY29yZGluZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgc2VyaWVzIGdyb3VwIGFycmF5IHdpdGggdGhlIGluZm9ybWF0aW9ucyBmcm9tIHRoZSBnaXZlbiByZWNvcmRpbmdzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SVJlY29yZGluZz59IHJlY29yZGluZ3NcclxuICAgICAqIEBwYXJhbSB7KEFycmF5PFRyYWNlRGF0YVBvaW50SW5mbz58dW5kZWZpbmVkKX0gW3RyYWNlRGF0YVBvaW50SW5mb3M9dW5kZWZpbmVkXVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBFeHBvcnRJbXBvcnRIZWxwZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRTZXJpZUdyb3Vwc0Zyb21SZWNvcmRpbmdzKHJlY29yZGluZ3M6IEFycmF5PElSZWNvcmRpbmc+LCB0cmFjZURhdGFQb2ludEluZm9zOiBBcnJheTxUcmFjZURhdGFQb2ludEluZm8+fHVuZGVmaW5lZCA9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgbGV0IHNlcmllR3JvdXBzID0gbmV3IEFycmF5PElTZXJpZUdyb3VwPigpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIEVhY2ggcmVjb3JkaW5nIHdpbGwgYmUgZGlzcGxheWVkIGFzIGEgb3duIHNpZ25hbCBncm91cCB3aXRoIGl0cyBvd24gc3RhcnQgdHJpZ2dlciB0aW1lXHJcbiAgICAgICAgcmVjb3JkaW5ncy5mb3JFYWNoKHJlY29yZGluZyA9PntcclxuICAgICAgICAgICAgbGV0IHRpbWVzdGFtcCA9IHJlY29yZGluZy5zdGFydFRyaWdnZXJUaW1lO1xyXG4gICAgICAgICAgICBsZXQgc2VyaWVHcm91cCA9IG5ldyBTZXJpZUdyb3VwKERhdGVUaW1lSGVscGVyLmdldERhdGVUaW1lKHRpbWVzdGFtcCksIHRpbWVzdGFtcCk7XHJcbiAgICAgICAgICAgIGxldCBzaWduYWxzID0gcmVjb3JkaW5nLnNpZ25hbHM7XHJcblxyXG4gICAgICAgICAgICBmb3IobGV0IGkgPTA7IGkgPCBzaWduYWxzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKHNpZ25hbHNbaV0gaW5zdGFuY2VvZiBZVFNpZ25hbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdTZXJpZTogQmFzZVNlcmllcyA9IHRoaXMuY3JlYXRlWVRTZXJpZUZyb21ZVFNpZ25hbChzZXJpZUdyb3VwLCBzaWduYWxzW2ldIGFzIFlUU2lnbmFsKTtcclxuICAgICAgICAgICAgICAgICAgICBpZih0cmFjZURhdGFQb2ludEluZm9zICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFkZCBkZXNjcmlwdGlvbiBhbmQgYWxpYXMgbmFtZSBmb3IgZGF0YXBvaW50IGlmIGZvdW5kXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0cmFjZVBvaW50SW5mb3MgPSB0cmFjZURhdGFQb2ludEluZm9zLmZpbHRlcihlbGVtZW50ID0+IGVsZW1lbnQuZnVsbG5hbWUgPT0gc2lnbmFsc1tpXS5uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodHJhY2VQb2ludEluZm9zLmxlbmd0aCA9PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1NlcmllLm5hbWUgPSB0cmFjZVBvaW50SW5mb3NbMF0uY29tcG9uZW50TmFtZSArIFwiOlwiICsgdHJhY2VQb2ludEluZm9zWzBdLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdTZXJpZS5kZXNjcmlwdGlvbiA9IHRyYWNlRGF0YVBvaW50SW5mb3NbMF0uZGVzY3JpcHRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgc2VyaWVHcm91cC5hZGRTZXJpZShuZXdTZXJpZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2lnbmFscy5mb3JFYWNoKHNpZ25hbCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihzaWduYWwgaW5zdGFuY2VvZiBYWVNpZ25hbCB8fCBzaWduYWwgaW5zdGFuY2VvZiBGRlRTaWduYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUNhbGN1bGF0ZWRTZXJpZUZyb21DYWxjdWxhdGVkU2lnbmFsKHNlcmllR3JvdXAsIHNpZ25hbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHNlcmllR3JvdXBzLnB1c2goc2VyaWVHcm91cCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHNlcmllR3JvdXBzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3JlYXRlWVRTZXJpZUZyb21ZVFNpZ25hbChzZXJpZUdyb3VwOiBTZXJpZUdyb3VwLCBzaWduYWw6IFlUU2lnbmFsKTogQmFzZVNlcmllcyB7XHJcblxyXG4gICAgICAgIGxldCBzaWduYWxEYXRhID0gbmV3IEFycmF5PGFueT4oKTtcclxuXHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGkgPCBzaWduYWwuaXRlbXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBzaWduYWxEYXRhLnB1c2gobmV3IFBvaW50KHNpZ25hbC5pdGVtc1tpXS50LCBzaWduYWwuaXRlbXNbaV0ueSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbmV3U2lnbmFsID0gbmV3IFNpZ25hbChzaWduYWwubmFtZSwgc2lnbmFsRGF0YSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIGxldCBzZXR0aW5ncyA9IFNlcmllc0hlbHBlci5jcmVhdGVTZXJpZVNldHRpbmdzKG5ld1NpZ25hbCwgbmV3U2lnbmFsLm5hbWUsIENvbG9ySGVscGVyLmdldENvbG9yKCksIHRoaXMuX3Nlcmllc1Byb3ZpZGVyLmdldFVuaXF1ZUlkKCksIFNlcmllc1R5cGUudGltZVNlcmllcyk7XHJcbiAgICAgICAgbGV0IG5ld1NlcmllID0gdGhpcy5fc2VyaWVzUHJvdmlkZXIuY3JlYXRlU2VyaWUoc2V0dGluZ3MpO1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3U2VyaWUhO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgIGNyZWF0ZUNhbGN1bGF0ZWRTZXJpZUZyb21DYWxjdWxhdGVkU2lnbmFsKHNlcmllR3JvdXA6IFNlcmllR3JvdXAsIHNpZ25hbDogSUxpYlNpZ25hbCk6IHZvaWR7XHJcblxyXG4gICAgICAgIGxldCBjYWxjdWxhdGlvbiA9IG5ldyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb24oc2lnbmFsLm5hbWUsIHRoaXMuX3Nlcmllc1Byb3ZpZGVyKTtcclxuICAgICAgICBzZXJpZUdyb3VwLmFkZFNlcmllQ29udGFpbmVyKGNhbGN1bGF0aW9uLCAtMSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoc2lnbmFsIGluc3RhbmNlb2YgIFhZU2lnbmFsKSB7XHJcblxyXG4gICAgICAgICAgICBjYWxjdWxhdGlvbi5zZXRDYWxjdWxhdG9yVHlwZUJ5SWQoWFlDYWxjdWxhdG9yLmlkKTtcclxuICAgICAgICAgICAgY2FsY3VsYXRpb24uc2V0SW5wdXRWYWx1ZUJ5SWQoWFlDYWxjdWxhdG9yLmlucHV0SWRYU2lnbmFsLCBzaWduYWwueFNvdXJjZS5uYW1lKTtcclxuICAgICAgICAgICAgY2FsY3VsYXRpb24uc2V0SW5wdXRWYWx1ZUJ5SWQoWFlDYWxjdWxhdG9yLmlucHV0SWRZU2lnbmFsLCBzaWduYWwueVNvdXJjZS5uYW1lKTtcclxuICAgICAgICAgICAgY2FsY3VsYXRpb24uc2V0T3V0cHV0U2lnbmFsTmFtZShzaWduYWwubmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHNpZ25hbCBpbnN0YW5jZW9mICBGRlRTaWduYWwpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNhbGN1bGF0aW9uLnNldENhbGN1bGF0b3JUeXBlQnlJZChGZnRDYWxjdWxhdG9yLmlkKTtcclxuICAgICAgICAgICAgY2FsY3VsYXRpb24uc2V0SW5wdXRWYWx1ZUJ5SWQoRmZ0Q2FsY3VsYXRvci5pbnB1dElkU2lnbmFsLCBzaWduYWwuc291cmNlLm5hbWUpO1xyXG4gICAgICAgICAgICBjYWxjdWxhdGlvbi5zZXRPdXRwdXRTaWduYWxOYW1lKHNpZ25hbC5uYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0RmlsZUV4dGVuc2lvbihmaWxlbmFtZSk6c3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gZmlsZW5hbWUuc2xpY2UoKGZpbGVuYW1lLmxhc3RJbmRleE9mKFwiLlwiKSAtIDEgPj4+IDApICsgMik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFJlY29yZGluZyBpbXBsZW1lbnRzIElSZWNvcmRpbmd7XHJcbiAgICBzdGFydFRyaWdnZXJUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgc2lnbmFsczogSUxpYlNpZ25hbFtdO1xyXG4gICAgcHJpdmF0ZSBfc2VyaWVzUHJvdmlkZXI6IElTZXJpZXNQcm92aWRlcjtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IoZWxlbWVudDogRXhwb3J0U2VyaWVHcm91cCwgc2VyaWVzUHJvdmlkZXI6IElTZXJpZXNQcm92aWRlcil7XHJcbiAgICAgICAgdGhpcy5zaWduYWxzID0gbmV3IEFycmF5PElMaWJTaWduYWw+KCk7XHJcbiAgICAgICAgdGhpcy5fc2VyaWVzUHJvdmlkZXIgPSBzZXJpZXNQcm92aWRlcjtcclxuXHJcbiAgICAgICAgLy9FeHBvcnQgYSBzZXJpZUdyb3VwXHJcbiAgICAgICAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBFeHBvcnRTZXJpZUdyb3VwKSB7ICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0VHJpZ2dlclRpbWUgPSBlbGVtZW50LnN0YXJ0VHJpZ2dlclRpbWU7ICBcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGkgPCBlbGVtZW50LnNlcmllcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBpZihlbGVtZW50LnNlcmllc1tpXS50eXBlID09IFNlcmllc1R5cGUudGltZVNlcmllcyl7IC8vRXhwb3J0IFlUU2VyaWVzXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaWduYWxzLnB1c2godGhpcy5jcmVhdGVZVFNpZ25hbEZyb21TZXJpZXMoZWxlbWVudC5zZXJpZXNbaV0gYXMgWVRTZXJpZXMpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKGVsZW1lbnQuc2VyaWVzW2ldLnR5cGUgPT0gU2VyaWVzVHlwZS54eVNlcmllcyl7IC8vRXhwb3J0IFhZU2VyaWVzXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaWduYWxzLnB1c2godGhpcy5jcmVhdGVYWVNpZ25hbEZyb21TZXJpZXMoZWxlbWVudC5zZXJpZXNbaV0gYXMgWFlTZXJpZXMpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKGVsZW1lbnQuc2VyaWVzW2ldLnR5cGUgPT0gU2VyaWVzVHlwZS5mZnRTZXJpZXMpeyAvL0V4cG9ydCBGRlRTZXJpZXNcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNpZ25hbHMucHVzaCh0aGlzLmNyZWF0ZUZGVFNpZ25hbEZyb21TZXJpZXMoZWxlbWVudC5zZXJpZXNbaV0gYXMgRkZUU2VyaWVzKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjcmVhdGVZVFNpZ25hbEZyb21TZXJpZXMoc2VyaWU6IFlUU2VyaWVzKTogWVRTaWduYWwge1xyXG5cclxuICAgICAgICBsZXQgc2FtcGxlczogQXJyYXk8U2FtcGxlPiA9IG5ldyBBcnJheSgpO1xyXG5cclxuICAgICAgICBzZXJpZS5yYXdQb2ludHMuZm9yRWFjaChwb2ludCA9PiB7XHJcbiAgICAgICAgICAgIHNhbXBsZXMucHVzaChuZXcgU2FtcGxlKHBvaW50LngsIHBvaW50LnkpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gbmV3IFlUU2lnbmFsKHNlcmllLm5hbWUsIHNhbXBsZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3JlYXRlWFlTaWduYWxGcm9tU2VyaWVzKHNlcmllOiBYWVNlcmllcyk6IFhZU2lnbmFsIHtcclxuXHJcbiAgICAgICAgbGV0IHBvaW50czogQXJyYXk8Q29yZVBvaW50PiA9IG5ldyBBcnJheSgpO1xyXG5cclxuICAgICAgICBzZXJpZS5yYXdQb2ludHMuZm9yRWFjaChwb2ludCA9PiB7XHJcbiAgICAgICAgICAgIHBvaW50cy5wdXNoKG5ldyBDb3JlUG9pbnQocG9pbnQueCwgcG9pbnQueSkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgY2FsY3VsYXRpb25EYXRhSW5mbyA9IHNlcmllLmNhbGN1bGF0aW9uRGF0YUluZm87XHJcbiAgICAgICAgbGV0IHhTb3VyY2U6IFlUU2lnbmFsID0gdGhpcy5jcmVhdGVZVFNpZ25hbEZyb21TZXJpZXModGhpcy5fc2VyaWVzUHJvdmlkZXIuZ2V0KGNhbGN1bGF0aW9uRGF0YUluZm8hLmlucHV0U2VyaWVzSWRzWzBdKSBhcyBZVFNlcmllcyk7XHJcbiAgICAgICAgbGV0IHlTb3VyY2U6IFlUU2lnbmFsID0gdGhpcy5jcmVhdGVZVFNpZ25hbEZyb21TZXJpZXModGhpcy5fc2VyaWVzUHJvdmlkZXIuZ2V0KGNhbGN1bGF0aW9uRGF0YUluZm8hLmlucHV0U2VyaWVzSWRzWzFdKSBhcyBZVFNlcmllcyk7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgWFlTaWduYWwoc2VyaWUubmFtZSwgcG9pbnRzLCB4U291cmNlLCB5U291cmNlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNyZWF0ZUZGVFNpZ25hbEZyb21TZXJpZXMoc2VyaWU6IEZGVFNlcmllcyk6IEZGVFNpZ25hbCB7XHJcblxyXG4gICAgICAgIGxldCBmcmVxQW1wczogQXJyYXk8RnJlcXVlbmN5QW1wbGl0dWRlPiA9IG5ldyBBcnJheSgpO1xyXG5cclxuICAgICAgICBzZXJpZS5yYXdQb2ludHMuZm9yRWFjaChwb2ludCA9PiB7XHJcbiAgICAgICAgICAgIGZyZXFBbXBzLnB1c2gobmV3IEZyZXF1ZW5jeUFtcGxpdHVkZShwb2ludC54LCBwb2ludC55KSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBjYWxjdWxhdGlvbkRhdGFJbmZvID0gc2VyaWUuY2FsY3VsYXRpb25EYXRhSW5mbztcclxuICAgICAgICBsZXQgc291cmNlOiBZVFNpZ25hbCA9IHRoaXMuY3JlYXRlWVRTaWduYWxGcm9tU2VyaWVzKHRoaXMuX3Nlcmllc1Byb3ZpZGVyLmdldChjYWxjdWxhdGlvbkRhdGFJbmZvIS5pbnB1dFNlcmllc0lkc1swXSkgYXMgWVRTZXJpZXMpO1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IEZGVFNpZ25hbChzZXJpZS5uYW1lLCBmcmVxQW1wcywgc291cmNlKTtcclxuICAgIH1cclxufVxyXG4iXX0=