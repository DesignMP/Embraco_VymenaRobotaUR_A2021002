define(["require", "exports", "./cmFilter"], function (require, exports, cmFilter_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CmParameter = /** @class */ (function () {
        function CmParameter(element, componentDataModel) {
            this.filter = undefined;
            if (element.Group != null) {
                this.setDataByGroup(element.Group, componentDataModel);
            }
            else if (element.Parameter != null) {
                this.setDataByParameter(element.Parameter, componentDataModel);
            }
            else {
                this.displayName = "Unkown node type";
                this.description = "";
                this.componentParameter = undefined;
            }
        }
        CmParameter.prototype.setDataByGroup = function (group, componentDataModel) {
            this.displayName = group.DisplayName;
            this.description = group.Description;
            this.componentParameter = CmParameter.getComponentParameter(componentDataModel, group.Ref);
            var parameterValues = undefined;
            if (group.Filter != null) {
                if (group.Filter.ParameterValues != null) {
                    parameterValues = group.Filter.ParameterValues;
                }
                this.filter = new cmFilter_1.CmFilter(group.Filter.ParameterRef, group.Filter.ParameterValue, parameterValues);
            }
        };
        CmParameter.prototype.setDataByParameter = function (parameter, componentDataModel) {
            this.displayName = parameter.DisplayName;
            this.description = parameter.Description;
            this.componentParameter = CmParameter.getComponentParameter(componentDataModel, parameter.Ref);
            if (parameter.Filter != null) {
                var parameterValues = undefined;
                if (parameter.Filter.ParameterValues != null) {
                    parameterValues = parameter.Filter.ParameterValues;
                }
                this.filter = new cmFilter_1.CmFilter(parameter.Filter.ParameterRef, parameter.Filter.ParameterValue, parameterValues);
            }
        };
        CmParameter.getComponentParameter = function (componentDataModel, paramRef) {
            if (paramRef == undefined) {
                return null;
            }
            for (var _i = 0, componentDataModel_1 = componentDataModel; _i < componentDataModel_1.length; _i++) {
                var parameter = componentDataModel_1[_i];
                if (parameter.browseName == paramRef) {
                    return parameter;
                }
            }
        };
        return CmParameter;
    }());
    exports.CmParameter = CmParameter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY21QYXJhbWV0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9jb25maWdNYW5hZ2VyRGF0YU1vZGVsL2NtUGFyYW1ldGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUtBO1FBT0kscUJBQVksT0FBWSxFQUFFLGtCQUF1QjtZQUU3QyxJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztZQUN4QixJQUFHLE9BQU8sQ0FBQyxLQUFLLElBQUksSUFBSSxFQUFDO2dCQUNyQixJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsa0JBQWtCLENBQUMsQ0FBQzthQUMxRDtpQkFDSSxJQUFHLE9BQU8sQ0FBQyxTQUFTLElBQUksSUFBSSxFQUFDO2dCQUMvQixJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO2FBQ2pFO2lCQUNHO2dCQUNBLElBQUksQ0FBQyxXQUFXLEdBQUcsa0JBQWtCLENBQUM7Z0JBQ3RDLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO2dCQUN0QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsU0FBUyxDQUFDO2FBQ3ZDO1FBQ0wsQ0FBQztRQUVPLG9DQUFjLEdBQXRCLFVBQXVCLEtBQUssRUFBRSxrQkFBa0I7WUFDNUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQztZQUVyQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsV0FBVyxDQUFDLHFCQUFxQixDQUFDLGtCQUFrQixFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMzRixJQUFJLGVBQWUsR0FBRyxTQUFTLENBQUM7WUFDaEMsSUFBRyxLQUFLLENBQUMsTUFBTSxJQUFJLElBQUksRUFBQztnQkFDcEIsSUFBRyxLQUFLLENBQUMsTUFBTSxDQUFDLGVBQWUsSUFBSSxJQUFJLEVBQUM7b0JBQ3BDLGVBQWUsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQztpQkFDbEQ7Z0JBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLG1CQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsZUFBZSxDQUFDLENBQUM7YUFDdkc7UUFDTCxDQUFDO1FBRU8sd0NBQWtCLEdBQTFCLFVBQTJCLFNBQVMsRUFBRSxrQkFBa0I7WUFDcEQsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQztZQUV6QyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsV0FBVyxDQUFDLHFCQUFxQixDQUFDLGtCQUFrQixFQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUUvRixJQUFHLFNBQVMsQ0FBQyxNQUFNLElBQUksSUFBSSxFQUFDO2dCQUN4QixJQUFJLGVBQWUsR0FBRyxTQUFTLENBQUM7Z0JBQ2hDLElBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxlQUFlLElBQUksSUFBSSxFQUFDO29CQUN4QyxlQUFlLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUM7aUJBQ3REO2dCQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxtQkFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLGVBQWUsQ0FBQyxDQUFDO2FBQy9HO1FBQ0wsQ0FBQztRQUVjLGlDQUFxQixHQUFwQyxVQUFxQyxrQkFBdUIsRUFBRSxRQUFnQjtZQUMxRSxJQUFHLFFBQVEsSUFBSSxTQUFTLEVBQUM7Z0JBQ3JCLE9BQU8sSUFBSSxDQUFDO2FBQ2Y7WUFFRCxLQUFzQixVQUFrQixFQUFsQix5Q0FBa0IsRUFBbEIsZ0NBQWtCLEVBQWxCLElBQWtCLEVBQUM7Z0JBQXBDLElBQUksU0FBUywyQkFBQTtnQkFDZCxJQUFHLFNBQVMsQ0FBQyxVQUFVLElBQUksUUFBUSxFQUFDO29CQUNoQyxPQUFPLFNBQVMsQ0FBQztpQkFDdEI7YUFDRjtRQUNILENBQUM7UUFDUCxrQkFBQztJQUFELENBQUMsQUEvREQsSUErREM7SUEvRFksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ21QYXJhbWV0ZXIgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL2NtUGFyYW1ldGVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElDbUZpbHRlciB9IGZyb20gXCIuL2ludGVyZmFjZXMvY21GaWx0ZXJJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ21GaWx0ZXIgfSBmcm9tIFwiLi9jbUZpbHRlclwiO1xyXG5pbXBvcnQgeyBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlciB9IGZyb20gXCIuLi9vbmxpbmUvbWFwcENvY2twaXRDb21wb25lbnRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDbVBhcmFtZXRlciBpbXBsZW1lbnRzIElDbVBhcmFtZXRlcntcclxuICAgICAgXHJcbiAgICBkaXNwbGF5TmFtZSE6IHN0cmluZztcclxuICAgIGRlc2NyaXB0aW9uITogc3RyaW5nO1xyXG4gICAgZmlsdGVyOiBJQ21GaWx0ZXJ8dW5kZWZpbmVkO1xyXG4gICAgY29tcG9uZW50UGFyYW1ldGVyOiBNYXBwQ29ja3BpdENvbXBvbmVudFBhcmFtZXRlcnx1bmRlZmluZWQ7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IGFueSwgY29tcG9uZW50RGF0YU1vZGVsOiBhbnkpe1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuZmlsdGVyID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIGlmKGVsZW1lbnQuR3JvdXAgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YUJ5R3JvdXAoZWxlbWVudC5Hcm91cCwgY29tcG9uZW50RGF0YU1vZGVsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihlbGVtZW50LlBhcmFtZXRlciAhPSBudWxsKXtcclxuICAgICAgICAgICB0aGlzLnNldERhdGFCeVBhcmFtZXRlcihlbGVtZW50LlBhcmFtZXRlciwgY29tcG9uZW50RGF0YU1vZGVsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5kaXNwbGF5TmFtZSA9IFwiVW5rb3duIG5vZGUgdHlwZVwiO1xyXG4gICAgICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gXCJcIjtcclxuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRQYXJhbWV0ZXIgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0RGF0YUJ5R3JvdXAoZ3JvdXAsIGNvbXBvbmVudERhdGFNb2RlbCl7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5TmFtZSA9IGdyb3VwLkRpc3BsYXlOYW1lO1xyXG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBncm91cC5EZXNjcmlwdGlvbjtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmNvbXBvbmVudFBhcmFtZXRlciA9IENtUGFyYW1ldGVyLmdldENvbXBvbmVudFBhcmFtZXRlcihjb21wb25lbnREYXRhTW9kZWwsIGdyb3VwLlJlZik7XHJcbiAgICAgICAgbGV0IHBhcmFtZXRlclZhbHVlcyA9IHVuZGVmaW5lZDtcclxuICAgICAgICBpZihncm91cC5GaWx0ZXIgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIGlmKGdyb3VwLkZpbHRlci5QYXJhbWV0ZXJWYWx1ZXMgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICBwYXJhbWV0ZXJWYWx1ZXMgPSBncm91cC5GaWx0ZXIuUGFyYW1ldGVyVmFsdWVzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyID0gbmV3IENtRmlsdGVyKGdyb3VwLkZpbHRlci5QYXJhbWV0ZXJSZWYsIGdyb3VwLkZpbHRlci5QYXJhbWV0ZXJWYWx1ZSwgcGFyYW1ldGVyVmFsdWVzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXREYXRhQnlQYXJhbWV0ZXIocGFyYW1ldGVyLCBjb21wb25lbnREYXRhTW9kZWwpe1xyXG4gICAgICAgIHRoaXMuZGlzcGxheU5hbWUgPSBwYXJhbWV0ZXIuRGlzcGxheU5hbWU7XHJcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IHBhcmFtZXRlci5EZXNjcmlwdGlvbjtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmNvbXBvbmVudFBhcmFtZXRlciA9IENtUGFyYW1ldGVyLmdldENvbXBvbmVudFBhcmFtZXRlcihjb21wb25lbnREYXRhTW9kZWwsIHBhcmFtZXRlci5SZWYpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHBhcmFtZXRlci5GaWx0ZXIgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHZhciBwYXJhbWV0ZXJWYWx1ZXMgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIGlmKHBhcmFtZXRlci5GaWx0ZXIuUGFyYW1ldGVyVmFsdWVzICE9IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgcGFyYW1ldGVyVmFsdWVzID0gcGFyYW1ldGVyLkZpbHRlci5QYXJhbWV0ZXJWYWx1ZXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5maWx0ZXIgPSBuZXcgQ21GaWx0ZXIocGFyYW1ldGVyLkZpbHRlci5QYXJhbWV0ZXJSZWYsIHBhcmFtZXRlci5GaWx0ZXIuUGFyYW1ldGVyVmFsdWUsIHBhcmFtZXRlclZhbHVlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGdldENvbXBvbmVudFBhcmFtZXRlcihjb21wb25lbnREYXRhTW9kZWw6IGFueSwgcGFyYW1SZWY6IHN0cmluZyl7XHJcbiAgICAgICAgaWYocGFyYW1SZWYgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBwYXJhbWV0ZXIgb2YgY29tcG9uZW50RGF0YU1vZGVsKXtcclxuICAgICAgICAgICAgaWYocGFyYW1ldGVyLmJyb3dzZU5hbWUgPT0gcGFyYW1SZWYpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcmFtZXRlcjtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxufSJdfQ==