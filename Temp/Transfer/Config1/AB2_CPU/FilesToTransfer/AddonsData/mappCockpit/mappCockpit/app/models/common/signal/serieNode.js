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
                    iconDefinition += seriesIconProvider_1.SeriesIconProvider.getInstance().getIcon(this.serie);
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
                    var errorText = seriesIconProvider_1.SeriesIconProvider.getTextFromErrorInfos(this.serie.errorInfo);
                    if (errorText != "") {
                        tooltipText = errorText; // Use error info text for tooltip text
                    }
                    iconDefinition += "<img title=\"" + tooltipText + "\" class=\"treeGridRowIcon\" src=\"" + seriesIconProvider_1.SeriesIconProvider.getSvgPath("exclamationOverlay") + "\" />";
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
                        this.disposeSerie();
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
                    // Only dispose serie if this node is the original series and not only a link to a series(calculation input series)
                    this.serie.dispose();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWVOb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvY29tbW9uL3NpZ25hbC9zZXJpZU5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQVdBO1FBQStCLG9DQUF5RDtRQUF4Rjs7UUFBMEYsQ0FBQztRQUFELHVCQUFDO0lBQUQsQ0FBQyxBQUEzRixDQUErQixtQkFBVSxHQUFrRDtJQUFBLENBQUM7SUFDNUY7UUFBb0MseUNBQWlEO1FBQXJGOztRQUF1RixDQUFDO1FBQUQsNEJBQUM7SUFBRCxDQUFDLEFBQXhGLENBQW9DLG1CQUFVLEdBQTBDO0lBQUEsQ0FBQztJQUV6RixJQUFZLFFBS1g7SUFMRCxXQUFZLFFBQVE7UUFDaEIsaURBQVMsQ0FBQTtRQUNULDJDQUFNLENBQUE7UUFDTix5RUFBcUIsQ0FBQTtRQUNyQiwyRUFBc0IsQ0FBQTtJQUMxQixDQUFDLEVBTFcsUUFBUSxHQUFSLGdCQUFRLEtBQVIsZ0JBQVEsUUFLbkI7SUFHRDtRQWtUSTs7Ozs7V0FLRztRQUNILG1CQUFZLElBQXNCLEVBQUUsS0FBdUM7WUFBM0UsaUJBSUM7WUFKbUMsc0JBQUEsRUFBQSxpQkFBdUM7WUF2VDNFLHFCQUFnQixHQUFxQixJQUFJLGdCQUFnQixFQUFFLENBQUM7WUFDNUQsMEJBQXFCLEdBQTBCLElBQUkscUJBQXFCLEVBQUUsQ0FBQztZQUVqRSwrQkFBMEIsR0FBRyxVQUFDLE1BQU0sRUFBRSxJQUFJLElBQUssT0FBQSxLQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFyQyxDQUFxQyxDQUFDO1lBTXZGLFdBQU0sR0FBdUIsU0FBUyxDQUFDO1lBK1MzQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUNsQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUss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SUFBSSxDQUFDLENBQUM7UUFDbkQsQ0FBQztRQUNMLGdCQUFDO0lBQUQsQ0FBQyxBQTNhRCxJQTJhQztJQTNhWSw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElTZXJpZU5vZGUgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9zZXJpZU5vZGVJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvZXZlbnRzXCI7XHJcbmltcG9ydCB7IEV2ZW50U2lnbmFsTWFuYWdlckRhdGFDaGFuZ2VkQXJncyB9IGZyb20gXCIuLi8uLi9zaWduYWxNYW5hZ2VyRGF0YU1vZGVsL2V2ZW50U2lnbmFsTWFuYWdlckRhdGFDaGFuZ2VkQXJnc1wiO1xyXG5pbXBvcnQgeyBJU2VyaWVDb250YWluZXIgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9zZXJpZUNvbnRhaW5lckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTaWduYWxSb290IH0gZnJvbSBcIi4uLy4uL3NpZ25hbE1hbmFnZXJEYXRhTW9kZWwvc2lnbmFsUm9vdFwiO1xyXG5pbXBvcnQgeyBJU2lnbmFsTWFuYWdlckRhdGFNb2RlbCB9IGZyb20gXCIuLi8uLi9kYXRhTW9kZWxzXCI7XHJcbmltcG9ydCB7IElTZXJpZUdyb3VwIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvc2VyaWVHcm91cEludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTZXJpZXNJY29uUHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vLi4vd2lkZ2V0cy9jb21tb24vc2VyaWVzSWNvblByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IEJhc2VTZXJpZXMgfSBmcm9tIFwiLi4vLi4vY2hhcnRNYW5hZ2VyRGF0YU1vZGVsL2Jhc2VTZXJpZXNcIjtcclxuaW1wb3J0IHsgRXZlbnRTZXJpZURhdGFDaGFuZ2VkQXJncyB9IGZyb20gXCIuLi8uLi9jaGFydE1hbmFnZXJEYXRhTW9kZWwvZXZlbnRTZXJpZURhdGFDaGFuZ2VkQXJnc1wiO1xyXG5cclxuY2xhc3MgRXZlbnREYXRhQ2hhbmdlZCBleHRlbmRzIFR5cGVkRXZlbnQ8SVNlcmllTm9kZSwgRXZlbnRTaWduYWxNYW5hZ2VyRGF0YUNoYW5nZWRBcmdzPnsgfTtcclxuY2xhc3MgRXZlbnRTZXJpZURhdGFDaGFuZ2VkIGV4dGVuZHMgVHlwZWRFdmVudDxCYXNlU2VyaWVzLCBFdmVudFNlcmllRGF0YUNoYW5nZWRBcmdzPnsgfTtcclxuXHJcbmV4cG9ydCBlbnVtIE5vZGVUeXBle1xyXG4gICAgY29udGFpbmVyLFxyXG4gICAgc2VyaWVzLFxyXG4gICAgY2FsY3VsYXRpb25JbnB1dFBhcmFtLFxyXG4gICAgY2FsY3VsYXRpb25PdXRwdXRQYXJhbVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFNlcmllTm9kZSBpbXBsZW1lbnRzIElTZXJpZU5vZGV7XHJcbiAgICBldmVudERhdGFDaGFuZ2VkOiBFdmVudERhdGFDaGFuZ2VkID0gbmV3IEV2ZW50RGF0YUNoYW5nZWQoKTtcclxuICAgIGV2ZW50U2VyaWVEYXRhQ2hhbmdlZDogRXZlbnRTZXJpZURhdGFDaGFuZ2VkID0gbmV3IEV2ZW50U2VyaWVEYXRhQ2hhbmdlZCgpO1xyXG5cclxuICAgIHByb3RlY3RlZCBfb25TZXJpZURhdGFDaGFuZ2VkSGFuZGxlciA9IChzZW5kZXIsIGFyZ3MpID0+IHRoaXMub25TZXJpZURhdGFDaGFuZ2VkKHNlbmRlciwgYXJncyk7XHJcbiAgICBcclxuICAgIHB1YmxpYyBnZXQgdmFsaWROb2RlKCk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByaXZhdGUgX2NvbG9yOiBzdHJpbmcgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICBwcm90ZWN0ZWQgX25hbWU6IHN0cmluZ3x1bmRlZmluZWQ7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdHlwZSBvZiB0aGUgc2VyaWVOb2RlXHJcbiAgICAgKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZU5vZGVcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldCBub2RlVHlwZSgpOiBOb2RlVHlwZSB7XHJcbiAgICAgICAgcmV0dXJuIE5vZGVUeXBlLnNlcmllcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlc2NyaXB0aW9uIG9mIHRoZSBzZXJpZVxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVOb2RlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgZGVzY3JpcHRpb24oKTogc3RyaW5nIHtcclxuICAgICAgICBpZih0aGlzLnNlcmllICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlcmllLmRlc2NyaXB0aW9uO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGRlc2NyaXB0aW9uIG9mIHRoZSBzZXJpZVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZU5vZGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBkZXNjcmlwdGlvbih2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYodGhpcy5zZXJpZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLnNlcmllLmRlc2NyaXB0aW9uID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgY29sb3Igb2YgdGhlIHNlcmllXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUgeyhzdHJpbmcgfCB1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllTm9kZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGNvbG9yKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgaWYodGhpcy5fY29sb3IgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbG9yO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBpZih0aGlzLnNlcmllICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZXJpZS5jb2xvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGNvbG9yIG9mIHRoZSBzZXJpZVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZU5vZGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBjb2xvcih2YWx1ZTogc3RyaW5nIHwgdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgaWYodGhpcy5fY29sb3IgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fY29sb3IgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgaWYodGhpcy5zZXJpZSAhPSB1bmRlZmluZWQgJiYgdmFsdWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VyaWUuY29sb3IgPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIG5hbWUgb3Igb3JpZ2luYWxuYW1lIG9mIHRoZSBzZXJpZSBjb3JyZXNwb25kaW5nIHRvIHRoZSBlZGl0IG1vZGVcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllTm9kZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICBpZih0aGlzLl9uYW1lICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBpZih0aGlzLnNlcmllICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0YU1vZGVsID0gdGhpcy5nZXREYXRhTW9kZWwoKTtcclxuICAgICAgICAgICAgICAgIGlmKGRhdGFNb2RlbCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRhdGFNb2RlbC5lZGl0TW9kZUFjdGl2ZSA9PSB0cnVlICYmIHRoaXMuc2VyaWUub3JpZ2luYWxOYW1lICE9IFwiXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZXJpZS5vcmlnaW5hbE5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VyaWUubmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBuYW1lIG9mIHRoZSBzZXJpZVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZU5vZGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBuYW1lKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICBpZih0aGlzLl9uYW1lICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX25hbWUgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgaWYodGhpcy5zZXJpZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXJpZS5uYW1lID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIF9wYXJlbnQ6IElTZXJpZUNvbnRhaW5lciB8IHVuZGVmaW5lZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGljb24gZGVmaW5pdGlvbiBmb3IgdGhpcyBzZXJpZU5vZGVcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllTm9kZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGljb25EZWZpbml0aW9uKCk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IGljb25EZWZpbml0aW9uID0gXCJcIjtcclxuICAgICAgICBpZiAodGhpcy5ub2RlVHlwZSA9PSBOb2RlVHlwZS5jb250YWluZXIpIHtcclxuICAgICAgICAgICAgaWNvbkRlZmluaXRpb24gPSB0aGlzLmdldEljb25EZWZpbml0aW9uRm9yQ29udGFpbmVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpY29uRGVmaW5pdGlvbiA9IHRoaXMuZ2V0SWNvbkRlZmluaXRpb25Gb3JOb2RlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpY29uRGVmaW5pdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGljb25EZWZpbml0aW9uIGluIGNhc2Ugb2YgYSBjb250YWluZXIgbm9kZVxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIFNlcmllTm9kZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldEljb25EZWZpbml0aW9uRm9yQ29udGFpbmVyKCl7XHJcbiAgICAgICAgbGV0IGNsYXNzTmFtZXMgPSBcImUtdHJlZWdyaWRjb2xsYXBzZSB0cmVlZ3JpZGNvbGxhcHNlXCI7XHJcblxyXG4gICAgICAgIC8vIEFkZCBjb2xsYXBzZS9leHBhbmQgaWNvbiBcclxuICAgICAgICBpZiAoKDxhbnk+dGhpcykuZXhwYW5kU3RhdGUgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBjbGFzc05hbWVzICs9IFwiZS10cmVlZ3JpZGV4cGFuZCB0cmVlZ3JpZGV4cGFuZFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9J2AgKyBjbGFzc05hbWVzICsgYCc+PC9kaXY+YDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGljb24gZGVmaW5pdGlvbiBpbiBjYXNlIG9mIGEgbm9kZShlLmcuIGlucHV0IHBhcmFtIG9mIGNhbGN1bGF0aW9uLCBvdXRwdXQgcGFyYW0gb2YgY2FsY3VsYXRpb24sIHNlcmllLCAuLi4pXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVOb2RlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0SWNvbkRlZmluaXRpb25Gb3JOb2RlKCl7XHJcbiAgICAgICAgbGV0IGljb25EZWZpbml0aW9uID0gYDxkaXYgY2xhc3M9J2UtZG9jJyBzdHlsZT0ncG9zaXRpb246IHJlbGF0aXZlO2hlaWdodDoxNnB4O3dpZHRoOjMwcHg7bWFyZ2luOmF1dG87ZmxvYXQ6bGVmdDttYXJnaW4tbGVmdDo2cHg7bWFyZ2luLXRvcDoycHgnPmA7XHJcblxyXG4gICAgICAgIC8vIFNldCBtYWluIGljb25cclxuICAgICAgICBpZiAodGhpcy5ub2RlVHlwZSA9PSBOb2RlVHlwZS5zZXJpZXMpIHtcclxuICAgICAgICAgICAgaWYodGhpcy5zZXJpZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgaWNvbkRlZmluaXRpb24gKz0gU2VyaWVzSWNvblByb3ZpZGVyLmdldEluc3RhbmNlKCkuZ2V0SWNvbih0aGlzLnNlcmllKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiTm8gc2VyaWUgaW5mbyBhdmFpbGFibGUgZm9yIGdldHRpbmcgaWNvbiFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5ub2RlVHlwZSA9PSBOb2RlVHlwZS5jYWxjdWxhdGlvbk91dHB1dFBhcmFtKSB7XHJcbiAgICAgICAgICAgIGljb25EZWZpbml0aW9uICs9ICc8aW1nIGNsYXNzPVwidHJlZUdyaWRSb3dJY29uXCIgc3JjPVwiLi4vYXBwL3dpZGdldHMvc2lnbmFsTWFuYWdlcldpZGdldC9zdHlsZS9pbWFnZXMvdHJlZS9jYWxjdWxhdGlvbk91dHB1dC5zdmdcIiAvPic7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2VyaWUgIT0gdW5kZWZpbmVkICYmICF0aGlzLnNlcmllLnJhd1BvaW50c1ZhbGlkKXtcclxuICAgICAgICAgICAgICAgIC8vIFNldCBleGNsYW1hdGlvbiBvdmVybGF5IGZvciBpbnZhbGlkIHNlcmllc1xyXG4gICAgICAgICAgICAgICAgbGV0IHRvb2x0aXBUZXh0ID0gXCJUaGUgZGF0YSBpcyBpbnZhbGlkIVwiOyAvLyBEZWZhdWx0IHRvb2x0aXB0ZXh0IGluIGNhc2Ugb2YgaW52YWxpZCBkYXRhXHJcbiAgICAgICAgICAgICAgICBsZXQgZXJyb3JUZXh0ID0gU2VyaWVzSWNvblByb3ZpZGVyLmdldFRleHRGcm9tRXJyb3JJbmZvcyh0aGlzLnNlcmllLmVycm9ySW5mbyk7XHJcbiAgICAgICAgICAgICAgICBpZihlcnJvclRleHQgIT0gXCJcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcFRleHQgPSBlcnJvclRleHQ7IC8vIFVzZSBlcnJvciBpbmZvIHRleHQgZm9yIHRvb2x0aXAgdGV4dFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWNvbkRlZmluaXRpb24gKz0gYDxpbWcgdGl0bGU9XCJgKyB0b29sdGlwVGV4dCArYFwiIGNsYXNzPVwidHJlZUdyaWRSb3dJY29uXCIgc3JjPVwiYCArIFNlcmllc0ljb25Qcm92aWRlci5nZXRTdmdQYXRoKFwiZXhjbGFtYXRpb25PdmVybGF5XCIpICsgYFwiIC8+YDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLm5vZGVUeXBlID09IE5vZGVUeXBlLmNhbGN1bGF0aW9uSW5wdXRQYXJhbSkge1xyXG4gICAgICAgICAgICBpY29uRGVmaW5pdGlvbiArPSAnPGltZyBjbGFzcz1cInRyZWVHcmlkUm93SWNvblwiIHNyYz1cIi4uL2FwcC93aWRnZXRzL3NpZ25hbE1hbmFnZXJXaWRnZXQvc3R5bGUvaW1hZ2VzL3RyZWUvY2FsY3VsYXRpb25JbnB1dC5zdmdcIiAvPic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGljb25EZWZpbml0aW9uICs9IGA8L2Rpdj5gO1xyXG4gICAgICAgIHJldHVybiBpY29uRGVmaW5pdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCBpY29uIGRlZmluaXRvbiA9PiBub3QgaW1wbGVtZW50ZWQ7IFNldHRlciBvbmx5IG5lZWRlZCBmb3IgdXNlIGFzIGZpZWxkIGZvciB0aGUgc3luY2Z1c2lvbiB0cmVlIGdyaWRcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVOb2RlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgaWNvbkRlZmluaXRpb24odmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgLy8gdGhpcy5faWNvbkRlZmluaXRpb24gPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHBhcmVudCBvZiB0aGlzIG5vZGVcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7KElTZXJpZUNvbnRhaW5lciB8IHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVOb2RlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgcGFyZW50KCk6IElTZXJpZUNvbnRhaW5lciB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcmVudDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHBhcmVudCBvZiB0aGlzIG5vZGVcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVOb2RlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgcGFyZW50KHZhbHVlOiBJU2VyaWVDb250YWluZXIgfCB1bmRlZmluZWQpIHtcclxuICAgICAgICBpZih0aGlzLnNlcmllICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGlmKHZhbHVlICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlcmllLnBhcmVudCA9IHZhbHVlLmdldFNlcmllR3JvdXAoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXJpZS5wYXJlbnQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fcGFyZW50ID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNhbkRlbGV0ZTogYm9vbGVhbjtcclxuICAgXHJcbiAgICBwcml2YXRlIF9zZXJpZTogQmFzZVNlcmllcyB8IHVuZGVmaW5lZDtcclxuICAgXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHNlcmllIG9mIHRoaXMgbm9kZVxyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHsoQmFzZVNlcmllcyB8IHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVOb2RlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgc2VyaWUoKTogQmFzZVNlcmllcyB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlcmllO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHNlcmllIG9mIHRoaXMgbm9kZVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZU5vZGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBzZXJpZSh2YWx1ZTogQmFzZVNlcmllcyB8IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGlmKHZhbHVlICE9IHRoaXMuX3NlcmllKXtcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYodGhpcy5fc2VyaWUgIT0gdW5kZWZpbmVkKXsgLy8gRGV0YWNoIG9sZCBzZXJpZSBldmVudHNcclxuICAgICAgICAgICAgICAgIGlmKHZhbHVlICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdXBkYXRlIG5ldyBzZXJpZSB0byBwYXJlbnQgZ3JvdXAgaW5mb1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLnN0YXJ0VHJpZ2dlclRpbWUgPSB0aGlzLl9zZXJpZS5zdGFydFRyaWdnZXJUaW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLnBhcmVudCA9IHRoaXMuX3NlcmllLnBhcmVudDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX3NlcmllLmV2ZW50RGF0YUNoYW5nZWQuZGV0YWNoKHRoaXMuX29uU2VyaWVEYXRhQ2hhbmdlZEhhbmRsZXIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwb3NlU2VyaWUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5fc2VyaWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgaWYodGhpcy5fc2VyaWUgIT0gdW5kZWZpbmVkKXsgLy8gQXR0YWNoIG5ldyBzZXJpZSBldmVudHNcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NlcmllLmV2ZW50RGF0YUNoYW5nZWQuYXR0YWNoKHRoaXMuX29uU2VyaWVEYXRhQ2hhbmdlZEhhbmRsZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgdmFsdWUgb2YgdGhpcyBub2RlXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUgeyhzdHJpbmd8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZU5vZGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCB2YWx1ZSgpOiBzdHJpbmd8dW5kZWZpbmVkIHtcclxuICAgICAgICBpZih0aGlzLl9zZXJpZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBpZih0aGlzLl9zZXJpZS5uYW1lICE9IHRoaXMuX3NlcmllLm9yaWdpbmFsTmFtZSl7IC8vIE9ubHkgc2hvdyBuYW1lKGFsaWFzKSBpbiB2YWx1ZSBjb2x1bW4gaWYgZGlmZmVyZW50IHRvIHRoZSBvcmlnaW5hbCBuYW1lIGluIHRoZSBuYW1lIGNvbHVtblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NlcmllLm5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgdmFsdWUgb2YgdGhpcyBub2RlXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllTm9kZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IHZhbHVlKHZhbHVlOiBzdHJpbmd8dW5kZWZpbmVkKSB7XHJcbiAgICAgICAgaWYodGhpcy5fc2VyaWUgIT0gdW5kZWZpbmVkICYmIHZhbHVlICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGlmKHZhbHVlID09IFwiXCIpeyAvLyBpZiBlbXB0eSBuYW1lID0+IHVzZSBvcmlnaW5hbCBuYW1lIGZyb20gc2lnbmFsXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXJpZS5yZXNldE5hbWUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2VyaWUubmFtZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBTZXJpZU5vZGVcclxuICAgICAqIEBwYXJhbSB7KHN0cmluZ3x1bmRlZmluZWQpfSBuYW1lXHJcbiAgICAgKiBAcGFyYW0geyhCYXNlU2VyaWVzfHVuZGVmaW5lZCl9IFtzZXJpZT11bmRlZmluZWRdXHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVOb2RlXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZ3x1bmRlZmluZWQsIHNlcmllOiBCYXNlU2VyaWVzfHVuZGVmaW5lZCA9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgdGhpcy5fbmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5jYW5EZWxldGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2VyaWUgPSBzZXJpZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc3Bvc2UgdGhlIFNlcmllTm9kZVxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZU5vZGVcclxuICAgICAqL1xyXG4gICAgZGlzcG9zZSgpIHtcclxuICAgICAgICB0aGlzLmRpc3Bvc2VTZXJpZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzcG9zZSB0aGUgc2VyaWUgb2YgdGhpcyBvYmplY3RcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllTm9kZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRpc3Bvc2VTZXJpZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5zZXJpZSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubm9kZVR5cGUgPT0gTm9kZVR5cGUuY2FsY3VsYXRpb25PdXRwdXRQYXJhbSB8fCB0aGlzLm5vZGVUeXBlID09IE5vZGVUeXBlLnNlcmllcykge1xyXG4gICAgICAgICAgICAgICAgLy8gT25seSBkaXNwb3NlIHNlcmllIGlmIHRoaXMgbm9kZSBpcyB0aGUgb3JpZ2luYWwgc2VyaWVzIGFuZCBub3Qgb25seSBhIGxpbmsgdG8gYSBzZXJpZXMoY2FsY3VsYXRpb24gaW5wdXQgc2VyaWVzKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXJpZS5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDbG9uZXMgdGhlIGNhbGN1bGF0ZWQgc2VyaWVcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICogQG1lbWJlcm9mIENhbGN1bGF0ZWRTaWduYWxcclxuICAgICAqL1xyXG4gICAgY2xvbmUoKTogSVNlcmllTm9kZXtcclxuICAgICAgICBsZXQgc2VyaWVDbG9uZTtcclxuICAgICAgICBpZih0aGlzLnNlcmllICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHNlcmllQ2xvbmUgPSB0aGlzLnNlcmllLmNsb25lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFRPRE86IGNoZWNrIGNsb25lIChuYW1lIHVuZGVmaW5lZCBvciBmcm9tIGRhdGEpXHJcbiAgICAgICAgbGV0IGNsb25lZFNlcmllTm9kZSA9IG5ldyBTZXJpZU5vZGUodW5kZWZpbmVkLCBzZXJpZUNsb25lKTtcclxuICAgICAgICByZXR1cm4gY2xvbmVkU2VyaWVOb2RlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGF0YW1vZGVsIG9mIHRoaXMgbm9kZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsoSVNpZ25hbE1hbmFnZXJEYXRhTW9kZWx8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZU5vZGVcclxuICAgICAqL1xyXG4gICAgZ2V0RGF0YU1vZGVsKCk6IElTaWduYWxNYW5hZ2VyRGF0YU1vZGVsfHVuZGVmaW5lZHtcclxuICAgICAgICBsZXQgcGFyZW50OiBJU2VyaWVDb250YWluZXJ8dW5kZWZpbmVkID0gdGhpcy5wYXJlbnQ7XHJcbiAgICAgICAgbGV0IGxhc3RLbm93blBhcmVudCA9IHBhcmVudDtcclxuICAgICAgICBkb3tcclxuICAgICAgICAgICAgaWYocGFyZW50ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBsYXN0S25vd25QYXJlbnQgPSBwYXJlbnQ7XHJcbiAgICAgICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfXdoaWxlKHBhcmVudCAhPSB1bmRlZmluZWQpXHJcbiAgICAgICAgaWYobGFzdEtub3duUGFyZW50ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGlmKGxhc3RLbm93blBhcmVudCBpbnN0YW5jZW9mIFNpZ25hbFJvb3Qpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChsYXN0S25vd25QYXJlbnQgYXMgU2lnbmFsUm9vdCkuZGF0YU1vZGVsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBzZXJpZSBncm91cCB0byB3aGljaCB0aGlzIG5vZGUgYmVsb25nc1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHsoSVNlcmllR3JvdXB8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZU5vZGVcclxuICAgICAqL1xyXG4gICAgZ2V0U2VyaWVHcm91cCgpOklTZXJpZUdyb3VwfHVuZGVmaW5lZHtcclxuICAgICAgICBpZigoPGFueT50aGlzKS5pc1NlcmllR3JvdXAgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIHJldHVybiA8YW55PnRoaXMgYXMgSVNlcmllR3JvdXA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMucGFyZW50ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGlmKCg8YW55PnRoaXMucGFyZW50KS5pc1NlcmllR3JvdXAgPT0gdHJ1ZSApe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50IGFzIElTZXJpZUdyb3VwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnQhLmdldFNlcmllR3JvdXAoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSYWlzZXMgdGhlIGRhdGEgY2hhbmdlZCBldmVudFxyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBwYXJhbSB7Kn0gc2VuZGVyXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50U2lnbmFsTWFuYWdlckRhdGFDaGFuZ2VkQXJnc30gYXJnc1xyXG4gICAgICogQG1lbWJlcm9mIFNlcmllTm9kZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgb25EYXRhQ2hhbmdlZChzZW5kZXIsIGFyZ3M6IEV2ZW50U2lnbmFsTWFuYWdlckRhdGFDaGFuZ2VkQXJncykge1xyXG4gICAgICAgIHRoaXMuZXZlbnREYXRhQ2hhbmdlZC5yYWlzZShzZW5kZXIsIGFyZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmFpc2VzIHRoZSBzZXJpZSBkYXRhIGNhaG5nZWQgZXZlbnRcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcGFyYW0geyp9IHNlbmRlclxyXG4gICAgICogQHBhcmFtIHtFdmVudFNlcmllRGF0YUNoYW5nZWRBcmdzfSBhcmdzXHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVOb2RlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBvblNlcmllRGF0YUNoYW5nZWQoc2VuZGVyLCBhcmdzOiBFdmVudFNlcmllRGF0YUNoYW5nZWRBcmdzKSB7XHJcbiAgICAgICAgdGhpcy5ldmVudFNlcmllRGF0YUNoYW5nZWQucmFpc2Uoc2VuZGVyLCBhcmdzKTtcclxuICAgIH1cclxufVxyXG4iXX0=