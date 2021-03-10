define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Implements a typed commoand with command parameters and command result. A command call may be executed asynchronous.
     * Thus the execution and the optional result is acknowledged and returned via a callback.
     *
     * @class Command
     * @template T_COMMAND_PARS Specifies the command parameters type
     * @template T_COMMAND_RESULT Specifies the command result type
     */
    var Command = /** @class */ (function () {
        /**
         * Creates an instance of Command.
         * @memberof Command
         */
        function Command(caller, commandExecutionDelegate) {
            // Holds an instance of the command response handler
            this._commandResponse = new CommandExecutionResponse(this);
            // Holds the execution state
            this._commandExecutionState = CommandExecutionState.READY;
            this._caller = caller;
            this._commandExecutionDelegate = commandExecutionDelegate;
            this._commandExecutionState = CommandExecutionState.READY;
        }
        /**
         * Creates a command instance
         *
         * @static
         * @template T_COMMAND_PARS
         * @template T_COMMAND_RESULT
         * @returns {Command<T_COMMAND_PARS, T_COMMAND_RESULT>}
         * @memberof Command
         */
        Command.create = function (caller, commandExecutionDelegate) {
            return new Command(caller, commandExecutionDelegate.bind(caller));
        };
        /**
         * Callback hook for execution success
         *
         * @param {( resultData: any) => void} onSuccess
         * @returns {Command<T_COMMAND_PARS,T_COMMAND_RESULT>}
         * @memberof Command
         */
        Command.prototype.executed = function (onSuccess) {
            if (this._commandExecutionDelegate) {
                this._commandResponse.setSuccessResponseDelegate(this.commandExecuted.bind(this), onSuccess);
            }
            return this;
        };
        /**
         * Callback hook for execution error
         *
         * @param {( rejectionInfo: any) => void} onRejection
         * @returns {Command<T_COMMAND_PARS,T_COMMAND_RESULT>}
         * @memberof Command
         */
        Command.prototype.error = function (onRejection) {
            if (this._commandExecutionDelegate) {
                this._commandResponse.setRejectionResponseDelegate(this.commandRejected.bind(this), onRejection);
            }
            return this;
        };
        /**
         * Invokes the execution of a command
         *
         * @param {T_COMMAND_PARS} [commandPars]
         * @param {(commandResult: T_COMMAND_RESULT) => void} [onSuccess]
         * @param {(errorData: any) => void} [onRejection]
         * @returns {void}
         * @memberof Command
         */
        Command.prototype.execute = function (commandPars, onSuccess, onRejection) {
            // if ther is a command method defined ?....
            if (this._commandExecutionDelegate) {
                if (this.canInvokeCommand()) {
                    this.beginCommandExecution();
                    // create a new command for execution
                    this.executeInternal(commandPars, onSuccess, onRejection);
                }
                else {
                    // if a command is still pending, we ignore the new request and notify an error...
                    var errorMsg = "The command could not be invoke because another execution is pending";
                    console.error(errorMsg);
                    if (onRejection) {
                        onRejection(errorMsg);
                    }
                }
            }
        };
        /**
         * Starts a command execution
         *
         * @private
         * @memberof Command
         */
        Command.prototype.beginCommandExecution = function () {
            this._commandExecutionState = CommandExecutionState.PENDING;
        };
        /**
         * Terminates a command execution
         *
         * @private
         * @memberof Command
         */
        Command.prototype.endCommandExecution = function () {
            this._commandExecutionState = CommandExecutionState.READY;
        };
        /**
         * Creates and invokes a new command
         *
         * @private
         * @param {(T_COMMAND_PARS | undefined)} commandPars
         * @param {(((commandResult: T_COMMAND_RESULT) => void) | undefined)} onSuccess
         * @param {(((errorData: any) => void) | undefined)} onRejection
         * @memberof Command
         */
        Command.prototype.invokeNewCommand = function (commandPars, onSuccess, onRejection) {
            // create new command
            var command = Command.create(this._caller, this._commandExecutionDelegate);
            // execute this command
            command.executeInternal(commandPars, onSuccess, onRejection);
        };
        /**
         * Returns if a command can be invoked
         *
         * @returns {*}
         * @memberof Command
         */
        Command.prototype.canInvokeCommand = function () {
            return this._commandExecutionState === CommandExecutionState.READY;
        };
        /**
         * Invokes the internal execution of the command
         *
         * @private
         * @param {T_COMMAND_PARS} [commandPars]
         * @param {(commandResult: T_COMMAND_RESULT) => void} [onSuccess]
         * @param {(errorData: any) => void} [onRejection]
         * @returns {void}
         * @memberof Command
         */
        Command.prototype.executeInternal = function (commandPars, onSuccess, onRejection) {
            // if there is a command method defined ?....
            if (this._commandExecutionDelegate) {
                // install execution delegates
                this._commandResponse.setSuccessResponseDelegate(this.commandExecuted.bind(this), onSuccess);
                this._commandResponse.setRejectionResponseDelegate(this.commandRejected.bind(this), onRejection);
                // invoke the execution delegate
                this._commandExecutionDelegate(commandPars, this._commandResponse);
            }
            return;
        };
        /**
         * Controls the success command execution
         *
         * @param {T_COMMAND_PARS} [commandPars]
         * @memberof Command
         */
        Command.prototype.commandExecuted = function (successResultData) {
            console.log("Command.commandExecuted: %o %o", this, successResultData);
            if (this._commandResponse.notifyCommandExecution) {
                this._commandResponse.notifyCommandExecution(successResultData);
            }
            this.endCommandExecution();
        };
        /**
         * Controls the rejection command execution
         *
         * @param {T_COMMAND_PARS} [commandPars]
         * @memberof Command
         */
        Command.prototype.commandRejected = function (errorData) {
            console.log("Command.commandRejected: %o", this, errorData);
            if (this._commandResponse.notifyCommandRejection) {
                this._commandResponse.notifyCommandRejection(errorData);
            }
            this.endCommandExecution();
        };
        return Command;
    }());
    exports.Command = Command;
    /**
     * Implements handling the command execution response.
     *
     * @class CommandExecutionResponse
     * @implements {ICommandExecutionResponseDelegate<T_COMMAND_RESULT>}
     * @template T_COMMMAND_PARS
     * @template T_COMMAND_RESULT
     */
    var CommandExecutionResponse = /** @class */ (function () {
        /**
         * Creates an instance of CommandExecutionResponse.
         * @param {Command<T_COMMMAND_PARS,T_COMMAND_RESULT>} command
         * @memberof CommandExecutionResponse
         */
        function CommandExecutionResponse(command) {
            // Holds the callback for controlling commadn rejection
            this._rejectionCallback = function () { console.error("CommandExecutionResponse: No execution delegate defined!"); };
            // Holds the callback for controlling command execution
            this._executionCallback = function () { console.error("CommandExecutionResponse: No success delegate defined!"); };
            this._command = command;
        }
        /**
         * Sets the delegate for responding the successful execution of the command
         *
         * @param {( resultData: any) => any} executed
         * @returns {*}
         * @memberof CommandExecutionResponse
         */
        CommandExecutionResponse.prototype.setClientSuccessResponseDelegate = function (executed) {
            this._clientExecutionCallback = executed;
        };
        /**
         * Sets the delegate for responding the rejection of the command
         *
         * @param {( rejectionInfo: any) => any} onError
         * @returns {*}
         * @memberof CommandExecutionResponse
         */
        CommandExecutionResponse.prototype.setClientRejectionResponseDelegate = function (onError) {
            this._clientRejectionCallback = onError;
        };
        Object.defineProperty(CommandExecutionResponse.prototype, "notifyCommandExecution", {
            /**
             * Gets the execution callbacks
             *
             * @readonly
             * @memberof CommandExecutionResponse
             */
            get: function () {
                return this._clientExecutionCallback;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CommandExecutionResponse.prototype, "notifyCommandRejection", {
            /**
             * Gets the rejection callbacks
             *
             * @readonly
             * @memberof CommandExecutionResponse
             */
            get: function () {
                return this._clientRejectionCallback;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Called when the command has been executed succssful. It calles the success delegates and passes the result parameters to them.
         *
         * @param {*} [resultData=null]
         * @memberof CommandExecutionResponse
         */
        CommandExecutionResponse.prototype.executed = function (resultData) {
            if (resultData === void 0) { resultData = null; }
            this.onResponsecommandExecutedSuccessfull(resultData);
        };
        ;
        /**
         * Called when the command has been rejected. It calls the rejection delegates and passes the rejection info to them.
         *
         * @param {*} rejectionInfo
         * @memberof CommandExecutionResponse
         */
        CommandExecutionResponse.prototype.rejected = function (rejectionInfo) {
            this.onResponseTaskExecutedWithError(rejectionInfo);
        };
        ;
        /**
         * Handles forwarding the command success.
         *
         * @private
         * @param {ICommandExecutionResponseDelegate<T_COMMAND_RESULT>} successResultData
         * @memberof CommandExecutionResponse
         */
        CommandExecutionResponse.prototype.onResponsecommandExecutedSuccessfull = function (successResultData) {
            // invoke the execution callbacks
            this._executionCallback(successResultData);
        };
        /**
         * Handles forwarding the command rejection.
         *
         * @private
         * @param {ICommandExecutionResponseDelegate<T_COMMAND_RESULT>} errorResponseData
         * @memberof CommandExecutionResponse
         */
        CommandExecutionResponse.prototype.onResponseTaskExecutedWithError = function (errorResponseData) {
            // invoke the rejection callbacks
            this._rejectionCallback(errorResponseData);
        };
        /**
         * Sets the execution control delegate
         *
         * @param {(commandPars?: any ) => void} commandExecuted
         * @returns {*}
         * @memberof CommandExecutionResponse
         */
        CommandExecutionResponse.prototype.setSuccessResponseDelegate = function (commandExecuted, onSuccess) {
            this._executionCallback = commandExecuted;
            if (onSuccess) {
                this.setClientSuccessResponseDelegate(onSuccess);
            }
        };
        /**
      * Sets the rejection control delegate
      *
      * @param {(commandPars?: any) => void} commandRejected
      * @returns {*}
      * @memberof CommandExecutionResponse
      */
        CommandExecutionResponse.prototype.setRejectionResponseDelegate = function (commandRejected, onError) {
            this._rejectionCallback = commandRejected;
            if (onError) {
                this.setClientRejectionResponseDelegate(onError);
            }
        };
        return CommandExecutionResponse;
    }());
    var CommandExecutionState;
    (function (CommandExecutionState) {
        CommandExecutionState[CommandExecutionState["READY"] = 0] = "READY";
        CommandExecutionState[CommandExecutionState["PENDING"] = 1] = "PENDING";
    })(CommandExecutionState || (CommandExecutionState = {}));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcHAvZnJhbWV3b3JrL2NvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBQ0E7Ozs7Ozs7T0FPRztJQUNIO1FBVUk7OztXQUdHO1FBQ0gsaUJBQW9CLE1BQVcsRUFBRSx3QkFBcUY7WUFWdEgsb0RBQW9EO1lBQzVDLHFCQUFnQixHQUErRCxJQUFJLHdCQUF3QixDQUFDLElBQUksQ0FBQyxDQUFDO1lBRTFILDRCQUE0QjtZQUNwQiwyQkFBc0IsR0FBeUIscUJBQXFCLENBQUMsS0FBSyxDQUFDO1lBTy9FLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1lBQ3RCLElBQUksQ0FBQyx5QkFBeUIsR0FBRyx3QkFBd0IsQ0FBQztZQUMxRCxJQUFJLENBQUMsc0JBQXNCLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDO1FBQzlELENBQUM7UUFFRDs7Ozs7Ozs7V0FRRztRQUNJLGNBQU0sR0FBYixVQUFnRCxNQUFXLEVBQUUsd0JBQXFGO1lBQzlJLE9BQU8sSUFBSSxPQUFPLENBQW1DLE1BQU0sRUFBRSx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUN4RyxDQUFDO1FBR0Q7Ozs7OztXQU1HO1FBQ0gsMEJBQVEsR0FBUixVQUFTLFNBQW9DO1lBQ3pDLElBQUksSUFBSSxDQUFDLHlCQUF5QixFQUFFO2dCQUNoQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsU0FBUyxDQUFDLENBQUM7YUFDL0Y7WUFDRCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0gsdUJBQUssR0FBTCxVQUFNLFdBQXlDO1lBQzNDLElBQUksSUFBSSxDQUFDLHlCQUF5QixFQUFFO2dCQUNoQyxJQUFJLENBQUMsZ0JB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cUJBR0o7SUFIRCxXQUFLLHFCQUFxQjtRQUN0QixtRUFBSyxDQUFBO1FBQ0wsdUVBQU8sQ0FBQTtJQUNYLENBQUMsRUFISSxxQkFBcUIsS0FBckIscUJBQXFCLFFBR3pCIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi8qKlxyXG4gKiBJbXBsZW1lbnRzIGEgdHlwZWQgY29tbW9hbmQgd2l0aCBjb21tYW5kIHBhcmFtZXRlcnMgYW5kIGNvbW1hbmQgcmVzdWx0LiBBIGNvbW1hbmQgY2FsbCBtYXkgYmUgZXhlY3V0ZWQgYXN5bmNocm9ub3VzLlxyXG4gKiBUaHVzIHRoZSBleGVjdXRpb24gYW5kIHRoZSBvcHRpb25hbCByZXN1bHQgaXMgYWNrbm93bGVkZ2VkIGFuZCByZXR1cm5lZCB2aWEgYSBjYWxsYmFjay5cclxuICogXHJcbiAqIEBjbGFzcyBDb21tYW5kXHJcbiAqIEB0ZW1wbGF0ZSBUX0NPTU1BTkRfUEFSUyBTcGVjaWZpZXMgdGhlIGNvbW1hbmQgcGFyYW1ldGVycyB0eXBlXHJcbiAqIEB0ZW1wbGF0ZSBUX0NPTU1BTkRfUkVTVUxUIFNwZWNpZmllcyB0aGUgY29tbWFuZCByZXN1bHQgdHlwZVxyXG4gKi9cclxuY2xhc3MgQ29tbWFuZDxUX0NPTU1BTkRfUEFSUywgVF9DT01NQU5EX1JFU1VMVD4ge1xyXG5cclxuICAgIC8vIEhvbGRzIHRoZSBkZWxlZ2F0ZSB0byB0aGUgbWV0aG9kIHRvIGV4ZWN1dGVkLlxyXG4gICAgcHJpdmF0ZSBfY29tbWFuZEV4ZWN1dGlvbkRlbGVnYXRlOiBJQ29tbWFuZEV4ZWN1dGlvbkRlbGVnYXRlPFRfQ09NTUFORF9QQVJTLCBUX0NPTU1BTkRfUkVTVUxUPjtcclxuICAgIC8vIEhvbGRzIGFuIGluc3RhbmNlIG9mIHRoZSBjb21tYW5kIHJlc3BvbnNlIGhhbmRsZXJcclxuICAgIHByaXZhdGUgX2NvbW1hbmRSZXNwb25zZTogQ29tbWFuZEV4ZWN1dGlvblJlc3BvbnNlPFRfQ09NTUFORF9QQVJTLCBUX0NPTU1BTkRfUkVTVUxUPiA9IG5ldyBDb21tYW5kRXhlY3V0aW9uUmVzcG9uc2UodGhpcyk7XHJcbiAgICBwcml2YXRlIF9jYWxsZXI6IGFueTtcclxuICAgIC8vIEhvbGRzIHRoZSBleGVjdXRpb24gc3RhdGVcclxuICAgIHByaXZhdGUgX2NvbW1hbmRFeGVjdXRpb25TdGF0ZTpDb21tYW5kRXhlY3V0aW9uU3RhdGUgPSBDb21tYW5kRXhlY3V0aW9uU3RhdGUuUkVBRFk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIENvbW1hbmQuXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tbWFuZFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKGNhbGxlcjogYW55LCBjb21tYW5kRXhlY3V0aW9uRGVsZWdhdGU6IElDb21tYW5kRXhlY3V0aW9uRGVsZWdhdGU8VF9DT01NQU5EX1BBUlMsIFRfQ09NTUFORF9SRVNVTFQ+KSB7XHJcbiAgICAgICAgdGhpcy5fY2FsbGVyID0gY2FsbGVyO1xyXG4gICAgICAgIHRoaXMuX2NvbW1hbmRFeGVjdXRpb25EZWxlZ2F0ZSA9IGNvbW1hbmRFeGVjdXRpb25EZWxlZ2F0ZTtcclxuICAgICAgICB0aGlzLl9jb21tYW5kRXhlY3V0aW9uU3RhdGUgPSBDb21tYW5kRXhlY3V0aW9uU3RhdGUuUkVBRFk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgY29tbWFuZCBpbnN0YW5jZVxyXG4gICAgICpcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEB0ZW1wbGF0ZSBUX0NPTU1BTkRfUEFSU1xyXG4gICAgICogQHRlbXBsYXRlIFRfQ09NTUFORF9SRVNVTFRcclxuICAgICAqIEByZXR1cm5zIHtDb21tYW5kPFRfQ09NTUFORF9QQVJTLCBUX0NPTU1BTkRfUkVTVUxUPn1cclxuICAgICAqIEBtZW1iZXJvZiBDb21tYW5kXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBjcmVhdGU8VF9DT01NQU5EX1BBUlMsIFRfQ09NTUFORF9SRVNVTFQ+KGNhbGxlcjogYW55LCBjb21tYW5kRXhlY3V0aW9uRGVsZWdhdGU6IElDb21tYW5kRXhlY3V0aW9uRGVsZWdhdGU8VF9DT01NQU5EX1BBUlMsIFRfQ09NTUFORF9SRVNVTFQ+KTogQ29tbWFuZDxUX0NPTU1BTkRfUEFSUywgVF9DT01NQU5EX1JFU1VMVD4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgQ29tbWFuZDxUX0NPTU1BTkRfUEFSUywgVF9DT01NQU5EX1JFU1VMVD4oY2FsbGVyLCBjb21tYW5kRXhlY3V0aW9uRGVsZWdhdGUuYmluZChjYWxsZXIpKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsYmFjayBob29rIGZvciBleGVjdXRpb24gc3VjY2Vzc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7KCByZXN1bHREYXRhOiBhbnkpID0+IHZvaWR9IG9uU3VjY2Vzc1xyXG4gICAgICogQHJldHVybnMge0NvbW1hbmQ8VF9DT01NQU5EX1BBUlMsVF9DT01NQU5EX1JFU1VMVD59XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tbWFuZFxyXG4gICAgICovXHJcbiAgICBleGVjdXRlZChvblN1Y2Nlc3M6IChyZXN1bHREYXRhOiBhbnkpID0+IHZvaWQpOiBDb21tYW5kPFRfQ09NTUFORF9QQVJTLCBUX0NPTU1BTkRfUkVTVUxUPiB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NvbW1hbmRFeGVjdXRpb25EZWxlZ2F0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jb21tYW5kUmVzcG9uc2Uuc2V0U3VjY2Vzc1Jlc3BvbnNlRGVsZWdhdGUodGhpcy5jb21tYW5kRXhlY3V0ZWQuYmluZCh0aGlzKSxvblN1Y2Nlc3MpOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxiYWNrIGhvb2sgZm9yIGV4ZWN1dGlvbiBlcnJvclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7KCByZWplY3Rpb25JbmZvOiBhbnkpID0+IHZvaWR9IG9uUmVqZWN0aW9uXHJcbiAgICAgKiBAcmV0dXJucyB7Q29tbWFuZDxUX0NPTU1BTkRfUEFSUyxUX0NPTU1BTkRfUkVTVUxUPn1cclxuICAgICAqIEBtZW1iZXJvZiBDb21tYW5kXHJcbiAgICAgKi9cclxuICAgIGVycm9yKG9uUmVqZWN0aW9uOiAocmVqZWN0aW9uSW5mbzogYW55KSA9PiB2b2lkKTogQ29tbWFuZDxUX0NPTU1BTkRfUEFSUywgVF9DT01NQU5EX1JFU1VMVD4ge1xyXG4gICAgICAgIGlmICh0aGlzLl9jb21tYW5kRXhlY3V0aW9uRGVsZWdhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fY29tbWFuZFJlc3BvbnNlLnNldFJlamVjdGlvblJlc3BvbnNlRGVsZWdhdGUodGhpcy5jb21tYW5kUmVqZWN0ZWQuYmluZCh0aGlzKSxvblJlamVjdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW52b2tlcyB0aGUgZXhlY3V0aW9uIG9mIGEgY29tbWFuZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7VF9DT01NQU5EX1BBUlN9IFtjb21tYW5kUGFyc11cclxuICAgICAqIEBwYXJhbSB7KGNvbW1hbmRSZXN1bHQ6IFRfQ09NTUFORF9SRVNVTFQpID0+IHZvaWR9IFtvblN1Y2Nlc3NdXHJcbiAgICAgKiBAcGFyYW0geyhlcnJvckRhdGE6IGFueSkgPT4gdm9pZH0gW29uUmVqZWN0aW9uXVxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tbWFuZFxyXG4gICAgICovXHJcbiAgICBleGVjdXRlKGNvbW1hbmRQYXJzPzogVF9DT01NQU5EX1BBUlMsIG9uU3VjY2Vzcz86IChjb21tYW5kUmVzdWx0OiBUX0NPTU1BTkRfUkVTVUxUKSA9PiB2b2lkLCBvblJlamVjdGlvbj86IChlcnJvckRhdGE6IGFueSkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGlmIHRoZXIgaXMgYSBjb21tYW5kIG1ldGhvZCBkZWZpbmVkID8uLi4uXHJcbiAgICAgICAgaWYgKHRoaXMuX2NvbW1hbmRFeGVjdXRpb25EZWxlZ2F0ZSkge1xyXG4gICAgICAgICAgICBpZih0aGlzLmNhbkludm9rZUNvbW1hbmQoKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJlZ2luQ29tbWFuZEV4ZWN1dGlvbigpO1xyXG4gICAgICAgICAgICAgICAgLy8gY3JlYXRlIGEgbmV3IGNvbW1hbmQgZm9yIGV4ZWN1dGlvblxyXG4gICAgICAgICAgICAgICAgdGhpcy5leGVjdXRlSW50ZXJuYWwoY29tbWFuZFBhcnMsIG9uU3VjY2Vzcywgb25SZWplY3Rpb24pO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIC8vIGlmIGEgY29tbWFuZCBpcyBzdGlsbCBwZW5kaW5nLCB3ZSBpZ25vcmUgdGhlIG5ldyByZXF1ZXN0IGFuZCBub3RpZnkgYW4gZXJyb3IuLi5cclxuICAgICAgICAgICAgICAgIGxldCBlcnJvck1zZyA9IFwiVGhlIGNvbW1hbmQgY291bGQgbm90IGJlIGludm9rZSBiZWNhdXNlIGFub3RoZXIgZXhlY3V0aW9uIGlzIHBlbmRpbmdcIjtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3JNc2cpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG9uUmVqZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb25SZWplY3Rpb24oZXJyb3JNc2cpOyAgXHJcbiAgICAgICAgICAgICAgICB9ICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdGFydHMgYSBjb21tYW5kIGV4ZWN1dGlvblxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tbWFuZFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGJlZ2luQ29tbWFuZEV4ZWN1dGlvbigpIHtcclxuICAgICAgICB0aGlzLl9jb21tYW5kRXhlY3V0aW9uU3RhdGUgPSBDb21tYW5kRXhlY3V0aW9uU3RhdGUuUEVORElORztcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUZXJtaW5hdGVzIGEgY29tbWFuZCBleGVjdXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIENvbW1hbmRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBlbmRDb21tYW5kRXhlY3V0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuX2NvbW1hbmRFeGVjdXRpb25TdGF0ZSA9IENvbW1hbmRFeGVjdXRpb25TdGF0ZS5SRUFEWTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW5kIGludm9rZXMgYSBuZXcgY29tbWFuZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyhUX0NPTU1BTkRfUEFSUyB8IHVuZGVmaW5lZCl9IGNvbW1hbmRQYXJzXHJcbiAgICAgKiBAcGFyYW0geygoKGNvbW1hbmRSZXN1bHQ6IFRfQ09NTUFORF9SRVNVTFQpID0+IHZvaWQpIHwgdW5kZWZpbmVkKX0gb25TdWNjZXNzXHJcbiAgICAgKiBAcGFyYW0geygoKGVycm9yRGF0YTogYW55KSA9PiB2b2lkKSB8IHVuZGVmaW5lZCl9IG9uUmVqZWN0aW9uXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tbWFuZFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGludm9rZU5ld0NvbW1hbmQoY29tbWFuZFBhcnM6IFRfQ09NTUFORF9QQVJTIHwgdW5kZWZpbmVkLCBvblN1Y2Nlc3M6ICgoY29tbWFuZFJlc3VsdDogVF9DT01NQU5EX1JFU1VMVCkgPT4gdm9pZCkgfCB1bmRlZmluZWQsIG9uUmVqZWN0aW9uOiAoKGVycm9yRGF0YTogYW55KSA9PiB2b2lkKSB8IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIC8vIGNyZWF0ZSBuZXcgY29tbWFuZFxyXG4gICAgICAgIGxldCBjb21tYW5kID0gQ29tbWFuZC5jcmVhdGU8VF9DT01NQU5EX1BBUlMsIFRfQ09NTUFORF9SRVNVTFQ+KHRoaXMuX2NhbGxlciwgdGhpcy5fY29tbWFuZEV4ZWN1dGlvbkRlbGVnYXRlKTtcclxuICAgICAgICAvLyBleGVjdXRlIHRoaXMgY29tbWFuZFxyXG4gICAgICAgIGNvbW1hbmQuZXhlY3V0ZUludGVybmFsKGNvbW1hbmRQYXJzLCBvblN1Y2Nlc3MsIG9uUmVqZWN0aW9uKTsgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBpZiBhIGNvbW1hbmQgY2FuIGJlIGludm9rZWRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBDb21tYW5kXHJcbiAgICAgKi9cclxuICAgIGNhbkludm9rZUNvbW1hbmQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbW1hbmRFeGVjdXRpb25TdGF0ZSA9PT0gQ29tbWFuZEV4ZWN1dGlvblN0YXRlLlJFQURZO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEludm9rZXMgdGhlIGludGVybmFsIGV4ZWN1dGlvbiBvZiB0aGUgY29tbWFuZFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge1RfQ09NTUFORF9QQVJTfSBbY29tbWFuZFBhcnNdXHJcbiAgICAgKiBAcGFyYW0geyhjb21tYW5kUmVzdWx0OiBUX0NPTU1BTkRfUkVTVUxUKSA9PiB2b2lkfSBbb25TdWNjZXNzXVxyXG4gICAgICogQHBhcmFtIHsoZXJyb3JEYXRhOiBhbnkpID0+IHZvaWR9IFtvblJlamVjdGlvbl1cclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICogQG1lbWJlcm9mIENvbW1hbmRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBleGVjdXRlSW50ZXJuYWwoY29tbWFuZFBhcnM/OiBUX0NPTU1BTkRfUEFSUywgb25TdWNjZXNzPzogKGNvbW1hbmRSZXN1bHQ6IFRfQ09NTUFORF9SRVNVTFQpID0+IHZvaWQsIG9uUmVqZWN0aW9uPzogKGVycm9yRGF0YTogYW55KSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgLy8gaWYgdGhlcmUgaXMgYSBjb21tYW5kIG1ldGhvZCBkZWZpbmVkID8uLi4uXHJcbiAgICAgICAgaWYgKHRoaXMuX2NvbW1hbmRFeGVjdXRpb25EZWxlZ2F0ZSkge1xyXG4gICAgICAgICAgICAvLyBpbnN0YWxsIGV4ZWN1dGlvbiBkZWxlZ2F0ZXNcclxuICAgICAgICAgICAgdGhpcy5fY29tbWFuZFJlc3BvbnNlLnNldFN1Y2Nlc3NSZXNwb25zZURlbGVnYXRlKHRoaXMuY29tbWFuZEV4ZWN1dGVkLmJpbmQodGhpcyksb25TdWNjZXNzKTtcclxuICAgICAgICAgICAgdGhpcy5fY29tbWFuZFJlc3BvbnNlLnNldFJlamVjdGlvblJlc3BvbnNlRGVsZWdhdGUodGhpcy5jb21tYW5kUmVqZWN0ZWQuYmluZCh0aGlzKSxvblJlamVjdGlvbik7XHJcblxyXG4gICAgICAgICAgICAvLyBpbnZva2UgdGhlIGV4ZWN1dGlvbiBkZWxlZ2F0ZVxyXG4gICAgICAgICAgICB0aGlzLl9jb21tYW5kRXhlY3V0aW9uRGVsZWdhdGUoY29tbWFuZFBhcnMsIHRoaXMuX2NvbW1hbmRSZXNwb25zZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb250cm9scyB0aGUgc3VjY2VzcyBjb21tYW5kIGV4ZWN1dGlvblxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7VF9DT01NQU5EX1BBUlN9IFtjb21tYW5kUGFyc11cclxuICAgICAqIEBtZW1iZXJvZiBDb21tYW5kXHJcbiAgICAgKi9cclxuICAgIGNvbW1hbmRFeGVjdXRlZChzdWNjZXNzUmVzdWx0RGF0YT86IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ29tbWFuZC5jb21tYW5kRXhlY3V0ZWQ6ICVvICVvXCIsdGhpcyxzdWNjZXNzUmVzdWx0RGF0YSk7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NvbW1hbmRSZXNwb25zZS5ub3RpZnlDb21tYW5kRXhlY3V0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbW1hbmRSZXNwb25zZS5ub3RpZnlDb21tYW5kRXhlY3V0aW9uKHN1Y2Nlc3NSZXN1bHREYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5lbmRDb21tYW5kRXhlY3V0aW9uKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29udHJvbHMgdGhlIHJlamVjdGlvbiBjb21tYW5kIGV4ZWN1dGlvblxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7VF9DT01NQU5EX1BBUlN9IFtjb21tYW5kUGFyc11cclxuICAgICAqIEBtZW1iZXJvZiBDb21tYW5kXHJcbiAgICAgKi9cclxuICAgIGNvbW1hbmRSZWplY3RlZChlcnJvckRhdGE/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkNvbW1hbmQuY29tbWFuZFJlamVjdGVkOiAlb1wiLHRoaXMsZXJyb3JEYXRhKTtcclxuICAgICAgICBpZiAodGhpcy5fY29tbWFuZFJlc3BvbnNlLm5vdGlmeUNvbW1hbmRSZWplY3Rpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5fY29tbWFuZFJlc3BvbnNlLm5vdGlmeUNvbW1hbmRSZWplY3Rpb24oZXJyb3JEYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5lbmRDb21tYW5kRXhlY3V0aW9uKCk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBcclxufVxyXG5cclxuLyoqXHJcbiAqIERlY2xhcmVzIHRoZSBpbnRlcmZhY2UgZm9yIHJlc3BvbmRpbmcgdGhlIHN1Y2Nlc3NmdWxsIGV4ZWN1dGlvbiBvZiBhIGNvbW1hbmRcclxuICpcclxuICogQGludGVyZmFjZSBJQ29tbWFuZEV4ZWN1dGlvblJlc3BvbnNlRGVsZWdhdGVcclxuICogQHRlbXBsYXRlIFRfQ09NTUFORF9SRVNVTFRcclxuICovXHJcbmludGVyZmFjZSBJQ29tbWFuZEV4ZWN1dGlvblJlc3BvbnNlRGVsZWdhdGU8VF9DT01NQU5EX1JFU1VMVD4ge1xyXG4gICAgZXhlY3V0ZWQ6IChjb21tYW5kUmVzdWx0PzogVF9DT01NQU5EX1JFU1VMVCkgPT4gdm9pZDtcclxuICAgIHJlamVjdGVkOiAoZXJyb3JEYXRhOiBhbnkpID0+IHZvaWQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEZWNsYXJlcyB0aGUgZGVsZWdhdGUgc2lnbmF0dXJlIGZvciBjb21tYW5kIGV4ZWN1dGlvblxyXG4gKlxyXG4gKiBAaW50ZXJmYWNlIElDb21tYW5kRXhlY3V0aW9uRGVsZWdhdGVcclxuICogQHRlbXBsYXRlIFRfQ09NTUFORF9QQVJTXHJcbiAqIEB0ZW1wbGF0ZSBUX0NPTU1BTkRfUkVTVUxUXHJcbiAqL1xyXG5pbnRlcmZhY2UgSUNvbW1hbmRFeGVjdXRpb25EZWxlZ2F0ZTxUX0NPTU1BTkRfUEFSUywgVF9DT01NQU5EX1JFU1VMVD4ge1xyXG4gICAgKGNvbW1hbmRQYXJzOiBUX0NPTU1BTkRfUEFSUyB8IHVuZGVmaW5lZCwgY29tbWFuZERlbGVnYXRlOiBJQ29tbWFuZEV4ZWN1dGlvblJlc3BvbnNlRGVsZWdhdGU8VF9DT01NQU5EX1JFU1VMVD4pOiB2b2lkO1xyXG59XHJcblxyXG4vKipcclxuICogSW1wbGVtZW50cyBoYW5kbGluZyB0aGUgY29tbWFuZCBleGVjdXRpb24gcmVzcG9uc2UuXHJcbiAqXHJcbiAqIEBjbGFzcyBDb21tYW5kRXhlY3V0aW9uUmVzcG9uc2VcclxuICogQGltcGxlbWVudHMge0lDb21tYW5kRXhlY3V0aW9uUmVzcG9uc2VEZWxlZ2F0ZTxUX0NPTU1BTkRfUkVTVUxUPn1cclxuICogQHRlbXBsYXRlIFRfQ09NTU1BTkRfUEFSU1xyXG4gKiBAdGVtcGxhdGUgVF9DT01NQU5EX1JFU1VMVFxyXG4gKi9cclxuY2xhc3MgQ29tbWFuZEV4ZWN1dGlvblJlc3BvbnNlPFRfQ09NTU1BTkRfUEFSUywgVF9DT01NQU5EX1JFU1VMVD4gaW1wbGVtZW50cyBJQ29tbWFuZEV4ZWN1dGlvblJlc3BvbnNlRGVsZWdhdGU8VF9DT01NQU5EX1JFU1VMVD4ge1xyXG5cclxuXHJcbiAgICAvLyBIb2xkcyB0aGUgZXhlY3V0aW9uIGRlbGVnYXRlc1xyXG4gICAgcHJpdmF0ZSBfY2xpZW50RXhlY3V0aW9uQ2FsbGJhY2shOiAocmVzdWx0RGF0YTogYW55KSA9PiBhbnkgfCB1bmRlZmluZWQ7XHJcbiAgICAvLyBIb2xkcyB0aGUgcmVqZWN0aW9uIGRlbGVnYXRlc1xyXG4gICAgcHJpdmF0ZSBfY2xpZW50UmVqZWN0aW9uQ2FsbGJhY2shOiAocmVqZWN0aW9uSW5mbzogYW55KSA9PiBhbnkgfCB1bmRlZmluZWQ7XHJcbiAgICAvLyBIb2xkcyB0aGUgYXNzaWNpYXRlZCBjb21tYW5kXHJcbiAgICBwcml2YXRlIF9jb21tYW5kOiBDb21tYW5kPFRfQ09NTU1BTkRfUEFSUywgVF9DT01NQU5EX1JFU1VMVD47XHJcbiAgICAvLyBIb2xkcyB0aGUgY2FsbGJhY2sgZm9yIGNvbnRyb2xsaW5nIGNvbW1hZG4gcmVqZWN0aW9uXHJcbiAgICBwcml2YXRlIF9yZWplY3Rpb25DYWxsYmFjazogKGNvbW1hbmRQYXJzPzogYW55KSA9PiB2b2lkID0gKCk9PnsgY29uc29sZS5lcnJvcihcIkNvbW1hbmRFeGVjdXRpb25SZXNwb25zZTogTm8gZXhlY3V0aW9uIGRlbGVnYXRlIGRlZmluZWQhXCIpO307XHJcbiAgICAvLyBIb2xkcyB0aGUgY2FsbGJhY2sgZm9yIGNvbnRyb2xsaW5nIGNvbW1hbmQgZXhlY3V0aW9uXHJcbiAgICBwcml2YXRlIF9leGVjdXRpb25DYWxsYmFjazogKGNvbW1hbmRQYXJzPzogYW55KSA9PiB2b2lkID0gKCk9PnsgY29uc29sZS5lcnJvcihcIkNvbW1hbmRFeGVjdXRpb25SZXNwb25zZTogTm8gc3VjY2VzcyBkZWxlZ2F0ZSBkZWZpbmVkIVwiKTt9O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGRlbGVnYXRlIGZvciByZXNwb25kaW5nIHRoZSBzdWNjZXNzZnVsIGV4ZWN1dGlvbiBvZiB0aGUgY29tbWFuZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7KCByZXN1bHREYXRhOiBhbnkpID0+IGFueX0gZXhlY3V0ZWRcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIENvbW1hbmRFeGVjdXRpb25SZXNwb25zZVxyXG4gICAgICovXHJcbiAgICBzZXRDbGllbnRTdWNjZXNzUmVzcG9uc2VEZWxlZ2F0ZShleGVjdXRlZDogKHJlc3VsdERhdGE6IGFueSkgPT4gYW55KTogYW55IHtcclxuICAgICAgICB0aGlzLl9jbGllbnRFeGVjdXRpb25DYWxsYmFjayA9IGV4ZWN1dGVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgZGVsZWdhdGUgZm9yIHJlc3BvbmRpbmcgdGhlIHJlamVjdGlvbiBvZiB0aGUgY29tbWFuZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7KCByZWplY3Rpb25JbmZvOiBhbnkpID0+IGFueX0gb25FcnJvclxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tbWFuZEV4ZWN1dGlvblJlc3BvbnNlXHJcbiAgICAgKi9cclxuICAgIHNldENsaWVudFJlamVjdGlvblJlc3BvbnNlRGVsZWdhdGUob25FcnJvcjogKHJlamVjdGlvbkluZm86IGFueSkgPT4gYW55KTogYW55IHtcclxuICAgICAgICB0aGlzLl9jbGllbnRSZWplY3Rpb25DYWxsYmFjayA9IG9uRXJyb3I7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIENvbW1hbmRFeGVjdXRpb25SZXNwb25zZS5cclxuICAgICAqIEBwYXJhbSB7Q29tbWFuZDxUX0NPTU1NQU5EX1BBUlMsVF9DT01NQU5EX1JFU1VMVD59IGNvbW1hbmRcclxuICAgICAqIEBtZW1iZXJvZiBDb21tYW5kRXhlY3V0aW9uUmVzcG9uc2VcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoY29tbWFuZDogQ29tbWFuZDxUX0NPTU1NQU5EX1BBUlMsIFRfQ09NTUFORF9SRVNVTFQ+KSB7XHJcbiAgICAgICAgdGhpcy5fY29tbWFuZCA9IGNvbW1hbmQ7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGV4ZWN1dGlvbiBjYWxsYmFja3NcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBtZW1iZXJvZiBDb21tYW5kRXhlY3V0aW9uUmVzcG9uc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBub3RpZnlDb21tYW5kRXhlY3V0aW9uKCkgOiAgKHJlc3VsdERhdGE6IGFueSkgPT4gYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY2xpZW50RXhlY3V0aW9uQ2FsbGJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHJlamVjdGlvbiBjYWxsYmFja3NcclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBtZW1iZXJvZiBDb21tYW5kRXhlY3V0aW9uUmVzcG9uc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBub3RpZnlDb21tYW5kUmVqZWN0aW9uKCkgOiAocmVqZWN0aW9uSW5mbzogYW55KSA9PiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jbGllbnRSZWplY3Rpb25DYWxsYmFjaztcclxuICAgIH1cclxuICAgXHJcblxyXG4gXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIHdoZW4gdGhlIGNvbW1hbmQgaGFzIGJlZW4gZXhlY3V0ZWQgc3VjY3NzZnVsLiBJdCBjYWxsZXMgdGhlIHN1Y2Nlc3MgZGVsZWdhdGVzIGFuZCBwYXNzZXMgdGhlIHJlc3VsdCBwYXJhbWV0ZXJzIHRvIHRoZW0uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBbcmVzdWx0RGF0YT1udWxsXVxyXG4gICAgICogQG1lbWJlcm9mIENvbW1hbmRFeGVjdXRpb25SZXNwb25zZVxyXG4gICAgICovXHJcbiAgICBleGVjdXRlZChyZXN1bHREYXRhOiBhbnkgPSBudWxsKSB7XHJcbiAgICAgICAgdGhpcy5vblJlc3BvbnNlY29tbWFuZEV4ZWN1dGVkU3VjY2Vzc2Z1bGwocmVzdWx0RGF0YSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIHdoZW4gdGhlIGNvbW1hbmQgaGFzIGJlZW4gcmVqZWN0ZWQuIEl0IGNhbGxzIHRoZSByZWplY3Rpb24gZGVsZWdhdGVzIGFuZCBwYXNzZXMgdGhlIHJlamVjdGlvbiBpbmZvIHRvIHRoZW0uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSByZWplY3Rpb25JbmZvXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tbWFuZEV4ZWN1dGlvblJlc3BvbnNlXHJcbiAgICAgKi9cclxuICAgIHJlamVjdGVkKHJlamVjdGlvbkluZm86IGFueSkge1xyXG4gICAgICAgIHRoaXMub25SZXNwb25zZVRhc2tFeGVjdXRlZFdpdGhFcnJvcihyZWplY3Rpb25JbmZvKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGVzIGZvcndhcmRpbmcgdGhlIGNvbW1hbmQgc3VjY2Vzcy5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtJQ29tbWFuZEV4ZWN1dGlvblJlc3BvbnNlRGVsZWdhdGU8VF9DT01NQU5EX1JFU1VMVD59IHN1Y2Nlc3NSZXN1bHREYXRhXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tbWFuZEV4ZWN1dGlvblJlc3BvbnNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25SZXNwb25zZWNvbW1hbmRFeGVjdXRlZFN1Y2Nlc3NmdWxsKHN1Y2Nlc3NSZXN1bHREYXRhOiBJQ29tbWFuZEV4ZWN1dGlvblJlc3BvbnNlRGVsZWdhdGU8VF9DT01NQU5EX1JFU1VMVD4pIHtcclxuICAgICAgICAvLyBpbnZva2UgdGhlIGV4ZWN1dGlvbiBjYWxsYmFja3NcclxuICAgICAgICB0aGlzLl9leGVjdXRpb25DYWxsYmFjayhzdWNjZXNzUmVzdWx0RGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGVzIGZvcndhcmRpbmcgdGhlIGNvbW1hbmQgcmVqZWN0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge0lDb21tYW5kRXhlY3V0aW9uUmVzcG9uc2VEZWxlZ2F0ZTxUX0NPTU1BTkRfUkVTVUxUPn0gZXJyb3JSZXNwb25zZURhdGFcclxuICAgICAqIEBtZW1iZXJvZiBDb21tYW5kRXhlY3V0aW9uUmVzcG9uc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvblJlc3BvbnNlVGFza0V4ZWN1dGVkV2l0aEVycm9yKGVycm9yUmVzcG9uc2VEYXRhOiBJQ29tbWFuZEV4ZWN1dGlvblJlc3BvbnNlRGVsZWdhdGU8VF9DT01NQU5EX1JFU1VMVD4pIHtcclxuICAgICAgICAvLyBpbnZva2UgdGhlIHJlamVjdGlvbiBjYWxsYmFja3NcclxuICAgICAgICB0aGlzLl9yZWplY3Rpb25DYWxsYmFjayhlcnJvclJlc3BvbnNlRGF0YSk7XHJcbiAgICB9XHJcbiAgICBcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGV4ZWN1dGlvbiBjb250cm9sIGRlbGVnYXRlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsoY29tbWFuZFBhcnM/OiBhbnkgKSA9PiB2b2lkfSBjb21tYW5kRXhlY3V0ZWRcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICogQG1lbWJlcm9mIENvbW1hbmRFeGVjdXRpb25SZXNwb25zZVxyXG4gICAgICovXHJcbiAgICBzZXRTdWNjZXNzUmVzcG9uc2VEZWxlZ2F0ZShjb21tYW5kRXhlY3V0ZWQ6IChjb21tYW5kUGFycz86IGFueSApID0+IHZvaWQsIG9uU3VjY2Vzcz86IChjb21tYW5kUmVzdWx0OiBUX0NPTU1BTkRfUkVTVUxUKSA9PiB2b2lkKTogYW55IHtcclxuICAgICAgICB0aGlzLl9leGVjdXRpb25DYWxsYmFjayA9IGNvbW1hbmRFeGVjdXRlZDtcclxuICAgICAgICBpZiAob25TdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Q2xpZW50U3VjY2Vzc1Jlc3BvbnNlRGVsZWdhdGUob25TdWNjZXNzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgcmVqZWN0aW9uIGNvbnRyb2wgZGVsZWdhdGVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyhjb21tYW5kUGFycz86IGFueSkgPT4gdm9pZH0gY29tbWFuZFJlamVjdGVkXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBDb21tYW5kRXhlY3V0aW9uUmVzcG9uc2VcclxuICAgICAqL1xyXG4gICAgc2V0UmVqZWN0aW9uUmVzcG9uc2VEZWxlZ2F0ZShjb21tYW5kUmVqZWN0ZWQ6IChjb21tYW5kUGFycz86IGFueSkgPT4gdm9pZCwgb25FcnJvcj86IChlcnJvckRhdGE6IGFueSkgPT4gdm9pZCk6IGFueSB7XHJcbiAgICAgICAgdGhpcy5fcmVqZWN0aW9uQ2FsbGJhY2sgPSBjb21tYW5kUmVqZWN0ZWQ7XHJcbiAgICAgICAgaWYgKG9uRXJyb3IpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRDbGllbnRSZWplY3Rpb25SZXNwb25zZURlbGVnYXRlKG9uRXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxufVxyXG5cclxuXHJcbmVudW0gQ29tbWFuZEV4ZWN1dGlvblN0YXRle1xyXG4gICAgUkVBRFksXHJcbiAgICBQRU5ESU5HLFxyXG59XHJcblxyXG5leHBvcnQgeyBDb21tYW5kLCBJQ29tbWFuZEV4ZWN1dGlvbkRlbGVnYXRlLCBJQ29tbWFuZEV4ZWN1dGlvblJlc3BvbnNlRGVsZWdhdGUgfTsiXX0=