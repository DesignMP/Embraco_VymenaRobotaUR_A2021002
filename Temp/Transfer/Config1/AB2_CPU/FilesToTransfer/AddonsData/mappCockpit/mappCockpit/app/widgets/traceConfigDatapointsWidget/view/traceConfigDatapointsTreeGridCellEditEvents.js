define(["require", "exports", "../../../models/diagnostics/trace/traceDataPoint"], function (require, exports, traceDataPoint_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TraceConfigDatapointsTreeGridCellEditEvents = /** @class */ (function () {
        function TraceConfigDatapointsTreeGridCellEditEvents() {
        }
        TraceConfigDatapointsTreeGridCellEditEvents.prototype.beginEdit = function (args) {
            // Only datapoint column can be edited (TODO: use column id instead of index)
            if (args.columnIndex != 0) {
                args.cancel = true;
            }
        };
        TraceConfigDatapointsTreeGridCellEditEvents.prototype.endEdit = function (args, dataModel, availableTraceDataPoints) {
            if (args.columnObject.field == "dataPointName") {
                var dataPointInfo = availableTraceDataPoints.filter(function (datapoint) { return datapoint.fullname == args.value; })[0];
                if (dataPointInfo == undefined) {
                    // Set actual data direct to the html element => Refresh of treegrid not working while endEdit!!!
                    this.setRowElementInfo(args.rowElement[0], "", "", "");
                }
                else {
                    // Set actual data direct to the html element => Refresh of treegrid not working while endEdit!!!
                    this.setRowElementInfo(args.rowElement[0], dataPointInfo.componentName, dataPointInfo.name, dataPointInfo.description);
                    // update other columns
                    var dataPoint = traceDataPoint_1.TraceDataPoint.createWithDataPointInfo(dataPointInfo);
                    dataModel.replaceDatapoint(args.rowIndex, dataPoint);
                }
            }
        };
        TraceConfigDatapointsTreeGridCellEditEvents.prototype.setRowElementInfo = function (rowElement, componentName, dataPointName, description) {
            rowElement.cells[1].innerText = componentName;
            rowElement.cells[2].innerText = dataPointName;
            rowElement.cells[3].innerText = description;
        };
        return TraceConfigDatapointsTreeGridCellEditEvents;
    }());
    exports.TraceConfigDatapointsTreeGridCellEditEvents = TraceConfigDatapointsTreeGridCellEditEvents;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2VDb25maWdEYXRhcG9pbnRzVHJlZUdyaWRDZWxsRWRpdEV2ZW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy90cmFjZUNvbmZpZ0RhdGFwb2ludHNXaWRnZXQvdmlldy90cmFjZUNvbmZpZ0RhdGFwb2ludHNUcmVlR3JpZENlbGxFZGl0RXZlbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUlBO1FBQUE7UUFpQ0EsQ0FBQztRQWhDRywrREFBUyxHQUFULFVBQVUsSUFBSTtZQUNWLDZFQUE2RTtZQUM3RSxJQUFHLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxFQUFDO2dCQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQzthQUN0QjtRQUNMLENBQUM7UUFFRCw2REFBTyxHQUFQLFVBQVEsSUFBSSxFQUFFLFNBQVMsRUFBRSx3QkFBOEM7WUFDbkUsSUFBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssSUFBSSxlQUFlLEVBQUM7Z0JBRTFDLElBQUksYUFBYSxHQUFHLHdCQUF3QixDQUFDLE1BQU0sQ0FBQyxVQUFDLFNBQVMsSUFBTyxPQUFPLFNBQVMsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQSxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsSCxJQUFHLGFBQWEsSUFBSSxTQUFTLEVBQUM7b0JBQzFCLGlHQUFpRztvQkFDakcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztpQkFDMUQ7cUJBQ0c7b0JBRUEsaUdBQWlHO29CQUNqRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxhQUFhLENBQUMsYUFBYSxFQUFFLGFBQWEsQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUV2SCx1QkFBdUI7b0JBQ3ZCLElBQUksU0FBUyxHQUFHLCtCQUFjLENBQUMsdUJBQXVCLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQ3BDLFNBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO2lCQUMzRjthQUNKO1FBQ0wsQ0FBQztRQUVPLHVFQUFpQixHQUF6QixVQUEwQixVQUFVLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxXQUFXO1lBQzNFLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQztZQUM5QyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUM7WUFDOUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDO1FBQ2hELENBQUM7UUFDTCxrREFBQztJQUFELENBQUMsQUFqQ0QsSUFpQ0M7SUFqQ1ksa0dBQTJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHJhY2VEYXRhUG9pbnQgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2RpYWdub3N0aWNzL3RyYWNlL3RyYWNlRGF0YVBvaW50XCI7XHJcbmltcG9ydCB7IFRyYWNlRGF0YVBvaW50SW5mbyB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvZGlhZ25vc3RpY3MvdHJhY2UvdHJhY2VEYXRhUG9pbnRJbmZvXCI7XHJcbmltcG9ydCB7IElUcmFjZUNvbmZpZ0RhdGFwb2ludHNEYXRhTW9kZWwgfSBmcm9tIFwiLi4vbW9kZWwvdHJhY2VDb25maWdEYXRhcG9pbnRzRGF0YU1vZGVsSW50ZXJmYWNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVHJhY2VDb25maWdEYXRhcG9pbnRzVHJlZUdyaWRDZWxsRWRpdEV2ZW50c3tcclxuICAgIGJlZ2luRWRpdChhcmdzKXtcclxuICAgICAgICAvLyBPbmx5IGRhdGFwb2ludCBjb2x1bW4gY2FuIGJlIGVkaXRlZCAoVE9ETzogdXNlIGNvbHVtbiBpZCBpbnN0ZWFkIG9mIGluZGV4KVxyXG4gICAgICAgIGlmKGFyZ3MuY29sdW1uSW5kZXggIT0gMCl7XHJcbiAgICAgICAgICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZW5kRWRpdChhcmdzLCBkYXRhTW9kZWwsIGF2YWlsYWJsZVRyYWNlRGF0YVBvaW50czogVHJhY2VEYXRhUG9pbnRJbmZvW10pe1xyXG4gICAgICAgIGlmKGFyZ3MuY29sdW1uT2JqZWN0LmZpZWxkID09IFwiZGF0YVBvaW50TmFtZVwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBkYXRhUG9pbnRJbmZvID0gYXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzLmZpbHRlcigoZGF0YXBvaW50KSA9PiB7IHJldHVybiBkYXRhcG9pbnQuZnVsbG5hbWUgPT0gYXJncy52YWx1ZX0pWzBdO1xyXG4gICAgICAgICAgICBpZihkYXRhUG9pbnRJbmZvID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAvLyBTZXQgYWN0dWFsIGRhdGEgZGlyZWN0IHRvIHRoZSBodG1sIGVsZW1lbnQgPT4gUmVmcmVzaCBvZiB0cmVlZ3JpZCBub3Qgd29ya2luZyB3aGlsZSBlbmRFZGl0ISEhXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFJvd0VsZW1lbnRJbmZvKGFyZ3Mucm93RWxlbWVudFswXSwgXCJcIiwgXCJcIiwgXCJcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gU2V0IGFjdHVhbCBkYXRhIGRpcmVjdCB0byB0aGUgaHRtbCBlbGVtZW50ID0+IFJlZnJlc2ggb2YgdHJlZWdyaWQgbm90IHdvcmtpbmcgd2hpbGUgZW5kRWRpdCEhIVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRSb3dFbGVtZW50SW5mbyhhcmdzLnJvd0VsZW1lbnRbMF0sIGRhdGFQb2ludEluZm8uY29tcG9uZW50TmFtZSwgZGF0YVBvaW50SW5mby5uYW1lLCBkYXRhUG9pbnRJbmZvLmRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gdXBkYXRlIG90aGVyIGNvbHVtbnNcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhUG9pbnQgPSBUcmFjZURhdGFQb2ludC5jcmVhdGVXaXRoRGF0YVBvaW50SW5mbyhkYXRhUG9pbnRJbmZvKTtcclxuICAgICAgICAgICAgICAgICg8SVRyYWNlQ29uZmlnRGF0YXBvaW50c0RhdGFNb2RlbD5kYXRhTW9kZWwpLnJlcGxhY2VEYXRhcG9pbnQoYXJncy5yb3dJbmRleCwgZGF0YVBvaW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFJvd0VsZW1lbnRJbmZvKHJvd0VsZW1lbnQsIGNvbXBvbmVudE5hbWUsIGRhdGFQb2ludE5hbWUsIGRlc2NyaXB0aW9uKXtcclxuICAgICAgICByb3dFbGVtZW50LmNlbGxzWzFdLmlubmVyVGV4dCA9IGNvbXBvbmVudE5hbWU7XHJcbiAgICAgICAgcm93RWxlbWVudC5jZWxsc1syXS5pbm5lclRleHQgPSBkYXRhUG9pbnROYW1lO1xyXG4gICAgICAgIHJvd0VsZW1lbnQuY2VsbHNbM10uaW5uZXJUZXh0ID0gZGVzY3JpcHRpb247XHJcbiAgICB9XHJcbn1cclxuIl19