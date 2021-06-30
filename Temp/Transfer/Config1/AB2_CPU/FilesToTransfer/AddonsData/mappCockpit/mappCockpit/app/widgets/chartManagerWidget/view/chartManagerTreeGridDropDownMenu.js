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
            newChart.addDefaultYScale(this.dataModel);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRNYW5hZ2VyVHJlZUdyaWREcm9wRG93bk1lbnUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY2hhcnRNYW5hZ2VyV2lkZ2V0L3ZpZXcvY2hhcnRNYW5hZ2VyVHJlZUdyaWREcm9wRG93bk1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQU9BO1FBQXNELG9EQUFnQjtRQVlsRSwwQ0FBWSxTQUFpQyxFQUFFLFFBQWdCO1lBQS9ELFlBQ0ksa0JBQU0sUUFBUSxFQUFFLEtBQUssQ0FBQyxTQVN6QjtZQWJnQixZQUFNLEdBQVcsT0FBTyxDQUFDO1lBQ3pCLG1CQUFhLEdBQVcsS0FBSyxDQUFDO1lBSTNDLEtBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1lBRTNCLEtBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxpQ0FBaUMsRUFBRSxpQ0FBaUMsRUFBRSxrQ0FBa0M7Z0JBQzFILGdDQUFnQyxDQUFFLENBQUM7WUFDbkMsS0FBSSxDQUFDLG1CQUFtQixHQUFJLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUMsS0FBSSxDQUFDLG1CQUFtQixHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0MsS0FBSSxDQUFDLG9CQUFvQixHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUMsS0FBSSxDQUFDLHFCQUFxQixHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7O1FBQ25ELENBQUM7UUFFRDs7Ozs7V0FLRztRQUNJLDJEQUFnQixHQUF2QixVQUF5QixhQUE2QztZQUNsRSxJQUFJLGFBQXNCLENBQUM7WUFDM0IsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUUvQyxJQUFJLGFBQWEsS0FBSyxTQUFTLElB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LENBQUMsQ0FBQztRQUNuRCxDQUFDO1FBQ0wsdUNBQUM7SUFBRCxDQUFDLEFBL0dELENBQXNELG1DQUFnQixHQStHckU7SUEvR1ksNEVBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhcnRNYW5hZ2VyQ2hhcnQgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9jaGFydE1hbmFnZXJDaGFydFwiO1xyXG5pbXBvcnQgeyBJQ2hhcnRNYW5hZ2VyQ2hhcnQgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9pbnRlcmZhY2VzL2NoYXJ0TWFuYWdlckNoYXJ0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IENoYXJ0VHlwZSB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2NoYXJ0TWFuYWdlckNoYXJ0XCJcclxuaW1wb3J0IHsgU2NhbGUgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9zY2FsZVwiO1xyXG5pbXBvcnQgeyBJQ2hhcnRNYW5hZ2VyRGF0YU1vZGVsIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9jaGFydE1hbmFnZXJEYXRhTW9kZWwvaW50ZXJmYWNlcy9jaGFydE1hbmFnZXJEYXRhTW9kZWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgZHJvcERvd25NZW51QmFzZSB9IGZyb20gXCIuLi8uLi9jb21tb24vZHJvcERvd25NZW51QmFzZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENoYXJ0TWFuYWdlclRyZWVHcmlkRHJvcERvd25NZW51IGV4dGVuZHMgZHJvcERvd25NZW51QmFzZXtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBkYXRhTW9kZWw6IElDaGFydE1hbmFnZXJEYXRhTW9kZWw7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSB5dENoYXJ0RHJvcERvd25NZW51OiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHh5Q2hhcnREcm9wRG93bk1lbnU6IHN0cmluZztcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgZmZ0Q2hhcnREcm9wRG93bk1lbnU6IHN0cmluZztcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgYXhpc0NoYXJ0RHJvcERvd25NZW51OiBzdHJpbmc7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfd2lkdGg6IHN0cmluZyA9ICcxMzBweCc7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9sZWZ0UG9zaXRpb246IHN0cmluZyA9ICcxcHgnO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGRhdGFNb2RlbDogSUNoYXJ0TWFuYWdlckRhdGFNb2RlbCwgcGFyZW50SWQ6IHN0cmluZyl7XHJcbiAgICAgICAgc3VwZXIocGFyZW50SWQsIFwiQWRkXCIpXHJcbiAgICAgICAgdGhpcy5kYXRhTW9kZWwgPSBkYXRhTW9kZWw7XHJcblxyXG4gICAgICAgIHRoaXMuYnV0dG9uc0lkID0gW1wiWVRDaGFydF9DaG9vc2VfQnRuX0Ryb3BEb3duTWVudVwiLCBcIlhZQ2hhcnRfQ2hvb3NlX0J0bl9Ecm9wRG93bk1lbnVcIiwgXCJGRlRDaGFydF9DaG9vc2VfQnRuX0Ryb3BEb3duTWVudVwiLCBcclxuICAgICAgICBcIllUQXhpc19DaG9vc2VfQnRuX0Ryb3BEb3duTWVudVwiIF07XHJcbiAgICAgICAgdGhpcy55dENoYXJ0RHJvcERvd25NZW51ID0gIHRoaXMuYnV0dG9uc0lkWzBdO1xyXG4gICAgICAgIHRoaXMueHlDaGFydERyb3BEb3duTWVudSA9IHRoaXMuYnV0dG9uc0lkWzFdO1xyXG4gICAgICAgIHRoaXMuZmZ0Q2hhcnREcm9wRG93bk1lbnUgPSB0aGlzLmJ1dHRvbnNJZFsyXTtcclxuICAgICAgICB0aGlzLmF4aXNDaGFydERyb3BEb3duTWVudSA9IHRoaXMuYnV0dG9uc0lkWzNdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2hvdyBkcm9wZG93biBtZW51XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsoSUNoYXJ0TWFuYWdlckNoYXJ0IHwgdW5kZWZpbmVkKX0gc2VsZWN0ZWRDaGFydFxyXG4gICAgICogQG1lbWJlcm9mIENoYXJ0TWFuYWdlclRyZWVHcmlkRHJvcERvd25NZW51XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzaG93RHJvcERvd25NZW51IChzZWxlY3RlZENoYXJ0OiBJQ2hhcnRNYW5hZ2VyQ2hhcnQgfCB1bmRlZmluZWQpIHtcclxuICAgICAgICBsZXQgYXhpc0F2YWlsYWJsZTogYm9vbGVhbjtcclxuICAgICAgICBsZXQgY2FuQWRkQ2hhcnQgPSB0aGlzLmRhdGFNb2RlbC5jYW5BZGRDaGFydCgpO1xyXG5cclxuICAgICAgICBpZiAoc2VsZWN0ZWRDaGFydCAhPT0gdW5kZWZpbmVkICYmIHNlbGVjdGVkQ2hhcnQuY2FuQWRkWUF4aXMoKSl7XHJcbiAgICAgICAgICAgIGF4aXNBdmFpbGFibGUgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGF4aXNBdmFpbGFibGUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY3JlYXRlRHJvcERvd25NZW51KHRoaXMuX3dpZHRoLCB0aGlzLl9sZWZ0UG9zaXRpb24sIHRoaXMuYnV0dG9uc0lkKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZUJ1dHRvbih0aGlzLnl0Q2hhcnREcm9wRG93bk1lbnUsIFwiQWRkIFlUIENoYXJ0XCIsIGNhbkFkZENoYXJ0LCB1bmRlZmluZWQpO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlQnV0dG9uKHRoaXMueHlDaGFydERyb3BEb3duTWVudSwgXCJBZGQgWFkgQ2hhcnRcIiwgY2FuQWRkQ2hhcnQsIHVuZGVmaW5lZCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVCdXR0b24odGhpcy5mZnRDaGFydERyb3BEb3duTWVudSwgXCJBZGQgRkZUIENoYXJ0XCIsIGNhbkFkZENoYXJ0LCB1bmRlZmluZWQpO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlQnV0dG9uKHRoaXMuYXhpc0NoYXJ0RHJvcERvd25NZW51LCBcIkFkZCBzY2FsZSB0byBjaGFydFwiLCBheGlzQXZhaWxhYmxlLCBzZWxlY3RlZENoYXJ0KTtcclxuXHJcbiAgICAgICAgdGhpcy5pc09wZW5lZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgc3luY2YgYnV0dG9uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZW5hYmxlZFxyXG4gICAgICogQHBhcmFtIHsoSUNoYXJ0TWFuYWdlckNoYXJ0IHwgdW5kZWZpbmVkKX0gY2hhcnRcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJUcmVlR3JpZERyb3BEb3duTWVudVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZUJ1dHRvbihpZDogc3RyaW5nLCB0ZXh0OiBzdHJpbmcsIGVuYWJsZWQ6IGJvb2xlYW4sIGNoYXJ0OiBJQ2hhcnRNYW5hZ2VyQ2hhcnQgfCB1bmRlZmluZWQpe1xyXG4gICAgICAgICQoJyMnICsgaWQpLmVqQnV0dG9uKHtcclxuICAgICAgICAgICAgdGV4dDogdGV4dCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IGVqLkNvbnRlbnRUeXBlLlRleHRPbmx5LFxyXG4gICAgICAgICAgICBjc3NDbGFzczogXCJkcm9wRG93bk1lbnVcIixcclxuICAgICAgICAgICAgcHJlZml4SWNvbjogXCJlLWljb25cIiAsLy9TcGVjaWZpZXMgdGhlIHByaW1hcnkgaWNvbiBmb3IgQnV0dG9uXHJcbiAgICAgICAgICAgIGVuYWJsZWQ6IGVuYWJsZWQsXHJcbiAgICAgICAgICAgIGNsaWNrOiAoYXJncykgPT4ge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChpZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0aGlzLnl0Q2hhcnREcm9wRG93bk1lbnU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2hhcnQoQ2hhcnRUeXBlLllUQ2hhcnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHRoaXMueHlDaGFydERyb3BEb3duTWVudTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRDaGFydChDaGFydFR5cGUuWFlDaGFydCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdGhpcy5mZnRDaGFydERyb3BEb3duTWVudTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRDaGFydChDaGFydFR5cGUuRkZUQ2hhcnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHRoaXMuYXhpc0NoYXJ0RHJvcERvd25NZW51OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEFOZXdZQXhpc1RvQ2hhcnQoY2hhcnQhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZURyb3BEb3duTWVudSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgYW4gZW1wdHkgY2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtDaGFydFR5cGV9IHR5cGVcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJUcmVlR3JpZERyb3BEb3duTWVudVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZENoYXJ0ICh0eXBlOiBDaGFydFR5cGUpIHtcclxuICAgICAgICB2YXIgbmV3Q2hhcnQgPSBuZXcgQ2hhcnRNYW5hZ2VyQ2hhcnQodGhpcy5kYXRhTW9kZWwhLmdldFVuaXF1ZUNoYXJ0TmFtZSgpLCB0eXBlKTtcclxuICAgICAgICBuZXdDaGFydC5hZGREZWZhdWx0WVNjYWxlKHRoaXMuZGF0YU1vZGVsKTtcclxuICAgICAgICB0aGlzLmRhdGFNb2RlbC5hZGRDaGFydChuZXdDaGFydCwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgYSBuZXcgeSBheGlzIHRvIGEgY2hhcnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtJQ2hhcnRNYW5hZ2VyQ2hhcnR9IHNlbGVjdGVkQ2hhcnRcclxuICAgICAqIEBtZW1iZXJvZiBDaGFydE1hbmFnZXJUcmVlR3JpZERyb3BEb3duTWVudVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZEFOZXdZQXhpc1RvQ2hhcnQgKHNlbGVjdGVkQ2hhcnQ6IElDaGFydE1hbmFnZXJDaGFydCkge1xyXG4gICAgICAgIGxldCB5QXhpcyA9IG5ldyBTY2FsZShzZWxlY3RlZENoYXJ0LmdldE5leHRZQXhpc0lkKCksIHNlbGVjdGVkQ2hhcnQpXHJcbiAgICAgICAgc2VsZWN0ZWRDaGFydC5hZGRZU2NhbGUoeUF4aXMpO1xyXG4gICAgICAgIHRoaXMuZGF0YU1vZGVsLmFkZFlTY2FsZShzZWxlY3RlZENoYXJ0LCB5QXhpcyk7XHJcbiAgICB9XHJcbn0iXX0=