define(["require", "exports", "../../../models/online/mappCockpitComponent", "../../common/domHelper", "../../../common/directoryProvider", "../../common/imageProvider", "../../common/themeProvider"], function (require, exports, mappCockpitComponent_1, domHelper_1, directoryProvider_1, imageProvider_1, themeProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MethodGridToolbar = /** @class */ (function () {
        function MethodGridToolbar() {
            this.toolbarIdOff = "Off";
            this.toolbarIdStop = "Abort";
            this._imageDirectory = "../../../" + directoryProvider_1.DirectoryProvider.getWidgetsDirectory() + "methodListWidget/style/images/toolbar/";
            this._buttonList = new Array();
        }
        MethodGridToolbar.prototype.initToolbar = function (divId) {
            this._parentDivId = divId;
            // Clear the button list
            this._buttonList.splice(0, this._buttonList.length);
            this.setToolBarHeight();
        };
        /**
         * Define toolbar buttons
         *
         * @param {(MappCockpitQuickCommandParameter[] | undefined)} commands
         * @returns {*}
         * @memberof MethodGridToolbar
         */
        MethodGridToolbar.prototype.getCustomToolbars = function (commands) {
            if (commands == undefined || commands.length == 0) {
                return [{ text: this.toolbarIdOff, tooltipText: this.toolbarIdOff }, { text: this.toolbarIdStop, tooltipText: this.toolbarIdStop }];
            }
            else {
                var toolbar_1 = new Array();
                for (var i = 0; i < commands.length; i++) {
                    toolbar_1.push({ text: commands[i].name.replace(/\s/g, '_'), tooltipText: commands[i].tooltip });
                }
                return toolbar_1;
            }
        };
        MethodGridToolbar.prototype.dispose = function () {
            if (this._parentDivId != undefined) {
                for (var i = 0; i < this._buttonList.length; i++) {
                    this.destroyButton(this._parentDivId, this._buttonList[i].buttonId);
                }
            }
        };
        /**
         * Add toolbar for quick command buttons
         *
         * @param {string} methodId
         * @param {string} imageName
         * @memberof MethodGridToolbar
         */
        MethodGridToolbar.prototype.addCustomToolbarButtons = function (methodId, imageName) {
            var id = methodId.replace(/\s/g, '_');
            var buttonId = this._parentDivId + "_" + id;
            var imagePath = this._imageDirectory + imageName + '.svg';
            this.addMethodToolbarButton(buttonId, methodId, imagePath, '', '30px', false);
        };
        /**
         *
         *
         * @memberof MethodGridToolbar
         */
        MethodGridToolbar.prototype.addDefaultToolbarButtons = function () {
            var powerOffIcon = themeProvider_1.ThemeProvider.getInstance().getThemedFilePath("widgets/methodListWidget/style/images/toolbar/Off_white.svg");
            var abortCommandIcon = themeProvider_1.ThemeProvider.getInstance().getThemedFilePath("widgets/methodListWidget/style/images/toolbar/Stop_white.svg");
            var buttonIdOff = this._parentDivId + "_" + this.toolbarIdOff;
            var buttonIdAbort = this._parentDivId + "_" + this.toolbarIdStop;
            this.addMethodToolbarButton(buttonIdOff, "Power Off", powerOffIcon, this.toolbarIdOff, "100px", true);
            this.addMethodToolbarButton(buttonIdAbort, "Abort Command", abortCommandIcon, this.toolbarIdStop, "100px", true);
        };
        MethodGridToolbar.prototype.addMethodToolbarButton = function (buttonId, methodId, imagePath, text, buttonWidth, defaultBckgColor) {
            var _this = this;
            this._buttonList.push({ buttonId: buttonId, methodId: methodId });
            $(buttonId).ejButton({
                cssClass: 'methodListToolbarButton',
                text: text,
                contentType: ej.ContentType.TextAndImage,
                width: buttonWidth,
                height: "20px",
                click: function (args) { return _this.toolbarButtonClick(methodId); },
            });
            this.setButtonStyle(buttonId, imagePath, methodId, defaultBckgColor);
        };
        /**
         *
         *
         * @private
         * @param {string} buttonId
         * @param {string} imagePath
         * @memberof MethodGridToolbar
         */
        MethodGridToolbar.prototype.setButtonStyle = function (buttonId, imagePath, methodId, defaultBckgColor) {
            var backgroundColor;
            var buttonElement = $(buttonId)[0];
            buttonElement.style.backgroundPositionX = "7px";
            buttonElement.style.backgroundPositionY = "5px";
            buttonElement.style.backgroundImage = "url(" + imagePath + ")";
            if (!defaultBckgColor) {
                backgroundColor = this.getBackgroundColor(imagePath, methodId);
            }
            else {
                backgroundColor = '#531E00';
            }
            buttonElement.style.backgroundRepeat = "no-repeat";
            buttonElement.style.backgroundSize = "20px 20px";
            buttonElement.style.backgroundColor = backgroundColor;
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
        /**
         * Execute corresponding method when button is clicked
         *
         * @private
         * @param {string} methodId
         * @memberof MethodGridToolbar
         */
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
        MethodGridToolbar.prototype.setToolBarHeight = function () {
            //Workaround: toolbar height changes when it is updated a second time. Here we set to the size we want.
            var $toolbar = $(this._parentDivId + '_toolbarItems');
            $toolbar[0].style.setProperty('height', '33px', 'important');
        };
        /**
         * Getting background color from svg element
         *
         * @private
         * @param {string} imagePath
         * @param {string} methodId
         * @returns
         * @memberof MethodGridToolbar
         */
        MethodGridToolbar.prototype.getBackgroundColor = function (imagePath, methodId) {
            var image = imagePath.split("../../../mappCockpit/app/widgets/methodListWidget/style/images/toolbar/")[1];
            var svgData = imageProvider_1.ImageProvider.getInstance().getImage("../app/widgets/methodListWidget/style/images/toolbar/" + image);
            var stringSplitted = svgData.split('background-color');
            var errorMessage = 'BackgroundColor could not be retrieved from method: ' + methodId;
            if (stringSplitted[1] != undefined) {
                try {
                    var backgroundColor = stringSplitted[1].split('"')[1].replace(' ', '');
                    if (/^#([0-9A-F]{3}){1,2}$/i.test(backgroundColor)) {
                        return backgroundColor;
                    }
                }
                catch (_a) {
                    console.error(errorMessage);
                    return '';
                }
            }
            console.error(errorMessage);
            return '';
        };
        return MethodGridToolbar;
    }());
    exports.MethodGridToolbar = MethodGridToolbar;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0aG9kc0dyaWRUb29sYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL21ldGhvZExpc3RXaWRnZXQvdmlldy9tZXRob2RzR3JpZFRvb2xiYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBTUE7UUFBQTtZQUdxQixpQkFBWSxHQUFHLEtBQUssQ0FBQztZQUNyQixrQkFBYSxHQUFHLE9BQU8sQ0FBQztZQUV4QixvQkFBZSxHQUFHLFdBQVcsR0FBRyxxQ0FBaUIsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLHdDQUF3QyxDQUFBO1lBRTNILGdCQUFXLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQXNPdEMsQ0FBQztRQWxPVSx1Q0FBVyxHQUFsQixVQUFtQixLQUFLO1lBQ3BCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1lBRTFCLHdCQUF3QjtZQUN4QixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUVuRCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUM1QixDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0ksNkNBQWlCLEdBQXhCLFVBQTBCLFFBQXdEO1lBQzlFLElBQUksUUFBUSxJQUFJLFNBQVMsSUFBSSxRQUFRLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtnQkFDL0MsT0FBTyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFDLENBQUMsQ0FBQzthQUNySTtpQkFDSTtnQkFDRCxJQUFJLFNBQU8sR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO2dCQUMxQixLQUFLLElBQUks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UUFBUSxFQUFDLE1BQU0sRUFBQyxXQUFXLENBQUMsQ0FBQztRQUMvRCxDQUFDO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDSyw4Q0FBa0IsR0FBMUIsVUFBMkIsU0FBaUIsRUFBRSxRQUFnQjtZQUMxRCxJQUFJLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLHlFQUF5RSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUcsSUFBSSxPQUFPLEdBQUcsNkJBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsdURBQXVELEdBQUcsS0FBSyxDQUFDLENBQUM7WUFDcEgsSUFBSSxjQUFjLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQ3ZELElBQUksWUFBWSxHQUFHLHNEQUFzRCxHQUFHLFFBQVEsQ0FBQztZQUNyRixJQUFJLGNBQWMsQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLEVBQUU7Z0JBQ2hDLElBQUk7b0JBQ0EsSUFBSSxlQUFlLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUN0RSxJQUFHLHdCQUF3QixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRTt3QkFDL0MsT0FBTyxlQUFlLENBQUM7cUJBQzFCO2lCQUNKO2dCQUNELFdBQU07b0JBQ0YsT0FBTyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFDNUIsT0FBTyxFQUFFLENBQUM7aUJBQ2I7YUFDSjtZQUNELE9BQU8sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDNUIsT0FBTyxFQUFFLENBQUM7UUFDZCxDQUFDO1FBQ0wsd0JBQUM7SUFBRCxDQUFDLEFBOU9ELElBOE9DO0lBOU9ZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLCBNYXBwQ29ja3BpdFF1aWNrQ29tbWFuZFBhcmFtZXRlciB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50XCI7XHJcbmltcG9ydCB7IERvbUhlbHBlciB9IGZyb20gXCIuLi8uLi9jb21tb24vZG9tSGVscGVyXCI7XHJcbmltcG9ydCB7IERpcmVjdG9yeVByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9kaXJlY3RvcnlQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBJbWFnZVByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9pbWFnZVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IFRoZW1lUHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3RoZW1lUHJvdmlkZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBNZXRob2RHcmlkVG9vbGJhcntcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfYWN0dWFsQ29tcG9uZW50TWV0aG9kczogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRNZXRob2Q+fHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgdG9vbGJhcklkT2ZmID0gXCJPZmZcIjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgdG9vbGJhcklkU3RvcCA9IFwiQWJvcnRcIjtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9pbWFnZURpcmVjdG9yeSA9IFwiLi4vLi4vLi4vXCIgKyBEaXJlY3RvcnlQcm92aWRlci5nZXRXaWRnZXRzRGlyZWN0b3J5KCkgKyBcIm1ldGhvZExpc3RXaWRnZXQvc3R5bGUvaW1hZ2VzL3Rvb2xiYXIvXCJcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfYnV0dG9uTGlzdCA9IG5ldyBBcnJheSgpO1xyXG5cclxuICAgIHByaXZhdGUgX3BhcmVudERpdklkOiBzdHJpbmd8dW5kZWZpbmVkO1xyXG5cclxuICAgIHB1YmxpYyBpbml0VG9vbGJhcihkaXZJZCkge1xyXG4gICAgICAgIHRoaXMuX3BhcmVudERpdklkID0gZGl2SWQ7XHJcblxyXG4gICAgICAgIC8vIENsZWFyIHRoZSBidXR0b24gbGlzdFxyXG4gICAgICAgIHRoaXMuX2J1dHRvbkxpc3Quc3BsaWNlKDAsdGhpcy5fYnV0dG9uTGlzdC5sZW5ndGgpO1xyXG5cclxuICAgICAgICB0aGlzLnNldFRvb2xCYXJIZWlnaHQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZSB0b29sYmFyIGJ1dHRvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyhNYXBwQ29ja3BpdFF1aWNrQ29tbWFuZFBhcmFtZXRlcltdIHwgdW5kZWZpbmVkKX0gY29tbWFuZHNcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZEdyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRDdXN0b21Ub29sYmFycyAoY29tbWFuZHM6IE1hcHBDb2NrcGl0UXVpY2tDb21tYW5kUGFyYW1ldGVyW10gfCB1bmRlZmluZWQpOmFueXsgXHJcbiAgICAgICAgaWYgKGNvbW1hbmRzID09IHVuZGVmaW5lZCB8fCBjb21tYW5kcy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gW3sgdGV4dDogdGhpcy50b29sYmFySWRPZmYsIHRvb2x0aXBUZXh0OiB0aGlzLnRvb2xiYXJJZE9mZn0sIHsgdGV4dDogdGhpcy50b29sYmFySWRTdG9wLCB0b29sdGlwVGV4dDogdGhpcy50b29sYmFySWRTdG9wfV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgdG9vbGJhciA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbW1hbmRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0b29sYmFyLnB1c2goeyB0ZXh0OiBjb21tYW5kc1tpXS5uYW1lLnJlcGxhY2UoL1xccy9nLCdfJyksIHRvb2x0aXBUZXh0OiBjb21tYW5kc1tpXS50b29sdGlwfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRvb2xiYXI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNwb3NlKCl7XHJcbiAgICAgICAgaWYodGhpcy5fcGFyZW50RGl2SWQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9idXR0b25MaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlc3Ryb3lCdXR0b24odGhpcy5fcGFyZW50RGl2SWQsIHRoaXMuX2J1dHRvbkxpc3RbaV0uYnV0dG9uSWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIHRvb2xiYXIgZm9yIHF1aWNrIGNvbW1hbmQgYnV0dG9uc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2RJZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGltYWdlTmFtZVxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZEdyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGRDdXN0b21Ub29sYmFyQnV0dG9ucyhtZXRob2RJZDogc3RyaW5nLCBpbWFnZU5hbWU6IHN0cmluZyl7XHJcbiAgICAgICAgbGV0IGlkID0gbWV0aG9kSWQucmVwbGFjZSgvXFxzL2csJ18nKTtcclxuICAgICAgICBsZXQgYnV0dG9uSWQgPSB0aGlzLl9wYXJlbnREaXZJZCAgKyBcIl9cIiArIGlkO1xyXG4gICAgICAgIGxldCBpbWFnZVBhdGggPSB0aGlzLl9pbWFnZURpcmVjdG9yeSArIGltYWdlTmFtZSArICcuc3ZnJztcclxuICAgICAgICB0aGlzLmFkZE1ldGhvZFRvb2xiYXJCdXR0b24oYnV0dG9uSWQsIG1ldGhvZElkLCBpbWFnZVBhdGgsICcnLCAnMzBweCcsIGZhbHNlKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kR3JpZFRvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZERlZmF1bHRUb29sYmFyQnV0dG9ucygpIHtcclxuICAgICAgICBsZXQgcG93ZXJPZmZJY29uID0gVGhlbWVQcm92aWRlci5nZXRJbnN0YW5jZSgpLmdldFRoZW1lZEZpbGVQYXRoKFwid2lkZ2V0cy9tZXRob2RMaXN0V2lkZ2V0L3N0eWxlL2ltYWdlcy90b29sYmFyL09mZl93aGl0ZS5zdmdcIik7XHJcbiAgICAgICAgbGV0IGFib3J0Q29tbWFuZEljb24gPSBUaGVtZVByb3ZpZGVyLmdldEluc3RhbmNlKCkuZ2V0VGhlbWVkRmlsZVBhdGgoXCJ3aWRnZXRzL21ldGhvZExpc3RXaWRnZXQvc3R5bGUvaW1hZ2VzL3Rvb2xiYXIvU3RvcF93aGl0ZS5zdmdcIik7XHJcbiAgICAgICAgbGV0IGJ1dHRvbklkT2ZmID0gdGhpcy5fcGFyZW50RGl2SWQgKyBcIl9cIiArIHRoaXMudG9vbGJhcklkT2ZmO1xyXG4gICAgICAgIGxldCBidXR0b25JZEFib3J0ID0gdGhpcy5fcGFyZW50RGl2SWQgKyBcIl9cIiArIHRoaXMudG9vbGJhcklkU3RvcDtcclxuICAgICAgICB0aGlzLmFkZE1ldGhvZFRvb2xiYXJCdXR0b24oYnV0dG9uSWRPZmYsIFwiUG93ZXIgT2ZmXCIsIHBvd2VyT2ZmSWNvbiwgdGhpcy50b29sYmFySWRPZmYsIFwiMTAwcHhcIiwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5hZGRNZXRob2RUb29sYmFyQnV0dG9uKGJ1dHRvbklkQWJvcnQsIFwiQWJvcnQgQ29tbWFuZFwiLCBhYm9ydENvbW1hbmRJY29uLCB0aGlzLnRvb2xiYXJJZFN0b3AsIFwiMTAwcHhcIiwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZE1ldGhvZFRvb2xiYXJCdXR0b24oYnV0dG9uSWQ6IHN0cmluZywgbWV0aG9kSWQ6IHN0cmluZywgaW1hZ2VQYXRoOiBzdHJpbmcsIHRleHQ6IHN0cmluZywgYnV0dG9uV2lkdGg6IHN0cmluZywgZGVmYXVsdEJja2dDb2xvcjogYm9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5fYnV0dG9uTGlzdC5wdXNoKHtidXR0b25JZDogYnV0dG9uSWQsIG1ldGhvZElkOiBtZXRob2RJZH0pO1xyXG4gICAgICAgICQoYnV0dG9uSWQpLmVqQnV0dG9uKHtcclxuICAgICAgICAgICAgY3NzQ2xhc3M6ICdtZXRob2RMaXN0VG9vbGJhckJ1dHRvbicsXHJcbiAgICAgICAgICAgIHRleHQ6IHRleHQsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBlai5Db250ZW50VHlwZS5UZXh0QW5kSW1hZ2UsXHJcbiAgICAgICAgICAgIHdpZHRoOiBidXR0b25XaWR0aCxcclxuICAgICAgICAgICAgaGVpZ2h0OiBcIjIwcHhcIixcclxuICAgICAgICAgICAgY2xpY2s6IChhcmdzKSA9PiB0aGlzLnRvb2xiYXJCdXR0b25DbGljayhtZXRob2RJZCksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zZXRCdXR0b25TdHlsZShidXR0b25JZCwgaW1hZ2VQYXRoLCBtZXRob2RJZCwgZGVmYXVsdEJja2dDb2xvcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYnV0dG9uSWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbWFnZVBhdGhcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldEJ1dHRvblN0eWxlKGJ1dHRvbklkOiBzdHJpbmcsIGltYWdlUGF0aDogc3RyaW5nLCBtZXRob2RJZDogc3RyaW5nLCBkZWZhdWx0QmNrZ0NvbG9yOiBib29sZWFuKSB7XHJcbiAgICAgICAgbGV0IGJhY2tncm91bmRDb2xvcjtcclxuICAgICAgICBsZXQgYnV0dG9uRWxlbWVudCA9ICQoYnV0dG9uSWQpWzBdO1xyXG4gICAgICAgIGJ1dHRvbkVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uWCA9IFwiN3B4XCI7XHJcbiAgICAgICAgYnV0dG9uRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb25ZID0gXCI1cHhcIjtcclxuICAgICAgICBidXR0b25FbGVtZW50LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKFwiICsgaW1hZ2VQYXRoICtcIilcIjtcclxuXHJcbiAgICAgICAgaWYgKCFkZWZhdWx0QmNrZ0NvbG9yKSB7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvciA9IHRoaXMuZ2V0QmFja2dyb3VuZENvbG9yKGltYWdlUGF0aCwgbWV0aG9kSWQpO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvciA9ICcjNTMxRTAwJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJ1dHRvbkVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZFJlcGVhdCA9IFwibm8tcmVwZWF0XCI7XHJcbiAgICAgICAgYnV0dG9uRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kU2l6ZSA9IFwiMjBweCAyMHB4XCI7XHJcbiAgICAgICAgYnV0dG9uRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBiYWNrZ3JvdW5kQ29sb3I7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXN0cm95cyB0aGUgYnV0dG9uIG9iamVjdFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGl2SWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0b29sYmFySWRcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRlc3Ryb3lCdXR0b24oZGl2SWQ6IHN0cmluZywgdG9vbGJhcklkOiBzdHJpbmcpe1xyXG4gICAgICAgIGxldCBidXR0b25JZCA9IGRpdklkICArIFwiX1wiICsgdG9vbGJhcklkOyBcclxuICAgICAgICBsZXQgYnV0dG9uID0gJChidXR0b25JZCkuZGF0YShcImVqQnV0dG9uXCIpO1xyXG4gICAgICAgIGlmKGJ1dHRvbiAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBidXR0b24uZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEV4ZWN1dGUgY29ycmVzcG9uZGluZyBtZXRob2Qgd2hlbiBidXR0b24gaXMgY2xpY2tlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWV0aG9kSWRcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHRvb2xiYXJCdXR0b25DbGljayhtZXRob2RJZDogc3RyaW5nKXtcclxuICAgICAgICBsZXQgbWV0aG9kID0gTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QuZmluZChtZXRob2RJZCwgdGhpcy5fYWN0dWFsQ29tcG9uZW50TWV0aG9kcyk7XHJcbiAgICAgICAgaWYgKG1ldGhvZCkge1xyXG4gICAgICAgICAgICBpZihtZXRob2QuaXNFeGVjdXRhYmxlICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBpZihtZXRob2QuaXNFeGVjdXRhYmxlLnZhbHVlID09IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgICAgIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLmV4ZWN1dGUobWV0aG9kKTsgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9ic2VydmVzIGlmIHRoZSBleGVjdXRhYmlsaXR5IG9mIGEgbWV0aG9kIGhhcyBjaGFuZ2VkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2RJZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJ1dHRvbklkXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kR3JpZFRvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvYnNlcnZlTWV0aG9kRXhlY3V0YWJpbGl0eUZvckJ1dHRvblN0YXRlKG1ldGhvZElkOiBzdHJpbmcsIGJ1dHRvbklkOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgbWV0aG9kID0gICBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZC5maW5kKG1ldGhvZElkLCB0aGlzLl9hY3R1YWxDb21wb25lbnRNZXRob2RzKTtcclxuICAgICAgICBpZiAobWV0aG9kKSB7XHJcbiAgICAgICAgICAgIGlmKG1ldGhvZC5pc0V4ZWN1dGFibGUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIC8vIFNldCBpbml0IHN0YXRlIG9mIGJ1dHRvbiAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRCdXR0b25TdGF0ZShidXR0b25JZCwgbWV0aG9kLmlzRXhlY3V0YWJsZS52YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbWV0aG9kLmlzRXhlY3V0YWJsZS5jaGFuZ2VkKChpc0V4ZWN1dGFibGUpPT57XHJcbiAgICAgICAgICAgICAgICAvLyBSZWZyZXNoIGJ1dHRvbiBzdGF0ZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRCdXR0b25TdGF0ZShidXR0b25JZCwgaXNFeGVjdXRhYmxlKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5zZXRCdXR0b25TdGF0ZShidXR0b25JZCwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldEJ1dHRvblN0YXRlKGJ1dHRvbklkOiBzdHJpbmcsIGFjdGl2YXRlZDogYm9vbGVhbil7XHJcbiAgICAgICAgLy8gZ2V0IGJ1dHRvbiBpbnN0YW5jZTtcclxuICAgICAgICBsZXQgYnV0dG9uID0gJChidXR0b25JZCkuZGF0YShcImVqQnV0dG9uXCIpO1xyXG4gICAgICAgIGlmKCFidXR0b24pe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihhY3RpdmF0ZWQpe1xyXG4gICAgICAgICAgICAvLyBzZXQgYnV0dG9uIGFjdGl2ZSBzdGF0ZVxyXG4gICAgICAgICAgICBidXR0b24ub3B0aW9uKHtjc3NDbGFzczogXCJtZXRob2RMaXN0VG9vbGJhckJ1dHRvblwifSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIC8vIHNldCBidXR0b24gZGVhY3RpdmF0ZWQgc3RhdGVcclxuICAgICAgICAgICAgYnV0dG9uLm9wdGlvbih7Y3NzQ2xhc3M6IFwibWV0aG9kTGlzdFRvb2xiYXJCdXR0b25EZWFjdGl2YXRlZFwifSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIERvbUhlbHBlci5kaXNhYmxlRWxlbWVudCgkKGJ1dHRvbklkKVswXSwgIWFjdGl2YXRlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEFjdHVhbENvbXBvbmVudE1ldGhvZHMoYWN0dWFsQ29tcG9uZW50TWV0aG9kczogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRNZXRob2Q+KXtcclxuICAgICAgICB0aGlzLl9hY3R1YWxDb21wb25lbnRNZXRob2RzID0gYWN0dWFsQ29tcG9uZW50TWV0aG9kcztcclxuXHJcbiAgICAgICAgdGhpcy5fYnV0dG9uTGlzdC5mb3JFYWNoKGJ1dHRvbiA9PiB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLm9ic2VydmVNZXRob2RFeGVjdXRhYmlsaXR5Rm9yQnV0dG9uU3RhdGUoYnV0dG9uLm1ldGhvZElkLCBidXR0b24uYnV0dG9uSWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRUb29sQmFySGVpZ2h0KCkge1xyXG4gICAgICAgIC8vV29ya2Fyb3VuZDogdG9vbGJhciBoZWlnaHQgY2hhbmdlcyB3aGVuIGl0IGlzIHVwZGF0ZWQgYSBzZWNvbmQgdGltZS4gSGVyZSB3ZSBzZXQgdG8gdGhlIHNpemUgd2Ugd2FudC5cclxuICAgICAgICBsZXQgJHRvb2xiYXIgPSAkKHRoaXMuX3BhcmVudERpdklkICsgJ190b29sYmFySXRlbXMnKTtcclxuICAgICAgICAkdG9vbGJhclswXS5zdHlsZS5zZXRQcm9wZXJ0eSgnaGVpZ2h0JywnMzNweCcsJ2ltcG9ydGFudCcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0dGluZyBiYWNrZ3JvdW5kIGNvbG9yIGZyb20gc3ZnIGVsZW1lbnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGltYWdlUGF0aFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1ldGhvZElkXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZEdyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0QmFja2dyb3VuZENvbG9yKGltYWdlUGF0aDogc3RyaW5nLCBtZXRob2RJZDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgaW1hZ2UgPSBpbWFnZVBhdGguc3BsaXQoXCIuLi8uLi8uLi9tYXBwQ29ja3BpdC9hcHAvd2lkZ2V0cy9tZXRob2RMaXN0V2lkZ2V0L3N0eWxlL2ltYWdlcy90b29sYmFyL1wiKVsxXTtcclxuICAgICAgICBsZXQgc3ZnRGF0YSA9IEltYWdlUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXRJbWFnZShcIi4uL2FwcC93aWRnZXRzL21ldGhvZExpc3RXaWRnZXQvc3R5bGUvaW1hZ2VzL3Rvb2xiYXIvXCIgKyBpbWFnZSk7XHJcbiAgICAgICAgbGV0IHN0cmluZ1NwbGl0dGVkID0gc3ZnRGF0YS5zcGxpdCgnYmFja2dyb3VuZC1jb2xvcicpO1xyXG4gICAgICAgIGxldCBlcnJvck1lc3NhZ2UgPSAnQmFja2dyb3VuZENvbG9yIGNvdWxkIG5vdCBiZSByZXRyaWV2ZWQgZnJvbSBtZXRob2Q6ICcgKyBtZXRob2RJZDtcclxuICAgICAgICBpZiAoc3RyaW5nU3BsaXR0ZWRbMV0gIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYmFja2dyb3VuZENvbG9yID0gc3RyaW5nU3BsaXR0ZWRbMV0uc3BsaXQoJ1wiJylbMV0ucmVwbGFjZSgnICcsJycpO1xyXG4gICAgICAgICAgICAgICAgaWYoL14jKFswLTlBLUZdezN9KXsxLDJ9JC9pLnRlc3QoYmFja2dyb3VuZENvbG9yKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiYWNrZ3JvdW5kQ29sb3I7XHJcbiAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG59Il19