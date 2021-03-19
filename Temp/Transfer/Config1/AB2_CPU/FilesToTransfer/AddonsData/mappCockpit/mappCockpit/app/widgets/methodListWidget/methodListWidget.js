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
            _this._quickCommands = [];
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
        MethodListWidget.prototype.initializeComponent = function () {
            this.component.disablePersisting();
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
                this.updateFirstTimeMethodsList();
                this.addToolBarButtons();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MethodListWidget.prototype, "quickCommands", {
            set: function (quickCommands) {
                this._quickCommands = quickCommands;
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
                    customToolbarItems: this._toolbar.getCustomToolbars(undefined)
                },
            };
        };
        /**
         * Add toolbar buttons with quickCommands info
         *
         * @private
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.addToolBarButtons = function () {
            var _this = this;
            this._toolbar.setToolBarHeight();
            if (this._quickCommands.length > 0) {
                this._quickCommands.forEach(function (command) {
                    _this._toolbar.addCustomToolbarButtons(command.name, command.imageName);
                });
            }
            else {
                this._toolbar.addDefaultToolbarButtons();
            }
            this._toolbar.setActualComponentMethods(this._executableMethods);
        };
        MethodListWidget.prototype.treeGridCreated = function () {
            this._toolbar.initToolbar(this.cssParentContentId);
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
            $(this.cssParentContentId).ejTreeGrid({
                dataSource: this._executableMethods
            });
        };
        /**
         * First time treegrid is updated, toolbar buttons are inserted
         *
         * @private
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.updateFirstTimeMethodsList = function () {
            this._toolbar.setActualComponentMethods(this._executableMethods);
            $(this.cssParentContentId).ejTreeGrid({
                dataSource: this._executableMethods,
                toolbarSettings: {
                    customToolbarItems: this._toolbar.getCustomToolbars(this._quickCommands)
                }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0aG9kTGlzdFdpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9tZXRob2RMaXN0V2lkZ2V0L21ldGhvZExpc3RXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBUUE7UUFBb0MseUNBQTRDO1FBQWhGOztRQUFrRixDQUFDO1FBQUQsNEJBQUM7SUFBRCxDQUFDLEFBQW5GLENBQW9DLG1CQUFVLEdBQXFDO0lBQUEsQ0FBQztJQUVwRjs7Ozs7T0FLRztJQUNIO1FBQStCLG9DQUFrQjtRQUFqRDtZQUFBLHFFQW9PQztZQWxPRywyQkFBcUIsR0FBRyxJQUFJLHFCQUFxQixFQUFFLENBQUM7WUFHNUMsd0JBQWtCLEdBQWlDLEVBQUUsQ0FBQztZQUN0RCxvQkFBYyxHQUF3QyxFQUFFLENBQUM7O1FBOE5yRSxDQUFDO1FBNU5HOzs7O1dBSUc7UUFDSCxxQ0FBVSxHQUFWLFVBQVcsaUJBQXlCO1lBQ2hDLGlCQUFNLFVBQVUsWUFBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3hDLENBQUM7UUFFRCw4Q0FBbUIsR0FBbkI7WUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDdkMsQ0FBQztRQU9ELHNCQUFXLHFDQUFPO1lBTGxCOzs7O2VBSUc7aUJBQ0gsVUFBbUIsT0FBMEM7Z0JBQTdELGlCQVNDO2dCQVJHLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxPQUFPLENBQUM7Z0JBQ2xDLGtEQUFrRDtnQkFDbEQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxVQUFDLGdCQUFnQjtvQkFDN0MsK0RBQThCLENBQUMsMkJBQTJCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtvQkFDNUUsS0FBSSxDQUFDLDBCQUEwQixDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBQ3RELENBQUMsQ0FBQyxDQUFBO2dCQUNGLElBQUksQ0FB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VUFBVSxDQUFDO2dCQUN6QyxVQUFVLEVBQUUsSUFBSSxDQUFDLGtCQUFrQjthQUN0QyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSyxxREFBMEIsR0FBbEM7WUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQzNELENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUUsQ0FBQyxVQUFVLENBQUM7Z0JBQ3pDLFVBQVUsRUFBRSxJQUFJLENBQUMsa0JBQWtCO2dCQUNuQyxlQUFlLEVBQUU7b0JBQ2Isa0JBQWtCLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO2lCQUMzRTthQUNKLENBQUMsQ0FBQztRQUNQLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSCx1REFBNEIsR0FBNUIsVUFBNkIsSUFBUztZQUNsQyxxRUFBcUU7WUFDckUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksWUFBWSxpREFBMEIsRUFBRTtnQkFFeEUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBa0MsQ0FBQyxDQUFDO2FBQ3pFO1FBQ0wsQ0FBQztRQUVPLDZDQUFrQixHQUExQixVQUEyQixNQUFrQztZQUN6RCxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNuRCxDQUFDO1FBQ0wsdUJBQUM7SUFBRCxDQUFDLEFBcE9ELENBQStCLHVDQUFrQixHQW9PaEQ7SUFFUSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJTWV0aG9kTGlzdFdpZGdldCB9IGZyb20gXCIuL2ludGVyZmFjZXMvbWV0aG9kTGlzdFdpZGdldEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUeXBlZEV2ZW50IH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9ldmVudHNcIjtcclxuaW1wb3J0IHsgTWV0aG9kR3JpZFRvb2xiYXIgfSBmcm9tIFwiLi92aWV3L21ldGhvZHNHcmlkVG9vbGJhclwiO1xyXG5pbXBvcnQgeyBUcmVlR3JpZFdpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL3RyZWVHcmlkV2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCwgTWFwcENvY2twaXRRdWlja0NvbW1hbmRQYXJhbWV0ZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm8gfSBmcm9tIFwiLi4vLi4vbW9kZWxzL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudFJlZmxlY3Rpb25cIjtcclxuaW1wb3J0IHsgRG9tSGVscGVyIH0gZnJvbSBcIi4uL2NvbW1vbi9kb21IZWxwZXJcIjtcclxuXHJcbmNsYXNzIEV2ZW50U2VsZWN0aW9uQ2hhbmdlZCBleHRlbmRzIFR5cGVkRXZlbnQ8bnVsbCwgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2Q+eyB9O1xyXG5cclxuLyoqXHJcbiAqIGltcGxlbWVudHMgdGhlIE1ldGhvZExpc3Qgd2lkZ2V0XHJcbiAqXHJcbiAqIEBjbGFzcyBNZXRob2RMaXN0V2lkZ2V0XHJcbiAqIEBleHRlbmRzIHtXaWRnZXRCYXNlfVxyXG4gKi9cclxuY2xhc3MgTWV0aG9kTGlzdFdpZGdldCBleHRlbmRzIFRyZWVHcmlkV2lkZ2V0QmFzZSBpbXBsZW1lbnRzIElNZXRob2RMaXN0V2lkZ2V0IHtcclxuXHJcbiAgICBldmVudFNlbGVjdGlvbkNoYW5nZWQgPSBuZXcgRXZlbnRTZWxlY3Rpb25DaGFuZ2VkKCk7XHJcblxyXG4gICAgcHJpdmF0ZSBfdG9vbGJhciE6IE1ldGhvZEdyaWRUb29sYmFyO1xyXG4gICAgcHJpdmF0ZSBfZXhlY3V0YWJsZU1ldGhvZHM6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kW10gPSBbXTtcclxuICAgIHByaXZhdGUgX3F1aWNrQ29tbWFuZHMgOiBNYXBwQ29ja3BpdFF1aWNrQ29tbWFuZFBhcmFtZXRlcltdID0gW107XHJcblxyXG4gICAgLyogaW5pdGlhbGl6ZSB0aGUgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxheW91dENvbnRhaW5lcklkXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kTGlzdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBpbml0aWFsaXplKGxheW91dENvbnRhaW5lcklkOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlci5pbml0aWFsaXplKGxheW91dENvbnRhaW5lcklkKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0aWFsaXplQ29tcG9uZW50KCl7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZGlzYWJsZVBlcnNpc3RpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIG1ldGhvZHMgZGF0YSBsaW5rIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBtZXRob2RzIHRvIGJlIGRpc3BsYXllZFxyXG4gICAgICogXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kTGlzdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IG1ldGhvZHMobWV0aG9kczogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRNZXRob2Q+KSB7XHJcbiAgICAgICAgdGhpcy5fZXhlY3V0YWJsZU1ldGhvZHMgPSBtZXRob2RzO1xyXG4gICAgICAgIC8vIGluaXRpYWxpemUgdGhlIG1ldGhvZCBwYXJhbWV0ZXJzIGRlZmF1bHQgdmFsdWVzXHJcbiAgICAgICAgdGhpcy5fZXhlY3V0YWJsZU1ldGhvZHMuZm9yRWFjaCgoZXhlY3V0YWJsZU1ldGhvZCk9PnsgXHJcbiAgICAgICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mby51cGRhdGVNZXRob2RJbnB1dFBhcmFtZXRlcnMoZXhlY3V0YWJsZU1ldGhvZClcclxuICAgICAgICAgICAgdGhpcy5vYnNlcnZlTWV0aG9kRXhlY3V0YWJpbGl0eShleGVjdXRhYmxlTWV0aG9kKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMudXBkYXRlRmlyc3RUaW1lTWV0aG9kc0xpc3QoKTtcclxuICAgICAgICB0aGlzLmFkZFRvb2xCYXJCdXR0b25zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBxdWlja0NvbW1hbmRzKHF1aWNrQ29tbWFuZHM6IEFycmF5PE1hcHBDb2NrcGl0UXVpY2tDb21tYW5kUGFyYW1ldGVyPikge1xyXG4gICAgICAgIHRoaXMuX3F1aWNrQ29tbWFuZHMgPSBxdWlja0NvbW1hbmRzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT2JzZXJ2ZXMgaWYgdGhlIGV4ZWN1dGFiaWxpdHkgb2YgdGhlIG1ldGhvZHMgaGFzIGNoYW5nZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZExpc3RXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvYnNlcnZlTWV0aG9kRXhlY3V0YWJpbGl0eShtZXRob2QpIHtcclxuICAgICAgICBtZXRob2QuaXNFeGVjdXRhYmxlLmNoYW5nZWQoKGlzRXhlY3V0YWJsZSk9PntcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVNZXRob2RzTGlzdCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBY3RpdmF0ZXMgdGhlIG1ldGhvZCBsaXN0IHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RMaXN0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGFjdGl2YXRlKCkge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzcG9zZSBzb21lIG9iamVjdHMgZnJvbSB0aGUgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZExpc3RXaWRnZXRcclxuICAgICAqL1xyXG4gICAgZGlzcG9zZSgpe1xyXG4gICAgICAgIGlmKHRoaXMuX3Rvb2xiYXIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbGJhci5kaXNwb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWRzIHRoZSBzdHlsZXMgZm9yIHRoZSBtZXRob2QgbGlzdCB0b29sYmFyIGJ1dHRvbnNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kTGlzdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBsb2FkU3R5bGVzKCkge1xyXG4gICAgICAgIHN1cGVyLmFkZFN0eWxlKFwid2lkZ2V0cy9tZXRob2RMaXN0V2lkZ2V0L3N0eWxlL2Nzcy9tZXRob2RMaXN0VG9vbGJhckJ1dHRvblN0eWxlLmNzc1wiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIHRyZWUgZ3JpZCBmb3IgdGhlIG1ldGhvZHMgbGlzdFxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZExpc3RXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZVRyZWVHcmlkKCkge1xyXG4gICAgICAgIHZhciBtZXRob2RzRGF0YVNvdXJjZSA9IFt7fV07XHJcblxyXG4gICAgICAgICg8YW55PiQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpKS5lalRyZWVHcmlkKHtcclxuICAgICAgICAgICAgLi4udGhpcy5nZXRUcmVlR3JpZENvbHVtbkRlZmluaXRpb24oKSxcclxuICAgICAgICAgICAgLi4udGhpcy5nZXRUcmVlR3JpZFRvb2xiYXJTdXBwb3J0KCksXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBkYXRhU291cmNlOiBtZXRob2RzRGF0YVNvdXJjZSxcclxuICAgICAgICAgICAgZWRpdFNldHRpbmdzOiB7IGFsbG93RGVsZXRpbmcgOiBmYWxzZSB9LFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcm93U2VsZWN0ZWQ6IChhcmdzKSA9PiB0aGlzLmhhbmRsZU1ldGhvZExpc3RJdGVtU2VsZWN0ZWQoYXJncyksXHJcbiAgICAgICAgICAgIGNyZWF0ZTogKGFyZ3MpID0+IHRoaXMudHJlZUdyaWRDcmVhdGVkKCksXHJcbiAgICAgICAgICAgIHF1ZXJ5Q2VsbEluZm86IChhcmdzKSA9PiB0aGlzLnNob3dNZXRob2REaXNhYmxlZElmTm90RXhlY3V0YWJsZShhcmdzKSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCBjb2x1bW4gZGVmaW5pdGlvblxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kTGlzdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbigpOiB7fXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjb2x1bW5zOiBbXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcImRpc3BsYXlOYW1lXCIsIGhlYWRlclRleHQ6IFwiQ29tbWFuZFwiLCB3aWR0aDogXCIyNTBcIn0sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRyZWUgZ3JpZCB0b29sYmFyIHNldHRpbmdzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RMaXN0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VHJlZUdyaWRUb29sYmFyU3VwcG9ydCgpOiB7fXtcclxuICAgICAgICB0aGlzLl90b29sYmFyID0gbmV3IE1ldGhvZEdyaWRUb29sYmFyKCk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdG9vbGJhclNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICBzaG93VG9vbGJhcjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGN1c3RvbVRvb2xiYXJJdGVtczogdGhpcy5fdG9vbGJhci5nZXRDdXN0b21Ub29sYmFycyh1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCB0b29sYmFyIGJ1dHRvbnMgd2l0aCBxdWlja0NvbW1hbmRzIGluZm9cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZExpc3RXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRUb29sQmFyQnV0dG9ucygpIHtcclxuICAgICAgICB0aGlzLl90b29sYmFyLnNldFRvb2xCYXJIZWlnaHQoKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3F1aWNrQ29tbWFuZHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9xdWlja0NvbW1hbmRzLmZvckVhY2goKGNvbW1hbmQpPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdG9vbGJhci5hZGRDdXN0b21Ub29sYmFyQnV0dG9ucyhjb21tYW5kLm5hbWUsIGNvbW1hbmQuaW1hZ2VOYW1lKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl90b29sYmFyLmFkZERlZmF1bHRUb29sYmFyQnV0dG9ucygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl90b29sYmFyLnNldEFjdHVhbENvbXBvbmVudE1ldGhvZHModGhpcy5fZXhlY3V0YWJsZU1ldGhvZHMpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIHRyZWVHcmlkQ3JlYXRlZCgpe1xyXG4gICAgICAgIHRoaXMuX3Rvb2xiYXIuaW5pdFRvb2xiYXIodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2hvd01ldGhvZERpc2FibGVkSWZOb3RFeGVjdXRhYmxlKGFyZ3Mpe1xyXG5cclxuICAgICAgICBpZiAoYXJncy5jb2x1bW4uZmllbGQgPT0gXCJkaXNwbGF5TmFtZVwiKXtcclxuICAgICAgICAgICAgaWYoYXJncy5kYXRhLml0ZW0gIT0gdW5kZWZpbmVkICYmIGFyZ3MuZGF0YS5pdGVtLmlzRXhlY3V0YWJsZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgaWYoYXJncy5jZWxsRWxlbWVudC5jbGFzc0xpc3QgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyBTaG93IFJlYWRPbmx5IGNlbGwgd2l0aCBvdGhlciBjb2xvclxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkaXNhYmxlVHJlZUNlbGxDbGFzc05hbWUgPSBcInRyZWVDZWxsRGlzYWJsZWRcIjtcclxuICAgICAgICAgICAgICAgICAgICBpZihhcmdzLmRhdGEuaXRlbS5pc0V4ZWN1dGFibGUudmFsdWUgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLmNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoZGlzYWJsZVRyZWVDZWxsQ2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5jZWxsRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGRpc2FibGVUcmVlQ2VsbENsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgRG9tSGVscGVyLmRpc2FibGVFbGVtZW50KGFyZ3MuY2VsbEVsZW1lbnQsICFhcmdzLmRhdGEuaXRlbS5pc0V4ZWN1dGFibGUudmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdXBkYXRlcyB0aGUgY29tbWFuZHMgZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kTGlzdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZU1ldGhvZHNMaXN0KCkge1xyXG4gICAgICAgICg8YW55PiQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpKS5lalRyZWVHcmlkKHtcclxuICAgICAgICAgICAgZGF0YVNvdXJjZTogdGhpcy5fZXhlY3V0YWJsZU1ldGhvZHNcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZpcnN0IHRpbWUgdHJlZWdyaWQgaXMgdXBkYXRlZCwgdG9vbGJhciBidXR0b25zIGFyZSBpbnNlcnRlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kTGlzdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZUZpcnN0VGltZU1ldGhvZHNMaXN0KCkge1xyXG4gICAgICAgIHRoaXMuX3Rvb2xiYXIuc2V0QWN0dWFsQ29tcG9uZW50TWV0aG9kcyh0aGlzLl9leGVjdXRhYmxlTWV0aG9kcyk7XHJcbiAgICAgICAgKDxhbnk+JCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCkpLmVqVHJlZUdyaWQoe1xyXG4gICAgICAgICAgICBkYXRhU291cmNlOiB0aGlzLl9leGVjdXRhYmxlTWV0aG9kcyxcclxuICAgICAgICAgICAgdG9vbGJhclNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICBjdXN0b21Ub29sYmFySXRlbXM6IHRoaXMuX3Rvb2xiYXIuZ2V0Q3VzdG9tVG9vbGJhcnModGhpcy5fcXVpY2tDb21tYW5kcylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIGhhbmRsZXMgc2VsZWN0aW9ucyBvZiBtZXRob2QgaXRlbXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZExpc3RXaWRnZXRcclxuICAgICAqL1xyXG4gICAgaGFuZGxlTWV0aG9kTGlzdEl0ZW1TZWxlY3RlZChhcmdzOiBhbnkpOiBhbnkge1xyXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgbWV0aG9kIHBhcmFtZXRlciBsaXN0IGFmdGVyIGEgbWV0aG9kIGhhcyBiZWVuIHNlbGVjdGVkLlxyXG4gICAgICAgIGlmIChhcmdzLmRhdGEuaXRlbSAmJiBhcmdzLmRhdGEuaXRlbSBpbnN0YW5jZW9mIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLm9uU2VsZWN0aW9uQ2hhbmdlZChhcmdzLmRhdGEuaXRlbSBhcyBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25TZWxlY3Rpb25DaGFuZ2VkKG1ldGhvZDogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QpIHtcclxuICAgICAgICB0aGlzLmV2ZW50U2VsZWN0aW9uQ2hhbmdlZC5yYWlzZShudWxsLCBtZXRob2QpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBNZXRob2RMaXN0V2lkZ2V0IH07Il19