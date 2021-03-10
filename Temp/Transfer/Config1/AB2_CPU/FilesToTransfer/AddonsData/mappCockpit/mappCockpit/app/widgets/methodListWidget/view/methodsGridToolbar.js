define(["require", "exports", "../../../models/online/mappCockpitComponent", "../../common/domHelper", "../../common/themeProvider"], function (require, exports, mappCockpitComponent_1, domHelper_1, themeProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MethodGridToolbar = /** @class */ (function () {
        function MethodGridToolbar() {
            this.toolbarIdOff = "Off";
            this.toolbarIdStop = "Abort";
            this._buttonList = new Array();
        }
        MethodGridToolbar.prototype.getCustomToolbars = function () {
            return [{ text: this.toolbarIdOff, tooltipText: this.toolbarIdOff }, { text: this.toolbarIdStop, tooltipText: this.toolbarIdStop }];
        };
        MethodGridToolbar.prototype.setStyleForToolbarIcons = function (divId) {
            // Clear the button list
            this._buttonList.splice(0, this._buttonList.length);
            this._parentDivId = divId;
            var powerOffIcon = themeProvider_1.ThemeProvider.getInstance().getThemedFilePath("widgets/methodListWidget/style/images/toolbar/Off_white.svg");
            var abortCommandIcon = themeProvider_1.ThemeProvider.getInstance().getThemedFilePath("widgets/methodListWidget/style/images/toolbar/Stop_white.svg");
            this.addMethodToolbarButton(divId, this.toolbarIdOff, "Power Off", powerOffIcon);
            this.addMethodToolbarButton(divId, this.toolbarIdStop, "Abort Command", abortCommandIcon);
        };
        MethodGridToolbar.prototype.dispose = function () {
            if (this._parentDivId != undefined) {
                this.destroyButton(this._parentDivId, this.toolbarIdOff);
                this.destroyButton(this._parentDivId, this.toolbarIdStop);
            }
        };
        MethodGridToolbar.prototype.addMethodToolbarButton = function (divId, toolbarId, methodId, imagePath) {
            var _this = this;
            var buttonId = divId + "_" + toolbarId;
            this._buttonList.push({ buttonId: buttonId, methodId: methodId });
            $(buttonId).ejButton({
                cssClass: "methodListToolbarButton",
                text: toolbarId,
                contentType: ej.ContentType.TextAndImage,
                width: "100px",
                height: "20px",
                click: function (args) { return _this.toolbarButtonClick(methodId); },
            });
            var buttonElement = $(buttonId)[0];
            buttonElement.style.backgroundPositionX = "7px";
            buttonElement.style.backgroundPositionY = "5px";
            buttonElement.style.backgroundImage = "url('" + imagePath + "')";
            buttonElement.style.backgroundRepeat = "no-repeat";
            buttonElement.style.backgroundSize = "20px 20px";
        };
        /**
         * Destroys the button object
         *
         * @private
         * @param {string} divId
         * @param {string} toolbarId
         * @memberof MethodGridToolbar
         */
        MethodGridToolbar.prototype.destroyButton = function (divId, toolbarId) {
            var buttonId = divId + "_" + toolbarId;
            var button = $(buttonId).data("ejButton");
            if (button != undefined) {
                button.destroy();
            }
        };
        MethodGridToolbar.prototype.toolbarButtonClick = function (methodId) {
            var method = mappCockpitComponent_1.MappCockpitComponentMethod.find(methodId, this._actualComponentMethods);
            if (method) {
                if (method.isExecutable != undefined) {
                    if (method.isExecutable.value == true) {
                        mappCockpitComponent_1.MappCockpitComponentMethod.execute(method);
                    }
                }
            }
        };
        /**
         * Observes if the executability of a method has changed
         *
         * @private
         * @param {string} methodId
         * @param {string} buttonId
         * @memberof MethodGridToolbar
         */
        MethodGridToolbar.prototype.observeMethodExecutabilityForButtonState = function (methodId, buttonId) {
            var _this = this;
            var method = mappCockpitComponent_1.MappCockpitComponentMethod.find(methodId, this._actualComponentMethods);
            if (method) {
                if (method.isExecutable != undefined) {
                    // Set init state of button   
                    this.setButtonState(buttonId, method.isExecutable.value);
                }
                method.isExecutable.changed(function (isExecutable) {
                    // Refresh button state
                    _this.setButtonState(buttonId, isExecutable);
                });
            }
            else {
                this.setButtonState(buttonId, false);
            }
        };
        MethodGridToolbar.prototype.setButtonState = function (buttonId, activated) {
            // get button instance;
            var button = $(buttonId).data("ejButton");
            if (!button) {
                return;
            }
            //button.option({enabled: isExecutable});
            if (activated) {
                // set button active state
                button.option({ cssClass: "methodListToolbarButton" });
            }
            else {
                // set button deactivated state
                button.option({ cssClass: "methodListToolbarButtonDeactivated" });
            }
            domHelper_1.DomHelper.disableElement($(buttonId)[0], !activated);
        };
        MethodGridToolbar.prototype.setActualComponentMethods = function (actualComponentMethods) {
            var _this = this;
            this._actualComponentMethods = actualComponentMethods;
            this._buttonList.forEach(function (button) {
                _this.observeMethodExecutabilityForButtonState(button.methodId, button.buttonId);
            });
        };
        return MethodGridToolbar;
    }());
    exports.MethodGridToolbar = MethodGridToolbar;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0aG9kc0dyaWRUb29sYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL21ldGhvZExpc3RXaWRnZXQvdmlldy9tZXRob2RzR3JpZFRvb2xiYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBSUE7UUFBQTtZQUdxQixpQkFBWSxHQUFFLEtBQUssQ0FBQztZQUNwQixrQkFBYSxHQUFFLE9BQU8sQ0FBQztZQUVoQyxnQkFBVyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7UUE2SHRDLENBQUM7UUF6SFUsNkNBQWlCLEdBQXhCO1lBQ0ksT0FBTyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFDLENBQUMsQ0FBQztRQUN0SSxDQUFDO1FBRU0sbURBQXVCLEdBQTlCLFVBQStCLEtBQUs7WUFFaEMsd0JBQXdCO1lBQ3hCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRW5ELElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1lBRTFCLElBQUksWUFBWSxHQUFHLDZCQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsaUJBQWlCLENBQUMsNkRBQTZELENBQUMsQ0FBQztZQUNoSSxJQUFJLGdCQUFnQixHQUFHLDZCQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsaUJBQWlCLENBQUMsOERBQThELENBQUMsQ0FBQztZQUNySSxJQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLFlBQVksQ0FBQyxDQUFDO1lBQ2pGLElBQUksQ0FBQyxzQkFBc0Is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QUcsc0JBQXNCLENBQUM7WUFFdEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBQSxNQUFNO2dCQUUzQixLQUFJLENBQUMsd0NBQXdDLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDcEYsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBQ0wsd0JBQUM7SUFBRCxDQUFDLEFBbklELElBbUlDO0lBbklZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVscy9vbmxpbmUvbWFwcENvY2twaXRDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgRG9tSGVscGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9kb21IZWxwZXJcIjtcclxuaW1wb3J0IHsgVGhlbWVQcm92aWRlciB9IGZyb20gXCIuLi8uLi9jb21tb24vdGhlbWVQcm92aWRlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1ldGhvZEdyaWRUb29sYmFye1xyXG4gICAgXHJcbiAgICBwcml2YXRlIF9hY3R1YWxDb21wb25lbnRNZXRob2RzOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZD58dW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSB0b29sYmFySWRPZmYgPVwiT2ZmXCI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHRvb2xiYXJJZFN0b3AgPVwiQWJvcnRcIjtcclxuXHJcbiAgICBwcml2YXRlIF9idXR0b25MaXN0ID0gbmV3IEFycmF5KCk7XHJcblxyXG4gICAgcHJpdmF0ZSBfcGFyZW50RGl2SWQ6IHN0cmluZ3x1bmRlZmluZWQ7XHJcbiAgICBcclxuICAgIHB1YmxpYyBnZXRDdXN0b21Ub29sYmFycyAoKTphbnl7XHJcbiAgICAgICAgcmV0dXJuIFt7IHRleHQ6IHRoaXMudG9vbGJhcklkT2ZmLCB0b29sdGlwVGV4dDogdGhpcy50b29sYmFySWRPZmZ9LCB7IHRleHQ6IHRoaXMudG9vbGJhcklkU3RvcCwgdG9vbHRpcFRleHQ6IHRoaXMudG9vbGJhcklkU3RvcH1dO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRTdHlsZUZvclRvb2xiYXJJY29ucyhkaXZJZCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIENsZWFyIHRoZSBidXR0b24gbGlzdFxyXG4gICAgICAgIHRoaXMuX2J1dHRvbkxpc3Quc3BsaWNlKDAsdGhpcy5fYnV0dG9uTGlzdC5sZW5ndGgpO1xyXG5cclxuICAgICAgICB0aGlzLl9wYXJlbnREaXZJZCA9IGRpdklkO1xyXG5cclxuICAgICAgICBsZXQgcG93ZXJPZmZJY29uID0gVGhlbWVQcm92aWRlci5nZXRJbnN0YW5jZSgpLmdldFRoZW1lZEZpbGVQYXRoKFwid2lkZ2V0cy9tZXRob2RMaXN0V2lkZ2V0L3N0eWxlL2ltYWdlcy90b29sYmFyL09mZl93aGl0ZS5zdmdcIik7XHJcbiAgICAgICAgbGV0IGFib3J0Q29tbWFuZEljb24gPSBUaGVtZVByb3ZpZGVyLmdldEluc3RhbmNlKCkuZ2V0VGhlbWVkRmlsZVBhdGgoXCJ3aWRnZXRzL21ldGhvZExpc3RXaWRnZXQvc3R5bGUvaW1hZ2VzL3Rvb2xiYXIvU3RvcF93aGl0ZS5zdmdcIik7XHJcbiAgICAgICAgdGhpcy5hZGRNZXRob2RUb29sYmFyQnV0dG9uKGRpdklkLCB0aGlzLnRvb2xiYXJJZE9mZiwgXCJQb3dlciBPZmZcIiwgcG93ZXJPZmZJY29uKTtcclxuICAgICAgICB0aGlzLmFkZE1ldGhvZFRvb2xiYXJCdXR0b24oZGl2SWQsIHRoaXMudG9vbGJhcklkU3RvcCwgXCJBYm9ydCBDb21tYW5kXCIsIGFib3J0Q29tbWFuZEljb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNwb3NlKCl7XHJcbiAgICAgICAgaWYodGhpcy5fcGFyZW50RGl2SWQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5kZXN0cm95QnV0dG9uKHRoaXMuX3BhcmVudERpdklkLCB0aGlzLnRvb2xiYXJJZE9mZik7XHJcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveUJ1dHRvbih0aGlzLl9wYXJlbnREaXZJZCwgdGhpcy50b29sYmFySWRTdG9wKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhZGRNZXRob2RUb29sYmFyQnV0dG9uKGRpdklkOiBzdHJpbmcsIHRvb2xiYXJJZDogc3RyaW5nLCBtZXRob2RJZDogc3RyaW5nLCBpbWFnZVBhdGg6IHN0cmluZyl7XHJcbiAgICAgICAgbGV0IGJ1dHRvbklkID0gZGl2SWQgICsgXCJfXCIgKyB0b29sYmFySWQ7IFxyXG4gICAgICAgIHRoaXMuX2J1dHRvbkxpc3QucHVzaCh7YnV0dG9uSWQ6IGJ1dHRvbklkLCBtZXRob2RJZDogbWV0aG9kSWR9KTtcclxuICAgICAgICAkKGJ1dHRvbklkKS5lakJ1dHRvbih7XHJcbiAgICAgICAgICAgIGNzc0NsYXNzOiBcIm1ldGhvZExpc3RUb29sYmFyQnV0dG9uXCIsXHJcbiAgICAgICAgICAgIHRleHQ6IHRvb2xiYXJJZCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IGVqLkNvbnRlbnRUeXBlLlRleHRBbmRJbWFnZSxcclxuICAgICAgICAgICAgd2lkdGg6IFwiMTAwcHhcIixcclxuICAgICAgICAgICAgaGVpZ2h0OiBcIjIwcHhcIixcclxuICAgICAgICAgICAgY2xpY2s6IChhcmdzKSA9PiB0aGlzLnRvb2xiYXJCdXR0b25DbGljayhtZXRob2RJZCksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IGJ1dHRvbkVsZW1lbnQgPSAkKGJ1dHRvbklkKVswXTtcclxuICAgICAgICBidXR0b25FbGVtZW50LnN0eWxlLmJhY2tncm91bmRQb3NpdGlvblggPSBcIjdweFwiO1xyXG4gICAgICAgIGJ1dHRvbkVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uWSA9IFwiNXB4XCI7XHJcbiAgICAgICAgYnV0dG9uRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybCgnXCIgKyBpbWFnZVBhdGggK1wiJylcIjtcclxuICAgICAgICBidXR0b25FbGVtZW50LnN0eWxlLmJhY2tncm91bmRSZXBlYXQgPSBcIm5vLXJlcGVhdFwiO1xyXG4gICAgICAgIGJ1dHRvbkVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZFNpemUgPSBcIjIwcHggMjBweFwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVzdHJveXMgdGhlIGJ1dHRvbiBvYmplY3RcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRpdklkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdG9vbGJhcklkXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kR3JpZFRvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkZXN0cm95QnV0dG9uKGRpdklkOiBzdHJpbmcsIHRvb2xiYXJJZDogc3RyaW5nKXtcclxuICAgICAgICBsZXQgYnV0dG9uSWQgPSBkaXZJZCAgKyBcIl9cIiArIHRvb2xiYXJJZDsgXHJcbiAgICAgICAgbGV0IGJ1dHRvbiA9ICQoYnV0dG9uSWQpLmRhdGEoXCJlakJ1dHRvblwiKTtcclxuICAgICAgICBpZihidXR0b24gIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgYnV0dG9uLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0b29sYmFyQnV0dG9uQ2xpY2sobWV0aG9kSWQ6IHN0cmluZyl7XHJcbiAgICAgICAgbGV0IG1ldGhvZCA9IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLmZpbmQobWV0aG9kSWQsIHRoaXMuX2FjdHVhbENvbXBvbmVudE1ldGhvZHMpO1xyXG4gICAgICAgIGlmIChtZXRob2QpIHtcclxuICAgICAgICAgICAgaWYobWV0aG9kLmlzRXhlY3V0YWJsZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgaWYobWV0aG9kLmlzRXhlY3V0YWJsZS52YWx1ZSA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgICAgICBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZC5leGVjdXRlKG1ldGhvZCk7ICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPYnNlcnZlcyBpZiB0aGUgZXhlY3V0YWJpbGl0eSBvZiBhIG1ldGhvZCBoYXMgY2hhbmdlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWV0aG9kSWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBidXR0b25JZFxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZEdyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb2JzZXJ2ZU1ldGhvZEV4ZWN1dGFiaWxpdHlGb3JCdXR0b25TdGF0ZShtZXRob2RJZDogc3RyaW5nLCBidXR0b25JZDogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IG1ldGhvZCA9ICAgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QuZmluZChtZXRob2RJZCwgdGhpcy5fYWN0dWFsQ29tcG9uZW50TWV0aG9kcyk7XHJcbiAgICAgICAgaWYgKG1ldGhvZCkge1xyXG4gICAgICAgICAgICBpZihtZXRob2QuaXNFeGVjdXRhYmxlICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAvLyBTZXQgaW5pdCBzdGF0ZSBvZiBidXR0b24gICBcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QnV0dG9uU3RhdGUoYnV0dG9uSWQsIG1ldGhvZC5pc0V4ZWN1dGFibGUudmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG1ldGhvZC5pc0V4ZWN1dGFibGUuY2hhbmdlZCgoaXNFeGVjdXRhYmxlKT0+e1xyXG4gICAgICAgICAgICAgICAgLy8gUmVmcmVzaCBidXR0b24gc3RhdGVcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QnV0dG9uU3RhdGUoYnV0dG9uSWQsIGlzRXhlY3V0YWJsZSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0QnV0dG9uU3RhdGUoYnV0dG9uSWQsIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0QnV0dG9uU3RhdGUoYnV0dG9uSWQ6IHN0cmluZywgYWN0aXZhdGVkOiBib29sZWFuKXtcclxuICAgICAgICAvLyBnZXQgYnV0dG9uIGluc3RhbmNlO1xyXG4gICAgICAgIGxldCBidXR0b24gPSAkKGJ1dHRvbklkKS5kYXRhKFwiZWpCdXR0b25cIik7XHJcbiAgICAgICAgaWYoIWJ1dHRvbil7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9idXR0b24ub3B0aW9uKHtlbmFibGVkOiBpc0V4ZWN1dGFibGV9KTtcclxuICAgICAgICBpZihhY3RpdmF0ZWQpe1xyXG4gICAgICAgICAgICAvLyBzZXQgYnV0dG9uIGFjdGl2ZSBzdGF0ZVxyXG4gICAgICAgICAgICBidXR0b24ub3B0aW9uKHtjc3NDbGFzczogXCJtZXRob2RMaXN0VG9vbGJhckJ1dHRvblwifSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIC8vIHNldCBidXR0b24gZGVhY3RpdmF0ZWQgc3RhdGVcclxuICAgICAgICAgICAgYnV0dG9uLm9wdGlvbih7Y3NzQ2xhc3M6IFwibWV0aG9kTGlzdFRvb2xiYXJCdXR0b25EZWFjdGl2YXRlZFwifSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIERvbUhlbHBlci5kaXNhYmxlRWxlbWVudCgkKGJ1dHRvbklkKVswXSwgIWFjdGl2YXRlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0QWN0dWFsQ29tcG9uZW50TWV0aG9kcyhhY3R1YWxDb21wb25lbnRNZXRob2RzOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZD4pe1xyXG4gICAgICAgIHRoaXMuX2FjdHVhbENvbXBvbmVudE1ldGhvZHMgPSBhY3R1YWxDb21wb25lbnRNZXRob2RzO1xyXG5cclxuICAgICAgICB0aGlzLl9idXR0b25MaXN0LmZvckVhY2goYnV0dG9uID0+IHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2ZU1ldGhvZEV4ZWN1dGFiaWxpdHlGb3JCdXR0b25TdGF0ZShidXR0b24ubWV0aG9kSWQsIGJ1dHRvbi5idXR0b25JZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iXX0=