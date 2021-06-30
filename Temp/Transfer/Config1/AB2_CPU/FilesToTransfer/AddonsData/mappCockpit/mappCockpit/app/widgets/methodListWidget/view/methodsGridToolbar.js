define(["require", "exports", "../../../models/online/mappCockpitComponent", "../../common/domHelper", "../../../common/directoryProvider", "../../common/themeProvider"], function (require, exports, mappCockpitComponent_1, domHelper_1, directoryProvider_1, themeProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MethodGridToolbar = /** @class */ (function () {
        function MethodGridToolbar(imageProvider) {
            this.toolbarIdOff = "Off";
            this.toolbarIdStop = "Abort";
            this._imageDirectory = "../../../" + directoryProvider_1.DirectoryProvider.getWidgetsDirectory() + "methodListWidget/style/images/toolbar/";
            this._buttonList = new Array();
            this._imageProvider = imageProvider;
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
         * Add quick commands toolbar buttons
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
         * Add default method toolbar buttons
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
        /**
         * Add method toolbar buttons
         *
         * @param {string} buttonId
         * @param {string} methodId
         * @param {string} imagePath
         * @param {string} text
         * @param {string} buttonWidth
         * @param {boolean} defaultBckgColor
         * @memberof MethodGridToolbar
         */
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
         * Defines the style properties for the button
         *
         * @private
         * @param {string} buttonId
         * @param {string} imagePath
         * @param {string} methodId
         * @param {boolean} defaultBckgColor
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
            var errorMessage = 'BackgroundColor could not be retrieved from method: ' + methodId;
            var image = imagePath.split("../../../mappCockpit/app/widgets/methodListWidget/style/images/toolbar/")[1];
            if (this._imageProvider != undefined) {
                var svgData = this._imageProvider.getImage("../app/widgets/methodListWidget/style/images/toolbar/" + image);
                var stringSplitted = svgData.split('background-color');
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
            }
            console.error(errorMessage);
            return '';
        };
        return MethodGridToolbar;
    }());
    exports.MethodGridToolbar = MethodGridToolbar;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0aG9kc0dyaWRUb29sYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL21ldGhvZExpc3RXaWRnZXQvdmlldy9tZXRob2RzR3JpZFRvb2xiYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBTUE7UUFhSSwyQkFBWSxhQUE2QjtZQVZ4QixpQkFBWSxHQUFHLEtBQUssQ0FBQztZQUNyQixrQkFBYSxHQUFHLE9BQU8sQ0FBQztZQUV4QixvQkFBZSxHQUFHLFdBQVcsR0FBRyxxQ0FBaUIsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLHdDQUF3QyxDQUFBO1lBRTNILGdCQUFXLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztZQU05QixJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztRQUN4QyxDQUFDO1FBRU0sdUNBQVcsR0FBbEIsVUFBbUIsS0FBSztZQUNwQixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztZQUUxQix3QkFBd0I7WUFDeEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFbkQsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDNUIsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNJLDZDQUFpQixHQUF4QixVQUEwQixRQUF3RDtZQUM5RSxJQUFJLFFBQVEsSUFBSSxTQUFTLElBQUksUUFBUSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7Z0JBQy9DLE9BQU8sQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBQyxDQUFDLENBQUM7YUFDckk7aUJBQ0k7Z0JBQ0QsSUFBSSxT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QUM7SUFBRCxDQUFDLEFBbFFELElBa1FDO0lBbFFZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLCBNYXBwQ29ja3BpdFF1aWNrQ29tbWFuZFBhcmFtZXRlciB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50XCI7XHJcbmltcG9ydCB7IERvbUhlbHBlciB9IGZyb20gXCIuLi8uLi9jb21tb24vZG9tSGVscGVyXCI7XHJcbmltcG9ydCB7IERpcmVjdG9yeVByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9kaXJlY3RvcnlQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBUaGVtZVByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi90aGVtZVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IElJbWFnZVByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9pbnRlcmZhY2VzL2ltYWdlUHJvdmlkZXJJbnRlcmZhY2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBNZXRob2RHcmlkVG9vbGJhcntcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfYWN0dWFsQ29tcG9uZW50TWV0aG9kczogQXJyYXk8TWFwcENvY2twaXRDb21wb25lbnRNZXRob2Q+fHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgdG9vbGJhcklkT2ZmID0gXCJPZmZcIjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgdG9vbGJhcklkU3RvcCA9IFwiQWJvcnRcIjtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9pbWFnZURpcmVjdG9yeSA9IFwiLi4vLi4vLi4vXCIgKyBEaXJlY3RvcnlQcm92aWRlci5nZXRXaWRnZXRzRGlyZWN0b3J5KCkgKyBcIm1ldGhvZExpc3RXaWRnZXQvc3R5bGUvaW1hZ2VzL3Rvb2xiYXIvXCJcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfYnV0dG9uTGlzdCA9IG5ldyBBcnJheSgpO1xyXG5cclxuICAgIHByaXZhdGUgX3BhcmVudERpdklkOiBzdHJpbmd8dW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfaW1hZ2VQcm92aWRlcjogSUltYWdlUHJvdmlkZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoaW1hZ2VQcm92aWRlcjogSUltYWdlUHJvdmlkZXIpe1xyXG4gICAgICAgIHRoaXMuX2ltYWdlUHJvdmlkZXIgPSBpbWFnZVByb3ZpZGVyO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0VG9vbGJhcihkaXZJZCkge1xyXG4gICAgICAgIHRoaXMuX3BhcmVudERpdklkID0gZGl2SWQ7XHJcblxyXG4gICAgICAgIC8vIENsZWFyIHRoZSBidXR0b24gbGlzdFxyXG4gICAgICAgIHRoaXMuX2J1dHRvbkxpc3Quc3BsaWNlKDAsdGhpcy5fYnV0dG9uTGlzdC5sZW5ndGgpO1xyXG5cclxuICAgICAgICB0aGlzLnNldFRvb2xCYXJIZWlnaHQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZSB0b29sYmFyIGJ1dHRvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyhNYXBwQ29ja3BpdFF1aWNrQ29tbWFuZFBhcmFtZXRlcltdIHwgdW5kZWZpbmVkKX0gY29tbWFuZHNcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZEdyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRDdXN0b21Ub29sYmFycyAoY29tbWFuZHM6IE1hcHBDb2NrcGl0UXVpY2tDb21tYW5kUGFyYW1ldGVyW10gfCB1bmRlZmluZWQpOmFueXsgXHJcbiAgICAgICAgaWYgKGNvbW1hbmRzID09IHVuZGVmaW5lZCB8fCBjb21tYW5kcy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gW3sgdGV4dDogdGhpcy50b29sYmFySWRPZmYsIHRvb2x0aXBUZXh0OiB0aGlzLnRvb2xiYXJJZE9mZn0sIHsgdGV4dDogdGhpcy50b29sYmFySWRTdG9wLCB0b29sdGlwVGV4dDogdGhpcy50b29sYmFySWRTdG9wfV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgdG9vbGJhciA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbW1hbmRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0b29sYmFyLnB1c2goeyB0ZXh0OiBjb21tYW5kc1tpXS5uYW1lLnJlcGxhY2UoL1xccy9nLCdfJyksIHRvb2x0aXBUZXh0OiBjb21tYW5kc1tpXS50b29sdGlwfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRvb2xiYXI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNwb3NlKCl7XHJcbiAgICAgICAgaWYodGhpcy5fcGFyZW50RGl2SWQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9idXR0b25MaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlc3Ryb3lCdXR0b24odGhpcy5fcGFyZW50RGl2SWQsIHRoaXMuX2J1dHRvbkxpc3RbaV0uYnV0dG9uSWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIHF1aWNrIGNvbW1hbmRzIHRvb2xiYXIgYnV0dG9ucyBcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWV0aG9kSWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbWFnZU5hbWVcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkQ3VzdG9tVG9vbGJhckJ1dHRvbnMobWV0aG9kSWQ6IHN0cmluZywgaW1hZ2VOYW1lOiBzdHJpbmcpe1xyXG4gICAgICAgIGxldCBpZCA9IG1ldGhvZElkLnJlcGxhY2UoL1xccy9nLCdfJyk7XHJcbiAgICAgICAgbGV0IGJ1dHRvbklkID0gdGhpcy5fcGFyZW50RGl2SWQgICsgXCJfXCIgKyBpZDtcclxuICAgICAgICBsZXQgaW1hZ2VQYXRoID0gdGhpcy5faW1hZ2VEaXJlY3RvcnkgKyBpbWFnZU5hbWUgKyAnLnN2Zyc7XHJcbiAgICAgICAgdGhpcy5hZGRNZXRob2RUb29sYmFyQnV0dG9uKGJ1dHRvbklkLCBtZXRob2RJZCwgaW1hZ2VQYXRoLCAnJywgJzMwcHgnLCBmYWxzZSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBkZWZhdWx0IG1ldGhvZCB0b29sYmFyIGJ1dHRvbnNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kR3JpZFRvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZERlZmF1bHRUb29sYmFyQnV0dG9ucygpIHtcclxuICAgICAgICBsZXQgcG93ZXJPZmZJY29uID0gVGhlbWVQcm92aWRlci5nZXRJbnN0YW5jZSgpLmdldFRoZW1lZEZpbGVQYXRoKFwid2lkZ2V0cy9tZXRob2RMaXN0V2lkZ2V0L3N0eWxlL2ltYWdlcy90b29sYmFyL09mZl93aGl0ZS5zdmdcIik7XHJcbiAgICAgICAgbGV0IGFib3J0Q29tbWFuZEljb24gPSBUaGVtZVByb3ZpZGVyLmdldEluc3RhbmNlKCkuZ2V0VGhlbWVkRmlsZVBhdGgoXCJ3aWRnZXRzL21ldGhvZExpc3RXaWRnZXQvc3R5bGUvaW1hZ2VzL3Rvb2xiYXIvU3RvcF93aGl0ZS5zdmdcIik7XHJcbiAgICAgICAgbGV0IGJ1dHRvbklkT2ZmID0gdGhpcy5fcGFyZW50RGl2SWQgKyBcIl9cIiArIHRoaXMudG9vbGJhcklkT2ZmO1xyXG4gICAgICAgIGxldCBidXR0b25JZEFib3J0ID0gdGhpcy5fcGFyZW50RGl2SWQgKyBcIl9cIiArIHRoaXMudG9vbGJhcklkU3RvcDtcclxuICAgICAgICB0aGlzLmFkZE1ldGhvZFRvb2xiYXJCdXR0b24oYnV0dG9uSWRPZmYsIFwiUG93ZXIgT2ZmXCIsIHBvd2VyT2ZmSWNvbiwgdGhpcy50b29sYmFySWRPZmYsIFwiMTAwcHhcIiwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5hZGRNZXRob2RUb29sYmFyQnV0dG9uKGJ1dHRvbklkQWJvcnQsIFwiQWJvcnQgQ29tbWFuZFwiLCBhYm9ydENvbW1hbmRJY29uLCB0aGlzLnRvb2xiYXJJZFN0b3AsIFwiMTAwcHhcIiwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgbWV0aG9kIHRvb2xiYXIgYnV0dG9uc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBidXR0b25JZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1ldGhvZElkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW1hZ2VQYXRoXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJ1dHRvbldpZHRoXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGRlZmF1bHRCY2tnQ29sb3JcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkTWV0aG9kVG9vbGJhckJ1dHRvbihidXR0b25JZDogc3RyaW5nLCBtZXRob2RJZDogc3RyaW5nLCBpbWFnZVBhdGg6IHN0cmluZywgdGV4dDogc3RyaW5nLCBidXR0b25XaWR0aDogc3RyaW5nLCBkZWZhdWx0QmNrZ0NvbG9yOiBib29sZWFuKXtcclxuICAgICAgICB0aGlzLl9idXR0b25MaXN0LnB1c2goe2J1dHRvbklkOiBidXR0b25JZCwgbWV0aG9kSWQ6IG1ldGhvZElkfSk7XHJcbiAgICAgICAgJChidXR0b25JZCkuZWpCdXR0b24oe1xyXG4gICAgICAgICAgICBjc3NDbGFzczogJ21ldGhvZExpc3RUb29sYmFyQnV0dG9uJyxcclxuICAgICAgICAgICAgdGV4dDogdGV4dCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IGVqLkNvbnRlbnRUeXBlLlRleHRBbmRJbWFnZSxcclxuICAgICAgICAgICAgd2lkdGg6IGJ1dHRvbldpZHRoLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IFwiMjBweFwiLFxyXG4gICAgICAgICAgICBjbGljazogKGFyZ3MpID0+IHRoaXMudG9vbGJhckJ1dHRvbkNsaWNrKG1ldGhvZElkKSxcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNldEJ1dHRvblN0eWxlKGJ1dHRvbklkLCBpbWFnZVBhdGgsIG1ldGhvZElkLCBkZWZhdWx0QmNrZ0NvbG9yKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgdGhlIHN0eWxlIHByb3BlcnRpZXMgZm9yIHRoZSBidXR0b25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJ1dHRvbklkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW1hZ2VQYXRoXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWV0aG9kSWRcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZGVmYXVsdEJja2dDb2xvclxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZEdyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0QnV0dG9uU3R5bGUoYnV0dG9uSWQ6IHN0cmluZywgaW1hZ2VQYXRoOiBzdHJpbmcsIG1ldGhvZElkOiBzdHJpbmcsIGRlZmF1bHRCY2tnQ29sb3I6IGJvb2xlYW4pIHtcclxuICAgICAgICBsZXQgYmFja2dyb3VuZENvbG9yO1xyXG4gICAgICAgIGxldCBidXR0b25FbGVtZW50ID0gJChidXR0b25JZClbMF07XHJcbiAgICAgICAgYnV0dG9uRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb25YID0gXCI3cHhcIjtcclxuICAgICAgICBidXR0b25FbGVtZW50LnN0eWxlLmJhY2tncm91bmRQb3NpdGlvblkgPSBcIjVweFwiO1xyXG4gICAgICAgIGJ1dHRvbkVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoXCIgKyBpbWFnZVBhdGggK1wiKVwiO1xyXG5cclxuICAgICAgICBpZiAoIWRlZmF1bHRCY2tnQ29sb3IpIHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yID0gdGhpcy5nZXRCYWNrZ3JvdW5kQ29sb3IoaW1hZ2VQYXRoLCBtZXRob2RJZCk7XHJcbiAgICAgICAgfSBcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yID0gJyM1MzFFMDAnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYnV0dG9uRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kUmVwZWF0ID0gXCJuby1yZXBlYXRcIjtcclxuICAgICAgICBidXR0b25FbGVtZW50LnN0eWxlLmJhY2tncm91bmRTaXplID0gXCIyMHB4IDIwcHhcIjtcclxuICAgICAgICBidXR0b25FbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGJhY2tncm91bmRDb2xvcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlc3Ryb3lzIHRoZSBidXR0b24gb2JqZWN0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkaXZJZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRvb2xiYXJJZFxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZEdyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZGVzdHJveUJ1dHRvbihkaXZJZDogc3RyaW5nLCB0b29sYmFySWQ6IHN0cmluZyl7XHJcbiAgICAgICAgbGV0IGJ1dHRvbklkID0gZGl2SWQgICsgXCJfXCIgKyB0b29sYmFySWQ7IFxyXG4gICAgICAgIGxldCBidXR0b24gPSAkKGJ1dHRvbklkKS5kYXRhKFwiZWpCdXR0b25cIik7XHJcbiAgICAgICAgaWYoYnV0dG9uICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGJ1dHRvbi5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRXhlY3V0ZSBjb3JyZXNwb25kaW5nIG1ldGhvZCB3aGVuIGJ1dHRvbiBpcyBjbGlja2VkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2RJZFxyXG4gICAgICogQG1lbWJlcm9mIE1ldGhvZEdyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdG9vbGJhckJ1dHRvbkNsaWNrKG1ldGhvZElkOiBzdHJpbmcpe1xyXG4gICAgICAgIGxldCBtZXRob2QgPSBNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZC5maW5kKG1ldGhvZElkLCB0aGlzLl9hY3R1YWxDb21wb25lbnRNZXRob2RzKTtcclxuICAgICAgICBpZiAobWV0aG9kKSB7XHJcbiAgICAgICAgICAgIGlmKG1ldGhvZC5pc0V4ZWN1dGFibGUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGlmKG1ldGhvZC5pc0V4ZWN1dGFibGUudmFsdWUgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgTWFwcENvY2twaXRDb21wb25lbnRNZXRob2QuZXhlY3V0ZShtZXRob2QpOyAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT2JzZXJ2ZXMgaWYgdGhlIGV4ZWN1dGFiaWxpdHkgb2YgYSBtZXRob2QgaGFzIGNoYW5nZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1ldGhvZElkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYnV0dG9uSWRcclxuICAgICAqIEBtZW1iZXJvZiBNZXRob2RHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9ic2VydmVNZXRob2RFeGVjdXRhYmlsaXR5Rm9yQnV0dG9uU3RhdGUobWV0aG9kSWQ6IHN0cmluZywgYnV0dG9uSWQ6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBtZXRob2QgPSAgIE1hcHBDb2NrcGl0Q29tcG9uZW50TWV0aG9kLmZpbmQobWV0aG9kSWQsIHRoaXMuX2FjdHVhbENvbXBvbmVudE1ldGhvZHMpO1xyXG4gICAgICAgIGlmIChtZXRob2QpIHtcclxuICAgICAgICAgICAgaWYobWV0aG9kLmlzRXhlY3V0YWJsZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgLy8gU2V0IGluaXQgc3RhdGUgb2YgYnV0dG9uICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEJ1dHRvblN0YXRlKGJ1dHRvbklkLCBtZXRob2QuaXNFeGVjdXRhYmxlLnZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBtZXRob2QuaXNFeGVjdXRhYmxlLmNoYW5nZWQoKGlzRXhlY3V0YWJsZSk9PntcclxuICAgICAgICAgICAgICAgIC8vIFJlZnJlc2ggYnV0dG9uIHN0YXRlXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEJ1dHRvblN0YXRlKGJ1dHRvbklkLCBpc0V4ZWN1dGFibGUpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLnNldEJ1dHRvblN0YXRlKGJ1dHRvbklkLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0QnV0dG9uU3RhdGUoYnV0dG9uSWQ6IHN0cmluZywgYWN0aXZhdGVkOiBib29sZWFuKXtcclxuICAgICAgICAvLyBnZXQgYnV0dG9uIGluc3RhbmNlO1xyXG4gICAgICAgIGxldCBidXR0b24gPSAkKGJ1dHRvbklkKS5kYXRhKFwiZWpCdXR0b25cIik7XHJcbiAgICAgICAgaWYoIWJ1dHRvbil7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGFjdGl2YXRlZCl7XHJcbiAgICAgICAgICAgIC8vIHNldCBidXR0b24gYWN0aXZlIHN0YXRlXHJcbiAgICAgICAgICAgIGJ1dHRvbi5vcHRpb24oe2Nzc0NsYXNzOiBcIm1ldGhvZExpc3RUb29sYmFyQnV0dG9uXCJ9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgLy8gc2V0IGJ1dHRvbiBkZWFjdGl2YXRlZCBzdGF0ZVxyXG4gICAgICAgICAgICBidXR0b24ub3B0aW9uKHtjc3NDbGFzczogXCJtZXRob2RMaXN0VG9vbGJhckJ1dHRvbkRlYWN0aXZhdGVkXCJ9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgRG9tSGVscGVyLmRpc2FibGVFbGVtZW50KCQoYnV0dG9uSWQpWzBdLCAhYWN0aXZhdGVkKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0QWN0dWFsQ29tcG9uZW50TWV0aG9kcyhhY3R1YWxDb21wb25lbnRNZXRob2RzOiBBcnJheTxNYXBwQ29ja3BpdENvbXBvbmVudE1ldGhvZD4pe1xyXG4gICAgICAgIHRoaXMuX2FjdHVhbENvbXBvbmVudE1ldGhvZHMgPSBhY3R1YWxDb21wb25lbnRNZXRob2RzO1xyXG5cclxuICAgICAgICB0aGlzLl9idXR0b25MaXN0LmZvckVhY2goYnV0dG9uID0+IHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2ZU1ldGhvZEV4ZWN1dGFiaWxpdHlGb3JCdXR0b25TdGF0ZShidXR0b24ubWV0aG9kSWQsIGJ1dHRvbi5idXR0b25JZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFRvb2xCYXJIZWlnaHQoKSB7XHJcbiAgICAgICAgLy9Xb3JrYXJvdW5kOiB0b29sYmFyIGhlaWdodCBjaGFuZ2VzIHdoZW4gaXQgaXMgdXBkYXRlZCBhIHNlY29uZCB0aW1lLiBIZXJlIHdlIHNldCB0byB0aGUgc2l6ZSB3ZSB3YW50LlxyXG4gICAgICAgIGxldCAkdG9vbGJhciA9ICQodGhpcy5fcGFyZW50RGl2SWQgKyAnX3Rvb2xiYXJJdGVtcycpO1xyXG4gICAgICAgICR0b29sYmFyWzBdLnN0eWxlLnNldFByb3BlcnR5KCdoZWlnaHQnLCczM3B4JywnaW1wb3J0YW50Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXR0aW5nIGJhY2tncm91bmQgY29sb3IgZnJvbSBzdmcgZWxlbWVudFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW1hZ2VQYXRoXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWV0aG9kSWRcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgTWV0aG9kR3JpZFRvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRCYWNrZ3JvdW5kQ29sb3IoaW1hZ2VQYXRoOiBzdHJpbmcsIG1ldGhvZElkOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBlcnJvck1lc3NhZ2UgPSAnQmFja2dyb3VuZENvbG9yIGNvdWxkIG5vdCBiZSByZXRyaWV2ZWQgZnJvbSBtZXRob2Q6ICcgKyBtZXRob2RJZDtcclxuICAgICAgICBsZXQgaW1hZ2UgPSBpbWFnZVBhdGguc3BsaXQoXCIuLi8uLi8uLi9tYXBwQ29ja3BpdC9hcHAvd2lkZ2V0cy9tZXRob2RMaXN0V2lkZ2V0L3N0eWxlL2ltYWdlcy90b29sYmFyL1wiKVsxXTtcclxuICAgICAgICBpZih0aGlzLl9pbWFnZVByb3ZpZGVyICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGxldCBzdmdEYXRhID0gdGhpcy5faW1hZ2VQcm92aWRlci5nZXRJbWFnZShcIi4uL2FwcC93aWRnZXRzL21ldGhvZExpc3RXaWRnZXQvc3R5bGUvaW1hZ2VzL3Rvb2xiYXIvXCIgKyBpbWFnZSk7XHJcbiAgICAgICAgICAgIGxldCBzdHJpbmdTcGxpdHRlZCA9IHN2Z0RhdGEuc3BsaXQoJ2JhY2tncm91bmQtY29sb3InKTtcclxuICAgICAgICAgICAgaWYgKHN0cmluZ1NwbGl0dGVkWzFdICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYmFja2dyb3VuZENvbG9yID0gc3RyaW5nU3BsaXR0ZWRbMV0uc3BsaXQoJ1wiJylbMV0ucmVwbGFjZSgnICcsJycpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKC9eIyhbMC05QS1GXXszfSl7MSwyfSQvaS50ZXN0KGJhY2tncm91bmRDb2xvcikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJhY2tncm91bmRDb2xvcjtcclxuICAgICAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2F0Y2gge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxufSJdfQ==