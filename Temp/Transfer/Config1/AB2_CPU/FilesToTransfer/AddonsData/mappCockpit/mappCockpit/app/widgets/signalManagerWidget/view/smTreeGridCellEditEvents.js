define(["require", "exports", "../signalManagerWidget"], function (require, exports, signalManagerWidget_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SmTreeGridCellEditEvents = /** @class */ (function () {
        function SmTreeGridCellEditEvents() {
        }
        SmTreeGridCellEditEvents.prototype.beginEdit = function (args, widget) {
            var colorColumnIndex = SmTreeGridCellEditEvents.getColumnIndex(signalManagerWidget_1.SignalManagerWidget.colorColumnId, args.model);
            var valueColumnIndex = SmTreeGridCellEditEvents.getColumnIndex(signalManagerWidget_1.SignalManagerWidget.valueColumnId, args.model);
            if (args.columnIndex == colorColumnIndex) {
                if (args.data.item.color == undefined) {
                    // Only color setting can be edited if available
                    args.cancel = true;
                }
            }
            else if (args.columnIndex == valueColumnIndex) {
                if (args.data.item.value != undefined) {
                }
                else {
                    args.cancel = true;
                }
            }
            else {
                args.cancel = true;
            }
        };
        SmTreeGridCellEditEvents.prototype.endEdit = function (args, widget) {
            if (args.columnObject.field == signalManagerWidget_1.SignalManagerWidget.colorColumnId) {
                if (args.data.item.color != undefined) {
                    // update signal icon with correct color
                    widget.refresh();
                }
            }
        };
        SmTreeGridCellEditEvents.getColumnIndex = function (columnId, dataModel) {
            for (var index = 0; index < dataModel.columns.length; index++) {
                if (dataModel.columns[index].field == columnId) {
                    return index;
                }
            }
            // Default column
            return 1;
        };
        return SmTreeGridCellEditEvents;
    }());
    exports.SmTreeGridCellEditEvents = SmTreeGridCellEditEvents;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21UcmVlR3JpZENlbGxFZGl0RXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3NpZ25hbE1hbmFnZXJXaWRnZXQvdmlldy9zbVRyZWVHcmlkQ2VsbEVkaXRFdmVudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBRUE7UUFBQTtRQTBDQSxDQUFDO1FBekNHLDRDQUFTLEdBQVQsVUFBVSxJQUFJLEVBQUUsTUFBTTtZQUNsQixJQUFJLGdCQUFnQixHQUFHLHdCQUF3QixDQUFDLGNBQWMsQ0FBQyx5Q0FBbUIsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzlHLElBQUksZ0JBQWdCLEdBQUcsd0JBQXdCLENBQUMsY0FBYyxDQUFDLHlDQUFtQixDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDOUcsSUFBRyxJQUFJLENBQUMsV0FBVyxJQUFJLGdCQUFnQixFQUFDO2dCQUVwQyxJQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxTQUFTLEVBQUM7b0JBQ2pDLGdEQUFnRDtvQkFDaEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7aUJBQ3RCO2FBQ0o7aUJBQ0ksSUFBRyxJQUFJLENBQUMsV0FBVyxJQUFJLGdCQUFnQixFQUFDO2dCQUN6QyxJQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxTQUFTLEVBQUM7aUJBQ3BDO3FCQUNHO29CQUNBLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2lCQUN0QjthQUNKO2lCQUNHO2dCQUNBLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2FBQ3RCO1FBQ0wsQ0FBQztRQUVELDBDQUFPLEdBQVAsVUFBUSxJQUFJLEVBQUUsTUFBTTtZQUNoQixJQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxJQUFJLHlDQUFtQixDQUFDLGFBQWEsRUFBQztnQkFDNUQsSUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksU0FBUyxFQUFDO29CQUNqQyx3Q0FBd0M7b0JBQ3hDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztpQkFDcEI7YUFDSjtRQUNMLENBQUM7UUFFYyx1Q0FBYyxHQUE3QixVQUE4QixRQUFRLEVBQUUsU0FBUztZQUM3QyxLQUFJLElBQUksS0FBSyxHQUFDLENBQUMsRUFBRSxLQUFLLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUM7Z0JBQ3ZELElBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLElBQUksUUFBUSxFQUFDO29CQUMxQyxPQUFPLEtBQUssQ0FBQztpQkFDaEI7YUFDSjtZQUVELGlCQUFpQjtZQUNqQixPQUFPLENBQUMsQ0FBQztRQUNiLENBQUM7UUFDTCwrQkFBQztJQUFELENBQUMsQUExQ0QsSUEwQ0M7SUExQ1ksNERBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2lnbmFsTWFuYWdlcldpZGdldCB9IGZyb20gXCIuLi9zaWduYWxNYW5hZ2VyV2lkZ2V0XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU21UcmVlR3JpZENlbGxFZGl0RXZlbnRze1xyXG4gICAgYmVnaW5FZGl0KGFyZ3MsIHdpZGdldCl7XHJcbiAgICAgICAgbGV0IGNvbG9yQ29sdW1uSW5kZXggPSBTbVRyZWVHcmlkQ2VsbEVkaXRFdmVudHMuZ2V0Q29sdW1uSW5kZXgoU2lnbmFsTWFuYWdlcldpZGdldC5jb2xvckNvbHVtbklkLCBhcmdzLm1vZGVsKTtcclxuICAgICAgICBsZXQgdmFsdWVDb2x1bW5JbmRleCA9IFNtVHJlZUdyaWRDZWxsRWRpdEV2ZW50cy5nZXRDb2x1bW5JbmRleChTaWduYWxNYW5hZ2VyV2lkZ2V0LnZhbHVlQ29sdW1uSWQsIGFyZ3MubW9kZWwpO1xyXG4gICAgICAgIGlmKGFyZ3MuY29sdW1uSW5kZXggPT0gY29sb3JDb2x1bW5JbmRleCl7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihhcmdzLmRhdGEuaXRlbS5jb2xvciA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgLy8gT25seSBjb2xvciBzZXR0aW5nIGNhbiBiZSBlZGl0ZWQgaWYgYXZhaWxhYmxlXHJcbiAgICAgICAgICAgICAgICBhcmdzLmNhbmNlbCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihhcmdzLmNvbHVtbkluZGV4ID09IHZhbHVlQ29sdW1uSW5kZXgpe1xyXG4gICAgICAgICAgICBpZihhcmdzLmRhdGEuaXRlbS52YWx1ZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBhcmdzLmNhbmNlbCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgYXJncy5jYW5jZWwgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBlbmRFZGl0KGFyZ3MsIHdpZGdldCl7XHJcbiAgICAgICAgaWYoYXJncy5jb2x1bW5PYmplY3QuZmllbGQgPT0gU2lnbmFsTWFuYWdlcldpZGdldC5jb2xvckNvbHVtbklkKXtcclxuICAgICAgICAgICAgaWYoYXJncy5kYXRhLml0ZW0uY29sb3IgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSBzaWduYWwgaWNvbiB3aXRoIGNvcnJlY3QgY29sb3JcclxuICAgICAgICAgICAgICAgIHdpZGdldC5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0Q29sdW1uSW5kZXgoY29sdW1uSWQsIGRhdGFNb2RlbCk6bnVtYmVye1xyXG4gICAgICAgIGZvcihsZXQgaW5kZXg9MDsgaW5kZXggPCBkYXRhTW9kZWwuY29sdW1ucy5sZW5ndGg7IGluZGV4Kyspe1xyXG4gICAgICAgICAgICBpZihkYXRhTW9kZWwuY29sdW1uc1tpbmRleF0uZmllbGQgPT0gY29sdW1uSWQpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBEZWZhdWx0IGNvbHVtblxyXG4gICAgICAgIHJldHVybiAxO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==