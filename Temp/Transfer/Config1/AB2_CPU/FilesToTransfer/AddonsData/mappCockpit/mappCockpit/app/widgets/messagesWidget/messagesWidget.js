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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZXNXaWRnZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvbWVzc2FnZXNXaWRnZXQvbWVzc2FnZXNXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBVUE7UUFBNkIsa0NBQWtCO1FBQS9DO1lBQUEscUVBZ1BDO1lBOU9HLGlEQUFpRDtZQUNoQyxvQ0FBOEIsR0FBRyw0SEFHL0IsR0FBRyxjQUFjLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsNkhBRXJELEdBQUcsY0FBYyxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsR0FBRywySEFFbEQsR0FBRyxjQUFjLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsaUlBRXJELEdBQUcsY0FBYyxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLDBHQUdyRSxDQUFDO1lBRUYsK0JBQStCO1lBQ3ZCLHdCQUFrQixHQUFvQyxFQUFFLENBQUM7WUFDekQsd0JBQWtCLEdBQWlCLElBQUksZ0NBQVksQ0FBQzs7UUE2TmhFLENBQUM7UUEzTmtCLDJCQUFZLEdBQTNCLFVBQTRCLFNBQWlCO1lBQ3pDLE9BQU8sNkJBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEdBQUcscUNBQWlCLENBQUMsbUJBQW1CLEVBQUUsR0FBRyw4QkFBOEIsR0FBRyxTQUFTLENBQUMsQ0FBQztRQUM3SixDQUFDO1FBRUQsbUNBQVUsR0FBVixVQUFXLGlCQUF5QjtZQUNoQyxpQkFBTSxVQUFVLFlBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUVwQyw4QkFBOEI7WUFDOUIsaUJBQU0sZ0JBQWdCLFlBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ25DLENBQUM7UUFPRCxzQkFBVyw2Q0FBaUI7WUFMNUI7Ozs7ZUFJRztpQkFDSCxVQUE2QixxQkFBcUU7Z0JBRTlG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QUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFO29CQUNuRCxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRyxLQUFLLEVBQUUsS0FBSyxFQUFFO2lCQUN4RDthQUNKLENBQUM7UUFDTixDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ssdURBQThCLEdBQXRDO1lBQUEsaUJBTUM7WUFMRyxPQUFPO2dCQUNILGlCQUFpQixFQUFFLElBQUk7Z0JBQ3ZCLG9CQUFvQixFQUFFLEVBQUUsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUU7Z0JBQ3JGLGFBQWEsRUFBRSxVQUFDLElBQUksSUFBSyxPQUFBLGlCQUFNLG1CQUFtQixhQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUF2RCxDQUF1RDthQUNuRixDQUFDO1FBQ04sQ0FBQztRQUNMLHFCQUFDO0lBQUQsQ0FBQyxBQWhQRCxDQUE2Qix1Q0FBa0IsR0FnUDlDO0lBR1Esd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vbGlicy91aS9UeXBlcy9lai53ZWIuYWxsLmQudHNcIiAvPlxyXG5pbXBvcnQgeyBJTWVzc2FnZXNXaWRnZXQgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL21lc3NhZ2VzV2lkZ2V0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IERpcmVjdG9yeVByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9kaXJlY3RvcnlQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBUcmVlR3JpZFdpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL3RyZWVHcmlkV2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBQcm9wZXJ0eSB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvcHJvcGVydHlcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBNZXNzYWdlc1ZpZXdNb2RlbCwgTWVzc2FnZXNEYXRhLCBNZXNzYWdEYXRhSXRlbSB9IGZyb20gXCIuL21vZGVsL21lc3NhZ2VzVmlld01vZGVsXCI7XHJcbmltcG9ydCB7IFRoZW1lUHJvdmlkZXIgfSBmcm9tIFwiLi4vY29tbW9uL3RoZW1lUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvaW50ZXJmYWNlcy9vYnNlcnZlclwiO1xyXG5cclxuY2xhc3MgTWVzc2FnZXNXaWRnZXQgZXh0ZW5kcyBUcmVlR3JpZFdpZGdldEJhc2UgaW1wbGVtZW50cyBJTWVzc2FnZXNXaWRnZXQge1xyXG5cclxuICAgIC8vIERlZmluZXMgdGhlIGh0bWwgZnJhZ21lbnQgZm9yIHRoZSBzcGxpdCBsYXlvdXRcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgbWVzc2FnZXNXaWRnZXRTZXZlcml0eVRlbXBsYXRlID0gYFxyXG4gICAgPHNjcmlwdCB0eXBlPVwidGV4dC94LWpzcmVuZGVyXCIgaWQ9XCJzZXZlcml0eUNvbHVtblRlbXBsYXRlXCI+XHJcbiAgICAgICAge3tpZiBzZXZlcml0eT09MH19XHJcbiAgICAgICAgICAgIDxpbWcgc3JjPVwiYCArIE1lc3NhZ2VzV2lkZ2V0LmdldEltYWdlUGF0aChcImljb25fc3VjY2Vzcy5zdmdcIikgKyBgXCIgc3R5bGU9XCJwYWRkaW5nLWxlZnQ6IDhweDsgbWF4LWhlaWdodDogMTAwJTsgYWx0PVwiIHt7OiAwIH19IFwiPlxyXG4gICAgICAgIHt7ZWxzZSBzZXZlcml0eT09MSB9fVxyXG4gICAgICAgICAgICA8aW1nIHNyYz1cImAgKyBNZXNzYWdlc1dpZGdldC5nZXRJbWFnZVBhdGgoXCJpY29uX2luZm8uc3ZnXCIpICsgYFwiIHN0eWxlPVwicGFkZGluZy1sZWZ0OiA4cHg7IG1heC1oZWlnaHQ6IDEwMCU7IGFsdD1cInt7OiAxIH19XCI+IFxyXG4gICAgICAgIHt7ZWxzZSBzZXZlcml0eT09Mn19XHJcbiAgICAgICAgICAgIDxpbWcgc3JjPVwiYCArIE1lc3NhZ2VzV2lkZ2V0LmdldEltYWdlUGF0aChcImljb25fd2FybmluZy5zdmdcIikgKyBgXCIgc3R5bGU9XCJwYWRkaW5nLWxlZnQ6IDhweDsgbWF4LWhlaWdodDogMTAwJTsgIGFsdD1cIiB7ezogMiB9fSBcIj5cdFx0XHJcbiAgICAgICAge3tlbHNlIHNldmVyaXR5PT0zfX1cclxuICAgICAgICAgICAgPGltZyBzcmM9XCJgICsgTWVzc2FnZXNXaWRnZXQuZ2V0SW1hZ2VQYXRoKFwiaWNvbl9lcnJvci5zdmdcIikgKyBgXCIgc3R5bGU9XCJwYWRkaW5nLWxlZnQ6IDhweDsgbWF4LWhlaWdodDogMTAwJTsgYWx0PVwie3s6IDMgfX1cIj4gXHJcbiAgICAgICAge3svaWZ9fVxyXG4gICAgPC9zY3JpcHQ+XHJcbiAgICBgO1xyXG5cclxuICAgIC8vIGhvbGRzIHRoZSBtZXNzYWdlIHBhcmFtZXRlcnNcclxuICAgIHByaXZhdGUgX21lc3NhZ2VQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdID0gW107XHJcbiAgICBwcml2YXRlIF9tZXNzYWdlV2lkZ2V0RGF0YTogTWVzc2FnZXNEYXRhID0gbmV3IE1lc3NhZ2VzRGF0YTtcclxuICAgXHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZXRJbWFnZVBhdGgoaW1hZ2VOYW1lOiBzdHJpbmcpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIFRoZW1lUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXRUaGVtZWRGaWxlUGF0aChcIi4uLy4uLy4uL1wiICsgRGlyZWN0b3J5UHJvdmlkZXIuZ2V0V2lkZ2V0c0RpcmVjdG9yeSgpICsgXCJtZXNzYWdlc1dpZGdldC9zdHlsZS9pbWFnZXMvXCIgKyBpbWFnZU5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQ6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFNldCBkeW5hbWljIGNvbHVtbiBzZXR0aW5nc1xyXG4gICAgICAgIHN1cGVyLnNldER5bmFtaWNDb2x1bW4oMiwgNDAwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIG1lc3NhZ2UgcGFyYW1ldGVycyBhcyB0aGUgZGF0YSBzb3VyY2UgZm9yIHRoZSBtZXNzYWdlcyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWVzc2FnZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBtZXNzYWdlUGFyYW1ldGVycyhtZXNzYWdlUGFyYW1ldGVyc0xpbms6IFByb3BlcnR5PEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyPj4pIHtcclxuXHJcbiAgICAgICAgbGV0IG1lc3NhZ2VQYXJhbWV0ZXJzID0gbWVzc2FnZVBhcmFtZXRlcnNMaW5rLnZhbHVlO1xyXG5cclxuICAgICAgICBpZiAobWVzc2FnZVBhcmFtZXRlcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLm9uQ29tcG9uZW50UGFyYW1ldGVyc1VwZGF0ZWQobWVzc2FnZVBhcmFtZXRlcnMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHRoZSBjb21wb25lbnQgcGFyYW1ldGVycyBoYXZlIGJlZW4gdXBkYXRlZC5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSBtZXNzYWdlUGFyYW1ldGVyc1xyXG4gICAgICogQG1lbWJlcm9mIE1lc3NhZ2VzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25Db21wb25lbnRQYXJhbWV0ZXJzVXBkYXRlZChtZXNzYWdlUGFyYW1ldGVyczogTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXJbXSkge1xyXG4gICAgICAgICAgICAvLyBmaWx0ZXIgdGhlIG1lc3NhZ2VzIGFuZCB1cGRhdGUgdGhlIG1lc3NhZ2VzIHBhcmFtZXRlciBsaXN0XHJcbiAgICAgICAgICAgIHRoaXMuX21lc3NhZ2VQYXJhbWV0ZXJzID0gbWVzc2FnZVBhcmFtZXRlcnNcclxuICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSB3aWRnZXRzIGRhdGEgc291cmNlLlxyXG4gICAgICAgICAgICB0aGlzLnBvcHVsYXRlTWVzc2FnZXNXaWRnZXRDb250ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBkYXRhIGZvciB0aGUgd2lkZ2V0IGZyb20gdGhlIG1lc3NhZ2UgcGFyYW1ldGVyIHZhbHVlc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWVzc2FnZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVNZXNzYWdlc1dpZGdldERhdGEoKSB7XHJcbiAgICAgICAgdGhpcy5fbWVzc2FnZVdpZGdldERhdGEgPSBNZXNzYWdlc1ZpZXdNb2RlbC5jb252ZXJ0UGFyYW1ldGVyc1RvTWVzc2FnZURhdGEodGhpcy5fbWVzc2FnZVBhcmFtZXRlcnMpOyAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgbGF5b3V0IG9mIHRoZSB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWVzc2FnZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgY3JlYXRlTGF5b3V0KCkge1xyXG5cclxuICAgICAgICAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKS5hcHBlbmQodGhpcy5tZXNzYWdlc1dpZGdldFNldmVyaXR5VGVtcGxhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgbWVzc2FnZXMgd2lkZ2V0IHdpdGggdGhlIGRhdGEgYW5kIHBvcHVsYXRlcyB0aGUgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBNZXNzYWdlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHBvcHVsYXRlTWVzc2FnZXNXaWRnZXRDb250ZW50KCkge1xyXG5cclxuICAgICAgICB0aGlzLnJlZnJlc2hNZXNzYWdlQ29udGVudCgpO1xyXG4gICAgICAgIHRoaXMub2JzZXJ2ZU1lc3NhZ2VzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZWZyZXNoZXMgdGhlIG1lc3NhZ2VzIGFmdGVyIHRoZSBtZXNzYWdlIHBhcmFtZXRlcnMgaGF2ZSBjaGFuZ2VkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7RXZlbnRNb2RlbENoYW5nZWRBcmdzfSBldmVudEFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBNZXNzYWdlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlZnJlc2hNZXNzYWdlQ29udGVudCgpIHtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlc1dpZGdldERhdGEoKTtcclxuXHJcbiAgICAgICAgKDxhbnk+JCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCkpLmVqVHJlZUdyaWQoe1xyXG4gICAgICAgICAgICBkYXRhU291cmNlOiB0aGlzLl9tZXNzYWdlV2lkZ2V0RGF0YS5tZXNzYWdlcyxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9ic2VydmVzIHRoZSBtZXNzYWdlIHBhcmFtZXRlcnMgZm9yIGNoYW5nZSBhbmQgdXBkYXRlcyB0aGUgY29udGVudC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNZXNzYWdlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBvYnNlcnZlTWVzc2FnZXMoKTogYW55IHsgICAgIFxyXG4gICAgICAgIC8vIGludm9rZSBvYnNlcnZpbmcgdGhlIG1lc3NhZ2VzXHJcbiAgICAgICAgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIub2JzZXJ2ZVBhcmFtZXRlclZhbHVlQ2hhbmdlcyh0aGlzLHRoaXMuX21lc3NhZ2VQYXJhbWV0ZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGhhbmRsZXMgb2JzZXJ2YWJsZSBjaGFuZ2VzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYnNlcnZhYmxlW119IGNoYW5nZWRPYnNlcnZhYmxlc1xyXG4gICAgICogQG1lbWJlcm9mIE1lc3NhZ2VzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIG9uT2JzZXJ2YWJsZXNDaGFuZ2VkKGNoYW5nZWRPYnNlcnZhYmxlczogT2JzZXJ2YWJsZVtdKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJvbk9ic2VydmFibGVzQ2hhbmdlZDogJW8gJW9cIix0aGlzLGNoYW5nZWRPYnNlcnZhYmxlcyk7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoTWVzc2FnZUNvbnRlbnQoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAqIE9ic2VydmVzIHRoZSBtZXNzYWdlIHBhcmFtZXRlcnMgZm9yIGNoYW5nZXMgYW5kIHVwZGF0ZXMgdGhlIGNvcnJlc3BvbmRpbmcgZmllbGRzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdfSBtZXNzYWdlUGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWVzc2FnZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgYXR0YWNoTWVzc2FnZUNoYW5nZUxpc3RlbmVyKG1lc3NhZ2VQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdKTogYW55IHtcclxuICAgICAgICBpZihtZXNzYWdlUGFyYW1ldGVyc1swXSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1lc3NhZ2VQYXJhbWV0ZXJzLmZvckVhY2goKG1lc3NhZ2VQYXJhbWV0ZXIpID0+IHtcclxuICAgICAgICAgICAgLy8gbGlzdGVuIHRvIHZhbHVlIGNoYW5nZXMgb2YgbWVzc2FnZSBwYXJhbWV0ZXJzLi4uLi4uXHJcbiAgICAgICAgICAgIG1lc3NhZ2VQYXJhbWV0ZXIudmFsdWVTb3VyY2UuY2hhbmdlZCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyAuLiBhbmQgdXBkYXRlIHRoZSBjb3JyZXNwb25kaW5nIGZpZWxkLlxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoTWVzc2FnZUNvbnRlbnQoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuICAgIH0gICAgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBhY3RpdmF0ZXMgTWVzc2FnZXNXaWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWVzc2FnZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFjdGl2YXRlKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJNZXNzYWdlc1dpZGdldCBhY3RpdmF0ZWRcIik7XHJcbiAgICAgICAgTWFwcENvY2twaXRDb21wb25lbnRQYXJhbWV0ZXIuYWN0aXZhdGVDb21wb25lbnRNb2RlbEl0ZW1zKHRoaXMsdGhpcy5fbWVzc2FnZVBhcmFtZXRlcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZGVhY3RpdmF0ZXMgTWVzc2FnZXNXaWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWVzc2FnZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRlYWN0aXZhdGUoKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk1lc3NhZ2VzV2lkZ2V0IGRlYWN0aXZhdGVkXCIpO1xyXG4gICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyLmRlYWN0aXZhdGVDb21wb25lbnRNb2RlbEl0ZW1zKHRoaXMsdGhpcy5fbWVzc2FnZVBhcmFtZXRlcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZGlzcG9zZXMgTWVzc2FnZXNXaWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWVzc2FnZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRpc3Bvc2UoKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk1lc3NhZ2VzV2lkZ2V0IGRpc3Bvc2VkXCIpO1xyXG4gICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyLnVub2JzZXJ2ZUNvbXBvbmVudE1vZGVsSXRlbXModGhpcyx0aGlzLl9tZXNzYWdlUGFyYW1ldGVycyk7XHJcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgdHJlZSBncmlkIGZvciB0aGUgbWVzc2FnZXMgbGlzdFxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBtZW1iZXJvZiBNZXNzYWdlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlVHJlZUdyaWQoKSB7XHJcbiAgICAgICAgKDxhbnk+JCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCkpLmVqVHJlZUdyaWQoe1xyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbigpLFxyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkQ29sdW1uUmVzaXplU3VwcG9ydCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgYWxsb3dTZWxlY3Rpb246IGZhbHNlLCAgIFxyXG4gICAgICAgICAgICBlZGl0U2V0dGluZ3M6IHsgYWxsb3dFZGl0aW5nOiB0cnVlLCBlZGl0TW9kZTogXCJub3JtYWxcIiB9LFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcXVlcnlDZWxsSW5mbzogZnVuY3Rpb24gKGFyZ3Mpe1xyXG4gICAgICAgICAgICAgICAgaWYgKGFyZ3MuY29sdW1uLmZpZWxkID09IFwiZGVzY3JpcHRpb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGFyZ3MuY2VsbEVsZW1lbnQuc3R5bGUuZm9udFdlaWdodCA9IFwiYm9sZFwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBtZXNzYWdlSXRlbSA9IGFyZ3MuZGF0YSBhcyBNZXNzYWdEYXRhSXRlbTtcclxuICAgICAgICAgICAgICAgIGlmKG1lc3NhZ2VJdGVtLnNldmVyaXR5ID09IFwiM1wiKXtcclxuICAgICAgICAgICAgICAgICAgICBhcmdzLmNlbGxFbGVtZW50LnN0eWxlLmNvbG9yID0gXCJyZWRcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJlZSBncmlkIGNvbHVtbiBkZWZpbml0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBNZXNzYWdlc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbigpOiB7fXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjb2x1bW5zOiBbXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcInNldmVyaXR5XCIsIGhlYWRlclRleHQ6IFwiU2V2ZXJpdHlcIiwgaXNUZW1wbGF0ZUNvbHVtbjogdHJ1ZSwgdGVtcGxhdGU6IFwiI3NldmVyaXR5Q29sdW1uVGVtcGxhdGVcIiwgIHdpZHRoOiBcIjMyXCIgfSxcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwidGltZVN0YW1wXCIsIGhlYWRlclRleHQ6IFwiVGltZVwiLCAgd2lkdGg6IFwiMjAwXCJ9LFxyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJkZXNjcmlwdGlvblwiLCBoZWFkZXJUZXh0OiBcIkRlc2NyaXB0aW9uXCIgfSxcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwiZXZlbnRJZFwiLCBoZWFkZXJUZXh0OiBcIklEXCIsICB3aWR0aDogXCIxNjBcIiB9LFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgY29sdW1uIHJlc2l6ZSBzZXR0aW5nc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgTWVzc2FnZXNXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmVlR3JpZENvbHVtblJlc2l6ZVN1cHBvcnQoKToge317XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYWxsb3dDb2x1bW5SZXNpemU6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbHVtblJlc2l6ZVNldHRpbmdzOiB7IGNvbHVtblJlc2l6ZU1vZGU6IGVqLlRyZWVHcmlkLkNvbHVtblJlc2l6ZU1vZGUuRml4ZWRDb2x1bW5zIH0sXHJcbiAgICAgICAgICAgIGNvbHVtblJlc2l6ZWQ6IChhcmdzKSA9PiBzdXBlci5yZXNpemVEeW5hbWljQ29sdW1uKGFyZ3MuY29sdW1uSW5kZXgsIGFyZ3MubW9kZWwpLCBcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IHsgTWVzc2FnZXNXaWRnZXQgfTsiXX0=