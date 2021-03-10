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
define(["require", "exports", "../../../framework/events", "./cmNode", "./cmGroupNode", "../../../models/configManagerDataModel/cmGroup"], function (require, exports, events_1, cmNode_1, cmGroupNode_1, cmGroup_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // Declares Event-AppInitialized
    var EventConfigManagerWidgetDataModelChanged = /** @class */ (function (_super) {
        __extends(EventConfigManagerWidgetDataModelChanged, _super);
        function EventConfigManagerWidgetDataModelChanged() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventConfigManagerWidgetDataModelChanged;
    }(events_1.TypedEvent));
    ;
    var ConfigManagerWidgetDataModel = /** @class */ (function () {
        function ConfigManagerWidgetDataModel(dataModel) {
            // Events
            this.eventDataModelChanged = new EventConfigManagerWidgetDataModelChanged();
            this._widgetDataModel = ConfigManagerWidgetDataModel.getWidgetDataModel((dataModel.data));
        }
        /**
         * Dispose the configmanagerwidget datamodel
         *
         * @memberof ConfigManagerWidgetDataModel
         */
        ConfigManagerWidgetDataModel.prototype.dispose = function () {
        };
        /**
         * Sets the expand states from an other datamodel to this datamodel
         *
         * @param {Array<ICmNode>} dataModel
         * @memberof ConfigManagerWidgetDataModel
         */
        ConfigManagerWidgetDataModel.prototype.setExpandStates = function (dataModel) {
            this.setExpandStatesForGroups(dataModel, this._widgetDataModel);
        };
        /**
         * Sets the expand states from an array of nodes to an other array of nodes with all child nodes
         *
         * @private
         * @param {Array<ICmNode>} oldGroup
         * @param {Array<ICmNode>} newGroup
         * @memberof ConfigManagerWidgetDataModel
         */
        ConfigManagerWidgetDataModel.prototype.setExpandStatesForGroups = function (oldGroup, newGroup) {
            for (var i = 0; i < newGroup.length; i++) {
                if (newGroup[i] instanceof cmGroupNode_1.CmGroupNode) {
                    // Set expand state for the group
                    var oldGroupNode = this.getGroup(oldGroup, newGroup[i].displayName);
                    if (oldGroupNode != undefined) {
                        newGroup[i].expandState = oldGroupNode.expandState;
                        // Set expand states for the childs
                        this.setExpandStatesForGroups(oldGroupNode.childs, newGroup[i].childs);
                    }
                }
            }
        };
        /**
         * Returns a group with the given groupId if found, else undefined (not recursive, only top level nodes)
         *
         * @private
         * @param {Array<ICmNode>} dataModel
         * @param {*} groupId
         * @returns {(ICmGroupNode|undefined)}
         * @memberof ConfigManagerWidgetDataModel
         */
        ConfigManagerWidgetDataModel.prototype.getGroup = function (dataModel, groupId) {
            if (dataModel != undefined) {
                for (var i = 0; i < dataModel.length; i++) {
                    if (dataModel[i] instanceof cmGroupNode_1.CmGroupNode) {
                        if (dataModel[i].displayName == groupId) {
                            return dataModel[i];
                        }
                    }
                }
            }
            return undefined;
        };
        /**
         * Returns the widget datamodel
         *
         * @returns {Array<ICmNode>}
         * @memberof ConfigManagerWidgetDataModel
         */
        ConfigManagerWidgetDataModel.prototype.getDataModel = function () {
            return this._widgetDataModel;
        };
        ConfigManagerWidgetDataModel.prototype.setValue = function (element, value) {
            var changeHint = {
                hint: "changed parameter value",
                changedItemData: element,
                newItemData: value,
            };
            this.onDataModelChanged(changeHint);
        };
        /**
         * Notifies that the data model has changed
         *
         * @private
         * @memberof ConfigManagerWidgetDataModel
         */
        ConfigManagerWidgetDataModel.prototype.onDataModelChanged = function (eventArgs) {
            this.eventDataModelChanged.raise(this, eventArgs);
        };
        ConfigManagerWidgetDataModel.getWidgetDataModel = function (dataModel) {
            var nodes = new Array();
            if (dataModel != undefined) {
                dataModel.forEach(function (element) {
                    if (element.filter == null || element.filter.active == false) {
                        nodes.push(ConfigManagerWidgetDataModel.CreateNode(element));
                    }
                });
            }
            return nodes;
        };
        ConfigManagerWidgetDataModel.CreateNode = function (element) {
            if (element instanceof cmGroup_1.CmGroup) {
                return new cmGroupNode_1.CmGroupNode(element);
            }
            else {
                return new cmNode_1.CmNode(element);
            }
        };
        return ConfigManagerWidgetDataModel;
    }());
    exports.ConfigManagerWidgetDataModel = ConfigManagerWidgetDataModel;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jb25maWdNYW5hZ2VyV2lkZ2V0L21vZGVsL2NvbmZpZ01hbmFnZXJXaWRnZXREYXRhTW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVVBLGdDQUFnQztJQUNoQztRQUF1RCw0REFBOEM7UUFBckc7O1FBQXVHLENBQUM7UUFBRCwrQ0FBQztJQUFELENBQUMsQUFBeEcsQ0FBdUQsbUJBQVUsR0FBdUM7SUFBQSxDQUFDO0lBRXpHO1FBT0ksc0NBQVksU0FBcUI7WUFMakMsU0FBUztZQUNULDBCQUFxQixHQUFHLElBQUksd0NBQXdDLEVBQUUsQ0FBQztZQUtuRSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsNEJBQTRCLENBQUMsa0JBQWtCLENBQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNuRyxDQUFDO1FBRUQ7Ozs7V0FJRztRQUNILDhDQUFPLEdBQVA7UUFFQSxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSCxzREFBZSxHQUFmLFVBQWdCLFNBQXlCO1lBQ3JDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDcEUsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSywrREFBd0IsR0FBaEMsVUFBaUMsUUFBd0IsRUFBRSxRQUF3QjtZQUMvRSxLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztnQkFDbEMsSUFBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLFlBQVkseUJBQVcsRUFBQztvQkFDbEMsaUNBQWlDO29CQUNqQyxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQ3BFLElBQUcsWUFBWSxJQUFJLFNBQVMsRUFBQzt3QkFDWCxRQUFRLENBQUMsQ0FBQyxDQUFFLENBQUMsV0FBVyxHQUFHLFlBQVksQ0FBQyxXQUFXLENBQUM7d0JBQ2xFLG1DQUFtQzt3QkFDbkMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQWdCLFFBQVEsQ0FBQyxDQUFDLENBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztxQkFDekY7aUJBQ0o7YUFDSjtRQUNMLENBQUM7UUFFRDs7Ozs7Ozs7V0FRRztRQUNLLCtDQUFRLEdBQWhCLFVBQWlCLFNBQXlCLEVBQUUsT0FBTztZQUMvQyxJQUFHLFNBQVMsSUFBSSxTQUFTLEVBQUM7Z0JBQ3RCLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO29CQUNuQyxJQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsWUFBWSx5QkFBVyxFQUFDO3dCQUNuQyxJQUFpQixTQUFTLENBQUMsQ0FBQyxDQUFFLENBQUMsV0FBVyxJQUFJLE9BQU8sRUFBQzs0QkFDbEQsT0FBcUIsU0FBUyxDQUFDLENBQUMsQ0FBRSxDQUFDO3lCQUN0QztxQkFDSjtpQkFDSjthQUNKO1lBQ0QsT0FBTyxTQUFTLENBQUM7UUFDckIsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gsbURBQVksR0FBWjtZQUNJLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDO1FBQ2pDLENBQUM7UUFFRCwrQ0FBUSxHQUFSLFVBQVMsT0FBcUIsRUFBRSxLQUFhO1lBRXpDLElBQUksVUFBVSxHQUFHO2dCQUNiLElBQUksRUFBRSx5QkFBeUI7Z0JBQy9CLGVBQWUsRUFBRyxPQUFPO2dCQUN6QixXQUFXLEVBQUcsS0FBSzthQUN0QixDQUFBO1lBQ0QsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3hDLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNLLHlEQUFrQixHQUExQixVQUEyQixTQUFTO1lBQ2hDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3RELENBQUM7UUFFYywrQ0FBa0IsR0FBakMsVUFBbUMsU0FBcUI7WUFDcEQsSUFBSSxLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQVcsQ0FBQztZQUVqQyxJQUFHLFNBQVMsSUFBSSxTQUFTLEVBQUM7Z0JBQ3RCLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPO29CQUNyQixJQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksSUFBSSxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLEtBQUssRUFBQzt3QkFDeEQsS0FBSyxDQUFDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtxQkFDL0Q7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7YUFDTjtZQUNELE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUM7UUFFYyx1Q0FBVSxHQUF6QixVQUEwQixPQUFxQjtZQUMzQyxJQUFHLE9BQU8sWUFBWSxpQkFBTyxFQUFDO2dCQUMxQixPQUFPLElBQUkseUJBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNuQztpQkFDRztnQkFDQSxPQUFPLElBQUksZUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzlCO1FBQ0wsQ0FBQztRQUNMLG1DQUFDO0lBQUQsQ0FBQyxBQTdIRCxJQTZIQztJQTdIWSxvRUFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUeXBlZEV2ZW50IH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9ldmVudHNcIjtcclxuaW1wb3J0IHsgSUNtTm9kZSB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2NtTm9kZUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDbU5vZGUgfSBmcm9tIFwiLi9jbU5vZGVcIjtcclxuaW1wb3J0IHsgQ21Hcm91cE5vZGUgfSBmcm9tIFwiLi9jbUdyb3VwTm9kZVwiO1xyXG5pbXBvcnQgeyBJQ21Hcm91cCB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY29uZmlnTWFuYWdlckRhdGFNb2RlbC9pbnRlcmZhY2VzL2NtR3JvdXBJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSUNtUGFyYW1ldGVyIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9jb25maWdNYW5hZ2VyRGF0YU1vZGVsL2ludGVyZmFjZXMvY21QYXJhbWV0ZXJJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ21Hcm91cCB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvY29uZmlnTWFuYWdlckRhdGFNb2RlbC9jbUdyb3VwXCI7XHJcbmltcG9ydCB7IElEYXRhTW9kZWwgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL2RhdGFNb2RlbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJQ21Hcm91cE5vZGUgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9jbUdyb3VwTm9kZUludGVyZmFjZVwiO1xyXG5cclxuLy8gRGVjbGFyZXMgRXZlbnQtQXBwSW5pdGlhbGl6ZWRcclxuY2xhc3MgRXZlbnRDb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsQ2hhbmdlZCBleHRlbmRzIFR5cGVkRXZlbnQ8Q29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbCwgbnVsbD57IH07XHJcblxyXG5leHBvcnQgY2xhc3MgQ29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbHtcclxuICAgIFxyXG4gICAgLy8gRXZlbnRzXHJcbiAgICBldmVudERhdGFNb2RlbENoYW5nZWQgPSBuZXcgRXZlbnRDb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsQ2hhbmdlZCgpO1xyXG5cclxuICAgIHByaXZhdGUgX3dpZGdldERhdGFNb2RlbCA6IEFycmF5PElDbU5vZGU+O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGRhdGFNb2RlbDogSURhdGFNb2RlbCl7XHJcbiAgICAgICAgdGhpcy5fd2lkZ2V0RGF0YU1vZGVsID0gQ29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbC5nZXRXaWRnZXREYXRhTW9kZWwoPGFueT4oZGF0YU1vZGVsLmRhdGEpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc3Bvc2UgdGhlIGNvbmZpZ21hbmFnZXJ3aWRnZXQgZGF0YW1vZGVsXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJXaWRnZXREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgZGlzcG9zZSgpe1xyXG5cclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBleHBhbmQgc3RhdGVzIGZyb20gYW4gb3RoZXIgZGF0YW1vZGVsIHRvIHRoaXMgZGF0YW1vZGVsXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxJQ21Ob2RlPn0gZGF0YU1vZGVsXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBzZXRFeHBhbmRTdGF0ZXMoZGF0YU1vZGVsOiBBcnJheTxJQ21Ob2RlPil7XHJcbiAgICAgICAgdGhpcy5zZXRFeHBhbmRTdGF0ZXNGb3JHcm91cHMoZGF0YU1vZGVsLCB0aGlzLl93aWRnZXREYXRhTW9kZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgZXhwYW5kIHN0YXRlcyBmcm9tIGFuIGFycmF5IG9mIG5vZGVzIHRvIGFuIG90aGVyIGFycmF5IG9mIG5vZGVzIHdpdGggYWxsIGNoaWxkIG5vZGVzXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SUNtTm9kZT59IG9sZEdyb3VwXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PElDbU5vZGU+fSBuZXdHcm91cFxyXG4gICAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJXaWRnZXREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRFeHBhbmRTdGF0ZXNGb3JHcm91cHMob2xkR3JvdXA6IEFycmF5PElDbU5vZGU+LCBuZXdHcm91cDogQXJyYXk8SUNtTm9kZT4pe1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpIDwgbmV3R3JvdXAubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZihuZXdHcm91cFtpXSBpbnN0YW5jZW9mIENtR3JvdXBOb2RlKXtcclxuICAgICAgICAgICAgICAgIC8vIFNldCBleHBhbmQgc3RhdGUgZm9yIHRoZSBncm91cFxyXG4gICAgICAgICAgICAgICAgbGV0IG9sZEdyb3VwTm9kZSA9IHRoaXMuZ2V0R3JvdXAob2xkR3JvdXAsIG5ld0dyb3VwW2ldLmRpc3BsYXlOYW1lKTtcclxuICAgICAgICAgICAgICAgIGlmKG9sZEdyb3VwTm9kZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICg8Q21Hcm91cE5vZGU+bmV3R3JvdXBbaV0pLmV4cGFuZFN0YXRlID0gb2xkR3JvdXBOb2RlLmV4cGFuZFN0YXRlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFNldCBleHBhbmQgc3RhdGVzIGZvciB0aGUgY2hpbGRzXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRFeHBhbmRTdGF0ZXNGb3JHcm91cHMob2xkR3JvdXBOb2RlLmNoaWxkcywgKDxDbUdyb3VwTm9kZT5uZXdHcm91cFtpXSkuY2hpbGRzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSBncm91cCB3aXRoIHRoZSBnaXZlbiBncm91cElkIGlmIGZvdW5kLCBlbHNlIHVuZGVmaW5lZCAobm90IHJlY3Vyc2l2ZSwgb25seSB0b3AgbGV2ZWwgbm9kZXMpXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8SUNtTm9kZT59IGRhdGFNb2RlbFxyXG4gICAgICogQHBhcmFtIHsqfSBncm91cElkXHJcbiAgICAgKiBAcmV0dXJucyB7KElDbUdyb3VwTm9kZXx1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJXaWRnZXREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRHcm91cChkYXRhTW9kZWw6IEFycmF5PElDbU5vZGU+LCBncm91cElkKTogSUNtR3JvdXBOb2RlfHVuZGVmaW5lZHtcclxuICAgICAgICBpZihkYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGkgPCBkYXRhTW9kZWwubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgaWYoZGF0YU1vZGVsW2ldIGluc3RhbmNlb2YgQ21Hcm91cE5vZGUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCg8Q21Hcm91cE5vZGU+ZGF0YU1vZGVsW2ldKS5kaXNwbGF5TmFtZSA9PSBncm91cElkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICg8Q21Hcm91cE5vZGU+ZGF0YU1vZGVsW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHdpZGdldCBkYXRhbW9kZWxcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8SUNtTm9kZT59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29uZmlnTWFuYWdlcldpZGdldERhdGFNb2RlbFxyXG4gICAgICovXHJcbiAgICBnZXREYXRhTW9kZWwoKTogQXJyYXk8SUNtTm9kZT57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dpZGdldERhdGFNb2RlbDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc2V0VmFsdWUoZWxlbWVudDogSUNtUGFyYW1ldGVyLCB2YWx1ZTogc3RyaW5nKXtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgY2hhbmdlSGludCA9IHtcclxuICAgICAgICAgICAgaGludDogXCJjaGFuZ2VkIHBhcmFtZXRlciB2YWx1ZVwiLFxyXG4gICAgICAgICAgICBjaGFuZ2VkSXRlbURhdGEgOiBlbGVtZW50LCAgXHJcbiAgICAgICAgICAgIG5ld0l0ZW1EYXRhIDogdmFsdWUsIFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm9uRGF0YU1vZGVsQ2hhbmdlZChjaGFuZ2VIaW50KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE5vdGlmaWVzIHRoYXQgdGhlIGRhdGEgbW9kZWwgaGFzIGNoYW5nZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIENvbmZpZ01hbmFnZXJXaWRnZXREYXRhTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbkRhdGFNb2RlbENoYW5nZWQoZXZlbnRBcmdzKXtcclxuICAgICAgICB0aGlzLmV2ZW50RGF0YU1vZGVsQ2hhbmdlZC5yYWlzZSh0aGlzLCBldmVudEFyZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGdldFdpZGdldERhdGFNb2RlbCAoZGF0YU1vZGVsOiBJQ21Hcm91cFtdKSA6IEFycmF5PElDbU5vZGU+e1xyXG4gICAgICAgIHZhciBub2RlcyA9IG5ldyBBcnJheTxJQ21Ob2RlPigpO1xyXG5cclxuICAgICAgICBpZihkYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgZGF0YU1vZGVsLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihlbGVtZW50LmZpbHRlciA9PSBudWxsIHx8IGVsZW1lbnQuZmlsdGVyLmFjdGl2ZSA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZXMucHVzaChDb25maWdNYW5hZ2VyV2lkZ2V0RGF0YU1vZGVsLkNyZWF0ZU5vZGUoZWxlbWVudCkpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbm9kZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgQ3JlYXRlTm9kZShlbGVtZW50OiBJQ21QYXJhbWV0ZXIpIDogSUNtTm9kZXtcclxuICAgICAgICBpZihlbGVtZW50IGluc3RhbmNlb2YgQ21Hcm91cCl7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ21Hcm91cE5vZGUoZWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ21Ob2RlKGVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==