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
         * @memberof MethodsWidget
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
         * @memberof MethodsWidget
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
                }, beginEdit: function (args) { return _this.beginEdit(args); }, queryCellInfo: function (args) { return _this.showParametersInListDisabled(args); } }));
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
                _this.populateMethodParameterList(method);
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
                _this.populateMethodParameterList(method);
            });
        };
        /**
         * Populate the method parameter list
         *
         * @private
         * @param {MappCockpitComponentMethod} method
         * @memberof MethodParameterListWidget
         */
        MethodParameterListWidget.prototype.populateMethodParameterList = function (method) {
            var parameterListDataSource = [
                {}
            ];
            if (method.inputParameters.length > 0) {
                parameterListDataSource = method.inputParameters;
            }
            var treeObj = this.getTreeGridObject();
            if (!treeObj) {
                return;
            }
            // Save cell if currently in edit mode before refreshing, otherwise refresh is not working
            treeObj.saveCell();
            // To refresh TreeGrid with new datasource
            treeObj.setModel({ "dataSource": parameterListDataSource }, true);
            this.resize(this._actualWidth, this._actualHeight);
            this.updateExecutePaneText(method.displayName);
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
        return MethodParameterListWidget;
    }(treeGridWidgetBase_1.TreeGridWidgetBase));
    exports.MethodParameterListWidget = MethodParameterListWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0aG9kUGFyYW1ldGVyTGlzdFdpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9tZXRob2RQYXJhbWV0ZXJMaXN0V2lkZ2V0L21ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBTUE7Ozs7O09BS0c7SUFDSDtRQUF3Qyw2Q0FBa0I7UUFBMUQ7O1FBOFFBLENBQUM7UUF6UUc7Ozs7V0FJRztRQUNILDhDQUFVLEdBQVYsVUFBVyxpQkFBeUI7WUFDaEMsaUJBQU0sVUFBVSxZQUFDLGlCQUFpQixFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUUzQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsaUJBQWlCLEdBQUcsZ0JBQWdCLENBQUE7WUFDNUQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEdBQUUsdURBQXVELENBQUMsQ0FBQztZQUNwSCxJQUFJLENBQUMsbUJBQW1CLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUUzQyw4QkFBOEI7WUFDOUIsaUJBQU0sZ0JBQWdCLFlBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ25DLENBQUM7UUFFTyx1REFBbUIsR0FBM0IsVUFBNEIsa0JBQXlCO1lBQXJELGlCQWlCQztZQWZTLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFFLENBQUMsUUFBUSxDQUFDO2dCQUMzQyxRQUFRLEVBQUUsV0FBVztnQkFDckIsNEJBQTRCO2dCQUM1QixLQUFLLEVBQUMsTUFBTTtnQkFDWixNQUFNLEVBQUMsTUFBTTtnQkFDYixPQUFPLEVBQUUsS0FBSztnQkFDZCxXQUFXLEVBQUUsY0FBYztnQkFDM0IsSUFBSSxFQUFFLGtCQUFrQjtnQkFDeEIsYUFBYSxFQUFFLEVBQUUsQ0FBQyxhQUFhLENB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QUksRUFBRSxrQkFBa0IsRUFBQyxDQUFDLENBQUM7WUFFOUMsMEJBQTBCO1lBQzFCLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBQyxPQUFPLEVBQUUsWUFBWSxFQUFDLENBQUMsQ0FBQztRQUMvQyxDQUFDO1FBRU8sdURBQW1CLEdBQTNCLFVBQTRCLEtBQUs7WUFDN0IsSUFBSSxVQUFVLEdBQVMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDeEUsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFDLEtBQUssRUFBRSxLQUFLLEdBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztRQUN4QyxDQUFDO1FBQ0wsZ0NBQUM7SUFBRCxDQUFDLEFBOVFELENBQXdDLHVDQUFrQixHQThRekQ7SUFFUSw4REFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJTWV0aG9kUGFyYW1ldGVyTGlzdFdpZGdldCB9IGZyb20gXCIuL2ludGVyZmFjZXMvbWV0aG9kUGFyYW1ldGVyTGlzdFdpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50XCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0UGFyYW1ldGVyVHlwZUVkaXRvciB9IGZyb20gXCIuL21ldGhvZFBhcmFtZXRlckVkaXRvclwiO1xyXG5pbXBvcnQgeyBUcmVlR3JpZFdpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL3RyZWVHcmlkV2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBEb21IZWxwZXIgfSBmcm9tIFwiLi4vY29tbW9uL2RvbUhlbHBlclwiO1xyXG5cclxuLyoqXHJcbiAqIGltcGxlbWVudHMgdGhlIE1ldGhvZFBhcmFtZXRlckxpc3Qgd2lkZ2V0XHJcbiAqXHJcbiAqIEBjbGFzcyBNZXRob2RQYXJhbWV0ZXJMaXN0V2lkZ2V0XHJcbiAqIEBleHRlbmRzIHtUcmVlR3JpZFdpZGdldEJhc2V9XHJcbiAqL1xyXG5jbGFzcyBNZXRob2RQYXJhbWV0ZXJMaXN0V2lkZ2V0IGV4dGVuZHMgVHJlZUdyaWRXaWRnZXRCYXNlIGltcGxlbWVudHMgSU1ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXQge1xyXG5cclxuICAgIHByaXZhdGUgX2FjdHVhbE1ldGhvZDtcclxuICAgIHByaXZhdGUgX2V4ZWN1dGVCdXR0b25JZDtcclxuXHJcbiAgICAvKiBpbml0aWFsaXplIHRoZSB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGF5b3V0Q29udGFpbmVySWRcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RQYXJhbWV0ZXJMaXN0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQ6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQsIDAsIDM2KTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9leGVjdXRlQnV0dG9uSWQgPSBsYXlvdXRDb250YWluZXJJZCArIFwiX0V4ZWN1dGVCdXR0b25cIlxyXG4gICAgICAgIHRoaXMuc2V0Rm9vdGVyQ29udGVudChcIjxkaXYgaWQ9J1wiICsgdGhpcy5fZXhlY3V0ZUJ1dHRvbklkICtcIicgc3R5bGU9J21hcmdpbi10b3A6IC01cHg7IG1hcmdpbi1sZWZ0OiAtNXB4Oyc+PC9kaXY+XCIpO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlRXhlY3V0ZUJ1dHRvbihcIlNlbGVjdCBjb21tYW5kXCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFNldCBkeW5hbWljIGNvbHVtbiBzZXR0aW5nc1xyXG4gICAgICAgIHN1cGVyLnNldER5bmFtaWNDb2x1bW4oMCwgMTAwKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNyZWF0ZUV4ZWN1dGVCdXR0b24oY29tbWFuZERpc3BsYXlOYW1lOnN0cmluZykge1xyXG5cclxuICAgICAgICAoPGFueT4kKFwiI1wiICsgdGhpcy5fZXhlY3V0ZUJ1dHRvbklkKSkuZWpCdXR0b24oe1xyXG4gICAgICAgICAgICBjc3NDbGFzczogJ2UtcHJpbWFyeScsXHJcbiAgICAgICAgICAgIC8vIHNpemU6ZWouQnV0dG9uU2l6ZS5MYXJnZSxcclxuICAgICAgICAgICAgd2lkdGg6XCIxMDAlXCIsXHJcbiAgICAgICAgICAgIGhlaWdodDpcIjM0cHhcIixcclxuICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcInRleHRhbmRpbWFnZVwiLFxyXG4gICAgICAgICAgICB0ZXh0OiBjb21tYW5kRGlzcGxheU5hbWUsXHJcbiAgICAgICAgICAgIGltYWdlUG9zaXRpb246IGVqLkltYWdlUG9zaXRpb24uSW1hZ2VSaWdodCxcclxuICAgICAgICAgICAgc2hvd1JvdW5kZWRDb3JuZXI6IGZhbHNlLFxyXG4gICAgICAgICAgICBjbGljazogKGFyZ3MpID0+IHsgdGhpcy5oYW5kbGVFeGVjdXRlTWV0aG9kQ2xpY2tlZChhcmdzKSB9LFxyXG4gICAgICAgICAgICBwcmVmaXhJY29uOiBcImUtaWNvbiBlLW1lZGlhcGxheVwiXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICg8SlF1ZXJ5PiQoXCIjXCIgKyB0aGlzLl9leGVjdXRlQnV0dG9uSWQpKS5jc3MoXCJmb250LXNpemVcIixcIjIwcHhcIilcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGhhbmRsZXMgY2xpY2sgb24gdGhlIG1ldGhvZCBleGVjdXRlIGJ1dHRvblxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kc1dpZGdldFxyXG4gICAgICovXHJcbiAgICBoYW5kbGVFeGVjdXRlTWV0aG9kQ2xpY2tlZChhcmdzOiBhbnkpOiBhbnkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciB0cmVlT2JqID0gdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFNhdmUgY2VsbCBpZiBjdXJyZW50bHkgaW4gZWRpdCBtb2RlIGJlZm9yZSBleGVjdXRpbmcgbWV0aG9kXHJcbiAgICAgICAgdHJlZU9iai5zYXZlQ2VsbCgpOyBcclxuXHJcbiAgICAgICAgdGhpcy5leGVjdXRlTWV0aG9kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBleGVjdXRlcyB0aGUgc2VsZWN0ZWQgbWV0aG9kXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RzV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZXhlY3V0ZU1ldGhvZCgpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2FjdHVhbE1ldGhvZCAmJiB0aGlzLl9hY3R1YWxNZXRob2QgaW5zdGFuY2VvZiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCkge1xyXG4gICAgICAgICAgICBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZC5leGVjdXRlKHRoaXMuX2FjdHVhbE1ldGhvZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZHMgdGhlIHN0eWxlcyBmb3IgdGhlIG1ldGhvZCBleGVjdXRlIGJ1dHRvblxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RQYXJhbWV0ZXJMaXN0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGxvYWRTdHlsZXMoKXtcclxuICAgICAgICBzdXBlci5hZGRTdHlsZShcIndpZGdldHMvbWV0aG9kUGFyYW1ldGVyTGlzdFdpZGdldC9zdHlsZS9jc3MvbWV0aG9kRXhlY3V0ZUJ1dHRvblN0eWxlLmNzc1wiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogcmVzaXplcyB0aGUgbWV0aG9kcyBwYXJhbWV0ZXIgbGlzdCB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gd2lkdGhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RQYXJhbWV0ZXJMaXN0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHJlc2l6ZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcil7XHJcblx0XHRzdXBlci5yZXNpemUod2lkdGgsIGhlaWdodCk7XHJcblxyXG4gICAgICAgIHRoaXMucmVzaXplRXhlY3V0ZUJ1dHRvbih3aWR0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgIC8qKlxyXG4gICAgICogY3JlYXRlcyB0aGUgdHJlZSBncmlkIGZvciB0aGUgbWV0aG9kIHBhcmFtZXRlcnMgbGlzdFxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZVRyZWVHcmlkKCl7XHJcbiAgICAgICAgdmFyIHBhcmFtZXRlckxpc3REYXRhU291cmNlID0gW3t9XTtcclxuXHJcbiAgICAgICAgKDxhbnk+JCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCkpLmVqVHJlZUdyaWQoe1xyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbigpLFxyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkQ29sdW1uUmVzaXplU3VwcG9ydCgpLFxyXG5cclxuICAgICAgICAgICAgZGF0YVNvdXJjZTogcGFyYW1ldGVyTGlzdERhdGFTb3VyY2UsICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGVkaXRTZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgYWxsb3dFZGl0aW5nOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgYWxsb3dBZGRpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgYWxsb3dEZWxldGluZyA6IGZhbHNlLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGJlZ2luRWRpdDogKGFyZ3MpID0+IHRoaXMuYmVnaW5FZGl0KGFyZ3MpLFxyXG4gICAgICAgICAgICBxdWVyeUNlbGxJbmZvOiAoYXJncykgPT4gdGhpcy5zaG93UGFyYW1ldGVyc0luTGlzdERpc2FibGVkKGFyZ3MpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJlZSBncmlkIGNvbHVtbiBkZWZpbml0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RQYXJhbWV0ZXJMaXN0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCk6IHt9e1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNvbHVtbnM6IFtcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwiZGlzcGxheU5hbWVcIiwgaGVhZGVyVGV4dDogXCJQYXJhbWV0ZXJcIiwgaXNQcmltYXJ5S2V5OiB0cnVlLCBhbGxvd0VkaXRpbmc6IGZhbHNlIH0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcImRpc3BsYXlWYWx1ZVwiLCBoZWFkZXJUZXh0OiBcIlZhbHVlXCIsIHdpZHRoOiBcIjEwMFwiLCBlZGl0VHlwZTogXCJzdHJpbmdlZGl0XCIsIGVkaXRUZW1wbGF0ZTogTWFwcENvY2twaXRQYXJhbWV0ZXJUeXBlRWRpdG9yLmNyZWF0ZUluc3RhbmNlKCkgfSxcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwiZW5naW5lZXJpbmdVbml0XCIsIGhlYWRlclRleHQ6IFwiVW5pdFwiLCB3aWR0aDogXCIxMDBcIiB9LFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJlZSBncmlkIGNvbHVtbiByZXNpemUgc2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmVlR3JpZENvbHVtblJlc2l6ZVN1cHBvcnQoKToge317XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYWxsb3dDb2x1bW5SZXNpemU6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbHVtblJlc2l6ZVNldHRpbmdzOiB7IGNvbHVtblJlc2l6ZU1vZGU6IGVqLlRyZWVHcmlkLkNvbHVtblJlc2l6ZU1vZGUuRml4ZWRDb2x1bW5zIH0sXHJcbiAgICAgICAgICAgIGNvbHVtblJlc2l6ZWQ6IChhcmdzKSA9PiBzdXBlci5yZXNpemVEeW5hbWljQ29sdW1uKGFyZ3MuY29sdW1uSW5kZXgsIGFyZ3MubW9kZWwpLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzaG93UGFyYW1ldGVyc0luTGlzdERpc2FibGVkKGFyZ3Mpe1xyXG4gICAgICAgICBcclxuICAgICAgICBpZih0aGlzLl9hY3R1YWxNZXRob2QgIT0gdW5kZWZpbmVkICYmIHRoaXMuX2FjdHVhbE1ldGhvZC5pc0V4ZWN1dGFibGUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgaWYoYXJncy5jZWxsRWxlbWVudC5jbGFzc0xpc3QgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIC8vIFNob3cgUmVhZE9ubHkgY2VsbCB3aXRoIG90aGVyIGNvbG9yXHJcbiAgICAgICAgICAgICAgICBsZXQgZGlzYWJsZVRyZWVDZWxsQ2xhc3NOYW1lID0gXCJ0cmVlQ2VsbERpc2FibGVkXCI7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLl9hY3R1YWxNZXRob2QuaXNFeGVjdXRhYmxlLnZhbHVlID09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgICAgICBhcmdzLmNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoZGlzYWJsZVRyZWVDZWxsQ2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJncy5jZWxsRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGRpc2FibGVUcmVlQ2VsbENsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgRG9tSGVscGVyLmRpc2FibGVFbGVtZW50KGFyZ3MuY2VsbEVsZW1lbnQsICF0aGlzLl9hY3R1YWxNZXRob2QuaXNFeGVjdXRhYmxlLnZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBiZWdpbkVkaXQoYXJncyl7XHJcbiAgICAgICAgLy8gT25seSB2YWx1ZSBjb2x1bW4gY2FuIGJlIGVkaXRlZCAoVE9ETzogdXNlIGNvbHVtbiBpZCBpbnN0ZWFkIG9mIGluZGV4KVxyXG4gICAgICAgIGlmKGFyZ3MuY29sdW1uSW5kZXggIT0gMSl7IC8vIDEgPSB2YWx1ZSBjb2x1bW5cclxuICAgICAgICAgICAgYXJncy5jYW5jZWwgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBpZih0aGlzLl9hY3R1YWxNZXRob2QgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMuX2FjdHVhbE1ldGhvZC5pc0V4ZWN1dGFibGUgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMuX2FjdHVhbE1ldGhvZC5pc0V4ZWN1dGFibGUudmFsdWUgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgYXJncy5jYW5jZWwgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5fYWN0dWFsTWV0aG9kLmlucHV0UGFyYW1ldGVycyAhPSB1bmRlZmluZWQgJiYgdGhpcy5fYWN0dWFsTWV0aG9kLmlucHV0UGFyYW1ldGVycy5sZW5ndGggPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAvLyBObyBpbnB1dCBwYXJhbWV0ZXJzIGF2YWlsYWJsZSBmb3IgdGhpcyBtZXRob2Q7IGNhbmNlbCBlZGl0IG9mIHZhbHVlIGNvbHVtblxyXG4gICAgICAgICAgICAgICAgYXJncy5jYW5jZWwgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdXBkYXRlcyB0aGUgY29udGVudCBvZiB0aGUgbWV0aG9kIHBhcmFtZXRlcnMgbGlzdFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRNZXRob2R9IG1ldGhvZFxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXRcclxuICAgICAqL1xyXG4gICAgdXBkYXRlUGFyYW1ldGVyc0xpc3QobWV0aG9kOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCkge1xyXG5cclxuICAgICAgICB0aGlzLl9hY3R1YWxNZXRob2QgPSBtZXRob2Q7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5vYnNlcnZlTWV0aG9kRXhlY3V0YWJpbGl0eShtZXRob2QpO1xyXG5cclxuICAgICAgICAvLyB1cGRhdGUgdGhlIG1ldGhvZHMgaW5wdXQgcGFyYW1ldGVyc1xyXG4gICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLnVwZGF0ZUlucHV0UGFyYW1ldGVycyhtZXRob2QpLnRoZW4oKGlucHV0UGFyYW1ldGVycyk9PntcclxuICAgICAgICAgICAgdGhpcy5wb3B1bGF0ZU1ldGhvZFBhcmFtZXRlckxpc3QobWV0aG9kKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9ic2VydmVzIGlmIHRoZSBleGVjdXRhYmlsaXR5IG9mIHRoZSBtZXRob2RzIGhhcyBjaGFuZ2VkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RQYXJhbWV0ZXJMaXN0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb2JzZXJ2ZU1ldGhvZEV4ZWN1dGFiaWxpdHkobWV0aG9kKSB7XHJcbiAgICAgICAgbWV0aG9kLmlzRXhlY3V0YWJsZS5jaGFuZ2VkKChpc0V4ZWN1dGFibGUpPT57XHJcbiAgICAgICAgICAgIHRoaXMucG9wdWxhdGVNZXRob2RQYXJhbWV0ZXJMaXN0KG1ldGhvZCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFBvcHVsYXRlIHRoZSBtZXRob2QgcGFyYW1ldGVyIGxpc3RcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZH0gbWV0aG9kXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kUGFyYW1ldGVyTGlzdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHBvcHVsYXRlTWV0aG9kUGFyYW1ldGVyTGlzdChtZXRob2Q6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kKSB7XHJcbiAgICAgICAgdmFyIHBhcmFtZXRlckxpc3REYXRhU291cmNlID0gW1xyXG4gICAgICAgICAgICB7fVxyXG4gICAgICAgIF07XHJcbiAgICAgICAgaWYgKG1ldGhvZC5pbnB1dFBhcmFtZXRlcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBwYXJhbWV0ZXJMaXN0RGF0YVNvdXJjZSA9IG1ldGhvZC5pbnB1dFBhcmFtZXRlcnM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgdHJlZU9iaiA9IHRoaXMuZ2V0VHJlZUdyaWRPYmplY3QoKTtcclxuICAgICAgICBpZighdHJlZU9iail7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNhdmUgY2VsbCBpZiBjdXJyZW50bHkgaW4gZWRpdCBtb2RlIGJlZm9yZSByZWZyZXNoaW5nLCBvdGhlcndpc2UgcmVmcmVzaCBpcyBub3Qgd29ya2luZ1xyXG4gICAgICAgIHRyZWVPYmouc2F2ZUNlbGwoKTsgXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gVG8gcmVmcmVzaCBUcmVlR3JpZCB3aXRoIG5ldyBkYXRhc291cmNlXHJcbiAgICAgICAgdHJlZU9iai5zZXRNb2RlbCh7XCJkYXRhU291cmNlXCI6IHBhcmFtZXRlckxpc3REYXRhU291cmNlIH0sIHRydWUpO1xyXG4gICAgICAgIHRoaXMucmVzaXplKHRoaXMuX2FjdHVhbFdpZHRoLCB0aGlzLl9hY3R1YWxIZWlnaHQpO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZUV4ZWN1dGVQYW5lVGV4dChtZXRob2QuZGlzcGxheU5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlRXhlY3V0ZVBhbmVUZXh0KGNvbW1hbmREaXNwbGF5TmFtZTpzdHJpbmcpOiBhbnkge1xyXG4gICAgICAgIGxldCBidXR0b25BY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBpZih0aGlzLl9hY3R1YWxNZXRob2QgIT0gdW5kZWZpbmVkICYmIHRoaXMuX2FjdHVhbE1ldGhvZC5pc0V4ZWN1dGFibGUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgaWYodGhpcy5fYWN0dWFsTWV0aG9kLmlzRXhlY3V0YWJsZS52YWx1ZSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBidXR0b25BY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGdldCBidXR0b24gaW5zdGFuY2U7XHJcbiAgICAgICAgbGV0IGV4ZWN1dGVCdG4gPSAoPGFueT4kKFwiI1wiICsgdGhpcy5fZXhlY3V0ZUJ1dHRvbklkKSkuZGF0YShcImVqQnV0dG9uXCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHNldCBidXR0b24gdGV4dFxyXG4gICAgICAgIGV4ZWN1dGVCdG4ub3B0aW9uKHt0ZXh0OiBjb21tYW5kRGlzcGxheU5hbWV9KTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBzZXQgYnV0dG9uIGFjdGl2ZSBzdGF0ZVxyXG4gICAgICAgIGV4ZWN1dGVCdG4ub3B0aW9uKHtlbmFibGVkOiBidXR0b25BY3RpdmV9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlc2l6ZUV4ZWN1dGVCdXR0b24od2lkdGgpe1xyXG4gICAgICAgIGxldCBleGVjdXRlQnRuID0gKDxhbnk+JChcIiNcIiArIHRoaXMuX2V4ZWN1dGVCdXR0b25JZCkpLmRhdGEoXCJlakJ1dHRvblwiKTtcclxuICAgICAgICBleGVjdXRlQnRuLm9wdGlvbih7d2lkdGg6IHdpZHRoLTF9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgTWV0aG9kUGFyYW1ldGVyTGlzdFdpZGdldCB9OyJdfQ==