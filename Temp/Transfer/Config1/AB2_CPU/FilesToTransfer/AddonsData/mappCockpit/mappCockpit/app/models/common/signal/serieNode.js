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
define(["require", "exports", "../../../framework/events", "../../signalManagerDataModel/signalRoot", "../../../widgets/common/seriesIconProvider"], function (require, exports, events_1, signalRoot_1, seriesIconProvider_1) {
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
            // Set default visible class for serie node
            this._type = NodeType.series;
        }
        Object.defineProperty(SerieNode.prototype, "validNode", {
            get: function () {
                return true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SerieNode.prototype, "type", {
            /**
             * Returns the type of the serieNode
             *
             * @protected
             * @type {string}
             * @memberof SerieNode
             */
            get: function () {
                return this._type;
            },
            /**
             * Sets the type of the serieNode
             *
             * @protected
             * @memberof SerieNode
             */
            set: function (value) {
                this._type = value;
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
                if (this.type == NodeType.container) {
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
            if (this.type == NodeType.series) {
                if (this.serie != undefined) {
                    iconDefinition += seriesIconProvider_1.SeriesIconProvider.getInstance().getIcon(this.serie);
                }
                else {
                    console.warn("No serie info available for getting icon!");
                }
            }
            else if (this.type == NodeType.calculationOutputParam) {
                iconDefinition += '<img class="treeGridRowIcon" src="../app/widgets/signalManagerWidget/style/images/tree/calculationOutput.svg" />';
                if (this.serie != undefined && !this.serie.rawPointsValid) {
                    // Set exclamation overlay for invalid series
                    var tooltipText = "The data is invalid!"; // Default tooltiptext in case of invalid data
                    var errorText = seriesIconProvider_1.SeriesIconProvider.getTextFromErrorInfos(this.serie.errorInfo);
                    if (errorText != "") {
                        tooltipText = errorText; // Use error info text for tooltip text
                    }
                    iconDefinition += "<img title=\"" + tooltipText + "\" class=\"treeGridRowIcon\" src=\"" + seriesIconProvider_1.SeriesIconProvider.getSvgPath("exclamationOverlay") + "\" />";
                }
            }
            else if (this.type == NodeType.calculationInputParam) {
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
                        this._serie.eventDataChanged.detach(this._onSerieDataChangedHandler);
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
                if (lastKnownParent instanceof signalRoot_1.SignalRoot) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWVOb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvY29tbW9uL3NpZ25hbC9zZXJpZU5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVdBO1FBQStCLG9DQUF5RDtRQUF4Rjs7UUFBMEYsQ0FBQztRQUFELHVCQUFDO0lBQUQsQ0FBQyxBQUEzRixDQUErQixtQkFBVSxHQUFrRDtJQUFBLENBQUM7SUFDNUY7UUFBb0MseUNBQWlEO1FBQXJGOztRQUF1RixDQUFDO1FBQUQsNEJBQUM7SUFBRCxDQUFDLEFBQXhGLENBQW9DLG1CQUFVLEdBQTBDO0lBQUEsQ0FBQztJQUV6RixJQUFZLFFBS1g7SUFMRCxXQUFZLFFBQVE7UUFDaEIsaURBQVMsQ0FBQTtRQUNULDJDQUFNLENBQUE7UUFDTix5RUFBcUIsQ0FBQTtRQUNyQiwyRUFBc0IsQ0FBQTtJQUMxQixDQUFDLEVBTFcsUUFBUSxHQUFSLGdCQUFRLEtBQVIsZ0JBQVEsUUFLbkI7SUFHRDtRQXNUSTs7Ozs7V0FLRztRQUNILG1CQUFZLElBQXNCLEVBQUUsS0FBdUM7WUFBM0UsaUJBT0M7WUFQbUMsc0JBQUEsRUFBQSxpQkFBdUM7WUEzVDNFLHFCQUFnQixHQUFxQixJQUFJLGdCQUFnQixFQUFFLENBQUM7WUFDNUQsMEJBQXFCLEdBQTBCLElBQUkscUJBQXFCLEVBQUUsQ0FBQztZQUVqRSwrQkFBMEIsR0FBRyxVQUFDLE1BQU0sRUFBRSxJQUFJLElBQUssT0FBQSxLQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFyQyxDQUFxQyxDQUFDO1lBT3ZGLFdBQU0sR0FBdUIsU0FBUyxDQUFDO1lBa1QzQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUNsQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUss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QUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSCxpQ0FBYSxHQUFiO1lBQ0ksSUFBUyxJQUFLLENBQUMsWUFBWSxJQUFJLElBQUksRUFBQztnQkFDaEMsT0FBWSxJQUFtQixDQUFDO2FBQ25DO1lBQ0QsSUFBRyxJQUFJLENBQUMsTUFBTSxJQUFJLFNBQVMsRUFBQztnQkFDeEIsSUFBUyxJQUFJLENBQUMsTUFBTyxDQUFDLFlBQVksSUFBSSxJQUFJLEVBQUU7b0JBQ3hDLE9BQU8sSUFBSSxDQUFDLE1BQXFCLENBQUM7aUJBQ3JDO3FCQUNHO29CQUNBLE9BQU8sSUFBSSxDQUFDLE1BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztpQkFDdkM7YUFDSjtZQUNELE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFHRDs7Ozs7OztXQU9HO1FBQ08saUNBQWEsR0FBdkIsVUFBd0IsTUFBTSxFQUFFLElBQXVDO1lBQ25FLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzlDLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ08sc0NBQWtCLEdBQTVCLFVBQTZCLE1BQU0sRUFBRSxJQUErQjtZQUNoRSxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuRCxDQUFDO1FBQ0wsZ0JBQUM7SUFBRCxDQUFDLEFBbmFELElBbWFDO0lBbmFZLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVNlcmllTm9kZSB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3NlcmllTm9kZUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUeXBlZEV2ZW50IH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9ldmVudHNcIjtcclxuaW1wb3J0IHsgRXZlbnRTaWduYWxNYW5hZ2VyRGF0YUNoYW5nZWRBcmdzIH0gZnJvbSBcIi4uLy4uL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvZXZlbnRTaWduYWxNYW5hZ2VyRGF0YUNoYW5nZWRBcmdzXCI7XHJcbmltcG9ydCB7IElTZXJpZUNvbnRhaW5lciB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3NlcmllQ29udGFpbmVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNpZ25hbFJvb3QgfSBmcm9tIFwiLi4vLi4vc2lnbmFsTWFuYWdlckRhdGFNb2RlbC9zaWduYWxSb290XCI7XHJcbmltcG9ydCB7IElTaWduYWxNYW5hZ2VyRGF0YU1vZGVsIH0gZnJvbSBcIi4uLy4uL2RhdGFNb2RlbHNcIjtcclxuaW1wb3J0IHsgSVNlcmllR3JvdXAgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9zZXJpZUdyb3VwSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNlcmllc0ljb25Qcm92aWRlciB9IGZyb20gXCIuLi8uLi8uLi93aWRnZXRzL2NvbW1vbi9zZXJpZXNJY29uUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgQmFzZVNlcmllcyB9IGZyb20gXCIuLi8uLi9jaGFydE1hbmFnZXJEYXRhTW9kZWwvYmFzZVNlcmllc1wiO1xyXG5pbXBvcnQgeyBFdmVudFNlcmllRGF0YUNoYW5nZWRBcmdzIH0gZnJvbSBcIi4uLy4uL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9ldmVudFNlcmllRGF0YUNoYW5nZWRBcmdzXCI7XHJcblxyXG5jbGFzcyBFdmVudERhdGFDaGFuZ2VkIGV4dGVuZHMgVHlwZWRFdmVudDxJU2VyaWVOb2RlLCBFdmVudFNpZ25hbE1hbmFnZXJEYXRhQ2hhbmdlZEFyZ3M+eyB9O1xyXG5jbGFzcyBFdmVudFNlcmllRGF0YUNoYW5nZWQgZXh0ZW5kcyBUeXBlZEV2ZW50PEJhc2VTZXJpZXMsIEV2ZW50U2VyaWVEYXRhQ2hhbmdlZEFyZ3M+eyB9O1xyXG5cclxuZXhwb3J0IGVudW0gTm9kZVR5cGV7XHJcbiAgICBjb250YWluZXIsXHJcbiAgICBzZXJpZXMsXHJcbiAgICBjYWxjdWxhdGlvbklucHV0UGFyYW0sXHJcbiAgICBjYWxjdWxhdGlvbk91dHB1dFBhcmFtXHJcbn1cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgU2VyaWVOb2RlIGltcGxlbWVudHMgSVNlcmllTm9kZXtcclxuICAgIGV2ZW50RGF0YUNoYW5nZWQ6IEV2ZW50RGF0YUNoYW5nZWQgPSBuZXcgRXZlbnREYXRhQ2hhbmdlZCgpO1xyXG4gICAgZXZlbnRTZXJpZURhdGFDaGFuZ2VkOiBFdmVudFNlcmllRGF0YUNoYW5nZWQgPSBuZXcgRXZlbnRTZXJpZURhdGFDaGFuZ2VkKCk7XHJcblxyXG4gICAgcHJvdGVjdGVkIF9vblNlcmllRGF0YUNoYW5nZWRIYW5kbGVyID0gKHNlbmRlciwgYXJncykgPT4gdGhpcy5vblNlcmllRGF0YUNoYW5nZWQoc2VuZGVyLCBhcmdzKTtcclxuICAgIFxyXG4gICAgcHVibGljIGdldCB2YWxpZE5vZGUoKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfdHlwZTogTm9kZVR5cGU7XHJcbiAgICBwcml2YXRlIF9jb2xvcjogc3RyaW5nIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG4gICAgcHJvdGVjdGVkIF9uYW1lOiBzdHJpbmd8dW5kZWZpbmVkO1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHR5cGUgb2YgdGhlIHNlcmllTm9kZVxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVOb2RlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXQgdHlwZSgpOiBOb2RlVHlwZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3R5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSB0eXBlIG9mIHRoZSBzZXJpZU5vZGVcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVOb2RlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBzZXQgdHlwZSh2YWx1ZTogTm9kZVR5cGUpIHtcclxuICAgICAgICB0aGlzLl90eXBlID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZXNjcmlwdGlvbiBvZiB0aGUgc2VyaWVcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllTm9kZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGRlc2NyaXB0aW9uKCk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYodGhpcy5zZXJpZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZXJpZS5kZXNjcmlwdGlvbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBkZXNjcmlwdGlvbiBvZiB0aGUgc2VyaWVcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVOb2RlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgZGVzY3JpcHRpb24odmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIGlmKHRoaXMuc2VyaWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5zZXJpZS5kZXNjcmlwdGlvbiA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGNvbG9yIG9mIHRoZSBzZXJpZVxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHsoc3RyaW5nIHwgdW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZU5vZGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBjb2xvcigpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGlmKHRoaXMuX2NvbG9yICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb2xvcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgaWYodGhpcy5zZXJpZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VyaWUuY29sb3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBjb2xvciBvZiB0aGUgc2VyaWVcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVOb2RlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgY29sb3IodmFsdWU6IHN0cmluZyB8IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGlmKHRoaXMuX2NvbG9yICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbG9yID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2VyaWUgIT0gdW5kZWZpbmVkICYmIHZhbHVlICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlcmllLmNvbG9yID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBuYW1lIG9yIG9yaWdpbmFsbmFtZSBvZiB0aGUgc2VyaWUgY29ycmVzcG9uZGluZyB0byB0aGUgZWRpdCBtb2RlXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZU5vZGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBuYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYodGhpcy5fbmFtZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgaWYodGhpcy5zZXJpZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGFNb2RlbCA9IHRoaXMuZ2V0RGF0YU1vZGVsKCk7XHJcbiAgICAgICAgICAgICAgICBpZihkYXRhTW9kZWwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICBpZihkYXRhTW9kZWwuZWRpdE1vZGVBY3RpdmUgPT0gdHJ1ZSAmJiB0aGlzLnNlcmllLm9yaWdpbmFsTmFtZSAhPSBcIlwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VyaWUub3JpZ2luYWxOYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNlcmllLm5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgbmFtZSBvZiB0aGUgc2VyaWVcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVOb2RlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgbmFtZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYodGhpcy5fbmFtZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9uYW1lID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2VyaWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VyaWUubmFtZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBfcGFyZW50OiBJU2VyaWVDb250YWluZXIgfCB1bmRlZmluZWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBpY29uIGRlZmluaXRpb24gZm9yIHRoaXMgc2VyaWVOb2RlXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZU5vZGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBpY29uRGVmaW5pdGlvbigpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBpY29uRGVmaW5pdGlvbiA9IFwiXCI7XHJcbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PSBOb2RlVHlwZS5jb250YWluZXIpIHtcclxuICAgICAgICAgICAgaWNvbkRlZmluaXRpb24gPSB0aGlzLmdldEljb25EZWZpbml0aW9uRm9yQ29udGFpbmVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpY29uRGVmaW5pdGlvbiA9IHRoaXMuZ2V0SWNvbkRlZmluaXRpb25Gb3JOb2RlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpY29uRGVmaW5pdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGljb25EZWZpbml0aW9uIGluIGNhc2Ugb2YgYSBjb250YWluZXIgbm9kZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFNlcmllTm9kZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldEljb25EZWZpbml0aW9uRm9yQ29udGFpbmVyKCl7XHJcbiAgICAgICAgbGV0IGNsYXNzTmFtZXMgPSBcImUtdHJlZWdyaWRjb2xsYXBzZSB0cmVlZ3JpZGNvbGxhcHNlXCI7XHJcblxyXG4gICAgICAgIC8vIEFkZCBjb2xsYXBzZS9leHBhbmQgaWNvbiBcclxuICAgICAgICBpZiAoKDxhbnk+dGhpcykuZXhwYW5kU3RhdGUgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBjbGFzc05hbWVzICs9IFwiZS10cmVlZ3JpZGV4cGFuZCB0cmVlZ3JpZGV4cGFuZFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9J2AgKyBjbGFzc05hbWVzICsgYCc+PC9kaXY+YDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGljb24gZGVmaW5pdGlvbiBpbiBjYXNlIG9mIGEgbm9kZShlLmcuIGlucHV0IHBhcmFtIG9mIGNhbGN1bGF0aW9uLCBvdXRwdXQgcGFyYW0gb2YgY2FsY3VsYXRpb24sIHNlcmllLCAuLi4pXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVOb2RlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0SWNvbkRlZmluaXRpb25Gb3JOb2RlKCl7XHJcbiAgICAgICAgbGV0IGljb25EZWZpbml0aW9uID0gYDxkaXYgY2xhc3M9J2UtZG9jJyBzdHlsZT0ncG9zaXRpb246IHJlbGF0aXZlO2hlaWdodDoxNnB4O3dpZHRoOjMwcHg7bWFyZ2luOmF1dG87ZmxvYXQ6bGVmdDttYXJnaW4tbGVmdDo2cHg7bWFyZ2luLXRvcDoycHgnPmA7XHJcblxyXG4gICAgICAgIC8vIFNldCBtYWluIGljb25cclxuICAgICAgICBpZiAodGhpcy50eXBlID09IE5vZGVUeXBlLnNlcmllcykge1xyXG4gICAgICAgICAgICBpZih0aGlzLnNlcmllICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBpY29uRGVmaW5pdGlvbiArPSBTZXJpZXNJY29uUHJvdmlkZXIuZ2V0SW5zdGFuY2UoKS5nZXRJY29uKHRoaXMuc2VyaWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJObyBzZXJpZSBpbmZvIGF2YWlsYWJsZSBmb3IgZ2V0dGluZyBpY29uIVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnR5cGUgPT0gTm9kZVR5cGUuY2FsY3VsYXRpb25PdXRwdXRQYXJhbSkge1xyXG4gICAgICAgICAgICBpY29uRGVmaW5pdGlvbiArPSAnPGltZyBjbGFzcz1cInRyZWVHcmlkUm93SWNvblwiIHNyYz1cIi4uL2FwcC93aWRnZXRzL3NpZ25hbE1hbmFnZXJXaWRnZXQvc3R5bGUvaW1hZ2VzL3RyZWUvY2FsY3VsYXRpb25PdXRwdXQuc3ZnXCIgLz4nO1xyXG4gICAgICAgICAgICBpZih0aGlzLnNlcmllICE9IHVuZGVmaW5lZCAmJiAhdGhpcy5zZXJpZS5yYXdQb2ludHNWYWxpZCl7XHJcbiAgICAgICAgICAgICAgICAvLyBTZXQgZXhjbGFtYXRpb24gb3ZlcmxheSBmb3IgaW52YWxpZCBzZXJpZXNcclxuICAgICAgICAgICAgICAgIGxldCB0b29sdGlwVGV4dCA9IFwiVGhlIGRhdGEgaXMgaW52YWxpZCFcIjsgLy8gRGVmYXVsdCB0b29sdGlwdGV4dCBpbiBjYXNlIG9mIGludmFsaWQgZGF0YVxyXG4gICAgICAgICAgICAgICAgbGV0IGVycm9yVGV4dCA9IFNlcmllc0ljb25Qcm92aWRlci5nZXRUZXh0RnJvbUVycm9ySW5mb3ModGhpcy5zZXJpZS5lcnJvckluZm8pO1xyXG4gICAgICAgICAgICAgICAgaWYoZXJyb3JUZXh0ICE9IFwiXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXBUZXh0ID0gZXJyb3JUZXh0OyAvLyBVc2UgZXJyb3IgaW5mbyB0ZXh0IGZvciB0b29sdGlwIHRleHRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGljb25EZWZpbml0aW9uICs9IGA8aW1nIHRpdGxlPVwiYCsgdG9vbHRpcFRleHQgK2BcIiBjbGFzcz1cInRyZWVHcmlkUm93SWNvblwiIHNyYz1cImAgKyBTZXJpZXNJY29uUHJvdmlkZXIuZ2V0U3ZnUGF0aChcImV4Y2xhbWF0aW9uT3ZlcmxheVwiKSArIGBcIiAvPmA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy50eXBlID09IE5vZGVUeXBlLmNhbGN1bGF0aW9uSW5wdXRQYXJhbSkge1xyXG4gICAgICAgICAgICBpY29uRGVmaW5pdGlvbiArPSAnPGltZyBjbGFzcz1cInRyZWVHcmlkUm93SWNvblwiIHNyYz1cIi4uL2FwcC93aWRnZXRzL3NpZ25hbE1hbmFnZXJXaWRnZXQvc3R5bGUvaW1hZ2VzL3RyZWUvY2FsY3VsYXRpb25JbnB1dC5zdmdcIiAvPic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGljb25EZWZpbml0aW9uICs9IGA8L2Rpdj5gO1xyXG4gICAgICAgIHJldHVybiBpY29uRGVmaW5pdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCBpY29uIGRlZmluaXRvbiA9PiBub3QgaW1wbGVtZW50ZWQ7IFNldHRlciBvbmx5IG5lZWRlZCBmb3IgdXNlIGFzIGZpZWxkIGZvciB0aGUgc3luY2Z1c2lvbiB0cmVlIGdyaWRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVOb2RlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgaWNvbkRlZmluaXRpb24odmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgLy8gdGhpcy5faWNvbkRlZmluaXRpb24gPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHBhcmVudCBvZiB0aGlzIG5vZGVcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7KElTZXJpZUNvbnRhaW5lciB8IHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVOb2RlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgcGFyZW50KCk6IElTZXJpZUNvbnRhaW5lciB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcmVudDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHBhcmVudCBvZiB0aGlzIG5vZGVcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVOb2RlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgcGFyZW50KHZhbHVlOiBJU2VyaWVDb250YWluZXIgfCB1bmRlZmluZWQpIHtcclxuICAgICAgICBpZih0aGlzLnNlcmllICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGlmKHZhbHVlICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlcmllLnBhcmVudCA9IHZhbHVlLmdldFNlcmllR3JvdXAoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXJpZS5wYXJlbnQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fcGFyZW50ID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNhbkRlbGV0ZTogYm9vbGVhbjtcclxuICAgXHJcbiAgICBwcml2YXRlIF9zZXJpZTogQmFzZVNlcmllcyB8IHVuZGVmaW5lZDtcclxuICAgXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHNlcmllIG9mIHRoaXMgbm9kZVxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHsoQmFzZVNlcmllcyB8IHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVOb2RlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgc2VyaWUoKTogQmFzZVNlcmllcyB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlcmllO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHNlcmllIG9mIHRoaXMgbm9kZVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZU5vZGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBzZXJpZSh2YWx1ZTogQmFzZVNlcmllcyB8IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGlmKHZhbHVlICE9IHRoaXMuX3NlcmllKXtcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYodGhpcy5fc2VyaWUgIT0gdW5kZWZpbmVkKXsgLy8gRGV0YWNoIG9sZCBzZXJpZSBldmVudHNcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NlcmllLmV2ZW50RGF0YUNoYW5nZWQuZGV0YWNoKHRoaXMuX29uU2VyaWVEYXRhQ2hhbmdlZEhhbmRsZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX3NlcmllID0gdmFsdWU7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX3NlcmllICE9IHVuZGVmaW5lZCl7IC8vIEF0dGFjaCBuZXcgc2VyaWUgZXZlbnRzXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXJpZS5ldmVudERhdGFDaGFuZ2VkLmF0dGFjaCh0aGlzLl9vblNlcmllRGF0YUNoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHZhbHVlIG9mIHRoaXMgbm9kZVxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHsoc3RyaW5nfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVOb2RlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgdmFsdWUoKTogc3RyaW5nfHVuZGVmaW5lZCB7XHJcbiAgICAgICAgaWYodGhpcy5fc2VyaWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgaWYodGhpcy5fc2VyaWUubmFtZSAhPSB0aGlzLl9zZXJpZS5vcmlnaW5hbE5hbWUpeyAvLyBPbmx5IHNob3cgbmFtZShhbGlhcykgaW4gdmFsdWUgY29sdW1uIGlmIGRpZmZlcmVudCB0byB0aGUgb3JpZ2luYWwgbmFtZSBpbiB0aGUgbmFtZSBjb2x1bW5cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zZXJpZS5uYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHZhbHVlIG9mIHRoaXMgbm9kZVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZU5vZGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCB2YWx1ZSh2YWx1ZTogc3RyaW5nfHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGlmKHRoaXMuX3NlcmllICE9IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBpZih2YWx1ZSA9PSBcIlwiKXsgLy8gaWYgZW1wdHkgbmFtZSA9PiB1c2Ugb3JpZ2luYWwgbmFtZSBmcm9tIHNpZ25hbFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2VyaWUucmVzZXROYW1lKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NlcmllLm5hbWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgU2VyaWVOb2RlXHJcbiAgICAgKiBAcGFyYW0geyhzdHJpbmd8dW5kZWZpbmVkKX0gbmFtZVxyXG4gICAgICogQHBhcmFtIHsoQmFzZVNlcmllc3x1bmRlZmluZWQpfSBbc2VyaWU9dW5kZWZpbmVkXVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllTm9kZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmd8dW5kZWZpbmVkLCBzZXJpZTogQmFzZVNlcmllc3x1bmRlZmluZWQgPSB1bmRlZmluZWQpe1xyXG4gICAgICAgIHRoaXMuX25hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuY2FuRGVsZXRlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNlcmllID0gc2VyaWU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gU2V0IGRlZmF1bHQgdmlzaWJsZSBjbGFzcyBmb3Igc2VyaWUgbm9kZVxyXG4gICAgICAgIHRoaXMuX3R5cGUgPSBOb2RlVHlwZS5zZXJpZXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNwb3NlIHRoZSBTZXJpZU5vZGVcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVOb2RlXHJcbiAgICAgKi9cclxuICAgIGRpc3Bvc2UoKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDbG9uZXMgdGhlIGNhbGN1bGF0ZWQgc2VyaWVcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0ZWRTaWduYWxcclxuICAgICAqL1xyXG4gICAgY2xvbmUoKTogSVNlcmllTm9kZXtcclxuICAgICAgICBsZXQgc2VyaWVDbG9uZTtcclxuICAgICAgICBpZih0aGlzLnNlcmllICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHNlcmllQ2xvbmUgPSB0aGlzLnNlcmllLmNsb25lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFRPRE86IGNoZWNrIGNsb25lIChuYW1lIHVuZGVmaW5lZCBvciBmcm9tIGRhdGEpXHJcbiAgICAgICAgbGV0IGNsb25lZFNlcmllTm9kZSA9IG5ldyBTZXJpZU5vZGUodW5kZWZpbmVkLCBzZXJpZUNsb25lKTtcclxuICAgICAgICByZXR1cm4gY2xvbmVkU2VyaWVOb2RlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGF0YW1vZGVsIG9mIHRoaXMgbm9kZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsoSVNpZ25hbE1hbmFnZXJEYXRhTW9kZWx8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZU5vZGVcclxuICAgICAqL1xyXG4gICAgZ2V0RGF0YU1vZGVsKCk6IElTaWduYWxNYW5hZ2VyRGF0YU1vZGVsfHVuZGVmaW5lZHtcclxuICAgICAgICBsZXQgcGFyZW50OiBJU2VyaWVDb250YWluZXJ8dW5kZWZpbmVkID0gdGhpcy5wYXJlbnQ7XHJcbiAgICAgICAgbGV0IGxhc3RLbm93blBhcmVudCA9IHBhcmVudDtcclxuICAgICAgICBkb3tcclxuICAgICAgICAgICAgaWYocGFyZW50ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBsYXN0S25vd25QYXJlbnQgPSBwYXJlbnQ7XHJcbiAgICAgICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfXdoaWxlKHBhcmVudCAhPSB1bmRlZmluZWQpXHJcbiAgICAgICAgaWYobGFzdEtub3duUGFyZW50ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGlmKGxhc3RLbm93blBhcmVudCBpbnN0YW5jZW9mIFNpZ25hbFJvb3Qpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChsYXN0S25vd25QYXJlbnQgYXMgU2lnbmFsUm9vdCkuZGF0YU1vZGVsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBzZXJpZSBncm91cCB0byB3aGljaCB0aGlzIG5vZGUgYmVsb25nc1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsoSVNlcmllR3JvdXB8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZU5vZGVcclxuICAgICAqL1xyXG4gICAgZ2V0U2VyaWVHcm91cCgpOklTZXJpZUdyb3VwfHVuZGVmaW5lZHtcclxuICAgICAgICBpZigoPGFueT50aGlzKS5pc1NlcmllR3JvdXAgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIHJldHVybiA8YW55PnRoaXMgYXMgSVNlcmllR3JvdXA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMucGFyZW50ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGlmKCg8YW55PnRoaXMucGFyZW50KS5pc1NlcmllR3JvdXAgPT0gdHJ1ZSApe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50IGFzIElTZXJpZUdyb3VwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnQhLmdldFNlcmllR3JvdXAoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSYWlzZXMgdGhlIGRhdGEgY2hhbmdlZCBldmVudFxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBwYXJhbSB7Kn0gc2VuZGVyXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50U2lnbmFsTWFuYWdlckRhdGFDaGFuZ2VkQXJnc30gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIFNlcmllTm9kZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgb25EYXRhQ2hhbmdlZChzZW5kZXIsIGFyZ3M6IEV2ZW50U2lnbmFsTWFuYWdlckRhdGFDaGFuZ2VkQXJncykge1xyXG4gICAgICAgIHRoaXMuZXZlbnREYXRhQ2hhbmdlZC5yYWlzZShzZW5kZXIsIGFyZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmFpc2VzIHRoZSBzZXJpZSBkYXRhIGNhaG5nZWQgZXZlbnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcGFyYW0geyp9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHtFdmVudFNlcmllRGF0YUNoYW5nZWRBcmdzfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVOb2RlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBvblNlcmllRGF0YUNoYW5nZWQoc2VuZGVyLCBhcmdzOiBFdmVudFNlcmllRGF0YUNoYW5nZWRBcmdzKSB7XHJcbiAgICAgICAgdGhpcy5ldmVudFNlcmllRGF0YUNoYW5nZWQucmFpc2Uoc2VuZGVyLCBhcmdzKTtcclxuICAgIH1cclxufVxyXG4iXX0=