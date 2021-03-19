define(function () {

    /**
        * @class system.widgets.ChangePasswordDialog.libs.Message
        */

    'use strict';

    function Message(content, type) {
        this.content = content || '';
        this.type = type || Message.Type.INFO;
    }
    
    Message.Type = {
        SUCCESS: 'success',
        INFO: 'info',
        WARNING: 'warning',
        ERROR: 'error'
    };

    return Message;
});
