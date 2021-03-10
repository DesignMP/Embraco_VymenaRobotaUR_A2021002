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
         * @returns
         * @memberof TreeGridToolbarBase
         */
        TreeGridToolbarBase.prototype.disableButton = function (buttonId, disable) {
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
                icon = this.getDeactivatedIcon(button.icon);
                element.classList.remove("toolbarButton");
                element.classList.add("toolbarButtonDeactivated");
            }
            else {
                element.classList.remove("toolbarButtonDeactivated");
                element.classList.add("toolbarButton");
            }
            domHelper_1.DomHelper.disableElement(element, disable);
            element.style.backgroundImage = "url(" + this.getImagePath(icon) + ")";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZUdyaWRUb29sYmFyQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jb21tb24vdHJlZUdyaWRUb29sYmFyQmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFLQSxJQUFLLHNCQUdKO0lBSEQsV0FBSyxzQkFBc0I7UUFDdkIsbUVBQUksQ0FBQTtRQUNKLHFFQUFLLENBQUE7SUFDVCxDQUFDLEVBSEksc0JBQXNCLEtBQXRCLHNCQUFzQixRQUcxQjtJQTZVNEIsd0RBQXNCO0lBM1VuRDtRQWdCSTs7OztXQUlHO1FBQ0gsNkJBQW1CLFFBQWdCO1lBZjNCLHNCQUFpQixHQUFXLFVBQVUsQ0FBQztZQUN2QyxvQkFBZSxHQUFXLFFBQVEsQ0FBQztZQUVuQywyQkFBc0IsR0FBVyxxQkFBcUIsQ0FBQztZQUN2RCx5QkFBb0IsR0FBVyxtQkFBbUIsQ0FBQztZQUVuRCxvQkFBZSxHQUFHLFdBQVcsR0FBRyxxQ0FBaUIsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLG1DQUFtQyxDQUFDO1lBRTlHLG1CQUFjLEdBQVUsQ0FBQyxDQUFDO1lBUzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1lBQzFCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxLQUFLLEVBQWlCLENBQUM7UUFDdEQsQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ0ksOENBQWdCLEdBQXZCLFVBQXdCLEVBQVUsRUFBRSxPQUFlLEVBQUUsSUFBWSxFQUFFLEtBQTJEO1lBQTNELHNCQUFBLEVBQUEsUUFBZ0Msc0JBQXNCLENBQUMsSUFBSTtZQUMxSCw4Q0FBOEM7WUFDOUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSw2QkFBYSxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDM0UsQ0FBQztRQUVNLDhDQUFnQixHQUF2QixVQUF3QixLQUFhO1lB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QVcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3BFLENBQUM7UUFFTyxnREFBa0IsR0FBMUIsVUFBMkIsSUFBWTtZQUNuQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFDcEQsQ0FBQztRQUVTLDhDQUFnQixHQUExQixVQUEyQixFQUFVO1lBQ2pDLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsVUFBQSxhQUFhLElBQUssT0FBTyxhQUFhLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQSxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVGLENBQUM7UUFFTyx5REFBMkIsR0FBbkMsVUFBb0MsZUFBdUI7WUFDdkQsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzdELE9BQU8sUUFBUSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN2QyxDQUFDO1FBRU8sMENBQVksR0FBcEIsVUFBcUIsU0FBaUI7WUFDbEMsT0FBTyxJQUFJLENBQUMsU0FBUyxHQUFJLEdBQUcsR0FBRyxTQUFTLENBQUM7UUFDN0MsQ0FBQztRQUVKOzs7OztXQUtNO1FBQ0gsK0NBQWlCLEdBQWpCO1lBQ0YsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM3QyxDQUFDO1FBQ0YsMEJBQUM7SUFBRCxDQUFDLEFBelVELElBeVVDO0lBRU8sa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0b3J5UHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2RpcmVjdG9yeVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IFRvb2xiYXJCdXR0b24gfSBmcm9tIFwiLi90b29sYmFyQnV0dG9uXCI7XHJcbmltcG9ydCB7IERvbUhlbHBlciB9IGZyb20gXCIuL2RvbUhlbHBlclwiO1xyXG5pbXBvcnQgeyBUaGVtZVByb3ZpZGVyIH0gZnJvbSBcIi4vdGhlbWVQcm92aWRlclwiO1xyXG5cclxuZW51bSBUb29sYmFyQnV0dG9uQWxpZ25tZW50e1xyXG4gICAgTGVmdCxcclxuICAgIFJpZ2h0LFxyXG59XHJcblxyXG5hYnN0cmFjdCBjbGFzcyBUcmVlR3JpZFRvb2xiYXJCYXNle1xyXG5cclxuICAgIHByb3RlY3RlZCBfcGFyZW50SWQ6IHN0cmluZztcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfdG9vbGJhckJ1dHRvbnM6IEFycmF5PFRvb2xiYXJCdXR0b24+O1xyXG4gICAgXHJcbiAgICBwcml2YXRlIF9jb2xsYXBzZUJ1dHRvbklkOiBzdHJpbmcgPSBcImNvbGxhcHNlXCI7XHJcbiAgICBwcml2YXRlIF9leHBhbmRCdXR0b25JZDogc3RyaW5nID0gXCJleHBhbmRcIjtcclxuXHJcbiAgICBwcml2YXRlIF9jb2xsYXBzZUJ1dHRvblRvb2xUaXA6IHN0cmluZyA9IFwiQ29sbGFwc2UgYWxsIGNoaWxkc1wiO1xyXG4gICAgcHJpdmF0ZSBfZXhwYW5kQnV0dG9uVG9vbFRpcDogc3RyaW5nID0gXCJFeHBhbmQgYWxsIGNoaWxkc1wiO1xyXG5cclxuICAgIHByaXZhdGUgX2ltYWdlRGlyZWN0b3J5ID0gXCIuLi8uLi8uLi9cIiArIERpcmVjdG9yeVByb3ZpZGVyLmdldFdpZGdldHNEaXJlY3RvcnkoKSArIFwiY29tbW9uL3N0eWxlL2ltYWdlcy90cmVlL3Rvb2xiYXIvXCI7XHJcblxyXG4gICAgcHJpdmF0ZSBfY29sbGFwc2VMZXZlbDpudW1iZXIgPSAwO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICpDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFRyZWVHcmlkVG9vbGJhckJhc2UuXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGFyZW50SWRcclxuICAgICAqIEBtZW1iZXJvZiBUcmVlR3JpZFRvb2xiYXJCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJlbnRJZDogc3RyaW5nKXtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9wYXJlbnRJZCA9IHBhcmVudElkO1xyXG4gICAgICAgIHRoaXMuX3Rvb2xiYXJCdXR0b25zID0gbmV3IEFycmF5PFRvb2xiYXJCdXR0b24+KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgbmV3IHRvb2xiYXIgYnV0dG9uIHRvIHRoZSB0b29sYmFyIGJ1dHRvbnMgbGlzdFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZCBtdXN0IGJlIHdpdGhvdXQgc3BhY2VzXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdG9vbHRpcFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGljb25cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbYWxpZ249XCJsZWZ0XCJdXHJcbiAgICAgKiBAbWVtYmVyb2YgVHJlZUdyaWRUb29sYmFyQmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkVG9vbGJhckJ1dHRvbihpZDogc3RyaW5nLCB0b29sdGlwOiBzdHJpbmcsIGljb246IHN0cmluZywgYWxpZ246IFRvb2xiYXJCdXR0b25BbGlnbm1lbnQgPSBUb29sYmFyQnV0dG9uQWxpZ25tZW50LkxlZnQpe1xyXG4gICAgICAgIC8vIGFkZCB0b29sYmFyIGJ1dHRvbiBuZWVkZWQgdG8gc2hvdyBhIHRvb2xiYXJcclxuICAgICAgICB0aGlzLl90b29sYmFyQnV0dG9ucy5wdXNoKG5ldyBUb29sYmFyQnV0dG9uKGlkLCB0b29sdGlwLCBpY29uLCBhbGlnbikpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgc2V0Q29sbGFwc2VMZXZlbChsZXZlbDogbnVtYmVyKXtcclxuICAgICAgICB0aGlzLl9jb2xsYXBzZUxldmVsID0gbGV2ZWw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZENvbGxhcHNlQnV0dG9uKCl7XHJcbiAgICAgICAgLy8gYWRkIHRvb2xiYXIgYnV0dG9uIGZvciBjb2xsYXBzZVxyXG4gICAgICAgIHRoaXMuX3Rvb2xiYXJCdXR0b25zLnB1c2gobmV3IFRvb2xiYXJCdXR0b24odGhpcy5fY29sbGFwc2VCdXR0b25JZCwgdGhpcy5fY29sbGFwc2VCdXR0b25Ub29sVGlwLCB0aGlzLl9pbWFnZURpcmVjdG9yeSArIFwiY29sbGFwc2Uuc3ZnXCIsIFRvb2xiYXJCdXR0b25BbGlnbm1lbnQuTGVmdCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRFeHBhbmRCdXR0b24oKXtcclxuICAgICAgICAvLyBhZGQgdG9vbGJhciBidXR0b24gZm9yIGV4cGFuZFxyXG4gICAgICAgIHRoaXMuX3Rvb2xiYXJCdXR0b25zLnB1c2gobmV3IFRvb2xiYXJCdXR0b24odGhpcy5fZXhwYW5kQnV0dG9uSWQsIHRoaXMuX2V4cGFuZEJ1dHRvblRvb2xUaXAsIHRoaXMuX2ltYWdlRGlyZWN0b3J5ICsgXCJleHBhbmQuc3ZnXCIsIFRvb2xiYXJCdXR0b25BbGlnbm1lbnQuTGVmdCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoaWRlQ29sbGFwc2VCdXR0b24oaGlkZTogYm9vbGVhbil7XHJcbiAgICAgICAgLy8gaGlkZSBjb2xsYXBzZSB0b29sYmFyIGJ1dHRvblxyXG4gICAgICAgIHRoaXMuaGlkZUJ1dHRvbih0aGlzLl9jb2xsYXBzZUJ1dHRvbklkLCBoaWRlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGlkZUV4cGFuZEJ1dHRvbihoaWRlOiBib29sZWFuKXtcclxuICAgICAgICAvLyBoaWRlIGV4cGFuZCB0b29sYmFyIGJ1dHRvblxyXG4gICAgICAgIHRoaXMuaGlkZUJ1dHRvbih0aGlzLl9leHBhbmRCdXR0b25JZCwgaGlkZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRvb2xiYXJDbGlja0Jhc2UgKGFyZ3Mpe1xyXG4gICAgICAgIHZhciBjbGlja2VkVG9vbGJhcklkID0gdGhpcy5nZXRDbGlja2VkVG9vbGJhcklkKGFyZ3MuaXRlbU5hbWUsIGFyZ3MubW9kZWwudG9vbGJhclNldHRpbmdzKTtcclxuICAgICAgICBpZiAoY2xpY2tlZFRvb2xiYXJJZCA9PSB0aGlzLl9jb2xsYXBzZUJ1dHRvbklkKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX2NvbGxhcHNlTGV2ZWwgPT0gMCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldFRyZWVHcmlkT2JqZWN0KCkuY29sbGFwc2VBbGwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRUcmVlR3JpZE9iamVjdCgpLmNvbGxhcHNlQXRMZXZlbCh0aGlzLl9jb2xsYXBzZUxldmVsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjbGlja2VkVG9vbGJhcklkID09IHRoaXMuX2V4cGFuZEJ1dHRvbklkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0VHJlZUdyaWRPYmplY3QoKS5leHBhbmRBbGwoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdG9vbGJhciBkZWZpbml0aW9uIGZvciB0aGUgdHJlZSBncmlkXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJlZUdyaWRUb29sYmFyQmFzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0Q3VzdG9tVG9vbGJhcnMgKCk6YW55e1xyXG4gICAgICAgIGxldCB0b29sYmFycyA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpIDwgdGhpcy5fdG9vbGJhckJ1dHRvbnMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICB0b29sYmFycy5wdXNoKHsgdGV4dDogdGhpcy5fdG9vbGJhckJ1dHRvbnNbaV0uaWQsIHRvb2x0aXBUZXh0OiB0aGlzLl90b29sYmFyQnV0dG9uc1tpXS50b29sdGlwfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0b29sYmFycztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc2FibGVzIHRoZSBidXR0b24gKGUuZy4gc2hvdyB0aGUgXCIuLi5fZGVhY3RpdmF0ZWQuc3ZnIGljb24gaW5zdGVhZCBvZiBcIi4uLi5zdmdcIilcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYnV0dG9uSWRcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZGlzYWJsZVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBUcmVlR3JpZFRvb2xiYXJCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkaXNhYmxlQnV0dG9uKGJ1dHRvbklkOnN0cmluZywgZGlzYWJsZTogYm9vbGVhbil7XHJcbiAgICAgICAgbGV0IGJ1dHRvbiA9IHRoaXMuZ2V0VG9vbGJhckJ1dHRvbihidXR0b25JZCk7XHJcbiAgICAgICAgaWYoYnV0dG9uID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJCdXR0b24gaWQgbm90IGZvdW5kISBpZDogXCIgKyBidXR0b25JZCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnV0dG9uLmRpc2FibGVkID0gZGlzYWJsZTtcclxuXHJcbiAgICAgICAgbGV0IGVsZW1lbnQgPSB0aGlzLmdldEVsZW1lbnRCeVRvb2xiYXJCdXR0b25JZChidXR0b24uaWQpO1xyXG4gICAgICAgIGlmKCFlbGVtZW50KXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaWNvbiA9IGJ1dHRvbi5pY29uO1xyXG4gICAgICAgIGlmKGRpc2FibGUgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIGljb24gPSB0aGlzLmdldERlYWN0aXZhdGVkSWNvbihidXR0b24uaWNvbik7XHJcbiAgICAgICAgICAgIGVsZW1lbnQhLmNsYXNzTGlzdC5yZW1vdmUoXCJ0b29sYmFyQnV0dG9uXCIpO1xyXG4gICAgICAgICAgICBlbGVtZW50IS5jbGFzc0xpc3QuYWRkKFwidG9vbGJhckJ1dHRvbkRlYWN0aXZhdGVkXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBlbGVtZW50IS5jbGFzc0xpc3QucmVtb3ZlKFwidG9vbGJhckJ1dHRvbkRlYWN0aXZhdGVkXCIpO1xyXG4gICAgICAgICAgICBlbGVtZW50IS5jbGFzc0xpc3QuYWRkKFwidG9vbGJhckJ1dHRvblwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgRG9tSGVscGVyLmRpc2FibGVFbGVtZW50KGVsZW1lbnQsIGRpc2FibGUpO1xyXG5cclxuICAgICAgICBlbGVtZW50IS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybChcIiArIHRoaXMuZ2V0SW1hZ2VQYXRoKGljb24pICsgXCIpXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIaWRlcyhTaG93cykgdGhlIGJ1dHRvbiB3aXRoIHRoZSBnaXZlbiBpZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBidXR0b25JZFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBoaWRlXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFRyZWVHcmlkVG9vbGJhckJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGhpZGVCdXR0b24oYnV0dG9uSWQ6IHN0cmluZywgaGlkZTogYm9vbGVhbil7XHJcbiAgICAgICAgbGV0IGJ1dHRvbiA9IHRoaXMuZ2V0VG9vbGJhckJ1dHRvbihidXR0b25JZCk7XHJcbiAgICAgICAgaWYoYnV0dG9uID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJCdXR0b24gaWQgbm90IGZvdW5kISBpZDogXCIgKyBidXR0b25JZCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGVsZW1lbnQgPSB0aGlzLmdldEVsZW1lbnRCeVRvb2xiYXJCdXR0b25JZChidXR0b24uaWQpO1xyXG4gICAgICAgIGlmKGhpZGUgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIGVsZW1lbnQhLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgZWxlbWVudCEuc3R5bGUuZGlzcGxheSA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2hvd3MgdGhlIGJ1dHRvbiBoaWdobGlnaHRlZCAoZS5nIG9yYW5nZSBiYWNrZ3JvdW5kKVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBidXR0b25JZFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBhY3RpdmF0ZVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBUcmVlR3JpZFRvb2xiYXJCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhY3RpdmF0ZUJ1dHRvbihidXR0b25JZDogc3RyaW5nLCBhY3RpdmF0ZTogYm9vbGVhbil7XHJcbiAgICAgICAgbGV0IGJ1dHRvbiA9IHRoaXMuZ2V0VG9vbGJhckJ1dHRvbihidXR0b25JZCk7XHJcbiAgICAgICAgaWYoYnV0dG9uID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJCdXR0b24gaWQgbm90IGZvdW5kISBpZDogXCIgKyBidXR0b25JZCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGVsZW1lbnQgPSB0aGlzLmdldEVsZW1lbnRCeVRvb2xiYXJCdXR0b25JZChidXR0b24uaWQpO1xyXG4gICAgICAgIGlmKGVsZW1lbnQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgaWYoYWN0aXZhdGUgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwidmFyKC0tbWFpbi1vcmFuZ2UpXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGlkIG9mIHRoZSB0b29sYmFyIGJ1dHRvbiB0aGF0IHdhcyBjbGlja2VkLiBPbmx5IGlmIHRoZSB0b29sYmFyIGJ1dHRvbiBpcyBub3QgZGVhY3RpdmF0ZWQhXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRvb2xUaXBUZXh0XHJcbiAgICAgKiBAcGFyYW0geyp9IHRvb2xiYXJTZXR0aW5nc1xyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBUcmVlR3JpZFRvb2xiYXJCYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRDbGlja2VkVG9vbGJhcklkKHRvb2xUaXBUZXh0OiBzdHJpbmcsIHRvb2xiYXJTZXR0aW5ncyk6c3RyaW5ne1xyXG4gICAgICAgIC8vIFRPRE86IHdoeSBpdGVtTmFtZSA9PSB0b29sdGlwdGV4dCBvZiBjdXN0b210b29sYmFyIGFuZCBub3QgdGhlIGlkISEhXHJcbiAgICAgICAgLy8gZWouVHJlZUdyaWQuVG9vbGJhckl0ZW1zLkFkZCA9IFwiYWRkXCIgPT4gd2lsbCBiZSBcIkFkZFwiIGluIGl0ZW1OYW1lISEhXHJcblxyXG4gICAgICAgIC8vIGN1c3RvbSB0b29sYmFyXHJcbiAgICAgICAgZm9yKGxldCBpbmRleCA9MDsgaW5kZXggPCB0b29sYmFyU2V0dGluZ3MuY3VzdG9tVG9vbGJhckl0ZW1zLmxlbmd0aDsgaW5kZXgrKyl7XHJcbiAgICAgICAgICAgIGlmKHRvb2xiYXJTZXR0aW5ncy5jdXN0b21Ub29sYmFySXRlbXNbaW5kZXhdLnRvb2x0aXBUZXh0ID09IHRvb2xUaXBUZXh0KXtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgbGV0IGJ1dHRvbiA9IHRoaXMuZ2V0VG9vbGJhckJ1dHRvbih0b29sYmFyU2V0dGluZ3MuY3VzdG9tVG9vbGJhckl0ZW1zW2luZGV4XS50ZXh0KTtcclxuICAgICAgICAgICAgICAgIGlmKGJ1dHRvbiAhPSB1bmRlZmluZWQgJiYgYnV0dG9uLmRpc2FibGVkID09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG9vbGJhclNldHRpbmdzLmN1c3RvbVRvb2xiYXJJdGVtc1tpbmRleF0udGV4dDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgc3R5bGVzIG9mIGFsbCB0aGUgdG9vbGJhciBidXR0b25zXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFRyZWVHcmlkVG9vbGJhckJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFN0eWxlRm9yVG9vbGJhckljb25zKCkge1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpIDwgdGhpcy5fdG9vbGJhckJ1dHRvbnMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAkKHRoaXMuX3BhcmVudElkKS5hcHBlbmQodGhpcy5nZXRJbWFnZVN0eWxlKHRoaXMuX3Rvb2xiYXJCdXR0b25zW2ldLmlkLCB0aGlzLl90b29sYmFyQnV0dG9uc1tpXS5pY29uKSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBhZGQgdG9vbGJhciBjbGFzcyB0byBlbGVtZW50XHJcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gdGhpcy5nZXRFbGVtZW50QnlUb29sYmFyQnV0dG9uSWQodGhpcy5fdG9vbGJhckJ1dHRvbnNbaV0uaWQpO1xyXG4gICAgICAgICAgICBlbGVtZW50IS5jbGFzc0xpc3QuYWRkKFwidG9vbGJhckJ1dHRvblwiKTtcclxuICAgICAgICB9ICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVzaXplIHRoZSB0b29sYmFyIHRvIHRoZSBnaXZlbiB3aWR0aFxyXG4gICAgICogU2V0cyB0aGUgcG9zaXRpb24gb2YgdGhlIHJpZ2h0IGFsaWduZWQgYnV0dG9uc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aFxyXG4gICAgICogQG1lbWJlcm9mIFRyZWVHcmlkVG9vbGJhckJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlc2l6ZSh3aWR0aDogbnVtYmVyKXtcclxuICAgICAgICBsZXQgYnV0dG9uV2lkdGggPSAzMTsgLy8gVE9ETzogZ2V0IDMxcHggZnJvbSBkaXYvc3ZnXHJcbiAgICAgICAgbGV0IGxlZnRCdXR0b25Db3VudCA9IHRoaXMuZ2V0VmlzaWJsZVRvb2xiYXJCdXR0b25PbkxlZnRTaWRlQ291bnQoKTtcclxuICAgICAgICBsZXQgcmlnaHRCdXR0b25Db3VudCA9IHRoaXMuZ2V0VmlzaWJsZVRvb2xiYXJCdXR0b25zT25SaWdodFNpZGVDb3VudCgpO1xyXG4gICAgICAgIGxldCBidXR0b25Db3VudCA9IGxlZnRCdXR0b25Db3VudCtyaWdodEJ1dHRvbkNvdW50O1xyXG4gICAgICAgIGlmKHdpZHRoID4gKGJ1dHRvbkNvdW50ICogYnV0dG9uV2lkdGgpKXsgLy8gT25seSBtb3ZlIGJ1dHRvbnMgZnJvbSByaWdodCB0byBsZWZ0IGlmIHRoZXJlIGlzIGVub3VnaHQgc3BhY2UgIFxyXG4gICAgICAgICAgICAvLyBTZXQgdGhlIHBvc2l0aW9uIG9mIHRoZSBidXR0b25zIHRoYXQgc2hvdWxkIGJlIG9uIHRoZSByaWdodCBzaWRlIG9mIHRoZSB0b29sYmFyXHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpIDwgdGhpcy5fdG9vbGJhckJ1dHRvbnMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5fdG9vbGJhckJ1dHRvbnNbaV0uYWxpZ24gPT0gVG9vbGJhckJ1dHRvbkFsaWdubWVudC5SaWdodCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSB0aGlzLmdldEVsZW1lbnRCeVRvb2xiYXJCdXR0b25JZCh0aGlzLl90b29sYmFyQnV0dG9uc1tpXS5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudCEucGFyZW50RWxlbWVudCEuc3R5bGUud2lkdGggPSB3aWR0aC50b1N0cmluZygpICsgXCJweFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdQb3NpdGlvbiA9IHdpZHRoIC0gKGxlZnRCdXR0b25Db3VudCpidXR0b25XaWR0aCktKChyaWdodEJ1dHRvbkNvdW50KSpidXR0b25XaWR0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudCEuc3R5bGUubGVmdCA9IG5ld1Bvc2l0aW9uLnRvU3RyaW5nKCkgKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgdGhlIHZpc2libGUgdG9vbGJhciBidXR0b25zIG9uIHRoZSByaWdodCBzaWRlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJlZUdyaWRUb29sYmFyQmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFZpc2libGVUb29sYmFyQnV0dG9uc09uUmlnaHRTaWRlQ291bnQoKTogbnVtYmVye1xyXG4gICAgICAgIGxldCB2aXNpYmxlVG9vbGJhckJ1dHRvbnMgPSAwO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPHRoaXMuX3Rvb2xiYXJCdXR0b25zLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYodGhpcy5fdG9vbGJhckJ1dHRvbnNbaV0uYWxpZ24gPT0gVG9vbGJhckJ1dHRvbkFsaWdubWVudC5SaWdodCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgZWxlbWVudCA9IHRoaXMuZ2V0RWxlbWVudEJ5VG9vbGJhckJ1dHRvbklkKHRoaXMuX3Rvb2xiYXJCdXR0b25zW2ldLmlkKTtcclxuICAgICAgICAgICAgICAgIGlmKGVsZW1lbnQhLnN0eWxlLmRpc3BsYXkgIT0gXCJub25lXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGVUb29sYmFyQnV0dG9ucysrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2aXNpYmxlVG9vbGJhckJ1dHRvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgdGhlIHZpc2libGUgdG9vbGJhciBidXR0b25zIG9uIHRoZSBsZWZ0IHNpZGVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBUcmVlR3JpZFRvb2xiYXJCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VmlzaWJsZVRvb2xiYXJCdXR0b25PbkxlZnRTaWRlQ291bnQoKXtcclxuICAgICAgICBsZXQgdmlzaWJsZVRvb2xiYXJCdXR0b25zPTA7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8dGhpcy5fdG9vbGJhckJ1dHRvbnMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZih0aGlzLl90b29sYmFyQnV0dG9uc1tpXS5hbGlnbiA9PSBUb29sYmFyQnV0dG9uQWxpZ25tZW50LkxlZnQpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSB0aGlzLmdldEVsZW1lbnRCeVRvb2xiYXJCdXR0b25JZCh0aGlzLl90b29sYmFyQnV0dG9uc1tpXS5pZCk7XHJcbiAgICAgICAgICAgICAgICBpZihlbGVtZW50IS5zdHlsZS5kaXNwbGF5ICE9IFwibm9uZVwiKXtcclxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlVG9vbGJhckJ1dHRvbnMrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdmlzaWJsZVRvb2xiYXJCdXR0b25zO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0SW1hZ2VTdHlsZSh0b29sYmFySWQ6IHN0cmluZywgaW1hZ2VOYW1lOnN0cmluZyl7XHJcbiAgICAgICAgbGV0IGVsZW1lbnRJZCA9IHRoaXMuZ2V0RWxlbWVudElkKHRvb2xiYXJJZCk7IFxyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgIDxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj5cclxuICAgICAgICAgICAgYCArIGVsZW1lbnRJZCArYCB7XHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoYCArIHRoaXMuZ2V0SW1hZ2VQYXRoKGltYWdlTmFtZSkgKyBgKTtcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQtc2l6ZTogMjBweCAyMHB4O1xyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlciBjZW50ZXI7XHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDIwcHg7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMjRweDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA8L3N0eWxlPmA7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRJbWFnZVBhdGgoaW1hZ2VOYW1lOiBzdHJpbmcpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIFRoZW1lUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXRUaGVtZWRGaWxlUGF0aChpbWFnZU5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0RGVhY3RpdmF0ZWRJY29uKGljb246IHN0cmluZyk6c3RyaW5ne1xyXG4gICAgICAgIHJldHVybiBpY29uLnJlcGxhY2UoXCIuc3ZnXCIsIFwiX2RlYWN0aXZhdGVkLnN2Z1wiKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJvdGVjdGVkIGdldFRvb2xiYXJCdXR0b24oaWQ6IHN0cmluZyk6IFRvb2xiYXJCdXR0b258dW5kZWZpbmVke1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90b29sYmFyQnV0dG9ucy5maWx0ZXIodG9vbGJhckJ1dHRvbiA9PiB7cmV0dXJuIHRvb2xiYXJCdXR0b24uaWQgPT0gaWR9KVswXTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEVsZW1lbnRCeVRvb2xiYXJCdXR0b25JZCh0b29sYmFyQnV0dG9uSWQ6IHN0cmluZyl7XHJcbiAgICAgICAgbGV0IGlkID0gdGhpcy5nZXRFbGVtZW50SWQodG9vbGJhckJ1dHRvbklkKS5yZXBsYWNlKFwiI1wiLCBcIlwiKTtcclxuICAgICAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0RWxlbWVudElkKHRvb2xiYXJJZDogc3RyaW5nKTpzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcmVudElkICArIFwiX1wiICsgdG9vbGJhcklkO1xyXG4gICAgfVxyXG5cclxuXHQvKipcclxuICAgICAqIFJldHVybnMgdGhlIGVqIHRyZWUgZ3JpZCBvYmplY3RcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7ZWouVHJlZUdyaWR9XHJcbiAgICAgKiBAbWVtYmVyb2YgVHJlZUdyaWRUb29sYmFyQmFzZVxyXG4gICAgICovXHJcbiAgICBnZXRUcmVlR3JpZE9iamVjdCgpOiBlai5UcmVlR3JpZHtcclxuXHRcdHJldHVybiAkKHRoaXMuX3BhcmVudElkKS5kYXRhKFwiZWpUcmVlR3JpZFwiKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCB7VHJlZUdyaWRUb29sYmFyQmFzZSwgVG9vbGJhckJ1dHRvbkFsaWdubWVudH07Il19