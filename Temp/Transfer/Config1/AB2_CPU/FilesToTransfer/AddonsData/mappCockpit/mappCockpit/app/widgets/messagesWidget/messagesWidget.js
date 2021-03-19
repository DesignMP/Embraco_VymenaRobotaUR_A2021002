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
define(["require", "exports", "../../common/directoryProvider", "../common/treeGridWidgetBase", "../../models/online/mappCockpitComponent", "./model/messagesViewModel", "../common/themeProvider"], function (require, exports, directoryProvider_1, treeGridWidgetBase_1, mappCockpitComponent_1, messagesViewModel_1, themeProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MessagesWidget = /** @class */ (function (_super) {
        __extends(MessagesWidget, _super);
        function MessagesWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // Defines the html fragment for the split layout
            _this.messagesWidgetSeverityTemplate = "\n    <script type=\"text/x-jsrender\" id=\"severityColumnTemplate\">\n        {{if severity==0}}\n            <img src=\"" + MessagesWidget.getImagePath("icon_success.svg") + "\" style=\"padding-left: 8px; max-height: 100%; alt=\" {{: 0 }} \">\n        {{else severity==1 }}\n            <img src=\"" + MessagesWidget.getImagePath("icon_info.svg") + "\" style=\"padding-left: 8px; max-height: 100%; alt=\"{{: 1 }}\"> \n        {{else severity==2}}\n            <img src=\"" + MessagesWidget.getImagePath("icon_warning.svg") + "\" style=\"padding-left: 8px; max-height: 100%;  alt=\" {{: 2 }} \">\t\t\n        {{else severity==3}}\n            <img src=\"" + MessagesWidget.getImagePath("icon_error.svg") + "\" style=\"padding-left: 8px; max-height: 100%; alt=\"{{: 3 }}\"> \n        {{/if}}\n    </script>\n    ";
            // holds the message parameters
            _this._messageParameters = [];
            _this._messageWidgetData = new messagesViewModel_1.MessagesData;
            return _this;
        }
        MessagesWidget.getImagePath = function (imageName) {
            return themeProvider_1.ThemeProvider.getInstance().getThemedFilePath("../../../" + directoryProvider_1.DirectoryProvider.getWidgetsDirectory() + "messagesWidget/style/images/" + imageName);
        };
        MessagesWidget.prototype.initialize = function (layoutContainerId) {
            _super.prototype.initialize.call(this, layoutContainerId);
            // Set dynamic column settings
            _super.prototype.setDynamicColumn.call(this, 2, 400);
        };
        MessagesWidget.prototype.initializeComponent = function () {
            this.component.disablePersisting();
        };
        Object.defineProperty(MessagesWidget.prototype, "messageParameters", {
            /**
             * Sets the message parameters as the data source for the messages widget
             *
             * @memberof MessagesWidget
             */
            set: function (messageParametersLink) {
                var messageParameters = messageParametersLink.value;
                if (messageParameters.length > 0) {
                    this.onComponentParametersUpdated(messageParameters);
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * the component parameters have been updated.
         *
         * @private
         * @param {MappCockpitComponentParameter[]} messageParameters
         * @memberof MessagesWidget
         */
        MessagesWidget.prototype.onComponentParametersUpdated = function (messageParameters) {
            // filter the messages and update the messages parameter list
            this._messageParameters = messageParameters;
            // update the widgets data source.
            this.populateMessagesWidgetContent();
        };
        /**
         * Updates the data for the widget from the message parameter values
         *
         * @private
         * @memberof MessagesWidget
         */
        MessagesWidget.prototype.updateMessagesWidgetData = function () {
            this._messageWidgetData = messagesViewModel_1.MessagesViewModel.convertParametersToMessageData(this._messageParameters);
        };
        /**
         * Creates the layout of the widget
         *
         * @memberof MessagesWidget
         */
        MessagesWidget.prototype.createLayout = function () {
            $(this.cssParentContentId).append(this.messagesWidgetSeverityTemplate);
            _super.prototype.createLayout.call(this);
        };
        /**
         * Updates the messages widget with the data and populates the widget
         *
         * @private
         * @memberof MessagesWidget
         */
        MessagesWidget.prototype.populateMessagesWidgetContent = function () {
            this.refreshMessageContent();
            this.observeMessages();
        };
        /**
         * refreshes the messages after the message parameters have changed
         *
         * @private
         * @param {EventModelChangedArgs} eventArgs
         * @memberof MessagesWidget
         */
        MessagesWidget.prototype.refreshMessageContent = function () {
            this.updateMessagesWidgetData();
            $(this.cssParentContentId).ejTreeGrid({
                dataSource: this._messageWidgetData.messages,
            });
        };
        /**
         * Observes the message parameters for change and updates the content.
         *
         * @returns {*}
         * @memberof MessagesWidget
         */
        MessagesWidget.prototype.observeMessages = function () {
            // invoke observing the messages
            mappCockpitComponent_1.MappCockpitComponentParameter.observeParameterValueChanges(this, this._messageParameters);
        };
        /**
         * handles observable changes
         *
         * @param {Observable[]} changedObservables
         * @memberof MessagesWidget
         */
        MessagesWidget.prototype.onObservablesChanged = function (changedObservables) {
            console.log("onObservablesChanged: %o %o", this, changedObservables);
            this.refreshMessageContent();
        };
        /**
        * Observes the message parameters for changes and updates the corresponding fields
         *
         * @param {MappCockpitComponentParameter[]} messageParameters
         * @returns {*}
         * @memberof MessagesWidget
         */
        MessagesWidget.prototype.attachMessageChangeListener = function (messageParameters) {
            var _this = this;
            if (messageParameters[0] == undefined) {
                return;
            }
            messageParameters.forEach(function (messageParameter) {
                // listen to value changes of message parameters......
                messageParameter.valueSource.changed(function () {
                    // .. and update the corresponding field.
                    _this.refreshMessageContent();
                });
            });
        };
        /**
         * activates MessagesWidget
         *
         * @memberof MessagesWidget
         */
        MessagesWidget.prototype.activate = function () {
            console.log("MessagesWidget activated");
            mappCockpitComponent_1.MappCockpitComponentParameter.activateComponentModelItems(this, this._messageParameters);
        };
        /**
         * deactivates MessagesWidget
         *
         * @memberof MessagesWidget
         */
        MessagesWidget.prototype.deactivate = function () {
            console.log("MessagesWidget deactivated");
            mappCockpitComponent_1.MappCockpitComponentParameter.deactivateComponentModelItems(this, this._messageParameters);
        };
        /**
         * disposes MessagesWidget
         *
         * @memberof MessagesWidget
         */
        MessagesWidget.prototype.dispose = function () {
            console.log("MessagesWidget disposed");
            mappCockpitComponent_1.MappCockpitComponentParameter.unobserveComponentModelItems(this, this._messageParameters);
            _super.prototype.dispose.call(this);
        };
        /**
         * Creates the tree grid for the messages list
         *
         * @protected
         * @memberof MessagesWidget
         */
        MessagesWidget.prototype.createTreeGrid = function () {
            $(this.cssParentContentId).ejTreeGrid(__assign(__assign(__assign({}, this.getTreeGridColumnDefinition()), this.getTreeGridColumnResizeSupport()), { allowSelection: false, editSettings: { allowEditing: true, editMode: "normal" }, queryCellInfo: function (args) {
                    if (args.column.field == "description") {
                        args.cellElement.style.fontWeight = "bold";
                    }
                    var messageItem = args.data;
                    if (messageItem.severity == "3") {
                        args.cellElement.style.color = "red";
                    }
                } }));
        };
        /**
         * Returns the tree grid column definition
         *
         * @private
         * @returns {{}}
         * @memberof MessagesWidget
         */
        MessagesWidget.prototype.getTreeGridColumnDefinition = function () {
            return {
                columns: [
                    { field: "severity", headerText: "Severity", isTemplateColumn: true, template: "#severityColumnTemplate", width: "32" },
                    { field: "timeStamp", headerText: "Time", width: "200" },
                    { field: "description", headerText: "Description" },
                    { field: "eventId", headerText: "ID", width: "160" },
                ],
            };
        };
        /**
         * Returns the tree grid column resize settings
         *
         * @private
         * @returns {{}}
         * @memberof MessagesWidget
         */
        MessagesWidget.prototype.getTreeGridColumnResizeSupport = function () {
            var _this = this;
            return {
                allowColumnResize: true,
                columnResizeSettings: { columnResizeMode: ej.TreeGrid.ColumnResizeMode.FixedColumns },
                columnResized: function (args) { return _super.prototype.resizeDynamicColumn.call(_this, args.columnIndex, args.model); },
            };
        };
        return MessagesWidget;
    }(treeGridWidgetBase_1.TreeGridWidgetBase));
    exports.MessagesWidget = MessagesWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZXNXaWRnZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvbWVzc2FnZXNXaWRnZXQvbWVzc2FnZXNXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBVUE7UUFBNkIsa0NBQWtCO1FBQS9DO1lBQUEscUVBb1BDO1lBbFBHLGlEQUFpRDtZQUNoQyxvQ0FBOEIsR0FBRyw0SEFHL0IsR0FBRyxjQUFjLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsNkhBRXJELEdBQUcsY0FBYyxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsR0FBRywySEFFbEQsR0FBRyxjQUFjLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsaUlBRXJELEdBQUcsY0FBYyxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLDBHQUdyRSxDQUFDO1lBRUYsK0JBQStCO1lBQ3ZCLHdCQUFrQixHQUFvQyxFQUFFLENBQUM7WUFDekQsd0JBQWtCLEdBQWlCLElBQUksZ0NBQVksQ0FBQzs7UUFpT2hFLENBQUM7UUEvTmtCLDJCQUFZLEdBQTNCLFVBQTRCLFNBQWlCO1lBQ3pDLE9BQU8sNkJBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEdBQUcscUNBQWlCLENBQUMsbUJBQW1CLEVBQUUsR0FBRyw4QkFBOEIsR0FBRyxTQUFTLENBQUMsQ0FBQztRQUM3SixDQUFDO1FBRUQsbUNBQVUsR0FBVixVQUFXLGlCQUF5QjtZQUNoQyxpQkFBTSxVQUFVLFlBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUVwQyw4QkFBOEI7WUFDOUIsaUJBQU0sZ0JBQWdCLFlBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ25DLENBQUM7UUFFRCw0Q0FBbUIsR0FBbkI7WUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENB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SyxFQUFFLElBQUksRUFBRTtvQkFDeEgsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUcsS0FBSyxFQUFFLEtBQUssRUFBQztvQkFDeEQsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUU7b0JBQ25ELEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFHLEtBQUssRUFBRSxLQUFLLEVBQUU7aUJBQ3hEO2FBQ0osQ0FBQztRQUNOLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSyx1REFBOEIsR0FBdEM7WUFBQSxpQkFNQztZQUxHLE9BQU87Z0JBQ0gsaUJBQWlCLEVBQUUsSUFBSTtnQkFDdkIsb0JBQW9CLEVBQUUsRUFBRSxnQkFBZ0IsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRTtnQkFDckYsYUFBYSxFQUFFLFVBQUMsSUFBSSxJQUFLLE9BQUEsaUJBQU0sbUJBQW1CLGFBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQXZELENBQXVEO2FBQ25GLENBQUM7UUFDTixDQUFDO1FBQ0wscUJBQUM7SUFBRCxDQUFDLEFBcFBELENBQTZCLHVDQUFrQixHQW9QOUM7SUFHUSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9saWJzL3VpL1R5cGVzL2VqLndlYi5hbGwuZC50c1wiIC8+XHJcbmltcG9ydCB7IElNZXNzYWdlc1dpZGdldCB9IGZyb20gXCIuL2ludGVyZmFjZXMvbWVzc2FnZXNXaWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgRGlyZWN0b3J5UHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2RpcmVjdG9yeVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IFRyZWVHcmlkV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vdHJlZUdyaWRXaWRnZXRCYXNlXCI7XHJcbmltcG9ydCB7IFByb3BlcnR5IH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9wcm9wZXJ0eVwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50XCI7XHJcbmltcG9ydCB7IE1lc3NhZ2VzVmlld01vZGVsLCBNZXNzYWdlc0RhdGEsIE1lc3NhZ0RhdGFJdGVtIH0gZnJvbSBcIi4vbW9kZWwvbWVzc2FnZXNWaWV3TW9kZWxcIjtcclxuaW1wb3J0IHsgVGhlbWVQcm92aWRlciB9IGZyb20gXCIuLi9jb21tb24vdGhlbWVQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9pbnRlcmZhY2VzL29ic2VydmVyXCI7XHJcblxyXG5jbGFzcyBNZXNzYWdlc1dpZGdldCBleHRlbmRzIFRyZWVHcmlkV2lkZ2V0QmFzZSBpbXBsZW1lbnRzIElNZXNzYWdlc1dpZGdldCB7XHJcblxyXG4gICAgLy8gRGVmaW5lcyB0aGUgaHRtbCBmcmFnbWVudCBmb3IgdGhlIHNwbGl0IGxheW91dFxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBtZXNzYWdlc1dpZGdldFNldmVyaXR5VGVtcGxhdGUgPSBgXHJcbiAgICA8c2NyaXB0IHR5cGU9XCJ0ZXh0L3gtanNyZW5kZXJcIiBpZD1cInNldmVyaXR5Q29sdW1uVGVtcGxhdGVcIj5cclxuICAgICAgICB7e2lmIHNldmVyaXR5PT0wfX1cclxuICAgICAgICAgICAgPGltZyBzcmM9XCJgICsgTWVzc2FnZXNXaWRnZXQuZ2V0SW1hZ2VQYXRoKFwiaWNvbl9zdWNjZXNzLnN2Z1wiKSArIGBcIiBzdHlsZT1cInBhZGRpbmctbGVmdDogOHB4OyBtYXgtaGVpZ2h0OiAxMDAlOyBhbHQ9XCIge3s6IDAgfX0gXCI+XHJcbiAgICAgICAge3tlbHNlIHNldmVyaXR5PT0xIH19XHJcbiAgICAgICAgICAgIDxpbWcgc3JjPVwiYCArIE1lc3NhZ2VzV2lkZ2V0LmdldEltYWdlUGF0aChcImljb25faW5mby5zdmdcIikgKyBgXCIgc3R5bGU9XCJwYWRkaW5nLWxlZnQ6IDhweDsgbWF4LWhlaWdodDogMTAwJTsgYWx0PVwie3s6IDEgfX1cIj4gXHJcbiAgICAgICAge3tlbHNlIHNldmVyaXR5PT0yfX1cclxuICAgICAgICAgICAgPGltZyBzcmM9XCJgICsgTWVzc2FnZXNXaWRnZXQuZ2V0SW1hZ2VQYXRoKFwiaWNvbl93YXJuaW5nLnN2Z1wiKSArIGBcIiBzdHlsZT1cInBhZGRpbmctbGVmdDogOHB4OyBtYXgtaGVpZ2h0OiAxMDAlOyAgYWx0PVwiIHt7OiAyIH19IFwiPlx0XHRcclxuICAgICAgICB7e2Vsc2Ugc2V2ZXJpdHk9PTN9fVxyXG4gICAgICAgICAgICA8aW1nIHNyYz1cImAgKyBNZXNzYWdlc1dpZGdldC5nZXRJbWFnZVBhdGgoXCJpY29uX2Vycm9yLnN2Z1wiKSArIGBcIiBzdHlsZT1cInBhZGRpbmctbGVmdDogOHB4OyBtYXgtaGVpZ2h0OiAxMDAlOyBhbHQ9XCJ7ezogMyB9fVwiPiBcclxuICAgICAgICB7ey9pZn19XHJcbiAgICA8L3NjcmlwdD5cclxuICAgIGA7XHJcblxyXG4gICAgLy8gaG9sZHMgdGhlIG1lc3NhZ2UgcGFyYW1ldGVyc1xyXG4gICAgcHJpdmF0ZSBfbWVzc2FnZVBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10gPSBbXTtcclxuICAgIHByaXZhdGUgX21lc3NhZ2VXaWRnZXREYXRhOiBNZXNzYWdlc0RhdGEgPSBuZXcgTWVzc2FnZXNEYXRhO1xyXG4gICBcclxuICAgIHByaXZhdGUgc3RhdGljIGdldEltYWdlUGF0aChpbWFnZU5hbWU6IHN0cmluZyk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gVGhlbWVQcm92aWRlci5nZXRJbnN0YW5jZSgpLmdldFRoZW1lZEZpbGVQYXRoKFwiLi4vLi4vLi4vXCIgKyBEaXJlY3RvcnlQcm92aWRlci5nZXRXaWRnZXRzRGlyZWN0b3J5KCkgKyBcIm1lc3NhZ2VzV2lkZ2V0L3N0eWxlL2ltYWdlcy9cIiArIGltYWdlTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZShsYXlvdXRDb250YWluZXJJZDogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZShsYXlvdXRDb250YWluZXJJZCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gU2V0IGR5bmFtaWMgY29sdW1uIHNldHRpbmdzXHJcbiAgICAgICAgc3VwZXIuc2V0RHluYW1pY0NvbHVtbigyLCA0MDApO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRpYWxpemVDb21wb25lbnQoKXtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5kaXNhYmxlUGVyc2lzdGluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgbWVzc2FnZSBwYXJhbWV0ZXJzIGFzIHRoZSBkYXRhIHNvdXJjZSBmb3IgdGhlIG1lc3NhZ2VzIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNZXNzYWdlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IG1lc3NhZ2VQYXJhbWV0ZXJzKG1lc3NhZ2VQYXJhbWV0ZXJzTGluazogUHJvcGVydHk8QXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXI+Pikge1xyXG5cclxuICAgICAgICBsZXQgbWVzc2FnZVBhcmFtZXRlcnMgPSBtZXNzYWdlUGFyYW1ldGVyc0xpbmsudmFsdWU7XHJcblxyXG4gICAgICAgIGlmIChtZXNzYWdlUGFyYW1ldGVycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25Db21wb25lbnRQYXJhbWV0ZXJzVXBkYXRlZChtZXNzYWdlUGFyYW1ldGVycyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdGhlIGNvbXBvbmVudCBwYXJhbWV0ZXJzIGhhdmUgYmVlbiB1cGRhdGVkLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW119IG1lc3NhZ2VQYXJhbWV0ZXJzXHJcbiAgICAgKiBAbWVtYmVyb2YgTWVzc2FnZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbkNvbXBvbmVudFBhcmFtZXRlcnNVcGRhdGVkKG1lc3NhZ2VQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdKSB7XHJcbiAgICAgICAgICAgIC8vIGZpbHRlciB0aGUgbWVzc2FnZXMgYW5kIHVwZGF0ZSB0aGUgbWVzc2FnZXMgcGFyYW1ldGVyIGxpc3RcclxuICAgICAgICAgICAgdGhpcy5fbWVzc2FnZVBhcmFtZXRlcnMgPSBtZXNzYWdlUGFyYW1ldGVyc1xyXG4gICAgICAgICAgICAvLyB1cGRhdGUgdGhlIHdpZGdldHMgZGF0YSBzb3VyY2UuXHJcbiAgICAgICAgICAgIHRoaXMucG9wdWxhdGVNZXNzYWdlc1dpZGdldENvbnRlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGRhdGEgZm9yIHRoZSB3aWRnZXQgZnJvbSB0aGUgbWVzc2FnZSBwYXJhbWV0ZXIgdmFsdWVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBNZXNzYWdlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZU1lc3NhZ2VzV2lkZ2V0RGF0YSgpIHtcclxuICAgICAgICB0aGlzLl9tZXNzYWdlV2lkZ2V0RGF0YSA9IE1lc3NhZ2VzVmlld01vZGVsLmNvbnZlcnRQYXJhbWV0ZXJzVG9NZXNzYWdlRGF0YSh0aGlzLl9tZXNzYWdlUGFyYW1ldGVycyk7ICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBsYXlvdXQgb2YgdGhlIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNZXNzYWdlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBjcmVhdGVMYXlvdXQoKSB7XHJcbiAgICAgICAgJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCkuYXBwZW5kKHRoaXMubWVzc2FnZXNXaWRnZXRTZXZlcml0eVRlbXBsYXRlKTtcclxuICAgICAgICBzdXBlci5jcmVhdGVMYXlvdXQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIG1lc3NhZ2VzIHdpZGdldCB3aXRoIHRoZSBkYXRhIGFuZCBwb3B1bGF0ZXMgdGhlIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWVzc2FnZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBwb3B1bGF0ZU1lc3NhZ2VzV2lkZ2V0Q29udGVudCgpIHtcclxuXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoTWVzc2FnZUNvbnRlbnQoKTtcclxuICAgICAgICB0aGlzLm9ic2VydmVNZXNzYWdlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmVmcmVzaGVzIHRoZSBtZXNzYWdlcyBhZnRlciB0aGUgbWVzc2FnZSBwYXJhbWV0ZXJzIGhhdmUgY2hhbmdlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50TW9kZWxDaGFuZ2VkQXJnc30gZXZlbnRBcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgTWVzc2FnZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWZyZXNoTWVzc2FnZUNvbnRlbnQoKSB7XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlTWVzc2FnZXNXaWRnZXREYXRhKCk7XHJcblxyXG4gICAgICAgICg8YW55PiQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpKS5lalRyZWVHcmlkKHtcclxuICAgICAgICAgICAgZGF0YVNvdXJjZTogdGhpcy5fbWVzc2FnZVdpZGdldERhdGEubWVzc2FnZXMsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPYnNlcnZlcyB0aGUgbWVzc2FnZSBwYXJhbWV0ZXJzIGZvciBjaGFuZ2UgYW5kIHVwZGF0ZXMgdGhlIGNvbnRlbnQuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWVzc2FnZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgb2JzZXJ2ZU1lc3NhZ2VzKCk6IGFueSB7ICAgICBcclxuICAgICAgICAvLyBpbnZva2Ugb2JzZXJ2aW5nIHRoZSBtZXNzYWdlc1xyXG4gICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyLm9ic2VydmVQYXJhbWV0ZXJWYWx1ZUNoYW5nZXModGhpcyx0aGlzLl9tZXNzYWdlUGFyYW1ldGVycyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBoYW5kbGVzIG9ic2VydmFibGUgY2hhbmdlc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JzZXJ2YWJsZVtdfSBjaGFuZ2VkT2JzZXJ2YWJsZXNcclxuICAgICAqIEBtZW1iZXJvZiBNZXNzYWdlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBvbk9ic2VydmFibGVzQ2hhbmdlZChjaGFuZ2VkT2JzZXJ2YWJsZXM6IE9ic2VydmFibGVbXSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwib25PYnNlcnZhYmxlc0NoYW5nZWQ6ICVvICVvXCIsdGhpcyxjaGFuZ2VkT2JzZXJ2YWJsZXMpO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaE1lc3NhZ2VDb250ZW50KCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgKiBPYnNlcnZlcyB0aGUgbWVzc2FnZSBwYXJhbWV0ZXJzIGZvciBjaGFuZ2VzIGFuZCB1cGRhdGVzIHRoZSBjb3JyZXNwb25kaW5nIGZpZWxkc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXX0gbWVzc2FnZVBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1lc3NhZ2VzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGF0dGFjaE1lc3NhZ2VDaGFuZ2VMaXN0ZW5lcihtZXNzYWdlUGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSk6IGFueSB7XHJcbiAgICAgICAgaWYobWVzc2FnZVBhcmFtZXRlcnNbMF0gPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBtZXNzYWdlUGFyYW1ldGVycy5mb3JFYWNoKChtZXNzYWdlUGFyYW1ldGVyKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIGxpc3RlbiB0byB2YWx1ZSBjaGFuZ2VzIG9mIG1lc3NhZ2UgcGFyYW1ldGVycy4uLi4uLlxyXG4gICAgICAgICAgICBtZXNzYWdlUGFyYW1ldGVyLnZhbHVlU291cmNlLmNoYW5nZWQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gLi4gYW5kIHVwZGF0ZSB0aGUgY29ycmVzcG9uZGluZyBmaWVsZC5cclxuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaE1lc3NhZ2VDb250ZW50KCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICB9ICAgIFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYWN0aXZhdGVzIE1lc3NhZ2VzV2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1lc3NhZ2VzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhY3RpdmF0ZSgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTWVzc2FnZXNXaWRnZXQgYWN0aXZhdGVkXCIpO1xyXG4gICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyLmFjdGl2YXRlQ29tcG9uZW50TW9kZWxJdGVtcyh0aGlzLHRoaXMuX21lc3NhZ2VQYXJhbWV0ZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGRlYWN0aXZhdGVzIE1lc3NhZ2VzV2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1lc3NhZ2VzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkZWFjdGl2YXRlKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJNZXNzYWdlc1dpZGdldCBkZWFjdGl2YXRlZFwiKTtcclxuICAgICAgICBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlci5kZWFjdGl2YXRlQ29tcG9uZW50TW9kZWxJdGVtcyh0aGlzLHRoaXMuX21lc3NhZ2VQYXJhbWV0ZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGRpc3Bvc2VzIE1lc3NhZ2VzV2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1lc3NhZ2VzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkaXNwb3NlKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJNZXNzYWdlc1dpZGdldCBkaXNwb3NlZFwiKTtcclxuICAgICAgICBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlci51bm9ic2VydmVDb21wb25lbnRNb2RlbEl0ZW1zKHRoaXMsdGhpcy5fbWVzc2FnZVBhcmFtZXRlcnMpO1xyXG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIHRyZWUgZ3JpZCBmb3IgdGhlIG1lc3NhZ2VzIGxpc3RcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAbWVtYmVyb2YgTWVzc2FnZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZVRyZWVHcmlkKCkge1xyXG4gICAgICAgICg8YW55PiQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpKS5lalRyZWVHcmlkKHtcclxuICAgICAgICAgICAgLi4udGhpcy5nZXRUcmVlR3JpZENvbHVtbkRlZmluaXRpb24oKSxcclxuICAgICAgICAgICAgLi4udGhpcy5nZXRUcmVlR3JpZENvbHVtblJlc2l6ZVN1cHBvcnQoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGFsbG93U2VsZWN0aW9uOiBmYWxzZSwgICBcclxuICAgICAgICAgICAgZWRpdFNldHRpbmdzOiB7IGFsbG93RWRpdGluZzogdHJ1ZSwgZWRpdE1vZGU6IFwibm9ybWFsXCIgfSxcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHF1ZXJ5Q2VsbEluZm86IGZ1bmN0aW9uIChhcmdzKXtcclxuICAgICAgICAgICAgICAgIGlmIChhcmdzLmNvbHVtbi5maWVsZCA9PSBcImRlc2NyaXB0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBhcmdzLmNlbGxFbGVtZW50LnN0eWxlLmZvbnRXZWlnaHQgPSBcImJvbGRcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbWVzc2FnZUl0ZW0gPSBhcmdzLmRhdGEgYXMgTWVzc2FnRGF0YUl0ZW07XHJcbiAgICAgICAgICAgICAgICBpZihtZXNzYWdlSXRlbS5zZXZlcml0eSA9PSBcIjNcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJncy5jZWxsRWxlbWVudC5zdHlsZS5jb2xvciA9IFwicmVkXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gICBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCBjb2x1bW4gZGVmaW5pdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgTWVzc2FnZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmVlR3JpZENvbHVtbkRlZmluaXRpb24oKToge317XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY29sdW1uczogW1xyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJzZXZlcml0eVwiLCBoZWFkZXJUZXh0OiBcIlNldmVyaXR5XCIsIGlzVGVtcGxhdGVDb2x1bW46IHRydWUsIHRlbXBsYXRlOiBcIiNzZXZlcml0eUNvbHVtblRlbXBsYXRlXCIsICB3aWR0aDogXCIzMlwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcInRpbWVTdGFtcFwiLCBoZWFkZXJUZXh0OiBcIlRpbWVcIiwgIHdpZHRoOiBcIjIwMFwifSxcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwiZGVzY3JpcHRpb25cIiwgaGVhZGVyVGV4dDogXCJEZXNjcmlwdGlvblwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcImV2ZW50SWRcIiwgaGVhZGVyVGV4dDogXCJJRFwiLCAgd2lkdGg6IFwiMTYwXCIgfSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJlZSBncmlkIGNvbHVtbiByZXNpemUgc2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICogQG1lbWJlcm9mIE1lc3NhZ2VzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VHJlZUdyaWRDb2x1bW5SZXNpemVTdXBwb3J0KCk6IHt9e1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGFsbG93Q29sdW1uUmVzaXplOiB0cnVlLFxyXG4gICAgICAgICAgICBjb2x1bW5SZXNpemVTZXR0aW5nczogeyBjb2x1bW5SZXNpemVNb2RlOiBlai5UcmVlR3JpZC5Db2x1bW5SZXNpemVNb2RlLkZpeGVkQ29sdW1ucyB9LFxyXG4gICAgICAgICAgICBjb2x1bW5SZXNpemVkOiAoYXJncykgPT4gc3VwZXIucmVzaXplRHluYW1pY0NvbHVtbihhcmdzLmNvbHVtbkluZGV4LCBhcmdzLm1vZGVsKSwgXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCB7IE1lc3NhZ2VzV2lkZ2V0IH07Il19