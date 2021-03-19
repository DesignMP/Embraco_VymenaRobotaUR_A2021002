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
define(["require", "exports", "../../models/online/mappCockpitComponent", "./methodParameterEditor", "../common/treeGridWidgetBase", "../common/domHelper"], function (require, exports, mappCockpitComponent_1, methodParameterEditor_1, treeGridWidgetBase_1, domHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * implements the MethodParameterList widget
     *
     * @class MethodParameterListWidget
     * @extends {TreeGridWidgetBase}
     */
    var MethodParameterListWidget = /** @class */ (function (_super) {
        __extends(MethodParameterListWidget, _super);
        function MethodParameterListWidget() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /* initialize the widget
         *
         * @param {string} layoutContainerId
         * @memberof MethodParameterListWidget
         */
        MethodParameterListWidget.prototype.initialize = function (layoutContainerId) {
            _super.prototype.initialize.call(this, layoutContainerId, 0, 36);
            this._executeButtonId = layoutContainerId + "_ExecuteButton";
            this.setFooterContent("<div id='" + this._executeButtonId + "' style='margin-top: -5px; margin-left: -5px;'></div>");
            this.createExecuteButton("Select command");
            // Set dynamic column settings
            _super.prototype.setDynamicColumn.call(this, 0, 100);
        };
        MethodParameterListWidget.prototype.initializeComponent = function () {
            this.component.disablePersisting();
        };
        MethodParameterListWidget.prototype.createExecuteButton = function (commandDisplayName) {
            var _this = this;
            $("#" + this._executeButtonId).ejButton({
                cssClass: 'e-primary',
                // size:ej.ButtonSize.Large,
                width: "100%",
                height: "34px",
                enabled: false,
                contentType: "textandimage",
                text: commandDisplayName,
                imagePosition: ej.ImagePosition.ImageRight,
                showRoundedCorner: false,
                click: function (args) { _this.handleExecuteMethodClicked(args); },
                prefixIcon: "e-icon e-mediaplay"
            });
            $("#" + this._executeButtonId).css("font-size", "20px");
        };
        /**
         * handles click on the method execute button
         *
         * @param {*} args
         * @returns {*}
         * @memberof MethodParameterListWidget
         */
        MethodParameterListWidget.prototype.handleExecuteMethodClicked = function (args) {
            var treeObj = this.getTreeGridObject();
            // Save cell if currently in edit mode before executing method
            treeObj.saveCell();
            this.executeMethod();
        };
        /**
         * executes the selected method
         *
         * @private
         * @memberof MethodParameterListWidget
         */
        MethodParameterListWidget.prototype.executeMethod = function () {
            if (this._actualMethod && this._actualMethod instanceof mappCockpitComponent_1.MappCockpitComponentMethod) {
                mappCockpitComponent_1.MappCockpitComponentMethod.execute(this._actualMethod);
            }
        };
        /**
         * Loads the styles for the method execute button
         *
         * @memberof MethodParameterListWidget
         */
        MethodParameterListWidget.prototype.loadStyles = function () {
            _super.prototype.addStyle.call(this, "widgets/methodParameterListWidget/style/css/methodExecuteButtonStyle.css");
        };
        /** resizes the methods parameter list widget
         *
         * @param {number} width
         * @param {number} height
         * @memberof MethodParameterListWidget
         */
        MethodParameterListWidget.prototype.resize = function (width, height) {
            _super.prototype.resize.call(this, width, height);
            this.resizeExecuteButton(width);
        };
        /**
        * creates the tree grid for the method parameters list
        *
        * @protected
        * @returns {*}
        * @memberof MethodParameterListWidget
        */
        MethodParameterListWidget.prototype.createTreeGrid = function () {
            var _this = this;
            var parameterListDataSource = [{}];
            $(this.cssParentContentId).ejTreeGrid(__assign(__assign(__assign({}, this.getTreeGridColumnDefinition()), this.getTreeGridColumnResizeSupport()), { dataSource: parameterListDataSource, editSettings: {
                    allowEditing: true,
                    allowAdding: false,
                    allowDeleting: false,
                }, beginEdit: function (args) { return _this.beginEdit(args); }, endEdit: function (args) { return _this.endEdit(args); }, queryCellInfo: function (args) { return _this.showParametersInListDisabled(args); } }));
        };
        /**
         * Returns the tree grid column definition
         *
         * @private
         * @returns {{}}
         * @memberof MethodParameterListWidget
         */
        MethodParameterListWidget.prototype.getTreeGridColumnDefinition = function () {
            return {
                columns: [
                    { field: "displayName", headerText: "Parameter", isPrimaryKey: true, allowEditing: false },
                    { field: "displayValue", headerText: "Value", width: "100", editType: "stringedit", editTemplate: methodParameterEditor_1.MappCockpitParameterTypeEditor.createInstance() },
                    { field: "engineeringUnit", headerText: "Unit", width: "100" },
                ],
            };
        };
        /**
         * Returns the tree grid column resize settings
         *
         * @private
         * @returns {{}}
         * @memberof MethodParameterListWidget
         */
        MethodParameterListWidget.prototype.getTreeGridColumnResizeSupport = function () {
            var _this = this;
            return {
                allowColumnResize: true,
                columnResizeSettings: { columnResizeMode: ej.TreeGrid.ColumnResizeMode.FixedColumns },
                columnResized: function (args) { return _super.prototype.resizeDynamicColumn.call(_this, args.columnIndex, args.model); },
            };
        };
        MethodParameterListWidget.prototype.showParametersInListDisabled = function (args) {
            if (this._actualMethod != undefined && this._actualMethod.isExecutable != undefined) {
                if (args.cellElement.classList != undefined) {
                    // Show ReadOnly cell with other color
                    var disableTreeCellClassName = "treeCellDisabled";
                    if (this._actualMethod.isExecutable.value == false) {
                        args.cellElement.classList.add(disableTreeCellClassName);
                    }
                    else {
                        args.cellElement.classList.remove(disableTreeCellClassName);
                    }
                }
                domHelper_1.DomHelper.disableElement(args.cellElement, !this._actualMethod.isExecutable.value);
            }
        };
        MethodParameterListWidget.prototype.beginEdit = function (args) {
            // Only value column can be edited (TODO: use column id instead of index)
            if (args.columnIndex != 1) { // 1 = value column
                args.cancel = true;
            }
            else {
                if (this._actualMethod == undefined) {
                    args.cancel = true;
                }
                else if (this._actualMethod.isExecutable == undefined) {
                    args.cancel = true;
                }
                else if (this._actualMethod.isExecutable.value == false) {
                    args.cancel = true;
                }
                else if (this._actualMethod.inputParameters != undefined && this._actualMethod.inputParameters.length == 0) {
                    // No input parameters available for this method; cancel edit of value column
                    args.cancel = true;
                }
            }
        };
        MethodParameterListWidget.prototype.endEdit = function (args) {
            var _this = this;
            mappCockpitComponent_1.MappCockpitComponentMethod.updateInputParameters(this._actualMethod).then(function (inputParameters) {
                inputParameters = _this.updateTreegridData(_this._actualMethod, _this._actualMethod.inputParameters);
                var update = _this.needsToUpdateInputParameters(_this._actualInputParameters, inputParameters);
                //if parameters are the same, don't populate treegrid
                if (update) {
                    _this.populateMethodParameterList(inputParameters, _this._actualMethod.displayName);
                }
            });
        };
        MethodParameterListWidget.prototype.needsToUpdateInputParameters = function (oldParameters, newParameters) {
            var update = false;
            if (oldParameters.length == newParameters.length) {
                for (var i = 0; i < oldParameters.length; i++) {
                    if (oldParameters[i].name != newParameters[i].name) {
                        update = true;
                    }
                }
            }
            else {
                update = true;
            }
            return update;
        };
        /**
         * updates the content of the method parameters list
         *
         * @param {MappCockpitComponentMethod} method
         * @memberof MethodParameterListWidget
         */
        MethodParameterListWidget.prototype.updateParametersList = function (method) {
            var _this = this;
            this._actualMethod = method;
            this.observeMethodExecutability(method);
            // update the methods input parameters
            mappCockpitComponent_1.MappCockpitComponentMethod.updateInputParameters(method).then(function (inputParameters) {
                inputParameters = _this.updateTreegridData(method, method.inputParameters);
                _this.populateMethodParameterList(inputParameters, method.displayName);
            });
        };
        /**
         * Observes if the executability of the methods has changed
         *
         * @private
         * @memberof MethodParameterListWidget
         */
        MethodParameterListWidget.prototype.observeMethodExecutability = function (method) {
            var _this = this;
            method.isExecutable.changed(function (isExecutable) {
                var inputParameters = _this.updateTreegridData(method, method.inputParameters);
                _this.populateMethodParameterList(inputParameters, method.displayName);
            });
        };
        /**
         * Populate the method parameter list
         *
         * @private
         * @param {MappCockpitComponentMethod} method
         * @memberof MethodParameterListWidget
         */
        MethodParameterListWidget.prototype.populateMethodParameterList = function (inputParameters, displayName) {
            var parameterListDataSource = [
                {}
            ];
            if (inputParameters.length > 0) {
                parameterListDataSource = inputParameters;
            }
            this._actualInputParameters = parameterListDataSource;
            var treeObj = this.getTreeGridObject();
            if (!treeObj) {
                return;
            }
            // Save cell if currently in edit mode before refreshing, otherwise refresh is not working
            treeObj.saveCell();
            // To refresh TreeGrid with new datasource
            treeObj.setModel({ "dataSource": parameterListDataSource }, true);
            this.resize(this._actualWidth, this._actualHeight);
            this.updateExecutePaneText(displayName);
        };
        MethodParameterListWidget.prototype.updateExecutePaneText = function (commandDisplayName) {
            var buttonActive = false;
            if (this._actualMethod != undefined && this._actualMethod.isExecutable != undefined) {
                if (this._actualMethod.isExecutable.value == true) {
                    buttonActive = true;
                }
            }
            // get button instance;
            var executeBtn = $("#" + this._executeButtonId).data("ejButton");
            // set button text
            executeBtn.option({ text: commandDisplayName });
            // set button active state
            executeBtn.option({ enabled: buttonActive });
        };
        MethodParameterListWidget.prototype.resizeExecuteButton = function (width) {
            var executeBtn = $("#" + this._executeButtonId).data("ejButton");
            executeBtn.option({ width: width - 1 });
        };
        MethodParameterListWidget.prototype.updateTreegridData = function (method, inputParameters) {
            mappCockpitComponent_1.MappCockpitComponentMethod.updateFilter(method);
            inputParameters = mappCockpitComponent_1.MappCockpitComponentMethod.updateInputParametersVisibility(inputParameters);
            return inputParameters;
        };
        return MethodParameterListWidget;
    }(treeGridWidgetBase_1.TreeGridWidgetBase));
    exports.MethodParameterListWidget = MethodParameterListWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0aG9kUGFyYW1ldGVyTGlzdFdpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9tZXRob2RQYXJhbWV0ZXJMaXN0V2lkZ2V0L21ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBTUE7Ozs7O09BS0c7SUFDSDtRQUF3Qyw2Q0FBa0I7UUFBMUQ7O1FBNFRBLENBQUM7UUF0VEc7Ozs7V0FJRztRQUNILDhDQUFVLEdBQVYsVUFBVyxpQkFBeUI7WUFDaEMsaUJBQU0sVUFBVSxZQUFDLGlCQUFpQixFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUUzQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsaUJBQWlCLEdBQUcsZ0JBQWdCLENBQUE7WUFDNUQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEdBQUUsdURBQXVELENBQUMsQ0FBQztZQUNwSCxJQUFJLENBQUMsbUJBQW1CLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUUzQyw4QkFBOEI7WUFDOUIsaUJBQU0sZ0JBQWdCLFlBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ25DLENBQUM7UUFFRCx1REFBbUIsR0FBbkI7WUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDdkMsQ0FBQztRQUVPLHVEQUFtQixHQUEzQixVQUE0QixrQkFBeUI7WUFBckQsaUJBaUJDO1lBZlMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBQzNDLFFBQVEsRUFBRSxXQUFXO2dCQUNyQiw0QkFBNEI7Z0JBQzVCLEtBQUssRUFBQyxNQUFNO2dCQUNaLE1BQU0sRUFBQyxNQUFNO2dCQUNiLE9BQU8sRUFBRSxLQUFLO2dCQUNkLFdB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ZXQgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL21ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QsIE1hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVyIH0gZnJvbSBcIi4uLy4uL21vZGVscy9vbmxpbmUvbWFwcENvY2twaXRDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRQYXJhbWV0ZXJUeXBlRWRpdG9yIH0gZnJvbSBcIi4vbWV0aG9kUGFyYW1ldGVyRWRpdG9yXCI7XHJcbmltcG9ydCB7IFRyZWVHcmlkV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vdHJlZUdyaWRXaWRnZXRCYXNlXCI7XHJcbmltcG9ydCB7IERvbUhlbHBlciB9IGZyb20gXCIuLi9jb21tb24vZG9tSGVscGVyXCI7XHJcblxyXG4vKipcclxuICogaW1wbGVtZW50cyB0aGUgTWV0aG9kUGFyYW1ldGVyTGlzdCB3aWRnZXRcclxuICpcclxuICogQGNsYXNzIE1ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXRcclxuICogQGV4dGVuZHMge1RyZWVHcmlkV2lkZ2V0QmFzZX1cclxuICovXHJcbmNsYXNzIE1ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXQgZXh0ZW5kcyBUcmVlR3JpZFdpZGdldEJhc2UgaW1wbGVtZW50cyBJTWV0aG9kUGFyYW1ldGVyTGlzdFdpZGdldCB7XHJcblxyXG4gICAgcHJpdmF0ZSBfYWN0dWFsTWV0aG9kO1xyXG4gICAgcHJpdmF0ZSBfYWN0dWFsSW5wdXRQYXJhbWV0ZXJzO1xyXG4gICAgcHJpdmF0ZSBfZXhlY3V0ZUJ1dHRvbklkO1xyXG5cclxuICAgIC8qIGluaXRpYWxpemUgdGhlIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYXlvdXRDb250YWluZXJJZFxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXRcclxuICAgICAqL1xyXG4gICAgaW5pdGlhbGl6ZShsYXlvdXRDb250YWluZXJJZDogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZShsYXlvdXRDb250YWluZXJJZCwgMCwgMzYpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX2V4ZWN1dGVCdXR0b25JZCA9IGxheW91dENvbnRhaW5lcklkICsgXCJfRXhlY3V0ZUJ1dHRvblwiXHJcbiAgICAgICAgdGhpcy5zZXRGb290ZXJDb250ZW50KFwiPGRpdiBpZD0nXCIgKyB0aGlzLl9leGVjdXRlQnV0dG9uSWQgK1wiJyBzdHlsZT0nbWFyZ2luLXRvcDogLTVweDsgbWFyZ2luLWxlZnQ6IC01cHg7Jz48L2Rpdj5cIik7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVFeGVjdXRlQnV0dG9uKFwiU2VsZWN0IGNvbW1hbmRcIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gU2V0IGR5bmFtaWMgY29sdW1uIHNldHRpbmdzXHJcbiAgICAgICAgc3VwZXIuc2V0RHluYW1pY0NvbHVtbigwLCAxMDApO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRpYWxpemVDb21wb25lbnQoKXtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5kaXNhYmxlUGVyc2lzdGluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3JlYXRlRXhlY3V0ZUJ1dHRvbihjb21tYW5kRGlzcGxheU5hbWU6c3RyaW5nKSB7XHJcblxyXG4gICAgICAgICg8YW55PiQoXCIjXCIgKyB0aGlzLl9leGVjdXRlQnV0dG9uSWQpKS5lakJ1dHRvbih7XHJcbiAgICAgICAgICAgIGNzc0NsYXNzOiAnZS1wcmltYXJ5JyxcclxuICAgICAgICAgICAgLy8gc2l6ZTplai5CdXR0b25TaXplLkxhcmdlLFxyXG4gICAgICAgICAgICB3aWR0aDpcIjEwMCVcIixcclxuICAgICAgICAgICAgaGVpZ2h0OlwiMzRweFwiLFxyXG4gICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwidGV4dGFuZGltYWdlXCIsXHJcbiAgICAgICAgICAgIHRleHQ6IGNvbW1hbmREaXNwbGF5TmFtZSxcclxuICAgICAgICAgICAgaW1hZ2VQb3NpdGlvbjogZWouSW1hZ2VQb3NpdGlvbi5JbWFnZVJpZ2h0LFxyXG4gICAgICAgICAgICBzaG93Um91bmRlZENvcm5lcjogZmFsc2UsXHJcbiAgICAgICAgICAgIGNsaWNrOiAoYXJncykgPT4geyB0aGlzLmhhbmRsZUV4ZWN1dGVNZXRob2RDbGlja2VkKGFyZ3MpIH0sXHJcbiAgICAgICAgICAgIHByZWZpeEljb246IFwiZS1pY29uIGUtbWVkaWFwbGF5XCJcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgKDxKUXVlcnk+JChcIiNcIiArIHRoaXMuX2V4ZWN1dGVCdXR0b25JZCkpLmNzcyhcImZvbnQtc2l6ZVwiLFwiMjBweFwiKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogaGFuZGxlcyBjbGljayBvbiB0aGUgbWV0aG9kIGV4ZWN1dGUgYnV0dG9uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RQYXJhbWV0ZXJMaXN0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGhhbmRsZUV4ZWN1dGVNZXRob2RDbGlja2VkKGFyZ3M6IGFueSk6IGFueSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIHRyZWVPYmogPSB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gU2F2ZSBjZWxsIGlmIGN1cnJlbnRseSBpbiBlZGl0IG1vZGUgYmVmb3JlIGV4ZWN1dGluZyBtZXRob2RcclxuICAgICAgICB0cmVlT2JqLnNhdmVDZWxsKCk7IFxyXG5cclxuICAgICAgICB0aGlzLmV4ZWN1dGVNZXRob2QoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGV4ZWN1dGVzIHRoZSBzZWxlY3RlZCBtZXRob2RcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBleGVjdXRlTWV0aG9kKCkge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fYWN0dWFsTWV0aG9kICYmIHRoaXMuX2FjdHVhbE1ldGhvZCBpbnN0YW5jZW9mIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kKSB7XHJcbiAgICAgICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLmV4ZWN1dGUodGhpcy5fYWN0dWFsTWV0aG9kKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkcyB0aGUgc3R5bGVzIGZvciB0aGUgbWV0aG9kIGV4ZWN1dGUgYnV0dG9uXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXRcclxuICAgICAqL1xyXG4gICAgbG9hZFN0eWxlcygpe1xyXG4gICAgICAgIHN1cGVyLmFkZFN0eWxlKFwid2lkZ2V0cy9tZXRob2RQYXJhbWV0ZXJMaXN0V2lkZ2V0L3N0eWxlL2Nzcy9tZXRob2RFeGVjdXRlQnV0dG9uU3R5bGUuY3NzXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiByZXNpemVzIHRoZSBtZXRob2RzIHBhcmFtZXRlciBsaXN0IHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodFxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcmVzaXplKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKXtcclxuXHRcdHN1cGVyLnJlc2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgdGhpcy5yZXNpemVFeGVjdXRlQnV0dG9uKHdpZHRoKTtcclxuICAgIH1cclxuXHJcbiAgICAgLyoqXHJcbiAgICAgKiBjcmVhdGVzIHRoZSB0cmVlIGdyaWQgZm9yIHRoZSBtZXRob2QgcGFyYW1ldGVycyBsaXN0XHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kUGFyYW1ldGVyTGlzdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlVHJlZUdyaWQoKXtcclxuICAgICAgICB2YXIgcGFyYW1ldGVyTGlzdERhdGFTb3VyY2UgPSBbe31dO1xyXG5cclxuICAgICAgICAoPGFueT4kKHRoaXMuY3NzUGFyZW50Q29udGVudElkKSkuZWpUcmVlR3JpZCh7XHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCksXHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRDb2x1bW5SZXNpemVTdXBwb3J0KCksXHJcblxyXG4gICAgICAgICAgICBkYXRhU291cmNlOiBwYXJhbWV0ZXJMaXN0RGF0YVNvdXJjZSwgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgZWRpdFNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICBhbGxvd0VkaXRpbmc6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBhbGxvd0FkZGluZzogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBhbGxvd0RlbGV0aW5nIDogZmFsc2UsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgYmVnaW5FZGl0OiAoYXJncykgPT4gdGhpcy5iZWdpbkVkaXQoYXJncyksXHJcbiAgICAgICAgICAgIGVuZEVkaXQ6IChhcmdzKSA9PiB0aGlzLmVuZEVkaXQoYXJncyksXHJcbiAgICAgICAgICAgIHF1ZXJ5Q2VsbEluZm86IChhcmdzKSA9PiB0aGlzLnNob3dQYXJhbWV0ZXJzSW5MaXN0RGlzYWJsZWQoYXJncyksXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgY29sdW1uIGRlZmluaXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmVlR3JpZENvbHVtbkRlZmluaXRpb24oKToge317XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY29sdW1uczogW1xyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJkaXNwbGF5TmFtZVwiLCBoZWFkZXJUZXh0OiBcIlBhcmFtZXRlclwiLCBpc1ByaW1hcnlLZXk6IHRydWUsIGFsbG93RWRpdGluZzogZmFsc2UgfSxcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwiZGlzcGxheVZhbHVlXCIsIGhlYWRlclRleHQ6IFwiVmFsdWVcIiwgd2lkdGg6IFwiMTAwXCIsIGVkaXRUeXBlOiBcInN0cmluZ2VkaXRcIiwgZWRpdFRlbXBsYXRlOiBNYXBwQ29ja3BpdFBhcmFtZXRlclR5cGVFZGl0b3IuY3JlYXRlSW5zdGFuY2UoKSB9LFxyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJlbmdpbmVlcmluZ1VuaXRcIiwgaGVhZGVyVGV4dDogXCJVbml0XCIsIHdpZHRoOiBcIjEwMFwiIH0sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgY29sdW1uIHJlc2l6ZSBzZXR0aW5nc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kUGFyYW1ldGVyTGlzdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFRyZWVHcmlkQ29sdW1uUmVzaXplU3VwcG9ydCgpOiB7fXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBhbGxvd0NvbHVtblJlc2l6ZTogdHJ1ZSxcclxuICAgICAgICAgICAgY29sdW1uUmVzaXplU2V0dGluZ3M6IHsgY29sdW1uUmVzaXplTW9kZTogZWouVHJlZUdyaWQuQ29sdW1uUmVzaXplTW9kZS5GaXhlZENvbHVtbnMgfSxcclxuICAgICAgICAgICAgY29sdW1uUmVzaXplZDogKGFyZ3MpID0+IHN1cGVyLnJlc2l6ZUR5bmFtaWNDb2x1bW4oYXJncy5jb2x1bW5JbmRleCwgYXJncy5tb2RlbCksXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNob3dQYXJhbWV0ZXJzSW5MaXN0RGlzYWJsZWQoYXJncyl7XHJcbiAgICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuX2FjdHVhbE1ldGhvZCAhPSB1bmRlZmluZWQgJiYgdGhpcy5fYWN0dWFsTWV0aG9kLmlzRXhlY3V0YWJsZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBpZihhcmdzLmNlbGxFbGVtZW50LmNsYXNzTGlzdCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgLy8gU2hvdyBSZWFkT25seSBjZWxsIHdpdGggb3RoZXIgY29sb3JcclxuICAgICAgICAgICAgICAgIGxldCBkaXNhYmxlVHJlZUNlbGxDbGFzc05hbWUgPSBcInRyZWVDZWxsRGlzYWJsZWRcIjtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuX2FjdHVhbE1ldGhvZC5pc0V4ZWN1dGFibGUudmFsdWUgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgIGFyZ3MuY2VsbEVsZW1lbnQuY2xhc3NMaXN0LmFkZChkaXNhYmxlVHJlZUNlbGxDbGFzc05hbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBhcmdzLmNlbGxFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoZGlzYWJsZVRyZWVDZWxsQ2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBEb21IZWxwZXIuZGlzYWJsZUVsZW1lbnQoYXJncy5jZWxsRWxlbWVudCwgIXRoaXMuX2FjdHVhbE1ldGhvZC5pc0V4ZWN1dGFibGUudmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGJlZ2luRWRpdChhcmdzKXtcclxuICAgICAgICAvLyBPbmx5IHZhbHVlIGNvbHVtbiBjYW4gYmUgZWRpdGVkIChUT0RPOiB1c2UgY29sdW1uIGlkIGluc3RlYWQgb2YgaW5kZXgpXHJcbiAgICAgICAgaWYoYXJncy5jb2x1bW5JbmRleCAhPSAxKXsgLy8gMSA9IHZhbHVlIGNvbHVtblxyXG4gICAgICAgICAgICBhcmdzLmNhbmNlbCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX2FjdHVhbE1ldGhvZCA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgYXJncy5jYW5jZWwgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5fYWN0dWFsTWV0aG9kLmlzRXhlY3V0YWJsZSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgYXJncy5jYW5jZWwgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5fYWN0dWFsTWV0aG9kLmlzRXhlY3V0YWJsZS52YWx1ZSA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICBhcmdzLmNhbmNlbCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLl9hY3R1YWxNZXRob2QuaW5wdXRQYXJhbWV0ZXJzICE9IHVuZGVmaW5lZCAmJiB0aGlzLl9hY3R1YWxNZXRob2QuaW5wdXRQYXJhbWV0ZXJzLmxlbmd0aCA9PSAwKXtcclxuICAgICAgICAgICAgICAgIC8vIE5vIGlucHV0IHBhcmFtZXRlcnMgYXZhaWxhYmxlIGZvciB0aGlzIG1ldGhvZDsgY2FuY2VsIGVkaXQgb2YgdmFsdWUgY29sdW1uXHJcbiAgICAgICAgICAgICAgICBhcmdzLmNhbmNlbCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBlbmRFZGl0KGFyZ3MpIHtcclxuICAgICAgICBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZC51cGRhdGVJbnB1dFBhcmFtZXRlcnModGhpcy5fYWN0dWFsTWV0aG9kKS50aGVuKChpbnB1dFBhcmFtZXRlcnMpPT57XHJcbiAgICAgICAgICAgIGlucHV0UGFyYW1ldGVycyA9IHRoaXMudXBkYXRlVHJlZWdyaWREYXRhKHRoaXMuX2FjdHVhbE1ldGhvZCwgdGhpcy5fYWN0dWFsTWV0aG9kLmlucHV0UGFyYW1ldGVycyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgdXBkYXRlID0gdGhpcy5uZWVkc1RvVXBkYXRlSW5wdXRQYXJhbWV0ZXJzKHRoaXMuX2FjdHVhbElucHV0UGFyYW1ldGVycywgaW5wdXRQYXJhbWV0ZXJzKVxyXG5cclxuICAgICAgICAgICAgLy9pZiBwYXJhbWV0ZXJzIGFyZSB0aGUgc2FtZSwgZG9uJ3QgcG9wdWxhdGUgdHJlZWdyaWRcclxuICAgICAgICAgICAgaWYgKHVwZGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3B1bGF0ZU1ldGhvZFBhcmFtZXRlckxpc3QoaW5wdXRQYXJhbWV0ZXJzLCB0aGlzLl9hY3R1YWxNZXRob2QuZGlzcGxheU5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbmVlZHNUb1VwZGF0ZUlucHV0UGFyYW1ldGVycyhvbGRQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcltdLCBuZXdQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcltdKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IHVwZGF0ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICBpZiAob2xkUGFyYW1ldGVycy5sZW5ndGggPT0gbmV3UGFyYW1ldGVycy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvbGRQYXJhbWV0ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2xkUGFyYW1ldGVyc1tpXS5uYW1lICE9IG5ld1BhcmFtZXRlcnNbaV0ubmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHVwZGF0ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdXBkYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdXBkYXRlcyB0aGUgY29udGVudCBvZiB0aGUgbWV0aG9kIHBhcmFtZXRlcnMgbGlzdFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRNZXRob2R9IG1ldGhvZFxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXRcclxuICAgICAqL1xyXG4gICAgdXBkYXRlUGFyYW1ldGVyc0xpc3QobWV0aG9kOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCkge1xyXG5cclxuICAgICAgICB0aGlzLl9hY3R1YWxNZXRob2QgPSBtZXRob2Q7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5vYnNlcnZlTWV0aG9kRXhlY3V0YWJpbGl0eShtZXRob2QpO1xyXG5cclxuICAgICAgICAvLyB1cGRhdGUgdGhlIG1ldGhvZHMgaW5wdXQgcGFyYW1ldGVyc1xyXG4gICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLnVwZGF0ZUlucHV0UGFyYW1ldGVycyhtZXRob2QpLnRoZW4oKGlucHV0UGFyYW1ldGVycyk9PntcclxuICAgICAgICAgICAgaW5wdXRQYXJhbWV0ZXJzID0gdGhpcy51cGRhdGVUcmVlZ3JpZERhdGEobWV0aG9kLCBtZXRob2QuaW5wdXRQYXJhbWV0ZXJzKTtcclxuICAgICAgICAgICAgdGhpcy5wb3B1bGF0ZU1ldGhvZFBhcmFtZXRlckxpc3QoaW5wdXRQYXJhbWV0ZXJzLCBtZXRob2QuZGlzcGxheU5hbWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT2JzZXJ2ZXMgaWYgdGhlIGV4ZWN1dGFiaWxpdHkgb2YgdGhlIG1ldGhvZHMgaGFzIGNoYW5nZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvYnNlcnZlTWV0aG9kRXhlY3V0YWJpbGl0eShtZXRob2QpIHtcclxuICAgICAgICBtZXRob2QuaXNFeGVjdXRhYmxlLmNoYW5nZWQoKGlzRXhlY3V0YWJsZSk9PntcclxuICAgICAgICAgICAgbGV0IGlucHV0UGFyYW1ldGVycyA9IHRoaXMudXBkYXRlVHJlZWdyaWREYXRhKG1ldGhvZCwgbWV0aG9kLmlucHV0UGFyYW1ldGVycyk7XHJcbiAgICAgICAgICAgIHRoaXMucG9wdWxhdGVNZXRob2RQYXJhbWV0ZXJMaXN0KGlucHV0UGFyYW1ldGVycywgbWV0aG9kLmRpc3BsYXlOYW1lKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUG9wdWxhdGUgdGhlIG1ldGhvZCBwYXJhbWV0ZXIgbGlzdFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kfSBtZXRob2RcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RQYXJhbWV0ZXJMaXN0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcG9wdWxhdGVNZXRob2RQYXJhbWV0ZXJMaXN0KGlucHV0UGFyYW1ldGVyczogTWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXJbXSwgZGlzcGxheU5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHZhciBwYXJhbWV0ZXJMaXN0RGF0YVNvdXJjZSA9IFtcclxuICAgICAgICAgICAge31cclxuICAgICAgICBdO1xyXG4gICAgICAgIGlmIChpbnB1dFBhcmFtZXRlcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBwYXJhbWV0ZXJMaXN0RGF0YVNvdXJjZSA9IGlucHV0UGFyYW1ldGVycztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2FjdHVhbElucHV0UGFyYW1ldGVycyA9IHBhcmFtZXRlckxpc3REYXRhU291cmNlO1xyXG4gICAgICAgIHZhciB0cmVlT2JqID0gdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpO1xyXG4gICAgICAgIGlmKCF0cmVlT2JqKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU2F2ZSBjZWxsIGlmIGN1cnJlbnRseSBpbiBlZGl0IG1vZGUgYmVmb3JlIHJlZnJlc2hpbmcsIG90aGVyd2lzZSByZWZyZXNoIGlzIG5vdCB3b3JraW5nXHJcbiAgICAgICAgdHJlZU9iai5zYXZlQ2VsbCgpOyBcclxuICAgICAgICBcclxuICAgICAgICAvLyBUbyByZWZyZXNoIFRyZWVHcmlkIHdpdGggbmV3IGRhdGFzb3VyY2VcclxuICAgICAgICB0cmVlT2JqLnNldE1vZGVsKHtcImRhdGFTb3VyY2VcIjogcGFyYW1ldGVyTGlzdERhdGFTb3VyY2UgfSwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5yZXNpemUodGhpcy5fYWN0dWFsV2lkdGgsIHRoaXMuX2FjdHVhbEhlaWdodCk7XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlRXhlY3V0ZVBhbmVUZXh0KGRpc3BsYXlOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZUV4ZWN1dGVQYW5lVGV4dChjb21tYW5kRGlzcGxheU5hbWU6c3RyaW5nKTogYW55IHtcclxuICAgICAgICBsZXQgYnV0dG9uQWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgaWYodGhpcy5fYWN0dWFsTWV0aG9kICE9IHVuZGVmaW5lZCAmJiB0aGlzLl9hY3R1YWxNZXRob2QuaXNFeGVjdXRhYmxlICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX2FjdHVhbE1ldGhvZC5pc0V4ZWN1dGFibGUudmFsdWUgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgYnV0dG9uQWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBnZXQgYnV0dG9uIGluc3RhbmNlO1xyXG4gICAgICAgIGxldCBleGVjdXRlQnRuID0gKDxhbnk+JChcIiNcIiArIHRoaXMuX2V4ZWN1dGVCdXR0b25JZCkpLmRhdGEoXCJlakJ1dHRvblwiKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBzZXQgYnV0dG9uIHRleHRcclxuICAgICAgICBleGVjdXRlQnRuLm9wdGlvbih7dGV4dDogY29tbWFuZERpc3BsYXlOYW1lfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gc2V0IGJ1dHRvbiBhY3RpdmUgc3RhdGVcclxuICAgICAgICBleGVjdXRlQnRuLm9wdGlvbih7ZW5hYmxlZDogYnV0dG9uQWN0aXZlfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZXNpemVFeGVjdXRlQnV0dG9uKHdpZHRoKXtcclxuICAgICAgICBsZXQgZXhlY3V0ZUJ0biA9ICg8YW55PiQoXCIjXCIgKyB0aGlzLl9leGVjdXRlQnV0dG9uSWQpKS5kYXRhKFwiZWpCdXR0b25cIik7XHJcbiAgICAgICAgZXhlY3V0ZUJ0bi5vcHRpb24oe3dpZHRoOiB3aWR0aC0xfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVUcmVlZ3JpZERhdGEobWV0aG9kOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCwgaW5wdXRQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcltdKTogTWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXJbXSB7XHJcbiAgICAgICAgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QudXBkYXRlRmlsdGVyKG1ldGhvZCk7XHJcbiAgICAgICAgaW5wdXRQYXJhbWV0ZXJzID0gTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QudXBkYXRlSW5wdXRQYXJhbWV0ZXJzVmlzaWJpbGl0eShpbnB1dFBhcmFtZXRlcnMpO1xyXG4gICAgICAgIHJldHVybiBpbnB1dFBhcmFtZXRlcnM7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IE1ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXQgfTsiXX0=