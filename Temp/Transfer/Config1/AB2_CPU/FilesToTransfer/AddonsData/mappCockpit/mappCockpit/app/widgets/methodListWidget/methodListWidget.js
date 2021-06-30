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
define(["require", "exports", "../../libs/math/mathjs", "../../framework/events", "./view/methodsGridToolbar", "../common/treeGridWidgetBase", "../../models/online/mappCockpitComponent", "../../models/online/mappCockpitComponentReflection", "../common/domHelper", "./defaultComponentSettings", "../../common/componentBase/contextIds/ctxComponentView"], function (require, exports, math, events_1, methodsGridToolbar_1, treeGridWidgetBase_1, mappCockpitComponent_1, mappCockpitComponentReflection_1, domHelper_1, defaultComponentSettings_1, ctxComponentView_1) {
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
            _this._watchableParameters = [];
            // holds a list of watchablesParameters names that change methods executability
            _this._observedWatchables = [];
            return _this;
        }
        MethodListWidget.prototype.initializeComponent = function () {
            this.component.defaultSettingsDataId = defaultComponentSettings_1.DefaultComponentSettings.WidgetDefinitionId;
            this.component.disablePersisting();
        };
        MethodListWidget.prototype.initialized = function () {
            var context = this.component.context;
            if (context != undefined) {
                var componentIdFromContext = context.getContext(ctxComponentView_1.CtxComponentView.componentId);
                if (componentIdFromContext != undefined) {
                    // TODO: create binding to methods with context info
                }
            }
        };
        /**
         * Returns the default component settings for this widget
         *
         * @returns {(ComponentSettings|undefined)}
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.getDefaultComponentSettings = function () {
            return defaultComponentSettings_1.DefaultComponentSettings.getMethodListWidgetDefinition();
        };
        Object.defineProperty(MethodListWidget.prototype, "quickCommands", {
            set: function (quickCommands) {
                this._quickCommands = quickCommands;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MethodListWidget.prototype, "watchableParameters", {
            set: function (watchableParameters) {
                this._watchableParameters = watchableParameters;
            },
            enumerable: true,
            configurable: true
        });
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
                this.setObservedWatchables();
                this.updateFirstTimeMethodsList();
                this.addToolBarButtons();
                this.observeWatchables();
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
         * Define all watchable variables that need to be observed by the methodListWidget
         *
         * @private
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.setObservedWatchables = function () {
            var _this = this;
            this._executableMethods.forEach(function (method) {
                if (method.expression != undefined) {
                    _this._watchableParameters.forEach(function (watchable) {
                        if (!_this._observedWatchables.includes(watchable) && method.expression.includes(watchable.browseName)) {
                            _this._observedWatchables.push(watchable);
                        }
                    });
                }
            });
        };
        MethodListWidget.prototype.observeWatchables = function () {
            // invoke observing the watchables
            mappCockpitComponent_1.MappCockpitComponentParameter.observeParameterValueChanges(this, this._observedWatchables);
        };
        MethodListWidget.prototype.onObservablesChanged = function (changedObservables) {
            var _this = this;
            console.log("onObservablesChanged: %o %o", this, changedObservables);
            changedObservables.forEach(function (observable) {
                if (observable.property === "Value") {
                    _this.onWatchableValueChanged();
                }
            });
        };
        MethodListWidget.prototype.onWatchableValueChanged = function () {
            this.evaluateEnabledStates(this._executableMethods);
        };
        /**
         * Evaluate expressions of all methods when an observedWatchable has changed
         *
         * @private
         * @param {MappCockpitComponentMethod[]} methods
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.evaluateEnabledStates = function (methods) {
            var _this = this;
            methods.forEach(function (method) {
                //Just evaluate enableState if writeAccess is true, otherwise executability will always be false
                if (method.expression !== undefined && method.component.model.writeAccess) {
                    method.isExecutable.value = _this.getEnabledState(method);
                }
            });
        };
        /**
         * Gets enabled state according to method expression.
         *
         * @private
         * @param {MappCockpitComponentMethod} method
         * @returns {boolean}
         * @memberof MethodListWidget
         */
        MethodListWidget.prototype.getEnabledState = function (method) {
            var expression = method.expression;
            this._watchableParameters.forEach(function (watchable) {
                if (method.expression.includes(watchable.browseName)) {
                    expression = expression.replace(new RegExp(watchable.browseName, 'g'), watchable.value);
                }
            });
            return math.evaluate(expression);
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
            mappCockpitComponent_1.MappCockpitComponentParameter.unobserveComponentModelItems(this, this._watchableParameters);
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
            var imageProvider = this.component.getSubComponent(defaultComponentSettings_1.DefaultComponentSettings.ImageProviderId);
            this._toolbar = new methodsGridToolbar_1.MethodGridToolbar(imageProvider);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0aG9kTGlzdFdpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9tZXRob2RMaXN0V2lkZ2V0L21ldGhvZExpc3RXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBY0E7UUFBb0MseUNBQTRDO1FBQWhGOztRQUFrRixDQUFDO1FBQUQsNEJBQUM7SUFBRCxDQUFDLEFBQW5GLENBQW9DLG1CQUFVLEdBQXFDO0lBQUEsQ0FBQztJQUVwRjs7Ozs7T0FLRztJQUNIO1FBQStCLG9DQUFrQjtRQUFqRDtZQUFBLHFFQXFVQztZQW5VRywyQkFBcUIsR0FBRyxJQUFJLHFCQUFxQixFQUFFLENBQUM7WUFHNUMsd0JBQWtCLEdBQWlDLEVBQUUsQ0FBQztZQUN0RCxvQkFBYyxHQUF3QyxFQUFFLENBQUM7WUFDekQsMEJBQW9CLEdBQXFDLEVBQUUsQ0FBQztZQUVwRSwrRUFBK0U7WUFDdkUseUJBQW1CLEdBQXFDLEVBQUUsQ0FBQzs7UUEyVHZFLENBQUM7UUF6VEcsOENBQW1CLEdBQW5CO1lBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsR0FBRyxtREFBd0IsQ0FBQyxrQkFBa0IsQ0FBQztZQUNuRixJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDdkMsQ0FBQztRQUVELHNDQUFXLEdBQVg7WUFDSSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQztZQUNyQyxJQUFHLE9BQU8sSUFBSSxTQUFTLEVBQUM7Z0JBQ3BCLElBQUksc0JBQXNCLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxtQ0FBZ0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDOUUsSUFBRyxzQkFBc0IsSUFBSSxTQUFTLEVBQUM7b0JBQ25DLG9EQUFvRDtpQkFFdkQ7YUFDSjtRQUNMLENBQUM7UUFFRDs7Ozs7V0FLRztR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QUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxZQUFZLGlEQUEwQixFQUFFO2dCQUV4RSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFrQyxDQUFDLENBQUM7YUFDekU7UUFDTCxDQUFDO1FBRU8sNkNBQWtCLEdBQTFCLFVBQTJCLE1BQWtDO1lBQ3pELElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ25ELENBQUM7UUFDTCx1QkFBQztJQUFELENBQUMsQUFyVUQsQ0FBK0IsdUNBQWtCLEdBcVVoRDtJQUVRLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIG1hdGggZnJvbSBcIi4uLy4uL2xpYnMvbWF0aC9tYXRoanNcIjtcclxuaW1wb3J0IHsgSU1ldGhvZExpc3RXaWRnZXQgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL21ldGhvZExpc3RXaWRnZXRJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvZXZlbnRzXCI7XHJcbmltcG9ydCB7IE1ldGhvZEdyaWRUb29sYmFyIH0gZnJvbSBcIi4vdmlldy9tZXRob2RzR3JpZFRvb2xiYXJcIjtcclxuaW1wb3J0IHsgVHJlZUdyaWRXaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi90cmVlR3JpZFdpZGdldEJhc2VcIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QsIE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyLCBNYXBwQ29ja3BpdFF1aWNrQ29tbWFuZFBhcmFtZXRlciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50XCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kSW5mbyB9IGZyb20gXCIuLi8uLi9tb2RlbHMvb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50UmVmbGVjdGlvblwiO1xyXG5pbXBvcnQgeyBEb21IZWxwZXIgfSBmcm9tIFwiLi4vY29tbW9uL2RvbUhlbHBlclwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9pbnRlcmZhY2VzL29ic2VydmVyXCI7XHJcbmltcG9ydCB7IERlZmF1bHRDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuL2RlZmF1bHRDb21wb25lbnRTZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnRTZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBDdHhDb21wb25lbnRWaWV3IH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbnRleHRJZHMvY3R4Q29tcG9uZW50Vmlld1wiO1xyXG5pbXBvcnQgeyBJSW1hZ2VQcm92aWRlciB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy9pbWFnZVByb3ZpZGVySW50ZXJmYWNlXCI7XHJcblxyXG5jbGFzcyBFdmVudFNlbGVjdGlvbkNoYW5nZWQgZXh0ZW5kcyBUeXBlZEV2ZW50PG51bGwsIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kPnsgfTtcclxuXHJcbi8qKlxyXG4gKiBpbXBsZW1lbnRzIHRoZSBNZXRob2RMaXN0IHdpZGdldFxyXG4gKlxyXG4gKiBAY2xhc3MgTWV0aG9kTGlzdFdpZGdldFxyXG4gKiBAZXh0ZW5kcyB7V2lkZ2V0QmFzZX1cclxuICovXHJcbmNsYXNzIE1ldGhvZExpc3RXaWRnZXQgZXh0ZW5kcyBUcmVlR3JpZFdpZGdldEJhc2UgaW1wbGVtZW50cyBJTWV0aG9kTGlzdFdpZGdldCB7XHJcblxyXG4gICAgZXZlbnRTZWxlY3Rpb25DaGFuZ2VkID0gbmV3IEV2ZW50U2VsZWN0aW9uQ2hhbmdlZCgpO1xyXG5cclxuICAgIHByaXZhdGUgX3Rvb2xiYXIhOiBNZXRob2RHcmlkVG9vbGJhcjtcclxuICAgIHByaXZhdGUgX2V4ZWN1dGFibGVNZXRob2RzOiBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZFtdID0gW107XHJcbiAgICBwcml2YXRlIF9xdWlja0NvbW1hbmRzIDogTWFwcENvY2twaXRRdWlja0NvbW1hbmRQYXJhbWV0ZXJbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBfd2F0Y2hhYmxlUGFyYW1ldGVycyA6IE1hcHBDb2NrcGl0Q29tcG9uZW50UGFyYW1ldGVyW10gPSBbXTtcclxuXHJcbiAgICAvLyBob2xkcyBhIGxpc3Qgb2Ygd2F0Y2hhYmxlc1BhcmFtZXRlcnMgbmFtZXMgdGhhdCBjaGFuZ2UgbWV0aG9kcyBleGVjdXRhYmlsaXR5XHJcbiAgICBwcml2YXRlIF9vYnNlcnZlZFdhdGNoYWJsZXMgOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcltdID0gW107XHJcbiAgICBcclxuICAgIGluaXRpYWxpemVDb21wb25lbnQoKXtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5kZWZhdWx0U2V0dGluZ3NEYXRhSWQgPSBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuV2lkZ2V0RGVmaW5pdGlvbklkO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmRpc2FibGVQZXJzaXN0aW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZWQoKXtcclxuICAgICAgICBsZXQgY29udGV4dCA9IHRoaXMuY29tcG9uZW50LmNvbnRleHQ7XHJcbiAgICAgICAgaWYoY29udGV4dCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBsZXQgY29tcG9uZW50SWRGcm9tQ29udGV4dCA9IGNvbnRleHQuZ2V0Q29udGV4dChDdHhDb21wb25lbnRWaWV3LmNvbXBvbmVudElkKTtcclxuICAgICAgICAgICAgaWYoY29tcG9uZW50SWRGcm9tQ29udGV4dCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogY3JlYXRlIGJpbmRpbmcgdG8gbWV0aG9kcyB3aXRoIGNvbnRleHQgaW5mb1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgY29tcG9uZW50IHNldHRpbmdzIGZvciB0aGlzIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsoQ29tcG9uZW50U2V0dGluZ3N8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RMaXN0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGdldERlZmF1bHRDb21wb25lbnRTZXR0aW5ncygpOiBDb21wb25lbnRTZXR0aW5nc3x1bmRlZmluZWR7XHJcbiAgICAgICAgcmV0dXJuIERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5nZXRNZXRob2RMaXN0V2lkZ2V0RGVmaW5pdGlvbigpO1xyXG4gICAgfVxyXG5cclxuIFxyXG4gICAgcHVibGljIHNldCBxdWlja0NvbW1hbmRzKHF1aWNrQ29tbWFuZHM6IEFycmF5PE1hcHBDb2NrcGl0UXVpY2tDb21tYW5kUGFyYW1ldGVyPikge1xyXG4gICAgICAgIHRoaXMuX3F1aWNrQ29tbWFuZHMgPSBxdWlja0NvbW1hbmRzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgd2F0Y2hhYmxlUGFyYW1ldGVycyh3YXRjaGFibGVQYXJhbWV0ZXJzOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcj4pIHtcclxuICAgICAgICB0aGlzLl93YXRjaGFibGVQYXJhbWV0ZXJzID0gd2F0Y2hhYmxlUGFyYW1ldGVycztcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBtZXRob2RzIGRhdGEgbGluayBhcyBhIHJlZmVyZW5jZSB0byB0aGUgbWV0aG9kcyB0byBiZSBkaXNwbGF5ZWRcclxuICAgICAqIFxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZExpc3RXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBtZXRob2RzKG1ldGhvZHM6IEFycmF5PE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kPikge1xyXG4gICAgICAgIHRoaXMuX2V4ZWN1dGFibGVNZXRob2RzID0gbWV0aG9kcztcclxuICAgICAgICAvLyBpbml0aWFsaXplIHRoZSBtZXRob2QgcGFyYW1ldGVycyBkZWZhdWx0IHZhbHVlc1xyXG4gICAgICAgIHRoaXMuX2V4ZWN1dGFibGVNZXRob2RzLmZvckVhY2goKGV4ZWN1dGFibGVNZXRob2QpPT57IFxyXG4gICAgICAgICAgICBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZEluZm8udXBkYXRlTWV0aG9kSW5wdXRQYXJhbWV0ZXJzKGV4ZWN1dGFibGVNZXRob2QpO1xyXG4gICAgICAgICAgICB0aGlzLm9ic2VydmVNZXRob2RFeGVjdXRhYmlsaXR5KGV4ZWN1dGFibGVNZXRob2QpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5zZXRPYnNlcnZlZFdhdGNoYWJsZXMoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUZpcnN0VGltZU1ldGhvZHNMaXN0KCk7XHJcbiAgICAgICAgdGhpcy5hZGRUb29sQmFyQnV0dG9ucygpO1xyXG4gICAgICAgIHRoaXMub2JzZXJ2ZVdhdGNoYWJsZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9ic2VydmVzIGlmIHRoZSBleGVjdXRhYmlsaXR5IG9mIHRoZSBtZXRob2RzIGhhcyBjaGFuZ2VkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RMaXN0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb2JzZXJ2ZU1ldGhvZEV4ZWN1dGFiaWxpdHkobWV0aG9kKSB7XHJcbiAgICAgICAgbWV0aG9kLmlzRXhlY3V0YWJsZS5jaGFuZ2VkKChpc0V4ZWN1dGFibGUpPT57XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTWV0aG9kc0xpc3QoKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lIGFsbCB3YXRjaGFibGUgdmFyaWFibGVzIHRoYXQgbmVlZCB0byBiZSBvYnNlcnZlZCBieSB0aGUgbWV0aG9kTGlzdFdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kTGlzdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldE9ic2VydmVkV2F0Y2hhYmxlcygpIHtcclxuICAgICAgICB0aGlzLl9leGVjdXRhYmxlTWV0aG9kcy5mb3JFYWNoKChtZXRob2QpID0+IHtcclxuICAgICAgICAgICAgaWYgKG1ldGhvZC5leHByZXNzaW9uICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fd2F0Y2hhYmxlUGFyYW1ldGVycy5mb3JFYWNoKCh3YXRjaGFibGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZighdGhpcy5fb2JzZXJ2ZWRXYXRjaGFibGVzLmluY2x1ZGVzKHdhdGNoYWJsZSkgJiYgbWV0aG9kLmV4cHJlc3Npb24hLmluY2x1ZGVzKHdhdGNoYWJsZS5icm93c2VOYW1lKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX29ic2VydmVkV2F0Y2hhYmxlcy5wdXNoKHdhdGNoYWJsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvYnNlcnZlV2F0Y2hhYmxlcygpOiBhbnkge1xyXG4gICAgICAgIC8vIGludm9rZSBvYnNlcnZpbmcgdGhlIHdhdGNoYWJsZXNcclxuICAgICAgICBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlci5vYnNlcnZlUGFyYW1ldGVyVmFsdWVDaGFuZ2VzKHRoaXMsdGhpcy5fb2JzZXJ2ZWRXYXRjaGFibGVzKTtcclxuICAgIH1cclxuXHJcbiAgICBvbk9ic2VydmFibGVzQ2hhbmdlZChjaGFuZ2VkT2JzZXJ2YWJsZXM6IE9ic2VydmFibGVbXSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwib25PYnNlcnZhYmxlc0NoYW5nZWQ6ICVvICVvXCIsdGhpcyxjaGFuZ2VkT2JzZXJ2YWJsZXMpO1xyXG4gICAgICAgIGNoYW5nZWRPYnNlcnZhYmxlcy5mb3JFYWNoKChvYnNlcnZhYmxlKT0+e1xyXG4gICAgICAgICAgICBpZiAob2JzZXJ2YWJsZS5wcm9wZXJ0eSA9PT0gXCJWYWx1ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uV2F0Y2hhYmxlVmFsdWVDaGFuZ2VkKCk7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25XYXRjaGFibGVWYWx1ZUNoYW5nZWQoKSB7XHJcbiAgICAgICAgdGhpcy5ldmFsdWF0ZUVuYWJsZWRTdGF0ZXModGhpcy5fZXhlY3V0YWJsZU1ldGhvZHMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRXZhbHVhdGUgZXhwcmVzc2lvbnMgb2YgYWxsIG1ldGhvZHMgd2hlbiBhbiBvYnNlcnZlZFdhdGNoYWJsZSBoYXMgY2hhbmdlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge01hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kW119IG1ldGhvZHNcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RMaXN0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZXZhbHVhdGVFbmFibGVkU3RhdGVzKG1ldGhvZHM6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kW10pIHtcclxuICAgICAgICBtZXRob2RzLmZvckVhY2goKG1ldGhvZCkgPT57XHJcbiAgICAgICAgICAgIC8vSnVzdCBldmFsdWF0ZSBlbmFibGVTdGF0ZSBpZiB3cml0ZUFjY2VzcyBpcyB0cnVlLCBvdGhlcndpc2UgZXhlY3V0YWJpbGl0eSB3aWxsIGFsd2F5cyBiZSBmYWxzZVxyXG4gICAgICAgICAgICBpZiAobWV0aG9kLmV4cHJlc3Npb24gIT09IHVuZGVmaW5lZCAmJiAoPGFueT5tZXRob2QuY29tcG9uZW50KS5tb2RlbC53cml0ZUFjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kLmlzRXhlY3V0YWJsZS52YWx1ZSA9IHRoaXMuZ2V0RW5hYmxlZFN0YXRlKG1ldGhvZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgZW5hYmxlZCBzdGF0ZSBhY2NvcmRpbmcgdG8gbWV0aG9kIGV4cHJlc3Npb24uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7TWFwcENvY2twaXRDb21wb25lbnRNZXRob2R9IG1ldGhvZFxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kTGlzdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldEVuYWJsZWRTdGF0ZShtZXRob2Q6IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kKTogYm9vbGVhbntcclxuICAgICAgICBsZXQgZXhwcmVzc2lvbiA9IG1ldGhvZC5leHByZXNzaW9uO1xyXG4gICAgICAgIHRoaXMuX3dhdGNoYWJsZVBhcmFtZXRlcnMuZm9yRWFjaCgod2F0Y2hhYmxlKT0+e1xyXG4gICAgICAgICAgICBpZiAobWV0aG9kLmV4cHJlc3Npb24hLmluY2x1ZGVzKHdhdGNoYWJsZS5icm93c2VOYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgZXhwcmVzc2lvbiA9IGV4cHJlc3Npb24hLnJlcGxhY2UobmV3IFJlZ0V4cCh3YXRjaGFibGUuYnJvd3NlTmFtZSwgJ2cnKSwgd2F0Y2hhYmxlLnZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBtYXRoLmV2YWx1YXRlKGV4cHJlc3Npb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWN0aXZhdGVzIHRoZSBtZXRob2QgbGlzdCB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kTGlzdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBhY3RpdmF0ZSgpIHtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc3Bvc2Ugc29tZSBvYmplY3RzIGZyb20gdGhlIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RMaXN0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGRpc3Bvc2UoKXtcclxuICAgICAgICBpZih0aGlzLl90b29sYmFyICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2xiYXIuZGlzcG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlci51bm9ic2VydmVDb21wb25lbnRNb2RlbEl0ZW1zKHRoaXMsdGhpcy5fd2F0Y2hhYmxlUGFyYW1ldGVycyk7XHJcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZHMgdGhlIHN0eWxlcyBmb3IgdGhlIG1ldGhvZCBsaXN0IHRvb2xiYXIgYnV0dG9uc1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RMaXN0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGxvYWRTdHlsZXMoKSB7XHJcbiAgICAgICAgc3VwZXIuYWRkU3R5bGUoXCJ3aWRnZXRzL21ldGhvZExpc3RXaWRnZXQvc3R5bGUvY3NzL21ldGhvZExpc3RUb29sYmFyQnV0dG9uU3R5bGUuY3NzXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgdHJlZSBncmlkIGZvciB0aGUgbWV0aG9kcyBsaXN0XHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kTGlzdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlVHJlZUdyaWQoKSB7XHJcbiAgICAgICAgdmFyIG1ldGhvZHNEYXRhU291cmNlID0gW3t9XTtcclxuXHJcbiAgICAgICAgKDxhbnk+JCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCkpLmVqVHJlZUdyaWQoe1xyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbigpLFxyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkVG9vbGJhclN1cHBvcnQoKSxcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGRhdGFTb3VyY2U6IG1ldGhvZHNEYXRhU291cmNlLFxyXG4gICAgICAgICAgICBlZGl0U2V0dGluZ3M6IHsgYWxsb3dEZWxldGluZyA6IGZhbHNlIH0sXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByb3dTZWxlY3RlZDogKGFyZ3MpID0+IHRoaXMuaGFuZGxlTWV0aG9kTGlzdEl0ZW1TZWxlY3RlZChhcmdzKSxcclxuICAgICAgICAgICAgY3JlYXRlOiAoYXJncykgPT4gdGhpcy50cmVlR3JpZENyZWF0ZWQoKSxcclxuICAgICAgICAgICAgcXVlcnlDZWxsSW5mbzogKGFyZ3MpID0+IHRoaXMuc2hvd01ldGhvZERpc2FibGVkSWZOb3RFeGVjdXRhYmxlKGFyZ3MpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJlZSBncmlkIGNvbHVtbiBkZWZpbml0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RMaXN0V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCk6IHt9e1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNvbHVtbnM6IFtcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwiZGlzcGxheU5hbWVcIiwgaGVhZGVyVGV4dDogXCJDb21tYW5kXCIsIHdpZHRoOiBcIjI1MFwifSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHJlZSBncmlkIHRvb2xiYXIgc2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZExpc3RXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmVlR3JpZFRvb2xiYXJTdXBwb3J0KCk6IHt9e1xyXG4gICAgICAgIGxldCBpbWFnZVByb3ZpZGVyID0gdGhpcy5jb21wb25lbnQuZ2V0U3ViQ29tcG9uZW50KERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5JbWFnZVByb3ZpZGVySWQpIGFzIElJbWFnZVByb3ZpZGVyO1xyXG4gICAgICAgIHRoaXMuX3Rvb2xiYXIgPSBuZXcgTWV0aG9kR3JpZFRvb2xiYXIoaW1hZ2VQcm92aWRlcik7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdG9vbGJhclNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICBzaG93VG9vbGJhcjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGN1c3RvbVRvb2xiYXJJdGVtczogdGhpcy5fdG9vbGJhci5nZXRDdXN0b21Ub29sYmFycyh1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCB0b29sYmFyIGJ1dHRvbnMgd2l0aCBxdWlja0NvbW1hbmRzIGluZm9cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZExpc3RXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRUb29sQmFyQnV0dG9ucygpIHtcclxuICAgICAgICB0aGlzLl90b29sYmFyLnNldFRvb2xCYXJIZWlnaHQoKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3F1aWNrQ29tbWFuZHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9xdWlja0NvbW1hbmRzLmZvckVhY2goKGNvbW1hbmQpPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdG9vbGJhci5hZGRDdXN0b21Ub29sYmFyQnV0dG9ucyhjb21tYW5kLm5hbWUsIGNvbW1hbmQuaW1hZ2VOYW1lKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl90b29sYmFyLmFkZERlZmF1bHRUb29sYmFyQnV0dG9ucygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl90b29sYmFyLnNldEFjdHVhbENvbXBvbmVudE1ldGhvZHModGhpcy5fZXhlY3V0YWJsZU1ldGhvZHMpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIHRyZWVHcmlkQ3JlYXRlZCgpe1xyXG4gICAgICAgIHRoaXMuX3Rvb2xiYXIuaW5pdFRvb2xiYXIodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2hvd01ldGhvZERpc2FibGVkSWZOb3RFeGVjdXRhYmxlKGFyZ3Mpe1xyXG5cclxuICAgICAgICBpZiAoYXJncy5jb2x1bW4uZmllbGQgPT0gXCJkaXNwbGF5TmFtZVwiKXtcclxuICAgICAgICAgICAgaWYoYXJncy5kYXRhLml0ZW0gIT0gdW5kZWZpbmVkICYmIGFyZ3MuZGF0YS5pdGVtLmlzRXhlY3V0YWJsZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgaWYoYXJncy5jZWxsRWxlbWVudC5jbGFzc0xpc3QgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyBTaG93IFJlYWRPbmx5IGNlbGwgd2l0aCBvdGhlciBjb2xvclxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkaXNhYmxlVHJlZUNlbGxDbGFzc05hbWUgPSBcInRyZWVDZWxsRGlzYWJsZWRcIjtcclxuICAgICAgICAgICAgICAgICAgICBpZihhcmdzLmRhdGEuaXRlbS5pc0V4ZWN1dGFibGUudmFsdWUgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLmNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoZGlzYWJsZVRyZWVDZWxsQ2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5jZWxsRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGRpc2FibGVUcmVlQ2VsbENsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgRG9tSGVscGVyLmRpc2FibGVFbGVtZW50KGFyZ3MuY2VsbEVsZW1lbnQsICFhcmdzLmRhdGEuaXRlbS5pc0V4ZWN1dGFibGUudmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdXBkYXRlcyB0aGUgY29tbWFuZHMgZGF0YVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kTGlzdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZU1ldGhvZHNMaXN0KCkge1xyXG4gICAgICAgICg8YW55PiQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpKS5lalRyZWVHcmlkKHtcclxuICAgICAgICAgICAgZGF0YVNvdXJjZTogdGhpcy5fZXhlY3V0YWJsZU1ldGhvZHNcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZpcnN0IHRpbWUgdHJlZWdyaWQgaXMgdXBkYXRlZCwgdG9vbGJhciBidXR0b25zIGFyZSBpbnNlcnRlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kTGlzdFdpZGdldFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZUZpcnN0VGltZU1ldGhvZHNMaXN0KCkge1xyXG4gICAgICAgIHRoaXMuX3Rvb2xiYXIuc2V0QWN0dWFsQ29tcG9uZW50TWV0aG9kcyh0aGlzLl9leGVjdXRhYmxlTWV0aG9kcyk7XHJcbiAgICAgICAgKDxhbnk+JCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCkpLmVqVHJlZUdyaWQoe1xyXG4gICAgICAgICAgICBkYXRhU291cmNlOiB0aGlzLl9leGVjdXRhYmxlTWV0aG9kcyxcclxuICAgICAgICAgICAgdG9vbGJhclNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICBjdXN0b21Ub29sYmFySXRlbXM6IHRoaXMuX3Rvb2xiYXIuZ2V0Q3VzdG9tVG9vbGJhcnModGhpcy5fcXVpY2tDb21tYW5kcylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIGhhbmRsZXMgc2VsZWN0aW9ucyBvZiBtZXRob2QgaXRlbXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZExpc3RXaWRnZXRcclxuICAgICAqL1xyXG4gICAgaGFuZGxlTWV0aG9kTGlzdEl0ZW1TZWxlY3RlZChhcmdzOiBhbnkpOiBhbnkge1xyXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgbWV0aG9kIHBhcmFtZXRlciBsaXN0IGFmdGVyIGEgbWV0aG9kIGhhcyBiZWVuIHNlbGVjdGVkLlxyXG4gICAgICAgIGlmIChhcmdzLmRhdGEuaXRlbSAmJiBhcmdzLmRhdGEuaXRlbSBpbnN0YW5jZW9mIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLm9uU2VsZWN0aW9uQ2hhbmdlZChhcmdzLmRhdGEuaXRlbSBhcyBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25TZWxlY3Rpb25DaGFuZ2VkKG1ldGhvZDogTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QpIHtcclxuICAgICAgICB0aGlzLmV2ZW50U2VsZWN0aW9uQ2hhbmdlZC5yYWlzZShudWxsLCBtZXRob2QpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBNZXRob2RMaXN0V2lkZ2V0IH07Il19