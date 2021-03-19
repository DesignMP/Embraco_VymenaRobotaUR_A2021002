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
            _super.prototype.setHeaderContent.call(this, this.getHeaderText());
            // Set dynamic column settings
            _super.prototype.setDynamicColumn.call(this, 1, 100);
        };
        OverviewTreeGridWidgetBase.prototype.initializeComponent = function () {
            this.component.disablePersisting();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcnZpZXdUcmVlR3JpZFdpZGdldEJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY29tbW9uL292ZXJ2aWV3VHJlZUdyaWRXaWRnZXRCYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVBO1FBQWtELDhDQUFrQjtRQUFwRTs7UUF3SEEsQ0FBQztRQXRIQTs7OztXQUlNO1FBQ0gsK0NBQVUsR0FBVixVQUFXLGlCQUF5QjtZQUVoQyxpQkFBTSxVQUFVLFlBQUMsaUJBQWlCLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDeEMsaUJBQU0sZ0JBQWdCLFlBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7WUFFN0MsOEJBQThCO1lBQzlCLGlCQUFNLGdCQUFnQixZQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNuQyxDQUFDO1FBRUQsd0RBQW1CLEdBQW5CO1lBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3ZDLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNPLG1EQUFjLEdBQXhCO1lBQUEsaUJBYUM7WUFaUyxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFFLENBQUMsVUFBVSx5Q0FDckMsSUFBSSxDQUFDLDJCQUEyQixFQUFFLEdBQ2xDLElBQUksQ0FBQyw4QkFBOEIsRUFBRSxHQUNyQyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsS0FFbEMsaUJBQWlCLEVBQUUsVUFBQyxJQUFJLElBQUssT0FBQSxLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUF0QixDQUFzQixFQUNuRCxhQUFhLEVBQUUsVUFBQyxJQUFJO29CQUNoQixJQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLGdCQUFnQixFQUFDO3dCQUNyQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENB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QUFDO1FBRU8sbUVBQThCLEdBQXRDO1lBQUEsaUJBTUk7WUFMRyxPQUFPO2dCQUNILGlCQUFpQixFQUFFLElBQUk7Z0JBQ3ZCLG9CQUFvQixFQUFFLEVBQUUsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUU7Z0JBQ3JGLGFBQWEsRUFBRSxVQUFDLElBQUksSUFBSyxPQUFBLGlCQUFNLG1CQUFtQixhQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUF2RCxDQUF1RDthQUNuRixDQUFDO1FBQ04sQ0FBQztRQUVTLDZEQUF3QixHQUFsQztZQUNJLE9BQU87Z0JBQ0gsWUFBWSxFQUFFLEtBQUs7YUFDdEIsQ0FBQztRQUNOLENBQUM7UUFhTCxpQ0FBQztJQUFELENBQUMsQUF4SEQsQ0FBa0QsdUNBQWtCLEdBd0huRTtJQUVPLGdFQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRyZWVHcmlkV2lkZ2V0QmFzZSB9IGZyb20gXCIuL3RyZWVHcmlkV2lkZ2V0QmFzZVwiO1xyXG5cclxuYWJzdHJhY3QgY2xhc3MgT3ZlcnZpZXdUcmVlR3JpZFdpZGdldEJhc2UgZXh0ZW5kcyBUcmVlR3JpZFdpZGdldEJhc2V7XHJcblxyXG5cdC8qKiBpbml0aWFsaXplIHRoZSB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGF5b3V0Q29udGFpbmVySWRcclxuICAgICAqIEBtZW1iZXJvZiBPdmVydmlld1RyZWVHcmlkV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBpbml0aWFsaXplKGxheW91dENvbnRhaW5lcklkOiBzdHJpbmcpIHtcclxuICAgICAgICBcclxuICAgICAgICBzdXBlci5pbml0aWFsaXplKGxheW91dENvbnRhaW5lcklkLCAzMCk7XHJcbiAgICAgICAgc3VwZXIuc2V0SGVhZGVyQ29udGVudCh0aGlzLmdldEhlYWRlclRleHQoKSk7XHJcblxyXG4gICAgICAgIC8vIFNldCBkeW5hbWljIGNvbHVtbiBzZXR0aW5nc1xyXG4gICAgICAgIHN1cGVyLnNldER5bmFtaWNDb2x1bW4oMSwgMTAwKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0aWFsaXplQ29tcG9uZW50KCl7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZGlzYWJsZVBlcnNpc3RpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZXMgdGhlIHRyZWUgZ3JpZCBmb3IgdGhlIGl0ZW1zIG92ZXJ2aWV3XHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQG1lbWJlcm9mIE92ZXJ2aWV3VHJlZUdyaWRXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBjcmVhdGVUcmVlR3JpZCgpIHtcclxuICAgICAgICAoPGFueT4kKHRoaXMuY3NzUGFyZW50Q29udGVudElkKSkuZWpUcmVlR3JpZCh7XHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCksXHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRDb2x1bW5SZXNpemVTdXBwb3J0KCksXHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRDb2x1bW5Tb3J0aW5nKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZWNvcmREb3VibGVDbGljazogKGFyZ3MpID0+IHRoaXMuZG91YmxlQ2xpY2soYXJncyksXHJcbiAgICAgICAgICAgIHF1ZXJ5Q2VsbEluZm86IChhcmdzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihhcmdzLmNvbHVtbi5maWVsZCA9PSBcImNvbW1hbmRCdXR0b25zXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQ29tbWFuZEJ1dHRvbnMoYXJncyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkcyB0aGUgc3R5bGVzIGZvciB0aGUgb3ZlcnZpZXcgdHJlZWdyaWQgd2lkZ2V0IGJhc2VcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgT3ZlcnZpZXdUcmVlR3JpZFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgbG9hZFN0eWxlcygpe1xyXG4gICAgICAgIHN1cGVyLmxvYWRTdHlsZXMoKTtcclxuICAgICAgICBzdXBlci5hZGRTdHlsZShcIndpZGdldHMvY29tbW9uL3N0eWxlL2Nzcy9vdmVydmlld0NvbW1hbmRCdXR0b25TdHlsZS5jc3NcIik7XHJcbiAgICB9XHJcblxyXG5cdHByaXZhdGUgYWRkQ29tbWFuZEJ1dHRvbnMoYXJncyl7XHJcbiAgICAgICAgYXJncy5jZWxsRWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICBcclxuICAgICAgICB2YXIgY2VsbFJvd0luZGV4ID0gYXJncy5kYXRhLmluZGV4O1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBjb21tYW5kSWRzID0gdGhpcy5nZXRDb21tYW5kSWRzRnJvbUl0ZW0oYXJncy5kYXRhLml0ZW0pO1xyXG4gICAgICAgIC8vIEFkZCBkaXZzIGZvciB0aGUgYnV0dG9uc1xyXG4gICAgICAgIGZvcihsZXQgaW5kZXg9MDsgaW5kZXggPCBjb21tYW5kSWRzLmxlbmd0aDsgaW5kZXgrKyl7XHJcbiAgICAgICAgICAgIGxldCBjb21tYW5kSWQgPSBjb21tYW5kSWRzW2luZGV4XTtcclxuICAgICAgICAgICAgbGV0IHVuaXF1ZUlkID0gdGhpcy5nZXRVbmlxdWVCdXR0b25JZChjb21tYW5kSWQsIGNlbGxSb3dJbmRleCk7XHJcbiAgICAgICAgICAgIGFyZ3MuY2VsbEVsZW1lbnQuaW5uZXJIVE1MICs9IFwiPGRpdiBpZD0nXCIgKyB1bmlxdWVJZCArIFwiJyA+PC9kaXY+ICAgXCI7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIGVqQnV0dG9ucyB3aXRoaW4gdGhlIGRpdnMgKGFmdGVyIGFsbCBkaXZzIHdlcmUgaW5zZXJ0ZWQgaW4gdGhlIGlubmVySFRNTCwgb3RoZXJ3aXNlIHByb2JsZW1zIG9jY3VyKVxyXG4gICAgICAgIGZvcihsZXQgaW5kZXg9MDsgaW5kZXggPCBjb21tYW5kSWRzLmxlbmd0aDsgaW5kZXgrKyl7XHJcbiAgICAgICAgICAgIGxldCBjb21tYW5kSWQgPSBjb21tYW5kSWRzW2luZGV4XTtcclxuICAgICAgICAgICAgbGV0IHVuaXF1ZUlkID0gdGhpcy5nZXRVbmlxdWVCdXR0b25JZChjb21tYW5kSWQsIGNlbGxSb3dJbmRleCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQnV0dG9uKHVuaXF1ZUlkLCBjb21tYW5kSWQsIGFyZ3MuZGF0YS5pdGVtKVxyXG4gICAgICAgIH07XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGNyZWF0ZUJ1dHRvbih1bmlxdWVJZCwgY29tbWFuZElkOiBzdHJpbmcsIGl0ZW0pe1xyXG4gICAgICAgICQoXCIjXCIgKyB1bmlxdWVJZCkuZWpCdXR0b24oe1xyXG4gICAgICAgICAgICB0ZXh0OiB0aGlzLmdldE5hbWVGb3JDb21tYW5kSWQoY29tbWFuZElkKSxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IGVqLkNvbnRlbnRUeXBlLlRleHRBbmRJbWFnZSxcclxuICAgICAgICAgICAgY3NzQ2xhc3M6IFwib3ZlcnZpZXdDb21tYW5kQnV0dG9uXCIsXHJcbiAgICAgICAgICAgIHByZWZpeEljb246IFwiZS1pY29uXCIgLC8vU3BlY2lmaWVzIHRoZSBwcmltYXJ5IGljb24gZm9yIEJ1dHRvblxyXG4gICAgICAgICAgICBjbGljazogKGNsaWNrQXJncykgPT4gdGhpcy5jbGljayhpdGVtLCBjb21tYW5kSWQpLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgaW1hZ2VQYXRoID0gdGhpcy5nZXRJY29uRm9yQ29tbWFuZElkKGNvbW1hbmRJZCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGJ1dHRvbkVsZW1lbnQgPSAkKFwiI1wiICsgdW5pcXVlSWQpWzBdO1xyXG4gICAgICAgIGJ1dHRvbkVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uWCA9IFwiM3B4XCI7XHJcbiAgICAgICAgYnV0dG9uRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb25ZID0gXCIycHhcIjtcclxuICAgICAgICBidXR0b25FbGVtZW50LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKCdcIiArIGltYWdlUGF0aCArXCInKVwiO1xyXG4gICAgICAgIGJ1dHRvbkVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZFJlcGVhdCA9IFwibm8tcmVwZWF0XCI7XHJcbiAgICAgICAgYnV0dG9uRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kU2l6ZSA9IFwiMTZweCAxNnB4XCI7XHJcblx0fVxyXG5cdFx0XHJcblx0cHJpdmF0ZSBnZXRVbmlxdWVCdXR0b25JZChjb21tYW5kSWQ6IHN0cmluZywgY2VsbFJvd0luZGV4KTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiBcIm92ZXJ2aWV3Q29tbWFuZEJ1dHRvblwiICsgY29tbWFuZElkICsgY2VsbFJvd0luZGV4O1xyXG5cdH1cclxuXHRcclxuXHRwcml2YXRlIGdldFRyZWVHcmlkQ29sdW1uUmVzaXplU3VwcG9ydCgpOiB7fXtcclxuICAgICAgICByZXR1cm4geyAgICAgICAgXHJcbiAgICAgICAgICAgIGFsbG93Q29sdW1uUmVzaXplOiB0cnVlLFxyXG4gICAgICAgICAgICBjb2x1bW5SZXNpemVTZXR0aW5nczogeyBjb2x1bW5SZXNpemVNb2RlOiBlai5UcmVlR3JpZC5Db2x1bW5SZXNpemVNb2RlLkZpeGVkQ29sdW1ucyB9LFxyXG4gICAgICAgICAgICBjb2x1bW5SZXNpemVkOiAoYXJncykgPT4gc3VwZXIucmVzaXplRHluYW1pY0NvbHVtbihhcmdzLmNvbHVtbkluZGV4LCBhcmdzLm1vZGVsKSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBnZXRUcmVlR3JpZENvbHVtblNvcnRpbmcoKToge317XHJcbiAgICAgICAgcmV0dXJuIHsgICAgICAgIFxyXG4gICAgICAgICAgICBhbGxvd1NvcnRpbmc6IGZhbHNlLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG5cdHByb3RlY3RlZCBhYnN0cmFjdCBnZXRIZWFkZXJUZXh0KCk6IHN0cmluZztcclxuXHJcblx0cHJvdGVjdGVkIGFic3RyYWN0IGdldFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbigpOiB7fTtcclxuXHJcblx0cHJvdGVjdGVkIGFic3RyYWN0IGdldE5hbWVGb3JDb21tYW5kSWQoY29tbWFuZElkOiBzdHJpbmcpOiBzdHJpbmc7XHJcblx0cHJvdGVjdGVkIGFic3RyYWN0IGdldEljb25Gb3JDb21tYW5kSWQoY29tbWFuZElkOiBzdHJpbmcpOiBzdHJpbmc7XHJcblxyXG5cdHByb3RlY3RlZCBhYnN0cmFjdCBnZXRDb21tYW5kSWRzRnJvbUl0ZW0oaXRlbSk6IEFycmF5PHN0cmluZz47XHJcblx0XHJcblx0cHJvdGVjdGVkIGFic3RyYWN0IGNsaWNrKGl0ZW0sIGNvbW1hbmRJZCk7XHJcblx0cHJvdGVjdGVkIGFic3RyYWN0IGRvdWJsZUNsaWNrKGFyZ3MpO1xyXG59XHJcblxyXG5leHBvcnQge092ZXJ2aWV3VHJlZUdyaWRXaWRnZXRCYXNlfTsiXX0=