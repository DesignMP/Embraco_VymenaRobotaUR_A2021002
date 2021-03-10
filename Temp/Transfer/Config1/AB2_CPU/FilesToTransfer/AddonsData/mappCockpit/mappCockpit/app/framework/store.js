define(["require", "exports", "./property", "../common/utilities/objectx", "../common/utilities/dataBox"], function (require, exports, property_1, objectx_1, dataBox_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Implemens a store for holding and sharing named data objects.
     *
     * @export
     * @class Store
     */
    var Store = /** @class */ (function () {
        function Store() {
            /**
             * holds the named store items
             *
             * @protected
             * @memberof Store
             */
            this._items = {};
        }
        /**
         * reads a named store item
         *
         * @template STOREITEMTYPE specifies the store items type for casting to the result type
         * @param {*} storeItemTypeConstructor specifies the type to be constructed
         * @param {string} [storeItemId] specifies store items id
         * @returns {STOREITEMTYPE} the requested store item
         * @memberof Store
         */
        Store.prototype.read = function (storeItemTypeConstructor, storeItemId) {
            // retrieve a copy of a named store item
            var itemValue = this.getStoreItem(storeItemId, storeItemTypeConstructor).value;
            // we copy the item value to prohibit directly modifying the original object.
            var storeItem = this.copyItemValue(itemValue, storeItemTypeConstructor);
            return storeItem;
        };
        /**
         * updates the store item with values of the specified item
         *
         * @template STOREITEMTYPE specifies the store items type for casting to the result type
         * @param {*} storeItemTypeConstructor specifies the type to be constructed
         * @param {string} [storeItemId] specifies store items id
         * @memberof Store
         */
        Store.prototype.update = function (storeItemTypeConstructor, newValue, storeItemId) {
            // get the named store item
            var storeItemProperty = this.getStoreItem(storeItemId, storeItemTypeConstructor);
            // if the value is boxed (should be passed by reference) we use just use the contained value as item value. Otherwise we clone
            // the value to make sure that the original valu can't be changed in any way!
            var modifiedStoreItem = this.copyItemValue(newValue, storeItemTypeConstructor);
            // update (and notify observers implicitly) the state properties value if the state objects content has changed. If the update
            // is forced hte vaule is updated anyway and in response notified to listeners.
            if (!objectx_1.ObjectX.deepEquals(storeItemProperty.value, modifiedStoreItem)) {
                // console.log("updated modified state: old %o new %o",storeItemProperty.value,modifiedStoreItem);
                // update the store item value
                storeItemProperty.value = modifiedStoreItem;
            }
        };
        /**
         * Copies the item value to prohibit any indirect change of the original value.
         *
         * @private
         * @template STOREITEMTYPE
         * @param {STOREITEMTYPE} newValue
         * @param {*} storeItemTypeConstructor
         * @returns {STOREITEMTYPE}
         * @memberof Store
         */
        Store.prototype.copyItemValue = function (newValue, storeItemTypeConstructor) {
            // if the value is boxed (should be passed as refernce ) we just use the unboxed value. 
            // Other objects are copied to prohibit intentional or unintentional modifications of the original object
            return newValue instanceof dataBox_1.DataBox ? newValue.Unbox() : objectx_1.ObjectX.clone(storeItemTypeConstructor, newValue);
        };
        /**
         * forces a callback notification with the current store item value
         *
         * @template STOREITEMTYPE
         * @param {*} storeItemTypeConstructor
         * @param {(newValue: STOREITEMTYPE, oldValue: STOREITEMTYPE) => void} storeItemChangedCallback
         * @param {string} [storeItemId]
         * @memberof Store
         */
        Store.prototype.refresh = function (storeItemTypeConstructor, storeItemChangedCallback, storeItemId) {
            if (storeItemChangedCallback === void 0) { storeItemChangedCallback = undefined; }
            // get the named store item
            var storeItemProperty = this.getStoreItem(storeItemId, storeItemTypeConstructor);
            // update the store item value
            storeItemProperty.refresh(storeItemChangedCallback);
        };
        /**
         * observes changes of the store item as a consequence of an update call.
         *
         * @template STOREITEMTYPE specifies the store items type for casting to the result type
         * @param {*} storeItemTypeConstructor specifies the type to be constructed
         * @param {(newValue: STOREITEMTYPE, oldValue: STOREITEMTYPE) => void} storeItemChangedCallback
        * @param {string} [storeItemId] specifies store items id
         * @memberof Store
         */
        Store.prototype.observe = function (storeItemTypeConstructor, storeItemChangedCallback, storeItemId) {
            // get the named store item
            var storeItem = this.getStoreItem(storeItemId, storeItemTypeConstructor);
            // attach the change notification callback
            storeItem.changed(storeItemChangedCallback);
        };
        /**
     * checks if the store contains the specefied item
     *
     * @param {string} itemId specifies store items id
     * @returns {*}
     * @memberof Store
     */
        Store.prototype.contains = function (itemId) {
            return this._items.hasOwnProperty(itemId);
        };
        /**
         * retrieves the store item by id
         *
         * @private
         * @template STOREITEMTYPE specifies the store items type for casting to the result type
        * @param {string} [storeItemId=""] specifies store items id
         * @param {*} storeItemType specifies the type to be constructed
         * @returns {Property<STOREITEMTYPE>} a property object holding the store item
         * @memberof Store
         */
        Store.prototype.getStoreItem = function (storeItemId, storeItemType) {
            var itemType = typeof storeItemType !== "string" ? storeItemType : undefined;
            var effectivestoreItemId = storeItemId ? storeItemId : itemType ? itemType.name : "undefined";
            // get an existing store item or create a new one.
            if (!this._items[effectivestoreItemId]) {
                // create an initial tore item value
                var initialStoreItemValue = itemType ? new itemType() : undefined;
                this._items[effectivestoreItemId] = property_1.Property.create(initialStoreItemValue);
            }
            return this._items[effectivestoreItemId];
        };
        return Store;
    }());
    exports.Store = Store;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBwL2ZyYW1ld29yay9zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFLQTs7Ozs7T0FLRztJQUNIO1FBQUE7WUFFSTs7Ozs7ZUFLRztZQUNPLFdBQU0sR0FBRyxFQUFFLENBQUM7UUF1STFCLENBQUM7UUFwSUc7Ozs7Ozs7O1dBUUc7UUFDSCxvQkFBSSxHQUFKLFVBQW9CLHdCQUE4QyxFQUFFLFdBQW1CO1lBQ25GLHdDQUF3QztZQUN4QyxJQUFNLFNBQVMsR0FBSSxJQUFJLENBQUMsWUFBWSxDQUFnQixXQUFXLEVBQUUsd0JBQXdCLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDakcsNkVBQTZFO1lBQzdFLElBQUksU0FBUyxHQUFrQixJQUFJLENBQUMsYUFBYSxDQUFnQixTQUFTLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztZQUN0RyxPQUFPLFNBQVMsQ0FBQztRQUNyQixDQUFDO1FBR0Q7Ozs7Ozs7V0FPRztRQUNILHNCQUFNLEdBQU4sVUFBc0Isd0JBQXdCLEVBQUUsUUFBdUIsRUFBRSxXQUFtQjtZQUV4RiwyQkFBMkI7WUFDM0IsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFnQixXQUFXLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztZQUVoRyw4SEFBOEg7WUFDOUgsNkVBQTZFO1lBQzdFLElBQUksaUJBQWlCLEdBQWtCLElBQUksQ0FBQyxhQUFhLENBQWdCLFFBQVEsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDO1lBRTdHLDhIQUE4SDtZQUM5SCwrRUFBK0U7WUFDL0UsSUFBSSxDQUFDLGlCQUFPLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLEtBQUssRUFBQyxpQkFBaUIsQ0FBQyxFQUFFO2dCQUVoRSxrR0FBa0c7Z0JBQ2xHLDhCQUE4QjtnQkFDOUIsaUJBQWlCLENBQUMsS0FBSyxHQUFHLGlCQUFpQixDQUFDO2FBQy9DO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7Ozs7V0FTRztRQUNLLDZCQUFhLEdBQXJCLFVBQXFDLFFBQXVCLEVBQUUsd0JBQTZCO1lBQ3ZGLHdGQUF3RjtZQUN4Rix5R0FBeUc7WUFDekcsT0FBTyxRQUFRLFlBQVksaUJBQU8sQ0FBQyxDQUFDLENBQVcsUUFBUyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxpQkFBTyxDQUFDLEtBQUssQ0FBZ0Isd0JBQXdCLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDeEksQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ0gsdUJBQU8sR0FBUCxVQUF1Qix3QkFBd0IsRUFBRSx3QkFBNEcsRUFBRSxXQUFtQjtZQUFqSSx5Q0FBQSxFQUFBLG9DQUE0RztZQUN6SiwyQkFBMkI7WUFDM0IsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFnQixXQUFXLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztZQUVoRyw4QkFBOEI7WUFDOUIsaUJBQWlCLENBQUMsT0FBTyxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDeEQsQ0FBQztRQUdEOzs7Ozs7OztXQVFHO1FBQ0gsdUJBQU8sR0FBUCxVQUF1Qix3QkFBd0IsRUFBRSx3QkFBb0YsRUFBRSxXQUFtQjtZQUN0SiwyQkFBMkI7WUFDM0IsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBZ0IsV0FBVyxFQUFFLHdCQUF3QixDQUFDLENBQUM7WUFDeEYsMENBQTBDO1lBQzFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUNoRCxDQUFDO1FBRUQ7Ozs7OztPQU1EO1FBQ0Msd0JBQVEsR0FBUixVQUFTLE1BQWM7WUFDbkIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5QyxDQUFDO1FBRUQ7Ozs7Ozs7OztXQVNHO1FBQ0ssNEJBQVksR0FBcEIsVUFBb0MsV0FBbUIsRUFBRSxhQUFtQztZQUV4RixJQUFNLFFBQVEsR0FBbUMsT0FBTyxhQUFhLEtBQU0sUUFBUSxDQUFDLENBQUMsQ0FBQyxhQUFzQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFFekksSUFBSSxvQkFBb0IsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUM7WUFFOUYsa0RBQWtEO1lBQ2xELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLEVBQUU7Z0JBRXBDLG9DQUFvQztnQkFDcEMsSUFBSSxxQkFBcUIsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQWdCLENBQUM7Z0JBQ3pFLElBQUksQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsR0FBRyxtQkFBUSxDQUFDLE1BQU0sQ0FBZ0IscUJBQXFCLENBQUMsQ0FBQzthQUU3RjtZQUNELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQzdDLENBQUM7UUFDTCxZQUFDO0lBQUQsQ0FBQyxBQS9JRCxJQStJQztJQS9JWSxzQkFBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByb3BlcnR5IH0gZnJvbSBcIi4vcHJvcGVydHlcIjtcclxuaW1wb3J0IHsgT2JqZWN0WCB9IGZyb20gXCIuLi9jb21tb24vdXRpbGl0aWVzL29iamVjdHhcIjtcclxuaW1wb3J0IHsgRGF0YUJveCB9IGZyb20gXCIuLi9jb21tb24vdXRpbGl0aWVzL2RhdGFCb3hcIjtcclxuXHJcbmV4cG9ydCB0eXBlIFRTdG9yZUl0ZW1Db25zdHJ1Y3RvciA9IG5ldyAoKSA9PiBvYmplY3QgO1xyXG4vKipcclxuICogSW1wbGVtZW5zIGEgc3RvcmUgZm9yIGhvbGRpbmcgYW5kIHNoYXJpbmcgbmFtZWQgZGF0YSBvYmplY3RzLlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBjbGFzcyBTdG9yZVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFN0b3JlIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIGhvbGRzIHRoZSBuYW1lZCBzdG9yZSBpdGVtc1xyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBtZW1iZXJvZiBTdG9yZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgX2l0ZW1zID0ge307XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmVhZHMgYSBuYW1lZCBzdG9yZSBpdGVtXHJcbiAgICAgKlxyXG4gICAgICogQHRlbXBsYXRlIFNUT1JFSVRFTVRZUEUgc3BlY2lmaWVzIHRoZSBzdG9yZSBpdGVtcyB0eXBlIGZvciBjYXN0aW5nIHRvIHRoZSByZXN1bHQgdHlwZVxyXG4gICAgICogQHBhcmFtIHsqfSBzdG9yZUl0ZW1UeXBlQ29uc3RydWN0b3Igc3BlY2lmaWVzIHRoZSB0eXBlIHRvIGJlIGNvbnN0cnVjdGVkIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtzdG9yZUl0ZW1JZF0gc3BlY2lmaWVzIHN0b3JlIGl0ZW1zIGlkXHJcbiAgICAgKiBAcmV0dXJucyB7U1RPUkVJVEVNVFlQRX0gdGhlIHJlcXVlc3RlZCBzdG9yZSBpdGVtXHJcbiAgICAgKiBAbWVtYmVyb2YgU3RvcmVcclxuICAgICAqL1xyXG4gICAgcmVhZDxTVE9SRUlURU1UWVBFPihzdG9yZUl0ZW1UeXBlQ29uc3RydWN0b3I6VFN0b3JlSXRlbUNvbnN0cnVjdG9yLCBzdG9yZUl0ZW1JZDogc3RyaW5nKTogU1RPUkVJVEVNVFlQRSB7XHJcbiAgICAgICAgLy8gcmV0cmlldmUgYSBjb3B5IG9mIGEgbmFtZWQgc3RvcmUgaXRlbVxyXG4gICAgICAgIGNvbnN0IGl0ZW1WYWx1ZSA9ICB0aGlzLmdldFN0b3JlSXRlbTxTVE9SRUlURU1UWVBFPihzdG9yZUl0ZW1JZCwgc3RvcmVJdGVtVHlwZUNvbnN0cnVjdG9yKS52YWx1ZTtcclxuICAgICAgICAvLyB3ZSBjb3B5IHRoZSBpdGVtIHZhbHVlIHRvIHByb2hpYml0IGRpcmVjdGx5IG1vZGlmeWluZyB0aGUgb3JpZ2luYWwgb2JqZWN0LlxyXG4gICAgICAgIGxldCBzdG9yZUl0ZW06IFNUT1JFSVRFTVRZUEUgPSB0aGlzLmNvcHlJdGVtVmFsdWU8U1RPUkVJVEVNVFlQRT4oaXRlbVZhbHVlLCBzdG9yZUl0ZW1UeXBlQ29uc3RydWN0b3IpO1xyXG4gICAgICAgIHJldHVybiBzdG9yZUl0ZW07XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdXBkYXRlcyB0aGUgc3RvcmUgaXRlbSB3aXRoIHZhbHVlcyBvZiB0aGUgc3BlY2lmaWVkIGl0ZW1cclxuICAgICAqXHJcbiAgICAgKiBAdGVtcGxhdGUgU1RPUkVJVEVNVFlQRSBzcGVjaWZpZXMgdGhlIHN0b3JlIGl0ZW1zIHR5cGUgZm9yIGNhc3RpbmcgdG8gdGhlIHJlc3VsdCB0eXBlXHJcbiAgICAgKiBAcGFyYW0geyp9IHN0b3JlSXRlbVR5cGVDb25zdHJ1Y3RvciBzcGVjaWZpZXMgdGhlIHR5cGUgdG8gYmUgY29uc3RydWN0ZWQgXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW3N0b3JlSXRlbUlkXSBzcGVjaWZpZXMgc3RvcmUgaXRlbXMgaWRcclxuICAgICAqIEBtZW1iZXJvZiBTdG9yZVxyXG4gICAgICovXHJcbiAgICB1cGRhdGU8U1RPUkVJVEVNVFlQRT4oc3RvcmVJdGVtVHlwZUNvbnN0cnVjdG9yLCBuZXdWYWx1ZTogU1RPUkVJVEVNVFlQRSwgc3RvcmVJdGVtSWQ6IHN0cmluZykge1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGdldCB0aGUgbmFtZWQgc3RvcmUgaXRlbVxyXG4gICAgICAgIGxldCBzdG9yZUl0ZW1Qcm9wZXJ0eSA9IHRoaXMuZ2V0U3RvcmVJdGVtPFNUT1JFSVRFTVRZUEU+KHN0b3JlSXRlbUlkLCBzdG9yZUl0ZW1UeXBlQ29uc3RydWN0b3IpO1xyXG5cclxuICAgICAgICAvLyBpZiB0aGUgdmFsdWUgaXMgYm94ZWQgKHNob3VsZCBiZSBwYXNzZWQgYnkgcmVmZXJlbmNlKSB3ZSB1c2UganVzdCB1c2UgdGhlIGNvbnRhaW5lZCB2YWx1ZSBhcyBpdGVtIHZhbHVlLiBPdGhlcndpc2Ugd2UgY2xvbmVcclxuICAgICAgICAvLyB0aGUgdmFsdWUgdG8gbWFrZSBzdXJlIHRoYXQgdGhlIG9yaWdpbmFsIHZhbHUgY2FuJ3QgYmUgY2hhbmdlZCBpbiBhbnkgd2F5IVxyXG4gICAgICAgIGxldCBtb2RpZmllZFN0b3JlSXRlbTogU1RPUkVJVEVNVFlQRSA9IHRoaXMuY29weUl0ZW1WYWx1ZTxTVE9SRUlURU1UWVBFPihuZXdWYWx1ZSwgc3RvcmVJdGVtVHlwZUNvbnN0cnVjdG9yKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyB1cGRhdGUgKGFuZCBub3RpZnkgb2JzZXJ2ZXJzIGltcGxpY2l0bHkpIHRoZSBzdGF0ZSBwcm9wZXJ0aWVzIHZhbHVlIGlmIHRoZSBzdGF0ZSBvYmplY3RzIGNvbnRlbnQgaGFzIGNoYW5nZWQuIElmIHRoZSB1cGRhdGVcclxuICAgICAgICAvLyBpcyBmb3JjZWQgaHRlIHZhdWxlIGlzIHVwZGF0ZWQgYW55d2F5IGFuZCBpbiByZXNwb25zZSBub3RpZmllZCB0byBsaXN0ZW5lcnMuXHJcbiAgICAgICAgaWYgKCFPYmplY3RYLmRlZXBFcXVhbHMoc3RvcmVJdGVtUHJvcGVydHkudmFsdWUsbW9kaWZpZWRTdG9yZUl0ZW0pKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInVwZGF0ZWQgbW9kaWZpZWQgc3RhdGU6IG9sZCAlbyBuZXcgJW9cIixzdG9yZUl0ZW1Qcm9wZXJ0eS52YWx1ZSxtb2RpZmllZFN0b3JlSXRlbSk7XHJcbiAgICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgc3RvcmUgaXRlbSB2YWx1ZVxyXG4gICAgICAgICAgICBzdG9yZUl0ZW1Qcm9wZXJ0eS52YWx1ZSA9IG1vZGlmaWVkU3RvcmVJdGVtO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvcGllcyB0aGUgaXRlbSB2YWx1ZSB0byBwcm9oaWJpdCBhbnkgaW5kaXJlY3QgY2hhbmdlIG9mIHRoZSBvcmlnaW5hbCB2YWx1ZS4gXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEB0ZW1wbGF0ZSBTVE9SRUlURU1UWVBFXHJcbiAgICAgKiBAcGFyYW0ge1NUT1JFSVRFTVRZUEV9IG5ld1ZhbHVlXHJcbiAgICAgKiBAcGFyYW0geyp9IHN0b3JlSXRlbVR5cGVDb25zdHJ1Y3RvclxyXG4gICAgICogQHJldHVybnMge1NUT1JFSVRFTVRZUEV9XHJcbiAgICAgKiBAbWVtYmVyb2YgU3RvcmVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb3B5SXRlbVZhbHVlPFNUT1JFSVRFTVRZUEU+KG5ld1ZhbHVlOiBTVE9SRUlURU1UWVBFLCBzdG9yZUl0ZW1UeXBlQ29uc3RydWN0b3I6IGFueSk6IFNUT1JFSVRFTVRZUEUge1xyXG4gICAgICAgIC8vIGlmIHRoZSB2YWx1ZSBpcyBib3hlZCAoc2hvdWxkIGJlIHBhc3NlZCBhcyByZWZlcm5jZSApIHdlIGp1c3QgdXNlIHRoZSB1bmJveGVkIHZhbHVlLiBcclxuICAgICAgICAvLyBPdGhlciBvYmplY3RzIGFyZSBjb3BpZWQgdG8gcHJvaGliaXQgaW50ZW50aW9uYWwgb3IgdW5pbnRlbnRpb25hbCBtb2RpZmljYXRpb25zIG9mIHRoZSBvcmlnaW5hbCBvYmplY3RcclxuICAgICAgICByZXR1cm4gbmV3VmFsdWUgaW5zdGFuY2VvZiBEYXRhQm94ID8gKDxEYXRhQm94Pm5ld1ZhbHVlKS5VbmJveCgpIDogT2JqZWN0WC5jbG9uZTxTVE9SRUlURU1UWVBFPihzdG9yZUl0ZW1UeXBlQ29uc3RydWN0b3IsIG5ld1ZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGZvcmNlcyBhIGNhbGxiYWNrIG5vdGlmaWNhdGlvbiB3aXRoIHRoZSBjdXJyZW50IHN0b3JlIGl0ZW0gdmFsdWVcclxuICAgICAqXHJcbiAgICAgKiBAdGVtcGxhdGUgU1RPUkVJVEVNVFlQRVxyXG4gICAgICogQHBhcmFtIHsqfSBzdG9yZUl0ZW1UeXBlQ29uc3RydWN0b3JcclxuICAgICAqIEBwYXJhbSB7KG5ld1ZhbHVlOiBTVE9SRUlURU1UWVBFLCBvbGRWYWx1ZTogU1RPUkVJVEVNVFlQRSkgPT4gdm9pZH0gc3RvcmVJdGVtQ2hhbmdlZENhbGxiYWNrXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW3N0b3JlSXRlbUlkXVxyXG4gICAgICogQG1lbWJlcm9mIFN0b3JlXHJcbiAgICAgKi9cclxuICAgIHJlZnJlc2g8U1RPUkVJVEVNVFlQRT4oc3RvcmVJdGVtVHlwZUNvbnN0cnVjdG9yLCBzdG9yZUl0ZW1DaGFuZ2VkQ2FsbGJhY2s6ICgobmV3VmFsdWU6IFNUT1JFSVRFTVRZUEUsIG9sZFZhbHVlOiBTVE9SRUlURU1UWVBFKSA9PiB2b2lkKXx1bmRlZmluZWQgPSB1bmRlZmluZWQsIHN0b3JlSXRlbUlkOiBzdHJpbmcgKSB7XHJcbiAgICAgICAgLy8gZ2V0IHRoZSBuYW1lZCBzdG9yZSBpdGVtXHJcbiAgICAgICAgbGV0IHN0b3JlSXRlbVByb3BlcnR5ID0gdGhpcy5nZXRTdG9yZUl0ZW08U1RPUkVJVEVNVFlQRT4oc3RvcmVJdGVtSWQsIHN0b3JlSXRlbVR5cGVDb25zdHJ1Y3Rvcik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gdXBkYXRlIHRoZSBzdG9yZSBpdGVtIHZhbHVlXHJcbiAgICAgICAgc3RvcmVJdGVtUHJvcGVydHkucmVmcmVzaChzdG9yZUl0ZW1DaGFuZ2VkQ2FsbGJhY2spO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIG9ic2VydmVzIGNoYW5nZXMgb2YgdGhlIHN0b3JlIGl0ZW0gYXMgYSBjb25zZXF1ZW5jZSBvZiBhbiB1cGRhdGUgY2FsbC5cclxuICAgICAqXHJcbiAgICAgKiBAdGVtcGxhdGUgU1RPUkVJVEVNVFlQRSBzcGVjaWZpZXMgdGhlIHN0b3JlIGl0ZW1zIHR5cGUgZm9yIGNhc3RpbmcgdG8gdGhlIHJlc3VsdCB0eXBlXHJcbiAgICAgKiBAcGFyYW0geyp9IHN0b3JlSXRlbVR5cGVDb25zdHJ1Y3RvciBzcGVjaWZpZXMgdGhlIHR5cGUgdG8gYmUgY29uc3RydWN0ZWQgXHJcbiAgICAgKiBAcGFyYW0geyhuZXdWYWx1ZTogU1RPUkVJVEVNVFlQRSwgb2xkVmFsdWU6IFNUT1JFSVRFTVRZUEUpID0+IHZvaWR9IHN0b3JlSXRlbUNoYW5nZWRDYWxsYmFja1xyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW3N0b3JlSXRlbUlkXSBzcGVjaWZpZXMgc3RvcmUgaXRlbXMgaWRcclxuICAgICAqIEBtZW1iZXJvZiBTdG9yZVxyXG4gICAgICovXHJcbiAgICBvYnNlcnZlPFNUT1JFSVRFTVRZUEU+KHN0b3JlSXRlbVR5cGVDb25zdHJ1Y3Rvciwgc3RvcmVJdGVtQ2hhbmdlZENhbGxiYWNrOiAobmV3VmFsdWU6IFNUT1JFSVRFTVRZUEUsIG9sZFZhbHVlOiBTVE9SRUlURU1UWVBFKSA9PiB2b2lkLCBzdG9yZUl0ZW1JZDogc3RyaW5nICk6IHZvaWQge1xyXG4gICAgICAgIC8vIGdldCB0aGUgbmFtZWQgc3RvcmUgaXRlbVxyXG4gICAgICAgIGxldCBzdG9yZUl0ZW0gPSB0aGlzLmdldFN0b3JlSXRlbTxTVE9SRUlURU1UWVBFPihzdG9yZUl0ZW1JZCwgc3RvcmVJdGVtVHlwZUNvbnN0cnVjdG9yKTtcclxuICAgICAgICAvLyBhdHRhY2ggdGhlIGNoYW5nZSBub3RpZmljYXRpb24gY2FsbGJhY2tcclxuICAgICAgICBzdG9yZUl0ZW0uY2hhbmdlZChzdG9yZUl0ZW1DaGFuZ2VkQ2FsbGJhY2spO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gKiBjaGVja3MgaWYgdGhlIHN0b3JlIGNvbnRhaW5zIHRoZSBzcGVjZWZpZWQgaXRlbVxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gaXRlbUlkIHNwZWNpZmllcyBzdG9yZSBpdGVtcyBpZFxyXG4gKiBAcmV0dXJucyB7Kn1cclxuICogQG1lbWJlcm9mIFN0b3JlXHJcbiAqL1xyXG4gICAgY29udGFpbnMoaXRlbUlkOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVtcy5oYXNPd25Qcm9wZXJ0eShpdGVtSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmV0cmlldmVzIHRoZSBzdG9yZSBpdGVtIGJ5IGlkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEB0ZW1wbGF0ZSBTVE9SRUlURU1UWVBFIHNwZWNpZmllcyB0aGUgc3RvcmUgaXRlbXMgdHlwZSBmb3IgY2FzdGluZyB0byB0aGUgcmVzdWx0IHR5cGVcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IFtzdG9yZUl0ZW1JZD1cIlwiXSBzcGVjaWZpZXMgc3RvcmUgaXRlbXMgaWRcclxuICAgICAqIEBwYXJhbSB7Kn0gc3RvcmVJdGVtVHlwZSBzcGVjaWZpZXMgdGhlIHR5cGUgdG8gYmUgY29uc3RydWN0ZWQgXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvcGVydHk8U1RPUkVJVEVNVFlQRT59IGEgcHJvcGVydHkgb2JqZWN0IGhvbGRpbmcgdGhlIHN0b3JlIGl0ZW1cclxuICAgICAqIEBtZW1iZXJvZiBTdG9yZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFN0b3JlSXRlbTxTVE9SRUlURU1UWVBFPihzdG9yZUl0ZW1JZDogc3RyaW5nLCBzdG9yZUl0ZW1UeXBlOlRTdG9yZUl0ZW1Db25zdHJ1Y3Rvcik6IFByb3BlcnR5PFNUT1JFSVRFTVRZUEU+IHtcclxuXHJcbiAgICAgICAgY29uc3QgaXRlbVR5cGU6VFN0b3JlSXRlbUNvbnN0cnVjdG9yfHVuZGVmaW5lZCA9IHR5cGVvZiBzdG9yZUl0ZW1UeXBlICAhPT0gXCJzdHJpbmdcIiA/IHN0b3JlSXRlbVR5cGUgYXMgVFN0b3JlSXRlbUNvbnN0cnVjdG9yIDogdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICBsZXQgZWZmZWN0aXZlc3RvcmVJdGVtSWQgPSBzdG9yZUl0ZW1JZCA/IHN0b3JlSXRlbUlkIDogaXRlbVR5cGUgPyBpdGVtVHlwZS5uYW1lIDogXCJ1bmRlZmluZWRcIjtcclxuXHJcbiAgICAgICAgLy8gZ2V0IGFuIGV4aXN0aW5nIHN0b3JlIGl0ZW0gb3IgY3JlYXRlIGEgbmV3IG9uZS5cclxuICAgICAgICBpZiAoIXRoaXMuX2l0ZW1zW2VmZmVjdGl2ZXN0b3JlSXRlbUlkXSkge1xyXG5cclxuICAgICAgICAgICAgLy8gY3JlYXRlIGFuIGluaXRpYWwgdG9yZSBpdGVtIHZhbHVlXHJcbiAgICAgICAgICAgIGxldCBpbml0aWFsU3RvcmVJdGVtVmFsdWUgPSBpdGVtVHlwZSA/IG5ldyBpdGVtVHlwZSgpIDogdW5kZWZpbmVkIGFzIGFueTtcclxuICAgICAgICAgICAgdGhpcy5faXRlbXNbZWZmZWN0aXZlc3RvcmVJdGVtSWRdID0gUHJvcGVydHkuY3JlYXRlPFNUT1JFSVRFTVRZUEU+KGluaXRpYWxTdG9yZUl0ZW1WYWx1ZSk7ICAgXHJcbiAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXNbZWZmZWN0aXZlc3RvcmVJdGVtSWRdO1xyXG4gICAgfVxyXG59Il19