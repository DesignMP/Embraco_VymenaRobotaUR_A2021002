var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "./opcUaRestServices"], function (require, exports, opcUaRestServices_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Declares supported rest service types
     *
     * @enum {number}
     */
    var RestServiceType;
    (function (RestServiceType) {
        RestServiceType["POST"] = "POST";
        RestServiceType["DELETE"] = "DELETE";
        RestServiceType["GET"] = "GET";
        RestServiceType["PUT"] = "PUT";
        RestServiceType["PATCH"] = "PATCH";
        RestServiceType["Undefined"] = "";
    })(RestServiceType || (RestServiceType = {}));
    exports.RestServiceType = RestServiceType;
    var RestServiceMode;
    (function (RestServiceMode) {
        RestServiceMode[RestServiceMode["EXECUTE"] = 0] = "EXECUTE";
        RestServiceMode[RestServiceMode["BATCH"] = 1] = "BATCH";
    })(RestServiceMode || (RestServiceMode = {}));
    exports.RestServiceMode = RestServiceMode;
    /**
     * Provides a single batch request info
     *
     * @class BatchRequestInfo
     */
    var BatchRequestInfo = /** @class */ (function () {
        /**
         * Constructs an instance of BatchRequestInfo.
         * @param {number} id
         * @param {(string|undefined)} method
         * @param {string} url
         * @param {string} body
         * @memberof BatchRequestInfo
         */
        function BatchRequestInfo(id, method, url, body) {
            this._id = id;
            this._method = method;
            this._url = url;
            this._body = body;
        }
        Object.defineProperty(BatchRequestInfo.prototype, "id", {
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BatchRequestInfo.prototype, "method", {
            get: function () {
                return this._method;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BatchRequestInfo.prototype, "body", {
            get: function () {
                return this._body;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BatchRequestInfo.prototype, "url", {
            get: function () {
                return this._url;
            },
            enumerable: true,
            configurable: true
        });
        /**
     * Creates an instance of BatchRequestInfo.
     * @param {number} id
    * @param {(string|undefined)} method
     * @param {string} url
     * @param {string} body
     * @memberof BatchRequestInfo
     */
        BatchRequestInfo.create = function (id, method, url, body) {
            // create the single batch object
            var singleBatchRequest = {
                id: id,
                method: method,
                url: url,
            };
            // add body data if defined
            if (body) {
                singleBatchRequest.body = body;
                singleBatchRequest.headers = { "Content-Type": "application/json" };
            }
            return singleBatchRequest;
        };
        return BatchRequestInfo;
    }());
    /**
     * Provides rest request info
     *
     * @class RestRequest
     */
    var RestRequestInfo = /** @class */ (function () {
        /**
         * Creates an instance of RestRequest.
         * @param {JQuery.AjaxSettings<any>} settings
         * @memberof RestRequest
         */
        function RestRequestInfo(settings) {
            this._settings = {};
            this._settings = settings;
        }
        Object.defineProperty(RestRequestInfo.prototype, "settings", {
            /**
             * Gets the rest request settings
             *
             * @readonly
             * @type {JQuery.AjaxSettings<any>}
             * @memberof RestRequest
             */
            get: function () {
                return this._settings;
            },
            enumerable: true,
            configurable: true
        });
        return RestRequestInfo;
    }());
    exports.RestRequestInfo = RestRequestInfo;
    /**
     * Implements a basic rest service call
     *
     * @class RestService
     */
    var RestService = /** @class */ (function () {
        function RestService() {
        }
        RestService.call = function (serviceType, serviceUrl, serviceData, serviceHeaders) {
            if (serviceData === void 0) { serviceData = null; }
            if (serviceHeaders === void 0) { serviceHeaders = null; }
            return __awaiter(this, void 0, void 0, function () {
                var restRequest, restServicePromise;
                return __generator(this, function (_a) {
                    restRequest = RestService.createRequest(serviceType, serviceUrl, serviceData, serviceHeaders);
                    restServicePromise = RestService.createRestRequestPromise(restRequest);
                    // attach the request info to the promise
                    restServicePromise.restRequestInfo = restRequest;
                    // return just the request info or wait for executing the requuest
                    return [2 /*return*/, restServicePromise];
                });
            });
        };
        /**
         * calls a batch request
         *
         * @static
         * @template T
         * @param {JQuery.AjaxSettings<any>[]} restRequests
         * @memberof RestService
         */
        RestService.callBatchRequest = function (batchServiceBaseUrl, serviceRequests) {
            return __awaiter(this, void 0, void 0, function () {
                var batchRequests, batchRequest, restBatchServicePromise;
                return __generator(this, function (_a) {
                    batchRequests = { requests: RestService.createBatchRequestsData(serviceRequests, batchServiceBaseUrl) };
                    batchRequest = RestService.createRequest(RestServiceType.POST, batchServiceBaseUrl + '/$batch', batchRequests);
                    restBatchServicePromise = RestService.createRestRequestPromise(batchRequest);
                    // return just the request info or wait for executing the requuest
                    return [2 /*return*/, restBatchServicePromise];
                });
            });
        };
        /**
         * Creates and initializes the batch requests from the original single requests
         *
         * @private
         * @static
         * @param {RestRequestInfo[]} serviceRequests
         * @param {string} batchServiceBaseUrl
         * @returns
         * @memberof RestService
         */
        RestService.createBatchRequestsData = function (serviceRequests, batchServiceBaseUrl) {
            var batchRequests = [];
            for (var i = 0; i < serviceRequests.length; i++) {
                var serviceRequest = serviceRequests[i];
                if (serviceRequest.settings.url) {
                    var singleRequestUrl = serviceRequest.settings.url.replace(batchServiceBaseUrl, "");
                    var requestData = serviceRequest.settings.data ? JSON.parse(serviceRequest.settings.data) : undefined;
                    batchRequests.push(BatchRequestInfo.create(i, serviceRequest.settings.type, singleRequestUrl, requestData));
                }
            }
            return batchRequests;
        };
        /**
         * Creates a promise enclosing the rest request
         *
         * @private
         * @static
         * @param {RestRequestInfo} restRequest
         * @returns
         * @memberof RestService
         */
        RestService.createRestRequestPromise = function (restRequest) {
            return new Promise(function (resolve, reject) {
                if (opcUaRestServices_1.OpcUaRestServices.mode == RestServiceMode.EXECUTE) {
                    // execute the rest service
                    // attach the callback functions to the promise callbacks
                    restRequest.settings.success = resolve;
                    restRequest.settings.error = reject;
                    // execute rest request
                    $.ajax(restRequest.settings);
                }
                else if (opcUaRestServices_1.OpcUaRestServices.mode == RestServiceMode.BATCH) {
                    // in batch mode rest request info is returned as result. This allows accumulating multiple requests to be executed within a batch request call.
                    resolve(restRequest);
                }
            });
        };
        /**
         * Creates the basic ajax request info
         *
         * @private
         * @static
         * @param {RestServiceType} serviceType
         * @param {string} serviceUrl
         * @param {(value?: any) => void} resolve
         * @param {(reason?: any) => void} reject
         * @returns {(JQuery.AjaxSettings<any> | undefined)}
         * @memberof RestService
         */
        RestService.createRequest = function (serviceType, serviceUrl, serviceData, serviceHeaders) {
            if (serviceData === void 0) { serviceData = null; }
            if (serviceHeaders === void 0) { serviceHeaders = null; }
            // create and initialize the service request object
            var restRequest = {
                type: serviceType,
                url: serviceUrl,
                xhrFields: {
                    withCredentials: true
                },
                dataType: 'json',
                contentType: 'application/json',
            };
            // set request data if defined
            if (serviceData) {
                restRequest.data = JSON.stringify(serviceData);
            }
            // set headers if defined
            if (serviceHeaders) {
                restRequest.headers = serviceHeaders;
            }
            return new RestRequestInfo(restRequest);
        };
        return RestService;
    }());
    exports.RestService = RestService;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdFNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2NvbW11bmljYXRpb24vcmVzdC9yZXN0U2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFQTs7OztPQUlHO0lBQ0gsSUFBSyxlQU9KO0lBUEQsV0FBSyxlQUFlO1FBQ2hCLGdDQUFhLENBQUE7UUFDYixvQ0FBaUIsQ0FBQTtRQUNqQiw4QkFBVyxDQUFBO1FBQ1gsOEJBQVcsQ0FBQTtRQUNYLGtDQUFlLENBQUE7UUFDZixpQ0FBYyxDQUFBO0lBQ2xCLENBQUMsRUFQSSxlQUFlLEtBQWYsZUFBZSxRQU9uQjtJQXVRb0IsMENBQWU7SUFwUXBDLElBQUssZUFHSjtJQUhELFdBQUssZUFBZTtRQUNoQiwyREFBTyxDQUFBO1FBQ1AsdURBQUssQ0FBQTtJQUNULENBQUMsRUFISSxlQUFlLEtBQWYsZUFBZSxRQUduQjtJQWlRcUMsMENBQWU7SUFsUHJEOzs7O09BSUc7SUFDSDtRQXlCSTs7Ozs7OztXQU9HO1FBQ0gsMEJBQW9CLEVBQVMsRUFBRSxNQUF1QixFQUFFLEdBQVUsRUFBRSxJQUFXO1lBQzNFLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1lBQ2QsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7WUFDdEIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7WUFDaEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDdEIsQ0FBQztRQTlCRCxzQkFBVyxnQ0FBRTtpQkFBYjtnQkFDSSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7WUFDcEIsQ0FBQzs7O1dBQUE7UUFFRCxzQkFBVyxvQ0FBTTtpQkFBakI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ3hCLENBQUM7OztXQUFBO1FBRUQsc0JBQVcsa0NBQUk7aUJBQWY7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LEVBQUcsY0FBNkI7WUFBNUQsNEJBQUEsRUFBQSxrQkFBNEI7WUFBRywrQkFBQSxFQUFBLHFCQUE2QjtZQUUvSCxtREFBbUQ7WUFDbkQsSUFBSSxXQUFXLEdBQTRCO2dCQUN2QyxJQUFJLEVBQUUsV0FBVztnQkFDakIsR0FBRyxFQUFFLFVBQVU7Z0JBQ2YsU0FBUyxFQUFFO29CQUNQLGVBQWUsRUFBRSxJQUFJO2lCQUN4QjtnQkFDRCxRQUFRLEVBQUUsTUFBTTtnQkFDaEIsV0FBVyxFQUFFLGtCQUFrQjthQUNsQyxDQUFDO1lBRUYsOEJBQThCO1lBQzlCLElBQUksV0FBVyxFQUFFO2dCQUNiLFdBQVcsQ0FBQyxJQUFJLEdBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUNuRDtZQUNELHlCQUF5QjtZQUN6QixJQUFJLGNBQWMsRUFBRTtnQkFDaEIsV0FBVyxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUM7YUFDeEM7WUFFRCxPQUFPLElBQUksZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzVDLENBQUM7UUFDTCxrQkFBQztJQUFELENBQUMsQUFqSUQsSUFpSUM7SUFHTyxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9wY1VhUmVzdFNlcnZpY2VzIH0gZnJvbSBcIi4vb3BjVWFSZXN0U2VydmljZXNcIjtcclxuXHJcbi8qKlxyXG4gKiBEZWNsYXJlcyBzdXBwb3J0ZWQgcmVzdCBzZXJ2aWNlIHR5cGVzXHJcbiAqXHJcbiAqIEBlbnVtIHtudW1iZXJ9XHJcbiAqL1xyXG5lbnVtIFJlc3RTZXJ2aWNlVHlwZXtcclxuICAgIFBPU1QgPSBcIlBPU1RcIixcclxuICAgIERFTEVURSA9IFwiREVMRVRFXCIsIFxyXG4gICAgR0VUID0gXCJHRVRcIixcclxuICAgIFBVVCA9IFwiUFVUXCIsXHJcbiAgICBQQVRDSCA9IFwiUEFUQ0hcIixcclxuICAgIFVuZGVmaW5lZCA9IFwiXCIsXHJcbn1cclxuXHJcblxyXG5lbnVtIFJlc3RTZXJ2aWNlTW9kZXtcclxuICAgIEVYRUNVVEUsXHJcbiAgICBCQVRDSCwgXHJcbn1cclxuXHJcblxyXG4vKipcclxuICogRGVjbGFyZXMgdGhlIHNpbmdsZSBiYXRjaCByZXF1ZXN0IGluZm8gbWVtYmVyc1xyXG4gKlxyXG4gKiBAaW50ZXJmYWNlIElCYXRjaFJlcXVlc3RJbmZvXHJcbiAqL1xyXG5pbnRlcmZhY2UgSUJhdGNoUmVxdWVzdEluZm97XHJcbiAgICBpZDpudW1iZXI7XHJcbiAgICBtZXRob2Q6c3RyaW5nfHVuZGVmaW5lZDtcclxuICAgIHVybDpzdHJpbmc7XHJcbiAgICBib2R5OmFueTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFByb3ZpZGVzIGEgc2luZ2xlIGJhdGNoIHJlcXVlc3QgaW5mb1xyXG4gKlxyXG4gKiBAY2xhc3MgQmF0Y2hSZXF1ZXN0SW5mb1xyXG4gKi9cclxuY2xhc3MgQmF0Y2hSZXF1ZXN0SW5mbyBpbXBsZW1lbnRzIElCYXRjaFJlcXVlc3RJbmZve1xyXG4gICAgXHJcbiAgICBwcml2YXRlIF9pZDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfbWV0aG9kOiBzdHJpbmd8dW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfdXJsOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF9ib2R5OiBzdHJpbmc7XHJcblxyXG4gICAgXHJcbiAgICBwdWJsaWMgZ2V0IGlkKCkgOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGdldCBtZXRob2QoKSA6IHN0cmluZ3x1bmRlZmluZWQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tZXRob2Q7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBib2R5KCkgOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9ib2R5O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgdXJsKCkgOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl91cmw7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29uc3RydWN0cyBhbiBpbnN0YW5jZSBvZiBCYXRjaFJlcXVlc3RJbmZvLlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGlkXHJcbiAgICAgKiBAcGFyYW0geyhzdHJpbmd8dW5kZWZpbmVkKX0gbWV0aG9kXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYm9keVxyXG4gICAgICogQG1lbWJlcm9mIEJhdGNoUmVxdWVzdEluZm9cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihpZDpudW1iZXIsIG1ldGhvZDpzdHJpbmd8dW5kZWZpbmVkLCB1cmw6c3RyaW5nLCBib2R5OnN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5faWQgPSBpZDtcclxuICAgICAgICB0aGlzLl9tZXRob2QgPSBtZXRob2Q7XHJcbiAgICAgICAgdGhpcy5fdXJsID0gdXJsO1xyXG4gICAgICAgIHRoaXMuX2JvZHkgPSBib2R5O1xyXG4gICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQmF0Y2hSZXF1ZXN0SW5mby5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpZFxyXG4gICAgKiBAcGFyYW0geyhzdHJpbmd8dW5kZWZpbmVkKX0gbWV0aG9kXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYm9keVxyXG4gICAgICogQG1lbWJlcm9mIEJhdGNoUmVxdWVzdEluZm9cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGNyZWF0ZShpZDogbnVtYmVyLCBtZXRob2Q6IHN0cmluZyB8IHVuZGVmaW5lZCwgdXJsOiBzdHJpbmcsIGJvZHk6IGFueSk6IElCYXRjaFJlcXVlc3RJbmZvIHtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIHRoZSBzaW5nbGUgYmF0Y2ggb2JqZWN0XHJcbiAgICAgICAgbGV0IHNpbmdsZUJhdGNoUmVxdWVzdDphbnkgPSB7XHJcbiAgICAgICAgICAgIGlkOiBpZCwgXHJcbiAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kLCBcclxuICAgICAgICAgICAgdXJsOiB1cmwsIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gYWRkIGJvZHkgZGF0YSBpZiBkZWZpbmVkXHJcbiAgICAgICAgaWYgKGJvZHkpIHtcclxuICAgICAgICAgICAgc2luZ2xlQmF0Y2hSZXF1ZXN0LmJvZHkgPSBib2R5O1xyXG4gICAgICAgICAgICBzaW5nbGVCYXRjaFJlcXVlc3QuaGVhZGVycyA9IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJ9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNpbmdsZUJhdGNoUmVxdWVzdDtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcblxyXG4vKipcclxuICogUHJvdmlkZXMgcmVzdCByZXF1ZXN0IGluZm9cclxuICpcclxuICogQGNsYXNzIFJlc3RSZXF1ZXN0XHJcbiAqL1xyXG5jbGFzcyBSZXN0UmVxdWVzdEluZm97XHJcbiAgICBcclxuICAgIHByaXZhdGUgX3NldHRpbmdzOkpRdWVyeS5BamF4U2V0dGluZ3M8YW55PiA9IHt9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBSZXN0UmVxdWVzdC5cclxuICAgICAqIEBwYXJhbSB7SlF1ZXJ5LkFqYXhTZXR0aW5nczxhbnk+fSBzZXR0aW5nc1xyXG4gICAgICogQG1lbWJlcm9mIFJlc3RSZXF1ZXN0XHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHNldHRpbmdzOkpRdWVyeS5BamF4U2V0dGluZ3M8YW55Pil7XHJcbiAgICAgICAgdGhpcy5fc2V0dGluZ3MgPSBzZXR0aW5ncztcclxuICAgIH1cclxuICAgIFxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHJlc3QgcmVxdWVzdCBzZXR0aW5nc1xyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge0pRdWVyeS5BamF4U2V0dGluZ3M8YW55Pn1cclxuICAgICAqIEBtZW1iZXJvZiBSZXN0UmVxdWVzdFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHNldHRpbmdzKCkgOiBKUXVlcnkuQWpheFNldHRpbmdzPGFueT4gIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2V0dGluZ3M7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJbXBsZW1lbnRzIGEgYmFzaWMgcmVzdCBzZXJ2aWNlIGNhbGxcclxuICpcclxuICogQGNsYXNzIFJlc3RTZXJ2aWNlXHJcbiAqL1xyXG5jbGFzcyBSZXN0U2VydmljZXtcclxuXHJcblxyXG4gICAgc3RhdGljIGFzeW5jIGNhbGw8VD4oc2VydmljZVR5cGU6IFJlc3RTZXJ2aWNlVHlwZSwgc2VydmljZVVybDogc3RyaW5nLCBzZXJ2aWNlRGF0YTogYW55IHwgbnVsbCA9IG51bGwsIHNlcnZpY2VIZWFkZXJzOiBhbnl8bnVsbCA9IG51bGwpOiBQcm9taXNlPFQ+IHtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIHRoZSBiYXNpYyByZXF1ZXN0IGRlc2NyaXB0b3JcclxuICAgICAgICBsZXQgcmVzdFJlcXVlc3QgPSBSZXN0U2VydmljZS5jcmVhdGVSZXF1ZXN0KHNlcnZpY2VUeXBlLCBzZXJ2aWNlVXJsLHNlcnZpY2VEYXRhLCBzZXJ2aWNlSGVhZGVycyk7XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSBwcm9taXNlIGZvciB0aGUgcmVzdCByZXF1ZXN0XHJcbiAgICAgICAgY29uc3QgcmVzdFNlcnZpY2VQcm9taXNlID0gUmVzdFNlcnZpY2UuY3JlYXRlUmVzdFJlcXVlc3RQcm9taXNlPFQ+KHJlc3RSZXF1ZXN0KTtcclxuXHJcbiAgICAgICAgLy8gYXR0YWNoIHRoZSByZXF1ZXN0IGluZm8gdG8gdGhlIHByb21pc2VcclxuICAgICAgICAoPGFueT5yZXN0U2VydmljZVByb21pc2UpLnJlc3RSZXF1ZXN0SW5mbyA9IHJlc3RSZXF1ZXN0O1xyXG5cclxuICAgICAgICAvLyByZXR1cm4ganVzdCB0aGUgcmVxdWVzdCBpbmZvIG9yIHdhaXQgZm9yIGV4ZWN1dGluZyB0aGUgcmVxdXVlc3RcclxuICAgICAgICByZXR1cm4gIHJlc3RTZXJ2aWNlUHJvbWlzZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjYWxscyBhIGJhdGNoIHJlcXVlc3RcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAdGVtcGxhdGUgVFxyXG4gICAgICogQHBhcmFtIHtKUXVlcnkuQWpheFNldHRpbmdzPGFueT5bXX0gcmVzdFJlcXVlc3RzXHJcbiAgICAgKiBAbWVtYmVyb2YgUmVzdFNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFzeW5jIGNhbGxCYXRjaFJlcXVlc3Q8VD4oYmF0Y2hTZXJ2aWNlQmFzZVVybDogc3RyaW5nLCBzZXJ2aWNlUmVxdWVzdHM6UmVzdFJlcXVlc3RJbmZvW10pOiBQcm9taXNlPFQ+IHtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIHRoZSBiYXRjaCBsaXN0XHJcbiAgICAgICAgbGV0IGJhdGNoUmVxdWVzdHMgPSB7cmVxdWVzdHM6IFJlc3RTZXJ2aWNlLmNyZWF0ZUJhdGNoUmVxdWVzdHNEYXRhKHNlcnZpY2VSZXF1ZXN0cywgYmF0Y2hTZXJ2aWNlQmFzZVVybCkgfSA7XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgYmF0Y2ggcmVxdWVzdFxyXG4gICAgICAgIGxldCBiYXRjaFJlcXVlc3QgPSBSZXN0U2VydmljZS5jcmVhdGVSZXF1ZXN0KFJlc3RTZXJ2aWNlVHlwZS5QT1NULCBiYXRjaFNlcnZpY2VCYXNlVXJsICsgJy8kYmF0Y2gnICwgYmF0Y2hSZXF1ZXN0cyApO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgcHJvbWlzZSBmb3IgdGhlIHJlc3QgYmF0Y2ggcmVxdWVzdFxyXG4gICAgICAgIGNvbnN0IHJlc3RCYXRjaFNlcnZpY2VQcm9taXNlID0gUmVzdFNlcnZpY2UuY3JlYXRlUmVzdFJlcXVlc3RQcm9taXNlPFQ+KGJhdGNoUmVxdWVzdCk7XHJcblxyXG4gICAgICAgIC8vIHJldHVybiBqdXN0IHRoZSByZXF1ZXN0IGluZm8gb3Igd2FpdCBmb3IgZXhlY3V0aW5nIHRoZSByZXF1dWVzdFxyXG4gICAgICAgIHJldHVybiAgcmVzdEJhdGNoU2VydmljZVByb21pc2U7XHJcbiAgICB9XHJcbiAgICBcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW5kIGluaXRpYWxpemVzIHRoZSBiYXRjaCByZXF1ZXN0cyBmcm9tIHRoZSBvcmlnaW5hbCBzaW5nbGUgcmVxdWVzdHNcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtSZXN0UmVxdWVzdEluZm9bXX0gc2VydmljZVJlcXVlc3RzXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYmF0Y2hTZXJ2aWNlQmFzZVVybFxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBSZXN0U2VydmljZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBjcmVhdGVCYXRjaFJlcXVlc3RzRGF0YShzZXJ2aWNlUmVxdWVzdHM6IFJlc3RSZXF1ZXN0SW5mb1tdLCBiYXRjaFNlcnZpY2VCYXNlVXJsOiBzdHJpbmcpOiBJQmF0Y2hSZXF1ZXN0SW5mb1tdIHtcclxuXHJcbiAgICAgICAgbGV0IGJhdGNoUmVxdWVzdHM6IElCYXRjaFJlcXVlc3RJbmZvW10gPSAgW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VydmljZVJlcXVlc3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlcnZpY2VSZXF1ZXN0OlJlc3RSZXF1ZXN0SW5mbyA9IHNlcnZpY2VSZXF1ZXN0c1tpXTtcclxuICAgICAgICAgICAgaWYgKHNlcnZpY2VSZXF1ZXN0LnNldHRpbmdzLnVybCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNpbmdsZVJlcXVlc3RVcmwgPSBzZXJ2aWNlUmVxdWVzdC5zZXR0aW5ncy51cmwucmVwbGFjZShiYXRjaFNlcnZpY2VCYXNlVXJsLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgIGxldCByZXF1ZXN0RGF0YSA9IHNlcnZpY2VSZXF1ZXN0LnNldHRpbmdzLmRhdGEgPyBKU09OLnBhcnNlKDxhbnk+c2VydmljZVJlcXVlc3Quc2V0dGluZ3MuZGF0YSk6dW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgYmF0Y2hSZXF1ZXN0cy5wdXNoKCBCYXRjaFJlcXVlc3RJbmZvLmNyZWF0ZShpLHNlcnZpY2VSZXF1ZXN0LnNldHRpbmdzLnR5cGUsc2luZ2xlUmVxdWVzdFVybCxyZXF1ZXN0RGF0YSkpOyAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYmF0Y2hSZXF1ZXN0cztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBwcm9taXNlIGVuY2xvc2luZyB0aGUgcmVzdCByZXF1ZXN0XHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7UmVzdFJlcXVlc3RJbmZvfSByZXN0UmVxdWVzdFxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqIEBtZW1iZXJvZiBSZXN0U2VydmljZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBjcmVhdGVSZXN0UmVxdWVzdFByb21pc2U8VD4ocmVzdFJlcXVlc3Q6IFJlc3RSZXF1ZXN0SW5mbyk6IFByb21pc2U8VD4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChPcGNVYVJlc3RTZXJ2aWNlcy5tb2RlID09IFJlc3RTZXJ2aWNlTW9kZS5FWEVDVVRFKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZXhlY3V0ZSB0aGUgcmVzdCBzZXJ2aWNlXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYXR0YWNoIHRoZSBjYWxsYmFjayBmdW5jdGlvbnMgdG8gdGhlIHByb21pc2UgY2FsbGJhY2tzXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdFJlcXVlc3Quc2V0dGluZ3Muc3VjY2VzcyA9IHJlc29sdmU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdFJlcXVlc3Quc2V0dGluZ3MuZXJyb3IgPSByZWplY3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZXhlY3V0ZSByZXN0IHJlcXVlc3RcclxuICAgICAgICAgICAgICAgICAgICAkLmFqYXgocmVzdFJlcXVlc3Quc2V0dGluZ3MpOyAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoT3BjVWFSZXN0U2VydmljZXMubW9kZSA9PSBSZXN0U2VydmljZU1vZGUuQkFUQ0gpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGluIGJhdGNoIG1vZGUgcmVzdCByZXF1ZXN0IGluZm8gaXMgcmV0dXJuZWQgYXMgcmVzdWx0LiBUaGlzIGFsbG93cyBhY2N1bXVsYXRpbmcgbXVsdGlwbGUgcmVxdWVzdHMgdG8gYmUgZXhlY3V0ZWQgd2l0aGluIGEgYmF0Y2ggcmVxdWVzdCBjYWxsLlxyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdFJlcXVlc3QpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHRoZSBiYXNpYyBhamF4IHJlcXVlc3QgaW5mb1xyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge1Jlc3RTZXJ2aWNlVHlwZX0gc2VydmljZVR5cGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZXJ2aWNlVXJsXHJcbiAgICAgKiBAcGFyYW0geyh2YWx1ZT86IGFueSkgPT4gdm9pZH0gcmVzb2x2ZVxyXG4gICAgICogQHBhcmFtIHsocmVhc29uPzogYW55KSA9PiB2b2lkfSByZWplY3RcclxuICAgICAqIEByZXR1cm5zIHsoSlF1ZXJ5LkFqYXhTZXR0aW5nczxhbnk+IHwgdW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBSZXN0U2VydmljZVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY3JlYXRlUmVxdWVzdChzZXJ2aWNlVHlwZTogUmVzdFNlcnZpY2VUeXBlLCBzZXJ2aWNlVXJsOiBzdHJpbmcsIHNlcnZpY2VEYXRhOiBhbnkgfCBudWxsPW51bGwgLCBzZXJ2aWNlSGVhZGVyczogYW55fG51bGw9bnVsbCk6IFJlc3RSZXF1ZXN0SW5mb3tcclxuICAgICAgICBcclxuICAgICAgICAvLyBjcmVhdGUgYW5kIGluaXRpYWxpemUgdGhlIHNlcnZpY2UgcmVxdWVzdCBvYmplY3RcclxuICAgICAgICBsZXQgcmVzdFJlcXVlc3Q6SlF1ZXJ5LkFqYXhTZXR0aW5nczxhbnk+ID0ge1xyXG4gICAgICAgICAgICB0eXBlOiBzZXJ2aWNlVHlwZSxcclxuICAgICAgICAgICAgdXJsOiBzZXJ2aWNlVXJsLFxyXG4gICAgICAgICAgICB4aHJGaWVsZHM6IHtcclxuICAgICAgICAgICAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIHNldCByZXF1ZXN0IGRhdGEgaWYgZGVmaW5lZFxyXG4gICAgICAgIGlmIChzZXJ2aWNlRGF0YSkge1xyXG4gICAgICAgICAgICByZXN0UmVxdWVzdC5kYXRhID0gIEpTT04uc3RyaW5naWZ5KHNlcnZpY2VEYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gc2V0IGhlYWRlcnMgaWYgZGVmaW5lZFxyXG4gICAgICAgIGlmIChzZXJ2aWNlSGVhZGVycykge1xyXG4gICAgICAgICAgICByZXN0UmVxdWVzdC5oZWFkZXJzID0gc2VydmljZUhlYWRlcnM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBuZXcgUmVzdFJlcXVlc3RJbmZvKHJlc3RSZXF1ZXN0KTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCB7UmVzdFNlcnZpY2UsIFJlc3RTZXJ2aWNlVHlwZSwgUmVzdFNlcnZpY2VNb2RlLFJlc3RSZXF1ZXN0SW5mb307Il19