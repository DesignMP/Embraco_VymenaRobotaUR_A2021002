define(["require", "exports", "../../../models/chartManagerDataModel/chartManagerChart", "../../../models/chartManagerDataModel/baseSeries", "../../../models/chartManagerDataModel/scale"], function (require, exports, chartManagerChart_1, baseSeries_1, scale_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ChartManagerTreeGridDragDrop = /** @class */ (function () {
        function ChartManagerTreeGridDragDrop() {
        }
        /**
         * Sets the variable '_dragStartChartItem' when a drag operation is started
         *
         * @param {*} args
         * @memberof ChartManagerTreeGridDragDrop
         */
        ChartManagerTreeGridDragDrop.prototype.rowDragStart = function (args) {
            if (args.draggedRow.parentItem != undefined) {
                if (args.draggedRow.level == 2) {
                    this._dragStartChartItem = args.draggedRow.parentItem.parentItem.item;
                }
            }
            else if (args.draggedRow.level == 1) {
                this._dragStartChartItem = args.draggedRow.parentItem.item;
            }
            else if (args.draggedRow.level == 0) {
                this._dragStartChartItem = args.draggedRow.item;
            }
        };
        /**
         * Checks if drop is possible when dragging
         *
         * @param {*} args
         * @memberof ChartManagerTreeGridDragDrop
         */
        ChartManagerTreeGridDragDrop.prototype.rowDrag = function (args) {
            if (args.draggedRow.item instanceof chartManagerChart_1.ChartManagerChart) {
                this.canDropChart(args);
            }
            else if (args.draggedRow.item instanceof scale_1.Scale) {
                this.canDropYAxis(args);
            }
            else if (args.draggedRow.item instanceof baseSeries_1.BaseSeries) {
                this.canDropSerie(args);
            }
        };
        /**
         * Checks if chart can be dropped
         *
         * @private
         * @param {*} args
         * @memberof ChartManagerTreeGridDragDrop
         */
        ChartManagerTreeGridDragDrop.prototype.canDropChart = function (args) {
            if ((args.dropPosition == "insertAbove" || args.dropPosition == "insertBelow") && args.targetRow.level == 0) {
            }
            else {
                args.canDrop = false;
            }
        };
        /**
         * Checks if Scale can be dropped
         *
         * @private
         * @param {*} args
         * @memberof ChartManagerTreeGridDragDrop
         */
        ChartManagerTreeGridDragDrop.prototype.canDropYAxis = function (args) {
            // Drag & Drop of YAxis not allowed
            args.canDrop = false;
        };
        /**
         * Checks if Serie can be dropped
         *
         * @private
         * @param {*} args
         * @memberof ChartManagerTreeGridDragDrop
         */
        ChartManagerTreeGridDragDrop.prototype.canDropSerie = function (args) {
            if ((args.dropPosition == "insertAbove" || args.dropPosition == "insertBelow") && args.targetRow.level == 2
                || (args.dropPosition == "insertAsChild" && (args.targetRow.level == 1 || args.targetRow.level == 0))) {
                var targetAxis = this.getTargetAxisFromTragetRow(args.targetRow);
                var targetChart = this.getTargetChartFromTargetRow(args.targetRow);
                if (targetChart != undefined && args.draggedRow.type !== chartManagerChart_1.ChartType.XYChart) {
                    this.canDropNotXYSerie(args, targetAxis, targetChart);
                }
                else if (targetChart != undefined) {
                    this.canDropXYSerie(args, targetAxis, targetChart);
                }
            }
            else {
                args.canDrop = false;
            }
        };
        /**
         * Checks if YT or FFT serie can be dropped
         *
         * @private
         * @param {*} args
         * @param {(Scale | undefined)} targetAxis
         * @param {IChartManagerChart} targetChart
         * @memberof ChartManagerTreeGridDragDrop
         */
        ChartManagerTreeGridDragDrop.prototype.canDropNotXYSerie = function (args, targetAxis, targetChart) {
            var sourceChart = args.draggedRow.parentItem.parentItem.item;
            var sourceAxis = args.draggedRow.parentItem.item;
            var serie = args.draggedRow.item;
            var series = new Array();
            series.push(serie);
            if (targetAxis == sourceAxis) { // Avoid moving of series within an axis
                args.canDrop = false;
            }
            else if (args.draggedRow.parentItem.parentItem.chartType !== targetChart.chartType ||
                (targetChart != sourceChart && targetChart.hasSeries(series))) {
                args.canDrop = false;
            }
            else if (args.targetRow.level == 0) {
                // Check if a new axis can be added (drag and drop of a serie to a chart)
                if (!targetChart.canAddYAxis()) {
                    args.canDrop = false;
                }
            }
        };
        /**
         * Checks if XY serie can be dropped
         *
         * @private
         * @param {*} args
         * @param {(Scale | undefined)} targetAxis
         * @param {IChartManagerChart} targetChart
         * @memberof ChartManagerTreeGridDragDrop
         */
        ChartManagerTreeGridDragDrop.prototype.canDropXYSerie = function (args, targetAxis, targetChart) {
            var sourceChart = args.draggedRow.parentItem.parentItem.item;
            var sourceAxis = args.draggedRow.parentItem.item;
            var serie = args.draggedRow.item;
            var series = new Array();
            series.push(serie);
            if (targetAxis == sourceAxis || sourceChart == targetChart) { // Avoid moving of series within same axis
                args.canDrop = false;
            }
            else if (args.draggedRow.parentItem.parentItem.chartType !== targetChart.chartType ||
                (targetChart != sourceChart && targetChart.hasSeries(series))) {
                args.canDrop = false;
            }
        };
        /**
         * Triggered when drop action is done
         *
         * @param {*} args
         * @param {IChartManagerDataModel} dataModel
         * @memberof ChartManagerTreeGridDragDrop
         */
        ChartManagerTreeGridDragDrop.prototype.rowDropActionBegin = function (args, dataModel) {
            var dropPosition = args.dropPosition;
            if ((dropPosition == "insertAbove" || dropPosition == "insertBelow") && args.targetRow.level == 2
                || (dropPosition == "insertAsChild" && (args.targetRow.level == 1 || args.targetRow.level == 0))) {
                var targetAxis = this.getTargetAxisFromTragetRow(args.targetRow);
                var targetChart = this.getTargetChartFromTargetRow(args.targetRow);
                if (args.draggedRow.type !== chartManagerChart_1.ChartType.XYChart) {
                    this.NotXYrowDropAction(args, dataModel, targetAxis, targetChart);
                }
                else {
                    this.XYrowDropAction(args, dataModel, targetAxis, targetChart);
                }
            }
        };
        /**
         * Drop YT or FFT serie into the target chart
         *
         * @private
         * @param {*} args
         * @param {IChartManagerDataModel} dataModel
         * @param {(Scale | undefined)} targetAxis
         * @param {(IChartManagerChart | undefined)} targetChart
         * @memberof ChartManagerTreeGridDragDrop
         */
        ChartManagerTreeGridDragDrop.prototype.NotXYrowDropAction = function (args, dataModel, targetAxis, targetChart) {
            if (targetAxis == undefined) {
                // Handle drag of serie to chart
                var sourceChart = this._dragStartChartItem;
                if (sourceChart != undefined) {
                    var serie = args.draggedRow.item;
                    var series = new Array();
                    series.push(serie);
                    // Remove serie from source chart
                    dataModel.removeSerie(sourceChart, serie);
                    // Create new axis and add serie to target chart
                    var axisName = targetChart.getNextYAxisId();
                    var yAxis = new scale_1.Scale(axisName, targetChart);
                    dataModel.addYScale(targetChart, yAxis);
                    dataModel.addSeriesToChart(targetChart, series, yAxis);
                }
                args.cancel = true;
            }
        };
        /**
         * Drop XY serie into the target chart
         *
         * @private
         * @param {*} args
         * @param {IChartManagerDataModel} dataModel
         * @param {(Scale | undefined)} targetScale
         * @param {(IChartManagerChart | undefined)} targetChart
         * @memberof ChartManagerTreeGridDragDrop
         */
        ChartManagerTreeGridDragDrop.prototype.XYrowDropAction = function (args, dataModel, targetScale, targetChart) {
            if (targetScale == undefined) {
                // Handle drag of serie to chart
                var sourceChart = this._dragStartChartItem;
                if (sourceChart != undefined) {
                    var serie = args.draggedRow.item;
                    var series = new Array();
                    series.push(serie);
                    // Remove serie from source chart
                    dataModel.removeSerie(sourceChart, serie);
                    // Add serie to target chart
                    var scaleName = targetChart.getDefaultYAxisId();
                    var yScale = targetChart.getYScale(scaleName);
                    dataModel.addSeriesToChart(targetChart, series, yScale);
                }
                args.cancel = true;
            }
        };
        /**
         * Get target chart from row
         *
         * @private
         * @param {*} targetRow
         * @returns {(IChartManagerChart | undefined)}
         * @memberof ChartManagerTreeGridDragDrop
         */
        ChartManagerTreeGridDragDrop.prototype.getTargetChartFromTargetRow = function (targetRow) {
            if (targetRow.level == 2) {
                return targetRow.parentItem.parentItem.item;
            }
            else if (targetRow.level == 1) {
                return targetRow.parentItem.item;
            }
            else if (targetRow.level == 0) {
                return targetRow.item;
            }
            return undefined;
        };
        /**
         * Get target axis from row
         *
         * @private
         * @param {*} targetRow
         * @returns {(Scale | undefined)}
         * @memberof ChartManagerTreeGridDragDrop
         */
        ChartManagerTreeGridDragDrop.prototype.getTargetAxisFromTragetRow = function (targetRow) {
            if (targetRow.level == 2) {
                return targetRow.parentItem.item;
            }
            else if (targetRow.level == 1) {
                return targetRow.item;
            }
            else if (targetRow.level == 0) {
            }
            return undefined;
        };
        /**
         * Triggered when drag operation is finished
         *
         * @param {*} args
         * @param {IChartManagerDataModel} dataModel
         * @memberof ChartManagerTreeGridDragDrop
         */
        ChartManagerTreeGridDragDrop.prototype.rowDragStop = function (args, dataModel) {
            if (args.draggedRow.item instanceof chartManagerChart_1.ChartManagerChart) {
                this.dropChart(args, dataModel, args.requestType);
            }
            if (args.draggedRow.item instanceof baseSeries_1.BaseSeries) {
                this.dropSerie(args, dataModel, args.requestType);
            }
        };
        /**
         * Drop chart to selected position
         *
         * @private
         * @param {*} args
         * @param {IChartManagerDataModel} dataModel
         * @param {*} dropPosition
         * @memberof ChartManagerTreeGridDragDrop
         */
        ChartManagerTreeGridDragDrop.prototype.dropChart = function (args, dataModel, dropPosition) {
            if ((dropPosition == "insertAbove" || dropPosition == "insertBelow") && args.targetRow.level == 0) {
                dataModel.moveChart(args.draggedRow.item, args.targetRow.item, dropPosition);
            }
            else {
                args.cancel = true;
            }
        };
        /**
         * Drop serie to selected chart/scale
         *
         * @private
         * @param {*} args
         * @param {*} dataModel
         * @param {*} dropPosition
         * @memberof ChartManagerTreeGridDragDrop
         */
        ChartManagerTreeGridDragDrop.prototype.dropSerie = function (args, dataModel, dropPosition) {
            if ((dropPosition == "insertAbove" || dropPosition == "insertBelow") && args.targetRow.level == 2
                || (dropPosition == "insertAsChild" && (args.targetRow.level == 1 || args.targetRow.level == 0))) {
                var sourceChart = this._dragStartChartItem;
                var sourceAxis = args.draggedRow.parentItem.item;
                var serie = args.draggedRow.item;
                var targetAxis = this.getTargetAxisFromTragetRow(args.targetRow);
                var targetChart = this.getTargetChartFromTargetRow(args.targetRow);
                dataModel.moveSerie(sourceChart, sourceAxis, serie, targetChart, targetAxis, dropPosition);
            }
            else {
                args.cancel = true;
            }
        };
        return ChartManagerTreeGridDragDrop;
    }());
    exports.ChartManagerTreeGridDragDrop = ChartManagerTreeGridDragDrop;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRNYW5hZ2VyVHJlZUdyaWREcmFnRHJvcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jaGFydE1hbmFnZXJXaWRnZXQvdmlldy9jaGFydE1hbmFnZXJUcmVlR3JpZERyYWdEcm9wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQU1BO1FBQUE7UUE0VUEsQ0FBQztRQXhVRzs7Ozs7V0FLRztRQUNILG1EQUFZLEdBQVosVUFBYSxJQUFJO1lBQ2IsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsSUFBSSxTQUFTLEVBQUU7Z0JBQ3pDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLElBQUksQ0FBQyxFQUFFO29CQUM1QixJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztpQkFDekU7YUFDSjtpQkFDSSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxJQUFJLENBQUMsRUFBRTtnQkFDakMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQzthQUM5RDtpQkFDSSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxJQUFJLENBQUMsRUFBRTtnQkFDakMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO2FBQ25EO1FBQ0wsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gsOENBQU8sR0FBUCxVQUFRLElBQUk7WUFDUixJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxZQUFZLHFDQUFpQixFQUFFO2dCQUNuRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzNCO2lCQUNJLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLFlBQVksYUFBSyxFQUFFO2dC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R0FBRyxJQUFJLENBQUMsbUJBQXlDLENBQUM7Z0JBQ2pFLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLElBQWEsQ0FBQztnQkFDMUQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFrQixDQUFDO2dCQUUvQyxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNqRSxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNuRSxTQUFTLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUM7YUFDOUY7aUJBQ0k7Z0JBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7YUFDdEI7UUFDTCxDQUFDO1FBQ0wsbUNBQUM7SUFBRCxDQUFDLEFBNVVELElBNFVDO0lBNVVZLG9FQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYXJ0TWFuYWdlckNoYXJ0LCBDaGFydFR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9jaGFydE1hbmFnZXJDaGFydFwiO1xyXG5pbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvYmFzZVNlcmllc1wiO1xyXG5pbXBvcnQgeyBTY2FsZSB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL3NjYWxlXCI7XHJcbmltcG9ydCB7IElDaGFydE1hbmFnZXJEYXRhTW9kZWwgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2RhdGFNb2RlbHNcIjtcclxuaW1wb3J0IHsgSUNoYXJ0TWFuYWdlckNoYXJ0IH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvaW50ZXJmYWNlcy9jaGFydE1hbmFnZXJDaGFydEludGVyZmFjZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENoYXJ0TWFuYWdlclRyZWVHcmlkRHJhZ0Ryb3Age1xyXG5cclxuICAgIHByaXZhdGUgX2RyYWdTdGFydENoYXJ0SXRlbTogSUNoYXJ0TWFuYWdlckNoYXJ0IHwgdW5kZWZpbmVkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgdmFyaWFibGUgJ19kcmFnU3RhcnRDaGFydEl0ZW0nIHdoZW4gYSBkcmFnIG9wZXJhdGlvbiBpcyBzdGFydGVkXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyVHJlZUdyaWREcmFnRHJvcFxyXG4gICAgICovXHJcbiAgICByb3dEcmFnU3RhcnQoYXJncykge1xyXG4gICAgICAgIGlmIChhcmdzLmRyYWdnZWRSb3cucGFyZW50SXRlbSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgaWYgKGFyZ3MuZHJhZ2dlZFJvdy5sZXZlbCA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kcmFnU3RhcnRDaGFydEl0ZW0gPSBhcmdzLmRyYWdnZWRSb3cucGFyZW50SXRlbS5wYXJlbnRJdGVtLml0ZW07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoYXJncy5kcmFnZ2VkUm93LmxldmVsID09IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5fZHJhZ1N0YXJ0Q2hhcnRJdGVtID0gYXJncy5kcmFnZ2VkUm93LnBhcmVudEl0ZW0uaXRlbTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoYXJncy5kcmFnZ2VkUm93LmxldmVsID09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fZHJhZ1N0YXJ0Q2hhcnRJdGVtID0gYXJncy5kcmFnZ2VkUm93Lml0ZW07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIGRyb3AgaXMgcG9zc2libGUgd2hlbiBkcmFnZ2luZyBcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJUcmVlR3JpZERyYWdEcm9wXHJcbiAgICAgKi9cclxuICAgIHJvd0RyYWcoYXJncykge1xyXG4gICAgICAgIGlmIChhcmdzLmRyYWdnZWRSb3cuaXRlbSBpbnN0YW5jZW9mIENoYXJ0TWFuYWdlckNoYXJ0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FuRHJvcENoYXJ0KGFyZ3MpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChhcmdzLmRyYWdnZWRSb3cuaXRlbSBpbnN0YW5jZW9mIFNjYWxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FuRHJvcFlBeGlzKGFyZ3MpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChhcmdzLmRyYWdnZWRSb3cuaXRlbSBpbnN0YW5jZW9mIEJhc2VTZXJpZXMpIHtcclxuICAgICAgICAgICAgdGhpcy5jYW5Ecm9wU2VyaWUoYXJncyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIGNoYXJ0IGNhbiBiZSBkcm9wcGVkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlclRyZWVHcmlkRHJhZ0Ryb3BcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjYW5Ecm9wQ2hhcnQoYXJncykge1xyXG4gICAgICAgIGlmICgoYXJncy5kcm9wUG9zaXRpb24gPT0gXCJpbnNlcnRBYm92ZVwiIHx8IGFyZ3MuZHJvcFBvc2l0aW9uID09IFwiaW5zZXJ0QmVsb3dcIikgJiYgYXJncy50YXJnZXRSb3cubGV2ZWwgPT0gMCkge1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGFyZ3MuY2FuRHJvcCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiBTY2FsZSBjYW4gYmUgZHJvcHBlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJUcmVlR3JpZERyYWdEcm9wXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2FuRHJvcFlBeGlzKGFyZ3MpIHtcclxuICAgICAgICAvLyBEcmFnICYgRHJvcCBvZiBZQXhpcyBub3QgYWxsb3dlZFxyXG4gICAgICAgIGFyZ3MuY2FuRHJvcCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIFNlcmllIGNhbiBiZSBkcm9wcGVkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlclRyZWVHcmlkRHJhZ0Ryb3BcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjYW5Ecm9wU2VyaWUoYXJncykge1xyXG4gICAgICAgIGlmICgoYXJncy5kcm9wUG9zaXRpb24gPT0gXCJpbnNlcnRBYm92ZVwiIHx8IGFyZ3MuZHJvcFBvc2l0aW9uID09IFwiaW5zZXJ0QmVsb3dcIikgJiYgYXJncy50YXJnZXRSb3cubGV2ZWwgPT0gMlxyXG4gICAgICAgICAgICB8fCAoYXJncy5kcm9wUG9zaXRpb24gPT0gXCJpbnNlcnRBc0NoaWxkXCIgJiYgKGFyZ3MudGFyZ2V0Um93LmxldmVsID09IDEgfHwgYXJncy50YXJnZXRSb3cubGV2ZWwgPT0gMCkpKSB7XHJcbiAgICAgICAgICAgIGxldCB0YXJnZXRBeGlzID0gdGhpcy5nZXRUYXJnZXRBeGlzRnJvbVRyYWdldFJvdyhhcmdzLnRhcmdldFJvdyk7XHJcbiAgICAgICAgICAgIGxldCB0YXJnZXRDaGFydCA9IHRoaXMuZ2V0VGFyZ2V0Q2hhcnRGcm9tVGFyZ2V0Um93KGFyZ3MudGFyZ2V0Um93KTtcclxuICAgICAgICAgICAgaWYgKHRhcmdldENoYXJ0ICE9IHVuZGVmaW5lZCAmJiBhcmdzLmRyYWdnZWRSb3cudHlwZSAhPT0gQ2hhcnRUeXBlLlhZQ2hhcnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FuRHJvcE5vdFhZU2VyaWUoYXJncywgdGFyZ2V0QXhpcywgdGFyZ2V0Q2hhcnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRhcmdldENoYXJ0ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYW5Ecm9wWFlTZXJpZShhcmdzLCB0YXJnZXRBeGlzLCB0YXJnZXRDaGFydCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGFyZ3MuY2FuRHJvcCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiBZVCBvciBGRlQgc2VyaWUgY2FuIGJlIGRyb3BwZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAcGFyYW0geyhTY2FsZSB8IHVuZGVmaW5lZCl9IHRhcmdldEF4aXNcclxuICAgICAqIEBwYXJhbSB7SUNoYXJ0TWFuYWdlckNoYXJ0fSB0YXJnZXRDaGFydFxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlclRyZWVHcmlkRHJhZ0Ryb3BcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjYW5Ecm9wTm90WFlTZXJpZShhcmdzLCB0YXJnZXRBeGlzOiBTY2FsZSB8IHVuZGVmaW5lZCwgdGFyZ2V0Q2hhcnQ6IElDaGFydE1hbmFnZXJDaGFydCkge1xyXG4gICAgICAgIGxldCBzb3VyY2VDaGFydCA9IGFyZ3MuZHJhZ2dlZFJvdy5wYXJlbnRJdGVtLnBhcmVudEl0ZW0uaXRlbTtcclxuICAgICAgICBsZXQgc291cmNlQXhpcyA9IGFyZ3MuZHJhZ2dlZFJvdy5wYXJlbnRJdGVtLml0ZW07XHJcbiAgICAgICAgbGV0IHNlcmllID0gYXJncy5kcmFnZ2VkUm93Lml0ZW0gYXMgQmFzZVNlcmllcztcclxuICAgICAgICBsZXQgc2VyaWVzID0gbmV3IEFycmF5PEJhc2VTZXJpZXM+KCk7XHJcbiAgICAgICAgc2VyaWVzLnB1c2goc2VyaWUpO1xyXG4gICAgICAgIGlmICh0YXJnZXRBeGlzID09IHNvdXJjZUF4aXMpIHsgLy8gQXZvaWQgbW92aW5nIG9mIHNlcmllcyB3aXRoaW4gYW4gYXhpc1xyXG4gICAgICAgICAgICBhcmdzLmNhbkRyb3AgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoYXJncy5kcmFnZ2VkUm93LnBhcmVudEl0ZW0ucGFyZW50SXRlbS5jaGFydFR5cGUgIT09IHRhcmdldENoYXJ0LmNoYXJ0VHlwZSB8fFxyXG4gICAgICAgICAgICAodGFyZ2V0Q2hhcnQgIT0gc291cmNlQ2hhcnQgJiYgdGFyZ2V0Q2hhcnQuaGFzU2VyaWVzKHNlcmllcykpKSB7XHJcbiAgICAgICAgICAgIGFyZ3MuY2FuRHJvcCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChhcmdzLnRhcmdldFJvdy5sZXZlbCA9PSAwKSB7XHJcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIGEgbmV3IGF4aXMgY2FuIGJlIGFkZGVkIChkcmFnIGFuZCBkcm9wIG9mIGEgc2VyaWUgdG8gYSBjaGFydClcclxuICAgICAgICAgICAgaWYgKCF0YXJnZXRDaGFydC5jYW5BZGRZQXhpcygpKSB7XHJcbiAgICAgICAgICAgICAgICBhcmdzLmNhbkRyb3AgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiBYWSBzZXJpZSBjYW4gYmUgZHJvcHBlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBwYXJhbSB7KFNjYWxlIHwgdW5kZWZpbmVkKX0gdGFyZ2V0QXhpc1xyXG4gICAgICogQHBhcmFtIHtJQ2hhcnRNYW5hZ2VyQ2hhcnR9IHRhcmdldENoYXJ0XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyVHJlZUdyaWREcmFnRHJvcFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNhbkRyb3BYWVNlcmllKGFyZ3MsIHRhcmdldEF4aXM6IFNjYWxlIHwgdW5kZWZpbmVkLCB0YXJnZXRDaGFydDogSUNoYXJ0TWFuYWdlckNoYXJ0KSB7XHJcbiAgICAgICAgbGV0IHNvdXJjZUNoYXJ0ID0gYXJncy5kcmFnZ2VkUm93LnBhcmVudEl0ZW0ucGFyZW50SXRlbS5pdGVtO1xyXG4gICAgICAgIGxldCBzb3VyY2VBeGlzID0gYXJncy5kcmFnZ2VkUm93LnBhcmVudEl0ZW0uaXRlbTtcclxuICAgICAgICBsZXQgc2VyaWUgPSBhcmdzLmRyYWdnZWRSb3cuaXRlbSBhcyBCYXNlU2VyaWVzO1xyXG4gICAgICAgIGxldCBzZXJpZXMgPSBuZXcgQXJyYXk8QmFzZVNlcmllcz4oKTtcclxuICAgICAgICBzZXJpZXMucHVzaChzZXJpZSk7XHJcbiAgICAgICAgaWYgKHRhcmdldEF4aXMgPT0gc291cmNlQXhpcyB8fCBzb3VyY2VDaGFydCA9PSB0YXJnZXRDaGFydCkgeyAvLyBBdm9pZCBtb3Zpbmcgb2Ygc2VyaWVzIHdpdGhpbiBzYW1lIGF4aXNcclxuICAgICAgICAgICAgYXJncy5jYW5Ecm9wID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGFyZ3MuZHJhZ2dlZFJvdy5wYXJlbnRJdGVtLnBhcmVudEl0ZW0uY2hhcnRUeXBlICE9PSB0YXJnZXRDaGFydC5jaGFydFR5cGUgfHxcclxuICAgICAgICAgICAgKHRhcmdldENoYXJ0ICE9IHNvdXJjZUNoYXJ0ICYmIHRhcmdldENoYXJ0Lmhhc1NlcmllcyhzZXJpZXMpKSkge1xyXG4gICAgICAgICAgICBhcmdzLmNhbkRyb3AgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUcmlnZ2VyZWQgd2hlbiBkcm9wIGFjdGlvbiBpcyBkb25lXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAcGFyYW0ge0lDaGFydE1hbmFnZXJEYXRhTW9kZWx9IGRhdGFNb2RlbFxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlclRyZWVHcmlkRHJhZ0Ryb3BcclxuICAgICAqL1xyXG4gICAgcm93RHJvcEFjdGlvbkJlZ2luKGFyZ3MsIGRhdGFNb2RlbDogSUNoYXJ0TWFuYWdlckRhdGFNb2RlbCkge1xyXG4gICAgICAgIGxldCBkcm9wUG9zaXRpb24gPSBhcmdzLmRyb3BQb3NpdGlvbjtcclxuICAgICAgICBpZiAoKGRyb3BQb3NpdGlvbiA9PSBcImluc2VydEFib3ZlXCIgfHwgZHJvcFBvc2l0aW9uID09IFwiaW5zZXJ0QmVsb3dcIikgJiYgYXJncy50YXJnZXRSb3cubGV2ZWwgPT0gMlxyXG4gICAgICAgICAgICB8fCAoZHJvcFBvc2l0aW9uID09IFwiaW5zZXJ0QXNDaGlsZFwiICYmIChhcmdzLnRhcmdldFJvdy5sZXZlbCA9PSAxIHx8IGFyZ3MudGFyZ2V0Um93LmxldmVsID09IDApKSkge1xyXG4gICAgICAgICAgICBsZXQgdGFyZ2V0QXhpcyA9IHRoaXMuZ2V0VGFyZ2V0QXhpc0Zyb21UcmFnZXRSb3coYXJncy50YXJnZXRSb3cpO1xyXG4gICAgICAgICAgICBsZXQgdGFyZ2V0Q2hhcnQgPSB0aGlzLmdldFRhcmdldENoYXJ0RnJvbVRhcmdldFJvdyhhcmdzLnRhcmdldFJvdyk7XHJcbiAgICAgICAgICAgIGlmIChhcmdzLmRyYWdnZWRSb3cudHlwZSAhPT0gQ2hhcnRUeXBlLlhZQ2hhcnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuTm90WFlyb3dEcm9wQWN0aW9uKGFyZ3MsIGRhdGFNb2RlbCwgdGFyZ2V0QXhpcywgdGFyZ2V0Q2hhcnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5YWXJvd0Ryb3BBY3Rpb24oYXJncywgZGF0YU1vZGVsLCB0YXJnZXRBeGlzLCB0YXJnZXRDaGFydCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIERyb3AgWVQgb3IgRkZUIHNlcmllIGludG8gdGhlIHRhcmdldCBjaGFydCBcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAcGFyYW0ge0lDaGFydE1hbmFnZXJEYXRhTW9kZWx9IGRhdGFNb2RlbFxyXG4gICAgICogQHBhcmFtIHsoU2NhbGUgfCB1bmRlZmluZWQpfSB0YXJnZXRBeGlzXHJcbiAgICAgKiBAcGFyYW0geyhJQ2hhcnRNYW5hZ2VyQ2hhcnQgfCB1bmRlZmluZWQpfSB0YXJnZXRDaGFydFxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlclRyZWVHcmlkRHJhZ0Ryb3BcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBOb3RYWXJvd0Ryb3BBY3Rpb24oYXJncywgZGF0YU1vZGVsOiBJQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsLCB0YXJnZXRBeGlzOiBTY2FsZSB8IHVuZGVmaW5lZCwgdGFyZ2V0Q2hhcnQ6IElDaGFydE1hbmFnZXJDaGFydCB8IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGlmICh0YXJnZXRBeGlzID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAvLyBIYW5kbGUgZHJhZyBvZiBzZXJpZSB0byBjaGFydFxyXG4gICAgICAgICAgICBsZXQgc291cmNlQ2hhcnQgPSB0aGlzLl9kcmFnU3RhcnRDaGFydEl0ZW07XHJcbiAgICAgICAgICAgIGlmIChzb3VyY2VDaGFydCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBzZXJpZSA9IGFyZ3MuZHJhZ2dlZFJvdy5pdGVtIGFzIEJhc2VTZXJpZXM7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2VyaWVzID0gbmV3IEFycmF5PEJhc2VTZXJpZXM+KCk7XHJcbiAgICAgICAgICAgICAgICBzZXJpZXMucHVzaChzZXJpZSk7XHJcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgc2VyaWUgZnJvbSBzb3VyY2UgY2hhcnRcclxuICAgICAgICAgICAgICAgIGRhdGFNb2RlbC5yZW1vdmVTZXJpZShzb3VyY2VDaGFydCwgc2VyaWUpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBuZXcgYXhpcyBhbmQgYWRkIHNlcmllIHRvIHRhcmdldCBjaGFydFxyXG4gICAgICAgICAgICAgICAgbGV0IGF4aXNOYW1lID0gdGFyZ2V0Q2hhcnQhLmdldE5leHRZQXhpc0lkKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgeUF4aXMgPSBuZXcgU2NhbGUoYXhpc05hbWUsIHRhcmdldENoYXJ0ISk7XHJcbiAgICAgICAgICAgICAgICBkYXRhTW9kZWwuYWRkWVNjYWxlKHRhcmdldENoYXJ0ISwgeUF4aXMpO1xyXG4gICAgICAgICAgICAgICAgZGF0YU1vZGVsLmFkZFNlcmllc1RvQ2hhcnQodGFyZ2V0Q2hhcnQhLCBzZXJpZXMsIHlBeGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhcmdzLmNhbmNlbCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRHJvcCBYWSBzZXJpZSBpbnRvIHRoZSB0YXJnZXQgY2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAcGFyYW0ge0lDaGFydE1hbmFnZXJEYXRhTW9kZWx9IGRhdGFNb2RlbFxyXG4gICAgICogQHBhcmFtIHsoU2NhbGUgfCB1bmRlZmluZWQpfSB0YXJnZXRTY2FsZVxyXG4gICAgICogQHBhcmFtIHsoSUNoYXJ0TWFuYWdlckNoYXJ0IHwgdW5kZWZpbmVkKX0gdGFyZ2V0Q2hhcnRcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJUcmVlR3JpZERyYWdEcm9wXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgWFlyb3dEcm9wQWN0aW9uKGFyZ3MsIGRhdGFNb2RlbDogSUNoYXJ0TWFuYWdlckRhdGFNb2RlbCwgdGFyZ2V0U2NhbGU6IFNjYWxlIHwgdW5kZWZpbmVkLCB0YXJnZXRDaGFydDogSUNoYXJ0TWFuYWdlckNoYXJ0IHwgdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgaWYgKHRhcmdldFNjYWxlID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAvLyBIYW5kbGUgZHJhZyBvZiBzZXJpZSB0byBjaGFydFxyXG4gICAgICAgICAgICBsZXQgc291cmNlQ2hhcnQgPSB0aGlzLl9kcmFnU3RhcnRDaGFydEl0ZW07XHJcbiAgICAgICAgICAgIGlmIChzb3VyY2VDaGFydCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBzZXJpZSA9IGFyZ3MuZHJhZ2dlZFJvdy5pdGVtIGFzIEJhc2VTZXJpZXM7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2VyaWVzID0gbmV3IEFycmF5PEJhc2VTZXJpZXM+KCk7XHJcbiAgICAgICAgICAgICAgICBzZXJpZXMucHVzaChzZXJpZSk7XHJcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgc2VyaWUgZnJvbSBzb3VyY2UgY2hhcnRcclxuICAgICAgICAgICAgICAgIGRhdGFNb2RlbC5yZW1vdmVTZXJpZShzb3VyY2VDaGFydCwgc2VyaWUpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEFkZCBzZXJpZSB0byB0YXJnZXQgY2hhcnRcclxuICAgICAgICAgICAgICAgIGxldCBzY2FsZU5hbWUgPSB0YXJnZXRDaGFydCEuZ2V0RGVmYXVsdFlBeGlzSWQoKTtcclxuICAgICAgICAgICAgICAgIGxldCB5U2NhbGUgPSB0YXJnZXRDaGFydCEuZ2V0WVNjYWxlKHNjYWxlTmFtZSk7XHJcbiAgICAgICAgICAgICAgICBkYXRhTW9kZWwuYWRkU2VyaWVzVG9DaGFydCh0YXJnZXRDaGFydCEsIHNlcmllcywgeVNjYWxlISk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGFyZ2V0IGNoYXJ0IGZyb20gcm93XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gdGFyZ2V0Um93XHJcbiAgICAgKiBAcmV0dXJucyB7KElDaGFydE1hbmFnZXJDaGFydCB8IHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyVHJlZUdyaWREcmFnRHJvcFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFRhcmdldENoYXJ0RnJvbVRhcmdldFJvdyh0YXJnZXRSb3c6IGFueSk6IElDaGFydE1hbmFnZXJDaGFydCB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgaWYgKHRhcmdldFJvdy5sZXZlbCA9PSAyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0YXJnZXRSb3cucGFyZW50SXRlbS5wYXJlbnRJdGVtLml0ZW0gYXMgSUNoYXJ0TWFuYWdlckNoYXJ0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0YXJnZXRSb3cubGV2ZWwgPT0gMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0Um93LnBhcmVudEl0ZW0uaXRlbSBhcyBJQ2hhcnRNYW5hZ2VyQ2hhcnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRhcmdldFJvdy5sZXZlbCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0YXJnZXRSb3cuaXRlbSBhcyBJQ2hhcnRNYW5hZ2VyQ2hhcnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGFyZ2V0IGF4aXMgZnJvbSByb3dcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSB0YXJnZXRSb3dcclxuICAgICAqIEByZXR1cm5zIHsoU2NhbGUgfCB1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlclRyZWVHcmlkRHJhZ0Ryb3BcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUYXJnZXRBeGlzRnJvbVRyYWdldFJvdyh0YXJnZXRSb3c6IGFueSk6IFNjYWxlIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICBpZiAodGFyZ2V0Um93LmxldmVsID09IDIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRhcmdldFJvdy5wYXJlbnRJdGVtLml0ZW0gYXMgU2NhbGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRhcmdldFJvdy5sZXZlbCA9PSAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0YXJnZXRSb3cuaXRlbSBhcyBTY2FsZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGFyZ2V0Um93LmxldmVsID09IDApIHtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUcmlnZ2VyZWQgd2hlbiBkcmFnIG9wZXJhdGlvbiBpcyBmaW5pc2hlZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQHBhcmFtIHtJQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsfSBkYXRhTW9kZWxcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJUcmVlR3JpZERyYWdEcm9wXHJcbiAgICAgKi9cclxuICAgIHJvd0RyYWdTdG9wKGFyZ3MsIGRhdGFNb2RlbDogSUNoYXJ0TWFuYWdlckRhdGFNb2RlbCkge1xyXG4gICAgICAgIGlmIChhcmdzLmRyYWdnZWRSb3cuaXRlbSBpbnN0YW5jZW9mIENoYXJ0TWFuYWdlckNoYXJ0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJvcENoYXJ0KGFyZ3MsIGRhdGFNb2RlbCwgYXJncy5yZXF1ZXN0VHlwZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhcmdzLmRyYWdnZWRSb3cuaXRlbSBpbnN0YW5jZW9mIEJhc2VTZXJpZXMpIHtcclxuICAgICAgICAgICAgdGhpcy5kcm9wU2VyaWUoYXJncywgZGF0YU1vZGVsLCBhcmdzLnJlcXVlc3RUeXBlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEcm9wIGNoYXJ0IHRvIHNlbGVjdGVkIHBvc2l0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQHBhcmFtIHtJQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsfSBkYXRhTW9kZWxcclxuICAgICAqIEBwYXJhbSB7Kn0gZHJvcFBvc2l0aW9uXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyVHJlZUdyaWREcmFnRHJvcFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRyb3BDaGFydChhcmdzLCBkYXRhTW9kZWw6IElDaGFydE1hbmFnZXJEYXRhTW9kZWwsIGRyb3BQb3NpdGlvbikge1xyXG4gICAgICAgIGlmICgoZHJvcFBvc2l0aW9uID09IFwiaW5zZXJ0QWJvdmVcIiB8fCBkcm9wUG9zaXRpb24gPT0gXCJpbnNlcnRCZWxvd1wiKSAmJiBhcmdzLnRhcmdldFJvdy5sZXZlbCA9PSAwKSB7XHJcbiAgICAgICAgICAgIGRhdGFNb2RlbCEubW92ZUNoYXJ0KGFyZ3MuZHJhZ2dlZFJvdy5pdGVtLCBhcmdzLnRhcmdldFJvdy5pdGVtLCBkcm9wUG9zaXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYXJncy5jYW5jZWwgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERyb3Agc2VyaWUgdG8gc2VsZWN0ZWQgY2hhcnQvc2NhbGVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAcGFyYW0geyp9IGRhdGFNb2RlbFxyXG4gICAgICogQHBhcmFtIHsqfSBkcm9wUG9zaXRpb25cclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJUcmVlR3JpZERyYWdEcm9wXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZHJvcFNlcmllKGFyZ3MsIGRhdGFNb2RlbCwgZHJvcFBvc2l0aW9uKSB7XHJcbiAgICAgICAgaWYgKChkcm9wUG9zaXRpb24gPT0gXCJpbnNlcnRBYm92ZVwiIHx8IGRyb3BQb3NpdGlvbiA9PSBcImluc2VydEJlbG93XCIpICYmIGFyZ3MudGFyZ2V0Um93LmxldmVsID09IDJcclxuICAgICAgICAgICAgfHwgKGRyb3BQb3NpdGlvbiA9PSBcImluc2VydEFzQ2hpbGRcIiAmJiAoYXJncy50YXJnZXRSb3cubGV2ZWwgPT0gMSB8fCBhcmdzLnRhcmdldFJvdy5sZXZlbCA9PSAwKSkpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBzb3VyY2VDaGFydCA9IHRoaXMuX2RyYWdTdGFydENoYXJ0SXRlbSBhcyBJQ2hhcnRNYW5hZ2VyQ2hhcnQ7XHJcbiAgICAgICAgICAgIGxldCBzb3VyY2VBeGlzID0gYXJncy5kcmFnZ2VkUm93LnBhcmVudEl0ZW0uaXRlbSBhcyBTY2FsZTtcclxuICAgICAgICAgICAgbGV0IHNlcmllID0gYXJncy5kcmFnZ2VkUm93Lml0ZW0gYXMgQmFzZVNlcmllcztcclxuXHJcbiAgICAgICAgICAgIGxldCB0YXJnZXRBeGlzID0gdGhpcy5nZXRUYXJnZXRBeGlzRnJvbVRyYWdldFJvdyhhcmdzLnRhcmdldFJvdyk7XHJcbiAgICAgICAgICAgIGxldCB0YXJnZXRDaGFydCA9IHRoaXMuZ2V0VGFyZ2V0Q2hhcnRGcm9tVGFyZ2V0Um93KGFyZ3MudGFyZ2V0Um93KTtcclxuICAgICAgICAgICAgZGF0YU1vZGVsLm1vdmVTZXJpZShzb3VyY2VDaGFydCwgc291cmNlQXhpcywgc2VyaWUsIHRhcmdldENoYXJ0LCB0YXJnZXRBeGlzLCBkcm9wUG9zaXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYXJncy5jYW5jZWwgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==