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
            var _this = _super.call(this, FftCalculator.id, "FFT", "Calculates the discrete frequency spectrum") || this;
            _this.inputName = "Input signal";
            _this.outputId = "OutputSignal";
            _this.outputName = "Output signal";
            _this.outputValue = "spectral lines";
            return _this;
        }
        FftCalculator.prototype.getDefaultInputData = function () {
            var defaultInputData = _super.prototype.getDefaultInputData.call(this);
            defaultInputData.push(new calculationDataPoints_1.CalculationDataPoints(FftCalculator.inputIdSignal, this.inputName, "", new Array(), "The signal to be transformed into the frequency domain", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            return defaultInputData;
        };
        FftCalculator.prototype.getDefaultOutputData = function () {
            var defaultOutputData = _super.prototype.getDefaultOutputData.call(this);
            var output = new calculationDataPoints_1.CalculationDataPoints(this.outputId, this.outputName, this.outputValue, new Array());
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
                name: this.outputName,
                id: this.outputId
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
         * @param {number[]} real real part of the signal in the freqeuncy domain
         * @param {number[]} imag imaginary part of the signal in the freqeuncy domain
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
         * @param {number} real real part of the signal in the freqeuncy domain
         * @param {number} imag imaginary part of the signal in the freqeuncy domain
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
        FftCalculator.id = "fft bilstein";
        FftCalculator.inputIdSignal = "InputSignal";
        return FftCalculator;
    }(calculatorBase_1.CalculatorBase));
    exports.FftCalculator = FftCalculator;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmZ0Q2FsY3VsYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRvcnMvZmZ0Q2FsY3VsYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBVUE7UUFBbUMsaUNBQWM7UUFVN0M7WUFBQSxZQUNJLGtCQUFNLGFBQWEsQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLDRDQUE0QyxDQUFDLFNBQy9FO1lBUk8sZUFBUyxHQUFVLGNBQWMsQ0FBQztZQUVsQyxjQUFRLEdBQVcsY0FBYyxDQUFDO1lBQ2xDLGdCQUFVLEdBQUcsZUFBZSxDQUFDO1lBQzdCLGlCQUFXLEdBQUcsZ0JBQWdCLENBQUM7O1FBSXZDLENBQUM7UUFFTSwyQ0FBbUIsR0FBMUI7WUFDSSxJQUFJLGdCQUFnQixHQUFHLGlCQUFNLG1CQUFtQixXQUFFLENBQUM7WUFFbkQsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksNkNBQXFCLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUUsRUFBRSxJQUFJLEtBQUssRUFBVSxFQUFFLHdEQUF3RCxFQUFFLElBQUksdURBQTBCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUU5TixPQUFPLGdCQUFnQixDQUFDO1FBQzVCLENBQUM7UUFFTSw0Q0FBb0IsR0FBM0I7WUFDSSxJQUFJLGlCQUFpQixHQUFHLGlCQUFNLG9CQUFvQixXQUFFLENBQUM7WUFFckQsSUFBSSxNQUFNLEdBQUcsSUFBSSw2Q0FBcUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLEtBQUssRUFBVSxDQUFDLENBQUM7WUFDOUcsTUFBTSxDQUFDLElBQUksR0FBRyx1QkFBVSxD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IH0gZnJvbSBcIi4vZmZ0L2ZmdF9iaWxzdGVpblwiO1xyXG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9wb2ludEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuLi8uLi9wb2ludFwiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFQb2ludHMgfSBmcm9tIFwiLi4vY2FsY3VsYXRpb25EYXRhUG9pbnRzXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvXCI7XHJcbmltcG9ydCB7IENhbGN1bGF0b3JCYXNlLCBFcnJvck1lc3NhZ2VUeXBlIH0gZnJvbSBcIi4vY2FsY3VsYXRvckJhc2VcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRvckhlbHBlciB9IGZyb20gXCIuL2NhbGN1bGF0b3JIZWxwZXJcIjtcclxuaW1wb3J0IHsgVENhbGN1bGF0aW9uRGF0YSB9IGZyb20gXCIuLi9jYWxjdWxhdGlvbkRhdGFcIjtcclxuaW1wb3J0IHsgU2VyaWVzVHlwZSB9IGZyb20gXCIuLi8uLi8uLi9jaGFydE1hbmFnZXJEYXRhTW9kZWwvc2VyaWVzVHlwZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEZmdENhbGN1bGF0b3IgZXh0ZW5kcyBDYWxjdWxhdG9yQmFzZSB7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBpZCA9IFwiZmZ0IGJpbHN0ZWluXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIGlucHV0SWRTaWduYWwgPSBcIklucHV0U2lnbmFsXCI7XHJcbiAgICBwcml2YXRlIGlucHV0TmFtZTpzdHJpbmcgPSBcIklucHV0IHNpZ25hbFwiO1xyXG5cclxuICAgIHByaXZhdGUgb3V0cHV0SWQ6IHN0cmluZyA9IFwiT3V0cHV0U2lnbmFsXCI7XHJcbiAgICBwcml2YXRlIG91dHB1dE5hbWUgPSBcIk91dHB1dCBzaWduYWxcIjtcclxuICAgIHByaXZhdGUgb3V0cHV0VmFsdWUgPSBcInNwZWN0cmFsIGxpbmVzXCI7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKEZmdENhbGN1bGF0b3IuaWQsIFwiRkZUXCIsIFwiQ2FsY3VsYXRlcyB0aGUgZGlzY3JldGUgZnJlcXVlbmN5IHNwZWN0cnVtXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXREZWZhdWx0SW5wdXREYXRhKCk6IEFycmF5PFRDYWxjdWxhdGlvbkRhdGE+IHtcclxuICAgICAgICBsZXQgZGVmYXVsdElucHV0RGF0YSA9IHN1cGVyLmdldERlZmF1bHRJbnB1dERhdGEoKTtcclxuXHJcbiAgICAgICAgZGVmYXVsdElucHV0RGF0YS5wdXNoKG5ldyBDYWxjdWxhdGlvbkRhdGFQb2ludHMoRmZ0Q2FsY3VsYXRvci5pbnB1dElkU2lnbmFsLCB0aGlzLmlucHV0TmFtZSwgXCJcIiwgbmV3IEFycmF5PElQb2ludD4oKSwgXCJUaGUgc2lnbmFsIHRvIGJlIHRyYW5zZm9ybWVkIGludG8gdGhlIGZyZXF1ZW5jeSBkb21haW5cIiwgbmV3IENhbGN1bGF0aW9uRGF0YURpc3BsYXlJbmZvKGZhbHNlLCB0cnVlKSkpO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmYXVsdElucHV0RGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0RGVmYXVsdE91dHB1dERhdGEoKTogQXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPiB7XHJcbiAgICAgICAgbGV0IGRlZmF1bHRPdXRwdXREYXRhID0gc3VwZXIuZ2V0RGVmYXVsdE91dHB1dERhdGEoKTtcclxuXHJcbiAgICAgICAgbGV0IG91dHB1dCA9IG5ldyBDYWxjdWxhdGlvbkRhdGFQb2ludHModGhpcy5vdXRwdXRJZCwgdGhpcy5vdXRwdXROYW1lLCB0aGlzLm91dHB1dFZhbHVlLCBuZXcgQXJyYXk8SVBvaW50PigpKTtcclxuICAgICAgICBvdXRwdXQudHlwZSA9IFNlcmllc1R5cGUuZmZ0U2VyaWVzO1xyXG4gICAgICAgIGRlZmF1bHRPdXRwdXREYXRhLnB1c2gob3V0cHV0KTsgXHJcblxyXG4gICAgICAgIHJldHVybiBkZWZhdWx0T3V0cHV0RGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgdmVyaWZ5Q2FsY3VsYXRpb25JbnB1dERhdGEoKSB7XHJcbiAgICAgICAgc3VwZXIudmVyaWZ5Q2FsY3VsYXRpb25JbnB1dERhdGEoKTtcclxuXHJcbiAgICAgICAgbGV0IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyID0gdGhpcy5nZXRDYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lcigpO1xyXG5cclxuICAgICAgICBsZXQgaW5wdXRTaWduYWwgPSBjYWxjdWxhdGlvbklucHV0RGF0YUNvbnRhaW5lclswXTtcclxuICAgICAgICBcclxuICAgICAgICBpZihpbnB1dFNpZ25hbCA9PSB1bmRlZmluZWQgfHwgIUNhbGN1bGF0b3JIZWxwZXIuY2FsY3VsYXRpb25JbnB1dERhdGFJc1NpZ25hbChpbnB1dFNpZ25hbC5kYXRhKSkge1xyXG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yQnlUeXBlKEVycm9yTWVzc2FnZVR5cGUuTWlzc2luZ09ySW52YWxpZElucHV0LCBbdGhpcy5pbnB1dE5hbWVdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGV4ZWN1dGVBbGdvcml0aG0oKSB7XHJcbiAgICAgICAgc3VwZXIuZXhlY3V0ZUFsZ29yaXRobSgpO1xyXG5cclxuICAgICAgICBsZXQgY2FsY3VsYXRpb25JbnB1dERhdGFDb250YWluZXIgPSB0aGlzLmdldENhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyKCk7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBBcnJheTxJUG9pbnQ+KCk7XHJcblxyXG4gICAgICAgIGxldCBpbnB1dFNpZ25hbCA9IGNhbGN1bGF0aW9uSW5wdXREYXRhQ29udGFpbmVyWzBdO1xyXG5cclxuICAgICAgICBpZihDYWxjdWxhdG9ySGVscGVyLmNhbGN1bGF0aW9uSW5wdXREYXRhSXNTaWduYWwoaW5wdXRTaWduYWwuZGF0YSkpIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5jbGNGZnQoaW5wdXRTaWduYWwuZGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmFkZENhbGN1bGF0aW9uT3V0cHV0RGF0YSh7XHJcbiAgICAgICAgICAgIGRhdGE6IHJlc3VsdCxcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMub3V0cHV0VmFsdWUsXHJcbiAgICAgICAgICAgIG5hbWU6IHRoaXMub3V0cHV0TmFtZSxcclxuICAgICAgICAgICAgaWQ6IHRoaXMub3V0cHV0SWRcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0ZXMgb3V0cHV0IGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxJUG9pbnQ+fSBpbnB1dFNpZ25hbFxyXG4gICAgICogQHJldHVybnMge0FycmF5PElQb2ludD59XHJcbiAgICAgKiBAbWVtYmVyb2YgRmZ0Q2FsY3VsYXRvclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNsY0ZmdChpbnB1dFNpZ25hbDogQXJyYXk8SVBvaW50Pik6IEFycmF5PElQb2ludD57XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcHJlcGFyZSBpbnB1dCBkYXRhIGZvciBmZnQgdHJhbnNmb3JtYXRpb25cclxuICAgICAgICBsZXQgcmVhbCA9IG5ldyBBcnJheTxudW1iZXI+KCk7XHJcbiAgICAgICAgbGV0IGltYWcgPSBuZXcgQXJyYXk8bnVtYmVyPigpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9MDsgaSA8IGlucHV0U2lnbmFsLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgcmVhbC5wdXNoKGlucHV0U2lnbmFsW2ldLnkpO1xyXG4gICAgICAgICAgICBpbWFnLnB1c2goMC4wKTsgLy8gdGhlIGltYWdpbmFyeSBwYXJ0IG9mIHRoZSByZWNvcmRlZCBzaWduYWwgaXMgMC4wXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBjYWxjdWxhdGUgZmZ0XHJcbiAgICAgICAgdHJhbnNmb3JtKHJlYWwsIGltYWcpOyAvLyBhdHRlbnRpb246IHRoZXNlIHBhcmFtZXRlcnMgYXJlIGJvdGggaW4tIGFuZCBvdXRwdXRzIVxyXG5cclxuICAgICAgICBsZXQgcG9pbnRzID0gdGhpcy5nZXRBbXBsaXR1ZGVTcGVjdHJ1bShpbnB1dFNpZ25hbCwgcmVhbCwgaW1hZyk7XHJcblxyXG4gICAgICAgIHJldHVybiBwb2ludHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxjdWxhdGVzIHRoZSBhbXBsaXR1ZGUgc3BlY3RydW0gYW5kIGlnbm9yZXMgdGhlIHBoYXNlIGluZm9ybWF0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SVBvaW50W119IGlucHV0U2lnbmFsIG9yaWdpbmFsIHRpbWUgYmFzZWQgc2lnbmFsXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcltdfSByZWFsIHJlYWwgcGFydCBvZiB0aGUgc2lnbmFsIGluIHRoZSBmcmVxZXVuY3kgZG9tYWluXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcltdfSBpbWFnIGltYWdpbmFyeSBwYXJ0IG9mIHRoZSBzaWduYWwgaW4gdGhlIGZyZXFldW5jeSBkb21haW5cclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgRmZ0Q2FsY3VsYXRvclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldEFtcGxpdHVkZVNwZWN0cnVtKGlucHV0U2lnbmFsOiBJUG9pbnRbXSwgcmVhbDogbnVtYmVyW10sIGltYWc6IG51bWJlcltdKSA6IElQb2ludFtde1xyXG4gICAgICAgIGxldCBwb2ludHMgPSBuZXcgQXJyYXk8SVBvaW50PigpOyAvLyBwcmVwYXJlIHJldHVybiBkYXRhXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZXN0aW1hdGUgc2FtcGxlIHRpbWVcclxuICAgICAgICBsZXQgc2FtcGxlVGltZTogbnVtYmVyID0gQ2FsY3VsYXRvckhlbHBlci5lc3RpbWF0ZVNhbXBsZVRpbWUoaW5wdXRTaWduYWwpOyAvLyBbc2Vjb25kc11cclxuICAgICAgICBsZXQgbnVtYmVyU2FtcGxlcyA9IGlucHV0U2lnbmFsLmxlbmd0aDtcclxuICAgICAgICBcclxuICAgICAgICAvLyBjYWxjdWxhdGUgZnJlcXVlbmN5IG9mIHNwZWN0cmFsIGxpbmVzIGFuZCBjb21iaW5lIHRvIG5ldyBzaWduYWwgICAgICBcclxuICAgICAgICBsZXQgZGVsdGFGcmVxdWVuY3kgPSAxLjAgLyAoc2FtcGxlVGltZSAqIG51bWJlclNhbXBsZXMpOyAvLyBkaXN0YW5jZSBiZXR3ZWVuIHRoZSBzcGVjdHJhbCBsaW5lcyBpbiBbSHpdXHJcbiAgICAgICAgbGV0IG5yU3BlY3RyYWxMaW5lcyA9IE1hdGguZmxvb3IobnVtYmVyU2FtcGxlcyAvIDIuMCArIDEpOyAvLyB0aGUgZnJlcXVlbmN5IHNwZWN0cnVtIGlzIG1pcnJvcmVkOyBoYWxmIG9mIGl0IGNhbiBiZSBpZ25vcmVkXHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuclNwZWN0cmFsTGluZXM7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaXNaZXJvRnJlcXVlbmN5ID0gaT09MDsgLy8gdGhlIGZyZXF1ZW5jeSBpcyB6ZXJvLCBpZiBpIGlzIDA7XHJcbiAgICAgICAgICAgIGxldCBhbXBsaXR1ZGU6IG51bWJlciA9IHRoaXMuZ2V0U3BlY3RyYWxBbXBsaXR1ZGUocmVhbFtpXSwgaW1hZ1tpXSwgbnVtYmVyU2FtcGxlcywgaXNaZXJvRnJlcXVlbmN5KTsgIFxyXG4gICAgICAgICAgICBsZXQgbmV3UG9pbnQgPSBuZXcgUG9pbnQoZGVsdGFGcmVxdWVuY3kqaSwgYW1wbGl0dWRlKTtcclxuICAgICAgICAgICAgcG9pbnRzLnB1c2gobmV3UG9pbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcG9pbnRzO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxjdWxhdGUgdGhlIGFtcGxpdHVkZSBvZiBhIHNpbmdsZSBzcGVjdHJhbCBsaW5lXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByZWFsIHJlYWwgcGFydCBvZiB0aGUgc2lnbmFsIGluIHRoZSBmcmVxZXVuY3kgZG9tYWluXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW1hZyBpbWFnaW5hcnkgcGFydCBvZiB0aGUgc2lnbmFsIGluIHRoZSBmcmVxZXVuY3kgZG9tYWluXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbnVtYmVyU2FtcGxlcyBudW1iZXIgb2Ygc2FtcGxlcyBvZiB0aGUgb3JpZ2lhbmwgc2lnbmFsIGluIHRoZSB0aW1lIGRvbWFpblxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGlzWmVyb0ZyZXF1ZW5jeSBtdXN0IGJlIHNldCB0byBUUlVFIGlmIHRoZSBzcGVjdHJhbCBsaW5lIHdpdGggZnJlcXVlbmN5IDAuMCBpcyB0byBiZSBjYWxjdWxhdGVkXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIEZmdENhbGN1bGF0b3JcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRTcGVjdHJhbEFtcGxpdHVkZShyZWFsOiBudW1iZXIsIGltYWc6IG51bWJlciwgbnVtYmVyU2FtcGxlczogbnVtYmVyLCBpc1plcm9GcmVxdWVuY3kgOiBib29sZWFuKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgYW1wbGl0dWRlIDogbnVtYmVyID0gTWF0aC5zcXJ0KHJlYWwgKiByZWFsICsgaW1hZyAqIGltYWcpIC8gbnVtYmVyU2FtcGxlczsgLy8gY2FsY3VsYXRlIHRoZSB2ZWN0b3IgbGVuZ3RoIG9mIHRoZSBjb21wbGV4IG51bWJlciBhbmQgc2NhbGUgaXQ6ICAvbnVtYmVyU2FtcGxlc1wiXHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoIWlzWmVyb0ZyZXF1ZW5jeSl7IC8vIGV2ZXJ5dGhpbmcgZXhjZXB0IHRoZSBkYyBwYXJ0IChmcmVxdWVuY3kgPT0gMCkgbXVzdCBiZSByZXNjYWxlZFxyXG4gICAgICAgICAgICBhbXBsaXR1ZGUgPSBhbXBsaXR1ZGUqMi4wOyAvLyAqMi4wIGJlY2F1c2UgdGhlIHNwZWN0cmFsIGxpbmUgaXMgbWlycm9yZWQgYW5kIG9ubHkgb25lIGlzIHRha2VuIGludG8gYWNjb3VudFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGFtcGxpdHVkZTsgXHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuXHJcbiJdfQ==