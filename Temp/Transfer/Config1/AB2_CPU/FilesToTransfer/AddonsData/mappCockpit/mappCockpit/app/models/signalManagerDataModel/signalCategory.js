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
define(["require", "exports", "../common/signal/serieContainer"], function (require, exports, serieContainer_1) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsQ2F0ZWdvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsL3NpZ25hbENhdGVnb3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFQTtRQUFvQyxrQ0FBYztRQVM5Qzs7OztXQUlHO1FBQ0gsd0JBQVksRUFBVTtZQUF0QixZQUNJLGtCQUFNLGNBQWMsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLFNBSy9DO1lBSEcsS0FBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7WUFFYixLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQzs7UUFDM0IsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDWSw2QkFBYyxHQUE3QixVQUE4QixFQUFVO1lBQ3BDLG1DQUFtQztZQUNuQyxJQUFHLEVBQUUsSUFBSSxjQUFjLENBQUMsZ0JBQWdCLEVBQUM7Z0JBQ3JDLE9BQU8sUUFBUSxDQUFDO2FBQ25CO2lCQUNJLElBQUcsRUFBRSxJQUFJLGNBQWMsQ0FBQyxrQkFBa0IsRUFBQztnQkFDNUMsT0FBTyx1QkFBdUIsQ0FBQzthQUNsQztpQkFDSSxJQUFHLEVBQUUsSUFBSSxjQUFjLENBQUMsa0JBQWtCLEVBQUM7Z0JBQzVDLE9BQU8sb0JBQW9CLENBQUM7YUFDL0I7aUJBQ0ksSUFBRyxFQUFFLElBQUksY0FBYyxDQUFDLG9CQUFvQixFQUFDO2dCQUM5QyxPQUFPLG9CQUFvQixDQUFDO2FBQy9CO1lBQ0QsT0FBTyxxQkFBcUIsQ0FBQztRQUNqQyxDQUFDO1FBM0NlLCtCQUFnQixHQUFXLFFBQVEsQ0FBQztRQUNwQyxpQ0FBa0IsR0FBVyxVQUFVLENBQUM7UUFDeEMsaUNBQWtCLEdBQVcsVUFBVSxDQUFDO1FBQ3hDLG1DQUFvQixHQUFXLFlBQVksQ0FBQztRQXlDaEUscUJBQUM7S0FBQSxBQTlDRCxDQUFvQywrQkFBYyxHQThDakQ7SUE5Q1ksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZXJpZUNvbnRhaW5lciB9IGZyb20gXCIuLi9jb21tb24vc2lnbmFsL3NlcmllQ29udGFpbmVyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU2lnbmFsQ2F0ZWdvcnkgZXh0ZW5kcyBTZXJpZUNvbnRhaW5lcntcclxuICAgIFxyXG4gICAgc3RhdGljIHJlYWRvbmx5IENhdGVnb3J5SWRSZWNlbnQ6IHN0cmluZyA9IFwiUmVjZW50XCI7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgQ2F0ZWdvcnlJZFVwbG9hZGVkOiBzdHJpbmcgPSBcIlVwbG9hZGVkXCI7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgQ2F0ZWdvcnlJZEltcG9ydGVkOiBzdHJpbmcgPSBcIkltcG9ydGVkXCI7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgQ2F0ZWdvcnlJZENhbGN1bGF0ZWQ6IHN0cmluZyA9IFwiQ2FsY3VsYXRlZFwiO1xyXG4gICAgXHJcbiAgICBpZDogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBhIHNpZ25hbCBjYXRlZ29yeVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsQ2F0ZWdvcnlcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoaWQ6IHN0cmluZyl7XHJcbiAgICAgICAgc3VwZXIoU2lnbmFsQ2F0ZWdvcnkuZ2V0RGlzcGxheU5hbWUoaWQpLCBpZCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuY2FuRGVsZXRlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkaXNwbGF5IG5hbWUgZm9yIHRoZSBnaXZlbiBjYXRlZ29yeSBpZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsQ2F0ZWdvcnlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0RGlzcGxheU5hbWUoaWQ6IHN0cmluZyl7XHJcbiAgICAgICAgLy8gZ2V0IGRpc3BsYXluYW1lcyBvZiB0aGUgY2F0ZWdvcnlcclxuICAgICAgICBpZihpZCA9PSBTaWduYWxDYXRlZ29yeS5DYXRlZ29yeUlkUmVjZW50KXtcclxuICAgICAgICAgICAgcmV0dXJuIFwiUmVjZW50XCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoaWQgPT0gU2lnbmFsQ2F0ZWdvcnkuQ2F0ZWdvcnlJZFVwbG9hZGVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIFwiQWxsIHVwbG9hZGVkIGZyb20gUExDXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoaWQgPT0gU2lnbmFsQ2F0ZWdvcnkuQ2F0ZWdvcnlJZEltcG9ydGVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIFwiSW1wb3J0ZWQgZnJvbSBmaWxlXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoaWQgPT0gU2lnbmFsQ2F0ZWdvcnkuQ2F0ZWdvcnlJZENhbGN1bGF0ZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gXCJDYWxjdWxhdGVkIHNpZ25hbHNcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFwiVW5rbm93biBjYXRlZ29yeSBpZFwiO1xyXG4gICAgfVxyXG59Il19