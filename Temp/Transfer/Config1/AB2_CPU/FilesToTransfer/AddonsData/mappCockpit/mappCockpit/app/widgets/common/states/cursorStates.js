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
define(["require", "exports", "../../../framework/state", "./cursorState"], function (require, exports, state_1, cursorState_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CursorType;
    (function (CursorType) {
        CursorType[CursorType["timeDomain"] = 0] = "timeDomain";
        CursorType[CursorType["frequencyDomain"] = 1] = "frequencyDomain";
    })(CursorType = exports.CursorType || (exports.CursorType = {}));
    /**
     * holds cursor state objects
     * @singleton
     * @export
     * @class CursorStates
     */
    var CursorStates = /** @class */ (function (_super) {
        __extends(CursorStates, _super);
        /**
         * Creates an instance of CursorStates.
         * @memberof CursorStates
         */
        function CursorStates() {
            var _this = _super.call(this) || this;
            //Create cursor States
            var cursorState1 = new cursorState_1.CursorState(CursorType.timeDomain);
            var cursorState2 = new cursorState_1.CursorState(CursorType.timeDomain);
            var FFTcursorState1 = new cursorState_1.CursorState(CursorType.frequencyDomain);
            var FFTcursorState2 = new cursorState_1.CursorState(CursorType.frequencyDomain);
            _this._timeCursorStates = [cursorState1, cursorState2];
            _this._fftCursorStates = [FFTcursorState1, FFTcursorState2];
            _this._cursorStates = _this._timeCursorStates.concat(_this._fftCursorStates);
            // Select cursor 1 by default
            cursorState1.selected = true;
            _this.lastCursorTypeSelected = CursorType.timeDomain;
            return _this;
        }
        /**
         * Returns a list of all available cursor states
         *
         * @returns {Array<ICursorState>}
         * @memberof CursorStates
         */
        CursorStates.prototype.getStates = function () {
            return this._cursorStates;
        };
        /**
         * Returns a list of all available time cursor states
         *
         * @returns {Array<ICursorState>}
         * @memberof CursorStates
         */
        CursorStates.prototype.getTimeStates = function () {
            return this._timeCursorStates;
        };
        /**
         * Returns a list of all available time cursor states
         *
         * @returns {Array<ICursorState>}
         * @memberof CursorStates
         */
        CursorStates.prototype.getFrequencyStates = function () {
            return this._fftCursorStates;
        };
        /**
         * Sets the active flag for the given index
         *
         * @param {number} cursorIndex
         * @param {boolean} active
         * @memberof CursorStates
         */
        CursorStates.prototype.setActive = function (cursorIndex, active) {
            if (this.getLastCursorTypeSelected() == CursorType.timeDomain) {
                this._timeCursorStates[cursorIndex].active = active;
            }
            else if (this.getLastCursorTypeSelected() == CursorType.frequencyDomain) {
                this._fftCursorStates[cursorIndex].active = active;
            }
        };
        /**
         * Returns the active flag for the given index
         *
         * @param {number} cursorIndex
         * @returns {boolean}
         * @memberof CursorStates
         */
        CursorStates.prototype.getActive = function (cursorIndex) {
            if (this.getLastCursorTypeSelected() == CursorType.timeDomain) {
                return this._timeCursorStates[cursorIndex].active;
            }
            else if (this.getLastCursorTypeSelected() == CursorType.frequencyDomain) {
                return this._fftCursorStates[cursorIndex].active;
            }
            return false;
        };
        /**
         * Sets the type of cursor that has been selected
         *
         * @param {CursorType} type
         * @memberof CursorStates
         */
        CursorStates.prototype.setLastCursorTypeSelected = function (type) {
            this.lastCursorTypeSelected = type;
        };
        /**
         * Gets the type of cursor that has been selected
         *
         * @returns {CursorType}
         * @memberof CursorStates
         */
        CursorStates.prototype.getLastCursorTypeSelected = function () {
            return this.lastCursorTypeSelected;
        };
        /**
         * Set hovered flag for the cursor with the given index, and remove hovered flag from all other cursors
         * if hovered = false and cursorIndex = -1, hovered will be set to false at all cursors
         *
         * @param {number} cursorIndex
         * @param {boolean} hovered
         * @memberof CursorStates
         */
        CursorStates.prototype.setHovered = function (cursorIndex, cursorType, hovered) {
            if (cursorIndex >= 0 && cursorIndex < this._cursorStates.length) {
                if (cursorType == CursorType.timeDomain) {
                    this._timeCursorStates[cursorIndex].hovered = hovered;
                }
                else if (cursorType == CursorType.frequencyDomain) {
                    this._fftCursorStates[cursorIndex].hovered = hovered;
                }
                if (hovered == true) {
                    // set all other cursors to hovered false
                    this.setOtherCursorsToFalse(cursorIndex, cursorType, 'hovered');
                }
            }
            else if (cursorIndex == -1 && hovered == false) {
                // Set all cursor hovered flags to false
                this._cursorStates.forEach(function (cursorState) {
                    cursorState.hovered = false;
                });
            }
        };
        /**
         * Returns the hovered flag for the given index
         *
         * @param {number} cursorIndex
         * @returns {boolean}
         * @memberof CursorStates
         */
        CursorStates.prototype.getHovered = function (cursorIndex) {
            return this._cursorStates[cursorIndex].hovered;
        };
        /**
         * Returns the index of a current hovered cursor or -1 if no hovered cursor is available
         *
         * @returns {number}
         * @memberof CursorStates
         */
        CursorStates.prototype.getHoveredCursorIndex = function () {
            var hoveredCursorIndex = -1;
            for (var index = 0; index < this._timeCursorStates.length; index++) {
                if (this._timeCursorStates[index].hovered == true) {
                    hoveredCursorIndex = index;
                }
            }
            for (var index = 0; index < this._fftCursorStates.length; index++) {
                if (this._fftCursorStates[index].hovered == true) {
                    hoveredCursorIndex = index;
                }
            }
            return hoveredCursorIndex;
        };
        /**
         * Sets the position of the cursor with the given index
         *
         * @param {number} cursorIndex
         * @param {number} position
         * @memberof CursorStates
         */
        CursorStates.prototype.setPosition = function (cursorIndex, position) {
            if (this.getLastCursorTypeSelected() == CursorType.timeDomain) {
                this._timeCursorStates[cursorIndex].position = position;
            }
            else if (this.getLastCursorTypeSelected() == CursorType.frequencyDomain) {
                this._fftCursorStates[cursorIndex].position = position;
            }
        };
        /**
         * Returns the position of the cursor with the given index
         *
         * @param {number} cursorIndex
         * @returns {(number|undefined)}
         * @memberof CursorStates
         */
        CursorStates.prototype.getPosition = function (cursorIndex, cursorType) {
            if (cursorType == CursorType.timeDomain) {
                return this._timeCursorStates[cursorIndex].position;
            }
            else {
                return this._fftCursorStates[cursorIndex].position;
            }
        };
        /**
         * Returns the index of the current selected cursor or -1 if no selected cursor is available
         *
         * @returns {number}
         * @memberof CursorStates
         */
        CursorStates.prototype.getSelectedCursorIndex = function () {
            var selectedCursorIndex = -1;
            for (var i = 0; i < this._timeCursorStates.length; i++) {
                if (this._timeCursorStates[i].selected == true) {
                    selectedCursorIndex = i;
                }
            }
            for (var i = 0; i < this._fftCursorStates.length; i++) {
                if (this._fftCursorStates[i].selected == true) {
                    selectedCursorIndex = i;
                }
            }
            return selectedCursorIndex;
        };
        /**
         * Sets selected flag of the cursor with the given index(if true all other cursors will be set to deselected)
         *
         * @param {number} cursorIndex
         * @param {boolean} selected
         * @memberof CursorStates
         */
        CursorStates.prototype.setSelected = function (cursorIndex, selected) {
            if (this.getLastCursorTypeSelected() == CursorType.frequencyDomain) {
                this._fftCursorStates[cursorIndex].selected = selected;
            }
            else if (this.getLastCursorTypeSelected() == CursorType.timeDomain) {
                this._timeCursorStates[cursorIndex].selected = selected;
            }
            if (selected == true) {
                // set all other cursors to selected false
                this.setOtherCursorsToFalse(cursorIndex, this.getLastCursorTypeSelected(), 'selected');
            }
        };
        /**
         * Set the specified property to false for all the cursorStates except one
         *
         * @private
         * @param {number} cursorIndex
         * @param {CursorType} cursorType
         * @param {string} property
         * @memberof CursorStates
         */
        CursorStates.prototype.setOtherCursorsToFalse = function (cursorIndex, cursorType, property) {
            for (var i = 0; i < this._timeCursorStates.length; i++) {
                if (cursorType == CursorType.timeDomain) {
                    this._fftCursorStates[i][property] = false;
                }
                else if (i != cursorIndex) {
                    this._fftCursorStates[i][property] = false;
                }
            }
            for (var i = 0; i < this._fftCursorStates.length; i++) {
                if (cursorType == CursorType.frequencyDomain) {
                    this._timeCursorStates[i][property] = false;
                }
                else if (i != cursorIndex) {
                    this._timeCursorStates[i][property] = false;
                }
            }
        };
        return CursorStates;
    }(state_1.State));
    exports.CursorStates = CursorStates;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3Vyc29yU3RhdGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NvbW1vbi9zdGF0ZXMvY3Vyc29yU3RhdGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFLQSxJQUFZLFVBR1g7SUFIRCxXQUFZLFVBQVU7UUFDbEIsdURBQVUsQ0FBQTtRQUNWLGlFQUFlLENBQUE7SUFDbkIsQ0FBQyxFQUhXLFVBQVUsR0FBVixrQkFBVSxLQUFWLGtCQUFVLFFBR3JCO0lBRUQ7Ozs7O09BS0c7SUFDSDtRQUFrQyxnQ0FBSztRQWNuQzs7O1dBR0c7UUFDSDtZQUFBLFlBQ0ksaUJBQU8sU0FlVjtZQWJHLHNCQUFzQjtZQUN0QixJQUFJLFlBQVksR0FBZ0IsSUFBSSx5QkFBVyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN2RSxJQUFJLFlBQVksR0FBZ0IsSUFBSSx5QkFBVyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN2RSxJQUFJLGVBQWUsR0FBZ0IsSUFBSSx5QkFBVyxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUMvRSxJQUFJLGVBQWUsR0FBZ0IsSUFBSSx5QkFBVyxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUUvRSxLQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDdEQsS0FBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsZUFBZSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1lBQzNELEtBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUUxRSw2QkFBNkI7WUFDN0IsWUFBWSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDN0IsS0FBSSxDQUFDLHNCQUFzQixHQUFHLFVBQVUs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QUU7b0JBQ3ZCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRSxLQUFLLENBQUM7aUJBQzlDO2FBQ0o7UUFDTCxDQUFDO1FBQ0wsbUJBQUM7SUFBRCxDQUFDLEFBOVJELENBQWtDLGFBQUssR0E4UnRDO0lBOVJZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3RhdGUgfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL3N0YXRlXCI7XHJcbmltcG9ydCB7IEN1cnNvclN0YXRlIH0gZnJvbSBcIi4vY3Vyc29yU3RhdGVcIjtcclxuaW1wb3J0IHsgSUN1cnNvclN0YXRlIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvY3Vyc29yU3RhdGVJbnRlcmZhY2VcIjtcclxuXHJcblxyXG5leHBvcnQgZW51bSBDdXJzb3JUeXBle1xyXG4gICAgdGltZURvbWFpbixcclxuICAgIGZyZXF1ZW5jeURvbWFpblxyXG59XHJcblxyXG4vKipcclxuICogaG9sZHMgY3Vyc29yIHN0YXRlIG9iamVjdHNcclxuICogQHNpbmdsZXRvblxyXG4gKiBAZXhwb3J0XHJcbiAqIEBjbGFzcyBDdXJzb3JTdGF0ZXNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBDdXJzb3JTdGF0ZXMgZXh0ZW5kcyBTdGF0ZXtcclxuXHJcbiAgICAvLyBob2xkcyB0aW1lIGN1cnNvcnNcclxuICAgIHByaXZhdGUgX3RpbWVDdXJzb3JTdGF0ZXM6IEFycmF5PEN1cnNvclN0YXRlPjtcclxuXHJcbiAgICAvL2hvbGRzIGZmdCBjdXJzb3JzXHJcbiAgICBwcml2YXRlIF9mZnRDdXJzb3JTdGF0ZXM6IEFycmF5PEN1cnNvclN0YXRlPjtcclxuXHJcbiAgICAvLyBob2xkcyB0aGUgY3Vyc29yIHN0YXRlcyBpbiBhbiBhcnJheSBmb3IgY29udmVuaWVuY2UgYWNjZXNzXHJcbiAgICBwcml2YXRlIF9jdXJzb3JTdGF0ZXM6IEFycmF5PEN1cnNvclN0YXRlPjtcclxuXHJcbiAgICBwcm90ZWN0ZWQgbGFzdEN1cnNvclR5cGVTZWxlY3RlZDtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEN1cnNvclN0YXRlcy5cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTdGF0ZXNcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICAvL0NyZWF0ZSBjdXJzb3IgU3RhdGVzXHJcbiAgICAgICAgbGV0IGN1cnNvclN0YXRlMTogQ3Vyc29yU3RhdGUgPSBuZXcgQ3Vyc29yU3RhdGUoQ3Vyc29yVHlwZS50aW1lRG9tYWluKTsgXHJcbiAgICAgICAgbGV0IGN1cnNvclN0YXRlMjogQ3Vyc29yU3RhdGUgPSBuZXcgQ3Vyc29yU3RhdGUoQ3Vyc29yVHlwZS50aW1lRG9tYWluKTtcclxuICAgICAgICBsZXQgRkZUY3Vyc29yU3RhdGUxOiBDdXJzb3JTdGF0ZSA9IG5ldyBDdXJzb3JTdGF0ZShDdXJzb3JUeXBlLmZyZXF1ZW5jeURvbWFpbik7XHJcbiAgICAgICAgbGV0IEZGVGN1cnNvclN0YXRlMjogQ3Vyc29yU3RhdGUgPSBuZXcgQ3Vyc29yU3RhdGUoQ3Vyc29yVHlwZS5mcmVxdWVuY3lEb21haW4pO1xyXG5cclxuICAgICAgICB0aGlzLl90aW1lQ3Vyc29yU3RhdGVzID0gW2N1cnNvclN0YXRlMSwgY3Vyc29yU3RhdGUyXTtcclxuICAgICAgICB0aGlzLl9mZnRDdXJzb3JTdGF0ZXMgPSBbRkZUY3Vyc29yU3RhdGUxLCBGRlRjdXJzb3JTdGF0ZTJdO1xyXG4gICAgICAgIHRoaXMuX2N1cnNvclN0YXRlcyA9IHRoaXMuX3RpbWVDdXJzb3JTdGF0ZXMuY29uY2F0KHRoaXMuX2ZmdEN1cnNvclN0YXRlcyk7XHJcblxyXG4gICAgICAgIC8vIFNlbGVjdCBjdXJzb3IgMSBieSBkZWZhdWx0XHJcbiAgICAgICAgY3Vyc29yU3RhdGUxLnNlbGVjdGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmxhc3RDdXJzb3JUeXBlU2VsZWN0ZWQgPSBDdXJzb3JUeXBlLnRpbWVEb21haW47XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgbGlzdCBvZiBhbGwgYXZhaWxhYmxlIGN1cnNvciBzdGF0ZXNcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8SUN1cnNvclN0YXRlPn1cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTdGF0ZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFN0YXRlcygpOiBBcnJheTxJQ3Vyc29yU3RhdGU+e1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJzb3JTdGF0ZXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgbGlzdCBvZiBhbGwgYXZhaWxhYmxlIHRpbWUgY3Vyc29yIHN0YXRlc1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxJQ3Vyc29yU3RhdGU+fVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclN0YXRlc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0VGltZVN0YXRlcygpOiBBcnJheTxJQ3Vyc29yU3RhdGU+e1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90aW1lQ3Vyc29yU3RhdGVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhIGxpc3Qgb2YgYWxsIGF2YWlsYWJsZSB0aW1lIGN1cnNvciBzdGF0ZXNcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8SUN1cnNvclN0YXRlPn1cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTdGF0ZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEZyZXF1ZW5jeVN0YXRlcygpOiBBcnJheTxJQ3Vyc29yU3RhdGU+e1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9mZnRDdXJzb3JTdGF0ZXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBhY3RpdmUgZmxhZyBmb3IgdGhlIGdpdmVuIGluZGV4XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGN1cnNvckluZGV4XHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGFjdGl2ZVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclN0YXRlc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0QWN0aXZlKGN1cnNvckluZGV4OiBudW1iZXIsIGFjdGl2ZTogYm9vbGVhbikge1xyXG4gICAgICAgIGlmICh0aGlzLmdldExhc3RDdXJzb3JUeXBlU2VsZWN0ZWQoKSA9PSBDdXJzb3JUeXBlLnRpbWVEb21haW4pIHtcclxuICAgICAgICAgICAgdGhpcy5fdGltZUN1cnNvclN0YXRlc1tjdXJzb3JJbmRleF0uYWN0aXZlID0gYWN0aXZlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLmdldExhc3RDdXJzb3JUeXBlU2VsZWN0ZWQoKSA9PSBDdXJzb3JUeXBlLmZyZXF1ZW5jeURvbWFpbikge1xyXG4gICAgICAgICAgICB0aGlzLl9mZnRDdXJzb3JTdGF0ZXNbY3Vyc29ySW5kZXhdLmFjdGl2ZSA9IGFjdGl2ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBhY3RpdmUgZmxhZyBmb3IgdGhlIGdpdmVuIGluZGV4XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGN1cnNvckluZGV4XHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTdGF0ZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEFjdGl2ZShjdXJzb3JJbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2V0TGFzdEN1cnNvclR5cGVTZWxlY3RlZCgpID09IEN1cnNvclR5cGUudGltZURvbWFpbikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdGltZUN1cnNvclN0YXRlc1tjdXJzb3JJbmRleF0uYWN0aXZlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLmdldExhc3RDdXJzb3JUeXBlU2VsZWN0ZWQoKSA9PSBDdXJzb3JUeXBlLmZyZXF1ZW5jeURvbWFpbikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZmZ0Q3Vyc29yU3RhdGVzW2N1cnNvckluZGV4XS5hY3RpdmU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHR5cGUgb2YgY3Vyc29yIHRoYXQgaGFzIGJlZW4gc2VsZWN0ZWRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0N1cnNvclR5cGV9IHR5cGVcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTdGF0ZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldExhc3RDdXJzb3JUeXBlU2VsZWN0ZWQodHlwZTogQ3Vyc29yVHlwZSl7XHJcbiAgICAgICAgdGhpcy5sYXN0Q3Vyc29yVHlwZVNlbGVjdGVkID0gdHlwZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHR5cGUgb2YgY3Vyc29yIHRoYXQgaGFzIGJlZW4gc2VsZWN0ZWRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Q3Vyc29yVHlwZX1cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTdGF0ZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldExhc3RDdXJzb3JUeXBlU2VsZWN0ZWQoKTogQ3Vyc29yVHlwZXtcclxuICAgICAgICByZXR1cm4gdGhpcy5sYXN0Q3Vyc29yVHlwZVNlbGVjdGVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IGhvdmVyZWQgZmxhZyBmb3IgdGhlIGN1cnNvciB3aXRoIHRoZSBnaXZlbiBpbmRleCwgYW5kIHJlbW92ZSBob3ZlcmVkIGZsYWcgZnJvbSBhbGwgb3RoZXIgY3Vyc29yc1xyXG4gICAgICogaWYgaG92ZXJlZCA9IGZhbHNlIGFuZCBjdXJzb3JJbmRleCA9IC0xLCBob3ZlcmVkIHdpbGwgYmUgc2V0IHRvIGZhbHNlIGF0IGFsbCBjdXJzb3JzXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjdXJzb3JJbmRleFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBob3ZlcmVkXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU3RhdGVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRIb3ZlcmVkKGN1cnNvckluZGV4OiBudW1iZXIsIGN1cnNvclR5cGU6IEN1cnNvclR5cGUgfCB1bmRlZmluZWQsIGhvdmVyZWQ6IGJvb2xlYW4pIHtcclxuICAgICAgICBpZihjdXJzb3JJbmRleCA+PSAwICYmIGN1cnNvckluZGV4IDwgdGhpcy5fY3Vyc29yU3RhdGVzLmxlbmd0aCl7XHJcbiAgICAgICAgICAgIGlmIChjdXJzb3JUeXBlID09IEN1cnNvclR5cGUudGltZURvbWFpbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdGltZUN1cnNvclN0YXRlc1tjdXJzb3JJbmRleF0uaG92ZXJlZCA9IGhvdmVyZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoY3Vyc29yVHlwZSA9PSBDdXJzb3JUeXBlLmZyZXF1ZW5jeURvbWFpbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZmZ0Q3Vyc29yU3RhdGVzW2N1cnNvckluZGV4XS5ob3ZlcmVkID0gaG92ZXJlZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihob3ZlcmVkID09IHRydWUpeyBcclxuICAgICAgICAgICAgICAgIC8vIHNldCBhbGwgb3RoZXIgY3Vyc29ycyB0byBob3ZlcmVkIGZhbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldE90aGVyQ3Vyc29yc1RvRmFsc2UoY3Vyc29ySW5kZXgsIGN1cnNvclR5cGUhLCAnaG92ZXJlZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGN1cnNvckluZGV4ID09IC0xICYmIGhvdmVyZWQgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAvLyBTZXQgYWxsIGN1cnNvciBob3ZlcmVkIGZsYWdzIHRvIGZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnNvclN0YXRlcy5mb3JFYWNoKGN1cnNvclN0YXRlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjdXJzb3JTdGF0ZS5ob3ZlcmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGhvdmVyZWQgZmxhZyBmb3IgdGhlIGdpdmVuIGluZGV4XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGN1cnNvckluZGV4XHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTdGF0ZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEhvdmVyZWQoY3Vyc29ySW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJzb3JTdGF0ZXNbY3Vyc29ySW5kZXhdLmhvdmVyZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBpbmRleCBvZiBhIGN1cnJlbnQgaG92ZXJlZCBjdXJzb3Igb3IgLTEgaWYgbm8gaG92ZXJlZCBjdXJzb3IgaXMgYXZhaWxhYmxlXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTdGF0ZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEhvdmVyZWRDdXJzb3JJbmRleCgpOiBudW1iZXJ7XHJcbiAgICAgICAgbGV0IGhvdmVyZWRDdXJzb3JJbmRleCA9IC0xO1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLl90aW1lQ3Vyc29yU3RhdGVzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBpZih0aGlzLl90aW1lQ3Vyc29yU3RhdGVzW2luZGV4XS5ob3ZlcmVkID09IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgaG92ZXJlZEN1cnNvckluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLl9mZnRDdXJzb3JTdGF0ZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX2ZmdEN1cnNvclN0YXRlc1tpbmRleF0uaG92ZXJlZCA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgIGhvdmVyZWRDdXJzb3JJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBob3ZlcmVkQ3Vyc29ySW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBwb3NpdGlvbiBvZiB0aGUgY3Vyc29yIHdpdGggdGhlIGdpdmVuIGluZGV4XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGN1cnNvckluZGV4XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcG9zaXRpb25cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTdGF0ZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFBvc2l0aW9uKGN1cnNvckluZGV4OiBudW1iZXIsIHBvc2l0aW9uOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5nZXRMYXN0Q3Vyc29yVHlwZVNlbGVjdGVkKCkgPT0gQ3Vyc29yVHlwZS50aW1lRG9tYWluKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RpbWVDdXJzb3JTdGF0ZXNbY3Vyc29ySW5kZXhdLnBvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuZ2V0TGFzdEN1cnNvclR5cGVTZWxlY3RlZCgpID09IEN1cnNvclR5cGUuZnJlcXVlbmN5RG9tYWluKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZmdEN1cnNvclN0YXRlc1tjdXJzb3JJbmRleF0ucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgcG9zaXRpb24gb2YgdGhlIGN1cnNvciB3aXRoIHRoZSBnaXZlbiBpbmRleFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjdXJzb3JJbmRleFxyXG4gICAgICogQHJldHVybnMgeyhudW1iZXJ8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTdGF0ZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFBvc2l0aW9uKGN1cnNvckluZGV4OiBudW1iZXIsIGN1cnNvclR5cGU6IEN1cnNvclR5cGUpOiBudW1iZXJ8dW5kZWZpbmVkIHtcclxuICAgICAgICBpZiAoY3Vyc29yVHlwZSA9PSBDdXJzb3JUeXBlLnRpbWVEb21haW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RpbWVDdXJzb3JTdGF0ZXNbY3Vyc29ySW5kZXhdLnBvc2l0aW9uO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2ZmdEN1cnNvclN0YXRlc1tjdXJzb3JJbmRleF0ucG9zaXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIGN1cnJlbnQgc2VsZWN0ZWQgY3Vyc29yIG9yIC0xIGlmIG5vIHNlbGVjdGVkIGN1cnNvciBpcyBhdmFpbGFibGVcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclN0YXRlc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0U2VsZWN0ZWRDdXJzb3JJbmRleCgpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBzZWxlY3RlZEN1cnNvckluZGV4ID0gLTE7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fdGltZUN1cnNvclN0YXRlcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX3RpbWVDdXJzb3JTdGF0ZXNbaV0uc2VsZWN0ZWQgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEN1cnNvckluZGV4ID0gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2ZmdEN1cnNvclN0YXRlcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX2ZmdEN1cnNvclN0YXRlc1tpXS5zZWxlY3RlZCA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ3Vyc29ySW5kZXggPSBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZWxlY3RlZEN1cnNvckluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyBzZWxlY3RlZCBmbGFnIG9mIHRoZSBjdXJzb3Igd2l0aCB0aGUgZ2l2ZW4gaW5kZXgoaWYgdHJ1ZSBhbGwgb3RoZXIgY3Vyc29ycyB3aWxsIGJlIHNldCB0byBkZXNlbGVjdGVkKVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjdXJzb3JJbmRleFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBzZWxlY3RlZFxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclN0YXRlc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0U2VsZWN0ZWQoY3Vyc29ySW5kZXg6IG51bWJlciwgc2VsZWN0ZWQ6IGJvb2xlYW4pIHtcclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLmdldExhc3RDdXJzb3JUeXBlU2VsZWN0ZWQoKSA9PSBDdXJzb3JUeXBlLmZyZXF1ZW5jeURvbWFpbikge1xyXG4gICAgICAgICAgICB0aGlzLl9mZnRDdXJzb3JTdGF0ZXNbY3Vyc29ySW5kZXhdLnNlbGVjdGVkID0gc2VsZWN0ZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5nZXRMYXN0Q3Vyc29yVHlwZVNlbGVjdGVkKCkgPT0gQ3Vyc29yVHlwZS50aW1lRG9tYWluKSB7XHJcbiAgICAgICAgICAgdGhpcy5fdGltZUN1cnNvclN0YXRlc1tjdXJzb3JJbmRleF0uc2VsZWN0ZWQgPSBzZWxlY3RlZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoc2VsZWN0ZWQgPT0gdHJ1ZSl7IFxyXG4gICAgICAgICAgICAvLyBzZXQgYWxsIG90aGVyIGN1cnNvcnMgdG8gc2VsZWN0ZWQgZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5zZXRPdGhlckN1cnNvcnNUb0ZhbHNlKGN1cnNvckluZGV4LCB0aGlzLmdldExhc3RDdXJzb3JUeXBlU2VsZWN0ZWQoKSwgJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSBzcGVjaWZpZWQgcHJvcGVydHkgdG8gZmFsc2UgZm9yIGFsbCB0aGUgY3Vyc29yU3RhdGVzIGV4Y2VwdCBvbmVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGN1cnNvckluZGV4XHJcbiAgICAgKiBAcGFyYW0ge0N1cnNvclR5cGV9IGN1cnNvclR5cGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclN0YXRlc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldE90aGVyQ3Vyc29yc1RvRmFsc2UgKGN1cnNvckluZGV4OiBudW1iZXIsIGN1cnNvclR5cGU6IEN1cnNvclR5cGUsIHByb3BlcnR5OiBzdHJpbmcpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3RpbWVDdXJzb3JTdGF0ZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZiAoY3Vyc29yVHlwZSA9PSBDdXJzb3JUeXBlLnRpbWVEb21haW4pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2ZmdEN1cnNvclN0YXRlc1tpXVtwcm9wZXJ0eV0gPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChpICE9IGN1cnNvckluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9mZnRDdXJzb3JTdGF0ZXNbaV1bcHJvcGVydHldID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fZmZ0Q3Vyc29yU3RhdGVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYgKGN1cnNvclR5cGUgPT0gQ3Vyc29yVHlwZS5mcmVxdWVuY3lEb21haW4pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RpbWVDdXJzb3JTdGF0ZXNbaV1bcHJvcGVydHldID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoaSAhPSBjdXJzb3JJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdGltZUN1cnNvclN0YXRlc1tpXVtwcm9wZXJ0eV09IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19