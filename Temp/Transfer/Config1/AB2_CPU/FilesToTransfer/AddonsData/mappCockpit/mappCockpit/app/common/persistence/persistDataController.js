var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "./indexeddb"], function (require, exports, indexeddb_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PersistDataController = /** @class */ (function () {
        /**
         * Creates an instance of PersistDataController
         * @param {(PersistDataProvider|undefined)} dataProvider
         * @memberof PersistDataController
         */
        function PersistDataController(dataProvider) {
            var _this = this;
            this._defaultStorage = new indexeddb_1.Indexeddb();
            this._dataProvider = dataProvider;
            if (this._dataProvider != undefined) {
                this._dataProvider.dataChanged.attach(function (sender, args) { return _this.dataProviderDataChanged(sender, args); });
            }
        }
        /**
         * Connect to the defaultStorage
         *
         * @memberof PersistDataController
         */
        PersistDataController.prototype.connect = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._defaultStorage.connectStorage('mappCockpit')];
                        case 1:
                            _a.sent();
                            console.log("connect in PersistDataController");
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Save data with the given key to the defaultStorage
         *
         * @param {*} key
         * @param {*} data
         * @memberof PersistDataController
         */
        PersistDataController.prototype.save = function (key, data) {
            if (this._dataProvider != undefined) {
                this._defaultStorage.saveData(key, data);
            }
        };
        /**
         * Load the whole data from the default storage
         *
         * @memberof PersistDataController
         */
        PersistDataController.prototype.load = function () {
            return __awaiter(this, void 0, void 0, function () {
                var dataFromStorage;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._defaultStorage.loadData()];
                        case 1:
                            dataFromStorage = _a.sent();
                            if (dataFromStorage != undefined) {
                                if (this._dataProvider != undefined) {
                                    this._dataProvider.setData(dataFromStorage);
                                }
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Removes all data from the default storage
         *
         * @memberof PersistDataController
         */
        PersistDataController.prototype.clearDefaultStorage = function () {
            this._defaultStorage.clear();
        };
        /**
         * Notification when data in the dataprovider has changed or added
         *
         * @param {PersistDataProvider} sender
         * @param {PersistDataChangedEventArgs} args
         * @memberof PersistDataController
         */
        PersistDataController.prototype.dataProviderDataChanged = function (sender, args) {
            // Save data on every change
            this.save(args.id, args.data);
        };
        return PersistDataController;
    }());
    exports.PersistDataController = PersistDataController;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyc2lzdERhdGFDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vcGVyc2lzdGVuY2UvcGVyc2lzdERhdGFDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUtBO1FBb0JJOzs7O1dBSUc7UUFDSCwrQkFBWSxZQUEyQztZQUF2RCxpQkFPQztZQU5HLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxxQkFBUyxFQUFFLENBQUM7WUFFdkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUM7WUFDbEMsSUFBRyxJQUFJLENBQUMsYUFBYSxJQUFJLFNBQVMsRUFBQztnQkFDL0IsSUFBSSxDQUFDLGFBQWMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFVBQUMsTUFBTSxFQUFDLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQTFDLENBQTBDLENBQUMsQ0FBQTthQUN0RztRQUNMLENBQUM7UUFFRDs7OztXQUlHO1FBQ0csdUNBQU8sR0FBYjs7OztnQ0FDSSxxQkFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsRUFBQTs7NEJBQXhELFNBQXdELENBQUM7NEJBQ3pELE9BQU8sQ0FBQyxHQUFHLENBQUMsa0NBQWtDLENBQUMsQ0FBQzs7Ozs7U0FDbkQ7UUFFRDs7Ozs7O1dBTUc7UUFDSCxvQ0FBSSxHQUFKLFVBQUssR0FBRyxFQUFFLElBQUk7WUFDVixJQUFHLElBQUksQ0FBQyxhQUFhLElBQUksU0FBUyxFQUFDO2dCQUMvQixJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUMsSUFBSSxDQUFDLENBQUM7YUFDM0M7UUFDTCxDQUFDO1FBRUQ7Ozs7V0FJRztRQUNHLG9DQUFJLEdBQVY7Ozs7O2dDQUMwQixxQkFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxFQUFBOzs0QkFBdkQsZUFBZSxHQUFHLFNBQXFDOzRCQUMzRCxJQUFHLGVBQWUsSUFBSSxTQUFTLEVBQUM7Z0NBQzVCLElBQUcsSUFBSSxDQUFDLGFBQWEsSUFBSSxTQUFTLEVBQUM7b0NBQy9CLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO2lDQUMvQzs2QkFDSjs7Ozs7U0FDSjtRQUVEOzs7O1dBSUc7UUFDSCxtREFBbUIsR0FBbkI7WUFDSSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2pDLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSCx1REFBdUIsR0FBdkIsVUFBd0IsTUFBMkIsRUFBRSxJQUFpQztZQUNsRiw0QkFBNEI7WUFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNqQyxDQUFDO1FBQ0osNEJBQUM7SUFBRCxDQUFDLEFBM0ZGLElBMkZFO0lBM0ZXLHNEQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBlcnNpc3REYXRhUHJvdmlkZXIgfSBmcm9tIFwiLi9wZXJzaXN0RGF0YVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IFBlcnNpc3REYXRhQ2hhbmdlZEV2ZW50QXJncyB9IGZyb20gXCIuL3BlcnNpc3REYXRhQ2hhbmdlZEV2ZW50QXJnc1wiO1xyXG5pbXBvcnQgeyBJU3RvcmFnZSB9IGZyb20gXCIuL2ludGVyZmFjZXMvc3RvcmFnZUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJbmRleGVkZGIgfSBmcm9tIFwiLi9pbmRleGVkZGJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBQZXJzaXN0RGF0YUNvbnRyb2xsZXJ7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogRGF0YVByb3ZpZGVyIHdoaWNoIHByb3ZpZGVzIHRoZSBwZXJzaXN0aW5nIGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUgeyhQZXJzaXN0RGF0YVByb3ZpZGVyfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgUGVyc2lzdERhdGFDb250cm9sbGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2RhdGFQcm92aWRlcjogUGVyc2lzdERhdGFQcm92aWRlcnx1bmRlZmluZWQ7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogRGVmYXVsdCBzdG9yYWdlIGZvciBwZXJzaXN0aW5nIGRhdGFcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUge0lTdG9yYWdlfVxyXG4gICAgICogQG1lbWJlcm9mIFBlcnNpc3REYXRhQ29udHJvbGxlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9kZWZhdWx0U3RvcmFnZTogSVN0b3JhZ2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFBlcnNpc3REYXRhQ29udHJvbGxlclxyXG4gICAgICogQHBhcmFtIHsoUGVyc2lzdERhdGFQcm92aWRlcnx1bmRlZmluZWQpfSBkYXRhUHJvdmlkZXJcclxuICAgICAqIEBtZW1iZXJvZiBQZXJzaXN0RGF0YUNvbnRyb2xsZXJcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoZGF0YVByb3ZpZGVyOiBQZXJzaXN0RGF0YVByb3ZpZGVyfHVuZGVmaW5lZCl7XHJcbiAgICAgICAgdGhpcy5fZGVmYXVsdFN0b3JhZ2UgPSBuZXcgSW5kZXhlZGRiKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2RhdGFQcm92aWRlciA9IGRhdGFQcm92aWRlcjtcclxuICAgICAgICBpZih0aGlzLl9kYXRhUHJvdmlkZXIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YVByb3ZpZGVyIS5kYXRhQ2hhbmdlZC5hdHRhY2goKHNlbmRlcixhcmdzKSA9PiB0aGlzLmRhdGFQcm92aWRlckRhdGFDaGFuZ2VkKHNlbmRlciwgYXJncykpXHJcbiAgICAgICAgfVxyXG4gICAgfSBcclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbm5lY3QgdG8gdGhlIGRlZmF1bHRTdG9yYWdlXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFBlcnNpc3REYXRhQ29udHJvbGxlclxyXG4gICAgICovXHJcbiAgICBhc3luYyBjb25uZWN0KCl7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5fZGVmYXVsdFN0b3JhZ2UuY29ubmVjdFN0b3JhZ2UoJ21hcHBDb2NrcGl0Jyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJjb25uZWN0IGluIFBlcnNpc3REYXRhQ29udHJvbGxlclwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNhdmUgZGF0YSB3aXRoIHRoZSBnaXZlbiBrZXkgdG8gdGhlIGRlZmF1bHRTdG9yYWdlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBrZXlcclxuICAgICAqIEBwYXJhbSB7Kn0gZGF0YVxyXG4gICAgICogQG1lbWJlcm9mIFBlcnNpc3REYXRhQ29udHJvbGxlclxyXG4gICAgICovXHJcbiAgICBzYXZlKGtleSwgZGF0YSkge1xyXG4gICAgICAgIGlmKHRoaXMuX2RhdGFQcm92aWRlciAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9kZWZhdWx0U3RvcmFnZS5zYXZlRGF0YShrZXksZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZCB0aGUgd2hvbGUgZGF0YSBmcm9tIHRoZSBkZWZhdWx0IHN0b3JhZ2VcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgUGVyc2lzdERhdGFDb250cm9sbGVyXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIGxvYWQoKSB7XHJcbiAgICAgICAgbGV0IGRhdGFGcm9tU3RvcmFnZSA9IGF3YWl0IHRoaXMuX2RlZmF1bHRTdG9yYWdlLmxvYWREYXRhKCk7XHJcbiAgICAgICAgaWYoZGF0YUZyb21TdG9yYWdlICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX2RhdGFQcm92aWRlciAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGF0YVByb3ZpZGVyLnNldERhdGEoZGF0YUZyb21TdG9yYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgYWxsIGRhdGEgZnJvbSB0aGUgZGVmYXVsdCBzdG9yYWdlXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFBlcnNpc3REYXRhQ29udHJvbGxlclxyXG4gICAgICovXHJcbiAgICBjbGVhckRlZmF1bHRTdG9yYWdlKCl7XHJcbiAgICAgICAgdGhpcy5fZGVmYXVsdFN0b3JhZ2UuY2xlYXIoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE5vdGlmaWNhdGlvbiB3aGVuIGRhdGEgaW4gdGhlIGRhdGFwcm92aWRlciBoYXMgY2hhbmdlZCBvciBhZGRlZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7UGVyc2lzdERhdGFQcm92aWRlcn0gc2VuZGVyXHJcbiAgICAgKiBAcGFyYW0ge1BlcnNpc3REYXRhQ2hhbmdlZEV2ZW50QXJnc30gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIFBlcnNpc3REYXRhQ29udHJvbGxlclxyXG4gICAgICovXHJcbiAgICBkYXRhUHJvdmlkZXJEYXRhQ2hhbmdlZChzZW5kZXI6IFBlcnNpc3REYXRhUHJvdmlkZXIsIGFyZ3M6IFBlcnNpc3REYXRhQ2hhbmdlZEV2ZW50QXJncyk6IHZvaWQge1xyXG4gICAgICAgIC8vIFNhdmUgZGF0YSBvbiBldmVyeSBjaGFuZ2VcclxuICAgICAgICB0aGlzLnNhdmUoYXJncy5pZCwgYXJncy5kYXRhKVxyXG4gICAgfVxyXG4gfSJdfQ==