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
define(["require", "exports", "../../../common/dateTimeHelper", "../../../common/persistence/settings", "../../signalManagerDataModel/signalManagerDataModelSettingIds", "./serieContainer", "./serieNode", "../../signalManagerDataModel/signalManagerCalculation", "../../signalManagerDataModel/signalManagerCalculationInputData", "../../signalManagerDataModel/signalCategory"], function (require, exports, dateTimeHelper_1, settings_1, signalManagerDataModelSettingIds_1, serieContainer_1, serieNode_1, signalManagerCalculation_1, signalManagerCalculationInputData_1, signalCategory_1) {
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
                var containerId = undefined;
                var containerExpandState = undefined;
                var expandState = this.expandState;
                if (this.parent != undefined && !(this.parent instanceof signalCategory_1.SignalCategory)) {
                    containerName = this.parent.name;
                    containerId = this.parent.id;
                    containerExpandState = this.parent.expandState;
                }
                settings.setValue(signalManagerDataModelSettingIds_1.SettingIds.ContainerName, containerName);
                settings.setValue(signalManagerDataModelSettingIds_1.SettingIds.ContainerExpandState, containerExpandState);
                settings.setValue(signalManagerDataModelSettingIds_1.SettingIds.SeriesIds, seriesIds);
                settings.setValue(signalManagerDataModelSettingIds_1.SettingIds.ContainerId, containerId);
                settings.setValue(signalManagerDataModelSettingIds_1.SettingIds.SerieGroupStartTriggerTime, this.startTriggerTime);
                settings.setValue(signalManagerDataModelSettingIds_1.SettingIds.ExpandState, expandState);
            }
            return settings;
        };
        SerieGroup.prototype.setSettings = function (settings) {
            var settingsObj = settings_1.Settings.create(settings);
            // Set name, startTriggerTime and expandState of group
            var startTriggerTime = settingsObj.getValue(signalManagerDataModelSettingIds_1.SettingIds.SerieGroupStartTriggerTime);
            this.name = dateTimeHelper_1.DateTimeHelper.getDateTime(startTriggerTime);
            this.id = settingsObj.getValue(signalManagerDataModelSettingIds_1.SettingIds.ContainerId);
            this._startTriggerTime = startTriggerTime;
            this.expandState = settingsObj.getValue(signalManagerDataModelSettingIds_1.SettingIds.ExpandState);
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
            var dataModel = this.getDataModel();
            if (dataModel != undefined && dataModel.seriesProvider != undefined) {
                // add series to group and calculations without input data (needed to have all )
                seriesIds.forEach(function (serieId) {
                    var foundSerie = dataModel.seriesProvider.get(serieId);
                    if (foundSerie != undefined) {
                        if (foundSerie.calculationDataInfo != undefined) {
                            if (foundSerie.calculationDataInfo.type != "") {
                                // set output series object
                                var newCalculation = _this.addCalculation(foundSerie.calculationDataInfo.type, foundSerie);
                                if (newCalculation != undefined) {
                                    calculations.set(foundSerie, newCalculation);
                                }
                                else {
                                    console.error("Calculator for given id not found! => " + foundSerie.calculationDataInfo.type);
                                }
                            }
                        }
                        else {
                            _this.addSerie(foundSerie);
                        }
                    }
                });
            }
            else {
                console.error("dataModel or dataModel.seriesProvider is undefined!");
            }
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
                    if (series.calculationDataInfo != undefined) {
                        // set input values
                        for (var i = 0; i < series.calculationDataInfo.inputDataIds.length; i++) {
                            signalManagerCalculation.setInputValueById(series.calculationDataInfo.inputDataIds[i], inputValues[i]);
                        }
                    }
                }
            });
        };
        /**
         * Adds a new calculation with the given type to this group
         *
         * @param {string} type
         * @param {(BaseSeries|undefined)} [existingSerie=undefined]
         * @returns {SignalManagerCalculation}
         * @memberof SerieGroup
         */
        SerieGroup.prototype.addCalculation = function (type, existingSerie) {
            if (existingSerie === void 0) { existingSerie = undefined; }
            // this serie is the output of a calculation => add calculation
            var dataModel = this.getDataModel();
            if (dataModel == undefined || dataModel.seriesProvider == undefined) {
                return undefined;
            }
            var calculation = new signalManagerCalculation_1.SignalManagerCalculation("Calculation", dataModel.seriesProvider);
            this.addSerieContainer(calculation, -1);
            // set calculationType
            calculation.setCalculatorTypeById(type);
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
            var listOfSeriesIdsToRemove = new Array();
            // update series at input calculation data with cloned series from serie group
            for (var i = 0; i < serieGroup.childs.length; i++) {
                var calculationNode = serieGroup.childs[i];
                if (calculationNode instanceof signalManagerCalculation_1.SignalManagerCalculation) {
                    var serieIdsToRemove = calculationNode.updateInputData(serieGroup);
                    // Add only serie ids which are not already in the list
                    var addToList = serieIdsToRemove.filter(function (item) { return listOfSeriesIdsToRemove.indexOf(item) < 0; });
                    listOfSeriesIdsToRemove = listOfSeriesIdsToRemove.concat(addToList);
                }
            }
            var dataModel = this.getDataModel();
            if (dataModel != undefined) {
                var seriesProvider_1 = dataModel.seriesProvider;
                if (seriesProvider_1 != undefined) {
                    // Remove cloned series input objects from series provider to avoid unused series objects
                    listOfSeriesIdsToRemove.forEach(function (seriesId) {
                        seriesProvider_1.remove(seriesId);
                    });
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
                        serieNode.serie.startTriggerTime = foundSerieNode.startTriggerTime;
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
                else {
                    //Delete old serieNode from serieProvider (as the new serieNode of serieGroup is used)
                    var dataModel = this.getDataModel();
                    dataModel.seriesProvider.remove(childs[i].serie.id);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWVHcm91cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbW1vbi9zaWduYWwvc2VyaWVHcm91cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBZUE7UUFBZ0MsOEJBQWM7UUFnQjFDOzs7OztXQUtHO1FBQ0gsb0JBQVksSUFBWSxFQUFFLGdCQUF3QixFQUFFLFdBQTJCO1lBQTNCLDRCQUFBLEVBQUEsa0JBQTJCO1lBQS9FLFlBQ0ksa0JBQU0sSUFBSSxFQUFFLEVBQUUsRUFBRSxXQUFXLENBQUMsU0FFL0I7WUF2QkQsa0JBQVksR0FBRyxJQUFJLENBQUM7WUFzQmhCLEtBQUksQ0FBQyxpQkFBaUIsR0FBRyxnQkFBZ0IsQ0FBQzs7UUFDOUMsQ0FBQztRQXBCRCxzQkFBVyx3Q0FBZ0I7aUJBQTNCO2dCQUNJLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO1lBQ2xDLENBQUM7aUJBQ0QsVUFBNEIsS0FBYTtnQkFDckMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztZQUNuQyxDQUFDOzs7V0FIQTtRQUtELHNCQUFXLDZCQUFLO2lCQUFoQjtnQkFDSSxPQUFPLFNBQVMsQ0FBQztZQUNyQixDQUFDOzs7V0FBQTtRQWFELGdDQUFXLEdBQVg7WUFDSSxJQUFJLFFBQVEsR0FBRyxJQUFJLG1CQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDMUMsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ3JDLElBQUcsYUFBYSxJQUFJLFNBQVMsRUFBQztnQkFDMUIsSUFBSSxTQUFTLEdBQWtCLElBQUksS0FBSyxFQUFVLENBQUM7Z0JBQ25ELEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO29CQUN6QyxTQUFTLENBQUMsSUFBSSxDQUFDLGFB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LFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7b0JBQ3BDLFNBQVUsQ0FBQyxjQUFlLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQzFEO2FBQ0o7UUFDTCxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ssNkNBQXdCLEdBQWhDO1lBQ0ksS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRyxFQUFDO2dCQUN4QyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixJQUFHLEtBQUssWUFBWSxtREFBd0IsRUFBQztvQkFDekMsT0FBTyxDQUFDLENBQUM7aUJBQ1o7YUFDSjtZQUNELE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDZCxDQUFDO1FBRUwsaUJBQUM7SUFBRCxDQUFDLEFBaFhELENBQWdDLCtCQUFjLEdBZ1g3QztJQWhYWSxnQ0FBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElTZXJpZUdyb3VwIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvc2VyaWVHcm91cEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJU2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BlcnNpc3RlbmNlL2ludGVyZmFjZXMvc2V0dGluZ3NJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVNlcmllTm9kZSB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3NlcmllTm9kZUludGVyZmFjZVwiO1xyXG5cclxuaW1wb3J0IHsgRGF0ZVRpbWVIZWxwZXIgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2RhdGVUaW1lSGVscGVyXCI7XHJcbmltcG9ydCB7IFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBTZXR0aW5nSWRzIH0gZnJvbSBcIi4uLy4uL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvc2lnbmFsTWFuYWdlckRhdGFNb2RlbFNldHRpbmdJZHNcIjtcclxuaW1wb3J0IHsgU2VyaWVDb250YWluZXIgfSBmcm9tIFwiLi9zZXJpZUNvbnRhaW5lclwiO1xyXG5pbXBvcnQgeyBTZXJpZU5vZGUgfSBmcm9tIFwiLi9zZXJpZU5vZGVcIjtcclxuaW1wb3J0IHsgQmFzZVNlcmllcyB9IGZyb20gXCIuLi8uLi9jaGFydE1hbmFnZXJEYXRhTW9kZWwvYmFzZVNlcmllc1wiO1xyXG5pbXBvcnQgeyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb24gfSBmcm9tIFwiLi4vLi4vc2lnbmFsTWFuYWdlckRhdGFNb2RlbC9zaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25cIjtcclxuaW1wb3J0IHsgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhIH0gZnJvbSBcIi4uLy4uL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvc2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhXCI7XHJcbmltcG9ydCB7IFNpZ25hbENhdGVnb3J5IH0gZnJvbSBcIi4uLy4uL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvc2lnbmFsQ2F0ZWdvcnlcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRvclByb3ZpZGVyIH0gZnJvbSBcIi4uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdG9yUHJvdmlkZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTZXJpZUdyb3VwIGV4dGVuZHMgU2VyaWVDb250YWluZXIgaW1wbGVtZW50cyBJU2VyaWVHcm91cHtcclxuICAgIFxyXG4gICAgaXNTZXJpZUdyb3VwID0gdHJ1ZTtcclxuXHJcbiAgICBwcml2YXRlIF9zdGFydFRyaWdnZXJUaW1lOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgZ2V0IHN0YXJ0VHJpZ2dlclRpbWUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3RhcnRUcmlnZ2VyVGltZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgc3RhcnRUcmlnZ2VyVGltZSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fc3RhcnRUcmlnZ2VyVGltZSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY29sb3IoKTogc3RyaW5nfHVuZGVmaW5lZCB7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgU2VyaWVHcm91cC5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc3RhcnRUcmlnZ2VyVGltZVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllR3JvdXBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBzdGFydFRyaWdnZXJUaW1lOiBudW1iZXIsIGV4cGFuZFN0YXRlOiBib29sZWFuID0gdHJ1ZSl7XHJcbiAgICAgICAgc3VwZXIobmFtZSwgXCJcIiwgZXhwYW5kU3RhdGUpO1xyXG4gICAgICAgIHRoaXMuX3N0YXJ0VHJpZ2dlclRpbWUgPSBzdGFydFRyaWdnZXJUaW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNldHRpbmdzKCk6IElTZXR0aW5nc3tcclxuICAgICAgICBsZXQgc2V0dGluZ3MgPSBuZXcgU2V0dGluZ3MoXCJTZXJpZUdyb3VwXCIpO1xyXG4gICAgICAgIGxldCBzZXJpZXNPZkdyb3VwID0gdGhpcy5nZXRTZXJpZXMoKTtcclxuICAgICAgICBpZihzZXJpZXNPZkdyb3VwICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGxldCBzZXJpZXNJZHM6IEFycmF5PHN0cmluZz4gPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2VyaWVzT2ZHcm91cC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBzZXJpZXNJZHMucHVzaChzZXJpZXNPZkdyb3VwW2ldLmlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgY29udGFpbmVyTmFtZTogc3RyaW5nfHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgbGV0IGNvbnRhaW5lcklkOiBzdHJpbmd8dW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBsZXQgY29udGFpbmVyRXhwYW5kU3RhdGU6IGJvb2xlYW58dW5kZWZpbmVkID0gdW5kZWZpbmVkOyBcclxuICAgICAgICAgICAgbGV0IGV4cGFuZFN0YXRlOiBib29sZWFuID0gdGhpcy5leHBhbmRTdGF0ZTtcclxuXHJcbiAgICAgICAgICAgIGlmKHRoaXMucGFyZW50ICE9IHVuZGVmaW5lZCAmJiAhKHRoaXMucGFyZW50IGluc3RhbmNlb2YgU2lnbmFsQ2F0ZWdvcnkpKXtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lck5hbWUgPSB0aGlzLnBhcmVudC5uYW1lO1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVySWQgPSB0aGlzLnBhcmVudC5pZDtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lckV4cGFuZFN0YXRlID0gdGhpcy5wYXJlbnQuZXhwYW5kU3RhdGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHNldHRpbmdzLnNldFZhbHVlKFNldHRpbmdJZHMuQ29udGFpbmVyTmFtZSwgY29udGFpbmVyTmFtZSk7XHJcbiAgICAgICAgICAgIHNldHRpbmdzLnNldFZhbHVlKFNldHRpbmdJZHMuQ29udGFpbmVyRXhwYW5kU3RhdGUsIGNvbnRhaW5lckV4cGFuZFN0YXRlKTtcclxuICAgICAgICAgICAgc2V0dGluZ3Muc2V0VmFsdWUoU2V0dGluZ0lkcy5TZXJpZXNJZHMsIHNlcmllc0lkcyk7XHJcbiAgICAgICAgICAgIHNldHRpbmdzLnNldFZhbHVlKFNldHRpbmdJZHMuQ29udGFpbmVySWQsIGNvbnRhaW5lcklkKTtcclxuICAgICAgICAgICAgc2V0dGluZ3Muc2V0VmFsdWUoU2V0dGluZ0lkcy5TZXJpZUdyb3VwU3RhcnRUcmlnZ2VyVGltZSwgdGhpcy5zdGFydFRyaWdnZXJUaW1lKTtcclxuICAgICAgICAgICAgc2V0dGluZ3Muc2V0VmFsdWUoU2V0dGluZ0lkcy5FeHBhbmRTdGF0ZSwgZXhwYW5kU3RhdGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2V0dGluZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U2V0dGluZ3Moc2V0dGluZ3M6IElTZXR0aW5ncyl7XHJcbiAgICAgICAgbGV0IHNldHRpbmdzT2JqID0gU2V0dGluZ3MuY3JlYXRlKHNldHRpbmdzKTtcclxuICAgICAgICAvLyBTZXQgbmFtZSwgc3RhcnRUcmlnZ2VyVGltZSBhbmQgZXhwYW5kU3RhdGUgb2YgZ3JvdXBcclxuICAgICAgICBsZXQgc3RhcnRUcmlnZ2VyVGltZSA9IHNldHRpbmdzT2JqLmdldFZhbHVlKFNldHRpbmdJZHMuU2VyaWVHcm91cFN0YXJ0VHJpZ2dlclRpbWUpO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IERhdGVUaW1lSGVscGVyLmdldERhdGVUaW1lKHN0YXJ0VHJpZ2dlclRpbWUpO1xyXG4gICAgICAgIHRoaXMuaWQgPSBzZXR0aW5nc09iai5nZXRWYWx1ZShTZXR0aW5nSWRzLkNvbnRhaW5lcklkKTtcclxuICAgICAgICB0aGlzLl9zdGFydFRyaWdnZXJUaW1lID0gc3RhcnRUcmlnZ2VyVGltZTtcclxuICAgICAgICB0aGlzLmV4cGFuZFN0YXRlID0gc2V0dGluZ3NPYmouZ2V0VmFsdWUoU2V0dGluZ0lkcy5FeHBhbmRTdGF0ZSk7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkU2VyaWVJZHNGcm9tU2VyaWVQcm92aWRlclRvR3JvdXAoc2V0dGluZ3NPYmouZ2V0VmFsdWUoU2V0dGluZ0lkcy5TZXJpZXNJZHMpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgdGhlIHNlcmllcyBmb3IgdGhlIGdpdmVuIHNlcmllc0lkcyB0byB0aGlzIGdyb3VwXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gc2VyaWVzSWRzXHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVHcm91cFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZFNlcmllSWRzRnJvbVNlcmllUHJvdmlkZXJUb0dyb3VwKHNlcmllc0lkczogQXJyYXk8c3RyaW5nPil7XHJcbiAgICAgICAgbGV0IGNhbGN1bGF0aW9ucyA9IG5ldyBNYXA8QmFzZVNlcmllcyxTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb24+KCk7XHJcbiAgICAgICAgbGV0IGRhdGFNb2RlbCA9IHRoaXMuZ2V0RGF0YU1vZGVsKCk7XHJcbiAgICAgICAgaWYoZGF0YU1vZGVsICE9IHVuZGVmaW5lZCAmJiBkYXRhTW9kZWwhLnNlcmllc1Byb3ZpZGVyICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIGFkZCBzZXJpZXMgdG8gZ3JvdXAgYW5kIGNhbGN1bGF0aW9ucyB3aXRob3V0IGlucHV0IGRhdGEgKG5lZWRlZCB0byBoYXZlIGFsbCApXHJcbiAgICAgICAgICAgIHNlcmllc0lkcy5mb3JFYWNoKHNlcmllSWQgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZm91bmRTZXJpZSA9IGRhdGFNb2RlbCEuc2VyaWVzUHJvdmlkZXIhLmdldChzZXJpZUlkKTtcclxuICAgICAgICAgICAgaWYoZm91bmRTZXJpZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgaWYoZm91bmRTZXJpZS5jYWxjdWxhdGlvbkRhdGFJbmZvICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZm91bmRTZXJpZS5jYWxjdWxhdGlvbkRhdGFJbmZvLnR5cGUgIT0gXCJcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNldCBvdXRwdXQgc2VyaWVzIG9iamVjdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3Q2FsY3VsYXRpb24gPSB0aGlzLmFkZENhbGN1bGF0aW9uKGZvdW5kU2VyaWUuY2FsY3VsYXRpb25EYXRhSW5mby50eXBlLCBmb3VuZFNlcmllKTsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG5ld0NhbGN1bGF0aW9uICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdGlvbnMuc2V0KGZvdW5kU2VyaWUsIG5ld0NhbGN1bGF0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkNhbGN1bGF0b3IgZm9yIGdpdmVuIGlkIG5vdCBmb3VuZCEgPT4gXCIgKyBmb3VuZFNlcmllLmNhbGN1bGF0aW9uRGF0YUluZm8udHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkU2VyaWUoZm91bmRTZXJpZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7IFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiZGF0YU1vZGVsIG9yIGRhdGFNb2RlbC5zZXJpZXNQcm92aWRlciBpcyB1bmRlZmluZWQhXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gc2V0IGlucHV0IGRhdGEgb2YgY2FsY3VsYXRpb25zXHJcbiAgICAgICAgY2FsY3VsYXRpb25zLmZvckVhY2goKHNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbiwgc2VyaWVzKSA9PiB7XHJcbiAgICAgICAgICBpZihzZXJpZXMgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gZ2V0IGlucHV0IHZhbHVlc1xyXG4gICAgICAgICAgICBsZXQgaW5wdXRWYWx1ZXMgPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xyXG4gICAgICAgICAgICBpZihzZXJpZXMuY2FsY3VsYXRpb25EYXRhSW5mbyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0wOyBpIDwgc2VyaWVzLmNhbGN1bGF0aW9uRGF0YUluZm8uaW5wdXREYXRhVmFsdWVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dFZhbHVlcy5wdXNoKHNlcmllcy5jYWxjdWxhdGlvbkRhdGFJbmZvLmlucHV0RGF0YVZhbHVlc1tpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChzZXJpZXMuY2FsY3VsYXRpb25EYXRhSW5mbyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgLy8gc2V0IGlucHV0IHZhbHVlc1xyXG4gICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlcmllcy5jYWxjdWxhdGlvbkRhdGFJbmZvLmlucHV0RGF0YUlkcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgc2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uLnNldElucHV0VmFsdWVCeUlkKHNlcmllcy5jYWxjdWxhdGlvbkRhdGFJbmZvLmlucHV0RGF0YUlkc1tpXSwgaW5wdXRWYWx1ZXNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICBcclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIG5ldyBjYWxjdWxhdGlvbiB3aXRoIHRoZSBnaXZlbiB0eXBlIHRvIHRoaXMgZ3JvdXBcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxyXG4gICAgICogQHBhcmFtIHsoQmFzZVNlcmllc3x1bmRlZmluZWQpfSBbZXhpc3RpbmdTZXJpZT11bmRlZmluZWRdXHJcbiAgICAgKiBAcmV0dXJucyB7U2lnbmFsTWFuYWdlckNhbGN1bGF0aW9ufVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllR3JvdXBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRDYWxjdWxhdGlvbih0eXBlOiBzdHJpbmcsIGV4aXN0aW5nU2VyaWU6IEJhc2VTZXJpZXN8dW5kZWZpbmVkID0gdW5kZWZpbmVkKTogU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9ufHVuZGVmaW5lZHtcclxuICAgICAgICAvLyB0aGlzIHNlcmllIGlzIHRoZSBvdXRwdXQgb2YgYSBjYWxjdWxhdGlvbiA9PiBhZGQgY2FsY3VsYXRpb25cclxuICAgICAgICBsZXQgZGF0YU1vZGVsID0gdGhpcy5nZXREYXRhTW9kZWwoKTtcclxuICAgICAgICBpZihkYXRhTW9kZWwgPT0gdW5kZWZpbmVkIHx8IGRhdGFNb2RlbC5zZXJpZXNQcm92aWRlciA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY2FsY3VsYXRpb24gPSBuZXcgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uKFwiQ2FsY3VsYXRpb25cIiwgZGF0YU1vZGVsLnNlcmllc1Byb3ZpZGVyKTtcclxuICAgICAgICB0aGlzLmFkZFNlcmllQ29udGFpbmVyKGNhbGN1bGF0aW9uLCAtMSk7XHJcbiAgICAgICAgLy8gc2V0IGNhbGN1bGF0aW9uVHlwZVxyXG4gICAgICAgIGNhbGN1bGF0aW9uLnNldENhbGN1bGF0b3JUeXBlQnlJZCh0eXBlKTtcclxuICAgICAgICBpZihleGlzdGluZ1NlcmllICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICBsZXQgb3V0cHV0RGF0YSA9IGNhbGN1bGF0aW9uLmdldE91dHB1dENhbGN1bGF0aW9uRGF0YSgpO1xyXG4gICAgICAgICAgaWYob3V0cHV0RGF0YS5sZW5ndGggPiAwKXsgLy8gVE9ETzogSW1wbGVtZW50IG11bHRpT3V0cHV0XHJcblxyXG4gICAgICAgICAgICAvLyBBZGQgbmV3IHNlcmllIG9iamVjdFxyXG4gICAgICAgICAgICBvdXRwdXREYXRhWzBdLnNlcmllID0gZXhpc3RpbmdTZXJpZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNhbGN1bGF0aW9uO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBzZXJpZSB0byB0aGlzIHNlcmllIGNvbnRhaW5lclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbaW5kZXg9LTFdICAtMSB0byBhZGQgYXQgdGhlIGVuZCwgZWxzZSB0aGUgaW5kZXggd2hlcmUgdG8gYWRkXHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVDb250YWluZXJcclxuICAgICAqL1xyXG4gICAgYWRkU2VyaWUoc2VyaWU6IEJhc2VTZXJpZXMsIGluZGV4OiBudW1iZXIgPS0xKXtcclxuICAgICAgICBsZXQgbmV3U2VyaWVOb2RlID0gbmV3IFNlcmllTm9kZSh1bmRlZmluZWQsIDxhbnk+c2VyaWUpO1xyXG4gICAgICAgIHN1cGVyLmFkZFNlcmllTm9kZShuZXdTZXJpZU5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyBhIHNlcmllIGZyb20gdGhpcyBzZXJpZSBjb250YWluZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNlcmllXHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVDb250YWluZXJcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlU2VyaWUoc2VyaWU6IEJhc2VTZXJpZXMpe1xyXG4gICAgICAgIC8vIEZvdW5kIHNlcmllIHdpdGhpbiBzZXJpZW5vZGVzXHJcbiAgICAgICAgbGV0IHNlcmllTm9kZTogSVNlcmllTm9kZXx1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGkgPCB0aGlzLmNoaWxkcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuY2hpbGRzW2ldLnNlcmllID09IHNlcmllKXtcclxuICAgICAgICAgICAgICAgIHNlcmllTm9kZSA9IHRoaXMuY2hpbGRzW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHNlcmllTm9kZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBzdXBlci5yZW1vdmVTZXJpZU5vZGUoc2VyaWVOb2RlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmUgYWxsIHJlZmVyZW5jZXMgdG8gdGhlIGdpdmVuIHNlcmllIHdpdGhpbiB0aGlzIHNlcmllIGdyb3VwKGUuZy4gcmVmZXJlbmNlcyBpbiBjYWxjdWxhdGlvbnMpXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsoQmFzZVNlcmllc3x1bmRlZmluZWQpfSBzZXJpZVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllR3JvdXBcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlUmVmZXJlbmNlc1RvU2VyaWVOb2RlKHNlcmllTm9kZTogSVNlcmllTm9kZSl7XHJcbiAgICAgICAgaWYoIShzZXJpZU5vZGUgaW5zdGFuY2VvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGEpKXtcclxuICAgICAgICAgICAgLy8gaW5mb3JtIGFsbCBjaGlsZCBub2RlcyhjYWxjdWxhdGlvbnMpIHRoYXQgYSBzZXJpZSB3aWxsIGJlIHJlbW92ZWQgZnJvbSB0aGlzIHNlcmllR3JvdXA7IG9ubHkgaW4gY2FzZSBvZlxyXG4gICAgICAgICAgICAvLyB0aGUgc2VyaWVOb2RlIGlzIG5vIGlucHV0U2lnbmFsIG9mIGEgY2FsY3VsYXRpb25cclxuICAgICAgICAgICAgdGhpcy5nZXRDaGlsZHMoKS5mb3JFYWNoKGNoaWxkID0+e1xyXG4gICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb24pe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjYWxjdWxhdGlvbiA9IGNoaWxkIGFzIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICBpZihzZXJpZU5vZGUuc2VyaWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsY3VsYXRpb24ucmVtb3ZlUmVmZXJlbmNlc1RvU2VyaWUoc2VyaWVOb2RlLnNlcmllKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFrZXMgYSBjb3B5IG9mIHRoZSBvYmplY3Qgd2l0aCBhbGwgc3ViIG9iamVjdHMoZS5nLiBzZXJpZXMpXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge1NlcmllR3JvdXB9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVHcm91cFxyXG4gICAgICovXHJcbiAgICBjbG9uZSgpOiBTZXJpZUdyb3Vwe1xyXG4gICAgICAgIGxldCBzZXJpZUdyb3VwID0gbmV3IFNlcmllR3JvdXAodGhpcy5uYW1lLCB0aGlzLnN0YXJ0VHJpZ2dlclRpbWUpO1xyXG4gICAgICAgIHNlcmllR3JvdXAuZXhwYW5kU3RhdGUgPSB0aGlzLmV4cGFuZFN0YXRlO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBzZXJpZU5vZGUgPSB0aGlzLmNoaWxkc1tpXTtcclxuICAgICAgICAgICAgaWYoc2VyaWVOb2RlICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBzZXJpZUdyb3VwLmFkZFNlcmllTm9kZShzZXJpZU5vZGUuY2xvbmUoKSwgLTEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbGlzdE9mU2VyaWVzSWRzVG9SZW1vdmU6IEFycmF5PHN0cmluZz4gPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xyXG4gICAgICAgIC8vIHVwZGF0ZSBzZXJpZXMgYXQgaW5wdXQgY2FsY3VsYXRpb24gZGF0YSB3aXRoIGNsb25lZCBzZXJpZXMgZnJvbSBzZXJpZSBncm91cFxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzZXJpZUdyb3VwLmNoaWxkcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBjYWxjdWxhdGlvbk5vZGUgPSBzZXJpZUdyb3VwLmNoaWxkc1tpXTtcclxuICAgICAgICAgICAgaWYoY2FsY3VsYXRpb25Ob2RlIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uKXtcclxuICAgICAgICAgICAgICAgIGxldCBzZXJpZUlkc1RvUmVtb3ZlID0gY2FsY3VsYXRpb25Ob2RlLnVwZGF0ZUlucHV0RGF0YShzZXJpZUdyb3VwKTtcclxuICAgICAgICAgICAgICAgIC8vIEFkZCBvbmx5IHNlcmllIGlkcyB3aGljaCBhcmUgbm90IGFscmVhZHkgaW4gdGhlIGxpc3RcclxuICAgICAgICAgICAgICAgIGxldCBhZGRUb0xpc3QgPSBzZXJpZUlkc1RvUmVtb3ZlLmZpbHRlcigoaXRlbSkgPT4gbGlzdE9mU2VyaWVzSWRzVG9SZW1vdmUuaW5kZXhPZihpdGVtKSA8IDApO1xyXG4gICAgICAgICAgICAgICAgbGlzdE9mU2VyaWVzSWRzVG9SZW1vdmUgPSBsaXN0T2ZTZXJpZXNJZHNUb1JlbW92ZS5jb25jYXQoYWRkVG9MaXN0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGRhdGFNb2RlbCA9IHRoaXMuZ2V0RGF0YU1vZGVsKCk7XHJcbiAgICAgICAgaWYoZGF0YU1vZGVsICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGxldCBzZXJpZXNQcm92aWRlciA9IGRhdGFNb2RlbC5zZXJpZXNQcm92aWRlcjtcclxuICAgICAgICAgICAgaWYoc2VyaWVzUHJvdmlkZXIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBjbG9uZWQgc2VyaWVzIGlucHV0IG9iamVjdHMgZnJvbSBzZXJpZXMgcHJvdmlkZXIgdG8gYXZvaWQgdW51c2VkIHNlcmllcyBvYmplY3RzXHJcbiAgICAgICAgICAgICAgICBsaXN0T2ZTZXJpZXNJZHNUb1JlbW92ZS5mb3JFYWNoKHNlcmllc0lkID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzZXJpZXNQcm92aWRlciEucmVtb3ZlKHNlcmllc0lkKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc2VyaWVHcm91cDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHNlcmllIHdpdGggdGhlIGdpdmVuIHNlcmllTmFtZSB3aXRoaW4gdGhlIHNlcmllIGdyb3VwXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlcmllTmFtZVxyXG4gICAgICogQHJldHVybnMgeyhCYXNlU2VyaWVzfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVHcm91cFxyXG4gICAgICovXHJcbiAgICBnZXRTZXJpZShzZXJpZU5hbWU6IHN0cmluZyk6IEJhc2VTZXJpZXN8dW5kZWZpbmVke1xyXG4gICAgICAgIGxldCBzZXJpZXMgPSB0aGlzLmdldFNlcmllcygpO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpIDwgc2VyaWVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYgKHNlcmllc1tpXS5uYW1lID09IHNlcmllTmFtZSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VyaWVzW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2VyaWVCeU9yaWdpbmFsTmFtZShvcmlnaW5hbE5hbWU6IHN0cmluZyk6IEJhc2VTZXJpZXN8dW5kZWZpbmVke1xyXG4gICAgICAgIGxldCBzZXJpZXMgPSB0aGlzLmdldFNlcmllcygpO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpIDwgc2VyaWVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYgKHNlcmllc1tpXS5vcmlnaW5hbE5hbWUgPT0gb3JpZ2luYWxOYW1lKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzZXJpZXNbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1lcmdlcyB0aGUgaW5mb3JtYXRpb24gb2YgYSBzZXJpZSBncm91cCB0byBhbiBleGlzdGluZyBzZXJpZSBncm91cFxyXG4gICAgICogQWRkcyBuZXcgc2VyaWVzOyByZW1vdmVzIG5vdCBhdmFpbGFibGUgc2VyaWVzOyB1cGRhdGVzIHRoZSBkYXRhIG9mIGV4aXN0aW5nIHNlcmllcyhzYW1lIHNlcmllIG5hbWUpXHJcbiAgICAgKiBDYWxjdWxhdGlvbnMgd2lsbCBiZSBpZ25vcmVkXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJU2VyaWVHcm91cH0gbmV3U2VyaWVHcm91cFxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllR3JvdXBcclxuICAgICAqL1xyXG4gICAgbWVyZ2VXaXRoU2VyaWVHcm91cChuZXdTZXJpZUdyb3VwOiBJU2VyaWVHcm91cCl7XHJcbiAgICAgICAgdGhpcy5zdGFydFRyaWdnZXJUaW1lID0gbmV3U2VyaWVHcm91cC5zdGFydFRyaWdnZXJUaW1lO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5ld1NlcmllR3JvdXAubmFtZTtcclxuICAgICAgICAvLyBSZW1vdmUgdW51c2VkIHNlcmllcyAob25seSBpZiBub3QgYSBjYWxjdWxhdGlvbilcclxuICAgICAgICBmb3IobGV0IGk9MDsgaSA8IHRoaXMuY2hpbGRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBzZXJpZU5vZGUgPSB0aGlzLmNoaWxkc1tpXTtcclxuICAgICAgICAgICAgbGV0IHNlcmllTm9kZU5hbWUgPSBzZXJpZU5vZGUubmFtZTtcclxuICAgICAgICAgICAgaWYoc2VyaWVOb2RlLnNlcmllICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBzZXJpZU5vZGVOYW1lID0gc2VyaWVOb2RlLnNlcmllIS5vcmlnaW5hbE5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGZvdW5kU2VyaWVOb2RlID0gbmV3U2VyaWVHcm91cC5nZXRTZXJpZUJ5T3JpZ2luYWxOYW1lKHNlcmllTm9kZU5hbWUpO1xyXG4gICAgICAgICAgICBpZihmb3VuZFNlcmllTm9kZSA9PSB1bmRlZmluZWQpeyBcclxuICAgICAgICAgICAgICAgIGlmKCEoc2VyaWVOb2RlIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uKSl7IC8vIFJlbW92ZSBvbmx5IGlmIG5vdCBhIGNhbGN1bGF0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVTZXJpZU5vZGUoc2VyaWVOb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICBpLS07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZXMgdGhlIGRhdGEgb2YgYW4gZXhpc3Rpbmcgc2VyaWVcclxuICAgICAgICAgICAgICAgIGlmKHNlcmllTm9kZS5zZXJpZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHNlcmllTm9kZS5zZXJpZS51cGRhdGVQb2ludHMoZm91bmRTZXJpZU5vZGUucmF3UG9pbnRzKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXJpZU5vZGUuc2VyaWUuc3RhcnRUcmlnZ2VyVGltZSA9IGZvdW5kU2VyaWVOb2RlLnN0YXJ0VHJpZ2dlclRpbWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hZGRTZXJpZXNGcm9tR3JvdXAobmV3U2VyaWVHcm91cClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgc2VyaWVzIGZyb20gdGhlIGdpdmVuIHNlcmllR3JvdXAgdG8gdGhpcyBzZXJpZUdyb3VwIGlmIG5vdCBhbHJlYWR5IHRoZXJlXHJcbiAgICAgKiBTaWduYWxzIHdpbGwgYmUgYWRkZWQgYmVmb3JlIHRoZSBmaXJzdCBjYWxjdWxhdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0lTZXJpZUdyb3VwfSBzZXJpZUdyb3VwXHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVHcm91cFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZFNlcmllc0Zyb21Hcm91cChzZXJpZUdyb3VwOiBJU2VyaWVHcm91cCl7XHJcbiAgICAgICAgLy8gYWRkIG5ldyBzZXJpZXMgYmVmb3JlIGNhbGN1bGF0aW9uc1xyXG4gICAgICAgIGxldCBmaXJzdENhbGN1bGF0aW9uSW5kZXggPSB0aGlzLmdldEZpcnN0Q2FsY3VsYXRpb25JbmRleCgpO1xyXG4gICAgICAgIGxldCBjaGlsZHMgPSBzZXJpZUdyb3VwLmdldENoaWxkcygpO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpIDwgY2hpbGRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgc2VyaWVOb2RlTmFtZSA9IGNoaWxkc1tpXS5uYW1lO1xyXG4gICAgICAgICAgICBpZihjaGlsZHNbaV0uc2VyaWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHNlcmllTm9kZU5hbWUgPSBjaGlsZHNbaV0uc2VyaWUhLm9yaWdpbmFsTmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgZm91bmRTZXJpZU5vZGUgPSB0aGlzLmdldFNlcmllQnlPcmlnaW5hbE5hbWUoc2VyaWVOb2RlTmFtZSk7XHJcbiAgICAgICAgICAgIGlmKGZvdW5kU2VyaWVOb2RlID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3U2VyaWVOb2RlID0gY2hpbGRzW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYobmV3U2VyaWVOb2RlICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRTZXJpZU5vZGUobmV3U2VyaWVOb2RlLCBmaXJzdENhbGN1bGF0aW9uSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGZpcnN0Q2FsY3VsYXRpb25JbmRleCAhPSAtMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0Q2FsY3VsYXRpb25JbmRleCsrOyBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvL0RlbGV0ZSBvbGQgc2VyaWVOb2RlIGZyb20gc2VyaWVQcm92aWRlciAoYXMgdGhlIG5ldyBzZXJpZU5vZGUgb2Ygc2VyaWVHcm91cCBpcyB1c2VkKVxyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGFNb2RlbCA9IHRoaXMuZ2V0RGF0YU1vZGVsKCk7XHJcbiAgICAgICAgICAgICAgICBkYXRhTW9kZWwhLnNlcmllc1Byb3ZpZGVyIS5yZW1vdmUoY2hpbGRzW2ldLnNlcmllIS5pZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgZmlyc3QgY2FsY3VsYXRpb24gaW4gdGhlIGNoaWxkcyBvZiB0aGlzIGdyb3VwXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVHcm91cFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldEZpcnN0Q2FsY3VsYXRpb25JbmRleCgpOiBudW1iZXJ7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRzLmxlbmd0aDsgaSArKyl7XHJcbiAgICAgICAgICAgIGxldCBjaGlsZCA9IHRoaXMuY2hpbGRzW2ldO1xyXG4gICAgICAgICAgICBpZihjaGlsZCBpbnN0YW5jZW9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbil7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICB9XHJcblxyXG59Il19