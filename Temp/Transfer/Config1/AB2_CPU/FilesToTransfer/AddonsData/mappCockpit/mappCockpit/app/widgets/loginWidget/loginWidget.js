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
        LoginWidget.prototype.createLayout = function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW5XaWRnZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3dpZGdldHMvbG9naW5XaWRnZXQvbG9naW5XaWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUdBOzs7OztPQUtHO0lBQ0g7UUFBMEIsK0JBQVU7UUFBcEM7WUFBQSxxRUFnTkM7WUF0TVcsb0JBQWMsR0FBRyxLQUFLLENBQUM7WUFJdkIscUJBQWUsR0FBRyxXQUFXLENBQUM7O1FBa00xQyxDQUFDO1FBaE1HOzs7O1dBSUc7UUFDSCxnQ0FBVSxHQUFWLFVBQVcsaUJBQXlCO1lBQ2hDLElBQUcsSUFBSSxDQUFDLGNBQWMsSUFBSSxLQUFLLEVBQUM7Z0JBQzVCLGlCQUFNLFVBQVUsWUFBQyxpQkFBaUIsQ0FBQyxDQUFDO2dCQUNwQyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQzthQUM5QjtRQUNMLENBQUM7UUFFRDs7OztXQUlHO1FBQ0gsa0NBQVksR0FBWjtZQUVJLHdCQUF3QjtZQUN4QixDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBRS9ELGdDQUFnQztZQUNoQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFFckIsZ0NBQWdDO1lBQ2hDLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxVQUFVLENBQUMsQ0FBQztZQUU1Rix5Q0FBeUM7WUFDekMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDLENBQUM7WUFFckYsZ0RBQWdEO1lBQ2hELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNyQixDQUFDO1FBT0Qsc0JBQVcsdUNBQWM7WUFMekI7Ozs7ZUFJRztpQkFDSCxVQUEwQixjQUFjO2dCQUNwQyxJQUFJLENBQUMsZUFBZSxHQUFHLGNBQWMsQ0FBQztZQUMxQyxDQUFDOzs7V0FBQTtRQUVEOzs7OztXQUtHO1FBQ0gsNEJBQU0sR0FBTixVQUFPLEtBQWEsRUFBRSxNQUFjO1lBRWhDLHNCQUFzQjtZQUN0QixJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEQsYUFBYSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQztZQUNwRCxhQUFhLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDO1lBRXRELHVDQUF1QztZQUN2QyxJQUFJLHVCQUF1QixHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEUsdUJBQXVCLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDO1lBQzlELHVCQUF1QixDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQztRQUNwRSxDQUFDO1FBRU8sbUNBQWEsR0FBckI7WUFDSSxJQUFJLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxDQUFDLGVBQWUsR0FBRyxhQUFhLENBQUM7WUFDckUsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsZUFBZSxHQUFHLGNBQWMsQ0FBQztZQUM1RCxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLGNBQWMsR0FBRyxTQUFTLENBQUM7WUFDNUQsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxjQUFjLEdBQUcsV0FBVyxDQUFDO1lBQ2hFLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsY0FBYyxHQUFHLFdBQVcsQ0FBQztZQUNoRSxJQUFJLENBQUMsK0JBQStCLEdBQUcsSUFBSSxDQUFDLGNBQWMsR0FBRyxvQkFBb0IsQ0FBQztZQUNsRixJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLGNBQWMsR0FBRyxlQUFlLENBQUM7UUFDdkUsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSCxnQ0FBVSxHQUFWO1lBQ0ksaUJBQU0sUUFBUSxZQUFDLG9EQUFvRCxDQUFDLENBQUM7UUFDekUsQ0FBQztRQUVPLCtCQUFTLEdBQWpCO1lBQ0ksSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLENBQUM7UUFFTyxnQ0FBVSxHQUFsQjtZQUNJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsQyxDQUFDO1FBRU8sdUNBQWlCLEdBQXpCLFVBQTBCLEtBQWM7WUFFcEMsa0JBQWtCO1lBQ2xCLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztZQUV6RCxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7WUFFZCxJQUFHLEtBQUssSUFBSSxJQUFJLEVBQUM7Z0JBQ2IsSUFBSSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3JDLElBQUksSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQzthQUNuQztpQkFDRztnQkFDQSxJQUFJLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDdEMsSUFBSSxJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2FBQ3BDO1lBQ0QsSUFBSSxJQUFJLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1lBRXZDLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXBELElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsK0JBQStCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDOUUsQ0FBQztRQUVPLHFDQUFlLEdBQXZCLFVBQXdCLFVBQWtCO1lBQ3RDLE9BQU8seVJBRTBDLEdBQUUsSUFBSSxDQUFDLGNBQWMsR0FBRywrQ0FDdkMsR0FBRyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxHQUFDLFVBQVUsR0FBQyxRQUFRLENBQUM7UUFDOUYsQ0FBQztRQUVPLHNDQUFnQixHQUF4QjtZQUNJLE9BQU8sNEZBQ3VFLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixHQUFHLG9LQUM3QixHQUFHLElBQUksQ0FBQyxzQkFBc0IsR0FBRyx1SEFDekUsR0FBRyxJQUFJLENBQUMsK0JBQStCLEdBQUcsVUFBVSxDQUFDO1FBQ25HLENBQUM7UUFFTyx1Q0FBaUIsR0FBekI7WUFDSSxPQUFPLDRGQUN1RSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxhQUFXLEdBQUcsSUFBSSxDQUFDLGVBQWUsR0FBRyxnSkFDekcsR0FBRyxJQUFJLENBQUMsK0JBQStCLEdBQUcsVUFBVSxDQUFDO1FBQ3BHLENBQUM7UUFFTyw2Q0FBdUIsR0FBL0I7WUFDSSxPQUFPLHdDQUF3QyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxnQkFBZ0IsQ0FBQztRQUNwRyxDQUFDO1FBRU8sNkNBQXVCLEdBQS9CLFVBQWdDLEVBQVUsRUFBRSxLQUFjO1lBQTFELGlCQWtCQztZQWpCRyxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUM7WUFDekIsSUFBRyxLQUFLLElBQUksS0FBSyxFQUFDO2dCQUNkLFVBQVUsR0FBRyxRQUFRLENBQUM7YUFDekI7WUFDSyxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBRSxDQUFDLFFBQVEsQ0FBQztnQkFDeEIsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLEtBQUssRUFBRSxVQUFDLFNBQVM7b0JBQ2IsSUFBRyxLQUFLLElBQUksSUFBSSxFQUFDO3dCQUNiLEtBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQTtxQkFDcEI7eUJBQ0c7d0JBQ0EsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO3FCQUNyQjtnQkFDTCxDQUFDO2dCQUNELEtBQUssRUFBRSxPQUFPO2dCQUNkLE1BQU0sRUFBRSxNQUFNO2FBQ2pCLENBQUMsQ0FBQztRQUNQLENBQUM7UUFFTyxnQ0FBVSxHQUFsQjtZQUFBLGlCQWtCQztZQWhCRyxJQUFJLGVBQWUsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBQzNELElBQUksZUFBZSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFFM0QsSUFBSSxRQUFRLEdBQVMsZUFBZSxDQUFDLENBQUMsQ0FBRSxDQUFDLEtBQUssQ0FBQztZQUMvQyxJQUFJLFFBQVEsR0FBUyxlQUFlLENBQUMsQ0FBQyxDQUFFLENBQUMsS0FBSyxDQUFDO1lBRS9DLElBQUksUUFBUSxHQUFHLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLENBQUM7WUFDMUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFVBQUMsU0FBUztnQkFDL0QsS0FBSSxDQUFDLGVBQWUsR0FBRyxRQUFRLENBQUM7Z0JBQ2hDLENBQUMsQ0FBQyxHQUFHLEdBQUcsS0FBSSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLFNBQVMsR0FBRyxRQUFRLEdBQUcsY0FBYyxDQUFDO2dCQUN6RixLQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLEVBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUM1RSxDQUFDLEVBQUMsVUFBQyxLQUFLO2dCQUNKLENBQUMsQ0FBQyxHQUFHLEdBQUcsS0FBSSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLHdDQUF3QyxDQUFDO2dCQUM1RixPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixFQUFFLFFBQVEsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDckUsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBRU8saUNBQVcsR0FBbkI7WUFBQSxpQkFlQztZQWJHLElBQUksZUFBZSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFDM0QsSUFBSSxRQUFRLEdBQVMsZUFBZSxDQUFDLENBQUMsQ0FBRSxDQUFDLEtBQUssQ0FBQztZQUUvQyxJQUFJLFFBQVEsR0FBRyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxDQUFDO1lBQ3ZELElBQUksQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxVQUFDLFNBQVM7Z0JBQy9ELEtBQUksQ0FBQyxlQUFlLEdBQUcsV0FBVyxDQUFDO2dCQUNuQyxDQUFDLENBQUMsR0FBRyxHQUFHLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxTQUFTLEdBQUcsUUFBUSxHQUFHLGVBQWUsQ0FBQztnQkFDMUYsS0FBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLDZCQUE2QixFQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDNUUsQ0FBQyxFQUFDLFVBQUMsS0FBSztnQkFDSixDQUFDLENBQUMsR0FBRyxHQUFHLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyx5Q0FBeUMsQ0FBQztnQkFDN0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsRUFBRSxRQUFRLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3JFLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUNMLGtCQUFDO0lBQUQsQ0FBQyxBQWhORCxDQUEwQix1QkFBVSxHQWdObkM7SUFFUSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFdpZGdldEJhc2UgfSBmcm9tIFwiLi4vY29tbW9uL3dpZGdldEJhc2VcIjtcclxuaW1wb3J0IHsgSUxvZ2luV2lkZ2V0IH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9sb2dpbldpZGdldEludGVyZmFjZVwiO1xyXG5cclxuLyoqXHJcbiAqIGltcGxlbWVudHMgdGhlIGxvZ2luIHdpZGdldFxyXG4gKlxyXG4gKiBAY2xhc3MgTG9naW5XaWRnZXRcclxuICogQGV4dGVuZHMge1dpZGdldEJhc2V9XHJcbiAqL1xyXG5jbGFzcyBMb2dpbldpZGdldCBleHRlbmRzIFdpZGdldEJhc2UgaW1wbGVtZW50cyBJTG9naW5XaWRnZXQge1xyXG5cclxuICAgIHByaXZhdGUgX2xvZ2luV2lkZ2V0QmFja2dyb3VuZElkO1xyXG4gICAgcHJpdmF0ZSBfbG9naW5XaWRnZXRJZDtcclxuICAgIHByaXZhdGUgX2xvZ2luV2lkZ2V0SGVhZGVySWQ7XHJcbiAgICBwcml2YXRlIF9sb2dpbldpZGdldFVzZXJuYW1lSWQ7XHJcbiAgICBwcml2YXRlIF9sb2dpbldpZGdldFBhc3N3b3JkSWQ7XHJcbiAgICBwcml2YXRlIF9sb2dpbldpZGdldExvZ2luTG9nb3V0QnV0dG9uSWQ7XHJcbiAgICBwcml2YXRlIF9sb2dpbldpZGdldE1lc3NhZ2VJZDtcclxuXHJcbiAgICBwcml2YXRlIF9pc0luaXRpYWxpemVkID0gZmFsc2U7XHJcblxyXG4gICAgcHJpdmF0ZSBfbG9naW5JbnRlcmZhY2U7XHJcblxyXG4gICAgcHJpdmF0ZSBfYWN0dWFsVXNlcm5hbWUgPSBcIkFub255bW91c1wiO1xyXG5cclxuICAgIC8qIGluaXRpYWxpemUgdGhlIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYXlvdXRDb250YWluZXJJZFxyXG4gICAgICogQG1lbWJlcm9mIExvZ2luV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIGluaXRpYWxpemUobGF5b3V0Q29udGFpbmVySWQ6IHN0cmluZykge1xyXG4gICAgICAgIGlmKHRoaXMuX2lzSW5pdGlhbGl6ZWQgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICBzdXBlci5pbml0aWFsaXplKGxheW91dENvbnRhaW5lcklkKTtcclxuICAgICAgICAgICAgdGhpcy5faXNJbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgd2lkZ2V0IGNvbnRlbnQgYW5kIGV2ZW50dWFsbHkgc3Vid2lkZ2V0c1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBMb2dpbldpZGdldFxyXG4gICAgICovXHJcbiAgICBjcmVhdGVMYXlvdXQoKSB7XHJcblxyXG4gICAgICAgIC8vIEFkZCBjbGFzcyB0byBtYWluIGRpdlxyXG4gICAgICAgICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpWzBdLmNsYXNzTGlzdC5hZGQoXCJsb2dpbldpZGdldE1haW5cIik7XHJcblxyXG4gICAgICAgIC8vIGluaXRpYWxpemUgdGhlIG5lZWRlZCBkaXYgaWRzXHJcbiAgICAgICAgdGhpcy5pbml0aWFsaXplSWRzKCk7XHJcblxyXG4gICAgICAgIC8vIEFkZCBpbm5lciBkaXYgd2l0aCBiYWNrZ3JvdW5kXHJcbiAgICAgICAgJCh0aGlzLmNzc1BhcmVudENvbnRlbnRJZCkuYXBwZW5kKFwiPGRpdiBpZD0nXCIgKyB0aGlzLl9sb2dpbldpZGdldEJhY2tncm91bmRJZCArIFwiJz48L2Rpdj5cIik7XHJcblxyXG4gICAgICAgIC8vIEFkZCBjbGFzcyB0byBpbm5lciBkaXYgd2l0aCBiYWNrZ3JvdW5kXHJcbiAgICAgICAgJChcIiNcIiArIHRoaXMuX2xvZ2luV2lkZ2V0QmFja2dyb3VuZElkKVswXS5jbGFzc0xpc3QuYWRkKFwibG9naW5XaWRnZXRNYWluQmFja2dyb3VuZFwiKTtcclxuXHJcbiAgICAgICAgLy8gU2hvdyB0aGUgbG9naW4gZm9ybSB3aXRoaW4gdGhlIGJhY2tncm91bmQgZGl2XHJcbiAgICAgICAgdGhpcy5zaG93TG9naW4oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgYW5kIGRlZmluZXMgdGhlIGludGVyZmFjZSB0byB0aGUgbG9naW4gaW50ZXJmYWNlXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIExvZ2luV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgbG9naW5JbnRlcmZhY2UobG9naW5JbnRlcmZhY2UpIHtcclxuICAgICAgICB0aGlzLl9sb2dpbkludGVyZmFjZSA9IGxvZ2luSW50ZXJmYWNlO1xyXG4gICAgfVxyXG4gICAgIFxyXG4gICAgLyoqIHJlc2l6ZXMgdGhlIGxvZ2luIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodFxyXG4gICAgICogQG1lbWJlcm9mIExvZ2luV2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHJlc2l6ZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcil7XHJcblxyXG4gICAgICAgIC8vIFJlc2l6ZSB0aGUgbWFpbiBkaXZcclxuICAgICAgICBsZXQgcGFyZW50RWxlbWVudCA9ICQodGhpcy5jc3NQYXJlbnRDb250ZW50SWQpWzBdO1xyXG4gICAgICAgIHBhcmVudEVsZW1lbnQuc3R5bGUud2lkdGggPSB3aWR0aC50b1N0cmluZygpICsgXCJweFwiO1xyXG4gICAgICAgIHBhcmVudEVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0LnRvU3RyaW5nKCkgKyBcInB4XCI7XHJcblxyXG4gICAgICAgIC8vIFJlc2l6ZSB0aGUgaW5uZXIgZGl2IHdpdGggYmFja2dyb3VuZFxyXG4gICAgICAgIGxldCBwYXJlbnRFbGVtZW50QmFja2dyb3VuZCA9ICQoXCIjXCIgKyB0aGlzLl9sb2dpbldpZGdldEJhY2tncm91bmRJZClbMF07XHJcbiAgICAgICAgcGFyZW50RWxlbWVudEJhY2tncm91bmQuc3R5bGUud2lkdGggPSB3aWR0aC50b1N0cmluZygpICsgXCJweFwiO1xyXG4gICAgICAgIHBhcmVudEVsZW1lbnRCYWNrZ3JvdW5kLnN0eWxlLmhlaWdodCA9IGhlaWdodC50b1N0cmluZygpICsgXCJweFwiO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdGlhbGl6ZUlkcygpe1xyXG4gICAgICAgIHRoaXMuX2xvZ2luV2lkZ2V0QmFja2dyb3VuZElkID0gdGhpcy5wYXJlbnRDb250ZW50SWQgKyBcIl9iYWNrZ3JvdW5kXCI7XHJcbiAgICAgICAgdGhpcy5fbG9naW5XaWRnZXRJZCA9IHRoaXMucGFyZW50Q29udGVudElkICsgXCJfbG9naW5XaWRnZXRcIjtcclxuICAgICAgICB0aGlzLl9sb2dpbldpZGdldEhlYWRlcklkID0gdGhpcy5fbG9naW5XaWRnZXRJZCArIFwiX2hlYWRlclwiO1xyXG4gICAgICAgIHRoaXMuX2xvZ2luV2lkZ2V0VXNlcm5hbWVJZCA9IHRoaXMuX2xvZ2luV2lkZ2V0SWQgKyBcIl91c2VybmFtZVwiO1xyXG4gICAgICAgIHRoaXMuX2xvZ2luV2lkZ2V0UGFzc3dvcmRJZCA9IHRoaXMuX2xvZ2luV2lkZ2V0SWQgKyBcIl9wYXNzd29yZFwiO1xyXG4gICAgICAgIHRoaXMuX2xvZ2luV2lkZ2V0TG9naW5Mb2dvdXRCdXR0b25JZCA9IHRoaXMuX2xvZ2luV2lkZ2V0SWQgKyBcIl9sb2dpbkxvZ291dEJ1dHRvblwiO1xyXG4gICAgICAgIHRoaXMuX2xvZ2luV2lkZ2V0TWVzc2FnZUlkID0gdGhpcy5fbG9naW5XaWRnZXRJZCArIFwiX2xvZ2luTWVzc2FnZVwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZHMgdGhlIHN0eWxlcyBmb3IgdGhlIGxvZ2luIHdpZGdldFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBMb2dpbldpZGdldFxyXG4gICAgICovXHJcbiAgICBsb2FkU3R5bGVzKCl7XHJcbiAgICAgICAgc3VwZXIuYWRkU3R5bGUoXCJ3aWRnZXRzL2xvZ2luV2lkZ2V0L3N0eWxlL2Nzcy9sb2dpbldpZGdldFN0eWxlLmNzc1wiKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNob3dMb2dpbigpe1xyXG4gICAgICAgIHRoaXMuY3JlYXRlTG9naW5Mb2dvdXQodHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzaG93TG9nb3V0KCl7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVMb2dpbkxvZ291dChmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjcmVhdGVMb2dpbkxvZ291dChsb2dpbjogYm9vbGVhbil7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gUmVzZXQgaHRtbCBkYXRhXHJcbiAgICAgICAgJChcIiNcIiArIHRoaXMuX2xvZ2luV2lkZ2V0QmFja2dyb3VuZElkKVswXS5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuICAgICAgICBsZXQgZGF0YSA9IFwiXCI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYobG9naW4gPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLmdldE1haW5IdG1sRGF0YShcIkxvZ2luXCIpO1xyXG4gICAgICAgICAgICBkYXRhICs9IHRoaXMuZ2V0TG9naW5IdG1sRGF0YSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBkYXRhID0gdGhpcy5nZXRNYWluSHRtbERhdGEoXCJMb2dvdXRcIik7XHJcbiAgICAgICAgICAgIGRhdGEgKz0gdGhpcy5nZXRMb2dvdXRIdG1sRGF0YSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkYXRhICs9IHRoaXMuZ2V0TWVzc2FnZUNvbnRhaW5lckRhdGEoKTtcclxuICAgICAgICBcclxuICAgICAgICAkKFwiI1wiICsgdGhpcy5fbG9naW5XaWRnZXRCYWNrZ3JvdW5kSWQpLmFwcGVuZChkYXRhKTtcclxuXHJcbiAgICAgICAgdGhpcy5jcmVhdGVMb2dpbkxvZ291dEJ1dHRvbih0aGlzLl9sb2dpbldpZGdldExvZ2luTG9nb3V0QnV0dG9uSWQsIGxvZ2luKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldE1haW5IdG1sRGF0YShoZWFkZXJUZXh0OiBzdHJpbmcpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgPGRpdiBzdHlsZT0nei1pbmRleDogLTE7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiAtNTBweDsgd2lkdGg6IHZhcigtLXRhYldpZGdldEZsZXhUYWJBcmVhV2lkdGgpOyBoZWlnaHQ6IDUwcHg7IGJvcmRlci1ib3R0b206IHNvbGlkIDNweCB2YXIoLS1tYWluLWJvcmRlci1jb2xvcik7IGJhY2tncm91bmQtY29sb3I6IHZhcigtLW1haW4tYmxhY2spJz4gPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9J2xvZ2luTWlkZGxlQ29udGFpbmVyQm9yZGVyJyBpZD0nYCsgdGhpcy5fbG9naW5XaWRnZXRJZCArIGAnPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPSdsb2dpbkhlYWRlcicgaWQ9J2AgKyB0aGlzLl9sb2dpbldpZGdldEhlYWRlcklkICsgYCc+YCtoZWFkZXJUZXh0K2A8L2Rpdj5gO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0TG9naW5IdG1sRGF0YSgpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz0nbG9naW5JbnB1dEZpZWxkUG9zaXRpb24nPlVzZXJuYW1lOjxicj48aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImAgKyB0aGlzLl9sb2dpbldpZGdldFVzZXJuYW1lSWQgKyBgXCIgbmFtZT1cInR4dE5hbWVcIiBjbGFzcz1cImxvZ2luSW5wdXRUZXh0XCIgcmVxdWlyZWQgLz48YnIgLz48L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz0nbG9naW5JbnB1dEZpZWxkUG9zaXRpb24nPlBhc3N3b3JkOjxicj48aW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgaWQ9XCJgICsgdGhpcy5fbG9naW5XaWRnZXRQYXNzd29yZElkICsgYFwiIG5hbWU9XCJ0eHRQYXNzd29yZFwiIGNsYXNzPVwibG9naW5JbnB1dFRleHRcIiByZXF1aXJlZCAvPjwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPSdsb2dpbkJ1dHRvblBvc2l0aW9uJyBpZD0nYCArIHRoaXMuX2xvZ2luV2lkZ2V0TG9naW5Mb2dvdXRCdXR0b25JZCArIGAnPjwvZGl2PmA7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRMb2dvdXRIdG1sRGF0YSgpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz0nbG9naW5JbnB1dEZpZWxkUG9zaXRpb24nPlVzZXJuYW1lOjxicj48aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImAgKyB0aGlzLl9sb2dpbldpZGdldFVzZXJuYW1lSWQgKyBgXCIgdmFsdWU9XCJgICsgdGhpcy5fYWN0dWFsVXNlcm5hbWUgKyBgXCJuYW1lPVwidHh0TmFtZVwiIGNsYXNzPVwibG9naW5JbnB1dFRleHQgbG9naW5JbnB1dFRleHRSZWFkT25seVwiIHJlYWRvbmx5IC8+PGJyIC8+PC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9J2xvZ291dEJ1dHRvblBvc2l0aW9uJyBpZD0nYCArIHRoaXMuX2xvZ2luV2lkZ2V0TG9naW5Mb2dvdXRCdXR0b25JZCArIGAnPjwvZGl2PmA7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRNZXNzYWdlQ29udGFpbmVyRGF0YSgpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPSdsb2dpbk1lc3NhZ2VQb3NpdGlvbicgaWQ9J2AgKyB0aGlzLl9sb2dpbldpZGdldE1lc3NhZ2VJZCArIGAnPjwvZGl2PjwvZGl2PmA7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjcmVhdGVMb2dpbkxvZ291dEJ1dHRvbihpZDogc3RyaW5nLCBsb2dpbjogYm9vbGVhbil7XHJcbiAgICAgICAgbGV0IGJ1dHRvblRleHQgPSBcIkxvZ2luXCI7XHJcbiAgICAgICAgaWYobG9naW4gPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICBidXR0b25UZXh0ID0gXCJMb2dvdXRcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgKDxhbnk+JChcIiNcIiArIGlkKSkuZWpCdXR0b24oe1xyXG4gICAgICAgICAgICB0ZXh0OiBidXR0b25UZXh0LFxyXG4gICAgICAgICAgICBjbGljazogKGNsaWNrQXJncykgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYobG9naW4gPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dpbkNsaWNrKClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dvdXRDbGljaygpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHdpZHRoOiBcIjEyMHB4XCIsXHJcbiAgICAgICAgICAgIGhlaWdodDogXCIyMHB4XCIsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsb2dpbkNsaWNrKCl7XHJcblxyXG4gICAgICAgIGxldCB1c2VybmFtZUVsZW1lbnQgPSAkKFwiI1wiICsgdGhpcy5fbG9naW5XaWRnZXRVc2VybmFtZUlkKTtcclxuICAgICAgICBsZXQgcGFzc3dvcmRFbGVtZW50ID0gJChcIiNcIiArIHRoaXMuX2xvZ2luV2lkZ2V0UGFzc3dvcmRJZCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHVzZXJuYW1lID0gKDxhbnk+dXNlcm5hbWVFbGVtZW50WzBdKS52YWx1ZTtcclxuICAgICAgICBsZXQgcGFzc3dvcmQgPSAoPGFueT5wYXNzd29yZEVsZW1lbnRbMF0pLnZhbHVlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCB1c2VySW5mbyA9IHsgdXNlcm5hbWU6IHVzZXJuYW1lLCBwYXNzd29yZDogcGFzc3dvcmQgfTtcclxuICAgICAgICB0aGlzLl9sb2dpbkludGVyZmFjZS5jb21tYW5kQ2hhbmdlVXNlci5leGVjdXRlKHVzZXJJbmZvLCAodXNlclJvbGVzKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2FjdHVhbFVzZXJuYW1lID0gdXNlcm5hbWU7XHJcbiAgICAgICAgICAgICQoXCIjXCIgKyB0aGlzLl9sb2dpbldpZGdldE1lc3NhZ2VJZClbMF0uaW5uZXJIVE1MID0gXCJVc2VyOiAnXCIgKyB1c2VybmFtZSArIFwiJyBsb2dnZWQgaW4hXCI7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0xvZ291dCgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIiVvIExvZ2dlZCBpbiB3aXRoIHJvbGVzOiAlb1wiLHVzZXJJbmZvLnVzZXJuYW1lLCB1c2VyUm9sZXMpO1xyXG4gICAgICAgIH0sKGVycm9yKT0+e1xyXG4gICAgICAgICAgICAkKFwiI1wiICsgdGhpcy5fbG9naW5XaWRnZXRNZXNzYWdlSWQpWzBdLmlubmVySFRNTCA9IFwiPGZvbnQgY29sb3I9J3JlZCc+TG9naW4gZmFpbGVkITwvZm9udD5cIjtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb3VsZCBub3QgbG9nIGluOiAlbyAlb1wiLCB1c2VySW5mby51c2VybmFtZSwgZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbG9nb3V0Q2xpY2soKXtcclxuXHJcbiAgICAgICAgbGV0IHVzZXJuYW1lRWxlbWVudCA9ICQoXCIjXCIgKyB0aGlzLl9sb2dpbldpZGdldFVzZXJuYW1lSWQpO1xyXG4gICAgICAgIGxldCB1c2VybmFtZSA9ICg8YW55PnVzZXJuYW1lRWxlbWVudFswXSkudmFsdWU7XHJcblxyXG4gICAgICAgIGxldCB1c2VySW5mbyA9IHsgdXNlcm5hbWU6IFwiQW5vbnltb3VzXCIsIHBhc3N3b3JkOiBcIlwiIH07XHJcbiAgICAgICAgdGhpcy5fbG9naW5JbnRlcmZhY2UuY29tbWFuZENoYW5nZVVzZXIuZXhlY3V0ZSh1c2VySW5mbywgKHVzZXJSb2xlcykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9hY3R1YWxVc2VybmFtZSA9IFwiQW5vbnltb3VzXCI7XHJcbiAgICAgICAgICAgICQoXCIjXCIgKyB0aGlzLl9sb2dpbldpZGdldE1lc3NhZ2VJZClbMF0uaW5uZXJIVE1MID0gXCJVc2VyOiAnXCIgKyB1c2VybmFtZSArIFwiJyBsb2dnZWQgb3V0IVwiO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dMb2dpbigpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIiVvIExvZ2dlZCBpbiB3aXRoIHJvbGVzOiAlb1wiLHVzZXJJbmZvLnVzZXJuYW1lLCB1c2VyUm9sZXMpO1xyXG4gICAgICAgIH0sKGVycm9yKT0+e1xyXG4gICAgICAgICAgICAkKFwiI1wiICsgdGhpcy5fbG9naW5XaWRnZXRNZXNzYWdlSWQpWzBdLmlubmVySFRNTCA9IFwiPGZvbnQgY29sb3I9J3JlZCc+TG9nb3V0IGZhaWxlZCE8L2ZvbnQ+XCI7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ291bGQgbm90IGxvZyBpbjogJW8gJW9cIiwgdXNlckluZm8udXNlcm5hbWUsIGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgTG9naW5XaWRnZXQgfTsiXX0=