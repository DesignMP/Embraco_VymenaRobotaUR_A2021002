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
define(["require", "exports", "./interfaces/indexeddbCommandInterface", "../utilities/versionNumberProvider"], function (require, exports, indexeddbCommandInterface_1, versionNumberProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Indexeddb = /** @class */ (function () {
        function Indexeddb() {
            this._location = 'mappCockpit';
            this._databaseWorker = new Worker("./common/persistence/indexdDBWorker.js");
        }
        Indexeddb.prototype.connectStorage = function (location) {
            return __awaiter(this, void 0, void 0, function () {
                var dbpromise;
                var _this = this;
                return __generator(this, function (_a) {
                    this._location = location;
                    dbpromise = new Promise(function (resolve, reject) {
                        _this._databaseWorker.onmessage = function (event) { return _this.onMessageFromWorker(event.data, resolve, reject); };
                        var command = new indexeddbCommandInterface_1.IndexedDBCommand(indexeddbCommandInterface_1.IndexedDBCommandMessage.init, { location: _this._location, version: versionNumberProvider_1.VersionNumberProvider.getVersionNumberFromSVG() });
                        _this._databaseWorker.postMessage(command);
                    });
                    return [2 /*return*/, dbpromise];
                });
            });
        };
        Indexeddb.prototype.loadData = function () {
            return __awaiter(this, void 0, void 0, function () {
                var dbpromise;
                var _this = this;
                return __generator(this, function (_a) {
                    dbpromise = new Promise(function (resolve, reject) {
                        _this._databaseWorker.onmessage = function (event) { return _this.onMessageFromWorker(event.data, resolve, reject); };
                        var command = new indexeddbCommandInterface_1.IndexedDBCommand(indexeddbCommandInterface_1.IndexedDBCommandMessage.load, {});
                        _this._databaseWorker.postMessage(command);
                    });
                    return [2 /*return*/, dbpromise];
                });
            });
        };
        Indexeddb.prototype.retrieveData = function () {
            if (this._data != undefined) {
                return this._data;
            }
            else {
                console.log("data not defined");
            }
        };
        Indexeddb.prototype.saveData = function (key, data) {
            var transferables = this.getTransferablesFromData(data);
            var dbWorkerCommand = new indexeddbCommandInterface_1.IndexedDBCommand(indexeddbCommandInterface_1.IndexedDBCommandMessage.store, { data: data, key: key });
            this._databaseWorker.postMessage(dbWorkerCommand, transferables);
        };
        ;
        Indexeddb.prototype.clear = function () {
            var command = new indexeddbCommandInterface_1.IndexedDBCommand(indexeddbCommandInterface_1.IndexedDBCommandMessage.clear, { location: this._location, version: versionNumberProvider_1.VersionNumberProvider.getVersionNumberFromSVG() });
            this._databaseWorker.postMessage(command);
        };
        /**
         * called when the background worker finished a task,
         * used to resolve or reject the promise provided by the task caller after the task is finished
         *
         * @param {IndexedDBCommand} indexedDBCommand
         * @param {(value?: any) => void} resolve
         * @param {(reason?: any) => void} reject
         * @memberof Indexeddb
         */
        Indexeddb.prototype.onMessageFromWorker = function (indexedDBCommand, resolve, reject) {
            switch (indexedDBCommand.message) {
                case indexeddbCommandInterface_1.IndexedDBCommandMessage.success: {
                    resolve();
                    break;
                }
                case indexeddbCommandInterface_1.IndexedDBCommandMessage.error: {
                    console.log("idbworker error: " + indexedDBCommand.data.message);
                    reject();
                    break;
                }
                case indexeddbCommandInterface_1.IndexedDBCommandMessage.load: {
                    this._data = indexedDBCommand.data.data;
                    resolve(indexedDBCommand.data.data);
                    break;
                }
                case indexeddbCommandInterface_1.IndexedDBCommandMessage.store: {
                    break;
                }
            }
        };
        Indexeddb.prototype.getTransferablesFromData = function (data) {
            var transferables = [];
            if (data != undefined && data.data.transferables != undefined) {
                var transferables_1 = [];
                data.data.transferables.forEach(function (element) {
                    transferables_1.push(element);
                });
                data.data.transferables = {};
            }
            return transferables;
        };
        return Indexeddb;
    }());
    exports.Indexeddb = Indexeddb;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXhlZGRiLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vcGVyc2lzdGVuY2UvaW5kZXhlZGRiLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUlBO1FBQUE7WUFHWSxjQUFTLEdBQVUsYUFBYSxDQUFDO1lBRWpDLG9CQUFlLEdBQUcsSUFBSSxNQUFNLENBQUMsd0NBQXdDLENBQUMsQ0FBQztRQXFHbkYsQ0FBQztRQWxHUyxrQ0FBYyxHQUFwQixVQUFxQixRQUFnQjs7Ozs7b0JBQ2pDLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO29CQUVwQixTQUFTLEdBQUcsSUFBSSxPQUFPLENBQU0sVUFBQyxPQUFPLEVBQUUsTUFBTTt3QkFDL0MsS0FBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEdBQUcsVUFBQyxLQUFLLElBQUssT0FBQSxLQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLElBQXdCLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxFQUF6RSxDQUF5RSxDQUFDO3dCQUN0SCxJQUFJLE9BQU8sR0FBRyxJQUFJLDRDQUFnQixDQUFDLG1EQUF1QixDQUFDLElBQUksRUFBRSxFQUFDLFFBQVEsRUFBRyxLQUFJLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRyw2Q0FBcUIsQ0FBQyx1QkFBdUIsRUFBRSxFQUFDLENBQUMsQ0FBQzt3QkFDekosS0FBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQzlDLENBQUMsQ0FBQyxDQUFDO29CQUVILHNCQUFPLFNBQVMsRUFBQzs7O1NBQ3BCO1FBS0ssNEJBQVEsR0FBZDs7Ozs7b0JBQ1UsU0FBUyxHQUFHLElBQUksT0FBTyxDQUFNLFVBQUMsT0FBTyxFQUFFLE1BQU07d0JBQy9DLEtBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxHQUFHLFVBQUMsS0FBSyxJQUFLLE9BQUEsS0FBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxJQUF3QixFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsRUFBekUsQ0FBeUUsQ0FBQzt3QkFDdEgsSUFBSSxPQUFPLEdBQUcsSUFBSSw0Q0FBZ0IsQ0FBQyxtREFBdUIsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7d0JBQ3JFLEtBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUM5QyxDQUFDLENBQUMsQ0FBQztvQkFFSCxzQkFBTyxTQUFTLEVBQUM7OztTQUNwQjtRQUVELGdDQUFZLEdBQVo7WUFDSSxJQUFHLElBQUksQ0FBQyxLQUFLLElBQUksU0FBUyxFQUFDO2dCQUN2QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUE7YUFDcEI7aUJBQ0k7Z0JBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2FBQ25DO1FBQ0wsQ0FBQztRQUVELDRCQUFRLEdBQVIsVUFBUyxHQUFXLEVBQUUsSUFBVTtZQUM1QixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFeEQsSUFBSSxlQUFlLEdBQUcsSUFBSSw0Q0FBZ0IsQ0FBQyxtREFBdUIsQ0FBQyxLQUFLLEVBQUUsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUMsQ0FBQyxDQUFDO1lBQ2xHLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLGVBQWUsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUNyRSxDQUFDO1FBQUEsQ0FBQztRQUVGLHlCQUFLLEdBQUw7WUFDSSxJQUFJLE9BQU8sR0FBRyxJQUFJLDRDQUFnQixDQUFDLG1EQUF1QixDQUFDLEtBQUssRUFBRSxFQUFDLFFBQVEsRUFBRyxJQUFJLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRyw2Q0FBcUIsQ0FBQyx1QkFBdUIsRUFBRSxFQUFDLENBQUMsQ0FBQztZQUMxSixJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5QyxDQUFDO1FBR0Q7Ozs7Ozs7O1dBUUc7UUFDSCx1Q0FBbUIsR0FBbkIsVUFBb0IsZ0JBQW1DLEVBQUUsT0FBOEIsRUFBRSxNQUE4QjtZQUVuSCxRQUFRLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtnQkFDOUIsS0FBSyxtREFBdUIsQ0FBQyxPQUFRLENBQUMsQ0FBQztvQkFDbkMsT0FBTyxFQUFFLENBQUM7b0JBQ1YsTUFBTTtpQkFDVDtnQkFDRCxLQUFLLG1EQUF1QixDQUFDLEtBQU0sQ0FBQyxDQUFDO29CQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtvQkFDaEUsTUFBTSxFQUFFLENBQUM7b0JBQ1QsTUFBTTtpQkFDVDtnQkFFRCxLQUFLLG1EQUF1QixDQUFDLElBQUssQ0FBQyxDQUFDO29CQUNoQyxJQUFJLENBQUMsS0FBSyxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7b0JBQ3hDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3BDLE1BQU07aUJBQ1Q7Z0JBRUQsS0FBSyxtREFBdUIsQ0FBQyxLQUFNLENBQUMsQ0FBQztvQkFDakMsTUFBTTtpQkFDVDthQUVKO1FBQ0wsQ0FBQztRQUlPLDRDQUF3QixHQUFoQyxVQUFpQyxJQUFTO1lBQ3RDLElBQUksYUFBYSxHQUFVLEVBQUUsQ0FBQztZQUM5QixJQUFJLElBQUksSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksU0FBUyxFQUFFO2dCQUMzRCxJQUFJLGVBQWEsR0FBVSxFQUFFLENBQUM7Z0JBRTlCLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFBLE9BQU87b0JBQ25DLGVBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ2hDLENBQUMsQ0FBQyxDQUFDO2dCQUVILElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQzthQUNoQztZQUVELE9BQU8sYUFBYSxDQUFDO1FBQ3pCLENBQUM7UUFDTCxnQkFBQztJQUFELENBQUMsQUExR0QsSUEwR0M7SUExR1ksOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJU3RvcmFnZSB9IGZyb20gXCIuL2ludGVyZmFjZXMvc3RvcmFnZUludGVyZmFjZVwiO1xyXG5pbXBvcnQge0luZGV4ZWREQkNvbW1hbmQsIEluZGV4ZWREQkNvbW1hbmRNZXNzYWdlfSBmcm9tIFwiLi9pbnRlcmZhY2VzL2luZGV4ZWRkYkNvbW1hbmRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVmVyc2lvbk51bWJlclByb3ZpZGVyIH0gZnJvbSBcIi4uL3V0aWxpdGllcy92ZXJzaW9uTnVtYmVyUHJvdmlkZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBJbmRleGVkZGIgaW1wbGVtZW50cyBJU3RvcmFnZXtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfZGF0YTtcclxuICAgIHByaXZhdGUgX2xvY2F0aW9uOnN0cmluZyA9ICdtYXBwQ29ja3BpdCc7XHJcblxyXG4gICAgcHJpdmF0ZSBfZGF0YWJhc2VXb3JrZXIgPSBuZXcgV29ya2VyKFwiLi9jb21tb24vcGVyc2lzdGVuY2UvaW5kZXhkREJXb3JrZXIuanNcIik7XHJcblxyXG5cclxuICAgIGFzeW5jIGNvbm5lY3RTdG9yYWdlKGxvY2F0aW9uOiBzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMuX2xvY2F0aW9uID0gbG9jYXRpb247XHJcblxyXG4gICAgICAgIGNvbnN0IGRicHJvbWlzZSA9IG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9kYXRhYmFzZVdvcmtlci5vbm1lc3NhZ2UgPSAoZXZlbnQpID0+IHRoaXMub25NZXNzYWdlRnJvbVdvcmtlcihldmVudC5kYXRhIGFzIEluZGV4ZWREQkNvbW1hbmQsIHJlc29sdmUsIHJlamVjdCk7XHJcbiAgICAgICAgICAgIGxldCBjb21tYW5kID0gbmV3IEluZGV4ZWREQkNvbW1hbmQoSW5kZXhlZERCQ29tbWFuZE1lc3NhZ2UuaW5pdCwge2xvY2F0aW9uIDogdGhpcy5fbG9jYXRpb24sIHZlcnNpb24gOiBWZXJzaW9uTnVtYmVyUHJvdmlkZXIuZ2V0VmVyc2lvbk51bWJlckZyb21TVkcoKX0pO1xyXG4gICAgICAgICAgICB0aGlzLl9kYXRhYmFzZVdvcmtlci5wb3N0TWVzc2FnZShjb21tYW5kKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRicHJvbWlzZTtcclxuICAgIH0gICBcclxuXHJcbiAgXHJcblxyXG4gICAgXHJcbiAgICBhc3luYyBsb2FkRGF0YSgpe1xyXG4gICAgICAgIGNvbnN0IGRicHJvbWlzZSA9IG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9kYXRhYmFzZVdvcmtlci5vbm1lc3NhZ2UgPSAoZXZlbnQpID0+IHRoaXMub25NZXNzYWdlRnJvbVdvcmtlcihldmVudC5kYXRhIGFzIEluZGV4ZWREQkNvbW1hbmQsIHJlc29sdmUsIHJlamVjdCk7XHJcbiAgICAgICAgICAgIGxldCBjb21tYW5kID0gbmV3IEluZGV4ZWREQkNvbW1hbmQoSW5kZXhlZERCQ29tbWFuZE1lc3NhZ2UubG9hZCwge30pO1xyXG4gICAgICAgICAgICB0aGlzLl9kYXRhYmFzZVdvcmtlci5wb3N0TWVzc2FnZShjb21tYW5kKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRicHJvbWlzZTtcclxuICAgIH1cclxuXHJcbiAgICByZXRyaWV2ZURhdGEoKSA6IGFueXtcclxuICAgICAgICBpZih0aGlzLl9kYXRhICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRhXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImRhdGEgbm90IGRlZmluZWRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNhdmVEYXRhKGtleTogc3RyaW5nLCBkYXRhIDogYW55KXtcclxuICAgICAgICBsZXQgdHJhbnNmZXJhYmxlcyA9IHRoaXMuZ2V0VHJhbnNmZXJhYmxlc0Zyb21EYXRhKGRhdGEpO1xyXG5cclxuICAgICAgICBsZXQgZGJXb3JrZXJDb21tYW5kID0gbmV3IEluZGV4ZWREQkNvbW1hbmQoSW5kZXhlZERCQ29tbWFuZE1lc3NhZ2Uuc3RvcmUsIHtkYXRhOiBkYXRhLCBrZXk6IGtleX0pO1xyXG4gICAgICAgIHRoaXMuX2RhdGFiYXNlV29ya2VyLnBvc3RNZXNzYWdlKGRiV29ya2VyQ29tbWFuZCwgdHJhbnNmZXJhYmxlcyk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNsZWFyKCkge1xyXG4gICAgICAgIGxldCBjb21tYW5kID0gbmV3IEluZGV4ZWREQkNvbW1hbmQoSW5kZXhlZERCQ29tbWFuZE1lc3NhZ2UuY2xlYXIsIHtsb2NhdGlvbiA6IHRoaXMuX2xvY2F0aW9uLCB2ZXJzaW9uIDogVmVyc2lvbk51bWJlclByb3ZpZGVyLmdldFZlcnNpb25OdW1iZXJGcm9tU1ZHKCl9KTtcclxuICAgICAgICB0aGlzLl9kYXRhYmFzZVdvcmtlci5wb3N0TWVzc2FnZShjb21tYW5kKTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogY2FsbGVkIHdoZW4gdGhlIGJhY2tncm91bmQgd29ya2VyIGZpbmlzaGVkIGEgdGFzaywgXHJcbiAgICAgKiB1c2VkIHRvIHJlc29sdmUgb3IgcmVqZWN0IHRoZSBwcm9taXNlIHByb3ZpZGVkIGJ5IHRoZSB0YXNrIGNhbGxlciBhZnRlciB0aGUgdGFzayBpcyBmaW5pc2hlZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SW5kZXhlZERCQ29tbWFuZH0gaW5kZXhlZERCQ29tbWFuZFxyXG4gICAgICogQHBhcmFtIHsodmFsdWU/OiBhbnkpID0+IHZvaWR9IHJlc29sdmVcclxuICAgICAqIEBwYXJhbSB7KHJlYXNvbj86IGFueSkgPT4gdm9pZH0gcmVqZWN0XHJcbiAgICAgKiBAbWVtYmVyb2YgSW5kZXhlZGRiXHJcbiAgICAgKi9cclxuICAgIG9uTWVzc2FnZUZyb21Xb3JrZXIoaW5kZXhlZERCQ29tbWFuZCA6IEluZGV4ZWREQkNvbW1hbmQsIHJlc29sdmU6ICh2YWx1ZT86IGFueSkgPT4gdm9pZCwgcmVqZWN0OiAocmVhc29uPzogYW55KSA9PiB2b2lkKXtcclxuXHJcbiAgICAgICAgc3dpdGNoIChpbmRleGVkREJDb21tYW5kLm1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgY2FzZSBJbmRleGVkREJDb21tYW5kTWVzc2FnZS5zdWNjZXNzIDoge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBJbmRleGVkREJDb21tYW5kTWVzc2FnZS5lcnJvciA6IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaWRid29ya2VyIGVycm9yOiBcIiArIGluZGV4ZWREQkNvbW1hbmQuZGF0YS5tZXNzYWdlKVxyXG4gICAgICAgICAgICAgICAgcmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY2FzZSBJbmRleGVkREJDb21tYW5kTWVzc2FnZS5sb2FkIDoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGF0YSA9IGluZGV4ZWREQkNvbW1hbmQuZGF0YS5kYXRhO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShpbmRleGVkREJDb21tYW5kLmRhdGEuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY2FzZSBJbmRleGVkREJDb21tYW5kTWVzc2FnZS5zdG9yZSA6IHsgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgXHJcbiAgICBcclxuICAgIHByaXZhdGUgZ2V0VHJhbnNmZXJhYmxlc0Zyb21EYXRhKGRhdGE6IGFueSkge1xyXG4gICAgICAgIGxldCB0cmFuc2ZlcmFibGVzOiBhbnlbXSA9IFtdO1xyXG4gICAgICAgIGlmIChkYXRhICE9IHVuZGVmaW5lZCAmJiBkYXRhLmRhdGEudHJhbnNmZXJhYmxlcyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgbGV0IHRyYW5zZmVyYWJsZXM6IGFueVtdID0gW107XHJcblxyXG4gICAgICAgICAgICBkYXRhLmRhdGEudHJhbnNmZXJhYmxlcy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgdHJhbnNmZXJhYmxlcy5wdXNoKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGRhdGEuZGF0YS50cmFuc2ZlcmFibGVzID0ge307XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJhbnNmZXJhYmxlcztcclxuICAgIH1cclxufSJdfQ==