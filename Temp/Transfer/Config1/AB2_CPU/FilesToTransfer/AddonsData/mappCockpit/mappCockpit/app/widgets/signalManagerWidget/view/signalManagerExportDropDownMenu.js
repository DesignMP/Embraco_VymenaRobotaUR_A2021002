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
define(["require", "exports", "../../common/dropDownMenuBase"], function (require, exports, dropDownMenuBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SignalManagerExportDropDownMenu = /** @class */ (function (_super) {
        __extends(SignalManagerExportDropDownMenu, _super);
        function SignalManagerExportDropDownMenu(toolbar, parentId) {
            var _this = _super.call(this, parentId, "Export") || this;
            _this._width = '315px';
            _this._leftPosition = '32px';
            _this.toolbar = toolbar;
            _this.buttonsId = ["exportAll_Choose_Btn_DropDownMenu", "exportSelected_Choose_Btn_DropDownMenu", "exportAllNew_Choose_Btn_DropDownMenu"];
            _this.exportAll = _this.buttonsId[0];
            _this.exportAllAsCsv = _this.buttonsId[1];
            _this.exportSelected = _this.buttonsId[2];
            return _this;
        }
        /**
         * Show dropdown menu
         *
         * @param {SignalManagerWidget} signalManagerWidget
         * @param {*} model
         * @param {boolean} selectedItemsExportable
         * @memberof SignalManagerExportDropDownMenu
         */
        SignalManagerExportDropDownMenu.prototype.showDropDownMenu = function (signalManagerWidget, model, selectedItemsExportable) {
            this.createDropDownMenu(this._width, this._leftPosition, this.buttonsId);
            this.createButton(this.exportAll, "Export all signals incl. formulas (recommended)", true, signalManagerWidget, model);
            this.createButton(this.exportAllAsCsv, "Export all signals as .csv", true, signalManagerWidget, model);
            this.createButton(this.exportSelected, "Export selected signals  as .csv", selectedItemsExportable, signalManagerWidget, model);
            this.isOpened = true;
        };
        /**
         * Create syncf button
         *
         * @private
         * @param {string} id
         * @param {string} text
         * @param {boolean} enabled
         * @param {SignalManagerWidget} signalManager
         * @param {*} model
         * @memberof SignalManagerExportDropDownMenu
         */
        SignalManagerExportDropDownMenu.prototype.createButton = function (id, text, enabled, signalManager, model) {
            var _this = this;
            $('#' + id).ejButton({
                text: text,
                contentType: ej.ContentType.TextOnly,
                cssClass: "dropDownMenu",
                prefixIcon: "e-icon",
                enabled: enabled,
                click: function (args) {
                    switch (id) {
                        case _this.exportSelected:
                            _this.exportSelectedData(signalManager, model.selectedItems);
                            break;
                        case _this.exportAllAsCsv:
                            _this.exportAllDataAsCsv(signalManager, model.currentViewData);
                            break;
                        case _this.exportAll:
                            _this.exportAllData(signalManager);
                            break;
                    }
                    _this.hideDropDownMenu();
                }
            });
        };
        /**
         * Exports selected data as .csv
         *
         * @private
         * @param {SignalManagerWidget} signalManagerWidget
         * @param {*} selectedItems
         * @memberof SignalManagerExportDropDownMenu
         */
        SignalManagerExportDropDownMenu.prototype.exportSelectedData = function (signalManagerWidget, selectedItems) {
            this.toolbar.exportSelectedTraceData(signalManagerWidget, selectedItems);
        };
        /**
         * Exports all data as .csv
         *
         * @private
         * @param {SignalManagerWidget} signalManagerWidget
         * @param {*} allItems
         * @memberof SignalManagerExportDropDownMenu
         */
        SignalManagerExportDropDownMenu.prototype.exportAllDataAsCsv = function (signalManagerWidget, allItems) {
            this.toolbar.exportAllTraceDataAsCsv(signalManagerWidget, allItems);
        };
        /**
         * Exports all data as .mce
         *
         * @private
         * @param {SignalManagerWidget} signalManagerWidget
         * @param {*} allItems
         * @memberof SignalManagerExportDropDownMenu
         */
        SignalManagerExportDropDownMenu.prototype.exportAllData = function (signalManagerWidget) {
            this.toolbar.exportAllTraceData(signalManagerWidget);
        };
        return SignalManagerExportDropDownMenu;
    }(dropDownMenuBase_1.dropDownMenuBase));
    exports.SignalManagerExportDropDownMenu = SignalManagerExportDropDownMenu;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsTWFuYWdlckV4cG9ydERyb3BEb3duTWVudS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9zaWduYWxNYW5hZ2VyV2lkZ2V0L3ZpZXcvc2lnbmFsTWFuYWdlckV4cG9ydERyb3BEb3duTWVudS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBSUE7UUFBcUQsbURBQWdCO1FBV2pFLHlDQUFZLE9BQXFDLEVBQUUsUUFBZ0I7WUFBbkUsWUFDSSxrQkFBTSxRQUFRLEVBQUUsUUFBUSxDQUFDLFNBTTVCO1lBVmdCLFlBQU0sR0FBVyxPQUFPLENBQUM7WUFDekIsbUJBQWEsR0FBVyxNQUFNLENBQUM7WUFJNUMsS0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDdkIsS0FBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLG1DQUFtQyxFQUFFLHdDQUF3QyxFQUFFLHNDQUFzQyxDQUFDLENBQUM7WUFDekksS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25DLEtBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QyxLQUFJLENBQUMsY0FBYyxHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7O1FBQzVDLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0ksMERBQWdCLEdBQXZCLFVBQXlCLG1CQUF3QyxFQUFFLEtBQUssRUFBRSx1QkFBZ0M7WUFDdEcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDekUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGlEQUFpRCxFQUFFLElBQUksRUFBRSxtQkFBbUIsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN2SCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsNEJBQTRCLEVBQUUsSUFBSSxFQUFFLG1CQUFtQixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3ZHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxrQ0FBa0MsRUFBRSx1QkFBdUIsRUFBRSxtQkFBbUIsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUVoSSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUN6QixDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNLLHNEQUFZLEdBQXBCLFVBQXFCLEVBQVUsRUFBRSxJQUFZLEVBQUUsT0FBZ0IsRUFBRSxhQUFrQyxFQUFFLEtBQUs7WUFBMUcsaUJBc0JDO1lBckJHLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDO2dCQUNqQixJQUFJLEVBQUUsSUFBSTtnQkFDVixXQUFXLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxRQUFRO2dCQUNwQyxRQUFRLEVBQUUsY0FBYztnQkFDeEIsVUFBVSxFQUFFLFFBQVE7Z0JBQ3BCLE9BQU8sRUFBRSxPQUFPO2dCQUNoQixLQUFLLEVBQUUsVUFBQyxJQUFJO29CQUNSLFFBQVEsRUFBRSxFQUFDO3dCQUNQLEtBQUssS0FBSSxDQUFDLGNBQWM7NEJBQ3BCLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDOzRCQUM1RCxNQUFNO3dCQUNWLEtBQUssS0FBSSxDQUFDLGNBQWM7NEJBQ3BCLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDOzRCQUM5RCxNQUFNO3dCQUNWLEtBQUssS0FBSSxDQUFDLFNBQVM7NEJBQ2YsS0FBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQzs0QkFDbEMsTUFBTTtxQkFDYjtvQkFDRCxLQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDNUIsQ0FBQzthQUNKLENBQUMsQ0FBQztRQUNQLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0ssNERBQWtCLEdBQTFCLFVBQTJCLG1CQUF3QyxFQUFFLGFBQWE7WUFDOUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxtQkFBbUIsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUM3RSxDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNLLDREQUFrQixHQUExQixVQUEyQixtQkFBd0MsRUFBRSxRQUFRO1lBQ3pFLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUMsbUJBQW1CLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDeEUsQ0FBQztRQUdEOzs7Ozs7O1dBT0c7UUFDSyx1REFBYSxHQUFyQixVQUFzQixtQkFBd0M7WUFDMUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ3pELENBQUM7UUFDTCxzQ0FBQztJQUFELENBQUMsQUE1R0QsQ0FBcUQsbUNBQWdCLEdBNEdwRTtJQTVHWSwwRUFBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTaWduYWxNYW5hZ2VyVHJlZUdyaWRUb29sYmFyIH0gZnJvbSBcIi4vc2lnbmFsTWFuYWdlclRyZWVHcmlkVG9vbGJhclwiO1xyXG5pbXBvcnQgeyBTaWduYWxNYW5hZ2VyV2lkZ2V0IH0gZnJvbSBcIi4uL3NpZ25hbE1hbmFnZXJXaWRnZXRcIjtcclxuaW1wb3J0IHsgZHJvcERvd25NZW51QmFzZSB9IGZyb20gXCIuLi8uLi9jb21tb24vZHJvcERvd25NZW51QmFzZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNpZ25hbE1hbmFnZXJFeHBvcnREcm9wRG93bk1lbnUgZXh0ZW5kcyBkcm9wRG93bk1lbnVCYXNle1xyXG4gICAgXHJcbiAgICBwcml2YXRlIHRvb2xiYXI6IFNpZ25hbE1hbmFnZXJUcmVlR3JpZFRvb2xiYXI7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBleHBvcnRTZWxlY3RlZDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBleHBvcnRBbGxBc0Nzdjogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBleHBvcnRBbGw6IHN0cmluZztcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF93aWR0aDogc3RyaW5nID0gJzMxNXB4JztcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2xlZnRQb3NpdGlvbjogc3RyaW5nID0gJzMycHgnO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHRvb2xiYXI6IFNpZ25hbE1hbmFnZXJUcmVlR3JpZFRvb2xiYXIsIHBhcmVudElkOiBzdHJpbmcpe1xyXG4gICAgICAgIHN1cGVyKHBhcmVudElkLCBcIkV4cG9ydFwiKVxyXG4gICAgICAgIHRoaXMudG9vbGJhciA9IHRvb2xiYXI7XHJcbiAgICAgICAgdGhpcy5idXR0b25zSWQgPSBbXCJleHBvcnRBbGxfQ2hvb3NlX0J0bl9Ecm9wRG93bk1lbnVcIiwgXCJleHBvcnRTZWxlY3RlZF9DaG9vc2VfQnRuX0Ryb3BEb3duTWVudVwiLCBcImV4cG9ydEFsbE5ld19DaG9vc2VfQnRuX0Ryb3BEb3duTWVudVwiXTtcclxuICAgICAgICB0aGlzLmV4cG9ydEFsbCA9IHRoaXMuYnV0dG9uc0lkWzBdO1xyXG4gICAgICAgIHRoaXMuZXhwb3J0QWxsQXNDc3YgPSB0aGlzLmJ1dHRvbnNJZFsxXTtcclxuICAgICAgICB0aGlzLmV4cG9ydFNlbGVjdGVkID0gdGhpcy5idXR0b25zSWRbMl07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTaG93IGRyb3Bkb3duIG1lbnVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1NpZ25hbE1hbmFnZXJXaWRnZXR9IHNpZ25hbE1hbmFnZXJXaWRnZXRcclxuICAgICAqIEBwYXJhbSB7Kn0gbW9kZWxcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2VsZWN0ZWRJdGVtc0V4cG9ydGFibGVcclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyRXhwb3J0RHJvcERvd25NZW51XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzaG93RHJvcERvd25NZW51IChzaWduYWxNYW5hZ2VyV2lkZ2V0OiBTaWduYWxNYW5hZ2VyV2lkZ2V0LCBtb2RlbCwgc2VsZWN0ZWRJdGVtc0V4cG9ydGFibGU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZURyb3BEb3duTWVudSh0aGlzLl93aWR0aCwgdGhpcy5fbGVmdFBvc2l0aW9uLCB0aGlzLmJ1dHRvbnNJZCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVCdXR0b24odGhpcy5leHBvcnRBbGwsIFwiRXhwb3J0IGFsbCBzaWduYWxzIGluY2wuIGZvcm11bGFzIChyZWNvbW1lbmRlZClcIiwgdHJ1ZSwgc2lnbmFsTWFuYWdlcldpZGdldCwgbW9kZWwpO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlQnV0dG9uKHRoaXMuZXhwb3J0QWxsQXNDc3YsIFwiRXhwb3J0IGFsbCBzaWduYWxzIGFzIC5jc3ZcIiwgdHJ1ZSwgc2lnbmFsTWFuYWdlcldpZGdldCwgbW9kZWwpO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlQnV0dG9uKHRoaXMuZXhwb3J0U2VsZWN0ZWQsIFwiRXhwb3J0IHNlbGVjdGVkIHNpZ25hbHMgIGFzIC5jc3ZcIiwgc2VsZWN0ZWRJdGVtc0V4cG9ydGFibGUsIHNpZ25hbE1hbmFnZXJXaWRnZXQsIG1vZGVsKTtcclxuXHJcbiAgICAgICAgdGhpcy5pc09wZW5lZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgc3luY2YgYnV0dG9uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZW5hYmxlZFxyXG4gICAgICogQHBhcmFtIHtTaWduYWxNYW5hZ2VyV2lkZ2V0fSBzaWduYWxNYW5hZ2VyXHJcbiAgICAgKiBAcGFyYW0geyp9IG1vZGVsXHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckV4cG9ydERyb3BEb3duTWVudVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZUJ1dHRvbihpZDogc3RyaW5nLCB0ZXh0OiBzdHJpbmcsIGVuYWJsZWQ6IGJvb2xlYW4sIHNpZ25hbE1hbmFnZXI6IFNpZ25hbE1hbmFnZXJXaWRnZXQsIG1vZGVsKXtcclxuICAgICAgICAkKCcjJyArIGlkKS5lakJ1dHRvbih7XHJcbiAgICAgICAgICAgIHRleHQ6IHRleHQsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBlai5Db250ZW50VHlwZS5UZXh0T25seSxcclxuICAgICAgICAgICAgY3NzQ2xhc3M6IFwiZHJvcERvd25NZW51XCIsXHJcbiAgICAgICAgICAgIHByZWZpeEljb246IFwiZS1pY29uXCIgLC8vU3BlY2lmaWVzIHRoZSBwcmltYXJ5IGljb24gZm9yIEJ1dHRvblxyXG4gICAgICAgICAgICBlbmFibGVkOiBlbmFibGVkLFxyXG4gICAgICAgICAgICBjbGljazogKGFyZ3MpID0+IHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoaWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdGhpcy5leHBvcnRTZWxlY3RlZDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5leHBvcnRTZWxlY3RlZERhdGEoc2lnbmFsTWFuYWdlciwgbW9kZWwuc2VsZWN0ZWRJdGVtcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdGhpcy5leHBvcnRBbGxBc0NzdjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5leHBvcnRBbGxEYXRhQXNDc3Yoc2lnbmFsTWFuYWdlciwgbW9kZWwuY3VycmVudFZpZXdEYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0aGlzLmV4cG9ydEFsbDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5leHBvcnRBbGxEYXRhKHNpZ25hbE1hbmFnZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZURyb3BEb3duTWVudSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFeHBvcnRzIHNlbGVjdGVkIGRhdGEgYXMgLmNzdlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge1NpZ25hbE1hbmFnZXJXaWRnZXR9IHNpZ25hbE1hbmFnZXJXaWRnZXRcclxuICAgICAqIEBwYXJhbSB7Kn0gc2VsZWN0ZWRJdGVtc1xyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJFeHBvcnREcm9wRG93bk1lbnVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBleHBvcnRTZWxlY3RlZERhdGEoc2lnbmFsTWFuYWdlcldpZGdldDogU2lnbmFsTWFuYWdlcldpZGdldCwgc2VsZWN0ZWRJdGVtcykge1xyXG4gICAgICAgIHRoaXMudG9vbGJhci5leHBvcnRTZWxlY3RlZFRyYWNlRGF0YShzaWduYWxNYW5hZ2VyV2lkZ2V0LCBzZWxlY3RlZEl0ZW1zKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEV4cG9ydHMgYWxsIGRhdGEgYXMgLmNzdlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge1NpZ25hbE1hbmFnZXJXaWRnZXR9IHNpZ25hbE1hbmFnZXJXaWRnZXRcclxuICAgICAqIEBwYXJhbSB7Kn0gYWxsSXRlbXNcclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyRXhwb3J0RHJvcERvd25NZW51XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZXhwb3J0QWxsRGF0YUFzQ3N2KHNpZ25hbE1hbmFnZXJXaWRnZXQ6IFNpZ25hbE1hbmFnZXJXaWRnZXQsIGFsbEl0ZW1zKSB7XHJcbiAgICAgICAgdGhpcy50b29sYmFyLmV4cG9ydEFsbFRyYWNlRGF0YUFzQ3N2KHNpZ25hbE1hbmFnZXJXaWRnZXQsIGFsbEl0ZW1zKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFeHBvcnRzIGFsbCBkYXRhIGFzIC5tY2VcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtTaWduYWxNYW5hZ2VyV2lkZ2V0fSBzaWduYWxNYW5hZ2VyV2lkZ2V0XHJcbiAgICAgKiBAcGFyYW0geyp9IGFsbEl0ZW1zXHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckV4cG9ydERyb3BEb3duTWVudVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGV4cG9ydEFsbERhdGEoc2lnbmFsTWFuYWdlcldpZGdldDogU2lnbmFsTWFuYWdlcldpZGdldCkge1xyXG4gICAgICAgIHRoaXMudG9vbGJhci5leHBvcnRBbGxUcmFjZURhdGEoc2lnbmFsTWFuYWdlcldpZGdldCk7XHJcbiAgICB9XHJcbn0iXX0=