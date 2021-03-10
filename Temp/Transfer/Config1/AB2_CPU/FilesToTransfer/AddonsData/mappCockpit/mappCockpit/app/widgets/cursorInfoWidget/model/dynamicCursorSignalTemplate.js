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
            cursorSignals = this.reduceNumberOfAvailableSignalTypes(cursorSignals);
            cursorSignals.forEach(function (cursorSignal, index) {
                var cursorInfos = cursorSignal.getAllCursorInfo();
                //Iterate over all cursorInfos
                _this.getAvailableCrossSignalCursorInfo(cursorInfos, availableCursorInfo, availableCursorInfoCounter);
            });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pY0N1cnNvclNpZ25hbFRlbXBsYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL2N1cnNvckluZm9XaWRnZXQvbW9kZWwvZHluYW1pY0N1cnNvclNpZ25hbFRlbXBsYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUlBLDZCQUFnQixDQUFBO0lBRWhCO1FBTUksZ0NBQWEsRUFBVSxFQUFFLFdBQW1CLEVBQUUsV0FBbUIsRUFBRSxnQkFBa0M7WUFMNUYsT0FBRSxHQUFXLEVBQUUsQ0FBQztZQUNoQixnQkFBVyxHQUFXLEVBQUUsQ0FBQztZQUN6QixnQkFBVyxHQUFXLEVBQUUsQ0FBQztZQUk5QixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztZQUNiLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1lBQy9CLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1lBQy9CLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztRQUM3QyxDQUFDO1FBQ0wsNkJBQUM7SUFBRCxDQUFDLEFBWkQsSUFZQztJQVpZLHdEQUFzQjtJQWNuQztRQU1JOzs7V0FHRztRQUNILHFDQUFZLGFBQWtDO1lBUnBDLGFBQVEsR0FBVyxNQUFNLENBQUM7WUFFMUIsaUJBQVksR0FBc0IsSUFBSSxLQUFLLEVBQWMsQ0FBQztZQU9oRSxJQUFJLENBQUMsNkJBQTZCLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDdEQsQ0FBQztRQUVELHNCQUFJLDZDQUFJO2lCQUFSO2dCQUNJLE9BQU8scUJBQXFCLENBQUM7WUFDakMsQ0FBQzs7O1dBQUE7UUFFRCxzQkFBSSxvREFBVztpQkFBZjtnQkFDSSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDN0IsQ0FBQzs7O1dBQUE7UUFFRCxzQkFBSSw4Q0FBSztpQkFBVDtnQkFDSSxPQUFPLEVBQUUsQ0FBQztZQUNkLENBQUM7OztXQUFB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QixFQUFFLFdBQW1CLEVBQUUsZ0JBQWtDO1lBQzVHLElBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQztZQUVyQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLHVCQUFVLENBQUMsRUFBRSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7UUFDMUcsQ0FBQztRQUNMLGtDQUFDO0lBQUQsQ0FBQyxBQWhKRCxJQWdKQztJQWhKWSxrRUFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDdXJzb3JJbmZvLCBDdXJzb3JEZXBlbmRlbmN5IH0gZnJvbSBcIi4vY3Vyc29ySW5mb1wiO1xyXG5pbXBvcnQgeyBDdXJzb3JTaWduYWwgfSBmcm9tIFwiLi9jdXJzb3JTaWduYWxcIjtcclxuaW1wb3J0IHsgU2VyaWVzVHlwZSB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL3Nlcmllc1R5cGVcIjtcclxuXHJcbkN1cnNvckRlcGVuZGVuY3lcclxuXHJcbmV4cG9ydCBjbGFzcyBDdXJzb3JEaXNwbGF5SW5mb0NsYXNzIHtcclxuICAgIHJlYWRvbmx5IGlkOiBzdHJpbmcgPSAnJzsgXHJcbiAgICByZWFkb25seSBkaXNwbGF5TmFtZTogc3RyaW5nID0gJyc7IFxyXG4gICAgcmVhZG9ubHkgZGVzY3JpcHRpb246IHN0cmluZyA9ICcnO1xyXG4gICAgcmVhZG9ubHkgY3Vyc29yRGVwZW5kZW5jeTogQ3Vyc29yRGVwZW5kZW5jeTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciAoaWQ6IHN0cmluZywgZGlzcGxheU5hbWU6IHN0cmluZywgZGVzY3JpcHRpb246IHN0cmluZywgY3Vyc29yRGVwZW5kZW5jeTogQ3Vyc29yRGVwZW5kZW5jeSkge1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgICAgICB0aGlzLmRpc3BsYXlOYW1lID0gZGlzcGxheU5hbWU7XHJcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xyXG4gICAgICAgIHRoaXMuY3Vyc29yRGVwZW5kZW5jeSA9IGN1cnNvckRlcGVuZGVuY3k7XHJcbiAgICB9XHJcbn0gXHJcblxyXG5leHBvcnQgY2xhc3MgRHluYW1pY0N1cnNvclNpZ25hbFRlbXBsYXRle1xyXG4gICAgXHJcbiAgICBwcm90ZWN0ZWQgX3Zpc2libGU6IHN0cmluZyA9IFwidHJ1ZVwiO1xyXG5cclxuICAgIHByb3RlY3RlZCBfY3Vyc29ySW5mb3M6IEFycmF5PEN1cnNvckluZm8+ID0gbmV3IEFycmF5PEN1cnNvckluZm8+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIER5bmFtaWNDdXJzb3JTaWduYWxUZW1wbGF0ZVxyXG4gICAgICogQG1lbWJlcm9mIER5bmFtaWNDdXJzb3JTaWduYWxUZW1wbGF0ZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihjdXJzb3JTaWduYWxzOiBBcnJheTxDdXJzb3JTaWduYWw+KXtcclxuICAgICAgICB0aGlzLnNldEN1cnNvckluZm9zQnlDdXJzb3JTaWduYWxzKGN1cnNvclNpZ25hbHMpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBuYW1lKCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gXCJDdXJzb3IgSW5mb3JtYXRpb25zXCI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBjdXJzb3JJbmZvcygpOiBBcnJheTxDdXJzb3JJbmZvPntcclxuICAgICAgICByZXR1cm4gdGhpcy5fY3Vyc29ySW5mb3M7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHZhbHVlKCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdmlzaWJsZSgpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Zpc2libGU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHZpc2libGUodmlzaWJsZTogc3RyaW5nKXtcclxuICAgICAgICB0aGlzLl92aXNpYmxlID0gdmlzaWJsZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGljb24gcmVwcmVzZW50YXRpb24gZm9yIHRoaXMgbm9kZSBmb3IgdGhlIHRyZWUgZ3JpZFxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBEeW5hbWljQ3Vyc29yU2lnbmFsVGVtcGxhdGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBpY29uRGVmaW5pdGlvbigpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBgPGRpdiBjbGFzcz0nZS1kb2MnIHN0eWxlPSdwb3NpdGlvbjogcmVsYXRpdmU7aGVpZ2h0OjE2cHg7d2lkdGg6MzBweDttYXJnaW46YXV0bztmbG9hdDpsZWZ0O21hcmdpbi1sZWZ0OjZweDttYXJnaW4tdG9wOjJweCcvPmA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRyaWV2ZXMgYSBsaXN0IG9mIGFsbCBhdmFpbGFibGUgY3Vyc29yU2lnbmFsIGFuZCBzb3J0cyBvdXQgd2hpY2hcclxuICAgICAqIGN1cnNvckluZm9ybWF0aW9uIGlzIGF2YWlsYWJsZSBpbiBhbGwgY3Vyc29yU2lnbmFscyBhbmQgc2V0cyB0aGVcclxuICAgICAqIGluZm9ybWF0aW9uIGluIHRoZSBDdXJzb3JJbmZvcm1hdGlvbldpZGdldC5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIER5bmFtaWNDdXJzb3JTaWduYWxUZW1wbGF0ZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgc2V0Q3Vyc29ySW5mb3NCeUN1cnNvclNpZ25hbHMoY3Vyc29yU2lnbmFsczogQXJyYXk8Q3Vyc29yU2lnbmFsPil7XHJcblxyXG4gICAgICAgIGxldCBhdmFpbGFibGVDdXJzb3JJbmZvOiBNYXA8c3RyaW5nLEN1cnNvclNpZ25hbD4gPSBuZXcgTWFwKCksIFxyXG4gICAgICAgICAgICBhdmFpbGFibGVDdXJzb3JJbmZvQ291bnRlcjogTWFwPHN0cmluZywgbnVtYmVyPiA9IG5ldyBNYXAoKTtcclxuXHJcbiAgICAgICAgY3Vyc29yU2lnbmFscyA9IHRoaXMucmVkdWNlTnVtYmVyT2ZBdmFpbGFibGVTaWduYWxUeXBlcyhjdXJzb3JTaWduYWxzKTtcclxuXHJcbiAgICAgICAgY3Vyc29yU2lnbmFscy5mb3JFYWNoKChjdXJzb3JTaWduYWwsIGluZGV4KSA9PiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgY3Vyc29ySW5mb3MgPSBjdXJzb3JTaWduYWwuZ2V0QWxsQ3Vyc29ySW5mbygpO1xyXG5cclxuICAgICAgICAgICAgLy9JdGVyYXRlIG92ZXIgYWxsIGN1cnNvckluZm9zXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0QXZhaWxhYmxlQ3Jvc3NTaWduYWxDdXJzb3JJbmZvKGN1cnNvckluZm9zLCBhdmFpbGFibGVDdXJzb3JJbmZvLCBhdmFpbGFibGVDdXJzb3JJbmZvQ291bnRlcik7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL0l0ZXJhdGUgb3ZlciBhdmFpbGFibGUgY3Vyc29ySW5mb3MnIGNvdW50ZXJzIHRvIGZpbmQgdGhlIG9uZXNcclxuICAgICAgICAvL3ByZXNlbnQgaW4gYWxsIGF2YWlsYWJsZSBzaWduYWxzLlxyXG4gICAgICAgIGZvciAobGV0IGlkIGluIGF2YWlsYWJsZUN1cnNvckluZm9Db3VudGVyKSB7XHJcbiAgICAgICAgICAgIGlmIChhdmFpbGFibGVDdXJzb3JJbmZvQ291bnRlcltpZF0gPT09IGN1cnNvclNpZ25hbHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEN1cnNvckluZm8oaWQsIGF2YWlsYWJsZUN1cnNvckluZm9baWRdLmRpc3BsYXlOYW1lLCBhdmFpbGFibGVDdXJzb3JJbmZvW2lkXS5kZXNjcmlwdGlvbiwgYXZhaWxhYmxlQ3Vyc29ySW5mb1tpZF0uY3Vyc29yRGVwZW5kZW5jeSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIG1ldGhvZCB3aWxsIGdldCB0aGUgYXZhaWxhYmxlIGN1cnNvckluZm9zIGFjcm9zcyBhbGwgZGlmZmVyZW50XHJcbiAgICAgKiB0eXBlcyBvZiBzaWduYWxzIGFuZCBjb3VudCB0aGUgbnVtYmVyIG9mIG9jY3VyYW5jZXMgZm9yIGVhY2ggdHlwZVxyXG4gICAgICogYW5kIHN0b3JlIHRoZXNlIGludG8gdGhlIHJlZmVyZW5jZWQgTWFwcyBwYXNzZWQgaW4gdGhlIGZ1bmN0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PEN1cnNvckRpc3BsYXlJbmZvQ2xhc3M+fSBjdXJzb3JJbmZvc1xyXG4gICAgICogQHBhcmFtIHsoTWFwPHN0cmluZywgQ3Vyc29yU2lnbmFsPil9IGF2YWlsYWJsZUN1cnNvckluZm9cclxuICAgICAqIEBwYXJhbSB7TWFwPHN0cmluZywgbnVtYmVyPn0gYXZhaWxhYmxlQ3Vyc29ySW5mb0NvdW50ZXJcclxuICAgICAqIEBtZW1iZXJvZiBEeW5hbWljQ3Vyc29yU2lnbmFsVGVtcGxhdGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRBdmFpbGFibGVDcm9zc1NpZ25hbEN1cnNvckluZm8gKGN1cnNvckluZm9zOiBBcnJheTxDdXJzb3JEaXNwbGF5SW5mb0NsYXNzPiwgYXZhaWxhYmxlQ3Vyc29ySW5mbzogTWFwPHN0cmluZyxDdXJzb3JTaWduYWw+LCBhdmFpbGFibGVDdXJzb3JJbmZvQ291bnRlcjogTWFwPHN0cmluZywgbnVtYmVyPikge1xyXG4gICAgICAgIGN1cnNvckluZm9zLmZvckVhY2goKGN1cnNvckluZm8sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIC8vSWYgYSBjdXJzb3JJbmZvIGFscmVhZHkgaGFzIGJlZW4gc2F2ZWQgaW5jcmVhc2UgdGhlIGNvdW50ZXJcclxuICAgICAgICAgICAgaWYgKGF2YWlsYWJsZUN1cnNvckluZm8uaGFzT3duUHJvcGVydHkoY3Vyc29ySW5mby5pZCkpIHtcclxuICAgICAgICAgICAgICAgIGF2YWlsYWJsZUN1cnNvckluZm9Db3VudGVyW2N1cnNvckluZm8uaWRdKys7XHJcblxyXG4gICAgICAgICAgICAvLyBJZiB0aGUgY3Vyc29ySW5mbyBoYXNudCBiZWVuIHN0b3JlZCBiZWZvcmUsIHN0b3JlIGl0IFxyXG4gICAgICAgICAgICAvLyBhbmQgc2V0IGNvdW50ZXIgdG8gMVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYXZhaWxhYmxlQ3Vyc29ySW5mb1tjdXJzb3JJbmZvLmlkXSA9IGN1cnNvckluZm87XHJcbiAgICAgICAgICAgICAgICBhdmFpbGFibGVDdXJzb3JJbmZvQ291bnRlcltjdXJzb3JJbmZvLmlkXSA9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgbWV0aG9kIHdpbGwgcmVkdWNlIHRoZSBudW1iZXIgb2YgZGlmZmVyZW50IGF2YWlsYWJsZSBraW5kcyBvZiBzaWduYWxzXHJcbiAgICAgKiBpbiBjYXNlIHdlIHJlY2VpdmUgMTAwIFlUIHNpZ25hbHMgd2Ugb25seSB3YW50IHRvIGl0ZXJhdGUgb3ZlciB0aGVzZSBvbmNlXHJcbiAgICAgKiBsYXRlciBhbmQgbm90IDEwMCB0aW1lcy5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsoQXJyYXk8Q3Vyc29yU2lnbmFsPil9IGN1cnNvclNpZ25hbHNcclxuICAgICAqIEByZXR1cm5zIHsoQXJyYXk8Q3Vyc29yU2lnbmFsPil9XHJcbiAgICAgKiBAbWVtYmVyb2YgRHluYW1pY0N1cnNvclNpZ25hbFRlbXBsYXRlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVkdWNlTnVtYmVyT2ZBdmFpbGFibGVTaWduYWxUeXBlcyAoY3Vyc29yU2lnbmFsczogQXJyYXk8Q3Vyc29yU2lnbmFsPik6IEFycmF5PEN1cnNvclNpZ25hbD4ge1xyXG5cclxuICAgICAgICBsZXQgYXZhaWxhYmxlQ3Vyc29yU2lnbmFsOiBNYXA8U2VyaWVzVHlwZSwgQ3Vyc29yU2lnbmFsPiA9IG5ldyBNYXAoKSxcclxuICAgICAgICAgICAgcmV0dXJuYWJsZUN1cnNvclNpZ25hbHM6IEFycmF5PEN1cnNvclNpZ25hbD4gPSBbXTtcclxuXHJcbiAgICAgICAgY3Vyc29yU2lnbmFscy5mb3JFYWNoKChjdXJzb3JTaWduYWw6IEN1cnNvclNpZ25hbCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFhdmFpbGFibGVDdXJzb3JTaWduYWwuaGFzKGN1cnNvclNpZ25hbC5zZXJpZS50eXBlKSkge1xyXG4gICAgICAgICAgICAgICAgYXZhaWxhYmxlQ3Vyc29yU2lnbmFsLnNldChjdXJzb3JTaWduYWwuc2VyaWUudHlwZSwgY3Vyc29yU2lnbmFsKTtcclxuICAgICAgICAgICAgICAgIHJldHVybmFibGVDdXJzb3JTaWduYWxzLnB1c2goY3Vyc29yU2lnbmFsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gcmV0dXJuYWJsZUN1cnNvclNpZ25hbHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgbmV3IGN1cnNvciBpbmZvIHRvIHRoZSBjdXJzb3IgaW5mbyBsaXN0IHdpdGggdGhlIGRlZmF1bHQgZGlzcGxheW5hbWUgYW5kIGRlc2NyaXB0aW9uIGlmIG5vdCBnaXZlbih1bmRlZmluZWQpXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGlzcGxheU5hbWVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkZXNjcmlwdGlvblxyXG4gICAgICogQHBhcmFtIHtDdXJzb3JEZXBlbmRlbmN5fSBjdXJzb3JEZXBlbmRlbmN5XHJcbiAgICAgKiBAbWVtYmVyb2YgRHluYW1pY0N1cnNvclNpZ25hbFRlbXBsYXRlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBhZGRDdXJzb3JJbmZvKGlkOiBzdHJpbmcsIGRpc3BsYXlOYW1lOiBzdHJpbmcsIGRlc2NyaXB0aW9uOiBzdHJpbmcsIGN1cnNvckRlcGVuZGVuY3k6IEN1cnNvckRlcGVuZGVuY3kpe1xyXG4gICAgICAgIGxldCB2aXNpYmxlID0gJ3RydWUnO1xyXG5cclxuICAgICAgICB0aGlzLl9jdXJzb3JJbmZvcy5wdXNoKG5ldyBDdXJzb3JJbmZvKGlkLCBkaXNwbGF5TmFtZSwgZGVzY3JpcHRpb24sIHRoaXMsIHZpc2libGUsIGN1cnNvckRlcGVuZGVuY3kpKTtcclxuICAgIH1cclxufVxyXG4iXX0=