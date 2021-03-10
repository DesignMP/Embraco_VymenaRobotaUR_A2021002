define(["require", "exports", "./calculators/addCalculator", "./calculators/subCalculator", "./calculators/mulCalculator", "./calculators/diffCalculator", "./calculators/lpBesselCalculator", "./calculators/xyCalculator", "./calculators/expCalculator", "./calculators/absCalculator", "./calculators/limitCalculator", "./calculators/sqrtCalculator", "./calculators/vectCalculator", "./calculators/maxCalculator", "./calculators/minCalculator", "./calculators/fftCalculator", "./calculators/sinCalculator", "./calculators/cosCalculator", "./calculators/atan2Calculator", "./calculators/timeStampSyncCalculator"], function (require, exports, addCalculator_1, subCalculator_1, mulCalculator_1, diffCalculator_1, lpBesselCalculator_1, xyCalculator_1, expCalculator_1, absCalculator_1, limitCalculator_1, sqrtCalculator_1, vectCalculator_1, maxCalculator_1, minCalculator_1, fftCalculator_1, sinCalculator_1, cosCalculator_1, atan2Calculator_1, timeStampSyncCalculator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CalculatorProvider = /** @class */ (function () {
        function CalculatorProvider() {
            this.calculators = new Array();
            this.calculators.push(new addCalculator_1.AddCalculator());
            this.calculators.push(new subCalculator_1.SubCalculator());
            this.calculators.push(new mulCalculator_1.MulCalculator());
            this.calculators.push(new diffCalculator_1.DiffCalculator());
            this.calculators.push(new expCalculator_1.ExpCalculator());
            this.calculators.push(new sqrtCalculator_1.SqrtCalculator());
            this.calculators.push(new vectCalculator_1.VectCalculator());
            this.calculators.push(new absCalculator_1.AbsCalculator());
            this.calculators.push(new maxCalculator_1.MaxCalculator());
            this.calculators.push(new minCalculator_1.MinCalculator());
            this.calculators.push(new limitCalculator_1.LimitCalculator);
            //this.calculators.push(new LpButterworthCalculator());
            this.calculators.push(new lpBesselCalculator_1.LpBesselCalculator());
            this.calculators.push(new xyCalculator_1.XYCalculator());
            this.calculators.push(new fftCalculator_1.FftCalculator());
            this.calculators.push(new sinCalculator_1.SinCalculator());
            this.calculators.push(new cosCalculator_1.CosCalculator());
            this.calculators.push(new atan2Calculator_1.Atan2Calculator());
            this.calculators.push(new timeStampSyncCalculator_1.TimeStampSyncCalculator());
        }
        /**
         * gets a singleton instance of UiCalculatorProvider
         *
         * @readonly
         * @type {UiCalculatorProvider}
         * @memberof UiCalculatorProvider
         */
        CalculatorProvider.getInstance = function () {
            this._instance = this._instance ? this._instance : new CalculatorProvider();
            return this._instance;
        };
        /**
         * Returns a calculator instance for the given id
         *
         * @param {string} id
         * @returns {(IUiCalculator|undefined)}
         * @memberof UiCalculatorProvider
         */
        CalculatorProvider.prototype.getCalculator = function (id) {
            var result = this.calculators.filter(function (element) {
                return element.displayName == id; // TODO: change to id
            });
            if (result.length > 0) {
                return result[0];
            }
            return undefined; // TODO: Return Dummy
        };
        return CalculatorProvider;
    }());
    exports.CalculatorProvider = CalculatorProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsY3VsYXRvclByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdG9yUHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBcUJBO1FBR0k7WUFGTyxnQkFBVyxHQUFHLElBQUksS0FBSyxFQUFlLENBQUM7WUFHMUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSw2QkFBYSxFQUFFLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLDZCQUFhLEVBQUUsQ0FBQyxDQUFDO1lBQzNDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksNkJBQWEsRUFBRSxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSwrQkFBYyxFQUFFLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLDZCQUFhLEVBQUUsQ0FBQyxDQUFDO1lBQzNDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksK0JBQWMsRUFBRSxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSwrQkFBYyxFQUFFLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLDZCQUFhLEVBQUUsQ0FBQyxDQUFDO1lBQzNDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksNkJBQWEsRUFBRSxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSw2QkFBYSxFQUFFLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLGlDQUFlLENBQUMsQ0FBQztZQUMzQyx1REFBdUQ7WUFDdkQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSx1Q0FBa0IsRUFBRSxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSwyQkFBWSxFQUFFLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLDZCQUFhLEVBQUUsQ0FBQyxDQUFDO1lBQzNDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksNkJBQWEsRUFBRSxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSw2QkFBYSxFQUFFLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLGlDQUFlLEVBQUUsQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksaURBQXVCLEVBQUUsQ0FBQyxDQUFDO1FBQ3pELENBQUM7UUFLRDs7Ozs7O1dBTUc7UUFDVyw4QkFBVyxHQUF6QjtZQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxrQkFBa0IsRUFBRSxDQUFDO1lBRTVFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMxQixDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0gsMENBQWEsR0FBYixVQUFjLEVBQVU7WUFDcEIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsVUFBUyxPQUFPO2dCQUNqRCxPQUFPLE9BQU8sQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDLENBQUMscUJBQXFCO1lBQ3pELENBQUMsQ0FBQyxDQUFDO1lBQ0wsSUFBRyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQztnQkFDakIsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDcEI7WUFDRCxPQUFPLFNBQVMsQ0FBQyxDQUFDLHFCQUFxQjtRQUMzQyxDQUFDO1FBQ0wseUJBQUM7SUFBRCxDQUFDLEFBekRELElBeURDO0lBekRZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFkZENhbGN1bGF0b3IgfSBmcm9tIFwiLi9jYWxjdWxhdG9ycy9hZGRDYWxjdWxhdG9yXCI7XHJcbmltcG9ydCB7IFN1YkNhbGN1bGF0b3IgfSBmcm9tIFwiLi9jYWxjdWxhdG9ycy9zdWJDYWxjdWxhdG9yXCI7XHJcbmltcG9ydCB7IE11bENhbGN1bGF0b3IgfSBmcm9tIFwiLi9jYWxjdWxhdG9ycy9tdWxDYWxjdWxhdG9yXCI7XHJcbmltcG9ydCB7IERpZmZDYWxjdWxhdG9yIH0gZnJvbSBcIi4vY2FsY3VsYXRvcnMvZGlmZkNhbGN1bGF0b3JcIjtcclxuLy9pbXBvcnQgeyBMcEJ1dHRlcndvcnRoQ2FsY3VsYXRvciB9IGZyb20gXCIuL2NhbGN1bGF0b3JzL2xwQnV0dGVyd29ydGhDYWxjdWxhdG9yXCI7XHJcbmltcG9ydCB7IExwQmVzc2VsQ2FsY3VsYXRvciB9IGZyb20gXCIuL2NhbGN1bGF0b3JzL2xwQmVzc2VsQ2FsY3VsYXRvclwiO1xyXG5pbXBvcnQgeyBJQ2FsY3VsYXRvciB9IGZyb20gXCIuL2ludGVyZmFjZXMvY2FsY3VsYXRvckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBYWUNhbGN1bGF0b3IgfSBmcm9tIFwiLi9jYWxjdWxhdG9ycy94eUNhbGN1bGF0b3JcIjtcclxuaW1wb3J0IHsgRXhwQ2FsY3VsYXRvciB9IGZyb20gXCIuL2NhbGN1bGF0b3JzL2V4cENhbGN1bGF0b3JcIjtcclxuaW1wb3J0IHsgQWJzQ2FsY3VsYXRvciB9IGZyb20gXCIuL2NhbGN1bGF0b3JzL2Fic0NhbGN1bGF0b3JcIjtcclxuaW1wb3J0IHsgTGltaXRDYWxjdWxhdG9yIH0gZnJvbSBcIi4vY2FsY3VsYXRvcnMvbGltaXRDYWxjdWxhdG9yXCI7XHJcbmltcG9ydCB7IFNxcnRDYWxjdWxhdG9yIH0gZnJvbSBcIi4vY2FsY3VsYXRvcnMvc3FydENhbGN1bGF0b3JcIjtcclxuaW1wb3J0IHsgVmVjdENhbGN1bGF0b3IgfSBmcm9tIFwiLi9jYWxjdWxhdG9ycy92ZWN0Q2FsY3VsYXRvclwiO1xyXG5pbXBvcnQgeyBNYXhDYWxjdWxhdG9yIH0gZnJvbSBcIi4vY2FsY3VsYXRvcnMvbWF4Q2FsY3VsYXRvclwiO1xyXG5pbXBvcnQgeyBNaW5DYWxjdWxhdG9yIH0gZnJvbSBcIi4vY2FsY3VsYXRvcnMvbWluQ2FsY3VsYXRvclwiO1xyXG5pbXBvcnQgeyBGZnRDYWxjdWxhdG9yIH0gZnJvbSBcIi4vY2FsY3VsYXRvcnMvZmZ0Q2FsY3VsYXRvclwiO1xyXG5pbXBvcnQgeyBTaW5DYWxjdWxhdG9yIH0gZnJvbSBcIi4vY2FsY3VsYXRvcnMvc2luQ2FsY3VsYXRvclwiO1xyXG5pbXBvcnQgeyBDb3NDYWxjdWxhdG9yIH0gZnJvbSBcIi4vY2FsY3VsYXRvcnMvY29zQ2FsY3VsYXRvclwiO1xyXG5pbXBvcnQgeyBBdGFuMkNhbGN1bGF0b3IgfSBmcm9tIFwiLi9jYWxjdWxhdG9ycy9hdGFuMkNhbGN1bGF0b3JcIjtcclxuaW1wb3J0IHsgVGltZVN0YW1wU3luY0NhbGN1bGF0b3IgfSBmcm9tIFwiLi9jYWxjdWxhdG9ycy90aW1lU3RhbXBTeW5jQ2FsY3VsYXRvclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENhbGN1bGF0b3JQcm92aWRlcntcclxuICAgIHB1YmxpYyBjYWxjdWxhdG9ycyA9IG5ldyBBcnJheTxJQ2FsY3VsYXRvcj4oKTtcclxuXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdG9ycy5wdXNoKG5ldyBBZGRDYWxjdWxhdG9yKCkpO1xyXG4gICAgICAgIHRoaXMuY2FsY3VsYXRvcnMucHVzaChuZXcgU3ViQ2FsY3VsYXRvcigpKTtcclxuICAgICAgICB0aGlzLmNhbGN1bGF0b3JzLnB1c2gobmV3IE11bENhbGN1bGF0b3IoKSk7XHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdG9ycy5wdXNoKG5ldyBEaWZmQ2FsY3VsYXRvcigpKTtcclxuICAgICAgICB0aGlzLmNhbGN1bGF0b3JzLnB1c2gobmV3IEV4cENhbGN1bGF0b3IoKSk7XHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdG9ycy5wdXNoKG5ldyBTcXJ0Q2FsY3VsYXRvcigpKTtcclxuICAgICAgICB0aGlzLmNhbGN1bGF0b3JzLnB1c2gobmV3IFZlY3RDYWxjdWxhdG9yKCkpO1xyXG4gICAgICAgIHRoaXMuY2FsY3VsYXRvcnMucHVzaChuZXcgQWJzQ2FsY3VsYXRvcigpKTtcclxuICAgICAgICB0aGlzLmNhbGN1bGF0b3JzLnB1c2gobmV3IE1heENhbGN1bGF0b3IoKSk7XHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdG9ycy5wdXNoKG5ldyBNaW5DYWxjdWxhdG9yKCkpO1xyXG4gICAgICAgIHRoaXMuY2FsY3VsYXRvcnMucHVzaChuZXcgTGltaXRDYWxjdWxhdG9yKTtcclxuICAgICAgICAvL3RoaXMuY2FsY3VsYXRvcnMucHVzaChuZXcgTHBCdXR0ZXJ3b3J0aENhbGN1bGF0b3IoKSk7XHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdG9ycy5wdXNoKG5ldyBMcEJlc3NlbENhbGN1bGF0b3IoKSk7XHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdG9ycy5wdXNoKG5ldyBYWUNhbGN1bGF0b3IoKSk7XHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdG9ycy5wdXNoKG5ldyBGZnRDYWxjdWxhdG9yKCkpO1xyXG4gICAgICAgIHRoaXMuY2FsY3VsYXRvcnMucHVzaChuZXcgU2luQ2FsY3VsYXRvcigpKTtcclxuICAgICAgICB0aGlzLmNhbGN1bGF0b3JzLnB1c2gobmV3IENvc0NhbGN1bGF0b3IoKSk7XHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdG9ycy5wdXNoKG5ldyBBdGFuMkNhbGN1bGF0b3IoKSk7XHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdG9ycy5wdXNoKG5ldyBUaW1lU3RhbXBTeW5jQ2FsY3VsYXRvcigpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBob2xkcyBhbiBpbnN0YW5jZSBvZiB0aGlzIGNsYXNzXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IENhbGN1bGF0b3JQcm92aWRlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldHMgYSBzaW5nbGV0b24gaW5zdGFuY2Ugb2YgVWlDYWxjdWxhdG9yUHJvdmlkZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtVaUNhbGN1bGF0b3JQcm92aWRlcn1cclxuICAgICAqIEBtZW1iZXJvZiBVaUNhbGN1bGF0b3JQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IENhbGN1bGF0b3JQcm92aWRlciB7XHJcbiAgICAgICAgdGhpcy5faW5zdGFuY2UgPSB0aGlzLl9pbnN0YW5jZSA/IHRoaXMuX2luc3RhbmNlIDogbmV3IENhbGN1bGF0b3JQcm92aWRlcigpO1xyXG4gXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhIGNhbGN1bGF0b3IgaW5zdGFuY2UgZm9yIHRoZSBnaXZlbiBpZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAgICogQHJldHVybnMgeyhJVWlDYWxjdWxhdG9yfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgVWlDYWxjdWxhdG9yUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgZ2V0Q2FsY3VsYXRvcihpZDogc3RyaW5nKTogSUNhbGN1bGF0b3J8dW5kZWZpbmVke1xyXG4gICAgICAgIGxldCByZXN1bHQgPSB0aGlzLmNhbGN1bGF0b3JzLmZpbHRlcihmdW5jdGlvbihlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50LmRpc3BsYXlOYW1lID09IGlkOyAvLyBUT0RPOiBjaGFuZ2UgdG8gaWRcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIGlmKHJlc3VsdC5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFswXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDsgLy8gVE9ETzogUmV0dXJuIER1bW15XHJcbiAgICB9XHJcbn0iXX0=