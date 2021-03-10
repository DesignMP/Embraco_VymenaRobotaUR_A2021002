define(["require", "exports", "../../common/fileProvider"], function (require, exports, fileProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ThemeProvider = /** @class */ (function () {
        function ThemeProvider() {
            this._currentThemeId = "";
            this._currentThemeId = ThemeProvider.getCurrentThemeId();
        }
        /**
         * gets a singleton instance of ThemeProvider
         *
         * @readonly
         * @type {ThemeProvider}
         * @memberof ThemeProvider
         */
        ThemeProvider.getInstance = function () {
            this._instance = this._instance ? this._instance : new ThemeProvider();
            return this._instance;
        };
        /**
         * Returns the theme id if defined in the address bar (e.g.: ?theme="myTheme") else ""
         *
         * @private
         * @returns {string}
         * @memberof WidgetBase
         */
        ThemeProvider.getCurrentThemeId = function () {
            var initCommands = window.location.search.substring(1);
            var themeIdIndex = initCommands.indexOf("theme=%22");
            if (themeIdIndex > -1) {
                var themeIdStartIndex = themeIdIndex + 9;
                var themeIdEndIndex = initCommands.indexOf("%22", themeIdStartIndex);
                var themeId = initCommands.substr(themeIdStartIndex, themeIdEndIndex - themeIdStartIndex);
                return themeId;
            }
            return "";
        };
        /**
         * Returns the filepath for the given theme if file is available in this theme, else the input file path will be returned
         *
         * @static
         * @param {string} filePath
         * @param {string} themeId
         * @returns {string}
         * @memberof ThemeProvider
         */
        ThemeProvider.prototype.getThemedFilePath = function (filePath) {
            if (this._currentThemeId != "") {
                var themeFolder = "themes/" + this._currentThemeId + "/";
                var themeFilePath = filePath.replace("widgets/", themeFolder);
                if (fileProvider_1.FileProvider.doesFileExistOnServer(themeFilePath)) {
                    filePath = themeFilePath;
                }
            }
            return filePath;
        };
        return ThemeProvider;
    }());
    exports.ThemeProvider = ThemeProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWVQcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jb21tb24vdGhlbWVQcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFFQTtRQU9JO1lBRlEsb0JBQWUsR0FBRyxFQUFFLENBQUM7WUFHekIsSUFBSSxDQUFDLGVBQWUsR0FBRyxhQUFhLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUM3RCxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ1cseUJBQVcsR0FBekI7WUFFSSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksYUFBYSxFQUFFLENBQUM7WUFFdkUsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzFCLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDWSwrQkFBaUIsR0FBaEM7WUFDSSxJQUFJLFlBQVksR0FBVyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0QsSUFBSSxZQUFZLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNyRCxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUMsRUFBRTtnQkFDbkIsSUFBSSxpQkFBaUIsR0FBRyxZQUFZLEdBQUcsQ0FBQyxDQUFDO2dCQUN6QyxJQUFJLGVBQWUsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO2dCQUNyRSxJQUFJLE9BQU8sR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFLGVBQWUsR0FBQyxpQkFBaUIsQ0FBQyxDQUFBO2dCQUN2RixPQUFPLE9BQU8sQ0FBQzthQUNsQjtZQUNELE9BQU8sRUFBRSxDQUFBO1FBQ2IsQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ0gseUNBQWlCLEdBQWpCLFVBQWtCLFFBQWdCO1lBQzlCLElBQUcsSUFBSSxDQUFDLGVBQWUsSUFBSyxFQUFFLEVBQUM7Z0JBQzNCLElBQUksV0FBVyxHQUFHLFNBQVMsR0FBRSxJQUFJLENBQUMsZUFBZSxHQUFHLEdBQUcsQ0FBQztnQkFDeEQsSUFBSSxhQUFhLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUM7Z0JBQzlELElBQUcsMkJBQVksQ0FBQyxxQkFBcUIsQ0FBQyxhQUFhLENBQUMsRUFBQztvQkFDakQsUUFBUSxHQUFHLGFBQWEsQ0FBQztpQkFDNUI7YUFDSjtZQUNELE9BQU8sUUFBUSxDQUFDO1FBQ3BCLENBQUM7UUFDTCxvQkFBQztJQUFELENBQUMsQUEvREQsSUErREM7SUEvRFksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGaWxlUHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2ZpbGVQcm92aWRlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRoZW1lUHJvdmlkZXJ7XHJcbiAgICBcclxuICAgIC8vIGhvbGRzIGFuIGluc3RhbmNlIG9mIHRoaXMgY2xhc3NcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogVGhlbWVQcm92aWRlcjtcclxuXHJcbiAgICBwcml2YXRlIF9jdXJyZW50VGhlbWVJZCA9IFwiXCI7XHJcblxyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuX2N1cnJlbnRUaGVtZUlkID0gVGhlbWVQcm92aWRlci5nZXRDdXJyZW50VGhlbWVJZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0cyBhIHNpbmdsZXRvbiBpbnN0YW5jZSBvZiBUaGVtZVByb3ZpZGVyXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7VGhlbWVQcm92aWRlcn1cclxuICAgICAqIEBtZW1iZXJvZiBUaGVtZVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogVGhlbWVQcm92aWRlciB7XHJcblxyXG4gICAgICAgIHRoaXMuX2luc3RhbmNlID0gdGhpcy5faW5zdGFuY2UgPyB0aGlzLl9pbnN0YW5jZSA6IG5ldyBUaGVtZVByb3ZpZGVyKCk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRoZW1lIGlkIGlmIGRlZmluZWQgaW4gdGhlIGFkZHJlc3MgYmFyIChlLmcuOiA/dGhlbWU9XCJteVRoZW1lXCIpIGVsc2UgXCJcIlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFdpZGdldEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0Q3VycmVudFRoZW1lSWQoKTogc3RyaW5nIHtcclxuICAgICAgICB2YXIgaW5pdENvbW1hbmRzOiBzdHJpbmcgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cmluZygxKTtcclxuICAgICAgICBsZXQgdGhlbWVJZEluZGV4ID0gaW5pdENvbW1hbmRzLmluZGV4T2YoXCJ0aGVtZT0lMjJcIik7XHJcbiAgICAgICAgaWYgKHRoZW1lSWRJbmRleCA+IC0xKSB7IFxyXG4gICAgICAgICAgICBsZXQgdGhlbWVJZFN0YXJ0SW5kZXggPSB0aGVtZUlkSW5kZXggKyA5O1xyXG4gICAgICAgICAgICBsZXQgdGhlbWVJZEVuZEluZGV4ID0gaW5pdENvbW1hbmRzLmluZGV4T2YoXCIlMjJcIiwgdGhlbWVJZFN0YXJ0SW5kZXgpO1xyXG4gICAgICAgICAgICBsZXQgdGhlbWVJZCA9IGluaXRDb21tYW5kcy5zdWJzdHIodGhlbWVJZFN0YXJ0SW5kZXgsIHRoZW1lSWRFbmRJbmRleC10aGVtZUlkU3RhcnRJbmRleClcclxuICAgICAgICAgICAgcmV0dXJuIHRoZW1lSWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcIlwiXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZmlsZXBhdGggZm9yIHRoZSBnaXZlbiB0aGVtZSBpZiBmaWxlIGlzIGF2YWlsYWJsZSBpbiB0aGlzIHRoZW1lLCBlbHNlIHRoZSBpbnB1dCBmaWxlIHBhdGggd2lsbCBiZSByZXR1cm5lZFxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmaWxlUGF0aFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRoZW1lSWRcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgVGhlbWVQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBnZXRUaGVtZWRGaWxlUGF0aChmaWxlUGF0aDogc3RyaW5nKTogc3RyaW5ne1xyXG4gICAgICAgIGlmKHRoaXMuX2N1cnJlbnRUaGVtZUlkICAhPSBcIlwiKXtcclxuICAgICAgICAgICAgbGV0IHRoZW1lRm9sZGVyID0gXCJ0aGVtZXMvXCIrIHRoaXMuX2N1cnJlbnRUaGVtZUlkICsgXCIvXCI7XHJcbiAgICAgICAgICAgIGxldCB0aGVtZUZpbGVQYXRoID0gZmlsZVBhdGgucmVwbGFjZShcIndpZGdldHMvXCIsIHRoZW1lRm9sZGVyKTtcclxuICAgICAgICAgICAgaWYoRmlsZVByb3ZpZGVyLmRvZXNGaWxlRXhpc3RPblNlcnZlcih0aGVtZUZpbGVQYXRoKSl7XHJcbiAgICAgICAgICAgICAgICBmaWxlUGF0aCA9IHRoZW1lRmlsZVBhdGg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZpbGVQYXRoO1xyXG4gICAgfVxyXG59Il19