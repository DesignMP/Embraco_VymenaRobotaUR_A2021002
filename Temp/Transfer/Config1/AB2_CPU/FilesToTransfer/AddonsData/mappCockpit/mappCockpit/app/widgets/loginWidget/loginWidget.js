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
define(["require", "exports", "../common/widgetBase"], function (require, exports, widgetBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * implements the login widget
     *
     * @class LoginWidget
     * @extends {WidgetBase}
     */
    var LoginWidget = /** @class */ (function (_super) {
        __extends(LoginWidget, _super);
        function LoginWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._isInitialized = false;
            _this._actualUsername = "Anonymous";
            return _this;
        }
        /* initialize the widget
         *
         * @param {string} layoutContainerId
         * @memberof LoginWidget
         */
        LoginWidget.prototype.initialize = function (layoutContainerId) {
            if (this._isInitialized == false) {
                _super.prototype.initialize.call(this, layoutContainerId);
                this._isInitialized = true;
            }
        };
        /**
         * Creates the widget content and eventually subwidgets
         *
         * @memberof LoginWidget
         */
        LoginWidget.prototype.createWidgets = function () {
            // Add class to main div
            $(this.cssParentContentId)[0].classList.add("loginWidgetMain");
            // initialize the needed div ids
            this.initializeIds();
            // Add inner div with background
            $(this.cssParentContentId).append("<div id='" + this._loginWidgetBackgroundId + "'></div>");
            // Add class to inner div with background
            $("#" + this._loginWidgetBackgroundId)[0].classList.add("loginWidgetMainBackground");
            // Show the login form within the background div
            this.showLogin();
        };
        Object.defineProperty(LoginWidget.prototype, "loginInterface", {
            /**
             * Sets and defines the interface to the login interface
             *
             * @memberof LoginWidget
             */
            set: function (loginInterface) {
                this._loginInterface = loginInterface;
            },
            enumerable: true,
            configurable: true
        });
        /** resizes the login widget
         *
         * @param {number} width
         * @param {number} height
         * @memberof LoginWidget
         */
        LoginWidget.prototype.resize = function (width, height) {
            // Resize the main div
            var parentElement = $(this.cssParentContentId)[0];
            parentElement.style.width = width.toString() + "px";
            parentElement.style.height = height.toString() + "px";
            // Resize the inner div with background
            var parentElementBackground = $("#" + this._loginWidgetBackgroundId)[0];
            parentElementBackground.style.width = width.toString() + "px";
            parentElementBackground.style.height = height.toString() + "px";
        };
        LoginWidget.prototype.initializeIds = function () {
            this._loginWidgetBackgroundId = this.parentContentId + "_background";
            this._loginWidgetId = this.parentContentId + "_loginWidget";
            this._loginWidgetHeaderId = this._loginWidgetId + "_header";
            this._loginWidgetUsernameId = this._loginWidgetId + "_username";
            this._loginWidgetPasswordId = this._loginWidgetId + "_password";
            this._loginWidgetLoginLogoutButtonId = this._loginWidgetId + "_loginLogoutButton";
            this._loginWidgetMessageId = this._loginWidgetId + "_loginMessage";
        };
        /**
         * Loads the styles for the login widget
         *
         * @memberof LoginWidget
         */
        LoginWidget.prototype.loadStyles = function () {
            _super.prototype.addStyle.call(this, "widgets/loginWidget/style/css/loginWidgetStyle.css");
        };
        LoginWidget.prototype.showLogin = function () {
            this.createLoginLogout(true);
        };
        LoginWidget.prototype.showLogout = function () {
            this.createLoginLogout(false);
        };
        LoginWidget.prototype.createLoginLogout = function (login) {
            // Reset html data
            $("#" + this._loginWidgetBackgroundId)[0].innerHTML = "";
            var data = "";
            if (login == true) {
                data = this.getMainHtmlData("Login");
                data += this.getLoginHtmlData();
            }
            else {
                data = this.getMainHtmlData("Logout");
                data += this.getLogoutHtmlData();
            }
            data += this.getMessageContainerData();
            $("#" + this._loginWidgetBackgroundId).append(data);
            this.createLoginLogoutButton(this._loginWidgetLoginLogoutButtonId, login);
        };
        LoginWidget.prototype.getMainHtmlData = function (headerText) {
            return "\n            <div style='z-index: -1; position: absolute; top: -50px; width: var(--tabWidgetFlexTabAreaWidth); height: 50px; border-bottom: solid 3px var(--main-border-color); background-color: var(--main-black)'> </div>\n            <div class='loginMiddleContainerBorder' id='" + this._loginWidgetId + "'>\n            <div class='loginHeader' id='" + this._loginWidgetHeaderId + "'>" + headerText + "</div>";
        };
        LoginWidget.prototype.getLoginHtmlData = function () {
            return "\n            <div class='loginInputFieldPosition'>Username:<br><input type=\"text\" id=\"" + this._loginWidgetUsernameId + "\" name=\"txtName\" class=\"loginInputText\" required /><br /></div>\n            <div class='loginInputFieldPosition'>Password:<br><input type=\"password\" id=\"" + this._loginWidgetPasswordId + "\" name=\"txtPassword\" class=\"loginInputText\" required /></div>\n            <div class='loginButtonPosition' id='" + this._loginWidgetLoginLogoutButtonId + "'></div>";
        };
        LoginWidget.prototype.getLogoutHtmlData = function () {
            return "\n            <div class='loginInputFieldPosition'>Username:<br><input type=\"text\" id=\"" + this._loginWidgetUsernameId + "\" value=\"" + this._actualUsername + "\"name=\"txtName\" class=\"loginInputText loginInputTextReadOnly\" readonly /><br /></div>\n            <div class='logoutButtonPosition' id='" + this._loginWidgetLoginLogoutButtonId + "'></div>";
        };
        LoginWidget.prototype.getMessageContainerData = function () {
            return "<div class='loginMessagePosition' id='" + this._loginWidgetMessageId + "'></div></div>";
        };
        LoginWidget.prototype.createLoginLogoutButton = function (id, login) {
            var _this = this;
            var buttonText = "Login";
            if (login == false) {
                buttonText = "Logout";
            }
            $("#" + id).ejButton({
                text: buttonText,
                click: function (clickArgs) {
                    if (login == true) {
                        _this.loginClick();
                    }
                    else {
                        _this.logoutClick();
                    }
                },
                width: "120px",
                height: "20px",
            });
        };
        LoginWidget.prototype.loginClick = function () {
            var _this = this;
            var usernameElement = $("#" + this._loginWidgetUsernameId);
            var passwordElement = $("#" + this._loginWidgetPasswordId);
            var username = usernameElement[0].value;
            var password = passwordElement[0].value;
            var userInfo = { username: username, password: password };
            this._loginInterface.commandChangeUser.execute(userInfo, function (userRoles) {
                _this._actualUsername = username;
                $("#" + _this._loginWidgetMessageId)[0].innerHTML = "User: '" + username + "' logged in!";
                _this.showLogout();
                console.log("%o Logged in with roles: %o", userInfo.username, userRoles);
            }, function (error) {
                $("#" + _this._loginWidgetMessageId)[0].innerHTML = "<font color='red'>Login failed!</font>";
                console.log("Could not log in: %o %o", userInfo.username, error);
            });
        };
        LoginWidget.prototype.logoutClick = function () {
            var _this = this;
            var usernameElement = $("#" + this._loginWidgetUsernameId);
            var username = usernameElement[0].value;
            var userInfo = { username: "Anonymous", password: "" };
            this._loginInterface.commandChangeUser.execute(userInfo, function (userRoles) {
                _this._actualUsername = "Anonymous";
                $("#" + _this._loginWidgetMessageId)[0].innerHTML = "User: '" + username + "' logged out!";
                _this.showLogin();
                console.log("%o Logged in with roles: %o", userInfo.username, userRoles);
            }, function (error) {
                $("#" + _this._loginWidgetMessageId)[0].innerHTML = "<font color='red'>Logout failed!</font>";
                console.log("Could not log in: %o %o", userInfo.username, error);
            });
        };
        return LoginWidget;
    }(widgetBase_1.WidgetBase));
    exports.LoginWidget = LoginWidget;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW5XaWRnZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvbG9naW5XaWRnZXQvbG9naW5XaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUdBOzs7OztPQUtHO0lBQ0g7UUFBMEIsK0JBQVU7UUFBcEM7WUFBQSxxRUFnTkM7WUF0TVcsb0JBQWMsR0FBRyxLQUFLLENBQUM7WUFJdkIscUJBQWUsR0FBRyxXQUFXLENBQUM7O1FBa00xQyxDQUFDO1FBaE1HOzs7O1dBSUc7UUFDSCxnQ0FBVSxHQUFWLFVBQVcsaUJBQXlCO1lBQ2hDLElBQUcsSUFBSSxDQUFDLGNBQWMsSUFBSSxLQUFLLEVBQUM7Z0JBQzVCLGlCQUFNLFVBQVUsWUFBQyxpQkFBaUIsQ0FBQyxDQUFDO2dCQUNwQyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQzthQUM5QjtRQUNMLENBQUM7UUFFRDs7OztXQUlHO1FBQ0gsbUNBQWEsR0FBYjtZQUVJLHdCQUF3QjtZQUN4QixDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBRS9ELGdDQUFnQztZQUNoQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFFckIsZ0NBQWdDO1lBQ2hDLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxVQUFVLENBQUMsQ0FBQztZQUU1Rix5Q0FBeUM7WUFDekMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDLENBQUM7WUFFckYsZ0RBQWdEO1lBQ2hELElBQUksQ0FBQyxTQUFT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QUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUNMLGtCQUFDO0lBQUQsQ0FBQyxBQWhORCxDQUEwQix1QkFBVSxHQWdObkM7SUFFUSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFdpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL3dpZGdldEJhc2VcIjtcclxuaW1wb3J0IHsgSUxvZ2luV2lkZ2V0IH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9sb2dpbldpZGdldEludGVyZmFjZVwiO1xyXG5cclxuLyoqXHJcbiAqIGltcGxlbWVudHMgdGhlIGxvZ2luIHdpZGdldFxyXG4gKlxyXG4gKiBAY2xhc3MgTG9naW5XaWRnZXRcclxuICogQGV4dGVuZHMge1dpZGdldEJhc2V9XHJcbiAqL1xyXG5jbGFzcyBMb2dpbldpZGdldCBleHRlbmRzIFdpZGdldEJhc2UgaW1wbGVtZW50cyBJTG9naW5XaWRnZXQge1xyXG5cclxuICAgIHByaXZhdGUgX2xvZ2luV2lkZ2V0QmFja2dyb3VuZElkO1xyXG4gICAgcHJpdmF0ZSBfbG9naW5XaWRnZXRJZDtcclxuICAgIHByaXZhdGUgX2xvZ2luV2lkZ2V0SGVhZGVySWQ7XHJcbiAgICBwcml2YXRlIF9sb2dpbldpZGdldFVzZXJuYW1lSWQ7XHJcbiAgICBwcml2YXRlIF9sb2dpbldpZGdldFBhc3N3b3JkSWQ7XHJcbiAgICBwcml2YXRlIF9sb2dpbldpZGdldExvZ2luTG9nb3V0QnV0dG9uSWQ7XHJcbiAgICBwcml2YXRlIF9sb2dpbldpZGdldE1lc3NhZ2VJZDtcclxuXHJcbiAgICBwcml2YXRlIF9pc0luaXRpYWxpemVkID0gZmFsc2U7XHJcblxyXG4gICAgcHJpdmF0ZSBfbG9naW5JbnRlcmZhY2U7XHJcblxyXG4gICAgcHJpdmF0ZSBfYWN0dWFsVXNlcm5hbWUgPSBcIkFub255bW91c1wiO1xyXG5cclxuICAgIC8qIGluaXRpYWxpemUgdGhlIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYXlvdXRDb250YWluZXJJZFxyXG4gICAgICogQG1lbWJlcm9mIExvZ2luV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQ6IHN0cmluZykge1xyXG4gICAgICAgIGlmKHRoaXMuX2lzSW5pdGlhbGl6ZWQgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICBzdXBlci5pbml0aWFsaXplKGxheW91dENvbnRhaW5lcklkKTtcclxuICAgICAgICAgICAgdGhpcy5faXNJbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgd2lkZ2V0IGNvbnRlbnQgYW5kIGV2ZW50dWFsbHkgc3Vid2lkZ2V0c1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBMb2dpbldpZGdldFxyXG4gICAgICovXHJcbiAgICBjcmVhdGVXaWRnZXRzKCkge1xyXG5cclxuICAgICAgICAvLyBBZGQgY2xhc3MgdG8gbWFpbiBkaXZcclxuICAgICAgICAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKVswXS5jbGFzc0xpc3QuYWRkKFwibG9naW5XaWRnZXRNYWluXCIpO1xyXG5cclxuICAgICAgICAvLyBpbml0aWFsaXplIHRoZSBuZWVkZWQgZGl2IGlkc1xyXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZUlkcygpO1xyXG5cclxuICAgICAgICAvLyBBZGQgaW5uZXIgZGl2IHdpdGggYmFja2dyb3VuZFxyXG4gICAgICAgICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpLmFwcGVuZChcIjxkaXYgaWQ9J1wiICsgdGhpcy5fbG9naW5XaWRnZXRCYWNrZ3JvdW5kSWQgKyBcIic+PC9kaXY+XCIpO1xyXG5cclxuICAgICAgICAvLyBBZGQgY2xhc3MgdG8gaW5uZXIgZGl2IHdpdGggYmFja2dyb3VuZFxyXG4gICAgICAgICQoXCIjXCIgKyB0aGlzLl9sb2dpbldpZGdldEJhY2tncm91bmRJZClbMF0uY2xhc3NMaXN0LmFkZChcImxvZ2luV2lkZ2V0TWFpbkJhY2tncm91bmRcIik7XHJcblxyXG4gICAgICAgIC8vIFNob3cgdGhlIGxvZ2luIGZvcm0gd2l0aGluIHRoZSBiYWNrZ3JvdW5kIGRpdlxyXG4gICAgICAgIHRoaXMuc2hvd0xvZ2luKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIGFuZCBkZWZpbmVzIHRoZSBpbnRlcmZhY2UgdG8gdGhlIGxvZ2luIGludGVyZmFjZVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBMb2dpbldpZGdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IGxvZ2luSW50ZXJmYWNlKGxvZ2luSW50ZXJmYWNlKSB7XHJcbiAgICAgICAgdGhpcy5fbG9naW5JbnRlcmZhY2UgPSBsb2dpbkludGVyZmFjZTtcclxuICAgIH1cclxuICAgICBcclxuICAgIC8qKiByZXNpemVzIHRoZSBsb2dpbiB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gd2lkdGhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcclxuICAgICAqIEBtZW1iZXJvZiBMb2dpbldpZGdldFxyXG4gICAgICovXHJcbiAgICByZXNpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpe1xyXG5cclxuICAgICAgICAvLyBSZXNpemUgdGhlIG1haW4gZGl2XHJcbiAgICAgICAgbGV0IHBhcmVudEVsZW1lbnQgPSAkKHRoaXMuY3NzUGFyZW50Q29udGVudElkKVswXTtcclxuICAgICAgICBwYXJlbnRFbGVtZW50LnN0eWxlLndpZHRoID0gd2lkdGgudG9TdHJpbmcoKSArIFwicHhcIjtcclxuICAgICAgICBwYXJlbnRFbGVtZW50LnN0eWxlLmhlaWdodCA9IGhlaWdodC50b1N0cmluZygpICsgXCJweFwiO1xyXG5cclxuICAgICAgICAvLyBSZXNpemUgdGhlIGlubmVyIGRpdiB3aXRoIGJhY2tncm91bmRcclxuICAgICAgICBsZXQgcGFyZW50RWxlbWVudEJhY2tncm91bmQgPSAkKFwiI1wiICsgdGhpcy5fbG9naW5XaWRnZXRCYWNrZ3JvdW5kSWQpWzBdO1xyXG4gICAgICAgIHBhcmVudEVsZW1lbnRCYWNrZ3JvdW5kLnN0eWxlLndpZHRoID0gd2lkdGgudG9TdHJpbmcoKSArIFwicHhcIjtcclxuICAgICAgICBwYXJlbnRFbGVtZW50QmFja2dyb3VuZC5zdHlsZS5oZWlnaHQgPSBoZWlnaHQudG9TdHJpbmcoKSArIFwicHhcIjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRpYWxpemVJZHMoKXtcclxuICAgICAgICB0aGlzLl9sb2dpbldpZGdldEJhY2tncm91bmRJZCA9IHRoaXMucGFyZW50Q29udGVudElkICsgXCJfYmFja2dyb3VuZFwiO1xyXG4gICAgICAgIHRoaXMuX2xvZ2luV2lkZ2V0SWQgPSB0aGlzLnBhcmVudENvbnRlbnRJZCArIFwiX2xvZ2luV2lkZ2V0XCI7XHJcbiAgICAgICAgdGhpcy5fbG9naW5XaWRnZXRIZWFkZXJJZCA9IHRoaXMuX2xvZ2luV2lkZ2V0SWQgKyBcIl9oZWFkZXJcIjtcclxuICAgICAgICB0aGlzLl9sb2dpbldpZGdldFVzZXJuYW1lSWQgPSB0aGlzLl9sb2dpbldpZGdldElkICsgXCJfdXNlcm5hbWVcIjtcclxuICAgICAgICB0aGlzLl9sb2dpbldpZGdldFBhc3N3b3JkSWQgPSB0aGlzLl9sb2dpbldpZGdldElkICsgXCJfcGFzc3dvcmRcIjtcclxuICAgICAgICB0aGlzLl9sb2dpbldpZGdldExvZ2luTG9nb3V0QnV0dG9uSWQgPSB0aGlzLl9sb2dpbldpZGdldElkICsgXCJfbG9naW5Mb2dvdXRCdXR0b25cIjtcclxuICAgICAgICB0aGlzLl9sb2dpbldpZGdldE1lc3NhZ2VJZCA9IHRoaXMuX2xvZ2luV2lkZ2V0SWQgKyBcIl9sb2dpbk1lc3NhZ2VcIjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWRzIHRoZSBzdHlsZXMgZm9yIHRoZSBsb2dpbiB3aWRnZXRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTG9naW5XaWRnZXRcclxuICAgICAqL1xyXG4gICAgbG9hZFN0eWxlcygpe1xyXG4gICAgICAgIHN1cGVyLmFkZFN0eWxlKFwid2lkZ2V0cy9sb2dpbldpZGdldC9zdHlsZS9jc3MvbG9naW5XaWRnZXRTdHlsZS5jc3NcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzaG93TG9naW4oKXtcclxuICAgICAgICB0aGlzLmNyZWF0ZUxvZ2luTG9nb3V0KHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2hvd0xvZ291dCgpe1xyXG4gICAgICAgIHRoaXMuY3JlYXRlTG9naW5Mb2dvdXQoZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3JlYXRlTG9naW5Mb2dvdXQobG9naW46IGJvb2xlYW4pe1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFJlc2V0IGh0bWwgZGF0YVxyXG4gICAgICAgICQoXCIjXCIgKyB0aGlzLl9sb2dpbldpZGdldEJhY2tncm91bmRJZClbMF0uaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcbiAgICAgICAgbGV0IGRhdGEgPSBcIlwiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKGxvZ2luID09IHRydWUpe1xyXG4gICAgICAgICAgICBkYXRhID0gdGhpcy5nZXRNYWluSHRtbERhdGEoXCJMb2dpblwiKTtcclxuICAgICAgICAgICAgZGF0YSArPSB0aGlzLmdldExvZ2luSHRtbERhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgZGF0YSA9IHRoaXMuZ2V0TWFpbkh0bWxEYXRhKFwiTG9nb3V0XCIpO1xyXG4gICAgICAgICAgICBkYXRhICs9IHRoaXMuZ2V0TG9nb3V0SHRtbERhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZGF0YSArPSB0aGlzLmdldE1lc3NhZ2VDb250YWluZXJEYXRhKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgJChcIiNcIiArIHRoaXMuX2xvZ2luV2lkZ2V0QmFja2dyb3VuZElkKS5hcHBlbmQoZGF0YSk7XHJcblxyXG4gICAgICAgIHRoaXMuY3JlYXRlTG9naW5Mb2dvdXRCdXR0b24odGhpcy5fbG9naW5XaWRnZXRMb2dpbkxvZ291dEJ1dHRvbklkLCBsb2dpbik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRNYWluSHRtbERhdGEoaGVhZGVyVGV4dDogc3RyaW5nKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9J3otaW5kZXg6IC0xOyBwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogLTUwcHg7IHdpZHRoOiB2YXIoLS10YWJXaWRnZXRGbGV4VGFiQXJlYVdpZHRoKTsgaGVpZ2h0OiA1MHB4OyBib3JkZXItYm90dG9tOiBzb2xpZCAzcHggdmFyKC0tbWFpbi1ib3JkZXItY29sb3IpOyBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1tYWluLWJsYWNrKSc+IDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPSdsb2dpbk1pZGRsZUNvbnRhaW5lckJvcmRlcicgaWQ9J2ArIHRoaXMuX2xvZ2luV2lkZ2V0SWQgKyBgJz5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz0nbG9naW5IZWFkZXInIGlkPSdgICsgdGhpcy5fbG9naW5XaWRnZXRIZWFkZXJJZCArIGAnPmAraGVhZGVyVGV4dCtgPC9kaXY+YDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldExvZ2luSHRtbERhdGEoKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9J2xvZ2luSW5wdXRGaWVsZFBvc2l0aW9uJz5Vc2VybmFtZTo8YnI+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJgICsgdGhpcy5fbG9naW5XaWRnZXRVc2VybmFtZUlkICsgYFwiIG5hbWU9XCJ0eHROYW1lXCIgY2xhc3M9XCJsb2dpbklucHV0VGV4dFwiIHJlcXVpcmVkIC8+PGJyIC8+PC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9J2xvZ2luSW5wdXRGaWVsZFBvc2l0aW9uJz5QYXNzd29yZDo8YnI+PGlucHV0IHR5cGU9XCJwYXNzd29yZFwiIGlkPVwiYCArIHRoaXMuX2xvZ2luV2lkZ2V0UGFzc3dvcmRJZCArIGBcIiBuYW1lPVwidHh0UGFzc3dvcmRcIiBjbGFzcz1cImxvZ2luSW5wdXRUZXh0XCIgcmVxdWlyZWQgLz48L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz0nbG9naW5CdXR0b25Qb3NpdGlvbicgaWQ9J2AgKyB0aGlzLl9sb2dpbldpZGdldExvZ2luTG9nb3V0QnV0dG9uSWQgKyBgJz48L2Rpdj5gO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0TG9nb3V0SHRtbERhdGEoKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9J2xvZ2luSW5wdXRGaWVsZFBvc2l0aW9uJz5Vc2VybmFtZTo8YnI+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJgICsgdGhpcy5fbG9naW5XaWRnZXRVc2VybmFtZUlkICsgYFwiIHZhbHVlPVwiYCArIHRoaXMuX2FjdHVhbFVzZXJuYW1lICsgYFwibmFtZT1cInR4dE5hbWVcIiBjbGFzcz1cImxvZ2luSW5wdXRUZXh0IGxvZ2luSW5wdXRUZXh0UmVhZE9ubHlcIiByZWFkb25seSAvPjxiciAvPjwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPSdsb2dvdXRCdXR0b25Qb3NpdGlvbicgaWQ9J2AgKyB0aGlzLl9sb2dpbldpZGdldExvZ2luTG9nb3V0QnV0dG9uSWQgKyBgJz48L2Rpdj5gO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0TWVzc2FnZUNvbnRhaW5lckRhdGEoKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiBgPGRpdiBjbGFzcz0nbG9naW5NZXNzYWdlUG9zaXRpb24nIGlkPSdgICsgdGhpcy5fbG9naW5XaWRnZXRNZXNzYWdlSWQgKyBgJz48L2Rpdj48L2Rpdj5gO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3JlYXRlTG9naW5Mb2dvdXRCdXR0b24oaWQ6IHN0cmluZywgbG9naW46IGJvb2xlYW4pe1xyXG4gICAgICAgIGxldCBidXR0b25UZXh0ID0gXCJMb2dpblwiO1xyXG4gICAgICAgIGlmKGxvZ2luID09IGZhbHNlKXtcclxuICAgICAgICAgICAgYnV0dG9uVGV4dCA9IFwiTG9nb3V0XCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICg8YW55PiQoXCIjXCIgKyBpZCkpLmVqQnV0dG9uKHtcclxuICAgICAgICAgICAgdGV4dDogYnV0dG9uVGV4dCxcclxuICAgICAgICAgICAgY2xpY2s6IChjbGlja0FyZ3MpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKGxvZ2luID09IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9naW5DbGljaygpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nb3V0Q2xpY2soKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB3aWR0aDogXCIxMjBweFwiLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IFwiMjBweFwiLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbG9naW5DbGljaygpe1xyXG5cclxuICAgICAgICBsZXQgdXNlcm5hbWVFbGVtZW50ID0gJChcIiNcIiArIHRoaXMuX2xvZ2luV2lkZ2V0VXNlcm5hbWVJZCk7XHJcbiAgICAgICAgbGV0IHBhc3N3b3JkRWxlbWVudCA9ICQoXCIjXCIgKyB0aGlzLl9sb2dpbldpZGdldFBhc3N3b3JkSWQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCB1c2VybmFtZSA9ICg8YW55PnVzZXJuYW1lRWxlbWVudFswXSkudmFsdWU7XHJcbiAgICAgICAgbGV0IHBhc3N3b3JkID0gKDxhbnk+cGFzc3dvcmRFbGVtZW50WzBdKS52YWx1ZTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgdXNlckluZm8gPSB7IHVzZXJuYW1lOiB1c2VybmFtZSwgcGFzc3dvcmQ6IHBhc3N3b3JkIH07XHJcbiAgICAgICAgdGhpcy5fbG9naW5JbnRlcmZhY2UuY29tbWFuZENoYW5nZVVzZXIuZXhlY3V0ZSh1c2VySW5mbywgKHVzZXJSb2xlcykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9hY3R1YWxVc2VybmFtZSA9IHVzZXJuYW1lO1xyXG4gICAgICAgICAgICAkKFwiI1wiICsgdGhpcy5fbG9naW5XaWRnZXRNZXNzYWdlSWQpWzBdLmlubmVySFRNTCA9IFwiVXNlcjogJ1wiICsgdXNlcm5hbWUgKyBcIicgbG9nZ2VkIGluIVwiO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dMb2dvdXQoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCIlbyBMb2dnZWQgaW4gd2l0aCByb2xlczogJW9cIix1c2VySW5mby51c2VybmFtZSwgdXNlclJvbGVzKTtcclxuICAgICAgICB9LChlcnJvcik9PntcclxuICAgICAgICAgICAgJChcIiNcIiArIHRoaXMuX2xvZ2luV2lkZ2V0TWVzc2FnZUlkKVswXS5pbm5lckhUTUwgPSBcIjxmb250IGNvbG9yPSdyZWQnPkxvZ2luIGZhaWxlZCE8L2ZvbnQ+XCI7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ291bGQgbm90IGxvZyBpbjogJW8gJW9cIiwgdXNlckluZm8udXNlcm5hbWUsIGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxvZ291dENsaWNrKCl7XHJcblxyXG4gICAgICAgIGxldCB1c2VybmFtZUVsZW1lbnQgPSAkKFwiI1wiICsgdGhpcy5fbG9naW5XaWRnZXRVc2VybmFtZUlkKTtcclxuICAgICAgICBsZXQgdXNlcm5hbWUgPSAoPGFueT51c2VybmFtZUVsZW1lbnRbMF0pLnZhbHVlO1xyXG5cclxuICAgICAgICBsZXQgdXNlckluZm8gPSB7IHVzZXJuYW1lOiBcIkFub255bW91c1wiLCBwYXNzd29yZDogXCJcIiB9O1xyXG4gICAgICAgIHRoaXMuX2xvZ2luSW50ZXJmYWNlLmNvbW1hbmRDaGFuZ2VVc2VyLmV4ZWN1dGUodXNlckluZm8sICh1c2VyUm9sZXMpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fYWN0dWFsVXNlcm5hbWUgPSBcIkFub255bW91c1wiO1xyXG4gICAgICAgICAgICAkKFwiI1wiICsgdGhpcy5fbG9naW5XaWRnZXRNZXNzYWdlSWQpWzBdLmlubmVySFRNTCA9IFwiVXNlcjogJ1wiICsgdXNlcm5hbWUgKyBcIicgbG9nZ2VkIG91dCFcIjtcclxuICAgICAgICAgICAgdGhpcy5zaG93TG9naW4oKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCIlbyBMb2dnZWQgaW4gd2l0aCByb2xlczogJW9cIix1c2VySW5mby51c2VybmFtZSwgdXNlclJvbGVzKTtcclxuICAgICAgICB9LChlcnJvcik9PntcclxuICAgICAgICAgICAgJChcIiNcIiArIHRoaXMuX2xvZ2luV2lkZ2V0TWVzc2FnZUlkKVswXS5pbm5lckhUTUwgPSBcIjxmb250IGNvbG9yPSdyZWQnPkxvZ291dCBmYWlsZWQhPC9mb250PlwiO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvdWxkIG5vdCBsb2cgaW46ICVvICVvXCIsIHVzZXJJbmZvLnVzZXJuYW1lLCBlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IExvZ2luV2lkZ2V0IH07Il19