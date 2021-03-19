define(["require", "exports", "./componentBinding", "../../../common/utilities/dataBox", "../../events", "../../store"], function (require, exports, componentBinding_1, dataBox_1, events_1, store_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Implements an interface for binding/wiring components. A binding connector supports connecting components and exchanging data without any
     * direct dependencies.
     *
     * @export
     * @class ComponentBindingConnector
     */
    var ComponentBindingConnector = /** @class */ (function () {
        function ComponentBindingConnector() {
        }
        Object.defineProperty(ComponentBindingConnector, "sharedProperties", {
            /**
             * Gets the store with the bindable properties
             *
             * @readonly
             * @static
             * @type {Store}
             * @memberof ComponentBindings
             */
            get: function () {
                return this._sharedProperties;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Creates a binding according to the bindi8g declaration
         *
         * @static
         * @param {ComponentBinding} bindingDeclaration
         * @returns {ComponentBindingConnector}
         * @memberof ComponentBindingConnector
         */
        ComponentBindingConnector.bind = function (bindingDeclaration) {
            var bindingDescriptor = bindingDeclaration.descriptor;
            if (bindingDeclaration.sourceKey) {
                this.bindSource(bindingDeclaration.component, bindingDescriptor);
            }
            if (bindingDeclaration.targetKey) {
                this.bindTarget(bindingDeclaration.component, bindingDescriptor);
            }
            // release component dependency
            bindingDeclaration.component = null;
        };
        /**
         *
         *
         * @param {ComponentBinding} bindingDeclaration
         * @memberof ComponentBindingConnector
         */
        ComponentBindingConnector.bindSource = function (component, bindingDescriptor) {
            // check if the component contains the source key
            if (bindingDescriptor.sourceKey in component) {
                if (component[bindingDescriptor.sourceKey] instanceof events_1.TypedEvent) {
                    this.bindSourceEvent(component, bindingDescriptor);
                }
                else if (typeof component[bindingDescriptor.sourceKey] === 'function') {
                    this.bindSourceMethod(component, bindingDescriptor);
                }
            }
            else {
                console.error("The binding key %o is not contained in %o! ", bindingDescriptor.sourceKey, component);
            }
        };
        /**
         * Binds the components source method ....
         *
         * @private
         * @param {ComponentBinding} bindingDescriptor
         * @param {*} sourceMember
         * @memberof ComponentBindingConnector
         */
        ComponentBindingConnector.bindSourceMethod = function (component, bindingDescriptor) {
            var originalSourceMethod = component[bindingDescriptor.sourceKey];
            // capture respectively intercept the source member call
            component[bindingDescriptor.sourceKey] = methodBindingInterceptor;
            // declares the method interceptor necessary for capturing the sender.
            function methodBindingInterceptor(methodArgs) {
                // capture the caller
                var caller = this;
                // call original method
                originalSourceMethod.call(caller, methodArgs);
                // forward the call to the binding logic
                ComponentBindingConnector.updateBindingValue(caller, bindingDescriptor, methodArgs);
            }
        };
        /**
         * Updates the bound value when the components intercepted (bound) method has been called
         *
         * @private
         * @param {ComponentBinding} bindingInfo
         * @param {*} args
         * @memberof ComponentBindingConnector
         */
        ComponentBindingConnector.updateBindingValue = function (caller, bindingDescriptor, args) {
            // pass the data within a reference box if required. This keeps the data and its members unmodified respectively passed without copying.
            var bindingArgs = bindingDescriptor.passByValue ? args : dataBox_1.DataBox.Box(args);
            // in case of a command or command response we need to pass a null object if no command args are provided to force the command execution
            // by a simulated value change!
            if (bindingDescriptor.type === componentBinding_1.BindingType.COMMAND || bindingDescriptor.type === componentBinding_1.BindingType.COMMAND_RESPONSE) {
                var nullObject = {};
                bindingArgs = bindingArgs ? bindingArgs : nullObject;
            }
            // get the data type 
            var dataType = bindingDescriptor.dataType;
            // get the binding id for the target object
            var bindingId = bindingDescriptor.fullId;
            // if the value is passed by reference, we force updating to avoid the comparision of complex objects with references 
            var forceUpdate = !bindingDescriptor.passByValue;
            // update the corresponding binding value
            this.sharedProperties.update(caller, dataType, bindingArgs, bindingId, forceUpdate);
        };
        /**
         * Binds ac omponent event
         *
         * @private
         * @param {ComponentBinding} bindingDeclaration
         * @memberof ComponentBindingConnector
         */
        ComponentBindingConnector.bindSourceEvent = function (component, bindingDescriptor) {
            var _this = this;
            var sourceEvent = component[bindingDescriptor.sourceKey];
            sourceEvent.attach(function (sender, args) { return _this.onSourceEventRaised(bindingDescriptor, sender, args); });
        };
        /**
         * Called when the components observed (bound) event has been raised
         *
         * @private
         * @param {ComponentBinding} bindingInfo
         * @param {*} sender
         * @param {*} eventArgs
         * @memberof ComponentBindingConnector
         */
        ComponentBindingConnector.onSourceEventRaised = function (bindingDescriptor, sender, eventArgs) {
            this.updateBindingValue(sender, bindingDescriptor, eventArgs);
        };
        /**
         * Binds a components property to a bindable value
         *
         * @param {ComponentBinding} bindingDeclaration
         * @memberof ComponentBindingConnector
         */
        ComponentBindingConnector.bindTarget = function (component, bindingDescriptor) {
            // check if the component contains the target key
            if (bindingDescriptor.targetKey in component) {
                // get the target instance 
                var connectionTarget = component;
                // get the data type 
                var dataType = bindingDescriptor.dataType;
                // get the binding id for the target object
                var bindingId = bindingDescriptor.fullId;
                // check if the endpoint is a function
                var endPointIsMethod = this.endPointIsFunction(connectionTarget, bindingDescriptor.targetKey);
                // check if the endpoint is a property
                var endPointIsProperty = this.endPointIsProperty(connectionTarget, bindingDescriptor.targetKey);
                // bind the target endpoint according to the handler type
                if (endPointIsMethod) {
                    // get the target handler
                    var targetBindingChangedHandler = connectionTarget[bindingDescriptor.targetKey];
                    // bind the method handler
                    this.bindTargetMethod(connectionTarget, targetBindingChangedHandler, dataType, bindingId);
                }
                else {
                    // bind the property handler
                    this.bindTargetProperty(connectionTarget, bindingDescriptor.targetKey, dataType, bindingId);
                }
            }
            else {
                console.error("ComponentBinding: The binding key %o is not contained in %o! ", bindingDescriptor.targetKey, component);
            }
        };
        /**
         * Binds a target method to a bindable value
         *
         * @private
         * @param {object} connectionTarget
         * @param {TBindableChangedHandler} targetBindingValueChangedHandler
         * @param {TConnectionDataType} dataType
         * @param {string} [bindingId=""]
         * @memberof ComponentBindingConnector
         */
        ComponentBindingConnector.bindTargetMethod = function (connectionTarget, targetBindingValueChangedHandler, dataType, bindingId) {
            var _this = this;
            if (bindingId === void 0) { bindingId = ""; }
            // create the data changed handler for an update method call
            var bindingValueChangedHandler = function (newValue, oldValue) { return _this.invokeTargetMethod(newValue, oldValue, connectionTarget, targetBindingValueChangedHandler, dataType); };
            // observe the state change and forward the notification to the target handler
            this.sharedProperties.observe(connectionTarget, dataType, bindingValueChangedHandler, bindingId);
        };
        /**
         * Invokes the components target method when a bindable value has been changed.
         *
         * @private
         * @param {*} newValue
         * @param {*} oldValue
         * @param {object} connectionTarget
         * @param {TBindableChangedHandler} targetBindingValueChangedHandler
         * @param {TConnectionDataType} dataType
         * @memberof ComponentBindingConnector
         */
        ComponentBindingConnector.invokeTargetMethod = function (newValue, oldValue, connectionTarget, targetBindingValueChangedHandler, dataType) {
            var modifiedType = newValue ? typeof newValue === "object" ? newValue.constructor.name : typeof newValue : undefined;
            var targetDataType = dataType ? typeof dataType === "string" ? dataType : dataType.name : undefined;
            if (!dataType || (modifiedType === targetDataType)) {
                targetBindingValueChangedHandler.bind(connectionTarget)(newValue, oldValue);
            }
            else {
                console.error("ComponentBinding: could not invoke %o because data types do not match!", connectionTarget);
            }
        };
        /**
         * Binds a component property to a bindable value.
         *
         * @private
         * @param {object} bindingTarget
         * @param {string} targetMemberName
         * @param {TConnectionDataType} dataType
         * @param {string} bindingId
         * @memberof ComponentBindingConnector
         */
        ComponentBindingConnector.bindTargetProperty = function (bindingTarget, targetMemberName, dataType, bindingId) {
            var _this = this;
            // create the data changed handler for a property update
            var bindingValueChangedHandler = function (newValue) { return _this.updateTargetProperty(bindingTarget, newValue, targetMemberName, dataType); };
            // observe the data change and forward the notification to the property changed handler 
            this.sharedProperties.observe(bindingTarget, dataType, bindingValueChangedHandler, bindingId);
        };
        /**
         * Updates the components property when a bindable value has been changed.
         *
         * @private
         * @param {object} bindingTarget
         * @param {*} newValue
         * @param {string} targetMemberName
         * @param {TConnectionDataType} dataType
         * @memberof ComponentBindingConnector
         */
        ComponentBindingConnector.updateTargetProperty = function (bindingTarget, newValue, targetMemberName, dataType) {
            var modifiedType = newValue ? typeof newValue === "object" ? newValue.constructor.name : typeof newValue : undefined;
            var targetDataType = dataType ? typeof dataType === "string" ? dataType : dataType.name : undefined;
            //TODO: make sure that the modified type and binding type are matching
            // if (!dataType || (modifiedType === targetDataType)) {
            for (var key in bindingTarget) {
                if (key === targetMemberName) {
                    bindingTarget[targetMemberName] = newValue;
                }
            }
        };
        /**
         * Determines if the end point is a function
         *
         * @private
         * @static
         * @param {object} connectionTarget
         * @returns
         * @memberof ComponentBindingConnector
         */
        ComponentBindingConnector.endPointIsFunction = function (connectionTarget, targetMemberName) {
            // get the target handler
            var connectionPointHandler = connectionTarget[targetMemberName];
            // check if the endpoint is a function
            var endPointIsFunction = connectionPointHandler instanceof Function;
            return endPointIsFunction;
        };
        /**
         * Determines if the end point is a property
         *
         * @private
         * @static
         * @param {object} connectionTarget
         * @returns
         * @memberof ComponentBindingConnector
         */
        ComponentBindingConnector.endPointIsProperty = function (connectionTarget, targetMemberName) {
            // check if the endpoint is a property
            var targetBaseOwnsProperty = connectionTarget.constructor.prototype.hasOwnProperty(targetMemberName);
            var targetOwnsProperty = connectionTarget.constructor.prototype.hasOwnProperty(targetMemberName);
            var endPointIsProperty = targetOwnsProperty && !this.endPointIsFunction(connectionTarget, targetMemberName);
            return endPointIsProperty;
        };
        /**
         * Unbinds a whole component or the binding specified by the binding declaration
         *
         * @static
         * @param {(object | ComponentBinding)} bindingObject
         * @memberof ComponentBindingConnector
         */
        ComponentBindingConnector.unbind = function (bindingObject) {
            if (bindingObject instanceof componentBinding_1.ComponentBinding) {
                this.unbindBinding(bindingObject);
            }
            else {
                this.unbindComponent(bindingObject);
            }
        };
        /**
         * Unbinds a specific binding
         *
         * @private
         * @static
         * @param {ComponentBinding} bindingDeclaration
         * @memberof ComponentBindingConnector
         */
        ComponentBindingConnector.unbindBinding = function (bindingDeclaration) {
            throw new Error("Method not implemented.");
        };
        /**
         * Unbinds all bindings related to the bound object
         *
         * @private
         * @static
         * @param {object} boundObject
         * @memberof ComponentBindingConnector
         */
        ComponentBindingConnector.unbindComponent = function (boundObject) {
            // detach the bound object from all shared properties
            this.sharedProperties.detach(boundObject);
        };
        // holds the binding properties to be shared between source and target binding points as property objects in a store.
        ComponentBindingConnector._sharedProperties = new store_1.Store();
        return ComponentBindingConnector;
    }());
    exports.ComponentBindingConnector = ComponentBindingConnector;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50QmluZGluZ0Nvbm5lY3Rvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvZnJhbWV3b3JrL2NvbXBvbmVudEh1Yi9iaW5kaW5ncy9jb21wb25lbnRCaW5kaW5nQ29ubmVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQU9BOzs7Ozs7T0FNRztJQUNIO1FBQUE7UUFpWEEsQ0FBQztRQWxXRyxzQkFBbUIsNkNBQWdCO1lBUm5DOzs7Ozs7O2VBT0c7aUJBQ0g7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7WUFDbEMsQ0FBQzs7O1dBQUE7UUFHRDs7Ozs7OztXQU9HO1FBQ1csOEJBQUksR0FBbEIsVUFBbUIsa0JBQW9DO1lBRW5ELElBQU0saUJBQWlCLEdBQUcsa0JBQWtCLENBQUMsVUFBVSxDQUFDO1lBRXhELElBQUksa0JBQWtCLENBQUMsU0FBUyxFQUFFO2dCQUM5QixJQUFJLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO2FBQ3BFO1lBRUQsSUFBSSxrQkFBa0IsQ0FBQyxTQUFTLEVBQUU7Z0JBQzlCLElBQUksQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsU0FBUyxFQUFFLGlCQUFpQixDQUFDLENBQUM7YUFFcEU7WUFFRCwrQkFBK0I7WUFDL0Isa0JBQWtCLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN4QyxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDWSxvQ0FBVSxHQUF6QixVQUEwQixTQUFTLEVBQUUsaUJBQTZDO1lBRTlFLGlEQUFpRDtZQUNqRCxJQUFJLGlCQUFpQixDQUFDLFNBQVMsSUFBSSxTQUFTLEVBQUU7Z0JBQzFDLElBQUksU0FBUyxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxZQUFZLG1CQUFVLEVBQUU7b0JBQzlELElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFLGlCQUFpQixD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eUIsQ0FBQyxDQUFDO1FBQy9DLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ1kseUNBQWUsR0FBOUIsVUFBK0IsV0FBbUI7WUFFOUMscURBQXFEO1lBQ3JELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFOUMsQ0FBQztRQTNXRCxxSEFBcUg7UUFDdEcsMkNBQWlCLEdBQVUsSUFBSSxhQUFLLEVBQUUsQ0FBQztRQTZXMUQsZ0NBQUM7S0FBQSxBQWpYRCxJQWlYQztJQWpYWSw4REFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUQmluZGFibGVDaGFuZ2VkSGFuZGxlciwgVENvbm5lY3Rpb25EYXRhVHlwZSwgVENvbnN0cnVjdG9yIH0gZnJvbSBcIi4uL2NvbW1vbi9jb21tb25UeXBlc1wiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRCaW5kaW5nLCBCaW5kaW5nVHlwZSwgQ29tcG9uZW50QmluZGluZ0Rlc2NyaXB0b3IgfSBmcm9tIFwiLi9jb21wb25lbnRCaW5kaW5nXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudEJpbmRpbmdzIH0gZnJvbSBcIi4vY29tcG9uZW50QmluZGluZ3NcIjtcclxuaW1wb3J0IHsgRGF0YUJveCB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vdXRpbGl0aWVzL2RhdGFCb3hcIjtcclxuaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gXCIuLi8uLi9ldmVudHNcIjtcclxuaW1wb3J0IHsgU3RvcmUgfSBmcm9tIFwiLi4vLi4vc3RvcmVcIjtcclxuXHJcbi8qKlxyXG4gKiBJbXBsZW1lbnRzIGFuIGludGVyZmFjZSBmb3IgYmluZGluZy93aXJpbmcgY29tcG9uZW50cy4gQSBiaW5kaW5nIGNvbm5lY3RvciBzdXBwb3J0cyBjb25uZWN0aW5nIGNvbXBvbmVudHMgYW5kIGV4Y2hhbmdpbmcgZGF0YSB3aXRob3V0IGFueVxyXG4gKiBkaXJlY3QgZGVwZW5kZW5jaWVzLlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBjbGFzcyBDb21wb25lbnRCaW5kaW5nQ29ubmVjdG9yXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50QmluZGluZ0Nvbm5lY3RvciB7XHJcblxyXG5cclxuICAgIC8vIGhvbGRzIHRoZSBiaW5kaW5nIHByb3BlcnRpZXMgdG8gYmUgc2hhcmVkIGJldHdlZW4gc291cmNlIGFuZCB0YXJnZXQgYmluZGluZyBwb2ludHMgYXMgcHJvcGVydHkgb2JqZWN0cyBpbiBhIHN0b3JlLlxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX3NoYXJlZFByb3BlcnRpZXM6IFN0b3JlID0gbmV3IFN0b3JlKCk7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgc3RvcmUgd2l0aCB0aGUgYmluZGFibGUgcHJvcGVydGllc1xyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHR5cGUge1N0b3JlfVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJpbmRpbmdzXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIGdldCBzaGFyZWRQcm9wZXJ0aWVzKCk6IFN0b3JlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2hhcmVkUHJvcGVydGllcztcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgYmluZGluZyBhY2NvcmRpbmcgdG8gdGhlIGJpbmRpOGcgZGVjbGFyYXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJpbmRpbmd9IGJpbmRpbmdEZWNsYXJhdGlvblxyXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudEJpbmRpbmdDb25uZWN0b3J9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmluZGluZ0Nvbm5lY3RvclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGJpbmQoYmluZGluZ0RlY2xhcmF0aW9uOiBDb21wb25lbnRCaW5kaW5nKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IGJpbmRpbmdEZXNjcmlwdG9yID0gYmluZGluZ0RlY2xhcmF0aW9uLmRlc2NyaXB0b3I7XHJcblxyXG4gICAgICAgIGlmIChiaW5kaW5nRGVjbGFyYXRpb24uc291cmNlS2V5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmluZFNvdXJjZShiaW5kaW5nRGVjbGFyYXRpb24uY29tcG9uZW50LCBiaW5kaW5nRGVzY3JpcHRvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYmluZGluZ0RlY2xhcmF0aW9uLnRhcmdldEtleSkge1xyXG4gICAgICAgICAgICB0aGlzLmJpbmRUYXJnZXQoYmluZGluZ0RlY2xhcmF0aW9uLmNvbXBvbmVudCwgYmluZGluZ0Rlc2NyaXB0b3IpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHJlbGVhc2UgY29tcG9uZW50IGRlcGVuZGVuY3lcclxuICAgICAgICBiaW5kaW5nRGVjbGFyYXRpb24uY29tcG9uZW50ID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50QmluZGluZ30gYmluZGluZ0RlY2xhcmF0aW9uXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmluZGluZ0Nvbm5lY3RvclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBiaW5kU291cmNlKGNvbXBvbmVudCwgYmluZGluZ0Rlc2NyaXB0b3I6IENvbXBvbmVudEJpbmRpbmdEZXNjcmlwdG9yKSB7XHJcblxyXG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZSBjb21wb25lbnQgY29udGFpbnMgdGhlIHNvdXJjZSBrZXlcclxuICAgICAgICBpZiAoYmluZGluZ0Rlc2NyaXB0b3Iuc291cmNlS2V5IGluIGNvbXBvbmVudCkge1xyXG4gICAgICAgICAgICBpZiAoY29tcG9uZW50W2JpbmRpbmdEZXNjcmlwdG9yLnNvdXJjZUtleV0gaW5zdGFuY2VvZiBUeXBlZEV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJpbmRTb3VyY2VFdmVudChjb21wb25lbnQsIGJpbmRpbmdEZXNjcmlwdG9yKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgY29tcG9uZW50W2JpbmRpbmdEZXNjcmlwdG9yLnNvdXJjZUtleV0gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmluZFNvdXJjZU1ldGhvZChjb21wb25lbnQsIGJpbmRpbmdEZXNjcmlwdG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJUaGUgYmluZGluZyBrZXkgJW8gaXMgbm90IGNvbnRhaW5lZCBpbiAlbyEgXCIsIGJpbmRpbmdEZXNjcmlwdG9yLnNvdXJjZUtleSwgY29tcG9uZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQmluZHMgdGhlIGNvbXBvbmVudHMgc291cmNlIG1ldGhvZCAuLi4uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50QmluZGluZ30gYmluZGluZ0Rlc2NyaXB0b3JcclxuICAgICAqIEBwYXJhbSB7Kn0gc291cmNlTWVtYmVyXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmluZGluZ0Nvbm5lY3RvclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBiaW5kU291cmNlTWV0aG9kKGNvbXBvbmVudCwgYmluZGluZ0Rlc2NyaXB0b3I6IENvbXBvbmVudEJpbmRpbmdEZXNjcmlwdG9yKSB7XHJcbiAgICAgIFxyXG4gICAgICAgIGNvbnN0IG9yaWdpbmFsU291cmNlTWV0aG9kID0gY29tcG9uZW50W2JpbmRpbmdEZXNjcmlwdG9yLnNvdXJjZUtleV07XHJcblxyXG4gICAgICAgIC8vIGNhcHR1cmUgcmVzcGVjdGl2ZWx5IGludGVyY2VwdCB0aGUgc291cmNlIG1lbWJlciBjYWxsXHJcbiAgICAgICAgY29tcG9uZW50W2JpbmRpbmdEZXNjcmlwdG9yLnNvdXJjZUtleV0gPSBtZXRob2RCaW5kaW5nSW50ZXJjZXB0b3I7XHJcblxyXG4gICAgICAgIC8vIGRlY2xhcmVzIHRoZSBtZXRob2QgaW50ZXJjZXB0b3IgbmVjZXNzYXJ5IGZvciBjYXB0dXJpbmcgdGhlIHNlbmRlci5cclxuICAgICAgICBmdW5jdGlvbiBtZXRob2RCaW5kaW5nSW50ZXJjZXB0b3IodGhpczogYW55LCBtZXRob2RBcmdzKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBjYXB0dXJlIHRoZSBjYWxsZXJcclxuICAgICAgICAgICAgY29uc3QgY2FsbGVyID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIGNhbGwgb3JpZ2luYWwgbWV0aG9kXHJcbiAgICAgICAgICAgIG9yaWdpbmFsU291cmNlTWV0aG9kLmNhbGwoY2FsbGVyLCBtZXRob2RBcmdzKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIGZvcndhcmQgdGhlIGNhbGwgdG8gdGhlIGJpbmRpbmcgbG9naWNcclxuICAgICAgICAgICAgQ29tcG9uZW50QmluZGluZ0Nvbm5lY3Rvci51cGRhdGVCaW5kaW5nVmFsdWUoY2FsbGVyLGJpbmRpbmdEZXNjcmlwdG9yLCBtZXRob2RBcmdzKTtcclxuICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGJvdW5kIHZhbHVlIHdoZW4gdGhlIGNvbXBvbmVudHMgaW50ZXJjZXB0ZWQgKGJvdW5kKSBtZXRob2QgaGFzIGJlZW4gY2FsbGVkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50QmluZGluZ30gYmluZGluZ0luZm9cclxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJpbmRpbmdDb25uZWN0b3JcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgdXBkYXRlQmluZGluZ1ZhbHVlKGNhbGxlcixiaW5kaW5nRGVzY3JpcHRvcjogQ29tcG9uZW50QmluZGluZ0Rlc2NyaXB0b3IsIGFyZ3M6IGFueSkge1xyXG5cclxuICAgICAgICAvLyBwYXNzIHRoZSBkYXRhIHdpdGhpbiBhIHJlZmVyZW5jZSBib3ggaWYgcmVxdWlyZWQuIFRoaXMga2VlcHMgdGhlIGRhdGEgYW5kIGl0cyBtZW1iZXJzIHVubW9kaWZpZWQgcmVzcGVjdGl2ZWx5IHBhc3NlZCB3aXRob3V0IGNvcHlpbmcuXHJcbiAgICAgICAgbGV0IGJpbmRpbmdBcmdzID0gYmluZGluZ0Rlc2NyaXB0b3IucGFzc0J5VmFsdWUgPyBhcmdzIDogRGF0YUJveC5Cb3goYXJncyk7XHJcblxyXG4gICAgICAgIC8vIGluIGNhc2Ugb2YgYSBjb21tYW5kIG9yIGNvbW1hbmQgcmVzcG9uc2Ugd2UgbmVlZCB0byBwYXNzIGEgbnVsbCBvYmplY3QgaWYgbm8gY29tbWFuZCBhcmdzIGFyZSBwcm92aWRlZCB0byBmb3JjZSB0aGUgY29tbWFuZCBleGVjdXRpb25cclxuICAgICAgICAvLyBieSBhIHNpbXVsYXRlZCB2YWx1ZSBjaGFuZ2UhXHJcbiAgICAgICAgaWYgKGJpbmRpbmdEZXNjcmlwdG9yLnR5cGUgPT09IEJpbmRpbmdUeXBlLkNPTU1BTkQgfHwgYmluZGluZ0Rlc2NyaXB0b3IudHlwZSA9PT0gQmluZGluZ1R5cGUuQ09NTUFORF9SRVNQT05TRSkge1xyXG4gICAgICAgICAgICBjb25zdCBudWxsT2JqZWN0ID0ge307XHJcbiAgICAgICAgICAgIGJpbmRpbmdBcmdzID0gYmluZGluZ0FyZ3MgPyBiaW5kaW5nQXJncyA6IG51bGxPYmplY3Q7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBnZXQgdGhlIGRhdGEgdHlwZSBcclxuICAgICAgICBjb25zdCBkYXRhVHlwZSA9IGJpbmRpbmdEZXNjcmlwdG9yLmRhdGFUeXBlO1xyXG4gICAgICAgIC8vIGdldCB0aGUgYmluZGluZyBpZCBmb3IgdGhlIHRhcmdldCBvYmplY3RcclxuICAgICAgICBjb25zdCBiaW5kaW5nSWQgPSBiaW5kaW5nRGVzY3JpcHRvci5mdWxsSWQ7XHJcblxyXG4gICAgICAgIC8vIGlmIHRoZSB2YWx1ZSBpcyBwYXNzZWQgYnkgcmVmZXJlbmNlLCB3ZSBmb3JjZSB1cGRhdGluZyB0byBhdm9pZCB0aGUgY29tcGFyaXNpb24gb2YgY29tcGxleCBvYmplY3RzIHdpdGggcmVmZXJlbmNlcyBcclxuICAgICAgICBjb25zdCBmb3JjZVVwZGF0ZSA9ICFiaW5kaW5nRGVzY3JpcHRvci5wYXNzQnlWYWx1ZTtcclxuXHJcbiAgICAgICAgLy8gdXBkYXRlIHRoZSBjb3JyZXNwb25kaW5nIGJpbmRpbmcgdmFsdWVcclxuICAgICAgICB0aGlzLnNoYXJlZFByb3BlcnRpZXMudXBkYXRlKGNhbGxlcixkYXRhVHlwZSwgYmluZGluZ0FyZ3MsIGJpbmRpbmdJZCxmb3JjZVVwZGF0ZSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQmluZHMgYWMgb21wb25lbnQgZXZlbnQgXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50QmluZGluZ30gYmluZGluZ0RlY2xhcmF0aW9uXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmluZGluZ0Nvbm5lY3RvclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBiaW5kU291cmNlRXZlbnQoY29tcG9uZW50LCBiaW5kaW5nRGVzY3JpcHRvcjogQ29tcG9uZW50QmluZGluZ0Rlc2NyaXB0b3IpIHtcclxuICAgICAgICBjb25zdCBzb3VyY2VFdmVudDogVHlwZWRFdmVudDxhbnksIGFueT4gPSBjb21wb25lbnRbYmluZGluZ0Rlc2NyaXB0b3Iuc291cmNlS2V5XTtcclxuXHJcbiAgICAgICAgc291cmNlRXZlbnQuYXR0YWNoKChzZW5kZXIsIGFyZ3MpID0+IHRoaXMub25Tb3VyY2VFdmVudFJhaXNlZChiaW5kaW5nRGVzY3JpcHRvciwgc2VuZGVyLCBhcmdzKSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIHdoZW4gdGhlIGNvbXBvbmVudHMgb2JzZXJ2ZWQgKGJvdW5kKSBldmVudCBoYXMgYmVlbiByYWlzZWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtDb21wb25lbnRCaW5kaW5nfSBiaW5kaW5nSW5mb1xyXG4gICAgICogQHBhcmFtIHsqfSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSB7Kn0gZXZlbnRBcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmluZGluZ0Nvbm5lY3RvclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBvblNvdXJjZUV2ZW50UmFpc2VkKGJpbmRpbmdEZXNjcmlwdG9yOiBDb21wb25lbnRCaW5kaW5nRGVzY3JpcHRvciwgc2VuZGVyOiBhbnksIGV2ZW50QXJnczogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVCaW5kaW5nVmFsdWUoc2VuZGVyLGJpbmRpbmdEZXNjcmlwdG9yLCBldmVudEFyZ3MpO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCaW5kcyBhIGNvbXBvbmVudHMgcHJvcGVydHkgdG8gYSBiaW5kYWJsZSB2YWx1ZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50QmluZGluZ30gYmluZGluZ0RlY2xhcmF0aW9uXHJcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50QmluZGluZ0Nvbm5lY3RvclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBiaW5kVGFyZ2V0KGNvbXBvbmVudCwgYmluZGluZ0Rlc2NyaXB0b3I6IENvbXBvbmVudEJpbmRpbmdEZXNjcmlwdG9yKSB7XHJcblxyXG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZSBjb21wb25lbnQgY29udGFpbnMgdGhlIHRhcmdldCBrZXlcclxuICAgICAgICBpZiAoYmluZGluZ0Rlc2NyaXB0b3IudGFyZ2V0S2V5IGluIGNvbXBvbmVudCkge1xyXG5cclxuICAgICAgICAgICAgLy8gZ2V0IHRoZSB0YXJnZXQgaW5zdGFuY2UgXHJcbiAgICAgICAgICAgIGNvbnN0IGNvbm5lY3Rpb25UYXJnZXQgPSBjb21wb25lbnQ7XHJcbiAgICAgICAgICAgIC8vIGdldCB0aGUgZGF0YSB0eXBlIFxyXG4gICAgICAgICAgICBjb25zdCBkYXRhVHlwZSA9IGJpbmRpbmdEZXNjcmlwdG9yLmRhdGFUeXBlO1xyXG4gICAgICAgICAgICAvLyBnZXQgdGhlIGJpbmRpbmcgaWQgZm9yIHRoZSB0YXJnZXQgb2JqZWN0XHJcbiAgICAgICAgICAgIGNvbnN0IGJpbmRpbmdJZCA9IGJpbmRpbmdEZXNjcmlwdG9yLmZ1bGxJZDtcclxuXHJcbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSBlbmRwb2ludCBpcyBhIGZ1bmN0aW9uXHJcbiAgICAgICAgICAgIGNvbnN0IGVuZFBvaW50SXNNZXRob2QgPSB0aGlzLmVuZFBvaW50SXNGdW5jdGlvbihjb25uZWN0aW9uVGFyZ2V0LCBiaW5kaW5nRGVzY3JpcHRvci50YXJnZXRLZXkpO1xyXG4gICAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgZW5kcG9pbnQgaXMgYSBwcm9wZXJ0eVxyXG4gICAgICAgICAgICBjb25zdCBlbmRQb2ludElzUHJvcGVydHkgPSB0aGlzLmVuZFBvaW50SXNQcm9wZXJ0eShjb25uZWN0aW9uVGFyZ2V0LCBiaW5kaW5nRGVzY3JpcHRvci50YXJnZXRLZXkpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIGJpbmQgdGhlIHRhcmdldCBlbmRwb2ludCBhY2NvcmRpbmcgdG8gdGhlIGhhbmRsZXIgdHlwZVxyXG4gICAgICAgICAgICBpZiAoZW5kUG9pbnRJc01ldGhvZCkge1xyXG4gICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSB0YXJnZXQgaGFuZGxlclxyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0QmluZGluZ0NoYW5nZWRIYW5kbGVyID0gY29ubmVjdGlvblRhcmdldFtiaW5kaW5nRGVzY3JpcHRvci50YXJnZXRLZXldO1xyXG4gICAgICAgICAgICAgICAgLy8gYmluZCB0aGUgbWV0aG9kIGhhbmRsZXJcclxuICAgICAgICAgICAgICAgIHRoaXMuYmluZFRhcmdldE1ldGhvZChjb25uZWN0aW9uVGFyZ2V0LCB0YXJnZXRCaW5kaW5nQ2hhbmdlZEhhbmRsZXIsIGRhdGFUeXBlLCBiaW5kaW5nSWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gYmluZCB0aGUgcHJvcGVydHkgaGFuZGxlclxyXG4gICAgICAgICAgICAgICAgdGhpcy5iaW5kVGFyZ2V0UHJvcGVydHkoY29ubmVjdGlvblRhcmdldCwgYmluZGluZ0Rlc2NyaXB0b3IudGFyZ2V0S2V5LCBkYXRhVHlwZSwgYmluZGluZ0lkKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ29tcG9uZW50QmluZGluZzogVGhlIGJpbmRpbmcga2V5ICVvIGlzIG5vdCBjb250YWluZWQgaW4gJW8hIFwiLCBiaW5kaW5nRGVzY3JpcHRvci50YXJnZXRLZXksIGNvbXBvbmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQmluZHMgYSB0YXJnZXQgbWV0aG9kIHRvIGEgYmluZGFibGUgdmFsdWVcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGNvbm5lY3Rpb25UYXJnZXRcclxuICAgICAqIEBwYXJhbSB7VEJpbmRhYmxlQ2hhbmdlZEhhbmRsZXJ9IHRhcmdldEJpbmRpbmdWYWx1ZUNoYW5nZWRIYW5kbGVyXHJcbiAgICAgKiBAcGFyYW0ge1RDb25uZWN0aW9uRGF0YVR5cGV9IGRhdGFUeXBlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW2JpbmRpbmdJZD1cIlwiXVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJpbmRpbmdDb25uZWN0b3JcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgYmluZFRhcmdldE1ldGhvZChjb25uZWN0aW9uVGFyZ2V0OiBvYmplY3QsIHRhcmdldEJpbmRpbmdWYWx1ZUNoYW5nZWRIYW5kbGVyOiBUQmluZGFibGVDaGFuZ2VkSGFuZGxlciwgZGF0YVR5cGU6IFRDb25uZWN0aW9uRGF0YVR5cGUsIGJpbmRpbmdJZDogc3RyaW5nID0gXCJcIikge1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgdGhlIGRhdGEgY2hhbmdlZCBoYW5kbGVyIGZvciBhbiB1cGRhdGUgbWV0aG9kIGNhbGxcclxuICAgICAgICBjb25zdCBiaW5kaW5nVmFsdWVDaGFuZ2VkSGFuZGxlcjogVEJpbmRhYmxlQ2hhbmdlZEhhbmRsZXIgPSAobmV3VmFsdWUsIG9sZFZhbHVlKSA9PiB0aGlzLmludm9rZVRhcmdldE1ldGhvZChuZXdWYWx1ZSwgb2xkVmFsdWUsIGNvbm5lY3Rpb25UYXJnZXQsIHRhcmdldEJpbmRpbmdWYWx1ZUNoYW5nZWRIYW5kbGVyLCBkYXRhVHlwZSk7XHJcblxyXG4gICAgICAgIC8vIG9ic2VydmUgdGhlIHN0YXRlIGNoYW5nZSBhbmQgZm9yd2FyZCB0aGUgbm90aWZpY2F0aW9uIHRvIHRoZSB0YXJnZXQgaGFuZGxlclxyXG4gICAgICAgIHRoaXMuc2hhcmVkUHJvcGVydGllcy5vYnNlcnZlKGNvbm5lY3Rpb25UYXJnZXQsZGF0YVR5cGUsIGJpbmRpbmdWYWx1ZUNoYW5nZWRIYW5kbGVyLCBiaW5kaW5nSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW52b2tlcyB0aGUgY29tcG9uZW50cyB0YXJnZXQgbWV0aG9kIHdoZW4gYSBiaW5kYWJsZSB2YWx1ZSBoYXMgYmVlbiBjaGFuZ2VkLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyp9IG5ld1ZhbHVlXHJcbiAgICAgKiBAcGFyYW0geyp9IG9sZFZhbHVlXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gY29ubmVjdGlvblRhcmdldFxyXG4gICAgICogQHBhcmFtIHtUQmluZGFibGVDaGFuZ2VkSGFuZGxlcn0gdGFyZ2V0QmluZGluZ1ZhbHVlQ2hhbmdlZEhhbmRsZXJcclxuICAgICAqIEBwYXJhbSB7VENvbm5lY3Rpb25EYXRhVHlwZX0gZGF0YVR5cGVcclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRCaW5kaW5nQ29ubmVjdG9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIGludm9rZVRhcmdldE1ldGhvZChuZXdWYWx1ZTogYW55LCBvbGRWYWx1ZTogYW55LCBjb25uZWN0aW9uVGFyZ2V0OiBvYmplY3QsIHRhcmdldEJpbmRpbmdWYWx1ZUNoYW5nZWRIYW5kbGVyOiBUQmluZGFibGVDaGFuZ2VkSGFuZGxlciwgZGF0YVR5cGU6IFRDb25uZWN0aW9uRGF0YVR5cGUpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgY29uc3QgbW9kaWZpZWRUeXBlID0gbmV3VmFsdWUgPyB0eXBlb2YgbmV3VmFsdWUgPT09IFwib2JqZWN0XCIgPyBuZXdWYWx1ZS5jb25zdHJ1Y3Rvci5uYW1lIDogdHlwZW9mIG5ld1ZhbHVlIDogdW5kZWZpbmVkO1xyXG4gICAgICAgIGNvbnN0IHRhcmdldERhdGFUeXBlID0gZGF0YVR5cGUgPyB0eXBlb2YgZGF0YVR5cGUgPT09IFwic3RyaW5nXCIgPyBkYXRhVHlwZSA6IGRhdGFUeXBlLm5hbWUgOiB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgIGlmICghZGF0YVR5cGUgfHwgKG1vZGlmaWVkVHlwZSA9PT0gdGFyZ2V0RGF0YVR5cGUpKSB7XHJcbiAgICAgICAgICAgIHRhcmdldEJpbmRpbmdWYWx1ZUNoYW5nZWRIYW5kbGVyLmJpbmQoY29ubmVjdGlvblRhcmdldCkobmV3VmFsdWUsIG9sZFZhbHVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ29tcG9uZW50QmluZGluZzogY291bGQgbm90IGludm9rZSAlbyBiZWNhdXNlIGRhdGEgdHlwZXMgZG8gbm90IG1hdGNoIVwiLCBjb25uZWN0aW9uVGFyZ2V0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCaW5kcyBhIGNvbXBvbmVudCBwcm9wZXJ0eSB0byBhIGJpbmRhYmxlIHZhbHVlLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gYmluZGluZ1RhcmdldFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRhcmdldE1lbWJlck5hbWVcclxuICAgICAqIEBwYXJhbSB7VENvbm5lY3Rpb25EYXRhVHlwZX0gZGF0YVR5cGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBiaW5kaW5nSWRcclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRCaW5kaW5nQ29ubmVjdG9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIGJpbmRUYXJnZXRQcm9wZXJ0eShiaW5kaW5nVGFyZ2V0OiBvYmplY3QsIHRhcmdldE1lbWJlck5hbWU6IHN0cmluZywgZGF0YVR5cGU6IFRDb25uZWN0aW9uRGF0YVR5cGUsIGJpbmRpbmdJZDogc3RyaW5nKSB7XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgZGF0YSBjaGFuZ2VkIGhhbmRsZXIgZm9yIGEgcHJvcGVydHkgdXBkYXRlXHJcbiAgICAgICAgY29uc3QgYmluZGluZ1ZhbHVlQ2hhbmdlZEhhbmRsZXI6IFRCaW5kYWJsZUNoYW5nZWRIYW5kbGVyID0gKG5ld1ZhbHVlKSA9PiB0aGlzLnVwZGF0ZVRhcmdldFByb3BlcnR5KGJpbmRpbmdUYXJnZXQsIG5ld1ZhbHVlLCB0YXJnZXRNZW1iZXJOYW1lLCBkYXRhVHlwZSk7XHJcblxyXG4gICAgICAgIC8vIG9ic2VydmUgdGhlIGRhdGEgY2hhbmdlIGFuZCBmb3J3YXJkIHRoZSBub3RpZmljYXRpb24gdG8gdGhlIHByb3BlcnR5IGNoYW5nZWQgaGFuZGxlciBcclxuICAgICAgICB0aGlzLnNoYXJlZFByb3BlcnRpZXMub2JzZXJ2ZShiaW5kaW5nVGFyZ2V0LGRhdGFUeXBlLCBiaW5kaW5nVmFsdWVDaGFuZ2VkSGFuZGxlciwgYmluZGluZ0lkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGNvbXBvbmVudHMgcHJvcGVydHkgd2hlbiBhIGJpbmRhYmxlIHZhbHVlIGhhcyBiZWVuIGNoYW5nZWQuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBiaW5kaW5nVGFyZ2V0XHJcbiAgICAgKiBAcGFyYW0geyp9IG5ld1ZhbHVlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGFyZ2V0TWVtYmVyTmFtZVxyXG4gICAgICogQHBhcmFtIHtUQ29ubmVjdGlvbkRhdGFUeXBlfSBkYXRhVHlwZVxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJpbmRpbmdDb25uZWN0b3JcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgdXBkYXRlVGFyZ2V0UHJvcGVydHkoYmluZGluZ1RhcmdldDogb2JqZWN0LCBuZXdWYWx1ZTogYW55LCB0YXJnZXRNZW1iZXJOYW1lOiBzdHJpbmcsIGRhdGFUeXBlOiBUQ29ubmVjdGlvbkRhdGFUeXBlKTogdm9pZCB7XHJcblxyXG4gICAgICAgIGNvbnN0IG1vZGlmaWVkVHlwZSA9IG5ld1ZhbHVlID8gdHlwZW9mIG5ld1ZhbHVlID09PSBcIm9iamVjdFwiID8gbmV3VmFsdWUuY29uc3RydWN0b3IubmFtZSA6IHR5cGVvZiBuZXdWYWx1ZSA6IHVuZGVmaW5lZDtcclxuICAgICAgICBjb25zdCB0YXJnZXREYXRhVHlwZSA9IGRhdGFUeXBlID8gdHlwZW9mIGRhdGFUeXBlID09PSBcInN0cmluZ1wiID8gZGF0YVR5cGUgOiBkYXRhVHlwZS5uYW1lIDogdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICAvL1RPRE86IG1ha2Ugc3VyZSB0aGF0IHRoZSBtb2RpZmllZCB0eXBlIGFuZCBiaW5kaW5nIHR5cGUgYXJlIG1hdGNoaW5nXHJcbiAgICAgICAgLy8gaWYgKCFkYXRhVHlwZSB8fCAobW9kaWZpZWRUeXBlID09PSB0YXJnZXREYXRhVHlwZSkpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBiaW5kaW5nVGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIGlmIChrZXkgPT09IHRhcmdldE1lbWJlck5hbWUpIHtcclxuICAgICAgICAgICAgICAgIGJpbmRpbmdUYXJnZXRbdGFyZ2V0TWVtYmVyTmFtZV0gPSBuZXdWYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERldGVybWluZXMgaWYgdGhlIGVuZCBwb2ludCBpcyBhIGZ1bmN0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBjb25uZWN0aW9uVGFyZ2V0XHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJpbmRpbmdDb25uZWN0b3JcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZW5kUG9pbnRJc0Z1bmN0aW9uKGNvbm5lY3Rpb25UYXJnZXQ6IG9iamVjdCwgdGFyZ2V0TWVtYmVyTmFtZTogc3RyaW5nKSB7XHJcblxyXG4gICAgICAgIC8vIGdldCB0aGUgdGFyZ2V0IGhhbmRsZXJcclxuICAgICAgICBjb25zdCBjb25uZWN0aW9uUG9pbnRIYW5kbGVyID0gY29ubmVjdGlvblRhcmdldFt0YXJnZXRNZW1iZXJOYW1lXTtcclxuXHJcbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlIGVuZHBvaW50IGlzIGEgZnVuY3Rpb25cclxuICAgICAgICBjb25zdCBlbmRQb2ludElzRnVuY3Rpb24gPSBjb25uZWN0aW9uUG9pbnRIYW5kbGVyIGluc3RhbmNlb2YgRnVuY3Rpb247XHJcblxyXG4gICAgICAgIHJldHVybiBlbmRQb2ludElzRnVuY3Rpb247XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXRlcm1pbmVzIGlmIHRoZSBlbmQgcG9pbnQgaXMgYSBwcm9wZXJ0eVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gY29ubmVjdGlvblRhcmdldFxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRCaW5kaW5nQ29ubmVjdG9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIGVuZFBvaW50SXNQcm9wZXJ0eShjb25uZWN0aW9uVGFyZ2V0OiBvYmplY3QsIHRhcmdldE1lbWJlck5hbWU6IHN0cmluZykge1xyXG5cclxuICAgICAgICAvLyBjaGVjayBpZiB0aGUgZW5kcG9pbnQgaXMgYSBwcm9wZXJ0eVxyXG4gICAgICAgIGNvbnN0IHRhcmdldEJhc2VPd25zUHJvcGVydHkgPSBjb25uZWN0aW9uVGFyZ2V0LmNvbnN0cnVjdG9yLnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSh0YXJnZXRNZW1iZXJOYW1lKTtcclxuICAgICAgICBjb25zdCB0YXJnZXRPd25zUHJvcGVydHkgPSBjb25uZWN0aW9uVGFyZ2V0LmNvbnN0cnVjdG9yLnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSh0YXJnZXRNZW1iZXJOYW1lKTtcclxuXHJcbiAgICAgICAgY29uc3QgZW5kUG9pbnRJc1Byb3BlcnR5ID0gdGFyZ2V0T3duc1Byb3BlcnR5ICYmICF0aGlzLmVuZFBvaW50SXNGdW5jdGlvbihjb25uZWN0aW9uVGFyZ2V0LCB0YXJnZXRNZW1iZXJOYW1lKTtcclxuICAgICAgICByZXR1cm4gZW5kUG9pbnRJc1Byb3BlcnR5O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVuYmluZHMgYSB3aG9sZSBjb21wb25lbnQgb3IgdGhlIGJpbmRpbmcgc3BlY2lmaWVkIGJ5IHRoZSBiaW5kaW5nIGRlY2xhcmF0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHsob2JqZWN0IHwgQ29tcG9uZW50QmluZGluZyl9IGJpbmRpbmdPYmplY3RcclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRCaW5kaW5nQ29ubmVjdG9yXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyB1bmJpbmQoYmluZGluZ09iamVjdDogb2JqZWN0IHwgQ29tcG9uZW50QmluZGluZykge1xyXG4gXHJcbiAgICAgICAgaWYgKGJpbmRpbmdPYmplY3QgaW5zdGFuY2VvZiBDb21wb25lbnRCaW5kaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMudW5iaW5kQmluZGluZyhiaW5kaW5nT2JqZWN0IGFzIENvbXBvbmVudEJpbmRpbmcpOyAgICAgICAgXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMudW5iaW5kQ29tcG9uZW50KGJpbmRpbmdPYmplY3QpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVbmJpbmRzIGEgc3BlY2lmaWMgYmluZGluZ1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJpbmRpbmd9IGJpbmRpbmdEZWNsYXJhdGlvblxyXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudEJpbmRpbmdDb25uZWN0b3JcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgdW5iaW5kQmluZGluZyhiaW5kaW5nRGVjbGFyYXRpb246IENvbXBvbmVudEJpbmRpbmcpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNZXRob2Qgbm90IGltcGxlbWVudGVkLlwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVuYmluZHMgYWxsIGJpbmRpbmdzIHJlbGF0ZWQgdG8gdGhlIGJvdW5kIG9iamVjdFxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gYm91bmRPYmplY3RcclxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRCaW5kaW5nQ29ubmVjdG9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIHVuYmluZENvbXBvbmVudChib3VuZE9iamVjdDogb2JqZWN0KSB7XHJcbiBcclxuICAgICAgICAvLyBkZXRhY2ggdGhlIGJvdW5kIG9iamVjdCBmcm9tIGFsbCBzaGFyZWQgcHJvcGVydGllc1xyXG4gICAgICAgIHRoaXMuc2hhcmVkUHJvcGVydGllcy5kZXRhY2goYm91bmRPYmplY3QpO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG59XHJcbiJdfQ==