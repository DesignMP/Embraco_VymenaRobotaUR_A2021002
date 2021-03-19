define(["require", "exports", "../models/common/signal/serieGroup", "./traceDataConversion/classes/ConvertHandler", "./traceDataConversion/enums/ConvertTypes", "../models/common/signal/signal", "./colorHelper", "./dateTimeHelper", "../models/common/point", "./traceDataConversion/classes/DeconvertHandler", "../models/chartManagerDataModel/YTSeries", "./traceDataConversion/exceptions/traceDataConversionError", "./traceDataConversion/classes/ytSignal", "./traceDataConversion/classes/xySignal", "./traceDataConversion/classes/fftSignal", "../core/types/sample", "../core/types/frequencyAmplitude", "../core/types/point", "../models/chartManagerDataModel/seriesType", "./exportSerieGroup", "../models/signalManagerDataModel/signalManagerCalculation", "../models/common/seriesProvider/seriesProvider"], function (require, exports, serieGroup_1, ConvertHandler_1, ConvertTypes_1, signal_1, colorHelper_1, dateTimeHelper_1, point_1, DeconvertHandler_1, YTSeries_1, traceDataConversionError_1, ytSignal_1, xySignal_1, fftSignal_1, sample_1, frequencyAmplitude_1, point_2, seriesType_1, exportSerieGroup_1, signalManagerCalculation_1, seriesProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ExportImportHelper = /** @class */ (function () {
        function ExportImportHelper() {
        }
        /**
         * converts the data of a serieGroup to a csv string
         *
         * @static
         * @param {Array<ExportSerieGroup>} elements
         * @returns {string}
         * @memberof ExportImportHelper
         */
        ExportImportHelper.exportTraceData = function (elements) {
            var returnValue = undefined;
            try {
                var recordings = new Array();
                for (var i = 0; i < elements.length; i++) { // create a recording for each ExportSeriesGroup
                    try {
                        var recording = new Recording(elements[i]);
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
         * @static
         * @param {string} data
         * @param {string} filename
         * @param {(Array<TraceDataPointInfo>|undefined)} [traceDataPointInfos=undefined] can be used for adding alias and description of a datapoint
         * @returns {ISerieGroup[]}
         * @memberof ExportImportHelper
         */
        ExportImportHelper.importTraceData = function (data, filename, traceDataPointInfos) {
            if (traceDataPointInfos === void 0) { traceDataPointInfos = undefined; }
            // get recordings from data(csv)
            var recordings = ExportImportHelper.getRecordingsFromData(data, filename);
            if (recordings == undefined) {
                return [new serieGroup_1.SerieGroup("No data found!", 0)];
            }
            // get serie groups from the recording datas
            return ExportImportHelper.getSerieGroupsFromRecordings(recordings, traceDataPointInfos);
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
         * @static
         * @param {Array<IRecording>} recordings
         * @param {(Array<TraceDataPointInfo>|undefined)} [traceDataPointInfos=undefined]
         * @returns
         * @memberof ExportImportHelper
         */
        ExportImportHelper.getSerieGroupsFromRecordings = function (recordings, traceDataPointInfos) {
            if (traceDataPointInfos === void 0) { traceDataPointInfos = undefined; }
            var serieGroups = new Array();
            // Each recording will be displayed as a own signal group with its own start trigger time
            recordings.forEach(function (recording) {
                var timestamp = recording.startTriggerTime;
                var serieGroup = new serieGroup_1.SerieGroup(dateTimeHelper_1.DateTimeHelper.getDateTime(timestamp), timestamp);
                var signals = recording.signals;
                var _loop_1 = function (i) {
                    if (signals[i] instanceof ytSignal_1.YTSignal) {
                        var newSerie = ExportImportHelper.createYTSerieFromYTSignal(serieGroup, signals[i]);
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
                        ExportImportHelper.createCalculatedSerieFromCalculatedSignal(serieGroup, signal);
                    }
                });
                serieGroups.push(serieGroup);
            });
            return serieGroups;
        };
        ExportImportHelper.createYTSerieFromYTSignal = function (serieGroup, signal) {
            var signalData = new Array();
            for (var i = 0; i < signal.items.length; i++) {
                signalData.push(new point_1.Point(signal.items[i].t, signal.items[i].y));
            }
            var newSignal = new signal_1.Signal(signal.name, signalData);
            var newSerie = new YTSeries_1.YTSeries(newSignal, newSignal.name, colorHelper_1.ColorHelper.getColor(), seriesProvider_1.SeriesProvider.getInstance());
            return newSerie;
        };
        ExportImportHelper.createCalculatedSerieFromCalculatedSignal = function (serieGroup, signal) {
            var calculation = new signalManagerCalculation_1.SignalManagerCalculation(signal.name);
            serieGroup.addSerieContainer(calculation, -1);
            if (signal instanceof xySignal_1.XYSignal) {
                calculation.setCalculatorType('XY');
                calculation.setValue(0, signal.xSource.name);
                calculation.setValue(1, signal.ySource.name);
                calculation.setOutputSignalName(signal.name);
            }
            if (signal instanceof fftSignal_1.FFTSignal) {
                calculation.setCalculatorType('FFT');
                calculation.setValue(0, signal.source.name);
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
        function Recording(element) {
            this.startTriggerTime = 0;
            this.signals = new Array();
            //Export a serieGroup
            if (element instanceof exportSerieGroup_1.ExportSerieGroup) {
                this.startTriggerTime = element.startTriggerTime;
                for (var i = 0; i < element.series.length; i++) {
                    if (element.series[i].type == seriesType_1.SeriesType.timeSeries) { //Export YTSeries
                        this.signals.push(Recording.createYTSignalFromSeries(element.series[i]));
                    }
                    if (element.series[i].type == seriesType_1.SeriesType.xySeries) { //Export XYSeries
                        this.signals.push(Recording.createXYSignalFromSeries(element.series[i]));
                    }
                    if (element.series[i].type == seriesType_1.SeriesType.fftSeries) { //Export FFTSeries
                        this.signals.push(Recording.createFFTSignalFromSeries(element.series[i]));
                    }
                }
            }
        }
        Recording.createYTSignalFromSeries = function (serie) {
            var samples = new Array();
            serie.rawPoints.forEach(function (point) {
                samples.push(new sample_1.Sample(point.x, point.y));
            });
            return new ytSignal_1.YTSignal(serie.name, samples);
        };
        Recording.createXYSignalFromSeries = function (serie) {
            var points = new Array();
            serie.rawPoints.forEach(function (point) {
                points.push(new point_2.Point(point.x, point.y));
            });
            var calculationDataInfo = serie.calculationDataInfo;
            var xSource = Recording.createYTSignalFromSeries(seriesProvider_1.SeriesProvider.getInstance().get(calculationDataInfo.inputSeriesIds[0]));
            var ySource = Recording.createYTSignalFromSeries(seriesProvider_1.SeriesProvider.getInstance().get(calculationDataInfo.inputSeriesIds[1]));
            return new xySignal_1.XYSignal(serie.name, points, xSource, ySource);
        };
        Recording.createFFTSignalFromSeries = function (serie) {
            var freqAmps = new Array();
            serie.rawPoints.forEach(function (point) {
                freqAmps.push(new frequencyAmplitude_1.FrequencyAmplitude(point.x, point.y));
            });
            var calculationDataInfo = serie.calculationDataInfo;
            var source = Recording.createYTSignalFromSeries(seriesProvider_1.SeriesProvider.getInstance().get(calculationDataInfo.inputSeriesIds[0]));
            return new fftSignal_1.FFTSignal(serie.name, freqAmps, source);
        };
        return Recording;
    }());
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0SW1wb3J0SGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vZXhwb3J0SW1wb3J0SGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQTRCQTtRQUFBO1FBMktBLENBQUM7UUF6S0c7Ozs7Ozs7V0FPRztRQUNJLGtDQUFlLEdBQXRCLFVBQXVCLFFBQWlDO1lBRXBELElBQUksV0FBVyxHQUF1QixTQUFTLENBQUM7WUFFaEQsSUFBSTtnQkFDQSxJQUFJLFVBQVUsR0FBRyxJQUFJLEtBQUssRUFBYyxDQUFDO2dCQUN6QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQyxFQUFFLGdEQUFnRDtvQkFFdkYsSUFBSTt3QkFDQSxJQUFJLFNBQVMsR0FBRyxJQUFJLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDM0MsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztxQkFDOUI7b0JBQUMsT0FBTSxDQUFDLEVBQUU7d0JBQ1AsT0FBTyxDQUFDLEtBQUssQ0FBQyxjQUFjLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDO3dCQUNwRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUNwQjtpQkFDSjtnQkFDRCxJQUFHLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLEVBQUUscUNBQXFDO29CQUM3RCxJQUFJLGNBQWMsR0FBRyxJQUFJLCtCQUFjLEVBQUUsQ0FBQztvQkFDMUMsSUFBSSxXQUFXLEdBQUcsY0FBYyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsMkJBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDN0UsV0FBVyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUM7aUJB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LEFBOURELElBOERDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2VyaWVHcm91cCB9IGZyb20gXCIuLi9tb2RlbHMvY29tbW9uL3NpZ25hbC9zZXJpZUdyb3VwXCI7XHJcbmltcG9ydCB7IENvbnZlcnRIYW5kbGVyIH0gZnJvbSBcIi4vdHJhY2VEYXRhQ29udmVyc2lvbi9jbGFzc2VzL0NvbnZlcnRIYW5kbGVyXCI7XHJcbmltcG9ydCB7IElSZWNvcmRpbmcgfSBmcm9tIFwiLi90cmFjZURhdGFDb252ZXJzaW9uL2ludGVyZmFjZXMvcmVjb3JkaW5nSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IENvbnZlcnRUeXBlcyB9IGZyb20gXCIuL3RyYWNlRGF0YUNvbnZlcnNpb24vZW51bXMvQ29udmVydFR5cGVzXCI7XHJcbmltcG9ydCB7IElTaWduYWwgYXMgSUxpYlNpZ25hbCB9IGZyb20gXCIuL3RyYWNlRGF0YUNvbnZlcnNpb24vaW50ZXJmYWNlcy9zaWduYWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU2lnbmFsIH0gZnJvbSBcIi4uL21vZGVscy9jb21tb24vc2lnbmFsL3NpZ25hbFwiO1xyXG5pbXBvcnQgeyBDb2xvckhlbHBlciB9IGZyb20gXCIuL2NvbG9ySGVscGVyXCI7XHJcbmltcG9ydCB7IERhdGVUaW1lSGVscGVyIH0gZnJvbSBcIi4vZGF0ZVRpbWVIZWxwZXJcIjtcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi4vbW9kZWxzL2NvbW1vbi9wb2ludFwiO1xyXG5pbXBvcnQgeyBEZWNvbnZlcnRIYW5kbGVyIH0gZnJvbSBcIi4vdHJhY2VEYXRhQ29udmVyc2lvbi9jbGFzc2VzL0RlY29udmVydEhhbmRsZXJcIjtcclxuaW1wb3J0IHsgSVNlcmllR3JvdXAgfSBmcm9tIFwiLi4vbW9kZWxzL2NvbW1vbi9pbnRlcmZhY2VzL3NlcmllR3JvdXBJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgWVRTZXJpZXMgfSBmcm9tIFwiLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9ZVFNlcmllc1wiO1xyXG5pbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvYmFzZVNlcmllc1wiO1xyXG5pbXBvcnQgeyBUcmFjZURhdGFDb252ZXJzaW9uRXJyb3IgfSBmcm9tIFwiLi90cmFjZURhdGFDb252ZXJzaW9uL2V4Y2VwdGlvbnMvdHJhY2VEYXRhQ29udmVyc2lvbkVycm9yXCI7XHJcbmltcG9ydCB7IFRyYWNlRGF0YVBvaW50SW5mbyB9IGZyb20gXCIuLi9tb2RlbHMvZGlhZ25vc3RpY3MvdHJhY2UvdHJhY2VEYXRhUG9pbnRJbmZvXCI7XHJcbmltcG9ydCB7IFlUU2lnbmFsIH0gZnJvbSBcIi4vdHJhY2VEYXRhQ29udmVyc2lvbi9jbGFzc2VzL3l0U2lnbmFsXCI7XHJcbmltcG9ydCB7IFhZU2lnbmFsIH0gZnJvbSBcIi4vdHJhY2VEYXRhQ29udmVyc2lvbi9jbGFzc2VzL3h5U2lnbmFsXCI7XHJcbmltcG9ydCB7IEZGVFNpZ25hbCB9IGZyb20gXCIuL3RyYWNlRGF0YUNvbnZlcnNpb24vY2xhc3Nlcy9mZnRTaWduYWxcIjtcclxuaW1wb3J0IHsgU2FtcGxlIH0gZnJvbSBcIi4uL2NvcmUvdHlwZXMvc2FtcGxlXCI7XHJcbmltcG9ydCB7IFhZU2VyaWVzIH0gZnJvbSBcIi4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvWFlTZXJpZXNcIjtcclxuaW1wb3J0IHsgRkZUU2VyaWVzIH0gZnJvbSBcIi4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvRkZUU2VyaWVzXCI7XHJcbmltcG9ydCB7IEZyZXF1ZW5jeUFtcGxpdHVkZSB9IGZyb20gXCIuLi9jb3JlL3R5cGVzL2ZyZXF1ZW5jeUFtcGxpdHVkZVwiO1xyXG5pbXBvcnQgeyBQb2ludCBhcyBDb3JlUG9pbnQgfSBmcm9tIFwiLi4vY29yZS90eXBlcy9wb2ludFwiO1xyXG5pbXBvcnQgeyBTZXJpZXNUeXBlIH0gZnJvbSBcIi4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvc2VyaWVzVHlwZVwiO1xyXG5pbXBvcnQgeyBFeHBvcnRTZXJpZUdyb3VwIH0gZnJvbSBcIi4vZXhwb3J0U2VyaWVHcm91cFwiO1xyXG5pbXBvcnQgeyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb24gfSBmcm9tIFwiLi4vbW9kZWxzL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvc2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uXCI7XHJcbmltcG9ydCB7IFNlcmllc1Byb3ZpZGVyIH0gZnJvbSBcIi4uL21vZGVscy9jb21tb24vc2VyaWVzUHJvdmlkZXIvc2VyaWVzUHJvdmlkZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBFeHBvcnRJbXBvcnRIZWxwZXIge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogY29udmVydHMgdGhlIGRhdGEgb2YgYSBzZXJpZUdyb3VwIHRvIGEgY3N2IHN0cmluZ1xyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8RXhwb3J0U2VyaWVHcm91cD59IGVsZW1lbnRzXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIEV4cG9ydEltcG9ydEhlbHBlclxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZXhwb3J0VHJhY2VEYXRhKGVsZW1lbnRzOiBBcnJheTxFeHBvcnRTZXJpZUdyb3VwPik6IHN0cmluZyB8IHVuZGVmaW5lZHtcclxuXHJcbiAgICAgICAgbGV0IHJldHVyblZhbHVlOiBzdHJpbmcgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCByZWNvcmRpbmdzID0gbmV3IEFycmF5PElSZWNvcmRpbmc+KCk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspeyAvLyBjcmVhdGUgYSByZWNvcmRpbmcgZm9yIGVhY2ggRXhwb3J0U2VyaWVzR3JvdXBcclxuXHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZWNvcmRpbmcgPSBuZXcgUmVjb3JkaW5nKGVsZW1lbnRzW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICByZWNvcmRpbmdzLnB1c2gocmVjb3JkaW5nKTtcclxuICAgICAgICAgICAgICAgIH0gY2F0Y2goZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDb252ZXJ0IGZvciBcIiArIGVsZW1lbnRzW2ldLm5hbWUgKyBcIiBub3QgcG9zc2libGUhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYocmVjb3JkaW5ncy5sZW5ndGggPiAwKSB7IC8vY29udmVydCByZWNvcmRpbmdzIGlmIHRoZXJlIGFyZSBhbnlcclxuICAgICAgICAgICAgICAgIGxldCBjb252ZXJ0SGFuZGxlciA9IG5ldyBDb252ZXJ0SGFuZGxlcigpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHBhcnRpYWxGaWxlID0gY29udmVydEhhbmRsZXIuY29udmVydChyZWNvcmRpbmdzLCBDb252ZXJ0VHlwZXMuQ1NWX0FTX0VOKTtcclxuICAgICAgICAgICAgICAgIHJldHVyblZhbHVlID0gcGFydGlhbEZpbGUuZGF0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1jYXRjaChlKXtcclxuICAgICAgICAgICAgaWYoVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yLmlzVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yKGUpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3JUeXBlOiBcIisgZS5uYW1lICtcIiBFcnJvck1lc3NhZ2U6IFwiKyBlLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkNvbnZlcnQgbm90IHBvc3NpYmxlISBTaWduYWxzIGNhbiBub3QgYmUgZXhwb3J0ZWQhXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiVHJhY2UgZGF0YSBjYW4gbm90IGJlIGV4cG9ydGVkIVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJldHVyblZhbHVlO1xyXG4gICAgfVxyXG4gICBcclxuICAgIC8qKlxyXG4gICAgICogQ29udmVydHMgYSBjc3Ygc3RyaW5nIHRvIGEgbGlzdCBvZiBzZXJpZSBncm91cHNcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGF0YVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZpbGVuYW1lXHJcbiAgICAgKiBAcGFyYW0geyhBcnJheTxUcmFjZURhdGFQb2ludEluZm8+fHVuZGVmaW5lZCl9IFt0cmFjZURhdGFQb2ludEluZm9zPXVuZGVmaW5lZF0gY2FuIGJlIHVzZWQgZm9yIGFkZGluZyBhbGlhcyBhbmQgZGVzY3JpcHRpb24gb2YgYSBkYXRhcG9pbnRcclxuICAgICAqIEByZXR1cm5zIHtJU2VyaWVHcm91cFtdfVxyXG4gICAgICogQG1lbWJlcm9mIEV4cG9ydEltcG9ydEhlbHBlclxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaW1wb3J0VHJhY2VEYXRhKGRhdGE6IHN0cmluZywgZmlsZW5hbWU6IHN0cmluZywgdHJhY2VEYXRhUG9pbnRJbmZvczogQXJyYXk8VHJhY2VEYXRhUG9pbnRJbmZvPnx1bmRlZmluZWQgPSB1bmRlZmluZWQpOiBJU2VyaWVHcm91cFtde1xyXG4gICAgICAgIC8vIGdldCByZWNvcmRpbmdzIGZyb20gZGF0YShjc3YpXHJcbiAgICAgICAgbGV0IHJlY29yZGluZ3M9IEV4cG9ydEltcG9ydEhlbHBlci5nZXRSZWNvcmRpbmdzRnJvbURhdGEoZGF0YSwgZmlsZW5hbWUpO1xyXG4gICAgICAgIGlmKHJlY29yZGluZ3MgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIFtuZXcgU2VyaWVHcm91cChcIk5vIGRhdGEgZm91bmQhXCIsIDApXSBhcyBJU2VyaWVHcm91cFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBnZXQgc2VyaWUgZ3JvdXBzIGZyb20gdGhlIHJlY29yZGluZyBkYXRhc1xyXG4gICAgICAgIHJldHVybiBFeHBvcnRJbXBvcnRIZWxwZXIuZ2V0U2VyaWVHcm91cHNGcm9tUmVjb3JkaW5ncyhyZWNvcmRpbmdzLCB0cmFjZURhdGFQb2ludEluZm9zKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgcmVjb3JkaW5nIGRhdGEgZnJvbSB0aGUgZ2l2ZW4gaW5wdXQgZGF0YShjc3YpXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZmlsZW5hbWVcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgRXhwb3J0SW1wb3J0SGVscGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIGdldFJlY29yZGluZ3NGcm9tRGF0YShkYXRhOiBzdHJpbmcsIGZpbGVuYW1lOiBzdHJpbmcpe1xyXG4gICAgICAgIGxldCBkZWNvbnZlcnRlciA9IG5ldyBEZWNvbnZlcnRIYW5kbGVyKCk7XHJcbiAgICAgICAgbGV0IHJlY29yZGluZ3M6IElSZWNvcmRpbmdbXTtcclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIHJlY29yZGluZ3MgPSBkZWNvbnZlcnRlci5EZWNvbnZlcnQoe2RhdGE6ZGF0YSwgZmlsZWVuZGluZzogdGhpcy5nZXRGaWxlRXh0ZW5zaW9uKGZpbGVuYW1lKX0pO1xyXG4gICAgICAgIH1jYXRjaChlKXtcclxuICAgICAgICAgICAgaWYoVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yLmlzVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yKGUpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3JUeXBlOiBcIisgZS5uYW1lICtcIiBFcnJvck1lc3NhZ2U6IFwiKyBlLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkRlY29udmVydCBub3QgcG9zc2libGUhIFNpZ25hbHMgY2FuIG5vdCBiZSBpbXBvcnRlZCFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYWxlcnQoXCJUcmFjZSBkYXRhIGNhbiBub3QgYmUgaW1wb3J0ZWQgZnJvbSBmaWxlIVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlY29yZGluZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgc2VyaWVzIGdyb3VwIGFycmF5IHdpdGggdGhlIGluZm9ybWF0aW9ucyBmcm9tIHRoZSBnaXZlbiByZWNvcmRpbmdzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SVJlY29yZGluZz59IHJlY29yZGluZ3NcclxuICAgICAqIEBwYXJhbSB7KEFycmF5PFRyYWNlRGF0YVBvaW50SW5mbz58dW5kZWZpbmVkKX0gW3RyYWNlRGF0YVBvaW50SW5mb3M9dW5kZWZpbmVkXVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBFeHBvcnRJbXBvcnRIZWxwZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0U2VyaWVHcm91cHNGcm9tUmVjb3JkaW5ncyhyZWNvcmRpbmdzOiBBcnJheTxJUmVjb3JkaW5nPiwgdHJhY2VEYXRhUG9pbnRJbmZvczogQXJyYXk8VHJhY2VEYXRhUG9pbnRJbmZvPnx1bmRlZmluZWQgPSB1bmRlZmluZWQpe1xyXG4gICAgICAgIGxldCBzZXJpZUdyb3VwcyA9IG5ldyBBcnJheTxJU2VyaWVHcm91cD4oKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBFYWNoIHJlY29yZGluZyB3aWxsIGJlIGRpc3BsYXllZCBhcyBhIG93biBzaWduYWwgZ3JvdXAgd2l0aCBpdHMgb3duIHN0YXJ0IHRyaWdnZXIgdGltZVxyXG4gICAgICAgIHJlY29yZGluZ3MuZm9yRWFjaChyZWNvcmRpbmcgPT57XHJcbiAgICAgICAgICAgIGxldCB0aW1lc3RhbXAgPSByZWNvcmRpbmcuc3RhcnRUcmlnZ2VyVGltZTtcclxuICAgICAgICAgICAgbGV0IHNlcmllR3JvdXAgPSBuZXcgU2VyaWVHcm91cChEYXRlVGltZUhlbHBlci5nZXREYXRlVGltZSh0aW1lc3RhbXApLCB0aW1lc3RhbXApO1xyXG4gICAgICAgICAgICBsZXQgc2lnbmFscyA9IHJlY29yZGluZy5zaWduYWxzO1xyXG5cclxuICAgICAgICAgICAgZm9yKGxldCBpID0wOyBpIDwgc2lnbmFscy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZihzaWduYWxzW2ldIGluc3RhbmNlb2YgWVRTaWduYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3U2VyaWU6IEJhc2VTZXJpZXMgPSBFeHBvcnRJbXBvcnRIZWxwZXIuY3JlYXRlWVRTZXJpZUZyb21ZVFNpZ25hbChzZXJpZUdyb3VwLCBzaWduYWxzW2ldIGFzIFlUU2lnbmFsKTtcclxuICAgICAgICAgICAgICAgICAgICBpZih0cmFjZURhdGFQb2ludEluZm9zICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFkZCBkZXNjcmlwdGlvbiBhbmQgYWxpYXMgbmFtZSBmb3IgZGF0YXBvaW50IGlmIGZvdW5kXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0cmFjZVBvaW50SW5mb3MgPSB0cmFjZURhdGFQb2ludEluZm9zLmZpbHRlcihlbGVtZW50ID0+IGVsZW1lbnQuZnVsbG5hbWUgPT0gc2lnbmFsc1tpXS5uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodHJhY2VQb2ludEluZm9zLmxlbmd0aCA9PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1NlcmllLm5hbWUgPSB0cmFjZVBvaW50SW5mb3NbMF0uY29tcG9uZW50TmFtZSArIFwiOlwiICsgdHJhY2VQb2ludEluZm9zWzBdLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdTZXJpZS5kZXNjcmlwdGlvbiA9IHRyYWNlRGF0YVBvaW50SW5mb3NbMF0uZGVzY3JpcHRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgc2VyaWVHcm91cC5hZGRTZXJpZShuZXdTZXJpZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2lnbmFscy5mb3JFYWNoKHNpZ25hbCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihzaWduYWwgaW5zdGFuY2VvZiBYWVNpZ25hbCB8fCBzaWduYWwgaW5zdGFuY2VvZiBGRlRTaWduYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBFeHBvcnRJbXBvcnRIZWxwZXIuY3JlYXRlQ2FsY3VsYXRlZFNlcmllRnJvbUNhbGN1bGF0ZWRTaWduYWwoc2VyaWVHcm91cCwgc2lnbmFsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgc2VyaWVHcm91cHMucHVzaChzZXJpZUdyb3VwKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gc2VyaWVHcm91cHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgY3JlYXRlWVRTZXJpZUZyb21ZVFNpZ25hbChzZXJpZUdyb3VwOiBTZXJpZUdyb3VwLCBzaWduYWw6IFlUU2lnbmFsKTogQmFzZVNlcmllcyB7XHJcblxyXG4gICAgICAgIGxldCBzaWduYWxEYXRhID0gbmV3IEFycmF5PGFueT4oKTtcclxuXHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGkgPCBzaWduYWwuaXRlbXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBzaWduYWxEYXRhLnB1c2gobmV3IFBvaW50KHNpZ25hbC5pdGVtc1tpXS50LCBzaWduYWwuaXRlbXNbaV0ueSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbmV3U2lnbmFsID0gbmV3IFNpZ25hbChzaWduYWwubmFtZSwgc2lnbmFsRGF0YSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIGxldCBuZXdTZXJpZTogQmFzZVNlcmllcyA9IG5ldyBZVFNlcmllcyhuZXdTaWduYWwsIG5ld1NpZ25hbC5uYW1lLCBDb2xvckhlbHBlci5nZXRDb2xvcigpLCBTZXJpZXNQcm92aWRlci5nZXRJbnN0YW5jZSgpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ld1NlcmllO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGNyZWF0ZUNhbGN1bGF0ZWRTZXJpZUZyb21DYWxjdWxhdGVkU2lnbmFsKHNlcmllR3JvdXA6IFNlcmllR3JvdXAsIHNpZ25hbDogSUxpYlNpZ25hbCk6IHZvaWR7XHJcblxyXG4gICAgICAgIGxldCBjYWxjdWxhdGlvbiA9IG5ldyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb24oc2lnbmFsLm5hbWUpO1xyXG4gICAgICAgIHNlcmllR3JvdXAuYWRkU2VyaWVDb250YWluZXIoY2FsY3VsYXRpb24sIC0xKTtcclxuICAgICAgICBcclxuICAgICAgICBpZihzaWduYWwgaW5zdGFuY2VvZiAgWFlTaWduYWwpIHtcclxuXHJcbiAgICAgICAgICAgIGNhbGN1bGF0aW9uLnNldENhbGN1bGF0b3JUeXBlKCdYWScpO1xyXG4gICAgICAgICAgICBjYWxjdWxhdGlvbi5zZXRWYWx1ZSgwLCBzaWduYWwueFNvdXJjZS5uYW1lKTtcclxuICAgICAgICAgICAgY2FsY3VsYXRpb24uc2V0VmFsdWUoMSwgc2lnbmFsLnlTb3VyY2UubmFtZSk7XHJcbiAgICAgICAgICAgIGNhbGN1bGF0aW9uLnNldE91dHB1dFNpZ25hbE5hbWUoc2lnbmFsLm5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzaWduYWwgaW5zdGFuY2VvZiAgRkZUU2lnbmFsKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjYWxjdWxhdGlvbi5zZXRDYWxjdWxhdG9yVHlwZSgnRkZUJyk7XHJcbiAgICAgICAgICAgIGNhbGN1bGF0aW9uLnNldFZhbHVlKDAsIHNpZ25hbC5zb3VyY2UubmFtZSk7XHJcbiAgICAgICAgICAgIGNhbGN1bGF0aW9uLnNldE91dHB1dFNpZ25hbE5hbWUoc2lnbmFsLm5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZXRGaWxlRXh0ZW5zaW9uKGZpbGVuYW1lKTpzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBmaWxlbmFtZS5zbGljZSgoZmlsZW5hbWUubGFzdEluZGV4T2YoXCIuXCIpIC0gMSA+Pj4gMCkgKyAyKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgUmVjb3JkaW5nIGltcGxlbWVudHMgSVJlY29yZGluZ3tcclxuICAgIHN0YXJ0VHJpZ2dlclRpbWU6IG51bWJlciA9IDA7XHJcbiAgICBzaWduYWxzOiBJTGliU2lnbmFsW107XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEV4cG9ydFNlcmllR3JvdXApe1xyXG4gICAgICAgIHRoaXMuc2lnbmFscyA9IG5ldyBBcnJheTxJTGliU2lnbmFsPigpO1xyXG5cclxuICAgICAgICAvL0V4cG9ydCBhIHNlcmllR3JvdXBcclxuICAgICAgICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEV4cG9ydFNlcmllR3JvdXApIHsgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRUcmlnZ2VyVGltZSA9IGVsZW1lbnQuc3RhcnRUcmlnZ2VyVGltZTsgIFxyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaSA8IGVsZW1lbnQuc2VyaWVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGlmKGVsZW1lbnQuc2VyaWVzW2ldLnR5cGUgPT0gU2VyaWVzVHlwZS50aW1lU2VyaWVzKXsgLy9FeHBvcnQgWVRTZXJpZXNcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNpZ25hbHMucHVzaChSZWNvcmRpbmcuY3JlYXRlWVRTaWduYWxGcm9tU2VyaWVzKGVsZW1lbnQuc2VyaWVzW2ldIGFzIFlUU2VyaWVzKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZihlbGVtZW50LnNlcmllc1tpXS50eXBlID09IFNlcmllc1R5cGUueHlTZXJpZXMpeyAvL0V4cG9ydCBYWVNlcmllc1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2lnbmFscy5wdXNoKFJlY29yZGluZy5jcmVhdGVYWVNpZ25hbEZyb21TZXJpZXMoZWxlbWVudC5zZXJpZXNbaV0gYXMgWFlTZXJpZXMpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKGVsZW1lbnQuc2VyaWVzW2ldLnR5cGUgPT0gU2VyaWVzVHlwZS5mZnRTZXJpZXMpeyAvL0V4cG9ydCBGRlRTZXJpZXNcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNpZ25hbHMucHVzaChSZWNvcmRpbmcuY3JlYXRlRkZUU2lnbmFsRnJvbVNlcmllcyhlbGVtZW50LnNlcmllc1tpXSBhcyBGRlRTZXJpZXMpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBjcmVhdGVZVFNpZ25hbEZyb21TZXJpZXMoc2VyaWU6IFlUU2VyaWVzKTogWVRTaWduYWwge1xyXG5cclxuICAgICAgICBsZXQgc2FtcGxlczogQXJyYXk8U2FtcGxlPiA9IG5ldyBBcnJheSgpO1xyXG5cclxuICAgICAgICBzZXJpZS5yYXdQb2ludHMuZm9yRWFjaChwb2ludCA9PiB7XHJcbiAgICAgICAgICAgIHNhbXBsZXMucHVzaChuZXcgU2FtcGxlKHBvaW50LngsIHBvaW50LnkpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gbmV3IFlUU2lnbmFsKHNlcmllLm5hbWUsIHNhbXBsZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGNyZWF0ZVhZU2lnbmFsRnJvbVNlcmllcyhzZXJpZTogWFlTZXJpZXMpOiBYWVNpZ25hbCB7XHJcblxyXG4gICAgICAgIGxldCBwb2ludHM6IEFycmF5PENvcmVQb2ludD4gPSBuZXcgQXJyYXkoKTtcclxuXHJcbiAgICAgICAgc2VyaWUucmF3UG9pbnRzLmZvckVhY2gocG9pbnQgPT4ge1xyXG4gICAgICAgICAgICBwb2ludHMucHVzaChuZXcgQ29yZVBvaW50KHBvaW50LngsIHBvaW50LnkpKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IGNhbGN1bGF0aW9uRGF0YUluZm8gPSBzZXJpZS5jYWxjdWxhdGlvbkRhdGFJbmZvO1xyXG4gICAgICAgIGxldCB4U291cmNlOiBZVFNpZ25hbCA9IFJlY29yZGluZy5jcmVhdGVZVFNpZ25hbEZyb21TZXJpZXMoU2VyaWVzUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXQoY2FsY3VsYXRpb25EYXRhSW5mbyEuaW5wdXRTZXJpZXNJZHNbMF0pIGFzIFlUU2VyaWVzKTtcclxuICAgICAgICBsZXQgeVNvdXJjZTogWVRTaWduYWwgPSBSZWNvcmRpbmcuY3JlYXRlWVRTaWduYWxGcm9tU2VyaWVzKFNlcmllc1Byb3ZpZGVyLmdldEluc3RhbmNlKCkuZ2V0KGNhbGN1bGF0aW9uRGF0YUluZm8hLmlucHV0U2VyaWVzSWRzWzFdKSBhcyBZVFNlcmllcyk7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgWFlTaWduYWwoc2VyaWUubmFtZSwgcG9pbnRzLCB4U291cmNlLCB5U291cmNlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBjcmVhdGVGRlRTaWduYWxGcm9tU2VyaWVzKHNlcmllOiBGRlRTZXJpZXMpOiBGRlRTaWduYWwge1xyXG5cclxuICAgICAgICBsZXQgZnJlcUFtcHM6IEFycmF5PEZyZXF1ZW5jeUFtcGxpdHVkZT4gPSBuZXcgQXJyYXkoKTtcclxuXHJcbiAgICAgICAgc2VyaWUucmF3UG9pbnRzLmZvckVhY2gocG9pbnQgPT4ge1xyXG4gICAgICAgICAgICBmcmVxQW1wcy5wdXNoKG5ldyBGcmVxdWVuY3lBbXBsaXR1ZGUocG9pbnQueCwgcG9pbnQueSkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgY2FsY3VsYXRpb25EYXRhSW5mbyA9IHNlcmllLmNhbGN1bGF0aW9uRGF0YUluZm87XHJcbiAgICAgICAgbGV0IHNvdXJjZTogWVRTaWduYWwgPSBSZWNvcmRpbmcuY3JlYXRlWVRTaWduYWxGcm9tU2VyaWVzKFNlcmllc1Byb3ZpZGVyLmdldEluc3RhbmNlKCkuZ2V0KGNhbGN1bGF0aW9uRGF0YUluZm8hLmlucHV0U2VyaWVzSWRzWzBdKSBhcyBZVFNlcmllcyk7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgRkZUU2lnbmFsKHNlcmllLm5hbWUsIGZyZXFBbXBzLCBzb3VyY2UpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==