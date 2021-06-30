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
define(["require", "exports", "../../../framework/state", "./cursorState", "../../../common/persistence/persistDataProvider", "../../../common/persistence/settings", "./settingIds"], function (require, exports, state_1, cursorState_1, persistDataProvider_1, settings_1, settingIds_1) {
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
            _this._persistData = true;
            // Set the persisting id where the CursorStates will be saved
            _this._id = "CursorStates"; // unique id of the instance
            _this._type = "CursorStates"; // type of this class(normally the classname)
            // Create default cursor States
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
            // TODO: Move to initialize
            _this.loadSettings();
            return _this;
        }
        /**
         * Disposes the object
         *
         * @memberof CursorStates
         */
        CursorStates.prototype.dispose = function () {
        };
        /**
         * Saves the persisting data of this component to the persisting data provider
         *
         * @memberof CursorStates
         */
        CursorStates.prototype.saveSettings = function () {
            if (this._persistData == true) {
                if (this._id != "") {
                    persistDataProvider_1.PersistDataProvider.getInstance().setDataWithId(this._id, this.getSettings());
                }
                else {
                    console.warn("No id for persisting data available!(cursorState)");
                    console.warn(this);
                }
            }
        };
        /**
         * Loads the persisting data from the persisting data provider for this component
         *
         * @memberof CursorStates
         */
        CursorStates.prototype.loadSettings = function () {
            var settingsData = persistDataProvider_1.PersistDataProvider.getInstance().getDataWithId(this._id);
            if (settingsData != undefined) {
                this.setSettings(settingsData);
            }
        };
        /**
         * Returns the current settings of this cursorStates object
         *
         * @returns {ISettings}
         * @memberof CursorStates
         */
        CursorStates.prototype.getSettings = function () {
            var settings = new settings_1.Settings(this._type), timePositions = Array(), timeActiveStates = Array(), fftPositions = Array(), fftActiveStates = Array();
            this._timeCursorStates.forEach(function (cursor) {
                timePositions.push(cursor.position);
                timeActiveStates.push(cursor.active);
            });
            this._fftCursorStates.forEach(function (cursor) {
                fftPositions.push(cursor.position);
                fftActiveStates.push(cursor.active);
            });
            //Persist position and active state
            settings.setValue(settingIds_1.SettingIds.TimeCursorPositions, timePositions);
            settings.setValue(settingIds_1.SettingIds.FftCursorPositions, fftPositions);
            settings.setValue(settingIds_1.SettingIds.TimeCursorActiveState, timeActiveStates);
            settings.setValue(settingIds_1.SettingIds.FftCursorActiveState, fftActiveStates);
            return settings;
        };
        /**
         * Sets the given settings to this cursorStates object
         *
         * @param {ISettings} settings
         * @memberof CursorStates
         */
        CursorStates.prototype.setSettings = function (settings) {
            var settingsObj = settings_1.Settings.create(settings), timePositions = settingsObj.getValue(settingIds_1.SettingIds.TimeCursorPositions), fftPositions = settingsObj.getValue(settingIds_1.SettingIds.FftCursorPositions), timeActiveStates = settingsObj.getValue(settingIds_1.SettingIds.TimeCursorActiveState), fftActiveStates = settingsObj.getValue(settingIds_1.SettingIds.FftCursorActiveState);
            for (var i = 0; i < timePositions.length; i++) {
                this._timeCursorStates[i].position = timePositions[i];
                this._timeCursorStates[i].active = timeActiveStates[i];
            }
            for (var i = 0; i < fftPositions.length; i++) {
                this._fftCursorStates[i].position = fftPositions[i];
                this._fftCursorStates[i].active = fftActiveStates[i];
            }
            this._cursorStates = this._timeCursorStates.concat(this._fftCursorStates);
        };
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
         * Reset cursor states
         *
         * @param {CursorType} type
         * @memberof CursorStates
         */
        CursorStates.prototype.resetCursorStates = function (type) {
            if (type === CursorType.timeDomain) {
                this.resetTimeCursorStates();
            }
            else if (type === CursorType.frequencyDomain) {
                this.resetFqCursorStates();
            }
            this.saveSettings();
        };
        /**
         * Reset time cursor states
         *
         * @private
         * @memberof CursorStates
         */
        CursorStates.prototype.resetTimeCursorStates = function () {
            this._timeCursorStates.forEach(function (state) {
                state.active = false;
                state.hovered = false;
                state.position = undefined;
            });
        };
        /**
         * Reset fq cursor states
         *
         * @private
         * @memberof CursorStates
         */
        CursorStates.prototype.resetFqCursorStates = function () {
            this._fftCursorStates.forEach(function (state) {
                state.active = false;
                state.hovered = false;
                state.position = undefined;
            });
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
            this.saveSettings();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3Vyc29yU3RhdGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2NvbW1vbi9zdGF0ZXMvY3Vyc29yU3RhdGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFTQSxJQUFZLFVBR1g7SUFIRCxXQUFZLFVBQVU7UUFDbEIsdURBQVUsQ0FBQTtRQUNWLGlFQUFlLENBQUE7SUFDbkIsQ0FBQyxFQUhXLFVBQVUsR0FBVixrQkFBVSxLQUFWLGtCQUFVLFFBR3JCO0lBRUQ7Ozs7O09BS0c7SUFDSDtRQUFrQyxnQ0FBSztRQXFCbkM7OztXQUdHO1FBQ0g7WUFBQSxZQUNJLGlCQUFPLFNBaUJWO1lBaENPLGtCQUFZLEdBQVksSUFBSSxDQUFDO1lBSXJDLDZEQUE2RDtZQUNyRCxTQUFHLEdBQVcsY0FBYyxDQUFDLENBQUMsNEJBQTRCO1lBRTFELFdBQUssR0FBVyxjQUFjLENBQUMsQ0FBQyw2Q0FBNkM7WUFVakYsK0JBQStCO1lBQy9CLElBQUksWUFBWSxHQUFnQixJQUFJLHlCQUFXLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3ZFLElBQUksWUFBWSxHQUFnQixJQUFJLHlCQUFXLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3ZFLElBQUksZUFBZSxHQUFnQixJQUFJLHlCQUFXLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQy9FLElBQUksZUFBZSxHQUFnQixJQUFJLHlCQUFXLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBRS9FLEtBQUksQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQztZQUN0RCxLQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxlQUFlLEVBQUUsZUFBZSxDQUFDLENBQUM7WUFDM0QsS0FBSSxDQUFDLGFBQWEsR0FBRyxLQUFJLENBQUMsaUJBQWlCLENBQUMs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LElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQ25ELElBQUksVUFBVSxJQUFJLFVBQVUsQ0FBQyxVQUFVLEVBQUU7b0JBQ3JDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxLQUFLLENBQUM7aUJBQzlDO3FCQUNJLElBQUksQ0FBQyxJQUFJLFdBQVcsRUFBRTtvQkFDdkIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEtBQUssQ0FBQztpQkFDOUM7YUFDSjtZQUVELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUNsRCxJQUFJLFVBQVUsSUFBSSxVQUFVLENBQUMsZUFBZSxFQUFFO29CQUMxQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsS0FBSyxDQUFDO2lCQUMvQztxQkFDSSxJQUFJLENBQUMsSUFBSSxXQUFXLEVBQUU7b0JBQ3ZCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRSxLQUFLLENBQUM7aUJBQzlDO2FBQ0o7UUFDTCxDQUFDO1FBQ0wsbUJBQUM7SUFBRCxDQUFDLEFBamJELENBQWtDLGFBQUssR0FpYnRDO0lBamJZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3RhdGUgfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL3N0YXRlXCI7XHJcbmltcG9ydCB7IEN1cnNvclN0YXRlIH0gZnJvbSBcIi4vY3Vyc29yU3RhdGVcIjtcclxuaW1wb3J0IHsgSUN1cnNvclN0YXRlIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvY3Vyc29yU3RhdGVJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVNldHRpbmdzT2JqZWN0IH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9pbnRlcmZhY2VzL3NldHRpbmdzT2JqZWN0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFBlcnNpc3REYXRhUHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BlcnNpc3RlbmNlL3BlcnNpc3REYXRhUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgSVNldHRpbmdzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9pbnRlcmZhY2VzL3NldHRpbmdzSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBTZXR0aW5nSWRzIH0gZnJvbSBcIi4vc2V0dGluZ0lkc1wiO1xyXG5cclxuZXhwb3J0IGVudW0gQ3Vyc29yVHlwZXtcclxuICAgIHRpbWVEb21haW4sXHJcbiAgICBmcmVxdWVuY3lEb21haW5cclxufVxyXG5cclxuLyoqXHJcbiAqIGhvbGRzIGN1cnNvciBzdGF0ZSBvYmplY3RzXHJcbiAqIEBzaW5nbGV0b25cclxuICogQGV4cG9ydFxyXG4gKiBAY2xhc3MgQ3Vyc29yU3RhdGVzXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ3Vyc29yU3RhdGVzIGV4dGVuZHMgU3RhdGUgaW1wbGVtZW50cyBJU2V0dGluZ3NPYmplY3R7XHJcblxyXG4gICAgLy8gaG9sZHMgdGltZSBjdXJzb3JzXHJcbiAgICBwcml2YXRlIF90aW1lQ3Vyc29yU3RhdGVzOiBBcnJheTxDdXJzb3JTdGF0ZT47XHJcblxyXG4gICAgLy9ob2xkcyBmZnQgY3Vyc29yc1xyXG4gICAgcHJpdmF0ZSBfZmZ0Q3Vyc29yU3RhdGVzOiBBcnJheTxDdXJzb3JTdGF0ZT47XHJcblxyXG4gICAgLy8gaG9sZHMgdGhlIGN1cnNvciBzdGF0ZXMgaW4gYW4gYXJyYXkgZm9yIGNvbnZlbmllbmNlIGFjY2Vzc1xyXG4gICAgcHJpdmF0ZSBfY3Vyc29yU3RhdGVzOiBBcnJheTxDdXJzb3JTdGF0ZT47XHJcblxyXG4gICAgcHJpdmF0ZSBfcGVyc2lzdERhdGE6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIHByb3RlY3RlZCBsYXN0Q3Vyc29yVHlwZVNlbGVjdGVkO1xyXG4gICAgICBcclxuICAgIC8vIFNldCB0aGUgcGVyc2lzdGluZyBpZCB3aGVyZSB0aGUgQ3Vyc29yU3RhdGVzIHdpbGwgYmUgc2F2ZWRcclxuICAgIHByaXZhdGUgX2lkOiBzdHJpbmcgPSBcIkN1cnNvclN0YXRlc1wiOyAvLyB1bmlxdWUgaWQgb2YgdGhlIGluc3RhbmNlXHJcbiAgICBcclxuICAgIHByaXZhdGUgX3R5cGU6IHN0cmluZyA9IFwiQ3Vyc29yU3RhdGVzXCI7IC8vIHR5cGUgb2YgdGhpcyBjbGFzcyhub3JtYWxseSB0aGUgY2xhc3NuYW1lKVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQ3Vyc29yU3RhdGVzLlxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclN0YXRlc1xyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBkZWZhdWx0IGN1cnNvciBTdGF0ZXNcclxuICAgICAgICBsZXQgY3Vyc29yU3RhdGUxOiBDdXJzb3JTdGF0ZSA9IG5ldyBDdXJzb3JTdGF0ZShDdXJzb3JUeXBlLnRpbWVEb21haW4pOyBcclxuICAgICAgICBsZXQgY3Vyc29yU3RhdGUyOiBDdXJzb3JTdGF0ZSA9IG5ldyBDdXJzb3JTdGF0ZShDdXJzb3JUeXBlLnRpbWVEb21haW4pO1xyXG4gICAgICAgIGxldCBGRlRjdXJzb3JTdGF0ZTE6IEN1cnNvclN0YXRlID0gbmV3IEN1cnNvclN0YXRlKEN1cnNvclR5cGUuZnJlcXVlbmN5RG9tYWluKTtcclxuICAgICAgICBsZXQgRkZUY3Vyc29yU3RhdGUyOiBDdXJzb3JTdGF0ZSA9IG5ldyBDdXJzb3JTdGF0ZShDdXJzb3JUeXBlLmZyZXF1ZW5jeURvbWFpbik7XHJcblxyXG4gICAgICAgIHRoaXMuX3RpbWVDdXJzb3JTdGF0ZXMgPSBbY3Vyc29yU3RhdGUxLCBjdXJzb3JTdGF0ZTJdO1xyXG4gICAgICAgIHRoaXMuX2ZmdEN1cnNvclN0YXRlcyA9IFtGRlRjdXJzb3JTdGF0ZTEsIEZGVGN1cnNvclN0YXRlMl07XHJcbiAgICAgICAgdGhpcy5fY3Vyc29yU3RhdGVzID0gdGhpcy5fdGltZUN1cnNvclN0YXRlcy5jb25jYXQodGhpcy5fZmZ0Q3Vyc29yU3RhdGVzKTtcclxuXHJcbiAgICAgICAgLy8gU2VsZWN0IGN1cnNvciAxIGJ5IGRlZmF1bHRcclxuICAgICAgICBjdXJzb3JTdGF0ZTEuc2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubGFzdEN1cnNvclR5cGVTZWxlY3RlZCA9IEN1cnNvclR5cGUudGltZURvbWFpbjtcclxuICAgICAgICAvLyBUT0RPOiBNb3ZlIHRvIGluaXRpYWxpemVcclxuICAgICAgICB0aGlzLmxvYWRTZXR0aW5ncygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzcG9zZXMgdGhlIG9iamVjdFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTdGF0ZXNcclxuICAgICAqL1xyXG4gICAgZGlzcG9zZSgpe1xyXG5cclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBTYXZlcyB0aGUgcGVyc2lzdGluZyBkYXRhIG9mIHRoaXMgY29tcG9uZW50IHRvIHRoZSBwZXJzaXN0aW5nIGRhdGEgcHJvdmlkZXJcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU3RhdGVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzYXZlU2V0dGluZ3MoKSB7XHJcbiAgICAgICAgaWYodGhpcy5fcGVyc2lzdERhdGEgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX2lkICE9IFwiXCIpe1xyXG4gICAgICAgICAgICAgICAgUGVyc2lzdERhdGFQcm92aWRlci5nZXRJbnN0YW5jZSgpLnNldERhdGFXaXRoSWQodGhpcy5faWQsIHRoaXMuZ2V0U2V0dGluZ3MoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIk5vIGlkIGZvciBwZXJzaXN0aW5nIGRhdGEgYXZhaWxhYmxlIShjdXJzb3JTdGF0ZSlcIik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4odGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkcyB0aGUgcGVyc2lzdGluZyBkYXRhIGZyb20gdGhlIHBlcnNpc3RpbmcgZGF0YSBwcm92aWRlciBmb3IgdGhpcyBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU3RhdGVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBsb2FkU2V0dGluZ3MoKSB7XHJcbiAgICAgICAgbGV0IHNldHRpbmdzRGF0YSA9IFBlcnNpc3REYXRhUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXREYXRhV2l0aElkKHRoaXMuX2lkKTtcclxuICAgICAgICBpZihzZXR0aW5nc0RhdGEgICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U2V0dGluZ3Moc2V0dGluZ3NEYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgY3VycmVudCBzZXR0aW5ncyBvZiB0aGlzIGN1cnNvclN0YXRlcyBvYmplY3RcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7SVNldHRpbmdzfVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclN0YXRlc1xyXG4gICAgICovXHJcbiAgICBnZXRTZXR0aW5ncygpOiBJU2V0dGluZ3Mge1xyXG4gICAgICAgIGxldCBzZXR0aW5ncyA9IG5ldyBTZXR0aW5ncyh0aGlzLl90eXBlKSxcclxuICAgICAgICB0aW1lUG9zaXRpb25zID0gQXJyYXkoKSxcclxuICAgICAgICB0aW1lQWN0aXZlU3RhdGVzID0gQXJyYXkoKSxcclxuICAgICAgICBmZnRQb3NpdGlvbnMgPSBBcnJheSgpLFxyXG4gICAgICAgIGZmdEFjdGl2ZVN0YXRlcyA9IEFycmF5KCk7XHJcblxyXG4gICAgICAgIHRoaXMuX3RpbWVDdXJzb3JTdGF0ZXMuZm9yRWFjaCgoY3Vyc29yKSA9PiB7XHJcbiAgICAgICAgICAgIHRpbWVQb3NpdGlvbnMucHVzaChjdXJzb3IucG9zaXRpb24pO1xyXG4gICAgICAgICAgICB0aW1lQWN0aXZlU3RhdGVzLnB1c2goY3Vyc29yLmFjdGl2ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fZmZ0Q3Vyc29yU3RhdGVzLmZvckVhY2goKGN1cnNvcikgPT4ge1xyXG4gICAgICAgICAgICBmZnRQb3NpdGlvbnMucHVzaChjdXJzb3IucG9zaXRpb24pO1xyXG4gICAgICAgICAgICBmZnRBY3RpdmVTdGF0ZXMucHVzaChjdXJzb3IuYWN0aXZlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9QZXJzaXN0IHBvc2l0aW9uIGFuZCBhY3RpdmUgc3RhdGVcclxuICAgICAgICBzZXR0aW5ncy5zZXRWYWx1ZShTZXR0aW5nSWRzLlRpbWVDdXJzb3JQb3NpdGlvbnMsIHRpbWVQb3NpdGlvbnMpO1xyXG4gICAgICAgIHNldHRpbmdzLnNldFZhbHVlKFNldHRpbmdJZHMuRmZ0Q3Vyc29yUG9zaXRpb25zLCBmZnRQb3NpdGlvbnMpO1xyXG4gICAgICAgIHNldHRpbmdzLnNldFZhbHVlKFNldHRpbmdJZHMuVGltZUN1cnNvckFjdGl2ZVN0YXRlLCB0aW1lQWN0aXZlU3RhdGVzKTtcclxuICAgICAgICBzZXR0aW5ncy5zZXRWYWx1ZShTZXR0aW5nSWRzLkZmdEN1cnNvckFjdGl2ZVN0YXRlLCBmZnRBY3RpdmVTdGF0ZXMpO1xyXG4gICAgICAgIHJldHVybiBzZXR0aW5ncztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGdpdmVuIHNldHRpbmdzIHRvIHRoaXMgY3Vyc29yU3RhdGVzIG9iamVjdFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SVNldHRpbmdzfSBzZXR0aW5nc1xyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclN0YXRlc1xyXG4gICAgICovXHJcbiAgICBzZXRTZXR0aW5ncyhzZXR0aW5nczogSVNldHRpbmdzKSB7XHJcbiAgICAgICAgbGV0IHNldHRpbmdzT2JqID0gU2V0dGluZ3MuY3JlYXRlKHNldHRpbmdzKSxcclxuICAgICAgICB0aW1lUG9zaXRpb25zID0gc2V0dGluZ3NPYmouZ2V0VmFsdWUoU2V0dGluZ0lkcy5UaW1lQ3Vyc29yUG9zaXRpb25zKSxcclxuICAgICAgICBmZnRQb3NpdGlvbnMgPSBzZXR0aW5nc09iai5nZXRWYWx1ZShTZXR0aW5nSWRzLkZmdEN1cnNvclBvc2l0aW9ucyksXHJcbiAgICAgICAgdGltZUFjdGl2ZVN0YXRlcyA9IHNldHRpbmdzT2JqLmdldFZhbHVlKFNldHRpbmdJZHMuVGltZUN1cnNvckFjdGl2ZVN0YXRlKSxcclxuICAgICAgICBmZnRBY3RpdmVTdGF0ZXMgPSBzZXR0aW5nc09iai5nZXRWYWx1ZShTZXR0aW5nSWRzLkZmdEN1cnNvckFjdGl2ZVN0YXRlKTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aW1lUG9zaXRpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RpbWVDdXJzb3JTdGF0ZXNbaV0ucG9zaXRpb24gPSB0aW1lUG9zaXRpb25zW2ldO1xyXG4gICAgICAgICAgICB0aGlzLl90aW1lQ3Vyc29yU3RhdGVzW2ldLmFjdGl2ZSA9IHRpbWVBY3RpdmVTdGF0ZXNbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZmdFBvc2l0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLl9mZnRDdXJzb3JTdGF0ZXNbaV0ucG9zaXRpb24gPSBmZnRQb3NpdGlvbnNbaV07XHJcbiAgICAgICAgICAgIHRoaXMuX2ZmdEN1cnNvclN0YXRlc1tpXS5hY3RpdmUgPSBmZnRBY3RpdmVTdGF0ZXNbaV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9jdXJzb3JTdGF0ZXMgPSB0aGlzLl90aW1lQ3Vyc29yU3RhdGVzLmNvbmNhdCh0aGlzLl9mZnRDdXJzb3JTdGF0ZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhIGxpc3Qgb2YgYWxsIGF2YWlsYWJsZSBjdXJzb3Igc3RhdGVzXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0FycmF5PElDdXJzb3JTdGF0ZT59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU3RhdGVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRTdGF0ZXMoKTogQXJyYXk8SUN1cnNvclN0YXRlPntcclxuICAgICAgICByZXR1cm4gdGhpcy5fY3Vyc29yU3RhdGVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhIGxpc3Qgb2YgYWxsIGF2YWlsYWJsZSB0aW1lIGN1cnNvciBzdGF0ZXNcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8SUN1cnNvclN0YXRlPn1cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTdGF0ZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFRpbWVTdGF0ZXMoKTogQXJyYXk8SUN1cnNvclN0YXRlPntcclxuICAgICAgICByZXR1cm4gdGhpcy5fdGltZUN1cnNvclN0YXRlcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSBsaXN0IG9mIGFsbCBhdmFpbGFibGUgdGltZSBjdXJzb3Igc3RhdGVzXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0FycmF5PElDdXJzb3JTdGF0ZT59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU3RhdGVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRGcmVxdWVuY3lTdGF0ZXMoKTogQXJyYXk8SUN1cnNvclN0YXRlPntcclxuICAgICAgICByZXR1cm4gdGhpcy5fZmZ0Q3Vyc29yU3RhdGVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgYWN0aXZlIGZsYWcgZm9yIHRoZSBnaXZlbiBpbmRleFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjdXJzb3JJbmRleFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBhY3RpdmVcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTdGF0ZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldEFjdGl2ZShjdXJzb3JJbmRleDogbnVtYmVyLCBhY3RpdmU6IGJvb2xlYW4pIHtcclxuICAgICAgICBpZiAodGhpcy5nZXRMYXN0Q3Vyc29yVHlwZVNlbGVjdGVkKCkgPT0gQ3Vyc29yVHlwZS50aW1lRG9tYWluKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RpbWVDdXJzb3JTdGF0ZXNbY3Vyc29ySW5kZXhdLmFjdGl2ZSA9IGFjdGl2ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5nZXRMYXN0Q3Vyc29yVHlwZVNlbGVjdGVkKCkgPT0gQ3Vyc29yVHlwZS5mcmVxdWVuY3lEb21haW4pIHtcclxuICAgICAgICAgICAgdGhpcy5fZmZ0Q3Vyc29yU3RhdGVzW2N1cnNvckluZGV4XS5hY3RpdmUgPSBhY3RpdmU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgYWN0aXZlIGZsYWcgZm9yIHRoZSBnaXZlbiBpbmRleFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjdXJzb3JJbmRleFxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU3RhdGVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRBY3RpdmUoY3Vyc29ySW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0aGlzLmdldExhc3RDdXJzb3JUeXBlU2VsZWN0ZWQoKSA9PSBDdXJzb3JUeXBlLnRpbWVEb21haW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RpbWVDdXJzb3JTdGF0ZXNbY3Vyc29ySW5kZXhdLmFjdGl2ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5nZXRMYXN0Q3Vyc29yVHlwZVNlbGVjdGVkKCkgPT0gQ3Vyc29yVHlwZS5mcmVxdWVuY3lEb21haW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2ZmdEN1cnNvclN0YXRlc1tjdXJzb3JJbmRleF0uYWN0aXZlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNldCBjdXJzb3Igc3RhdGVzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtDdXJzb3JUeXBlfSB0eXBlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU3RhdGVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZXNldEN1cnNvclN0YXRlcyh0eXBlOiBDdXJzb3JUeXBlKSB7XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IEN1cnNvclR5cGUudGltZURvbWFpbikge1xyXG4gICAgICAgICAgICB0aGlzLnJlc2V0VGltZUN1cnNvclN0YXRlcygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09PSBDdXJzb3JUeXBlLmZyZXF1ZW5jeURvbWFpbikge1xyXG4gICAgICAgICAgICB0aGlzLnJlc2V0RnFDdXJzb3JTdGF0ZXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zYXZlU2V0dGluZ3MoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlc2V0IHRpbWUgY3Vyc29yIHN0YXRlc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU3RhdGVzXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVzZXRUaW1lQ3Vyc29yU3RhdGVzKCkge1xyXG4gICAgICAgIHRoaXMuX3RpbWVDdXJzb3JTdGF0ZXMuZm9yRWFjaCgoc3RhdGUpID0+IHtcclxuICAgICAgICAgICAgc3RhdGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHN0YXRlLmhvdmVyZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgc3RhdGUucG9zaXRpb24gPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlc2V0IGZxIGN1cnNvciBzdGF0ZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclN0YXRlc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlc2V0RnFDdXJzb3JTdGF0ZXMoKSB7XHJcbiAgICAgICAgdGhpcy5fZmZ0Q3Vyc29yU3RhdGVzLmZvckVhY2goKHN0YXRlKSA9PiB7XHJcbiAgICAgICAgICAgIHN0YXRlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzdGF0ZS5ob3ZlcmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHN0YXRlLnBvc2l0aW9uID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSB0eXBlIG9mIGN1cnNvciB0aGF0IGhhcyBiZWVuIHNlbGVjdGVkXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtDdXJzb3JUeXBlfSB0eXBlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU3RhdGVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRMYXN0Q3Vyc29yVHlwZVNlbGVjdGVkKHR5cGU6IEN1cnNvclR5cGUpe1xyXG4gICAgICAgIHRoaXMubGFzdEN1cnNvclR5cGVTZWxlY3RlZCA9IHR5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSB0eXBlIG9mIGN1cnNvciB0aGF0IGhhcyBiZWVuIHNlbGVjdGVkXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0N1cnNvclR5cGV9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU3RhdGVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRMYXN0Q3Vyc29yVHlwZVNlbGVjdGVkKCk6IEN1cnNvclR5cGV7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGFzdEN1cnNvclR5cGVTZWxlY3RlZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCBob3ZlcmVkIGZsYWcgZm9yIHRoZSBjdXJzb3Igd2l0aCB0aGUgZ2l2ZW4gaW5kZXgsIGFuZCByZW1vdmUgaG92ZXJlZCBmbGFnIGZyb20gYWxsIG90aGVyIGN1cnNvcnNcclxuICAgICAqIGlmIGhvdmVyZWQgPSBmYWxzZSBhbmQgY3Vyc29ySW5kZXggPSAtMSwgaG92ZXJlZCB3aWxsIGJlIHNldCB0byBmYWxzZSBhdCBhbGwgY3Vyc29yc1xyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY3Vyc29ySW5kZXhcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gaG92ZXJlZFxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclN0YXRlc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0SG92ZXJlZChjdXJzb3JJbmRleDogbnVtYmVyLCBjdXJzb3JUeXBlOiBDdXJzb3JUeXBlIHwgdW5kZWZpbmVkLCBob3ZlcmVkOiBib29sZWFuKSB7XHJcbiAgICAgICAgaWYoY3Vyc29ySW5kZXggPj0gMCAmJiBjdXJzb3JJbmRleCA8IHRoaXMuX2N1cnNvclN0YXRlcy5sZW5ndGgpe1xyXG4gICAgICAgICAgICBpZiAoY3Vyc29yVHlwZSA9PSBDdXJzb3JUeXBlLnRpbWVEb21haW4pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RpbWVDdXJzb3JTdGF0ZXNbY3Vyc29ySW5kZXhdLmhvdmVyZWQgPSBob3ZlcmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGN1cnNvclR5cGUgPT0gQ3Vyc29yVHlwZS5mcmVxdWVuY3lEb21haW4pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2ZmdEN1cnNvclN0YXRlc1tjdXJzb3JJbmRleF0uaG92ZXJlZCA9IGhvdmVyZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYoaG92ZXJlZCA9PSB0cnVlKXsgXHJcbiAgICAgICAgICAgICAgICAvLyBzZXQgYWxsIG90aGVyIGN1cnNvcnMgdG8gaG92ZXJlZCBmYWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRPdGhlckN1cnNvcnNUb0ZhbHNlKGN1cnNvckluZGV4LCBjdXJzb3JUeXBlISwgJ2hvdmVyZWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjdXJzb3JJbmRleCA9PSAtMSAmJiBob3ZlcmVkID09IGZhbHNlKXtcclxuICAgICAgICAgICAgLy8gU2V0IGFsbCBjdXJzb3IgaG92ZXJlZCBmbGFncyB0byBmYWxzZVxyXG4gICAgICAgICAgICB0aGlzLl9jdXJzb3JTdGF0ZXMuZm9yRWFjaChjdXJzb3JTdGF0ZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29yU3RhdGUuaG92ZXJlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBob3ZlcmVkIGZsYWcgZm9yIHRoZSBnaXZlbiBpbmRleFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjdXJzb3JJbmRleFxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU3RhdGVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRIb3ZlcmVkKGN1cnNvckluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY3Vyc29yU3RhdGVzW2N1cnNvckluZGV4XS5ob3ZlcmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgaW5kZXggb2YgYSBjdXJyZW50IGhvdmVyZWQgY3Vyc29yIG9yIC0xIGlmIG5vIGhvdmVyZWQgY3Vyc29yIGlzIGF2YWlsYWJsZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU3RhdGVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRIb3ZlcmVkQ3Vyc29ySW5kZXgoKTogbnVtYmVye1xyXG4gICAgICAgIGxldCBob3ZlcmVkQ3Vyc29ySW5kZXggPSAtMTtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5fdGltZUN1cnNvclN0YXRlcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYodGhpcy5fdGltZUN1cnNvclN0YXRlc1tpbmRleF0uaG92ZXJlZCA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgIGhvdmVyZWRDdXJzb3JJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5fZmZ0Q3Vyc29yU3RhdGVzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBpZih0aGlzLl9mZnRDdXJzb3JTdGF0ZXNbaW5kZXhdLmhvdmVyZWQgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICBob3ZlcmVkQ3Vyc29ySW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaG92ZXJlZEN1cnNvckluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgcG9zaXRpb24gb2YgdGhlIGN1cnNvciB3aXRoIHRoZSBnaXZlbiBpbmRleFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjdXJzb3JJbmRleFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHBvc2l0aW9uXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU3RhdGVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRQb3NpdGlvbihjdXJzb3JJbmRleDogbnVtYmVyLCBwb3NpdGlvbjogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2V0TGFzdEN1cnNvclR5cGVTZWxlY3RlZCgpID09IEN1cnNvclR5cGUudGltZURvbWFpbikge1xyXG4gICAgICAgICAgICB0aGlzLl90aW1lQ3Vyc29yU3RhdGVzW2N1cnNvckluZGV4XS5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLmdldExhc3RDdXJzb3JUeXBlU2VsZWN0ZWQoKSA9PSBDdXJzb3JUeXBlLmZyZXF1ZW5jeURvbWFpbikge1xyXG4gICAgICAgICAgICB0aGlzLl9mZnRDdXJzb3JTdGF0ZXNbY3Vyc29ySW5kZXhdLnBvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2F2ZVNldHRpbmdzKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgcG9zaXRpb24gb2YgdGhlIGN1cnNvciB3aXRoIHRoZSBnaXZlbiBpbmRleFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjdXJzb3JJbmRleFxyXG4gICAgICogQHJldHVybnMgeyhudW1iZXJ8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTdGF0ZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFBvc2l0aW9uKGN1cnNvckluZGV4OiBudW1iZXIsIGN1cnNvclR5cGU6IEN1cnNvclR5cGUpOiBudW1iZXJ8dW5kZWZpbmVkIHtcclxuICAgICAgICBpZiAoY3Vyc29yVHlwZSA9PSBDdXJzb3JUeXBlLnRpbWVEb21haW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RpbWVDdXJzb3JTdGF0ZXNbY3Vyc29ySW5kZXhdLnBvc2l0aW9uO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2ZmdEN1cnNvclN0YXRlc1tjdXJzb3JJbmRleF0ucG9zaXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIGN1cnJlbnQgc2VsZWN0ZWQgY3Vyc29yIG9yIC0xIGlmIG5vIHNlbGVjdGVkIGN1cnNvciBpcyBhdmFpbGFibGVcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclN0YXRlc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0U2VsZWN0ZWRDdXJzb3JJbmRleCgpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBzZWxlY3RlZEN1cnNvckluZGV4ID0gLTE7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fdGltZUN1cnNvclN0YXRlcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX3RpbWVDdXJzb3JTdGF0ZXNbaV0uc2VsZWN0ZWQgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEN1cnNvckluZGV4ID0gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2ZmdEN1cnNvclN0YXRlcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX2ZmdEN1cnNvclN0YXRlc1tpXS5zZWxlY3RlZCA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ3Vyc29ySW5kZXggPSBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZWxlY3RlZEN1cnNvckluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyBzZWxlY3RlZCBmbGFnIG9mIHRoZSBjdXJzb3Igd2l0aCB0aGUgZ2l2ZW4gaW5kZXgoaWYgdHJ1ZSBhbGwgb3RoZXIgY3Vyc29ycyB3aWxsIGJlIHNldCB0byBkZXNlbGVjdGVkKVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjdXJzb3JJbmRleFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBzZWxlY3RlZFxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclN0YXRlc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0U2VsZWN0ZWQoY3Vyc29ySW5kZXg6IG51bWJlciwgc2VsZWN0ZWQ6IGJvb2xlYW4pIHtcclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLmdldExhc3RDdXJzb3JUeXBlU2VsZWN0ZWQoKSA9PSBDdXJzb3JUeXBlLmZyZXF1ZW5jeURvbWFpbikge1xyXG4gICAgICAgICAgICB0aGlzLl9mZnRDdXJzb3JTdGF0ZXNbY3Vyc29ySW5kZXhdLnNlbGVjdGVkID0gc2VsZWN0ZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5nZXRMYXN0Q3Vyc29yVHlwZVNlbGVjdGVkKCkgPT0gQ3Vyc29yVHlwZS50aW1lRG9tYWluKSB7XHJcbiAgICAgICAgICAgdGhpcy5fdGltZUN1cnNvclN0YXRlc1tjdXJzb3JJbmRleF0uc2VsZWN0ZWQgPSBzZWxlY3RlZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoc2VsZWN0ZWQgPT0gdHJ1ZSl7IFxyXG4gICAgICAgICAgICAvLyBzZXQgYWxsIG90aGVyIGN1cnNvcnMgdG8gc2VsZWN0ZWQgZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5zZXRPdGhlckN1cnNvcnNUb0ZhbHNlKGN1cnNvckluZGV4LCB0aGlzLmdldExhc3RDdXJzb3JUeXBlU2VsZWN0ZWQoKSwgJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSBzcGVjaWZpZWQgcHJvcGVydHkgdG8gZmFsc2UgZm9yIGFsbCB0aGUgY3Vyc29yU3RhdGVzIGV4Y2VwdCBvbmVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGN1cnNvckluZGV4XHJcbiAgICAgKiBAcGFyYW0ge0N1cnNvclR5cGV9IGN1cnNvclR5cGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclN0YXRlc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldE90aGVyQ3Vyc29yc1RvRmFsc2UgKGN1cnNvckluZGV4OiBudW1iZXIsIGN1cnNvclR5cGU6IEN1cnNvclR5cGUsIHByb3BlcnR5OiBzdHJpbmcpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3RpbWVDdXJzb3JTdGF0ZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZiAoY3Vyc29yVHlwZSA9PSBDdXJzb3JUeXBlLnRpbWVEb21haW4pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2ZmdEN1cnNvclN0YXRlc1tpXVtwcm9wZXJ0eV0gPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChpICE9IGN1cnNvckluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9mZnRDdXJzb3JTdGF0ZXNbaV1bcHJvcGVydHldID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fZmZ0Q3Vyc29yU3RhdGVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYgKGN1cnNvclR5cGUgPT0gQ3Vyc29yVHlwZS5mcmVxdWVuY3lEb21haW4pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RpbWVDdXJzb3JTdGF0ZXNbaV1bcHJvcGVydHldID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoaSAhPSBjdXJzb3JJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdGltZUN1cnNvclN0YXRlc1tpXVtwcm9wZXJ0eV09IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19