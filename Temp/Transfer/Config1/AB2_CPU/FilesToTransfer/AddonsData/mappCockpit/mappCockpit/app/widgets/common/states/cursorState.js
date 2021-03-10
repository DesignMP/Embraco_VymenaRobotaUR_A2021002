define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * holds and manages the state of a single cursor
     *
     * @class CursorState
     */
    var CursorState = /** @class */ (function () {
        /**
         * Creates an instance of CursorState.
         * @memberof CursorState
         */
        function CursorState(type) {
            // initialize states
            this.selected = false;
            this.active = false;
            this.hovered = false;
            this.position = undefined;
            this.type = type;
        }
        return CursorState;
    }());
    exports.CursorState = CursorState;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3Vyc29yU3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY29tbW9uL3N0YXRlcy9jdXJzb3JTdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFHQTs7OztPQUlHO0lBQ0g7UUFRSTs7O1dBR0c7UUFDSCxxQkFBWSxJQUFJO1lBQ1osb0JBQW9CO1lBQ3BCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO1lBQzFCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLENBQUM7UUFDTCxrQkFBQztJQUFELENBQUMsQUFwQkQsSUFvQkM7SUFwQlksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ3Vyc29yU3RhdGUgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9jdXJzb3JTdGF0ZUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDdXJzb3JUeXBlIH0gZnJvbSBcIi4vY3Vyc29yU3RhdGVzXCI7XHJcblxyXG4vKipcclxuICogaG9sZHMgYW5kIG1hbmFnZXMgdGhlIHN0YXRlIG9mIGEgc2luZ2xlIGN1cnNvclxyXG4gKlxyXG4gKiBAY2xhc3MgQ3Vyc29yU3RhdGVcclxuICovXHJcbmV4cG9ydCBjbGFzcyBDdXJzb3JTdGF0ZSBpbXBsZW1lbnRzIElDdXJzb3JTdGF0ZXtcclxuXHJcbiAgICBzZWxlY3RlZDogYm9vbGVhbjtcclxuICAgIGFjdGl2ZTogYm9vbGVhbjtcclxuICAgIGhvdmVyZWQ6IGJvb2xlYW47XHJcbiAgICBwb3NpdGlvbjogbnVtYmVyfHVuZGVmaW5lZDtcclxuICAgIHR5cGU6IEN1cnNvclR5cGU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEN1cnNvclN0YXRlLlxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclN0YXRlXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHR5cGUpe1xyXG4gICAgICAgIC8vIGluaXRpYWxpemUgc3RhdGVzXHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5ob3ZlcmVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgfVxyXG59Il19