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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
define(["require", "exports", "./treeGridWidgetBase"], function (require, exports, treeGridWidgetBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OverviewTreeGridWidgetBase = /** @class */ (function (_super) {
        __extends(OverviewTreeGridWidgetBase, _super);
        function OverviewTreeGridWidgetBase() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /** initialize the widget
         *
         * @param {string} layoutContainerId
         * @memberof OverviewTreeGridWidgetBase
         */
        OverviewTreeGridWidgetBase.prototype.initialize = function (layoutContainerId) {
            _super.prototype.initialize.call(this, layoutContainerId, 30);
        };
        OverviewTreeGridWidgetBase.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            _super.prototype.setHeaderContent.call(this, this.getHeaderText());
            // Set dynamic column settings
            _super.prototype.setDynamicColumn.call(this, 1, 100);
        };
        /**
         * creates the tree grid for the items overview
         *
         * @protected
         * @memberof OverviewTreeGridWidgetBase
         */
        OverviewTreeGridWidgetBase.prototype.createTreeGrid = function () {
            var _this = this;
            $(this.cssParentContentId).ejTreeGrid(__assign(__assign(__assign(__assign({}, this.getTreeGridColumnDefinition()), this.getTreeGridColumnResizeSupport()), this.getTreeGridColumnSorting()), { recordDoubleClick: function (args) { return _this.doubleClick(args); }, queryCellInfo: function (args) {
                    if (args.column.field == "commandButtons") {
                        _this.addCommandButtons(args);
                    }
                } }));
        };
        /**
         * Loads the styles for the overview treegrid widget base
         *
         * @memberof OverviewTreeGridWidgetBase
         */
        OverviewTreeGridWidgetBase.prototype.loadStyles = function () {
            _super.prototype.loadStyles.call(this);
            _super.prototype.addStyle.call(this, "widgets/common/style/css/overviewCommandButtonStyle.css");
        };
        OverviewTreeGridWidgetBase.prototype.addCommandButtons = function (args) {
            args.cellElement.innerHTML = "";
            var cellRowIndex = args.data.index;
            var commandIds = this.getCommandIdsFromItem(args.data.item);
            // Add divs for the buttons
            for (var index = 0; index < commandIds.length; index++) {
                var commandId = commandIds[index];
                var uniqueId = this.getUniqueButtonId(commandId, cellRowIndex);
                args.cellElement.innerHTML += "<div id='" + uniqueId + "' ></div>   ";
            }
            ;
            // Create ejButtons within the divs (after all divs were inserted in the innerHTML, otherwise problems occur)
            for (var index = 0; index < commandIds.length; index++) {
                var commandId = commandIds[index];
                var uniqueId = this.getUniqueButtonId(commandId, cellRowIndex);
                this.createButton(uniqueId, commandId, args.data.item);
            }
            ;
        };
        OverviewTreeGridWidgetBase.prototype.createButton = function (uniqueId, commandId, item) {
            var _this = this;
            $("#" + uniqueId).ejButton({
                text: this.getNameForCommandId(commandId),
                contentType: ej.ContentType.TextAndImage,
                cssClass: "overviewCommandButton",
                prefixIcon: "e-icon",
                click: function (clickArgs) { return _this.click(item, commandId); },
            });
            var imagePath = this.getIconForCommandId(commandId);
            var buttonElement = $("#" + uniqueId)[0];
            buttonElement.style.backgroundPositionX = "3px";
            buttonElement.style.backgroundPositionY = "2px";
            buttonElement.style.backgroundImage = "url('" + imagePath + "')";
            buttonElement.style.backgroundRepeat = "no-repeat";
            buttonElement.style.backgroundSize = "16px 16px";
        };
        OverviewTreeGridWidgetBase.prototype.getUniqueButtonId = function (commandId, cellRowIndex) {
            return "overviewCommandButton" + commandId + cellRowIndex;
        };
        OverviewTreeGridWidgetBase.prototype.getTreeGridColumnResizeSupport = function () {
            var _this = this;
            return {
                allowColumnResize: true,
                columnResizeSettings: { columnResizeMode: ej.TreeGrid.ColumnResizeMode.FixedColumns },
                columnResized: function (args) { return _super.prototype.resizeDynamicColumn.call(_this, args.columnIndex, args.model); },
            };
        };
        OverviewTreeGridWidgetBase.prototype.getTreeGridColumnSorting = function () {
            return {
                allowSorting: false,
            };
        };
        return OverviewTreeGridWidgetBase;
    }(treeGridWidgetBase_1.TreeGridWidgetBase));
    exports.OverviewTreeGridWidgetBase = OverviewTreeGridWidgetBase;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcnZpZXdUcmVlR3JpZFdpZGdldEJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY29tbW9uL292ZXJ2aWV3VHJlZUdyaWRXaWRnZXRCYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVBO1FBQWtELDhDQUFrQjtRQUFwRTs7UUF3SEEsQ0FBQztRQXRIQTs7OztXQUlNO1FBQ0gsK0NBQVUsR0FBVixVQUFXLGlCQUF5QjtZQUNoQyxpQkFBTSxVQUFVLFlBQUMsaUJBQWlCLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDNUMsQ0FBQztRQUVELGdEQUFXLEdBQVg7WUFDSSxpQkFBTSxXQUFXLFdBQUUsQ0FBQztZQUVwQixpQkFBTSxnQkFBZ0IsWUFBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQztZQUU3Qyw4QkFBOEI7WUFDOUIsaUJBQU0sZ0JBQWdCLFlBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ25DLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNPLG1EQUFjLEdBQXhCO1lBQUEsaUJBYUM7WUFaUyxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFFLENBQUMsVUFBVSx5Q0FDckMsSUFBSSxDQUFDLDJCQUEyQixFQUFFLEdBQ2xDLElBQUksQ0FBQyw4QkFBOEIsRUFBRSxHQUNyQyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsS0FFbEMsaUJBQWlCLEVBQUUsVUFBQyxJQUFJLElBQUssT0FBQSxLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUF0QixDQUFzQixFQUNuRCxhQUFhLEVBQUUsVUFBQyxJQUFJO29CQUNoQixJQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLGdCQUFnQixFQUFDO3dCQUNyQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQ2hDO2dCQUNMLENB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QXRDO1lBQUEsaUJBTUk7WUFMRyxPQUFPO2dCQUNILGlCQUFpQixFQUFFLElBQUk7Z0JBQ3ZCLG9CQUFvQixFQUFFLEVBQUUsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUU7Z0JBQ3JGLGFBQWEsRUFBRSxVQUFDLElBQUksSUFBSyxPQUFBLGlCQUFNLG1CQUFtQixhQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUF2RCxDQUF1RDthQUNuRixDQUFDO1FBQ04sQ0FBQztRQUVTLDZEQUF3QixHQUFsQztZQUNJLE9BQU87Z0JBQ0gsWUFBWSxFQUFFLEtBQUs7YUFDdEIsQ0FBQztRQUNOLENBQUM7UUFhTCxpQ0FBQztJQUFELENBQUMsQUF4SEQsQ0FBa0QsdUNBQWtCLEdBd0huRTtJQUVPLGdFQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRyZWVHcmlkV2lkZ2V0QmFzZSB9IGZyb20gXCIuL3RyZWVHcmlkV2lkZ2V0QmFzZVwiO1xyXG5cclxuYWJzdHJhY3QgY2xhc3MgT3ZlcnZpZXdUcmVlR3JpZFdpZGdldEJhc2UgZXh0ZW5kcyBUcmVlR3JpZFdpZGdldEJhc2V7XHJcblxyXG5cdC8qKiBpbml0aWFsaXplIHRoZSB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGF5b3V0Q29udGFpbmVySWRcclxuICAgICAqIEBtZW1iZXJvZiBPdmVydmlld1RyZWVHcmlkV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBpbml0aWFsaXplKGxheW91dENvbnRhaW5lcklkOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlci5pbml0aWFsaXplKGxheW91dENvbnRhaW5lcklkLCAzMCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZWQoKXtcclxuICAgICAgICBzdXBlci5pbml0aWFsaXplZCgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHN1cGVyLnNldEhlYWRlckNvbnRlbnQodGhpcy5nZXRIZWFkZXJUZXh0KCkpO1xyXG5cclxuICAgICAgICAvLyBTZXQgZHluYW1pYyBjb2x1bW4gc2V0dGluZ3NcclxuICAgICAgICBzdXBlci5zZXREeW5hbWljQ29sdW1uKDEsIDEwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjcmVhdGVzIHRoZSB0cmVlIGdyaWQgZm9yIHRoZSBpdGVtcyBvdmVydmlld1xyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBtZW1iZXJvZiBPdmVydmlld1RyZWVHcmlkV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlVHJlZUdyaWQoKSB7XHJcbiAgICAgICAgKDxhbnk+JCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCkpLmVqVHJlZUdyaWQoe1xyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbigpLFxyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkQ29sdW1uUmVzaXplU3VwcG9ydCgpLFxyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkQ29sdW1uU29ydGluZygpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgcmVjb3JkRG91YmxlQ2xpY2s6IChhcmdzKSA9PiB0aGlzLmRvdWJsZUNsaWNrKGFyZ3MpLFxyXG4gICAgICAgICAgICBxdWVyeUNlbGxJbmZvOiAoYXJncykgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYoYXJncy5jb2x1bW4uZmllbGQgPT0gXCJjb21tYW5kQnV0dG9uc1wiKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZENvbW1hbmRCdXR0b25zKGFyZ3MpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZHMgdGhlIHN0eWxlcyBmb3IgdGhlIG92ZXJ2aWV3IHRyZWVncmlkIHdpZGdldCBiYXNlXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE92ZXJ2aWV3VHJlZUdyaWRXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIGxvYWRTdHlsZXMoKXtcclxuICAgICAgICBzdXBlci5sb2FkU3R5bGVzKCk7XHJcbiAgICAgICAgc3VwZXIuYWRkU3R5bGUoXCJ3aWRnZXRzL2NvbW1vbi9zdHlsZS9jc3Mvb3ZlcnZpZXdDb21tYW5kQnV0dG9uU3R5bGUuY3NzXCIpO1xyXG4gICAgfVxyXG5cclxuXHRwcml2YXRlIGFkZENvbW1hbmRCdXR0b25zKGFyZ3Mpe1xyXG4gICAgICAgIGFyZ3MuY2VsbEVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgXHJcbiAgICAgICAgdmFyIGNlbGxSb3dJbmRleCA9IGFyZ3MuZGF0YS5pbmRleDtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgY29tbWFuZElkcyA9IHRoaXMuZ2V0Q29tbWFuZElkc0Zyb21JdGVtKGFyZ3MuZGF0YS5pdGVtKTtcclxuICAgICAgICAvLyBBZGQgZGl2cyBmb3IgdGhlIGJ1dHRvbnNcclxuICAgICAgICBmb3IobGV0IGluZGV4PTA7IGluZGV4IDwgY29tbWFuZElkcy5sZW5ndGg7IGluZGV4Kyspe1xyXG4gICAgICAgICAgICBsZXQgY29tbWFuZElkID0gY29tbWFuZElkc1tpbmRleF07XHJcbiAgICAgICAgICAgIGxldCB1bmlxdWVJZCA9IHRoaXMuZ2V0VW5pcXVlQnV0dG9uSWQoY29tbWFuZElkLCBjZWxsUm93SW5kZXgpO1xyXG4gICAgICAgICAgICBhcmdzLmNlbGxFbGVtZW50LmlubmVySFRNTCArPSBcIjxkaXYgaWQ9J1wiICsgdW5pcXVlSWQgKyBcIicgPjwvZGl2PiAgIFwiO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBlakJ1dHRvbnMgd2l0aGluIHRoZSBkaXZzIChhZnRlciBhbGwgZGl2cyB3ZXJlIGluc2VydGVkIGluIHRoZSBpbm5lckhUTUwsIG90aGVyd2lzZSBwcm9ibGVtcyBvY2N1cilcclxuICAgICAgICBmb3IobGV0IGluZGV4PTA7IGluZGV4IDwgY29tbWFuZElkcy5sZW5ndGg7IGluZGV4Kyspe1xyXG4gICAgICAgICAgICBsZXQgY29tbWFuZElkID0gY29tbWFuZElkc1tpbmRleF07XHJcbiAgICAgICAgICAgIGxldCB1bmlxdWVJZCA9IHRoaXMuZ2V0VW5pcXVlQnV0dG9uSWQoY29tbWFuZElkLCBjZWxsUm93SW5kZXgpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUJ1dHRvbih1bmlxdWVJZCwgY29tbWFuZElkLCBhcmdzLmRhdGEuaXRlbSlcclxuICAgICAgICB9O1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBjcmVhdGVCdXR0b24odW5pcXVlSWQsIGNvbW1hbmRJZDogc3RyaW5nLCBpdGVtKXtcclxuICAgICAgICAkKFwiI1wiICsgdW5pcXVlSWQpLmVqQnV0dG9uKHtcclxuICAgICAgICAgICAgdGV4dDogdGhpcy5nZXROYW1lRm9yQ29tbWFuZElkKGNvbW1hbmRJZCksXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBlai5Db250ZW50VHlwZS5UZXh0QW5kSW1hZ2UsXHJcbiAgICAgICAgICAgIGNzc0NsYXNzOiBcIm92ZXJ2aWV3Q29tbWFuZEJ1dHRvblwiLFxyXG4gICAgICAgICAgICBwcmVmaXhJY29uOiBcImUtaWNvblwiICwvL1NwZWNpZmllcyB0aGUgcHJpbWFyeSBpY29uIGZvciBCdXR0b25cclxuICAgICAgICAgICAgY2xpY2s6IChjbGlja0FyZ3MpID0+IHRoaXMuY2xpY2soaXRlbSwgY29tbWFuZElkKSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IGltYWdlUGF0aCA9IHRoaXMuZ2V0SWNvbkZvckNvbW1hbmRJZChjb21tYW5kSWQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBidXR0b25FbGVtZW50ID0gJChcIiNcIiArIHVuaXF1ZUlkKVswXTtcclxuICAgICAgICBidXR0b25FbGVtZW50LnN0eWxlLmJhY2tncm91bmRQb3NpdGlvblggPSBcIjNweFwiO1xyXG4gICAgICAgIGJ1dHRvbkVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uWSA9IFwiMnB4XCI7XHJcbiAgICAgICAgYnV0dG9uRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybCgnXCIgKyBpbWFnZVBhdGggK1wiJylcIjtcclxuICAgICAgICBidXR0b25FbGVtZW50LnN0eWxlLmJhY2tncm91bmRSZXBlYXQgPSBcIm5vLXJlcGVhdFwiO1xyXG4gICAgICAgIGJ1dHRvbkVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZFNpemUgPSBcIjE2cHggMTZweFwiO1xyXG5cdH1cclxuXHRcdFxyXG5cdHByaXZhdGUgZ2V0VW5pcXVlQnV0dG9uSWQoY29tbWFuZElkOiBzdHJpbmcsIGNlbGxSb3dJbmRleCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gXCJvdmVydmlld0NvbW1hbmRCdXR0b25cIiArIGNvbW1hbmRJZCArIGNlbGxSb3dJbmRleDtcclxuXHR9XHJcblx0XHJcblx0cHJpdmF0ZSBnZXRUcmVlR3JpZENvbHVtblJlc2l6ZVN1cHBvcnQoKToge317XHJcbiAgICAgICAgcmV0dXJuIHsgICAgICAgIFxyXG4gICAgICAgICAgICBhbGxvd0NvbHVtblJlc2l6ZTogdHJ1ZSxcclxuICAgICAgICAgICAgY29sdW1uUmVzaXplU2V0dGluZ3M6IHsgY29sdW1uUmVzaXplTW9kZTogZWouVHJlZUdyaWQuQ29sdW1uUmVzaXplTW9kZS5GaXhlZENvbHVtbnMgfSxcclxuICAgICAgICAgICAgY29sdW1uUmVzaXplZDogKGFyZ3MpID0+IHN1cGVyLnJlc2l6ZUR5bmFtaWNDb2x1bW4oYXJncy5jb2x1bW5JbmRleCwgYXJncy5tb2RlbCksXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZ2V0VHJlZUdyaWRDb2x1bW5Tb3J0aW5nKCk6IHt9e1xyXG4gICAgICAgIHJldHVybiB7ICAgICAgICBcclxuICAgICAgICAgICAgYWxsb3dTb3J0aW5nOiBmYWxzZSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuXHRwcm90ZWN0ZWQgYWJzdHJhY3QgZ2V0SGVhZGVyVGV4dCgpOiBzdHJpbmc7XHJcblxyXG5cdHByb3RlY3RlZCBhYnN0cmFjdCBnZXRUcmVlR3JpZENvbHVtbkRlZmluaXRpb24oKToge307XHJcblxyXG5cdHByb3RlY3RlZCBhYnN0cmFjdCBnZXROYW1lRm9yQ29tbWFuZElkKGNvbW1hbmRJZDogc3RyaW5nKTogc3RyaW5nO1xyXG5cdHByb3RlY3RlZCBhYnN0cmFjdCBnZXRJY29uRm9yQ29tbWFuZElkKGNvbW1hbmRJZDogc3RyaW5nKTogc3RyaW5nO1xyXG5cclxuXHRwcm90ZWN0ZWQgYWJzdHJhY3QgZ2V0Q29tbWFuZElkc0Zyb21JdGVtKGl0ZW0pOiBBcnJheTxzdHJpbmc+O1xyXG5cdFxyXG5cdHByb3RlY3RlZCBhYnN0cmFjdCBjbGljayhpdGVtLCBjb21tYW5kSWQpO1xyXG5cdHByb3RlY3RlZCBhYnN0cmFjdCBkb3VibGVDbGljayhhcmdzKTtcclxufVxyXG5cclxuZXhwb3J0IHtPdmVydmlld1RyZWVHcmlkV2lkZ2V0QmFzZX07Il19