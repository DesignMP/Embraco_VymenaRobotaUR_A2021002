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
define(["require", "exports", "../../../framework/events", "./eventSignalDataChangedArgs", "../point", "../../../common/persistence/settings", "./signalSettingIds"], function (require, exports, events_1, eventSignalDataChangedArgs_1, point_1, settings_1, signalSettingIds_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventDataChanged = /** @class */ (function (_super) {
        __extends(EventDataChanged, _super);
        function EventDataChanged() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventDataChanged;
    }(events_1.TypedEvent));
    ;
    var Signal = /** @class */ (function () {
        /**
         * Creates an instance of Signal.
         * @param {string} name
         * @param {Array<IPoint>} data
         * @memberof Signal
         */
        function Signal(name, data) {
            this.eventDataChanged = new EventDataChanged();
            this._name = name;
            // preserve original data points
            this._rawPoints = data;
            this.id = name + Signal.uniqueId;
            Signal.uniqueId++;
        }
        Object.defineProperty(Signal.prototype, "rawPointsValid", {
            get: function () {
                if (this._rawPoints.length < 2) {
                    return false;
                }
                return true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Signal.prototype, "name", {
            get: function () {
                return this._name;
            },
            set: function (value) {
                var oldName = this._name;
                this._name = value;
                this.onDataChanged(eventSignalDataChangedArgs_1.SignalAction.rename, oldName);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Signal.prototype, "rawPoints", {
            get: function () {
                return this._rawPoints;
            },
            set: function (points) {
                this._rawPoints = points;
                // Raise rawPoints changed event
                this.onDataChanged(eventSignalDataChangedArgs_1.SignalAction.dataPointsChanged, this._rawPoints);
            },
            enumerable: true,
            configurable: true
        });
        Signal.prototype.getSettings = function () {
            var points = new Array();
            for (var i = 0; i < this._rawPoints.length; i++) {
                var rawPoint = this._rawPoints[i];
                points.push(rawPoint.x + ";" + rawPoint.y);
            }
            var settings = new settings_1.Settings("Signal");
            settings.setValue(signalSettingIds_1.SettingIds.Name, this.name);
            settings.setValue(signalSettingIds_1.SettingIds.Points, points);
            return settings;
        };
        Signal.prototype.setSettings = function (settings) {
            var settingsObj = settings_1.Settings.create(settings);
            this.name = settingsObj.getValue(signalSettingIds_1.SettingIds.Name);
            var signalPoints = new Array();
            var points = settingsObj.getValue(signalSettingIds_1.SettingIds.Points);
            for (var i = 0; i < points.length; i++) {
                var rawPoint = points[i];
                var point = rawPoint.split(";");
                signalPoints.push(new point_1.Point(parseFloat(point[0]), parseFloat(point[1])));
            }
            this._rawPoints = signalPoints;
        };
        /**
         * Clones the signal
         *
         * @returns
         * @memberof Signal
         */
        Signal.prototype.clone = function () {
            var clonedSignal = new Signal(this._name, this.rawPoints);
            return clonedSignal;
        };
        /**
         * Raises the name changed event
         *
         * @private
         * @param {string} name
         * @memberof Signal
         */
        Signal.prototype.onDataChanged = function (action, data) {
            var eventArgs = new eventSignalDataChangedArgs_1.EventSignalDataChangedArgs(action, data);
            this.eventDataChanged.raise(this, eventArgs);
        };
        Signal.uniqueId = 0; // TODO use unique id (first recent data and latest have same id) => create unique id generator
        return Signal;
    }());
    exports.Signal = Signal;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvY29tbW9uL3NpZ25hbC9zaWduYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVNBO1FBQStCLG9DQUErQztRQUE5RTs7UUFBZ0YsQ0FBQztRQUFELHVCQUFDO0lBQUQsQ0FBQyxBQUFqRixDQUErQixtQkFBVSxHQUF3QztJQUFBLENBQUM7SUFFbEY7UUF1Q0k7Ozs7O1dBS0c7UUFDSCxnQkFBWSxJQUFZLEVBQUUsSUFBbUI7WUEzQzdDLHFCQUFnQixHQUFxQixJQUFJLGdCQUFnQixFQUFFLENBQUM7WUE0Q3hELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBRWxCLGdDQUFnQztZQUNoQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUV2QixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQ2pDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN0QixDQUFDO1FBMUNELHNCQUFXLGtDQUFjO2lCQUF6QjtnQkFDSSxJQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQztvQkFDMUIsT0FBTyxLQUFLLENBQUM7aUJBQ2hCO2dCQUNELE9BQU8sSUFBSSxDQUFDO1lBQ2hCLENBQUM7OztXQUFBO1FBRUQsc0JBQVcsd0JBQUk7aUJBQWY7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3RCLENBQUM7aUJBRUQsVUFBZ0IsS0FBYTtnQkFDekIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDekIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxhQUFhLENBQUMseUNBQVksQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDckQsQ0FB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c0NvbnRlbnQiOlsiaW1wb3J0IHsgSVNpZ25hbCB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3NpZ25hbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9wb2ludEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUeXBlZEV2ZW50IH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9ldmVudHNcIjtcclxuaW1wb3J0IHsgU2lnbmFsQWN0aW9uLCBFdmVudFNpZ25hbERhdGFDaGFuZ2VkQXJncyB9IGZyb20gXCIuL2V2ZW50U2lnbmFsRGF0YUNoYW5nZWRBcmdzXCI7XHJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4uL3BvaW50XCI7XHJcbmltcG9ydCB7IElTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGVyc2lzdGVuY2UvaW50ZXJmYWNlcy9zZXR0aW5nc0ludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGVyc2lzdGVuY2Uvc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgU2V0dGluZ0lkcyB9IGZyb20gXCIuL3NpZ25hbFNldHRpbmdJZHNcIjtcclxuXHJcbmNsYXNzIEV2ZW50RGF0YUNoYW5nZWQgZXh0ZW5kcyBUeXBlZEV2ZW50PElTaWduYWwsIEV2ZW50U2lnbmFsRGF0YUNoYW5nZWRBcmdzPnsgfTtcclxuXHJcbmV4cG9ydCBjbGFzcyBTaWduYWwgaW1wbGVtZW50cyBJU2lnbmFse1xyXG4gICAgICAgIFxyXG4gICAgZXZlbnREYXRhQ2hhbmdlZDogRXZlbnREYXRhQ2hhbmdlZCA9IG5ldyBFdmVudERhdGFDaGFuZ2VkKCk7XHJcbiAgICBcclxuICAgIHByaXZhdGUgX25hbWU6IHN0cmluZztcclxuICAgIHByaXZhdGUgX3Jhd1BvaW50czogQXJyYXk8SVBvaW50PjtcclxuXHJcbiAgICBwdWJsaWMgaWQ6IHN0cmluZztcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyB1bmlxdWVJZDogbnVtYmVyID0gMDsgLy8gVE9ETyB1c2UgdW5pcXVlIGlkIChmaXJzdCByZWNlbnQgZGF0YSBhbmQgbGF0ZXN0IGhhdmUgc2FtZSBpZCkgPT4gY3JlYXRlIHVuaXF1ZSBpZCBnZW5lcmF0b3JcclxuXHJcbiAgICBwdWJsaWMgZ2V0IHJhd1BvaW50c1ZhbGlkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmKHRoaXMuX3Jhd1BvaW50cy5sZW5ndGggPCAyKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgICAgIFxyXG4gICAgcHVibGljIGdldCBuYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBzZXQgbmFtZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IG9sZE5hbWUgPSB0aGlzLl9uYW1lO1xyXG4gICAgICAgIHRoaXMuX25hbWUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLm9uRGF0YUNoYW5nZWQoU2lnbmFsQWN0aW9uLnJlbmFtZSwgb2xkTmFtZSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBnZXQgcmF3UG9pbnRzKCk6IEFycmF5PElQb2ludD57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jhd1BvaW50cztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHJhd1BvaW50cyhwb2ludHM6IEFycmF5PElQb2ludD4pe1xyXG4gICAgICAgIHRoaXMuX3Jhd1BvaW50cyA9IHBvaW50cztcclxuICAgICAgICBcclxuICAgICAgICAvLyBSYWlzZSByYXdQb2ludHMgY2hhbmdlZCBldmVudFxyXG4gICAgICAgIHRoaXMub25EYXRhQ2hhbmdlZChTaWduYWxBY3Rpb24uZGF0YVBvaW50c0NoYW5nZWQsIHRoaXMuX3Jhd1BvaW50cylcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgU2lnbmFsLlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SVBvaW50Pn0gZGF0YVxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIGRhdGE6IEFycmF5PElQb2ludD4pe1xyXG4gICAgICAgIHRoaXMuX25hbWUgPSBuYW1lO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHByZXNlcnZlIG9yaWdpbmFsIGRhdGEgcG9pbnRzXHJcbiAgICAgICAgdGhpcy5fcmF3UG9pbnRzID0gZGF0YTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmlkID0gbmFtZSArIFNpZ25hbC51bmlxdWVJZDtcclxuICAgICAgICBTaWduYWwudW5pcXVlSWQrKztcclxuICAgIH1cclxuXHJcbiAgICBnZXRTZXR0aW5ncygpOiBJU2V0dGluZ3N7XHJcbiAgICAgICAgbGV0IHBvaW50cyA9IG5ldyBBcnJheTxzdHJpbmc+KCk7XHJcbiAgICAgICAgZm9yKGxldCBpID0wOyBpIDwgdGhpcy5fcmF3UG9pbnRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IHJhd1BvaW50ID0gdGhpcy5fcmF3UG9pbnRzW2ldO1xyXG4gICAgICAgICAgICBwb2ludHMucHVzaChyYXdQb2ludC54ICsgXCI7XCIgKyByYXdQb2ludC55KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHNldHRpbmdzID0gbmV3IFNldHRpbmdzKFwiU2lnbmFsXCIpO1xyXG4gICAgICAgIHNldHRpbmdzLnNldFZhbHVlKFNldHRpbmdJZHMuTmFtZSwgdGhpcy5uYW1lKTtcclxuICAgICAgICBzZXR0aW5ncy5zZXRWYWx1ZShTZXR0aW5nSWRzLlBvaW50cywgcG9pbnRzKTtcclxuICAgICAgICByZXR1cm4gc2V0dGluZ3M7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHNldFNldHRpbmdzKHNldHRpbmdzOiBJU2V0dGluZ3Mpe1xyXG4gICAgICAgIGxldCBzZXR0aW5nc09iaiA9IFNldHRpbmdzLmNyZWF0ZShzZXR0aW5ncyk7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gc2V0dGluZ3NPYmouZ2V0VmFsdWUoU2V0dGluZ0lkcy5OYW1lKTtcclxuICAgICAgICBsZXQgc2lnbmFsUG9pbnRzID0gbmV3IEFycmF5PElQb2ludD4oKTtcclxuICAgICAgICBsZXQgcG9pbnRzID0gc2V0dGluZ3NPYmouZ2V0VmFsdWUoU2V0dGluZ0lkcy5Qb2ludHMpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBwb2ludHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgcmF3UG9pbnQ6IHN0cmluZyA9IHBvaW50c1tpXTtcclxuICAgICAgICAgICAgbGV0IHBvaW50ID0gcmF3UG9pbnQuc3BsaXQoXCI7XCIpO1xyXG4gICAgICAgICAgICBzaWduYWxQb2ludHMucHVzaChuZXcgUG9pbnQocGFyc2VGbG9hdChwb2ludFswXSksIHBhcnNlRmxvYXQocG9pbnRbMV0pKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3Jhd1BvaW50cyA9IHNpZ25hbFBvaW50cztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENsb25lcyB0aGUgc2lnbmFsXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxcclxuICAgICAqL1xyXG4gICAgY2xvbmUoKTogU2lnbmFse1xyXG4gICAgICAgIGxldCBjbG9uZWRTaWduYWwgPSBuZXcgU2lnbmFsKHRoaXMuX25hbWUsIHRoaXMucmF3UG9pbnRzKTtcclxuICAgICAgICByZXR1cm4gY2xvbmVkU2lnbmFsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmFpc2VzIHRoZSBuYW1lIGNoYW5nZWQgZXZlbnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbkRhdGFDaGFuZ2VkKGFjdGlvbjogU2lnbmFsQWN0aW9uLCBkYXRhOiBhbnkpIHtcclxuICAgICAgICBsZXQgZXZlbnRBcmdzID0gbmV3IEV2ZW50U2lnbmFsRGF0YUNoYW5nZWRBcmdzKGFjdGlvbiwgZGF0YSk7XHJcbiAgICAgICAgdGhpcy5ldmVudERhdGFDaGFuZ2VkLnJhaXNlKHRoaXMsIGV2ZW50QXJncyk7XHJcbiAgICB9XHJcbn0iXX0=