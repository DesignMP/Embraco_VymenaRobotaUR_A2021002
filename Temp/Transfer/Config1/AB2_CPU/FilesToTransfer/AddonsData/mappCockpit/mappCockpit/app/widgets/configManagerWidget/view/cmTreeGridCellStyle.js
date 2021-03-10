define(["require", "exports", "../../common/domHelper"], function (require, exports, domHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CmTreeGridCellStyle = /** @class */ (function () {
        function CmTreeGridCellStyle() {
        }
        CmTreeGridCellStyle.prototype.setCellStyle = function (args) {
            if (args.column.field == "displayValue") {
                if (args.cellElement.classList != undefined) {
                    // Show ReadOnly cell with other color
                    var disableTreeCellClassName = "treeCellDisabled";
                    if (args.data.readOnly == true) {
                        args.cellElement.classList.add(disableTreeCellClassName);
                    }
                    else {
                        args.cellElement.classList.remove(disableTreeCellClassName);
                    }
                }
                domHelper_1.DomHelper.disableElement(args.cellElement, args.data.readOnly);
            }
        };
        return CmTreeGridCellStyle;
    }());
    exports.CmTreeGridCellStyle = CmTreeGridCellStyle;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY21UcmVlR3JpZENlbGxTdHlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jb25maWdNYW5hZ2VyV2lkZ2V0L3ZpZXcvY21UcmVlR3JpZENlbGxTdHlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFFQTtRQUFBO1FBZ0JBLENBQUM7UUFmRywwQ0FBWSxHQUFaLFVBQWMsSUFBSTtZQUNkLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksY0FBYyxFQUFDO2dCQUNwQyxJQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxJQUFJLFNBQVMsRUFBQztvQkFDdkMsc0NBQXNDO29CQUN0QyxJQUFJLHdCQUF3QixHQUFHLGtCQUFrQixDQUFDO29CQUNsRCxJQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksRUFBQzt3QkFDMUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUM7cUJBQzVEO3lCQUNHO3dCQUNBLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO3FCQUMvRDtpQkFDSjtnQkFDRCxxQkFBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDbEU7UUFDTCxDQUFDO1FBQ0wsMEJBQUM7SUFBRCxDQUFDLEFBaEJELElBZ0JDO0lBaEJZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERvbUhlbHBlciB9IGZyb20gXCIuLi8uLi9jb21tb24vZG9tSGVscGVyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ21UcmVlR3JpZENlbGxTdHlsZXtcclxuICAgIHNldENlbGxTdHlsZSAoYXJncyl7XHJcbiAgICAgICAgaWYgKGFyZ3MuY29sdW1uLmZpZWxkID09IFwiZGlzcGxheVZhbHVlXCIpe1xyXG4gICAgICAgICAgICBpZihhcmdzLmNlbGxFbGVtZW50LmNsYXNzTGlzdCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgLy8gU2hvdyBSZWFkT25seSBjZWxsIHdpdGggb3RoZXIgY29sb3JcclxuICAgICAgICAgICAgICAgIGxldCBkaXNhYmxlVHJlZUNlbGxDbGFzc05hbWUgPSBcInRyZWVDZWxsRGlzYWJsZWRcIjtcclxuICAgICAgICAgICAgICAgIGlmKGFyZ3MuZGF0YS5yZWFkT25seSA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgICAgICBhcmdzLmNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoZGlzYWJsZVRyZWVDZWxsQ2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJncy5jZWxsRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGRpc2FibGVUcmVlQ2VsbENsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgRG9tSGVscGVyLmRpc2FibGVFbGVtZW50KGFyZ3MuY2VsbEVsZW1lbnQsIGFyZ3MuZGF0YS5yZWFkT25seSk7XHJcbiAgICAgICAgfSBcclxuICAgIH1cclxufSJdfQ==