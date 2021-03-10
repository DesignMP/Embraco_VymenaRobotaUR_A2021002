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
define(["require", "exports", "./fft/fft_bilstein", "../../point", "../calculationDataPoints", "../calculationDataDisplayInfo", "./calculatorBase"], function (require, exports, fft_bilstein_1, point_1, calculationDataPoints_1, calculationDataDisplayInfo_1, calculatorBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FftCalculator = /** @class */ (function (_super) {
        __extends(FftCalculator, _super);
        function FftCalculator() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.id = "fft bilstein";
            _this.displayName = "FFT";
            _this.description = "Calculates the discrete frequency spectrum";
            _this.inputSignalName = "Input signal";
            return _this;
        }
        /**
         * Returns the default input data for this calculator
         *
         * @returns {(Array<CalculationDataNumber|CalculationDataPoints>)}
         * @memberof FftCalculator
         */
        FftCalculator.prototype.getDefaultInputData = function () {
            var inputData = new Array();
            // add input params with default displaynames
            inputData.push(new calculationDataPoints_1.CalculationDataPoints(this.inputSignalName, "", new Array(), "The signal to be transformed into the frequency domain", new calculationDataDisplayInfo_1.CalculationDataDisplayInfo(false, true)));
            return inputData;
        };
        /**
         * Returns the default output data for this calculator
         *
         * @returns {Array<CalculationDataPoints>}
         * @memberof FftCalculator
         */
        FftCalculator.prototype.getDefaultOutputData = function () {
            var outputData = new Array();
            // add output params with default displaynames
            outputData.push(new calculationDataPoints_1.CalculationDataPoints("Output signal", "spectral lines", new Array()));
            return outputData;
        };
        /**
         * Calculates output so that a sine with the amplitude of one and the frequency of 1Hz shows as a single spectral line with the frequency 1Hz and the hight 1
         *
         * @param {Array<ICalculationData>} inputData
         * @returns {Array<CalculationDataPoints>}
         * @memberof FftCalculator
         */
        FftCalculator.prototype.calculate = function (inputData) {
            this.clearErrors();
            var rawPoints = new Array();
            // Create empty default output 
            var outputData = new Array();
            outputData.push(new calculationDataPoints_1.CalculationDataPoints("Output signal", "limit", new Array()));
            // Get input data
            var signalData = inputData[0].getData();
            // Check for valid input data
            this.checkForInvalidInputData(signalData);
            // Return if errors occurred
            if (this.getErrors().length > 0) {
                return outputData;
            }
            // calculate new data
            rawPoints = this.clcFft(signalData);
            // Set new outputdata
            outputData[0].setData(rawPoints);
            return outputData;
        };
        /**
         * Checks for invalid input data, and adds the error information to the errors of this calculation
         *
         * @private
         * @param {Array<IPoint>} signalData
         * @memberof FftCalculator
         */
        FftCalculator.prototype.checkForInvalidInputData = function (signalData) {
            if (signalData == undefined || signalData.length < 2) { // A minimum of two points is needed
                this.addErrorByType(calculatorBase_1.ErroMessageType.MissingOrInvalidInput, [this.inputSignalName]);
            }
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
            var sampleTime = this.estimateSampleTime(inputSignal); // [seconds]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmZ0Q2FsY3VsYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvY2FsY3VsYXRvcnMvZmZ0Q2FsY3VsYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBVUE7UUFBbUMsaUNBQWM7UUFBakQ7WUFBQSxxRUFrS0M7WUFoS0csUUFBRSxHQUFXLGNBQWMsQ0FBQztZQUM1QixpQkFBVyxHQUFXLEtBQUssQ0FBQztZQUM1QixpQkFBVyxHQUFXLDRDQUE0QyxDQUFDO1lBRTNELHFCQUFlLEdBQVUsY0FBYyxDQUFDOztRQTRKcEQsQ0FBQztRQXpKRzs7Ozs7V0FLRztRQUNJLDJDQUFtQixHQUExQjtZQUNJLElBQUksU0FBUyxHQUF1RCxJQUFJLEtBQUssRUFBK0MsQ0FBQztZQUM3SCw2Q0FBNkM7WUFFN0MsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLDZDQUFxQixDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsRUFBRSxFQUFFLElBQUksS0FBSyxFQUFVLEVBQUUsd0RBQXdELEVBQUUsSUFBSSx1REFBMEIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hNLE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNJLDRDQUFvQixHQUEzQjtZQUNJLElBQUksVUFBVSxHQUFHLElBQUksS0FBSyxFQUF5QixDQUFDO1lBQ3BELDhDQUE4QztZQUM5QyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksNkNBQXFCLENBQUMsZUFBZSxFQUFFLGdCQUFnQixFQUFFLElBQUksS0FBSyxFQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ25HLE9BQU8sVUFBVSxDQUFDO1FBQ3RCLENBQUM7UUFHRDs7Ozs7O1dBTUc7UUFDSCxpQ0FBUyxHQUFULFVBQVUsU0FBa0M7WUFDeEMsSUFBSSxD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QUFHLGVBQWUsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDdEMsSUFBSSxlQUFlLEdBQUcsQ0FBQyxJQUFFLENBQUMsQ0FBQyxDQUFDLG9DQUFvQztnQkFDaEUsSUFBSSxTQUFTLEdBQVcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsYUFBYSxFQUFFLGVBQWUsQ0FBQyxDQUFDO2dCQUNwRyxJQUFJLFFBQVEsR0FBRyxJQUFJLGFBQUssQ0FBQyxjQUFjLEdBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUN0RCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3pCO1lBQ0QsT0FBTyxNQUFNLENBQUM7UUFDbEIsQ0FBQztRQUlEOzs7Ozs7Ozs7O1dBVUc7UUFDSyw0Q0FBb0IsR0FBNUIsVUFBNkIsSUFBWSxFQUFFLElBQVksRUFBRSxhQUFxQixFQUFFLGVBQXlCO1lBQ3JHLElBQUksU0FBUyxHQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsYUFBYSxDQUFDLENBQUMsbUZBQW1GO1lBRWxLLElBQUcsQ0FBQyxlQUFlLEVBQUMsRUFBRSxrRUFBa0U7Z0JBQ3BGLFNBQVMsR0FBRyxTQUFTLEdBQUMsR0FBRyxDQUFDLENBQUMsZ0ZBQWdGO2FBQzlHO1lBRUQsT0FBTyxTQUFTLENBQUM7UUFDckIsQ0FBQztRQUNMLG9CQUFDO0lBQUQsQ0FBQyxBQWxLRCxDQUFtQywrQkFBYyxHQWtLaEQ7SUFsS1ksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0cmFuc2Zvcm0gfSBmcm9tIFwiLi9mZnQvZmZ0X2JpbHN0ZWluXCI7XHJcbmltcG9ydCB7IElDYWxjdWxhdG9yIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvY2FsY3VsYXRvckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJQ2FsY3VsYXRpb25EYXRhIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvY2FsY3VsYXRpb25EYXRhSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElQb2ludCB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL3BvaW50SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4uLy4uL3BvaW50XCI7XHJcbmltcG9ydCB7IENhbGN1bGF0aW9uRGF0YU51bWJlciB9IGZyb20gXCIuLi9jYWxjdWxhdGlvbkRhdGFOdW1iZXJcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25EYXRhUG9pbnRzIH0gZnJvbSBcIi4uL2NhbGN1bGF0aW9uRGF0YVBvaW50c1wiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mbyB9IGZyb20gXCIuLi9jYWxjdWxhdGlvbkRhdGFEaXNwbGF5SW5mb1wiO1xyXG5pbXBvcnQgeyBDYWxjdWxhdG9yQmFzZSwgRXJyb01lc3NhZ2VUeXBlIH0gZnJvbSBcIi4vY2FsY3VsYXRvckJhc2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBGZnRDYWxjdWxhdG9yIGV4dGVuZHMgQ2FsY3VsYXRvckJhc2UgaW1wbGVtZW50cyBJQ2FsY3VsYXRvcntcclxuICAgIFxyXG4gICAgaWQ6IHN0cmluZyA9IFwiZmZ0IGJpbHN0ZWluXCI7XHJcbiAgICBkaXNwbGF5TmFtZTogc3RyaW5nID0gXCJGRlRcIjtcclxuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmcgPSBcIkNhbGN1bGF0ZXMgdGhlIGRpc2NyZXRlIGZyZXF1ZW5jeSBzcGVjdHJ1bVwiO1xyXG5cclxuICAgIHByaXZhdGUgaW5wdXRTaWduYWxOYW1lOnN0cmluZyA9IFwiSW5wdXQgc2lnbmFsXCI7XHJcblxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgaW5wdXQgZGF0YSBmb3IgdGhpcyBjYWxjdWxhdG9yXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyhBcnJheTxDYWxjdWxhdGlvbkRhdGFOdW1iZXJ8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPil9XHJcbiAgICAgKiBAbWVtYmVyb2YgRmZ0Q2FsY3VsYXRvclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0RGVmYXVsdElucHV0RGF0YSgpOiBBcnJheTxDYWxjdWxhdGlvbkRhdGFOdW1iZXJ8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPntcclxuICAgICAgICBsZXQgaW5wdXREYXRhOiBBcnJheTxDYWxjdWxhdGlvbkRhdGFOdW1iZXJ8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPiA9IG5ldyBBcnJheTxDYWxjdWxhdGlvbkRhdGFOdW1iZXJ8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPigpO1xyXG4gICAgICAgIC8vIGFkZCBpbnB1dCBwYXJhbXMgd2l0aCBkZWZhdWx0IGRpc3BsYXluYW1lc1xyXG4gICAgICAgICAgICBcclxuICAgICAgICBpbnB1dERhdGEucHVzaChuZXcgQ2FsY3VsYXRpb25EYXRhUG9pbnRzKHRoaXMuaW5wdXRTaWduYWxOYW1lLCBcIlwiLCBuZXcgQXJyYXk8SVBvaW50PigpLCBcIlRoZSBzaWduYWwgdG8gYmUgdHJhbnNmb3JtZWQgaW50byB0aGUgZnJlcXVlbmN5IGRvbWFpblwiLCBuZXcgQ2FsY3VsYXRpb25EYXRhRGlzcGxheUluZm8oZmFsc2UsIHRydWUpKSk7XHJcbiAgICAgICAgcmV0dXJuIGlucHV0RGF0YTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IG91dHB1dCBkYXRhIGZvciB0aGlzIGNhbGN1bGF0b3JcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPn1cclxuICAgICAqIEBtZW1iZXJvZiBGZnRDYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXREZWZhdWx0T3V0cHV0RGF0YSgpOiBBcnJheTxDYWxjdWxhdGlvbkRhdGFQb2ludHM+e1xyXG4gICAgICAgIGxldCBvdXRwdXREYXRhID0gbmV3IEFycmF5PENhbGN1bGF0aW9uRGF0YVBvaW50cz4oKTtcclxuICAgICAgICAvLyBhZGQgb3V0cHV0IHBhcmFtcyB3aXRoIGRlZmF1bHQgZGlzcGxheW5hbWVzXHJcbiAgICAgICAgb3V0cHV0RGF0YS5wdXNoKG5ldyBDYWxjdWxhdGlvbkRhdGFQb2ludHMoXCJPdXRwdXQgc2lnbmFsXCIsIFwic3BlY3RyYWwgbGluZXNcIiwgbmV3IEFycmF5PElQb2ludD4oKSkpOyBcclxuICAgICAgICByZXR1cm4gb3V0cHV0RGF0YTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxjdWxhdGVzIG91dHB1dCBzbyB0aGF0IGEgc2luZSB3aXRoIHRoZSBhbXBsaXR1ZGUgb2Ygb25lIGFuZCB0aGUgZnJlcXVlbmN5IG9mIDFIeiBzaG93cyBhcyBhIHNpbmdsZSBzcGVjdHJhbCBsaW5lIHdpdGggdGhlIGZyZXF1ZW5jeSAxSHogYW5kIHRoZSBoaWdodCAxXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxJQ2FsY3VsYXRpb25EYXRhPn0gaW5wdXREYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPn1cclxuICAgICAqIEBtZW1iZXJvZiBGZnRDYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIGNhbGN1bGF0ZShpbnB1dERhdGE6IEFycmF5PElDYWxjdWxhdGlvbkRhdGE+KTogQXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPiB7XHJcbiAgICAgICAgdGhpcy5jbGVhckVycm9ycygpO1xyXG5cclxuICAgICAgICBsZXQgcmF3UG9pbnRzID0gbmV3IEFycmF5PElQb2ludD4oKTtcclxuICAgICAgICAvLyBDcmVhdGUgZW1wdHkgZGVmYXVsdCBvdXRwdXQgXHJcbiAgICAgICAgbGV0IG91dHB1dERhdGEgPSBuZXcgQXJyYXk8Q2FsY3VsYXRpb25EYXRhUG9pbnRzPigpO1xyXG4gICAgICAgIG91dHB1dERhdGEucHVzaChuZXcgQ2FsY3VsYXRpb25EYXRhUG9pbnRzKFwiT3V0cHV0IHNpZ25hbFwiLCBcImxpbWl0XCIsIG5ldyBBcnJheTxJUG9pbnQ+KCkpKTsgXHJcblxyXG4gICAgICAgIC8vIEdldCBpbnB1dCBkYXRhXHJcbiAgICAgICAgbGV0IHNpZ25hbERhdGEgPSAoaW5wdXREYXRhWzBdIGFzIENhbGN1bGF0aW9uRGF0YVBvaW50cykuZ2V0RGF0YSgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIENoZWNrIGZvciB2YWxpZCBpbnB1dCBkYXRhXHJcbiAgICAgICAgdGhpcy5jaGVja0ZvckludmFsaWRJbnB1dERhdGEoc2lnbmFsRGF0YSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gUmV0dXJuIGlmIGVycm9ycyBvY2N1cnJlZFxyXG4gICAgICAgIGlmKHRoaXMuZ2V0RXJyb3JzKCkubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIHJldHVybiBvdXRwdXREYXRhO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBjYWxjdWxhdGUgbmV3IGRhdGFcclxuICAgICAgICByYXdQb2ludHMgPSB0aGlzLmNsY0ZmdChzaWduYWxEYXRhKTtcclxuXHJcbiAgICAgICAgLy8gU2V0IG5ldyBvdXRwdXRkYXRhXHJcbiAgICAgICAgb3V0cHV0RGF0YVswXS5zZXREYXRhKHJhd1BvaW50cyk7XHJcbiAgICAgICAgcmV0dXJuIG91dHB1dERhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgZm9yIGludmFsaWQgaW5wdXQgZGF0YSwgYW5kIGFkZHMgdGhlIGVycm9yIGluZm9ybWF0aW9uIHRvIHRoZSBlcnJvcnMgb2YgdGhpcyBjYWxjdWxhdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElQb2ludD59IHNpZ25hbERhdGFcclxuICAgICAqIEBtZW1iZXJvZiBGZnRDYWxjdWxhdG9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2hlY2tGb3JJbnZhbGlkSW5wdXREYXRhKHNpZ25hbERhdGE6IEFycmF5PElQb2ludD4pe1xyXG4gICAgICAgIGlmKHNpZ25hbERhdGEgPT0gdW5kZWZpbmVkIHx8IHNpZ25hbERhdGEubGVuZ3RoIDwgMil7IC8vIEEgbWluaW11bSBvZiB0d28gcG9pbnRzIGlzIG5lZWRlZFxyXG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yQnlUeXBlKEVycm9NZXNzYWdlVHlwZS5NaXNzaW5nT3JJbnZhbGlkSW5wdXQsIFt0aGlzLmlucHV0U2lnbmFsTmFtZV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0ZXMgb3V0cHV0IGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxJUG9pbnQ+fSBpbnB1dFNpZ25hbFxyXG4gICAgICogQHJldHVybnMge0FycmF5PElQb2ludD59XHJcbiAgICAgKiBAbWVtYmVyb2YgRmZ0Q2FsY3VsYXRvclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNsY0ZmdChpbnB1dFNpZ25hbDogQXJyYXk8SVBvaW50Pik6IEFycmF5PElQb2ludD57XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcHJlcGFyZSBpbnB1dCBkYXRhIGZvciBmZnQgdHJhbnNmb3JtYXRpb25cclxuICAgICAgICBsZXQgcmVhbCA9IG5ldyBBcnJheTxudW1iZXI+KCk7XHJcbiAgICAgICAgbGV0IGltYWcgPSBuZXcgQXJyYXk8bnVtYmVyPigpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9MDsgaSA8IGlucHV0U2lnbmFsLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgcmVhbC5wdXNoKGlucHV0U2lnbmFsW2ldLnkpO1xyXG4gICAgICAgICAgICBpbWFnLnB1c2goMC4wKTsgLy8gdGhlIGltYWdpbmFyeSBwYXJ0IG9mIHRoZSByZWNvcmRlZCBzaWduYWwgaXMgMC4wXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBjYWxjdWxhdGUgZmZ0XHJcbiAgICAgICAgdHJhbnNmb3JtKHJlYWwsIGltYWcpOyAvLyBhdHRlbnRpb246IHRoZXNlIHBhcmFtZXRlcnMgYXJlIGJvdGggaW4tIGFuZCBvdXRwdXRzIVxyXG5cclxuICAgICAgICBsZXQgcG9pbnRzID0gdGhpcy5nZXRBbXBsaXR1ZGVTcGVjdHJ1bShpbnB1dFNpZ25hbCwgcmVhbCwgaW1hZyk7XHJcblxyXG4gICAgICAgIHJldHVybiBwb2ludHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxjdWxhdGVzIHRoZSBhbXBsaXR1ZGUgc3BlY3RydW0gYW5kIGlnbm9yZXMgdGhlIHBoYXNlIGluZm9ybWF0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SVBvaW50W119IGlucHV0U2lnbmFsIG9yaWdpbmFsIHRpbWUgYmFzZWQgc2lnbmFsXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcltdfSByZWFsIHJlYWwgcGFydCBvZiB0aGUgc2luZ2FsIGluIHRoZSBmcmVxZXVuY3kgZG9tYWluXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcltdfSBpbWFnIGltYWdpbmFyeSBwYXJ0IG9mIHRoZSBzaW5nYWwgaW4gdGhlIGZyZXFldW5jeSBkb21haW5cclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgRmZ0Q2FsY3VsYXRvclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldEFtcGxpdHVkZVNwZWN0cnVtKGlucHV0U2lnbmFsOiBJUG9pbnRbXSwgcmVhbDogbnVtYmVyW10sIGltYWc6IG51bWJlcltdKSA6IElQb2ludFtde1xyXG4gICAgICAgIGxldCBwb2ludHMgPSBuZXcgQXJyYXk8SVBvaW50PigpOyAvLyBwcmVwYXJlIHJldHVybiBkYXRhXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZXN0aW1hdGUgc2FtcGxlIHRpbWVcclxuICAgICAgICBsZXQgc2FtcGxlVGltZTogbnVtYmVyID0gdGhpcy5lc3RpbWF0ZVNhbXBsZVRpbWUoaW5wdXRTaWduYWwpOyAvLyBbc2Vjb25kc11cclxuICAgICAgICBsZXQgbnVtYmVyU2FtcGxlcyA9IGlucHV0U2lnbmFsLmxlbmd0aDtcclxuICAgICAgICBcclxuICAgICAgICAvLyBjYWxjdWxhdGUgZnJlcXVlbmN5IG9mIHNwZWN0cmFsIGxpbmVzIGFuZCBjb21iaW5lIHRvIG5ldyBzaWduYWwgICAgICBcclxuICAgICAgICBsZXQgZGVsdGFGcmVxdWVuY3kgPSAxLjAgLyAoc2FtcGxlVGltZSAqIG51bWJlclNhbXBsZXMpOyAvLyBkaXN0YW5jZSBiZXR3ZWVuIHRoZSBzcGVjdHJhbCBsaW5lcyBpbiBbSHpdXHJcbiAgICAgICAgbGV0IG5yU3BlY3RyYWxMaW5lcyA9IE1hdGguZmxvb3IobnVtYmVyU2FtcGxlcyAvIDIuMCArIDEpOyAvLyB0aGUgZnJlcXVlbmN5IHNwZWN0cnVtIGlzIG1pcnJvcmVkOyBoYWxmIG9mIGl0IGNhbiBiZSBpZ25vcmVkXHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuclNwZWN0cmFsTGluZXM7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaXNaZXJvRnJlcXVlbmN5ID0gaT09MDsgLy8gdGhlIGZyZXF1ZW5jeSBpcyB6ZXJvLCBpZiBpIGlzIDA7XHJcbiAgICAgICAgICAgIGxldCBhbXBsaXR1ZGU6IG51bWJlciA9IHRoaXMuZ2V0U3BlY3RyYWxBbXBsaXR1ZGUocmVhbFtpXSwgaW1hZ1tpXSwgbnVtYmVyU2FtcGxlcywgaXNaZXJvRnJlcXVlbmN5KTsgIFxyXG4gICAgICAgICAgICBsZXQgbmV3UG9pbnQgPSBuZXcgUG9pbnQoZGVsdGFGcmVxdWVuY3kqaSwgYW1wbGl0dWRlKTtcclxuICAgICAgICAgICAgcG9pbnRzLnB1c2gobmV3UG9pbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcG9pbnRzO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxjdWxhdGUgdGhlIGFtcGxpdHVkZSBvZiBhIHNpbmdsZSBzcGVjdHJhbCBsaW5lXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByZWFsIHJlYWwgcGFydCBvZiB0aGUgc2luZ2FsIGluIHRoZSBmcmVxZXVuY3kgZG9tYWluXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW1hZyBpbWFnaW5hcnkgcGFydCBvZiB0aGUgc2luZ2FsIGluIHRoZSBmcmVxZXVuY3kgZG9tYWluXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbnVtYmVyU2FtcGxlcyBudW1iZXIgb2Ygc2FtcGxlcyBvZiB0aGUgb3JpZ2lhbmwgc2lnbmFsIGluIHRoZSB0aW1lIGRvbWFpblxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGlzWmVyb0ZyZXF1ZW5jeSBtdXN0IGJlIHNldCB0byBUUlVFIGlmIHRoZSBzcGVjdHJhbCBsaW5lIHdpdGggZnJlcXVlbmN5IDAuMCBpcyB0byBiZSBjYWxjdWxhdGVkXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIEZmdENhbGN1bGF0b3JcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRTcGVjdHJhbEFtcGxpdHVkZShyZWFsOiBudW1iZXIsIGltYWc6IG51bWJlciwgbnVtYmVyU2FtcGxlczogbnVtYmVyLCBpc1plcm9GcmVxdWVuY3kgOiBib29sZWFuKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgYW1wbGl0dWRlIDogbnVtYmVyID0gTWF0aC5zcXJ0KHJlYWwgKiByZWFsICsgaW1hZyAqIGltYWcpIC8gbnVtYmVyU2FtcGxlczsgLy8gY2FsY3VsYXRlIHRoZSB2ZWN0b3IgbGVuZ3RoIG9mIHRoZSBjb21wbGV4IG51bWJlciBhbmQgc2NhbGUgaXQ6ICAvbnVtYmVyU2FtcGxlc1wiXHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoIWlzWmVyb0ZyZXF1ZW5jeSl7IC8vIGV2ZXJ5dGhpbmcgZXhjZXB0IHRoZSBkYyBwYXJ0IChmcmVxdWVuY3kgPT0gMCkgbXVzdCBiZSByZXNjYWxlZFxyXG4gICAgICAgICAgICBhbXBsaXR1ZGUgPSBhbXBsaXR1ZGUqMi4wOyAvLyAqMi4wIGJlY2F1c2UgdGhlIHNwZWN0cmFsIGxpbmUgaXMgbWlycm9yZWQgYW5kIG9ubHkgb25lIGlzIHRha2VuIGludG8gYWNjb3VudFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGFtcGxpdHVkZTsgXHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuXHJcbiJdfQ==