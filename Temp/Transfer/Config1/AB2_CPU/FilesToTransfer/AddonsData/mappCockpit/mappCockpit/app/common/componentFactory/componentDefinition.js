define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ComponentDefinition = /** @class */ (function () {
        /**
         * Creates an instance of ComponentDefinition
         * @param {string} type
         * @param {string} id
         * @param {string} [defaultSettingsDataId=""]
         * @memberof ComponentDefinition
         */
        function ComponentDefinition(type, id, defaultSettingsDataId) {
            if (defaultSettingsDataId === void 0) { defaultSettingsDataId = ""; }
            this.type = type;
            this.id = id;
            this.defaultSettingsDataId = defaultSettingsDataId;
        }
        /**
         * Sets the given componentDefinition to this componentDefinition
         *
         * @param {ComponentDefinition} componentDefinition
         * @memberof ComponentDefinition
         */
        ComponentDefinition.prototype.set = function (componentDefinition) {
            this.type = componentDefinition.type;
            this.id = componentDefinition.id;
            this.defaultSettingsDataId = componentDefinition.defaultSettingsDataId;
        };
        return ComponentDefinition;
    }());
    exports.ComponentDefinition = ComponentDefinition;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50RGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvY29tbW9uL2NvbXBvbmVudEZhY3RvcnkvY29tcG9uZW50RGVmaW5pdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFBQTtRQXlCSTs7Ozs7O1dBTUc7UUFDSCw2QkFBWSxJQUFZLEVBQUUsRUFBVSxFQUFFLHFCQUFrQztZQUFsQyxzQ0FBQSxFQUFBLDBCQUFrQztZQUNwRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNqQixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztZQUNiLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxxQkFBcUIsQ0FBQztRQUN2RCxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSCxpQ0FBRyxHQUFILFVBQUksbUJBQXdDO1lBQ3hDLElBQUksQ0FBQyxJQUFJLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxFQUFFLEdBQUcsbUJBQW1CLENBQUMsRUFBRSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxtQkFBbUIsQ0FBQyxxQkFBcUIsQ0FBQztRQUMzRSxDQUFDO1FBQ0wsMEJBQUM7SUFBRCxDQUFDLEFBakRELElBaURDO0lBakRZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBDb21wb25lbnREZWZpbml0aW9ue1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgdHlwZSBvZiB0aGUgY29tcG9uZW50IChlLmcuIGNsYXNzIG5hbWUpXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnREZWZpbml0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB0eXBlOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAgVW5pcXVlIGlkIG9mIHRoZSBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudERlZmluaXRpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGlkOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJZCB3aGVyZSB0byBmaW5kIHRoZSBkZWZhdWx0IHNldHRpbmcgZGF0YSBmb3IgdGhpcyBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudERlZmluaXRpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGRlZmF1bHRTZXR0aW5nc0RhdGFJZDogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBDb21wb25lbnREZWZpbml0aW9uXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW2RlZmF1bHRTZXR0aW5nc0RhdGFJZD1cIlwiXVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudERlZmluaXRpb25cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IodHlwZTogc3RyaW5nLCBpZDogc3RyaW5nLCBkZWZhdWx0U2V0dGluZ3NEYXRhSWQ6IHN0cmluZyA9IFwiXCIpe1xyXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgICAgIHRoaXMuZGVmYXVsdFNldHRpbmdzRGF0YUlkID0gZGVmYXVsdFNldHRpbmdzRGF0YUlkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgZ2l2ZW4gY29tcG9uZW50RGVmaW5pdGlvbiB0byB0aGlzIGNvbXBvbmVudERlZmluaXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudERlZmluaXRpb259IGNvbXBvbmVudERlZmluaXRpb25cclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnREZWZpbml0aW9uXHJcbiAgICAgKi9cclxuICAgIHNldChjb21wb25lbnREZWZpbml0aW9uOiBDb21wb25lbnREZWZpbml0aW9uKXtcclxuICAgICAgICB0aGlzLnR5cGUgPSBjb21wb25lbnREZWZpbml0aW9uLnR5cGU7XHJcbiAgICAgICAgdGhpcy5pZCA9IGNvbXBvbmVudERlZmluaXRpb24uaWQ7XHJcbiAgICAgICAgdGhpcy5kZWZhdWx0U2V0dGluZ3NEYXRhSWQgPSBjb21wb25lbnREZWZpbml0aW9uLmRlZmF1bHRTZXR0aW5nc0RhdGFJZDtcclxuICAgIH1cclxufSJdfQ==