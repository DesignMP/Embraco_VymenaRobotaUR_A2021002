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
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * True if parameter list update is active
             *
             * @private
             * @memberof MethodParameterListWidget
             */
            _this._parameterListUpdateIsActive = false;
            return _this;
        }
        /* initialize the widget
         *
         * @param {string} layoutContainerId
         * @memberof MethodParameterListWidget
         */
        MethodParameterListWidget.prototype.initialize = function (layoutContainerId) {
            _super.prototype.initialize.call(this, layoutContainerId, 0, 36);
        };
        MethodParameterListWidget.prototype.initialized = function () {
            _super.prototype.initialized.call(this);
            this._executeButtonId = this.parentContentId + "_ExecuteButton";
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
            //console.info("CALL updateParametersList: " + method.browseName);
            if (this._actualMethod == method) {
                // No change of method
                return;
            }
            this.observeMethodExecutability(this._actualMethod, method);
            if (this._parameterListUpdateIsActive == true) {
                this._nextMethodForParameterListUpdate = method;
                return;
            }
            else {
                this._nextMethodForParameterListUpdate = undefined;
            }
            this._parameterListUpdateIsActive = true;
            this._actualMethod = method;
            // update the methods input parameters
            //console.info("GET inputParameters: " + method.browseName);
            mappCockpitComponent_1.MappCockpitComponentMethod.updateInputParameters(method).then(function (inputParameters) {
                inputParameters = _this.updateTreegridData(method, method.inputParameters);
                _this.populateMethodParameterList(inputParameters, method.displayName);
                _this._parameterListUpdateIsActive = false;
                if (_this._nextMethodForParameterListUpdate != undefined) {
                    _this.updateParametersList(_this._nextMethodForParameterListUpdate);
                }
            });
        };
        /**
         * Detach/attach observer when selected method has changed
         *
         * @param {MappCockpitComponentMethod} previousMethod
         * @param {MappCockpitComponentMethod} method
         * @memberof MethodParameterListWidget
         */
        MethodParameterListWidget.prototype.observeMethodExecutability = function (previousMethod, method) {
            var _this = this;
            if (previousMethod != undefined && previousMethod.isExecutable.isObservedBy(this)) {
                previousMethod.isExecutable.detachObserver(this);
            }
            method.isExecutable.attachObserver(this, function (isExecutable) {
                _this.updateExecutePaneText(method.displayName);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0aG9kUGFyYW1ldGVyTGlzdFdpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9tZXRob2RQYXJhbWV0ZXJMaXN0V2lkZ2V0L21ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBTUE7Ozs7O09BS0c7SUFDSDtRQUF3Qyw2Q0FBa0I7UUFBMUQ7WUFBQSxxRUF5V0M7WUE3Vkc7Ozs7O2VBS0c7WUFDSyxrQ0FBNEIsR0FBRyxLQUFLLENBQUM7O1FBdVZqRCxDQUFDO1FBNVVHOzs7O1dBSUc7UUFDSCw4Q0FBVSxHQUFWLFVBQVcsaUJBQXlCO1lBQ2hDLGlCQUFNLFVBQVUsWUFBQyxpQkFBaUIsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDL0MsQ0FBQztRQUVELCtDQUFXLEdBQVg7WUFDSSxpQkFBTSxXQUFXLFdBQUUsQ0FBQztZQUVwQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGVBQWUsR0FBRyxnQkFBZ0IsQ0FBQztZQUNoRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsR0FBRSx1REFBdUQsQ0FBQyxDQUFDO1lBQ3BILElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBRTNDLDhCQUE4QjtZQUM5QixpQkFBTSxnQkFBZ0IsWUFBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDbkMsQ0FBQztRQUVPLHVEQUFtQixHQUEzQixVQUE0QixrQkFBeUI7WUFBckQsaUJBaUJDO1lBZlMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBQzNDLFFBQVEsRUFBRSxXQUFXO2dCQUNyQiw0QkFBNEI7Z0JBQzVCLEtBQUssRUFBQyxNQUFNO2dCQUNa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MEI7WUFDMUIsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUMsQ0FBQyxDQUFDO1FBQy9DLENBQUM7UUFFTyx1REFBbUIsR0FBM0IsVUFBNEIsS0FBSztZQUM3QixJQUFJLFVBQVUsR0FBUyxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN4RSxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUMsS0FBSyxFQUFFLEtBQUssR0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO1FBQ3hDLENBQUM7UUFFTyxzREFBa0IsR0FBMUIsVUFBMkIsTUFBa0MsRUFBRSxlQUE2QztZQUN4RyxpREFBMEIsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDaEQsZUFBZSxHQUFHLGlEQUEwQixDQUFDLCtCQUErQixDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQzlGLE9BQU8sZUFBZSxDQUFDO1FBQzNCLENBQUM7UUFDTCxnQ0FBQztJQUFELENBQUMsQUF6V0QsQ0FBd0MsdUNBQWtCLEdBeVd6RDtJQUVRLDhEQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElNZXRob2RQYXJhbWV0ZXJMaXN0V2lkZ2V0IH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9tZXRob2RQYXJhbWV0ZXJMaXN0V2lkZ2V0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLCBNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50XCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0UGFyYW1ldGVyVHlwZUVkaXRvciB9IGZyb20gXCIuL21ldGhvZFBhcmFtZXRlckVkaXRvclwiO1xyXG5pbXBvcnQgeyBUcmVlR3JpZFdpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL3RyZWVHcmlkV2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBEb21IZWxwZXIgfSBmcm9tIFwiLi4vY29tbW9uL2RvbUhlbHBlclwiO1xyXG5cclxuLyoqXHJcbiAqIGltcGxlbWVudHMgdGhlIE1ldGhvZFBhcmFtZXRlckxpc3Qgd2lkZ2V0XHJcbiAqXHJcbiAqIEBjbGFzcyBNZXRob2RQYXJhbWV0ZXJMaXN0V2lkZ2V0XHJcbiAqIEBleHRlbmRzIHtUcmVlR3JpZFdpZGdldEJhc2V9XHJcbiAqL1xyXG5jbGFzcyBNZXRob2RQYXJhbWV0ZXJMaXN0V2lkZ2V0IGV4dGVuZHMgVHJlZUdyaWRXaWRnZXRCYXNlIGltcGxlbWVudHMgSU1ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXQge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3VycmVudCBtZXRob2QgZm9yIHdoaWNoIG9uZSB0aGUgcGFyYW1ldGVyIGxpc3QgaXMgc2hvd25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfYWN0dWFsTWV0aG9kO1xyXG4gICAgcHJpdmF0ZSBfYWN0dWFsSW5wdXRQYXJhbWV0ZXJzO1xyXG4gICAgcHJpdmF0ZSBfZXhlY3V0ZUJ1dHRvbklkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVHJ1ZSBpZiBwYXJhbWV0ZXIgbGlzdCB1cGRhdGUgaXMgYWN0aXZlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RQYXJhbWV0ZXJMaXN0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3BhcmFtZXRlckxpc3RVcGRhdGVJc0FjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTmV4dCBtZXRob2QgaW4gcXVldWUgZm9yIHBhcmFtZXRlciBsaXN0IHVwZGF0ZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAdHlwZSB7KE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kUGFyYW1ldGVyTGlzdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9uZXh0TWV0aG9kRm9yUGFyYW1ldGVyTGlzdFVwZGF0ZTogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2R8dW5kZWZpbmVkO1xyXG5cclxuICAgIC8qIGluaXRpYWxpemUgdGhlIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYXlvdXRDb250YWluZXJJZFxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXRcclxuICAgICAqL1xyXG4gICAgaW5pdGlhbGl6ZShsYXlvdXRDb250YWluZXJJZDogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZShsYXlvdXRDb250YWluZXJJZCwgMCwgMzYpO1xyXG4gICAgfVxyXG4gICAgICAgIFxyXG4gICAgaW5pdGlhbGl6ZWQoKXtcclxuICAgICAgICBzdXBlci5pbml0aWFsaXplZCgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX2V4ZWN1dGVCdXR0b25JZCA9IHRoaXMucGFyZW50Q29udGVudElkICsgXCJfRXhlY3V0ZUJ1dHRvblwiO1xyXG4gICAgICAgIHRoaXMuc2V0Rm9vdGVyQ29udGVudChcIjxkaXYgaWQ9J1wiICsgdGhpcy5fZXhlY3V0ZUJ1dHRvbklkICtcIicgc3R5bGU9J21hcmdpbi10b3A6IC01cHg7IG1hcmdpbi1sZWZ0OiAtNXB4Oyc+PC9kaXY+XCIpO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlRXhlY3V0ZUJ1dHRvbihcIlNlbGVjdCBjb21tYW5kXCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFNldCBkeW5hbWljIGNvbHVtbiBzZXR0aW5nc1xyXG4gICAgICAgIHN1cGVyLnNldER5bmFtaWNDb2x1bW4oMCwgMTAwKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNyZWF0ZUV4ZWN1dGVCdXR0b24oY29tbWFuZERpc3BsYXlOYW1lOnN0cmluZykge1xyXG5cclxuICAgICAgICAoPGFueT4kKFwiI1wiICsgdGhpcy5fZXhlY3V0ZUJ1dHRvbklkKSkuZWpCdXR0b24oe1xyXG4gICAgICAgICAgICBjc3NDbGFzczogJ2UtcHJpbWFyeScsXHJcbiAgICAgICAgICAgIC8vIHNpemU6ZWouQnV0dG9uU2l6ZS5MYXJnZSxcclxuICAgICAgICAgICAgd2lkdGg6XCIxMDAlXCIsXHJcbiAgICAgICAgICAgIGhlaWdodDpcIjM0cHhcIixcclxuICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcInRleHRhbmRpbWFnZVwiLFxyXG4gICAgICAgICAgICB0ZXh0OiBjb21tYW5kRGlzcGxheU5hbWUsXHJcbiAgICAgICAgICAgIGltYWdlUG9zaXRpb246IGVqLkltYWdlUG9zaXRpb24uSW1hZ2VSaWdodCxcclxuICAgICAgICAgICAgc2hvd1JvdW5kZWRDb3JuZXI6IGZhbHNlLFxyXG4gICAgICAgICAgICBjbGljazogKGFyZ3MpID0+IHsgdGhpcy5oYW5kbGVFeGVjdXRlTWV0aG9kQ2xpY2tlZChhcmdzKSB9LFxyXG4gICAgICAgICAgICBwcmVmaXhJY29uOiBcImUtaWNvbiBlLW1lZGlhcGxheVwiXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICg8SlF1ZXJ5PiQoXCIjXCIgKyB0aGlzLl9leGVjdXRlQnV0dG9uSWQpKS5jc3MoXCJmb250LXNpemVcIixcIjIwcHhcIilcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGhhbmRsZXMgY2xpY2sgb24gdGhlIG1ldGhvZCBleGVjdXRlIGJ1dHRvblxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kUGFyYW1ldGVyTGlzdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBoYW5kbGVFeGVjdXRlTWV0aG9kQ2xpY2tlZChhcmdzOiBhbnkpOiBhbnkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciB0cmVlT2JqID0gdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFNhdmUgY2VsbCBpZiBjdXJyZW50bHkgaW4gZWRpdCBtb2RlIGJlZm9yZSBleGVjdXRpbmcgbWV0aG9kXHJcbiAgICAgICAgdHJlZU9iai5zYXZlQ2VsbCgpOyBcclxuXHJcbiAgICAgICAgdGhpcy5leGVjdXRlTWV0aG9kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBleGVjdXRlcyB0aGUgc2VsZWN0ZWQgbWV0aG9kXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RQYXJhbWV0ZXJMaXN0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZXhlY3V0ZU1ldGhvZCgpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2FjdHVhbE1ldGhvZCAmJiB0aGlzLl9hY3R1YWxNZXRob2QgaW5zdGFuY2VvZiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCkge1xyXG4gICAgICAgICAgICBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZC5leGVjdXRlKHRoaXMuX2FjdHVhbE1ldGhvZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZHMgdGhlIHN0eWxlcyBmb3IgdGhlIG1ldGhvZCBleGVjdXRlIGJ1dHRvblxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RQYXJhbWV0ZXJMaXN0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGxvYWRTdHlsZXMoKXtcclxuICAgICAgICBzdXBlci5hZGRTdHlsZShcIndpZGdldHMvbWV0aG9kUGFyYW1ldGVyTGlzdFdpZGdldC9zdHlsZS9jc3MvbWV0aG9kRXhlY3V0ZUJ1dHRvblN0eWxlLmNzc1wiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogcmVzaXplcyB0aGUgbWV0aG9kcyBwYXJhbWV0ZXIgbGlzdCB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gd2lkdGhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RQYXJhbWV0ZXJMaXN0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHJlc2l6ZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcil7XHJcblx0XHRzdXBlci5yZXNpemUod2lkdGgsIGhlaWdodCk7XHJcblxyXG4gICAgICAgIHRoaXMucmVzaXplRXhlY3V0ZUJ1dHRvbih3aWR0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgIC8qKlxyXG4gICAgICogY3JlYXRlcyB0aGUgdHJlZSBncmlkIGZvciB0aGUgbWV0aG9kIHBhcmFtZXRlcnMgbGlzdFxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZVRyZWVHcmlkKCl7XHJcbiAgICAgICAgdmFyIHBhcmFtZXRlckxpc3REYXRhU291cmNlID0gW3t9XTtcclxuXHJcbiAgICAgICAgKDxhbnk+JCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCkpLmVqVHJlZUdyaWQoe1xyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbigpLFxyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkQ29sdW1uUmVzaXplU3VwcG9ydCgpLFxyXG5cclxuICAgICAgICAgICAgZGF0YVNvdXJjZTogcGFyYW1ldGVyTGlzdERhdGFTb3VyY2UsICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGVkaXRTZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgYWxsb3dFZGl0aW5nOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgYWxsb3dBZGRpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgYWxsb3dEZWxldGluZyA6IGZhbHNlLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGJlZ2luRWRpdDogKGFyZ3MpID0+IHRoaXMuYmVnaW5FZGl0KGFyZ3MpLFxyXG4gICAgICAgICAgICBlbmRFZGl0OiAoYXJncykgPT4gdGhpcy5lbmRFZGl0KGFyZ3MpLFxyXG4gICAgICAgICAgICBxdWVyeUNlbGxJbmZvOiAoYXJncykgPT4gdGhpcy5zaG93UGFyYW1ldGVyc0luTGlzdERpc2FibGVkKGFyZ3MpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJlZSBncmlkIGNvbHVtbiBkZWZpbml0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RQYXJhbWV0ZXJMaXN0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCk6IHt9e1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNvbHVtbnM6IFtcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwiZGlzcGxheU5hbWVcIiwgaGVhZGVyVGV4dDogXCJQYXJhbWV0ZXJcIiwgaXNQcmltYXJ5S2V5OiB0cnVlLCBhbGxvd0VkaXRpbmc6IGZhbHNlIH0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcImRpc3BsYXlWYWx1ZVwiLCBoZWFkZXJUZXh0OiBcIlZhbHVlXCIsIHdpZHRoOiBcIjEwMFwiLCBlZGl0VHlwZTogXCJzdHJpbmdlZGl0XCIsIGVkaXRUZW1wbGF0ZTogTWFwcENvY2twaXRQYXJhbWV0ZXJUeXBlRWRpdG9yLmNyZWF0ZUluc3RhbmNlKCkgfSxcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwiZW5naW5lZXJpbmdVbml0XCIsIGhlYWRlclRleHQ6IFwiVW5pdFwiLCB3aWR0aDogXCIxMDBcIiB9LFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJlZSBncmlkIGNvbHVtbiByZXNpemUgc2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmVlR3JpZENvbHVtblJlc2l6ZVN1cHBvcnQoKToge317XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYWxsb3dDb2x1bW5SZXNpemU6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbHVtblJlc2l6ZVNldHRpbmdzOiB7IGNvbHVtblJlc2l6ZU1vZGU6IGVqLlRyZWVHcmlkLkNvbHVtblJlc2l6ZU1vZGUuRml4ZWRDb2x1bW5zIH0sXHJcbiAgICAgICAgICAgIGNvbHVtblJlc2l6ZWQ6IChhcmdzKSA9PiBzdXBlci5yZXNpemVEeW5hbWljQ29sdW1uKGFyZ3MuY29sdW1uSW5kZXgsIGFyZ3MubW9kZWwpLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzaG93UGFyYW1ldGVyc0luTGlzdERpc2FibGVkKGFyZ3Mpe1xyXG4gICAgICAgICBcclxuICAgICAgICBpZih0aGlzLl9hY3R1YWxNZXRob2QgIT0gdW5kZWZpbmVkICYmIHRoaXMuX2FjdHVhbE1ldGhvZC5pc0V4ZWN1dGFibGUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgaWYoYXJncy5jZWxsRWxlbWVudC5jbGFzc0xpc3QgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIC8vIFNob3cgUmVhZE9ubHkgY2VsbCB3aXRoIG90aGVyIGNvbG9yXHJcbiAgICAgICAgICAgICAgICBsZXQgZGlzYWJsZVRyZWVDZWxsQ2xhc3NOYW1lID0gXCJ0cmVlQ2VsbERpc2FibGVkXCI7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLl9hY3R1YWxNZXRob2QuaXNFeGVjdXRhYmxlLnZhbHVlID09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgICAgICBhcmdzLmNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoZGlzYWJsZVRyZWVDZWxsQ2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJncy5jZWxsRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGRpc2FibGVUcmVlQ2VsbENsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgRG9tSGVscGVyLmRpc2FibGVFbGVtZW50KGFyZ3MuY2VsbEVsZW1lbnQsICF0aGlzLl9hY3R1YWxNZXRob2QuaXNFeGVjdXRhYmxlLnZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBiZWdpbkVkaXQoYXJncyl7XHJcbiAgICAgICAgLy8gT25seSB2YWx1ZSBjb2x1bW4gY2FuIGJlIGVkaXRlZCAoVE9ETzogdXNlIGNvbHVtbiBpZCBpbnN0ZWFkIG9mIGluZGV4KVxyXG4gICAgICAgIGlmKGFyZ3MuY29sdW1uSW5kZXggIT0gMSl7IC8vIDEgPSB2YWx1ZSBjb2x1bW5cclxuICAgICAgICAgICAgYXJncy5jYW5jZWwgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBpZih0aGlzLl9hY3R1YWxNZXRob2QgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMuX2FjdHVhbE1ldGhvZC5pc0V4ZWN1dGFibGUgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMuX2FjdHVhbE1ldGhvZC5pc0V4ZWN1dGFibGUudmFsdWUgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgYXJncy5jYW5jZWwgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5fYWN0dWFsTWV0aG9kLmlucHV0UGFyYW1ldGVycyAhPSB1bmRlZmluZWQgJiYgdGhpcy5fYWN0dWFsTWV0aG9kLmlucHV0UGFyYW1ldGVycy5sZW5ndGggPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAvLyBObyBpbnB1dCBwYXJhbWV0ZXJzIGF2YWlsYWJsZSBmb3IgdGhpcyBtZXRob2Q7IGNhbmNlbCBlZGl0IG9mIHZhbHVlIGNvbHVtblxyXG4gICAgICAgICAgICAgICAgYXJncy5jYW5jZWwgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZW5kRWRpdChhcmdzKSB7XHJcbiAgICAgICAgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QudXBkYXRlSW5wdXRQYXJhbWV0ZXJzKHRoaXMuX2FjdHVhbE1ldGhvZCkudGhlbigoaW5wdXRQYXJhbWV0ZXJzKT0+e1xyXG4gICAgICAgICAgICBpbnB1dFBhcmFtZXRlcnMgPSB0aGlzLnVwZGF0ZVRyZWVncmlkRGF0YSh0aGlzLl9hY3R1YWxNZXRob2QsIHRoaXMuX2FjdHVhbE1ldGhvZC5pbnB1dFBhcmFtZXRlcnMpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHVwZGF0ZSA9IHRoaXMubmVlZHNUb1VwZGF0ZUlucHV0UGFyYW1ldGVycyh0aGlzLl9hY3R1YWxJbnB1dFBhcmFtZXRlcnMsIGlucHV0UGFyYW1ldGVycylcclxuXHJcbiAgICAgICAgICAgIC8vaWYgcGFyYW1ldGVycyBhcmUgdGhlIHNhbWUsIGRvbid0IHBvcHVsYXRlIHRyZWVncmlkXHJcbiAgICAgICAgICAgIGlmICh1cGRhdGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucG9wdWxhdGVNZXRob2RQYXJhbWV0ZXJMaXN0KGlucHV0UGFyYW1ldGVycywgdGhpcy5fYWN0dWFsTWV0aG9kLmRpc3BsYXlOYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG5lZWRzVG9VcGRhdGVJbnB1dFBhcmFtZXRlcnMob2xkUGFyYW1ldGVyczogTWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXJbXSwgbmV3UGFyYW1ldGVyczogTWFwcENvY2twaXRNZXRob2RQYXJhbWV0ZXJbXSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCB1cGRhdGUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgaWYgKG9sZFBhcmFtZXRlcnMubGVuZ3RoID09IG5ld1BhcmFtZXRlcnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2xkUGFyYW1ldGVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9sZFBhcmFtZXRlcnNbaV0ubmFtZSAhPSBuZXdQYXJhbWV0ZXJzW2ldLm5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB1cGRhdGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB1cGRhdGUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHVwZGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHVwZGF0ZXMgdGhlIGNvbnRlbnQgb2YgdGhlIG1ldGhvZCBwYXJhbWV0ZXJzIGxpc3RcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kfSBtZXRob2RcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RQYXJhbWV0ZXJMaXN0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZVBhcmFtZXRlcnNMaXN0KG1ldGhvZDogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QpIHtcclxuICAgICAgICAvL2NvbnNvbGUuaW5mbyhcIkNBTEwgdXBkYXRlUGFyYW1ldGVyc0xpc3Q6IFwiICsgbWV0aG9kLmJyb3dzZU5hbWUpO1xyXG4gICAgICAgIGlmKHRoaXMuX2FjdHVhbE1ldGhvZCA9PSBtZXRob2Qpe1xyXG4gICAgICAgICAgICAvLyBObyBjaGFuZ2Ugb2YgbWV0aG9kXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMub2JzZXJ2ZU1ldGhvZEV4ZWN1dGFiaWxpdHkodGhpcy5fYWN0dWFsTWV0aG9kLCBtZXRob2QpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuX3BhcmFtZXRlckxpc3RVcGRhdGVJc0FjdGl2ZSA9PSB0cnVlKXtcclxuICAgICAgICAgICAgdGhpcy5fbmV4dE1ldGhvZEZvclBhcmFtZXRlckxpc3RVcGRhdGUgPSBtZXRob2Q7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fbmV4dE1ldGhvZEZvclBhcmFtZXRlckxpc3RVcGRhdGUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3BhcmFtZXRlckxpc3RVcGRhdGVJc0FjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fYWN0dWFsTWV0aG9kID0gbWV0aG9kO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgbWV0aG9kcyBpbnB1dCBwYXJhbWV0ZXJzXHJcbiAgICAgICAgLy9jb25zb2xlLmluZm8oXCJHRVQgaW5wdXRQYXJhbWV0ZXJzOiBcIiArIG1ldGhvZC5icm93c2VOYW1lKTtcclxuICAgICAgICBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZC51cGRhdGVJbnB1dFBhcmFtZXRlcnMobWV0aG9kKS50aGVuKChpbnB1dFBhcmFtZXRlcnMpPT57XHJcbiAgICAgICAgICAgIGlucHV0UGFyYW1ldGVycyA9IHRoaXMudXBkYXRlVHJlZWdyaWREYXRhKG1ldGhvZCwgbWV0aG9kLmlucHV0UGFyYW1ldGVycyk7XHJcbiAgICAgICAgICAgIHRoaXMucG9wdWxhdGVNZXRob2RQYXJhbWV0ZXJMaXN0KGlucHV0UGFyYW1ldGVycywgbWV0aG9kLmRpc3BsYXlOYW1lKTtcclxuICAgICAgICAgICAgdGhpcy5fcGFyYW1ldGVyTGlzdFVwZGF0ZUlzQWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX25leHRNZXRob2RGb3JQYXJhbWV0ZXJMaXN0VXBkYXRlICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVBhcmFtZXRlcnNMaXN0KHRoaXMuX25leHRNZXRob2RGb3JQYXJhbWV0ZXJMaXN0VXBkYXRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIERldGFjaC9hdHRhY2ggb2JzZXJ2ZXIgd2hlbiBzZWxlY3RlZCBtZXRob2QgaGFzIGNoYW5nZWRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kfSBwcmV2aW91c01ldGhvZFxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZH0gbWV0aG9kXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kUGFyYW1ldGVyTGlzdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb2JzZXJ2ZU1ldGhvZEV4ZWN1dGFiaWxpdHkocHJldmlvdXNNZXRob2Q6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLCBtZXRob2Q6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kKSB7XHJcbiAgICAgICAgaWYgKHByZXZpb3VzTWV0aG9kICE9IHVuZGVmaW5lZCAmJiBwcmV2aW91c01ldGhvZC5pc0V4ZWN1dGFibGUuaXNPYnNlcnZlZEJ5KHRoaXMpKSB7XHJcbiAgICAgICAgICAgIHByZXZpb3VzTWV0aG9kLmlzRXhlY3V0YWJsZS5kZXRhY2hPYnNlcnZlcih0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbWV0aG9kLmlzRXhlY3V0YWJsZS5hdHRhY2hPYnNlcnZlcih0aGlzLCAoaXNFeGVjdXRhYmxlKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUV4ZWN1dGVQYW5lVGV4dChtZXRob2QuZGlzcGxheU5hbWUpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQb3B1bGF0ZSB0aGUgbWV0aG9kIHBhcmFtZXRlciBsaXN0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRNZXRob2R9IG1ldGhvZFxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZFBhcmFtZXRlckxpc3RXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBwb3B1bGF0ZU1ldGhvZFBhcmFtZXRlckxpc3QoaW5wdXRQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcltdLCBkaXNwbGF5TmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdmFyIHBhcmFtZXRlckxpc3REYXRhU291cmNlID0gW1xyXG4gICAgICAgICAgICB7fVxyXG4gICAgICAgIF07XHJcbiAgICAgICAgaWYgKGlucHV0UGFyYW1ldGVycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHBhcmFtZXRlckxpc3REYXRhU291cmNlID0gaW5wdXRQYXJhbWV0ZXJzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fYWN0dWFsSW5wdXRQYXJhbWV0ZXJzID0gcGFyYW1ldGVyTGlzdERhdGFTb3VyY2U7XHJcbiAgICAgICAgdmFyIHRyZWVPYmogPSB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCk7XHJcbiAgICAgICAgaWYoIXRyZWVPYmope1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTYXZlIGNlbGwgaWYgY3VycmVudGx5IGluIGVkaXQgbW9kZSBiZWZvcmUgcmVmcmVzaGluZywgb3RoZXJ3aXNlIHJlZnJlc2ggaXMgbm90IHdvcmtpbmdcclxuICAgICAgICB0cmVlT2JqLnNhdmVDZWxsKCk7IFxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFRvIHJlZnJlc2ggVHJlZUdyaWQgd2l0aCBuZXcgZGF0YXNvdXJjZVxyXG4gICAgICAgIHRyZWVPYmouc2V0TW9kZWwoe1wiZGF0YVNvdXJjZVwiOiBwYXJhbWV0ZXJMaXN0RGF0YVNvdXJjZSB9LCB0cnVlKTtcclxuICAgICAgICB0aGlzLnJlc2l6ZSh0aGlzLl9hY3R1YWxXaWR0aCwgdGhpcy5fYWN0dWFsSGVpZ2h0KTtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVFeGVjdXRlUGFuZVRleHQoZGlzcGxheU5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlRXhlY3V0ZVBhbmVUZXh0KGNvbW1hbmREaXNwbGF5TmFtZTpzdHJpbmcpOiBhbnkge1xyXG4gICAgICAgIGxldCBidXR0b25BY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBpZih0aGlzLl9hY3R1YWxNZXRob2QgIT0gdW5kZWZpbmVkICYmIHRoaXMuX2FjdHVhbE1ldGhvZC5pc0V4ZWN1dGFibGUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgaWYodGhpcy5fYWN0dWFsTWV0aG9kLmlzRXhlY3V0YWJsZS52YWx1ZSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBidXR0b25BY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGdldCBidXR0b24gaW5zdGFuY2U7XHJcbiAgICAgICAgbGV0IGV4ZWN1dGVCdG4gPSAoPGFueT4kKFwiI1wiICsgdGhpcy5fZXhlY3V0ZUJ1dHRvbklkKSkuZGF0YShcImVqQnV0dG9uXCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHNldCBidXR0b24gdGV4dFxyXG4gICAgICAgIGV4ZWN1dGVCdG4ub3B0aW9uKHt0ZXh0OiBjb21tYW5kRGlzcGxheU5hbWV9KTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBzZXQgYnV0dG9uIGFjdGl2ZSBzdGF0ZVxyXG4gICAgICAgIGV4ZWN1dGVCdG4ub3B0aW9uKHtlbmFibGVkOiBidXR0b25BY3RpdmV9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlc2l6ZUV4ZWN1dGVCdXR0b24od2lkdGgpe1xyXG4gICAgICAgIGxldCBleGVjdXRlQnRuID0gKDxhbnk+JChcIiNcIiArIHRoaXMuX2V4ZWN1dGVCdXR0b25JZCkpLmRhdGEoXCJlakJ1dHRvblwiKTtcclxuICAgICAgICBleGVjdXRlQnRuLm9wdGlvbih7d2lkdGg6IHdpZHRoLTF9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZVRyZWVncmlkRGF0YShtZXRob2Q6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLCBpbnB1dFBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0TWV0aG9kUGFyYW1ldGVyW10pOiBNYXBwQ29ja3BpdE1ldGhvZFBhcmFtZXRlcltdIHtcclxuICAgICAgICBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZC51cGRhdGVGaWx0ZXIobWV0aG9kKTtcclxuICAgICAgICBpbnB1dFBhcmFtZXRlcnMgPSBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZC51cGRhdGVJbnB1dFBhcmFtZXRlcnNWaXNpYmlsaXR5KGlucHV0UGFyYW1ldGVycyk7XHJcbiAgICAgICAgcmV0dXJuIGlucHV0UGFyYW1ldGVycztcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgTWV0aG9kUGFyYW1ldGVyTGlzdFdpZGdldCB9OyJdfQ==