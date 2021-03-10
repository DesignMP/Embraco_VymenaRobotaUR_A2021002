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
define(["require", "exports", "../../framework/events", "./view/methodsGridToolbar", "../common/treeGridWidgetBase", "../../models/online/mappCockpitComponent", "../../models/online/mappCockpitComponentReflection", "../common/domHelper"], function (require, exports, events_1, methodsGridToolbar_1, treeGridWidgetBase_1, mappCockpitComponent_1, mappCockpitComponentReflection_1, domHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventSelectionChanged = /** @class */ (function (_super) {
        __extends(EventSelectionChanged, _super);
        function EventSelectionChanged() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventSelectionChanged;
    }(events_1.TypedEvent));
    ;
    /**
     * implements the MethodList widget
     *
     * @class MethodListWidget
     * @extends {WidgetBase}
     */
    var MethodListWidget = /** @class */ (function (_super) {
        __extends(MethodListWidget, _super);
        function MethodListWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.eventSelectionChanged = new EventSelectionChanged();
            _this._executableMethods = [];
            return _this;
        }
        /* initialize the widget
         *
         * @param {string} layoutContainerId
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.initialize = function (layoutContainerId) {
            _super.prototype.initialize.call(this, layoutContainerId);
        };
        Object.defineProperty(MethodListWidget.prototype, "methods", {
            /**
             * Sets the methods data link as a reference to the methods to be displayed
             *
             * @memberof MethodListWidget
             */
            set: function (methods) {
                var _this = this;
                this._executableMethods = methods;
                // initialize the method parameters default values
                this._executableMethods.forEach(function (executableMethod) {
                    mappCockpitComponentReflection_1.MappCockpitComponentMethodInfo.updateMethodInputParameters(executableMethod);
                    _this.observeMethodExecutability(executableMethod);
                });
                this.updateMethodsList();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Observes if the executability of the methods has changed
         *
         * @private
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.observeMethodExecutability = function (method) {
            var _this = this;
            method.isExecutable.changed(function (isExecutable) {
                _this.updateMethodsList();
            });
        };
        /**
         * Activates the method list widget
         *
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.activate = function () {
        };
        /**
         * Dispose some objects from the widget
         *
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.dispose = function () {
            if (this._toolbar != undefined) {
                this._toolbar.dispose();
            }
            _super.prototype.dispose.call(this);
        };
        /**
         * Loads the styles for the method list toolbar buttons
         *
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.loadStyles = function () {
            _super.prototype.addStyle.call(this, "widgets/methodListWidget/style/css/methodListToolbarButtonStyle.css");
        };
        /**
         * Creates the tree grid for the methods list
         *
         * @protected
         * @returns {*}
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.createTreeGrid = function () {
            var _this = this;
            var methodsDataSource = [{}];
            $(this.cssParentContentId).ejTreeGrid(__assign(__assign(__assign({}, this.getTreeGridColumnDefinition()), this.getTreeGridToolbarSupport()), { dataSource: methodsDataSource, editSettings: { allowDeleting: false }, rowSelected: function (args) { return _this.handleMethodListItemSelected(args); }, create: function (args) { return _this.treeGridCreated(); }, queryCellInfo: function (args) { return _this.showMethodDisabledIfNotExecutable(args); } }));
        };
        /**
         * Returns the tree grid column definition
         *
         * @private
         * @returns {{}}
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.getTreeGridColumnDefinition = function () {
            return {
                columns: [
                    { field: "displayName", headerText: "Command", width: "250" },
                ],
            };
        };
        /**
         * Returns the tree grid toolbar settings
         *
         * @private
         * @returns {{}}
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.getTreeGridToolbarSupport = function () {
            this._toolbar = new methodsGridToolbar_1.MethodGridToolbar();
            return {
                toolbarSettings: {
                    showToolbar: true,
                    customToolbarItems: this._toolbar.getCustomToolbars()
                },
            };
        };
        MethodListWidget.prototype.treeGridCreated = function () {
            // Sets the custom toolbar icons
            this._toolbar.setStyleForToolbarIcons(this.cssParentContentId);
        };
        MethodListWidget.prototype.showMethodDisabledIfNotExecutable = function (args) {
            if (args.column.field == "displayName") {
                if (args.data.item != undefined && args.data.item.isExecutable != undefined) {
                    if (args.cellElement.classList != undefined) {
                        // Show ReadOnly cell with other color
                        var disableTreeCellClassName = "treeCellDisabled";
                        if (args.data.item.isExecutable.value == false) {
                            args.cellElement.classList.add(disableTreeCellClassName);
                        }
                        else {
                            args.cellElement.classList.remove(disableTreeCellClassName);
                        }
                    }
                    domHelper_1.DomHelper.disableElement(args.cellElement, !args.data.item.isExecutable.value);
                }
            }
        };
        /**
         * updates the commands data
         *
         * @private
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.updateMethodsList = function () {
            this._toolbar.setActualComponentMethods(this._executableMethods);
            $(this.cssParentContentId).ejTreeGrid({
                dataSource: this._executableMethods,
            });
        };
        /**
         * handles selections of method items
         *
         * @param {*} args
         * @returns {*}
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.handleMethodListItemSelected = function (args) {
            // update the method parameter list after a method has been selected.
            if (args.data.item && args.data.item instanceof mappCockpitComponent_1.MappCockpitComponentMethod) {
                this.onSelectionChanged(args.data.item);
            }
        };
        MethodListWidget.prototype.onSelectionChanged = function (method) {
            this.eventSelectionChanged.raise(null, method);
        };
        return MethodListWidget;
    }(treeGridWidgetBase_1.TreeGridWidgetBase));
    exports.MethodListWidget = MethodListWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0aG9kTGlzdFdpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9tZXRob2RMaXN0V2lkZ2V0L21ldGhvZExpc3RXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBUUE7UUFBb0MseUNBQTRDO1FBQWhGOztRQUFrRixDQUFDO1FBQUQsNEJBQUM7SUFBRCxDQUFDLEFBQW5GLENBQW9DLG1CQUFVLEdBQXFDO0lBQUEsQ0FBQztJQUVwRjs7Ozs7T0FLRztJQUNIO1FBQStCLG9DQUFrQjtRQUFqRDtZQUFBLHFFQXVMQztZQXJMRywyQkFBcUIsR0FBRyxJQUFJLHFCQUFxQixFQUFFLENBQUM7WUFHNUMsd0JBQWtCLEdBQWlDLEVBQUUsQ0FBQzs7UUFrTGxFLENBQUM7UUFoTEc7Ozs7V0FJRztRQUNILHFDQUFVLEdBQVYsVUFBVyxpQkFBeUI7WUFDaEMsaUJBQU0sVUFBVSxZQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDeEMsQ0FBQztRQU9ELHNCQUFXLHFDQUFPO1lBTGxCOzs7O2VBSUc7aUJBQ0gsVUFBbUIsT0FBMEM7Z0JBQTdELGlCQVFDO2dCQVBHLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxPQUFPLENBQUM7Z0JBQ2xDLGtEQUFrRDtnQkFDbEQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxVQUFDLGdCQUFnQjtvQkFDN0MsK0RBQThCLENBQUMsMkJBQTJCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtvQkFDNUUsS0FBSSxDQUFDLDBCQUEwQixDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBQ3RELENBQUMsQ0FBQyxDQUFBO2dCQUNGLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQzdCLENBQUM7OztXQUFBO1FBRUQ7Ozs7O1dBS0c7UUFDSyxxREFBMEIsR0FBbEMsVUFBbUMsTUFBTTtZQUF6QyxpQkFJQztZQUhHLE1B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QUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsd0JBQXdCLENBQUMsQ0FBQzt5QkFDL0Q7cUJBQ0o7b0JBQ0QscUJBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDbEY7YUFDSjtRQUNMLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNLLDRDQUFpQixHQUF6QjtZQUNJLElBQUksQ0FBQyxRQUFRLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDM0QsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBRSxDQUFDLFVBQVUsQ0FBQztnQkFDekMsVUFBVSxFQUFFLElBQUksQ0FBQyxrQkFBa0I7YUFDdEMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNILHVEQUE0QixHQUE1QixVQUE2QixJQUFTO1lBQ2xDLHFFQUFxRTtZQUNyRSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxZQUFZLGlEQUEwQixFQUFFO2dCQUV4RSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFrQyxDQUFDLENBQUM7YUFDekU7UUFDTCxDQUFDO1FBRU8sNkNBQWtCLEdBQTFCLFVBQTJCLE1BQWtDO1lBQ3pELElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ25ELENBQUM7UUFDTCx1QkFBQztJQUFELENBQUMsQUF2TEQsQ0FBK0IsdUNBQWtCLEdBdUxoRDtJQUVRLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElNZXRob2RMaXN0V2lkZ2V0IH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9tZXRob2RMaXN0V2lkZ2V0SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFR5cGVkRXZlbnQgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2V2ZW50c1wiO1xyXG5pbXBvcnQgeyBNZXRob2RHcmlkVG9vbGJhciB9IGZyb20gXCIuL3ZpZXcvbWV0aG9kc0dyaWRUb29sYmFyXCI7XHJcbmltcG9ydCB7IFRyZWVHcmlkV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vdHJlZUdyaWRXaWRnZXRCYXNlXCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kIH0gZnJvbSBcIi4uLy4uL21vZGVscy9vbmxpbmUvbWFwcENvY2twaXRDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2RJbmZvIH0gZnJvbSBcIi4uLy4uL21vZGVscy9vbmxpbmUvbWFwcENvY2twaXRDb21wb25lbnRSZWZsZWN0aW9uXCI7XHJcbmltcG9ydCB7IERvbUhlbHBlciB9IGZyb20gXCIuLi9jb21tb24vZG9tSGVscGVyXCI7XHJcblxyXG5jbGFzcyBFdmVudFNlbGVjdGlvbkNoYW5nZWQgZXh0ZW5kcyBUeXBlZEV2ZW50PG51bGwsIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kPnsgfTtcclxuXHJcbi8qKlxyXG4gKiBpbXBsZW1lbnRzIHRoZSBNZXRob2RMaXN0IHdpZGdldFxyXG4gKlxyXG4gKiBAY2xhc3MgTWV0aG9kTGlzdFdpZGdldFxyXG4gKiBAZXh0ZW5kcyB7V2lkZ2V0QmFzZX1cclxuICovXHJcbmNsYXNzIE1ldGhvZExpc3RXaWRnZXQgZXh0ZW5kcyBUcmVlR3JpZFdpZGdldEJhc2UgaW1wbGVtZW50cyBJTWV0aG9kTGlzdFdpZGdldCB7XHJcblxyXG4gICAgZXZlbnRTZWxlY3Rpb25DaGFuZ2VkID0gbmV3IEV2ZW50U2VsZWN0aW9uQ2hhbmdlZCgpO1xyXG5cclxuICAgIHByaXZhdGUgX3Rvb2xiYXIhOiBNZXRob2RHcmlkVG9vbGJhcjtcclxuICAgIHByaXZhdGUgX2V4ZWN1dGFibGVNZXRob2RzOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFtdID0gW107XHJcblxyXG4gICAgLyogaW5pdGlhbGl6ZSB0aGUgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxheW91dENvbnRhaW5lcklkXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kTGlzdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBpbml0aWFsaXplKGxheW91dENvbnRhaW5lcklkOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlci5pbml0aWFsaXplKGxheW91dENvbnRhaW5lcklkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIG1ldGhvZHMgZGF0YSBsaW5rIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBtZXRob2RzIHRvIGJlIGRpc3BsYXllZFxyXG4gICAgICogXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kTGlzdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IG1ldGhvZHMobWV0aG9kczogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRNZXRob2Q+KSB7XHJcbiAgICAgICAgdGhpcy5fZXhlY3V0YWJsZU1ldGhvZHMgPSBtZXRob2RzO1xyXG4gICAgICAgIC8vIGluaXRpYWxpemUgdGhlIG1ldGhvZCBwYXJhbWV0ZXJzIGRlZmF1bHQgdmFsdWVzXHJcbiAgICAgICAgdGhpcy5fZXhlY3V0YWJsZU1ldGhvZHMuZm9yRWFjaCgoZXhlY3V0YWJsZU1ldGhvZCk9PnsgXHJcbiAgICAgICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mby51cGRhdGVNZXRob2RJbnB1dFBhcmFtZXRlcnMoZXhlY3V0YWJsZU1ldGhvZClcclxuICAgICAgICAgICAgdGhpcy5vYnNlcnZlTWV0aG9kRXhlY3V0YWJpbGl0eShleGVjdXRhYmxlTWV0aG9kKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMudXBkYXRlTWV0aG9kc0xpc3QoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9ic2VydmVzIGlmIHRoZSBleGVjdXRhYmlsaXR5IG9mIHRoZSBtZXRob2RzIGhhcyBjaGFuZ2VkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RMaXN0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb2JzZXJ2ZU1ldGhvZEV4ZWN1dGFiaWxpdHkobWV0aG9kKSB7XHJcbiAgICAgICAgbWV0aG9kLmlzRXhlY3V0YWJsZS5jaGFuZ2VkKChpc0V4ZWN1dGFibGUpPT57XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTWV0aG9kc0xpc3QoKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWN0aXZhdGVzIHRoZSBtZXRob2QgbGlzdCB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kTGlzdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBhY3RpdmF0ZSgpIHtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc3Bvc2Ugc29tZSBvYmplY3RzIGZyb20gdGhlIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RMaXN0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGRpc3Bvc2UoKXtcclxuICAgICAgICBpZih0aGlzLl90b29sYmFyICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2xiYXIuZGlzcG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkcyB0aGUgc3R5bGVzIGZvciB0aGUgbWV0aG9kIGxpc3QgdG9vbGJhciBidXR0b25zXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZExpc3RXaWRnZXRcclxuICAgICAqL1xyXG4gICAgbG9hZFN0eWxlcygpIHtcclxuICAgICAgICBzdXBlci5hZGRTdHlsZShcIndpZGdldHMvbWV0aG9kTGlzdFdpZGdldC9zdHlsZS9jc3MvbWV0aG9kTGlzdFRvb2xiYXJCdXR0b25TdHlsZS5jc3NcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSB0cmVlIGdyaWQgZm9yIHRoZSBtZXRob2RzIGxpc3RcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RMaXN0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBjcmVhdGVUcmVlR3JpZCgpIHtcclxuICAgICAgICB2YXIgbWV0aG9kc0RhdGFTb3VyY2UgPSBbe31dO1xyXG5cclxuICAgICAgICAoPGFueT4kKHRoaXMuY3NzUGFyZW50Q29udGVudElkKSkuZWpUcmVlR3JpZCh7XHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCksXHJcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0VHJlZUdyaWRUb29sYmFyU3VwcG9ydCgpLFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZGF0YVNvdXJjZTogbWV0aG9kc0RhdGFTb3VyY2UsXHJcbiAgICAgICAgICAgIGVkaXRTZXR0aW5nczogeyBhbGxvd0RlbGV0aW5nIDogZmFsc2UgfSxcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJvd1NlbGVjdGVkOiAoYXJncykgPT4gdGhpcy5oYW5kbGVNZXRob2RMaXN0SXRlbVNlbGVjdGVkKGFyZ3MpLFxyXG4gICAgICAgICAgICBjcmVhdGU6IChhcmdzKSA9PiB0aGlzLnRyZWVHcmlkQ3JlYXRlZCgpLFxyXG4gICAgICAgICAgICBxdWVyeUNlbGxJbmZvOiAoYXJncykgPT4gdGhpcy5zaG93TWV0aG9kRGlzYWJsZWRJZk5vdEV4ZWN1dGFibGUoYXJncyksXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgY29sdW1uIGRlZmluaXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZExpc3RXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmVlR3JpZENvbHVtbkRlZmluaXRpb24oKToge317XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY29sdW1uczogW1xyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJkaXNwbGF5TmFtZVwiLCBoZWFkZXJUZXh0OiBcIkNvbW1hbmRcIiwgd2lkdGg6IFwiMjUwXCJ9LFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmVlIGdyaWQgdG9vbGJhciBzZXR0aW5nc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kTGlzdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFRyZWVHcmlkVG9vbGJhclN1cHBvcnQoKToge317XHJcbiAgICAgICAgdGhpcy5fdG9vbGJhciA9IG5ldyBNZXRob2RHcmlkVG9vbGJhcigpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRvb2xiYXJTZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgc2hvd1Rvb2xiYXI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjdXN0b21Ub29sYmFySXRlbXM6IHRoaXMuX3Rvb2xiYXIuZ2V0Q3VzdG9tVG9vbGJhcnMoKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0cmVlR3JpZENyZWF0ZWQoKXtcclxuICAgICAgICAvLyBTZXRzIHRoZSBjdXN0b20gdG9vbGJhciBpY29uc1xyXG4gICAgICAgIHRoaXMuX3Rvb2xiYXIuc2V0U3R5bGVGb3JUb29sYmFySWNvbnModGhpcy5jc3NQYXJlbnRDb250ZW50SWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2hvd01ldGhvZERpc2FibGVkSWZOb3RFeGVjdXRhYmxlKGFyZ3Mpe1xyXG5cclxuICAgICAgICBpZiAoYXJncy5jb2x1bW4uZmllbGQgPT0gXCJkaXNwbGF5TmFtZVwiKXtcclxuICAgICAgICAgICAgaWYoYXJncy5kYXRhLml0ZW0gIT0gdW5kZWZpbmVkICYmIGFyZ3MuZGF0YS5pdGVtLmlzRXhlY3V0YWJsZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgaWYoYXJncy5jZWxsRWxlbWVudC5jbGFzc0xpc3QgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyBTaG93IFJlYWRPbmx5IGNlbGwgd2l0aCBvdGhlciBjb2xvclxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkaXNhYmxlVHJlZUNlbGxDbGFzc05hbWUgPSBcInRyZWVDZWxsRGlzYWJsZWRcIjtcclxuICAgICAgICAgICAgICAgICAgICBpZihhcmdzLmRhdGEuaXRlbS5pc0V4ZWN1dGFibGUudmFsdWUgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLmNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoZGlzYWJsZVRyZWVDZWxsQ2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5jZWxsRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGRpc2FibGVUcmVlQ2VsbENsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgRG9tSGVscGVyLmRpc2FibGVFbGVtZW50KGFyZ3MuY2VsbEVsZW1lbnQsICFhcmdzLmRhdGEuaXRlbS5pc0V4ZWN1dGFibGUudmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdXBkYXRlcyB0aGUgY29tbWFuZHMgZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kTGlzdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZU1ldGhvZHNMaXN0KCkge1xyXG4gICAgICAgIHRoaXMuX3Rvb2xiYXIuc2V0QWN0dWFsQ29tcG9uZW50TWV0aG9kcyh0aGlzLl9leGVjdXRhYmxlTWV0aG9kcyk7XHJcbiAgICAgICAgKDxhbnk+JCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCkpLmVqVHJlZUdyaWQoe1xyXG4gICAgICAgICAgICBkYXRhU291cmNlOiB0aGlzLl9leGVjdXRhYmxlTWV0aG9kcyxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGhhbmRsZXMgc2VsZWN0aW9ucyBvZiBtZXRob2QgaXRlbXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZExpc3RXaWRnZXRcclxuICAgICAqL1xyXG4gICAgaGFuZGxlTWV0aG9kTGlzdEl0ZW1TZWxlY3RlZChhcmdzOiBhbnkpOiBhbnkge1xyXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgbWV0aG9kIHBhcmFtZXRlciBsaXN0IGFmdGVyIGEgbWV0aG9kIGhhcyBiZWVuIHNlbGVjdGVkLlxyXG4gICAgICAgIGlmIChhcmdzLmRhdGEuaXRlbSAmJiBhcmdzLmRhdGEuaXRlbSBpbnN0YW5jZW9mIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLm9uU2VsZWN0aW9uQ2hhbmdlZChhcmdzLmRhdGEuaXRlbSBhcyBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25TZWxlY3Rpb25DaGFuZ2VkKG1ldGhvZDogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QpIHtcclxuICAgICAgICB0aGlzLmV2ZW50U2VsZWN0aW9uQ2hhbmdlZC5yYWlzZShudWxsLCBtZXRob2QpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBNZXRob2RMaXN0V2lkZ2V0IH07Il19