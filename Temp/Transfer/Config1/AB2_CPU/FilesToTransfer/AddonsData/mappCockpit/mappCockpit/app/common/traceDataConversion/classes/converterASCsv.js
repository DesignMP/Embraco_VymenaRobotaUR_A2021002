define(["require", "exports", "./ytSignal", "./xySignal", "./fftSignal", "../exceptions/traceDataConversionError", "../enums/traceDataConversionErrorTypes", "./ASCsvConverter", "./ASCsvSignalObj", "./ASCsvHeader"], function (require, exports, ytSignal_1, xySignal_1, fftSignal_1, traceDataConversionError_1, traceDataConversionErrorTypes_1, ASCsvConverter_1, ASCsvSignalObj_1, ASCsvHeader_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Runs convertion to an AS CSV string.
     * Adapter class.
     *
     * @class ConverterASCsv
     * @implements {IConverter}
     */
    var ConverterASCsv = /** @class */ (function () {
        function ConverterASCsv() {
        }
        /**
         * Starts convertion of an array of IRecording to a partial file containing an AS CSV string of given format as data and 'csv' as fileending.
         * Can throw TraceDataConversionError.
         *
         * @param {Array<IRecording>} data
         * @param {ConvertTypes} format
         * @returns {IPartialFile}
         * @memberof ConverterASCsv
         */
        ConverterASCsv.prototype.Convert = function (data, format) {
            var _this = this;
            var asCsvSignalArr = new Array();
            data.forEach(function (recording) {
                recording.signals.forEach(function (signal) {
                    var asCsvSignal = _this.handleSignal(signal, new Date(recording.startTriggerTime / 1000.0));
                    asCsvSignalArr.push(asCsvSignal);
                });
            });
            var converterInstance = new ASCsvConverter_1.ASCsvConverter();
            var partialFile;
            try {
                partialFile = converterInstance.convert(asCsvSignalArr, format);
            }
            catch (err) {
                throw traceDataConversionError_1.TraceDataConversionError.isTraceDataConversionError(err) ? err : traceDataConversionError_1.TraceDataConversionError.build(traceDataConversionErrorTypes_1.TraceDataConversionErrorTypes.INTERNAL, err);
            }
            return partialFile;
        };
        /**
         * Handles the generation of an AS CSV signal from an YTSignal, XYSignal or FFTSignal.
         *
         * @private
         * @param {ISignal} signal
         * @param {Date} starttrigger
         * @returns {IASCsvSignal}
         * @memberof ConverterASCsv
         */
        ConverterASCsv.prototype.handleSignal = function (signal, starttrigger) {
            var asCsvSignal;
            if (signal instanceof ytSignal_1.YTSignal) {
                asCsvSignal = this.buildASCsvSignalFromYTSignal(signal, starttrigger);
            }
            else if (signal instanceof xySignal_1.XYSignal) {
                asCsvSignal = this.buildASCsvSignalFromXYSignal(signal, starttrigger);
            }
            else if (signal instanceof fftSignal_1.FFTSignal) {
                asCsvSignal = this.buildASCsvSignalFromFFTSignal(signal, starttrigger);
            }
            else {
                throw traceDataConversionError_1.TraceDataConversionError.build(traceDataConversionErrorTypes_1.TraceDataConversionErrorTypes.UNKNOWN_FORMAT);
            }
            return asCsvSignal;
        };
        /**
         * Builds an AS CSV signal from a YTSignal.
         *
         * @private
         * @param {YTSignal} signal
         * @param {Date} starttrigger
         * @returns {IASCsvSignal}
         * @memberof ConverterASCsv
         */
        ConverterASCsv.prototype.buildASCsvSignalFromYTSignal = function (signal, starttrigger) {
            var asCsvSignal = new ASCsvSignalObj_1.ASCsvSignalObj(signal.name, starttrigger, signal.items.length, signal.items, undefined, undefined, undefined);
            return asCsvSignal;
        };
        /**
         * Builds an AS CSV signal from a XYSignal.
         *
         * @private
         * @param {XYSignal} signal
         * @param {Date} starttrigger
         * @returns {IASCsvSignal}
         * @memberof ConverterASCsv
         */
        ConverterASCsv.prototype.buildASCsvSignalFromXYSignal = function (signal, starttrigger) {
            var xSignalName = ASCsvHeader_1.ASCsvHeader.buildTitleAttributeString(signal.xSource.name, starttrigger);
            var ySignalName = ASCsvHeader_1.ASCsvHeader.buildTitleAttributeString(signal.ySource.name, starttrigger);
            var formula = "X={'" + xSignalName + "'};Y={'" + ySignalName + "'}";
            var asCsvSignal = new ASCsvSignalObj_1.ASCsvSignalObj(signal.name, starttrigger, signal.items.length, signal.items, undefined, undefined, formula);
            return asCsvSignal;
        };
        /**
         * Builds an AS CSV signal from a FFTSignal.
         *
         * @private
         * @param {FFTSignal} signal
         * @param {Date} starttrigger
         * @returns {IASCsvSignal}
         * @memberof ConverterASCsv
         */
        ConverterASCsv.prototype.buildASCsvSignalFromFFTSignal = function (signal, starttrigger) {
            var signalName = ASCsvHeader_1.ASCsvHeader.buildTitleAttributeString(signal.source.name, starttrigger);
            var formula = "Y={FFT('" + signalName + "')}";
            var asCsvSignal = new ASCsvSignalObj_1.ASCsvSignalObj(signal.name, starttrigger, signal.items.length, signal.items, undefined, undefined, formula);
            return asCsvSignal;
        };
        return ConverterASCsv;
    }());
    exports.ConverterASCsv = ConverterASCsv;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydGVyQVNDc3YuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW1vbi90cmFjZURhdGFDb252ZXJzaW9uL2NsYXNzZXMvY29udmVydGVyQVNDc3YudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBZ0JBOzs7Ozs7T0FNRztJQUNIO1FBQUE7UUF1SEEsQ0FBQztRQXBIRzs7Ozs7Ozs7V0FRRztRQUNJLGdDQUFPLEdBQWQsVUFBZSxJQUF1QixFQUFFLE1BQW9CO1lBQTVELGlCQXVCQztZQXJCRyxJQUFJLGNBQWMsR0FBd0IsSUFBSSxLQUFLLEVBQWdCLENBQUM7WUFFcEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFBLFNBQVM7Z0JBQ2xCLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUEsTUFBTTtvQkFDNUIsSUFBSSxXQUFXLEdBQUUsS0FBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixHQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBRXhGLGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ3JDLENBQUMsQ0FBQyxDQUFBO1lBQ04sQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLGlCQUFpQixHQUFHLElBQUksK0JBQWMsRUFBRSxDQUFDO1lBRTdDLElBQUksV0FBeUIsQ0FBQztZQUM5QixJQUFJO2dCQUNBLFdBQVcsR0FBRSxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2FBQ2xFO1lBQUMsT0FBTyxHQUFHLEVBQUU7Z0JBRVYsTUFBTSxtREFBd0IsQ0FBQywwQkFBMEIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxtREFBd0IsQ0FBQyxLQUFLLENBQUMsNkRBQTZCLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ3RKO1lBRUQsT0FBTyxXQUFXLENBQUM7UUFDdkIsQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ0sscUNBQVksR0FBcEIsVUFBcUIsTUFBZSxFQUFFLFlBQWtCO1lBRXBELElBQUksV0FBeUIsQ0FBQztZQUM5QixJQUFHLE1BQU0sWUFBWSxtQkFBUSxFQUFFO2dCQUUzQixXQUFXLEdBQUcsSUFBSSxDQUFDLDRCQUE0QixDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUMsQ0FBQzthQUN6RTtpQkFBTSxJQUFHLE1BQU0sWUFBWSxtQkFBUSxFQUFFO2dCQUVsQyxXQUFXLEdBQUcsSUFBSSxDQUFDLDRCQUE0QixDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUMsQ0FBQzthQUN6RTtpQkFBTSxJQUFHLE1BQU0sWUFBWSxxQkFBUyxFQUFFO2dCQUVuQyxXQUFXLEdBQUcsSUFBSSxDQUFDLDZCQUE2QixDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUMsQ0FBQzthQUMxRTtpQkFBTTtnQkFFSCxNQUFNLG1EQUF3QixDQUFDLEtBQUssQ0FBQyw2REFBNkIsQ0FBQyxjQUFjLENBQUMsQ0FBQzthQUN0RjtZQUVELE9BQU8sV0FBVyxDQUFDO1FBQ3ZCLENBQUM7UUFHRDs7Ozs7Ozs7V0FRRztRQUNLLHFEQUE0QixHQUFwQyxVQUFxQyxNQUFnQixFQUFFLFlBQWtCO1lBRXJFLElBQUksV0FBVyxHQUFpQixJQUFJLCtCQUFjLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBRWxKLE9BQU8sV0FBVyxDQUFDO1FBQ3ZCLENBQUM7UUFFRDs7Ozs7Ozs7V0FRRztRQUNLLHFEQUE0QixHQUFwQyxVQUFxQyxNQUFnQixFQUFFLFlBQWtCO1lBRXJFLElBQUksV0FBVyxHQUFXLHlCQUFXLENBQUMseUJBQXlCLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDbkcsSUFBSSxXQUFXLEdBQVcseUJBQVcsQ0FBQyx5QkFBeUIsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztZQUNuRyxJQUFJLE9BQU8sR0FBVyxNQUFNLEdBQUUsV0FBVyxHQUFFLFNBQVMsR0FBRSxXQUFXLEdBQUUsSUFBSSxDQUFDO1lBQ3hFLElBQUksV0FBVyxHQUFpQixJQUFJLCtCQUFjLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBRWhKLE9BQU8sV0FBVyxDQUFDO1FBQ3ZCLENBQUM7UUFFRDs7Ozs7Ozs7V0FRRztRQUNLLHNEQUE2QixHQUFyQyxVQUFzQyxNQUFpQixFQUFFLFlBQWtCO1lBRXZFLElBQUksVUFBVSxHQUFXLHlCQUFXLENBQUMseUJBQXlCLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDakcsSUFBSSxPQUFPLEdBQVcsVUFBVSxHQUFFLFVBQVUsR0FBRSxLQUFLLENBQUM7WUFDcEQsSUFBSSxXQUFXLEdBQWlCLElBQUksK0JBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFFaEosT0FBTyxXQUFXLENBQUM7UUFDdkIsQ0FBQztRQUNMLHFCQUFDO0lBQUQsQ0FBQyxBQXZIRCxJQXVIQztJQUVRLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29udmVydFR5cGVzIH0gZnJvbSBcIi4uL2VudW1zL0NvbnZlcnRUeXBlc1wiO1xyXG5pbXBvcnQgeyBJUmVjb3JkaW5nIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcmVjb3JkaW5nSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElQYXJ0aWFsRmlsZSB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL0lQYXJ0aWFsRmlsZVwiO1xyXG5pbXBvcnQgeyBJQVNDc3ZTaWduYWwgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9JQVNDc3ZTaWduYWxcIjtcclxuaW1wb3J0IHsgWVRTaWduYWwgfSBmcm9tIFwiLi95dFNpZ25hbFwiO1xyXG5pbXBvcnQgeyBYWVNpZ25hbCB9IGZyb20gXCIuL3h5U2lnbmFsXCI7XHJcbmltcG9ydCB7IEZGVFNpZ25hbCB9IGZyb20gXCIuL2ZmdFNpZ25hbFwiO1xyXG5pbXBvcnQgeyBUcmFjZURhdGFDb252ZXJzaW9uRXJyb3IgfSBmcm9tIFwiLi4vZXhjZXB0aW9ucy90cmFjZURhdGFDb252ZXJzaW9uRXJyb3JcIjtcclxuaW1wb3J0IHsgVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yVHlwZXMgfSBmcm9tIFwiLi4vZW51bXMvdHJhY2VEYXRhQ29udmVyc2lvbkVycm9yVHlwZXNcIjtcclxuaW1wb3J0IHsgQVNDc3ZDb252ZXJ0ZXIgfSBmcm9tIFwiLi9BU0NzdkNvbnZlcnRlclwiO1xyXG5pbXBvcnQgeyBBU0NzdlNpZ25hbE9iaiB9IGZyb20gXCIuL0FTQ3N2U2lnbmFsT2JqXCI7XHJcbmltcG9ydCB7IEFTQ3N2SGVhZGVyIH0gZnJvbSBcIi4vQVNDc3ZIZWFkZXJcIjtcclxuaW1wb3J0IHsgSVNpZ25hbCB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3NpZ25hbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJQ29udmVydGVyIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvSUNvbnZlcnRlclwiO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBSdW5zIGNvbnZlcnRpb24gdG8gYW4gQVMgQ1NWIHN0cmluZy5cclxuICogQWRhcHRlciBjbGFzcy5cclxuICpcclxuICogQGNsYXNzIENvbnZlcnRlckFTQ3N2XHJcbiAqIEBpbXBsZW1lbnRzIHtJQ29udmVydGVyfVxyXG4gKi9cclxuY2xhc3MgQ29udmVydGVyQVNDc3YgaW1wbGVtZW50cyBJQ29udmVydGVyIHtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdGFydHMgY29udmVydGlvbiBvZiBhbiBhcnJheSBvZiBJUmVjb3JkaW5nIHRvIGEgcGFydGlhbCBmaWxlIGNvbnRhaW5pbmcgYW4gQVMgQ1NWIHN0cmluZyBvZiBnaXZlbiBmb3JtYXQgYXMgZGF0YSBhbmQgJ2NzdicgYXMgZmlsZWVuZGluZy5cclxuICAgICAqIENhbiB0aHJvdyBUcmFjZURhdGFDb252ZXJzaW9uRXJyb3IuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxJUmVjb3JkaW5nPn0gZGF0YVxyXG4gICAgICogQHBhcmFtIHtDb252ZXJ0VHlwZXN9IGZvcm1hdFxyXG4gICAgICogQHJldHVybnMge0lQYXJ0aWFsRmlsZX1cclxuICAgICAqIEBtZW1iZXJvZiBDb252ZXJ0ZXJBU0NzdlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQ29udmVydChkYXRhOiBBcnJheTxJUmVjb3JkaW5nPiwgZm9ybWF0OiBDb252ZXJ0VHlwZXMpOiBJUGFydGlhbEZpbGUge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBhc0NzdlNpZ25hbEFycjogQXJyYXk8SUFTQ3N2U2lnbmFsPiA9IG5ldyBBcnJheTxJQVNDc3ZTaWduYWw+KCk7XHJcblxyXG4gICAgICAgIGRhdGEuZm9yRWFjaChyZWNvcmRpbmcgPT4ge1xyXG4gICAgICAgICAgICByZWNvcmRpbmcuc2lnbmFscy5mb3JFYWNoKHNpZ25hbCA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYXNDc3ZTaWduYWwgPXRoaXMuaGFuZGxlU2lnbmFsKHNpZ25hbCwgbmV3IERhdGUocmVjb3JkaW5nLnN0YXJ0VHJpZ2dlclRpbWUvMTAwMC4wKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgYXNDc3ZTaWduYWxBcnIucHVzaChhc0NzdlNpZ25hbCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBjb252ZXJ0ZXJJbnN0YW5jZSA9IG5ldyBBU0NzdkNvbnZlcnRlcigpO1xyXG5cclxuICAgICAgICBsZXQgcGFydGlhbEZpbGU6IElQYXJ0aWFsRmlsZTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBwYXJ0aWFsRmlsZT0gY29udmVydGVySW5zdGFuY2UuY29udmVydChhc0NzdlNpZ25hbEFyciwgZm9ybWF0KTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRocm93IFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvci5pc1RyYWNlRGF0YUNvbnZlcnNpb25FcnJvcihlcnIpID8gZXJyIDogVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yLmJ1aWxkKFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvclR5cGVzLklOVEVSTkFMLCBlcnIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHBhcnRpYWxGaWxlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZXMgdGhlIGdlbmVyYXRpb24gb2YgYW4gQVMgQ1NWIHNpZ25hbCBmcm9tIGFuIFlUU2lnbmFsLCBYWVNpZ25hbCBvciBGRlRTaWduYWwuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SVNpZ25hbH0gc2lnbmFsXHJcbiAgICAgKiBAcGFyYW0ge0RhdGV9IHN0YXJ0dHJpZ2dlclxyXG4gICAgICogQHJldHVybnMge0lBU0NzdlNpZ25hbH1cclxuICAgICAqIEBtZW1iZXJvZiBDb252ZXJ0ZXJBU0NzdlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGhhbmRsZVNpZ25hbChzaWduYWw6IElTaWduYWwsIHN0YXJ0dHJpZ2dlcjogRGF0ZSk6IElBU0NzdlNpZ25hbCB7XHJcblxyXG4gICAgICAgIGxldCBhc0NzdlNpZ25hbDogSUFTQ3N2U2lnbmFsO1xyXG4gICAgICAgIGlmKHNpZ25hbCBpbnN0YW5jZW9mIFlUU2lnbmFsKSB7XHJcblxyXG4gICAgICAgICAgICBhc0NzdlNpZ25hbCA9IHRoaXMuYnVpbGRBU0NzdlNpZ25hbEZyb21ZVFNpZ25hbChzaWduYWwsIHN0YXJ0dHJpZ2dlcik7XHJcbiAgICAgICAgfSBlbHNlIGlmKHNpZ25hbCBpbnN0YW5jZW9mIFhZU2lnbmFsKSB7XHJcblxyXG4gICAgICAgICAgICBhc0NzdlNpZ25hbCA9IHRoaXMuYnVpbGRBU0NzdlNpZ25hbEZyb21YWVNpZ25hbChzaWduYWwsIHN0YXJ0dHJpZ2dlcik7XHJcbiAgICAgICAgfSBlbHNlIGlmKHNpZ25hbCBpbnN0YW5jZW9mIEZGVFNpZ25hbCkge1xyXG5cclxuICAgICAgICAgICAgYXNDc3ZTaWduYWwgPSB0aGlzLmJ1aWxkQVNDc3ZTaWduYWxGcm9tRkZUU2lnbmFsKHNpZ25hbCwgc3RhcnR0cmlnZ2VyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgdGhyb3cgVHJhY2VEYXRhQ29udmVyc2lvbkVycm9yLmJ1aWxkKFRyYWNlRGF0YUNvbnZlcnNpb25FcnJvclR5cGVzLlVOS05PV05fRk9STUFUKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBhc0NzdlNpZ25hbDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCdWlsZHMgYW4gQVMgQ1NWIHNpZ25hbCBmcm9tIGEgWVRTaWduYWwuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7WVRTaWduYWx9IHNpZ25hbFxyXG4gICAgICogQHBhcmFtIHtEYXRlfSBzdGFydHRyaWdnZXJcclxuICAgICAqIEByZXR1cm5zIHtJQVNDc3ZTaWduYWx9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29udmVydGVyQVNDc3ZcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBidWlsZEFTQ3N2U2lnbmFsRnJvbVlUU2lnbmFsKHNpZ25hbDogWVRTaWduYWwsIHN0YXJ0dHJpZ2dlcjogRGF0ZSk6IElBU0NzdlNpZ25hbCB7XHJcblxyXG4gICAgICAgIGxldCBhc0NzdlNpZ25hbDogSUFTQ3N2U2lnbmFsID0gbmV3IEFTQ3N2U2lnbmFsT2JqKHNpZ25hbC5uYW1lLCBzdGFydHRyaWdnZXIsIHNpZ25hbC5pdGVtcy5sZW5ndGgsIHNpZ25hbC5pdGVtcywgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCk7XHJcblxyXG4gICAgICAgIHJldHVybiBhc0NzdlNpZ25hbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEJ1aWxkcyBhbiBBUyBDU1Ygc2lnbmFsIGZyb20gYSBYWVNpZ25hbC5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtYWVNpZ25hbH0gc2lnbmFsXHJcbiAgICAgKiBAcGFyYW0ge0RhdGV9IHN0YXJ0dHJpZ2dlclxyXG4gICAgICogQHJldHVybnMge0lBU0NzdlNpZ25hbH1cclxuICAgICAqIEBtZW1iZXJvZiBDb252ZXJ0ZXJBU0NzdlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGJ1aWxkQVNDc3ZTaWduYWxGcm9tWFlTaWduYWwoc2lnbmFsOiBYWVNpZ25hbCwgc3RhcnR0cmlnZ2VyOiBEYXRlKTogSUFTQ3N2U2lnbmFsIHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgeFNpZ25hbE5hbWU6IHN0cmluZyA9IEFTQ3N2SGVhZGVyLmJ1aWxkVGl0bGVBdHRyaWJ1dGVTdHJpbmcoc2lnbmFsLnhTb3VyY2UubmFtZSwgc3RhcnR0cmlnZ2VyKTtcclxuICAgICAgICBsZXQgeVNpZ25hbE5hbWU6IHN0cmluZyA9IEFTQ3N2SGVhZGVyLmJ1aWxkVGl0bGVBdHRyaWJ1dGVTdHJpbmcoc2lnbmFsLnlTb3VyY2UubmFtZSwgc3RhcnR0cmlnZ2VyKTtcclxuICAgICAgICBsZXQgZm9ybXVsYTogc3RyaW5nID0gXCJYPXsnXCIrIHhTaWduYWxOYW1lICtcIid9O1k9eydcIisgeVNpZ25hbE5hbWUgK1wiJ31cIjtcclxuICAgICAgICBsZXQgYXNDc3ZTaWduYWw6IElBU0NzdlNpZ25hbCA9IG5ldyBBU0NzdlNpZ25hbE9iaihzaWduYWwubmFtZSwgc3RhcnR0cmlnZ2VyLCBzaWduYWwuaXRlbXMubGVuZ3RoLCBzaWduYWwuaXRlbXMsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBmb3JtdWxhKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGFzQ3N2U2lnbmFsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQnVpbGRzIGFuIEFTIENTViBzaWduYWwgZnJvbSBhIEZGVFNpZ25hbC5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtGRlRTaWduYWx9IHNpZ25hbFxyXG4gICAgICogQHBhcmFtIHtEYXRlfSBzdGFydHRyaWdnZXJcclxuICAgICAqIEByZXR1cm5zIHtJQVNDc3ZTaWduYWx9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29udmVydGVyQVNDc3ZcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBidWlsZEFTQ3N2U2lnbmFsRnJvbUZGVFNpZ25hbChzaWduYWw6IEZGVFNpZ25hbCwgc3RhcnR0cmlnZ2VyOiBEYXRlKTogSUFTQ3N2U2lnbmFsIHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgc2lnbmFsTmFtZTogc3RyaW5nID0gQVNDc3ZIZWFkZXIuYnVpbGRUaXRsZUF0dHJpYnV0ZVN0cmluZyhzaWduYWwuc291cmNlLm5hbWUsIHN0YXJ0dHJpZ2dlcik7XHJcbiAgICAgICAgbGV0IGZvcm11bGE6IHN0cmluZyA9IFwiWT17RkZUKCdcIisgc2lnbmFsTmFtZSArXCInKX1cIjtcclxuICAgICAgICBsZXQgYXNDc3ZTaWduYWw6IElBU0NzdlNpZ25hbCA9IG5ldyBBU0NzdlNpZ25hbE9iaihzaWduYWwubmFtZSwgc3RhcnR0cmlnZ2VyLCBzaWduYWwuaXRlbXMubGVuZ3RoLCBzaWduYWwuaXRlbXMsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBmb3JtdWxhKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGFzQ3N2U2lnbmFsO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBDb252ZXJ0ZXJBU0NzdiB9OyJdfQ==