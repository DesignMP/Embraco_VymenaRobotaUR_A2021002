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
define(["require", "exports", "../../signalManagerDataModel/eventSignalManagerDataChangedArgs", "./serieNode"], function (require, exports, eventSignalManagerDataChangedArgs_1, serieNode_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SerieContainer = /** @class */ (function (_super) {
        __extends(SerieContainer, _super);
        /**
         * Creates an instance of SerieContainer
         * @param {string} name
         * @param {string} [id=""]
         * @param {boolean} [expandState=true]
         * @memberof SerieContainer
         */
        function SerieContainer(name, id, expandState) {
            if (id === void 0) { id = ""; }
            if (expandState === void 0) { expandState = true; }
            var _this = _super.call(this, name, undefined) || this;
            _this._serieDataChangedHandler = function (sender, args) { return _this.onDataChanged(sender, args); };
            _this._serieContainerDataChangedHandler = function (sender, args) { return _this.onDataChanged(sender, args); };
            _this._name = name;
            _this.id = id;
            _this.expandState = expandState;
            _this.childs = new Array();
            // Removing of the container is possible by default
            _this.canDelete = true;
            return _this;
        }
        Object.defineProperty(SerieContainer.prototype, "visibleChilds", {
            get: function () {
                return this.childs;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SerieContainer.prototype, "parent", {
            get: function () {
                return this._parent;
            },
            set: function (value) {
                var _this = this;
                this._parent = value;
                // Also set parent to child containers
                this.childs.forEach(function (child) {
                    child.parent = _this;
                });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SerieContainer.prototype, "color", {
            get: function () {
                return undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SerieContainer.prototype, "name", {
            get: function () {
                if (this._name != undefined) {
                    return this._name;
                }
                else {
                    return "";
                }
            },
            set: function (value) {
                this._name = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SerieContainer.prototype, "nodeType", {
            get: function () {
                return serieNode_1.NodeType.container;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Dispose the SerieContainer
         *
         * @memberof SerieContainer
         */
        SerieContainer.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        /**
         * Removes all serieNodes and serieContainers from this container
         *
         * @memberof SerieContainer
         */
        SerieContainer.prototype.clear = function () {
            for (var i = 0; i < this.childs.length; i++) {
                var child = this.childs[i];
                if (child instanceof SerieContainer) {
                    // Remove all childs of this container
                    child.clear();
                    if (child.canDelete == true) {
                        // remove container if deletable
                        this.removeSerieContainer(child);
                        i--;
                    }
                }
                else {
                    this.removeSerieNode(child);
                    i--;
                }
            }
        };
        /**
         * Returns all childs of this container
         *
         * @returns {Array<ISerieNode>}
         * @memberof SerieContainer
         */
        SerieContainer.prototype.getChilds = function () {
            return this.childs;
        };
        /**
         * Clones this SerieContainer
         *
         * @returns {ISerieNode}
         * @memberof SerieContainer
         */
        SerieContainer.prototype.clone = function () {
            return new SerieContainer(this.name, this.id, this.expandState);
        };
        /**
         * Adds a serie node to this serie container
         *
         * @param {ISerieNode} serieNode
         * @param {number} [index=-1]
         * @memberof SerieContainer
         */
        SerieContainer.prototype.addSerieNode = function (serieNode, index) {
            if (index === void 0) { index = -1; }
            if (index == -1 || index >= this.childs.length) {
                this.childs.push(serieNode);
            }
            else {
                this.childs.splice(index, 0, serieNode);
            }
            serieNode.parent = this;
            serieNode.eventDataChanged.attach(this._serieDataChangedHandler);
            this.onDataChanged(this, new eventSignalManagerDataChangedArgs_1.EventSignalManagerDataChangedArgs(eventSignalManagerDataChangedArgs_1.SignalManagerAction.add, serieNode));
        };
        /**
         * Removes a serie node from this serie container
         *
         * @param {ISerieNode} serieNode
         * @memberof SerieContainer
         */
        SerieContainer.prototype.removeSerieNode = function (serieNode) {
            var index = this.childs.indexOf(serieNode, 0);
            if (index > -1) {
                serieNode.eventDataChanged.detach(this._serieDataChangedHandler);
                // Remove references to this serie node if available
                this.removeReferences(serieNode);
                this.onDataChanged(this, new eventSignalManagerDataChangedArgs_1.EventSignalManagerDataChangedArgs(eventSignalManagerDataChangedArgs_1.SignalManagerAction.remove, serieNode));
                serieNode.dispose();
                serieNode.parent = undefined;
                this.childs.splice(index, 1);
            }
            else {
                // serie not found => look in sub containers
                for (var i = 0; i < this.childs.length; i++) {
                    if (this.childs[i] instanceof SerieContainer) {
                        this.childs[i].removeSerieNode(serieNode);
                    }
                }
            }
        };
        SerieContainer.prototype.removeReferences = function (serieNode) {
            // serie node is no input data so remove all references to the serie in this serie node
            var serieGroup = serieNode.getSerieGroup();
            if (serieGroup != undefined) {
                serieGroup.removeReferencesToSerieNode(serieNode);
            }
        };
        /**
         * Returns the serieNode with the given seriename
         *
         * @param {string} serieName
         * @returns {(ISerieNode|undefined)}
         * @memberof SerieContainer
         */
        SerieContainer.prototype.getSerieNode = function (serieName) {
            var serieNodes = this.getSerieNodes();
            for (var i = 0; i < serieNodes.length; i++) {
                var nodeName = serieNodes[i].name;
                var serie = serieNodes[i].serie;
                if (serie != undefined) {
                    nodeName = serie.name;
                }
                if (nodeName == serieName) {
                    return serieNodes[i];
                }
            }
            return undefined;
        };
        /**
         * Returns all series nodes within the container or sub container
         *
         * @param {string} [serieName=""]
         * @returns {Array<ISerieNode>}
         * @memberof SerieContainer
         */
        SerieContainer.prototype.getSerieNodes = function (serieName) {
            if (serieName === void 0) { serieName = ""; }
            var serieNodes = new Array();
            for (var i = 0; i < this.childs.length; i++) {
                var child = this.childs[i];
                if (child.serie != undefined) {
                    if (serieName == "" || child.serie.name == serieName) {
                        serieNodes.push(child);
                    }
                }
                else if (child instanceof SerieContainer) {
                    serieNodes = serieNodes.concat(child.getSerieNodes(serieName));
                }
            }
            return serieNodes;
        };
        /**
         * Returns all series within the container or sub container
         *
         * @returns {Array<BaseSeries>}
         * @memberof SerieContainer
         */
        SerieContainer.prototype.getSeries = function () {
            var serieNodes = this.getSerieNodes();
            var series = new Array();
            for (var i = 0; i < serieNodes.length; i++) {
                var serie = serieNodes[i].serie;
                if (serie != undefined) {
                    series.push(serie);
                }
            }
            return series;
        };
        /**
         * Adds a serie container to this serie container
         *
         * @param {ISerieContainer} serieContainer
         * @param {number} [index=-1]  -1 to add at the end, else the index where to add
         * @memberof SerieContainer
         */
        SerieContainer.prototype.addSerieContainer = function (serieContainer, index) {
            if (index === void 0) { index = -1; }
            if (index == -1 || index >= this.childs.length) {
                this.childs.push(serieContainer);
            }
            else {
                this.childs.splice(index, 0, serieContainer);
            }
            serieContainer.parent = this;
            serieContainer.eventDataChanged.attach(this._serieContainerDataChangedHandler);
            this.onDataChanged(this, new eventSignalManagerDataChangedArgs_1.EventSignalManagerDataChangedArgs(eventSignalManagerDataChangedArgs_1.SignalManagerAction.add, serieContainer));
        };
        /**
          * Removes a serie container from this container
          *
          * @param {ISerieContainer} serieContainer
          * @memberof SerieContainer
          */
        SerieContainer.prototype.removeSerieContainer = function (serieContainer) {
            var index = this.childs.indexOf(serieContainer, 0);
            if (index > -1) {
                serieContainer.eventDataChanged.detach(this._serieContainerDataChangedHandler);
                this.childs.splice(index, 1);
                this.onDataChanged(this, new eventSignalManagerDataChangedArgs_1.EventSignalManagerDataChangedArgs(eventSignalManagerDataChangedArgs_1.SignalManagerAction.remove, serieContainer));
            }
            else {
                // container not found => look in sub containers
                for (var i = 0; i < this.childs.length; i++) {
                    if (this.childs[i] instanceof SerieContainer) {
                        this.childs[i].removeSerieContainer(serieContainer);
                    }
                }
            }
        };
        /**
         * Returns the serie container with the given id if found, else undefined
         *
         * @param {string} serieContainerName
         * @returns {(ISerieContainer|undefined)}
         * @memberof SerieContainer
         */
        SerieContainer.prototype.getSerieContainer = function (serieContainerName) {
            // TODO: change this method and use getSerieContainerById
            for (var i = 0; i < this.childs.length; i++) {
                var node = this.childs[i];
                if (node instanceof SerieContainer) {
                    if (node.name == serieContainerName) {
                        return node;
                    }
                    var serieContainer = node.getSerieContainer(serieContainerName);
                    if (serieContainer != undefined) {
                        return serieContainer;
                    }
                }
            }
            return undefined;
        };
        /**
     * Returns the serie container with the given id if found, else undefined
     *
     * @param {string} serieContainerId
     * @returns {(ISerieContainer|undefined)}
     * @memberof SerieContainer
     */
        SerieContainer.prototype.getSerieContainerById = function (serieContainerId) {
            for (var i = 0; i < this.childs.length; i++) {
                var node = this.childs[i];
                if (node instanceof SerieContainer) {
                    if (node.id == serieContainerId) {
                        return node;
                    }
                    var serieContainer = node.getSerieContainerById(serieContainerId);
                    if (serieContainer != undefined) {
                        return serieContainer;
                    }
                }
            }
            return undefined;
        };
        return SerieContainer;
    }(serieNode_1.SerieNode));
    exports.SerieContainer = SerieContainer;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWVDb250YWluZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9jb21tb24vc2lnbmFsL3NlcmllQ29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFPQTtRQUFvQyxrQ0FBUztRQStDekM7Ozs7OztXQU1HO1FBQ0gsd0JBQVksSUFBWSxFQUFFLEVBQWMsRUFBRSxXQUEyQjtZQUEzQyxtQkFBQSxFQUFBLE9BQWM7WUFBRSw0QkFBQSxFQUFBLGtCQUEyQjtZQUFyRSxZQUNJLGtCQUFNLElBQUksRUFBRSxTQUFTLENBQUMsU0FPekI7WUF6RE8sOEJBQXdCLEdBQUcsVUFBQyxNQUFNLEVBQUUsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQWhDLENBQWdDLENBQUM7WUFDOUUsdUNBQWlDLEdBQUcsVUFBQyxNQUFNLEVBQUUsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQWhDLENBQWdDLENBQUM7WUFrRDNGLEtBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLEtBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1lBQ2IsS0FBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7WUFDL0IsS0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLEtBQUssRUFBYyxDQUFDO1lBQ3RDLG1EQUFtRDtZQUNuRCxLQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQzs7UUFDMUIsQ0FBQztRQXRERCxzQkFBVyx5Q0FBYTtpQkFBeEI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ3ZCLENBQUM7OztXQUFBO1FBS0Qsc0JBQVcsa0NBQU07aUJBQWpCO2dCQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUN4QixDQUFDO2lC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QyxxQkFBUyxHQXdVNUM7SUF4VVksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJU2VyaWVDb250YWluZXIgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9zZXJpZUNvbnRhaW5lckludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJU2VyaWVOb2RlIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvc2VyaWVOb2RlSW50ZXJmYWNlXCI7XHJcblxyXG5pbXBvcnQgeyBFdmVudFNpZ25hbE1hbmFnZXJEYXRhQ2hhbmdlZEFyZ3MsIFNpZ25hbE1hbmFnZXJBY3Rpb24gfSBmcm9tIFwiLi4vLi4vc2lnbmFsTWFuYWdlckRhdGFNb2RlbC9ldmVudFNpZ25hbE1hbmFnZXJEYXRhQ2hhbmdlZEFyZ3NcIjtcclxuaW1wb3J0IHsgU2VyaWVOb2RlLCBOb2RlVHlwZSB9IGZyb20gXCIuL3NlcmllTm9kZVwiO1xyXG5pbXBvcnQgeyBCYXNlU2VyaWVzIH0gZnJvbSBcIi4uLy4uL2NoYXJ0TWFuYWdlckRhdGFNb2RlbC9iYXNlU2VyaWVzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU2VyaWVDb250YWluZXIgZXh0ZW5kcyBTZXJpZU5vZGUgaW1wbGVtZW50cyBJU2VyaWVDb250YWluZXJ7XHJcbiAgICBcclxuICAgIGRhdGE6IGFueTtcclxuICAgIHByb3RlY3RlZCBjaGlsZHM6IElTZXJpZU5vZGVbXTtcclxuXHJcbiAgICBwcml2YXRlIF9zZXJpZURhdGFDaGFuZ2VkSGFuZGxlciA9IChzZW5kZXIsIGFyZ3MpID0+IHRoaXMub25EYXRhQ2hhbmdlZChzZW5kZXIsIGFyZ3MpO1xyXG4gICAgcHJpdmF0ZSBfc2VyaWVDb250YWluZXJEYXRhQ2hhbmdlZEhhbmRsZXIgPSAoc2VuZGVyLCBhcmdzKSA9PiB0aGlzLm9uRGF0YUNoYW5nZWQoc2VuZGVyLCBhcmdzKTtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IHZpc2libGVDaGlsZHMoKTogSVNlcmllTm9kZVtdfHVuZGVmaW5lZCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hpbGRzO1xyXG4gICAgfVxyXG5cclxuICAgIGlkOiBzdHJpbmc7XHJcbiAgICBleHBhbmRTdGF0ZTogYm9vbGVhbjtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IHBhcmVudCgpOiBJU2VyaWVDb250YWluZXIgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJlbnQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IHBhcmVudCh2YWx1ZTogSVNlcmllQ29udGFpbmVyIHwgdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5fcGFyZW50ID0gdmFsdWU7XHJcbiAgICAgICAgLy8gQWxzbyBzZXQgcGFyZW50IHRvIGNoaWxkIGNvbnRhaW5lcnNcclxuICAgICAgICB0aGlzLmNoaWxkcy5mb3JFYWNoKChjaGlsZCk9PntcclxuICAgICAgICAgICAgY2hpbGQucGFyZW50ID0gdGhpcztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvbG9yKCk6IHN0cmluZ3x1bmRlZmluZWQge1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICAgICAgXHJcbiAgICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICBpZih0aGlzLl9uYW1lICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBzZXQgbmFtZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fbmFtZSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgbm9kZVR5cGUoKTogTm9kZVR5cGV7XHJcbiAgICAgICAgcmV0dXJuIE5vZGVUeXBlLmNvbnRhaW5lcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgU2VyaWVDb250YWluZXJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW2lkPVwiXCJdXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtleHBhbmRTdGF0ZT10cnVlXVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllQ29udGFpbmVyXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgaWQ6c3RyaW5nID0gXCJcIiwgZXhwYW5kU3RhdGU6IGJvb2xlYW4gPSB0cnVlKXtcclxuICAgICAgICBzdXBlcihuYW1lLCB1bmRlZmluZWQpO1xyXG4gICAgICAgIHRoaXMuX25hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgICAgICB0aGlzLmV4cGFuZFN0YXRlID0gZXhwYW5kU3RhdGU7XHJcbiAgICAgICAgdGhpcy5jaGlsZHMgPSBuZXcgQXJyYXk8SVNlcmllTm9kZT4oKTtcclxuICAgICAgICAvLyBSZW1vdmluZyBvZiB0aGUgY29udGFpbmVyIGlzIHBvc3NpYmxlIGJ5IGRlZmF1bHRcclxuICAgICAgICB0aGlzLmNhbkRlbGV0ZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNwb3NlIHRoZSBTZXJpZUNvbnRhaW5lclxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZUNvbnRhaW5lclxyXG4gICAgICovXHJcbiAgICBkaXNwb3NlKCl7XHJcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyBhbGwgc2VyaWVOb2RlcyBhbmQgc2VyaWVDb250YWluZXJzIGZyb20gdGhpcyBjb250YWluZXJcclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVDb250YWluZXJcclxuICAgICAqL1xyXG4gICAgY2xlYXIoKXtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyAgaSA8IHRoaXMuY2hpbGRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5jaGlsZHNbaV07XHJcbiAgICAgICAgICAgIGlmKGNoaWxkIGluc3RhbmNlb2YgU2VyaWVDb250YWluZXIpe1xyXG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIGFsbCBjaGlsZHMgb2YgdGhpcyBjb250YWluZXJcclxuICAgICAgICAgICAgICAgIGNoaWxkLmNsZWFyKCk7XHJcbiAgICAgICAgICAgICAgICBpZihjaGlsZC5jYW5EZWxldGUgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGNvbnRhaW5lciBpZiBkZWxldGFibGVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVNlcmllQ29udGFpbmVyKGNoaWxkKTtcclxuICAgICAgICAgICAgICAgICAgICBpLS07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlU2VyaWVOb2RlKGNoaWxkKTtcclxuICAgICAgICAgICAgICAgIGktLTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYWxsIGNoaWxkcyBvZiB0aGlzIGNvbnRhaW5lclxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxJU2VyaWVOb2RlPn1cclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZUNvbnRhaW5lclxyXG4gICAgICovXHJcbiAgICBnZXRDaGlsZHMoKTogQXJyYXk8SVNlcmllTm9kZT57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hpbGRzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2xvbmVzIHRoaXMgU2VyaWVDb250YWluZXJcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7SVNlcmllTm9kZX1cclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZUNvbnRhaW5lclxyXG4gICAgICovXHJcbiAgICBjbG9uZSgpOiBJU2VyaWVOb2RlIHtcclxuICAgICAgICByZXR1cm4gbmV3IFNlcmllQ29udGFpbmVyKHRoaXMubmFtZSwgdGhpcy5pZCwgdGhpcy5leHBhbmRTdGF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgc2VyaWUgbm9kZSB0byB0aGlzIHNlcmllIGNvbnRhaW5lclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SVNlcmllTm9kZX0gc2VyaWVOb2RlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW2luZGV4PS0xXVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllQ29udGFpbmVyXHJcbiAgICAgKi9cclxuICAgIGFkZFNlcmllTm9kZShzZXJpZU5vZGU6IElTZXJpZU5vZGUsIGluZGV4OiBudW1iZXIgPS0xKXtcclxuICAgICAgICBpZihpbmRleCA9PSAtMSB8fCBpbmRleCA+PSB0aGlzLmNoaWxkcy5sZW5ndGgpe1xyXG4gICAgICAgICAgICB0aGlzLmNoaWxkcy5wdXNoKHNlcmllTm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuY2hpbGRzLnNwbGljZShpbmRleCwgMCwgc2VyaWVOb2RlKVxyXG4gICAgICAgIH1cclxuICAgICAgICBzZXJpZU5vZGUucGFyZW50ID0gdGhpcztcclxuICAgICAgICBzZXJpZU5vZGUuZXZlbnREYXRhQ2hhbmdlZC5hdHRhY2godGhpcy5fc2VyaWVEYXRhQ2hhbmdlZEhhbmRsZXIpO1xyXG4gICAgICAgIHRoaXMub25EYXRhQ2hhbmdlZCh0aGlzLCBuZXcgRXZlbnRTaWduYWxNYW5hZ2VyRGF0YUNoYW5nZWRBcmdzKFNpZ25hbE1hbmFnZXJBY3Rpb24uYWRkLCBzZXJpZU5vZGUpKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIGEgc2VyaWUgbm9kZSBmcm9tIHRoaXMgc2VyaWUgY29udGFpbmVyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJU2VyaWVOb2RlfSBzZXJpZU5vZGVcclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZUNvbnRhaW5lclxyXG4gICAgICovXHJcbiAgICByZW1vdmVTZXJpZU5vZGUoc2VyaWVOb2RlOiBJU2VyaWVOb2RlKXtcclxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuY2hpbGRzLmluZGV4T2Yoc2VyaWVOb2RlLCAwKTtcclxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICBzZXJpZU5vZGUuZXZlbnREYXRhQ2hhbmdlZC5kZXRhY2godGhpcy5fc2VyaWVEYXRhQ2hhbmdlZEhhbmRsZXIpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gUmVtb3ZlIHJlZmVyZW5jZXMgdG8gdGhpcyBzZXJpZSBub2RlIGlmIGF2YWlsYWJsZVxyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZVJlZmVyZW5jZXMoc2VyaWVOb2RlKTtcclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLm9uRGF0YUNoYW5nZWQodGhpcywgbmV3IEV2ZW50U2lnbmFsTWFuYWdlckRhdGFDaGFuZ2VkQXJncyhTaWduYWxNYW5hZ2VyQWN0aW9uLnJlbW92ZSwgc2VyaWVOb2RlKSk7XHJcbiAgICAgICAgICAgIHNlcmllTm9kZS5kaXNwb3NlKCk7XHJcblxyXG4gICAgICAgICAgICBzZXJpZU5vZGUucGFyZW50ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB0aGlzLmNoaWxkcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgLy8gc2VyaWUgbm90IGZvdW5kID0+IGxvb2sgaW4gc3ViIGNvbnRhaW5lcnNcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGkgPCB0aGlzLmNoaWxkcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmNoaWxkc1tpXSBpbnN0YW5jZW9mIFNlcmllQ29udGFpbmVyKXtcclxuICAgICAgICAgICAgICAgICAgICAodGhpcy5jaGlsZHNbaV0gYXMgSVNlcmllQ29udGFpbmVyKS5yZW1vdmVTZXJpZU5vZGUoc2VyaWVOb2RlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlbW92ZVJlZmVyZW5jZXMoc2VyaWVOb2RlOiBJU2VyaWVOb2RlKXtcclxuICAgICAgICAvLyBzZXJpZSBub2RlIGlzIG5vIGlucHV0IGRhdGEgc28gcmVtb3ZlIGFsbCByZWZlcmVuY2VzIHRvIHRoZSBzZXJpZSBpbiB0aGlzIHNlcmllIG5vZGVcclxuICAgICAgICBsZXQgc2VyaWVHcm91cCA9IHNlcmllTm9kZS5nZXRTZXJpZUdyb3VwKCk7ICAgICAgICAgICAgXHJcbiAgICAgICAgaWYoc2VyaWVHcm91cCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBzZXJpZUdyb3VwLnJlbW92ZVJlZmVyZW5jZXNUb1NlcmllTm9kZShzZXJpZU5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBzZXJpZU5vZGUgd2l0aCB0aGUgZ2l2ZW4gc2VyaWVuYW1lXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlcmllTmFtZVxyXG4gICAgICogQHJldHVybnMgeyhJU2VyaWVOb2RlfHVuZGVmaW5lZCl9XHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVDb250YWluZXJcclxuICAgICAqL1xyXG4gICAgZ2V0U2VyaWVOb2RlKHNlcmllTmFtZTogc3RyaW5nKTogSVNlcmllTm9kZXx1bmRlZmluZWR7XHJcbiAgICAgICAgbGV0IHNlcmllTm9kZXMgPSB0aGlzLmdldFNlcmllTm9kZXMoKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaSA8IHNlcmllTm9kZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgbm9kZU5hbWUgPSBzZXJpZU5vZGVzW2ldLm5hbWU7XHJcbiAgICAgICAgICAgIGxldCBzZXJpZSA9IHNlcmllTm9kZXNbaV0uc2VyaWU7XHJcbiAgICAgICAgICAgIGlmKHNlcmllICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBub2RlTmFtZSA9IHNlcmllLm5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYobm9kZU5hbWUgPT0gc2VyaWVOYW1lKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzZXJpZU5vZGVzW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGFsbCBzZXJpZXMgbm9kZXMgd2l0aGluIHRoZSBjb250YWluZXIgb3Igc3ViIGNvbnRhaW5lclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbc2VyaWVOYW1lPVwiXCJdXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8SVNlcmllTm9kZT59XHJcbiAgICAgKiBAbWVtYmVyb2YgU2VyaWVDb250YWluZXJcclxuICAgICAqL1xyXG4gICAgZ2V0U2VyaWVOb2RlcyhzZXJpZU5hbWU6IHN0cmluZyA9IFwiXCIpOiBBcnJheTxJU2VyaWVOb2RlPntcclxuICAgICAgICBsZXQgc2VyaWVOb2RlcyA9IG5ldyBBcnJheTxJU2VyaWVOb2RlPigpO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpIDwgdGhpcy5jaGlsZHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkc1tpXTtcclxuICAgICAgICAgICAgaWYoY2hpbGQuc2VyaWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGlmKHNlcmllTmFtZSA9PSBcIlwiIHx8IGNoaWxkLnNlcmllIS5uYW1lID09IHNlcmllTmFtZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VyaWVOb2Rlcy5wdXNoKGNoaWxkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKGNoaWxkIGluc3RhbmNlb2YgU2VyaWVDb250YWluZXIpe1xyXG4gICAgICAgICAgICAgICAgc2VyaWVOb2RlcyA9IHNlcmllTm9kZXMuY29uY2F0KGNoaWxkLmdldFNlcmllTm9kZXMoc2VyaWVOYW1lKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNlcmllTm9kZXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGFsbCBzZXJpZXMgd2l0aGluIHRoZSBjb250YWluZXIgb3Igc3ViIGNvbnRhaW5lclxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtBcnJheTxCYXNlU2VyaWVzPn1cclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZUNvbnRhaW5lclxyXG4gICAgICovXHJcbiAgICBnZXRTZXJpZXMoKTogQXJyYXk8QmFzZVNlcmllcz57XHJcbiAgICAgICAgbGV0IHNlcmllTm9kZXMgPSB0aGlzLmdldFNlcmllTm9kZXMoKTtcclxuICAgICAgICBsZXQgc2VyaWVzID0gbmV3IEFycmF5PEJhc2VTZXJpZXM+KCk7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGkgPCBzZXJpZU5vZGVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IHNlcmllID0gc2VyaWVOb2Rlc1tpXS5zZXJpZTtcclxuICAgICAgICAgICAgaWYoc2VyaWUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIHNlcmllcy5wdXNoKHNlcmllKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZXJpZXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgc2VyaWUgY29udGFpbmVyIHRvIHRoaXMgc2VyaWUgY29udGFpbmVyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJU2VyaWVDb250YWluZXJ9IHNlcmllQ29udGFpbmVyXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW2luZGV4PS0xXSAgLTEgdG8gYWRkIGF0IHRoZSBlbmQsIGVsc2UgdGhlIGluZGV4IHdoZXJlIHRvIGFkZFxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllQ29udGFpbmVyXHJcbiAgICAgKi9cclxuICAgIGFkZFNlcmllQ29udGFpbmVyKHNlcmllQ29udGFpbmVyOiBJU2VyaWVDb250YWluZXIsIGluZGV4OiBudW1iZXIgPS0xKXtcclxuICAgICAgICBpZihpbmRleCA9PSAtMSB8fCBpbmRleCA+PSB0aGlzLmNoaWxkcy5sZW5ndGgpe1xyXG4gICAgICAgICAgICB0aGlzLmNoaWxkcy5wdXNoKHNlcmllQ29udGFpbmVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5jaGlsZHMuc3BsaWNlKGluZGV4LCAwLCBzZXJpZUNvbnRhaW5lcilcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VyaWVDb250YWluZXIucGFyZW50ID0gdGhpcztcclxuICAgICAgICBzZXJpZUNvbnRhaW5lci5ldmVudERhdGFDaGFuZ2VkLmF0dGFjaCh0aGlzLl9zZXJpZUNvbnRhaW5lckRhdGFDaGFuZ2VkSGFuZGxlcik7XHJcbiAgICAgICAgdGhpcy5vbkRhdGFDaGFuZ2VkKHRoaXMsIG5ldyBFdmVudFNpZ25hbE1hbmFnZXJEYXRhQ2hhbmdlZEFyZ3MoU2lnbmFsTWFuYWdlckFjdGlvbi5hZGQsIHNlcmllQ29udGFpbmVyKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICogUmVtb3ZlcyBhIHNlcmllIGNvbnRhaW5lciBmcm9tIHRoaXMgY29udGFpbmVyXHJcbiAgICAgICpcclxuICAgICAgKiBAcGFyYW0ge0lTZXJpZUNvbnRhaW5lcn0gc2VyaWVDb250YWluZXJcclxuICAgICAgKiBAbWVtYmVyb2YgU2VyaWVDb250YWluZXJcclxuICAgICAgKi9cclxuICAgICByZW1vdmVTZXJpZUNvbnRhaW5lcihzZXJpZUNvbnRhaW5lcjogSVNlcmllQ29udGFpbmVyKXtcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuY2hpbGRzLmluZGV4T2Yoc2VyaWVDb250YWluZXIsIDApO1xyXG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgIHNlcmllQ29udGFpbmVyLmV2ZW50RGF0YUNoYW5nZWQuZGV0YWNoKHRoaXMuX3NlcmllQ29udGFpbmVyRGF0YUNoYW5nZWRIYW5kbGVyKTtcclxuICAgICAgICAgICAgdGhpcy5jaGlsZHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgdGhpcy5vbkRhdGFDaGFuZ2VkKHRoaXMsIG5ldyBFdmVudFNpZ25hbE1hbmFnZXJEYXRhQ2hhbmdlZEFyZ3MoU2lnbmFsTWFuYWdlckFjdGlvbi5yZW1vdmUsIHNlcmllQ29udGFpbmVyKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIC8vIGNvbnRhaW5lciBub3QgZm91bmQgPT4gbG9vayBpbiBzdWIgY29udGFpbmVyc1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaSA8IHRoaXMuY2hpbGRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuY2hpbGRzW2ldIGluc3RhbmNlb2YgU2VyaWVDb250YWluZXIpe1xyXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLmNoaWxkc1tpXSBhcyBJU2VyaWVDb250YWluZXIpLnJlbW92ZVNlcmllQ29udGFpbmVyKHNlcmllQ29udGFpbmVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHNlcmllIGNvbnRhaW5lciB3aXRoIHRoZSBnaXZlbiBpZCBpZiBmb3VuZCwgZWxzZSB1bmRlZmluZWRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VyaWVDb250YWluZXJOYW1lXHJcbiAgICAgKiBAcmV0dXJucyB7KElTZXJpZUNvbnRhaW5lcnx1bmRlZmluZWQpfVxyXG4gICAgICogQG1lbWJlcm9mIFNlcmllQ29udGFpbmVyXHJcbiAgICAgKi9cclxuICAgIGdldFNlcmllQ29udGFpbmVyKHNlcmllQ29udGFpbmVyTmFtZTogc3RyaW5nKTogSVNlcmllQ29udGFpbmVyfHVuZGVmaW5lZHtcclxuICAgICAgICAvLyBUT0RPOiBjaGFuZ2UgdGhpcyBtZXRob2QgYW5kIHVzZSBnZXRTZXJpZUNvbnRhaW5lckJ5SWRcclxuICAgICAgICBmb3IobGV0IGk9MDsgaSA8IHRoaXMuY2hpbGRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IG5vZGU6IGFueSA9IHRoaXMuY2hpbGRzW2ldO1xyXG4gICAgICAgICAgICBpZihub2RlIGluc3RhbmNlb2YgU2VyaWVDb250YWluZXIpe1xyXG4gICAgICAgICAgICAgICAgaWYobm9kZS5uYW1lID09IHNlcmllQ29udGFpbmVyTmFtZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgc2VyaWVDb250YWluZXIgPSBub2RlLmdldFNlcmllQ29udGFpbmVyKHNlcmllQ29udGFpbmVyTmFtZSk7XHJcbiAgICAgICAgICAgICAgICBpZihzZXJpZUNvbnRhaW5lciAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZXJpZUNvbnRhaW5lcjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHNlcmllIGNvbnRhaW5lciB3aXRoIHRoZSBnaXZlbiBpZCBpZiBmb3VuZCwgZWxzZSB1bmRlZmluZWRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VyaWVDb250YWluZXJJZFxyXG4gICAgICogQHJldHVybnMgeyhJU2VyaWVDb250YWluZXJ8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBTZXJpZUNvbnRhaW5lclxyXG4gICAgICovXHJcbiAgICBnZXRTZXJpZUNvbnRhaW5lckJ5SWQoc2VyaWVDb250YWluZXJJZDogc3RyaW5nKTogSVNlcmllQ29udGFpbmVyfHVuZGVmaW5lZHtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaSA8IHRoaXMuY2hpbGRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IG5vZGU6IGFueSA9IHRoaXMuY2hpbGRzW2ldO1xyXG4gICAgICAgICAgICBpZihub2RlIGluc3RhbmNlb2YgU2VyaWVDb250YWluZXIpe1xyXG4gICAgICAgICAgICAgICAgaWYobm9kZS5pZCA9PSBzZXJpZUNvbnRhaW5lcklkKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBzZXJpZUNvbnRhaW5lciA9IG5vZGUuZ2V0U2VyaWVDb250YWluZXJCeUlkKHNlcmllQ29udGFpbmVySWQpO1xyXG4gICAgICAgICAgICAgICAgaWYoc2VyaWVDb250YWluZXIgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VyaWVDb250YWluZXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxufSAiXX0=