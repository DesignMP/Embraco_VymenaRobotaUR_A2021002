define(["require", "exports", "./bilinearTransformation", "./stateSpaceCalculator"], function (require, exports, bilinearTransformation_1, stateSpaceCalculator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Butterworth = /** @class */ (function () {
        function Butterworth(order, cutoffFrequencyHz, Ts) {
            /*Coefficients of a normalised Butterworth filter*/
            this.P21 = 1.41421356;
            this.P31 = 2;
            this.P32 = 2;
            this.P41 = 2.61312592;
            this.P42 = 3.41421356;
            this.P43 = 2.61312592;
            this.P51 = 3.23606797;
            this.P52 = 5.23606797;
            this.P53 = 5.23606797;
            this.P54 = 3.23606797;
            this.Num = [];
            this.Den = [];
            // initialize the numerator and denumerator for the butterworth filter
            this.initNumDen(order, cutoffFrequencyHz);
            // convert the parameters into the discrete time system "world"
            var bilinearTransformation = new bilinearTransformation_1.BilinearTransformation(order, Ts, this.Num, this.Den);
            // create and init the state space object
            this.stateSpaceCalculator = new stateSpaceCalculator_1.StateSpaceCalculator(order, bilinearTransformation.bz, bilinearTransformation.az, this.Num[0], this.Den[0]);
        }
        Object.defineProperty(Butterworth, "filterOrderMax", {
            /**
             * Returns the highest supported filterorder.
             *
             * @readonly
             * @static
             * @type {number}
             * @memberof Butterworth
             */
            get: function () {
                return this._filterOrderMax;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Butterworth, "filterOrderMin", {
            /**
             * Returns the lowest supported filterorder.
             *
             * @readonly
             * @static
             * @type {number}
             * @memberof Butterworth
             */
            get: function () {
                return this._filterOrderMin;
            },
            enumerable: true,
            configurable: true
        });
        Butterworth.prototype.initNumDen = function (order, cutoffFrequencyHz) {
            /* tslint:disable:max-func-body-length */ // disabled due to switch case
            /* angular frequency calculation (rad/s) */
            var wc = 2 * Math.PI * cutoffFrequencyHz;
            /*calculation of terms in the transfer functions*/
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
                    this.Num[0] = Math.pow(wc, 2);
                    this.Num[1] = 0;
                    this.Num[2] = 0;
                    this.Num[3] = 0;
                    this.Num[4] = 0;
                    this.Num[5] = 0;
                    this.Den[0] = Math.pow(wc, 2);
                    this.Den[1] = this.P21 * wc;
                    this.Den[2] = 1;
                    this.Den[3] = 0;
                    this.Den[4] = 0;
                    this.Den[5] = 0;
                    break;
                case 3:
                    this.Num[0] = Math.pow(wc, 3);
                    this.Num[1] = 0;
                    this.Num[2] = 0;
                    this.Num[3] = 0;
                    this.Num[4] = 0;
                    this.Num[5] = 0;
                    this.Den[0] = Math.pow(wc, 3);
                    this.Den[1] = this.P32 * Math.pow(wc, 2);
                    this.Den[2] = this.P31 * wc;
                    this.Den[3] = 1;
                    this.Den[4] = 0;
                    this.Den[5] = 0;
                    break;
                case 4:
                    this.Num[0] = Math.pow(wc, 4);
                    this.Num[1] = 0;
                    this.Num[2] = 0;
                    this.Num[3] = 0;
                    this.Num[4] = 0;
                    this.Num[5] = 0;
                    this.Den[0] = Math.pow(wc, 4);
                    this.Den[1] = this.P43 * Math.pow(wc, 3);
                    this.Den[2] = this.P42 * Math.pow(wc, 2);
                    this.Den[3] = this.P41 * wc;
                    this.Den[4] = 1;
                    this.Den[5] = 0;
                    break;
                case 5:
                    this.Num[0] = Math.pow(wc, 5);
                    this.Num[1] = 0;
                    this.Num[2] = 0;
                    this.Num[3] = 0;
                    this.Num[4] = 0;
                    this.Num[5] = 0;
                    this.Den[0] = Math.pow(wc, 5);
                    this.Den[1] = this.P54 * Math.pow(wc, 4);
                    this.Den[2] = this.P53 * Math.pow(wc, 3);
                    this.Den[3] = this.P52 * Math.pow(wc, 2);
                    this.Den[4] = this.P51 * wc;
                    this.Den[5] = 1;
                    break;
            }
            /* tslint:enable:max-func-body-length */
        };
        Butterworth.prototype.filter = function (inputSignal) {
            return this.stateSpaceCalculator.ClcOutputVector(inputSignal);
        };
        Butterworth._filterOrderMin = 1;
        Butterworth._filterOrderMax = 5;
        return Butterworth;
    }());
    exports.Butterworth = Butterworth;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dGVyd29ydGguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9jb21tb24vY2FsY3VsYXRvclByb3ZpZGVyL2NhbGN1bGF0b3JzL2ZpbHRlcnMvYnV0dGVyd29ydGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBR0E7UUE4Q0kscUJBQVksS0FBWSxFQUFFLGlCQUF3QixFQUFFLEVBQVM7WUFqQjdELG1EQUFtRDtZQUMzQyxRQUFHLEdBQVcsVUFBVSxDQUFDO1lBQ3pCLFFBQUcsR0FBVyxDQUFDLENBQUM7WUFDaEIsUUFBRyxHQUFXLENBQUMsQ0FBQztZQUNoQixRQUFHLEdBQVcsVUFBVSxDQUFDO1lBQ3pCLFFBQUcsR0FBVyxVQUFVLENBQUM7WUFDekIsUUFBRyxHQUFXLFVBQVUsQ0FBQztZQUN6QixRQUFHLEdBQVcsVUFBVSxDQUFDO1lBQ3pCLFFBQUcsR0FBVyxVQUFVLENBQUM7WUFDekIsUUFBRyxHQUFXLFVBQVUsQ0FBQztZQUN6QixRQUFHLEdBQVcsVUFBVSxDQUFDO1lBRXpCLFFBQUcsR0FBYyxFQUFFLENBQUM7WUFDcEIsUUFBRyxHQUFjLEVBQUUsQ0FBQztZQUt4QixzRUFBc0U7WUFDdEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztZQUMxQywrREFBK0Q7WUFDL0QsSUFBSSxzQkFBc0IsR0FBNEIsSUFBSSwrQ0FBc0IsQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRWhILHlDQUF5QztZQUN6QyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSwyQ0FBb0IsQ0FBQyxLQUFLLEVBQUUsc0JBQXNCLENBQUMsRUFBRSxFQUFFLHNCQUFzQixDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoSixDQUFDO1FBekNELHNCQUFrQiw2QkFBYztZQVJoQzs7Ozs7OztlQU9HO2lCQUNIO2dCQUNJLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztZQUNoQyxDQUFDOzs7V0FBQTtRQVVELHNCQUFrQiw2QkFBYztZQVJoQzs7Ozs7OztlQU9HO2lCQUNIO2dCQUNJLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztZQUNoQyxDQUFDOzs7V0FBQTtRQTZCTyxnQ0FBVSxHQUFsQixVQUFtQixLQUFjLEVBQUUsaUJBQTBCO1lBQ3pELHlDQUF5QyxDQUFDLDhCQUE4QjtZQUV4RSwyQ0FBMkM7WUFDM0MsSUFBSSxFQUFFLEdBQVksQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsaUJBQWlCLENBQUM7WUFFbEQsa0RBQWtEO1lBQ2xELFFBQVEsS0FBSyxFQUNiO2dCQUNJLEtBQUssQ0FBQztvQkFDRixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztvQkFDakIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNoQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDaEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNoQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztvQkFDakIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNoQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDaEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNoQixNQUFNO2dCQUNWLEtBQUssQ0FBQztvQkFDRixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM3QixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDaEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNoQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDaEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzdCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7b0JBQzVCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNoQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDaEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNoQixNQUFNO2dCQUNWLEtBQUssQ0FBQztvQkFDRixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM3QixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDaEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNoQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDaEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzdCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsQ0FBQztvQkFDeEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztvQkFDNUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNoQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDaEIsTUFBTTtnQkFDVixLQUFLLENBQUM7b0JBQ0YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsQ0FBQztvQkFDN0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNoQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDaEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNoQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM3QixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3hDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsQ0FBQztvQkFDeEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztvQkFDNUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNoQixNQUFNO2dCQUNWLEtBQUssQ0FBQztvQkFDRixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM3QixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDaEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNoQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDaEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzdCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsQ0FBQztvQkFDeEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN4QyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3hDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7b0JBQzVCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNoQixNQUFNO2FBQ2I7WUFDRCx3Q0FBd0M7UUFDNUMsQ0FBQztRQUVELDRCQUFNLEdBQU4sVUFBTyxXQUFzQjtZQUN6QixPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbEUsQ0FBQztRQTNJdUIsMkJBQWUsR0FBVyxDQUFDLENBQUM7UUFDNUIsMkJBQWUsR0FBVyxDQUFDLENBQUM7UUEySXhELGtCQUFDO0tBQUEsQUE5SUQsSUE4SUM7SUE5SVksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCaWxpbmVhclRyYW5zZm9ybWF0aW9uIH0gZnJvbSBcIi4vYmlsaW5lYXJUcmFuc2Zvcm1hdGlvblwiO1xyXG5pbXBvcnQgeyBTdGF0ZVNwYWNlQ2FsY3VsYXRvciB9IGZyb20gXCIuL3N0YXRlU3BhY2VDYWxjdWxhdG9yXCI7XHJcbiAgIFxyXG5leHBvcnQgY2xhc3MgQnV0dGVyd29ydGggaW1wbGVtZW50cyBJTG93UGFzc0ZpbHRlcntcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX2ZpbHRlck9yZGVyTWluOiBudW1iZXIgPSAxO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX2ZpbHRlck9yZGVyTWF4OiBudW1iZXIgPSA1O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgaGlnaGVzdCBzdXBwb3J0ZWQgZmlsdGVyb3JkZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIEJ1dHRlcndvcnRoXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IGZpbHRlck9yZGVyTWF4KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpbHRlck9yZGVyTWF4O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgbG93ZXN0IHN1cHBvcnRlZCBmaWx0ZXJvcmRlci5cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgQnV0dGVyd29ydGhcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgZmlsdGVyT3JkZXJNaW4oKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZmlsdGVyT3JkZXJNaW47XHJcbiAgICB9XHJcblxyXG4gICAgLypDb2VmZmljaWVudHMgb2YgYSBub3JtYWxpc2VkIEJ1dHRlcndvcnRoIGZpbHRlciovXHJcbiAgICBwcml2YXRlIFAyMSA6bnVtYmVyID0gMS40MTQyMTM1NjtcclxuICAgIHByaXZhdGUgUDMxIDpudW1iZXIgPSAyO1xyXG4gICAgcHJpdmF0ZSBQMzIgOm51bWJlciA9IDI7XHJcbiAgICBwcml2YXRlIFA0MSA6bnVtYmVyID0gMi42MTMxMjU5MjtcclxuICAgIHByaXZhdGUgUDQyIDpudW1iZXIgPSAzLjQxNDIxMzU2O1xyXG4gICAgcHJpdmF0ZSBQNDMgOm51bWJlciA9IDIuNjEzMTI1OTI7XHJcbiAgICBwcml2YXRlIFA1MSA6bnVtYmVyID0gMy4yMzYwNjc5NztcclxuICAgIHByaXZhdGUgUDUyIDpudW1iZXIgPSA1LjIzNjA2Nzk3O1xyXG4gICAgcHJpdmF0ZSBQNTMgOm51bWJlciA9IDUuMjM2MDY3OTc7XHJcbiAgICBwcml2YXRlIFA1NCA6bnVtYmVyID0gMy4yMzYwNjc5NztcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBOdW0gOiBudW1iZXJbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBEZW4gOiBudW1iZXJbXSA9IFtdO1xyXG4gICAgXHJcbiAgICBwcml2YXRlIHN0YXRlU3BhY2VDYWxjdWxhdG9yIDogU3RhdGVTcGFjZUNhbGN1bGF0b3I7XHJcbiAgICAgICAgXHJcbiAgICBjb25zdHJ1Y3RvcihvcmRlcjpudW1iZXIsIGN1dG9mZkZyZXF1ZW5jeUh6Om51bWJlciwgVHM6bnVtYmVyKXtcclxuICAgICAgICAvLyBpbml0aWFsaXplIHRoZSBudW1lcmF0b3IgYW5kIGRlbnVtZXJhdG9yIGZvciB0aGUgYnV0dGVyd29ydGggZmlsdGVyXHJcbiAgICAgICAgdGhpcy5pbml0TnVtRGVuKG9yZGVyLCBjdXRvZmZGcmVxdWVuY3lIeik7XHJcbiAgICAgICAgLy8gY29udmVydCB0aGUgcGFyYW1ldGVycyBpbnRvIHRoZSBkaXNjcmV0ZSB0aW1lIHN5c3RlbSBcIndvcmxkXCJcclxuICAgICAgICB2YXIgYmlsaW5lYXJUcmFuc2Zvcm1hdGlvbiA6IEJpbGluZWFyVHJhbnNmb3JtYXRpb24gPSBuZXcgQmlsaW5lYXJUcmFuc2Zvcm1hdGlvbihvcmRlciwgVHMsIHRoaXMuTnVtLCB0aGlzLkRlbik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gY3JlYXRlIGFuZCBpbml0IHRoZSBzdGF0ZSBzcGFjZSBvYmplY3RcclxuICAgICAgICB0aGlzLnN0YXRlU3BhY2VDYWxjdWxhdG9yID0gbmV3IFN0YXRlU3BhY2VDYWxjdWxhdG9yKG9yZGVyLCBiaWxpbmVhclRyYW5zZm9ybWF0aW9uLmJ6LCBiaWxpbmVhclRyYW5zZm9ybWF0aW9uLmF6LCB0aGlzLk51bVswXSwgdGhpcy5EZW5bMF0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIGluaXROdW1EZW4ob3JkZXIgOiBudW1iZXIsIGN1dG9mZkZyZXF1ZW5jeUh6IDogbnVtYmVyKSAvKk1URmlsdGVyTG93UGFzc19CdXR0ZXJ3b3J0aCovIHtcclxuICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZTptYXgtZnVuYy1ib2R5LWxlbmd0aCAqLyAvLyBkaXNhYmxlZCBkdWUgdG8gc3dpdGNoIGNhc2VcclxuXHJcbiAgICAgICAgLyogYW5ndWxhciBmcmVxdWVuY3kgY2FsY3VsYXRpb24gKHJhZC9zKSAqL1xyXG4gICAgICAgIHZhciB3YyA6IG51bWJlciA9IDIgKiBNYXRoLlBJICogY3V0b2ZmRnJlcXVlbmN5SHo7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLypjYWxjdWxhdGlvbiBvZiB0ZXJtcyBpbiB0aGUgdHJhbnNmZXIgZnVuY3Rpb25zKi9cclxuICAgICAgICBzd2l0Y2ggKG9yZGVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5OdW1bMF0gPSB3YztcclxuICAgICAgICAgICAgICAgIHRoaXMuTnVtWzFdID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuTnVtWzJdID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuTnVtWzNdID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuTnVtWzRdID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuTnVtWzVdID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuRGVuWzBdID0gd2M7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkRlblsxXSA9IDE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkRlblsyXSA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkRlblszXSA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkRlbls0XSA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkRlbls1XSA9IDA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5OdW1bMF0gPSBNYXRoLnBvdyh3YywyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuTnVtWzFdID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuTnVtWzJdID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuTnVtWzNdID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuTnVtWzRdID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuTnVtWzVdID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuRGVuWzBdID0gTWF0aC5wb3cod2MsMik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkRlblsxXSA9IHRoaXMuUDIxICogd2M7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkRlblsyXSA9IDE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkRlblszXSA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkRlbls0XSA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkRlbls1XSA9IDA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5OdW1bMF0gPSBNYXRoLnBvdyh3YywzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuTnVtWzFdID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuTnVtWzJdID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuTnVtWzNdID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuTnVtWzRdID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuTnVtWzVdID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuRGVuWzBdID0gTWF0aC5wb3cod2MsMyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkRlblsxXSA9IHRoaXMuUDMyICogTWF0aC5wb3cod2MsMik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkRlblsyXSA9IHRoaXMuUDMxICogd2M7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkRlblszXSA9IDE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkRlbls0XSA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkRlbls1XSA9IDA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgdGhpcy5OdW1bMF0gPSBNYXRoLnBvdyh3Yyw0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuTnVtWzFdID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuTnVtWzJdID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuTnVtWzNdID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuTnVtWzRdID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuTnVtWzVdID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuRGVuWzBdID0gTWF0aC5wb3cod2MsNCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkRlblsxXSA9IHRoaXMuUDQzICogTWF0aC5wb3cod2MsMyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkRlblsyXSA9IHRoaXMuUDQyICogTWF0aC5wb3cod2MsMik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkRlblszXSA9IHRoaXMuUDQxICogd2M7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkRlbls0XSA9IDE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkRlbls1XSA9IDA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgdGhpcy5OdW1bMF0gPSBNYXRoLnBvdyh3Yyw1KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuTnVtWzFdID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuTnVtWzJdID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuTnVtWzNdID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuTnVtWzRdID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuTnVtWzVdID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuRGVuWzBdID0gTWF0aC5wb3cod2MsNSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkRlblsxXSA9IHRoaXMuUDU0ICogTWF0aC5wb3cod2MsNCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkRlblsyXSA9IHRoaXMuUDUzICogTWF0aC5wb3cod2MsMyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkRlblszXSA9IHRoaXMuUDUyICogTWF0aC5wb3cod2MsMik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkRlbls0XSA9IHRoaXMuUDUxICogd2M7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkRlbls1XSA9IDE7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgLyogdHNsaW50OmVuYWJsZTptYXgtZnVuYy1ib2R5LWxlbmd0aCAqL1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBmaWx0ZXIoaW5wdXRTaWduYWwgOiBudW1iZXJbXSkgOiBudW1iZXJbXXtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZVNwYWNlQ2FsY3VsYXRvci5DbGNPdXRwdXRWZWN0b3IoaW5wdXRTaWduYWwpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==