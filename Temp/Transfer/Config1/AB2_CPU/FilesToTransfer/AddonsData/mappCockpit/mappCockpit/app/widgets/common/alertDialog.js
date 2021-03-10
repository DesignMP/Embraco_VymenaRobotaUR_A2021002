define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var messageBoxType;
    (function (messageBoxType) {
        messageBoxType[messageBoxType["CancelDelete"] = 0] = "CancelDelete";
        messageBoxType[messageBoxType["YesNo"] = 1] = "YesNo";
        messageBoxType[messageBoxType["Ok"] = 2] = "Ok";
    })(messageBoxType = exports.messageBoxType || (exports.messageBoxType = {}));
    var AlertDialog = /** @class */ (function () {
        function AlertDialog() {
            this._activeElement = document.activeElement;
        }
        /**
         * Creates a warning message box
         *
         * @param {string} header
         * @param {string} message
         * @param {messageBoxType} type
         * @param {(JQuery.Deferred<any, any, any> | undefined)} deferred
         * @returns
         * @memberof AlertDialog
         */
        AlertDialog.prototype.createMessageBox = function (header, message, type, deferred) {
            this._createMessageBox(header, message);
            this.createButtons(type, deferred);
            $(this._activeElement).blur();
            this.handleEvents();
        };
        AlertDialog.prototype._createMessageBox = function (header, message) {
            var ALERT_TITLE = header;
            var d = document;
            if (d.getElementById("modalContainer")) {
                return;
            }
            var mObj = d.getElementsByTagName("body")[0].appendChild(d.createElement("div"));
            mObj.id = "modalContainer";
            mObj.style.height = d.documentElement.scrollHeight + "px";
            var alertObj = mObj.appendChild(d.createElement("div"));
            alertObj.id = "alertBox";
            if (d.all /*&& !window.opera*/) {
                alertObj.style.top = document.documentElement.scrollTop + "px";
            }
            alertObj.style.left = (d.documentElement.scrollWidth - alertObj.offsetWidth) / 2 + "px";
            alertObj.style.visibility = "visible";
            alertObj.style.display = "block";
            var h1 = alertObj.appendChild(d.createElement("h1"));
            h1.appendChild(d.createTextNode(ALERT_TITLE));
            var img = alertObj.appendChild(d.createElement("img"));
            img.src = './widgets/common/style/images/messageBox/warning.svg';
            var container = alertObj.appendChild(d.createElement("div"));
            container.id = 'containerMsgBox';
            container.style.display = 'flow-root';
            var msg = container.appendChild(d.createElement("p"));
            msg.innerHTML = message;
        };
        /**
         * Creates buttons for the message box
         *
         * @private
         * @param {*} container
         * @param {*} type
         * @param {(JQuery.Deferred<any, any, any> | undefined)} deferred
         * @memberof AlertDialog
         */
        AlertDialog.prototype.createButtons = function (type, deferred) {
            var _this = this;
            var buttonsData = this.getButtonData(type);
            var container = document.getElementById('containerMsgBox');
            var btn1 = container.appendChild(document.createElement("div"));
            btn1.classList.add('msgButton', 'highlighted');
            btn1.style.left = '111px';
            btn1.appendChild(document.createTextNode('Ok'));
            btn1.onclick = function () {
                _this.removeMessageBox();
                if (deferred != undefined) {
                    deferred.resolve();
                }
                return false;
            };
            if (buttonsData.number == 2) {
                btn1.innerText = buttonsData.text[0];
                btn1.style.left = '56px';
                var btn2 = container.appendChild(document.createElement("div"));
                btn2.classList.add('msgButton', 'notMain');
                btn2.style.left = '166px';
                btn2.appendChild(document.createTextNode(buttonsData.text[1]));
                btn2.onclick = function () {
                    _this.removeMessageBox();
                    return false;
                };
            }
        };
        AlertDialog.prototype.keyActions = function (e) {
            if (e.keyCode == 13) { //key enter
                var btn = document.getElementsByClassName('highlighted')[0];
                $(btn).click();
            }
            else if (e.keyCode == 27) { //key escape
                this.removeMessageBox();
            }
            else if (e.keyCode == 37 || e.keyCode == 39) { //right left arrow keys
                //Currently just working for 1 or 2 buttons
                var buttons = document.getElementsByClassName('msgButton');
                if (buttons.length > 1) {
                    for (var i = 0; i < buttons.length; i++) {
                        if (buttons[i].classList.value.includes('highlighted')) {
                            buttons[i].classList.remove('highlighted');
                        }
                        else {
                            buttons[i].classList.add('highlighted');
                        }
                    }
                }
            }
        };
        /**
         * Gets button information according to the type of message box
         *
         * @private
         * @param {messageBoxType} type
         * @returns
         * @memberof AlertDialog
         */
        AlertDialog.prototype.getButtonData = function (type) {
            var btnData = {
                number: 1,
                text: new Array(),
            };
            switch (type) {
                case messageBoxType.CancelDelete: {
                    btnData.number = 2;
                    btnData.text[0] = 'Delete';
                    btnData.text[1] = 'Cancel';
                    return btnData;
                }
                case messageBoxType.YesNo: {
                    btnData.number = 2;
                    btnData.text[0] = 'Yes';
                    btnData.text[1] = 'No';
                    return btnData;
                }
                case messageBoxType.Ok: {
                    btnData.number = 1;
                    btnData.text[0] = 'Ok';
                    return btnData;
                }
            }
        };
        AlertDialog.prototype.handleEvents = function () {
            this.focusOut = this.focusOut.bind(this);
            this.keyActions = this.keyActions.bind(this);
            document.addEventListener('keydown', this.keyActions);
            this._activeElement.addEventListener('focusin', this.focusOut);
        };
        AlertDialog.prototype.focusOut = function () {
            $(document.activeElement).blur();
        };
        /**
         * Removes message box
         *
         * @private
         * @memberof AlertDialog
         */
        AlertDialog.prototype.removeMessageBox = function () {
            document.removeEventListener('keydown', this.keyActions);
            this._activeElement.removeEventListener('focusin', this.focusOut);
            $(this._activeElement).focus();
            document.getElementsByTagName("body")[0].removeChild(document.getElementById("modalContainer"));
        };
        return AlertDialog;
    }());
    exports.AlertDialog = AlertDialog;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnREaWFsb2cuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvY29tbW9uL2FsZXJ0RGlhbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUNBLElBQVksY0FJWDtJQUpELFdBQVksY0FBYztRQUN0QixtRUFBWSxDQUFBO1FBQ1oscURBQUssQ0FBQTtRQUNMLCtDQUFFLENBQUE7SUFDTixDQUFDLEVBSlcsY0FBYyxHQUFkLHNCQUFjLEtBQWQsc0JBQWMsUUFJekI7SUFFRDtRQUlJO1lBRlEsbUJBQWMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDO1FBR2hELENBQUM7UUFFRDs7Ozs7Ozs7O1dBU0c7UUFDSCxzQ0FBZ0IsR0FBaEIsVUFBaUIsTUFBYyxFQUFFLE9BQWUsRUFBRSxJQUFvQixFQUFFLFFBQW9EO1lBQ3hILElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDbkMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFlLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUUvQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEIsQ0FBQztRQUVPLHVDQUFpQixHQUF6QixVQUEwQixNQUFjLEVBQUUsT0FBZTtZQUNyRCxJQUFJLFdBQVcsR0FBRyxNQUFNLENBQUM7WUFDekIsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDO1lBQ2pCLElBQUcsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFDO2dCQUNqQyxPQUFPO2FBQ1g7WUFDRCxJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZ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LENBQUMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBRSxDQUFDLENBQUM7UUFDckcsQ0FBQztRQUNMLGtCQUFDO0lBQUQsQ0FBQyxBQW5MRCxJQW1MQztJQW5MWSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5leHBvcnQgZW51bSBtZXNzYWdlQm94VHlwZSB7XHJcbiAgICBDYW5jZWxEZWxldGUsXHJcbiAgICBZZXNObyxcclxuICAgIE9rXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBBbGVydERpYWxvZ3tcclxuICAgICAgICBcclxuICAgIHByaXZhdGUgX2FjdGl2ZUVsZW1lbnQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgd2FybmluZyBtZXNzYWdlIGJveFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBoZWFkZXJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlXHJcbiAgICAgKiBAcGFyYW0ge21lc3NhZ2VCb3hUeXBlfSB0eXBlXHJcbiAgICAgKiBAcGFyYW0geyhKUXVlcnkuRGVmZXJyZWQ8YW55LCBhbnksIGFueT4gfCB1bmRlZmluZWQpfSBkZWZlcnJlZFxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBBbGVydERpYWxvZ1xyXG4gICAgICovXHJcbiAgICBjcmVhdGVNZXNzYWdlQm94KGhlYWRlcjogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcsIHR5cGU6IG1lc3NhZ2VCb3hUeXBlLCBkZWZlcnJlZDogSlF1ZXJ5LkRlZmVycmVkPGFueSwgYW55LCBhbnk+IHwgdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlTWVzc2FnZUJveChoZWFkZXIsIG1lc3NhZ2UpO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlQnV0dG9ucyh0eXBlLCBkZWZlcnJlZCk7XHJcbiAgICAgICAgJCh0aGlzLl9hY3RpdmVFbGVtZW50ISkuYmx1cigpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuaGFuZGxlRXZlbnRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfY3JlYXRlTWVzc2FnZUJveChoZWFkZXI6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IEFMRVJUX1RJVExFID0gaGVhZGVyO1xyXG4gICAgICAgIGxldCBkID0gZG9jdW1lbnQ7XHJcbiAgICAgICAgaWYoZC5nZXRFbGVtZW50QnlJZChcIm1vZGFsQ29udGFpbmVyXCIpKXtcclxuICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG1PYmogPSBkLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiYm9keVwiKVswXS5hcHBlbmRDaGlsZChkLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xyXG4gICAgICAgIG1PYmouaWQgPSBcIm1vZGFsQ29udGFpbmVyXCI7XHJcbiAgICAgICAgbU9iai5zdHlsZS5oZWlnaHQgPSBkLmRvY3VtZW50RWxlbWVudC5zY3JvbGxIZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGFsZXJ0T2JqID0gbU9iai5hcHBlbmRDaGlsZChkLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xyXG4gICAgICAgIGFsZXJ0T2JqLmlkID0gXCJhbGVydEJveFwiO1xyXG4gICAgICAgIGlmKGQuYWxsIC8qJiYgIXdpbmRvdy5vcGVyYSovKXtcclxuICAgICAgICAgICAgYWxlcnRPYmouc3R5bGUudG9wID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCArIFwicHhcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgYWxlcnRPYmouc3R5bGUubGVmdCA9IChkLmRvY3VtZW50RWxlbWVudC5zY3JvbGxXaWR0aCAtIGFsZXJ0T2JqLm9mZnNldFdpZHRoKS8yICsgXCJweFwiO1xyXG4gICAgICAgIGFsZXJ0T2JqLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcclxuICAgICAgICBhbGVydE9iai5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG5cclxuICAgICAgICBsZXQgaDEgPSBhbGVydE9iai5hcHBlbmRDaGlsZChkLmNyZWF0ZUVsZW1lbnQoXCJoMVwiKSk7XHJcbiAgICAgICAgaDEuYXBwZW5kQ2hpbGQoZC5jcmVhdGVUZXh0Tm9kZShBTEVSVF9USVRMRSkpO1xyXG5cclxuICAgICAgICBsZXQgaW1nID0gYWxlcnRPYmouYXBwZW5kQ2hpbGQoZC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpKTtcclxuICAgICAgICBpbWcuc3JjID0gJy4vd2lkZ2V0cy9jb21tb24vc3R5bGUvaW1hZ2VzL21lc3NhZ2VCb3gvd2FybmluZy5zdmcnO1xyXG5cclxuICAgICAgICBsZXQgY29udGFpbmVyID0gYWxlcnRPYmouYXBwZW5kQ2hpbGQoZC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcclxuICAgICAgICBjb250YWluZXIuaWQgPSAnY29udGFpbmVyTXNnQm94JztcclxuICAgICAgICBjb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdmbG93LXJvb3QnO1xyXG5cclxuICAgICAgICBsZXQgbXNnID0gY29udGFpbmVyLmFwcGVuZENoaWxkKGQuY3JlYXRlRWxlbWVudChcInBcIikpO1xyXG4gICAgICAgIG1zZy5pbm5lckhUTUwgPSBtZXNzYWdlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBidXR0b25zIGZvciB0aGUgbWVzc2FnZSBib3hcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsqfSBjb250YWluZXJcclxuICAgICAqIEBwYXJhbSB7Kn0gdHlwZVxyXG4gICAgICogQHBhcmFtIHsoSlF1ZXJ5LkRlZmVycmVkPGFueSwgYW55LCBhbnk+IHwgdW5kZWZpbmVkKX0gZGVmZXJyZWRcclxuICAgICAqIEBtZW1iZXJvZiBBbGVydERpYWxvZ1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZUJ1dHRvbnModHlwZSwgZGVmZXJyZWQ6IEpRdWVyeS5EZWZlcnJlZDxhbnksIGFueSwgYW55PiB8IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGxldCBidXR0b25zRGF0YSA9IHRoaXMuZ2V0QnV0dG9uRGF0YSh0eXBlKTtcclxuICAgICAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lck1zZ0JveCcpO1xyXG4gICAgICAgIGxldCBidG4xID0gY29udGFpbmVyIS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcclxuXHJcbiAgICAgICAgYnRuMS5jbGFzc0xpc3QuYWRkKCdtc2dCdXR0b24nLCAnaGlnaGxpZ2h0ZWQnKVxyXG4gICAgICAgIGJ0bjEuc3R5bGUubGVmdCA9ICcxMTFweCc7XHJcbiAgICAgICAgYnRuMS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnT2snKSk7XHJcbiAgICAgICAgYnRuMS5vbmNsaWNrID0gKCkgPT4geyBcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVNZXNzYWdlQm94KCk7XHJcbiAgICAgICAgICAgIGlmIChkZWZlcnJlZCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7IFxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZiAoYnV0dG9uc0RhdGEubnVtYmVyID09IDIpIHtcclxuICAgICAgICAgICAgYnRuMS5pbm5lclRleHQgPSBidXR0b25zRGF0YS50ZXh0WzBdO1xyXG4gICAgICAgICAgICBidG4xLnN0eWxlLmxlZnQgPSAnNTZweCc7XHJcbiAgICAgICAgICAgIGxldCBidG4yID0gY29udGFpbmVyIS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcclxuICAgICAgICAgICAgYnRuMi5jbGFzc0xpc3QuYWRkKCdtc2dCdXR0b24nLCAnbm90TWFpbicpO1xyXG4gICAgICAgICAgICBidG4yLnN0eWxlLmxlZnQgPSAnMTY2cHgnO1xyXG4gICAgICAgICAgICBidG4yLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGJ1dHRvbnNEYXRhLnRleHRbMV0pKTtcclxuICAgICAgICAgICAgYnRuMi5vbmNsaWNrID0gKCkgPT4geyBcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlTWVzc2FnZUJveCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGtleUFjdGlvbnMoZTogS2V5Ym9hcmRFdmVudCkge1xyXG4gICAgICAgIGlmIChlLmtleUNvZGUgPT0gMTMpIHsgLy9rZXkgZW50ZXJcclxuICAgICAgICAgICAgbGV0IGJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2hpZ2hsaWdodGVkJylbMF07XHJcbiAgICAgICAgICAgICQoYnRuKS5jbGljaygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChlLmtleUNvZGUgPT0gMjcpIHsgLy9rZXkgZXNjYXBlXHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlTWVzc2FnZUJveCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChlLmtleUNvZGUgPT0gMzcgfHwgZS5rZXlDb2RlID09IDM5KSB7IC8vcmlnaHQgbGVmdCBhcnJvdyBrZXlzXHJcbiAgICAgICAgICAgIC8vQ3VycmVudGx5IGp1c3Qgd29ya2luZyBmb3IgMSBvciAyIGJ1dHRvbnNcclxuICAgICAgICAgICAgbGV0IGJ1dHRvbnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtc2dCdXR0b24nKTtcclxuICAgICAgICAgICAgaWYgKGJ1dHRvbnMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBidXR0b25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJ1dHRvbnNbaV0uY2xhc3NMaXN0LnZhbHVlLmluY2x1ZGVzKCdoaWdobGlnaHRlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbnNbaV0uY2xhc3NMaXN0LnJlbW92ZSgnaGlnaGxpZ2h0ZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbnNbaV0uY2xhc3NMaXN0LmFkZCgnaGlnaGxpZ2h0ZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgYnV0dG9uIGluZm9ybWF0aW9uIGFjY29yZGluZyB0byB0aGUgdHlwZSBvZiBtZXNzYWdlIGJveFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge21lc3NhZ2VCb3hUeXBlfSB0eXBlXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIEFsZXJ0RGlhbG9nXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0QnV0dG9uRGF0YSh0eXBlOiBtZXNzYWdlQm94VHlwZSkge1xyXG4gICAgICAgIGxldCBidG5EYXRhID0ge1xyXG4gICAgICAgICAgICBudW1iZXI6IDEsXHJcbiAgICAgICAgICAgIHRleHQ6IG5ldyBBcnJheTxzdHJpbmc+KCksXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIG1lc3NhZ2VCb3hUeXBlLkNhbmNlbERlbGV0ZToge1xyXG4gICAgICAgICAgICAgICAgYnRuRGF0YS5udW1iZXIgPSAyO1xyXG4gICAgICAgICAgICAgICAgYnRuRGF0YS50ZXh0WzBdID0gJ0RlbGV0ZSc7XHJcbiAgICAgICAgICAgICAgICBidG5EYXRhLnRleHRbMV0gPSAnQ2FuY2VsJztcclxuICAgICAgICAgICAgICAgIHJldHVybiBidG5EYXRhO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgbWVzc2FnZUJveFR5cGUuWWVzTm86IHtcclxuICAgICAgICAgICAgICAgIGJ0bkRhdGEubnVtYmVyID0gMjtcclxuICAgICAgICAgICAgICAgIGJ0bkRhdGEudGV4dFswXSA9ICdZZXMnO1xyXG4gICAgICAgICAgICAgICAgYnRuRGF0YS50ZXh0WzFdID0gJ05vJztcclxuICAgICAgICAgICAgICAgIHJldHVybiBidG5EYXRhOyBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIG1lc3NhZ2VCb3hUeXBlLk9rOiB7XHJcbiAgICAgICAgICAgICAgICBidG5EYXRhLm51bWJlciA9IDE7XHJcbiAgICAgICAgICAgICAgICBidG5EYXRhLnRleHRbMF0gPSAnT2snO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJ0bkRhdGE7IFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlRXZlbnRzKCkge1xyXG4gICAgICAgIHRoaXMuZm9jdXNPdXQgPSB0aGlzLmZvY3VzT3V0LmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5rZXlBY3Rpb25zID0gdGhpcy5rZXlBY3Rpb25zLmJpbmQodGhpcyk7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMua2V5QWN0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5fYWN0aXZlRWxlbWVudCEuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNpbicsIHRoaXMuZm9jdXNPdXQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZm9jdXNPdXQoKXtcclxuICAgICAgICAkKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQhKS5ibHVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIG1lc3NhZ2UgYm94XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBBbGVydERpYWxvZ1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlbW92ZU1lc3NhZ2VCb3goKSB7XHJcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMua2V5QWN0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5fYWN0aXZlRWxlbWVudCEucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXNpbicsIHRoaXMuZm9jdXNPdXQpO1xyXG4gICAgICAgICQodGhpcy5fYWN0aXZlRWxlbWVudCEpLmZvY3VzKCk7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJib2R5XCIpWzBdLnJlbW92ZUNoaWxkKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9kYWxDb250YWluZXJcIikhKTtcclxuICAgIH1cclxufSJdfQ==