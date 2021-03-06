define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var IdleStrategy = /** @class */ (function () {
        function IdleStrategy(userInteractionController) {
            this.dragIsActive = false;
        }
        IdleStrategy.prototype.onMouseHover = function (chart) { };
        IdleStrategy.prototype.onClick = function (chart) { };
        IdleStrategy.prototype.onDrag = function (chart) { };
        IdleStrategy.prototype.onDragEnd = function (chart) { };
        IdleStrategy.prototype.onMouseDown = function (chart, chartObjectUnderMouse) {
            return chartObjectUnderMouse;
        };
        return IdleStrategy;
    }());
    exports.ChartIdleStrategy = IdleStrategy;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhclN0cmF0ZWd5SW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NoYXJ0V2lkZ2V0L3VzZXJJbnRlcmFjdGlvbi9zdHJhdGVnaWVzL2NoYXJTdHJhdGVneUludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFpQkE7UUFJSSxzQkFBWSx5QkFBcUQ7WUFGakUsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFHckIsQ0FBQztRQUNELG1DQUFZLEdBQVosVUFBYSxLQUFrQixJQUFHLENBQUM7UUFDbkMsOEJBQU8sR0FBUCxVQUFRLEtBQWtCLElBQUcsQ0FBQztRQUM5Qiw2QkFBTSxHQUFOLFVBQU8sS0FBa0IsSUFBRyxDQUFDO1FBQzdCLGdDQUFTLEdBQVQsVUFBVSxLQUFrQixJQUFHLENBQUM7UUFDaEMsa0NBQVcsR0FBWCxVQUFZLEtBQWtCLEVBQUUscUJBQTZDO1lBQ3pFLE9BQU8scUJBQXFCLENBQUM7UUFDakMsQ0FBQztRQUVMLG1CQUFDO0lBQUQsQ0FBQyxBQWRELElBY0M7SUFFbUQseUNBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXIgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9jb250cm9sbGVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElUcmFjZUNoYXJ0IH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvdHJhY2VDaGFydEludGVyZmFjZVwiO1xyXG5pbXBvcnQge0NoYXJ0T2JqZWN0SW5mb3JtYXRpb24gfSBmcm9tIFwiLi4vLi4vQ2hhcnRCYXNlXCI7XHJcbmltcG9ydCB7IElQb2ludCB9IGZyb20gXCIuLi8uLi8uLi8uLi9tb2RlbHMvY29tbW9uL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIjtcclxuXHJcbmludGVyZmFjZSBJQ2hhcnRJbnRlcmFjdGlvblN0cmF0ZWd5e1xyXG5cclxuICAgIGRyYWdJc0FjdGl2ZTtcclxuXHJcbiAgICBvbkNsaWNrKGNoYXJ0OiBJVHJhY2VDaGFydCwgY2hhcnRPYmplY3RVbmRlck1vdXNlOiBDaGFydE9iamVjdEluZm9ybWF0aW9uLCBtb3VzZVBvaW50OiBJUG9pbnQpO1xyXG4gICAgb25EcmFnKGNoYXJ0OiBJVHJhY2VDaGFydCwgYXJncyk7XHJcbiAgICBvbkRyYWdFbmQoY2hhcnQ6IElUcmFjZUNoYXJ0LCBjaGFydE9iamVjdFVuZGVyTW91c2U6IENoYXJ0T2JqZWN0SW5mb3JtYXRpb24pO1xyXG4gICAgb25Nb3VzZUhvdmVyKGNoYXJ0OiBJVHJhY2VDaGFydCwgY2hhcnRPYmplY3RVbmRlck1vdXNlOiBDaGFydE9iamVjdEluZm9ybWF0aW9uLCBtb3VzZVBvaW50OiBJUG9pbnQpO1xyXG4gICAgb25Nb3VzZURvd24oY2hhcnQ6IElUcmFjZUNoYXJ0LCBjaGFydE9iamVjdFVuZGVyTW91c2U6IENoYXJ0T2JqZWN0SW5mb3JtYXRpb24sIG1vdXNlUG9pbnQ6IElQb2ludCkgOiBDaGFydE9iamVjdEluZm9ybWF0aW9uO1xyXG4gICAgXHJcbn1cclxuXHJcbmNsYXNzIElkbGVTdHJhdGVneSBpbXBsZW1lbnRzIElDaGFydEludGVyYWN0aW9uU3RyYXRlZ3l7XHJcbiAgICBcclxuICAgIGRyYWdJc0FjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHVzZXJJbnRlcmFjdGlvbkNvbnRyb2xsZXI6IElVc2VySW50ZXJhY3Rpb25Db250cm9sbGVyKSB7XHJcbiAgICB9XHJcbiAgICBvbk1vdXNlSG92ZXIoY2hhcnQ6IElUcmFjZUNoYXJ0KSB7fVxyXG4gICAgb25DbGljayhjaGFydDogSVRyYWNlQ2hhcnQpIHt9ICAgIFxyXG4gICAgb25EcmFnKGNoYXJ0OiBJVHJhY2VDaGFydCkge31cclxuICAgIG9uRHJhZ0VuZChjaGFydDogSVRyYWNlQ2hhcnQpIHt9XHJcbiAgICBvbk1vdXNlRG93bihjaGFydDogSVRyYWNlQ2hhcnQsIGNoYXJ0T2JqZWN0VW5kZXJNb3VzZTogQ2hhcnRPYmplY3RJbmZvcm1hdGlvbikgOiBDaGFydE9iamVjdEluZm9ybWF0aW9ue1xyXG4gICAgICAgIHJldHVybiBjaGFydE9iamVjdFVuZGVyTW91c2U7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgeyBJQ2hhcnRJbnRlcmFjdGlvblN0cmF0ZWd5LCBJZGxlU3RyYXRlZ3kgYXMgQ2hhcnRJZGxlU3RyYXRlZ3kgfSJdfQ==