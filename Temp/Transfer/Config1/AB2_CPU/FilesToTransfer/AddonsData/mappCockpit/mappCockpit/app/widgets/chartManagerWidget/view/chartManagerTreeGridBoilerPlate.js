define(["require", "exports", "../../../models/chartManagerDataModel/chartManagerChart", "../../../models/chartManagerDataModel/chartManagerChart", "../../../models/chartManagerDataModel/scale"], function (require, exports, chartManagerChart_1, chartManagerChart_2, scale_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ChartManagerTreeGridBoilerPlate = /** @class */ (function () {
        function ChartManagerTreeGridBoilerPlate(dataModel, parentId) {
            this._toolbarIdAdd = "Add";
            this.isOpened = false;
            this.ytChartBoilerPlate = "YTChart_Choose_Btn_Boilerplate";
            this.xyChartBoilerPlate = "XYChart_Choose_Btn_Boilerplate";
            this.fftChartBoilerPlate = "FFTChart_Choose_Btn_Boilerplate";
            this.axisChartBoilerPlate = "YTAxis_Choose_Btn_Boilerplate";
            this.dataModel = dataModel;
            this.parentId = parentId;
        }
        /**
         * Show dropdown menu
         *
         * @param {(IChartManagerChart | undefined)} selectedChart
         * @memberof ChartManagerTreeGridBoilerPlate
         */
        ChartManagerTreeGridBoilerPlate.prototype.showBoilerplate = function (selectedChart) {
            var axisAvailable;
            var canAddChart = this.dataModel.canAddChart();
            if (selectedChart !== undefined && selectedChart.canAddYAxis()) {
                axisAvailable = true;
            }
            else {
                axisAvailable = false;
            }
            this.createBoilerPlate();
            this.createButton(this.ytChartBoilerPlate, "Add YT Chart", canAddChart, undefined);
            this.createButton(this.xyChartBoilerPlate, "Add XY Chart", canAddChart, undefined);
            this.createButton(this.fftChartBoilerPlate, "Add FFT Chart", canAddChart, undefined);
            this.createButton(this.axisChartBoilerPlate, "Add scale to chart", axisAvailable, selectedChart);
            this.isOpened = true;
        };
        /**
         * Create the html element
         *
         * @private
         * @memberof ChartManagerTreeGridBoilerPlate
         */
        ChartManagerTreeGridBoilerPlate.prototype.createBoilerPlate = function () {
            this.boilerplate = $('<div style="height:120px;width:130px;background-color:transparent;position:absolute;top: 63px;">' +
                '<button id="' + this.ytChartBoilerPlate + '" />' +
                '<button id="' + this.xyChartBoilerPlate + '"/>' +
                '<button id="' + this.fftChartBoilerPlate + '"/>' +
                '<button id="' + this.axisChartBoilerPlate + '"/>' +
                '</div>');
            $(this.parentId).append(this.boilerplate[0]);
            this.removeEventListenerForBoilerplate = this.removeEventListenerForBoilerplate.bind(this);
            document.addEventListener('mousedown', this.removeEventListenerForBoilerplate);
        };
        /**
         * Create syncf button
         *
         * @private
         * @param {string} id
         * @param {string} text
         * @param {boolean} enabled
         * @param {(IChartManagerChart | undefined)} chart
         * @memberof ChartManagerTreeGridBoilerPlate
         */
        ChartManagerTreeGridBoilerPlate.prototype.createButton = function (id, text, enabled, chart) {
            var _this = this;
            $('#' + id).ejButton({
                text: text,
                contentType: ej.ContentType.TextOnly,
                cssClass: "boilerPlate",
                prefixIcon: "e-icon",
                enabled: enabled,
                click: function (args) {
                    switch (id) {
                        case _this.ytChartBoilerPlate:
                            _this.addChart(chartManagerChart_2.ChartType.YTChart);
                            break;
                        case _this.xyChartBoilerPlate:
                            _this.addChart(chartManagerChart_2.ChartType.XYChart);
                            break;
                        case _this.fftChartBoilerPlate:
                            _this.addChart(chartManagerChart_2.ChartType.FFTChart);
                            break;
                        case _this.axisChartBoilerPlate:
                            _this.addANewYAxisToChart(chart);
                            break;
                    }
                    _this.hideBoilerplate();
                }
            });
        };
        /**
         * Add an empty chart
         *
         * @private
         * @param {ChartType} type
         * @memberof ChartManagerTreeGridBoilerPlate
         */
        ChartManagerTreeGridBoilerPlate.prototype.addChart = function (type) {
            var newChart = new chartManagerChart_1.ChartManagerChart(this.dataModel.getUniqueChartName(), type);
            this.dataModel.addChart(newChart, 0);
        };
        /**
         * Add a new y axis to a chart
         *
         * @private
         * @param {IChartManagerChart} selectedChart
         * @memberof ChartManagerTreeGridBoilerPlate
         */
        ChartManagerTreeGridBoilerPlate.prototype.addANewYAxisToChart = function (selectedChart) {
            var yAxis = new scale_1.Scale(selectedChart.getNextYAxisId(), selectedChart);
            selectedChart.addYScale(yAxis);
            this.dataModel.addYScale(selectedChart, yAxis);
        };
        /**
         * Remove event listener when 'mousedown' is triggered
         *
         * @private
         * @param {*} e
         * @memberof ChartManagerTreeGridBoilerPlate
         */
        ChartManagerTreeGridBoilerPlate.prototype.removeEventListenerForBoilerplate = function (e) {
            if (![this.xyChartBoilerPlate, this.ytChartBoilerPlate, this.fftChartBoilerPlate, this.axisChartBoilerPlate].includes(e.target.id) &&
                !['#' + e.target.parentElement.id, '#' + e.target.id].includes(this.parentId + '_' + this._toolbarIdAdd)) {
                this.hideBoilerplate();
            }
        };
        /**
         * Hide the dropdown menu
         *
         * @memberof ChartManagerTreeGridBoilerPlate
         */
        ChartManagerTreeGridBoilerPlate.prototype.hideBoilerplate = function () {
            document.removeEventListener('mousedown', this.removeEventListenerForBoilerplate);
            this.boilerplate.remove();
            this.isOpened = false;
        };
        return ChartManagerTreeGridBoilerPlate;
    }());
    exports.ChartManagerTreeGridBoilerPlate = ChartManagerTreeGridBoilerPlate;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRNYW5hZ2VyVHJlZUdyaWRCb2lsZXJQbGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jaGFydE1hbmFnZXJXaWRnZXQvdmlldy9jaGFydE1hbmFnZXJUcmVlR3JpZEJvaWxlclBsYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQU1BO1FBYUkseUNBQVksU0FBaUMsRUFBRSxRQUFnQjtZQVg5QyxrQkFBYSxHQUFFLEtBQUssQ0FBQztZQUkvQixhQUFRLEdBQVksS0FBSyxDQUFDO1lBQ2hCLHVCQUFrQixHQUFJLGdDQUFnQyxDQUFDO1lBQ3ZELHVCQUFrQixHQUFHLGdDQUFnQyxDQUFDO1lBQ3RELHdCQUFtQixHQUFHLGlDQUFpQyxDQUFDO1lBQ3hELHlCQUFvQixHQUFHLCtCQUErQixDQUFDO1lBSXBFLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1lBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQzdCLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNJLHlEQUFlLEdBQXRCLFVBQXdCLGFBQTZDO1lBQ2pFLElBQUksYUFBc0IsQ0FBQztZQUMzQixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBRS9DLElBQUksYUFBYSxLQUFLLFNBQVMsSUFBSSxhQUFhLENBQUMsV0FBVyxFQUFFLEVBQUM7Z0JBQzNELGFBQWEsR0FBRyxJQUFJLENBQUM7YUFDeEI7aUJBQU07Z0JBQ0gsYUFBYSxHQUFHLEtBQUssQ0FBQzthQUN6QjtZQUVELElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLGNBQWMsRUFBRSxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDbkYsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsa0JBQWtC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SSxhQUFLLENBQUMsYUFBYSxDQUFDLGNBQWMsRUFBRSxFQUFFLGFBQWEsQ0FBQyxDQUFBO1lBQ3BFLGFBQWEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ25ELENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSywyRUFBaUMsR0FBekMsVUFBMkMsQ0FBQztZQUN4QyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7Z0JBQzlILENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUU7Z0JBQzFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQzthQUMxQjtRQUNMLENBQUM7UUFFRDs7OztXQUlHO1FBQ0kseURBQWUsR0FBdEI7WUFDSSxRQUFRLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1lBQ2xGLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDMUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDMUIsQ0FBQztRQUNMLHNDQUFDO0lBQUQsQ0FBQyxBQXBKRCxJQW9KQztJQXBKWSwwRUFBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFydE1hbmFnZXJDaGFydCB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2NoYXJ0TWFuYWdlckNoYXJ0XCI7XHJcbmltcG9ydCB7IElDaGFydE1hbmFnZXJDaGFydCB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2ludGVyZmFjZXMvY2hhcnRNYW5hZ2VyQ2hhcnRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ2hhcnRUeXBlIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvY2hhcnRNYW5hZ2VyQ2hhcnRcIlxyXG5pbXBvcnQgeyBTY2FsZSB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL3NjYWxlXCI7XHJcbmltcG9ydCB7IElDaGFydE1hbmFnZXJEYXRhTW9kZWwgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9pbnRlcmZhY2VzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbEludGVyZmFjZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENoYXJ0TWFuYWdlclRyZWVHcmlkQm9pbGVyUGxhdGV7XHJcbiAgICBcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3Rvb2xiYXJJZEFkZCA9XCJBZGRcIjtcclxuICAgIHByaXZhdGUgZGF0YU1vZGVsOiBJQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsO1xyXG4gICAgcHJpdmF0ZSBwYXJlbnRJZDogc3RyaW5nO1xyXG5cclxuICAgIHB1YmxpYyBpc09wZW5lZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSB5dENoYXJ0Qm9pbGVyUGxhdGUgPSAgXCJZVENoYXJ0X0Nob29zZV9CdG5fQm9pbGVycGxhdGVcIjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgeHlDaGFydEJvaWxlclBsYXRlID0gXCJYWUNoYXJ0X0Nob29zZV9CdG5fQm9pbGVycGxhdGVcIjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgZmZ0Q2hhcnRCb2lsZXJQbGF0ZSA9IFwiRkZUQ2hhcnRfQ2hvb3NlX0J0bl9Cb2lsZXJwbGF0ZVwiO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBheGlzQ2hhcnRCb2lsZXJQbGF0ZSA9IFwiWVRBeGlzX0Nob29zZV9CdG5fQm9pbGVycGxhdGVcIjtcclxuICAgIHByaXZhdGUgYm9pbGVycGxhdGUhOiBKUXVlcnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZGF0YU1vZGVsOiBJQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsLCBwYXJlbnRJZDogc3RyaW5nKXtcclxuICAgICAgICB0aGlzLmRhdGFNb2RlbCA9IGRhdGFNb2RlbDtcclxuICAgICAgICB0aGlzLnBhcmVudElkID0gcGFyZW50SWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTaG93IGRyb3Bkb3duIG1lbnVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyhJQ2hhcnRNYW5hZ2VyQ2hhcnQgfCB1bmRlZmluZWQpfSBzZWxlY3RlZENoYXJ0XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyVHJlZUdyaWRCb2lsZXJQbGF0ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2hvd0JvaWxlcnBsYXRlIChzZWxlY3RlZENoYXJ0OiBJQ2hhcnRNYW5hZ2VyQ2hhcnQgfCB1bmRlZmluZWQpIHtcclxuICAgICAgICBsZXQgYXhpc0F2YWlsYWJsZTogYm9vbGVhbjtcclxuICAgICAgICBsZXQgY2FuQWRkQ2hhcnQgPSB0aGlzLmRhdGFNb2RlbC5jYW5BZGRDaGFydCgpO1xyXG5cclxuICAgICAgICBpZiAoc2VsZWN0ZWRDaGFydCAhPT0gdW5kZWZpbmVkICYmIHNlbGVjdGVkQ2hhcnQuY2FuQWRkWUF4aXMoKSl7XHJcbiAgICAgICAgICAgIGF4aXNBdmFpbGFibGUgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGF4aXNBdmFpbGFibGUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY3JlYXRlQm9pbGVyUGxhdGUoKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZUJ1dHRvbih0aGlzLnl0Q2hhcnRCb2lsZXJQbGF0ZSwgXCJBZGQgWVQgQ2hhcnRcIiwgY2FuQWRkQ2hhcnQsIHVuZGVmaW5lZCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVCdXR0b24odGhpcy54eUNoYXJ0Qm9pbGVyUGxhdGUsIFwiQWRkIFhZIENoYXJ0XCIsIGNhbkFkZENoYXJ0LCB1bmRlZmluZWQpO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlQnV0dG9uKHRoaXMuZmZ0Q2hhcnRCb2lsZXJQbGF0ZSwgXCJBZGQgRkZUIENoYXJ0XCIsIGNhbkFkZENoYXJ0LCB1bmRlZmluZWQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuY3JlYXRlQnV0dG9uKHRoaXMuYXhpc0NoYXJ0Qm9pbGVyUGxhdGUsIFwiQWRkIHNjYWxlIHRvIGNoYXJ0XCIsIGF4aXNBdmFpbGFibGUsIHNlbGVjdGVkQ2hhcnQpO1xyXG5cclxuICAgICAgICB0aGlzLmlzT3BlbmVkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSB0aGUgaHRtbCBlbGVtZW50XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJUcmVlR3JpZEJvaWxlclBsYXRlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlQm9pbGVyUGxhdGUoKXtcclxuICAgICAgICB0aGlzLmJvaWxlcnBsYXRlID0gJCgnPGRpdiBzdHlsZT1cImhlaWdodDoxMjBweDt3aWR0aDoxMzBweDtiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50O3Bvc2l0aW9uOmFic29sdXRlO3RvcDogNjNweDtcIj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIGlkPVwiJyArIHRoaXMueXRDaGFydEJvaWxlclBsYXRlICsgJ1wiIC8+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gaWQ9XCInICsgdGhpcy54eUNoYXJ0Qm9pbGVyUGxhdGUgKyAnXCIvPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIGlkPVwiJyArIHRoaXMuZmZ0Q2hhcnRCb2lsZXJQbGF0ZSArICdcIi8+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gaWQ9XCInICsgdGhpcy5heGlzQ2hhcnRCb2lsZXJQbGF0ZSArICdcIi8+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+Jyk7XHJcbiAgICAgICAgJCh0aGlzLnBhcmVudElkKS5hcHBlbmQodGhpcy5ib2lsZXJwbGF0ZVswXSk7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyRm9yQm9pbGVycGxhdGUgPSB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXJGb3JCb2lsZXJwbGF0ZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lckZvckJvaWxlcnBsYXRlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBzeW5jZiBidXR0b25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBlbmFibGVkXHJcbiAgICAgKiBAcGFyYW0geyhJQ2hhcnRNYW5hZ2VyQ2hhcnQgfCB1bmRlZmluZWQpfSBjaGFydFxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlclRyZWVHcmlkQm9pbGVyUGxhdGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVCdXR0b24oaWQ6IHN0cmluZywgdGV4dDogc3RyaW5nLCBlbmFibGVkOiBib29sZWFuLCBjaGFydDogSUNoYXJ0TWFuYWdlckNoYXJ0IHwgdW5kZWZpbmVkKXtcclxuICAgICAgICAkKCcjJyArIGlkKS5lakJ1dHRvbih7XHJcbiAgICAgICAgICAgIHRleHQ6IHRleHQsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBlai5Db250ZW50VHlwZS5UZXh0T25seSxcclxuICAgICAgICAgICAgY3NzQ2xhc3M6IFwiYm9pbGVyUGxhdGVcIixcclxuICAgICAgICAgICAgcHJlZml4SWNvbjogXCJlLWljb25cIiAsLy9TcGVjaWZpZXMgdGhlIHByaW1hcnkgaWNvbiBmb3IgQnV0dG9uXHJcbiAgICAgICAgICAgIGVuYWJsZWQ6IGVuYWJsZWQsXHJcbiAgICAgICAgICAgIGNsaWNrOiAoYXJncykgPT4ge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChpZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0aGlzLnl0Q2hhcnRCb2lsZXJQbGF0ZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRDaGFydChDaGFydFR5cGUuWVRDaGFydCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdGhpcy54eUNoYXJ0Qm9pbGVyUGxhdGU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2hhcnQoQ2hhcnRUeXBlLlhZQ2hhcnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHRoaXMuZmZ0Q2hhcnRCb2lsZXJQbGF0ZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRDaGFydChDaGFydFR5cGUuRkZUQ2hhcnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHRoaXMuYXhpc0NoYXJ0Qm9pbGVyUGxhdGU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQU5ld1lBeGlzVG9DaGFydChjaGFydCEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlQm9pbGVycGxhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIGFuIGVtcHR5IGNoYXJ0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Q2hhcnRUeXBlfSB0eXBlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyVHJlZUdyaWRCb2lsZXJQbGF0ZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZENoYXJ0ICh0eXBlOiBDaGFydFR5cGUpIHtcclxuICAgICAgICB2YXIgbmV3Q2hhcnQgPSBuZXcgQ2hhcnRNYW5hZ2VyQ2hhcnQodGhpcy5kYXRhTW9kZWwhLmdldFVuaXF1ZUNoYXJ0TmFtZSgpLCB0eXBlKTtcclxuICAgICAgICB0aGlzLmRhdGFNb2RlbC5hZGRDaGFydChuZXdDaGFydCwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgYSBuZXcgeSBheGlzIHRvIGEgY2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtJQ2hhcnRNYW5hZ2VyQ2hhcnR9IHNlbGVjdGVkQ2hhcnRcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJUcmVlR3JpZEJvaWxlclBsYXRlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkQU5ld1lBeGlzVG9DaGFydCAoc2VsZWN0ZWRDaGFydDogSUNoYXJ0TWFuYWdlckNoYXJ0KSB7XHJcbiAgICAgICAgbGV0IHlBeGlzID0gbmV3IFNjYWxlKHNlbGVjdGVkQ2hhcnQuZ2V0TmV4dFlBeGlzSWQoKSwgc2VsZWN0ZWRDaGFydClcclxuICAgICAgICBzZWxlY3RlZENoYXJ0LmFkZFlTY2FsZSh5QXhpcyk7XHJcbiAgICAgICAgdGhpcy5kYXRhTW9kZWwuYWRkWVNjYWxlKHNlbGVjdGVkQ2hhcnQsIHlBeGlzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZSBldmVudCBsaXN0ZW5lciB3aGVuICdtb3VzZWRvd24nIGlzIHRyaWdnZXJlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGVcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJUcmVlR3JpZEJvaWxlclBsYXRlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVtb3ZlRXZlbnRMaXN0ZW5lckZvckJvaWxlcnBsYXRlIChlKSB7XHJcbiAgICAgICAgaWYgKCFbdGhpcy54eUNoYXJ0Qm9pbGVyUGxhdGUsIHRoaXMueXRDaGFydEJvaWxlclBsYXRlLCB0aGlzLmZmdENoYXJ0Qm9pbGVyUGxhdGUsIHRoaXMuYXhpc0NoYXJ0Qm9pbGVyUGxhdGVdLmluY2x1ZGVzKGUudGFyZ2V0LmlkKSAmJiBcclxuICAgICAgICAgICAgIVsnIycgKyBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmlkLCAnIycgKyBlLnRhcmdldC5pZF0uaW5jbHVkZXModGhpcy5wYXJlbnRJZCArICdfJyArIHRoaXMuX3Rvb2xiYXJJZEFkZCkpIHtcclxuICAgICAgICAgICAgdGhpcy5oaWRlQm9pbGVycGxhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIaWRlIHRoZSBkcm9wZG93biBtZW51XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlclRyZWVHcmlkQm9pbGVyUGxhdGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGhpZGVCb2lsZXJwbGF0ZSgpIHtcclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXJGb3JCb2lsZXJwbGF0ZSk7XHJcbiAgICAgICAgdGhpcy5ib2lsZXJwbGF0ZS5yZW1vdmUoKTtcclxuICAgICAgICB0aGlzLmlzT3BlbmVkID0gZmFsc2U7XHJcbiAgICB9XHJcbn0iXX0=