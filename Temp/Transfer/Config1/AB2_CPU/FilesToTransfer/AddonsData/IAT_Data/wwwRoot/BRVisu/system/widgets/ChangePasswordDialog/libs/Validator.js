define(['system/widgets/ChangePasswordDialog/libs/Message',
    'brease/core/StringUtils', 
    'brease/services/libs/PasswordPolicies'],
function (Message, StringUtils, PasswordPolicies) {

    /**
    * @class system.widgets.ChangePasswordDialog.libs.Validator
    */

    'use strict';

    var Validator = function () {},
        p = Validator.prototype;

    /**
    * @method validate
    * Validate form fields. Form fields are provided in object form as string properties.  
    * Parameter testInputs defines which of the fields have to be validated.  
    * @param {String[]} testInputs
    * @param {Object} form
    * @param {String} form.userName
    * @param {String} form.oldPassword
    * @param {String} form.newPassword
    * @param {String} form.confirmPassword
    * @param {Integer} userNameMinLength
    * @return {Object}
    * @return {Boolean} return.isValid
    * @return {system.widgets.ChangePasswordDialog.libs.Message[]} return.arError Array of error messages.
    * @return {String[]} return.arInputs Names of fields which are not valid.
    * @return {PoliciesResult} return.policiesResult result of policy check of newPassword
    */
    p.validate = function (testInputs, form, userNameMinLength) {
        var arError = [],
            arInputs = [],
            isValid = true,
            result, policiesResult;
        testInputs = (Array.isArray(testInputs)) ? testInputs : [];
        userNameMinLength = (userNameMinLength !== undefined) ? userNameMinLength : 1;
            
        testInputs.forEach(function (inputName) {
            switch (inputName) {
                case 'userName':
                    result = StringUtils.testMinLength(form.userName, userNameMinLength);
                    if (!result) {
                        arError.push(new Message(_text('IAT/System/Dialog/CHANGEPASSWORD_USERNAME_EMPTY'), Message.Type.ERROR));
                        arInputs.push('userName'); 
                    }
                    isValid = isValid && result; 
                    break;
                    
                case 'oldPassword':
                    result = StringUtils.testMinLength(form.oldPassword, 1);
                    if (!result) {
                        arError.push(new Message(_text('IAT/System/Dialog/CHANGEPASSWORD_OLDPASSWORD_EMPTY'), Message.Type.ERROR));
                        arInputs.push('oldPassword'); 
                    }
                    isValid = isValid && result; 
                    break;
                case 'newPassword':
                    result = !StringUtils.testEquality(form.oldPassword, form.newPassword);
                    if (!result) {
                        arError.push(new Message(_text('IAT/System/Dialog/CHANGEPASSWORD_NEWPASSWORD_NOTEQUAL_OLD'), Message.Type.ERROR)); 
                    }
                    if (!result) {
                        arInputs.push('newPassword'); 
                    }
                    isValid = isValid && result;
                    if (this.policies) {
                        policiesResult = this.testPolicies(form.newPassword, this.policies);
                        result = Object.keys(policiesResult).reduce(function (acc, cur) {
                            return acc && policiesResult[cur];
                        }, true);
                        if (!result) {
                            arError.push(new Message(_text('IAT/System/Dialog/CHANGEPASSWORD_POLICIES_NOT_MET'), Message.Type.ERROR)); 
                        }
                    } else {
                        result = StringUtils.testMinLength(form.newPassword, 1);
                        if (!result) {
                            arError.push(new Message(_text('IAT/System/Dialog/CHANGEPASSWORD_NEWPASSWORD_EMPTY'), Message.Type.ERROR)); 
                        }
                    } 
                    if (!result && arInputs.indexOf('newPassword') === -1) {
                        arInputs.push('newPassword'); 
                    }
                    isValid = isValid && result;
                    break;
                case 'confirmPassword':
                    result = StringUtils.testEquality(form.confirmPassword, form.newPassword);
                    if (!result) {
                        isValid = false; 
                        arError.push(new Message(_text('IAT/System/Dialog/CHANGEPASSWORD_PASSWORDS_DIFFERENT'), Message.Type.ERROR));
                        arInputs.push('confirmPassword'); 
                    }
                    isValid = isValid && result; 
                    break;
            }
        }, this);
            
        return { 
            isValid: isValid,
            arError: arError,
            arInputs: arInputs,
            policiesResult: policiesResult
        };
    };

    /**
    * @method
    * @param {PasswordPolicies} policies
    */
    p.setPolicies = function (policies) {
        if (policies instanceof PasswordPolicies) {
            this.policies = policies;
        }
    };

    /**
    * @method
    * Test a string for password policies. Object "policies" indicates which policy has to be tested.  
    * @param {String} str
    * @param {PasswordPolicies} policies
    * @return {PoliciesResult}
    */
    p.testPolicies = function (str, policies) {
        str = '' + str;

        var result = {
            alphanumeric: true,
            mixedCase: true,
            minLength: true,
            specialChar: true
        };
        
        if (policies.alphanumeric) {
            result.alphanumeric = StringUtils.containsNumericAndAlphanumeric(str);
        }
        
        if (policies.mixedCase) {
            result.mixedCase = StringUtils.containsMixedCase(str);
        }
        
        if (policies.minLength) {
            result.minLength = StringUtils.testMinLength(str, policies.minLength);
        }

        if (policies.specialChar) {
            result.specialChar = StringUtils.containsSpecial(str);
        }

        return result;
    };

    p.dispose = function () {
    };

    function _text(key) {
        return brease.language.getText(key);
    }

    return Validator;
});
