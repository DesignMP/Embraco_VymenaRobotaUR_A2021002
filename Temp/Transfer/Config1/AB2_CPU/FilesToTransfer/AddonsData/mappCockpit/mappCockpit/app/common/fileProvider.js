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
define(["require", "exports", "../framework/events"], function (require, exports, events_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventUploadDataFinished = /** @class */ (function (_super) {
        __extends(EventUploadDataFinished, _super);
        function EventUploadDataFinished() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventUploadDataFinished;
    }(events_1.TypedEvent));
    ;
    var FileProvider = /** @class */ (function () {
        /**
         * Creates an instance of FileProvider.
         * @memberof FileProvider
         */
        function FileProvider() {
            var _this = this;
            this.eventUploadDataFinished = new EventUploadDataFinished();
            this._fileInputElement = document.createElement('input');
            document.body.appendChild(this._fileInputElement);
            this._fileInputElement.type = 'file';
            this._fileInputElement.onchange = function (e) {
                // let file = (<any>e!.target!).files[0]; 
                var files = e.target.files;
                var contents = new Map();
                var _loop_1 = function (i) {
                    var file = files[i];
                    // initialize the file reader 
                    reader = new FileReader();
                    // catch the reading finish event
                    reader.onload = function (readerEvent) {
                        var content = readerEvent.target.result; // the content of the file
                        contents.set(file.name, content);
                        if (i === files.length - 1) {
                            _this.onUploadDataFinished(contents);
                            _this._fileInputElement.value = "";
                        }
                    };
                    reader.readAsText(file, 'UTF-8');
                };
                var reader;
                for (var i = 0; i < files.length; i++) {
                    _loop_1(i);
                }
                ;
            };
        }
        /**
         * Returns true if the file exists on the server
         *
         * @static
         * @param {*} urlToFile
         * @returns
         * @memberof FileProvider
         */
        FileProvider.doesFileExistOnServer = function (urlToFile) {
            var xhr = new XMLHttpRequest();
            xhr.open('HEAD', urlToFile, false);
            xhr.send();
            if (xhr.status == 404) {
                return false;
            }
            else {
                return true;
            }
        };
        /**
         * downloads data from visualization to the local pc
         *
         * @static
         * @param {string} defaultFileName e.g. "TraceData.csv"
         * @param {Blob} data data that should be written into the file
         * @memberof FileProvider
         */
        FileProvider.downloadData = function (defaultFileName, data) {
            var downloadLink = document.createElement("a");
            var url = URL.createObjectURL(data);
            downloadLink.href = url;
            downloadLink.download = defaultFileName;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        };
        /**
         * Opens the file dialog for file selection to upload data to visualization
         * after selecting and applying a file the eventUploadDataFinished event will be raised
         *
         * @param {string} fileExtensions e.g. ".csv"
         * @param {boolean} [allowMultipleFileSelection=false] flag to enable multiselection
         * @memberof FileProvider
         */
        FileProvider.prototype.uploadData = function (fileExtensions, allowMultipleFileSelection) {
            if (allowMultipleFileSelection === void 0) { allowMultipleFileSelection = false; }
            this._fileInputElement.accept = fileExtensions;
            this._fileInputElement.multiple = allowMultipleFileSelection;
            this._fileInputElement.click();
        };
        FileProvider.prototype.onUploadDataFinished = function (data) {
            this.eventUploadDataFinished.raise(this._fileInputElement, data);
        };
        return FileProvider;
    }());
    exports.FileProvider = FileProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZVByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21tb24vZmlsZVByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFQTtRQUFzQywyQ0FBZ0Q7UUFBdEY7O1FBQXdGLENBQUM7UUFBRCw4QkFBQztJQUFELENBQUMsQUFBekYsQ0FBc0MsbUJBQVUsR0FBeUM7SUFBQSxDQUFDO0lBRTFGO1FBWUk7OztXQUdHO1FBQ0g7WUFBQSxpQkErQkM7WUE3Q0QsNEJBQXVCLEdBQUcsSUFBSSx1QkFBdUIsRUFBRSxDQUFDO1lBZXBELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3pELFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQ2xELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO1lBRXJDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEdBQUcsVUFBQSxDQUFDO2dCQUUvQiwwQ0FBMEM7Z0JBQzFDLElBQUksS0FBSyxHQUFzQixDQUFFLENBQUMsTUFBUSxDQUFDLEtBQUssQ0FBQztnQkFDakQsSUFBSSxRQUFRLEdBQXdCLElBQUksR0FBRyxFQUFFLENBQUM7d0NBRXZDLENBQUM7b0JBRUosSUFBSSxJQUFJLEdBQVMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUUxQiw4QkFBOEI7b0JBQzFCLE1BQU0sR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO29CQUM5QixpQ0FBaUM7b0JBRWpDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsVUFBQSxXQUFXO3dCQUV2QixJQUFJLE9BQU8sR0FBUyxXQUFZLENBQUMsTUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLDBCQUEwQjt3QkFDNUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO3dCQUNqQyxJQUFHLENBQUMsS0FBSyxLQUFLLENBQUMsTUFBTSxHQUFDLENBQUMsRUFBRTs0QkFDckIsS0FBSSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDOzRCQUNwQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQzt5QkFDckM7b0JBQ0wsQ0FBQyxDQUFDO29CQUNGLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFDLE9BQU8sQ0FBQyxDQUFDOztvQkFaNUIsTUFBTTtnQkFMZixLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUU7NEJBQTVCLENBQUM7aUJBa0JQO2dCQUFBLENBQUM7WUFDTixDQUFDLENBQUE7UUFDTCxDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNJLGtDQUFxQixHQUE1QixVQUE2QixTQUFTO1lBQ2xDLElBQUksR0FBRyxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7WUFDL0IsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ25DLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUVYLElBQUksR0FBRyxDQUFDLE1BQU0sSUFBSSxHQUFHLEVBQUU7Z0JBQ25CLE9BQU8sS0FBSyxDQUFDO2FBQ2hCO2lCQUNJO2dCQUNELE9BQU8sSUFBSSxDQUFDO2FBQ2Y7UUFDTCxDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNJLHlCQUFZLEdBQW5CLFVBQW9CLGVBQXVCLEVBQUUsSUFBUztZQUVsRCxJQUFJLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRS9DLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEMsWUFBWSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7WUFDeEIsWUFBWSxDQUFDLFFBQVEsR0FBRyxlQUFlLENBQUM7WUFFeEMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDeEMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3JCLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzVDLENBQUM7UUFHRDs7Ozs7OztXQU9HO1FBQ0ksaUNBQVUsR0FBakIsVUFBa0IsY0FBc0IsRUFBRSwwQkFBMEM7WUFBMUMsMkNBQUEsRUFBQSxrQ0FBMEM7WUFFaEYsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sR0FBRyxjQUFjLENBQUM7WUFDL0MsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsR0FBRywwQkFBMEIsQ0FBQztZQUM3RCxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbkMsQ0FBQztRQUVPLDJDQUFvQixHQUE1QixVQUE2QixJQUF5QjtZQUNsRCxJQUFJLENBQUMsdUJBQXVCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyRSxDQUFDO1FBQ0wsbUJBQUM7SUFBRCxDQUFDLEFBOUdELElBOEdDO0lBOUdZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHlwZWRFdmVudCB9IGZyb20gXCIuLi9mcmFtZXdvcmsvZXZlbnRzXCI7XHJcblxyXG5jbGFzcyBFdmVudFVwbG9hZERhdGFGaW5pc2hlZCBleHRlbmRzIFR5cGVkRXZlbnQ8SFRNTElucHV0RWxlbWVudCwgTWFwPHN0cmluZyxzdHJpbmc+PnsgfTtcclxuXHJcbmV4cG9ydCBjbGFzcyBGaWxlUHJvdmlkZXIge1xyXG5cclxuICAgIGV2ZW50VXBsb2FkRGF0YUZpbmlzaGVkID0gbmV3IEV2ZW50VXBsb2FkRGF0YUZpbmlzaGVkKCk7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogSG9sZHMgdGhlIGVsZW1lbnQgbmVlZGVkIGZvciBmaWxlIHVwbG9hZHMoPElOUFVUIC4uLj4pXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBGaWxlUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfZmlsZUlucHV0RWxlbWVudDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgRmlsZVByb3ZpZGVyLlxyXG4gICAgICogQG1lbWJlcm9mIEZpbGVQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuX2ZpbGVJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5fZmlsZUlucHV0RWxlbWVudCk7XHJcbiAgICAgICAgdGhpcy5fZmlsZUlucHV0RWxlbWVudC50eXBlID0gJ2ZpbGUnO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX2ZpbGVJbnB1dEVsZW1lbnQub25jaGFuZ2UgPSBlID0+IHsgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBsZXQgZmlsZSA9ICg8YW55PmUhLnRhcmdldCEpLmZpbGVzWzBdOyBcclxuICAgICAgICAgICAgbGV0IGZpbGVzOiBBcnJheTxGaWxlPiA9ICg8YW55PmUhLnRhcmdldCEpLmZpbGVzO1xyXG4gICAgICAgICAgICBsZXQgY29udGVudHM6IE1hcDxzdHJpbmcsIHN0cmluZz4gPSBuZXcgTWFwKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBmaWxlcy5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBmaWxlOiBGaWxlID0gZmlsZXNbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gaW5pdGlhbGl6ZSB0aGUgZmlsZSByZWFkZXIgXHJcbiAgICAgICAgICAgICAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcclxuICAgICAgICAgICAgICAgIC8vIGNhdGNoIHRoZSByZWFkaW5nIGZpbmlzaCBldmVudFxyXG5cclxuICAgICAgICAgICAgICAgIHJlYWRlci5vbmxvYWQgPSByZWFkZXJFdmVudCA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb250ZW50ID0gKDxhbnk+cmVhZGVyRXZlbnQhLnRhcmdldCEpLnJlc3VsdDsgLy8gdGhlIGNvbnRlbnQgb2YgdGhlIGZpbGVcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50cy5zZXQoZmlsZS5uYW1lLCBjb250ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICBpZihpID09PSBmaWxlcy5sZW5ndGgtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uVXBsb2FkRGF0YUZpbmlzaGVkKGNvbnRlbnRzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZmlsZUlucHV0RWxlbWVudC52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHJlYWRlci5yZWFkQXNUZXh0KGZpbGUsJ1VURi04Jyk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBmaWxlIGV4aXN0cyBvbiB0aGUgc2VydmVyXHJcbiAgICAgKlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHsqfSB1cmxUb0ZpbGVcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgRmlsZVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBkb2VzRmlsZUV4aXN0T25TZXJ2ZXIodXJsVG9GaWxlKXtcclxuICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgeGhyLm9wZW4oJ0hFQUQnLCB1cmxUb0ZpbGUsIGZhbHNlKTtcclxuICAgICAgICB4aHIuc2VuZCgpO1xyXG4gICAgXHJcbiAgICAgICAgaWYgKHhoci5zdGF0dXMgPT0gNDA0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGRvd25sb2FkcyBkYXRhIGZyb20gdmlzdWFsaXphdGlvbiB0byB0aGUgbG9jYWwgcGNcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGVmYXVsdEZpbGVOYW1lIGUuZy4gXCJUcmFjZURhdGEuY3N2XCJcclxuICAgICAqIEBwYXJhbSB7QmxvYn0gZGF0YSBkYXRhIHRoYXQgc2hvdWxkIGJlIHdyaXR0ZW4gaW50byB0aGUgZmlsZVxyXG4gICAgICogQG1lbWJlcm9mIEZpbGVQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZG93bmxvYWREYXRhKGRlZmF1bHRGaWxlTmFtZTogc3RyaW5nLCBkYXRhOkJsb2Ipe1xyXG4gICAgXHJcbiAgICAgICAgdmFyIGRvd25sb2FkTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB2YXIgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChkYXRhKTtcclxuICAgICAgICBkb3dubG9hZExpbmsuaHJlZiA9IHVybDtcclxuICAgICAgICBkb3dubG9hZExpbmsuZG93bmxvYWQgPSBkZWZhdWx0RmlsZU5hbWU7XHJcbiAgICBcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRvd25sb2FkTGluayk7XHJcbiAgICAgICAgZG93bmxvYWRMaW5rLmNsaWNrKCk7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChkb3dubG9hZExpbmspO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBPcGVucyB0aGUgZmlsZSBkaWFsb2cgZm9yIGZpbGUgc2VsZWN0aW9uIHRvIHVwbG9hZCBkYXRhIHRvIHZpc3VhbGl6YXRpb24gXHJcbiAgICAgKiBhZnRlciBzZWxlY3RpbmcgYW5kIGFwcGx5aW5nIGEgZmlsZSB0aGUgZXZlbnRVcGxvYWREYXRhRmluaXNoZWQgZXZlbnQgd2lsbCBiZSByYWlzZWRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZmlsZUV4dGVuc2lvbnMgZS5nLiBcIi5jc3ZcIlxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbYWxsb3dNdWx0aXBsZUZpbGVTZWxlY3Rpb249ZmFsc2VdIGZsYWcgdG8gZW5hYmxlIG11bHRpc2VsZWN0aW9uXHJcbiAgICAgKiBAbWVtYmVyb2YgRmlsZVByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB1cGxvYWREYXRhKGZpbGVFeHRlbnNpb25zOiBzdHJpbmcsIGFsbG93TXVsdGlwbGVGaWxlU2VsZWN0aW9uOiBib29sZWFuPSBmYWxzZSl7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fZmlsZUlucHV0RWxlbWVudC5hY2NlcHQgPSBmaWxlRXh0ZW5zaW9uczsgXHJcbiAgICAgICAgdGhpcy5fZmlsZUlucHV0RWxlbWVudC5tdWx0aXBsZSA9IGFsbG93TXVsdGlwbGVGaWxlU2VsZWN0aW9uO1xyXG4gICAgICAgIHRoaXMuX2ZpbGVJbnB1dEVsZW1lbnQuY2xpY2soKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uVXBsb2FkRGF0YUZpbmlzaGVkKGRhdGE6IE1hcDxzdHJpbmcsIHN0cmluZz4pIHtcclxuICAgICAgICB0aGlzLmV2ZW50VXBsb2FkRGF0YUZpbmlzaGVkLnJhaXNlKHRoaXMuX2ZpbGVJbnB1dEVsZW1lbnQsIGRhdGEpO1xyXG4gICAgfVxyXG59Il19