define(["require", "exports", "./cursorSignalDescriptor", "./cursorInfoVisibility", "../../../common/persistence/settings", "./settingIds"], function (require, exports, cursorSignalDescriptor_1, cursorInfoVisibility_1, settings_1, settingIds_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * implements the base class for the various types of cursor signals
     *
     * @export
     * @class CursorSignal
     */
    var CursorSignal = /** @class */ (function () {
        function CursorSignal(serie, expandState) {
            // holds an object with informations describing the cursor signal
            this._cursorSignalDescriptor = new cursorSignalDescriptor_1.CursorSignalDescriptor(undefined);
            this._serie = serie;
            this._expandState = expandState;
        }
        Object.defineProperty(CursorSignal.prototype, "serie", {
            /**
             * provides the serie
             *
             * @readonly
             * @type {BaseSeries}
             * @memberof CursorSignal
             */
            get: function () {
                return this._serie;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CursorSignal.prototype, "expandState", {
            /**
             * provides expandState of signal in treeGrid
             *
             * @type {boolean}
             * @memberof CursorSignal
             */
            get: function () {
                return this._expandState;
            },
            /**
             * sets expandState of signal in treeGrid
             *
             * @memberof CursorSignal
             */
            set: function (expandState) {
                this._expandState = expandState;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CursorSignal.prototype, "name", {
            /**
             * provides the serie name
             *
             * @readonly
             * @type {string}
             * @memberof CursorSignal
             */
            get: function () {
                return this._serie.name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CursorSignal.prototype, "value", {
            /**
             * provides additional descriptive info
             *
             * @readonly
             * @type {string}
             * @memberof CursorSignal
             */
            get: function () {
                return this._serie.additionalInfo;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CursorSignal.prototype, "visible", {
            /**
             * cursor signals are visible by default
             *
             * @readonly
             * @type {string}
             * @memberof CursorSignal
             */
            get: function () {
                return "true";
            },
            enumerable: true,
            configurable: true
        });
        /**
         * This method is used by the DynamicCursorSignalTemplate to get hold
         * of all available cursor information available to the YTChart
         *
         * @returns {Array<CursorDisplayInfoClass>}
         * @memberof CursorSignal
         */
        CursorSignal.prototype.getAllCursorInfo = function () {
            return [];
        };
        Object.defineProperty(CursorSignal.prototype, "cursorInfos", {
            /**
             * provides the current cursor infos
             *
             * @readonly
             * @type {Array<CursorInfo>}
             * @memberof CursorSignal
             */
            get: function () {
                return this._cursorSignalDescriptor.cursorInfos;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * dummy method for updating cursor values
         *
         * @param {IPoint} cursorData1
         * @param {IPoint} cursorData2
         * @param {number} time1
         * @param {number} time2
         * @memberof CursorSignal
         */
        CursorSignal.prototype.updateValues = function (cursorData1, cursorData2, time1, time2) {
        };
        /**
         * Clears all the cursor value informations
         *
         * @memberof CursorSignal
         */
        CursorSignal.prototype.clearValues = function () {
            this.cursorInfos.forEach(function (cursorInfo) {
                cursorInfo.value = "";
            });
        };
        Object.defineProperty(CursorSignal.prototype, "iconDefinition", {
            /**
             * Returns the icon representation for this node for the tree grid
             *
             * @readonly
             * @type {string}
             * @memberof CursorSignal
             */
            get: function () {
                var iconDefinition = "";
                var classNames = "e-treegridcollapse treegridcollapse";
                // Add collapse/expand icon 
                if (this.expandState == true) {
                    classNames += "e-treegridexpand treegridexpand";
                }
                iconDefinition += "<div class='" + classNames + "'></div>";
                // add series icon (with overlays)
                iconDefinition += "<div class='e-doc' style='position: relative;height:16px;width:30px;margin:auto;float:left;margin-left:0px;margin-top:2px'>";
                iconDefinition += this._serie.getIcon();
                iconDefinition += "</div>";
                return iconDefinition;
            },
            enumerable: true,
            configurable: true
        });
        CursorSignal.prototype.getSettings = function () {
            var settings = new settings_1.Settings("CursorSignal");
            settings.setValue(settingIds_1.SettingIds.SerieId, this.serie.id);
            settings.setValue(settingIds_1.SettingIds.ExpandState, this.expandState);
            settings.setValue(settingIds_1.SettingIds.CursorInfo, this.getCursorInfoVisibility());
            return settings;
        };
        /**
         * Get id and visibility of cursor info
         *
         * @private
         * @returns
         * @memberof CursorSignal
         */
        CursorSignal.prototype.getCursorInfoVisibility = function () {
            var cursorInfoVisibility = Array();
            this.cursorInfos.forEach(function (cursorInfo) {
                var info = new cursorInfoVisibility_1.CursorInfoVisibility(cursorInfo.id, cursorInfo.visible);
                cursorInfoVisibility.push(info);
            });
            return cursorInfoVisibility;
        };
        return CursorSignal;
    }());
    exports.CursorSignal = CursorSignal;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3Vyc29yU2lnbmFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2N1cnNvckluZm9XaWRnZXQvbW9kZWwvY3Vyc29yU2lnbmFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQVVBOzs7OztPQUtHO0lBQ0g7UUFTSSxzQkFBWSxLQUFpQixFQUFFLFdBQW9CO1lBUG5ELGlFQUFpRTtZQUN2RCw0QkFBdUIsR0FBMkIsSUFBSSwrQ0FBc0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQU85RixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNwQixJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQztRQUNwQyxDQUFDO1FBU0Qsc0JBQUksK0JBQUs7WUFQVDs7Ozs7O2VBTUc7aUJBQ0g7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ3ZCLENBQUM7OztXQUFBO1FBUUQsc0JBQUkscUNBQVc7WUFOZjs7Ozs7ZUFLRztpQkFDSDtnQkFDSSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDN0IsQ0FBQztZQUVEOzs7O2VBSUc7aUJBQ0gsVUFBZ0IsV0FBb0I7Z0JBQ2hDLElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDO1lBQ3BDLENBQUM7OztXQVRBO1FBa0JELHNCQUFJLDhCQUFJO1lBUFI7Ozs7OztlQU1HO2lCQUNIO2dCQUNJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDNUIsQ0FBQzs7O1dBQUE7UUFTRCxzQkFBSSwrQkFBSztZQVBUOzs7Ozs7ZUFNRztpQkFDSDtnQkFDSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDO1lBQ3RDLENBQUM7OztXQUFBO1FBVUQsc0JBQUksaUNBQU87WUFQWDs7Ozs7O2VBTUc7aUJBQ0g7Z0JBQ0ksT0FBTyxNQUFNLENBQUM7WUFDbEIsQ0FBQzs7O1dBQUE7UUFFRDs7Ozs7O1dBTUc7UUFDSSx1Q0FBZ0IsR0FBdkI7WUFDSSxPQUFPLEVBQUUsQ0FBQztRQUNkLENBQUM7UUFTRCxzQkFBSSxxQ0FBVztZQVBmOzs7Ozs7ZUFNRztpQkFDSDtnQkFDSSxPQUFPLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxXQUFXLENBQUM7WUFDcEQsQ0FBQzs7O1dBQUE7UUFFRDs7Ozs7Ozs7V0FRRztRQUNJLG1DQUFZLEdBQW5CLFVBQW9CLFdBQTZCLEVBQUUsV0FBNkIsRUFBRSxLQUF1QixFQUFFLEtBQXVCO1FBQ2xJLENBQUM7UUFFRDs7OztXQUlHO1FBQ0ksa0NBQVcsR0FBbEI7WUFDSSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFBLFVBQVU7Z0JBQy9CLFVBQVUsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBQzFCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQVNELHNCQUFXLHdDQUFjO1lBUHpCOzs7Ozs7ZUFNRztpQkFDSDtnQkFDSSxJQUFJLGNBQWMsR0FBRyxFQUFFLENBQUM7Z0JBQ3hCLElBQUksVUFBVSxHQUFHLHFDQUFxQyxDQUFDO2dCQUV2RCw0QkFBNEI7Z0JBQzVCLElBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLEVBQUM7b0JBQ3hCLFVBQVUsSUFBSSxpQ0FBaUMsQ0FBQztpQkFDbkQ7Z0JBQ0QsY0FBYyxJQUFJLGNBQWMsR0FBRyxVQUFVLEdBQUcsVUFBVSxDQUFDO2dCQUUzRCxrQ0FBa0M7Z0JBQ2xDLGNBQWMsSUFBSSw2SEFBNkgsQ0FBQztnQkFDaEosY0FBYyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ3hDLGNBQWMsSUFBSSxRQUFRLENBQUM7Z0JBRTNCLE9BQU8sY0FBYyxDQUFDO1lBQzFCLENBQUM7OztXQUFBO1FBRU0sa0NBQVcsR0FBbEI7WUFDSSxJQUFJLFFBQVEsR0FBRyxJQUFJLG1CQUFRLENBQUMsY0FBYyxDQUFDLENBQUM7WUFFNUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyx1QkFBVSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3JELFFBQVEsQ0FBQyxRQUFRLENBQUMsdUJBQVUsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzVELFFBQVEsQ0FBQyxRQUFRLENBQUMsdUJBQVUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUMsQ0FBQztZQUN6RSxPQUFPLFFBQVEsQ0FBQztRQUNwQixDQUFDO1FBR0Q7Ozs7OztXQU1HO1FBQ0ssOENBQXVCLEdBQS9CO1lBQ0ksSUFBSSxvQkFBb0IsR0FBRyxLQUFLLEVBQXdCLENBQUM7WUFDekQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBQSxVQUFVO2dCQUMvQixJQUFJLElBQUksR0FBRyxJQUFJLDJDQUFvQixDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUN2RSxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxDQUFDLENBQUE7WUFDRixPQUFPLG9CQUFvQixDQUFDO1FBQ2hDLENBQUM7UUFFTCxtQkFBQztJQUFELENBQUMsQUE5S0QsSUE4S0M7SUE5S1ksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDdXJzb3JEaXNwbGF5SW5mb0NsYXNzIH0gZnJvbSBcIi4vZHluYW1pY0N1cnNvclNpZ25hbFRlbXBsYXRlXCI7XHJcbmltcG9ydCB7IEN1cnNvclNpZ25hbERlc2NyaXB0b3IgfSBmcm9tIFwiLi9jdXJzb3JTaWduYWxEZXNjcmlwdG9yXCI7XHJcbmltcG9ydCB7IEN1cnNvckluZm8gfSBmcm9tIFwiLi9jdXJzb3JJbmZvXCI7XHJcbmltcG9ydCB7IEJhc2VTZXJpZXMgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9iYXNlU2VyaWVzXCI7XHJcbmltcG9ydCB7IElQb2ludCB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY29tbW9uL2ludGVyZmFjZXMvcG9pbnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ3Vyc29ySW5mb1Zpc2liaWxpdHkgfSBmcm9tIFwiLi9jdXJzb3JJbmZvVmlzaWJpbGl0eVwiO1xyXG5pbXBvcnQgeyBTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vcGVyc2lzdGVuY2Uvc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgSVNldHRpbmdzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9pbnRlcmZhY2VzL3NldHRpbmdzSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNldHRpbmdJZHMgfSBmcm9tIFwiLi9zZXR0aW5nSWRzXCI7XHJcblxyXG4vKipcclxuICogaW1wbGVtZW50cyB0aGUgYmFzZSBjbGFzcyBmb3IgdGhlIHZhcmlvdXMgdHlwZXMgb2YgY3Vyc29yIHNpZ25hbHMgXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIEN1cnNvclNpZ25hbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEN1cnNvclNpZ25hbCB7XHJcblxyXG4gICAgLy8gaG9sZHMgYW4gb2JqZWN0IHdpdGggaW5mb3JtYXRpb25zIGRlc2NyaWJpbmcgdGhlIGN1cnNvciBzaWduYWxcclxuICAgIHByb3RlY3RlZCBfY3Vyc29yU2lnbmFsRGVzY3JpcHRvcjogQ3Vyc29yU2lnbmFsRGVzY3JpcHRvciA9IG5ldyBDdXJzb3JTaWduYWxEZXNjcmlwdG9yKHVuZGVmaW5lZCk7XHJcbiAgICAvLyBob2xkcyB0aGUgc2VyaWVzIGF0dGFjaGVkIHRvIHRoZSBjdXJzb3Igc2lnbmFsXHJcbiAgICBwcm90ZWN0ZWQgX3NlcmllOiBCYXNlU2VyaWVzO1xyXG4gICAgXHJcbiAgICBwcm90ZWN0ZWQgX2V4cGFuZFN0YXRlOiBib29sZWFuOyAgXHJcblxyXG4gICAgY29uc3RydWN0b3Ioc2VyaWU6IEJhc2VTZXJpZXMsIGV4cGFuZFN0YXRlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fc2VyaWUgPSBzZXJpZTtcclxuICAgICAgICB0aGlzLl9leHBhbmRTdGF0ZSA9IGV4cGFuZFN0YXRlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcHJvdmlkZXMgdGhlIHNlcmllXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7QmFzZVNlcmllc31cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTaWduYWxcclxuICAgICAqL1xyXG4gICAgZ2V0IHNlcmllKCk6IEJhc2VTZXJpZXMge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZXJpZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHByb3ZpZGVzIGV4cGFuZFN0YXRlIG9mIHNpZ25hbCBpbiB0cmVlR3JpZFxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclNpZ25hbFxyXG4gICAgICovXHJcbiAgICBnZXQgZXhwYW5kU3RhdGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V4cGFuZFN0YXRlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogc2V0cyBleHBhbmRTdGF0ZSBvZiBzaWduYWwgaW4gdHJlZUdyaWRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU2lnbmFsXHJcbiAgICAgKi9cclxuICAgIHNldCBleHBhbmRTdGF0ZShleHBhbmRTdGF0ZTogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuX2V4cGFuZFN0YXRlID0gZXhwYW5kU3RhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBwcm92aWRlcyB0aGUgc2VyaWUgbmFtZVxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTaWduYWxcclxuICAgICAqL1xyXG4gICAgZ2V0IG5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VyaWUubmFtZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHByb3ZpZGVzIGFkZGl0aW9uYWwgZGVzY3JpcHRpdmUgaW5mb1xyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTaWduYWxcclxuICAgICAqL1xyXG4gICAgZ2V0IHZhbHVlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlcmllLmFkZGl0aW9uYWxJbmZvO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBjdXJzb3Igc2lnbmFscyBhcmUgdmlzaWJsZSBieSBkZWZhdWx0XHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclNpZ25hbFxyXG4gICAgICovXHJcbiAgICBnZXQgdmlzaWJsZSgpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIFwidHJ1ZVwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBtZXRob2QgaXMgdXNlZCBieSB0aGUgRHluYW1pY0N1cnNvclNpZ25hbFRlbXBsYXRlIHRvIGdldCBob2xkXHJcbiAgICAgKiBvZiBhbGwgYXZhaWxhYmxlIGN1cnNvciBpbmZvcm1hdGlvbiBhdmFpbGFibGUgdG8gdGhlIFlUQ2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8Q3Vyc29yRGlzcGxheUluZm9DbGFzcz59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ3Vyc29yU2lnbmFsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRBbGxDdXJzb3JJbmZvKCk6IEFycmF5PEN1cnNvckRpc3BsYXlJbmZvQ2xhc3M+IHtcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBwcm92aWRlcyB0aGUgY3VycmVudCBjdXJzb3IgaW5mb3NcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtBcnJheTxDdXJzb3JJbmZvPn1cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTaWduYWxcclxuICAgICAqL1xyXG4gICAgZ2V0IGN1cnNvckluZm9zKCk6IEFycmF5PEN1cnNvckluZm8+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY3Vyc29yU2lnbmFsRGVzY3JpcHRvci5jdXJzb3JJbmZvcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGR1bW15IG1ldGhvZCBmb3IgdXBkYXRpbmcgY3Vyc29yIHZhbHVlc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SVBvaW50fSBjdXJzb3JEYXRhMVxyXG4gICAgICogQHBhcmFtIHtJUG9pbnR9IGN1cnNvckRhdGEyXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdGltZTFcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lMlxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclNpZ25hbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXBkYXRlVmFsdWVzKGN1cnNvckRhdGExOiBJUG9pbnR8dW5kZWZpbmVkLCBjdXJzb3JEYXRhMjogSVBvaW50fHVuZGVmaW5lZCwgdGltZTE6IG51bWJlcnx1bmRlZmluZWQsIHRpbWUyOiBudW1iZXJ8dW5kZWZpbmVkKSB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDbGVhcnMgYWxsIHRoZSBjdXJzb3IgdmFsdWUgaW5mb3JtYXRpb25zXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEN1cnNvclNpZ25hbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2xlYXJWYWx1ZXMoKSB7XHJcbiAgICAgICAgdGhpcy5jdXJzb3JJbmZvcy5mb3JFYWNoKGN1cnNvckluZm8gPT4ge1xyXG4gICAgICAgICAgICBjdXJzb3JJbmZvLnZhbHVlID0gXCJcIjtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGljb24gcmVwcmVzZW50YXRpb24gZm9yIHRoaXMgbm9kZSBmb3IgdGhlIHRyZWUgZ3JpZFxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTaWduYWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBpY29uRGVmaW5pdGlvbigpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBpY29uRGVmaW5pdGlvbiA9IFwiXCI7XHJcbiAgICAgICAgbGV0IGNsYXNzTmFtZXMgPSBcImUtdHJlZWdyaWRjb2xsYXBzZSB0cmVlZ3JpZGNvbGxhcHNlXCI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gQWRkIGNvbGxhcHNlL2V4cGFuZCBpY29uIFxyXG4gICAgICAgIGlmKHRoaXMuZXhwYW5kU3RhdGUgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZXMgKz0gXCJlLXRyZWVncmlkZXhwYW5kIHRyZWVncmlkZXhwYW5kXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGljb25EZWZpbml0aW9uICs9IGA8ZGl2IGNsYXNzPSdgICsgY2xhc3NOYW1lcyArIGAnPjwvZGl2PmA7XHJcblxyXG4gICAgICAgIC8vIGFkZCBzZXJpZXMgaWNvbiAod2l0aCBvdmVybGF5cylcclxuICAgICAgICBpY29uRGVmaW5pdGlvbiArPSBgPGRpdiBjbGFzcz0nZS1kb2MnIHN0eWxlPSdwb3NpdGlvbjogcmVsYXRpdmU7aGVpZ2h0OjE2cHg7d2lkdGg6MzBweDttYXJnaW46YXV0bztmbG9hdDpsZWZ0O21hcmdpbi1sZWZ0OjBweDttYXJnaW4tdG9wOjJweCc+YDtcclxuICAgICAgICBpY29uRGVmaW5pdGlvbiArPSB0aGlzLl9zZXJpZS5nZXRJY29uKCk7XHJcbiAgICAgICAgaWNvbkRlZmluaXRpb24gKz0gYDwvZGl2PmA7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGljb25EZWZpbml0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRTZXR0aW5ncygpOiBJU2V0dGluZ3Mge1xyXG4gICAgICAgIGxldCBzZXR0aW5ncyA9IG5ldyBTZXR0aW5ncyhcIkN1cnNvclNpZ25hbFwiKTtcclxuXHJcbiAgICAgICAgc2V0dGluZ3Muc2V0VmFsdWUoU2V0dGluZ0lkcy5TZXJpZUlkLCB0aGlzLnNlcmllLmlkKTtcclxuICAgICAgICBzZXR0aW5ncy5zZXRWYWx1ZShTZXR0aW5nSWRzLkV4cGFuZFN0YXRlLCB0aGlzLmV4cGFuZFN0YXRlKTtcclxuICAgICAgICBzZXR0aW5ncy5zZXRWYWx1ZShTZXR0aW5nSWRzLkN1cnNvckluZm8sIHRoaXMuZ2V0Q3Vyc29ySW5mb1Zpc2liaWxpdHkoKSk7XHJcbiAgICAgICAgcmV0dXJuIHNldHRpbmdzO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgaWQgYW5kIHZpc2liaWxpdHkgb2YgY3Vyc29yIGluZm9cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBDdXJzb3JTaWduYWxcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRDdXJzb3JJbmZvVmlzaWJpbGl0eSgpOiBDdXJzb3JJbmZvVmlzaWJpbGl0eVtdIHtcclxuICAgICAgICBsZXQgY3Vyc29ySW5mb1Zpc2liaWxpdHkgPSBBcnJheTxDdXJzb3JJbmZvVmlzaWJpbGl0eT4oKTtcclxuICAgICAgICB0aGlzLmN1cnNvckluZm9zLmZvckVhY2goY3Vyc29ySW5mbyA9PiB7XHJcbiAgICAgICAgICAgIGxldCBpbmZvID0gbmV3IEN1cnNvckluZm9WaXNpYmlsaXR5KGN1cnNvckluZm8uaWQsIGN1cnNvckluZm8udmlzaWJsZSk7XHJcbiAgICAgICAgICAgIGN1cnNvckluZm9WaXNpYmlsaXR5LnB1c2goaW5mbyk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gY3Vyc29ySW5mb1Zpc2liaWxpdHk7XHJcbiAgICB9XHJcblxyXG59Il19