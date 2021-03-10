define(["require", "exports", "./bilinearTransformation", "./stateSpaceCalculator"], function (require, exports, bilinearTransformation_1, stateSpaceCalculator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Bessel = /** @class */ (function () {
        function Bessel(order, cutoffFrequencyHz, Ts) {
            /* Frequency scaling factors for bessel filter */
            this.KB2 = 1.272;
            this.KB3 = 1.405;
            this.KB4 = 1.514;
            this.KB5 = 1.622;
            /*Coefficients of a normalised Bessel filter*/
            this.B21 = 1.732050807588;
            this.B31 = 2.432880798339;
            this.B32 = 2.466212074330;
            this.B41 = 3.123939936920;
            this.B42 = 4.391550328368;
            this.B43 = 3.201085872943;
            this.B51 = 3.810701205349;
            this.B52 = 6.776673715676;
            this.B53 = 6.886367652423;
            this.B54 = 3.936283427035;
            this.Num = [];
            this.Den = [];
            // initialize the numerator and denumerator for the bessel filter
            this.initNumDen(order, cutoffFrequencyHz);
            // convert the parameters into the discrete time system "world"
            var bilinearTransformation = new bilinearTransformation_1.BilinearTransformation(order, Ts, this.Num, this.Den);
            // create and init the state space object
            this.stateSpaceCalculator = new stateSpaceCalculator_1.StateSpaceCalculator(order, bilinearTransformation.bz, bilinearTransformation.az, this.Num[0], this.Den[0]);
        }
        Bessel.prototype.initNumDen = function (order, cutoffFrequencyHz) {
            /* tslint:disable:max-func-body-length */ // disabled due to switch case
            var wc = 2 * Math.PI * cutoffFrequencyHz;
            switch (order) {
                case 1:
                    this.Num[0] = wc;
                    this.Num[1] = 0;
                    this.Num[2] = 0;
                    this.Num[3] = 0;
                    this.Num[4] = 0;
                    this.Num[5] = 0;
                    this.Den[0] = wc;
                    this.Den[1] = 1;
                    this.Den[2] = 0;
                    this.Den[3] = 0;
                    this.Den[4] = 0;
                    this.Den[5] = 0;
                    break;
                case 2:
                    wc = wc * this.KB2;
                    this.Num[0] = Math.pow(wc, 2);
                    this.Num[1] = 0;
                    this.Num[2] = 0;
                    this.Num[3] = 0;
                    this.Num[4] = 0;
                    this.Num[5] = 0;
                    this.Den[0] = Math.pow(wc, 2);
                    this.Den[1] = this.B21 * wc;
                    this.Den[2] = 1;
                    this.Den[3] = 0;
                    this.Den[4] = 0;
                    this.Den[5] = 0;
                    break;
                case 3:
                    wc = wc * this.KB3;
                    this.Num[0] = Math.pow(wc, 3);
                    this.Num[1] = 0;
                    this.Num[2] = 0;
                    this.Num[3] = 0;
                    this.Num[4] = 0;
                    this.Num[5] = 0;
                    this.Den[0] = Math.pow(wc, 3);
                    this.Den[1] = this.B32 * Math.pow(wc, 2);
                    this.Den[2] = this.B31 * wc;
                    this.Den[3] = 1;
                    this.Den[4] = 0;
                    this.Den[5] = 0;
                    break;
                case 4:
                    wc = wc * this.KB4;
                    this.Num[0] = Math.pow(wc, 4);
                    this.Num[1] = 0;
                    this.Num[2] = 0;
                    this.Num[3] = 0;
                    this.Num[4] = 0;
                    this.Num[5] = 0;
                    this.Den[0] = Math.pow(wc, 4);
                    this.Den[1] = this.B43 * Math.pow(wc, 3);
                    this.Den[2] = this.B42 * Math.pow(wc, 2);
                    this.Den[3] = this.B41 * wc;
                    this.Den[4] = 1;
                    this.Den[5] = 0;
                    break;
                case 5:
                    wc = wc * this.KB5;
                    this.Num[0] = Math.pow(wc, 5);
                    this.Num[1] = 0;
                    this.Num[2] = 0;
                    this.Num[3] = 0;
                    this.Num[4] = 0;
                    this.Num[5] = 0;
                    this.Den[0] = Math.pow(wc, 5);
                    this.Den[1] = this.B54 * Math.pow(wc, 4);
                    this.Den[2] = this.B53 * Math.pow(wc, 3);
                    this.Den[3] = this.B52 * Math.pow(wc, 2);
                    this.Den[4] = this.B51 * wc;
                    this.Den[5] = 1;
                    break;
            }
            /* tslint:enable:max-func-body-length */
        };
        Bessel.prototype.filter = function (inputSignal) {
            return this.stateSpaceCalculator.ClcOutputVector(inputSignal);
        };
        return Bessel;
    }());
    exports.Bessel = Bessel;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVzc2VsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdG9ycy9maWx0ZXJzL2Jlc3NlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFHQTtRQXlCSSxnQkFBWSxLQUFZLEVBQUUsaUJBQXdCLEVBQUUsRUFBUztZQXZCN0QsaURBQWlEO1lBQ3pDLFFBQUcsR0FBVyxLQUFLLENBQUM7WUFDcEIsUUFBRyxHQUFXLEtBQUssQ0FBQztZQUNwQixRQUFHLEdBQVcsS0FBSyxDQUFDO1lBQ3BCLFFBQUcsR0FBVyxLQUFLLENBQUM7WUFFNUIsOENBQThDO1lBQ3RDLFFBQUcsR0FBVyxjQUFjLENBQUM7WUFDN0IsUUFBRyxHQUFXLGNBQWMsQ0FBQztZQUM3QixRQUFHLEdBQVcsY0FBYyxDQUFDO1lBQzdCLFFBQUcsR0FBVyxjQUFjLENBQUM7WUFDN0IsUUFBRyxHQUFXLGNBQWMsQ0FBQztZQUM3QixRQUFHLEdBQVcsY0FBYyxDQUFDO1lBQzdCLFFBQUcsR0FBVyxjQUFjLENBQUM7WUFDN0IsUUFBRyxHQUFXLGNBQWMsQ0FBQztZQUM3QixRQUFHLEdBQVcsY0FBYyxDQUFDO1lBQzdCLFFBQUcsR0FBVyxjQUFjLENBQUM7WUFFN0IsUUFBRyxHQUFjLEVBQUUsQ0FBQztZQUNwQixRQUFHLEdBQWMsRUFBRSxDQUFDO1lBS3hCLGlFQUFpRTtZQUNqRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1lBQzFDLCtEQUErRDtZQUMvRCxJQUFJLHNCQUFzQixHQUE0QixJQUFJLCtDQUFzQixDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFaEgseUNBQXlDO1lBQ3pDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJ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LElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbEUsQ0FBQztRQUNMLGFBQUM7SUFBRCxDQUFDLEFBekhELElBeUhDO0lBekhZLHdCQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmlsaW5lYXJUcmFuc2Zvcm1hdGlvbiB9IGZyb20gXCIuL2JpbGluZWFyVHJhbnNmb3JtYXRpb25cIjtcclxuaW1wb3J0IHsgU3RhdGVTcGFjZUNhbGN1bGF0b3IgfSBmcm9tIFwiLi9zdGF0ZVNwYWNlQ2FsY3VsYXRvclwiO1xyXG4gICBcclxuZXhwb3J0IGNsYXNzIEJlc3NlbCBpbXBsZW1lbnRzIElMb3dQYXNzRmlsdGVye1xyXG4gICAgXHJcbiAgICAvKiBGcmVxdWVuY3kgc2NhbGluZyBmYWN0b3JzIGZvciBiZXNzZWwgZmlsdGVyICovXHJcbiAgICBwcml2YXRlIEtCMiA6bnVtYmVyID0gMS4yNzI7XHJcbiAgICBwcml2YXRlIEtCMyA6bnVtYmVyID0gMS40MDU7XHJcbiAgICBwcml2YXRlIEtCNCA6bnVtYmVyID0gMS41MTQ7XHJcbiAgICBwcml2YXRlIEtCNSA6bnVtYmVyID0gMS42MjI7XHJcblxyXG4gICAgLypDb2VmZmljaWVudHMgb2YgYSBub3JtYWxpc2VkIEJlc3NlbCBmaWx0ZXIqL1xyXG4gICAgcHJpdmF0ZSBCMjEgOm51bWJlciA9IDEuNzMyMDUwODA3NTg4O1xyXG4gICAgcHJpdmF0ZSBCMzEgOm51bWJlciA9IDIuNDMyODgwNzk4MzM5O1xyXG4gICAgcHJpdmF0ZSBCMzIgOm51bWJlciA9IDIuNDY2MjEyMDc0MzMwO1xyXG4gICAgcHJpdmF0ZSBCNDEgOm51bWJlciA9IDMuMTIzOTM5OTM2OTIwO1xyXG4gICAgcHJpdmF0ZSBCNDIgOm51bWJlciA9IDQuMzkxNTUwMzI4MzY4O1xyXG4gICAgcHJpdmF0ZSBCNDMgOm51bWJlciA9IDMuMjAxMDg1ODcyOTQzO1xyXG4gICAgcHJpdmF0ZSBCNTEgOm51bWJlciA9IDMuODEwNzAxMjA1MzQ5O1xyXG4gICAgcHJpdmF0ZSBCNTIgOm51bWJlciA9IDYuNzc2NjczNzE1Njc2O1xyXG4gICAgcHJpdmF0ZSBCNTMgOm51bWJlciA9IDYuODg2MzY3NjUyNDIzO1xyXG4gICAgcHJpdmF0ZSBCNTQgOm51bWJlciA9IDMuOTM2MjgzNDI3MDM1O1xyXG4gICBcclxuICAgIHByaXZhdGUgTnVtIDogbnVtYmVyW10gPSBbXTtcclxuICAgIHByaXZhdGUgRGVuIDogbnVtYmVyW10gPSBbXTtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBzdGF0ZVNwYWNlQ2FsY3VsYXRvciA6IFN0YXRlU3BhY2VDYWxjdWxhdG9yO1xyXG4gICAgICAgIFxyXG4gICAgY29uc3RydWN0b3Iob3JkZXI6bnVtYmVyLCBjdXRvZmZGcmVxdWVuY3lIejpudW1iZXIsIFRzOm51bWJlcil7XHJcbiAgICAgICAgLy8gaW5pdGlhbGl6ZSB0aGUgbnVtZXJhdG9yIGFuZCBkZW51bWVyYXRvciBmb3IgdGhlIGJlc3NlbCBmaWx0ZXJcclxuICAgICAgICB0aGlzLmluaXROdW1EZW4ob3JkZXIsIGN1dG9mZkZyZXF1ZW5jeUh6KTtcclxuICAgICAgICAvLyBjb252ZXJ0IHRoZSBwYXJhbWV0ZXJzIGludG8gdGhlIGRpc2NyZXRlIHRpbWUgc3lzdGVtIFwid29ybGRcIlxyXG4gICAgICAgIHZhciBiaWxpbmVhclRyYW5zZm9ybWF0aW9uIDogQmlsaW5lYXJUcmFuc2Zvcm1hdGlvbiA9IG5ldyBCaWxpbmVhclRyYW5zZm9ybWF0aW9uKG9yZGVyLCBUcywgdGhpcy5OdW0sIHRoaXMuRGVuKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBjcmVhdGUgYW5kIGluaXQgdGhlIHN0YXRlIHNwYWNlIG9iamVjdFxyXG4gICAgICAgIHRoaXMuc3RhdGVTcGFjZUNhbGN1bGF0b3IgPSBuZXcgU3RhdGVTcGFjZUNhbGN1bGF0b3Iob3JkZXIsIGJpbGluZWFyVHJhbnNmb3JtYXRpb24uYnosIGJpbGluZWFyVHJhbnNmb3JtYXRpb24uYXosIHRoaXMuTnVtWzBdLCB0aGlzLkRlblswXSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByaXZhdGUgaW5pdE51bURlbihvcmRlciA6IG51bWJlciwgY3V0b2ZmRnJlcXVlbmN5SHogOiBudW1iZXIpIC8qTVRGaWx0ZXJMb3dQYXNzX0Jlc3NlbCovIHtcclxuICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZTptYXgtZnVuYy1ib2R5LWxlbmd0aCAqLyAvLyBkaXNhYmxlZCBkdWUgdG8gc3dpdGNoIGNhc2VcclxuICAgICAgICB2YXIgd2MgOiBudW1iZXIgPSAyICogTWF0aC5QSSAqIGN1dG9mZkZyZXF1ZW5jeUh6OyBcclxuICAgICAgICBzd2l0Y2ggKG9yZGVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgIHRoaXMuTnVtWzBdID0gd2M7XHJcbiAgICAgICAgICAgIHRoaXMuTnVtWzFdID0gMDtcclxuICAgICAgICAgICAgdGhpcy5OdW1bMl0gPSAwO1xyXG4gICAgICAgICAgICB0aGlzLk51bVszXSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuTnVtWzRdID0gMDtcclxuICAgICAgICAgICAgdGhpcy5OdW1bNV0gPSAwO1xyXG4gICAgICAgICAgICB0aGlzLkRlblswXSA9IHdjO1xyXG4gICAgICAgICAgICB0aGlzLkRlblsxXSA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMuRGVuWzJdID0gMDtcclxuICAgICAgICAgICAgdGhpcy5EZW5bM10gPSAwO1xyXG4gICAgICAgICAgICB0aGlzLkRlbls0XSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuRGVuWzVdID0gMDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICB3YyA9IHdjICogdGhpcy5LQjI7XHJcbiAgICAgICAgICAgIHRoaXMuTnVtWzBdID0gTWF0aC5wb3cod2MsMik7XHJcbiAgICAgICAgICAgIHRoaXMuTnVtWzFdID0gMDtcclxuICAgICAgICAgICAgdGhpcy5OdW1bMl0gPSAwO1xyXG4gICAgICAgICAgICB0aGlzLk51bVszXSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuTnVtWzRdID0gMDtcclxuICAgICAgICAgICAgdGhpcy5OdW1bNV0gPSAwO1xyXG4gICAgICAgICAgICB0aGlzLkRlblswXSA9IE1hdGgucG93KHdjLDIpO1xyXG4gICAgICAgICAgICB0aGlzLkRlblsxXSA9IHRoaXMuQjIxICogd2M7XHJcbiAgICAgICAgICAgIHRoaXMuRGVuWzJdID0gMTtcclxuICAgICAgICAgICAgdGhpcy5EZW5bM10gPSAwO1xyXG4gICAgICAgICAgICB0aGlzLkRlbls0XSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuRGVuWzVdID0gMDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICB3YyA9IHdjICogdGhpcy5LQjM7XHJcbiAgICAgICAgICAgIHRoaXMuTnVtWzBdID0gTWF0aC5wb3cod2MsMyk7XHJcbiAgICAgICAgICAgIHRoaXMuTnVtWzFdID0gMDtcclxuICAgICAgICAgICAgdGhpcy5OdW1bMl0gPSAwO1xyXG4gICAgICAgICAgICB0aGlzLk51bVszXSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuTnVtWzRdID0gMDtcclxuICAgICAgICAgICAgdGhpcy5OdW1bNV0gPSAwO1xyXG4gICAgICAgICAgICB0aGlzLkRlblswXSA9IE1hdGgucG93KHdjLDMpO1xyXG4gICAgICAgICAgICB0aGlzLkRlblsxXSA9IHRoaXMuQjMyICogTWF0aC5wb3cod2MsMik7XHJcbiAgICAgICAgICAgIHRoaXMuRGVuWzJdID0gdGhpcy5CMzEgKiB3YztcclxuICAgICAgICAgICAgdGhpcy5EZW5bM10gPSAxO1xyXG4gICAgICAgICAgICB0aGlzLkRlbls0XSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuRGVuWzVdID0gMDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICB3YyA9IHdjICogdGhpcy5LQjQ7XHJcbiAgICAgICAgICAgIHRoaXMuTnVtWzBdID0gTWF0aC5wb3cod2MsNCk7XHJcbiAgICAgICAgICAgIHRoaXMuTnVtWzFdID0gMDtcclxuICAgICAgICAgICAgdGhpcy5OdW1bMl0gPSAwO1xyXG4gICAgICAgICAgICB0aGlzLk51bVszXSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuTnVtWzRdID0gMDtcclxuICAgICAgICAgICAgdGhpcy5OdW1bNV0gPSAwO1xyXG4gICAgICAgICAgICB0aGlzLkRlblswXSA9IE1hdGgucG93KHdjLDQpO1xyXG4gICAgICAgICAgICB0aGlzLkRlblsxXSA9IHRoaXMuQjQzICogTWF0aC5wb3cod2MsMyk7XHJcbiAgICAgICAgICAgIHRoaXMuRGVuWzJdID0gdGhpcy5CNDIgKiBNYXRoLnBvdyh3YywyKTtcclxuICAgICAgICAgICAgdGhpcy5EZW5bM10gPSB0aGlzLkI0MSAqIHdjO1xyXG4gICAgICAgICAgICB0aGlzLkRlbls0XSA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMuRGVuWzVdID0gMDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICB3YyA9IHdjICogdGhpcy5LQjU7XHJcbiAgICAgICAgICAgIHRoaXMuTnVtWzBdID0gTWF0aC5wb3cod2MsNSk7XHJcbiAgICAgICAgICAgIHRoaXMuTnVtWzFdID0gMDtcclxuICAgICAgICAgICAgdGhpcy5OdW1bMl0gPSAwO1xyXG4gICAgICAgICAgICB0aGlzLk51bVszXSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuTnVtWzRdID0gMDtcclxuICAgICAgICAgICAgdGhpcy5OdW1bNV0gPSAwO1xyXG4gICAgICAgICAgICB0aGlzLkRlblswXSA9IE1hdGgucG93KHdjLDUpO1xyXG4gICAgICAgICAgICB0aGlzLkRlblsxXSA9IHRoaXMuQjU0ICogTWF0aC5wb3cod2MsNCk7XHJcbiAgICAgICAgICAgIHRoaXMuRGVuWzJdID0gdGhpcy5CNTMgKiBNYXRoLnBvdyh3YywzKTtcclxuICAgICAgICAgICAgdGhpcy5EZW5bM10gPSB0aGlzLkI1MiAqIE1hdGgucG93KHdjLDIpO1xyXG4gICAgICAgICAgICB0aGlzLkRlbls0XSA9IHRoaXMuQjUxICogd2M7XHJcbiAgICAgICAgICAgIHRoaXMuRGVuWzVdID0gMTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qIHRzbGludDplbmFibGU6bWF4LWZ1bmMtYm9keS1sZW5ndGggKi9cclxuICAgIH1cclxuXHJcbiAgICBmaWx0ZXIoaW5wdXRTaWduYWwgOiBudW1iZXJbXSkgOiBudW1iZXJbXXtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZVNwYWNlQ2FsY3VsYXRvci5DbGNPdXRwdXRWZWN0b3IoaW5wdXRTaWduYWwpO1xyXG4gICAgfVxyXG59Il19