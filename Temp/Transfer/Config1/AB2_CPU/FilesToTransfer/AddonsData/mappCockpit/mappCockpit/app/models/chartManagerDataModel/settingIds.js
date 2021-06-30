define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SettingIds = /** @class */ (function () {
        function SettingIds() {
        }
        // Series ids
        SettingIds.SeriesId = "id";
        SettingIds.SeriesName = "name";
        SettingIds.SeriesColor = "color";
        SettingIds.SeriesSignalData = "signalData";
        SettingIds.SeriesCalculationData = "calculationData";
        // Chart ids
        SettingIds.ChartType = "type";
        SettingIds.ChartName = "name";
        SettingIds.ChartScales = "scales";
        SettingIds.ChartExpandState = "expandState";
        // Scale ids
        SettingIds.ScaleId = "id";
        SettingIds.ScaleName = "name";
        SettingIds.ScaleMinXValue = "minXValue";
        SettingIds.ScaleMinYValue = "minYValue";
        SettingIds.ScaleMaxXValue = "maxXValue";
        SettingIds.ScaleMaxYValue = "maxYValue";
        SettingIds.ScaleSeriesIds = "seriesIds";
        SettingIds.ScaleExpandState = "expandState";
        return SettingIds;
    }());
    exports.SettingIds = SettingIds;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ0lkcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9zZXR0aW5nSWRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUFBO1FBQUE7UUF1QkEsQ0FBQztRQXRCRyxhQUFhO1FBQ04sbUJBQVEsR0FBRyxJQUFJLENBQUM7UUFDaEIscUJBQVUsR0FBRyxNQUFNLENBQUM7UUFDcEIsc0JBQVcsR0FBRyxPQUFPLENBQUM7UUFDdEIsMkJBQWdCLEdBQUcsWUFBWSxDQUFDO1FBQ2hDLGdDQUFxQixHQUFHLGlCQUFpQixDQUFDO1FBRWpELFlBQVk7UUFDTCxvQkFBUyxHQUFHLE1BQU0sQ0FBQztRQUNuQixvQkFBUyxHQUFHLE1BQU0sQ0FBQztRQUNuQixzQkFBVyxHQUFHLFFBQVEsQ0FBQztRQUN2QiwyQkFBZ0IsR0FBRyxhQUFhLENBQUM7UUFFeEMsWUFBWTtRQUNMLGtCQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ2Ysb0JBQVMsR0FBRyxNQUFNLENBQUM7UUFDbkIseUJBQWMsR0FBRyxXQUFXLENBQUM7UUFDN0IseUJBQWMsR0FBRyxXQUFXLENBQUM7UUFDN0IseUJBQWMsR0FBRyxXQUFXLENBQUM7UUFDN0IseUJBQWMsR0FBRyxXQUFXLENBQUM7UUFDN0IseUJBQWMsR0FBRyxXQUFXLENBQUM7UUFDN0IsMkJBQWdCLEdBQUcsYUFBYSxDQUFDO1FBQzVDLGlCQUFDO0tBQUEsQUF2QkQsSUF1QkM7SUF2QlksZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgU2V0dGluZ0lkc3tcclxuICAgIC8vIFNlcmllcyBpZHNcclxuICAgIHN0YXRpYyBTZXJpZXNJZCA9IFwiaWRcIjtcclxuICAgIHN0YXRpYyBTZXJpZXNOYW1lID0gXCJuYW1lXCI7XHJcbiAgICBzdGF0aWMgU2VyaWVzQ29sb3IgPSBcImNvbG9yXCI7XHJcbiAgICBzdGF0aWMgU2VyaWVzU2lnbmFsRGF0YSA9IFwic2lnbmFsRGF0YVwiO1xyXG4gICAgc3RhdGljIFNlcmllc0NhbGN1bGF0aW9uRGF0YSA9IFwiY2FsY3VsYXRpb25EYXRhXCI7XHJcblxyXG4gICAgLy8gQ2hhcnQgaWRzXHJcbiAgICBzdGF0aWMgQ2hhcnRUeXBlID0gXCJ0eXBlXCI7XHJcbiAgICBzdGF0aWMgQ2hhcnROYW1lID0gXCJuYW1lXCI7XHJcbiAgICBzdGF0aWMgQ2hhcnRTY2FsZXMgPSBcInNjYWxlc1wiO1xyXG4gICAgc3RhdGljIENoYXJ0RXhwYW5kU3RhdGUgPSBcImV4cGFuZFN0YXRlXCI7XHJcblxyXG4gICAgLy8gU2NhbGUgaWRzXHJcbiAgICBzdGF0aWMgU2NhbGVJZCA9IFwiaWRcIjtcclxuICAgIHN0YXRpYyBTY2FsZU5hbWUgPSBcIm5hbWVcIjtcclxuICAgIHN0YXRpYyBTY2FsZU1pblhWYWx1ZSA9IFwibWluWFZhbHVlXCI7XHJcbiAgICBzdGF0aWMgU2NhbGVNaW5ZVmFsdWUgPSBcIm1pbllWYWx1ZVwiO1xyXG4gICAgc3RhdGljIFNjYWxlTWF4WFZhbHVlID0gXCJtYXhYVmFsdWVcIjtcclxuICAgIHN0YXRpYyBTY2FsZU1heFlWYWx1ZSA9IFwibWF4WVZhbHVlXCI7XHJcbiAgICBzdGF0aWMgU2NhbGVTZXJpZXNJZHMgPSBcInNlcmllc0lkc1wiO1xyXG4gICAgc3RhdGljIFNjYWxlRXhwYW5kU3RhdGUgPSBcImV4cGFuZFN0YXRlXCI7XHJcbn1cclxuIl19