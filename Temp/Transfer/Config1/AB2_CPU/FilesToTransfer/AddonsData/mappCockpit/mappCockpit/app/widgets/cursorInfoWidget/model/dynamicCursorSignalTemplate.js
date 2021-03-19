define(["require", "exports", "./cursorInfo"], function (require, exports, cursorInfo_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    cursorInfo_1.CursorDependency;
    var CursorDisplayInfoClass = /** @class */ (function () {
        function CursorDisplayInfoClass(id, displayName, description, cursorDependency) {
            this.id = '';
            this.displayName = '';
            this.description = '';
            this.id = id;
            this.displayName = displayName;
            this.description = description;
            this.cursorDependency = cursorDependency;
        }
        return CursorDisplayInfoClass;
    }());
    exports.CursorDisplayInfoClass = CursorDisplayInfoClass;
    var DynamicCursorSignalTemplate = /** @class */ (function () {
        /**
         * Creates an instance of DynamicCursorSignalTemplate
         * @memberof DynamicCursorSignalTemplate
         */
        function DynamicCursorSignalTemplate(cursorSignals) {
            this._visible = "true";
            this._cursorInfos = new Array();
            this.setCursorInfosByCursorSignals(cursorSignals);
        }
        Object.defineProperty(DynamicCursorSignalTemplate.prototype, "name", {
            get: function () {
                return "Cursor Informations";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DynamicCursorSignalTemplate.prototype, "cursorInfos", {
            get: function () {
                return this._cursorInfos;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DynamicCursorSignalTemplate.prototype, "value", {
            get: function () {
                return "";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DynamicCursorSignalTemplate.prototype, "visible", {
            get: function () {
                return this._visible;
            },
            set: function (visible) {
                this._visible = visible;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DynamicCursorSignalTemplate.prototype, "iconDefinition", {
            /**
             * Returns the icon representation for this node for the tree grid
             *
             * @readonly
             * @type {string}
             * @memberof DynamicCursorSignalTemplate
             */
            get: function () {
                return "<div class='e-doc' style='position: relative;height:16px;width:30px;margin:auto;float:left;margin-left:6px;margin-top:2px'/>";
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Retrieves a list of all available cursorSignal and sorts out which
         * cursorInformation is available in all cursorSignals and sets the
         * information in the CursorInformationWidget.
         *
         * @private
         * @memberof DynamicCursorSignalTemplate
         */
        DynamicCursorSignalTemplate.prototype.setCursorInfosByCursorSignals = function (cursorSignals) {
            var _this = this;
            var availableCursorInfo = new Map(), availableCursorInfoCounter = new Map();
            if (cursorSignals != undefined) {
                cursorSignals = this.reduceNumberOfAvailableSignalTypes(cursorSignals);
                cursorSignals.forEach(function (cursorSignal, index) {
                    var cursorInfos = cursorSignal.getAllCursorInfo();
                    //Iterate over all cursorInfos
                    _this.getAvailableCrossSignalCursorInfo(cursorInfos, availableCursorInfo, availableCursorInfoCounter);
                });
            }
            //Iterate over available cursorInfos' counters to find the ones
            //present in all available signals.
            for (var id in availableCursorInfoCounter) {
                if (availableCursorInfoCounter[id] === cursorSignals.length) {
                    this.addCursorInfo(id, availableCursorInfo[id].displayName, availableCursorInfo[id].description, availableCursorInfo[id].cursorDependency);
                }
            }
        };
        /**
         * This method will get the available cursorInfos across all different
         * types of signals and count the number of occurances for each type
         * and store these into the referenced Maps passed in the function.
         *
         * @private
         * @param {Array<CursorDisplayInfoClass>} cursorInfos
         * @param {(Map<string, CursorSignal>)} availableCursorInfo
         * @param {Map<string, number>} availableCursorInfoCounter
         * @memberof DynamicCursorSignalTemplate
         */
        DynamicCursorSignalTemplate.prototype.getAvailableCrossSignalCursorInfo = function (cursorInfos, availableCursorInfo, availableCursorInfoCounter) {
            cursorInfos.forEach(function (cursorInfo, index) {
                //If a cursorInfo already has been saved increase the counter
                if (availableCursorInfo.hasOwnProperty(cursorInfo.id)) {
                    availableCursorInfoCounter[cursorInfo.id]++;
                    // If the cursorInfo hasnt been stored before, store it 
                    // and set counter to 1
                }
                else {
                    availableCursorInfo[cursorInfo.id] = cursorInfo;
                    availableCursorInfoCounter[cursorInfo.id] = 1;
                }
            });
        };
        /**
         * This method will reduce the number of different available kinds of signals
         * in case we receive 100 YT signals we only want to iterate over these once
         * later and not 100 times.
         *
         * @private
         * @param {(Array<CursorSignal>)} cursorSignals
         * @returns {(Array<CursorSignal>)}
         * @memberof DynamicCursorSignalTemplate
         */
        DynamicCursorSignalTemplate.prototype.reduceNumberOfAvailableSignalTypes = function (cursorSignals) {
            var availableCursorSignal = new Map(), returnableCursorSignals = [];
            cursorSignals.forEach(function (cursorSignal, index) {
                if (!availableCursorSignal.has(cursorSignal.serie.type)) {
                    availableCursorSignal.set(cursorSignal.serie.type, cursorSignal);
                    returnableCursorSignals.push(cursorSignal);
                }
            });
            return returnableCursorSignals;
        };
        /**
         * Adds a new cursor info to the cursor info list with the default displayname and description if not given(undefined)
         *
         * @protected
         * @param {string} id
         * @param {string} displayName
         * @param {string} description
         * @param {CursorDependency} cursorDependency
         * @memberof DynamicCursorSignalTemplate
         */
        DynamicCursorSignalTemplate.prototype.addCursorInfo = function (id, displayName, description, cursorDependency) {
            var visible = 'true';
            this._cursorInfos.push(new cursorInfo_1.CursorInfo(id, displayName, description, this, visible, cursorDependency));
        };
        return DynamicCursorSignalTemplate;
    }());
    exports.DynamicCursorSignalTemplate = DynamicCursorSignalTemplate;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pY0N1cnNvclNpZ25hbFRlbXBsYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2N1cnNvckluZm9XaWRnZXQvbW9kZWwvZHluYW1pY0N1cnNvclNpZ25hbFRlbXBsYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUlBLDZCQUFnQixDQUFBO0lBRWhCO1FBTUksZ0NBQWEsRUFBVSxFQUFFLFdBQW1CLEVBQUUsV0FBbUIsRUFBRSxnQkFBa0M7WUFMNUYsT0FBRSxHQUFXLEVBQUUsQ0FBQztZQUNoQixnQkFBVyxHQUFXLEVBQUUsQ0FBQztZQUN6QixnQkFBVyxHQUFXLEVBQUUsQ0FBQztZQUk5QixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztZQUNiLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1lBQy9CLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1lBQy9CLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztRQUM3QyxDQUFDO1FBQ0wsNkJBQUM7SUFBRCxDQUFDLEFBWkQsSUFZQztJQVpZLHdEQUFzQjtJQWNuQztRQU1JOzs7V0FHRztRQUNILHFDQUFZLGFBQWtDO1lBUnBDLGFBQVEsR0FBVyxNQUFNLENBQUM7WUFFMUIsaUJBQVksR0FBc0IsSUFBSSxLQUFLLEVBQWMsQ0FBQztZQU9oRSxJQUFJLENBQUMsNkJBQTZCLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDdEQsQ0FBQztRQUVELHNCQUFJLDZDQUFJO2lCQUFSO2dCQUNJLE9BQU8scUJBQXFCLENBQUM7WUFDakMsQ0FBQzs7O1dBQUE7UUFFRCxzQkFBSSxvREFBVztpQkFBZjtnQkFDSSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDN0IsQ0FBQzs7O1dBQUE7UUFFRCxzQkFBSSw4Q0FBSztpQkFBVDtnQkFDSSxPQUFPLEVBQUUsQ0FBQztZQUNkLENBQUM7OztXQUFB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RztRQUNPLG1EQUFhLEdBQXZCLFVBQXdCLEVBQVUsRUFBRSxXQUFtQixFQUFFLFdBQW1CLEVBQUUsZ0JBQWtDO1lBQzVHLElBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQztZQUVyQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLHVCQUFVLENBQUMsRUFBRSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7UUFDMUcsQ0FBQztRQUNMLGtDQUFDO0lBQUQsQ0FBQyxBQWxKRCxJQWtKQztJQWxKWSxrRUFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDdXJzb3JJbmZvLCBDdXJzb3JEZXBlbmRlbmN5IH0gZnJvbSBcIi4vY3Vyc29ySW5mb1wiO1xyXG5pbXBvcnQgeyBDdXJzb3JTaWduYWwgfSBmcm9tIFwiLi9jdXJzb3JTaWduYWxcIjtcclxuaW1wb3J0IHsgU2VyaWVzVHlwZSB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL3Nlcmllc1R5cGVcIjtcclxuXHJcbkN1cnNvckRlcGVuZGVuY3lcclxuXHJcbmV4cG9ydCBjbGFzcyBDdXJzb3JEaXNwbGF5SW5mb0NsYXNzIHtcclxuICAgIHJlYWRvbmx5IGlkOiBzdHJpbmcgPSAnJzsgXHJcbiAgICByZWFkb25seSBkaXNwbGF5TmFtZTogc3RyaW5nID0gJyc7IFxyXG4gICAgcmVhZG9ubHkgZGVzY3JpcHRpb246IHN0cmluZyA9ICcnO1xyXG4gICAgcmVhZG9ubHkgY3Vyc29yRGVwZW5kZW5jeTogQ3Vyc29yRGVwZW5kZW5jeTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciAoaWQ6IHN0cmluZywgZGlzcGxheU5hbWU6IHN0cmluZywgZGVzY3JpcHRpb246IHN0cmluZywgY3Vyc29yRGVwZW5kZW5jeTogQ3Vyc29yRGVwZW5kZW5jeSkge1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgICAgICB0aGlzLmRpc3BsYXlOYW1lID0gZGlzcGxheU5hbWU7XHJcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xyXG4gICAgICAgIHRoaXMuY3Vyc29yRGVwZW5kZW5jeSA9IGN1cnNvckRlcGVuZGVuY3k7XHJcbiAgICB9XHJcbn0gXHJcblxyXG5leHBvcnQgY2xhc3MgRHluYW1pY0N1cnNvclNpZ25hbFRlbXBsYXRle1xyXG4gICAgXHJcbiAgICBwcm90ZWN0ZWQgX3Zpc2libGU6IHN0cmluZyA9IFwidHJ1ZVwiO1xyXG5cclxuICAgIHByb3RlY3RlZCBfY3Vyc29ySW5mb3M6IEFycmF5PEN1cnNvckluZm8+ID0gbmV3IEFycmF5PEN1cnNvckluZm8+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIER5bmFtaWNDdXJzb3JTaWduYWxUZW1wbGF0ZVxyXG4gICAgICogQG1lbWJlcm9mIER5bmFtaWNDdXJzb3JTaWduYWxUZW1wbGF0ZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihjdXJzb3JTaWduYWxzOiBBcnJheTxDdXJzb3JTaWduYWw+KXtcclxuICAgICAgICB0aGlzLnNldEN1cnNvckluZm9zQnlDdXJzb3JTaWduYWxzKGN1cnNvclNpZ25hbHMpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBuYW1lKCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gXCJDdXJzb3IgSW5mb3JtYXRpb25zXCI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBjdXJzb3JJbmZvcygpOiBBcnJheTxDdXJzb3JJbmZvPntcclxuICAgICAgICByZXR1cm4gdGhpcy5fY3Vyc29ySW5mb3M7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHZhbHVlKCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdmlzaWJsZSgpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Zpc2libGU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHZpc2libGUodmlzaWJsZTogc3RyaW5nKXtcclxuICAgICAgICB0aGlzLl92aXNpYmxlID0gdmlzaWJsZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGljb24gcmVwcmVzZW50YXRpb24gZm9yIHRoaXMgbm9kZSBmb3IgdGhlIHRyZWUgZ3JpZFxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBEeW5hbWljQ3Vyc29yU2lnbmFsVGVtcGxhdGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBpY29uRGVmaW5pdGlvbigpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBgPGRpdiBjbGFzcz0nZS1kb2MnIHN0eWxlPSdwb3NpdGlvbjogcmVsYXRpdmU7aGVpZ2h0OjE2cHg7d2lkdGg6MzBweDttYXJnaW46YXV0bztmbG9hdDpsZWZ0O21hcmdpbi1sZWZ0OjZweDttYXJnaW4tdG9wOjJweCcvPmA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRyaWV2ZXMgYSBsaXN0IG9mIGFsbCBhdmFpbGFibGUgY3Vyc29yU2lnbmFsIGFuZCBzb3J0cyBvdXQgd2hpY2hcclxuICAgICAqIGN1cnNvckluZm9ybWF0aW9uIGlzIGF2YWlsYWJsZSBpbiBhbGwgY3Vyc29yU2lnbmFscyBhbmQgc2V0cyB0aGVcclxuICAgICAqIGluZm9ybWF0aW9uIGluIHRoZSBDdXJzb3JJbmZvcm1hdGlvbldpZGdldC5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIER5bmFtaWNDdXJzb3JTaWduYWxUZW1wbGF0ZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgc2V0Q3Vyc29ySW5mb3NCeUN1cnNvclNpZ25hbHMoY3Vyc29yU2lnbmFsczogQXJyYXk8Q3Vyc29yU2lnbmFsPil7XHJcblxyXG4gICAgICAgIGxldCBhdmFpbGFibGVDdXJzb3JJbmZvOiBNYXA8c3RyaW5nLEN1cnNvclNpZ25hbD4gPSBuZXcgTWFwKCksIFxyXG4gICAgICAgICAgICBhdmFpbGFibGVDdXJzb3JJbmZvQ291bnRlcjogTWFwPHN0cmluZywgbnVtYmVyPiA9IG5ldyBNYXAoKTtcclxuXHJcbiAgICAgICAgaWYoY3Vyc29yU2lnbmFscyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBjdXJzb3JTaWduYWxzID0gdGhpcy5yZWR1Y2VOdW1iZXJPZkF2YWlsYWJsZVNpZ25hbFR5cGVzKGN1cnNvclNpZ25hbHMpO1xyXG5cclxuICAgICAgICAgICAgY3Vyc29yU2lnbmFscy5mb3JFYWNoKChjdXJzb3JTaWduYWwsIGluZGV4KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGN1cnNvckluZm9zID0gY3Vyc29yU2lnbmFsLmdldEFsbEN1cnNvckluZm8oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL0l0ZXJhdGUgb3ZlciBhbGwgY3Vyc29ySW5mb3NcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0QXZhaWxhYmxlQ3Jvc3NTaWduYWxDdXJzb3JJbmZvKGN1cnNvckluZm9zLCBhdmFpbGFibGVDdXJzb3JJbmZvLCBhdmFpbGFibGVDdXJzb3JJbmZvQ291bnRlcik7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vSXRlcmF0ZSBvdmVyIGF2YWlsYWJsZSBjdXJzb3JJbmZvcycgY291bnRlcnMgdG8gZmluZCB0aGUgb25lc1xyXG4gICAgICAgIC8vcHJlc2VudCBpbiBhbGwgYXZhaWxhYmxlIHNpZ25hbHMuXHJcbiAgICAgICAgZm9yIChsZXQgaWQgaW4gYXZhaWxhYmxlQ3Vyc29ySW5mb0NvdW50ZXIpIHtcclxuICAgICAgICAgICAgaWYgKGF2YWlsYWJsZUN1cnNvckluZm9Db3VudGVyW2lkXSA9PT0gY3Vyc29yU2lnbmFscy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkQ3Vyc29ySW5mbyhpZCwgYXZhaWxhYmxlQ3Vyc29ySW5mb1tpZF0uZGlzcGxheU5hbWUsIGF2YWlsYWJsZUN1cnNvckluZm9baWRdLmRlc2NyaXB0aW9uLCBhdmFpbGFibGVDdXJzb3JJbmZvW2lkXS5jdXJzb3JEZXBlbmRlbmN5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgbWV0aG9kIHdpbGwgZ2V0IHRoZSBhdmFpbGFibGUgY3Vyc29ySW5mb3MgYWNyb3NzIGFsbCBkaWZmZXJlbnRcclxuICAgICAqIHR5cGVzIG9mIHNpZ25hbHMgYW5kIGNvdW50IHRoZSBudW1iZXIgb2Ygb2NjdXJhbmNlcyBmb3IgZWFjaCB0eXBlXHJcbiAgICAgKiBhbmQgc3RvcmUgdGhlc2UgaW50byB0aGUgcmVmZXJlbmNlZCBNYXBzIHBhc3NlZCBpbiB0aGUgZnVuY3Rpb24uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8Q3Vyc29yRGlzcGxheUluZm9DbGFzcz59IGN1cnNvckluZm9zXHJcbiAgICAgKiBAcGFyYW0geyhNYXA8c3RyaW5nLCBDdXJzb3JTaWduYWw+KX0gYXZhaWxhYmxlQ3Vyc29ySW5mb1xyXG4gICAgICogQHBhcmFtIHtNYXA8c3RyaW5nLCBudW1iZXI+fSBhdmFpbGFibGVDdXJzb3JJbmZvQ291bnRlclxyXG4gICAgICogQG1lbWJlcm9mIER5bmFtaWNDdXJzb3JTaWduYWxUZW1wbGF0ZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldEF2YWlsYWJsZUNyb3NzU2lnbmFsQ3Vyc29ySW5mbyAoY3Vyc29ySW5mb3M6IEFycmF5PEN1cnNvckRpc3BsYXlJbmZvQ2xhc3M+LCBhdmFpbGFibGVDdXJzb3JJbmZvOiBNYXA8c3RyaW5nLEN1cnNvclNpZ25hbD4sIGF2YWlsYWJsZUN1cnNvckluZm9Db3VudGVyOiBNYXA8c3RyaW5nLCBudW1iZXI+KSB7XHJcbiAgICAgICAgY3Vyc29ySW5mb3MuZm9yRWFjaCgoY3Vyc29ySW5mbywgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgLy9JZiBhIGN1cnNvckluZm8gYWxyZWFkeSBoYXMgYmVlbiBzYXZlZCBpbmNyZWFzZSB0aGUgY291bnRlclxyXG4gICAgICAgICAgICBpZiAoYXZhaWxhYmxlQ3Vyc29ySW5mby5oYXNPd25Qcm9wZXJ0eShjdXJzb3JJbmZvLmlkKSkge1xyXG4gICAgICAgICAgICAgICAgYXZhaWxhYmxlQ3Vyc29ySW5mb0NvdW50ZXJbY3Vyc29ySW5mby5pZF0rKztcclxuXHJcbiAgICAgICAgICAgIC8vIElmIHRoZSBjdXJzb3JJbmZvIGhhc250IGJlZW4gc3RvcmVkIGJlZm9yZSwgc3RvcmUgaXQgXHJcbiAgICAgICAgICAgIC8vIGFuZCBzZXQgY291bnRlciB0byAxXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhdmFpbGFibGVDdXJzb3JJbmZvW2N1cnNvckluZm8uaWRdID0gY3Vyc29ySW5mbztcclxuICAgICAgICAgICAgICAgIGF2YWlsYWJsZUN1cnNvckluZm9Db3VudGVyW2N1cnNvckluZm8uaWRdID0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBtZXRob2Qgd2lsbCByZWR1Y2UgdGhlIG51bWJlciBvZiBkaWZmZXJlbnQgYXZhaWxhYmxlIGtpbmRzIG9mIHNpZ25hbHNcclxuICAgICAqIGluIGNhc2Ugd2UgcmVjZWl2ZSAxMDAgWVQgc2lnbmFscyB3ZSBvbmx5IHdhbnQgdG8gaXRlcmF0ZSBvdmVyIHRoZXNlIG9uY2VcclxuICAgICAqIGxhdGVyIGFuZCBub3QgMTAwIHRpbWVzLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyhBcnJheTxDdXJzb3JTaWduYWw+KX0gY3Vyc29yU2lnbmFsc1xyXG4gICAgICogQHJldHVybnMgeyhBcnJheTxDdXJzb3JTaWduYWw+KX1cclxuICAgICAqIEBtZW1iZXJvZiBEeW5hbWljQ3Vyc29yU2lnbmFsVGVtcGxhdGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWR1Y2VOdW1iZXJPZkF2YWlsYWJsZVNpZ25hbFR5cGVzIChjdXJzb3JTaWduYWxzOiBBcnJheTxDdXJzb3JTaWduYWw+KTogQXJyYXk8Q3Vyc29yU2lnbmFsPiB7XHJcblxyXG4gICAgICAgIGxldCBhdmFpbGFibGVDdXJzb3JTaWduYWw6IE1hcDxTZXJpZXNUeXBlLCBDdXJzb3JTaWduYWw+ID0gbmV3IE1hcCgpLFxyXG4gICAgICAgICAgICByZXR1cm5hYmxlQ3Vyc29yU2lnbmFsczogQXJyYXk8Q3Vyc29yU2lnbmFsPiA9IFtdO1xyXG5cclxuICAgICAgICBjdXJzb3JTaWduYWxzLmZvckVhY2goKGN1cnNvclNpZ25hbDogQ3Vyc29yU2lnbmFsLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWF2YWlsYWJsZUN1cnNvclNpZ25hbC5oYXMoY3Vyc29yU2lnbmFsLnNlcmllLnR5cGUpKSB7XHJcbiAgICAgICAgICAgICAgICBhdmFpbGFibGVDdXJzb3JTaWduYWwuc2V0KGN1cnNvclNpZ25hbC5zZXJpZS50eXBlLCBjdXJzb3JTaWduYWwpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuYWJsZUN1cnNvclNpZ25hbHMucHVzaChjdXJzb3JTaWduYWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiByZXR1cm5hYmxlQ3Vyc29yU2lnbmFscztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBuZXcgY3Vyc29yIGluZm8gdG8gdGhlIGN1cnNvciBpbmZvIGxpc3Qgd2l0aCB0aGUgZGVmYXVsdCBkaXNwbGF5bmFtZSBhbmQgZGVzY3JpcHRpb24gaWYgbm90IGdpdmVuKHVuZGVmaW5lZClcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkaXNwbGF5TmFtZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRlc2NyaXB0aW9uXHJcbiAgICAgKiBAcGFyYW0ge0N1cnNvckRlcGVuZGVuY3l9IGN1cnNvckRlcGVuZGVuY3lcclxuICAgICAqIEBtZW1iZXJvZiBEeW5hbWljQ3Vyc29yU2lnbmFsVGVtcGxhdGVcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGFkZEN1cnNvckluZm8oaWQ6IHN0cmluZywgZGlzcGxheU5hbWU6IHN0cmluZywgZGVzY3JpcHRpb246IHN0cmluZywgY3Vyc29yRGVwZW5kZW5jeTogQ3Vyc29yRGVwZW5kZW5jeSl7XHJcbiAgICAgICAgbGV0IHZpc2libGUgPSAndHJ1ZSc7XHJcblxyXG4gICAgICAgIHRoaXMuX2N1cnNvckluZm9zLnB1c2gobmV3IEN1cnNvckluZm8oaWQsIGRpc3BsYXlOYW1lLCBkZXNjcmlwdGlvbiwgdGhpcywgdmlzaWJsZSwgY3Vyc29yRGVwZW5kZW5jeSkpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==