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
define(["require", "exports", "../../../models/dataModelBase", "../../../models/dataModelInterface"], function (require, exports, dataModelBase_1, dataModelInterface_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * implements the data model for the trace config timing settings
     *
     * @class TraceConfigDatapointsDataModel
     * @implements {ITraceConfigDatapointsDataModel}
     */
    var TraceConfigDatapointsDataModel = /** @class */ (function (_super) {
        __extends(TraceConfigDatapointsDataModel, _super);
        function TraceConfigDatapointsDataModel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * initializes the data model
         *
         * @memberof TraceConfigDatapointsDataModel
         */
        TraceConfigDatapointsDataModel.prototype.initialize = function () {
        };
        TraceConfigDatapointsDataModel.prototype.addDatapoint = function (index, datapoint) {
            if (this._data.length >= 32) {
                console.info("Only 32 datapoints are supported!");
                return;
            }
            if (this.dataPointAlreadyInList(datapoint)) {
                console.info("Datapoint already in list!");
                return;
            }
            if (index == -1 || index >= this._data.length) {
                // No index defined or after the end => add at the end
                this._data.push(datapoint);
            }
            else {
                this._data.splice(index, 0, datapoint);
            }
            var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, "componentParametersUpdated", this.data);
            this.onModelChanged(this, eventArgs);
        };
        TraceConfigDatapointsDataModel.prototype.replaceDatapoint = function (index, datapoint) {
            if (index >= this._data.length) {
                console.error("Cannot replace datapoint with index: " + index);
                return;
            }
            if (this.dataPointAlreadyInList(datapoint)) {
                console.info("Datapoint already in list!");
                return;
            }
            this._data.splice(index, 1, datapoint);
            var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, "componentParametersUpdated", this.data);
            this.onModelChanged(this, eventArgs);
        };
        TraceConfigDatapointsDataModel.prototype.removeDatapoints = function (indexList) {
            for (var i = 0; i < indexList.length; i++) {
                this._data.splice(indexList[i], 1);
                console.log("removed datapoint index: " + indexList[i]);
            }
            var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, "componentParametersUpdated", this.data);
            this.onModelChanged(this, eventArgs);
        };
        Object.defineProperty(TraceConfigDatapointsDataModel.prototype, "initData", {
            set: function (datapointParameters) {
                this.data = datapointParameters;
                var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, "componentParametersUpdated", this.data);
                this.onModelChanged(this, eventArgs);
            },
            enumerable: true,
            configurable: true
        });
        TraceConfigDatapointsDataModel.prototype.dataPointAlreadyInList = function (dataPoint) {
            if (!this.isDataPointAnEmptyLine(dataPoint)) {
                for (var i = 0; i < this._data.length; i++) {
                    if (this._data[i].dataPointName === dataPoint.dataPointName) {
                        return true;
                    }
                }
            }
            return false;
        };
        TraceConfigDatapointsDataModel.prototype.isDataPointAnEmptyLine = function (dataPoint) {
            if (dataPoint.dataPointName == undefined || dataPoint.dataPointName == "") {
                return true;
            }
            return false;
        };
        return TraceConfigDatapointsDataModel;
    }(dataModelBase_1.DataModelBase));
    exports.TraceConfigDatapointsDataModel = TraceConfigDatapointsDataModel;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VDb25maWdEYXRhcG9pbnRzRGF0YU1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3RyYWNlQ29uZmlnRGF0YXBvaW50c1dpZGdldC9tb2RlbC90cmFjZUNvbmZpZ0RhdGFwb2ludHNEYXRhTW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUtBOzs7OztPQUtHO0lBQ0g7UUFBNkMsa0RBQWE7UUFBMUQ7O1FBZ0ZBLENBQUM7UUE5RUc7Ozs7V0FJRztRQUNILG1EQUFVLEdBQVY7UUFFQSxDQUFDO1FBRU0scURBQVksR0FBbkIsVUFBb0IsS0FBYSxFQUFFLFNBQXlCO1lBQ3hELElBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksRUFBRSxFQUFDO2dCQUN2QixPQUFPLENBQUMsSUFBSSxDQUFDLG1DQUFtQyxDQUFDLENBQUM7Z0JBQ2xELE9BQU87YUFDVjtZQUNELElBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFNBQVMsQ0FBQyxFQUFDO2dCQUN0QyxPQUFPLENBQUMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUM7Z0JBQzNDLE9BQU87YUFDVjtZQUNELElBQUcsS0FBSyxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBQztnQkFDekMsc0RBQXNEO2dCQUN0RCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUM5QjtpQkFDRztnQkFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO2FBQ3pDO1lBQ0QsSUFBSSxTQUFTLEdBQUcsSUFBSSwwQ0FBcUIsQ0FBQyxJQUFJLEVBQUUsb0NBQWUsQ0FBQyxZQUFZLEVBQUUsNEJBQTRCLEVBQUUsSUFBSSxDQUFDLElBQUks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QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElUcmFjZUNvbmZpZ0RhdGFwb2ludHNEYXRhTW9kZWwgfSBmcm9tIFwiLi90cmFjZUNvbmZpZ0RhdGFwb2ludHNEYXRhTW9kZWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgRGF0YU1vZGVsQmFzZSB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvZGF0YU1vZGVsQmFzZVwiO1xyXG5pbXBvcnQgeyBUcmFjZURhdGFQb2ludCB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvZGlhZ25vc3RpY3MvdHJhY2UvdHJhY2VEYXRhUG9pbnRcIjtcclxuaW1wb3J0IHsgRXZlbnRNb2RlbENoYW5nZWRBcmdzLCBNb2RlbENoYW5nZVR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2RhdGFNb2RlbEludGVyZmFjZVwiO1xyXG5cclxuLyoqXHJcbiAqIGltcGxlbWVudHMgdGhlIGRhdGEgbW9kZWwgZm9yIHRoZSB0cmFjZSBjb25maWcgdGltaW5nIHNldHRpbmdzXHJcbiAqXHJcbiAqIEBjbGFzcyBUcmFjZUNvbmZpZ0RhdGFwb2ludHNEYXRhTW9kZWxcclxuICogQGltcGxlbWVudHMge0lUcmFjZUNvbmZpZ0RhdGFwb2ludHNEYXRhTW9kZWx9XHJcbiAqL1xyXG5jbGFzcyBUcmFjZUNvbmZpZ0RhdGFwb2ludHNEYXRhTW9kZWwgZXh0ZW5kcyBEYXRhTW9kZWxCYXNlIGltcGxlbWVudHMgSVRyYWNlQ29uZmlnRGF0YXBvaW50c0RhdGFNb2RlbCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBpbml0aWFsaXplcyB0aGUgZGF0YSBtb2RlbFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ0RhdGFwb2ludHNEYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgaW5pdGlhbGl6ZSgpIHtcclxuXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBhZGREYXRhcG9pbnQoaW5kZXg6IG51bWJlciwgZGF0YXBvaW50OiBUcmFjZURhdGFQb2ludCl7XHJcbiAgICAgICAgaWYodGhpcy5fZGF0YS5sZW5ndGggPj0gMzIpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmluZm8oXCJPbmx5IDMyIGRhdGFwb2ludHMgYXJlIHN1cHBvcnRlZCFcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5kYXRhUG9pbnRBbHJlYWR5SW5MaXN0KGRhdGFwb2ludCkpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmluZm8oXCJEYXRhcG9pbnQgYWxyZWFkeSBpbiBsaXN0IVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihpbmRleCA9PSAtMSB8fCBpbmRleCA+PSB0aGlzLl9kYXRhLmxlbmd0aCl7XHJcbiAgICAgICAgICAgIC8vIE5vIGluZGV4IGRlZmluZWQgb3IgYWZ0ZXIgdGhlIGVuZCA9PiBhZGQgYXQgdGhlIGVuZFxyXG4gICAgICAgICAgICB0aGlzLl9kYXRhLnB1c2goZGF0YXBvaW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICB0aGlzLl9kYXRhLnNwbGljZShpbmRleCwgMCwgZGF0YXBvaW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGV2ZW50QXJncyA9IG5ldyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3ModGhpcywgTW9kZWxDaGFuZ2VUeXBlLnVwZGF0ZVRhcmdldCwgXCJjb21wb25lbnRQYXJhbWV0ZXJzVXBkYXRlZFwiLCB0aGlzLmRhdGEpO1xyXG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZWQodGhpcywgZXZlbnRBcmdzKTsgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlcGxhY2VEYXRhcG9pbnQoaW5kZXg6IG51bWJlciwgZGF0YXBvaW50OiBUcmFjZURhdGFQb2ludCl7XHJcbiAgICAgICAgaWYoaW5kZXggPj0gdGhpcy5fZGF0YS5sZW5ndGgpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ2Fubm90IHJlcGxhY2UgZGF0YXBvaW50IHdpdGggaW5kZXg6IFwiICsgaW5kZXgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuZGF0YVBvaW50QWxyZWFkeUluTGlzdChkYXRhcG9pbnQpKXtcclxuICAgICAgICAgICAgY29uc29sZS5pbmZvKFwiRGF0YXBvaW50IGFscmVhZHkgaW4gbGlzdCFcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2RhdGEuc3BsaWNlKGluZGV4LCAxLCBkYXRhcG9pbnQpO1xyXG5cclxuICAgICAgICB2YXIgZXZlbnRBcmdzID0gbmV3IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyh0aGlzLCBNb2RlbENoYW5nZVR5cGUudXBkYXRlVGFyZ2V0LCBcImNvbXBvbmVudFBhcmFtZXRlcnNVcGRhdGVkXCIsIHRoaXMuZGF0YSk7XHJcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLCBldmVudEFyZ3MpOyBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlRGF0YXBvaW50cyhpbmRleExpc3Q6IEFycmF5PG51bWJlcj4pe1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpIDwgaW5kZXhMaXN0Lmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YS5zcGxpY2UoaW5kZXhMaXN0W2ldLCAxKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZW1vdmVkIGRhdGFwb2ludCBpbmRleDogXCIgKyBpbmRleExpc3RbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZXZlbnRBcmdzID0gbmV3IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyh0aGlzLCBNb2RlbENoYW5nZVR5cGUudXBkYXRlVGFyZ2V0LCBcImNvbXBvbmVudFBhcmFtZXRlcnNVcGRhdGVkXCIsIHRoaXMuZGF0YSk7XHJcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLCBldmVudEFyZ3MpOyBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGluaXREYXRhKGRhdGFwb2ludFBhcmFtZXRlcnM6IFRyYWNlRGF0YVBvaW50W10pIHtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhcG9pbnRQYXJhbWV0ZXJzO1xyXG4gICAgICAgIHZhciBldmVudEFyZ3MgPSBuZXcgRXZlbnRNb2RlbENoYW5nZWRBcmdzKHRoaXMsIE1vZGVsQ2hhbmdlVHlwZS51cGRhdGVUYXJnZXQsIFwiY29tcG9uZW50UGFyYW1ldGVyc1VwZGF0ZWRcIiwgdGhpcy5kYXRhKTtcclxuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKHRoaXMsIGV2ZW50QXJncyk7IFxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZGF0YVBvaW50QWxyZWFkeUluTGlzdChkYXRhUG9pbnQ6IFRyYWNlRGF0YVBvaW50KXtcclxuICAgICAgICBpZighdGhpcy5pc0RhdGFQb2ludEFuRW1wdHlMaW5lKGRhdGFQb2ludCkpIHtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGkgPCAgdGhpcy5fZGF0YS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLl9kYXRhW2ldLmRhdGFQb2ludE5hbWUgPT09IGRhdGFQb2ludC5kYXRhUG9pbnROYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNEYXRhUG9pbnRBbkVtcHR5TGluZShkYXRhUG9pbnQ6IFRyYWNlRGF0YVBvaW50KTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGRhdGFQb2ludC5kYXRhUG9pbnROYW1lID09IHVuZGVmaW5lZCB8fCBkYXRhUG9pbnQuZGF0YVBvaW50TmFtZSA9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IFRyYWNlQ29uZmlnRGF0YXBvaW50c0RhdGFNb2RlbCB9OyJdfQ==