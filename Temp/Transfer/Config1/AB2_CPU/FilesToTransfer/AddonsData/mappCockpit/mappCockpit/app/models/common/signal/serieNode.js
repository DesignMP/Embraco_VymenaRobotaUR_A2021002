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
define(["require", "exports", "../../../framework/events", "../../../common/persistence/persistDataProvider"], function (require, exports, events_1, persistDataProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventDataChanged = /** @class */ (function (_super) {
        __extends(EventDataChanged, _super);
        function EventDataChanged() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventDataChanged;
    }(events_1.TypedEvent));
    ;
    var EventSerieDataChanged = /** @class */ (function (_super) {
        __extends(EventSerieDataChanged, _super);
        function EventSerieDataChanged() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventSerieDataChanged;
    }(events_1.TypedEvent));
    ;
    var NodeType;
    (function (NodeType) {
        NodeType[NodeType["container"] = 0] = "container";
        NodeType[NodeType["series"] = 1] = "series";
        NodeType[NodeType["calculationInputParam"] = 2] = "calculationInputParam";
        NodeType[NodeType["calculationOutputParam"] = 3] = "calculationOutputParam";
        NodeType[NodeType["root"] = 4] = "root";
    })(NodeType = exports.NodeType || (exports.NodeType = {}));
    var SerieNode = /** @class */ (function () {
        /**
         * Creates an instance of SerieNode
         * @param {(string|undefined)} name
         * @param {(BaseSeries|undefined)} [serie=undefined]
         * @memberof SerieNode
         */
        function SerieNode(name, serie) {
            var _this = this;
            if (serie === void 0) { serie = undefined; }
            this.eventDataChanged = new EventDataChanged();
            this.eventSerieDataChanged = new EventSerieDataChanged();
            this._onSerieDataChangedHandler = function (sender, args) { return _this.onSerieDataChanged(sender, args); };
            this._color = undefined;
            this._name = name;
            this.canDelete = true;
            this.serie = serie;
        }
        Object.defineProperty(SerieNode.prototype, "validNode", {
            get: function () {
                return true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SerieNode.prototype, "nodeType", {
            /**
             * Returns the type of the serieNode
             *
             * @protected
             * @type {string}
             * @memberof SerieNode
             */
            get: function () {
                return NodeType.series;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SerieNode.prototype, "description", {
            /**
             * Returns the description of the serie
             *
             * @type {string}
             * @memberof SerieNode
             */
            get: function () {
                if (this.serie != undefined) {
                    return this.serie.description;
                }
                return "";
            },
            /**
             * Sets the description of the serie
             *
             * @memberof SerieNode
             */
            set: function (value) {
                if (this.serie != undefined) {
                    this.serie.description = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SerieNode.prototype, "color", {
            /**
             * Returns the color of the serie
             *
             * @type {(string | undefined)}
             * @memberof SerieNode
             */
            get: function () {
                if (this._color != undefined) {
                    return this._color;
                }
                else {
                    if (this.serie != undefined) {
                        return this.serie.color;
                    }
                    else {
                        return undefined;
                    }
                }
            },
            /**
             * Sets the color of the serie
             *
             * @memberof SerieNode
             */
            set: function (value) {
                if (this._color != undefined) {
                    this._color = value;
                }
                else {
                    if (this.serie != undefined && value != undefined) {
                        this.serie.color = value;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SerieNode.prototype, "name", {
            /**
             * Returns the name or originalname of the serie corresponding to the edit mode
             *
             * @type {string}
             * @memberof SerieNode
             */
            get: function () {
                if (this._name != undefined) {
                    return this._name;
                }
                else {
                    if (this.serie != undefined) {
                        var dataModel = this.getDataModel();
                        if (dataModel != undefined) {
                            if (dataModel.editModeActive == true && this.serie.originalName != "") {
                                return this.serie.originalName;
                            }
                        }
                        return this.serie.name;
                    }
                    return "";
                }
            },
            /**
             * Sets the name of the serie
             *
             * @memberof SerieNode
             */
            set: function (value) {
                if (this._name != undefined) {
                    this._name = value;
                }
                else {
                    if (this.serie != undefined) {
                        this.serie.name = value;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SerieNode.prototype, "iconDefinition", {
            /**
             * Returns the icon definition for this serieNode
             *
             * @type {string}
             * @memberof SerieNode
             */
            get: function () {
                var iconDefinition = "";
                if (this.nodeType == NodeType.container) {
                    iconDefinition = this.getIconDefinitionForContainer();
                }
                else {
                    iconDefinition = this.getIconDefinitionForNode();
                }
                return iconDefinition;
            },
            /**
             * Set icon definiton => not implemented; Setter only needed for use as field for the syncfusion tree grid
             *
             * @memberof SerieNode
             */
            set: function (value) {
                // this._iconDefinition = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Returns the iconDefinition in case of a container node
         *
         * @private
         * @returns
         * @memberof SerieNode
         */
        SerieNode.prototype.getIconDefinitionForContainer = function () {
            var classNames = "e-treegridcollapse treegridcollapse";
            // Add collapse/expand icon 
            if (this.expandState == true) {
                classNames += "e-treegridexpand treegridexpand";
            }
            return "<div class='" + classNames + "'></div>";
        };
        /**
         * Returns the icon definition in case of a node(e.g. input param of calculation, output param of calculation, serie, ...)
         *
         * @private
         * @returns
         * @memberof SerieNode
         */
        SerieNode.prototype.getIconDefinitionForNode = function () {
            var iconDefinition = "<div class='e-doc' style='position: relative;height:16px;width:30px;margin:auto;float:left;margin-left:6px;margin-top:2px'>";
            // Set main icon
            if (this.nodeType == NodeType.series) {
                if (this.serie != undefined) {
                    iconDefinition += this.serie.getIcon();
                }
                else {
                    console.warn("No serie info available for getting icon!");
                }
            }
            else if (this.nodeType == NodeType.calculationOutputParam) {
                iconDefinition += '<img class="treeGridRowIcon" src="../app/widgets/signalManagerWidget/style/images/tree/calculationOutput.svg" />';
                if (this.serie != undefined && !this.serie.rawPointsValid) {
                    // Set exclamation overlay for invalid series
                    var tooltipText = "The data is invalid!"; // Default tooltiptext in case of invalid data
                    var errorText = this.serie.getErrorText();
                    if (errorText != "") {
                        tooltipText = errorText; // Use error info text for tooltip text
                    }
                    iconDefinition += "<img title=\"" + tooltipText + "\" class=\"treeGridRowIcon\" src=\"" + this.serie.getSpecificIcon("exclamationOverlay") + "\" />";
                }
            }
            else if (this.nodeType == NodeType.calculationInputParam) {
                iconDefinition += '<img class="treeGridRowIcon" src="../app/widgets/signalManagerWidget/style/images/tree/calculationInput.svg" />';
            }
            iconDefinition += "</div>";
            return iconDefinition;
        };
        Object.defineProperty(SerieNode.prototype, "parent", {
            /**
             * Returns the parent of this node
             *
             * @type {(ISerieContainer | undefined)}
             * @memberof SerieNode
             */
            get: function () {
                return this._parent;
            },
            /**
             * Sets the parent of this node
             *
             * @memberof SerieNode
             */
            set: function (value) {
                if (this.serie != undefined) {
                    if (value != undefined) {
                        this.serie.parent = value.getSerieGroup();
                    }
                    else {
                        this.serie.parent = undefined;
                    }
                }
                this._parent = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SerieNode.prototype, "serie", {
            /**
             * Returns the serie of this node
             *
             * @type {(BaseSeries | undefined)}
             * @memberof SerieNode
             */
            get: function () {
                return this._serie;
            },
            /**
             * Sets the serie of this node
             *
             * @memberof SerieNode
             */
            set: function (value) {
                if (value != this._serie) {
                    if (this._serie != undefined) { // Detach old serie events
                        if (value != undefined) {
                            // update new serie to parent group info
                            value.startTriggerTime = this._serie.startTriggerTime;
                            value.parent = this._serie.parent;
                        }
                        this._serie.eventDataChanged.detach(this._onSerieDataChangedHandler);
                        if (this.nodeType == NodeType.calculationOutputParam || this.nodeType == NodeType.series) {
                            var datamodel = this.getDataModel();
                            if (datamodel != undefined) {
                                if (datamodel.seriesProvider != undefined) {
                                    datamodel.seriesProvider.remove(this._serie.id);
                                }
                            }
                        }
                    }
                    this._serie = value;
                    if (this._serie != undefined) { // Attach new serie events
                        this._serie.eventDataChanged.attach(this._onSerieDataChangedHandler);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SerieNode.prototype, "value", {
            /**
             * Returns the value of this node
             *
             * @type {(string|undefined)}
             * @memberof SerieNode
             */
            get: function () {
                if (this._serie != undefined) {
                    if (this._serie.name != this._serie.originalName) { // Only show name(alias) in value column if different to the original name in the name column
                        return this._serie.name;
                    }
                    return "";
                }
                return undefined;
            },
            /**
             * Sets the value of this node
             *
             * @memberof SerieNode
             */
            set: function (value) {
                if (this._serie != undefined && value != undefined) {
                    if (value == "") { // if empty name => use original name from signal
                        this._serie.resetName();
                    }
                    else {
                        this._serie.name = value;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Dispose the SerieNode
         *
         * @memberof SerieNode
         */
        SerieNode.prototype.dispose = function () {
            this.disposeSerie();
        };
        /**
         * Dispose the serie of this object
         *
         * @private
         * @memberof SerieNode
         */
        SerieNode.prototype.disposeSerie = function () {
            if (this.serie != undefined) {
                if (this.nodeType == NodeType.calculationOutputParam || this.nodeType == NodeType.series) {
                    // Only dispose serie if this node is the original series and not only a link to a series
                    var datamodel = this.getDataModel();
                    if (datamodel != undefined) {
                        if (datamodel.seriesProvider != undefined) {
                            datamodel.seriesProvider.remove(this.serie.id);
                        }
                    }
                }
            }
        };
        /**
         * Clones the calculated serie
         *
         * @returns
         * @memberof CalculatedSignal
         */
        SerieNode.prototype.clone = function () {
            var serieClone;
            if (this.serie != undefined) {
                serieClone = this.serie.clone();
            }
            // TODO: check clone (name undefined or from data)
            var clonedSerieNode = new SerieNode(undefined, serieClone);
            return clonedSerieNode;
        };
        /**
         * Returns the datamodel of this node
         *
         * @returns {(ISignalManagerDataModel|undefined)}
         * @memberof SerieNode
         */
        SerieNode.prototype.getDataModel = function () {
            var parent = this.parent;
            var lastKnownParent = parent;
            do {
                if (parent != undefined) {
                    lastKnownParent = parent;
                    parent = parent.parent;
                }
            } while (parent != undefined);
            if (lastKnownParent != undefined) {
                if (lastKnownParent.nodeType == NodeType.root) {
                    return lastKnownParent.dataModel;
                }
            }
            return undefined;
        };
        /**
         * Returns the serie group to which this node belongs
         *
         * @returns {(ISerieGroup|undefined)}
         * @memberof SerieNode
         */
        SerieNode.prototype.getSerieGroup = function () {
            if (this.isSerieGroup == true) {
                return this;
            }
            if (this.parent != undefined) {
                if (this.parent.isSerieGroup == true) {
                    return this.parent;
                }
                else {
                    return this.parent.getSerieGroup();
                }
            }
            return undefined;
        };
        /**
         * Raises the data changed event
         *
         * @protected
         * @param {*} sender
         * @param {EventSignalManagerDataChangedArgs} args
         * @memberof SerieNode
         */
        SerieNode.prototype.onDataChanged = function (sender, args) {
            this.eventDataChanged.raise(sender, args);
            if (this.serie != undefined) {
                persistDataProvider_1.PersistDataProvider.getInstance().setDataWithId(this.serie.persistID, this.serie.getSettings());
            }
        };
        /**
         * Raises the serie data cahnged event
         *
         * @protected
         * @param {*} sender
         * @param {EventSerieDataChangedArgs} args
         * @memberof SerieNode
         */
        SerieNode.prototype.onSerieDataChanged = function (sender, args) {
            this.eventSerieDataChanged.raise(sender, args);
        };
        return SerieNode;
    }());
    exports.SerieNode = SerieNode;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWVOb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvY29tbW9uL3NpZ25hbC9zZXJpZU5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVlBO1FBQStCLG9DQUF5RDtRQUF4Rjs7UUFBMEYsQ0FBQztRQUFELHVCQUFDO0lBQUQsQ0FBQyxBQUEzRixDQUErQixtQkFBVSxHQUFrRDtJQUFBLENBQUM7SUFDNUY7UUFBb0MseUNBQWlEO1FBQXJGOztRQUF1RixDQUFDO1FBQUQsNEJBQUM7SUFBRCxDQUFDLEFBQXhGLENBQW9DLG1CQUFVLEdBQTBDO0lBQUEsQ0FBQztJQUV6RixJQUFZLFFBTVg7SUFORCxXQUFZLFFBQVE7UUFDaEIsaURBQVMsQ0FBQTtRQUNULDJDQUFNLENBQUE7UUFDTix5RUFBcUIsQ0FBQTtRQUNyQiwyRUFBc0IsQ0FBQTtRQUN0Qix1Q0FBSSxDQUFBO0lBQ1IsQ0FBQyxFQU5XLFFBQVEsR0FBUixnQkFBUSxLQUFSLGdCQUFRLFFBTW5CO0lBR0Q7UUEwVEk7Ozs7O1dBS0c7UUFDSCxtQkFBWSxJQUFzQixFQUFFLEtBQXVDO1lBQTNFLGlCQUlDO1lBSm1DLHNCQUFBLEVBQUEsaUJBQXVDO1lBL1QzRSxxQkFBZ0IsR0FBcUIsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO1lBQzVELDBCQUFxQixHQUEwQixJQUFJLHFCQUFxQixFQUFFLENBQUM7WUFFakUsK0JBQTBCLEdBQUcsVUFBQyxNQUFNLEVBQUUsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBckMsQ0FBcUMsQ0FBQztZQU12RixXQUFNLEdBQXVCLFNBQVMsQ0FBQztZQXVUM0MsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDbEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDdEIsSUFBSSxDQUFD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QVMsRUFBQztnQkFDeEIsSUFBUyxJQUFJLENBQUMsTUFBTyxDQUFDLFlBQVksSUFBSSxJQUFJLEVBQUU7b0JBQ3hDLE9BQU8sSUFBSSxDQUFDLE1BQXFCLENBQUM7aUJBQ3JDO3FCQUNHO29CQUNBLE9BQU8sSUFBSSxDQUFDLE1BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztpQkFDdkM7YUFDSjtZQUNELE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFHRDs7Ozs7OztXQU9HO1FBQ08saUNBQWEsR0FBdkIsVUFBd0IsTUFBTSxFQUFFLElBQXVDO1lBQ25FLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBRTFDLElBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxTQUFTLEVBQUM7Z0JBQ3ZCLHlDQUFtQixDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBTSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7YUFDcEc7UUFFTCxDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNPLHNDQUFrQixHQUE1QixVQUE2QixNQUFNLEVBQUUsSUFBK0I7WUFDaEUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkQsQ0FBQztRQUNMLGdCQUFDO0lBQUQsQ0FBQyxBQTdiRCxJQTZiQztJQTdiWSw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElTZXJpZU5vZGUgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9zZXJpZU5vZGVJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVNlcmllQ29udGFpbmVyIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvc2VyaWVDb250YWluZXJJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSVNpZ25hbE1hbmFnZXJEYXRhTW9kZWwgfSBmcm9tIFwiLi4vLi4vZGF0YU1vZGVsc1wiO1xyXG5pbXBvcnQgeyBJU2VyaWVHcm91cCB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3NlcmllR3JvdXBJbnRlcmZhY2VcIjtcclxuXHJcbmltcG9ydCB7IFR5cGVkRXZlbnQgfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL2V2ZW50c1wiO1xyXG5pbXBvcnQgeyBFdmVudFNpZ25hbE1hbmFnZXJEYXRhQ2hhbmdlZEFyZ3MgfSBmcm9tIFwiLi4vLi4vc2lnbmFsTWFuYWdlckRhdGFNb2RlbC9ldmVudFNpZ25hbE1hbmFnZXJEYXRhQ2hhbmdlZEFyZ3NcIjtcclxuaW1wb3J0IHsgQmFzZVNlcmllcyB9IGZyb20gXCIuLi8uLi9jaGFydE1hbmFnZXJEYXRhTW9kZWwvYmFzZVNlcmllc1wiO1xyXG5pbXBvcnQgeyBFdmVudFNlcmllRGF0YUNoYW5nZWRBcmdzIH0gZnJvbSBcIi4uLy4uL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9ldmVudFNlcmllRGF0YUNoYW5nZWRBcmdzXCI7XHJcbmltcG9ydCB7IElTaWduYWxSb290IH0gZnJvbSBcIi4uLy4uL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvaW50ZXJmYWNlcy9zaWduYWxSb290SW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFBlcnNpc3REYXRhUHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3BlcnNpc3RlbmNlL3BlcnNpc3REYXRhUHJvdmlkZXJcIjtcclxuXHJcbmNsYXNzIEV2ZW50RGF0YUNoYW5nZWQgZXh0ZW5kcyBUeXBlZEV2ZW50PElTZXJpZU5vZGUsIEV2ZW50U2lnbmFsTWFuYWdlckRhdGFDaGFuZ2VkQXJncz57IH07XHJcbmNsYXNzIEV2ZW50U2VyaWVEYXRhQ2hhbmdlZCBleHRlbmRzIFR5cGVkRXZlbnQ8QmFzZVNlcmllcywgRXZlbnRTZXJpZURhdGFDaGFuZ2VkQXJncz57IH07XHJcblxyXG5leHBvcnQgZW51bSBOb2RlVHlwZXtcclxuICAgIGNvbnRhaW5lcixcclxuICAgIHNlcmllcyxcclxuICAgIGNhbGN1bGF0aW9uSW5wdXRQYXJhbSxcclxuICAgIGNhbGN1bGF0aW9uT3V0cHV0UGFyYW0sXHJcbiAgICByb290XHJcbn1cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgU2VyaWVOb2RlIGltcGxlbWVudHMgSVNlcmllTm9kZXtcclxuICAgIGV2ZW50RGF0YUNoYW5nZWQ6IEV2ZW50RGF0YUNoYW5nZWQgPSBuZXcgRXZlbnREYXRhQ2hhbmdlZCgpO1xyXG4gICAgZXZlbnRTZXJpZURhdGFDaGFuZ2VkOiBFdmVudFNlcmllRGF0YUNoYW5nZWQgPSBuZXcgRXZlbnRTZXJpZURhdGFDaGFuZ2VkKCk7XHJcblxyXG4gICAgcHJvdGVjdGVkIF9vblNlcmllRGF0YUNoYW5nZWRIYW5kbGVyID0gKHNlbmRlciwgYXJncykgPT4gdGhpcy5vblNlcmllRGF0YUNoYW5nZWQoc2VuZGVyLCBhcmdzKTtcclxuICAgIFxyXG4gICAgcHVibGljIGdldCB2YWxpZE5vZGUoKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfY29sb3I6IHN0cmluZyB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuICAgIHByb3RlY3RlZCBfbmFtZTogc3RyaW5nfHVuZGVmaW5lZDtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0eXBlIG9mIHRoZSBzZXJpZU5vZGVcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllTm9kZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IG5vZGVUeXBlKCk6IE5vZGVUeXBlIHtcclxuICAgICAgICByZXR1cm4gTm9kZVR5cGUuc2VyaWVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGVzY3JpcHRpb24gb2YgdGhlIHNlcmllXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZU5vZGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBkZXNjcmlwdGlvbigpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmKHRoaXMuc2VyaWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VyaWUuZGVzY3JpcHRpb247XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgZGVzY3JpcHRpb24gb2YgdGhlIHNlcmllXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllTm9kZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IGRlc2NyaXB0aW9uKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICBpZih0aGlzLnNlcmllICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2VyaWUuZGVzY3JpcHRpb24gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBjb2xvciBvZiB0aGUgc2VyaWVcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7KHN0cmluZyB8IHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVOb2RlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgY29sb3IoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICBpZih0aGlzLl9jb2xvciAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29sb3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2VyaWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNlcmllLmNvbG9yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgY29sb3Igb2YgdGhlIHNlcmllXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllTm9kZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IGNvbG9yKHZhbHVlOiBzdHJpbmcgfCB1bmRlZmluZWQpIHtcclxuICAgICAgICBpZih0aGlzLl9jb2xvciAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9jb2xvciA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBpZih0aGlzLnNlcmllICE9IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXJpZS5jb2xvciA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgbmFtZSBvciBvcmlnaW5hbG5hbWUgb2YgdGhlIHNlcmllIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGVkaXQgbW9kZVxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVOb2RlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmKHRoaXMuX25hbWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2VyaWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhTW9kZWwgPSB0aGlzLmdldERhdGFNb2RlbCgpO1xyXG4gICAgICAgICAgICAgICAgaWYoZGF0YU1vZGVsICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGF0YU1vZGVsLmVkaXRNb2RlQWN0aXZlID09IHRydWUgJiYgdGhpcy5zZXJpZS5vcmlnaW5hbE5hbWUgIT0gXCJcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNlcmllLm9yaWdpbmFsTmFtZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZXJpZS5uYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIG5hbWUgb2YgdGhlIHNlcmllXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllTm9kZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IG5hbWUodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIGlmKHRoaXMuX25hbWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fbmFtZSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBpZih0aGlzLnNlcmllICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlcmllLm5hbWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgX3BhcmVudDogSVNlcmllQ29udGFpbmVyIHwgdW5kZWZpbmVkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgaWNvbiBkZWZpbml0aW9uIGZvciB0aGlzIHNlcmllTm9kZVxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVOb2RlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgaWNvbkRlZmluaXRpb24oKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgaWNvbkRlZmluaXRpb24gPSBcIlwiO1xyXG4gICAgICAgIGlmICh0aGlzLm5vZGVUeXBlID09IE5vZGVUeXBlLmNvbnRhaW5lcikge1xyXG4gICAgICAgICAgICBpY29uRGVmaW5pdGlvbiA9IHRoaXMuZ2V0SWNvbkRlZmluaXRpb25Gb3JDb250YWluZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGljb25EZWZpbml0aW9uID0gdGhpcy5nZXRJY29uRGVmaW5pdGlvbkZvck5vZGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGljb25EZWZpbml0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgaWNvbkRlZmluaXRpb24gaW4gY2FzZSBvZiBhIGNvbnRhaW5lciBub2RlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVOb2RlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0SWNvbkRlZmluaXRpb25Gb3JDb250YWluZXIoKXtcclxuICAgICAgICBsZXQgY2xhc3NOYW1lcyA9IFwiZS10cmVlZ3JpZGNvbGxhcHNlIHRyZWVncmlkY29sbGFwc2VcIjtcclxuXHJcbiAgICAgICAgLy8gQWRkIGNvbGxhcHNlL2V4cGFuZCBpY29uIFxyXG4gICAgICAgIGlmICgoPGFueT50aGlzKS5leHBhbmRTdGF0ZSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZXMgKz0gXCJlLXRyZWVncmlkZXhwYW5kIHRyZWVncmlkZXhwYW5kXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBgPGRpdiBjbGFzcz0nYCArIGNsYXNzTmFtZXMgKyBgJz48L2Rpdj5gO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgaWNvbiBkZWZpbml0aW9uIGluIGNhc2Ugb2YgYSBub2RlKGUuZy4gaW5wdXQgcGFyYW0gb2YgY2FsY3VsYXRpb24sIG91dHB1dCBwYXJhbSBvZiBjYWxjdWxhdGlvbiwgc2VyaWUsIC4uLilcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZU5vZGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRJY29uRGVmaW5pdGlvbkZvck5vZGUoKXtcclxuICAgICAgICBsZXQgaWNvbkRlZmluaXRpb24gPSBgPGRpdiBjbGFzcz0nZS1kb2MnIHN0eWxlPSdwb3NpdGlvbjogcmVsYXRpdmU7aGVpZ2h0OjE2cHg7d2lkdGg6MzBweDttYXJnaW46YXV0bztmbG9hdDpsZWZ0O21hcmdpbi1sZWZ0OjZweDttYXJnaW4tdG9wOjJweCc+YDtcclxuXHJcbiAgICAgICAgLy8gU2V0IG1haW4gaWNvblxyXG4gICAgICAgIGlmICh0aGlzLm5vZGVUeXBlID09IE5vZGVUeXBlLnNlcmllcykge1xyXG4gICAgICAgICAgICBpZih0aGlzLnNlcmllICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBpY29uRGVmaW5pdGlvbiArPSB0aGlzLnNlcmllLmdldEljb24oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiTm8gc2VyaWUgaW5mbyBhdmFpbGFibGUgZm9yIGdldHRpbmcgaWNvbiFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5ub2RlVHlwZSA9PSBOb2RlVHlwZS5jYWxjdWxhdGlvbk91dHB1dFBhcmFtKSB7XHJcbiAgICAgICAgICAgIGljb25EZWZpbml0aW9uICs9ICc8aW1nIGNsYXNzPVwidHJlZUdyaWRSb3dJY29uXCIgc3JjPVwiLi4vYXBwL3dpZGdldHMvc2lnbmFsTWFuYWdlcldpZGdldC9zdHlsZS9pbWFnZXMvdHJlZS9jYWxjdWxhdGlvbk91dHB1dC5zdmdcIiAvPic7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2VyaWUgIT0gdW5kZWZpbmVkICYmICF0aGlzLnNlcmllLnJhd1BvaW50c1ZhbGlkKXtcclxuICAgICAgICAgICAgICAgIC8vIFNldCBleGNsYW1hdGlvbiBvdmVybGF5IGZvciBpbnZhbGlkIHNlcmllc1xyXG4gICAgICAgICAgICAgICAgbGV0IHRvb2x0aXBUZXh0ID0gXCJUaGUgZGF0YSBpcyBpbnZhbGlkIVwiOyAvLyBEZWZhdWx0IHRvb2x0aXB0ZXh0IGluIGNhc2Ugb2YgaW52YWxpZCBkYXRhXHJcbiAgICAgICAgICAgICAgICBsZXQgZXJyb3JUZXh0ID0gdGhpcy5zZXJpZS5nZXRFcnJvclRleHQoKTtcclxuICAgICAgICAgICAgICAgIGlmKGVycm9yVGV4dCAhPSBcIlwiKXtcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwVGV4dCA9IGVycm9yVGV4dDsgLy8gVXNlIGVycm9yIGluZm8gdGV4dCBmb3IgdG9vbHRpcCB0ZXh0XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpY29uRGVmaW5pdGlvbiArPSBgPGltZyB0aXRsZT1cImArIHRvb2x0aXBUZXh0ICtgXCIgY2xhc3M9XCJ0cmVlR3JpZFJvd0ljb25cIiBzcmM9XCJgICsgdGhpcy5zZXJpZS5nZXRTcGVjaWZpY0ljb24oXCJleGNsYW1hdGlvbk92ZXJsYXlcIikgKyBgXCIgLz5gO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMubm9kZVR5cGUgPT0gTm9kZVR5cGUuY2FsY3VsYXRpb25JbnB1dFBhcmFtKSB7XHJcbiAgICAgICAgICAgIGljb25EZWZpbml0aW9uICs9ICc8aW1nIGNsYXNzPVwidHJlZUdyaWRSb3dJY29uXCIgc3JjPVwiLi4vYXBwL3dpZGdldHMvc2lnbmFsTWFuYWdlcldpZGdldC9zdHlsZS9pbWFnZXMvdHJlZS9jYWxjdWxhdGlvbklucHV0LnN2Z1wiIC8+JztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWNvbkRlZmluaXRpb24gKz0gYDwvZGl2PmA7XHJcbiAgICAgICAgcmV0dXJuIGljb25EZWZpbml0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IGljb24gZGVmaW5pdG9uID0+IG5vdCBpbXBsZW1lbnRlZDsgU2V0dGVyIG9ubHkgbmVlZGVkIGZvciB1c2UgYXMgZmllbGQgZm9yIHRoZSBzeW5jZnVzaW9uIHRyZWUgZ3JpZFxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZU5vZGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBpY29uRGVmaW5pdGlvbih2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAvLyB0aGlzLl9pY29uRGVmaW5pdGlvbiA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgcGFyZW50IG9mIHRoaXMgbm9kZVxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHsoSVNlcmllQ29udGFpbmVyIHwgdW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZU5vZGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBwYXJlbnQoKTogSVNlcmllQ29udGFpbmVyIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGFyZW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgcGFyZW50IG9mIHRoaXMgbm9kZVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZU5vZGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBwYXJlbnQodmFsdWU6IElTZXJpZUNvbnRhaW5lciB8IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGlmKHRoaXMuc2VyaWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgaWYodmFsdWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VyaWUucGFyZW50ID0gdmFsdWUuZ2V0U2VyaWVHcm91cCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlcmllLnBhcmVudCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9wYXJlbnQgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgY2FuRGVsZXRlOiBib29sZWFuO1xyXG4gICBcclxuICAgIHByaXZhdGUgX3NlcmllOiBCYXNlU2VyaWVzIHwgdW5kZWZpbmVkO1xyXG4gICBcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgc2VyaWUgb2YgdGhpcyBub2RlXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUgeyhCYXNlU2VyaWVzIHwgdW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZU5vZGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBzZXJpZSgpOiBCYXNlU2VyaWVzIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VyaWU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgc2VyaWUgb2YgdGhpcyBub2RlXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllTm9kZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IHNlcmllKHZhbHVlOiBCYXNlU2VyaWVzIHwgdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgaWYodmFsdWUgIT0gdGhpcy5fc2VyaWUpe1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZih0aGlzLl9zZXJpZSAhPSB1bmRlZmluZWQpeyAvLyBEZXRhY2ggb2xkIHNlcmllIGV2ZW50c1xyXG4gICAgICAgICAgICAgICAgaWYodmFsdWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyB1cGRhdGUgbmV3IHNlcmllIHRvIHBhcmVudCBncm91cCBpbmZvXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUuc3RhcnRUcmlnZ2VyVGltZSA9IHRoaXMuX3NlcmllLnN0YXJ0VHJpZ2dlclRpbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUucGFyZW50ID0gdGhpcy5fc2VyaWUucGFyZW50O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2VyaWUuZXZlbnREYXRhQ2hhbmdlZC5kZXRhY2godGhpcy5fb25TZXJpZURhdGFDaGFuZ2VkSGFuZGxlcik7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMubm9kZVR5cGUgPT0gTm9kZVR5cGUuY2FsY3VsYXRpb25PdXRwdXRQYXJhbSB8fCB0aGlzLm5vZGVUeXBlID09IE5vZGVUeXBlLnNlcmllcyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGFtb2RlbCA9IHRoaXMuZ2V0RGF0YU1vZGVsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGF0YW1vZGVsICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRhdGFtb2RlbC5zZXJpZXNQcm92aWRlciAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YW1vZGVsLnNlcmllc1Byb3ZpZGVyLnJlbW92ZSh0aGlzLl9zZXJpZS5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuX3NlcmllID0gdmFsdWU7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX3NlcmllICE9IHVuZGVmaW5lZCl7IC8vIEF0dGFjaCBuZXcgc2VyaWUgZXZlbnRzXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXJpZS5ldmVudERhdGFDaGFuZ2VkLmF0dGFjaCh0aGlzLl9vblNlcmllRGF0YUNoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHZhbHVlIG9mIHRoaXMgbm9kZVxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHsoc3RyaW5nfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVOb2RlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgdmFsdWUoKTogc3RyaW5nfHVuZGVmaW5lZCB7XHJcbiAgICAgICAgaWYodGhpcy5fc2VyaWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgaWYodGhpcy5fc2VyaWUubmFtZSAhPSB0aGlzLl9zZXJpZS5vcmlnaW5hbE5hbWUpeyAvLyBPbmx5IHNob3cgbmFtZShhbGlhcykgaW4gdmFsdWUgY29sdW1uIGlmIGRpZmZlcmVudCB0byB0aGUgb3JpZ2luYWwgbmFtZSBpbiB0aGUgbmFtZSBjb2x1bW5cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zZXJpZS5uYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHZhbHVlIG9mIHRoaXMgbm9kZVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZU5vZGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCB2YWx1ZSh2YWx1ZTogc3RyaW5nfHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGlmKHRoaXMuX3NlcmllICE9IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBpZih2YWx1ZSA9PSBcIlwiKXsgLy8gaWYgZW1wdHkgbmFtZSA9PiB1c2Ugb3JpZ2luYWwgbmFtZSBmcm9tIHNpZ25hbFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2VyaWUucmVzZXROYW1lKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NlcmllLm5hbWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgU2VyaWVOb2RlXHJcbiAgICAgKiBAcGFyYW0geyhzdHJpbmd8dW5kZWZpbmVkKX0gbmFtZVxyXG4gICAgICogQHBhcmFtIHsoQmFzZVNlcmllc3x1bmRlZmluZWQpfSBbc2VyaWU9dW5kZWZpbmVkXVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllTm9kZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmd8dW5kZWZpbmVkLCBzZXJpZTogQmFzZVNlcmllc3x1bmRlZmluZWQgPSB1bmRlZmluZWQpe1xyXG4gICAgICAgIHRoaXMuX25hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuY2FuRGVsZXRlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNlcmllID0gc2VyaWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNwb3NlIHRoZSBTZXJpZU5vZGVcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVOb2RlXHJcbiAgICAgKi9cclxuICAgIGRpc3Bvc2UoKXtcclxuICAgICAgICB0aGlzLmRpc3Bvc2VTZXJpZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzcG9zZSB0aGUgc2VyaWUgb2YgdGhpcyBvYmplY3RcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllTm9kZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRpc3Bvc2VTZXJpZSgpe1xyXG4gICAgICAgIGlmKHRoaXMuc2VyaWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgaWYodGhpcy5ub2RlVHlwZSA9PSBOb2RlVHlwZS5jYWxjdWxhdGlvbk91dHB1dFBhcmFtIHx8IHRoaXMubm9kZVR5cGUgPT0gTm9kZVR5cGUuc2VyaWVzKXtcclxuICAgICAgICAgICAgICAgIC8vIE9ubHkgZGlzcG9zZSBzZXJpZSBpZiB0aGlzIG5vZGUgaXMgdGhlIG9yaWdpbmFsIHNlcmllcyBhbmQgbm90IG9ubHkgYSBsaW5rIHRvIGEgc2VyaWVzXHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0YW1vZGVsID0gdGhpcy5nZXREYXRhTW9kZWwoKTtcclxuICAgICAgICAgICAgICAgIGlmKGRhdGFtb2RlbCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRhdGFtb2RlbC5zZXJpZXNQcm92aWRlciAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhbW9kZWwuc2VyaWVzUHJvdmlkZXIucmVtb3ZlKHRoaXMuc2VyaWUuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENsb25lcyB0aGUgY2FsY3VsYXRlZCBzZXJpZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRlZFNpZ25hbFxyXG4gICAgICovXHJcbiAgICBjbG9uZSgpOiBJU2VyaWVOb2Rle1xyXG4gICAgICAgIGxldCBzZXJpZUNsb25lO1xyXG4gICAgICAgIGlmKHRoaXMuc2VyaWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgc2VyaWVDbG9uZSA9IHRoaXMuc2VyaWUuY2xvbmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gVE9ETzogY2hlY2sgY2xvbmUgKG5hbWUgdW5kZWZpbmVkIG9yIGZyb20gZGF0YSlcclxuICAgICAgICBsZXQgY2xvbmVkU2VyaWVOb2RlID0gbmV3IFNlcmllTm9kZSh1bmRlZmluZWQsIHNlcmllQ2xvbmUpO1xyXG4gICAgICAgIHJldHVybiBjbG9uZWRTZXJpZU5vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkYXRhbW9kZWwgb2YgdGhpcyBub2RlXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgeyhJU2lnbmFsTWFuYWdlckRhdGFNb2RlbHx1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllTm9kZVxyXG4gICAgICovXHJcbiAgICBnZXREYXRhTW9kZWwoKTogSVNpZ25hbE1hbmFnZXJEYXRhTW9kZWx8dW5kZWZpbmVke1xyXG4gICAgICAgIGxldCBwYXJlbnQ6IElTZXJpZUNvbnRhaW5lcnx1bmRlZmluZWQgPSB0aGlzLnBhcmVudDtcclxuICAgICAgICBsZXQgbGFzdEtub3duUGFyZW50ID0gcGFyZW50O1xyXG4gICAgICAgIGRve1xyXG4gICAgICAgICAgICBpZihwYXJlbnQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGxhc3RLbm93blBhcmVudCA9IHBhcmVudDtcclxuICAgICAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9d2hpbGUocGFyZW50ICE9IHVuZGVmaW5lZClcclxuICAgICAgICBpZihsYXN0S25vd25QYXJlbnQgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgaWYobGFzdEtub3duUGFyZW50Lm5vZGVUeXBlID09IE5vZGVUeXBlLnJvb3Qpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChsYXN0S25vd25QYXJlbnQgYXMgSVNpZ25hbFJvb3QpLmRhdGFNb2RlbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgc2VyaWUgZ3JvdXAgdG8gd2hpY2ggdGhpcyBub2RlIGJlbG9uZ3NcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7KElTZXJpZUdyb3VwfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVOb2RlXHJcbiAgICAgKi9cclxuICAgIGdldFNlcmllR3JvdXAoKTpJU2VyaWVHcm91cHx1bmRlZmluZWR7XHJcbiAgICAgICAgaWYoKDxhbnk+dGhpcykuaXNTZXJpZUdyb3VwID09IHRydWUpe1xyXG4gICAgICAgICAgICByZXR1cm4gPGFueT50aGlzIGFzIElTZXJpZUdyb3VwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnBhcmVudCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBpZigoPGFueT50aGlzLnBhcmVudCkuaXNTZXJpZUdyb3VwID09IHRydWUgKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcmVudCBhcyBJU2VyaWVHcm91cDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50IS5nZXRTZXJpZUdyb3VwKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmFpc2VzIHRoZSBkYXRhIGNoYW5nZWQgZXZlbnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcGFyYW0geyp9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHtFdmVudFNpZ25hbE1hbmFnZXJEYXRhQ2hhbmdlZEFyZ3N9IGFyZ3NcclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZU5vZGVcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIG9uRGF0YUNoYW5nZWQoc2VuZGVyLCBhcmdzOiBFdmVudFNpZ25hbE1hbmFnZXJEYXRhQ2hhbmdlZEFyZ3MpIHtcclxuICAgICAgICB0aGlzLmV2ZW50RGF0YUNoYW5nZWQucmFpc2Uoc2VuZGVyLCBhcmdzKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5zZXJpZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBQZXJzaXN0RGF0YVByb3ZpZGVyLmdldEluc3RhbmNlKCkuc2V0RGF0YVdpdGhJZCh0aGlzLnNlcmllIS5wZXJzaXN0SUQsIHRoaXMuc2VyaWUuZ2V0U2V0dGluZ3MoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmFpc2VzIHRoZSBzZXJpZSBkYXRhIGNhaG5nZWQgZXZlbnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcGFyYW0geyp9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHtFdmVudFNlcmllRGF0YUNoYW5nZWRBcmdzfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVOb2RlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBvblNlcmllRGF0YUNoYW5nZWQoc2VuZGVyLCBhcmdzOiBFdmVudFNlcmllRGF0YUNoYW5nZWRBcmdzKSB7XHJcbiAgICAgICAgdGhpcy5ldmVudFNlcmllRGF0YUNoYW5nZWQucmFpc2Uoc2VuZGVyLCBhcmdzKTtcclxuICAgIH1cclxufVxyXG4iXX0=