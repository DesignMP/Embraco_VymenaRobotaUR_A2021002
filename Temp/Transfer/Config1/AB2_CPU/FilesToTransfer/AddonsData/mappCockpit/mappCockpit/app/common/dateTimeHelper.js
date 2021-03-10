define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DateTimeHelper = /** @class */ (function () {
        function DateTimeHelper() {
        }
        /**
         * Returns a formated datetime string for the given timestamp
         *
         * @static
         * @param {number} timestamp e.g. 1552925197000000
         * @returns e.g. "18.03.2019 17:06:37"
         * @memberof DateTimeHelper
         */
        DateTimeHelper.getDateTime = function (timestamp) {
            var date = new Date(timestamp / 1000); // divide by 1000 to get milliseconds
            var day = "0" + date.getDate();
            var month = "0" + (date.getMonth() + 1);
            var year = date.getFullYear();
            var hours = date.getHours();
            var minutes = "0" + date.getMinutes();
            var seconds = "0" + date.getSeconds();
            // Will display time in "15.11.2018 10:30:23" format
            return day.substr(-2) + '.' + month.substr(-2) + '.' + year + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        };
        return DateTimeHelper;
    }());
    exports.DateTimeHelper = DateTimeHelper;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZVRpbWVIZWxwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW1vbi9kYXRlVGltZUhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFBQTtRQUFBO1FBdUJBLENBQUM7UUF0Qkc7Ozs7Ozs7V0FPRztRQUNJLDBCQUFXLEdBQWxCLFVBQW1CLFNBQWlCO1lBRWhDLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLHFDQUFxQztZQUMxRSxJQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQy9CLElBQUksS0FBSyxHQUFHLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFFOUIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQzVCLElBQUksT0FBTyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDdEMsSUFBSSxPQUFPLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUV0QyxvREFBb0Q7WUFDcEQsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUksSUFBSSxHQUFHLEdBQUcsR0FBRyxLQUFLLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JJLENBQUM7UUFDTCxxQkFBQztJQUFELENBQUMsQUF2QkQsSUF1QkM7SUF2Qlksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgRGF0ZVRpbWVIZWxwZXIge1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgZm9ybWF0ZWQgZGF0ZXRpbWUgc3RyaW5nIGZvciB0aGUgZ2l2ZW4gdGltZXN0YW1wXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWVzdGFtcCBlLmcuIDE1NTI5MjUxOTcwMDAwMDBcclxuICAgICAqIEByZXR1cm5zIGUuZy4gXCIxOC4wMy4yMDE5IDE3OjA2OjM3XCJcclxuICAgICAqIEBtZW1iZXJvZiBEYXRlVGltZUhlbHBlclxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0RGF0ZVRpbWUodGltZXN0YW1wOiBudW1iZXIpe1xyXG5cclxuICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKHRpbWVzdGFtcC8xMDAwKTsgLy8gZGl2aWRlIGJ5IDEwMDAgdG8gZ2V0IG1pbGxpc2Vjb25kc1xyXG4gICAgICAgIHZhciBkYXkgPSBcIjBcIiArIGRhdGUuZ2V0RGF0ZSgpO1xyXG4gICAgICAgIHZhciBtb250aCA9IFwiMFwiICsgKGRhdGUuZ2V0TW9udGgoKSsxKTtcclxuICAgICAgICB2YXIgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcclxuXHJcbiAgICAgICAgdmFyIGhvdXJzID0gZGF0ZS5nZXRIb3VycygpO1xyXG4gICAgICAgIHZhciBtaW51dGVzID0gXCIwXCIgKyBkYXRlLmdldE1pbnV0ZXMoKTtcclxuICAgICAgICB2YXIgc2Vjb25kcyA9IFwiMFwiICsgZGF0ZS5nZXRTZWNvbmRzKCk7XHJcblxyXG4gICAgICAgIC8vIFdpbGwgZGlzcGxheSB0aW1lIGluIFwiMTUuMTEuMjAxOCAxMDozMDoyM1wiIGZvcm1hdFxyXG4gICAgICAgIHJldHVybiBkYXkuc3Vic3RyKC0yKSArICcuJyArIG1vbnRoLnN1YnN0cigtMikgKyAnLicgKyAgeWVhciArICcgJyArIGhvdXJzICsgJzonICsgbWludXRlcy5zdWJzdHIoLTIpICsgJzonICsgc2Vjb25kcy5zdWJzdHIoLTIpO1xyXG4gICAgfVxyXG59Il19