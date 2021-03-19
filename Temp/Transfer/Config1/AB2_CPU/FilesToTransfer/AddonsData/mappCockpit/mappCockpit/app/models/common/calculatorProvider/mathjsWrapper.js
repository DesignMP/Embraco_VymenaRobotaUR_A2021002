define(["require", "exports", "../../../libs/math/mathjs", "./calculators/filters/bessel", "./calculators/differential/diffVector"], function (require, exports, math, bessel_1, diffVector_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Wrapper singleton class for calculator to provide common functionalities only used in some cases with mathjs.
     *
     * @class MathjsRapper
     */
    var MathjsWrapper = /** @class */ (function () {
        /**
         * Constructor set by getInstance should create a singleton class.
         * Creates an instance of MathjsWrapper.
         * @memberof MathjsWrapper
         */
        function MathjsWrapper() {
            /**
             * Use the Bessel Calculator as typed mathjs function and returns filtered signal
             * @private
             * @param {Array<number>} inputSignalY
             * @param {number} sampleTime
             * @param {number} cutOffFrequency
             * @param {number} filterOrder
             * @returns {Array<number>}
             * @memberof MathjsWrapper
             */
            this.lpBessel = math.typed("BR_LP_Bessel", {
                'Array, number, number, number': function (inputSignalY, sampleTime, cutOffFrequency, filterOrder) {
                    if (isNaN(filterOrder) || filterOrder < bessel_1.Bessel.filterOrderMin || filterOrder > bessel_1.Bessel.filterOrderMax) {
                        //this.addError("Calculation Error: '" + filterOrder + "' is not defined or out of range (valid range 1-5)!");
                        return new Array();
                    }
                    var filter = new bessel_1.Bessel(filterOrder, cutOffFrequency, sampleTime);
                    return filter.filter(inputSignalY);
                }
            });
            /**
             * Use the diff Calculator as typed mathjs function
             * @private
             * @param {Array<number>} inputSignalX
             * @param {Array<number>} inputSignalY
             * @returns {Array<number>}
             * @memberof MathjsWrapper
            */
            this.diffSignal = math.typed("BR_Diff", {
                'Array, Array': function (inputSignalX, inputSignalY) {
                    return diffVector_1.DiffVector.diffCalculate(inputSignalX, inputSignalY);
                }
            });
            this._mathLibFn = math.create(math.all);
            this.setAdditionalCalculators();
        }
        ;
        /**
         *Runs the mathjs parse function with limited function pool
         *
         * @param {string} inputString
         * @returns {any} Returns a parse tree
         * @memberof MathjsWrapper
         */
        MathjsWrapper.prototype.limitedParse = function (inputString) {
            return this._limitedParse(inputString);
        };
        /**
         * gets a singleton instance of MathjsWrapper
         *
         * @public
         * @static
         * @type {MathjsWrapper}
         * @memberof MathjsWrapper
         */
        MathjsWrapper.getInstance = function () {
            if (MathjsWrapper._instance == undefined) {
                MathjsWrapper._instance = new MathjsWrapper();
            }
            return MathjsWrapper._instance;
        };
        MathjsWrapper.prototype.setAdditionalCalculators = function () {
            //Receive additional calculators
            this._mathLibFn.import({
                BR_LP_Bessel: this.lpBessel,
                BR_Diff: this.diffSignal,
            }, { override: true });
            //Evaluate and parse function for internal usage
            this._limitedParse = this._mathLibFn.parse;
            //Exclude functions with security risks for the user     
            this._mathLibFn.import({
                'import': function () { throw new Error('Function import is disabled'); },
                'createUnit': function () { throw new Error('Function createUnit is disabled'); },
                'evaluate': function () { throw new Error('Function evaluate is disabled'); },
                'parse': function () { throw new Error('Function parse is disabled'); },
                'simplify': function () { throw new Error('Function simplify is disabled'); },
                'derivative': function () { throw new Error('Function derivative is disabled'); }
            }, { override: true });
        };
        return MathjsWrapper;
    }());
    exports.MathjsWrapper = MathjsWrapper;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0aGpzV3JhcHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbW1vbi9jYWxjdWxhdG9yUHJvdmlkZXIvbWF0aGpzV3JhcHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFJQTs7OztPQUlHO0lBQ0g7UUFNSTs7OztXQUlHO1FBQ0g7WUFzREE7Ozs7Ozs7OztlQVNHO1lBQ0ssYUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFO2dCQUMxQywrQkFBK0IsRUFBRSxVQUFTLFlBQTJCLEVBQUUsVUFBa0IsRUFBRSxlQUF1QixFQUFFLFdBQW1CO29CQUVuSSxJQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxXQUFXLEdBQUcsZUFBTSxDQUFDLGNBQWMsSUFBSSxXQUFXLEdBQUcsZUFBTSxDQUFDLGNBQWMsRUFBRTt3QkFDakcsOEdBQThHO3dCQUM5RyxPQUFPLElBQUksS0FBSyxFQUFVLENBQUM7cUJBQzlCO29CQUVELElBQUksTUFBTSxHQUFXLElBQUksZUFBTSxDQUFDLFdBQVcsRUFBRSxlQUFlLEVBQUUsVUFBVSxDQUFDLENBQUM7b0JBQzFFLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDdkMsQ0FBQzthQUNKLENBQUMsQ0FBQztZQUVIOzs7Ozs7O2NBT0U7WUFDTSxlQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7Z0JBQ3ZDLGNBQWMsRUFBRSxVQUFTLFlBQTJCLEVBQUUsWUFBMkI7b0JBQzdFLE9BQU8sdUJBQVUsQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO2dCQUNoRSxDQUFDO2FBQ0osQ0FBQyxDQUFDO1lBeEZDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7UUFDcEMsQ0FBQztRQUFBLENBQUM7UUFFRjs7Ozs7O1dBTUc7UUFDSSxvQ0FBWSxHQUFuQixVQUFvQixXQUFtQjtZQUNuQyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDM0MsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDVyx5QkFBVyxHQUF6QjtZQUNJLElBQUcsYUFBYSxDQUFDLFNBQVMsSUFBSSxTQUFTLEVBQUM7Z0JBQ3BDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxhQUFhLEVBQUUsQ0FBQzthQUNqRDtZQUNELE9BQU8sYUFBYSxDQUFDLFNBQVMsQ0FBQztRQUNuQyxDQUFDO1FBRU8sZ0RBQXdCLEdBQWhDO1lBRUksZ0NBQWdDO1lBQ2hDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO2dCQUNuQixZQUFZLEVBQUUsSUFBSSxDQUFDLFFBQVE7Z0JBQzNCLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVTthQUMzQixFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFFdkIsZ0RBQWdEO1lBQ2hELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7WUFFM0MseURBQXlEO1lBQ3pELElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO2dCQUNuQixRQUFRLEVBQU0sY0FBYyxNQUFNLElBQUksS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQUEsQ0FBQyxDQUFDO2dCQUM1RSxZQUFZLEVBQUUsY0FBYyxNQUFNLElBQUksS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUEsQ0FBQyxDQUFDO2dCQUNoRixVQUFVLEVBQUksY0FBYyxNQUFNLElBQUksS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUEsQ0FBQyxDQUFDO2dCQUM5RSxPQUFPLEVBQU8sY0FBYyxNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUEsQ0FBQyxDQUFDO2dCQUMzRSxVQUFVLEVBQUksY0FBYyxNQUFNLElBQUksS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUEsQ0FBQyxDQUFDO2dCQUM5RSxZQUFZLEVBQUUsY0FBYyxNQUFNLElBQUksS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUEsQ0FBQyxDQUFDO2FBQ25GLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtRQUUxQixDQUFDO1FBc0NMLG9CQUFDO0lBQUQsQ0FBQyxBQXJHRCxJQXFHQztJQXJHWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIG1hdGggZnJvbSAgXCIuLi8uLi8uLi9saWJzL21hdGgvbWF0aGpzXCJcclxuaW1wb3J0IHsgQmVzc2VsIH0gZnJvbSBcIi4vY2FsY3VsYXRvcnMvZmlsdGVycy9iZXNzZWxcIjtcclxuaW1wb3J0IHsgRGlmZlZlY3RvciB9IGZyb20gXCIuL2NhbGN1bGF0b3JzL2RpZmZlcmVudGlhbC9kaWZmVmVjdG9yXCI7XHJcblxyXG4vKipcclxuICogV3JhcHBlciBzaW5nbGV0b24gY2xhc3MgZm9yIGNhbGN1bGF0b3IgdG8gcHJvdmlkZSBjb21tb24gZnVuY3Rpb25hbGl0aWVzIG9ubHkgdXNlZCBpbiBzb21lIGNhc2VzIHdpdGggbWF0aGpzLlxyXG4gKlxyXG4gKiBAY2xhc3MgTWF0aGpzUmFwcGVyXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTWF0aGpzV3JhcHBlciB7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBNYXRoanNXcmFwcGVyO1xyXG4gICAgcHJpdmF0ZSBfbWF0aExpYkZuOiBhbnk7XHJcbiAgICBwcml2YXRlIF9saW1pdGVkUGFyc2U6IGFueTsgIC8vTmVlZGVkIGluIGNhbGN1bGF0b3JzXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25zdHJ1Y3RvciBzZXQgYnkgZ2V0SW5zdGFuY2Ugc2hvdWxkIGNyZWF0ZSBhIHNpbmdsZXRvbiBjbGFzcy5cclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgTWF0aGpzV3JhcHBlci5cclxuICAgICAqIEBtZW1iZXJvZiBNYXRoanNXcmFwcGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5fbWF0aExpYkZuID0gbWF0aC5jcmVhdGUobWF0aC5hbGwpO1xyXG4gICAgICAgIHRoaXMuc2V0QWRkaXRpb25hbENhbGN1bGF0b3JzKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICpSdW5zIHRoZSBtYXRoanMgcGFyc2UgZnVuY3Rpb24gd2l0aCBsaW1pdGVkIGZ1bmN0aW9uIHBvb2xcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW5wdXRTdHJpbmcgXHJcbiAgICAgKiBAcmV0dXJucyB7YW55fSBSZXR1cm5zIGEgcGFyc2UgdHJlZVxyXG4gICAgICogQG1lbWJlcm9mIE1hdGhqc1dyYXBwZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGxpbWl0ZWRQYXJzZShpbnB1dFN0cmluZzogc3RyaW5nKSA6IGFueSB7ICAgIFxyXG4gICAgICAgIHJldHVybiB0aGlzLl9saW1pdGVkUGFyc2UoaW5wdXRTdHJpbmcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0cyBhIHNpbmdsZXRvbiBpbnN0YW5jZSBvZiBNYXRoanNXcmFwcGVyXHJcbiAgICAgKlxyXG4gICAgICogQHB1YmxpY1xyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHR5cGUge01hdGhqc1dyYXBwZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWF0aGpzV3JhcHBlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IE1hdGhqc1dyYXBwZXJ7XHJcbiAgICAgICAgaWYoTWF0aGpzV3JhcHBlci5faW5zdGFuY2UgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgTWF0aGpzV3JhcHBlci5faW5zdGFuY2UgPSBuZXcgTWF0aGpzV3JhcHBlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gTWF0aGpzV3JhcHBlci5faW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRBZGRpdGlvbmFsQ2FsY3VsYXRvcnMoKXtcclxuICAgICAgICBcclxuICAgICAgICAvL1JlY2VpdmUgYWRkaXRpb25hbCBjYWxjdWxhdG9yc1xyXG4gICAgICAgIHRoaXMuX21hdGhMaWJGbi5pbXBvcnQoe1xyXG4gICAgICAgICAgICBCUl9MUF9CZXNzZWw6IHRoaXMubHBCZXNzZWwsXHJcbiAgICAgICAgICAgIEJSX0RpZmY6IHRoaXMuZGlmZlNpZ25hbCxcclxuICAgICAgICB9LCB7IG92ZXJyaWRlOiB0cnVlIH0pO1xyXG5cclxuICAgICAgICAvL0V2YWx1YXRlIGFuZCBwYXJzZSBmdW5jdGlvbiBmb3IgaW50ZXJuYWwgdXNhZ2VcclxuICAgICAgICB0aGlzLl9saW1pdGVkUGFyc2UgPSB0aGlzLl9tYXRoTGliRm4ucGFyc2U7XHJcblxyXG4gICAgICAgIC8vRXhjbHVkZSBmdW5jdGlvbnMgd2l0aCBzZWN1cml0eSByaXNrcyBmb3IgdGhlIHVzZXIgICAgIFxyXG4gICAgICAgIHRoaXMuX21hdGhMaWJGbi5pbXBvcnQoe1xyXG4gICAgICAgICAgICAnaW1wb3J0JzogICAgIGZ1bmN0aW9uICgpIHsgdGhyb3cgbmV3IEVycm9yKCdGdW5jdGlvbiBpbXBvcnQgaXMgZGlzYWJsZWQnKSB9LFxyXG4gICAgICAgICAgICAnY3JlYXRlVW5pdCc6IGZ1bmN0aW9uICgpIHsgdGhyb3cgbmV3IEVycm9yKCdGdW5jdGlvbiBjcmVhdGVVbml0IGlzIGRpc2FibGVkJykgfSxcclxuICAgICAgICAgICAgJ2V2YWx1YXRlJzogICBmdW5jdGlvbiAoKSB7IHRocm93IG5ldyBFcnJvcignRnVuY3Rpb24gZXZhbHVhdGUgaXMgZGlzYWJsZWQnKSB9LFxyXG4gICAgICAgICAgICAncGFyc2UnOiAgICAgIGZ1bmN0aW9uICgpIHsgdGhyb3cgbmV3IEVycm9yKCdGdW5jdGlvbiBwYXJzZSBpcyBkaXNhYmxlZCcpIH0sXHJcbiAgICAgICAgICAgICdzaW1wbGlmeSc6ICAgZnVuY3Rpb24gKCkgeyB0aHJvdyBuZXcgRXJyb3IoJ0Z1bmN0aW9uIHNpbXBsaWZ5IGlzIGRpc2FibGVkJykgfSxcclxuICAgICAgICAgICAgJ2Rlcml2YXRpdmUnOiBmdW5jdGlvbiAoKSB7IHRocm93IG5ldyBFcnJvcignRnVuY3Rpb24gZGVyaXZhdGl2ZSBpcyBkaXNhYmxlZCcpIH1cclxuICAgICAgICB9LCB7IG92ZXJyaWRlOiB0cnVlIH0pXHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogVXNlIHRoZSBCZXNzZWwgQ2FsY3VsYXRvciBhcyB0eXBlZCBtYXRoanMgZnVuY3Rpb24gYW5kIHJldHVybnMgZmlsdGVyZWQgc2lnbmFsXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBpbnB1dFNpZ25hbFlcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzYW1wbGVUaW1lXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY3V0T2ZmRnJlcXVlbmN5XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZmlsdGVyT3JkZXJcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxudW1iZXI+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hdGhqc1dyYXBwZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBscEJlc3NlbCA9IG1hdGgudHlwZWQoXCJCUl9MUF9CZXNzZWxcIiwge1xyXG4gICAgICAgICdBcnJheSwgbnVtYmVyLCBudW1iZXIsIG51bWJlcic6IGZ1bmN0aW9uKGlucHV0U2lnbmFsWTogQXJyYXk8bnVtYmVyPiwgc2FtcGxlVGltZTogbnVtYmVyLCBjdXRPZmZGcmVxdWVuY3k6IG51bWJlciwgZmlsdGVyT3JkZXI6IG51bWJlcikgOiBBcnJheTxudW1iZXI+IHtcclxuXHJcbiAgICAgICAgICAgIGlmKGlzTmFOKGZpbHRlck9yZGVyKSB8fCBmaWx0ZXJPcmRlciA8IEJlc3NlbC5maWx0ZXJPcmRlck1pbiB8fCBmaWx0ZXJPcmRlciA+IEJlc3NlbC5maWx0ZXJPcmRlck1heCApe1xyXG4gICAgICAgICAgICAgICAgLy90aGlzLmFkZEVycm9yKFwiQ2FsY3VsYXRpb24gRXJyb3I6ICdcIiArIGZpbHRlck9yZGVyICsgXCInIGlzIG5vdCBkZWZpbmVkIG9yIG91dCBvZiByYW5nZSAodmFsaWQgcmFuZ2UgMS01KSFcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEFycmF5PG51bWJlcj4oKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGZpbHRlcjogQmVzc2VsID0gbmV3IEJlc3NlbChmaWx0ZXJPcmRlciwgY3V0T2ZmRnJlcXVlbmN5LCBzYW1wbGVUaW1lKTsgXHJcbiAgICAgICAgICAgIHJldHVybiBmaWx0ZXIuZmlsdGVyKGlucHV0U2lnbmFsWSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVc2UgdGhlIGRpZmYgQ2FsY3VsYXRvciBhcyB0eXBlZCBtYXRoanMgZnVuY3Rpb25cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IGlucHV0U2lnbmFsWFxyXG4gICAgICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBpbnB1dFNpZ25hbFlcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxudW1iZXI+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hdGhqc1dyYXBwZXJcclxuICAgICovXHJcbiAgICBwcml2YXRlIGRpZmZTaWduYWwgPSBtYXRoLnR5cGVkKFwiQlJfRGlmZlwiLCB7XHJcbiAgICAgICAgJ0FycmF5LCBBcnJheSc6IGZ1bmN0aW9uKGlucHV0U2lnbmFsWDogQXJyYXk8bnVtYmVyPiwgaW5wdXRTaWduYWxZOiBBcnJheTxudW1iZXI+KSA6IEFycmF5PG51bWJlcj4ge1xyXG4gICAgICAgICAgICByZXR1cm4gRGlmZlZlY3Rvci5kaWZmQ2FsY3VsYXRlKGlucHV0U2lnbmFsWCwgaW5wdXRTaWduYWxZKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSJdfQ==