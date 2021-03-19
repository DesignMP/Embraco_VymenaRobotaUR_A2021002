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
define(["require", "exports", "../../common/componentFactory/componentDefinition", "../../framework/componentHub/bindings/componentBinding", "../persistence/settings"], function (require, exports, componentDefinition_1, componentBinding_1, settings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ComponentSettings = /** @class */ (function (_super) {
        __extends(ComponentSettings, _super);
        /**
         * Creates an instance of ComponentSettings
         * @memberof ComponentSettings
         */
        function ComponentSettings() {
            return _super.call(this, "") || this;
        }
        /**
         * Sets the given component settings infomation to this component settings
         *
         * @param {(ComponentSettings|undefined)} settings
         * @memberof ComponentSettings
         */
        ComponentSettings.prototype.setSettings = function (settings) {
            if (settings != undefined) {
                if (settings.type != "") {
                    this.type = settings.type;
                }
                this.version = settings.version;
                this.data = settings.data;
            }
        };
        /**
         * Adds a new (sub) component to this component settings
         *
         * @param {string} type
         * @param {string} id
         * @param {string} [defaultInstanceDataId=""]
         * @memberof ComponentSettings
         */
        ComponentSettings.prototype.addSubComponent = function (type, id, defaultInstanceDataId) {
            if (defaultInstanceDataId === void 0) { defaultInstanceDataId = ""; }
            var addComponentData = false;
            // Find components data
            var components = this.getValue(ComponentSettings.SubComponentsSettingId);
            if (components == undefined) {
                // Create components data
                components = new Array();
                addComponentData = true;
            }
            // Add component to sub components list
            components.push(new componentDefinition_1.ComponentDefinition(type, id, defaultInstanceDataId));
            if (addComponentData == true) {
                this.setValue(ComponentSettings.SubComponentsSettingId, components);
            }
        };
        /**
         * Adds a new binding to this component settings
         *
         * @param {BindingType} type
         * @param {TConnectionDataType} dataType
         * @param {string} scope
         * @param {string} id
         * @param {string} targetKey
         * @param {string} sourceKey
         * @memberof ComponentSettings
         */
        ComponentSettings.prototype.addBinding = function (type, dataType, scope, id, targetKey, sourceKey) {
            var addBindingsData = false;
            // Find bindings data
            var bindings = this.getValue(ComponentSettings.BindingsSettingId);
            if (bindings == undefined) {
                // Create binding data
                bindings = new Array();
                addBindingsData = true;
            }
            // Add binding to bindings data
            var binding = new componentBinding_1.ComponentBinding();
            binding.type = type;
            binding.dataType = dataType;
            //binding.component = undefined;
            binding.scope = scope;
            binding.id = id;
            binding.targetKey = targetKey;
            binding.sourceKey = sourceKey;
            bindings.push(binding);
            if (addBindingsData == true) {
                // add bindings data to this widget base data
                this.setValue(ComponentSettings.BindingsSettingId, bindings);
            }
        };
        ComponentSettings.SubComponentsSettingId = "subComponents";
        ComponentSettings.BindingsSettingId = "bindings";
        return ComponentSettings;
    }(settings_1.Settings));
    exports.ComponentSettings = ComponentSettings;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50U2V0dGluZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW1vbi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFLQTtRQUF1QyxxQ0FBUTtRQUkzQzs7O1dBR0c7UUFDSDttQkFDSSxrQkFBTSxFQUFFLENBQUM7UUFDYixDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSCx1Q0FBVyxHQUFYLFVBQVksUUFBcUM7WUFDN0MsSUFBRyxRQUFRLElBQUksU0FBUyxFQUFDO2dCQUNyQixJQUFHLFFBQVEsQ0FBQyxJQUFJLElBQUksRUFBRSxFQUFDO29CQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7aUJBQzdCO2dCQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQztnQkFDaEMsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO2FBQy9CO1FBQ0gsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSCwyQ0FBZSxHQUFmLFVBQWdCLElBQVksRUFBRSxFQUFVLEVBQUUscUJBQWtDO1lBQWxDLHNDQUFBLEVBQUEsMEJBQWtDO1lBQ3hFLElBQUksZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1lBQzdCLHVCQUF1QjtZQUN2QixJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFDekUsSUFBRyxVQUFVLElBQUksU0FBUyxFQUFDO2dCQUN2Qix5QkFBeUI7Z0JBQ3pCLFVBQVUsR0FBRyxJQUFJLEtBQUssRUFBdUIsQ0FBQztnQkFDOUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO2FBQzNCO1lBQ0QsdUNBQXVDO1lBQ3ZDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSx5Q0FBbUIsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLHFCQUFxQixDQUFDLENBQUMsQ0FBQztZQUMxRSxJQUFHLGdCQUFnQixJQUFJLElBQUksRUFBQztnQkFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxzQkFBc0IsRUFBRSxVQUFVLENBQUMsQ0FBQzthQUN2RTtRQUNMLENBQUM7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsc0NBQVUsR0FBVixVQUFXLElBQWlCLEVBQUUsUUFBNkIsRUFBRSxLQUFhLEVBQUUsRUFBVSxFQUFFLFNBQWlCLEVBQUUsU0FBaUI7WUFDeEgsSUFBSSxlQUFlLEdBQUcsS0FBSyxDQUFDO1lBQzVCLHFCQUFxQjtZQUNyQixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDbEUsSUFBRyxRQUFRLElBQUksU0FBUyxFQUFDO2dCQUNyQixzQkFBc0I7Z0JBQ3RCLFFBQVEsR0FBRyxJQUFJLEtBQUssRUFBb0IsQ0FBQztnQkFDekMsZUFBZSxHQUFHLElBQUksQ0FBQzthQUMxQjtZQUNELCtCQUErQjtZQUMvQixJQUFNLE9BQU8sR0FBRyxJQUFJLG1DQUFnQixFQUFFLENBQUM7WUFDdkMsT0FBTyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDcEIsT0FBTyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7WUFDNUIsZ0NBQWdDO1lBQ2hDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ3RCLE9BQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1lBQ2hCLE9BQU8sQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1lBQzlCLE9BQU8sQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1lBRTlCLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdkIsSUFBRyxlQUFlLElBQUksSUFBSSxFQUFDO2dCQUN2Qiw2Q0FBNkM7Z0JBQzdDLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsaUJBQWlCLEVBQUUsUUFBUSxDQUFDLENBQUM7YUFDaEU7UUFDTCxDQUFDO1FBdEZzQix3Q0FBc0IsR0FBRyxlQUFlLENBQUM7UUFDekMsbUNBQWlCLEdBQUcsVUFBVSxDQUFDO1FBc0YxRCx3QkFBQztLQUFBLEFBeEZELENBQXVDLG1CQUFRLEdBd0Y5QztJQXhGWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnREZWZpbml0aW9uIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21wb25lbnRGYWN0b3J5L2NvbXBvbmVudERlZmluaXRpb25cIjtcclxuaW1wb3J0IHsgQmluZGluZ1R5cGUsIENvbXBvbmVudEJpbmRpbmcgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2NvbXBvbmVudEh1Yi9iaW5kaW5ncy9jb21wb25lbnRCaW5kaW5nXCI7XHJcbmltcG9ydCB7IFRDb25uZWN0aW9uRGF0YVR5cGUgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2NvbXBvbmVudEh1Yi9jb21tb24vY29tbW9uVHlwZXNcIjtcclxuaW1wb3J0IHsgU2V0dGluZ3MgfSBmcm9tIFwiLi4vcGVyc2lzdGVuY2Uvc2V0dGluZ3NcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDb21wb25lbnRTZXR0aW5ncyBleHRlbmRzIFNldHRpbmdze1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBTdWJDb21wb25lbnRzU2V0dGluZ0lkID0gXCJzdWJDb21wb25lbnRzXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEJpbmRpbmdzU2V0dGluZ0lkID0gXCJiaW5kaW5nc1wiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBDb21wb25lbnRTZXR0aW5nc1xyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudFNldHRpbmdzXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoXCJcIik7ICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgZ2l2ZW4gY29tcG9uZW50IHNldHRpbmdzIGluZm9tYXRpb24gdG8gdGhpcyBjb21wb25lbnQgc2V0dGluZ3NcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyhDb21wb25lbnRTZXR0aW5nc3x1bmRlZmluZWQpfSBzZXR0aW5nc1xyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudFNldHRpbmdzXHJcbiAgICAgKi9cclxuICAgIHNldFNldHRpbmdzKHNldHRpbmdzOiBDb21wb25lbnRTZXR0aW5nc3x1bmRlZmluZWQpe1xyXG4gICAgICAgIGlmKHNldHRpbmdzICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGlmKHNldHRpbmdzLnR5cGUgIT0gXCJcIil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnR5cGUgPSBzZXR0aW5ncy50eXBlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMudmVyc2lvbiA9IHNldHRpbmdzLnZlcnNpb247XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IHNldHRpbmdzLmRhdGE7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBuZXcgKHN1YikgY29tcG9uZW50IHRvIHRoaXMgY29tcG9uZW50IHNldHRpbmdzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtkZWZhdWx0SW5zdGFuY2VEYXRhSWQ9XCJcIl1cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRTZXR0aW5nc1xyXG4gICAgICovXHJcbiAgICBhZGRTdWJDb21wb25lbnQodHlwZTogc3RyaW5nLCBpZDogc3RyaW5nLCBkZWZhdWx0SW5zdGFuY2VEYXRhSWQ6IHN0cmluZyA9IFwiXCIpe1xyXG4gICAgICAgIGxldCBhZGRDb21wb25lbnREYXRhID0gZmFsc2U7XHJcbiAgICAgICAgLy8gRmluZCBjb21wb25lbnRzIGRhdGFcclxuICAgICAgICBsZXQgY29tcG9uZW50cyA9IHRoaXMuZ2V0VmFsdWUoQ29tcG9uZW50U2V0dGluZ3MuU3ViQ29tcG9uZW50c1NldHRpbmdJZCk7XHJcbiAgICAgICAgaWYoY29tcG9uZW50cyA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAvLyBDcmVhdGUgY29tcG9uZW50cyBkYXRhXHJcbiAgICAgICAgICAgIGNvbXBvbmVudHMgPSBuZXcgQXJyYXk8Q29tcG9uZW50RGVmaW5pdGlvbj4oKTtcclxuICAgICAgICAgICAgYWRkQ29tcG9uZW50RGF0YSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEFkZCBjb21wb25lbnQgdG8gc3ViIGNvbXBvbmVudHMgbGlzdFxyXG4gICAgICAgIGNvbXBvbmVudHMucHVzaChuZXcgQ29tcG9uZW50RGVmaW5pdGlvbih0eXBlLCBpZCwgZGVmYXVsdEluc3RhbmNlRGF0YUlkKSk7XHJcbiAgICAgICAgaWYoYWRkQ29tcG9uZW50RGF0YSA9PSB0cnVlKXtcclxuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZShDb21wb25lbnRTZXR0aW5ncy5TdWJDb21wb25lbnRzU2V0dGluZ0lkLCBjb21wb25lbnRzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIG5ldyBiaW5kaW5nIHRvIHRoaXMgY29tcG9uZW50IHNldHRpbmdzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtCaW5kaW5nVHlwZX0gdHlwZVxyXG4gICAgICogQHBhcmFtIHtUQ29ubmVjdGlvbkRhdGFUeXBlfSBkYXRhVHlwZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNjb3BlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0YXJnZXRLZXlcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzb3VyY2VLZXlcclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRTZXR0aW5nc1xyXG4gICAgICovXHJcbiAgICBhZGRCaW5kaW5nKHR5cGU6IEJpbmRpbmdUeXBlLCBkYXRhVHlwZTogVENvbm5lY3Rpb25EYXRhVHlwZSwgc2NvcGU6IHN0cmluZywgaWQ6IHN0cmluZywgdGFyZ2V0S2V5OiBzdHJpbmcsIHNvdXJjZUtleTogc3RyaW5nKXtcclxuICAgICAgICBsZXQgYWRkQmluZGluZ3NEYXRhID0gZmFsc2U7XHJcbiAgICAgICAgLy8gRmluZCBiaW5kaW5ncyBkYXRhXHJcbiAgICAgICAgbGV0IGJpbmRpbmdzID0gdGhpcy5nZXRWYWx1ZShDb21wb25lbnRTZXR0aW5ncy5CaW5kaW5nc1NldHRpbmdJZCk7XHJcbiAgICAgICAgaWYoYmluZGluZ3MgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGJpbmRpbmcgZGF0YVxyXG4gICAgICAgICAgICBiaW5kaW5ncyA9IG5ldyBBcnJheTxDb21wb25lbnRCaW5kaW5nPigpO1xyXG4gICAgICAgICAgICBhZGRCaW5kaW5nc0RhdGEgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBBZGQgYmluZGluZyB0byBiaW5kaW5ncyBkYXRhXHJcbiAgICAgICAgY29uc3QgYmluZGluZyA9IG5ldyBDb21wb25lbnRCaW5kaW5nKCk7XHJcbiAgICAgICAgYmluZGluZy50eXBlID0gdHlwZTtcclxuICAgICAgICBiaW5kaW5nLmRhdGFUeXBlID0gZGF0YVR5cGU7XHJcbiAgICAgICAgLy9iaW5kaW5nLmNvbXBvbmVudCA9IHVuZGVmaW5lZDtcclxuICAgICAgICBiaW5kaW5nLnNjb3BlID0gc2NvcGU7XHJcbiAgICAgICAgYmluZGluZy5pZCA9IGlkO1xyXG4gICAgICAgIGJpbmRpbmcudGFyZ2V0S2V5ID0gdGFyZ2V0S2V5O1xyXG4gICAgICAgIGJpbmRpbmcuc291cmNlS2V5ID0gc291cmNlS2V5O1xyXG4gXHJcbiAgICAgICAgYmluZGluZ3MucHVzaChiaW5kaW5nKTtcclxuICAgICAgICBpZihhZGRCaW5kaW5nc0RhdGEgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIC8vIGFkZCBiaW5kaW5ncyBkYXRhIHRvIHRoaXMgd2lkZ2V0IGJhc2UgZGF0YVxyXG4gICAgICAgICAgICB0aGlzLnNldFZhbHVlKENvbXBvbmVudFNldHRpbmdzLkJpbmRpbmdzU2V0dGluZ0lkLCBiaW5kaW5ncyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19