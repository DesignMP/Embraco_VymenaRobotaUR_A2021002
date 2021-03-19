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
define(["require", "exports", "./signalRoot", "../dataModelBase", "../dataModelInterface", "./signalCategory", "../../framework/events", "./eventSignalManagerDataChangedArgs", "../common/signal/serieContainer", "./signalManagerCalculationInputData", "../../common/persistence/settings", "./signalManagerDataModelSettingIds"], function (require, exports, signalRoot_1, dataModelBase_1, dataModelInterface_1, signalCategory_1, events_1, eventSignalManagerDataChangedArgs_1, serieContainer_1, signalManagerCalculationInputData_1, settings_1, signalManagerDataModelSettingIds_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventSignalRemoved = /** @class */ (function (_super) {
        __extends(EventSignalRemoved, _super);
        function EventSignalRemoved() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventSignalRemoved;
    }(events_1.TypedEvent));
    ;
    var SignalManagerDataModel = /** @class */ (function (_super) {
        __extends(SignalManagerDataModel, _super);
        function SignalManagerDataModel() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.eventSignalRemoved = new EventSignalRemoved();
            _this._supressUpdate = false;
            _this._editModeActive = false;
            _this._dataChangedHandler = function (sender, args) { return _this.onDataChanged(sender, args); };
            _this._settingsId = "categories";
            return _this;
        }
        Object.defineProperty(SignalManagerDataModel.prototype, "data", {
            get: function () {
                return this._signalManagerData.childs;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignalManagerDataModel.prototype, "editModeActive", {
            /**
             * Returns the information if the datamodel provides data for the edit mode
             *
             * @type {boolean}
             * @memberof SignalManagerDataModel
             */
            get: function () {
                return this._editModeActive;
            },
            /**
             * Sets the information if the datamodel should provide the data for "edit mode" or "normal mode"
             *
             * @memberof SignalManagerDataModel
             */
            set: function (value) {
                this._editModeActive = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Initialization of the signalmanager datamodel
         *
         * @memberof SignalManagerDataModel
         */
        SignalManagerDataModel.prototype.initialize = function () {
            this._signalManagerData = new signalRoot_1.SignalRoot(this);
            this._signalManagerData.eventDataChanged.attach(this._dataChangedHandler);
            _super.prototype.initialize.call(this);
        };
        SignalManagerDataModel.prototype.initializeComponent = function () {
            this.component.disablePersisting();
        };
        SignalManagerDataModel.prototype.dispose = function () {
            // Bugfix to avoid use of not unbinded datamodel
            this["disposed"] = true;
            _super.prototype.dispose.call(this);
            this._signalManagerData.eventDataChanged.detach(this._dataChangedHandler);
            this.clear();
        };
        /**
         * Removes all data from datamodel (excepting the root categories)
         *
         * @memberof SignalManagerDataModel
         */
        SignalManagerDataModel.prototype.clear = function () {
            this._supressUpdate = true;
            this._signalManagerData.clear();
            this._supressUpdate = false;
            this.raiseModelChangedEvent(new eventSignalManagerDataChangedArgs_1.EventSignalManagerDataChangedArgs(eventSignalManagerDataChangedArgs_1.SignalManagerAction.clearAll, ""));
        };
        SignalManagerDataModel.prototype.getComponentSettings = function () {
            var storingData = new Array();
            // get the settings from the categories
            for (var i = 0; i < this.data.length; i++) {
                var category = this.data[i];
                storingData.push(category.getSettings());
            }
            // add some component settings(e.g. categories with serie groups)
            this.component.setSetting(this._settingsId, storingData);
            return _super.prototype.getComponentSettings.call(this);
        };
        SignalManagerDataModel.prototype.setComponentSettings = function (componentSettings) {
            // Remove all old data
            this.clear();
            // Set the settings to the base class
            _super.prototype.setComponentSettings.call(this, componentSettings);
            // Set the settings to the categories
            var importCategories = this.component.getSetting(this._settingsId);
            for (var i = 0; i < importCategories.length; i++) {
                var importCategory = importCategories[i];
                var settings = settings_1.Settings.create(importCategory);
                var category = this.getSignalCategory(settings.getValue(signalManagerDataModelSettingIds_1.SettingIds.CategoryId));
                if (category != undefined) {
                    category.setSettings(importCategory);
                }
            }
        };
        /**
         * Adds a signal container to the datamodel (into the given category) // TODO: implement subcategory
         *
         * @param {ISerieContainer} serieContainer
         * @param {string} categoryId
         * @memberof SignalManagerDataModel
         */
        SignalManagerDataModel.prototype.addSerieContainer = function (serieContainer, categoryId) {
            for (var i = 0; i < this._signalManagerData.childs.length; i++) {
                if (this._signalManagerData.childs[i].id == categoryId) {
                    this._signalManagerData.childs[i].addSerieContainer(serieContainer, 0);
                }
            }
        };
        /**
         * Removes the given signal container from the datamodel
         *
         * @param {ISerieContainer} serieContainer
         * @memberof SignalManagerDataModel
         */
        SignalManagerDataModel.prototype.removeSerieContainer = function (serieContainer) {
            // Remove SerieContainer from category node ...
            this._signalManagerData.childs.forEach(function (category) {
                category.removeSerieContainer(serieContainer);
            });
        };
        /**
        * Adds a uploaded serie group to the datamodel(into recent category and creates a clone to all uploaded category )
        *
        * @param {ISerieGroup} serieGroup
        * @memberof SignalManagerDataModel
        */
        SignalManagerDataModel.prototype.addUploadedSerieGroup = function (serieGroup) {
            var subCategoryRecent = this.getSignalCategory(signalCategory_1.SignalCategory.CategoryIdRecent);
            var subCategoryAll = this.getSignalCategory(signalCategory_1.SignalCategory.CategoryIdUploaded);
            if (subCategoryRecent != undefined && subCategoryAll != undefined) {
                var serieGroupClone = void 0;
                if (subCategoryRecent.getChilds().length > 0) { // Copy latest uploaded data to all if available
                    var latestSerieGroup = subCategoryRecent.getChilds()[0];
                    latestSerieGroup.mergeWithSerieGroup(serieGroup);
                    serieGroupClone = latestSerieGroup.clone();
                }
                else { // Add uploaded data to "recent" and clone to "all"
                    subCategoryRecent.addSerieContainer(serieGroup, -1);
                    serieGroupClone = serieGroup.clone();
                }
                subCategoryAll.addSerieContainer(serieGroupClone, 0);
                // TODO: Calculate after clone
            }
        };
        /**
         * Returns the signal category with the given id // TODO: implement recursive, not only 2 levels
         *
         * @param {string} id
         * @returns {(ISignalCategory|undefined)}
         * @memberof SignalManagerDataModel
         */
        SignalManagerDataModel.prototype.getSignalCategory = function (id) {
            var signalCategory;
            this.data.forEach(function (child) {
                if (child.id == id) {
                    signalCategory = child;
                }
                else {
                    child.getChilds().forEach(function (subChild) {
                        if (subChild instanceof signalCategory_1.SignalCategory) {
                            if (subChild.id == id) {
                                signalCategory = subChild;
                            }
                        }
                    });
                }
            });
            return signalCategory;
        };
        /**
         * Removes the given serieNode
         *
         * @param {ISerieNode} serieNode
         * @memberof SignalManagerDataModel
         */
        SignalManagerDataModel.prototype.removeSerieNode = function (serieNode) {
            this._signalManagerData.childs.forEach(function (category) {
                category.removeSerieNode(serieNode);
            });
        };
        /**
         * Executed when some data was changed(signal or signalcontainer added or removed)
         *
         * @private
         * @param {*} sender
         * @param {EventSignalManagerDataChangedArgs} args
         * @memberof SignalManagerDataModel
         */
        SignalManagerDataModel.prototype.onDataChanged = function (sender, args) {
            var _this = this;
            if (args.action == eventSignalManagerDataChangedArgs_1.SignalManagerAction.remove) {
                if (args.data instanceof serieContainer_1.SerieContainer) {
                    args.data.getSeries().forEach(function (serie) {
                        _this.onSerieRemoved(serie);
                    });
                }
                else {
                    // send serie removed event
                    var serieNode = args.data;
                    if (serieNode != undefined && !(serieNode instanceof signalManagerCalculationInputData_1.SignalManagerCalculationInputData)) {
                        this.onSerieRemoved(serieNode.serie);
                    }
                }
            }
            if (this._supressUpdate == false) {
                this.raiseModelChangedEvent(args);
            }
        };
        /**
         * Raises the model changed event
         *
         * @private
         * @memberof SignalManagerDataModel
         */
        SignalManagerDataModel.prototype.raiseModelChangedEvent = function (args) {
            // e.g. updates the signal manager widget
            var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, args.action, this.data);
            this.onModelChanged(this, eventArgs);
        };
        /**
         * Raises the signal removed event
         *
         * @private
         * @param {BaseSeries} serie
         * @memberof SignalManagerDataModel
         */
        SignalManagerDataModel.prototype.onSerieRemoved = function (serie) {
            if (serie != undefined) {
                this.eventSignalRemoved.raise(this, serie);
            }
        };
        return SignalManagerDataModel;
    }(dataModelBase_1.DataModelBase));
    exports.SignalManagerDataModel = SignalManagerDataModel;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsTWFuYWdlckRhdGFNb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvc2lnbmFsTWFuYWdlckRhdGFNb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBb0JBO1FBQWlDLHNDQUErQztRQUFoRjs7UUFBa0YsQ0FBQztRQUFELHlCQUFDO0lBQUQsQ0FBQyxBQUFuRixDQUFpQyxtQkFBVSxHQUF3QztJQUFBLENBQUM7SUFFcEY7UUFBNEMsMENBQWE7UUFBekQ7WUFBQSxxRUFxUEM7WUFuUEMsd0JBQWtCLEdBQXVCLElBQUksa0JBQWtCLEVBQUUsQ0FBQztZQUcxRCxvQkFBYyxHQUFhLEtBQUssQ0FBQztZQUNqQyxxQkFBZSxHQUFZLEtBQUssQ0FBQztZQUVqQyx5QkFBbUIsR0FBRyxVQUFDLE1BQU0sRUFBRSxJQUFJLElBQUksT0FBQSxLQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsRUFBL0IsQ0FBK0IsQ0FBQztZQUU5RCxpQkFBVyxHQUFHLFlBQVksQ0FBQzs7UUEyTzlDLENBQUM7UUF6T0Msc0JBQVcsd0NBQUk7aUJBQWY7Z0JBQ0UsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDO1lBQ3hDLENBQUM7OztXQUFBO1FBUUQsc0JBQVcsa0RBQWM7WUFOekI7Ozs7O2VBS0c7aUJBQ0g7Z0JBQ0UsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO1lBQzlCLENBQUM7WUFFRDs7OztlQUlHO2lCQUNILFVBQTBCLEtBQWM7Z0JBQ3RDLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1lBQy9CLENBQUM7OztXQVRBO1FBV0Q7Ozs7V0FJRztRQUNILDJDQUFVLEdBQVY7WUFDRSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSx1QkFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDMUUsaUJBQU0sVUFBVSxXQUFFLENBQUM7UUFDckIsQ0FBQztRQUVELG9EQUFtQixHQUFuQjtZQUNFLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUNyQyxDQUFDO1FBRUQsd0NBQU8sR0FBUDtZQUNFLGdEQUFnRDtZQUNoRCxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQ3hCLGlCQUFNLE9BQU8sV0FBRSxDQUFDO1lBQ2hCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDMUUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2YsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSCxzQ0FBSyxHQUFMO1lBQ0UsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7WUFDM0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2hDLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1lBQzVCLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLHFFQUFpQyxDQUFDLHVEQUFtQixDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZHLENBQUM7UUFFRCxxREFBb0IsR0FBcEI7WUFDRSxJQUFJLFdBQVcsR0FBRyxJQUFJLEtBQUssRUFBYSxDQUFDO1lBQ3pDLHVDQUF1QztZQUN2QyxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQ3ZDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFvQixDQUFDO2dCQUMvQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO2FBQzFDO1lBQ0QsaUVBQWlFO1lBQ2pFLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFDekQsT0FBTyxpQkFBTSxvQkFBb0IsV0FBRSxDQUFDO1FBQ3RDLENBQUM7UUFFRCxxREFBb0IsR0FBcEIsVUFBcUIsaUJBQW9DO1lBQ3ZELHNCQUFzQjtZQUN0QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFFYixxQ0FBcUM7WUFDckMsaUJBQU0sb0JBQW9CLFlBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUU5QyxxQ0FBcUM7WUFDckMsSUFBSSxnQkFBZ0IsR0FBcUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3JGLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFHLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQy9DLElBQUksY0FBYyxHQUFjLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwRCxJQUFJLFFBQVEsR0FBRyxtQkFBUSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDL0MsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsNkNBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUNoRixJQUFHLFFBQVEsSUFBSSxTQUFTLEVBQUM7b0JBQ3ZCLFFBQVEsQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7aUJBQ3RDO2FBQ0Y7UUFDSCxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0gsa0RBQWlCLEdBQWpCLFVBQWtCLGNBQStCLEVBQUUsVUFBa0I7WUFDbkUsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUMxRCxJQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLFVBQVUsRUFBQztvQkFDcEQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUM7aUJBQ3hFO2FBQ0Y7UUFDSCxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSCxxREFBb0IsR0FBcEIsVUFBcUIsY0FBK0I7WUFDbEQsK0NBQStDO1lBQy9DLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUEsUUFBUTtnQkFDM0MsUUFBUSxDQUFDLG9CQUFvQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ2xELENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQztRQUVEOzs7OztVQUtFO1FBQ0Ysc0RBQXFCLEdBQXJCLFVBQXNCLFVBQXVCO1lBQzNDLElBQUksaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLCtCQUFjLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUNoRixJQUFJLGNBQWMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsK0JBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQy9FLElBQUksaUJBQWlCLElBQUksU0FBUyxJQUFJLGNBQWMsSUFBSSxTQUFTLEVBQUU7Z0JBQy9ELElBQUksZUFBZSxTQUFBLENBQUM7Z0JBQ3BCLElBQUksaUJBQWlCLENBQUMsU0FBUyxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxFQUFFLGdEQUFnRDtvQkFDNUYsSUFBSSxnQkFBZ0IsR0FBRyxpQkFBaUIsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQWdCLENBQUM7b0JBQ3ZFLGdCQUFnQixDQUFDLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUVqRCxlQUFlLEdBQUcsZ0JBQWdCLENBQUMsS0FBSyxFQUFpQixDQUFDO2lCQUM3RDtxQkFDSSxFQUFFLG1EQUFtRDtvQkFDdEQsaUJBQWlCLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3BELGVBQWUsR0FBRyxVQUFVLENBQUMsS0FBSyxFQUFpQixDQUFDO2lCQUN2RDtnQkFDRCxjQUFjLENBQUMsaUJBQWlCLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNyRCw4QkFBOEI7YUFDakM7UUFDSCxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0gsa0RBQWlCLEdBQWpCLFVBQWtCLEVBQVU7WUFDMUIsSUFBSSxjQUF5QyxDQUFDO1lBQzlDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSztnQkFDckIsSUFBRyxLQUFLLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBQztvQkFDaEIsY0FBYyxHQUFHLEtBQUssQ0FBQztpQkFDeEI7cUJBQ0c7b0JBQ0YsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFBLFFBQVE7d0JBQ2hDLElBQUcsUUFBUSxZQUFZLCtCQUFjLEVBQUM7NEJBQ3BDLElBQUcsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUM7Z0NBQ25CLGNBQWMsR0FBRyxRQUFRLENBQUM7NkJBQzNCO3lCQUNGO29CQUNILENBQUMsQ0FBQyxDQUFDO2lCQUNKO1lBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDSCxPQUFPLGNBQWMsQ0FBQztRQUN4QixDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSCxnREFBZSxHQUFmLFVBQWdCLFNBQXFCO1lBQ25DLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUEsUUFBUTtnQkFDN0MsUUFBUSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN0QyxDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0ssOENBQWEsR0FBckIsVUFBc0IsTUFBTSxFQUFFLElBQXVDO1lBQXJFLGlCQWtCQztZQWpCQyxJQUFHLElBQUksQ0FBQyxNQUFNLElBQUksdURBQW1CLENBQUMsTUFBTSxFQUFDO2dCQUMzQyxJQUFHLElBQUksQ0FBQyxJQUFJLFlBQVksK0JBQWMsRUFBQztvQkFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLO3dCQUNqQyxLQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUM3QixDQUFDLENBQUMsQ0FBQztpQkFDSjtxQkFDRztvQkFDRiwyQkFBMkI7b0JBQzNCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7b0JBQzFCLElBQUcsU0FBUyxJQUFJLFNBQVMsSUFBSSxDQUFDLENBQUMsU0FBUyxZQUFZLHFFQUFpQyxDQUFDLEVBQUM7d0JBQ3JGLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUN0QztpQkFDRjthQUNGO1lBQ0QsSUFBRyxJQUFJLENBQUMsY0FBYyxJQUFJLEtBQUssRUFBQztnQkFDOUIsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ25DO1FBQ0gsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0ssdURBQXNCLEdBQTlCLFVBQStCLElBQXVDO1lBQ3BFLHlDQUF5QztZQUN6QyxJQUFJLFNBQVMsR0FBRyxJQUFJLDBDQUFxQixDQUFDLElBQUksRUFBRSxvQ0FBZSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0RyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN2QyxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ssK0NBQWMsR0FBdEIsVUFBdUIsS0FBaUI7WUFDdEMsSUFBRyxLQUFLLElBQUksU0FBUyxFQUFDO2dCQUNwQixJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQzthQUM1QztRQUNILENBQUM7UUFDSCw2QkFBQztJQUFELENBQUMsQUFyUEQsQ0FBNEMsNkJBQWEsR0FxUHhEO0lBclBZLHdEQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElTaWduYWxNYW5hZ2VyRGF0YU1vZGVsIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNpZ25hbFJvb3QgfSBmcm9tIFwiLi9zaWduYWxSb290XCI7XHJcbmltcG9ydCB7IERhdGFNb2RlbEJhc2UgfSBmcm9tIFwiLi4vZGF0YU1vZGVsQmFzZVwiO1xyXG5pbXBvcnQgeyBFdmVudE1vZGVsQ2hhbmdlZEFyZ3MsIE1vZGVsQ2hhbmdlVHlwZSB9IGZyb20gXCIuLi9kYXRhTW9kZWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU2lnbmFsQ2F0ZWdvcnkgfSBmcm9tIFwiLi9zaWduYWxDYXRlZ29yeVwiO1xyXG5pbXBvcnQgeyBUeXBlZEV2ZW50IH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9ldmVudHNcIjtcclxuaW1wb3J0IHsgRXZlbnRTaWduYWxNYW5hZ2VyRGF0YUNoYW5nZWRBcmdzLCBTaWduYWxNYW5hZ2VyQWN0aW9uIH0gZnJvbSBcIi4vZXZlbnRTaWduYWxNYW5hZ2VyRGF0YUNoYW5nZWRBcmdzXCI7XHJcbmltcG9ydCB7IElTZXJpZUNvbnRhaW5lciB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy9zZXJpZUNvbnRhaW5lckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTZXJpZUNvbnRhaW5lciB9IGZyb20gXCIuLi9jb21tb24vc2lnbmFsL3NlcmllQ29udGFpbmVyXCI7XHJcbmltcG9ydCB7IElTaWduYWxDYXRlZ29yeSB9IGZyb20gXCIuL2ludGVyZmFjZXMvc2lnbmFsQ2F0ZWdvcnlJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVNlcmllTm9kZSB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy9zZXJpZU5vZGVJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQmFzZVNlcmllcyB9IGZyb20gXCIuLi9jaGFydE1hbmFnZXJEYXRhTW9kZWwvYmFzZVNlcmllc1wiO1xyXG5pbXBvcnQgeyBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGEgfSBmcm9tIFwiLi9zaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGFcIjtcclxuaW1wb3J0IHsgSVNlcmllR3JvdXAgfSBmcm9tIFwiLi4vY29tbW9uL2ludGVyZmFjZXMvc2VyaWVHcm91cEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnRTZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBJU2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3BlcnNpc3RlbmNlL2ludGVyZmFjZXMvc2V0dGluZ3NJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3BlcnNpc3RlbmNlL3NldHRpbmdzXCI7XHJcbmltcG9ydCB7IFNldHRpbmdJZHMgfSBmcm9tIFwiLi9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsU2V0dGluZ0lkc1wiO1xyXG5cclxuXHJcbmNsYXNzIEV2ZW50U2lnbmFsUmVtb3ZlZCBleHRlbmRzIFR5cGVkRXZlbnQ8SVNpZ25hbE1hbmFnZXJEYXRhTW9kZWwsIEJhc2VTZXJpZXM+eyB9O1xyXG5cclxuZXhwb3J0IGNsYXNzIFNpZ25hbE1hbmFnZXJEYXRhTW9kZWwgZXh0ZW5kcyBEYXRhTW9kZWxCYXNlIGltcGxlbWVudHMgSVNpZ25hbE1hbmFnZXJEYXRhTW9kZWx7XHJcbiAgICAgIFxyXG4gIGV2ZW50U2lnbmFsUmVtb3ZlZDogRXZlbnRTaWduYWxSZW1vdmVkID0gbmV3IEV2ZW50U2lnbmFsUmVtb3ZlZCgpO1xyXG4gIFxyXG4gIHByaXZhdGUgX3NpZ25hbE1hbmFnZXJEYXRhITogU2lnbmFsUm9vdDtcclxuICBwcml2YXRlIF9zdXByZXNzVXBkYXRlOiAgYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHByaXZhdGUgX2VkaXRNb2RlQWN0aXZlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgXHJcbiAgcHJpdmF0ZSBfZGF0YUNoYW5nZWRIYW5kbGVyID0gKHNlbmRlciwgYXJncyk9PiB0aGlzLm9uRGF0YUNoYW5nZWQoc2VuZGVyLGFyZ3MpO1xyXG5cclxuICBwcml2YXRlIHJlYWRvbmx5IF9zZXR0aW5nc0lkID0gXCJjYXRlZ29yaWVzXCI7XHJcblxyXG4gIHB1YmxpYyBnZXQgZGF0YSgpIHtcclxuICAgIHJldHVybiB0aGlzLl9zaWduYWxNYW5hZ2VyRGF0YS5jaGlsZHM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBpbmZvcm1hdGlvbiBpZiB0aGUgZGF0YW1vZGVsIHByb3ZpZGVzIGRhdGEgZm9yIHRoZSBlZGl0IG1vZGVcclxuICAgKlxyXG4gICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgcHVibGljIGdldCBlZGl0TW9kZUFjdGl2ZSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9lZGl0TW9kZUFjdGl2ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgdGhlIGluZm9ybWF0aW9uIGlmIHRoZSBkYXRhbW9kZWwgc2hvdWxkIHByb3ZpZGUgdGhlIGRhdGEgZm9yIFwiZWRpdCBtb2RlXCIgb3IgXCJub3JtYWwgbW9kZVwiXHJcbiAgICpcclxuICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIHB1YmxpYyBzZXQgZWRpdE1vZGVBY3RpdmUodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX2VkaXRNb2RlQWN0aXZlID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbml0aWFsaXphdGlvbiBvZiB0aGUgc2lnbmFsbWFuYWdlciBkYXRhbW9kZWxcclxuICAgKlxyXG4gICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgaW5pdGlhbGl6ZSgpIHtcclxuICAgIHRoaXMuX3NpZ25hbE1hbmFnZXJEYXRhID0gbmV3IFNpZ25hbFJvb3QodGhpcyk7XHJcbiAgICB0aGlzLl9zaWduYWxNYW5hZ2VyRGF0YS5ldmVudERhdGFDaGFuZ2VkLmF0dGFjaCh0aGlzLl9kYXRhQ2hhbmdlZEhhbmRsZXIpO1xyXG4gICAgc3VwZXIuaW5pdGlhbGl6ZSgpO1xyXG4gIH1cclxuXHJcbiAgaW5pdGlhbGl6ZUNvbXBvbmVudCgpe1xyXG4gICAgdGhpcy5jb21wb25lbnQuZGlzYWJsZVBlcnNpc3RpbmcoKTtcclxuICB9XHJcblxyXG4gIGRpc3Bvc2UoKXtcclxuICAgIC8vIEJ1Z2ZpeCB0byBhdm9pZCB1c2Ugb2Ygbm90IHVuYmluZGVkIGRhdGFtb2RlbFxyXG4gICAgdGhpc1tcImRpc3Bvc2VkXCJdID0gdHJ1ZTtcclxuICAgIHN1cGVyLmRpc3Bvc2UoKTtcclxuICAgIHRoaXMuX3NpZ25hbE1hbmFnZXJEYXRhLmV2ZW50RGF0YUNoYW5nZWQuZGV0YWNoKHRoaXMuX2RhdGFDaGFuZ2VkSGFuZGxlcik7XHJcbiAgICB0aGlzLmNsZWFyKCk7XHJcbiAgfVxyXG4gIFxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZXMgYWxsIGRhdGEgZnJvbSBkYXRhbW9kZWwgKGV4Y2VwdGluZyB0aGUgcm9vdCBjYXRlZ29yaWVzKVxyXG4gICAqXHJcbiAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBjbGVhcigpe1xyXG4gICAgdGhpcy5fc3VwcmVzc1VwZGF0ZSA9IHRydWU7XHJcbiAgICB0aGlzLl9zaWduYWxNYW5hZ2VyRGF0YS5jbGVhcigpO1xyXG4gICAgdGhpcy5fc3VwcmVzc1VwZGF0ZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5yYWlzZU1vZGVsQ2hhbmdlZEV2ZW50KG5ldyBFdmVudFNpZ25hbE1hbmFnZXJEYXRhQ2hhbmdlZEFyZ3MoU2lnbmFsTWFuYWdlckFjdGlvbi5jbGVhckFsbCwgXCJcIikpO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q29tcG9uZW50U2V0dGluZ3MoKTogQ29tcG9uZW50U2V0dGluZ3Mge1xyXG4gICAgbGV0IHN0b3JpbmdEYXRhID0gbmV3IEFycmF5PElTZXR0aW5ncz4oKTtcclxuICAgIC8vIGdldCB0aGUgc2V0dGluZ3MgZnJvbSB0aGUgY2F0ZWdvcmllc1xyXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuZGF0YS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgIGxldCBjYXRlZ29yeSA9IHRoaXMuZGF0YVtpXSBhcyBJU2lnbmFsQ2F0ZWdvcnk7XHJcbiAgICAgIHN0b3JpbmdEYXRhLnB1c2goY2F0ZWdvcnkuZ2V0U2V0dGluZ3MoKSk7XHJcbiAgICB9XHJcbiAgICAvLyBhZGQgc29tZSBjb21wb25lbnQgc2V0dGluZ3MoZS5nLiBjYXRlZ29yaWVzIHdpdGggc2VyaWUgZ3JvdXBzKVxyXG4gICAgdGhpcy5jb21wb25lbnQuc2V0U2V0dGluZyh0aGlzLl9zZXR0aW5nc0lkLCBzdG9yaW5nRGF0YSk7XHJcbiAgICByZXR1cm4gc3VwZXIuZ2V0Q29tcG9uZW50U2V0dGluZ3MoKTtcclxuICB9XHJcbiAgIFxyXG4gIHNldENvbXBvbmVudFNldHRpbmdzKGNvbXBvbmVudFNldHRpbmdzOiBDb21wb25lbnRTZXR0aW5ncykge1xyXG4gICAgLy8gUmVtb3ZlIGFsbCBvbGQgZGF0YVxyXG4gICAgdGhpcy5jbGVhcigpO1xyXG4gICAgXHJcbiAgICAvLyBTZXQgdGhlIHNldHRpbmdzIHRvIHRoZSBiYXNlIGNsYXNzXHJcbiAgICBzdXBlci5zZXRDb21wb25lbnRTZXR0aW5ncyhjb21wb25lbnRTZXR0aW5ncyk7XHJcblxyXG4gICAgLy8gU2V0IHRoZSBzZXR0aW5ncyB0byB0aGUgY2F0ZWdvcmllc1xyXG4gICAgbGV0IGltcG9ydENhdGVnb3JpZXM6IEFycmF5PElTZXR0aW5ncz4gPSB0aGlzLmNvbXBvbmVudC5nZXRTZXR0aW5nKHRoaXMuX3NldHRpbmdzSWQpO1xyXG4gICAgZm9yKGxldCBpID0gMCA7IGkgPCBpbXBvcnRDYXRlZ29yaWVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgbGV0IGltcG9ydENhdGVnb3J5OiBJU2V0dGluZ3MgPSBpbXBvcnRDYXRlZ29yaWVzW2ldO1xyXG4gICAgICBsZXQgc2V0dGluZ3MgPSBTZXR0aW5ncy5jcmVhdGUoaW1wb3J0Q2F0ZWdvcnkpO1xyXG4gICAgICBsZXQgY2F0ZWdvcnkgPSB0aGlzLmdldFNpZ25hbENhdGVnb3J5KHNldHRpbmdzLmdldFZhbHVlKFNldHRpbmdJZHMuQ2F0ZWdvcnlJZCkpO1xyXG4gICAgICBpZihjYXRlZ29yeSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgIGNhdGVnb3J5LnNldFNldHRpbmdzKGltcG9ydENhdGVnb3J5KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkcyBhIHNpZ25hbCBjb250YWluZXIgdG8gdGhlIGRhdGFtb2RlbCAoaW50byB0aGUgZ2l2ZW4gY2F0ZWdvcnkpIC8vIFRPRE86IGltcGxlbWVudCBzdWJjYXRlZ29yeVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtJU2VyaWVDb250YWluZXJ9IHNlcmllQ29udGFpbmVyXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNhdGVnb3J5SWRcclxuICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIGFkZFNlcmllQ29udGFpbmVyKHNlcmllQ29udGFpbmVyOiBJU2VyaWVDb250YWluZXIsIGNhdGVnb3J5SWQ6IHN0cmluZyl7XHJcbiAgICBmb3IobGV0IGk9MDsgaSA8IHRoaXMuX3NpZ25hbE1hbmFnZXJEYXRhLmNoaWxkcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgIGlmKHRoaXMuX3NpZ25hbE1hbmFnZXJEYXRhLmNoaWxkc1tpXS5pZCA9PSBjYXRlZ29yeUlkKXtcclxuICAgICAgICB0aGlzLl9zaWduYWxNYW5hZ2VyRGF0YS5jaGlsZHNbaV0uYWRkU2VyaWVDb250YWluZXIoc2VyaWVDb250YWluZXIsIDApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmVzIHRoZSBnaXZlbiBzaWduYWwgY29udGFpbmVyIGZyb20gdGhlIGRhdGFtb2RlbFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtJU2VyaWVDb250YWluZXJ9IHNlcmllQ29udGFpbmVyXHJcbiAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICByZW1vdmVTZXJpZUNvbnRhaW5lcihzZXJpZUNvbnRhaW5lcjogSVNlcmllQ29udGFpbmVyKXtcclxuICAgIC8vIFJlbW92ZSBTZXJpZUNvbnRhaW5lciBmcm9tIGNhdGVnb3J5IG5vZGUgLi4uXHJcbiAgICB0aGlzLl9zaWduYWxNYW5hZ2VyRGF0YS5jaGlsZHMuZm9yRWFjaChjYXRlZ29yeSA9PiB7XHJcbiAgICAgICAgY2F0ZWdvcnkucmVtb3ZlU2VyaWVDb250YWluZXIoc2VyaWVDb250YWluZXIpO1xyXG4gICAgfSlcclxuICB9XHJcbiAgXHJcbiAgLyoqXHJcbiAgKiBBZGRzIGEgdXBsb2FkZWQgc2VyaWUgZ3JvdXAgdG8gdGhlIGRhdGFtb2RlbChpbnRvIHJlY2VudCBjYXRlZ29yeSBhbmQgY3JlYXRlcyBhIGNsb25lIHRvIGFsbCB1cGxvYWRlZCBjYXRlZ29yeSApXHJcbiAgKlxyXG4gICogQHBhcmFtIHtJU2VyaWVHcm91cH0gc2VyaWVHcm91cFxyXG4gICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJEYXRhTW9kZWxcclxuICAqL1xyXG4gIGFkZFVwbG9hZGVkU2VyaWVHcm91cChzZXJpZUdyb3VwOiBJU2VyaWVHcm91cCkge1xyXG4gICAgbGV0IHN1YkNhdGVnb3J5UmVjZW50ID0gdGhpcy5nZXRTaWduYWxDYXRlZ29yeShTaWduYWxDYXRlZ29yeS5DYXRlZ29yeUlkUmVjZW50KTtcclxuICAgIGxldCBzdWJDYXRlZ29yeUFsbCA9IHRoaXMuZ2V0U2lnbmFsQ2F0ZWdvcnkoU2lnbmFsQ2F0ZWdvcnkuQ2F0ZWdvcnlJZFVwbG9hZGVkKTtcclxuICAgIGlmIChzdWJDYXRlZ29yeVJlY2VudCAhPSB1bmRlZmluZWQgJiYgc3ViQ2F0ZWdvcnlBbGwgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgbGV0IHNlcmllR3JvdXBDbG9uZTtcclxuICAgICAgICBpZiAoc3ViQ2F0ZWdvcnlSZWNlbnQuZ2V0Q2hpbGRzKCkubGVuZ3RoID4gMCkgeyAvLyBDb3B5IGxhdGVzdCB1cGxvYWRlZCBkYXRhIHRvIGFsbCBpZiBhdmFpbGFibGVcclxuICAgICAgICAgICAgbGV0IGxhdGVzdFNlcmllR3JvdXAgPSBzdWJDYXRlZ29yeVJlY2VudC5nZXRDaGlsZHMoKVswXSBhcyBJU2VyaWVHcm91cDtcclxuICAgICAgICAgICAgbGF0ZXN0U2VyaWVHcm91cC5tZXJnZVdpdGhTZXJpZUdyb3VwKHNlcmllR3JvdXApO1xyXG5cclxuICAgICAgICAgICAgc2VyaWVHcm91cENsb25lID0gbGF0ZXN0U2VyaWVHcm91cC5jbG9uZSgpIGFzIElTZXJpZUdyb3VwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHsgLy8gQWRkIHVwbG9hZGVkIGRhdGEgdG8gXCJyZWNlbnRcIiBhbmQgY2xvbmUgdG8gXCJhbGxcIlxyXG4gICAgICAgICAgICBzdWJDYXRlZ29yeVJlY2VudC5hZGRTZXJpZUNvbnRhaW5lcihzZXJpZUdyb3VwLCAtMSk7XHJcbiAgICAgICAgICAgIHNlcmllR3JvdXBDbG9uZSA9IHNlcmllR3JvdXAuY2xvbmUoKSBhcyBJU2VyaWVHcm91cDtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3ViQ2F0ZWdvcnlBbGwuYWRkU2VyaWVDb250YWluZXIoc2VyaWVHcm91cENsb25lLCAwKTtcclxuICAgICAgICAvLyBUT0RPOiBDYWxjdWxhdGUgYWZ0ZXIgY2xvbmVcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIHNpZ25hbCBjYXRlZ29yeSB3aXRoIHRoZSBnaXZlbiBpZCAvLyBUT0RPOiBpbXBsZW1lbnQgcmVjdXJzaXZlLCBub3Qgb25seSAyIGxldmVsc1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICogQHJldHVybnMgeyhJU2lnbmFsQ2F0ZWdvcnl8dW5kZWZpbmVkKX1cclxuICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIGdldFNpZ25hbENhdGVnb3J5KGlkOiBzdHJpbmcpOiBJU2lnbmFsQ2F0ZWdvcnl8dW5kZWZpbmVke1xyXG4gICAgbGV0IHNpZ25hbENhdGVnb3J5OiBJU2lnbmFsQ2F0ZWdvcnl8dW5kZWZpbmVkO1xyXG4gICAgdGhpcy5kYXRhLmZvckVhY2goY2hpbGQgPT4ge1xyXG4gICAgICBpZihjaGlsZC5pZCA9PSBpZCl7XHJcbiAgICAgICAgc2lnbmFsQ2F0ZWdvcnkgPSBjaGlsZDtcclxuICAgICAgfVxyXG4gICAgICBlbHNle1xyXG4gICAgICAgIGNoaWxkLmdldENoaWxkcygpLmZvckVhY2goc3ViQ2hpbGQgPT4ge1xyXG4gICAgICAgICAgaWYoc3ViQ2hpbGQgaW5zdGFuY2VvZiBTaWduYWxDYXRlZ29yeSl7XHJcbiAgICAgICAgICAgIGlmKHN1YkNoaWxkLmlkID09IGlkKXtcclxuICAgICAgICAgICAgICBzaWduYWxDYXRlZ29yeSA9IHN1YkNoaWxkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHNpZ25hbENhdGVnb3J5O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlcyB0aGUgZ2l2ZW4gc2VyaWVOb2RlXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0lTZXJpZU5vZGV9IHNlcmllTm9kZVxyXG4gICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgcmVtb3ZlU2VyaWVOb2RlKHNlcmllTm9kZTogSVNlcmllTm9kZSl7XHJcbiAgICB0aGlzLl9zaWduYWxNYW5hZ2VyRGF0YS5jaGlsZHMuZm9yRWFjaChjYXRlZ29yeSA9PiB7XHJcbiAgICAgIGNhdGVnb3J5LnJlbW92ZVNlcmllTm9kZShzZXJpZU5vZGUpO1xyXG4gICAgfSkgICAgXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFeGVjdXRlZCB3aGVuIHNvbWUgZGF0YSB3YXMgY2hhbmdlZChzaWduYWwgb3Igc2lnbmFsY29udGFpbmVyIGFkZGVkIG9yIHJlbW92ZWQpXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIEBwYXJhbSB7Kn0gc2VuZGVyXHJcbiAgICogQHBhcmFtIHtFdmVudFNpZ25hbE1hbmFnZXJEYXRhQ2hhbmdlZEFyZ3N9IGFyZ3NcclxuICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25EYXRhQ2hhbmdlZChzZW5kZXIsIGFyZ3M6IEV2ZW50U2lnbmFsTWFuYWdlckRhdGFDaGFuZ2VkQXJncyl7XHJcbiAgICBpZihhcmdzLmFjdGlvbiA9PSBTaWduYWxNYW5hZ2VyQWN0aW9uLnJlbW92ZSl7XHJcbiAgICAgIGlmKGFyZ3MuZGF0YSBpbnN0YW5jZW9mIFNlcmllQ29udGFpbmVyKXtcclxuICAgICAgICBhcmdzLmRhdGEuZ2V0U2VyaWVzKCkuZm9yRWFjaChzZXJpZSA9PiB7XHJcbiAgICAgICAgICB0aGlzLm9uU2VyaWVSZW1vdmVkKHNlcmllKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICBlbHNle1xyXG4gICAgICAgIC8vIHNlbmQgc2VyaWUgcmVtb3ZlZCBldmVudFxyXG4gICAgICAgIGxldCBzZXJpZU5vZGUgPSBhcmdzLmRhdGE7XHJcbiAgICAgICAgaWYoc2VyaWVOb2RlICE9IHVuZGVmaW5lZCAmJiAhKHNlcmllTm9kZSBpbnN0YW5jZW9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YSkpe1xyXG4gICAgICAgICAgdGhpcy5vblNlcmllUmVtb3ZlZChzZXJpZU5vZGUuc2VyaWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYodGhpcy5fc3VwcmVzc1VwZGF0ZSA9PSBmYWxzZSl7XHJcbiAgICAgIHRoaXMucmFpc2VNb2RlbENoYW5nZWRFdmVudChhcmdzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJhaXNlcyB0aGUgbW9kZWwgY2hhbmdlZCBldmVudFxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmFpc2VNb2RlbENoYW5nZWRFdmVudChhcmdzOiBFdmVudFNpZ25hbE1hbmFnZXJEYXRhQ2hhbmdlZEFyZ3Mpe1xyXG4gICAgLy8gZS5nLiB1cGRhdGVzIHRoZSBzaWduYWwgbWFuYWdlciB3aWRnZXRcclxuICAgIGxldCBldmVudEFyZ3MgPSBuZXcgRXZlbnRNb2RlbENoYW5nZWRBcmdzKHRoaXMsIE1vZGVsQ2hhbmdlVHlwZS51cGRhdGVUYXJnZXQsIGFyZ3MuYWN0aW9uLCB0aGlzLmRhdGEpO1xyXG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLCBldmVudEFyZ3MpOyBcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJhaXNlcyB0aGUgc2lnbmFsIHJlbW92ZWQgZXZlbnRcclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogQHBhcmFtIHtCYXNlU2VyaWVzfSBzZXJpZVxyXG4gICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvblNlcmllUmVtb3ZlZChzZXJpZTogQmFzZVNlcmllcykge1xyXG4gICAgaWYoc2VyaWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgdGhpcy5ldmVudFNpZ25hbFJlbW92ZWQucmFpc2UodGhpcywgc2VyaWUpO1xyXG4gICAgfVxyXG4gIH1cclxufSJdfQ==