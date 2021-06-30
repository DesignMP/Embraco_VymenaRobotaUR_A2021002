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
define(["require", "exports", "../dataModelInterface", "../../framework/events", "./eventSignalManagerDataChangedArgs", "./signalManagerCalculationInputData", "../../common/persistence/settings", "./signalManagerDataModelSettingIds", "./signalCategory", "./signalRoot", "../common/signal/serieContainer", "../dataModelBase", "./defaultComponentSettings"], function (require, exports, dataModelInterface_1, events_1, eventSignalManagerDataChangedArgs_1, signalManagerCalculationInputData_1, settings_1, signalManagerDataModelSettingIds_1, signalCategory_1, signalRoot_1, serieContainer_1, dataModelBase_1, defaultComponentSettings_1) {
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
            this.component.defaultSettingsDataId = defaultComponentSettings_1.DefaultComponentSettings.DataModelDefinitionId;
        };
        SignalManagerDataModel.prototype.dispose = function () {
            // Bugfix to avoid use of not unbinded datamodel
            this["disposed"] = true;
            _super.prototype.dispose.call(this);
            this._signalManagerData.eventDataChanged.detach(this._dataChangedHandler);
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
        /**
         * Returns the default component settings for this datamodel
         *
         * @returns {(ComponentSettings|undefined)}
         * @memberof SignalManagerDataModel
         */
        SignalManagerDataModel.prototype.getDefaultComponentSettings = function () {
            return defaultComponentSettings_1.DefaultComponentSettings.getSignalManagerDatamodelDefinition();
        };
        SignalManagerDataModel.prototype.getComponentSettings = function (onlyModified) {
            var storingData = new Array();
            // get the settings from the categories
            for (var i = 0; i < this.data.length; i++) {
                var category = this.data[i];
                storingData.push(category.getSettings());
            }
            // add some component settings(e.g. categories with serie groups)
            this.component.setSetting(this._settingsId, storingData);
            return _super.prototype.getComponentSettings.call(this, onlyModified);
        };
        SignalManagerDataModel.prototype.setComponentSettings = function (componentSettings) {
            // Remove all old data
            this.clear();
            // Set the series Provider
            this.seriesProvider = this.component.getSubComponent(defaultComponentSettings_1.DefaultComponentSettings.SeriesProviderId);
            // Set the settings to the base class
            _super.prototype.setComponentSettings.call(this, componentSettings);
            // Set the settings to the categories
            var importCategories = this.component.getSetting(this._settingsId);
            if (importCategories != undefined) {
                for (var i = 0; i < importCategories.length; i++) {
                    var importCategory = importCategories[i];
                    var settings = settings_1.Settings.create(importCategory);
                    var category = this.getSignalCategory(settings.getValue(signalManagerDataModelSettingIds_1.SettingIds.CategoryId));
                    if (category != undefined) {
                        category.setSettings(importCategory);
                    }
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
                    serieGroupClone = this.getSerieGroupCloned(serieGroup);
                }
                if (serieGroupClone !== undefined) {
                    subCategoryAll.addSerieContainer(serieGroupClone, 0);
                }
                // TODO: Calculate after clone
            }
        };
        /**
         * Get a clone seriegroup just if it is not already in the 'all' folder
         *
         * @param {ISerieGroup} serieGroup
         * @returns {(ISerieGroup | undefined)}
         * @memberof SignalManagerDataModel
         */
        SignalManagerDataModel.prototype.getSerieGroupCloned = function (serieGroup) {
            var allCategory = this.getSignalCategory(signalCategory_1.SignalCategory.CategoryIdUploaded);
            if (allCategory !== undefined) {
                var serieContainer = allCategory.getSerieContainer(serieGroup.name);
                if (serieContainer !== undefined) { //SerieGroup already exists in 'All' Container
                    return undefined;
                }
            }
            return serieGroup.clone();
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
                if (this.seriesProvider != undefined) {
                    this.seriesProvider.remove(serie.id);
                }
            }
        };
        return SignalManagerDataModel;
    }(dataModelBase_1.DataModelBase));
    exports.SignalManagerDataModel = SignalManagerDataModel;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsTWFuYWdlckRhdGFNb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvc2lnbmFsTWFuYWdlckRhdGFNb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBdUJBO1FBQWlDLHNDQUErQztRQUFoRjs7UUFBa0YsQ0FBQztRQUFELHlCQUFDO0lBQUQsQ0FBQyxBQUFuRixDQUFpQyxtQkFBVSxHQUF3QztJQUFBLENBQUM7SUFFcEY7UUFBNEMsMENBQWE7UUFBekQ7WUFBQSxxRUErUkM7WUE3UkMsd0JBQWtCLEdBQXVCLElBQUksa0JBQWtCLEVBQUUsQ0FBQztZQUcxRCxvQkFBYyxHQUFhLEtBQUssQ0FBQztZQUNqQyxxQkFBZSxHQUFZLEtBQUssQ0FBQztZQUVqQyx5QkFBbUIsR0FBRyxVQUFDLE1BQU0sRUFBRSxJQUFJLElBQUksT0FBQSxLQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsRUFBL0IsQ0FBK0IsQ0FBQztZQUU5RCxpQkFBVyxHQUFHLFlBQVksQ0FBQzs7UUFxUjlDLENBQUM7UUFuUkMsc0JBQVcsd0NBQUk7aUJBQWY7Z0JBQ0UsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDO1lBQ3hDLENBQUM7OztXQUFBO1FBVUQsc0JBQVcsa0RBQWM7WUFOekI7Ozs7O2VBS0c7aUJBQ0g7Z0JBQ0UsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO1lBQzlCLENBQUM7WUFFRDs7OztlQUlHO2lCQUNILFVBQTBCLEtBQWM7Z0JBQ3RDLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1lBQy9CLENBQUM7OztXQVRBO1FBV0Q7Ozs7V0FJRztRQUNILDJDQUFVLEdBQVY7WUFDRSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSx1QkFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDMUUsaUJBQU0sVUFBVSxXQUFFLENBQUM7UUFDckIsQ0FBQztRQUVELG9EQUFtQixHQUFuQjtZQUNFLElBQUksQ0FBQyxTQUFTLENBQUMscUJBQXFCLEdBQUcsbURBQXdCLENBQUMscUJBQXFCLENBQUM7UUFDeEYsQ0FBQztRQUVELHdDQUFPLEdBQVA7WUFDRSxnREFBZ0Q7WUFDaEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUN4QixpQkFBTSxPQUFPLFdBQUUsQ0FBQztZQUNoQixJQUFJLENBQUMsa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQzVFLENBQUM7UUFFRDs7OztXQUlHO1FBQ0gsc0NBQUssR0FBTDtZQUNFLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1lBQzNCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNoQyxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztZQUM1QixJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxxRUFBaUMsQ0FBQyx1REFBbUIsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2RyxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSCw0REFBMkIsR0FBM0I7WUFDRSxPQUFPLG1EQUF3QixDQUFDLG1DQUFtQyxFQUFFLENBQUM7UUFDeEUsQ0FBQztRQUVELHFEQUFvQixHQUFwQixVQUFxQixZQUFxQjtZQUN4QyxJQUFJLFdBQVcsR0FBRyxJQUFJLEtBQUssRUFBYSxDQUFDO1lBQ3pDLHVDQUF1QztZQUN2QyxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQ3ZDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFvQixDQUFDO2dCQUMvQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO2FBQzFDO1lBQ0QsaUVBQWlFO1lBQ2pFLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFDekQsT0FBTyxpQkFBTSxvQkFBb0IsWUFBQyxZQUFZLENBQUMsQ0FBQztRQUNsRCxDQUFDO1FBRUQscURBQW9CLEdBQXBCLFVBQXFCLGlCQUFvQztZQUN2RCxzQkFBc0I7WUFDdEIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBRWIsMEJBQTBCO1lBQzFCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsbURBQXdCLENBQUMsZ0JBQWdCLENBQW9CLENBQUM7WUFFbkgscUNBQXFDO1lBQ3JDLGlCQUFNLG9CQUFvQixZQUFDLGlCQUFpQixDQUFDLENBQUM7WUFFOUMscUNBQXFDO1lBQ3JDLElBQUksZ0JBQWdCLEdBQXFCLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNyRixJQUFHLGdCQUFnQixJQUFJLFNBQVMsRUFBQztnQkFDL0IsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUcsQ0FBQyxHQUFHLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztvQkFDL0MsSUFBSSxjQUFjLEdBQWMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3BELElBQUksUUFBUSxHQUFHLG1CQUFRLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO29CQUMvQyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyw2Q0FBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7b0JBQ2hGLElBQUcsUUFBUSxJQUFJLFNBQVMsRUFBQzt3QkFDdkIsUUFBUSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQztxQkFDdEM7aUJBQ0Y7YUFDRjtRQUNILENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSCxrREFBaUIsR0FBakIsVUFBa0IsY0FBK0IsRUFBRSxVQUFrQjtZQUNuRSxLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQzFELElBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksVUFBVSxFQUFDO29CQUNwRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDeEU7YUFDRjtRQUNILENBQUM7UUFFRDs7Ozs7V0FLRztRQUNILHFEQUFvQixHQUFwQixVQUFxQixjQUErQjtZQUNsRCwrQ0FBK0M7WUFDL0MsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQSxRQUFRO2dCQUMzQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDbEQsQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDO1FBRUQ7Ozs7O1VBS0U7UUFDRixzREFBcUIsR0FBckIsVUFBc0IsVUFBdUI7WUFDM0MsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsK0JBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ2hGLElBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQywrQkFBYyxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDL0UsSUFBSSxpQkFBaUIsSUFBSSxTQUFTLElBQUksY0FBYyxJQUFJLFNBQVMsRUFBRTtnQkFDL0QsSUFBSSxlQUFlLFNBQUEsQ0FBQztnQkFFcEIsSUFBSSxpQkFBaUIsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLEVBQUUsZ0RBQWdEO29CQUM1RixJQUFJLGdCQUFnQixHQUFHLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBZ0IsQ0FBQztvQkFDdkUsZ0JBQWdCLENBQUMsbUJBQW1CLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQ2pELGVBQWUsR0FBRyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQWlCLENBQUM7aUJBQzdEO3FCQUNJLEVBQUUsbURBQW1EO29CQUN0RCxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDcEQsZUFBZSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztpQkFDMUQ7Z0JBRUQsSUFBSSxlQUFlLEtBQUssU0FBUyxFQUFFO29CQUNqQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUN0RDtnQkFDRCw4QkFBOEI7YUFDakM7UUFDSCxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0gsb0RBQW1CLEdBQW5CLFVBQW9CLFVBQXVCO1lBQ3pDLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQywrQkFBYyxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDNUUsSUFBSSxXQUFXLEtBQUssU0FBUyxFQUFFO2dCQUM3QixJQUFJLGNBQWMsR0FBRyxXQUFXLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNwRSxJQUFJLGNBQWMsS0FBSyxTQUFTLEVBQUUsRUFBRSw4Q0FBOEM7b0JBQ2hGLE9BQU8sU0FBUyxDQUFDO2lCQUNsQjthQUNGO1lBQ0QsT0FBTyxVQUFVLENBQUMsS0FBSyxFQUFpQixDQUFDO1FBQzNDLENBQUM7UUFHRDs7Ozs7O1dBTUc7UUFDSCxrREFBaUIsR0FBakIsVUFBa0IsRUFBVTtZQUMxQixJQUFJLGNBQXlDLENBQUM7WUFDOUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLO2dCQUNyQixJQUFHLEtBQUssQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFDO29CQUNoQixjQUFjLEdBQUcsS0FBSyxDQUFDO2lCQUN4QjtxQkFDRztvQkFDRixLQUFLLENBQUMsU0FBUyxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQUEsUUFBUTt3QkFDaEMsSUFBRyxRQUFRLFlBQVksK0JBQWMsRUFBQzs0QkFDcEMsSUFBRyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBQztnQ0FDbkIsY0FBYyxHQUFHLFFBQVEsQ0FBQzs2QkFDM0I7eUJBQ0Y7b0JBQ0gsQ0FBQyxDQUFDLENBQUM7aUJBQ0o7WUFDSCxDQUFDLENBQUMsQ0FBQztZQUNILE9BQU8sY0FBYyxDQUFDO1FBQ3hCLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNILGdEQUFlLEdBQWYsVUFBZ0IsU0FBcUI7WUFDbkMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQSxRQUFRO2dCQUM3QyxRQUFRLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3RDLENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSyw4Q0FBYSxHQUFyQixVQUFzQixNQUFNLEVBQUUsSUFBdUM7WUFBckUsaUJBa0JDO1lBakJDLElBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSx1REFBbUIsQ0FBQyxNQUFNLEVBQUM7Z0JBQzNDLElBQUcsSUFBSSxDQUFDLElBQUksWUFBWSwrQkFBYyxFQUFDO29CQUNyQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUs7d0JBQ2pDLEtBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzdCLENBQUMsQ0FBQyxDQUFDO2lCQUNKO3FCQUNHO29CQUNGLDJCQUEyQjtvQkFDM0IsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDMUIsSUFBRyxTQUFTLElBQUksU0FBUyxJQUFJLENBQUMsQ0FBQyxTQUFTLFlBQVkscUVBQWlDLENBQUMsRUFBQzt3QkFDckYsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQ3RDO2lCQUNGO2FBQ0Y7WUFDRCxJQUFHLElBQUksQ0FBQyxjQUFjLElBQUksS0FBSyxFQUFDO2dCQUM5QixJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDbkM7UUFDSCxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSyx1REFBc0IsR0FBOUIsVUFBK0IsSUFBdUM7WUFDcEUseUNBQXlDO1lBQ3pDLElBQUksU0FBUyxHQUFHLElBQUksMENBQXFCLENBQUMsSUFBSSxFQUFFLG9DQUFlLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZDLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSywrQ0FBYyxHQUF0QixVQUF1QixLQUFpQjtZQUN0QyxJQUFHLEtBQUssSUFBSSxTQUFTLEVBQUM7Z0JBQ3BCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUUzQyxJQUFHLElBQUksQ0FBQyxjQUFjLElBQUksU0FBUyxFQUFDO29CQUNsQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQ3RDO2FBQ0Y7UUFDSCxDQUFDO1FBQ0gsNkJBQUM7SUFBRCxDQUFDLEFBL1JELENBQTRDLDZCQUFhLEdBK1J4RDtJQS9SWSx3REFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJU2lnbmFsTWFuYWdlckRhdGFNb2RlbCB9IGZyb20gXCIuL2ludGVyZmFjZXMvc2lnbmFsTWFuYWdlckRhdGFNb2RlbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJU2lnbmFsQ2F0ZWdvcnkgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL3NpZ25hbENhdGVnb3J5SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElTZXJpZU5vZGUgfSBmcm9tIFwiLi4vY29tbW9uL2ludGVyZmFjZXMvc2VyaWVOb2RlSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElTZXJpZUNvbnRhaW5lciB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy9zZXJpZUNvbnRhaW5lckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJU2VyaWVHcm91cCB9IGZyb20gXCIuLi9jb21tb24vaW50ZXJmYWNlcy9zZXJpZUdyb3VwSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vcGVyc2lzdGVuY2UvaW50ZXJmYWNlcy9zZXR0aW5nc0ludGVyZmFjZVwiO1xyXG5cclxuXHJcbmltcG9ydCB7IEV2ZW50TW9kZWxDaGFuZ2VkQXJncywgTW9kZWxDaGFuZ2VUeXBlIH0gZnJvbSBcIi4uL2RhdGFNb2RlbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUeXBlZEV2ZW50IH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9ldmVudHNcIjtcclxuaW1wb3J0IHsgRXZlbnRTaWduYWxNYW5hZ2VyRGF0YUNoYW5nZWRBcmdzLCBTaWduYWxNYW5hZ2VyQWN0aW9uIH0gZnJvbSBcIi4vZXZlbnRTaWduYWxNYW5hZ2VyRGF0YUNoYW5nZWRBcmdzXCI7XHJcbmltcG9ydCB7IFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YSB9IGZyb20gXCIuL3NpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YVwiO1xyXG5pbXBvcnQgeyBTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vcGVyc2lzdGVuY2Uvc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgU2V0dGluZ0lkcyB9IGZyb20gXCIuL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWxTZXR0aW5nSWRzXCI7XHJcbmltcG9ydCB7IFNpZ25hbENhdGVnb3J5IH0gZnJvbSBcIi4vc2lnbmFsQ2F0ZWdvcnlcIjtcclxuaW1wb3J0IHsgU2lnbmFsUm9vdCB9IGZyb20gXCIuL3NpZ25hbFJvb3RcIjtcclxuaW1wb3J0IHsgU2VyaWVDb250YWluZXIgfSBmcm9tIFwiLi4vY29tbW9uL3NpZ25hbC9zZXJpZUNvbnRhaW5lclwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tcG9uZW50QmFzZS9jb21wb25lbnRTZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4uL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9iYXNlU2VyaWVzXCI7XHJcbmltcG9ydCB7IERhdGFNb2RlbEJhc2UgfSBmcm9tIFwiLi4vZGF0YU1vZGVsQmFzZVwiO1xyXG5pbXBvcnQgeyBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MgfSBmcm9tIFwiLi9kZWZhdWx0Q29tcG9uZW50U2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgSVNlcmllc1Byb3ZpZGVyIH0gZnJvbSBcIi4uL2NvbW1vbi9zZXJpZXNQcm92aWRlci9zZXJpZXNQcm92aWRlckludGVyZmFjZVwiO1xyXG5cclxuY2xhc3MgRXZlbnRTaWduYWxSZW1vdmVkIGV4dGVuZHMgVHlwZWRFdmVudDxJU2lnbmFsTWFuYWdlckRhdGFNb2RlbCwgQmFzZVNlcmllcz57IH07XHJcblxyXG5leHBvcnQgY2xhc3MgU2lnbmFsTWFuYWdlckRhdGFNb2RlbCBleHRlbmRzIERhdGFNb2RlbEJhc2UgaW1wbGVtZW50cyBJU2lnbmFsTWFuYWdlckRhdGFNb2RlbHtcclxuICAgICAgXHJcbiAgZXZlbnRTaWduYWxSZW1vdmVkOiBFdmVudFNpZ25hbFJlbW92ZWQgPSBuZXcgRXZlbnRTaWduYWxSZW1vdmVkKCk7XHJcbiAgXHJcbiAgcHJpdmF0ZSBfc2lnbmFsTWFuYWdlckRhdGEhOiBTaWduYWxSb290O1xyXG4gIHByaXZhdGUgX3N1cHJlc3NVcGRhdGU6ICBib29sZWFuID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBfZWRpdE1vZGVBY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBcclxuICBwcml2YXRlIF9kYXRhQ2hhbmdlZEhhbmRsZXIgPSAoc2VuZGVyLCBhcmdzKT0+IHRoaXMub25EYXRhQ2hhbmdlZChzZW5kZXIsYXJncyk7XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgX3NldHRpbmdzSWQgPSBcImNhdGVnb3JpZXNcIjtcclxuXHJcbiAgcHVibGljIGdldCBkYXRhKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3NpZ25hbE1hbmFnZXJEYXRhLmNoaWxkcztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXJpZXNQcm92aWRlcjogSVNlcmllc1Byb3ZpZGVyfHVuZGVmaW5lZDtcclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgaW5mb3JtYXRpb24gaWYgdGhlIGRhdGFtb2RlbCBwcm92aWRlcyBkYXRhIGZvciB0aGUgZWRpdCBtb2RlXHJcbiAgICpcclxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXQgZWRpdE1vZGVBY3RpdmUoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fZWRpdE1vZGVBY3RpdmU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIHRoZSBpbmZvcm1hdGlvbiBpZiB0aGUgZGF0YW1vZGVsIHNob3VsZCBwcm92aWRlIHRoZSBkYXRhIGZvciBcImVkaXQgbW9kZVwiIG9yIFwibm9ybWFsIG1vZGVcIlxyXG4gICAqXHJcbiAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBwdWJsaWMgc2V0IGVkaXRNb2RlQWN0aXZlKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9lZGl0TW9kZUFjdGl2ZSA9IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdGlhbGl6YXRpb24gb2YgdGhlIHNpZ25hbG1hbmFnZXIgZGF0YW1vZGVsXHJcbiAgICpcclxuICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIGluaXRpYWxpemUoKSB7XHJcbiAgICB0aGlzLl9zaWduYWxNYW5hZ2VyRGF0YSA9IG5ldyBTaWduYWxSb290KHRoaXMpO1xyXG4gICAgdGhpcy5fc2lnbmFsTWFuYWdlckRhdGEuZXZlbnREYXRhQ2hhbmdlZC5hdHRhY2godGhpcy5fZGF0YUNoYW5nZWRIYW5kbGVyKTtcclxuICAgIHN1cGVyLmluaXRpYWxpemUoKTtcclxuICB9XHJcblxyXG4gIGluaXRpYWxpemVDb21wb25lbnQoKXtcclxuICAgIHRoaXMuY29tcG9uZW50LmRlZmF1bHRTZXR0aW5nc0RhdGFJZCA9IERlZmF1bHRDb21wb25lbnRTZXR0aW5ncy5EYXRhTW9kZWxEZWZpbml0aW9uSWQ7XHJcbiAgfVxyXG5cclxuICBkaXNwb3NlKCl7XHJcbiAgICAvLyBCdWdmaXggdG8gYXZvaWQgdXNlIG9mIG5vdCB1bmJpbmRlZCBkYXRhbW9kZWxcclxuICAgIHRoaXNbXCJkaXNwb3NlZFwiXSA9IHRydWU7XHJcbiAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgICB0aGlzLl9zaWduYWxNYW5hZ2VyRGF0YS5ldmVudERhdGFDaGFuZ2VkLmRldGFjaCh0aGlzLl9kYXRhQ2hhbmdlZEhhbmRsZXIpO1xyXG4gIH1cclxuICBcclxuICAvKipcclxuICAgKiBSZW1vdmVzIGFsbCBkYXRhIGZyb20gZGF0YW1vZGVsIChleGNlcHRpbmcgdGhlIHJvb3QgY2F0ZWdvcmllcylcclxuICAgKlxyXG4gICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgY2xlYXIoKXtcclxuICAgIHRoaXMuX3N1cHJlc3NVcGRhdGUgPSB0cnVlO1xyXG4gICAgdGhpcy5fc2lnbmFsTWFuYWdlckRhdGEuY2xlYXIoKTtcclxuICAgIHRoaXMuX3N1cHJlc3NVcGRhdGUgPSBmYWxzZTtcclxuICAgIHRoaXMucmFpc2VNb2RlbENoYW5nZWRFdmVudChuZXcgRXZlbnRTaWduYWxNYW5hZ2VyRGF0YUNoYW5nZWRBcmdzKFNpZ25hbE1hbmFnZXJBY3Rpb24uY2xlYXJBbGwsIFwiXCIpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIGRlZmF1bHQgY29tcG9uZW50IHNldHRpbmdzIGZvciB0aGlzIGRhdGFtb2RlbFxyXG4gICAqXHJcbiAgICogQHJldHVybnMgeyhDb21wb25lbnRTZXR0aW5nc3x1bmRlZmluZWQpfVxyXG4gICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgZ2V0RGVmYXVsdENvbXBvbmVudFNldHRpbmdzKCk6IENvbXBvbmVudFNldHRpbmdzfHVuZGVmaW5lZHtcclxuICAgIHJldHVybiBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuZ2V0U2lnbmFsTWFuYWdlckRhdGFtb2RlbERlZmluaXRpb24oKTtcclxuICB9XHJcblxyXG4gIGdldENvbXBvbmVudFNldHRpbmdzKG9ubHlNb2RpZmllZDogYm9vbGVhbik6IENvbXBvbmVudFNldHRpbmdzIHtcclxuICAgIGxldCBzdG9yaW5nRGF0YSA9IG5ldyBBcnJheTxJU2V0dGluZ3M+KCk7XHJcbiAgICAvLyBnZXQgdGhlIHNldHRpbmdzIGZyb20gdGhlIGNhdGVnb3JpZXNcclxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmRhdGEubGVuZ3RoOyBpKyspe1xyXG4gICAgICBsZXQgY2F0ZWdvcnkgPSB0aGlzLmRhdGFbaV0gYXMgSVNpZ25hbENhdGVnb3J5O1xyXG4gICAgICBzdG9yaW5nRGF0YS5wdXNoKGNhdGVnb3J5LmdldFNldHRpbmdzKCkpO1xyXG4gICAgfVxyXG4gICAgLy8gYWRkIHNvbWUgY29tcG9uZW50IHNldHRpbmdzKGUuZy4gY2F0ZWdvcmllcyB3aXRoIHNlcmllIGdyb3VwcylcclxuICAgIHRoaXMuY29tcG9uZW50LnNldFNldHRpbmcodGhpcy5fc2V0dGluZ3NJZCwgc3RvcmluZ0RhdGEpO1xyXG4gICAgcmV0dXJuIHN1cGVyLmdldENvbXBvbmVudFNldHRpbmdzKG9ubHlNb2RpZmllZCk7XHJcbiAgfVxyXG4gICBcclxuICBzZXRDb21wb25lbnRTZXR0aW5ncyhjb21wb25lbnRTZXR0aW5nczogQ29tcG9uZW50U2V0dGluZ3MpIHtcclxuICAgIC8vIFJlbW92ZSBhbGwgb2xkIGRhdGFcclxuICAgIHRoaXMuY2xlYXIoKTtcclxuICAgIFxyXG4gICAgLy8gU2V0IHRoZSBzZXJpZXMgUHJvdmlkZXJcclxuICAgIHRoaXMuc2VyaWVzUHJvdmlkZXIgPSB0aGlzLmNvbXBvbmVudC5nZXRTdWJDb21wb25lbnQoRGVmYXVsdENvbXBvbmVudFNldHRpbmdzLlNlcmllc1Byb3ZpZGVySWQpIGFzIElTZXJpZXNQcm92aWRlcjtcclxuXHJcbiAgICAvLyBTZXQgdGhlIHNldHRpbmdzIHRvIHRoZSBiYXNlIGNsYXNzXHJcbiAgICBzdXBlci5zZXRDb21wb25lbnRTZXR0aW5ncyhjb21wb25lbnRTZXR0aW5ncyk7XHJcblxyXG4gICAgLy8gU2V0IHRoZSBzZXR0aW5ncyB0byB0aGUgY2F0ZWdvcmllc1xyXG4gICAgbGV0IGltcG9ydENhdGVnb3JpZXM6IEFycmF5PElTZXR0aW5ncz4gPSB0aGlzLmNvbXBvbmVudC5nZXRTZXR0aW5nKHRoaXMuX3NldHRpbmdzSWQpO1xyXG4gICAgaWYoaW1wb3J0Q2F0ZWdvcmllcyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IGltcG9ydENhdGVnb3JpZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgIGxldCBpbXBvcnRDYXRlZ29yeTogSVNldHRpbmdzID0gaW1wb3J0Q2F0ZWdvcmllc1tpXTtcclxuICAgICAgICBsZXQgc2V0dGluZ3MgPSBTZXR0aW5ncy5jcmVhdGUoaW1wb3J0Q2F0ZWdvcnkpO1xyXG4gICAgICAgIGxldCBjYXRlZ29yeSA9IHRoaXMuZ2V0U2lnbmFsQ2F0ZWdvcnkoc2V0dGluZ3MuZ2V0VmFsdWUoU2V0dGluZ0lkcy5DYXRlZ29yeUlkKSk7XHJcbiAgICAgICAgaWYoY2F0ZWdvcnkgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgIGNhdGVnb3J5LnNldFNldHRpbmdzKGltcG9ydENhdGVnb3J5KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZHMgYSBzaWduYWwgY29udGFpbmVyIHRvIHRoZSBkYXRhbW9kZWwgKGludG8gdGhlIGdpdmVuIGNhdGVnb3J5KSAvLyBUT0RPOiBpbXBsZW1lbnQgc3ViY2F0ZWdvcnlcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7SVNlcmllQ29udGFpbmVyfSBzZXJpZUNvbnRhaW5lclxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjYXRlZ29yeUlkXHJcbiAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBhZGRTZXJpZUNvbnRhaW5lcihzZXJpZUNvbnRhaW5lcjogSVNlcmllQ29udGFpbmVyLCBjYXRlZ29yeUlkOiBzdHJpbmcpe1xyXG4gICAgZm9yKGxldCBpPTA7IGkgPCB0aGlzLl9zaWduYWxNYW5hZ2VyRGF0YS5jaGlsZHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICBpZih0aGlzLl9zaWduYWxNYW5hZ2VyRGF0YS5jaGlsZHNbaV0uaWQgPT0gY2F0ZWdvcnlJZCl7XHJcbiAgICAgICAgdGhpcy5fc2lnbmFsTWFuYWdlckRhdGEuY2hpbGRzW2ldLmFkZFNlcmllQ29udGFpbmVyKHNlcmllQ29udGFpbmVyLCAwKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlcyB0aGUgZ2l2ZW4gc2lnbmFsIGNvbnRhaW5lciBmcm9tIHRoZSBkYXRhbW9kZWxcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7SVNlcmllQ29udGFpbmVyfSBzZXJpZUNvbnRhaW5lclxyXG4gICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgcmVtb3ZlU2VyaWVDb250YWluZXIoc2VyaWVDb250YWluZXI6IElTZXJpZUNvbnRhaW5lcil7XHJcbiAgICAvLyBSZW1vdmUgU2VyaWVDb250YWluZXIgZnJvbSBjYXRlZ29yeSBub2RlIC4uLlxyXG4gICAgdGhpcy5fc2lnbmFsTWFuYWdlckRhdGEuY2hpbGRzLmZvckVhY2goY2F0ZWdvcnkgPT4ge1xyXG4gICAgICAgIGNhdGVnb3J5LnJlbW92ZVNlcmllQ29udGFpbmVyKHNlcmllQ29udGFpbmVyKTtcclxuICAgIH0pXHJcbiAgfVxyXG4gIFxyXG4gIC8qKlxyXG4gICogQWRkcyBhIHVwbG9hZGVkIHNlcmllIGdyb3VwIHRvIHRoZSBkYXRhbW9kZWwoaW50byByZWNlbnQgY2F0ZWdvcnkgYW5kIGNyZWF0ZXMgYSBjbG9uZSB0byBhbGwgdXBsb2FkZWQgY2F0ZWdvcnkgKVxyXG4gICpcclxuICAqIEBwYXJhbSB7SVNlcmllR3JvdXB9IHNlcmllR3JvdXBcclxuICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgKi9cclxuICBhZGRVcGxvYWRlZFNlcmllR3JvdXAoc2VyaWVHcm91cDogSVNlcmllR3JvdXApIHtcclxuICAgIGxldCBzdWJDYXRlZ29yeVJlY2VudCA9IHRoaXMuZ2V0U2lnbmFsQ2F0ZWdvcnkoU2lnbmFsQ2F0ZWdvcnkuQ2F0ZWdvcnlJZFJlY2VudCk7XHJcbiAgICBsZXQgc3ViQ2F0ZWdvcnlBbGwgPSB0aGlzLmdldFNpZ25hbENhdGVnb3J5KFNpZ25hbENhdGVnb3J5LkNhdGVnb3J5SWRVcGxvYWRlZCk7XHJcbiAgICBpZiAoc3ViQ2F0ZWdvcnlSZWNlbnQgIT0gdW5kZWZpbmVkICYmIHN1YkNhdGVnb3J5QWxsICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGxldCBzZXJpZUdyb3VwQ2xvbmU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHN1YkNhdGVnb3J5UmVjZW50LmdldENoaWxkcygpLmxlbmd0aCA+IDApIHsgLy8gQ29weSBsYXRlc3QgdXBsb2FkZWQgZGF0YSB0byBhbGwgaWYgYXZhaWxhYmxlXHJcbiAgICAgICAgICAgIGxldCBsYXRlc3RTZXJpZUdyb3VwID0gc3ViQ2F0ZWdvcnlSZWNlbnQuZ2V0Q2hpbGRzKClbMF0gYXMgSVNlcmllR3JvdXA7XHJcbiAgICAgICAgICAgIGxhdGVzdFNlcmllR3JvdXAubWVyZ2VXaXRoU2VyaWVHcm91cChzZXJpZUdyb3VwKTtcclxuICAgICAgICAgICAgc2VyaWVHcm91cENsb25lID0gbGF0ZXN0U2VyaWVHcm91cC5jbG9uZSgpIGFzIElTZXJpZUdyb3VwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHsgLy8gQWRkIHVwbG9hZGVkIGRhdGEgdG8gXCJyZWNlbnRcIiBhbmQgY2xvbmUgdG8gXCJhbGxcIlxyXG4gICAgICAgICAgICBzdWJDYXRlZ29yeVJlY2VudC5hZGRTZXJpZUNvbnRhaW5lcihzZXJpZUdyb3VwLCAtMSk7XHJcbiAgICAgICAgICAgIHNlcmllR3JvdXBDbG9uZSA9IHRoaXMuZ2V0U2VyaWVHcm91cENsb25lZChzZXJpZUdyb3VwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzZXJpZUdyb3VwQ2xvbmUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgc3ViQ2F0ZWdvcnlBbGwuYWRkU2VyaWVDb250YWluZXIoc2VyaWVHcm91cENsb25lLCAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gVE9ETzogQ2FsY3VsYXRlIGFmdGVyIGNsb25lXHJcbiAgICB9IFxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IGEgY2xvbmUgc2VyaWVncm91cCBqdXN0IGlmIGl0IGlzIG5vdCBhbHJlYWR5IGluIHRoZSAnYWxsJyBmb2xkZXJcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7SVNlcmllR3JvdXB9IHNlcmllR3JvdXBcclxuICAgKiBAcmV0dXJucyB7KElTZXJpZUdyb3VwIHwgdW5kZWZpbmVkKX1cclxuICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIGdldFNlcmllR3JvdXBDbG9uZWQoc2VyaWVHcm91cDogSVNlcmllR3JvdXApOiBJU2VyaWVHcm91cCB8IHVuZGVmaW5lZCB7XHJcbiAgICBsZXQgYWxsQ2F0ZWdvcnkgPSB0aGlzLmdldFNpZ25hbENhdGVnb3J5KFNpZ25hbENhdGVnb3J5LkNhdGVnb3J5SWRVcGxvYWRlZCk7XHJcbiAgICBpZiAoYWxsQ2F0ZWdvcnkgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBsZXQgc2VyaWVDb250YWluZXIgPSBhbGxDYXRlZ29yeS5nZXRTZXJpZUNvbnRhaW5lcihzZXJpZUdyb3VwLm5hbWUpO1xyXG4gICAgICBpZiAoc2VyaWVDb250YWluZXIgIT09IHVuZGVmaW5lZCkgeyAvL1NlcmllR3JvdXAgYWxyZWFkeSBleGlzdHMgaW4gJ0FsbCcgQ29udGFpbmVyXHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHNlcmllR3JvdXAuY2xvbmUoKSBhcyBJU2VyaWVHcm91cDtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBzaWduYWwgY2F0ZWdvcnkgd2l0aCB0aGUgZ2l2ZW4gaWQgLy8gVE9ETzogaW1wbGVtZW50IHJlY3Vyc2l2ZSwgbm90IG9ubHkgMiBsZXZlbHNcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAqIEByZXR1cm5zIHsoSVNpZ25hbENhdGVnb3J5fHVuZGVmaW5lZCl9XHJcbiAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBnZXRTaWduYWxDYXRlZ29yeShpZDogc3RyaW5nKTogSVNpZ25hbENhdGVnb3J5fHVuZGVmaW5lZHtcclxuICAgIGxldCBzaWduYWxDYXRlZ29yeTogSVNpZ25hbENhdGVnb3J5fHVuZGVmaW5lZDtcclxuICAgIHRoaXMuZGF0YS5mb3JFYWNoKGNoaWxkID0+IHtcclxuICAgICAgaWYoY2hpbGQuaWQgPT0gaWQpe1xyXG4gICAgICAgIHNpZ25hbENhdGVnb3J5ID0gY2hpbGQ7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZXtcclxuICAgICAgICBjaGlsZC5nZXRDaGlsZHMoKS5mb3JFYWNoKHN1YkNoaWxkID0+IHtcclxuICAgICAgICAgIGlmKHN1YkNoaWxkIGluc3RhbmNlb2YgU2lnbmFsQ2F0ZWdvcnkpe1xyXG4gICAgICAgICAgICBpZihzdWJDaGlsZC5pZCA9PSBpZCl7XHJcbiAgICAgICAgICAgICAgc2lnbmFsQ2F0ZWdvcnkgPSBzdWJDaGlsZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBzaWduYWxDYXRlZ29yeTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZXMgdGhlIGdpdmVuIHNlcmllTm9kZVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtJU2VyaWVOb2RlfSBzZXJpZU5vZGVcclxuICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIHJlbW92ZVNlcmllTm9kZShzZXJpZU5vZGU6IElTZXJpZU5vZGUpe1xyXG4gICAgdGhpcy5fc2lnbmFsTWFuYWdlckRhdGEuY2hpbGRzLmZvckVhY2goY2F0ZWdvcnkgPT4ge1xyXG4gICAgICBjYXRlZ29yeS5yZW1vdmVTZXJpZU5vZGUoc2VyaWVOb2RlKTtcclxuICAgIH0pICAgIFxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRXhlY3V0ZWQgd2hlbiBzb21lIGRhdGEgd2FzIGNoYW5nZWQoc2lnbmFsIG9yIHNpZ25hbGNvbnRhaW5lciBhZGRlZCBvciByZW1vdmVkKVxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBAcGFyYW0geyp9IHNlbmRlclxyXG4gICAqIEBwYXJhbSB7RXZlbnRTaWduYWxNYW5hZ2VyRGF0YUNoYW5nZWRBcmdzfSBhcmdzXHJcbiAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBwcml2YXRlIG9uRGF0YUNoYW5nZWQoc2VuZGVyLCBhcmdzOiBFdmVudFNpZ25hbE1hbmFnZXJEYXRhQ2hhbmdlZEFyZ3Mpe1xyXG4gICAgaWYoYXJncy5hY3Rpb24gPT0gU2lnbmFsTWFuYWdlckFjdGlvbi5yZW1vdmUpe1xyXG4gICAgICBpZihhcmdzLmRhdGEgaW5zdGFuY2VvZiBTZXJpZUNvbnRhaW5lcil7XHJcbiAgICAgICAgYXJncy5kYXRhLmdldFNlcmllcygpLmZvckVhY2goc2VyaWUgPT4ge1xyXG4gICAgICAgICAgdGhpcy5vblNlcmllUmVtb3ZlZChzZXJpZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZXtcclxuICAgICAgICAvLyBzZW5kIHNlcmllIHJlbW92ZWQgZXZlbnRcclxuICAgICAgICBsZXQgc2VyaWVOb2RlID0gYXJncy5kYXRhO1xyXG4gICAgICAgIGlmKHNlcmllTm9kZSAhPSB1bmRlZmluZWQgJiYgIShzZXJpZU5vZGUgaW5zdGFuY2VvZiBTaWduYWxNYW5hZ2VyQ2FsY3VsYXRpb25JbnB1dERhdGEpKXtcclxuICAgICAgICAgIHRoaXMub25TZXJpZVJlbW92ZWQoc2VyaWVOb2RlLnNlcmllKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmKHRoaXMuX3N1cHJlc3NVcGRhdGUgPT0gZmFsc2Upe1xyXG4gICAgICB0aGlzLnJhaXNlTW9kZWxDaGFuZ2VkRXZlbnQoYXJncyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSYWlzZXMgdGhlIG1vZGVsIGNoYW5nZWQgZXZlbnRcclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBwcml2YXRlIHJhaXNlTW9kZWxDaGFuZ2VkRXZlbnQoYXJnczogRXZlbnRTaWduYWxNYW5hZ2VyRGF0YUNoYW5nZWRBcmdzKXtcclxuICAgIC8vIGUuZy4gdXBkYXRlcyB0aGUgc2lnbmFsIG1hbmFnZXIgd2lkZ2V0XHJcbiAgICBsZXQgZXZlbnRBcmdzID0gbmV3IEV2ZW50TW9kZWxDaGFuZ2VkQXJncyh0aGlzLCBNb2RlbENoYW5nZVR5cGUudXBkYXRlVGFyZ2V0LCBhcmdzLmFjdGlvbiwgdGhpcy5kYXRhKTtcclxuICAgIHRoaXMub25Nb2RlbENoYW5nZWQodGhpcywgZXZlbnRBcmdzKTsgXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSYWlzZXMgdGhlIHNpZ25hbCByZW1vdmVkIGV2ZW50XHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIEBwYXJhbSB7QmFzZVNlcmllc30gc2VyaWVcclxuICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25TZXJpZVJlbW92ZWQoc2VyaWU6IEJhc2VTZXJpZXMpIHtcclxuICAgIGlmKHNlcmllICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgIHRoaXMuZXZlbnRTaWduYWxSZW1vdmVkLnJhaXNlKHRoaXMsIHNlcmllKTtcclxuICAgICAgXHJcbiAgICAgIGlmKHRoaXMuc2VyaWVzUHJvdmlkZXIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICB0aGlzLnNlcmllc1Byb3ZpZGVyLnJlbW92ZShzZXJpZS5pZCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn0iXX0=