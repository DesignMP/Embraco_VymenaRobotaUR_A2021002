define(["require", "exports", "./defaultComponentSettings", "../componentBase/componentBase", "./textResource", "./languageCodes", "./settingIds"], function (require, exports, defaultComponentSettings_1, componentBase_1, textResource_1, languageCodes_1, settingIds_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * This class handles provides access to all multilanguage texts
     * Texts are packaged in languages and namespaces
     *
     * @export
     * @class TextProvider
     * @extends {ComponentWithoutSettingsBase}
     * @implements {ITextProvider}
     */
    var TextProvider = /** @class */ (function () {
        /**
         *Creates an instance of TextProvider.
         * @memberof TextProvider
         */
        function TextProvider() {
            this._errorEventIdTextNotAvailable = "-2144327656"; // TODO create ID in our EventId range!
            this._selectedLanguage = "";
            this._fallbackLanguage = "";
            this._systemLanguage = languageCodes_1.LanguageCodes.english;
            this._textData = new Array(); // hirarchy: language -> namepsage -> TextResource
            this.namespaceSeperator = "/";
            this._settingsId = "textProvider";
            this.component = new componentBase_1.ComponentBase(undefined, this);
        }
        /**
         * Initializes the component
         *
         * @memberof TextProvider
         */
        TextProvider.prototype.initializeComponent = function () {
            this.component.id = "TextProvider";
            this.component.type = "TextProvider";
            this.component.defaultSettingsDataId = defaultComponentSettings_1.DefaultComponentSettings.TextProviderDefinitionId;
        };
        /**
         *
         *
         * @memberof TextProvider
         */
        TextProvider.prototype.initialize = function () {
            this.component.loadComponentSettings();
            var settings = this.component.getComponentSettings();
            if (settings != undefined) {
                this.setComponentSettings(settings);
            }
        };
        /**
         * Disposes this component
         */
        TextProvider.prototype.dispose = function () {
            this.component.saveComponentSettings();
            this.clearAllTexts();
            TextProvider._instance = undefined;
        };
        /**
         * Clears all the data of this component
         *
         * @memberof TextProvider
         */
        TextProvider.prototype.clear = function () {
            this.clearAllTexts();
        };
        /**
         * Returns the default ComponentSettings
         *
         * @returns {(ComponentSettings|undefined)}
         * @memberof TextProvider
         */
        TextProvider.prototype.getDefaultComponentSettings = function () {
            return defaultComponentSettings_1.DefaultComponentSettings.getTextProviderDefinition();
        };
        /**
         * Returns the current ComponentSettings
         *
         * @returns {ComponentSettings}
         * @memberof TextProvider
         */
        TextProvider.prototype.getComponentSettings = function () {
            var textResourcesAsSettings = new Array();
            this._textData.forEach(function (resource) {
                textResourcesAsSettings.push(resource.getSettings());
            });
            this.component.setSetting(this._settingsId, textResourcesAsSettings);
            return this.component.getComponentSettings();
        };
        /**
         * Sets the given ComponentSettings
         *
         * @param {(ComponentSettings|undefined)} settings
         * @returns
         * @memberof TextProvider
         */
        TextProvider.prototype.setComponentSettings = function (settings) {
            var _this = this;
            this.clear();
            this.component.setComponentSettings(settings);
            if (settings == undefined) {
                return;
            }
            this._selectedLanguage = this.component.getSetting(settingIds_1.SettingIds.SelectedLanguage);
            this._fallbackLanguage = this.component.getSetting(settingIds_1.SettingIds.FallbackLanguage);
            var textResourcesSettings = this.component.getSetting(settingIds_1.SettingIds.TextResources);
            if (textResourcesSettings != undefined) {
                textResourcesSettings.forEach(function (textResourcesSetting) {
                    var textResource = textResource_1.TextResource.create(textResourcesSetting);
                    _this.addReplaceTextResource(textResource);
                });
            }
        };
        /**
         * Returns the requested text, a fallback text or an error text
         *
         * @param {string} namespace
         * @param {string} textID
         * @param {*} [languageCode=this.fallbackLanguage]
         * @returns {string}
         * @memberof TextSystem
         */
        TextProvider.prototype.getRawText = function (namespace, textID, languageCode) {
            if (languageCode === void 0) { languageCode = this._selectedLanguage; }
            var text = this.getTextNoFallback(namespace, textID, languageCode);
            // fallback 1: use fallback language
            if (text == undefined) {
                text = this.getTextNoFallback(namespace, textID, this._fallbackLanguage);
            }
            // fallback 2: use system language
            if (text == undefined) {
                text = this.getTextNoFallback(namespace, textID, this._systemLanguage);
            }
            // return text with error message
            if (text == undefined) {
                text = this.createErrorMessage(namespace, textID);
            }
            return text;
        };
        /**
         * Returns the requested text, a fallback text or an error text
         *
         * @param {string} fullyQualifiedTextID
         * @param {*} [languageCode=this._selectedLanguage]
         * @returns {string}
         * @memberof TextProvider
         */
        TextProvider.prototype.getRawTextByFullyQualifiedTextId = function (fullyQualifiedTextID, languageCode) {
            if (languageCode === void 0) { languageCode = this._selectedLanguage; }
            // retrieve namespace and textId
            var textQualifier = this.decodeFullyQualifiedTextId(fullyQualifiedTextID);
            return this.getRawText(textQualifier.namespace, textQualifier.textId, languageCode);
        };
        /**
         * Returns the text with resolved format items
         *
         * @param {string} namespace
         * @param {string} textID
         * @param {Array<FormatterArgumentType>} formatterArgs
         * @param {*} [languageCode=this._selectedLanguage]
         * @returns {string}
         * @memberof TextProvider
         */
        TextProvider.prototype.getFormattedText = function (namespace, textID, formatterArgs, languageCode) {
            if (languageCode === void 0) { languageCode = this._selectedLanguage; }
            // get the text that the formatter should work with
            var rawText = this.getRawText(namespace, textID, languageCode);
            // prepare a referece the this text system, so that the formatter can get a text if required (e.g. to resolve a format item such as {$someNamespace/someTextId})
            var textSystemInterface = this;
            // TODO Johann: Implement usage of formatter
            throw new Error("not implemented");
            // @Johann, this is how the text formatter could be called:
            //return TextFormatter.FormatText(rawText, textSystemInterface, formatterArgs, languageCode)
        };
        /**
         * This method allows to add a new namespace with texts. I the namespace exists in the given languages, the existing one is completely replaced.
         *
         * @param {string} namespace
         * @param {Map<string,string>} texts
         * @param {string} [languageCode="en"]
         * @memberof TextSystem
         */
        TextProvider.prototype.addReplaceTexts = function (namespace, texts, languageCode) {
            // create new text resource
            var textResource = new textResource_1.TextResource(namespace, texts, languageCode);
            this.addReplaceTextResource(textResource);
        };
        /**
         * This method allows to add a new namespace with texts. I the namespace exists in the given languages, the existing one is completely replaced.
         * @param textResource
         */
        TextProvider.prototype.addReplaceTextResource = function (textResource) {
            // search for existing texts with matching namespace and language code
            var originalTextResource = this.getTextResource(textResource.getNamespace(), textResource.getLanguageCode());
            if (originalTextResource == undefined) {
                // add new texts
                this._textData.push(textResource);
            }
            else {
                // replace existing texts completely
                originalTextResource = textResource;
            }
        };
        TextProvider.prototype.getTextNoFallback = function (namespace, textID, languageCode) {
            if (languageCode === void 0) { languageCode = this._fallbackLanguage; }
            var _a;
            return (_a = this.getTextResource(namespace, languageCode)) === null || _a === void 0 ? void 0 : _a.getText(textID);
        };
        TextProvider.prototype.createErrorMessage = function (namespace, textID) {
            return "(Error " + this._errorEventIdTextNotAvailable + ": " + namespace + textID + ")";
        };
        TextProvider.prototype.getTextResource = function (namespace, languageCode) {
            return this._textData.find(function (textResource) { return textResource.getNamespace() === namespace && textResource.getLanguageCode() === languageCode; });
        };
        TextProvider.prototype.decodeFullyQualifiedTextId = function (fullyQaulifiedTextId) {
            // seperate a string "namespacePart1/.../namepacePartn/TextId1" 
            // into 
            // namespace = "namespacePart1/.../namepacePartn" and 
            // textId = "TextId1"
            // seperate elements by "/"
            var elements = fullyQaulifiedTextId.split(this.namespaceSeperator);
            // the last element is the textId
            var textId = elements[elements.length - 1];
            // remove the last element
            elements.pop();
            // concatenate all elmenets insrting the "/" again
            var namespace = elements.join(this.namespaceSeperator);
            return new TextQualifier(namespace, textId);
        };
        TextProvider.prototype.clearAllTexts = function () {
            // all elements are deleted (also if this array is accessed by other references)
            this._textData.splice(0, this._textData.length);
        };
        return TextProvider;
    }());
    exports.TextProvider = TextProvider;
    var TextQualifier = /** @class */ (function () {
        function TextQualifier(namespace, textId) {
            this._namespace = "";
            this._textId = "";
            this._namespace = namespace;
            this._textId = textId;
        }
        Object.defineProperty(TextQualifier.prototype, "namespace", {
            get: function () {
                return this._namespace;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextQualifier.prototype, "textId", {
            get: function () {
                return this._textId;
            },
            enumerable: true,
            configurable: true
        });
        return TextQualifier;
    }());
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dFByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vdGV4dFByb3ZpZGVyL3RleHRQcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFhQTs7Ozs7Ozs7T0FRRztJQUNIO1FBZ0JJOzs7V0FHRztRQUNIO1lBbEJRLGtDQUE2QixHQUFJLGFBQWEsQ0FBQyxDQUFDLHVDQUF1QztZQUN2RixzQkFBaUIsR0FBZ0IsRUFBRSxDQUFDO1lBQ3BDLHNCQUFpQixHQUFnQixFQUFFLENBQUM7WUFDM0Isb0JBQWUsR0FBUyw2QkFBYSxDQUFDLE9BQU8sQ0FBQztZQUN2RCxjQUFTLEdBQXdCLElBQUksS0FBSyxFQUFnQixDQUFDLENBQUMsa0RBQWtEO1lBQ3JHLHVCQUFrQixHQUFRLEdBQUcsQ0FBQztZQUU5QixnQkFBVyxHQUFHLGNBQWMsQ0FBQztZQUN2QyxjQUFTLEdBQWtCLElBQUksNkJBQWEsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFZckUsQ0FBQztRQUdEOzs7O1dBSUc7UUFDSSwwQ0FBbUIsR0FBMUI7WUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsR0FBRyxjQUFjLENBQUM7WUFDbkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxTQUFTLENBQUMscUJBQXFCLEdBQUcsbURBQXdCLENBQUMsd0JBQXdCLENBQUM7UUFDN0YsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSSxpQ0FBVSxHQUFqQjtZQUNJLElBQUksQ0FBQyxTQUFTLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUN2QyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLG9CQUFvQixFQUFFLENBQUM7WUFDckQsSUFBRyxRQUFRLElBQUksU0FBUyxFQUFDO2dCQUNyQixJQUFJLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENB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dXJjZXNDb250ZW50IjpbImltcG9ydCB7IElUZXh0UHJvdmlkZXIgfSBmcm9tIFwiLi9pbnRlcmZhY2UvdGV4dFByb3ZpZGVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IERlZmF1bHRDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuL2RlZmF1bHRDb21wb25lbnRTZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRTZXR0aW5ncyB9IGZyb20gXCIuLi9jb21wb25lbnRCYXNlL2NvbXBvbmVudFNldHRpbmdzXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudEJhc2UgfSBmcm9tIFwiLi4vY29tcG9uZW50QmFzZS9jb21wb25lbnRCYXNlXCI7XHJcbmltcG9ydCB7IElTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9jb21tb24vcGVyc2lzdGVuY2UvaW50ZXJmYWNlcy9zZXR0aW5nc0ludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUZXh0UmVzb3VyY2UgfSBmcm9tIFwiLi90ZXh0UmVzb3VyY2VcIjtcclxuaW1wb3J0IHsgTGFuZ3VhZ2VDb2RlcyB9IGZyb20gXCIuL2xhbmd1YWdlQ29kZXNcIjtcclxuaW1wb3J0IHsgU2V0dGluZ0lkcyB9IGZyb20gXCIuL3NldHRpbmdJZHNcIjtcclxuaW1wb3J0IHsgSUZvcm1hdHRlcklucHV0QXJndW1lbnQgfSBmcm9tIFwiLi9pbnRlcmZhY2UvZm9ybWF0dGVySW5wdXRBcmd1bWVudEludGVyZmFjZVwiO1xyXG5cclxuXHJcblxyXG5cclxuLyoqXHJcbiAqIFRoaXMgY2xhc3MgaGFuZGxlcyBwcm92aWRlcyBhY2Nlc3MgdG8gYWxsIG11bHRpbGFuZ3VhZ2UgdGV4dHNcclxuICogVGV4dHMgYXJlIHBhY2thZ2VkIGluIGxhbmd1YWdlcyBhbmQgbmFtZXNwYWNlc1xyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBjbGFzcyBUZXh0UHJvdmlkZXJcclxuICogQGV4dGVuZHMge0NvbXBvbmVudFdpdGhvdXRTZXR0aW5nc0Jhc2V9XHJcbiAqIEBpbXBsZW1lbnRzIHtJVGV4dFByb3ZpZGVyfVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFRleHRQcm92aWRlciBpbXBsZW1lbnRzIElUZXh0UHJvdmlkZXJ7XHJcblxyXG4gICAgcHJpdmF0ZSBfZXJyb3JFdmVudElkVGV4dE5vdEF2YWlsYWJsZSA9ICBcIi0yMTQ0MzI3NjU2XCI7IC8vIFRPRE8gY3JlYXRlIElEIGluIG91ciBFdmVudElkIHJhbmdlIVxyXG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWRMYW5ndWFnZSA9ICAgICAgICAgICAgICBcIlwiO1xyXG4gICAgcHJpdmF0ZSBfZmFsbGJhY2tMYW5ndWFnZSA9ICAgICAgICAgICAgICBcIlwiO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfc3lzdGVtTGFuZ3VhZ2UgPSAgICAgICBMYW5ndWFnZUNvZGVzLmVuZ2xpc2g7XHJcbiAgICBwcml2YXRlIF90ZXh0RGF0YSA9ICAgICAgICAgICAgICAgICAgICAgIG5ldyBBcnJheTxUZXh0UmVzb3VyY2U+KCk7IC8vIGhpcmFyY2h5OiBsYW5ndWFnZSAtPiBuYW1lcHNhZ2UgLT4gVGV4dFJlc291cmNlXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IG5hbWVzcGFjZVNlcGVyYXRvciAgICAgID0gXCIvXCI7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfc2V0dGluZ3NJZCA9IFwidGV4dFByb3ZpZGVyXCI7XHJcbiAgICBwdWJsaWMgY29tcG9uZW50OiBDb21wb25lbnRCYXNlID0gbmV3IENvbXBvbmVudEJhc2UodW5kZWZpbmVkLCB0aGlzKTtcclxuXHJcblxyXG4gICAgLy8gaG9sZHMgYW4gaW5zdGFuY2Ugb2YgdGhpcyBjbGFzc1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBUZXh0UHJvdmlkZXJ8dW5kZWZpbmVkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICpDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFRleHRQcm92aWRlci5cclxuICAgICAqIEBtZW1iZXJvZiBUZXh0UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCl7XHJcblxyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXplcyB0aGUgY29tcG9uZW50XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRleHRQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaW5pdGlhbGl6ZUNvbXBvbmVudCgpe1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmlkID0gXCJUZXh0UHJvdmlkZXJcIjtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC50eXBlID0gXCJUZXh0UHJvdmlkZXJcIjtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5kZWZhdWx0U2V0dGluZ3NEYXRhSWQgPSBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuVGV4dFByb3ZpZGVyRGVmaW5pdGlvbklkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRleHRQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaW5pdGlhbGl6ZSgpe1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmxvYWRDb21wb25lbnRTZXR0aW5ncygpO1xyXG4gICAgICAgIGxldCBzZXR0aW5ncyA9IHRoaXMuY29tcG9uZW50LmdldENvbXBvbmVudFNldHRpbmdzKCk7XHJcbiAgICAgICAgaWYoc2V0dGluZ3MgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5zZXRDb21wb25lbnRTZXR0aW5ncyhzZXR0aW5ncyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzcG9zZXMgdGhpcyBjb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRpc3Bvc2UoKXtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5zYXZlQ29tcG9uZW50U2V0dGluZ3MoKTtcclxuICAgICAgICB0aGlzLmNsZWFyQWxsVGV4dHMoKTtcclxuICAgICAgICBUZXh0UHJvdmlkZXIuX2luc3RhbmNlID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBcclxuICAgICAqIENsZWFycyBhbGwgdGhlIGRhdGEgb2YgdGhpcyBjb21wb25lbnRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgVGV4dFByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjbGVhcigpe1xyXG4gICAgICAgIHRoaXMuY2xlYXJBbGxUZXh0cygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBDb21wb25lbnRTZXR0aW5nc1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsoQ29tcG9uZW50U2V0dGluZ3N8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBUZXh0UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldERlZmF1bHRDb21wb25lbnRTZXR0aW5ncygpOiBDb21wb25lbnRTZXR0aW5nc3x1bmRlZmluZWQge1xyXG4gICAgICAgIHJldHVybiBEZWZhdWx0Q29tcG9uZW50U2V0dGluZ3MuZ2V0VGV4dFByb3ZpZGVyRGVmaW5pdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgY3VycmVudCBDb21wb25lbnRTZXR0aW5nc1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnRTZXR0aW5nc31cclxuICAgICAqIEBtZW1iZXJvZiBUZXh0UHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldENvbXBvbmVudFNldHRpbmdzKCk6IENvbXBvbmVudFNldHRpbmdzIHtcclxuICAgICAgICBsZXQgdGV4dFJlc291cmNlc0FzU2V0dGluZ3MgPSBuZXcgQXJyYXk8SVNldHRpbmdzPigpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX3RleHREYXRhLmZvckVhY2goKHJlc291cmNlKSA9PiB7XHJcbiAgICAgICAgICAgIHRleHRSZXNvdXJjZXNBc1NldHRpbmdzLnB1c2gocmVzb3VyY2UuZ2V0U2V0dGluZ3MoKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuc2V0U2V0dGluZyh0aGlzLl9zZXR0aW5nc0lkLCB0ZXh0UmVzb3VyY2VzQXNTZXR0aW5ncyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcG9uZW50LmdldENvbXBvbmVudFNldHRpbmdzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBnaXZlbiBDb21wb25lbnRTZXR0aW5nc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7KENvbXBvbmVudFNldHRpbmdzfHVuZGVmaW5lZCl9IHNldHRpbmdzXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFRleHRQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0Q29tcG9uZW50U2V0dGluZ3Moc2V0dGluZ3M6IENvbXBvbmVudFNldHRpbmdzfHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuY2xlYXIoKTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5zZXRDb21wb25lbnRTZXR0aW5ncyhzZXR0aW5ncyk7XHJcbiAgICAgICAgaWYoc2V0dGluZ3MgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWRMYW5ndWFnZSA9IHRoaXMuY29tcG9uZW50LmdldFNldHRpbmcoU2V0dGluZ0lkcy5TZWxlY3RlZExhbmd1YWdlKSBhcyBzdHJpbmc7XHJcbiAgICAgICAgdGhpcy5fZmFsbGJhY2tMYW5ndWFnZSA9IHRoaXMuY29tcG9uZW50LmdldFNldHRpbmcoU2V0dGluZ0lkcy5GYWxsYmFja0xhbmd1YWdlKSBhcyBzdHJpbmc7XHJcbiAgICAgICAgbGV0IHRleHRSZXNvdXJjZXNTZXR0aW5ncyA6IEFycmF5PElTZXR0aW5ncz4gPSB0aGlzLmNvbXBvbmVudC5nZXRTZXR0aW5nKFNldHRpbmdJZHMuVGV4dFJlc291cmNlcykgO1xyXG5cclxuICAgICAgICBpZih0ZXh0UmVzb3VyY2VzU2V0dGluZ3MgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGV4dFJlc291cmNlc1NldHRpbmdzLmZvckVhY2godGV4dFJlc291cmNlc1NldHRpbmcgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRleHRSZXNvdXJjZSA9IFRleHRSZXNvdXJjZS5jcmVhdGUodGV4dFJlc291cmNlc1NldHRpbmcpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRSZXBsYWNlVGV4dFJlc291cmNlKHRleHRSZXNvdXJjZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSByZXF1ZXN0ZWQgdGV4dCwgYSBmYWxsYmFjayB0ZXh0IG9yIGFuIGVycm9yIHRleHRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZXNwYWNlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dElEXHJcbiAgICAgKiBAcGFyYW0geyp9IFtsYW5ndWFnZUNvZGU9dGhpcy5mYWxsYmFja0xhbmd1YWdlXVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBUZXh0U3lzdGVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRSYXdUZXh0KG5hbWVzcGFjZTogc3RyaW5nLCB0ZXh0SUQ6c3RyaW5nLCBsYW5ndWFnZUNvZGUgPSB0aGlzLl9zZWxlY3RlZExhbmd1YWdlKTogc3RyaW5nIHtcclxuXHJcbiAgICAgICAgbGV0IHRleHQgPSB0aGlzLmdldFRleHROb0ZhbGxiYWNrKG5hbWVzcGFjZSx0ZXh0SUQsbGFuZ3VhZ2VDb2RlKTtcclxuXHJcbiAgICAgICAgLy8gZmFsbGJhY2sgMTogdXNlIGZhbGxiYWNrIGxhbmd1YWdlXHJcbiAgICAgICAgaWYodGV4dCA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0ZXh0ID0gdGhpcy5nZXRUZXh0Tm9GYWxsYmFjayhuYW1lc3BhY2UsdGV4dElELHRoaXMuX2ZhbGxiYWNrTGFuZ3VhZ2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gZmFsbGJhY2sgMjogdXNlIHN5c3RlbSBsYW5ndWFnZVxyXG4gICAgICAgIGlmKHRleHQgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGV4dCA9IHRoaXMuZ2V0VGV4dE5vRmFsbGJhY2sobmFtZXNwYWNlLHRleHRJRCx0aGlzLl9zeXN0ZW1MYW5ndWFnZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyByZXR1cm4gdGV4dCB3aXRoIGVycm9yIG1lc3NhZ2VcclxuICAgICAgICBpZih0ZXh0ID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRleHQgPSB0aGlzLmNyZWF0ZUVycm9yTWVzc2FnZShuYW1lc3BhY2UsdGV4dElEKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0ZXh0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgcmVxdWVzdGVkIHRleHQsIGEgZmFsbGJhY2sgdGV4dCBvciBhbiBlcnJvciB0ZXh0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZ1bGx5UXVhbGlmaWVkVGV4dElEXHJcbiAgICAgKiBAcGFyYW0geyp9IFtsYW5ndWFnZUNvZGU9dGhpcy5fc2VsZWN0ZWRMYW5ndWFnZV1cclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgVGV4dFByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRSYXdUZXh0QnlGdWxseVF1YWxpZmllZFRleHRJZChmdWxseVF1YWxpZmllZFRleHRJRCA6IHN0cmluZywgbGFuZ3VhZ2VDb2RlID0gdGhpcy5fc2VsZWN0ZWRMYW5ndWFnZSkgOiBzdHJpbmd7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcmV0cmlldmUgbmFtZXNwYWNlIGFuZCB0ZXh0SWRcclxuICAgICAgICBsZXQgdGV4dFF1YWxpZmllciA9IHRoaXMuZGVjb2RlRnVsbHlRdWFsaWZpZWRUZXh0SWQoZnVsbHlRdWFsaWZpZWRUZXh0SUQpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRSYXdUZXh0KHRleHRRdWFsaWZpZXIubmFtZXNwYWNlLHRleHRRdWFsaWZpZXIudGV4dElkLGxhbmd1YWdlQ29kZSlcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0ZXh0IHdpdGggcmVzb2x2ZWQgZm9ybWF0IGl0ZW1zXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVzcGFjZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRJRFxyXG4gICAgICogQHBhcmFtIHtBcnJheTxGb3JtYXR0ZXJBcmd1bWVudFR5cGU+fSBmb3JtYXR0ZXJBcmdzXHJcbiAgICAgKiBAcGFyYW0geyp9IFtsYW5ndWFnZUNvZGU9dGhpcy5fc2VsZWN0ZWRMYW5ndWFnZV1cclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgVGV4dFByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRGb3JtYXR0ZWRUZXh0KG5hbWVzcGFjZTogc3RyaW5nLCB0ZXh0SUQ6c3RyaW5nLCBmb3JtYXR0ZXJBcmdzIDogQXJyYXk8SUZvcm1hdHRlcklucHV0QXJndW1lbnQ+LCBsYW5ndWFnZUNvZGUgPSB0aGlzLl9zZWxlY3RlZExhbmd1YWdlKTogc3RyaW5nIHtcclxuXHJcbiAgICAgICAgLy8gZ2V0IHRoZSB0ZXh0IHRoYXQgdGhlIGZvcm1hdHRlciBzaG91bGQgd29yayB3aXRoXHJcbiAgICAgICAgbGV0IHJhd1RleHQgPSB0aGlzLmdldFJhd1RleHQobmFtZXNwYWNlLCB0ZXh0SUQsIGxhbmd1YWdlQ29kZSk7XHJcblxyXG4gICAgICAgIC8vIHByZXBhcmUgYSByZWZlcmVjZSB0aGUgdGhpcyB0ZXh0IHN5c3RlbSwgc28gdGhhdCB0aGUgZm9ybWF0dGVyIGNhbiBnZXQgYSB0ZXh0IGlmIHJlcXVpcmVkIChlLmcuIHRvIHJlc29sdmUgYSBmb3JtYXQgaXRlbSBzdWNoIGFzIHskc29tZU5hbWVzcGFjZS9zb21lVGV4dElkfSlcclxuICAgICAgICBsZXQgdGV4dFN5c3RlbUludGVyZmFjZSA6IElUZXh0UHJvdmlkZXIgPSB0aGlzO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAvLyBUT0RPIEpvaGFubjogSW1wbGVtZW50IHVzYWdlIG9mIGZvcm1hdHRlclxyXG4gICAgICAgIHRocm93IG5ldyAgRXJyb3IoXCJub3QgaW1wbGVtZW50ZWRcIik7XHJcbiAgICAgICAgLy8gQEpvaGFubiwgdGhpcyBpcyBob3cgdGhlIHRleHQgZm9ybWF0dGVyIGNvdWxkIGJlIGNhbGxlZDpcclxuICAgICAgICAvL3JldHVybiBUZXh0Rm9ybWF0dGVyLkZvcm1hdFRleHQocmF3VGV4dCwgdGV4dFN5c3RlbUludGVyZmFjZSwgZm9ybWF0dGVyQXJncywgbGFuZ3VhZ2VDb2RlKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBtZXRob2QgYWxsb3dzIHRvIGFkZCBhIG5ldyBuYW1lc3BhY2Ugd2l0aCB0ZXh0cy4gSSB0aGUgbmFtZXNwYWNlIGV4aXN0cyBpbiB0aGUgZ2l2ZW4gbGFuZ3VhZ2VzLCB0aGUgZXhpc3Rpbmcgb25lIGlzIGNvbXBsZXRlbHkgcmVwbGFjZWQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVzcGFjZVxyXG4gICAgICogQHBhcmFtIHtNYXA8c3RyaW5nLHN0cmluZz59IHRleHRzXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW2xhbmd1YWdlQ29kZT1cImVuXCJdXHJcbiAgICAgKiBAbWVtYmVyb2YgVGV4dFN5c3RlbVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZFJlcGxhY2VUZXh0cyhuYW1lc3BhY2U6IHN0cmluZywgdGV4dHM6TWFwPHN0cmluZyxzdHJpbmc+LCBsYW5ndWFnZUNvZGU6IHN0cmluZykgIHtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIG5ldyB0ZXh0IHJlc291cmNlXHJcbiAgICAgICAgbGV0IHRleHRSZXNvdXJjZSA9IG5ldyBUZXh0UmVzb3VyY2UobmFtZXNwYWNlLHRleHRzLGxhbmd1YWdlQ29kZSk7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkUmVwbGFjZVRleHRSZXNvdXJjZSh0ZXh0UmVzb3VyY2UpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBtZXRob2QgYWxsb3dzIHRvIGFkZCBhIG5ldyBuYW1lc3BhY2Ugd2l0aCB0ZXh0cy4gSSB0aGUgbmFtZXNwYWNlIGV4aXN0cyBpbiB0aGUgZ2l2ZW4gbGFuZ3VhZ2VzLCB0aGUgZXhpc3Rpbmcgb25lIGlzIGNvbXBsZXRlbHkgcmVwbGFjZWQuXHJcbiAgICAgKiBAcGFyYW0gdGV4dFJlc291cmNlIFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZFJlcGxhY2VUZXh0UmVzb3VyY2UodGV4dFJlc291cmNlIDogVGV4dFJlc291cmNlKXtcclxuICAgICAgICAvLyBzZWFyY2ggZm9yIGV4aXN0aW5nIHRleHRzIHdpdGggbWF0Y2hpbmcgbmFtZXNwYWNlIGFuZCBsYW5ndWFnZSBjb2RlXHJcbiAgICAgICAgbGV0IG9yaWdpbmFsVGV4dFJlc291cmNlID0gdGhpcy5nZXRUZXh0UmVzb3VyY2UodGV4dFJlc291cmNlLmdldE5hbWVzcGFjZSgpLCB0ZXh0UmVzb3VyY2UuZ2V0TGFuZ3VhZ2VDb2RlKCkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKG9yaWdpbmFsVGV4dFJlc291cmNlID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIGFkZCBuZXcgdGV4dHNcclxuICAgICAgICAgICAgdGhpcy5fdGV4dERhdGEucHVzaCh0ZXh0UmVzb3VyY2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAvLyByZXBsYWNlIGV4aXN0aW5nIHRleHRzIGNvbXBsZXRlbHlcclxuICAgICAgICAgICAgb3JpZ2luYWxUZXh0UmVzb3VyY2UgPSB0ZXh0UmVzb3VyY2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIHByaXZhdGUgZ2V0VGV4dE5vRmFsbGJhY2sobmFtZXNwYWNlOiBzdHJpbmcsIHRleHRJRDpzdHJpbmcsIGxhbmd1YWdlQ29kZSA9IHRoaXMuX2ZhbGxiYWNrTGFuZ3VhZ2UgKTogc3RyaW5nfHVuZGVmaW5lZCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VGV4dFJlc291cmNlKG5hbWVzcGFjZSwgbGFuZ3VhZ2VDb2RlKT8uZ2V0VGV4dCh0ZXh0SUQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3JlYXRlRXJyb3JNZXNzYWdlKG5hbWVzcGFjZSx0ZXh0SUQpOnN0cmluZ3tcclxuICAgICAgICByZXR1cm4gXCIoRXJyb3IgXCIrdGhpcy5fZXJyb3JFdmVudElkVGV4dE5vdEF2YWlsYWJsZStcIjogXCIrbmFtZXNwYWNlK3RleHRJRCtcIilcIjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFRleHRSZXNvdXJjZShuYW1lc3BhY2U6IHN0cmluZywgbGFuZ3VhZ2VDb2RlOiBzdHJpbmcpIDogVGV4dFJlc291cmNlfHVuZGVmaW5lZHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdGV4dERhdGEuZmluZCggdGV4dFJlc291cmNlID0+IHRleHRSZXNvdXJjZS5nZXROYW1lc3BhY2UoKSA9PT0gbmFtZXNwYWNlICYmIHRleHRSZXNvdXJjZS5nZXRMYW5ndWFnZUNvZGUoKSA9PT0gbGFuZ3VhZ2VDb2RlKTtcclxuICAgIFxyXG4gICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkZWNvZGVGdWxseVF1YWxpZmllZFRleHRJZChmdWxseVFhdWxpZmllZFRleHRJZCA6IHN0cmluZykgOiBUZXh0UXVhbGlmaWVye1xyXG5cclxuICAgICAgICAvLyBzZXBlcmF0ZSBhIHN0cmluZyBcIm5hbWVzcGFjZVBhcnQxLy4uLi9uYW1lcGFjZVBhcnRuL1RleHRJZDFcIiBcclxuICAgICAgICAvLyBpbnRvIFxyXG4gICAgICAgIC8vIG5hbWVzcGFjZSA9IFwibmFtZXNwYWNlUGFydDEvLi4uL25hbWVwYWNlUGFydG5cIiBhbmQgXHJcbiAgICAgICAgLy8gdGV4dElkID0gXCJUZXh0SWQxXCJcclxuXHJcbiAgICAgICAgLy8gc2VwZXJhdGUgZWxlbWVudHMgYnkgXCIvXCJcclxuICAgICAgICBsZXQgZWxlbWVudHMgPSBmdWxseVFhdWxpZmllZFRleHRJZC5zcGxpdCh0aGlzLm5hbWVzcGFjZVNlcGVyYXRvcik7IFxyXG5cclxuICAgICAgICAvLyB0aGUgbGFzdCBlbGVtZW50IGlzIHRoZSB0ZXh0SWRcclxuICAgICAgICBsZXQgdGV4dElkID0gZWxlbWVudHNbZWxlbWVudHMubGVuZ3RoLTFdO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHJlbW92ZSB0aGUgbGFzdCBlbGVtZW50XHJcbiAgICAgICAgZWxlbWVudHMucG9wKCk7IFxyXG5cclxuICAgICAgICAvLyBjb25jYXRlbmF0ZSBhbGwgZWxtZW5ldHMgaW5zcnRpbmcgdGhlIFwiL1wiIGFnYWluXHJcbiAgICAgICAgbGV0IG5hbWVzcGFjZSA9IGVsZW1lbnRzLmpvaW4odGhpcy5uYW1lc3BhY2VTZXBlcmF0b3IpXHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgVGV4dFF1YWxpZmllcihuYW1lc3BhY2UsdGV4dElkKTtcclxuICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2xlYXJBbGxUZXh0cygpe1xyXG4gICAgICAgIC8vIGFsbCBlbGVtZW50cyBhcmUgZGVsZXRlZCAoYWxzbyBpZiB0aGlzIGFycmF5IGlzIGFjY2Vzc2VkIGJ5IG90aGVyIHJlZmVyZW5jZXMpXHJcbiAgICAgICAgdGhpcy5fdGV4dERhdGEuc3BsaWNlKDAsdGhpcy5fdGV4dERhdGEubGVuZ3RoKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxufVxyXG5cclxuY2xhc3MgVGV4dFF1YWxpZmllcntcclxuICAgIHByaXZhdGUgX25hbWVzcGFjZSAgPVwiXCI7XHJcbiAgICBwcml2YXRlIF90ZXh0SWQgICAgID1cIlwiO1xyXG5cclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IobmFtZXNwYWNlOnN0cmluZywgdGV4dElkOnN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5fbmFtZXNwYWNlID0gbmFtZXNwYWNlO1xyXG4gICAgICAgIHRoaXMuX3RleHRJZCA9IHRleHRJZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbmFtZXNwYWNlKCk6c3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lc3BhY2U7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHRleHRJZCgpOnN0cmluZ3tcclxuICAgICAgICByZXR1cm4gdGhpcy5fdGV4dElkO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuIl19