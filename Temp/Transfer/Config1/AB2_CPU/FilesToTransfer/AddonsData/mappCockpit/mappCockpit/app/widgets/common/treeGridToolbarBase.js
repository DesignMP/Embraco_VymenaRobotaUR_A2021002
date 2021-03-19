define(["require", "exports", "../../common/directoryProvider", "./toolbarButton", "./domHelper", "./themeProvider"], function (require, exports, directoryProvider_1, toolbarButton_1, domHelper_1, themeProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ToolbarButtonAlignment;
    (function (ToolbarButtonAlignment) {
        ToolbarButtonAlignment[ToolbarButtonAlignment["Left"] = 0] = "Left";
        ToolbarButtonAlignment[ToolbarButtonAlignment["Right"] = 1] = "Right";
    })(ToolbarButtonAlignment || (ToolbarButtonAlignment = {}));
    exports.ToolbarButtonAlignment = ToolbarButtonAlignment;
    var TreeGridToolbarBase = /** @class */ (function () {
        /**
         *Creates an instance of TreeGridToolbarBase.
         * @param {string} parentId
         * @memberof TreeGridToolbarBase
         */
        function TreeGridToolbarBase(parentId) {
            this._collapseButtonId = "collapse";
            this._expandButtonId = "expand";
            this._collapseButtonToolTip = "Collapse all childs";
            this._expandButtonToolTip = "Expand all childs";
            this._imageDirectory = "../../../" + directoryProvider_1.DirectoryProvider.getWidgetsDirectory() + "common/style/images/tree/toolbar/";
            this._collapseLevel = 0;
            this._parentId = parentId;
            this._toolbarButtons = new Array();
        }
        /**
         * Adds a new toolbar button to the toolbar buttons list
         *
         * @param {string} id must be without spaces
         * @param {string} tooltip
         * @param {string} icon
         * @param {string} [align="left"]
         * @memberof TreeGridToolbarBase
         */
        TreeGridToolbarBase.prototype.addToolbarButton = function (id, tooltip, icon, align) {
            if (align === void 0) { align = ToolbarButtonAlignment.Left; }
            // add toolbar button needed to show a toolbar
            this._toolbarButtons.push(new toolbarButton_1.ToolbarButton(id, tooltip, icon, align));
        };
        TreeGridToolbarBase.prototype.setCollapseLevel = function (level) {
            this._collapseLevel = level;
        };
        TreeGridToolbarBase.prototype.addCollapseButton = function () {
            // add toolbar button for collapse
            this._toolbarButtons.push(new toolbarButton_1.ToolbarButton(this._collapseButtonId, this._collapseButtonToolTip, this._imageDirectory + "collapse.svg", ToolbarButtonAlignment.Left));
        };
        TreeGridToolbarBase.prototype.addExpandButton = function () {
            // add toolbar button for expand
            this._toolbarButtons.push(new toolbarButton_1.ToolbarButton(this._expandButtonId, this._expandButtonToolTip, this._imageDirectory + "expand.svg", ToolbarButtonAlignment.Left));
        };
        TreeGridToolbarBase.prototype.hideCollapseButton = function (hide) {
            // hide collapse toolbar button
            this.hideButton(this._collapseButtonId, hide);
        };
        TreeGridToolbarBase.prototype.hideExpandButton = function (hide) {
            // hide expand toolbar button
            this.hideButton(this._expandButtonId, hide);
        };
        TreeGridToolbarBase.prototype.toolbarClickBase = function (args) {
            var clickedToolbarId = this.getClickedToolbarId(args.itemName, args.model.toolbarSettings);
            if (clickedToolbarId == this._collapseButtonId) {
                if (this._collapseLevel == 0) {
                    this.getTreeGridObject().collapseAll();
                }
                else {
                    this.getTreeGridObject().collapseAtLevel(this._collapseLevel);
                }
            }
            else if (clickedToolbarId == this._expandButtonId) {
                this.getTreeGridObject().expandAll();
            }
        };
        /**
         * Returns the toolbar definition for the tree grid
         *
         * @returns {*}
         * @memberof TreeGridToolbarBase
         */
        TreeGridToolbarBase.prototype.getCustomToolbars = function () {
            var toolbars = new Array();
            for (var i = 0; i < this._toolbarButtons.length; i++) {
                toolbars.push({ text: this._toolbarButtons[i].id, tooltipText: this._toolbarButtons[i].tooltip });
            }
            return toolbars;
        };
        /**
         * Disables the button (e.g. show the "..._deactivated.svg icon instead of "....svg")
         *
         * @param {string} buttonId
         * @param {boolean} disable
         * @param {boolean} [isIcon]
         * @returns
         * @memberof TreeGridToolbarBase
         */
        TreeGridToolbarBase.prototype.disableButton = function (buttonId, disable, isIcon) {
            var button = this.getToolbarButton(buttonId);
            if (button == undefined) {
                console.error("Button id not found! id: " + buttonId);
                return;
            }
            button.disabled = disable;
            var element = this.getElementByToolbarButtonId(button.id);
            if (!element) {
                return;
            }
            var icon = button.icon;
            if (disable == true) {
                if (!isIcon) {
                    icon = this.getDeactivatedIcon(button.icon);
                }
                element.classList.remove("toolbarButton");
                element.classList.add("toolbarButtonDeactivated");
            }
            else {
                element.classList.remove("toolbarButtonDeactivated");
                element.classList.add("toolbarButton");
            }
            domHelper_1.DomHelper.disableElement(element, disable);
            if (!isIcon) {
                element.style.backgroundImage = "url(" + this.getImagePath(icon) + ")";
            }
        };
        /**
         * Updates image of icon
         *
         * @param {string} buttonId
         * @param {string} icon
         * @returns
         * @memberof TreeGridToolbarBase
         */
        TreeGridToolbarBase.prototype.updateButtonIcon = function (buttonId, icon, iconInfo) {
            var button = this.getToolbarButton(buttonId);
            if (button == undefined) {
                console.error("Button id not found! id: " + buttonId);
                return;
            }
            var element = this.getElementByToolbarButtonId(button.id);
            if (!element) {
                return;
            }
            element.innerHTML = icon;
            element.style.height = "20px";
            element.style.width = "24px";
            element.style.backgroundImage = "";
            iconInfo.isDrawn = true;
        };
        /**
         * Hides(Shows) the button with the given id
         *
         * @param {string} buttonId
         * @param {boolean} hide
         * @returns
         * @memberof TreeGridToolbarBase
         */
        TreeGridToolbarBase.prototype.hideButton = function (buttonId, hide) {
            var button = this.getToolbarButton(buttonId);
            if (button == undefined) {
                console.error("Button id not found! id: " + buttonId);
                return;
            }
            var element = this.getElementByToolbarButtonId(button.id);
            if (hide == true) {
                element.style.display = "none";
            }
            else {
                element.style.display = "";
            }
        };
        /**
         * Shows the button highlighted (e.g orange background)
         *
         * @param {string} buttonId
         * @param {boolean} activate
         * @returns
         * @memberof TreeGridToolbarBase
         */
        TreeGridToolbarBase.prototype.activateButton = function (buttonId, activate) {
            var button = this.getToolbarButton(buttonId);
            if (button == undefined) {
                console.error("Button id not found! id: " + buttonId);
                return;
            }
            var element = this.getElementByToolbarButtonId(button.id);
            if (element != undefined) {
                if (activate == true) {
                    element.style.backgroundColor = "var(--main-orange)";
                }
                else {
                    element.style.backgroundColor = "";
                }
            }
        };
        /**
         * Returns the id of the toolbar button that was clicked. Only if the toolbar button is not deactivated!
         *
         * @param {string} toolTipText
         * @param {*} toolbarSettings
         * @returns {string}
         * @memberof TreeGridToolbarBase
         */
        TreeGridToolbarBase.prototype.getClickedToolbarId = function (toolTipText, toolbarSettings) {
            // TODO: why itemName == tooltiptext of customtoolbar and not the id!!!
            // ej.TreeGrid.ToolbarItems.Add = "add" => will be "Add" in itemName!!!
            // custom toolbar
            for (var index = 0; index < toolbarSettings.customToolbarItems.length; index++) {
                if (toolbarSettings.customToolbarItems[index].tooltipText == toolTipText) {
                    var button = this.getToolbarButton(toolbarSettings.customToolbarItems[index].text);
                    if (button != undefined && button.disabled == false) {
                        return toolbarSettings.customToolbarItems[index].text;
                    }
                    return "";
                }
            }
            return "";
        };
        /**
         * Sets the styles of all the toolbar buttons
         *
         * @memberof TreeGridToolbarBase
         */
        TreeGridToolbarBase.prototype.setStyleForToolbarIcons = function () {
            for (var i = 0; i < this._toolbarButtons.length; i++) {
                $(this._parentId).append(this.getImageStyle(this._toolbarButtons[i].id, this._toolbarButtons[i].icon));
                // add toolbar class to element
                var element = this.getElementByToolbarButtonId(this._toolbarButtons[i].id);
                element.classList.add("toolbarButton");
            }
        };
        /**
         * Resize the toolbar to the given width
         * Sets the position of the right aligned buttons
         *
         * @param {number} width
         * @memberof TreeGridToolbarBase
         */
        TreeGridToolbarBase.prototype.resize = function (width) {
            var buttonWidth = 31; // TODO: get 31px from div/svg
            var leftButtonCount = this.getVisibleToolbarButtonOnLeftSideCount();
            var rightButtonCount = this.getVisibleToolbarButtonsOnRightSideCount();
            var buttonCount = leftButtonCount + rightButtonCount;
            if (width > (buttonCount * buttonWidth)) { // Only move buttons from right to left if there is enought space  
                // Set the position of the buttons that should be on the right side of the toolbar
                for (var i = 0; i < this._toolbarButtons.length; i++) {
                    if (this._toolbarButtons[i].align == ToolbarButtonAlignment.Right) {
                        var element = this.getElementByToolbarButtonId(this._toolbarButtons[i].id);
                        element.parentElement.style.width = width.toString() + "px";
                        var newPosition = width - (leftButtonCount * buttonWidth) - ((rightButtonCount) * buttonWidth);
                        element.style.left = newPosition.toString() + "px";
                    }
                }
            }
        };
        /**
         * Returns the number of the visible toolbar buttons on the right side
         *
         * @private
         * @returns {number}
         * @memberof TreeGridToolbarBase
         */
        TreeGridToolbarBase.prototype.getVisibleToolbarButtonsOnRightSideCount = function () {
            var visibleToolbarButtons = 0;
            for (var i = 0; i < this._toolbarButtons.length; i++) {
                if (this._toolbarButtons[i].align == ToolbarButtonAlignment.Right) {
                    var element = this.getElementByToolbarButtonId(this._toolbarButtons[i].id);
                    if (element.style.display != "none") {
                        visibleToolbarButtons++;
                    }
                }
            }
            return visibleToolbarButtons;
        };
        /**
         * Returns the number of the visible toolbar buttons on the left side
         *
         * @private
         * @returns
         * @memberof TreeGridToolbarBase
         */
        TreeGridToolbarBase.prototype.getVisibleToolbarButtonOnLeftSideCount = function () {
            var visibleToolbarButtons = 0;
            for (var i = 0; i < this._toolbarButtons.length; i++) {
                if (this._toolbarButtons[i].align == ToolbarButtonAlignment.Left) {
                    var element = this.getElementByToolbarButtonId(this._toolbarButtons[i].id);
                    if (element.style.display != "none") {
                        visibleToolbarButtons++;
                    }
                }
            }
            return visibleToolbarButtons;
        };
        TreeGridToolbarBase.prototype.getImageStyle = function (toolbarId, imageName) {
            var elementId = this.getElementId(toolbarId);
            return "\n            <style type=\"text/css\">\n            " + elementId + " {\n                background-image: url(" + this.getImagePath(imageName) + ");\n                background-size: 20px 20px;\n                background-repeat: no-repeat;\n                background-position: center center;\n                height: 20px;\n                width: 24px;\n            }\n            </style>";
        };
        TreeGridToolbarBase.prototype.getImagePath = function (imageName) {
            return themeProvider_1.ThemeProvider.getInstance().getThemedFilePath(imageName);
        };
        TreeGridToolbarBase.prototype.getDeactivatedIcon = function (icon) {
            return icon.replace(".svg", "_deactivated.svg");
        };
        TreeGridToolbarBase.prototype.getToolbarButton = function (id) {
            return this._toolbarButtons.filter(function (toolbarButton) { return toolbarButton.id == id; })[0];
        };
        TreeGridToolbarBase.prototype.getElementByToolbarButtonId = function (toolbarButtonId) {
            var id = this.getElementId(toolbarButtonId).replace("#", "");
            return document.getElementById(id);
        };
        TreeGridToolbarBase.prototype.getElementId = function (toolbarId) {
            return this._parentId + "_" + toolbarId;
        };
        /**
         * Returns the ej tree grid object
         *
         * @returns {ej.TreeGrid}
         * @memberof TreeGridToolbarBase
         */
        TreeGridToolbarBase.prototype.getTreeGridObject = function () {
            return $(this._parentId).data("ejTreeGrid");
        };
        return TreeGridToolbarBase;
    }());
    exports.TreeGridToolbarBase = TreeGridToolbarBase;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZUdyaWRUb29sYmFyQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jb21tb24vdHJlZUdyaWRUb29sYmFyQmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFPQSxJQUFLLHNCQUdKO0lBSEQsV0FBSyxzQkFBc0I7UUFDdkIsbUVBQUksQ0FBQTtRQUNKLHFFQUFLLENBQUE7SUFDVCxDQUFDLEVBSEksc0JBQXNCLEtBQXRCLHNCQUFzQixRQUcxQjtJQTBXNEIsd0RBQXNCO0lBeFduRDtRQWdCSTs7OztXQUlHO1FBQ0gsNkJBQW1CLFFBQWdCO1lBZjNCLHNCQUFpQixHQUFXLFVBQVUsQ0FBQztZQUN2QyxvQkFBZSxHQUFXLFFBQVEsQ0FBQztZQUVuQywyQkFBc0IsR0FBVyxxQkFBcUIsQ0FBQztZQUN2RCx5QkFBb0IsR0FBVyxtQkFBbUIsQ0FBQztZQUVuRCxvQkFBZSxHQUFHLFdBQVcsR0FBRyxxQ0FBaUIsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLG1DQUFtQyxDQUFDO1lBRTlHLG1CQUFjLEdBQVUsQ0FBQyxDQUFDO1lBUzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1lBQzFCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxLQUFLLEVBQWlCLENBQUM7UUFDdEQsQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ0ksOENBQWdCLEdBQXZCLFVBQXdCLEVBQVUsRUFBRSxPQUFlLEVBQUUsSUFBWSxFQUFFLEtBQTJEO1lBQTNELHNCQUFBLEVBQUEsUUFBZ0Msc0JBQXNCLENBQUMsSUFBSTtZQUMxSCw4Q0FBOEM7WUFDOUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSw2QkFBYSxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDM0UsQ0FBQztRQUVNLDhDQUFnQixHQUF2QixVQUF3QixLQUFhO1lB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QUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVGLENBQUM7UUFFTyx5REFBMkIsR0FBbkMsVUFBb0MsZUFBdUI7WUFDdkQsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzdELE9BQU8sUUFBUSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN2QyxDQUFDO1FBRU8sMENBQVksR0FBcEIsVUFBcUIsU0FBaUI7WUFDbEMsT0FBTyxJQUFJLENBQUMsU0FBUyxHQUFJLEdBQUcsR0FBRyxTQUFTLENBQUM7UUFDN0MsQ0FBQztRQUVKOzs7OztXQUtNO1FBQ0gsK0NBQWlCLEdBQWpCO1lBQ0YsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM3QyxDQUFDO1FBQ0YsMEJBQUM7SUFBRCxDQUFDLEFBdFdELElBc1dDO0lBRU8sa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0b3J5UHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2RpcmVjdG9yeVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IFRvb2xiYXJCdXR0b24gfSBmcm9tIFwiLi90b29sYmFyQnV0dG9uXCI7XHJcbmltcG9ydCB7IERvbUhlbHBlciB9IGZyb20gXCIuL2RvbUhlbHBlclwiO1xyXG5pbXBvcnQgeyBUaGVtZVByb3ZpZGVyIH0gZnJvbSBcIi4vdGhlbWVQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBJY29uSW5mbyB9IGZyb20gXCIuL2ljb25JbmZvXCI7XHJcblxyXG5cclxuZW51bSBUb29sYmFyQnV0dG9uQWxpZ25tZW50e1xyXG4gICAgTGVmdCxcclxuICAgIFJpZ2h0LFxyXG59XHJcblxyXG5hYnN0cmFjdCBjbGFzcyBUcmVlR3JpZFRvb2xiYXJCYXNle1xyXG5cclxuICAgIHByb3RlY3RlZCBfcGFyZW50SWQ6IHN0cmluZztcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfdG9vbGJhckJ1dHRvbnM6IEFycmF5PFRvb2xiYXJCdXR0b24+O1xyXG4gICAgXHJcbiAgICBwcml2YXRlIF9jb2xsYXBzZUJ1dHRvbklkOiBzdHJpbmcgPSBcImNvbGxhcHNlXCI7XHJcbiAgICBwcml2YXRlIF9leHBhbmRCdXR0b25JZDogc3RyaW5nID0gXCJleHBhbmRcIjtcclxuXHJcbiAgICBwcml2YXRlIF9jb2xsYXBzZUJ1dHRvblRvb2xUaXA6IHN0cmluZyA9IFwiQ29sbGFwc2UgYWxsIGNoaWxkc1wiO1xyXG4gICAgcHJpdmF0ZSBfZXhwYW5kQnV0dG9uVG9vbFRpcDogc3RyaW5nID0gXCJFeHBhbmQgYWxsIGNoaWxkc1wiO1xyXG5cclxuICAgIHByaXZhdGUgX2ltYWdlRGlyZWN0b3J5ID0gXCIuLi8uLi8uLi9cIiArIERpcmVjdG9yeVByb3ZpZGVyLmdldFdpZGdldHNEaXJlY3RvcnkoKSArIFwiY29tbW9uL3N0eWxlL2ltYWdlcy90cmVlL3Rvb2xiYXIvXCI7XHJcblxyXG4gICAgcHJpdmF0ZSBfY29sbGFwc2VMZXZlbDpudW1iZXIgPSAwO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICpDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFRyZWVHcmlkVG9vbGJhckJhc2UuXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGFyZW50SWRcclxuICAgICAqIEBtZW1iZXJvZiBUcmVlR3JpZFRvb2xiYXJCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJlbnRJZDogc3RyaW5nKXtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9wYXJlbnRJZCA9IHBhcmVudElkO1xyXG4gICAgICAgIHRoaXMuX3Rvb2xiYXJCdXR0b25zID0gbmV3IEFycmF5PFRvb2xiYXJCdXR0b24+KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgbmV3IHRvb2xiYXIgYnV0dG9uIHRvIHRoZSB0b29sYmFyIGJ1dHRvbnMgbGlzdFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZCBtdXN0IGJlIHdpdGhvdXQgc3BhY2VzXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdG9vbHRpcFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGljb25cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbYWxpZ249XCJsZWZ0XCJdXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJlZUdyaWRUb29sYmFyQmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkVG9vbGJhckJ1dHRvbihpZDogc3RyaW5nLCB0b29sdGlwOiBzdHJpbmcsIGljb246IHN0cmluZywgYWxpZ246IFRvb2xiYXJCdXR0b25BbGlnbm1lbnQgPSBUb29sYmFyQnV0dG9uQWxpZ25tZW50LkxlZnQpe1xyXG4gICAgICAgIC8vIGFkZCB0b29sYmFyIGJ1dHRvbiBuZWVkZWQgdG8gc2hvdyBhIHRvb2xiYXJcclxuICAgICAgICB0aGlzLl90b29sYmFyQnV0dG9ucy5wdXNoKG5ldyBUb29sYmFyQnV0dG9uKGlkLCB0b29sdGlwLCBpY29uLCBhbGlnbikpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgc2V0Q29sbGFwc2VMZXZlbChsZXZlbDogbnVtYmVyKXtcclxuICAgICAgICB0aGlzLl9jb2xsYXBzZUxldmVsID0gbGV2ZWw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZENvbGxhcHNlQnV0dG9uKCl7XHJcbiAgICAgICAgLy8gYWRkIHRvb2xiYXIgYnV0dG9uIGZvciBjb2xsYXBzZVxyXG4gICAgICAgIHRoaXMuX3Rvb2xiYXJCdXR0b25zLnB1c2gobmV3IFRvb2xiYXJCdXR0b24odGhpcy5fY29sbGFwc2VCdXR0b25JZCwgdGhpcy5fY29sbGFwc2VCdXR0b25Ub29sVGlwLCB0aGlzLl9pbWFnZURpcmVjdG9yeSArIFwiY29sbGFwc2Uuc3ZnXCIsIFRvb2xiYXJCdXR0b25BbGlnbm1lbnQuTGVmdCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRFeHBhbmRCdXR0b24oKXtcclxuICAgICAgICAvLyBhZGQgdG9vbGJhciBidXR0b24gZm9yIGV4cGFuZFxyXG4gICAgICAgIHRoaXMuX3Rvb2xiYXJCdXR0b25zLnB1c2gobmV3IFRvb2xiYXJCdXR0b24odGhpcy5fZXhwYW5kQnV0dG9uSWQsIHRoaXMuX2V4cGFuZEJ1dHRvblRvb2xUaXAsIHRoaXMuX2ltYWdlRGlyZWN0b3J5ICsgXCJleHBhbmQuc3ZnXCIsIFRvb2xiYXJCdXR0b25BbGlnbm1lbnQuTGVmdCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoaWRlQ29sbGFwc2VCdXR0b24oaGlkZTogYm9vbGVhbil7XHJcbiAgICAgICAgLy8gaGlkZSBjb2xsYXBzZSB0b29sYmFyIGJ1dHRvblxyXG4gICAgICAgIHRoaXMuaGlkZUJ1dHRvbih0aGlzLl9jb2xsYXBzZUJ1dHRvbklkLCBoaWRlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGlkZUV4cGFuZEJ1dHRvbihoaWRlOiBib29sZWFuKXtcclxuICAgICAgICAvLyBoaWRlIGV4cGFuZCB0b29sYmFyIGJ1dHRvblxyXG4gICAgICAgIHRoaXMuaGlkZUJ1dHRvbih0aGlzLl9leHBhbmRCdXR0b25JZCwgaGlkZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRvb2xiYXJDbGlja0Jhc2UgKGFyZ3Mpe1xyXG4gICAgICAgIHZhciBjbGlja2VkVG9vbGJhcklkID0gdGhpcy5nZXRDbGlja2VkVG9vbGJhcklkKGFyZ3MuaXRlbU5hbWUsIGFyZ3MubW9kZWwudG9vbGJhclNldHRpbmdzKTtcclxuICAgICAgICBpZiAoY2xpY2tlZFRvb2xiYXJJZCA9PSB0aGlzLl9jb2xsYXBzZUJ1dHRvbklkKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX2NvbGxhcHNlTGV2ZWwgPT0gMCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCkuY29sbGFwc2VBbGwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpLmNvbGxhcHNlQXRMZXZlbCh0aGlzLl9jb2xsYXBzZUxldmVsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjbGlja2VkVG9vbGJhcklkID09IHRoaXMuX2V4cGFuZEJ1dHRvbklkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0VHJlZUdyaWRPYmplY3QoKS5leHBhbmRBbGwoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdG9vbGJhciBkZWZpbml0aW9uIGZvciB0aGUgdHJlZSBncmlkXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJlZUdyaWRUb29sYmFyQmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0Q3VzdG9tVG9vbGJhcnMgKCk6YW55e1xyXG4gICAgICAgIGxldCB0b29sYmFycyA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpIDwgdGhpcy5fdG9vbGJhckJ1dHRvbnMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICB0b29sYmFycy5wdXNoKHsgdGV4dDogdGhpcy5fdG9vbGJhckJ1dHRvbnNbaV0uaWQsIHRvb2x0aXBUZXh0OiB0aGlzLl90b29sYmFyQnV0dG9uc1tpXS50b29sdGlwfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0b29sYmFycztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc2FibGVzIHRoZSBidXR0b24gKGUuZy4gc2hvdyB0aGUgXCIuLi5fZGVhY3RpdmF0ZWQuc3ZnIGljb24gaW5zdGVhZCBvZiBcIi4uLi5zdmdcIilcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYnV0dG9uSWRcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZGlzYWJsZVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbaXNJY29uXVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBUcmVlR3JpZFRvb2xiYXJCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkaXNhYmxlQnV0dG9uKGJ1dHRvbklkOnN0cmluZywgZGlzYWJsZTogYm9vbGVhbiwgaXNJY29uPzogYm9vbGVhbil7XHJcbiAgICAgICAgbGV0IGJ1dHRvbiA9IHRoaXMuZ2V0VG9vbGJhckJ1dHRvbihidXR0b25JZCk7XHJcbiAgICAgICAgaWYoYnV0dG9uID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJCdXR0b24gaWQgbm90IGZvdW5kISBpZDogXCIgKyBidXR0b25JZCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnV0dG9uLmRpc2FibGVkID0gZGlzYWJsZTtcclxuXHJcbiAgICAgICAgbGV0IGVsZW1lbnQgPSB0aGlzLmdldEVsZW1lbnRCeVRvb2xiYXJCdXR0b25JZChidXR0b24uaWQpO1xyXG4gICAgICAgIGlmKCFlbGVtZW50KXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaWNvbiA9IGJ1dHRvbi5pY29uO1xyXG4gICAgICAgIGlmKGRpc2FibGUgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIGlmICghaXNJY29uKSB7XHJcbiAgICAgICAgICAgICAgICBpY29uID0gdGhpcy5nZXREZWFjdGl2YXRlZEljb24oYnV0dG9uLmljb24pOyBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbGVtZW50IS5jbGFzc0xpc3QucmVtb3ZlKFwidG9vbGJhckJ1dHRvblwiKTtcclxuICAgICAgICAgICAgZWxlbWVudCEuY2xhc3NMaXN0LmFkZChcInRvb2xiYXJCdXR0b25EZWFjdGl2YXRlZFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgZWxlbWVudCEuY2xhc3NMaXN0LnJlbW92ZShcInRvb2xiYXJCdXR0b25EZWFjdGl2YXRlZFwiKTtcclxuICAgICAgICAgICAgZWxlbWVudCEuY2xhc3NMaXN0LmFkZChcInRvb2xiYXJCdXR0b25cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIERvbUhlbHBlci5kaXNhYmxlRWxlbWVudChlbGVtZW50LCBkaXNhYmxlKTtcclxuICAgICAgICBpZiAoIWlzSWNvbikge1xyXG4gICAgICAgICAgICBlbGVtZW50IS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybChcIiArIHRoaXMuZ2V0SW1hZ2VQYXRoKGljb24pICsgXCIpXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyBpbWFnZSBvZiBpY29uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJ1dHRvbklkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWNvblxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBUcmVlR3JpZFRvb2xiYXJCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB1cGRhdGVCdXR0b25JY29uKGJ1dHRvbklkOnN0cmluZywgaWNvbjogc3RyaW5nLCBpY29uSW5mbzogSWNvbkluZm8pe1xyXG4gICAgICAgIGxldCBidXR0b24gPSB0aGlzLmdldFRvb2xiYXJCdXR0b24oYnV0dG9uSWQpO1xyXG4gICAgICAgIGlmKGJ1dHRvbiA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQnV0dG9uIGlkIG5vdCBmb3VuZCEgaWQ6IFwiICsgYnV0dG9uSWQpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBlbGVtZW50ID0gdGhpcy5nZXRFbGVtZW50QnlUb29sYmFyQnV0dG9uSWQoYnV0dG9uLmlkKTtcclxuICAgICAgICBpZighZWxlbWVudCl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSBpY29uO1xyXG4gICAgICAgIGVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gXCIyMHB4XCI7XHJcbiAgICAgICAgZWxlbWVudC5zdHlsZS53aWR0aCA9IFwiMjRweFwiO1xyXG4gICAgICAgIGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJcIjtcclxuICAgICAgICBpY29uSW5mby5pc0RyYXduID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhpZGVzKFNob3dzKSB0aGUgYnV0dG9uIHdpdGggdGhlIGdpdmVuIGlkXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJ1dHRvbklkXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGhpZGVcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJlZUdyaWRUb29sYmFyQmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaGlkZUJ1dHRvbihidXR0b25JZDogc3RyaW5nLCBoaWRlOiBib29sZWFuKXtcclxuICAgICAgICBsZXQgYnV0dG9uID0gdGhpcy5nZXRUb29sYmFyQnV0dG9uKGJ1dHRvbklkKTtcclxuICAgICAgICBpZihidXR0b24gPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkJ1dHRvbiBpZCBub3QgZm91bmQhIGlkOiBcIiArIGJ1dHRvbklkKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZWxlbWVudCA9IHRoaXMuZ2V0RWxlbWVudEJ5VG9vbGJhckJ1dHRvbklkKGJ1dHRvbi5pZCk7XHJcbiAgICAgICAgaWYoaGlkZSA9PSB0cnVlKXtcclxuICAgICAgICAgICAgZWxlbWVudCEuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBlbGVtZW50IS5zdHlsZS5kaXNwbGF5ID0gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTaG93cyB0aGUgYnV0dG9uIGhpZ2hsaWdodGVkIChlLmcgb3JhbmdlIGJhY2tncm91bmQpXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJ1dHRvbklkXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGFjdGl2YXRlXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFRyZWVHcmlkVG9vbGJhckJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFjdGl2YXRlQnV0dG9uKGJ1dHRvbklkOiBzdHJpbmcsIGFjdGl2YXRlOiBib29sZWFuKXtcclxuICAgICAgICBsZXQgYnV0dG9uID0gdGhpcy5nZXRUb29sYmFyQnV0dG9uKGJ1dHRvbklkKTtcclxuICAgICAgICBpZihidXR0b24gPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkJ1dHRvbiBpZCBub3QgZm91bmQhIGlkOiBcIiArIGJ1dHRvbklkKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZWxlbWVudCA9IHRoaXMuZ2V0RWxlbWVudEJ5VG9vbGJhckJ1dHRvbklkKGJ1dHRvbi5pZCk7XHJcbiAgICAgICAgaWYoZWxlbWVudCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBpZihhY3RpdmF0ZSA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ2YXIoLS1tYWluLW9yYW5nZSlcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgaWQgb2YgdGhlIHRvb2xiYXIgYnV0dG9uIHRoYXQgd2FzIGNsaWNrZWQuIE9ubHkgaWYgdGhlIHRvb2xiYXIgYnV0dG9uIGlzIG5vdCBkZWFjdGl2YXRlZCFcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdG9vbFRpcFRleHRcclxuICAgICAqIEBwYXJhbSB7Kn0gdG9vbGJhclNldHRpbmdzXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFRyZWVHcmlkVG9vbGJhckJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldENsaWNrZWRUb29sYmFySWQodG9vbFRpcFRleHQ6IHN0cmluZywgdG9vbGJhclNldHRpbmdzKTpzdHJpbmd7XHJcbiAgICAgICAgLy8gVE9ETzogd2h5IGl0ZW1OYW1lID09IHRvb2x0aXB0ZXh0IG9mIGN1c3RvbXRvb2xiYXIgYW5kIG5vdCB0aGUgaWQhISFcclxuICAgICAgICAvLyBlai5UcmVlR3JpZC5Ub29sYmFySXRlbXMuQWRkID0gXCJhZGRcIiA9PiB3aWxsIGJlIFwiQWRkXCIgaW4gaXRlbU5hbWUhISFcclxuXHJcbiAgICAgICAgLy8gY3VzdG9tIHRvb2xiYXJcclxuICAgICAgICBmb3IobGV0IGluZGV4ID0wOyBpbmRleCA8IHRvb2xiYXJTZXR0aW5ncy5jdXN0b21Ub29sYmFySXRlbXMubGVuZ3RoOyBpbmRleCsrKXtcclxuICAgICAgICAgICAgaWYodG9vbGJhclNldHRpbmdzLmN1c3RvbVRvb2xiYXJJdGVtc1tpbmRleF0udG9vbHRpcFRleHQgPT0gdG9vbFRpcFRleHQpe1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBsZXQgYnV0dG9uID0gdGhpcy5nZXRUb29sYmFyQnV0dG9uKHRvb2xiYXJTZXR0aW5ncy5jdXN0b21Ub29sYmFySXRlbXNbaW5kZXhdLnRleHQpO1xyXG4gICAgICAgICAgICAgICAgaWYoYnV0dG9uICE9IHVuZGVmaW5lZCAmJiBidXR0b24uZGlzYWJsZWQgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0b29sYmFyU2V0dGluZ3MuY3VzdG9tVG9vbGJhckl0ZW1zW2luZGV4XS50ZXh0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBzdHlsZXMgb2YgYWxsIHRoZSB0b29sYmFyIGJ1dHRvbnNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJlZUdyaWRUb29sYmFyQmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0U3R5bGVGb3JUb29sYmFySWNvbnMoKSB7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGkgPCB0aGlzLl90b29sYmFyQnV0dG9ucy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICQodGhpcy5fcGFyZW50SWQpLmFwcGVuZCh0aGlzLmdldEltYWdlU3R5bGUodGhpcy5fdG9vbGJhckJ1dHRvbnNbaV0uaWQsIHRoaXMuX3Rvb2xiYXJCdXR0b25zW2ldLmljb24pKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIGFkZCB0b29sYmFyIGNsYXNzIHRvIGVsZW1lbnRcclxuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSB0aGlzLmdldEVsZW1lbnRCeVRvb2xiYXJCdXR0b25JZCh0aGlzLl90b29sYmFyQnV0dG9uc1tpXS5pZCk7XHJcbiAgICAgICAgICAgIGVsZW1lbnQhLmNsYXNzTGlzdC5hZGQoXCJ0b29sYmFyQnV0dG9uXCIpO1xyXG4gICAgICAgIH0gICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNpemUgdGhlIHRvb2xiYXIgdG8gdGhlIGdpdmVuIHdpZHRoXHJcbiAgICAgKiBTZXRzIHRoZSBwb3NpdGlvbiBvZiB0aGUgcmlnaHQgYWxpZ25lZCBidXR0b25zXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJlZUdyaWRUb29sYmFyQmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVzaXplKHdpZHRoOiBudW1iZXIpe1xyXG4gICAgICAgIGxldCBidXR0b25XaWR0aCA9IDMxOyAvLyBUT0RPOiBnZXQgMzFweCBmcm9tIGRpdi9zdmdcclxuICAgICAgICBsZXQgbGVmdEJ1dHRvbkNvdW50ID0gdGhpcy5nZXRWaXNpYmxlVG9vbGJhckJ1dHRvbk9uTGVmdFNpZGVDb3VudCgpO1xyXG4gICAgICAgIGxldCByaWdodEJ1dHRvbkNvdW50ID0gdGhpcy5nZXRWaXNpYmxlVG9vbGJhckJ1dHRvbnNPblJpZ2h0U2lkZUNvdW50KCk7XHJcbiAgICAgICAgbGV0IGJ1dHRvbkNvdW50ID0gbGVmdEJ1dHRvbkNvdW50K3JpZ2h0QnV0dG9uQ291bnQ7XHJcbiAgICAgICAgaWYod2lkdGggPiAoYnV0dG9uQ291bnQgKiBidXR0b25XaWR0aCkpeyAvLyBPbmx5IG1vdmUgYnV0dG9ucyBmcm9tIHJpZ2h0IHRvIGxlZnQgaWYgdGhlcmUgaXMgZW5vdWdodCBzcGFjZSAgXHJcbiAgICAgICAgICAgIC8vIFNldCB0aGUgcG9zaXRpb24gb2YgdGhlIGJ1dHRvbnMgdGhhdCBzaG91bGQgYmUgb24gdGhlIHJpZ2h0IHNpZGUgb2YgdGhlIHRvb2xiYXJcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGkgPCB0aGlzLl90b29sYmFyQnV0dG9ucy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLl90b29sYmFyQnV0dG9uc1tpXS5hbGlnbiA9PSBUb29sYmFyQnV0dG9uQWxpZ25tZW50LlJpZ2h0KXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZWxlbWVudCA9IHRoaXMuZ2V0RWxlbWVudEJ5VG9vbGJhckJ1dHRvbklkKHRoaXMuX3Rvb2xiYXJCdXR0b25zW2ldLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50IS5wYXJlbnRFbGVtZW50IS5zdHlsZS53aWR0aCA9IHdpZHRoLnRvU3RyaW5nKCkgKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1Bvc2l0aW9uID0gd2lkdGggLSAobGVmdEJ1dHRvbkNvdW50KmJ1dHRvbldpZHRoKS0oKHJpZ2h0QnV0dG9uQ291bnQpKmJ1dHRvbldpZHRoKTtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50IS5zdHlsZS5sZWZ0ID0gbmV3UG9zaXRpb24udG9TdHJpbmcoKSArIFwicHhcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIG51bWJlciBvZiB0aGUgdmlzaWJsZSB0b29sYmFyIGJ1dHRvbnMgb24gdGhlIHJpZ2h0IHNpZGVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqIEBtZW1iZXJvZiBUcmVlR3JpZFRvb2xiYXJCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VmlzaWJsZVRvb2xiYXJCdXR0b25zT25SaWdodFNpZGVDb3VudCgpOiBudW1iZXJ7XHJcbiAgICAgICAgbGV0IHZpc2libGVUb29sYmFyQnV0dG9ucyA9IDA7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8dGhpcy5fdG9vbGJhckJ1dHRvbnMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZih0aGlzLl90b29sYmFyQnV0dG9uc1tpXS5hbGlnbiA9PSBUb29sYmFyQnV0dG9uQWxpZ25tZW50LlJpZ2h0KXtcclxuICAgICAgICAgICAgICAgIGxldCBlbGVtZW50ID0gdGhpcy5nZXRFbGVtZW50QnlUb29sYmFyQnV0dG9uSWQodGhpcy5fdG9vbGJhckJ1dHRvbnNbaV0uaWQpO1xyXG4gICAgICAgICAgICAgICAgaWYoZWxlbWVudCEuc3R5bGUuZGlzcGxheSAhPSBcIm5vbmVcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZVRvb2xiYXJCdXR0b25zKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZpc2libGVUb29sYmFyQnV0dG9ucztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIG51bWJlciBvZiB0aGUgdmlzaWJsZSB0b29sYmFyIGJ1dHRvbnMgb24gdGhlIGxlZnQgc2lkZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFRyZWVHcmlkVG9vbGJhckJhc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRWaXNpYmxlVG9vbGJhckJ1dHRvbk9uTGVmdFNpZGVDb3VudCgpe1xyXG4gICAgICAgIGxldCB2aXNpYmxlVG9vbGJhckJ1dHRvbnM9MDtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTx0aGlzLl90b29sYmFyQnV0dG9ucy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX3Rvb2xiYXJCdXR0b25zW2ldLmFsaWduID09IFRvb2xiYXJCdXR0b25BbGlnbm1lbnQuTGVmdCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgZWxlbWVudCA9IHRoaXMuZ2V0RWxlbWVudEJ5VG9vbGJhckJ1dHRvbklkKHRoaXMuX3Rvb2xiYXJCdXR0b25zW2ldLmlkKTtcclxuICAgICAgICAgICAgICAgIGlmKGVsZW1lbnQhLnN0eWxlLmRpc3BsYXkgIT0gXCJub25lXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGVUb29sYmFyQnV0dG9ucysrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2aXNpYmxlVG9vbGJhckJ1dHRvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRJbWFnZVN0eWxlKHRvb2xiYXJJZDogc3RyaW5nLCBpbWFnZU5hbWU6c3RyaW5nKXtcclxuICAgICAgICBsZXQgZWxlbWVudElkID0gdGhpcy5nZXRFbGVtZW50SWQodG9vbGJhcklkKTsgXHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgPHN0eWxlIHR5cGU9XCJ0ZXh0L2Nzc1wiPlxyXG4gICAgICAgICAgICBgICsgZWxlbWVudElkICtgIHtcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChgICsgdGhpcy5nZXRJbWFnZVBhdGgoaW1hZ2VOYW1lKSArIGApO1xyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZC1zaXplOiAyMHB4IDIwcHg7XHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyIGNlbnRlcjtcclxuICAgICAgICAgICAgICAgIGhlaWdodDogMjBweDtcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAyNHB4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIDwvc3R5bGU+YDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEltYWdlUGF0aChpbWFnZU5hbWU6IHN0cmluZyk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gVGhlbWVQcm92aWRlci5nZXRJbnN0YW5jZSgpLmdldFRoZW1lZEZpbGVQYXRoKGltYWdlTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXREZWFjdGl2YXRlZEljb24oaWNvbjogc3RyaW5nKTpzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIGljb24ucmVwbGFjZShcIi5zdmdcIiwgXCJfZGVhY3RpdmF0ZWQuc3ZnXCIpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcm90ZWN0ZWQgZ2V0VG9vbGJhckJ1dHRvbihpZDogc3RyaW5nKTogVG9vbGJhckJ1dHRvbnx1bmRlZmluZWR7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Rvb2xiYXJCdXR0b25zLmZpbHRlcih0b29sYmFyQnV0dG9uID0+IHtyZXR1cm4gdG9vbGJhckJ1dHRvbi5pZCA9PSBpZH0pWzBdO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0RWxlbWVudEJ5VG9vbGJhckJ1dHRvbklkKHRvb2xiYXJCdXR0b25JZDogc3RyaW5nKXtcclxuICAgICAgICBsZXQgaWQgPSB0aGlzLmdldEVsZW1lbnRJZCh0b29sYmFyQnV0dG9uSWQpLnJlcGxhY2UoXCIjXCIsIFwiXCIpO1xyXG4gICAgICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRFbGVtZW50SWQodG9vbGJhcklkOiBzdHJpbmcpOnN0cmluZ3tcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGFyZW50SWQgICsgXCJfXCIgKyB0b29sYmFySWQ7XHJcbiAgICB9XHJcblxyXG5cdC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZWogdHJlZSBncmlkIG9iamVjdFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtlai5UcmVlR3JpZH1cclxuICAgICAqIEBtZW1iZXJvZiBUcmVlR3JpZFRvb2xiYXJCYXNlXHJcbiAgICAgKi9cclxuICAgIGdldFRyZWVHcmlkT2JqZWN0KCk6IGVqLlRyZWVHcmlke1xyXG5cdFx0cmV0dXJuICQodGhpcy5fcGFyZW50SWQpLmRhdGEoXCJlalRyZWVHcmlkXCIpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IHtUcmVlR3JpZFRvb2xiYXJCYXNlLCBUb29sYmFyQnV0dG9uQWxpZ25tZW50fTsiXX0=