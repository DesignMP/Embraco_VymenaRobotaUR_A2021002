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
define(["require", "exports", "../mappCockpitCommonInfoProvider", "./traceDataPointInfo", "../../../framework/property", "../../../framework/command", "./mappCockpitTraceComponent"], function (require, exports, mappCockpitCommonInfoProvider_1, traceDataPointInfo_1, property_1, command_1, mappCockpitTraceComponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Implements trace access services
     *
     * @class MappCockpitTraceProvider
     */
    var MappCockpitTraceProvider = /** @class */ (function () {
        /**
         * Creates an instance of MappCockpitTraceProvider.
         * @param {MappCockpitDiagnosticProvider} diagnosticProvider
         * @memberof MappCockpitTraceProvider
         */
        function MappCockpitTraceProvider(diagnosticProvider) {
            this._diagnosticProvider = diagnosticProvider;
            this._availableTraceDataPoints = property_1.Property.create([]);
            this.createCommands();
        }
        /**
         * Creates the exposed commands
         *
         * @private
         * @memberof MappCockpitTraceProvider
         */
        MappCockpitTraceProvider.prototype.createCommands = function () {
            this._commandReadAvailableTracePoints = command_1.Command.create(this, this.executeCommandReadAvailableTracePoints());
        };
        /**
         * Initializes and connects the trace provider
         *
         * @param {number} sessionId
         * @param {number} _namespaceIndex
         * @returns {*}
         * @memberof MappCockpitTraceProvider
         */
        MappCockpitTraceProvider.prototype.initialize = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = this;
                            return [4 /*yield*/, this.initializeTraceComponents()];
                        case 1:
                            _a._traceComponents = _b.sent();
                            return [4 /*yield*/, this.commandReadAvailableTracePoints.execute(null, function (availableTraceDataPoints) {
                                    _this._availableTraceDataPoints.value = availableTraceDataPoints;
                                    _this._traceComponents.forEach(function (traceComponent) {
                                        traceComponent.updateDataPointInformations(traceComponent.traceConfigurationData);
                                    });
                                })];
                        case 2:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        Object.defineProperty(MappCockpitTraceProvider.prototype, "commandReadAvailableTracePoints", {
            /**
             * Command for reading the currently available trace points.
             *
             * @readonly
             * @type {Command<any, TraceData>}
             * @memberof MappCockpitTraceProvider
             */
            get: function () {
                return this._commandReadAvailableTracePoints;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Implements the command for reading the available trace points
         *
         * @returns {*}
         * @memberof MappCockpitTraceProvider
         */
        MappCockpitTraceProvider.prototype.executeCommandReadAvailableTracePoints = function () {
            var _this = this;
            return function (commandArguments, commandResponse) {
                _this.readAllTraceDataPoints().then(function (traceDataPoints) {
                    commandResponse.executed(traceDataPoints);
                }).catch(function (error) {
                    commandResponse.rejected(error);
                });
            };
        };
        Object.defineProperty(MappCockpitTraceProvider.prototype, "traceComponents", {
            /**
             * Returns the trace components
             *
             * @readonly
             * @type {MappCockpitTraceComponent[]}
             * @memberof MappCockpitTraceProvider
             */
            get: function () {
                return this._traceComponents;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MappCockpitTraceProvider.prototype, "availableDataPoints", {
            /**
             * Gets the traceable data points
             *
             * @readonly
             * @type {Property<Array<TraceDataPoint>>}
             * @memberof MappCockpitTraceProvider
             */
            get: function () {
                return this._availableTraceDataPoints;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Initializes and connects the target trace components
         *
         * @private
         * @memberof MappCockpitTraceProvider
         */
        MappCockpitTraceProvider.prototype.initializeTraceComponents = function () {
            return __awaiter(this, void 0, void 0, function () {
                var components, traceComponents, i, traceComponent;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getTraceComponents()];
                        case 1:
                            components = _a.sent();
                            traceComponents = new Array();
                            for (i = 0; i < components.length; i++) {
                                traceComponent = new mappCockpitTraceComponent_1.MappCockpitTraceComponent(this._diagnosticProvider, components[i]);
                                traceComponent.availableTraceDataPoints = this._availableTraceDataPoints;
                                traceComponents.push(traceComponent);
                            }
                            ;
                            return [2 /*return*/, traceComponents];
                    }
                });
            });
        };
        /**
         * gets the trace components from all available components
         *
         * @private
         * @memberof MappCockpitTraceProvider
         */
        MappCockpitTraceProvider.prototype.getTraceComponents = function () {
            return __awaiter(this, void 0, void 0, function () {
                var traceComponents;
                return __generator(this, function (_a) {
                    traceComponents = this._diagnosticProvider.model.components.filter(function (component) { return component.browseName == "NewTraceConfig"; });
                    if (traceComponents.length == 1) {
                        // Set Displayname of trace component "NewTraceConfig" to "Trace"
                        traceComponents[0].displayName = "Trace";
                        return [2 /*return*/, traceComponents];
                    }
                    return [2 /*return*/, new Array()];
                });
            });
        };
        /**
         * Reads the available trace datapoints from all components.
         *
         * @private
         * @returns
         * @memberof MappCockpitTraceProvider
         */
        MappCockpitTraceProvider.prototype.readAllTraceDataPoints = function () {
            return __awaiter(this, void 0, void 0, function () {
                var allAvailableTraceDataPoints, traceableComponents;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            allAvailableTraceDataPoints = new Array();
                            return [4 /*yield*/, this.readTraceProviderComponents()];
                        case 1:
                            traceableComponents = _a.sent();
                            // collect the components data points into one flat array
                            traceableComponents.forEach(function (traceableComponentcomponent) {
                                var componetTracePoints = _this.readComponentTraceDataPoints(traceableComponentcomponent);
                                allAvailableTraceDataPoints = allAvailableTraceDataPoints.concat(componetTracePoints);
                            });
                            // update the available trace points link.
                            this._availableTraceDataPoints.value = allAvailableTraceDataPoints;
                            return [2 /*return*/, allAvailableTraceDataPoints];
                    }
                });
            });
        };
        /**
         * Collects components supporting traceability and exposing tracepoints
         *
         * @returns {Array<MappCockpitComponent>}
         * @memberof MappCockpitTraceProvider
         */
        MappCockpitTraceProvider.prototype.readTraceProviderComponents = function () {
            return __awaiter(this, void 0, void 0, function () {
                var traceComponents, allComponents, i, component;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            traceComponents = new Array();
                            return [4 /*yield*/, this._diagnosticProvider.componentProvider.browseComponents()];
                        case 1:
                            allComponents = _a.sent();
                            i = 0;
                            _a.label = 2;
                        case 2:
                            if (!(i < allComponents.length)) return [3 /*break*/, 5];
                            component = allComponents[i];
                            return [4 /*yield*/, mappCockpitCommonInfoProvider_1.MappCockpitCommonInfoProvider.getInstance().readComponentMetaInfo(component)];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            i++;
                            return [3 /*break*/, 2];
                        case 5:
                            traceComponents = allComponents.filter(function (component) { return component.metaData && component.metaData.MetaConfigDatapoints; });
                            return [2 /*return*/, traceComponents];
                    }
                });
            });
        };
        /**
         * Reads the trace data points from a single component
         *
         * @private
         * @param {MappCockpitComponent} traceableComponent
         * @memberof MappCockpitTraceProvider
         */
        MappCockpitTraceProvider.prototype.readComponentTraceDataPoints = function (traceableComponent) {
            var traceDataPoints = [];
            var traceMetaInfo = traceableComponent.metaData.MetaConfigDatapoints.DataPointsDefinition;
            traceMetaInfo.Namespaces.forEach(function (namespace) {
                namespace.Data.DataPoints.forEach(function (dataPointRef) {
                    traceDataPoints.push(traceDataPointInfo_1.TraceDataPointInfo.create(traceableComponent.browseName, traceMetaInfo.DeviceAddress, namespace, dataPointRef));
                });
            });
            return traceDataPoints;
        };
        return MappCockpitTraceProvider;
    }());
    exports.MappCockpitTraceProvider = MappCockpitTraceProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcENvY2twaXRUcmFjZVByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvZGlhZ25vc3RpY3MvdHJhY2UvbWFwcENvY2twaXRUcmFjZVByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQVVBOzs7O09BSUc7SUFDSDtRQWNJOzs7O1dBSUc7UUFDSCxrQ0FBWSxrQkFBaUQ7WUFFekQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLGtCQUFrQixDQUFDO1lBRTlDLElBQUksQ0FBQyx5QkFBeUIsR0FBRyxtQkFBUSxDQUFDLE1BQU0sQ0FBNEIsRUFBRSxDQUFDLENBQUM7WUFFaEYsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzFCLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNLLGlEQUFjLEdBQXRCO1lBQ0ksSUFBSSxDQUFDLGdDQUFnQyxHQUFHLGlCQUFPLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsc0NBQXNDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hILENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0csNkNBQVUsR0FBaEI7Ozs7Ozs7NEJBRUksS0FBQSxJQUFJLENBQUE7NEJBQW9CLHFCQUFNLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxFQUFBOzs0QkFBOUQsR0FBSyxnQkFBZ0IsR0FBRyxTQUFzQyxDQUFDOzRCQUUvRCxxQkFBTSxJQUFJLENBQUMsK0JBQStCLENBQUMsT0FBTyxDQUFDLElBQUksRUFBQyxVQUFDLHdCQUF3QjtvQ0FDN0UsS0FBSSxDQUFDLHlCQUF5QixDQUFDLEtBQUssR0FBRyx3QkFBd0IsQ0FBQztvQ0FDaEUsS0FBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxVQUFBLGNBQWM7d0NBQ3hDLGNBQWMsQ0FBQywyQkFBMkIsQ0FBQyxjQUFjLENBQUMsc0JBQXNCLENB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Q0FBQyx1Q0FBa0IsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsVUFBVSxFQUFDLGFBQWEsQ0FBQyxhQUFhLEVBQUMsU0FBUyxFQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQ3RJLENBQUMsQ0FBQyxDQUFBO1lBQ04sQ0FBQyxDQUFDLENBQUE7WUFFRixPQUFPLGVBQWUsQ0FBQztRQUMzQixDQUFDO1FBQ0wsK0JBQUM7SUFBRCxDQUFDLEFBcE5ELElBb05DO0lBR1EsNERBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXIgfSBmcm9tICcuLi9tYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlcic7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50fSBmcm9tICcuLi8uLi9vbmxpbmUvbWFwcENvY2twaXRDb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbW1vbkluZm9Qcm92aWRlciB9IGZyb20gJy4uL21hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyJztcclxuaW1wb3J0IHsgVHJhY2VEYXRhUG9pbnRJbmZvIH0gZnJvbSAnLi90cmFjZURhdGFQb2ludEluZm8nO1xyXG5pbXBvcnQgeyBQcm9wZXJ0eSB9IGZyb20gJy4uLy4uLy4uL2ZyYW1ld29yay9wcm9wZXJ0eSc7XHJcbmltcG9ydCB7IElUcmFjZURhdGFQcm92aWRlciB9IGZyb20gJy4vaW50ZXJmYWNlcy90cmFjZURhdGFQcm92aWRlckludGVyZmFjZSc7XHJcbmltcG9ydCB7IENvbW1hbmQsIElDb21tYW5kRXhlY3V0aW9uUmVzcG9uc2VEZWxlZ2F0ZSwgSUNvbW1hbmRFeGVjdXRpb25EZWxlZ2F0ZSB9IGZyb20gJy4uLy4uLy4uL2ZyYW1ld29yay9jb21tYW5kJztcclxuaW1wb3J0IHsgTWFwcENvY2twaXRUcmFjZUNvbXBvbmVudCB9IGZyb20gJy4vbWFwcENvY2twaXRUcmFjZUNvbXBvbmVudCc7XHJcblxyXG5cclxuLyoqXHJcbiAqIEltcGxlbWVudHMgdHJhY2UgYWNjZXNzIHNlcnZpY2VzXHJcbiAqXHJcbiAqIEBjbGFzcyBNYXBwQ29ja3BpdFRyYWNlUHJvdmlkZXJcclxuICovXHJcbmNsYXNzIE1hcHBDb2NrcGl0VHJhY2VQcm92aWRlciBpbXBsZW1lbnRzICBJVHJhY2VEYXRhUHJvdmlkZXIge1xyXG4gICBcclxuICAgIC8vIFJlZmVyZW5jZXMgdGhlIGRpYWdub3N0aWMgcHJvdmlkZXJcclxuICAgIHByaXZhdGUgX2RpYWdub3N0aWNQcm92aWRlcjogTWFwcENvY2twaXREaWFnbm9zdGljUHJvdmlkZXI7XHJcblxyXG4gICAgLy8gSG9sZHMgdGhlIHRyYWNlIGNvbXBvbmVudHMgaW5zdGFuY2VzXHJcbiAgICBwcml2YXRlIF90cmFjZUNvbXBvbmVudHMhOiBNYXBwQ29ja3BpdFRyYWNlQ29tcG9uZW50W107XHJcbiAgICBcclxuICAgIC8vIEhvbGRzIHRoZSBhdmFpbGFibGUgdHJhY2UgZGF0YSBwb2ludHM7XHJcbiAgICBwcml2YXRlIF9hdmFpbGFibGVUcmFjZURhdGFQb2ludHM6IFByb3BlcnR5PEFycmF5PFRyYWNlRGF0YVBvaW50SW5mbz4+O1xyXG5cclxuICAgIC8vIEhvbGRzIHRoZSBjb21tYW5kIGZvciByZWFkaW5nIHRoIHRyYWNlIGRhdGFcclxuICAgIHByaXZhdGUgX2NvbW1hbmRSZWFkQXZhaWxhYmxlVHJhY2VQb2ludHMhOiBDb21tYW5kPGFueSwgQXJyYXk8VHJhY2VEYXRhUG9pbnRJbmZvPj47XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBNYXBwQ29ja3BpdFRyYWNlUHJvdmlkZXIuXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0RGlhZ25vc3RpY1Byb3ZpZGVyfSBkaWFnbm9zdGljUHJvdmlkZXJcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFRyYWNlUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoZGlhZ25vc3RpY1Byb3ZpZGVyOiBNYXBwQ29ja3BpdERpYWdub3N0aWNQcm92aWRlcikge1xyXG5cclxuICAgICAgICB0aGlzLl9kaWFnbm9zdGljUHJvdmlkZXIgPSBkaWFnbm9zdGljUHJvdmlkZXI7XHJcblxyXG4gICAgICAgIHRoaXMuX2F2YWlsYWJsZVRyYWNlRGF0YVBvaW50cyA9IFByb3BlcnR5LmNyZWF0ZTxBcnJheTxUcmFjZURhdGFQb2ludEluZm8+PihbXSk7XHJcblxyXG4gICAgICAgIHRoaXMuY3JlYXRlQ29tbWFuZHMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIGV4cG9zZWQgY29tbWFuZHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0VHJhY2VQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZUNvbW1hbmRzKCkge1xyXG4gICAgICAgIHRoaXMuX2NvbW1hbmRSZWFkQXZhaWxhYmxlVHJhY2VQb2ludHMgPSBDb21tYW5kLmNyZWF0ZSh0aGlzLCB0aGlzLmV4ZWN1dGVDb21tYW5kUmVhZEF2YWlsYWJsZVRyYWNlUG9pbnRzKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6ZXMgYW5kIGNvbm5lY3RzIHRoZSB0cmFjZSBwcm92aWRlclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzZXNzaW9uSWRcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBfbmFtZXNwYWNlSW5kZXhcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0VHJhY2VQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBhc3luYyBpbml0aWFsaXplKCk6IFByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgIHRoaXMuX3RyYWNlQ29tcG9uZW50cyA9IGF3YWl0IHRoaXMuaW5pdGlhbGl6ZVRyYWNlQ29tcG9uZW50cygpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGF3YWl0IHRoaXMuY29tbWFuZFJlYWRBdmFpbGFibGVUcmFjZVBvaW50cy5leGVjdXRlKG51bGwsKGF2YWlsYWJsZVRyYWNlRGF0YVBvaW50cyk9PntcclxuICAgICAgICAgICAgdGhpcy5fYXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzLnZhbHVlID0gYXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzO1xyXG4gICAgICAgICAgICB0aGlzLl90cmFjZUNvbXBvbmVudHMuZm9yRWFjaCh0cmFjZUNvbXBvbmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0cmFjZUNvbXBvbmVudC51cGRhdGVEYXRhUG9pbnRJbmZvcm1hdGlvbnModHJhY2VDb21wb25lbnQudHJhY2VDb25maWd1cmF0aW9uRGF0YSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDb21tYW5kIGZvciByZWFkaW5nIHRoZSBjdXJyZW50bHkgYXZhaWxhYmxlIHRyYWNlIHBvaW50cy5cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtDb21tYW5kPGFueSwgVHJhY2VEYXRhPn1cclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFRyYWNlUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBjb21tYW5kUmVhZEF2YWlsYWJsZVRyYWNlUG9pbnRzKCk6IENvbW1hbmQ8YW55LCBBcnJheTxUcmFjZURhdGFQb2ludEluZm8+PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbW1hbmRSZWFkQXZhaWxhYmxlVHJhY2VQb2ludHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbXBsZW1lbnRzIHRoZSBjb21tYW5kIGZvciByZWFkaW5nIHRoZSBhdmFpbGFibGUgdHJhY2UgcG9pbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRUcmFjZVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZXhlY3V0ZUNvbW1hbmRSZWFkQXZhaWxhYmxlVHJhY2VQb2ludHMoKTogIElDb21tYW5kRXhlY3V0aW9uRGVsZWdhdGU8YW55LFRyYWNlRGF0YVBvaW50SW5mb1tdPntcclxuICAgICAgICByZXR1cm4gKGNvbW1hbmRBcmd1bWVudHM6YW55LGNvbW1hbmRSZXNwb25zZTogSUNvbW1hbmRFeGVjdXRpb25SZXNwb25zZURlbGVnYXRlPFRyYWNlRGF0YVBvaW50SW5mb1tdPikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnJlYWRBbGxUcmFjZURhdGFQb2ludHMoKS50aGVuKCh0cmFjZURhdGFQb2ludHMpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbW1hbmRSZXNwb25zZS5leGVjdXRlZCh0cmFjZURhdGFQb2ludHMpO1xyXG4gICAgICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbW1hbmRSZXNwb25zZS5yZWplY3RlZChlcnJvcik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmFjZSBjb21wb25lbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7TWFwcENvY2twaXRUcmFjZUNvbXBvbmVudFtdfVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0VHJhY2VQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHRyYWNlQ29tcG9uZW50cygpOiBNYXBwQ29ja3BpdFRyYWNlQ29tcG9uZW50W10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90cmFjZUNvbXBvbmVudHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSB0cmFjZWFibGUgZGF0YSBwb2ludHNcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtQcm9wZXJ0eTxBcnJheTxUcmFjZURhdGFQb2ludD4+fVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0VHJhY2VQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGF2YWlsYWJsZURhdGFQb2ludHMoKSA6IFByb3BlcnR5PEFycmF5PFRyYWNlRGF0YVBvaW50SW5mbz4+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzO1xyXG4gICAgfVxyXG4gIFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6ZXMgYW5kIGNvbm5lY3RzIHRoZSB0YXJnZXQgdHJhY2UgY29tcG9uZW50c1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRUcmFjZVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgaW5pdGlhbGl6ZVRyYWNlQ29tcG9uZW50cygpICB7XHJcblxyXG4gICAgICAgIGxldCBjb21wb25lbnRzID0gYXdhaXQgdGhpcy5nZXRUcmFjZUNvbXBvbmVudHMoKTtcclxuICAgICAgICBsZXQgdHJhY2VDb21wb25lbnRzID0gbmV3IEFycmF5PE1hcHBDb2NrcGl0VHJhY2VDb21wb25lbnQ+KCk7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGNvbXBvbmVudHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IHRyYWNlQ29tcG9uZW50ID0gbmV3IE1hcHBDb2NrcGl0VHJhY2VDb21wb25lbnQodGhpcy5fZGlhZ25vc3RpY1Byb3ZpZGVyLCBjb21wb25lbnRzW2ldKTtcclxuICAgICAgICAgICAgdHJhY2VDb21wb25lbnQuYXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzID0gdGhpcy5fYXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzO1xyXG4gICAgICAgICAgICB0cmFjZUNvbXBvbmVudHMucHVzaCh0cmFjZUNvbXBvbmVudCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHRyYWNlQ29tcG9uZW50cztcclxuICAgIH1cclxuICAgIFxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIGdldHMgdGhlIHRyYWNlIGNvbXBvbmVudHMgZnJvbSBhbGwgYXZhaWxhYmxlIGNvbXBvbmVudHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1hcHBDb2NrcGl0VHJhY2VQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGdldFRyYWNlQ29tcG9uZW50cygpOiBQcm9taXNlPEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50Pj4ge1xyXG4gICAgICAgIGxldCB0cmFjZUNvbXBvbmVudHMgPSB0aGlzLl9kaWFnbm9zdGljUHJvdmlkZXIubW9kZWwuY29tcG9uZW50cy5maWx0ZXIoY29tcG9uZW50ID0+IHtyZXR1cm4gY29tcG9uZW50LmJyb3dzZU5hbWUgPT0gXCJOZXdUcmFjZUNvbmZpZ1wifSk7XHJcbiAgICAgICAgaWYodHJhY2VDb21wb25lbnRzLmxlbmd0aCA9PSAxKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gU2V0IERpc3BsYXluYW1lIG9mIHRyYWNlIGNvbXBvbmVudCBcIk5ld1RyYWNlQ29uZmlnXCIgdG8gXCJUcmFjZVwiXHJcbiAgICAgICAgICAgIHRyYWNlQ29tcG9uZW50c1swXS5kaXNwbGF5TmFtZSA9IFwiVHJhY2VcIjtcclxuICAgICAgICAgICAgcmV0dXJuIHRyYWNlQ29tcG9uZW50c1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50PigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZHMgdGhlIGF2YWlsYWJsZSB0cmFjZSBkYXRhcG9pbnRzIGZyb20gYWxsIGNvbXBvbmVudHMuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRUcmFjZVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgcmVhZEFsbFRyYWNlRGF0YVBvaW50cygpIHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgYWxsQXZhaWxhYmxlVHJhY2VEYXRhUG9pbnRzID0gbmV3IEFycmF5PFRyYWNlRGF0YVBvaW50SW5mbz4oKTtcclxuICAgICAgICAvLyBnZXQgdGhlIHRyYWNlYWJsZSBjb21wb25lbnRzXHJcbiAgICAgICAgbGV0IHRyYWNlYWJsZUNvbXBvbmVudHM6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50PiA9IGF3YWl0IHRoaXMucmVhZFRyYWNlUHJvdmlkZXJDb21wb25lbnRzKCk7XHJcblxyXG4gICAgICAgIC8vIGNvbGxlY3QgdGhlIGNvbXBvbmVudHMgZGF0YSBwb2ludHMgaW50byBvbmUgZmxhdCBhcnJheVxyXG4gICAgICAgIHRyYWNlYWJsZUNvbXBvbmVudHMuZm9yRWFjaCgodHJhY2VhYmxlQ29tcG9uZW50Y29tcG9uZW50KT0+e1xyXG4gICAgICAgICAgICBsZXQgY29tcG9uZXRUcmFjZVBvaW50cyA9IHRoaXMucmVhZENvbXBvbmVudFRyYWNlRGF0YVBvaW50cyh0cmFjZWFibGVDb21wb25lbnRjb21wb25lbnQpO1xyXG4gICAgICAgICAgICBhbGxBdmFpbGFibGVUcmFjZURhdGFQb2ludHMgPSBhbGxBdmFpbGFibGVUcmFjZURhdGFQb2ludHMuY29uY2F0KGNvbXBvbmV0VHJhY2VQb2ludHMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyB1cGRhdGUgdGhlIGF2YWlsYWJsZSB0cmFjZSBwb2ludHMgbGluay5cclxuICAgICAgICB0aGlzLl9hdmFpbGFibGVUcmFjZURhdGFQb2ludHMudmFsdWUgPSBhbGxBdmFpbGFibGVUcmFjZURhdGFQb2ludHM7XHJcblxyXG4gICAgICAgIHJldHVybiBhbGxBdmFpbGFibGVUcmFjZURhdGFQb2ludHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb2xsZWN0cyBjb21wb25lbnRzIHN1cHBvcnRpbmcgdHJhY2VhYmlsaXR5IGFuZCBleHBvc2luZyB0cmFjZXBvaW50c1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudD59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwcENvY2twaXRUcmFjZVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIHJlYWRUcmFjZVByb3ZpZGVyQ29tcG9uZW50cygpOiBQcm9taXNlPEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50Pj4ge1xyXG4gICAgICAgIGxldCB0cmFjZUNvbXBvbmVudHMgPSBuZXcgQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnQ+KCk7XHJcbiAgICAgICAgLy9sZXQgYWxsQ29tcG9uZW50cyA9IHRoaXMuX2RpYWdub3N0aWNQcm92aWRlci5tb2RlbC5jb21wb25lbnRzO1xyXG4gICAgICAgIGxldCBhbGxDb21wb25lbnRzID0gYXdhaXQgdGhpcy5fZGlhZ25vc3RpY1Byb3ZpZGVyLmNvbXBvbmVudFByb3ZpZGVyLmJyb3dzZUNvbXBvbmVudHMoKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGxDb21wb25lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudCA9IGFsbENvbXBvbmVudHNbaV07XHJcbiAgICAgICAgICAgIGF3YWl0IE1hcHBDb2NrcGl0Q29tbW9uSW5mb1Byb3ZpZGVyLmdldEluc3RhbmNlKCkucmVhZENvbXBvbmVudE1ldGFJbmZvKGNvbXBvbmVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0cmFjZUNvbXBvbmVudHMgPSBhbGxDb21wb25lbnRzLmZpbHRlcigoY29tcG9uZW50KT0+e3JldHVybiAoPGFueT5jb21wb25lbnQpLm1ldGFEYXRhICYmICg8YW55PmNvbXBvbmVudCkubWV0YURhdGEuTWV0YUNvbmZpZ0RhdGFwb2ludHMgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRyYWNlQ29tcG9uZW50cztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWRzIHRoZSB0cmFjZSBkYXRhIHBvaW50cyBmcm9tIGEgc2luZ2xlIGNvbXBvbmVudFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50fSB0cmFjZWFibGVDb21wb25lbnRcclxuICAgICAqIEBtZW1iZXJvZiBNYXBwQ29ja3BpdFRyYWNlUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWFkQ29tcG9uZW50VHJhY2VEYXRhUG9pbnRzKHRyYWNlYWJsZUNvbXBvbmVudDogTWFwcENvY2twaXRDb21wb25lbnQpOiBBcnJheTxUcmFjZURhdGFQb2ludEluZm8+IHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgdHJhY2VEYXRhUG9pbnRzOiBBcnJheTxUcmFjZURhdGFQb2ludEluZm8+ID0gW107XHJcbiAgICAgICBcclxuICAgICAgICBsZXQgdHJhY2VNZXRhSW5mbyA9ICg8YW55PnRyYWNlYWJsZUNvbXBvbmVudC5tZXRhRGF0YSkuTWV0YUNvbmZpZ0RhdGFwb2ludHMuRGF0YVBvaW50c0RlZmluaXRpb247XHJcblxyXG4gICAgICAgIHRyYWNlTWV0YUluZm8uTmFtZXNwYWNlcy5mb3JFYWNoKChuYW1lc3BhY2UpPT57XHJcbiAgICAgICAgICAgIG5hbWVzcGFjZS5EYXRhLkRhdGFQb2ludHMuZm9yRWFjaCgoZGF0YVBvaW50UmVmKT0+e1xyXG4gICAgICAgICAgICAgICAgdHJhY2VEYXRhUG9pbnRzLnB1c2goVHJhY2VEYXRhUG9pbnRJbmZvLmNyZWF0ZSh0cmFjZWFibGVDb21wb25lbnQuYnJvd3NlTmFtZSx0cmFjZU1ldGFJbmZvLkRldmljZUFkZHJlc3MsbmFtZXNwYWNlLGRhdGFQb2ludFJlZikpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHJldHVybiB0cmFjZURhdGFQb2ludHM7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgeyBNYXBwQ29ja3BpdFRyYWNlUHJvdmlkZXIgfTsiXX0=