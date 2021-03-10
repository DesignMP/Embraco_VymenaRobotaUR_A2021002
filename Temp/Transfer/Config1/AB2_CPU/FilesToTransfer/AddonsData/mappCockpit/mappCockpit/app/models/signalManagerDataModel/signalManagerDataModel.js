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
define(["require", "exports", "./signalRoot", "../dataModelBase", "../dataModelInterface", "./signalCategory", "../../framework/events", "./eventSignalManagerDataChangedArgs", "../common/signal/serieContainer", "./signalManagerCalculationInputData"], function (require, exports, signalRoot_1, dataModelBase_1, dataModelInterface_1, signalCategory_1, events_1, eventSignalManagerDataChangedArgs_1, serieContainer_1, signalManagerCalculationInputData_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventSignalRemoved = /** @class */ (function (_super) {
        __extends(EventSignalRemoved, _super);
        function EventSignalRemoved() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventSignalRemoved;
    }(events_1.TypedEvent));
    ;
    var SignalManagerDataModel = /** @class */ (function (_super) {
        __extends(SignalManagerDataModel, _super);
        function SignalManagerDataModel() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.eventSignalRemoved = new EventSignalRemoved();
            _this._supressUpdate = false;
            _this._editModeActive = false;
            _this._dataChangedHandler = function (sender, args) { return _this.onDataChanged(sender, args); };
            return _this;
        }
        Object.defineProperty(SignalManagerDataModel.prototype, "editModeActive", {
            /**
             * Returns the information if the datamodel provides data for the edit mode
             *
             * @type {boolean}
             * @memberof SignalManagerDataModel
             */
            get: function () {
                return this._editModeActive;
            },
            /**
             * Sets the information if the datamodel should provide the data for "edit mode" or "normal mode"
             *
             * @memberof SignalManagerDataModel
             */
            set: function (value) {
                this._editModeActive = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Initialization of the signalmanager datamodel
         *
         * @memberof SignalManagerDataModel
         */
        SignalManagerDataModel.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._signalManagerData = new signalRoot_1.SignalRoot(this);
            this._signalManagerData.eventDataChanged.attach(this._dataChangedHandler);
            this._data = this._signalManagerData.childs;
        };
        SignalManagerDataModel.prototype.dispose = function () {
            this._signalManagerData.eventDataChanged.detach(this._dataChangedHandler);
        };
        /**
         * Removes all data from datamodel (excepting the root categories)
         *
         * @memberof SignalManagerDataModel
         */
        SignalManagerDataModel.prototype.clear = function () {
            this._supressUpdate = true;
            this._signalManagerData.clear();
            this._supressUpdate = false;
            this.raiseModelChangedEvent(new eventSignalManagerDataChangedArgs_1.EventSignalManagerDataChangedArgs(eventSignalManagerDataChangedArgs_1.SignalManagerAction.clearAll, ""));
        };
        /**
         * Adds a signal container to the datamodel (into the given category) // TODO: implement subcategory
         *
         * @param {ISerieContainer} serieContainer
         * @param {string} categoryId
         * @memberof SignalManagerDataModel
         */
        SignalManagerDataModel.prototype.addSerieContainer = function (serieContainer, categoryId) {
            for (var i = 0; i < this._data.length; i++) {
                if (this._data[i].id == categoryId) {
                    this._data[i].addSerieContainer(serieContainer, 0);
                }
            }
        };
        /**
         * Removes the given signal container from the datamodel
         *
         * @param {ISerieContainer} serieContainer
         * @memberof SignalManagerDataModel
         */
        SignalManagerDataModel.prototype.removeSerieContainer = function (serieContainer) {
            // Remove SerieContainer from category node ...
            this._data.forEach(function (category) {
                category.removeSerieContainer(serieContainer);
            });
        };
        /**
         * Returns the signal category with the given id // TODO: implement recursive, not only 2 levels
         *
         * @param {string} id
         * @returns {(ISignalCategory|undefined)}
         * @memberof SignalManagerDataModel
         */
        SignalManagerDataModel.prototype.getSignalCategory = function (id) {
            var signalCategory;
            this.data.forEach(function (child) {
                if (child.id == id) {
                    signalCategory = child;
                }
                else {
                    child.childs.forEach(function (subChild) {
                        if (subChild instanceof signalCategory_1.SignalCategory) {
                            if (subChild.id == id) {
                                signalCategory = subChild;
                            }
                        }
                    });
                }
            });
            return signalCategory;
        };
        /**
         * Removes the given serieNode
         *
         * @param {ISerieNode} serieNode
         * @memberof SignalManagerDataModel
         */
        SignalManagerDataModel.prototype.removeSerieNode = function (serieNode) {
            this._data.forEach(function (category) {
                category.removeSerieNode(serieNode);
            });
        };
        /**
         * Executed when some data was changed(signal or signalcontainer added or removed)
         *
         * @private
         * @param {*} sender
         * @param {EventSignalManagerDataChangedArgs} args
         * @memberof SignalManagerDataModel
         */
        SignalManagerDataModel.prototype.onDataChanged = function (sender, args) {
            var _this = this;
            if (args.action == eventSignalManagerDataChangedArgs_1.SignalManagerAction.remove) {
                if (args.data instanceof serieContainer_1.SerieContainer) {
                    args.data.getSeries().forEach(function (serie) {
                        _this.onSerieRemoved(serie);
                    });
                }
                else {
                    // send serie removed event
                    var serieNode = args.data;
                    if (serieNode != undefined && !(serieNode instanceof signalManagerCalculationInputData_1.SignalManagerCalculationInputData)) {
                        this.onSerieRemoved(serieNode.serie);
                    }
                }
            }
            if (this._supressUpdate == false) {
                this.raiseModelChangedEvent(args);
            }
        };
        /**
         * Raises the model changed event
         *
         * @private
         * @memberof SignalManagerDataModel
         */
        SignalManagerDataModel.prototype.raiseModelChangedEvent = function (args) {
            // e.g. updates the signal manager widget
            var eventArgs = new dataModelInterface_1.EventModelChangedArgs(this, dataModelInterface_1.ModelChangeType.updateTarget, args.action, this.data);
            this.onModelChanged(this, eventArgs);
        };
        /**
         * Raises the signal removed event
         *
         * @private
         * @param {BaseSeries} serie
         * @memberof SignalManagerDataModel
         */
        SignalManagerDataModel.prototype.onSerieRemoved = function (serie) {
            if (serie != undefined) {
                this.eventSignalRemoved.raise(this, serie);
            }
        };
        return SignalManagerDataModel;
    }(dataModelBase_1.DataModelBase));
    exports.SignalManagerDataModel = SignalManagerDataModel;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsTWFuYWdlckRhdGFNb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvbW9kZWxzL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvc2lnbmFsTWFuYWdlckRhdGFNb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBY0E7UUFBaUMsc0NBQStDO1FBQWhGOztRQUFrRixDQUFDO1FBQUQseUJBQUM7SUFBRCxDQUFDLEFBQW5GLENBQWlDLG1CQUFVLEdBQXdDO0lBQUEsQ0FBQztJQUVwRjtRQUE0QywwQ0FBYTtRQUF6RDtZQUFBLHFFQW1MQztZQWpMQyx3QkFBa0IsR0FBdUIsSUFBSSxrQkFBa0IsRUFBRSxDQUFDO1lBRzFELG9CQUFjLEdBQWEsS0FBSyxDQUFDO1lBQ2pDLHFCQUFlLEdBQVksS0FBSyxDQUFDO1lBRWpDLHlCQUFtQixHQUFHLFVBQUMsTUFBTSxFQUFFLElBQUksSUFBSSxPQUFBLEtBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxFQUEvQixDQUErQixDQUFDOztRQTJLakYsQ0FBQztRQW5LQyxzQkFBVyxrREFBYztZQU56Qjs7Ozs7ZUFLRztpQkFDSDtnQkFDRSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7WUFDOUIsQ0FBQztZQUVEOzs7O2VBSUc7aUJBQ0gsVUFBMEIsS0FBYztnQkFDdEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7WUFDL0IsQ0FBQzs7O1dBVEE7UUFhRDs7OztXQUlHO1FBQ0gsMkNBQVUsR0FBVjtZQUNFLGlCQUFNLFVBQVUsV0FBRSxDQUFDO1lBRW5CLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLHVCQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUUxRSxJ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LDJCQUEyQjtvQkFDM0IsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDMUIsSUFBRyxTQUFTLElBQUksU0FBUyxJQUFJLENBQUMsQ0FBQyxTQUFTLFlBQVkscUVBQWlDLENBQUMsRUFBQzt3QkFDckYsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQ3RDO2lCQUNGO2FBQ0Y7WUFDRCxJQUFHLElBQUksQ0FBQyxjQUFjLElBQUksS0FBSyxFQUFDO2dCQUM5QixJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDbkM7UUFDSCxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSyx1REFBc0IsR0FBOUIsVUFBK0IsSUFBdUM7WUFDcEUseUNBQXlDO1lBQ3pDLElBQUksU0FBUyxHQUFHLElBQUksMENBQXFCLENBQUMsSUFBSSxFQUFFLG9DQUFlLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZDLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSywrQ0FBYyxHQUF0QixVQUF1QixLQUFpQjtZQUN0QyxJQUFHLEtBQUssSUFBSSxTQUFTLEVBQUM7Z0JBQ3BCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQzVDO1FBQ0gsQ0FBQztRQUNILDZCQUFDO0lBQUQsQ0FBQyxBQW5MRCxDQUE0Qyw2QkFBYSxHQW1MeEQ7SUFuTFksd0RBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVNpZ25hbE1hbmFnZXJEYXRhTW9kZWwgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWxJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU2lnbmFsUm9vdCB9IGZyb20gXCIuL3NpZ25hbFJvb3RcIjtcclxuaW1wb3J0IHsgRGF0YU1vZGVsQmFzZSB9IGZyb20gXCIuLi9kYXRhTW9kZWxCYXNlXCI7XHJcbmltcG9ydCB7IEV2ZW50TW9kZWxDaGFuZ2VkQXJncywgTW9kZWxDaGFuZ2VUeXBlIH0gZnJvbSBcIi4uL2RhdGFNb2RlbEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTaWduYWxDYXRlZ29yeSB9IGZyb20gXCIuL3NpZ25hbENhdGVnb3J5XCI7XHJcbmltcG9ydCB7IFR5cGVkRXZlbnQgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2V2ZW50c1wiO1xyXG5pbXBvcnQgeyBFdmVudFNpZ25hbE1hbmFnZXJEYXRhQ2hhbmdlZEFyZ3MsIFNpZ25hbE1hbmFnZXJBY3Rpb24gfSBmcm9tIFwiLi9ldmVudFNpZ25hbE1hbmFnZXJEYXRhQ2hhbmdlZEFyZ3NcIjtcclxuaW1wb3J0IHsgSVNlcmllQ29udGFpbmVyIH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL3NlcmllQ29udGFpbmVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNlcmllQ29udGFpbmVyIH0gZnJvbSBcIi4uL2NvbW1vbi9zaWduYWwvc2VyaWVDb250YWluZXJcIjtcclxuaW1wb3J0IHsgSVNpZ25hbENhdGVnb3J5IH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9zaWduYWxDYXRlZ29yeUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJU2VyaWVOb2RlIH0gZnJvbSBcIi4uL2NvbW1vbi9pbnRlcmZhY2VzL3NlcmllTm9kZUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4uL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9iYXNlU2VyaWVzXCI7XHJcbmltcG9ydCB7IFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YSB9IGZyb20gXCIuL3NpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YVwiO1xyXG5cclxuY2xhc3MgRXZlbnRTaWduYWxSZW1vdmVkIGV4dGVuZHMgVHlwZWRFdmVudDxJU2lnbmFsTWFuYWdlckRhdGFNb2RlbCwgQmFzZVNlcmllcz57IH07XHJcblxyXG5leHBvcnQgY2xhc3MgU2lnbmFsTWFuYWdlckRhdGFNb2RlbCBleHRlbmRzIERhdGFNb2RlbEJhc2UgaW1wbGVtZW50cyBJU2lnbmFsTWFuYWdlckRhdGFNb2RlbHtcclxuICAgICAgXHJcbiAgZXZlbnRTaWduYWxSZW1vdmVkOiBFdmVudFNpZ25hbFJlbW92ZWQgPSBuZXcgRXZlbnRTaWduYWxSZW1vdmVkKCk7XHJcbiAgXHJcbiAgcHJpdmF0ZSBfc2lnbmFsTWFuYWdlckRhdGEhOiBTaWduYWxSb290O1xyXG4gIHByaXZhdGUgX3N1cHJlc3NVcGRhdGU6ICBib29sZWFuID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBfZWRpdE1vZGVBY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBcclxuICBwcml2YXRlIF9kYXRhQ2hhbmdlZEhhbmRsZXIgPSAoc2VuZGVyLCBhcmdzKT0+IHRoaXMub25EYXRhQ2hhbmdlZChzZW5kZXIsYXJncyk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIGluZm9ybWF0aW9uIGlmIHRoZSBkYXRhbW9kZWwgcHJvdmlkZXMgZGF0YSBmb3IgdGhlIGVkaXQgbW9kZVxyXG4gICAqXHJcbiAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0IGVkaXRNb2RlQWN0aXZlKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2VkaXRNb2RlQWN0aXZlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgaW5mb3JtYXRpb24gaWYgdGhlIGRhdGFtb2RlbCBzaG91bGQgcHJvdmlkZSB0aGUgZGF0YSBmb3IgXCJlZGl0IG1vZGVcIiBvciBcIm5vcm1hbCBtb2RlXCJcclxuICAgKlxyXG4gICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgcHVibGljIHNldCBlZGl0TW9kZUFjdGl2ZSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fZWRpdE1vZGVBY3RpdmUgPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBfZGF0YSE6IEFycmF5PElTZXJpZUNvbnRhaW5lcj47XHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXRpYWxpemF0aW9uIG9mIHRoZSBzaWduYWxtYW5hZ2VyIGRhdGFtb2RlbFxyXG4gICAqXHJcbiAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBpbml0aWFsaXplKCkge1xyXG4gICAgc3VwZXIuaW5pdGlhbGl6ZSgpO1xyXG5cclxuICAgIHRoaXMuX3NpZ25hbE1hbmFnZXJEYXRhID0gbmV3IFNpZ25hbFJvb3QodGhpcyk7XHJcbiAgICB0aGlzLl9zaWduYWxNYW5hZ2VyRGF0YS5ldmVudERhdGFDaGFuZ2VkLmF0dGFjaCh0aGlzLl9kYXRhQ2hhbmdlZEhhbmRsZXIpO1xyXG5cclxuICAgIHRoaXMuX2RhdGEgPSB0aGlzLl9zaWduYWxNYW5hZ2VyRGF0YS5jaGlsZHM7XHJcbiAgfVxyXG5cclxuICBkaXNwb3NlKCl7XHJcbiAgICB0aGlzLl9zaWduYWxNYW5hZ2VyRGF0YS5ldmVudERhdGFDaGFuZ2VkLmRldGFjaCh0aGlzLl9kYXRhQ2hhbmdlZEhhbmRsZXIpO1xyXG4gIH1cclxuICBcclxuICAvKipcclxuICAgKiBSZW1vdmVzIGFsbCBkYXRhIGZyb20gZGF0YW1vZGVsIChleGNlcHRpbmcgdGhlIHJvb3QgY2F0ZWdvcmllcylcclxuICAgKlxyXG4gICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgY2xlYXIoKXtcclxuICAgIHRoaXMuX3N1cHJlc3NVcGRhdGUgPSB0cnVlO1xyXG4gICAgdGhpcy5fc2lnbmFsTWFuYWdlckRhdGEuY2xlYXIoKTtcclxuICAgIHRoaXMuX3N1cHJlc3NVcGRhdGUgPSBmYWxzZTtcclxuICAgIHRoaXMucmFpc2VNb2RlbENoYW5nZWRFdmVudChuZXcgRXZlbnRTaWduYWxNYW5hZ2VyRGF0YUNoYW5nZWRBcmdzKFNpZ25hbE1hbmFnZXJBY3Rpb24uY2xlYXJBbGwsIFwiXCIpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZHMgYSBzaWduYWwgY29udGFpbmVyIHRvIHRoZSBkYXRhbW9kZWwgKGludG8gdGhlIGdpdmVuIGNhdGVnb3J5KSAvLyBUT0RPOiBpbXBsZW1lbnQgc3ViY2F0ZWdvcnlcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7SVNlcmllQ29udGFpbmVyfSBzZXJpZUNvbnRhaW5lclxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjYXRlZ29yeUlkXHJcbiAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBhZGRTZXJpZUNvbnRhaW5lcihzZXJpZUNvbnRhaW5lcjogSVNlcmllQ29udGFpbmVyLCBjYXRlZ29yeUlkOiBzdHJpbmcpe1xyXG4gICAgZm9yKGxldCBpPTA7IGkgPCB0aGlzLl9kYXRhLmxlbmd0aDsgaSsrKXtcclxuICAgICAgaWYodGhpcy5fZGF0YVtpXS5pZCA9PSBjYXRlZ29yeUlkKXtcclxuICAgICAgICB0aGlzLl9kYXRhW2ldLmFkZFNlcmllQ29udGFpbmVyKHNlcmllQ29udGFpbmVyLCAwKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlcyB0aGUgZ2l2ZW4gc2lnbmFsIGNvbnRhaW5lciBmcm9tIHRoZSBkYXRhbW9kZWxcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7SVNlcmllQ29udGFpbmVyfSBzZXJpZUNvbnRhaW5lclxyXG4gICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgcmVtb3ZlU2VyaWVDb250YWluZXIoc2VyaWVDb250YWluZXI6IElTZXJpZUNvbnRhaW5lcil7XHJcbiAgICAvLyBSZW1vdmUgU2VyaWVDb250YWluZXIgZnJvbSBjYXRlZ29yeSBub2RlIC4uLlxyXG4gICAgdGhpcy5fZGF0YS5mb3JFYWNoKGNhdGVnb3J5ID0+IHtcclxuICAgICAgICBjYXRlZ29yeS5yZW1vdmVTZXJpZUNvbnRhaW5lcihzZXJpZUNvbnRhaW5lcik7XHJcbiAgICB9KVxyXG4gIH1cclxuICBcclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBzaWduYWwgY2F0ZWdvcnkgd2l0aCB0aGUgZ2l2ZW4gaWQgLy8gVE9ETzogaW1wbGVtZW50IHJlY3Vyc2l2ZSwgbm90IG9ubHkgMiBsZXZlbHNcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAqIEByZXR1cm5zIHsoSVNpZ25hbENhdGVnb3J5fHVuZGVmaW5lZCl9XHJcbiAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICBnZXRTaWduYWxDYXRlZ29yeShpZDogc3RyaW5nKTogSVNpZ25hbENhdGVnb3J5fHVuZGVmaW5lZHtcclxuICAgIGxldCBzaWduYWxDYXRlZ29yeTogSVNpZ25hbENhdGVnb3J5fHVuZGVmaW5lZDtcclxuICAgIHRoaXMuZGF0YS5mb3JFYWNoKGNoaWxkID0+IHtcclxuICAgICAgaWYoY2hpbGQuaWQgPT0gaWQpe1xyXG4gICAgICAgIHNpZ25hbENhdGVnb3J5ID0gY2hpbGQ7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZXtcclxuICAgICAgICBjaGlsZC5jaGlsZHMuZm9yRWFjaChzdWJDaGlsZCA9PiB7XHJcbiAgICAgICAgICBpZihzdWJDaGlsZCBpbnN0YW5jZW9mIFNpZ25hbENhdGVnb3J5KXtcclxuICAgICAgICAgICAgaWYoc3ViQ2hpbGQuaWQgPT0gaWQpe1xyXG4gICAgICAgICAgICAgIHNpZ25hbENhdGVnb3J5ID0gc3ViQ2hpbGQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gc2lnbmFsQ2F0ZWdvcnk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmVzIHRoZSBnaXZlbiBzZXJpZU5vZGVcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7SVNlcmllTm9kZX0gc2VyaWVOb2RlXHJcbiAgICogQG1lbWJlcm9mIFNpZ25hbE1hbmFnZXJEYXRhTW9kZWxcclxuICAgKi9cclxuICByZW1vdmVTZXJpZU5vZGUoc2VyaWVOb2RlOiBJU2VyaWVOb2RlKXtcclxuICAgIHRoaXMuX2RhdGEuZm9yRWFjaChjYXRlZ29yeSA9PiB7XHJcbiAgICAgIGNhdGVnb3J5LnJlbW92ZVNlcmllTm9kZShzZXJpZU5vZGUpO1xyXG4gICAgfSkgICAgXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFeGVjdXRlZCB3aGVuIHNvbWUgZGF0YSB3YXMgY2hhbmdlZChzaWduYWwgb3Igc2lnbmFsY29udGFpbmVyIGFkZGVkIG9yIHJlbW92ZWQpXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIEBwYXJhbSB7Kn0gc2VuZGVyXHJcbiAgICogQHBhcmFtIHtFdmVudFNpZ25hbE1hbmFnZXJEYXRhQ2hhbmdlZEFyZ3N9IGFyZ3NcclxuICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25EYXRhQ2hhbmdlZChzZW5kZXIsIGFyZ3M6IEV2ZW50U2lnbmFsTWFuYWdlckRhdGFDaGFuZ2VkQXJncyl7XHJcbiAgICBpZihhcmdzLmFjdGlvbiA9PSBTaWduYWxNYW5hZ2VyQWN0aW9uLnJlbW92ZSl7XHJcbiAgICAgIGlmKGFyZ3MuZGF0YSBpbnN0YW5jZW9mIFNlcmllQ29udGFpbmVyKXtcclxuICAgICAgICBhcmdzLmRhdGEuZ2V0U2VyaWVzKCkuZm9yRWFjaChzZXJpZSA9PiB7XHJcbiAgICAgICAgICB0aGlzLm9uU2VyaWVSZW1vdmVkKHNlcmllKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICBlbHNle1xyXG4gICAgICAgIC8vIHNlbmQgc2VyaWUgcmVtb3ZlZCBldmVudFxyXG4gICAgICAgIGxldCBzZXJpZU5vZGUgPSBhcmdzLmRhdGE7XHJcbiAgICAgICAgaWYoc2VyaWVOb2RlICE9IHVuZGVmaW5lZCAmJiAhKHNlcmllTm9kZSBpbnN0YW5jZW9mIFNpZ25hbE1hbmFnZXJDYWxjdWxhdGlvbklucHV0RGF0YSkpe1xyXG4gICAgICAgICAgdGhpcy5vblNlcmllUmVtb3ZlZChzZXJpZU5vZGUuc2VyaWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYodGhpcy5fc3VwcmVzc1VwZGF0ZSA9PSBmYWxzZSl7XHJcbiAgICAgIHRoaXMucmFpc2VNb2RlbENoYW5nZWRFdmVudChhcmdzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJhaXNlcyB0aGUgbW9kZWwgY2hhbmdlZCBldmVudFxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBAbWVtYmVyb2YgU2lnbmFsTWFuYWdlckRhdGFNb2RlbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmFpc2VNb2RlbENoYW5nZWRFdmVudChhcmdzOiBFdmVudFNpZ25hbE1hbmFnZXJEYXRhQ2hhbmdlZEFyZ3Mpe1xyXG4gICAgLy8gZS5nLiB1cGRhdGVzIHRoZSBzaWduYWwgbWFuYWdlciB3aWRnZXRcclxuICAgIGxldCBldmVudEFyZ3MgPSBuZXcgRXZlbnRNb2RlbENoYW5nZWRBcmdzKHRoaXMsIE1vZGVsQ2hhbmdlVHlwZS51cGRhdGVUYXJnZXQsIGFyZ3MuYWN0aW9uLCB0aGlzLmRhdGEpO1xyXG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLCBldmVudEFyZ3MpOyBcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJhaXNlcyB0aGUgc2lnbmFsIHJlbW92ZWQgZXZlbnRcclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogQHBhcmFtIHtCYXNlU2VyaWVzfSBzZXJpZVxyXG4gICAqIEBtZW1iZXJvZiBTaWduYWxNYW5hZ2VyRGF0YU1vZGVsXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvblNlcmllUmVtb3ZlZChzZXJpZTogQmFzZVNlcmllcykge1xyXG4gICAgaWYoc2VyaWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgdGhpcy5ldmVudFNpZ25hbFJlbW92ZWQucmFpc2UodGhpcywgc2VyaWUpO1xyXG4gICAgfVxyXG4gIH1cclxufSJdfQ==