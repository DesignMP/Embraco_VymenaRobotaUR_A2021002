define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CmTreeGridCellEditEvents = /** @class */ (function () {
        function CmTreeGridCellEditEvents() {
        }
        CmTreeGridCellEditEvents.prototype.beginEdit = function (args, dataModel) {
            if (args.columnIndex != 1 || (args.data.readOnly == true || args.data.element.componentParameter == undefined)) {
                args.cancel = true;
            }
        };
        CmTreeGridCellEditEvents.prototype.endEdit = function (args, dataModel) {
            if (args.columnObject.field == "displayValue") {
                dataModel.setValue(args.data.element, args.value);
            }
        };
        return CmTreeGridCellEditEvents;
    }());
    exports.CmTreeGridCellEditEvents = CmTreeGridCellEditEvents;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY21UcmVlR3JpZENlbGxFZGl0RXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NvbmZpZ01hbmFnZXJXaWRnZXQvdmlldy9jbVRyZWVHcmlkQ2VsbEVkaXRFdmVudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBQUE7UUFBQTtRQVlBLENBQUM7UUFYRyw0Q0FBUyxHQUFULFVBQVUsSUFBSSxFQUFFLFNBQVM7WUFDckIsSUFBRyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsSUFBSSxTQUFTLENBQUMsRUFBQztnQkFDMUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7YUFDdEI7UUFDTCxDQUFDO1FBRUQsMENBQU8sR0FBUCxVQUFRLElBQUksRUFBRSxTQUFTO1lBQ25CLElBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLElBQUksY0FBYyxFQUFDO2dCQUN6QyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNyRDtRQUNMLENBQUM7UUFDTCwrQkFBQztJQUFELENBQUMsQUFaRCxJQVlDO0lBWlksNERBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIENtVHJlZUdyaWRDZWxsRWRpdEV2ZW50c3tcclxuICAgIGJlZ2luRWRpdChhcmdzLCBkYXRhTW9kZWwpe1xyXG4gICAgICAgIGlmKGFyZ3MuY29sdW1uSW5kZXggIT0gMSB8fCAoYXJncy5kYXRhLnJlYWRPbmx5ID09IHRydWUgfHwgYXJncy5kYXRhLmVsZW1lbnQuY29tcG9uZW50UGFyYW1ldGVyID09IHVuZGVmaW5lZCkpe1xyXG4gICAgICAgICAgICBhcmdzLmNhbmNlbCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGVuZEVkaXQoYXJncywgZGF0YU1vZGVsKXtcclxuICAgICAgICBpZihhcmdzLmNvbHVtbk9iamVjdC5maWVsZCA9PSBcImRpc3BsYXlWYWx1ZVwiKXtcclxuICAgICAgICAgICAgZGF0YU1vZGVsLnNldFZhbHVlKGFyZ3MuZGF0YS5lbGVtZW50LCBhcmdzLnZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19