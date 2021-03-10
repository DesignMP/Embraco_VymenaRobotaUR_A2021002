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
define(["require", "exports", "../../common/treeGridParameterTypeEditorBase"], function (require, exports, treeGridParameterTypeEditorBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CmTreeGridCellEditTemplate = /** @class */ (function (_super) {
        __extends(CmTreeGridCellEditTemplate, _super);
        function CmTreeGridCellEditTemplate() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * handle creating the cell edit template
             *
             * @returns
             * @memberof CmTreeGridCellEditTemplate
             */
            _this.create = function () { return _this.getEditInputTemplate(); };
            /**
             * handles reading parameter values
             *
             * @param {*} args
             * @memberof CmTreeGridCellEditTemplate
             */
            _this.read = function (args) { return _this.endCellEdit(args); };
            /**
             * handles writing parameter values
             *
             * @memberof CmTreeGridCellEditTemplate
             */
            _this.write = function (args) {
                var componentParameter = args.rowdata.element.componentParameter;
                var values = undefined;
                if (componentParameter.enumType.values != undefined) {
                    values = componentParameter.enumType.values.map(function (value) { return value; });
                }
                var cellInfo = { values: values, dataTypeName: componentParameter.dataType.name };
                return _this.beginCellEdit(args, args.rowdata.displayValue, cellInfo);
            };
            return _this;
        }
        /**
         * creates an instance
         *
         * @static
         * @returns {*}
         * @memberof CmTreeGridCellEditTemplate
         */
        CmTreeGridCellEditTemplate.createInstance = function () {
            return new CmTreeGridCellEditTemplate();
        };
        return CmTreeGridCellEditTemplate;
    }(treeGridParameterTypeEditorBase_1.TreeGridParameterTypeEditorBase));
    exports.CmTreeGridCellEditTemplate = CmTreeGridCellEditTemplate;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY21UcmVlR3JpZENlbGxFZGl0VGVtcGxhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY29uZmlnTWFuYWdlcldpZGdldC92aWV3L2NtVHJlZUdyaWRDZWxsRWRpdFRlbXBsYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFLQTtRQUFnRCw4Q0FBK0I7UUFBL0U7WUFBQSxxRUEyQ0M7WUE5Qkc7Ozs7O2VBS0c7WUFDSCxZQUFNLEdBQUcsY0FBTSxPQUFPLEtBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXJEOzs7OztlQUtHO1lBQ0gsVUFBSSxHQUFHLFVBQUMsSUFBSSxJQUFLLE9BQU8sS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUVqRDs7OztlQUlHO1lBQ0gsV0FBSyxHQUFHLFVBQUMsSUFBSTtnQkFDVCxJQUFJLGtCQUFrQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGtCQUFtRCxDQUFDO2dCQUNsRyxJQUFJLE1BQU0sR0FBb0MsU0FBUyxDQUFDO2dCQUN4RCxJQUFHLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksU0FBUyxFQUFDO29CQUMvQyxNQUFNLEdBQUcsa0JBQWtCLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUF1QixFQUF2QixDQUF1QixDQUFDLENBQUM7aUJBQ3JGO2dCQUNELElBQUksUUFBUSxHQUFHLEVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsa0JBQWtCLENBQUMsUUFBUSxDQUFDLElBQUksRUFBYyxDQUFDO2dCQUM3RixPQUFPLEtBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3hFLENBQUMsQ0FBQzs7UUFDUCxDQUFDO1FBekNHOzs7Ozs7V0FNRztRQUNJLHlDQUFjLEdBQXJCO1lBQ0ksT0FBTyxJQUFJLDBCQUEwQixFQUFFLENBQUM7UUFDNUMsQ0FBQztRQWdDTCxpQ0FBQztJQUFELENBQUMsQUEzQ0QsQ0FBZ0QsaUVBQStCLEdBMkM5RTtJQTNDWSxnRUFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUcmVlR3JpZFBhcmFtZXRlclR5cGVFZGl0b3JCYXNlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi90cmVlR3JpZFBhcmFtZXRlclR5cGVFZGl0b3JCYXNlXCI7XHJcbmltcG9ydCB7IElDZWxsSW5mbyB9IGZyb20gXCIuLi8uLi9jb21tb24vaW50ZXJmYWNlcy9jZWxsSW5mb0ludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlciB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50XCI7XHJcbmltcG9ydCB7IElWYWx1ZUxpc3RJdGVtIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9pbnRlcmZhY2VzL3ZhbHVlTGlzdEl0ZW1JbnRlcmZhY2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDbVRyZWVHcmlkQ2VsbEVkaXRUZW1wbGF0ZSBleHRlbmRzIFRyZWVHcmlkUGFyYW1ldGVyVHlwZUVkaXRvckJhc2V7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogY3JlYXRlcyBhbiBpbnN0YW5jZVxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIENtVHJlZUdyaWRDZWxsRWRpdFRlbXBsYXRlXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBjcmVhdGVJbnN0YW5jZSgpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiBuZXcgQ21UcmVlR3JpZENlbGxFZGl0VGVtcGxhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGhhbmRsZSBjcmVhdGluZyB0aGUgY2VsbCBlZGl0IHRlbXBsYXRlXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBDbVRyZWVHcmlkQ2VsbEVkaXRUZW1wbGF0ZVxyXG4gICAgICovXHJcbiAgICBjcmVhdGUgPSAoKT0+eyByZXR1cm4gdGhpcy5nZXRFZGl0SW5wdXRUZW1wbGF0ZSgpOyB9OyBcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBoYW5kbGVzIHJlYWRpbmcgcGFyYW1ldGVyIHZhbHVlc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIENtVHJlZUdyaWRDZWxsRWRpdFRlbXBsYXRlXHJcbiAgICAgKi9cclxuICAgIHJlYWQgPSAoYXJncyk9PnsgcmV0dXJuIHRoaXMuZW5kQ2VsbEVkaXQoYXJncyk7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGhhbmRsZXMgd3JpdGluZyBwYXJhbWV0ZXIgdmFsdWVzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENtVHJlZUdyaWRDZWxsRWRpdFRlbXBsYXRlXHJcbiAgICAgKi9cclxuICAgIHdyaXRlID0gKGFyZ3MpPT57XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudFBhcmFtZXRlciA9IGFyZ3Mucm93ZGF0YS5lbGVtZW50LmNvbXBvbmVudFBhcmFtZXRlciBhcyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcjtcclxuICAgICAgICBsZXQgdmFsdWVzOiBBcnJheTxJVmFsdWVMaXN0SXRlbT58dW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIGlmKGNvbXBvbmVudFBhcmFtZXRlci5lbnVtVHlwZS52YWx1ZXMgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdmFsdWVzID0gY29tcG9uZW50UGFyYW1ldGVyLmVudW1UeXBlLnZhbHVlcy5tYXAodmFsdWUgPT4gdmFsdWUgYXMgSVZhbHVlTGlzdEl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY2VsbEluZm8gPSB7dmFsdWVzOiB2YWx1ZXMsIGRhdGFUeXBlTmFtZTogY29tcG9uZW50UGFyYW1ldGVyLmRhdGFUeXBlLm5hbWV9IGFzIElDZWxsSW5mbztcclxuICAgICAgICByZXR1cm4gdGhpcy5iZWdpbkNlbGxFZGl0KGFyZ3MsIGFyZ3Mucm93ZGF0YS5kaXNwbGF5VmFsdWUsIGNlbGxJbmZvKTtcclxuICAgICB9O1xyXG59Il19