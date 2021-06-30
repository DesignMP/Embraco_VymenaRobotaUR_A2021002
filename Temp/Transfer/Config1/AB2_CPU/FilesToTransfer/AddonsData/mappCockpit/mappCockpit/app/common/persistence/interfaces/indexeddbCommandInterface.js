define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var IndexedDBCommandMessage;
    (function (IndexedDBCommandMessage) {
        IndexedDBCommandMessage["clear"] = "clear";
        IndexedDBCommandMessage["init"] = "init";
        IndexedDBCommandMessage["store"] = "store";
        IndexedDBCommandMessage["load"] = "load";
        IndexedDBCommandMessage["success"] = "success";
        IndexedDBCommandMessage["error"] = "error";
    })(IndexedDBCommandMessage = exports.IndexedDBCommandMessage || (exports.IndexedDBCommandMessage = {}));
    ;
    var IndexedDBCommand = /** @class */ (function () {
        function IndexedDBCommand(message, data) {
            this.message = message;
            this.data = data;
        }
        return IndexedDBCommand;
    }());
    exports.IndexedDBCommand = IndexedDBCommand;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXhlZGRiQ29tbWFuZEludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL3BlcnNpc3RlbmNlL2ludGVyZmFjZXMvaW5kZXhlZGRiQ29tbWFuZEludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFBQSxJQUFZLHVCQUE2SDtJQUF6SSxXQUFZLHVCQUF1QjtRQUFFLDBDQUFlLENBQUE7UUFBRSx3Q0FBYSxDQUFBO1FBQUUsMENBQWUsQ0FBQTtRQUFFLHdDQUFhLENBQUE7UUFBRSw4Q0FBbUIsQ0FBQTtRQUFFLDBDQUFjLENBQUE7SUFBQSxDQUFDLEVBQTdILHVCQUF1QixHQUF2QiwrQkFBdUIsS0FBdkIsK0JBQXVCLFFBQXNHO0lBQUEsQ0FBQztJQUUxSTtRQUtJLDBCQUFhLE9BQU8sRUFBRSxJQUFJO1lBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLENBQUM7UUFFTCx1QkFBQztJQUFELENBQUMsQUFWRCxJQVVDO0lBVlksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGVudW0gSW5kZXhlZERCQ29tbWFuZE1lc3NhZ2Uge2NsZWFyID0gXCJjbGVhclwiLCBpbml0ID0gXCJpbml0XCIsIHN0b3JlID0gXCJzdG9yZVwiLCBsb2FkID0gXCJsb2FkXCIsIHN1Y2Nlc3MgPSBcInN1Y2Nlc3NcIiwgZXJyb3I9IFwiZXJyb3JcIn07XHJcblxyXG5leHBvcnQgY2xhc3MgSW5kZXhlZERCQ29tbWFuZHtcclxuXHJcbiAgICBtZXNzYWdlIDogSW5kZXhlZERCQ29tbWFuZE1lc3NhZ2U7XHJcbiAgICBkYXRhIDogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yIChtZXNzYWdlLCBkYXRhKXtcclxuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==