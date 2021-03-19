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
define(["require", "exports", "../../signalManagerDataModel/signalManagerCalculation", "./serieContainer", "./serieNode", "../../signalManagerDataModel/signalManagerCalculationInputData", "../seriesProvider/seriesProvider", "../../signalManagerDataModel/signalCategory", "../../../common/dateTimeHelper", "../../../common/persistence/settings", "../../signalManagerDataModel/signalManagerDataModelSettingIds"], function (require, exports, signalManagerCalculation_1, serieContainer_1, serieNode_1, signalManagerCalculationInputData_1, seriesProvider_1, signalCategory_1, dateTimeHelper_1, settings_1, signalManagerDataModelSettingIds_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SerieGroup = /** @class */ (function (_super) {
        __extends(SerieGroup, _super);
        /**
         * Creates an instance of SerieGroup.
         * @param {string} name
         * @param {number} startTriggerTime
         * @memberof SerieGroup
         */
        function SerieGroup(name, startTriggerTime, expandState) {
            if (expandState === void 0) { expandState = true; }
            var _this = _super.call(this, name, "", expandState) || this;
            _this.isSerieGroup = true;
            _this._startTriggerTime = startTriggerTime;
            return _this;
        }
        Object.defineProperty(SerieGroup.prototype, "startTriggerTime", {
            get: function () {
                return this._startTriggerTime;
            },
            set: function (value) {
                this._startTriggerTime = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SerieGroup.prototype, "color", {
            get: function () {
                return undefined;
            },
            enumerable: true,
            configurable: true
        });
        SerieGroup.prototype.getSettings = function () {
            var settings = new settings_1.Settings("SerieGroup");
            var seriesOfGroup = this.getSeries();
            if (seriesOfGroup != undefined) {
                var seriesIds = new Array();
                for (var i = 0; i < seriesOfGroup.length; i++) {
                    seriesIds.push(seriesOfGroup[i].id);
                }
                var containerName = undefined;
                if (this.parent != undefined && !(this.parent instanceof signalCategory_1.SignalCategory)) {
                    containerName = this.parent.name;
                }
                settings.setValue(signalManagerDataModelSettingIds_1.SettingIds.ContainerName, containerName);
                settings.setValue(signalManagerDataModelSettingIds_1.SettingIds.SerieGroupStartTriggerTime, this.startTriggerTime);
                settings.setValue(signalManagerDataModelSettingIds_1.SettingIds.SeriesIds, seriesIds);
            }
            return settings;
        };
        SerieGroup.prototype.setSettings = function (settings) {
            var settingsObj = settings_1.Settings.create(settings);
            // Set name and startTriggerTime of group
            var startTriggerTime = settingsObj.getValue(signalManagerDataModelSettingIds_1.SettingIds.SerieGroupStartTriggerTime);
            this.name = dateTimeHelper_1.DateTimeHelper.getDateTime(startTriggerTime);
            this._startTriggerTime = startTriggerTime;
            this.addSerieIdsFromSerieProviderToGroup(settingsObj.getValue(signalManagerDataModelSettingIds_1.SettingIds.SeriesIds));
        };
        /**
         * Adds the series for the given seriesIds to this group
         *
         * @private
         * @param {Array<string>} seriesIds
         * @memberof SerieGroup
         */
        SerieGroup.prototype.addSerieIdsFromSerieProviderToGroup = function (seriesIds) {
            var _this = this;
            var calculations = new Map();
            // add series to group and calculations without input data (needed to have all )
            seriesIds.forEach(function (serieId) {
                var foundSerie = seriesProvider_1.SeriesProvider.getInstance().get(serieId);
                if (foundSerie != undefined) {
                    if (foundSerie.calculationDataInfo != undefined) {
                        if (foundSerie.calculationDataInfo.type != "") {
                            // set output series object
                            calculations.set(foundSerie, _this.addCalculation(foundSerie.calculationDataInfo.type, undefined, foundSerie));
                        }
                    }
                    else {
                        _this.addSerie(foundSerie);
                    }
                }
            });
            // set input data of calculations
            calculations.forEach(function (signalManagerCalculation, series) {
                if (series != undefined) {
                    // get input values
                    var inputValues = new Array();
                    if (series.calculationDataInfo != undefined) {
                        for (var i = 0; i < series.calculationDataInfo.inputDataValues.length; i++) {
                            inputValues.push(series.calculationDataInfo.inputDataValues[i]);
                        }
                    }
                    // add inputdata to calculations
                    var childs = signalManagerCalculation.getInputCalculationData();
                    for (var i = 0; i < childs.length; i++) {
                        signalManagerCalculation.setValue(i, inputValues[i]);
                    }
                }
            });
        };
        /**
         * Adds a new calculation with the given type to this group
         *
         * @param {string} type
         * @param {(Array<string>|undefined)} [inputValues=undefined] Array of the input strings for the calculations
         * @param {(BaseSeries|undefined)} [existingSerie=undefined]
         * @returns {SignalManagerCalculation}
         * @memberof SerieGroup
         */
        SerieGroup.prototype.addCalculation = function (type, inputValues, existingSerie) {
            if (inputValues === void 0) { inputValues = undefined; }
            if (existingSerie === void 0) { existingSerie = undefined; }
            // this serie is the output of a calculation => add calculation
            var calculation = new signalManagerCalculation_1.SignalManagerCalculation("Calculation");
            this.addSerieContainer(calculation, -1);
            // set calculationType
            calculation.setCalculatorType(type);
            if (inputValues != undefined) {
                // set input data of calculation
                var childs = calculation.getInputCalculationData();
                for (var i = 0; i < childs.length; i++) {
                    calculation.setValue(i, inputValues[i]);
                }
            }
            if (existingSerie != undefined) {
                var outputData = calculation.getOutputCalculationData();
                if (outputData.length > 0) { // TODO: Implement multiOutput
                    // Add new serie object
                    outputData[0].serie = existingSerie;
                }
            }
            return calculation;
        };
        /**
         * Adds a serie to this serie container
         *
         * @param {BaseSeries} serie
         * @param {number} [index=-1]  -1 to add at the end, else the index where to add
         * @memberof SerieContainer
         */
        SerieGroup.prototype.addSerie = function (serie, index) {
            if (index === void 0) { index = -1; }
            var newSerieNode = new serieNode_1.SerieNode(undefined, serie);
            _super.prototype.addSerieNode.call(this, newSerieNode);
        };
        /**
         * Removes a serie from this serie container
         *
         * @param {BaseSeries} serie
         * @memberof SerieContainer
         */
        SerieGroup.prototype.removeSerie = function (serie) {
            // Found serie within serienodes
            var serieNode = undefined;
            for (var i = 0; i < this.childs.length; i++) {
                if (this.childs[i].serie == serie) {
                    serieNode = this.childs[i];
                }
            }
            if (serieNode != undefined) {
                _super.prototype.removeSerieNode.call(this, serieNode);
            }
        };
        /**
         * Remove all references to the given serie within this serie group(e.g. references in calculations)
         *
         * @param {(BaseSeries|undefined)} serie
         * @memberof SerieGroup
         */
        SerieGroup.prototype.removeReferencesToSerieNode = function (serieNode) {
            if (!(serieNode instanceof signalManagerCalculationInputData_1.SignalManagerCalculationInputData)) {
                // inform all child nodes(calculations) that a serie will be removed from this serieGroup; only in case of
                // the serieNode is no inputSignal of a calculation
                this.getChilds().forEach(function (child) {
                    if (child instanceof signalManagerCalculation_1.SignalManagerCalculation) {
                        var calculation = child;
                        if (serieNode.serie != undefined) {
                            calculation.removeReferencesToSerie(serieNode.serie);
                        }
                    }
                });
            }
        };
        /**
         * Makes a copy of the object with all sub objects(e.g. series)
         *
         * @returns {SerieGroup}
         * @memberof SerieGroup
         */
        SerieGroup.prototype.clone = function () {
            var serieGroup = new SerieGroup(this.name, this.startTriggerTime);
            serieGroup.expandState = this.expandState;
            for (var i = 0; i < this.childs.length; i++) {
                var serieNode = this.childs[i];
                if (serieNode != undefined) {
                    serieGroup.addSerieNode(serieNode.clone(), -1);
                }
            }
            // update series at input calculation data with cloned series from serie group
            for (var i = 0; i < serieGroup.childs.length; i++) {
                var calculationNode = serieGroup.childs[i];
                if (calculationNode instanceof signalManagerCalculation_1.SignalManagerCalculation) {
                    calculationNode.updateInputData(serieGroup);
                }
            }
            return serieGroup;
        };
        /**
         * Returns the serie with the given serieName within the serie group
         *
         * @param {string} serieName
         * @returns {(BaseSeries|undefined)}
         * @memberof SerieGroup
         */
        SerieGroup.prototype.getSerie = function (serieName) {
            var series = this.getSeries();
            for (var i = 0; i < series.length; i++) {
                if (series[i].name == serieName) {
                    return series[i];
                }
            }
            return undefined;
        };
        SerieGroup.prototype.getSerieByOriginalName = function (originalName) {
            var series = this.getSeries();
            for (var i = 0; i < series.length; i++) {
                if (series[i].originalName == originalName) {
                    return series[i];
                }
            }
            return undefined;
        };
        /**
         * Merges the information of a serie group to an existing serie group
         * Adds new series; removes not available series; updates the data of existing series(same serie name)
         * Calculations will be ignored
         *
         * @param {ISerieGroup} newSerieGroup
         * @memberof SerieGroup
         */
        SerieGroup.prototype.mergeWithSerieGroup = function (newSerieGroup) {
            this.startTriggerTime = newSerieGroup.startTriggerTime;
            this.name = newSerieGroup.name;
            // Remove unused series (only if not a calculation)
            for (var i = 0; i < this.childs.length; i++) {
                var serieNode = this.childs[i];
                var serieNodeName = serieNode.name;
                if (serieNode.serie != undefined) {
                    serieNodeName = serieNode.serie.originalName;
                }
                var foundSerieNode = newSerieGroup.getSerieByOriginalName(serieNodeName);
                if (foundSerieNode == undefined) {
                    if (!(serieNode instanceof signalManagerCalculation_1.SignalManagerCalculation)) { // Remove only if not a calculation
                        this.removeSerieNode(serieNode);
                        i--;
                    }
                }
                else {
                    // Updates the data of an existing serie
                    if (serieNode.serie != undefined) {
                        serieNode.serie.updatePoints(foundSerieNode.rawPoints);
                    }
                }
            }
            this.addSeriesFromGroup(newSerieGroup);
        };
        /**
         * Adds series from the given serieGroup to this serieGroup if not already there
         * Signals will be added before the first calculation
         *
         * @private
         * @param {ISerieGroup} serieGroup
         * @memberof SerieGroup
         */
        SerieGroup.prototype.addSeriesFromGroup = function (serieGroup) {
            // add new series before calculations
            var firstCalculationIndex = this.getFirstCalculationIndex();
            var childs = serieGroup.getChilds();
            for (var i = 0; i < childs.length; i++) {
                var serieNodeName = childs[i].name;
                if (childs[i].serie != undefined) {
                    serieNodeName = childs[i].serie.originalName;
                }
                var foundSerieNode = this.getSerieByOriginalName(serieNodeName);
                if (foundSerieNode == undefined) {
                    var newSerieNode = childs[i];
                    if (newSerieNode != undefined) {
                        this.addSerieNode(newSerieNode, firstCalculationIndex);
                        if (firstCalculationIndex != -1) {
                            firstCalculationIndex++;
                        }
                    }
                }
            }
        };
        /**
         * Returns the index of the first calculation in the childs of this group
         *
         * @private
         * @returns {number}
         * @memberof SerieGroup
         */
        SerieGroup.prototype.getFirstCalculationIndex = function () {
            for (var i = 0; i < this.childs.length; i++) {
                var child = this.childs[i];
                if (child instanceof signalManagerCalculation_1.SignalManagerCalculation) {
                    return i;
                }
            }
            return -1;
        };
        return SerieGroup;
    }(serieContainer_1.SerieContainer));
    exports.SerieGroup = SerieGroup;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWVHcm91cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbW1vbi9zaWduYWwvc2VyaWVHcm91cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBY0E7UUFBZ0MsOEJBQWM7UUFnQjFDOzs7OztXQUtHO1FBQ0gsb0JBQVksSUFBWSxFQUFFLGdCQUF3QixFQUFFLFdBQTJCO1lBQTNCLDRCQUFBLEVBQUEsa0JBQTJCO1lBQS9FLFlBQ0ksa0JBQU0sSUFBSSxFQUFFLEVBQUUsRUFBRSxXQUFXLENBQUMsU0FFL0I7WUF2QkQsa0JBQVksR0FBRyxJQUFJLENBQUM7WUFzQmhCLEtBQUksQ0FBQyxpQkFBaUIsR0FBRyxnQkFBZ0IsQ0FBQzs7UUFDOUMsQ0FBQztRQXBCRCxzQkFBVyx3Q0FBZ0I7aUJBQTNCO2dCQUNJLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO1lBQ2xDLENBQUM7aUJBQ0QsVUFBNEIsS0FBYTtnQkFDckMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztZQUNuQyxDQUFDOzs7V0FIQTtRQUtELHNCQUFXLDZCQUFLO2lCQUFoQjtnQkFDSSxPQUFPLFNBQVMsQ0FBQztZQUNyQixDQUFDOzs7V0FBQTtRQWFELGdDQUFXLEdBQVg7WUFDSSxJQUFJLFFBQVEsR0FBRyxJQUFJLG1CQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDMUMsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ3JDLElBQUcsYUFBYSxJQUFJLFNBQVMsRUFBQztnQkFDMUIsSUFBSSxTQUFTLEdBQWtCLElBQUksS0FBSyxFQUFVLENBQUM7Z0JBQ25ELEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO29CQUN6QyxTQUFTLENBQUMsSUFBSSxDQUFDLGFB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SUFBSSxTQUFTLEVBQUM7b0JBQzVCLGFBQWEsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBTSxDQUFDLFlBQVksQ0FBQztpQkFDakQ7Z0JBQ0QsSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUNoRSxJQUFHLGNBQWMsSUFBSSxTQUFTLEVBQUM7b0JBQzNCLElBQUksWUFBWSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDN0IsSUFBRyxZQUFZLElBQUksU0FBUyxFQUFDO3dCQUN6QixJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO3dCQUN2RCxJQUFHLHFCQUFxQixJQUFJLENBQUMsQ0FBQyxFQUFDOzRCQUMzQixxQkFBcUIsRUFBRSxDQUFDO3lCQUMzQjtxQkFDSjtpQkFDSjthQUNKO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLDZDQUF3QixHQUFoQztZQUNJLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUcsRUFBQztnQkFDeEMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0IsSUFBRyxLQUFLLFlBQVksbURBQXdCLEVBQUM7b0JBQ3pDLE9BQU8sQ0FBQyxDQUFDO2lCQUNaO2FBQ0o7WUFDRCxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ2QsQ0FBQztRQUVMLGlCQUFDO0lBQUQsQ0FBQyxBQW5VRCxDQUFnQywrQkFBYyxHQW1VN0M7SUFuVVksZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJU2VyaWVHcm91cCB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3NlcmllR3JvdXBJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uIH0gZnJvbSBcIi4uLy4uL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvc2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uXCI7XHJcbmltcG9ydCB7IFNlcmllQ29udGFpbmVyIH0gZnJvbSBcIi4vc2VyaWVDb250YWluZXJcIjtcclxuaW1wb3J0IHsgU2VyaWVOb2RlIH0gZnJvbSBcIi4vc2VyaWVOb2RlXCI7XHJcbmltcG9ydCB7IElTZXJpZU5vZGUgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9zZXJpZU5vZGVJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQmFzZVNlcmllcyB9IGZyb20gXCIuLi8uLi9jaGFydE1hbmFnZXJEYXRhTW9kZWwvYmFzZVNlcmllc1wiO1xyXG5pbXBvcnQgeyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGEgfSBmcm9tIFwiLi4vLi4vc2lnbmFsTWFuYWdlckRhdGFNb2RlbC9zaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGFcIjtcclxuaW1wb3J0IHsgU2VyaWVzUHJvdmlkZXIgfSBmcm9tIFwiLi4vc2VyaWVzUHJvdmlkZXIvc2VyaWVzUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgU2lnbmFsQ2F0ZWdvcnkgfSBmcm9tIFwiLi4vLi4vc2lnbmFsTWFuYWdlckRhdGFNb2RlbC9zaWduYWxDYXRlZ29yeVwiO1xyXG5pbXBvcnQgeyBEYXRlVGltZUhlbHBlciB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vZGF0ZVRpbWVIZWxwZXJcIjtcclxuaW1wb3J0IHsgSVNldHRpbmdzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9pbnRlcmZhY2VzL3NldHRpbmdzSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBTZXR0aW5nSWRzIH0gZnJvbSBcIi4uLy4uL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvc2lnbmFsTWFuYWdlckRhdGFNb2RlbFNldHRpbmdJZHNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTZXJpZUdyb3VwIGV4dGVuZHMgU2VyaWVDb250YWluZXIgaW1wbGVtZW50cyBJU2VyaWVHcm91cHtcclxuICAgIFxyXG4gICAgaXNTZXJpZUdyb3VwID0gdHJ1ZTtcclxuXHJcbiAgICBwcml2YXRlIF9zdGFydFRyaWdnZXJUaW1lOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgZ2V0IHN0YXJ0VHJpZ2dlclRpbWUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3RhcnRUcmlnZ2VyVGltZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgc3RhcnRUcmlnZ2VyVGltZSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fc3RhcnRUcmlnZ2VyVGltZSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY29sb3IoKTogc3RyaW5nfHVuZGVmaW5lZCB7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgU2VyaWVHcm91cC5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc3RhcnRUcmlnZ2VyVGltZVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllR3JvdXBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBzdGFydFRyaWdnZXJUaW1lOiBudW1iZXIsIGV4cGFuZFN0YXRlOiBib29sZWFuID0gdHJ1ZSl7XHJcbiAgICAgICAgc3VwZXIobmFtZSwgXCJcIiwgZXhwYW5kU3RhdGUpO1xyXG4gICAgICAgIHRoaXMuX3N0YXJ0VHJpZ2dlclRpbWUgPSBzdGFydFRyaWdnZXJUaW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNldHRpbmdzKCk6IElTZXR0aW5nc3tcclxuICAgICAgICBsZXQgc2V0dGluZ3MgPSBuZXcgU2V0dGluZ3MoXCJTZXJpZUdyb3VwXCIpO1xyXG4gICAgICAgIGxldCBzZXJpZXNPZkdyb3VwID0gdGhpcy5nZXRTZXJpZXMoKTtcclxuICAgICAgICBpZihzZXJpZXNPZkdyb3VwICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGxldCBzZXJpZXNJZHM6IEFycmF5PHN0cmluZz4gPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2VyaWVzT2ZHcm91cC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBzZXJpZXNJZHMucHVzaChzZXJpZXNPZkdyb3VwW2ldLmlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgY29udGFpbmVyTmFtZTogc3RyaW5nfHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgaWYodGhpcy5wYXJlbnQgIT0gdW5kZWZpbmVkICYmICEodGhpcy5wYXJlbnQgaW5zdGFuY2VvZiBTaWduYWxDYXRlZ29yeSkpe1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyTmFtZSA9IHRoaXMucGFyZW50Lm5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0dGluZ3Muc2V0VmFsdWUoU2V0dGluZ0lkcy5Db250YWluZXJOYW1lLCBjb250YWluZXJOYW1lKTtcclxuICAgICAgICAgICAgc2V0dGluZ3Muc2V0VmFsdWUoU2V0dGluZ0lkcy5TZXJpZUdyb3VwU3RhcnRUcmlnZ2VyVGltZSwgdGhpcy5zdGFydFRyaWdnZXJUaW1lKTtcclxuICAgICAgICAgICAgc2V0dGluZ3Muc2V0VmFsdWUoU2V0dGluZ0lkcy5TZXJpZXNJZHMsIHNlcmllc0lkcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZXR0aW5ncztcclxuICAgIH1cclxuXHJcbiAgICBzZXRTZXR0aW5ncyhzZXR0aW5nczogSVNldHRpbmdzKXtcclxuICAgICAgICBsZXQgc2V0dGluZ3NPYmogPSBTZXR0aW5ncy5jcmVhdGUoc2V0dGluZ3MpO1xyXG4gICAgICAgIC8vIFNldCBuYW1lIGFuZCBzdGFydFRyaWdnZXJUaW1lIG9mIGdyb3VwXHJcbiAgICAgICAgbGV0IHN0YXJ0VHJpZ2dlclRpbWUgPSBzZXR0aW5nc09iai5nZXRWYWx1ZShTZXR0aW5nSWRzLlNlcmllR3JvdXBTdGFydFRyaWdnZXJUaW1lKTtcclxuICAgICAgICB0aGlzLm5hbWUgPSBEYXRlVGltZUhlbHBlci5nZXREYXRlVGltZShzdGFydFRyaWdnZXJUaW1lKTtcclxuICAgICAgICB0aGlzLl9zdGFydFRyaWdnZXJUaW1lID0gc3RhcnRUcmlnZ2VyVGltZTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmFkZFNlcmllSWRzRnJvbVNlcmllUHJvdmlkZXJUb0dyb3VwKHNldHRpbmdzT2JqLmdldFZhbHVlKFNldHRpbmdJZHMuU2VyaWVzSWRzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIHRoZSBzZXJpZXMgZm9yIHRoZSBnaXZlbiBzZXJpZXNJZHMgdG8gdGhpcyBncm91cFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PHN0cmluZz59IHNlcmllc0lkc1xyXG4gICAgICogQG1lbWJlcm9mIFNlcmllR3JvdXBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRTZXJpZUlkc0Zyb21TZXJpZVByb3ZpZGVyVG9Hcm91cChzZXJpZXNJZHM6IEFycmF5PHN0cmluZz4pe1xyXG4gICAgICAgIGxldCBjYWxjdWxhdGlvbnMgPSBuZXcgTWFwPEJhc2VTZXJpZXMsU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uPigpO1xyXG4gICAgICAgIC8vIGFkZCBzZXJpZXMgdG8gZ3JvdXAgYW5kIGNhbGN1bGF0aW9ucyB3aXRob3V0IGlucHV0IGRhdGEgKG5lZWRlZCB0byBoYXZlIGFsbCApXHJcbiAgICAgICAgc2VyaWVzSWRzLmZvckVhY2goc2VyaWVJZCA9PiB7XHJcbiAgICAgICAgICBsZXQgZm91bmRTZXJpZSA9IFNlcmllc1Byb3ZpZGVyLmdldEluc3RhbmNlKCkuZ2V0KHNlcmllSWQpO1xyXG4gICAgICAgICAgaWYoZm91bmRTZXJpZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBpZihmb3VuZFNlcmllLmNhbGN1bGF0aW9uRGF0YUluZm8gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGlmKGZvdW5kU2VyaWUuY2FsY3VsYXRpb25EYXRhSW5mby50eXBlICE9IFwiXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNldCBvdXRwdXQgc2VyaWVzIG9iamVjdFxyXG4gICAgICAgICAgICAgICAgICAgIGNhbGN1bGF0aW9ucy5zZXQoZm91bmRTZXJpZSwgdGhpcy5hZGRDYWxjdWxhdGlvbihmb3VuZFNlcmllLmNhbGN1bGF0aW9uRGF0YUluZm8udHlwZSwgdW5kZWZpbmVkLCBmb3VuZFNlcmllKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICB0aGlzLmFkZFNlcmllKGZvdW5kU2VyaWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7IFxyXG5cclxuICAgICAgICAvLyBzZXQgaW5wdXQgZGF0YSBvZiBjYWxjdWxhdGlvbnNcclxuICAgICAgICBjYWxjdWxhdGlvbnMuZm9yRWFjaCgoc2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uLCBzZXJpZXMpID0+IHtcclxuICAgICAgICAgIGlmKHNlcmllcyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAvLyBnZXQgaW5wdXQgdmFsdWVzXHJcbiAgICAgICAgICAgIGxldCBpbnB1dFZhbHVlcyA9IG5ldyBBcnJheTxzdHJpbmc+KCk7XHJcbiAgICAgICAgICAgIGlmKHNlcmllcy5jYWxjdWxhdGlvbkRhdGFJbmZvICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPTA7IGkgPCBzZXJpZXMuY2FsY3VsYXRpb25EYXRhSW5mby5pbnB1dERhdGFWYWx1ZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0VmFsdWVzLnB1c2goc2VyaWVzLmNhbGN1bGF0aW9uRGF0YUluZm8uaW5wdXREYXRhVmFsdWVzW2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBhZGQgaW5wdXRkYXRhIHRvIGNhbGN1bGF0aW9uc1xyXG4gICAgICAgICAgICBsZXQgY2hpbGRzID0gc2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uLmdldElucHV0Q2FsY3VsYXRpb25EYXRhKCk7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9MDsgaSA8IGNoaWxkcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBzaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb24uc2V0VmFsdWUoaSwgaW5wdXRWYWx1ZXNbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgbmV3IGNhbGN1bGF0aW9uIHdpdGggdGhlIGdpdmVuIHR5cGUgdG8gdGhpcyBncm91cFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXHJcbiAgICAgKiBAcGFyYW0geyhBcnJheTxzdHJpbmc+fHVuZGVmaW5lZCl9IFtpbnB1dFZhbHVlcz11bmRlZmluZWRdIEFycmF5IG9mIHRoZSBpbnB1dCBzdHJpbmdzIGZvciB0aGUgY2FsY3VsYXRpb25zXHJcbiAgICAgKiBAcGFyYW0geyhCYXNlU2VyaWVzfHVuZGVmaW5lZCl9IFtleGlzdGluZ1NlcmllPXVuZGVmaW5lZF1cclxuICAgICAqIEByZXR1cm5zIHtTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb259XHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVHcm91cFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZENhbGN1bGF0aW9uKHR5cGU6IHN0cmluZywgaW5wdXRWYWx1ZXM6IEFycmF5PHN0cmluZz58dW5kZWZpbmVkID0gdW5kZWZpbmVkLCBleGlzdGluZ1NlcmllOiBCYXNlU2VyaWVzfHVuZGVmaW5lZCA9IHVuZGVmaW5lZCk6IFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbntcclxuICAgICAgICAvLyB0aGlzIHNlcmllIGlzIHRoZSBvdXRwdXQgb2YgYSBjYWxjdWxhdGlvbiA9PiBhZGQgY2FsY3VsYXRpb25cclxuICAgICAgICBsZXQgY2FsY3VsYXRpb24gPSBuZXcgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uKFwiQ2FsY3VsYXRpb25cIik7XHJcbiAgICAgICAgdGhpcy5hZGRTZXJpZUNvbnRhaW5lcihjYWxjdWxhdGlvbiwgLTEpO1xyXG4gICAgICAgIC8vIHNldCBjYWxjdWxhdGlvblR5cGVcclxuICAgICAgICBjYWxjdWxhdGlvbi5zZXRDYWxjdWxhdG9yVHlwZSh0eXBlKTtcclxuICAgICAgICBpZihpbnB1dFZhbHVlcyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgLy8gc2V0IGlucHV0IGRhdGEgb2YgY2FsY3VsYXRpb25cclxuICAgICAgICAgIGxldCBjaGlsZHMgPSBjYWxjdWxhdGlvbi5nZXRJbnB1dENhbGN1bGF0aW9uRGF0YSgpO1xyXG4gICAgICAgICAgZm9yKGxldCBpID0wOyBpIDwgY2hpbGRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICBjYWxjdWxhdGlvbi5zZXRWYWx1ZShpLCBpbnB1dFZhbHVlc1tpXSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGV4aXN0aW5nU2VyaWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgIGxldCBvdXRwdXREYXRhID0gY2FsY3VsYXRpb24uZ2V0T3V0cHV0Q2FsY3VsYXRpb25EYXRhKCk7XHJcbiAgICAgICAgICBpZihvdXRwdXREYXRhLmxlbmd0aCA+IDApeyAvLyBUT0RPOiBJbXBsZW1lbnQgbXVsdGlPdXRwdXRcclxuXHJcbiAgICAgICAgICAgIC8vIEFkZCBuZXcgc2VyaWUgb2JqZWN0XHJcbiAgICAgICAgICAgIG91dHB1dERhdGFbMF0uc2VyaWUgPSBleGlzdGluZ1NlcmllO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2FsY3VsYXRpb247XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIHNlcmllIHRvIHRoaXMgc2VyaWUgY29udGFpbmVyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtCYXNlU2VyaWVzfSBzZXJpZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtpbmRleD0tMV0gIC0xIHRvIGFkZCBhdCB0aGUgZW5kLCBlbHNlIHRoZSBpbmRleCB3aGVyZSB0byBhZGRcclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZUNvbnRhaW5lclxyXG4gICAgICovXHJcbiAgICBhZGRTZXJpZShzZXJpZTogQmFzZVNlcmllcywgaW5kZXg6IG51bWJlciA9LTEpe1xyXG4gICAgICAgIGxldCBuZXdTZXJpZU5vZGUgPSBuZXcgU2VyaWVOb2RlKHVuZGVmaW5lZCwgPGFueT5zZXJpZSk7XHJcbiAgICAgICAgc3VwZXIuYWRkU2VyaWVOb2RlKG5ld1NlcmllTm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIGEgc2VyaWUgZnJvbSB0aGlzIHNlcmllIGNvbnRhaW5lclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVcclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZUNvbnRhaW5lclxyXG4gICAgICovXHJcbiAgICByZW1vdmVTZXJpZShzZXJpZTogQmFzZVNlcmllcyl7XHJcbiAgICAgICAgLy8gRm91bmQgc2VyaWUgd2l0aGluIHNlcmllbm9kZXNcclxuICAgICAgICBsZXQgc2VyaWVOb2RlOiBJU2VyaWVOb2RlfHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaSA8IHRoaXMuY2hpbGRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYodGhpcy5jaGlsZHNbaV0uc2VyaWUgPT0gc2VyaWUpe1xyXG4gICAgICAgICAgICAgICAgc2VyaWVOb2RlID0gdGhpcy5jaGlsZHNbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoc2VyaWVOb2RlICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHN1cGVyLnJlbW92ZVNlcmllTm9kZShzZXJpZU5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZSBhbGwgcmVmZXJlbmNlcyB0byB0aGUgZ2l2ZW4gc2VyaWUgd2l0aGluIHRoaXMgc2VyaWUgZ3JvdXAoZS5nLiByZWZlcmVuY2VzIGluIGNhbGN1bGF0aW9ucylcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyhCYXNlU2VyaWVzfHVuZGVmaW5lZCl9IHNlcmllXHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVHcm91cFxyXG4gICAgICovXHJcbiAgICByZW1vdmVSZWZlcmVuY2VzVG9TZXJpZU5vZGUoc2VyaWVOb2RlOiBJU2VyaWVOb2RlKXtcclxuICAgICAgICBpZighKHNlcmllTm9kZSBpbnN0YW5jZW9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YSkpe1xyXG4gICAgICAgICAgICAvLyBpbmZvcm0gYWxsIGNoaWxkIG5vZGVzKGNhbGN1bGF0aW9ucykgdGhhdCBhIHNlcmllIHdpbGwgYmUgcmVtb3ZlZCBmcm9tIHRoaXMgc2VyaWVHcm91cDsgb25seSBpbiBjYXNlIG9mXHJcbiAgICAgICAgICAgIC8vIHRoZSBzZXJpZU5vZGUgaXMgbm8gaW5wdXRTaWduYWwgb2YgYSBjYWxjdWxhdGlvblxyXG4gICAgICAgICAgICB0aGlzLmdldENoaWxkcygpLmZvckVhY2goY2hpbGQgPT57XHJcbiAgICAgICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbil7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNhbGN1bGF0aW9uID0gY2hpbGQgYXMgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlcmllTm9kZS5zZXJpZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdGlvbi5yZW1vdmVSZWZlcmVuY2VzVG9TZXJpZShzZXJpZU5vZGUuc2VyaWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYWtlcyBhIGNvcHkgb2YgdGhlIG9iamVjdCB3aXRoIGFsbCBzdWIgb2JqZWN0cyhlLmcuIHNlcmllcylcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7U2VyaWVHcm91cH1cclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZUdyb3VwXHJcbiAgICAgKi9cclxuICAgIGNsb25lKCk6IFNlcmllR3JvdXB7XHJcbiAgICAgICAgbGV0IHNlcmllR3JvdXAgPSBuZXcgU2VyaWVHcm91cCh0aGlzLm5hbWUsIHRoaXMuc3RhcnRUcmlnZ2VyVGltZSk7XHJcbiAgICAgICAgc2VyaWVHcm91cC5leHBhbmRTdGF0ZSA9IHRoaXMuZXhwYW5kU3RhdGU7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IHNlcmllTm9kZSA9IHRoaXMuY2hpbGRzW2ldO1xyXG4gICAgICAgICAgICBpZihzZXJpZU5vZGUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHNlcmllR3JvdXAuYWRkU2VyaWVOb2RlKHNlcmllTm9kZS5jbG9uZSgpLCAtMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHVwZGF0ZSBzZXJpZXMgYXQgaW5wdXQgY2FsY3VsYXRpb24gZGF0YSB3aXRoIGNsb25lZCBzZXJpZXMgZnJvbSBzZXJpZSBncm91cFxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzZXJpZUdyb3VwLmNoaWxkcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBjYWxjdWxhdGlvbk5vZGUgPSBzZXJpZUdyb3VwLmNoaWxkc1tpXTtcclxuICAgICAgICAgICAgaWYoY2FsY3VsYXRpb25Ob2RlIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uKXtcclxuICAgICAgICAgICAgICAgIGNhbGN1bGF0aW9uTm9kZS51cGRhdGVJbnB1dERhdGEoc2VyaWVHcm91cCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNlcmllR3JvdXA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBzZXJpZSB3aXRoIHRoZSBnaXZlbiBzZXJpZU5hbWUgd2l0aGluIHRoZSBzZXJpZSBncm91cFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZXJpZU5hbWVcclxuICAgICAqIEByZXR1cm5zIHsoQmFzZVNlcmllc3x1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllR3JvdXBcclxuICAgICAqL1xyXG4gICAgZ2V0U2VyaWUoc2VyaWVOYW1lOiBzdHJpbmcpOiBCYXNlU2VyaWVzfHVuZGVmaW5lZHtcclxuICAgICAgICBsZXQgc2VyaWVzID0gdGhpcy5nZXRTZXJpZXMoKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaSA8IHNlcmllcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmIChzZXJpZXNbaV0ubmFtZSA9PSBzZXJpZU5hbWUpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlcmllc1tpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNlcmllQnlPcmlnaW5hbE5hbWUob3JpZ2luYWxOYW1lOiBzdHJpbmcpOiBCYXNlU2VyaWVzfHVuZGVmaW5lZHtcclxuICAgICAgICBsZXQgc2VyaWVzID0gdGhpcy5nZXRTZXJpZXMoKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaSA8IHNlcmllcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmIChzZXJpZXNbaV0ub3JpZ2luYWxOYW1lID09IG9yaWdpbmFsTmFtZSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VyaWVzW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNZXJnZXMgdGhlIGluZm9ybWF0aW9uIG9mIGEgc2VyaWUgZ3JvdXAgdG8gYW4gZXhpc3Rpbmcgc2VyaWUgZ3JvdXBcclxuICAgICAqIEFkZHMgbmV3IHNlcmllczsgcmVtb3ZlcyBub3QgYXZhaWxhYmxlIHNlcmllczsgdXBkYXRlcyB0aGUgZGF0YSBvZiBleGlzdGluZyBzZXJpZXMoc2FtZSBzZXJpZSBuYW1lKVxyXG4gICAgICogQ2FsY3VsYXRpb25zIHdpbGwgYmUgaWdub3JlZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SVNlcmllR3JvdXB9IG5ld1NlcmllR3JvdXBcclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZUdyb3VwXHJcbiAgICAgKi9cclxuICAgIG1lcmdlV2l0aFNlcmllR3JvdXAobmV3U2VyaWVHcm91cDogSVNlcmllR3JvdXApe1xyXG4gICAgICAgIHRoaXMuc3RhcnRUcmlnZ2VyVGltZSA9IG5ld1NlcmllR3JvdXAuc3RhcnRUcmlnZ2VyVGltZTtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuZXdTZXJpZUdyb3VwLm5hbWU7XHJcbiAgICAgICAgLy8gUmVtb3ZlIHVudXNlZCBzZXJpZXMgKG9ubHkgaWYgbm90IGEgY2FsY3VsYXRpb24pXHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGkgPCB0aGlzLmNoaWxkcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgc2VyaWVOb2RlID0gdGhpcy5jaGlsZHNbaV07XHJcbiAgICAgICAgICAgIGxldCBzZXJpZU5vZGVOYW1lID0gc2VyaWVOb2RlLm5hbWU7XHJcbiAgICAgICAgICAgIGlmKHNlcmllTm9kZS5zZXJpZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgc2VyaWVOb2RlTmFtZSA9IHNlcmllTm9kZS5zZXJpZSEub3JpZ2luYWxOYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBmb3VuZFNlcmllTm9kZSA9IG5ld1NlcmllR3JvdXAuZ2V0U2VyaWVCeU9yaWdpbmFsTmFtZShzZXJpZU5vZGVOYW1lKTtcclxuICAgICAgICAgICAgaWYoZm91bmRTZXJpZU5vZGUgPT0gdW5kZWZpbmVkKXsgXHJcbiAgICAgICAgICAgICAgICBpZighKHNlcmllTm9kZSBpbnN0YW5jZW9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbikpeyAvLyBSZW1vdmUgb25seSBpZiBub3QgYSBjYWxjdWxhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlU2VyaWVOb2RlKHNlcmllTm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaS0tO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGVzIHRoZSBkYXRhIG9mIGFuIGV4aXN0aW5nIHNlcmllXHJcbiAgICAgICAgICAgICAgICBpZihzZXJpZU5vZGUuc2VyaWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICBzZXJpZU5vZGUuc2VyaWUudXBkYXRlUG9pbnRzKGZvdW5kU2VyaWVOb2RlLnJhd1BvaW50cyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hZGRTZXJpZXNGcm9tR3JvdXAobmV3U2VyaWVHcm91cClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgc2VyaWVzIGZyb20gdGhlIGdpdmVuIHNlcmllR3JvdXAgdG8gdGhpcyBzZXJpZUdyb3VwIGlmIG5vdCBhbHJlYWR5IHRoZXJlXHJcbiAgICAgKiBTaWduYWxzIHdpbGwgYmUgYWRkZWQgYmVmb3JlIHRoZSBmaXJzdCBjYWxjdWxhdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0lTZXJpZUdyb3VwfSBzZXJpZUdyb3VwXHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVHcm91cFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZFNlcmllc0Zyb21Hcm91cChzZXJpZUdyb3VwOiBJU2VyaWVHcm91cCl7XHJcbiAgICAgICAgLy8gYWRkIG5ldyBzZXJpZXMgYmVmb3JlIGNhbGN1bGF0aW9uc1xyXG4gICAgICAgIGxldCBmaXJzdENhbGN1bGF0aW9uSW5kZXggPSB0aGlzLmdldEZpcnN0Q2FsY3VsYXRpb25JbmRleCgpO1xyXG4gICAgICAgIGxldCBjaGlsZHMgPSBzZXJpZUdyb3VwLmdldENoaWxkcygpO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpIDwgY2hpbGRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgc2VyaWVOb2RlTmFtZSA9IGNoaWxkc1tpXS5uYW1lO1xyXG4gICAgICAgICAgICBpZihjaGlsZHNbaV0uc2VyaWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHNlcmllTm9kZU5hbWUgPSBjaGlsZHNbaV0uc2VyaWUhLm9yaWdpbmFsTmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgZm91bmRTZXJpZU5vZGUgPSB0aGlzLmdldFNlcmllQnlPcmlnaW5hbE5hbWUoc2VyaWVOb2RlTmFtZSk7XHJcbiAgICAgICAgICAgIGlmKGZvdW5kU2VyaWVOb2RlID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3U2VyaWVOb2RlID0gY2hpbGRzW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYobmV3U2VyaWVOb2RlICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRTZXJpZU5vZGUobmV3U2VyaWVOb2RlLCBmaXJzdENhbGN1bGF0aW9uSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGZpcnN0Q2FsY3VsYXRpb25JbmRleCAhPSAtMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0Q2FsY3VsYXRpb25JbmRleCsrOyBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgZmlyc3QgY2FsY3VsYXRpb24gaW4gdGhlIGNoaWxkcyBvZiB0aGlzIGdyb3VwXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVHcm91cFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldEZpcnN0Q2FsY3VsYXRpb25JbmRleCgpOiBudW1iZXJ7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRzLmxlbmd0aDsgaSArKyl7XHJcbiAgICAgICAgICAgIGxldCBjaGlsZCA9IHRoaXMuY2hpbGRzW2ldO1xyXG4gICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbil7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICB9XHJcblxyXG59Il19