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
            this._items = new Map();
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
        Store.prototype.update = function (caller, storeItemTypeConstructor, newValue, storeItemId, forceUpdate) {
            if (forceUpdate === void 0) { forceUpdate = false; }
            // get the named store item
            var storeItemProperty = this.getStoreItem(storeItemId, storeItemTypeConstructor);
            // register the caller as accessor
            if (!storeItemProperty.isAccessedBy(caller)) {
                storeItemProperty.attachAccessor(caller);
            }
            // if the value is boxed (should be passed by reference) we use just use the contained value as item value. Otherwise we clone
            // the value to make sure that the original valu can't be changed in any way!
            var modifiedStoreItem = this.copyItemValue(newValue, storeItemTypeConstructor);
            // update (and notify observers implicitly) the state properties value if the state objects content has changed. If the update
            // is forced the vaule is updated anyway and in response sent to listeners.
            if (forceUpdate || !objectx_1.ObjectX.deepEquals(storeItemProperty.value, modifiedStoreItem)) {
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
         * observes changes of the store item as a consequence of an update call.
         *
         * @template STOREITEMTYPE specifies the store items type for casting to the result type
         * @param {*} storeItemTypeConstructor specifies the type to be constructed
         * @param {(newValue: STOREITEMTYPE, oldValue: STOREITEMTYPE) => void} storeItemChangedCallback
         * @param {string} [storeItemId] specifies store items id
         * @memberof Store
         */
        Store.prototype.observe = function (caller, storeItemTypeConstructor, storeItemChangedCallback, storeItemId) {
            // get the named store item
            var storeItem = this.getStoreItem(storeItemId, storeItemTypeConstructor);
            // observe the value change of the property and notify the caller
            if (!storeItem.isObservedBy(caller)) {
                // register the caller as observer
                storeItem.attachObserver(caller, storeItemChangedCallback);
            }
            else {
                console.error("shared propery store: The item %o is already attached to observer %o", storeItem, caller);
            }
        };
        /**
         * checks if the store contains the specified item
         *
         * @param {string} itemId specifies store items id
         * @returns {*}
         * @memberof Store
         */
        Store.prototype.contains = function (itemId) {
            return this._items.has(itemId);
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
            // get the existing property by id
            var property = this._items.get(effectivestoreItemId);
            // create a new one if not yet available
            if (!property) {
                // create an initial tore item value
                var initialStoreItemValue = itemType ? new itemType() : undefined;
                property = property_1.Property.create(initialStoreItemValue);
                // put the new property into the map
                this._items.set(effectivestoreItemId, property);
            }
            return property;
        };
        /**
         * Detaches all properties connected to the bound object
         *
         * @param {object} boundObject
         * @memberof Store
         */
        Store.prototype.detach = function (boundObject) {
            this.detachBoundObjectFromProperties(boundObject);
            this.deleteUnattachedProperties();
        };
        /**
         * Detaches the bound object from the related properties
         *
         * @private
         * @param {object} boundObject
         * @memberof Store
         */
        Store.prototype.detachBoundObjectFromProperties = function (boundObject) {
            // retrieve all observed properties
            var observedProperties = Array.from(this._items.values()).filter(function (storeProperty) { return storeProperty.isObservedBy(boundObject); });
            // detach the bound object from these properties as observer
            observedProperties.forEach(function (property) { property.detachObserver(boundObject); });
            // retrieve all accessed properties
            var accessedProperties = Array.from(this._items.values()).filter(function (storeProperty) { return storeProperty.isAccessedBy(boundObject); });
            // detach the bound object from these properties as accessor
            accessedProperties.forEach(function (property) { property.detachAccessor(boundObject); });
        };
        /**
         * Deletes all properties from the store which are not observed or accessed.
         *
         * @private
         * @memberof Store
         */
        Store.prototype.deleteUnattachedProperties = function () {
            var _this = this;
            // get the unattchaed property keys
            var unattachedPropertyKeys = Array.from(this._items.keys()).filter(function (storePropertyKey) {
                var propertyIsUnattached = false;
                var storeProperty = _this._items.get(storePropertyKey);
                if (storeProperty) {
                    propertyIsUnattached = !storeProperty.isAttached;
                }
                return propertyIsUnattached;
            });
            //// remove the unattached properties from the store
            unattachedPropertyKeys.forEach(function (unattachedPropertyKey) {
                _this._items.delete(unattachedPropertyKey);
            });
        };
        return Store;
    }());
    exports.Store = Store;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBwL2ZyYW1ld29yay9zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFNQTs7Ozs7T0FLRztJQUNIO1FBQUE7WUFFSTs7Ozs7ZUFLRztZQUNPLFdBQU0sR0FBNkIsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQW9NM0QsQ0FBQztRQWpNRzs7Ozs7Ozs7V0FRRztRQUNILG9CQUFJLEdBQUosVUFBb0Isd0JBQStDLEVBQUUsV0FBbUI7WUFDcEYsd0NBQXdDO1lBQ3hDLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQWdCLFdBQVcsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUNoRyw2RUFBNkU7WUFDN0UsSUFBSSxTQUFTLEdBQWtCLElBQUksQ0FBQyxhQUFhLENBQWdCLFNBQVMsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDO1lBQ3RHLE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFHRDs7Ozs7OztXQU9HO1FBQ0gsc0JBQU0sR0FBTixVQUFzQixNQUFjLEVBQUUsd0JBQXdCLEVBQUUsUUFBdUIsRUFBRSxXQUFtQixFQUFFLFdBQTRCO1lBQTVCLDRCQUFBLEVBQUEsbUJBQTRCO1lBRXRJLDJCQUEyQjtZQUMzQixJQUFJLGlCQUFpQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQWdCLFdBQVcsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDO1lBRWhHLGtDQUFrQztZQUNsQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUN6QyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDNUM7WUFFRCw4SEFBOEg7WUFDOUgsNkVBQTZFO1lBQzdFLElBQUksaUJBQWlCLEdBQWtCLElBQUksQ0FBQyxhQUFhLENBQWdCLFFBQVEsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDO1lBRTdHLDhIQUE4SDtZ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Q0FBQztZQUVILG9EQUFvRDtZQUNwRCxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsVUFBQyxxQkFBcUI7Z0JBQ2pELEtBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDOUMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBQ0wsWUFBQztJQUFELENBQUMsQUE1TUQsSUE0TUM7SUE1TVksc0JBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcm9wZXJ0eSB9IGZyb20gXCIuL3Byb3BlcnR5XCI7XHJcbmltcG9ydCB7IE9iamVjdFggfSBmcm9tIFwiLi4vY29tbW9uL3V0aWxpdGllcy9vYmplY3R4XCI7XHJcbmltcG9ydCB7IERhdGFCb3ggfSBmcm9tIFwiLi4vY29tbW9uL3V0aWxpdGllcy9kYXRhQm94XCI7XHJcbmltcG9ydCB7IFRDb25zdHJ1Y3RvciwgVENvbm5lY3Rpb25EYXRhVHlwZSB9IGZyb20gXCIuL2NvbXBvbmVudEh1Yi9jb21tb24vY29tbW9uVHlwZXNcIjtcclxuXHJcbmV4cG9ydCB0eXBlIFRTdG9yZUl0ZW1Db25zdHJ1Y3RvciA9IG5ldyAoKSA9PiBvYmplY3Q7XHJcbi8qKlxyXG4gKiBJbXBsZW1lbnMgYSBzdG9yZSBmb3IgaG9sZGluZyBhbmQgc2hhcmluZyBuYW1lZCBkYXRhIG9iamVjdHMuXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIFN0b3JlXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU3RvcmUge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogaG9sZHMgdGhlIG5hbWVkIHN0b3JlIGl0ZW1zXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQG1lbWJlcm9mIFN0b3JlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBfaXRlbXM6TWFwPHN0cmluZyxQcm9wZXJ0eTxhbnk+PiA9IG5ldyBNYXAoKTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZWFkcyBhIG5hbWVkIHN0b3JlIGl0ZW1cclxuICAgICAqXHJcbiAgICAgKiBAdGVtcGxhdGUgU1RPUkVJVEVNVFlQRSBzcGVjaWZpZXMgdGhlIHN0b3JlIGl0ZW1zIHR5cGUgZm9yIGNhc3RpbmcgdG8gdGhlIHJlc3VsdCB0eXBlXHJcbiAgICAgKiBAcGFyYW0geyp9IHN0b3JlSXRlbVR5cGVDb25zdHJ1Y3RvciBzcGVjaWZpZXMgdGhlIHR5cGUgdG8gYmUgY29uc3RydWN0ZWQgXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW3N0b3JlSXRlbUlkXSBzcGVjaWZpZXMgc3RvcmUgaXRlbXMgaWRcclxuICAgICAqIEByZXR1cm5zIHtTVE9SRUlURU1UWVBFfSB0aGUgcmVxdWVzdGVkIHN0b3JlIGl0ZW1cclxuICAgICAqIEBtZW1iZXJvZiBTdG9yZVxyXG4gICAgICovXHJcbiAgICByZWFkPFNUT1JFSVRFTVRZUEU+KHN0b3JlSXRlbVR5cGVDb25zdHJ1Y3RvcjogVFN0b3JlSXRlbUNvbnN0cnVjdG9yLCBzdG9yZUl0ZW1JZDogc3RyaW5nKTogU1RPUkVJVEVNVFlQRSB7XHJcbiAgICAgICAgLy8gcmV0cmlldmUgYSBjb3B5IG9mIGEgbmFtZWQgc3RvcmUgaXRlbVxyXG4gICAgICAgIGNvbnN0IGl0ZW1WYWx1ZSA9IHRoaXMuZ2V0U3RvcmVJdGVtPFNUT1JFSVRFTVRZUEU+KHN0b3JlSXRlbUlkLCBzdG9yZUl0ZW1UeXBlQ29uc3RydWN0b3IpLnZhbHVlO1xyXG4gICAgICAgIC8vIHdlIGNvcHkgdGhlIGl0ZW0gdmFsdWUgdG8gcHJvaGliaXQgZGlyZWN0bHkgbW9kaWZ5aW5nIHRoZSBvcmlnaW5hbCBvYmplY3QuXHJcbiAgICAgICAgbGV0IHN0b3JlSXRlbTogU1RPUkVJVEVNVFlQRSA9IHRoaXMuY29weUl0ZW1WYWx1ZTxTVE9SRUlURU1UWVBFPihpdGVtVmFsdWUsIHN0b3JlSXRlbVR5cGVDb25zdHJ1Y3Rvcik7XHJcbiAgICAgICAgcmV0dXJuIHN0b3JlSXRlbTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB1cGRhdGVzIHRoZSBzdG9yZSBpdGVtIHdpdGggdmFsdWVzIG9mIHRoZSBzcGVjaWZpZWQgaXRlbVxyXG4gICAgICpcclxuICAgICAqIEB0ZW1wbGF0ZSBTVE9SRUlURU1UWVBFIHNwZWNpZmllcyB0aGUgc3RvcmUgaXRlbXMgdHlwZSBmb3IgY2FzdGluZyB0byB0aGUgcmVzdWx0IHR5cGVcclxuICAgICAqIEBwYXJhbSB7Kn0gc3RvcmVJdGVtVHlwZUNvbnN0cnVjdG9yIHNwZWNpZmllcyB0aGUgdHlwZSB0byBiZSBjb25zdHJ1Y3RlZCBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbc3RvcmVJdGVtSWRdIHNwZWNpZmllcyBzdG9yZSBpdGVtcyBpZFxyXG4gICAgICogQG1lbWJlcm9mIFN0b3JlXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZTxTVE9SRUlURU1UWVBFPihjYWxsZXI6IG9iamVjdCwgc3RvcmVJdGVtVHlwZUNvbnN0cnVjdG9yLCBuZXdWYWx1ZTogU1RPUkVJVEVNVFlQRSwgc3RvcmVJdGVtSWQ6IHN0cmluZywgZm9yY2VVcGRhdGU6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG5cclxuICAgICAgICAvLyBnZXQgdGhlIG5hbWVkIHN0b3JlIGl0ZW1cclxuICAgICAgICBsZXQgc3RvcmVJdGVtUHJvcGVydHkgPSB0aGlzLmdldFN0b3JlSXRlbTxTVE9SRUlURU1UWVBFPihzdG9yZUl0ZW1JZCwgc3RvcmVJdGVtVHlwZUNvbnN0cnVjdG9yKTtcclxuXHJcbiAgICAgICAgLy8gcmVnaXN0ZXIgdGhlIGNhbGxlciBhcyBhY2Nlc3NvclxyXG4gICAgICAgIGlmICghc3RvcmVJdGVtUHJvcGVydHkuaXNBY2Nlc3NlZEJ5KGNhbGxlcikpIHtcclxuICAgICAgICAgICAgc3RvcmVJdGVtUHJvcGVydHkuYXR0YWNoQWNjZXNzb3IoY2FsbGVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGlmIHRoZSB2YWx1ZSBpcyBib3hlZCAoc2hvdWxkIGJlIHBhc3NlZCBieSByZWZlcmVuY2UpIHdlIHVzZSBqdXN0IHVzZSB0aGUgY29udGFpbmVkIHZhbHVlIGFzIGl0ZW0gdmFsdWUuIE90aGVyd2lzZSB3ZSBjbG9uZVxyXG4gICAgICAgIC8vIHRoZSB2YWx1ZSB0byBtYWtlIHN1cmUgdGhhdCB0aGUgb3JpZ2luYWwgdmFsdSBjYW4ndCBiZSBjaGFuZ2VkIGluIGFueSB3YXkhXHJcbiAgICAgICAgbGV0IG1vZGlmaWVkU3RvcmVJdGVtOiBTVE9SRUlURU1UWVBFID0gdGhpcy5jb3B5SXRlbVZhbHVlPFNUT1JFSVRFTVRZUEU+KG5ld1ZhbHVlLCBzdG9yZUl0ZW1UeXBlQ29uc3RydWN0b3IpO1xyXG5cclxuICAgICAgICAvLyB1cGRhdGUgKGFuZCBub3RpZnkgb2JzZXJ2ZXJzIGltcGxpY2l0bHkpIHRoZSBzdGF0ZSBwcm9wZXJ0aWVzIHZhbHVlIGlmIHRoZSBzdGF0ZSBvYmplY3RzIGNvbnRlbnQgaGFzIGNoYW5nZWQuIElmIHRoZSB1cGRhdGVcclxuICAgICAgICAvLyBpcyBmb3JjZWQgdGhlIHZhdWxlIGlzIHVwZGF0ZWQgYW55d2F5IGFuZCBpbiByZXNwb25zZSBzZW50IHRvIGxpc3RlbmVycy5cclxuICAgICAgICBpZiAoZm9yY2VVcGRhdGUgfHwgIU9iamVjdFguZGVlcEVxdWFscyhzdG9yZUl0ZW1Qcm9wZXJ0eS52YWx1ZSwgbW9kaWZpZWRTdG9yZUl0ZW0pKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInVwZGF0ZWQgbW9kaWZpZWQgc3RhdGU6IG9sZCAlbyBuZXcgJW9cIixzdG9yZUl0ZW1Qcm9wZXJ0eS52YWx1ZSxtb2RpZmllZFN0b3JlSXRlbSk7XHJcbiAgICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgc3RvcmUgaXRlbSB2YWx1ZVxyXG4gICAgICAgICAgICBzdG9yZUl0ZW1Qcm9wZXJ0eS52YWx1ZSA9IG1vZGlmaWVkU3RvcmVJdGVtO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvcGllcyB0aGUgaXRlbSB2YWx1ZSB0byBwcm9oaWJpdCBhbnkgaW5kaXJlY3QgY2hhbmdlIG9mIHRoZSBvcmlnaW5hbCB2YWx1ZS4gXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEB0ZW1wbGF0ZSBTVE9SRUlURU1UWVBFXHJcbiAgICAgKiBAcGFyYW0ge1NUT1JFSVRFTVRZUEV9IG5ld1ZhbHVlXHJcbiAgICAgKiBAcGFyYW0geyp9IHN0b3JlSXRlbVR5cGVDb25zdHJ1Y3RvclxyXG4gICAgICogQHJldHVybnMge1NUT1JFSVRFTVRZUEV9XHJcbiAgICAgKiBAbWVtYmVyb2YgU3RvcmVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb3B5SXRlbVZhbHVlPFNUT1JFSVRFTVRZUEU+KG5ld1ZhbHVlOiBTVE9SRUlURU1UWVBFLCBzdG9yZUl0ZW1UeXBlQ29uc3RydWN0b3I6IGFueSk6IFNUT1JFSVRFTVRZUEUge1xyXG4gICAgICAgIC8vIGlmIHRoZSB2YWx1ZSBpcyBib3hlZCAoc2hvdWxkIGJlIHBhc3NlZCBhcyByZWZlcm5jZSApIHdlIGp1c3QgdXNlIHRoZSB1bmJveGVkIHZhbHVlLiBcclxuICAgICAgICAvLyBPdGhlciBvYmplY3RzIGFyZSBjb3BpZWQgdG8gcHJvaGliaXQgaW50ZW50aW9uYWwgb3IgdW5pbnRlbnRpb25hbCBtb2RpZmljYXRpb25zIG9mIHRoZSBvcmlnaW5hbCBvYmplY3RcclxuICAgICAgICByZXR1cm4gbmV3VmFsdWUgaW5zdGFuY2VvZiBEYXRhQm94ID8gKDxEYXRhQm94Pm5ld1ZhbHVlKS5VbmJveCgpIDogT2JqZWN0WC5jbG9uZTxTVE9SRUlURU1UWVBFPihzdG9yZUl0ZW1UeXBlQ29uc3RydWN0b3IsIG5ld1ZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIG9ic2VydmVzIGNoYW5nZXMgb2YgdGhlIHN0b3JlIGl0ZW0gYXMgYSBjb25zZXF1ZW5jZSBvZiBhbiB1cGRhdGUgY2FsbC5cclxuICAgICAqXHJcbiAgICAgKiBAdGVtcGxhdGUgU1RPUkVJVEVNVFlQRSBzcGVjaWZpZXMgdGhlIHN0b3JlIGl0ZW1zIHR5cGUgZm9yIGNhc3RpbmcgdG8gdGhlIHJlc3VsdCB0eXBlXHJcbiAgICAgKiBAcGFyYW0geyp9IHN0b3JlSXRlbVR5cGVDb25zdHJ1Y3RvciBzcGVjaWZpZXMgdGhlIHR5cGUgdG8gYmUgY29uc3RydWN0ZWQgXHJcbiAgICAgKiBAcGFyYW0geyhuZXdWYWx1ZTogU1RPUkVJVEVNVFlQRSwgb2xkVmFsdWU6IFNUT1JFSVRFTVRZUEUpID0+IHZvaWR9IHN0b3JlSXRlbUNoYW5nZWRDYWxsYmFja1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtzdG9yZUl0ZW1JZF0gc3BlY2lmaWVzIHN0b3JlIGl0ZW1zIGlkXHJcbiAgICAgKiBAbWVtYmVyb2YgU3RvcmVcclxuICAgICAqL1xyXG4gICAgb2JzZXJ2ZTxTVE9SRUlURU1UWVBFPihjYWxsZXI6IG9iamVjdCwgc3RvcmVJdGVtVHlwZUNvbnN0cnVjdG9yLCBzdG9yZUl0ZW1DaGFuZ2VkQ2FsbGJhY2s6IChuZXdWYWx1ZTogU1RPUkVJVEVNVFlQRSwgb2xkVmFsdWU6IFNUT1JFSVRFTVRZUEUpID0+IHZvaWQsIHN0b3JlSXRlbUlkOiBzdHJpbmcpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgLy8gZ2V0IHRoZSBuYW1lZCBzdG9yZSBpdGVtXHJcbiAgICAgICAgbGV0IHN0b3JlSXRlbSA9IHRoaXMuZ2V0U3RvcmVJdGVtPFNUT1JFSVRFTVRZUEU+KHN0b3JlSXRlbUlkLCBzdG9yZUl0ZW1UeXBlQ29uc3RydWN0b3IpO1xyXG5cclxuICAgICAgICAvLyBvYnNlcnZlIHRoZSB2YWx1ZSBjaGFuZ2Ugb2YgdGhlIHByb3BlcnR5IGFuZCBub3RpZnkgdGhlIGNhbGxlclxyXG4gICAgICAgIGlmICghc3RvcmVJdGVtLmlzT2JzZXJ2ZWRCeShjYWxsZXIpKSB7XHJcbiAgICAgICAgICAgIC8vIHJlZ2lzdGVyIHRoZSBjYWxsZXIgYXMgb2JzZXJ2ZXJcclxuICAgICAgICAgICAgc3RvcmVJdGVtLmF0dGFjaE9ic2VydmVyKGNhbGxlcixzdG9yZUl0ZW1DaGFuZ2VkQ2FsbGJhY2spO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwic2hhcmVkIHByb3Blcnkgc3RvcmU6IFRoZSBpdGVtICVvIGlzIGFscmVhZHkgYXR0YWNoZWQgdG8gb2JzZXJ2ZXIgJW9cIiwgc3RvcmVJdGVtLCBjYWxsZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjaGVja3MgaWYgdGhlIHN0b3JlIGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgaXRlbVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpdGVtSWQgc3BlY2lmaWVzIHN0b3JlIGl0ZW1zIGlkXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqIEBtZW1iZXJvZiBTdG9yZVxyXG4gICAgICovXHJcbiAgICBjb250YWlucyhpdGVtSWQ6IHN0cmluZyk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zLmhhcyhpdGVtSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmV0cmlldmVzIHRoZSBzdG9yZSBpdGVtIGJ5IGlkXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEB0ZW1wbGF0ZSBTVE9SRUlURU1UWVBFIHNwZWNpZmllcyB0aGUgc3RvcmUgaXRlbXMgdHlwZSBmb3IgY2FzdGluZyB0byB0aGUgcmVzdWx0IHR5cGVcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IFtzdG9yZUl0ZW1JZD1cIlwiXSBzcGVjaWZpZXMgc3RvcmUgaXRlbXMgaWRcclxuICAgICAqIEBwYXJhbSB7Kn0gc3RvcmVJdGVtVHlwZSBzcGVjaWZpZXMgdGhlIHR5cGUgdG8gYmUgY29uc3RydWN0ZWQgXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvcGVydHk8U1RPUkVJVEVNVFlQRT59IGEgcHJvcGVydHkgb2JqZWN0IGhvbGRpbmcgdGhlIHN0b3JlIGl0ZW1cclxuICAgICAqIEBtZW1iZXJvZiBTdG9yZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFN0b3JlSXRlbTxTVE9SRUlURU1UWVBFPihzdG9yZUl0ZW1JZDogc3RyaW5nLCBzdG9yZUl0ZW1UeXBlOiBUQ29ubmVjdGlvbkRhdGFUeXBlKTogUHJvcGVydHk8U1RPUkVJVEVNVFlQRT4ge1xyXG5cclxuICAgICAgICBjb25zdCBpdGVtVHlwZTogVENvbnN0cnVjdG9yIHwgdW5kZWZpbmVkID0gdHlwZW9mIHN0b3JlSXRlbVR5cGUgIT09IFwic3RyaW5nXCIgPyBzdG9yZUl0ZW1UeXBlIGFzIFRDb25zdHJ1Y3RvciA6IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgbGV0IGVmZmVjdGl2ZXN0b3JlSXRlbUlkID0gc3RvcmVJdGVtSWQgPyBzdG9yZUl0ZW1JZCA6IGl0ZW1UeXBlID8gaXRlbVR5cGUubmFtZSA6IFwidW5kZWZpbmVkXCI7XHJcblxyXG4gICAgICAgIC8vIGdldCB0aGUgZXhpc3RpbmcgcHJvcGVydHkgYnkgaWRcclxuICAgICAgICBsZXQgcHJvcGVydHkgPSB0aGlzLl9pdGVtcy5nZXQoZWZmZWN0aXZlc3RvcmVJdGVtSWQpO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgYSBuZXcgb25lIGlmIG5vdCB5ZXQgYXZhaWxhYmxlXHJcbiAgICAgICAgaWYgKCFwcm9wZXJ0eSkge1xyXG5cclxuICAgICAgICAgICAgLy8gY3JlYXRlIGFuIGluaXRpYWwgdG9yZSBpdGVtIHZhbHVlXHJcbiAgICAgICAgICAgIGxldCBpbml0aWFsU3RvcmVJdGVtVmFsdWUgPSBpdGVtVHlwZSA/IG5ldyBpdGVtVHlwZSgpIDogdW5kZWZpbmVkIGFzIGFueTtcclxuICAgICAgICAgICAgcHJvcGVydHkgPSBQcm9wZXJ0eS5jcmVhdGU8U1RPUkVJVEVNVFlQRT4oaW5pdGlhbFN0b3JlSXRlbVZhbHVlKTtcclxuICAgICAgICAgICAgLy8gcHV0IHRoZSBuZXcgcHJvcGVydHkgaW50byB0aGUgbWFwXHJcbiAgICAgICAgICAgIHRoaXMuX2l0ZW1zLnNldChlZmZlY3RpdmVzdG9yZUl0ZW1JZCxwcm9wZXJ0eSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcHJvcGVydHk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXRhY2hlcyBhbGwgcHJvcGVydGllcyBjb25uZWN0ZWQgdG8gdGhlIGJvdW5kIG9iamVjdFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBib3VuZE9iamVjdFxyXG4gICAgICogQG1lbWJlcm9mIFN0b3JlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkZXRhY2goYm91bmRPYmplY3Q6IG9iamVjdCkge1xyXG4gIFxyXG4gICAgICAgIHRoaXMuZGV0YWNoQm91bmRPYmplY3RGcm9tUHJvcGVydGllcyhib3VuZE9iamVjdCk7XHJcblxyXG4gICAgICAgIHRoaXMuZGVsZXRlVW5hdHRhY2hlZFByb3BlcnRpZXMoKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGV0YWNoZXMgdGhlIGJvdW5kIG9iamVjdCBmcm9tIHRoZSByZWxhdGVkIHByb3BlcnRpZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGJvdW5kT2JqZWN0XHJcbiAgICAgKiBAbWVtYmVyb2YgU3RvcmVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkZXRhY2hCb3VuZE9iamVjdEZyb21Qcm9wZXJ0aWVzKGJvdW5kT2JqZWN0OiBvYmplY3QpIHtcclxuXHJcbiAgICAgICAgLy8gcmV0cmlldmUgYWxsIG9ic2VydmVkIHByb3BlcnRpZXNcclxuICAgICAgICBjb25zdCBvYnNlcnZlZFByb3BlcnRpZXM6IEFycmF5PFByb3BlcnR5PGFueT4+ID0gQXJyYXkuZnJvbSh0aGlzLl9pdGVtcy52YWx1ZXMoKSkuZmlsdGVyKChzdG9yZVByb3BlcnR5KSA9PiB7IHJldHVybiBzdG9yZVByb3BlcnR5LmlzT2JzZXJ2ZWRCeShib3VuZE9iamVjdCk7IH0pO1xyXG4gICAgICAgIC8vIGRldGFjaCB0aGUgYm91bmQgb2JqZWN0IGZyb20gdGhlc2UgcHJvcGVydGllcyBhcyBvYnNlcnZlclxyXG4gICAgICAgIG9ic2VydmVkUHJvcGVydGllcy5mb3JFYWNoKChwcm9wZXJ0eSkgPT4geyBwcm9wZXJ0eS5kZXRhY2hPYnNlcnZlcihib3VuZE9iamVjdCk7IH0pO1xyXG5cclxuICAgICAgICAvLyByZXRyaWV2ZSBhbGwgYWNjZXNzZWQgcHJvcGVydGllc1xyXG4gICAgICAgIGNvbnN0IGFjY2Vzc2VkUHJvcGVydGllczogQXJyYXk8UHJvcGVydHk8YW55Pj4gPSBBcnJheS5mcm9tKHRoaXMuX2l0ZW1zLnZhbHVlcygpKS5maWx0ZXIoKHN0b3JlUHJvcGVydHkpID0+IHsgcmV0dXJuIHN0b3JlUHJvcGVydHkuaXNBY2Nlc3NlZEJ5KGJvdW5kT2JqZWN0KTsgfSk7XHJcbiAgICAgICAgLy8gZGV0YWNoIHRoZSBib3VuZCBvYmplY3QgZnJvbSB0aGVzZSBwcm9wZXJ0aWVzIGFzIGFjY2Vzc29yXHJcbiAgICAgICAgYWNjZXNzZWRQcm9wZXJ0aWVzLmZvckVhY2goKHByb3BlcnR5KSA9PiB7IHByb3BlcnR5LmRldGFjaEFjY2Vzc29yKGJvdW5kT2JqZWN0KTsgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWxldGVzIGFsbCBwcm9wZXJ0aWVzIGZyb20gdGhlIHN0b3JlIHdoaWNoIGFyZSBub3Qgb2JzZXJ2ZWQgb3IgYWNjZXNzZWQuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBTdG9yZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRlbGV0ZVVuYXR0YWNoZWRQcm9wZXJ0aWVzKCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGdldCB0aGUgdW5hdHRjaGFlZCBwcm9wZXJ0eSBrZXlzXHJcbiAgICAgICAgY29uc3QgdW5hdHRhY2hlZFByb3BlcnR5S2V5cyA9IEFycmF5LmZyb20odGhpcy5faXRlbXMua2V5cygpKS5maWx0ZXIoKHN0b3JlUHJvcGVydHlLZXkpID0+IHtcclxuICAgICAgICAgICAgbGV0IHByb3BlcnR5SXNVbmF0dGFjaGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0b3JlUHJvcGVydHkgPSB0aGlzLl9pdGVtcy5nZXQoc3RvcmVQcm9wZXJ0eUtleSk7XHJcbiAgICAgICAgICAgIGlmIChzdG9yZVByb3BlcnR5KSB7XHJcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eUlzVW5hdHRhY2hlZCA9ICFzdG9yZVByb3BlcnR5LmlzQXR0YWNoZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHByb3BlcnR5SXNVbmF0dGFjaGVkO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLy8vIHJlbW92ZSB0aGUgdW5hdHRhY2hlZCBwcm9wZXJ0aWVzIGZyb20gdGhlIHN0b3JlXHJcbiAgICAgICAgdW5hdHRhY2hlZFByb3BlcnR5S2V5cy5mb3JFYWNoKCh1bmF0dGFjaGVkUHJvcGVydHlLZXkpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5faXRlbXMuZGVsZXRlKHVuYXR0YWNoZWRQcm9wZXJ0eUtleSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iXX0=