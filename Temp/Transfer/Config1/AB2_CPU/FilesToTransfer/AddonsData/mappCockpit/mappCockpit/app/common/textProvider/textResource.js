define(["require", "exports", "../persistence/settings", "./settingIds"], function (require, exports, settings_1, settingIds_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TextResource = /** @class */ (function () {
        function TextResource(namespace, texts, languageCode) {
            this._textData = new Map();
            this._namespace = namespace;
            this._languageCode = languageCode;
            this._textData = texts;
        }
        TextResource.prototype.getLanguageCode = function () {
            return this._languageCode;
        };
        TextResource.prototype.getNamespace = function () {
            return this._namespace;
        };
        TextResource.prototype.getText = function (textId) {
            return this._textData.get(textId);
        };
        TextResource.prototype.getTexts = function () {
            return this._textData;
        };
        TextResource.prototype.getSettings = function () {
            var settings = new settings_1.Settings("textResource");
            settings.setValue(settingIds_1.SettingIds.Namespace, this._namespace);
            settings.setValue(settingIds_1.SettingIds.LanguageCode, this._languageCode);
            settings.setValue(settingIds_1.SettingIds.TextData, this._textData);
            return settings;
        };
        TextResource.create = function (settings) {
            // get info from persistingdata
            var settingsObj = settings_1.Settings.create(settings);
            var namespace = settingsObj.getValue(settingIds_1.SettingIds.Namespace);
            var languageCode = settingsObj.getValue(settingIds_1.SettingIds.LanguageCode);
            var textData = settingsObj.getValue(settingIds_1.SettingIds.TextData);
            return new TextResource(namespace, textData, languageCode);
        };
        return TextResource;
    }());
    exports.TextResource = TextResource;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dFJlc291cmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vdGV4dFByb3ZpZGVyL3RleHRSZXNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFNQTtRQVFJLHNCQUFtQixTQUFpQixFQUFFLEtBQXdCLEVBQUUsWUFBb0I7WUFMNUUsY0FBUyxHQUFHLElBQUksR0FBRyxFQUFpQixDQUFDO1lBTXpDLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1lBQzVCLElBQUksQ0FBQyxhQUFhLEdBQUcsWUFBWSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQzNCLENBQUM7UUFFTSxzQ0FBZSxHQUF0QjtZQUNJLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUM5QixDQUFDO1FBRU0sbUNBQVksR0FBbkI7WUFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDM0IsQ0FBQztRQUVNLDhCQUFPLEdBQWQsVUFBZSxNQUFlO1lBQzFCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEMsQ0FBQztRQUVNLCtCQUFRLEdBQWY7WUFDSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDMUIsQ0FBQztRQUVNLGtDQUFXLEdBQWxCO1lBQ0ksSUFBSSxRQUFRLEdBQUcsSUFBSSxtQkFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQzVDLFFBQVEsQ0FBQyxRQUFRLENBQUMsdUJBQVUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3pELFFBQVEsQ0FBQyxRQUFRLENBQUMsdUJBQVUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQy9ELFFBQVEsQ0FBQyxRQUFRLENBQUMsdUJBQVUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZELE9BQU8sUUFBUSxDQUFDO1FBQ3BCLENBQUM7UUFFYSxtQkFBTSxHQUFwQixVQUFxQixRQUFvQjtZQUVyQywrQkFBK0I7WUFDL0IsSUFBSSxXQUFXLEdBQUcsbUJBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDNUMsSUFBSSxTQUFTLEdBQVksV0FBVyxDQUFDLFFBQVEsQ0FBQyx1QkFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3BFLElBQUksWUFBWSxHQUFZLFdBQVcsQ0FBQyxRQUFRLENBQUMsdUJBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMxRSxJQUFJLFFBQVEsR0FBd0IsV0FBVyxDQUFDLFFBQVEsQ0FBQyx1QkFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRTlFLE9BQU8sSUFBSSxZQUFZLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUMvRCxDQUFDO1FBRUwsbUJBQUM7SUFBRCxDQUFDLEFBakRELElBaURDO0lBakRZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVNldHRpbmdzIH0gZnJvbSBcIi4uL3BlcnNpc3RlbmNlL2ludGVyZmFjZXMvc2V0dGluZ3NJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU2V0dGluZ3MgfSBmcm9tIFwiLi4vcGVyc2lzdGVuY2Uvc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgU2V0dGluZ0lkcyB9IGZyb20gXCIuL3NldHRpbmdJZHNcIjtcclxuXHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFRleHRSZXNvdXJjZXtcclxuXHJcblxyXG4gICAgcHJpdmF0ZSBfdGV4dERhdGEgPSBuZXcgTWFwPHN0cmluZyxzdHJpbmc+KCk7XHJcbiAgICBwcml2YXRlIF9uYW1lc3BhY2UgOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF9sYW5ndWFnZUNvZGUgOiBzdHJpbmc7XHJcbiAgICBcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IobmFtZXNwYWNlOiBzdHJpbmcsIHRleHRzOk1hcDxzdHJpbmcsc3RyaW5nPiwgbGFuZ3VhZ2VDb2RlOiBzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMuX25hbWVzcGFjZSA9IG5hbWVzcGFjZTtcclxuICAgICAgICB0aGlzLl9sYW5ndWFnZUNvZGUgPSBsYW5ndWFnZUNvZGU7XHJcbiAgICAgICAgdGhpcy5fdGV4dERhdGEgPSB0ZXh0cztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0TGFuZ3VhZ2VDb2RlKCkgOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xhbmd1YWdlQ29kZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0TmFtZXNwYWNlKCkgOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWVzcGFjZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0VGV4dCh0ZXh0SWQgOiBzdHJpbmcpIDogc3RyaW5nIHwgdW5kZWZpbmVke1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90ZXh0RGF0YS5nZXQodGV4dElkKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0VGV4dHMoKSA6IE1hcDxzdHJpbmcsc3RyaW5nPntcclxuICAgICAgICByZXR1cm4gdGhpcy5fdGV4dERhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFNldHRpbmdzKCk6IElTZXR0aW5nc3tcclxuICAgICAgICBsZXQgc2V0dGluZ3MgPSBuZXcgU2V0dGluZ3MoXCJ0ZXh0UmVzb3VyY2VcIik7ICAgXHJcbiAgICAgICAgc2V0dGluZ3Muc2V0VmFsdWUoU2V0dGluZ0lkcy5OYW1lc3BhY2UsIHRoaXMuX25hbWVzcGFjZSk7XHJcbiAgICAgICAgc2V0dGluZ3Muc2V0VmFsdWUoU2V0dGluZ0lkcy5MYW5ndWFnZUNvZGUsIHRoaXMuX2xhbmd1YWdlQ29kZSk7XHJcbiAgICAgICAgc2V0dGluZ3Muc2V0VmFsdWUoU2V0dGluZ0lkcy5UZXh0RGF0YSwgdGhpcy5fdGV4dERhdGEpO1xyXG4gICAgICAgIHJldHVybiBzZXR0aW5ncztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZShzZXR0aW5ncyA6IElTZXR0aW5ncykgOiBUZXh0UmVzb3VyY2V7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZ2V0IGluZm8gZnJvbSBwZXJzaXN0aW5nZGF0YVxyXG4gICAgICAgIGxldCBzZXR0aW5nc09iaiA9IFNldHRpbmdzLmNyZWF0ZShzZXR0aW5ncyk7XHJcbiAgICAgICAgbGV0IG5hbWVzcGFjZSA6IHN0cmluZyA9IHNldHRpbmdzT2JqLmdldFZhbHVlKFNldHRpbmdJZHMuTmFtZXNwYWNlKTtcclxuICAgICAgICBsZXQgbGFuZ3VhZ2VDb2RlIDogc3RyaW5nID0gc2V0dGluZ3NPYmouZ2V0VmFsdWUoU2V0dGluZ0lkcy5MYW5ndWFnZUNvZGUpO1xyXG4gICAgICAgIGxldCB0ZXh0RGF0YSA6IE1hcDxzdHJpbmcsc3RyaW5nPiA9IHNldHRpbmdzT2JqLmdldFZhbHVlKFNldHRpbmdJZHMuVGV4dERhdGEpO1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFRleHRSZXNvdXJjZShuYW1lc3BhY2UsIHRleHREYXRhLCBsYW5ndWFnZUNvZGUpO1xyXG4gICAgfVxyXG5cclxufSJdfQ==