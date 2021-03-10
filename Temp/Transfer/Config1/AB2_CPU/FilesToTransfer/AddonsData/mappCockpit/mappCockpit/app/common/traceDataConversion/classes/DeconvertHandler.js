define(["require", "exports", "./CsvHandler", "../exceptions/traceDataConversionError", "../enums/traceDataConversionErrorTypes", "../../../core/types/point", "../../../core/types/frequencyAmplitude", "../../../core/types/sample"], function (require, exports, CsvHandler_1, traceDataConversionError_1, traceDataConversionErrorTypes_1, point_1, frequencyAmplitude_1, sample_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Handles deconvertion of a partial file.
     *
     * @class DeconvertHandler
     * @implements {IDeconvertHandler}
     */
    var DeconvertHandler = /** @class */ (function () {
        function DeconvertHandler() {
        }
        /**
         * Handles deconvertion based on fileending of IPartialFile.
         * Can throw TraceDataConversionError.
         *
         * @param {IPartialFile} partialFile
         * @returns {IRecording[]}
         * @memberof DeconvertHandler
         */
        DeconvertHandler.prototype.Deconvert = function (partialFile) {
            var deconverter;
            var result;
            switch (partialFile.fileending.toLowerCase()) {
                case "csv":
                    //assumed csv type is either AsCsv or CoTraceCsv
                    //analyzing csv string to pick deconverter
                    var deconvertCsvHandler = new CsvHandler_1.CsvHandler();
                    try {
                        deconverter = deconvertCsvHandler.pickDeconverter(partialFile.data);
                    }
                    catch (err) {
                        throw traceDataConversionError_1.TraceDataConversionError.isTraceDataConversionError(err) ? err : traceDataConversionError_1.TraceDataConversionError.build(traceDataConversionErrorTypes_1.TraceDataConversionErrorTypes.INTERNAL, err);
                    }
                    break;
                default:
                    throw traceDataConversionError_1.TraceDataConversionError.build(traceDataConversionErrorTypes_1.TraceDataConversionErrorTypes.WRONG_FILETYPE);
            }
            try {
                result = deconverter.Deconvert(partialFile.data);
                this.validateRecording(result);
            }
            catch (err) {
                throw traceDataConversionError_1.TraceDataConversionError.isTraceDataConversionError(err) ? err : traceDataConversionError_1.TraceDataConversionError.build(traceDataConversionErrorTypes_1.TraceDataConversionErrorTypes.INTERNAL, err);
            }
            return result;
        };
        /**
         * Checks if Recording contains only valid data points.
         * If invalid (NaN) data point is found it throws a TraceDataConversionError.
         *
         * @private
         * @param {IRecording[]} recording
         * @memberof DeconvertHandler
         */
        DeconvertHandler.prototype.validateRecording = function (recording) {
            recording.forEach(function (record) {
                record.signals.forEach(function (signal) {
                    signal.items.forEach(function (item) {
                        var val1 = NaN;
                        var val2 = NaN;
                        if (item instanceof sample_1.Sample) {
                            val1 = item.t;
                            val2 = item.y;
                        }
                        if (item instanceof point_1.Point) {
                            val1 = item.x;
                            val2 = item.y;
                        }
                        if (item instanceof frequencyAmplitude_1.FrequencyAmplitude) {
                            val1 = item.f;
                            val2 = item.a;
                        }
                        if (Number.isNaN(val1) || Number.isNaN(val2)) {
                            throw traceDataConversionError_1.TraceDataConversionError.build(traceDataConversionErrorTypes_1.TraceDataConversionErrorTypes.INVALID_RECORDING);
                        }
                    });
                });
            });
        };
        return DeconvertHandler;
    }());
    exports.DeconvertHandler = DeconvertHandler;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVjb252ZXJ0SGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL3RyYWNlRGF0YUNvbnZlcnNpb24vY2xhc3Nlcy9EZWNvbnZlcnRIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQWNBOzs7OztPQUtHO0lBQ0g7UUFBQTtRQStFQSxDQUFDO1FBNUVPOzs7Ozs7O1dBT0c7UUFDSSxvQ0FBUyxHQUFoQixVQUFpQixXQUF5QjtZQUVsQyxJQUFJLFdBQXlCLENBQUM7WUFDOUIsSUFBSSxNQUFvQixDQUFDO1lBQ3pCLFFBQVEsV0FBVyxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsRUFBRTtnQkFDdEMsS0FBSyxLQUFLO29CQUNGLGdEQUFnRDtvQkFDaEQsMENBQTBDO29CQUMxQyxJQUFJLG1CQUFtQixHQUFHLElBQUksdUJBQVUsRUFBRSxDQUFDO29CQUUzQyxJQUFJO3dCQUVKLFdBQVcsR0FBRSxtQkFBbUIsQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUNsRTtvQkFBQyxPQUFNLEdBQUcsRUFBRTt3QkFFTCxNQUFNLG1EQUF3QixDQUFDLDBCQUEwQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLG1EQUF3QixDQUFDLEtBQUssQ0FBQyw2REFBNkIsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7cUJBQzFKO29CQUVELE1BQU07Z0JBQ2Q7b0JBQ1EsTUFBTSxtREFBd0IsQ0FBQyxLQUFLLENBQUMsNkRBQTZCLENBQUMsY0FBYyxDQUFDLENBQUM7YUFDbEc7WUFDRCxJQUFJO2dCQUVJLE1BQU0sR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDakQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3RDO1lBQUMsT0FBTyxHQUFHLEVBQUU7Z0JBRU4sTUFBTSxtREFBd0IsQ0FBQywwQkFBMEIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxtREFBd0IsQ0FBQyxLQUFLLENBQUMsNkRBQTZCLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQzFKO1lBRUQsT0FBTyxNQUFNLENBQUM7UUFDdEIsQ0FBQztRQUdEOzs7Ozs7O1dBT0c7UUFDSyw0Q0FBaUIsR0FBekIsVUFBMEIsU0FBdUI7WUFDekMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQWtCO2dCQUM3QixNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQWU7b0JBQy9CLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBZ0M7d0JBQzlDLElBQUksSUFBSSxHQUFXLEdBQUcsQ0FBQzt3QkFDdkIsSUFBSSxJQUFJLEdBQVcsR0FBRyxDQUFDO3dCQUN2QixJQUFHLElBQUksWUFBWSxlQUFNLEVBQUU7NEJBQ25CLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDOzRCQUNkLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO3lCQUNyQjt3QkFDRCxJQUFHLElBQUksWUFBWSxhQUFLLEVBQUU7NEJBQ2xCLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDOzRCQUNkLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO3lCQUNyQjt3QkFDRCxJQUFHLElBQUksWUFBWSx1Q0FBa0IsRUFBRTs0QkFDL0IsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7NEJBQ2QsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7eUJBQ3JCO3dCQUNELElBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFOzRCQUNyQyxNQUFNLG1EQUF3QixDQUFDLEtBQUssQ0FBQyw2REFBNkIsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO3lCQUM3RjtvQkFDVCxDQUFDLENBQUMsQ0FBQztnQkFDWCxDQUFDLENBQUMsQ0FBQztZQUNYLENBQUMsQ0FBQyxDQUFDO1FBQ1gsQ0FBQztRQUNULHVCQUFDO0lBQUQsQ0FBQyxBQS9FRCxJQStFQztJQUNRLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElQYXJ0aWFsRmlsZSB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL0lQYXJ0aWFsRmlsZVwiO1xyXG5pbXBvcnQgeyBJRGVjb252ZXJ0SGFuZGxlciB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL0lEZWNvbnZlcnRIYW5kbGVyXCI7XHJcbmltcG9ydCB7IENzdkhhbmRsZXIgfSBmcm9tIFwiLi9Dc3ZIYW5kbGVyXCI7XHJcbmltcG9ydCB7IElEZWNvbnZlcnRlciB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL0lEZWNvbnZlcnRlclwiO1xyXG5pbXBvcnQgeyBUcmFjZURhdGFDb252ZXJzaW9uRXJyb3IgfSBmcm9tIFwiLi4vZXhjZXB0aW9ucy90cmFjZURhdGFDb252ZXJzaW9uRXJyb3JcIjtcclxuaW1wb3J0IHsgVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yVHlwZXMgfSBmcm9tIFwiLi4vZW51bXMvdHJhY2VEYXRhQ29udmVyc2lvbkVycm9yVHlwZXNcIjtcclxuaW1wb3J0IHsgSVJlY29yZGluZyB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3JlY29yZGluZ0ludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJU2lnbmFsIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvc2lnbmFsSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvdHlwZXMvcG9pbnRcIjtcclxuaW1wb3J0IHsgRnJlcXVlbmN5QW1wbGl0dWRlIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvdHlwZXMvZnJlcXVlbmN5QW1wbGl0dWRlXCI7XHJcbmltcG9ydCB7IFNhbXBsZSB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3R5cGVzL3NhbXBsZVwiO1xyXG5pbXBvcnQgeyBJVmFsdWVQYWlyIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvaW50ZXJmYWNlcy92YWx1ZVBhaXJJbnRlcmZhY2VcIjtcclxuXHJcblxyXG4vKipcclxuICogSGFuZGxlcyBkZWNvbnZlcnRpb24gb2YgYSBwYXJ0aWFsIGZpbGUuXHJcbiAqXHJcbiAqIEBjbGFzcyBEZWNvbnZlcnRIYW5kbGVyXHJcbiAqIEBpbXBsZW1lbnRzIHtJRGVjb252ZXJ0SGFuZGxlcn1cclxuICovXHJcbmNsYXNzIERlY29udmVydEhhbmRsZXIgaW1wbGVtZW50cyBJRGVjb252ZXJ0SGFuZGxlciB7XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBIYW5kbGVzIGRlY29udmVydGlvbiBiYXNlZCBvbiBmaWxlZW5kaW5nIG9mIElQYXJ0aWFsRmlsZS5cclxuICAgICAgICAgKiBDYW4gdGhyb3cgVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtJUGFydGlhbEZpbGV9IHBhcnRpYWxGaWxlXHJcbiAgICAgICAgICogQHJldHVybnMge0lSZWNvcmRpbmdbXX1cclxuICAgICAgICAgKiBAbWVtYmVyb2YgRGVjb252ZXJ0SGFuZGxlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBEZWNvbnZlcnQocGFydGlhbEZpbGU6IElQYXJ0aWFsRmlsZSk6IElSZWNvcmRpbmdbXSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGRlY29udmVydGVyOiBJRGVjb252ZXJ0ZXI7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0OiBJUmVjb3JkaW5nW107XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHBhcnRpYWxGaWxlLmZpbGVlbmRpbmcudG9Mb3dlckNhc2UoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiY3N2XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9hc3N1bWVkIGNzdiB0eXBlIGlzIGVpdGhlciBBc0NzdiBvciBDb1RyYWNlQ3N2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9hbmFseXppbmcgY3N2IHN0cmluZyB0byBwaWNrIGRlY29udmVydGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRlY29udmVydENzdkhhbmRsZXIgPSBuZXcgQ3N2SGFuZGxlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWNvbnZlcnRlcj0gZGVjb252ZXJ0Q3N2SGFuZGxlci5waWNrRGVjb252ZXJ0ZXIocGFydGlhbEZpbGUuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaChlcnIpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBUcmFjZURhdGFDb252ZXJzaW9uRXJyb3IuaXNUcmFjZURhdGFDb252ZXJzaW9uRXJyb3IoZXJyKSA/IGVyciA6IFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvci5idWlsZChUcmFjZURhdGFDb252ZXJzaW9uRXJyb3JUeXBlcy5JTlRFUk5BTCwgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvci5idWlsZChUcmFjZURhdGFDb252ZXJzaW9uRXJyb3JUeXBlcy5XUk9OR19GSUxFVFlQRSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZGVjb252ZXJ0ZXIuRGVjb252ZXJ0KHBhcnRpYWxGaWxlLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlUmVjb3JkaW5nKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvci5pc1RyYWNlRGF0YUNvbnZlcnNpb25FcnJvcihlcnIpID8gZXJyIDogVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yLmJ1aWxkKFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvclR5cGVzLklOVEVSTkFMLCBlcnIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ2hlY2tzIGlmIFJlY29yZGluZyBjb250YWlucyBvbmx5IHZhbGlkIGRhdGEgcG9pbnRzLlxyXG4gICAgICAgICAqIElmIGludmFsaWQgKE5hTikgZGF0YSBwb2ludCBpcyBmb3VuZCBpdCB0aHJvd3MgYSBUcmFjZURhdGFDb252ZXJzaW9uRXJyb3IuXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHByaXZhdGVcclxuICAgICAgICAgKiBAcGFyYW0ge0lSZWNvcmRpbmdbXX0gcmVjb3JkaW5nXHJcbiAgICAgICAgICogQG1lbWJlcm9mIERlY29udmVydEhhbmRsZXJcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHZhbGlkYXRlUmVjb3JkaW5nKHJlY29yZGluZzogSVJlY29yZGluZ1tdKSB7XHJcbiAgICAgICAgICAgICAgICByZWNvcmRpbmcuZm9yRWFjaCgocmVjb3JkOiBJUmVjb3JkaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlY29yZC5zaWduYWxzLmZvckVhY2goKHNpZ25hbDogSVNpZ25hbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hbC5pdGVtcy5mb3JFYWNoKChpdGVtOiBJVmFsdWVQYWlyPG51bWJlciwgbnVtYmVyPikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbDE6IG51bWJlciA9IE5hTjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YWwyOiBudW1iZXIgPSBOYU47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihpdGVtIGluc3RhbmNlb2YgU2FtcGxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbDEgPSBpdGVtLnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbDIgPSBpdGVtLnk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihpdGVtIGluc3RhbmNlb2YgUG9pbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsMSA9IGl0ZW0ueDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsMiA9IGl0ZW0ueTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGl0ZW0gaW5zdGFuY2VvZiBGcmVxdWVuY3lBbXBsaXR1ZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsMSA9IGl0ZW0uZjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsMiA9IGl0ZW0uYTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKE51bWJlci5pc05hTih2YWwxKSB8fCBOdW1iZXIuaXNOYU4odmFsMikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yLmJ1aWxkKFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvclR5cGVzLklOVkFMSURfUkVDT1JESU5HKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbn1cclxuZXhwb3J0IHsgRGVjb252ZXJ0SGFuZGxlciB9OyJdfQ==