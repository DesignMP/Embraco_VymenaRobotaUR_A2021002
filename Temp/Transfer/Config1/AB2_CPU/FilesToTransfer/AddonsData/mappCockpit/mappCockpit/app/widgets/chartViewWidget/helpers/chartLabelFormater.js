define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ChartLabelFormater = /** @class */ (function () {
        function ChartLabelFormater() {
        }
        ChartLabelFormater.getXAxisLabelText = function (number, context, interval) {
            var numberWithoutExp = this.getTimeWithDecimalDigitsByInterval(number, interval);
            var width = context.measureText(numberWithoutExp).width;
            if (width >= 55) {
                return number.toExponential(3);
            }
            else {
                return numberWithoutExp;
            }
        };
        ChartLabelFormater.getYAxisLabelText = function (number, context, interval) {
            var formatedNumber = number.toFixed(3);
            var width = context.measureText(formatedNumber).width;
            if (width >= 55) {
                //let factor = Math.abs(number)/Math.abs(interval);
                var expText = number.toExponential(3);
                //console.log(factor);
                /*if(factor < 0.9){ // TODO: Also for intervals greater 0.001
                    expText = "0.000";
                }*/
                return expText;
            }
            else {
                if (interval < 0.001) {
                    var factor = Math.abs(number) / Math.abs(interval);
                    var expText = number.toExponential(3);
                    if (factor < 0.9) {
                        expText = "0.000";
                    }
                    return expText;
                }
                else {
                    return formatedNumber;
                }
            }
        };
        ChartLabelFormater.getTimeWithDecimalDigitsByInterval = function (number, interval) {
            var numberWithoutExp = number.toFixed(3);
            if (interval >= 0.010000) {
                if (interval >= 0.100000) {
                    if (interval >= 1.000000) {
                        numberWithoutExp = number.toFixed(0);
                    }
                    else {
                        numberWithoutExp = number.toFixed(1);
                    }
                }
                else {
                    numberWithoutExp = number.toFixed(2);
                }
            }
            return numberWithoutExp;
        };
        return ChartLabelFormater;
    }());
    exports.ChartLabelFormater = ChartLabelFormater;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRMYWJlbEZvcm1hdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0Vmlld1dpZGdldC9oZWxwZXJzL2NoYXJ0TGFiZWxGb3JtYXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFBQTtRQUFBO1FBMERBLENBQUM7UUF6RFUsb0NBQWlCLEdBQXhCLFVBQXlCLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUTtZQUU5QyxJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFFakYsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUN4RCxJQUFHLEtBQUssSUFBSSxFQUFFLEVBQUM7Z0JBQ1gsT0FBTyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2xDO2lCQUNHO2dCQUNBLE9BQU8sZ0JBQWdCLENBQUM7YUFDM0I7UUFDTCxDQUFDO1FBRU0sb0NBQWlCLEdBQXhCLFVBQXlCLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUTtZQUM5QyxJQUFJLGNBQWMsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ3RELElBQUcsS0FBSyxJQUFJLEVBQUUsRUFBQztnQkFDWCxtREFBbUQ7Z0JBQ25ELElBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RDLHNCQUFzQjtnQkFDdEI7O21CQUVHO2dCQUNILE9BQU8sT0FBTyxDQUFDO2FBQ2xCO2lCQUNHO2dCQUNBLElBQUcsUUFBUSxHQUFHLEtBQUssRUFBQztvQkFDaEIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUNqRCxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN0QyxJQUFHLE1BQU0sR0FBRyxHQUFHLEVBQUM7d0JBQ1osT0FBTyxHQUFHLE9BQU8sQ0FBQztxQkFDckI7b0JBQ0QsT0FBTyxPQUFPLENBQUM7aUJBQ2xCO3FCQUNHO29CQUNBLE9BQU8sY0FBYyxDQUFDO2lCQUN6QjthQUNKO1FBQ0wsQ0FBQztRQUVjLHFEQUFrQyxHQUFqRCxVQUFrRCxNQUFjLEVBQUUsUUFBUTtZQUN0RSxJQUFJLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekMsSUFBRyxRQUFRLElBQUksUUFBUSxFQUFDO2dCQUNwQixJQUFHLFFBQVEsSUFBSSxRQUFRLEVBQUM7b0JBQ3BCLElBQUcsUUFBUSxJQUFJLFFBQVEsRUFBQzt3QkFDcEIsZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDeEM7eUJBQ0c7d0JBQ0EsZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDeEM7aUJBQ0o7cUJBQ0c7b0JBQ0EsZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDeEM7YUFDSjtZQUNELE9BQU8sZ0JBQWdCLENBQUM7UUFDNUIsQ0FBQztRQUNMLHlCQUFDO0lBQUQsQ0FBQyxBQTFERCxJQTBEQztJQTFEWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQ2hhcnRMYWJlbEZvcm1hdGVye1xyXG4gICAgc3RhdGljIGdldFhBeGlzTGFiZWxUZXh0KG51bWJlciwgY29udGV4dCwgaW50ZXJ2YWwpe1xyXG5cclxuICAgICAgICBsZXQgbnVtYmVyV2l0aG91dEV4cCA9IHRoaXMuZ2V0VGltZVdpdGhEZWNpbWFsRGlnaXRzQnlJbnRlcnZhbChudW1iZXIsIGludGVydmFsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIGxldCB3aWR0aCA9IGNvbnRleHQubWVhc3VyZVRleHQobnVtYmVyV2l0aG91dEV4cCkud2lkdGg7ICBcclxuICAgICAgICBpZih3aWR0aCA+PSA1NSl7XHJcbiAgICAgICAgICAgIHJldHVybiBudW1iZXIudG9FeHBvbmVudGlhbCgzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bWJlcldpdGhvdXRFeHA7XHJcbiAgICAgICAgfVxyXG4gICAgfSAgXHJcblxyXG4gICAgc3RhdGljIGdldFlBeGlzTGFiZWxUZXh0KG51bWJlciwgY29udGV4dCwgaW50ZXJ2YWwpe1xyXG4gICAgICAgIGxldCBmb3JtYXRlZE51bWJlciA9IG51bWJlci50b0ZpeGVkKDMpO1xyXG4gICAgICAgIGxldCB3aWR0aCA9IGNvbnRleHQubWVhc3VyZVRleHQoZm9ybWF0ZWROdW1iZXIpLndpZHRoOyAgXHJcbiAgICAgICAgaWYod2lkdGggPj0gNTUpe1xyXG4gICAgICAgICAgICAvL2xldCBmYWN0b3IgPSBNYXRoLmFicyhudW1iZXIpL01hdGguYWJzKGludGVydmFsKTtcclxuICAgICAgICAgICAgbGV0IGV4cFRleHQgPSBudW1iZXIudG9FeHBvbmVudGlhbCgzKTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhmYWN0b3IpO1xyXG4gICAgICAgICAgICAvKmlmKGZhY3RvciA8IDAuOSl7IC8vIFRPRE86IEFsc28gZm9yIGludGVydmFscyBncmVhdGVyIDAuMDAxXHJcbiAgICAgICAgICAgICAgICBleHBUZXh0ID0gXCIwLjAwMFwiO1xyXG4gICAgICAgICAgICB9Ki9cclxuICAgICAgICAgICAgcmV0dXJuIGV4cFRleHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGlmKGludGVydmFsIDwgMC4wMDEpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGZhY3RvciA9IE1hdGguYWJzKG51bWJlcikvTWF0aC5hYnMoaW50ZXJ2YWwpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGV4cFRleHQgPSBudW1iZXIudG9FeHBvbmVudGlhbCgzKTtcclxuICAgICAgICAgICAgICAgIGlmKGZhY3RvciA8IDAuOSl7XHJcbiAgICAgICAgICAgICAgICAgICAgZXhwVGV4dCA9IFwiMC4wMDBcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBleHBUZXh0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybWF0ZWROdW1iZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0VGltZVdpdGhEZWNpbWFsRGlnaXRzQnlJbnRlcnZhbChudW1iZXI6IG51bWJlciwgaW50ZXJ2YWwpOiBzdHJpbmd7XHJcbiAgICAgICAgbGV0IG51bWJlcldpdGhvdXRFeHAgPSBudW1iZXIudG9GaXhlZCgzKTtcclxuICAgICAgICBpZihpbnRlcnZhbCA+PSAwLjAxMDAwMCl7XHJcbiAgICAgICAgICAgIGlmKGludGVydmFsID49IDAuMTAwMDAwKXtcclxuICAgICAgICAgICAgICAgIGlmKGludGVydmFsID49IDEuMDAwMDAwKXtcclxuICAgICAgICAgICAgICAgICAgICBudW1iZXJXaXRob3V0RXhwID0gbnVtYmVyLnRvRml4ZWQoMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIG51bWJlcldpdGhvdXRFeHAgPSBudW1iZXIudG9GaXhlZCgxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgbnVtYmVyV2l0aG91dEV4cCA9IG51bWJlci50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudW1iZXJXaXRob3V0RXhwO1xyXG4gICAgfVxyXG59Il19