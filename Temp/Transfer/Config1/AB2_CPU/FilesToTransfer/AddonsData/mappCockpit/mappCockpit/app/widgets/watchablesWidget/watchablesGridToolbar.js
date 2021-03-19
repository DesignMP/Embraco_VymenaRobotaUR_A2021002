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
define(["require", "exports", "../common/treeGridToolbarBase", "../../common/directoryProvider", "../common/iconInfo", "../common/imageProvider"], function (require, exports, treeGridToolbarBase_1, directoryProvider_1, iconInfo_1, imageProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WatchablesGridToolbar = /** @class */ (function (_super) {
        __extends(WatchablesGridToolbar, _super);
        /**
         * Creates an instance of WatchablesGridToolbar.
         * @param {string} imageDirectory
         * @param {string} parentId
         * @memberof WatchablesGridToolbar
         */
        function WatchablesGridToolbar(parentId) {
            var _this = _super.call(this, parentId) || this;
            _this.imageDirectory = "../../../" + directoryProvider_1.DirectoryProvider.getWidgetsDirectory() + "watchablesWidget/style/images/toolbar/";
            _this._toolbarIconInfo = new Array();
            _this._currentIconDraggedOver = new iconInfo_1.IconInfo('', '', '');
            _this._watchableStateParameters = [];
            _this._parentDivId = parentId;
            _this.addToolbarButton('empty', '', _this.imageDirectory + "empty.svg");
            return _this;
        }
        /**
         * Adds icon to be inserted in the toolbar
         *
         * @param {MappCockpitStateParameter} watchableStateParameter
         * @memberof WatchablesGridToolbar
         */
        WatchablesGridToolbar.prototype.addIcon = function (watchableStateParameter) {
            this._watchableStateParameters.push(watchableStateParameter);
            var name = watchableStateParameter.name, tooltip = watchableStateParameter.icon[0]["Tooltip"], imageName = watchableStateParameter.icon[0]["ImageName"];
            var path = this.imageDirectory + imageName + '.svg';
            this._toolbarIconInfo.push(new iconInfo_1.IconInfo(name, tooltip, imageName));
            this.addToolbarButton(name, tooltip, path);
        };
        /**
         * Add event listener to icons for mouseover
         *
         * @memberof WatchablesGridToolbar
         */
        WatchablesGridToolbar.prototype.addEventListeners = function () {
            var _this = this;
            for (var i = 0; i < this._watchableStateParameters.length; i++) {
                var elemId = this._parentDivId + '_' + this._watchableStateParameters[i].name;
                $(elemId).on('mouseover', function (e) { return _this.getMouseOverIcon(e); });
            }
        };
        /**
         * Updates toolbar tooltip without updating the whole treegrid
         *
         * @memberof WatchablesGridToolbar
         */
        WatchablesGridToolbar.prototype.tooltipExtension = function () {
            var toolbar = this;
            var target = $(this._parentDivId + '_toolbarItems_content')[0];
            var observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutationRecord) {
                    var newValue = toolbar.getToolbarIconInfo(toolbar._currentIconDraggedOver.name).tooltip;
                    var oldValue = target.innerHTML;
                    if (newValue != oldValue) {
                        target.innerHTML = newValue;
                    }
                });
            });
            observer.observe(target, { attributes: true, childList: true, characterData: true });
        };
        WatchablesGridToolbar.prototype.disableDummyButton = function () {
            this.disableButton('empty', true, true);
        };
        /**
         * Disable icons in toolbar so they don't behave as buttons
         *
         * @memberof WatchablesGridToolbar
         */
        WatchablesGridToolbar.prototype.disableIcons = function () {
            for (var i = 0; i < this._toolbarIconInfo.length; i++) {
                this.disableButton(this._toolbarIconInfo[i].name, true, true);
            }
        };
        /**
         * Updates icon
         *
         * @param {string} name
         * @param {string} imageName
         * @param {string} tooltip
         * @memberof WatchablesGridToolbar
         */
        WatchablesGridToolbar.prototype.updateIcons = function (name, imageName, tooltip) {
            var toolbarIcon = this.getToolbarIconInfo(name);
            if (toolbarIcon.imageName !== imageName || toolbarIcon.isDrawn === false) {
                var image = imageProvider_1.ImageProvider.getInstance().getImage('../app/widgets/watchablesWidget/style/images/toolbar/' + imageName + '.svg');
                this.updateButtonIcon(name, image, toolbarIcon);
                //update toolbarIcon
                toolbarIcon.imageName = imageName;
                toolbarIcon.tooltip = tooltip;
            }
        };
        /**
         * Get icon where we are dragging the mouse over
         *
         * @private
         * @param {*} args
         * @memberof WatchablesGridToolbar
         */
        WatchablesGridToolbar.prototype.getMouseOverIcon = function (args) {
            var name = ('#' + args.currentTarget.id).split(this._parentDivId + '_')[1];
            for (var i = 0; i < this._watchableStateParameters.length; i++) {
                if (this._toolbarIconInfo[i].name == name) {
                    this._currentIconDraggedOver = this._toolbarIconInfo[i];
                }
            }
        };
        /**
         * Get Icon info
         *
         * @private
         * @param {string} name
         * @returns {IconInfo}
         * @memberof WatchablesGridToolbar
         */
        WatchablesGridToolbar.prototype.getToolbarIconInfo = function (name) {
            var iconInfo;
            name = name.replace(/\s/g, '_');
            this._toolbarIconInfo.forEach(function (info) {
                if (info.name == name) {
                    iconInfo = info;
                }
            });
            return iconInfo;
        };
        WatchablesGridToolbar.prototype.hideIcon = function (id) {
            this.hideButton(id, true);
        };
        WatchablesGridToolbar.prototype.showIcon = function (id) {
            this.hideButton(id, false);
        };
        return WatchablesGridToolbar;
    }(treeGridToolbarBase_1.TreeGridToolbarBase));
    exports.WatchablesGridToolbar = WatchablesGridToolbar;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2F0Y2hhYmxlc0dyaWRUb29sYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3dhdGNoYWJsZXNXaWRnZXQvd2F0Y2hhYmxlc0dyaWRUb29sYmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFNQTtRQUEyQyx5Q0FBbUI7UUFRMUQ7Ozs7O1dBS0c7UUFDSCwrQkFBWSxRQUFnQjtZQUE1QixZQUNJLGtCQUFNLFFBQVEsQ0FBQyxTQUlsQjtZQWpCZ0Isb0JBQWMsR0FBRyxXQUFXLEdBQUcscUNBQWlCLENBQUMsbUJBQW1CLEVBQUUsR0FBRyx3Q0FBd0MsQ0FBQztZQUUzSCxzQkFBZ0IsR0FBSSxJQUFJLEtBQUssRUFBWSxDQUFDO1lBQzFDLDZCQUF1QixHQUFhLElBQUksbUJBQVEsQ0FBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzNELCtCQUF5QixHQUFnQyxFQUFFLENBQUM7WUFVaEUsS0FBSSxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUM7WUFFN0IsS0FBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxFQUFFLEVBQUUsS0FBSSxDQUFDLGNBQWMsR0FBRyxXQUFXLENBQUMsQ0FBQzs7UUFDMUUsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gsdUNBQU8sR0FBUCxVQUFRLHVCQUFrRDtZQUN0RCxJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDN0QsSUFBSSxJQUFJLEdBQUcsdUJBQXVCLENBQUMsSUFBSSxFQUN2QyxPQUFPLEdBQUcsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUNwRCxTQUFTLEdBQUcsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRXpELElBQUksSUFBSSxHQUFHLElBQUks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VUFBUyxFQUFVO1lBQ2YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDOUIsQ0FBQztRQUVELHdDQUFRLEdBQVIsVUFBUyxFQUFVO1lBQ2YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDL0IsQ0FBQztRQUNMLDRCQUFDO0lBQUQsQ0FBQyxBQW5KRCxDQUEyQyx5Q0FBbUIsR0FtSjdEO0lBbkpZLHNEQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRyZWVHcmlkVG9vbGJhckJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL3RyZWVHcmlkVG9vbGJhckJhc2VcIjtcclxuaW1wb3J0IHsgRGlyZWN0b3J5UHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2RpcmVjdG9yeVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IEljb25JbmZvIH0gZnJvbSBcIi4uL2NvbW1vbi9pY29uSW5mb1wiO1xyXG5pbXBvcnQgeyBJbWFnZVByb3ZpZGVyIH0gZnJvbSBcIi4uL2NvbW1vbi9pbWFnZVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IE1hcHBDb2NrcGl0U3RhdGVQYXJhbWV0ZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL29ubGluZS9tYXBwQ29ja3BpdENvbXBvbmVudFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFdhdGNoYWJsZXNHcmlkVG9vbGJhciBleHRlbmRzIFRyZWVHcmlkVG9vbGJhckJhc2V7XHJcbiAgICAgICAgIFxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBpbWFnZURpcmVjdG9yeSA9IFwiLi4vLi4vLi4vXCIgKyBEaXJlY3RvcnlQcm92aWRlci5nZXRXaWRnZXRzRGlyZWN0b3J5KCkgKyBcIndhdGNoYWJsZXNXaWRnZXQvc3R5bGUvaW1hZ2VzL3Rvb2xiYXIvXCI7XHJcbiAgICBwcml2YXRlIF9wYXJlbnREaXZJZDogc3RyaW5nfHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX3Rvb2xiYXJJY29uSW5mbyA9ICBuZXcgQXJyYXk8SWNvbkluZm8+KCk7XHJcbiAgICBwcml2YXRlIF9jdXJyZW50SWNvbkRyYWdnZWRPdmVyOiBJY29uSW5mbyA9IG5ldyBJY29uSW5mbygnJywnJywnJyk7XHJcbiAgICBwcml2YXRlIF93YXRjaGFibGVTdGF0ZVBhcmFtZXRlcnM6IE1hcHBDb2NrcGl0U3RhdGVQYXJhbWV0ZXJbXSA9IFtdO1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgV2F0Y2hhYmxlc0dyaWRUb29sYmFyLlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGltYWdlRGlyZWN0b3J5XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGFyZW50SWRcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzR3JpZFRvb2xiYXJcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IocGFyZW50SWQ6IHN0cmluZyl7XHJcbiAgICAgICAgc3VwZXIocGFyZW50SWQpO1xyXG4gICAgICAgIHRoaXMuX3BhcmVudERpdklkID0gcGFyZW50SWQ7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkVG9vbGJhckJ1dHRvbignZW1wdHknLCAnJywgdGhpcy5pbWFnZURpcmVjdG9yeSArIFwiZW1wdHkuc3ZnXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBpY29uIHRvIGJlIGluc2VydGVkIGluIHRoZSB0b29sYmFyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdFN0YXRlUGFyYW1ldGVyfSB3YXRjaGFibGVTdGF0ZVBhcmFtZXRlclxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBhZGRJY29uKHdhdGNoYWJsZVN0YXRlUGFyYW1ldGVyOiBNYXBwQ29ja3BpdFN0YXRlUGFyYW1ldGVyKSB7XHJcbiAgICAgICAgdGhpcy5fd2F0Y2hhYmxlU3RhdGVQYXJhbWV0ZXJzLnB1c2god2F0Y2hhYmxlU3RhdGVQYXJhbWV0ZXIpO1xyXG4gICAgICAgIHZhciBuYW1lID0gd2F0Y2hhYmxlU3RhdGVQYXJhbWV0ZXIubmFtZSxcclxuICAgICAgICB0b29sdGlwID0gd2F0Y2hhYmxlU3RhdGVQYXJhbWV0ZXIuaWNvblswXVtcIlRvb2x0aXBcIl0sIFxyXG4gICAgICAgIGltYWdlTmFtZSA9IHdhdGNoYWJsZVN0YXRlUGFyYW1ldGVyLmljb25bMF1bXCJJbWFnZU5hbWVcIl07XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHBhdGggPSB0aGlzLmltYWdlRGlyZWN0b3J5ICsgaW1hZ2VOYW1lICsnLnN2Zyc7XHJcbiAgICAgICAgdGhpcy5fdG9vbGJhckljb25JbmZvLnB1c2gobmV3IEljb25JbmZvKG5hbWUsIHRvb2x0aXAsIGltYWdlTmFtZSkpO1xyXG4gICAgICAgIHRoaXMuYWRkVG9vbGJhckJ1dHRvbihuYW1lLCB0b29sdGlwLCBwYXRoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBldmVudCBsaXN0ZW5lciB0byBpY29ucyBmb3IgbW91c2VvdmVyXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBhZGRFdmVudExpc3RlbmVycygpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3dhdGNoYWJsZVN0YXRlUGFyYW1ldGVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgZWxlbUlkID0gdGhpcy5fcGFyZW50RGl2SWQgKyAnXycgKyB0aGlzLl93YXRjaGFibGVTdGF0ZVBhcmFtZXRlcnNbaV0ubmFtZTtcclxuICAgICAgICAgICAgJChlbGVtSWQpLm9uKCdtb3VzZW92ZXInLCAoZSkgPT4gdGhpcy5nZXRNb3VzZU92ZXJJY29uKGUpICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0b29sYmFyIHRvb2x0aXAgd2l0aG91dCB1cGRhdGluZyB0aGUgd2hvbGUgdHJlZWdyaWRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc0dyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIHRvb2x0aXBFeHRlbnNpb24oKSB7XHJcbiAgICAgICAgdmFyIHRvb2xiYXIgPSB0aGlzO1xyXG4gICAgICAgIHZhciB0YXJnZXQgPSAkKHRoaXMuX3BhcmVudERpdklkICsgJ190b29sYmFySXRlbXNfY29udGVudCcpWzBdO1xyXG4gICAgICAgIHZhciBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uKG11dGF0aW9ucykge1xyXG4gICAgICAgICAgICBtdXRhdGlvbnMuZm9yRWFjaChmdW5jdGlvbihtdXRhdGlvblJlY29yZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5ld1ZhbHVlID0gdG9vbGJhci5nZXRUb29sYmFySWNvbkluZm8odG9vbGJhci5fY3VycmVudEljb25EcmFnZ2VkT3Zlci5uYW1lKS50b29sdGlwO1xyXG4gICAgICAgICAgICAgICAgdmFyIG9sZFZhbHVlID0gdGFyZ2V0LmlubmVySFRNTDtcclxuICAgICAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPSBvbGRWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5pbm5lckhUTUwgPSBuZXdWYWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7ICAgIFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBvYnNlcnZlci5vYnNlcnZlKHRhcmdldCwgeyBhdHRyaWJ1dGVzIDogdHJ1ZSwgY2hpbGRMaXN0OiB0cnVlLCBjaGFyYWN0ZXJEYXRhOnRydWUgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzYWJsZUR1bW15QnV0dG9uKCl7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlQnV0dG9uKCdlbXB0eScsIHRydWUsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzYWJsZSBpY29ucyBpbiB0b29sYmFyIHNvIHRoZXkgZG9uJ3QgYmVoYXZlIGFzIGJ1dHRvbnNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc0dyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIGRpc2FibGVJY29ucygpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3Rvb2xiYXJJY29uSW5mby5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmRpc2FibGVCdXR0b24odGhpcy5fdG9vbGJhckljb25JbmZvW2ldLm5hbWUsIHRydWUsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgaWNvblxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW1hZ2VOYW1lXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdG9vbHRpcFxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICB1cGRhdGVJY29ucyhuYW1lOiBzdHJpbmcsIGltYWdlTmFtZTogc3RyaW5nLCB0b29sdGlwOiBzdHJpbmcpIHtcclxuICAgICAgICB2YXIgdG9vbGJhckljb246IEljb25JbmZvID0gdGhpcy5nZXRUb29sYmFySWNvbkluZm8obmFtZSk7XHJcbiAgICAgICAgaWYgKHRvb2xiYXJJY29uLmltYWdlTmFtZSAhPT0gaW1hZ2VOYW1lIHx8IHRvb2xiYXJJY29uLmlzRHJhd24gPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHZhciBpbWFnZSA9IEltYWdlUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXRJbWFnZSgnLi4vYXBwL3dpZGdldHMvd2F0Y2hhYmxlc1dpZGdldC9zdHlsZS9pbWFnZXMvdG9vbGJhci8nICsgaW1hZ2VOYW1lICsgJy5zdmcnKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVCdXR0b25JY29uKG5hbWUsIGltYWdlLCB0b29sYmFySWNvbik7XHJcbiAgICAgICAgICAgIC8vdXBkYXRlIHRvb2xiYXJJY29uXHJcbiAgICAgICAgICAgIHRvb2xiYXJJY29uLmltYWdlTmFtZSA9IGltYWdlTmFtZTtcclxuICAgICAgICAgICAgdG9vbGJhckljb24udG9vbHRpcCA9IHRvb2x0aXA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IGljb24gd2hlcmUgd2UgYXJlIGRyYWdnaW5nIHRoZSBtb3VzZSBvdmVyXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldE1vdXNlT3Zlckljb24oYXJncykge1xyXG4gICAgICAgIHZhciBuYW1lID0gKCcjJyArIGFyZ3MuY3VycmVudFRhcmdldC5pZCkuc3BsaXQodGhpcy5fcGFyZW50RGl2SWQgKyAnXycpWzFdO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpPCB0aGlzLl93YXRjaGFibGVTdGF0ZVBhcmFtZXRlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3Rvb2xiYXJJY29uSW5mb1tpXS5uYW1lID09IG5hbWUpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudEljb25EcmFnZ2VkT3ZlciA9IHRoaXMuX3Rvb2xiYXJJY29uSW5mb1tpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBJY29uIGluZm9cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICAgICAqIEByZXR1cm5zIHtJY29uSW5mb31cclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzR3JpZFRvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUb29sYmFySWNvbkluZm8obmFtZTogc3RyaW5nKTogSWNvbkluZm97XHJcbiAgICAgICAgdmFyIGljb25JbmZvO1xyXG4gICAgICAgIG5hbWUgPSBuYW1lLnJlcGxhY2UoL1xccy9nLCdfJyk7XHJcbiAgICAgICAgdGhpcy5fdG9vbGJhckljb25JbmZvLmZvckVhY2goKGluZm8pID0+IHtcclxuICAgICAgICAgICAgaWYgKGluZm8ubmFtZSA9PSBuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBpY29uSW5mbyA9IGluZm87XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gaWNvbkluZm87XHJcbiAgICB9XHJcblxyXG4gICAgaGlkZUljb24oaWQ6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuaGlkZUJ1dHRvbihpZCwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0ljb24oaWQ6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuaGlkZUJ1dHRvbihpZCwgZmFsc2UpO1xyXG4gICAgfVxyXG59Il19