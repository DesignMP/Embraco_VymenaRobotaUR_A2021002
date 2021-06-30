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
        DummyWidget.prototype.initializeComponent = function () {
            this.component.defaultSettingsDataId = defaultComponentSettings_1.DefaultComponentSettings.WidgetDefinitionId;
        };
        /**
         * Returns the default component settings for this widget
         *
         * @returns {(ComponentSettings|undefined)}
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
            _super.prototype.initialized.call(this);
            /*
            this._layoutWidget = this.component.getSubComponent(DefaultComponentSettings.mainWidgetId);
    
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHVtbXlXaWRnZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvZHVtbXlXaWRnZXQvZHVtbXlXaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBUUE7Ozs7O09BS0c7SUFDSDtRQUEwQiwrQkFBa0I7UUFBNUM7WUFBQSxxRUEySkM7WUF6SkcsaUJBQWlCO1lBQ1QsOEJBQXdCLEdBQUcsVUFBQyxNQUFNLEVBQUUsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBM0MsQ0FBMkMsQ0FBQzs7WUFrSGpHOzs7Ozs7ZUFNRztZQUNIOzs7Ozs7O2VBT0c7WUFFSDs7Ozs7ZUFLRztZQUNIOzs7Ozs7Ozs7Ozs7Ozs7ZUFlRztRQUNQLENBQUM7UUF0SkcseUNBQW1CLEdBQW5CO1lBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsR0FBRyxtREFBd0IsQ0FBQyxrQkFBa0IsQ0FBQztRQUN2RixDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSCxpREFBMkIsR0FBM0I7WUFDSSxPQUFPLG1EQUF3QixDQUFDLHdCQUF3QixFQUFFLENBQUM7UUFDL0QsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gsMkRBQXFDLEdBQXJDO1lBQ0kscUNBQXFDO1lBQ3JDLHdKQUF3SjtRQUM1SixDQUFDO1FBRUQ7Ozs7V0FJRztRQUNILGlDQUFXLEdBQVg7WUFDSSxpQkFBTSxXQUFXLFdBQUUsQ0FBQztZQUNwQjs7Ozs2RkFJaUY7UUFDckYsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gsNkJBQU8sR0FBUDtZQUNHOzZDQUNpQztZQUNoQyxpQkFBTSxPQUFPLFdBQUUsQ0FBQztRQUNwQixDQUFDO1FBRU8sbUNBQWEsR0FBckI7WUFDSSxJQUFJLFVBQVUsR0FBRyxJQUFJLEtBQUssRUFBTyxDQUFDO1lBQ2xDLElBQUksT0FB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RUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBQztpQkFDMUQ7YUFDSixDQUFDO1FBQ04sQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSyw4Q0FBd0IsR0FBaEMsVUFBaUMsTUFBTSxFQUFFLElBQUk7WUFDekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3ZELENBQUM7UUF3Q0wsa0JBQUM7SUFBRCxDQUFDLEFBM0pELENBQTBCLHVDQUFrQixHQTJKM0M7SUFFUSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbIi8vaW1wb3J0IHsgV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vd2lkZ2V0QmFzZVwiO1xyXG5pbXBvcnQgeyBJRHVtbXlXaWRnZXQgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL2R1bW15V2lkZ2V0SW50ZXJmYWNlXCI7XHJcbi8vaW1wb3J0IHsgQ29sb3JIZWxwZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbG9ySGVscGVyXCI7XHJcbmltcG9ydCB7IERlZmF1bHRDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuL2RlZmF1bHRDb21wb25lbnRTZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBMYXlvdXRXaWRnZXRCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi9sYXlvdXRXaWRnZXRCYXNlXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCB7IFRyZWVHcmlkV2lkZ2V0QmFzZSB9IGZyb20gXCIuLi9jb21tb24vdHJlZUdyaWRXaWRnZXRCYXNlXCI7XHJcblxyXG4vKipcclxuICogaW1wbGVtZW50cyB0aGUgZHVtbXkgd2lkZ2V0XHJcbiAqXHJcbiAqIEBjbGFzcyBEdW1teVdpZGdldFxyXG4gKiBAZXh0ZW5kcyB7V2lkZ2V0QmFzZX1cclxuICovXHJcbmNsYXNzIER1bW15V2lkZ2V0IGV4dGVuZHMgVHJlZUdyaWRXaWRnZXRCYXNlIGltcGxlbWVudHMgSUR1bW15V2lkZ2V0IHtcclxuXHJcbiAgICAvLyBFdmVudCBoYW5kbGVyc1xyXG4gICAgcHJpdmF0ZSBfY29udGVudEFjdGl2YXRlZEhhbmRsZXIgPSAoc2VuZGVyLCBhcmdzKSA9PiB0aGlzLm9uTGF5b3V0Q29udGVudEFjdGl2YXRlZChzZW5kZXIsIGFyZ3MpO1xyXG5cclxuICAgIGluaXRpYWxpemVDb21wb25lbnQoKXtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5kZWZhdWx0U2V0dGluZ3NEYXRhSWQgPSBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuV2lkZ2V0RGVmaW5pdGlvbklkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBjb21wb25lbnQgc2V0dGluZ3MgZm9yIHRoaXMgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyhDb21wb25lbnRTZXR0aW5nc3x1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIER1bW15V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGdldERlZmF1bHRDb21wb25lbnRTZXR0aW5ncygpOiBDb21wb25lbnRTZXR0aW5nc3x1bmRlZmluZWR7XHJcbiAgICAgICAgcmV0dXJuIERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5nZXREdW1teVdpZGdldERlZmluaXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgc29tZSBkZWZhdWx0IHBlcnNpc3RpbmcgZGF0YSBwYWNrYWdlcyBpbiB0aGUgbWFpbiBkZWZhdWx0IHBlcnNpc3RpbmcgZGF0YSBwcm92aWRlclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2hhcnRWaWV3V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGFkZEFkZGl0aW9uYWxEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MoKXtcclxuICAgICAgICAvLyBhZGQgZGVmYXVsdCBwZXJzaXN0aW5nIGRlZmluaXRpb25zXHJcbiAgICAgICAgLy90aGlzLmFkZERlZmF1bHRDb21wb25lbnRTZXR0aW5nc1RvUHJvdmlkZXIoRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLkR1bW15U3BsaXR0ZXJEZWZpbml0aW9uSWQsIERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5nZXREdW1teVNwbGl0dGVyRGVmaW5pdGlvbigpKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSB3aWRnZXQgY29udGVudCBhbmQgZXZlbnR1YWxseSBzdWJ3aWRnZXRzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIER1bW15V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGluaXRpYWxpemVkKCkge1xyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemVkKCk7XHJcbiAgICAgICAgLypcclxuICAgICAgICB0aGlzLl9sYXlvdXRXaWRnZXQgPSB0aGlzLmNvbXBvbmVudC5nZXRTdWJDb21wb25lbnQoRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLm1haW5XaWRnZXRJZCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2xheW91dFdpZGdldCEuaW5pdGlhbGl6ZSh0aGlzLnBhcmVudENvbnRlbnRJZCk7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0V2lkZ2V0IS5ldmVudFdpZGdldEFjdGl2YXRlZC5hdHRhY2godGhpcy5fY29udGVudEFjdGl2YXRlZEhhbmRsZXIpOyovXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNwb3NlcyB0aGUgZHVtbXkgd2lkZ2V0XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgRHVtbXlXaWRnZXRcclxuICAgICAqL1xyXG4gICAgZGlzcG9zZSgpe1xyXG4gICAgICAgLyogdGhpcy5fbGF5b3V0V2lkZ2V0IS5ldmVudFdpZGdldEFjdGl2YXRlZC5kZXRhY2godGhpcy5fY29udGVudEFjdGl2YXRlZEhhbmRsZXIpO1xyXG4gICAgICAgIHRoaXMuX2xheW91dFdpZGdldCEuZGlzcG9zZSgpOyovXHJcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0RGF0YVNvdXJjZSgpe1xyXG4gICAgICAgIGxldCBkYXRhU291cmNlID0gbmV3IEFycmF5PGFueT4oKTtcclxuICAgICAgICBsZXQgcmVjb3JkMSA9IHRoaXMuZ2V0UmVjb3JkKFwiNDVcIiwgXCJQTEtbMF1cIiwgXCIxXCIsIFwibmNNT0RVTEUgMVwiLCBcIkNNRF9TaW11bGF0aW9uID0gMVwiLCBcIjM5OTguMDQzXCIsIFwicmVxXCIpO1xyXG4gICAgICAgIGxldCByZWNvcmQyPSB0aGlzLmdldFJlY29yZChcIjQ2XCIsIFwiUExLWzBdXCIsIFwiMVwiLCBcIlwiLCBcIlwiLCBcIjM5OTguMDUyXCIsIFwicmVzXCIpO1xyXG4gICAgICAgIGxldCByZWNvcmQzPSB0aGlzLmdldFJlY29yZChcIjQ3XCIsIFwiUExLWzBdXCIsIFwiMVwiLCBcIm5jQVhJUyAxXCIsIFwiTWNBY3BEcnYgPSBQQVJfTElTVF9XUklURVwiLCBcIjM5OTguMDQ0XCIsIFwiaW5mb1wiKTtcclxuICAgICAgICBkYXRhU291cmNlLnB1c2gocmVjb3JkMSk7XHJcbiAgICAgICAgZGF0YVNvdXJjZS5wdXNoKHJlY29yZDIpO1xyXG4gICAgICAgIGRhdGFTb3VyY2UucHVzaChyZWNvcmQzKTtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gZGF0YVNvdXJjZTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgZ2V0UmVjb3JkKGluZGV4LCBpbnRlcmZhY2VOYW1lLCBub2RlLCBuY09iamVjdCwgZGVzY3JpcHRpb24sIHRpbWUsIHR5cGUpe1xyXG5cclxuICAgICAgICBpZih0eXBlID09IFwicmVzXCIpe1xyXG4gICAgICAgICAgICByZXR1cm4ge3Jlc0luZGV4OiBpbmRleCwgaW50ZXJmYWNlOiBpbnRlcmZhY2VOYW1lLCBub2RlOiBub2RlLCBuY09iamVjdDogbmNPYmplY3QsIHJlczogZGVzY3JpcHRpb24sIHJlc1RpbWU6IHRpbWV9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICByZXR1cm4ge3JlcUluZGV4OiBpbmRleCwgaW50ZXJmYWNlOiBpbnRlcmZhY2VOYW1lLCBub2RlOiBub2RlLCBuY09iamVjdDogbmNPYmplY3QsIHJlcTogZGVzY3JpcHRpb24sIHJlcVRpbWU6IHRpbWV9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlVHJlZUdyaWQoKSB7XHJcbiAgICAgICAgdmFyIGRhdGFTb3VyY2UgPSB0aGlzLmdldERhdGFTb3VyY2UoKTtcclxuXHJcbiAgICAgICAgKDxhbnk+JCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCkpLmVqVHJlZUdyaWQoe1xyXG4gICAgICAgICAgICAuLi50aGlzLmdldFRyZWVHcmlkQ29sdW1uRGVmaW5pdGlvbigpLFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZGF0YVNvdXJjZTogZGF0YVNvdXJjZSxcclxuICAgICAgICAgICAgZWRpdFNldHRpbmdzOiB7IGFsbG93RGVsZXRpbmcgOiBmYWxzZSB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0VHJlZUdyaWRDb2x1bW5EZWZpbml0aW9uKCk6IHt9e1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNvbHVtbnM6IFtcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwicmVxSW5kZXhcIiwgaGVhZGVyVGV4dDogXCJJbmRleFwiLCB3aWR0aDogXCIxMDBcIn0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcImludGVyZmFjZVwiLCBoZWFkZXJUZXh0OiBcIkludGVyZmFjZVwiLCB3aWR0aDogXCIxMDBcIn0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcIm5vZGVcIiwgaGVhZGVyVGV4dDogXCJOb2RlXCIsIHdpZHRoOiBcIjEwMFwifSxcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwibmNPYmplY3RcIiwgaGVhZGVyVGV4dDogXCJOQyBPYmplY3RcIiwgd2lkdGg6IFwiMTAwXCJ9LFxyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJyZXFcIiwgaGVhZGVyVGV4dDogXCJSZXF1ZXN0XCIsIHdpZHRoOiBcIjIwMFwifSxcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwicmVxVGltZVwiLCBoZWFkZXJUZXh0OiBcIlRpbWUgW3NdXCIsIHdpZHRoOiBcIjEwMFwifSxcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwicmVzVGltZVwiLCBoZWFkZXJUZXh0OiBcIlRpbWUgW3NdXCIsIHdpZHRoOiBcIjEwMFwifSxcclxuICAgICAgICAgICAgICAgIHsgZmllbGQ6IFwicmVzXCIsIGhlYWRlclRleHQ6IFwiUmVzcG9uc2VcIiwgd2lkdGg6IFwiMjAwXCJ9LFxyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJyZXNJbmRleFwiLCBoZWFkZXJUZXh0OiBcIkluZGV4XCIsIHdpZHRoOiBcIjEwMFwifSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmFpc2VkIGFmdGVyIGEgbGF5b3V0IGNvbnRlbnQgd2FzIGFjdGl2YXRlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgRHVtbXlXaWRnZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbkxheW91dENvbnRlbnRBY3RpdmF0ZWQoc2VuZGVyLCBhcmdzKSB7XHJcbiAgICAgICAgYXJncy53aWRnZXQuYWN0aXZhdGUoKTtcclxuICAgICAgICB0aGlzLnJlc2l6ZSh0aGlzLl9hY3R1YWxXaWR0aCwgdGhpcy5fYWN0dWFsSGVpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogXHJcbiAgICAgKiByZXNpemVzIHRoZSB0cmFjZSBjb25maWd1cmF0aW9uIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodFxyXG4gICAgICogQG1lbWJlcm9mIFRyYWNlQ29uZmlndXJhdGlvbldpZGdldFxyXG4gICAgICovXHJcbiAgICAvKnJlc2l6ZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcil7XHJcbiAgICAgICAgdGhpcy5fYWN0dWFsV2lkdGggPSB3aWR0aDtcclxuICAgICAgICB0aGlzLl9hY3R1YWxIZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5fbGF5b3V0V2lkZ2V0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2xheW91dFdpZGdldCEucmVzaXplKHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgIH0qL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgd2lkZ2V0IGNvbnRlbnQgYW5kIGV2ZW50dWFsbHkgc3Vid2lkZ2V0c1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYXlvdXRDb250YWluZXJJZFxyXG4gICAgICogQG1lbWJlcm9mIER1bW15V2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIC8qY3JlYXRlTGF5b3V0KCkge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlRHVtbXlEYXRhKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzaXplKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKXtcclxuXHJcbiAgICAgICAgJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZClbMF0uc3R5bGUud2lkdGggPSB3aWR0aC50b1N0cmluZygpICsgXCJweFwiO1xyXG4gICAgICAgICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpWzBdLnN0eWxlLmhlaWdodCA9IGhlaWdodC50b1N0cmluZygpICsgXCJweFwiO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3JlYXRlRHVtbXlEYXRhKCkge1xyXG5cclxuICAgICAgICAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKS5hcHBlbmQoXCJEdW1teSB3aWRnZXRcIik7XHJcbiAgICAgICAgJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZClbMF0uc3R5bGUuYmFja2dyb3VuZCA9IENvbG9ySGVscGVyLmdldENvbG9yKCk7XHJcbiAgICAgICAgJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZClbMF0uc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xyXG4gICAgfSovXHJcbn1cclxuXHJcbmV4cG9ydCB7IER1bW15V2lkZ2V0IH07Il19