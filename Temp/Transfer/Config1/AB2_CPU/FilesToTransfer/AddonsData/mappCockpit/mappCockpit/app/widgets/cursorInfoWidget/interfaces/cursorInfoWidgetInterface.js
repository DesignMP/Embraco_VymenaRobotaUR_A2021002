define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CursorMovement;
    (function (CursorMovement) {
        CursorMovement[CursorMovement["Left"] = -1] = "Left";
        CursorMovement[CursorMovement["LeftExtended"] = -10] = "LeftExtended";
        CursorMovement[CursorMovement["Right"] = 1] = "Right";
        CursorMovement[CursorMovement["RightExtended"] = 10] = "RightExtended";
    })(CursorMovement || (CursorMovement = {}));
    exports.CursorMovement = CursorMovement;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3Vyc29ySW5mb1dpZGdldEludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jdXJzb3JJbmZvV2lkZ2V0L2ludGVyZmFjZXMvY3Vyc29ySW5mb1dpZGdldEludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFhQSxJQUFLLGNBS0o7SUFMRCxXQUFLLGNBQWM7UUFDZixvREFBUyxDQUFBO1FBQ1QscUVBQWtCLENBQUE7UUFDbEIscURBQVMsQ0FBQTtRQUNULHNFQUFrQixDQUFBO0lBQ3RCLENBQUMsRUFMSSxjQUFjLEtBQWQsY0FBYyxRQUtsQjtJQUV5Qix3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElXaWRnZXQgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2ludGVyZmFjZXMvd2lkZ2V0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEJhc2VTZXJpZXMgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9iYXNlU2VyaWVzXCI7XHJcblxyXG5pbnRlcmZhY2UgSUN1cnNvckluZm9XaWRnZXQgZXh0ZW5kcyBJV2lkZ2V0IHtcclxuICAgIG9uTW92ZUN1cnNvcihjdXJzb3JJbmRleDogbnVtYmVyLCBjdXJzb3JNb3ZlbWVudDogQ3Vyc29yTW92ZW1lbnQpO1xyXG4gICAgb25SZWZlcmVuY2VDdXJzb3JTZWxlY3RlZChjdXJzb3JJbmRleDogbnVtYmVyKTtcclxuICAgIGFkZFNlcmllcyhzZXJpZXM6IEFycmF5PEJhc2VTZXJpZXM+KTtcclxuICAgIHJlbW92ZVNlcmllKHNlcmllOiBCYXNlU2VyaWVzKTtcclxuICAgIHVwZGF0ZUN1cnNvckxvY2F0aW9uKGN1cnNvckluZGV4OiBudW1iZXIsIGN1cnNvclRpbWVzdGFtcDogbnVtYmVyKTtcclxuICAgIHNob3dDdXJzb3JJbmZvU2VsZWN0b3JWaWV3KCk7XHJcbiAgICBzaG93Q3Vyc29yU2lnbmFsc1ZpZXcoKTtcclxufVxyXG5cclxuZW51bSBDdXJzb3JNb3ZlbWVudHtcclxuICAgIExlZnQgPSAtMSxcclxuICAgIExlZnRFeHRlbmRlZCA9IC0xMCxcclxuICAgIFJpZ2h0ID0gMSxcclxuICAgIFJpZ2h0RXh0ZW5kZWQgPSAxMCxcclxufVxyXG5cclxuZXhwb3J0IHtJQ3Vyc29ySW5mb1dpZGdldCxDdXJzb3JNb3ZlbWVudH07Il19