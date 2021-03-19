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
define(["require", "exports", "./defaultComponentSettings", "../common/treeGridWidgetBase"], function (require, exports, defaultComponentSettings_1, treeGridWidgetBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * implements the dummy widget
     *
     * @class DummyWidget
     * @extends {WidgetBase}
     */
    var DummyWidget = /** @class */ (function (_super) {
        __extends(DummyWidget, _super);
        function DummyWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // Event handlers
            _this._contentActivatedHandler = function (sender, args) { return _this.onLayoutContentActivated(sender, args); };
            return _this;
            /**
             * resizes the trace configuration widget
             *
             * @param {number} width
             * @param {number} height
             * @memberof TraceConfigurationWidget
             */
            /*resize(width: number, height: number){
                this._actualWidth = width;
                this._actualHeight = height;
                
                if(this._layoutWidget != undefined){
                    this._layoutWidget!.resize(width, height);
                }
            }*/
            /**
             * Creates the widget content and eventually subwidgets
             *
             * @param {string} layoutContainerId
             * @memberof DummyWidget
             */
            /*createLayout() {
                this.createDummyData();
            }
        
            resize(width: number, height: number){
        
                $(this.cssParentContentId)[0].style.width = width.toString() + "px";
                $(this.cssParentContentId)[0].style.height = height.toString() + "px";
            }
        
            private createDummyData() {
        
                $(this.cssParentContentId).append("Dummy widget");
                $(this.cssParentContentId)[0].style.background = ColorHelper.getColor();
                $(this.cssParentContentId)[0].style.overflow = "hidden";
            }*/
        }
        /**  initialize the widget
         *
         * @param {string} layoutContainerId
         * @memberof DummyWidget
         */
        DummyWidget.prototype.initialize = function (layoutContainerId) {
            _super.prototype.initialize.call(this, layoutContainerId);
        };
        DummyWidget.prototype.initializeComponent = function () {
            this.component.defaultSettingsDataId = defaultComponentSettings_1.DefaultComponentSettings.WidgetDefinitionId;
        };
        /**
         * Returns the default component settings for this widget
         *
         * @returns {*}
         * @memberof DummyWidget
         */
        DummyWidget.prototype.getDefaultComponentSettings = function () {
            return defaultComponentSettings_1.DefaultComponentSettings.getDummyWidgetDefinition();
        };
        /**
         * Adds some default persisting data packages in the main default persisting data provider
         *
         * @private
         * @memberof ChartViewWidget
         */
        DummyWidget.prototype.addAdditionalDefaultComponentSettings = function () {
            // add default persisting definitions
            //this.addDefaultComponentSettingsToProvider(DefaultComponentSettings.DummySplitterDefinitionId, DefaultComponentSettings.getDummySplitterDefinition());
        };
        /**
         * Sets the widget content and eventually subwidgets
         *
         * @memberof DummyWidget
         */
        DummyWidget.prototype.initialized = function () {
            /*this._layoutWidget = this.component.getSubComponent(DefaultComponentSettings.mainWidgetId);
    
            this._layoutWidget!.initialize(this.parentContentId);
            this._layoutWidget!.eventWidgetActivated.attach(this._contentActivatedHandler);*/
        };
        /**
         * Disposes the dummy widget
         *
         * @returns {*}
         * @memberof DummyWidget
         */
        DummyWidget.prototype.dispose = function () {
            /* this._layoutWidget!.eventWidgetActivated.detach(this._contentActivatedHandler);
             this._layoutWidget!.dispose();*/
            _super.prototype.dispose.call(this);
        };
        DummyWidget.prototype.getDataSource = function () {
            var dataSource = new Array();
            var record1 = this.getRecord("45", "PLK[0]", "1", "ncMODULE 1", "CMD_Simulation = 1", "3998.043", "req");
            var record2 = this.getRecord("46", "PLK[0]", "1", "", "", "3998.052", "res");
            var record3 = this.getRecord("47", "PLK[0]", "1", "ncAXIS 1", "McAcpDrv = PAR_LIST_WRITE", "3998.044", "info");
            dataSource.push(record1);
            dataSource.push(record2);
            dataSource.push(record3);
            return dataSource;
        };
        DummyWidget.prototype.getRecord = function (index, interfaceName, node, ncObject, description, time, type) {
            if (type == "res") {
                return { resIndex: index, interface: interfaceName, node: node, ncObject: ncObject, res: description, resTime: time };
            }
            else {
                return { reqIndex: index, interface: interfaceName, node: node, ncObject: ncObject, req: description, reqTime: time };
            }
        };
        DummyWidget.prototype.createTreeGrid = function () {
            var dataSource = this.getDataSource();
            $(this.cssParentContentId).ejTreeGrid(__assign(__assign({}, this.getTreeGridColumnDefinition()), { dataSource: dataSource, editSettings: { allowDeleting: false } }));
        };
        DummyWidget.prototype.getTreeGridColumnDefinition = function () {
            return {
                columns: [
                    { field: "reqIndex", headerText: "Index", width: "100" },
                    { field: "interface", headerText: "Interface", width: "100" },
                    { field: "node", headerText: "Node", width: "100" },
                    { field: "ncObject", headerText: "NC Object", width: "100" },
                    { field: "req", headerText: "Request", width: "200" },
                    { field: "reqTime", headerText: "Time [s]", width: "100" },
                    { field: "resTime", headerText: "Time [s]", width: "100" },
                    { field: "res", headerText: "Response", width: "200" },
                    { field: "resIndex", headerText: "Index", width: "100" },
                ],
            };
        };
        /**
         * Raised after a layout content was activated
         *
         * @private
         * @param {*} sender
         * @param {*} args
         * @memberof DummyWidget
         */
        DummyWidget.prototype.onLayoutContentActivated = function (sender, args) {
            args.widget.activate();
            this.resize(this._actualWidth, this._actualHeight);
        };
        return DummyWidget;
    }(treeGridWidgetBase_1.TreeGridWidgetBase));
    exports.DummyWidget = DummyWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHVtbXlXaWRnZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvZHVtbXlXaWRnZXQvZHVtbXlXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBUUE7Ozs7O09BS0c7SUFDSDtRQUEwQiwrQkFBa0I7UUFBNUM7WUFBQSxxRUFrS0M7WUFoS0csaUJBQWlCO1lBQ1QsOEJBQXdCLEdBQUcsVUFBQyxNQUFNLEVBQUUsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBM0MsQ0FBMkMsQ0FBQzs7WUF5SGpHOzs7Ozs7ZUFNRztZQUNIOzs7Ozs7O2VBT0c7WUFFSDs7Ozs7ZUFLRztZQUNIOzs7Ozs7Ozs7Ozs7Ozs7ZUFlRztRQUNQLENBQUM7UUE3Skc7Ozs7V0FJRztRQUNILGdDQUFVLEdBQVYsVUFBVyxpQkFBeUI7WUFDaEMsaUJBQU0sVUFBVSxZQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDeEMsQ0FBQztRQUVELHlDQUFtQixHQUFuQjtZQUNJLElBQUksQ0FBQyxTQUFTLENBQUMscUJBQXFCLEdBQUcsbURBQXdCLENBQUMsa0JBQWtCLENBQUM7UUFDdkYsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gsaURBQTJCLEdBQTNCO1lBQ0ksT0FBTyxtREFBd0IsQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1FBQy9ELENBQUM7UUFFRDs7Ozs7V0FLRztRQUNILDJEQUFxQyxHQUFyQztZQUNJLHFDQUFxQztZQUNyQyx3SkFBd0o7UUFDNUosQ0FBQztRQUVEOzs7O1dBSUc7UUFDSCxpQ0FBVyxHQUFYO1lBQ0k7Ozs2RkFHaUY7UUFDckYsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gsNkJBQU8sR0FBUDtZQUNHOzZDQUNpQztZQUNoQyxpQkFBTSxPQUFPLFdBQUUsQ0FBQztRQUNwQixDQUFDO1FBRU8sbUNB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LEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBQztvQkFDckQsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBQztpQkFDMUQ7YUFDSixDQUFDO1FBQ04sQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSyw4Q0FBd0IsR0FBaEMsVUFBaUMsTUFBTSxFQUFFLElBQUk7WUFDekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3ZELENBQUM7UUF3Q0wsa0JBQUM7SUFBRCxDQUFDLEFBbEtELENBQTBCLHVDQUFrQixHQWtLM0M7SUFFUSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbIi8vaW1wb3J0IHsgV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vd2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBJRHVtbXlXaWRnZXQgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL2R1bW15V2lkZ2V0SW50ZXJmYWNlXCI7XHJcbi8vaW1wb3J0IHsgQ29sb3JIZWxwZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbG9ySGVscGVyXCI7XHJcbmltcG9ydCB7IERlZmF1bHRDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuL2RlZmF1bHRDb21wb25lbnRTZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBMYXlvdXRXaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi9sYXlvdXRXaWRnZXRCYXNlXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCB7IFRyZWVHcmlkV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vdHJlZUdyaWRXaWRnZXRCYXNlXCI7XHJcblxyXG4vKipcclxuICogaW1wbGVtZW50cyB0aGUgZHVtbXkgd2lkZ2V0XHJcbiAqXHJcbiAqIEBjbGFzcyBEdW1teVdpZGdldFxyXG4gKiBAZXh0ZW5kcyB7V2lkZ2V0QmFzZX1cclxuICovXHJcbmNsYXNzIER1bW15V2lkZ2V0IGV4dGVuZHMgVHJlZUdyaWRXaWRnZXRCYXNlIGltcGxlbWVudHMgSUR1bW15V2lkZ2V0IHtcclxuXHJcbiAgICAvLyBFdmVudCBoYW5kbGVyc1xyXG4gICAgcHJpdmF0ZSBfY29udGVudEFjdGl2YXRlZEhhbmRsZXIgPSAoc2VuZGVyLCBhcmdzKSA9PiB0aGlzLm9uTGF5b3V0Q29udGVudEFjdGl2YXRlZChzZW5kZXIsIGFyZ3MpO1xyXG5cclxuICAgIC8qKiAgaW5pdGlhbGl6ZSB0aGUgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxheW91dENvbnRhaW5lcklkXHJcbiAgICAgKiBAbWVtYmVyb2YgRHVtbXlXaWRnZXRcclxuICAgICAqL1xyXG4gICAgaW5pdGlhbGl6ZShsYXlvdXRDb250YWluZXJJZDogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZShsYXlvdXRDb250YWluZXJJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZUNvbXBvbmVudCgpe1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmRlZmF1bHRTZXR0aW5nc0RhdGFJZCA9IERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5XaWRnZXREZWZpbml0aW9uSWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IGNvbXBvbmVudCBzZXR0aW5ncyBmb3IgdGhpcyB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBEdW1teVdpZGdldFxyXG4gICAgICovXHJcbiAgICBnZXREZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MoKTogQ29tcG9uZW50U2V0dGluZ3N7XHJcbiAgICAgICAgcmV0dXJuIERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5nZXREdW1teVdpZGdldERlZmluaXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgc29tZSBkZWZhdWx0IHBlcnNpc3RpbmcgZGF0YSBwYWNrYWdlcyBpbiB0aGUgbWFpbiBkZWZhdWx0IHBlcnNpc3RpbmcgZGF0YSBwcm92aWRlclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGFkZEFkZGl0aW9uYWxEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MoKXtcclxuICAgICAgICAvLyBhZGQgZGVmYXVsdCBwZXJzaXN0aW5nIGRlZmluaXRpb25zXHJcbiAgICAgICAgLy90aGlzLmFkZERlZmF1bHRDb21wb25lbnRTZXR0aW5nc1RvUHJvdmlkZXIoRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLkR1bW15U3BsaXR0ZXJEZWZpbml0aW9uSWQsIERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5nZXREdW1teVNwbGl0dGVyRGVmaW5pdGlvbigpKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSB3aWRnZXQgY29udGVudCBhbmQgZXZlbnR1YWxseSBzdWJ3aWRnZXRzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIER1bW15V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGluaXRpYWxpemVkKCkge1xyXG4gICAgICAgIC8qdGhpcy5fbGF5b3V0V2lkZ2V0ID0gdGhpcy5jb21wb25lbnQuZ2V0U3ViQ29tcG9uZW50KERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5tYWluV2lkZ2V0SWQpO1xyXG5cclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQhLmluaXRpYWxpemUodGhpcy5wYXJlbnRDb250ZW50SWQpO1xyXG4gICAgICAgIHRoaXMuX2xheW91dFdpZGdldCEuZXZlbnRXaWRnZXRBY3RpdmF0ZWQuYXR0YWNoKHRoaXMuX2NvbnRlbnRBY3RpdmF0ZWRIYW5kbGVyKTsqL1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzcG9zZXMgdGhlIGR1bW15IHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIER1bW15V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGRpc3Bvc2UoKXtcclxuICAgICAgIC8qIHRoaXMuX2xheW91dFdpZGdldCEuZXZlbnRXaWRnZXRBY3RpdmF0ZWQuZGV0YWNoKHRoaXMuX2NvbnRlbnRBY3RpdmF0ZWRIYW5kbGVyKTtcclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQhLmRpc3Bvc2UoKTsqL1xyXG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldERhdGFTb3VyY2UoKXtcclxuICAgICAgICBsZXQgZGF0YVNvdXJjZSA9IG5ldyBBcnJheTxhbnk+KCk7XHJcbiAgICAgICAgbGV0IHJlY29yZDEgPSB0aGlzLmdldFJlY29yZChcIjQ1XCIsIFwiUExLWzBdXCIsIFwiMVwiLCBcIm5jTU9EVUxFIDFcIiwgXCJDTURfU2ltdWxhdGlvbiA9IDFcIiwgXCIzOTk4LjA0M1wiLCBcInJlcVwiKTtcclxuICAgICAgICBsZXQgcmVjb3JkMj0gdGhpcy5nZXRSZWNvcmQoXCI0NlwiLCBcIlBMS1swXVwiLCBcIjFcIiwgXCJcIiwgXCJcIiwgXCIzOTk4LjA1MlwiLCBcInJlc1wiKTtcclxuICAgICAgICBsZXQgcmVjb3JkMz0gdGhpcy5nZXRSZWNvcmQoXCI0N1wiLCBcIlBMS1swXVwiLCBcIjFcIiwgXCJuY0FYSVMgMVwiLCBcIk1jQWNwRHJ2ID0gUEFSX0xJU1RfV1JJVEVcIiwgXCIzOTk4LjA0NFwiLCBcImluZm9cIik7XHJcbiAgICAgICAgZGF0YVNvdXJjZS5wdXNoKHJlY29yZDEpO1xyXG4gICAgICAgIGRhdGFTb3VyY2UucHVzaChyZWNvcmQyKTtcclxuICAgICAgICBkYXRhU291cmNlLnB1c2gocmVjb3JkMyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGRhdGFTb3VyY2U7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGdldFJlY29yZChpbmRleCwgaW50ZXJmYWNlTmFtZSwgbm9kZSwgbmNPYmplY3QsIGRlc2NyaXB0aW9uLCB0aW1lLCB0eXBlKXtcclxuXHJcbiAgICAgICAgaWYodHlwZSA9PSBcInJlc1wiKXtcclxuICAgICAgICAgICAgcmV0dXJuIHtyZXNJbmRleDogaW5kZXgsIGludGVyZmFjZTogaW50ZXJmYWNlTmFtZSwgbm9kZTogbm9kZSwgbmNPYmplY3Q6IG5jT2JqZWN0LCByZXM6IGRlc2NyaXB0aW9uLCByZXNUaW1lOiB0aW1lfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIHtyZXFJbmRleDogaW5kZXgsIGludGVyZmFjZTogaW50ZXJmYWNlTmFtZSwgbm9kZTogbm9kZSwgbmNPYmplY3Q6IG5jT2JqZWN0LCByZXE6IGRlc2NyaXB0aW9uLCByZXFUaW1lOiB0aW1lfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZVRyZWVHcmlkKCkge1xyXG4gICAgICAgIHZhciBkYXRhU291cmNlID0gdGhpcy5nZXREYXRhU291cmNlKCk7XHJcblxyXG4gICAgICAgICg8YW55PiQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpKS5lalRyZWVHcmlkKHtcclxuICAgICAgICAgICAgLi4udGhpcy5nZXRUcmVlR3JpZENvbHVtbkRlZmluaXRpb24oKSxcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGRhdGFTb3VyY2U6IGRhdGFTb3VyY2UsXHJcbiAgICAgICAgICAgIGVkaXRTZXR0aW5nczogeyBhbGxvd0RlbGV0aW5nIDogZmFsc2UgfSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbigpOiB7fXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjb2x1bW5zOiBbXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcInJlcUluZGV4XCIsIGhlYWRlclRleHQ6IFwiSW5kZXhcIiwgd2lkdGg6IFwiMTAwXCJ9LFxyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJpbnRlcmZhY2VcIiwgaGVhZGVyVGV4dDogXCJJbnRlcmZhY2VcIiwgd2lkdGg6IFwiMTAwXCJ9LFxyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJub2RlXCIsIGhlYWRlclRleHQ6IFwiTm9kZVwiLCB3aWR0aDogXCIxMDBcIn0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcIm5jT2JqZWN0XCIsIGhlYWRlclRleHQ6IFwiTkMgT2JqZWN0XCIsIHdpZHRoOiBcIjEwMFwifSxcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwicmVxXCIsIGhlYWRlclRleHQ6IFwiUmVxdWVzdFwiLCB3aWR0aDogXCIyMDBcIn0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcInJlcVRpbWVcIiwgaGVhZGVyVGV4dDogXCJUaW1lIFtzXVwiLCB3aWR0aDogXCIxMDBcIn0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcInJlc1RpbWVcIiwgaGVhZGVyVGV4dDogXCJUaW1lIFtzXVwiLCB3aWR0aDogXCIxMDBcIn0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcInJlc1wiLCBoZWFkZXJUZXh0OiBcIlJlc3BvbnNlXCIsIHdpZHRoOiBcIjIwMFwifSxcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwicmVzSW5kZXhcIiwgaGVhZGVyVGV4dDogXCJJbmRleFwiLCB3aWR0aDogXCIxMDBcIn0sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJhaXNlZCBhZnRlciBhIGxheW91dCBjb250ZW50IHdhcyBhY3RpdmF0ZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIER1bW15V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25MYXlvdXRDb250ZW50QWN0aXZhdGVkKHNlbmRlciwgYXJncykge1xyXG4gICAgICAgIGFyZ3Mud2lkZ2V0LmFjdGl2YXRlKCk7XHJcbiAgICAgICAgdGhpcy5yZXNpemUodGhpcy5fYWN0dWFsV2lkdGgsIHRoaXMuX2FjdHVhbEhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFxyXG4gICAgICogcmVzaXplcyB0aGUgdHJhY2UgY29uZmlndXJhdGlvbiB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gd2lkdGhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcclxuICAgICAqIEBtZW1iZXJvZiBUcmFjZUNvbmZpZ3VyYXRpb25XaWRnZXRcclxuICAgICAqL1xyXG4gICAgLypyZXNpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuX2FjdHVhbFdpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5fYWN0dWFsSGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuX2xheW91dFdpZGdldCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQhLnJlc2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICB9Ki9cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIHdpZGdldCBjb250ZW50IGFuZCBldmVudHVhbGx5IHN1YndpZGdldHNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGF5b3V0Q29udGFpbmVySWRcclxuICAgICAqIEBtZW1iZXJvZiBEdW1teVdpZGdldFxyXG4gICAgICovXHJcbiAgICAvKmNyZWF0ZUxheW91dCgpIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZUR1bW15RGF0YSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc2l6ZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcil7XHJcblxyXG4gICAgICAgICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpWzBdLnN0eWxlLndpZHRoID0gd2lkdGgudG9TdHJpbmcoKSArIFwicHhcIjtcclxuICAgICAgICAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKVswXS5zdHlsZS5oZWlnaHQgPSBoZWlnaHQudG9TdHJpbmcoKSArIFwicHhcIjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNyZWF0ZUR1bW15RGF0YSgpIHtcclxuXHJcbiAgICAgICAgJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCkuYXBwZW5kKFwiRHVtbXkgd2lkZ2V0XCIpO1xyXG4gICAgICAgICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpWzBdLnN0eWxlLmJhY2tncm91bmQgPSBDb2xvckhlbHBlci5nZXRDb2xvcigpO1xyXG4gICAgICAgICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpWzBdLnN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIjtcclxuICAgIH0qL1xyXG59XHJcblxyXG5leHBvcnQgeyBEdW1teVdpZGdldCB9OyJdfQ==