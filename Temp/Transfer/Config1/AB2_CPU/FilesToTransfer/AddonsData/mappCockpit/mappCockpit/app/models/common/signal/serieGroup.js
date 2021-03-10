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
define(["require", "exports", "../../signalManagerDataModel/signalManagerCalculation", "./serieContainer", "./serieNode", "../../signalManagerDataModel/signalManagerCalculationInputData"], function (require, exports, signalManagerCalculation_1, serieContainer_1, serieNode_1, signalManagerCalculationInputData_1) {
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
                this.updateStartTriggerTimeOnChilds();
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
         * Adds new series; removes not available series; updates the data of existing signseriesals(same serie name)
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
        /**
         * Update the StartTriggerTime of all the child nodes(series)
         *
         * @private
         * @memberof SerieGroup
         */
        SerieGroup.prototype.updateStartTriggerTimeOnChilds = function () {
            var _this = this;
            var childSeries = this.getSeries();
            childSeries.forEach(function (childSerie) {
                childSerie.startTriggerTime = _this._startTriggerTime;
            });
        };
        return SerieGroup;
    }(serieContainer_1.SerieContainer));
    exports.SerieGroup = SerieGroup;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWVHcm91cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL2NvbW1vbi9zaWduYWwvc2VyaWVHcm91cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBUUE7UUFBZ0MsOEJBQWM7UUFpQjFDOzs7OztXQUtHO1FBQ0gsb0JBQVksSUFBWSxFQUFFLGdCQUF3QixFQUFFLFdBQTJCO1lBQTNCLDRCQUFBLEVBQUEsa0JBQTJCO1lBQS9FLFlBQ0ksa0JBQU0sSUFBSSxFQUFFLEVBQUUsRUFBRSxXQUFXLENBQUMsU0FFL0I7WUF4QkQsa0JBQVksR0FBRyxJQUFJLENBQUM7WUF1QmhCLEtBQUksQ0FBQyxpQkFBaUIsR0FBRyxnQkFBZ0IsQ0FBQzs7UUFDOUMsQ0FBQztRQXJCRCxzQkFBVyx3Q0FBZ0I7aUJBQTNCO2dCQUNJLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO1lBQ2xDLENBQUM7aUJBQ0QsVUFBNEIsS0FBYTtnQkFDckMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztnQkFDL0IsSUFBSSxDQUFDLDhCQUE4QixFQUFFLENBQUM7WUFDMUMsQ0FBQzs7O1dBSkE7UUFNRCxzQkFBVyw2QkFBSztpQkFBaEI7Z0JBQ0ksT0FBTyxTQUFTLENBQUM7WUFDckIsQ0FBQzs7O1dBQUE7UUFhRDs7Ozs7O1dBTUc7UUFDSCw2QkFBUSxHQUFSLFVBQVMsS0FBaUIsRUFBRSxLQUFpQjtZQUFqQixzQkFBQSxFQUFBLFNBQWdCLENBQUM7WUFDekMsSUFBSSxZQUFZLEdBQUcsSUFBSSxxQkFBUyxDQUFDLFNBQVMsRUFBTyxLQUFLLENBQUMsQ0FBQztZQUN4RCxpQkFBTSxZQUFZLFlBQUMsWUFBWSxDQUFDLENBQUM7UUFDckMsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gsZ0NBQVcsR0FBWCxVQUFZLEtBQWlCO1lBQ3pCLGdDQUFnQztZQUNoQyxJQUFJLFNBQVMsR0FB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Q0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLDZDQUF3QixHQUFoQztZQUNJLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUcsRUFBQztnQkFDeEMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0IsSUFBRyxLQUFLLFlBQVksbURBQXdCLEVBQUM7b0JBQ3pDLE9BQU8sQ0FBQyxDQUFDO2lCQUNaO2FBQ0o7WUFDRCxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ2QsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0ssbURBQThCLEdBQXRDO1lBQUEsaUJBS0M7WUFKRyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDbkMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFDLFVBQVU7Z0JBQzNCLFVBQVUsQ0FBQyxnQkFBZ0IsR0FBRyxLQUFJLENBQUMsaUJBQWlCLENBQUM7WUFDekQsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBQ0wsaUJBQUM7SUFBRCxDQUFDLEFBck9ELENBQWdDLCtCQUFjLEdBcU83QztJQXJPWSxnQ0FBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElTZXJpZUdyb3VwIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvc2VyaWVHcm91cEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb24gfSBmcm9tIFwiLi4vLi4vc2lnbmFsTWFuYWdlckRhdGFNb2RlbC9zaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25cIjtcclxuaW1wb3J0IHsgU2VyaWVDb250YWluZXIgfSBmcm9tIFwiLi9zZXJpZUNvbnRhaW5lclwiO1xyXG5pbXBvcnQgeyBTZXJpZU5vZGUgfSBmcm9tIFwiLi9zZXJpZU5vZGVcIjtcclxuaW1wb3J0IHsgSVNlcmllTm9kZSB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3NlcmllTm9kZUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4uLy4uL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9iYXNlU2VyaWVzXCI7XHJcbmltcG9ydCB7IFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YSB9IGZyb20gXCIuLi8uLi9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsL3NpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNlcmllR3JvdXAgZXh0ZW5kcyBTZXJpZUNvbnRhaW5lciBpbXBsZW1lbnRzIElTZXJpZUdyb3Vwe1xyXG4gICAgXHJcbiAgICBpc1NlcmllR3JvdXAgPSB0cnVlO1xyXG5cclxuICAgIHByaXZhdGUgX3N0YXJ0VHJpZ2dlclRpbWU6IG51bWJlcjtcclxuICAgIHB1YmxpYyBnZXQgc3RhcnRUcmlnZ2VyVGltZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdGFydFRyaWdnZXJUaW1lO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBzdGFydFRyaWdnZXJUaW1lKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9zdGFydFRyaWdnZXJUaW1lID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTdGFydFRyaWdnZXJUaW1lT25DaGlsZHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvbG9yKCk6IHN0cmluZ3x1bmRlZmluZWQge1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFNlcmllR3JvdXAuXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0VHJpZ2dlclRpbWVcclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZUdyb3VwXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgc3RhcnRUcmlnZ2VyVGltZTogbnVtYmVyLCBleHBhbmRTdGF0ZTogYm9vbGVhbiA9IHRydWUpe1xyXG4gICAgICAgIHN1cGVyKG5hbWUsIFwiXCIsIGV4cGFuZFN0YXRlKTtcclxuICAgICAgICB0aGlzLl9zdGFydFRyaWdnZXJUaW1lID0gc3RhcnRUcmlnZ2VyVGltZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBzZXJpZSB0byB0aGlzIHNlcmllIGNvbnRhaW5lclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbaW5kZXg9LTFdICAtMSB0byBhZGQgYXQgdGhlIGVuZCwgZWxzZSB0aGUgaW5kZXggd2hlcmUgdG8gYWRkXHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVDb250YWluZXJcclxuICAgICAqL1xyXG4gICAgYWRkU2VyaWUoc2VyaWU6IEJhc2VTZXJpZXMsIGluZGV4OiBudW1iZXIgPS0xKXtcclxuICAgICAgICBsZXQgbmV3U2VyaWVOb2RlID0gbmV3IFNlcmllTm9kZSh1bmRlZmluZWQsIDxhbnk+c2VyaWUpO1xyXG4gICAgICAgIHN1cGVyLmFkZFNlcmllTm9kZShuZXdTZXJpZU5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyBhIHNlcmllIGZyb20gdGhpcyBzZXJpZSBjb250YWluZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0Jhc2VTZXJpZXN9IHNlcmllXHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVDb250YWluZXJcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlU2VyaWUoc2VyaWU6IEJhc2VTZXJpZXMpe1xyXG4gICAgICAgIC8vIEZvdW5kIHNlcmllIHdpdGhpbiBzZXJpZW5vZGVzXHJcbiAgICAgICAgbGV0IHNlcmllTm9kZTogSVNlcmllTm9kZXx1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGkgPCB0aGlzLmNoaWxkcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuY2hpbGRzW2ldLnNlcmllID09IHNlcmllKXtcclxuICAgICAgICAgICAgICAgIHNlcmllTm9kZSA9IHRoaXMuY2hpbGRzW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHNlcmllTm9kZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBzdXBlci5yZW1vdmVTZXJpZU5vZGUoc2VyaWVOb2RlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmUgYWxsIHJlZmVyZW5jZXMgdG8gdGhlIGdpdmVuIHNlcmllIHdpdGhpbiB0aGlzIHNlcmllIGdyb3VwKGUuZy4gcmVmZXJlbmNlcyBpbiBjYWxjdWxhdGlvbnMpXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsoQmFzZVNlcmllc3x1bmRlZmluZWQpfSBzZXJpZVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllR3JvdXBcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlUmVmZXJlbmNlc1RvU2VyaWVOb2RlKHNlcmllTm9kZTogSVNlcmllTm9kZSl7XHJcbiAgICAgICAgaWYoIShzZXJpZU5vZGUgaW5zdGFuY2VvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGEpKXtcclxuICAgICAgICAgICAgLy8gaW5mb3JtIGFsbCBjaGlsZCBub2RlcyhjYWxjdWxhdGlvbnMpIHRoYXQgYSBzZXJpZSB3aWxsIGJlIHJlbW92ZWQgZnJvbSB0aGlzIHNlcmllR3JvdXA7IG9ubHkgaW4gY2FzZSBvZlxyXG4gICAgICAgICAgICAvLyB0aGUgc2VyaWVOb2RlIGlzIG5vIGlucHV0U2lnbmFsIG9mIGEgY2FsY3VsYXRpb25cclxuICAgICAgICAgICAgdGhpcy5nZXRDaGlsZHMoKS5mb3JFYWNoKGNoaWxkID0+e1xyXG4gICAgICAgICAgICAgICAgaWYoY2hpbGQgaW5zdGFuY2VvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb24pe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjYWxjdWxhdGlvbiA9IGNoaWxkIGFzIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICBpZihzZXJpZU5vZGUuc2VyaWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsY3VsYXRpb24ucmVtb3ZlUmVmZXJlbmNlc1RvU2VyaWUoc2VyaWVOb2RlLnNlcmllKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFrZXMgYSBjb3B5IG9mIHRoZSBvYmplY3Qgd2l0aCBhbGwgc3ViIG9iamVjdHMoZS5nLiBzZXJpZXMpXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge1NlcmllR3JvdXB9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVHcm91cFxyXG4gICAgICovXHJcbiAgICBjbG9uZSgpOiBTZXJpZUdyb3Vwe1xyXG4gICAgICAgIGxldCBzZXJpZUdyb3VwID0gbmV3IFNlcmllR3JvdXAodGhpcy5uYW1lLCB0aGlzLnN0YXJ0VHJpZ2dlclRpbWUpO1xyXG4gICAgICAgIHNlcmllR3JvdXAuZXhwYW5kU3RhdGUgPSB0aGlzLmV4cGFuZFN0YXRlO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBzZXJpZU5vZGUgPSB0aGlzLmNoaWxkc1tpXTtcclxuICAgICAgICAgICAgaWYoc2VyaWVOb2RlICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBzZXJpZUdyb3VwLmFkZFNlcmllTm9kZShzZXJpZU5vZGUuY2xvbmUoKSwgLTEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB1cGRhdGUgc2VyaWVzIGF0IGlucHV0IGNhbGN1bGF0aW9uIGRhdGEgd2l0aCBjbG9uZWQgc2VyaWVzIGZyb20gc2VyaWUgZ3JvdXBcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2VyaWVHcm91cC5jaGlsZHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgY2FsY3VsYXRpb25Ob2RlID0gc2VyaWVHcm91cC5jaGlsZHNbaV07XHJcbiAgICAgICAgICAgIGlmKGNhbGN1bGF0aW9uTm9kZSBpbnN0YW5jZW9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbil7XHJcbiAgICAgICAgICAgICAgICBjYWxjdWxhdGlvbk5vZGUudXBkYXRlSW5wdXREYXRhKHNlcmllR3JvdXApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZXJpZUdyb3VwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgc2VyaWUgd2l0aCB0aGUgZ2l2ZW4gc2VyaWVOYW1lIHdpdGhpbiB0aGUgc2VyaWUgZ3JvdXBcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VyaWVOYW1lXHJcbiAgICAgKiBAcmV0dXJucyB7KEJhc2VTZXJpZXN8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZUdyb3VwXHJcbiAgICAgKi9cclxuICAgIGdldFNlcmllKHNlcmllTmFtZTogc3RyaW5nKTogQmFzZVNlcmllc3x1bmRlZmluZWR7XHJcbiAgICAgICAgbGV0IHNlcmllcyA9IHRoaXMuZ2V0U2VyaWVzKCk7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGkgPCBzZXJpZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZiAoc2VyaWVzW2ldLm5hbWUgPT0gc2VyaWVOYW1lKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzZXJpZXNbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTZXJpZUJ5T3JpZ2luYWxOYW1lKG9yaWdpbmFsTmFtZTogc3RyaW5nKTogQmFzZVNlcmllc3x1bmRlZmluZWR7XHJcbiAgICAgICAgbGV0IHNlcmllcyA9IHRoaXMuZ2V0U2VyaWVzKCk7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGkgPCBzZXJpZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZiAoc2VyaWVzW2ldLm9yaWdpbmFsTmFtZSA9PSBvcmlnaW5hbE5hbWUpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlcmllc1tpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWVyZ2VzIHRoZSBpbmZvcm1hdGlvbiBvZiBhIHNlcmllIGdyb3VwIHRvIGFuIGV4aXN0aW5nIHNlcmllIGdyb3VwXHJcbiAgICAgKiBBZGRzIG5ldyBzZXJpZXM7IHJlbW92ZXMgbm90IGF2YWlsYWJsZSBzZXJpZXM7IHVwZGF0ZXMgdGhlIGRhdGEgb2YgZXhpc3Rpbmcgc2lnbnNlcmllc2FscyhzYW1lIHNlcmllIG5hbWUpXHJcbiAgICAgKiBDYWxjdWxhdGlvbnMgd2lsbCBiZSBpZ25vcmVkXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJU2VyaWVHcm91cH0gbmV3U2VyaWVHcm91cFxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllR3JvdXBcclxuICAgICAqL1xyXG4gICAgbWVyZ2VXaXRoU2VyaWVHcm91cChuZXdTZXJpZUdyb3VwOiBJU2VyaWVHcm91cCl7XHJcbiAgICAgICAgdGhpcy5zdGFydFRyaWdnZXJUaW1lID0gbmV3U2VyaWVHcm91cC5zdGFydFRyaWdnZXJUaW1lO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5ld1NlcmllR3JvdXAubmFtZTtcclxuICAgICAgICAvLyBSZW1vdmUgdW51c2VkIHNlcmllcyAob25seSBpZiBub3QgYSBjYWxjdWxhdGlvbilcclxuICAgICAgICBmb3IobGV0IGk9MDsgaSA8IHRoaXMuY2hpbGRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBzZXJpZU5vZGUgPSB0aGlzLmNoaWxkc1tpXTtcclxuICAgICAgICAgICAgbGV0IHNlcmllTm9kZU5hbWUgPSBzZXJpZU5vZGUubmFtZTtcclxuICAgICAgICAgICAgaWYoc2VyaWVOb2RlLnNlcmllICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBzZXJpZU5vZGVOYW1lID0gc2VyaWVOb2RlLnNlcmllIS5vcmlnaW5hbE5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGZvdW5kU2VyaWVOb2RlID0gbmV3U2VyaWVHcm91cC5nZXRTZXJpZUJ5T3JpZ2luYWxOYW1lKHNlcmllTm9kZU5hbWUpO1xyXG4gICAgICAgICAgICBpZihmb3VuZFNlcmllTm9kZSA9PSB1bmRlZmluZWQpeyBcclxuICAgICAgICAgICAgICAgIGlmKCEoc2VyaWVOb2RlIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uKSl7IC8vIFJlbW92ZSBvbmx5IGlmIG5vdCBhIGNhbGN1bGF0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVTZXJpZU5vZGUoc2VyaWVOb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICBpLS07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZXMgdGhlIGRhdGEgb2YgYW4gZXhpc3Rpbmcgc2VyaWVcclxuICAgICAgICAgICAgICAgIGlmKHNlcmllTm9kZS5zZXJpZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHNlcmllTm9kZS5zZXJpZS51cGRhdGVQb2ludHMoZm91bmRTZXJpZU5vZGUucmF3UG9pbnRzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFkZFNlcmllc0Zyb21Hcm91cChuZXdTZXJpZUdyb3VwKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBzZXJpZXMgZnJvbSB0aGUgZ2l2ZW4gc2VyaWVHcm91cCB0byB0aGlzIHNlcmllR3JvdXAgaWYgbm90IGFscmVhZHkgdGhlcmVcclxuICAgICAqIFNpZ25hbHMgd2lsbCBiZSBhZGRlZCBiZWZvcmUgdGhlIGZpcnN0IGNhbGN1bGF0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SVNlcmllR3JvdXB9IHNlcmllR3JvdXBcclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZUdyb3VwXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkU2VyaWVzRnJvbUdyb3VwKHNlcmllR3JvdXA6IElTZXJpZUdyb3VwKXtcclxuICAgICAgICAvLyBhZGQgbmV3IHNlcmllcyBiZWZvcmUgY2FsY3VsYXRpb25zXHJcbiAgICAgICAgbGV0IGZpcnN0Q2FsY3VsYXRpb25JbmRleCA9IHRoaXMuZ2V0Rmlyc3RDYWxjdWxhdGlvbkluZGV4KCk7XHJcbiAgICAgICAgbGV0IGNoaWxkcyA9IHNlcmllR3JvdXAuZ2V0Q2hpbGRzKCk7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGkgPCBjaGlsZHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBzZXJpZU5vZGVOYW1lID0gY2hpbGRzW2ldLm5hbWU7XHJcbiAgICAgICAgICAgIGlmKGNoaWxkc1tpXS5zZXJpZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgc2VyaWVOb2RlTmFtZSA9IGNoaWxkc1tpXS5zZXJpZSEub3JpZ2luYWxOYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBmb3VuZFNlcmllTm9kZSA9IHRoaXMuZ2V0U2VyaWVCeU9yaWdpbmFsTmFtZShzZXJpZU5vZGVOYW1lKTtcclxuICAgICAgICAgICAgaWYoZm91bmRTZXJpZU5vZGUgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdTZXJpZU5vZGUgPSBjaGlsZHNbaV07XHJcbiAgICAgICAgICAgICAgICBpZihuZXdTZXJpZU5vZGUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFNlcmllTm9kZShuZXdTZXJpZU5vZGUsIGZpcnN0Q2FsY3VsYXRpb25JbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZmlyc3RDYWxjdWxhdGlvbkluZGV4ICE9IC0xKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RDYWxjdWxhdGlvbkluZGV4Kys7IFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBmaXJzdCBjYWxjdWxhdGlvbiBpbiB0aGUgY2hpbGRzIG9mIHRoaXMgZ3JvdXBcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZUdyb3VwXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0Rmlyc3RDYWxjdWxhdGlvbkluZGV4KCk6IG51bWJlcntcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHMubGVuZ3RoOyBpICsrKXtcclxuICAgICAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5jaGlsZHNbaV07XHJcbiAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgU2lnbmFsTWFuYWdlckNhbGN1bGF0aW9uKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZSB0aGUgU3RhcnRUcmlnZ2VyVGltZSBvZiBhbGwgdGhlIGNoaWxkIG5vZGVzKHNlcmllcylcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllR3JvdXBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVTdGFydFRyaWdnZXJUaW1lT25DaGlsZHMoKXtcclxuICAgICAgICBsZXQgY2hpbGRTZXJpZXMgPSB0aGlzLmdldFNlcmllcygpO1xyXG4gICAgICAgIGNoaWxkU2VyaWVzLmZvckVhY2goKGNoaWxkU2VyaWUpID0+e1xyXG4gICAgICAgICAgICBjaGlsZFNlcmllLnN0YXJ0VHJpZ2dlclRpbWUgPSB0aGlzLl9zdGFydFRyaWdnZXJUaW1lO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59Il19