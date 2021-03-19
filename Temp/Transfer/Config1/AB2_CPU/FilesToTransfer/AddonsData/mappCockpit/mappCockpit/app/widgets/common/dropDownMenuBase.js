define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var dropDownMenuBase = /** @class */ (function () {
        function dropDownMenuBase(parentId, toolbarButtonId) {
            this._buttonsId = [];
            this.isOpened = false;
            this.parentId = parentId;
            this.toolbarButtonId = toolbarButtonId;
        }
        Object.defineProperty(dropDownMenuBase.prototype, "buttonsId", {
            get: function () {
                return this._buttonsId;
            },
            set: function (value) {
                this._buttonsId = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Creates dropdown menu
         *
         * @protected
         * @memberof SignalManagerExportDropDownMenu
         */
        dropDownMenuBase.prototype.createDropDownMenu = function (width, leftPos, buttonsId) {
            this.dropDownMenu = $('<div style="height:120px;width:' + width + ';background-color:transparent;position:absolute; top: 63px; left: ' + leftPos + '"></div>');
            for (var i = 0; i < buttonsId.length; i++) {
                this.dropDownMenu.append('<button id=' + buttonsId[i] + '/>');
            }
            this.appendDropDownMenu();
        };
        /**
         * Append the html element and add eventListeners
         *
         * @private
         * @memberof dropDownMenuBase
         */
        dropDownMenuBase.prototype.appendDropDownMenu = function () {
            $(this.parentId).append(this.dropDownMenu[0]);
            this.removeEventListenerForDropDownMenu = this.removeEventListenerForDropDownMenu.bind(this);
            document.addEventListener('mousedown', this.removeEventListenerForDropDownMenu);
        };
        /**
         * Remove event listener when 'mousedown' is triggered
         *
         * @private
         * @param {*} e
         * @memberof dropDownMenuBase
         */
        dropDownMenuBase.prototype.removeEventListenerForDropDownMenu = function (e) {
            if (!this._buttonsId.includes(e.target.id) &&
                !['#' + e.target.parentElement.id, '#' + e.target.id].includes(this.parentId + '_' + this.toolbarButtonId)) {
                this.hideDropDownMenu();
            }
        };
        /**
         * Hide the dropdown menu
         *
         * @memberof dropDownMenuBase
         */
        dropDownMenuBase.prototype.hideDropDownMenu = function () {
            document.removeEventListener('mousedown', this.removeEventListenerForDropDownMenu);
            this.dropDownMenu.remove();
            this.isOpened = false;
        };
        return dropDownMenuBase;
    }());
    exports.dropDownMenuBase = dropDownMenuBase;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcERvd25NZW51QmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvd2lkZ2V0cy9jb21tb24vZHJvcERvd25NZW51QmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFBQTtRQVNJLDBCQUFZLFFBQWdCLEVBQUUsZUFBdUI7WUFOM0MsZUFBVSxHQUFrQixFQUFFLENBQUM7WUFHbEMsYUFBUSxHQUFZLEtBQUssQ0FBQztZQUk3QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztZQUN6QixJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztRQUMzQyxDQUFDO1FBRUQsc0JBQVcsdUNBQVM7aUJBQXBCO2dCQUNJLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUMzQixDQUFDO2lCQUVELFVBQXNCLEtBQUs7Z0JBQ3ZCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1lBQzVCLENBQUM7OztXQUpBO1FBTUQ7Ozs7O1dBS0c7UUFDTyw2Q0FBa0IsR0FBNUIsVUFBNkIsS0FBYSxFQUFFLE9BQWUsRUFBRSxTQUF3QjtZQUNqRixJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxpQ0FBaUMsR0FBRyxLQUFLLEdBQUcsb0VBQW9FLEdBQUcsT0FBTyxHQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQzlKLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN2QyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFBO2FBQ2hFO1lBQ0QsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDOUIsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0ssNkNBQWtCLEdBQTFCO1lBQ0ksQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxrQ0FBa0MsR0FBRyxJQUFJLENBQUMsa0NBQWtDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdGLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGtDQUFrQyxDQUFDLENBQUM7UUFDcEYsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNLLDZEQUFrQyxHQUExQyxVQUE0QyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztnQkFDdEMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRTtnQkFDNUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7YUFDM0I7UUFDTCxDQUFDO1FBRUQ7Ozs7V0FJRztRQUNJLDJDQUFnQixHQUF2QjtZQUNJLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGtDQUFrQyxDQUFDLENBQUM7WUFDbkYsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUMzQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUMxQixDQUFDO1FBQ0wsdUJBQUM7SUFBRCxDQUFDLEFBeEVELElBd0VDO0lBeEVZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBkcm9wRG93bk1lbnVCYXNle1xyXG4gICAgXHJcbiAgICBwcm90ZWN0ZWQgcGFyZW50SWQ6IHN0cmluZztcclxuICAgIHByb3RlY3RlZCBfYnV0dG9uc0lkOiBBcnJheTxzdHJpbmc+ID0gW107XHJcbiAgICBwcm90ZWN0ZWQgdG9vbGJhckJ1dHRvbklkOiBzdHJpbmc7XHJcblxyXG4gICAgcHVibGljIGlzT3BlbmVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcm90ZWN0ZWQgZHJvcERvd25NZW51ITogSlF1ZXJ5O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBhcmVudElkOiBzdHJpbmcsIHRvb2xiYXJCdXR0b25JZDogc3RyaW5nKXtcclxuICAgICAgICB0aGlzLnBhcmVudElkID0gcGFyZW50SWQ7XHJcbiAgICAgICAgdGhpcy50b29sYmFyQnV0dG9uSWQgPSB0b29sYmFyQnV0dG9uSWQ7IFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgYnV0dG9uc0lkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9idXR0b25zSWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBidXR0b25zSWQgKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5fYnV0dG9uc0lkID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGRyb3Bkb3duIG1lbnVcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckV4cG9ydERyb3BEb3duTWVudVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlRHJvcERvd25NZW51KHdpZHRoOiBzdHJpbmcsIGxlZnRQb3M6IHN0cmluZywgYnV0dG9uc0lkOiBBcnJheTxzdHJpbmc+KXtcclxuICAgICAgICB0aGlzLmRyb3BEb3duTWVudSA9ICQoJzxkaXYgc3R5bGU9XCJoZWlnaHQ6MTIwcHg7d2lkdGg6JyArIHdpZHRoICsgJztiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50O3Bvc2l0aW9uOmFic29sdXRlOyB0b3A6IDYzcHg7IGxlZnQ6ICcgKyBsZWZ0UG9zICsnXCI+PC9kaXY+Jyk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBidXR0b25zSWQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5kcm9wRG93bk1lbnUuYXBwZW5kKCc8YnV0dG9uIGlkPScgKyBidXR0b25zSWRbaV0gKyAnLz4nKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFwcGVuZERyb3BEb3duTWVudSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXBwZW5kIHRoZSBodG1sIGVsZW1lbnQgYW5kIGFkZCBldmVudExpc3RlbmVyc1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgZHJvcERvd25NZW51QmFzZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFwcGVuZERyb3BEb3duTWVudSgpIHtcclxuICAgICAgICAkKHRoaXMucGFyZW50SWQpLmFwcGVuZCh0aGlzLmRyb3BEb3duTWVudVswXSk7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyRm9yRHJvcERvd25NZW51ID0gdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyRm9yRHJvcERvd25NZW51LmJpbmQodGhpcyk7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyRm9yRHJvcERvd25NZW51KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZSBldmVudCBsaXN0ZW5lciB3aGVuICdtb3VzZWRvd24nIGlzIHRyaWdnZXJlZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IGVcclxuICAgICAqIEBtZW1iZXJvZiBkcm9wRG93bk1lbnVCYXNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVtb3ZlRXZlbnRMaXN0ZW5lckZvckRyb3BEb3duTWVudSAoZSkge1xyXG4gICAgICAgIGlmICghdGhpcy5fYnV0dG9uc0lkLmluY2x1ZGVzKGUudGFyZ2V0LmlkKSAmJiBcclxuICAgICAgICAgICAgIVsnIycgKyBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmlkLCAnIycgKyBlLnRhcmdldC5pZF0uaW5jbHVkZXModGhpcy5wYXJlbnRJZCArICdfJyArIHRoaXMudG9vbGJhckJ1dHRvbklkKSkge1xyXG4gICAgICAgICAgICB0aGlzLmhpZGVEcm9wRG93bk1lbnUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIaWRlIHRoZSBkcm9wZG93biBtZW51XHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIGRyb3BEb3duTWVudUJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGhpZGVEcm9wRG93bk1lbnUoKSB7XHJcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyRm9yRHJvcERvd25NZW51KTtcclxuICAgICAgICB0aGlzLmRyb3BEb3duTWVudS5yZW1vdmUoKTtcclxuICAgICAgICB0aGlzLmlzT3BlbmVkID0gZmFsc2U7XHJcbiAgICB9XHJcbn0iXX0=