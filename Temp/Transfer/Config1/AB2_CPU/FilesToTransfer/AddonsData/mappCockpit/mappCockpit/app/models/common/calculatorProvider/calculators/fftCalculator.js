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
define(["require", "exports", "./fft/fft_bilstein", "../../point", "../calculationDataPoints", "../calculationDataDisplayInfo", "./calculatorBase", "./calculatorHelper", "../../../chartManagerDataModel/seriesType"], function (require, exports, fft_bilstein_1, point_1, calculationDataPoints_1, calculationDataDisplayInfo_1, calculatorBase_1, calculatorHelper_1, seriesType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FftCalculator = /** @class */ (function (_super) {
        __extends(FftCalculator, _super);
        function FftCalculator() {
            var _this = _super.call(this, "fft bilstein", "FFT", "Calculates the discrete frequency spectrum") || this;
            _this.inputName = "Input signal";
            _this.outputName = "Output signal";
            _this.outputValue = "spectral lines";
            return _this;
        }
        FftCalculator.prototype.getDefaultInputData = function () {
            var defaultInputData = _super.prototype.getDefaultInputData.call(this);
            defaultInputData.push(new calculationDataPoints_1.CalculationDataPoints(this.inputName, "", new Array(), "The signal to be transformed into the frequency domain", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            return defaultInputData;
        };
        FftCalculator.prototype.getDefaultOutputData = function () {
            var defaultOutputData = _super.prototype.getDefaultOutputData.call(this);
            var output = new calculationDataPoints_1.CalculationDataPoints(this.outputName, this.outputValue, new Array());
            output.type = seriesType_1.SeriesType.fftSeries;
            defaultOutputData.push(output);
            return defaultOutputData;
        };
        FftCalculator.prototype.verifyCalculationInputData = function () {
            _super.prototype.verifyCalculationInputData.call(this);
            var calculationInputDataContainer = this.getCalculationInputDataContainer();
            var inputSignal = calculationInputDataContainer[0];
            if (inputSignal == undefined || !calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(inputSignal.data)) {
                this.addErrorByType(calculatorBase_1.ErrorMessageType.MissingOrInvalidInput, [this.inputName]);
            }
        };
        FftCalculator.prototype.executeAlgorithm = function () {
            _super.prototype.executeAlgorithm.call(this);
            var calculationInputDataContainer = this.getCalculationInputDataContainer();
            var result = new Array();
            var inputSignal = calculationInputDataContainer[0];
            if (calculatorHelper_1.CalculatorHelper.calculationInputDataIsSignal(inputSignal.data)) {
                result = this.clcFft(inputSignal.data);
            }
            this.addCalculationOutputData({
                data: result,
                value: this.outputValue,
                name: this.outputName
            });
        };
        /**
         * Calculates output data
         *
         * @private
         * @param {Array<IPoint>} inputSignal
         * @returns {Array<IPoint>}
         * @memberof FftCalculator
         */
        FftCalculator.prototype.clcFft = function (inputSignal) {
            // prepare input data for fft transformation
            var real = new Array();
            var imag = new Array();
            for (var i = 0; i < inputSignal.length; i++) {
                real.push(inputSignal[i].y);
                imag.push(0.0); // the imaginary part of the recorded signal is 0.0
            }
            // calculate fft
            fft_bilstein_1.transform(real, imag); // attention: these parameters are both in- and outputs!
            var points = this.getAmplitudeSpectrum(inputSignal, real, imag);
            return points;
        };
        /**
         * Calculates the amplitude spectrum and ignores the phase information
         *
         * @private
         * @param {IPoint[]} inputSignal original time based signal
         * @param {number[]} real real part of the singal in the freqeuncy domain
         * @param {number[]} imag imaginary part of the singal in the freqeuncy domain
         * @returns
         * @memberof FftCalculator
         */
        FftCalculator.prototype.getAmplitudeSpectrum = function (inputSignal, real, imag) {
            var points = new Array(); // prepare return data
            // estimate sample time
            var sampleTime = calculatorHelper_1.CalculatorHelper.estimateSampleTime(inputSignal); // [seconds]
            var numberSamples = inputSignal.length;
            // calculate frequency of spectral lines and combine to new signal      
            var deltaFrequency = 1.0 / (sampleTime * numberSamples); // distance between the spectral lines in [Hz]
            var nrSpectralLines = Math.floor(numberSamples / 2.0 + 1); // the frequency spectrum is mirrored; half of it can be ignored
            for (var i = 0; i < nrSpectralLines; i++) {
                var isZeroFrequency = i == 0; // the frequency is zero, if i is 0;
                var amplitude = this.getSpectralAmplitude(real[i], imag[i], numberSamples, isZeroFrequency);
                var newPoint = new point_1.Point(deltaFrequency * i, amplitude);
                points.push(newPoint);
            }
            return points;
        };
        /**
         * Calculate the amplitude of a single spectral line
         *
         * @private
         * @param {number} real real part of the singal in the freqeuncy domain
         * @param {number} imag imaginary part of the singal in the freqeuncy domain
         * @param {number} numberSamples number of samples of the origianl signal in the time domain
         * @param {number} isZeroFrequency must be set to TRUE if the spectral line with frequency 0.0 is to be calculated
         * @returns {number}
         * @memberof FftCalculator
         */
        FftCalculator.prototype.getSpectralAmplitude = function (real, imag, numberSamples, isZeroFrequency) {
            var amplitude = Math.sqrt(real * real + imag * imag) / numberSamples; // calculate the vector length of the complex number and scale it:  /numberSamples"
            if (!isZeroFrequency) { // everything except the dc part (frequency == 0) must be rescaled
                amplitude = amplitude * 2.0; // *2.0 because the spectral line is mirrored and only one is taken into account
            }
            return amplitude;
        };
        return FftCalculator;
    }(calculatorBase_1.CalculatorBase));
    exports.FftCalculator = FftCalculator;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmZ0Q2FsY3VsYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRvcnMvZmZ0Q2FsY3VsYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBVUE7UUFBbUMsaUNBQWM7UUFNN0M7WUFBQSxZQUNJLGtCQUFNLGNBQWMsRUFBRSxLQUFLLEVBQUUsNENBQTRDLENBQUMsU0FDN0U7WUFOTyxlQUFTLEdBQVUsY0FBYyxDQUFDO1lBQ2xDLGdCQUFVLEdBQUcsZUFBZSxDQUFDO1lBQzdCLGlCQUFXLEdBQUcsZ0JBQWdCLENBQUM7O1FBSXZDLENBQUM7UUFFTSwyQ0FBbUIsR0FBMUI7WUFDSSxJQUFJLGdCQUFnQixHQUFHLGlCQUFNLG1CQUFtQixXQUFFLENBQUM7WUFFbkQsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksNkNBQXFCLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFLEVBQUUsSUFBSSxLQUFLLEVBQVUsRUFBRSx3REFBd0QsRUFBRSxJQUFJLHVEQUEwQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFak0sT0FBTyxnQkFBZ0IsQ0FBQztRQUM1QixDQUFDO1FBRU0sNENBQW9CLEdBQTNCO1lBQ0ksSUFBSSxpQkFBaUIsR0FBRyxpQkFBTSxvQkFBb0IsV0FBRSxDQUFDO1lBRXJELElBQUksTUFBTSxHQUFHLElBQUksNkNBQXFCLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksS0FBSyxFQUFVLENBQUMsQ0FBQztZQUMvRixNQUFNLENBQUMsSUFBSSxHQUFHLHVCQUFVLENBQUMsU0FBUyxDQUFDO1lBQ25DLGlCQUFpQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUUvQixPQUFPLGlCQUFpQixD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QUFFLEVBQUU7Z0JBQ3RDLElBQUksZUFBZSxHQUFHLENBQUMsSUFBRSxDQUFDLENBQUMsQ0FBQyxvQ0FBb0M7Z0JBQ2hFLElBQUksU0FBUyxHQUFXLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLGFBQWEsRUFBRSxlQUFlLENBQUMsQ0FBQztnQkFDcEcsSUFBSSxRQUFRLEdBQUcsSUFBSSxhQUFLLENBQUMsY0FBYyxHQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztnQkFDdEQsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUN6QjtZQUNELE9BQU8sTUFBTSxDQUFDO1FBQ2xCLENBQUM7UUFJRDs7Ozs7Ozs7OztXQVVHO1FBQ0ssNENBQW9CLEdBQTVCLFVBQTZCLElBQVksRUFBRSxJQUFZLEVBQUUsYUFBcUIsRUFBRSxlQUF5QjtZQUNyRyxJQUFJLFNBQVMsR0FBWSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLGFBQWEsQ0FBQyxDQUFDLG1GQUFtRjtZQUVsSyxJQUFHLENBQUMsZUFBZSxFQUFDLEVBQUUsa0VBQWtFO2dCQUNwRixTQUFTLEdBQUcsU0FBUyxHQUFDLEdBQUcsQ0FBQyxDQUFDLGdGQUFnRjthQUM5RztZQUVELE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFDTCxvQkFBQztJQUFELENBQUMsQUF6SUQsQ0FBbUMsK0JBQWMsR0F5SWhEO0lBeklZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdHJhbnNmb3JtIH0gZnJvbSBcIi4vZmZ0L2ZmdF9iaWxzdGVpblwiO1xyXG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9wb2ludEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuLi8uLi9wb2ludFwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFQb2ludHMgfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhUG9pbnRzXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0b3JCYXNlLCBFcnJvck1lc3NhZ2VUeXBlIH0gZnJvbSBcIi4vY2FsY3VsYXRvckJhc2VcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRvckhlbHBlciB9IGZyb20gXCIuL2NhbGN1bGF0b3JIZWxwZXJcIjtcclxuaW1wb3J0IHsgVENhbGN1bGF0aW9uRGF0YSB9IGZyb20gXCIuLi9jYWxjdWxhdGlvbkRhdGFcIjtcclxuaW1wb3J0IHsgU2VyaWVzVHlwZSB9IGZyb20gXCIuLi8uLi8uLi9jaGFydE1hbmFnZXJEYXRhTW9kZWwvc2VyaWVzVHlwZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEZmdENhbGN1bGF0b3IgZXh0ZW5kcyBDYWxjdWxhdG9yQmFzZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBpbnB1dE5hbWU6c3RyaW5nID0gXCJJbnB1dCBzaWduYWxcIjtcclxuICAgIHByaXZhdGUgb3V0cHV0TmFtZSA9IFwiT3V0cHV0IHNpZ25hbFwiO1xyXG4gICAgcHJpdmF0ZSBvdXRwdXRWYWx1ZSA9IFwic3BlY3RyYWwgbGluZXNcIjtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoXCJmZnQgYmlsc3RlaW5cIiwgXCJGRlRcIiwgXCJDYWxjdWxhdGVzIHRoZSBkaXNjcmV0ZSBmcmVxdWVuY3kgc3BlY3RydW1cIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldERlZmF1bHRJbnB1dERhdGEoKTogQXJyYXk8VENhbGN1bGF0aW9uRGF0YT4ge1xyXG4gICAgICAgIGxldCBkZWZhdWx0SW5wdXREYXRhID0gc3VwZXIuZ2V0RGVmYXVsdElucHV0RGF0YSgpO1xyXG5cclxuICAgICAgICBkZWZhdWx0SW5wdXREYXRhLnB1c2gobmV3IENhbGN1bGF0aW9uRGF0YVBvaW50cyh0aGlzLmlucHV0TmFtZSwgXCJcIiwgbmV3IEFycmF5PElQb2ludD4oKSwgXCJUaGUgc2lnbmFsIHRvIGJlIHRyYW5zZm9ybWVkIGludG8gdGhlIGZyZXF1ZW5jeSBkb21haW5cIiwgbmV3IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvKGZhbHNlLCB0cnVlKSkpO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmYXVsdElucHV0RGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0RGVmYXVsdE91dHB1dERhdGEoKTogQXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPiB7XHJcbiAgICAgICAgbGV0IGRlZmF1bHRPdXRwdXREYXRhID0gc3VwZXIuZ2V0RGVmYXVsdE91dHB1dERhdGEoKTtcclxuXHJcbiAgICAgICAgbGV0IG91dHB1dCA9IG5ldyBDYWxjdWxhdGlvbkRhdGFQb2ludHModGhpcy5vdXRwdXROYW1lLCB0aGlzLm91dHB1dFZhbHVlLCBuZXcgQXJyYXk8SVBvaW50PigpKTtcclxuICAgICAgICBvdXRwdXQudHlwZSA9IFNlcmllc1R5cGUuZmZ0U2VyaWVzO1xyXG4gICAgICAgIGRlZmF1bHRPdXRwdXREYXRhLnB1c2gob3V0cHV0KTsgXHJcblxyXG4gICAgICAgIHJldHVybiBkZWZhdWx0T3V0cHV0RGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgdmVyaWZ5Q2FsY3VsYXRpb25JbnB1dERhdGEoKSB7XHJcbiAgICAgICAgc3VwZXIudmVyaWZ5Q2FsY3VsYXRpb25JbnB1dERhdGEoKTtcclxuXHJcbiAgICAgICAgbGV0IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyID0gdGhpcy5nZXRDYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lcigpO1xyXG5cclxuICAgICAgICBsZXQgaW5wdXRTaWduYWwgPSBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lclswXTtcclxuICAgICAgICBcclxuICAgICAgICBpZihpbnB1dFNpZ25hbCA9PSB1bmRlZmluZWQgfHwgIUNhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc1NpZ25hbChpbnB1dFNpZ25hbC5kYXRhKSkge1xyXG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yQnlUeXBlKEVycm9yTWVzc2FnZVR5cGUuTWlzc2luZ09ySW52YWxpZElucHV0LCBbdGhpcy5pbnB1dE5hbWVdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGV4ZWN1dGVBbGdvcml0aG0oKSB7XHJcbiAgICAgICAgc3VwZXIuZXhlY3V0ZUFsZ29yaXRobSgpO1xyXG5cclxuICAgICAgICBsZXQgY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXIgPSB0aGlzLmdldENhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyKCk7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBBcnJheTxJUG9pbnQ+KCk7XHJcblxyXG4gICAgICAgIGxldCBpbnB1dFNpZ25hbCA9IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyWzBdO1xyXG5cclxuICAgICAgICBpZihDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNTaWduYWwoaW5wdXRTaWduYWwuZGF0YSkpIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5jbGNGZnQoaW5wdXRTaWduYWwuZGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmFkZENhbGN1bGF0aW9uT3V0cHV0RGF0YSh7XHJcbiAgICAgICAgICAgIGRhdGE6IHJlc3VsdCxcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMub3V0cHV0VmFsdWUsXHJcbiAgICAgICAgICAgIG5hbWU6IHRoaXMub3V0cHV0TmFtZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsY3VsYXRlcyBvdXRwdXQgZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElQb2ludD59IGlucHV0U2lnbmFsXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8SVBvaW50Pn1cclxuICAgICAqIEBtZW1iZXJvZiBGZnRDYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2xjRmZ0KGlucHV0U2lnbmFsOiBBcnJheTxJUG9pbnQ+KTogQXJyYXk8SVBvaW50PntcclxuICAgICAgICBcclxuICAgICAgICAvLyBwcmVwYXJlIGlucHV0IGRhdGEgZm9yIGZmdCB0cmFuc2Zvcm1hdGlvblxyXG4gICAgICAgIGxldCByZWFsID0gbmV3IEFycmF5PG51bWJlcj4oKTtcclxuICAgICAgICBsZXQgaW1hZyA9IG5ldyBBcnJheTxudW1iZXI+KCk7XHJcbiAgICAgICAgZm9yKGxldCBpID0wOyBpIDwgaW5wdXRTaWduYWwubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICByZWFsLnB1c2goaW5wdXRTaWduYWxbaV0ueSk7XHJcbiAgICAgICAgICAgIGltYWcucHVzaCgwLjApOyAvLyB0aGUgaW1hZ2luYXJ5IHBhcnQgb2YgdGhlIHJlY29yZGVkIHNpZ25hbCBpcyAwLjBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGNhbGN1bGF0ZSBmZnRcclxuICAgICAgICB0cmFuc2Zvcm0ocmVhbCwgaW1hZyk7IC8vIGF0dGVudGlvbjogdGhlc2UgcGFyYW1ldGVycyBhcmUgYm90aCBpbi0gYW5kIG91dHB1dHMhXHJcblxyXG4gICAgICAgIGxldCBwb2ludHMgPSB0aGlzLmdldEFtcGxpdHVkZVNwZWN0cnVtKGlucHV0U2lnbmFsLCByZWFsLCBpbWFnKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHBvaW50cztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0ZXMgdGhlIGFtcGxpdHVkZSBzcGVjdHJ1bSBhbmQgaWdub3JlcyB0aGUgcGhhc2UgaW5mb3JtYXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtJUG9pbnRbXX0gaW5wdXRTaWduYWwgb3JpZ2luYWwgdGltZSBiYXNlZCBzaWduYWxcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyW119IHJlYWwgcmVhbCBwYXJ0IG9mIHRoZSBzaW5nYWwgaW4gdGhlIGZyZXFldW5jeSBkb21haW5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyW119IGltYWcgaW1hZ2luYXJ5IHBhcnQgb2YgdGhlIHNpbmdhbCBpbiB0aGUgZnJlcWV1bmN5IGRvbWFpblxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBGZnRDYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0QW1wbGl0dWRlU3BlY3RydW0oaW5wdXRTaWduYWw6IElQb2ludFtdLCByZWFsOiBudW1iZXJbXSwgaW1hZzogbnVtYmVyW10pIDogSVBvaW50W117XHJcbiAgICAgICAgbGV0IHBvaW50cyA9IG5ldyBBcnJheTxJUG9pbnQ+KCk7IC8vIHByZXBhcmUgcmV0dXJuIGRhdGFcclxuICAgICAgICBcclxuICAgICAgICAvLyBlc3RpbWF0ZSBzYW1wbGUgdGltZVxyXG4gICAgICAgIGxldCBzYW1wbGVUaW1lOiBudW1iZXIgPSBDYWxjdWxhdG9ySGVscGVyLmVzdGltYXRlU2FtcGxlVGltZShpbnB1dFNpZ25hbCk7IC8vIFtzZWNvbmRzXVxyXG4gICAgICAgIGxldCBudW1iZXJTYW1wbGVzID0gaW5wdXRTaWduYWwubGVuZ3RoO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGNhbGN1bGF0ZSBmcmVxdWVuY3kgb2Ygc3BlY3RyYWwgbGluZXMgYW5kIGNvbWJpbmUgdG8gbmV3IHNpZ25hbCAgICAgIFxyXG4gICAgICAgIGxldCBkZWx0YUZyZXF1ZW5jeSA9IDEuMCAvIChzYW1wbGVUaW1lICogbnVtYmVyU2FtcGxlcyk7IC8vIGRpc3RhbmNlIGJldHdlZW4gdGhlIHNwZWN0cmFsIGxpbmVzIGluIFtIel1cclxuICAgICAgICBsZXQgbnJTcGVjdHJhbExpbmVzID0gTWF0aC5mbG9vcihudW1iZXJTYW1wbGVzIC8gMi4wICsgMSk7IC8vIHRoZSBmcmVxdWVuY3kgc3BlY3RydW0gaXMgbWlycm9yZWQ7IGhhbGYgb2YgaXQgY2FuIGJlIGlnbm9yZWRcclxuICAgICAgICBcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5yU3BlY3RyYWxMaW5lczsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBpc1plcm9GcmVxdWVuY3kgPSBpPT0wOyAvLyB0aGUgZnJlcXVlbmN5IGlzIHplcm8sIGlmIGkgaXMgMDtcclxuICAgICAgICAgICAgbGV0IGFtcGxpdHVkZTogbnVtYmVyID0gdGhpcy5nZXRTcGVjdHJhbEFtcGxpdHVkZShyZWFsW2ldLCBpbWFnW2ldLCBudW1iZXJTYW1wbGVzLCBpc1plcm9GcmVxdWVuY3kpOyAgXHJcbiAgICAgICAgICAgIGxldCBuZXdQb2ludCA9IG5ldyBQb2ludChkZWx0YUZyZXF1ZW5jeSppLCBhbXBsaXR1ZGUpO1xyXG4gICAgICAgICAgICBwb2ludHMucHVzaChuZXdQb2ludCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwb2ludHM7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0ZSB0aGUgYW1wbGl0dWRlIG9mIGEgc2luZ2xlIHNwZWN0cmFsIGxpbmVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHJlYWwgcmVhbCBwYXJ0IG9mIHRoZSBzaW5nYWwgaW4gdGhlIGZyZXFldW5jeSBkb21haW5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbWFnIGltYWdpbmFyeSBwYXJ0IG9mIHRoZSBzaW5nYWwgaW4gdGhlIGZyZXFldW5jeSBkb21haW5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBudW1iZXJTYW1wbGVzIG51bWJlciBvZiBzYW1wbGVzIG9mIHRoZSBvcmlnaWFubCBzaWduYWwgaW4gdGhlIHRpbWUgZG9tYWluXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaXNaZXJvRnJlcXVlbmN5IG11c3QgYmUgc2V0IHRvIFRSVUUgaWYgdGhlIHNwZWN0cmFsIGxpbmUgd2l0aCBmcmVxdWVuY3kgMC4wIGlzIHRvIGJlIGNhbGN1bGF0ZWRcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgRmZ0Q2FsY3VsYXRvclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFNwZWN0cmFsQW1wbGl0dWRlKHJlYWw6IG51bWJlciwgaW1hZzogbnVtYmVyLCBudW1iZXJTYW1wbGVzOiBudW1iZXIsIGlzWmVyb0ZyZXF1ZW5jeSA6IGJvb2xlYW4pOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBhbXBsaXR1ZGUgOiBudW1iZXIgPSBNYXRoLnNxcnQocmVhbCAqIHJlYWwgKyBpbWFnICogaW1hZykgLyBudW1iZXJTYW1wbGVzOyAvLyBjYWxjdWxhdGUgdGhlIHZlY3RvciBsZW5ndGggb2YgdGhlIGNvbXBsZXggbnVtYmVyIGFuZCBzY2FsZSBpdDogIC9udW1iZXJTYW1wbGVzXCJcclxuICAgICAgICBcclxuICAgICAgICBpZighaXNaZXJvRnJlcXVlbmN5KXsgLy8gZXZlcnl0aGluZyBleGNlcHQgdGhlIGRjIHBhcnQgKGZyZXF1ZW5jeSA9PSAwKSBtdXN0IGJlIHJlc2NhbGVkXHJcbiAgICAgICAgICAgIGFtcGxpdHVkZSA9IGFtcGxpdHVkZSoyLjA7IC8vICoyLjAgYmVjYXVzZSB0aGUgc3BlY3RyYWwgbGluZSBpcyBtaXJyb3JlZCBhbmQgb25seSBvbmUgaXMgdGFrZW4gaW50byBhY2NvdW50XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYW1wbGl0dWRlOyBcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5cclxuIl19