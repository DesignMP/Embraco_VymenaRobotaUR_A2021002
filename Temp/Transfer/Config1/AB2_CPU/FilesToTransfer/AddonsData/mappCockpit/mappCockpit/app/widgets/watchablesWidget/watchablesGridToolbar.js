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
define(["require", "exports", "../common/treeGridToolbarBase", "../../common/directoryProvider", "../common/iconInfo"], function (require, exports, treeGridToolbarBase_1, directoryProvider_1, iconInfo_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WatchablesGridToolbar = /** @class */ (function (_super) {
        __extends(WatchablesGridToolbar, _super);
        /**
         * Creates an instance of WatchablesGridToolbar.
         * @param {string} parentId
         * @param {IImageProvider} imageProvider
         * @memberof WatchablesGridToolbar
         */
        function WatchablesGridToolbar(parentId, imageProvider) {
            var _this = _super.call(this, parentId) || this;
            _this.imageDirectory = "../../../" + directoryProvider_1.DirectoryProvider.getWidgetsDirectory() + "watchablesWidget/style/images/toolbar/";
            _this._toolbarIconInfo = new Array();
            _this._currentIconDraggedOver = new iconInfo_1.IconInfo('', '', '');
            _this._watchableStateParameters = [];
            _this._imageProvider = imageProvider;
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
        WatchablesGridToolbar.prototype.convertBtnsToIcons = function () {
            for (var i = 0; i < this._toolbarIconInfo.length; i++) {
                this.disableButton(this._toolbarIconInfo[i].name, true, true);
            }
        };
        /**
         * Updates icon image
         *
         * @param {string} name
         * @param {string} imageName
         * @param {string} tooltip
         * @memberof WatchablesGridToolbar
         */
        WatchablesGridToolbar.prototype.updateIcons = function (name, imageName, tooltip) {
            var toolbarIcon = this.getToolbarIconInfo(name);
            if (toolbarIcon.imageName !== imageName || toolbarIcon.isDrawn === false) {
                if (this._imageProvider != undefined) {
                    var image = this._imageProvider.getImage('../app/widgets/watchablesWidget/style/images/toolbar/' + imageName + '.svg');
                    this.updateButtonIcon(name, image, toolbarIcon);
                    //update toolbarIcon
                    toolbarIcon.imageName = imageName;
                    toolbarIcon.tooltip = tooltip;
                }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2F0Y2hhYmxlc0dyaWRUb29sYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC93aWRnZXRzL3dhdGNoYWJsZXNXaWRnZXQvd2F0Y2hhYmxlc0dyaWRUb29sYmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFNQTtRQUEyQyx5Q0FBbUI7UUFTMUQ7Ozs7O1dBS0c7UUFDSCwrQkFBWSxRQUFnQixFQUFFLGFBQTZCO1lBQTNELFlBQ0ksa0JBQU0sUUFBUSxDQUFDLFNBS2xCO1lBbkJnQixvQkFBYyxHQUFHLFdBQVcsR0FBRyxxQ0FBaUIsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLHdDQUF3QyxDQUFDO1lBRTNILHNCQUFnQixHQUFJLElBQUksS0FBSyxFQUFZLENBQUM7WUFDMUMsNkJBQXVCLEdBQWEsSUFBSSxtQkFBUSxDQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQUM7WUFDM0QsK0JBQXlCLEdBQWdDLEVBQUUsQ0FBQztZQVdoRSxLQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztZQUNwQyxLQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQztZQUU3QixLQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxLQUFJLENBQUMsY0FBYyxHQUFHLFdBQVcsQ0FBQyxDQUFDOztRQUMxRSxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSCx1Q0FBTyxHQUFQLFVBQVEsdUJBQWtEO1lBQ3RELElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUM3RCxJQUFJLElBQUksR0FBRyx1QkFBdUIsQ0FBQyxJQUFJLEVBQ3ZDLE9BQU8sR0FBRyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQ3BELFNBQVMsR0FBRyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFD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USxHQUFHLElBQUksQ0FBQztpQkFDbkI7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUNILE9BQU8sUUFBUSxDQUFDO1FBQ3BCLENBQUM7UUFFRCx3Q0FBUSxHQUFSLFVBQVMsRUFBVTtZQUNmLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzlCLENBQUM7UUFFRCx3Q0FBUSxHQUFSLFVBQVMsRUFBVTtZQUNmLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQy9CLENBQUM7UUFDTCw0QkFBQztJQUFELENBQUMsQUF2SkQsQ0FBMkMseUNBQW1CLEdBdUo3RDtJQXZKWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUcmVlR3JpZFRvb2xiYXJCYXNlIH0gZnJvbSBcIi4uL2NvbW1vbi90cmVlR3JpZFRvb2xiYXJCYXNlXCI7XHJcbmltcG9ydCB7IERpcmVjdG9yeVByb3ZpZGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9kaXJlY3RvcnlQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBJY29uSW5mbyB9IGZyb20gXCIuLi9jb21tb24vaWNvbkluZm9cIjtcclxuaW1wb3J0IHsgTWFwcENvY2twaXRTdGF0ZVBhcmFtZXRlciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvb25saW5lL21hcHBDb2NrcGl0Q29tcG9uZW50XCI7XHJcbmltcG9ydCB7IElJbWFnZVByb3ZpZGVyIH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL2ltYWdlUHJvdmlkZXJJbnRlcmZhY2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBXYXRjaGFibGVzR3JpZFRvb2xiYXIgZXh0ZW5kcyBUcmVlR3JpZFRvb2xiYXJCYXNle1xyXG4gICAgICAgICBcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgaW1hZ2VEaXJlY3RvcnkgPSBcIi4uLy4uLy4uL1wiICsgRGlyZWN0b3J5UHJvdmlkZXIuZ2V0V2lkZ2V0c0RpcmVjdG9yeSgpICsgXCJ3YXRjaGFibGVzV2lkZ2V0L3N0eWxlL2ltYWdlcy90b29sYmFyL1wiO1xyXG4gICAgcHJpdmF0ZSBfcGFyZW50RGl2SWQ6IHN0cmluZ3x1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF90b29sYmFySWNvbkluZm8gPSAgbmV3IEFycmF5PEljb25JbmZvPigpO1xyXG4gICAgcHJpdmF0ZSBfY3VycmVudEljb25EcmFnZ2VkT3ZlcjogSWNvbkluZm8gPSBuZXcgSWNvbkluZm8oJycsJycsJycpO1xyXG4gICAgcHJpdmF0ZSBfd2F0Y2hhYmxlU3RhdGVQYXJhbWV0ZXJzOiBNYXBwQ29ja3BpdFN0YXRlUGFyYW1ldGVyW10gPSBbXTtcclxuICAgIHByaXZhdGUgX2ltYWdlUHJvdmlkZXI6IElJbWFnZVByb3ZpZGVyO1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgV2F0Y2hhYmxlc0dyaWRUb29sYmFyLlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhcmVudElkXHJcbiAgICAgKiBAcGFyYW0ge0lJbWFnZVByb3ZpZGVyfSBpbWFnZVByb3ZpZGVyXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc0dyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHBhcmVudElkOiBzdHJpbmcsIGltYWdlUHJvdmlkZXI6IElJbWFnZVByb3ZpZGVyKXtcclxuICAgICAgICBzdXBlcihwYXJlbnRJZCk7IFxyXG4gICAgICAgIHRoaXMuX2ltYWdlUHJvdmlkZXIgPSBpbWFnZVByb3ZpZGVyO1xyXG4gICAgICAgIHRoaXMuX3BhcmVudERpdklkID0gcGFyZW50SWQ7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkVG9vbGJhckJ1dHRvbignZW1wdHknLCAnJywgdGhpcy5pbWFnZURpcmVjdG9yeSArIFwiZW1wdHkuc3ZnXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBpY29uIHRvIGJlIGluc2VydGVkIGluIHRoZSB0b29sYmFyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNYXBwQ29ja3BpdFN0YXRlUGFyYW1ldGVyfSB3YXRjaGFibGVTdGF0ZVBhcmFtZXRlclxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBhZGRJY29uKHdhdGNoYWJsZVN0YXRlUGFyYW1ldGVyOiBNYXBwQ29ja3BpdFN0YXRlUGFyYW1ldGVyKSB7XHJcbiAgICAgICAgdGhpcy5fd2F0Y2hhYmxlU3RhdGVQYXJhbWV0ZXJzLnB1c2god2F0Y2hhYmxlU3RhdGVQYXJhbWV0ZXIpO1xyXG4gICAgICAgIHZhciBuYW1lID0gd2F0Y2hhYmxlU3RhdGVQYXJhbWV0ZXIubmFtZSxcclxuICAgICAgICB0b29sdGlwID0gd2F0Y2hhYmxlU3RhdGVQYXJhbWV0ZXIuaWNvblswXVtcIlRvb2x0aXBcIl0sIFxyXG4gICAgICAgIGltYWdlTmFtZSA9IHdhdGNoYWJsZVN0YXRlUGFyYW1ldGVyLmljb25bMF1bXCJJbWFnZU5hbWVcIl07XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHBhdGggPSB0aGlzLmltYWdlRGlyZWN0b3J5ICsgaW1hZ2VOYW1lICsnLnN2Zyc7XHJcbiAgICAgICAgdGhpcy5fdG9vbGJhckljb25JbmZvLnB1c2gobmV3IEljb25JbmZvKG5hbWUsIHRvb2x0aXAsIGltYWdlTmFtZSkpO1xyXG4gICAgICAgIHRoaXMuYWRkVG9vbGJhckJ1dHRvbihuYW1lLCB0b29sdGlwLCBwYXRoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBldmVudCBsaXN0ZW5lciB0byBpY29ucyBmb3IgbW91c2VvdmVyXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICBhZGRFdmVudExpc3RlbmVycygpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3dhdGNoYWJsZVN0YXRlUGFyYW1ldGVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgZWxlbUlkID0gdGhpcy5fcGFyZW50RGl2SWQgKyAnXycgKyB0aGlzLl93YXRjaGFibGVTdGF0ZVBhcmFtZXRlcnNbaV0ubmFtZTtcclxuICAgICAgICAgICAgJChlbGVtSWQpLm9uKCdtb3VzZW92ZXInLCAoZSkgPT4gdGhpcy5nZXRNb3VzZU92ZXJJY29uKGUpICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0b29sYmFyIHRvb2x0aXAgd2l0aG91dCB1cGRhdGluZyB0aGUgd2hvbGUgdHJlZWdyaWRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc0dyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIHRvb2x0aXBFeHRlbnNpb24oKSB7XHJcbiAgICAgICAgdmFyIHRvb2xiYXIgPSB0aGlzO1xyXG4gICAgICAgIHZhciB0YXJnZXQgPSAkKHRoaXMuX3BhcmVudERpdklkICsgJ190b29sYmFySXRlbXNfY29udGVudCcpWzBdO1xyXG4gICAgICAgIHZhciBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uKG11dGF0aW9ucykge1xyXG4gICAgICAgICAgICBtdXRhdGlvbnMuZm9yRWFjaChmdW5jdGlvbihtdXRhdGlvblJlY29yZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5ld1ZhbHVlID0gdG9vbGJhci5nZXRUb29sYmFySWNvbkluZm8odG9vbGJhci5fY3VycmVudEljb25EcmFnZ2VkT3Zlci5uYW1lKS50b29sdGlwO1xyXG4gICAgICAgICAgICAgICAgdmFyIG9sZFZhbHVlID0gdGFyZ2V0LmlubmVySFRNTDtcclxuICAgICAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPSBvbGRWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5pbm5lckhUTUwgPSBuZXdWYWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7ICAgIFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBvYnNlcnZlci5vYnNlcnZlKHRhcmdldCwgeyBhdHRyaWJ1dGVzIDogdHJ1ZSwgY2hpbGRMaXN0OiB0cnVlLCBjaGFyYWN0ZXJEYXRhOnRydWUgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzYWJsZUR1bW15QnV0dG9uKCl7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlQnV0dG9uKCdlbXB0eScsIHRydWUsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzYWJsZSBpY29ucyBpbiB0b29sYmFyIHNvIHRoZXkgZG9uJ3QgYmVoYXZlIGFzIGJ1dHRvbnNcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc0dyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIGNvbnZlcnRCdG5zVG9JY29ucygpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3Rvb2xiYXJJY29uSW5mby5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmRpc2FibGVCdXR0b24odGhpcy5fdG9vbGJhckljb25JbmZvW2ldLm5hbWUsIHRydWUsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgaWNvbiBpbWFnZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW1hZ2VOYW1lXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdG9vbHRpcFxyXG4gICAgICogQG1lbWJlcm9mIFdhdGNoYWJsZXNHcmlkVG9vbGJhclxyXG4gICAgICovXHJcbiAgICB1cGRhdGVJY29ucyhuYW1lOiBzdHJpbmcsIGltYWdlTmFtZTogc3RyaW5nLCB0b29sdGlwOiBzdHJpbmcpIHtcclxuICAgICAgICB2YXIgdG9vbGJhckljb246IEljb25JbmZvID0gdGhpcy5nZXRUb29sYmFySWNvbkluZm8obmFtZSk7XHJcbiAgICAgICAgaWYgKHRvb2xiYXJJY29uLmltYWdlTmFtZSAhPT0gaW1hZ2VOYW1lIHx8IHRvb2xiYXJJY29uLmlzRHJhd24gPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX2ltYWdlUHJvdmlkZXIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHZhciBpbWFnZSA9IHRoaXMuX2ltYWdlUHJvdmlkZXIuZ2V0SW1hZ2UoJy4uL2FwcC93aWRnZXRzL3dhdGNoYWJsZXNXaWRnZXQvc3R5bGUvaW1hZ2VzL3Rvb2xiYXIvJyArIGltYWdlTmFtZSArICcuc3ZnJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUJ1dHRvbkljb24obmFtZSwgaW1hZ2UsIHRvb2xiYXJJY29uKTtcclxuICAgICAgICAgICAgICAgIC8vdXBkYXRlIHRvb2xiYXJJY29uXHJcbiAgICAgICAgICAgICAgICB0b29sYmFySWNvbi5pbWFnZU5hbWUgPSBpbWFnZU5hbWU7XHJcbiAgICAgICAgICAgICAgICB0b29sYmFySWNvbi50b29sdGlwID0gdG9vbHRpcDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBpY29uIHdoZXJlIHdlIGFyZSBkcmFnZ2luZyB0aGUgbW91c2Ugb3ZlclxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBXYXRjaGFibGVzR3JpZFRvb2xiYXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRNb3VzZU92ZXJJY29uKGFyZ3MpIHtcclxuICAgICAgICB2YXIgbmFtZSA9ICgnIycgKyBhcmdzLmN1cnJlbnRUYXJnZXQuaWQpLnNwbGl0KHRoaXMuX3BhcmVudERpdklkICsgJ18nKVsxXTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaTwgdGhpcy5fd2F0Y2hhYmxlU3RhdGVQYXJhbWV0ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl90b29sYmFySWNvbkluZm9baV0ubmFtZSA9PSBuYW1lKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRJY29uRHJhZ2dlZE92ZXIgPSB0aGlzLl90b29sYmFySWNvbkluZm9baV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgSWNvbiBpbmZvXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAgICAgKiBAcmV0dXJucyB7SWNvbkluZm99XHJcbiAgICAgKiBAbWVtYmVyb2YgV2F0Y2hhYmxlc0dyaWRUb29sYmFyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VG9vbGJhckljb25JbmZvKG5hbWU6IHN0cmluZyk6IEljb25JbmZve1xyXG4gICAgICAgIHZhciBpY29uSW5mbztcclxuICAgICAgICBuYW1lID0gbmFtZS5yZXBsYWNlKC9cXHMvZywnXycpO1xyXG4gICAgICAgIHRoaXMuX3Rvb2xiYXJJY29uSW5mby5mb3JFYWNoKChpbmZvKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpbmZvLm5hbWUgPT0gbmFtZSkge1xyXG4gICAgICAgICAgICAgICAgaWNvbkluZm8gPSBpbmZvO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGljb25JbmZvO1xyXG4gICAgfVxyXG5cclxuICAgIGhpZGVJY29uKGlkOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmhpZGVCdXR0b24oaWQsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dJY29uKGlkOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmhpZGVCdXR0b24oaWQsIGZhbHNlKTtcclxuICAgIH1cclxufSJdfQ==