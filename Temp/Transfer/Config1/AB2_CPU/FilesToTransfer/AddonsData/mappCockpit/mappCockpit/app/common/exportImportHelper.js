define(["require", "exports", "../models/common/signal/serieGroup", "./traceDataConversion/classes/ConvertHandler", "./traceDataConversion/enums/ConvertTypes", "../models/common/signal/signal", "./colorHelper", "./dateTimeHelper", "../models/common/point", "./traceDataConversion/classes/DeconvertHandler", "../models/chartManagerDataModel/YTSeries", "./traceDataConversion/exceptions/traceDataConversionError", "./traceDataConversion/classes/ytSignal", "./traceDataConversion/classes/xySignal", "./traceDataConversion/classes/fftSignal", "../core/types/sample", "../core/types/frequencyAmplitude", "../core/types/point", "../models/chartManagerDataModel/seriesType", "./exportSerieGroup", "../models/signalManagerDataModel/signalManagerCalculation"], function (require, exports, serieGroup_1, ConvertHandler_1, ConvertTypes_1, signal_1, colorHelper_1, dateTimeHelper_1, point_1, DeconvertHandler_1, YTSeries_1, traceDataConversionError_1, ytSignal_1, xySignal_1, fftSignal_1, sample_1, frequencyAmplitude_1, point_2, seriesType_1, exportSerieGroup_1, signalManagerCalculation_1) {
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
            var newSerie = new YTSeries_1.YTSeries(newSignal, newSignal.name, colorHelper_1.ColorHelper.getColor());
            return newSerie;
        };
        ExportImportHelper.createCalculatedSerieFromCalculatedSignal = function (serieGroup, signal) {
            var calculation = new signalManagerCalculation_1.SignalManagerCalculation(signal.name);
            serieGroup.addSerieContainer(calculation, -1);
            if (signal instanceof xySignal_1.XYSignal) {
                calculation.setCalculatorType('XY');
                calculation.setXValue(signal.xSource.name);
                calculation.setYValue(signal.ySource.name);
                calculation.setOutputSignalName(signal.name);
            }
            if (signal instanceof fftSignal_1.FFTSignal) {
                calculation.setCalculatorType('FFT');
                calculation.setXValue(signal.source.name);
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
            var xSource = Recording.createYTSignalFromSeries(serie.calculationDataInfo.inputSeries[0]);
            var ySource = Recording.createYTSignalFromSeries(serie.calculationDataInfo.inputSeries[1]);
            return new xySignal_1.XYSignal(serie.name, points, xSource, ySource);
        };
        Recording.createFFTSignalFromSeries = function (serie) {
            var freqAmps = new Array();
            serie.rawPoints.forEach(function (point) {
                freqAmps.push(new frequencyAmplitude_1.FrequencyAmplitude(point.x, point.y));
            });
            var source = Recording.createYTSignalFromSeries(serie.calculationDataInfo.inputSeries[0]);
            return new fftSignal_1.FFTSignal(serie.name, freqAmps, source);
        };
        return Recording;
    }());
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0SW1wb3J0SGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vZXhwb3J0SW1wb3J0SGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQTJCQTtRQUFBO1FBNEtBLENBQUM7UUExS0c7Ozs7Ozs7V0FPRztRQUNJLGtDQUFlLEdBQXRCLFVBQXVCLFFBQWlDO1lBRXBELElBQUksV0FBVyxHQUF1QixTQUFTLENBQUM7WUFFaEQsSUFBSTtnQkFDQSxJQUFJLFVBQVUsR0FBRyxJQUFJLEtBQUssRUFBYyxDQUFDO2dCQUN6QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQyxFQUFFLGdEQUFnRDtvQkFFdkYsSUFBSTt3QkFDQSxJQUFJLFNBQVMsR0FBRyxJQUFJLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDM0MsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztxQkFDOUI7b0JBQUMsT0FBTSxDQUFDLEVBQUU7d0JBQ1AsT0FBTyxDQUFDLEtBQUssQ0FBQyxjQUFjLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDO3dCQUNwRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUNwQjtpQkFDSjtnQkFDRCxJQUFHLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLEVBQUUscUNBQXFDO29CQUM3RCxJQUFJLGNBQWMsR0FBRyxJQUFJLCtCQUFjLEVBQUUsQ0FBQztvQkFDMUMsSUFBSSxXQUFXLEdBQUcsY0FBYyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsMkJBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDN0UsV0FBVyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUM7aUJB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LG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQWEsQ0FBQyxDQUFDO1lBQ2pILElBQUksT0FBTyxHQUFhLFNBQVMsQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBYSxDQUFDLENBQUM7WUFFakgsT0FBTyxJQUFJLG1CQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzlELENBQUM7UUFFYyxtQ0FBeUIsR0FBeEMsVUFBeUMsS0FBZ0I7WUFFckQsSUFBSSxRQUFRLEdBQThCLElBQUksS0FBSyxFQUFFLENBQUM7WUFFdEQsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLO2dCQUN6QixRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksdUNBQWtCLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1RCxDQUFDLENBQUMsQ0FBQztZQUVILElBQUksTUFBTSxHQUFhLFNBQVMsQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBYSxDQUFDLENBQUM7WUFFaEgsT0FBTyxJQUFJLHFCQUFTLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdkQsQ0FBQztRQUNMLGdCQUFDO0lBQUQsQ0FBQyxBQTVERCxJQTREQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNlcmllR3JvdXAgfSBmcm9tIFwiLi4vbW9kZWxzL2NvbW1vbi9zaWduYWwvc2VyaWVHcm91cFwiO1xyXG5pbXBvcnQgeyBDb252ZXJ0SGFuZGxlciB9IGZyb20gXCIuL3RyYWNlRGF0YUNvbnZlcnNpb24vY2xhc3Nlcy9Db252ZXJ0SGFuZGxlclwiO1xyXG5pbXBvcnQgeyBJUmVjb3JkaW5nIH0gZnJvbSBcIi4vdHJhY2VEYXRhQ29udmVyc2lvbi9pbnRlcmZhY2VzL3JlY29yZGluZ0ludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDb252ZXJ0VHlwZXMgfSBmcm9tIFwiLi90cmFjZURhdGFDb252ZXJzaW9uL2VudW1zL0NvbnZlcnRUeXBlc1wiO1xyXG5pbXBvcnQgeyBJU2lnbmFsIGFzIElMaWJTaWduYWwgfSBmcm9tIFwiLi90cmFjZURhdGFDb252ZXJzaW9uL2ludGVyZmFjZXMvc2lnbmFsSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNpZ25hbCB9IGZyb20gXCIuLi9tb2RlbHMvY29tbW9uL3NpZ25hbC9zaWduYWxcIjtcclxuaW1wb3J0IHsgQ29sb3JIZWxwZXIgfSBmcm9tIFwiLi9jb2xvckhlbHBlclwiO1xyXG5pbXBvcnQgeyBEYXRlVGltZUhlbHBlciB9IGZyb20gXCIuL2RhdGVUaW1lSGVscGVyXCI7XHJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4uL21vZGVscy9jb21tb24vcG9pbnRcIjtcclxuaW1wb3J0IHsgRGVjb252ZXJ0SGFuZGxlciB9IGZyb20gXCIuL3RyYWNlRGF0YUNvbnZlcnNpb24vY2xhc3Nlcy9EZWNvbnZlcnRIYW5kbGVyXCI7XHJcbmltcG9ydCB7IElTZXJpZUdyb3VwIH0gZnJvbSBcIi4uL21vZGVscy9jb21tb24vaW50ZXJmYWNlcy9zZXJpZUdyb3VwSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFlUU2VyaWVzIH0gZnJvbSBcIi4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvWVRTZXJpZXNcIjtcclxuaW1wb3J0IHsgQmFzZVNlcmllcyB9IGZyb20gXCIuLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2Jhc2VTZXJpZXNcIjtcclxuaW1wb3J0IHsgVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yIH0gZnJvbSBcIi4vdHJhY2VEYXRhQ29udmVyc2lvbi9leGNlcHRpb25zL3RyYWNlRGF0YUNvbnZlcnNpb25FcnJvclwiO1xyXG5pbXBvcnQgeyBUcmFjZURhdGFQb2ludEluZm8gfSBmcm9tIFwiLi4vbW9kZWxzL2RpYWdub3N0aWNzL3RyYWNlL3RyYWNlRGF0YVBvaW50SW5mb1wiO1xyXG5pbXBvcnQgeyBZVFNpZ25hbCB9IGZyb20gXCIuL3RyYWNlRGF0YUNvbnZlcnNpb24vY2xhc3Nlcy95dFNpZ25hbFwiO1xyXG5pbXBvcnQgeyBYWVNpZ25hbCB9IGZyb20gXCIuL3RyYWNlRGF0YUNvbnZlcnNpb24vY2xhc3Nlcy94eVNpZ25hbFwiO1xyXG5pbXBvcnQgeyBGRlRTaWduYWwgfSBmcm9tIFwiLi90cmFjZURhdGFDb252ZXJzaW9uL2NsYXNzZXMvZmZ0U2lnbmFsXCI7XHJcbmltcG9ydCB7IFNhbXBsZSB9IGZyb20gXCIuLi9jb3JlL3R5cGVzL3NhbXBsZVwiO1xyXG5pbXBvcnQgeyBYWVNlcmllcyB9IGZyb20gXCIuLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL1hZU2VyaWVzXCI7XHJcbmltcG9ydCB7IEZGVFNlcmllcyB9IGZyb20gXCIuLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL0ZGVFNlcmllc1wiO1xyXG5pbXBvcnQgeyBGcmVxdWVuY3lBbXBsaXR1ZGUgfSBmcm9tIFwiLi4vY29yZS90eXBlcy9mcmVxdWVuY3lBbXBsaXR1ZGVcIjtcclxuaW1wb3J0IHsgUG9pbnQgYXMgQ29yZVBvaW50IH0gZnJvbSBcIi4uL2NvcmUvdHlwZXMvcG9pbnRcIjtcclxuaW1wb3J0IHsgU2VyaWVzVHlwZSB9IGZyb20gXCIuLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL3Nlcmllc1R5cGVcIjtcclxuaW1wb3J0IHsgRXhwb3J0U2VyaWVHcm91cCB9IGZyb20gXCIuL2V4cG9ydFNlcmllR3JvdXBcIjtcclxuaW1wb3J0IHsgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uIH0gZnJvbSBcIi4uL21vZGVscy9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsL3NpZ25hbE1hbmFnZXJDYWxjdWxhdGlvblwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEV4cG9ydEltcG9ydEhlbHBlciB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjb252ZXJ0cyB0aGUgZGF0YSBvZiBhIHNlcmllR3JvdXAgdG8gYSBjc3Ygc3RyaW5nXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtBcnJheTxFeHBvcnRTZXJpZUdyb3VwPn0gZWxlbWVudHNcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgRXhwb3J0SW1wb3J0SGVscGVyXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBleHBvcnRUcmFjZURhdGEoZWxlbWVudHM6IEFycmF5PEV4cG9ydFNlcmllR3JvdXA+KTogc3RyaW5nIHwgdW5kZWZpbmVke1xyXG5cclxuICAgICAgICBsZXQgcmV0dXJuVmFsdWU6IHN0cmluZyB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbGV0IHJlY29yZGluZ3MgPSBuZXcgQXJyYXk8SVJlY29yZGluZz4oKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKyl7IC8vIGNyZWF0ZSBhIHJlY29yZGluZyBmb3IgZWFjaCBFeHBvcnRTZXJpZXNHcm91cFxyXG5cclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlY29yZGluZyA9IG5ldyBSZWNvcmRpbmcoZWxlbWVudHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlY29yZGluZ3MucHVzaChyZWNvcmRpbmcpO1xyXG4gICAgICAgICAgICAgICAgfSBjYXRjaChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkNvbnZlcnQgZm9yIFwiICsgZWxlbWVudHNbaV0ubmFtZSArIFwiIG5vdCBwb3NzaWJsZSFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihyZWNvcmRpbmdzLmxlbmd0aCA+IDApIHsgLy9jb252ZXJ0IHJlY29yZGluZ3MgaWYgdGhlcmUgYXJlIGFueVxyXG4gICAgICAgICAgICAgICAgbGV0IGNvbnZlcnRIYW5kbGVyID0gbmV3IENvbnZlcnRIYW5kbGVyKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcGFydGlhbEZpbGUgPSBjb252ZXJ0SGFuZGxlci5jb252ZXJ0KHJlY29yZGluZ3MsIENvbnZlcnRUeXBlcy5DU1ZfQVNfRU4pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuVmFsdWUgPSBwYXJ0aWFsRmlsZS5kYXRhO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWNhdGNoKGUpe1xyXG4gICAgICAgICAgICBpZihUcmFjZURhdGFDb252ZXJzaW9uRXJyb3IuaXNUcmFjZURhdGFDb252ZXJzaW9uRXJyb3IoZSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvclR5cGU6IFwiKyBlLm5hbWUgK1wiIEVycm9yTWVzc2FnZTogXCIrIGUubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ29udmVydCBub3QgcG9zc2libGUhIFNpZ25hbHMgY2FuIG5vdCBiZSBleHBvcnRlZCFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYWxlcnQoXCJUcmFjZSBkYXRhIGNhbiBub3QgYmUgZXhwb3J0ZWQhXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmV0dXJuVmFsdWU7XHJcbiAgICB9XHJcbiAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDb252ZXJ0cyBhIGNzdiBzdHJpbmcgdG8gYSBsaXN0IG9mIHNlcmllIGdyb3Vwc1xyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZmlsZW5hbWVcclxuICAgICAqIEBwYXJhbSB7KEFycmF5PFRyYWNlRGF0YVBvaW50SW5mbz58dW5kZWZpbmVkKX0gW3RyYWNlRGF0YVBvaW50SW5mb3M9dW5kZWZpbmVkXSBjYW4gYmUgdXNlZCBmb3IgYWRkaW5nIGFsaWFzIGFuZCBkZXNjcmlwdGlvbiBvZiBhIGRhdGFwb2ludFxyXG4gICAgICogQHJldHVybnMge0lTZXJpZUdyb3VwW119XHJcbiAgICAgKiBAbWVtYmVyb2YgRXhwb3J0SW1wb3J0SGVscGVyXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBpbXBvcnRUcmFjZURhdGEoZGF0YTogc3RyaW5nLCBmaWxlbmFtZTogc3RyaW5nLCB0cmFjZURhdGFQb2ludEluZm9zOiBBcnJheTxUcmFjZURhdGFQb2ludEluZm8+fHVuZGVmaW5lZCA9IHVuZGVmaW5lZCk6IElTZXJpZUdyb3VwW117XHJcbiAgICAgICAgLy8gZ2V0IHJlY29yZGluZ3MgZnJvbSBkYXRhKGNzdilcclxuICAgICAgICBsZXQgcmVjb3JkaW5ncz0gRXhwb3J0SW1wb3J0SGVscGVyLmdldFJlY29yZGluZ3NGcm9tRGF0YShkYXRhLCBmaWxlbmFtZSk7XHJcbiAgICAgICAgaWYocmVjb3JkaW5ncyA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gW25ldyBTZXJpZUdyb3VwKFwiTm8gZGF0YSBmb3VuZCFcIiwgMCldIGFzIElTZXJpZUdyb3VwW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGdldCBzZXJpZSBncm91cHMgZnJvbSB0aGUgcmVjb3JkaW5nIGRhdGFzXHJcbiAgICAgICAgcmV0dXJuIEV4cG9ydEltcG9ydEhlbHBlci5nZXRTZXJpZUdyb3Vwc0Zyb21SZWNvcmRpbmdzKHJlY29yZGluZ3MsIHRyYWNlRGF0YVBvaW50SW5mb3MpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyByZWNvcmRpbmcgZGF0YSBmcm9tIHRoZSBnaXZlbiBpbnB1dCBkYXRhKGNzdilcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRhdGFcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmaWxlbmFtZVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBFeHBvcnRJbXBvcnRIZWxwZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0UmVjb3JkaW5nc0Zyb21EYXRhKGRhdGE6IHN0cmluZywgZmlsZW5hbWU6IHN0cmluZyl7XHJcbiAgICAgICAgbGV0IGRlY29udmVydGVyID0gbmV3IERlY29udmVydEhhbmRsZXIoKTtcclxuICAgICAgICBsZXQgcmVjb3JkaW5nczogSVJlY29yZGluZ1tdO1xyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgICAgcmVjb3JkaW5ncyA9IGRlY29udmVydGVyLkRlY29udmVydCh7ZGF0YTpkYXRhLCBmaWxlZW5kaW5nOiB0aGlzLmdldEZpbGVFeHRlbnNpb24oZmlsZW5hbWUpfSk7XHJcbiAgICAgICAgfWNhdGNoKGUpe1xyXG4gICAgICAgICAgICBpZihUcmFjZURhdGFDb252ZXJzaW9uRXJyb3IuaXNUcmFjZURhdGFDb252ZXJzaW9uRXJyb3IoZSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvclR5cGU6IFwiKyBlLm5hbWUgK1wiIEVycm9yTWVzc2FnZTogXCIrIGUubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRGVjb252ZXJ0IG5vdCBwb3NzaWJsZSEgU2lnbmFscyBjYW4gbm90IGJlIGltcG9ydGVkIVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhbGVydChcIlRyYWNlIGRhdGEgY2FuIG5vdCBiZSBpbXBvcnRlZCBmcm9tIGZpbGUhXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVjb3JkaW5ncztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSBzZXJpZXMgZ3JvdXAgYXJyYXkgd2l0aCB0aGUgaW5mb3JtYXRpb25zIGZyb20gdGhlIGdpdmVuIHJlY29yZGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtBcnJheTxJUmVjb3JkaW5nPn0gcmVjb3JkaW5nc1xyXG4gICAgICogQHBhcmFtIHsoQXJyYXk8VHJhY2VEYXRhUG9pbnRJbmZvPnx1bmRlZmluZWQpfSBbdHJhY2VEYXRhUG9pbnRJbmZvcz11bmRlZmluZWRdXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIEV4cG9ydEltcG9ydEhlbHBlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZXRTZXJpZUdyb3Vwc0Zyb21SZWNvcmRpbmdzKHJlY29yZGluZ3M6IEFycmF5PElSZWNvcmRpbmc+LCB0cmFjZURhdGFQb2ludEluZm9zOiBBcnJheTxUcmFjZURhdGFQb2ludEluZm8+fHVuZGVmaW5lZCA9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgbGV0IHNlcmllR3JvdXBzID0gbmV3IEFycmF5PElTZXJpZUdyb3VwPigpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIEVhY2ggcmVjb3JkaW5nIHdpbGwgYmUgZGlzcGxheWVkIGFzIGEgb3duIHNpZ25hbCBncm91cCB3aXRoIGl0cyBvd24gc3RhcnQgdHJpZ2dlciB0aW1lXHJcbiAgICAgICAgcmVjb3JkaW5ncy5mb3JFYWNoKHJlY29yZGluZyA9PntcclxuICAgICAgICAgICAgbGV0IHRpbWVzdGFtcCA9IHJlY29yZGluZy5zdGFydFRyaWdnZXJUaW1lO1xyXG4gICAgICAgICAgICBsZXQgc2VyaWVHcm91cCA9IG5ldyBTZXJpZUdyb3VwKERhdGVUaW1lSGVscGVyLmdldERhdGVUaW1lKHRpbWVzdGFtcCksIHRpbWVzdGFtcCk7XHJcbiAgICAgICAgICAgIGxldCBzaWduYWxzID0gcmVjb3JkaW5nLnNpZ25hbHM7XHJcblxyXG4gICAgICAgICAgICBmb3IobGV0IGkgPTA7IGkgPCBzaWduYWxzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKHNpZ25hbHNbaV0gaW5zdGFuY2VvZiBZVFNpZ25hbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdTZXJpZTogQmFzZVNlcmllcyA9IEV4cG9ydEltcG9ydEhlbHBlci5jcmVhdGVZVFNlcmllRnJvbVlUU2lnbmFsKHNlcmllR3JvdXAsIHNpZ25hbHNbaV0gYXMgWVRTaWduYWwpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYodHJhY2VEYXRhUG9pbnRJbmZvcyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBZGQgZGVzY3JpcHRpb24gYW5kIGFsaWFzIG5hbWUgZm9yIGRhdGFwb2ludCBpZiBmb3VuZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdHJhY2VQb2ludEluZm9zID0gdHJhY2VEYXRhUG9pbnRJbmZvcy5maWx0ZXIoZWxlbWVudCA9PiBlbGVtZW50LmZ1bGxuYW1lID09IHNpZ25hbHNbaV0ubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRyYWNlUG9pbnRJbmZvcy5sZW5ndGggPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdTZXJpZS5uYW1lID0gdHJhY2VQb2ludEluZm9zWzBdLmNvbXBvbmVudE5hbWUgKyBcIjpcIiArIHRyYWNlUG9pbnRJbmZvc1swXS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3U2VyaWUuZGVzY3JpcHRpb24gPSB0cmFjZURhdGFQb2ludEluZm9zWzBdLmRlc2NyaXB0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHNlcmllR3JvdXAuYWRkU2VyaWUobmV3U2VyaWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNpZ25hbHMuZm9yRWFjaChzaWduYWwgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYoc2lnbmFsIGluc3RhbmNlb2YgWFlTaWduYWwgfHwgc2lnbmFsIGluc3RhbmNlb2YgRkZUU2lnbmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgRXhwb3J0SW1wb3J0SGVscGVyLmNyZWF0ZUNhbGN1bGF0ZWRTZXJpZUZyb21DYWxjdWxhdGVkU2lnbmFsKHNlcmllR3JvdXAsIHNpZ25hbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHNlcmllR3JvdXBzLnB1c2goc2VyaWVHcm91cCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHNlcmllR3JvdXBzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGNyZWF0ZVlUU2VyaWVGcm9tWVRTaWduYWwoc2VyaWVHcm91cDogU2VyaWVHcm91cCwgc2lnbmFsOiBZVFNpZ25hbCk6IEJhc2VTZXJpZXMge1xyXG5cclxuICAgICAgICBsZXQgc2lnbmFsRGF0YSA9IG5ldyBBcnJheTxhbnk+KCk7XHJcblxyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaSA8IHNpZ25hbC5pdGVtcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBzaWduYWxEYXRhLnB1c2gobmV3IFBvaW50KHNpZ25hbC5pdGVtc1tpXS50LCBzaWduYWwuaXRlbXNbaV0ueSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBuZXdTaWduYWwgPSBuZXcgU2lnbmFsKHNpZ25hbC5uYW1lLCBzaWduYWxEYXRhKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgbmV3U2VyaWU6IEJhc2VTZXJpZXMgPSBuZXcgWVRTZXJpZXMobmV3U2lnbmFsLCBuZXdTaWduYWwubmFtZSwgQ29sb3JIZWxwZXIuZ2V0Q29sb3IoKSk7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXdTZXJpZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBjcmVhdGVDYWxjdWxhdGVkU2VyaWVGcm9tQ2FsY3VsYXRlZFNpZ25hbChzZXJpZUdyb3VwOiBTZXJpZUdyb3VwLCBzaWduYWw6IElMaWJTaWduYWwpOiB2b2lke1xyXG5cclxuICAgICAgICBsZXQgY2FsY3VsYXRpb24gPSBuZXcgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uKHNpZ25hbC5uYW1lKTtcclxuICAgICAgICBzZXJpZUdyb3VwLmFkZFNlcmllQ29udGFpbmVyKGNhbGN1bGF0aW9uLCAtMSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoc2lnbmFsIGluc3RhbmNlb2YgIFhZU2lnbmFsKSB7XHJcblxyXG4gICAgICAgICAgICBjYWxjdWxhdGlvbi5zZXRDYWxjdWxhdG9yVHlwZSgnWFknKTtcclxuICAgICAgICAgICAgY2FsY3VsYXRpb24uc2V0WFZhbHVlKHNpZ25hbC54U291cmNlLm5hbWUpO1xyXG4gICAgICAgICAgICBjYWxjdWxhdGlvbi5zZXRZVmFsdWUoc2lnbmFsLnlTb3VyY2UubmFtZSk7XHJcbiAgICAgICAgICAgIGNhbGN1bGF0aW9uLnNldE91dHB1dFNpZ25hbE5hbWUoc2lnbmFsLm5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzaWduYWwgaW5zdGFuY2VvZiAgRkZUU2lnbmFsKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjYWxjdWxhdGlvbi5zZXRDYWxjdWxhdG9yVHlwZSgnRkZUJyk7XHJcbiAgICAgICAgICAgIGNhbGN1bGF0aW9uLnNldFhWYWx1ZShzaWduYWwuc291cmNlLm5hbWUpO1xyXG4gICAgICAgICAgICBjYWxjdWxhdGlvbi5zZXRPdXRwdXRTaWduYWxOYW1lKHNpZ25hbC5uYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0RmlsZUV4dGVuc2lvbihmaWxlbmFtZSk6c3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gZmlsZW5hbWUuc2xpY2UoKGZpbGVuYW1lLmxhc3RJbmRleE9mKFwiLlwiKSAtIDEgPj4+IDApICsgMik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFJlY29yZGluZyBpbXBsZW1lbnRzIElSZWNvcmRpbmd7XHJcbiAgICBzdGFydFRyaWdnZXJUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgc2lnbmFsczogSUxpYlNpZ25hbFtdO1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50OiBFeHBvcnRTZXJpZUdyb3VwKXtcclxuICAgICAgICB0aGlzLnNpZ25hbHMgPSBuZXcgQXJyYXk8SUxpYlNpZ25hbD4oKTtcclxuXHJcbiAgICAgICAgLy9FeHBvcnQgYSBzZXJpZUdyb3VwXHJcbiAgICAgICAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBFeHBvcnRTZXJpZUdyb3VwKSB7ICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0VHJpZ2dlclRpbWUgPSBlbGVtZW50LnN0YXJ0VHJpZ2dlclRpbWU7ICBcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGkgPCBlbGVtZW50LnNlcmllcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBpZihlbGVtZW50LnNlcmllc1tpXS50eXBlID09IFNlcmllc1R5cGUudGltZVNlcmllcyl7IC8vRXhwb3J0IFlUU2VyaWVzXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaWduYWxzLnB1c2goUmVjb3JkaW5nLmNyZWF0ZVlUU2lnbmFsRnJvbVNlcmllcyhlbGVtZW50LnNlcmllc1tpXSBhcyBZVFNlcmllcykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoZWxlbWVudC5zZXJpZXNbaV0udHlwZSA9PSBTZXJpZXNUeXBlLnh5U2VyaWVzKXsgLy9FeHBvcnQgWFlTZXJpZXNcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNpZ25hbHMucHVzaChSZWNvcmRpbmcuY3JlYXRlWFlTaWduYWxGcm9tU2VyaWVzKGVsZW1lbnQuc2VyaWVzW2ldIGFzIFhZU2VyaWVzKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZihlbGVtZW50LnNlcmllc1tpXS50eXBlID09IFNlcmllc1R5cGUuZmZ0U2VyaWVzKXsgLy9FeHBvcnQgRkZUU2VyaWVzXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaWduYWxzLnB1c2goUmVjb3JkaW5nLmNyZWF0ZUZGVFNpZ25hbEZyb21TZXJpZXMoZWxlbWVudC5zZXJpZXNbaV0gYXMgRkZUU2VyaWVzKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgY3JlYXRlWVRTaWduYWxGcm9tU2VyaWVzKHNlcmllOiBZVFNlcmllcyk6IFlUU2lnbmFsIHtcclxuXHJcbiAgICAgICAgbGV0IHNhbXBsZXM6IEFycmF5PFNhbXBsZT4gPSBuZXcgQXJyYXkoKTtcclxuXHJcbiAgICAgICAgc2VyaWUucmF3UG9pbnRzLmZvckVhY2gocG9pbnQgPT4ge1xyXG4gICAgICAgICAgICBzYW1wbGVzLnB1c2gobmV3IFNhbXBsZShwb2ludC54LCBwb2ludC55KSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBZVFNpZ25hbChzZXJpZS5uYW1lLCBzYW1wbGVzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBjcmVhdGVYWVNpZ25hbEZyb21TZXJpZXMoc2VyaWU6IFhZU2VyaWVzKTogWFlTaWduYWwge1xyXG5cclxuICAgICAgICBsZXQgcG9pbnRzOiBBcnJheTxDb3JlUG9pbnQ+ID0gbmV3IEFycmF5KCk7XHJcblxyXG4gICAgICAgIHNlcmllLnJhd1BvaW50cy5mb3JFYWNoKHBvaW50ID0+IHtcclxuICAgICAgICAgICAgcG9pbnRzLnB1c2gobmV3IENvcmVQb2ludChwb2ludC54LCBwb2ludC55KSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCB4U291cmNlOiBZVFNpZ25hbCA9IFJlY29yZGluZy5jcmVhdGVZVFNpZ25hbEZyb21TZXJpZXMoc2VyaWUuY2FsY3VsYXRpb25EYXRhSW5mby5pbnB1dFNlcmllc1swXSBhcyBZVFNlcmllcyk7XHJcbiAgICAgICAgbGV0IHlTb3VyY2U6IFlUU2lnbmFsID0gUmVjb3JkaW5nLmNyZWF0ZVlUU2lnbmFsRnJvbVNlcmllcyhzZXJpZS5jYWxjdWxhdGlvbkRhdGFJbmZvLmlucHV0U2VyaWVzWzFdIGFzIFlUU2VyaWVzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBYWVNpZ25hbChzZXJpZS5uYW1lLCBwb2ludHMsIHhTb3VyY2UsIHlTb3VyY2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGNyZWF0ZUZGVFNpZ25hbEZyb21TZXJpZXMoc2VyaWU6IEZGVFNlcmllcyk6IEZGVFNpZ25hbCB7XHJcblxyXG4gICAgICAgIGxldCBmcmVxQW1wczogQXJyYXk8RnJlcXVlbmN5QW1wbGl0dWRlPiA9IG5ldyBBcnJheSgpO1xyXG5cclxuICAgICAgICBzZXJpZS5yYXdQb2ludHMuZm9yRWFjaChwb2ludCA9PiB7XHJcbiAgICAgICAgICAgIGZyZXFBbXBzLnB1c2gobmV3IEZyZXF1ZW5jeUFtcGxpdHVkZShwb2ludC54LCBwb2ludC55KSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBzb3VyY2U6IFlUU2lnbmFsID0gUmVjb3JkaW5nLmNyZWF0ZVlUU2lnbmFsRnJvbVNlcmllcyhzZXJpZS5jYWxjdWxhdGlvbkRhdGFJbmZvLmlucHV0U2VyaWVzWzBdIGFzIFlUU2VyaWVzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBGRlRTaWduYWwoc2VyaWUubmFtZSwgZnJlcUFtcHMsIHNvdXJjZSk7XHJcbiAgICB9XHJcbn1cclxuIl19