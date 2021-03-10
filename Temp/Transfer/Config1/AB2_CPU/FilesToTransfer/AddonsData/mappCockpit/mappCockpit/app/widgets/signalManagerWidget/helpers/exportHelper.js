define(["require", "exports", "../../../common/exportSerieGroup", "../../../models/common/signal/serieGroup", "../../../models/signalManagerDataModel/signalManagerCalculation", "../../../models/signalManagerDataModel/signalManagerCalculationInputData", "../../../models/signalManagerDataModel/signalManagerCalculationOutputData", "../../../models/chartManagerDataModel/seriesType", "../../../models/signalManagerDataModel/signalCategory"], function (require, exports, exportSerieGroup_1, serieGroup_1, signalManagerCalculation_1, signalManagerCalculationInputData_1, signalManagerCalculationOutputData_1, seriesType_1, signalCategory_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ExportHelper = /** @class */ (function () {
        function ExportHelper() {
        }
        /**
         * Returns array of exportSerieGroup elements
         *
         * @param {*} elements
         * @returns {Array<ExportSerieGroup>}
         * @memberof ExportHelper
         */
        ExportHelper.prototype.getExportableElements = function (elements) {
            var serieGroups = new Array();
            var items = new Array();
            var groupElements = new Array();
            var signalCalculations = new Array();
            var signalInputCalculations = new Array();
            var signalOutputCalculations = new Array();
            //delete not exportable items
            for (var i = 0; i < elements.length; i++) {
                if (!this.isElementExportable(elements[i].item)) {
                    elements.splice(i, 1);
                    i = -1;
                }
            }
            //Classify selected elements into arrays according to its type 
            for (var i = 0; i < elements.length; i++) {
                items.push(elements[i].item);
                //Put all signalCalculations selected into an array for later checks
                if (elements[i].item instanceof signalManagerCalculation_1.SignalManagerCalculation) {
                    signalCalculations.push(elements[i].item);
                }
                //Put all signalInputCalculations selected into an array for later checks
                else if (elements[i].item instanceof signalManagerCalculationInputData_1.SignalManagerCalculationInputData) {
                    if (!this.isSignalRepeated(signalInputCalculations, elements[i].item.serie)) {
                        signalInputCalculations.push(elements[i].item);
                    }
                    else {
                        var index = items.indexOf(elements[i].item);
                        items.splice(index, 1);
                    }
                }
                //Put all signalOuputCalculations selected into an array for later
                else if (elements[i].item instanceof signalManagerCalculationOutputData_1.SignalManagerCalculationOutputData) {
                    signalOutputCalculations.push(elements[i].item);
                }
                else if (elements[i].item instanceof serieGroup_1.SerieGroup) {
                    //Put all seriegroups selected into an array
                    var serieGroup = elements[i].item;
                    serieGroups.push(serieGroup);
                    //Convert selected Seriegroups to exportSerieGroups
                    if (serieGroup.getChilds()[0] != undefined) {
                        groupElements.push(new exportSerieGroup_1.ExportSerieGroup(serieGroup.name, serieGroup.startTriggerTime, elements[i].item.childs[0].serie));
                        for (var j = 1; j < serieGroup.getChilds().length; j++) {
                            if (serieGroup.getChilds()[j].serie != undefined && serieGroup.getChilds()[j].serie.rawPointsValid == true) {
                                var index = groupElements.length - 1;
                                groupElements[index].addSerie(serieGroup.getChilds()[j].serie);
                            }
                        }
                    }
                }
            }
            this.filterSelectedItems(items, serieGroups, signalCalculations, signalInputCalculations, signalOutputCalculations, groupElements);
            return groupElements;
        };
        /**
         * Delete duplicated series, invalid series or not need it
         *
         * @private
         * @param {Array<any>} items
         * @param {Array<SerieGroup>} serieGroups
         * @param {Array<SignalManagerCalculation>} signalCalculations
         * @param {Array<SignalManagerCalculationInputData>} signalInputCalculations
         * @param {Array<SignalManagerCalculationOutputData>} signalOutputCalculations
         * @memberof ExportHelper
         */
        ExportHelper.prototype.filterSelectedItems = function (items, serieGroups, signalCalculations, signalInputCalculations, signalOutputCalculations, groupElements) {
            //delete selected rows if its SerieGroup is also selected. 
            for (var i = 0; i < items.length; i++) {
                for (var j = 0; j < serieGroups.length; j++) {
                    if (!(items[i] instanceof serieGroup_1.SerieGroup) && items[i].getSerieGroup() == serieGroups[j]) {
                        //delete same element in alll arrays
                        var index = signalCalculations.indexOf(items[i]);
                        signalCalculations.splice(index, 1);
                        index = signalInputCalculations.indexOf(items[i]);
                        signalInputCalculations.splice(index, 1);
                        index = signalOutputCalculations.indexOf(items[i]);
                        signalOutputCalculations.splice(index, 1);
                        items.splice(i, 1);
                        i = -1;
                        break;
                    }
                }
            }
            //delete selected CalculationOutput if its CalculationData is also selected. 
            for (var i = 0; i < signalOutputCalculations.length; i++) {
                if (this.isSignalRepeated(signalCalculations, signalOutputCalculations[i].serie)) {
                    var index = items.indexOf(signalOutputCalculations[i]);
                    signalOutputCalculations.splice(i, 1);
                    items.splice(index, 1);
                    i = -1;
                }
            }
            //add input calculation data if calculation is selected
            for (var i = 0; i < signalCalculations.length; i++) {
                var inputSeries = signalCalculations[i].getInputCalculationData();
                if (signalCalculations[i].getOutputCalculationData()[0].serie.type != seriesType_1.SeriesType.timeSeries) { //Momentary solution. Next step: Export the whole YT formula
                    this.addInputElements(items, inputSeries);
                }
            }
            //add input calculation data if ouput calculation is selected 
            for (var i = 0; i < signalOutputCalculations.length; i++) {
                var calculation = signalOutputCalculations[i].parent.parent;
                var inputSeries = calculation.getInputCalculationData();
                if (signalOutputCalculations[i].serie.type != seriesType_1.SeriesType.timeSeries) { //Momentary solution. Next step: Export the whole YT formula
                    this.addInputElements(items, inputSeries);
                }
            }
            //delete repeated selected series (serie + same serie in input calculation)
            for (var i = 0; i < items.length; i++) {
                if (!(items[i] instanceof signalManagerCalculationInputData_1.SignalManagerCalculationInputData) && this.isSignalRepeated(signalInputCalculations, items[i].serie)) {
                    items.splice(i, 1);
                    i = -1;
                }
            }
            //create exportSerieGroups with the selected rows
            for (var i = 0; i < items.length; i++) {
                if (!(items[i] instanceof serieGroup_1.SerieGroup)) {
                    var parent_1 = items[i].getSerieGroup();
                    var newGroup = true;
                    for (var j = 0; j < groupElements.length; j++) {
                        if (parent_1.startTriggerTime == groupElements[j].startTriggerTime) {
                            newGroup = false;
                            groupElements[j].addSerie(items[i].serie);
                        }
                    }
                    if (newGroup) {
                        groupElements.push(new exportSerieGroup_1.ExportSerieGroup(parent_1.name, parent_1.startTriggerTime, items[i].serie));
                    }
                }
            }
        };
        /**
         * Returns true if a signal is repeated
         *
         * @private
         * @param {Array<any>} arrayOfItems
         * @param {BaseSeries} serie
         * @returns {boolean}
         * @memberof ExportHelper
         */
        ExportHelper.prototype.isSignalRepeated = function (arrayOfItems, serie) {
            for (var i = 0; i < arrayOfItems.length; i++) {
                if (arrayOfItems[i].serie == serie) {
                    return true;
                }
            }
            return false;
        };
        /**
         * Add input series (if not selected) in XY or FFT formulas
         *
         * @private
         * @param {Array<any>} items
         * @param {Array<SignalManagerCalculationInputData>} inputSeries
         * @memberof ExportHelper
         */
        ExportHelper.prototype.addInputElements = function (items, inputSeries) {
            for (var j = 0; j < inputSeries.length; j++) {
                var isSelected = false;
                for (var a = 0; a < items.length; a++) {
                    if (inputSeries[j].serie == items[a].serie) {
                        isSelected = true;
                    }
                }
                if (!isSelected) {
                    items.push(inputSeries[j]);
                }
            }
        };
        /**
         * Returns true if selected element can be exported
         *
         * @param {*} item
         * @returns {boolean}
         * @memberof ExportHelper
         */
        ExportHelper.prototype.isElementExportable = function (item) {
            //SignalCategory selected
            if (item instanceof signalCategory_1.SignalCategory) {
                return false;
            }
            //Input data without valid signal is selected
            else if (item instanceof signalManagerCalculationInputData_1.SignalManagerCalculationInputData && item.serie == undefined) {
                return false;
            }
            //Name of Calculation selected
            else if (item.parent instanceof signalManagerCalculation_1.SignalManagerCalculation) {
                return false;
            }
            //SerieContainer selected
            else if (!(item instanceof serieGroup_1.SerieGroup) && item.parent instanceof signalCategory_1.SignalCategory) {
                return false;
            }
            //Calculated signal is invalid
            else if ((item instanceof signalManagerCalculation_1.SignalManagerCalculation || item instanceof signalManagerCalculationOutputData_1.SignalManagerCalculationOutputData) && (item.serie == undefined || item.serie.rawPointsValid == false)) {
                return false;
            }
            return true;
        };
        return ExportHelper;
    }());
    exports.ExportHelper = ExportHelper;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0SGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3NpZ25hbE1hbmFnZXJXaWRnZXQvaGVscGVycy9leHBvcnRIZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBU0E7UUFBQTtRQThOQSxDQUFDO1FBNU5HOzs7Ozs7V0FNRztRQUNJLDRDQUFxQixHQUE1QixVQUE2QixRQUFRO1lBQ2pDLElBQUksV0FBVyxHQUFHLElBQUksS0FBSyxFQUFjLENBQUM7WUFDMUMsSUFBSSxLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQU8sQ0FBQztZQUM3QixJQUFJLGFBQWEsR0FBRyxJQUFJLEtBQUssRUFBb0IsQ0FBQztZQUNsRCxJQUFJLGtCQUFrQixHQUFHLElBQUksS0FBSyxFQUE0QixDQUFDO1lBQy9ELElBQUksdUJBQXVCLEdBQUcsSUFBSSxLQUFLLEVBQXFDLENBQUM7WUFDN0UsSUFBSSx3QkFBd0IsR0FBRyxJQUFJLEtBQUssRUFBc0MsQ0FBQztZQUUvRSw2QkFBNkI7WUFDN0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUM3QyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDdEIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUNWO2FBQ0o7WUFFRCwrREFBK0Q7WUFDL0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3RDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FB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QUMsVUFBVSxFQUFFO29CQUNiLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQzlCO2FBQ0o7UUFDTCxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ksMENBQW1CLEdBQTFCLFVBQTJCLElBQUk7WUFDM0IseUJBQXlCO1lBQ3pCLElBQUksSUFBSSxZQUFZLCtCQUFjLEVBQUU7Z0JBQ2hDLE9BQU8sS0FBSyxDQUFDO2FBQ2hCO1lBQ0QsNkNBQTZDO2lCQUN4QyxJQUFHLElBQUksWUFBWSxxRUFBaUMsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLFNBQVMsRUFBQztnQkFDakYsT0FBTyxLQUFLLENBQUM7YUFDaEI7WUFDRCw4QkFBOEI7aUJBQ3pCLElBQUcsSUFBSSxDQUFDLE1BQU0sWUFBWSxtREFBd0IsRUFBRTtnQkFDckQsT0FBTyxLQUFLLENBQUM7YUFDaEI7WUFDRCx5QkFBeUI7aUJBQ3BCLElBQUksQ0FBQyxDQUFDLElBQUksWUFBWSx1QkFBVSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sWUFBWSwrQkFBYyxFQUFFO2dCQUM3RSxPQUFPLEtBQUssQ0FBQzthQUNoQjtZQUNELDhCQUE4QjtpQkFDekIsSUFBSSxDQUFDLElBQUksWUFBWSxtREFBd0IsSUFBSSxJQUFJLFlBQVksdUVBQWtDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksU0FBUyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxJQUFJLEtBQUssQ0FBQyxFQUFFO2dCQUMxSyxPQUFPLEtBQUssQ0FBQzthQUNoQjtZQUVELE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFDTCxtQkFBQztJQUFELENBQUMsQUE5TkQsSUE4TkM7SUFFUSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV4cG9ydFNlcmllR3JvdXAgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2V4cG9ydFNlcmllR3JvdXBcIjtcclxuaW1wb3J0IHsgU2VyaWVHcm91cCB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY29tbW9uL3NpZ25hbC9zZXJpZUdyb3VwXCI7XHJcbmltcG9ydCB7IFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbiB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvc2lnbmFsTWFuYWdlckRhdGFNb2RlbC9zaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25cIjtcclxuaW1wb3J0IHsgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsL3NpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YVwiO1xyXG5pbXBvcnQgeyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25PdXRwdXREYXRhIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsL3NpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbk91dHB1dERhdGFcIjtcclxuaW1wb3J0IHsgU2VyaWVzVHlwZSB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL3Nlcmllc1R5cGVcIjtcclxuaW1wb3J0IHsgU2lnbmFsQ2F0ZWdvcnkgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvc2lnbmFsQ2F0ZWdvcnlcIjtcclxuaW1wb3J0IHsgQmFzZVNlcmllcyB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2Jhc2VTZXJpZXNcIjtcclxuXHJcbmNsYXNzIEV4cG9ydEhlbHBlciB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGFycmF5IG9mIGV4cG9ydFNlcmllR3JvdXAgZWxlbWVudHNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IGVsZW1lbnRzXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8RXhwb3J0U2VyaWVHcm91cD59XHJcbiAgICAgKiBAbWVtYmVyb2YgRXhwb3J0SGVscGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRFeHBvcnRhYmxlRWxlbWVudHMoZWxlbWVudHMpOiBBcnJheTxFeHBvcnRTZXJpZUdyb3VwPiB7XHJcbiAgICAgICAgbGV0IHNlcmllR3JvdXBzID0gbmV3IEFycmF5PFNlcmllR3JvdXA+KCk7XHJcbiAgICAgICAgbGV0IGl0ZW1zID0gbmV3IEFycmF5PGFueT4oKTtcclxuICAgICAgICBsZXQgZ3JvdXBFbGVtZW50cyA9IG5ldyBBcnJheTxFeHBvcnRTZXJpZUdyb3VwPigpO1xyXG4gICAgICAgIGxldCBzaWduYWxDYWxjdWxhdGlvbnMgPSBuZXcgQXJyYXk8U2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uPigpO1xyXG4gICAgICAgIGxldCBzaWduYWxJbnB1dENhbGN1bGF0aW9ucyA9IG5ldyBBcnJheTxTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGE+KCk7XHJcbiAgICAgICAgbGV0IHNpZ25hbE91dHB1dENhbGN1bGF0aW9ucyA9IG5ldyBBcnJheTxTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25PdXRwdXREYXRhPigpO1xyXG5cclxuICAgICAgICAvL2RlbGV0ZSBub3QgZXhwb3J0YWJsZSBpdGVtc1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzRWxlbWVudEV4cG9ydGFibGUoZWxlbWVudHNbaV0uaXRlbSkpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgIGkgPSAtMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9DbGFzc2lmeSBzZWxlY3RlZCBlbGVtZW50cyBpbnRvIGFycmF5cyBhY2NvcmRpbmcgdG8gaXRzIHR5cGUgXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpdGVtcy5wdXNoKGVsZW1lbnRzW2ldLml0ZW0pO1xyXG4gICAgICAgICAgICAvL1B1dCBhbGwgc2lnbmFsQ2FsY3VsYXRpb25zIHNlbGVjdGVkIGludG8gYW4gYXJyYXkgZm9yIGxhdGVyIGNoZWNrc1xyXG4gICAgICAgICAgICBpZiAoZWxlbWVudHNbaV0uaXRlbSBpbnN0YW5jZW9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgc2lnbmFsQ2FsY3VsYXRpb25zLnB1c2goZWxlbWVudHNbaV0uaXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9QdXQgYWxsIHNpZ25hbElucHV0Q2FsY3VsYXRpb25zIHNlbGVjdGVkIGludG8gYW4gYXJyYXkgZm9yIGxhdGVyIGNoZWNrc1xyXG4gICAgICAgICAgICBlbHNlIGlmIChlbGVtZW50c1tpXS5pdGVtIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNTaWduYWxSZXBlYXRlZChzaWduYWxJbnB1dENhbGN1bGF0aW9ucywgZWxlbWVudHNbaV0uaXRlbS5zZXJpZSkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHNpZ25hbElucHV0Q2FsY3VsYXRpb25zLnB1c2goZWxlbWVudHNbaV0uaXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IGl0ZW1zLmluZGV4T2YoZWxlbWVudHNbaV0uaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL1B1dCBhbGwgc2lnbmFsT3VwdXRDYWxjdWxhdGlvbnMgc2VsZWN0ZWQgaW50byBhbiBhcnJheSBmb3IgbGF0ZXJcclxuICAgICAgICAgICAgZWxzZSBpZiAoZWxlbWVudHNbaV0uaXRlbSBpbnN0YW5jZW9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbk91dHB1dERhdGEpIHtcclxuICAgICAgICAgICAgICAgIHNpZ25hbE91dHB1dENhbGN1bGF0aW9ucy5wdXNoKGVsZW1lbnRzW2ldLml0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGVsZW1lbnRzW2ldLml0ZW0gaW5zdGFuY2VvZiBTZXJpZUdyb3VwKSB7XHJcbiAgICAgICAgICAgICAgICAvL1B1dCBhbGwgc2VyaWVncm91cHMgc2VsZWN0ZWQgaW50byBhbiBhcnJheVxyXG4gICAgICAgICAgICAgICAgbGV0IHNlcmllR3JvdXA6IFNlcmllR3JvdXAgPSBlbGVtZW50c1tpXS5pdGVtO1xyXG4gICAgICAgICAgICAgICAgc2VyaWVHcm91cHMucHVzaChzZXJpZUdyb3VwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL0NvbnZlcnQgc2VsZWN0ZWQgU2VyaWVncm91cHMgdG8gZXhwb3J0U2VyaWVHcm91cHNcclxuICAgICAgICAgICAgICAgIGlmIChzZXJpZUdyb3VwLmdldENoaWxkcygpWzBdICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwRWxlbWVudHMucHVzaChuZXcgRXhwb3J0U2VyaWVHcm91cChzZXJpZUdyb3VwLm5hbWUsIHNlcmllR3JvdXAuc3RhcnRUcmlnZ2VyVGltZSwgZWxlbWVudHNbaV0uaXRlbS5jaGlsZHNbMF0uc2VyaWUpKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMTsgaiA8IHNlcmllR3JvdXAuZ2V0Q2hpbGRzKCkubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlcmllR3JvdXAuZ2V0Q2hpbGRzKClbal0uc2VyaWUgIT0gdW5kZWZpbmVkICYmIHNlcmllR3JvdXAuZ2V0Q2hpbGRzKClbal0uc2VyaWUhLnJhd1BvaW50c1ZhbGlkID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IGdyb3VwRWxlbWVudHMubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwRWxlbWVudHNbaW5kZXhdLmFkZFNlcmllKHNlcmllR3JvdXAuZ2V0Q2hpbGRzKClbal0uc2VyaWUhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5maWx0ZXJTZWxlY3RlZEl0ZW1zKGl0ZW1zLCBzZXJpZUdyb3Vwcywgc2lnbmFsQ2FsY3VsYXRpb25zLCBzaWduYWxJbnB1dENhbGN1bGF0aW9ucywgc2lnbmFsT3V0cHV0Q2FsY3VsYXRpb25zLCBncm91cEVsZW1lbnRzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGdyb3VwRWxlbWVudHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWxldGUgZHVwbGljYXRlZCBzZXJpZXMsIGludmFsaWQgc2VyaWVzIG9yIG5vdCBuZWVkIGl0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8YW55Pn0gaXRlbXNcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8U2VyaWVHcm91cD59IHNlcmllR3JvdXBzXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbj59IHNpZ25hbENhbGN1bGF0aW9uc1xyXG4gICAgICogQHBhcmFtIHtBcnJheTxTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGE+fSBzaWduYWxJbnB1dENhbGN1bGF0aW9uc1xyXG4gICAgICogQHBhcmFtIHtBcnJheTxTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25PdXRwdXREYXRhPn0gc2lnbmFsT3V0cHV0Q2FsY3VsYXRpb25zXHJcbiAgICAgKiBAbWVtYmVyb2YgRXhwb3J0SGVscGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZmlsdGVyU2VsZWN0ZWRJdGVtcyhpdGVtczogQXJyYXk8YW55Piwgc2VyaWVHcm91cHM6IEFycmF5PFNlcmllR3JvdXA+LCBzaWduYWxDYWxjdWxhdGlvbnM6IEFycmF5PFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbj4sIHNpZ25hbElucHV0Q2FsY3VsYXRpb25zOiBBcnJheTxTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGE+LCBzaWduYWxPdXRwdXRDYWxjdWxhdGlvbnM6IEFycmF5PFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbk91dHB1dERhdGE+LCBncm91cEVsZW1lbnRzOiBBcnJheTxFeHBvcnRTZXJpZUdyb3VwPikge1xyXG4gICAgICAgIC8vZGVsZXRlIHNlbGVjdGVkIHJvd3MgaWYgaXRzIFNlcmllR3JvdXAgaXMgYWxzbyBzZWxlY3RlZC4gXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHNlcmllR3JvdXBzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIShpdGVtc1tpXSBpbnN0YW5jZW9mIFNlcmllR3JvdXApICYmIGl0ZW1zW2ldLmdldFNlcmllR3JvdXAoKSA9PSBzZXJpZUdyb3Vwc1tqXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vZGVsZXRlIHNhbWUgZWxlbWVudCBpbiBhbGxsIGFycmF5c1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IHNpZ25hbENhbGN1bGF0aW9ucy5pbmRleE9mKGl0ZW1zW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICBzaWduYWxDYWxjdWxhdGlvbnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IHNpZ25hbElucHV0Q2FsY3VsYXRpb25zLmluZGV4T2YoaXRlbXNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHNpZ25hbElucHV0Q2FsY3VsYXRpb25zLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBzaWduYWxPdXRwdXRDYWxjdWxhdGlvbnMuaW5kZXhPZihpdGVtc1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2lnbmFsT3V0cHV0Q2FsY3VsYXRpb25zLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGkgPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9kZWxldGUgc2VsZWN0ZWQgQ2FsY3VsYXRpb25PdXRwdXQgaWYgaXRzIENhbGN1bGF0aW9uRGF0YSBpcyBhbHNvIHNlbGVjdGVkLiBcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpZ25hbE91dHB1dENhbGN1bGF0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc1NpZ25hbFJlcGVhdGVkKHNpZ25hbENhbGN1bGF0aW9ucywgc2lnbmFsT3V0cHV0Q2FsY3VsYXRpb25zW2ldLnNlcmllISkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IGl0ZW1zLmluZGV4T2Yoc2lnbmFsT3V0cHV0Q2FsY3VsYXRpb25zW2ldKTtcclxuICAgICAgICAgICAgICAgIHNpZ25hbE91dHB1dENhbGN1bGF0aW9ucy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICBpdGVtcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgaSA9IC0xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2FkZCBpbnB1dCBjYWxjdWxhdGlvbiBkYXRhIGlmIGNhbGN1bGF0aW9uIGlzIHNlbGVjdGVkXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaWduYWxDYWxjdWxhdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGlucHV0U2VyaWVzOiBBcnJheTxTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGE+ID0gc2lnbmFsQ2FsY3VsYXRpb25zW2ldLmdldElucHV0Q2FsY3VsYXRpb25EYXRhKCk7XHJcbiAgICAgICAgICAgIGlmIChzaWduYWxDYWxjdWxhdGlvbnNbaV0uZ2V0T3V0cHV0Q2FsY3VsYXRpb25EYXRhKClbMF0uc2VyaWUhLnR5cGUgIT0gU2VyaWVzVHlwZS50aW1lU2VyaWVzKSB7IC8vTW9tZW50YXJ5IHNvbHV0aW9uLiBOZXh0IHN0ZXA6IEV4cG9ydCB0aGUgd2hvbGUgWVQgZm9ybXVsYVxyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRJbnB1dEVsZW1lbnRzKGl0ZW1zLCBpbnB1dFNlcmllcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vYWRkIGlucHV0IGNhbGN1bGF0aW9uIGRhdGEgaWYgb3VwdXQgY2FsY3VsYXRpb24gaXMgc2VsZWN0ZWQgXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaWduYWxPdXRwdXRDYWxjdWxhdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGNhbGN1bGF0aW9uID0gc2lnbmFsT3V0cHV0Q2FsY3VsYXRpb25zW2ldLnBhcmVudCEucGFyZW50ISBhcyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb247XHJcbiAgICAgICAgICAgIGxldCBpbnB1dFNlcmllczogQXJyYXk8U2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhPiA9IGNhbGN1bGF0aW9uLmdldElucHV0Q2FsY3VsYXRpb25EYXRhKCk7XHJcbiAgICAgICAgICAgIGlmIChzaWduYWxPdXRwdXRDYWxjdWxhdGlvbnNbaV0uc2VyaWUhLnR5cGUgIT0gU2VyaWVzVHlwZS50aW1lU2VyaWVzKSB7IC8vTW9tZW50YXJ5IHNvbHV0aW9uLiBOZXh0IHN0ZXA6IEV4cG9ydCB0aGUgd2hvbGUgWVQgZm9ybXVsYVxyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRJbnB1dEVsZW1lbnRzKGl0ZW1zLCBpbnB1dFNlcmllcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vZGVsZXRlIHJlcGVhdGVkIHNlbGVjdGVkIHNlcmllcyAoc2VyaWUgKyBzYW1lIHNlcmllIGluIGlucHV0IGNhbGN1bGF0aW9uKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKCEoaXRlbXNbaV0gaW5zdGFuY2VvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGEpICYmIHRoaXMuaXNTaWduYWxSZXBlYXRlZChzaWduYWxJbnB1dENhbGN1bGF0aW9ucywgaXRlbXNbaV0uc2VyaWUpKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtcy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICBpID0gLTE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vY3JlYXRlIGV4cG9ydFNlcmllR3JvdXBzIHdpdGggdGhlIHNlbGVjdGVkIHJvd3NcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICghKGl0ZW1zW2ldIGluc3RhbmNlb2YgU2VyaWVHcm91cCkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBwYXJlbnQ6IFNlcmllR3JvdXAgPSBpdGVtc1tpXS5nZXRTZXJpZUdyb3VwKCkgYXMgU2VyaWVHcm91cDtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdHcm91cCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGdyb3VwRWxlbWVudHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyZW50LnN0YXJ0VHJpZ2dlclRpbWUgPT0gZ3JvdXBFbGVtZW50c1tqXS5zdGFydFRyaWdnZXJUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0dyb3VwID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwRWxlbWVudHNbal0uYWRkU2VyaWUoaXRlbXNbaV0uc2VyaWUhKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChuZXdHcm91cCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwRWxlbWVudHMucHVzaChuZXcgRXhwb3J0U2VyaWVHcm91cChwYXJlbnQubmFtZSwgcGFyZW50LnN0YXJ0VHJpZ2dlclRpbWUsIGl0ZW1zW2ldLnNlcmllISkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIGEgc2lnbmFsIGlzIHJlcGVhdGVkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8YW55Pn0gYXJyYXlPZkl0ZW1zXHJcbiAgICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNlcmllXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBFeHBvcnRIZWxwZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpc1NpZ25hbFJlcGVhdGVkKGFycmF5T2ZJdGVtczogQXJyYXk8YW55Piwgc2VyaWU6IEJhc2VTZXJpZXMpOiBib29sZWFuIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5T2ZJdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoYXJyYXlPZkl0ZW1zW2ldLnNlcmllID09IHNlcmllKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgaW5wdXQgc2VyaWVzIChpZiBub3Qgc2VsZWN0ZWQpIGluIFhZIG9yIEZGVCBmb3JtdWxhcyBcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxhbnk+fSBpdGVtc1xyXG4gICAgICogQHBhcmFtIHtBcnJheTxTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGE+fSBpbnB1dFNlcmllc1xyXG4gICAgICogQG1lbWJlcm9mIEV4cG9ydEhlbHBlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZElucHV0RWxlbWVudHMoaXRlbXM6IEFycmF5PGFueT4sIGlucHV0U2VyaWVzOiBBcnJheTxTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGE+KSB7XHJcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBpbnB1dFNlcmllcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICBsZXQgaXNTZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBhID0gMDsgYSA8IGl0ZW1zLmxlbmd0aDsgYSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5wdXRTZXJpZXNbal0uc2VyaWUgPT0gaXRlbXNbYV0uc2VyaWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpc1NlbGVjdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWlzU2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2goaW5wdXRTZXJpZXNbal0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHNlbGVjdGVkIGVsZW1lbnQgY2FuIGJlIGV4cG9ydGVkXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBpdGVtXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBFeHBvcnRIZWxwZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGlzRWxlbWVudEV4cG9ydGFibGUoaXRlbSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIC8vU2lnbmFsQ2F0ZWdvcnkgc2VsZWN0ZWRcclxuICAgICAgICBpZiAoaXRlbSBpbnN0YW5jZW9mIFNpZ25hbENhdGVnb3J5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9JbnB1dCBkYXRhIHdpdGhvdXQgdmFsaWQgc2lnbmFsIGlzIHNlbGVjdGVkXHJcbiAgICAgICAgZWxzZSBpZihpdGVtIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uSW5wdXREYXRhICYmIGl0ZW0uc2VyaWUgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL05hbWUgb2YgQ2FsY3VsYXRpb24gc2VsZWN0ZWRcclxuICAgICAgICBlbHNlIGlmKGl0ZW0ucGFyZW50IGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9TZXJpZUNvbnRhaW5lciBzZWxlY3RlZFxyXG4gICAgICAgIGVsc2UgaWYgKCEoaXRlbSBpbnN0YW5jZW9mIFNlcmllR3JvdXApICYmIGl0ZW0ucGFyZW50IGluc3RhbmNlb2YgU2lnbmFsQ2F0ZWdvcnkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL0NhbGN1bGF0ZWQgc2lnbmFsIGlzIGludmFsaWRcclxuICAgICAgICBlbHNlIGlmICgoaXRlbSBpbnN0YW5jZW9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbiB8fCBpdGVtIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uT3V0cHV0RGF0YSkgJiYgKGl0ZW0uc2VyaWUgPT0gdW5kZWZpbmVkIHx8IGl0ZW0uc2VyaWUucmF3UG9pbnRzVmFsaWQgPT0gZmFsc2UpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBFeHBvcnRIZWxwZXIgfTsiXX0=