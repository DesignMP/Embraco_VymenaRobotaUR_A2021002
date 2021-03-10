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
        /**
         * creates the tree grid for the items overview
         *
         * @protected
         * @memberof OverviewTreeGridWidgetBase
         */
        OverviewTreeGridWidgetBase.prototype.createTreeGrid = function () {
            var _this = this;
            $(this.cssParentContentId).ejTreeGrid(__assign(__assign(__assign({}, this.getTreeGridColumnDefinition()), this.getTreeGridColumnResizeSupport()), { recordDoubleClick: function (args) { return _this.doubleClick(args); }, queryCellInfo: function (args) {
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
        return OverviewTreeGridWidgetBase;
    }(treeGridWidgetBase_1.TreeGridWidgetBase));
    exports.OverviewTreeGridWidgetBase = OverviewTreeGridWidgetBase;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcnZpZXdUcmVlR3JpZFdpZGdldEJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY29tbW9uL292ZXJ2aWV3VHJlZUdyaWRXaWRnZXRCYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVBO1FBQWtELDhDQUFrQjtRQUFwRTs7UUE2R0EsQ0FBQztRQTNHQTs7OztXQUlNO1FBQ0gsK0NBQVUsR0FBVixVQUFXLGlCQUF5QjtZQUVoQyxpQkFBTSxVQUFVLFlBQUMsaUJBQWlCLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDeEMsaUJBQU0sZ0JBQWdCLFlBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7WUFFN0MsOEJBQThCO1lBQzlCLGlCQUFNLGdCQUFnQixZQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNuQyxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDTyxtREFBYyxHQUF4QjtZQUFBLGlCQVlDO1lBWFMsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBRSxDQUFDLFVBQVUsZ0NBQ3JDLElBQUksQ0FBQywyQkFBMkIsRUFBRSxHQUNsQyxJQUFJLENBQUMsOEJBQThCLEVBQUUsS0FFeEMsaUJBQWlCLEVBQUUsVUFBQyxJQUFJLElBQUssT0FBQSxLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUF0QixDQUFzQixFQUNuRCxhQUFhLEVBQUUsVUFBQyxJQUFJO29CQUNoQixJQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLGdCQUFnQixFQUFDO3dCQUNyQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQ2hDO2dCQUNMLENBQUMsSUFDSCxDQUFDO1FBQ1AsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSCwrQ0FBVSxHQUFWO1lBQ0ksaUJBQU0sVUFBVSxXQUFFLENBQUM7WUFD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QUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUU7Z0JBQ3JGLGFBQWEsRUFBRSxVQUFDLElBQUksSUFBSyxPQUFBLGlCQUFNLG1CQUFtQixhQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUF2RCxDQUF1RDthQUNuRixDQUFDO1FBQ04sQ0FBQztRQWFMLGlDQUFDO0lBQUQsQ0FBQyxBQTdHRCxDQUFrRCx1Q0FBa0IsR0E2R25FO0lBRU8sZ0VBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHJlZUdyaWRXaWRnZXRCYXNlIH0gZnJvbSBcIi4vdHJlZUdyaWRXaWRnZXRCYXNlXCI7XHJcblxyXG5hYnN0cmFjdCBjbGFzcyBPdmVydmlld1RyZWVHcmlkV2lkZ2V0QmFzZSBleHRlbmRzIFRyZWVHcmlkV2lkZ2V0QmFzZXtcclxuXHJcblx0LyoqIGluaXRpYWxpemUgdGhlIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYXlvdXRDb250YWluZXJJZFxyXG4gICAgICogQG1lbWJlcm9mIE92ZXJ2aWV3VHJlZUdyaWRXaWRnZXRCYXNlXHJcbiAgICAgKi9cclxuICAgIGluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQ6IHN0cmluZykge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQsIDMwKTtcclxuICAgICAgICBzdXBlci5zZXRIZWFkZXJDb250ZW50KHRoaXMuZ2V0SGVhZGVyVGV4dCgpKTtcclxuXHJcbiAgICAgICAgLy8gU2V0IGR5bmFtaWMgY29sdW1uIHNldHRpbmdzXHJcbiAgICAgICAgc3VwZXIuc2V0RHluYW1pY0NvbHVtbigxLCAxMDApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY3JlYXRlcyB0aGUgdHJlZSBncmlkIGZvciB0aGUgaXRlbXMgb3ZlcnZpZXdcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAbWVtYmVyb2YgT3ZlcnZpZXdUcmVlR3JpZFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZVRyZWVHcmlkKCkge1xyXG4gICAgICAgICg8YW55PiQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpKS5lalRyZWVHcmlkKHtcclxuICAgICAgICAgICAgLi4udGhpcy5nZXRUcmVlR3JpZENvbHVtbkRlZmluaXRpb24oKSxcclxuICAgICAgICAgICAgLi4udGhpcy5nZXRUcmVlR3JpZENvbHVtblJlc2l6ZVN1cHBvcnQoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJlY29yZERvdWJsZUNsaWNrOiAoYXJncykgPT4gdGhpcy5kb3VibGVDbGljayhhcmdzKSxcclxuICAgICAgICAgICAgcXVlcnlDZWxsSW5mbzogKGFyZ3MpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKGFyZ3MuY29sdW1uLmZpZWxkID09IFwiY29tbWFuZEJ1dHRvbnNcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRDb21tYW5kQnV0dG9ucyhhcmdzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWRzIHRoZSBzdHlsZXMgZm9yIHRoZSBvdmVydmlldyB0cmVlZ3JpZCB3aWRnZXQgYmFzZVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBPdmVydmlld1RyZWVHcmlkV2lkZ2V0QmFzZVxyXG4gICAgICovXHJcbiAgICBsb2FkU3R5bGVzKCl7XHJcbiAgICAgICAgc3VwZXIubG9hZFN0eWxlcygpO1xyXG4gICAgICAgIHN1cGVyLmFkZFN0eWxlKFwid2lkZ2V0cy9jb21tb24vc3R5bGUvY3NzL292ZXJ2aWV3Q29tbWFuZEJ1dHRvblN0eWxlLmNzc1wiKTtcclxuICAgIH1cclxuXHJcblx0cHJpdmF0ZSBhZGRDb21tYW5kQnV0dG9ucyhhcmdzKXtcclxuICAgICAgICBhcmdzLmNlbGxFbGVtZW50LmlubmVySFRNTCA9IFwiXCI7XHJcbiAgIFxyXG4gICAgICAgIHZhciBjZWxsUm93SW5kZXggPSBhcmdzLmRhdGEuaW5kZXg7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGNvbW1hbmRJZHMgPSB0aGlzLmdldENvbW1hbmRJZHNGcm9tSXRlbShhcmdzLmRhdGEuaXRlbSk7XHJcbiAgICAgICAgLy8gQWRkIGRpdnMgZm9yIHRoZSBidXR0b25zXHJcbiAgICAgICAgZm9yKGxldCBpbmRleD0wOyBpbmRleCA8IGNvbW1hbmRJZHMubGVuZ3RoOyBpbmRleCsrKXtcclxuICAgICAgICAgICAgbGV0IGNvbW1hbmRJZCA9IGNvbW1hbmRJZHNbaW5kZXhdO1xyXG4gICAgICAgICAgICBsZXQgdW5pcXVlSWQgPSB0aGlzLmdldFVuaXF1ZUJ1dHRvbklkKGNvbW1hbmRJZCwgY2VsbFJvd0luZGV4KTtcclxuICAgICAgICAgICAgYXJncy5jZWxsRWxlbWVudC5pbm5lckhUTUwgKz0gXCI8ZGl2IGlkPSdcIiArIHVuaXF1ZUlkICsgXCInID48L2Rpdj4gICBcIjtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgZWpCdXR0b25zIHdpdGhpbiB0aGUgZGl2cyAoYWZ0ZXIgYWxsIGRpdnMgd2VyZSBpbnNlcnRlZCBpbiB0aGUgaW5uZXJIVE1MLCBvdGhlcndpc2UgcHJvYmxlbXMgb2NjdXIpXHJcbiAgICAgICAgZm9yKGxldCBpbmRleD0wOyBpbmRleCA8IGNvbW1hbmRJZHMubGVuZ3RoOyBpbmRleCsrKXtcclxuICAgICAgICAgICAgbGV0IGNvbW1hbmRJZCA9IGNvbW1hbmRJZHNbaW5kZXhdO1xyXG4gICAgICAgICAgICBsZXQgdW5pcXVlSWQgPSB0aGlzLmdldFVuaXF1ZUJ1dHRvbklkKGNvbW1hbmRJZCwgY2VsbFJvd0luZGV4KTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVCdXR0b24odW5pcXVlSWQsIGNvbW1hbmRJZCwgYXJncy5kYXRhLml0ZW0pXHJcbiAgICAgICAgfTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgY3JlYXRlQnV0dG9uKHVuaXF1ZUlkLCBjb21tYW5kSWQ6IHN0cmluZywgaXRlbSl7XHJcbiAgICAgICAgJChcIiNcIiArIHVuaXF1ZUlkKS5lakJ1dHRvbih7XHJcbiAgICAgICAgICAgIHRleHQ6IHRoaXMuZ2V0TmFtZUZvckNvbW1hbmRJZChjb21tYW5kSWQpLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogZWouQ29udGVudFR5cGUuVGV4dEFuZEltYWdlLFxyXG4gICAgICAgICAgICBjc3NDbGFzczogXCJvdmVydmlld0NvbW1hbmRCdXR0b25cIixcclxuICAgICAgICAgICAgcHJlZml4SWNvbjogXCJlLWljb25cIiAsLy9TcGVjaWZpZXMgdGhlIHByaW1hcnkgaWNvbiBmb3IgQnV0dG9uXHJcbiAgICAgICAgICAgIGNsaWNrOiAoY2xpY2tBcmdzKSA9PiB0aGlzLmNsaWNrKGl0ZW0sIGNvbW1hbmRJZCksXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBpbWFnZVBhdGggPSB0aGlzLmdldEljb25Gb3JDb21tYW5kSWQoY29tbWFuZElkKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgYnV0dG9uRWxlbWVudCA9ICQoXCIjXCIgKyB1bmlxdWVJZClbMF07XHJcbiAgICAgICAgYnV0dG9uRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb25YID0gXCIzcHhcIjtcclxuICAgICAgICBidXR0b25FbGVtZW50LnN0eWxlLmJhY2tncm91bmRQb3NpdGlvblkgPSBcIjJweFwiO1xyXG4gICAgICAgIGJ1dHRvbkVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoJ1wiICsgaW1hZ2VQYXRoICtcIicpXCI7XHJcbiAgICAgICAgYnV0dG9uRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kUmVwZWF0ID0gXCJuby1yZXBlYXRcIjtcclxuICAgICAgICBidXR0b25FbGVtZW50LnN0eWxlLmJhY2tncm91bmRTaXplID0gXCIxNnB4IDE2cHhcIjtcclxuXHR9XHJcblx0XHRcclxuXHRwcml2YXRlIGdldFVuaXF1ZUJ1dHRvbklkKGNvbW1hbmRJZDogc3RyaW5nLCBjZWxsUm93SW5kZXgpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIFwib3ZlcnZpZXdDb21tYW5kQnV0dG9uXCIgKyBjb21tYW5kSWQgKyBjZWxsUm93SW5kZXg7XHJcblx0fVxyXG5cdFxyXG5cdHByaXZhdGUgZ2V0VHJlZUdyaWRDb2x1bW5SZXNpemVTdXBwb3J0KCk6IHt9e1xyXG4gICAgICAgIHJldHVybiB7ICAgICAgICBcclxuICAgICAgICAgICAgYWxsb3dDb2x1bW5SZXNpemU6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbHVtblJlc2l6ZVNldHRpbmdzOiB7IGNvbHVtblJlc2l6ZU1vZGU6IGVqLlRyZWVHcmlkLkNvbHVtblJlc2l6ZU1vZGUuRml4ZWRDb2x1bW5zIH0sXHJcbiAgICAgICAgICAgIGNvbHVtblJlc2l6ZWQ6IChhcmdzKSA9PiBzdXBlci5yZXNpemVEeW5hbWljQ29sdW1uKGFyZ3MuY29sdW1uSW5kZXgsIGFyZ3MubW9kZWwpLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG5cdHByb3RlY3RlZCBhYnN0cmFjdCBnZXRIZWFkZXJUZXh0KCk6IHN0cmluZztcclxuXHJcblx0cHJvdGVjdGVkIGFic3RyYWN0IGdldFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbigpOiB7fTtcclxuXHJcblx0cHJvdGVjdGVkIGFic3RyYWN0IGdldE5hbWVGb3JDb21tYW5kSWQoY29tbWFuZElkOiBzdHJpbmcpOiBzdHJpbmc7XHJcblx0cHJvdGVjdGVkIGFic3RyYWN0IGdldEljb25Gb3JDb21tYW5kSWQoY29tbWFuZElkOiBzdHJpbmcpOiBzdHJpbmc7XHJcblxyXG5cdHByb3RlY3RlZCBhYnN0cmFjdCBnZXRDb21tYW5kSWRzRnJvbUl0ZW0oaXRlbSk6IEFycmF5PHN0cmluZz47XHJcblx0XHJcblx0cHJvdGVjdGVkIGFic3RyYWN0IGNsaWNrKGl0ZW0sIGNvbW1hbmRJZCk7XHJcblx0cHJvdGVjdGVkIGFic3RyYWN0IGRvdWJsZUNsaWNrKGFyZ3MpO1xyXG59XHJcblxyXG5leHBvcnQge092ZXJ2aWV3VHJlZUdyaWRXaWRnZXRCYXNlfTsiXX0=