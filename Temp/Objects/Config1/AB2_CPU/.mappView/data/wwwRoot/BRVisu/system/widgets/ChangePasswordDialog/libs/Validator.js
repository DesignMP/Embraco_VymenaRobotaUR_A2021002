define(['system/widgets/ChangePasswordDialog/libs/Message', 
    'brease/core/Utils'],
function (Message, Utils) {

    /**
        * @class system.widgets.ChangePasswordDialog.libs.Validator
        */

    'use strict';

    var Validator = function (widget) {
            this.widget = widget;
        },
        p = Validator.prototype;
        
    p.validate = function (form) {
        
        var arError = [],
            arInputs = [],
            isValid = true;

        this.widget.testInputs.forEach(function (inputName) {
            switch (inputName) {
                case 'userName':
                    if (!this.testMinLength(1, form.userName)) {
                        isValid = false; 
                        arError.push(new Message(_text('IAT/System/Dialog/CHANGEPASSWORD_USERNAME_EMPTY'), Message.Type.ERROR));
                        arInputs.push('userName'); 
                    }
                    break;
                    
                case 'oldPassword':
                    if (!this.testMinLength(1, form.oldPassword)) {
                        isValid = false; 
                        arError.push(new Message(_text('IAT/System/Dialog/CHANGEPASSWORD_OLDPASSWORD_EMPTY'), Message.Type.ERROR));
                        arInputs.push('oldPassword'); 
                    }
                    break;
                case 'newPassword':
                    if (!this.testMinLength(1, form.newPassword)) {
                        isValid = false; 
                        arError.push(new Message(_text('IAT/System/Dialog/CHANGEPASSWORD_NEWPASSWORD_EMPTY'), Message.Type.ERROR));
                        arInputs.push('newPassword'); 
                    }
                    break;
                case 'confirmPassword':
                    if (!this.testEquality(form.confirmPassword, form.newPassword)) {
                        isValid = false; 
                        arError.push(new Message(_text('IAT/System/Dialog/CHANGEPASSWORD_PASSWORDS_DIFFERENT'), Message.Type.ERROR));
                        arInputs.push('confirmPassword'); 
                    }
                    break;
            }
        }, this);
            
        return { 
            isValid: isValid,
            arError: arError,
            arInputs: arInputs
        };
    };

    p.testMinLength = function (minLength, value) {
        return Utils.isString(value) && value.length >= minLength;
    };

    p.testEquality = function (value1, value2) {
        return value1 === value2;
    };

    p.dispose = function () {
        this.widget = undefined;
    };

    function _text(key) {
        return brease.language.getText(key);
    }

    return Validator;
});
