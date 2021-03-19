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
define(["require", "exports", "../../../models/chartManagerDataModel/chartManagerChart", "../../../models/chartManagerDataModel/chartManagerChart", "../../../models/chartManagerDataModel/scale", "../../common/dropDownMenuBase"], function (require, exports, chartManagerChart_1, chartManagerChart_2, scale_1, dropDownMenuBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ChartManagerTreeGridDropDownMenu = /** @class */ (function (_super) {
        __extends(ChartManagerTreeGridDropDownMenu, _super);
        function ChartManagerTreeGridDropDownMenu(dataModel, parentId) {
            var _this = _super.call(this, parentId, "Add") || this;
            _this._width = '130px';
            _this._leftPosition = '1px';
            _this.dataModel = dataModel;
            _this.buttonsId = ["YTChart_Choose_Btn_DropDownMenu", "XYChart_Choose_Btn_DropDownMenu", "FFTChart_Choose_Btn_DropDownMenu",
                "YTAxis_Choose_Btn_DropDownMenu"];
            _this.ytChartDropDownMenu = _this.buttonsId[0];
            _this.xyChartDropDownMenu = _this.buttonsId[1];
            _this.fftChartDropDownMenu = _this.buttonsId[2];
            _this.axisChartDropDownMenu = _this.buttonsId[3];
            return _this;
        }
        /**
         * Show dropdown menu
         *
         * @param {(IChartManagerChart | undefined)} selectedChart
         * @memberof ChartManagerTreeGridDropDownMenu
         */
        ChartManagerTreeGridDropDownMenu.prototype.showDropDownMenu = function (selectedChart) {
            var axisAvailable;
            var canAddChart = this.dataModel.canAddChart();
            if (selectedChart !== undefined && selectedChart.canAddYAxis()) {
                axisAvailable = true;
            }
            else {
                axisAvailable = false;
            }
            this.createDropDownMenu(this._width, this._leftPosition, this.buttonsId);
            this.createButton(this.ytChartDropDownMenu, "Add YT Chart", canAddChart, undefined);
            this.createButton(this.xyChartDropDownMenu, "Add XY Chart", canAddChart, undefined);
            this.createButton(this.fftChartDropDownMenu, "Add FFT Chart", canAddChart, undefined);
            this.createButton(this.axisChartDropDownMenu, "Add scale to chart", axisAvailable, selectedChart);
            this.isOpened = true;
        };
        /**
         * Create syncf button
         *
         * @private
         * @param {string} id
         * @param {string} text
         * @param {boolean} enabled
         * @param {(IChartManagerChart | undefined)} chart
         * @memberof ChartManagerTreeGridDropDownMenu
         */
        ChartManagerTreeGridDropDownMenu.prototype.createButton = function (id, text, enabled, chart) {
            var _this = this;
            $('#' + id).ejButton({
                text: text,
                contentType: ej.ContentType.TextOnly,
                cssClass: "dropDownMenu",
                prefixIcon: "e-icon",
                enabled: enabled,
                click: function (args) {
                    switch (id) {
                        case _this.ytChartDropDownMenu:
                            _this.addChart(chartManagerChart_2.ChartType.YTChart);
                            break;
                        case _this.xyChartDropDownMenu:
                            _this.addChart(chartManagerChart_2.ChartType.XYChart);
                            break;
                        case _this.fftChartDropDownMenu:
                            _this.addChart(chartManagerChart_2.ChartType.FFTChart);
                            break;
                        case _this.axisChartDropDownMenu:
                            _this.addANewYAxisToChart(chart);
                            break;
                    }
                    _this.hideDropDownMenu();
                }
            });
        };
        /**
         * Add an empty chart
         *
         * @private
         * @param {ChartType} type
         * @memberof ChartManagerTreeGridDropDownMenu
         */
        ChartManagerTreeGridDropDownMenu.prototype.addChart = function (type) {
            var newChart = new chartManagerChart_1.ChartManagerChart(this.dataModel.getUniqueChartName(), type);
            this.dataModel.addChart(newChart, 0);
        };
        /**
         * Add a new y axis to a chart
         *
         * @private
         * @param {IChartManagerChart} selectedChart
         * @memberof ChartManagerTreeGridDropDownMenu
         */
        ChartManagerTreeGridDropDownMenu.prototype.addANewYAxisToChart = function (selectedChart) {
            var yAxis = new scale_1.Scale(selectedChart.getNextYAxisId(), selectedChart);
            selectedChart.addYScale(yAxis);
            this.dataModel.addYScale(selectedChart, yAxis);
        };
        return ChartManagerTreeGridDropDownMenu;
    }(dropDownMenuBase_1.dropDownMenuBase));
    exports.ChartManagerTreeGridDropDownMenu = ChartManagerTreeGridDropDownMenu;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRNYW5hZ2VyVHJlZUdyaWREcm9wRG93bk1lbnUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY2hhcnRNYW5hZ2VyV2lkZ2V0L3ZpZXcvY2hhcnRNYW5hZ2VyVHJlZUdyaWREcm9wRG93bk1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQU9BO1FBQXNELG9EQUFnQjtRQVlsRSwwQ0FBWSxTQUFpQyxFQUFFLFFBQWdCO1lBQS9ELFlBQ0ksa0JBQU0sUUFBUSxFQUFFLEtBQUssQ0FBQyxTQVN6QjtZQWJnQixZQUFNLEdBQVcsT0FBTyxDQUFDO1lBQ3pCLG1CQUFhLEdBQVcsS0FBSyxDQUFDO1lBSTNDLEtBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1lBRTNCLEtBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxpQ0FBaUMsRUFBRSxpQ0FBaUMsRUFBRSxrQ0FBa0M7Z0JBQzFILGdDQUFnQyxDQUFFLENBQUM7WUFDbkMsS0FBSSxDQUFDLG1CQUFtQixHQUFJLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUMsS0FBSSxDQUFDLG1CQUFtQixHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0MsS0FBSSxDQUFDLG9CQUFvQixHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUMsS0FBSSxDQUFDLHFCQUFxQixHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7O1FBQ25ELENBQUM7UUFFRDs7Ozs7V0FLRztRQUNJLDJEQUFnQixHQUF2QixVQUF5QixhQUE2QztZQUNsRSxJQUFJLGFBQXNCLENBQUM7WUFDM0IsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUUvQyxJQUFJLGFBQWEsS0FBSyxTQUFTLElB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RCxtQ0FBZ0IsR0E4R3JFO0lBOUdZLDRFQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYXJ0TWFuYWdlckNoYXJ0IH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvY2hhcnRNYW5hZ2VyQ2hhcnRcIjtcclxuaW1wb3J0IHsgSUNoYXJ0TWFuYWdlckNoYXJ0IH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvaW50ZXJmYWNlcy9jaGFydE1hbmFnZXJDaGFydEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDaGFydFR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9jaGFydE1hbmFnZXJDaGFydFwiXHJcbmltcG9ydCB7IFNjYWxlIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvc2NhbGVcIjtcclxuaW1wb3J0IHsgSUNoYXJ0TWFuYWdlckRhdGFNb2RlbCB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2ludGVyZmFjZXMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IGRyb3BEb3duTWVudUJhc2UgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2Ryb3BEb3duTWVudUJhc2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDaGFydE1hbmFnZXJUcmVlR3JpZERyb3BEb3duTWVudSBleHRlbmRzIGRyb3BEb3duTWVudUJhc2V7XHJcbiAgICBcclxuICAgIHByaXZhdGUgZGF0YU1vZGVsOiBJQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsO1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgeXRDaGFydERyb3BEb3duTWVudTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSB4eUNoYXJ0RHJvcERvd25NZW51OiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGZmdENoYXJ0RHJvcERvd25NZW51OiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGF4aXNDaGFydERyb3BEb3duTWVudTogc3RyaW5nO1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3dpZHRoOiBzdHJpbmcgPSAnMTMwcHgnO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfbGVmdFBvc2l0aW9uOiBzdHJpbmcgPSAnMXB4JztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihkYXRhTW9kZWw6IElDaGFydE1hbmFnZXJEYXRhTW9kZWwsIHBhcmVudElkOiBzdHJpbmcpe1xyXG4gICAgICAgIHN1cGVyKHBhcmVudElkLCBcIkFkZFwiKVxyXG4gICAgICAgIHRoaXMuZGF0YU1vZGVsID0gZGF0YU1vZGVsO1xyXG5cclxuICAgICAgICB0aGlzLmJ1dHRvbnNJZCA9IFtcIllUQ2hhcnRfQ2hvb3NlX0J0bl9Ecm9wRG93bk1lbnVcIiwgXCJYWUNoYXJ0X0Nob29zZV9CdG5fRHJvcERvd25NZW51XCIsIFwiRkZUQ2hhcnRfQ2hvb3NlX0J0bl9Ecm9wRG93bk1lbnVcIiwgXHJcbiAgICAgICAgXCJZVEF4aXNfQ2hvb3NlX0J0bl9Ecm9wRG93bk1lbnVcIiBdO1xyXG4gICAgICAgIHRoaXMueXRDaGFydERyb3BEb3duTWVudSA9ICB0aGlzLmJ1dHRvbnNJZFswXTtcclxuICAgICAgICB0aGlzLnh5Q2hhcnREcm9wRG93bk1lbnUgPSB0aGlzLmJ1dHRvbnNJZFsxXTtcclxuICAgICAgICB0aGlzLmZmdENoYXJ0RHJvcERvd25NZW51ID0gdGhpcy5idXR0b25zSWRbMl07XHJcbiAgICAgICAgdGhpcy5heGlzQ2hhcnREcm9wRG93bk1lbnUgPSB0aGlzLmJ1dHRvbnNJZFszXTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNob3cgZHJvcGRvd24gbWVudVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7KElDaGFydE1hbmFnZXJDaGFydCB8IHVuZGVmaW5lZCl9IHNlbGVjdGVkQ2hhcnRcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJUcmVlR3JpZERyb3BEb3duTWVudVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2hvd0Ryb3BEb3duTWVudSAoc2VsZWN0ZWRDaGFydDogSUNoYXJ0TWFuYWdlckNoYXJ0IHwgdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgbGV0IGF4aXNBdmFpbGFibGU6IGJvb2xlYW47XHJcbiAgICAgICAgbGV0IGNhbkFkZENoYXJ0ID0gdGhpcy5kYXRhTW9kZWwuY2FuQWRkQ2hhcnQoKTtcclxuXHJcbiAgICAgICAgaWYgKHNlbGVjdGVkQ2hhcnQgIT09IHVuZGVmaW5lZCAmJiBzZWxlY3RlZENoYXJ0LmNhbkFkZFlBeGlzKCkpe1xyXG4gICAgICAgICAgICBheGlzQXZhaWxhYmxlID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBheGlzQXZhaWxhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNyZWF0ZURyb3BEb3duTWVudSh0aGlzLl93aWR0aCwgdGhpcy5fbGVmdFBvc2l0aW9uLCB0aGlzLmJ1dHRvbnNJZCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVCdXR0b24odGhpcy55dENoYXJ0RHJvcERvd25NZW51LCBcIkFkZCBZVCBDaGFydFwiLCBjYW5BZGRDaGFydCwgdW5kZWZpbmVkKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZUJ1dHRvbih0aGlzLnh5Q2hhcnREcm9wRG93bk1lbnUsIFwiQWRkIFhZIENoYXJ0XCIsIGNhbkFkZENoYXJ0LCB1bmRlZmluZWQpO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlQnV0dG9uKHRoaXMuZmZ0Q2hhcnREcm9wRG93bk1lbnUsIFwiQWRkIEZGVCBDaGFydFwiLCBjYW5BZGRDaGFydCwgdW5kZWZpbmVkKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZUJ1dHRvbih0aGlzLmF4aXNDaGFydERyb3BEb3duTWVudSwgXCJBZGQgc2NhbGUgdG8gY2hhcnRcIiwgYXhpc0F2YWlsYWJsZSwgc2VsZWN0ZWRDaGFydCk7XHJcblxyXG4gICAgICAgIHRoaXMuaXNPcGVuZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIHN5bmNmIGJ1dHRvblxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGVuYWJsZWRcclxuICAgICAqIEBwYXJhbSB7KElDaGFydE1hbmFnZXJDaGFydCB8IHVuZGVmaW5lZCl9IGNoYXJ0XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyVHJlZUdyaWREcm9wRG93bk1lbnVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVCdXR0b24oaWQ6IHN0cmluZywgdGV4dDogc3RyaW5nLCBlbmFibGVkOiBib29sZWFuLCBjaGFydDogSUNoYXJ0TWFuYWdlckNoYXJ0IHwgdW5kZWZpbmVkKXtcclxuICAgICAgICAkKCcjJyArIGlkKS5lakJ1dHRvbih7XHJcbiAgICAgICAgICAgIHRleHQ6IHRleHQsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBlai5Db250ZW50VHlwZS5UZXh0T25seSxcclxuICAgICAgICAgICAgY3NzQ2xhc3M6IFwiZHJvcERvd25NZW51XCIsXHJcbiAgICAgICAgICAgIHByZWZpeEljb246IFwiZS1pY29uXCIgLC8vU3BlY2lmaWVzIHRoZSBwcmltYXJ5IGljb24gZm9yIEJ1dHRvblxyXG4gICAgICAgICAgICBlbmFibGVkOiBlbmFibGVkLFxyXG4gICAgICAgICAgICBjbGljazogKGFyZ3MpID0+IHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoaWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdGhpcy55dENoYXJ0RHJvcERvd25NZW51OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZENoYXJ0KENoYXJ0VHlwZS5ZVENoYXJ0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0aGlzLnh5Q2hhcnREcm9wRG93bk1lbnU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2hhcnQoQ2hhcnRUeXBlLlhZQ2hhcnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHRoaXMuZmZ0Q2hhcnREcm9wRG93bk1lbnU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2hhcnQoQ2hhcnRUeXBlLkZGVENoYXJ0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0aGlzLmF4aXNDaGFydERyb3BEb3duTWVudTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRBTmV3WUF4aXNUb0NoYXJ0KGNoYXJ0ISlcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVEcm9wRG93bk1lbnUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIGFuIGVtcHR5IGNoYXJ0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Q2hhcnRUeXBlfSB0eXBlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyVHJlZUdyaWREcm9wRG93bk1lbnVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRDaGFydCAodHlwZTogQ2hhcnRUeXBlKSB7XHJcbiAgICAgICAgdmFyIG5ld0NoYXJ0ID0gbmV3IENoYXJ0TWFuYWdlckNoYXJ0KHRoaXMuZGF0YU1vZGVsIS5nZXRVbmlxdWVDaGFydE5hbWUoKSwgdHlwZSk7XHJcbiAgICAgICAgdGhpcy5kYXRhTW9kZWwuYWRkQ2hhcnQobmV3Q2hhcnQsIDApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIGEgbmV3IHkgYXhpcyB0byBhIGNoYXJ0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7SUNoYXJ0TWFuYWdlckNoYXJ0fSBzZWxlY3RlZENoYXJ0XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRNYW5hZ2VyVHJlZUdyaWREcm9wRG93bk1lbnVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRBTmV3WUF4aXNUb0NoYXJ0IChzZWxlY3RlZENoYXJ0OiBJQ2hhcnRNYW5hZ2VyQ2hhcnQpIHtcclxuICAgICAgICBsZXQgeUF4aXMgPSBuZXcgU2NhbGUoc2VsZWN0ZWRDaGFydC5nZXROZXh0WUF4aXNJZCgpLCBzZWxlY3RlZENoYXJ0KVxyXG4gICAgICAgIHNlbGVjdGVkQ2hhcnQuYWRkWVNjYWxlKHlBeGlzKTtcclxuICAgICAgICB0aGlzLmRhdGFNb2RlbC5hZGRZU2NhbGUoc2VsZWN0ZWRDaGFydCwgeUF4aXMpO1xyXG4gICAgfVxyXG59Il19