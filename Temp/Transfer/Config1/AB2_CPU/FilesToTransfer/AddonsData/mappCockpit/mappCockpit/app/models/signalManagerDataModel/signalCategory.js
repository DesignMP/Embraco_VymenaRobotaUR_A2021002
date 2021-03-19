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
define(["require", "exports", "../common/signal/serieContainer", "../common/signal/serieGroup", "../../common/persistence/settings", "./signalManagerDataModelSettingIds"], function (require, exports, serieContainer_1, serieGroup_1, settings_1, signalManagerDataModelSettingIds_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SignalCategory = /** @class */ (function (_super) {
        __extends(SignalCategory, _super);
        /**
         * Creates an instance of a signal category
         * @param {string} id
         * @memberof SignalCategory
         */
        function SignalCategory(id) {
            var _this = _super.call(this, SignalCategory.getDisplayName(id), id) || this;
            _this.id = id;
            _this.canDelete = false;
            return _this;
        }
        /**
         * Returns the settings of this signal category
         *
         * @returns {ISettings}
         * @memberof SignalCategory
         */
        SignalCategory.prototype.getSettings = function () {
            var settings = new settings_1.Settings("category");
            settings.setValue("id", this.id);
            var seriesGroupsData = new Array();
            // get all serie groups from this category
            this.getChilds().forEach(function (container) {
                if (container instanceof serieGroup_1.SerieGroup) {
                    // add serie group settings
                    seriesGroupsData.push(container.getSettings());
                }
                else if (container instanceof serieContainer_1.SerieContainer) {
                    // Import file category
                    var serieGroups = container.getChilds(); // serie groups of an imported file
                    for (var i = 0; i < serieGroups.length; i++) {
                        var group = serieGroups[i];
                        if (group instanceof serieGroup_1.SerieGroup) {
                            seriesGroupsData.push(group.getSettings());
                        }
                    }
                }
            });
            settings.setValue(signalManagerDataModelSettingIds_1.SettingIds.SerieGroups, seriesGroupsData);
            return settings;
        };
        /**
         * Sets the given settings to this signal category (id can not be changed currently)
         *
         * @param {ISettings} settings
         * @memberof SignalCategory
         */
        SignalCategory.prototype.setSettings = function (settings) {
            var _this = this;
            var settingsObj = settings_1.Settings.create(settings);
            settingsObj.getValue(signalManagerDataModelSettingIds_1.SettingIds.SerieGroups).forEach(function (importSerieGroup) {
                var container;
                if (_this.id == SignalCategory.CategoryIdImported) { // import category needs additionally container(file container)
                    container = _this.getOrCreateContainer(importSerieGroup.data[signalManagerDataModelSettingIds_1.SettingIds.ContainerName]);
                }
                else {
                    container = _this;
                }
                // add default group to container
                var serieGroup = new serieGroup_1.SerieGroup("", 0);
                container.addSerieContainer(serieGroup);
                // set group data
                serieGroup.setSettings(importSerieGroup);
            });
        };
        /**
         * Returns the found serieContainer or creats and adds a new serieContainer with the given containerName
         *
         * @private
         * @param {string} containerName
         * @returns {ISerieContainer}
         * @memberof SignalCategory
         */
        SignalCategory.prototype.getOrCreateContainer = function (containerName) {
            // Search for existing container
            var foundContainer = this.getSerieContainer(containerName);
            if (foundContainer != undefined) {
                return foundContainer;
            }
            // Create new container
            var container = new serieContainer_1.SerieContainer(containerName);
            this.addSerieContainer(container, -1);
            return container;
        };
        /**
         * Returns the display name for the given category id
         *
         * @private
         * @param {string} id
         * @returns
         * @memberof SignalCategory
         */
        SignalCategory.getDisplayName = function (id) {
            // get displaynames of the category
            if (id == SignalCategory.CategoryIdRecent) {
                return "Recent";
            }
            else if (id == SignalCategory.CategoryIdUploaded) {
                return "All uploaded from PLC";
            }
            else if (id == SignalCategory.CategoryIdImported) {
                return "Imported from file";
            }
            else if (id == SignalCategory.CategoryIdCalculated) {
                return "Calculated signals";
            }
            return "Unknown category id";
        };
        SignalCategory.CategoryIdRecent = "Recent";
        SignalCategory.CategoryIdUploaded = "Uploaded";
        SignalCategory.CategoryIdImported = "Imported";
        SignalCategory.CategoryIdCalculated = "Calculated";
        return SignalCategory;
    }(serieContainer_1.SerieContainer));
    exports.SignalCategory = SignalCategory;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsQ2F0ZWdvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsL3NpZ25hbENhdGVnb3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFPQTtRQUFvQyxrQ0FBYztRQVM5Qzs7OztXQUlHO1FBQ0gsd0JBQVksRUFBVTtZQUF0QixZQUNJLGtCQUFNLGNBQWMsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLFNBSy9DO1lBSEcsS0FBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7WUFFYixLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQzs7UUFDM0IsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gsb0NBQVcsR0FBWDtZQUNJLElBQUksUUFBUSxHQUFHLElBQUksbUJBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN4QyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7WUFFaEMsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLEtBQUssRUFBYSxDQUFDO1lBQzlDLDBDQUEwQztZQUMxQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQUEsU0FBUztnQkFDOUIsSUFBRyxTQUFTLFlBQVksdUJBQVUsRUFBQztvQkFDL0IsMkJBQTJCO29CQUMzQixnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7aUJBQ2xEO3FCQUNJLElBQUcsU0FBUyxZQUFZLCtCQUFjLEVBQUM7b0JBQ3hDLHVCQUF1QjtvQkFDdkIsSUFBSSxXQUFXLEdBQUcsU0FBUyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsbUNBQW1DO29CQUM1RSxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFD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cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2VyaWVDb250YWluZXIgfSBmcm9tIFwiLi4vY29tbW9uL3NpZ25hbC9zZXJpZUNvbnRhaW5lclwiO1xyXG5pbXBvcnQgeyBTZXJpZUdyb3VwIH0gZnJvbSBcIi4uL2NvbW1vbi9zaWduYWwvc2VyaWVHcm91cFwiO1xyXG5pbXBvcnQgeyBTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vcGVyc2lzdGVuY2Uvc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgSVNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wZXJzaXN0ZW5jZS9pbnRlcmZhY2VzL3NldHRpbmdzSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNldHRpbmdJZHMgfSBmcm9tIFwiLi9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsU2V0dGluZ0lkc1wiO1xyXG5pbXBvcnQgeyBJU2VyaWVDb250YWluZXIgfSBmcm9tIFwiLi4vY29tbW9uL2ludGVyZmFjZXMvc2VyaWVDb250YWluZXJJbnRlcmZhY2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTaWduYWxDYXRlZ29yeSBleHRlbmRzIFNlcmllQ29udGFpbmVye1xyXG4gICAgXHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgQ2F0ZWdvcnlJZFJlY2VudDogc3RyaW5nID0gXCJSZWNlbnRcIjtcclxuICAgIHN0YXRpYyByZWFkb25seSBDYXRlZ29yeUlkVXBsb2FkZWQ6IHN0cmluZyA9IFwiVXBsb2FkZWRcIjtcclxuICAgIHN0YXRpYyByZWFkb25seSBDYXRlZ29yeUlkSW1wb3J0ZWQ6IHN0cmluZyA9IFwiSW1wb3J0ZWRcIjtcclxuICAgIHN0YXRpYyByZWFkb25seSBDYXRlZ29yeUlkQ2FsY3VsYXRlZDogc3RyaW5nID0gXCJDYWxjdWxhdGVkXCI7XHJcbiAgICBcclxuICAgIGlkOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIGEgc2lnbmFsIGNhdGVnb3J5XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxDYXRlZ29yeVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nKXtcclxuICAgICAgICBzdXBlcihTaWduYWxDYXRlZ29yeS5nZXREaXNwbGF5TmFtZShpZCksIGlkKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5jYW5EZWxldGUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHNldHRpbmdzIG9mIHRoaXMgc2lnbmFsIGNhdGVnb3J5XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0lTZXR0aW5nc31cclxuICAgICAqIEBtZW1iZXJvZiBTaWduYWxDYXRlZ29yeVxyXG4gICAgICovXHJcbiAgICBnZXRTZXR0aW5ncygpOiBJU2V0dGluZ3N7XHJcbiAgICAgICAgbGV0IHNldHRpbmdzID0gbmV3IFNldHRpbmdzKFwiY2F0ZWdvcnlcIik7XHJcbiAgICAgICAgc2V0dGluZ3Muc2V0VmFsdWUoXCJpZFwiLCB0aGlzLmlkKVxyXG5cclxuICAgICAgICBsZXQgc2VyaWVzR3JvdXBzRGF0YSA9IG5ldyBBcnJheTxJU2V0dGluZ3M+KCk7XHJcbiAgICAgICAgLy8gZ2V0IGFsbCBzZXJpZSBncm91cHMgZnJvbSB0aGlzIGNhdGVnb3J5XHJcbiAgICAgICAgdGhpcy5nZXRDaGlsZHMoKS5mb3JFYWNoKGNvbnRhaW5lciA9PiB7XHJcbiAgICAgICAgICAgIGlmKGNvbnRhaW5lciBpbnN0YW5jZW9mIFNlcmllR3JvdXApe1xyXG4gICAgICAgICAgICAgICAgLy8gYWRkIHNlcmllIGdyb3VwIHNldHRpbmdzXHJcbiAgICAgICAgICAgICAgICBzZXJpZXNHcm91cHNEYXRhLnB1c2goY29udGFpbmVyLmdldFNldHRpbmdzKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYoY29udGFpbmVyIGluc3RhbmNlb2YgU2VyaWVDb250YWluZXIpe1xyXG4gICAgICAgICAgICAgICAgLy8gSW1wb3J0IGZpbGUgY2F0ZWdvcnlcclxuICAgICAgICAgICAgICAgIGxldCBzZXJpZUdyb3VwcyA9IGNvbnRhaW5lci5nZXRDaGlsZHMoKTsgLy8gc2VyaWUgZ3JvdXBzIG9mIGFuIGltcG9ydGVkIGZpbGVcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzZXJpZUdyb3Vwcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGdyb3VwID0gc2VyaWVHcm91cHNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZ3JvdXAgaW5zdGFuY2VvZiBTZXJpZUdyb3VwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VyaWVzR3JvdXBzRGF0YS5wdXNoKGdyb3VwLmdldFNldHRpbmdzKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNldHRpbmdzLnNldFZhbHVlKFNldHRpbmdJZHMuU2VyaWVHcm91cHMsIHNlcmllc0dyb3Vwc0RhdGEpO1xyXG4gICAgICAgIHJldHVybiBzZXR0aW5ncztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGdpdmVuIHNldHRpbmdzIHRvIHRoaXMgc2lnbmFsIGNhdGVnb3J5IChpZCBjYW4gbm90IGJlIGNoYW5nZWQgY3VycmVudGx5KVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SVNldHRpbmdzfSBzZXR0aW5nc1xyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbENhdGVnb3J5XHJcbiAgICAgKi9cclxuICAgIHNldFNldHRpbmdzKHNldHRpbmdzOiBJU2V0dGluZ3Mpe1xyXG4gICAgICAgIGxldCBzZXR0aW5nc09iaiA9IFNldHRpbmdzLmNyZWF0ZShzZXR0aW5ncyk7XHJcbiAgICAgICAgc2V0dGluZ3NPYmouZ2V0VmFsdWUoU2V0dGluZ0lkcy5TZXJpZUdyb3VwcykuZm9yRWFjaChpbXBvcnRTZXJpZUdyb3VwID0+IHtcclxuICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjtcclxuICAgICAgICAgICAgaWYodGhpcy5pZCA9PSBTaWduYWxDYXRlZ29yeS5DYXRlZ29yeUlkSW1wb3J0ZWQpeyAvLyBpbXBvcnQgY2F0ZWdvcnkgbmVlZHMgYWRkaXRpb25hbGx5IGNvbnRhaW5lcihmaWxlIGNvbnRhaW5lcilcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lciA9IHRoaXMuZ2V0T3JDcmVhdGVDb250YWluZXIoaW1wb3J0U2VyaWVHcm91cC5kYXRhW1NldHRpbmdJZHMuQ29udGFpbmVyTmFtZV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBhZGQgZGVmYXVsdCBncm91cCB0byBjb250YWluZXJcclxuICAgICAgICAgICAgbGV0IHNlcmllR3JvdXAgPSBuZXcgU2VyaWVHcm91cChcIlwiLCAwKTtcclxuICAgICAgICAgICAgY29udGFpbmVyLmFkZFNlcmllQ29udGFpbmVyKHNlcmllR3JvdXApO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gc2V0IGdyb3VwIGRhdGFcclxuICAgICAgICAgICAgc2VyaWVHcm91cC5zZXRTZXR0aW5ncyhpbXBvcnRTZXJpZUdyb3VwKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGZvdW5kIHNlcmllQ29udGFpbmVyIG9yIGNyZWF0cyBhbmQgYWRkcyBhIG5ldyBzZXJpZUNvbnRhaW5lciB3aXRoIHRoZSBnaXZlbiBjb250YWluZXJOYW1lXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb250YWluZXJOYW1lXHJcbiAgICAgKiBAcmV0dXJucyB7SVNlcmllQ29udGFpbmVyfVxyXG4gICAgICogQG1lbWJlcm9mIFNpZ25hbENhdGVnb3J5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0T3JDcmVhdGVDb250YWluZXIoY29udGFpbmVyTmFtZTogc3RyaW5nKTogSVNlcmllQ29udGFpbmVye1xyXG4gICAgICAgIC8vIFNlYXJjaCBmb3IgZXhpc3RpbmcgY29udGFpbmVyXHJcbiAgICAgICAgbGV0IGZvdW5kQ29udGFpbmVyID0gdGhpcy5nZXRTZXJpZUNvbnRhaW5lcihjb250YWluZXJOYW1lKTtcclxuICAgICAgICBpZihmb3VuZENvbnRhaW5lciAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gZm91bmRDb250YWluZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIENyZWF0ZSBuZXcgY29udGFpbmVyXHJcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IG5ldyBTZXJpZUNvbnRhaW5lcihjb250YWluZXJOYW1lKTtcclxuICAgICAgICB0aGlzLmFkZFNlcmllQ29udGFpbmVyKGNvbnRhaW5lciwgLTEpO1xyXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkaXNwbGF5IG5hbWUgZm9yIHRoZSBnaXZlbiBjYXRlZ29yeSBpZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsQ2F0ZWdvcnlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0RGlzcGxheU5hbWUoaWQ6IHN0cmluZyl7XHJcbiAgICAgICAgLy8gZ2V0IGRpc3BsYXluYW1lcyBvZiB0aGUgY2F0ZWdvcnlcclxuICAgICAgICBpZihpZCA9PSBTaWduYWxDYXRlZ29yeS5DYXRlZ29yeUlkUmVjZW50KXtcclxuICAgICAgICAgICAgcmV0dXJuIFwiUmVjZW50XCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoaWQgPT0gU2lnbmFsQ2F0ZWdvcnkuQ2F0ZWdvcnlJZFVwbG9hZGVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIFwiQWxsIHVwbG9hZGVkIGZyb20gUExDXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoaWQgPT0gU2lnbmFsQ2F0ZWdvcnkuQ2F0ZWdvcnlJZEltcG9ydGVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIFwiSW1wb3J0ZWQgZnJvbSBmaWxlXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoaWQgPT0gU2lnbmFsQ2F0ZWdvcnkuQ2F0ZWdvcnlJZENhbGN1bGF0ZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gXCJDYWxjdWxhdGVkIHNpZ25hbHNcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFwiVW5rbm93biBjYXRlZ29yeSBpZFwiO1xyXG4gICAgfVxyXG59Il19